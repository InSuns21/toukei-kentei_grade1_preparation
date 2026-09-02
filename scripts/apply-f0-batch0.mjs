import fs from 'node:fs';

function replaceOnce(path, oldText, newText, marker) {
  let text = fs.readFileSync(path, 'utf8');
  if (text.includes(marker)) {
    console.log(`skip ${path}: already applied (${marker})`);
    return;
  }
  const i = text.indexOf(oldText);
  if (i < 0) throw new Error(`target not found in ${path}: ${oldText.slice(0, 80)}`);
  text = text.slice(0, i) + newText + text.slice(i + oldText.length);
  fs.writeFileSync(path, text);
  console.log(`updated ${path}`);
}

const f000 = 'textbook/volumes/00_foundations/F0_00_統計検定1級のための数学速習/index.md';
replaceOnce(
  f000,
  '## 1. この章で扱う数学\n\n| 分野 | 主な内容 | 主な接続先 |',
  '## 1. この章で扱う数学\n\n> **先取りラベルについて**  \n> この節の一覧には、ヘッセ行列・ラグランジュ未定乗数法・正定値性・射影行列・Schur complementなど、**後続節や後続補講で定義する概念名**も含みます。ここでは「このあと何が出てくるか」を見渡すためのラベルであり、この時点で定義や性質を覚えている必要はありません。本文では、実際に使う前に順に定義します。\n\n| 分野 | 主な内容 | 主な接続先 |',
  '先取りラベルについて'
);

const a = 'textbook/volumes/00_foundations/F0_00A_集合_写像_上限下限/index.md';
replaceOnce(
  a,
  'のような式が出たとき、記号の解読で止まらない状態を作ります。\n\n---',
  'のような式が出たとき、記号の解読で止まらない状態を作ります。\n\n> **この章に出る後続記法について**  \n> $X^*$、normal cone $N_C(x)$、row full rank、constraint qualification などは、後の関数解析・最適化で正式に定義する**予告語**です。この章では集合式の「読み方」を示すために姿だけ先に見せます。定義前の性質を使って推論することはありません。\n\n---',
  'この章に出る後続記法について'
);

const d2 = 'textbook/volumes/00_foundations/F0_00D2_測度_可測関数_Lebesgue積分_Lp/index.md';
replaceOnce(
  d2,
  'を、未定義語のまま使わないための橋です。\n\n---',
  'を、未定義語のまま使わないための橋です。\n\n> **標準ルートと完全基礎論ルート**  \n> この章では、標準ルートの読者のために **Lebesgue測度の存在と基本性質を既知の定理として受け入れます**。一方、「区間の長さからLebesgue測度が本当に作れることまで証明したい」場合は、D3「外測度・Carathéodory可測性」→ D4「Lebesgue測度・Borel集合・拡張定理」へ進んでください。つまりD2は積分論を使える形にする章、D3/D4はその測度を構成する章です。\n\n---',
  '標準ルートと完全基礎論ルート'
);

replaceOnce(
  d2,
  '補集合と可算和で閉じているため、可算共通部分や集合差も扱えます。\n\n---\n\n## 3. 測度：集合の大きさを測る',
  '補集合と可算和で閉じているため、可算共通部分や集合差も扱えます。\n\n### 2.1 Borel σ代数\n\n実数直線 $\\mathbb R$ で最も基本的なσ代数が **Borel σ代数** です。\n\n$$\n\\boxed{\n\\mathcal B(\\mathbb R)\n:=\n\\sigma(\\{G\\subset\\mathbb R:G\\text{ は開集合}\\})\n}\n$$\n\nここで $\\sigma(\\mathcal C)$ は、集合族 $\\mathcal C$ を含む最小のσ代数を表します。したがって $\\mathcal B(\\mathbb R)$ は、開集合から補集合・可算和などを繰り返して作られる集合をすべて含みます。\n\n連続関数 $f:\\mathbb R\\to\\mathbb R$ が **Borel可測** である、とは\n\n$$\nf^{-1}(B)\\in\\mathcal B(\\mathbb R)\n\\qquad(\\forall B\\in\\mathcal B(\\mathbb R))\n$$\n\nという意味です。後のD4で、Borel σ代数とLebesgue可測集合族の関係を詳しく扱います。\n\n---\n\n## 3. 測度：集合の大きさを測る',
  '### 2.1 Borel σ代数'
);

