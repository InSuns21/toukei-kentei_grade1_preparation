import fs from 'node:fs';
import { execFileSync } from 'node:child_process';

function replaceRequired(source, from, to, label) {
  if (!source.includes(from)) throw new Error(`replacement point not found: ${label}`);
  return source.replace(from, to);
}

function extractFormal(source, anchor) {
  const start = source.indexOf(anchor);
  if (start < 0) throw new Error(`formal anchor not found: ${anchor}`);
  const marker = '<!-- formal-statement-end -->';
  const end0 = source.indexOf(marker, start);
  if (end0 < 0) throw new Error(`formal end not found: ${anchor}`);
  let end = end0 + marker.length;
  while (source[end] === '\n') end += 1;
  return { block: source.slice(start, end), source: source.slice(0, start) + source.slice(end) };
}

function insertBeforeNextProofAfterLemma(source, lemmaAnchor, block) {
  const lemma = source.indexOf(lemmaAnchor);
  if (lemma < 0) throw new Error(`lemma anchor not found: ${lemmaAnchor}`);
  const proofEndMarker = '<!-- proof-end -->';
  const proofEnd = source.indexOf(proofEndMarker, lemma);
  if (proofEnd < 0) throw new Error(`lemma proof end not found: ${lemmaAnchor}`);
  const nextProof = source.indexOf('<!-- proof-start -->', proofEnd + proofEndMarker.length);
  if (nextProof < 0) throw new Error(`following theorem proof not found: ${lemmaAnchor}`);
  return source.slice(0, nextProof) + block + '\n' + source.slice(nextProof);
}

const top1Path = 'textbook/volumes/00_foundations/TOP1/index.md';
let top1 = fs.readFileSync(top1Path, 'utf8');
top1 = replaceRequired(
  top1,
  '近傍・部分空間・収束・連続写像まで導入しました。',
  '近傍・部分空間・収束・位相空間での連続性まで導入しました。',
  'TOP1 intro continuity wording'
);
top1 = replaceRequired(
  top1,
  'この二問から、基底・部分基底、initial topology、積位相、final topology、商位相が一つの流れで出てきます。',
  'この二問から、位相を生成する集合族、initial topology、積位相、final topology、商位相が一つの流れで出てきます。',
  'TOP1 intro basis wording'
);
top1 = replaceRequired(
  top1,
  '## 1. 基底：開集合を局所的な部品から作る',
  '## 1. 開集合を局所的な部品から作る',
  'TOP1 basis heading'
);
top1 = replaceRequired(
  top1,
  `実際、右辺は $\\mathcal S$ を含む全ての位相に含まれる集合だけを残すので、上の最小性と一致します。共通部分が位相であることも、各位相公理を成分ごとに確認すれば分かります。`,
  `まず $\\rho=\\bigcap_{\\sigma\\in\\mathfrak T}\\sigma$ と置きます。全ての $\\sigma\\in\\mathfrak T$ が位相なので $\\varnothing,X$ は各 $\\sigma$ に属し、従って $\\varnothing,X\\in\\rho$ です。さらに $U_\\lambda\\in\\rho$ なら全ての $\\sigma$ に $U_\\lambda\\in\\sigma$ なので、各 $\\sigma$ の任意和閉性から $\\bigcup_\\lambda U_\\lambda\\in\\sigma$、従って $\\bigcup_\\lambda U_\\lambda\\in\\rho$ です。有限交差も同様に、$U_1,\\dots,U_m\\in\\rho$ なら各 $\\sigma$ で $U_1\\cap\\cdots\\cap U_m$ が開だから、その交差は $\\rho$ に属します。よって $\\rho$ は位相です。\n\nまた各 $S\\in\\mathcal S$ は全ての $\\sigma\\in\\mathfrak T$ に属するので $\\mathcal S\\subseteq\\rho$ です。したがって生成位相の最小性から $\\tau(\\mathcal S)\\subseteq\\rho$。逆に $\\tau(\\mathcal S)$ 自身が $\\mathfrak T$ の一員なので、共通部分の定義から $\\rho\\subseteq\\tau(\\mathcal S)$。従って両者は等しいです。`,
  'TOP1 intersection-of-topologies proof'
);
top1 = replaceRequired(
  top1,
  '> **命題（開な飽和集合の像は商空間で開）**',
  '> **命題（開な飽和集合の像は商位相で開）**',
  'TOP1 saturated proposition title'
);
top1 = top1.replaceAll('標準射影', '自然な全射');
top1 = top1.replaceAll('商空間', '商位相空間');
top1 = replaceRequired(
  top1,
  `のように0と1を同時に十分含む集合でも、他の同値類は単点なので、適切な $\\varepsilon$ のもとで飽和性を直接確認できます。`,
  `とします。任意の $\\varepsilon>0$ について $A'$ は0と1をともに含み、その他の同値類は単点なので\n$$\nq^{-1}(q(A'))=A'.\n$$\n従って $A'$ は飽和しています。`,
  'TOP1 saturated epsilon wording'
);
top1 = replaceRequired(
  top1,
  `なら、$\\tau_1$ の方が **粗い**、$\\tau_2$ の方が **細かい** といいます。`,
  `という包含では、$\\tau_1$ を **粗い側**、$\\tau_2$ を **細かい側** と読みます。ここで比較しているのは開集合族の包含そのものです。`,
  'TOP1 coarse/fine implicit formal wording'
);

