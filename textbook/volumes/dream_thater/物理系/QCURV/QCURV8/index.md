# QCURV8 Unruh温度・KMS条件と検出器応答

<!-- definition-example-audit: strict -->

[QCURV7の等加速度世界線の二点分布](../QCURV7/index.md#prop-qcurv7-wightman)は、Minkowski真空に置いた検出器が固有時間差だけで定まる相関を見ることを示しました。しかし定常性だけでは温度は定まりません。[QCURV6の長時間遷移率](../QCURV6/index.md#def-qcurv6-stationary-rate)で、励起と脱励起がどの比で生じるかまで計算する必要があります。複素積分では[CA11のGamma関数](../../../解析系/CA/CA11/index.md#def-ca11-gamma-function)を使います。

この章で解く問いは「**真空のままなのに、なぜ等加速度検出器は熱的な比を測るのか**」です。まず熱平衡を二点分布の複素時間境界条件として捉え、次にその分布をFourier変換して検出器の比を直接検算します。最後に、[QCURV3のBogoliubov変換](../QCURV3/index.md#thm-qcurv3-canonical)のモード描像が同じ指数因子を与えることを、計算可能な模型で照合します。

規約は[物理系の計量規約](../../../../../dream-theater-lorentz-conventions.md)の $(-,+,+,+)$、自然単位 $\hbar=c=k_B=1$ です。4次元の質量零自由実スカラー場のMinkowski真空を固定します。

右Rindlerくさびの[静止世界線](../QCURV7/index.md#def-qcurv7-observer)では、半径 $\rho_0>0$、座標尺度 $a>0$、Rindler時間 $\eta$ を使います。未来向き固有時間と固有加速度は

$$
\tau=a\rho_0\eta,\qquad \alpha=\frac1{\rho_0}
$$

です。$a$ は座標を選ぶ尺度であり、軌道ごとに決まる $\alpha$ とは別です。

## 1. 熱平衡を時間相関から判定する

「熱的」と言うには、単なる時間並進不変性より強い条件が必要です。実時間 $s$ の二点相関 $w(s)$ を複素時間 $z$ へ延ばし、虚時間方向へある長さだけ進んだ境界値が、演算子の順序を反転した相関へつながるかを調べます。その虚時間の長さが逆温度です。

ここで $w(s)$ は定常な同一Hermitian場の、順序を固定したWightman二点分布です。一般の二つの観測量のKMS条件では、その順序を反転した相関を用います。この章では検出器の同一場の時間相関に限定して、$w(-s)$ で記します。

<a id="def-qcurv8-kms"></a>

<!-- formal-statement-start -->
> **定義（定常二点分布のKMS境界条件）**
> 実数 $s$ の定常Wightman二点分布 $w(s)$ と逆温度 $\beta>0$ を取る。帯状領域 $-\beta<\operatorname{Im}z<0$ で正則な関数 $F(z)$ が存在し、適切な分布境界値として

$$
F(s-i0)=w(s),\qquad F(s-i\beta+i0)=w(-s)
$$

> を満たすとき、$w$ は固有時間の並進に関して逆温度 $\beta$ のKMS境界条件を満たすという。境界値の極限は、滑らかな試験関数との積分で取る。さらに境界への増大がFourier変換を許す程度に制御される場合を考える。温度は $T=\beta^{-1}$ とする。
<!-- formal-statement-end -->

<!-- definition-example-start: def-qcurv8-kms -->
### 直接例：一個の熱的な調和モード

$\omega_0>0$ の一個のモードについて、$n=(e^{\beta\omega_0}-1)^{-1}>0$ と置き、

$$
w_\beta(s)=(n+1)e^{-i\omega_0s}+n e^{i\omega_0s}
$$

を考えます。係数 $n+1$ は放出側、$n$ は吸収側の重みです。右辺の $s$ を複素数 $z$ に替えた $F(z)$ は整関数で、

$$
\begin{aligned}
F(s-i\beta)
&=(n+1)e^{-\beta\omega_0}e^{-i\omega_0s}
  +n e^{\beta\omega_0}e^{i\omega_0s}\\
&=n e^{-i\omega_0s}+(n+1)e^{i\omega_0s}=w_\beta(-s)
\end{aligned}
$$

です。中間等号は $(n+1)e^{-\beta\omega_0}=n$、$ne^{\beta\omega_0}=n+1$ を使いました。$n=0$ とすると有限の $\beta$ ではこの等式が成立しません。**定常**だけでは有限温度のKMS性に足りない、という最小の反例です。

**定義の確認**：$\beta>0$、帯内の正則性、上端 $F(s-i0)=w(s)$ と下端 $F(s-i\beta+i0)=w(-s)$ を個別に検証しました。この例は整関数なので境界値は通常の値として取れます。
<!-- definition-example-end -->

KMS条件は二点関数の値を見て「何となく熱らしい」と判断する方法ではありません。**時間差のどちらの境界値を取るか**が重要です。特に $i0$ を落として二つの境界を単に周期関数だと同一視すると、演算子の順序の情報が消えます。

## 2. 等加速度世界線でKMS境界を確かめる

[QCURV7で得た引戻し](../QCURV7/index.md#prop-qcurv7-wightman)は、固有時間差 $s=\tau-\tau'$ に関して

$$
w_\alpha(s)=-\frac{\alpha^2}{16\pi^2}
\frac1{\sinh^2\!\left(\alpha(s-i0)/2\right)}
$$

でした。$s=0$ には二重極に対応する分布特異性があります。その位置と虚時間上の繰返しを調べます。

<a id="prop-qcurv8-accelerated-kms"></a>

<!-- formal-statement-start -->
> **命題（加速軌道二点分布のKMS性）**
> 4次元質量零自由実スカラー場のMinkowski真空を、右Rindlerくさびの固有加速度 $\alpha>0$ の全固有時間にわたる等加速度世界線へ引き戻す。そこでの二点分布 $w_\alpha(s)$ は[上のKMS境界条件](#def-qcurv8-kms)を

$$
\beta_\tau=\frac{2\pi}{\alpha}=2\pi\rho_0
$$

> で満たす。Rindler時間 $\eta$ に関する逆温度は $\beta_\eta=2\pi/a$ であり、固有時間の温度は $T_\tau=\alpha/(2\pi)=1/(2\pi\rho_0)$ である。この命題が直接示すのは**この世界線上の二点分布**のKMS境界条件であり、任意の場の相関についてくさび全体のKMS性をここから無条件に結論するものではない。
<!-- formal-statement-end -->

### 証明の見取り図

$\sinh(z-i\pi)=-\sinh z$ のため、$\sinh^{-2}$ は虚方向の周期 $2\pi/\alpha$ を持ちます。ただし帯の上端と下端では極へ近づく側が反転します。この $i0$ の違いがKMS条件の時間反転になります。

<!-- proof-start -->
### 証明

複素時間上の関数を

$$
F_\alpha(z)=-\frac{\alpha^2}{16\pi^2}
\frac1{\sinh^2(\alpha z/2)}
$$

と置きます。分母の零点は $\alpha z/2=i\pi n$、すなわち $z=2\pi i n/\alpha$（$n\in\mathbb Z$）です。ゆえに $-2\pi/\alpha<\operatorname{Im}z<0$ には極がなく正則です。

$\beta_\tau=2\pi/\alpha$ とすれば

$$
\sinh\!\left(\frac{\alpha(z-i\beta_\tau)}2\right)
=\sinh(\alpha z/2-i\pi)=-\sinh(\alpha z/2)
$$

なので $F_\alpha(z-i\beta_\tau)=F_\alpha(z)$ です。帯の上端は $F_\alpha(s-i0)=w_\alpha(s)$ で、下端は

$$
\begin{aligned}
F_\alpha(s-i\beta_\tau+i0)
&=F_\alpha(s+i0)\\
&=F_\alpha(-s-i0)=w_\alpha(-s)
\end{aligned}
$$

です。二行目は $\sinh^2$ が偶関数であることによります。これらは極から離れた点では通常の等式で、極の近くでは分布境界値として成り立ちます。帯内部の有限区間では正則で、境界の二重極は分布として有限次数で扱えるため、[KMS境界条件](#def-qcurv8-kms)に必要な増大の制御も満たします。

最後に[QCURV7の時計の関係](../QCURV7/index.md#def-qcurv7-observer) $\tau=a\rho_0\eta$ を用います。固有時間で虚方向に $i\beta_\tau$ 進むことは、$\eta$ で $i\beta_\tau/(a\rho_0)=2\pi i/a$ 進むことです。従って $\beta_\eta=2\pi/a$、$T_\tau=\beta_\tau^{-1}=\alpha/(2\pi)$ となります。
<!-- proof-end -->

### 直接計算：同じ座標尺度でも温度は異なる

例えば $a=2$ とし、$\rho_0=1$ の軌道は $\alpha=1$、$T_\tau=1/(2\pi)$ です。一方 $\rho_0=3$ なら $\alpha=1/3$、$T_\tau=1/(6\pi)$。どちらも $\beta_\eta=\pi$ ですが、時計はそれぞれ $d\tau=2d\eta$、$d\tau=6d\eta$ と違います。**座標尺度 $a$ だけから物理温度を読んではいけません。**

## 3. Fourier変換で正負ギャップを計算する

熱的な相関を確認しても、検出器の実測量はまだ出ていません。[QCURV6の応答](../QCURV6/index.md#def-qcurv6-response)の位相を $e^{-iE(\tau-\tau')}$ と取ったので、$E>0$ は励起、$E<0$ は脱励起です。長時間・定常の率の比を定義し、符号まで導きます。

<a id="def-qcurv8-detailed-balance"></a>

<!-- formal-statement-start -->
> **定義（検出器の熱的詳細釣合いと温度）**
> 全固有時間で定常な状態と世界線について、[QCURV6の長時間極限](../QCURV6/index.md#def-qcurv6-stationary-rate)で定まる率を $\dot{\mathcal F}(E)$ とする。すべての $E=\Omega>0$ で両率が正かつ有限で

$$
\frac{\dot{\mathcal F}(\Omega)}{\dot{\mathcal F}(-\Omega)}
=e^{-\beta\Omega}
$$

> が一つの $\beta>0$ によって成立するとき、検出器の率は逆温度 $\beta$ の熱的詳細釣合いを満たすという。$T=1/\beta$ は**検出器の固有時間**を基準とした温度である。有限時間の遷移確率にこの等式を自動的に適用しない。
<!-- formal-statement-end -->

<!-- definition-example-start: def-qcurv8-detailed-balance -->
### 直接例：二つの率を与えて比を確認する

$\Omega>0$、$r>0$ とし、脱励起率を $r$、励起率を $r e^{-3\Omega}$ とする（いずれも正・有限）。比は $e^{-3\Omega}$ なので $\beta=3$、$T=1/3$ に対応します。

**定義の確認**：両率の正値・有限性、比の指数形を確かめました。ここでは一つの $\Omega$ しか指定していないため、**すべての正のギャップで同一の $\beta$** という定義全体を確認するには、$r=r(\Omega)>0$ を任意の $\Omega$ に対して与えた族として解釈する必要があります。一個のギャップの観測だけでは状態全体の熱性を検証できません。
<!-- definition-example-end -->

<a id="thm-qcurv8-unruh"></a>

<!-- formal-statement-start -->
> **定理（Unruh検出器の定常率と温度）**
> 4次元質量零自由実スカラー場のMinkowski真空と、全固有時間で定義された固有加速度 $\alpha>0$ の等加速度世界線を考える。実非零の滑らかなコンパクト支持切替を $\chi_T(\tau)=\chi(\tau/T)$ と引き伸ばし、[QCURV6の定常率](../QCURV6/index.md#def-qcurv6-stationary-rate)を用いると、すべての $E\in\mathbb R$ に対して極限が存在し、

$$
\boxed{\displaystyle
\dot{\mathcal F}_\alpha(E)
=\frac{E}{2\pi(e^{2\pi E/\alpha}-1)}}
$$

> となる。$E=0$ では連続延長 $\dot{\mathcal F}_\alpha(0)=\alpha/(4\pi^2)$ とする。特に $\Omega>0$ では

$$
\frac{\dot{\mathcal F}_\alpha(\Omega)}
{\dot{\mathcal F}_\alpha(-\Omega)}
=e^{-2\pi\Omega/\alpha}
$$

> で、[熱的詳細釣合い](#def-qcurv8-detailed-balance)の温度は $T_U=\alpha/(2\pi)$ である。ここでの「率」は切替を伸ばした正規化極限であり、有限切替の励起確率を意味しない。
<!-- formal-statement-end -->

### 証明の見取り図

加速軌道上の二点分布を $s$ でFourier変換します。二重極は虚時間間隔 $2\pi/\alpha$ ごとに並び、$E>0$ では $\operatorname{Im}s<0$ の側、$E<0$ では $\operatorname{Im}s>0$ の側の極を拾います。幾何級数を和にすると同じ分母の二つの率が得られます。最後に、Fourierスペクトルが滑らかで多項式増大にとどまるので、長時間切替の極限がその値を選ぶことを示します。

<!-- proof-start -->
### 証明

$\varepsilon>0$ を有限にして二点分布の境界値を考えます。$\beta=2\pi/\alpha$ と書くと、積分の極は $s_n=i\varepsilon+i n\beta$（$n\in\mathbb Z$）です。極付近で $\sinh(\alpha(s-s_n)/2)\sim(-1)^n\alpha(s-s_n)/2$ だから

$$
\frac{e^{-iEs}}{\sinh^2(\alpha(s-i\varepsilon)/2)}
\sim\frac4{\alpha^2}\frac{e^{-iEs}}{(s-s_n)^2}.
$$

二重極の留数は指数を一回微分して

$$
\operatorname{Res}_{s=s_n}
\frac{e^{-iEs}}{\sinh^2(\alpha(s-i\varepsilon)/2)}
=-\frac{4iE}{\alpha^2}e^{-iEs_n}
$$

です。$E>0$ なら $e^{-iEs}$ が下半平面で減衰するので時計回りに閉じ、拾う極は $n=-1,-2,\ldots$ です。従って（$\varepsilon\downarrow0$ として）

$$
\begin{aligned}
I_+(E)
&=\int_{\mathbb R}\frac{e^{-iEs}}{\sinh^2(\alpha(s-i0)/2)}\,ds\\
&=-2\pi i\left(-\frac{4iE}{\alpha^2}\right)
\sum_{j=1}^\infty e^{-j\beta E}\\
&=-\frac{8\pi E}{\alpha^2}\frac1{e^{\beta E}-1}.
\end{aligned}
$$

$E<0$ では $\operatorname{Im}s>0$ の領域で反時計回りに閉じ、極は $n=0,1,\ldots$ です。$e^{n\beta E}$ が収束するので

$$
\begin{aligned}
I_-(E)
&=2\pi i\left(-\frac{4iE}{\alpha^2}\right)
\sum_{n=0}^\infty e^{n\beta E}\\
&=\frac{8\pi E}{\alpha^2}\frac1{1-e^{\beta E}}.
\end{aligned}
$$

どちらも $w_\alpha$ の係数 $-\alpha^2/(16\pi^2)$ を掛けると

$$
f_\alpha(E):=\int_{\mathbb R}e^{-iEs}w_\alpha(s)\,ds
=\frac{E}{2\pi(e^{\beta E}-1)},\qquad E\ne0
$$

を得ます。これは分布のFourier変換で、境界の $i0$ は積分経路のどちら側に二重極があるかを指定しています。大きな半円を用いる場合は極列を避ける経路列を選び、垂直方向に周期を持つ $\sinh^{-2}$ の水平・垂直辺評価を経て同じ幾何級数を得ます。$E\to0$ では $e^{\beta E}-1=\beta E+O(E^2)$ より $f_\alpha(0)=1/(2\pi\beta)=\alpha/(4\pi^2)$。$|E|\to\infty$ での増大は高々一次です。

次に長時間率へ接続します。$w_\alpha$ の逆Fourier表示と[QCURV6の切替応答](../QCURV6/index.md#def-qcurv6-response)から、$\widehat\chi(p)=\int\chi(\tau)e^{-ip\tau}\,d\tau$ として

$$
\mathcal F_{\chi_T}(E)
=\frac1{2\pi}\int_{\mathbb R}f_\alpha(\lambda)
|\widehat{\chi_T}(E-\lambda)|^2\,d\lambda.
$$

$\widehat{\chi_T}(p)=T\widehat\chi(Tp)$ と $q=T(E-\lambda)$ を代入すれば

$$
\frac{\mathcal F_{\chi_T}(E)}{T\int\chi^2}
=\frac1{2\pi\int\chi^2}\int_{\mathbb R}
f_\alpha(E-q/T)|\widehat\chi(q)|^2\,dq.
$$

$f_\alpha$ は連続で一次増大以下、$\widehat\chi$ は急減少です。$T\ge1$ では $|f_\alpha(E-q/T)|\le C_E(1+|q|)$ で支配されるため優収束を適用できます。[FOU4のPlancherel等式](../../../解析系/FOU/FOU4/index.md#thm-fou4-parseval) $\int|\widehat\chi|^2=2\pi\int\chi^2$ から極限は $f_\alpha(E)$ となります。

最後に $\Omega>0$ で両率は正です。$x=\beta\Omega$ と書けば

$$
\dot{\mathcal F}_\alpha(\Omega)=\frac\Omega{2\pi(e^x-1)},\qquad
\dot{\mathcal F}_\alpha(-\Omega)=\frac\Omega{2\pi(1-e^{-x})}
$$

です。分母の関係 $1-e^{-x}=e^{-x}(e^x-1)$ より比は $e^{-x}=e^{-\beta\Omega}$。従って $\beta=2\pi/\alpha$、$T_U=\alpha/(2\pi)$ が得られます。
<!-- proof-end -->

### 計算例と慣性極限

$\alpha=1$、$\Omega=1$ なら励起率は $1/[2\pi(e^{2\pi}-1)]$、脱励起率は $e^{2\pi}/[2\pi(e^{2\pi}-1)]$、比は $e^{-2\pi}$ です。$\alpha\downarrow0$ で固定 $E>0$ の励起率は0へ、$E<0$ の脱励起率は $-E/(2\pi)$ へ収束し、[QCURV6の慣性率](../QCURV6/index.md#prop-qcurv6-long-time)を回復します。この極限は、**Minkowski真空の状態を変えたこと**を表しません。同じ状態で検出器の軌道だけを変えています。

## 4. 有限時間の検出器は厳密な温度計ではない

上の熱的比は無限に長く定常な相関から得る**率**についての主張です。検出器をオン・オフする有限時間には、切替関数の周波数幅が重なります。これは真空でさえ有限時間に励起できるという[QCURV6の切替例](../QCURV6/index.md#prop-qcurv6-inertial-spectrum)とも整合します。

<a id="prop-qcurv8-switching"></a>

<!-- formal-statement-start -->
> **命題（切替応答の周波数畳込みと短時間極限）**
> 上の等加速度Minkowski真空に対し、実非零 $\chi\in C_c^\infty(\mathbb R)$ と $\chi_T(\tau)=\chi(\tau/T)$（$T>0$）を取る。有限時間の応答は

$$
\mathcal F_{\chi_T}(E)=\frac1{2\pi}
\int_{\mathbb R}f_\alpha(\lambda)
T^2|\widehat\chi(T(E-\lambda))|^2\,d\lambda
$$

> であり、一般に $\mathcal F_{\chi_T}(\Omega)/\mathcal F_{\chi_T}(-\Omega)$ は $e^{-2\pi\Omega/\alpha}$ と等しくない。特に $\Omega>0$ を固定して $T\downarrow0$ とすると、両方の応答は同じ正の有限値

$$
\lim_{T\downarrow0}\mathcal F_{\chi_T}(\pm\Omega)
=\frac1{4\pi^2}\int_0^\infty q|\widehat\chi(q)|^2\,dq>0
$$

> へ収束するので、その比は1へ収束する。一方 $T\to\infty$ の**正規化率**の比は定理の熱的比へ収束する。
<!-- formal-statement-end -->

### 証明の見取り図

時間を短縮すると切替のFourier変換は広くなります。$q=T(E-\lambda)$ と変数を替えると、高周波でのスペクトル $f_\alpha(\lambda)\sim-\lambda/(2\pi)$（$\lambda\to-\infty$）が短時間応答を支配します。その主要項はギャップ $E$ の符号を含みません。

<!-- proof-start -->
### 証明

畳込み表示は[定理の証明](#thm-qcurv8-unruh)と同じ逆Fourier表示から得られます。変数 $q=T(E-\lambda)$ を使い

$$
\mathcal F_{\chi_T}(E)
=\frac T{2\pi}\int_{\mathbb R}
f_\alpha(E-q/T)|\widehat\chi(q)|^2\,dq
$$

とします。$q>0$ を固定すると $E-q/T\to-\infty$ で、

$$
T f_\alpha(E-q/T)
=\frac{TE-q}{2\pi\{e^{\beta(E-q/T)}-1\}}
\longrightarrow\frac q{2\pi}.
$$

$q<0$ では $E-q/T\to+\infty$ で指数分母が勝ち、極限は0です。$f_\alpha(\lambda)$ が一次増大以下なので $0<T\le1$ について $T|f_\alpha(E-q/T)|\le C_E(1+|q|)$ で支配できます。$\widehat\chi$ の急減少性から優収束が使え、右辺の極限を得ます。$\chi$ が非零でコンパクト支持なら、そのFourier変換は一方の半直線全体で零にならないため積分は厳密に正です。

結論は $E=\Omega$ と $E=-\Omega$ の両方で同じです。$e^{-\beta\Omega}<1$ なので、十分短い有限 $T$ では応答比をその定常熱比と同一視できません。長時間の結果は[前の定理](#thm-qcurv8-unruh)で正規化極限として既に示しました。
<!-- proof-end -->

**何が失われたか**：短時間では励起・脱励起とも、切替によって外部から供給された周波数成分を含みます。状態のKMS性が失われたのではなく、検出器の時間局在した測定が単一の定常周波数を選ばなくなったのです。

## 5. モードの混合は同じ指数をどう生むか

二点分布の議論とは別に、Minkowskiの正振動数と[Rindlerの正振動数](../QCURV7/index.md#def-qcurv7-modes)が一致しないことを、Fourier積分で見ることもできます。ここでは横方向を持たない**1+1次元の質量零・右向き伝播成分**を用いた計算模型を使います。これは4次元場の全モードの正規化や、くさび代数のKMS性の一般証明の代わりではありません。

null座標 $U=t-x$ の右くさび $U<0$ 上では、$\nu=\omega/a>0$ として正のboost振動数の因子は $(-aU)^{i\nu}$ です。Minkowskiの右向き正振動数因子は $e^{-ikU}$（$k>0$）。$U<0$ で $q=-U>0$ と置いて両者をFourier比較します。

<a id="prop-qcurv8-mellin"></a>

<!-- formal-statement-start -->
> **命題（RindlerモードMellin係数の指数比）**
> $a,\omega,k>0$、$\nu=\omega/a$ とし、$\delta>0$ により収束化した積分

$$
I_\pm(k;\delta)=\int_0^\infty (aq)^{i\nu}
e^{-\delta q}e^{\mp ikq}\,dq
$$

> を定義する。$\delta\downarrow0$ の境界値では、正・負のMinkowski振動数に対応する係数の絶対値比は

$$
\frac{|I_-(k;0)|}{|I_+(k;0)|}
=e^{-\pi\omega/a},\qquad
\frac{|I_-(k;0)|^2}{|I_+(k;0)|^2}
=e^{-2\pi\omega/a}
$$

> となる。これは半直線上のMellin–Fourier係数の比であり、分布的な連続モードを一個の正規化された粒子状態と取り違えてはならない。
<!-- formal-statement-end -->

### 証明の見取り図

正の半直線上の $q^{i\nu}$ に二種類のFourier位相を掛けます。Gamma積分を減衰因子付きで使い、$\delta\pm ik$ の偏角が $\pm\pi/2$ へ近づくことから指数差が現れます。

<!-- proof-start -->
### 証明

$\operatorname{Re}(1+i\nu)=1>0$、$\operatorname{Re}(\delta\pm ik)=\delta>0$ なので、[CA11のEuler積分によるGamma関数の定義](../../../解析系/CA/CA11/index.md#def-ca11-gamma-function)が使える範囲で、積分変数を $(\delta\pm ik)q$ へ回転させる解析接続により

$$
I_\pm(k;\delta)
=a^{i\nu}\Gamma(1+i\nu)(\delta\pm ik)^{-1-i\nu}
$$

です。複素冪は $\delta>0$ の右半平面で主値の対数を使います。$\delta\downarrow0$ で $\arg(\delta\pm ik)\to\pm\pi/2$ なので

$$
I_\pm(k;0)=a^{i\nu}\Gamma(1+i\nu)
k^{-1-i\nu}e^{\mp i\pi(1+i\nu)/2}.
$$

$|a^{i\nu}k^{-i\nu}|=1$ より

$$
|I_+(k;0)|=\frac{|\Gamma(1+i\nu)|}{k}e^{+\pi\nu/2},\qquad
|I_-(k;0)|=\frac{|\Gamma(1+i\nu)|}{k}e^{-\pi\nu/2}.
$$

割れば $e^{-\pi\nu}$、二乗すれば $e^{-2\pi\nu}$。$k$ に依存する共通因子は消えます。null面上のKG規格化や波束化では共通の測度因子が入りますが、対応する正負成分の指数**比**を変えません。
<!-- proof-end -->

この計算だけで「4次元の各Rindlerモードが独立な熱的粒子」とまでは言えません。左右のくさびにまたがる正振動数の選び方と、[QCURV3の正準係数条件](../QCURV3/index.md#thm-qcurv3-canonical)も必要です。次に、それらの本質が見える有限個の正準モード模型で占有数を確かめます。

<a id="prop-qcurv8-two-mode"></a>

<!-- formal-statement-start -->
> **命題（正準二モード模型の熱的占有数）**
> $0<q<1$ とし、互いに可換な二つの正準bosonモード $b_R,b_L$ を取る。$[b_R,b_R^\dagger]=[b_L,b_L^\dagger]=1$ とし、それ以外の交差交換子は0とする。状態

$$
|\Psi_q\rangle=\sqrt{1-q}\sum_{n=0}^\infty
q^{n/2}|n\rangle_R\otimes|n\rangle_L
$$

> は正規化され、$c_R=(b_R-\sqrt q\,b_L^\dagger)/\sqrt{1-q}$ と $c_L=(b_L-\sqrt q\,b_R^\dagger)/\sqrt{1-q}$ により消される。右モードの粒子数期待値は

$$
\langle\Psi_q|b_R^\dagger b_R|\Psi_q\rangle
=\frac{q}{1-q}.
$$

> $q=e^{-2\pi\omega/a}$ とすれば $1/(e^{2\pi\omega/a}-1)$ となる。これは離散化した**二モード正準模型**の厳密な等式であり、連続無限自由度のくさび状態を文字どおりの密度行列に分解できるとの一般主張ではない。
<!-- formal-statement-end -->

### 証明の見取り図

左右の量子数が一致する幾何級数状態です。$b_R$ の作用で右の量子数を1下げた項と、$\sqrt q\,b_L^\dagger$ で左を1上げた項が打ち消し合います。右側にだけ着目した粒子数の分布は $(1-q)q^n$ です。

<!-- proof-start -->
### 証明

規格化は $(1-q)\sum_{n\ge0}q^n=1$ から従います。例えば $c_R$ の分子を作用させると、$b_R$ の $n=m+1$ の項と $\sqrt q\,b_L^\dagger$ の $n=m$ の項はともに $\sqrt{m+1}\,q^{(m+1)/2}|m\rangle_R|m+1\rangle_L$ で符号が反対なので消えます。$c_L$ も左右を交換して同じです。

交換子は

$$
[c_R,c_R^\dagger]
=\frac{[b_R,b_R^\dagger]+q[b_L^\dagger,b_L]}{1-q}
=\frac{1-q}{1-q}=1
$$

です。交差交換子 $[c_R,c_L]$ の $\sqrt q$ を含む二項も打ち消し合います。従って正準変換です。粒子数作用素は $b_R^\dagger b_R|n\rangle_R=n|n\rangle_R$ なので

$$
\langle b_R^\dagger b_R\rangle
=(1-q)\sum_{n=0}^\infty n q^n
=(1-q)\frac{q}{(1-q)^2}
=\frac{q}{1-q}.
$$

$q=e^{-2\pi\omega/a}$ を代入すれば表示式になります。
<!-- proof-end -->

上の $q$ は[Mellin係数の比](#prop-qcurv8-mellin)の二乗と同じです。通常のUnruhモード構成では、左右くさびを含めた解析的な正振動数の組から、この形の正準混合が得られます。右くさびに制限したMinkowski真空の相関が熱的になることと、Rindler真空を新しく選ぶことは別です。特に連続場の局所代数では無限個のモードの形式的なテンソル積・密度行列はそのまま正当化できず、世界線のKMS検算と検出器率の計算がここでの直接的な物理的根拠です。

## 6. 三つの「温度」を取り違えない

| 量 | この章の定義・計算 | 読み方 |
| --- | --- | --- |
| 固有時間でのKMS逆温度 | $\beta_\tau=2\pi\rho_0=2\pi/\alpha$ | その等加速度検出器の時計の周期 |
| 検出器の長時間詳細釣合い | $\dot{\mathcal F}(\Omega)/\dot{\mathcal F}(-\Omega)=e^{-\beta_\tau\Omega}$ | 固有時間のエネルギーギャップ $\Omega$ に対する熱的率 |
| boost時間 $\eta$ の逆温度 | $\beta_\eta=2\pi/a$ | 座標時間の規格化に依存する周期 |
| RindlerモードのPlanck因子 | $(e^{2\pi\omega/a}-1)^{-1}$ | boost振動数 $\omega$ に対する模型の占有数 |

モードの時間因子 $e^{-i\omega\eta}$ を固有時間に書き直すと、$\eta=\tau/(a\rho_0)$ により固有時間で測る角振動数は $\Omega=\omega/(a\rho_0)$ です。従って指数は

$$
\frac{2\pi\omega}{a}
=\frac{2\pi\Omega}{\alpha}
=\beta_\tau\Omega
$$

と一致します。これは二つの導線の比較であって、「粒子数」「局所検出率」「全時空の状態」が同一の観測量になったことではありません。

この熱性には、Minkowski真空、永続する等加速度軌道、自由場の定常相関、長時間率という仮定が働きます。有限時間切替では比は一般に厳密な熱比にならず、非定常背景や異なる場の状態でも同じ結論を自動で移植できません。また、重力崩壊で無限遠へ到達する放射流束は、加速検出器の局所応答とは別の量です。

## 演習

### Level A：境界値・ギャップ・時計の符号を直接確認する

<a id="ex-qcurv8-a01"></a>
#### QCURV8-A01 一個のモードのKMS条件

- Level: A
- 問題: $\beta,\omega_0>0$、$n=(e^{\beta\omega_0}-1)^{-1}$、$w(s)=(n+1)e^{-i\omega_0s}+n e^{i\omega_0s}$ とする。この式を複素時間 $z$ に延長し、$w(s)$ が[定義](#def-qcurv8-kms)のKMS境界条件を満たすことを、係数の二つの等式から示せ。さらに $n=0$ で有限 $\beta$ の条件が破れる理由を述べよ。

<!-- solution-start -->
**詳細解答**：$F(z)=(n+1)e^{-i\omega_0z}+n e^{i\omega_0z}$ は指数関数の和なので全平面で正則です。$e^{\beta\omega_0}=r>1$ と置けば $n=1/(r-1)$、$n+1=r/(r-1)$ です。従って $(n+1)e^{-\beta\omega_0}=[r/(r-1)]r^{-1}=n$、$ne^{\beta\omega_0}=r/(r-1)=n+1$。これを $F(s-i\beta)$ の各係数へ入れると $F(s-i\beta)=ne^{-i\omega_0s}+(n+1)e^{i\omega_0s}=w(-s)$ です。上端は $F(s)=w(s)$ なので両境界が一致します。$n=0$ なら $w(s)=e^{-i\omega_0s}$ で、$F(s-i\beta)=e^{-\beta\omega_0}e^{-i\omega_0s}$ は $w(-s)=e^{i\omega_0s}$ と一致しません。有限 $\beta$ のKMS性を定常性だけから得ることはできません。
<!-- solution-end -->

<a id="ex-qcurv8-a02"></a>
#### QCURV8-A02 boost時間と固有温度

- Level: A
- 問題: $a=2$ の右Rindlerくさびで、$\rho_0=1$ と $\rho_0=3$ の二本の静止世界線を考える。各軌道の $d\tau/d\eta$、固有加速度 $\alpha$、KMS逆温度 $\beta_\tau$ と温度 $T_\tau$、boost逆温度 $\beta_\eta$ を求めよ。

<!-- solution-start -->
**詳細解答**：[QCURV7の静止軌道](../QCURV7/index.md#def-qcurv7-observer)から $d\tau/d\eta=a\rho_0$、[固有加速度](../QCURV7/index.md#prop-qcurv7-acceleration)から $\alpha=1/\rho_0$ です。$\rho_0=1$ では順に $2,1,2\pi,1/(2\pi)$、$\rho_0=3$ では $6,1/3,6\pi,1/(6\pi)$ です。いずれも $\beta_\eta=\beta_\tau/(a\rho_0)$ なので、前者 $2\pi/2=\pi$、後者 $6\pi/6=\pi$。$a$ が同じでも固有加速度と固有温度は異なります。
<!-- solution-end -->

<a id="ex-qcurv8-a03"></a>
#### QCURV8-A03 励起と脱励起の率

- Level: A
- 問題: 固有加速度 $\alpha=2$、正のギャップ $\Omega=1$ の等加速度検出器を4次元質量零Minkowski真空に置く。[定常率](#thm-qcurv8-unruh)から $\dot{\mathcal F}(1)$、$\dot{\mathcal F}(-1)$、その比、$\dot{\mathcal F}(0)$ を求めよ。

<!-- solution-start -->
**詳細解答**：$\beta=2\pi/\alpha=\pi$ です。正のギャップでは $\dot{\mathcal F}(1)=1/[2\pi(e^\pi-1)]$。負のギャップでは分子が $-1$ で分母も $e^{-\pi}-1<0$ なので、$\dot{\mathcal F}(-1)=1/[2\pi(1-e^{-\pi})]$ と正になります。比は $(1-e^{-\pi})/(e^\pi-1)=e^{-\pi}$。$E=0$ では $e^{\pi E}-1=\pi E+O(E^2)$ より $\dot{\mathcal F}(0)=1/(2\pi^2)$ です。
<!-- solution-end -->

<a id="ex-qcurv8-a04"></a>
#### QCURV8-A04 Mellin積分の絶対値比

- Level: A
- 問題: $a=\omega=k=1$、$\nu=\omega/a=1$ とする。[Mellin係数](#prop-qcurv8-mellin)の境界値 $I_\pm(1;0)=\Gamma(1+i)e^{\mp i\pi(1+i)/2}$ から $|I_+|$ と $|I_-|$ の共通因子を除いた値、振幅比、二乗比を求めよ。

<!-- solution-start -->
**詳細解答**：$e^{-i\pi(1+i)/2}=e^{-i\pi/2}e^{+\pi/2}$ の絶対値は $e^{\pi/2}$、$e^{+i\pi(1+i)/2}=e^{+i\pi/2}e^{-\pi/2}$ の絶対値は $e^{-\pi/2}$ です。従って $|I_+|=|\Gamma(1+i)|e^{\pi/2}$、$|I_-|=|\Gamma(1+i)|e^{-\pi/2}$。$\Gamma(1+i)$ は両方に共通で、振幅比は $e^{-\pi}$、二乗比は $e^{-2\pi}$ です。この指数は検出器の熱的比の指数と同じですが、積分一個だけでは正準規格化された全場の粒子数は出ません。
<!-- solution-end -->

<a id="ex-qcurv8-a05"></a>
#### QCURV8-A05 固有加速度を零へ近づける

- Level: A
- 問題: $f_\alpha(E)=E/[2\pi(e^{2\pi E/\alpha}-1)]$、$\alpha>0$ とする。固定した $\Omega>0$ に対して $\alpha\downarrow0$ の $f_\alpha(\Omega)$、$f_\alpha(-\Omega)$ の極限を計算し、既習の慣性検出器と比較せよ。

<!-- solution-start -->
**詳細解答**：$x=2\pi\Omega/\alpha\to\infty$ なので $f_\alpha(\Omega)=\Omega/[2\pi(e^x-1)]\to0$。一方 $f_\alpha(-\Omega)=(-\Omega)/[2\pi(e^{-x}-1)]=\Omega/[2\pi(1-e^{-x})]\to\Omega/(2\pi)$ です。[QCURV6の慣性長時間率](../QCURV6/index.md#prop-qcurv6-long-time)では正のギャップの励起率が0、負のギャップの脱励起率が $\Omega/(2\pi)$ ですから一致します。固定 $\Omega$ での極限であり、$\Omega/\alpha$ を一定に保つ別の極限とは区別します。
<!-- solution-end -->

### Level B：非自明な計算と失われる仮定を追う

<a id="ex-qcurv8-b01"></a>
#### QCURV8-B01 二重極の向きとPlanck分母

- Level: B
- 問題: $\alpha>0$、$\beta=2\pi/\alpha$、$w_\alpha(s)=-\alpha^2[16\pi^2\sinh^2(\alpha(s-i0)/2)]^{-1}$ とする。$E\ne0$ について $\int e^{-iEs}w_\alpha(s)\,ds$ を求めよ。ただし、$s_n=i\varepsilon+i n\beta$ における留数が $-4iE e^{-iEs_n}/\alpha^2$ であることを利用してよい。$E$ の正負ごとに閉じる向きと極の集合を明記せよ。

<!-- solution-start -->
**詳細解答**：$E>0$ は下半平面で指数が減衰し、閉曲線は時計回り、極は $n=-1,-2,\dots$ です。従って二点分布の係数を除いた積分は $(-2\pi i)(-4iE/\alpha^2)\sum_{j\ge1}e^{-j\beta E}=-(8\pi E/\alpha^2)/(e^{\beta E}-1)$。係数 $-\alpha^2/(16\pi^2)$ を掛けると $E/[2\pi(e^{\beta E}-1)]$。

$E<0$ は $\operatorname{Im}s>0$ の側で減衰し、反時計回り、極は $n=0,1,\dots$ です。積分は $(2\pi i)(-4iE/\alpha^2)\sum_{n\ge0}e^{n\beta E}=(8\pi E/\alpha^2)/(1-e^{\beta E})$。負の係数を掛けると $-E/[2\pi(1-e^{\beta E})]=E/[2\pi(e^{\beta E}-1)]$ となります。$n=0$ を $\operatorname{Im}s<0$ の側に入れる誤りは励起率の分母を誤らせます。$i0$ が極の上下を指定している点が鍵です。
<!-- solution-end -->

<a id="ex-qcurv8-b02"></a>
#### QCURV8-B02 短時間切替で熱的な率の比が破れる理由

- Level: B
- 問題: $\chi\in C_c^\infty(\mathbb R)$ を実非零、$\chi_T(\tau)=\chi(\tau/T)$ とし、$f_\alpha(E)=E/[2\pi(e^{\beta E}-1)]$（$\beta=2\pi/\alpha$）を用いる。応答 $\mathcal F_{\chi_T}(E)=(2\pi)^{-1}\int f_\alpha(\lambda)|\widehat{\chi_T}(E-\lambda)|^2\,d\lambda$ の $T\downarrow0$ 極限を求め、固定 $\Omega>0$ でなぜ熱的比に一致しないか説明せよ。

<!-- solution-start -->
**詳細解答**：$\widehat{\chi_T}(p)=T\widehat\chi(Tp)$ であり、$q=T(E-\lambda)$ と置くと $\mathcal F_{\chi_T}(E)=T(2\pi)^{-1}\int f_\alpha(E-q/T)|\widehat\chi(q)|^2\,dq$ です。$q>0$ では $E-q/T\to-\infty$、従って $T f_\alpha(E-q/T)\to q/(2\pi)$。$q<0$ では $E-q/T\to+\infty$、指数因子により極限は0です。$f_\alpha$ の一次増大と $\widehat\chi$ の急減少による可積分な支配関数 $(1+|q|)|\widehat\chi(q)|^2$ を使って、$\mathcal F_{\chi_T}(E)\to(4\pi^2)^{-1}\int_0^\infty q|\widehat\chi(q)|^2dq>0$。この極限は $E$ に依存しないので、$+\Omega$ と $-\Omega$ の比は1です。しかし定常熱比は $e^{-\beta\Omega}<1$。失ったのは世界線のKMS性ではなく、長時間率で単一周波数を選択するという測定の条件です。
<!-- solution-end -->

<a id="ex-qcurv8-b03"></a>
#### QCURV8-B03 二モード状態の正準性と期待値

- Level: B
- 問題: $0<q<1$、独立なboson演算子 $b_R,b_L$ とし、$|\Psi_q\rangle=\sqrt{1-q}\sum_{n\ge0}q^{n/2}|n,n\rangle$、$c_R=(b_R-\sqrt q b_L^\dagger)/\sqrt{1-q}$ とする。$(i)$ 規格化、$(ii)$ $c_R|\Psi_q\rangle=0$、$(iii)$ $[c_R,c_R^\dagger]=1$、$(iv)$ $\langle b_R^\dagger b_R\rangle=q/(1-q)$ を一つずつ証明せよ。

<!-- solution-start -->
**詳細解答**：$(i)$ $\langle\Psi_q|\Psi_q\rangle=(1-q)\sum_{n\ge0}q^n=(1-q)/(1-q)=1$。$(ii)$ $b_R|n,n\rangle=\sqrt n|n-1,n\rangle$ における $n=m+1$ の係数は $\sqrt{m+1}q^{(m+1)/2}$、$\sqrt q b_L^\dagger|m,m\rangle$ の係数も同じですから差が0です。$(iii)$ 右・左の交差交換子が0、$[b_L^\dagger,b_L]=-1$ より $[c_R,c_R^\dagger]=(1-q)^{-1}(1-q)=1$。$(iv)$ 直交性と数演算子の固有値から $\langle N_R\rangle=(1-q)\sum_{n\ge0}nq^n$。$\sum_{n\ge0}q^n=(1-q)^{-1}$ を $q$ で微分し、$\sum_{n\ge0}nq^n=q/(1-q)^2$ を得るので $\langle N_R\rangle=q/(1-q)$ です。$q=e^{-\beta\omega}$ なら $(e^{\beta\omega}-1)^{-1}$。連続場への無条件のテンソル積分解はこの有限モード計算からは従いません。
<!-- solution-end -->

<a id="ex-qcurv8-b04"></a>
#### QCURV8-B04 同じboostモードを二本の時計で測る

- Level: B
- 問題: 右Rindlerくさびで固定尺度 $a>0$ とboostモード $e^{-i\omega\eta}$（$\omega>0$）を考える。$\rho_1=1/a$ と $\rho_2=2/a$ の二本の静止軌道に沿う固有振動数 $\Omega_j$、固有加速度 $\alpha_j$、温度 $T_j$ を求め、$e^{-2\pi\omega/a}=e^{-\Omega_j/T_j}$ がどちらでも成立することを証明せよ。左くさびで同じ未来向き周波数に $e^{-i\omega\eta}$ を使えない理由も述べよ。

<!-- solution-start -->
**詳細解答**：$\tau_j=a\rho_j\eta$ より $\Omega_j=\omega/(a\rho_j)$、$\alpha_j=1/\rho_j$、$T_j=1/(2\pi\rho_j)$ です。$\rho_1=1/a$ では $\Omega_1=\omega$、$\alpha_1=a$、$T_1=a/(2\pi)$。$\rho_2=2/a$ では $\Omega_2=\omega/2$、$\alpha_2=a/2$、$T_2=a/(4\pi)$。両方で $\Omega_j/T_j=[\omega/(a\rho_j)]/[1/(2\pi\rho_j)]=2\pi\omega/a$。左くさびでは[QCURV7の時間向き](../QCURV7/index.md#def-qcurv7-observer)が $d\tau_L=-a\rho_0d\eta$ なので、$e^{-i\omega\eta}$ は未来向き固有時間では $e^{+i\omega\tau_L/(a\rho_0)}$ に変わり、負振動数です。左の未来向き正振動数には $e^{+i\omega\eta}$ が必要です。
<!-- solution-end -->

### Level C：二つの導線を自分で結ぶ

<a id="ex-qcurv8-c01"></a>
#### QCURV8-C01 Unruh温度を相関・率・モードから再導出する

- Level: C
- 問題: 4次元質量零自由実スカラー場のMinkowski真空を、右Rindlerくさびの半径 $\rho_0>0$、座標尺度 $a>0$ の静止世界線へ引き戻す。固有加速度を $\alpha=1/\rho_0$ とする。[QCURV7の二点分布](../QCURV7/index.md#prop-qcurv7-wightman)の式を出発点とする。

$$
w_\alpha(s)=-\frac{\alpha^2}{16\pi^2\sinh^2(\alpha(s-i0)/2)}
$$

次の四つを順に再導出せよ。

1. 極の位置、解析帯、二つの境界値から逆温度を特定せよ。
2. 二重極の留数を用いて $E>0$ と $E<0$ のFourier率を求め、正のギャップで比を作れ。
3. $\omega>0$ のRindlerモードのMellin振幅比 $e^{-\pi\omega/a}$ と正準二モード占有数を比較し、固有ギャップ $\Omega$ への換算を行え。
4. 有限時間切替や全時空のMinkowski粒子数について結論できる範囲を述べよ。

<!-- solution-start -->
**詳細解答**：$(1)$ $F(z)=-\alpha^2/[16\pi^2\sinh^2(\alpha z/2)]$ の極は $z=2\pi i n/\alpha$（$n\in\mathbb Z$）です。$-\beta<\operatorname{Im}z<0$、$\beta=2\pi/\alpha$ で正則、$\sinh(\alpha(z-i\beta)/2)=-\sinh(\alpha z/2)$ なので $F(z-i\beta)=F(z)$。上端は $F(s-i0)=w_\alpha(s)$、下端は $F(s-i\beta+i0)=F(s+i0)=F(-s-i0)=w_\alpha(-s)$。したがって固有時間KMS逆温度は $\beta=2\pi/\alpha$ です。

$(2)$ $\varepsilon>0$ の極 $s_n=i\varepsilon+i n\beta$ で、二重極の留数は $-4iE e^{-iEs_n}/\alpha^2$。$E>0$ は $\operatorname{Im}s<0$ の側へ時計回りに閉じ、$n=-1,-2,\ldots$ の和から、二点分布係数を掛ける前の積分は $-(8\pi E/\alpha^2)\sum_{j\ge1}e^{-j\beta E}=-(8\pi E/\alpha^2)/(e^{\beta E}-1)$。$E<0$ は $\operatorname{Im}s>0$ の側へ反時計回りに閉じ、$n=0,1,\ldots$ から $(8\pi E/\alpha^2)/(1-e^{\beta E})$。それぞれ $-\alpha^2/(16\pi^2)$ を掛け、両符号で $f_\alpha(E)=E/[2\pi(e^{\beta E}-1)]$ を得ます。$\Omega>0$ なら $f_\alpha(\Omega)=\Omega/[2\pi(e^{\beta\Omega}-1)]$、$f_\alpha(-\Omega)=\Omega/[2\pi(1-e^{-\beta\Omega})]$ なので比は $e^{-\beta\Omega}$。温度は $T_U=1/\beta=\alpha/(2\pi)$ です。長時間率との一致は、スペクトルの連続性と切替のPlancherel近似単位核から従います。

$(3)$ $\nu=\omega/a$ と置くとMellin積分は $I_\pm\propto e^{\mp i\pi(1+i\nu)/2}$、絶対値比は $e^{-\pi\nu}$、二乗比は $q=e^{-2\pi\omega/a}$ です。二モードの正準混合を取り、$|\Psi_q\rangle=\sqrt{1-q}\sum q^{n/2}|n_R,n_L\rangle$ とすれば $\langle N_R\rangle=(1-q)\sum n q^n=q/(1-q)=(e^{2\pi\omega/a}-1)^{-1}$。ただし $\tau=a\rho_0\eta$、$\Omega=\omega/(a\rho_0)$ なので $2\pi\omega/a=(2\pi\rho_0)\Omega=\beta\Omega$。二つの指数が一致します。

$(4)$ 有限切替では周波数が畳み込まれ、$T\downarrow0$ で応答比は1へ近づくので、有限確率の比をいつでも $e^{-\beta\Omega}$ と置けません。Minkowski真空は状態としてはMinkowski正振動数に関する真空のままです。右Rindlerモードによる占有数模型と局所検出器の率は観測量も定義の舞台も異なり、連続場のくさび制限を有限モードの密度行列にそのまま等置することもできません。
<!-- solution-end -->
