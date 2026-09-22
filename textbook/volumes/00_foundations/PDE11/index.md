# PDE11 変数分離・Bessel 方程式・Legendre 方程式・球面調和関数

<!-- definition-example-audit: strict -->

ODE6 で Bessel 方程式と Legendre 方程式を級数解として学びました。本章では「なぜその方程式が重要なのか」を PDE 側から回収します。

- 円板・円筒の半径方向 $\longrightarrow$ Bessel 方程式
- 球の極角方向 $\longrightarrow$ Legendre 方程式
- 球面上の固有関数 $\longrightarrow$ 球面調和関数

という対応が中心です。座標公式は [VC6 の円柱・球座標](../VC6/index.md#prop-vc6-spherical)を正本として使います。

## 1. 円板の Helmholtz 固有値問題

単位円板で

$$
-\Delta u=\lambda u,
\qquad
u|_{r=1}=0
$$

を考えます。極座標では

$$
\Delta u
=
u_{rr}+\frac1r u_r+\frac1{r^2}u_{\theta\theta}.
$$

$u(r,\theta)=R(r)\Theta(\theta)$ と置くと

$$
-\frac{r^2R''+rR'}{R}
-
\lambda r^2
=
\frac{\Theta''}{\Theta}.
$$

両辺は別変数だけの関数なので定数です。$2\pi$ 周期性から角方向は $m\in\mathbb Z$ となります。

<a id="prop-pde11-bessel-separation"></a>
<!-- formal-statement-start -->
> **命題（円板の変数分離と Bessel 方程式）**  
> $u=R(r)e^{im\theta}$ $(m\in\mathbb Z)$ を
>
> $$
> -\Delta u=\lambda u
> $$
>
> へ代入すると、$R$ は
>
> $$
> r^2R''+rR'+(\lambda r^2-m^2)R=0
> $$
>
> を満たす。$\rho=\sqrt\lambda\,r$ と置けば
>
> $$
> \rho^2R_{\rho\rho}
> +\rho R_\rho
> +(\rho^2-m^2)R=0,
> $$
>
> すなわち次数 $|m|$ の Bessel 方程式になる。
<!-- formal-statement-end -->

<!-- proof-start -->
### 証明

$u_{\theta\theta}=-m^2u$ なので

$$
-\left(
R''+\frac1rR'-\frac{m^2}{r^2}R
\right)
=
\lambda R.
$$

$r^2$ を掛ければ最初の式を得ます。$\rho=\sqrt\lambda r$ では

$$
\frac d{dr}=\sqrt\lambda\frac d{d\rho},
\qquad
\frac{d^2}{dr^2}=\lambda\frac{d^2}{d\rho^2},
$$

を代入して標準形になります。
<!-- proof-end -->

## 2. 原点の正則性が $J_m$ を選ぶ

ODE6 の Frobenius 解析から、整数次数 $m\ge0$ では原点で有限な解として Bessel 関数 $J_m$ が選ばれます。もう一つの独立解は原点で特異になります。

<a id="def-pde11-bessel-mode"></a>
<!-- formal-statement-start -->
> **定義（円板の Bessel モード）**  
> $j_{m,k}$ を $J_m$ の第 $k$ 正零点とする。単位円板の Dirichlet 条件に対し
>
> $$
> u_{m,k}(r,\theta)
> =
> J_m(j_{m,k}r)e^{im\theta}
> $$
>
> を円板の Bessel モードと呼ぶ。対応する固有値は
>
> $$
> \lambda_{m,k}=j_{m,k}^2
> $$
>
> である。
<!-- formal-statement-end -->

<!-- definition-example-start: def-pde11-bessel-mode -->
$m=0$ なら角度に依存しない放射対称モードで、

$$
u_{0,k}(r)=J_0(j_{0,k}r).
$$

$r=1$ で $J_0(j_{0,k})=0$ なので Dirichlet 条件を直接満たします。
<!-- definition-example-end -->

円板半径が $a$ なら $j_{m,k}r/a$ へ尺度変換し、固有値は $(j_{m,k}/a)^2$ です。

## 3. 円筒・膜・熱方程式へ戻る

円板上の熱方程式

$$
u_t=\kappa\Delta u
$$

では一つの Bessel モードは

$$
e^{-\kappa j_{m,k}^2t}
J_m(j_{m,k}r)e^{im\theta}
$$

と指数減衰します。波動方程式では同じ空間モードが角振動数 $cj_{m,k}$ で振動します。PDE7 の「固有値が時間応答を決める」が、長方形の正弦関数から円板の Bessel 関数へ置き換わっただけです。

## 4. 球座標では角方向が球面上の固有値問題になる

三次元球座標で

$$
\Delta
=
\frac1{r^2}\partial_r(r^2\partial_r)
+
\frac1{r^2}\Delta_{S^2},
$$

ここで

$$
\Delta_{S^2}
=
\frac1{\sin\theta}
\partial_\theta
(\sin\theta\,\partial_\theta)
+
\frac1{\sin^2\theta}\partial_{\phi\phi}
$$

です。

<a id="def-pde11-spherical-harmonic"></a>
<!-- formal-statement-start -->
> **定義（球面調和関数）**  
> 球面 $S^2$ 上の滑らかな関数 $Y$ が
>
> $$
> -\Delta_{S^2}Y
> =
> \ell(\ell+1)Y,
> \qquad
> \ell=0,1,2,\ldots
> $$
>
> を満たすとき、次数 $\ell$ の球面調和関数という。
<!-- formal-statement-end -->

<!-- definition-example-start: def-pde11-spherical-harmonic -->
### 最初の球面調和関数

$\ell=0$ では定数関数。$\ell=1$ では球面上の座標関数

$$
x/r,\qquad y/r,\qquad z/r
$$

が代表例です。
<!-- definition-example-end -->

## 5. Legendre 方程式は軸対称な球面調和関数

$\phi$ に依存しない $Y(\theta)=\Theta(\theta)$ を考えると

$$
-\frac1{\sin\theta}
\frac d{d\theta}
\left(
\sin\theta\frac{d\Theta}{d\theta}
\right)
=
\ell(\ell+1)\Theta.
$$

$x=\cos\theta$ と置きます。

<a id="prop-pde11-legendre"></a>
<!-- formal-statement-start -->
> **命題（球面固有値問題と Legendre 方程式）**  
> 軸対称な球面調和関数 $Y(\theta)=P(\cos\theta)$ は
>
> $$
> (1-x^2)P''-2xP'
> +\ell(\ell+1)P=0
> $$
>
> を満たす。両極で有限な多項式解が Legendre 多項式 $P_\ell$ である。
<!-- formal-statement-end -->

<!-- proof-start -->
### 証明

$x=\cos\theta$ なので

$$
\frac d{d\theta}
=
-\sin\theta\frac d{dx}.
$$

従って

$$
\sin\theta\frac{d\Theta}{d\theta}
=
-(1-x^2)P'(x).
$$

さらに $\theta$ 微分を取り $-1/\sin\theta$ を掛けると

$$
-\frac1{\sin\theta}
\frac d{d\theta}
\left(
\sin\theta\Theta'
\right)
=
-\frac d{dx}
\left(
(1-x^2)P'
\right).
$$

これが $\ell(\ell+1)P$ に等しいので展開して主張の Legendre 方程式を得ます。
<!-- proof-end -->

## 6. 方位角を入れると associated Legendre 方程式になる

$Y(\theta,\phi)=\Theta(\theta)e^{im\phi}$ と置けば $\partial_{\phi\phi}Y=-m^2Y$ です。$x=\cos\theta$ へ移すと

$$
(1-x^2)\Theta_{xx}
-2x\Theta_x
+
\left[
\ell(\ell+1)
-
\frac{m^2}{1-x^2}
\right]\Theta
=
0.
$$

これは associated Legendre 方程式です。

<a id="prop-pde11-spherical-eigenmode"></a>
<!-- formal-statement-start -->
> **命題（標準球面調和モード）**  
> $|m|\le\ell$ とする。associated Legendre 関数 $P_\ell^{|m|}$ を用いれば
>
> $$
> Y_\ell^m(\theta,\phi)
> =
> C_{\ell m}
> P_\ell^{|m|}(\cos\theta)e^{im\phi}
> $$
>
> は
>
> $$
> -\Delta_{S^2}Y_\ell^m
> =
> \ell(\ell+1)Y_\ell^m
> $$
>
> を満たす。定数 $C_{\ell m}$ は規格化により選べる。
<!-- formal-statement-end -->

<!-- proof-start -->
### 証明

上の変数分離計算で $e^{im\phi}$ を代入すると、角度 $\theta$ の方程式は associated Legendre 方程式そのものです。$P_\ell^{|m|}$ をその正則解として選べば、元の球面 Laplacian 固有値方程式を満たします。定数倍は線形固有値方程式を変えません。
<!-- proof-end -->

## 7. 球内部の調和関数

<a id="prop-pde11-solid-harmonic"></a>
<!-- formal-statement-start -->
> **命題（球面調和関数から得る solid harmonic）**  
> 次数 $\ell$ の球面調和関数 $Y_\ell$ に対し
>
> $$
> u(r,\omega)=r^\ell Y_\ell(\omega)
> $$
>
> は原点を含む全空間で調和的である。原点外では
>
> $$
> r^{-\ell-1}Y_\ell(\omega)
> $$
>
> も調和的である。
<!-- formal-statement-end -->

### 証明の見取り図

球座標 Laplacian に $R(r)Y_\ell(\omega)$ を代入すると

$$
r^2R''+2rR'-\ell(\ell+1)R=0
$$

という Cauchy--Euler 方程式になります。

<!-- proof-start -->
### 証明

$$
\Delta(RY)
=
\left(
R''+\frac2rR'
\right)Y
+
\frac{R}{r^2}\Delta_{S^2}Y.
$$

$\Delta_{S^2}Y=-\ell(\ell+1)Y$ を使うと、調和性は

$$
r^2R''+2rR'-\ell(\ell+1)R=0
$$

と同値です。$R=r^q$ を代入すると

$$
q(q-1)+2q-\ell(\ell+1)=0,
$$

すなわち

$$
(q-\ell)(q+\ell+1)=0.
$$

従って $q=\ell$ または $q=-\ell-1$ です。
<!-- proof-end -->

## 8. 有限モードの球 Dirichlet 問題

境界データが有限和

$$
g(\omega)=\sum_{\ell=0}^L\sum_{m=-\ell}^{\ell}a_{\ell m}Y_\ell^m(\omega)
$$

なら単位球内部の調和延長は

$$
u(r,\omega)
=
\sum_{\ell=0}^L\sum_{m=-\ell}^{\ell}
a_{\ell m}r^\ell Y_\ell^m(\omega).
$$

有限和なので微分交換に問題はなく、各項は前節で調和的、$r=1$ で境界データへ一致します。

一般の $L^2(S^2)$ に対する球面調和関数の完全性は、コンパクト自己共役作用素を用いる一般の固有関数完全性理論と接続する結果なので、本章では意図的に有限モードで閉じます。

## 演習

### Level A

#### PDE11-A01 Bessel 方程式の導出
- Level: A

$u=R(r)e^{im\theta}$ を $-\Delta u=\lambda u$ へ代入し半径方程式を導け。

<!-- solution-start -->
##### 詳細解答
$u_{\theta\theta}=-m^2u$ を極座標 Laplacian へ代入すると
$$
-R''-\frac1rR'+\frac{m^2}{r^2}R=\lambda R.
$$
$r^2$ を掛けて本文の Bessel 型方程式を得ます。
<!-- solution-end -->

#### PDE11-A02 Dirichlet 境界
- Level: A

半径 $a$ の円板で $J_m(kr)e^{im\theta}$ が境界条件を満たす条件を求めよ。

<!-- solution-start -->
##### 詳細解答
$r=a$ で0なので $J_m(ka)=0$。従って $ka=j_{m,k}$、すなわち $k=j_{m,k}/a$ です。
<!-- solution-end -->

#### PDE11-A03 Legendre の最初の多項式
- Level: A

$P_0(x)=1$, $P_1(x)=x$ がそれぞれ $\ell=0,1$ の Legendre 方程式を満たすことを確認せよ。

<!-- solution-start -->
##### 詳細解答
$P_0'=P_0''=0$ なので $\ell=0$ の式は0。$P_1'=1,P_1''=0$ なので $-2x+2x=0$ です。
<!-- solution-end -->

#### PDE11-A04 solid harmonic
- Level: A

$\ell=1$ で $rY_1$ が一次調和多項式になることを $Y=x/r$ の例で確認せよ。

<!-- solution-start -->
##### 詳細解答
$r(x/r)=x$。$\Delta x=0$ なので確かに調和的です。
<!-- solution-end -->

### Level B

#### PDE11-B01 円板熱方程式
- Level: B

$u(0,r,\theta)=J_0(j_{0,1}r)$、零 Dirichlet 境界の熱方程式を解け。

<!-- solution-start -->
##### 詳細解答
空間モードの固有値は $j_{0,1}^2$ なので
$$
u(t,r)=e^{-\kappa j_{0,1}^2t}J_0(j_{0,1}r).
$$
<!-- solution-end -->

#### PDE11-B02 軸対称球面モード
- Level: B

$P_2(x)=(3x^2-1)/2$ が $\ell=2$ の Legendre 方程式を満たすことを確認せよ。

<!-- solution-start -->
##### 詳細解答
$P_2'=3x$, $P_2''=3$。代入すると
$$
3(1-x^2)-6x^2+6\frac{3x^2-1}{2}=0.
$$
<!-- solution-end -->

#### PDE11-B03 球内部の境界延長
- Level: B

単位球の境界データ $g(\theta)=P_2(\cos\theta)$ の調和延長を求めよ。

<!-- solution-start -->
##### 詳細解答
次数2の球面調和モードなので
$$
u(r,\theta)=r^2P_2(\cos\theta)
$$
です。各項は solid harmonic で、$r=1$ で境界値に一致します。
<!-- solution-end -->

### Level C

#### PDE11-C01 長方形から円板・球へ
- Level: C

PDE7 の長方形の正弦固有モードと、本章の円板 Bessel モード・球面調和モードを比較し、「変数分離で特殊関数が生まれる理由」を説明せよ。

<!-- solution-start -->
##### 詳細解答
直交座標では Laplacian が各座標の二階微分の和で、境界条件から正弦・余弦が固有関数になります。極座標では尺度因子 $1/r,1/r^2$ が入り、半径方程式が Bessel 方程式になります。球座標では角度部分が球面 Laplacian の固有値問題となり Legendre / associated Legendre が現れます。特殊関数は「変な公式」ではなく、座標幾何と境界条件に適合した Laplacian の固有関数です。
<!-- solution-end -->

## 9. 章末チェック

- 円板の変数分離から Bessel 方程式を導ける。
- Bessel 零点と Dirichlet 固有値を結び付けられる。
- 球面 Laplacian から Legendre 方程式を導ける。
- 球面調和関数と solid harmonic を説明できる。
- Bessel / Legendre を熱・波動・Laplace の固有モードへ戻せる。
