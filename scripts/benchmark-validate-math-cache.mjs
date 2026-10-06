import fs from 'node:fs';
import path from 'node:path';
import process from 'node:process';
import { performance } from 'node:perf_hooks';
import katex from 'katex';

const mode = process.argv[2];
if (!['baseline', 'cache'].includes(mode)) {
  console.error('usage: node scripts/benchmark-validate-math-cache.mjs baseline|cache');
  process.exit(2);
}

const root = process.cwd();
const validationRoots = ['textbook', 'references', 'agents']
  .map((name) => path.join(root, name))
  .filter(fs.existsSync);
const files = validationRoots.flatMap(walk).filter((file) => file.endsWith('.md'));
const items = [];

for (const file of files) {
  const source = fs.readFileSync(file, 'utf8');
  const searchable = stripCode(source);
  items.push(...extractMath(searchable));
}

let renderCount = 0;
let cacheHits = 0;
let errorCount = 0;
const startedAt = performance.now();

if (mode === 'baseline') {
  for (const item of items) {
    renderCount += 1;
    try {
      render(item);
    } catch {
      errorCount += 1;
    }
  }
} else {
  const cache = new Map();
  for (const item of items) {
    let modeCache = cache.get(item.display);
    if (!modeCache) {
      modeCache = new Map();
      cache.set(item.display, modeCache);
    }
    if (modeCache.has(item.value)) {
      cacheHits += 1;
      if (modeCache.get(item.value) !== null) errorCount += 1;
      continue;
    }

    renderCount += 1;
    let errorMessage = null;
    try {
      render(item);
    } catch (error) {
      errorMessage = error.message;
      errorCount += 1;
    }
    modeCache.set(item.value, errorMessage);
  }
}

const renderMs = performance.now() - startedAt;
console.log('validate:math cache benchmark ' + JSON.stringify({
  mode,
  files: files.length,
  occurrences: items.length,
  renderCount,
  cacheHits,
  errorCount,
  renderMs: Number(renderMs.toFixed(1)),
}));

function render(item) {
  katex.renderToString(item.value, {
    displayMode: item.display,
    throwOnError: true,
    strict: 'error',
    trust: false,
  });
}

function extractMath(source) {
  const result = [];
  let index = 0;
  while (index < source.length) {
    if (source[index] !== '$' || isEscaped(source, index)) { index += 1; continue; }
    const display = source[index + 1] === '$';
    const delimiter = display ? '$$' : '$';
    index += delimiter.length;
    const end = findClosing(source, delimiter, index);
    if (end === -1) break;
    result.push({ value: source.slice(index, end), display });
    index = end + delimiter.length;
  }
  return result;
}

function stripCode(source) {
  return source
    .replace(/```[\s\S]*?```/g, (block) => '\n'.repeat((block.match(/\n/g) ?? []).length))
    .replace(/`[^`\n]*`/g, '');
}

function findClosing(source, delimiter, from) {
  for (let i = from; i < source.length; i += 1) {
    if (source.startsWith(delimiter, i) && !isEscaped(source, i)) return i;
  }
  return -1;
}

function isEscaped(source, index) {
  let count = 0;
  for (let i = index - 1; i >= 0 && source[i] === '\\'; i -= 1) count += 1;
  return count % 2 === 1;
}

function walk(directory) {
  const ignored = new Set(['.git', 'node_modules', 'build', 'pdfs']);
  return fs.readdirSync(directory, { withFileTypes: true }).flatMap((entry) => {
    if (ignored.has(entry.name)) return [];
    const full = path.join(directory, entry.name);
    return entry.isDirectory() ? walk(full) : [full];
  });
}
