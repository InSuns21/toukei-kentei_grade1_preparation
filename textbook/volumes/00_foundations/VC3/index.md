# VC3 曲面・向き・曲面積分・flux

VC2 では 1 次元の曲線に沿う積分を作りました。VC3 では 2 変数のパラメータで $\mathbb R^3$ 内の曲面を記述し、

- 接平面
- 法線
- 面積要素
- scalar surface integral
- flux integral

を順に構成します。

多重積分と変数変換は [RA7](../RA7/index.md) を正本とし、本章では「パラメータ平面の小面積が空間内でどれだけ引き伸ばされるか」に集中します。

---

## 1. 正則なパラメータ曲面

<a id="def-vc3-regular-surface"></a>

<!-- formal-statement-start -->
> **定義（正則パラメータ曲面）**  
> $U\subset\mathbb R^2$ を開集合とし、
>
> $$
> r:U\to\mathbb R^3,
> \qquad
> r(u,v)=(x(u,v),y(u,v),z(u,v))
> $$
>
> を $C^1$ 写像とする。すべての $(u,v)\in U$ で
>
> $$
> r_u(u,v)\times r_v(u,v)\neq0
> $$
>
> なら、$r$ を正則パラメータ曲面と呼ぶ。
<!-- formal-statement-end -->

<!-- definition-example-start: def-vc3-regular-surface -->
**定義の確認：球面 patch**

単位球面のうち極を除く部分を

$$
r(\theta,\varphi)
=
(\sin\varphi\cos\theta,\,
 \sin\varphi\sin\theta,\,
 \cos\varphi),
$$

$$
0<\varphi<\pi
$$

で表します。

$$
r_\theta
=
(-\sin\varphi\sin\theta,\,
 \sin\varphi\cos\theta,\,
 0),
$$

$$
r_\varphi
=
(\cos\varphi\cos\theta,\,
 \cos\varphi\sin\theta,\,
 -\sin\varphi).
$$

この二つは $0<\varphi<\pi$ で一次独立なので正則です。極でこの座標が退化することは、球面そのものの特異性ではなくパラメータ表示の特異性です。
<!-- definition-example-end -->

---

## 2. 接平面と法線

曲面上の点

$$
p=r(u_0,v_0)
$$

を通る曲線を、パラメータ領域の曲線

$$
(u(t),v(t))
$$

から

$$
\gamma(t)=r(u(t),v(t))
$$

として作ると、連鎖律より

$$
\gamma'(0)
=
r_u\,u'(0)+r_v\,v'(0).
$$

したがって接方向は $r_u,r_v$ の線形結合です。

<a id="def-vc3-tangent-normal"></a>

<!-- formal-statement-start -->
> **定義（接平面・法線）**  
> 正則パラメータ曲面 $r$ の点 $p=r(u_0,v_0)$ における接平面の方向空間を
>
> $$
> \operatorname{span}\{r_u(u_0,v_0),r_v(u_0,v_0)\}
> $$
>
> とする。
>
> その法線方向は
>
> $$
> r_u\times r_v
> $$
>
> で与えられ、対応する単位法線を
>
> $$
> n
> =
> \frac{r_u\times r_v}{|r_u\times r_v|}
> $$
>
> とする。
<!-- formal-statement-end -->

<!-- definition-example-start: def-vc3-tangent-normal -->
**定義の確認**

平面

$$
r(u,v)=(u,v,u+v)
$$

では

$$
r_u=(1,0,1),
\qquad
r_v=(0,1,1),
$$

なので

$$
r_u\times r_v=(-1,-1,1).
$$

この vector は $r_u,r_v$ の双方との内積が 0 で、接平面に直交する法線を実際に与えます。
<!-- definition-example-end -->

順序を入れ替えると

$$
r_v\times r_u
=
-(r_u\times r_v)
$$

なので法線の向きが反転します。

---

## 3. 向き付け可能性

<a id="def-vc3-orientable"></a>

<!-- formal-statement-start -->
> **定義（向き付け可能な曲面）**  
> 曲面 $S$ が向き付け可能であるとは、曲面全体で連続に選べる単位法線場
>
> $$
> n:S\to\mathbb R^3
> $$
>
> が存在することをいう。そのような $n$ の選択を曲面の向きと呼ぶ。
<!-- formal-statement-end -->

