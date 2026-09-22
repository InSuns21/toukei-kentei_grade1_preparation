# GEO17 幾何学 XVII

<!-- definition-example-audit: strict -->

[GEO14](../GEO14/index.md) では測地線・指数写像・正規座標を構成し、測地線が局所的に最短になることを Gauss の補題から示しました。[GEO16](../GEO16/index.md) では Riemann 曲率を Levi-Civita 接続の非可換性として定義しました。

本章では、この二つを変分法で結びます。

測地線を一本だけ眺めるのではなく、その周囲の曲線族を少し動かし、

$$
\text{曲線の変分}
\longrightarrow
\text{第一変分}
\longrightarrow
\text{第二変分}
\longrightarrow
\text{Jacobi 場}
\longrightarrow
\text{共役点}
$$

と進みます。

曲率はここで初めて

$$
\frac{D^2J}{dt^2}
+
R(J,\dot\gamma)\dot\gamma
=
0
$$

という「近くの測地線同士の相対加速度」の式として現れます。

さらに、指数写像の微分が退化する点と、測地線の局所最短性が壊れる機構まで証明します。

---

## 1. 曲線を一本ではなく族として動かす

<a id="def-geo17-variation"></a>
<!-- formal-statement-start -->
> **定義（曲線の変分・変分ベクトル場・固定端点変分）**  
> Riemann 多様体 $(M,g)$ 上の滑らかな曲線
>
$$
\gamma:[a,b]\to M
$$
>
> に対し、ある $\varepsilon>0$ と滑らかな写像
>
$$
F:(-\varepsilon,\varepsilon)\times[a,b]\to M
$$
>
> が
>
$$
F(0,t)=\gamma(t)
$$
>
> を満たすとき、$F$ を $\gamma$ の **曲線の変分**という。
>
$$
T=\frac{\partial F}{\partial t},
\qquad
V=\frac{\partial F}{\partial s}
$$
>
> と書き、$s=0$ に制限した
>
$$
V(t)=\left.\frac{\partial F}{\partial s}\right|_{(0,t)}
$$
>
> を **変分ベクトル場**という。
>
> さらに全ての $s$ について
>
$$
F(s,a)=\gamma(a),
\qquad
F(s,b)=\gamma(b)
$$
>
> が成り立つとき、$F$ を **固定端点変分**という。
<!-- formal-statement-end -->

<!-- definition-example-start: def-geo17-variation -->
**定義の確認：Euclid 平面**

$\gamma(t)=(t,0)$、$0\le t\le1$ とし、

$$
F(s,t)
=
\bigl(t,s\,t(1-t)\bigr)
$$

と置きます。

すると

$$
F(0,t)=\gamma(t),
$$

$$
F(s,0)=(0,0),
\qquad
F(s,1)=(1,0)
$$

なので固定端点変分です。

変分ベクトル場は

$$
V(t)
=
\left.\frac{\partial F}{\partial s}\right|_{s=0}
=
\bigl(0,t(1-t)\bigr).
$$

確かに

$$
V(0)=V(1)=0
$$

です。

固定端点変分では、端点が動かないことが変分ベクトル場の端点条件

$$
V(a)=V(b)=0
$$

として現れます。
<!-- definition-example-end -->

---

## 2. 二つの微分方向を交換する

変分面の上では $s$ 方向と $t$ 方向の二つの微分があります。

Levi-Civita 接続の捩率が0であることにより、まず一次の共変微分は交換できます。

<a id="lem-geo17-variation-commutation"></a>
<!-- formal-statement-start -->
> **補題（変分方向と曲線方向の共変微分の交換）**  
> 曲線の変分 $F(s,t)$ に対し
>
$$
T=\frac{\partial F}{\partial t},
\qquad
V=\frac{\partial F}{\partial s}
$$
>
> とする。
>
> Levi-Civita 接続について
>
$$
\boxed{
\frac{D T}{\partial s}
=
\frac{D V}{\partial t}
}
$$
>
> が成り立つ。
>
> また変分面上の任意のベクトル場 $W$ に対して
>
$$
\boxed{
\frac{D}{\partial s}\frac{D W}{\partial t}
-
\frac{D}{\partial t}\frac{D W}{\partial s}
=
R(V,T)W
}
$$
>
> が成り立つ。
<!-- formal-statement-end -->

<!-- proof-start -->
### 証明

座標ベクトル場 $\partial_s,\partial_t$ は可換なので

$$
[\partial_s,\partial_t]=0.
$$

Levi-Civita 接続の捩率0より

$$
\nabla_{\partial_s}T
-
\nabla_{\partial_t}V
-
[\partial_s,\partial_t]
=
0.
$$

従って

$$
\frac{DT}{\partial s}
=
\frac{DV}{\partial t}.
$$

次に GEO16 の曲率作用素の定義

$$
R(X,Y)W
=
\nabla_X\nabla_YW
-
\nabla_Y\nabla_XW
-
\nabla_{[X,Y]}W
$$

へ

$$
X=\partial_s,
\qquad
Y=\partial_t
$$

を代入します。

$[\partial_s,\partial_t]=0$ なので

$$
R(V,T)W
=
\frac{D}{\partial s}\frac{DW}{\partial t}
-
\frac{D}{\partial t}\frac{DW}{\partial s}.
$$

これが第二式です。$\square$
<!-- proof-end -->

この二式が、一次・二次の変分公式と測地線変分の線形化を支えます。

---

## 3. エネルギーを一次まで動かす

曲線 $c:[a,b]\to M$ のエネルギーを

$$
E(c)
=
\frac12
\int_a^b
|\dot c(t)|^2\,dt
$$

とします。

<a id="thm-geo17-first-variation-energy"></a>
<!-- formal-statement-start -->
> **定理（エネルギーの第一変分公式）**  
> $F(s,t)$ を $\gamma(t)=F(0,t)$ の曲線の変分とし、
>
$$
T=\frac{\partial F}{\partial t},
\qquad
V=\left.\frac{\partial F}{\partial s}\right|_{s=0}
$$
>
> とする。
>
> $E(s)=E(F(s,\cdot))$ と置くと
>
$$
\boxed{
E'(0)
=
\left[
g(V,\dot\gamma)
\right]_a^b
-
\int_a^b
g\left(
V,
\frac{D\dot\gamma}{dt}
\right)
dt
}
$$
>
> が成り立つ。
>
> 固定端点変分なら $V(a)=V(b)=0$ なので
>
$$
\boxed{
E'(0)
=
-
\int_a^b
g\left(
V,
\frac{D\dot\gamma}{dt}
\right)
dt
}.
$$
<!-- formal-statement-end -->

<!-- proof-start -->
### 証明

計量両立性から

$$
\frac{\partial}{\partial s}
\frac12 g(T,T)
=
g\left(
\frac{DT}{\partial s},
T
\right).
$$

従って

$$
E'(0)
=
\int_a^b
g\left(
\frac{DT}{\partial s},
T
\right)_{s=0}
dt.
$$

変分方向と曲線方向の交換公式から

$$
\frac{DT}{\partial s}
=
\frac{DV}{\partial t}.
$$

よって

$$
E'(0)
=
\int_a^b
g\left(
\frac{DV}{dt},
\dot\gamma
\right)
dt.
$$

計量両立性による積の微分則

$$
\frac{d}{dt}g(V,\dot\gamma)
=
g\left(\frac{DV}{dt},\dot\gamma\right)
+
g\left(V,\frac{D\dot\gamma}{dt}\right)
$$

を使うと

$$
g\left(\frac{DV}{dt},\dot\gamma\right)
=
\frac{d}{dt}g(V,\dot\gamma)
-
g\left(V,\frac{D\dot\gamma}{dt}\right).
$$

積分して

