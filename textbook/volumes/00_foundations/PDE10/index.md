# PDE10 多次元 Laplace・Poisson 方程式とポテンシャル論

<!-- definition-example-audit: strict -->

PDE6 では二次元の対数基本解を、VC8 では三次元 Newton 核を扱いました。本章では両者を一般次元の同じ構造として見直し、半空間の境界値問題まで進みます。

符号は PDE6 と合わせ、

$$
-\Delta u=f
$$

を Poisson 方程式の基本形とします。

## 1. 放射対称関数の Laplacian

$n\ge2$、$r=|x|$ とし $u(x)=U(r)$ とします。

$$
\Delta u
=
U''(r)+\frac{n-1}{r}U'(r)
=
\frac1{r^{n-1}}
\frac d{dr}
\left(r^{n-1}U'(r)\right).
$$

従って原点外で調和的な放射対称関数は $r^{n-1}U'(r)=C$ を満たします。$n=2$ では $\log r$、$n\ge3$ では $r^{2-n}$ が現れます。

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

$
\int_0^\varepsilon r\,dr
=
\frac{\varepsilon^2}{2}
<\infty
$

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

固定した $x$ に対し $\Phi_n(x-y)$ を $y$ の関数として見ます。大きい球が $f$ の台を含むように取り、小球 $B_\varepsilon(x)$ を除いた領域へ [Green の第二恒等式](../PDE6/index.md#thm-pde6-green-second)を適用します。原点外では $\Delta_y\Phi_n(x-y)=0$ です。

外側境界では $f$ とその導関数が0です。小球上で $f(y)=f(x)+O(\varepsilon)$。単位流束から

$$
-\int_{\partial B_\varepsilon(x)}
f(y)\partial_n\Phi_n(x-y)dS_y
\to f(x).
$$

もう一つの境界項は、$n\ge3$ では $\Phi_n=O(\varepsilon^{2-n})$ と球面積 $O(\varepsilon^{n-1})$ の積が $O(\varepsilon)$、$n=2$ では $O(\varepsilon|\log\varepsilon|)$ なので0へ収束します。

この積分恒等式を $u=\Phi_n*f$ の $x$ 微分へ読み替えると $-\Delta u=f$ を得ます。
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

[Gauss--Ostrogradsky の発散定理](../VC4/index.md#thm-vc4-gauss-divergence)から

$$
\int_{|y-x_0|=r}\partial_nu\,dS
=
\int_{B_r(x_0)}\Delta u\,dy=0.
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

$r=|x|$, $y=I(x)$ とすると

$$
\partial_{x_i}y_j
=
r^{-2}\delta_{ij}
-
2r^{-4}x_ix_j.
$$

また

$$
\sum_i
\partial_{x_i}y_j
\partial_{x_i}y_k
=
r^{-4}\delta_{jk}.
$$

$v(x)=r^{2-n}u(y)$ を二回微分して $\Delta v$ を取ります。$u_{y_j}$ に掛かる一次微分項は、$r^{2-n}$ の微分から出る項と反転写像の二階微分から出る項の和が0になります。二階微分項だけが残り、

$$
\Delta v
=
r^{2-n}r^{-4}\Delta_yu
=
r^{-n-2}\Delta_yu.
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

境界法線微分から半空間 Poisson kernel

$$
P(x',x_n;y')
=
\frac{2}{\sigma_{n-1}}
\frac{x_n}
{\left(|x'-y'|^2+x_n^2\right)^{n/2}}
$$

が得られます。

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
