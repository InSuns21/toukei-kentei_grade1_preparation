# CDYN15 周期・分岐・同期・速遅・結合の総合

[CDYN4の接線方向のFloquet乗数](../CDYN4/index.md#thm-cdyn4-tangent-unit)は周期運動の中立方向を示し、[CDYN11の同期閾値](../CDYN11/index.md#prop-cdyn11-locking-threshold)は平均位相差の平衡点を分類し、[CDYN13の初期層評価](../CDYN13/index.md#thm-cdyn13-initial-layer-tracking)は速遅の近似が有効な時間を定量化しました。[CDYN14の格子モード](../CDYN14/index.md#thm-cdyn14-fourier-modes)は空間方向の増幅率を測りました。

ここまでの結果を一つの現象へ無条件に合成できるでしょうか。周期運動の乗数が1であることから同期を、平均系の安定性から元の系の永続的同期を、有限格子の安定性から任意の時間刻みやPDE極限を主張すると、**異なる対象・時間・極限**を取り違えてしまいます。

この最終講では、各結果の使い道と停止線を比較したあと、一つの平面振動子で周期軌道の発生と乗数を実際に計算し、速遅と格子を結んだ明示例で一様性の失敗を証明します。最後に、どの結論がどの模型について成立するかを総合演習で判定します。

## 1. 何を比較するか：対象と時間を固定する

ここでいう**時刻写像**は、常微分方程式の解を時間 $T$ だけ進める写像です。連続時間の平衡点・周期解と、離散写像の固定点は同じ言葉で呼べません。[ODE8の流れの合成則](../ODE8/index.md#prop-ode8-flow-law)が示すのは、定義される時間と初期値の範囲での解の接続です。

連続時間の周期軌道は、時刻 $T$ 写像では軌道上の各点が固定されます。しかし時刻 $T$ 写像の固定点は、元のODEの平衡点であってもよいのです。逆に[CDYN1の一次元流れの非周期性](../CDYN1/index.md#thm-cdyn1-no-cycle)は実直線上の非定常周期解を排除しますが、二次元に適用してはいけません。

| 対象 | 判定する量 | 証明された結論と必要な仮定 | 読み替えてはいけない結論 |
| --- | --- | --- | --- |
| 自律ODEの周期軌道 | 一周期の変分行列 | [CDYN4の定理](../CDYN4/index.md#thm-cdyn4-tangent-unit)：$C^1$ ベクトル場の非定常周期軌道では接線方向の乗数が1 | それだけで横方向が安定 |
| 弱結合の平均位相差 | $D'=\Delta-\kappa\sin D$ | [CDYN11の分類](../CDYN11/index.md#thm-cdyn11-capture-basin)：$|\Delta|<\kappa$ なら平均方程式で安定位相差と引込み域を判定 | 元の結合振動子が全時刻で厳密に位相固定 |
| 明示速遅系 | 初期層と追従誤差 | [CDYN13の評価](../CDYN13/index.md#thm-cdyn13-initial-layer-tracking)：係数・入力の導関数の上界を伴う有限時間評価 | 速い時間も初期値も動かして同じ一様極限 |
| 有限周期格子ODE | Fourier固有値と二乗和 | [CDYN14の減衰定理](../CDYN14/index.md#thm-cdyn14-modal-decay)：$N,D,\rho$ 固定で各モードを正確に解く | 固定刻みの数値更新や任意初期データのPDE極限 |
| 有限状態セル・オートマトン | 局所規則と離散時間反復 | [CELL5の保存則](../CELL5/index.md#thm-cell5-ring-conservation)：指定された規則と有限環における保存量 | 実数状態の格子ODEが同じ更新規則 |
| 離散力学系 | 反復の固定点・周期点 | [DYN15の周期点比較](../DYN15/index.md#prop-dyn15-count-obstruction)：対象写像と不変集合を明示して比較 | 周期点の個数を任意の連続時間流に転用 |

とくに「ある有限時間区間で近い」と「無限時間後に同じ状態へ近づく」は別の命題です。後者を定式化するため、位相を実数の代表で追える場面を固定します。

<a id="def-cdyn15-tracking-locking"></a>

<!-- formal-statement-start -->
### 定義（有限時間追従と漸近位相固定）

各 $\varepsilon>0$ に対する実数値の連続な位相差 $D_\varepsilon(t)$ と、連続な比較対象 $\bar D(t)$ が $t\ge0$ で与えられるとする。各 $L>0$ に対して

$$
\sup_{0\le t\le L}|D_\varepsilon(t)-\bar D(t)|
\longrightarrow0\qquad(\varepsilon\to0)
$$

なら、$D_\varepsilon$ は $\bar D$ に**各固定有限時間区間で追従**すると呼ぶ。一方、ある $\varepsilon>0$ で位相差が定数 $D_*$ に収束するなら、その模型で**漸近位相固定**が起こると呼ぶ。角度として比較する場合は、円周距離

$$
d_{\mathbb S^1}(a,b)
=\min_{m\in\mathbb Z}|a-b+2\pi m|
$$

を代わりに使う。
<!-- formal-statement-end -->

<!-- definition-example-start: def-cdyn15-tracking-locking -->
**定義の確認**　次の二つの位相差の持上げを考えます。

$$
D_\varepsilon(t)=\varepsilon t,\qquad \bar D(t)=0.
$$

各固定 $L>0$ では、区間 $0\le t\le L$ の差の上限が $\varepsilon L\to0$ となるため、有限時間追従の定義を満たします。

しかし、動く時刻 $t_\varepsilon=\pi/\varepsilon$ を代入すると、円周距離は

$$
d_{\mathbb S^1}\bigl(D_\varepsilon(t_\varepsilon),\bar D(t_\varepsilon)\bigr)=\pi
$$

です。円周上で $D_\varepsilon$ は回転し続けるため、全時刻の一様追従も定数への漸近位相固定も満たしません。
<!-- definition-example-end -->

この例は近似の精度が低いという反例ではありません。誤差を評価した**時間区間を延長すると、評価も変える必要がある**という例です。

## 2. 一つの平面模型で周期軌道と分岐を計算する

単に乗数の一般論を引用するだけでは、どのパラメータで周期運動が生まれ、いつ横方向の安定性が変わるかが見えません。そこで $\mu\in\mathbb R$ をパラメータとする滑らかな平面自律系

$$
\begin{aligned}
x'&=(\mu-x^2-y^2)x-y,\\
y'&=x+(\mu-x^2-y^2)y
\end{aligned}
$$

を考えます。極座標 $x=r\cos\theta,\ y=r\sin\theta$ は $r>0$ に限って使用します。原点で角度を定義したことにはしません。

<a id="thm-cdyn15-radial-branch"></a>

<!-- formal-statement-start -->
### 定理（平面振動子の周期軌道発生と横方向乗数）

上の平面系では $r>0$ において

$$
r'=\mu r-r^3,\qquad \theta'=1.
$$

$\mu>0$ なら $r=\sqrt\mu$ は最小周期 $T=2\pi$ の周期軌道であり、横方向の一周期乗数は

$$
M_\perp=e^{-4\pi\mu}\in(0,1).
$$

接線方向の乗数は1である。$\mu\le0$ なら正半径一定の周期軌道は存在しない。$\mu<0$ の原点は吸引的で、$\mu=0$ の原点への半径減衰は指数的ではなく代数的である。
<!-- formal-statement-end -->

**証明の見取り図**　まず半径の二乗 $x^2+y^2$ と偏角の変化を、それぞれ座標式から導きます。周期軌道上で半径方程式を微分し、$2\pi$ 周回した倍率を計算します。原点の性質は極座標の角度を使わず、半径の式から調べます。

<!-- proof-start -->
### 証明

$r^2=x^2+y^2$ を微分し、与えた方程式を代入すると、

$$
\begin{aligned}
2rr'
&=2xx'+2yy'\\
&=2x\{(\mu-r^2)x-y\}
 +2y\{x+(\mu-r^2)y\}\\
&=2(\mu-r^2)(x^2+y^2)+2(-xy+xy)\\
&=2(\mu-r^2)r^2.
\end{aligned}
$$

$r>0$ で両辺を $2r$ で割って $r'=(\mu-r^2)r$ を得ます。また

$$
\begin{aligned}
r^2\theta'&=xy'-yx'\\
&=x\{x+(\mu-r^2)y\}
-y\{(\mu-r^2)x-y\}\\
&=x^2+y^2=r^2,
\end{aligned}
$$

よって $\theta'=1$ です。$\mu>0$ では $r_*=\sqrt\mu$ に対し $r'=0$ なので、

$$
(x(t),y(t))
=r_*(\cos(t+\theta_0),\sin(t+\theta_0))
$$

は解であり、$r_*>0$ だからその最小周期は $2\pi$ です。

半径の右辺 $f(r)=\mu r-r^3$ の導関数は $f'(r)=\mu-3r^2$ です。$r_*$ での半径変分 $\eta$ は

$$
\eta'=(\mu-3\mu)\eta=-2\mu\eta,
\qquad
\eta(t)=e^{-2\mu t}\eta(0).
$$

半径方向について一周後には $\eta(2\pi)=e^{-4\pi\mu}\eta(0)$ です。角度方向の微小変化を $\xi=\delta\theta$ と書けば、$\theta'=1$ は初期角度に依存しないので $\xi'=0$、従って $\xi(2\pi)=\xi(0)$ です。

極座標の倍率が元の $(x,y)$ 座標でもFloquet乗数となることを確認します。周期軌道上での座標変換のJacobianは

$$
J(t)=
\begin{pmatrix}
\cos(t+\theta_0)&-r_*\sin(t+\theta_0)\\
\sin(t+\theta_0)&r_*\cos(t+\theta_0)
\end{pmatrix},
\qquad \det J(t)=r_*>0.
$$

微小変位の連鎖律により、直交座標の変分 $\delta z(t)=(\delta x(t),\delta y(t))^{\mathsf T}$ は

$$
\delta z(t)=J(t)
\begin{pmatrix}\eta(t)\\\xi(t)\end{pmatrix}
$$

を満たします。$T=2\pi$ では $J(T)=J(0)$ なので、初期変分から一周後の変分への写像は

$$
\begin{aligned}
\delta z(T)
&=J(T)
\begin{pmatrix}e^{-2\mu T}&0\\0&1\end{pmatrix}
J(0)^{-1}\delta z(0)\\
&=J(0)
\begin{pmatrix}e^{-4\pi\mu}&0\\0&1\end{pmatrix}
J(0)^{-1}\delta z(0).
\end{aligned}
$$

$J(0)$ は可逆ですから、[CDYN4のモノドロミー行列とFloquet乗数の定義](../CDYN4/index.md#def-cdyn4-monodromy)により、元の直交座標での乗数も $e^{-4\pi\mu}$ と $1$ です。後者は[CDYN4の接線方向乗数1の定理](../CDYN4/index.md#thm-cdyn4-tangent-unit)とも一致します。

$\mu<0$ では全ての $r>0$ について $r'=r(\mu-r^2)<0$ です。$r(t)\le r(0)e^{\mu t}$ となることは

$$
\frac d{dt}\bigl(e^{-\mu t}r(t)\bigr)
=-e^{-\mu t}r(t)^3\le0
$$

から従うので、原点へ吸引されます。$\mu=0$ なら $r'=-r^3$ です。$r(0)>0$ の解に対しては、

$$
\frac d{dt}(r^{-2})=-2r^{-3}r'=2,
\qquad
r(t)=\frac{r(0)}{\sqrt{1+2r(0)^2t}}.
$$

解の表示式の分母はどの有限時刻 $t\ge0$ でも正なので、$r(0)>0$ の解は有限時間に原点へ到達せず、この式は全ての $t\ge0$ で有効です。特に $t\to\infty$ で $t^{-1/2}$ の減衰です。$\mu=0$ では $r>0$ の全域で $r'<0$ なので周期軌道はありません。$\mu<0$ についても同様です。$\square$
<!-- proof-end -->

パラメータを0に近づけると、半径 $\sqrt\mu$ は0へ、横方向の乗数 $e^{-4\pi\mu}$ は1へ近づきます。しかし $\mu=0$ では周期軌道自体が消え、原点の角度は定義されません。**周期軌道上で使った乗数を、そのまま消失後の周期軌道の乗数とは呼べません。**

この模型は周期軌道の発生を直接計算した一例です。すべての二次元分岐がこの正規形へ帰着することを本章で証明したわけではありません。[CDYN11の閾値等号の片側安定性](../CDYN11/index.md#prop-cdyn11-threshold-semistability)は、円周上の位相差の退化平衡点で起きる別の変化です。

## 3. 平均位相差の同期閾値は何を保証するか

次の**平均模型そのもの**を考えます。

$$
D'=\Delta-\kappa\sin D,\qquad
\kappa>0,\quad D\in\mathbb R/(2\pi\mathbb Z).
$$

[CDYN11の閾値と分類](../CDYN11/index.md#prop-cdyn11-locking-threshold)から、$|\Delta|<\kappa$ では二つの平衡位相差を持ち、その一方は安定、他方は不安定です。例えば $\Delta=\kappa/2$ なら

$$
\sin D=\frac12
\quad\Longrightarrow\quad
D_s=\frac\pi6,\quad D_u=\frac{5\pi}6
\pmod{2\pi}.
$$

線形化の係数をそれぞれ計算すると

$$
\begin{aligned}
f'(D_s)&=-\kappa\cos(\pi/6)
=-\frac{\sqrt3}{2}\kappa<0,\\
f'(D_u)&=-\kappa\cos(5\pi/6)
=\frac{\sqrt3}{2}\kappa>0.
\end{aligned}
$$

したがって安定点の引込み域については[CDYN11の引込み域定理](../CDYN11/index.md#thm-cdyn11-capture-basin)を使用できます。$|\Delta|=\kappa$ では[CDYN11の閾値等号での片側安定性](../CDYN11/index.md#prop-cdyn11-threshold-semistability)が現れ、$|\Delta|>\kappa$ では位相差が回転します。

ところが元の弱結合模型から平均系への[CDYN10の有限遅い時間の誤差評価](../CDYN10/index.md#thm-cdyn10-averaging)は、その仮定で明示された時間範囲についての近似です。安定点の存在だけで元の模型に厳密な永続同期が存在すると結論するには、元の模型の安定性・持続性に関する追加論証が要ります。

<a id="prop-cdyn15-finite-not-uniform"></a>

<!-- formal-statement-start -->
### 命題（有限時間の追従は全時刻の位相固定を含意しない）

$\varepsilon>0$ に対し円周上の二つの位相差模型

$$
\bar D'=0,\qquad
D_\varepsilon'=\varepsilon,\qquad
\bar D(0)=D_\varepsilon(0)=0
$$

を考える。任意の固定 $L>0$ で、$\bar D$ に対する $D_\varepsilon$ の円周距離の最大値は $\varepsilon L$ 以下である。しかし

$$
d_{\mathbb S^1}\bigl(D_\varepsilon(\pi/\varepsilon),
\bar D(\pi/\varepsilon)\bigr)=\pi.
$$

したがって固定された有限時間区間での $O(\varepsilon)$ 評価だけから、一様全時刻近似または漸近位相固定を結論できない。
<!-- formal-statement-end -->

<!-- proof-start -->
### 証明

実数値の持上げを使うと積分により

$$
\bar D(t)=0,\qquad D_\varepsilon(t)=\varepsilon t
$$

です。円周距離は実数の差の絶対値以下なので、$0\le t\le L$ なら

$$
d_{\mathbb S^1}(D_\varepsilon(t),\bar D(t))
\le |\varepsilon t|\le\varepsilon L.
$$

他方 $t_\varepsilon=\pi/\varepsilon$ では $\varepsilon t_\varepsilon=\pi$ であり、どの整数 $m$ に対しても $|\pi+2\pi m|\ge\pi$ です。円周距離はちょうど $\pi$ となります。$\square$
<!-- proof-end -->

ここで用いた例は[有限時間追従の定義](#def-cdyn15-tracking-locking)の量化順序を検証するための模型であり、[CDYN10の特定の結合系](../CDYN10/index.md#thm-cdyn10-averaging)に同期が生じないと主張する反例ではありません。

## 4. 速遅の誤差評価と格子モードを組み合わせる

[CDYN13の追従誤差の積分表示](../CDYN13/index.md#lem-cdyn13-error-formula)では、速い方向の安定性だけでなく、追従先の時間変化率が誤差を決めました。格子の高周波モードではその変化率が格子点数とともに大きくなり得ます。

そこで $a>0$、$\lambda>0$、$\varepsilon>0$ に対し、

$$
\varepsilon x'=-a(x-y),\qquad
y'=-\lambda y,\qquad
x(0)=y(0)=1
$$

を考えます。$y(t)=e^{-\lambda t}$ が、速い変数 $x$ の追従先です。

<a id="thm-cdyn15-fast-mode"></a>

<!-- formal-statement-start -->
### 定理（速遅追従の非一様性を示すモード模型）

$\varepsilon\lambda\ne a$ の場合、上の系の解は

$$
x(t)=\frac{a e^{-\lambda t}
-\varepsilon\lambda e^{-at/\varepsilon}}
{a-\varepsilon\lambda},
\qquad
x(t)-y(t)
=\frac{\varepsilon\lambda}{a-\varepsilon\lambda}
\bigl(e^{-\lambda t}-e^{-at/\varepsilon}\bigr).
$$

$\varepsilon\lambda=a$ の場合は

$$
x(t)=e^{-at/\varepsilon}
\left(1+\frac{at}{\varepsilon}\right),\qquad
x(t)-y(t)=\frac{at}{\varepsilon}e^{-at/\varepsilon}.
$$

固定した $\lambda,a$ では、任意の $t>0$ に対し $\varepsilon\to0$ で $x(t)-y(t)\to0$ となる。一方、$\varepsilon\lambda=a$ かつ $t=\varepsilon/a$ なら追従誤差は $e^{-1}$ であり、$\lambda$ が $\varepsilon^{-1}$ とともに増える族では一様な追従は結論できない。
<!-- formal-statement-end -->

**証明の見取り図**　積分因子で $x$ を直接解きます。特異な分母が0となる場合は式に無理に代入せず、積分の途中に戻ります。最後にどの変数を固定して極限を取るかを区別します。

<!-- proof-start -->
### 証明

まず $\varepsilon x'+ax=ae^{-\lambda t}$ を積分因子 $e^{at/\varepsilon}$ で書くと、

$$
\frac d{dt}\left(e^{at/\varepsilon}x(t)\right)
=\frac a\varepsilon e^{(a/\varepsilon-\lambda)t}.
$$

初期値 $x(0)=1$ を入れて積分すれば、

$$
e^{at/\varepsilon}x(t)
=1+\frac a\varepsilon
\int_0^t e^{(a/\varepsilon-\lambda)s}\,ds.
$$

$a/\varepsilon\ne\lambda$ では

$$
\begin{aligned}
x(t)
&=e^{-at/\varepsilon}\left[
1+\frac{a}{a-\varepsilon\lambda}
\bigl(e^{(a/\varepsilon-\lambda)t}-1\bigr)\right]\\
&=\frac{a e^{-\lambda t}
-\varepsilon\lambda e^{-at/\varepsilon}}
{a-\varepsilon\lambda}.
\end{aligned}
$$

$y=e^{-\lambda t}$ を引く際には、分子を通分して

$$
\begin{aligned}
x(t)-y(t)
&=\frac{a e^{-\lambda t}-\varepsilon\lambda e^{-at/\varepsilon}
-(a-\varepsilon\lambda)e^{-\lambda t}}
{a-\varepsilon\lambda}\\
&=\frac{\varepsilon\lambda}{a-\varepsilon\lambda}
\left(e^{-\lambda t}-e^{-at/\varepsilon}\right)
\end{aligned}
$$

となります。$a/\varepsilon=\lambda$ では上の積分の被積分関数は1なので、

$$
e^{at/\varepsilon}x(t)
=1+\frac{at}{\varepsilon}.
$$

この場合 $y=e^{-at/\varepsilon}$ ですから、差の式も従います。

$\lambda,a$ を固定し $\varepsilon\to0$ とすると、分母は $a$ へ、$\varepsilon\lambda$ は0へ近づき、$e^{-\lambda t},e^{-at/\varepsilon}$ は $t>0$ で有界なので差は0へ収束します。最後に $\varepsilon\lambda=a$ と $t=\varepsilon/a$ を同時に指定すると、

$$
x(t)-y(t)
=\frac{at}{\varepsilon}e^{-at/\varepsilon}
=1\cdot e^{-1}=e^{-1}.
$$

これは $\varepsilon\to0$ でも0に近づきません。$\square$
<!-- proof-end -->

**格子との結び付き**　[CDYN14の交互モードの固有値](../CDYN14/index.md#thm-cdyn14-fourier-modes)は、偶数 $N$ の場合に $-4$ です。

格子幅を $h=1/N$ とし、拡散係数を $D_N=\kappa N^2$ と置きます。最も高周波なモードは

$$
y'=-4\kappa N^2 y,\qquad
\lambda_N=4\kappa N^2.
$$

このモードを追う速い変数について、$a=1$ とし、

$$
\varepsilon_N=\frac1{\lambda_N}=\frac1{4\kappa N^2},
\qquad t_N=\varepsilon_N
$$

と置きます。各 $N$ で解は存在しますが、[速遅モードの明示解](#thm-cdyn15-fast-mode)により、この時刻の誤差は

$$
x_N(t_N)-y_N(t_N)=e^{-1}
$$

です。[CDYN13の初期層評価](../CDYN13/index.md#thm-cdyn13-initial-layer-tracking)で入力の導関数に課した上界は、この族では $N$ に依存して増大します。したがって、その評価を $N$ に一様な評価へ読み替えることはできません。

この反例は、固定 $t>0$ での二つの反復極限が必ず不一致になると主張していません。**初期時刻へ近づく時間列と、高周波化する空間列について一様性を失う**、という精密な結論です。

## 5. 有限格子ODEから時間離散化・PDEへ移れるか

[CDYN14の固定モード極限](../CDYN14/index.md#prop-cdyn14-fixed-mode-limit)は、$k$ を固定したとき

$$
-4\kappa N^2\sin^2(\pi k/N)
\longrightarrow -4\pi^2\kappa k^2
$$

と主張しました。一方、$k=N/2$ の高周波では固有値は $-4\kappa N^2$ です。このモードを前進Euler法で刻み $\Delta t$ だけ進めるとどうなるでしょうか。

<a id="thm-cdyn15-euler-grid"></a>

<!-- formal-statement-start -->
### 定理（格子細分化と固定時間刻みの安定性障害）

$\kappa>0$、$\Delta t>0$ を固定し、偶数 $N\ge4$ の周期格子上で

$$
u'=D_NLu,\qquad D_N=\kappa N^2
$$

を考える。連続時間の交互モード $u_j(0)=(-1)^j$ は任意の $t>0$ で

$$
u_j(t)=e^{-4\kappa N^2t}(-1)^j
$$

と減衰するが、前進Euler法の一刻みの倍率は

$$
g_{N/2}=1-4\kappa N^2\Delta t.
$$

従ってどの固定 $\Delta t>0$ に対しても、十分大きい偶数 $N$ では $|g_{N/2}|>1$ となる。全ての非零Fourierモードを厳密に減衰させるための必要十分条件は

$$
0<\kappa N^2\Delta t<\frac12
$$

である。
<!-- formal-statement-end -->

<!-- proof-start -->
### 証明

偶数 $N$ では $\sin^2(\pi(N/2)/N)=1$ なので、[CDYN14の線形モード解](../CDYN14/index.md#thm-cdyn14-modal-decay)に $\rho=0$、$D=\kappa N^2$ を入れると

$$
\lambda_{N/2}=-4\kappa N^2,\qquad
u_j(t)=e^{\lambda_{N/2}t}(-1)^j.
$$

前進Euler更新は $u^{n+1}=(I+\Delta tD_NL)u^n$ なので、同じ固有ベクトルの倍率は

$$
g_k=1-4\kappa N^2\Delta t\sin^2(\pi k/N).
$$

特に $k=N/2$ で上記の $g_{N/2}$ を得ます。$4\kappa N^2\Delta t>2$ なら $g_{N/2}<-1$ です。固定した $\Delta t,\kappa>0$ に対して左辺は $N\to\infty$ で発散するため、この条件はいずれ成立します。

非零モード $k=1,\ldots,N-1$ の倍率について、$\sin^2(\pi k/N)>0$ なので $g_k<1$ です。全ての $|g_k|<1$ であるためには同時に $g_k>-1$ が必要で、最大の $\sin^2$ は偶数 $N$ では1です。従って

$$
g_{N/2}>-1
\ \Longleftrightarrow\
1-4\kappa N^2\Delta t>-1
\ \Longleftrightarrow\
\kappa N^2\Delta t<\frac12.
$$

$\kappa,N,\Delta t>0$ と合わせると必要十分条件です。$\square$
<!-- proof-end -->

零モードはどの刻みでも倍率1なので、ここでいう「厳密な減衰」は平均零部分についてです。$N$ に対して $\Delta t$ を十分細かくしなければなりません。固定された $k$ についての固有値極限は、全モードの一様数値安定性を保証していません。

セル・オートマトンとの違いも同様です。[CELL5のRule 184の局所更新](../CELL5/index.md#def-cell5-rule184)は二値状態に対する離散時間の規則であり、[同章の粒子数保存定理](../CELL5/index.md#thm-cell5-ring-conservation)もその規則と有限周期環を仮定します。本節の更新は実数状態をとるEuler近似です。整数添字と最近接結合が共通するだけでは、同一の定理を使えません。また連続空間PDEの解への収束には、空間補間・初期値の整合性・高周波の一様制御・極限方程式の検証が別途必要です。

## 6. 結論を移す前の判定順序

この科目を使って新しい模型を扱うときは、次の順で問題を定めます。

1. **状態と時刻**：実数状態のODE、離散反復、有限状態CA、連続空間PDEのどれか。周期軌道の最小周期と、観測する時刻写像の時刻は等しいか。
2. **比較する解**：元の非線形系・その変分方程式・平均位相方程式・速遅の極限・格子の各モードのどれか。
3. **仮定と境界**：$C^1$ 性、平衡点からの距離、結合強度、有限時間 $L/\varepsilon$、正の減衰係数、有限の $N$、初期位相幅など、実際に使う条件は何か。
4. **量化と極限の順序**：$t\to\infty$、$\varepsilon\to0$、$N\to\infty$、$\Delta t\to0$ のどれを先に行うか。添字と時刻を固定した証明から一様評価を取り出せるか。

[CDYN4の周期変分方程式](../CDYN4/index.md#thm-cdyn4-period-shift)、[CDYN11の平均位相差の引込み域](../CDYN11/index.md#thm-cdyn11-capture-basin)、[CDYN13の初期層の評価](../CDYN13/index.md#thm-cdyn13-initial-layer-tracking)、[CDYN14の有限格子モード](../CDYN14/index.md#thm-cdyn14-modal-decay)は、それぞれの入力条件を確かめて初めて組み合わせられます。必要な一般論を未証明のまま補ってはいけません。

## 7. 演習と詳細解答

### A1. 周期軌道の半径と乗数

第2節の平面振動子で $\mu=1/4$ とする。周期軌道の半径・周期・横方向乗数を求めよ。

- Level: A
- ID: CDYN15-A1

<!-- solution-start -->
**詳細解答**　[平面振動子の定理](#thm-cdyn15-radial-branch)の正半径の条件 $r^2=\mu$ から

$$
r_*=\sqrt{1/4}=\frac12,\qquad T=2\pi.
$$

半径方程式の微分は $f'(r)=\mu-3r^2$ で、$r_*=1/2$ に代入すると

$$
f'(r_*)=\frac14-\frac34=-\frac12.
$$

よって一周期の倍率は $e^{(-1/2)(2\pi)}=e^{-\pi}$ です。接線方向の乗数は1ですが、これは半径方向の安定性と矛盾しません。
<!-- solution-end -->

### A2. 平均位相差の二つの平衡点

$\kappa=2$、$\Delta=1$ の平均方程式 $D'=\Delta-\kappa\sin D$ の平衡点を $[0,2\pi)$ で求め、安定性を分類せよ。

- Level: A
- ID: CDYN15-A2

<!-- solution-start -->
**詳細解答**　[同期閾値の命題](../CDYN11/index.md#prop-cdyn11-locking-threshold)の条件を先に確認すると、周波数差と結合強度は $|\Delta|=1<2=\kappa$ を満たします。平衡点では

$$
1-2\sin D=0
\quad\Longleftrightarrow\quad
\sin D=\frac12.
$$

したがって $[0,2\pi)$ の平衡点は $D=\pi/6$ と $D=5\pi/6$ です。

$$
f'(D)=-2\cos D.
$$

従って $f'(\pi/6)=-\sqrt3<0$ は安定、$f'(5\pi/6)=\sqrt3>0$ は不安定です。これは平均方程式についての結論です。
<!-- solution-end -->

### A3. 一次関数を追う初期層

$\varepsilon>0$ とし、$\varepsilon x'=-(x-(2+t))$、$x(0)=0$ に対して、追従誤差 $e(t)=x(t)-(2+t)$ を求めよ。

- Level: A
- ID: CDYN15-A3

<!-- solution-start -->
**詳細解答**　$e'=x'-1$、$x-(2+t)=e$ なので

$$
\varepsilon e'=-e-\varepsilon,\qquad e(0)=-2.
$$

$q(t)=e(t)+\varepsilon$ と置くと $q'=-q/\varepsilon$、$q(0)=e(0)+\varepsilon=\varepsilon-2$ です。これを解いて

$$
q(t)=(\varepsilon-2)e^{-t/\varepsilon},
\qquad
e(t)=q(t)-\varepsilon
=-\varepsilon+(\varepsilon-2)e^{-t/\varepsilon}.
$$

$t=0$ に代入すると $e(0)=-\varepsilon+\varepsilon-2=-2$ で一致します。指数項が初期層、$-\varepsilon$ が定常的な追従の遅れです。
<!-- solution-end -->

### A4. 交互モードと時間刻み

$N=4$、$\kappa=1$、$D_N=\kappa N^2$、$\Delta t=1/16$ の拡散格子について、交互モードの連続時間固有値とEuler倍率を求めよ。

- Level: A
- ID: CDYN15-A4

<!-- solution-start -->
**詳細解答**　$D_N=16$ であり、交互モードの $L$ の固有値は $-4$ なので

$$
\lambda=-4D_N=-64,\qquad
g=1+\Delta t\lambda
=1-\frac{64}{16}=-3.
$$

ODEは $e^{-64t}$ で減衰しますが、Euler反復は絶対値3倍で増幅します。[格子刻みの定理](#thm-cdyn15-euler-grid)の条件 $\kappa N^2\Delta t<1/2$ は、左辺が1なので成立していません。
<!-- solution-end -->

### A5. 固定モードの空間極限

$\kappa=2$、$k=1$ を固定し、$N\to\infty$ とする。格子の固有値 $\lambda_{1,N}$ の極限を求めよ。

- Level: A
- ID: CDYN15-A5

<!-- solution-start -->
**詳細解答**　[CDYN14の固定モード極限](../CDYN14/index.md#prop-cdyn14-fixed-mode-limit)を適用するには $k=1$ を $N$ に依存させず固定します。

$$
\begin{aligned}
\lambda_{1,N}
&=-8N^2\sin^2(\pi/N)\\
&=-8\pi^2\left(\frac{\sin(\pi/N)}{\pi/N}\right)^2
\longrightarrow-8\pi^2.
\end{aligned}
$$

この結論は $k=N/2$ の交互モードの極限については何も主張しません。
<!-- solution-end -->

### B1. 正半径の初期値から周期軌道への接近

$\mu>0$ の平面振動子について、$r(0)>0$ の解が $r(t)\to\sqrt\mu$ となることを半径二乗 $v=r^2$ の方程式を解いて示せ。

- Level: B
- ID: CDYN15-B1

<!-- solution-start -->
**詳細解答**　[半径方程式](#thm-cdyn15-radial-branch)の両辺に $2r$ を掛けて

$$
v'=2rr'=2\mu r^2-2r^4
=2\mu v-2v^2.
$$

$v(0)>0$ のもとで $w=1/v$ と置くと

$$
w'=-\frac{v'}{v^2}
=-2\mu w+2.
$$

積分因子 $e^{2\mu t}$ を掛けて初期値を入れると

$$
\begin{aligned}
\frac d{dt}(e^{2\mu t}w)&=2e^{2\mu t},\\
e^{2\mu t}w(t)-w(0)&=\frac{e^{2\mu t}-1}{\mu},\\
w(t)&=\frac1\mu+
\left(\frac1{v(0)}-\frac1\mu\right)e^{-2\mu t}.
\end{aligned}
$$

得られた式を

$$
w(t)=\frac{1-e^{-2\mu t}}{\mu}
+\frac{e^{-2\mu t}}{v(0)}
$$

と書き直すと、$\mu>0$、$v(0)>0$、$t\ge0$ から各項が非負で第二項は正なので、全時刻で $w(t)>0$ です。このため $v(t)=1/w(t)$ は正に保たれ、$w(t)\to1/\mu$ から $v(t)\to\mu$、$r(t)\to\sqrt\mu$ となります。原点 $r(0)=0$ は別の平衡解なので、この結論に含めていません。
<!-- solution-end -->

### B2. 有限時間近似から無限時間を主張できるか

$\bar D'=0$ と $D_\varepsilon'=\varepsilon$ の同じ初期位相0からの解を比較する。任意の固定 $L$ の誤差と、時刻 $t_\varepsilon=\pi/\varepsilon$ の円周距離を求め、量化順序を述べよ。

- Level: B
- ID: CDYN15-B2

<!-- solution-start -->
**詳細解答**　積分して $\bar D(t)=0$、$D_\varepsilon(t)=\varepsilon t$ です。[有限時間追従の定義](#def-cdyn15-tracking-locking)の円周距離は実数差以下なので、

$$
\sup_{0\le t\le L}
d_{\mathbb S^1}(D_\varepsilon(t),\bar D(t))
\le\varepsilon L\longrightarrow0.
$$

しかし $\varepsilon t_\varepsilon=\pi$ から距離は $\pi$ です。正しい量化は「任意の固定 $L$ に対して $\varepsilon\to0$」であり、「全時刻 $t\ge0$ を同時に取った上限が0へ近づく」ではありません。
<!-- solution-end -->

### B3. 速遅と高周波の共鳴

$a=1$、$\lambda=1/\varepsilon$、$x(0)=y(0)=1$ の第4節の模型について $x(t)$ と $x(t)-y(t)$ を求め、$t=\varepsilon$ で追従誤差を評価せよ。

- Level: B
- ID: CDYN15-B3

<!-- solution-start -->
**詳細解答**　$\varepsilon\lambda=1=a$ なので、分母 $a-\varepsilon\lambda$ のある式は使えません。[速遅モード定理](#thm-cdyn15-fast-mode)の積分因子をそのまま用いると

$$
\frac d{dt}(e^{t/\varepsilon}x(t))
=\frac1\varepsilon e^{t/\varepsilon}e^{-t/\varepsilon}
=\frac1\varepsilon.
$$

従って $e^{t/\varepsilon}x(t)=1+t/\varepsilon$、つまり

$$
x(t)=e^{-t/\varepsilon}\left(1+\frac t\varepsilon\right),
\qquad
x(t)-y(t)=\frac t\varepsilon e^{-t/\varepsilon}.
$$

$t=\varepsilon$ なら誤差は $e^{-1}$ です。$t=\varepsilon$ も $\varepsilon$ に依存するため、固定した正時刻の極限との矛盾はありません。
<!-- solution-end -->

### B4. 格子全モードのEuler減衰条件

偶数 $N$、$\kappa>0$ の格子 $u'=\kappa N^2Lu$ について、零モードを除く全モードのEuler倍率が厳密に1未満の絶対値となるための必要十分条件を求めよ。等号のときの交互モードも調べよ。

- Level: B
- ID: CDYN15-B4

<!-- solution-start -->
**詳細解答**　[格子モードの固有値](../CDYN14/index.md#thm-cdyn14-fourier-modes)から

$$
g_k=1-4\kappa N^2\Delta t\sin^2(\pi k/N).
$$

$k\ne0$ では正弦二乗が正なので、$\Delta t>0$ なら $g_k<1$ です。$g_k>-1$ の最も厳しい条件は、偶数 $N$ に存在する $k=N/2$ で $\sin^2=1$ を入れた

$$
1-4\kappa N^2\Delta t>-1
\quad\Longleftrightarrow\quad
\Delta t<\frac{1}{2\kappa N^2}.
$$

従って $0<\Delta t<1/(2\kappa N^2)$ が必要十分です。等号では交互モードが $g_{N/2}=-1$ で毎回符号を反転するだけで減衰しません。零モードの倍率は常に1であり、全空間の厳密減衰とは区別します。
<!-- solution-end -->

### B5. 時刻写像の固定点と元の平衡点

円周上のODE $\theta'=1$ の時刻 $2\pi$ 写像の固定点を求めよ。このことが、有限状態シフト写像の固定点計数を連続流へそのまま持ち込めない理由を述べよ。

- Level: B
- ID: CDYN15-B5

<!-- solution-start -->
**詳細解答**　実数の持上げでは $\theta(t)=\theta_0+t$ なので、円周上では

$$
\Phi_{2\pi}(\theta_0)
=\theta_0+2\pi\equiv\theta_0\pmod{2\pi}.
$$

従って時刻 $2\pi$ 写像は恒等写像で、全ての円周上の点が固定されます。一方、ODE $\theta'=1$ のベクトル場は全点で0でないため、ODEの平衡点はありません。有限環シフトの固定反復点数は[DYN15の有限環シフト定理](../DYN15/index.md#thm-dyn15-ring-count)の有限状態という仮定に依存します。円周上の連続状態の時刻写像では、固定点集合は無限になり得るので個数の公式は転用できません。
<!-- solution-end -->

### C1. 周期・同期・速遅・空間モードの同時判定

互いに独立な次の四つの模型を考える。元の模型を勝手に結合して一つの一般定理を使うのではなく、各模型の仮定を点検せよ。

- 平面振動子：$x'=(\mu-x^2-y^2)x-y$、$y'=x+(\mu-x^2-y^2)y$、$\mu=1$。
- 平均位相差：$D'=1-2\sin D$。
- 速遅追従：$\varepsilon x_f'=-(x_f-y_f)$、$y_f'=-y_f$、$\varepsilon=1/4$、$x_f(0)=y_f(0)=1$。
- 六点格子：$u'=u+2Lu$、$N=6$。

1. 平面振動子の非零周期軌道の半径・周期・接線および横方向乗数を求めよ。
2. 平均位相差の平衡点を求め、安定性を判定せよ。
3. 速遅系の解 $x_f(t)$ と誤差 $x_f(t)-y_f(t)$ を求めよ。
4. 六点格子の零モードと最も遅い非零モードの増減率を比較し、原点全体と平均零部分空間の安定性を区別せよ。
5. 格子の拡散項 $2Lu$ だけを $\Delta t=3/10$ でEuler更新した場合の交互モード倍率を求めよ。以上の結論から、「すべての模型で漸近的に同期・減衰する」と言えるか。

- Level: C
- ID: CDYN15-C1

<!-- solution-start -->
**詳細解答**

**(1)**　[周期軌道発生定理](#thm-cdyn15-radial-branch)で $\mu=1$ とすると $r_*=\sqrt1=1$ です。$\theta'=1$ なので最小周期 $T=2\pi$、接線乗数は1です。半径の変分係数は

$$
f'(1)=\mu-3r_*^2=1-3=-2,
$$

横方向乗数は $e^{(-2)(2\pi)}=e^{-4\pi}$ で1より小さくなります。

**(2)**　平衡点の式は $1-2\sin D=0$ なので

$$
D_s=\frac\pi6,\qquad D_u=\frac{5\pi}6
\pmod{2\pi}.
$$

平均位相差の右辺を $g(D)=1-2\sin D$ と書いて微分すると、

$$
\begin{aligned}
g'(D_s)&=-2\cos(\pi/6)=-\sqrt3<0,\\
g'(D_u)&=-2\cos(5\pi/6)=\sqrt3>0.
\end{aligned}
$$

よって平均模型では前者が安定、後者が不安定です。[CDYN11の引込み域定理](../CDYN11/index.md#thm-cdyn11-capture-basin)の条件 $|1|<2$ も満たします。元の弱結合系の永続同期は、これとは別途の証明を要します。

**(3)**　速い方向では $a=1$、追従先は $\lambda=1$、$\varepsilon=1/4$ です。[速遅モードの明示解](#thm-cdyn15-fast-mode)の分母は

$$
a-\varepsilon\lambda
=1-\frac14=\frac34\ne0
$$

なので、

$$
\begin{aligned}
x_f(t)
&=\frac{e^{-t}-(1/4)e^{-4t}}{3/4}\\
&=\frac43e^{-t}-\frac13e^{-4t},\\
x_f(t)-y_f(t)
&=\frac13(e^{-t}-e^{-4t}).
\end{aligned}
$$

$t=0$ では差は0ですが、$t>0$ の間は必ずしも0ではありません。$t\to\infty$ では両項が0へ近づきます。固定した $\varepsilon$ の解を得ただけで、異なる $\varepsilon,N$ にわたる一様性を主張していません。

**(4)**　[格子モード減衰定理](../CDYN14/index.md#thm-cdyn14-modal-decay)に $N=6,\rho=1,D=2$ を代入すると、

$$
\lambda_k=1-8\sin^2(\pi k/6).
$$

$k=0$ は $\lambda_0=1>0$ なので、平均が非零なら指数増大します。$k=1,5$ は $\sin^2(\pi/6)=1/4$ から $\lambda_1=\lambda_5=1-2=-1$ で最も遅く減衰します。他の非零モードは

$$
\lambda_2=\lambda_4=1-6=-5,\qquad
\lambda_3=1-8=-7.
$$

したがって全空間の原点は不安定ですが、平均零部分では全モードが指数減衰します。全空間と不変部分空間の区別が必要です。

**(5)**　交互モードでは $Lu=-4u$ なので、拡散項 $2L$ の固有値は $-8$ です。Euler倍率は

$$
g=1+\frac3{10}(-8)
=1-\frac{24}{10}
=-\frac75
$$

となり、絶対値が1を超えます。連続時間の拡散は減衰しても、刻みの大きい数値更新は増幅します。さらに平均位相差には不安定な平衡点があり、格子には増幅する零モードがあります。従って「全模型が漸近的に同期・減衰する」との結論は誤りです。各結論が**どの方程式・初期値・部分空間・時間区間**に対して成立するかを指定する必要があります。
<!-- solution-end -->

## 8. 講義の到達点と次の問い

ここまでで、連続流の時刻写像と一周期の乗数、保存振動子と強制・非線形振動、平均位相同期、速遅初期層、有限格子の空間モードを、それぞれ仮定付きで計算できるようになりました。

今後、一般的なFloquet正規形・周期軌道の持続、一般の平均化・Fenichel理論、非局所的なKuramoto同期、格子からPDEへの一様収束を学ぶときも、「**対象を特定する → 条件を確認する → 計算する → 結論を述べる**」という順序は変わりません。公式の見た目が似ていることより、何を証明したかが境界線を決めます。
