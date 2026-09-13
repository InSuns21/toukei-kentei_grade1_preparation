importScripts('./sw-config.js');

const config = self.TOUKEI_SW_CONFIG || {};
const buildRevision = '__TOUKEI_BUILD_REVISION__';
const cacheBaseName = config.cacheName || 'toukei-grade1-runtime';
const cacheName = `${cacheBaseName}-${buildRevision}`;
const cachePrefix = config.cachePrefix || 'toukei-grade1-';
const offlineContentCacheName = config.offlineContentCacheName || 'toukei-grade1-offline-content-v1';
const offlineMetadataCacheName = config.offlineMetadataCacheName || 'toukei-grade1-offline-metadata-v1';
const offlineStageCachePrefix = config.offlineStageCachePrefix || 'toukei-grade1-offline-stage-';
const offlineManifestStateUrl = new URL(
  './__offline-cache-manifest-v1__.json',
  self.registration.scope,
).href;
const supportedStrategies = new Set([
  'network-first',
  'cache-first',
  'stale-while-revalidate',
]);
let manualCacheJob = null;
let networkDegradedUntil = 0;

function strategyFor(kind) {
  const configured = config.strategyByKind?.[kind] || config.defaultStrategy || 'network-first';
  return supportedStrategies.has(configured) ? configured : 'network-first';
}

function isCacheable(response) {
  return response && response.status !== 206 && (response.ok || response.type === 'opaque');
}

function isSameOriginRequest(request) {
  return new URL(request.url).origin === self.location.origin;
}

function responseLooksUsable(request, response) {
  if (!response) return false;
  if (response.type === 'opaque') return true;
  if (!response.ok) return false;

  if (!isSameOriginRequest(request) || request.mode === 'navigate') {
    return true;
  }

  const contentType = (response.headers.get('content-type') || '').toLowerCase();
  const pathname = new URL(request.url).pathname.toLowerCase();
  if (contentType.includes('text/html') && !pathname.endsWith('.html')) {
    return false;
  }

  return true;
}

function requestKind(request) {
  if (request.mode === 'navigate') return 'navigation';

  const url = new URL(request.url);
  if (url.origin === self.location.origin) return 'sameOrigin';

  if ((config.cacheExternalHosts || []).includes(url.hostname)) {
    return 'externalAsset';
  }

  return null;
}

function requestForNetwork(request) {
  const url = new URL(request.url);
  if (url.origin !== self.location.origin) return request;

  return new Request(request, { cache: 'reload' });
}

function normalizedSameOriginUrl(rawUrl) {
  const url = new URL(rawUrl);
  if (url.origin !== self.location.origin) return url.href;
  url.search = '';
  url.hash = '';
  return url.href;
}

function cacheKeyFor(request) {
  const url = new URL(request.url);
  if (url.origin !== self.location.origin) return request;
  return normalizedSameOriginUrl(url.href);
}

function cacheCandidates(request) {
  const url = new URL(request.url);
  const candidates = [];
  const seen = new Set();

  function add(value) {
    const href = typeof value === 'string' ? value : value.href;
    if (!seen.has(href)) {
      seen.add(href);
      candidates.push(href);
    }
  }

  add(request.url);
  if (url.origin !== self.location.origin) return candidates;

  const clean = new URL(normalizedSameOriginUrl(url.href));
  add(clean);

  const pathname = clean.pathname;
  const finalSegment = pathname.slice(pathname.lastIndexOf('/') + 1);
  const hasExtension = finalSegment.includes('.');

  if (pathname.endsWith('/')) {
    const indexUrl = new URL(clean.href);
    indexUrl.pathname += 'index.md';
    add(indexUrl);

    const readmeUrl = new URL(clean.href);
    readmeUrl.pathname += 'README.md';
    add(readmeUrl);
  } else if (!hasExtension) {
    const markdownUrl = new URL(clean.href);
    markdownUrl.pathname += '.md';
    add(markdownUrl);

    const indexUrl = new URL(clean.href);
    indexUrl.pathname += '/index.md';
    add(indexUrl);

    const readmeUrl = new URL(clean.href);
    readmeUrl.pathname += '/README.md';
    add(readmeUrl);
  }

  return candidates;
}

