import fs from 'node:fs';
import path from 'node:path';
import process from 'node:process';

const root = process.cwd();
const textbookRoot = path.join(root, 'textbook');
const errors = [];
const targets = [
  path.join(textbookRoot, 'volumes'),
  path.join(textbookRoot, 'templates'),
  path.join(textbookRoot, 'prompts'),
  path.join(root, 'agents'),
  path.join(root, 'references'),
]
  .filter(fs.existsSync).flatMap(walk)
  .filter((file) => /\.(md|ya?ml)$/.test(file));

for (const file of targets) {
  const source = fs.readFileSync(file, 'utf8');
  if (source.includes('\uFFFD')) errors.push(`${relative(file)}: 置換文字 U+FFFD があります`);
  const control = [...source].findIndex((character) => character.charCodeAt(0) < 32 && !['\n', '\r'].includes(character));
  if (control >= 0) errors.push(`${relative(file)}: 制御文字があります`);
  for (const match of source.matchAll(/(\${1,2})([\s\S]*?)\1/g)) {
    const bareCommand = /(?<![\\A-Za-z])(?:qquad|quad|ldots)(?![A-Za-z])|(?<!\\q)(?<!\\)(?:qquad|quad|ldots)(?=\s*[([{])/.exec(match[2]);
    if (!bareCommand) continue;
    const offset = (match.index ?? 0) + match[1].length + bareCommand.index;
    const line = source.slice(0, offset).split('\n').length;
    errors.push(`${relative(file)}:${line}: 数式内の ${bareCommand[0]} にバックスラッシュがありません`);
  }
  if (/\b(?:TODO|TBD)(?!\(reference\))/i.test(source) && file.includes(`${path.sep}textbook${path.sep}volumes${path.sep}`) && isReviewedChapter(file)) {
    errors.push(`${relative(file)}: 査読完了成果物に TODO/TBD が残っています`);
  }
}

if (errors.length) {
  console.error(`テキスト検証で ${errors.length} 件の問題が見つかりました:`);
  errors.forEach((error) => console.error(`- ${error}`));
  process.exit(1);
}
console.log(`${targets.length} 個の生成対象テキストを検証しました。`);

function walk(directory) {
  return fs.readdirSync(directory, { withFileTypes: true }).flatMap((entry) => {
    const full = path.join(directory, entry.name);
    return entry.isDirectory() ? walk(full) : [full];
  });
}
function relative(file) { return path.relative(root, file).replaceAll('\\', '/'); }
function isReviewedChapter(file) {
  const marker = `${path.sep}textbook${path.sep}volumes${path.sep}`;
  const suffix = file.slice(file.indexOf(marker) + marker.length);
  const parts = suffix.split(path.sep);
  const chapterDirectory = path.join(textbookRoot, 'volumes', parts[0], parts[1]);
  const manifest = path.join(chapterDirectory, 'chapter.yaml');
  if (!fs.existsSync(manifest)) return false;
  return /^status:\s*reviewed\s*$/m.test(fs.readFileSync(manifest, 'utf8'));
}