replaceOnce(
  d2,
  '## 14. TonelliとFubini\n\n二変数関数 $f(x,y)$ を考えます。',
  '## 14. TonelliとFubini\n\nTonelli/Fubiniでは二つの測度空間を同時に扱うため、先に積空間の記法を定義します。\n\n### 14.0 積σ代数と積測度\n\n可測空間 $(X,\\mathcal A)$ と $(Y,\\mathcal B)$ に対して、長方形 $A\\times B$ から生成されるσ代数\n\n$$\n\\boxed{\n\\mathcal A\\otimes\\mathcal B\n=\n\\sigma\\{A\\times B:A\\in\\mathcal A,\\ B\\in\\mathcal B\\}\n}\n$$\n\nを **積σ代数** といいます。\n\n測度空間 $(X,\\mathcal A,\\mu)$、$(Y,\\mathcal B,\\nu)$ がσ有限なら、積σ代数上に積測度 $\\mu\\times\\nu$ が一意に存在し、可測長方形について\n\n$$\n\\boxed{\n(\\mu\\times\\nu)(A\\times B)=\\mu(A)\\nu(B)\n}\n$$\n\nを満たします。積測度の存在一意性そのものの証明は後続の証明補完対象ですが、**ここから先の $\\mu\\times\\nu$ はこの測度を指す**と固定します。\n\n二変数関数 $f(x,y)$ を考えます。',
  '### 14.0 積σ代数と積測度'
);

const c1 = 'textbook/volumes/00_foundations/F0_02C1_ノルム空間_Banach_Hilbert/index.md';
replaceOnce(
  c1,
  'さらにsupノルムのCauchy性から収束は一様で、連続関数の一様極限は連続です。\n\nしたがって $f\\in C([0,1])$ であり、極限が空間の外へ逃げません。',
  'さらにsupノルムのCauchy性から収束は一様です。ここで「連続関数の一様極限は連続」を短く確認します。\n\n$t_0\\in[0,1]$ と $\\varepsilon>0$ を固定します。一様収束より、十分大きい $N$ を取れば\n\n$$\n\\|f-f_N\\|_\\infty<\\frac{\\varepsilon}{3}.\n$$\n\n$f_N$ は連続なので、ある $\\delta>0$ が存在して $|t-t_0|<\\delta$ なら\n\n$$\n|f_N(t)-f_N(t_0)|<\\frac{\\varepsilon}{3}.\n$$\n\nしたがって三角不等式から\n\n$$\n\\begin{aligned}\n|f(t)-f(t_0)|\n&\\le |f(t)-f_N(t)|+|f_N(t)-f_N(t_0)|+|f_N(t_0)-f(t_0)|\\\\\n&<\\varepsilon.\n\\end{aligned}\n$$\n\nよって $f$ は $t_0$ で連続であり、$t_0$ は任意だったので $f\\in C([0,1])$ です。つまり極限が空間の外へ逃げません。',
  'ここで「連続関数の一様極限は連続」を短く確認します'
);

const audit = 'textbook/f0-dream-theater-proof-audit.md';
let auditText = fs.readFileSync(audit, 'utf8');
for (const id of ['TODO-P0-F000-01', 'TODO-P0-A-01', 'TODO-P0-D2-01', 'TODO-P0-D2-02', 'TODO-P0-D2-03', 'TODO-P0-C1-01']) {
  auditText = auditText.replace(`### ${id}`, `### ${id.replace('TODO-', 'DONE-')} ✅`);
}
fs.writeFileSync(audit, auditText);
console.log('updated audit P0 status');
