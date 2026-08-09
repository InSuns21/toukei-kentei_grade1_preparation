import fs from 'node:fs';
import path from 'node:path';
import process from 'node:process';

const root = process.cwd();
const errors = [];
const targets = ['volumes', 'templates', 'prompts', 'agents', 'references']
  .map((name) => path.join(root, name)).filter(fs.existsSync).flatMap(walk)
  .filter((file) => /\.(md|ya?ml)$/.test(file));

for (const file of targets) {
  const source = fs.readFileSync(file, 'utf8');
  if (source.includes('\uFFFD')) errors.push(`${relative(file)}: 置換文字 U+FFFD があります`);
  const control = [...source].findIndex((character) => character.charCodeAt(0) < 32 && !['\n', '\r'].includes(character));
  if (control >= 0) errors.push(`${relative(file)}: 制御文字があります`);
  if (/\b(?:TODO|TBD)(?!\(reference\))/i.test(source) && file.includes(`${path.sep}volumes${path.sep}`) && isReviewedChapter(file)) {
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
  const marker = `${path.sep}volumes${path.sep}`;
  const suffix = file.slice(file.indexOf(marker) + marker.length);
  const parts = suffix.split(path.sep);
  const chapterDirectory = path.join(root, 'volumes', parts[0], parts[1]);
  const manifest = path.join(chapterDirectory, 'chapter.yaml');
  if (!fs.existsSync(manifest)) return false;
  return /^status:\s*reviewed\s*$/m.test(fs.readFileSync(manifest, 'utf8'));
}
