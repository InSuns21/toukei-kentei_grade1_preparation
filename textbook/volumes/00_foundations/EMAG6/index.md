# EMAG6 Lorentz 力と荷電粒子

EMAG5 では、電流が磁場を作ることを学びました。しかし「場がどう作られるか」だけでは、荷電粒子の運動はまだ決まりません。電場 $E$ と磁場 $B$ が与えられたとき、その中に置かれた電荷がどの向きへ、どれだけ加速されるかを結ぶ法則が必要です。

本章では、場から粒子へ戻る法則として電磁力の基本式を導入します。そこから

- 磁場だけでは速さが変わらないこと
- 一様磁場中で円運動・螺旋運動が現れること
- 互いに直交する一様電場・磁場から $E\times B$ ドリフトが生じること
- 電磁場中の運動を一つの ラグランジアン から記述できること
- そのとき正準運動量が $mv$ ではなく $mv+qA$ になること

を順に導きます。

ここで重要なのは、Newton 力学と解析力学が別の理論を与えるのではなく、同じ電磁力の運動方程式を別の入口から再現することです。

---

## 1. 場から粒子へ働く力

電場だけがあるとき、電荷 $q$ に働く力は

$$
F_E=qE
$$

でした。

磁場の効果は、粒子が静止しているだけでは現れません。粒子が速度 $v$ で動くとき、磁場による力は $v$ と $B$ の両方に垂直な向きへ現れます。

<a id="principle-emag6-lorentz-force"></a>

<!-- formal-statement-start -->
> **原理（Lorentz 力）**  
> 真空中で電荷 $q$、質量 $m>0$ の点粒子が位置 $r(t)$、速度
>
$$
v(t)=\dot r(t)
$$
>
> を持ち、その位置で電場 $E(t,r)$、磁場 $B(t,r)$ が与えられているとする。粒子に働く電磁力は
>
$$
\boxed{
F
=
q\left(
E+v\times B
\right)
}
$$
>
> である。したがって Newton 方程式は
>
$$
\boxed{
m\dot v
=
q\left(
E+v\times B
\right)
}
$$
>
> となる。
<!-- formal-statement-end -->

電気力 $qE$ は速度に依存しません。一方、磁気力

$$
F_B=q\,v\times B
$$

は速度に依存します。

また電荷の符号は力の向きを反転させます。正電荷に働く向きが $v\times B$ なら、負電荷にはその反対向きの力が働きます。

### 1.1 向きを手で確認する

右手系の直交基底を

$$
e_x,\ e_y,\ e_z
$$

とし、

$$
v=v_0e_x,
\qquad
B=B_0e_z,
\qquad
v_0>0,\ B_0>0
$$

とします。

ベクトル積は

$$
e_x\times e_z=-e_y
$$

なので

$$
v\times B
=
v_0B_0(e_x\times e_z)
=
-v_0B_0e_y.
$$

したがって $q>0$ なら

$$
F_B=-qv_0B_0e_y,
$$

$q<0$ なら向きが反転して $+e_y$ 方向です。

### 1.2 単位を確認する

Lorentz 力の磁気項は

$$
qvB
$$

の次元を持ちます。

テスラは

$$
1\ \mathrm T
=
1\ \frac{\mathrm N}{\mathrm{A\,m}}
$$

であり、

$$
1\ \mathrm A
=
1\ \frac{\mathrm C}{\mathrm s}
$$

なので

$$
\begin{aligned}
[\mathrm C]\,
\left[
\frac{\mathrm m}{\mathrm s}
\right]\,
[\mathrm T]
&=
\mathrm C
\frac{\mathrm m}{\mathrm s}
\frac{\mathrm N}{(\mathrm C/\mathrm s)\mathrm m}\\
&=
\mathrm N.
\end{aligned}
$$

確かに力の単位になります。

---

## 2. 磁気力は速さを変えない

磁気力は運動方向に対して常に垂直です。この幾何学的事実が、運動エネルギーの変化を大きく制限します。

<a id="prop-emag6-magnetic-no-work"></a>

<!-- formal-statement-start -->
> **命題（磁気力は仕事をしない）**  
> Lorentz 力
>
$$
F=q(E+v\times B)
$$
>
> に従う質量 $m>0$ の粒子について、運動エネルギー
>
$$
K=\frac12m|v|^2
$$
>
> の時間変化は
>
$$
\boxed{
\frac{dK}{dt}
=
qE\cdot v
}
$$
>
> である。特に $E=0$ なら $K$ は一定であり、磁場だけでは粒子の速さを変えない。
<!-- formal-statement-end -->

<!-- proof-start -->
### 証明

運動エネルギーを時間微分すると

$$
\begin{aligned}
\frac{dK}{dt}
&=
\frac{d}{dt}
\left(
\frac12m\,v\cdot v
\right)\\
&=
m\,v\cdot\dot v.
\end{aligned}
$$

Newton 方程式

$$
m\dot v
=
q(E+v\times B)
$$

を代入して

$$
\frac{dK}{dt}
=
qv\cdot E
+
qv\cdot(v\times B).
$$

ベクトル積 $v\times B$ は $v$ に垂直なので

$$
v\cdot(v\times B)=0.
$$

従って

$$
\boxed{
\frac{dK}{dt}
=
qE\cdot v
}.
$$