function parseByteRange(header, size) {
  const match = /^bytes=(\d*)-(\d*)$/i.exec(header || '');
  if (!match || size <= 0) return null;

  const startText = match[1];
  const endText = match[2];
  if (!startText && !endText) return null;

  let start;
  let end;

  if (!startText) {
    const suffixLength = Number(endText);
    if (!Number.isInteger(suffixLength) || suffixLength <= 0) return null;
    start = Math.max(size - suffixLength, 0);
    end = size - 1;
  } else {
    start = Number(startText);
    if (!Number.isInteger(start) || start < 0 || start >= size) return null;
    end = endText ? Number(endText) : size - 1;
    if (!Number.isInteger(end) || end < start) return null;
    end = Math.min(end, size - 1);
  }

  return { start, end };
}

async function responseForRequest(request, cached) {
  const rangeHeader = request.headers.get('range');
  if (!rangeHeader || cached.status !== 200 || cached.type === 'opaque') {
    return cached;
  }

  const body = await cached.arrayBuffer();
  const range = parseByteRange(rangeHeader, body.byteLength);
  if (!range) {
    return new Response(null, {
      status: 416,
      headers: {
        'Content-Range': `bytes */${body.byteLength}`,
        'Accept-Ranges': 'bytes',
      },
    });
  }

  const headers = new Headers(cached.headers);
  headers.delete('content-encoding');
  headers.set('Accept-Ranges', 'bytes');
  headers.set('Content-Range', `bytes ${range.start}-${range.end}/${body.byteLength}`);
  headers.set('Content-Length', String(range.end - range.start + 1));

  return new Response(body.slice(range.start, range.end + 1), {
    status: 206,
    statusText: 'Partial Content',
    headers,
  });
}

async function findCachedResponse(request, cache) {
  for (const candidate of cacheCandidates(request)) {
    const cached = await cache.match(candidate, { ignoreSearch: true });
    if (cached) return responseForRequest(request, cached);
  }
  return null;
}

function isManagedAuxiliaryCache(name) {
  return name === offlineContentCacheName
    || name === offlineMetadataCacheName
    || name.startsWith(offlineStageCachePrefix);
}

async function findLegacyCachedResponse(request) {
  const names = await caches.keys();
  for (const name of names) {
    if (!name.startsWith(cachePrefix) || name === cacheName || isManagedAuxiliaryCache(name)) continue;
    const legacy = await caches.open(name);
    const cached = await findCachedResponse(request, legacy);
    if (cached) return cached;
  }
  return null;
}

async function cachedFallback(request, primaryCache) {
  const cached = await findCachedResponse(request, primaryCache);
  if (cached) return cached;

  if (isSameOriginRequest(request)) {
    const offlineContent = await caches.open(offlineContentCacheName);
    const saved = await findCachedResponse(request, offlineContent);
    if (saved) return saved;

    const legacy = await findLegacyCachedResponse(request);
    if (legacy) return legacy;
  }

  if (request.mode === 'navigate' && config.navigationFallback) {
    const fallbackUrl = new URL(config.navigationFallback, self.registration.scope).href;
    const fallback = await primaryCache.match(fallbackUrl, { ignoreSearch: true });
    if (fallback) return fallback;

    const offlineContent = await caches.open(offlineContentCacheName);
    const savedFallback = await offlineContent.match(fallbackUrl, { ignoreSearch: true });
    if (savedFallback) return savedFallback;
  }

  return Response.error();
}

function markNetworkDegraded() {
  const cooldown = Math.max(Number(config.networkFailureCooldownMs) || 0, 0);
  networkDegradedUntil = cooldown ? Date.now() + cooldown : 0;
}

function clearNetworkDegraded() {
  networkDegradedUntil = 0;
}

function isNetworkDegraded() {
  return networkDegradedUntil > Date.now();
}

async function fetchWithTimeout(request) {
  const networkRequest = requestForNetwork(request);
  const timeoutMs = Math.max(Number(config.networkTimeoutMs) || 0, 0);
  if (!timeoutMs || typeof AbortController === 'undefined') {
    return fetch(networkRequest);
  }

  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), timeoutMs);
  try {
    return await fetch(networkRequest, { signal: controller.signal });
  } finally {
    clearTimeout(timer);
  }
}

