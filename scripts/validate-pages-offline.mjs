import assert from 'node:assert/strict';
import { readFile, readdir } from 'node:fs/promises';
import path from 'node:path';
import vm from 'node:vm';

const root = process.cwd();
const siteDir = path.join(root, '_site');

async function recursiveFiles(baseDir, relativeDir = '') {
  const dir = path.join(baseDir, relativeDir);
  const entries = await readdir(dir, { withFileTypes: true });
  const files = [];

  for (const entry of entries) {
    const relative = path.posix.join(relativeDir.replaceAll('\\', '/'), entry.name);
    if (entry.isDirectory()) {
      files.push(...await recursiveFiles(baseDir, relative));
    } else if (entry.isFile()) {
      files.push(relative);
    }
  }

  return files.sort((a, b) => a.localeCompare(b, 'en'));
}

const manifestPath = path.join(siteDir, 'pages-manifest.txt');
const manifestEntries = (await readFile(manifestPath, 'utf8'))
  .split(/\r?\n/)
  .map((line) => line.trim())
  .filter(Boolean);
const manifest = new Set(manifestEntries);
const publishedFiles = await recursiveFiles(siteDir);
const requiredPublishedFiles = publishedFiles.filter(
  (relative) => relative !== '.nojekyll' && relative !== 'pages-manifest.txt',
);

const missingFromManifest = requiredPublishedFiles.filter((relative) => !manifest.has(relative));
assert.deepEqual(
  missingFromManifest,
  [],
  `pages-manifest.txt is missing published files: ${missingFromManifest.join(', ')}`,
);

for (const required of [
  'index.html',
  'home.md',
  '_sidebar.md',
  'service-worker.js',
  'sw-config.js',
  'site-meta.json',
  'textbook/dream-theater.md',
  'textbook/dream-theater-index.json',
]) {
  assert(manifest.has(required), `offline manifest must include ${required}`);
}

const imageFiles = requiredPublishedFiles.filter((relative) =>
  /\.(?:avif|gif|jpe?g|png|svg|webp)$/i.test(relative),
);
assert(imageFiles.length > 0, 'Pages build unexpectedly contains no images to cache');
for (const image of imageFiles) {
  assert(manifest.has(image), `offline manifest must include image ${image}`);
}

