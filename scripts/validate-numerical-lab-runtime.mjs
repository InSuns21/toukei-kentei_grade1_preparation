import assert from 'node:assert/strict';
import { execFileSync } from 'node:child_process';
import { readFile, readdir } from 'node:fs/promises';
import path from 'node:path';
import YAML from 'yaml';

const root = process.cwd();
const foundationsDir = path.join(root, 'textbook', 'volumes', '00_foundations');

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
  linkRegistryText,
] = await Promise.all([
  read('pages/numerical-lab-runtime.js'),
  read('pages/numerical-lab-worker.mjs'),
  read('pages/index.html'),
  read('pages/sw-config.js'),
  read('pages/service-worker.js'),
  read('scripts/build-pages.mjs'),
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
assert.match(runtime, /navigator\.serviceWorker\.ready/);

assert.match(indexHtml, /numerical-lab\.css/);
assert.match(indexHtml, /numerical-lab-runtime\.js/);
assert.match(indexHtml, /ToukeiNumericalLab\.docsifyPlugin/);

for (const asset of [
  'numerical-lab-runtime.js',
  'numerical-lab-worker.mjs',
  'numerical-lab.css',
]) {
  assert.ok(buildPages.includes(`'\${asset}'`), `build-pages must publish \${asset}`);
  assert.ok(swConfig.includes(`'./\${asset}'`), `Service Worker app shell must include \${asset}`);
}

assert.match(swConfig, /numericalRuntimeCacheName: 'toukei-grade1-numerical-runtime-v1'/);
assert.match(swConfig, /https:\/\/cdn\.jsdelivr\.net\/pyodide\/v314\.0\.7\/full\//);
assert.match(serviceWorker, /isNumericalRuntimeRequest/);
assert.match(serviceWorker, /numericalRuntimeCacheName/);
assert.match(serviceWorker, /numericalRuntime \? 'cache-first'/);

const chapterDirs = (await readdir(foundationsDir, { withFileTypes: true }))
  .filter((entry) => entry.isDirectory())
  .map((entry) => entry.name)
  .filter((name) => name === 'PYNUM1' || /^NUMLAB\d+$/.test(name))
  .sort((a, b) => a.localeCompare(b, 'en', { numeric: true }));

assert.ok(chapterDirs.includes('PYNUM1'), 'PYNUM1 numerical lab page is missing');
assert.ok(chapterDirs.includes('NUMLAB0'), 'NUMLAB0 runtime chapter is missing');

const pageText = new Map();
const pageLabs = new Map();
const globalLabIds = new Map();

function parseLabs(chapter, markdown) {
  const labCount = (markdown.match(/```python-lab/g) || []).length;
  const paired = [...markdown.matchAll(
    /```python-lab\s*\n([\s\S]*?)\n```\s*\n\s*```python-test\s*\n([\s\S]*?)\n```/g,
  )];

  assert.equal(
    paired.length,
    labCount,
    `\${chapter}: every python-lab block must be followed immediately by a python-test block`,
  );

  const labs = [];
  for (const match of paired) {
    const source = match[1];
    const tests = match[2];
    const id = source.match(/^\s*#\s*lab-id:\s*([^\n]+)$/m)?.[1]?.trim();
    const timeoutText = source.match(/^\s*#\s*timeout-ms:\s*(\d+)$/m)?.[1];

    assert.ok(id, `\${chapter}: every python-lab block must declare # lab-id:`);
    assert.ok(!globalLabIds.has(id), `duplicate lab-id: \${id} in \${chapter} and \${globalLabIds.get(id)}`);
    globalLabIds.set(id, chapter);

    assert.ok(timeoutText, `\${id}: # timeout-ms is required`);
    const timeoutMs = Number(timeoutText);
    assert.ok(timeoutMs >= 250 && timeoutMs <= 60000, `\${id}: timeout outside supported range`);
    assert.match(tests, /assert\s+/, `\${id}: python-test must contain at least one assert`);

    labs.push({ id, timeoutMs });
  }
  return labs;
}

for (const chapter of chapterDirs) {
  const markdown = await read(`textbook/volumes/00_foundations/\${chapter}/index.md`);
  pageText.set(chapter, markdown);
  const labs = parseLabs(chapter, markdown);
  pageLabs.set(chapter, labs);

  if (chapter === 'PYNUM1') {
    assert.ok(labs.length >= 4, 'PYNUM1 must provide at least four browser-executable quickstart labs');
  } else if (chapter === 'NUMLAB0') {
    assert.ok(labs.length >= 4, 'NUMLAB0 must provide at least four executable runtime smoke labs');
  } else {
    assert.ok(labs.length >= 1, `\${chapter} must provide at least one executable numerical experiment`);
  }
}

const linkRegistry = YAML.parse(linkRegistryText);
assert.equal(linkRegistry.schema_version, 1);
assert.equal(linkRegistry.runtime_chapter, 'NUMLAB0');
assert.ok(Array.isArray(linkRegistry.links));

const registeredExperimentIds = new Map();
const registeredPairs = new Set();

for (const [index, link] of linkRegistry.links.entries()) {
  const label = `numerical-lab-links.yaml links[\${index}]`;
  for (const key of [
    'theory_chapter',
    'theory_anchor',
    'lab_chapter',
    'lab_anchor',
    'experiment_id',
  ]) {
    assert.equal(typeof link?.[key], 'string', `\${label}: \${key} must be a string`);
    assert.ok(link[key].trim(), `\${label}: \${key} must be non-empty`);
  }

  assert.match(link.lab_chapter, /^NUMLAB[1-5]$/, `\${label}: lab_chapter must be NUMLAB1–NUMLAB5`);
  assert.ok(pageText.has(link.lab_chapter), `\${label}: missing lab page \${link.lab_chapter}`);

  const theory = await read(`textbook/volumes/00_foundations/\${link.theory_chapter}/index.md`);
  const lab = pageText.get(link.lab_chapter);

  assert.ok(
    theory.includes(`<a id="\${link.theory_anchor}"></a>`),
    `\${label}: theory anchor not found: \${link.theory_chapter}#\${link.theory_anchor}`,
  );
  assert.ok(
    lab.includes(`<a id="\${link.lab_anchor}"></a>`),
    `\${label}: lab anchor not found: \${link.lab_chapter}#\${link.lab_anchor}`,
  );

  const labs = pageLabs.get(link.lab_chapter) || [];
  assert.ok(
    labs.some((item) => item.id === link.experiment_id),
    `\${label}: experiment_id not found on \${link.lab_chapter}: \${link.experiment_id}`,
  );

  assert.ok(
    !registeredExperimentIds.has(link.experiment_id),
    `\${label}: duplicate experiment_id \${link.experiment_id}`,
  );
  registeredExperimentIds.set(link.experiment_id, link.lab_chapter);

  const pair = `\${link.theory_chapter}#\${link.theory_anchor} -> \${link.lab_chapter}#\${link.lab_anchor}`;
  assert.ok(!registeredPairs.has(pair), `\${label}: duplicate theory/lab mapping \${pair}`);
  registeredPairs.add(pair);
}

for (const [chapter, labs] of pageLabs) {
  if (!/^NUMLAB[1-5]$/.test(chapter)) continue;
  for (const lab of labs) {
    assert.ok(
      registeredExperimentIds.has(lab.id),
      `\${chapter}: executable experiment is missing from numerical-lab-links.yaml: \${lab.id}`,
    );
  }
}

const totalLabs = [...pageLabs.values()].reduce((sum, labs) => sum + labs.length, 0);
console.log(
  `Numerical lab runtime validated: Pyodide 314.0.7, \${chapterDirs.length} executable page(s), \${totalLabs} lab(s), \${linkRegistry.links.length} theory/lab link(s).`,
);
