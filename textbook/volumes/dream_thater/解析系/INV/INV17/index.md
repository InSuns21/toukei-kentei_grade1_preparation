# INV17 PDEの係数から観測までをどう微分するか

<!-- definition-example-audit: strict -->

[INV1 の逆問題](../INV1/index.md#def-inv1-forward-map)は、未知量を観測へ送る forward map を起点にしました。[INV10 の Fréchet 微分](../INV10/index.md#def-inv10-frechet-forward)では、明示式を持つ写像を一次近似できました。しかし拡散係数の同定では、「係数を入れる → PDE を解く → 解の一部を観測する」という二段階を経ないと forward map の値さえ出ません。

ここで問うのは、その二段階を**関数空間で正しく微分**できるか、ということです。零 Dirichlet 境界条件をもつ一次元拡散問題に絞り、状態の存在一意性、係数摂動の感度方程式、観測微分、一次近似の二次剰余まで証明します。観測残差の目的関数・随伴法による勾配は次講に譲ります。

本講の主な到達点は次のとおりです。

1. 未知の外力と未知の拡散係数を区別し、係数に対する許容集合を正しく選ぶ。
2. 零境界条件の弱形式から、係数と外力に依存する状態の存在・一意性・エネルギー評価を確かめる。
3. 係数を変化させたとき PDE の解を $L^\infty$ ノルムで Fréchet 微分できることを、感度方程式と二次剰余評価で証明する。
4. 状態を観測する写像にも微分を伝え、具体的な空間依存摂動の感度を手計算する。
5. 一次感度が零になる方向と、元の非線形問題の識別性を混同しない。

## 1. 何を未知にするか：外力か、拡散係数か

領域を $I=(0,1)$ とし、考える方程式は

$$
-(a(x)u'(x))'=f(x)\quad(0<x<1),
\qquad u(0)=u(1)=0
$$

です。ここでは $u$ が PDE の解（状態変数）、$f$ が外力、$a$ が拡散係数です。記号 $'$ は位置 $x$ に関する弱微分または、滑らかな場合には通常の導関数です。

$u$ の値を一部だけ測定するとき、$a$ を既知として $f$ を戻すのが**外力逆問題**、$f$ を既知として $a$ を戻すのが**係数逆問題**です。以下では $f$ を固定し、$a$ を動かします。前者も後で比較します。

境界条件を点ごとの等式として仮定する代わりに、試験空間・状態空間を

$$
V=H_0^1(0,1),\qquad
\|v\|_V=\|v'\|_{L^2(0,1)}
$$

と定めます。[零 Dirichlet 空間の定義](../../GPDE/GPDE4/index.md#def-gpde4-h01)、[区間での零トレースの特徴付け](../../GPDE/GPDE4/index.md#thm-gpde4-h01-trace-kernel-interval)により、$V$ の元の端点トレースは0です。また [Poincaré 不等式](../../GPDE/GPDE4/index.md#thm-gpde4-poincare)から

$$
\|v\|_{L^2}\le C_P\|v'\|_{L^2}
$$

を満たす定数 $C_P>0$ があり、$\|\cdot\|_V$ は $V$ 上の完備な Hilbert ノルムです。例えば $v\in V$ の絶対連続代表について $v(x)=\int_0^x v'(s)\,ds$ なので $|v(x)|\le\|v'\|_2$、よって本講では $C_P=1$ と選んでも構いません。

**拡散係数の下限が必要な理由**は、$a$ が零に近い場所では $a|u'|^2$ が勾配を制御しなくなるためです。[一様楕円性](../../GPDE/GPDE8/index.md#def-gpde8-uniform-ellipticity)の一次元版として、ほとんど至る所で正の共通下界を要求します。先行章の行列値係数を一次元の $1\times1$ 行列 $A(x)=[a(x)]$ と置くと、その判定条件は

$
\xi^{\mathsf T}A(x)\xi=a(x)\xi^2\ge\lambda\xi^2
\qquad(\xi\in\mathbb R)
$

です。$\xi=1$ を選べば $a(x)\ge\lambda>0$ が必要で、逆にこの下限があれば全ての $\xi$ について不等式が成立します。したがって**行列の条件と係数の一様正値性はこの一次元設定で同値**です。$L^\infty(I)$ はほとんど至る所等しい有界可測関数の同値類を本質的上限ノルムで測る実 Banach 空間です。

<a id="def-inv17-admissible-coefficients"></a>

<!-- formal-statement-start -->
> **定義（一様正値係数の許容集合）**  
> 実 Banach 空間 $X=L^\infty(I)$（$I=(0,1)$）において、係数の許容集合を

$$
\mathcal U=\{a\in X:\ \operatorname*{ess\,inf}_{x\in I}a(x)>0\}
$$

> と定める。$a\in\mathcal U$ に対し、$a_*>0$ は $a(x)\ge a_*$ がほとんど至る所で成り立つ任意の定数を表す。$a_*$ は $a$ ごとに選んでよい。
<!-- formal-statement-end -->

<!-- definition-example-start: def-inv17-admissible-coefficients -->

**定義の確認**：$a(x)=2+\sin(2\pi x)$ は $1\le a(x)\le3$ を全ての $x$ で満たすので $L^\infty$ に属し、$a_*=1$ を取れます。一方 $a(x)=x$ は $L^\infty(0,1)$ に属しますが、任意の $\varepsilon>0$ で $0<x<\varepsilon$ の部分に $a(x)<\varepsilon$ の正測度集合があり、本質的下限は0です。したがって $\mathcal U$ に入りません。

さらに $a\ge a_*>0$ で $\|h\|_\infty<a_*$ なら $a+h\ge a_*-\|h\|_\infty>0$ がほとんど至る所で成立します。よって $\mathcal U$ は $L^\infty$ の**開集合**です。後に Fréchet 微分を定義できるのは、この開性があるからです。

<!-- definition-example-end -->

## 2. PDEを解いて初めて状態写像が定まる

[楕円型 PDE の弱形式](../../GPDE/GPDE8/index.md#def-gpde8-dirichlet-weak-solution)を、係数行列 $A=[a]$、低階項 $b=c=0$ の場合に特殊化します。まず滑らかな係数 $a$ と状態 $u$、試験関数 $v\in C_c^\infty(I)$ を考えると、部分積分により

$$
\int_0^1-(au')'v\,dx
=\int_0^1au'v'\,dx-\bigl[au'v\bigr]_{0}^{1}
=\int_0^1au'v'\,dx
$$

です。境界項が消えるのは $v$ が端点で0だからです。一般の $a\in L^\infty$ では $(au')'$ を点ごとの古典微分で扱わず、右辺の積分恒等式を採用します。

<a id="def-inv17-state-observation"></a>

<!-- formal-statement-start -->
> **定義（状態写像と観測写像）**  
> $I=(0,1)$、$V=H_0^1(I)$、$f\in L^2(I)$ を固定する。各 $a\in\mathcal U$ に対して、任意の $v\in V$ について

$$
\int_0^1 a(x)u'(x)v'(x)\,dx
=\int_0^1 f(x)v(x)\,dx
$$

> を満たす $u\in V$ がただ一つ存在するとき、それを $S(a)=u$ と書き、$S:\mathcal U\to V$ を**係数から状態への写像**とする。さらに有界線形作用素 $O:V\to\mathbb R^m$（$m\ge1$）を固定し、

$$
G(a)=O(S(a))\in\mathbb R^m
$$

> を**係数から観測への写像**とする。$O$ を観測作用素という。
<!-- formal-statement-end -->

<!-- definition-example-start: def-inv17-state-observation -->

**定義の確認**：$f(x)=1$、$a(x)=c$（定数 $c>0$）とすると、

$$
u_c(x)=\frac{x(1-x)}{2c},\qquad
u_c'(x)=\frac{1-2x}{2c},\qquad
-(cu_c')'=1
$$

です。$u_c(0)=u_c(1)=0$ なので $u_c\in V$ です。[古典形から弱形式への部分積分](../../GPDE/GPDE6/index.md#thm-gpde6-classical-to-variational)と同じ操作で、全ての $v\in V$ に対して $\int cu_c'v'=\int v$ が成立します。存在と一意性は次の定理で保証します。

一つの測定として、**状態の空間平均**を $O(v)=\int_0^1v(x)\,dx$ と定めます。$V$ の元は $L^2$ 関数なので積分可能であり、Cauchy–Schwarz と [Poincaré 不等式](../../GPDE/GPDE4/index.md#thm-gpde4-poincare)から

$$
|O(v)|\le\|1\|_2\|v\|_2\le C_P\|v\|_V
$$

です。線形性は積分の線形性から従い、$O:V\to\mathbb R$ は有界線形です。ゆえに

$$
G(c)=\int_0^1\frac{x(1-x)}{2c}\,dx
=\frac1{2c}\left(\frac12-\frac13\right)
=\frac1{12c}.
$$

この計算は**係数→状態→観測**の全ての段階を実際に確認しています。

<!-- definition-example-end -->

複数センサなら $g_1,\ldots,g_m\in L^2(I)$ を与えて $O_i(v)=\int_0^1g_i v$ とできます。各成分に上と同じ評価を使えば

$$
\|O(v)\|_{\mathbb R^m}
\le C_P\left(\sum_{i=1}^m\|g_i\|_2^2\right)^{1/2}\|v\|_V.
$$

**境界での点観測**を状態平均と同一視してはいけません。例えばこの零境界条件では $u(0)=u(1)=0$ は係数にかかわらず既知です。内部の点値 $u(x_0)$ は一次元のトレース／絶対連続代表により有界な評価写像となりますが、一般の高次元 $H^1$ に点値観測を無条件で導入することはできません。

<a id="thm-inv17-state-existence"></a>

<!-- formal-statement-start -->
> **定理（一様正値係数に対する状態の存在・一意性と評価）**  
> $I=(0,1)$、$V=H_0^1(I)$、$f\in L^2(I)$、$a\in\mathcal U$ とし、$a(x)\ge a_*>0$ がほとんど至る所で成立するとする。このとき[状態の弱方程式](#def-inv17-state-observation)には唯一の $u=S(a)\in V$ があり、

$$
\|S(a)\|_V\le\frac{C_P}{a_*}\|f\|_{L^2}
$$

> が成り立つ。境界条件は $H_0^1$ の零トレースとして課される。
<!-- formal-statement-end -->

### 証明の見取り図

双線形形式の有界性には $\|a\|_\infty$、強圧性には $a_*$ を使います。外力が連続線形汎関数であることを確認して、[Lax--Milgram 定理](../../GPDE/GPDE7/index.md#thm-gpde7-lax-milgram)を適用します。最後に試験関数を解自身に選びます。

<!-- proof-start -->
### 証明

$B_a(u,v)=\int_0^1 au'v'$、$\ell_f(v)=\int_0^1fv$ とおきます。$u,v\in V$ について

$$
|B_a(u,v)|
\le\|a\|_\infty\|u'\|_2\|v'\|_2
=\|a\|_\infty\|u\|_V\|v\|_V
$$

ですから $B_a$ は有界双線形形式です。係数の下限から

$$
B_a(v,v)=\int_0^1a|v'|^2\,dx
\ge a_*\|v\|_V^2
$$

となり、[強圧性の定義](../../GPDE/GPDE6/index.md#def-gpde6-coercive)を定数 $a_*$ で満たします。さらに

$$
|\ell_f(v)|\le\|f\|_2\|v\|_2
\le C_P\|f\|_2\|v\|_V
$$

なので $\ell_f\in V^*$ です。$V$ は実 Hilbert 空間なので、[Lax--Milgram 定理](../../GPDE/GPDE7/index.md#thm-gpde7-lax-milgram)の全条件が揃い、$B_a(u,v)=\ell_f(v)$ を全 $v$ について満たす唯一の $u\in V$ が存在します。

$v=u$ を代入して

$$
a_*\|u\|_V^2
\le B_a(u,u)=\ell_f(u)
\le C_P\|f\|_2\|u\|_V
$$

です。$u=0$ なら結論は自明、それ以外なら $\|u\|_V$ を割って評価が得られます。
<!-- proof-end -->

## 3. 係数の変化は別の弱方程式として現れる

$a\in\mathcal U$ を固定し、$h\in L^\infty(I)$ を係数の増分とします。小さな $\|h\|_\infty$ では $a+h\in\mathcal U$ です。$u=S(a)$ と $u_h=S(a+h)$ はそれぞれ

$$
\int_0^1au'v'=\int_0^1fv,\qquad
\int_0^1(a+h)u_h'v'=\int_0^1fv
$$

を満たします。差 $d_h=u_h-u\in V$ を取り、**同じ係数で整理する**と

$$
\int_0^1 a d_h'v'=-\int_0^1h u_h'v'
$$

です。一方、**摂動後の係数で整理する**と

$$
\int_0^1(a+h)d_h'v'=-\int_0^1h u'v'
$$

です。この二式は同値ですが、前者は微分の剰余、後者は差の上界を求めるのに便利です。

一次の感度 $w$ は $u_h'$ の代わりに基準状態の $u'$ を入れた次の弱方程式で定まります。

<a id="def-inv17-sensitivity-equation"></a>

<!-- formal-statement-start -->
> **定義（係数感度方程式）**  
> $a\in\mathcal U$、$a\ge a_*>0$、$u=S(a)$、$h\in L^\infty(I)$ を固定する。全ての $v\in V=H_0^1(I)$ に対して

$$
\int_0^1 a(x)w'(x)v'(x)\,dx
=-\int_0^1 h(x)u'(x)v'(x)\,dx
$$

> を満たす唯一の $w\in V$ を、方向 $h$ に対する**係数感度**とする。記号 $w=W_a[h]$ を用いる。形式的な強い形は

$$
-(aw')'=(hu')',\qquad w(0)=w(1)=0
$$

> であり、右辺は一般に超関数として解釈する。
<!-- formal-statement-end -->

<!-- definition-example-start: def-inv17-sensitivity-equation -->

**定義の確認**：前節の $a=c>0$、$f=1$ に対し、方向を定数 $h(x)=\eta$ とします。$u_c=x(1-x)/(2c)$ だから

$$
w(x)=-\frac{\eta x(1-x)}{2c^2},
\qquad
w'(x)=-\frac{\eta}{c}u_c'(x).
$$

この $w$ は $V$ に属し、両端で零です。任意の $v\in V$ について

$$
\int_0^1c w'v'
=-\int_0^1\eta u_c'v'
$$

であり、感度方程式を満たします。単に微分公式に代入するのではなく、**境界条件と全試験関数に対する弱形式**を確認しました。唯一性は次の定理で示します。

<!-- definition-example-end -->

<a id="thm-inv17-frechet-state"></a>

<!-- formal-statement-start -->
> **定理（係数から状態への写像の Fréchet 微分）**  
> $I=(0,1)$、$V=H_0^1(I)$、$\mathcal U\subset L^\infty(I)$ を上の許容集合、$f\in L^2(I)$ を固定する。このとき $S:\mathcal U\to V$ は各 $a\in\mathcal U$ で Fréchet 微分可能であり、

$$
DS(a)h=W_a[h]\qquad(h\in L^\infty(I))
$$

> である。ここで $W_a[h]\in V$ は[係数感度方程式](#def-inv17-sensitivity-equation)の唯一解である。$a\ge a_*>0$ を選ぶと

$$
\|DS(a)h\|_V\le
\frac{\|h\|_\infty}{a_*}\|S(a)\|_V
$$

> であり、$\|h\|_\infty\le a_*/2$ のとき、一次近似の剰余に対して

$$
\|S(a+h)-S(a)-DS(a)h\|_V
\le\frac{2\|h\|_\infty^2}{a_*^2}\|S(a)\|_V
$$

> が成り立つ。
<!-- formal-statement-end -->

### 証明の見取り図

まず[状態の存在定理](#thm-inv17-state-existence)を感度方程式にも適用して $W_a[h]$ の存在・一意性と $h$ に関する有界線形性を示します。次に $u_h-u$ を摂動後の係数で評価し、$r_h=u_h-u-W_a[h]$ を元の係数で評価します。後者の右辺には $h$ が二度現れるので二次になります。

<!-- proof-start -->
### 証明

**(1) 感度の可解性と線形性。** $u=S(a)$ を固定して、感度方程式の右辺を $q_h(v)=-\int_0^1hu'v'$ と置きます。任意の $v\in V$ に対して

$$
|q_h(v)|\le\|h\|_\infty\|u\|_V\|v\|_V.
$$

よって $q_h\in V^*$ です。$B_a$ は[状態の存在定理](#thm-inv17-state-existence)で有界かつ強圧的と確認しました。[Lax--Milgram 定理](../../GPDE/GPDE7/index.md#thm-gpde7-lax-milgram)から $W_a[h]\in V$ がただ一つ存在します。$v=W_a[h]$ を代入して

$$
a_*\|W_a[h]\|_V^2
\le\|h\|_\infty\|u\|_V\|W_a[h]\|_V
$$

を得て、$W_a[h]=0$ の場合も含め上の一次評価が成立します。$q_{h_1+h_2}=q_{h_1}+q_{h_2}$、$q_{th}=tq_h$ と解の一意性を合わせると、$h\mapsto W_a[h]$ は線形です。一次評価により有界なので $W_a$ は有界線形作用素 $L^\infty\to V$ です。

**(2) 状態差の評価。** $\rho=\|h\|_\infty\le a_*/2$ とします。$a+h\ge a_*-\rho>0$ だから $u_h=S(a+h)$ が存在します。前節の二つ目の差の式で $v=d_h$ を取り、

$$
(a_*-\rho)\|d_h\|_V^2
\le\left|\int_0^1hu'd_h'\right|
\le\rho\|u\|_V\|d_h\|_V
$$

です。零の場合を分けてから $\|d_h\|_V$ を割ると

$$
\|u_h-u\|_V
\le\frac{\rho}{a_*-\rho}\|u\|_V
\le\frac{2\rho}{a_*}\|u\|_V.
$$

**(3) 二次剰余。** $r_h=u_h-u-W_a[h]=d_h-W_a[h]$ とします。最初の差の式から感度方程式を引くと、全 $v\in V$ について

$$
\int_0^1 ar_h'v'
=-\int_0^1h(u_h'-u')v'
=-\int_0^1hd_h'v'.
$$

$v=r_h$ を取り強圧性と Cauchy–Schwarz から

$$
a_*\|r_h\|_V^2
\le\rho\|d_h\|_V\|r_h\|_V.
$$

したがって

$$
\|r_h\|_V
\le\frac{\rho}{a_*}\|d_h\|_V
\le\frac{\rho^2}{a_*(a_*-\rho)}\|u\|_V
\le\frac{2\rho^2}{a_*^2}\|u\|_V.
$$

$h\ne0$ について $\rho$ で割れば、右辺は $(2\rho/a_*^2)\|u\|_V\to0$ です。従って [Fréchet 微分の定義](../INV10/index.md#def-inv10-frechet-forward)の剰余条件を $X=L^\infty$、$Y=V$ で満たし、$DS(a)=W_a$ です。
<!-- proof-end -->

**符号に注意。** 元の方程式 $-(au')'=f$ に $a+\varepsilon h$、$u+\varepsilon w$ を代入し $\varepsilon$ の一次項を取ると、$-(aw')'-(hu')'=0$、すなわち $-(aw')'=(hu')'$ です。弱形式では右辺が $-\int hu'v'$ になります。強い形の右辺を $-(hu')'$ と書くと符号が逆です。

また $h$ は $L^\infty$ で十分であり、$h'$ の存在を仮定していません。強い形を微分方程式として点ごとに読むためには追加の正則性が必要です。

## 4. 観測の微分と、空間的に変わる方向の具体計算

<a id="cor-inv17-observation-derivative"></a>

<!-- formal-statement-start -->
> **系（係数から観測への写像の微分）**  
> [状態微分の定理](#thm-inv17-frechet-state)の全仮定の下で、$m\ge1$、有界線形作用素 $O:V\to\mathbb R^m$ を固定する。このとき $G=O\circ S:\mathcal U\to\mathbb R^m$ は Fréchet 微分可能で、

$$
DG(a)h=O(W_a[h])
$$

> を満たす。$\|h\|_\infty\le a_*/2$ なら

$$
\|G(a+h)-G(a)-DG(a)h\|
\le\frac{2\|O\|\|h\|_\infty^2}{a_*^2}\|S(a)\|_V.
$$
<!-- formal-statement-end -->

### 証明の見取り図

状態微分の一次項 $W_a[h]$ と二次剰余 $r_h$ に、有界線形な $O$ を作用させます。観測の別の微分規則を仮定する必要はありません。

<!-- proof-start -->
### 証明

線形性により

$$
G(a+h)-G(a)
=O(S(a+h)-S(a))
=O(W_a[h])+O(r_h).
$$

$h\mapsto O(W_a[h])$ は有界線形です（有界線形写像の合成）。また

$$
\|O(r_h)\|\le\|O\|\|r_h\|_V
\le\frac{2\|O\|\|h\|_\infty^2}{a_*^2}\|S(a)\|_V
$$

です。$\|h\|_\infty$ で割った剰余は0へ収束するので、Fréchet 微分の定義から結論が従います。
<!-- proof-end -->

### 計算例：一様係数に $h(x)=x$ を加える

$f=1$、$a(x)=1$、$O(v)=\int_0^1v$ とします。基準状態は $u(x)=x(1-x)/2$、したがって $u'(x)=1/2-x$ です。係数摂動 $h(x)=x$ について感度方程式は

$$
\int_0^1w'v'=-\int_0^1x(1/2-x)v'
\qquad(v\in V)
$$

です。この式を移項すると、$z=w'+xu'\in L^2(I)$ は $\int_0^1zv'=0$ を全ての $v\in V$ について満たします。ここで $v\in V$ なら $\int_0^1v'=v(1)-v(0)=0$ です。逆に平均零の任意の $g\in L^2(I)$ に対し $v(x)=\int_0^xg(s)\,ds$ と置けば、$v(0)=v(1)=0$、$v'=g$ なので $v\in V$ です。

そこで $\bar z=\int_0^1z(x)\,dx$ とし、$g=z-\bar z$ を代入すると

$
0=\int_0^1z(z-\bar z)\,dx
=\int_0^1(z-\bar z)^2\,dx.
$

よって $z=\bar z$ がほとんど至る所で成立します。すなわち弱方程式は、ある定数 $C$ を用いた $w'=-xu'+C$ という表示と同値です。この定数は境界条件から決めます。

ただし、**境界条件 $w(1)=w(0)=0$ を使って $C$ を決定**する必要があります。

$$
0=\int_0^1w'\,dx
=-\int_0^1x(1/2-x)\,dx+C
=-\left(\frac14-\frac13\right)+C.
$$

従って $C=-1/12$ であり、

$$
w'(x)=x^2-\frac x2-\frac1{12},
\qquad
w(x)=\frac{x^3}{3}-\frac{x^2}{4}-\frac x{12}.
$$

積分定数は $w(0)=0$ で零にしました。$w(1)=1/3-1/4-1/12=0$ なので $w\in V$ で、感度方程式の全条件を満たします。[観測微分の系](#cor-inv17-observation-derivative)から

$$
\begin{aligned}
DG(1)[x]
&=\int_0^1w(x)\,dx\\
&=\frac1{12}-\frac1{12}-\frac1{24}
=-\frac1{24}.
\end{aligned}
$$

係数を右側ほど増やすと平均状態が一次の精度で減少します。これは状態の値を微分したのではなく、**PDE を解いた結果を微分した**ことに相当します。

### 一次感度だけで識別可能性を断定しない

定数方向 $h=1$ では、前節の例から $DG(1)[1]=-1/12$ です。従って線形性により

$$
DG(1)[x-\tfrac12]
=-\frac1{24}-\frac12\left(-\frac1{12}\right)=0.
$$

零ではない係数摂動 $h=x-1/2$ が、空間平均の**一次変化**には現れません。これは $DG(1):L^\infty\to\mathbb R$ が単射でない具体例です。ただし [局所識別可能性](../INV10/index.md#def-inv10-local-identifiability)は $G(a_1)=G(a_2)$ という**元の非線形写像**で判定するものであり、微分の核だけを根拠に一般の非一意性を証明したことにはなりません。観測設計と随伴感度の接続は次講で扱います。

## 5. 外力を未知にした場合との比較

同じ PDE でも、$a\in\mathcal U$ を固定して $f$ を動かすと話は変わります。$T_a(f)$ を全 $v\in V$ に対し $\int_0^1a(x)(T_a(f))'(x)v'(x)\,dx=\int_0^1f(x)v(x)\,dx$ を満たす唯一解とします。ここでプライムは $f$ での微分ではなく、状態 $T_a(f)$ の空間変数 $x$ に関する弱微分です。これは $L^2(I)\to V$ の線形写像です。

<a id="prop-inv17-source-derivative"></a>

<!-- formal-statement-start -->
> **命題（外力から状態への写像は線形）**  
> $I=(0,1)$、$V=H_0^1(I)$、$a\in\mathcal U$ で $a\ge a_*>0$ とする。任意の $f\in L^2(I)$ に対し上の弱方程式が定める $T_a(f)\in V$ は有界線形であり、

$$
\|T_a(f)\|_V\le\frac{C_P}{a_*}\|f\|_2,
\qquad
DT_a(f)g=T_a(g)
$$

> が全ての $f,g\in L^2(I)$ で成立する。この場合の Fréchet 剰余は恒等的に零である。
<!-- formal-statement-end -->

### 証明の見取り図

弱方程式の右辺は $f$ に線形です。解の一意性が状態写像の線形性を保証し、存在定理の評価が有界性を与えます。

<!-- proof-start -->
### 証明

$f_1,f_2\in L^2$、$\alpha,\beta\in\mathbb R$ を取ります。$u_i=T_a(f_i)$ に対して、任意の $v\in V$ で

$$
\int_0^1 a(\alpha u_1+\beta u_2)'v'
=\alpha\int_0^1f_1v+\beta\int_0^1f_2v
=\int_0^1(\alpha f_1+\beta f_2)v.
$$

[状態の存在・一意性定理](#thm-inv17-state-existence)の唯一性から $T_a(\alpha f_1+\beta f_2)=\alpha u_1+\beta u_2$ です。同じ定理の評価は $\|T_af\|_V\le(C_P/a_*)\|f\|_2$ を与えます。従って

$$
T_a(f+g)-T_a(f)-T_a(g)=0
$$

であり、[Fréchet 微分の定義](../INV10/index.md#def-inv10-frechet-forward)を剰余零で満たします。
<!-- proof-end -->

外力については状態写像そのものが線形なのに対し、**係数については一般に非線形**です。例えば $G(c)=1/(12c)$ は $c>0$ に関して線形ではありません。[INV8 の一般変分正則化目的関数](../INV8/index.md#def-inv8-variational-objective)でこのような $G$ を使うと、PDE 制約式の解法と最適化問題の解法を区別する必要があります。

## 演習

全問で $I=(0,1)$、$V=H_0^1(I)$、$\|v\|_V=\|v'\|_2$ とします。必要な箇所では係数をほとんど至る所で下から有界とし、弱方程式の試験関数は全ての $v\in V$ とします。

### Level A：定義と直接確認

<a id="ex-inv17-a01"></a>

### INV17-A01 拡散方程式の直接解を弱形式で確かめる

- Level: A

$a(x)=2$、$f(x)=1$ とする。$u(x)=x(1-x)/4$ が拡散問題の唯一の弱解であることを、端点条件・弱形式・存在一意性の順に確認せよ。

<!-- solution-start -->
#### 詳細解答

$u$ は多項式で $u(0)=u(1)=0$、従って $u\in V$ です。$u'=(1-2x)/4$ より $(2u')'=-1$ です。$v\in V$ は端点トレース零なので部分積分で

$$
\int_0^1 2u'v'
=[2u'v]_0^1-\int_0^1(2u')'v
=\int_0^1v=\int_0^1fv.
$$

$a=2$ は本質的下限2、上限2を持つので[状態の存在一意性定理](#thm-inv17-state-existence)が適用でき、確認した $u$ が唯一解です。
<!-- solution-end -->

<a id="ex-inv17-a02"></a>

### INV17-A02 許容集合と開性

- Level: A

$a_1(x)=2+\sin(2\pi x)$、$a_2(x)=x$ は $L^\infty(I)$ に属する。どちらが $\mathcal U$ に属するか示せ。また $a_1+h$ が確実に $\mathcal U$ に属する $\|h\|_\infty$ の十分条件を一つ与えよ。

<!-- solution-start -->
#### 詳細解答

$1\le a_1(x)\le3$ なので本質的下限が1以上であり、[許容集合の定義](#def-inv17-admissible-coefficients)から $a_1\in\mathcal U$ です。$a_2=x$ は $\|a_2\|_\infty=1$ ですが、任意の $\varepsilon>0$ に対して $0<x<\min(\varepsilon,1)$ で $a_2<\varepsilon$ となる正測度集合があるため本質的下限は0です。よって $a_2\notin\mathcal U$ です。

$\|h\|_\infty<1$ ならほとんど至る所で $a_1+h\ge1-\|h\|_\infty>0$ です。この評価は所属を保証する十分条件です。上界だけで所属を特徴付けるものではありません。
<!-- solution-end -->

<a id="ex-inv17-a03"></a>

### INV17-A03 空間平均は有界線形な観測か

- Level: A

$O(v)=\int_0^1v(x)\,dx$ とする。$O:V\to\mathbb R$ が有界線形であることを示し、$a=c>0$、$f=1$ の観測値を求めよ。

<!-- solution-start -->
#### 詳細解答

積分の線形性から $O(\alpha v+\beta w)=\alpha O(v)+\beta O(w)$ です。Cauchy–Schwarz と[Poincaré 不等式](../../GPDE/GPDE4/index.md#thm-gpde4-poincare)により

$$
|O(v)|=|\langle1,v\rangle_{L^2}|
\le\|1\|_2\|v\|_2
\le C_P\|v\|_V.
$$

従って有界線形です。[定義の確認例](#def-inv17-state-observation)の状態 $u=x(1-x)/(2c)$ を積分すると

$$
O(u)=\frac1{2c}\int_0^1(x-x^2)\,dx
=\frac1{2c}\left(\frac12-\frac13\right)=\frac1{12c}.
$$
<!-- solution-end -->

<a id="ex-inv17-a04"></a>

### INV17-A04 定数方向の感度と境界条件

- Level: A

$a=c>0$、$f=1$、$h=\eta$（定数）とする。$w=-\eta x(1-x)/(2c^2)$ が感度方程式を満たすことを示し、空間平均の方向微分 $DG(c)[\eta]$ を求めよ。

<!-- solution-start -->
#### 詳細解答

$w(0)=w(1)=0$ なので $w\in V$ です。基準状態 $u=x(1-x)/(2c)$ と比較して $w'=-(\eta/c)u'$ です。ゆえに任意の $v\in V$ に対し

$$
\int_0^1cw'v'=-\int_0^1\eta u'v'
$$

であり、[感度方程式](#def-inv17-sensitivity-equation)を満たします。解は一意なので $w=DS(c)[\eta]$ です。[観測微分の系](#cor-inv17-observation-derivative)より

$$
DG(c)[\eta]=\int_0^1w(x)\,dx
=-\frac{\eta}{2c^2}\left(\frac12-\frac13\right)
=-\frac{\eta}{12c^2}.
$$
<!-- solution-end -->

<a id="ex-inv17-a05"></a>

### INV17-A05 外力の増分には二次剰余がない

- Level: A

$a=2$ を固定し、$f_0=1$、$g=2$ とする。$T_2(f_0)$、$T_2(g)$、$T_2(f_0+tg)$ を求め、$DT_2(f_0)g=T_2(g)$ を直接確かめよ。

<!-- solution-start -->
#### 詳細解答

定数外力 $q$ について $-(2u')'=q$、零端点条件を積分すると $T_2(q)=qx(1-x)/4$ です。従って

$$
T_2(f_0)=\frac{x(1-x)}4,\quad
T_2(g)=\frac{x(1-x)}2,\quad
T_2(f_0+tg)=\frac{(1+2t)x(1-x)}4.
$$

差を取ると $T_2(f_0+tg)-T_2(f_0)=t\,x(1-x)/2=tT_2(g)$ なので、[外力微分の命題](#prop-inv17-source-derivative)の一次近似は厳密に一致し、剰余は全ての $t$ で0です。
<!-- solution-end -->

### Level B：導出・検算と仮定の境界

<a id="ex-inv17-b01"></a>

### INV17-B01 二つの差の弱形式と二次剰余

- Level: B

$a\in\mathcal U$、$a\ge a_*>0$、$\rho=\|h\|_\infty<a_*$ とし、$u=S(a)$、$u_h=S(a+h)$、$w=W_a[h]$ とする。$(a+h)$ と $a$ のそれぞれで整理した状態差の式を導き、

$$
\|u_h-u-w\|_V
\le\frac{\rho^2}{a_*(a_*-\rho)}\|u\|_V
$$

を示せ。

<!-- solution-start -->
#### 詳細解答

両方の状態の弱方程式を引くと

$$
\int_0^1\{(a+h)u_h'-au'\}v'=0.
$$

括弧を $(a+h)(u_h'-u')+hu'$ と展開すれば

$$
\int_0^1(a+h)(u_h-u)'v'=-\int_0^1hu'v'.
$$

同じ括弧を $a(u_h'-u')+hu_h'$ と展開すれば

$$
\int_0^1a(u_h-u)'v'=-\int_0^1hu_h'v'.
$$

$d=u_h-u$ とおき、前者に $v=d$ を入れると $(a_*-\rho)\|d\|_V^2\le\rho\|u\|_V\|d\|_V$ なので $\|d\|_V\le\rho\|u\|_V/(a_*-\rho)$ です。後者から[感度方程式](#def-inv17-sensitivity-equation)を引けば $r=d-w$ は

$$
\int_0^1ar'v'=-\int_0^1hd'v'
$$

を満たします。$v=r$ として $a_*\|r\|_V\le\rho\|d\|_V$ を得るので、両評価を掛け合わせれば目的の二次剰余評価です。零ノルムの場合は割算を省略して同じ結論になります。
<!-- solution-end -->

<a id="ex-inv17-b02"></a>

### INV17-B02 空間依存の感度方程式を解く

- Level: B

$a=1$、$f=1$、$h(x)=x$、$O(v)=\int_0^1v$ とする。感度 $w$ を求めて両端点条件を確認し、$DG(1)[x]$ を積分で求めよ。

<!-- solution-start -->
#### 詳細解答

基準状態は $u=x(1-x)/2$ で、$u'=1/2-x$ です。[感度方程式](#def-inv17-sensitivity-equation)は $\int w'v'=-\int xu'v'$ です。$w'=-xu'+C$ と置くと、全 $v\in V$ に対して定数項の積分 $\int Cv'=C(v(1)-v(0))=0$ なので式を満たします。

$w(1)-w(0)=0$ より

$$
0=\int_0^1w'
=-\int_0^1\left(\frac x2-x^2\right)dx+C
=-\left(\frac14-\frac13\right)+C,
$$

従って $C=-1/12$ です。$w(0)=0$ を用いて積分すると

$$
w(x)=\int_0^x\left(s^2-\frac s2-\frac1{12}\right)ds
=\frac{x^3}3-\frac{x^2}4-\frac x{12}.
$$

$w(1)=0$ を再確認できます。[観測微分の系](#cor-inv17-observation-derivative)を使い

$$
DG(1)[x]=\int_0^1w
=\frac1{12}-\frac1{12}-\frac1{24}
=-\frac1{24}.
$$
<!-- solution-end -->

<a id="ex-inv17-b03"></a>

### INV17-B03 定数係数で有限差分の誤差を検算する

- Level: B

$a=1$、$f=1$、$O(v)=\int_0^1v$ とし、定数方向 $h=1$ を考える。$|t|<1/2$ に対して $G(1+t)$ の厳密式、一次近似 $G(1)+tDG(1)[1]$、その差を計算し、差が $O(t^2)$ であることを示せ。

<!-- solution-start -->
#### 詳細解答

$a=1+t>0$ なので $u_t=x(1-x)/(2(1+t))$ です。従って

$$
G(1+t)=\frac1{12(1+t)},\qquad
G(1)+tDG(1)[1]=\frac1{12}-\frac t{12}
$$

です。通分すれば

$$
\begin{aligned}
G(1+t)-G(1)-tDG(1)[1]
&=\frac1{12}\left(\frac1{1+t}-1+t\right)\\
&=\frac1{12}\frac{1-(1-t)(1+t)}{1+t}
=\frac{t^2}{12(1+t)}.
\end{aligned}
$$

$|t|<1/2$ で $1+t>1/2$ より絶対値は $t^2/6$ 以下です。一次剰余を $|t|$ で割ると0へ行き、[Fréchet 微分定理](#thm-inv17-frechet-state)と整合します。
<!-- solution-end -->

<a id="ex-inv17-b04"></a>

### INV17-B04 観測感度が零になる方向

- Level: B

$a=1$、$f=1$、$O(v)=\int_0^1v$ とし $h(x)=x-1/2$ とする。$DG(1)[h]=0$ を示し、微分の核が非自明であることから何を結論でき、何を結論できないかを述べよ。

<!-- solution-start -->
#### 詳細解答

[観測微分の系](#cor-inv17-observation-derivative)で $DG(1)$ は $L^\infty\to\mathbb R$ の線形作用素です。定数方向は [A04](#ex-inv17-a04) に $c=\eta=1$ を入れて $DG(1)[1]=-1/12$、$x$ 方向は [B02](#ex-inv17-b02) で $DG(1)[x]=-1/24$ です。従って

$$
DG(1)[x-\tfrac12]
=-\frac1{24}-\frac12\left(-\frac1{12}\right)=0.
$$

$h=x-1/2$ は零関数ではないので、$DG(1)$ の核は $\{0\}$ より大きく、一次の観測差だけではこの方向を区別できません。しかしこの事実は、任意に近い異なる係数が元の $G$ で**厳密に同じ観測値**を持つことの証明ではありません。[局所識別可能性の定義](../INV10/index.md#def-inv10-local-identifiability)は非線形な $G$ 自身に対する条件だからです。
<!-- solution-end -->

### Level C：状態・係数・観測の統合

<a id="ex-inv17-c01"></a>

### INV17-C01 二パラメータ係数と観測微分

- Level: C

$f=1$、$O(v)=\int_0^1v$ とし、二パラメータ係数 $a_{s,t}(x)=1+s+tx$ を $\lvert s\rvert+\lvert t\rvert<1/2$ で定める。

1. 各 $a_{s,t}\in\mathcal U$ を確かめ、基準点 $(s,t)=(0,0)$ の状態 $u$ を求めよ。
2. 方向 $(1,0)$ と $(0,1)$ の感度 $w_s,w_t$ を、弱方程式と零境界条件から求めよ。
3. $H(s,t)=O(S(a_{s,t}))$ とおき、$DH(0,0)(p,q)$ を計算せよ。
4. $(s,t)=\varepsilon(2,-1)$、$|\varepsilon|<1/6$ での観測一次近似と、その剰余の明示的な二次上界を与えよ。

<!-- solution-start -->
#### 詳細解答

**(1)** 任意の $x\in(0,1)$ で $a_{s,t}(x)\ge1-|s|-|t|>1/2$ です。従って一様正値で $\mathcal U$ に属します。基準係数 $a_{0,0}=1$ について

$$
u(x)=\frac{x(1-x)}2,\qquad u'=\frac12-x,\qquad H(0,0)=\frac1{12}.
$$

**(2)** $h_s=1$ 方向では感度方程式は $\int w_s'v'=-\int u'v'$ です。$w_s=-u=-x(1-x)/2$ は両端で零で、$w_s'=-u'$ なので全ての試験関数に対して成立します。

$h_t=x$ 方向では $\int w_t'v'=-\int xu'v'$ です。$w_t'=-xu'+C$ として端点条件から

$$
0=\int_0^1w_t'=-\left(\frac14-\frac13\right)+C,
\qquad C=-\frac1{12}.
$$

よって

$$
w_t(x)=\frac{x^3}3-\frac{x^2}4-\frac x{12}
$$

です。$w_t(0)=w_t(1)=0$ であることも確認できます。

**(3)** 係数への写像を $A(s,t)(x)=1+s+tx$ と書き、$(s,t)$ を動かし、位置 $x$ は固定して考えます。増分 $(p,q)$ に対し

$
A(p,q)-A(0,0)=p+qx,
\qquad \|p+qx\|_\infty\le |p|+|q|.
$

この増分は厳密に線形で剰余がないため、$DA(0,0)(p,q)=p+qx$ です。$H=G\circ A$ なので、[観測微分の系](#cor-inv17-observation-derivative)の二次剰余評価に $h=p+qx$ を代入すると、$(p,q)\to(0,0)$ で

$
H(p,q)-H(0,0)-DG(1)[p+qx]
=O\bigl((|p|+|q|)^2\bigr).
$

ゆえに $DH(0,0)(p,q)=DG(1)[p+qx]$ です。$\partial_sH(0,0)=DG(1)[1]$ は $t$ を固定して $s$ を動かす微分、$\partial_tH(0,0)=DG(1)[x]$ は $s$ を固定して $t$ を動かす微分です。感度の線形性を用いると

$$
\begin{aligned}
DH(0,0)(p,q)
&=p\int_0^1w_s\,dx+q\int_0^1w_t\,dx\\
&=-\frac p{12}-\frac q{24}.
\end{aligned}
$$

ここで $\int w_s=-1/12$、$\int w_t=1/12-1/12-1/24=-1/24$ を実際に積分しました。

**(4)** 方向 $(p,q)=(2,-1)$ において $DH(0,0)(2,-1)=-2/12+1/24=-1/8$ なので

$$
H(2\varepsilon,-\varepsilon)
=\frac1{12}-\frac\varepsilon8+R_\varepsilon.
$$

係数増分は $h_\varepsilon(x)=\varepsilon(2-x)$ で、$\|h_\varepsilon\|_\infty=2|\varepsilon|<1/2$ です。基準係数 $a=1$ に対し下限定数 $a_*=1$ を選び、[係数から状態への写像の Fréchet 微分](#thm-inv17-frechet-state)の剰余評価を適用すると

$$
\|r_\varepsilon\|_V
\le2(2|\varepsilon|)^2\|u\|_V.
$$

$\|u\|_V^2=\int_0^1(1/2-x)^2dx=1/12$ です。さらに $|O(v)|\le\|v\|_V$（本講の $C_P=1$）なので

$$
|R_\varepsilon|
=|O(r_\varepsilon)|
\le\frac{8}{\sqrt{12}}\varepsilon^2.
$$

したがって一次近似の誤差が二次以下であると、状態・観測の二段階を通して確認できます。
<!-- solution-end -->

## 6. この講で確定したことと次への問い

- $a$ の一様正値性は状態の一意性・安定評価だけでなく、係数を開集合上で動かして微分するためにも必要でした。
- 感度 $w$ は元の状態と同じく両端で零になり、外力の代わりに $-\int hu'v'$ を右辺とする弱方程式から得られます。
- $DS(a):L^\infty\to H_0^1$ と $DG(a):L^\infty\to\mathbb R^m$ は有界線形微分で、誤差は $\|h\|_\infty^2$ の次数まで抑えられます。

複数の係数パラメータや大量の観測がある場合、方向 $h$ ごとに感度方程式を解くのは高価です。次の INV18 では、観測残差の目的関数を導入し、**随伴状態を一度解いて係数勾配を取り出す仕組み**と、どの摂動が観測から識別できるかを調べます。