$E=0$ なら右辺は 0 だから

$$
K=\frac12m|v|^2
$$

は一定です。$m>0$ なので $|v|$ も一定です。
<!-- proof-end -->

磁場は粒子の速度ベクトルの**大きさではなく向き**を曲げます。この事実が一様磁場中の円運動につながります。

---

## 3. 一様磁場中の円運動と螺旋運動

一様な磁場

$$
B=B_0e_z,
\qquad
B_0>0
$$

だけがあり、

$$
E=0
$$

とします。

速度を磁場に平行な成分と垂直な成分へ分けます。

$$
v=v_\parallel+v_\perp.
$$

ここで

$$
v_\parallel
=
(v\cdot e_z)e_z,
\qquad
v_\perp\cdot e_z=0.
$$

Lorentz 力は

$$
m\dot v
=
qv\times B
=
qv_\perp\times B
$$

です。$v_\parallel\times B=0$ なので、磁場に平行な速度成分は力を受けません。

<a id="prop-emag6-uniform-magnetic-motion"></a>

<!-- formal-statement-start -->
> **命題（一様磁場中の荷電粒子運動）**  
> 電荷 $q\neq0$、質量 $m>0$ の粒子が
>
$$
E=0,
\qquad
B=B_0e_z,
\qquad
B_0>0
$$
>
> の一様磁場中を運動するとする。このとき
>
> 1. $v_\parallel$ は一定である。
> 2. $|v_\perp|$ は一定である。
> 3. $v_\perp\neq0$ なら磁場に垂直な平面内の運動は円運動で、その角周波数と半径は
>
$$
\boxed{
\omega_c
=
\frac{|q|B_0}{m}
},
\qquad
\boxed{
r_L
=
\frac{m|v_\perp|}{|q|B_0}
}.
$$
>
> 4. $v_\parallel\neq0$ も同時に持つ場合、全軌道は磁場方向へ進む螺旋となる。
<!-- formal-statement-end -->

<!-- proof-start -->
### 証明

まず $z$ 成分を取ります。

$$
m\dot v_z
=
q(v\times B)_z.
$$

$B=B_0e_z$ なので $v\times B$ は $xy$ 平面内にあり、

$$
(v\times B)_z=0.
$$

従って

$$
\dot v_z=0,
$$

すなわち $v_\parallel$ は一定です。

次に命題2より、磁場だけでは全速さ $|v|$ が一定です。また $|v_\parallel|$ も一定なので

$$
|v_\perp|^2
=
|v|^2-|v_\parallel|^2
$$

も一定です。

$xy$ 成分を具体的に書きます。

$$
v=(v_x,v_y,v_z),
\qquad
B=(0,0,B_0).
$$

すると

$$
v\times B
=
(B_0v_y,-B_0v_x,0).
$$

したがって

$$
m\dot v_x
=
qB_0v_y,
$$

$$
m\dot v_y
=
-qB_0v_x.
$$

第1式をもう一度時間微分すると

$$
m\ddot v_x
=
qB_0\dot v_y.
$$

第2式を代入して

$$
m\ddot v_x
=
qB_0
\left(
-\frac{qB_0}{m}v_x
\right),
$$

従って

$$
\ddot v_x
+
\left(
\frac{qB_0}{m}
\right)^2v_x
=
0.
$$

$v_y$ についても同じ角周波数の調和振動方程式を得ます。よって速度ベクトルは $xy$ 平面内で一定の大きさを保ちながら角速度

$$
\omega_c
=
\frac{|q|B_0}{m}
$$

で回転します。

円運動では向心加速度の大きさは

$$
\frac{|v_\perp|^2}{r_L}
$$

です。一方、磁気力の大きさは

$$
|q|\,|v_\perp|B_0.
$$

Newton 方程式の大きさを比較して

$$
m\frac{|v_\perp|^2}{r_L}
=
|q|\,|v_\perp|B_0.
$$

$v_\perp\neq0$ なので $|v_\perp|$ で割ると

$$
\boxed{
r_L
=
\frac{m|v_\perp|}{|q|B_0}
}.
$$

さらに $v_\parallel$ は一定なので、円運動の中心自体が $z$ 方向へ等速に進みます。従って全軌道は螺旋です。
<!-- proof-end -->

正電荷 $q>0$、$B=B_0e_z$、円軌道右端で $v$ が下向きの場合、磁気力は中心向きになります。次の図はこの向き関係だけを示しています。

![一様磁場が紙面手前向きのとき、正電荷の速度は円軌道の接線方向、磁気力 q v×B は中心向きになる](assets/uniform-magnetic-orbit.svg)

### 3.1 初速度から向きを決める例

$q>0$ とし、

$$
v(0)=v_0e_x,
\qquad
v_0>0
$$

とします。

初期時刻では

$$
v\times B
=
v_0B_0(e_x\times e_z)
=
-v_0B_0e_y.
$$

従って加速度は $-e_y$ 方向です。粒子は $+x$ 方向へ進み始めながら下向きに曲がるので、$+z$ 方向から見れば時計回りに回転します。

$q<0$ なら回転向きは逆になりますが、

$$
\omega_c=\frac{|q|B_0}{m},
\qquad
r_L=\frac{m|v_\perp|}{|q|B_0}
$$

