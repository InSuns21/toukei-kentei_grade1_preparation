# SYZ1-12 楕円曲線の完全計算

<!-- definition-example-audit: strict -->

## 1. 一次元で鏡像の交換を本当に計算する

[semi-flat双対トーラスの複素チャート](../SYZ1-10/index.md#def-syz1-10-semi-flat-complex-chart)は基底のシンプレクティック周期とファイバーの平坦接続からできた。[HessianによるKähler計量](../SYZ1-11/index.md#thm-syz1-11-kahler-from-hessian)は、その複素チャートに追加の計量を与えた。しかし「複素構造と面積が鏡像で交換される」と言うだけでは、どの周期を1とし、どの定数を面積と呼ぶのかが不明なままである。

そこで最も小さなCalabi–Yauである平坦な楕円曲線を、**複素周期、面積、SLag円周、二つのアフィン周期、双対複素周期、双対面積**まで一続きに計算する。曲線全体が滑らかなトーラス束であるため、この模型には特異ファイバーはない。

[既習の複素化Kählerパラメータ](../../CYG/CYG1-13/index.md#def-cyg1-13-complexified-kahler)は、B場とKähler類の係数を複素数にまとめたものである。本講では楕円曲線の向きを固定し、整数2-コホモロジーの正の生成元を $H$ として規格化する。

$$
H\in H^2(E_\tau;\mathbb Z),\qquad
\int_{E_\tau}H=1.
$$

既講の2形式には $2\pi$ を掛ける規約がある。本講の形式との対応、ならびに複素化した係数は次の通りである。

$$
B_{\rm old}=2\pi B,\qquad
\omega_{\rm old}=2\pi\omega,\qquad
\rho=\beta+iA.
$$

したがって、後述のB場の指数位相と面積の式は両立する。

最初に固定する規約は次の通りである。

- $x,y,t$ はすべて周期1の無次元座標で、$dx\wedge dy$ を正の向きとする。
- $a,\beta\in\mathbb R$、$b,A>0$、$\tau=a+ib$、$\rho=\beta+iA$ とする。
- 面積は $\int_X\omega=A$。$B$場の位相は $\exp(2\pi i\int_XB)$。
- 双対化に現れる逆数の単位は1に固定する（物理でいう $\alpha'=1$ の規格化）。長さの単位を変えるならこの規格化も変える。

$\tau$ は複素格子の形、$\rho$ は $B$場と面積を一緒に符号化する数である。この二つを独立に動かせることが計算の要点になる。

## 2. 楕円曲線とSLag円周ファイバー

$\tau$ の虚部 $b$ が正なら、$1,\tau$ は実一次独立なので $\mathbb Z+\tau\mathbb Z$ は複素平面の格子になる。周期1の実座標によって $z=x+\tau y$ と書く。$x$ の一周で $z$ は1、$y$ の一周で $\tau$ だけ増える。

<a id="def-syz1-12-elliptic-data"></a>

<!-- formal-statement-start -->
> **定義（規格化した楕円曲線の幾何データ）**  
> $\tau=a+ib$（$b>0$）と $A>0$ に対し、楕円曲線 $E_\tau$ と平坦計量 $g$、Kähler形式 $\omega$、正則1形式 $\Omega$、および実2形式 $B$ を次で定める。

$$
E_\tau=\mathbb C/(\mathbb Z+\tau\mathbb Z),\quad
g=\frac A b|dz|^2,\quad
\omega=A\,dx\wedge dy,\quad
\Omega=dz,\quad B=\beta\,dx\wedge dy.
$$

> ここで $z=x+\tau y$、$(x,y)\in(\mathbb R/\mathbb Z)^2$ である。**複素化Kählerパラメータ**を $\rho=\beta+iA$ と記す。$\beta$ は $B$場の積分値を表し、整数だけ変えると指数位相は不変である。
<!-- formal-statement-end -->

この計量を座標で判定するとき、$G_{ij}=g(\partial_i,\partial_j)$（$i,j\in\{x,y\}$）を座標基底 $(\partial_x,\partial_y)$ に関する係数行列とする。$g=(A/b)|dz|^2$ はベクトルの長さの二乗を与える対称な二次形式である。一方、$\omega$ が同じ計量のKähler形式であることは、複素座標で $\omega=(A/b)(i/2)dz\wedge d\bar z$ を確認して判定する。これらは別々の判定であり、行列式による面積計算は後の命題で導く。

<!-- definition-example-start: def-syz1-12-elliptic-data -->
### 直接例：傾いた格子でも面積は $A$

$a=1/2$、$b=2$、$A=3$、$\beta=1/4$ とする。$z=x+(1/2+2i)y$ で、$dz=dx+(1/2+2i)dy$。展開すると

$$
g=\frac32\left((dx+\tfrac12dy)^2+4dy^2\right),\qquad
\omega=3dx\wedge dy,\qquad B=\tfrac14dx\wedge dy.
$$

$z$ の二つの周期 $1,1/2+2i$ は実一次独立である。座標変換 $(x,y)\mapsto(\operatorname{Re}z,\operatorname{Im}z)=(x+y/2,2y)$ のJacobianの行列式は $2>0$ なので、$z$ は局所複素座標として非退化である。$g(V,V)=\frac32((V^x+\frac12V^y)^2+4(V^y)^2)>0$（$V\ne0$）であり、係数が整数平行移動に不変なので $g,\omega,\Omega,B$ は格子商へ降りる。また
$$
\frac i2 dz\wedge d\bar z=2\,dx\wedge dy,\qquad
\frac A b\frac i2 dz\wedge d\bar z=\frac32\cdot2\,dx\wedge dy
=3\,dx\wedge dy=\omega.
$$
これで $\omega$ が計量 $g$ と複素構造に対応するKähler形式であることも判定できた。基本正方形上の積分で $\int\omega=3$、$\int B=1/4$、従って $B$位相は $e^{\pi i/2}=i$。**定義の確認**：格子の離散性、局所座標の非退化性、計量・形式の良定義性、正値性、Kähler形式の対応、面積と位相まで直接確かめた。
<!-- definition-example-end -->

<a id="prop-syz1-12-metric-area"></a>

<!-- formal-statement-start -->
> **命題（複素周期とシンプレクティック面積の分離）**  
> 上の $\tau=a+ib$、$A>0$、$E_\tau$ において、実座標基底での計量行列 $G$、Kähler形式、全体面積は

$$
G=\frac A b
\begin{pmatrix}1&a\\a&a^2+b^2\end{pmatrix},
\quad
\frac i2dz\wedge d\bar z=b\,dx\wedge dy,
\quad
\det G=A^2,\quad \int_{E_\tau}\omega=A.
$$

> と表される。従って $a,b$ が複素形状、$A$ が全体面積を独立に指定する。
<!-- formal-statement-end -->

### 証明の見取り図

$dz$ の実部と虚部を別々に展開し、行列式で面積要素を検算する。$z$ 平面の辺が $1$ と $\tau$ の平行四辺形のユークリッド面積は $b$ だが、計量係数 $A/b$ がこれを $A$ に変える。

<!-- proof-start -->
### 証明

$dz=dx+a\,dy+ib\,dy$ なので

$$
|dz|^2=(dx+a\,dy)^2+b^2(dy)^2
=(dx)^2+2a\,dx\,dy+(a^2+b^2)(dy)^2.
$$

ここで $2dx\,dy$ は計量の対称な交差項である。外積は

$$
\begin{aligned}
dz\wedge d\bar z
&=(dx+\tau\,dy)\wedge(dx+\bar\tau\,dy)\\
&=(\bar\tau-\tau)dx\wedge dy
=-2ib\,dx\wedge dy.
\end{aligned}
$$

だから $(i/2)dz\wedge d\bar z=b\,dx\wedge dy$。さらに

$$
\det G=\left(\frac A b\right)^2
\left((a^2+b^2)-a^2\right)=A^2.
$$

計量の体積要素は $\sqrt{\det G}\,dx\,dy=A\,dx\,dy=\omega$。$x,y$ の基本領域はそれぞれ長さ1なので積分は $A$ になる。
<!-- proof-end -->

次に $y$ を固定し、$x$ だけを一周させる円周を考える。これはSYZにおけるファイバーの最小模型である。複素1次元では2形式を実1次元の円周へ制限すると必ず0になるが、それだけで特殊Lagrange（SLag）条件をすべて確かめたことにはならない。正則体積形式の位相と向きを同時に調べる。

<a id="thm-syz1-12-slag-fibration"></a>

<!-- formal-statement-start -->
> **定理（楕円曲線の滑らかなSLag円周束）**  
> 上の $E_\tau$ と $g,\omega,\Omega$ に対し、写像 $\pi:E_\tau\to\mathbb R/\mathbb Z$、$\pi([x,y])=[y]$ を取る。各ファイバー $L_y=\{[x,y]:x\in\mathbb R/\mathbb Z\}$ は、$+\partial_x$ による向きで位相0のSLag円周である。ファイバー長とその直交水平方向の基底一周長はそれぞれ

$$
\ell_f=\sqrt{\frac A b},\qquad
\ell_B=\sqrt{Ab},\qquad \ell_f\ell_B=A.
$$

> この束には臨界点も特異ファイバーもない。
<!-- formal-statement-end -->

### 証明の見取り図

[SLagの位相条件](../SYZ1-04/index.md#prop-syz1-04-slag-conditions)では、$\omega$ の制限が0、$\operatorname{Im}\Omega$ の制限が0、正の向きで $\operatorname{Re}\Omega$ が正であることを確認する。長さは計量行列の接成分と、直交化した水平ベクトルから読む。

<!-- proof-start -->
### 証明

$\pi$ は $y$ 座標の射影なので $d\pi(\partial_y)=1$、全点で微分は全射である。$L_y$ の接方向は $\partial_x$。1次元の接空間上で2形式 $\omega$ は0になり、かつ

$$
\Omega(\partial_x)=dz(\partial_x)=1,\quad
\operatorname{Im}\Omega(\partial_x)=0,\quad
\operatorname{Re}\Omega(\partial_x)=1>0.
$$

計量による長さと正則形式による較正を直接一致させるには、$\Omega_{\rm cal}=\sqrt{A/b}\,\Omega$ と規格化する。すると

$$
\operatorname{Re}\Omega_{\rm cal}(\partial_x)
=\sqrt{A/b}
=\sqrt{g(\partial_x,\partial_x)}.
$$

従ってこの向きで位相0のSLag円周である（元の $\Omega$ も正実数倍なので位相は同じ）。$x$ は周期1だから $\ell_f=\sqrt{A/b}$。

基底の $y$ 方向をファイバーに直交化するため $H_y=\partial_y-a\partial_x$ と置く。行列 $G$ から

$$
g(H_y,\partial_x)=G_{xy}-aG_{xx}=\frac A b a-a\frac A b=0,
$$

$$
g(H_y,H_y)=G_{yy}-2aG_{xy}+a^2G_{xx}
=\frac A b\,b^2=Ab.
$$

$H_y$ を1だけ進める射影は基底の1周なので、商基底の計量長は $\ell_B=\sqrt{Ab}$。積は $\sqrt{A/b}\sqrt{Ab}=A$ となる。
<!-- proof-end -->

**なぜ $a$ が長さに現れないのか。** $a$ は基底を一周する際にファイバー方向へどれだけずれるかという傾きを記録する。直交化 $H_y=\partial_y-a\partial_x$ ではそのずれが打ち消され、基底の長さは $b$ のみに依存する。

## 3. 二つの整数アフィン周期を測る

[二種類の周期余接格子](../SYZ1-08/index.md#def-syz1-08-two-period-covectors)は、SLagファイバーの変形からシンプレクティック形式と正則体積形式を別々に積分して作る。ここではファイバーの正向き生成サイクルを $\gamma_x$（$x:0\to1$）とし、基底の変形ベクトルを $V=\partial_y$ とする。

ここで $\iota_V$ は微分形式の最初の引数にベクトル $V$ を代入する**収縮**であり、2形式を1形式へ、1形式を0形式（関数）へ移す。一次元では $\operatorname{Im}\Omega$ は1形式なので、$\iota_V\operatorname{Im}\Omega$ は0形式である。零次コホモロジーの周期は点での値であり、1サイクルに無理に積分しない。

<a id="prop-syz1-12-two-affine-periods"></a>

<!-- formal-statement-start -->
> **命題（円周束の二つのアフィン周期）**  
> $E_\tau$ と $L_y$ が上の定理の通りとし、$\gamma_x$ を $L_y$ の正向き1サイクルとする。シンプレクティック変形形式を $\alpha_V=-\iota_V\omega$ とし、正則体積形式による0形式を $f_V=\iota_V\operatorname{Im}\Omega$ とすると

$$
\alpha_{\partial_y}=A\,dx,\quad
\int_{\gamma_x}\alpha_{\partial_y}=A,\quad
f_{\partial_y}=b.
$$

> 従って二つの局所周期座標として $u=Ay$、$q=by$ を取れる。較正用の $\Omega_{\rm cal}=\sqrt{A/b}\Omega$ を使う規格化では $q_{\rm cal}=\sqrt{Ab}\,y$ であり、そのHessian係数は $dq_{\rm cal}/du=\sqrt{b/A}$ である。
<!-- formal-statement-end -->

### 証明の見取り図

$\iota_{\partial_y}(dx\wedge dy)=-dx$ と $\operatorname{Im}dz=b\,dy$ を別々に用いる。$u$ の一周周期は $A$、$q$ は $b$ だが、両者は同じ座標ではない。

<!-- proof-start -->
### 証明

任意の接ベクトル $W$ で $(\iota_{\partial_y}\omega)(W)=\omega(\partial_y,W)$。$dx(\partial_y)=0$、$dy(\partial_y)=1$ なので

$$
\iota_{\partial_y}(A\,dx\wedge dy)=-A\,dx,\qquad
-\iota_{\partial_y}\omega=A\,dx.
$$

$\gamma_x$ 上で $dx$ の積分は1だから周期は $A$。一方、$dz=dx+a\,dy+ib\,dy$ から $\operatorname{Im}\Omega=b\,dy$、$\iota_{\partial_y}\operatorname{Im}\Omega=b$ である。したがって $du=A\,dy$、$dq=b\,dy$。正の定数倍 $\Omega_{\rm cal}=\sqrt{A/b}\Omega$ を使えば $dq_{\rm cal}=\sqrt{A/b}\,b\,dy=\sqrt{Ab}\,dy$。ここで $u,q_{\rm cal}$ は実変数 $y$ の局所関数で、$du/dy=A>0$ だから $y$ から $u$ への座標変更は可逆である。連鎖律より
$$
\frac{dq_{\rm cal}}{du}
=\frac{dq_{\rm cal}/dy}{du/dy}
=\frac{\sqrt{Ab}}{A}
=\sqrt{\frac b A}.
$$
したがって微分記号を形式的に割ったのではなく、非零の $du/dy$ による変数変更から係数を得た。
<!-- proof-end -->

**単位の違いに注意。** 第2節の幾何の規格化と一致する自然な[SLag基底のHessian計量](../SYZ1-09/index.md#thm-syz1-09-hessian)は、較正した $\Omega_{\rm cal}$ に対して $H_{\rm cal}=\sqrt{b/A}$ を用いる。一方、後で規格化する物理的な円周T双対計量では係数 $b/A$ が現れる。両者を数値として同一視せず、必要な**定数倍**を第5節で明示する。

## 4. 双対円周を貼ると複素楕円曲線になる

[双対トーラスとホロノミー文字の同型](../SYZ1-10/index.md#prop-syz1-10-holonomy-dual)により、ファイバーの平坦 $U(1)$ 接続の同値類は円周である。元の $\gamma_x$ に対する文字を $\chi(\gamma_x)=e^{-2\pi i t}$ と表すことにし、$t\in\mathbb R/\mathbb Z$ を双対ファイバーの角とする。負号は $t=-v$（前講のホロノミー角 $v$）という座標選択であり、ここで固定する。

局所的に $u=Ay$、$v=-t$ とすると、[前講のsemi-flat複素チャート](../SYZ1-10/index.md#def-syz1-10-semi-flat-complex-chart)の座標 $z_{\rm sf}=u+iv$ に $i$ を掛けた

$$
w=i z_{\rm sf}=t+iAy
$$

が正則座標になる。$t$ の一周は $w\mapsto w+1$、$y$ の一周は $w\mapsto w+iA$ となる。したがって $B=0$ の双対複素曲線は $\mathbb C/(\mathbb Z+iA\mathbb Z)$ である。

$B=\beta\,dx\wedge dy$ を加えた場合、基底の一周に沿うファイバー接続の位相ずれを $\beta$ とする。これは追加の**位相の貼り合わせ規則**であり、単に $TB/\Lambda$ を取るだけの構成とは区別する。被覆 $\mathbb R^2$ の座標 $(t,y)$ では、局所ホロノミー角を $t+\beta y$ と書けば同じ規則を表せる。$y\mapsto y+1$ でこの角は $\beta$ だけ変わるので、$\beta\notin\mathbb Z$ なら $t+\beta y$ 自体は商トーラス上の一価な角ではない。このずれを複素格子の二番目の周期へ記録するのが、以下の貼り合わせである。

<a id="def-syz1-12-b-twisted-dual"></a>

<!-- formal-statement-start -->
> **定義（B場でねじった双対楕円曲線）**  
> $\beta\in\mathbb R$、$A>0$ のとき、周期1の $(t,y)$ の被覆上に複素座標 $w=t+(\beta+iA)y$ を置き、周期ベクトル1と $\beta+iA$ で割った複素曲線を

$$
\check E_{\rho}
=\mathbb C/(\mathbb Z+\rho\mathbb Z),\qquad
\rho=\beta+iA
$$

> と定める。$t$ の増加1と $y$ の増加1が、それぞれ $w$ の格子周期 $1$、$\rho$ に対応する。
<!-- formal-statement-end -->

<!-- definition-example-start: def-syz1-12-b-twisted-dual -->
### 直接例：半整数の位相ずれを貼る

$A=2$、$\beta=1/2$ なら $w=t+(1/2+2i)y$。$(t,y)\mapsto(t+1,y)$ で $w\mapsto w+1$、$(t,y)\mapsto(t,y+1)$ で $w\mapsto w+(1/2+2i)$。二つの格子ベクトルの行列式は2で零でないため離散格子である。逆に $w$ のこの二つの平行移動は $(t,y)$ の整数移動からすべて実現する。$e^{-2\pi it}$ の位相は $t$ を整数だけ変えても不変。**定義の確認**：格子商の同値関係、二つの周期、複素曲線としての非退化性が確かめられた。
<!-- definition-example-end -->

<a id="thm-syz1-12-dual-complex-period"></a>

<!-- formal-statement-start -->
> **定理（双対楕円曲線の複素周期）**  
> 上の滑らかなSLag円周束と、定義した $B$場の貼り合わせ規則のもとで、双対曲線の複素周期は

$$
\check\tau=\beta+iA=\rho.
$$

> 特に $\beta=0$ なら $\check\tau=iA$ であり、双対複素形状の虚部は元のシンプレクティック面積 $A$ に等しい。
<!-- formal-statement-end -->

### 証明の見取り図

双対のファイバー角が1回増える場合と、基底 $y$ が1回増える場合の複素座標の増分を別々に計算する。複素周期はその比であり、最初の周期を1としているから後者がそのまま $\check\tau$ となる。

<!-- proof-start -->
### 証明

被覆 $\mathbb R^2$ 上で $w=t+(\beta+iA)y$ と定める。$t\mapsto t+1$ では $\Delta w=1$、$y\mapsto y+1$ では $\Delta w=\beta+iA$。$A>0$ なので両者は実一次独立。よって格子商の正規化された周期比は

$$
\frac{\Delta_yw}{\Delta_tw}
=\frac{\beta+iA}{1}
=\beta+iA.
$$

$\beta$ を整数 $k$ だけ増やすと二番目の格子生成元は $\rho+k$ となるが、$\mathbb Z+(\rho+k)\mathbb Z=\mathbb Z+\rho\mathbb Z$。したがって $\beta$ の整数シフトは複素曲線を変えず、$B$位相 $\exp(2\pi i\beta)$ の周期とも一致する。
<!-- proof-end -->

この段階では**双対の複素構造**を得たのであって、双対曲線の面積がいくつかはまだ決まっていない。次に計量を固定して、複素構造と面積が反対向きにも交換されることを確かめる。

## 5. 双対計量と双対面積――もう一つの交換

一次元の平坦トーラスでは、元の計量のファイバー方向、混合方向、基底方向の係数を明示できる。ここで追加するのは周期1座標での**逆半径の規格化**と、混合計量・$B$場を交換する規則である。一般の曲がったCalabi–Yauや特異ファイバーへこの規則を無条件に延長しない。

行列成分は座標ベクトルで $G_{ij}=g(\partial_i,\partial_j)$ と評価したものであり、$B_{xy}=B(\partial_x,\partial_y)=\beta$ は交代2形式の成分である。例えば
$$
g=G_{xx}\,dx\otimes dx+G_{xy}(dx\otimes dy+dy\otimes dx)+G_{yy}\,dy\otimes dy,
\qquad B_{yx}=-B_{xy}.
$$
従って $G$ の混合成分には対称な二項が、$B$ には反対称な符号が対応する。元の計量は[第2節の計量・面積の命題](#prop-syz1-12-metric-area)から

$$
G_{xx}=\frac A b,\quad
G_{xy}=\frac{Aa}{b},\quad
G_{yy}=\frac A b(a^2+b^2).
$$

<a id="def-syz1-12-circle-duality-rule"></a>

<!-- formal-statement-start -->
> **定義（平坦円周の双対計量・2形式の規則）**  
> 周期1のファイバー座標 $x$ と基底座標 $y$ を持つ実2トーラスに、定数正定値対称行列 $G$（特に $G_{xx}>0$）および $B=\beta\,dx\wedge dy$ が与えられたとする。双対座標を $t$ とし、次の係数を持つ対称行列 $\check G$ と2形式 $\check B=\check B_{ty}\,dt\wedge dy$ を定める。

$$
\begin{aligned}
\check G_{tt}&=\frac1{G_{xx}},&
\check G_{ty}&=\frac{B_{xy}}{G_{xx}},\\
\check G_{yy}&=G_{yy}-\frac{G_{xy}^2-B_{xy}^2}{G_{xx}},&
\check B_{ty}&=\frac{G_{xy}}{G_{xx}}.
\end{aligned}
$$

> これは本講で採用する平坦な円周のT双対（Buscher型）規格化である。$g$ と $B$ を別の入力として与えるので、複素トーラスの双対化だけから自動的に出る公式ではない。
<!-- formal-statement-end -->

<!-- definition-example-start: def-syz1-12-circle-duality-rule -->
### 直接例：直交トーラスで逆半径を確認する

$a=\beta=0$、$A=3$、$b=2$ とすれば $G=\operatorname{diag}(3/2,6)$。規則により $\check G_{tt}=2/3$、$\check G_{ty}=0$、$\check G_{yy}=6$、$\check B=0$。$t$ の一周長は $\sqrt{2/3}=1/\sqrt{3/2}$ であり、元のファイバー一周長の逆数になる。$\check G$ は正定値で、行列式は $(2/3)6=4>0$。**定義の確認**：規則が与える行列は正定値で、逆長さ・混合項・2形式を直接判定できる。
さらに混合成分も実際に判定する。$a=1$、$\beta=1/2$、$A=b=1$ なら
$$
G=\begin{pmatrix}1&1\\1&2\end{pmatrix},\qquad B_{xy}=\frac12.
$$
$\det G=1>0$、$G_{xx}=1>0$ なので入力は正定値である。定義の各式を代入すると
$$
\check G_{tt}=1,\qquad
\check G_{ty}=\frac12,\qquad
\check G_{yy}=2-\frac{1-(1/2)^2}{1}=\frac54,\qquad
\check B_{ty}=1.
$$
$\det\check G=1\cdot(5/4)-(1/2)^2=1>0$ なので、双対計量も正定値である。これにより非零の混合成分と2形式の交換まで直接確認した。
<!-- definition-example-end -->

<a id="thm-syz1-12-moduli-exchange"></a>

<!-- formal-statement-start -->
> **定理（平坦楕円曲線の複素・Kählerパラメータ交換）**  
> $\tau=a+ib$（$b>0$）、$\rho=\beta+iA$（$A>0$）の平坦な $E_\tau$ と $g,B$ を第2節の通りに取り、上の[平坦円周の双対計量・2形式の規則](#def-syz1-12-circle-duality-rule)を $x$ 方向に適用する。このとき、周期1の $(t,y)$ に関し

$$
\check g=\frac b A\left((dt+\beta\,dy)^2+A^2(dy)^2\right),
\qquad
\check B=a\,dt\wedge dy.
$$

> また $\check w=t+(\beta+iA)y$ により $\check E$ は複素周期 $\check\tau=\rho$ の楕円曲線となり、向き $dt\wedge dy$ におけるKähler形式 $\check\omega$ と複素化Kählerパラメータは

$$
\check\omega=b\,dt\wedge dy,\qquad
\int_{\check E}\check\omega=b,\qquad
\check\rho=a+ib=\tau.
$$

> すなわち、選んだ周期・向き・逆長さの規格化のもとで $(\tau,\rho)\mapsto(\rho,\tau)$ が成り立つ。
<!-- formal-statement-end -->

### 証明の見取り図

前の定義の四つの係数へ $G$ を代入する。双対計量を平方完成して複素座標 $\check w$ を見つけ、行列式から面積を検算する。混合成分の比 $G_{xy}/G_{xx}=a$ が双対 $B$場となるため、もとの複素周期の実部も失われない。

<!-- proof-start -->
### 証明

まずファイバー成分と混合成分を計算する。

$$
\check G_{tt}=\frac b A,\qquad
\check G_{ty}
=\frac{\beta}{A/b}=\frac{\beta b}{A},\qquad
\check B_{ty}
=\frac{Aa/b}{A/b}=a.
$$

$y$ 成分の分子には

$$
\frac{G_{xy}^2}{G_{xx}}
=\frac{(Aa/b)^2}{A/b}=\frac{Aa^2}{b},\qquad
\frac{B_{xy}^2}{G_{xx}}=\frac{\beta^2b}{A}
$$

が入る。従って

$$
\begin{aligned}
\check G_{yy}
&=\frac A b(a^2+b^2)-\frac{Aa^2}{b}+\frac{\beta^2b}{A}\\
&=Ab+\frac{\beta^2b}{A}.
\end{aligned}
$$

すなわち

$$
\begin{aligned}
\check g
&=\frac b A(dt)^2+\frac{2\beta b}{A}dt\,dy
+\left(Ab+\frac{\beta^2b}{A}\right)(dy)^2\\
&=\frac b A\left((dt+\beta\,dy)^2+A^2(dy)^2\right)
=\frac b A|d\check w|^2.
\end{aligned}
$$

ここで $d\check w=dt+(\beta+iA)dy$。係数行列の行列式は

$$
\det\check G
=\frac b A\left(Ab+\frac{\beta^2b}{A}\right)
-\left(\frac{\beta b}{A}\right)^2=b^2>0.
$$

よって正定値で、面積要素は $b\,dt\,dy$。複素座標についても

$$
\frac i2d\check w\wedge d\overline{\check w}
=A\,dt\wedge dy,\qquad
\check\omega=\frac b A\frac i2d\check w\wedge d\overline{\check w}
=b\,dt\wedge dy.
$$

$t,y$ の基本領域は単位正方形なので $\int_{\check E}\check\omega=b$。最後に $\int_{\check E}\check B=a$ だから $\check\rho=a+ib=\tau$。第4節より $\check\tau=\beta+iA=\rho$。双方が示された。
<!-- proof-end -->

**規格化はどこで入ったか。** [前講のHessian形式](../SYZ1-11/index.md#def-syz1-11-semiflat-kahler)で $u=Ay$、$v=-t$ を用いると、その実計量は $H((du)^2+(dv)^2)$。第3節の較正した $\Omega_{\rm cal}$ に対する自然な $H_{\rm cal}=\sqrt{b/A}$ は

$$
g_{\rm sf}
=\sqrt{\frac b A}\left(A^2(dy)^2+(dt)^2\right)
$$

を与え、$\beta=0$ では $g_{\rm sf}$ と上の $\check g$ の比は一定である。実際、

$$
\check g=\sqrt{\frac b A}\;g_{\rm sf}\qquad(\beta=0).
$$

この定数倍は逆長さ $\ell_f\ell_{\check f}=1$ に正規化したために加わった。**較正から得る自然なHessian計量**と**ここで採用したT双対の逆半径規格化**を無断で等しいと置かない。$\beta\ne0$ では双対角を局所的に $t+\beta y$ と取り直して同じ係数比較を行い、ねじれはその貼り合わせに記録される。

### 数値検算：傾きも $B$場も非零

第2節の $\tau=1/2+2i$、$\rho=1/4+3i$ を用いる。元の計量行列は

$$
G=\begin{pmatrix}
3/2&3/4\\
3/4&51/8
\end{pmatrix},\qquad
\det G=9.
$$

規則から

$$
\check G=\begin{pmatrix}
2/3&1/6\\
1/6&6+1/24
\end{pmatrix},\qquad
\det\check G=4.
$$

確かに $(2/3)(145/24)-(1/6)^2=145/36-1/36=4$ である。$\check w=t+(1/4+3i)y$、$\check\tau=1/4+3i$、$\int\check\omega=2$、$\check B=(1/2)dt\wedge dy$ より $\check\rho=1/2+2i$。傾き $a$ が双対 $B$場へ、もとの $B$場 $\beta$ が双対複素格子の傾きへ移ったことが数値で見える。

## 6. 戻して確かめる――失われる情報はないか

<a id="prop-syz1-12-involution"></a>

<!-- formal-statement-start -->
> **命題（平坦模型の二重双対）**  
> 第5節の正定値定数計量・2形式に対して、同じ双対規則を今度は $\check E$ の $t$ 方向へ適用すると、最初の $G,B$ に戻る。特に $\check{\check\tau}=\tau$、$\check{\check\rho}=\rho$ である。
<!-- formal-statement-end -->

### 証明の見取り図

最初の $G_{xx}$ と $B_{xy}$ が双対でそれぞれ逆数と混合項に入ったことを、逆に読めるか検査する。対称な公式を二回適用して恒等変換になることを示す。

<!-- proof-start -->
### 証明

双対側では $\check G_{tt}=b/A$、$\check G_{ty}=\beta b/A$、$\check B_{ty}=a$。再び[平坦円周の双対規則](#def-syz1-12-circle-duality-rule)を $t$ 方向へ適用すると、二度目のファイバー成分・混合成分・$B$場は

$$
G^{(2)}_{xx}=\frac1{\check G_{tt}}=\frac A b,\quad
G^{(2)}_{xy}=\frac{\check B_{ty}}{\check G_{tt}}=\frac{Aa}{b},\quad
B^{(2)}_{xy}=\frac{\check G_{ty}}{\check G_{tt}}=\beta.
$$

さらに

$$
\begin{aligned}
G^{(2)}_{yy}
&=\check G_{yy}
-\frac{\check G_{ty}^2-\check B_{ty}^2}{\check G_{tt}}\\
&=Ab+\frac{\beta^2b}{A}
-\frac{(\beta b/A)^2-a^2}{b/A}\\
&=Ab+\frac{Aa^2}{b}
=\frac A b(a^2+b^2).
\end{aligned}
$$

よって $G^{(2)}=G$、$B^{(2)}=B$。複素・Kählerの値でも交換を二度繰り返すので元に戻る。
<!-- proof-end -->

**この模型で破綻しない理由。** 基底に判別集合がなく、$x$ の円周は全点で同じ整数格子を持つ。次講のK3では特異ファイバーに接近するとこの前提が失われる。ここでの行列・周期の全域的な公式をそのまま延長することはできない。

## 7. 演習：周期、面積、双対化を紙上で復元する

### Level A：定義・向き・周期

<a id="ex-syz1-12-a01"></a>

#### SYZ1-12-A01 傾いた楕円曲線の計量

- Level: A

$\tau=1/3+2i$、$A=3$ とする。$G$、$\det G$、$\omega$、ファイバー $L_y$ の長さを計算せよ。

<!-- solution-start -->
### 詳細解答

$a=1/3$、$b=2$ だから

$$
G=\frac32
\begin{pmatrix}1&1/3\\1/3&1/9+4\end{pmatrix}
=\begin{pmatrix}3/2&1/2\\1/2&37/6\end{pmatrix}.
$$

行列式は $(3/2)(37/6)-(1/2)^2=37/4-1/4=9$。$\omega=A\,dx\wedge dy=3dx\wedge dy$、$g(\partial_x,\partial_x)=G_{xx}=3/2$ なので $x$ の一周長は $\sqrt{3/2}$ である。
<!-- solution-end -->

<a id="ex-syz1-12-a02"></a>

#### SYZ1-12-A02 収縮の符号と零次周期

- Level: A

$A=5$、$b=2$、$V=\partial_y$、$\Omega=dx+a\,dy+2i\,dy$ とする。$\alpha_V=-\iota_V\omega$、$f_V=\iota_V\operatorname{Im}\Omega$ を求め、$\gamma_x$ での周期と較正後の $q_{\rm cal}$ を求めよ。

<!-- solution-start -->
### 詳細解答

$\iota_{\partial_y}(dx\wedge dy)=-dx$ だから $\alpha_V=5dx$、$\int_{\gamma_x}\alpha_V=5$。$\operatorname{Im}\Omega=2dy$ の収縮は定数関数2で、1サイクルの積分ではなく点で値2を読む。$\Omega_{\rm cal}=\sqrt{5/2}\Omega$ なので $dq_{\rm cal}=\sqrt{5/2}\,2dy=\sqrt{10}\,dy$、従って $q_{\rm cal}=\sqrt{10}\,y$（加法定数は任意）である。
<!-- solution-end -->

<a id="ex-syz1-12-a03"></a>

#### SYZ1-12-A03 $B$場のねじれと複素周期

- Level: A

$A=3$、$\beta=2/5$ の双対複素座標 $w$ を書き、$t$ と $y$ を1ずつ増やすときの周期を求めよ。格子が非退化であることも示せ。

<!-- solution-start -->
### 詳細解答

$w=t+(2/5+3i)y$。$t\mapsto t+1$ は周期1、$y\mapsto y+1$ は周期 $2/5+3i$ を与える。実ベクトル $(1,0)$、$(2/5,3)$ の行列式は3で零でない。従って $\mathbb Z+(2/5+3i)\mathbb Z$ は離散な階数2の格子で、$\check\tau=2/5+3i$ である。
<!-- solution-end -->

<a id="ex-syz1-12-a04"></a>

#### SYZ1-12-A04 2形式から面積を出す

- Level: A

$\tau=a+ib$（$b>0$）について、$(i/2)dz\wedge d\bar z$ を展開し、$g=(A/b)|dz|^2$ の面積を求めよ。$a$ が消える理由を述べよ。

<!-- solution-start -->
### 詳細解答

$dz=dx+(a+ib)dy$、$d\bar z=dx+(a-ib)dy$。同種の外積は0、交差項は

$$
dz\wedge d\bar z=((a-ib)-(a+ib))dx\wedge dy
=-2ib\,dx\wedge dy.
$$

従って $(i/2)dz\wedge d\bar z=b\,dx\wedge dy$、$\omega=A\,dx\wedge dy$ の積分は $A$。実部 $a$ の項は逆符号で相殺する。行列式でも $(a^2+b^2)-a^2=b^2$ と相殺する。
<!-- solution-end -->

<a id="ex-syz1-12-a05"></a>

#### SYZ1-12-A05 整数シフトと同じ格子

- Level: A

$\check\tau=\beta+iA$ とする。$\beta$ を $\beta+k$（$k\in\mathbb Z$）に変えても同じ複素曲線になることを、格子の包含を両方向に確かめて示せ。

<!-- solution-start -->
### 詳細解答

$1$ と $\rho+k$ は $\mathbb Z+\rho\mathbb Z$ の元なので $\mathbb Z+(\rho+k)\mathbb Z\subset\mathbb Z+\rho\mathbb Z$。逆に $\rho=(\rho+k)-k$ は $\mathbb Z+(\rho+k)\mathbb Z$ の元だから逆包含も成り立つ。従って格子は一致する。また $e^{2\pi i(\beta+k)}=e^{2\pi i\beta}$ で $B$位相も同じである。
<!-- solution-end -->

### Level B：異なる規格化と逆変換

<a id="ex-syz1-12-b01"></a>

#### SYZ1-12-B01 混合成分を残した双対計量

- Level: B

$\tau=1/2+2i$、$\rho=1/3+3i$ を取る。$G$、$\check G$、$\det\check G$、$\check B$、$(\check\tau,\check\rho)$ をすべて計算せよ。

<!-- solution-start -->
### 詳細解答

$A=3$、$b=2$、$a=1/2$、$\beta=1/3$。従って

$$
G=\begin{pmatrix}3/2&3/4\\3/4&51/8\end{pmatrix},
\quad G_{xx}^{-1}=2/3,\quad
\check G_{ty}=(1/3)/(3/2)=2/9.
$$

$\check G_{yy}=Ab+\beta^2b/A=6+2/27=164/27$ だから

$$
\check G=\begin{pmatrix}2/3&2/9\\2/9&164/27\end{pmatrix}.
$$

行列式を独立に計算すると $(2/3)(164/27)-(2/9)^2=328/81-4/81=4=b^2$。$\check B_{ty}=G_{xy}/G_{xx}=(3/4)/(3/2)=1/2$。また $\check w=t+(1/3+3i)y$ より $\check\tau=1/3+3i$、$\check\rho=\int\check B+i\int\check\omega=1/2+2i$ となる。
<!-- solution-end -->

<a id="ex-syz1-12-b02"></a>

#### SYZ1-12-B02 二つの計量係数を混同しない

- Level: B

$a=\beta=0$、$A=4$、$b=1$ とする。較正から得る $H_{\rm cal}$ と第5節の逆半径規格化による $H_{\rm dual}$ を求め、それぞれの双対面積を比べよ。

<!-- solution-start -->
### 詳細解答

$u=Ay=4y$、$q_{\rm cal}=\sqrt{Ab}\,y=2y$ なので $H_{\rm cal}=dq_{\rm cal}/du=1/2$。自然なsemi-flat形式は $H_{\rm cal}\,du\wedge dv$ で、基底の $u$ 周期が4、角 $v$ の周期が1だから面積は $(1/2)\cdot4=2$。一方、逆半径規格化では $H_{\rm dual}=b/A=1/4$、面積は $(1/4)\cdot4=1=b$。係数の比は $(1/4)/(1/2)=1/2=\sqrt{b/A}$ である。ここでは両者は定数倍だが、最初から等しいわけではない。
<!-- solution-end -->

<a id="ex-syz1-12-b03"></a>

#### SYZ1-12-B03 二重双対の $y$ 成分

- Level: B

一般の $a,b,A,\beta$ について、双対計量の $\check G_{yy}=Ab+\beta^2b/A$ から二度目の双対計量の $G^{(2)}_{yy}$ を計算し、$\beta$ 依存が消えることを示せ。

<!-- solution-start -->
### 詳細解答

$\check G_{tt}=b/A$、$\check G_{ty}=\beta b/A$、$\check B_{ty}=a$ を双対の定義へ入れると

$$
\begin{aligned}
G^{(2)}_{yy}
&=Ab+\frac{\beta^2b}{A}
-\frac{(\beta b/A)^2-a^2}{b/A}\\
&=Ab+\frac{\beta^2b}{A}-\frac{\beta^2b}{A}
+\frac{Aa^2}{b}\\
&=\frac A b(a^2+b^2).
\end{aligned}
$$

これは最初の $G_{yy}$ と一致する。$\beta$ の二項は符号が反対で厳密に相殺する。
<!-- solution-end -->

<a id="ex-syz1-12-b04"></a>

#### SYZ1-12-B04 正定値性と符号の検査

- Level: B

一般の正定値な $2\times2$ 計量 $G$ と実数 $B_{xy}=\beta$ に第5節の双対規則を適用する。$\check G$ が正定値であることを行列式から証明し、なぜ $G_{xx}>0$ が不可欠か説明せよ。

<!-- solution-start -->
### 詳細解答

$G_{xx}>0$ から $\check G_{tt}=1/G_{xx}>0$。行列式は

$$
\begin{aligned}
\det\check G
&=\frac1{G_{xx}}\left(
G_{yy}-\frac{G_{xy}^2-\beta^2}{G_{xx}}\right)
-\frac{\beta^2}{G_{xx}^2}\\
&=\frac{G_{xx}G_{yy}-G_{xy}^2+\beta^2-\beta^2}{G_{xx}^2}\\
&=\frac{\det G}{G_{xx}^2}>0.
\end{aligned}
$$

実対称2次行列の先頭主座小行列式と全行列式がともに正だから $\check G$ は正定値。$G_{xx}=0$ ではそもそも逆数が定義できず、双対規則の最初の式で破綻する。正定値の $G$ ならその危険を排除できる。
<!-- solution-end -->

### Level C：複素とKählerの両側を統合する

<a id="ex-syz1-12-c01"></a>

#### SYZ1-12-C01 楕円曲線の鏡像を最初から構成する

- Level: C

$\tau=1/2+2i$、$\rho=1/4+3i$ とし、$E_\tau$ 上で $z=x+\tau y$、$g=(3/2)|dz|^2$、$\omega=3dx\wedge dy$、$\Omega=dz$、$B=(1/4)dx\wedge dy$ とする。次をすべて示せ。

1. $L_y$ が向き $+\partial_x$ の位相0のSLag円周であること、ファイバー長と基底一周長、二つのアフィン周期を求めること。
2. 双対の平坦接続文字を $\chi(\gamma_x)=e^{-2\pi it}$ としたとき、$B$場のねじれを組み込んだ複素周期を求めること。
3. 双対規則から $\check G,\check B,\check\omega$ を計算し、二つのモジュライが交換されること。
4. 双対化をもう一度適用して $G_{xx},G_{xy},G_{yy},B_{xy}$ を復元すること。

<!-- solution-start -->
### 詳細解答

**(1) SLagと周期。** $dz(\partial_x)=1$、$\omega|_{TL_y}=0$、$\operatorname{Im}dz(\partial_x)=0$。$\Omega_{\rm cal}=\sqrt{3/2}\,dz$ は $\operatorname{Re}\Omega_{\rm cal}(\partial_x)=\sqrt{3/2}=\sqrt{g(\partial_x,\partial_x)}$ を与えるので位相0、指定の向きで較正される。ファイバー長は $\ell_f=\sqrt{3/2}$。水平ベクトルは $\partial_y-(1/2)\partial_x$、その長さの二乗は $Ab=6$ で、基底一周長は $\sqrt6$。

$\alpha_{\partial_y}=-\iota_{\partial_y}\omega=3dx$ で $\int_{\gamma_x}\alpha=3$。$f_{\partial_y}=\iota_{\partial_y}\operatorname{Im}dz=2$。従って $u=3y$、$q=2y$、較正規格化では $q_{\rm cal}=\sqrt6\,y$ である。

**(2) 双対複素格子。** 文字の角は $t$（周期1）。$B$場は $\beta=1/4$ なので、基底一周で位相ずれ $1/4$ を与え、$w=t+(1/4+3i)y$。$t$ の周期は1、$y$ の周期は $1/4+3i$、従って $\check\tau=1/4+3i=\rho$。

**(3) 2形式と面積。** [平坦円周の双対規則](#def-syz1-12-circle-duality-rule)に入力する元の行列は

$$
G=\begin{pmatrix}3/2&3/4\\3/4&51/8\end{pmatrix},
\qquad \det G=9.
$$

双対規則により

$$
\check G_{tt}=2/3,\quad
\check G_{ty}=(1/4)/(3/2)=1/6,\quad
\check G_{yy}=6+\frac{(1/4)^2\cdot2}{3}
=6+\frac1{24}=\frac{145}{24}.
$$

$\det\check G=(2/3)(145/24)-(1/6)^2=4$。よって $\check\omega=2dt\wedge dy$、$\int\check\omega=2$。また $\check B_{ty}=(3/4)/(3/2)=1/2$ なので $\check\rho=1/2+2i=\tau$。両方の交換が成立した。

**(4) 二重双対。** $\check G_{tt}=2/3$、$\check G_{ty}=1/6$、$\check B_{ty}=1/2$ から

$$
G^{(2)}_{xx}=3/2,\quad
G^{(2)}_{xy}=(1/2)/(2/3)=3/4,\quad
B^{(2)}_{xy}=(1/6)/(2/3)=1/4.
$$

最後の係数は

$$
\begin{aligned}
G^{(2)}_{yy}
&=\frac{145}{24}
-\frac{(1/6)^2-(1/2)^2}{2/3}\\
&=\frac{145}{24}-\frac{-2/9}{2/3}
=\frac{145}{24}+\frac13
=\frac{153}{24}=\frac{51}{8}.
\end{aligned}
$$

最初の $G,B$ の全係数が復元された。特異ファイバーのない平坦模型だから、この全域的な周期計算が成り立つ。
<!-- solution-end -->

## 8. 次講へ：K3で何が変わるか

この章で直接証明したのは、**滑らかな楕円曲線の円周束**と、周期1・向き・逆長さ規格化を明示した**平坦模型の双対化**である。複素モジュライ $\tau$、複素化Kählerモジュライ $\rho$ の交換は、行列式・周期・面積と2回の双対化で検算できた。

次講SYZ1-13ではK3の楕円ファイブレーションを扱う。そこでは超Kähler回転により正則楕円曲線をSLagファイバーとして読む操作と、特異ファイバーの存在を別々に確認する。滑らかな全域的周期座標が失われるときに本講の計算のどの行が使えなくなるのかが、次の中心問題である。
