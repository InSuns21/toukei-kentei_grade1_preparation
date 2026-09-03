import fs from 'node:fs';

function replaceOnce(file, from, to) {
  let s=fs.readFileSync(file,'utf8');
  const n=s.split(from).length-1;
  if(n!==1) throw new Error(`${file}: expected 1 match, found ${n}: ${from.slice(0,100)}`);
  s=s.replace(from,()=>to);
  fs.writeFileSync(file,s);
}

const g='textbook/volumes/00_foundations/F0_00G_凸集合_凸関数_凸最適化/index.md';
replaceOnce(g,
`点 $x_1,\\dots,x_k$ と係数

$$
\\theta_i\\ge0,
\\qquad
\\sum_{i=1}^k\\theta_i=1
$$

に対して

$$
\\boxed{
\\sum_{i=1}^k\\theta_i x_i
}
$$

を **凸結合** といいます。`,
`<a id="def-f0-00g-convex-combination"></a>

<!-- formal-statement-start -->
> **定義（凸結合）**  
> 点 $x_1,\\dots,x_k$ と係数 $\\theta_i\\ge0$、$\\sum_{i=1}^k\\theta_i=1$ に対して

$$
\\sum_{i=1}^k\\theta_i x_i
$$

> を $x_1,\\dots,x_k$ の **凸結合** といいます。
<!-- formal-statement-end -->`);
replaceOnce(g,
`集合 $C$ が **凸集合** であるとは、任意の $x,y\\in C$ と $0\\le t\\le1$ に対して

$$
\\boxed{
(1-t)x+ty\\in C
}
$$

となることです。`,
`<a id="def-f0-00g-convex-set"></a>

<!-- formal-statement-start -->
> **定義（凸集合）**  
> 集合 $C$ が **凸集合** であるとは、任意の $x,y\\in C$ と $0\\le t\\le1$ に対して

$$
(1-t)x+ty\\in C
$$

> が成り立つことです。
<!-- formal-statement-end -->`);
replaceOnce(g,
`集合 $S$ を含む凸集合のうち最小のものを **凸包** といい

$$
\\boxed{
\\operatorname{conv}(S)
}
$$

と書きます。`,
`<a id="def-f0-00g-convex-hull"></a>

<!-- formal-statement-start -->
> **定義（凸包）**  
> 集合 $S$ を含む凸集合のうち包含関係で最小のものを $S$ の **凸包** といい、

$$
\\operatorname{conv}(S)
$$

> と書きます。
<!-- formal-statement-end -->`);
replaceOnce(g,
`凸集合 $C$ 上の関数

$$
f:C\\to\\mathbb R
$$

が **凸関数** であるとは、任意の $x,y\\in C$ と $0\\le t\\le1$ に対して

$$
\\boxed{
f((1-t)x+ty)
\\le
(1-t)f(x)+tf(y)
}
$$

となることです。`,
`<a id="def-f0-00g-convex-function"></a>

<!-- formal-statement-start -->
> **定義（凸関数）**  
> 凸集合 $C$ 上の関数 $f:C\\to\\mathbb R$ が **凸関数** であるとは、任意の $x,y\\in C$ と $0\\le t\\le1$ に対して

$$
f((1-t)x+ty)\\le(1-t)f(x)+tf(y)
$$

> が成り立つことです。
<!-- formal-statement-end -->`);
replaceOnce(g,
`$x\\ne y$、$0<t<1$ について

$$
\\boxed{
f((1-t)x+ty)
<
(1-t)f(x)+tf(y)
}
$$

となるとき **狭義凸** といいます。`,
`<a id="def-f0-00g-strictly-convex"></a>

<!-- formal-statement-start -->
> **定義（狭義凸関数）**  
> 凸集合上の関数 $f$ が、任意の異なる $x,y$ と $0<t<1$ に対して

$$
f((1-t)x+ty)<(1-t)f(x)+tf(y)
$$

> を満たすとき、$f$ は **狭義凸** であるといいます。
<!-- formal-statement-end -->`);

