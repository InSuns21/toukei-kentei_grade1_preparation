import fs from 'node:fs';
import path from 'node:path';
import process from 'node:process';
import { spawnSync } from 'node:child_process';
import katex from 'katex';
import { forbiddenMathPatterns } from './math-delimiter-policy.mjs';

const root = process.cwd();
const errors = [];
const validationRootNames = ['textbook', 'references', 'agents'];
const delimiterRootNames = [...validationRootNames, 'statistical-mathematics', 'applied-rikou-80', 'anki'];
const rootDelimiterNames = ['AGENTS.md', 'CONTENT_GUIDELINES.md', 'EXERCISE_GUIDELINES.md'];
const options = parseOptions(process.argv.slice(2));
const forbidden = forbiddenMathPatterns;
if (options.selfTest) {
  runSelfTests();
  process.exit(0);
}
const selected = resolveSelectedFiles(options);
const validationRoots = validationRootNames
  .map((name) => path.join(root, name))
  .filter(fs.existsSync);
const files = selected === null
  ? validationRoots.flatMap(walk).filter((file) => file.endsWith('.md'))
  : selected.filter((file) => hasRoot(file, validationRootNames));

const delimiterValidationRoots = delimiterRootNames
  .map((name) => path.join(root, name))
  .filter(fs.existsSync);
const delimiterFiles = selected === null
  ? [
    ...delimiterValidationRoots.flatMap(walk).filter((file) => file.endsWith('.md')),
    ...rootDelimiterNames.map((name) => path.join(root, name)).filter(fs.existsSync),
  ]
  : selected.filter((file) => hasRoot(file, delimiterRootNames) ||
    rootDelimiterNames.includes(relative(file)));
const katexValidationCache = new Map();
let katexRenderCount = 0;
let katexCacheHits = 0;
for (const file of delimiterFiles) {
  const source = fs.readFileSync(file, 'utf8');
  const searchable = stripCode(source);
  for (const [lineIndex, line] of searchable.split(/\r?\n/).entries()) {
    if (line.trim() === '$') {
      errors.push(`${relative(file)}:${lineIndex + 1} 単独行 $ を検出しました。表示数式の $$ が機械置換で破損した可能性があります`);
    }
  }
}

for (const file of files) {
  const source = fs.readFileSync(file, 'utf8');
  const searchable = stripCode(source);
  for (const [pattern, label] of forbidden) {
    pattern.lastIndex = 0;
    const match = pattern.exec(searchable);
    if (match) errors.push(`${relative(file)}:${lineAt(searchable, match.index)} 禁止記法 ${label}`);
  }
  for (const item of extractMath(searchable, file)) {
    const errorMessage = validateKatex(item);
    if (errorMessage !== null) {
      errors.push(`${relative(file)}:${lineAt(searchable, item.index)} KaTeX: ${errorMessage}`);
    }
  }
}

if (errors.length) {
  console.error(`数式検証で ${errors.length} 件の問題が見つかりました:`);
  errors.forEach((error) => console.error(`- ${error}`));
  process.exit(1);
}
console.log(`${options.changedOnly ? '変更分' : selected ? '指定分' : '全件'}: ${files.length} 個の textbook/shared Markdown ファイルを KaTeX strict で検証し、${delimiterFiles.length} 個の教材 Markdown で単独行 $ を検査しました。`);
console.log(`KaTeX render cache: ${katexRenderCount} unique render(s), ${katexCacheHits} cache hit(s).`);

function parseOptions(args) {
  const result = { changedOnly: false, selfTest: false, base: null, files: [] };
  for (let i = 0; i < args.length; i += 1) {
    if (args[i] === '--changed-only') result.changedOnly = true;
    else if (args[i] === '--self-test') result.selfTest = true;
    else if (args[i] === '--base' || args[i] === '--file') {
      const option = args[i];
      const value = args[++i];
      if (!value || value.startsWith('--')) throw new Error('Missing value for ' + option);
      if (option === '--base') result.base = value;
      else result.files.push(value);
    } else throw new Error('Unknown argument: ' + args[i]);
  }
  if (result.changedOnly && result.files.length) {
    throw new Error('--changed-only and --file are mutually exclusive');
  }
  if (result.base && !result.changedOnly) throw new Error('--base requires --changed-only');
  return result;
}

