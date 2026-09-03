import fs from 'node:fs';

function replaceOnce(file, from, to) {
  let s = fs.readFileSync(file, 'utf8');
  const n = s.split(from).length - 1;
  if (n !== 1) throw new Error(`${file}: expected 1 match, found ${n}: ${from.slice(0, 120)}`);
  s = s.replace(from, () => to);
  fs.writeFileSync(file, s);
}

const b = 'textbook/volumes/00_foundations/F0_00B_距離空間_開集合_閉集合_収束/index.md';
replaceOnce(b,
`さらに任意の集合 $X$ 上で

$$
d(x,y)=
\\begin{cases}
0,&x=y,\\\\
1,&x\\ne y
\\end{cases}
$$

と置くと距離になります。これを **離散距離** といいます。`,
`さらに任意の集合 $X$ 上で次の距離を入れられます。

<a id="def-f0-00b-discrete-metric"></a>

<!-- formal-statement-start -->
> **定義（離散距離）**  
> 集合 $X$ 上で

$$
d(x,y)=
\\begin{cases}
0,&x=y,\\\\
1,&x\\ne y
\\end{cases}
$$

> と定めた距離を **離散距離** といいます。
<!-- formal-statement-end -->`);

const c1 = 'textbook/volumes/00_foundations/F0_00C1_コンパクト性_点列コンパクト性_Heine_Borel/index.md';
replaceOnce(c1,
`この節の完全証明は折りたたんだままでも構いません。以後使うのは主に「**距離空間では、コンパクト性を点列で判定してよい**」という結論です。

<!-- proof-start -->`,
`この節の完全証明は折りたたんだままでも構いません。以後使うのは主に「**距離空間では、コンパクト性を点列で判定してよい**」という結論です。

<a id="def-f0-00c1-totally-bounded"></a>

<!-- formal-statement-start -->
> **定義（全有界性）**  
> 距離空間 $(X,d)$ の部分集合 $K$ が **全有界** であるとは、任意の $\\varepsilon>0$ に対し有限個の点 $a_1,\\dots,a_m\\in K$ が存在して

$$
K\\subset\\bigcup_{j=1}^m B(a_j,\\varepsilon)
$$

> とできることをいいます。
<!-- formal-statement-end -->

<a id="def-f0-00c1-lebesgue-number"></a>

<!-- formal-statement-start -->
> **定義（Lebesgue数）**  
> $K$ の開被覆 $\\mathcal U$ に対し、$\\delta>0$ が、任意の $x\\in K$ について $B(x,\\delta)\\cap K$ が $\\mathcal U$ のある1要素に含まれるとき、$\\delta$ をこの被覆の **Lebesgue数** といいます。
<!-- formal-statement-end -->

この二つは、以下の逆向き証明で「点列から有限被覆へ戻る」ための中継概念です。

<!-- proof-start -->`);
replaceOnce(c1,
`となることを示します。この性質を **全有界性** と呼びます。`,
`となることを示します。これは上で定義した **全有界性** そのものです。`);
replaceOnce(c1,
`が $\\mathcal U$ のある1要素に含まれることを示します。この $\\delta$ を **Lebesgue数** と呼びます。`,
`が $\\mathcal U$ のある1要素に含まれることを示します。つまり、上で定義した **Lebesgue数** が存在することを示します。`);

