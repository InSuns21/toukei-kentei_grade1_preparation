import fs from 'node:fs';

function replaceOnce(file, from, to) {
  let s = fs.readFileSync(file, 'utf8');
  const n = s.split(from).length - 1;
  if (n !== 1) throw new Error(`${file}: expected 1 match, found ${n}: ${from.slice(0,100)}`);
  s = s.replace(from, () => to);
  fs.writeFileSync(file, s);
}

const c1='textbook/volumes/00_foundations/F0_02C1_ノルム空間_Banach_Hilbert/index.md';
replaceOnce(c1,
`ベクトル空間 $X$ 上の関数

$$
\\|\\cdot\\|:X\\to[0,\\infty)
$$

が次を満たすとき、ノルムといいます。

1. $\\|x\\|\\ge0$ で、$\\|x\\|=0\\iff x=0$
2. $\\|ax\\|=|a|\\|x\\|$
3. $\\|x+y\\|\\le\\|x\\|+\\|y\\|$

ノルムを備えたベクトル空間を **ノルム空間** といいます。`,
`<a id="def-f0-02c1-norm-normed-space"></a>

<!-- formal-statement-start -->
> **定義（ノルム・ノルム空間）**  
> ベクトル空間 $X$ 上の関数 $\\|\\cdot\\|:X\\to[0,\\infty)$ が任意の $x,y\\in X$ とスカラー $a$ に対して
>
> 1. $\\|x\\|\\ge0$ かつ $\\|x\\|=0\\iff x=0$
> 2. $\\|ax\\|=|a|\\|x\\|$
> 3. $\\|x+y\\|\\le\\|x\\|+\\|y\\|$
>
> を満たすとき、$\\|\\cdot\\|$ を **ノルム** といいます。ノルムを備えたベクトル空間を **ノルム空間** といいます。
<!-- formal-statement-end -->`);
replaceOnce(c1,
`ノルム空間 $X$ のすべてのCauchy列が $X$ 内で収束するとき、$X$ を **Banach空間** といいます。`,
`<a id="def-f0-02c1-banach-space"></a>

<!-- formal-statement-start -->
> **定義（Banach空間）**  
> ノルム空間 $X$ のすべてのCauchy列が $X$ 内で収束するとき、$X$ を **Banach空間** といいます。
<!-- formal-statement-end -->`);
replaceOnce(c1,
`実ベクトル空間 $H$ 上の内積 $\\langle x,y\\rangle$ は、

1. $\\langle x,x\\rangle\\ge0$ で、$\\langle x,x\\rangle=0\\iff x=0$
2. $\\langle x,y\\rangle=\\langle y,x\\rangle$
3. 各引数について線形

を満たします。`,
`<a id="def-f0-02c1-inner-product"></a>

<!-- formal-statement-start -->
> **定義（実内積）**  
> 実ベクトル空間 $H$ 上の二変数関数 $\\langle\\cdot,\\cdot\\rangle:H\\times H\\to\\mathbb R$ が、任意の $x,y,z\\in H$ と $a,b\\in\\mathbb R$ に対して、正定値性、対称性、線形性を満たすとき **内積** といいます。すなわち $\\langle x,x\\rangle\\ge0$、$\\langle x,x\\rangle=0\\iff x=0$、$\\langle x,y\\rangle=\\langle y,x\\rangle$、および $\\langle ax+by,z\\rangle=a\\langle x,z\\rangle+b\\langle y,z\\rangle$ が成り立ちます。
<!-- formal-statement-end -->`);
replaceOnce(c1,
`内積から定まるノルムについて完備な空間を **Hilbert空間** といいます。`,
`<a id="def-f0-02c1-hilbert-space"></a>

<!-- formal-statement-start -->
> **定義（Hilbert空間）**  
> 内積から定まるノルムについて完備な内積空間を **Hilbert空間** といいます。
<!-- formal-statement-end -->`);