$$
E'(0)
=
\left[g(V,\dot\gamma)\right]_a^b
-
\int_a^b
g\left(V,\frac{D\dot\gamma}{dt}\right)dt.
$$

固定端点なら $V(a)=V(b)=0$ なので境界項が消えます。$\square$
<!-- proof-end -->

<a id="cor-geo17-geodesic-critical"></a>
<!-- formal-statement-start -->
> **系（測地線とエネルギー臨界点の同値）**  
> 滑らかな曲線 $\gamma:[a,b]\to M$ について、次は同値である。
>
> 1. $\gamma$ は測地線である。
> 2. 任意の滑らかな固定端点変分に対して
>
$$
E'(0)=0
$$
>
> である。
<!-- formal-statement-end -->

<!-- proof-start -->
### 証明

$\gamma$ が測地線なら

$$
\frac{D\dot\gamma}{dt}=0.
$$

第一変分公式から直ちに

$$
E'(0)=0.
$$

逆に、全ての固定端点変分に対して $E'(0)=0$ とします。

$\gamma$ に沿う任意の滑らかなベクトル場 $V$ で

$$
V(a)=V(b)=0
$$

を満たすものは、十分小さい $s$ に対して

$$
F(s,t)
=
\exp_{\gamma(t)}(sV(t))
$$

と置けば変分ベクトル場として実現できます。区間 $[a,b]$ はコンパクトなので、$|s|$ を一様に小さく取れば指数写像は全ての $t$ で定義されます。

従って

$$
\int_a^b
g\left(
V,
\frac{D\dot\gamma}{dt}
\right)dt
=
0
$$

が全ての端点0の $V$ に対して成り立ちます。

もしある $t_0\in(a,b)$ で

$$
\frac{D\dot\gamma}{dt}(t_0)\ne0
$$

なら、その近くに台を持つ非負の滑らかな関数 $\chi$ を取り、

$$
V
=
\chi
\frac{D\dot\gamma}{dt}
$$

とすれば

$$
\int_a^b
\chi
\left|
\frac{D\dot\gamma}{dt}
\right|^2dt
>
0
$$

となり矛盾します。

従って

$$
\frac{D\dot\gamma}{dt}=0,
$$

すなわち $\gamma$ は測地線です。$\square$
<!-- proof-end -->

測地線方程式は、単に「まっすぐに見える曲線」の式ではなく、**固定端点でエネルギーを一次まで変化させない曲線の Euler--Lagrange 方程式**として現れました。

---

## 4. 長さを一次まで動かす

エネルギーはパラメータに依存しますが、長さは曲線の像の幾何に近い量です。

<a id="thm-geo17-first-variation-length"></a>
<!-- formal-statement-start -->
> **定理（長さの第一変分公式）**  
> 基準曲線 $\gamma=F(0,\cdot)$ が正則であるとし、
>
$$
U
=
\frac{\dot\gamma}{|\dot\gamma|}
$$
>
> を単位接ベクトルとする。
>
> $L(s)=L(F(s,\cdot))$ と置けば
>
$$
\boxed{
L'(0)
=
\left[g(V,U)\right]_a^b
-
\int_a^b
g\left(
V,
\frac{DU}{dt}
\right)dt
}.
$$
>
> 特に $\gamma$ が単位速測地線で固定端点変分なら
>
$$
L'(0)=0.
$$
<!-- formal-statement-end -->

<!-- proof-start -->
### 証明

長さは

$$
L(s)
=
\int_a^b
|T|\,dt
$$

です。

正則性により $|T|>0$ なので微分でき、

$$
\frac{\partial}{\partial s}|T|
=
\frac1{|T|}
g\left(
\frac{DT}{\partial s},
T
\right).
$$

$s=0$ で $T=\dot\gamma$、$U=\dot\gamma/|\dot\gamma|$ だから

$$
L'(0)
=
\int_a^b
g\left(
\frac{DV}{dt},
U
\right)dt.
$$

積の微分則から

$$
g\left(
\frac{DV}{dt},U
\right)
=
\frac{d}{dt}g(V,U)
-
g\left(V,\frac{DU}{dt}\right).
$$

積分すると

$$
L'(0)
=
\left[g(V,U)\right]_a^b
-
\int_a^b
g\left(V,\frac{DU}{dt}\right)dt.
$$

単位速測地線なら $U=\dot\gamma$ かつ $DU/dt=0$ です。固定端点なら境界項も0なので $L'(0)=0$ です。$\square$
<!-- proof-end -->

第一変分は「測地線であるか」を判定します。しかし局所最短かどうかを判定するには二階の情報が必要です。

---

## 5. 第二変分に曲率が現れる

ここから $\gamma$ を測地線とし、$F$ を固定端点変分とします。

<a id="thm-geo17-second-variation"></a>
<!-- formal-statement-start -->
> **定理（エネルギーの第二変分公式）**  
> $\gamma:[a,b]\to M$ を測地線、$F$ を $\gamma$ の滑らかな固定端点変分、$V$ をその変分ベクトル場とする。
>
> このとき
>
$$
\boxed{
E''(0)
=
\int_a^b
\left\{
\left|
\frac{DV}{dt}
\right|^2
-
g\left(
R(V,\dot\gamma)\dot\gamma,
V
\right)
\right\}
dt
}.
$$
<!-- formal-statement-end -->

<!-- proof-start -->
### 証明

固定端点変分では各 $s$ について境界項が消えるので、第一変分公式を変分曲線 $F(s,\cdot)$ へ適用すると

$$
E'(s)
=
-
\int_a^b
g\left(
V,
\frac{DT}{\partial t}
\right)dt.
$$

$s$ で微分し、$s=0$ を代入します。

$$
E''(0)
=
-
\int_a^b
\left[
g\left(
\frac{DV}{\partial s},
\frac{DT}{\partial t}
\right)
+
g\left(
V,
\frac{D}{\partial s}\frac{DT}{\partial t}
\right)
\right]_{s=0}
dt.
$$

$\gamma$ は測地線なので

$$
\left.\frac{DT}{\partial t}\right|_{s=0}
=
\frac{D\dot\gamma}{dt}
=
0.
$$

従って第一項は消えます。

曲率による交換公式から

$$
\frac{D}{\partial s}\frac{DT}{\partial t}
=
\frac{D}{\partial t}\frac{DT}{\partial s}
+
R(V,T)T.
$$

さらに捩率0より

$$
\frac{DT}{\partial s}
=
\frac{DV}{\partial t}.
$$

したがって $s=0$ で

$$
\frac{D}{\partial s}\frac{DT}{\partial t}
=
\frac{D^2V}{dt^2}
+
R(V,\dot\gamma)\dot\gamma.
$$

よって

$$
E''(0)
=
-
\int_a^b
g\left(
V,
\frac{D^2V}{dt^2}
\right)dt
-
\int_a^b
g\left(
R(V,\dot\gamma)\dot\gamma,
V
\right)dt.
$$

第一項を部分積分します。

$$
\frac{d}{dt}
g\left(
V,\frac{DV}{dt}
\right)
=
\left|\frac{DV}{dt}\right|^2
+
g\left(
V,\frac{D^2V}{dt^2}
\right).
$$

従って

$$
-
\int_a^b
g\left(
V,\frac{D^2V}{dt^2}
\right)dt
=
-
\left[
g\left(
V,\frac{DV}{dt}
\right)
\right]_a^b
+
\int_a^b
\left|\frac{DV}{dt}\right|^2dt.
$$

固定端点変分では $V(a)=V(b)=0$ なので境界項は0です。

以上から

$$
E''(0)
=
\int_a^b
\left\{
\left|\frac{DV}{dt}\right|^2
-
g(R(V,\dot\gamma)\dot\gamma,V)
\right\}dt.
$$

$\square$
<!-- proof-end -->

正曲率では

$$
g(R(V,\dot\gamma)\dot\gamma,V)
$$