const d3 = 'textbook/volumes/00_foundations/F0_00D3_外測度_Caratheodory可測性/index.md';
replaceOnce(d3,
`$A\\subset\\mathbb R$ に対して

$$
\\boxed{
\\lambda^*(A)
=
\\inf\\left\\{
\\sum_{n=1}^{\\infty}|I_n|:
A\\subset\\bigcup_{n=1}^{\\infty}I_n,
\\ I_n\\text{ は開区間}
\\right\\}
}
$$

と定めます。

これを **Lebesgue外測度** といいます。`,
`<a id="def-f0-00d3-lebesgue-outer-measure"></a>

<!-- formal-statement-start -->
> **定義（Lebesgue外測度）**  
> $A\\subset\\mathbb R$ に対して

$$
\\lambda^*(A)
=
\\inf\\left\\{
\\sum_{n=1}^{\\infty}|I_n|:
A\\subset\\bigcup_{n=1}^{\\infty}I_n,
\\ I_n\\text{ は開区間}
\\right\\}
$$

> と定めた量を **Lebesgue外測度** といいます。
<!-- formal-statement-end -->`);
replaceOnce(d3,
`一般に集合 $X$ の全ての部分集合に対して

$$
\\mu^*:2^X\\to[0,\\infty]
$$

が定義され、次を満たすとき **外測度** といいます。

### 5.1 空集合

$$
\\mu^*(\\varnothing)=0.
$$

### 5.2 単調性

$$
A\\subset B
\\quad\\Longrightarrow\\quad
\\mu^*(A)\\le\\mu^*(B).
$$

### 5.3 可算劣加法性

$$
\\boxed{
\\mu^*\\left(\\bigcup_{n=1}^{\\infty}A_n\\right)
\\le
\\sum_{n=1}^{\\infty}\\mu^*(A_n)
}
$$

です。`,
`<a id="def-f0-00d3-outer-measure"></a>

<!-- formal-statement-start -->
> **定義（外測度）**  
> 集合 $X$ の全ての部分集合上の関数 $\\mu^*:2^X\\to[0,\\infty]$ が、
> 1. $\\mu^*(\\varnothing)=0$、
> 2. $A\\subset B\\Rightarrow\\mu^*(A)\\le\\mu^*(B)$、
> 3. 任意の $A_1,A_2,\\dots\\subset X$ に対して

$$
\\mu^*\\left(\\bigcup_{n=1}^{\\infty}A_n\\right)
\\le
\\sum_{n=1}^{\\infty}\\mu^*(A_n)
$$

> を満たすとき、$\\mu^*$ を **外測度** といいます。
<!-- formal-statement-end -->

上の3条件を順に空集合・単調性・可算劣加法性と呼びます。`);
replaceOnce(d3,
`従って

$$
\\boxed{
N\\text{ が測度0なら、その任意の部分集合も可測}
}
$$

です。

これを測度の **完全性** といいます。`,
`従って、零集合の部分集合まで可測集合として取り込めます。

<a id="def-f0-00d3-complete-measure"></a>

<!-- formal-statement-start -->
> **定義（測度の完全性）**  
> 測度空間 $(X,\\mathcal M,\\mu)$ が **完全** であるとは、$N\\in\\mathcal M$ かつ $\\mu(N)=0$ なら、任意の部分集合 $A\\subset N$ も $A\\in\\mathcal M$ となることをいいます。このとき単調性から $\\mu(A)=0$ です。
<!-- formal-statement-end -->

Carathéodory構成で得られる測度はこの意味で完全です。`);

const d5 = 'textbook/volumes/00_foundations/F0_00D5_Vitali集合_非可測集合_選択公理/index.md';
replaceOnce(d5,
`$[0,1]$ の全ての同値類から、代表元をちょうど一つずつ選びます。

その代表元全体を

$$
V\\subset[0,1]
$$

とします。

つまり

$$
\\boxed{
\\text{各 }\\sim\\text{ 同値類と }V\\text{ の共通部分はちょうど1点}
}
$$

です。

これを **Vitali集合** といいます。`,
`$[0,1]$ の全ての同値類から、代表元をちょうど一つずつ選びます。

<a id="def-f0-00d5-vitali-set"></a>

<!-- formal-statement-start -->
> **定義（Vitali集合）**  
> 関係 $x\\sim y\\iff x-y\\in\\mathbb Q$ による $[0,1]$ の各同値類から代表元をちょうど一つずつ選び、その代表元全体を $V\\subset[0,1]$ としたものを **Vitali集合** といいます。すなわち、各 $\\sim$ 同値類と $V$ の共通部分はちょうど1点です。
<!-- formal-statement-end -->`);

const qmd = 'textbook/volumes/00_foundations/F0_00P7B_QMD_LAN/index.md';
replaceOnce(qmd,
`$\\theta\\in\\mathbb R^d$ で、あるscoreベクトル $s_\\theta\\in L^2(P_\\theta)^d$ が存在し

$$
\\int\\left(\\sqrt{p_{\\theta+h}}-\\sqrt{p_\\theta}-\\frac12h^Ts_\\theta\\sqrt{p_\\theta}\\right)^2d\\mu
=o(\\|h\\|^2)
$$

なら、モデルはθで **QMD** といいます。`,
`<a id="def-f0-00p7b-qmd"></a>

<!-- formal-statement-start -->
> **定義（Quadratic Mean Differentiability; QMD）**  
> $\\theta\\in\\mathbb R^d$ で、あるscoreベクトル $s_\\theta\\in L^2(P_\\theta)^d$ が存在して

$$
\\int\\left(\\sqrt{p_{\\theta+h}}-\\sqrt{p_\\theta}-\\frac12h^Ts_\\theta\\sqrt{p_\\theta}\\right)^2d\\mu
=o(\\|h\\|^2)
$$

> が成り立つとき、統計モデルは $\\theta$ で **Quadratic Mean Differentiable（QMD）** であるといいます。
<!-- formal-statement-end -->`);