const a='textbook/volumes/00_foundations/F0_02A_KKT条件の導出_接錐_polar_Farkas/index.md';
replaceOnce(a,
`そこで active set を

$$
\\boxed{
I(\\boldsymbol x^*)
=
\\{i:g_i(\\boldsymbol x^*)=0\\}
}
$$

とします。`,
`<a id="def-f0-02a-active-set"></a>

<!-- formal-statement-start -->
> **定義（active set）**  
> 不等式制約 $g_i(\\boldsymbol x)\\le0$ に対し、点 $\\boldsymbol x^*$ で等号となる制約の添字集合

$$
I(\\boldsymbol x^*)=\\{i:g_i(\\boldsymbol x^*)=0\\}
$$

> を $\\boldsymbol x^*$ における **active set** といいます。
<!-- formal-statement-end -->`);
replaceOnce(a,
`activeな不等式制約と等式制約を一次近似して

$$
\\boxed{
L_C(\\boldsymbol x^*)
=
\\left\\{
\\boldsymbol d:
\\nabla g_i(\\boldsymbol x^*)^{\\mathsf T}\\boldsymbol d\\le0
\\ (i\\in I(\\boldsymbol x^*)),
\\quad
\\nabla h_j(\\boldsymbol x^*)^{\\mathsf T}\\boldsymbol d=0
\\right\\}
}
$$

と定義します。これを **線形化錐（linearized cone）** と呼びます。`,
`<a id="def-f0-02a-linearized-cone"></a>

<!-- formal-statement-start -->
> **定義（線形化錐）**  
> activeな不等式制約と等式制約を一次近似して得られる方向の集合

$$
L_C(\\boldsymbol x^*)
=\\left\\{\\boldsymbol d:
\\nabla g_i(\\boldsymbol x^*)^{\\mathsf T}\\boldsymbol d\\le0\\ (i\\in I(\\boldsymbol x^*)),\\quad
\\nabla h_j(\\boldsymbol x^*)^{\\mathsf T}\\boldsymbol d=0
\\right\\}
$$

> を $\\boldsymbol x^*$ における **線形化錐（linearized cone）** といいます。
<!-- formal-statement-end -->`);

const b='textbook/volumes/00_foundations/F0_02B_分離超平面定理_Farkas_SVM/index.md';
replaceOnce(b,
`点 $x_1,\\dots,x_n\\in\\mathbb R^p$ に対し

$$
\\theta_i\\ge0,
\\qquad
\\sum_{i=1}^n\\theta_i=1
$$

を満たす係数で作る

$$
\\sum_{i=1}^n\\theta_i x_i
$$

を **凸結合** といいます。

集合 $C\\subset\\mathbb R^p$ が **凸集合** であるとは、任意の $x,y\\in C$ と $0\\le t\\le1$ について

$$
(1-t)x+ty\\in C
$$

となることです。

つまり、集合内の2点を結ぶ線分が全て集合内に残ります。

集合 $S$ の全ての有限凸結合からなる集合を **凸包** といい

$$
\\boxed{\\operatorname{conv}(S)}
$$

と書きます。`,
`<a id="def-f0-02b-convex-combination-set-hull"></a>

<!-- formal-statement-start -->
> **定義（凸結合・凸集合・凸包）**  
> 点 $x_1,\\dots,x_n\\in\\mathbb R^p$ と $\\theta_i\\ge0$、$\\sum_i\\theta_i=1$ に対する $\\sum_i\\theta_i x_i$ を **凸結合** といいます。集合 $C$ が任意の2点とその凸結合をすべて含むとき **凸集合** といいます。集合 $S$ のすべての有限凸結合からなる集合を **凸包** といい、$\\operatorname{conv}(S)$ と書きます。
<!-- formal-statement-end -->

つまり、凸集合では集合内の2点を結ぶ線分が全て集合内に残ります。`);
replaceOnce(b,
`集合 $K\\subset\\mathbb R^p$ が **錐** であるとは

$$
x\\in K,\\ a\\ge0
\\Longrightarrow
ax\\in K
$$

となることです。

さらに凸集合でもあれば **凸錐** といいます。

有限個のベクトル $a_1,\\dots,a_n$ から

$$
\\boxed{
K
=
\\left\\{
\\sum_{j=1}^n\\lambda_j a_j:
\\lambda_j\\ge0
\\right\\}
}
$$

と作られるものを **有限生成凸錐** といいます。`,
`<a id="def-f0-02b-cones"></a>

<!-- formal-statement-start -->
> **定義（錐・凸錐・有限生成凸錐）**  
> 集合 $K\\subset\\mathbb R^p$ が $x\\in K, a\\ge0\\Rightarrow ax\\in K$ を満たすとき **錐** といいます。さらに凸集合でもある錐を **凸錐** といいます。有限個のベクトル $a_1,\\dots,a_n$ により

$$
K=\\left\\{\\sum_{j=1}^n\\lambda_j a_j:\\lambda_j\\ge0\\right\\}
$$

> と表される凸錐を **有限生成凸錐** といいます。
<!-- formal-statement-end -->`);
replaceOnce(b,
`$a\\ne0$ と $b\\in\\mathbb R$ に対し

$$
H
=\\{x:a^{\\mathsf T}x=b\\}
$$

を超平面といいます。`,
`<a id="def-f0-02b-hyperplane"></a>

<!-- formal-statement-start -->
> **定義（超平面）**  
> $a\\ne0$ と $b\\in\\mathbb R$ に対し

$$
H=\\{x:a^{\\mathsf T}x=b\\}
$$

> と表される集合を **超平面** といいます。
<!-- formal-statement-end -->`);