の大きさは同じです。

---

## 4. 交差する一様電場・磁場：$E\times B$ ドリフト

次に、一様な電場と磁場が互いに垂直である場合を考えます。

磁場だけなら円運動でした。電場だけなら一定加速度運動です。両方が同時にあると、円運動の中心そのものが一定速度で流れていく運動が現れます。

<a id="prop-emag6-exb-drift"></a>

<!-- formal-statement-start -->
> **命題（交差電場・磁場の E×B ドリフト）**  
> 電荷 $q\neq0$、質量 $m>0$ の粒子に対し、一様な場 $E,B$ が
>
$$
B\neq0,
\qquad
E\cdot B=0
$$
>
> を満たすとする。
>
$$
\boxed{
v_D
=
\frac{E\times B}{|B|^2}
}
$$
>
> と置き、
>
$$
u=v-v_D
$$
>
> とすると、$u$ は
>
$$
\boxed{
m\dot u
=
q\,u\times B
}
$$
>
> を満たす。したがって運動は、一様磁場中の回転運動に一定速度 $v_D$ の並進を重ねたものになる。$v_D$ は $q$ と $m$ に依らない。
<!-- formal-statement-end -->

<!-- proof-start -->
### 証明

$v_D$ は一定ベクトルなので

$$
\dot u=\dot v.
$$

Lorentz 方程式へ

$$
v=u+v_D
$$

を代入すると

$$
m\dot u
=
q
\left[
E+(u+v_D)\times B
\right].
$$

右辺を分けて

$$
m\dot u
=
q
\left[
E+u\times B+v_D\times B
\right].
$$

ここで

$$
v_D
=
\frac{E\times B}{|B|^2}
$$

だから、ベクトル三重積

$$
(A\times B)\times C
=
B(A\cdot C)-A(B\cdot C)
$$

を使って

$$
\begin{aligned}
v_D\times B
&=
\frac{(E\times B)\times B}{|B|^2}\\
&=
\frac{
B(E\cdot B)-E(B\cdot B)
}{
|B|^2
}.
\end{aligned}
$$

仮定 $E\cdot B=0$ と $B\cdot B=|B|^2$ から

$$
v_D\times B
=
-E.
$$

したがって

$$
E+v_D\times B=0.
$$

ゆえに

$$
\boxed{
m\dot u
=
q\,u\times B
}.
$$

これは一様磁場だけの場合と同じ方程式です。よって $u$ は磁場に垂直な面内で回転し、元の速度 $v=u+v_D$ はその回転に一定ドリフト速度を加えたものになります。
<!-- proof-end -->

### 4.1 座標で確認する

$$
E=E_0e_x,
\qquad
B=B_0e_z,
\qquad
E_0>0,\ B_0>0
$$

とします。

すると

$$
E\times B
=
E_0B_0(e_x\times e_z)
=
-E_0B_0e_y.
$$

従って

$$
\boxed{
v_D
=
-\frac{E_0}{B_0}e_y
}.
$$

確認として

$$
v_D\times B
=
\left(
-\frac{E_0}{B_0}e_y
\right)
\times
(B_0e_z)
=
-E_0e_x
=
-E
$$

です。したがってドリフト速度で移動する座標系から見ると、電場項がちょうど打ち消されます。

$E\times B$ ドリフトの向きが正電荷と負電荷で同じになることは重要です。電荷符号は回転方向を変えますが、ドリフト速度そのものには入りません。

---

## 5. 力の式をポテンシャルから作れるか

ここまでは Lorentz 力を Newton 方程式へ直接入れました。

解析力学では別の問いを立てます。

> **電磁場中の運動も、一つの ラグランジアン から Euler--Lagrange 方程式として得られるか。**

静電場では EMAG3 で

$$
E=-\nabla\phi
$$

を学び、EMAG5 では磁場に対して

$$
B=\nabla\times A
$$

というベクトルポテンシャルを導入しました。

時間依存も許す滑らかなスカラーポテンシャル $\phi(t,r)$ とベクトルポテンシャル $A(t,r)$ を使い、本節では

$$
\boxed{
E
=
-\nabla\phi
-
\partial_tA
},
\qquad
\boxed{
B
=
\nabla\times A
}
$$

と置きます。

この $E$ の形が Maxwell 方程式、とくに Faraday の法則からどのように現れるかは EMAG7 で扱います。本章では、この形で与えられた場に対して粒子運動を計算します。

---

## 6. 電磁場中の ラグランジアン

自由粒子なら ラグランジアン は

$$
L_0
=
\frac12m|v|^2
$$

です。

静電ポテンシャルエネルギーは $q\phi$ なので、電場だけなら

$$
L
=
\frac12m|v|^2-q\phi
$$

です。

磁場を入れるには、速度に一次の項

$$
qA\cdot v
$$

を加えます。

<a id="def-emag6-charged-particle-lagrangian"></a>

<!-- formal-statement-start -->
> **定義（電磁場中の荷電粒子の ラグランジアン）**  
> 電荷 $q$、質量 $m>0$ の粒子について、滑らかなスカラーポテンシャル $\phi(t,r)$ とベクトルポテンシャル $A(t,r)$ が与えられているとする。直交座標 $r=(x_1,x_2,x_3)$、速度 $v=\dot r$ に対して
>
$$
\boxed{
L(r,v,t)
=
\frac12m|v|^2
+
qA(t,r)\cdot v
-
q\phi(t,r)
}
$$
>
> を、電磁場中の荷電粒子の ラグランジアン と呼ぶ。
<!-- formal-statement-end -->