const f0 = 'textbook/volumes/00_foundations/F0_00_統計検定1級のための数学速習/index.md';
replaceOnce(f0,
`集合 $A\\subset\\mathbb R$ を考えます。実数 $M$ が

$$
x\\le M\\qquad(\\forall x\\in A)
$$

を満たすとき、$M$ を $A$ の**上界**といいます。上界のうち最小のものを**上限**といい

$$
\\sup A
$$

と書きます。同様に、すべての $x\\in A$ に対し $m\\le x$ を満たす $m$ を下界といい、下界のうち最大のものを

$$
\\inf A
$$

と書きます。`,
`<a id="def-f0-00-upper-lower-bounds"></a>

<!-- formal-statement-start -->
> **定義（上界・下界・上限・下限）**  
> 集合 $A\\subset\\mathbb R$ に対し、実数 $M$ が $x\\le M$ を全ての $x\\in A$ で満たすとき $M$ を **上界** といいます。上界のうち最小のものを **上限** といい $\\sup A$ と書きます。同様に、$m\\le x$ を全ての $x\\in A$ で満たす $m$ を **下界** といい、下界のうち最大のものを **下限** といい $\\inf A$ と書きます。
<!-- formal-statement-end -->`);

const p101 = 'textbook/volumes/01_probability/P1_01_事象と確率/index.md';
replaceOnce(p101,
`公平な六面体さいころを1回投げるとします。起こり得る結果全体は

$$
\\Omega=\\{1,2,3,4,5,6\\}
$$

です。これを**標本空間**といいます。`,
`公平な六面体さいころを1回投げるとします。

<a id="def-p1-01-sample-space"></a>

<!-- formal-statement-start -->
> **定義（標本空間）**  
> 確率的な試行で起こり得る結果全体の集合を **標本空間** といい、通常 $\\Omega$ と書きます。
<!-- formal-statement-end -->

この例では

$$
\\Omega=\\{1,2,3,4,5,6\\}
$$

です。`);
replaceOnce(p101,
`事象列 $A_1,A_2,\\ldots$ に対し

$$
\\limsup_{n\\to\\infty}A_n
=
\\bigcap_{m=1}^{\\infty}
\\bigcup_{n=m}^{\\infty}A_n
$$

を**上極限事象**といいます。

ある標本点 $\\omega$ がこの集合に属するとは、どれだけ後ろから見始めても、その後に $A_n$ が少なくとも一度は起こることです。したがって

$$
\\omega\\in\\limsup A_n
$$

は「$\\omega$ では $A_n$ が無限回起こる」という意味です。

一方、

$$
\\liminf_{n\\to\\infty}A_n
=
\\bigcup_{m=1}^{\\infty}
\\bigcap_{n=m}^{\\infty}A_n
$$

を**下極限事象**といいます。`,
`<a id="def-p1-01-event-limsup-liminf"></a>

<!-- formal-statement-start -->
> **定義（上極限事象・下極限事象）**  
> 事象列 $A_1,A_2,\\ldots$ に対し

$$
\\limsup_{n\\to\\infty}A_n
=\\bigcap_{m=1}^{\\infty}\\bigcup_{n=m}^{\\infty}A_n,
\\qquad
\\liminf_{n\\to\\infty}A_n
=\\bigcup_{m=1}^{\\infty}\\bigcap_{n=m}^{\\infty}A_n
$$

> をそれぞれ **上極限事象**、**下極限事象** といいます。
<!-- formal-statement-end -->

上極限事象に標本点 $\\omega$ が属するとは、どれだけ後ろから見始めても、その後に $A_n$ が少なくとも一度は起こることです。したがって

$$
\\omega\\in\\limsup A_n
$$

は「$\\omega$ では $A_n$ が無限回起こる」という意味です。

一方、下極限事象は`);

const p102 = 'textbook/volumes/01_probability/P1_02_条件付き確率_独立_bayesの定理/index.md';
replaceOnce(p102,
`$A_1,\\ldots,A_m$ について、全ての2事象の組が独立であることを**対独立**といいます。

一方、**相互独立**では、任意の $r=2,\\ldots,m$ と相異なる添字 $i_1,\\ldots,i_r$ について

$$
P(A_{i_1}\\cap\\cdots\\cap A_{i_r})
=
\\prod_{j=1}^rP(A_{i_j})
$$

が必要です。`,
`<a id="def-p1-02-pairwise-mutual-independence"></a>

<!-- formal-statement-start -->
> **定義（対独立・相互独立）**  
> 事象 $A_1,\\ldots,A_m$ の全ての2事象の組が独立であるとき **対独立** といいます。さらに、任意の $r=2,\\ldots,m$ と相異なる添字 $i_1,\\ldots,i_r$ に対して

$$
P(A_{i_1}\\cap\\cdots\\cap A_{i_r})
=\\prod_{j=1}^rP(A_{i_j})
$$

> が成り立つとき **相互独立** といいます。
<!-- formal-statement-end -->`);