const c4a='textbook/volumes/00_foundations/F0_02C4A_tangent_polar_dual_cone/index.md';
replaceOnce(c4a,
`一つの標準的定義としてBouligand tangent coneを

$$
T_C(x)
=\\left\\{
h:\\exists t_n\\downarrow0,\\ \\exists x_n\\in C,
\\ \\frac{x_n-x}{t_n}\\to h
\\right\\}
$$

と定めます。`,
`<a id="def-f0-02c4a-tangent-cone"></a>

<!-- formal-statement-start -->
> **定義（Bouligand tangent cone）**  
> 集合 $C$ と $x\\in C$ に対し

$$
T_C(x)=\\left\\{h:\\exists t_n\\downarrow0,\\ \\exists x_n\\in C,\\ \\frac{x_n-x}{t_n}\\to h\\right\\}
$$

> を $C$ の $x$ における **Bouligand tangent cone** といいます。
<!-- formal-statement-end -->`);
replaceOnce(c4a,
`錐 $K\\subset X$ に対して

$$
\\boxed{
K^\\circ
=\\{x^*\\in X^*:x^*(k)\\le0
\\ \\forall k\\in K\\}
}
$$

を **polar cone** といいます。`,
`<a id="def-f0-02c4a-polar-cone"></a>

<!-- formal-statement-start -->
> **定義（polar cone）**  
> 錐 $K\\subset X$ に対して

$$
K^\\circ=\\{x^*\\in X^*:x^*(k)\\le0\\ \\forall k\\in K\\}
$$

> を $K$ の **polar cone** といいます。
<!-- formal-statement-end -->`);
replaceOnce(c4a,
`一方、錐 $K\\subset Y$ に対して

$$
\\boxed{
K^*
=\\{\\lambda\\in Y^*:\\lambda(k)\\ge0
\\ \\forall k\\in K\\}
}
$$

を **dual cone** といいます。`,
`<a id="def-f0-02c4a-dual-cone"></a>

<!-- formal-statement-start -->
> **定義（dual cone）**  
> 錐 $K\\subset Y$ に対して

$$
K^*=\\{\\lambda\\in Y^*:\\lambda(k)\\ge0\\ \\forall k\\in K\\}
$$

> を $K$ の **dual cone** といいます。
<!-- formal-statement-end -->`);

