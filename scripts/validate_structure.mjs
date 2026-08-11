import fs from 'node:fs';
import path from 'node:path';
import process from 'node:process';
import YAML from 'yaml';

const root = process.cwd();
const errors = [];
const requiredRoot = ['AGENTS.md', 'README.md', 'curriculum.yaml', 'notation.md', 'style-guide.md', 'dependency-graph.md', 'references/past-exam-trends.md', 'references/past-exam-index.yaml'];
const requiredChapter = ['00_overview.md', '01_motivation.md', '02_definitions.md', '03_theorems.md', '04_examples.md', '05_problem_solving.md', '06_exercises.md', '07_solutions.md', '08_exam_drill.md', '09_past_exam_practice.md', 'chapter.yaml', 'glossary.yaml', 'review/validation.md'];
for (const file of requiredRoot) if (!fs.existsSync(path.join(root, file))) errors.push(`必須ファイルがありません: ${file}`);

let data;
try { data = YAML.parse(fs.readFileSync(path.join(root, 'curriculum.yaml'), 'utf8')); }
catch (error) { errors.push(`curriculum.yaml を解析できません: ${error.message}`); }

if (data) {
  if (data.schema_version !== 1 || data.progress?.schema_version !== 1) errors.push('schema_version は 1 でなければなりません');
  if (data.math_renderer !== 'katex') errors.push('math_renderer は katex でなければなりません');
  const chapters = data.chapters ?? [];
  const ids = new Set();
  for (const chapter of chapters) {
    if (!chapter.id || ids.has(chapter.id)) errors.push(`章IDがないか重複しています: ${chapter.id}`);
    ids.add(chapter.id);
    if (!Array.isArray(chapter.official_scope) || !chapter.official_scope.length) errors.push(`${chapter.id}: official_scope がありません`);
  }
  for (const chapter of chapters) for (const id of chapter.prerequisites ?? []) if (!ids.has(id)) errors.push(`${chapter.id}: 存在しない前提章 ${id}`);
  detectCycles(chapters, errors);
  validateProgress(data, ids, errors);
  validateGeneratedChapters(data, requiredChapter, errors);
}

if (errors.length) {
  console.error(`構造検証で ${errors.length} 件の問題が見つかりました:`);
  errors.forEach((error) => console.error(`- ${error}`));
  process.exit(1);
}
console.log('教材構造、依存関係、進捗メタデータを検証しました。');

function validateProgress(data, ids, errors) {
  const valid = ['planned', 'drafting', 'self_review', 'independent_review', 'revision', 'reviewed', 'blocked'];
  const states = data.progress?.chapters ?? {};
  const counts = Object.fromEntries(valid.map((status) => [status, 0]));
  for (const id of ids) {
    const state = states[id];
    if (!state || !valid.includes(state.status)) errors.push(`${id}: 進捗状態が不正です`);
    else {
      counts[state.status] += 1;
      if (state.status === 'reviewed' && (!state.completed_at || Object.values(state.review_result ?? {}).some((v) => v !== 0))) errors.push(`${id}: reviewed の完了情報が不正です`);
      if (state.status === 'blocked' && !state.note) errors.push(`${id}: blocked には理由が必要です`);
    }
  }
  const summary = data.progress?.summary ?? {};
  if (summary.total !== ids.size) errors.push(`progress.summary.total は ${ids.size} でなければなりません`);
  for (const status of valid) if (summary[status] !== counts[status]) errors.push(`progress.summary.${status} が集計と一致しません`);
  const active = [...ids].filter((id) => ['drafting', 'self_review', 'independent_review', 'revision'].includes(states[id]?.status));
  if (active.length > 1) errors.push(`進行中の章が複数あります: ${active.join(', ')}`);
  if ((data.progress.current_chapter ?? null) !== (active[0] ?? null)) errors.push('current_chapter が進捗状態と一致しません');
  const expected = active[0] ?? data.chapters.find((chapter) => states[chapter.id]?.status === 'planned' && (chapter.prerequisites ?? []).every((id) => states[id]?.status === 'reviewed'))?.id ?? null;
  if ((data.progress.next_chapter ?? null) !== expected) errors.push(`next_chapter が不正です（期待値 ${expected}）`);
}

