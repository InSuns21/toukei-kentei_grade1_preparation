import fs from 'node:fs';
import path from 'node:path';
import process from 'node:process';
import YAML from 'yaml';

const id = process.argv[2];
if (!id) fail('使い方: npm run new:chapter -- F0-01');
const root = process.cwd();
const curriculum = YAML.parse(fs.readFileSync(path.join(root, 'curriculum.yaml'), 'utf8'));
const chapter = curriculum.chapters.find((item) => item.id === id);
if (!chapter) fail(`curriculum.yaml に章がありません: ${id}`);
const volume = curriculum.volumes.find((item) => item.id === chapter.volume);
const destination = path.join(root, volume.directory, `${id.replace('-', '_')}_${slugify(chapter.title)}`);
if (fs.existsSync(destination)) fail(`既に存在します: ${path.relative(root, destination)}`);
copy(path.join(root, 'templates/chapter'), destination, {
  chapter_id: chapter.id, chapter_title: chapter.title, volume: chapter.volume,
  prerequisites_yaml: chapter.prerequisites.length ? chapter.prerequisites.map((value) => `  - ${value}`).join('\n') : '  []',
  official_scope_yaml: chapter.official_scope.map((value) => `  - ${value}`).join('\n'),
});
console.log(`章の雛形を作成しました: ${path.relative(root, destination)}`);

function copy(source, target, vars) {
  fs.mkdirSync(target, { recursive: true });
  for (const entry of fs.readdirSync(source, { withFileTypes: true })) {
    const from = path.join(source, entry.name); const to = path.join(target, entry.name);
    if (entry.isDirectory()) copy(from, to, vars);
    else {
      let content = fs.readFileSync(from, 'utf8');
      for (const [key, value] of Object.entries(vars)) content = content.replaceAll(`{{${key}}}`, value);
      fs.writeFileSync(to, content, 'utf8');
    }
  }
}
function slugify(value) { return value.normalize('NFKC').replaceAll(/[^\p{Letter}\p{Number}]+/gu, '_').replaceAll(/^_+|_+$/g, '').toLowerCase(); }
function fail(message) { console.error(message); process.exit(1); }