const c4='textbook/volumes/00_foundations/F0_02C4_凸解析_劣勾配_normal_cone_双対錐/index.md';
replaceOnce(c4,
`$x^*\\in X^*$ が $x$ における **劣勾配** であるとは

$$
\\boxed{
f(y)
\\ge f(x)+x^*(y-x)
\\qquad(\\forall y\\in X)
}
$$

となることです。

劣勾配全体を

$$
\\boxed{\\partial f(x)}
$$

と書き、**劣微分** といいます。`,
`<a id="def-f0-02c4-subgradient-subdifferential"></a>

<!-- formal-statement-start -->
> **定義（劣勾配・劣微分）**  
> 凸関数 $f:X\\to(-\\infty,+\\infty]$ に対し、$x^*\\in X^*$ が

$$
f(y)\\ge f(x)+x^*(y-x)\\qquad(\\forall y\\in X)
$$

> を満たすとき、$x^*$ を $x$ における **劣勾配** といいます。劣勾配全体の集合を **劣微分** といい $\\partial f(x)$ と書きます。
<!-- formal-statement-end -->`);
replaceOnce(c4,
`制約

$$
x\\in C
$$

を関数へ埋め込むため、**indicator関数**

$$
\\delta_C(x)
=
\\begin{cases}
0,&x\\in C,\\\\
+\\infty,&x\\notin C
\\end{cases}
$$

を導入します。`,
`<a id="def-f0-02c4-convex-indicator"></a>

<!-- formal-statement-start -->
> **定義（集合のindicator関数）**  
> 集合 $C\\subset X$ に対して

$$
\\delta_C(x)=\\begin{cases}0,&x\\in C,\\\\+\\infty,&x\\notin C\\end{cases}
$$

> と定めた拡張実数値関数を $C$ の **indicator関数** といいます。
<!-- formal-statement-end -->`);
replaceOnce(c4,
`$C$ を凸集合、$x\\in C$ とします。

$$
\\boxed{
N_C(x)
=
\\{x^*\\in X^*:x^*(y-x)\\le0
\\ \\forall y\\in C\\}
}
$$

を $C$ の $x$ における **normal cone** といいます。`,
`<a id="def-f0-02c4-normal-cone"></a>

<!-- formal-statement-start -->
> **定義（normal cone）**  
> 凸集合 $C$ と $x\\in C$ に対して

$$
N_C(x)=\\{x^*\\in X^*:x^*(y-x)\\le0\\ \\forall y\\in C\\}
$$

> を $C$ の $x$ における **normal cone** といいます。
<!-- formal-statement-end -->`);

const c6='textbook/volumes/00_foundations/F0_02C6_Hahn_Banach_分離定理/index.md';
replaceOnce(c6,
`実ベクトル空間 $X$ 上の関数

$$
p:X\\to\\mathbb R
$$

が

$$
p(x+y)\\le p(x)+p(y)
$$

かつ $a\\ge0$ に対して

$$
p(ax)=ap(x)
$$

を満たすとき、$p$ を **sublinear functional** といいます。`,
`<a id="def-f0-02c6-sublinear-functional"></a>

<!-- formal-statement-start -->
> **定義（sublinear functional）**  
> 実ベクトル空間 $X$ 上の関数 $p:X\\to\\mathbb R$ が

$$
p(x+y)\\le p(x)+p(y),\\qquad p(ax)=ap(x)\\quad(a\\ge0)
$$

> を満たすとき、$p$ を **sublinear functional** といいます。
<!-- formal-statement-end -->`);
replaceOnce(c6,
`$X$ を実ベクトル空間、$M\\subset X$ を線形部分空間、$p:X\\to\\mathbb R$ をsublinear functionalとします。

$M$ 上の線形汎関数

$$
f_0:M\\to\\mathbb R
$$

が

$$
f_0(x)\\le p(x)
\\qquad(\\forall x\\in M)
$$

を満たすとします。

このとき、$X$ 全体の線形汎関数

$$
f:X\\to\\mathbb R
$$

で

$$
f|_M=f_0
$$

かつ

$$
\\boxed{
f(x)\\le p(x)
\\qquad(\\forall x\\in X)
}
$$

を満たすものが存在します。

つまり **支配条件を壊さず延長できる** という定理です。`,
`<a id="thm-f0-02c6-hahn-banach-real"></a>

<!-- formal-statement-start -->
> **定理（Hahn--Banach：実線形版）**  
> $X$ を実ベクトル空間、$M\\subset X$ を線形部分空間、$p:X\\to\\mathbb R$ をsublinear functionalとします。$M$ 上の線形汎関数 $f_0:M\\to\\mathbb R$ が $f_0(x)\\le p(x)$ をすべての $x\\in M$ で満たすなら、$f|_M=f_0$ かつ

$$
f(x)\\le p(x)\\qquad(\\forall x\\in X)
$$

> を満たす線形汎関数 $f:X\\to\\mathbb R$ が存在します。
<!-- formal-statement-end -->

つまり **支配条件を壊さず延長できる** という定理です。`);