<!-- definition-example-start: def-vc3-orientable -->
**定義の確認**

球面では

$$
n(x)=\frac{x}{|x|}
$$

と取れば連続な外向き法線になります。したがって球面は向き付け可能です。

一方、Möbius strip では一周すると局所法線が反転して戻るため、全体で連続な単位法線を選べません。本章ではこの反例の位相的分類までは行いません。
<!-- definition-example-end -->

閉曲面では、球面や直方体境界のように「内部」と「外部」が明確な場合、外向き法線を標準の向きとします。

---

## 4. 面積要素

小さなパラメータ長方形

$$
[u,u+du]\times[v,v+dv]
$$

は一次近似で、空間内の平行四辺形

$$
r_u\,du,\qquad r_v\,dv
$$

へ移ります。その面積は

$$
|r_u\times r_v|\,du\,dv
$$

です。

<a id="def-vc3-area-element"></a>

<!-- formal-statement-start -->
> **定義（曲面積要素）**  
> 正則パラメータ曲面 $r:U\to S$ に対し
>
> $$
> dS
> =
> |r_u\times r_v|\,du\,dv
> $$
>
> と定義する。
<!-- formal-statement-end -->

従って曲面積は

$$
\operatorname{Area}(S)
=
\iint_U
|r_u\times r_v|\,du\,dv.
$$

---

## 5. パラメータを変えても面積は変わらない

<a id="thm-vc3-area-invariance"></a>

