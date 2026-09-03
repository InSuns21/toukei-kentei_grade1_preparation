import fs from 'node:fs';

function replaceOnce(file, from, to) {
  let s = fs.readFileSync(file, 'utf8');
  const n = s.split(from).length - 1;
  if (n !== 1) throw new Error(`${file}: expected 1 match, found ${n}: ${from.slice(0,100)}`);
  s = s.replace(from, () => to);
  fs.writeFileSync(file, s);
}

const e = 'textbook/volumes/00_foundations/F0_00E_ベクトル空間_基底_Gram_Schmidt_直交射影/index.md';
replaceOnce(e,
`実数上のベクトル空間 $V$ とは、元どうしの加法

$$
V\\times V\\to V,
\\qquad
(x,y)\\mapsto x+y
$$

と、実数によるスカラー倍

$$
\\mathbb R\\times V\\to V,
\\qquad
(a,x)\\mapsto ax
$$

が定義され、通常のベクトル計算と同じ規則を満たす集合です。

具体的には、任意の $x,y,z\\in V$ と $a,b\\in\\mathbb R$ に対して

1. $x+y=y+x$
2. $(x+y)+z=x+(y+z)$
3. $x+0=x$ となる零ベクトル $0\\in V$ がある
4. $x+(-x)=0$ となる逆元 $-x\\in V$ がある
5. $a(x+y)=ax+ay$
6. $(a+b)x=ax+bx$
7. $(ab)x=a(bx)$
8. $1x=x$

が成り立ちます。`,
`<a id="def-f0-00e-vector-space"></a>

<!-- formal-statement-start -->
> **定義（実ベクトル空間）**  
> 集合 $V$ に加法 $V\\times V\\to V$ と実数によるスカラー倍 $\\mathbb R\\times V\\to V$ が定義され、任意の $x,y,z\\in V$ と $a,b\\in\\mathbb R$ に対して次を満たすとき、$V$ を **実ベクトル空間** といいます。
>
> 1. $x+y=y+x$
> 2. $(x+y)+z=x+(y+z)$
> 3. $x+0=x$ となる零ベクトル $0\\in V$ がある
> 4. $x+(-x)=0$ となる逆元 $-x\\in V$ がある
> 5. $a(x+y)=ax+ay$
> 6. $(a+b)x=ax+bx$
> 7. $(ab)x=a(bx)$
> 8. $1x=x$
<!-- formal-statement-end -->`);
replaceOnce(e,
`ベクトル空間 $V$ の部分集合 $W\\subset V$ が **線形部分空間** であるとは、$W$ 自身が同じ加法とスカラー倍についてベクトル空間になることです。

実際の判定では、次の条件で十分です。

> **部分空間判定法**  
> 空でない集合 $W\\subset V$ が部分空間であるための必要十分条件は、任意の $u,v\\in W$ と $a,b\\in\\mathbb R$ に対して
$$
au+bv\\in W
$$
> が成り立つこと。`,
`<a id="def-f0-00e-linear-subspace"></a>

<!-- formal-statement-start -->
> **定義（線形部分空間）**  
> ベクトル空間 $V$ の部分集合 $W\\subset V$ が、$V$ と同じ加法とスカラー倍についてベクトル空間になるとき、$W$ を $V$ の **線形部分空間** といいます。
<!-- formal-statement-end -->

実際の判定では、次の条件で十分です。

<a id="prop-f0-00e-subspace-test"></a>

<!-- formal-statement-start -->
> **命題（部分空間判定法）**  
> 空でない集合 $W\\subset V$ が部分空間であるための必要十分条件は、任意の $u,v\\in W$ と $a,b\\in\\mathbb R$ に対して

$$
au+bv\\in W
$$

> が成り立つことです。
<!-- formal-statement-end -->`);
replaceOnce(e,
`ベクトル $v_1,\\dots,v_k\\in V$ に対して

$$
a_1v_1+\\cdots+a_kv_k
$$

を $v_1,\\dots,v_k$ の **線形結合** といいます。

すべての線形結合を集めた集合を

$$
\\operatorname{span}(v_1,\\dots,v_k)
=
\\left\\{
\\sum_{i=1}^k a_iv_i:a_i\\in\\mathbb R
\\right\\}
$$

と書きます。`,
`<a id="def-f0-00e-linear-combination-span"></a>

<!-- formal-statement-start -->
> **定義（線形結合とspan）**  
> ベクトル $v_1,\\dots,v_k\\in V$ と係数 $a_1,\\dots,a_k\\in\\mathbb R$ に対する

$$
a_1v_1+\\cdots+a_kv_k
$$

> を $v_1,\\dots,v_k$ の **線形結合** といいます。すべての線形結合を集めた集合

$$
\\operatorname{span}(v_1,\\dots,v_k)
=
\\left\\{\\sum_{i=1}^k a_iv_i:a_i\\in\\mathbb R\\right\\}
$$

> を $v_1,\\dots,v_k$ の **span（線形包）** といいます。
<!-- formal-statement-end -->`);
replaceOnce(e,
`$v_1,\\dots,v_k$ が **一次独立** であるとは

$$
a_1v_1+\\cdots+a_kv_k=0
$$

から

$$
a_1=\\cdots=a_k=0
$$

しか起こらないことです。

逆に、ゼロでない係数を少なくとも一つ使って

$$
a_1v_1+\\cdots+a_kv_k=0
$$

とできるなら **一次従属** です。`,
`<a id="def-f0-00e-linear-independence"></a>

<!-- formal-statement-start -->
> **定義（一次独立・一次従属）**  
> ベクトル族 $v_1,\\dots,v_k$ が **一次独立** であるとは、

$$
a_1v_1+\\cdots+a_kv_k=0
$$

> なら必ず $a_1=\\cdots=a_k=0$ となることです。これ以外の場合、すなわちゼロでない係数を少なくとも一つ使って上式を満たせるとき、ベクトル族は **一次従属** であるといいます。
<!-- formal-statement-end -->`);
replaceOnce(e,
`ベクトル族

$$
v_1,\\dots,v_n
$$

が

1. $V$ を張る
2. 一次独立である

という2条件を満たすとき、これを $V$ の **基底** といいます。`,
`<a id="def-f0-00e-basis"></a>

<!-- formal-statement-start -->
> **定義（基底）**  
> ベクトル族 $v_1,\\dots,v_n$ が、(1) $V$ を張り、(2) 一次独立である、という2条件を満たすとき、$(v_1,\\dots,v_n)$ を $V$ の **基底** といいます。
<!-- formal-statement-end -->`);
replaceOnce(e,
`係数を並べた

$$
[x]_{\\mathcal B}
=
\\begin{pmatrix}
c_1\\\\
\\vdots\\\\
c_n
\\end{pmatrix},
\\qquad
\\mathcal B=(v_1,\\dots,v_n)
$$

を、基底 $\\mathcal B$ に関する $x$ の **座標ベクトル** といいます。`,
`<a id="def-f0-00e-coordinate-vector"></a>

<!-- formal-statement-start -->
> **定義（座標ベクトル）**  
> 基底 $\\mathcal B=(v_1,\\dots,v_n)$ に対して $x=c_1v_1+\\cdots+c_nv_n$ と一意に表したとき、係数を並べた

$$
[x]_{\\mathcal B}
=
\\begin{pmatrix}c_1\\\\\\vdots\\\\c_n\\end{pmatrix}
$$

> を、基底 $\\mathcal B$ に関する $x$ の **座標ベクトル** といいます。
<!-- formal-statement-end -->`);
replaceOnce(e,
`この本数を

$$
\\dim V
$$

と書きます。`,
`<a id="def-f0-00e-dimension"></a>

<!-- formal-statement-start -->
> **定義（次元）**  
> 有限次元ベクトル空間 $V$ の基底に含まれるベクトルの本数を $V$ の **次元** といい、

$$
\\dim V
$$

> と書きます。
<!-- formal-statement-end -->`);
replaceOnce(e,
`> **Steinitzの交換補題**  
> $V$ が $n$ 本のベクトル
$$
v_1,\\dots,v_n
$$
> で張られているとする。$u_1,\\dots,u_m$ が一次独立なら
$$
m\\le n.
$$`,
`<a id="lem-steinitz-exchange"></a>

<!-- formal-statement-start -->
> **補題（Steinitzの交換補題）**  
> $V$ が $n$ 本のベクトル $v_1,\\dots,v_n$ で張られているとします。$u_1,\\dots,u_m$ が一次独立なら

$$
m\\le n.
$$
<!-- formal-statement-end -->`);
replaceOnce(e,
`<a id="thm-basis-extension"></a>

## 9. 基底延長定理`,
`## 9. 基底延長定理`);
replaceOnce(e,
`> **基底延長定理**  
> $u_1,\\dots,u_r$ が有限次元ベクトル空間 $V$ で一次独立なら、ある $v_{r+1},\\dots,v_n$ が存在して
$$
u_1,\\dots,u_r,v_{r+1},\\dots,v_n
$$
> が $V$ の基底になる。`,
`<a id="thm-basis-extension"></a>

<!-- formal-statement-start -->
> **定理（基底延長定理）**  
> $u_1,\\dots,u_r$ が有限次元ベクトル空間 $V$ で一次独立なら、ある $v_{r+1},\\dots,v_n$ が存在して

$$
u_1,\\dots,u_r,v_{r+1},\\dots,v_n
$$

> が $V$ の基底になります。
<!-- formal-statement-end -->`);
replaceOnce(e,
`部分空間 $U,W\\subset V$ に対して

$$
U+W
=
\\{u+w:u\\in U,\\ w\\in W\\}
$$

を部分空間の和といいます。

特に

$$
U\\cap W=\\{0\\}
$$

なら、$u+w$ という表し方は一意です。このとき

$$
U\\oplus W
$$

と書き、**直和** といいます。`,
`<a id="def-f0-00e-sum-direct-sum"></a>

<!-- formal-statement-start -->
> **定義（部分空間の和・直和）**  
> 部分空間 $U,W\\subset V$ に対して

$$
U+W=\\{u+w:u\\in U,\\ w\\in W\\}
$$

> を **部分空間の和** といいます。さらに $U\\cap W=\\{0\\}$ のとき、各元の表示 $u+w$ は一意になり、この和を **直和** といい $U\\oplus W$ と書きます。
<!-- formal-statement-end -->`);

