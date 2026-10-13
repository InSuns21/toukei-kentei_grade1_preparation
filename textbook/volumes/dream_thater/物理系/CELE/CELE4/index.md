# CELE4 円制限三体問題

<!-- definition-example-audit: strict -->

> **既習の道具**：[CELE2 のNewton多体系の運動方程式](../CELE2/index.md#prop-cele2-nbody-equations)、[CELE3 の中心配置と回転系](../CELE3/index.md#prop-cele3-rotating-equilibrium)、[AMECH5 のHamilton形式](../../AMECH/AMECH5/index.md#thm-amech5-hamilton-equations)を、質量を無視できる第三天体へ適用します。

## 1. 三体を一つ簡単にしても、なぜ運動の道は複雑なのか

[CELE3 の相対平衡](../CELE3/index.md#prop-cele3-rotating-equilibrium)では、二天体または三天体が一緒に回転する配置を見ました。そこで、重い二天体が円軌道を保ち、第三天体は重力を受けるが重い二天体には力を及ぼさない、という極限を考えます。第三天体は依然として**二つの動く重力源**の影響を同時に受けます。

慣性座標系では重力源の位置が時刻とともに変わります。重力源とともに回る座標系へ移れば、二天体は静止し、第三天体の運動は時間に陽に依存しない二自由度系となります。この変換で得られる保存量は、速度の二乗に制約を課します。一方、その保存量だけで軌道の形まで決まるわけではありません。

## 2. 質量比と無次元化

二つの主天体の質量を $M_1,M_2>0$、中心間距離を $a>0$、重力定数を $G>0$ とします。主天体は互いの重力だけで重心の周りを角速度 $n>0$ で円運動すると仮定します。[二体問題の円運動の式](../CELE1/index.md#thm-cele1-planar-integrability)を相対距離 $a$ に適用すると

$$
n^2=\frac{G(M_1+M_2)}{a^3}
$$

です。長さの単位を $a$、時間の単位を $1/n$、質量の単位を $M_1+M_2$ に取ります。これにより無次元時間に関する主天体の角速度は $1$、主天体間の距離は $1$、重力係数は $G(M_1+M_2)/(n^2a^3)=1$ です。

<a id="def-cele4-cr3bp"></a>

<!-- formal-statement-start -->
> **定義（平面円制限三体問題）**  
> $0<\mu<1$ とする。無次元化した質量 $1-\mu,\mu$ の二主天体が、重心を原点として距離 $1$、角速度 $1$ で反時計回りに円運動する。第三天体の質量は運動方程式に影響しないほど小さいものとし、第三天体への重力は残す。第三天体の運動を主天体の軌道平面に制限し、主天体との衝突を除いたモデルを平面円制限三体問題という。主天体と一緒に回る座標を $(x,y)$ とすると、主天体は常に $(-\mu,0)$、$(1-\mu,0)$ にある。
<!-- formal-statement-end -->

<!-- definition-example-start: def-cele4-cr3bp -->

**定義の確認**。$\mu=1/100$ として、質量 $99/100$ と $1/100$ の二天体を $(-0.01,0)$、$(0.99,0)$ に置きます。重心は $0.99(-0.01)+0.01(0.99)=0$、両者の距離は $0.99-(-0.01)=1$ です。慣性系で各点を $R_t$ だけ回転させれば角速度 $1$ の円運動となります。第三天体の位置はこれら二点と異なる平面上の点とし、二天体の運動を第三天体の位置によって変更しません。

<!-- definition-example-end -->

第三天体から第一・第二主天体までの無次元距離をそれぞれ

$$
r_1=\sqrt{(x+\mu)^2+y^2},\qquad
r_2=\sqrt{(x-1+\mu)^2+y^2}
$$

とします。運動領域は $r_1r_2>0$ です。以後の点はすべてこの非衝突領域に取ります。

## 3. 回転座標系の力学とHamiltonian

慣性位置を $q(t)=R_t s(t)$、$s=(x,y)$、反時計回りの $90^\circ$ 回転を $J(x,y)=(-y,x)$ とします。主天体の慣性位置も $R_t(-\mu,0)$、$R_t(1-\mu,0)$ です。回転行列が距離を保つため、重力の右辺は回転系で時刻を含みません。

<a id="prop-cele4-rotating-equations"></a>

<!-- formal-statement-start -->
> **命題（回転系の運動方程式とHamiltonian）**  
> $0<\mu<1$ の平面円制限三体問題で $r_1r_2>0$ とする。実効ポテンシャルを

$$
\Omega(x,y)=\frac{x^2+y^2}{2}
+\frac{1-\mu}{r_1}+\frac{\mu}{r_2}
$$

> と置くと、回転系の運動方程式は

$$
\ddot x-2\dot y=\Omega_x,\qquad
\ddot y+2\dot x=\Omega_y
$$

> となる。正準運動量 $p_x=\dot x-y$、$p_y=\dot y+x$ を用いた同じ運動のHamiltonianは

$$
K(x,y,p_x,p_y)=\frac{p_x^2+p_y^2}{2}
+yp_x-xp_y-\frac{1-\mu}{r_1}-\frac{\mu}{r_2}
$$

> であり、軌道上で時間に依存せず一定である。
<!-- formal-statement-end -->

### 証明の見取り図

慣性系の二階微分に、Coriolis加速度 $2J\dot s$ と遠心項 $-s$ が現れます。遠心項と二つの重力ポテンシャルの勾配をまとめて $\nabla\Omega$ とします。正準運動量には回転の分が含まれるので、速度そのものと取り違えないようにします。

<!-- proof-start -->
### 証明

[回転系の微分公式](../CELE3/index.md#prop-cele3-rotating-equilibrium)で角速度 $1$ とすると

$$
\dot q=R_t(\dot s+Js),\qquad
\ddot q=R_t(\ddot s+2J\dot s-s).
$$

無次元化したNewton方程式の右辺は

$$
-R_t\left[
(1-\mu)\frac{s-(-\mu,0)}{r_1^3}
+\mu\frac{s-(1-\mu,0)}{r_2^3}
\right].
$$

左から $R_{-t}$ を掛けて $-s$ を右辺へ移すと

$$
\ddot s+2J\dot s
=s-(1-\mu)\frac{(x+\mu,y)}{r_1^3}
-\mu\frac{(x-1+\mu,y)}{r_2^3}
=\nabla\Omega(s).
$$

$J\dot s=(-\dot y,\dot x)$ を成分で書けば主張の二式です。

次に正準Hamiltonian $K$ の偏微分を計算します。$U=(1-\mu)/r_1+\mu/r_2$ と置くと

$$
\dot x=K_{p_x}=p_x+y,\quad
\dot y=K_{p_y}=p_y-x,\quad
\dot p_x=-K_x=p_y+U_x,\quad
\dot p_y=-K_y=-p_x+U_y.
$$

前二式から $p_x=\dot x-y$、$p_y=\dot y+x$ です。これを微分して後二式に代入すると

$$
\ddot x-\dot y=p_y+U_x=\dot y+x+U_x,
\quad
\ddot y+\dot x=-p_x+U_y=-\dot x+y+U_y,
$$

よって $\ddot x-2\dot y=x+U_x=\Omega_x$、$\ddot y+2\dot x=y+U_y=\Omega_y$。非衝突領域で $K$ は滑らかで時間に陽に依存しないため、Hamilton方程式に沿う微分は

$$
\frac{dK}{dt}=\sum_{z=x,y}
\left(K_z K_{p_z}+K_{p_z}(-K_z)\right)=0
$$

です。
<!-- proof-end -->

この $K$ は慣性系の機械エネルギーと同じ式ではありません。回転系で定数になる量を次に読み替えます。

## 4. 回転系の保存量と通過可能領域

回転系ではCoriolis力は常に速度と直交します。したがって速度との内積を取ると仕事をするのは $\nabla\Omega$ だけです。

<a id="prop-cele4-jacobi-integral"></a>

<!-- formal-statement-start -->
> **命題（Jacobi積分）**  
> $0<\mu<1$ の平面円制限三体問題の任意の非衝突 $C^2$ 解に対し、Jacobi定数

$$
C=2\Omega(x,y)-\dot x^2-\dot y^2
$$

> は時間に依らず一定である。前節の回転系Hamiltonianとは $C=-2K$ の関係にある。
<!-- formal-statement-end -->

### 証明の見取り図

方程式へ速度を掛けると、二つのCoriolis交差項が相殺します。正準運動量を速度に戻せば $K$ と同じ保存量であることも分かります。

<!-- proof-start -->
### 証明

第一式に $\dot x$、第二式に $\dot y$ を掛けて加えると

$$
\dot x\ddot x+\dot y\ddot y
-2\dot x\dot y+2\dot y\dot x
=\Omega_x\dot x+\Omega_y\dot y.
$$

中央の二項が消えるため

$$
\frac{d}{dt}\frac{\dot x^2+\dot y^2}{2}
=\frac{d}{dt}\Omega(x(t),y(t)).
$$

移項して $2\Omega-\dot x^2-\dot y^2$ の導関数は零です。

また $p=(\dot x,\dot y)+Js$ を $K$ へ入れると、$yp_x-xp_y=-p\cdot Js$ なので

$$
\begin{aligned}
K&=\frac12|\dot s+Js|^2-(\dot s+Js)\cdot Js-U\\
&=\frac12|\dot s|^2-\frac12|Js|^2-U
=\frac12|\dot s|^2-\Omega.
\end{aligned}
$$

よって $C=-2K$ です。
<!-- proof-end -->

Jacobi定数は位置を与えるだけでは速度を決めません。ただし速度の二乗は負になれないため、一定 $C$ の解が位置空間で訪問できる場所を制限します。

<a id="def-cele4-hill-region"></a>

<!-- formal-statement-start -->
> **定義（Hill領域と零速度曲線）**  
> $0<\mu<1$、実数 $C$ を固定する。非衝突平面のうち

$$
\mathcal H_C=\{(x,y):r_1r_2>0,\ 2\Omega(x,y)\ge C\}
$$

> をJacobi定数 $C$ のHill領域（位置空間で運動学的に許される領域）といい、その内部の等式 $2\Omega(x,y)=C$ の軌跡を零速度曲線という。$2\Omega<C$ の領域は、同じ $C$ を持つ実軌道が通過できない。
<!-- formal-statement-end -->

<!-- definition-example-start: def-cele4-hill-region -->

**定義の確認**。$\mu=0.01$、$(x,y)=(1/2-\mu,\sqrt3/2)=(0.49,\sqrt3/2)$ では $r_1=r_2=1$ です。したがって $2\Omega=x^2+y^2+2=2.9901$。$C=3$ なら $2\Omega<C$ なのでこの点はHill領域の外です。$C=2.9901$ なら等式が成り立って零速度曲線上、$C=2.98$ ならHill領域内です。等式上で速度は零ですが、そこで永遠に静止するにはさらに $\nabla\Omega=0$ が必要です。

<!-- definition-example-end -->

零速度曲線は「すべての軌道が通る曲線」ではありません。あくまで**速度二乗が零になる位置の境界**です。またHill領域内にあることは、任意の初期状態からそこへ到達できるという十分条件ではありません。

## 5. Lagrange点を五つとも求める

第三天体が回転座標系で動かない点は、位置だけで決められます。速度・加速度が零の式から $\nabla\Omega=0$ が必要十分です。

<a id="def-cele4-lagrange-point"></a>

<!-- formal-statement-start -->
> **定義（円制限三体問題のLagrange点）**  
> $0<\mu<1$ の平面円制限三体問題で、非衝突点 $(x_*,y_*)$ が $\Omega_x(x_*,y_*)=\Omega_y(x_*,y_*)=0$ を満たすとき、その位置で $\dot x=\dot y=0$ とした解は回転座標系で静止する。この平衡位置をLagrange点という。
<!-- formal-statement-end -->

<!-- definition-example-start: def-cele4-lagrange-point -->

**定義の確認**。$\mu=0.01$、$s=(0.49,\sqrt3/2)$ では $r_1=r_2=1$ です。$S=(1-\mu)/r_1^3+\mu/r_2^3=1$ なので $\Omega_y=y(1-S)=0$。また $\Omega_x=x-(1-\mu)(x+\mu)-\mu(x-1+\mu)=x-(x)=0$ です。よってこの点で速度を零にすれば、回転系の方程式から加速度も零になります。

<!-- definition-example-end -->

<a id="thm-cele4-five-lagrange-points"></a>

<!-- formal-statement-start -->
> **定理（五つのLagrange点）**  
> $0<\mu<1$ の平面円制限三体問題には非衝突平衡点がちょうど五つある。共線点 $L_1,L_2,L_3$ は $y=0$ 上でそれぞれ

$$
-\mu<x_{L_1}<1-\mu,\qquad
x_{L_2}>1-\mu,\qquad
x_{L_3}<-\mu
$$

> の区間に唯一つずつ存在する。正三角形点は

$$
L_4=\left(\frac12-\mu,\frac{\sqrt3}{2}\right),\qquad
L_5=\left(\frac12-\mu,-\frac{\sqrt3}{2}\right).
$$
<!-- formal-statement-end -->

### 証明の見取り図

$y=0$ なら平衡条件は一変数関数の根となり、各非衝突区間で狭義増加します。$y\ne0$ なら $\Omega_y=0$ と $\Omega_x=0$ を組み合わせて二つの距離がともに $1$ になることを示します。

<!-- proof-start -->
### 証明

偏微分は

$$
\Omega_x=x-\frac{(1-\mu)(x+\mu)}{r_1^3}
-\frac{\mu(x-1+\mu)}{r_2^3},
\quad
\Omega_y=y\left(1-\frac{1-\mu}{r_1^3}-\frac{\mu}{r_2^3}\right).
$$

まず $y=0$ とすると $\Omega_y=0$ は自動的に成立します。残る $f(x)=\Omega_x(x,0)$ は $x=-\mu,1-\mu$ で定義されません。各開区間で

$$
f'(x)=1+\frac{2(1-\mu)}{|x+\mu|^3}
+\frac{2\mu}{|x-1+\mu|^3}>0.
$$

左側区間では $f(-\infty)=-\infty$、$f(-\mu-0)=+\infty$、中間区間では $f(-\mu+0)=-\infty$、$f((1-\mu)-0)=+\infty$、右側区間では $f((1-\mu)+0)=-\infty$、$f(+\infty)=+\infty$ です。連続性・狭義単調性から各区間にちょうど一根があります。

次に $y\ne0$ とします。$\Omega_y=0$ を $y$ で割って

$$
S=\frac{1-\mu}{r_1^3}+\frac{\mu}{r_2^3}=1
$$

を得ます。第一式を $xS$ を使って書き直すと

$$
\Omega_x=x(1-S)+\mu(1-\mu)
\left(\frac1{r_2^3}-\frac1{r_1^3}\right).
$$

ここで $\mu(1-\mu)>0$、$S=1$ より $r_1=r_2$。その共通値を $r$ とすると $S=1/r^3=1$ だから $r=1$ です。距離の二乗の差を取って

$$
(x+\mu)^2-(x-1+\mu)^2=0
\quad\Longrightarrow\quad x=\frac12-\mu.
$$

さらに $r_1^2=(1/2)^2+y^2=1$ から $y=\pm\sqrt3/2$。他の解はありません。
<!-- proof-end -->

これらは[CELE3 の正三角形中心配置](../CELE3/index.md#prop-cele3-lagrange-equilateral)と形が対応しています。ただし今は第三天体が主天体に影響を戻さない極限であり、前章の有限質量三体と同じ力学系ではありません。

## 6. 平衡点の線形安定性

平衡点が存在するだけでは、そこから少し動かした軌道が近くに留まるかは分かりません。位置摂動 $(\xi,\eta)$ を導入し、平衡点におけるHessianを $A=\Omega_{xx}$、$B=\Omega_{xy}$、$D=\Omega_{yy}$ と書きます。一次変分方程式は

$$
\ddot\xi-2\dot\eta=A\xi+B\eta,\qquad
\ddot\eta+2\dot\xi=B\xi+D\eta.
$$

指数型 $(\xi,\eta)=e^{\lambda t}(u,v)$ を代入して非零解の条件を取ると

$$
\begin{vmatrix}
\lambda^2-A&-2\lambda-B\\
2\lambda-B&\lambda^2-D
\end{vmatrix}=0,
$$

すなわち

$$
\lambda^4+(4-A-D)\lambda^2+(AD-B^2)=0.
$$

<a id="thm-cele4-collinear-instability"></a>

<!-- formal-statement-start -->
> **定理（共線点の線形不安定性）**  
> $0<\mu<1$ の平面円制限三体問題では、三つの共線点 $L_1,L_2,L_3$ の線形化行列は、必ず正の実固有値を持つ。したがっていずれも線形不安定である。
<!-- formal-statement-end -->

### 証明の見取り図

共線点でHessianの非対角項は零です。横方向の曲率が負、縦方向が正であることを示すと、特性多項式を $\lambda^2$ の二次式と見たとき定数項が負になり、実の指数成長が現れます。

<!-- proof-start -->
### 証明

$y=0$ で $r_1,r_2>0$ とし $S=(1-\mu)/r_1^3+\mu/r_2^3$ とすると、距離関数を二回微分して

$$
\Omega_{xx}=1+2S>0,\quad
\Omega_{yy}=1-S,\quad
\Omega_{xy}=0.
$$

$L_1$ では $r_1+r_2=1$ かつ $0<r_1,r_2<1$ なので $S>(1-\mu)+\mu=1$ です。

$L_2$ では $x>1-\mu>0$ かつ $r_2<r_1$。前節の恒等式 $\Omega_x=x(1-S)+\mu(1-\mu)(r_2^{-3}-r_1^{-3})=0$ より、第二項は正です。$x>0$ なので $1-S<0$ です。

$L_3$ では $x<-\mu<0$ かつ $r_1<r_2$。同じ恒等式の第二項は負ですから $x(1-S)>0$。$x<0$ より $1-S<0$ です。

従って全共線点で $\Omega_{xx}>0$、$\Omega_{yy}<0$、$\Omega_{xy}=0$。特性式に $u=\lambda^2$ を入れた二次式の定数項は $\Omega_{xx}\Omega_{yy}<0$ です。その二根は実で異符号（判別式も正）なので、正根 $u_+>0$ が存在します。$\lambda=+\sqrt{u_+}$ は正の実固有値です。
<!-- proof-end -->

正三角形点の判定では質量比が本質的に現れます。主天体を交換しても同じ系なので、以下の判定では $0<\mu\le1/2$ とラベル付けします。

<a id="thm-cele4-triangular-stability"></a>

<!-- formal-statement-start -->
> **定理（正三角形点の線形安定条件）**  
> $0<\mu\le1/2$ の平面円制限三体問題で、$L_4,L_5$ の特性方程式は

$$
\lambda^4+\lambda^2+\frac{27}{4}\mu(1-\mu)=0
$$

> である。$\mu_{\mathrm R}=(1-\sqrt{23/27})/2$ と置くと、$0<\mu<\mu_{\mathrm R}$ では線形化された全解は有界な振動の和である。$\mu>\mu_{\mathrm R}$ では実部が正の固有値を持つ。$\mu=\mu_{\mathrm R}$ でも重複した虚固有値に非自明なJordanブロックがあり、時間に比例して増大する線形解が存在する。これは**線形系についての判定**であり、非線形安定性の結論ではない。
<!-- formal-statement-end -->

### 証明の見取り図

三角点では二つの主天体までの距離がともに $1$ です。Hessianの成分を直接求め、$\lambda^2$ の二次式の判別式 $1-27\mu(1-\mu)$ の符号を判定します。境界では単に固有値が虚数というだけでは足りず、重複固有値の固有ベクトル数も調べます。

<!-- proof-start -->
### 証明

三角点では $r_1=r_2=1$、$x+\mu=1/2$、$x-1+\mu=-1/2$、$y=\pm\sqrt3/2$ です。$\Omega_{xx}=1-S+3[(1-\mu)(x+\mu)^2+\mu(x-1+\mu)^2]$ などへ代入すると

$$
A=\frac34,\quad D=\frac94,\quad
B=\pm\frac{3\sqrt3}{4}(1-2\mu).
$$

従って $A+D=3$、また

$$
AD-B^2=\frac{27}{16}\{1-(1-2\mu)^2\}
=\frac{27}{4}\mu(1-\mu).
$$

特性式は主張の式です。$u=\lambda^2$ と置けば

$$
u_{\pm}=\frac{-1\pm\sqrt{1-27\mu(1-\mu)}}2.
$$

$0<\mu<\mu_{\mathrm R}$ では $0<27\mu(1-\mu)<1$ より、$u_\pm$ は異なる負の実数です。したがって $\lambda=\pm i\sqrt{-u_\pm}$ は相異なる純虚固有値で、線形系は対角化でき、解は有界な振動の和です。

$\mu>\mu_{\mathrm R}$ では $u_\pm$ が非実共役の対となります。非実数の平方根には非零の実部があるので、正の実部を持つ $\lambda$ が存在します。

境界では $u_+=u_-=-1/2$、固有値 $\lambda=\pm i/\sqrt2$ はそれぞれ代数的重複度 $2$ です。しかし固有モードを決める $2\times2$ 行列の非対角成分 $-2\lambda-B$ は、$B$ が実数で $2\lambda$ が零でない純虚数のため、零になりません。行列式は零かつ行列は零行列でないので階数は $1$、固有空間は一次元です。よって各重複固有値に長さ二のJordan鎖があり、$t e^{\pm it/\sqrt2}$ の成分を持つ非有界な線形解が存在します。

$27\mu(1-\mu)=1$ の小さい方の根を解くと $\mu_{\mathrm R}=(1-\sqrt{1-4/27})/2$ となります。
<!-- proof-end -->

$\mu_{\mathrm R}\simeq0.0385209$ はしばしばRouthの限界質量比と呼ばれます。$\mu=0.01$ なら $27\mu(1-\mu)=0.2673<1$ なので三角点は線形振動型ですが、この結果から任意に大きい時間の非線形安定性を直ちに断定することはできません。

## 7. Hill領域の「首」はいつ開くか

平衡点 $L_i$ におけるJacobi値を $C_i=2\Omega(L_i)$ と書きます。特に共線点では $\Omega_{xx}>0$、$\Omega_{yy}<0$ だったので、$L_i$ の近傍で位置変位 $(\xi,\eta)$ に対して

$$
2\Omega(L_i+(\xi,\eta))
=C_i+\Omega_{xx}(L_i)\xi^2+\Omega_{yy}(L_i)\eta^2
+o(\xi^2+\eta^2)
$$

です（混合二階微分は零）。境界がこの鞍点を通ると、二つの許容領域が細い道でつながる形へ変化します。

<a id="prop-cele4-neck-threshold"></a>

<!-- formal-statement-start -->
> **命題（共線点近傍の首の閾値）**  
> 質量比 $0<\mu<1$ の平面円制限三体問題で、$L_i$（$i=1,2,3$）を共線点の一つとする。閾値を

$$
C_i=2\Omega(L_i)
$$

> と定める。十分小さい近傍では、$C>C_i$ のHill領域は鞍点の両側で分離し、$C<C_i$ では鞍点を通る局所的な許容通路が開く。実際の軌道の通過や大域輸送量は、この条件だけでは決まらない。
<!-- formal-statement-end -->

### 証明の見取り図

Hessianの正負一つずつという性質が局所的な鞍型を与えます。$C$ を $C_i$ の上下へ動かし、不等式 $2\Omega\ge C$ が点の周りでどこを許すか確かめます。

<!-- proof-start -->
### 証明

共線点でHessianの符号は $(+,-)$ なので、二変数Taylor展開を行うと、$a=\Omega_{xx}(L_i)>0$、$b=-\Omega_{yy}(L_i)>0$ を用いて

$$
2\Omega(L_i+(\xi,\eta))-C_i=a\xi^2-b\eta^2+R(\xi,\eta),
\qquad R=o(\xi^2+\eta^2)
$$

です。任意の $0<\varepsilon<\min(a,b)/2$ に対し、十分小さい円盤内では $|R(\xi,\eta)|\le\varepsilon(\xi^2+\eta^2)$ とできます。

$C>C_i$ のとき、縦軸 $\xi=0$ 上では

$$
2\Omega-C_i=-b\eta^2+R(0,\eta)
\le-(b-\varepsilon)\eta^2\le0<C-C_i.
$$

したがって縦軸の全点が禁止され、左右の許容部分を円盤内で結ぶ道は作れません。

$C<C_i$ のとき、横軸 $\eta=0$ 上では

$$
2\Omega-C_i=a\xi^2+R(\xi,0)
\ge(a-\varepsilon)\xi^2\ge0>C-C_i.
$$

よって原点をまたぐ十分短い水平線分はすべて許容されます。これが局所的な首の開閉です。動力学的にその線分をなぞる軌道があるとは主張していません。
<!-- proof-end -->

**数値例（$\mu=0.01$）**。$y=0$ の平衡条件を三つの区間でそれぞれ解くと

| 点 | $x$ | $C_i=2\Omega(L_i)$ |
|---|---:|---:|
| $L_1$ | $0.848079$ | $3.167641$ |
| $L_2$ | $1.146765$ | $3.154320$ |
| $L_3$ | $-1.004167$ | $3.009998$ |
| $L_4,L_5$ | $0.490000$ | $2.990100$ |

例えば $C=3.16$ は $C_2<C<C_1$ です。$L_1$ の首は開く側ですが $L_2$ の首は閉じる側です。**閾値以下になったら必ず通過する**のではなく、通過が位置空間の障壁で禁止されなくなるという意味です。これが次章でPoincaré断面や個々の軌道をさらに調べる理由です。

## 8. 演習：保存量・平衡・安定性・輸送をつなぐ

### Level A

<a id="ex-cele4-a01"></a>
**A1. 質量比と回転中心。** $\mu=1/4$ の無次元主天体の位置・質量を答え、重心と距離を直接検算せよ。

- Level: A

<!-- solution-start -->
**詳細解答。** 質量は $3/4,1/4$、座標は $(-1/4,0),(3/4,0)$。重心の $x$ 座標は $(3/4)(-1/4)+(1/4)(3/4)=-3/16+3/16=0$。距離は $3/4-(-1/4)=1$ です。[モデルの定義](#def-cele4-cr3bp)の重心条件と距離条件を両方満たします。
<!-- solution-end -->

<a id="ex-cele4-a02"></a>
**A2. 速度と正準運動量。** 回転系で $(x,y)=(1/2,0)$、$(\dot x,\dot y)=(0,1/2)$ とする。$p_x,p_y$ とHamiltonianの速度表示に現れる $\dot x^2+\dot y^2$ を求めよ。

- Level: A

<!-- solution-start -->
**詳細解答。** [回転系Hamiltonian](#prop-cele4-rotating-equations)で $p_x=\dot x-y=0$、$p_y=\dot y+x=1/2+1/2=1$ です。速度の二乗和は $0^2+(1/2)^2=1/4$。$p_x^2+p_y^2=1$ と等しくないことが、正準運動量を速度と誤認しないための検算になります。
<!-- solution-end -->

<a id="ex-cele4-a03"></a>
**A3. Jacobi定数による禁止。** ある非衝突点で $\Omega=1.52$ とする。$C=3.10$ の実軌道がその点を訪問できるか判定し、そこへ到達したと仮定した速度二乗の値も示せ。

- Level: A

<!-- solution-start -->
**詳細解答。** [Jacobi積分](#prop-cele4-jacobi-integral)から速度二乗は $2\Omega-C=3.04-3.10=-0.06$ です。実数速度の二乗和は非負なので矛盾し、その点は[Hill領域](#def-cele4-hill-region)の外です。
<!-- solution-end -->

<a id="ex-cele4-a04"></a>
**A4. 三角点を直接検証する。** $\mu=1/4$ のとき $L_4$ の座標・二主天体までの距離を求め、$\Omega_y=0$ と $\Omega_x=0$ を確認せよ。

- Level: A

<!-- solution-start -->
**詳細解答。** 座標は $(1/4,\sqrt3/2)$。第一主天体は $(-1/4,0)$、第二は $(3/4,0)$ なので、距離の二乗はともに $(1/2)^2+(\sqrt3/2)^2=1$ です。$S=(3/4)/1^3+(1/4)/1^3=1$ より $\Omega_y=y(1-S)=0$。また

$$
\Omega_x=\frac14-\frac34\frac12-\frac14\left(-\frac12\right)
=\frac14-\frac38+\frac18=0.
$$

よって[Lagrange点の定義](#def-cele4-lagrange-point)を満たします。
<!-- solution-end -->

<a id="ex-cele4-a05"></a>
**A5. 三角点のJacobi値。** 任意の $0<\mu<1$ で $C_4=C_5=3-\mu+\mu^2$ を導き、$\mu=0.01$ の値を求めよ。

- Level: A

<!-- solution-start -->
**詳細解答。** [五つのLagrange点の定理](#thm-cele4-five-lagrange-points)から、三角点では $r_1=r_2=1$、$x=1/2-\mu$、$y^2=3/4$ です。従って

$$
2\Omega=x^2+y^2+2(1-\mu)+2\mu
=(1/2-\mu)^2+3/4+2=3-\mu+\mu^2.
$$

$\mu=0.01$ を入れると $3-0.01+0.0001=2.9901$。
<!-- solution-end -->

### Level B

<a id="ex-cele4-b01"></a>
**B1. 共線点の個数。** $0<\mu<1$ とし、$f(x)=x-(1-\mu)(x+\mu)/|x+\mu|^3-\mu(x-1+\mu)/|x-1+\mu|^3$ を考える。各非衝突区間の単調性と端点極限から根の個数を求めよ。

- Level: B

<!-- solution-start -->
**詳細解答。** $z/|z|^3$ の導関数は $-2/|z|^3$（$z\ne0$）なので

$$
f'(x)=1+\frac{2(1-\mu)}{|x+\mu|^3}
+\frac{2\mu}{|x-1+\mu|^3}>0.
$$

左区間 $(-\infty,-\mu)$ では $f(-\infty)=-\infty$、$x\uparrow-\mu$ で第一重力項は $+\infty$。中間区間 $(-\mu,1-\mu)$ では $x\downarrow-\mu$ で第一項が $-\infty$、$x\uparrow1-\mu$ で第二項が $+\infty$。右区間 $(1-\mu,\infty)$ では $x\downarrow1-\mu$ で第二項が $-\infty$、$f(\infty)=+\infty$。各区間で連続・狭義増加ゆえ零点はちょうど一個、合計三個です。
<!-- solution-end -->

<a id="ex-cele4-b02"></a>
**B2. 平衡点の特性式。** $A=\Omega_{xx},B=\Omega_{xy},D=\Omega_{yy}$ を平衡点で評価する。一次変分方程式から $\lambda^4+(4-A-D)\lambda^2+AD-B^2=0$ を導き、$A>0,D<0,B=0$ のとき不安定な理由を示せ。

- Level: B

<!-- solution-start -->
**詳細解答。** $(\xi,\eta)=e^{\lambda t}(u,v)$ を一次変分へ代入すると $(\lambda^2-A)u+(-2\lambda-B)v=0$、$(2\lambda-B)u+(\lambda^2-D)v=0$。非零の $(u,v)$ があるには

$$
(\lambda^2-A)(\lambda^2-D)-(-2\lambda-B)(2\lambda-B)=0.
$$

第二積は $-4\lambda^2+B^2$ なので、展開すると表示の四次式です。$B=0$ かつ $AD<0$ なら $u_0=\lambda^2$ の二次方程式は定数項が負で根が異符号です。正根 $u_0>0$ から $\lambda=\sqrt{u_0}>0$ が生じ、線形解 $e^{\lambda t}$ が増大します。
<!-- solution-end -->

<a id="ex-cele4-b03"></a>
**B3. 三角点の安定性の境界。** $\mu=0.01$ と $\mu=0.05$ の三角点について $1-27\mu(1-\mu)$ を計算し、固有値の実部に基づき線形振動型か指数不安定型かを判定せよ。

- Level: B

<!-- solution-start -->
**詳細解答。** $\mu=0.01$ では $27\mu(1-\mu)=27(0.01)(0.99)=0.2673$、判別式は $0.7327>0$。さらに $0<0.2673<1$ なので $\lambda^2=(-1\pm\sqrt{0.7327})/2$ は異なる負実数で、四固有値は純虚数です。$\mu=0.05$ では $27(0.05)(0.95)=1.2825$、判別式は $-0.2825<0$。$\lambda^2$ は非実数なので平方根に非零の実部があり、正の実部を持つ固有値が存在します。これは[三角点の線形安定条件](#thm-cele4-triangular-stability)であり、非線形安定性を主張しません。
<!-- solution-end -->

<a id="ex-cele4-b04"></a>
**B4. 局所の首の開閉。** 共線点の局所模型を $2\Omega=C_i+4X^2-Y^2$ とする。$C=C_i+0.04$ と $C=C_i-0.04$ に対してHill領域を不等式で書き、原点近傍に連結した道があるかを比較せよ。

- Level: B

<!-- solution-start -->
**詳細解答。** [Hill領域](#def-cele4-hill-region)の条件は $2\Omega\ge C$ です。高い値では $4X^2-Y^2\ge0.04$、従って $|X|\ge\sqrt{(Y^2+0.04)/4}\ge0.1$。原点を挟む左右は分離します。低い値では $4X^2-Y^2\ge-0.04$、$X=0$ でも $|Y|\le0.2$ を満たす帯があり、$(-0.1,0)$ から $(0.1,0)$ まで $Y=0$ に沿う道を取れます。これは局所的な幾何であり、特定の軌道が横断するとは限りません。
<!-- solution-end -->

### Level C

<a id="ex-cele4-c01"></a>
**C1. 質量比 $0.01$ のLagrange点と輸送閾値。** $0<\mu=0.01<1/2$ とする。(i) $y=0$ の平衡方程式を記し、各区間の数値根 $x_{L_1}\simeq0.848079$, $x_{L_2}\simeq1.146765$, $x_{L_3}\simeq-1.004167$ を代入検算せよ。(ii) $L_1$ の $r_1,r_2$ と $C_1$ を求めよ。(iii) $L_4,L_5$ の $C_4$ と線形安定性を判定せよ。(iv) $C=3.16$ のとき $L_1,L_2$ 近傍の首について何が許されるか説明せよ。数値は小数第六位程度でよい。

- Level: C

<!-- solution-start -->
**詳細解答。** (i) [平衡点条件](#thm-cele4-five-lagrange-points)から

$$
f(x)=x-0.99\frac{x+0.01}{|x+0.01|^3}
-0.01\frac{x-0.99}{|x-0.99|^3}=0.
$$

$L_1$ の表示値では $r_1=0.858079$、$r_2=0.141921$、位置の符号を用いると

$$
f(x_{L_1})=0.848079-\frac{0.99}{(0.858079)^2}
+\frac{0.01}{(0.141921)^2}\simeq0.
$$

$L_2$ では両差が正なので

$$
f(x_{L_2})=1.146765-\frac{0.99}{(1.156765)^2}
-\frac{0.01}{(0.156765)^2}\simeq0.
$$

$L_3$ では両差が負なので

$$
f(x_{L_3})=-1.004167+\frac{0.99}{(0.994167)^2}
+\frac{0.01}{(1.994167)^2}\simeq0.
$$

これらは丸め値であり、厳密な根の存在一意性は $f'>0$ と端点極限によります。

(ii) $L_1$ で $r_1=0.858079$, $r_2=0.141921$ として

$$
C_1=x_{L_1}^2+\frac{2(0.99)}{r_1}
+\frac{2(0.01)}{r_2}\simeq3.167641.
$$

(iii) $L_4=(0.49,\sqrt3/2)$、$L_5=(0.49,-\sqrt3/2)$ であり、[三角点のJacobi値](#thm-cele4-five-lagrange-points)を直接代入すると $C_4=C_5=3-\mu+\mu^2=2.9901$。$27\mu(1-\mu)=0.2673<1$ で、しかも閾値より小さいため[三角点の線形安定条件](#thm-cele4-triangular-stability)から線形化された解は有界振動型です。

(iv) 同様に $L_2$ の $r_1=1.156765$, $r_2=0.156765$ を $C_2=x_{L_2}^2+1.98/r_1+0.02/r_2$ に入れると $C_2\simeq3.154320$。$C_2<3.16<C_1$ だから $C=3.16$ は $L_1$ の閾値より低く $L_2$ の閾値より高いです。[首の閾値](#prop-cele4-neck-threshold)により $L_1$ 付近には局所的な許容接続が生まれ、$L_2$ 付近の接続はまだ禁止されています。実際に通過する軌道を得るには速度方向など追加情報が必要です。
<!-- solution-end -->

## 9. 次章へ：保存量があるのに軌道は解ききれない

この章で、二つの円運動する主天体を固定した平面問題には、時間不変のHamiltonianとJacobi積分があることが分かりました。また五つの平衡点の存在は証明でき、共線点は線形不安定、三角点は小さい質量比では線形振動型という区別ができました。

しかしHill領域の境界が分かっても、**領域の中をどの軌道がどのように通るか**は決まりません。次のCELE5では、この残る自由さを摂動、Poincaré断面、第一積分の制約という観点から調べます。
