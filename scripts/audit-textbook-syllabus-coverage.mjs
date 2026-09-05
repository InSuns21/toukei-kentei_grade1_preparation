import fs from 'node:fs';
import path from 'node:path';
import { parse } from 'yaml';

const ROOT = process.cwd();
const SYLLABUS = path.join(ROOT, 'anki', 'syllabus', 'syllabus.yaml');
const CURRICULUM = path.join(ROOT, 'textbook', 'curriculum.yaml');
const VOLUMES = path.join(ROOT, 'textbook', 'volumes');
const REPORT = path.join(ROOT, 'textbook', 'SYLLABUS_TERM_COVERAGE.md');
const FORMAL_START = '<!-- formal-statement-start -->';
const FORMAL_END = '<!-- formal-statement-end -->';

const readYaml = (p) => parse(fs.readFileSync(p, 'utf8'));
const syllabus = readYaml(SYLLABUS);
const curriculum = readYaml(CURRICULUM);
const curriculumIds = new Set((curriculum.chapters ?? []).map((ch) => ch.id));

const aliases = new Map([
  ['モーメント母関数（積率母関数）', ['モーメント母関数', '積率母関数']],
  ['正規分布（ガウス分布）', ['正規分布', 'ガウス分布']],
  ['検出力（検定力）', ['検出力', '検定力']],
  ['ウィルコクソン順位和検定（マン・ホイットニーU検定）', ['ウィルコクソン順位和検定', 'マン・ホイットニーU検定', 'マン・ホイットニー']],
  ['欠測（欠損）', ['欠測', '欠損']],
  ['フィッシャー情報量（1次元）', ['フィッシャー情報量', '期待フィッシャー情報量']],
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
  ['マルコフ連鎖', ['マルコフ連鎖', 'Markov鎖']],
  ['Poisson過程', ['Poisson過程', 'ポアソン過程']],
  ['ポアソン過程', ['ポアソン過程', 'Poisson過程']],
  ['Brown運動', ['Brown運動', 'ブラウン運動']],
  ['ブラウン運動', ['ブラウン運動', 'Brown運動']],
  ['Gauss--Markov', ['Gauss--Markov', 'ガウス・マルコフ']],
  ['ガウス・マルコフの定理', ['ガウス・マルコフの定理', 'Gauss--Markov', 'Gauss–Markov']],
  ['Delta法', ['Delta法', 'デルタ法']],
  ['デルタ法', ['デルタ法', 'Delta法']],
  ['Monte Carlo', ['Monte Carlo', 'モンテカルロ']],
  ['モンテカルロシミュレーション', ['モンテカルロシミレーション', 'モンテカルロシミュレーション', 'モンテカルロ', 'Monte Carlo']],
  ['ロジスティック回帰分析', ['ロジスティック回帰分析', 'ロジスティック回帰']],
  ['トランケーション', ['トランケーション', '切断']],
]);

function walkDirs(dir, acc = []) {
  for (const ent of fs.readdirSync(dir, { withFileTypes: true })) {
    if (!ent.isDirectory()) continue;
    const p = path.join(dir, ent.name);
    if (fs.existsSync(path.join(p, 'chapter.yaml'))) acc.push(p);
    walkDirs(p, acc);
  }
  return acc;
}

const chapterDirs = walkDirs(VOLUMES).filter((dir) => {
  try { return curriculumIds.has(readYaml(path.join(dir, 'chapter.yaml')).id); } catch { return false; }
});

const docs = [];
for (const dir of chapterDirs) {
  const meta = readYaml(path.join(dir, 'chapter.yaml'));
  for (const name of ['chapter.yaml', 'index.md']) {
    const p = path.join(dir, name);
    if (!fs.existsSync(p)) continue;
    docs.push({
      chapterId: meta.id,
      chapterTitle: meta.title,
      path: path.relative(ROOT, p).replaceAll(path.sep, '/'),
      kind: name === 'index.md' ? 'index' : 'meta',
      text: fs.readFileSync(p, 'utf8'),
    });
  }
}

const chapterByScope = new Map();
for (const ch of curriculum.chapters ?? []) {
  for (const term of ch.official_scope ?? []) {
    const key = String(term);
    if (!chapterByScope.has(key)) chapterByScope.set(key, []);
    chapterByScope.get(key).push(ch.id);
  }
}

const candidates = (term) => [...new Set([term, ...(aliases.get(term) ?? [])])];

function firstOccurrence(text, cs, start = 0) {
  let best = null;
  for (const c of cs) {
    const pos = text.indexOf(c, start);
    if (pos >= 0 && (!best || pos < best.pos)) best = { pos, matched: c };
  }
  return best;
}

