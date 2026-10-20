# GR17 重力赤方偏移と静止時計

<!-- definition-example-audit: strict -->

[GR16のSchwarzschild真空解](../GR16/index.md#thm-gr16-schwarzschild)によって、質量を持つ天体の外部で計量がどうなるかが定まりました。[GR4の局所測定](../GR4/index.md#def-gr4-measured-components)を使えば、一人の観測者が光を何Hzと測るかも計算できます。しかし、離れた二地点の観測者が**同じ光**を測ったとき、周波数はどう関係するのでしょうか。測定値はそれぞれの場所の時計で定義されるので、一地点の計算だけでは答えられません。

ここで必要なのは、光が二地点を移動する間に変わらない量です。[GR14のKilling場による測地線保存量](../GR14/index.md#thm-gr14-killing-charge)と、その[静止観測者に関する局所エネルギー式](../GR14/index.md#prop-gr14-local-energy-lapse)をつなぐと、遠方の時計・光の周波数を同じ規格化因子で比較できます。さらに、この比較が重力の強さや観測者の運動について何を前提とするかを明らかにします。

以下、符号を $(-,+,+,+)$、$x^0=ct$、$G,c>0$ とします。宇宙定数零、質量 $M>0$ の漸近平坦なSchwarzschild時空の**静的外部** $r>r_s:=2GM/c^2$ に限り、

$$
ds^2=-f(r)(dx^0)^2+\frac{dr^2}{f(r)}
+r^2(d\theta^2+\sin^2\theta\,d\phi^2),
\qquad f(r)=1-\frac{r_s}{r}>0
$$

を使います。$r$ は球面の[面積半径](../GR15/index.md#def-gr15-areal-radius)、$\xi=\partial_{x^0}$ は無限遠で $g(\xi,\xi)\to-1$ となる未来向き時間並進Killing場です。[静的Schwarzschild座標の適用域](../GR16/index.md#prop-gr16-static-domain)の範囲外へこの観測者を勝手に延長しません。光は未来向き非零の光的・アフィン測地線に沿って進む幾何光学近似とし、その波数四ベクトルを $K$、$g(K,K)=0$、$\nabla_KK=0$ とします。光の散乱・吸収・再放射は扱いません。

## 1. 静止する時計の一秒は座標時間の何秒か

外部の座標 $(x^0,r,\theta,\phi)$ で、$r,\theta,\phi$ を固定した世界線を考えます。この線では $dr=d\theta=d\phi=0$ ですから、計量をその線に制限すると

$$
-c^2d\tau^2=ds^2=-f(r)c^2dt^2.
$$

未来向きに $dt>0$ と取ると、固有時 $\tau$ は

$$
\frac{d\tau}{dt}=\sqrt{f(r)}
$$

という率で進みます。この式は[GR2の固有時率](../GR2/index.md#prop-gr2-clock-rate)を、今の計量と静止世界線に代入したものです。

この世界線の四元速度は座標成分をただ $(c,0,0,0)$ と置くのではありません。$dx^0/d\tau=c\,dt/d\tau$ と規格化を使うため、

$$
U=\frac{dx^0}{d\tau}\partial_{x^0}
=\frac{c}{\sqrt{f(r)}}\,\xi,\qquad
g(U,U)=\frac{c^2}{f(r)}g(\xi,\xi)=-c^2
$$

となります。$f(r)>0$ が四元速度の存在と正の平方根に必要です。

<a id="prop-gr17-static-clock"></a>

<!-- formal-statement-start -->
> **命題（Schwarzschild静止時計の固有時率）**  
> $M>0$ のSchwarzschild計量において $r>r_s$ の一定半径・一定角度の未来向き静止観測者の固有時 $\tau$ は、無限遠で規格化したKilling時間 $t=x^0/c$ に対して

$$
d\tau=\sqrt{1-\frac{r_s}{r}}\,dt
$$

> を満たす。半径 $r_A,r_B>r_s$ にある二つの静止時計について、等しい正のKilling時間間隔 $\Delta t$ の間の経過固有時は

$$
\frac{\Delta\tau_B}{\Delta\tau_A}
=\sqrt{\frac{f(r_B)}{f(r_A)}}.
$$

> この等時刻幅の比較には、静的計量に選ばれた共通の時間並進と無限遠の規格化を用いる。
<!-- formal-statement-end -->

### 証明の見取り図

静止世界線では時間項以外の計量成分が消えます。二つの世界線で同じ $\Delta t$ を取り、各場所の一定係数を掛けて比を作ります。

<!-- proof-start -->
### 証明

半径 $r_i>r_s$（$i=A,B$）で $f_i:=1-r_s/r_i>0$ は静止世界線に沿って一定です。固有時の定義から $c^2d\tau_i^2=f_i c^2dt^2$ となり、未来向きの正の根を選んで $d\tau_i=\sqrt{f_i}dt$。一定の正の時間幅 $\Delta t$ について積分すると $\Delta\tau_i=\sqrt{f_i}\Delta t$ です。従って

$$
\frac{\Delta\tau_B}{\Delta\tau_A}
=\frac{\sqrt{f_B}\Delta t}{\sqrt{f_A}\Delta t}
=\sqrt{\frac{f_B}{f_A}}.
$$

同じ $t$ は計量の静的な時間並進に適合する座標です。ここでは遠隔時計の同期手順を任意に選んだという主張ではなく、同じKilling時間間隔をそれぞれの世界線で測った比を示しています。$\square$
<!-- proof-end -->

**直接例。** $r_A=2r_s$ と $r_B=4r_s$ なら

$$
f_A=\frac12,\qquad f_B=\frac34,\qquad
\Delta\tau_A=\frac{\Delta t}{\sqrt2},\quad
\Delta\tau_B=\frac{\sqrt3}{2}\Delta t.
$$

従って $\Delta\tau_B/\Delta\tau_A=\sqrt{3/2}>1$。遠くの静止時計Bは、同じKilling時間間隔でより多くの固有時を刻みます。「各時計が自分の一秒を短く感じる」という意味ではありません。各時計の局所的な一秒は、常にその時計自身の一秒です。

## 2. 光が運ぶ保存量と局所周波数は違う

波面の無次元位相を $\varphi$ とすると、共変波数 $k_\mu=\partial_\mu\varphi$ と $K^\mu=g^{\mu\nu}k_\nu$ の関係は[GR4の周波数測定の定義](../GR4/index.md#def-gr4-measured-components)にあります。観測者 $U$ の時計が測る正の角周波数は

$$
\omega_{\mathrm{loc}}=-g(K,U)=-k_\mu U^\mu>0,\qquad
\nu_{\mathrm{loc}}=\frac{\omega_{\mathrm{loc}}}{2\pi}.
$$

一方、光的アフィン測地線に沿う $K$ には、[GR14のKilling保存定理](../GR14/index.md#thm-gr14-killing-charge)を適用できます。$\xi$ はKilling、$K$ はアフィン測地線接ベクトルなので $k_\mu\xi^\mu=g(K,\xi)$ は光路上で一定です。$x^0=ct$ による $\xi$ の規格化で、

$$
\Omega:=-c\,g(K,\xi)>0
$$

を保存する角周波数に対応する量（単位 $\mathrm{s}^{-1}$）として用いると、静止観測者の $U=c\xi/\sqrt f$ との内積から

$$
\omega_{\mathrm{loc}}
=-g\left(K,\frac{c\xi}{\sqrt f}\right)
=\frac{-c\,g(K,\xi)}{\sqrt f}
=\frac{\Omega}{\sqrt f}.
$$

$\Omega$ は局所観測の周波数ではなく、規格化した時間並進に結び付く保存量です。[GR14の局所エネルギー式](../GR14/index.md#prop-gr14-local-energy-lapse)で $p=\hbar K$ と置き $E=\hbar\Omega$ と換算した式とも一致します。

<a id="thm-gr17-redshift"></a>

<!-- formal-statement-start -->
> **定理（Schwarzschild静止観測者間の重力赤方偏移）**  
> $M>0$ のSchwarzschild静的外部 $r>r_s$ で、半径 $r_A,r_B>r_s$ に静止する未来向き観測者A、Bを取る。Aの事象で放たれた、またはAを通過した非零の光が、吸収・散乱・再放射なしに未来向き光的アフィン測地線を進みBの事象へ達するとする。同じ光の局所角周波数 $\omega_A,\omega_B>0$ および通常周波数 $\nu_A,\nu_B$ は

$$
\boxed{
\frac{\nu_B}{\nu_A}
=\frac{\omega_B}{\omega_A}
=\sqrt{\frac{f(r_A)}{f(r_B)}}
=\sqrt{\frac{1-r_s/r_A}{1-r_s/r_B}}.
}
$$

> 特に $r_B>r_A$ なら $\nu_B<\nu_A$ である。光路が必ず半径方向の直線であるという仮定は不要だが、両端の観測者が同じ時間並進Killing場に沿って静止し、光に沿うKilling保存量を用いることが必要である。
<!-- formal-statement-end -->

### 証明の見取り図

光路上で $\Omega$ が一定になることをKilling方程式と測地線から再確認し、各端点の測定者の四元速度で割り直します。周波数の正値性により比の分母は零になりません。

<!-- proof-start -->
### 証明

$\xi$ がKillingで $\nabla_KK=0$ であるから、光路をアフィンパラメータ $\lambda$ で表して

$$
\begin{aligned}
\frac{d}{d\lambda}g(K,\xi)
&=g(\nabla_KK,\xi)+g(K,\nabla_K\xi)\\
&=0+K^\mu K^\nu\nabla_\mu\xi_\nu\\
&=\frac12K^\mu K^\nu
(\nabla_\mu\xi_\nu+\nabla_\nu\xi_\mu)=0.
\end{aligned}
$$

ここでは最後の等式に[GR14のKilling方程式](../GR14/index.md#prop-gr14-killing-coordinate-test)を用いました。よって $\Omega=-c\,g(K,\xi)$ はAからBまで一定です。両端では $f_i>0$ なので $U_i=c\xi/\sqrt{f_i}$ は未来向きかつ $g(U_i,U_i)=-c^2$ を満たします。[GR4の局所周波数定義](../GR4/index.md#def-gr4-measured-components)をそれぞれに適用すると

$$
\omega_A=\frac{\Omega}{\sqrt{f_A}},
\qquad
\omega_B=\frac{\Omega}{\sqrt{f_B}}.
$$

非零未来向き光線と時間的未来向き静止観測者の内積は負なので $\Omega,\omega_A,\omega_B>0$ です。二式から $\Omega$ を消去すれば $\omega_B/\omega_A=\sqrt{f_A/f_B}$ です。$\nu_i=\omega_i/(2\pi)$ なので、通常周波数でも同じ比になります。$f'(r)=r_s/r^2>0$ より $r_B>r_A$ では $f_B>f_A$、従って比は1未満です。$\square$
<!-- proof-end -->

**計算例：同じ光を二地点で観測する。** $r_A=2r_s$、$r_B=4r_s$ とし、Aが測る角周波数を $\omega_A=\omega_0$ とすると

$$
\Omega=\sqrt{f_A}\omega_0=\frac{\omega_0}{\sqrt2},
\qquad
\omega_B=\frac{\Omega}{\sqrt{f_B}}
=\sqrt{\frac23}\,\omega_0.
$$

光を上に送るとBが測る周波数は小さくなります。逆にBからAへ送れば、比は $\sqrt{3/2}$ となる青方偏移です。途中で光子がエネルギーを「消費した」と仮定する必要はありません。保存している量 $-c\,g(K,\xi)$ と各場所でのエネルギー $\hbar\omega_{\mathrm{loc}}$ を区別した結果です。

## 3. 赤方偏移の符号と時計比較を一つの式に結ぶ

観測の記述では、周波数だけでなく波長や赤方偏移量を使います。観測者の局所直交枠では光速は $c$ なので、局所的な波長を $\lambda_{\mathrm{loc}}=c/\nu_{\mathrm{loc}}$ と表せます。これは遠隔二地点の空間距離を測る式ではなく、**各地点の同じ局所観測者**による周波数と波長の換算です。

送信地点Aでの局所波長 $\lambda_A>0$ と受信地点Bでの局所波長 $\lambda_B>0$ の比を使い、通常、赤方偏移を $z:=\lambda_B/\lambda_A-1$ と表示します。局所換算 $\lambda=c/\nu$ により、同じ光について $1+z=\nu_A/\nu_B$ でもあります。

<a id="def-gr17-redshift-z"></a>

<!-- formal-statement-start -->
> **定義（静止観測者間の赤方偏移量）**  
> 静的外部の二地点A、Bに静止する観測者が、同じ光の局所的な正の波長 $\lambda_A,\lambda_B$、周波数 $\nu_A,\nu_B$ を測ったとき、Aを放射側、Bを受信側とする赤方偏移量 $z_{A\to B}$ を

$$
1+z_{A\to B}:=\frac{\lambda_B}{\lambda_A}
=\frac{\nu_A}{\nu_B},
\qquad z_{A\to B}>-1
$$

> と定める。$z>0$ は赤方偏移、$-1<z<0$ は青方偏移、$z=0$ は変化なしを表す。静止観測者以外の周波数比では、観測者の相対運動によるDoppler効果も含まれ得る。
<!-- formal-statement-end -->

<!-- definition-example-start: def-gr17-redshift-z -->
**定義の確認**（同じ光、静止二地点）。$r_A=2r_s$、$r_B=4r_s$ はいずれも $r_s>0$ より静的外部にあり、$f_A=1/2$、$f_B=3/4$ と正です。[Schwarzschild静止観測者間の重力赤方偏移](#thm-gr17-redshift)から $\nu_B/\nu_A=\sqrt{2/3}>0$。各地点で $\lambda_i=c/\nu_i>0$ と定めるので

$$
\frac{\lambda_B}{\lambda_A}
=\frac{c/\nu_B}{c/\nu_A}
=\frac{\nu_A}{\nu_B}
=\sqrt{\frac32},
\qquad z_{A\to B}=\sqrt{\frac32}-1>0.
$$

周波数も波長も同じ光について比較し、AとBが静止していること・半径域・正値性・赤方偏移の符号を直接確認しました。受信側と放射側を取り替えた場合、$z_{B\to A}=\sqrt{2/3}-1$ であり、一般に単なる $-z_{A\to B}$ ではありません。
<!-- definition-example-end -->

<a id="prop-gr17-clock-frequency-reciprocity"></a>

<!-- formal-statement-start -->
> **命題（静止時計と光の周波数の相反する比）**  
> 前節の定理の条件で二地点A、Bに静止時計があり、等しいKilling時間幅 $\Delta t>0$ で固有時 $\Delta\tau_A,\Delta\tau_B$ を比較すると、AからBへ進む同じ光について

$$
\frac{\nu_B}{\nu_A}
=\frac{\Delta\tau_A}{\Delta\tau_B},
\qquad
1+z_{A\to B}=\frac{\Delta\tau_B}{\Delta\tau_A}.
$$

> 両式の $\Delta\tau_i$ は同じ $\Delta t$ に対応する静止時計の経過量である。二地点で同時刻とされる任意の局所事象が、光路上で同一事象であると主張するものではない。
<!-- formal-statement-end -->

### 証明の見取り図

両現象には同じ $\sqrt f$ が現れますが、周波数はその逆数、時計の経過時間はその正比例です。二つの既出公式を同じ二半径で使います。

<!-- proof-start -->
### 証明

[静止時計の固有時率](#prop-gr17-static-clock)から $\Delta\tau_A=\sqrt{f_A}\Delta t$、$\Delta\tau_B=\sqrt{f_B}\Delta t$。比の逆数は $\Delta\tau_A/\Delta\tau_B=\sqrt{f_A/f_B}$ です。[Schwarzschild静止観測者間の重力赤方偏移](#thm-gr17-redshift)は同じ平方根が $\nu_B/\nu_A$ に等しいと示しています。また[赤方偏移の定義](#def-gr17-redshift-z)により $1+z_{A\to B}=\nu_A/\nu_B$。従って第二式も従います。$\square$
<!-- proof-end -->

**信号の山で読み直す。** Aが自分の時計で間隔 $T_A=1/\nu_A$ ごとに連続する波面（または位相が $2\pi$ 増える二つの事象）を送るとします。静的な幾何と、同じKilling軌道上の放射者・受信者を使うので、二つの波面の光路はKilling時間並進で互いに移り、同じ時間間隔 $\Delta t$ だけずれます。Aでは $T_A=\sqrt{f_A}\Delta t$、Bでは $T_B=\sqrt{f_B}\Delta t$。したがって $\nu_B/\nu_A=T_A/T_B=\sqrt{f_A/f_B}$。**静止していない**観測者には、この単純な対応をそのまま適用できません。

## 4. 弱い重力と地表付近での読み替え

正確な比が分かったので、今度は弱重力でどの程度小さい効果になるか計算します。ここからは $r_s/r_A\ll1$、$r_s/r_B\ll1$ とします。Newtonポテンシャル $\Phi_N(r)=-GM/r$ を用いれば、[GR13の弱場の計量対応](../GR13/index.md#def-gr13-newton-potential)と整合して

$$
f(r)=1-\frac{2GM}{c^2r}=1+\frac{2\Phi_N(r)}{c^2}.
$$

二変数の差を明示して一次精度を得るには、$a=2\Phi_N(r_A)/c^2$、$b=2\Phi_N(r_B)/c^2$ とし、

$$
\sqrt{\frac{1+a}{1+b}}
=(1+\tfrac12a+O(a^2))(1-\tfrac12b+O(b^2))
=1+\frac{a-b}{2}+O(a^2+b^2+|ab|)
$$

と展開します。弱場での積の一次項は $\Phi_N(r_A)-\Phi_N(r_B)$ です。

<a id="prop-gr17-weak-field"></a>

<!-- formal-statement-start -->
> **命題（弱場の静止時計・重力赤方偏移）**  
> 正質量Schwarzschildの静的外部において $r_A,r_B\gg r_s$ とし、$\Phi_i=-GM/r_i$、$\epsilon=\max(r_s/r_A,r_s/r_B)\ll1$ とする。AからBへ進む光の正の周波数、および静止時計の等しいKilling時間幅に対して

$$
\frac{\nu_B}{\nu_A}
=1+\frac{\Phi_A-\Phi_B}{c^2}+O(\epsilon^2),
\qquad
\frac{\Delta\tau_B}{\Delta\tau_A}
=1+\frac{\Phi_B-\Phi_A}{c^2}+O(\epsilon^2)
$$

> が成り立つ。さらに $r_B=r_A+h$、$0<h\ll r_A$ とすると

$$
\frac{\Phi_B-\Phi_A}{c^2}
=\frac{GMh}{c^2r_A(r_A+h)}
=\frac{g_Ah}{c^2}+O\left(\frac{GMh^2}{c^2r_A^3}\right),
\qquad g_A=\frac{GM}{r_A^2}.
$$

> ここで $g_A$ は弱場でのNewton重力加速度の大きさである。後二式は弱重力・小高度差を併用した近似である。
<!-- formal-statement-end -->

### 証明の見取り図

正確な平方根比を一次まで展開し、ポテンシャルの差を厳密に通分します。地表近似ではさらに $h/r_A$ を小さい量として扱います。

<!-- proof-start -->
### 証明

$f_i=1+2\Phi_i/c^2$ を[赤方偏移定理](#thm-gr17-redshift)へ代入し、上の二変数展開で

$$
\frac{\nu_B}{\nu_A}
=1+\frac{1}{2}\left(\frac{2\Phi_A}{c^2}-\frac{2\Phi_B}{c^2}\right)
+O(\epsilon^2)
=1+\frac{\Phi_A-\Phi_B}{c^2}+O(\epsilon^2).
$$

時計については[静止時計の命題](#prop-gr17-static-clock)で分子と分母を交換するため、一次項も反転します。次に $\Phi_N(r)=-GM/r$ なので

$$
\begin{aligned}
\Phi_B-\Phi_A
&=-\frac{GM}{r_A+h}+\frac{GM}{r_A}\\
&=\frac{GM[(r_A+h)-r_A]}{r_A(r_A+h)}
=\frac{GMh}{r_A(r_A+h)}.
\end{aligned}
$$

$r_A/(r_A+h)=1-h/r_A+O(h^2/r_A^2)$ を用いると、$\Phi_B-\Phi_A=(GM/r_A^2)h+O(GMh^2/r_A^3)$ です。$\square$
<!-- proof-end -->

上方へ光を送った場合、$\Phi_B-\Phi_A>0$ だから受信周波数は低下し、上側の静止時計は同じKilling時間中に多くの固有時を刻みます。遠くで同じ時間が流れているという素朴な表現は、どの時計でどの時間を測るかを欠くため、定量比較には使えません。

## 5. 何が「重力だけの」効果なのか

**静止は自由落下と同じではありません。** 本章の $U=c\xi/\sqrt f$ は一定半径を保つ時計です。半径方向の[GR15の接続係数](../GR15/index.md#prop-gr15-static-christoffels)を使って四元加速度を計算すると、$x^0$ 成分は零、半径成分は

$$
a^r=(\nabla_UU)^r
=\Gamma^r_{00}(U^0)^2
=\frac12ff'\,\frac{c^2}{f}
=\frac{c^2f'}2
=\frac{GM}{r^2}.
$$

この座標成分は有限ですが、固有加速度の大きさは半径計量 $g_{rr}=1/f$ で長さを取るため

$$
\alpha=\sqrt{g(a,a)}
=\sqrt{g_{rr}(a^r)^2}
=\frac{GM}{r^2\sqrt{f(r)}}>0.
$$

一定半径で留まるには加速が必要であり、$r\downarrow r_s$ に向かうと $\alpha$ が発散します。静的座標の限界を、静止観測者が物理的に作れるかという問題とも区別してください。**有限半径 $r>r_s$ では公式が適用可能**ですが、$r=r_s$ に規格化した静止四元速度は存在しません。

**運動する受信者ならDoppler効果が加わります。** 受信事象の静止観測者を $U_s$ とし、静止直交枠に対して速度 $v$（$|v|<c$）で光の進行方向へ動く観測者を $U_m$ とします。[同一事象での観測者間Doppler公式](../GR4/index.md#prop-gr4-doppler)から、その受信者が測る周波数は

$$
\omega_m=\gamma(1-v/c)\,\omega_s,\qquad
\gamma=(1-v^2/c^2)^{-1/2}.
$$

ここで $\omega_s$ はBの静止観測者が測る周波数です。重力による $\sqrt{f_A/f_B}$ は両端を静止として導いた因子なので、運動する受信者の比は $\gamma(1-v/c)\sqrt{f_A/f_B}$ に変わります。光と反対向きに動けば $v<0$ です。放射者も動く場合は、その場所での放射周波数と静止枠周波数も変換する必要があります。

**時計の違いを曲率の証拠だけと誤認しない。** [GR4のRindler静止観測者の計算](../GR4/index.md#prop-gr4-rindler-frequency)には、平坦な時空でも非慣性の静止観測者間に局所周波数比が生じる例があります。時間的Killing場のノルムが場所に依存するというだけではRiemann曲率が非零とはいえません。本章ではSchwarzschild真空解という曲がった時空を具体的に選んでいます。

## 6. 演習：局所測定とKilling保存を行き来する

### Level A

<a id="ex-gr17-a01"></a>
#### GR17-A01 静止四元速度を正規化する
- Level: A

$M>0$ のSchwarzschild静的外部 $r>r_s=2GM/c^2$ で $f=1-r_s/r$ とする。$r,\theta,\phi$ 一定の世界線について $d\tau/dt$ と四元速度 $U$ を求め、$g(U,U)=-c^2$ を直接確かめよ。

<!-- solution-start -->
**詳細解答。** $dr=d\theta=d\phi=0$ なので $ds^2=-f c^2dt^2=-c^2d\tau^2$。$f>0$ と未来向き $dt>0$ から $d\tau/dt=\sqrt f$。$x^0=ct$ より $U^0=dx^0/d\tau=c/\sqrt f$、他成分は零で $U=(c/\sqrt f)\partial_{x^0}$。計量の $g_{00}=-f$ を代入して $g(U,U)=-f(c^2/f)=-c^2$。[静止時計の命題](#prop-gr17-static-clock)の前提 $r>r_s$ が使われています。
<!-- solution-end -->

<a id="ex-gr17-a02"></a>
#### GR17-A02 二つの半径の時計を比べる
- Level: A

静的外部の $r_A=2r_s$、$r_B=4r_s$ で静止する時計について、共通Killing時間幅 $\Delta t$ の固有時 $\Delta\tau_A,\Delta\tau_B$ とその比を求めよ。

<!-- solution-start -->
**詳細解答。** $f_A=1-1/2=1/2$、$f_B=1-1/4=3/4$。いずれも正なので[固有時率](#prop-gr17-static-clock)が使え、$\Delta\tau_A=\sqrt{1/2}\Delta t$、$\Delta\tau_B=\sqrt{3/4}\Delta t$。比は $\sqrt{(3/4)/(1/2)}=\sqrt{3/2}>1$。Bは遠い側で、同じKilling時間により多くの固有時を刻みます。
<!-- solution-end -->

<a id="ex-gr17-a03"></a>
#### GR17-A03 光の周波数と赤方偏移の符号
- Level: A

$r_A=2r_s$ から $r_B=4r_s$ へ送った同じ光について、$\nu_B/\nu_A$、$\lambda_B/\lambda_A$、$z_{A\to B}$ を求めよ。ここで両地点の観測者は静止し、光は光的アフィン測地線を進み、散乱されない。

<!-- solution-start -->
**詳細解答。** [Schwarzschild静止観測者間の重力赤方偏移](#thm-gr17-redshift)に $f_A=1/2$、$f_B=3/4$ を代入して $\nu_B/\nu_A=\sqrt{(1/2)/(3/4)}=\sqrt{2/3}$。局所波長は $\lambda_i=c/\nu_i$ だから $\lambda_B/\lambda_A=\nu_A/\nu_B=\sqrt{3/2}$。[静止観測者間の赤方偏移量](#def-gr17-redshift-z)から $z_{A\to B}=\sqrt{3/2}-1>0$。$\nu_B<\nu_A$ で上方への赤方偏移です。
<!-- solution-end -->

<a id="ex-gr17-a04"></a>
#### GR17-A04 下方へ送ると何が変わるか
- Level: A

$r_A=4r_s$ を放射側、$r_B=2r_s$ を受信側として光を送る。両者が静止しているときの周波数比と赤方偏移 $z_{A\to B}$ を求め、A03の $z$ の単なる符号反転か確かめよ。

<!-- solution-start -->
**詳細解答。** $f_A=3/4$、$f_B=1/2$ だから[定理](#thm-gr17-redshift)により $\nu_B/\nu_A=\sqrt{3/2}>1$。[定義](#def-gr17-redshift-z)より $z_{A\to B}=\nu_A/\nu_B-1=\sqrt{2/3}-1<0$。A03は $\sqrt{3/2}-1$ なので、その負号 $1-\sqrt{3/2}$ とは一致しません。$1+z$ が逆数になるのであって、$z$ 自体が反対符号の同じ大きさになるわけではありません。
<!-- solution-end -->

<a id="ex-gr17-a05"></a>
#### GR17-A05 Killing保存と局所周波数
- Level: A

静止計量 $g_{00}=-N(r)^2$、$N(r)>0$、$\xi=\partial_{x^0}$ の領域で、アフィン光的測地線の波数四ベクトル $K$ の $\Omega=-c\,g(K,\xi)$ が一定とする。静止観測者の $U$ と局所周波数 $\omega$ を表せ。$\Omega$ と $\omega$ のどちらが一般に位置によらないか。

<!-- solution-start -->
**詳細解答。** $g(\xi,\xi)=-N^2$ なので $U=(c/N)\xi$ と規格化でき、$g(U,U)=(c^2/N^2)(-N^2)=-c^2$ です。[観測者の測定成分・エネルギー・周波数](../GR4/index.md#def-gr4-measured-components)より $\omega=-g(K,U)=-c\,g(K,\xi)/N=\Omega/N$。アフィン測地線とKilling方程式で $\Omega$ は光路上で一定です。$N=N(r)$ が変化すれば $\omega$ は一定とは限りません。[GR14の局所エネルギー式](../GR14/index.md#prop-gr14-local-energy-lapse)とも整合します。
<!-- solution-end -->

### Level B

<a id="ex-gr17-b01"></a>
#### GR17-B01 Killing保存を添字から再導出する
- Level: B

時間的Killing場 $\xi$ のあるLorentz時空で、未来向きの光的アフィン測地線の接ベクトル $K$ が $\nabla_KK=0$ を満たすとする。$\Omega=-c\,g(K,\xi)$ が光路に沿って一定であることを証明し、アフィン性を捨てて $\nabla_KK=qK$ とした場合の式も示せ。

<!-- solution-start -->
**詳細解答。** 積の微分則から $K[g(K,\xi)]=g(\nabla_KK,\xi)+g(K,\nabla_K\xi)$ です。アフィン条件で第一項は零、第二項は $K^\mu K^\nu\nabla_\mu\xi_\nu$。対称な $K^\mu K^\nu$ で縮約すると $K^\mu K^\nu\nabla_\mu\xi_\nu=\tfrac12K^\mu K^\nu(\nabla_\mu\xi_\nu+\nabla_\nu\xi_\mu)=0$。[Killing方程式](../GR14/index.md#prop-gr14-killing-coordinate-test)による零です。ゆえに $K(\Omega)=0$。

$\nabla_KK=qK$ なら同じ計算で $K[g(K,\xi)]=qg(K,\xi)$、従って $K(\Omega)=q\Omega$ です。非アフィンな任意の接ベクトルを物理的波数四ベクトルと同一視してはいけません。この場合に単純な保存が崩れる原因はKilling方程式ではなく測地線のアフィン条件の欠落です。[GR14の非アフィン命題](../GR14/index.md#prop-gr14-force-nonaffine)とも一致します。
<!-- solution-end -->

<a id="ex-gr17-b02"></a>
#### GR17-B02 弱場での符号を独立に検算する
- Level: B

$M>0$、$r_B=r_A+h$、$0<h\ll r_A$、$r_s/r_A\ll1$ とする。AからBへの光の比 $\nu_B/\nu_A$ の一次近似を求め、同じ $\Delta t$ における $\Delta\tau_B/\Delta\tau_A$ と比較せよ。$g_A=GM/r_A^2$ とする。

<!-- solution-start -->
**詳細解答。** [弱場命題](#prop-gr17-weak-field)のポテンシャル差は $\Phi_B-\Phi_A=GMh/[r_A(r_A+h)]$ なので、$h\ll r_A$ で $g_Ah+O(GMh^2/r_A^3)$ です。よって光の比は

$$
\frac{\nu_B}{\nu_A}
=1-\frac{g_Ah}{c^2}
+O\left(\frac{r_s^2}{r_A^2}+\frac{GMh^2}{c^2r_A^3}\right).
$$

同じ命題の時計の比は

$$
\frac{\Delta\tau_B}{\Delta\tau_A}
=1+\frac{g_Ah}{c^2}
+O\left(\frac{r_s^2}{r_A^2}+\frac{GMh^2}{c^2r_A^3}\right).
$$

上方で $\Phi_B>\Phi_A$ なので光は赤方偏移し、上の時計は同じKilling時間に多く進みます。両比は正確には互いに逆数で、一次近似の $+$ と $-$ の違いはこの逆数関係に由来します。
<!-- solution-end -->

<a id="ex-gr17-b03"></a>
#### GR17-B03 静止可能域と固有加速度
- Level: B

正質量Schwarzschild外部で静止する四元速度 $U=c f^{-1/2}\partial_{x^0}$ を用い、四元加速度の半径成分 $a^r$ と大きさ $\alpha$ を導け。$r\downarrow r_s$ で何が発散し、何をまだ証明していないか述べよ。

<!-- solution-start -->
**詳細解答。** 静止世界線では $U^r=0$、$U^0=c/\sqrt f$ が一定なので $a^r=(\nabla_UU)^r=\Gamma^r_{00}(U^0)^2$ です。[GR15の接続係数](../GR15/index.md#prop-gr15-static-christoffels)に $\Phi=\tfrac12\log f$、$e^{-2\Lambda_r}=f$ を代入し、$\Gamma^r_{00}=e^{2(\Phi-\Lambda_r)}\Phi'=f^2 f'/(2f)=ff'/2$。従って $a^r=(ff'/2)(c^2/f)=c^2f'/2=GM/r^2$。

ノルムは $g(a,a)=g_{rr}(a^r)^2=(GM/r^2)^2/f$、よって $\alpha=GM/(r^2\sqrt f)>0$。$r\downarrow r_s$ で $a^r\to GM/r_s^2$ は有限ですが、$\alpha\to+\infty$。これは静止世界線を保つ加速の限界であって、曲率不変量の発散や時空の延長不能性を示す計算ではありません。
<!-- solution-end -->

<a id="ex-gr17-b04"></a>
#### GR17-B04 動く受信者には何が加わるか
- Level: B

静的Schwarzschild外部の二地点 $r_A,r_B>r_s$ を結ぶ光について、Aの静止観測者が $\omega_A$ を測る。Bで静止観測者に対して光の進行方向へ速度 $v=c/3$ で動く別の観測者が受信するとき、受信周波数 $\omega_m/\omega_A$ を求めよ。$v$ はBの局所直交枠で測る速度とする。

<!-- solution-start -->
**詳細解答。** AとBの静止観測者だけなら[赤方偏移定理](#thm-gr17-redshift)から $\omega_s/\omega_A=\sqrt{f_A/f_B}$。Bの局所直交枠で $v=c/3$ なら $\gamma=1/\sqrt{1-1/9}=3/\sqrt8$ です。[同一事象での観測者間Doppler公式](../GR4/index.md#prop-gr4-doppler)から進行方向への運動で $\omega_m=\gamma(1-v/c)\omega_s$。係数は $(3/\sqrt8)(2/3)=1/\sqrt2$、従って

$$
\frac{\omega_m}{\omega_A}=\frac{1}{\sqrt2}\sqrt{\frac{f_A}{f_B}}.
$$

Bが静止していないため $\sqrt{f_A/f_B}$ だけでは不十分です。これはBの同一受信事象でのDoppler変換と、離れた静止観測者間の重力因子を順に掛けた式です。
<!-- solution-end -->

### Level C

<a id="ex-gr17-c01"></a>
#### GR17-C01 時計・光・運動観測者を一続きで比較する
- Level: C

$M>0$ のSchwarzschild外部 $r>r_s$、$f=1-r_s/r$ とし、$r_A=2r_s$、$r_B=4r_s$ に静止した観測者A、Bを置く。AからBへ光的アフィン測地線に沿って散乱なしに送った同じ光を考える。(i) 二つの静止四元速度と正規化を示せ。(ii) 同じ $\Delta t$ で時計の経過固有時の比を出せ。(iii) Killing保存と局所測定から $\nu_B/\nu_A$、$z_{A\to B}$ を求めよ。(iv) Bで静止観測者に対して光の進行方向へ $v=c/3$ で動く受信者の周波数を、Aの測定値と比較せよ。(v) $r_B$ を固定して $r_A\downarrow r_s$ の極限を論じ、その極限を $r_A=r_s$ の静止観測者に対する定理と呼べない理由を述べよ。

<!-- solution-start -->
**詳細解答。** (i) $f_A=1/2>0$、$f_B=3/4>0$ です。よって $U_A=c(1/2)^{-1/2}\xi=c\sqrt2\,\xi$、$U_B=c(3/4)^{-1/2}\xi=(2c/\sqrt3)\xi$。それぞれ $g(U_i,U_i)=(c^2/f_i)g(\xi,\xi)=-c^2$ です。[静止時計の命題](#prop-gr17-static-clock)と同じ規格化です。

(ii) $d\tau_i=\sqrt{f_i}dt$ を積分して

$$
\Delta\tau_A=\frac{\Delta t}{\sqrt2},
\qquad
\Delta\tau_B=\frac{\sqrt3}{2}\Delta t,
\qquad
\frac{\Delta\tau_B}{\Delta\tau_A}=\sqrt{\frac32}.
$$

(iii) [GR14のKilling保存定理](../GR14/index.md#thm-gr14-killing-charge)は $\Omega=-c\,g(K,\xi)$ の光路上での一定性を与えます。[GR4の周波数定義](../GR4/index.md#def-gr4-measured-components)に $U_i=c\xi/\sqrt{f_i}$ を入れれば $\omega_i=\Omega/\sqrt{f_i}$。従って

$$
\frac{\nu_B}{\nu_A}=\frac{\omega_B}{\omega_A}
=\sqrt{\frac{f_A}{f_B}}=\sqrt{\frac23},
\qquad
z_{A\to B}=\frac{\nu_A}{\nu_B}-1=\sqrt{\frac32}-1.
$$

これは時計比の逆数になることも[相反命題](#prop-gr17-clock-frequency-reciprocity)と整合します。

(iv) Bにおいて運動して受信する場合には、[同一事象での観測者間Doppler公式](../GR4/index.md#prop-gr4-doppler)を使います。$v/c=1/3$、$\gamma=3/\sqrt8$ より $\gamma(1-v/c)=1/\sqrt2$。よって

$$
\frac{\omega_m}{\omega_A}
=\frac1{\sqrt2}\sqrt{\frac23}=\frac1{\sqrt3}.
$$

静止Bが受け取る値 $\sqrt{2/3}$ とは異なります。

(v) $r_A\downarrow r_s$ では $f_A\downarrow0$ ですから、固定した $r_B>r_s$ に対し $\nu_B/\nu_A=\sqrt{f_A/f_B}\to0$。ただし各 $r_A>r_s$ での静止光源の局所周波数を一定に揃えて取る極限です。同時に $U_A=c\xi/\sqrt{f_A}$ の座標成分と静止に要する固有加速度は発散します。[静的Schwarzschild座標の適用域](../GR16/index.md#prop-gr16-static-domain)から $r=r_s$ でこの静止世界線を規格化できないので、極限値をその点の静止観測者の実測値と同一視してはいけません。地平線の幾何学的延長の可否も、この周波数極限のみからは分かりません。
<!-- solution-end -->

---

**ここで得た結論は、光が進む経路の長さではなく、静止観測者が従うKilling時間の規格化から出ています。** 無限遠の時間規格化、静止観測者の存在域、アフィン光的測地線、局所的な周波数測定をそれぞれ使いました。次のGR18では、このKilling保存量に角運動量保存と光的条件を加え、Schwarzschild外部の光路の形と屈曲を調べます。