function validateGeneratedChapters(data, required, errors) {
  let pastExamIds = new Set();
  let pastExamEntries = new Map();
  try {
    const index = YAML.parse(fs.readFileSync(path.join(root, 'references', 'past-exam-index.yaml'), 'utf8'));
    const entries = index.entries ?? [];
    pastExamIds = new Set(entries.map((entry) => entry.id));
    pastExamEntries = new Map(entries.map((entry) => [entry.id, entry]));
    for (const item of entries) {
      if (!item.evidence || !['official_problem', 'third_party_topic_index'].includes(item.evidence.source_type)) errors.push(`${item.id}: source_type が不正です`);
      if (!Array.isArray(item.evidence?.confirmed_by) || item.evidence.confirmed_by.length < 1) errors.push(`${item.id}: confirmed_by がありません`);
      if (!['high', 'medium', 'low'].includes(item.evidence?.confidence)) errors.push(`${item.id}: confidence が不正です`);
      if (!item.evidence?.problem_source) errors.push(`${item.id}: problem_source がありません`);
    }
  } catch (error) {
    errors.push(`past-exam-index.yaml を解析できません: ${error.message}`);
  }
  for (const volume of data.volumes ?? []) {
    const directory = path.join(root, volume.directory);
    if (!fs.existsSync(directory)) continue;
    for (const entry of fs.readdirSync(directory, { withFileTypes: true }).filter((e) => e.isDirectory())) {
      const chapterDir = path.join(directory, entry.name);
      if (!fs.existsSync(path.join(chapterDir, 'chapter.yaml'))) continue;
      for (const name of required) if (!fs.existsSync(path.join(chapterDir, name))) errors.push(`${path.relative(root, chapterDir)}: ${name} がありません`);
      const manifest = YAML.parse(fs.readFileSync(path.join(chapterDir, 'chapter.yaml'), 'utf8'));
      if (!data.chapters.some((chapter) => chapter.id === manifest.id)) errors.push(`${entry.name}: curriculum.yaml にない章ID ${manifest.id}`);
      const state = data.progress?.chapters?.[manifest.id]?.status;
      if (state === 'reviewed') {
        if (!Array.isArray(manifest.past_exam_alignment) || manifest.past_exam_alignment.length < 2) errors.push(`${manifest.id}: reviewed 章には past_exam_alignment が2件以上必要です`);
        for (const item of manifest.past_exam_alignment ?? []) {
          if (!pastExamIds.has(item.id)) errors.push(`${manifest.id}: 未登録の過去問ID ${item.id}`);
          else if (!(pastExamEntries.get(item.id).chapters ?? []).includes(manifest.id)) errors.push(`${manifest.id}: ${item.id} の索引側 chapters に逆参照がありません`);
        }
        if (!Array.isArray(manifest.integrated_exam_problems) || manifest.integrated_exam_problems.length < 1) errors.push(`${manifest.id}: integrated_exam_problems がありません`);
        const drill = fs.readFileSync(path.join(chapterDir, '08_exam_drill.md'), 'utf8');
        const practice = fs.readFileSync(path.join(chapterDir, '09_past_exam_practice.md'), 'utf8');
        if (!drill.includes('## 過去問傾向との対応')) errors.push(`${manifest.id}: 08_exam_drill.md に過去問傾向との対応がありません`);
        if (!practice.includes('## 実過去問演習')) errors.push(`${manifest.id}: 09_past_exam_practice.md に実過去問演習がありません`);
      }
    }
  }
}

function detectCycles(chapters, errors) {
  const graph = new Map(chapters.map((chapter) => [chapter.id, chapter.prerequisites ?? []]));
  const visiting = new Set(); const visited = new Set();
  function visit(id, trail) {
    if (visiting.has(id)) { errors.push(`循環依存: ${[...trail, id].join(' -> ')}`); return; }
    if (visited.has(id)) return;
    visiting.add(id);
    for (const dep of graph.get(id) ?? []) visit(dep, [...trail, id]);
    visiting.delete(id); visited.add(id);
  }
  for (const id of graph.keys()) visit(id, []);
}
