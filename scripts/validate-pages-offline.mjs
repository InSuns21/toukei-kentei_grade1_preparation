import assert from 'node:assert/strict';
import { createHash, webcrypto } from 'node:crypto';
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

function sha256(bytes) {
  return createHash('sha256').update(bytes).digest('hex');
}

const manifestPath = path.join(siteDir, 'pages-manifest.txt');
const manifestEntries = (await readFile(manifestPath, 'utf8'))
  .split(/\r?\n/)
  .map((line) => line.trim())
  .filter(Boolean);
const manifest = new Set(manifestEntries);
const hashManifestPath = path.join(siteDir, 'pages-manifest.json');
const hashManifest = JSON.parse(await readFile(hashManifestPath, 'utf8'));
assert.equal(hashManifest.schemaVersion, 1, 'hash manifest schemaVersion must be 1');
assert.equal(typeof hashManifest.revision, 'string', 'hash manifest revision must be a string');
assert(Array.isArray(hashManifest.files), 'hash manifest files must be an array');
const hashEntries = new Map(hashManifest.files.map((entry) => [entry.path, entry.sha256]));

const publishedFiles = await recursiveFiles(siteDir);
const requiredPublishedFiles = publishedFiles.filter(
  (relative) => relative !== '.nojekyll'
    && relative !== 'pages-manifest.txt'
    && relative !== 'pages-manifest.json',
);

const missingFromManifest = requiredPublishedFiles.filter((relative) => !manifest.has(relative));
assert.deepEqual(
  missingFromManifest,
  [],
  `pages-manifest.txt is missing published files: ${missingFromManifest.join(', ')}`,
);
const extraInManifest = manifestEntries.filter((relative) => !requiredPublishedFiles.includes(relative));
assert.deepEqual(extraInManifest, [], `pages-manifest.txt has unexpected files: ${extraInManifest.join(', ')}`);

assert.equal(
  hashEntries.size,
  requiredPublishedFiles.length,
  'pages-manifest.json must contain exactly one hash for every published file',
);
for (const relative of requiredPublishedFiles) {
  const expected = hashEntries.get(relative);
  assert.match(expected || '', /^[a-f0-9]{64}$/, `missing/invalid SHA-256 for ${relative}`);
  const actual = sha256(await readFile(path.join(siteDir, relative)));
  assert.equal(expected, actual, `SHA-256 mismatch for ${relative}`);
}

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
  assert(hashEntries.has(required), `hash manifest must include ${required}`);
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

  async delete(input) {
    return this.entries.delete(this.key(input));
  }

  async keys() {
    return [...this.entries.keys()].map((url) => new Request(url));
  }
}

