# GR32 Kerr時空の計量と回転

Schwarzschild時空では、質量を持つ中心天体の外部計量を球対称で対角な形に書けました。[GR31のReissner–Nordström解](../GR31/index.md#thm-gr31-rn-solution)は電荷を加えても球対称です。しかし天体が回転すると、時間並進と軸まわりの回転は対称であっても、一般に全方向の空間回転は対称ではありません。特に、動径方向へ動かずに角度を変える世界線と、時計の進み方の間に交差項が現れます。

この章では、回転する真空ブラックホールの代表的な計量を出発点として、交差項の意味、地平線、静止極限面、回転する局所観測者の角速度と粒子の保存量を計算します。計量の候補をEinstein真空方程式の全成分から構成する長い導出や解の一意性証明は扱いません。与えた計量に対する代数計算・座標変換と、その物理的帰結を一つずつ確かめます。

## 1. 定常・軸対称の計量で何が変わるか

単位は $G=c=1$、符号は $(-,+,+,+)$ とし、宇宙項のない4次元時空を考えます。$M>0$ は長さの次元を持つ質量、$J$ は長さの二乗の次元を持つ全角運動量です。回転方向を符号付きで表す長さのパラメータを $a=J/M$ と置きます。通常単位では $M_{\rm geom}=Gm/c^2$、$a=J_{\rm SI}/(mc)$ です。

[GR14の定常・静的Killing場の定義](../GR14/index.md#def-gr14-stationary-static)に従い、時間並進のKilling場が時間的である領域を定常領域と呼びます。軸対称とは、角座標 $\varphi$ の一周に対応する $2\pi$ 周期のKilling場 $\eta=\partial_\varphi$ があることです。二つの対称性に適合した座標では計量係数は $t,\varphi$ に依存しません。ただしそれだけでは $dt\,d\varphi$ 項は消えません。

まず $t$ は無限遠で静止する時計に規格化した時間、$r$ はSchwarzschildの場合の面積半径に帰着する動径座標、$\vartheta$ は回転軸から測る極角、$\varphi$ は軸まわりの方位角として導入します。これらをBoyer–Lindquist座標といい、一般の $a\ne0$ では $r$ は面積半径ではありません。以後 $r>0$、$0<\vartheta<\pi$ の局所座標域を用い、軸 $\sin\vartheta=0$ の座標退化は別扱いとします。

計量を簡潔に書くため、次の三つの関数を使います。

$$
\Sigma=r^2+a^2\cos^2\vartheta,\qquad
\Delta=r^2-2Mr+a^2,\qquad
A=(r^2+a^2)^2-a^2\Delta\sin^2\vartheta.
$$

$\Sigma$ は動径と緯度の組合せ、$\Delta$ は地平線候補の位置、$A$ は方位方向の計量係数を整理する量です。これらの意味は、行列式と観測者の計算によって具体化されます。

<a id="def-gr32-kerr-metric"></a>

<!-- formal-statement-start -->
> **定義（Kerr計量のBoyer–Lindquist表示）**  
> $M>0$、$a\in\mathbb R$ とし、$\Sigma>0$、$\Delta\ne0$、$0<\vartheta<\pi$ の座標領域で次のLorentz計量を考える。この座標表示をKerr計量のBoyer–Lindquist表示という。

$$
\begin{aligned}
ds^2={}&-\left(1-\frac{2Mr}{\Sigma}\right)dt^2
-\frac{4Mar\sin^2\vartheta}{\Sigma}\,dt\,d\varphi
+\frac{\Sigma}{\Delta}\,dr^2+\Sigma\,d\vartheta^2\\
&+\frac{A\sin^2\vartheta}{\Sigma}\,d\varphi^2.
\end{aligned}
$$

> $t,\varphi$ に依存しないため $\xi=\partial_t$、$\eta=\partial_\varphi$ はKilling場である。ブラックホールの外部として扱う際は $|a|\le M$、$r>r_+=M+\sqrt{M^2-a^2}$ を採用する。
<!-- formal-statement-end -->

<!-- definition-example-start: def-gr32-kerr-metric -->
**定義の確認**。赤道上の一例として $M=5,a=3,r=12,\vartheta=\pi/2$ とすると $\Sigma=144$、$\Delta=144-120+9=33$、$A=(153)^2-9(33)=23112$ です。したがって

$$
g_{tt}=-\frac16,\quad
g_{t\varphi}=-\frac52,\quad
g_{\varphi\varphi}=\frac{321}{2},\quad
g_{rr}=\frac{48}{11},\quad g_{\vartheta\vartheta}=144.
$$

ここで交差項の係数は $2g_{t\varphi}$ なので $-5\,dt\,d\varphi$ です。$\Delta>0$、$g_{\vartheta\vartheta},g_{rr},g_{\varphi\varphi}>0$ ですが、時間角度ブロックの行列式が負となることも次の命題で確認します。
<!-- definition-example-end -->

$a=0$ に置けば $\Sigma=r^2$、$\Delta=r(r-2M)$、$A=r^4$ となり、交差項は消えます。計量は

$$
ds^2=-\left(1-\frac{2M}{r}\right)dt^2
+\left(1-\frac{2M}{r}\right)^{-1}dr^2
+r^2(d\vartheta^2+\sin^2\vartheta\,d\varphi^2),
$$

すなわち[GR16のSchwarzschild計量](../GR16/index.md#thm-gr16-schwarzschild)そのものです。逆に $a\ne0$ なら $g_{t\varphi}$ は軸以外で非零となります。ただし「非対角項がある」だけを静的でないことの証明にしてはいけません。

実際、[GR14の直交超曲面の判定法](../GR14/index.md#def-gr14-stationary-static)で $\alpha=g(\partial_t,\cdot)=g_{tt}dt+g_{t\varphi}d\varphi$ を考えると、赤道上では

$$
g_{tt}=-1+\frac{2M}{r},\qquad
g_{t\varphi}=-\frac{2Ma}{r},
$$

$$
g_{tt}\,\partial_r g_{t\varphi}
-g_{t\varphi}\,\partial_r g_{tt}
=\left(-1+\frac{2M}{r}\right)\frac{2Ma}{r^2}
-\left(-\frac{2Ma}{r}\right)\left(-\frac{2M}{r^2}\right)
=-\frac{2Ma}{r^2}\ne0.
$$

この量は $\alpha\wedge d\alpha$ の $dt\wedge dr\wedge d\varphi$ 成分です。したがって $a\ne0$ の外部で無限遠に規格化された $\partial_t$ には局所的な直交超曲面がなく、静的Killing場にはなりません。無限遠の時間基準に関して定常性と静的性が違う、という差がここにあります。

## 2. 交差項を含む行列の逆を取る

計量から保存量や零面を求めるには、共変成分だけでなく逆計量も必要です。$s=\sin\vartheta$、$R=r^2+a^2$ と一時的に略記すれば $\Sigma=R-a^2s^2$、$\Delta=R-2Mr$ です。この略記のもとで時間角度ブロックを直接逆行列にします。

<a id="prop-gr32-inverse"></a>

<!-- formal-statement-start -->
> **命題（Kerr計量の行列式と逆計量）**  
> [Kerr計量](#def-gr32-kerr-metric)の $\Sigma>0$、$\Delta\ne0$、$0<\vartheta<\pi$ の領域では、$t,\varphi$ ブロックの行列式と4次元の行列式は

$$
g_{tt}g_{\varphi\varphi}-g_{t\varphi}^2
=-\Delta\sin^2\vartheta,\qquad
\det(g_{\mu\nu})=-\Sigma^2\sin^2\vartheta
$$

> であり、非零な逆計量成分は次で与えられる。

$$
\begin{gathered}
g^{tt}=-\frac{A}{\Sigma\Delta},\quad
g^{t\varphi}=-\frac{2Mar}{\Sigma\Delta},\quad
g^{\varphi\varphi}=\frac{\Delta-a^2\sin^2\vartheta}
{\Sigma\Delta\sin^2\vartheta},\\
g^{rr}=\frac{\Delta}{\Sigma},\qquad
g^{\vartheta\vartheta}=\frac1\Sigma.
\end{gathered}
$$
<!-- formal-statement-end -->

### 証明の見取り図

$t,\varphi$ 部分の行列式を二次の式として展開すると $\Sigma^2$ が因数として現れます。$2\times2$ 行列の逆を成分で書けば、非対角成分の符号も追跡できます。

<!-- proof-start -->
### 証明

$x=a^2s^2$ と置くと $g_{tt}=-(\Delta-x)/\Sigma$、$g_{t\varphi}=-a(R-\Delta)s^2/\Sigma$、$g_{\varphi\varphi}=As^2/\Sigma$ です。よって

$$
g_{tt}g_{\varphi\varphi}-g_{t\varphi}^2
=-\frac{s^2}{\Sigma^2}\left[(\Delta-x)A+x(R-\Delta)^2\right].
$$

$A=R^2-\Delta x$ を代入し、括弧内を順番に展開します。

$$
\begin{aligned}
(\Delta-x)(R^2-\Delta x)+x(R-\Delta)^2
&=\Delta R^2-xR^2-\Delta^2x+\Delta x^2\\
&\quad+xR^2-2Rx\Delta+x\Delta^2\\
&=\Delta(R^2-2Rx+x^2)\\
&=\Delta(R-x)^2=\Delta\Sigma^2.
\end{aligned}
$$

したがってブロックの行列式は $-\Delta s^2$ です。これに $g_{rr}=\Sigma/\Delta$ と $g_{\vartheta\vartheta}=\Sigma$ を掛けると $-\Sigma^2s^2$ となります。$2\times2$ の逆行列公式

$$
\begin{pmatrix}u&v\\v&w\end{pmatrix}^{-1}
=\frac{1}{uw-v^2}\begin{pmatrix}w&-v\\-v&u\end{pmatrix}
$$

で $u=g_{tt}$、$v=g_{t\varphi}$、$w=g_{\varphi\varphi}$ とすると、例えば $g^{tt}=(As^2/\Sigma)/(-\Delta s^2)=-A/(\Sigma\Delta)$、$g^{t\varphi}=-g_{t\varphi}/(-\Delta s^2)=-2Mar/(\Sigma\Delta)$ です。残りも同様の分子代入で表示式を得ます。$r,\vartheta$ 成分は対角成分の逆数です。
<!-- proof-end -->

この計算により、$\Delta=0$ で一部のBoyer–Lindquist成分が発散するのは、4次元計量の必然的な退化ではない可能性が見えます。座標を変えて確かめましょう。

## 3. 回転する地平線を横切る座標

$\Delta$ が実根を持つ条件は $M^2-a^2\ge0$ です。$\Sigma>0$ の領域で逆計量の $rr$ 成分が $\Delta/\Sigma$ だから、$\Delta=0$ は零超曲面の候補です。しかし、発散するBoyer–Lindquist成分をそのまま根へ代入してはいけません。GR31で用いた[EF座標による根の検査](../GR31/index.md#prop-gr31-horizons)を回転の場合へ拡張します。

<a id="prop-gr32-horizon"></a>

<!-- formal-statement-start -->
> **命題（Kerr地平線と正則な入射座標）**  
> $M>0$、$|a|\le M$ とする。Kerr計量の $\Delta=0$ の正の根は

$$
r_\pm=M\pm\sqrt{M^2-a^2}
$$

> である。ただし $a=0$ の $r_-=0$ は初めの $r>0$ の対象域から除く。$\Delta\ne0$ の領域で

$$
dv=dt+\frac{r^2+a^2}{\Delta}\,dr,\qquad
d\psi=d\varphi+\frac{a}{\Delta}\,dr
$$

> と定めれば、計量は次の入射Kerr表示に書き換わり、$\Sigma>0$ の根へ滑らかに延長する。

$$
\begin{aligned}
ds^2={}&-\left(1-\frac{2Mr}{\Sigma}\right)dv^2
+2\,dv\,dr+\Sigma\,d\vartheta^2\\
&-\frac{4Mar\sin^2\vartheta}{\Sigma}\,dv\,d\psi
-2a\sin^2\vartheta\,dr\,d\psi
+\frac{A\sin^2\vartheta}{\Sigma}\,d\psi^2.
\end{aligned}
$$

> 外側の根 $r=r_+$ は、$\partial_v+\Omega_H\partial_\psi$ により生成される正則なKilling零超曲面である。ここで

$$
\Omega_H=\frac{a}{r_+^2+a^2}=\frac{a}{2Mr_+}.
$$
<!-- formal-statement-end -->

### 証明の見取り図

まず二次方程式を解きます。座標変換で発散項を相殺した後、時間と方位を合わせたKilling場が根の面で零かつ法線方向になることを確認します。$\Delta$ が重根の極限回転でも同じ表示が使えます。

<!-- proof-start -->
### 証明

$\Delta=r^2-2Mr+a^2=(r-M)^2-(M^2-a^2)$ だから根の式が得られます。$|a|<M$ では二根、$|a|=M$ では $r=M$ の重根です。$\Delta\ne0$ で $R=r^2+a^2$ とおけば $dt=dv-R\,dr/\Delta$、$d\varphi=d\psi-a\,dr/\Delta$ です。

$dv\,dr$ の係数を決める式は

$$
R g_{tt}+a g_{t\varphi}
=-\frac{R(\Delta-a^2s^2)+a^2(R-\Delta)s^2}{\Sigma}
=-\Delta,
$$

となるので $g_{vr}=-(Rg_{tt}+ag_{t\varphi})/\Delta=1$ です。$dr\,d\psi$ に対しては

$$
R g_{t\varphi}+a g_{\varphi\varphi}
=\frac{as^2}{\Sigma}\{-R(R-\Delta)+A\}
=a\Delta s^2,
$$

したがって $g_{r\psi}=-as^2$ です。最後に $dr^2$ の変換後係数は

$$
\begin{aligned}
g_{rr}^{\rm new}
&=\frac{\Sigma}{\Delta}
+\frac{R^2g_{tt}+2Ra g_{t\varphi}+a^2g_{\varphi\varphi}}{\Delta^2}\\
&=\frac{\Sigma}{\Delta}-\frac{\Delta\Sigma}{\Delta^2}=0.
\end{aligned}
$$

最後の分子が $-\Delta\Sigma$ となることは、各成分を代入して $-R^2(\Delta-x)-2Rx(R-\Delta)+x(R^2-\Delta x)=-\Delta(R-x)^2$ と整理すれば確かめられます。よって表示計量を得ます。行列式は[座標変換前の行列式](#prop-gr32-inverse)と同じ $-\Sigma^2s^2$ です。変換のJacobianが三角行列で対角成分がすべて1だからです。$r=r_\pm>0$ において $\Sigma\ge r_\pm^2>0$ なので、軸を除けば計量は非退化かつ滑らかです。

次に $r_h=r_+$、$R_h=r_h^2+a^2=2Mr_h$ とおきます。$\Delta=0$ で $\Sigma=R_h-a^2s^2$ なので

$$
g_{vv}=\frac{a^2s^2}{\Sigma},\qquad
g_{v\psi}=-\frac{aR_hs^2}{\Sigma},\qquad
g_{\psi\psi}=\frac{R_h^2s^2}{\Sigma}.
$$

$\chi=\partial_v+(a/R_h)\partial_\psi$ を代入すると

$$
g(\chi,\chi)=\frac{s^2}{\Sigma}
\left[a^2-2aR_h\frac{a}{R_h}
+R_h^2\left(\frac{a}{R_h}\right)^2\right]=0.
$$

また $g(\chi,\partial_v)=g(\chi,\partial_\psi)=0$、$g(\chi,\partial_\vartheta)=0$ で、$g(\chi,\partial_r)=1-a^2s^2/R_h=\Sigma/R_h$ です。従って $\chi^\flat=(\Sigma/R_h)\,dr$、すなわち $\chi$ は $r=r_h$ の法線であり、同時にその接ベクトルです。$\partial_v,\partial_\psi$ がKilling場で係数 $a/R_h$ が一定だから $\chi$ もKilling場です。[GR29のKilling地平線の定義](../GR29/index.md#def-gr29-killing-horizon)を満たします。
<!-- proof-end -->

ここで証明したのは、定常Kerr解における局所的なKilling地平線の構造です。大域的な未来事象地平線との同定には延長された時空の無限遠・因果構造の情報が要ります。また $|a|>M$ では $\Delta$ に実根がなく、同じ根の構成は成立しません。これを実際の回転崩壊が必ず裸の特異性を生むという主張には使いません。

## 4. 静止できる場所と、回転せざるを得ない場所

地平線の生成方向は $\partial_t$ だけではなく、方位方向も混ざりました。なぜ角速度 $\Omega_H$ が必要なのかを、まず「一定の空間座標を保てる」世界線から見ます。無限遠で静止する基準に対し $r,\vartheta,\varphi$ を一定に保つ世界線の接ベクトルは $\partial_t$ で、その規格化が時間的であるためには $g_{tt}<0$ が必要です。

<a id="def-gr32-static-limit"></a>

<!-- formal-statement-start -->
> **定義（Kerrの静止極限面）**  
> $M>0$、$0<|a|\le M$ のKerr計量で、無限遠に規格化された定常Killing場 $\xi=\partial_t$ が次の条件を満たす外側の面を外側静止極限面という。

$$
g(\xi,\xi)=g_{tt}=0.
$$

> $0<\vartheta<\pi$ での半径を $r_{\rm stat}(\vartheta)$ と書く。
<!-- formal-statement-end -->

<!-- definition-example-start: def-gr32-static-limit -->
**定義の確認**。赤道と軸方向を比べます。$g_{tt}=-(1-2Mr/\Sigma)$ だから条件は $\Sigma=2Mr$ です。赤道 $\vartheta=\pi/2$ なら $\Sigma=r^2$ なので正の外側根は $r=2M$ です。軸へ近づく $\vartheta\to0$ の極限では $\Sigma\to r^2+a^2$ なので外側根は $r_+$ へ近づきます。軸そのものは方位角座標が退化するため極限として読みます。
<!-- definition-example-end -->

<a id="prop-gr32-static-order"></a>

<!-- formal-statement-start -->
> **命題（静止極限面と地平線の位置関係）**  
> $M>0$、$0<|a|\le M$ の外部Kerr解では

$$
r_{\rm stat}(\vartheta)=M+\sqrt{M^2-a^2\cos^2\vartheta}
\ge r_+=M+\sqrt{M^2-a^2}.
$$

> $0<\vartheta<\pi$ では不等号が厳密である。$r_+<r<r_{\rm stat}(\vartheta)$ では $\partial_t$ は空間的であるため、$r,\vartheta,\varphi$ をすべて一定にする時間的観測者は存在しない。
<!-- formal-statement-end -->

### 証明の見取り図

$g_{tt}=0$ を半径の二次方程式に直すと根を明示できます。地平線の根と平方根の中身を比較し、定常Killing場の因果型を判定します。

<!-- proof-start -->
### 証明

$\Sigma=2Mr$ は $r^2-2Mr+a^2\cos^2\vartheta=0$ です。解の公式から二根 $M\pm\sqrt{M^2-a^2\cos^2\vartheta}$ を得ます。無限遠から最初に出会う根はプラス側です。$\cos^2\vartheta\le1$ により

$$
M^2-a^2\cos^2\vartheta\ge M^2-a^2,
$$

二辺は非負なので平方根を取っても向きは変わりません。$a\ne0$ かつ $0<\vartheta<\pi$ では $\cos^2\vartheta<1$ より厳密です。

外側根を越えて内側へ入ると、$r_{\rm stat}$ から $r_+$ の間で $r^2-2Mr+a^2\cos^2\vartheta<0$ です。従って $\Sigma-2Mr<0$、$g_{tt}=-(\Sigma-2Mr)/\Sigma>0$ です。$\Sigma>0$ だから $\partial_t$ は空間的となります。時間的世界線の接ベクトルは空間的ベクトルにはできません。
<!-- proof-end -->

$M=5,a=3$ なら $r_+=5+\sqrt{25-9}=9$、赤道の静止極限は $10$ です。赤道の $r=9.5$ では $\partial_t$ は空間的ですが、これはその場所のすべての観測者が時間的でなくなるという意味ではありません。角度を変えながら動く観測者は存在できます。この領域のエネルギーの詳しい取り出し方は次章で調べます。

## 5. 零角運動量観測者と枠引きずり

時間的な観測者が $r,\vartheta$ を一定に保ちながら $\varphi$ だけ変えるとき、その接ベクトルは規格化因子を除き $\partial_t+\omega\partial_\varphi$ です。観測者が回転していても、[GR14の軸Killing角運動量](../GR14/index.md#def-gr14-energy-angular-momentum) $L=p_\varphi$ が零になるような回転速度を選べます。この条件から「空間に対して角運動量を持たない」のに回らざるを得ない角速度が決まります。

<a id="def-gr32-zamo"></a>

<!-- formal-statement-start -->
> **定義（零角運動量観測者の角速度）**  
> $r>r_+$、$0<\vartheta<\pi$ のKerr外部で、$r,\vartheta$ 一定の未来向き時間的な四元速度 $u$ が次の形を持ち、軸まわりの角運動量が零になる観測者を零角運動量観測者とする。

$$
u=u^t(\partial_t+\omega\partial_\varphi),\qquad
u^t>0,\qquad u_\varphi=0.
$$

> その座標角速度 $\omega=d\varphi/dt$ を枠引きずり角速度という。
<!-- formal-statement-end -->

<!-- definition-example-start: def-gr32-zamo -->
**定義の確認**。角運動量が本当に零になるか調べます。$u_\varphi=g_{t\varphi}u^t+g_{\varphi\varphi}u^\varphi=u^t(g_{t\varphi}+\omega g_{\varphi\varphi})$ だから $\omega=-g_{t\varphi}/g_{\varphi\varphi}$ を選べば $u_\varphi=0$ です。また

$$
g(\partial_t+\omega\partial_\varphi,\partial_t+\omega\partial_\varphi)
=g_{tt}-\frac{g_{t\varphi}^2}{g_{\varphi\varphi}}
=-\frac{\Delta\Sigma}{A}<0
$$

です。最後の等式には[時間角度ブロックの行列式](#prop-gr32-inverse)を使います。外部 $r>r_+$ では $\Delta=(r-r_+)(r-r_-)>0$、$\Sigma>0$ です。また $A=R^2-a^2\Delta s^2=R\Sigma+2Mra^2s^2>0$ と展開できるので、接ベクトルのノルムは負となり時間的であることが直接分かります。
<!-- definition-example-end -->

<a id="prop-gr32-frame-dragging"></a>

<!-- formal-statement-start -->
> **命題（枠引きずりの角速度と地平線の回転）**  
> $M>0$、$|a|\le M$ のKerr外部において、零角運動量観測者の角速度は

$$
\omega(r,\vartheta)=\frac{2Mar}{A}
$$

> である。$r\to\infty$ で $\omega=2Ma/r^3+O(r^{-5})$、外側地平線への極限では $\omega\to\Omega_H=a/(r_+^2+a^2)$ となる。$a=0$ なら $\omega=0$。
<!-- formal-statement-end -->

### 証明の見取り図

$u_\varphi=0$ に計量の交差項を代入します。遠方での $A$ の最高次を抽出し、地平線では $\Delta=0$ と $2Mr_+=r_+^2+a^2$ を利用します。

<!-- proof-start -->
### 証明

[零角運動量条件](#def-gr32-zamo)より $\omega=-g_{t\varphi}/g_{\varphi\varphi}$ です。計量成分は $g_{t\varphi}=-2Mar s^2/\Sigma$、$g_{\varphi\varphi}=As^2/\Sigma$ なので、$0<\vartheta<\pi$ では分子分母の $s^2/\Sigma$ を消して $\omega=2Mar/A$ を得ます。

遠方では $A=(r^2+a^2)^2-a^2(r^2-2Mr+a^2)s^2=r^4+O(r^2)$、従って

$$
\frac{2Mar}{A}
=\frac{2Ma}{r^3}\frac{1}{1+O(r^{-2})}
=\frac{2Ma}{r^3}+O(r^{-5}).
$$

地平線 $r=r_+$ では $\Delta=0$、$A=R_h^2$、$2Mr_+=R_h$ より

$$
\lim_{r\downarrow r_+}\omega
=\frac{2Mar_+}{R_h^2}
=\frac{aR_h}{R_h^2}
=\frac{a}{R_h}=\Omega_H.
$$

$a=0$ は元の表示に直接代入します。
<!-- proof-end -->

零角運動量観測者は $r>r_+$ で時間的ですが、$r\downarrow r_+$ の極限ではその規格化因子が発散します。地平線上に静止する質量を持つ観測者が存在する、という意味にはなりません。地平線の回転角速度 $\Omega_H$ は[地平線の零生成Killing場](#prop-gr32-horizon)の幾何学的な値です。

## 6. 粒子のエネルギーと軸角運動量

交差項があるときは $E=-p_t$ を $-g_{tt}\dot t$ とだけ書けません。アフィンパラメータ $\lambda$ による測地線の接ベクトルを $\dot x^\mu=dx^\mu/d\lambda$、運動量を $p_\mu=g_{\mu\nu}\dot x^\nu$ として、時間角度ブロックの連立方程式を解きます。時間的測地線で $\lambda$ が固有時なら単位質量当たりの量、光的測地線ならアフィン規格化に依存する量です。

<a id="prop-gr32-killing-integrals"></a>

<!-- formal-statement-start -->
> **命題（Kerr測地線のKilling保存量）**  
> $M>0$、$|a|\le M$ のKerr外部領域にあるアフィン媒介測地線について

$$
E=-p_t,\qquad L=p_\varphi
$$

> は一定である。$\Delta>0$、$0<\vartheta<\pi$ では時間・方位方向の速度成分は

$$
\dot t=\frac{AE-2MarL}{\Sigma\Delta},\qquad
\dot\varphi=\frac{2MarE}{\Sigma\Delta}
+\frac{(\Delta-a^2\sin^2\vartheta)L}
{\Sigma\Delta\sin^2\vartheta}
$$

> と表される。これらだけでは動径・極角方向の運動は確定しない。
<!-- formal-statement-end -->

### 証明の見取り図

保存は[GR14のKilling場による保存定理](../GR14/index.md#thm-gr14-killing-charge)の直接適用です。速度の式は $p_t,p_\varphi$ への逆計量の作用を行列として書けば符号を間違えません。

<!-- proof-start -->
### 証明

$g_{\mu\nu}$ は $t,\varphi$ に依存しないので、[Killing方程式の座標表示](../GR14/index.md#prop-gr14-killing-coordinate-test)から $\partial_t,\partial_\varphi$ はKilling場です。これらを[GR14のKilling保存定理](../GR14/index.md#thm-gr14-killing-charge)に入力します。測地線がアフィン媒介であるため $p_\mu(\partial_t)^\mu=p_t$、$p_\mu(\partial_\varphi)^\mu=p_\varphi$ は一定です。$E=-p_t$、$L=p_\varphi$ と符号を定めます。

次に

$$
\begin{pmatrix}p_t\\p_\varphi\end{pmatrix}
=\begin{pmatrix}g_{tt}&g_{t\varphi}\\
g_{t\varphi}&g_{\varphi\varphi}\end{pmatrix}
\begin{pmatrix}\dot t\\\dot\varphi\end{pmatrix}
=\begin{pmatrix}-E\\L\end{pmatrix}
$$

に[逆計量命題](#prop-gr32-inverse)を適用すれば

$$
\dot t=g^{tt}(-E)+g^{t\varphi}L
=\frac{AE-2MarL}{\Sigma\Delta},
$$

$$
\begin{aligned}
\dot\varphi&=g^{t\varphi}(-E)+g^{\varphi\varphi}L\\
&=\frac{2MarE}{\Sigma\Delta}
+\frac{(\Delta-a^2s^2)L}{\Sigma\Delta s^2}.
\end{aligned}
$$

$r,\vartheta$ の方程式は残りの測地線方程式および $g_{\mu\nu}\dot x^\mu\dot x^\nu=-1$ または $0$ と整合させる必要があります。
<!-- proof-end -->

$L=0$ で $E\ne0$ の測地線なら

$$
\frac{d\varphi}{dt}=\frac{\dot\varphi}{\dot t}
=\frac{2Mar}{A}=\omega.
$$

この比は[零角運動量観測者の角速度](#prop-gr32-frame-dragging)と一致します。ただし $L=0$ の測地線全体が $r,\vartheta$ 一定というわけではありません。座標角速度の一致と、観測者の加速度の有無を区別してください。

## 7. 演習

### Level A：係数と領域を確実に読む

<a id="ex-gr32-a01"></a>
#### GR32-A01 赤道上の係数
- Level: A

$M=2,a=1,r=6,\vartheta=\pi/2$ で $\Sigma,\Delta,A$ と $g_{tt},g_{t\varphi},g_{\varphi\varphi}$ を求め、計量の交差項の係数を述べよ。

<!-- solution-start -->
**詳細解答。** 赤道では $\cos\vartheta=0$、$\sin^2\vartheta=1$ だから $\Sigma=36$、$\Delta=36-24+1=13$、$R=37$ です。$A=37^2-13=1356$。従って

$$
g_{tt}=-\left(1-\frac{24}{36}\right)=-\frac13,\quad
g_{t\varphi}=-\frac{2(2)(1)(6)}{36}=-\frac23,
\quad g_{\varphi\varphi}=\frac{1356}{36}=\frac{113}{3}.
$$

成分 $g_{t\varphi}$ は対称行列の非対角成分なので $ds^2$ に現れる交差項は $2g_{t\varphi}dt\,d\varphi=-4dt\,d\varphi/3$ です。
<!-- solution-end -->

<a id="ex-gr32-a02"></a>
#### GR32-A02 回転を止める
- Level: A

一般の $M>0$ に対し $a=0$ を代入して四つの対角計量成分と $g_{t\varphi}$ を求めよ。どの領域で元のBoyer–Lindquist表示が使えるかも示せ。

<!-- solution-start -->
**詳細解答。** $a=0$ なら $\Sigma=r^2$、$\Delta=r(r-2M)$、$A=r^4$ です。ゆえに

$$
g_{tt}=-(1-2M/r),\quad g_{rr}=(1-2M/r)^{-1},\quad
g_{\vartheta\vartheta}=r^2,\quad g_{\varphi\varphi}=r^2\sin^2\vartheta,\quad
g_{t\varphi}=0.
$$

対角の非零成分は四つであり、非対角成分は零です。[Schwarzschild計量](../GR16/index.md#thm-gr16-schwarzschild)と一致します。$\Delta\ne0$ なので $r>0$ では $r\ne2M$ が表示域です。外部の静的領域は $r>2M$ です。
<!-- solution-end -->

<a id="ex-gr32-a03"></a>
#### GR32-A03 地平線候補の根
- Level: A

$M=5,a=3$ の $\Delta$ を因数分解し、地平線の二根と $r=12$ での符号を求めよ。

<!-- solution-start -->
**詳細解答。** $\Delta=r^2-10r+9=(r-9)(r-1)$ です。従って $r_+=9$、$r_-=1$ です。$r=12$ では $\Delta=3\cdot11=33>0$。平方完成 $\Delta=(r-5)^2-16$ からも根 $5\pm4$ を確認できます。
<!-- solution-end -->

<a id="ex-gr32-a04"></a>
#### GR32-A04 静止極限面の緯度依存
- Level: A

$M=5,a=3$ で赤道と $\cos^2\vartheta=1/4$ の静止極限面の半径を求め、$r_+$ と比較せよ。

<!-- solution-start -->
**詳細解答。** [静止極限半径](#prop-gr32-static-order)に代入すると赤道では $r_{\rm stat}=5+\sqrt{25}=10$、$\cos^2\vartheta=1/4$ では $5+\sqrt{25-9/4}=5+\sqrt{91}/2$ です。$\sqrt{91}/2>4$（$91>64$）なのでいずれも $r_+=9$ より外側です。$\cos^2\vartheta$ が大きいほど平方根は小さくなります。
<!-- solution-end -->

<a id="ex-gr32-a05"></a>
#### GR32-A05 赤道の枠引きずり
- Level: A

$M=2,a=1,r=6,\vartheta=\pi/2$ で零角運動量観測者の $\omega$ を求め、$u_\varphi=0$ を係数から直接確認せよ。

<!-- solution-start -->
**詳細解答。** GR32-A01の係数から $-g_{t\varphi}/g_{\varphi\varphi}=(2/3)/(113/3)=2/113$ です。[角速度式](#prop-gr32-frame-dragging)でも $2Mar/A=24/1356=2/113$。$u^\varphi=\omega u^t$ なら

$$
u_\varphi=g_{t\varphi}u^t+g_{\varphi\varphi}u^\varphi
=u^t\left(-\frac23+\frac{113}{3}\frac2{113}\right)=0.
$$

正規化した四元速度は $\Delta>0$、$A>0$ より存在します。
<!-- solution-end -->

### Level B：逆行列・座標・保存則を接続する

<a id="ex-gr32-b01"></a>
#### GR32-B01 時間角度ブロックを検算する
- Level: B

$M=2,a=1,r=6,\vartheta=\pi/2$ について $t,\varphi$ ブロックの行列式と逆行列を計算し、一般式との一致を確認せよ。

<!-- solution-start -->
**詳細解答。** GR32-A01の値を使うと

$$
B=\begin{pmatrix}-1/3&-2/3\\-2/3&113/3\end{pmatrix},
\qquad
\det B=-\frac{113}{9}-\frac49=-13=-\Delta.
$$

逆行列は

$$
B^{-1}=\frac1{-13}\begin{pmatrix}113/3&2/3\\2/3&-1/3\end{pmatrix}
=\begin{pmatrix}-113/39&-2/39\\-2/39&1/39\end{pmatrix}.
$$

[逆計量命題](#prop-gr32-inverse)の $g^{tt}=-A/(\Sigma\Delta)=-1356/(36\cdot13)=-113/39$、$g^{t\varphi}=-24/(36\cdot13)=-2/39$、$g^{\varphi\varphi}=(13-1)/(36\cdot13)=1/39$ と一致します。行列積の非対角成分も $(-1/3)(-2/39)+(-2/3)(1/39)=0$ です。
<!-- solution-end -->

<a id="ex-gr32-b02"></a>
#### GR32-B02 入射座標の相殺を再導出する
- Level: B

一般の $r$ で $R=r^2+a^2$ とし、$dt=dv-R\,dr/\Delta$、$d\varphi=d\psi-a\,dr/\Delta$ を使う。変換後の $g_{vr}$、$g_{r\psi}$、$g_{rr}$ を順に求め、$\Delta=0$ に極が残らないことを示せ。

<!-- solution-start -->
**詳細解答。** $s=\sin\vartheta$ とすると

$$
\begin{aligned}
g_{vr}&=-\frac{Rg_{tt}+ag_{t\varphi}}{\Delta}
=-\frac{-\Delta}{\Delta}=1,\\
g_{r\psi}&=-\frac{Rg_{t\varphi}+ag_{\varphi\varphi}}{\Delta}
=-\frac{a\Delta s^2}{\Delta}=-as^2.
\end{aligned}
$$

残る $dr^2$ の係数は

$$
g_{rr}^{\rm new}
=\frac{\Sigma}{\Delta}
+\frac{-\Delta\Sigma}{\Delta^2}=0.
$$

これらの分子の等式は[入射表示の証明](#prop-gr32-horizon)で展開した $R-\Delta=2Mr$、$A=R^2-a^2\Delta s^2$ から得られます。他の成分 $g_{vv},g_{v\psi},g_{\psi\psi},g_{\vartheta\vartheta}$ は有限な元の成分に一致し、$\Sigma>0$ の根で極を持ちません。
<!-- solution-end -->

<a id="ex-gr32-b03"></a>
#### GR32-B03 保存量から速度を求める
- Level: B

$M=2,a=1,r=6,\vartheta=\pi/2$ を通るアフィン媒介測地線について、その点で $E=1,L=0$ とする。$\dot t,\dot\varphi$ と比 $\dot\varphi/\dot t$ を求め、角速度と照合せよ。

<!-- solution-start -->
**詳細解答。** [Killing保存量の式](#prop-gr32-killing-integrals)またはGR32-B01の逆行列から

$$
\dot t=g^{tt}(-1)=\frac{113}{39},\qquad
\dot\varphi=g^{t\varphi}(-1)=\frac2{39}.
$$

従って $\dot\varphi/\dot t=(2/39)/(113/39)=2/113$ であり、[枠引きずり角速度](#prop-gr32-frame-dragging)に一致します。これは指定点での比であり、$r,\vartheta$ の運動を指定したことにはなりません。
<!-- solution-end -->

<a id="ex-gr32-b04"></a>
#### GR32-B04 地平線生成場を直接点検する
- Level: B

$M=5,a=3$ の外側地平線で $\Omega_H$ を求め、赤道上の入射Kerr計量を用いて $g(\chi,\chi)=0$ と $g(\chi,\partial_r)>0$ を確かめよ。ただし $\chi=\partial_v+\Omega_H\partial_\psi$ とする。

<!-- solution-start -->
**詳細解答。** $r_+=9$、$R_h=r_+^2+a^2=81+9=90$ なので $\Omega_H=a/R_h=1/30$ です。赤道では $\Sigma=r_+^2=81$、$s^2=1$ だから

$$
g_{vv}=\frac{a^2}{\Sigma}=\frac19,\quad
g_{v\psi}=-\frac{aR_h}{\Sigma}=-\frac{10}{3},\quad
g_{\psi\psi}=\frac{R_h^2}{\Sigma}=100.
$$

よって

$$
g(\chi,\chi)=\frac19+2\frac1{30}\left(-\frac{10}{3}\right)
+\frac1{900}(100)=\frac19-\frac29+\frac19=0.
$$

さらに $g_{vr}=1$、$g_{\psi r}=-a=-3$ より $g(\chi,\partial_r)=1-(1/30)3=9/10>0$。これは $\Sigma/R_h=81/90$ と一致します。$\chi$ が法線でもあることを確認するには $g(\chi,\partial_v)$ と $g(\chi,\partial_\psi)$ が零であることも必要で、前者 $1/9-(1/30)(10/3)=0$、後者 $-10/3+(1/30)100=0$ です。
<!-- solution-end -->

### Level C：回転する外部を一続きで読み解く

<a id="ex-gr32-c01"></a>
#### GR32-C01 Kerrの係数・地平線・観測者・保存量
- Level: C

$G=c=1$、$M=5,a=3$ のKerr計量を $0<\vartheta<\pi$ で考える。以下を順番に行え。

1. 外側・内側の $\Delta$ の根と、赤道での外側静止極限半径を求めよ。
2. 赤道 $r=12$ で $\Sigma,\Delta,A$、時間角度ブロック $g_{tt},g_{t\varphi},g_{\varphi\varphi}$ とその行列式を求めよ。
3. 同じ点で $\omega$ と $\dot t,\dot\varphi$ を求めよ。ただし測地線の保存量は $E=1,L=0$ とする。
4. 入射座標を使って外側地平線の $\chi$ と $\Omega_H$ を求め、$\chi$ が零方向であることを成分から確かめよ。
5. $a\to0$ にしたとき $r_+$、$\omega$ と計量がどうなるか説明せよ。また $|a|>M$ の根について述べよ。

<!-- solution-start -->
**詳細解答。**

**（1）** $\Delta=r^2-10r+9=(r-9)(r-1)$ なので $r_+=9,r_-=1$ です。[静止極限面の式](#prop-gr32-static-order)から赤道では $r_{\rm stat}=M+\sqrt{M^2}=10$。従って赤道の $9<r<10$ では $\partial_t$ に沿う静止世界線は時間的でありません。

**（2）** $\sin^2\vartheta=1$、$\cos\vartheta=0$ ですから

$$
\Sigma=12^2=144,\quad
\Delta=12^2-2(5)(12)+3^2=33,\quad
A=(144+9)^2-9(33)=23112.
$$

したがって

$$
g_{tt}=-\left(1-\frac{120}{144}\right)=-\frac16,\quad
g_{t\varphi}=-\frac{2(5)(3)(12)}{144}=-\frac52,\quad
g_{\varphi\varphi}=\frac{23112}{144}=\frac{321}{2}.
$$

行列式は $(-1/6)(321/2)-(-5/2)^2=-321/12-25/4=-396/12=-33$ であり、[ブロック行列式命題](#prop-gr32-inverse)の $-\Delta\sin^2\vartheta=-33$ と一致します。

**（3）** [零角運動量観測者の角速度](#prop-gr32-frame-dragging)は

$$
\omega=\frac{2Mar}{A}
=\frac{360}{23112}=\frac5{321}.
$$

[測地線の保存量式](#prop-gr32-killing-integrals)に $E=1,L=0$ を代入すると

$$
\dot t=\frac{A}{\Sigma\Delta}
=\frac{23112}{144\cdot33}=\frac{321}{66},
\qquad
\dot\varphi=\frac{2Mar}{\Sigma\Delta}
=\frac{360}{144\cdot33}=\frac5{66}.
$$

よって比は $(5/66)/(321/66)=5/321$ で一致します。$E,L$ だけから半径・極角の運動が定まったと考えてはいけません。

**（4）** $R_h=r_+^2+a^2=90$、$\Omega_H=3/90=1/30$、$\chi=\partial_v+(1/30)\partial_\psi$ です。赤道上なら $\Sigma=81$ なので

$$
g_{vv}=\frac19,\quad g_{v\psi}=-\frac{10}{3},\quad
g_{\psi\psi}=100,
$$

$$
g(\chi,\chi)=\frac19-\frac{2}{30}\frac{10}{3}+\frac{100}{900}
=\frac19-\frac29+\frac19=0.
$$

さらに $g(\chi,\partial_r)=1-a\Omega_H=9/10$ で、$g(\chi,\partial_v)=g(\chi,\partial_\psi)=g(\chi,\partial_\vartheta)=0$ です。従って $\chi^\flat=(9/10)dr$ と一致し、[Killing零超曲面](#prop-gr32-horizon)の条件を満たします。

**（5）** $a\to0$ なら $r_+\to2M=10$、$\omega\to0$ であり、$\Sigma=r^2,\Delta=r(r-2M),A=r^4$ から[Schwarzschild計量](../GR16/index.md#thm-gr16-schwarzschild)へ戻ります。$|a|>M$ では $M^2-a^2<0$ で $\Delta$ に実根はありません。このパラメータをブラックホール外部の地平線を持つKerr解と同一視しません。
<!-- solution-end -->

## 8. 次の問い

交差項 $g_{t\varphi}$ は単なる書式上の非対角成分ではなく、零角運動量の観測者さえ $\omega\ne0$ の座標角速度を持つことと結び付きます。地平線 $r=r_+$ は $\partial_t$ ではなく $\partial_t+\Omega_H\partial_\varphi$ が零になる面で、静止極限面は通常その外にあります。

次章ではこの二つの面の間で何ができるのかを考えます。そのためには、保存されるKillingエネルギー $E$ と局所観測者が測るエネルギーを区別し、回転からエネルギーを取り出す条件を新たに調べる必要があります。
