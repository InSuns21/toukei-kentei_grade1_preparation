import fs from 'node:fs';
import path from 'node:path';
import process from 'node:process';
import YAML from 'yaml';

const file = path.join(process.cwd(), 'textbook', 'curriculum.yaml');
const document = YAML.parseDocument(fs.readFileSync(file, 'utf8'));
let data = document.toJS();
const command = process.argv[2] ?? 'show';
const activeStatuses = ['drafting', 'self_review', 'independent_review', 'revision'];
const validStatuses = ['planned', ...activeStatuses, 'reviewed', 'blocked'];

if (command === 'show') { show(data); process.exit(0); }
if (command === 'start') {
  const id = process.argv[3] ?? computeNext(data);
  const chapter = findChapter(id);
  assertPrerequisites(chapter);
  const active = currentActive(data);
  if (active && active !== id) fail(`別の章が進行中です: ${active}`);
  if (data.progress.chapters[id].status === 'reviewed') fail(`既に完了しています: ${id}`);
  setState(id, 'drafting');
  if (!data.progress.chapters[id].started_at) document.setIn(['progress', 'chapters', id, 'started_at'], today());
  save(`執筆を開始しました: ${id}`);
}
if (command === 'set') {
  const [id, status] = process.argv.slice(3, 5);
  const note = process.argv.slice(5).join(' ').trim();
  if (!id || !validStatuses.includes(status) || status === 'reviewed') fail('使い方: npm run progress -- set <ID> <状態> [メモ]');
  const chapter = findChapter(id);
  if (status !== 'planned' && status !== 'blocked') assertPrerequisites(chapter);
  if (status === 'blocked' && !note) fail('blocked には理由メモが必要です');
  setState(id, status);
  if (note) document.setIn(['progress', 'chapters', id, 'note'], note);
  save(`${id} を ${status} に変更しました。`);
}
if (command === 'complete') {
  const id = process.argv[3];
  findChapter(id);
  const status = data.progress.chapters[id].status;
  if (!['independent_review', 'revision'].includes(status)) fail('complete は independent_review または revision からだけ実行できます');
  document.setIn(['progress', 'chapters', id, 'status'], 'reviewed');
  document.setIn(['progress', 'chapters', id, 'completed_at'], today());
  document.setIn(['progress', 'chapters', id, 'review_result'], { fatal: 0, major: 0, minor: 0 });
  document.deleteIn(['progress', 'chapters', id, 'note']);
  document.setIn(['progress', 'last_completed_chapter'], id);
  sync();
  write();
  console.log(`査読完了として記録しました: ${id}`);
  show(YAML.parse(fs.readFileSync(file, 'utf8')));
  process.exit(0);
}
if (command === 'sync') { sync(); write(); console.log('進捗を同期しました。'); show(YAML.parse(fs.readFileSync(file, 'utf8'))); process.exit(0); }
fail(`不明なコマンドです: ${command}`);

function setState(id, status) {
  const active = currentActive(data);
  if (activeStatuses.includes(status) && active && active !== id) fail(`別の章が進行中です: ${active}`);
  document.setIn(['progress', 'chapters', id, 'status'], status);
}
function save(message) { sync(); write(); console.log(message); show(YAML.parse(fs.readFileSync(file, 'utf8'))); process.exit(0); }
function sync() {
  data = document.toJS();
  const counts = Object.fromEntries(validStatuses.map((status) => [status, 0]));
  for (const state of Object.values(data.progress.chapters)) counts[state.status] += 1;
  const active = currentActive(data);
  const next = active ?? computeNext(data);
  document.setIn(['progress', 'updated_at'], today());
  document.setIn(['progress', 'current_chapter'], active);
  document.setIn(['progress', 'next_chapter'], next);
  document.setIn(['progress', 'next_work'], next ? { type: 'chapter', id: next } : null);
  document.setIn(['progress', 'summary'], { total: Object.keys(data.progress.chapters).length, ...counts });
}
function computeNext(source) {
  return source.chapters.find((chapter) => source.progress.chapters[chapter.id].status === 'planned' && chapter.prerequisites.every((id) => source.progress.chapters[id].status === 'reviewed'))?.id ?? null;
}
function currentActive(source) { return source.chapters.find((chapter) => activeStatuses.includes(source.progress.chapters[chapter.id].status))?.id ?? null; }
function findChapter(id) { const chapter = data.chapters.find((item) => item.id === id); if (!chapter) fail(`章がありません: ${id}`); return chapter; }
function assertPrerequisites(chapter) { const pending = chapter.prerequisites.filter((id) => data.progress.chapters[id].status !== 'reviewed'); if (pending.length) fail(`未完了の前提章: ${pending.join(', ')}`); }
function write() { fs.writeFileSync(file, document.toString({ lineWidth: 0 }), 'utf8'); }
function show(source) { console.log(`進捗: ${source.progress.summary.reviewed}/${source.progress.summary.total} 章`); console.log(`進行中: ${source.progress.current_chapter ?? 'なし'}`); console.log(`次の章: ${source.progress.next_chapter ?? 'なし'}`); }
function today() { return new Intl.DateTimeFormat('en-CA', { timeZone: 'Asia/Tokyo' }).format(new Date()); }
function fail(message) { console.error(message); process.exit(1); }

