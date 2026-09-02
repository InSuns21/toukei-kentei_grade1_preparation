import fs from 'node:fs';
import path from 'node:path';

const ROOT = path.resolve('textbook/volumes');
const args = process.argv.slice(2);
const writeIndex = args.indexOf('--write');
const writePath = writeIndex >= 0 ? args[writeIndex + 1] : null;

function walk(dir) {
  const out = [];
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) out.push(...walk(full));
    else if (entry.isFile() && entry.name.endsWith('.md')) out.push(full);
  }
  return out;
}

function normalizeTitle(title) {
  return title.replace(/[`*_]/g, '').replace(/<[^>]+>/g, '').trim();
}

function headings(text) {
  return text.split(/\r?\n/).flatMap((line) => {
    const m = /^(#{1,6})\s+(.+?)\s*$/.exec(line);
    if (!m) return [];
    return [{ level: m[1].length, title: normalizeTitle(m[2]) }];
  });
}

function substantiveProofHeading(title) {
  return /^(?:完全)?証明(?:\s*(?:[（(].*[）)]|[:：].*))?$/u.test(title)
    || /^proof(?:\s*(?:[（(].*[）)]|[:：].*))?$/iu.test(title);
}

function countPattern(text, re) {
  return [...text.matchAll(re)].length;
}

function classify(row) {
  let score = 0;
  const reasons = [];
  if (row.proofs >= 5) {
    score += 3;
    reasons.push(`証明${row.proofs}本`);
  } else if (row.proofs >= 3) {
    score += 2;
    reasons.push(`証明${row.proofs}本`);
  } else if (row.proofs >= 2) {
    score += 1;
  }
  if (row.examples === 0) {
    score += 2;
    reasons.push('例見出し0');
  } else if (row.examples < Math.ceil(row.proofs / 2)) {
    score += 1;
    reasons.push(`例${row.examples}件`);
  }
  if (row.intuition === 0) {
    score += 1;
    reasons.push('直感・意味見出し0');
  }
  if (row.exercises === 0) {
    score += 1;
    reasons.push('演習見出し0');
  }
  if (row.proofLinesRatio >= 0.45) {
    score += 2;
    reasons.push(`証明ブロック約${Math.round(row.proofLinesRatio * 100)}%`);
  } else if (row.proofLinesRatio >= 0.30) {
    score += 1;
    reasons.push(`証明ブロック約${Math.round(row.proofLinesRatio * 100)}%`);
  }

  let status = 'WATCH';
  if (score >= 7) status = 'P0';
  else if (score >= 5) status = 'P1';
  else if (score >= 3) status = 'P2';
  return { score, status, reasons: reasons.join('、') || '大きな機械警告なし' };
}

function proofBlockLineCount(lines) {
  let inProof = false;
  let count = 0;
  for (const line of lines) {
    if (line.trim() === '<!-- proof-start -->') {
      inProof = true;
      continue;
    }
    if (line.trim() === '<!-- proof-end -->') {
      inProof = false;
      continue;
    }
    if (inProof && line.trim()) count += 1;
  }
  return count;
}

const rows = [];
for (const file of walk(ROOT)) {
  const text = fs.readFileSync(file, 'utf8');
  const hs = headings(text);
  const proofHeadings = hs.filter((h) => substantiveProofHeading(h.title));
  const markerProofs = countPattern(text, /<!-- proof-start -->/g);
  const proofs = Math.max(proofHeadings.length, markerProofs);
  if (proofs === 0) continue;

  const examples = hs.filter((h) => /(?:^|\s)(?:具体例|数値例|反例|例題|例\d*|例$)/u.test(h.title) || /^(?:具体例|反例|例題|例\d*)/u.test(h.title)).length;
  const intuition = hs.filter((h) => /(直感|意味|なぜ|イメージ|位置付け|見取り図|考え方|何がうれしい|導入|モチベーション)/u.test(h.title)).length;
  const exercises = hs.filter((h) => /(演習|問題|ドリル)/u.test(h.title)).length;
  const lines = text.split(/\r?\n/);
  const proofLines = proofBlockLineCount(lines);
  const nonblank = lines.filter((line) => line.trim()).length || 1;
  const rel = path.relative(process.cwd(), file).replaceAll(path.sep, '/');
  const firstH1 = hs.find((h) => h.level === 1)?.title ?? path.basename(path.dirname(file));
  const row = {
    path: rel,
    title: firstH1,
    proofs,
    examples,
    intuition,
    exercises,
    proofLinesRatio: proofLines / nonblank
  };
  Object.assign(row, classify(row));
  rows.push(row);
}

rows.sort((a, b) => b.score - a.score || b.proofs - a.proofs || a.path.localeCompare(b.path, 'ja'));

const counts = rows.reduce((acc, row) => {
  acc[row.status] = (acc[row.status] || 0) + 1;
  return acc;
}, {});

const report = [];
report.push('# DREAM THEATER 証明偏重・教材導線監査');
report.push('');
report.push('この文書は、証明補完によって本文が「定理 → 証明 → 定理 → 証明」に偏っていないかを継続監査するための一次スクリーニングです。**数学的正しさの監査とは別に、読者が証明を後回しにしても意味・具体例・使い道を追えるか**を対象にします。');
report.push('');
report.push('機械判定は、人間の教材レビューを置き換えません。証明本数、例・直感・演習の見出し数、折りたたみ対象の本文比率から、優先的に読み直すページを抽出します。P0/P1は人手で必ず本文を読み、単純な見出し追加で解消扱いにしません。');
report.push('');
report.push('## 監査基準');
report.push('');
report.push('証明を持つ講義は、原則として次の順序を目標にします。');
report.push('');
report.push('```text');
report.push('何が問題か / なぜ必要か');
report.push('  ↓');
report.push('最小の具体例・反例');
report.push('  ↓');
report.push('定義・定理');
report.push('  ↓');
report.push('証明の見取り図（本文に表示）');
report.push('  ↓');
report.push('完全証明（折りたたみ）');
report.push('  ↓');
report.push('何が分かったか / 何に使うか');
report.push('  ↓');
report.push('その場で使う例・演習');
report.push('```');
report.push('');
report.push('完全証明は削除しません。ただし、証明を読まないと「その定理が何を言っているか」「なぜ欲しいか」「どう使うか」が分からない構成は教材監査NGです。');
report.push('');
report.push('## 機械スクリーニング結果');
report.push('');
report.push(`- 証明を持つページ: **${rows.length}**`);
report.push(`- P0候補: **${counts.P0 || 0}**`);
report.push(`- P1候補: **${counts.P1 || 0}**`);
report.push(`- P2候補: **${counts.P2 || 0}**`);
report.push(`- WATCH: **${counts.WATCH || 0}**`);
report.push('');
report.push('| 優先 | 講義 | 証明 | 例 | 直感/意味 | 演習 | 証明比 | 機械警告 |');
report.push('|---|---|---:|---:|---:|---:|---:|---|');
for (const row of rows) {
  const title = row.title.replaceAll('|', '\\|');
  const link = `[${title}](${row.path.replace(/^textbook\//, '')})`;
  report.push(`| ${row.status} | ${link} | ${row.proofs} | ${row.examples} | ${row.intuition} | ${row.exercises} | ${Math.round(row.proofLinesRatio * 100)}% | ${row.reasons} |`);
}
report.push('');
report.push('## 人手レビュー時の判定');
report.push('');
report.push('- **FIX-NARRATIVE**: 証明の前に動機・具体例・直感を追加し、証明後に使い道を回収する。');
report.push('- **FIX-EXAMPLE**: 定理が抽象的なままなので、数値・低次元・有限集合など最小例を追加する。');
report.push('- **FIX-ORDER**: 定義・定理・証明の順序は正しいが、教材としては一般論が先行しすぎている。具体例から一般化する順へ組み替える。');
report.push('- **OK**: 証明を閉じたままでも本文だけで学習サイクルが成立する。');
report.push('');
report.push('## CIとの役割分担');
report.push('');
report.push('`npm run validate:proof-folding` は、本文中の明示的な「証明」節が `<!-- proof-start -->` / `<!-- proof-end -->` の外へ露出していないこと、マーカーが対応していること、Pages側に折りたたみレンダラが存在することを**ブロッキング検証**します。');
report.push('');
report.push('一方、この監査のP0/P1/P2判定は文章の質を完全には機械判定できないため、`npm run audit:proof-pedagogy` で非ブロッキングのレビュー候補を出します。');
report.push('');

const output = report.join('\n');
console.log(output);
if (writePath) {
  fs.mkdirSync(path.dirname(path.resolve(writePath)), { recursive: true });
  fs.writeFileSync(path.resolve(writePath), `${output}\n`);
  console.error(`Wrote proof pedagogy audit to ${writePath}`);
}
