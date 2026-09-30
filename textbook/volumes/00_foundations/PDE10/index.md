# PDE10 多次元 Laplace・Poisson 方程式とポテンシャル論

<!-- definition-example-audit: strict -->

PDE6 では二次元の対数基本解を、VC8 では三次元 Newton 核を扱いました。本章では両者を一般次元の同じ構造として見直し、半空間の境界値問題まで進みます。

符号は PDE6 と合わせ、

$$
-\Delta u=f
$$

を Poisson 方程式の基本形とします。

## 1. 放射対称関数の Laplacian

$n\ge2$、$r=|x|$ とし $u(x)=U(r)$ とします。$r>0$ では

$$
\partial_{x_i}r=\frac{x_i}{r},
$$

なので

$$
\partial_{x_i}u
=
U'(r)\frac{x_i}{r}.
$$

もう一度微分すると

$$
\partial_{x_ix_i}u
=
U''(r)\frac{x_i^2}{r^2}
+
U'(r)
\left(
\frac1r-\frac{x_i^2}{r^3}
\right).
$$

$i=1,\ldots,n$ について和を取り、

$$
\sum_{i=1}^n x_i^2=r^2
$$

を使えば

$$
\begin{aligned}
\Delta u
&=
U''(r)
+
U'(r)
\left(
\frac nr-\frac{r^2}{r^3}
\right)\\
&=
U''(r)+\frac{n-1}{r}U'(r)\\
&=
\frac1{r^{n-1}}
\frac d{dr}
\left(r^{n-1}U'(r)\right).
\end{aligned}
$$

従って原点外で調和的な放射対称関数は

$$
r^{n-1}U'(r)=C
$$

を満たします。$n=2$ では $U'=C/r$ なので $\log r$、$n\ge3$ では $U'=Cr^{1-n}$ なので $r^{2-n}$ が現れます。

<a id="pde10-nd-divergence"></a>
### 本章で使う $n$ 次元発散公式を球で直接証明する

[VC4 の Gauss--Ostrogradsky の発散定理](../VC4/index.md#thm-vc4-gauss-divergence)は三次元で証明しました。本章は一般次元を扱うため、必要な **球・穴あき球の場合だけ**を Fubini の定理と一変数の微積分学の基本定理から直接確認します。

<a id="lem-pde10-ball-divergence"></a>
<!-- formal-statement-start -->
> **補題（n 次元球・穴あき球の発散公式）**  
> $X=(X_1,\ldots,X_n)$ を球 $B_R(0)$ の近傍で $C^1$ 級とする。このとき
>
$$
\int_{B_R}\operatorname{div}X\,dx
=
\int_{\partial B_R}X\cdot n\,dS.
$$
>
> また $0<\varepsilon<R$ で $X$ が穴あき球
>
$$
B_R\setminus\overline{B_\varepsilon}
$$
>
> の近傍で $C^1$ 級なら
>
$$
\int_{B_R\setminus\overline{B_\varepsilon}}
\operatorname{div}X\,dx
=
\int_{\partial(B_R\setminus\overline{B_\varepsilon})}
X\cdot n\,dS.
$$
<!-- formal-statement-end -->

<!-- proof-start -->
### 証明

まず球 $B_R$ を考えます。座標 $x_i$ を一つ固定し、残りの $n-1$ 座標を

$$
\widehat x_i
=
(x_1,\ldots,x_{i-1},x_{i+1},\ldots,x_n)
$$

と書きます。

$|\widehat x_i|<R$ に対し

$$
a(\widehat x_i)
=
\sqrt{R^2-|\widehat x_i|^2}
$$

と置くと、球の $x_i$ 方向切片は

$$
-a(\widehat x_i)
<
x_i
<
a(\widehat x_i)
$$

です。積分順序を固定し、各 $x_i$ 切片で一変数の端点差を取ると

$$
\begin{aligned}
\int_{B_R}\partial_{x_i}X_i\,dx
&=
\int_{|\widehat x_i|<R}
\left[
X_i(\widehat x_i,a(\widehat x_i))
-
X_i(\widehat x_i,-a(\widehat x_i))
\right]
d\widehat x_i.
\end{aligned}
$$

これが球面上の第 $i$ 成分の流束に一致することを確認します。

上半球を

$$
x_i=a(\widehat x_i)
$$

というグラフで表すと

$$
\nabla a
=
-\frac{\widehat x_i}{a},
$$

したがって面素は

$$
dS
=
\sqrt{1+|\nabla a|^2}\,d\widehat x_i
=
\frac{R}{a}\,d\widehat x_i.
$$

上半球の外向き単位法線の第 $i$ 成分は

$$
n_i=\frac{a}{R},
$$

なので

$$
n_i\,dS=d\widehat x_i.
$$

下半球では

$$
n_i=-\frac{a}{R},
\qquad
dS=\frac{R}{a}\,d\widehat x_i,
$$

したがって

$$
n_i\,dS=-d\widehat x_i.
$$

よって

$$
\int_{B_R}\partial_{x_i}X_i\,dx
=
\int_{\partial B_R}X_i n_i\,dS.
$$

$i=1,\ldots,n$ を足し合わせれば

$$
\int_{B_R}\operatorname{div}X\,dx
=
\int_{\partial B_R}X\cdot n\,dS.
$$

次に穴あき球を考えます。球の公式を半径 $R$ と $\varepsilon$ にそれぞれ適用して差を取ると

$$
\begin{aligned}
\int_{B_R\setminus\overline{B_\varepsilon}}
\operatorname{div}X\,dx
&=
\int_{\partial B_R}X\cdot e_r\,dS
-
\int_{\partial B_\varepsilon}X\cdot e_r\,dS.
\end{aligned}
$$

穴あき球の内側境界では外向き法線が

$$
n=-e_r
$$

なので、右辺はちょうど

$$
\int_{\partial(B_R\setminus\overline{B_\varepsilon})}
X\cdot n\,dS
$$

です。
<!-- proof-end -->

特に $a,b\in C^2$ として

$$
X=a\nabla b-b\nabla a
$$

を代入すれば

$$
\operatorname{div}X
=
a\Delta b-b\Delta a
$$

なので、球・穴あき球では

$$
\boxed{
\int_\Omega(a\Delta b-b\Delta a)\,dx
=
\int_{\partial\Omega}
(a\partial_n b-b\partial_n a)\,dS
}
$$

が成り立ちます。これは [PDE6 の Green の第二恒等式](../PDE6/index.md#thm-pde6-green-second) と同じ積の微分則を、$n$ 次元球について直接積分したものです。

## 2. 一般次元の基本解

前節で、原点外で調和的な放射対称関数の形は、二次元なら $\log r$、三次元以上なら $r^{2-n}$ まで絞れました。しかし Poisson 方程式の「一点に単位の源を置いた応答」として使うには、定数倍まで決める必要があります。

そこで半径 $r$ の球面を通る外向き流束を見ます。原点以外では調和的なので、球面を大きくしても原点から出入りする総量は変わりません。この総量が1になるように係数を正規化したものを基本解として固定します。

$\sigma_{n-1}=|S^{n-1}|$ を単位球面の表面積とします。

<a id="def-pde10-fundamental-solution"></a>
<!-- formal-statement-start -->
> **定義（多次元負 Laplacian の基本解）**  
> $n\ge2$ に対し

$$
\Phi_n(x)
=
\begin{cases}
-\dfrac1{2\pi}\log|x|, & n=2,\\[6pt]
\dfrac1{(n-2)\sigma_{n-1}}|x|^{2-n}, & n\ge3
\end{cases}
$$

> と定め、これを本章の **負 Laplacian の基本解** と呼ぶ。この正規化では、原点外で調和的であり、任意の $r>0$ について

$$
-\int_{|x|=r}\partial_n\Phi_n\,dS=1
$$

> が成り立つ。後者は原点に単位の点源を置いたことに対応する正規化条件である。
<!-- formal-statement-end -->

<!-- definition-example-start: def-pde10-fundamental-solution -->
**定義の確認**：以下で定義の条件を直接確認します。

### 三次元では VC8 の Newton 核に戻る

$n=3$ では $\sigma_2=4\pi$ なので

$$
\Phi_3(x)=\frac1{4\pi|x|}.
$$

これは [VC8 の Newton 核](../VC8/index.md) と同じものです。
<!-- definition-example-end -->

<a id="prop-pde10-fundamental-flux"></a>
<!-- formal-statement-start -->
> **命題（多次元基本解の調和性と単位流束）**  
> $\Phi_n$ は $\mathbb R^n\setminus\{0\}$ で調和的であり、

$$
-\int_{|x|=r}\partial_n\Phi_n\,dS=1
$$

> を全ての $r>0$ で満たす。
<!-- formal-statement-end -->

<!-- proof-start -->
### 証明

$n\ge3$ では $U(r)=Cr^{2-n}$ と置くと $r^{n-1}U'(r)=C(2-n)$ は定数なので原点外で $\Delta U=0$。

$C=1/((n-2)\sigma_{n-1})$ だから

$$
\partial_n\Phi_n
=
-\frac1{\sigma_{n-1}}r^{1-n}.
$$

球面積が $\sigma_{n-1}r^{n-1}$ なので

$$
-\int_{|x|=r}\partial_n\Phi_n dS=1.
$$

$n=2$ では

$$
\Phi_2(r)
=
-\frac1{2\pi}\log r,
\qquad
\Phi_2'(r)
=
-\frac1{2\pi r}.
$$

放射 Laplacian へ代入すると

$$
\Phi_2''+\frac1r\Phi_2'
=
\frac1{2\pi r^2}
-
\frac1{2\pi r^2}
=
0.
$$

また半径 $r$ の円周長は $2\pi r$ なので

$$
-\int_{|x|=r}\partial_n\Phi_2\,dS
=
-\left(-\frac1{2\pi r}\right)2\pi r
=
1.
$$
<!-- proof-end -->

## 3. Newton ポテンシャル

基本解 $\Phi_n(x-y)$ は、点 $y$ に置いた単位点源が位置 $x$ に作る応答とみなせます。一般の源 $f(y)$ は「各点 $y$ に強さ $f(y)\,dy$ の小さな点源が分布している」と考えられるので、それぞれの基本解を重ね合わせれば Poisson 方程式の解候補が得られるはずです。

この重ね合わせを積分として定義したものが Newton ポテンシャルです。定義後には、核が $x=y$ で発散しても積分自体は有限であることを確認し、その後に実際に $-\Delta u=f$ となることを証明します。

<a id="def-pde10-newton-potential"></a>
<!-- formal-statement-start -->
> **定義（多次元 Newton ポテンシャル）**  
> コンパクトな台を持つ連続関数 $f$ に対し

$$
(Nf)(x)
=
\int_{\mathbb R^n}\Phi_n(x-y)f(y)dy
$$

> を Newton ポテンシャルという。
<!-- formal-statement-end -->

この積分が核の非有界点 $y=x$ のために発散しないことを一般次元で確認します。$z=x-y$ とすると、原点近くで

$$
|\Phi_n(z)|
\asymp
\begin{cases}
|\log|z||, & n=2,\\
|z|^{2-n}, & n\ge3.
\end{cases}
$$

従って極座標の体積要素 $r^{n-1}dr\,d\omega$ と合わせると、原点近傍の絶対値積分は

$$
\int_0^\varepsilon r|\log r|\,dr
<\infty
\qquad(n=2),
$$

$$
\int_0^\varepsilon r^{2-n}r^{n-1}\,dr
=
\int_0^\varepsilon r\,dr
<\infty
\qquad(n\ge3).
$$

したがって $\Phi_n$ の絶対値は原点を含む任意の十分小さい球上で積分可能です。

<!-- definition-example-start: def-pde10-newton-potential -->
**定義の確認**：$n=3$ とし、

$$
f(y)=(1-|y|^2)_+
$$

を取ります。$f$ は連続で単位閉球に台を持つので、

$$
(Nf)(x)
=
\frac1{4\pi}
\int_{|y|\le1}
\frac{1-|y|^2}{|x-y|}\,dy
$$

は定義どおり三次元 Newton ポテンシャルです。$x=y$ の近くでは体積要素が $r^2dr$、核が $1/r$ の大きさなので、半径 $\varepsilon$ の近傍からの寄与は

$$
\int_0^\varepsilon r\,dr
=
\frac{\varepsilon^2}{2}
<\infty
$$

と抑えられ、この積分は有限です。
<!-- definition-example-end -->

<a id="thm-pde10-newton-poisson"></a>
<!-- formal-statement-start -->
> **定理（Newton ポテンシャルと Poisson 方程式）**  
> $f\in C_c^2(\mathbb R^n)$ とする。このとき $u=Nf$ は

$$
-\Delta u=f
$$

> を古典的に満たす。
<!-- formal-statement-end -->

### 証明の見取り図

核が非有界になる点を小球で切り抜き、[n 次元球・穴あき球の発散公式](#lem-pde10-ball-divergence)を $a=\Phi_n$, $b=g$ に適用します。PDE6 の二次元証明と同じく、基本解の単位流束だけが一点値 $f(x)$ を生みます。

<!-- proof-start -->
### 証明

特異核 $\Phi_n(x-y)$ を直接 $x$ で二回微分すると $y=x$ の特異性にぶつかります。そこで、まず変数を

$$
z=x-y
$$

へ変えて

$$
u(x)
=
\int_{\mathbb R^n}\Phi_n(z)f(x-z)\,dz
$$

と書きます。$\Phi_n$ の特異性は、$n\ge3$ では $O(|z|^{2-n})$、$n=2$ では $O(|\log |z||)$ です。したがって原点近くの絶対値積分は、半径方向ではそれぞれ $\int_0^\delta r\,dr$、$\int_0^\delta r|\log r|\,dr$ に支配され、有限です。さらに $f$ はコンパクトな台を持ちます。従って $x$ をコンパクト集合内で動かす限り、$f(x-z)$ とその $x$ 微分は共通のコンパクトな $z$ 領域に台を持ち、優収束で **滑らかな $f$ 側**を微分できます。よって

$$
\Delta u(x)
=
\int_{\mathbb R^n}
\Phi_n(z)\,
\Delta f(x-z)\,dz.
$$

固定した $x$ に対して

$$
g(z)=f(x-z)
$$

と置きます。$R$ を十分大きく取って $g$ の台を $B_R$ に含め、

$$
\Omega_\varepsilon
=
B_R\setminus\overline{B_\varepsilon}
$$

上で [上の $n$ 次元 Green 恒等式](#pde10-nd-divergence)を $a=\Phi_n$, $b=g$ に適用します。原点外では $\Delta\Phi_n=0$ なので

$$
\int_{\Omega_\varepsilon}
\Phi_n\Delta g\,dz
=
\int_{\partial\Omega_\varepsilon}
\left(
\Phi_n\partial_n g
-
g\partial_n\Phi_n
\right)dS.
$$

$R$ を $g$ の台より外に取ったので外側境界の項は0です。内側境界 $\partial B_\varepsilon$ では、$\Omega_\varepsilon$ の外向き法線は球の半径方向と逆向き、すなわち

$$
n=-e_r
$$

です。

まず

$$
\left|
\int_{\partial B_\varepsilon}
\Phi_n\partial_n g\,dS
\right|
\to0.
$$

実際、$n\ge3$ では $\Phi_n=O(\varepsilon^{2-n})$、球面積は $O(\varepsilon^{n-1})$ なので積は $O(\varepsilon)$ です。$n=2$ では $O(\varepsilon|\log\varepsilon|)$ です。

次に第2境界項を見ます。内側境界では

$$
\partial_n\Phi_n
=
-\partial_r\Phi_n.
$$

従って

$$
-\int_{\partial B_\varepsilon}
g\,\partial_n\Phi_n\,dS
=
\int_{\partial B_\varepsilon}
g\,\partial_r\Phi_n\,dS.
$$

基本解の単位流束から

$$
\int_{\partial B_\varepsilon}
\partial_r\Phi_n\,dS
=
-1.
$$

また $g(z)=g(0)+O(\varepsilon)$ であり、$|\partial_r\Phi_n|$ の球面積分は $\varepsilon$ に依らず1なので

$$
\int_{\partial B_\varepsilon}
g\,\partial_r\Phi_n\,dS
=
-g(0)+O(\varepsilon)
\to
-g(0).
$$

したがって $\varepsilon\downarrow0$ とすると

$$
\int_{\mathbb R^n}\Phi_n(z)\Delta g(z)\,dz
=
-g(0).
$$

$g(z)=f(x-z)$ なので

$$
g(0)=f(x),
\qquad
\Delta g(z)=\Delta f(x-z).
$$

よって先ほどの微分式と合わせて

$$
\Delta u(x)
=
-f(x),
$$

すなわち

$$
\boxed{-\Delta u=f}.
$$

特異な基本解側を無理に微分せず、変数変換によって $C_c^2$ の $f$ 側へ微分を移すことが、古典解としての正当化の核心です。
<!-- proof-end -->

## 4. 多次元平均値性質

調和関数は $\Delta u=0$ という局所的な微分方程式を満たしますが、そこから「中心の値が周囲の平均で決まる」という非局所的な性質も導けます。二次元で見た平均値性質が一般次元でも成り立つことを、球面平均を半径 $r$ の関数として微分することで確かめます。

要点は、球面平均の半径微分が球内部の $\Delta u$ の積分へ変わることです。調和関数ならその積分が0になり、平均が半径に依存しなくなります。

<a id="thm-pde10-mean-value"></a>
<!-- formal-statement-start -->
> **定理（多次元調和関数の平均値性質）**  
> $u$ が $B_R(x_0)$ の近傍で $C^2$ 級かつ $\Delta u=0$ なら、$0<r<R$ に対し

$$
u(x_0)
=
\frac1{\sigma_{n-1}r^{n-1}}
\int_{|y-x_0|=r}u(y)dS_y.
$$
<!-- formal-statement-end -->

### 証明の見取り図

球面上の平均 $m(r)$ を微分し、[本章で証明した $n$ 次元球の発散公式](#lem-pde10-ball-divergence)で $m'(r)$ を球内部の $\Delta u$ の積分へ変えます。

<!-- proof-start -->
### 証明

$$
m(r)=\frac1{\sigma_{n-1}}
\int_{S^{n-1}}u(x_0+r\omega)dS_\omega
$$

と置くと

$$
m'(r)
=
\frac1{\sigma_{n-1}r^{n-1}}
\int_{|y-x_0|=r}\partial_nu(y)dS_y.
$$

[上で確認した $n$ 次元の発散公式](#pde10-nd-divergence)を $\nabla u$ に適用すると

$$
\int_{|y-x_0|=r}\partial_nu\,dS
=
\int_{B_r(x_0)}\Delta u\,dy
=
0.
$$

従って $m'(r)=0$。$r\downarrow0$ で $m(r)\to u(x_0)$ です。
<!-- proof-end -->

## 5. 球面反転で調和関数を移す

基本解 $|x|^{2-n}$ は原点近くで特異で、無限遠では小さくなります。そこで「原点近く」と「無限遠」を入れ替える変換があれば、外部領域の調和関数と内部領域の調和関数を対応させられます。

球面反転 $x\mapsto x/|x|^2$ は半径 $r$ を $1/r$ へ移します。ただし関数を単に合成するだけでは Laplacian の形が保たれないため、基本解と同じ重み $|x|^{2-n}$ を掛けます。この補正を含めた変換を次で定義します。

<a id="def-pde10-kelvin"></a>
<!-- formal-statement-start -->
> **定義（Kelvin 変換）**  
> $n\ge3$ とし、
>
$$
I(x)=\frac{x}{|x|^2}
$$
>
> を球面反転とする。開集合 $U\subset\mathbb R^n\setminus\{0\}$ 上の関数 $u$ に対し、反転領域
>
$$
U^*:=I(U)
$$
>
> 上で
>
$$
(Ku)(x)
=
|x|^{2-n}u(I(x))
$$
>
> と定める。この $Ku$ を $u$ の Kelvin 変換という。
<!-- formal-statement-end -->

<!-- definition-example-start: def-pde10-kelvin -->
**定義の確認**：以下で定義の条件を直接確認します。

定数関数 $u=1$ の Kelvin 変換は $|x|^{2-n}$ で、原点外の基本的な調和関数です。
<!-- definition-example-end -->

<a id="prop-pde10-kelvin-harmonic"></a>
<!-- formal-statement-start -->
> **命題（Kelvin 変換は調和性を保つ）**  
> $n\ge3$、$U\subset\mathbb R^n\setminus\{0\}$ を開集合、$u\in C^2(U)$ とする。このとき $U^*=I(U)$ 上で
>
$$
\Delta(Ku)(x)
=
|x|^{-n-2}
(\Delta u)\left(\frac{x}{|x|^2}\right).
$$
>
> 特に $u$ が $U$ で調和的なら $Ku$ は $U^*$ で調和的である。
<!-- formal-statement-end -->

### 証明の見取り図

反転写像 $I(x)=x/|x|^2$ の微分行列は、尺度 $|x|^{-2}$ と反射の積です。二階連鎖律を展開すると一次微分項が重み $|x|^{2-n}$ の微分と打ち消されます。

<!-- proof-start -->
### 証明

$r=|x|$,

$$
w(x)=r^{2-n},
\qquad
y=I(x)=\frac{x}{r^2},
\qquad
v(x)=w(x)u(y)
$$

と置きます。まず反転写像の一階微分は

$$
\partial_{x_i}y_j
=
r^{-2}\delta_{ij}
-
2r^{-4}x_ix_j.
$$

これを掛け合わせると

$$
\sum_i
\partial_{x_i}y_j
\partial_{x_i}y_k
=
r^{-4}\delta_{jk}.
$$

次に必要な一次項を全て計算します。$r>0$ では $w=r^{2-n}$ は調和的なので

$$
\Delta w=0,
$$

また

$$
\partial_{x_i}w
=
(2-n)r^{-n}x_i.
$$

一方、$y_j=x_jr^{-2}$ だから

$$
\Delta y_j
=
-2(n-2)r^{-4}x_j.
$$

さらに

$$
\begin{aligned}
\sum_i
(\partial_{x_i}w)
(\partial_{x_i}y_j)
&=
(2-n)r^{-n}
\sum_i
x_i
\left(
r^{-2}\delta_{ij}
-
2r^{-4}x_ix_j
\right)\\
&=
(2-n)r^{-n}
\left(
r^{-2}x_j-2r^{-2}x_j
\right)\\
&=
(n-2)r^{-n-2}x_j.
\end{aligned}
$$

ここまでを二階連鎖律

$$
\Delta(wu(y))
=
u(y)\Delta w
+
2\sum_{i,j}
(\partial_{x_i}w)
u_{y_j}
(\partial_{x_i}y_j)
$$

$$
\qquad
+
w\sum_{j,k}
u_{y_jy_k}
\sum_i
(\partial_{x_i}y_j)
(\partial_{x_i}y_k)
+
w\sum_j
u_{y_j}\Delta y_j
$$

へ代入します。

$u_{y_j}$ を含む二種類の一次微分項は

$$
2(n-2)r^{-n-2}
\sum_jx_ju_{y_j}
$$

と

$$
-2(n-2)r^{-n-2}
\sum_jx_ju_{y_j}
$$

で、ちょうど打ち消し合います。$\Delta w=0$ なので残るのは Hessian 項だけです。従って

$$
\begin{aligned}
\Delta v
&=
r^{2-n}
\sum_{j,k}
u_{y_jy_k}
r^{-4}\delta_{jk}\\
&=
r^{-n-2}
(\Delta u)(y).
\end{aligned}
$$

すなわち

$$
\boxed{
\Delta(Ku)(x)
=
|x|^{-n-2}
(\Delta u)\left(\frac{x}{|x|^2}\right)
}.
$$
<!-- proof-end -->

## 6. 半空間の鏡像法

全空間では基本解が点源への応答を与えました。しかし Dirichlet 境界条件があると、点源の基本解だけでは一般に境界値0になりません。平らな境界なら、境界の反対側に符号を反転した鏡像点源を置くことで、境界上の値を打ち消せます。

この「実際の点源 − 鏡像点源」という構成を、半空間の Green 関数として具体的に確認します。

上半空間

$$
\mathbb H^n
=
\{x=(x',x_n):x_n>0\}
$$

を考え、$y^*=(y',-y_n)$ を鏡像点とします。

<a id="prop-pde10-halfspace-green"></a>
<!-- formal-statement-start -->
> **命題（半空間の Dirichlet Green 関数）**  
> $x\in\mathbb H^n$ を固定し、$y\in\mathbb H^n$、$y^*=(y',-y_n)$ に対し
>
$$
G(x,y)
=
\Phi_n(x-y)-\Phi_n(x-y^*)
$$
>
> と置く。このとき $y=x$ を除いて
>
$$
\Delta_yG(x,y)=0,
$$
>
> $y=x$ の近くでは
>
$$
G(x,y)-\Phi_n(x-y)
$$
>
> が調和的であり、境界 $y_n=0$ では
>
$$
G(x,y)=0.
$$
>
> 従って $G$ は半空間の Dirichlet Green 関数に必要な古典的性質を満たす。
<!-- formal-statement-end -->

<!-- proof-start -->
### 証明

境界点 $\xi=(\xi',0)$ に対し、鏡像対称性から

$$
|x-\xi|=|x-\xi^*|.
$$

従って境界上で二つの基本解は一致して差は0です。また鏡像点は下半空間にあるため、補正項は上半空間で調和的です。
<!-- proof-end -->

境界法線微分も実際に計算します。$z\ne0$ では $n=2$ と $n\ge3$ の両方について

$$
\nabla\Phi_n(z)
=
-\frac{z}{\sigma_{n-1}|z|^n}
$$

が成り立ちます。$y=(y',s)$ とし、境界 $s=0$ で

$$
R^2
=
|x'-y'|^2+x_n^2
$$

と置きます。$y^*=(y',-s)$ だから

$$
\left.
\partial_s\Phi_n(x-y)
\right|_{s=0}
=
\frac{x_n}{\sigma_{n-1}R^n},
$$

$$
\left.
\partial_s\Phi_n(x-y^*)
\right|_{s=0}
=
-\frac{x_n}{\sigma_{n-1}R^n}.
$$

従って

$$
\left.
\partial_sG(x,(y',s))
\right|_{s=0}
=
\frac{2x_n}{\sigma_{n-1}R^n}.
$$

上半空間の $y$ 変数に関する外向き単位法線は $n_y=-e_n$ なので、

$$
P(x;y')
:=
-\partial_{n_y}G(x,(y',0))
=
\left.\partial_sG(x,(y',s))\right|_{s=0}.
$$

よって半空間 Poisson 核は

$$
\boxed{
P(x',x_n;y')
=
\frac{2}{\sigma_{n-1}}
\frac{x_n}
{\left(|x'-y'|^2+x_n^2\right)^{n/2}}
}.
$$

この核が本当に平均核になっていることも確認できます。$z=(y'-x')/x_n$ と尺度変換すると

$$
\int_{\mathbb R^{n-1}}P(x;y')\,dy'
=
\frac{2}{\sigma_{n-1}}
\int_{\mathbb R^{n-1}}
\frac{dz}{(1+|z|^2)^{n/2}}.
$$

極座標 $|z|=\rho$、さらに $\rho=\tan\theta$ と置けば

$$
\int_{\mathbb R^{n-1}}
\frac{dz}{(1+|z|^2)^{n/2}}
=
\sigma_{n-2}
\int_0^{\pi/2}
\sin^{n-2}\theta\,d\theta.
$$

一方、単位球面 $S^{n-1}$ を極角 $\theta$ で上下対称に積分すると

$$
\sigma_{n-1}
=
2\sigma_{n-2}
\int_0^{\pi/2}
\sin^{n-2}\theta\,d\theta.
$$

従って

$$
\int_{\mathbb R^{n-1}}P(x;y')\,dy'=1.
$$

つまり $P\ge0$ かつ全質量1で、境界値を重み付き平均して内部へ運ぶ核になっています。

## 演習

### Level A

#### PDE10-A01 三次元基本解
- Level: A

一般式から $\Phi_3$ を求めよ。

<!-- solution-start -->
##### 詳細解答

$n\ge3$ の基本解は

$$
\Phi_n(x)
=
\frac{1}{(n-2)\sigma_{n-1}}
|x|^{2-n}.
$$

$n=3$ では

$$
n-2=1,
\qquad
\sigma_2=4\pi,
\qquad
|x|^{2-3}=|x|^{-1}.
$$

したがって

$$
\boxed{
\Phi_3(x)
=
\frac{1}{4\pi|x|}
}.
$$

これは [VC8 の Newton 核](../VC8/index.md) と一致します。
<!-- solution-end -->

#### PDE10-A02 四次元基本解
- Level: A

$n=4$ の基本解の $r$ 依存性を求めよ。

<!-- solution-start -->
##### 詳細解答

$n=4$ を一般式へ代入します。

$$
2-n=-2,
\qquad
n-2=2.
$$

従って

$$
\Phi_4(x)
=
\frac{1}{2\sigma_3}|x|^{-2}.
$$

半径 $r=|x|$ だけで書けば

$$
\boxed{
\Phi_4(r)
=
\frac{1}{2\sigma_3r^2}
}.
$$

したがって四次元では、基本解の距離依存性は $1/r^2$ です。
<!-- solution-end -->

#### PDE10-A03 一次関数の平均
- Level: A

$u(x)=x_1$ の球面上の平均が中心値に等しいことを直接示せ。

<!-- solution-start -->
##### 詳細解答

中心 $x_0$、半径 $r$ の球面を

$$
y=x_0+r\omega,
\qquad
\omega\in S^{n-1}
$$

と書きます。このとき

$$
u(y)=y_1=(x_0)_1+r\omega_1.
$$

球面平均は

$$
\begin{aligned}
\frac1{\sigma_{n-1}}
\int_{S^{n-1}}u(x_0+r\omega)\,dS_\omega
&=
(x_0)_1
+
\frac r{\sigma_{n-1}}
\int_{S^{n-1}}\omega_1\,dS_\omega.
\end{aligned}
$$

写像 $\omega\mapsto-\omega$ で球面は自分自身へ移り、$\omega_1$ は符号を反転するので

$$
\int_{S^{n-1}}\omega_1\,dS_\omega=0.
$$

従って平均は

$$
\boxed{(x_0)_1=u(x_0)}
$$

となり、中心値に一致します。
<!-- solution-end -->

#### PDE10-A04 Kelvin 変換
- Level: A

$u=1$ の Kelvin 変換を求め、原点外で調和的であることを確認せよ。

<!-- solution-start -->
##### 詳細解答

$u\equiv1$ なら Kelvin 変換の定義から

$$
(Ku)(x)
=
|x|^{2-n}
u\left(\frac{x}{|x|^2}\right)
=
|x|^{2-n}.
$$

$r=|x|$、$U(r)=r^{2-n}$ と置くと

$$
U'(r)
=
(2-n)r^{1-n}.
$$

従って

$$
r^{n-1}U'(r)=2-n
$$

は定数です。前節の放射 Laplacian 公式

$$
\Delta U
=
\frac1{r^{n-1}}
\frac d{dr}
\left(r^{n-1}U'(r)\right)
$$

へ代入すると

$$
\Delta(Ku)=0
\qquad(r>0).
$$

よって

$$
\boxed{
Ku=|x|^{2-n}
}
$$

は原点外で調和的です。
<!-- solution-end -->

### Level B

#### PDE10-B01 単位流束
- Level: B

$n\ge3$ の $\Phi_n$ の単位流束を再計算せよ。

<!-- solution-start -->
##### 詳細解答

$n\ge3$ では

$$
\Phi_n(r)
=
\frac{1}{(n-2)\sigma_{n-1}}
r^{2-n}.
$$

半径微分すると

$$
\partial_r\Phi_n
=
\frac{2-n}{(n-2)\sigma_{n-1}}r^{1-n}
=
-\frac1{\sigma_{n-1}}r^{1-n}.
$$

球面 $|x|=r$ 上では外向き法線が $e_r$ なので

$$
\partial_n\Phi_n=\partial_r\Phi_n.
$$

また球面積は

$$
|\partial B_r|
=
\sigma_{n-1}r^{n-1}.
$$

したがって

$$
\begin{aligned}
-\int_{|x|=r}
\partial_n\Phi_n\,dS
&=
-\left(
-\frac1{\sigma_{n-1}}r^{1-n}
\right)
\sigma_{n-1}r^{n-1}\\
&=
\boxed{1}.
\end{aligned}
$$

半径 $r$ が完全に消えるため、どの球面でも同じ単位流束になります。
<!-- solution-end -->

#### PDE10-B02 半空間 Green 関数
- Level: B

境界で $G=0$ となることを距離から確認せよ。

<!-- solution-start -->
##### 詳細解答

境界点を

$$
\xi=(\xi',0)
$$

とします。点源 $y=(y',y_n)$ の鏡像を

$$
y^*=(y',-y_n)
$$

とすると

$$
\begin{aligned}
|\xi-y|^2
&=
|\xi'-y'|^2+y_n^2,\\
|\xi-y^*|^2
&=
|\xi'-y'|^2+(-y_n)^2.
\end{aligned}
$$

従って

$$
|\xi-y|=|\xi-y^*|.
$$

基本解 $\Phi_n$ は距離だけの関数なので

$$
\Phi_n(\xi-y)
=
\Phi_n(\xi-y^*).
$$

よって [半空間の Dirichlet Green 関数](#prop-pde10-halfspace-green)は

$$
G(\xi,y)
=
\Phi_n(\xi-y)-\Phi_n(\xi-y^*)
=
\boxed{0}.
$$

鏡像点源を引くことで境界値がちょうど打ち消されます。
<!-- solution-end -->

#### PDE10-B03 Poisson 核の尺度
- Level: B

半空間 Poisson 核の積分が高さ $x_n$ に依存しないことを尺度変換で示せ。

<!-- solution-start -->
##### 詳細解答

半空間 Poisson 核は

$$
P(x',x_n;y')
=
\frac{2}{\sigma_{n-1}}
\frac{x_n}
{\left(|x'-y'|^2+x_n^2\right)^{n/2}}.
$$

尺度変換

$$
z=\frac{y'-x'}{x_n},
\qquad
y'=x'+x_nz
$$

を使います。$y'\in\mathbb R^{n-1}$ なので Jacobian は

$$
dy'=x_n^{n-1}\,dz.
$$

また

$$
|x'-y'|^2
=
x_n^2|z|^2,
$$

したがって分母は

$$
\left(
x_n^2|z|^2+x_n^2
\right)^{n/2}
=
x_n^n(1+|z|^2)^{n/2}.
$$

よって

$$
\begin{aligned}
\int_{\mathbb R^{n-1}}P(x;y')\,dy'
&=
\frac{2}{\sigma_{n-1}}
\int_{\mathbb R^{n-1}}
\frac{x_n\,x_n^{n-1}}
{x_n^n(1+|z|^2)^{n/2}}
\,dz\\
&=
\frac{2}{\sigma_{n-1}}
\int_{\mathbb R^{n-1}}
\frac{dz}{(1+|z|^2)^{n/2}}.
\end{aligned}
$$

$x_n$ の冪は

$$
x_n^{1+n-1-n}=x_n^0=1
$$

となって全て消えます。従って積分値は高さ $x_n$ に依存しません。
<!-- solution-end -->

### Level C

#### PDE10-C01 二次元と高次元
- Level: C

$(r^{n-1}U')'=0$ から $n=2$ と $n\ge3$ の基本解形を導き、二次元だけ対数になる理由を説明せよ。

<!-- solution-start -->
##### 詳細解答

放射対称な調和関数は

$$
(r^{n-1}U')'=0
$$

を満たします。一回積分して

$$
r^{n-1}U'(r)=C,
$$

従って

$$
U'(r)=Cr^{1-n}.
$$

$n\ne2$ なら指数 $1-n\ne-1$ なので

$$
\begin{aligned}
U(r)
&=
C\int r^{1-n}\,dr+D\\
&=
\frac{C}{2-n}r^{2-n}+D.
\end{aligned}
$$

したがって非定数部分は $r^{2-n}$ です。

一方 $n=2$ では

$$
U'(r)=\frac Cr
$$

となり、

$$
U(r)
=
C\log r+D.
$$

つまり一般次元の冪指数 $2-n$ は、ちょうど $n=2$ で0になります。このとき

$$
\frac{r^{2-n}-1}{2-n}
\longrightarrow
\log r
\qquad(n\to2)
$$

という極限関係もあり、二次元だけ対数が現れることは冪型基本解の臨界極限として理解できます。

従って

$$
\boxed{
n=2:\ \log r,
\qquad
n\ge3:\ r^{2-n}
}
$$

という違いが生じます。
<!-- solution-end -->

## 7. 章末チェック

- 一般次元の基本解を放射 Laplacian から導ける。
- Newton ポテンシャルが Poisson 方程式を解く機構を説明できる。
- 多次元平均値性質を証明できる。
- Kelvin 変換の調和性保存を追える。
- 半空間 Green 関数を鏡像法で構成できる。