async function updateCache(cache, request) {
  const response = await fetchWithTimeout(request);
  if (isCacheable(response) && responseLooksUsable(request, response)) {
    await cache.put(cacheKeyFor(request), response.clone());
  }
  return response;
}

async function networkFirst(request, cache) {
  try {
    const response = await updateCache(cache, request);
    if (!responseLooksUsable(request, response)) {
      if (isSameOriginRequest(request)) markNetworkDegraded();
      const fallback = await cachedFallback(request, cache);
      if (fallback) return fallback;
      return response;
    }

    if (isSameOriginRequest(request)) clearNetworkDegraded();
    return response;
  } catch {
    if (isSameOriginRequest(request)) markNetworkDegraded();
    return cachedFallback(request, cache);
  }
}

async function cacheFirst(request, cache) {
  const cached = await findCachedResponse(request, cache);
  if (cached) return cached;

  try {
    const response = await updateCache(cache, request);
    if (!responseLooksUsable(request, response)) {
      return cachedFallback(request, cache);
    }
    return response;
  } catch {
    return cachedFallback(request, cache);
  }
}

async function staleWhileRevalidate(event, request, cache) {
  const cached = await findCachedResponse(request, cache);
  const refresh = updateCache(cache, request).catch(() => null);

  if (cached) {
    event.waitUntil(refresh);
    return cached;
  }

  const response = await refresh;
  if (response && responseLooksUsable(request, response)) return response;
  return cachedFallback(request, cache);
}

async function applyStrategy(event, request, kind) {
  const cache = await caches.open(cacheName);

  if (self.navigator?.onLine === false) {
    return cachedFallback(request, cache);
  }

  if ((kind === 'navigation' || kind === 'sameOrigin') && isNetworkDegraded()) {
    const fallback = await cachedFallback(request, cache);
    if (fallback.type !== 'error') return fallback;
  }

  const strategy = strategyFor(kind);

  if (strategy === 'cache-first') {
    return cacheFirst(request, cache);
  }
  if (strategy === 'stale-while-revalidate') {
    return staleWhileRevalidate(event, request, cache);
  }
  return networkFirst(request, cache);
}