が正になり得るため、第二変分を押し下げます。

負曲率では逆にこの項の前のマイナスが正に働き、近い測地線を引き離す方向へ働きます。

---

## 6. 第二変分を双線形化する

<a id="def-geo17-index-form"></a>
<!-- formal-statement-start -->
> **定義（指数形式）**  
> 測地線 $\gamma:[a,b]\to M$ に沿う区分的に滑らかなベクトル場 $V,W$ で
>
$$
V(a)=V(b)=W(a)=W(b)=0
$$
>
> を満たすものに対し、
>
$$
\boxed{
I(V,W)
=
\int_a^b
\left\{
g\left(
\frac{DV}{dt},
\frac{DW}{dt}
\right)
-
g\left(
R(V,\dot\gamma)\dot\gamma,
W
\right)
\right\}dt
}
$$
>
> と定め、$I$ を $\gamma$ に沿う **指数形式**という。
<!-- formal-statement-end -->

Riemann 曲率テンソルの対称性から

$$
g(R(V,\dot\gamma)\dot\gamma,W)
=
g(R(W,\dot\gamma)\dot\gamma,V)
$$

なので

$$
I(V,W)=I(W,V).
$$

第二変分公式は簡潔に

$$
\boxed{
E''(0)=I(V,V)
}
$$

と書けます。

<!-- definition-example-start: def-geo17-index-form -->
**定義の確認：Euclid 空間**

Euclid 空間では

$$
R=0.
$$

従って

$$
I(V,V)
=
\int_a^b
\left|
\frac{dV}{dt}
\right|^2dt.
$$

$V(a)=V(b)=0$ で $I(V,V)=0$ なら

$$
V'(t)=0
$$

なので $V$ は定数です。

端点条件から

$$
V\equiv0.
$$

したがって Euclid 空間の直線測地線では、固定端点の非自明な方向に第二変分は必ず正です。
<!-- definition-example-end -->

---

## 7. 測地線族の一次のずれ

<a id="def-geo17-jacobi"></a>
<!-- formal-statement-start -->
> **定義（Jacobi 場・Jacobi 方程式）**  
> 測地線 $\gamma:[a,b]\to M$ に沿う滑らかなベクトル場 $J$ が
>
$$
\boxed{
\frac{D^2J}{dt^2}
+
R(J,\dot\gamma)\dot\gamma
=
0
}
$$
>
> を満たすとき、$J$ を $\gamma$ に沿う **Jacobi 場**という。
>
> この微分方程式を **Jacobi 方程式**という。
<!-- formal-statement-end -->

<!-- definition-example-start: def-geo17-jacobi -->
**定義の確認：Euclid 空間**

Euclid 空間では $R=0$ なので Jacobi 方程式は

$$
J''(t)=0.
$$

従って

$$
\boxed{
J(t)=A+tB
}
$$

です。

二本の直線をわずかに平行移動した差が定数 $A$、初速度をわずかに変えた差が $tB$ です。

Jacobi 場が「測地線族の一次のずれ」を表していることが最も直接に見える例です。
<!-- definition-example-end -->

<a id="thm-geo17-geodesic-variation-jacobi"></a>
<!-- formal-statement-start -->
> **定理（測地線変分からの Jacobi 方程式）**  
> 曲線の変分 $F(s,t)$ が、各固定した $s$ について $t\mapsto F(s,t)$ が測地線となる **測地線変分**であるとする。
>
> このとき変分ベクトル場
>
$$
J(t)
=
\left.
\frac{\partial F}{\partial s}
\right|_{s=0}
$$
>
> は Jacobi 場である。
<!-- formal-statement-end -->

<!-- proof-start -->
### 証明

各 $s$ について $t\mapsto F(s,t)$ は測地線なので

$$
\frac{DT}{\partial t}=0.
$$

$s$ 方向に共変微分すると

$$
0
=
\frac{D}{\partial s}
\frac{DT}{\partial t}.
$$

曲率による交換公式から

$$
0
=
\frac{D}{\partial t}
\frac{DT}{\partial s}
+
R(V,T)T.
$$

捩率0より

$$
\frac{DT}{\partial s}
=
\frac{DV}{\partial t}.
$$

従って

$$
0
=
\frac{D^2V}{\partial t^2}
+
R(V,T)T.
$$

$s=0$ に制限すると $V=J$、$T=\dot\gamma$ なので

$$
\frac{D^2J}{dt^2}
+
R(J,\dot\gamma)\dot\gamma
=
0.
$$

よって $J$ は Jacobi 場です。$\square$
<!-- proof-end -->

曲率は、共変微分の交換子として導入されたあと、ここで**測地線同士の相対加速度**になりました。

---

## 8. Jacobi 場は全て測地線変分から来る

Jacobi 方程式は線形二階 ODE なので、初期値

$$
J(a),
\qquad
\frac{DJ}{dt}(a)
$$

で一意に決まります。

<a id="thm-geo17-jacobi-variation-converse"></a>
<!-- formal-statement-start -->
> **定理（Jacobi 場の測地線変分による実現）**  
> $\gamma$ に沿う任意の Jacobi 場 $J$ は、局所的にはある測地線変分の変分ベクトル場として実現できる。
<!-- formal-statement-end -->

<!-- proof-start -->
### 証明

初期点を

$$
p=\gamma(a),
\qquad
v=\dot\gamma(a)
$$

とします。

まず $p$ を通る曲線 $p(s)$ を

$$
p(0)=p,
\qquad
p'(0)=J(a)
$$

となるように取ります。

次に $p(s)$ に沿う接ベクトル $v(s)\in T_{p(s)}M$ を

$$
v(0)=v,
\qquad
\left.\frac{Dv}{ds}\right|_{s=0}
=
\frac{DJ}{dt}(a)
$$

となるように取ります。

局所座標または局所標構を使えば、このような $v(s)$ は成分を一次に指定して構成できます。

十分小さい $s$ と $t-a$ に対して

$$
F(s,t)
=
\exp_{p(s)}
\bigl((t-a)v(s)\bigr)
$$

と置きます。

各 $s$ について $t\mapsto F(s,t)$ は測地線なので、変分ベクトル場 $\widetilde J$ は前定理により Jacobi 場です。

初期値を調べると

$$
\widetilde J(a)
=
p'(0)
=
J(a).
$$

また測地線の初速度は $v(s)$ なので

$$
\frac{D\widetilde J}{dt}(a)
=
\left.\frac{Dv}{ds}\right|_{s=0}
=
\frac{DJ}{dt}(a).
$$

Jacobi 方程式の初期値問題の一意性から

$$
\widetilde J=J.
$$

従って $J$ は測地線変分から実現されます。$\square$
<!-- proof-end -->

---

## 9. 指数写像の微分は Jacobi 場で読める

固定した $p\in M$ と $v,w\in T_pM$ を取り、

$$
\gamma(t)=\exp_p(tv)
$$

とします。

変分

$$
F(s,t)
=
\exp_p\bigl(t(v+sw)\bigr)
$$

を考えます。

各 $s$ について放射測地線なので測地線変分です。

<a id="prop-geo17-exp-jacobi"></a>
<!-- formal-statement-start -->
> **命題（指数写像の微分と Jacobi 場）**  
> 上の変分から得る Jacobi 場を $J_w$ とする。
>
> すると
>
$$
J_w(0)=0,
\qquad
\frac{DJ_w}{dt}(0)=w
$$
>
> であり、任意の $T$ について
>
$$
\boxed{
J_w(T)
=
(d\exp_p)_{Tv}(Tw)
}
$$
>
> が成り立つ。
>
> 特に $T=1$ なら
>
$$
\boxed{
J_w(1)
=
(d\exp_p)_v(w)
}.
$$
<!-- formal-statement-end -->

<!-- proof-start -->
### 証明

$t=0$ では全ての $s$ について

