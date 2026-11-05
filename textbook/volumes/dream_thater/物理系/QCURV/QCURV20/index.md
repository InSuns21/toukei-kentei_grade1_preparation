# QCURV20 時空模型の横断比較――粒子・検出器・流束は何を測るか

<!-- definition-example-audit: strict -->

[FLRWでの粒子生成](../QCURV4/index.md#prop-qcurv4-wronskian-number)、[Rindler観測者のUnruh温度](../QCURV8/index.md#thm-qcurv8-unruh)、[崩壊ブラックホールのHawking波束](../QCURV11/index.md#prop-qcurv11-late-packet-planck)、[de SitterでのGibbons–Hawking温度](../QCURV19/index.md#thm-qcurv19-gh-detector)は、似た指数関数を含みます。しかし指数が同じでも、測定対象が同じとは限りません。何を固定し、何を変えれば、模型を公平に比較できるでしょうか。

本章では「背景・量子状態・時計・観測量・近似」を指定してから結果を比較します。特に、**粒子数の増加、検出器の熱的応答、無限遠へ運ばれるエネルギー**を別の問いとして扱います。最後に $1+1$ 次元模型の流束と熱スペクトルの積分が一致する条件まで計算します。

計量符号は $(-,+,+,+)$、自然単位は $\hbar=c=k_B=1$（必要な箇所では $G=1$）とします。二次元模型は二次元であることを明記し、四次元の重力散乱をそこへ密かに持ち込みません。

## 1. 比較する前に固定する五つの条件

「真空が熱い」という表現には、どの場の状態を、どの時計の観測者が、どの測定器で見るかが抜けています。[QCURV6の検出器応答の定義](../QCURV6/index.md#def-qcurv6-response)では、世界線と切替関数が確率を決めました。また[QCURV15の局所観測量の状態差](../QCURV15/index.md#def-qcurv15-observable-difference)は、応力テンソルを定義するために正則な差引きを必要とします。

ここでは**比較設定**を、背景計量 $g$、量子状態 $\varrho$、観測者の世界線 $\gamma$ とその固有時計 $\tau$、観測量 $\mathcal O$、適用する極限・近似 $\mathcal L$ の組として扱います。$\varrho$ は必ずしも密度行列で表せるとは限らず、場の観測量に期待値を割り当てる状態という意味です。

<a id="def-qcurv20-comparison-setting"></a>

<!-- formal-statement-start -->
> **定義（量子場の比較設定）**
> 固定した背景上の自由場について、**比較設定**を

$$
\mathcal C=(g,\varrho,\gamma,\mathcal O,\mathcal L)
$$

> と書く。$g$ は背景計量、$\varrho$ は場の状態、$\gamma(\tau)$ は固有時間でパラメータ化した時間的世界線（局所測定の際）、$\mathcal O$ は選んだ観測量、$\mathcal L$ は定常・長時間・後期波束・幾何光学・くりこみ等の適用条件である。比較対象の設定が異なれば、数値の一致だけから観測量の同一性を主張しない。
<!-- formal-statement-end -->

<!-- definition-example-start: def-qcurv20-comparison-setting -->
### 直接例：同じMinkowski真空で世界線を変える

四次元の質量零自由実スカラー場で $g=\eta$ とし、状態 $\varrho$ をMinkowski真空 $|0_M\rangle$ に固定します。$\gamma_0(\tau)=(\tau,0,0,0)$ は慣性軌道、$\gamma_a(\tau)=a^{-1}(\sinh a\tau,\cosh a\tau,0,0)$ は $a>0$ の一様加速軌道です。ここで上点は $\dot\gamma=d\gamma/d\tau$（固有時間による微分）を表します。両者の接ベクトルを実際に求めると

$$
\dot\gamma_0=(1,0,0,0),\qquad
\dot\gamma_a=(\cosh a\tau,\sinh a\tau,0,0),
$$

$$
\eta(\dot\gamma_0,\dot\gamma_0)=-1,\qquad
\eta(\dot\gamma_a,\dot\gamma_a)=-\cosh^2(a\tau)+\sinh^2(a\tau)=-1.
$$

従ってどちらの $\tau$ も固有時間であり、定義の時間的世界線という条件を満たします。$\mathcal O$ を定常検出率、$\mathcal L$ を切替を伸ばす長時間極限と選ぶと、[慣性真空の正ギャップ率は零](../QCURV6/index.md#prop-qcurv6-inertial-spectrum)ですが、[加速検出器の率](../QCURV8/index.md#thm-qcurv8-unruh)は正です。

**定義の確認**：背景・状態・観測量・長時間極限を同じにして世界線だけを変えました。したがって違いを状態の粒子生成へ帰すことはできません。$a\to0$ を取る前には固有時間と長時間極限を指定する必要があります。
<!-- definition-example-end -->

次の表で「粒子」は選んだ正周波数モードに関する数、「熱的検出」は固有時間での[励起・脱励起率のBoltzmann比](../QCURV8/index.md#def-qcurv8-detailed-balance)、「流束」は応力テンソルまたは遠方粒子エネルギー流のことです。

| 背景・模型 | 状態と時計 | 主要な出力 | 成立に必要な制限 |
| --- | --- | --- | --- |
| 周波数急変振動子 / FLRW | in真空とin/outモード | $|\beta|^2$ のout粒子数 | 漸近モード、Wronskian規格化。一般には熱性なし |
| Minkowski–Rindler | Minkowski真空と加速固有時 | Unruh検出器の励起・脱励起率の比 | 定常軌道、長時間極限。平坦真空からの放射流束は導かれない |
| 崩壊Schwarzschild | in真空と遠方のretarded時刻 | 後期out波束の熱因子と灰色体を通った流束 | 地平線形成、後期近似、散乱境界条件 |
| $1+1$次元共形模型 | inのnull真空とout座標 $u$ | Schwarzianによる片方向流束 | 二次元・共形・状態・差引き規約 |
| de Sitter静的パッチ | Bunch–Davies状態と静的観測者の固有時 | Gibbons–Hawking検出器温度 | ここでの明示公式は四次元質量零共形結合場 |

## 2. 一致する熱的検出率、異なる時空の物理

意外にも、二つの異なる時空で同じ定常検出率が現れます。[QCURV8の加速軌道の二点関数](../QCURV8/index.md#prop-qcurv8-accelerated-kms)と[QCURV19のBunch–Davies二点関数](../QCURV19/index.md#thm-qcurv19-bd-wightman)は、軌道に沿う時間差 $s=\tau-\tau'$ を使うと、正の定数 $q$ に対し同じ関数形

$$
W_q(s)=-\frac{q^2}{16\pi^2}\frac1{\sinh^2\!\left(q(s-i0)/2\right)}
$$

になります。ただしRindlerでは $q=a$（加速度）、de Sitterの中心では $q=H$（膨張率）です。$i0$ は先に $\epsilon>0$ で境界値を取り、その後 $\epsilon\downarrow0$ とする分布規約です。以下の $\dot{\mathcal F}$ は通常の時間微分ではなく、[QCURV6の長時間切替による定常率](../QCURV6/index.md#def-qcurv6-stationary-rate)を表します。

<a id="prop-qcurv20-detector-degeneracy"></a>

<!-- formal-statement-start -->
> **命題（異なる背景で一致する定常検出率）**
> 四次元の質量零自由実スカラー場のMinkowski真空を一様加速 $a>0$ で測る検出器と、四次元de Sitterの質量零・共形結合自由実スカラー場のBunch–Davies状態を静的パッチ中心で測る検出器を考える。両者に同じ正のギャップ $\Omega$ と同じ結合規格化を与え、相関関数の定常・長時間Fourier変換が定義されるとする。$a=H=q>0$ の場合、励起率は両者で等しく、

$$
\dot{\mathcal F}_{q}(\Omega)
=\frac{\Omega}{2\pi\bigl(e^{2\pi\Omega/q}-1\bigr)},
\qquad \Omega>0.
$$

> いずれも逆温度 $\beta=2\pi/q$ に対応する熱的な励起・脱励起比を満たすが、この一致は背景計量や状態の応力テンソルが同じであることを意味しない。
<!-- formal-statement-end -->

### 証明の見取り図

検出器に入力されるのは軌道に引き戻した二点関数です。それが同じ分布なら、同じFourier変換を持つことを使います。ただし地平線の種類や応力テンソルまで同一視しません。

<!-- proof-start -->
### 証明

[定常検出率](../QCURV6/index.md#def-qcurv6-stationary-rate)を $\dot{\mathcal F}_q(\Omega)=\int_{-\infty}^{\infty}e^{-i\Omega s}W_q(s)\,ds$ とする。上記の二つの軌道で $W_q$ は同じ境界値分布なので、同じFourier変換を与えます。実際、[QCURV8のUnruh検出率の留数計算](../QCURV8/index.md#thm-qcurv8-unruh)では $\Omega>0$ の輪郭を下半平面に閉じ、$s=-2\pi in/q$（$n=1,2,\ldots$）の二重極を足して

$$
\dot{\mathcal F}_q(\Omega)
=\frac{\Omega}{2\pi}
\sum_{n=1}^{\infty}e^{-2\pi n\Omega/q}
=\frac{\Omega}{2\pi(e^{2\pi\Omega/q}-1)}
$$

を得ます。負のギャップ $-\Omega$（$\Omega>0$）では輪郭を上半平面に閉じます。今度は $n=0,1,2,\ldots$ の極が寄与するため、

$$
\dot{\mathcal F}_q(-\Omega)
=\frac{\Omega}{2\pi}\sum_{n=0}^{\infty}e^{-2\pi n\Omega/q}
=\frac{\Omega e^{2\pi\Omega/q}}{2\pi(e^{2\pi\Omega/q}-1)}.
$$

従って

$$
\frac{\dot{\mathcal F}_q(\Omega)}{\dot{\mathcal F}_q(-\Omega)}
=e^{-2\pi\Omega/q}.
$$

Rindlerの $q=a$ とde Sitter中心の $q=H$ の結果を、両者が等しい値に揃えて比較すれば命題が従います。導出は指定したスカラー場・状態・軌道に限ります。
<!-- proof-end -->

ここが最も重要な反例です。Minkowski真空のくりこまれた応力テンソルは、その真空を基準にすれば $\langle T_{ab}\rangle_{\rm ren}=0$ です。加速しても**場の状態は変わっていません**。したがって検出器が励起することから「真空が無限遠へエネルギーを放射した」とは言えません。一方de Sitterの曲率は零ではなく、静的パッチの外にSchwarzschild型の漸近平坦な無限遠もありません。熱的な率の比の一致と、同一の遠方流束という主張は別です。

### 時計を変えると「温度」の数値も変わる

Tolman因子は別の温度を足す操作ではありません。[QCURV14のTolman則](../QCURV14/index.md#thm-qcurv14-tolman)を、検出器のFourier変換から直接確認します。時間座標 $T$ による定常相関を $W_T(\Delta T)$ とし、同じ静止世界線で固有時間 $\tau=\lambda T$（$\lambda>0$ は一定）とします。ここでは $\Delta\tau=s$、$\Delta T=s/\lambda$ です。$E$ は $T$ の時間差に、$\Omega$ は固有時間差にFourier共役なギャップで、同じ遷移を $E=\lambda\Omega$ と対応させます。

<a id="prop-qcurv20-clock-rescaling"></a>

<!-- formal-statement-start -->
> **命題（定常率と温度の時計換算）**
> $W_T(s)$ のFourier変換 $R_T(E)$ が存在し、$E>0$ に対して $R_T(E)/R_T(-E)=e^{-\beta_T E}$ を満たすとする。固有時間 $\tau=\lambda T$、$\lambda>0$ の下で $W_\tau(s)=W_T(s/\lambda)$ とすれば、$\tau$ に関する率は

$$
R_\tau(\Omega)=\lambda R_T(\lambda\Omega),
\qquad \beta_\tau=\lambda\beta_T.
$$

> ここで $R_T$ と $R_\tau$ はそれぞれ対応する時計の単位時間当たりの率であり、同じエネルギーギャップの数値を無条件には代入しない。
<!-- formal-statement-end -->

### 証明の見取り図

Fourier積分の変数を $s=\lambda u$ に換え、エネルギーが時計と逆に尺度変換することを使います。

<!-- proof-start -->
### 証明

定常率の定義と $\lambda>0$ から

$$
\begin{aligned}
R_\tau(\Omega)
&=\int_{-\infty}^{\infty}ds\,e^{-i\Omega s}W_T(s/\lambda)\\
&=\lambda\int_{-\infty}^{\infty}du\,e^{-i(\lambda\Omega)u}W_T(u)
=\lambda R_T(\lambda\Omega).
\end{aligned}
$$

同じ式を負ギャップへ適用すると共通因子 $\lambda$ が消えて、

$$
\frac{R_\tau(\Omega)}{R_\tau(-\Omega)}
=\frac{R_T(\lambda\Omega)}{R_T(-\lambda\Omega)}
=e^{-\beta_T\lambda\Omega}.
$$

従って $\beta_\tau=\lambda\beta_T$、$T_\tau=T_T/\lambda$ です。これは一定の時間換算についての結論であり、任意の非定常軌道に局所温度を定義したものではありません。
<!-- proof-end -->

### 直接計算：de Sitter静的半径での局所温度

[静的パッチ](../QCURV19/index.md#def-qcurv19-static-patch)では $\lambda=\sqrt{1-H^2r^2}$。中心で規格化された $T_T=H/(2\pi)$ を入れると、半径 $r=1/(\sqrt2H)$ では $\lambda=1/\sqrt2$ だから

$$
T_{\rm loc}=\frac{H}{2\pi\lambda}
=\frac{\sqrt2H}{2\pi}.
$$

これは[QCURV19の局所温度の計算](../QCURV19/index.md#prop-qcurv19-local-temperature)と一致します。$0\le r<H^{-1}$ で $\lambda>0$ が必要で、地平線 $\lambda=0$ へそのまま静止観測者を延長しません。

## 3. out粒子数があっても熱平衡とは限らない

[QCURV3の周波数急変振動子](../QCURV3/index.md#prop-qcurv3-quench)は、粒子数と温度を分ける小さな実験です。$t<0$ では角周波数 $\omega_i>0$、$t>0$ では $\omega_f>0$ とし、位置 $q$ と速度 $\dot q=dq/dt$ を $t=0$ で連続にします。急変は理想化された時間依存振動子の模型で、すべてのFLRWに突然の不連続を要求するものではありません。

<a id="prop-qcurv20-quench-not-thermal"></a>

<!-- formal-statement-start -->
> **命題（急変振動子のout粒子数は熱性を意味しない）**
> 単位質量の自由振動子の周波数を $\omega_i>0$ から $\omega_f>0$ に瞬間変更し、$t=0$ で $q,\dot q$ を連続にする。初期正周波数モードを終期の正・負周波数モードへ展開すると、Bogoliubov係数は実数位相の規約で

$$
\alpha=\frac12\!\left(\sqrt{\frac{\omega_f}{\omega_i}}
+\sqrt{\frac{\omega_i}{\omega_f}}\right),
\qquad
\beta=\frac12\!\left(\sqrt{\frac{\omega_f}{\omega_i}}
-\sqrt{\frac{\omega_i}{\omega_f}}\right)
$$

> と取れる。初期真空での終期粒子数は

$$
\langle N_{\rm out}\rangle=|\beta|^2
=\frac{(\omega_f-\omega_i)^2}{4\omega_f\omega_i}.
$$

> $\omega_f\ne\omega_i$ の場合、初期真空は終期の時間発展について一般に定常でなく、従って終期Hamiltonianの有限温度KMS状態ではない。粒子数という一つの値からKMS性は結論できない。
<!-- formal-statement-end -->

### 証明の見取り図

二つの規格化したモードを境界で接続し、位置と速度の連立一次方程式から係数を決めます。熱性は二点関数の時間並進と解析的条件を要する、別の条件です。

<!-- proof-start -->
### 証明

$t<0$ の解を $u_i=e^{-i\omega_it}/\sqrt{2\omega_i}$ とし、$t>0$ で $u_i=\alpha u_f+\beta u_f^*$、$u_f=e^{-i\omega_ft}/\sqrt{2\omega_f}$ と書く。$t=0$ での値と微分を合わせると

$$
\begin{aligned}
\alpha+\beta&=\sqrt{\omega_f/\omega_i},\\
\alpha-\beta&=\sqrt{\omega_i/\omega_f}.
\end{aligned}
$$

和差から命題の係数を得て、差の平方より $|\beta|^2=(\omega_f/\omega_i+\omega_i/\omega_f-2)/4$ です。また

$$
|\alpha|^2-|\beta|^2
=(\alpha+\beta)(\alpha-\beta)=1
$$

なので正準規格化が維持されます。[in真空のout粒子数](../QCURV3/index.md#prop-qcurv3-number)を与える命題から、

$$
\langle N_{\rm out}\rangle=|\beta|^2
$$

です。終期演算子を次のように書く位相規約を選ぶと、初期真空の対相関は

$$
a_{\rm out}=\alpha a_{\rm in}+\beta a_{\rm in}^{\dagger},
\qquad
\langle a_{\rm out}a_{\rm out}\rangle=\alpha\beta
$$

です。$\omega_f\ne\omega_i$ なら $\beta\ne0$、$\alpha>0$ より非零です。終期Hamiltonianの時間並進では

$$
a_{\rm out}(t)=e^{-i\omega_ft}a_{\rm out},
\qquad
\langle a_{\rm out}(t)a_{\rm out}(t)\rangle
=e^{-2i\omega_ft}\alpha\beta.
$$

この対相関は時刻で変化し、時間並進不変ではありません。KMS状態は特に定常であるため、この状態はKMSではありません。
<!-- proof-end -->

$\omega_f=2\omega_i$ を代入すれば $|\beta|^2=1/8$。これは具体的な粒子生成です。しかし一つの占有数 $1/8$ に対して形式的に $1/(e^{\beta_{\rm fit}\omega_f}-1)=1/8$ と解けば $\beta_{\rm fit}\omega_f=\log9$ と表示できるだけです。ここで $\beta_{\rm fit}$ は占有数に当てはめた逆温度であり、上のBogoliubov係数 $\beta$ とは異なります。**値の当てはめは熱状態の証明ではありません**。また[QCURV4の質量零・共形結合場の非生成定理](../QCURV4/index.md#thm-qcurv4-conformal)は $\beta=0$ を許すため、膨張の有無それ自体も粒子数を一意に決めません。

## 4. 熱因子から放射光度へは散乱を通る

崩壊ブラックホールの後期波束での指数因子は、[QCURV11のFourier積分と熱因子](../QCURV11/index.md#thm-qcurv11-thermal-ratio)から来ます。しかし無限遠で観測する周波数別流束には、[QCURV12の灰色体因子](../QCURV12/index.md#def-qcurv12-greybody-factor)が必要です。非回転・非荷電Schwarzschild外部で、質量零スカラー場、指定したin状態、後期・定常近似に限れば

$$
\frac{d^2N}{dt\,d\omega}
=\frac1{2\pi}\sum_{\ell=0}^{\infty}(2\ell+1)
\frac{\Gamma_\ell(\omega)}{e^{\beta_H\omega}-1},
\qquad \beta_H=8\pi M,
$$

です。ここで $d^2N/(dt\,d\omega)$ は単位時刻・単位角周波数あたりの粒子数流束、$\omega>0$ は無限遠のKilling時刻に関する角周波数、$\Gamma_\ell\in[0,1]$ は散乱透過確率、$M>0$ は幾何単位の質量です。エネルギー光度はこれをさらに $\omega$ 倍して積分した量です。式の条件と導出は[灰色体流束定理](../QCURV12/index.md#thm-qcurv12-greybody-flux)にあり、熱因子だけからこの公式を再導出したことにはなりません。

対して、[QCURV16の二次元Schwarzian流束](../QCURV16/index.md#thm-qcurv16-hawking-flux)には四次元の角運動量障壁を表す $\Gamma_\ell$ がありません。両者を繋ぐとき、何が同じで何が異なるかを手で確かめましょう。

<a id="prop-qcurv20-two-dimensional-moment"></a>

<!-- formal-statement-start -->
> **命題（二次元共形模型の熱的エネルギー流束の二つの計算）**
> $1+1$ 次元の質量零共形スカラー（右向き一成分、中心荷 $c=1$）を、平坦な漸近領域のin真空で考える。十分遅い時刻の出射null座標 $u$ に対する光線写像が $p(u)=v_H-Ae^{-\kappa u}$（$A,\kappa>0$）で与えられ、in真空の状態依存流束の差引き規約を[QCURV16の流束変換](../QCURV16/index.md#thm-qcurv16-state-transformation)と一致させる。すると

$$
\langle T_{uu}\rangle_{\rm out}
=\frac{\kappa^2}{48\pi}
=\int_0^\infty\frac{d\omega}{2\pi}
\frac{\omega}{e^{\beta_H\omega}-1},
\qquad \beta_H=\frac{2\pi}{\kappa}.
$$

> 第二の等号は一次元の**片方向・単一成分の熱スペクトルのエネルギー積分**であって、四次元Schwarzschildの全光度ではない。
<!-- formal-statement-end -->

### 証明の見取り図

一方では指数写像を三階微分してSchwarzianを求め、他方ではBose積分の級数から同じ係数を計算します。

<!-- proof-start -->
### 証明

ここでプライム $p',p'',p'''$ はいずれも $u$ に関する常微分で、[Schwarzian微分の定義](../QCURV16/index.md#def-qcurv16-schwarzian)と同じ記法です。指数関数を順に微分すると

$$
p'=A\kappa e^{-\kappa u}>0,\qquad
p''=-A\kappa^2e^{-\kappa u},\qquad
p'''=A\kappa^3e^{-\kappa u}.
$$

従って同じ定義式より

$$
\{p,u\}=\frac{p'''}{p'}-\frac32\!\left(\frac{p''}{p'}\right)^2
=\kappa^2-\frac32\kappa^2=-\frac{\kappa^2}{2}.
$$

平坦な漸近領域のin真空では、[状態変換公式](../QCURV16/index.md#thm-qcurv16-state-transformation)の右向き状態関数が $-\{p,u\}/(24\pi)$ なので、$\langle T_{uu}\rangle=\kappa^2/(48\pi)$ です。

もう一方の積分で $x=\beta_H\omega$ とすると

$$
\int_0^\infty\frac{d\omega}{2\pi}
\frac{\omega}{e^{\beta_H\omega}-1}
=\frac1{2\pi\beta_H^2}
\int_0^\infty\frac{x\,dx}{e^x-1}.
$$

$x>0$ で $(e^x-1)^{-1}=\sum_{n=1}^\infty e^{-nx}$、各項が非負なので単調収束により積分と和を交換できる。部分積分またはLaplace積分で $\int_0^\infty x e^{-nx}dx=1/n^2$。従って

$$
\int_0^\infty\frac{x\,dx}{e^x-1}
=\sum_{n=1}^\infty\frac1{n^2}
=\frac{\pi^2}{6},\qquad
\frac{\pi}{12\beta_H^2}
=\frac{\pi}{12}\frac{\kappa^2}{4\pi^2}
=\frac{\kappa^2}{48\pi}.
$$

後者の流束は二次元右向きモードの状態・境界条件を指定した値です。四次元へ移せば角運動量和と灰色体因子、単位面積と無限遠の時刻規格化が追加で必要です。
<!-- proof-end -->

ここで三つの異なる極限を混ぜてはいけません。検出器の熱的率は**定常かつ長時間**の極限、Hawking粒子数は**後期出射波束**の極限、Schwarzian流束は**共形模型と状態の差引き**の条件の下で得られました。切替時間が有限の検出器では[QCURV8の切替による補正](../QCURV8/index.md#prop-qcurv8-switching)が残ります。

## 5. 観測結果から何を言えるか――判定の手順

例として「温度 $T=\kappa/(2\pi)$ が観測された」という主張を見たら、次の順に問います。

1. **何を測ったか**：正周波数分解の粒子数か、検出器の励起と脱励起の比か、局所応力テンソルか、遠方エネルギー光度か。
2. **どの時計か**：共形時間、加速観測者の固有時間、静的Killing時間、無限遠のretarded時刻のどれか。
3. **どの状態か**：in、Minkowski、Bunch–Davies、Unruh、Hartle–Hawkingなど、背景だけでなく状態を固定したか。
4. **どの極限か**：定常・長時間、後期波束、幾何光学、断熱・半古典近似の境界は何か。
5. **何を結論できないか**：熱的な率の比は遠方光度を、粒子数はKMS性を、半古典的光度は蒸発終期を、それぞれ単独では証明しない。[QCURV17の質量収支](../QCURV17/index.md#thm-qcurv17-mass-cubic-law)にも準静的条件が残ります。

## 6. 演習――同じ指数を異なる観測量へ結び直す

### Level A：設定・時計・規格化を確かめる

<a id="ex-qcurv20-a01"></a>
#### QCURV20-A01 比較設定の欠けた条件
- Level: A
- 問題: 「膨張宇宙では粒子が生じる」と「真空の加速検出器は励起する」について、背景・状態・時計・観測量・極限のうち指定を要するものを列挙し、両者の量を区別せよ。

<!-- solution-start -->
**詳細解答**：前者は少なくとも $g$（スケール因子）、in状態、in/outの正周波数に用いる時間とモード、観測量 $\langle N_{\rm out}\rangle$、漸近定常性と規格化が必要です。粒子数は[モード混合](../QCURV3/index.md#prop-qcurv3-number)の $|\beta|^2$ です。後者はMinkowski背景、Minkowski真空、一様加速の固有時間、ギャップを持つ検出器、定常・長時間極限が必要です。観測量は[検出率](../QCURV6/index.md#def-qcurv6-stationary-rate)です。前者は選択したoutモードの数、後者は検出器の遷移率であり、両者の数値を直接等置しません。
<!-- solution-end -->

<a id="ex-qcurv20-a02"></a>
#### QCURV20-A02 固有時間で測る温度
- Level: A
- 問題: 静的世界線で $d\tau=(3/5)dT$ とする。$T$ 時計での熱的な率の比が $R_T(E)/R_T(-E)=e^{-10E}$ なら、固有時の逆温度と $R_\tau(\Omega)/R_\tau(-\Omega)$ を求めよ。

<!-- solution-start -->
**詳細解答**：$\lambda=3/5$、$\beta_T=10$ です。[時計換算命題](#prop-qcurv20-clock-rescaling)により $\beta_\tau=\lambda\beta_T=6$。さらに $R_\tau(\Omega)=\frac35R_T(3\Omega/5)$、負ギャップも同様なので、比は $e^{-6\Omega}$（$\Omega>0$）。$T_\tau=1/6$ は $T_T=1/10$ より高くなります。
<!-- solution-end -->

<a id="ex-qcurv20-a03"></a>
#### QCURV20-A03 急変振動子の数を検算する
- Level: A
- 問題: $\omega_f=3\omega_i$ の急変模型で $\alpha,\beta$ と $\langle N_{\rm out}\rangle$ を求め、正準条件を確かめよ。

<!-- solution-start -->
**詳細解答**：$\alpha=(\sqrt3+1/\sqrt3)/2=2/\sqrt3$、$\beta=(\sqrt3-1/\sqrt3)/2=1/\sqrt3$ です。よって $|\alpha|^2-|\beta|^2=4/3-1/3=1$、$\langle N_{\rm out}\rangle=1/3$。[急変振動子命題](#prop-qcurv20-quench-not-thermal)で $\omega_i,\omega_f>0$ と境界での連続性を使っています。$1/3$ だけから温度は決められません。
<!-- solution-end -->

<a id="ex-qcurv20-a04"></a>
#### QCURV20-A04 二つの温度の一致条件
- Level: A
- 問題: Rindler検出器の温度 $a/(2\pi)$ とde Sitter中心検出器の温度 $H/(2\pi)$ が等しい条件を求めよ。そのとき背景時空が同一とは限らない理由を一つ挙げよ。

<!-- solution-start -->
**詳細解答**：$a,H>0$ で $a/(2\pi)=H/(2\pi)$ より $a=H$。両者の引戻し二点関数は[一致命題](#prop-qcurv20-detector-degeneracy)の $W_q$ になります。しかしMinkowskiの曲率は零で、de SitterのRicciスカラーは[QCURV19の背景定義](../QCURV19/index.md#def-qcurv19-de-sitter-flat)より $12H^2>0$。検出率の一致は曲率の一致を意味しません。
<!-- solution-end -->

<a id="ex-qcurv20-a05"></a>
#### QCURV20-A05 Schwarzianの符号
- Level: A
- 問題: $p(u)=v_H-2e^{-3u}$ のSchwarzian $\{p,u\}$ と、右向き $c=1$ の流束 $-\{p,u\}/(24\pi)$ を求めよ。

<!-- solution-start -->
**詳細解答**：$p'=6e^{-3u}>0$、$p''=-18e^{-3u}$、$p'''=54e^{-3u}$ なので $p'''/p'=9$、$p''/p'=-3$。従って $\{p,u\}=9-(3/2)9=-9/2$ です。流束は $-(-9/2)/(24\pi)=9/(48\pi)=3/(16\pi)>0$。$2$ は振幅であり、比で相殺します。
<!-- solution-end -->

### Level B：同じ数値から異なる結論が出ることを調べる

<a id="ex-qcurv20-b01"></a>
#### QCURV20-B01 占有数から温度を推測する落とし穴
- Level: B
- 問題: ある急変振動子で $\omega_f=2\omega_i$、$\langle N_{\rm out}\rangle=1/8$ であった。Bose占有数の式に当てはめた形式的逆温度を求め、これでKMS性が証明されない理由をモード相関の観点から述べよ。

<!-- solution-start -->
**詳細解答**：占有数だけをBose因子に当てはめると

$$
\frac1{e^{\beta_{\rm fit}\omega_f}-1}=\frac18
\quad\Longrightarrow\quad
e^{\beta_{\rm fit}\omega_f}=9
\quad\Longrightarrow\quad
\beta_{\rm fit}=\frac{\log9}{\omega_f}.
$$

ただし $\beta_{\rm fit}$ は当てはめた逆温度であって、Bogoliubov係数 $\beta$ ではありません。初期真空と終期モードは[正負周波数混合](../QCURV3/index.md#def-qcurv3-bogoliubov)で繋がります。実係数の規約を選ぶと

$$
\alpha=\frac3{2\sqrt2},\qquad
\beta=\frac1{2\sqrt2},\qquad
\langle a_{\rm out}a_{\rm out}\rangle
=\alpha\beta=\frac38\ne0.
$$

一方、終期Hamiltonianの熱状態は時間並進に不変です。ところが $a_{\rm out}(t)=e^{-i\omega_ft}a_{\rm out}$ なので、非零の対相関は $e^{-2i\omega_ft}$ 倍されて時刻とともに変化します。これが終期の定常熱状態との相違です。
<!-- solution-end -->

<a id="ex-qcurv20-b02"></a>
#### QCURV20-B02 灰色体因子を二重に数えない
- Level: B
- 問題: 一つの角運動量チャネルで透過確率 $\Gamma_\ell(\omega)=1/4$ とし、同じ $\omega$ の地平線近傍の熱占有因子を $n_H=(e^{\beta_H\omega}-1)^{-1}$ とする。遠方のそのチャネルの数流束が占有因子だけの場合の何倍になるか。局所検出器温度が $T_H/4$ になるという結論が誤りである理由も述べよ。

<!-- solution-start -->
**詳細解答**：[灰色体流束定理](../QCURV12/index.md#thm-qcurv12-greybody-flux)で該当チャネルの流束は $(2\ell+1)n_H\Gamma_\ell/(2\pi)$。障壁を通さない参照値 $(2\ell+1)n_H/(2\pi)$ で割れば $\Gamma_\ell=1/4$ です。$\Gamma_\ell$ は散乱の確率係数であり、指数の $\beta_H\omega$ を $4\beta_H\omega$ へ変える操作ではありません。温度は周波数依存の透過率によって一律に4分の1にはならず、まして局所時計のTolman因子とは独立です。
<!-- solution-end -->

<a id="ex-qcurv20-b03"></a>
#### QCURV20-B03 二次元の流束係数を二経路で照合する
- Level: B
- 問題: $p(u)=v_H-Ae^{-2u/L}$（$A,L>0$、$u$ は長さ次元）について、(i) Schwarzianから、(ii) $\beta_H=\pi L$ と熱的積分から、片方向の流束を求めて一致を確かめよ。

<!-- solution-start -->
**詳細解答**：$\kappa=2/L$ なので [二次元命題](#prop-qcurv20-two-dimensional-moment) のSchwarzianは $-\kappa^2/2=-2/L^2$、流束は $\kappa^2/(48\pi)=4/(48\pi L^2)=1/(12\pi L^2)$。別経路では

$$
\frac1{2\pi}\int_0^\infty\frac{\omega\,d\omega}{e^{\pi L\omega}-1}
=\frac{\pi}{12(\pi L)^2}
=\frac1{12\pi L^2}.
$$

単位は $L^{-2}$ です。これは $c=1$ の片方向成分であり、四次元の全光度ではありません。
<!-- solution-end -->

<a id="ex-qcurv20-b04"></a>
#### QCURV20-B04 熱的検出と遠方光度を切り分ける
- Level: B
- 問題: (a) Minkowski真空の等加速度軌道、(b) de SitterのBunch–Davies状態の中心静止軌道、(c) 崩壊Schwarzschildの後期無限遠波束について、何が熱的で、どの追加条件なしに遠方放射光度を推論できないか説明せよ。

<!-- solution-start -->
**詳細解答**：(a) は[Unruhの熱的励起・脱励起比](../QCURV8/index.md#thm-qcurv8-unruh)が固有時間で成立しますが、状態はMinkowski真空で $\langle T_{ab}\rangle_{\rm ren}=0$、放射光度を意味しません。(b) は[de Sitter中心のGibbons–Hawking温度](../QCURV19/index.md#thm-qcurv19-gh-detector)を検出器が読みますが、Schwarzschildのような漸近平坦な無限遠の流束は定義していません。(c) は[後期Hawking波束](../QCURV11/index.md#prop-qcurv11-late-packet-planck)の熱因子に加えて、四次元外部の[散乱透過率](../QCURV12/index.md#thm-qcurv12-greybody-flux)と遠方時刻規格化が必要です。三例を熱平衡の同一現象とするのは観測量と境界条件を取り違えています。
<!-- solution-end -->

### Level C：温度・粒子・流束の横断診断

<a id="ex-qcurv20-c01"></a>
#### QCURV20-C01 三つの観測実験を比較する
- Level: C
- 問題: (1) $\omega_i=\omega,\omega_f=2\omega$ の急変振動子、(2) $a=H=q>0$ のMinkowski加速検出器とde Sitter中心検出器、(3) $1+1$ 次元の光線写像 $p(u)=v_H-Ae^{-\kappa u}$ と、表面重力を同じ $\kappa>0$ とした四次元Schwarzschildの後期放射を比較する。(i) (1)のout粒子数、(ii) (2)の正ギャップ $\Omega$ での定常励起率と励起/脱励起比、(iii) (3)の二次元片方向流束と四次元遠方流束の違いを計算・記述し、最後にそれぞれの結果だけでは結論できないことを一つずつ挙げよ。

<!-- solution-start -->
**詳細解答**：

(i) [急変振動子の式](#prop-qcurv20-quench-not-thermal)へ $\omega_f=2\omega_i$ を代入すると

$$
|\beta|^2=\frac{(2\omega-\omega)^2}{4(2\omega)\omega}=\frac18.
$$

初期真空でout粒子が存在しますが、終期の時間並進に関するKMS性を証明しません。

(ii) 二つの引戻し二点関数はともに $W_q$ なので [検出率一致命題](#prop-qcurv20-detector-degeneracy)より

$$
\dot{\mathcal F}(\Omega)=\frac{\Omega}{2\pi(e^{2\pi\Omega/q}-1)},
\qquad
\frac{\dot{\mathcal F}(\Omega)}{\dot{\mathcal F}(-\Omega)}
=e^{-2\pi\Omega/q}.
$$

$\Omega>0$ であり、定常・長時間極限を取っています。この一致は二つの曲率や遠方流束が一致することを証明しません。

(iii) 二次元では $p'=A\kappa e^{-\kappa u}$、$p''/p'=-\kappa$、$p'''/p'=\kappa^2$ です。従って $\{p,u\}=-\kappa^2/2$。右向き $c=1$ の状態依存流束は

$$
\langle T_{uu}\rangle=-\frac{\{p,u\}}{24\pi}
=\frac{\kappa^2}{48\pi}.
$$

四次元の数流束は、無限遠の周波数 $\omega>0$ について

$$
\frac{d^2N}{dt\,d\omega}
=\frac1{2\pi}\sum_{\ell\ge0}(2\ell+1)
\frac{\Gamma_\ell(\omega)}{e^{\omega/T_H}-1},
\qquad T_H=\frac\kappa{2\pi}
$$

（固定Schwarzschild背景の後期近似）で、全光度にはさらに $\omega$ 倍して周波数積分が必要です。二次元の係数だけでは $\Gamma_\ell(\omega)$ や四次元の光度は決まりません。さらに[準静的質量収支](../QCURV17/index.md#thm-qcurv17-mass-cubic-law)を延長して蒸発終期を確定することもできません。
<!-- solution-end -->

## 7. 次の総合再導出へ

同じPlanck型の指数を見ても、**どの場の状態を、どの時間で、どの観測量へ作用させたか**を最初に確かめる必要があります。本章で明示的に計算したのは、(1)定常検出率の一致と時計換算、(2)非熱的な粒子生成、(3)二次元流束の二経路一致です。四次元Hawking光度には散乱、半古典的な蒸発時間には重力の逆作用がさらに必要です。次はこれらを一つの仮定付き説明へ組み合わせ、ブラックホール熱力学と情報問題へ何を引き渡せるかを整理します。