<!-- formal-statement-start -->
> **定理（曲面積要素の再パラメータ表示不変性）**  
> $r:U\to S$ を正則パラメータ表示とし、
>
> $$
> \psi:\widetilde U\to U
> $$
>
> を $C^1$ 微分同相とする。$\widetilde r=r\circ\psi$ と置くと
>
> $$
> |\widetilde r_s\times\widetilde r_t|
> =
> |r_u\times r_v|\,
> |\det D\psi|.
> $$
>
> 従って [RA7 の変数変換定理](../RA7/index.md#thm-ra7-change-of-variables) と合わせて曲面積はパラメータ表示に依存しない。
<!-- formal-statement-end -->

### 証明の見取り図

連鎖律で $\widetilde r_s,\widetilde r_t$ を $r_u,r_v$ の線形結合に書きます。二つの線形結合の cross product では係数行列の determinant が前に出ます。

<!-- proof-start -->
### 証明

$$
\psi(s,t)=(u(s,t),v(s,t))
$$

とします。連鎖律より

$$
\widetilde r_s
=
r_u u_s+r_v v_s,
$$

$$
\widetilde r_t
=
r_u u_t+r_v v_t.
$$

cross product の双線形性と $a\times a=0$ から

$$
\begin{aligned}
\widetilde r_s\times\widetilde r_t
&=
(u_sv_t-v_su_t)(r_u\times r_v)\\
&=
\det D\psi\,(r_u\times r_v).
\end{aligned}
$$

従って絶対値を取れば

$$
|\widetilde r_s\times\widetilde r_t|
=
|\det D\psi|\,
|r_u\times r_v|.
$$

あとは RA7 の変数変換公式を適用すれば、面積積分の値は一致します。
<!-- proof-end -->

---

## 6. scalar surface integral

<a id="def-vc3-scalar-surface-integral"></a>

<!-- formal-statement-start -->
> **定義（scalar surface integral）**  
> 連続 scalar field $f$ と正則パラメータ曲面 $r:U\to S$ に対し
>
> $$
> \int_S f\,dS
> :=
> \iint_U
> f(r(u,v))
> |r_u\times r_v|\,du\,dv
> $$
>
> と定義する。
<!-- formal-statement-end -->

$f=1$ なら曲面積そのものです。

---

## 7. 向き付き面素と flux

向きを選ぶと絶対値を外して vector-valued area element を使えます。

<a id="def-vc3-oriented-area-flux"></a>

<!-- formal-statement-start -->
> **定義（向き付き面素・flux）**  
> 向き付き曲面 $S$ の局所パラメータ表示 $r(u,v)$ が選択した向きと整合しているとする。
>
> $$
> n\,dS
> =
> (r_u\times r_v)\,du\,dv
> $$
>
> と置く。
>
> 連続 vector field $F$ の $S$ を通る flux を
>
> $$
> \int_S F\cdot n\,dS
> :=
> \iint_U
> F(r(u,v))\cdot(r_u\times r_v)\,du\,dv
> $$
>
> と定義する。
<!-- formal-statement-end -->

<!-- definition-example-start: def-vc3-oriented-area-flux -->
**定義の確認：平面を通る一定場**

$$
r(u,v)=(u,v,0),
\qquad
0\le u\le a,\ 0\le v\le b
$$

とし、上向きに取ります。

$$
r_u\times r_v=(0,0,1).
$$

一定場 $F=(0,0,c)$ なら

$$
\int_SF\cdot n\,dS
=
\int_0^a\int_0^b c\,dv\,du
=
cab.
$$

「法線方向成分 $c$ × 面積 $ab$」と一致します。
<!-- definition-example-end -->

向きを反転すると $n$ が $-n$ になるので flux の符号は反転します。

---

## 8. graph surface の公式

$$
S=\{(x,y,g(x,y)):(x,y)\in D\}
$$

を

$$
r(x,y)=(x,y,g(x,y))
$$

と表すと

$$
r_x=(1,0,g_x),
\qquad
r_y=(0,1,g_y),
$$

$$
r_x\times r_y=(-g_x,-g_y,1).
$$

<a id="prop-vc3-graph-formulas"></a>

<!-- formal-statement-start -->
> **命題（graph surface の面積・上向き flux）**  
> $g\in C^1(D)$ とする。graph surface $z=g(x,y)$ について
>
> $$
> dS
> =
> \sqrt{1+g_x^2+g_y^2}\,dx\,dy.
> $$
>
> 上向き向きを選ぶと
>
> $$
> n\,dS
> =
> (-g_x,-g_y,1)\,dx\,dy,
> $$
>
> 従って
>
> $$
> \int_SF\cdot n\,dS
> =
> \iint_D
> F(x,y,g(x,y))
> \cdot(-g_x,-g_y,1)\,dx\,dy.
> $$
<!-- formal-statement-end -->

これは VC4 で graph domain 上の発散定理を証明するときの局所計算になります。

---

## 9. 球面と円柱

### 球面

半径 $R$ の球面を

$$
r(\theta,\varphi)
=
(R\sin\varphi\cos\theta,\,
 R\sin\varphi\sin\theta,\,
 R\cos\varphi)
$$

とすると

$$
|r_\theta\times r_\varphi|
=
R^2\sin\varphi.
$$

従って

$$
\operatorname{Area}(S_R)
=
\int_0^{2\pi}\int_0^\pi
R^2\sin\varphi\,d\varphi\,d\theta
=
4\pi R^2.
$$

外向き単位法線は

$$
n=\frac{r}{R}.
$$

radial field

$$
F(x)=x
$$

では球面上で

$$
F\cdot n=R
$$

なので

$$
\int_{S_R}F\cdot n\,dS
=
R\cdot4\pi R^2
=
4\pi R^3.
$$

VC4 ではこれが体積積分

$$
\iiint_{B_R}\operatorname{div}F\,dV
=
\iiint_{B_R}3\,dV
=
4\pi R^3
$$

と一致することを定理として説明します。

### 円柱側面

$$
r(\theta,z)
=
(R\cos\theta,R\sin\theta,z)
$$

なら

$$
r_\theta\times r_z
=
(R\cos\theta,R\sin\theta,0).
$$

その長さは $R$ なので側面積要素は

$$
dS=R\,d\theta\,dz.
$$

---

## 10. 境界曲線の向きの入口

向き付き曲面に境界があるとき、境界の向きは独立に好き勝手には選びません。

VC5 で Stokes theorem

$$
\int_{\partial S}F\cdot dr
=
\int_S(\nabla\times F)\cdot n\,dS
$$

を成立させるため、右手の親指を $n$ に向けたとき、指が曲がる向きを正の境界向きとします。

例えば $xy$ 平面の円板を上向き $n=(0,0,1)$ に取れば、境界円は上から見て反時計回りです。

この規約を VC3 では固定し、一般 Stokes の証明は VC5 に送ります。

---

## 11. 演習

#### VC3-A01 平面 patch の法線
- Level: A
- 目安時間: 12分

$$
r(u,v)=(u,v,u+2v)
$$

について $r_u,r_v,r_u\times r_v$ を求め、接平面の法線を一つ与えよ。

<!-- solution-start -->
### 詳細解答

$$
r_u=(1,0,1),
\qquad
r_v=(0,1,2).
$$

従って

$$
r_u\times r_v
=
\begin{vmatrix}
e_1&e_2&e_3\\
1&0&1\\
0&1&2
\end{vmatrix}
=
(-1,-2,1).
$$

よって法線方向の一つは

$$
\boxed{(-1,-2,1)}.
$$
<!-- solution-end -->

#### VC3-A02 graph surface の面積要素
- Level: A
- 目安時間: 12分

$$
z=x^2+y^2
$$

の graph について $dS$ を求めよ。

<!-- solution-start -->
### 詳細解答

$$
g_x=2x,\qquad g_y=2y.
$$

[graph surface の公式](#prop-vc3-graph-formulas) より

$$
dS
=
\sqrt{1+4x^2+4y^2}\,dx\,dy.
$$

従って

$$
\boxed{
dS=\sqrt{1+4x^2+4y^2}\,dx\,dy
}.
$$
<!-- solution-end -->

#### VC3-A03 球面積
- Level: A
- 目安時間: 15分

球面パラメータ表示から半径 $R$ の球面積 $4\pi R^2$ を導け。

<!-- solution-start -->
### 詳細解答

球面では

$$
dS=R^2\sin\varphi\,d\varphi\,d\theta.
$$

よって

$$
\begin{aligned}
\operatorname{Area}(S_R)
&=
\int_0^{2\pi}
\int_0^\pi
R^2\sin\varphi\,d\varphi\,d\theta\\
&=
2\pi R^2[-\cos\varphi]_0^\pi\\
&=
2\pi R^2(2)\\
&=
\boxed{4\pi R^2}.
\end{aligned}
$$
<!-- solution-end -->

#### VC3-A04 平面を通る flux
- Level: A
- 目安時間: 12分

長方形

$$
S=\{(x,y,1):0\le x\le2,\ 0\le y\le3\}
$$

を上向きに取り、$F=(x,y,4)$ の flux を求めよ。

<!-- solution-start -->
### 詳細解答

上向き単位法線は

$$
n=(0,0,1)
$$

です。

$$
F\cdot n=4
$$

なので

$$
\int_SF\cdot n\,dS
=
\int_0^2\int_0^3 4\,dy\,dx
=
4\cdot6
=
\boxed{24}.
$$
<!-- solution-end -->

#### VC3-B01 paraboloid の scalar surface integral
- Level: B
- 目安時間: 25分

$$
S:\ z=x^2+y^2,\qquad x^2+y^2\le1
$$

について

$$
\int_S1\,dS
$$

を極座標を用いて積分表示し、値を求めよ。

<!-- solution-start -->
### 詳細解答

$$
dS
=
\sqrt{1+4x^2+4y^2}\,dx\,dy.
$$

極座標 $x=r\cos\theta,y=r\sin\theta$ を使うと

$$
dx\,dy=r\,dr\,d\theta
$$

なので

$$
\begin{aligned}
\operatorname{Area}(S)
&=
\int_0^{2\pi}\int_0^1
\sqrt{1+4r^2}\,r\,dr\,d\theta\\
&=
2\pi\int_0^1r\sqrt{1+4r^2}\,dr.
\end{aligned}
$$

$s=1+4r^2$ と置けば $ds=8r\,dr$ なので

$$
\begin{aligned}
\operatorname{Area}(S)
&=
\frac{\pi}{4}
\int_1^5 s^{1/2}\,ds\\
&=
\frac{\pi}{4}\cdot\frac23
\left(5^{3/2}-1\right)\\
&=
\boxed{
\frac{\pi}{6}(5\sqrt5-1)
}.
\end{aligned}
$$
<!-- solution-end -->

#### VC3-B02 sphere の radial flux
- Level: B
- 目安時間: 20分

半径 $R$ の球面を外向きに取り、

$$
F(x)=\frac{x}{|x|^3}
$$

の flux を求めよ。

<!-- solution-start -->
### 詳細解答

球面上では $|x|=R$、外向き単位法線は

$$
n=\frac{x}{R}.
$$

従って

$$
F\cdot n
=
\frac{x}{R^3}\cdot\frac{x}{R}
=
\frac{|x|^2}{R^4}
=
\frac1{R^2}.
$$

よって

$$
\int_{S_R}F\cdot n\,dS
=
\frac1{R^2}\operatorname{Area}(S_R)
=
\frac1{R^2}\cdot4\pi R^2
=
\boxed{4\pi}.
$$

半径に依らない点が重要です。原点に特異点があるため、VC4 の divergence theorem を原点を含む球へそのまま適用してはいけません。
<!-- solution-end -->

#### VC3-B03 再パラメータ表示と向き
- Level: B
- 目安時間: 25分

平面 patch

$$
r(u,v)=(u,v,0)
$$

に対し

$$
\psi(s,t)=(t,s)
$$

で再パラメータ表示する。

1. $\det D\psi$ を求めよ。
2. 面積要素が変わらないことを確認せよ。
3. 向き付き面素が反転することを確認せよ。

<!-- solution-start -->
### 詳細解答

1.

$$
D\psi=
\begin{pmatrix}
0&1\\
1&0
\end{pmatrix}
$$

なので

$$
\det D\psi=-1.
$$

2. 元の表示では

$$
r_u\times r_v=(0,0,1)
$$

で、面積要素の大きさは 1 です。

再表示 $\widetilde r(s,t)=(t,s,0)$ では

$$
\widetilde r_s=(0,1,0),
\qquad
\widetilde r_t=(1,0,0),
$$

よって

$$
|\widetilde r_s\times\widetilde r_t|
=
|(0,0,-1)|
=
1.
$$

3. しかし vector-valued area element は

$$
(0,0,1)\to(0,0,-1)
$$

と反転します。これは $\det D\psi<0$ が向きを反転することと一致します。
<!-- solution-end -->

#### VC3-C01 閉円柱の flux を面ごとに計算する
- Level: C
- 目安時間: 40分

半径 $R$、高さ $H$ の閉円柱

$$
x^2+y^2\le R^2,\qquad 0\le z\le H
$$

の境界を外向きに取り、

$$
F=(x,y,2z)
$$

の total flux を側面・上面・下面に分けて直接計算せよ。

<!-- solution-start -->
### 詳細解答

側面を

$$
r(\theta,z)=(R\cos\theta,R\sin\theta,z)
$$

と置きます。外向き単位法線は

$$
n=(\cos\theta,\sin\theta,0),
$$

面積要素は

$$
dS=R\,d\theta\,dz.
$$

側面上で

$$
F\cdot n
=
R\cos^2\theta+R\sin^2\theta
=
R.
$$

従って側面 flux は

$$
\int_0^H\int_0^{2\pi}R\cdot R\,d\theta\,dz
=
2\pi R^2H.
$$

上面 $z=H$ では $n=(0,0,1)$ なので

$$
F\cdot n=2H.
$$

上面の面積は $\pi R^2$ だから

$$
\text{上面 flux}
=
2H\pi R^2.
$$

下面 $z=0$ では $n=(0,0,-1)$ ですが $F_3=0$ なので flux は 0 です。

合計は

$$
2\pi R^2H+2\pi R^2H
=
\boxed{4\pi R^2H}.
$$

VC4 では

$$
\operatorname{div}F=1+1+2=4
$$

より、体積 $\pi R^2H$ に 4 を掛けた値と一致することを divergence theorem で一行に圧縮できます。
<!-- solution-end -->

---

## 12. 次章への接続

VC3 で法線と flux が定義できました。次の VC4 では、

$$
\text{内部の divergence}
\quad\longleftrightarrow\quad
\text{境界を通る flux}
$$

を Green theorem と Gauss--Ostrogradsky theorem として証明します。

これが PDE6 の Green 恒等式へ入る canonical route になります。
