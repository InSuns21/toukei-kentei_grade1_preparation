# QCURV14 Unruh・Hawking・Tolman則と観測者の温度

<!-- definition-example-audit: strict -->

[QCURV13の三状態](../QCURV13/index.md#def-qcurv13-three-states)では、同じSchwarzschild時空でも地平線の正則性と遠方流束が状態ごとに違うことを見ました。では、地平線の近くで静止する検出器が非常に高い「温度」を示すとき、それは加速しているからでしょうか、熱平衡だからでしょうか。自由落下する検出器も同じ値を測るのでしょうか。

本章では**時計・状態・測定量の三つを一緒に指定する**ことで、この疑問を解きます。[QCURV9の静止時計と赤方偏移](../QCURV9/index.md#prop-qcurv9-redshift)、[QCURV8のKMS条件](../QCURV8/index.md#def-qcurv8-kms)、[QCURV6の検出器応答](../QCURV6/index.md#def-qcurv6-response)、[QCURV13の遠方流束](../QCURV13/index.md#thm-qcurv13-state-flux)は既習の道具です。ここではそれらを接続して、**平衡状態のTolman則**を証明し、**局所加速のUnruh温度**と比較します。

舞台は質量 $M>0$、非回転・非荷電のSchwarzschild外部 $r>2M$ です。自然単位 $G=\hbar=c=k_B=1$、計量符号 $(-,+,+,+)$ を用い、質量零の実自由スカラー場を考えます。遠方の単位時計を固定した $\xi=\partial_t$ と

$$
ds^2=-f(r)\,dt^2+\frac{dr^2}{f(r)}+r^2d\Omega^2,
\qquad f(r)=1-\frac{2M}{r}>0
$$

を使います。[QCURV9の表面重力](../QCURV9/index.md#prop-qcurv9-kappa)は $\kappa=1/(4M)$ です。Hawkingの温度パラメータは[QCURV11の後期波束計算](../QCURV11/index.md#prop-qcurv11-late-packet-planck)から

$$
T_H=\frac{\kappa}{2\pi}=\frac1{8\pi M},\qquad
\beta_H=\frac1{T_H}=8\pi M
$$

となります。ただし**崩壊後期の放射に温度パラメータが現れること**と、**外部の状態全体が熱平衡にあること**は別の主張です。

## 1. Tolman則は「時計を換えると逆温度も換わる」という法則

半径 $r$ を固定した静止観測者の世界線では $dr=d\Omega=0$ です。$\partial_t$ は $r$ と角座標を固定して時刻 $t$ を動かす座標方向です。

この方向のノルムは $g(\xi,\xi)=-f(r)$ です。固有時間 $\tau_r$ でパラメータ付けした静止四元速度を $u_{\rm stat}=dx/d\tau_r$（$x$ は世界線）と書き、$g(u_{\rm stat},u_{\rm stat})=-1$ に規格化すると、

$$
d\tau_r=\sqrt{f(r)}\,dt,\qquad
u_{\rm stat}=f(r)^{-1/2}\xi
$$

が成立します。同じ周期 $dt$ でも、深い重力井戸では静止時計の経過時間が短くなります。[QCURV9の赤方偏移命題](../QCURV9/index.md#prop-qcurv9-redshift)では、Killing周波数 $\omega_\infty$ のモードをその時計で測ると $\omega_{\rm loc}=\omega_\infty/\sqrt f$ と示しました。

熱平衡でも変換するのはエネルギーだけではありません。[QCURV8のKMS境界条件](../QCURV8/index.md#def-qcurv8-kms)が、Killing時間 $t$ に関して逆温度 $\beta_\infty>0$ で成立するとします。状態が本当にこの時間発展についてKMSであることが重要です。二点分布が単に定常であるだけでは足りません。

静止観測者へ制限した二点分布をKilling時間差 $s_t=t-t'$ の関数 $w_t(s_t)$ と書き、固有時間差 $s_\tau=\tau_r-\tau'_r$ に対して $w_r(s_\tau)=w_t(s_\tau/\sqrt f)$ とします。すると虚時間方向のKMSの幅も $\sqrt f$ 倍だけ短くなります。この変化を確かめることが、静止時計に適した**局所温度**を導入する手掛かりになります。

<a id="def-qcurv14-tolman-temperature"></a>

<!-- formal-statement-start -->
> **定義（静止熱平衡の局所温度）**
> $M>0$、$r>2M$ のSchwarzschild外部の半径 $r$ の静止世界線で、$\xi=\partial_t$ に関して逆温度 $\beta_\infty>0$ のKMS状態を考える。静止世界線への二点分布の引戻しが存在し、固有時間 $\tau_r=\sqrt{f(r)}\,t+\text{定数}$ に関してKMS逆温度 $\beta_{\rm loc}(r)$ を持つとき、静止熱平衡の局所温度を

$$
T_{\rm loc}(r):=\beta_{\rm loc}(r)^{-1}
$$

> と定める。これは**静止世界線に沿った平衡状態の温度**であって、任意の量子状態・任意の運動をする検出器に自動的に付く温度ではない。
<!-- formal-statement-end -->

<!-- definition-example-start: def-qcurv14-tolman-temperature -->
### 直接例：$r=4M$ の一個の熱的モード

$r=4M$ なら $f=1/2>0$、$d\tau_r=dt/\sqrt2$ です。Killing時間の熱的な一モード二点関数を

$$
w_t(s)=(n+1)e^{-i\omega s}+n e^{i\omega s},
\qquad n=(e^{\beta_\infty\omega}-1)^{-1},
\quad \omega>0
$$

とします。これは[QCURV8で直接検証したKMSの例](../QCURV8/index.md#def-qcurv8-kms)で、$\beta_\infty>0$ のKMS境界条件を満たします。固有時間へ移せば

$$
w_r(s_\tau)=(n+1)e^{-i\sqrt2\omega s_\tau}
                 +n e^{i\sqrt2\omega s_\tau}.
$$

局所周波数 $\omega_{\rm loc}=\sqrt2\omega>0$ と $\beta_{\rm loc}=\beta_\infty/\sqrt2>0$ の積は

$$
\beta_{\rm loc}\omega_{\rm loc}=\beta_\infty\omega,
\qquad n=(e^{\beta_{\rm loc}\omega_{\rm loc}}-1)^{-1}
$$

です。局所モードの解析関数を $F_r(z)=(n+1)e^{-i\omega_{\rm loc}z}+ne^{i\omega_{\rm loc}z}$ と置くと整関数であり、$\beta_{\rm loc}>0$ と上の積の等式を使って

$$
\begin{aligned}
F_r(s-i\beta_{\rm loc})
&=(n+1)e^{-\beta_{\rm loc}\omega_{\rm loc}}e^{-i\omega_{\rm loc}s}
 +ne^{\beta_{\rm loc}\omega_{\rm loc}}e^{i\omega_{\rm loc}s}\\
&=ne^{-i\omega_{\rm loc}s}+(n+1)e^{i\omega_{\rm loc}s}
=w_r(-s).
\end{aligned}
$$

上端でも $F_r(s)=w_r(s)$ です。したがって、同じ一モードの両境界値がKMS条件を満たす局所温度は $T_{\rm loc}=\sqrt2/\beta_\infty$ です。**定義の確認**：$r>2M$、静止単位時計、元のKMS性、固有時間での正の逆温度・解析的な帯と両境界値を順に確かめました。一モードの確認だけで四次元の場全体のKMS性を証明したのではなく、全状態のKMS性は仮定です。
<!-- definition-example-end -->

<a id="thm-qcurv14-tolman"></a>

<!-- formal-statement-start -->
> **定理（Killing-KMS状態のTolman則と詳細釣合い）**
> $M>0$ のSchwarzschild静的外部で、自由実スカラー場の状態が $\xi=\partial_t$ の時間発展に関して $\beta_\infty>0$ のKMS条件を満たし、各 $r>2M$ の静止世界線へ二点分布を引き戻せるとする。このとき静止時計に関する逆温度と温度は

$$
\boxed{\beta_{\rm loc}(r)=\sqrt{f(r)}\,\beta_\infty,\qquad
T_{\rm loc}(r)\sqrt{f(r)}=T_\infty:=\beta_\infty^{-1}.}
$$

> さらにその静止世界線の検出器の[定常長時間率](../QCURV6/index.md#def-qcurv6-stationary-rate) $\dot{\mathcal F}_r(E)$ が存在し、$\Omega>0$ で励起・脱励起の両率が正かつ有限であり、KMSのFourier変換が許されるなら

$$
\frac{\dot{\mathcal F}_r(\Omega)}
     {\dot{\mathcal F}_r(-\Omega)}
=\exp[-\beta_\infty\sqrt{f(r)}\,\Omega]
=\exp[-\Omega/T_{\rm loc}(r)].
$$

> 特に永遠のSchwarzschild時空のHartle–Hawking状態では $\beta_\infty=\beta_H=8\pi M$ なので

$$
\boxed{T_{\rm HH,stat}(r)=\frac{T_H}{\sqrt{1-2M/r}}.}
$$

> この結論はKMS状態と静止観測者についてのもので、Unruh状態一般の「局所温度」を定める式ではない。
<!-- formal-statement-end -->

### 証明の見取り図

固定半径なら $t$ と $\tau_r$ は**定数倍率**で結ばれます。[QCURV8のKMS境界条件](../QCURV8/index.md#def-qcurv8-kms)の複素時間変数を同じ倍率で縮めると、解析的な帯の幅も縮みます。KMS境界条件から検出器のFourier率へ移る部分は、どちらの符号が励起かに注意して検算します。

<!-- proof-start -->
### 証明

$c_r=\sqrt{f(r)}>0$ と置きます。Killing時間の二点関数 $w_t(s)$ に対して $-\beta_\infty<\operatorname{Im}z<0$ で正則な $F_t(z)$ があり、境界値が

$$
F_t(s-i0)=w_t(s),\qquad
F_t(s-i\beta_\infty+i0)=w_t(-s)
$$

を満たすとします。静止軌道では $s_\tau=c_rs_t$ なので、固有時間に対応する関数を

$$
F_r(z):=F_t(z/c_r),\qquad
w_r(s_\tau)=w_t(s_\tau/c_r)
$$

と作れます。$c_r>0$ だから正則域は $-c_r\beta_\infty<\operatorname{Im}z<0$ です。その上端と下端では、変数を明示して

$$
\begin{aligned}
F_r(s_\tau-i0)&=w_t(s_\tau/c_r)=w_r(s_\tau),\\
F_r(s_\tau-ic_r\beta_\infty+i0)
  &=w_t(-s_\tau/c_r)=w_r(-s_\tau).
\end{aligned}
$$

よって固有時間でのKMS逆温度は $\beta_{\rm loc}=c_r\beta_\infty$、局所温度は $T_{\rm loc}=1/(c_r\beta_\infty)$ です。これがTolman則です。

検出器の率のFourier変換を[QCURV6の定常率](../QCURV6/index.md#def-qcurv6-stationary-rate)に合わせ

$$
\dot{\mathcal F}_r(E)=\int_{-\infty}^{\infty}
e^{-iEs}w_r(s)\,ds
$$

と読みます（分布の意味で、仮定した存在条件の下での表示）。KMSの二つの境界を、仮定したFourier積分の帯内移動が許される条件の下で使います。$\Omega>0$ のとき、下端へ移した積分の変数を再び実数 $s$ と書けば

$$
\begin{aligned}
\dot{\mathcal F}_r(\Omega)
&=\int_{\mathbb R}e^{-i\Omega(s-i\beta_{\rm loc})}
  F_r(s-i\beta_{\rm loc}+i0)\,ds\\
&=e^{-\beta_{\rm loc}\Omega}
  \int_{\mathbb R}e^{-i\Omega s}w_r(-s)\,ds\\
&=e^{-\beta_{\rm loc}\Omega}
  \int_{\mathbb R}e^{i\Omega s}w_r(s)\,ds\\
&=e^{-\beta_{\rm loc}\Omega}\dot{\mathcal F}_r(-\Omega).
\end{aligned}
$$

二行目は下端のKMS境界値、三行目は $s\mapsto-s$ の置換です。$e^{-i\Omega(s-i\beta_{\rm loc})}=e^{-i\Omega s}e^{-\beta_{\rm loc}\Omega}$ により、励起率側に負の指数が付くことも確かめられます。これは[検出器の熱的詳細釣合いと温度](../QCURV8/index.md#def-qcurv8-detailed-balance)と同じ符号規約です。$\Omega>0$ で両率が正なので割り算でき、表示した比になります。

最後に[QCURV13のHartle–Hawking状態のKMS境界条件](../QCURV13/index.md#def-qcurv13-three-states)では $T_\infty=T_H$ と選ぶので $\beta_\infty=8\pi M$ を代入します。$\square$
<!-- proof-end -->

**何が分かったか**：地平線に近づく静止観測者では $T_{\rm HH,stat}$ が発散しますが、これは静止時計の規格化が $r\downarrow2M$ で特異になることの帰結です。$r=2M$ に静止する単位時間的観測者は存在しません。この式単独で自由落下観測者の無限大の検出応答や局所応力の特異性を示すことはできません。[QCURV13の地平線正則性](../QCURV13/index.md#def-qcurv13-horizon-regularity)は別の判定です。

### 直接計算：$4M$ に静止する検出器

HH状態では $T_\infty=1/(8\pi M)$、$f(4M)=1/2$ より

$$
T_{\rm HH,stat}(4M)=\frac{\sqrt2}{8\pi M},\qquad
\beta_{\rm loc}(4M)=\frac{8\pi M}{\sqrt2}.
$$

エネルギー間隔を $\Omega=1/(8\pi M)$ とすれば、長時間定常率の励起・脱励起比は

$$
\frac{\dot{\mathcal F}_{4M}(\Omega)}
{\dot{\mathcal F}_{4M}(-\Omega)}
=e^{-1/\sqrt2}.
$$

ここで $\Omega$ は**固有時間のエネルギー差**です。Killing時間での周波数と混ぜて指数へ代入すると、$\sqrt2$ が誤って消えます。

## 2. 静止するための加速度とUnruh温度は同じ式ではない

Schwarzschild外部で半径を固定するには、重力に逆らう**非測地線**の加速が必要です。[GR45の静止加速度命題](../../GR/GR45/index.md#prop-gr45-redshift)と[QCURV8の等加速度Minkowski検出器の定理](../QCURV8/index.md#thm-qcurv8-unruh)を比較したくなります。ただし後者は**Minkowski真空と一様加速世界線**の組に関する結果です。曲がった時空の任意の状態に「加速度を代入するだけで検出率が熱的」とは言えません。

比較を明瞭にするため、静止加速度 $a_{\rm stat}$ に同じ数式 $a_{\rm stat}/(2\pi)$ を代入した量を $T_{a}$ と**比較用の加速度尺度**として書きます。これをSchwarzschildの状態の検出器温度と最初から同一視しません。

<a id="prop-qcurv14-acceleration-comparison"></a>

<!-- formal-statement-start -->
> **命題（静止加速度温度とTolman温度の比較）**
> $M>0$、$r>2M$ のSchwarzschild外部で、静止四元速度 $u_{\rm stat}=\partial_t/\sqrt f$ の固有加速度の大きさを $a_{\rm stat}$ とし、比較尺度 $T_a=a_{\rm stat}/(2\pi)$ を作る。HH状態の静止温度 $T_{\rm HH,stat}=T_H/\sqrt f$ と比較すると

$$
a_{\rm stat}=\frac{M}{r^2\sqrt f},\qquad
\boxed{\frac{T_a}{T_{\rm HH,stat}}=\frac{4M^2}{r^2}<1.}
$$

> $r\downarrow2M$ ではこの比が $1$ に近づくが、有限な $r>2M$ では一致せず、$r\to\infty$ で $T_a\to0$、$T_{\rm HH,stat}\to T_H>0$ である。
<!-- formal-statement-end -->

### 証明の見取り図

加速度は世界線と計量から決まります。一方でTolman温度は状態のKMS性と時計の比から決まります。両者を独立に計算してから比を取れば、地平線近傍だけで一致することが分かります。

<!-- proof-start -->
### 証明

静止世界線では $u^t=f^{-1/2}$、$u^r=0$ です。以下の $f'=df/dr$ は、半径 $r$ による微分です。計量から

$$
\Gamma^r_{tt}=-\frac12g^{rr}\partial_r g_{tt}
=\frac12 f f',\qquad f'=\frac{2M}{r^2}.
$$

よって四元加速度 $a^b=u^a\nabla_a u^b$ の動径成分は

$$
a^r=\Gamma^r_{tt}(u^t)^2
=\frac12 f',\qquad
a^t=0.
$$

$g_{rr}=f^{-1}$ だから $a_{\rm stat}=\sqrt{g_{rr}(a^r)^2}=f'/(2\sqrt f)=M/(r^2\sqrt f)$。これは[GR45の赤方偏移加速度命題](../../GR/GR45/index.md#prop-gr45-redshift)の特殊化とも一致します。

[Tolman則](#thm-qcurv14-tolman)と $T_H=1/(8\pi M)$ を別々に代入すると

$$
\begin{aligned}
\frac{T_a}{T_{\rm HH,stat}}
&=\frac{M/(2\pi r^2\sqrt f)}
{1/(8\pi M\sqrt f)}
=\frac{4M^2}{r^2}.
\end{aligned}
$$

$r>2M$ なので $4M^2/r^2<1$。二つの極限はこの比と各式から直接従います。$\square$
<!-- proof-end -->

**反例：$r=4M$ は地平線の外に十分離れている。** ここでは

$$
a_{\rm stat}=\frac{\sqrt2}{16M},\qquad
T_a=\frac{\sqrt2}{32\pi M},\qquad
T_{\rm HH,stat}=\frac{\sqrt2}{8\pi M},
\qquad \frac{T_a}{T_{\rm HH,stat}}=\frac14.
$$

「加速度がある」ことだけを使ってMinkowskiのUnruh定理を代入すると、HH検出器の熱的比を4倍も違う温度で予測します。**壊れた仮定**は、背景と状態がMinkowski真空の等加速度軌道ではないことです。HHの定常KMS性が決める局所温度は、別の根拠によります。

### なぜ地平線近傍ではRindlerの式に近づくか

地平線から外向きに、静的時刻一定面に沿って測った固有距離を

$$
\rho(r)=\int_{2M}^{r}\frac{ds}{\sqrt{1-2M/s}}
$$

と定めます。$r=2M+\varepsilon$、$0<\varepsilon\ll M$ で $s=2M+x$ と置けば

$$
\begin{aligned}
\rho&=\int_0^\varepsilon \sqrt{\frac{2M+x}{x}}\,dx\\
&=2\sqrt{2M\varepsilon}\,[1+O(\varepsilon/M)],\\
\sqrt{f(2M+\varepsilon)}
&=\sqrt{\frac{\varepsilon}{2M+\varepsilon}}
=\frac{\rho}{4M}\,[1+O(\rho^2/M^2)].
\end{aligned}
$$

したがって $\kappa=1/(4M)$ として $\sqrt f=\kappa\rho[1+O(\rho^2/M^2)]$ であり、

$$
T_{\rm HH,stat}
=\frac{1}{2\pi\rho}[1+O(\rho^2/M^2)],\qquad
T_a=\frac{1}{2\pi\rho}[1+O(\rho^2/M^2)].
$$

これは[QCURV7のRindlerくさび](../QCURV7/index.md#def-qcurv7-wedges)の固有距離と[QCURV8のUnruh温度](../QCURV8/index.md#thm-qcurv8-unruh)に一致する**局所の先頭近似**です。有限距離での厳密な等式でも、Hawkingの無限遠流束を導いた証明でもありません。

## 3. 自由落下検出器には別の時計がある

静止検出器はロケットで半径を保ちますが、自由落下検出器は測地線上を動き、固有加速度が零です。しかし「加速度が零だから量子場を検出しない」という推論も誤りです。[QCURV6の応答関数](../QCURV6/index.md#def-qcurv6-response)には、加速度だけでなく**状態の二点分布・世界線全体・切替関数**が入ります。

半径方向に落下する単位質量の自由観測者について、Killing場に沿った保存エネルギーを $\mathcal E=-g(u_{\rm ff},\xi)>0$ とします。この量は落下観測者が見る光子エネルギーではなく、**落下する観測者自身の測地線定数**です。[QCURV9のKilling保存量の議論](../QCURV9/index.md#prop-qcurv9-redshift)を時間的測地線へ適用できる理由は、測地線方程式 $\nabla_{u_{\rm ff}}u_{\rm ff}=0$ とKilling方程式 $\nabla_{(a}\xi_{b)}=0$ から

$$
\begin{aligned}
\frac{d}{d\tau}g(u_{\rm ff},\xi)
&=g(\nabla_{u_{\rm ff}}u_{\rm ff},\xi)
  +u_{\rm ff}^au_{\rm ff}^b\nabla_a\xi_b\\
&=0+\frac12u_{\rm ff}^au_{\rm ff}^b
  (\nabla_a\xi_b+\nabla_b\xi_a)=0
\end{aligned}
$$

となるためです。

<a id="prop-qcurv14-freefall-clock"></a>

<!-- formal-statement-start -->
> **命題（自由落下時計とKilling時計の非比例性）**
> Schwarzschild外部 $r>2M$ の内向き動径時間的測地線を、固有時間 $\tau$ でパラメータ付けし、保存エネルギー $\mathcal E=f(r)\,dt/d\tau>0$ を固定する。正規化 $g(u_{\rm ff},u_{\rm ff})=-1$ より

$$
\frac{dt}{d\tau}=\frac{\mathcal E}{f(r)},\qquad
\frac{dr}{d\tau}=-\sqrt{\mathcal E^2-f(r)},\qquad
\frac{d\tau}{dt}=\frac{f(r)}{\mathcal E}.
$$

> 平方根は測地線の正規化から $\mathcal E^2-f(r)\ge0$ の領域で実数として取る。内向き枝では $dr/d\tau<0$、転向点では $dr/d\tau=0$ である。
>
> $r$ が変化する区間では $d\tau/dt$ は一定でなく、[Tolman則](#thm-qcurv14-tolman)の静止時計への一定倍率変換をそのまま使えない。固有加速度は零であるが、任意の量子状態に関する検出器応答が零、または一定のKMS温度を持つとは結論しない。
<!-- formal-statement-end -->

### 証明の見取り図

動径測地線では角度成分がなく、時間成分はKilling保存量、動径成分は四元速度のノルム条件から決まります。静止時計では $r$ が定数であったことを思い出すと、どこでTolman則の適用条件を失うかがはっきりします。

<!-- proof-start -->
### 証明

$u_{\rm ff}=(dt/d\tau)\partial_t+(dr/d\tau)\partial_r$ と書き、$\mathcal E=-g(u_{\rm ff},\xi)=f\,dt/d\tau$ より $dt/d\tau=\mathcal E/f$ です。ノルムを計算すると

$$
\begin{aligned}
-1=g(u_{\rm ff},u_{\rm ff})
&=-f\left(\frac{dt}{d\tau}\right)^2
 +f^{-1}\left(\frac{dr}{d\tau}\right)^2\\
&=-\frac{\mathcal E^2}{f}
  +\frac1f\left(\frac{dr}{d\tau}\right)^2.
\end{aligned}
$$

両辺へ $f>0$ を掛けて $(dr/d\tau)^2=\mathcal E^2-f$ を得ます。内向き枝だから負の平方根を選びます。時間式を反転すれば $d\tau/dt=f/\mathcal E$ です。$f'(r)>0$ かつ $dr/d\tau<0$ の区間では $f(r(\tau))$ が減少するため、これは一定倍率ではありません。測地線の定義から $u_{\rm ff}^a\nabla_a u_{\rm ff}^b=0$ なので固有加速度は零です。$\square$
<!-- proof-end -->

### 直接計算：無限遠で静止状態から落ちた時計

$\mathcal E=1$ の内向き測地線を考え、$r=4M$ を通る瞬間を調べます。

$$
\left.\frac{dt}{d\tau}\right|_{4M}=2,\qquad
\left.\frac{dr}{d\tau}\right|_{4M}=-\frac1{\sqrt2},\qquad
\left.\frac{d\tau}{dt}\right|_{4M}=\frac12.
$$

同じ半径で静止する時計の $d\tau_r/dt=1/\sqrt2$ とは違います。さらに落下後は $r$ が変化するため、上の $1/2$ も維持されません。**その一点の時計の比をKMS逆温度へ代入して「自由落下のTolman温度」と呼ぶことはできません。**

自由落下中の検出器の励起確率は、[QCURV6で定義した有限切替応答](../QCURV6/index.md#def-qcurv6-response)

$$
\mathcal F_x(\Omega)=\int d\tau\,d\tau'\,
\chi(\tau)\chi(\tau')e^{-i\Omega(\tau-\tau')}
W_\omega(x(\tau),x(\tau'))
$$

を用い、指定した状態 $\omega$ と測地線 $x(\tau)$ ごとに評価します。自由落下で $\chi$ が有限時間なら、全固有時間にわたる定常率・[検出器の熱的詳細釣合いと温度](../QCURV8/index.md#def-qcurv8-detailed-balance)の関係を仮定できません。HH状態が未来地平線で正則であることも、任意の自由落下検出器が無反応だという意味ではありません。

## 4. 温度・検出率・無限遠流束の三つを分ける

ここまでの計算の適用対象を一度まとめます。下の「熱的」という語は、**何に関する熱性か**を列ごとに分けて読みます。

| 背景・状態・観測者 | 温度または熱的性質 | 正味の無限遠放射 |
| --- | --- | --- |
| Minkowski真空・一様加速検出器 | 全固有時間の定常率で $T_U=a/(2\pi)$（[QCURV8の定理](../QCURV8/index.md#thm-qcurv8-unruh)） | ブラックホールからのHawking流束ではない |
| 永遠のSchwarzschild・HH・半径$r$に静止 | Killing-KMS平衡、$T_H/\sqrt f$、定常詳細釣合い | 入射と出射が釣り合い、正味零 |
| 永遠のSchwarzschild・Unruh・半径$r$に静止 | 出射up側が熱的でも、全状態は一般にKilling-KMS平衡でない | 灰色体因子付きの正の正味出射 |
| 永遠のSchwarzschild・Boulware・半径$r$に静止 | 外部Killing真空、有限の正温度のHH-KMS状態ではない | 正味零、地平線では非正則 |
| 任意の上記状態・自由落下検出器 | 世界線と切替を入れた二点応答を計算する。一般に定数のKMS温度は付けられない | 検出率と無限遠流束は異なる観測量 |

[QCURV13の出射占有数の定理](../QCURV13/index.md#thm-qcurv13-state-flux)では、周波数と球面調和チャネルごとに

$$
n_{\rm out}-n_{\rm in}
=\Gamma_\ell(\omega)\,[n_{\rm up}-n_{\rm in}]
$$

でした。HHなら両方の入射チャネルが熱的なため正味零ですが、局所静止温度は非零です。Unruhなら無限遠からの入射が空で正味流束は正ですが、外部状態の**全**二点関数がKMSになるわけではありません。Boulwareの遠方粒子数が零でも地平線の正則性は保証されません。したがって **$T_H$ が現れる、検出器が励起する、無限遠へエネルギーが流れる**の三命題は互いに同値ではありません。

### 有限時間の励起は熱平衡の証明にならない

さらに「検出器が励起した」だけでKMS温度を割り当てることもできません。[QCURV6の慣性検出器の切替スペクトル](../QCURV6/index.md#prop-qcurv6-inertial-spectrum)はコンパクト支持の滑らかな切替について証明されていますが、Schwartz切替にも同じ正則化スペクトル計算を適用できます。実際、$\omega|\widehat\chi(\Omega+\omega)|^2$ は無限遠で任意の冪より速く減衰し、正則化因子を外す際に優収束が使えます。そこで4次元Minkowski真空の慣性世界線で

$$
\mathcal F(\Omega)=\frac1{4\pi^2}\int_0^\infty
\omega\,|\widehat\chi(\Omega+\omega)|^2\,d\omega
$$

を考えます。例えば $\chi(\tau)=e^{-\tau^2/(2\sigma^2)}$（$\sigma>0$）という滑らかで急減少する切替を使うと、Fourier変換の絶対値二乗は

$$
|\widehat\chi(k)|^2=2\pi\sigma^2e^{-\sigma^2k^2}
$$

です。よって $\Omega>0$ で

$$
\mathcal F(\Omega)=\frac{\sigma^2}{2\pi}
\int_0^\infty\omega\,e^{-\sigma^2(\Omega+\omega)^2}\,d\omega>0.
$$

これは外から切替仕事を加える有限時間の測定で、場はMinkowski真空のままです。$\chi$ はコンパクト支持ではありませんがSchwartz関数なので積分は収束します。コンパクト支持の滑らかな切替にも[QCURV6の同じ正値積分表示](../QCURV6/index.md#prop-qcurv6-inertial-spectrum)を使えます。定常長時間の励起率が零であることと有限時間の励起確率が正であることは矛盾しません。

### どの観測量なら物理的な放射流束を語れるか

無限遠での波束粒子数と局所検出器の遷移率に加え、局所エネルギー密度や流束には応力テンソルの期待値が必要です。後者では二点分布の普遍的な短距離特異部を差し引き、有限な局所曲率項と保存条件を扱います。[QCURV13の地平線正則性](../QCURV13/index.md#def-qcurv13-horizon-regularity)はその必要な入口ですが、**占有数やTolman温度から四次元の $\langle T_{ab}\rangle_{\rm ren}$ を直ちに得ることはできません**。これを次章で扱います。

## 演習

### Level A：時計と温度尺度を確実に分ける

<a id="ex-qcurv14-a01"></a>
#### QCURV14-A01 静止時計とKilling周波数
- Level: A
- 問題: $M>0$、$r=4M$ で $f=1-2M/r$ とする。静止時計の $d\tau_r/dt$ と、Killing周波数 $\omega_\infty>0$ の局所周波数 $\omega_{\rm loc}$ を求めよ。$e^{-i\omega_\infty t}$ を固有時間で書き換えて確認せよ。

<!-- solution-start -->
**詳細解答**：[QCURV9の赤方偏移](../QCURV9/index.md#prop-qcurv9-redshift)で $f(4M)=1/2$ なので、静止線に沿って $d\tau_r=\sqrt f\,dt=dt/\sqrt2$。したがって $t=\sqrt2\,\tau_r+\text{定数}$ です。位相は定数因子を除いて

$$
e^{-i\omega_\infty t}=e^{-i(\sqrt2\omega_\infty)\tau_r}
$$

となり、$\omega_{\rm loc}=\sqrt2\omega_\infty>0$。エネルギーが増えたのは時計の基準を変更したためで、別の光子を作ったのではありません。
<!-- solution-end -->

<a id="ex-qcurv14-a02"></a>
#### QCURV14-A02 Tolman温度と指数の不変性
- Level: A
- 問題: $\beta_\infty=8\pi M$ のKMS状態で $r=4M$ に静止する。$\beta_{\rm loc}$、$T_{\rm loc}$ を求め、$\omega_{\rm loc}=\sqrt2\omega_\infty$ のとき $\beta_{\rm loc}\omega_{\rm loc}=\beta_\infty\omega_\infty$ を検算せよ。

<!-- solution-start -->
**詳細解答**：[Tolman定理](#thm-qcurv14-tolman)へ $\sqrt f=1/\sqrt2$ を入れると

$$
\beta_{\rm loc}=\frac{8\pi M}{\sqrt2},\qquad
T_{\rm loc}=\frac{\sqrt2}{8\pi M}.
$$

積は $(8\pi M/\sqrt2)(\sqrt2\omega_\infty)=8\pi M\omega_\infty$ です。Bose因子 $1/(e^{\beta\omega}-1)$ の指数は変わりません。二つの温度を別の時計で比較しただけです。
<!-- solution-end -->

<a id="ex-qcurv14-a03"></a>
#### QCURV14-A03 加速度尺度との数値比較
- Level: A
- 問題: $r=4M$ のSchwarzschild静止観測者で $a_{\rm stat}$、$T_a=a_{\rm stat}/(2\pi)$、$T_{\rm HH,stat}$ を求め、比を示せ。

<!-- solution-start -->
**詳細解答**：$f(4M)=1/2$、$r^2=16M^2$ です。[静止加速度温度とTolman温度の比較](#prop-qcurv14-acceleration-comparison)より

$$
a_{\rm stat}=\frac{M}{16M^2/\sqrt2}
=\frac{\sqrt2}{16M},\qquad
T_a=\frac{\sqrt2}{32\pi M}.
$$

Tolman温度は $\sqrt2/(8\pi M)$ なので $T_a/T_{\rm HH,stat}=(8/32)=1/4$。この不一致はSchwarzschildでMinkowskiの等加速度真空定理を無条件に使えないことを示します。
<!-- solution-end -->

<a id="ex-qcurv14-a04"></a>
#### QCURV14-A04 二つの半径の静止温度
- Level: A
- 問題: HH状態で $r_1=4M$ と $r_2=8M$ に静止する。$T_{\rm loc}(r_1)/T_{\rm loc}(r_2)$ を求めよ。また $r\to\infty$ と $r\downarrow2M$ の意味を説明せよ。

<!-- solution-start -->
**詳細解答**：$f(4M)=1/2$、$f(8M)=3/4$ だから[Tolman則](#thm-qcurv14-tolman)で

$$
\frac{T_{\rm loc}(4M)}{T_{\rm loc}(8M)}
=\sqrt{\frac{f(8M)}{f(4M)}}
=\sqrt{\frac{3/4}{1/2}}=\sqrt{\frac32}.
$$

無限遠で $f\to1$ なので $T_{\rm loc}\to T_H$。地平線へ静止半径を近づければ $f\downarrow0$ なので式は発散しますが、地平線そのものには静止単位時計がありません。自由落下測定の発散を示したわけではありません。
<!-- solution-end -->

### Level B：状態・世界線・測定を接続する

<a id="ex-qcurv14-b01"></a>
#### QCURV14-B01 KMS帯の縮尺と率の比
- Level: B
- 問題: $c>0$、$s_\tau=cs_t$ とし、$w_t(s_t)$ が逆温度 $\beta>0$ の[QCURV8のKMS条件](../QCURV8/index.md#def-qcurv8-kms)を満たす。$F_\tau(z)=F_t(z/c)$ の正則帯と二つの境界値を求めよ。$\Omega>0$ の長時間検出率が正かつ有限であれば率の比はいくらか。

<!-- solution-start -->
**詳細解答**：$F_t$ の帯 $-\beta<\operatorname{Im}(z/c)<0$ は、$c>0$ を掛けると $-c\beta<\operatorname{Im}z<0$ です。上端は

$$
F_\tau(s-i0)=w_t(s/c)=w_\tau(s),
$$

下端は

$$
F_\tau(s-ic\beta+i0)=w_t(-s/c)=w_\tau(-s).
$$

よって固有時間の逆温度は $c\beta$。[検出器の熱的詳細釣合いと温度](../QCURV8/index.md#def-qcurv8-detailed-balance)の定義により、Fourier変換が許されれば

$$
\frac{\dot{\mathcal F}_\tau(\Omega)}
     {\dot{\mathcal F}_\tau(-\Omega)}=e^{-c\beta\Omega}.
$$

単に $e^{-\beta\Omega}$ としないのは、$\Omega$ が固有時間に共役なギャップだからです。
<!-- solution-end -->

<a id="ex-qcurv14-b02"></a>
#### QCURV14-B02 近地平線の固有距離と先頭温度
- Level: B
- 問題: $r=2M+\varepsilon$、$0<\varepsilon\ll M$ で、$\rho=\int_{2M}^{r}ds/\sqrt{1-2M/s}$ とする。$\rho$ の先頭項と $\sqrt f$ を $\rho$ で表し、$T_H/\sqrt f$ と $a_{\rm stat}/(2\pi)$ の先頭項を比較せよ。

<!-- solution-start -->
**詳細解答**：$s=2M+x$ と置くと $f=x/(2M+x)$ なので

$$
\rho=\int_0^\varepsilon\sqrt{\frac{2M+x}{x}}\,dx
=\sqrt{2M}\int_0^\varepsilon x^{-1/2}[1+O(x/M)]\,dx.
$$

積分すると $\rho=2\sqrt{2M\varepsilon}[1+O(\varepsilon/M)]$。これを $\sqrt f=\sqrt{\varepsilon/(2M+\varepsilon)}$ へ戻すと

$$
\sqrt f=\frac{\rho}{4M}[1+O(\rho^2/M^2)].
$$

$T_H=1/(8\pi M)$ だから $T_H/\sqrt f=1/(2\pi\rho)[1+O(\rho^2/M^2)]$。[静止加速度](#prop-qcurv14-acceleration-comparison)は $M/(r^2\sqrt f)$、$M/r^2=1/(4M)[1+O(\varepsilon/M)]$ なので同じ $1/(2\pi\rho)$ が先頭に出ます。ただし有限な $\rho$ で等しいとは言えません。
<!-- solution-end -->

<a id="ex-qcurv14-b03"></a>
#### QCURV14-B03 自由落下時計は一定倍率でない
- Level: B
- 問題: $\mathcal E=1$ の内向き動径自由落下観測者が $r=4M$、$r=8M/3$ を通るとき、それぞれ $dt/d\tau$、$dr/d\tau$、$d\tau/dt$ を求めよ。同じ半径の静止時計と比べ、TolmanのKMS時間再尺度化を自由落下へ転用できない理由を述べよ。

<!-- solution-start -->
**詳細解答**：[自由落下時計の命題](#prop-qcurv14-freefall-clock)で $\mathcal E=1$ とします。$r=4M$ なら $f=1/2$ なので

$$
(dt/d\tau,\ dr/d\tau,\ d\tau/dt)
=(2,\,-1/\sqrt2,\,1/2).
$$

$r=8M/3$ では $f=1-3/4=1/4$ なので

$$
(dt/d\tau,\ dr/d\tau,\ d\tau/dt)
=(4,\,-\sqrt3/2,\,1/4).
$$

一方、静止時計の $d\tau_r/dt=\sqrt f$ は順に $1/\sqrt2$ と $1/2$ です。落下時計では半径と時間倍率が途中で変わるため、$w_t(s)$ の時間差を単一の定数 $c$ で $w_\tau(cs)$ にすることはできません。KMSの正則帯の一定倍率変換を適用する仮定が失われます。
<!-- solution-end -->

<a id="ex-qcurv14-b04"></a>
#### QCURV14-B04 有限時間の励起と熱的詳細釣合い
- Level: B
- 問題: 4次元Minkowski真空で慣性検出器の切替を $\chi(\tau)=e^{-\tau^2/(2\sigma^2)}$、$\sigma>0$ とする。[慣性検出器の切替スペクトル](../QCURV6/index.md#prop-qcurv6-inertial-spectrum)から $\Omega>0$ の $\mathcal F(\Omega)$ を積分表示し、正になる理由を示せ。これだけで温度 $T>0$ の検出器の熱的詳細釣合いを結論できるか。

<!-- solution-start -->
**詳細解答**：$\widehat\chi(k)=\sqrt{2\pi}\sigma e^{-\sigma^2k^2/2}$ なので

$$
\begin{aligned}
\mathcal F(\Omega)
&=\frac1{4\pi^2}\int_0^\infty\omega
|\widehat\chi(\Omega+\omega)|^2\,d\omega\\
&=\frac{\sigma^2}{2\pi}\int_0^\infty
\omega e^{-\sigma^2(\Omega+\omega)^2}\,d\omega.
\end{aligned}
$$

$\omega>0$ で積分核は正、無限遠ではGaussian減衰し、原点では $\omega$ に比例するため有限かつ正です。切替が有限時間幅を持つので外部仕事の効果が含まれます。KMSと[定常長時間率](../QCURV6/index.md#def-qcurv6-stationary-rate)の条件は示していないため、この正の**確率**から[検出器の熱的詳細釣合いと温度](../QCURV8/index.md#def-qcurv8-detailed-balance)の定義にある率の比が成立するとは結論できません。
<!-- solution-end -->

### Level C：同じ背景の三状態を観測者ごとに整理する

<a id="ex-qcurv14-c01"></a>
#### QCURV14-C01 熱的詳細釣合いと遠方放射を同時に判定する
- Level: C
- 問題: $M>0$ の永遠のSchwarzschild外部、質量零実自由スカラー場で $T_H=1/(8\pi M)$、$f=1-2M/r$ とする。半径 $4M$ に静止する検出器、$\mathcal E=1$ の内向き自由落下検出器、無限遠の出射・入射チャネルを比較する。周波数 $\omega>0$、角運動量 $\ell,m$ の散乱率は $0\le\Gamma_\ell(\omega)\le1$、熱的up占有数は $n_H=(e^{\omega/T_H}-1)^{-1}$ とし、in/upチャネルの交差期待値は零とする。

  1. HH状態の静止検出器で、局所温度と固有ギャップ $\Omega=T_H$ に対する長時間励起・脱励起率比を求めよ（必要な率の存在・正値性を仮定）。
  2. 同じ半径で静止加速度から作る $T_a$ と、その静止HH温度との比を求めよ。加速度のみによる判定が一般に不適切な理由を述べよ。
  3. Boulware、Unruh、HHの各状態について無限遠の $n_{\rm out}-n_{\rm in}$ を求め、局所KMS性と正味流束の違いを説明せよ。
  4. $\mathcal E=1$ の落下観測者が $4M$ を通る瞬間の $dt/d\tau$ と $dr/d\tau$ を求め、静止Tolman温度をそのまま落下観測者の温度にしてはならない理由を述べよ。

<!-- solution-start -->
**詳細解答**：

**（1）** $f(4M)=1/2$ なので[Tolman定理](#thm-qcurv14-tolman)から

$$
T_{\rm HH,stat}(4M)=\sqrt2T_H,\qquad
\beta_{\rm loc}(4M)=\frac1{\sqrt2T_H}.
$$

固有ギャップ $\Omega=T_H>0$ を[検出器の熱的詳細釣合いと温度](../QCURV8/index.md#def-qcurv8-detailed-balance)の式へ代入すると

$$
\frac{\dot{\mathcal F}_{4M}(T_H)}
{\dot{\mathcal F}_{4M}(-T_H)}
=e^{-\beta_{\rm loc}T_H}=e^{-1/\sqrt2}.
$$

状態全体がKilling-KMSであるHHの場合に適用しました。有限時間確率の比ではありません。

**（2）** [加速度尺度との比較命題](#prop-qcurv14-acceleration-comparison)で

$$
a_{\rm stat}(4M)=\frac{\sqrt2}{16M},\quad
T_a(4M)=\frac{\sqrt2}{32\pi M}
=\frac14 T_{\rm HH,stat}(4M).
$$

Minkowski真空の一様加速検出器の[Unruh定理](../QCURV8/index.md#thm-qcurv8-unruh)は、曲がった背景のHH状態の検出率を加速度だけで与える定理ではありません。半径が違えば比も $4M^2/r^2$ に変わります。

**（3）** [Boulware・Unruh・Hartle–Hawking状態](../QCURV13/index.md#def-qcurv13-three-states)の定義から $(n_{\rm in},n_{\rm up})$ はBで $(0,0)$、Uで $(0,n_H)$、HHで $(n_H,n_H)$。独立チャネルの[三状態の遠方出射占有数と正味流束](../QCURV13/index.md#thm-qcurv13-state-flux)へ代入すると

$$
n_{\rm out}-n_{\rm in}
=\Gamma_\ell(n_{\rm up}-n_{\rm in})
=
\begin{cases}
0 &(\mathrm B),\\
\Gamma_\ell n_H &(\mathrm U),\\
0 &(\mathrm{HH}).
\end{cases}
$$

HHは局所静止KMS温度が正でも入出射が釣り合います。Uは正味出射があっても全状態がKMS平衡ではありません。Bは遠方粒子流束零でも[地平線正則性](../QCURV13/index.md#prop-qcurv13-horizon-sectors)を持ちません。ゆえに三つの観測量は置き換えられません。

**（4）** [自由落下時計の命題](#prop-qcurv14-freefall-clock)に $f(4M)=1/2$、$\mathcal E=1$ を代入して

$$
\left.dt/d\tau\right|_{4M}=2,\qquad
\left.dr/d\tau\right|_{4M}=-1/\sqrt2.
$$

静止時計は $d\tau_r/dt=1/\sqrt2$ ですが、落下時計は瞬間的にも $d\tau/dt=1/2$ で違い、その後の半径変化で比が変化します。KMSの固定倍率による証明は適用不能で、落下検出器の応答には世界線全体と切替を指定して二点分布を引き戻す必要があります。
<!-- solution-end -->

---

**次への問い**：同じ外部に「平衡温度」と「正味流束」があり得ることを区別しました。ではそれを局所的なエネルギー密度と応力として表すにはどうするか。次章ではHadamard差引きと点分離による $\langle\phi^2\rangle_{\rm ren}$、$\langle T_{ab}\rangle_{\rm ren}$ を扱います。
