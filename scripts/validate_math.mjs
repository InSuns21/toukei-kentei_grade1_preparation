import fs from 'node:fs';
import path from 'node:path';
import process from 'node:process';
import { performance } from 'node:perf_hooks';
import katex from 'katex';

const scriptStartedAt = performance.now();
const timings = {
  walkValidationMs: 0,
  walkDelimiterMs: 0,
  delimiterReadMs: 0,
  delimiterStripMs: 0,
  delimiterScanMs: 0,
  mathReadMs: 0,
  mathStripMs: 0,
  forbiddenScanMs: 0,
  extractMathMs: 0,
  katexRenderMs: 0,
};
let mathExpressionCount = 0;
const uniqueMathExpressions = new Set();

function measured(label, fn) {
  const startedAt = performance.now();
  try {
    return fn();
  } finally {
    timings[label] += performance.now() - startedAt;
  }
}

const root = process.cwd();
const errors = [];
const validationRoots = ['textbook', 'references', 'agents']
  .map((name) => path.join(root, name))
  .filter(fs.existsSync);
const files = measured('walkValidationMs', () => validationRoots.flatMap(walk).filter((file) => file.endsWith('.md')));

const delimiterValidationRoots = [
  'textbook',
  'statistical-mathematics',
  'applied-rikou-80',
  'anki',
  'references',
  'agents',
]
  .map((name) => path.join(root, name))
  .filter(fs.existsSync);
const delimiterFiles = [
  ...measured('walkDelimiterMs', () => delimiterValidationRoots.flatMap(walk).filter((file) => file.endsWith('.md'))),
  ...['AGENTS.md', 'CONTENT_GUIDELINES.md', 'EXERCISE_GUIDELINES.md']
    .map((name) => path.join(root, name))
    .filter(fs.existsSync),
];
const forbidden = [
  [/\\\(/g, String.raw`\(`], [/\\\)/g, String.raw`\)`],
  [/(?<!\\)\\\[/g, String.raw`\[`], [/(?<!\\)\\\]/g, String.raw`\]`],
  [/\\begin\{(?:equation|align\*?)\}/g, 'equation/align environment'],
  [/\\(?:label|ref|eqref|tag|newcommand|renewcommand|def)\b/g, 'unsupported command'],
];

for (const file of delimiterFiles) {
  const source = measured('delimiterReadMs', () => fs.readFileSync(file, 'utf8'));
  const searchable = measured('delimiterStripMs', () => stripCode(source));
  const scanStartedAt = performance.now();
  for (const [lineIndex, line] of searchable.split(/\r?\n/).entries()) {
    if (line.trim() === '$') {
      errors.push(`${relative(file)}:${lineIndex + 1} 単独行 $ を検出しました。表示数式の $$ が機械置換で破損した可能性があります`);
    }
  }
  timings.delimiterScanMs += performance.now() - scanStartedAt;
}

for (const file of files) {
  const source = measured('mathReadMs', () => fs.readFileSync(file, 'utf8'));
  const searchable = measured('mathStripMs', () => stripCode(source));
  const forbiddenStartedAt = performance.now();
  for (const [pattern, label] of forbidden) {
    pattern.lastIndex = 0;
    const match = pattern.exec(searchable);
    if (match) errors.push(`${relative(file)}:${lineAt(searchable, match.index)} 禁止記法 ${label}`);
  }
  timings.forbiddenScanMs += performance.now() - forbiddenStartedAt;
  const items = measured('extractMathMs', () => extractMath(searchable, file));
  mathExpressionCount += items.length;
  for (const item of items) {
    uniqueMathExpressions.add(`${item.display ? 'display' : 'inline'}\0${item.value}`);
    const katexStartedAt = performance.now();
    try {
      katex.renderToString(item.value, {
        displayMode: item.display, throwOnError: true, strict: 'error', trust: false,
      });
    } catch (error) {
      errors.push(`${relative(file)}:${lineAt(searchable, item.index)} KaTeX: ${error.message}`);
    } finally {
      timings.katexRenderMs += performance.now() - katexStartedAt;
    }
  }
}

if (errors.length) {
  console.error(`数式検証で ${errors.length} 件の問題が見つかりました:`);
  errors.forEach((error) => console.error(`- ${error}`));
  process.exit(1);
}
console.log(`${files.length} 個の textbook/shared Markdown ファイルを KaTeX strict で検証し、${delimiterFiles.length} 個の教材 Markdown で単独行 $ を検査しました。`);
const totalMs = performance.now() - scriptStartedAt;
console.log('validate:math perf ' + JSON.stringify({
  totalMs: Number(totalMs.toFixed(1)),
  mathExpressionCount,
  uniqueMathExpressionCount: uniqueMathExpressions.size,
  ...Object.fromEntries(Object.entries(timings).map(([key, value]) => [key, Number(value.toFixed(1))])),
}));

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