<!-- definition-example-start: def-emag6-charged-particle-lagrangian -->
### 例：一様磁場の対称ゲージ

**定義の確認**

$$
B=B_0e_z
$$

に対して

$$
A(x,y,z)
=
\frac{B_0}{2}
(-y,x,0),
\qquad
\phi=0
$$

とします。

まず

$$
\nabla\times A
=
(0,0,B_0)
=
B
$$

です。

したがって

$$
A\cdot v
=
\frac{B_0}{2}
(-y\dot x+x\dot y).
$$

ラグランジアン は

$$
\boxed{
L
=
\frac{m}{2}
\left(
\dot x^2+\dot y^2+\dot z^2
\right)
+
\frac{qB_0}{2}
(-y\dot x+x\dot y)
}.
$$

磁場はポテンシャルエネルギーのような位置だけの項ではなく、速度に一次の項として現れます。
<!-- definition-example-end -->

<a id="thm-emag6-lagrangian-lorentz"></a>

<!-- formal-statement-start -->
> **定理（電磁場中の ラグランジアン と Lorentz 力）**  
> $\phi(t,r)$ と $A(t,r)$ を必要な偏微分が連続な関数とし、
>
$$
E=-\nabla\phi-\partial_tA,
\qquad
B=\nabla\times A
$$
>
> と置く。ラグランジアン
>
$$
L(r,v,t)
=
\frac12m|v|^2
+
qA(t,r)\cdot v
-
q\phi(t,r)
$$
>
> に対する Euler--Lagrange 方程式は
>
$$
\boxed{
m\dot v
=
q(E+v\times B)
}
$$
>
> すなわち Lorentz 力の運動方程式と一致する。
<!-- formal-statement-end -->

### 証明の見取り図

直交座標の第 $i$ 成分について

$$
\frac{\partial L}{\partial v_i}
$$

と

$$
\frac{\partial L}{\partial x_i}
$$

を別々に計算します。

速度微分から $m v_i+qA_i$ が出ます。時間微分すると $A_i(t,r(t))$ に連鎖律が働き、

$$
\partial_tA_i
+
\sum_jv_j\partial_jA_i
$$

が現れます。

一方、位置微分から

$$
\sum_jv_j\partial_iA_j
$$

が出ます。この二つの差が、ちょうど $v\times(\nabla\times A)$ になります。

<!-- proof-start -->
### 証明

直交座標を

$$
r=(x_1,x_2,x_3),
\qquad
v=(v_1,v_2,v_3)
$$

と書きます。

ラグランジアン は

$$
L
=
\frac12m\sum_{j=1}^3v_j^2
+
q\sum_{j=1}^3A_j(t,r)v_j
-
q\phi(t,r)
$$

です。

まず速度 $v_i$ で偏微分すると

$$
\frac{\partial L}{\partial v_i}
=
mv_i+qA_i.
$$

軌道に沿って時間微分します。

$$
\begin{aligned}
\frac{d}{dt}
\frac{\partial L}{\partial v_i}
&=
m\dot v_i
+
q\frac{d}{dt}A_i(t,r(t))\\
&=
m\dot v_i
+
q\partial_tA_i
+
q\sum_{j=1}^3
v_j\partial_jA_i.
\end{aligned}
$$

次に位置 $x_i$ で偏微分します。

運動エネルギー項は $x_i$ に依存しないので

$$
\frac{\partial}{\partial x_i}
\left(
\frac12m|v|^2
\right)
=
0.
$$

従って

$$
\frac{\partial L}{\partial x_i}
=
q\sum_{j=1}^3
v_j\partial_iA_j
-
q\partial_i\phi.
$$

Euler--Lagrange 方程式

$$
\frac{d}{dt}
\frac{\partial L}{\partial v_i}
-
\frac{\partial L}{\partial x_i}
=
0
$$

へ代入すると

$$
\begin{aligned}
0
&=
m\dot v_i
+
q\partial_tA_i
+
q\sum_jv_j\partial_jA_i\\
&\quad
-
q\sum_jv_j\partial_iA_j
+
q\partial_i\phi.
\end{aligned}
$$

移項して

$$
m\dot v_i
=
q
\left[
-\partial_i\phi
-\partial_tA_i
+
\sum_j
v_j
\left(
\partial_iA_j-\partial_jA_i
\right)
\right].
$$

ここで

$$
E_i
=
-\partial_i\phi-\partial_tA_i.
$$

また $B=\nabla\times A$ だから、ベクトル積の成分表示から

$$
(v\times B)_i
=
\sum_j
v_j
\left(
\partial_iA_j-\partial_jA_i
\right).
$$

したがって

$$
m\dot v_i
=
q
\left[
E_i+(v\times B)_i
\right].
$$

$i=1,2,3$ のすべてで成り立つので

$$
\boxed{
m\dot v
=
q(E+v\times B)
}.
$$
<!-- proof-end -->

この証明で重要なのは、磁気力が「位置だけのポテンシャルエネルギー」から出てきたのではなく、$A\cdot v$ という**速度依存項**から出てきたことです。

