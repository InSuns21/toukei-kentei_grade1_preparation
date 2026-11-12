import assert from 'node:assert/strict';
import { execFileSync } from 'node:child_process';
import { readFile, realpath } from 'node:fs/promises';
import path from 'node:path';

const root = process.cwd();
const chapterIds = ['MFL5', 'MFL7', 'MFL8', 'MFL9', 'MFL10', 'MFL11', 'MFL12', 'MFL13', 'MFL14'];
const chapterBase = 'textbook/volumes/dream_thater/応用系/MFL';
const seenIds = new Set();
let presetsChecked = 0;

function parseArguments(source) {
  const args = [];
  let token = '';
  let started = false;
  let quote = null;
  let escape = false;
  for (const character of source) {
    if (escape) {
      token += character;
      escape = false;
    } else if (character === '\\' && quote !== "'") {
      escape = true;
      started = true;
    } else if (quote) {
      if (character === quote) quote = null;
      else token += character;
    } else if (character === '"' || character === "'") {
      quote = character;
      started = true;
    } else if (/\s/.test(character)) {
      if (started) args.push(token);
      token = '';
      started = false;
    } else {
      token += character;
      started = true;
    }
  }
  assert.ok(!quote && !escape, 'invalid argument quoting');
  if (started) args.push(token);
  assert.ok(args.length <= 40 && args.every((arg) => arg.length <= 500));
  return args;
}