const c2='textbook/volumes/00_foundations/F0_02C2_線形汎関数_双対空間_Riesz/index.md';
replaceOnce(c2,
`ベクトル空間 $X$ から実数への写像

$$
\\ell:X\\to\\mathbb R
$$

が

$$
\\ell(ax+by)=a\\ell(x)+b\\ell(y)
$$

を満たすとき、$\\ell$ を **線形汎関数** といいます。`,
`<a id="def-f0-02c2-linear-functional"></a>

<!-- formal-statement-start -->
> **定義（線形汎関数）**  
> ベクトル空間 $X$ から実数への写像 $\\ell:X\\to\\mathbb R$ が、任意の $x,y\\in X$ とスカラー $a,b$ に対して

$$
\\ell(ax+by)=a\\ell(x)+b\\ell(y)
$$

> を満たすとき、$\\ell$ を **線形汎関数** といいます。
<!-- formal-statement-end -->`);
replaceOnce(c2,
`ノルム空間 $X$ 上の **連続線形汎関数全体** を

$$
\\boxed{X^*}
$$

と書き、**双対空間** といいます。`,
`<a id="def-f0-02c2-dual-space"></a>

<!-- formal-statement-start -->
> **定義（双対空間）**  
> ノルム空間 $X$ 上の連続線形汎関数全体を

$$
X^*
$$

> と書き、$X$ の **双対空間** といいます。
<!-- formal-statement-end -->`);
replaceOnce(c2,
`$x\\in[0,1]$ を固定し、

$$
\\delta_x(f)=f(x)
$$

と定めます。

これを **評価汎関数** といいます。`,
`<a id="def-f0-02c2-evaluation-functional"></a>

<!-- formal-statement-start -->
> **定義（評価汎関数）**  
> 関数空間上で点 $x$ を固定し、各関数 $f$ にその点での値を対応させる汎関数

$$
\\delta_x(f)=f(x)
$$

> を **評価汎関数** といいます。
<!-- formal-statement-end -->`);

const c3='textbook/volumes/00_foundations/F0_02C3_Frechet微分_線形作用素_随伴/index.md';
replaceOnce(c3,
`点 $x\\in X$ と方向 $h\\in X$ に対し

$$
D_hf(x)
=\\lim_{t\\to0}
\\frac{f(x+th)-f(x)}{t}
$$

が存在するとき、これを **方向微分** といいます。`,
`<a id="def-f0-02c3-directional-derivative"></a>

<!-- formal-statement-start -->
> **定義（方向微分）**  
> ノルム空間 $X$ 上の関数 $f:X\\to\\mathbb R$、点 $x\\in X$、方向 $h\\in X$ に対し

$$
D_hf(x)=\\lim_{t\\to0}\\frac{f(x+th)-f(x)}{t}
$$

> が存在するとき、これを $f$ の $x$ における方向 $h$ の **方向微分** といいます。
<!-- formal-statement-end -->`);
replaceOnce(c3,
`すべての方向 $h$ について方向微分が存在し、さらに

$$
h\\mapsto D_hf(x)
$$

が線形写像になるとき、その線形写像を **Gâteaux微分** と呼びます。

記号的には

$$
D_Gf(x)[h]
=D_hf(x)
$$

です。`,
`<a id="def-f0-02c3-gateaux-derivative"></a>

<!-- formal-statement-start -->
> **定義（Gâteaux微分）**  
> すべての方向 $h$ について方向微分が存在し、写像 $h\\mapsto D_hf(x)$ が線形であるとき、その線形写像を $f$ の $x$ における **Gâteaux微分** といい、

$$
D_Gf(x)[h]=D_hf(x)
$$

> と書きます。
<!-- formal-statement-end -->`);
replaceOnce(c3,
`$f$ が $x$ で **Fréchet微分可能** であるとは、ある有界線形作用素

$$
A:X\\to Y
$$

が存在して

$$
\\boxed{
\\frac{
\\|f(x+h)-f(x)-Ah\\|_Y
}{\\|h\\|_X}
\\to0
\\qquad(h\\to0)
}
$$

となることです。

この $A$ を

$$
Df(x)
$$

と書きます。`,
`<a id="def-f0-02c3-frechet-derivative"></a>

<!-- formal-statement-start -->
> **定義（Fréchet微分）**  
> ノルム空間間の写像 $f:X\\to Y$ が点 $x$ で **Fréchet微分可能** であるとは、ある有界線形作用素 $A:X\\to Y$ が存在して

$$
\\frac{\\|f(x+h)-f(x)-Ah\\|_Y}{\\|h\\|_X}\\to0
\\qquad(h\\to0)
$$

> となることです。この一意な $A$ を $Df(x)$ と書き、$f$ の $x$ における **Fréchet微分** といいます。
<!-- formal-statement-end -->`);
replaceOnce(c3,
`ノルム空間 $X,Y$ の間の線形写像

$$
T:X\\to Y
$$

が、ある $M<\\infty$ に対して

$$
\\|Tx\\|_Y
\\le M\\|x\\|_X
\\qquad(\\forall x\\in X)
$$

を満たすとき、**有界線形作用素** といいます。`,
`<a id="def-f0-02c3-bounded-linear-operator"></a>

<!-- formal-statement-start -->
> **定義（有界線形作用素）**  
> ノルム空間 $X,Y$ の間の線形写像 $T:X\\to Y$ が、ある $M<\\infty$ に対して

$$
\\|Tx\\|_Y\\le M\\|x\\|_X
\\qquad(\\forall x\\in X)
$$

> を満たすとき、$T$ を **有界線形作用素** といいます。
<!-- formal-statement-end -->`);
replaceOnce(c3,
`有界線形作用素 $T:X\\to Y$ に対し

$$
\\boxed{
\\|T\\|
=\\sup_{\\|x\\|_X\\le1}\\|Tx\\|_Y
}
$$

を **作用素ノルム** といいます。`,
`<a id="def-f0-02c3-operator-norm"></a>

<!-- formal-statement-start -->
> **定義（作用素ノルム）**  
> 有界線形作用素 $T:X\\to Y$ に対し

$$
\\|T\\|=\\sup_{\\|x\\|_X\\le1}\\|Tx\\|_Y
$$

> を $T$ の **作用素ノルム** といいます。
<!-- formal-statement-end -->`);