function resolveSelectedFiles(opts) {
  if (!opts.changedOnly && !opts.files.length) return null;
  let names = opts.files;
  if (opts.changedOnly) {
    const base = opts.base || (process.env.TEXTBOOK_BASE_SHA || '').trim();
    if (!base) throw new Error('--changed-only requires --base <sha> or TEXTBOOK_BASE_SHA');
    const diff = spawnSync('git', ['diff', '--name-only', '-z', '--diff-filter=ACMR', base + '...HEAD', '--'], {
      encoding: 'utf8', stdio: ['ignore', 'pipe', 'pipe'],
    });
    if (diff.status !== 0) throw new Error(diff.stderr || 'git diff failed');
    names = diff.stdout.split('\0').filter(Boolean);
  }
  return [...new Set(names)].filter((name) => {
    if (opts.files.length && !name.endsWith('.md')) {
      throw new Error('--file expects a Markdown file: ' + name);
    }
    return name.endsWith('.md');
  }).map((name) => {
    const abs = path.resolve(root, name);
    if (!abs.startsWith(root + path.sep)) throw new Error('Path outside repository: ' + name);
    if (opts.files.length && !(
      hasRoot(abs, delimiterRootNames) || rootDelimiterNames.includes(relative(abs))
    )) throw new Error('Markdown file outside validation scope: ' + name);
    if (opts.files.length && (!fs.existsSync(abs) || !fs.statSync(abs).isFile())) {
      throw new Error('Markdown file not found: ' + name);
    }
    return abs;
  }).filter((file) => fs.existsSync(file) && fs.statSync(file).isFile());
}

function hasRoot(file, rootNames) {
  return rootNames.some((name) => relative(file).startsWith(name + '/'));
}

function runSelfTests() {
  const patterns = [
    [String.raw`\(`, true], [String.raw`\)`, true],
    [String.raw`\[`, true], [String.raw`\]`, true],
    [String.raw`\\(`, false], [String.raw`\\)`, false],
    [String.raw`\\[`, false], [String.raw`\\]`, false],
    [String.raw`\\\(`, true], [String.raw`\\\\(`, false],
  ];
  for (const [sample, expected] of patterns) {
    const actual = forbidden.slice(0, 4).some(([re]) => {
      re.lastIndex = 0;
      return re.test(sample);
    });
    if (actual !== expected) throw new Error('Delimiter parity test failed: ' + sample);
  }
  // The exact matrix-row form previously reported as a forbidden \( delimiter.
  katex.renderToString(String.raw`\begin{pmatrix}1\\(2+4)/2\end{pmatrix}`, {
    displayMode: true, throwOnError: true, strict: 'error', trust: false,
  });
  if (forbidden.some(([re]) => {
    re.lastIndex = 0;
    return re.test(String.raw`\begin{pmatrix}1\\(2+4)/2\end{pmatrix}`);
  })) throw new Error('Legal matrix row break was classified as forbidden');
  if (!hasRoot(path.join(root, 'textbook', 'chapter.md'), validationRootNames)) {
    throw new Error('Validation root selection failed');
  }
  if (hasRoot(path.join(root, 'anki', 'cards.md'), validationRootNames)) {
    throw new Error('Non-KaTeX root was incorrectly selected');
  }
  if (!hasRoot(path.join(root, 'anki', 'cards.md'), delimiterRootNames)) {
    throw new Error('Delimiter root selection failed');
  }
  console.log('Math validation delimiter parity and scope self-tests: OK');
}

function validateKatex(item) {
  let modeCache = katexValidationCache.get(item.display);
  if (!modeCache) {
    modeCache = new Map();
    katexValidationCache.set(item.display, modeCache);
  }
  if (modeCache.has(item.value)) {
    katexCacheHits += 1;
    return modeCache.get(item.value);
  }

  katexRenderCount += 1;
  let errorMessage = null;
  try {
    katex.renderToString(item.value, {
      displayMode: item.display, throwOnError: true, strict: 'error', trust: false,
    });
  } catch (error) {
    errorMessage = error.message;
  }
  modeCache.set(item.value, errorMessage);
  return errorMessage;
}

function extractMath(source, file) {
  const result = [];
  let index = 0;
  while (index < source.length) {
    if (source[index] !== '$' || isEscaped(source, index)) { index += 1; continue; }
    const display = source[index + 1] === '$';
    const delimiter = display ? '$$' : '$';
    const start = index;
    index += delimiter.length;
    const end = findClosing(source, delimiter, index);
    if (end === -1) {
      errors.push(`${relative(file)}:${lineAt(source, start)} 数式区切りが閉じていません`);
      break;
    }
    const value = source.slice(index, end);
    if (!display && value.includes('\n')) errors.push(`${relative(file)}:${lineAt(source, start)} インライン数式に改行があります`);
    result.push({ value, display, index: start });
    index = end + delimiter.length;
  }
  return result;
}

function stripCode(source) {
  return source.replace(/```[\s\S]*?```/g, (block) => '\n'.repeat((block.match(/\n/g) ?? []).length)).replace(/`[^`\n]*`/g, '');
}
function findClosing(source, delimiter, from) {
  for (let i = from; i < source.length; i += 1) if (source.startsWith(delimiter, i) && !isEscaped(source, i)) return i;
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
function lineAt(source, index) { return source.slice(0, index).split('\n').length; }
function relative(file) { return path.relative(root, file).replaceAll('\\', '/'); }