const cacheStores = new Map();
const cacheStorage = {
  async open(name) {
    if (!cacheStores.has(name)) cacheStores.set(name, new MemoryCache());
    return cacheStores.get(name);
  },
  async keys() {
    return [...cacheStores.keys()];
  },
  async delete(name) {
    return cacheStores.delete(name);
  },
};

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
  Map,
  Promise,
  Date,
  Uint8Array,
  AbortController,
  setTimeout,
  clearTimeout,
  importScripts() {},
  fetch: (...args) => fetchImplementation(...args),
  caches: cacheStorage,
  self: {
    crypto: webcrypto,
    navigator: { onLine: false },
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
const swConfig = sandbox.self.TOUKEI_SW_CONFIG;
assert.equal(swConfig.strategyByKind.navigation, 'network-first', 'online navigation must request latest shell');
assert.equal(swConfig.strategyByKind.sameOrigin, 'network-first', 'online same-origin must request latest content');
assert.equal(swConfig.strategyByKind.externalAsset, 'cache-first', 'version-pinned external assets may prefer cache');
assert(swConfig.networkTimeoutMs > 0, 'nominally-online requests must have a bounded network wait');
assert.equal(swConfig.publishedFilesHashManifest, './pages-manifest.json');
assert.equal(swConfig.offlineContentCacheName, 'toukei-grade1-offline-content-v1');

const serviceWorkerSource = await readFile(path.join(root, 'pages', 'service-worker.js'), 'utf8');
vm.runInNewContext(serviceWorkerSource, sandbox, { filename: 'pages/service-worker.js' });
const fetchHandler = listeners.get('fetch');
const messageHandler = listeners.get('message');
const activateHandler = listeners.get('activate');
assert.equal(typeof fetchHandler, 'function', 'Service Worker fetch handler was not registered');
assert.equal(typeof messageHandler, 'function', 'Service Worker message handler was not registered');
assert.equal(typeof activateHandler, 'function', 'Service Worker activate handler was not registered');

const runtimeCacheName = `${swConfig.cacheName}-__TOUKEI_BUILD_REVISION__`;
const memoryCache = await cacheStorage.open(runtimeCacheName);

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

async function dispatchMessage(data) {
  const messages = [];
  let work = Promise.resolve();
  messageHandler({
    data,
    source: { postMessage(message) { messages.push(message); } },
    waitUntil(value) { work = Promise.resolve(value); },
  });
  await work;
  return messages;
}

async function dispatchActivate() {
  let work = Promise.resolve();
  activateHandler({ waitUntil(value) { work = Promise.resolve(value); } });
  await work;
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
assert.equal(dreamRouteResponse.status, 200, 'offline Docsify extensionless route must resolve to cached .md');
assert.equal(await dreamRouteResponse.text(), '# cached DREAM THEATER');

const instantCachedUrl = new URL('textbook/offline-speed.md', scope).href;
await memoryCache.put(
  instantCachedUrl,
  new Response('# instant cached page', { status: 200, headers: { 'Content-Type': 'text/markdown' } }),
);
let offlineFetchCalls = 0;
fetchImplementation = () => {
  offlineFetchCalls += 1;
  return new Promise(() => {});
};
const instantResponse = await Promise.race([
  dispatch(new Request(new URL('textbook/offline-speed', scope))),
  new Promise((_, reject) => setTimeout(
    () => reject(new Error('offline cached page waited for the network')),
    250,
  )),
]);
assert.equal(instantResponse.status, 200, 'offline cached same-origin page must return immediately');
assert.equal(await instantResponse.text(), '# instant cached page');
assert.equal(offlineFetchCalls, 0, 'known-offline cached page must not start a fetch');

sandbox.self.navigator.onLine = true;
const freshOnlineUrl = new URL('textbook/online-fresh.md', scope).href;
await memoryCache.put(
  freshOnlineUrl,
  new Response('# stale cached page', { status: 200, headers: { 'Content-Type': 'text/markdown' } }),
);
let onlineFetchCalls = 0;
fetchImplementation = async () => {
  onlineFetchCalls += 1;
  return new Response('# latest online page', { status: 200, headers: { 'Content-Type': 'text/markdown' } });
};
const freshOnlineResponse = await dispatch(new Request(freshOnlineUrl));
assert.equal(freshOnlineResponse.status, 200, 'online same-origin request must succeed');
assert.equal(await freshOnlineResponse.text(), '# latest online page');
assert.equal(onlineFetchCalls, 1, 'online same-origin request must hit the network');
const refreshedCachedResponse = await memoryCache.match(freshOnlineUrl);
assert.equal(await refreshedCachedResponse.text(), '# latest online page', 'online response must refresh runtime cache');

const pseudoOnlineUrl = new URL('home.md', scope).href;
await memoryCache.put(
  pseudoOnlineUrl,
  new Response('# saved home', { status: 200, headers: { 'Content-Type': 'text/markdown' } }),
);
let pseudoOnlineFetchCalls = 0;
fetchImplementation = async () => {
  pseudoOnlineFetchCalls += 1;
  return new Response('<html><h1>404 - Not found</h1></html>', {
    status: 200,
    headers: { 'Content-Type': 'text/html; charset=utf-8' },
  });
};
const pseudoOnlineResponse = await dispatch(new Request(pseudoOnlineUrl));
assert.equal(pseudoOnlineResponse.status, 200, 'nominally-online HTML error must fall back to saved Markdown');
assert.equal(await pseudoOnlineResponse.text(), '# saved home');
assert.equal(pseudoOnlineFetchCalls, 1, 'first nominally-online request should probe the network once');
const pseudoOnlineCached = await memoryCache.match(pseudoOnlineUrl);
assert.equal(await pseudoOnlineCached.text(), '# saved home', 'HTML error must not poison the runtime cache');

const cooldownUrl = new URL('textbook/cooldown.md', scope).href;
await memoryCache.put(
  cooldownUrl,
  new Response('# cooldown cached page', { status: 200, headers: { 'Content-Type': 'text/markdown' } }),
);
const cooldownResponse = await dispatch(new Request(cooldownUrl));
assert.equal(await cooldownResponse.text(), '# cooldown cached page');
assert.equal(pseudoOnlineFetchCalls, 1, 'degraded-path cooldown must avoid repeated failed fetches');

sandbox.self.navigator.onLine = false;
const imageCachedUrl = new URL('textbook/assets/offline-test.png', scope).href;
await memoryCache.put(
  imageCachedUrl,
  new Response('image-bytes', { status: 200, headers: { 'Content-Type': 'image/png' } }),
);
fetchImplementation = async () => {
  throw new Error('offline');
};
const imageResponse = await dispatch(new Request(`${imageCachedUrl}?revision=123`));
assert.equal(imageResponse.status, 200, 'query-string image request must resolve to cached image');
assert.equal(await imageResponse.text(), 'image-bytes');

const mediaCachedUrl = new URL('textbook/assets/offline-test.bin', scope).href;
await memoryCache.put(
  mediaCachedUrl,
  new Response('0123456789', { status: 200, headers: { 'Content-Type': 'application/octet-stream' } }),
);
const rangeResponse = await dispatch(new Request(mediaCachedUrl, { headers: { Range: 'bytes=2-5' } }));
assert.equal(rangeResponse.status, 206, 'cached range request must return HTTP 206');
assert.equal(rangeResponse.headers.get('content-range'), 'bytes 2-5/10');
assert.equal(await rangeResponse.text(), '2345');

// Regression: migrate a previously saved file out of the old revision-scoped
// runtime cache before deleting that cache.
const legacyName = `${swConfig.cacheName}-legacy-revision`;
const legacyCache = await cacheStorage.open(legacyName);
const migratedPath = 'textbook/migrated.md';
const migratedUrl = new URL(migratedPath, scope).href;
const migratedBody = '# unchanged legacy material';
await legacyCache.put(
  migratedUrl,
  new Response(migratedBody, { status: 200, headers: { 'Content-Type': 'text/markdown' } }),
);
const activationManifest = {
  schemaVersion: 1,
  revision: 'revision-2',
  files: [{ path: migratedPath, sha256: sha256(Buffer.from(migratedBody)) }],
};
fetchImplementation = async (input) => {
  const url = typeof input === 'string' ? input : input.url;
  if (url.endsWith('pages-manifest.json')) {
    return new Response(JSON.stringify(activationManifest), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  }
  throw new Error(`unexpected activation fetch: ${url}`);
};
await dispatchActivate();
assert(!cacheStores.has(legacyName), 'legacy revision cache must be removed after successful local migration');
const persistentCache = await cacheStorage.open(swConfig.offlineContentCacheName);
const migratedResponse = await persistentCache.match(migratedUrl);
assert.equal(await migratedResponse.text(), migratedBody, 'legacy saved material must survive deployment migration');

// Regression: a manual update must fetch only changed/new content. The migrated
// file has no stored local hash manifest yet, so the worker must hash its cached
// bytes locally and skip the network when they still match.
const changedPath = 'textbook/changed.md';
const changedUrl = new URL(changedPath, scope).href;
const staleChangedBody = '# old changed material';
const freshChangedBody = '# new changed material';
await persistentCache.put(
  changedUrl,
  new Response(staleChangedBody, { status: 200, headers: { 'Content-Type': 'text/markdown' } }),
);
const differentialManifest = {
  schemaVersion: 1,
  revision: 'revision-2',
  files: [
    { path: migratedPath, sha256: sha256(Buffer.from(migratedBody)) },
    { path: changedPath, sha256: sha256(Buffer.from(freshChangedBody)) },
  ],
};
const siteMeta = {
  schemaVersion: 1,
  revision: 'revision-2',
  updatedAt: '2026-09-13T00:00:00Z',
};
const contentFetches = [];
fetchImplementation = async (input) => {
  const url = typeof input === 'string' ? input : input.url;
  if (url.endsWith('site-meta.json')) {
    return new Response(JSON.stringify(siteMeta), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  }
  if (url.endsWith('pages-manifest.json')) {
    return new Response(JSON.stringify(differentialManifest), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  }
  if (url === changedUrl) {
    contentFetches.push(url);
    return new Response(freshChangedBody, {
      status: 200,
      headers: { 'Content-Type': 'text/markdown' },
    });
  }
  if (url === migratedUrl) {
    contentFetches.push(url);
    return new Response(migratedBody, {
      status: 200,
      headers: { 'Content-Type': 'text/markdown' },
    });
  }
  throw new Error(`unexpected differential fetch: ${url}`);
};
const firstMessages = await dispatchMessage({ type: 'CACHE_PUBLISHED_FILES' });
assert.deepEqual(contentFetches, [changedUrl], 'unchanged cached material must not be re-downloaded');
const completion = firstMessages.find((message) => message.type === 'CACHE_COMPLETE');
assert(completion, 'differential cache update must complete');
assert.equal(completion.updated, 1, 'exactly one changed file should be downloaded');
assert.equal(completion.unchanged, 1, 'exactly one unchanged file should be reused');
assert.equal(completion.succeeded, 2, 'complete offline snapshot should contain both files');
const refreshedPersistent = await persistentCache.match(changedUrl);
assert.equal(await refreshedPersistent.text(), freshChangedBody, 'changed offline material must be replaced');

contentFetches.length = 0;
const secondMessages = await dispatchMessage({ type: 'CACHE_PUBLISHED_FILES' });
assert.deepEqual(contentFetches, [], 'second save with identical hashes must download no content files');
const secondCompletion = secondMessages.find((message) => message.type === 'CACHE_COMPLETE');
assert.equal(secondCompletion.updated, 0, 'identical manifest should require zero content downloads');
assert.equal(secondCompletion.unchanged, 2, 'all content should be reused when hashes are unchanged');

console.log(`Offline manifests validated: ${manifest.size} files (${imageFiles.length} images), all SHA-256 hashes match.`);
console.log(`DREAM THEATER offline links validated: ${new Set(lectureLinks).size}.`);
console.log('Service Worker runtime fallback, legacy migration, differential updates, query-string assets, and range tests passed.');
