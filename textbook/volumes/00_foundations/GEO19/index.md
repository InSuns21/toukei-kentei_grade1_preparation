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
**定義の確認：Euclid 平面の 標準座標標構**

標準 Euclid 平面で

$$
e_1=\partial_x,
\qquad
e_2=\partial_y
$$

を取ります。標準座標標構は一定なので

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


---

## 6. Euler 標数：三角形の数え上げから位相を作る

局所公式を曲面全体へ足し上げるには、曲面を小さな円板型領域へ分ける必要があります。本章では有限三角形分割を使います。

コンパクトな滑らかな曲面は有限個の滑らかな三角形で分割でき、二つの有限三角形分割には共通細分が存在する、という曲面の三角形分割定理を技術入力として使います。この存在定理そのものの証明は組合せ位相の独立した主題なので、本章の停止線の外に置きます。

<a id="def-geo19-euler-characteristic"></a>
<!-- formal-statement-start -->
> **定義（Euler 標数）**  
> コンパクトな曲面 $M$ の有限三角形分割について、
>
> - 頂点数を $V$
> - 辺数を $E$
> - 面の三角形数を $F$
>
> とする。このとき
>
$$
\boxed{
\chi(M)
=
V-E+F
}
$$
>
> を $M$ の **Euler 標数**という。
<!-- formal-statement-end -->

<!-- definition-example-start: def-geo19-euler-characteristic -->
**定義の確認：球面**

四面体の境界は球面の三角形分割を与えます。

$$
V=4,
\qquad
E=6,
\qquad
F=4.
$$

従って

$$
\chi(S^2)
=
4-6+4
=
2.
$$
<!-- definition-example-end -->

### なぜ細分しても $V-E+F$ は変わらないか

辺の途中に新しい頂点を一つ入れる細分では

$$
V\mapsto V+1,
\qquad
E\mapsto E+1,
\qquad
F\mapsto F,
$$

なので

$$
(V+1)-(E+1)+F
=
V-E+F.
$$

三角形内部に新しい頂点を置き、三頂点へ結んで三つの三角形に分けると

$$
V\mapsto V+1,
\qquad
E\mapsto E+3,
\qquad
F\mapsto F+2,
$$

なので

$$
(V+1)-(E+3)+(F+2)
=
V-E+F.
$$

一般の有限細分はこの種の局所細分へ分解できます。二つの三角形分割には共通細分があるため、どちらから計算しても $V-E+F$ は同じです。

ここで役割を分けると、

- 三角形分割の存在・共通細分：位相側の技術入力
- 細分で $V-E+F$ が変わらないこと：上の直接計算
- 曲率との関係：次節の Gauss--Bonnet

です。

---

## 7. 閉曲面の Gauss--Bonnet

<a id="thm-geo19-gauss-bonnet-closed"></a>
<!-- formal-statement-start -->
> **定理（Gauss--Bonnet の定理：閉曲面）**  
> $(M,g)$ をコンパクトで境界を持たない向き付けられた Riemann 曲面とする。
>
> Gauss 曲率を $K$、面積形式を $dA$ とすると
>
$$
\boxed{
\int_M K\,dA
=
2\pi\chi(M)
}
$$
>
> が成り立つ。
<!-- formal-statement-end -->

### 証明の見取り図

三角形分割を十分細かくし、各三角形が一つの正規直交標構を持つ開集合に入るようにします。各三角形に局所 Gauss--Bonnet を適用して足します。

すると、

1. 共有辺は二つの三角形から逆向きに現れるので測地曲率積分が相殺する。
2. 一つの頂点の周囲の内角和は $2\pi$ なので、角項が頂点数 $V$ にまとまる。
3. 閉三角形分割では各辺がちょうど二つの三角形に接するので $3F=2E$。

この三つだけで $2\pi(V-E+F)$ が残ります。

<!-- proof-start -->
### 証明

$M$ の有限三角形分割を十分細かく取り、各閉三角形 $\Delta$ が一つの局所正規直交標構を持つ開集合に含まれるようにします。

