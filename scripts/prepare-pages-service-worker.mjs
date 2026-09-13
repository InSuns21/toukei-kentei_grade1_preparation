import { createHash } from 'node:crypto';
import { access, cp, readFile, readdir, writeFile } from 'node:fs/promises';
import { execFile } from 'node:child_process';
import { promisify } from 'node:util';
import path from 'node:path';

const execFileAsync = promisify(execFile);
const root = process.cwd();
const pagesDir = path.join(root, 'pages');
const outDir = path.join(root, '_site');
const serviceWorkerFile = 'service-worker.js';
const copiedFiles = ['sw-config.js'];
const revisionMarker = '__TOUKEI_BUILD_REVISION__';
const textManifestFile = 'pages-manifest.txt';
const hashManifestFile = 'pages-manifest.json';

await access(outDir);

async function git(...args) {
  const { stdout } = await execFileAsync('git', args, { cwd: root });
  return stdout.trim();
}

async function recursivePublishedFiles(baseDir, relativeDir = '') {
  const dir = path.join(baseDir, relativeDir);
  const entries = await readdir(dir, { withFileTypes: true });
  const files = [];

  for (const entry of entries) {
    const relative = path.posix.join(relativeDir.replaceAll('\\', '/'), entry.name);
    if (entry.isDirectory()) {
      files.push(...await recursivePublishedFiles(baseDir, relative));
    } else if (entry.isFile()) {
      files.push(relative);
    }
  }

  return files;
}

async function sha256File(relative) {
  const bytes = await readFile(path.join(outDir, relative));
  return createHash('sha256').update(bytes).digest('hex');
}

let revision = process.env.GITHUB_SHA || '';
if (!revision) {
  try {
    revision = await git('rev-parse', 'HEAD');
  } catch {
    revision = 'local';
  }
}
if (!/^[A-Za-z0-9._-]+$/.test(revision)) {
  throw new Error(`Unsafe Pages revision for Service Worker: ${revision}`);
}

const serviceWorkerSourcePath = path.join(pagesDir, serviceWorkerFile);
const serviceWorkerSource = await readFile(serviceWorkerSourcePath, 'utf8');

// Parse the source before substitution, then require exactly one build marker.
// Stamping the revision into the main Service Worker script guarantees that a
// deployment changes its bytes and therefore triggers the browser SW update
// algorithm even when sw-config.js itself is unchanged or HTTP-cached.
new Function(serviceWorkerSource);
const markerCount = serviceWorkerSource.split(revisionMarker).length - 1;
if (markerCount !== 1) {
  throw new Error(
    `${serviceWorkerFile}: expected exactly one ${revisionMarker} marker, found ${markerCount}`,
  );
}
const builtServiceWorker = serviceWorkerSource.replace(revisionMarker, revision);
if (builtServiceWorker.includes(revisionMarker)) {
  throw new Error(`${serviceWorkerFile}: build revision marker survived substitution`);
}
const stampedRevisionDeclaration = `const buildRevision = '${revision}';`;
if (!builtServiceWorker.includes(stampedRevisionDeclaration)) {
  throw new Error(`${serviceWorkerFile}: build revision was not stamped into the worker`);
}
if (!builtServiceWorker.includes('const cacheName = `${cacheBaseName}-${buildRevision}`;')) {
  throw new Error(`${serviceWorkerFile}: runtime cache name is not revision-scoped`);
}
if (!builtServiceWorker.includes("offlineContentCacheName || 'toukei-grade1-offline-content-v1'")) {
  throw new Error(`${serviceWorkerFile}: persistent offline content cache is not configured`);
}
new Function(builtServiceWorker);
await writeFile(path.join(outDir, serviceWorkerFile), builtServiceWorker, 'utf8');

for (const file of copiedFiles) {
  const sourcePath = path.join(pagesDir, file);
  const source = await readFile(sourcePath, 'utf8');

  // Parse browser scripts during CI without executing Service Worker APIs.
  new Function(source);
  await cp(sourcePath, path.join(outDir, file));
}

let updatedAt = '';
if (revision !== 'local') {
  try {
    updatedAt = await git('show', '-s', '--format=%cI', revision);
  } catch {
    updatedAt = '';
  }
}
if (!updatedAt) updatedAt = new Date().toISOString();

const builtAt = new Date().toISOString();
const siteMeta = {
  schemaVersion: 1,
  revision,
  updatedAt,
  builtAt,
};
await writeFile(
  path.join(outDir, 'site-meta.json'),
  `${JSON.stringify(siteMeta, null, 2)}\n`,
  'utf8',
);

// Generate both the legacy path-only manifest used by the live smoke test and
// a content-addressed manifest used by the browser for differential offline
// updates. The manifests themselves are excluded to avoid recursive hashing.
const publishedFiles = (await recursivePublishedFiles(outDir))
  .filter((relative) => relative !== '.nojekyll'
    && relative !== textManifestFile
    && relative !== hashManifestFile)
  .sort((a, b) => a.localeCompare(b, 'en'));

await writeFile(
  path.join(outDir, textManifestFile),
  `${publishedFiles.join('\n')}\n`,
  'utf8',
);

const hashEntries = await Promise.all(
  publishedFiles.map(async (relative) => ({
    path: relative,
    sha256: await sha256File(relative),
  })),
);
const hashManifest = {
  schemaVersion: 1,
  revision,
  generatedAt: builtAt,
  files: hashEntries,
};
await writeFile(
  path.join(outDir, hashManifestFile),
  `${JSON.stringify(hashManifest, null, 2)}\n`,
  'utf8',
);

console.log(
  `Service Worker assets validated and published: ${[serviceWorkerFile, ...copiedFiles].join(', ')}`,
);
console.log(`Service Worker cache revision stamped: ${revision}`);
console.log(`Site metadata published: ${revision.slice(0, 8)} @ ${updatedAt}`);
console.log(`Offline manifests published: ${publishedFiles.length} files with SHA-256 hashes`);