function headingAt(text, pos) {
  const re = /^(#{1,6})\s+(.+)$/gm;
  const prefix = text.slice(0, pos);
  let m;
  let last = null;
  while ((m = re.exec(prefix))) last = { title: m[2].trim(), pos: m.index };
  return last;
}

function anchorBefore(text, pos, floor = 0) {
  const re = /<a\s+id=["']([^"']+)["']\s*><\/a>/g;
  const prefix = text.slice(floor, pos);
  let m;
  let last = null;
  while ((m = re.exec(prefix))) last = { id: m[1], pos: floor + m.index };
  return last;
}

function locator(doc, pos) {
  if (doc.kind !== 'index') return { section: 'chapter.yaml', anchor: null, zone: 'metadata' };
  const heading = headingAt(doc.text, pos);
  const floor = heading?.pos ?? Math.max(0, pos - 2500);
  const anchor = anchorBefore(doc.text, pos, floor);
  const section = heading?.title ?? '(章冒頭)';
  let zone = '本文';
  if (/演習/.test(section) || /^P?\w+[-_].*(A|B|C|D)\d+/.test(section) || anchor?.id?.startsWith('ex-')) zone = '演習';
  else if (/例|例題/.test(section)) zone = '例';
  return { section, anchor: anchor?.id ?? null, zone };
}

function contentHits(term) {
  const cs = candidates(term);
  const hits = [];
  for (const doc of docs) {
    const hit = firstOccurrence(doc.text, cs);
    if (!hit) continue;
    hits.push({ ...doc, ...hit, ...locator(doc, hit.pos) });
  }
  return hits;
}

function zoneHits(term, zone) {
  const cs = candidates(term);
  const hits = [];
  for (const doc of docs.filter((d) => d.kind === 'index')) {
    let start = 0;
    while (true) {
      const hit = firstOccurrence(doc.text, cs, start);
      if (!hit) break;
      const loc = locator(doc, hit.pos);
      if (loc.zone === zone) hits.push({ ...doc, ...hit, ...loc });
      start = hit.pos + hit.matched.length;
    }
  }
  return hits;
}

function definitionLabel(body) {
  const line = body.split(/\r?\n/).find((x) => /定義/u.test(x));
  if (!line) return null;
  const paren = line.match(/定義[（(]([^）)]+)[）)]/u);
  if (paren) return paren[1].trim();
  return line
    .replace(/^.*?定義/u, '')
    .replace(/[>*#：:*_`]/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
}

function labelMentions(term, label) {
  if (!label) return false;
  const parts = label
    .split(/(?:・|、|，|,|\/|／|および|及び|または|又は|\s+と\s+)/u)
    .map((x) => x.trim())
    .filter(Boolean);
  for (const c of candidates(term)) {
    if (label === c || parts.includes(c)) return true;
    for (const p of parts) {
      if (!p.startsWith(c)) continue;
      const suffix = p.slice(c.length);
      if (/^(?:量|関数|法|分析|モデル|過程|検定|係数|統計量)(?:[（(].*)?$/u.test(suffix)) return true;
    }
  }
  return false;
}

function formalDefinitionHits(term) {
  const hits = [];
  for (const doc of docs.filter((d) => d.kind === 'index')) {
    let start = 0;
    while (true) {
      const blockStart = doc.text.indexOf(FORMAL_START, start);
      if (blockStart < 0) break;
      const bodyStart = blockStart + FORMAL_START.length;
      const blockEnd = doc.text.indexOf(FORMAL_END, bodyStart);
      if (blockEnd < 0) break;
      const body = doc.text.slice(bodyStart, blockEnd);
      const label = definitionLabel(body);
      if (labelMentions(term, label)) {
        const heading = headingAt(doc.text, blockStart);
        const floor = heading?.pos ?? Math.max(0, blockStart - 2500);
        const anchor = anchorBefore(doc.text, blockStart, floor);
        if (anchor?.id?.startsWith('def-')) {
          hits.push({
            ...doc,
            matched: label,
            pos: blockStart,
            section: heading?.title ?? '(章冒頭)',
            anchor: anchor.id,
            zone: '定義',
          });
        }
      }
      start = blockEnd + FORMAL_END.length;
    }
  }
  return hits;
}

function scopeHits(term) {
  const ids = [];
  for (const c of candidates(term)) ids.push(...(chapterByScope.get(c) ?? []));
  return [...new Set(ids)];
}

function display(hit) {
  if (!hit) return '—';
  return `${hit.chapterId} / ${hit.section}${hit.anchor ? `#${hit.anchor}` : ''}`;
}

const rows = [];
for (const item of syllabus.items ?? []) {
  for (const raw of item.terms ?? []) {
    const term = String(raw);
    const hits = contentHits(term);
    const scope = scopeHits(term);
    let status = 'missing';
    if (hits.some((h) => h.matched === term)) status = 'exact';
    else if (hits.length) status = 'alias';
    else if (scope.length) status = 'scope-only';
    const content = hits.filter((h) => h.kind === 'index');
    const definition = formalDefinitionHits(term)[0] ?? null;
    const example = zoneHits(term, '例')[0] ?? null;
    const exercise = zoneHits(term, '演習')[0] ?? null;
    const primary = definition ?? content[0] ?? hits[0] ?? null;
    rows.push({ category: item.id, term, status, hits, scope, primary, definition, example, exercise });
  }
}

const counts = rows.reduce((m, r) => (m[r.status] = (m[r.status] ?? 0) + 1, m), {});
const explicitDefinitionCount = rows.filter((r) => r.definition).length;

console.log('=== textbook syllabus term audit ===');
console.log(`curriculum chapters scanned: ${chapterDirs.length}`);
console.log(`official term occurrences: ${rows.length}`);
for (const k of ['exact', 'alias', 'scope-only', 'missing']) console.log(`${k}: ${counts[k] ?? 0}`);
console.log(`explicit formal-definition label hits: ${explicitDefinitionCount}`);

console.log('\n=== candidates needing human review ===');
for (const r of rows.filter((x) => x.status === 'scope-only' || x.status === 'missing')) {
  console.log(`- [${r.status}] ${r.category} :: ${r.term}${r.scope.length ? ` :: scope=${r.scope.join(',')}` : ''}`);
}

console.log('\n=== official terms without an explicit definition-label hit ===');
console.log('Review candidates only: procedures and broad topic names do not necessarily need a definition block.');
for (const r of rows.filter((x) => !x.definition)) {
  console.log(`- ${r.category} :: ${r.term} :: ${display(r.primary)}${r.scope.length ? ` :: scope=${r.scope.join(',')}` : ''}`);
}

console.log('\n=== all term mappings ===');
for (const r of rows) {
  console.log(`- ${r.category} :: ${r.term} :: ${r.status} :: ${display(r.primary)}${r.definition ? ` :: definition=${display(r.definition)}` : ''}${r.scope.length ? ` :: scope=${r.scope.join(',')}` : ''}`);
}

if (process.argv.includes('--write')) {
  const lines = [
    '# 公式シラバス用語 → 通常教材対応監査',
    '',
    '`anki/syllabus/syllabus.yaml` の公式用語例を正本とし、通常教材43章だけを対象に機械照合した対応表です。DREAM THEATER・advanced/core 問題集などの補助教材は被覆判定に含めません。',
    '',
    `- 監査日: ${new Date().toISOString().slice(0, 10)}`,
    `- 通常教材: ${chapterDirs.length}章`,
    `- 公式用語出現: ${rows.length}件`,
    `- exact: ${counts.exact ?? 0}`,
    `- alias: ${counts.alias ?? 0}`,
    `- scope-only: ${counts['scope-only'] ?? 0}`,
    `- missing: ${counts.missing ?? 0}`,
    `- 明示的な定義ラベルヒット: ${explicitDefinitionCount}件`,
    '',
    '`alias` は公式表記そのものではなく、日本語同義語・慣用表記で本文に回収されているものです。`定義アンカー` は `formal-statement` 内の定義ラベル（例: `定義（尤度関数）`）そのものが公式語または登録済み別名に対応するときだけ表示します。定義本文に偶然その語が出るだけでは定義扱いしません。`—` は教材全体での未扱いを意味しません。',
    '',
    '|公式区分|公式用語|判定|主対応（章 / 節・アンカー）|定義アンカー|例|演習|',
    '|---|---|---|---|---|---|---|',
  ];
  const esc = (s) => String(s).replaceAll('|', '\\|').replaceAll('\n', ' ');
  for (const r of rows) {
    lines.push(`|${esc(r.category)}|${esc(r.term)}|${r.status}|${esc(display(r.primary))}|${esc(display(r.definition))}|${esc(display(r.example))}|${esc(display(r.exercise))}|`);
  }
  lines.push('', '## 定義密度監査の読み方', '',
    '- `定義アンカー` が `—` でも、それだけで教材欠落とは判定しません。公式シラバスには「確率の計算」「複数の平均に関する検定」のような手続き・範囲名も含まれるためです。',
    '- Batch 2 では、明示定義が必要な概念だけを人手で選別し、既存定義との重複を避けて補強します。例題・演習数はこの判定に使いません。',
    '', '## 判定の読み方', '',
    '- `exact`: 公式用語そのものが通常教材の `index.md` または `chapter.yaml` に存在します。',
    '- `alias`: 登録済みの日本語同義語・表記揺れで通常教材に存在します。',
    '- `scope-only`: curriculum では担当章が割り当てられているが本文ヒットがありません。',
    '- `missing`: 通常教材43章で本文・担当scopeとも未回収です。',
    '', 'この表は「語が出ているか」と「正式な定義ラベルとして語が定義されているか」を分けて監査します。Batch 1 は missing を0にし、Batch 2 は定義密度を精査します。');
  fs.writeFileSync(REPORT, `${lines.join('\n')}\n`, 'utf8');
  console.log(`\nwrote ${path.relative(ROOT, REPORT)}`);
}

if (process.argv.includes('--json')) {
  console.log(JSON.stringify({ counts: { ...counts, explicitDefinitions: explicitDefinitionCount }, rows }, null, 2));
}

if (process.argv.includes('--strict') && ((counts.missing ?? 0) > 0 || (counts['scope-only'] ?? 0) > 0)) {
  console.error(`\nSyllabus coverage is incomplete: missing=${counts.missing ?? 0}, scope-only=${counts['scope-only'] ?? 0}`);
  process.exit(1);
}