const top1Before = (top1.match(/^\$$/gm) ?? []).length;
top1 = top1.replace(/^\$$/gm, '$$$$');
fs.writeFileSync(top1Path, top1);
console.log(`${top1Path}: normalized ${top1Before} standalone display delimiters`);

const la4Path = 'textbook/volumes/00_foundations/LA4/index.md';
let la4 = fs.readFileSync(la4Path, 'utf8');
const la4Before = (la4.match(/^\$$/gm) ?? []).length;
la4 = la4.replace(/^\$$/gm, '$$$$');

// The knowledge DAG records these dependencies, so the prose order should too.
{
  const moved = extractFormal(la4, '<a id="thm-la4-cayley-hamilton"></a>');
  la4 = insertBeforeNextProofAfterLemma(moved.source, '<a id="lem-la4-adjugate-identity"></a>', moved.block);
}
{
  const moved = extractFormal(la4, '<a id="thm-la4-generalized-decomposition"></a>');
  la4 = insertBeforeNextProofAfterLemma(moved.source, '<a id="lem-la4-coprime-product-divisibility"></a>', moved.block);
}
fs.writeFileSync(la4Path, la4);
console.log(`${la4Path}: normalized ${la4Before} standalone display delimiters and reordered helper lemmas`);

const chapterPath = 'textbook/volumes/00_foundations/TOP1/chapter.yaml';
let chapter = fs.readFileSync(chapterPath, 'utf8');
chapter = chapter.replaceAll('開な飽和集合の像は商空間で開', '開な飽和集合の像は商位相で開');
fs.writeFileSync(chapterPath, chapter);

for (const temp of [
  'scripts/fix-topology-math-delimiters.mjs',
  '.github/workflows/fix-topology-math-delimiters.yml',
  'scripts/refine-top1-proof-detail.mjs'
]) {
  if (fs.existsSync(temp)) fs.unlinkSync(temp);
}

execFileSync('git', ['config', 'user.name', 'github-actions[bot]']);
execFileSync('git', ['config', 'user.email', '41898282+github-actions[bot]@users.noreply.github.com']);
execFileSync('git', ['add', '-A']);
execFileSync('git', ['commit', '-m', 'fix: align TOP1 and LA4 with strict validators'], { stdio: 'inherit' });

for (const [cmd, args] of [
  ['npm', ['run', 'validate:math']],
  ['npm', ['run', 'validate:dream-theater-concepts:changed']],
  ['npm', ['run', 'validate:proof-folding']],
  ['npm', ['run', 'validate:formal-statements']],
  ['npm', ['run', 'validate:definition-examples']],
  ['npm', ['run', 'validate:named-formals']]
]) {
  execFileSync(cmd, args, { stdio: 'inherit' });
}

execFileSync('git', ['push', 'origin', 'HEAD:feature/dream-theater-topology-core'], { stdio: 'inherit' });