const c7='textbook/volumes/00_foundations/F0_02C7_RKHS_再生核_representer_kernel_SVM/index.md';
replaceOnce(c7,
`すべての $x$ について $\\delta_x$ が連続なら、$\\mathcal H$ を **再生核Hilbert空間（RKHS）** といいます。`,
`<a id="def-f0-02c7-rkhs"></a>

<!-- formal-statement-start -->
> **定義（再生核Hilbert空間）**  
> 集合 $\\mathcal X$ 上の実数値関数からなるHilbert空間 $\\mathcal H$ で、すべての $x\\in\\mathcal X$ について評価汎関数 $\\delta_x(f)=f(x)$ が連続であるものを **再生核Hilbert空間（RKHS）** といいます。
<!-- formal-statement-end -->`);
replaceOnce(c7,
`$$
\\boxed{
f(x)
=\\delta_x(f)
=\\langle f,K_x\\rangle_{\\mathcal H}
}
$$

となります。

この式を **再生性** といいます。`,
`<a id="def-f0-02c7-reproducing-property"></a>

<!-- formal-statement-start -->
> **定義（再生性）**  
> RKHS $\\mathcal H$ において、各 $x$ に対応する $K_x\\in\\mathcal H$ が

$$
f(x)=\\langle f,K_x\\rangle_{\\mathcal H}\\qquad(\\forall f\\in\\mathcal H)
$$

> を満たす性質を **再生性** といいます。
<!-- formal-statement-end -->`);
replaceOnce(c7,
`そこで

$$
\\boxed{
K(x,z)=K_z(x)
}
$$

と定めます。`,
`<a id="def-f0-02c7-reproducing-kernel"></a>

<!-- formal-statement-start -->
> **定義（再生核）**  
> RKHSで評価汎関数を表現する $K_x$ を用いて

$$
K(x,z)=K_z(x)
$$

> と定めた二変数関数 $K$ を **再生核** といいます。
<!-- formal-statement-end -->`);
replaceOnce(c7,
`逆向きの発想として、集合 $\\mathcal X$ 上の対称関数

$$
K:\\mathcal X\\times\\mathcal X\\to\\mathbb R
$$

が、任意の有限点列 $x_1,\\dots,x_n$ と係数 $c_1,\\dots,c_n$ に対して

$$
\\boxed{
\\sum_{i,j}c_ic_jK(x_i,x_j)\\ge0
}
$$

を満たすとき、**positive semidefinite kernel** と呼びます。`,
`<a id="def-f0-02c7-psd-kernel"></a>

<!-- formal-statement-start -->
> **定義（positive semidefinite kernel）**  
> 集合 $\\mathcal X$ 上の対称関数 $K:\\mathcal X\\times\\mathcal X\\to\\mathbb R$ が、任意の有限点列 $x_1,\\dots,x_n$ と実係数 $c_1,\\dots,c_n$ に対して

$$
\\sum_{i,j}c_ic_jK(x_i,x_j)\\ge0
$$

> を満たすとき、$K$ を **positive semidefinite kernel** といいます。
<!-- formal-statement-end -->`);
replaceOnce(c7,
`RKHS自身を特徴空間として

$$
\\boxed{
\\varphi(x)=K_x
}
$$

と置けます。

これを **canonical feature map** といいます。`,
`<a id="def-f0-02c7-canonical-feature-map"></a>

<!-- formal-statement-start -->
> **定義（canonical feature map）**  
> RKHS $\\mathcal H$ とその再生核 $K$ に対し、

$$
\\varphi(x)=K_x
$$

> と定める写像 $\\varphi:\\mathcal X\\to\\mathcal H$ を **canonical feature map** といいます。
<!-- formal-statement-end -->`);

