import fs from 'node:fs';
import path from 'node:path';
import process from 'node:process';
import { fileURLToPath } from 'node:url';

const here = path.dirname(fileURLToPath(import.meta.url));
const ankiRoot = path.resolve(here, '..');
const targets = [
  ...walk(path.join(ankiRoot, 'cards')).filter((file) => file.endsWith('.md')),
  path.join(ankiRoot, 'notation.md'),
  path.join(ankiRoot, 'formulae.md'),
].filter(fs.existsSync);

// statistical-mathematics / applied-rikou-80 と同じ表記規約を Anki にも適用する。
// 指示関数は条件を右下添字に置く。
// NG: 1\{A\}, \boldsymbol{1}\{A\}, \mathbf{1}\{A\}, \mathbb{1}\{A\}
// OK: \boldsymbol{1}_{\{A\}}
const invalidIndicator = /(?<![_\w])(?:1|\\(?:boldsymbol|mathbf|mathbb)\s*(?:\{1\}|1))\s*\\\{/g;
const errors = [];

for (const file of targets) {
  const source = stripCode(fs.readFileSync(file, 'utf8'));
  invalidIndicator.lastIndex = 0;
  for (const match of source.matchAll(invalidIndicator)) {
    errors.push(`${relative(file)}:${lineAt(source, match.index)} 指示関数の条件は右下添字で書く（例：\\boldsymbol{1}_{\\{A\\}}）`);
  }
}

if (errors.length) {
  console.error(`Anki の指示関数表記で ${errors.length} 件の問題が見つかりました:`);
  errors.forEach((error) => console.error(`- ${error}`));
  process.exit(1);
}

console.log(`${targets.length} 個の Anki Markdown ファイルで指示関数表記を検証しました。`);

function stripCode(source) {
  return source
    .replace(/```[\s\S]*?```/g, (block) => '\n'.repeat((block.match(/\n/g) ?? []).length))
    .replace(/`[^`\n]*`/g, '');
}

function walk(directory) {
  if (!fs.existsSync(directory)) return [];
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
