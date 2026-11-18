# FLUID33 Rossby波は回転成層流のどこから出るか

[FLUID32 の地衡流](../FLUID32/index.md#def-fluid32-geostrophic-flow)では、十分ゆっくり動く流体の水平圧力差と Coriolis 力が釣り合った。それでも地衡流に小さな渦の模様を置くと、模様は時間とともに移動する。何が復元力の役割を果たすのだろうか。

鍵は緯度で Coriolis パラメータが変わることと、流体柱の厚さで回転の強さを割った量が保存されることにある。[FLUID29 の浅水模型](../FLUID29/index.md#thm-fluid29-shallow-water)を二次元の回転する水柱に拡張し、**厚さで割った絶対渦度の保存 → 地衡近似による渦位の線形化 → Rossby 波の分散関係**の順に導く。内部重力波との違いも[FLUID31 の分散関係](../FLUID31/index.md#thm-fluid31-dispersion)と比較する。

## 0. 座標、模型、近似の適用範囲

$x$ は東、$y$ は北、$z$ は上向き。重力加速度の大きさを $g>0$ [m/s$^2$]、平均水深を $H>0$ [m] とする。実際の水深と水面変位は

$$
h(x,y,t)>0,\qquad \eta=h-H
$$

で、水深平均の水平速度を $(u,v)$ [m/s] とする。

底面は水平で静止し、密度は一定。粘性・底面摩擦・風応力・表面張力を無視する。水平方向の尺度は水深より十分大きく、水柱内の速度は鉛直方向にほぼ一様と近似し、圧力は静水圧近似で与える。滑らかな解だけを扱い、砕波と衝撃は対象外である。

[FLUID32 の回転座標系](../FLUID32/index.md#thm-fluid32-rotating-frame)で有効重力に遠心項を吸収し、水平回転成分に対する伝統的近似を用いる。初めに水深平均方程式から厚さで割った絶対渦度の保存を示し、その後、背景静止状態の小振幅で、回転に比べゆっくり変わる大規模流だけを残す。**浅水方程式そのものと地衡近似を同時に厳密な等式として扱わない**。

## 1. 緯度が変わると回転の強さが変わる

[FLUID32 の Coriolis パラメータ](../FLUID32/index.md#def-fluid32-coriolis-parameter)は $f(\varphi)=2\Omega\sin\varphi$ である。地球半径を $a>0$ [m]、基準緯度を $\varphi_0$（ラジアン）とし、局所平面で $y=a(\varphi-\varphi_0)$ を使う。Taylor 展開すると

$$
f(\varphi_0+y/a)
=2\Omega\sin\varphi_0
+\frac{2\Omega\cos\varphi_0}{a}y
+O\!\left(\Omega\frac{y^2}{a^2}\right).
$$

この一次近似が $\beta$ 面である。地衡流の最低次の釣合には定数 $f_0$ を使い、渦位の背景勾配には $\beta y$ を残すのが重要になる。

<a id="def-fluid33-beta-plane"></a>

<!-- formal-statement-start -->
> **定義（β面近似）**  
> 自転角速度 $\Omega>0$、半径 $a>0$ の球面上の基準緯度 $\varphi_0$ を固定する。東・北向き局所座標 $x,y$ で $|y|/a\ll1$ のとき、Coriolis パラメータを一次まで

$$
f(y)=f_0+\beta y,\qquad
f_0=2\Omega\sin\varphi_0,\qquad
\beta=\frac{2\Omega\cos\varphi_0}{a}
$$

> と近似する。$f_0$ の単位は s$^{-1}$、$\beta$ の単位は m$^{-1}$s$^{-1}$。中緯度の地衡近似には $f_0\ne0$ および領域幅 $L$ に対して $|\beta|L/|f_0|\ll1$ を課す。局所平面模型であって全球の厳密式ではない。
<!-- formal-statement-end -->

<!-- definition-example-start: def-fluid33-beta-plane -->
**定義の確認**：$\varphi_0=45^\circ$、$\Omega=7.29\times10^{-5}$ s$^{-1}$、$a=6.37\times10^6$ m を定義式へ代入すると

$$
f_0\simeq1.03\times10^{-4}\ {\rm s^{-1}},\qquad
\beta\simeq1.62\times10^{-11}\ {\rm m^{-1}s^{-1}}.
$$

例えば南北幅 $L=10^5$ m の領域を基準緯度の前後 $|y|\le L/2$ に取ると、

$$
\frac{|y|}{a}\le7.85\times10^{-3},\qquad
\frac{|\beta|L}{|f_0|}\simeq1.57\times10^{-2}.
$$

よって局所一次近似と定数 $f_0$ による地衡釣合の尺度条件をともに満たす。南緯45度では $f_0$ だけが負に変わり、$\beta$ はなお正である。赤道では $f_0=0$ なので後述の $1/f_0$ を用いる地衡近似はできない。
<!-- definition-example-end -->

## 2. 水柱は何を保存するか

回転する平底の二次元浅水方程式は、[FLUID29 の水深・流量の定義](../FLUID29/index.md#def-fluid29-depth-discharge)を水平方向二成分へ広げたものである。滑らかな $u,v,h$ に対し、

$$
D_t=\partial_t+u\partial_x+v\partial_y
$$

と書く。$\partial_t$ は位置 $x,y$ を固定した時間微分、$D_t$ は流体粒子に沿う**物質微分**である。

実際、粒子の位置 $(X(t),Y(t))$ が

$$
\frac{dX}{dt}=u(X,Y,t),\qquad\frac{dY}{dt}=v(X,Y,t)
$$

を満たすなら、任意の滑らかなスカラー場 $s(x,y,t)$ に対して連鎖律より

$$
\frac{d}{dt}s(X(t),Y(t),t)=s_t+u s_x+v s_y=D_ts
$$

となる（右辺は粒子位置で評価する）。この意味で以下の方程式は

$$
\begin{aligned}
D_tu-f(y)v&=-g h_x,\\
D_tv+f(y)u&=-g h_y,\\
h_t+(hu)_x+(hv)_y&=0.
\end{aligned}
$$

最後は水柱の質量収支であり、$h_t+u h_x+v h_y=-h(u_x+v_y)$ へ展開できる。相対渦度 $\zeta=v_x-u_y$ [s$^{-1}$] は[FLUID8 の渦度の定義](../FLUID8/index.md#def-fluid8-vorticity)の鉛直成分に相当する。固定した観測者が測る $\zeta$ と、地球回転も含めた $\zeta+f$ は別の量である。

回転が緯度で変わっても、**全渦度を水柱厚さで割ったもの**は非粘性・滑らかな浅水流に沿って保存される。

<a id="def-fluid33-shallow-pv"></a>

<!-- formal-statement-start -->
> **定義（浅水渦位）**  
> $h>0$、$f=f(y)$、微分可能な水平速度 $(u,v)$ をもつ二次元浅水流について、相対渦度 $\zeta=v_x-u_y$ と絶対渦度 $\zeta+f$ を区別し、

$$
q=\frac{\zeta+f(y)}{h}
$$

> を浅水渦位と定義する。単位は m$^{-1}$s$^{-1}$。この定義だけでは任意の摩擦付き流れでの保存を主張しない。
<!-- formal-statement-end -->

<!-- definition-example-start: def-fluid33-shallow-pv -->
**定義の確認**：$f=10^{-4}$ s$^{-1}$、$h=100$ m、$u=-10^{-6}y$、$v=10^{-6}x$ [m/s]（座標は m）なら $v_x=10^{-6}$ s$^{-1}$、$u_y=-10^{-6}$ s$^{-1}$、$\zeta=2\times10^{-6}$ s$^{-1}$。したがって $q=(1.02\times10^{-4})/100=1.02\times10^{-6}$ m$^{-1}$s$^{-1}$。相対渦度だけを割った値と混同しない。
<!-- definition-example-end -->

<a id="thm-fluid33-pv-conservation"></a>

<!-- formal-statement-start -->
> **定理（非粘性回転浅水流の渦位保存）**  
> 時空間で $h>0$、$(u,v,h)$ が二階の空間微分および一階の時間微分を許す滑らかな解であり、上記の二次元・平底・非粘性回転浅水方程式と $f=f(y)$ を満たすとする。このとき、[浅水渦位](#def-fluid33-shallow-pv)について

$$
D_tq=\partial_tq+u q_x+v q_y=0
$$

> が成り立つ。境界を横切る物質粒子についても、その粒子軌道が滑らかな領域内にある間だけ主張する。
<!-- formal-statement-end -->

### 証明の見取り図

運動方程式の東成分を $y$ で、北成分を $x$ で微分して引く。圧力（ここでは $gh$）の混合微分は相殺され、回転項の勾配 $\beta v$ が残る。連続式で水柱の伸縮率を消す。

<!-- proof-start -->
### 証明

北成分を $x$ 微分し、東成分の $y$ 微分を引く。$D_t$ と微分の交換では、例えば $\partial_x(D_tv)=D_tv_x+u_xv_x+v_xv_y$、$\partial_y(D_tu)=D_tu_y+u_yu_x+v_yu_y$ となる。差をまとめると

$$
\partial_x(D_tv)-\partial_y(D_tu)
=D_t\zeta+\zeta(u_x+v_y).
$$

回転項の差は

$$
\partial_x(fu)+\partial_y(fv)
=f(u_x+v_y)+f'(y)v,
$$

右辺の $-g(h_{yx}-h_{xy})$ は零。従って

$$
D_t\zeta+(\zeta+f)(u_x+v_y)+f'(y)v=0.
$$

$f$ は時間と $x$ に依存しないので $D_tf=f'(y)D_ty=f'(y)v$。ゆえに

$$
D_t(\zeta+f)=-(\zeta+f)(u_x+v_y),\qquad
D_th=-h(u_x+v_y).
$$

$h>0$ を使って商を微分すると

$$
D_t\left(\frac{\zeta+f}{h}\right)
=\frac{D_t(\zeta+f)}{h}
-\frac{\zeta+f}{h^2}D_th=0.
$$

ここで必要だったのは浅水方程式の滑らかさ、圧力が厚さだけで決まること、外力の回転成分・粘性の不在である。摩擦項が加われば curl の右辺が一般に残る。
<!-- proof-end -->

流体柱が薄くなると、同じ絶対渦度を保つには相対渦度が変わる。一方、同じ厚さで北へ移動する粒子は背景 $f$ が大きい場所へ入るため、$\zeta$ を小さくする必要がある。この二つの調整が Rossby 波の起源になる。

## 3. 遅い流れだけを取り出す：準地衡渦位

一層浅水流は速い重力波も支える。[FLUID29 の浅水長波速度](../FLUID29/index.md#thm-fluid29-characteristics)は静止水で $\sqrt{gH}$ だった。今欲しいのはこれより遅い、回転と緯度勾配の影響を受ける波である。

$h=H+\eta$、背景速度零、$|\eta|/H\ll1$、水平流速の二次項を無視できる程度に小さいとする。$\beta$ 面では、$|\beta y|/|f_0|\ll1$ の局所帯である。水平発散を $\delta=u_x+v_y$ と置けば、質量式と渦度式を速度と水面変位について一次化した段階では

$$
\eta_t+H\delta=0,\qquad
\zeta_t+(f_0+\beta y)\delta+\beta v=0
$$

となる。ここから、$|\beta y|/|f_0|\ll1$ によって伸縮係数の相対的に小さい補正 $\beta y\delta$ を落とす。ただし $\beta v$ は背景渦位の移流を表すため残す。こうして

$$
\eta_t+H(u_x+v_y)=0,\qquad
\zeta_t+f_0(u_x+v_y)+\beta v=0.
$$

後者の $f_0$ は最低次の伸縮項に使い、背景の北向き勾配 $\beta$ は残した。連続式を代入する途中式は

$$
f_0(u_x+v_y)=-\frac{f_0}{H}\eta_t,
\qquad
\left(\zeta-\frac{f_0}{H}\eta\right)_t+\beta v=0.
$$

[FLUID32 の地衡流速の成分](../FLUID32/index.md#thm-fluid32-geostrophic-formula)を、この自由表面模型の水平圧力ポテンシャル $g\eta$ に適用すると

$$
-f_0v_g=-g\eta_x,\qquad
f_0u_g=-g\eta_y.
$$

これにより $g\eta/f_0$ を一つの関数として使えば速度の両成分を表せる。以下の準地衡（quasi-geostrophic）近似では、[FLUID32 の Rossby 数](../FLUID32/index.md#def-fluid32-rossby-ekman)を用い、

$$
\mathrm{Ro}=\frac{U}{|f_0|L}\ll1,\qquad
\frac{1}{|f_0|T}\ll1,\qquad
\frac{|\beta|L}{|f_0|}\ll1,\qquad
\frac{|\eta|}{H}\ll1
$$

を仮定する。ここで $U$ は代表流速、$L$ は水平代表長さ、$T>0$ は変動の代表時間である。$1/T$ は代表的な時間変化率であって、微分演算子 $\partial_t$ の絶対値ではない。また $f_0\ne0$ が必要である。一次の渦位変化に対して速度の最低次を地衡流で近似する。非地衡速度は伸縮を通じて一次渦位式へ寄与し得るので、連続式の発散を**最初から零には置かない**。

<a id="def-fluid33-streamfunction-radius"></a>

<!-- formal-statement-start -->
> **定義（地衡流の流れ関数と一層変形半径）**  
> $g,H>0$、一定 $f_0\ne0$、小さな水面変位 $\eta$ を考える。最低次の地衡水平速度を

$$
\psi=\frac{g\eta}{f_0},\qquad
u_g=-\psi_y,\qquad v_g=\psi_x
$$

> で表すとき、$\psi$ [m$^2$/s] をこの模型の地衡流れ関数とする。また

$$
L_D=\frac{\sqrt{gH}}{|f_0|}>0
$$

> [m] を一層自由表面浅水模型の変形半径と定義する。鉛直成層の連続模型では同じ $gH$ を無条件に用いず、鉛直モードごとの有効波速に置き換える必要がある。
<!-- formal-statement-end -->

<!-- definition-example-start: def-fluid33-streamfunction-radius -->
**定義の確認**：$g=10$ m/s$^2$、$H=1000$ m、$f_0=10^{-4}$ s$^{-1}$ なら $\sqrt{gH}=100$ m/s なので $L_D=10^6$ m。さらに $\psi=A\cos(kx+\ell y)$（$A$ は m$^2$/s、$k,\ell$ は m$^{-1}$）とすると $u_g=-\psi_y=A\ell\sin(kx+\ell y)$、$v_g=\psi_x=-Ak\sin(kx+\ell y)$。両成分を微分して $u_{g,x}+v_{g,y}=Ak\ell\cos-Ak\ell\cos=0$。水面を $\eta=f_0\psi/g$ と置けば、$f_0$ が一定なので

$$
-f_0v_g=-f_0\psi_x=-g\eta_x,\qquad
f_0u_g=-f_0\psi_y=-g\eta_y.
$$

よって[地衡流の両成分の釣合](../FLUID32/index.md#thm-fluid32-geostrophic-formula)を直接確認できる。この例では、二つの速度成分と水面勾配の対応をそれぞれ計算している。
<!-- definition-example-end -->

水平勾配を $\nabla_h=(\partial_x,\partial_y)$、水平 Laplace 演算子を $\Delta_h=\nabla_h^2=\partial_x^2+\partial_y^2$ と記す。$\Delta_h\psi$ は地衡速度 $(u_g,v_g)=(-\psi_y,\psi_x)$ の鉛直渦度 $v_{g,x}-u_{g,y}$ に一致する。

<a id="thm-fluid33-qg-pv"></a>

<!-- formal-statement-start -->
> **定理（静止背景まわりの線形準地衡渦位方程式）**  
> 上記の平底、一層、非粘性、一定 $H,g$ の $\beta$ 面浅水模型で、$f_0\ne0$、$\beta L/|f_0|\ll1$、微小擾乱と遅い運動の準地衡近似を採用する。十分滑らかな流れ関数 $\psi(x,y,t)$ に対し、一次の準地衡渦位偏差

$$
Q'=\nabla_h^2\psi-\frac{\psi}{L_D^2}
$$

> は次の線形方程式を満たす。

$$
\boxed{\partial_t\left(\nabla_h^2\psi-\frac{\psi}{L_D^2}\right)
+\beta\,\partial_x\psi=0.}
$$

> ここで $Q'$ の単位は s$^{-1}$ で、前節の $q$ の単位とは異なる。一次の偏差では $Q'=H\{q-f(y)/H\}$ の近似関係にある。
<!-- formal-statement-end -->

### 証明の見取り図

直前に導いた「渦度 − 厚さの寄与」の時間微分に、地衡表示を代入する。渦度は $\nabla_h^2\psi$、水面の項は $\psi/L_D^2$ になる。

<!-- proof-start -->
### 証明

まず[浅水渦位の定義](#def-fluid33-shallow-pv)と $h=H+\eta$ から、$|\eta|/H\ll1$ に対して

$$
\begin{aligned}
q&=\frac{f+\zeta}{H+\eta}
=\frac{f+\zeta}{H}\left(1-\frac{\eta}{H}+O\!\left(\frac{\eta^2}{H^2}\right)\right),\\
H\left(q-\frac{f}{H}\right)
&=\zeta-\frac{f\eta}{H}+O\!\left(\frac{|\zeta\eta|}{H}+\frac{|f|\eta^2}{H^2}\right)
\simeq\zeta-\frac{f_0}{H}\eta.
\end{aligned}
$$

最後の近似では $|\beta y|/|f_0|\ll1$ を用い、$f\eta/H$ の係数だけを $f_0$ に替えた。これが、厚さで割った渦位 $q$ から線形偏差 $Q'$ へ移る根拠である。次に地衡表示を二回微分すると

$$
\zeta_g=\partial_xv_g-\partial_yu_g
=\psi_{xx}+\psi_{yy}.
$$

さらに $\eta=(f_0/g)\psi$ であるから

$$
\frac{f_0}{H}\eta=\frac{f_0^2}{gH}\psi=\frac{\psi}{L_D^2}.
$$

一次の渦位変化 $\zeta_t-(f_0/H)\eta_t+\beta v=0$ で、最低次の $\zeta$ と $v$ をそれぞれ $\zeta_g$ と $\psi_x$ で近似する。その結果

$$
\partial_t\left(\psi_{xx}+\psi_{yy}-\frac{\psi}{L_D^2}\right)
+\beta\psi_x=0
$$

を得る。この順序では非地衡発散を消していない。もし初めから $(u_x+v_y)=0$ を浅水質量式へ代入すれば、誤って $\eta_t=0$ を強制し、Rossby 波の伸縮寄与を失う。
<!-- proof-end -->

平均深さを固定して $\eta=0$ とみなせる極限は $L_D\to\infty$ の順圧的な近似であり、有限 $L_D$ の波と周波数の波数依存性が異なる。$L_D$ が有限なのは、表面の変位が流体柱の厚さを変え、渦位へ戻るためである。

## 4. 何が「西向き」を決めるか

$\beta>0$ の中緯度、平面全体または周期領域を考える。境界条件をまだ課さない平面波の周波数は、流れ関数を

$$
\psi(x,y,t)=A\cos(kx+\ell y-\omega t)
$$

と置いて求められる。$A$ [m$^2$/s]、波数 $k,\ell$ [m$^{-1}$]、角周波数 $\omega$ [s$^{-1}$] は実数。$k$ は東西、$\ell$ は南北の波数である。

<a id="thm-fluid33-rossby-dispersion"></a>

<!-- formal-statement-start -->
> **定理（静止背景の線形 Rossby 波の分散関係）**  
> [線形準地衡渦位方程式](#thm-fluid33-qg-pv)を、$\beta$ 一定、$f_0\ne0$、$L_D>0$ 一定の領域で考える。$A\ne0$、$(k,\ell)\ne(0,0)$ をもつ上記の平面波が方程式を満たす必要十分条件は

$$
\boxed{\omega=-\frac{\beta k}{k^2+\ell^2+L_D^{-2}}.}
$$

> $\beta>0$、$k\ne0$ なら東西位相速度 $c_{px}=\omega/k$ は負、すなわち西向きである。$k=0$ では $\omega=0$ となり東西位相速度 $\omega/k$ は定義しない。これは静止背景の線形・平面波の結論であり、実際のすべての Rossby 波群が西へ進むことを意味しない。
<!-- formal-statement-end -->

### 証明の見取り図

空間二階微分は波数の二乗に $-$ を付け、時間微分は位相の時間微分で $\omega$ を取り出す。分母は正なので $\beta k$ の符号が位相速度を決める。

<!-- proof-start -->
### 証明

$\theta=kx+\ell y-\omega t$、$D=k^2+\ell^2+L_D^{-2}>0$ とする。$\nabla_h^2\psi=-(k^2+\ell^2)A\cos\theta$ なので

$$
Q'=-DA\cos\theta,\qquad
\partial_tQ'=-DA\omega\sin\theta,\qquad
\partial_x\psi=-Ak\sin\theta.
$$

方程式の左辺は $-A(D\omega+\beta k)\sin\theta$。全ての $(x,y,t)$ で零となるには $D\omega+\beta k=0$ が必要十分。よって指定の分散関係を得る。$D>0$、$\beta>0$ から $c_{px}=-\beta/D<0$ が従う。

$k=0$ では $\partial_x\psi=0$ かつ $\omega=0$ で定常模様になる。$\beta=0$ でも同じ線形枝は定常であり、回転するだけではこの低周波 Rossby 波は生じない。
<!-- proof-end -->

**手で計算する例**：$\beta=1.6\times10^{-11}$ m$^{-1}$s$^{-1}$、$L_D=10^6$ m、$k=2\times10^{-6}$ m$^{-1}$、$\ell=10^{-6}$ m$^{-1}$ とする。

$$
D=(4+1+1)\times10^{-12}=6\times10^{-12}\ {\rm m^{-2}},
$$

$$
\omega=-\frac{1.6\times10^{-11}\cdot2\times10^{-6}}{6\times10^{-12}}
=-5.333\ldots\times10^{-6}\ {\rm s^{-1}}.
$$

したがって $c_{px}=-2.666\ldots$ m/s、位相が一周期進む時間は $T=2\pi/|\omega|\simeq1.18\times10^6$ s（約13.6日）。$k>0$ なのに $\omega<0$ という符号が西向きを表す。これは海全体がこの速度で西へ輸送されるという主張ではない。

## 5. 位相が西へ進んでも波束は別方向へ進める

[FLUID28 の群速度](../FLUID28/index.md#def-fluid28-group-velocity)は、近接する波の包絡の移動から定義した。二次元なら $\boldsymbol c_g=(\partial_k\omega,\partial_\ell\omega)$ である。Rossby 波ではこれを実際に微分すると、東向き群速度が可能になる。

<a id="prop-fluid33-group-velocity"></a>

<!-- formal-statement-start -->
> **命題（Rossby 波の群速度）**  
> [分散関係](#thm-fluid33-rossby-dispersion)の $D=k^2+\ell^2+L_D^{-2}>0$ に対し、他方の波数を固定して偏微分すると

$$
c_{gx}=\frac{\beta(k^2-\ell^2-L_D^{-2})}{D^2},
\qquad
c_{gy}=\frac{2\beta k\ell}{D^2}.
$$

> $\beta>0$ で $k^2>\ell^2+L_D^{-2}$ なら $c_{gx}>0$。位相の西進と群速度の東進は両立する。
<!-- formal-statement-end -->

### 証明の見取り図

$-\,\beta kD^{-1}$ に積と合成関数の微分を適用し、$D_k=2k$、$D_\ell=2\ell$ を使う。

<!-- proof-start -->
### 証明

$$
\begin{aligned}
\partial_k\omega
&=-\beta D^{-1}+\beta kD^{-2}(2k)\\
&=\frac{\beta(2k^2-D)}{D^2}
=\frac{\beta(k^2-\ell^2-L_D^{-2})}{D^2},\\
\partial_\ell\omega
&=-\beta k(-D^{-2})(2\ell)
=\frac{2\beta k\ell}{D^2}.
\end{aligned}
$$

$D^2>0$ なので、$x$ 成分の符号は分子の $k^2-\ell^2-L_D^{-2}$ だけで判定できる。
<!-- proof-end -->

先ほどの数値例では $c_{gx}=0.888\ldots$ m/s、$c_{gy}=1.777\ldots$ m/s。**位相は西、包絡の $x$ 成分は東**という非直感的な組合せである。ただし包絡が群速度で動く説明には、狭い波数帯の重ね合わせ、弱い分散変動、境界反射・非線形変形を無視できることが必要である。

<a id="prop-fluid33-quadratic-energy"></a>

<!-- formal-statement-start -->
> **命題（周期領域での準地衡波の二次量保存）**  
> $L_D>0$、$\beta$ 一定とし、十分滑らかな実数値の解 $\psi$ が水平二方向に周期境界条件を満たして[線形準地衡渦位方程式](#thm-fluid33-qg-pv)に従うとする。周期セル $\mathcal D$ に対して

$$
E(t)=\frac12\int_{\mathcal D}
\left(|\nabla_h\psi|^2+\frac{\psi^2}{L_D^2}\right)\,dx\,dy
$$

> は時間に依存しない。$E$ は正の二次不変量であり、次元や定数因子を付けずにそのまま現実の全エネルギーと同一視しない。
<!-- formal-statement-end -->

### 証明の見取り図

準地衡渦位方程式へ $\psi$ を掛け周期セルで積分する。部分積分した時間項は $-dE/dt$ になり、$\psi\psi_x$ は周期端点で相殺する。

<!-- proof-start -->
### 証明

周期性で境界積分が消えるので、

$$
\int_{\mathcal D}\psi\,\partial_t\Delta_h\psi
=-\int_{\mathcal D}\nabla_h\psi\cdot\nabla_h\partial_t\psi
=-\frac12\frac{d}{dt}\int_{\mathcal D}|\nabla_h\psi|^2.
$$

また

$$
-\frac{1}{L_D^2}\int_{\mathcal D}\psi\partial_t\psi
=-\frac{1}{2L_D^2}\frac{d}{dt}\int_{\mathcal D}\psi^2,
\quad
\beta\int_{\mathcal D}\psi\psi_x
=\frac{\beta}{2}\int_{\mathcal D}\partial_x(\psi^2)=0.
$$

三項の和は零だから $-dE/dt=0$。周期性がなければ境界流束を評価する必要があり、任意の開境界で無条件の保存を主張できない。
<!-- proof-end -->

## 6. 成層・全球・非線形では何が変わるか

この一層模型の $L_D=\sqrt{gH}/|f_0|$ は**自由表面の復元力**から出た。実際の成層流では[FLUID31 の浮力振動数](../FLUID31/index.md#def-fluid31-bv-frequency)と鉛直境界条件により内部モードの重力波速度が決まる。各鉛直モードが許される条件下では、その波速 $c_n$ を用いた $L_{D,n}=c_n/|f_0|$ が現れる。一層模型の水深 $H$ を成層厚さへそのまま読み替えることはできない。

**この導出が破れる場合**：赤道近くでは $f_0\simeq0$ となり地衡表示 $\psi=g\eta/f_0$ が特異になる。大きな Rossby 数や速い変動では慣性・重力波との分離ができない。摩擦や風応力があれば渦位に生成・散逸項が入る。有限領域では海岸・地形と境界条件から固有モードを選び、全球では球面幾何を扱う。大振幅・非線形なら渦位の移流 $u\partial_xQ'+v\partial_yQ'$ を無視できず、線形分散関係のみで進化を予言できない。

特に「Rossby 波は必ず西向き」は位相速度と波束の速度を混同した表現である。[群速度の命題](#prop-fluid33-group-velocity)はその反例を明示している。

## 7. ブラウザ Python ラボ：西進位相と東進群速度

線形の分散式から周波数、位相速度、群速度を計算し、同じ解析的流れ関数で波形・渦位方程式の残差を調べる。プリセットで $k,\ell,L_D$ を変えれば、位相が西向きでも群速度の東西が反転することを検証できる。通常実行は標準ライブラリのみで JSON 数値と描画データを出力し、--plot 指定時は Matplotlib で同じ式の流れ関数の等高線を描く。

**これは線形平面波の解析式の検算であり、非線形の海流を時間積分する数値シミュレーションではない。** 検算残差が小さいことと、現実の地球流体へ適用できることは別である。

```python-file-lab
# lab-id: FLUID33-ROSSBY-WAVE
# lab-title: Rossby波の波数依存・位相・群速度と渦位残差
# lab-file: textbook/volumes/dream_thater/物理系/FLUID/FLUID33/rossby_wave_lab.py
# timeout-ms: 15000
# lab-preset: 西進位相・東向き群速度 | --beta 1.6e-11 --f0 1e-4 --depth 1000 --k 2e-6 --ell 1e-6 --amplitude 10000
# lab-preset: 西進位相・西向き群速度 | --beta 1.6e-11 --f0 1e-4 --depth 1000 --k 5e-7 --ell 1e-6 --amplitude 10000
# lab-preset: 南北波数を反転 | --beta 1.6e-11 --f0 -1e-4 --depth 1000 --k 2e-6 --ell -1e-6 --amplitude 10000
# lab-preset: 位相の二次元等高線 | --beta 1.6e-11 --f0 1e-4 --depth 1000 --k 2e-6 --ell 1e-6 --amplitude 10000 --plot
```

図では色だけでなく等高線の数値ラベルと正負を用いる。図が表示できない環境でも、波数・時間・解析残差と一次元位相断面の数表から検算できる。

## 8. 演習

特に断らなければ北半球中緯度の平底、一層・非粘性・線形準地衡 $\beta$ 面模型を用い、$g,H>0$、$f_0\ne0$、$\beta>0$ とする。数値問題では単位と符号の根拠を記す。

### Level A

### A1. $\beta$ と単位

$\Omega=7.29\times10^{-5}$ s$^{-1}$、$a=6.37\times10^6$ m、$\varphi_0=0$ と $\varphi_0=60^\circ$ について $f_0,\beta$ の符号を求め、地衡近似の可否を判定せよ。

- Level: A

<!-- solution-start -->
#### 詳細解答

[定義](#def-fluid33-beta-plane)より赤道では $f_0=0$、$\beta=2\Omega/a\simeq2.29\times10^{-11}$ m$^{-1}$s$^{-1}$ で、後者が有限でも $1/f_0$ を使う近似はできない。北緯60度では $f_0=2\Omega(\sqrt3/2)\simeq1.26\times10^{-4}$ s$^{-1}$、$\beta=(2\Omega/a)(1/2)\simeq1.14\times10^{-11}$ m$^{-1}$s$^{-1}$。さらに領域幅について $\beta L/|f_0|\ll1$ が必要であり、緯度だけでは最終判定はできない。
<!-- solution-end -->

### A2. 絶対渦度と浅水渦位

$f=10^{-4}$ s$^{-1}$、$u=-3\times10^{-6}y$、$v=2\times10^{-6}x$ [m/s]、$h=200$ m の点で、$\zeta$、$\zeta+f$、$q$ をそれぞれ求めよ。

- Level: A

<!-- solution-start -->
#### 詳細解答

$u_y=-3\times10^{-6}$、$v_x=2\times10^{-6}$ s$^{-1}$ なので $\zeta=v_x-u_y=5\times10^{-6}$ s$^{-1}$。絶対渦度は $1.05\times10^{-4}$ s$^{-1}$、[浅水渦位](#def-fluid33-shallow-pv)は $q=1.05\times10^{-4}/200=5.25\times10^{-7}$ m$^{-1}$s$^{-1}$。厚さで割る前後の単位も異なる。
<!-- solution-end -->

### A3. 変形半径と地衡流

$g=10$ m/s$^2$、$H=1000$ m、$f_0=-10^{-4}$ s$^{-1}$、$\eta=0.2\cos(10^{-6}x)$ m とする。$L_D$ と $(u_g,v_g)$ を求め、南半球の符号を確認せよ。

- Level: A

<!-- solution-start -->
#### 詳細解答

[変形半径](#def-fluid33-streamfunction-radius)は $L_D=100/10^{-4}=10^6$ m。$\eta_x=-2\times10^{-7}\sin(10^{-6}x)$、$\eta_y=0$ である。$\psi=(g/f_0)\eta=-2\times10^4\cos(10^{-6}x)$ m$^2$/s だから $u_g=-\psi_y=0$、$v_g=\psi_x=0.02\sin(10^{-6}x)$ m/s。これは $-f_0v_g=-g\eta_x$ へ代入しても一致する。$f_0<0$ を絶対値に置換して方向を失ってはいけない。
<!-- solution-end -->

### A4. 波の周波数と西向き速度

$\beta=2\times10^{-11}$ m$^{-1}$s$^{-1}$、$k=2\times10^{-6}$ m$^{-1}$、$\ell=0$、$L_D=10^6$ m について $\omega$、$c_{px}$、周期 $T$ を求めよ。

- Level: A

<!-- solution-start -->
#### 詳細解答

$D=k^2+L_D^{-2}=5\times10^{-12}$ m$^{-2}$。[分散式](#thm-fluid33-rossby-dispersion)から $\omega=-4\times10^{-17}/(5\times10^{-12})=-8\times10^{-6}$ s$^{-1}$。したがって $c_{px}=\omega/k=-4$ m/s、$T=2\pi/|\omega|=7.85\times10^5$ s。$T$ は正、位相速度は西向きで負となる。
<!-- solution-end -->

### A5. 北進する粒子の相対渦度

流体柱の厚さが一定で、北へ動く粒子が $f$ の増加量 $3\times10^{-6}$ s$^{-1}$ を経験した。摩擦と伸縮がなく浅水渦位が保存されるとき、粒子の相対渦度はどれだけ変化するか。

- Level: A

<!-- solution-start -->
#### 詳細解答

厚さ $h$ が一定なら[渦位保存](#thm-fluid33-pv-conservation)は $\zeta+f$ 一定を意味する。よって $\Delta\zeta=-\Delta f=-3\times10^{-6}$ s$^{-1}$。背景 $f$ が増える分だけ相対渦度が減る。もし $h$ が変われば $\zeta+f$ そのものは一定と限らず、この計算は成立しない。
<!-- solution-end -->

### Level B

### B1. 商の保存を導く

回転浅水方程式で $D_t(\zeta+f)=-(\zeta+f)\delta$、$D_th=-h\delta$、$\delta=u_x+v_y$ が成立するとする。$\zeta+f$ と $h$ がともに変化しても $q$ が保存されることを示せ。さらに摩擦の curl が $S$ として第1式の右辺に加わった場合を求めよ。

- Level: B

<!-- solution-start -->
#### 詳細解答

$h>0$ だから商の微分則が使える。

$$
D_tq=\frac{D_t(\zeta+f)}{h}-\frac{\zeta+f}{h^2}D_th
=-\frac{(\zeta+f)\delta}{h}+\frac{(\zeta+f)\delta}{h}=0.
$$

摩擦による curl 項 $S$ [s$^{-2}$] が第1式に加わる場合、同じ代入では $D_tq=S/h$ となる。よって非粘性の仮定が保存の核心であり、摩擦のある系に保存を機械的に延長できない。
<!-- solution-end -->

### B2. 浅水線形化から準地衡渦位へ

$\eta_t+H\delta=0$、$\zeta_t+f_0\delta+\beta v=0$ から、地衡表示を使う前に厚さを消去せよ。その後、$\psi=g\eta/f_0$ と地衡速度を代入して QG 方程式を導け。なぜ最初から $\delta=0$ としてはいけないか。

- Level: B

<!-- solution-start -->
#### 詳細解答

質量式より $\delta=-\eta_t/H$。渦度式へ代入すると $\zeta_t-(f_0/H)\eta_t+\beta v=0$ なので

$$
\partial_t\left(\zeta-\frac{f_0}{H}\eta\right)+\beta v=0.
$$

地衡の最低次では $\zeta=\partial_x(\psi_x)-\partial_y(-\psi_y)=\Delta_h\psi$、$v=\psi_x$、$\eta=(f_0/g)\psi$。従って $(f_0/H)\eta=(f_0^2/gH)\psi=\psi/L_D^2$。最終的に

$$
\partial_t(\Delta_h\psi-L_D^{-2}\psi)+\beta\psi_x=0.
$$

先に $\delta=0$ と置けば質量式から $\eta_t=0$ と誤結論し、伸縮に対応する $-L_D^{-2}\psi_t$ を失う。地衡流の発散零は**最低次の速度**の性質であり、時間発展に必要な次次数の発散を消してよい理由ではない。
<!-- solution-end -->

### B3. 東進する群速度の条件

$\ell=0$、$\beta>0$ の Rossby 波について、東西群速度の正負を $kL_D$ で分類せよ。$kL_D=2$ なら位相速度との向きを比較せよ。

- Level: B

<!-- solution-start -->
#### 詳細解答

[群速度](#prop-fluid33-group-velocity)に $\ell=0$ を代入すれば

$$
c_{gx}=\frac{\beta(k^2-L_D^{-2})}{(k^2+L_D^{-2})^2}.
$$

従って $|k|L_D>1$ なら東向き、$|k|L_D<1$ なら西向き、等号なら零。一方 $k\ne0$ では $c_{px}=-\beta/(k^2+L_D^{-2})<0$ なので、$kL_D=2$ の場合、位相は西向きでも群速度の $x$ 成分は東向きである。
<!-- solution-end -->

### B4. 周期境界と保存量

周期領域で $\partial_t(\Delta_h\psi-L_D^{-2}\psi)+\beta\psi_x=0$ が成立する。$\psi$ を掛けて積分し、正の二次量 $E(t)$ が保存されることを証明せよ。非周期領域でそのまま結論できない箇所も示せ。

- Level: B

<!-- solution-start -->
#### 詳細解答

$\psi$ 倍した式の第1項を周期境界で部分積分すると

$$
\int_{\mathcal D}\psi\partial_t\Delta_h\psi
=-\int_{\mathcal D}\nabla_h\psi\cdot\nabla_h\psi_t
=-\frac12\frac{d}{dt}\int_{\mathcal D}|\nabla_h\psi|^2.
$$

第2項は $-(2L_D^2)^{-1}d(\int\psi^2)/dt$。最後は $\beta\int\psi\psi_x=(\beta/2)\int\partial_x(\psi^2)=0$。従って $dE/dt=0$ である。非周期領域では積分の境界項 $\int_{\partial\mathcal D}\psi\partial_t\nabla\psi\cdot n\,ds$ や $\int_{\partial\mathcal D}\psi^2n_x\,ds$ が一般に残る。
<!-- solution-end -->

### Level C

### C1. 回転浅水から数値分散・適用条件まで

$\Omega=7.29\times10^{-5}$ s$^{-1}$、$a=6.37\times10^6$ m、北緯45度、$g=10$ m/s$^2$、$H=1000$ m とする。近似的に $\beta=1.6\times10^{-11}$ m$^{-1}$s$^{-1}$、$f_0=10^{-4}$ s$^{-1}$ を使用し、$\psi=A\cos(kx+\ell y-\omega t)$、$A=10^4$ m$^2$/s、$k=2\times10^{-6}$ m$^{-1}$、$\ell=10^{-6}$ m$^{-1}$ とする。(i) $L_D,D,\omega,T,c_{px},(c_{gx},c_{gy})$ を求め、(ii) 速度と水面変位の最大振幅を求め、(iii) $\mathrm{Ro}\simeq U/(|f_0|L)$ を $U=A\sqrt{k^2+\ell^2}$、$L=(k^2+\ell^2)^{-1/2}$ として計算し、$\beta L/|f_0|$ と $|\omega/f_0|$ とともに模型の妥当性を論じよ。

- Level: C

<!-- solution-start -->
#### 詳細解答

(i) $L_D=\sqrt{10\cdot1000}/10^{-4}=10^6$ m。$D=k^2+\ell^2+L_D^{-2}=6\times10^{-12}$ m$^{-2}$。

$$
\omega=-\frac{(1.6\times10^{-11})(2\times10^{-6})}{6\times10^{-12}}
=-5.333\ldots\times10^{-6}\ {\rm s^{-1}}.
$$

$T=2\pi/|\omega|\simeq1.1781\times10^6$ s（13.6日）、$c_{px}=\omega/k=-2.666\ldots$ m/s。群速度は

$$
\begin{aligned}
c_{gx}&=\frac{(1.6\times10^{-11})(4-1-1)\times10^{-12}}{(6\times10^{-12})^2}
=0.888\ldots\ {\rm m/s},\\
c_{gy}&=\frac{2(1.6\times10^{-11})(2\times10^{-6})(10^{-6})}{(6\times10^{-12})^2}
=1.777\ldots\ {\rm m/s}.
\end{aligned}
$$

(ii) $\theta=kx+\ell y-\omega t$ とすると、$u_g=A\ell\sin\theta$、$v_g=-Ak\sin\theta$。最大速度振幅は $A\sqrt{k^2+\ell^2}=10^4\sqrt5\times10^{-6}\simeq0.02236$ m/s。水面変位 $\eta=(f_0/g)\psi$ の最大振幅は $(10^{-4}/10)10^4=0.10$ m、よって $|\eta|/H\le10^{-4}$。

(iii) $L=1/\sqrt5\times10^6\simeq4.472\times10^5$ m、$\mathrm{Ro}=A(k^2+\ell^2)/|f_0|=10^4(5\times10^{-12})/10^{-4}=5\times10^{-4}$。さらに

$$
\frac{\beta L}{|f_0|}
=\frac{(1.6\times10^{-11})(4.472\times10^5)}{10^{-4}}
\simeq0.0716,
\qquad
\frac{|\omega|}{|f_0|}\simeq0.0533.
$$

いずれも1より小さく、選んだ尺度では準地衡・小振幅近似は一応整合的である。ただし小パラメータが零ではなく、有限海盆での境界、摩擦、鉛直成層、球面幾何の誤差までゼロとは言えない。位相は西へ、群速度の $x$ 成分は東へ進む。
<!-- solution-end -->

## 9. まとめ

- 緯度変化 $\beta=\partial_y f$ は、薄い流体柱の**絶対渦度 / 水深**が保存されることを通じて、遅い波を生む。
- 準地衡渦位は $\Delta_h\psi-L_D^{-2}\psi$。厚さによる伸縮を含めるので、地衡流の水平発散が零という一事だけで $\eta_t$ を消してはならない。
- 線形 Rossby 波の $\omega=-\beta k/(k^2+\ell^2+L_D^{-2})$ は西向き位相伝播を与える一方、群速度の向きは波数で変わる。赤道・強い非線形・境界・摩擦ではこの分散式を無条件に使えない。
