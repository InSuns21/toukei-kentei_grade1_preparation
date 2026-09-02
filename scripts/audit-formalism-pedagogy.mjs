import fs from 'node:fs';
import path from 'node:path';

const ROOT = path.resolve('textbook/volumes/00_foundations');
const args = process.argv.slice(2);
const writeIndex = args.indexOf('--write');
const writePath = writeIndex >= 0 ? args[writeIndex + 1] : null;

function walk(dir) {
  const out = [];
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) out.push(...walk(full));
    else if (entry.isFile() && entry.name === 'index.md') out.push(full);
  }
  return out;
}

function normalizeTitle(title) {
  return title.replace(/[`*_]/g, '').replace(/<[^>]+>/g, '').trim();
}

function headingInfo(line) {
  const m = /^(#{1,6})\s+(.+?)\s*$/.exec(line);
  if (!m) return null;
  return { level: m[1].length, title: normalizeTitle(m[2]) };
}

function stripSolutions(lines) {
  const out = [];
  let depth = 0;
  for (const line of lines) {
    if (line.trim() === '<!-- solution-start -->') { depth += 1; continue; }
    if (line.trim() === '<!-- solution-end -->') { depth = Math.max(0, depth - 1); continue; }
    if (depth === 0) out.push(line);
  }
  return out;
}

function countMathLines(lines) {
  let inDisplay = false;
  let count = 0;
  for (const line of lines) {
    const trimmed = line.trim();
    if (trimmed === '$$') { inDisplay = !inDisplay; continue; }
    if (inDisplay && trimmed) count += 1;
    else if (/^\$\$.+\$\$$/.test(trimmed)) count += 1;
  }
  return count;
}

function countProofLines(lines) {
  let depth = 0;
  let count = 0;
  for (const line of lines) {
    const t = line.trim();
    if (t === '<!-- proof-start -->') { depth += 1; continue; }
    if (t === '<!-- proof-end -->') { depth = Math.max(0, depth - 1); continue; }
    if (depth > 0 && t) count += 1;
  }
  return count;
}

function outsideProofLines(lines) {
  let depth = 0;
  const out = [];
  for (const line of lines) {
    const t = line.trim();
    if (t === '<!-- proof-start -->') { depth += 1; continue; }
    if (t === '<!-- proof-end -->') { depth = Math.max(0, depth - 1); continue; }
    if (depth === 0) out.push(line);
  }
  return out;
}

function classify(row) {
  let score = 0;
  const reasons = [];

  if (row.unfoldedProofEnds > 0) {
    score += 4;
    reasons.push(`折りたたみ外の証明完了表現${row.unfoldedProofEnds}件`);
  }
  if (row.proofDetailHeadings > 0 && row.proofBlocks === 0) {
    score += 2;
    reasons.push(`詳細証明らしい見出し${row.proofDetailHeadings}件・proof block 0`);
  }
  if (row.formalStatements >= 6) {
    score += 3;
    reasons.push(`定理・命題等${row.formalStatements}件`);
  } else if (row.formalStatements >= 3) {
    score += 2;
    reasons.push(`定理・命題等${row.formalStatements}件`);
  } else if (row.formalStatements >= 1) {
    score += 1;
  }
  if (row.reasoningHits >= 14) {
    score += 2;
    reasons.push(`証明語密度高(${row.reasoningHits})`);
  } else if (row.reasoningHits >= 8) {
    score += 1;
  }
  if (row.mathRatio >= 0.45) {
    score += 2;
    reasons.push(`数式行約${Math.round(row.mathRatio * 100)}%`);
  } else if (row.mathRatio >= 0.30) {
    score += 1;
  }
  if (row.examples === 0) {
    score += 2;
    reasons.push('例見出し0');
  } else if (row.formalStatements >= 3 && row.examples < Math.ceil(row.formalStatements / 3)) {
    score += 1;
    reasons.push(`例${row.examples}件`);
  }
  if (row.intuition === 0) {
    score += 1;
    reasons.push('直感・意味・見取り図見出し0');
  }
  if (row.exercises === 0) {
    score += 1;
    reasons.push('演習見出し0');
  }

  let status = 'WATCH';
  if (score >= 9) status = 'P0';
  else if (score >= 6) status = 'P1';
  else if (score >= 4) status = 'P2';
  return { score, status, reasons: reasons.join('、') || '大きな機械警告なし' };
}

const rows = [];
for (const file of walk(ROOT)) {
  const raw = fs.readFileSync(file, 'utf8');
  const allLines = raw.split(/\r?\n/);
  const lines = stripSolutions(allLines);
  const outside = outsideProofLines(lines);
  const hs = lines.map(headingInfo).filter(Boolean);
  const outsideHs = outside.map(headingInfo).filter(Boolean);
  const firstH1 = hs.find((h) => h.level === 1)?.title ?? path.basename(path.dirname(file));

  const formalHeadingCount = hs.filter((h) => /(定理|命題|補題|系(?:[：:(（]|$)|theorem|lemma|proposition|corollary)/iu.test(h.title)).length;
  const formalLabelCount = lines.filter((line) => /^\s*>?\s*\*\*(?:定理|命題|補題|系)(?:[（(：:].*)?\*\*/u.test(line)).length;
  const formalStatements = formalHeadingCount + formalLabelCount;
  const definitions = hs.filter((h) => /定義/u.test(h.title)).length + lines.filter((line) => /^\s*>?\s*\*\*定義(?:[（(：:].*)?\*\*/u.test(line)).length;
  const examples = hs.filter((h) => /(?:具体例|数値例|反例|例題|ケース|例\d*|例$)/u.test(h.title)).length;
  const intuition = hs.filter((h) => /(直感|意味|なぜ|イメージ|位置付け|見取り図|考え方|何がうれしい|モチベーション|問い|まず)/u.test(h.title)).length;
  const exercises = hs.filter((h) => /(演習|問題|ドリル)/u.test(h.title)).length;
  const proofBlocks = lines.filter((line) => line.trim() === '<!-- proof-start -->').length;
  const proofRoadmaps = outsideHs.filter((h) => /証明.*(?:見取り図|骨格|流れ|アイデア|考え方|概略|スケッチ)/u.test(h.title)).length;
  const proofDetailHeadings = outsideHs.filter((h) => {
    if (/証明.*(?:見取り図|骨格|流れ|アイデア|考え方|概略|スケッチ)/u.test(h.title)) return false;
    return /証明(?:[:：]|$)|完全証明|証明の核心|証明詳細|証明を完成|Zornの補題で極大|極大延長/u.test(h.title);
  }).length;
  const unfoldedProofEnds = outside.filter((line) => /(?:これで|以上で|よって).{0,30}(?:証明されました|証明が完成|証明できました|証明した|示されました)|\\square|□/u.test(line)).length;
  const reasoningHits = outside.filter((line) => /(したがって|従って|よって|背理法|仮定し|任意の.+に対して|示します|示せます|示すため|極大性に反|上界です|矛盾します)/u.test(line)).length;
  const nonblank = lines.filter((line) => line.trim()).length || 1;
  const mathLines = countMathLines(lines);
  const proofLines = countProofLines(lines);
  const mathRatio = mathLines / nonblank;
  const proofRatio = proofLines / nonblank;

  const row = {
    path: path.relative(process.cwd(), file).replaceAll(path.sep, '/'),
    title: firstH1,
    formalStatements,
    definitions,
    examples,
    intuition,
    exercises,
    proofBlocks,
    proofRoadmaps,
    proofDetailHeadings,
    unfoldedProofEnds,
    reasoningHits,
    mathRatio,
    proofRatio
  };

  if (formalStatements === 0 && proofDetailHeadings === 0 && unfoldedProofEnds === 0 && reasoningHits < 8) continue;
  Object.assign(row, classify(row));
  rows.push(row);
}

rows.sort((a, b) => b.score - a.score || b.unfoldedProofEnds - a.unfoldedProofEnds || b.reasoningHits - a.reasoningHits || a.path.localeCompare(b.path, 'ja'));
const counts = rows.reduce((acc, row) => {
  acc[row.status] = (acc[row.status] || 0) + 1;
  return acc;
}, {});

const report = [];
report.push('# DREAM THEATER 形式偏重・隠れ証明 教材導線監査');
report.push('');
report.push('既存の `audit:proof-pedagogy` は明示的な `proof-start/proof-end` を持つページを中心に見る。第2監査では対象を広げ、**証明マーカーがなくても、定理・導出・証明語が連続して「実質的に証明本文」になっているページ**を抽出する。');
report.push('');
report.push('特に、完全証明なのに「証明」という見出しを付けず通常本文へ展開すると、proof-folding CIを形式上すり抜けられる。この監査ではその抜け道を `折りたたみ外の証明完了表現` と `詳細証明らしい見出し` で検出候補にする。');
report.push('');
report.push('## 監査基準');
report.push('');
report.push('- 数えるもの：定理・命題・補題・系、証明語、数式密度、例・反例、直感/意味/見取り図、演習。');
report.push('- `証明の見取り図 / 骨格 / アイデア / 概略` は本文に残すべきなので、それ自体は折りたたみ違反とみなさない。');
report.push('- `3. 証明：...` のような節番号付き見出しも完全証明候補として数える。');
report.push('- 一方、`これで…証明されました` などが proof block 外にある場合は、実質的な完全証明が通常本文へ露出している強い候補とみなす。');
report.push('- P0/P1/P2 は機械スクリーニング。本文を人手で読んで FIX-FOLD / FIX-NARRATIVE / FIX-EXAMPLE / OK を確定する。');
report.push('');
report.push('## 機械スクリーニング結果');
report.push('');
report.push(`- 対象ページ: **${rows.length}**`);
report.push(`- P0候補: **${counts.P0 || 0}**`);
report.push(`- P1候補: **${counts.P1 || 0}**`);
report.push(`- P2候補: **${counts.P2 || 0}**`);
report.push(`- WATCH: **${counts.WATCH || 0}**`);
report.push('');
report.push('| 優先 | 講義 | 定理等 | 例 | 直感 | 演習 | proof | 証明完了語 | 証明語 | 数式比 | 警告 |');
report.push('|---|---|---:|---:|---:|---:|---:|---:|---:|---:|---|');
for (const row of rows) {
  const title = row.title.replaceAll('|', '\\|');
  const link = `[${title}](${row.path.replace(/^textbook\//, '')})`;
  report.push(`| ${row.status} | ${link} | ${row.formalStatements} | ${row.examples} | ${row.intuition} | ${row.exercises} | ${row.proofBlocks} | ${row.unfoldedProofEnds} | ${row.reasoningHits} | ${Math.round(row.mathRatio * 100)}% | ${row.reasons} |`);
}
report.push('');
report.push('## 人手判定ラベル');
report.push('');
report.push('- **FIX-FOLD**: 実質的な完全証明が通常本文へ露出。見取り図は残し、完全証明を proof block へ移す。');
report.push('- **FIX-NARRATIVE**: 定理・導出の前後に問題意識、最小例、意味、使い道が不足。');
report.push('- **FIX-EXAMPLE**: 抽象一般論が先行し、低次元・有限集合・数値例が不足。');
report.push('- **OK-BLACKBOX**: 高度な定理を意図的に黒箱化し、理由と依存先が明記されている。');
report.push('- **OK**: 証明を後回しにしても本文だけで学習サイクルが成立。');
report.push('');
report.push('## CIとの役割分担');
report.push('');
report.push('この監査自体は文章品質のヒューリスティックなので非ブロッキングとする。ただし、人手確認で FIX-FOLD と確定したパターンは `validate:proof-folding` 側へ一般化し、将来の再発をブロックする。');
report.push('');

report.push('## 2026-09-02 人手監査 round 3');
report.push('');
report.push('機械上位候補を本文まで読み、スコアだけでは区別できない「本当に折りたたむべき完全証明」と「導出が多いだけの教材」を分離した。');
report.push('');
report.push('| 講義 | 人手判定 | 対応 |');
report.push('|---|---|---|');
report.push('| F0-02C6 Hahn--Banach | **FIX-FOLD** | 一次元延長 → extension poset → chain上界 → Zorn → 全空間、の完全証明を折りたたむ。見取り図は本文に残す。 |');
report.push('| F0-02C1A Hilbert射影定理 | **FIX-FOLD** | 最小化列 → Cauchy → 完備性 → 閉性 → 一意性、の完全証明を折りたたむ。 |');
report.push('| F0-00WK2 Lax--Milgram | **FIX-FOLD** | Rieszで作用素化 → coercivity → 単射/閉range → 稠密 → 全射 → 安定性、を一つの完全証明として折りたたむ。 |');
report.push('| F0-02C7A representer theorem | **FIX-FOLD** | `3. 証明：...` が従来CIをすり抜けていた。representer theoremの証明だけ折りたたみ、kernel SVMの導出は本文に残す。 |');
report.push('| F0-00P5 強大数則 | **FIX-FOLD** | 最大不等式 → dyadic化 → Borel--Cantelli → gap filling の完全証明を折りたたむ。冒頭/章末の証明地図は残す。 |');
report.push('| F0-00E2 Cauchy--Schwarz | **FIX-FOLD** | Cauchy--Schwarzと等号条件の完全証明を折りたたむ。三角不等式・Bessel・Parsevalの意味付けは本文に残す。 |');
report.push('| F0-02C2 Riesz表現 | **FIX-FOLD** | kernelへの射影を使うRiesz表現の完全証明を折りたたむ。有限次元・積分・評価汎関数の具体例は本文に残す。 |');
report.push('| F0-02B 分離/Farkas | **FIX-FOLD + FIX-EXAMPLE** | 最近点 → 分離 → 錐分離 → Farkas が長い証明鎖。次ラウンドで低次元例を先に置き、技術証明を分割して折りたたむ。 |');
report.push('| F0-00D5 Vitali | **FIX-FOLD** | 問いと構成は良いが、章全体が非可測性の完全証明。構成の地図を残し詳細な排反・被覆・2ケース矛盾を折りたたむ。 |');
report.push('| F0-00SP3 Brown運動 | **OK / FIX-EXERCISE** | 共分散・martingale・二次変分の計算は説明的導出。存在定理は意図的に黒箱化済み。証明偏重ではない。 |');
report.push('| F0-00D4 Lebesgue測度 | **OK-PROOF-TODO / FIX-EXERCISE** | 構成の導線は良い。未完の完全証明は別のproof audit TODOとして管理されており、現状を「完全証明」と誤認して折りたたまない。 |');
report.push('| F0-00TS2 Herglotz | **OK-BLACKBOX / FIX-EXERCISE** | Herglotzの完全証明を意図的に黒箱化し、white noise・line spectrum・periodogramへ応用している。 |');
report.push('| F0-00FA2 Fourier変換 | **OK / FIX-EXERCISE** | 畳み込み・微分・PDEへの導出は教材本体。Riemann--Lebesgueは黒箱であることを明示済み。 |');
report.push('| F0-00P7A MLE漸近論 | **FIX-EXAMPLE** | consistency + score CLT + Hessian LLN + Taylor + Slutsky の導線は良い。Bernoulli/正規など具体モデルを追加する余地がある。 |');
report.push('');
report.push('### CIへ昇格する事項');
report.push('');
report.push('今回、人手で `FIX-FOLD` と確認したページから二つの再発パターンが確定した。');
report.push('');
report.push('1. `## 3. 証明：...`、`## 4. 最大不等式の証明` のような **節番号付き証明見出し**。');
report.push('2. 見出しを証明と呼ばず本文を続け、最後だけ `これで...証明されました` とする **隠れ完全証明**。');
report.push('');
report.push('これらは文章品質の曖昧なスコアではなく、完全証明の折りたたみ規約そのものなので `validate:proof-folding` のブロッキング対象へ昇格する。');
report.push('');

const output = report.join('\n');
console.log(output);
if (writePath) {
  fs.mkdirSync(path.dirname(path.resolve(writePath)), { recursive: true });
  fs.writeFileSync(path.resolve(writePath), `${output}\n`);
  console.error(`Wrote formalism pedagogy audit to ${writePath}`);
}