---

## 7. 正準運動量と力学的運動量は違う

AMECH4 では一般化運動量を

$$
p_j
=
\frac{\partial L}{\partial\dot q_j}
$$

と定義しました。

直交座標 $r=(x_1,x_2,x_3)$ を一般化座標として使うと、電磁場中では次の形になります。

<a id="prop-emag6-canonical-momentum"></a>

<!-- formal-statement-start -->
> **命題（電磁場中の正準運動量）**  
> 電磁場中の荷電粒子の ラグランジアン
>
$$
L(r,v,t)
=
\frac12m|v|^2
+
qA(t,r)\cdot v
-
q\phi(t,r)
$$
>
> に対し、直交座標 $x_i$ に共役な正準運動量は
>
$$
\boxed{
p_i
=
\frac{\partial L}{\partial v_i}
=
mv_i+qA_i
}
$$
>
> である。ベクトルとして
>
$$
\boxed{
p
=
mv+qA
}
$$
>
> と書ける。従って力学的運動量 $mv$ は
>
$$
\boxed{
mv=p-qA
}
$$
>
> である。
<!-- formal-statement-end -->

<!-- proof-start -->
### 証明

定義から

$$
p_i
=
\frac{\partial L}{\partial v_i}.
$$

各項を $v_i$ で偏微分すると

$$
\frac{\partial}{\partial v_i}
\left(
\frac12m\sum_jv_j^2
\right)
=
mv_i,
$$

$$
\frac{\partial}{\partial v_i}
\left(
q\sum_jA_jv_j
\right)
=
qA_i,
$$

$$
\frac{\partial}{\partial v_i}
(-q\phi)
=
0.
$$

従って

$$
p_i=mv_i+qA_i.
$$

3成分をまとめれば

$$
p=mv+qA.
$$

両辺から $qA$ を引いて

$$
mv=p-qA.
$$
<!-- proof-end -->

自由粒子では $A=0$ なので $p=mv$ です。ところが電磁場中では、正準運動量にはベクトルポテンシャルの寄与が入ります。

この違いは後に量子力学で

$$
p
\longmapsto
p-qA
$$

という形で現れる最小結合の古典的な出発点になります。

---

## 8. ゲージ変換で何が変わり、何が変わらないか

EMAG5 では

$$
A\mapsto A+\nabla\chi
$$

としても磁場 $B=\nabla\times A$ が変わらないことを見ました。

時間依存も許すときは、スカラーポテンシャルも同時に

$$
A'
=
A+\nabla\chi,
$$

$$
\phi'
=
\phi-\partial_t\chi
$$

と変えます。

まず磁場は

$$
\begin{aligned}
B'
&=
\nabla\times A'\\
&=
\nabla\times A
+
\nabla\times(\nabla\chi)\\
&=
B.
\end{aligned}
$$

次に電場は

$$
\begin{aligned}
E'
&=
-\nabla\phi'
-\partial_tA'\\
&=
-\nabla
\left(
\phi-\partial_t\chi
\right)
-
\partial_t
\left(
A+\nabla\chi
\right)\\
&=
-\nabla\phi
+
\nabla(\partial_t\chi)
-
\partial_tA
-
\partial_t(\nabla\chi).
\end{aligned}
$$

必要な偏微分が連続なら

$$
\nabla(\partial_t\chi)
=
\partial_t(\nabla\chi)
$$

なので打ち消し合い、

$$
E'=E.
$$

したがって $E,B$ は変わりません。

では ラグランジアン はどうなるでしょうか。

$$
\begin{aligned}
L'
&=
\frac12m|v|^2
+
qA'\cdot v
-
q\phi'\\
&=
L
+
q\nabla\chi\cdot v
+
q\partial_t\chi.
\end{aligned}
$$

軌道に沿う全時間微分は

$$
\frac{d\chi}{dt}
=
\partial_t\chi
+
\nabla\chi\cdot v
$$

だから

$$
\boxed{
L'
=
L
+
q\frac{d\chi}{dt}
}.
$$