const opt='textbook/volumes/00_foundations/F0_02_制約付き最適化_双対_KKT/index.md';
replaceOnce(opt,
`不等式制約には非負の乗数 $\\alpha_i\\ge0$、等式制約には符号制限のない乗数 $\\nu_j$ を付けて

$$
\\boxed{
L(\\boldsymbol x,\\boldsymbol\\alpha,\\boldsymbol\\nu)
=
f(\\boldsymbol x)
+\\sum_{i=1}^m\\alpha_i g_i(\\boldsymbol x)
+\\sum_{j=1}^r\\nu_j h_j(\\boldsymbol x)
}
$$

とします。`,
`<a id="def-f0-02-lagrangian"></a>

<!-- formal-statement-start -->
> **定義（Lagrangian）**  
> 不等式制約 $g_i(\\boldsymbol x)\\le0$ と等式制約 $h_j(\\boldsymbol x)=0$ を持つ最小化問題に対し、$\\alpha_i\\ge0$ と $\\nu_j\\in\\mathbb R$ を用いて

$$
L(\\boldsymbol x,\\boldsymbol\\alpha,\\boldsymbol\\nu)
=f(\\boldsymbol x)+\\sum_{i=1}^m\\alpha_i g_i(\\boldsymbol x)+\\sum_{j=1}^r\\nu_j h_j(\\boldsymbol x)
$$

> と定める関数を **Lagrangian** といいます。
<!-- formal-statement-end -->`);
replaceOnce(opt,
`$\\boldsymbol\\alpha,\\boldsymbol\\nu$ を固定し、$\\boldsymbol x$ についてLagrangianを最小化して

$$
\\boxed{
q(\\boldsymbol\\alpha,\\boldsymbol\\nu)
=
\\inf_{\\boldsymbol x}
L(\\boldsymbol x,\\boldsymbol\\alpha,\\boldsymbol\\nu)
}
$$

と定義します。これを **双対関数** といいます。`,
`<a id="def-f0-02-dual-function"></a>

<!-- formal-statement-start -->
> **定義（双対関数）**  
> Lagrangianに対し

$$
q(\\boldsymbol\\alpha,\\boldsymbol\\nu)=\\inf_{\\boldsymbol x}L(\\boldsymbol x,\\boldsymbol\\alpha,\\boldsymbol\\nu)
$$

> と定める関数を **双対関数** といいます。
<!-- formal-statement-end -->`);
replaceOnce(opt,
`元の問題を **主問題（primal problem）**、この下界を最大化する問題を **双対問題（dual problem）** と呼びます。`,
`<a id="def-f0-02-primal-dual-problem"></a>

<!-- formal-statement-start -->
> **定義（主問題・双対問題）**  
> 元の制約付き最小化問題を **主問題（primal problem）** といい、双対関数 $q$ を $\\alpha_i\\ge0$ の下で最大化する問題を **双対問題（dual problem）** といいます。
<!-- formal-statement-end -->`);
replaceOnce(opt,
`常に成り立つ

$$
q(\\boldsymbol\\alpha,\\boldsymbol\\nu)\\le p^*
$$

を **弱双対性** といいます。

一方、主問題の最適値 $p^*$ と双対問題の最適値 $d^*$ が

$$
\\boxed{p^*=d^*}
$$

となることを **強双対性** といいます。`,
`<a id="def-f0-02-weak-strong-duality"></a>

<!-- formal-statement-start -->
> **定義（弱双対性・強双対性）**  
> 主問題の最適値を $p^*$ とすると、任意の双対実行可能点で $q(\\boldsymbol\\alpha,\\boldsymbol\\nu)\\le p^*$ が成り立つ性質を **弱双対性** といいます。双対問題の最適値を $d^*$ としたとき

$$
p^*=d^*
$$

> が成り立つことを **強双対性** といいます。
<!-- formal-statement-end -->`);
replaceOnce(opt,
`このような制約を **activeな制約** といいます。`,
`<a id="def-f0-02-active-constraint"></a>

<!-- formal-statement-start -->
> **定義（activeな制約）**  
> 不等式制約 $g_i(\\boldsymbol x)\\le0$ が点 $\\boldsymbol x^*$ で $g_i(\\boldsymbol x^*)=0$ を満たすとき、その制約を $\\boldsymbol x^*$ で **activeな制約** といいます。
<!-- formal-statement-end -->`);

const baseline='scripts/implicit-formal-baseline.txt';
let lines=fs.readFileSync(baseline,'utf8').split(/\r?\n/).filter(Boolean);
const prefixes=[
 'textbook/volumes/00_foundations/F0_00G_凸集合_凸関数_凸最適化/index.md\t',
 'textbook/volumes/00_foundations/F0_02A_KKT条件の導出_接錐_polar_Farkas/index.md\t',
 'textbook/volumes/00_foundations/F0_02B_分離超平面定理_Farkas_SVM/index.md\t',
 'textbook/volumes/00_foundations/F0_02C4A_tangent_polar_dual_cone/index.md\t',
 'textbook/volumes/00_foundations/F0_02C4_凸解析_劣勾配_normal_cone_双対錐/index.md\t',
 'textbook/volumes/00_foundations/F0_02C6_Hahn_Banach_分離定理/index.md\t',
 'textbook/volumes/00_foundations/F0_02C7_RKHS_再生核_representer_kernel_SVM/index.md\t',
 'textbook/volumes/00_foundations/F0_02_制約付き最適化_双対_KKT/index.md\t',
];
lines=lines.filter(line=>!prefixes.some(p=>line.startsWith(p)));
fs.writeFileSync(baseline,`${lines.join('\n')}\n`);
console.log(`Batch 4 complete. Baseline now has ${lines.length} entries.`);
