// Service Worker policy. Runtime shell caches remain revision-scoped, while
// manually saved 教材 live in a persistent content cache and are updated by
// content hash instead of being discarded on every deployment.
self.TOUKEI_SW_CONFIG = Object.freeze({
  cachePrefix: 'toukei-grade1-',
  cacheName: 'toukei-grade1-runtime',
  offlineContentCacheName: 'toukei-grade1-offline-content-v1',
  offlineMetadataCacheName: 'toukei-grade1-offline-metadata-v1',
  offlineStageCachePrefix: 'toukei-grade1-offline-stage-',
  numericalRuntimeCacheName: 'toukei-grade1-numerical-runtime-v1',
  numericalRuntimeUrlPrefixes: Object.freeze([
    'https://cdn.jsdelivr.net/pyodide/v314.0.7/full/',
  ]),

  // Online page/content requests always try the network with HTTP caching
  // disabled. Offline requests use stored content; a failed online request
  // also falls back to available cached content.
  defaultStrategy: 'network-first',
  strategyByKind: Object.freeze({
    navigation: 'network-first',
    sameOrigin: 'network-first',
    // These URLs are version-pinned, so cache-first avoids unnecessary CDN
    // traffic without risking stale runtime code.
    externalAsset: 'cache-first',
  }),

  // Give a working but slow connection time to return fresh content instead
  // of prematurely showing an old copy. When the network really is unusable,
  // fall back to cached content after this bounded wait; do not enter a
  // cooldown that skips later online fetches.
  networkTimeoutMs: 12000,
  // Optional install-time shell assets should not delay a worker update.
  installNetworkTimeoutMs: 2500,

  // Keep the shell and a same-origin KaTeX fallback available after the first
  // online visit. The local KaTeX CSS pulls its font dependencies into the
  // revision-scoped runtime cache during Service Worker install.
  appShell: Object.freeze([
    './index.html',
    './home.md',
    './_sidebar.md',
    './math-renderer.js',
    './numerical-lab-runtime.js',
    './numerical-lab-worker.mjs',
    './numerical-lab.css',
    './simulation/index.html',
    './simulation/geod.html',
    './simulation/geod.css',
    './simulation/geod-app.mjs',
    './simulation/geod-core.mjs',
    './simulation/vendor/geographiclib-geodesic.mjs',
    './simulation/geod-map.mjs',
    './simulation/geod-compare.mjs',
    './simulation/geod-japan.mjs',
    './simulation/geod-survey.mjs',
    './simulation/geod-gnss.mjs',
    './simulation/geod-gnss-space.mjs',
    './simulation/geod-height.mjs',
    './simulation/simulation.css',
    './simulation/simulation-app.mjs',
    './simulation/simulation-runtime.mjs',
    './simulation/simulation-worker-host.mjs',
    './simulation/protocol.mjs',
    './simulation/plot-adapters.mjs',
    './simulation/experiment-record.mjs',
    './simulation/engines/celev/two-body.mjs',
    './simulation/engines/celev/burrau.mjs',
    './simulation/engines/celev/orbit-gallery.mjs',
    './simulation/engines/ml/four-cell.mjs',
    './site-meta.json',
    './vendor/katex/katex.min.css',
    './vendor/katex/katex.min.js',
  ]),

  // Docsify remains CDN-backed for normal online loading. These assets are
  // version-pinned and kept in the small runtime cache; the large 教材 snapshot
  // is handled separately by the persistent content cache.
  externalAssets: Object.freeze([
    'https://cdn.jsdelivr.net/npm/docsify@4.13.1/lib/themes/vue.css',
    'https://cdn.jsdelivr.net/npm/katex@0.16.11/dist/katex.min.css',
    'https://cdn.jsdelivr.net/npm/katex@0.16.11/dist/katex.min.js',
    'https://cdn.jsdelivr.net/npm/docsify@4.13.1/lib/docsify.min.js',
    'https://cdn.jsdelivr.net/npm/docsify@4.13.1/lib/plugins/search.min.js',
  ]),
  cacheExternalHosts: Object.freeze(['cdn.jsdelivr.net']),

  navigationFallback: './index.html',
  siteMetaUrl: './site-meta.json',

  // Set this to true only if we later want every published file warmed during
  // Service Worker install. Manual offline saving uses the SHA-256 manifest
  // below and only downloads new or changed files.
  warmPublishedFiles: false,
  publishedFilesManifest: './pages-manifest.txt',
  publishedFilesHashManifest: './pages-manifest.json',

  // Network downloads use conservative concurrency. Local Cache Storage work
  // can be wider so checking/committing a large saved教材 set does not appear
  // to freeze after the network has already reached 100%.
  manualCacheConcurrency: 6,
  manualCacheLocalConcurrency: 12,
});

