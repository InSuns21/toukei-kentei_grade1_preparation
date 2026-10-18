# GR13 Newton極限とPoisson方程式

<!-- definition-example-audit: strict -->

[GR3の測地線方程式](../GR3/index.md#thm-gr3-stationary-action)は自由落下の軌道を計量から決め、[GR12のEinstein場の方程式](../GR12/index.md#thm-gr12-einstein-equation)は物質から計量を決めます。しかしこれだけでは、地上で測る加速度がNewton力学の重力加速度と一致するのか、また重力定数 $G$ が実験上のNewton定数と一致するのか分かりません。今度は**弱い重力場、遅い粒子、圧力の小さい物質**に限定し、この二つの方程式を順につなぎます。

Newton理論では重力ポテンシャル $\Phi$ （単位 $\mathrm{m}^2/\mathrm{s}^2$）から加速度 $-\nabla\Phi$ を求め、質量密度 $\rho$ （単位 $\mathrm{kg}/\mathrm{m}^3$）と $\Delta\Phi=4\pi G\rho$ で結びます。$\Delta=\partial_x^2+\partial_y^2+\partial_z^2$ は直交空間座標でのLaplacianです。こちらの式を**結論として仮定せず**、一般相対論側から係数と符号を導くのが本章の目標です。

全体を通し符号は $(-,+,+,+)$、座標は $x^0=ct$、$i,j=1,2,3$、$G>0,c>0$、$\kappa=8\pi G/c^4$ とします。時空は滑らかな4次元Lorentz時空で、曲率規約は[GR6の曲率成分](../GR6/index.md#prop-gr6-coordinate-curvature)、接続は[LORG4のLevi-Civita接続](../../../幾何系/LORG/LORG4/index.md#thm-lorg4-lorentz-levi-civita)に従います。通常のNewton極限では宇宙項を $\Lambda=0$ とし、最後に非零の場合を比較します。

## 1. どのような計量を「弱い重力」と呼ぶか

ある長さ $L>0$ の局所座標領域で、基準となるMinkowski計量との差が小さいとします。小ささを無次元量 $0<\epsilon\ll1$ で表し、$O(\epsilon^k)$ は $\epsilon\to0$ のとき対応する定数倍で抑えられる量を意味します。座標微分の大きさも必要です。たとえば計量のずれが $O(\epsilon)$ でも、非常に急に振動すれば曲率が小さいとは限りません。以下の $O$ 評価は、計量の一次・二次空間微分に対してそれぞれ $L^{-1},L^{-2}$ の尺度を掛けて解釈します。

ここでNewtonポテンシャルを **計量の時間成分の一次のずれ**として読み取る約束を作ります。座標時刻と局所固有時の比を決めるのが $g_{00}$ であることは、[GR2の静的直交座標模型の時計係数](../GR2/index.md#def-gr2-static-clock-model)に対応します。

<a id="def-gr13-newton-potential"></a>

<!-- formal-statement-start -->
> **定義（静的弱場のNewtonポテンシャル）**  
> 長さ尺度 $L$ を持つ領域上で、時間に依存しないLorentz計量が $x^0=ct$ の座標で $g_{0i}=0$ を満たし、$C^2$ 級関数 $\Phi=\Phi(x^1,x^2,x^3)$ を用いて

$$
g_{00}=-\left(1+\frac{2\Phi}{c^2}\right)+O(\epsilon^2),
\qquad g_{ij}=\delta_{ij}+O(\epsilon)
$$

> と書け、$|\Phi|/c^2=O(\epsilon)$、$\partial_i\Phi/c^2=O(\epsilon/L)$、$\partial_i\partial_j\Phi/c^2=O(\epsilon/L^2)$ であるとする。計量の誤差項にも同じ尺度の微分評価を課す。このとき $\Phi$ を、この座標と近似の下での **Newtonポテンシャル**と呼ぶ。粒子の座標速度は $v^i=dx^i/dt$ とし、$|v|/c=O(\sqrt\epsilon)$ の低速域を扱う。さらに $g_{ij}$ の一次・二次微分もそれぞれ $O(\epsilon/L),O(\epsilon/L^2)$ と仮定する。
<!-- formal-statement-end -->

計量の時間成分を使うのは、遅い粒子では時間方向の速度 $dx^0/dt=c$ が空間方向の速度より大きく、測地線の時間・時間項が支配的になるためです。逆に空間計量を厳密に $\delta_{ij}$ と置く定義ではありません。**$g_{ij}$ の一次補正は、Einsteinテンソルの00成分に寄与し得ます。** $\Phi$ に定数を足す自由度は、弱場での時間座標の再規格化に対応します。境界で $\Phi\to0$ などの基準を指定して初めて零点が定まります。

<!-- definition-example-start: def-gr13-newton-potential -->
**定義の確認。** 定数 $a>0$ と $L>0$ を取り、$|az|/c^2\le\epsilon/2$ の狭い領域で[GR1のRindler計量](../GR1/index.md#prop-gr1-rindler-metric)を使います。

$$
ds^2=-\left(1+\frac{az}{c^2}\right)^2(dx^0)^2+dx^2+dy^2+dz^2.
$$

展開すると $g_{00}=-1-2az/c^2-(az/c^2)^2$ なので $\Phi=az$ を選べます。$g_{0i}=0$、$g_{ij}=\delta_{ij}$、$\partial_z\Phi=a$、$\partial_i\partial_j\Phi=0$、$\epsilon$ の二次誤差は $(az/c^2)^2$ です。$aL/c^2=O(\epsilon)$ の範囲なら一次微分と二次微分の評価も満たします。例えば静止していない粒子で $|v|/c=O(\sqrt\epsilon)$ を選べば速度の条件も満たします。計量がLorentz型であることは $1+az/c^2>0$ と対角成分の符号から分かります。

この例は**平坦時空の加速座標**です。$\Phi$ が空間で変化しても、曲率や物質の存在までは結論できません。ポテンシャルの勾配が加速度を生み、二階微分が潮汐と関係する違いを後で使います。
<!-- definition-example-end -->

## 2. 測地線からNewtonの運動方程式を得る

自由粒子の曲線を固有時 $\tau$ で書いた[GR3の自由落下方程式](../GR3/index.md#thm-gr3-stationary-action)は、$\Gamma^\rho_{\mu\nu}$ を接続係数として

$$
\frac{d^2x^\rho}{d\tau^2}
+\Gamma^\rho_{\mu\nu}
\frac{dx^\mu}{d\tau}\frac{dx^\nu}{d\tau}=0
$$

です。Newton理論と比較するには座標時刻 $t$ での二階微分を求めます。$t$ は一般にアフィンパラメータではないため、$\tau$ をただ $t$ に置換するのは誤りです。

<a id="prop-gr13-newton-acceleration"></a>

<!-- formal-statement-start -->
> **命題（弱場・低速測地線のNewton加速度）**  
> [静的弱場のNewtonポテンシャル](#def-gr13-newton-potential)の条件を満たし、未来向き時間的自由粒子の座標時刻 $t$ が単調に増えるとする。この粒子が低速条件を満たす間、空間座標での加速度は

$$
\boxed{\frac{d^2x^i}{dt^2}
=-\partial_i\Phi+O(\epsilon^2c^2/L)}
$$

> となる。これは指定した弱場座標系での座標加速度であり、任意の座標系で成立するテンソル等式ではない。
<!-- formal-statement-end -->

### 証明の見取り図

まず時間成分の計量微分から $\Gamma^i_{00}$ を求めます。次に、測地線を $\tau$ から $t$ に再パラメータ化して余分に出る項が低速で一段小さいことを確かめます。

<!-- proof-start -->
### 証明

[接続係数の式](../../../幾何系/LORG/LORG4/index.md#thm-lorg4-lorentz-levi-civita)に $\partial_0g_{\mu\nu}=0$ と $g_{0i}=0$ を代入すると、

$$
\begin{aligned}
\Gamma^i_{00}
&=\frac12g^{i\sigma}
(\partial_0g_{\sigma0}+\partial_0g_{0\sigma}-\partial_\sigma g_{00})\\
&=-\frac12g^{ij}\partial_jg_{00}\\
&=-\frac12\{\delta^{ij}+O(\epsilon)\}
\left\{-\frac{2}{c^2}\partial_j\Phi+O(\epsilon^2/L)\right\}\\
&=\frac{\partial_i\Phi}{c^2}+O(\epsilon^2/L).
\end{aligned}
$$

同じ式で $\Gamma^0_{0i}=\partial_i\Phi/c^2+O(\epsilon^2/L)$、$\Gamma^i_{0j}=\Gamma^0_{00}=\Gamma^0_{ij}=0$ です。また $\Gamma^i_{jk}=O(\epsilon/L)$。ここで $x'^\mu=dx^\mu/dt=(c,v^1,v^2,v^3)$ と置きます。連鎖律によって

$$
\frac{d^2x^\rho}{d\tau^2}
=\left(\frac{dt}{d\tau}\right)^2\frac{d^2x^\rho}{dt^2}
+\frac{d^2t}{d\tau^2}\frac{dx^\rho}{dt}.
$$

時間成分 $\rho=0$ に $d^2x^0/dt^2=0$ を代入して $d^2t/d\tau^2$ を消去すると、

$$
\frac{d^2x^i}{dt^2}
=-\Gamma^i_{\mu\nu}x'^\mu x'^\nu
+\frac{v^i}{c}\Gamma^0_{\mu\nu}x'^\mu x'^\nu.
$$

右辺の主項は $-c^2\Gamma^i_{00}=-\partial_i\Phi+O(\epsilon^2c^2/L)$ です。残りの空間接続項は $O(\epsilon |v|^2/L)=O(\epsilon^2c^2/L)$。再パラメータ化の項は

$$
\frac{v^i}{c}\,2\Gamma^0_{0j}cv^j
=2v^iv^j\frac{\partial_j\Phi}{c^2}
+O(\epsilon^2|v|^2/L)
=O(\epsilon^2c^2/L).
$$

従って結論を得ます。$\square$
<!-- proof-end -->

たとえば $\Phi=az$ なら $\ddot z=-a$、$\ddot x=\ddot y=0$ が一次で得られます。この運動は平坦なRindler座標でも起きるため、重力の**見かけの一様成分**と曲率を混同しません。

## 3. Einstein方程式の00成分から密度を読む

加速度が得られても、まだ質量密度との関係は出ていません。そこで[GR12の跡を除いたRicci表示](../GR12/index.md#prop-gr12-trace-reverse)を使用します。まず物質の「遅さ」も明示します。$\rho\ge0$ を質量密度とし、局所静止枠でのエネルギー密度 $\varepsilon_m$ は $\varepsilon_m=\rho c^2\{1+O(\epsilon)\}$、圧力・速度に由来する空間応力は $T_{ij}=O(\epsilon\rho c^2)$、運動量流は $T_{0i}=O(\sqrt\epsilon\rho c^2)$ とします。これは[GR8の完全流体](../GR8/index.md#def-gr8-perfect-fluid-stress)の低速・低圧模型と整合します。空間成分の大きさを制限しなければ、圧力も曲率源となるので通常のNewton理論へは落ちません。

場と物質を同じ近似次数で比較するため、典型的な領域では $G\rho L^2/c^2=O(\epsilon)$ とし、微分を取った誤差項も上で与えた尺度で評価します。正確な静的解の存在をこの設定だけから主張するのではなく、場の方程式を満たす弱場解の**先頭次数**を求めます。

<a id="thm-gr13-poisson-limit"></a>

<!-- formal-statement-start -->
> **定理（Newton極限のPoisson方程式）**  
> 4次元Einstein方程式で $\Lambda=0$ とし、上記の静的弱場、低速・低圧の物質近似および $G\rho L^2/c^2=O(\epsilon)$ を仮定する。計量と物質の微分には前節と同じ一様な誤差評価を課す。すると場の方程式の00成分の先頭次数は

$$
\boxed{\Delta\Phi=4\pi G\rho}
$$

> である。有限の $\epsilon$ で厳密に等しいという意味ではなく、両辺の差は $O(\epsilon^2c^2/L^2)$ の高次項に含まれる。
<!-- formal-statement-end -->

### 証明の見取り図

Ricciテンソルの00成分を接続係数から計算します。一方、跡を除いたEinstein方程式では $T_{00}$ だけでなく $T=g^{\mu\nu}T_{\mu\nu}$ も現れます。二つを比べて $4\pi$ の係数を復元します。

<!-- proof-start -->
### 証明

[GR6の曲率成分の式](../GR6/index.md#prop-gr6-coordinate-curvature)と静的条件から、Ricciテンソルの00成分は

$$
R_{00}
=\partial_\rho\Gamma^\rho_{00}
-\partial_0\Gamma^\rho_{0\rho}
+\Gamma^\rho_{\rho\lambda}\Gamma^\lambda_{00}
-\Gamma^\rho_{0\lambda}\Gamma^\lambda_{\rho0}.
$$

第二項は時間微分なので零です。$\Gamma^\rho_{\mu\nu}=O(\epsilon/L)$ かつ $\Gamma^0_{00}=0$ であること、および前節の $\Gamma^i_{00}$ の計算により、

$$
\begin{aligned}
R_{00}
&=\partial_i\left(\frac{\partial_i\Phi}{c^2}
+O(\epsilon^2/L)\right)+O(\epsilon^2/L^2)\\
&=\frac{\Delta\Phi}{c^2}+O(\epsilon^2/L^2).
\end{aligned}
$$

物質の跡では $g^{00}=-1+O(\epsilon)$、$g^{ij}=\delta^{ij}+O(\epsilon)$ を使います。$T_{00}=\rho c^2\{1+O(\epsilon)\}$、$T_{ij}=O(\epsilon\rho c^2)$ なので、

$$
\begin{aligned}
T&=g^{00}T_{00}+g^{ij}T_{ij}\\
&=-\rho c^2+O(\epsilon\rho c^2),\\
T_{00}-\frac12g_{00}T
&=\rho c^2-\frac12(-1)(-\rho c^2)
+O(\epsilon\rho c^2)\\
&=\frac12\rho c^2+O(\epsilon\rho c^2).
\end{aligned}
$$

[GR12のRicci表示](../GR12/index.md#prop-gr12-trace-reverse)の $\mu=\nu=0$ 成分は

$$
R_{00}=\kappa\left(T_{00}-\frac12Tg_{00}\right)
=\frac{8\pi G}{c^4}\frac{\rho c^2}{2}
+O(\kappa\epsilon\rho c^2).
$$

よって

$$
\frac{\Delta\Phi}{c^2}
=\frac{4\pi G\rho}{c^2}
+O(\epsilon^2/L^2).
$$

両辺に $c^2$ を掛ければ結論となります。誤差の比較では $\kappa\rho c^2=O(\epsilon/L^2)$ を使いました。$\square$
<!-- proof-end -->

**係数の検査。** 00成分に $T_{00}$ だけを代入して $R_{00}=\kappa T_{00}$ と書くと、右辺が二倍になってしまいます。正しい式には $-\tfrac12Tg_{00}$ が残ります。これは単なる細部ではなく、Newton定数を正しく復元する核心です。

### 3.1 Einsteinテンソルを直接計算しても同じか

前の証明は跡を除いた00成分を使いました。元の $G_{00}$ で係数を確認するには、空間計量を同じ次数まで指定する必要があります。ここでは特定の弱場表示

$$
ds^2=-\left(1+\frac{2\Phi}{c^2}\right)(dx^0)^2
+\left(1-\frac{2\Phi}{c^2}\right)(dx^2+dy^2+dz^2)
+O(\epsilon^2)
$$

を用います。これは空間がEuclid的という**零次近似**に一次の空間補正を加えたもので、先ほどの一般的弱場条件の中の一つの形です。

<a id="prop-gr13-einstein-00-check"></a>

<!-- formal-statement-start -->
> **命題（等方的な弱場計量による00成分の検算）**  
> 静的 $C^2$ ポテンシャル $\Phi$ と上記の計量を仮定し、各空間微分も弱場の尺度評価を満たすとする。$\varphi:=\Phi/c^2$ と置くと、一次精度で

$$
R_{00}=\Delta\varphi,\qquad
R_{ij}=\delta_{ij}\Delta\varphi,\qquad
\mathcal R=2\Delta\varphi,\qquad
G_{00}=2\Delta\varphi
$$

> が成り立つ。したがって $G_{00}=\kappa T_{00}$、$T_{00}=\rho c^2+O(\epsilon\rho c^2)$ は同じPoisson方程式を与える。各等号は $O(\epsilon^2/L^2)$ の剰余を省略した一次等式である。
<!-- formal-statement-end -->

### 証明の見取り図

Christoffel係数を一次まで作り、空間Ricci成分も計算してスカラー曲率に必要な縮約を閉じます。

<!-- proof-start -->
### 証明

$g^{00}=-1+2\varphi+O(\epsilon^2)$、$g^{ij}=(1+2\varphi)\delta^{ij}+O(\epsilon^2)$。接続係数の一次項は

$$
\Gamma^0_{0i}=\partial_i\varphi,\quad
\Gamma^i_{00}=\partial_i\varphi,\quad
\Gamma^k_{ij}=-\delta^k_i\partial_j\varphi
-\delta^k_j\partial_i\varphi+\delta_{ij}\partial_k\varphi.
$$

静的なので $R_{00}=\partial_i\Gamma^i_{00}+O(\epsilon^2/L^2)=\Delta\varphi+O(\epsilon^2/L^2)$。空間成分には

$$
\begin{aligned}
\partial_k\Gamma^k_{ij}
&=-2\partial_i\partial_j\varphi+\delta_{ij}\Delta\varphi,\\
\Gamma^\alpha_{i\alpha}
&=\Gamma^0_{i0}+\sum_k\Gamma^k_{ik}
=\partial_i\varphi-3\partial_i\varphi=-2\partial_i\varphi,\\
R_{ij}&=\partial_k\Gamma^k_{ij}
-\partial_j\Gamma^\alpha_{i\alpha}
+O(\epsilon^2/L^2)=\delta_{ij}\Delta\varphi+O(\epsilon^2/L^2).
\end{aligned}
$$

そこで $\mathcal R=g^{00}R_{00}+g^{ij}R_{ij}
=-\Delta\varphi+3\Delta\varphi+O(\epsilon^2/L^2)=2\Delta\varphi+O(\epsilon^2/L^2)$。さらに[Einsteinテンソルの定義](../GR7/index.md#def-gr7-einstein-tensor)から

$$
G_{00}=R_{00}-\frac12g_{00}\mathcal R
=\Delta\varphi+\Delta\varphi+O(\epsilon^2/L^2)
=2\Delta\varphi+O(\epsilon^2/L^2).
$$

$\kappa\rho c^2=(8\pi G/c^2)\rho$ を右辺と比較すると $2\Delta\Phi/c^2=8\pi G\rho/c^2$、従って $\Delta\Phi=4\pi G\rho$ です。$\square$
<!-- proof-end -->

もし $g_{ij}=\delta_{ij}$ を一次まで**厳密に固定**すると、一般の $\Phi$ に対して $R_{ij}$ が変わり、$G_{00}$ の係数も変わります。[GR6の静的lapse計量](../GR6/index.md#prop-gr6-static-lapse-ricci)はこの警告を具体的に示します。「$g_{00}$ のみから加速度が出る」ことと「時空の全場の方程式を満たす」ことは別です。

## 4. 重力源と境界条件を確かめる

**一様な見かけの重力。** $\Phi=az$ なら $\Delta\Phi=0$ で、真空のPoisson方程式に適合します。前節のRindler計量は実際に平坦なので、加速度 $-a$ が測れても潮汐曲率はありません。$\Phi$ の一次空間微分と二次空間微分を区別した理由です。

**点質量の外部。** 原点からの距離 $r=\sqrt{x^2+y^2+z^2}>0$ の領域で

$$
\Phi(r)=-\frac{GM}{r}\qquad(M>0)
$$

とすると、$\partial_i r=x^i/r$ より

$$
\partial_i\Phi=\frac{GMx^i}{r^3},
\qquad
-\partial_i\Phi=-\frac{GMx^i}{r^3}.
$$

球対称関数 $f(r)$ のLaplacianは、$\partial_i f=f'(r)x^i/r$ をもう一度微分して足すと

$$
\Delta f=f''(r)+\frac2r f'(r)
=\frac1{r^2}\frac{d}{dr}\left(r^2f'(r)\right).
$$

従って $r>0$ では $\Delta(-GM/r)=0$ です。原点は計算の定義域外なので、真空といっても原点を含む領域の滑らかな真空解を得たことにはなりません。半径 $r$ の球面での外向き流束は

$$
\int_{S_r}\nabla\Phi\cdot n\,dS
=\frac{GM}{r^2}(4\pi r^2)=4\pi GM.
$$

これは中心に質量 $M$ を置いたNewton源の外部場という意味です。時空全体の真空Einstein方程式の**厳密解**をここで導出したわけではありません。

<a id="prop-gr13-uniform-ball"></a>

<!-- formal-statement-start -->
> **命題（一様密度球のPoissonポテンシャル）**  
> 質量 $M>0$、半径 $R>0$ の球に質量密度 $\rho_0=3M/(4\pi R^3)$ が一様にあり、外側では $\rho=0$ とする。球対称、中心で有限、球面で値と法線微分が連続、無限遠で $\Phi\to0$ を課すと、Poisson方程式の解は

$$
\Phi(r)=
\begin{cases}
\displaystyle \frac{GM}{2R^3}(r^2-3R^2),&0\le r\le R,\\[2mm]
\displaystyle -\frac{GM}{r},&r\ge R
\end{cases}
$$

> である。これはNewton近似における物質分布と境界条件の模型である。
<!-- formal-statement-end -->

### 証明の見取り図

球対称のLaplacianを半径について積分し、中心・無限遠・球面の条件から積分定数を決めます。

<!-- proof-start -->
### 証明

内側では $(r^2\Phi')'=4\pi G\rho_0r^2$ を積分して $r^2\Phi'=4\pi G\rho_0r^3/3+C$。中心で有限であるため $C=0$ です。従って $\Phi'=(4\pi G\rho_0/3)r=(GM/R^3)r$ となり、

$$
\Phi_{\rm in}(r)=\frac{GM}{2R^3}r^2+A.
$$

外側では $(r^2\Phi')'=0$ なので $\Phi_{\rm out}(r)=B+C_1/r$。無限遠条件から $B=0$。$r=R$ で法線微分を合わせると $\Phi'_{\rm in}(R)=GM/R^2$ と $\Phi'_{\rm out}(R)=-C_1/R^2$ なので $C_1=-GM$。値の連続性から $GM/(2R)+A=-GM/R$、よって $A=-3GM/(2R)$ です。各領域に代入すると、内側は $\Delta\Phi=3GM/R^3=4\pi G\rho_0$、外側は $\Delta\Phi=0$ となり、条件をすべて満たします。$\square$
<!-- proof-end -->

この球模型では物質を静止させる圧力勾配が必要です。[GR8の完全流体の静的つり合い](../GR8/index.md#prop-gr8-hydrostatic-lapse)を弱場で展開すれば $dp/dr\simeq-\rho_0\Phi'(r)$。表面で $p(R)=0$ なら $p(r)\simeq \rho_0GM(R^2-r^2)/(2R^3)$ です。最大圧力比は $p(0)/(\rho_0c^2)=GM/(2Rc^2)\ll1$ なら小さく、低圧近似と矛盾しません。

### 4.1 圧力と宇宙項はいつ落とせるか

一般の静止完全流体では局所直交枠で $T_{00}=\varepsilon_m$、$T_{ii}=p$、$T=-\varepsilon_m+3p$ です。跡を除いた式の00成分は、先頭の平坦計量では

$$
T_{00}-\frac12g_{00}T
=\varepsilon_m+\frac12(-\varepsilon_m+3p)
=\frac12(\varepsilon_m+3p).
$$

$\Lambda$ も許すと $R_{00}=\kappa(\varepsilon_m+3p)/2-\Lambda$（$g_{00}\simeq-1$）となるので、形式上は

$$
\Delta\Phi\simeq \frac{4\pi G}{c^2}(\varepsilon_m+3p)-\Lambda c^2.
$$

ここで $p$ が $\varepsilon_m$ と同程度なら、通常のNewtonの**低圧仮定は破れ**ています。この式は静的弱場での00成分の比較であり、高圧流体について他の場の方程式や平衡条件も満たすと保証するものではありません。$\Lambda$ を残すなら $\Lambda L^2$ の大きさも弱場展開で管理する必要があります。

## 5. 演習：先頭次数と捨てた項を自力で判定する

### Level A

<a id="ex-gr13-a01"></a>
#### GR13-A01 一様なポテンシャル勾配
- Level: A

領域 $|az|/c^2\ll1$ で $\Phi=az$（$a>0$）とする。$\nabla\Phi$、$\Delta\Phi$、自由粒子の先頭加速度を求め、この $\Phi$ が真空Poisson方程式を満たすか判定せよ。

<!-- solution-start -->
**詳細解答。** $\partial_x\Phi=\partial_y\Phi=0$、$\partial_z\Phi=a$ なので $\nabla\Phi=(0,0,a)$。もう一度各方向へ微分するとすべて零なので $\Delta\Phi=0$ です。[弱場測地線の命題](#prop-gr13-newton-acceleration)から $(\ddot x,\ddot y,\ddot z)=-(0,0,a)=(0,0,-a)$。真空は $\rho=0$ だから $4\pi G\rho=0$ と $\Delta\Phi=0$ が一致します。ただし真空Poisson方程式だけで時空の平坦性を証明したわけではありません。
<!-- solution-end -->

<a id="ex-gr13-a02"></a>
#### GR13-A02 跡を除く係数
- Level: A

$g_{00}\simeq-1$、$T_{00}\simeq\rho c^2$、$T_{ii}\simeq0$ の低圧物質について、$T$ と $T_{00}-Tg_{00}/2$ の先頭項を求めよ。

<!-- solution-start -->
**詳細解答。** 跡は $T=g^{00}T_{00}+\sum_i g^{ii}T_{ii}\simeq(-1)\rho c^2+0=-\rho c^2$。従って $Tg_{00}\simeq(-\rho c^2)(-1)=\rho c^2$ であり、$T_{00}-Tg_{00}/2\simeq\rho c^2-\rho c^2/2=\rho c^2/2$。これは[GR12のRicci表示](../GR12/index.md#prop-gr12-trace-reverse)の00成分に入る組合せです。
<!-- solution-end -->

<a id="ex-gr13-a03"></a>
#### GR13-A03 二次関数の密度
- Level: A

$\Phi(x,y,z)=A(x^2+y^2+z^2)+B$（$A$ の単位 $\mathrm{s}^{-2}$）がある球内部のNewtonポテンシャルであるとする。Poisson方程式から密度を求め、$\rho\ge0$ の条件を述べよ。

<!-- solution-start -->
**詳細解答。** $\partial_x^2(Ax^2)=2A$、$y,z$ もそれぞれ $2A$、定数 $B$ の二階微分は零です。従って $\Delta\Phi=6A$。$\Delta\Phi=4\pi G\rho$ から $\rho=6A/(4\pi G)=3A/(2\pi G)$。$G>0$ なので $\rho\ge0$ は $A\ge0$ と同値です。$B$ は勾配や密度を変えず、境界条件で決まります。
<!-- solution-end -->

<a id="ex-gr13-a04"></a>
#### GR13-A04 真空外部の逆二乗
- Level: A

$r>0$ で $\Phi=-GM/r$ とする。$\partial_i(1/r)$、$\Delta\Phi$、半径 $r$ の球面を通る $\nabla\Phi$ の流束を求めよ。

<!-- solution-start -->
**詳細解答。** $r=(\sum_i(x^i)^2)^{1/2}$ より $\partial_ir=x^i/r$。連鎖律で $\partial_i(1/r)=-r^{-2}(x^i/r)=-x^i/r^3$。従って $\partial_i\Phi=GMx^i/r^3$。二階微分して和を取ると $\sum_i\partial_i(x^i/r^3)=3/r^3-3r^2/r^5=0$ なので $\Delta\Phi=0$。球面の外向き単位法線は $n=x/r$、$\nabla\Phi\cdot n=GM/r^2$ です。球面積は $4\pi r^2$ なので流束は $4\pi GM$。原点 $r=0$ はどの計算の領域にも含めません。
<!-- solution-end -->

<a id="ex-gr13-a05"></a>
#### GR13-A05 圧力の大きさ
- Level: A

静止完全流体で $\varepsilon_m=\rho c^2$、$p=\alpha\rho c^2$（$\rho>0$、定数 $\alpha\ge0$）とする。$T_{00}-Tg_{00}/2$ を局所直交枠で求め、圧力の寄与が通常のNewton極限で無視できる条件を答えよ。

<!-- solution-start -->
**詳細解答。** $T=-\varepsilon_m+3p=(-1+3\alpha)\rho c^2$、$g_{00}=-1$ なので $T_{00}-Tg_{00}/2=\rho c^2+\tfrac12(-1+3\alpha)\rho c^2=\tfrac12(1+3\alpha)\rho c^2$ です。$\alpha=O(\epsilon)$ なら圧力項は先頭の $\rho c^2/2$ に比べて一段小さく、無視できます。$\alpha$ が1程度なら無視できません。
<!-- solution-end -->

### Level B

<a id="ex-gr13-b01"></a>
#### GR13-B01 座標時刻はアフィンではない
- Level: B

静的弱場の自由粒子について $\Gamma^0_{0i}\simeq\partial_i\Phi/c^2$、$\Gamma^i_{00}\simeq\partial_i\Phi/c^2$ を与える。測地線の時間成分を用いて、座標時刻 $t$ での空間方程式に現れる追加項を求め、その主次数を示せ。

<!-- solution-start -->
**詳細解答。** $x'^\mu=dx^\mu/dt=(c,v^i)$ と置く。$\tau$ 表示の測地線で $d^2x^\rho/d\tau^2=(dt/d\tau)^2x''^\rho+(d^2t/d\tau^2)x'^\rho$。$\rho=0$ では $x''^0=0$ だから $d^2t/d\tau^2=-(dt/d\tau)^2\Gamma^0_{\mu\nu}x'^\mu x'^\nu/c$。これを空間成分に代入すると $x''^i=-\Gamma^i_{\mu\nu}x'^\mu x'^\nu+(v^i/c)\Gamma^0_{\mu\nu}x'^\mu x'^\nu$。後者では静的条件下で $\Gamma^0_{0j}$ の二つの対称項が残り、$2v^iv^j\partial_j\Phi/c^2$ です。$v^iv^j=O(\epsilon c^2)$、$\partial_j\Phi/c^2=O(\epsilon/L)$ なので $O(\epsilon^2c^2/L)$。先頭の $-\partial_i\Phi=O(\epsilon c^2/L)$ より一段小さいと確かめられます。
<!-- solution-end -->

<a id="ex-gr13-b02"></a>
#### GR13-B02 空間計量を落とすと何が失われるか
- Level: B

静的計量 $g_{00}=-(1+2\varphi)$、$g_{ij}=(1-2\varphi)\delta_{ij}$、$g_{0i}=0$ を一次まで考える。$\Gamma^k_{ij}$、$R_{ij}$、$G_{00}$ を導け。ただし $\varphi=\Phi/c^2=O(\epsilon)$ で微分の積は二次として捨てる。

<!-- solution-start -->
**詳細解答。** $\partial_i g_{jk}=-2(\partial_i\varphi)\delta_{jk}$ を接続式へ入れ、$g^{k\ell}=\delta^{k\ell}+O(\epsilon)$ として $\Gamma^k_{ij}=-\delta^k_i\varphi_j-\delta^k_j\varphi_i+\delta_{ij}\varphi_k$。その微分は $\partial_k\Gamma^k_{ij}=-2\varphi_{ij}+\delta_{ij}\Delta\varphi$ です。$\Gamma^0_{i0}=\varphi_i$、$\sum_k\Gamma^k_{ik}=-3\varphi_i$ より $\Gamma^\alpha_{i\alpha}=-2\varphi_i$。従って $R_{ij}=\partial_k\Gamma^k_{ij}-\partial_j\Gamma^\alpha_{i\alpha}=\delta_{ij}\Delta\varphi$。一方 $R_{00}=\Delta\varphi$ なので $\mathcal R=-\Delta\varphi+3\Delta\varphi=2\Delta\varphi$。よって $G_{00}=R_{00}-g_{00}\mathcal R/2=\Delta\varphi+\Delta\varphi=2\Delta\varphi$ です。二次項は一様に $O(\epsilon^2/L^2)$ として省略しました。
<!-- solution-end -->

<a id="ex-gr13-b03"></a>
#### GR13-B03 一様密度球の接合
- Level: B

密度 $\rho_0>0$、半径 $R>0$ の球で、球対称ポテンシャルが内外のPoisson方程式を満たすとする。中心で有限、無限遠で零、境界で $\Phi,\Phi'$ が連続という条件から内外の関数形を導け。$M=4\pi\rho_0R^3/3$ と置いてよい。

<!-- solution-start -->
**詳細解答。** 球対称Laplacianから $(r^2\Phi')'=4\pi G\rho_0r^2$（内側）。一回積分で $r^2\Phi'=(4\pi G\rho_0/3)r^3+C$、中心で有限だから $C=0$。二回目の積分で $\Phi_{\rm in}(r)=(2\pi G\rho_0/3)r^2+A$。外側では $(r^2\Phi')'=0$ より $\Phi_{\rm out}=B+D/r$、無限遠条件は $B=0$。$r=R$ の微分連続から $(4\pi G\rho_0/3)R=-D/R^2$、ゆえに $D=-GM$。値を合わせて $(GM/(2R))+A=-GM/R$ より $A=-3GM/(2R)$。従って内側 $\Phi_{\rm in}=GM(r^2-3R^2)/(2R^3)$、外側 $\Phi_{\rm out}=-GM/r$。$\Phi_{\rm in}'(R)=\Phi_{\rm out}'(R)=GM/R^2$ を再代入して検算できます。
<!-- solution-end -->

<a id="ex-gr13-b04"></a>
#### GR13-B04 宇宙項付き真空の符号
- Level: B

弱場で物質密度が零、宇宙項 $\Lambda$ は定数とし、$R_{00}\simeq\Delta\Phi/c^2$、$g_{00}\simeq-1$ とする。Einstein方程式から $\Delta\Phi$ を求め、球対称な特解の一つを導け。

<!-- solution-start -->
**詳細解答。** [GR12のRicci表示](../GR12/index.md#prop-gr12-trace-reverse)では真空 $T_{\mu\nu}=0$ のとき $R_{00}=\Lambda g_{00}\simeq-\Lambda$。よって $\Delta\Phi/c^2\simeq-\Lambda$、すなわち $\Delta\Phi\simeq-\Lambda c^2$。$\Delta(r^2)=6$ なので $\Phi_\Lambda(r)=-(\Lambda c^2/6)r^2$ は $\Delta\Phi_\Lambda=-\Lambda c^2$ を満たします。これに調和関数を加える自由度があり、境界条件がなければ唯一ではありません。弱場の条件として $|\Lambda|L^2\ll1$ も必要です。
<!-- solution-end -->

### Level C

<a id="ex-gr13-c01"></a>
#### GR13-C01 弱い自重球の力学と場を一緒に検算
- Level: C

半径 $R$、一様な質量密度 $\rho_0>0$ を持つ弱い自己重力球を考える。全質量を $M=4\pi\rho_0R^3/3$ とし、$\eta=GM/(Rc^2)\ll1$ とする。$\Lambda=0$、$\Phi(\infty)=0$、球面で $\Phi,\Phi'$ 連続とし、先頭次数では静止完全流体の圧力が $p(R)=0$ を満たすとする。(i) $\Phi(r)$ を内外で導出せよ。(ii) $r<R$ の自由粒子の先頭加速度を求めよ。(iii) 静水圧条件 $dp/dr=-\rho_0\,d\Phi/dr$ から $p(r)$ を導き、$p(0)/(\rho_0c^2)$ を求めよ。(iv) 先頭のEinstein方程式と低圧仮定が両立する次数を説明せよ。

<!-- solution-start -->
**詳細解答。** (i) [Poisson極限定理](#thm-gr13-poisson-limit)によって内側 $(r^2\Phi')'=4\pi G\rho_0r^2$、外側 $(r^2\Phi')'=0$。中心での有限性から内側の積分定数 $r^2\Phi'$ の定数項は零、従って $\Phi'_{\rm in}=(4\pi G\rho_0/3)r=GMr/R^3$。積分して $\Phi_{\rm in}=GMr^2/(2R^3)+A$。外側は $\Phi_{\rm out}=B+D/r$、無限遠で $B=0$。境界での微分連続より $D=-GM$。値の連続から $A=-3GM/(2R)$。従って $\Phi_{\rm in}=GM(r^2-3R^2)/(2R^3)$、$\Phi_{\rm out}=-GM/r$。

(ii) [弱場測地線の命題](#prop-gr13-newton-acceleration)から $\ddot{\boldsymbol x}=-\nabla\Phi$。内側で $\partial_i\Phi=(GM/R^3)x^i$ なので $\ddot{\boldsymbol x}=-(GM/R^3)\boldsymbol x$。球中心へ向かう線形の復元加速度で、中心では零です。

(iii) $p'(r)=-\rho_0GMr/R^3$ を $r$ から $R$ まで積分します。

$$
p(R)-p(r)
=-\frac{\rho_0 GM}{R^3}\int_r^R s\,ds
=-\frac{\rho_0 GM}{2R^3}(R^2-r^2).
$$

$p(R)=0$ なので $p(r)=\rho_0 GM(R^2-r^2)/(2R^3)$、特に $p(0)/(\rho_0c^2)=GM/(2Rc^2)=\eta/2$ です。

(iv) $\eta\ll1$ は $|\Phi|/c^2=O(\eta)$ を保証し、$p/(\rho_0c^2)=O(\eta)$ なので $T_{ij}/T_{00}$ は一段小さくなります。したがって先頭次数では $T_{00}\simeq\rho_0c^2$、$T\simeq-\rho_0c^2$ となり、[Ricci表示](../GR12/index.md#prop-gr12-trace-reverse)の00成分は $R_{00}\simeq4\pi G\rho_0/c^2$。左辺の幾何学的近似 $R_{00}\simeq\Delta\Phi/c^2$ に (i) の内側 $\Delta\Phi=4\pi G\rho_0$ を代入すると一致します。圧力の相対補正は $O(\eta)$、曲率方程式の捨てた項は先頭項に対し $O(\eta)$ です。この計算だけで有限 $\eta$ の厳密な相対論的静止星の解を得たとは主張しません。
<!-- solution-end -->

## 6. 次章への接続

Newton極限でEinstein方程式の結合定数を実験的な $G$ と照合できました。以後は計量の時間・回転対称性から保存量を取り出し、球対称の正確な真空解へ進みます。対称性に伴う保存量はGR14、点質量の外部場を相対論的に閉じる解法はGR15–16で扱います。