const e1 = 'textbook/volumes/00_foundations/F0_00E1_内積_Gram_Schmidt_射影_QR/index.md';
replaceOnce(e1,
`$$
\\langle x,y\\rangle=0
$$

なら $x$ と $y$ は **直交** するといいます。`,
`<a id="def-f0-00e1-orthogonal"></a>

<!-- formal-statement-start -->
> **定義（直交）**  
> $x,y\\in\\mathbb R^n$ が

$$
\\langle x,y\\rangle=0
$$

> を満たすとき、$x$ と $y$ は **直交** するといいます。
<!-- formal-statement-end -->`);
replaceOnce(e1,
`ベクトル $q_1,\\dots,q_k$ が

$$
\\langle q_i,q_j\\rangle
=
\\begin{cases}
1&i=j,\\\\
0&i\\ne j
\\end{cases}
$$

を満たすとき、**正規直交系** といいます。`,
`<a id="def-f0-00e1-orthonormal-system"></a>

<!-- formal-statement-start -->
> **定義（正規直交系）**  
> ベクトル $q_1,\\dots,q_k$ が

$$
\\langle q_i,q_j\\rangle
=
\\begin{cases}1&i=j,\\\\0&i\\ne j\\end{cases}
$$

> を満たすとき、$q_1,\\dots,q_k$ を **正規直交系** といいます。
<!-- formal-statement-end -->`);
replaceOnce(e1,
`部分空間 $V\\subset\\mathbb R^n$ に対して

$$
\\boxed{
V^\\perp
=
\\{y\\in\\mathbb R^n:\\langle y,v\\rangle=0\\ \\forall v\\in V\\}
}
$$

を **直交補空間** といいます。`,
`<a id="def-f0-00e1-orthogonal-complement"></a>

<!-- formal-statement-start -->
> **定義（直交補空間）**  
> 部分空間 $V\\subset\\mathbb R^n$ に対して

$$
V^\\perp=\\{y\\in\\mathbb R^n:\\langle y,v\\rangle=0\\ \\forall v\\in V\\}
$$

> を $V$ の **直交補空間** といいます。
<!-- formal-statement-end -->`);