[AMECH3 の全時間微分を加えた ラグランジアン の同値性](../AMECH3/index.md#prop-amech3-total-derivative)より、$L$ と $L'$ は同じ Euler--Lagrange 方程式を与えます。

一方、正準運動量は

$$
p'
=
mv+qA'
=
p+q\nabla\chi
$$

と変わります。

つまり

- 観測される場 $E,B$ は変わらない
- 力学的運動量 $mv$ も変わらない
- 正準運動量 $p$ はゲージに依存する
- しかし組合せ $p-qA=mv$ はゲージに依存しない

という区別が必要です。

---

## 9. 本章でつながった二つの見方

Newton 力学からは

$$
m\dot v
=
q(E+v\times B)
$$

を直接使いました。

解析力学からは

$$
L
=
\frac12m|v|^2
+
qA\cdot v
-
q\phi
$$

を出発点にして、Euler--Lagrange 方程式から同じ式を得ました。

この二つは競合する記述ではありません。

前者は「粒子にどんな力が働くか」を直接見る方法です。後者は「場との結合を ラグランジアン の中へどう組み込むか」を見る方法です。

次章 EMAG7 では、粒子に与えられた場を使う側から、場そのものが時間発展する側へ進みます。Faraday の法則と変位電流を含め、四つの Maxwell 方程式を一つの体系として読み直します。

---

# 演習

## Level A

### A1. Lorentz 力の向き

正電荷 $q>0$ が

$$
v=v_0e_x,
\qquad
v_0>0
$$

で運動し、一様磁場

$$
B=B_0e_z,
\qquad
B_0>0
$$

がある。電場は $E=0$ とする。

1. $v\times B$ を求めよ。
2. 磁気力の向きを答えよ。
3. 電荷を $-q$ に変えたとき力の向きがどう変わるか答えよ。

- Level: A

<!-- solution-start -->
#### 詳細解答

右手系では

$$
e_x\times e_z=-e_y
$$

なので

$$
\begin{aligned}
v\times B
&=
v_0e_x\times B_0e_z\\
&=
v_0B_0(e_x\times e_z)\\
&=
-v_0B_0e_y.
\end{aligned}
$$

したがって正電荷に働く磁気力は

$$
F_B
=
qv\times B
=
-qv_0B_0e_y.
$$

よって向きは

$$
\boxed{-e_y}.
$$

電荷を $-q$ に変えると

$$
F_B'
=
(-q)v\times B
=
-F_B
$$

なので向きは反転し、

$$
\boxed{+e_y}
$$

です。
<!-- solution-end -->

### A2. 磁場だけでは速さが変わらないことを直接確認する

$E=0$ のもとで

$$
m\dot v=qv\times B
$$

とする。

1. $\dfrac{d}{dt}|v|^2$ を求めよ。
2. $|v|$ が一定であることを示せ。
3. それでも速度ベクトル $v$ 自体は変化し得る理由を説明せよ。

- Level: A

<!-- solution-start -->
#### 詳細解答

まず

$$
|v|^2=v\cdot v
$$

だから

$$
\frac{d}{dt}|v|^2
=
2v\cdot\dot v.
$$

運動方程式から

$$
\dot v
=
\frac{q}{m}v\times B
$$

なので

$$
\frac{d}{dt}|v|^2
=
\frac{2q}{m}
v\cdot(v\times B).
$$

ベクトル積 $v\times B$ は $v$ に垂直だから

$$
v\cdot(v\times B)=0.
$$

従って

$$
\boxed{
\frac{d}{dt}|v|^2=0
}.
$$

よって $|v|^2$、したがって $|v|$ は一定です。

ただし

$$
\dot v
=
\frac{q}{m}v\times B
$$

は一般には 0 ではありません。$\dot v$ が $v$ に垂直であるため、大きさを変えずに**向きだけ**を変えることができます。円運動がその典型です。
<!-- solution-end -->

### A3. cyclotron 角周波数と Larmor 半径

陽子を一様磁場

$$
B=B_0e_z
$$

へ垂直に速さ $v_0$ で入射させる。陽子の電荷を $e>0$、質量を $m_p$ とする。

1. cyclotron 角周波数を求めよ。
2. Larmor 半径を求めよ。
3. $B_0$ を2倍にしたとき、それぞれどう変化するか答えよ。

- Level: A

<!-- solution-start -->
#### 詳細解答

磁場に垂直な速度は

$$
|v_\perp|=v_0
$$

です。

[一様磁場中の荷電粒子運動](#prop-emag6-uniform-magnetic-motion)から

$$
\boxed{
\omega_c
=
\frac{eB_0}{m_p}
}.
$$

また

$$
\boxed{
r_L
=
\frac{m_pv_0}{eB_0}
}.
$$

$B_0$ を $2B_0$ に変えると

$$
\omega_c'
=
\frac{e(2B_0)}{m_p}
=
2\omega_c,
$$

一方

$$
r_L'
=
\frac{m_pv_0}{e(2B_0)}
=
\frac12r_L.
$$

従って磁場を強くすると回転は速くなり、軌道半径は小さくなります。
<!-- solution-end -->

### A4. $E\times B$ ドリフトの向き

$$
E=E_0e_x,
\qquad
B=B_0e_z,
\qquad
E_0>0,\ B_0>0
$$

とする。

1. $E\times B$ を求めよ。
2. ドリフト速度 $v_D$ を求めよ。
3. $v_D\times B=-E$ を直接確認せよ。

- Level: A

<!-- solution-start -->
#### 詳細解答

まず

$$
e_x\times e_z=-e_y
$$

なので

$$
E\times B
=
-E_0B_0e_y.
$$

従って

$$
v_D
=
\frac{E\times B}{|B|^2}
=
\frac{-E_0B_0e_y}{B_0^2}
=
\boxed{
-\frac{E_0}{B_0}e_y
}.
$$

さらに

$$
\begin{aligned}
v_D\times B
&=
\left(
-\frac{E_0}{B_0}e_y
\right)
\times
(B_0e_z)\\
&=
-E_0(e_y\times e_z)\\
&=
-E_0e_x\\
&=
-E.
\end{aligned}
$$

確かに

$$
\boxed{
v_D\times B=-E
}
$$

です。
<!-- solution-end -->

## Level B

### B1. 一様磁場中の軌道を成分から解く

$q>0$ の粒子について

$$
B=B_0e_z,
\qquad
E=0,
$$

$$
r(0)=0,
\qquad
v(0)=v_0e_x,
\qquad
v_0>0
$$

とする。

$$
\omega=\frac{qB_0}{m}
$$

と置き、次を示せ。

1. 速度が
   $$
   v_x(t)=v_0\cos\omega t,
   \qquad
   v_y(t)=-v_0\sin\omega t,
   \qquad
   v_z(t)=0
   $$
   となることを示せ。
2. 位置を求めよ。
3. 軌道が半径 $v_0/\omega$ の円であることを示せ。

- Level: B

<!-- solution-start -->
#### 詳細解答

運動方程式は

$$
m\dot v
=
qv\times B.
$$

$B=B_0e_z$ だから

$$
v\times B
=
(B_0v_y,-B_0v_x,0).
$$

従って

$$
\dot v_x
=
\omega v_y,
$$

$$
\dot v_y
=
-\omega v_x,
$$

$$
\dot v_z=0.
$$

$v_x$ を時間微分すると

$$
\ddot v_x
=
\omega\dot v_y
=
-\omega^2v_x.
$$

初期条件は

$$
v_x(0)=v_0,
\qquad
\dot v_x(0)=\omega v_y(0)=0.
$$

よって

$$
\boxed{
v_x(t)=v_0\cos\omega t
}.
$$

第1式

$$
\dot v_x=\omega v_y
$$

へ代入すると

$$
-\omega v_0\sin\omega t
=
\omega v_y,
$$

従って

$$
\boxed{
v_y(t)=-v_0\sin\omega t
}.
$$

また $v_z(0)=0$ と $\dot v_z=0$ から

$$
v_z(t)=0.
$$

次に位置を積分します。

$$
x(t)
=
\int_0^t
v_0\cos\omega s\,ds
=
\frac{v_0}{\omega}
\sin\omega t.
$$

また

$$
\begin{aligned}
y(t)
&=
\int_0^t
-v_0\sin\omega s\,ds\\
&=
\frac{v_0}{\omega}
\left(
\cos\omega t-1
\right).
\end{aligned}
$$

したがって

$$
\boxed{
x(t)
=
\frac{v_0}{\omega}\sin\omega t
},
$$

$$
\boxed{
y(t)
=
\frac{v_0}{\omega}
(\cos\omega t-1)
}.
$$

ここで

$$
R=\frac{v_0}{\omega}
$$

と置くと

$$
x=R\sin\omega t,
$$

$$
y+R=R\cos\omega t.
$$

二式を二乗して足すと

$$
x^2+(y+R)^2
=
R^2
\left(
\sin^2\omega t+\cos^2\omega t
\right)
=
R^2.
$$

従って軌道は中心 $(0,-R)$、半径

$$
\boxed{
R=\frac{v_0}{\omega}
=
\frac{mv_0}{qB_0}
}
$$

の円です。
<!-- solution-end -->

### B2. 螺旋運動のピッチ

一様磁場

$$
B=B_0e_z
$$

中で、粒子の初速度が

$$
v(0)=v_\perp e_x+v_\parallel e_z
$$

であるとする。$v_\perp>0$、$v_\parallel$ は任意の実数とする。

1. 一回転に要する時間 $T_c$ を求めよ。
2. 一回転の間に $z$ 方向へ進む距離、すなわち螺旋のピッチ $h$ を求めよ。
3. 電荷の符号を反転したとき、$T_c$ と $h$ の大きさが変わるか答えよ。

- Level: B

<!-- solution-start -->
#### 詳細解答

cyclotron 角周波数の大きさは

$$
\omega_c
=
\frac{|q|B_0}{m}.
$$

角周波数と周期の関係は

$$
\omega_c
=
\frac{2\pi}{T_c}
$$

なので

$$
\boxed{
T_c
=
\frac{2\pi m}{|q|B_0}
}.
$$

磁場に平行な速度成分 $v_\parallel$ は一定です。従って一周期 $T_c$ の間に $z$ 方向へ進む変位は

$$
h
=
v_\parallel T_c.
$$

したがって向きを含めれば

$$
\boxed{
h
=
\frac{2\pi m v_\parallel}{|q|B_0}
}.
$$

ピッチの長さは

$$
|h|
=
\frac{2\pi m |v_\parallel|}{|q|B_0}.
$$

電荷の符号を反転しても $|q|$ は変わらないので、$T_c$ と $|h|$ は変わりません。

変わるのは磁場に垂直な面内での回転方向です。
<!-- solution-end -->

### B3. ゲージ変換と正準運動量

滑らかな関数 $\chi(t,r)$ に対して

$$
A'=A+\nabla\chi,
$$

$$
\phi'=\phi-\partial_t\chi
$$

とする。

1. $B'=\nabla\times A'$ が $B$ と等しいことを示せ。
2. $E'=-\nabla\phi'-\partial_tA'$ が $E$ と等しいことを示せ。
3. ラグランジアン の差が
   $$
   L'-L
   =
   q\frac{d\chi}{dt}
   $$
   となることを示せ。
4. 正準運動量の変換則を求め、$p-qA$ が不変であることを確認せよ。

- Level: B

<!-- solution-start -->
#### 詳細解答

まず

$$
\begin{aligned}
B'
&=
\nabla\times A'\\
&=
\nabla\times(A+\nabla\chi)\\
&=
\nabla\times A
+
\nabla\times(\nabla\chi).
\end{aligned}
$$

勾配の回転は 0 なので

$$
\boxed{
B'=B
}.
$$

次に

$$
\begin{aligned}
E'
&=
-\nabla\phi'
-\partial_tA'\\
&=
-\nabla
\left(
\phi-\partial_t\chi
\right)
-
\partial_t
\left(
A+\nabla\chi
\right)\\
&=
-\nabla\phi
+
\nabla(\partial_t\chi)
-
\partial_tA
-
\partial_t(\nabla\chi).
\end{aligned}
$$

混合偏微分を交換できる正則性の下で

$$
\nabla(\partial_t\chi)
=
\partial_t(\nabla\chi)
$$

だから

$$
\boxed{
E'=E
}.
$$

ラグランジアン は

$$
L
=
\frac12m|v|^2+qA\cdot v-q\phi
$$

なので

$$
\begin{aligned}
L'-L
&=
q(A'-A)\cdot v
-
q(\phi'-\phi)\\
&=
q\nabla\chi\cdot v
+
q\partial_t\chi.
\end{aligned}
$$

軌道に沿って

$$
\frac{d\chi}{dt}
=
\partial_t\chi+\nabla\chi\cdot v
$$

だから

$$
\boxed{
L'-L
=
q\frac{d\chi}{dt}
}.
$$

最後に

$$
p=mv+qA
$$

なので

$$
\begin{aligned}
p'
&=
mv+qA'\\
&=
mv+qA+q\nabla\chi\\
&=
\boxed{
p+q\nabla\chi
}.
\end{aligned}
$$

しかし

$$
\begin{aligned}
p'-qA'
&=
(p+q\nabla\chi)
-
q(A+\nabla\chi)\\
&=
p-qA.
\end{aligned}
$$

従って

$$
\boxed{
p'-qA'=p-qA=mv
}
$$

であり、力学的運動量はゲージ変換で不変です。
<!-- solution-end -->

## Level C

### C1. 交差場の運動をドリフト座標へ分解する

一様な場

$$
E=E_0e_x,
\qquad
B=B_0e_z,
\qquad
E_0>0,\ B_0>0
$$

中を、電荷 $q\neq0$、質量 $m>0$ の粒子が運動する。

$$
v_D
=
-\frac{E_0}{B_0}e_y,
$$

$$
u=v-v_D
$$

と置く。

1. $u$ が
   $$
   m\dot u=q\,u\times B
   $$
   を満たすことを示せ。
2. $u$ の大きさが一定であることを示せ。
3. $u_\perp$ の回転角周波数と Larmor 半径を求めよ。
4. 元の運動が「円運動の中心が $v_D$ で移動する運動」になることを説明せよ。
5. 正電荷と負電荷で、何が同じで何が反転するか整理せよ。

- Level: C

<!-- solution-start -->
#### 詳細解答

まず $v_D$ は一定なので

$$
\dot u=\dot v.
$$

Lorentz 方程式は

$$
m\dot v
=
q(E+v\times B)
$$

です。

$v=u+v_D$ を代入すると

$$
m\dot u
=
q
\left(
E+u\times B+v_D\times B
\right).
$$

ここで

$$
v_D
=
-\frac{E_0}{B_0}e_y
$$

なので

$$
\begin{aligned}
v_D\times B
&=
\left(
-\frac{E_0}{B_0}e_y
\right)
\times
(B_0e_z)\\
&=
-E_0e_x\\
&=
-E.
\end{aligned}
$$

従って電場項が消えて

$$
\boxed{
m\dot u=q\,u\times B
}.
$$

次に

$$
\frac{d}{dt}|u|^2
=
2u\cdot\dot u.
$$

運動方程式を使うと

$$
\frac{d}{dt}|u|^2
=
\frac{2q}{m}
u\cdot(u\times B)
=
0.
$$

よって

$$
\boxed{
|u|=\text{一定}
}.
$$

$u$ は一様磁場だけの運動と同じ方程式に従います。従って磁場に垂直な成分 $u_\perp$ は角周波数

$$
\boxed{
\omega_c
=
\frac{|q|B_0}{m}
}
$$

で回転します。

$u_\perp\neq0$ なら、その円運動の半径は

$$
\boxed{
r_L
=
\frac{m|u_\perp|}{|q|B_0}
}.
$$

元の速度は

$$
v=u+v_D
$$

です。

したがって位置も

$$
r(t)
=
r_{\mathrm{gyro}}(t)
+
v_Dt
+
\text{定数}
$$

という形に分解できます。$r_{\mathrm{gyro}}(t)$ は磁場に垂直な円運動を含み、その円の中心が一定速度 $v_D$ で移動します。

最後に電荷符号を反転すると、

- $v_D=-E_0e_y/B_0$ は $q$ を含まないので変わらない。
- $\omega_c=|q|B_0/m$ の大きさは変わらない。
- $r_L=m|u_\perp|/(|q|B_0)$ も同じ。
- しかし $q\,u\times B$ の符号が反転するため、回転方向は反転する。

従って

$$
\boxed{
\text{ドリフト方向は同じで、旋回方向だけが反転する}
}
$$

というのが正電荷と負電荷の違いです。
<!-- solution-end -->
