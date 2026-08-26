import fs from 'node:fs';
import path from 'node:path';
import process from 'node:process';
import YAML from 'yaml';

const root = process.cwd();
const textbookRoot = path.join(root, 'textbook');
const errors = [];
const notes = [];

const requiredRoot = [
  'AGENTS.md',
  'README.md',
  'CONTENT_GUIDELINES.md',
  'textbook/curriculum.yaml',
  'textbook/notation.md',
  'textbook/style-guide.md',
  'textbook/dependency-graph.md',
  'references/distribution-notation-guide.md',
  'references/terminology-guide.md',
];

const legacyChapterFiles = [
  '00_overview.md',
  '01_motivation.md',
  '02_definitions.md',
  '03_theorems.md',
  '04_examples.md',
  '05_problem_solving.md',
  '06_exercises.md',
  '07_solutions.md',
  '08_exam_drill.md',
  '09_past_exam_practice.md',
];

for (const file of requiredRoot) {
  if (!fs.existsSync(path.join(root, file))) errors.push(`必須ファイルがありません: ${file}`);
}

let data;
try {
  data = YAML.parse(fs.readFileSync(path.join(textbookRoot, 'curriculum.yaml'), 'utf8'));
} catch (error) {
  errors.push(`textbook/curriculum.yaml を解析できません: ${error.message}`);
}

if (data) validateCurriculum(data);

if (errors.length) {
  console.error(`教材構造検証で ${errors.length} 件の問題が見つかりました:`);
  errors.forEach((error) => console.error(`- ${error}`));
  process.exit(1);
}

console.log('通常教材の機械的な構造を検証しました。人手査読記録はこのvalidationの必須条件ではありません。');
notes.forEach((note) => console.log(`- note: ${note}`));

function validateCurriculum(data) {
  if (data.math_renderer !== 'katex') errors.push('math_renderer は katex でなければなりません');

  const chapters = data.chapters ?? [];
  const ids = new Set();
  for (const chapter of chapters) {
    if (!chapter.id || ids.has(chapter.id)) errors.push(`章IDがないか重複しています: ${chapter.id}`);
    if (chapter.id) ids.add(chapter.id);
    if (!Array.isArray(chapter.official_scope) || chapter.official_scope.length === 0) {
      errors.push(`${chapter.id ?? '(unknown)'}: official_scope がありません`);
    }
  }

  for (const chapter of chapters) {
    for (const prerequisite of chapter.prerequisites ?? []) {
      if (!ids.has(prerequisite)) errors.push(`${chapter.id}: 存在しない前提章 ${prerequisite}`);
    }
  }
  detectCycles(chapters);

  const validStatuses = new Set(['planned', 'drafting', 'self_review', 'independent_review', 'revision', 'reviewed', 'blocked']);
  for (const [id, state] of Object.entries(data.progress?.chapters ?? {})) {
    if (!ids.has(id)) errors.push(`progress に curriculum 未登録の章IDがあります: ${id}`);
    if (!validStatuses.has(state?.status)) errors.push(`${id}: 進捗状態が不正です: ${state?.status}`);
  }

  if (data.progress?.current_chapter && !ids.has(data.progress.current_chapter)) {
    errors.push(`current_chapter が curriculum にありません: ${data.progress.current_chapter}`);
  }
  if (data.progress?.next_chapter && !ids.has(data.progress.next_chapter)) {
    errors.push(`next_chapter が curriculum にありません: ${data.progress.next_chapter}`);
  }

  for (const volume of data.volumes ?? []) {
    const directory = path.join(textbookRoot, volume.directory);
    if (!fs.existsSync(directory)) continue;

    for (const entry of fs.readdirSync(directory, { withFileTypes: true }).filter((item) => item.isDirectory())) {
      const chapterDir = path.join(directory, entry.name);
      const manifestPath = path.join(chapterDir, 'chapter.yaml');
      if (!fs.existsSync(manifestPath)) continue;

      let manifest;
      try {
        manifest = YAML.parse(fs.readFileSync(manifestPath, 'utf8'));
      } catch (error) {
        errors.push(`${relative(manifestPath)} を解析できません: ${error.message}`);
        continue;
      }

      if (!ids.has(manifest.id)) errors.push(`${relative(chapterDir)}: curriculum にない章ID ${manifest.id}`);
      if (!fs.existsSync(path.join(chapterDir, 'glossary.yaml'))) errors.push(`${relative(chapterDir)}: glossary.yaml がありません`);

      const singlePage = fs.existsSync(path.join(chapterDir, 'index.md'));
      const missingLegacy = legacyChapterFiles.filter((name) => !fs.existsSync(path.join(chapterDir, name)));
      if (!singlePage && missingLegacy.length > 0) {
        errors.push(`${relative(chapterDir)}: index.md も完全な旧分割形式もありません（不足: ${missingLegacy.join(', ')}）`);
      }
      if (singlePage && missingLegacy.length === 0) {
        notes.push(`${manifest.id}: index.md と旧分割ファイルが併存しています。移行完了後に旧分割ファイルを削除できます`);
      }
    }
  }
}

function detectCycles(chapters) {
  const graph = new Map(chapters.map((chapter) => [chapter.id, chapter.prerequisites ?? []]));
  const visiting = new Set();
  const visited = new Set();

  function visit(id, trail) {
    if (visiting.has(id)) {
      errors.push(`章依存に循環があります: ${[...trail, id].join(' -> ')}`);
      return;
    }
    if (visited.has(id)) return;
    visiting.add(id);
    for (const next of graph.get(id) ?? []) visit(next, [...trail, id]);
    visiting.delete(id);
    visited.add(id);
  }

  for (const id of graph.keys()) visit(id, []);
}

function relative(file) {
  return path.relative(root, file).replaceAll('\\', '/');
}