const p201 = 'textbook/volumes/01_probability/P2_01_確率変数_pmf_pdf_cdf/index.md';
replaceOnce(p201,
`確率変数が確率質量または確率密度を持つ値の範囲を、この章では**台**と呼びます。問題を解くときは、式だけでなく

$$
x\\in S
$$

のように台を先に書き、台の外では確率質量または確率密度を0とします。`,
`<a id="def-p2-01-support"></a>

<!-- formal-statement-start -->
> **定義（台：本章での用法）**  
> 確率変数が確率質量または確率密度を持つ値の範囲を、この章では **台** と呼びます。問題を解くときは $x\\in S$ のように範囲を先に明示し、その外では確率質量または確率密度を0とします。
<!-- formal-statement-end -->`);

const p202 = 'textbook/volumes/01_probability/P2_02_期待値_分散_共分散_母関数/index.md';
replaceOnce(p202,
`ここで $z$ を動かすと $E[X\\mid Z=z]$ も変わります。そこで

$$
m(z)=E[X\\mid Z=z]
$$

とおき、$z$ に実際の確率変数 $Z$ を代入した

$$
\\boxed{E[X\\mid Z]=m(Z)}
$$

を**条件付き期待値**と呼びます。したがって、$E[X\\mid Z=z]$ は $z$ を固定した数値ですが、$E[X\\mid Z]$ は一般には $Z$ の値によって変わる確率変数です。`,
`ここで $z$ を動かすと $E[X\\mid Z=z]$ も変わります。そこで $m(z)=E[X\\mid Z=z]$ とおきます。

<a id="def-p2-02-conditional-expectation"></a>

<!-- formal-statement-start -->
> **定義（条件付き期待値：離散的条件付け）**  
> $z$ に確率変数 $Z$ 自身を代入して得る確率変数

$$
E[X\\mid Z]=m(Z)
$$

> を **条件付き期待値** と呼びます。
<!-- formal-statement-end -->

したがって、$E[X\\mid Z=z]$ は $z$ を固定した数値ですが、$E[X\\mid Z]$ は一般には $Z$ の値によって変わる確率変数です。`);

const baseline = 'scripts/implicit-formal-baseline.txt';
const retire = new Set([
  ['textbook/volumes/00_foundations/F0_00B_距離空間_開集合_閉集合_収束/index.md','離散距離'].join('\t'),
  ['textbook/volumes/00_foundations/F0_00C1_コンパクト性_点列コンパクト性_Heine_Borel/index.md','Lebesgue数'].join('\t'),
  ['textbook/volumes/00_foundations/F0_00C1_コンパクト性_点列コンパクト性_Heine_Borel/index.md','全有界性'].join('\t'),
  ['textbook/volumes/00_foundations/F0_00D3_外測度_Caratheodory可測性/index.md','完全性'].join('\t'),
  ['textbook/volumes/00_foundations/F0_00D3_外測度_Caratheodory可測性/index.md','Lebesgue外測度'].join('\t'),
  ['textbook/volumes/00_foundations/F0_00D3_外測度_Caratheodory可測性/index.md','外測度'].join('\t'),
  ['textbook/volumes/00_foundations/F0_00D5_Vitali集合_非可測集合_選択公理/index.md','Vitali集合'].join('\t'),
  ['textbook/volumes/00_foundations/F0_00P7B_QMD_LAN/index.md','QMD'].join('\t'),
  ['textbook/volumes/00_foundations/F0_00_統計検定1級のための数学速習/index.md','上界'].join('\t'),
  ['textbook/volumes/01_probability/P1_01_事象と確率/index.md','標本空間'].join('\t'),
  ['textbook/volumes/01_probability/P1_01_事象と確率/index.md','上極限事象'].join('\t'),
  ['textbook/volumes/01_probability/P1_01_事象と確率/index.md','下極限事象'].join('\t'),
  ['textbook/volumes/01_probability/P1_02_条件付き確率_独立_bayesの定理/index.md','対独立'].join('\t'),
  ['textbook/volumes/01_probability/P2_01_確率変数_pmf_pdf_cdf/index.md','台'].join('\t'),
  ['textbook/volumes/01_probability/P2_02_期待値_分散_共分散_母関数/index.md','条件付き期待値'].join('\t'),
]);
const lines = fs.readFileSync(baseline, 'utf8').split(/\r?\n/);
const kept = [];
let removed = 0;
for (const line of lines) {
  if (!line) { kept.push(line); continue; }
  const [path, , term] = line.split('\t');
  if (retire.has([path, term].join('\t'))) removed += 1;
  else kept.push(line);
}
if (removed !== 15) throw new Error(`baseline: expected to retire 15 entries, retired ${removed}`);
fs.writeFileSync(baseline, kept.join('\n'));
console.log('batch5 formalized; retired baseline entries:', removed);
