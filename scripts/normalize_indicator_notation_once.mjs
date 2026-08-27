import fs from 'node:fs';
import path from 'node:path';
import process from 'node:process';

const root = process.cwd();
const roots = [
  'statistical-mathematics',
  'applied-rikou-80',
  'anki/cards',
].map((name) => path.join(root, name)).filter(fs.existsSync);

const files = roots.flatMap(walk).filter((file) => file.endsWith('.md'));
for (const extra of ['anki/notation.md', 'anki/formulae.md']) {
  const file = path.join(root, extra);
  if (fs.existsSync(file)) files.push(file);
}

let changedFiles = 0;
let replacements = 0;

for (const file of files) {
  const source = fs.readFileSync(file, 'utf8');
  const { text, count } = normalize(source);
  if (!count) continue;
  fs.writeFileSync(file, text, 'utf8');
  changedFiles += 1;
  replacements += count;
  console.log(`${relative(file)}: ${count} 件を正規化`);
}

console.log(`指示関数表記を ${changedFiles} ファイル・${replacements} 件正規化しました。`);

function normalize(source) {
  const badPrefix = /(?<![_\w])(?:1|\\(?:boldsymbol|mathbf|mathbb)\s*(?:\{1\}|1))\s*(?=\\\{)/g;
  let out = '';
  let cursor = 0;
  let count = 0;

  while (cursor < source.length) {
    badPrefix.lastIndex = cursor;
    const match = badPrefix.exec(source);
    if (!match) {
      out += source.slice(cursor);
      break;
    }

    const setStart = badPrefix.lastIndex;
    const setEnd = source.indexOf('\\}', setStart + 2);
    if (setEnd < 0) {
      out += source.slice(cursor);
      break;
    }

    out += source.slice(cursor, match.index);
    const setLiteral = source.slice(setStart, setEnd + 2);
    out += `\\boldsymbol{1}_{${setLiteral}}`;
    cursor = setEnd + 2;
    count += 1;
  }

  return { text: out, count };
}

function walk(directory) {
  return fs.readdirSync(directory, { withFileTypes: true }).flatMap((entry) => {
    if (entry.name === '.git' || entry.name === 'node_modules') return [];
    const full = path.join(directory, entry.name);
    return entry.isDirectory() ? walk(full) : [full];
  });
}

function relative(file) {
  return path.relative(root, file).replaceAll('\\', '/');
}
