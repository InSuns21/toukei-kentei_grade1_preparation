import fs from 'node:fs';

const path = 'textbook/volumes/01_probability/P2_01_確率変数_pmf_pdf_cdf/index.md';
let text = fs.readFileSync(path, 'utf8');

function replaceOnce(needle, replacement, label) {
  if (!text.includes(needle)) throw new Error(`S13 needle not found: ${label}`);
  text = text.replace(needle, () => replacement);
}

if (!text.includes('def-p2-01-random-variable')) {
  const needle = `### 2.1 確率変数\n\n確率空間 $(\\Omega,\\mathcal F,P)$ 上の実確率変数 $X$ は、標本点 $\\omega\\in\\Omega$ を実数 $X(\\omega)\\in\\mathbb R$ へ写す写像です。\n\n厳密には、全ての $x\\in\\mathbb R$ について\n\n$$\n\\{\\omega\\in\\Omega:X(\\omega)\\le x\\}\\in\\mathcal F\n$$\n\nを満たす可測写像とします。本章では測度論の構成そのものには立ち入りませんが、$P(X\\le x)$ が常に意味を持つことを使います。`;
  const replacement = `### 2.1 確率変数\n\n<a id="def-p2-01-random-variable"></a>\n\n<!-- formal-statement-start -->\n> **定義（確率変数）**  \n> 確率空間 $(\\Omega,\\mathcal F,P)$ 上で、$X:\\Omega\\to\\mathbb R$ が全ての $x\\in\\mathbb R$ について $\\{\\omega:X(\\omega)\\le x\\}\\in\\mathcal F$ を満たすとき、$X$ を **実確率変数** という。すなわち、標本点を実数へ写し、$P(X\\le x)$ のような確率が定義できる可測写像である。\n<!-- formal-statement-end -->\n\n<!-- definition-example-start: def-p2-01-random-variable -->\n**定義の確認**  \n六面体さいころで $\\Omega=\\{1,2,3,4,5,6\\}$、$\\mathcal F=2^\\Omega$ とし、$X(\\omega)=\\omega$ とします。例えば $\\{X\\le3\\}=\\{1,2,3\\}\\in\\mathcal F$ であり、有限個の全ての部分集合が $\\mathcal F$ に入るので $X$ は確率変数です。\n<!-- definition-example-end -->\n\n本章では測度論の構成そのものには立ち入りませんが、$P(X\\le x)$ が常に意味を持つことを使います。`;
  replaceOnce(needle, replacement, 'random-variable-definition');
}

if (!text.includes('definition-example-start: def-p2-01-support')) {
  const needle = `<!-- formal-statement-end -->\n\n1変量なら、たとえば $(0,1)$ 上の一様分布の台は $0<x<1$ です。`;
  const replacement = `<!-- formal-statement-end -->\n\n<!-- definition-example-start: def-p2-01-support -->\n**定義の確認**  \nベルヌーイ分布 $P(X=1)=p$, $P(X=0)=1-p$ の台は $\\{0,1\\}$ です。一方、$(0,1)$ 上で正の密度をもつ連続分布では、本章の用法で台を $0<x<1$ と書きます。\n<!-- definition-example-end -->\n\n1変量なら、たとえば $(0,1)$ 上の一様分布の台は $0<x<1$ です。`;
  replaceOnce(needle, replacement, 'support-example');
}

if (!text.includes('def-p2-01-pmf')) {
  const needle = `### 2.3 確率質量関数\n\n高々可算な台 $S\\subset\\mathbb R$ に対し\n\n$$\np_X(x)=P(X=x),\\qquad x\\in S\n$$\n\nを確率質量関数と呼びます。`;
  const replacement = `### 2.3 確率質量関数\n\n<a id="def-p2-01-pmf"></a>\n\n<!-- formal-statement-start -->\n> **定義（確率関数・確率質量関数）**  \n> 高々可算な台 $S$ をもつ離散型確率変数 $X$ に対し、$p_X(x)=P(X=x)$ を **確率関数（確率質量関数）** という。本教材では、連続型の確率密度関数との区別を明確にするため、本文では主に「確率質量関数」と呼ぶ。\n<!-- formal-statement-end -->\n\n<!-- definition-example-start: def-p2-01-pmf -->\n**定義の確認**  \nベルヌーイ分布なら $p_X(1)=p$, $p_X(0)=1-p$、それ以外では0です。2点の確率質量を足すと $p+(1-p)=1$ になります。\n<!-- definition-example-end -->`;
  replaceOnce(needle, replacement, 'pmf-definition');
}

if (!text.includes('def-p2-01-pdf')) {
  const needle = `### 2.4 確率密度関数\n\n非負関数 $f_X$ が\n\n$$\nP(a<X\\le b)=\\int_a^b f_X(x)\\,dx\n$$\n\nを全ての $a<b$ で満たし、\n\n$$\n\\int_{-\\infty}^{\\infty}f_X(x)\\,dx=1\n$$\n\nであるとき、$f_X$ を確率密度関数と呼びます。`;
  const replacement = `### 2.4 確率密度関数\n\n<a id="def-p2-01-pdf"></a>\n\n<!-- formal-statement-start -->\n> **定義（確率密度関数）**  \n> 非負関数 $f_X$ が全ての $a<b$ について $P(a<X\\le b)=\\int_a^b f_X(x)\\,dx$ を満たし、かつ $\\int_{-\\infty}^{\\infty}f_X(x)\\,dx=1$ であるとき、$f_X$ を $X$ の **確率密度関数** という。確率は密度の値そのものではなく、区間上の積分で与えられる。\n<!-- formal-statement-end -->\n\n<!-- definition-example-start: def-p2-01-pdf -->\n**定義の確認**  \n$(0,1)$ 上の一様分布では $f_X(x)=1$ $(0<x<1)$、それ以外で0です。$P(0.2<X\\le0.5)=\\int_{0.2}^{0.5}1\\,dx=0.3$ となり、区間確率が密度の積分で得られます。\n<!-- definition-example-end -->`;
  replaceOnce(needle, replacement, 'pdf-definition');
}

