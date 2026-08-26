import fs from 'node:fs';
import path from 'node:path';
import process from 'node:process';
import YAML from 'yaml';

const id = process.argv[2];
if (!id) fail('使い方: npm run new:chapter -- F0-01');

const root = process.cwd();
const textbookRoot = path.join(root, 'textbook');
const curriculum = YAML.parse(fs.readFileSync(path.join(textbookRoot, 'curriculum.yaml'), 'utf8'));
const chapter = curriculum.chapters.find((item) => item.id === id);
if (!chapter) fail(`textbook/curriculum.yaml に章がありません: ${id}`);

const volume = curriculum.volumes.find((item) => item.id === chapter.volume);
const destination = path.join(textbookRoot, volume.directory, `${id.replace('-', '_')}_${slugify(chapter.title)}`);
if (fs.existsSync(destination)) fail(`既に存在します: ${path.relative(root, destination)}`);

const vars = {
  chapter_id: chapter.id,
  chapter_title: chapter.title,
  volume: chapter.volume,
  prerequisites_yaml: chapter.prerequisites.length
    ? chapter.prerequisites.map((value) => `  - ${value}`).join('\n')
    : '  []',
  official_scope_yaml: chapter.official_scope.map((value) => `  - ${value}`).join('\n'),
};

fs.mkdirSync(destination, { recursive: true });
const templateDir = path.join(textbookRoot, 'templates', 'chapter');
for (const name of ['index.md', 'chapter.yaml', 'glossary.yaml']) {
  const source = path.join(templateDir, name);
  if (!fs.existsSync(source)) fail(`章テンプレートがありません: ${path.relative(root, source)}`);
  let content = fs.readFileSync(source, 'utf8');
  for (const [key, value] of Object.entries(vars)) content = content.replaceAll(`{{${key}}}`, value);
  fs.writeFileSync(path.join(destination, name), content, 'utf8');
}

console.log(`1ページ形式の章雛形を作成しました: ${path.relative(root, destination)}`);

function slugify(value) {
  return value.normalize('NFKC')
    .replaceAll(/[^\p{Letter}\p{Number}]+/gu, '_')
    .replaceAll(/^_+|_+$/g, '')
    .toLowerCase();
}

function fail(message) {
  console.error(message);
  process.exit(1);
}