async function validatedFile(relative) {
  assert.match(relative, /^textbook\/[^?#\\]+\.py$/);
  assert.ok(!relative.split('/').some((part) => !part || part === '.' || part === '..'));
  const resolved = await realpath(path.join(root, relative));
  assert.ok(resolved.startsWith(path.join(root, 'textbook') + path.sep));
  return resolved;
}

for (const chapter of chapterIds) {
  const chapterFile = `${chapterBase}/${chapter}/index.md`;
  const source = await readFile(path.join(root, chapterFile), 'utf8');
  const blocks = [...source.matchAll(/```python-file-lab\s*\n([\s\S]*?)\n```/g)];
  assert.equal(blocks.length, 1, `${chapter}: exactly one file lab is required`);
  const metadata = new Map();
  const dependencies = [];
  const presets = [];

  for (const raw of blocks[0][1].split('\n')) {
    const match = raw.match(/^#\s*([a-z-]+):\s*(.*?)\s*$/);
    assert.ok(match, `${chapter}: unexpected file lab line: ${raw}`);
    const [, key, value] = match;
    if (key === 'lab-dependency') dependencies.push(value);
    else if (key === 'lab-preset') {
      const separator = value.indexOf('|');
      assert.ok(separator > 0, `${chapter}: preset needs a label and arguments`);
      presets.push({ title: value.slice(0, separator).trim(), args: value.slice(separator + 1).trim() });
    } else {
      assert.ok(['lab-id', 'lab-title', 'lab-file', 'timeout-ms'].includes(key), `${chapter}: unexpected metadata ${key}`);
      assert.ok(!metadata.has(key), `${chapter}: duplicate metadata ${key}`);
      metadata.set(key, value);
    }
  }

  const id = metadata.get('lab-id');
  assert.ok(id && !seenIds.has(id), `${chapter}: missing or duplicate lab-id`);
  seenIds.add(id);
  assert.ok(metadata.get('lab-title'));
  assert.ok(presets.length >= 2, `${chapter}: at least two presets for comparison`);
  const timeout = Number(metadata.get('timeout-ms'));
  assert.ok(timeout >= 250 && timeout <= 60000);

  const mainFile = metadata.get('lab-file');
  assert.ok(mainFile?.startsWith(`${chapterBase}/${chapter}/`), `${chapter}: main file is outside chapter`);
  const mainPath = await validatedFile(mainFile);
  for (const dependency of dependencies) await validatedFile(dependency);
  if (chapter === 'MFL9') {
    assert.ok(dependencies.some((file) => file.endsWith('/MFL8/classical_mds_lab.py')));
  }

  if (chapter === 'MFL14') {
    const selfTest = execFileSync('python3', [mainPath, '--self-test'], {
      cwd: root, encoding: 'utf8', timeout: 30000,
      env: { ...process.env, PYTHONDONTWRITEBYTECODE: '1' },
    });
    assert.match(selfTest, /self-test passed/);
    assert.equal(presets.length, 5, 'MFL14: each finite-sample comparison needs a preset');
  }

  for (const preset of presets) {
    assert.ok(preset.title, `${chapter}: empty preset title`);
    const args = parseArguments(preset.args);
    const output = execFileSync('python3', [mainPath, ...args], {
      cwd: root,
      encoding: 'utf8',
      env: { ...process.env, PYTHONDONTWRITEBYTECODE: '1' },
      timeout: 30000,
      maxBuffer: 2 * 1024 * 1024,
    });
    assert.ok(output.trim(), `${chapter}: no output for ${preset.title}`);
    if (chapter === 'MFL14') {
      const result = JSON.parse(output);
      assert.ok(['variance', 'ratio', 'loo', 'bandwidth'].includes(result.mode));
      assert.ok(Array.isArray(result.plots) && result.plots.length > 0);
      for (const plot of result.plots) {
        assert.ok(plot.title && plot.x_label && plot.y_label);
        assert.ok(plot.series.every((series) => series.points.length >= 2 &&
          series.points.every((point) => point.length === 2 && point.every(Number.isFinite))));
      }
      if (result.mode === 'loo') assert.ok(result.max_identity_residual < 1e-9);
      if (result.mode === 'variance') {
        assert.ok(result.rows.every((row) => row.variance_theoretical > 0 &&
          row.variance_empirical > 0));
      }
    }
    presetsChecked += 1;
  }
}

// U3 financial examples use the same published Python files in the browser
// (python-file-lab) and in the local CLI. Do not duplicate the computation in JS.
const u3FileLabs = [
  ['U3-04', 'replication.py', /initial price \(yen\):/],
  ['U3-05', 'parity_check.py', /ALL EXACT CHECKS PASSED/],
  ['U3-06', 'american_binomial.py', /American=/],
  ['U3-07', 'bermudan_binomial.py', /All exact-arithmetic cross-checks passed/],
  ['U3-08', 'asian_tree_check.py', /All exact-arithmetic checks passed/],
];
for (const [chapter, file, expectedOutput] of u3FileLabs) {
  const chapterDir = `textbook/volumes/dream_thater/応用系/U/${chapter}`;
  const markdown = await readFile(path.join(root, chapterDir, 'index.md'), 'utf8');
  const blocks = [...markdown.matchAll(/```python-file-lab\s*\n([\s\S]*?)\n```/g)];
  assert.equal(blocks.length, 1, `${chapter}: one browser-executable file lab required`);
  const metadata = new Map();
  for (const line of blocks[0][1].split('\n')) {
    const match = line.match(/^#\s*([a-z-]+):\s*(.*?)\s*$/);
    assert.ok(match, `${chapter}: malformed lab metadata: ${line}`);
    if (match[1] === 'lab-preset') {
      const separator = match[2].indexOf('|');
      assert.ok(separator > 0 && match[2].slice(0, separator).trim(),
        `${chapter}: preset needs a label`);
      assert.deepEqual(parseArguments(match[2].slice(separator + 1).trim()), [],
        `${chapter}: standard-library baseline must run without CLI arguments`);
    } else {
      assert.ok(!metadata.has(match[1]), `${chapter}: duplicated ${match[1]}`);
      metadata.set(match[1], match[2]);
    }
  }
  const id = metadata.get('lab-id');
  assert.equal(id, `${chapter}-BROWSER-CHECK`);
  assert.ok(!seenIds.has(id), `duplicate lab id: ${id}`);
  seenIds.add(id);
  assert.ok(metadata.get('lab-title'));
  assert.ok(Number(metadata.get('timeout-ms')) >= 250 &&
    Number(metadata.get('timeout-ms')) <= 60000);
  assert.match(blocks[0][1], /^# lab-preset: /m);
  const script = `${chapterDir}/assets/${file}`;
  assert.equal(metadata.get('lab-file'), script);
  const scriptPath = await validatedFile(script);
  const output = execFileSync('python3',
    ['-c', 'import runpy, sys; runpy.run_path(sys.argv[1], run_name="__main__")', scriptPath],
    { cwd: root, encoding: 'utf8', timeout: 30000, maxBuffer: 2 * 1024 * 1024,
      env: { ...process.env, PYTHONDONTWRITEBYTECODE: '1' } });
  assert.match(output, expectedOutput, `${chapter}: Python source smoke output changed`);
}

const runtime = await readFile(path.join(root, 'pages/numerical-lab-runtime.js'), 'utf8');
const worker = await readFile(path.join(root, 'pages/numerical-lab-worker.mjs'), 'utf8');
assert.match(runtime, /python-file-lab/);
assert.match(runtime, /function runFileLab/);
assert.match(runtime, /function setFileVisuals/);
assert.match(runtime, /function appendSeriesPlot/);
assert.match(worker, /runpy\.run_path/);
assert.match(worker, /FILE_LAB_ROOT/);

console.log(`Python file labs: ${chapterIds.length} MFL + ${u3FileLabs.length} U3 chapters, ${presetsChecked} MFL presets passed`);
