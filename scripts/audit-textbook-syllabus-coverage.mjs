import fs from 'node:fs';
import path from 'node:path';
import { parse } from 'yaml';

const ROOT = process.cwd();
const SYLLABUS = path.join(ROOT, 'anki', 'syllabus', 'syllabus.yaml');
const CURRICULUM = path.join(ROOT, 'textbook', 'curriculum.yaml');
const VOLUMES = path.join(ROOT, 'textbook', 'volumes');

const readYaml = (p) => parse(fs.readFileSync(p, 'utf8'));
const syllabus = readYaml(SYLLABUS);
const curriculum = readYaml(CURRICULUM);

const aliases = new Map([
  ['モーメント母関数（積率母関数）', ['モーメント母関数', '積率母関数']],
  ['正規分布（ガウス分布）', ['正規分布', 'ガウス分布']],
  ['検出力（検定力）', ['検出力', '検定力']],
  ['ウィルコクソン順位和検定（マン・ホイットニーU検定）', ['ウィルコクソン順位和検定', 'マン・ホイットニーU検定', 'マン・ホイットニー']],
  ['欠測（欠損）', ['欠測', '欠損']],
  ['フィッシャー情報量（1次元）', ['フィッシャー情報量']],
  ['線形推定（BLUE）', ['線形推定', 'BLUE']],
  ['固有値・固有ベクトル', ['固有値', '固有ベクトル']],
  ['二項分布の正規近似とポアソン近似', ['正規近似', 'ポアソン近似']],
  ['平均への回帰（回帰効果）', ['平均への回帰', '回帰効果']],
  ['L1正則化法', ['L1正則化', 'L1 正則化']],
  ['ARIMAモデル', ['ARIMAモデル', 'ARIMA過程', 'ARIMA']],
  ['ARIMA過程', ['ARIMA過程', 'ARIMAモデル', 'ARIMA']],
  ['大数の弱法則', ['大数の弱法則', '弱大数', '大数の法則']],
  ['大数の法則', ['大数の法則', '大数則']],
  ['完全無作為抽出', ['完全無作為抽出', '単純無作為抽出']],
  ['Fisherの3原則', ['Fisherの3原則', 'フィッシャーの3原則']],
  ['フィッシャーの3原則', ['フィッシャーの3原則', 'Fisherの3原則']],
  ['Markov連鎖', ['Markov連鎖', 'マルコフ連鎖']],
  ['マルコフ連鎖', ['マルコフ連鎖', 'Markov連鎖']],
  ['Poisson過程', ['Poisson過程', 'ポアソン過程']],
  ['ポアソン過程', ['ポアソン過程', 'Poisson過程']],
  ['Brown運動', ['Brown運動', 'ブラウン運動']],
  ['ブラウン運動', ['ブラウン運動', 'Brown運動']],
  ['Gauss--Markov', ['Gauss--Markov', 'ガウス・マルコフ']],
  ['ガウス・マルコフの定理', ['ガウス・マルコフの定理', 'Gauss--Markov', 'Gauss–Markov']],
  ['Delta法', ['Delta法', 'デルタ法']],
  ['デルタ法', ['デルタ法', 'Delta法']],
  ['Monte Carlo', ['Monte Carlo', 'モンテカルロ']],
  ['モンテカルロシミュレーション', ['モンテカルロ', 'Monte Carlo']],
]);

function walk(dir, acc = []) {
  for (const ent of fs.readdirSync(dir, { withFileTypes: true })) {
    const p = path.join(dir, ent.name);
    if (ent.isDirectory()) walk(p, acc);
    else if (ent.name === 'index.md' || ent.name === 'chapter.yaml') acc.push(p);
  }
  return acc;
}

const files = walk(VOLUMES);
const docs = files.map((p) => ({
  path: path.relative(ROOT, p).replaceAll(path.sep, '/'),
  text: fs.readFileSync(p, 'utf8'),
}));

const chapterByScope = new Map();
for (const ch of curriculum.chapters ?? []) {
  for (const term of ch.official_scope ?? []) {
    const key = String(term);
    if (!chapterByScope.has(key)) chapterByScope.set(key, []);
    chapterByScope.get(key).push(ch.id);
  }
}

function candidates(term) {
  const xs = aliases.get(term) ?? [term];
  return [...new Set([term, ...xs])];
}

function contentHits(term) {
  const cs = candidates(term);
  const hits = [];
  for (const doc of docs) {
    const matched = cs.filter((c) => doc.text.includes(c));
    if (matched.length) hits.push({ path: doc.path, matched });
  }
  return hits;
}

function scopeHits(term) {
  const cs = candidates(term);
  const ids = [];
  for (const [scope, chapters] of chapterByScope.entries()) {
    if (cs.some((c) => scope.includes(c) || c.includes(scope))) ids.push(...chapters);
  }
  return [...new Set(ids)];
}

const rows = [];
for (const item of syllabus.items ?? []) {
  for (const raw of item.terms ?? []) {
    const term = String(raw);
    const hits = contentHits(term);
    const scope = scopeHits(term);
    let status = 'missing';
    if (hits.some((h) => h.matched.includes(term))) status = 'exact';
    else if (hits.length) status = 'alias';
    else if (scope.length) status = 'scope-only';
    rows.push({ category: item.id, term, status, hits, scope });
  }
}

const counts = rows.reduce((m, r) => (m[r.status] = (m[r.status] ?? 0) + 1, m), {});
console.log('=== textbook syllabus term audit ===');
console.log(`official term occurrences: ${rows.length}`);
for (const k of ['exact', 'alias', 'scope-only', 'missing']) console.log(`${k}: ${counts[k] ?? 0}`);

console.log('\n=== candidates needing human review ===');
for (const r of rows.filter((x) => x.status === 'scope-only' || x.status === 'missing')) {
  console.log(`- [${r.status}] ${r.category} :: ${r.term}${r.scope.length ? ` :: scope=${r.scope.join(',')}` : ''}`);
}

console.log('\n=== all term mappings ===');
for (const r of rows) {
  const sample = r.hits.slice(0, 3).map((h) => h.path).join(', ');
  console.log(`- ${r.category} :: ${r.term} :: ${r.status} :: ${sample || '-'}${r.scope.length ? ` :: scope=${r.scope.join(',')}` : ''}`);
}

if (process.argv.includes('--json')) {
  console.log(JSON.stringify({ counts, rows }, null, 2));
}
