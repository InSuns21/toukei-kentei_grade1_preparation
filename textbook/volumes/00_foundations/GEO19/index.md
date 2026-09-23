# GEO19 幾何学 XIX：Gauss--Bonnet と二次元大域幾何

<!-- definition-example-audit: strict -->

[GEO8](../GEO8/index.md) では、向き付けられた多様体上の積分を構成し、[一般 Stokes の定理](../GEO8/index.md#thm-geo8-general-stokes)を証明しました。[GEO11](../GEO11/index.md) では、Euclid 空間内の曲面について Gauss 曲率が第一基本形式だけから決まる [Gauss の驚異の定理](../GEO11/index.md#thm-geo11-egregium)を得ました。[GEO16](../GEO16/index.md) では、その Gauss 曲率が二次元 Riemann 多様体の[断面曲率](../GEO16/index.md#def-geo16-sectional-curvature)そのものであることを確認しました。

ここまでの曲率は、各点で定まる局所的な微分量でした。本章では最後に、その局所量を曲面全体で積分します。すると

$$
\text{局所的な Gauss 曲率}
\quad\longrightarrow\quad
\text{曲面の大域的な位相}
$$

が一つの等式で結ばれます。

閉じた向き付け可能曲面では、その等式は

$$
\boxed{
\int_M K\,dA
=
2\pi\chi(M)
}
$$

です。左辺は Riemann 計量から作る微分幾何の量、右辺は三角形分割から作る位相の量です。

この章の証明の主線は

$$
\text{局所正規直交標構}
\longrightarrow
\text{接続1形式}
\longrightarrow
d\omega=K\,dA
\longrightarrow
\text{Stokes}
\longrightarrow
\text{局所 Gauss--Bonnet}
\longrightarrow
\text{三角形分割で相殺}
\longrightarrow
\text{大域 Gauss--Bonnet}
$$

です。

---

## 1. 曲面内で曲線がどれだけ曲がるか

$M$ を向き付けられた Riemann 曲面とします。向きと計量から、各接空間には「正の向きへ $90^\circ$ 回転する」線形写像

$$
J:T_pM\to T_pM
$$

が一意に定まります。正の正規直交基底 $(e_1,e_2)$ なら

$$
Je_1=e_2,
\qquad
Je_2=-e_1.
$$

単位速曲線 $\gamma$ の単位接ベクトルを $T=\dot\gamma$ とします。$g(T,T)=1$ を曲線に沿って微分すると、Levi-Civita 接続の計量両立性から

$$
0
=
\frac{d}{ds}g(T,T)
=
2g(\nabla_TT,T).
$$

従って $\nabla_TT$ は $T$ に直交し、二次元では $JT$ の方向にしか成分を持ちません。

<a id="def-geo19-geodesic-curvature"></a>
<!-- formal-statement-start -->
> **定義（測地曲率）**  
> $(M,g)$ を向き付けられた Riemann 曲面とし、$\gamma(s)$ を単位速曲線とする。単位接ベクトルを $T=\dot\gamma$ とし、向きから定まる正の $90^\circ$ 回転を $J$ とする。
>
> 曲線の **測地曲率**を
>
$$
\boxed{
k_g
=
g(\nabla_TT,JT)
}
$$
>
> と定める。
>
> 従って
>
$$
\boxed{
\nabla_TT=k_g\,JT
}
$$
>
> である。
<!-- formal-statement-end -->

<!-- definition-example-start: def-geo19-geodesic-curvature -->
**定義の確認：Euclid 円の符号**

標準向きの Euclid 平面で半径 $R$ の円を反時計回りに

$$
\gamma(s)
=
\left(
R\cos\frac{s}{R},
R\sin\frac{s}{R}
\right)
$$

と進みます。これは単位速で、

$$
T
=
\left(
-\sin\frac{s}{R},
\cos\frac{s}{R}
\right).
$$

正の $90^\circ$ 回転は $J(x,y)=(-y,x)$ なので

$$
JT
=
\left(
-\cos\frac{s}{R},
-\sin\frac{s}{R}
\right).
$$

Euclid 平面の Levi-Civita 接続は通常微分だから

$$
\nabla_TT
=
\frac{dT}{ds}
=
\frac1R JT.
$$

従って

$$
\boxed{
k_g=\frac1R
}.
$$

円板の[境界向き](../GEO8/index.md#def-geo8-boundary-orientation)は反時計回りなので、この符号規約では円板の外周の測地曲率は正です。
<!-- definition-example-end -->

曲面が Euclid 空間内で曲がっていても、測地曲率は曲面の中だけで測る量です。たとえば球面上の大円では、Euclid 空間での加速度は球面の法線方向だけを向くため、曲面内の共変加速度は0になります。

---

## 2. 局所正規直交標構の回転を1形式で記録する

向き付けられた Riemann 曲面の十分小さい開集合 $U$ では、正の滑らかな正規直交標構 $(e_1,e_2)$ を取れます。

Levi-Civita 接続は計量を保つので、$\nabla_Xe_1$ は $e_2$ 方向、$\nabla_Xe_2$ は $e_1$ 方向です。また $g(e_1,e_2)=0$ の微分から係数は逆符号になります。

<a id="def-geo19-connection-form"></a>
<!-- formal-statement-start -->
> **定義（接続1形式）**  
> $U$ 上の正の正規直交標構 $(e_1,e_2)$ に対し、
>
$$
\boxed{
\nabla_Xe_1=-\omega(X)e_2,
\qquad
\nabla_Xe_2=\omega(X)e_1
}
$$
>
> を満たす1形式 $\omega\in\Omega^1(U)$ を、この標構に関する **接続1形式**と呼ぶ。
<!-- formal-statement-end -->

<!-- definition-example-start: def-geo19-connection-form -->
**定義の確認：Euclid 平面の Cartesian 標構**

標準 Euclid 平面で

$$
e_1=\partial_x,
\qquad
e_2=\partial_y
$$

を取ります。Cartesian 標構は一定なので

$$
\nabla_Xe_1=0,
\qquad
\nabla_Xe_2=0.
$$

従って定義式から

$$
\boxed{
\omega=0
}
$$

です。

同じ平面でも標構を点ごとに回転させれば $\omega$ は一般には0ではありません。接続1形式そのものは標構依存です。
<!-- definition-example-end -->

<a id="prop-geo19-frame-change"></a>
<!-- formal-statement-start -->
> **命題（接続1形式の標構変換則）**  
> 正の正規直交標構 $(e_1,e_2)$ を滑らかな関数 $\varphi$ だけ回転して
>
$$
\widetilde e_1
=
\cos\varphi\,e_1+\sin\varphi\,e_2,
\qquad
\widetilde e_2
=
-\sin\varphi\,e_1+\cos\varphi\,e_2
$$
>
> とする。
>
> 元の接続1形式を $\omega$、回転後を $\widetilde\omega$ とすると
>
$$
\boxed{
\widetilde\omega
=
\omega-d\varphi
}
$$
>
> が成り立つ。従って
>
$$
\boxed{
d\widetilde\omega=d\omega
}
$$
>
> である。
<!-- formal-statement-end -->

### 証明の見取り図

$\widetilde e_1$ を $X$ 方向に微分します。係数の微分から $d\varphi(X)$、元の標構の微分から $\omega(X)$ が出ます。両者を $\widetilde e_2$ 方向へまとめます。

<!-- proof-start -->
### 証明

任意のベクトル場 $X$ に対して

$$
\begin{aligned}
\nabla_X\widetilde e_1
&=
-X(\varphi)\sin\varphi\,e_1
+
\cos\varphi\,\nabla_Xe_1
\\
&\quad
+
X(\varphi)\cos\varphi\,e_2
+
\sin\varphi\,\nabla_Xe_2.
\end{aligned}
$$

接続1形式の定義を代入すると

$$
\begin{aligned}
\nabla_X\widetilde e_1
&=
\bigl(-X(\varphi)\sin\varphi+\omega(X)\sin\varphi\bigr)e_1
\\
&\quad+
\bigl(X(\varphi)\cos\varphi-\omega(X)\cos\varphi\bigr)e_2
\\
&=
\bigl(d\varphi(X)-\omega(X)\bigr)\widetilde e_2.
\end{aligned}
$$

一方、

$$
\nabla_X\widetilde e_1
=
-\widetilde\omega(X)\widetilde e_2
$$

なので

$$
\widetilde\omega
=
\omega-d\varphi.
$$

外微分を取ると [GEO7 の $d^2=0$](../GEO7/index.md#thm-geo7-d2-zero) より

$$
d\widetilde\omega
=
d\omega-d^2\varphi
=
d\omega.
$$

$\square$
<!-- proof-end -->

---

## 3. 曲率は接続1形式の外微分である

向き付けられた Riemann 曲面の面積形式を $dA$ とします。正の正規直交標構では $dA(e_1,e_2)=1$ です。

<a id="thm-geo19-structure-equation"></a>
<!-- formal-statement-start -->
> **定理（二次元の曲率構造方程式）**  
> $(e_1,e_2)$ を局所的な正の正規直交標構とし、$\omega$ を
>
$$
\nabla_Xe_1=-\omega(X)e_2,
\qquad
\nabla_Xe_2=\omega(X)e_1
$$
>
> で定める接続1形式とする。
>
> [GEO16 の曲率符号規約](../GEO16/index.md#def-geo16-curvature)の下で、Gauss 曲率を $K$ とすると
>
$$
\boxed{
d\omega
=
K\,dA
}
$$
>
> が成り立つ。
<!-- formal-statement-end -->

### 証明の見取り図

$R(X,Y)e_2$ を接続1形式で展開します。$e_1$ 成分は $d\omega(X,Y)$ となり、正規直交標構 $(e_1,e_2)$ を代入すると断面曲率 $K$ に一致します。

<!-- proof-start -->
### 証明

まず

$$
\nabla_Ye_2=\omega(Y)e_1
$$

なので

$$
\nabla_X\nabla_Ye_2
=
X(\omega(Y))e_1
-
\omega(Y)\omega(X)e_2.
$$

同様に

$$
\nabla_Y\nabla_Xe_2
=
Y(\omega(X))e_1
-
\omega(X)\omega(Y)e_2.
$$

また

$$
\nabla_{[X,Y]}e_2
=
\omega([X,Y])e_1.
$$

従って

$$
R(X,Y)e_2
=
\left(
X(\omega(Y))
-
Y(\omega(X))
-
\omega([X,Y])
\right)e_1
=
d\omega(X,Y)e_1.
$$

$X=e_1$, $Y=e_2$ とすると、[断面曲率](../GEO16/index.md#def-geo16-sectional-curvature)の定義から

$$
K
=
g(R(e_1,e_2)e_2,e_1)
=
d\omega(e_1,e_2).
$$

二次元の任意の2形式は面積形式の関数倍で、$dA(e_1,e_2)=1$ だから

$$
d\omega=K\,dA.
$$

$\square$
<!-- proof-end -->

[GEO16 の二次元の系](../GEO16/index.md#cor-geo16-surface-gauss-sectional)により、この $K$ は Euclid 3空間内の曲面で GEO10・GEO11 が扱った Gauss 曲率とも一致します。

---

## 4. 境界上では接ベクトルの回転角が現れる

同じ標構で単位接ベクトルを

$$
T
=
\cos\theta\,e_1+\sin\theta\,e_2
$$

と書くと

$$
JT
=
-\sin\theta\,e_1+\cos\theta\,e_2.
$$

<a id="prop-geo19-angle-formula"></a>
<!-- formal-statement-start -->
> **命題（測地曲率と接ベクトル角の関係）**  
> 上の記号の下で
>
$$
\boxed{
k_g
=
\frac{d\theta}{ds}
-
\omega(T)
}
$$
>
> が成り立つ。曲線上の1形式として
>
$$
\boxed{
k_g\,ds
=
d\theta-\omega
}
$$
>
> である。
<!-- formal-statement-end -->

<!-- proof-start -->
### 証明

$T$ を曲線方向へ共変微分すると

$$
\begin{aligned}
\nabla_TT
&=
-\theta'\sin\theta\,e_1
+
\cos\theta\,\nabla_Te_1
\\
&\quad
+
\theta'\cos\theta\,e_2
+
\sin\theta\,\nabla_Te_2
\\
&=
\bigl(\theta'-\omega(T)\bigr)
\bigl(-\sin\theta\,e_1+\cos\theta\,e_2\bigr)
\\
&=
\bigl(\theta'-\omega(T)\bigr)JT.
\end{aligned}
$$

測地曲率の定義から

$$
k_g=\theta'-\omega(T).
$$

$\square$
<!-- proof-end -->

<a id="def-geo19-exterior-angle"></a>
<!-- formal-statement-start -->
> **定義（外角）**  
> 向き付けられた曲面上の正向きの区分的滑らかな境界を考える。角 $p$ の直前・直後の単位接ベクトルを $T_-$, $T_+$ とする。
>
> $T_-$ から $T_+$ へ曲面の向きを基準として回転する符号付き角を、その角の **外角** $\alpha$ とする。
>
> 凸な平面多角形で内角を $\beta$ とすると
>
$$
\boxed{
\alpha=\pi-\beta
}
$$
>
> である。
<!-- formal-statement-end -->

<!-- definition-example-start: def-geo19-exterior-angle -->
**定義の確認：正方形**

標準向きの平面で正方形の境界を反時計回りに進みます。各内角は $\pi/2$ なので各外角も $\pi/2$ です。従って

$$
\sum_{j=1}^4\alpha_j
=
4\cdot\frac{\pi}{2}
=
2\pi.
$$

境界接ベクトルは一周でちょうど一回転しています。
<!-- definition-example-end -->

### 平面回転数の最小入力

円板を囲む正向きの単純閉曲線について

$$
\boxed{
\int_{\text{滑らかな辺}}d\theta
+
\sum_j\alpha_j
=
2\pi
}
$$

を使います。

多角形なら辺上では $\theta$ が一定で、外角の総和が $2\pi$ です。区分的 $C^2$ の単純閉曲線は、接方向を保つ十分細かい内接多角形で近似し、辺上の回転量と角の回転量の和を極限へ送れば同じ式を得ます。

この「正向き単純閉曲線の回転数は1」という平面曲線の事実だけを、本章で必要な位相的入力として使います。

---

## 5. 局所 Gauss--Bonnet

<a id="thm-geo19-local-gauss-bonnet"></a>
<!-- formal-statement-start -->
> **定理（局所 Gauss--Bonnet の定理）**  
> $D$ を向き付けられた Riemann 曲面内のコンパクトな円板型領域とし、$D$ 全体を含む開集合上に正の正規直交標構が存在するとする。
>
> $\partial D$ は境界向きで正に進み、有限個の角 $p_1,\dots,p_m$ を除いて区分的 $C^2$ とする。各角の外角を $\alpha_j$、滑らかな辺の測地曲率を $k_g$ とする。
>
> このとき
>
$$
\boxed{
\int_D K\,dA
+
\int_{\partial D}k_g\,ds
+
\sum_{j=1}^m\alpha_j
=
2\pi
}
$$
>
> が成り立つ。
<!-- formal-statement-end -->

### 証明の見取り図

構造方程式 $K\,dA=d\omega$ を Stokes で境界へ移します。一方、境界では $k_g\,ds=d\theta-\omega$ です。足すと補助的な $\omega$ が消え、接ベクトル自身の回転量だけが残ります。

<!-- proof-start -->
### 証明

[曲率構造方程式](#thm-geo19-structure-equation)と[一般 Stokes の定理](../GEO8/index.md#thm-geo8-general-stokes)より

$$
\int_DK\,dA
=
\int_Dd\omega
=
\int_{\partial D}\omega.
$$

各滑らかな辺では

$$
k_g\,ds
=
d\theta-\omega.
$$

従って

$$
\int_DK\,dA
+
\int_{\partial D}k_g\,ds
=
\int_{\partial D}d\theta.
$$

角で接ベクトルが外角 $\alpha_j$ だけ跳ぶことも加えると、回転数の入力から

$$
\int_{\partial D}d\theta
+
\sum_{j=1}^m\alpha_j
=
2\pi.
$$

よって

$$
\int_D K\,dA
+
\int_{\partial D}k_g\,ds
+
\sum_{j=1}^m\alpha_j
=
2\pi.
$$

$\square$
<!-- proof-end -->

### 球面三角形

半径 $a$ の球面では $K=1/a^2$ です。大円弧の曲面内共変加速度は0なので、その辺では $k_g=0$ です。

内角を $A,B,C$ とすると外角は $\pi-A,\pi-B,\pi-C$ なので、

$$
\frac{\operatorname{Area}(D)}{a^2}
+
3\pi-(A+B+C)
=
2\pi.
$$

従って

$$
\boxed{
\operatorname{Area}(D)
=
a^2(A+B+C-\pi)
}.
$$

<a id="cor-geo19-spherical-excess"></a>
<!-- formal-statement-start -->
> **系（球面過剰公式）**  
> 半径 $a$ の球面上で、大円弧からなる三角形の内角を $A,B,C$ とすると
>
$$
\boxed{
\operatorname{Area}
=
a^2(A+B+C-\pi)
}
$$
>
> である。
<!-- formal-statement-end -->

