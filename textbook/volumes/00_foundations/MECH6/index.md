# MECH6 中心力・万有引力・Kepler 問題

<!-- definition-example-audit: strict -->

> **既出概念**：[MECH3 の力学的エネルギー保存](../MECH3/index.md#thm-mech3-mechanical-energy-conservation)、[MECH4 の角運動量保存](../MECH4/index.md#thm-mech4-angular-momentum-conservation)と[位置ベクトルに平行な力](../MECH4/index.md#prop-mech4-radial-force-angular-momentum)、[ODE2 の定係数線形微分方程式](../ODE2/index.md#thm-ode2-constant-coefficient)を使います。

MECH4 では、力が位置ベクトルと平行ならトルクが消え、角運動量が保存されることを見ました。ここで次の問いが生まれます。

**一点へ向く力だけで、なぜ惑星軌道は平面上の楕円になり、面積速度と周期に単純な法則が現れるのでしょうか。**

本章では、中心からの距離を (ho(t))、軌道面内の角度を (	heta(t)) と書きます。主役は

[
oxed{
	ext{中心力}
longrightarrow
	ext{角運動量保存}
longrightarrow
	ext{平面極座標}
longrightarrow
	ext{有効ポテンシャル}
longrightarrow
	ext{軌道方程式}
}
]

という縮約です。万有引力ではこの流れがさらに

[
oxed{
rac{1}{ho^2}	ext{ の引力}
longrightarrow
	ext{円錐曲線}
longrightarrow
	ext{Kepler の3法則}
}
]

へつながります。

固定された中心天体の質量を (M>0)、運動する質点の質量を (m>0)、万有引力定数を (G>0) とします。中心天体自身の運動まで含めた二体問題は MECH7 で扱います。

---

## 1. 中心力とは何か

中心を原点 (O) に取り、質点の位置ベクトルを (r(t)) とします。

[
ho(t):=|r(t)|>0,
qquad
e_r(t):=rac{r(t)}{ho(t)}
]

と置くと、(e_r) は中心から質点へ向く単位ベクトルです。

<a id="def-mech6-central-force"></a>

<!-- formal-statement-start -->
### 定義（中心力）

質点に働く力 (F) が

[
oxed{
F(t)=f(ho(t)),e_r(t)
}
]

と書けるとき、その力を **中心力** とする。ここで (f) は距離 (ho) だけの関数である。

(f(ho)<0) なら力は中心向き、(f(ho)>0) なら中心から外向きである。
<!-- formal-statement-end -->

<!-- definition-example-start: def-mech6-central-force -->

### **定義の確認**：逆二乗引力

[
F=-rac{k}{ho^2}e_r,
qquad k>0
]

は、方向が常に (e_r) と平行で、大きさ (k/ho^2) が距離だけで決まるので中心力です。

一方、一定方向の重力 (F=-mg,e_y) は、一般の位置で (r) と平行ではないため、原点を中心とする中心力ではありません。

<!-- definition-example-end -->

![中心 O の周囲を運動する質点 P では、中心力 F は位置ベクトル r と同一直線上にあり、速度 v は一般には別方向を向く](assets/central-force-orbit.svg)

図の (F) は中心向きの場合を描いています。中心力の条件は「速度と反対向き」ではなく、**位置ベクトルと平行**であることです。

---

## 2. 中心力運動は一つの平面に閉じる

中心力では

[
r	imes F
=
r	imes igl(f(ho)e_rigr)
=0
]

です。したがって [MECH4 の角運動量保存](../MECH4/index.md#thm-mech4-angular-momentum-conservation)を適用できます。

<a id="prop-mech6-planar-reduction"></a>

<!-- formal-statement-start -->
### 命題（中心力運動の平面縮約）

質量 (m>0) の質点が中心力

[
F=f(ho)e_r
]

だけを受けるとする。角運動量

[
L=r	imes mv
]

は時間に依らず一定である。

特に (L
eq0) なら、運動は原点を通り (L) に垂直な一つの固定平面内に限られる。
<!-- formal-statement-end -->

### 証明の見取り図

中心力ではトルクが 0 なので (L) は一定です。さらに外積の定義から常に (rcdot L=0) です。

<!-- proof-start -->
### 証明

[MECH4 の角運動量の時間変化](../MECH4/index.md#thm-mech4-angular-momentum-balance)より

[
rac{dL}{dt}
=
r	imes F.
]

中心力では (F) と (r) が平行なので

[
r	imes F=0.
]

従って

[
rac{dL}{dt}=0,
qquad
L=	ext{一定}.
]

また (L=r	imes mv) なので、外積の性質から

[
r(t)cdot L=0
]

がすべての (t) で成り立ちます。(L
eq0) なら

[
Pi:={xinmathbb R^3:xcdot L=0}
]

は原点を通る固定平面であり、(r(t)inPi) です。よって軌道全体が (Pi) に含まれます。
<!-- proof-end -->

(L=0) の場合は (r) と (v) が平行で、運動は中心を通る直線上の純粋な動径運動になります。本章の軌道方程式では主に (L
eq0) を扱います。

---

## 3. 平面極座標の速度と加速度

固定された軌道面に直交座標を取り、

[
r=ho e_r,
]

[
e_r=
egin{pmatrix}
cos	heta\
sin	heta
end{pmatrix},
qquad
e_	heta=
egin{pmatrix}
-sin	heta\
cos	heta
end{pmatrix}
]

とします。

まず基底ベクトル自身が回転することに注意します。

[
dot e_r
=
dot	heta
egin{pmatrix}
-sin	heta\
cos	heta
end{pmatrix}
=
dot	heta,e_	heta,
]

[
dot e_	heta
=
-dot	heta
egin{pmatrix}
cos	heta\
sin	heta
end{pmatrix}
=
-dot	heta,e_r.
]

<a id="prop-mech6-polar-kinematics"></a>

<!-- formal-statement-start -->
### 命題（平面極座標での速度・加速度）

(ho,	heta) が (C^2) 級で (ho>0) とする。このとき

[
oxed{
v
=
dotho,e_r
+
hodot	heta,e_	heta
}
]

および

[
oxed{
a
=
(ddotho-hodot	heta^2)e_r
+
(hoddot	heta+2dothodot	heta)e_	heta
}
]

が成り立つ。
<!-- formal-statement-end -->

### 証明の見取り図

(r=ho e_r) を一度微分して速度、もう一度微分して加速度を求めます。各段階で (e_r,e_	heta) 自身の時間微分を残さないことが要点です。

<!-- proof-start -->
### 証明

まず

[
v
=
rac{d}{dt}(ho e_r)
=
dotho e_r+hodot e_r.
]

(dot e_r=dot	heta e_	heta) を代入して

[
v
=
dotho e_r+hodot	heta e_	heta.
]

さらに微分すると

[
egin{aligned}
a
&=
ddotho e_r
+dothodot e_r
+(dothodot	heta+hoddot	heta)e_	heta
+hodot	hetadot e_	heta\
&=
ddotho e_r
+dothodot	heta e_	heta
+(dothodot	heta+hoddot	heta)e_	heta
-hodot	heta^2e_r.
end{aligned}
]

(e_r) 成分と (e_	heta) 成分をまとめて

[
a
=
(ddotho-hodot	heta^2)e_r
+
(hoddot	heta+2dothodot	heta)e_	heta.
]
<!-- proof-end -->

中心力には (e_	heta) 成分がありません。Newton 方程式

[
ma=F=f(ho)e_r
]

の (e_	heta) 成分は

[
m(hoddot	heta+2dothodot	heta)=0.
]

両辺に (ho) を掛けると

[
ho^2ddot	heta+2hodothodot	heta
=
rac{d}{dt}(ho^2dot	heta)
=
0.
]

従って

[
oxed{
ell:=mho^2dot	heta
}
]

は一定です。軌道面の向きを (L) と同じ向きに選べば (ell=|L|>0) です。

---

## 4. 有効ポテンシャル：二次元運動を一次元へ縮約する

中心力が保存力で、

[
F=-U'(ho)e_r
]

と書けるとします。速度の直交分解から

[
|v|^2
=
dotho^2+ho^2dot	heta^2.
]

従って力学的エネルギーは

[
E
=
rac12mdotho^2
+rac12mho^2dot	heta^2
+U(ho).
]

角運動量保存

[
dot	heta
=
rac{ell}{mho^2}
]

を代入すると

[
E
=
rac12mdotho^2
+
U(ho)
+
rac{ell^2}{2mho^2}.
]

この最後の二項を一つにまとめます。

<a id="def-mech6-effective-potential"></a>

<!-- formal-statement-start -->
### 定義（有効ポテンシャル）

中心ポテンシャル (U(ho)) と保存角運動量 (ell) に対して

[
oxed{
V_{mathrm{eff}}(ho)
:=
U(ho)
+
rac{ell^2}{2mho^2}
}
]

を **有効ポテンシャル** とする。
<!-- formal-statement-end -->

<!-- definition-example-start: def-mech6-effective-potential -->

### **定義の確認**：万有引力

万有引力のポテンシャル

[
U(ho)=-rac{GMm}{ho}
]

では

[
oxed{
V_{mathrm{eff}}(ho)
=
-rac{GMm}{ho}
+
rac{ell^2}{2mho^2}
}.
]

第1項は引力ポテンシャル、第2項は角運動量を保ちながら (ho) を小さくすると急増する項です。

<!-- definition-example-end -->

<a id="prop-mech6-effective-reduction"></a>

<!-- formal-statement-start -->
### 命題（中心力運動の有効一次元化）

保存中心力 (F=-U'(ho)e_r) を受け、(ell
eq0) とする。このとき動径運動は

[
oxed{
E
=
rac12mdotho^2+V_{mathrm{eff}}(ho)
}
]

および

[
oxed{
mddotho
=
-rac{dV_{mathrm{eff}}}{dho}
}
]

を満たす。
<!-- formal-statement-end -->

<!-- proof-start -->
### 証明

エネルギー式は直前の計算で得ています。次に

[
V_{mathrm{eff}}'(ho)
=
U'(ho)
-
rac{ell^2}{mho^3}.
]

一方、Newton 方程式の (e_r) 成分は

[
m(ddotho-hodot	heta^2)
=
-U'(ho).
]

従って

[
mddotho
=
-U'(ho)
+
mhodot	heta^2.
]

ここで

[
dot	heta=rac{ell}{mho^2}
]

だから

[
mhodot	heta^2
=
mho
rac{ell^2}{m^2ho^4}
=
rac{ell^2}{mho^3}.
]

よって

[
mddotho
=
-U'(ho)+rac{ell^2}{mho^3}
=
-V_{mathrm{eff}}'(ho).
]
<!-- proof-end -->

![万有引力の有効ポテンシャルでは、角運動量項により rho=0 近くで上昇し、有限半径で極小を持つ](assets/effective-potential.svg)

エネルギー線 (E) と (V_{mathrm{eff}}) の交点では (dotho=0) です。MECH3 の一次元ポテンシャルと同じ読み方で、動径方向の転回点を判定できます。

### 4.1 円軌道

円軌道では (ho=ho_c) が一定なので

[
dotho=ddotho=0.
]

従って有効ポテンシャルの停留条件

[
V_{mathrm{eff}}'(ho_c)=0
]

が必要です。万有引力なら

[
rac{GMm}{ho_c^2}
-
rac{ell^2}{mho_c^3}
=0,
]

したがって

[
oxed{
ho_c
=
rac{ell^2}{GMm^2}
}.
]

同じ結果は向心加速度からも得られます。円運動では (v=ho_cdot	heta) なので

[
mrac{v^2}{ho_c}
=
rac{GMm}{ho_c^2},
]

ゆえに

[
oxed{
v_c=sqrt{rac{GM}{ho_c}}
}.
]

---

## 5. Newton の万有引力

<a id="principle-mech6-newtonian-gravitation"></a>

<!-- formal-statement-start -->
### 原理（Newton の万有引力）

質量 (M>0) の中心天体を原点に固定し、質量 (m>0) の質点が距離 (ho>0) にあるとする。本章の固定中心近似では、質点に働く万有引力を

[
oxed{
F
=
-rac{GMm}{ho^2}e_r
}
]

とする。

対応するポテンシャルを無限遠で 0 と取れば

[
oxed{
U(ho)
=
-rac{GMm}{ho}
}
]

である。
<!-- formal-statement-end -->

これは数学定理ではなく物理法則です。ポテンシャルとの対応は微分で確認できます。

[
-rac{dU}{dho}
=
-rac{GMm}{ho^2}.
]

### 5.1 脱出速度

半径 (ho_0) で速さ (v_0) を持つとき、

[
E
=
rac12mv_0^2-rac{GMm}{ho_0}.
]

無限遠で速度が 0 まで落ちても到達できる境界は (E=0) です。従って

[
rac12m v_{mathrm{esc}}^2
=
rac{GMm}{ho_0},
]

[
oxed{
v_{mathrm{esc}}
=
sqrt{rac{2GM}{ho_0}}
}.
]

円軌道速度 (v_c=sqrt{GM/ho_0}) と比べると

[
v_{mathrm{esc}}=sqrt2,v_c.
]

---

## 6. 時刻を消して軌道そのものを求める

有効ポテンシャルは (ho(t)) の許容範囲をよく示します。しかし「軌道が何という曲線か」を直接知るには、時刻 (t) を消して (ho) を (	heta) の関数として扱う方が便利です。

[
u(	heta):=rac{1}{ho(	heta)}
]

と置きます。

角運動量保存から

[
dot	heta
=
rac{ell}{mho^2}
=
rac{ell}{m}u^2.
]

また

[
ho=rac1u
]

なので、連鎖律により

[
dotho
=
rac{dho}{d	heta}dot	heta
=
-rac{u'}{u^2}rac{ell}{m}u^2
=
-rac{ell}{m}u',
]

ここで (u'=du/d	heta) です。さらに

[
ddotho
=
-rac{ell}{m}u''dot	heta
=
-rac{ell^2}{m^2}u^2u''.
]

一方、

[
hodot	heta^2
=
rac1u
left(rac{ell}{m}u^2ight)^2
=
rac{ell^2}{m^2}u^3.
]

したがって動径加速度は

[
ddotho-hodot	heta^2
=
-rac{ell^2}{m^2}u^2(u''+u).
]

<a id="prop-mech6-binet"></a>

<!-- formal-statement-start -->
### 命題（Binet 型の軌道方程式）

(L
eq0) の中心力

[
F=f(ho)e_r
]

の軌道について (u(	heta)=1/ho(	heta)) とする。このとき

[
oxed{
u''+u
=
-rac{m}{ell^2u^2}
f!left(rac1uight)
}
]

が成り立つ。
<!-- formal-statement-end -->

<!-- proof-start -->
### 証明

Newton 方程式の動径成分は

[
m(ddotho-hodot	heta^2)
=
f(ho).
]

上で得た

[
ddotho-hodot	heta^2
=
-rac{ell^2}{m^2}u^2(u''+u)
]

と (ho=1/u) を代入すると

[
-rac{ell^2}{m}u^2(u''+u)
=
f!left(rac1uight).
]

(ell
eq0)、(u>0) なので割ることができ、

[
u''+u
=
-rac{m}{ell^2u^2}
f!left(rac1uight).
]
<!-- proof-end -->

万有引力では

[
f(ho)=-rac{GMm}{ho^2},
]

従って

[
f(1/u)=-GMm,u^2.
]

Binet 方程式は

[
u''+u
=
rac{GMm^2}{ell^2}.
]

ここで

[
oxed{
p:=rac{ell^2}{GMm^2}>0
}
]

と置けば

[
u''+u=rac1p.
]

---

## 7. 逆二乗引力の軌道は円錐曲線になる

[ODE2 の定係数線形方程式](../ODE2/index.md#thm-ode2-constant-coefficient)を (	heta) を独立変数として適用すると、

[
u(	heta)
=
rac1p
+
Acos	heta+Bsin	heta.
]

定数 (ege0)、(	heta_0) を用いて

[
Acos	heta+Bsin	heta
=
rac{e}{p}cos(	heta-	heta_0)
]

と書けば、

[
u
=
rac1pleft(1+ecos(	heta-	heta_0)ight).
]

従って

[
oxed{
ho(	heta)
=
rac{p}{1+ecos(	heta-	heta_0)}
}.
]

<a id="thm-mech6-conic-orbit"></a>

<!-- formal-statement-start -->
### 定理（逆二乗力の円錐曲線軌道）

固定中心 (M) による万有引力

[
F=-rac{GMm}{ho^2}e_r
]

の下で (ell
eq0) とする。軌道は適切な角度原点 (	heta_0) を選べば

[
oxed{
ho
=
rac{p}{1+ecos(	heta-	heta_0)},
qquad
p=rac{ell^2}{GMm^2},
qquad
ege0
}
]

と書ける。

(e) は離心率であり、

- (0le e<1)：楕円（(e=0) は円）
- (e=1)：放物線
- (e>1)：双曲線

に対応する。
<!-- formal-statement-end -->

### 7.1 離心率とエネルギー

(phi=	heta-	heta_0) と置くと

[
u=rac1p(1+ecosphi),
qquad
u'=-rac{e}{p}sinphi.
]

前節の計算から

[
dotho=-rac{ell}{m}u',
qquad
ho^2dot	heta^2=rac{ell^2}{m^2}u^2.
]

従ってエネルギーは

[
E
=
rac{ell^2}{2m}(u'^2+u^2)-GMm,u.
]

ここで

[
u'^2+u^2
=
rac1{p^2}
left[
e^2sin^2phi+(1+ecosphi)^2
ight]
]

[
=
rac1{p^2}
(1+2ecosphi+e^2).
]

また

[
rac1p=rac{GMm^2}{ell^2}.
]

代入すると (cosphi) の項が打ち消し合い、

[
oxed{
E
=
rac{G^2M^2m^3}{2ell^2}(e^2-1)
}.
]

従って

[
oxed{
e^2
=
1+
rac{2Eell^2}{G^2M^2m^3}
}.
]

これにより

[
E<0iff e<1,
qquad
E=0iff e=1,
qquad
E>0iff e>1
]

が分かります。

---

## 8. 楕円軌道の幾何

以後 (0le e<1) とし、近日点が (	heta=0) になるよう角度原点を取ります。

[
ho
=
rac{p}{1+ecos	heta}.
]

近日点では (cos	heta=1) なので

[
r_p=rac{p}{1+e}.
]

遠日点では (cos	heta=-1) なので

[
r_a=rac{p}{1-e}.
]

楕円の長半径 (a) は

[
a=rac{r_p+r_a}{2}
]

だから

[
a
=
rac12
left(
rac{p}{1+e}
+
rac{p}{1-e}
ight)
=
rac{p}{1-e^2}.
]

従って

[
oxed{
p=a(1-e^2)
}.
]

短半径を (b) とすると楕円の幾何から

[
b=asqrt{1-e^2}
]

です。

![焦点 F に中心天体を置いた Kepler 楕円。近日点・遠日点・長軸 2a と、同じ時間に掃く等面積領域を示す](assets/kepler-ellipse.svg)

さらに

[
p=rac{ell^2}{GMm^2}=a(1-e^2)
]

と

[
E
=
rac{G^2M^2m^3}{2ell^2}(e^2-1)
]

を組み合わせると

[
oxed{
E=-rac{GMm}{2a}
}.
]

束縛軌道では長半径だけで全エネルギーが決まります。

---

## 9. Kepler 第1法則

<a id="thm-mech6-kepler-first"></a>

<!-- formal-statement-start -->
### 定理（Kepler 第1法則）

固定中心近似の万有引力

[
F=-rac{GMm}{ho^2}e_r
]

の下で、(ell
eq0) かつ (E<0) とする。このとき質点の軌道は、中心天体を一つの焦点とする楕円である。
<!-- formal-statement-end -->

<!-- proof-start -->
### 証明

逆二乗力の軌道定理より

[
ho
=
rac{p}{1+ecos(	heta-	heta_0)}.
]

また

[
e^2
=
1+
rac{2Eell^2}{G^2M^2m^3}.
]

(E<0) なので (e<1) です。さらに (ege0) だから (0le e<1)。この極方程式は原点を焦点とする楕円を表します。原点に中心天体 (M) を置いたので、中心天体は楕円の一焦点にあります。
<!-- proof-end -->

ここで「惑星は必ず楕円」というより、**固定中心・逆二乗引力・非零角運動量・負エネルギー**という仮定から楕円が出る、と読むことが重要です。

---

## 10. Kepler 第2法則

軌道面で、原点と質点を結ぶ線分が短い時間 (dt) に掃く面積を (dA) とします。微小扇形の面積は

[
dA
=
rac12ho^2,d	heta
]

なので

[
rac{dA}{dt}
=
rac12ho^2dot	heta.
]

角運動量

[
ell=mho^2dot	heta
]

を使えば

[
oxed{
rac{dA}{dt}
=
rac{ell}{2m}
}.
]

<a id="thm-mech6-kepler-second"></a>

<!-- formal-statement-start -->
### 定理（Kepler 第2法則）

中心力運動で (L
eq0) とする。中心と質点を結ぶ線分の面積速度は一定で、

[
oxed{
rac{dA}{dt}
=
rac{ell}{2m}
}
]

である。従って等しい時間には等しい面積を掃く。
<!-- formal-statement-end -->

<!-- proof-start -->
### 証明

中心力では角運動量保存により

[
ell=mho^2dot	heta
]

が一定です。一方、

[
rac{dA}{dt}
=
rac12ho^2dot	heta.
]

従って

[
rac{dA}{dt}
=
rac12
rac{ell}{m}
=
rac{ell}{2m},
]

右辺は定数です。
<!-- proof-end -->

第2法則は逆二乗力に固有ではありません。**任意の中心力**で成り立ちます。これが第1・第3法則との重要な違いです。

---

## 11. Kepler 第3法則

楕円の面積は

[
pi ab.
]

一周期 (T) で楕円全体を一度掃くので、第2法則から

[
pi ab
=
rac{ell}{2m}T.
]

従って

[
T
=
rac{2pi m ab}{ell}.
]

ここで

[
b^2=a^2(1-e^2)
]

および

[
ell^2
=
GMm^2p
=
GMm^2a(1-e^2)
]

を使います。

<a id="thm-mech6-kepler-third"></a>

<!-- formal-statement-start -->
### 定理（Kepler 第3法則）

固定中心 (M) の万有引力下にある楕円軌道の長半径を (a)、周期を (T) とする。このとき

[
oxed{
T^2
=
rac{4pi^2}{GM}a^3
}
]

が成り立つ。
<!-- formal-statement-end -->

<!-- proof-start -->
### 証明

まず

[
T^2
=
rac{4pi^2m^2a^2b^2}{ell^2}.
]

楕円の関係 (b^2=a^2(1-e^2)) を代入して

[
T^2
=
rac{4pi^2m^2a^4(1-e^2)}{ell^2}.
]

一方、

[
p=a(1-e^2)
]

かつ

[
p=rac{ell^2}{GMm^2}
]

なので

[
ell^2
=
GMm^2a(1-e^2).
]

これを分母へ代入すると

[
T^2
=
rac{
4pi^2m^2a^4(1-e^2)
}{
GMm^2a(1-e^2)
}
=
rac{4pi^2}{GM}a^3.
]
<!-- proof-end -->

試験質点の質量 (m) が消えることが分かります。MECH7 で中心天体も動く二体問題へ進むと、固定中心近似の (GM) は二体問題の (G(M+m)) に置き換わります。

---

## 12. 双曲線散乱への入口

(e>1) のとき軌道は双曲線です。近日点が (	heta=0) になるように取れば

[
ho
=
rac{p}{1+ecos	heta}.
]

遠方では (ho	oinfty) なので

[
1+ecos	heta_infty=0,
]

従って

[
cos	heta_infty=-rac1e.
]

(	heta_inftyin(pi/2,pi)) と取ると、入射側と出射側の漸近方向は (pm	heta_infty) です。直進からの偏向角の大きさ (chi) は

[
chi=2	heta_infty-pi.
]

[
	heta_infty
=
pi-arccosrac1e
]

なので

[
chi
=
pi-2arccosrac1e
=
2arcsinrac1e.
]

従って

[
oxed{
chi
=
2arcsinrac1e
}.
]

(e) が大きいほど (chi) は小さく、ほぼ直進します。散乱断面積まで進むには衝突径数との対応が必要なので、ここでは軌道幾何までに留めます。

---

## 13. (1/ho) ポテンシャルという共通構造

古典重力では

[
U(ho)=-rac{GMm}{ho}.
]

異符号の電荷間の Coulomb 引力も、物理定数は異なりますが

[
U(ho)=-rac{alpha}{ho},
qquad
alpha>0
]

という同じ数学形を持ちます。

このため、古典中心力で現れた

- 有効ポテンシャル
- (1/ho) ポテンシャル
- 角運動量
- 軌道の動径・角度分離

という語彙は、後の数理量子力学で水素様原子を考えるとき再び現れます。

ただし、古典軌道と量子状態は同じ対象ではありません。「式の一部が同型」であることと「物理が同じ」であることは区別します。

---

## 14. 本章の見取り図

中心力では、三次元の二階ベクトル方程式をそのまま解く必要はありません。

[
r	imes F=0
]

から角運動量が保存し、

[
L=	ext{一定}
]

なので運動は固定平面へ落ちます。さらに

[
ell=mho^2dot	heta
]

を使うと

[
E
=
rac12mdotho^2
+
V_{mathrm{eff}}(ho)
]

という一次元問題へ縮約できます。

万有引力では

[
F=-rac{GMm}{ho^2}e_r
]

を (u=1/ho) へ変換すると

[
u''+u=rac{GMm^2}{ell^2}
]

という定係数方程式になり、

[
ho
=
rac{p}{1+ecos(	heta-	heta_0)}
]

が出ます。ここから Kepler の法則が別々の経験則としてではなく、**同じ保存則と逆二乗力から連続して導かれる**ことが本章の核心です。

次の MECH7 では固定中心近似を外し、多粒子系・重心・二体問題・換算質量・衝突へ進みます。

---

# 演習

## Level A

### A1. 極座標の加速度を確認する

[
ho(t)=R,
qquad
	heta(t)=omega t,
qquad
R>0, omega>0
]

とする。速度と加速度を極座標基底で求め、等速円運動の向心加速度を回収せよ。

- Level: A

<!-- solution-start -->
#### 詳細解答

[
dotho=0,qquad
ddotho=0,qquad
dot	heta=omega,qquad
ddot	heta=0.
]

極座標の速度公式から

[
v
=
dotho e_r+hodot	heta e_	heta
=
Romega e_	heta.
]

従って速さは

[
oxed{|v|=Romega}.
]

加速度公式へ代入すると

[
a
=
(0-Romega^2)e_r+(0+0)e_	heta.
]

よって

[
oxed{
a=-Romega^2e_r
}.
]

大きさは (Romega^2=v^2/R) で、向きは中心向きです。
<!-- solution-end -->

### A2. 万有引力の円軌道

質量 (M) の中心天体の周りを、質量 (m) の質点が半径 (R) の円軌道で運動する。軌道速度 (v_c)、角速度 (omega_c)、周期 (T_c) を求めよ。

- Level: A

<!-- solution-start -->
#### 詳細解答

円運動の中心向き加速度は (v_c^2/R) です。Newton の第2法則より

[
mrac{v_c^2}{R}
=
rac{GMm}{R^2}.
]

(m>0)、(R>0) を使って整理すると

[
oxed{
v_c=sqrt{rac{GM}{R}}
}.
]

[
omega_c=rac{v_c}{R}
]

なので

[
oxed{
omega_c=sqrt{rac{GM}{R^3}}
}.
]

周期は (T_c=2pi/omega_c) より

[
oxed{
T_c
=
2pisqrt{rac{R^3}{GM}}
}.
]

従って

[
T_c^2=rac{4pi^2}{GM}R^3
]

で、円軌道は Kepler 第3法則の (a=R) の特別な場合です。
<!-- solution-end -->

### A3. 脱出速度

地表など半径 (R) の位置から、抵抗を無視して質点を速さ (v_0) で打ち出す。無限遠まで到達するための最小速度をエネルギーから求めよ。

- Level: A

<!-- solution-start -->
#### 詳細解答

初期エネルギーは

[
E
=
rac12mv_0^2-rac{GMm}{R}.
]

無限遠では (U(infty)=0) です。ちょうど速度 0 で無限遠へ届く境界が (E=0) なので

[
rac12mv_{mathrm{esc}}^2
-
rac{GMm}{R}
=
0.
]

従って

[
rac12v_{mathrm{esc}}^2
=
rac{GM}{R},
]

[
oxed{
v_{mathrm{esc}}
=
sqrt{rac{2GM}{R}}
}.
]

質点の質量 (m) は消えます。
<!-- solution-end -->

### A4. 離心率で軌道を分類する

逆二乗引力の軌道

[
ho=rac{p}{1+ecos	heta},
qquad p>0
]

について、次の各 (e) に対する軌道型を答えよ。また楕円の場合は近日点・遠日点距離を求めよ。

1. (e=0)
2. (e=1/2)
3. (e=1)
4. (e=2)

- Level: A

<!-- solution-start -->
#### 詳細解答

円錐曲線の分類より

[
0le e<1:	ext{楕円},qquad
e=1:	ext{放物線},qquad
e>1:	ext{双曲線}.
]

従って

1. (e=0)：円
2. (e=1/2)：楕円
3. (e=1)：放物線
4. (e=2)：双曲線

です。

楕円では

[
r_p=rac{p}{1+e},
qquad
r_a=rac{p}{1-e}.
]

(e=0) では

[
r_p=r_a=p
]

で円です。

(e=1/2) では

[
r_p
=
rac{p}{3/2}
=
oxed{rac{2p}{3}},
]

[
r_a
=
rac{p}{1/2}
=
oxed{2p}.
]
<!-- solution-end -->

## Level B

### B1. Binet 方程式から万有引力軌道を導く

万有引力

[
F=-rac{GMm}{ho^2}e_r
]

を受け、角運動量の大きさを (ell>0) とする。

1. (u=1/ho) に対する Binet 方程式を書け。
2. 一般解を求めよ。
3. (p=ell^2/(GMm^2)) と置いて軌道式を示せ。
4. 負エネルギーなら楕円であることを説明せよ。

- Level: B

<!-- solution-start -->
#### 詳細解答

中心力の動径成分は

[
f(ho)=-rac{GMm}{ho^2}.
]

従って

[
f(1/u)=-GMm,u^2.
]

Binet 方程式

[
u''+u
=
-rac{m}{ell^2u^2}f(1/u)
]

へ代入すると

[
u''+u
=
-rac{m}{ell^2u^2}
(-GMm,u^2)
=
rac{GMm^2}{ell^2}.
]

[
p:=rac{ell^2}{GMm^2}
]

と置けば

[
oxed{
u''+u=rac1p
}.
]

斉次方程式 (u_h''+u_h=0) の解は

[
u_h=Acos	heta+Bsin	heta,
]

定数特殊解は (u_p=1/p) です。従って

[
u
=
rac1p+Acos	heta+Bsin	heta.
]

(A,B) を振幅・位相表示して

[
Acos	heta+Bsin	heta
=
rac{e}{p}cos(	heta-	heta_0)
]

と書けば

[
u
=
rac1p
left[
1+ecos(	heta-	heta_0)
ight].
]

(u=1/ho) なので

[
oxed{
ho
=
rac{p}{1+ecos(	heta-	heta_0)}
}.
]

さらに本文で導いた

[
E
=
rac{G^2M^2m^3}{2ell^2}(e^2-1)
]

を使うと、(E<0) なら

[
e^2-1<0,
]

従って (0le e<1) です。よって軌道は楕円です。
<!-- solution-end -->

### B2. Kepler 第2法則から近日点速度と遠日点速度を比べる

楕円軌道の近日点距離を (r_p)、遠日点距離を (r_a)、その場所での速さをそれぞれ (v_p,v_a) とする。

1. 近日点・遠日点では速度が動径方向に垂直であることを使い、角運動量保存から (r_pv_p=r_av_a) を示せ。
2. (r_p=a(1-e))、(r_a=a(1+e)) を使い (v_p/v_a) を求めよ。
3. 面積速度の観点から意味を説明せよ。

- Level: B

<!-- solution-start -->
#### 詳細解答

近日点と遠日点では (ho) が極値なので

[
dotho=0.
]

従って速度は

[
v=hodot	heta e_	heta
]

となり、位置ベクトルに垂直です。角運動量の大きさは

[
ell
=
mho^2dot	heta
=
mho(hodot	heta)
=
mho v.
]

近日点と遠日点で同じ (ell) を持つため

[
mr_pv_p=mr_av_a.
]

よって

[
oxed{
r_pv_p=r_av_a
}.
]

さらに

[
r_p=a(1-e),
qquad
r_a=a(1+e)
]

なので

[
rac{v_p}{v_a}
=
rac{r_a}{r_p}
=
oxed{
rac{1+e}{1-e}
}.
]

(e>0) なら (v_p>v_a) です。

面積速度は

[
rac{dA}{dt}
=
rac12ho v_perp
]

です。近日点では (ho) が小さいので、同じ面積速度を保つには接線速度が大きくなります。遠日点では逆に遅くなります。
<!-- solution-end -->

### B3. 楕円軌道の周期を導く

楕円の長半径を (a)、離心率を (e)、短半径を (b=asqrt{1-e^2}) とする。

1. 面積速度から (T=2pi mab/ell) を導け。
2. (p=a(1-e^2)) と (p=ell^2/(GMm^2)) を用いて Kepler 第3法則を導け。
3. 周期が質点の質量 (m) に依らないことを確認せよ。

- Level: B

<!-- solution-start -->
#### 詳細解答

楕円全体の面積は

[
A_{mathrm{ellipse}}=pi ab.
]

面積速度は一定で

[
rac{dA}{dt}=rac{ell}{2m}.
]

一周期 (T) で楕円全体を一度掃くので

[
pi ab
=
rac{ell}{2m}T.
]

従って

[
oxed{
T=rac{2pi mab}{ell}
}.
]

二乗して

[
T^2
=
rac{4pi^2m^2a^2b^2}{ell^2}.
]

(b^2=a^2(1-e^2)) より

[
T^2
=
rac{4pi^2m^2a^4(1-e^2)}{ell^2}.
]

また

[
p=a(1-e^2)
]

と

[
p=rac{ell^2}{GMm^2}
]

から

[
ell^2
=
GMm^2a(1-e^2).
]

従って

[
T^2
=
rac{
4pi^2m^2a^4(1-e^2)
}{
GMm^2a(1-e^2)
}
=
oxed{
rac{4pi^2}{GM}a^3
}.
]

右辺に (m) は残りません。固定中心近似では、同じ中心天体 (M) の周りを回る質点の周期は、その質量ではなく長半径で決まります。
<!-- solution-end -->

## Level C

### C1. 保存則から Kepler 軌道を再構成する

質量 (M) の中心天体を原点に固定し、質量 (m) の質点が

[
F=-rac{GMm}{ho^2}e_r
]

だけを受ける。角運動量 (L
eq0)、全エネルギー (E<0) とする。

1. 運動が固定平面に限られることを示せ。
2. 平面極座標で (ell=mho^2dot	heta) が一定であることを示せ。
3. 有効ポテンシャルを求め、動径エネルギー式を書け。
4. (u=1/ho) から軌道式を導け。
5. 軌道が楕円であることを示せ。
6. 長半径 (a) に対し (E=-GMm/(2a)) を導け。
7. Kepler 第2法則、第3法則を導け。
8. この導出のどこが「逆二乗力に固有」で、どこが「任意の中心力」で成立するか整理せよ。

- Level: C

<!-- solution-start -->
#### 詳細解答

中心力なので

[
r	imes F=0.
]

角運動量の時間変化は

[
rac{dL}{dt}=r	imes F=0
]

であり、

[
L=	ext{一定}.
]

さらに (rcdot L=0) なので、(L
eq0) なら (r(t)) は固定平面

[
{x:xcdot L=0}
]

内にあります。

この平面で極座標を使うと、加速度の (e_	heta) 成分は

[
hoddot	heta+2dothodot	heta.
]

中心力には (e_	heta) 成分がないため

[
hoddot	heta+2dothodot	heta=0.
]

両辺に (ho) を掛けると

[
rac{d}{dt}(ho^2dot	heta)=0.
]

従って

[
oxed{
ell=mho^2dot	heta=	ext{一定}
}.
]

万有引力ポテンシャルは

[
U(ho)=-rac{GMm}{ho}.
]

よって有効ポテンシャルは

[
oxed{
V_{mathrm{eff}}(ho)
=
-rac{GMm}{ho}
+
rac{ell^2}{2mho^2}
}.
]

エネルギーは

[
oxed{
E
=
rac12mdotho^2
+
V_{mathrm{eff}}(ho)
}.
]

次に

[
u=rac1ho
]

と置きます。角運動量保存から

[
dot	heta=rac{ell}{m}u^2.
]

連鎖律により

[
dotho=-rac{ell}{m}u',
]

[
ddotho
=
-rac{ell^2}{m^2}u^2u''.
]

また

[
hodot	heta^2
=
rac{ell^2}{m^2}u^3.
]

従って

[
ddotho-hodot	heta^2
=
-rac{ell^2}{m^2}u^2(u''+u).
]

Newton 方程式

[
m(ddotho-hodot	heta^2)
=
-GMm,u^2
]

へ代入し、(-u^2) を消すと

[
rac{ell^2}{m}(u''+u)
=
GMm.
]

従って

[
u''+u
=
rac{GMm^2}{ell^2}.
]

[
p=rac{ell^2}{GMm^2}
]

と置けば

[
u''+u=rac1p.
]

一般解は

[
u
=
rac1p
left[
1+ecos(	heta-	heta_0)
ight],
]

したがって

[
oxed{
ho
=
rac{p}{
1+ecos(	heta-	heta_0)
}
}.
]

エネルギーと離心率の関係は

[
E
=
rac{G^2M^2m^3}{2ell^2}(e^2-1).
]

仮定 (E<0) より

[
e^2<1.
]

(ege0) なので

[
0le e<1.
]

従って軌道は楕円です。

楕円では

[
p=a(1-e^2).
]

一方

[
ell^2=GMm^2p.
]

エネルギー式へ代入すると

[
E
=
rac{G^2M^2m^3}{2GMm^2p}(e^2-1)
=
rac{GMm}{2p}(e^2-1).
]

(p=a(1-e^2)) を使えば

[
E
=
-rac{GMm}{2a}.
]

従って

[
oxed{
E=-rac{GMm}{2a}
}.
]

次に面積速度は

[
rac{dA}{dt}
=
rac12ho^2dot	heta
=
rac{ell}{2m}.
]

よって

[
oxed{
rac{dA}{dt}=	ext{一定}
}
]

であり、Kepler 第2法則を得ます。

楕円面積 (pi ab) を一周期で掃くので

[
pi ab
=
rac{ell}{2m}T.
]

従って

[
T=rac{2pi mab}{ell}.
]

(b^2=a^2(1-e^2)) と

[
ell^2=GMm^2a(1-e^2)
]

を使うと

[
T^2
=
rac{4pi^2m^2a^4(1-e^2)}
{GMm^2a(1-e^2)}
=
oxed{
rac{4pi^2}{GM}a^3
}.
]

最後に依存関係を整理します。

- **任意の中心力で成立**：トルク 0、角運動量保存、固定平面への縮約、面積速度一定、Kepler 第2法則。
- **保存中心力で成立**：有効ポテンシャルによる一次元化。
- **逆二乗引力に固有**：Binet 方程式の右辺が定数になること、円錐曲線軌道、負エネルギーで楕円となること、Kepler 第1法則、(T^2propto a^3) という第3法則の具体形。

同じ「中心力」という仮定だけから第1・第3法則まで出るわけではないことが重要です。
<!-- solution-end -->
