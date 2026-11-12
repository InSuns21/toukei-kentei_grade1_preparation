# HOLO7 作用の境界値問題

[HOLO6の半古典重力の適用条件](../HOLO6/index.md#def-holo6-controlled-window)を満たす模型では、重力を含むバルクの経路積分を古典作用の停留点で近似する道が開けます。しかし、単に運動方程式を解いただけでは、**境界から何を指定し、解から何を読み取るか**が定まりません。境界条件を変えると許される変分が変わり、作用の境界項も変わるからです。

[QCURV1の曲がった時空のスカラー作用](../../QCURV/QCURV1/index.md#def-qcurv1-curved-action)では、台を内部に限定した変分から場の方程式を求めました。本講ではその制限を外し、**有限の動径cutoff面で変分の境界項を残す**ところまで導きます。境界での場の値を指定するDirichlet問題、法線方向の応答、古典解上で評価した作用（on-shell作用）を区別します。

整数 $d\ge2$、半径 $L>0$、有限の数 $0<\epsilon<Z<\infty$ とし、$\hbar=1$ とします。場の逆反作用を無視する固定背景だけを扱い、$G_N$は計算へ入りません。Euclid側では[HOLO3のEuclid AdS](../HOLO3/index.md#def-holo3-euclidean-ads)のPoincaré計量を使い、境界方向を体積有限の平坦トーラス $T^d$（周期座標 $x^i$）にして積分を確実に有限化します。これは平坦な $\mathbb R^d$ 境界を局所的に調べるための赤外箱であり、global AdS全体でも、$z=0$ そのものでもありません。

## 1. バルクのどちら側が境界か

Euclid計量と積分領域を次に固定します。

$$
M_{\epsilon,Z}=[\epsilon,Z]\times T^d,\qquad
ds_E^2=\frac{L^2}{z^2}\left(dz^2+\sum_{i=1}^{d}(dx^i)^2\right).
$$

$z=\epsilon$ は**紫外側のcutoff面**、$z=Z$ は**赤外側の端面**です。各面に沿う座標を $x=(x^1,\ldots,x^d)$ とし、$\partial_i=\partial/\partial x^i$、$\Delta_x=\sum_i\partial_i^2$ と書きます。領域の外を向く単位法線は、同じ $z$ 方向でも二つの面で逆を向きます。

計量の行列は対角で、成分の各対角要素は $L^2/z^2$ です。したがって体積密度・誘導面積密度・法線はそれぞれ

$$
\sqrt{g_E}=\frac{L^{d+1}}{z^{d+1}},\qquad
\sqrt{\gamma}=\frac{L^d}{z^d},\qquad
n^z\big|_{\epsilon}=-\frac{\epsilon}{L},\quad
n^z\big|_Z=+\frac ZL.
$$

最後の二式は $g_{zz}(n^z)^2=1$ を解き、$\epsilon$ では $z$ が減る方向、$Z$ では増える方向を選んだ結果です。[HOLO2のPoincaré計量](../HOLO2/index.md#prop-holo2-poincare-metric)における $z\downarrow0$ の向きと整合します。

| 場所 | 領域から見た外向き | $\sqrt{\gamma}\,n^z$ |
| --- | --- | --- |
| $z=\epsilon$ | 小さい $z$ の側 | $-L^{d-1}\epsilon^{1-d}$ |
| $z=Z$ | 大きい $z$ の側 | $+L^{d-1}Z^{1-d}$ |

この表はこれから現れる負号を、覚えるのではなく毎回検査するためのものです。$z=0$ を有限の面として積分したり、二つの面の法線を同じ向きにしたりしません。

## 2. 有限領域での作用と許される変分

実数値の場 $\phi\in C^\infty(M_{\epsilon,Z},\mathbb R)$、質量二乗の定数 $m^2\in\mathbb R$ を扱います。ここで $m^2<0$ も式としては許しますが、作用の正定値性・解の一意性は別途判断します。$z=\epsilon$ 上で固定する場の値 $J_\epsilon(x)$ はまだCFTの演算子源と同一視しません。

<a id="def-holo7-cutoff-action"></a>

<!-- formal-statement-start -->
> **定義（有限cutoffのEuclidスカラー作用）**  
> $d\ge2$、$L>0$、$0<\epsilon<Z$、$m^2\in\mathbb R$ とし、$M_{\epsilon,Z}$ に上記の正定値計量を入れる。滑らかな実スカラー場 $\phi$ に対して作用を

$$
S_E[\phi]=\frac12\int_{M_{\epsilon,Z}}\sqrt{g_E}\,
\left(g_E^{ab}\partial_a\phi\,\partial_b\phi+m^2\phi^2\right)dzd^dx
$$

> と定める。$\chi$ を滑らかな実変分方向として $\delta_\phi S_E[\phi;\chi]=\left.\frac{d}{ds}S_E[\phi+s\chi]\right|_{s=0}$ を第一変分とする。
<!-- formal-statement-end -->

<!-- definition-example-start: def-holo7-cutoff-action -->
**定義の確認。** $\phi=c$（定数）、$\chi=1$ とすれば全ての偏微分が零なので、トーラスの座標体積を $V_T=\int_{T^d}d^dx$ として

$$
S_E[c]=\frac{m^2c^2L^{d+1}V_T}{2}
\int_\epsilon^Zz^{-d-1}dz
=\frac{m^2c^2L^{d+1}V_T}{2d}(\epsilon^{-d}-Z^{-d}).
$$

積分区間は有限で $\epsilon>0$ なので、$m^2<0$ でも数値として作用・第一変分は定義されます。さらに $S_E[c+s]=C(c+s)^2/2$（$C=m^2L^{d+1}V_T(\epsilon^{-d}-Z^{-d})/d$）だから $\delta S_E[c;1]=Cc$。この定義は正の作用だけを対象にするものではありません。
<!-- definition-example-end -->

同じ式を成分で書き直すと、どこに径方向の重みが付くかが見えます。

$$
S_E[\phi]=\frac{L^{d-1}}2\int_\epsilon^Z\!\!dz\int_{T^d}\!\!d^dx\,
z^{1-d}\left[(\partial_z\phi)^2+\sum_i(\partial_i\phi)^2+
\frac{m^2L^2}{z^2}\phi^2\right].
$$

Dirichlet境界条件では、端面で **場の値を固定し、変分方向をゼロに制限**します。法線微分を固定するNeumann条件とは異なります。

<a id="def-holo7-cutoff-dirichlet"></a>

<!-- formal-statement-start -->
> **定義（有限cutoffのDirichletデータ）**  
> $M_{\epsilon,Z}$ の滑らかな実スカラー場について、境界の関数 $J_\epsilon,J_Z$ をあらかじめ与え、

$$
\phi(\epsilon,x)=J_\epsilon(x),\qquad \phi(Z,x)=J_Z(x)
$$

> を満たす場を許す。この指定をDirichlet境界条件と呼ぶ。値を変えない許容変分は $\chi(\epsilon,x)=\chi(Z,x)=0$ を満たす滑らかな $\chi$ である。
<!-- formal-statement-end -->

<!-- definition-example-start: def-holo7-cutoff-dirichlet -->
**定義の確認。** $\phi(z,x)=a+bz$ に対して $J_\epsilon=a+b\epsilon$、$J_Z=a+bZ$ を固定します。$\chi(z,x)=(z-\epsilon)(Z-z)$ は両端で零なので $\phi+s\chi$ は任意の実数 $s$ について同じ端点値を保ちます。一方 $\chi=1$ は端点値を $s$ だけ変え、固定Dirichletデータの許容変分ではありません。$\phi=a+bz$ が場の方程式を満たすかどうかは、この**境界条件の確認とは独立**です。
<!-- definition-example-end -->

## 3. 境界項を消さずに第一変分を導く

有限領域に限ったことで、部分積分をすると各端面の寄与が明示的に残ります。体積中の方程式は[QCURV1の停留条件](../../QCURV/QCURV1/index.md#thm-qcurv1-stationarity)と同型ですが、ここはEuclid計量であり符号を独立に計算します。

<a id="prop-holo7-boundary-variation"></a>

<!-- formal-statement-start -->
> **命題（Euclidスカラー作用の境界付き第一変分）**  
> $M_{\epsilon,Z}$、$g_E$、$m^2\in\mathbb R$ を上記のように固定し、$\phi,\chi$ を境界まで滑らかな実スカラー場とする。$\nabla_E^2\phi=\frac{1}{\sqrt{g_E}}\partial_a(\sqrt{g_E}g_E^{ab}\partial_b\phi)$ とすると、

$$
\delta_\phi S_E[\phi;\chi]
=\int_{M_{\epsilon,Z}}\sqrt{g_E}\,(-\nabla_E^2\phi+m^2\phi)\chi\,dzd^dx
+\int_{\partial M_{\epsilon,Z}}\sqrt{\gamma}\,n^a\partial_a\phi\,\chi\,d^dx.
$$

> 内部に台を持つ任意の $\chi$ に対する停留条件は $(-\nabla_E^2+m^2)\phi=0$ に同値である。さらに両端でDirichletデータを固定するなら、滑らかな内部解は許容変分全てについて停留する。
<!-- formal-statement-end -->

### 証明の見取り図

二次式を一度微分すると、勾配の項から $\partial_a\chi$ が出ます。これを積の微分で $\chi$ に移す際、**境界流束を消す前に保存**します。内部の係数をゼロにすることと、境界で $\chi$ をゼロにすることは別の操作です。

<!-- proof-start -->
### 証明

$\phi_s=\phi+s\chi$ を[有限cutoffの作用](#def-holo7-cutoff-action)へ代入して $s=0$ で微分すると、係数 $1/2$ は二つの交差項と相殺されて

$$
\delta_\phi S_E[\phi;\chi]
=\int_{M_{\epsilon,Z}}\sqrt{g_E}\,
\left(g_E^{ab}\partial_a\phi\,\partial_b\chi+m^2\phi\chi\right)dzd^dx.
$$

積の微分を座標表示で書くと

$$
\partial_a(\sqrt{g_E}\,\chi g_E^{ab}\partial_b\phi)
=\sqrt{g_E}\,g_E^{ab}\partial_a\chi\,\partial_b\phi
+\chi\,\partial_a(\sqrt{g_E}\,g_E^{ab}\partial_b\phi).
$$

ゆえに第一項を移項して各座標で積分すると、トーラスの周期方向では向かい合う端が相殺され、$z$ 方向から

$$
\delta_\phi S_E
=\int_{M_{\epsilon,Z}}\sqrt{g_E}\,(-\nabla_E^2\phi+m^2\phi)\chi
+\left[\int_{T^d}L^{d-1}z^{1-d}(\partial_z\phi)\chi\,d^dx\right]_{z=\epsilon}^{z=Z}
$$

を得ます。角括弧は上端の値から下端の値を引く記号です。[第1節の法線](#ref-holo7-cutoff-orientations)の係数を使えば、これが命題の二面の境界積分と一致します。$\chi$ が内部に台を持つときは端面項が零となり、任意の局所試験関数による局所化から $(-\nabla_E^2+m^2)\phi=0$ です。逆にその方程式が成立すれば内部項は零です。さらに[Dirichletデータ](#def-holo7-cutoff-dirichlet)を固定すると $\chi=0$ が両端で成り立つため、境界積分も零となります。$\square$
<!-- proof-end -->

<a id="ref-holo7-cutoff-orientations"></a>

**端面での符号をもう一度確認。** 最後の角括弧を展開すると

$$
\int_{T^d}\left[
L^{d-1}Z^{1-d}\phi_z(Z,x)\chi(Z,x)
-L^{d-1}\epsilon^{1-d}\phi_z(\epsilon,x)\chi(\epsilon,x)
\right]d^dx.
$$

この式は、Dirichletの場合に消える項の**元の符号**も記録します。反対に両端の $\chi$ を自由に動かし、境界作用を加えないで停留を要求すれば、独立な端面変分から $n^a\partial_a\phi=0$ という自然なNeumann条件が加わります。**Dirichlet解にNeumann条件も無断で課す必要はありません。**

この内部方程式を実際の $z$ 座標に移します。[QCURV1の波動作用素の座標表示](../../QCURV/QCURV1/index.md#prop-qcurv1-kg-coordinate)と同じ密度計算をEuclid側で行うと

$$
\nabla_E^2\phi
=\frac{z^{d+1}}{L^2}\partial_z(z^{1-d}\partial_z\phi)
+\frac{z^2}{L^2}\Delta_x\phi
=\frac1{L^2}\left[z^2\phi_{zz}-(d-1)z\phi_z+z^2\Delta_x\phi\right].
$$

従って局所的な運動方程式は

$$
z^2\phi_{zz}-(d-1)z\phi_z+z^2\Delta_x\phi-m^2L^2\phi=0.
$$

$z=\epsilon,Z$ で何を固定するかは、この**微分方程式だけでは決まりません**。

## 4. 法線の応答とon-shell作用

境界での場の値を変えると、その境界へ流れる微分の情報が変化します。ここでの応答は、**有限cutoffでの古典的な正準運動量密度**であり、境界CFTの期待値そのものではありません。

<a id="def-holo7-cutoff-flux"></a>

<!-- formal-statement-start -->
> **定義（cutoff面の法線運動量密度）**  
> 上記のEuclid計量の境界面で、実スカラー場 $\phi$ の法線運動量密度を $\pi=\sqrt{\gamma}\,n^a\partial_a\phi$ と置く。$z=\epsilon$、$z=Z$ ではそれぞれ

$$
\pi_\epsilon(x)=-L^{d-1}\epsilon^{1-d}\partial_z\phi(\epsilon,x),\qquad
\pi_Z(x)=+L^{d-1}Z^{1-d}\partial_z\phi(Z,x).
$$

> この $\pi$ は境界の座標体積 $d^dx$ に対する密度であり、向きの異なる両端で符号が異なる。
<!-- formal-statement-end -->

<!-- definition-example-start: def-holo7-cutoff-flux -->
**定義の確認。** $\phi(z,x)=a+bz^d$ と置くと $\phi_z=dbz^{d-1}$ なので

$$
\pi_\epsilon=-dL^{d-1}b,\qquad \pi_Z=+dL^{d-1}b.
$$

$z$ に依存しない結果になるのは、$z^{1-d}$ と $\phi_z$ の $z^{d-1}$ が相殺されるためです。二つの値は向きが逆で、その和は零です。さらに $b=0$ なら両端の法線微分は零です。これで法線・密度・符号を直接確かめました。
<!-- definition-example-end -->

「on-shell」は内部の場の方程式を満たす場を作用へ代入することです。境界の値をゼロにするという意味ではありません。

<a id="prop-holo7-onshell-boundary"></a>

<!-- formal-statement-start -->
> **命題（on-shell作用の境界表示と境界微分）**  
> $M_{\epsilon,Z}$ 上で $(-\nabla_E^2+m^2)\phi=0$ を満たす滑らかな実スカラー場 $\phi$ について、

$$
S_E[\phi]=\frac12\int_{T^d}\left[\phi(\epsilon,x)\pi_\epsilon(x)+\phi(Z,x)\pi_Z(x)\right]d^dx.
$$

> さらに両端で解の滑らかな一パラメータ族 $\phi_s$ が存在し、赤外側の値 $\phi_s(Z,x)=J_Z(x)$ を固定したまま、紫外側で $\phi_s(\epsilon,x)=J_\epsilon(x)+s\,\delta J_\epsilon(x)$ とする。このとき解上の作用 $W_\epsilon[J_\epsilon]=S_E[\phi_0]$ の第一変分は

$$
\delta W_\epsilon[J_\epsilon;\delta J_\epsilon]
=\int_{T^d}\pi_\epsilon(x)\,\delta J_\epsilon(x)\,d^dx.
$$

> 後者は、指定された境界値に対する解が存在し、解を滑らかに変化させられる範囲での主張である。
<!-- formal-statement-end -->

### 証明の見取り図

積 $\phi\nabla\phi$ の発散を作ると、作用の二次密度へ運動方程式を一度掛けた式が現れます。次に解の族に沿って作用を変分し、内部方程式と赤外側の固定条件を使って消すと、紫外側だけが残ります。

<!-- proof-start -->
### 証明

積の微分則から

$$
\nabla_a(\phi\nabla^a\phi)=g_E^{ab}\partial_a\phi\,\partial_b\phi+\phi\nabla_E^2\phi.
$$

内部方程式は $\nabla_E^2\phi=m^2\phi$ ですから、右辺は作用密度の括弧内に一致します。[境界付き第一変分](#prop-holo7-boundary-variation)の証明と同様に発散を積分すると

$$
2S_E[\phi]=\int_{\partial M_{\epsilon,Z}}\sqrt{\gamma}\,\phi n^a\partial_a\phi\,d^dx
=\int_{T^d}(\phi_\epsilon\pi_\epsilon+\phi_Z\pi_Z)d^dx.
$$

次に $\chi=\left.\partial_s\phi_s\right|_{s=0}$ とおけば、族の各 $\phi_s$ は内部方程式を満たすので[第一変分公式](#prop-holo7-boundary-variation)の体積項は零です。端面では $\chi(Z,x)=0$、$\chi(\epsilon,x)=\delta J_\epsilon(x)$。よって

$$
\left.\frac{d}{ds}S_E[\phi_s]\right|_{s=0}
=\int_{T^d}\pi_\epsilon\,\delta J_\epsilon\,d^dx,
$$

となります。on-shell作用の境界表示を微分しても、解の変化で生じる項を一緒に含める必要があり、単に $J_\epsilon\pi_\epsilon/2$ の $\pi_\epsilon$ を固定して微分するのは誤りです。$\square$
<!-- proof-end -->

**何が分かったか。** 境界の値 $J_\epsilon$ は入力、$\pi_\epsilon$ はその入力と**赤外条件を含む解全体**から決まる応答です。有限cutoffの応答をCFTの1点関数や相関関数に変換するには、極限 $\epsilon\downarrow0$、規格化、必要に応じた反項と境界条件の選択が残ります。それらはHOLO8・HOLO9・HOLO14で扱います。

## 5. 指定する値と返ってくる値：完全に解ける例

最初の検算模型として $m^2=0$、境界方向に一定の場 $\phi=\phi(z)$ を選びます。これは一般の質量を扱った**境界漸近の定理ではなく**、正確に解ける一例です。第3節の運動方程式で $\Delta_x\phi=0$ とすれば

$$
z^2\phi''-(d-1)z\phi'=0
\quad\Longleftrightarrow\quad
\frac{d}{dz}\bigl(z^{1-d}\phi'\bigr)=0.
$$

積分定数を $A,B\in\mathbb R$ とすると

$$
z^{1-d}\phi'=dB,\qquad \phi(z)=A+Bz^d.
$$

**二つの積分定数があるから、境界値を一つだけ指定しても解はまだ一意ではありません。** $\phi(\epsilon)=J$、$\phi(Z)=0$ を指定した場合には

$$
B=\frac{J}{\epsilon^d-Z^d},\qquad
A=-BZ^d=\frac{JZ^d}{Z^d-\epsilon^d},\qquad
\phi(z)=J\frac{Z^d-z^d}{Z^d-\epsilon^d}.
$$

両端への代入で $\phi(\epsilon)=J$、$\phi(Z)=0$ を直接確認できます。[法線運動量密度](#def-holo7-cutoff-flux)を代入すると

$$
\pi_\epsilon=\frac{dL^{d-1}J}{Z^d-\epsilon^d},\qquad
\pi_Z=-\frac{dL^{d-1}J}{Z^d-\epsilon^d}.
$$

[on-shell作用の境界表示](#prop-holo7-onshell-boundary)では赤外端の $\phi(Z)=0$ なので

$$
W_\epsilon(J)=\frac{V_TdL^{d-1}}{2(Z^d-\epsilon^d)}J^2,\qquad
\frac{dW_\epsilon}{dJ}=V_T\pi_\epsilon.
$$

これは有限cutoffでも非零の応答が生じる直接例です。$\phi(Z)$ を変えてしまえば同じ $J$ でも $\pi_\epsilon$ は変わります。「$\pi$ は $J$ だけの局所関数だ」という主張は、赤外条件の指定なしには成立しません。

### 5.1 境界応答写像の範囲をはっきりさせる

一般の境界方向の関数 $J_\epsilon(x)$ に対し、場の方程式を解いて $\pi_\epsilon(x)$ を返す操作を考えます。ただしこの演算は背景、質量、赤外側データを固定して初めて定まります。

<a id="def-holo7-cutoff-response-map"></a>

<!-- formal-statement-start -->
> **定義（有限cutoffの境界応答写像）**  
> $m^2\ge0$ とし、$M_{\epsilon,Z}$ の上記のEuclid計量上で、$(-\nabla_E^2+m^2)\phi=0$、$\phi(\epsilon,x)=J(x)$、$\phi(Z,x)=0$ を満たす滑らかな解が存在する境界関数 $J$ を考える。この解から

$$
\Lambda_{\epsilon,Z}J=-L^{d-1}\epsilon^{1-d}\partial_z\phi(\epsilon,\cdot)
$$

> と定める。これを有限cutoffの境界応答写像と呼ぶ。右辺の法線微分は解全体から決まり、$J$ の点ごとの値だけを使った代入規則ではない。
<!-- formal-statement-end -->

<!-- definition-example-start: def-holo7-cutoff-response-map -->
**定義の確認。** 定数関数 $J(x)=J_0$ には前節の滑らかな解が実在し、$\phi(\epsilon)=J_0$、$\phi(Z)=0$ です。その法線微分から

$$
\Lambda_{\epsilon,Z}J_0
=\frac{dL^{d-1}}{Z^d-\epsilon^d}J_0.
$$

係数は正です（$L>0,Z>\epsilon,d\ge2$）。ここでは関数全体が一定なので点ごとの掛け算に見えますが、境界方向に変化する $J(x)$ では $x$ 方向の微分を含む方程式を解かなければなりません。
<!-- definition-example-end -->

<a id="prop-holo7-response-positive"></a>

<!-- formal-statement-start -->
> **命題（非負質量二乗での一意性・応答の対称性）**  
> $m^2\ge0$、$d\ge2$、$0<\epsilon<Z$ とし、有限体積の平坦トーラスを境界方向とする。指定した滑らかなDirichletデータに対する滑らかな内部解は、存在するなら一意である。また零の赤外データを持つ二つの解 $\phi_1,\phi_2$ と紫外データ $J_1,J_2$ に対して

$$
\int_{T^d}J_1\Lambda_{\epsilon,Z}J_2\,d^dx
=\int_{M_{\epsilon,Z}}\sqrt{g_E}
\left(g_E^{ab}\partial_a\phi_1\partial_b\phi_2+m^2\phi_1\phi_2\right)dzd^dx
=\int_{T^d}J_2\Lambda_{\epsilon,Z}J_1\,d^dx.
$$

> 特に $\int J\Lambda_{\epsilon,Z}J\,d^dx\ge0$ であり、$J\not\equiv0$ なら厳密に正である。
<!-- formal-statement-end -->

### 証明の見取り図

差の解を自身に掛けて積分します。境界での差はゼロだから流束はゼロであり、体積内に非負な項しか残りません。二つの異なる解を掛ければ、対称な双線形形式が得られます。

<!-- proof-start -->
### 証明

同じ境界値を持つ解 $\phi,\widetilde\phi$ の差 $u=\phi-\widetilde\phi$ は $(-\nabla_E^2+m^2)u=0$、$u(\epsilon)=u(Z)=0$ です。積の微分と部分積分から

$$
0=\int_{M_{\epsilon,Z}}\sqrt{g_E}\,u(-\nabla_E^2u+m^2u)
=\int_{M_{\epsilon,Z}}\sqrt{g_E}\bigl(|\nabla u|^2+m^2u^2\bigr)
-\int_{\partial M_{\epsilon,Z}}\sqrt\gamma\,u\,n^a\partial_au.
$$

境界項は $u=0$ により消えます。残る被積分関数は連続で非負ですから、全ての点で $\nabla u=0$ です。連結な $M_{\epsilon,Z}$ で $u$ は定数となり、境界の零値から $u=0$ です。$m^2=0$ でも同じ結論です。

次に $\phi_2$ の方程式を $\phi_1$ 倍して部分積分すると

$$
0=\int\sqrt{g_E}\,\phi_1(-\nabla_E^2+m^2)\phi_2
=\int\sqrt{g_E}(\nabla\phi_1\cdot\nabla\phi_2+m^2\phi_1\phi_2)
-\int_{T^d}J_1\pi_{\epsilon,2}\,d^dx.
$$

赤外端は $\phi_1(Z)=0$ で消え、$\pi_{\epsilon,2}=\Lambda_{\epsilon,Z}J_2$ です。体積の交差項は添字 $1,2$ の交換で同一なので、対称性が従います。二つを同一にすれば非負性です。積分が零なら $\nabla\phi=0$、赤外で零だから $\phi=0$、すなわち $J=0$ です。$\square$
<!-- proof-end -->

**重要な限定。** この証明は解の**一意性**を示しましたが、任意の不連続な $J$ や任意の負の $m^2$ での存在を保証しません。滑らかなデータの存在問題には楕円型方程式の理論が必要です。$m^2<0$ では非負性の行が壊れるため、この証明は使えません（だからといって全ての負質量が必ず非一意という意味でもありません）。

## 6. 「源」と「状態」は同じものではない

ここまでの $J_\epsilon$ は、**有限cutoff面における古典的Dirichletデータ**です。HOLO8では $z\downarrow0$ の二つの独立した漸近的挙動を調べ、どの係数を境界の源として固定できるかを追加条件付きで決めます。有限cutoffの $J_\epsilon$、無限遠で規格化した源、正規化可能なモードの係数を、現時点で等号で結んではいけません。

また、Euclidの境界値問題とLorentzの初期値問題は同一ではありません。[HOLO2のLorentz計量](../HOLO2/index.md#prop-holo2-poincare-metric)では時間座標 $t$ の二階微分があり、時間発展の状態を決めるには初期時刻の $\phi$ と $\partial_t\phi$ などのデータも必要です。境界でどの履歴を与えるかだけで、一般に内部の量子状態は定まりません。

符号を照合しましょう。$(-,+,\ldots,+)$ 規約のLorentz実スカラー作用を

$$
S_L[\phi]=-\frac12\int_M\sqrt{|g_L|}
\left(g_L^{ab}\partial_a\phi\partial_b\phi+m^2\phi^2\right)d^{d+1}x
$$

とすれば、固定計量での第一変分の体積係数は $(\Box_L-m^2)\phi$、timelike cutoff面での境界係数は $-\sqrt{|\gamma_L|}n^a\partial_a\phi$ です。**Euclidの $+\pi$ をLorentz側へそのまま貼り付けません**。時刻端面にはさらに対応する境界項があり、時刻端点や初期データの扱いを指定する必要があります。

## 7. 演習と詳細解答

<a id="ex-holo7-a1"></a>
### A1. 面積密度と単位法線

- Level: A
- 問題: $d=3$、$L>0$ のEuclid AdSの有限領域 $[\epsilon,Z]\times T^3$ について、$\sqrt{g_E}$、各端面の $\sqrt\gamma$、外向き $n^z$ を計算せよ。$g_{zz}(n^z)^2=1$ を直接確認せよ。

<!-- solution-start -->
**詳細解答。** 計量行列の4個の対角成分は $L^2/z^2$ ですから、$\det g_E=(L^2/z^2)^4=L^8/z^8$、$\sqrt{g_E}=L^4/z^4$。面に制限すると3個の対角成分から $\sqrt\gamma=L^3/z^3$。法線の長さは $(L^2/z^2)(n^z)^2=1$ なので $n^z=\pm z/L$。下端では外向きが $-\partial_z$、上端では $+\partial_z$ であるため $n^z_\epsilon=-\epsilon/L$、$n^z_Z=Z/L$ です。それぞれ $(L^2/\epsilon^2)(\epsilon^2/L^2)=1$、$(L^2/Z^2)(Z^2/L^2)=1$ を満たします。
<!-- solution-end -->

<a id="ex-holo7-a2"></a>
### A2. 流束の符号

- Level: A
- 問題: $d=2$、$\phi(z)=3+2z^2$ に対する $\pi_\epsilon,\pi_Z$ を求めよ。$\epsilon=1,Z=2,L=1$ として数値も示し、二つの面の法線が逆を向くこととの対応を説明せよ。

<!-- solution-start -->
**詳細解答。** $\phi_z=4z$。[法線運動量密度](#def-holo7-cutoff-flux)へ $d=2$ を代入すると $\pi_\epsilon=-L\epsilon^{-1}(4\epsilon)=-4L$、$\pi_Z=LZ^{-1}(4Z)=4L$ です。指定数値では $-4$ と $4$。同じ正の $\phi_z$ ですが、外向き法線は $\epsilon$ で負、$Z$ で正なので符号が反転します。
<!-- solution-end -->

<a id="ex-holo7-a3"></a>
### A3. 質量零の動径方程式

- Level: A
- 問題: $d=3$、$m^2=0$、$\Delta_x\phi=0$ とし、第3節の運動方程式から一般解を求めよ。$\phi(z)=a+bz$ は一般には解でないことも計算せよ。

<!-- solution-start -->
**詳細解答。** 方程式は $z^2\phi''-2z\phi'=0$。$z>0$ で割ると $(z^{-2}\phi')'=0$ なので $\phi'=Cz^2$、積分して $\phi=A+(C/3)z^3=A+Bz^3$ です。一方 $a+bz$ には $\phi''=0,\phi'=b$ なので左辺は $-2bz$。$z>0$ では $b=0$ のときだけ解です。境界条件を満たす試験場と内部方程式の解は区別されます。
<!-- solution-end -->

<a id="ex-holo7-a4"></a>
### A4. 二つのDirichlet値

- Level: A
- 問題: $d=2$、$m^2=0$、$x$ に依存しない解 $\phi=A+Bz^2$ に $\phi(\epsilon)=p$、$\phi(Z)=q$ を課せ。$A,B$ を求め、$p=q$ のときの法線運動量密度を答えよ。

<!-- solution-start -->
**詳細解答。** $A+B\epsilon^2=p$ と $A+BZ^2=q$ を引くと $B(Z^2-\epsilon^2)=q-p$。従って $B=(q-p)/(Z^2-\epsilon^2)$、$A=(pZ^2-q\epsilon^2)/(Z^2-\epsilon^2)$ です。$p=q$ なら $B=0$、$\phi=p$ は一定です。[法線運動量密度](#def-holo7-cutoff-flux)は $\pi_\epsilon=-2LB=0$、$\pi_Z=2LB=0$ です。
<!-- solution-end -->

<a id="ex-holo7-a5"></a>
### A5. 境界履歴だけでは状態が決まらない

- Level: A
- 問題: 平坦な帯 $0<y<a$ 上の波動方程式 $u_{tt}-u_{yy}=0$ で、境界履歴 $u(t,0)=u(t,a)=0$ を考える。$u_0(t,y)=0$ と $u_1(t,y)=\sin(\pi y/a)\cos(\pi t/a)$ がどちらも方程式・境界履歴を満たすことを確認し、$t=0$ の初期値の相違を述べよ。この模型からAdSで言えること・言えないことを区別せよ。

<!-- solution-start -->
**詳細解答。** $u_0$ の全微分は零です。$u_1$ では $u_{1,tt}=-(\pi/a)^2u_1$、$u_{1,yy}=-(\pi/a)^2u_1$ なので差は零。端では $\sin0=\sin\pi=0$ なので両者とも境界値零です。一方 $t=0$ では $u_0(0,y)=0$、$u_1(0,y)=\sin(\pi y/a)$ で異なり、両者の初期速度は零です。この例は**Lorentz型の時間発展で境界履歴と初期データを区別する必要**を示しますが、平坦帯の解をAdSの解と主張するものではありません。
<!-- solution-end -->

<a id="ex-holo7-b1"></a>
### B1. 座標で境界変分を再構成する

- Level: B
- 問題: $d\ge2$、$L>0$、$0<\epsilon<Z$、$m^2\in\mathbb R$、滑らかな実数値 $\phi,\chi$ とする。第2節の成分表示の作用を直接微分し、$z$ 方向と周期的な $x^i$ 方向で部分積分して、内部方程式と二端面の境界項を導け。

<!-- solution-start -->
**詳細解答。** 成分表示を $S_E=(L^{d-1}/2)\int z^{1-d}[\phi_z^2+\sum_i\phi_i^2+m^2L^2z^{-2}\phi^2]$ とすると、$\phi\mapsto\phi+s\chi$ の $s$ による一回微分は

$$
\delta S_E=L^{d-1}\int dzd^dx\,z^{1-d}
\left(\phi_z\chi_z+\sum_i\phi_i\chi_i+m^2L^2z^{-2}\phi\chi\right).
$$

$z$ の積の微分 $\partial_z(z^{1-d}\phi_z\chi)=(z^{1-d}\phi_z)'\chi+z^{1-d}\phi_z\chi_z$ を移項して積分すると $\left[\int L^{d-1}z^{1-d}\phi_z\chi\,d^dx\right]_\epsilon^Z$ が残ります。周期方向では $\int_{T^d}\partial_i(\phi_i\chi)d^dx=0$ なので、$\int\phi_i\chi_i=-\int\phi_{ii}\chi$。残る体積項は

$$
L^{d-1}\int dzd^dx\,z^{-d-1}
\left[-z^{d+1}(z^{1-d}\phi_z)'-z^2\Delta_x\phi+m^2L^2\phi\right]\chi.
$$

括弧を展開すると $-z^2\phi_{zz}+(d-1)z\phi_z-z^2\Delta_x\phi+m^2L^2\phi$。これを任意の内部 $\chi$ で零とすれば第3節の方程式です。下端の符号は負、上端は正であり、[境界変分の命題](#prop-holo7-boundary-variation)と一致します。
<!-- solution-end -->

<a id="ex-holo7-b2"></a>
### B2. 一意性の証明を質量零で再検算

- Level: B
- 問題: $m^2=0$ とし、二つの滑らかな解が両端で同じDirichletデータを持つとする。差 $u$ の勾配二乗の積分を用い、なぜ差が零になるか証明せよ。また $m^2<0$ の場合に同じ議論のどの行が使えないか述べよ。

<!-- solution-start -->
**詳細解答。** 差 $u$ は $-\nabla_E^2u=0$ と $u|_{\partial M}=0$ を満たします。積の微分則を積分して

$$
0=\int\sqrt{g_E}\,u(-\nabla_E^2u)
=\int\sqrt{g_E}\,g^{ab}_E\partial_au\partial_bu
-\int_{\partial M}\sqrt\gamma\,u\,n^a\partial_au.
$$

境界項は $u=0$ のため零です。計量は正定値なので勾配二乗は非負、連続関数の積分が零なら全点で勾配が零です。領域が連結なので $u$ は定数で、境界で零だから $u=0$。$m^2<0$ なら体積項に $m^2u^2$ が加わり非負ではなくなり、非負項の和が零という推論ができません。これは非一意性が必ず起こるとの主張ではありません。
<!-- solution-end -->

<a id="ex-holo7-b3"></a>
### B3. 境界応答の対称性

- Level: B
- 問題: $m^2\ge0$ で、二つの滑らかな内部解 $\phi_1,\phi_2$ が $\phi_j(Z)=0$、$\phi_j(\epsilon)=J_j$ を満たすとする。Green型の部分積分で $\int J_1\Lambda J_2=\int J_2\Lambda J_1$ を示せ。さらに $J_1=J_2$ のときの符号を答えよ。

<!-- solution-start -->
**詳細解答。** $\phi_2$ の方程式に $\phi_1$ を掛け、

$$
0=\int\sqrt{g_E}\,\phi_1(-\nabla_E^2+m^2)\phi_2
=\int\sqrt{g_E}(\nabla\phi_1\cdot\nabla\phi_2+m^2\phi_1\phi_2)
-\int_{\partial M}\sqrt\gamma\,\phi_1n^a\partial_a\phi_2
$$

と積分します。上端では $\phi_1(Z)=0$、下端では $\phi_1(\epsilon)=J_1$ と $\sqrt\gamma n\cdot\partial\phi_2=\Lambda J_2$ なので、最後の積分は $\int J_1\Lambda J_2$。体積の交差項は $1\leftrightarrow2$ で同一ですから対称性が従います。同一のデータ $J$ に対して体積積分は $\int\sqrt{g_E}(|\nabla\phi|^2+m^2\phi^2)\ge0$、しかも赤外で零なので $J\not\equiv0$ なら正です。[応答の命題](#prop-holo7-response-positive)の証明を別の二解で再現しました。
<!-- solution-end -->

<a id="ex-holo7-b4"></a>
### B4. 境界方向のモードと局所性の限界

- Level: B
- 問題: $T^d$ の許された波数 $k$ に対して $\phi(z,x)=f_k(z)\cos(k\cdot x)$ を実数値モードとして使う（$k=0$ も許す）。$m^2\in\mathbb R$ とする。(1) $f_k$ の常微分方程式を導け。(2) $m^2=0,k=0$ と $m^2=0,k\ne0$ の違いを述べよ。(3) $\epsilon$ 面でのNeumann零条件は $f_k'(\epsilon)$ の何を要求するか。

<!-- solution-start -->
**詳細解答。** $\Delta_x\cos(k\cdot x)=-|k|^2\cos(k\cdot x)$ なので、第3節の方程式へ代入して

$$
z^2 f_k''-(d-1)zf_k'-(|k|^2z^2+m^2L^2)f_k=0
$$

を得ます。(1) がこれです。(2) $m^2=0,k=0$ なら $(z^{1-d}f'_0)'=0$ で $f_0=A+Bz^d$ ですが、$k\ne0$ では $-|k|^2z^2f_k$ が残り、同じ $A+Bz^d$ を一般解にはできません。従って境界の各モードは別々の径方向解を要求し、一般の $J(x)$ に定数モードの係数を点ごとに掛けるだけでは応答は得られません。(3) 法線係数は $\pi_\epsilon=-L^{d-1}\epsilon^{1-d}f_k'(\epsilon)\cos(k\cdot x)$。$L,\epsilon>0$ なのでNeumann零条件は $f_k'(\epsilon)=0$ です。Dirichletなら $f_k(\epsilon)$ を指定し、微分値は解の出力です。
<!-- solution-end -->

<a id="ex-holo7-c1"></a>
### C1. cutoff源から作用まで一気に検算する

- Level: C
- 問題: $d\ge2$、$L>0$、$0<\epsilon<Z$、$V_T>0$ の有限トーラス、$m^2=0$ を固定する。$x$ に依存しない解でDirichletデータ $\phi(\epsilon)=J$、$\phi(Z)=0$ を課す。(1) 全ての滑らかな解と境界条件で選ばれる解を求めよ。(2) $\pi_\epsilon,\pi_Z$、on-shell作用 $W_\epsilon(J)$ を求めよ。(3) $dW_\epsilon/dJ=V_T\pi_\epsilon$ を独立に検算せよ。(4) $J\ne0$ のとき同じ解が上下の自由Neumann条件も満たすか判定せよ。(5) $Z$ 固定で $\epsilon\downarrow0$ とした結果だけから、$J$ を境界CFTの規格化済み源と断言できるか論ぜよ。

<!-- solution-start -->
**詳細解答。**

**(1)** $x$ に依存しない質量零の方程式は $\partial_z(z^{1-d}\phi')=0$。一回積分して $\phi'=dBz^{d-1}$、もう一回積分して $\phi=A+Bz^d$ です。二条件は $A+B\epsilon^d=J$ と $A+BZ^d=0$。引き算して

$$
B=-\frac{J}{Z^d-\epsilon^d},\qquad
A=\frac{JZ^d}{Z^d-\epsilon^d},\qquad
\phi(z)=J\frac{Z^d-z^d}{Z^d-\epsilon^d}.
$$

分母は $Z>\epsilon$ なので零でなく、解は一意です。両端への代入は順に $J,0$ を返します。

**(2)** $\phi'=-dJz^{d-1}/(Z^d-\epsilon^d)$。両端で[法線密度](#def-holo7-cutoff-flux)の符号を別々に代入すると

$$
\pi_\epsilon=\frac{dL^{d-1}J}{Z^d-\epsilon^d},\qquad
\pi_Z=-\frac{dL^{d-1}J}{Z^d-\epsilon^d}.
$$

[on-shell境界表示](#prop-holo7-onshell-boundary)では $\phi(Z)=0$ なので

$$
W_\epsilon(J)=\frac{V_T}{2}(J\pi_\epsilon+0\cdot\pi_Z)
=\frac{V_TdL^{d-1}}{2(Z^d-\epsilon^d)}J^2.
$$

体積積分でも $\phi'$ のみが残り、

$$
S_E=\frac{L^{d-1}V_T}{2}\int_\epsilon^Zz^{1-d}
\frac{d^2J^2z^{2d-2}}{(Z^d-\epsilon^d)^2}\,dz
=\frac{L^{d-1}V_Td^2J^2}{2(Z^d-\epsilon^d)^2}
\frac{Z^d-\epsilon^d}{d},
$$

となって同じ値です。

**(3)** 前式を $J$ で微分すると $dW_\epsilon/dJ=V_TdL^{d-1}J/(Z^d-\epsilon^d)=V_T\pi_\epsilon$。これは面での変分公式と独立な代数計算による照合です。

**(4)** $J\ne0$ なら $\phi'\ne0$（$z>0$）なので、$\pi_\epsilon$ と $\pi_Z$ はともに非零です。従ってこのDirichlet解は、境界作用を追加しない自由Neumann条件 $\pi_\epsilon=\pi_Z=0$ を同時には満たしません。Dirichletの停留性は変分方向 $\chi|_{\partial M}=0$ によるものであり、Neumannを要請しません。

**(5)** $Z$ を固定して $\epsilon\downarrow0$ とすると $W_\epsilon(J)\to V_TdL^{d-1}J^2/(2Z^d)$ ですが、これは**質量零・境界一定・赤外端零の特殊模型**の値です。一般の場の漸近指数、境界CFTでの演算子の規格化、局所反項、状態に対応する赤外条件はまだ扱っていません。したがって有限cutoffで指定した $J$ から、そのまま規格化済みCFTの源や期待値が得られたとは結論できません。
<!-- solution-end -->

## 8. まとめと次講への接続

- 有限のAdS切断領域では、作用の第一変分に体積方程式と**二端面の独立な境界項**が現れる。
- Dirichletは場の値を固定して許容変分を制限する条件であり、Neumannは法線微分を指定する別の条件である。
- on-shell作用の変分は、赤外条件も含めて解いた後の法線応答を返す。非負質量二乗の有限Euclid Dirichlet問題では、この応答の対称性と正値性を直接示せる。
- cutoffの値、無限遠の規格化源、時間発展の状態は同一のデータではない。

**次講HOLO8「スカラー漸近とBF境界」**では、この場の方程式を $z\downarrow0$ で解き、質量と漸近指数、どの境界条件を許すかを区別します。本講で導いた変分・流束の式を、その解析の出発点にします。
