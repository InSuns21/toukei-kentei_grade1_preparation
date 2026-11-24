import assert from 'node:assert/strict';
import { execFileSync } from 'node:child_process';
import { readFile, readdir } from 'node:fs/promises';
import path from 'node:path';
import YAML from 'yaml';
import {chapterPathsFromIndex} from './lib/dream-theater-chapter-paths.mjs';
import { loadDreamTheaterIndex } from './lib/dream-theater-public-catalog.mjs';

const root = process.cwd();
const indexedChapters = chapterPathsFromIndex(loadDreamTheaterIndex(root));

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

const pythonRunnerMatch = worker.match(
  /const PYTHON_RUNNER = String\.raw`([\s\S]*?)`;/,
);
assert.ok(pythonRunnerMatch, 'numerical lab worker must define PYTHON_RUNNER as String.raw');
const pythonRunner = pythonRunnerMatch[1];

execFileSync(
  'python3',
  [
    '-c',
    'import sys; compile(sys.argv[1], "<numerical-lab-runner>", "exec")',
    pythonRunner,
  ],
  { stdio: 'pipe' },
);

assert.match(
  pythonRunner,
  /_toukei_stderr\.write\("\\n\[figure capture failed\]\\n"\)/,
  'Python runner must preserve escaped newlines inside the figure-capture diagnostic',
);

assert.match(worker, /pyodide\/v314\.0\.7\/full\/pyodide\.mjs/);
assert.match(worker, /loadPackagesFromImports/);
assert.match(runtime, /new Worker\(workerUrl\.href, \{ type: "module" \}\)/);
assert.match(runtime, /localStorage/);
assert.match(runtime, /terminateWorker/);
assert.match(runtime, /testPassed/);
assert.match(runtime, /navigator\.serviceWorker\.ready/);
assert.match(runtime, /highlightPython/);
assert.match(runtime, /python-solution/);
assert.match(runtime, /numerical-lab-tab/);
assert.match(runtime, /function showPythonSourceDialog/);
assert.match(runtime, /function sourcePathFromHref/);
assert.match(runtime, /sourcePathFromHref\(link.getAttribute\("href"\)\)/);
assert.match(runtime, /showPythonSourceDialog\(path\)/);
assert.match(runtime, /function showFileSource\(\)/);
assert.match(runtime, /sourceCode\.innerHTML = highlightPython\(content\)/);
assert.match(runtime, /\["settings", "実験条件"\]/);
assert.match(runtime, /\["source", "Python ソース"\]/);
assert.match(runtime, /\["result", "実行結果"\]/);
assert.doesNotMatch(runtime, /sourceLink\.href = fileUrl\(lab\.file\)/,
  'Python source viewing must not navigate to a raw .py download');
assert.doesNotMatch(runtime, /function buildExperimentPanel/,
  'NUMLAB code exercises should not silently become parameter-only demos');

// Docsify's default pre > code surface must not override the dark Python
// source viewer, the source dialog, or the editable highlight layer.
const labCss = await read('pages/numerical-lab.css');
assert.match(labCss, /\.numerical-lab-solution \.numerical-lab-solution-code > code/);
assert.match(labCss, /\.numerical-python-source-dialog \.numerical-lab-solution-code > code/);
assert.match(labCss, /\.numerical-lab-code-editor \.numerical-lab-code-highlight > code/);
assert.match(labCss, /background: transparent !important;[\s\S]*?color: inherit !important;/);
assert.match(labCss, /overflow: visible !important;/);

assert.match(indexHtml, /numerical-lab\.css/);
assert.match(indexHtml, /numerical-lab-runtime\.js/);
assert.match(indexHtml, /ToukeiNumericalLab\.docsifyPlugin/);