各三角形に[局所 Gauss--Bonnet](#thm-geo19-local-gauss-bonnet)を適用すると

$$
\int_\Delta K\,dA
+
\int_{\partial\Delta}k_g\,ds
+
\sum_{\text{角 }c\subset\Delta}\alpha_c
=
2\pi.
$$

全 $F$ 個の三角形について足します。面積積分は

$$
\sum_\Delta\int_\Delta K\,dA
=
\int_MK\,dA.
$$

次に内部辺を一つ固定します。隣り合う二つの三角形はその辺を逆向きにたどります。向きを反転すると

$$
T\mapsto -T,
\qquad
JT\mapsto -JT,
$$

一方で

$$
\nabla_{-T}(-T)=\nabla_TT.
$$

従って測地曲率は符号反転し、共有辺の二つの積分は相殺します。閉曲面には外側の境界がないので

$$
\sum_\Delta
\int_{\partial\Delta}k_g\,ds
=
0.
$$

各三角形の一つの角で内角を $\beta_c$ とすると

$$
\alpha_c=\pi-\beta_c.
$$

角は全部で $3F$ 個あるので

$$
\sum_c\alpha_c
=
3\pi F-\sum_c\beta_c.
$$

閉曲面の各頂点の周囲を全ての三角形が隙間なく埋めるため、一つの頂点での内角和は $2\pi$ です。頂点が $V$ 個あるので

$$
\sum_c\beta_c
=
2\pi V.
$$

従って全角項は

$$
3\pi F-2\pi V.
$$

右辺は三角形ごとに $2\pi$ なので $2\pi F$ です。以上より

$$
\int_MK\,dA
+
3\pi F-2\pi V
=
2\pi F.
$$

従って

$$
\int_MK\,dA
=
2\pi V-\pi F.
$$

最後に、閉曲面の三角形分割では各三角形が3辺を持ち、各辺は二つの三角形に共有されるため

$$
3F=2E.
$$

よって

$$
\begin{aligned}
2\pi\chi(M)
&=
2\pi(V-E+F)
\\
&=
2\pi V-2\pi E+2\pi F
\\
&=
2\pi V-3\pi F+2\pi F
\\
&=
2\pi V-\pi F.
\end{aligned}
$$

したがって

$$
\boxed{
\int_MK\,dA
=
2\pi\chi(M)
}.
$$

$\square$
<!-- proof-end -->

局所的な曲率を積分すると計量の細部が消え、位相不変量だけが残りました。

---

## 8. 境界付き Gauss--Bonnet

三角形分割した曲面に本当の境界がある場合、内部辺だけが相殺し、外側の境界上の測地曲率が残ります。境界の角では外角項も残ります。

<a id="thm-geo19-gauss-bonnet-boundary"></a>
<!-- formal-statement-start -->
> **定理（Gauss--Bonnet の定理：境界付き曲面）**  
> $(M,g)$ をコンパクトで向き付けられた Riemann 曲面とし、$\partial M$ を境界向きで向き付ける。
>
> $\partial M$ が有限個の角 $p_1,\dots,p_m$ を除いて区分的 $C^2$ で、角の外角を $\alpha_j$ とする。このとき
>
$$
\boxed{
\int_MK\,dA
+
\int_{\partial M}k_g\,ds
+
\sum_{j=1}^m\alpha_j
=
2\pi\chi(M)
}
$$
>
> が成り立つ。
>
> 特に境界が滑らかなら
>
$$
\boxed{
\int_MK\,dA
+
\int_{\partial M}k_g\,ds
=
2\pi\chi(M)
}
$$
>
> である。
<!-- formal-statement-end -->

### 証明の見取り図

閉曲面の場合と同じ和を取ります。内部辺は相殺しますが、境界辺は一度しか現れないので $\int_{\partial M}k_g\,ds$ が残ります。内部頂点と境界頂点を分けて数え、最後に境界の本当の外角を加えます。

<!-- proof-start -->
### 証明

境界の角を三角形分割の頂点に含む有限三角形分割を取ります。

内部頂点数を $V_i$、境界頂点数を $V_b$、内部辺数を $E_i$、境界辺数を $E_b$、面数を $F$ とします。

各三角形に局所 Gauss--Bonnet を適用して足すと、内部辺の測地曲率積分は相殺します。境界辺は一つの三角形にしか属さないため

$$
\sum_\Delta\int_{\partial\Delta}k_g\,ds
=
\int_{\partial M}k_g\,ds.
$$

三角形の全角数は $3F$ です。内部頂点では内角和が $2\pi$ です。境界頂点 $v$ では、曲面の内部側に見える角を $\beta_v$ と書きます。従って三角形の外角項の総和は

$$
3\pi F
-
2\pi V_i
-
\sum_{v\in\partial M}\beta_v.
$$

右辺を全三角形について足すと $2\pi F$ なので

$$
\int_MK\,dA
+
\int_{\partial M}k_g\,ds
+
3\pi F
-
2\pi V_i
-
\sum_{v\in\partial M}\beta_v
=
2\pi F.
$$

従って

$$
\int_MK\,dA
+
\int_{\partial M}k_g\,ds
=
2\pi V_i
+
\sum_{v\in\partial M}\beta_v
-
\pi F.
$$

本当の境界外角は

$$
\alpha_v=\pi-\beta_v
$$

なので

$$
\sum_v\alpha_v
=
\pi V_b-\sum_v\beta_v.
$$

従って

$$
\int_MK\,dA
+
\int_{\partial M}k_g\,ds
+
\sum_v\alpha_v
=
2\pi V_i+\pi V_b-\pi F.
$$

一方、三角形の辺を数えると

$$
3F=2E_i+E_b.
$$

各境界成分は閉じた多角形なので

$$
E_b=V_b.
$$

また

$$
V=V_i+V_b,
\qquad
E=E_i+E_b.
$$

よって

$$
\begin{aligned}
2\chi(M)
&=
2(V-E+F)
\\
&=
2V_i+2V_b-2E_i-2E_b+2F
\\
&=
2V_i-2E_i+2F
\\
&=
2V_i-(3F-V_b)+2F
\\
&=
2V_i+V_b-F.
\end{aligned}
$$

両辺に $\pi$ を掛ければ

$$
2\pi\chi(M)
=
2\pi V_i+\pi V_b-\pi F.
$$

従って所望の式を得ます。$\square$
<!-- proof-end -->

### 円板で確認する

Euclid 円板では $K=0$, $\chi(D^2)=1$ です。半径 $R$ の円周では $k_g=1/R$、周長は $2\pi R$ なので

$$
\int_{\partial D^2}k_g\,ds
=
2\pi.
$$

確かに

$$
0+2\pi
=
2\pi\chi(D^2).
$$

### 環状領域で境界向きを確認する

Euclid 平面の環状領域

$$
A=\{r\le |x|\le R\}
$$

では

$$
K=0,
\qquad
\chi(A)=0.
$$

外側境界は反時計回りで測地曲率積分は $2\pi$。内側境界は誘導向きが時計回りになり、測地曲率積分は $-2\pi$ です。従って

$$
\int_{\partial A}k_g\,ds
=
0
=
2\pi\chi(A).
$$

内側まで反時計回りにすると符号が壊れます。ここで GEO8 の境界向きが本質的に働いています。

---

## 9. 球面・トーラス・高種数曲面

### 9.1 球面：正曲率の総量は半径に依らない

半径 $a$ の球面では

$$
K=\frac1{a^2},
\qquad
\operatorname{Area}(S_a^2)=4\pi a^2.
$$

従って

$$
\int_{S_a^2}K\,dA
=
4\pi.
$$

Gauss--Bonnet から $\chi(S^2)=2$ です。半径を変えると点ごとの曲率と面積は逆向きに変わり、積分では完全に相殺します。

### 9.2 標準トーラス：正負の曲率が相殺する

[GEO10 の標準トーラス](../GEO10/index.md)を

$$
X(u,v)
=
\bigl(
(R+r\cos v)\cos u,
(R+r\cos v)\sin u,
r\sin v
\bigr),
\qquad
R>r>0
$$

とします。

GEO10 で

$$
K
=
\frac{\cos v}{r(R+r\cos v)}
$$

を得ました。また第一基本形式から

$$
dA
=
r(R+r\cos v)\,du\,dv.
$$

従って

$$
K\,dA
=
\cos v\,du\,dv.
$$

よって

$$
\begin{aligned}
\int_{T^2}K\,dA
&=
\int_0^{2\pi}\int_0^{2\pi}
\cos v\,dv\,du
\\
&=
0.
\end{aligned}
$$

Gauss--Bonnet から $\chi(T^2)=0$ です。外側の正曲率と内側の負曲率は、全積分として厳密に相殺します。

### 9.3 種数と全曲率

球面に $g$ 個の取っ手を付けた標準的な閉向き付け可能曲面を $\Sigma_g$ と書きます。

標準的な $4g$ 角形表示では、辺を同一視した後

$$
V=1,
\qquad
E=2g,
\qquad
F=1
$$

という胞体分解を持ちます。三角形分割へ細分しても Euler 標数は変わらないため

$$
\boxed{
\chi(\Sigma_g)
=
2-2g
}.
$$

Gauss--Bonnet により

$$
\boxed{
\int_{\Sigma_g}K\,dA
=
4\pi(1-g)
}.
$$

<a id="cor-geo19-genus-total-curvature"></a>
<!-- formal-statement-start -->
> **系（種数と全 Gauss 曲率）**  
> 種数 $g$ の閉じた向き付け可能 Riemann 曲面 $\Sigma_g$ では
>
$$
\boxed{
\int_{\Sigma_g}K\,dA
=
4\pi(1-g)
}
$$
>
> が成り立つ。
<!-- formal-statement-end -->

「全ての閉向き付け可能曲面がある $\Sigma_g$ と同相である」という曲面分類定理の証明は、本章では用いません。分類定理まで採用すれば $g$ は閉向き付け可能曲面を分類する位相不変量になります。

---

## 10. 曲率の符号だけで位相に制約がかかる

<a id="cor-geo19-curvature-sign"></a>
<!-- formal-statement-start -->
> **系（曲率符号による位相制約）**  
> $M$ を連結な閉向き付け可能 Riemann 曲面とする。
>
> 1. $K>0$ が全点で成り立つなら $\chi(M)>0$。
> 2. $K\ge0$ が全点で成り立ち、少なくとも一点で $K>0$ なら $\chi(M)>0$。
> 3. $K\equiv0$ なら $\chi(M)=0$。
> 4. $K<0$ が全点で成り立つなら $\chi(M)<0$。
>
> 特に $M=\Sigma_g$ なら、正曲率は $g=0$、平坦計量は $g=1$、負曲率は $g\ge2$ を必要とする。
<!-- formal-statement-end -->

<!-- proof-start -->
### 証明

Gauss--Bonnet より

$$
2\pi\chi(M)
=
\int_MK\,dA.
$$

面積形式は正なので、$K$ の符号条件は積分の符号へ移ります。

$K\ge0$ で一点 $p$ において $K(p)>0$ なら、連続性により $p$ のある開近傍で $K$ は正です。その近傍の面積は正なので全積分は正になります。

$\Sigma_g$ では $\chi(\Sigma_g)=2-2g$ なので、その符号へ翻訳すれば結論を得ます。$\square$
<!-- proof-end -->

この系は必要条件です。たとえば「$g\ge2$ なら必ず負曲率計量を構成できる」という逆向きの存在主張は、ここで証明した内容ではありません。その存在論を統一的に扱うには一様化定理など別の理論が必要です。

---

## 11. Gauss--Bonnet で何が起きたのか

証明を閉じたまま主線を振り返ると、次の四段階です。

第一に、局所正規直交標構の回転を接続1形式 $\omega$ で測りました。

第二に、Levi-Civita 接続の交換子から

$$
d\omega=K\,dA
$$

を得ました。

第三に、Stokes により $\int_DK\,dA$ を境界上の回転へ移しました。境界では測地曲率と接ベクトルの回転角が差として現れました。

第四に、三角形分割した曲面で全局所公式を足すと、内部辺は逆向きで消え、頂点まわりの角は $2\pi$ にまとまりました。残った組合せが $V-E+F$ です。

つまり Gauss--Bonnet は

$$
\boxed{
\text{曲率の局所微分}
\;\xrightarrow{\text{Stokes}}\;
\text{境界の回転}
\;\xrightarrow{\text{貼り合わせ}}\;
\text{Euler 標数}
}
$$

という定理です。


---

## 12. 演習

### Level A

<a id="ex-geo19-a01"></a>
#### GEO19-A01 Euclid 円板の境界測地曲率
- Level: A

標準向きの Euclid 平面で半径 $R$ の円板 $D_R$ を考える。境界を誘導向きで進むとき、測地曲率 $k_g$ と

$$
\int_{\partial D_R}k_g\,ds
$$

を求め、境界付き Gauss--Bonnet を確認せよ。

<!-- solution-start -->
**解答**

円板の境界向きは反時計回りです。弧長表示を

$$
\gamma(s)
=
\left(
R\cos\frac{s}{R},
R\sin\frac{s}{R}
\right),
\qquad
0\le s\le2\pi R
$$

とします。

単位接ベクトルは

$$
T
=
\left(
-\sin\frac{s}{R},
\cos\frac{s}{R}
\right),
$$

正の $90^\circ$ 回転は

$$
JT
=
\left(
-\cos\frac{s}{R},
-\sin\frac{s}{R}
\right).
$$

Euclid 接続では

$$
\nabla_TT
=
\frac{dT}{ds}
=
\frac1RJT.
$$

従って

$$
k_g
=
g(\nabla_TT,JT)
=
\frac1R.
$$

よって

$$
\int_{\partial D_R}k_g\,ds
=
\int_0^{2\pi R}\frac1R\,ds
=
2\pi.
$$

Euclid 平面では $K=0$、円板では $\chi(D_R)=1$ なので

$$
\int_{D_R}K\,dA
+
\int_{\partial D_R}k_g\,ds
=
0+2\pi
=
2\pi\chi(D_R).
$$

Gauss--Bonnet が成立します。
<!-- solution-end -->

<a id="ex-geo19-a02"></a>
#### GEO19-A02 球面の全 Gauss 曲率
- Level: A

半径 $a$ の球面 $S_a^2$ について、Gauss 曲率と面積から全 Gauss 曲率を直接計算し、Euler 標数を求めよ。

<!-- solution-start -->
**解答**

半径 $a$ の球面の Gauss 曲率は

$$
K=\frac1{a^2},
$$

面積は

$$
\operatorname{Area}(S_a^2)=4\pi a^2.
$$

従って

$$
\int_{S_a^2}K\,dA
=
\frac1{a^2}\,4\pi a^2
=
4\pi.
$$

閉曲面の Gauss--Bonnet より

$$
4\pi
=
2\pi\chi(S_a^2).
$$

よって

$$
\boxed{
\chi(S_a^2)=2
}.
$$

半径 $a$ は最終結果から消えます。
<!-- solution-end -->

<a id="ex-geo19-a03"></a>
#### GEO19-A03 標準トーラスの全曲率
- Level: A

$R>r>0$ とし、

$$
X(u,v)
=
\bigl(
(R+r\cos v)\cos u,
(R+r\cos v)\sin u,
r\sin v
\bigr)
$$

で標準トーラスを表す。既知の公式

$$
K
=
\frac{\cos v}{r(R+r\cos v)},
\qquad
dA
=
r(R+r\cos v)\,du\,dv
$$

を用いて全 Gauss 曲率を求めよ。

<!-- solution-start -->
**解答**

積を取ると

$$
K\,dA
=
\cos v\,du\,dv.
$$

従って

$$
\begin{aligned}
\int_{T^2}K\,dA
&=
\int_0^{2\pi}
\int_0^{2\pi}
\cos v\,dv\,du
\\
&=
\int_0^{2\pi}
[\sin v]_{0}^{2\pi}\,du
\\
&=
0.
\end{aligned}
$$

Gauss--Bonnet より

$$
0
=
2\pi\chi(T^2),
$$

したがって

$$
\boxed{
\chi(T^2)=0
}.
$$

$K$ は外側で正、内側で負ですが、その寄与が面積重み付きで相殺しています。
<!-- solution-end -->

<a id="ex-geo19-a04"></a>
#### GEO19-A04 球面三角形の面積
- Level: A

半径 $a$ の球面上で、大円弧に囲まれた三角形の内角が

$$
A=B=C=\frac{2\pi}{3}
$$

であるとする。三角形の面積を求めよ。

<!-- solution-start -->
**解答**

球面過剰公式

$$
\operatorname{Area}
=
a^2(A+B+C-\pi)
$$

を使います。

内角和は

$$
A+B+C
=
3\cdot\frac{2\pi}{3}
=
2\pi.
$$

従って

$$
\operatorname{Area}
=
a^2(2\pi-\pi)
=
\boxed{
\pi a^2
}.
$$

球面全体の面積 $4\pi a^2$ の4分の1です。
<!-- solution-end -->

### Level B

<a id="ex-geo19-b01"></a>
#### GEO19-B01 回転標構と接続1形式
- Level: B

Euclid 平面で標準標構 $(e_1,e_2)=(\partial_x,\partial_y)$ を取り、

$$
\varphi(x,y)=x+y
$$

として

$$
\widetilde e_1
=
\cos\varphi\,e_1+\sin\varphi\,e_2,
\qquad
\widetilde e_2
=
-\sin\varphi\,e_1+\cos\varphi\,e_2
$$

とする。回転後の接続1形式 $\widetilde\omega$ と $d\widetilde\omega$ を求め、曲率0と整合することを確認せよ。

<!-- solution-start -->
**解答**

標準 標準座標標構では $\omega=0$ です。

標構変換則より

$$
\widetilde\omega
=
\omega-d\varphi
=
-d(x+y)
=
\boxed{
-dx-dy
}.
$$

外微分を取ると

$$
d\widetilde\omega
=
-d(dx)-d(dy)
=
0.
$$

一方、Euclid 平面では $K=0$ なので

$$
K\,dA=0.
$$

従って

$$
d\widetilde\omega
=
K\,dA
=
0.
$$

接続1形式自体は回転標構で非零になりましたが、その外微分は変わりません。
<!-- solution-end -->

<a id="ex-geo19-b02"></a>
#### GEO19-B02 環状領域と境界向き
- Level: B

Euclid 平面の環状領域

$$
A=\{(x,y):r\le\sqrt{x^2+y^2}\le R\},
\qquad
0<r<R
$$

を標準向きで考える。

1. 外側境界と内側境界の誘導向きを答えよ。
2. 各境界成分の測地曲率積分を求めよ。
3. Gauss--Bonnet から $\chi(A)$ を求めよ。

<!-- solution-start -->
**解答**

外側境界では領域からの外向き法線が半径外向きなので、誘導向きは反時計回りです。

内側境界では領域からの外向き法線が穴の中心方向を向くので、誘導向きは時計回りです。

外側円では

$$
k_g=\frac1R,
$$

周長は $2\pi R$ だから

$$
\int_{\text{外側}}k_g\,ds
=
2\pi.
$$

内側円は同じ円を逆向きに進むため

$$
k_g=-\frac1r.
$$

周長は $2\pi r$ なので

$$
\int_{\text{内側}}k_g\,ds
=
-2\pi.
$$

従って

$$
\int_{\partial A}k_g\,ds
=
0.
$$

また Euclid 平面では $K=0$ です。境界付き Gauss--Bonnet より

$$
0+0
=
2\pi\chi(A).
$$

従って

$$
\boxed{
\chi(A)=0
}.
$$

内側境界を反時計回りにしてしまうと測地曲率積分の符号を誤ります。
<!-- solution-end -->

<a id="ex-geo19-b03"></a>
#### GEO19-B03 種数と曲率符号
- Level: B

種数 $g=2$ の閉向き付け可能 Riemann 曲面 $\Sigma_2$ を考える。

1. Euler 標数を求めよ。
2. 全 Gauss 曲率を求めよ。
3. $K\ge0$ が全点で成り立つ Riemann 計量を持てるか、Gauss--Bonnet だけから判定せよ。

<!-- solution-start -->
**解答**

種数 $g$ の標準閉向き付け可能曲面では

$$
\chi(\Sigma_g)=2-2g.
$$

従って

$$
\chi(\Sigma_2)
=
2-4
=
\boxed{-2}.
$$

Gauss--Bonnet より

$$
\int_{\Sigma_2}K\,dA
=
2\pi\chi(\Sigma_2)
=
\boxed{-4\pi}.
$$

仮に $K\ge0$ が全点で成り立つなら、面積形式が正なので

$$
\int_{\Sigma_2}K\,dA\ge0.
$$

しかし全曲率は $-4\pi<0$ と確定しています。矛盾です。

従って

$$
\boxed{
\Sigma_2 \text{ は } K\ge0 \text{ everywhere の計量を持てない}
}.
$$
<!-- solution-end -->

### Level C

<a id="ex-geo19-c01"></a>
#### GEO19-C01 三角形分割から大域 Gauss--Bonnet を再構成する
- Level: C

$M$ を閉じた向き付け可能 Riemann 曲面とし、$V,E,F$ を有限三角形分割の頂点数・辺数・面数とする。

各三角形 $\Delta$ について

$$
\int_\Delta K\,dA
+
\int_{\partial\Delta}k_g\,ds
+
\sum_{c\subset\Delta}(\pi-\beta_c)
=
2\pi
$$

が使えるとする。ここで $\beta_c$ は三角形の内角である。

この式を全三角形について足し、

$$
\int_MK\,dA=2\pi(V-E+F)
$$

を、内部辺・頂点・辺数の数え上げを省略せず導け。

<!-- solution-start -->
**解答**

全 $F$ 個の三角形について局所公式を足します。

面積積分は、三角形の内部が互いに素で、重なりは面積0の辺・頂点だけなので

$$
\sum_\Delta
\int_\Delta K\,dA
=
\int_MK\,dA.
$$

次に辺の測地曲率を考えます。閉曲面では各辺は二つの三角形に共有されます。共有辺を一方の三角形の境界として進む向きと、もう一方の境界として進む向きは逆です。

$T$ を $-T$ に変えると

$$
\nabla_{-T}(-T)=\nabla_TT,
\qquad
J(-T)=-JT.
$$

したがって

$$
g(\nabla_{-T}(-T),J(-T))
=
-k_g.
$$

よって同じ辺の二つの積分は相殺し、

$$
\sum_\Delta
\int_{\partial\Delta}k_g\,ds
=
0.
$$

次に角項です。各三角形には3つの角があるので全角数は $3F$ です。

$$
\sum_c(\pi-\beta_c)
=
3\pi F-\sum_c\beta_c.
$$

一つの頂点の周囲では隣接三角形の内角和が $2\pi$ です。頂点は $V$ 個なので

$$
\sum_c\beta_c
=
2\pi V.
$$

従って角項全体は

$$
3\pi F-2\pi V.
$$

右辺は全体で $2\pi F$ です。従って

$$
\int_MK\,dA
+
3\pi F-2\pi V
=
2\pi F.
$$

移項して

$$
\int_MK\,dA
=
2\pi V-\pi F.
$$

最後に辺を数えます。三角形側から数えると辺の出現回数は $3F$、一方で各辺は二つの三角形に共有されるので

$$
3F=2E.
$$

よって

$$
\begin{aligned}
2\pi(V-E+F)
&=
2\pi V-2\pi E+2\pi F
\\
&=
2\pi V-3\pi F+2\pi F
\\
&=
2\pi V-\pi F.
\end{aligned}
$$

先ほどの全曲率と一致するので

$$
\boxed{
\int_MK\,dA
=
2\pi(V-E+F)
=
2\pi\chi(M)
}.
$$

大域化の機構は、

1. 内部辺の測地曲率が逆符号で相殺する。
2. 各頂点の内角和が $2\pi$ になる。
3. 閉三角形分割で $3F=2E$ となる。

の三つです。
<!-- solution-end -->

---

## 13. まとめ

局所正規直交標構 $(e_1,e_2)$ に対し

$$
\nabla e_1=-\omega e_2,
\qquad
\nabla e_2=\omega e_1.
$$

標構を $\varphi$ だけ回すと

$$
\widetilde\omega=\omega-d\varphi,
$$

したがって

$$
d\widetilde\omega=d\omega.
$$

曲率作用素を計算すると

$$
d\omega=K\,dA.
$$

境界接ベクトル

$$
T=\cos\theta\,e_1+\sin\theta\,e_2
$$

について

$$
k_g\,ds=d\theta-\omega.
$$

Stokes と回転数を合わせると円板型領域で

$$
\int_DK\,dA
+
\int_{\partial D}k_g\,ds
+
\sum\alpha_j
=
2\pi.
$$

三角形分割で局所公式を足し、内部辺を相殺すると

$$
\boxed{
\int_MK\,dA
+
\int_{\partial M}k_g\,ds
+
\sum\alpha_j
=
2\pi\chi(M)
}.
$$

閉曲面では

$$
\boxed{
\int_MK\,dA
=
2\pi\chi(M)
}.
$$

これが、GEO1 から積み上げてきた多様体・微分形式・積分・計量・接続・曲率を、二次元の大域位相へ結ぶ Gauss--Bonnet の定理です。
