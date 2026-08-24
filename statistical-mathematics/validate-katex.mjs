import fs from 'node:fs';
import path from 'node:path';
import process from 'node:process';
import { fileURLToPath } from 'node:url';
import katex from 'katex';

const here = path.dirname(fileURLToPath(import.meta.url));
const errors = [];
const files = walk(here).filter((file) => file.endsWith('.md'));
const forbidden = [
  [/\\\(/g, String.raw`\(`],
  [/\\\)/g, String.raw`\)`],
  [/\\\[/g, String.raw`\[`],
  [/\\\]/g, String.raw`\]`],
  [/\\begin\{(?:equation|align\*?)\}/g, 'equation/align environment'],
  [/\\(?:label|ref|eqref|tag|newcommand|renewcommand|def)\b/g, 'unsupported command'],
];

for (const file of files) {
  const source = fs.readFileSync(file, 'utf8');
  const searchable = stripCode(source);

  for (const [pattern, label] of forbidden) {
    pattern.lastIndex = 0;
    const match = pattern.exec(searchable);
    if (match) errors.push(`${relative(file)}:${lineAt(searchable, match.index)} 禁止記法 ${label}`);
  }

  for (const item of extractMath(searchable, file)) {
    try {
      katex.renderToString(item.value, {
        displayMode: item.display,
        throwOnError: true,
        strict: 'error',
        trust: false,
      });
    } catch (error) {
      errors.push(`${relative(file)}:${lineAt(searchable, item.index)} KaTeX: ${error.message}`);
    }
  }
}

if (errors.length > 0) {
  console.error(`statistical-mathematics の数式検証で ${errors.length} 件の問題が見つかりました:`);
  errors.forEach((error) => console.error(`- ${error}`));
  process.exit(1);
}

console.log(`${files.length} 個の statistical-mathematics Markdown ファイルを KaTeX strict で検証しました。`);

function extractMath(source, file) {
  const result = [];
  let index = 0;
  while (index < source.length) {
    if (source[index] !== '$' || isEscaped(source, index)) {
      index += 1;
      continue;
    }
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
  return fs.readdirSync(directory, { withFileTypes: true }).flatMap((entry) => {
    const full = path.join(directory, entry.name);
    return entry.isDirectory() ? walk(full) : [full];
  });
}

function lineAt(source, index) {
  return source.slice(0, index).split('\n').length;
}

function relative(file) {
  return path.relative(process.cwd(), file).replaceAll('\\', '/');
}