const f2 = 'textbook/volumes/00_foundations/F0_00F2_SVD_特異値_作用素ノルム/index.md';
replaceOnce(f2,
`$$
\\boxed{
\\sigma_i
=
\\sqrt{\\lambda_i}
}
$$

を $A$ の **特異値** といいます。

$v_i$ を **右特異ベクトル** といいます。`,
`<a id="def-f0-00f2-singular-values-right-vectors"></a>

<!-- formal-statement-start -->
> **定義（特異値・右特異ベクトル）**  
> $A^{\\mathsf T}A$ の固有値 $\\lambda_i\\ge0$ と対応する単位固有ベクトル $v_i$ に対し、

$$
\\sigma_i=\\sqrt{\\lambda_i}
$$

> を $A$ の **特異値**、$v_i$ を対応する **右特異ベクトル** といいます。
<!-- formal-statement-end -->`);
replaceOnce(f2,
`これらを **左特異ベクトル** といいます。`,
`<a id="def-f0-00f2-left-singular-vectors"></a>

<!-- formal-statement-start -->
> **定義（左特異ベクトル）**  
> $\\sigma_i>0$ に対して

$$
u_i=\\frac{Av_i}{\\sigma_i}
$$

> で定めた単位ベクトル $u_i$ を、$\\sigma_i$ に対応する **左特異ベクトル** といいます。
<!-- formal-statement-end -->`);
replaceOnce(f2,
`$$
\\boxed{
A
=
U_r\\Sigma_rV_r^{\\mathsf T}
}
$$

と書けます。

これが薄い **特異値分解（SVD）** です。`,
`<a id="thm-f0-00f2-svd"></a>

<!-- formal-statement-start -->
> **定理（特異値分解）**  
> 任意の実行列 $A\\in\\mathbb R^{m\\times n}$ は、正の特異値の個数を $r$ とすると

$$
A=U_r\\Sigma_rV_r^{\\mathsf T}
$$

> と表せます。ここで $U_r,V_r$ の列はそれぞれ左・右特異ベクトルからなる正規直交系、$\\Sigma_r$ は正の特異値を並べた対角行列です。
<!-- formal-statement-end -->

これが薄い **特異値分解（SVD）** です。`);
replaceOnce(f2,
`線形写像

$$
A:\\mathbb R^n\\to\\mathbb R^m
$$

のEuclidノルムに関する **作用素ノルム** を

$$
\\boxed{
\\|A\\|_{\\mathrm{op}}
=
\\sup_{x\\ne0}
\\frac{\\|Ax\\|}{\\|x\\|}
=
\\sup_{\\|x\\|=1}\\|Ax\\|
}
$$`,
`<a id="def-f0-00f2-operator-norm"></a>

<!-- formal-statement-start -->
> **定義（作用素ノルム）**  
> 線形写像 $A:\\mathbb R^n\\to\\mathbb R^m$ のEuclidノルムに関する **作用素ノルム** を

$$
\\|A\\|_{\\mathrm{op}}
=
\\sup_{x\\ne0}\\frac{\\|Ax\\|}{\\|x\\|}
=
\\sup_{\\|x\\|=1}\\|Ax\\|
$$

> と定めます。
<!-- formal-statement-end -->`);

const baseline='scripts/implicit-formal-baseline.txt';
let b=fs.readFileSync(baseline,'utf8').split(/\r?\n/).filter(Boolean);
const prefixes=[
 'textbook/volumes/00_foundations/F0_00E_ベクトル空間_基底_Gram_Schmidt_直交射影/index.md\t',
 'textbook/volumes/00_foundations/F0_00E1_内積_Gram_Schmidt_射影_QR/index.md\t',
 'textbook/volumes/00_foundations/F0_00F2_SVD_特異値_作用素ノルム/index.md\t',
];
b=b.filter(line=>!prefixes.some(p=>line.startsWith(p)));
fs.writeFileSync(baseline,`${b.join('\n')}\n`);
console.log(`Batch 2 complete. Baseline now has ${b.length} entries.`);
