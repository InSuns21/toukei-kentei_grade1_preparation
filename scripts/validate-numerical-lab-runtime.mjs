import assert from 'node:assert/strict';
import { execFileSync } from 'node:child_process';
import { readFile } from 'node:fs/promises';
import path from 'node:path';
import YAML from 'yaml';

const root = process.cwd();

async function read(relative) {
  return readFile(path.join(root, relative), 'utf8');
}

const [
  runtime,
  worker,
  indexHtml,
  swConfig,
  serviceWorker,
  buildPages,
  chapter,
  linkRegistryText,
] = await Promise.all([
  read('pages/numerical-lab-runtime.js'),
  read('pages/numerical-lab-worker.mjs'),
  read('pages/index.html'),
  read('pages/sw-config.js'),
  read('pages/service-worker.js'),
  read('scripts/build-pages.mjs'),
  read('textbook/volumes/00_foundations/NUMLAB0/index.md'),
  read('textbook/numerical-lab-links.yaml'),
]);

new Function(runtime);
execFileSync(process.execPath, ['--check', path.join(root, 'pages', 'numerical-lab-worker.mjs')], {
  stdio: 'pipe',
});

assert.match(worker, /pyodide\/v314\.0\.7\/full\/pyodide\.mjs/);
assert.match(worker, /loadPackagesFromImports/);
assert.match(runtime, /new Worker\(workerUrl\.href, \{ type: "module" \}\)/);
assert.match(runtime, /localStorage/);
assert.match(runtime, /terminateWorker/);
assert.match(runtime, /testPassed/);

assert.match(indexHtml, /numerical-lab\.css/);
assert.match(indexHtml, /numerical-lab-runtime\.js/);
assert.match(indexHtml, /ToukeiNumericalLab\.docsifyPlugin/);

for (const asset of [
  'numerical-lab-runtime.js',
  'numerical-lab-worker.mjs',
  'numerical-lab.css',
]) {
  assert.ok(buildPages.includes(`'${asset}'`), `build-pages must publish ${asset}`);
  assert.ok(swConfig.includes(`'./${asset}'`), `Service Worker app shell must include ${asset}`);
}

assert.match(swConfig, /numericalRuntimeCacheName: 'toukei-grade1-numerical-runtime-v1'/);
assert.match(swConfig, /https:\/\/cdn\.jsdelivr\.net\/pyodide\/v314\.0\.7\/full\//);
assert.match(serviceWorker, /isNumericalRuntimeRequest/);
assert.match(serviceWorker, /numericalRuntimeCacheName/);
assert.match(serviceWorker, /numericalRuntime \? 'cache-first'/);

const labCount = (chapter.match(/```python-lab/g) || []).length;
const paired = [...chapter.matchAll(
  /```python-lab\s*\n([\s\S]*?)\n```\s*\n\s*```python-test\s*\n([\s\S]*?)\n```/g,
)];

assert.ok(labCount >= 3, 'NUMLAB0 must contain at least three executable smoke labs');
assert.equal(paired.length, labCount, 'every python-lab block must be followed by a python-test block');

const ids = new Set();
for (const match of paired) {
  const source = match[1];
  const tests = match[2];
  const id = source.match(/^\s*#\s*lab-id:\s*([^\n]+)$/m)?.[1]?.trim();
  const timeoutText = source.match(/^\s*#\s*timeout-ms:\s*(\d+)$/m)?.[1];

  assert.ok(id, 'every python-lab block must declare # lab-id:');
  assert.ok(!ids.has(id), `duplicate lab-id: ${id}`);
  ids.add(id);

  assert.ok(timeoutText, `${id}: # timeout-ms is required`);
  const timeoutMs = Number(timeoutText);
  assert.ok(timeoutMs >= 250 && timeoutMs <= 60000, `${id}: timeout outside supported range`);
  assert.match(tests, /assert\s+/, `${id}: python-test must contain at least one assert`);
}

console.log(
  `Numerical lab runtime validated: Pyodide 314.0.7, ${labCount} executable NUMLAB0 labs, persistent runtime cache configured.`,
);