$$
F(s,0)=p
$$

なので

$$
J_w(0)=0.
$$

測地線 $t\mapsto F(s,t)$ の初速度は

$$
v+sw
$$

です。

従って

$$
\frac{DJ_w}{dt}(0)
=
\left.
\frac{d}{ds}
\right|_{s=0}
(v+sw)
=
w.
$$

一方、

$$
F(s,T)
=
\exp_p\bigl(Tv+sTw\bigr).
$$

$s$ で微分すると

$$
J_w(T)
=
(d\exp_p)_{Tv}(Tw).
$$

$\square$
<!-- proof-end -->

指数写像がどこで局所微分同相でなくなるかは、Jacobi 場がどこで再び0になるかと同じ問題になりました。

---

## 10. 測地線が再び一点へ集まるとき

<a id="def-geo17-conjugate"></a>
<!-- formal-statement-start -->
> **定義（共役点・共役点の重複度）**  
> 測地線
>
$$
\gamma:[a,b]\to M
$$
>
> に対し、$q=\gamma(b)$ が $p=\gamma(a)$ に **$\gamma$ に沿って共役**であるとは、
>
$$
J(a)=J(b)=0
$$
>
> を満たす非零 Jacobi 場 $J$ が存在することをいう。
>
> このような Jacobi 場全体のベクトル空間の次元を、$q$ の $p$ に対する **共役点の重複度**という。
<!-- formal-statement-end -->

<!-- definition-example-start: def-geo17-conjugate -->
**定義の確認：球面の対蹠点**

半径 $a$ の球面 $S^n_a$ 上で、北極から出る単位速大円を $\gamma$ とします。

$\dot\gamma$ に直交する平行単位ベクトル場 $E$ を一つ取ると、後で示すように

$$
J(t)
=
a\sin\frac{t}{a}\,E(t)
$$

は Jacobi 場です。

そして

$$
J(0)=0,
$$

$$
J(\pi a)=0.
$$

$0<t<\pi a$ では $\sin(t/a)>0$ なので $J(t)\ne0$ です。

従って距離 $\pi a$ の対蹠点は最初の共役点です。
<!-- definition-example-end -->

<a id="thm-geo17-conjugate-exp"></a>
<!-- formal-statement-start -->
> **定理（共役点と指数写像の微分の退化）**  
> $p\in M$、$v\in T_pM$、$T>0$ とし、
>
$$
\gamma(t)=\exp_p(tv),
\qquad
0\le t\le T
$$
>
> とする。
>
> $q=\gamma(T)$ が $p$ に $\gamma$ に沿って共役であることと、
>
$$
\boxed{
(d\exp_p)_{Tv}
\text{ が単射でない}
}
$$
>
> ことは同値である。
>
> さらに共役点の重複度は
>
$$
\boxed{
\dim\ker(d\exp_p)_{Tv}
}
$$
>
> に等しい。
<!-- formal-statement-end -->

<!-- proof-start -->
### 証明

まず $(d\exp_p)_{Tv}$ が単射でないとします。

非零な $z\in T_pM$ で

$$
(d\exp_p)_{Tv}(z)=0
$$

となるものを取ります。

$$
w=\frac{z}{T}
$$

と置き、前節の Jacobi 場 $J_w$ を取ると

$$
J_w(0)=0
$$

かつ

$$
J_w(T)
=
(d\exp_p)_{Tv}(Tw)
=
(d\exp_p)_{Tv}(z)
=
0.
$$

初期微分は $w\ne0$ なので Jacobi 方程式の一意性から $J_w$ は非零です。

従って $q$ は $p$ に共役です。

逆に、非零 Jacobi 場 $J$ が

$$
J(0)=J(T)=0
$$

を満たすとします。

$$
w=\frac{DJ}{dt}(0)
$$

と置きます。

もし $w=0$ なら初期値

$$
J(0)=0,
\qquad
J'(0)=0
$$

から一意性により $J\equiv0$ となり矛盾するので

$$
w\ne0.
$$

$J$ と $J_w$ は同じ初期値を持つため

$$
J=J_w.
$$

従って

$$
0
=
J(T)
=
(d\exp_p)_{Tv}(Tw).
$$

$Tw\ne0$ なので $(d\exp_p)_{Tv}$ は単射でありません。

対応

$$
w
\longmapsto
Tw
$$

は両端0の Jacobi 場の初期微分空間と $\ker(d\exp_p)_{Tv}$ を線形同型に移すので、次元も一致します。$\square$
<!-- proof-end -->

---

## 11. 球面では共役点を式で見られる

<a id="prop-geo17-sphere-conjugate"></a>
<!-- formal-statement-start -->
> **命題（球面の対蹠点は共役点）**  
> 半径 $a$ の標準球面 $S^n_a$ 上の単位速測地線 $\gamma$ を考える。
>
> $\dot\gamma$ に直交する平行ベクトル場 $E$ に対し
>
$$
\boxed{
J(t)
=
a\sin\frac{t}{a}\,E(t)
}
$$
>
> は
>
$$
J(0)=0,
\qquad
\frac{DJ}{dt}(0)=E(0)
$$
>
> を満たす Jacobi 場である。
>
> 最初の正の零点は
>
$$
t=\pi a
$$
>
> であり、対蹠点の共役点重複度は $n-1$ である。
<!-- formal-statement-end -->

<!-- proof-start -->
### 証明

GEO16 より球面の断面曲率は

$$
K=\frac1{a^2}.
$$

定断面曲率の曲率公式から、$E\perp\dot\gamma$、$|\dot\gamma|=1$ なら

$$
R(E,\dot\gamma)\dot\gamma
=
\frac1{a^2}E.
$$

$E$ は平行なので

$$
\frac{DE}{dt}=0.
$$

$$
J=fE
$$

と置くと Jacobi 方程式は

$$
f''E
+
\frac1{a^2}fE
=
0,
$$

すなわち

$$
f''+\frac1{a^2}f=0.
$$

初期条件

$$
f(0)=0,
\qquad
f'(0)=1
$$

の解は

$$
f(t)=a\sin\frac{t}{a}.
$$

したがって

$$
J(t)
=
a\sin\frac{t}{a}E(t).
$$

最初の正の零点は

$$
t=\pi a.
$$

$\dot\gamma(0)$ に直交する初期ベクトル $E(0)$ は $(n-1)$ 次元あります。

一方、接線方向の Jacobi 場は

$$
J=f\dot\gamma
$$

と書け、$R(\dot\gamma,\dot\gamma)\dot\gamma=0$ なので

$$
f''=0.
$$

両端で0なら $f\equiv0$ です。

従って両端0の非零 Jacobi 場は法方向の $n-1$ 次元からなり、重複度は

$$
n-1.
$$

$\square$
<!-- proof-end -->

正曲率では近い測地線が再び集まり、球面ではそれが対蹠点で完全に見えます。

---

## 12. Jacobi 場を指数形式へ代入する

Jacobi 場 $J$ と端点0のベクトル場 $W$ を考えます。

部分積分すると

$$
\begin{aligned}
I(J,W)
&=
\int_a^b
\left\{
g\left(
\frac{DJ}{dt},
\frac{DW}{dt}
\right)
-
g(R(J,\dot\gamma)\dot\gamma,W)
\right\}dt
\\
&=
\left[
g\left(
\frac{DJ}{dt},
W
\right)
\right]_a^b
\\
&\quad
-
\int_a^b
g\left(
\frac{D^2J}{dt^2}
+
R(J,\dot\gamma)\dot\gamma,
W
\right)dt.
\end{aligned}
$$

Jacobi 方程式から積分項は0です。

従って

$$
\boxed{
I(J,W)
=
\left[
g\left(
\frac{DJ}{dt},
W
\right)
\right]_a^b
}.
$$

特に $W(a)=W(b)=0$ なら