// Static code highlighting must not mutate source or take over lab editors.
const staticPluginSource = indexHtml.match(/function staticCodeHighlightPlugin\(hook\) \{[\s\S]*?\n    \}(?=\n\n    window\.\$docsify)/)?.[0];
assert.ok(staticPluginSource, 'static code highlighting plugin must exist');
assert.match(indexHtml, /plugins: \[[^\n]*staticCodeHighlightPlugin\]/);
assert.match(indexHtml, /\.markdown-section pre\.toukei-code-block > code\s*\{/);
for (const language of ['python', 'typescript', 'bash', 'json', 'yaml', 'sql', 'powershell']) {
  const url = 'https://cdn.jsdelivr.net/npm/prismjs@1.30.0/components/prism-' + language + '.min.js';
  assert.ok(indexHtml.indexOf(url) > indexHtml.indexOf('/lib/docsify.min.js'), language + ' must load after Docsify');
  assert.ok(swConfig.includes(url), language + ' must be cached for offline use');
}
function staticCodeFixture(lang, source, insideLab = false) {
  const classes = new Set();
  const block = { dataset: { lang }, classList: { add: name => classes.add(name) } };
  const code = { parentElement: block, textContent: source, innerHTML: '',
    closest: () => insideLab ? {} : null };
  return { code, classes, source };
}
const codeFixtures = [
  staticCodeFixture('lean', 'theorem t : True := by trivial'),
  staticCodeFixture('lean4', '-- comment\n#check Nat'),
  staticCodeFixture('python', 'print("<&>")'),
  staticCodeFixture('ts', 'const x: number = 1;'),
  staticCodeFixture('sh', 'echo "$HOME"'),
  staticCodeFixture('text', '↓'),
  staticCodeFixture('python-lab', 'x = ___'),
  staticCodeFixture('python', 'x = 1', true),
  staticCodeFixture('unrecognized', 'source'),
];
const grammarCalls = [];
const prismStub = {
  languages: { python: {}, typescript: {}, bash: {} },
  highlight(source, grammar, language) {
    grammarCalls.push({ source, grammar, language });
    return 'highlighted';
  },
};
let onStaticRender;
const staticPlugin = new Function('window', 'document', staticPluginSource + '\nreturn staticCodeHighlightPlugin;')(
  { Prism: prismStub },
  { querySelectorAll: () => codeFixtures.map(fixture => fixture.code) },
);
staticPlugin({ doneEach: callback => { onStaticRender = callback; } });
onStaticRender();
onStaticRender(); // Docsify route updates must remain safe.
assert.deepEqual(grammarCalls.slice(0, 5).map(call => call.language), ['lean', 'lean', 'python', 'typescript', 'bash']);
assert.equal(grammarCalls.length, 10);
for (const fixture of codeFixtures) assert.equal(fixture.code.textContent, fixture.source);
for (const fixture of codeFixtures.slice(0, 5)) assert.ok(fixture.classes.has('toukei-code-block'));
for (const fixture of codeFixtures.slice(5, 8)) assert.equal(fixture.classes.size, 0);
assert.ok(codeFixtures[8].classes.has('toukei-code-block'));
assert.equal(codeFixtures[8].code.innerHTML, '');
assert.ok(prismStub.languages.lean.keyword.test('theorem'));
assert.ok(prismStub.languages.lean.builtin.test('Nat'));
assert.ok(prismStub.languages.lean.comment.pattern.test('/- comment -/'));
assert.equal(prismStub.languages.lean4, prismStub.languages.lean);


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

const chapterDirs = [...indexedChapters.keys()]
  .filter(name => name === 'PYNUM1' || /^NUMLAB\d+$/.test(name))
  .sort((a, b) => a.localeCompare(b, 'en', { numeric: true }));

assert.ok(chapterDirs.includes('PYNUM1'), 'PYNUM1 numerical lab page is missing');
assert.ok(chapterDirs.includes('NUMLAB0'), 'NUMLAB0 runtime chapter is missing');

const pageText = new Map();
const pageLabs = new Map();
const globalLabIds = new Map();

function compilePython(source, label) {
  execFileSync(
    'python3',
    [
      '-c',
      'import sys; compile(sys.stdin.read(), sys.argv[1], "exec")',
      `<${label}>`,
    ],
    {
      input: source,
      stdio: ['pipe', 'pipe', 'pipe'],
    },
  );
}

function parseLabs(chapter, markdown) {
  const labCount = (markdown.match(/```python-lab/g) || []).length;
  const solutionCount = (markdown.match(/```python-solution/g) || []).length;
  const paired = [...markdown.matchAll(
    /```python-lab\s*\n([\s\S]*?)\n```\s*\n(?:\s*```python-solution\s*\n([\s\S]*?)\n```\s*\n)?\s*```python-test\s*\n([\s\S]*?)\n```/g,
  )];

  assert.equal(
    paired.length,
    labCount,
    `${chapter}: every python-lab must be followed by optional python-solution and then python-test`,
  );

  const labs = [];
  let pairedSolutionCount = 0;

  for (const match of paired) {
    const source = match[1];
    const solution = match[2] || '';
    const tests = match[3];
    const id = source.match(/^\s*#\s*lab-id:\s*([^\n]+)$/m)?.[1]?.trim();
    const timeoutText = source.match(/^\s*#\s*timeout-ms:\s*(\d+)$/m)?.[1];
    const mode = source.match(/^\s*#\s*lab-mode:\s*([^\n]+)$/m)?.[1]?.trim().toLowerCase() || 'free';

    assert.ok(['free', 'exercise'].includes(mode), `${id || chapter}: unsupported # lab-mode: ${mode}`);
    assert.ok(id, `${chapter}: every python-lab block must declare # lab-id:`);
    assert.ok(!globalLabIds.has(id), `duplicate lab-id: ${id} in ${chapter} and ${globalLabIds.get(id)}`);
    globalLabIds.set(id, chapter);

    assert.ok(timeoutText, `${id}: # timeout-ms is required`);
    const timeoutMs = Number(timeoutText);
    assert.ok(timeoutMs >= 250 && timeoutMs <= 60000, `${id}: timeout outside supported range`);
    assert.match(tests, /assert\s+/, `${id}: python-test must contain at least one assert`);

    compilePython(source, `${id}:python-lab`);
    compilePython(tests, `${id}:python-test`);

    if (solution) {
      pairedSolutionCount += 1;
      compilePython(solution, `${id}:python-solution`);
    }

    if (mode === 'exercise') {
      assert.ok(solution, `${id}: lab-mode exercise requires an immediate python-solution block`);
      assert.match(source, /___/, `${id}: exercise starter must contain at least one ___ placeholder`);

      const sourceLines = source.split('\n');
      for (const [lineIndex, line] of sourceLines.entries()) {
        if (!line.includes('___')) continue;
        const previousLine = sourceLines[lineIndex - 1]?.trim() || '';
        assert.match(
          previousLine,
          /^#\s*ヒント:\s*\S+/,
          `${id}: every ___ placeholder must have an immediately preceding # ヒント: comment (source line ${lineIndex + 1})`,
        );
      }

      assert.doesNotMatch(solution, /___/, `${id}: python-solution must not contain ___ placeholders`);
    } else {
      assert.ok(!solution, `${id}: python-solution requires # lab-mode: exercise`);
    }

    labs.push({ id, timeoutMs, mode, hasSolution: Boolean(solution) });
  }

  assert.equal(
    pairedSolutionCount,
    solutionCount,
    `${chapter}: every python-solution must belong to an exercise lab`,
  );

  return labs;
}

for (const chapter of chapterDirs) {
  const markdown = await read(indexedChapters.get(chapter));
  pageText.set(chapter, markdown);
  const labs = parseLabs(chapter, markdown);
  pageLabs.set(chapter, labs);

  if (chapter === 'PYNUM1') {
    assert.ok(labs.length >= 4, 'PYNUM1 must provide at least four browser-executable quickstart labs');
  } else if (chapter === 'NUMLAB0') {
    assert.ok(labs.length >= 4, 'NUMLAB0 must provide at least four executable runtime smoke labs');
  } else {
    assert.ok(labs.length >= 1, `${chapter} must provide at least one executable numerical experiment`);
    assert.ok(
      labs.every((lab) => lab.mode === 'exercise' && lab.hasSolution),
      `${chapter}: every theory-linked NUMLAB1–NUMLAB5 experiment must use exercise mode with python-solution`,
    );
  }
}

// NUMLAB1's first experiment must retain the original Python programming
// exercise and model solution; a bare numerical demo is insufficient.
const na1 = pageText.get('NUMLAB1');
assert.match(na1, /# lab-id: NUMLAB1-NA1-CANCELLATION\n[\s\S]*?# lab-mode: exercise/);
assert.match(na1, /# ヒント: 桁落ちを避けるため/);
assert.match(na1, /stable = ___/);
assert.match(na1, /```python-solution/);

const linkRegistry = YAML.parse(linkRegistryText);
assert.equal(linkRegistry.schema_version, 1);
assert.equal(linkRegistry.runtime_chapter, 'NUMLAB0');
assert.ok(Array.isArray(linkRegistry.links));

const registeredExperimentIds = new Map();
const registeredPairs = new Set();

for (const [index, link] of linkRegistry.links.entries()) {
  const label = `numerical-lab-links.yaml links[${index}]`;
  for (const key of [
    'theory_chapter',
    'theory_anchor',
    'lab_chapter',
    'lab_anchor',
    'experiment_id',
  ]) {
    assert.equal(typeof link?.[key], 'string', `${label}: ${key} must be a string`);
    assert.ok(link[key].trim(), `${label}: ${key} must be non-empty`);
  }

  assert.match(link.lab_chapter, /^NUMLAB[1-5]$/, `${label}: lab_chapter must be NUMLAB1–NUMLAB5`);
  assert.ok(pageText.has(link.lab_chapter), `${label}: missing lab page ${link.lab_chapter}`);

  const theory = await read(indexedChapters.get(link.theory_chapter));
  const lab = pageText.get(link.lab_chapter);

  assert.ok(
    theory.includes(`<a id="${link.theory_anchor}"></a>`),
    `${label}: theory anchor not found: ${link.theory_chapter}#${link.theory_anchor}`,
  );
  assert.ok(
    lab.includes(`<a id="${link.lab_anchor}"></a>`),
    `${label}: lab anchor not found: ${link.lab_chapter}#${link.lab_anchor}`,
  );

  const labs = pageLabs.get(link.lab_chapter) || [];
  assert.ok(
    labs.some((item) => item.id === link.experiment_id),
    `${label}: experiment_id not found on ${link.lab_chapter}: ${link.experiment_id}`,
  );

  assert.ok(
    !registeredExperimentIds.has(link.experiment_id),
    `${label}: duplicate experiment_id ${link.experiment_id}`,
  );
  registeredExperimentIds.set(link.experiment_id, link.lab_chapter);

  const pair = `${link.theory_chapter}#${link.theory_anchor} -> ${link.lab_chapter}#${link.lab_anchor}`;
  assert.ok(!registeredPairs.has(pair), `${label}: duplicate theory/lab mapping ${pair}`);
  registeredPairs.add(pair);
}

for (const [chapter, labs] of pageLabs) {
  if (!/^NUMLAB[1-5]$/.test(chapter)) continue;
  for (const lab of labs) {
    assert.ok(
      registeredExperimentIds.has(lab.id),
      `${chapter}: executable experiment is missing from numerical-lab-links.yaml: ${lab.id}`,
    );
  }
}

const totalLabs = [...pageLabs.values()].reduce((sum, labs) => sum + labs.length, 0);
const exerciseLabs = [...pageLabs.entries()].filter(([chapter]) => /^NUMLAB[1-5]$/.test(chapter)).flatMap(([, labs]) => labs).filter((lab) => lab.mode === 'exercise').length;
console.log(
  `Numerical lab runtime validated: Pyodide 314.0.7, ${chapterDirs.length} executable page(s), ${totalLabs} lab(s), ${exerciseLabs} exercise lab(s), ${linkRegistry.links.length} theory/lab link(s).`,
);
