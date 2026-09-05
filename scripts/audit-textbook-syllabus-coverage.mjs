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
const FORMAL_DEFINITION_RE = /(?:\*\*定義(?:[（(]|\*\*)|^(?:>\s*)?#{1,6}\s+定義(?:[（(]|\s|$))/mu;

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

function walkDirectories(dir, acc = []) {
  for (const ent of fs.readdirSync(dir, { withFileTypes: true })) {
    const p = path.join(dir, ent.name);
    if (!ent.isDirectory()) continue;
    const chapterFile = path.join(p, 'chapter.yaml');
    if (fs.existsSync(chapterFile)) acc.push(p);
    walkDirectories(p, acc);
  }
  return acc;
}

const chapterDirs = walkDirectories(VOLUMES).filter((dir) => {
  try {
    const meta = readYaml(path.join(dir, 'chapter.yaml'));
    return curriculumIds.has(meta.id);
  } catch {
    return false;
  }
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

function candidates(term) {
  return [...new Set([term, ...(aliases.get(term) ?? [])])];
}

function firstOccurrence(text, cs, start = 0) {
  let best = null;
  for (const c of cs) {
    const pos = text.indexOf(c, start);
    if (pos >= 0 && (!best || pos < best.pos)) best = { pos, matched: c };
  }
  return best;
}

function headingAt(text, pos) {
  const prefix = text.slice(0, pos);
  const re = /^(#{1,6})\s+(.+)$/gm;
  let m;
  let last = null;
  while ((m = re.exec(prefix))) last = { level: m[1].length, title: m[2].trim(), pos: m.index };
  return last;
}

function explicitAnchorAt(text, pos, floor = 0) {
  const prefix = text.slice(floor, pos);
  const re = /<a\s+id=["']([^"']+)["']\s*><\/a>/g;
  let m;
  let last = null;
  while ((m = re.exec(prefix))) last = { id: m[1], pos: floor + m.index };
  return last;
}

function locatorFor(doc, hit) {
  if (doc.kind !== 'index') return { section: 'chapter.yaml', anchor: null, zone: 'metadata' };
  const heading = headingAt(doc.text, hit.pos);
  const floor = heading?.pos ?? Math.max(0, hit.pos - 2500);
  const anchor = explicitAnchorAt(doc.text, hit.pos, floor);
  const section = heading?.title ?? '(章冒頭)';
  let zone = '本文';
  if (/演習/.test(section) || /^P?\w+[-_].*(A|B|C|D)\d+/.test(section)) zone = '演習';
  if (/例|例題/.test(section)) zone = '例';
  if (anchor?.id?.startsWith('ex-')) zone = '演習';
  return { section, anchor: anchor?.id ?? null, zone };
}

function contentHits(term) {
  const cs = candidates(term);
  const hits = [];
  for (const doc of docs) {
    const hit = firstOccurrence(doc.text, cs);
    if (!hit) continue;
    const loc = locatorFor(doc, hit);
    hits.push({ ...doc, matched: hit.matched, pos: hit.pos, ...loc });
  }
  return hits;
}

function scopedContentHits(term, zone) {
  const cs = candidates(term);
  const hits = [];
  for (const doc of docs.filter((d) => d.kind === 'index')) {
    let start = 0;
    while (true) {
      const hit = firstOccurrence(doc.text, cs, start);
      if (!hit) break;
      const loc = locatorFor(doc, hit);
      if (loc.zone === zone) hits.push({ ...doc, matched: hit.matched, pos: hit.pos, ...loc });
      start = hit.pos + hit.matched.length;
    }
  }
  return hits;
}

function formalDefinitionHits(term) {
  const cs = candidates(term);
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
      if (FORMAL_DEFINITION_RE.test(body)) {
        const hit = firstOccurrence(body, cs);
        if (hit) {
          const heading = headingAt(doc.text, blockStart);
          const floor = heading?.pos ?? Math.max(0, blockStart - 2500);
          const anchor = explicitAnchorAt(doc.text, blockStart, floor);
          if (anchor?.id?.startsWith('def-')) {
            hits.push({
              ...doc,
              matched: hit.matched,
              pos: bodyStart + hit.pos,
              section: heading?.title ?? '(章冒頭)',
              anchor: anchor.id,
              zone: '定義',
            });
          }
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

function displayLocator(hit) {
  if (!hit) return '—';
  const anchor = hit.anchor ? `#${hit.anchor}` : '';
  return `${hit.chapterId} / ${hit.section}${anchor}`;
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

    const content = hits
      .filter((h) => h.kind === 'index')
      .sort((a, b) => Number(Boolean(b.anchor)) - Number(Boolean(a.anchor)) || a.pos - b.pos);
    const definition = formalDefinitionHits(term)[0] ?? null;
    const example = scopedContentHits(term, '例')[0] ?? null;
    const exercise = scopedContentHits(term, '演習')[0] ?? null;
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
console.log(`explicit formal-definition hits: ${explicitDefinitionCount}`);

console.log('\n=== candidates needing human review ===');
for (const r of rows.filter((x) => x.status === 'scope-only' || x.status === 'missing')) {
  console.log(`- [${r.status}] ${r.category} :: ${r.term}${r.scope.length ? ` :: scope=${r.scope.join(',')}` : ''}`);
}

console.log('\n=== official terms without an explicit formal-definition hit ===');
console.log('These are review candidates, not automatic defects; some official terms are procedures or broad topics rather than definable objects.');
for (const r of rows.filter((x) => !x.definition)) {
  console.log(`- ${r.category} :: ${r.term} :: ${displayLocator(r.primary)}${r.scope.length ? ` :: scope=${r.scope.join(',')}` : ''}`);
}

console.log('\n=== all term mappings ===');
for (const r of rows) {
  console.log(`- ${r.category} :: ${r.term} :: ${r.status} :: ${displayLocator(r.primary)}${r.definition ? ` :: definition=${displayLocator(r.definition)}` : ''}${r.scope.length ? ` :: scope=${r.scope.join(',')}` : ''}`);
}

if (process.argv.includes('--write')) {
  const auditDate = new Date().toISOString().slice(0, 10);
  const lines = [];
  lines.push('# 公式シラバス用語 → 通常教材対応監査');
  lines.push('');
  lines.push('`anki/syllabus/syllabus.yaml` の公式用語例を正本とし、通常教材43章だけを対象に機械照合した対応表です。DREAM THEATER・advanced/core 問題集などの補助教材は被覆判定に含めません。');
  lines.push('');
  lines.push(`- 監査日: ${auditDate}`);
  lines.push(`- 通常教材: ${chapterDirs.length}章`);
  lines.push(`- 公式用語出現: ${rows.length}件`);
  lines.push(`- exact: ${counts.exact ?? 0}`);
  lines.push(`- alias: ${counts.alias ?? 0}`);
  lines.push(`- scope-only: ${counts['scope-only'] ?? 0}`);
  lines.push(`- missing: ${counts.missing ?? 0}`);
  lines.push(`- 明示的な定義ブロック内ヒット: ${explicitDefinitionCount}件`);
  lines.push('');
  lines.push('`alias` は公式表記そのものではなく、日本語同義語・慣用表記で本文に回収されているものです。`定義アンカー` は `formal-statement` で囲まれた「定義」ブロック内に同じ公式語または登録済み別名が直接確認できた場合だけ表示します。単に直前に `def-*` アンカーがあるだけでは定義扱いしません。`—` は「教材全体で未扱い」を意味せず、そのゾーンに直接の語句ヒットがないことを表します。');
  lines.push('');
  lines.push('|公式区分|公式用語|判定|主対応（章 / 節・アンカー）|定義アンカー|例|演習|');
  lines.push('|---|---|---|---|---|---|---|');
  for (const r of rows) {
    const esc = (s) => String(s).replaceAll('|', '\\|').replaceAll('\n', ' ');
    lines.push(`|${esc(r.category)}|${esc(r.term)}|${r.status}|${esc(displayLocator(r.primary))}|${esc(displayLocator(r.definition))}|${esc(displayLocator(r.example))}|${esc(displayLocator(r.exercise))}|`);
  }
  lines.push('');
  lines.push('## 定義密度監査の読み方');
  lines.push('');
  lines.push('- `定義アンカー` が `—` でも、それだけで教材欠落とは判定しません。公式シラバスには「確率の計算」「複数の平均に関する検定」のような手続き・範囲名も含まれるためです。');
  lines.push('- Batch 2 では、明示定義が必要な概念だけを人手で選別し、既存定義との重複を避けて補強します。例題・演習数はこの判定に使いません。');
  lines.push('');
  lines.push('## 判定の読み方');
  lines.push('');
  lines.push('- `exact`: 公式用語そのものが通常教材の `index.md` または `chapter.yaml` に存在します。');
  lines.push('- `alias`: 登録済みの日本語同義語・表記揺れで通常教材に存在します。');
  lines.push('- `scope-only`: curriculum では担当章が割り当てられているが本文ヒットがありません。');
  lines.push('- `missing`: 通常教材43章で本文・担当scopeとも未回収です。');
  lines.push('');
  lines.push('この表は「語が出ているか」と「正式な定義ブロック内に語があるか」を分けて監査します。Batch 1 は missing を0にし、Batch 2 は定義密度を精査します。');
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