function cssDependencyUrls(cssText, cssUrl) {
  const urls = [];
  for (const match of cssText.matchAll(/url\(\s*(['"]?)([^'"\)]+)\1\s*\)/g)) {
    const value = match[2].trim();
    if (!value || value.startsWith('data:')) continue;
    urls.push(new URL(value, cssUrl).href);
  }
  return [...new Set(urls)];
}

async function precacheOne(cache, rawUrl, followCssDependencies = true) {
  const url = new URL(rawUrl, self.registration.scope).href;
  const request = new Request(url, { cache: 'reload' });
  const response = await fetch(request);
  if (!isCacheable(response) || !responseLooksUsable(request, response)) return false;

  await cache.put(cacheKeyFor(request), response.clone());

  const contentType = response.headers.get('content-type') || '';
  if (!followCssDependencies || !contentType.includes('text/css') || response.type === 'opaque') {
    return true;
  }

  const cssText = await response.clone().text();
  const dependencies = cssDependencyUrls(cssText, response.url || url);
  await Promise.allSettled(
    dependencies.map((dependency) => precacheOne(cache, dependency, false)),
  );
  return true;
}

async function readPublishedUrls() {
  if (!config.publishedFilesManifest) return [];

  try {
    const manifestUrl = new URL(config.publishedFilesManifest, self.registration.scope).href;
    const response = await fetch(manifestUrl, { cache: 'no-store' });
    if (!response.ok) return [];

    const text = await response.text();
    return text
      .split(/\r?\n/)
      .map((line) => line.trim())
      .filter(Boolean)
      .map((line) => new URL(line, self.registration.scope).href);
  } catch {
    return [];
  }
}

async function readPublishedManifest() {
  const configured = config.publishedFilesHashManifest || './pages-manifest.json';
  try {
    const manifestUrl = new URL(configured, self.registration.scope).href;
    const response = await fetch(manifestUrl, { cache: 'no-store' });
    if (!response.ok) return null;
    const manifest = await response.json();
    if (!manifest || manifest.schemaVersion !== 1 || !Array.isArray(manifest.files)) return null;

    const files = [];
    for (const item of manifest.files) {
      if (!item || typeof item.path !== 'string' || !/^[a-f0-9]{64}$/i.test(item.sha256 || '')) {
        return null;
      }
      files.push({
        path: item.path,
        url: new URL(item.path, self.registration.scope).href,
        sha256: item.sha256.toLowerCase(),
      });
    }

    return {
      schemaVersion: 1,
      revision: manifest.revision || null,
      files,
    };
  } catch {
    return null;
  }
}

async function readSiteMeta() {
  try {
    const metaUrl = new URL(config.siteMetaUrl || './site-meta.json', self.registration.scope).href;
    const response = await fetch(metaUrl, { cache: 'no-store' });
    if (!response.ok) return null;
    const meta = await response.json();
    if (!meta || !meta.revision || !meta.updatedAt) return null;
    return meta;
  } catch {
    return null;
  }
}

async function publishedUrls() {
  if (!config.warmPublishedFiles) return [];
  return readPublishedUrls();
}

function notify(source, payload) {
  if (source && typeof source.postMessage === 'function') {
    source.postMessage(payload);
  }
}

function boundedLocalConcurrency(total) {
  if (!total) return 0;
  return Math.min(
    Math.max(Number(config.manualCacheLocalConcurrency) || 12, 1),
    total,
  );
}

async function sha256Response(response) {
  if (!self.crypto?.subtle) return null;
  const bytes = await response.arrayBuffer();
  const digest = await self.crypto.subtle.digest('SHA-256', bytes);
  return [...new Uint8Array(digest)]
    .map((byte) => byte.toString(16).padStart(2, '0'))
    .join('');
}

async function readStoredOfflineManifest() {
  try {
    const metadataCache = await caches.open(offlineMetadataCacheName);
    const response = await metadataCache.match(offlineManifestStateUrl);
    if (!response) return null;
    const state = await response.json();
    if (!state || state.schemaVersion !== 1 || !Array.isArray(state.files)) return null;
    return state;
  } catch {
    return null;
  }
}

async function writeStoredOfflineManifest(manifest) {
  const metadataCache = await caches.open(offlineMetadataCacheName);
  const state = {
    schemaVersion: 1,
    revision: manifest.revision || null,
    files: manifest.files.map(({ path, sha256 }) => ({ path, sha256 })),
  };
  await metadataCache.put(
    offlineManifestStateUrl,
    new Response(JSON.stringify(state), {
      headers: { 'Content-Type': 'application/json' },
    }),
  );
}

async function filesNeedingRefresh(manifest, contentCache, source) {
  const stored = await readStoredOfflineManifest();
  const storedHashes = new Map(
    (stored?.files || []).map((item) => [item.path, String(item.sha256 || '').toLowerCase()]),
  );
  const needsRefresh = new Set();
  const queue = [...manifest.files];
  const total = queue.length;
  const concurrency = boundedLocalConcurrency(total);
  let completed = 0;

  notify(source, {
    type: 'CACHE_CHECKING',
    completed: 0,
    total,
  });

  async function worker() {
    while (queue.length) {
      const file = queue.shift();
      const cached = await contentCache.match(file.url, { ignoreSearch: true });
      if (!cached) {
        needsRefresh.add(file.path);
      } else {
        const storedHash = storedHashes.get(file.path);
        if (storedHash !== file.sha256) {
          // The first version with persistent content may inherit files from the
          // old revision-scoped cache without a local hash manifest. Hash those
          // bytes locally once so unchanged material does not cross the network.
          if (!storedHash) {
            const cachedHash = await sha256Response(cached.clone());
            if (cachedHash !== file.sha256) needsRefresh.add(file.path);
          } else {
            needsRefresh.add(file.path);
          }
        }
      }

      completed += 1;
      if (completed === total || completed % 25 === 0) {
        notify(source, {
          type: 'CACHE_CHECK_PROGRESS',
          completed,
          total,
        });
      }
    }
  }

  await Promise.all(Array.from({ length: concurrency }, () => worker()));
  const changed = manifest.files.filter((file) => needsRefresh.has(file.path));
  return { changed, unchanged: manifest.files.length - changed.length };
}

async function removeObsoleteOfflineFiles(contentCache, manifest) {
  const current = new Set(manifest.files.map((file) => file.url));
  const requests = await contentCache.keys();
  await Promise.all(
    requests
      .filter((request) => isSameOriginRequest(request) && !current.has(normalizedSameOriginUrl(request.url)))
      .map((request) => contentCache.delete(request)),
  );
}

async function commitStage(stageCache, contentCache, changedFiles, source) {
  const queue = [...changedFiles];
  const total = queue.length;
  const concurrency = boundedLocalConcurrency(total);
  let completed = 0;

  if (!total) return;

  notify(source, {
    type: 'CACHE_FINALIZING',
    completed: 0,
    total,
  });

  async function worker() {
    while (queue.length) {
      const file = queue.shift();
      const response = await stageCache.match(file.url, { ignoreSearch: true });
      if (!response) throw new Error(`staged response missing: ${file.path}`);
      await contentCache.put(file.url, response);

      completed += 1;
      if (completed === total || completed % 25 === 0) {
        notify(source, {
          type: 'CACHE_FINALIZING',
          completed,
          total,
        });
      }
    }
  }

  await Promise.all(Array.from({ length: concurrency }, () => worker()));
}

async function cachePublishedFiles(source) {
  notify(source, {
    type: 'CACHE_CHECKING',
    completed: 0,
    total: 0,
  });

  const startMeta = await readSiteMeta();
  if (!startMeta) {
    notify(source, {
      type: 'CACHE_ERROR',
      message: '教材サイトの更新情報を取得できませんでした。オンライン接続を確認してください。',
    });
    return;
  }

  const manifest = await readPublishedManifest();
  if (!manifest || !manifest.files.length) {
    notify(source, {
      type: 'CACHE_ERROR',
      message: '公開教材一覧を取得できませんでした。オンライン接続を確認してください。',
    });
    return;
  }
  if (manifest.revision && manifest.revision !== startMeta.revision) {
    notify(source, {
      type: 'CACHE_ERROR',
      message: '教材一覧とサイト更新情報が一致しません。少し後でもう一度保存してください。',
    });
    return;
  }

  const contentCache = await caches.open(offlineContentCacheName);
  const { changed, unchanged } = await filesNeedingRefresh(manifest, contentCache, source);
  const total = changed.length;
  const stageCacheName = `${offlineStageCachePrefix}${startMeta.revision}`;
  await caches.delete(stageCacheName);
  const stageCache = await caches.open(stageCacheName);
  const queue = [...changed];
  const concurrency = total
    ? Math.min(Math.max(Number(config.manualCacheConcurrency) || 6, 1), total)
    : 0;
  let completed = 0;
  let failed = 0;

  notify(source, {
    type: 'CACHE_STARTED',
    total,
    fileCount: manifest.files.length,
    unchanged,
    siteRevision: startMeta.revision,
    siteUpdatedAt: startMeta.updatedAt,
  });

  async function worker() {
    while (queue.length) {
      const file = queue.shift();
      try {
        const cached = await precacheOne(stageCache, file.url, false);
        if (!cached) failed += 1;
      } catch {
        failed += 1;
      }

      completed += 1;
      if (completed === total || completed % 5 === 0) {
        notify(source, {
          type: 'CACHE_PROGRESS',
          completed,
          total,
          failed,
        });
      }
    }
  }

  await Promise.all(Array.from({ length: concurrency }, () => worker()));

  if (failed) {
    await caches.delete(stageCacheName);
    notify(source, {
      type: 'CACHE_ERROR',
      message: `更新が必要な ${total} 件のうち ${failed} 件を取得できませんでした。前回の保存内容は維持します。`,
    });
    return;
  }

  const endMeta = await readSiteMeta();
  if (!endMeta || endMeta.revision !== startMeta.revision) {
    await caches.delete(stageCacheName);
    notify(source, {
      type: 'CACHE_ERROR',
      message: '保存中に教材サイトが更新されました。最新版をそろえるため、もう一度保存してください。',
    });
    return;
  }

  await commitStage(stageCache, contentCache, changed, source);
  notify(source, { type: 'CACHE_CLEANUP' });
  await removeObsoleteOfflineFiles(contentCache, manifest);
  await writeStoredOfflineManifest(manifest);
  await caches.delete(stageCacheName);

  notify(source, {
    type: 'CACHE_COMPLETE',
    total,
    updated: total,
    unchanged,
    succeeded: manifest.files.length,
    fileCount: manifest.files.length,
    failed: 0,
    siteRevision: endMeta.revision,
    siteUpdatedAt: endMeta.updatedAt,
  });
}

async function migrateLegacyOfflineContent(cacheNames) {
  const legacyNames = cacheNames.filter(
    (name) => name.startsWith(cachePrefix) && name !== cacheName && !isManagedAuxiliaryCache(name),
  );
  if (!legacyNames.length) return true;

  const manifest = await readPublishedManifest();
  if (!manifest) return false;

  const allowed = new Set(manifest.files.map((file) => file.url));
  const contentCache = await caches.open(offlineContentCacheName);
  const candidates = [];

  for (const name of legacyNames) {
    const legacyCache = await caches.open(name);
    const requests = await legacyCache.keys();
    for (const request of requests) {
      const normalized = normalizedSameOriginUrl(request.url);
      if (!allowed.has(normalized)) continue;
      candidates.push({ legacyCache, request, normalized });
    }
  }

  const queue = candidates;
  const concurrency = boundedLocalConcurrency(queue.length);

  async function worker() {
    while (queue.length) {
      const { legacyCache, request, normalized } = queue.shift();
      if (await contentCache.match(normalized, { ignoreSearch: true })) continue;
      const response = await legacyCache.match(request);
      if (response) await contentCache.put(normalized, response);
    }
  }

  await Promise.all(Array.from({ length: concurrency }, () => worker()));
  return true;
}

self.addEventListener('install', (event) => {
  event.waitUntil((async () => {
    const cache = await caches.open(cacheName);
    const urls = [
      ...(config.appShell || []),
      ...(config.externalAssets || []),
      ...await publishedUrls(),
    ];

    await Promise.allSettled(
      [...new Set(urls)].map((url) => precacheOne(cache, url)),
    );

    await self.skipWaiting();
  })());
});

self.addEventListener('activate', (event) => {
  event.waitUntil((async () => {
    const names = await caches.keys();
    const migrated = await migrateLegacyOfflineContent(names);

    // Do not destroy the only offline copy if migration could not obtain the
    // new manifest. Legacy caches remain readable by cachedFallback and a later
    // Service Worker activation can retry the local migration.
    if (migrated) {
      await Promise.all(
        names
          .filter((name) => name.startsWith(cachePrefix)
            && name !== cacheName
            && !isManagedAuxiliaryCache(name))
          .map((name) => caches.delete(name)),
      );
    }

    await Promise.all(
      names
        .filter((name) => name.startsWith(offlineStageCachePrefix))
        .map((name) => caches.delete(name)),
    );
    await self.clients.claim();
  })());
});

self.addEventListener('message', (event) => {
  const data = event.data || {};
  if (data.type !== 'CACHE_PUBLISHED_FILES') return;

  if (manualCacheJob) {
    notify(event.source, { type: 'CACHE_BUSY' });
    return;
  }

  manualCacheJob = cachePublishedFiles(event.source)
    .catch(() => {
      notify(event.source, {
        type: 'CACHE_ERROR',
        message: '教材の保存中にエラーが発生しました。',
      });
    })
    .finally(() => {
      manualCacheJob = null;
    });
  event.waitUntil(manualCacheJob);
});

self.addEventListener('fetch', (event) => {
  const request = event.request;
  if (request.method !== 'GET') return;
  if (!/^https?:$/.test(new URL(request.url).protocol)) return;

  const kind = requestKind(request);
  if (!kind) return;

  event.respondWith(applyStrategy(event, request, kind));
});
