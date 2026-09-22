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
### 本章で使う $n$ 次元発散定理の範囲

[VC4 の Gauss--Ostrogradsky の発散定理](../VC4/index.md#thm-vc4-gauss-divergence)は三次元で証明しました。本章では一般次元へ進むため、同じ証明機構の $n$ 次元版を **球・穴あき球に限って**使います。次元が変わったことを暗黙にはしません。

直方体

$$
R=\prod_{i=1}^n[a_i,b_i]
$$

では Fubini の定理と一変数の微積分学の基本定理から

$$
\int_R\partial_{x_i}X_i\,dx
=
\int_{x_i=b_i}X_i\,dS
-
\int_{x_i=a_i}X_i\,dS.
$$

$i$ について和を取れば、各対向面の外向き法線の符号がちょうど対応して

$$
\int_R\operatorname{div}X\,dx
=
\int_{\partial R}X\cdot n\,dS.
$$

球面は有限個の座標グラフで覆えます。VC4 でグラフ領域へ拡張したのと同じく各グラフ領域を細分して上の直方体計算を適用すると、内部境界の流束は反対向き法線により相殺します。従って球 $B_r$ と穴あき球 $B_R\setminus\overline{B_\varepsilon}$ について

$$
\int_\Omega\operatorname{div}X\,dx
=
\int_{\partial\Omega}X\cdot n\,dS
$$

を得ます。本章で必要なのはこの場合だけです。

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

が成り立ちます。これは [PDE6 の Green の第二恒等式](../PDE6/index.md#thm-pde6-green-second) と同じ計算の $n$ 次元版です。

## 2. 一般次元の基本解

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

> と定める。本章では、原点外で調和的であり、任意の $r>0$ について

$$
-\int_{|x|=r}\partial_n\Phi_n\,dS=1
$$

> を満たすことを、負 Laplacian の基本解を特徴付ける古典的条件とする。
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

$n=2$ では PDE6 と同じく $\Phi_2=-(2\pi)^{-1}\log r$ から直接計算できます。
<!-- proof-end -->

## 3. Newton ポテンシャル

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

核が非有界になる点 $y=x$ の小球を切り抜いて [Green の第二恒等式](../PDE6/index.md#thm-pde6-green-second)を使います。PDE6 の二次元証明と同じく、基本解の単位流束だけが一点値 $f(x)$ を生みます。

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

と書きます。$\Phi_n$ は原点近くで局所可積分であり、$f$ はコンパクトな台を持ちます。従って $x$ をコンパクト集合内で動かす限り、$f(x-z)$ とその $x$ 微分は共通のコンパクトな $z$ 領域に台を持ち、優収束で **滑らかな $f$ 側**を微分できます。よって

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

球面上の平均 $m(r)$ を微分し、[Gauss--Ostrogradsky の発散定理](../VC4/index.md#thm-vc4-gauss-divergence)で $m'(r)$ を球内部の $\Delta u$ の積分へ変えます。

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

<a id="def-pde10-kelvin"></a>
<!-- formal-statement-start -->
> **定義（Kelvin 変換）**  
> $n\ge3$ とし、原点を含まない領域上の関数 $u$ に対して

$$
(Ku)(x)
=
|x|^{2-n}
u\left(\frac{x}{|x|^2}\right)
$$

> を Kelvin 変換という。
<!-- formal-statement-end -->

<!-- definition-example-start: def-pde10-kelvin -->
**定義の確認**：以下で定義の条件を直接確認します。

定数関数 $u=1$ の Kelvin 変換は $|x|^{2-n}$ で、原点外の基本的な調和関数です。
<!-- definition-example-end -->

<a id="prop-pde10-kelvin-harmonic"></a>
<!-- formal-statement-start -->
> **命題（Kelvin 変換は調和性を保つ）**  
> $n\ge3$ で

$$
\Delta(Ku)(x)
=
|x|^{-n-2}
(\Delta u)\left(\frac{x}{|x|^2}\right).
$$

> 特に $u$ が調和的なら $Ku$ も調和的である。
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
> $x,y\in\mathbb H^n$ に対し

$$
G(x,y)
=
\Phi_n(x-y)-\Phi_n(x-y^*)
$$

> と置くと、$y$ に関して基本解と同じ特異性を持ち、境界 $y_n=0$ で $G(x,y)=0$ となる。
<!-- formal-statement-end -->

<!-- proof-start -->
### 証明

境界点 $\xi=(\xi',0)$ に対し、鏡像対称性から

$$
|x-\xi|=|x-\xi^*|.
$$

従って境界上で二つの基本解は一致して差は0です。また反射側の source 点は下半空間にあるため、補正項は上半空間で調和的です。
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

よって半空間 Poisson kernel は

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
$\sigma_2=4\pi$ なので $\Phi_3(x)=1/(4\pi|x|)$ です。
<!-- solution-end -->

#### PDE10-A02 四次元基本解
- Level: A

$n=4$ の基本解の $r$ 依存性を求めよ。

<!-- solution-start -->
##### 詳細解答
$r^{2-n}=r^{-2}$ なので定数倍の $1/r^2$ です。正規化定数は $1/(2\sigma_3)$ です。
<!-- solution-end -->

#### PDE10-A03 一次関数の平均
- Level: A

$u(x)=x_1$ の球面上の平均が中心値に等しいことを直接示せ。

<!-- solution-start -->
##### 詳細解答
$y=x_0+r\omega$ と置くと $y_1=(x_0)_1+r\omega_1$。球面対称性から $\omega_1$ の平均は0です。
<!-- solution-end -->

#### PDE10-A04 Kelvin 変換
- Level: A

$u=1$ の Kelvin 変換を求め、原点外で調和的であることを確認せよ。

<!-- solution-start -->
##### 詳細解答
$Ku=r^{2-n}$。$r^{n-1}(Ku)'=2-n$ は定数なので放射 Laplacian は0です。
<!-- solution-end -->

### Level B

#### PDE10-B01 単位流束
- Level: B

$n\ge3$ の $\Phi_n$ の単位流束を再計算せよ。

<!-- solution-start -->
##### 詳細解答
$\partial_r\Phi_n=-\sigma_{n-1}^{-1}r^{1-n}$。球面積 $\sigma_{n-1}r^{n-1}$ を掛けると法線微分の積分は $-1$ です。
<!-- solution-end -->

#### PDE10-B02 半空間 Green 関数
- Level: B

境界で $G=0$ となることを距離から確認せよ。

<!-- solution-start -->
##### 詳細解答
境界面は鏡映の固定集合なので、実 source と鏡像 source から同じ境界点までの距離が等しく、基本解の差が0です。
<!-- solution-end -->

#### PDE10-B03 Poisson kernel の尺度
- Level: B

半空間 Poisson kernel の積分が高さ $x_n$ に依存しないことを尺度変換で示せ。

<!-- solution-start -->
##### 詳細解答
$z=(y'-x')/x_n$ と置くと $dy'=x_n^{n-1}dz$、分母は $x_n^n(1+|z|^2)^{n/2}$。分子の $x_n$ と合わせて全ての $x_n$ が消えます。
<!-- solution-end -->

### Level C

#### PDE10-C01 二次元と高次元
- Level: C

$(r^{n-1}U')'=0$ から $n=2$ と $n\ge3$ の基本解形を導き、二次元だけ対数になる理由を説明せよ。

<!-- solution-start -->
##### 詳細解答
$U'=Cr^{1-n}$。$n\ne2$ なら $U=C r^{2-n}/(2-n)+D$。$n=2$ だけは $U'=C/r$ となり $U=C\log r+D$。指数 $2-n$ が0になる臨界次元で冪関数の代わりに対数が現れます。
<!-- solution-end -->

## 7. 章末チェック

- 一般次元の基本解を放射 Laplacian から導ける。
- Newton ポテンシャルが Poisson 方程式を解く機構を説明できる。
- 多次元平均値性質を証明できる。
- Kelvin 変換の調和性保存を追える。
- 半空間 Green 関数を鏡像法で構成できる。