if (!text.includes('def-p2-01-cdf')) {
  const needle = `### 2.5 累積分布関数\n\n$$\nF_X(x)=P(X\\le x),\\qquad x\\in\\mathbb R\n$$\n\nを累積分布関数と呼びます。`;
  const replacement = `### 2.5 累積分布関数\n\n<a id="def-p2-01-cdf"></a>\n\n<!-- formal-statement-start -->\n> **定義（累積分布関数）**  \n> 実確率変数 $X$ に対し、$F_X(x)=P(X\\le x)$ $(x\\in\\mathbb R)$ を $X$ の **累積分布関数** という。離散型・連続型・混合型のいずれでも定義できる。\n<!-- formal-statement-end -->\n\n<!-- definition-example-start: def-p2-01-cdf -->\n**定義の確認**  \n$(0,1)$ 上の一様分布では $0<x<1$ に対して $F_X(x)=x$ です。したがって $F_X(0.3)=P(X\\le0.3)=0.3$ となります。\n<!-- definition-example-end -->`;
  replaceOnce(needle, replacement, 'cdf-definition');
}

if (!text.includes('def-p2-01-joint-distribution')) {
  const needle = `### 2.6 同時分布と周辺分布\n\n離散型の $(X,Y)$ に対し`;
  const replacement = `### 2.6 同時分布と周辺分布\n\n<a id="def-p2-01-joint-distribution"></a>\n\n<!-- formal-statement-start -->\n> **定義（同時分布）**  \n> 複数の確率変数を確率ベクトル $(X,Y)$ としてまとめたとき、そのベクトルがどの値の組をどの確率で取るかを定める確率法則を **同時分布** という。離散型では同時確率質量関数、連続型では同時確率密度関数によって表現できる。\n<!-- formal-statement-end -->\n\n<!-- definition-example-start: def-p2-01-joint-distribution -->\n**定義の確認**  \n公平な硬貨を2回投げ、$X,Y$ を各回の表を1・裏を0で表す確率変数とすると、$(X,Y)$ は $(0,0),(0,1),(1,0),(1,1)$ をそれぞれ確率 $1/4$ で取ります。この4点への確率の割当て全体が同時分布です。\n<!-- definition-example-end -->\n\n離散型の $(X,Y)$ に対し`;
  replaceOnce(needle, replacement, 'joint-distribution-definition');
}

if (!text.includes('def-p2-01-marginal-distribution')) {
  const needle = `一方の変数だけを残した分布を周辺分布と呼びます。離散型では和、連続型では積分で他方を消去します。`;
  const replacement = `<a id="def-p2-01-marginal-distribution"></a>\n\n<!-- formal-statement-start -->\n> **定義（周辺分布）**  \n> 同時分布から一部の変数だけを残して得られる分布を **周辺分布** という。二変量の場合、離散型では $p_X(x)=\\sum_y p_{X,Y}(x,y)$、連続型では $f_X(x)=\\int f_{X,Y}(x,y)\\,dy$ のように、不要な変数を和または積分で消去して得る。\n<!-- formal-statement-end -->\n\n<!-- definition-example-start: def-p2-01-marginal-distribution -->\n**定義の確認**  \n上の2回の公平な硬貨の例では $p_{X,Y}(1,0)=p_{X,Y}(1,1)=1/4$ なので、$X$ の周辺確率は $p_X(1)=1/4+1/4=1/2$ です。$Y$ を足し消すことで $X$ だけの分布を得ています。\n<!-- definition-example-end -->\n\n離散型では和、連続型では積分で他方を消去します。`;
  replaceOnce(needle, replacement, 'marginal-distribution-definition');
}

if (!text.includes('def-p2-01-rv-independence')) {
  const needle = `### 2.7 独立\n\n$X,Y$ が独立であるとは、任意の適切な集合 $A,B$ について\n\n$$\nP(X\\in A,Y\\in B)=P(X\\in A)P(Y\\in B)\n$$\n\nが成り立つことです。`;
  const replacement = `### 2.7 独立\n\n<a id="def-p2-01-rv-independence"></a>\n\n<!-- formal-statement-start -->\n> **定義（確率変数の独立）**  \n> 確率変数 $X,Y$ について、任意の適切な集合 $A,B$ に対し $P(X\\in A,Y\\in B)=P(X\\in A)P(Y\\in B)$ が成り立つとき、$X,Y$ は **独立** であるという。これは $X$ から作る事象と $Y$ から作る事象が独立であることを表す。\n<!-- formal-statement-end -->\n\n<!-- definition-example-start: def-p2-01-rv-independence -->\n**定義の確認**  \n独立な2回の公平な硬貨投げで、各回の表を1・裏を0とする $X,Y$ を考えると、例えば $P(X=1,Y=1)=1/4=(1/2)(1/2)=P(X=1)P(Y=1)$ です。4つの組全てで同様に積へ分解できるため $X,Y$ は独立です。\n<!-- definition-example-end -->`;
  replaceOnce(needle, replacement, 'random-variable-independence-definition');
}

fs.writeFileSync(path, text);