const dreamTheaterPath = path.join(siteDir, 'textbook', 'dream-theater.md');
const dreamTheater = await readFile(dreamTheaterPath, 'utf8');
const lectureLinks = [...dreamTheater.matchAll(/\]\((textbook\/[^)\s?#]+)(?:[?#][^)]*)?\)/g)]
  .map((match) => match[1])
  .filter((href) => href.endsWith('.md'));
assert(lectureLinks.length > 20, 'DREAM THEATER lecture index unexpectedly has too few chapter links');
for (const href of new Set(lectureLinks)) {
  assert(manifest.has(href), `DREAM THEATER lecture is not offline-cacheable: ${href}`);
}

class MemoryCache {
  constructor() {
    this.entries = new Map();
  }

  key(input) {
    return typeof input === 'string' ? input : input.url;
  }

  async match(input, options = {}) {
    const requested = new URL(this.key(input));
    const exact = this.entries.get(requested.href);
    if (exact) return exact.clone();
    if (!options.ignoreSearch) return undefined;

    requested.search = '';
    requested.hash = '';
    for (const [key, response] of this.entries) {
      const candidate = new URL(key);
      candidate.search = '';
      candidate.hash = '';
      if (candidate.href === requested.href) return response.clone();
    }
    return undefined;
  }

  async put(input, response) {
    this.entries.set(this.key(input), response.clone());
  }
}

const memoryCache = new MemoryCache();
const listeners = new Map();
let fetchImplementation = async () => {
  throw new Error('offline');
};
const scope = 'https://example.test/toukei-kentei_grade1_preparation/';
const sandbox = {
  console,
  URL,
  Request,
  Response,
  Headers,
  Set,
  Promise,
  importScripts() {},
  fetch: (...args) => fetchImplementation(...args),
  caches: {
    async open() { return memoryCache; },
    async keys() { return []; },
    async delete() { return true; },
  },
  self: {
    location: { origin: 'https://example.test' },
    registration: { scope },
    clients: { async claim() {} },
    async skipWaiting() {},
    addEventListener(type, handler) {
      listeners.set(type, handler);
    },
  },
};

const configSource = await readFile(path.join(root, 'pages', 'sw-config.js'), 'utf8');
vm.runInNewContext(configSource, sandbox, { filename: 'pages/sw-config.js' });
assert.equal(
  sandbox.self.TOUKEI_SW_CONFIG.strategyByKind.navigation,
  'cache-first',
  'offline navigation must prefer cached app shell without a network wait',
);
assert.equal(
  sandbox.self.TOUKEI_SW_CONFIG.strategyByKind.sameOrigin,
  'stale-while-revalidate',
  'cached same-origin content must be returned before network revalidation',
);
assert.equal(
  sandbox.self.TOUKEI_SW_CONFIG.strategyByKind.externalAsset,
  'cache-first',
  'pinned external runtime assets must prefer cache offline',
);

const serviceWorkerSource = await readFile(path.join(root, 'pages', 'service-worker.js'), 'utf8');
vm.runInNewContext(serviceWorkerSource, sandbox, { filename: 'pages/service-worker.js' });
const fetchHandler = listeners.get('fetch');
assert.equal(typeof fetchHandler, 'function', 'Service Worker fetch handler was not registered');

async function dispatch(request) {
  let responsePromise;
  const event = {
    request,
    waitUntil() {},
    respondWith(value) {
      responsePromise = Promise.resolve(value);
    },
  };
  fetchHandler(event);
  assert(responsePromise, `Service Worker did not handle ${request.url}`);
  return responsePromise;
}

const dreamTheaterCachedUrl = new URL('textbook/dream-theater.md', scope).href;
await memoryCache.put(
  dreamTheaterCachedUrl,
  new Response('# cached DREAM THEATER', { status: 200, headers: { 'Content-Type': 'text/markdown' } }),
);
fetchImplementation = async () => new Response('not found', { status: 404 });
const dreamRouteResponse = await dispatch(
  new Request(new URL('textbook/dream-theater?docsify-cache-bust=1', scope)),
);
assert.equal(dreamRouteResponse.status, 200, 'Docsify extensionless route must resolve to cached .md');
assert.equal(await dreamRouteResponse.text(), '# cached DREAM THEATER');

// Regression guard for the user-visible latency bug: a cached Docsify route
// must resolve even if the network request never settles. stale-while-revalidate
// may keep that request alive in the background, but it must not block render.
const instantCachedUrl = new URL('textbook/offline-speed.md', scope).href;
await memoryCache.put(
  instantCachedUrl,
  new Response('# instant cached page', { status: 200, headers: { 'Content-Type': 'text/markdown' } }),
);
fetchImplementation = () => new Promise(() => {});
const instantResponse = await Promise.race([
  dispatch(new Request(new URL('textbook/offline-speed', scope))),
  new Promise((_, reject) => setTimeout(
    () => reject(new Error('cached same-origin page waited for the network')),
    250,
  )),
]);
assert.equal(instantResponse.status, 200, 'cached same-origin page must return immediately');
assert.equal(await instantResponse.text(), '# instant cached page');

const imageCachedUrl = new URL('textbook/assets/offline-test.png', scope).href;
await memoryCache.put(
  imageCachedUrl,
  new Response('image-bytes', { status: 200, headers: { 'Content-Type': 'image/png' } }),
);
fetchImplementation = async () => {
  throw new Error('offline');
};
const imageResponse = await dispatch(
  new Request(`${imageCachedUrl}?revision=123`),
);
assert.equal(imageResponse.status, 200, 'query-string image request must resolve to cached image');
assert.equal(await imageResponse.text(), 'image-bytes');

const mediaCachedUrl = new URL('textbook/assets/offline-test.bin', scope).href;
await memoryCache.put(
  mediaCachedUrl,
  new Response('0123456789', { status: 200, headers: { 'Content-Type': 'application/octet-stream' } }),
);
const rangeResponse = await dispatch(
  new Request(mediaCachedUrl, { headers: { Range: 'bytes=2-5' } }),
);
assert.equal(rangeResponse.status, 206, 'cached range request must return HTTP 206');
assert.equal(rangeResponse.headers.get('content-range'), 'bytes 2-5/10');
assert.equal(await rangeResponse.text(), '2345');

console.log(`Offline manifest validated: ${manifest.size} files (${imageFiles.length} images).`);
console.log(`DREAM THEATER offline links validated: ${new Set(lectureLinks).size}.`);
console.log('Service Worker cached-route latency, query-string asset, and range fallbacks passed.');