$$
\boxed{
I(J,W)=0
}.
$$

さらに $J(a)=J(b)=0$ なら

$$
\boxed{
I(J,J)=0
}.
$$

共役点が現れると、第二変分に0方向が現れることが分かります。

ただしここで重要な注意があります。

**端点が共役点であるだけでは、その測地線が最短でないとは限りません。**

球面の北極から南極までの半周大円は長さ $\pi a$ で最短ですが、南極は北極の共役点です。そこで第二変分は0方向を持ちます。

最短性が必ず壊れるのは、共役点が区間の**内部**に入ったときです。

---

## 13. 共役点がない区間では指数形式は正

<a id="thm-geo17-index-positive"></a>
<!-- formal-statement-start -->
> **定理（共役点がない区間での指数形式の正定値性）**  
> $\gamma:[a,b]\to M$ を測地線とする。
>
> $\gamma(a)$ に共役な点が
>
$$
\gamma(t),
\qquad
a<t\le b
$$
>
> の中に一つもないと仮定する。
>
> このとき
>
$$
V(a)=V(b)=0
$$
>
> を満たす任意の非零な区分的に滑らかなベクトル場 $V$ に対し
>
$$
\boxed{
I(V,V)>0
}
$$
>
> が成り立つ。
<!-- formal-statement-end -->

<!-- proof-start -->
### 証明

$\gamma$ に沿って平行正規直交標構

$$
E_1(t),\dots,E_n(t)
$$

を取ります。

ベクトル場を成分表示し、

$$
V(t)
=
\sum_{i=1}^n
x_i(t)E_i(t)
$$

と書きます。

曲率作用素

$$
Y
\longmapsto
R(Y,\dot\gamma)\dot\gamma
$$

の行列を

$$
Q(t)
$$

とします。

Riemann 曲率テンソルの対称性から $Q(t)$ は対称行列です。

Jacobi 方程式は成分で

$$
x''+Qx=0
$$

です。

ここで行列値 Jacobi 方程式

$$
A''+QA=0
$$

を初期条件

$$
A(a)=0,
\qquad
A'(a)=I_n
$$

で解きます。

各列は

$$
J(a)=0
$$

を満たす基本 Jacobi 場です。

共役点がないという仮定は

$$
\det A(t)\ne0,
\qquad
a<t\le b
$$

と同値です。

従って $t>a$ で

$$
S(t)
=
A'(t)A(t)^{-1}
$$

を定義できます。

まず $S$ が対称であることを示します。

$$
\frac{d}{dt}
\left(
A^TA'-A'^TA
\right)
=
A^TA''-A''^TA.
$$

$A''=-QA$、$Q^T=Q$ なので右辺は0です。

初期条件から $t=a$ でこの行列は0だから

$$
A^TA'=A'^TA.
$$

両側から逆行列を掛けて

$$
S^T=S.
$$

さらに

$$
S'
=
A''A^{-1}
-
A'A^{-1}A'A^{-1}
=
-Q-S^2.
$$

従って Riccati 方程式

$$
S'+S^2+Q=0
$$

を満たします。

ここで

$$
|x'|^2-x^TQx
$$

を変形します。

