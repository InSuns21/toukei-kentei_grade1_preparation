importScripts('./sw-config.js');

const config = self.TOUKEI_SW_CONFIG || {};
const cacheName = config.cacheName || 'toukei-grade1-runtime-v1';
const cachePrefix = config.cachePrefix || 'toukei-grade1-';
const supportedStrategies = new Set([
  'network-first',
  'cache-first',
  'stale-while-revalidate',
]);
let manualCacheJob = null;

function strategyFor(kind) {
  const configured = config.strategyByKind?.[kind] || config.defaultStrategy || 'network-first';
  return supportedStrategies.has(configured) ? configured : 'network-first';
}

function isCacheable(response) {
  return response && (response.ok || response.type === 'opaque');
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

async function cachedFallback(request, cache) {
  const cached = await cache.match(request);
  if (cached) return cached;

  if (request.mode === 'navigate' && config.navigationFallback) {
    const fallbackUrl = new URL(config.navigationFallback, self.registration.scope).href;
    const fallback = await cache.match(fallbackUrl);
    if (fallback) return fallback;
  }

  return Response.error();
}

async function updateCache(cache, request) {
  const response = await fetch(request);
  if (isCacheable(response)) {
    await cache.put(request, response.clone());
  }
  return response;
}

async function networkFirst(request, cache) {
  try {
    return await updateCache(cache, request);
  } catch {
    return cachedFallback(request, cache);
  }
}

async function cacheFirst(request, cache) {
  const cached = await cache.match(request);
  if (cached) return cached;

  try {
    return await updateCache(cache, request);
  } catch {
    return cachedFallback(request, cache);
  }
}

async function staleWhileRevalidate(event, request, cache) {
  const cached = await cache.match(request);
  const refresh = updateCache(cache, request).catch(() => null);

  if (cached) {
    event.waitUntil(refresh);
    return cached;
  }

  const response = await refresh;
  return response || cachedFallback(request, cache);
}

async function applyStrategy(event, request, kind) {
  const cache = await caches.open(cacheName);
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
  if (!isCacheable(response)) return false;

  await cache.put(request, response.clone());

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

async function cachePublishedFiles(source) {
  const startMeta = await readSiteMeta();
  if (!startMeta) {
    notify(source, {
      type: 'CACHE_ERROR',
      message: '教材サイトの更新情報を取得できませんでした。オンライン接続を確認してください。',
    });
    return;
  }

  const manifestUrls = await readPublishedUrls();
  if (!manifestUrls.length) {
    notify(source, {
      type: 'CACHE_ERROR',
      message: '公開教材一覧を取得できませんでした。オンライン接続を確認してください。',
    });
    return;
  }

  const urls = [...new Set([
    ...manifestUrls,
    ...(config.appShell || []).map((url) => new URL(url, self.registration.scope).href),
    ...(config.externalAssets || []),
  ])];
  const total = urls.length;
  const cache = await caches.open(cacheName);
  const queue = [...urls];
  const concurrency = Math.min(Math.max(Number(config.manualCacheConcurrency) || 6, 1), total);
  let completed = 0;
  let failed = 0;

  notify(source, {
    type: 'CACHE_STARTED',
    total,
    siteRevision: startMeta.revision,
    siteUpdatedAt: startMeta.updatedAt,
  });

  async function worker() {
    while (queue.length) {
      const url = queue.shift();
      try {
        const cached = await precacheOne(cache, url);
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

  const endMeta = await readSiteMeta();
  if (!endMeta || endMeta.revision !== startMeta.revision) {
    notify(source, {
      type: 'CACHE_ERROR',
      message: '保存中に教材サイトが更新されました。最新版をそろえるため、もう一度保存してください。',
    });
    return;
  }

  notify(source, {
    type: 'CACHE_COMPLETE',
    total,
    succeeded: total - failed,
    failed,
    siteRevision: endMeta.revision,
    siteUpdatedAt: endMeta.updatedAt,
  });
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
    await Promise.all(
      names
        .filter((name) => name.startsWith(cachePrefix) && name !== cacheName)
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