const c3a='textbook/volumes/00_foundations/F0_02C3A_随伴作用素_Banach_Hilbert/index.md';
replaceOnce(c3a,
`$y^*\\in Y^*$ に対し

$$
T^*y^*
\\in X^*
$$

を

$$
\\boxed{
(T^*y^*)[x]
=y^*[Tx]
}
$$

で定めます。

これを **随伴作用素** といいます。`,
`<a id="def-f0-02c3a-banach-adjoint"></a>

<!-- formal-statement-start -->
> **定義（Banach空間での随伴作用素）**  
> 有界線形作用素 $T:X\\to Y$ に対し、$T^*:Y^*\\to X^*$ を

$$
(T^*y^*)[x]=y^*[Tx]
$$

> で定めます。この $T^*$ を $T$ の **随伴作用素** といいます。
<!-- formal-statement-end -->`);
replaceOnce(c3a,
`その結果、一意な作用素

$$
T^\\dagger:H_2\\to H_1
$$

が存在して

$$
\\boxed{
\\langle Tx,y\\rangle_{H_2}
=\\langle x,T^\\dagger y\\rangle_{H_1}
}
$$

となります。

文献によってはこのHilbert随伴も $T^*$ と書きます。`,
`<a id="def-f0-02c3a-hilbert-adjoint"></a>

<!-- formal-statement-start -->
> **定義（Hilbert随伴）**  
> Hilbert空間 $H_1,H_2$ の間の有界線形作用素 $T:H_1\\to H_2$ に対し、Riesz表現を通じて一意に定まる作用素 $T^\\dagger:H_2\\to H_1$ で

$$
\\langle Tx,y\\rangle_{H_2}=\\langle x,T^\\dagger y\\rangle_{H_1}
$$

> を満たすものを $T$ の **Hilbert随伴** といいます。
<!-- formal-statement-end -->

文献によってはこのHilbert随伴も $T^*$ と書きます。`);

const baseline='scripts/implicit-formal-baseline.txt';
let b=fs.readFileSync(baseline,'utf8').split(/\r?\n/).filter(Boolean);
const prefixes=[
 'textbook/volumes/00_foundations/F0_02C1_ノルム空間_Banach_Hilbert/index.md\t',
 'textbook/volumes/00_foundations/F0_02C2_線形汎関数_双対空間_Riesz/index.md\t',
 'textbook/volumes/00_foundations/F0_02C3_Frechet微分_線形作用素_随伴/index.md\t',
 'textbook/volumes/00_foundations/F0_02C3A_随伴作用素_Banach_Hilbert/index.md\t',
];
b=b.filter(line=>!prefixes.some(p=>line.startsWith(p)));
fs.writeFileSync(baseline,`${b.join('\n')}\n`);
console.log(`Batch 3 complete. Baseline now has ${b.length} entries.`);