$$
\begin{aligned}
|x'-Sx|^2
+
\frac{d}{dt}(x^TSx)
&=
|x'|^2
-2x'^TSx
+x^TS^2x
\\
&\quad
+
2x'^TSx
+
x^TS'x
\\
&=
|x'|^2
+
x^T(S^2+S')x
\\
&=
|x'|^2-x^TQx.
\end{aligned}
$$

従って $a+\delta$ から $b$ まで積分すると

$$
I(V,V)
=
\lim_{\delta\downarrow0}
\left\{
\int_{a+\delta}^b
|x'-Sx|^2dt
+
[x^TSx]_{a+\delta}^b
\right\}.
$$

$x(b)=0$ なので上端の境界項は0です。

初期条件から

$$
A(t)
=
(t-a)I_n+O((t-a)^2),
$$

従って

$$
S(t)
=
\frac1{t-a}I_n+O(1).
$$

一方 $x(a)=0$ なので

$$
x(t)=O(t-a).
$$

よって

$$
x(t)^TS(t)x(t)
=
O(t-a)
\to0.
$$

したがって

$$
\boxed{
I(V,V)
=
\int_a^b
|x'-Sx|^2dt
\ge0
}.
$$

等号が成り立つなら

$$
x'=Sx=A'A^{-1}x.
$$

よって

$$
\frac{d}{dt}(A^{-1}x)=0.
$$

従って

$$
x(t)=A(t)c
$$

となる定数ベクトル $c$ が存在します。

しかし $x(b)=0$ かつ $A(b)$ は可逆なので

$$
c=0.
$$

従って $V\equiv0$ です。

したがって非零 $V$ なら

$$
I(V,V)>0.
$$

$\square$
<!-- proof-end -->

この定理は、共役点が現れるまで測地線の第二変分が全ての固定端点方向に正であることを示します。

---

## 14. 区間内部の共役点は最短性を壊す

<a id="thm-geo17-interior-conjugate-not-minimizing"></a>
<!-- formal-statement-start -->
> **定理（区間内部の共役点は局所最短性を壊す）**  
> $\gamma:[a,b]\to M$ を一定速測地線とする。
>
> ある
>
$$
c\in(a,b)
$$
>
> について $\gamma(c)$ が $\gamma(a)$ に $\gamma$ に沿って共役であるとする。
>
> このとき固定端点を保つ変分で
>
$$
E''(0)<0
$$
>
> となるものが存在する。
>
> 従って $\gamma|_{[a,b]}$ は局所的なエネルギー最小でも長さ最小でもない。
<!-- formal-statement-end -->

<!-- proof-start -->
### 証明

共役点の定義から、$[a,c]$ 上に非零 Jacobi 場 $J$ で

$$
J(a)=J(c)=0
$$

を満たすものがあります。

$J$ を $[c,b]$ では0として延長し、区分的に滑らかなベクトル場 $V$ を作ります。

Jacobi 場の指数形式恒等式から

$$
I(V,V)=0.
$$

また

$$
\frac{DJ}{dt}(c)\ne0
$$

です。

実際、$J(c)=0$ と $DJ/dt(c)=0$ が同時なら Jacobi 方程式の初期値一意性により $J\equiv0$ となり矛盾します。

次に端点0の滑らかなベクトル場 $W$ を

$$
W(c)
=
-\frac{DJ}{dt}(c)
$$

となるように取ります。

$V$ は $[a,c]$ では Jacobi 場で、$[c,b]$ では0なので部分積分から

$$
I(V,W)
=
g\left(
\frac{DJ}{dt}(c),
W(c)
\right)
=
-
\left|
\frac{DJ}{dt}(c)
\right|^2
<0.
$$

そこで

$$
U_\varepsilon
=
V+\varepsilon W
$$

と置くと

$$
\begin{aligned}
I(U_\varepsilon,U_\varepsilon)
&=
I(V,V)
+
2\varepsilon I(V,W)
+
\varepsilon^2I(W,W)
\\
&=
-2\varepsilon
\left|
\frac{DJ}{dt}(c)
\right|^2
+
\varepsilon^2I(W,W).
\end{aligned}
$$

十分小さい $\varepsilon>0$ なら

$$
I(U_\varepsilon,U_\varepsilon)<0.
$$

$V$ の角は $c$ だけなので、必要なら $c$ の小近傍で平滑化しても負性は保たれます。従って滑らかな端点0のベクトル場 $U$ で

$$
I(U,U)<0
$$

を取れます。

この $U$ を

$$
F(s,t)
=
\exp_{\gamma(t)}(sU(t))
$$

で変分ベクトル場として実現すると、第二変分公式より

$$
E''(0)=I(U,U)<0.
$$

第一変分は0なので Taylor 展開から十分小さい非零 $s$ で

$$
E(F(s,\cdot))
<
E(\gamma).
$$

区間長を

$$
T_0=b-a
$$

とします。

Cauchy--Schwarz の不等式から任意の曲線 $c$ について

$$
L(c)^2
\le
2T_0E(c).
$$

$\gamma$ は一定速なので等号

$$
L(\gamma)^2
=
2T_0E(\gamma)
$$

が成り立ちます。

従って

$$
L(F(s,\cdot))^2
\le
2T_0E(F(s,\cdot))
<
2T_0E(\gamma)
=
L(\gamma)^2.
$$

よって変分曲線の方が短くなり、$\gamma$ は局所長さ最小でもありません。$\square$
<!-- proof-end -->

ここで「共役点が端点にある」と「共役点が区間内部にある」を区別した理由が明確になります。

端点がちょうど共役点なら $I(J,J)=0$ までは言えますが、上の負方向構成には共役点の後ろの区間が必要です。

---

## 15. 非正曲率では共役点がない

<a id="prop-geo17-nonpositive-no-conjugate"></a>
<!-- formal-statement-start -->
> **命題（非正断面曲率では共役点がない）**  
> $\gamma:[a,b]\to M$ を測地線とし、$\gamma$ に沿う全ての2次元接平面の断面曲率が
>
$$
K\le0
$$
>
> であるとする。
>
> このとき $\gamma(a)$ に共役な点は $\gamma((a,b])$ に存在しない。
<!-- formal-statement-end -->

<!-- proof-start -->
### 証明

両端で0になる Jacobi 場 $J$ があると仮定します。

$$
f(t)
=
\frac12|J(t)|^2
$$

と置きます。

計量両立性と Jacobi 方程式から

$$
\begin{aligned}
f''(t)
&=
\left|
\frac{DJ}{dt}
\right|^2
+
g\left(
J,
\frac{D^2J}{dt^2}
\right)
\\
&=
\left|
\frac{DJ}{dt}
\right|^2
-
g(R(J,\dot\gamma)\dot\gamma,J).
\end{aligned}
$$

$J$ と $\dot\gamma$ が一次独立な点では

$$
g(R(J,\dot\gamma)\dot\gamma,J)
=
K(\operatorname{span}\{J,\dot\gamma\})
\left(
|J|^2|\dot\gamma|^2
-
g(J,\dot\gamma)^2
\right)
\le0.
$$

一次従属な点では曲率項は0です。

従って全ての点で

$$
f''(t)\ge0.
$$

つまり $f$ は凸関数です。

一方

$$
f(a)=f(b)=0
$$

かつ

$$
f(t)\ge0.
$$

凸性から区間内部では端点を結ぶ弦の下にあるので

$$
f(t)\le0.
$$

従って

$$
f(t)=0
$$

であり、

$$
J\equiv0.
$$

非零 Jacobi 場は存在しないので共役点も存在しません。$\square$
<!-- proof-end -->

負曲率が「測地線を離す」という直観が、$|J|^2$ の凸性として定量化されました。

---

## 16. 定曲率模型で Jacobi 方程式を比較する

単位速測地線 $\gamma$ と、それに直交する平行単位ベクトル場 $E$ を取り、

$$
J=fE
$$

とします。

定断面曲率 $K$ なら

$$
R(E,\dot\gamma)\dot\gamma
=
KE.
$$

従って Jacobi 方程式は

$$
\boxed{
f''+Kf=0
}
$$

です。

初期条件

$$
f(0)=0,
\qquad
f'(0)=1
$$

に対する解は

$$
\boxed{
f(t)
=
\begin{cases}
\dfrac1{\sqrt K}\sin(\sqrt K\,t),&K>0,\\[1.2ex]
t,&K=0,\\[1.2ex]
\dfrac1{\sqrt{-K}}\sinh(\sqrt{-K}\,t),&K<0.
\end{cases}
}
$$

です。

三つを並べると、

- $K>0$：再び0になり、共役点が生じる。
- $K=0$：線形に離れる。
- $K<0$：双曲線関数的に離れ、再び0にならない。

という違いが一式で見えます。

この定曲率模型が、次の GEO18 の比較幾何で一般の曲率上界・下界と比較する基準になります。

---

## 17. 演習

### Level A

<a id="ex-geo17-a01"></a>
#### GEO17-A01 Euclid 空間で第一変分を直接計算する
- Level: A

$\mathbb R^n$ で滑らかな曲線 $\gamma:[0,1]\to\mathbb R^n$ と、端点で0になる滑らかなベクトル場 $V$ を考える。

$$
F(s,t)=\gamma(t)+sV(t)
$$

と置く。

1. $F$ が固定端点変分であることを示せ。
2.
   $$
   E'(0)
   =
   \int_0^1
   \langle V',\gamma'\rangle dt
   $$
   を示せ。
3. 部分積分して
   $$
   E'(0)
   =
   -
   \int_0^1
   \langle V,\gamma''\rangle dt
   $$
   を示せ。
4. 全ての $V$ に対し $E'(0)=0$ なら $\gamma''=0$ を示せ。

<!-- solution-start -->
**解答**

1. $V(0)=V(1)=0$ なので

   $$
   F(s,0)=\gamma(0),
   \qquad
   F(s,1)=\gamma(1).
   $$

   従って固定端点変分です。

2. Euclid 空間では

   $$
   E(s)
   =
   \frac12
   \int_0^1
   |\gamma'+sV'|^2dt.
   $$

   微分すると

   $$
   E'(s)
   =
   \int_0^1
   \langle \gamma'+sV',V'\rangle dt.
   $$

   $s=0$ で

   $$
   E'(0)
   =
   \int_0^1
   \langle V',\gamma'\rangle dt.
   $$

3. 部分積分すると

   $$
   \int_0^1
   \langle V',\gamma'\rangle dt
   =
   [\langle V,\gamma'\rangle]_0^1
   -
   \int_0^1
   \langle V,\gamma''\rangle dt.
   $$

   $V(0)=V(1)=0$ なので境界項は0です。

4. 任意の端点0の $V$ に対し

   $$
   \int_0^1
   \langle V,\gamma''\rangle dt
   =
   0
   $$

   です。

   $\gamma''$ が非零な点の近くに台を持つ非負関数 $\chi$ を取り、

   $$
   V=\chi\gamma''
   $$

   とすれば積分は正になってしまいます。

   従って

   $$
   \gamma''=0.
   $$

   つまり Euclid 空間のエネルギー臨界曲線は直線です。
<!-- solution-end -->

<a id="ex-geo17-a02"></a>
#### GEO17-A02 Euclid 空間の Jacobi 場
- Level: A

Euclid 空間の直線測地線 $\gamma$ に沿う Jacobi 場を全て求めよ。

さらに、異なる二点が互いに共役でないことを示せ。

<!-- solution-start -->
**解答**

Euclid 空間では

$$
R=0.
$$

従って Jacobi 方程式は

$$
J''=0.
$$

二回積分して

$$
J(t)=A+tB
$$

です。

もし $t=a,b$、$a\ne b$ で

$$
J(a)=J(b)=0
$$

なら

$$
A+aB=0,
\qquad
A+bB=0.
$$

差を取ると

$$
(b-a)B=0.
$$

$a\ne b$ なので

$$
B=0.
$$

すると $A=0$ です。

従って両端で0になる非零 Jacobi 場は存在せず、Euclid 空間では異なる二点は測地線に沿って共役になりません。
<!-- solution-end -->

<a id="ex-geo17-a03"></a>
#### GEO17-A03 球面の最初の共役点
- Level: A

半径 $a$ の球面上の単位速測地線 $\gamma$ と、$\dot\gamma$ に直交する平行単位ベクトル場 $E$ を考える。

1. $J=fE$ に対する Jacobi 方程式を求めよ。
2. $J(0)=0$、$DJ/dt(0)=E(0)$ を満たす解を求めよ。
3. 最初の正の零点を求めよ。

<!-- solution-start -->
**解答**

1. 球面の断面曲率は

   $$
   K=\frac1{a^2}.
   $$

   $E\perp\dot\gamma$ かつ $E$ は平行なので

   $$
   R(E,\dot\gamma)\dot\gamma
   =
   \frac1{a^2}E.
   $$

   従って

   $$
   f''+\frac1{a^2}f=0.
   $$

2. 初期条件は

   $$
   f(0)=0,
   \qquad
   f'(0)=1.
   $$

   よって

   $$
   f(t)=a\sin\frac{t}{a}.
   $$

   したがって

   $$
   J(t)
   =
   a\sin\frac{t}{a}E(t).
   $$

3. $\sin(t/a)$ の最初の正の零点は

   $$
   \frac{t}{a}=\pi
   $$

   なので

   $$
   \boxed{
   t=\pi a
   }.
   $$
<!-- solution-end -->

<a id="ex-geo17-a04"></a>
#### GEO17-A04 接線方向の Jacobi 場
- Level: A

任意の測地線 $\gamma$ に沿って

$$
J=f(t)\dot\gamma(t)
$$

とする。

1. Jacobi 方程式が $f''=0$ に帰着することを示せ。
2. $J(a)=J(b)=0$、$a\ne b$ なら $J\equiv0$ を示せ。
3. 共役点を生む非零 Jacobi 場は必ず法方向成分を持つことを説明せよ。

<!-- solution-start -->
**解答**

1. 測地線なので

   $$
   \frac{D\dot\gamma}{dt}=0.
   $$

   従って

   $$
   \frac{D^2J}{dt^2}
   =
   f''\dot\gamma.
   $$

   また

   $$
   R(\dot\gamma,\dot\gamma)\dot\gamma=0
   $$

   なので

   $$
   R(J,\dot\gamma)\dot\gamma
   =
   fR(\dot\gamma,\dot\gamma)\dot\gamma
   =
   0.
   $$

   Jacobi 方程式は

   $$
   f''\dot\gamma=0,
   $$

   すなわち

   $$
   f''=0.
   $$

2. 従って

   $$
   f(t)=A+Bt.
   $$

   二つの異なる時刻で $f=0$ なら一次関数は恒等的に0です。

3. 接線方向成分だけでは両端0の非零 Jacobi 場を作れません。

   従って共役点に対応する Jacobi 場は、少なくともどこかで $\dot\gamma$ に直交する非零成分を持ちます。
<!-- solution-end -->

### Level B

<a id="ex-geo17-b01"></a>
#### GEO17-B01 第二変分公式を一行ずつ再構成する
- Level: B

固定端点変分 $F(s,t)$ の基準曲線 $\gamma$ が測地線であるとする。

1.
   $$
   E'(s)
   =
   -
   \int_a^b
   g\left(
   V,
   \frac{DT}{\partial t}
   \right)dt
   $$
   から出発せよ。
2. $s$ で微分し、$\gamma$ が測地線であることにより消える項を特定せよ。
3. 曲率交換公式と
   $$
   \frac{DT}{\partial s}
   =
   \frac{DV}{\partial t}
   $$
   を使って
   $$
   \frac{D}{\partial s}\frac{DT}{\partial t}
   =
   \frac{D^2V}{dt^2}
   +
   R(V,\dot\gamma)\dot\gamma
   $$
   を得よ。
4. 部分積分して第二変分公式を導け。

<!-- solution-start -->
**解答**

1. 固定端点なので第一変分の境界項は全ての $s$ で0です。

   従って

   $$
   E'(s)
   =
   -
   \int_a^b
   g\left(
   V,
   \frac{DT}{\partial t}
   \right)dt.
   $$

2. 微分すると

   $$
   E''(0)
   =
   -
   \int_a^b
   \left[
   g\left(
   \frac{DV}{\partial s},
   \frac{DT}{\partial t}
   \right)
   +
   g\left(
   V,
   \frac{D}{\partial s}\frac{DT}{\partial t}
   \right)
   \right]_{s=0}dt.
   $$

   $\gamma$ は測地線なので

   $$
   \left.
   \frac{DT}{\partial t}
   \right|_{s=0}
   =
   0.
   $$

   従って最初の内積が消えます。

3. 曲率交換公式から

   $$
   \frac{D}{\partial s}\frac{DT}{\partial t}
   =
   \frac{D}{\partial t}\frac{DT}{\partial s}
   +
   R(V,T)T.
   $$

   捩率0から

   $$
   \frac{DT}{\partial s}
   =
   \frac{DV}{\partial t}.
   $$

   よって $s=0$ で

   $$
   \frac{D}{\partial s}\frac{DT}{\partial t}
   =
   \frac{D^2V}{dt^2}
   +
   R(V,\dot\gamma)\dot\gamma.
   $$

4. 従って

   $$
   E''(0)
   =
   -
   \int_a^b
   g\left(
   V,\frac{D^2V}{dt^2}
   \right)dt
   -
   \int_a^b
   g(R(V,\dot\gamma)\dot\gamma,V)dt.
   $$

   部分積分すると

   $$
   -
   \int_a^b
   g\left(
   V,\frac{D^2V}{dt^2}
   \right)dt
   =
   \int_a^b
   \left|\frac{DV}{dt}\right|^2dt
   $$

   です。端点で $V=0$ なので境界項は消えます。

   よって

   $$
   \boxed{
   E''(0)
   =
   \int_a^b
   \left\{
   \left|\frac{DV}{dt}\right|^2
   -
   g(R(V,\dot\gamma)\dot\gamma,V)
   \right\}dt
   }.
   $$
<!-- solution-end -->

<a id="ex-geo17-b02"></a>
#### GEO17-B02 非正曲率で共役点がないことを再証明する
- Level: B

単位速測地線 $\gamma$ に沿う Jacobi 場 $J$ が

$$
J(a)=J(b)=0
$$

を満たすとする。

断面曲率が $\gamma$ に沿って非正であると仮定し、

$$
f=\frac12|J|^2
$$

を用いて $J\equiv0$ を示せ。

<!-- solution-start -->
**解答**

計量両立性から

$$
f'
=
g\left(
J,\frac{DJ}{dt}
\right),
$$

$$
f''
=
\left|\frac{DJ}{dt}\right|^2
+
g\left(
J,\frac{D^2J}{dt^2}
\right).
$$

Jacobi 方程式より

$$
\frac{D^2J}{dt^2}
=
-R(J,\dot\gamma)\dot\gamma.
$$

従って

$$
f''
=
\left|\frac{DJ}{dt}\right|^2
-
g(R(J,\dot\gamma)\dot\gamma,J).
$$

断面曲率が非正なので

$$
g(R(J,\dot\gamma)\dot\gamma,J)\le0.
$$

したがって

$$
f''\ge0.
$$

よって $f$ は凸です。

端点で

$$
f(a)=f(b)=0
$$

なので、凸性から

$$
f(t)\le0
$$

です。

一方 $f\ge0$ なので

$$
f\equiv0.
$$

従って

$$
J\equiv0.
$$

よって両端0の非零 Jacobi 場はなく、共役点はありません。
<!-- solution-end -->

<a id="ex-geo17-b03"></a>
#### GEO17-B03 球面の指数写像が対蹠点で退化する
- Level: B

半径 $a$ の球面 $S^n_a$、点 $p$、単位ベクトル $v\in T_pS^n_a$ を考える。

$$
q=\exp_p(\pi a\,v)
$$

は対蹠点である。

1. $w\perp v$ に対し、初期条件
   $$
   J(0)=0,
   \qquad
   J'(0)=w
   $$
   を満たす Jacobi 場を求めよ。
2.
   $$
   J(\pi a)=0
   $$
   を示せ。
3.
   $$
   (d\exp_p)_{\pi a v}(\pi a w)=0
   $$
   を示せ。
4. 核の次元を求めよ。

<!-- solution-start -->
**解答**

1. $w$ を $\gamma(t)=\exp_p(tv)$ に沿って平行移動した場を $E_w(t)$ とします。

   球面の断面曲率は $1/a^2$ なので

   $$
   J(t)
   =
   a\sin\frac{t}{a}\,E_w(t)
   $$

   が初期条件を満たします。

2. $t=\pi a$ では

   $$
   \sin\pi=0
   $$

   なので

   $$
   J(\pi a)=0.
   $$

3. 指数写像の微分と Jacobi 場の公式から

   $$
   J(\pi a)
   =
   (d\exp_p)_{\pi a v}(\pi a w).
   $$

   左辺が0なので

   $$
   (d\exp_p)_{\pi a v}(\pi a w)=0.
   $$

4. $w$ は $v^\perp$ を任意に動けます。

   $v^\perp$ の次元は

   $$
   n-1.
   $$

   一方、$v$ 自身の方向は放射方向であり、対応する Jacobi 場は $t\dot\gamma$ なので $t=\pi a$ でも0になりません。

   従って

   $$
   \boxed{
   \dim\ker(d\exp_p)_{\pi a v}
   =
   n-1
   }.
   $$
<!-- solution-end -->

### Level C

<a id="ex-geo17-c01"></a>
#### GEO17-C01 球面で第二変分の符号が変わる距離を求める
- Level: C

半径 $a$ の球面上の単位速測地線

$$
\gamma:[0,L]\to S^n_a
$$

を考える。

$\dot\gamma$ に直交する平行単位ベクトル場 $E$ を取り、

$$
V(t)
=
\sin\frac{\pi t}{L}\,E(t)
$$

とする。

1. $V(0)=V(L)=0$ を確認せよ。
2.
   $$
   \left|\frac{DV}{dt}\right|^2
   =
   \frac{\pi^2}{L^2}
   \cos^2\frac{\pi t}{L}
   $$
   を示せ。
3.
   $$
   g(R(V,\dot\gamma)\dot\gamma,V)
   =
   \frac1{a^2}
   \sin^2\frac{\pi t}{L}
   $$
   を示せ。
4. 指数形式を計算し、
   $$
   \boxed{
   I(V,V)
   =
   \frac{L}{2}
   \left(
   \frac{\pi^2}{L^2}
   -
   \frac1{a^2}
   \right)
   }
   $$
   を示せ。
5. $L<\pi a$、$L=\pi a$、$L>\pi a$ の三場合で符号を判定し、共役点と最短性の関係を説明せよ。

<!-- solution-start -->
**解答**

1. 端点では

   $$
   \sin0=0,
   \qquad
   \sin\pi=0.
   $$

   従って

   $$
   V(0)=V(L)=0.
   $$

2. $E$ は平行なので

   $$
   \frac{DE}{dt}=0.
   $$

   よって

   $$
   \frac{DV}{dt}
   =
   \frac{\pi}{L}
   \cos\frac{\pi t}{L}\,E(t).
   $$

   $|E|=1$ だから

   $$
   \left|\frac{DV}{dt}\right|^2
   =
   \frac{\pi^2}{L^2}
   \cos^2\frac{\pi t}{L}.
   $$

3. 球面の断面曲率は

   $$
   K=\frac1{a^2}.
   $$

   $V\perp\dot\gamma$、$|\dot\gamma|=1$ なので

   $$
   R(V,\dot\gamma)\dot\gamma
   =
   \frac1{a^2}V.
   $$

   従って

   $$
   g(R(V,\dot\gamma)\dot\gamma,V)
   =
   \frac1{a^2}|V|^2
   =
   \frac1{a^2}
   \sin^2\frac{\pi t}{L}.
   $$

4. 指数形式へ代入すると

   $$
   I(V,V)
   =
   \int_0^L
   \left[
   \frac{\pi^2}{L^2}
   \cos^2\frac{\pi t}{L}
   -
   \frac1{a^2}
   \sin^2\frac{\pi t}{L}
   \right]dt.
   $$

   半周期上では

   $$
   \int_0^L
   \cos^2\frac{\pi t}{L}dt
   =
   \int_0^L
   \sin^2\frac{\pi t}{L}dt
   =
   \frac{L}{2}.
   $$

   従って

   $$
   I(V,V)
   =
   \frac{L}{2}
   \left(
   \frac{\pi^2}{L^2}
   -
   \frac1{a^2}
   \right).
   $$

5. $L<\pi a$ なら

   $$
   \frac{\pi}{L}>\frac1a
   $$

   なので

   $$
   I(V,V)>0.
   $$

   $L=\pi a$ なら

   $$
   I(V,V)=0.
   $$

   このとき

   $$
   V(t)=\sin(t/a)E(t)
   $$

   は定数倍を除いて球面の Jacobi 場そのもので、終点は最初の共役点です。

   $L>\pi a$ なら

   $$
   I(V,V)<0.
   $$

   従って第二変分が負になる固定端点方向が既に存在し、測地線は局所最短ではありません。

   つまり球面では

   $$
   \boxed{
   \pi a
   }
   $$

   が、Jacobi 場の最初の再収束と第二変分の符号変化を同時に表す距離です。
<!-- solution-end -->

---

## 18. 章末チェック

この章を終えた時点で、次を自力で再構成できることを確認してください。

1. 曲線の変分、変分ベクトル場、固定端点変分の定義。
2. Levi-Civita 接続の捩率0から
   $$
   D_sT=D_tV
   $$
   が出ること。
3. 曲率の定義から
   $$
   D_sD_tW-D_tD_sW=R(V,T)W
   $$
   が出ること。
4. エネルギーの第一変分公式と、測地線が固定端点エネルギーの臨界点であること。
5. 長さの第一変分公式。
6. 第二変分公式
   $$
   I(V,V)
   =
   \int
   \left(
   |D_tV|^2
   -
   g(R(V,\dot\gamma)\dot\gamma,V)
   \right)dt
   $$
   の導出。
7. 測地線変分を微分すると Jacobi 方程式が現れること。
8. 任意の Jacobi 場が初期点と初速度を動かす測地線変分から実現できること。
9. 指数写像の微分が Jacobi 場の終値であること。
10. 共役点と
    $$
    \ker(d\exp_p)\ne0
    $$
    が同値であること。
11. 球面の最初の共役点が距離 $\pi a$ の対蹠点で、重複度が $n-1$ であること。
12. 共役点がない区間で指数形式が正定値になる因数分解。
13. 端点が共役であることと、共役点が区間内部にあることを区別すべき理由。
14. 区間内部の共役点から負の第二変分方向を構成する方法。
15. 非正断面曲率で $|J|^2/2$ が凸になり、共役点が生じないこと。

---

## 19. 次に進む

本章では

$$
\text{曲率}
\longrightarrow
\text{Jacobi 方程式}
\longrightarrow
\text{共役点}
\longrightarrow
\text{局所最短性}
$$

という流れを構成しました。

特に定曲率模型では

$$
f''+Kf=0
$$

の解が

$$
\sin,
\qquad
\text{一次関数},
\qquad
\sinh
$$

へ分かれ、曲率の符号が測地線の集まり方を決めることが見えました。

次の **GEO18「比較幾何入門」** では、この定曲率模型と一般の Riemann 多様体の Jacobi 場を比較します。

Rauch の比較定理を通じて、

$$
\text{曲率の上下界}
\longrightarrow
\text{Jacobi 場の成長}
\longrightarrow
\text{共役点・直径・大域幾何}
$$

へ進み、Bonnet--Myers の定理と Cartan--Hadamard の定理へ接続します。
