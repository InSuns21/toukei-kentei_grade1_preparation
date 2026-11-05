# QCURV21 Hawking放射を再導出する――温度・流束・蒸発から次の問いへ

<!-- definition-example-audit: strict -->

これまでに、崩壊時空の光線追跡、後期出射波束の熱因子、Schwarzschildの散乱、量子状態の正則性、半古典的な質量変化をそれぞれ計算しました。では、それらをつないで「ブラックホールは蒸発する」という一文をどこまで**数式で支持できる**でしょうか。

大切なのは、結論へ進むたびに別の仮定が必要になることです。後期の粒子数が熱的でも、無限遠の光度には散乱が入り、光度から質量変化を得るにはエネルギー収支が要ります。さらに温度や光度を知るだけでは、熱力学的エントロピーも蒸発終期の量子情報も確定しません。本章では一つの具体模型を通して、**何が計算で決まり、何が別の問いとして残るか**を再導出します。

舞台は四次元、計量符号 $(-,+,+,+)$、自然単位 $G=\hbar=c=k_B=1$ とします。初期の重力崩壊で形成される非回転・非荷電のブラックホールを考え、質量零の自由実スカラー場を初期のin真空に置きます。未来零無限遠の出射時刻 $u$ は静止した遠方観測者の時間で規格化し、入射光線のラベルを過去零無限遠のadvanced時刻 $v$ とします。半古典的な逆作用を扱う後半では、質量 $M(u)>0$ がゆっくり変わるという追加近似を明示します。**初めから全時刻に静的Schwarzschild計量を仮定するわけではありません。**

## 1. 一つの導出に何を入力するか

[QCURV20の比較設定](../QCURV20/index.md#def-qcurv20-comparison-setting)は、背景・状態・観測量・時計・近似を固定しない比較の危険を示しました。今回は同じ考えを、単一の計算を順に進めるために使います。

最初の入力は次の五点です。

1. **幾何**：十分遅い出射光線に、地平線形成に由来する指数的な入出射写像がある。
2. **初期in真空**：過去の入射正周波数について真空を選ぶ。後期の観測はその量子状態から評価する。
3. **時計**：周波数 $\omega>0$ は遠方の $u$ に共役であり、局所静止時計の周波数と混同しない。
4. **場と境界**：質量零の自由スカラー場で、外からの熱的入射を無視し、散乱は各角運動量チャネルで定常近似する。
5. **射程**：幾何光学・後期波束・固定背景から始め、質量の時間発展はその後に準静的に加える。

ここで後に使う記号を先に定めます。$M>0$ は幾何単位の質量、$\kappa=1/(4M)>0$ は遠方で規格化した表面重力、$T_H=\kappa/(2\pi)$ は温度パラメータ、$\Gamma_\ell(\omega;M)$ は角運動量 $\ell=0,1,\dots$ の散乱透過確率です。$\Gamma_\ell$ は $0\le\Gamma_\ell\le1$ を満たします。記号 $L(M)$ は未来零無限遠で測る外向きのエネルギー/時間（光度）を表し、$\dot M=dM/du$ は質量変化率です。

<a id="def-qcurv21-derivation-contract"></a>

<!-- formal-statement-start -->
> **定義（Hawking放射の再導出設定）**
> 四次元の漸近平坦な非回転・非荷電の重力崩壊を考え、質量零の自由実スカラー場を初期in真空に置く。後期の未来零無限遠において、$u$ に共役な周波数 $\omega>0$ の狭帯域出射波束、角運動量 $\ell\ge0$ の透過確率 $\Gamma_\ell(\omega;M)$、無限遠での外向き光度 $L(M)$ を順に評価する。背景を質量 $M>0$ のSchwarzschild外部で凍結して散乱を評価することを**固定質量近似**、さらに $M=M(u)>0$ をゆっくり変化させてその時刻の散乱を使うことを**準静的近似**とする。この二つを同一の厳密解とみなさない。
<!-- formal-statement-end -->

<!-- definition-example-start: def-qcurv21-derivation-contract -->
### 直接例：$M=2$ の凍結した背景

$M=2$ に固定すると、[Schwarzschild表面重力の規格化](../QCURV9/index.md#prop-qcurv9-kappa)から $\kappa=1/8$、$T_H=1/(16\pi)$ です。[出射波束の構成](../QCURV10/index.md#def-qcurv10-asymptotic-packets)に沿って、次を選びます。

$$
\omega=T_H\log3>0,\qquad 0<\epsilon\ll\omega.
$$

この中心周波数・幅の正規化波束について、後期の[Planck極限](../QCURV11/index.md#prop-qcurv11-late-packet-planck)を適用できるほど到着時刻を遅く取ります。先頭次数の平均占有数は $1/(3-1)=1/2$ です。仮に一つのチャネルに透過確率 $\Gamma_0=1/4$ を与えれば、その遠方到達成分の平均占有数は先頭次数で $1/8$ になります。

**定義の確認**：四次元・自由スカラー・in状態・遠方時計・$M>0$・波束の後期条件を固定し、透過確率の範囲も確かめました。この $1/8$ は**一波束・一チャネルの数**であり、時間あたりの全光度ではありません。透過率の数値 $1/4$ は説明用で、実際の散乱問題の解ではありません。
<!-- definition-example-end -->

## 2. 光線の指数圧縮から温度まで

[崩壊時空の入出射光線写像](../QCURV10/index.md#def-qcurv10-ray-map)では、過去の入射ラベル $v$ と未来へ届く出射ラベル $u$ を一本の光線で結びました。[遅い時刻の指数関係](../QCURV10/index.md#thm-qcurv10-late-exponential)によれば、地平線形成と滑らかな接続の条件の下で、正の定数 $A$ と最後に脱出する入射ラベル $v_H$ を使い、十分遅い $u$ に

$$
v=p(u)=v_H-Ae^{-\kappa u}+o(e^{-\kappa u}),
\qquad A>0,\quad\kappa>0
$$

という漸近形が生じます。ここでプライムは出射時刻 $u$ による導関数 $p'(u)=dp/du$ です（[QCURV10の導関数の記法](../QCURV10/index.md#def-qcurv10-ray-map)）。単に $o(e^{-\kappa u})$ を含む式を微分してよいわけではありません。たとえば[QCURV10の薄殻模型の厳密な光線写像](../QCURV10/index.md#thm-qcurv10-shell-tracing)では、$\delta=v_H-p(u)>0$ とすると

$$
\frac{du}{dv_{\rm in}}=1+\frac{4M}{\delta},\qquad
p'(u)=\left(1+\frac{4M}{\delta}\right)^{-1}
=\frac{\delta}{4M+\delta}
\simeq A\kappa e^{-\kappa u}>0.
$$

最後の近似には $\delta\simeq Ae^{-\kappa u}$ と $\kappa=1/(4M)$ を使いました。一般の滑らかな崩壊模型で同じ導関数の近似を使うなら、剰余の導関数も主項より小さいという条件を別途確かめます。$p'(u)$ は光線の到着時間の圧縮を表し、指数式を全時刻の厳密な光線写像とみなすものではありません。

入射正周波数 $e^{-i\omega'v}$（$\omega'>0$）をこの光線に沿って出射時刻 $u$ の関数として書くと、$e^{-i\omega'p(u)}$ です。これを $e^{-i\omega u}$ と $e^{+i\omega u}$ の成分へFourier分解するため、[QCURV11のFourier–Bogoliubov係数](../QCURV11/index.md#def-qcurv11-fourier-coefficients)を使用します。係数の位相・正規化は同章に合わせます。

<a id="prop-qcurv21-hawking-chain"></a>

<!-- formal-statement-start -->
> **命題（後期光線写像から波束の熱因子への接続）**
> 四次元漸近平坦な崩壊時空で質量零の自由スカラー場をin真空に置き、幾何光学近似の後期出射光線を $p(u)=v_H-Ae^{-\kappa u}$（$A,\kappa>0$）とする。$\omega,\omega'>0$ に対し、同じ規格化で定義したBogoliubov係数 $\alpha_{\omega\omega'}$ と $\beta_{\omega\omega'}$ は

$$
\frac{|\beta_{\omega\omega'}|^2}{|\alpha_{\omega\omega'}|^2}
=e^{-2\pi\omega/\kappa}
$$

> を満たす。さらに、遅い時刻に局在し周波数幅が十分狭い正規化out波束を取り、[後期波束のPlanck極限](../QCURV11/index.md#prop-qcurv11-late-packet-planck)の仮定が成り立つとき、入射散乱前の占有数は先頭次数で

$$
n_H(\omega)=\frac1{e^{\omega/T_H}-1},\qquad
T_H=\frac{\kappa}{2\pi}
$$

> となる。最初の係数比だけから、連続モード一個の有限粒子数、全時刻のKMS平衡、無限遠の完全黒体光度は従わない。
<!-- formal-statement-end -->

### 証明の見取り図

指数変数 $z=A\omega'e^{-\kappa u}$ を使ったFourier積分で、正負振動数への解析接続が異なる因子 $e^{\pm\pi\omega/(2\kappa)}$ を生みます。その絶対値比が熱因子です。占有数へ進むには正準規格化と**波束化**が別に必要です。

<!-- proof-start -->
### 証明

[指数光線写像のGamma型振幅](../QCURV11/index.md#thm-qcurv11-gamma-amplitudes)を利用します。$a=\omega/\kappa>0$ と置くと、指数写像を入力した二つの係数では、共通する正の規格化因子、$\Gamma(ia)$、および絶対値1の位相因子を除いた部分がそれぞれ $e^{\pi a/2}$ と $e^{-\pi a/2}$ です。従って

$$
\frac{|\beta_{\omega\omega'}|^2}{|\alpha_{\omega\omega'}|^2}
=\frac{e^{-\pi a}}{e^{\pi a}}
=e^{-2\pi a}.
$$

この段階では $\omega'$ にわたる積分を実行していません。[熱因子と係数の定理](../QCURV11/index.md#thm-qcurv11-thermal-ratio)の規格化では

$$
|\beta_{\omega\omega'}|^2
=\frac1{2\pi\kappa\omega'}\frac1{e^{2\pi\omega/\kappa}-1}.
$$

これを正規化しない連続outモードで $\int_0^\infty d\omega'$ としてしまうと $d\omega'/\omega'$ の発散が現れ、一個の検出粒子数とは読めません。[出射波束の定義](../QCURV10/index.md#def-qcurv10-asymptotic-packets)では有限周波数帯を重ね、さらに到着時刻ごとの振動位相を付けます。そのとき[QCURV11の後期波束計算](../QCURV11/index.md#prop-qcurv11-late-packet-planck)が、狭帯域・後期・適切な規格化の条件で

$$
n_H(\omega)=(e^{2\pi\omega/\kappa}-1)^{-1}
$$

を与えます。$\omega/T_H=2\pi\omega/\kappa$ と比較して $T_H=\kappa/(2\pi)$ です。波束の帯域が広い場合は右辺を帯域平均し、近似の誤差も残ります。
<!-- proof-end -->

Schwarzschildの場合、[遠方規格化の表面重力](../QCURV9/index.md#prop-qcurv9-kappa)を代入すると

$$
\kappa=\frac1{4M},\qquad
T_H=\frac1{8\pi M}.
$$

$M$ を倍にすると温度は半分になります。ただしこれは**無限遠時刻に対する温度**です。地平線近傍で静止した観測者の局所温度は [Tolman則](../QCURV14/index.md#thm-qcurv14-tolman) の赤方偏移因子を要します。一方、自由落下する観測者の局所測定まで「無限大の熱的励起を受ける」とみなせるわけではありません。

## 3. 熱因子を遠方エネルギー流へ変換する

後期の $n_H(\omega)$ は、障壁を通過する前のモード占有数です。実際のSchwarzschild外部では角運動量 $\ell$ ごとに[動径ポテンシャル](../QCURV12/index.md#def-qcurv12-regge-wheeler-potential)があり、入射流束の一部が反射します。[流束保存と相反性](../QCURV12/index.md#thm-qcurv12-flux-unitarity)によって、透過確率は $0\le\Gamma_\ell\le1$ です。

さらに球面調和関数の方位番号は $m=-\ell,\ldots,\ell$ の $2\ell+1$ 個あり、球対称性によって同じ $\Gamma_\ell$ を持ちます。

状態密度の係数を確かめるため、遠方時刻 $u$ の長さ $\Delta u$ の窓で一時的に周期境界条件を課すと、角周波数の間隔は $\Delta\omega=2\pi/\Delta u$ です。したがって正周波数帯 $d\omega$ の一チャネルのモード数と単位時間あたりの密度はそれぞれ

$$
\frac{\Delta u\,d\omega}{2\pi},\qquad
\frac{d\omega}{2\pi}
$$

です。時間窓を外す極限は後期・定常波束の近似の範囲で考えます。これら三つ（占有数・透過率・状態密度）を掛けます。

<a id="thm-qcurv21-flux-chain"></a>

<!-- formal-statement-start -->
> **定理（後期Schwarzschild光度の条件付き接続）**
> 四次元の非回転・非荷電の崩壊ブラックホールで、質量零・自由実スカラー一種類を初期in真空に置く。遅い時刻の波束占有数が $n_H(\omega)=(e^{8\pi M\omega}-1)^{-1}$、外部が質量 $M>0$ のSchwarzschild散乱で近似でき、外からの入射粒子を無視できるとする。$\omega>0$ は遠方時刻での角周波数、$\Gamma_\ell(\omega;M)\in[0,1]$ は角運動量 $\ell\ge0$ の透過確率で、以下の和・積分が有限とする。このとき未来零無限遠への正味の粒子数率と光度は、後期・定常近似でそれぞれ

$$
\frac{d^2N}{du\,d\omega}
=\frac1{2\pi}\sum_{\ell=0}^\infty(2\ell+1)
\frac{\Gamma_\ell(\omega;M)}{e^{8\pi M\omega}-1},
$$

$$
L(M)=\frac1{2\pi}\sum_{\ell=0}^\infty(2\ell+1)
\int_0^\infty\frac{\omega\,\Gamma_\ell(\omega;M)}{e^{8\pi M\omega}-1}\,d\omega.
$$

> $L(M)\ge0$ である。熱因子だけから $\Gamma_\ell=1$ と置いてよいわけではない。
<!-- formal-statement-end -->

### 証明の見取り図

一つの波束の平均個数に散乱透過確率を掛け、$m$ の縮退を数え、単位時間・単位周波数へ直します。光度では各粒子の無限遠エネルギー $\omega$ をさらに掛けて積分します。

<!-- proof-start -->
### 証明

[後期波束のPlanck占有数](../QCURV11/index.md#prop-qcurv11-late-packet-planck)を $n_H$ とします。[灰色体因子の定義](../QCURV12/index.md#def-qcurv12-greybody-factor)では、入射した単位流束に対する透過した流束の比が $\Gamma_\ell$ です。

線形の散乱により、外向きへ到達する平均個数は $\Gamma_\ell n_H$ になります。角運動量 $\ell$ を固定すると $2\ell+1$ 個の $m$ 値が同じ係数を持ちます。帯域 $d\omega$・時間 $du$ の平均到達個数は

$$
dN=\sum_{\ell\ge0}(2\ell+1)\,
\Gamma_\ell(\omega;M)n_H(\omega)
\frac{du\,d\omega}{2\pi}.
$$

これを $du\,d\omega$ で割って第一式を得ます。出射粒子一個の遠方Killingエネルギーは $\omega$ ですから、$dE=\omega\,dN$ を $\omega>0$ について足すと第二式になります。各項は非負であり、収束を仮定した和・積分から $L(M)\ge0$ です。これは[QCURV12の灰色体流束定理](../QCURV12/index.md#thm-qcurv12-greybody-flux)を、後期波束から数え直したものです。
<!-- proof-end -->

### 直接計算：透過率を1とした人工チャネル

比較用に $\Gamma_0=1$、$\Gamma_\ell=0$（$\ell\ge1$）とする**人工的な**一チャネル模型を選ぶと

$$
\begin{aligned}
L_{\rm toy}(M)
&=\frac1{2\pi}\int_0^\infty
\frac{\omega}{e^{8\pi M\omega}-1}\,d\omega\\
&=\frac1{2\pi(8\pi M)^2}\int_0^\infty\frac{x}{e^x-1}\,dx
=\frac1{768\pi M^2}.
\end{aligned}
$$

最後の積分は $1/(e^x-1)=\sum_{n\ge1}e^{-nx}$（$x>0$）、非負項の和と積分の交換、$\int_0^\infty xe^{-nx}dx=n^{-2}$、$\sum_{n\ge1}n^{-2}=\pi^2/6$ から得ます。[QCURV16の二次元共形流束](../QCURV16/index.md#thm-qcurv16-hawking-flux)と係数は一致しますが、**実際の四次元スカラー散乱**では[低周波のs波透過率](../QCURV12/index.md#prop-qcurv12-swave-low-frequency)が零へ向かいます。この一致は四次元の灰色体計算の代用ではありません。

## 4. 状態と地平線を指定して初めて「蒸発する」と言える

ここまで使ったin真空と崩壊の後期近似を、永遠のSchwarzschild時空で比較するなら、[Boulware・Unruh・Hartle–Hawking三状態の定義](../QCURV13/index.md#def-qcurv13-three-states)が役立ちます。地平線で正則とは「二点分布の特異性が消える」ことではなく、[Hadamard特異部を除いた余りが滑らかな座標で正則](../QCURV13/index.md#def-qcurv13-horizon-regularity)という条件です。

| 比較する定常状態 | 右外部への入射 | 右外部からの出射 | 地平線との関係 |
| --- | --- | --- | --- |
| Boulware | 真空 | 真空 | 外部Killing時間の真空だが地平線横断で一般に非正則 |
| Unruh | 真空 | 熱的なup成分 | 未来地平線で正則な、崩壊の後期像 |
| Hartle–Hawking | 熱的 | 熱的 | 未来・過去両地平線で正則な熱平衡 |

上表は、各状態について**外部チャネルの占有数だけで全二点関数が定義される**と主張するものではありません。状態の正則性と境界条件を含めた比較は[QCURV13の流束と正則性の命題](../QCURV13/index.md#thm-qcurv13-state-flux)に戻って確認できます。

たとえば同じ $T_H$ でも、Unruh状態は外部から熱的な粒子が流入せず、遠方の正味出射エネルギーが正です。一方、Hartle–Hawking状態は左右ではなく**入射と出射**の熱的成分が釣り合い、平衡外部で正味の遠方流束は零です。従って温度の数字だけから質量が減少するかは決まりません。[Killing光度の定義](../QCURV15/index.md#def-qcurv15-killing-luminosity)の外向き符号と入射境界をともに見なければならないのです。

また、二点分布から構成する[くりこまれた局所観測量の状態差](../QCURV15/index.md#def-qcurv15-observable-difference)は無限遠の粒子数と別の量です。未来地平線を横断する観測者が正則な状態に遭遇することと、遠方で粒子流が観測されることは両立します。地平線へ入る量子応力の負エネルギー成分は、半古典的な収支を考えるときの鍵ですが、遠方光度を一つ測っただけで局所応力テンソルの全成分が一意に決まるわけではありません。

## 5. 光度から質量へ：準静的近似の有効区間

固定背景で計算した $L(M)$ は、そのまま時変時空の厳密な解ではありません。[半古典Einstein方程式](../QCURV17/index.md#def-qcurv17-semiclassical-equation)では、くりこまれた量子応力が幾何にも影響し、計量の時間発展は初期値・境界条件と整合させなければなりません。

ここでは、十分大きい孤立系の質量 $M(u)$ に対して、無限遠の質量と瞬間Schwarzschild質量を準静的な精度で同一視し、他の放射・入射・重力波による収支を無視して $\dot M=-L(M)$ と仮定します。質量零スカラーには散乱で決まる無次元係数 $C_s>0$ があり、[質量零スカラーの準静的光度の逆二乗則](../QCURV17/index.md#thm-qcurv17-luminosity-scaling)から $L(M)=C_s/M^2$ です。$C_s$ は物質場や透過率に依存し、前節の人工的な $1/(768\pi)$ を実際の値として使いません。

<a id="prop-qcurv21-validity-window"></a>

<!-- formal-statement-start -->
> **命題（準静的質量減少の検証可能な区間）**
> 幾何単位 $G=1$ で、$M(u_0)=M_0>0$、$C_s>0$、$M(u)>0$ が微分可能かつ $\dot M=-C_s/M^2$ を区間 $[u_0,u_1)$ で満たすと仮定する。質量の下限 $M_*>0$ を選び、$M_0>M_*$ とする。$u\in[u_0,u_1)$ かつ $M(u)\ge M_*$ の範囲では

$$
M(u)^3=M_0^3-3C_s(u-u_0),\qquad
0\le u-u_0\le\frac{M_0^3-M_*^3}{3C_s}
$$

> となる。上限時刻まで解が存在することは別途必要であり、この式だけから $u_1$ 以降への延長は主張しない。さらに $M_*\gg1$ かつ $C_s/M_*^2\ll1$ とすれば、上記の範囲で曲率が小さく、[断熱質量変化の指標](../QCURV17/index.md#def-qcurv17-adiabatic-parameter)が小さいという二つの必要な目安を保てる。ただしこれだけで時変量子状態の正則性や高次補正の制御を保証しない。
<!-- formal-statement-end -->

### 証明の見取り図

$\dot M$ は負なので質量は単調減少します。$M^2$ を掛けて $M^3$ の微分にし、下限までの時間を計算します。断熱指標は最小質量で最大になります。

<!-- proof-start -->
### 証明

$M(u)>0$ より $M^2$ を掛けられ、連鎖律を使うと

$$
\frac{d}{du}M(u)^3=3M(u)^2\dot M(u)
=3M(u)^2\left(-\frac{C_s}{M(u)^2}\right)
=-3C_s.
$$

$u_0$ から $u$ まで積分して $M(u)^3=M_0^3-3C_s(u-u_0)$ です。$C_s>0$ で減少するので $M(u)\ge M_*$ は $M(u)^3\ge M_*^3$ と同値、これを上式へ代入して

$$
M_0^3-3C_s(u-u_0)\ge M_*^3
\quad\Longleftrightarrow\quad
u-u_0\le\frac{M_0^3-M_*^3}{3C_s}.
$$

[QCURV17の断熱指標](../QCURV17/index.md#def-qcurv17-adiabatic-parameter)は $G=1$ のもとで $\varepsilon_{\rm ad}=|\dot M|=C_s/M^2$ です。$M\ge M_*$ なら $0<\varepsilon_{\rm ad}\le C_s/M_*^2$。Schwarzschildの代表的曲率半径は $M$ の次数なので、$M_*\gg1$ はPlanck長より大きい長さという目安になります。しかし係数の高次補正や初期量子状態の時間発展の評価までは、この不等式から出ません。
<!-- proof-end -->

### 直接例：いつ計算を止めるべきか

数値は説明用として $M_0=100$、$M_*=10$、$C_s=10^{-3}$ を仮定します。$M_0>M_*>0$、$C_s>0$ を満たし、初期指標は $10^{-7}$、最終の指標上界は $10^{-5}$。$M^3$ が $10^6$ から $10^3$ へ減る時間は

$$
u_*-u_0=\frac{10^6-10^3}{3\times10^{-3}}
=333000000.
$$

微分方程式の仮定がこの時刻まで成立し、解が存在する場合、ここまでが指定した質量下限を点検できる区間です。仮定した時間区間が先に終わるなら、そこで計算も止めます。質量を形式的に零まで進めた $u_0+M_0^3/(3C_s)$ は[準静的三乗則](../QCURV17/index.md#thm-qcurv17-mass-cubic-law)をその適用範囲の外へ延長した値であり、量子重力的な蒸発終期の予言ではありません。また、[遡及周波数の閾値](../QCURV18/index.md#prop-qcurv18-backtrace-threshold)で見た短距離物理への感度は、ここで求めた小さい $\varepsilon_{\rm ad}$ だけで消えるわけではありません。

## 6. 熱力学へ渡せる式、まだ証明していない式

温度 $T_H=1/(8\pi M)$ と質量の変化をつなぐと、熱力学の形に似た等式を作れます。しかし温度パラメータと遠方流束があることは、ブラックホールの平衡エントロピーが**どの微視的自由度を数えるか**を証明したことではありません。

まず純粋に数式として、質量 $M>0$ の関数 $S_*(M)$ を、定数を除いて $dS_*/dM=1/T_H(M)$ と定めます。これは熱力学的解釈をまだ入れず、温度の逆数を積分して作る候補です。

<a id="prop-qcurv21-entropy-integrating-factor"></a>

<!-- formal-statement-start -->
> **命題（Schwarzschild温度の積分から得られる候補関数）**
> 幾何単位 $G=\hbar=c=k_B=1$、$M>0$ とし、無限遠規格化の温度 $T_H(M)=1/(8\pi M)$ を与える。微分可能な関数 $S_*(M)$ が $dS_*/dM=1/T_H(M)$ を満たすなら、定数 $S_0$ が存在して

$$
S_*(M)=4\pi M^2+S_0,\qquad dM=T_H\,dS_*.
$$

> これは与えた温度を積分した数学的結論であり、$S_*$ の物理的エントロピーとしての同定、第一法則の一般形、蒸発中の可逆性、情報の行方を単独では証明しない。
<!-- formal-statement-end -->

### 証明の見取り図

温度の逆数を $M$ で積分して微分で戻します。面積との一致は、幾何計算による別の照合です。

<!-- proof-start -->
### 証明

$M>0$ で $T_H>0$ なので

$$
\frac{dS_*}{dM}=\frac1{T_H(M)}=8\pi M.
$$

右辺を $M$ について積分すると $S_*(M)=4\pi M^2+S_0$ です。微分すれば $dS_*=8\pi M\,dM$、従って $T_HdS_*=(1/(8\pi M))(8\pi M\,dM)=dM$。瞬間Schwarzschild半径 $r_s=2M$ から面積 $A=4\pi r_s^2=16\pi M^2$ を計算すると、$S_*-S_0=A/4$ と形式上一致します。これは幾何と温度の係数照合であって、エントロピーの統計的意味の導出ではありません。
<!-- proof-end -->

**次の熱力学の問い**は、定常ブラックホールの力学法則、温度の物理的測定、エントロピー $A/4$ の同定、それらを一般の状態変化へ適用する条件です。蒸発が非平衡過程であること、放射のエントロピーや一般化第二法則を論じるには追加の入力が要ることを、以後も意識してください。

## 7. 熱的な出射成分から情報損失は導けるか

出射の平均占有数がBose–Einstein形であること、あるいは遠方から見た一部のモードの状態が熱的であることは、全場の状態が混合状態かどうかを決めません。なぜなら、**部分だけを見た結果が同じでも、全体の量子状態は異なりうる**からです。

この違いを有限次元の模型で確認します。これはブラックホールの動力学を表す模型ではなく、推論の不足を検査する小さな反例です。二つの二準位系を「外」$O$ と「内」$I$ とし、それぞれの直交基底を $|0\rangle,|1\rangle$ とします。$0<p<1$ を外側の励起状態 $|1\rangle$ の確率とします。

密度演算子とは正半定値で跡が1の演算子です。外側だけの観測量 $B_O$ を考えると、全体系の密度演算子 $\rho_{IO}$ による期待値は

$$
\operatorname{Tr}[\rho_{IO}(1_I\otimes B_O)]
$$

です。外側の密度演算子 $\rho_O$ を使って同じ期待値を $\operatorname{Tr}(\rho_OB_O)$ と書けるようにするには、内側の直交基底で和を取ります。その行列要素は

$$
\langle j|\rho_O|k\rangle
=\sum_{i=0}^1\langle i,j|\rho_{IO}|i,k\rangle,
\qquad j,k\in\{0,1\}
$$

となります。実際、$1_I=\sum_i|i\rangle_I\langle i|$ を期待値の跡に挿入して内側の添字 $i$ を和にすれば、上式が出ます。この操作を**部分跡**と呼び、内側を測定しない観測者のための行列表示になっています。

<a id="prop-qcurv21-same-marginal"></a>

<!-- formal-statement-start -->
> **命題（同じ外部状態を持つ純粋な全体と混合した全体）**
> 二つの二準位系 $I,O$ と $0<p<1$ に対して、正規化した純粋状態

$$
|\Psi\rangle=\sqrt{1-p}\,|0\rangle_I|0\rangle_O
+\sqrt p\,|1\rangle_I|1\rangle_O
$$

> の密度演算子 $\rho^{(P)}_{IO}=|\Psi\rangle\langle\Psi|$ と、混合状態

$$
\rho^{(M)}_{IO}=|0\rangle_I\langle0|\otimes
\bigl((1-p)|0\rangle_O\langle0|+p|1\rangle_O\langle1|\bigr)
$$

> は、ともに外部の部分状態

$$
\rho_O=\operatorname{diag}(1-p,p)
$$

> を持つ。しかし全体の純粋度は異なり、

$$
\operatorname{Tr}[(\rho^{(P)}_{IO})^2]=1,\qquad
\operatorname{Tr}[(\rho^{(M)}_{IO})^2]=(1-p)^2+p^2<1
$$

> である。前者は純粋、後者は混合状態である。
<!-- formal-statement-end -->

### 証明の見取り図

内側の直交基底について対角成分を足すと、純粋状態の交差項が消えます。全体の純粋度は二つの状態で異なるので、外部状態だけでは全体の純粋性は決まりません。

<!-- proof-start -->
### 証明

$|\Psi\rangle$ のノルムは $(1-p)+p=1$。$|\Psi\rangle\langle\Psi|$ は正規化ベクトルへの射影なので正半定値で跡1です。もう一方も、直交する $|00\rangle,|01\rangle$ への射影を非負の重み $1-p,p$ で足したものだから正半定値で跡1です。$|\Psi\rangle\langle\Psi|$ を展開すると対角項は $(1-p)|00\rangle\langle00|+p|11\rangle\langle11|$、交差項は $\sqrt{p(1-p)}(|00\rangle\langle11|+|11\rangle\langle00|)$ です。内側の直交性 $\langle0|1\rangle=0$ によって交差項の内側の和は零となり、外部には

$$
\rho_O^{(P)}=(1-p)|0\rangle\langle0|+p|1\rangle\langle1|
$$

が残ります。積状態 $\rho_{IO}^{(M)}$ の内側 $|0\rangle\langle0|$ は跡が1なので、外側を取り出せば同じ行列です。純粋状態の射影は $(\rho_{IO}^{(P)})^2=\rho_{IO}^{(P)}$ だからその跡は1。一方、積状態の固有値は $1-p,p$ と二つの零で、二乗の跡は $(1-p)^2+p^2=1-2p(1-p)<1$ です。
<!-- proof-end -->

たとえばエネルギー差 $E>0$ の二準位系の熱的な外部状態なら $p=e^{-\beta E}/(1+e^{-\beta E})$（逆温度 $\beta=1/T>0$）と置けます。この $\beta$ は第2節のBogoliubov係数 $\beta_{\omega\omega'}$ とは別の量です。同じ $p$ について、上記の純粋な全体と混合した全体が構成できます。**外部の熱性は、全体の情報が不可逆に失われた証拠にはならない**のです。

実際の蒸発の情報問題では、初期・最終のヒルベルト空間、地平線の内外と放射の部分系、後期相関、時空の量子重力的な終期をどう定義するかが必要です。上の二準位模型は情報回復の証明でもありません。[QCURV18の初期占有に対する応答](../QCURV18/index.md#prop-qcurv18-state-occupation)も、出射粒子数が入射状態によって変わり得ることを示していますが、全蒸発過程のユニタリ性を決定するものではありません。

## 8. 一連の主張を監査するための四つの分岐点

| 入口で得た量 | 次に必要な追加条件 | 条件を満たせば言えること | まだ言えないこと |
| --- | --- | --- | --- |
| 後期の指数光線写像 | in状態、Fourier規格化、波束・後期極限 | $T_H=\kappa/(2\pi)$ の占有数 | 永遠の熱平衡 |
| 後期の占有数 | 角運動量散乱、透過率、遠方時計、入射境界 | 灰色体付き遠方光度 $L(M)$ | 局所応力の全成分 |
| $L(M)>0$ | 孤立系の質量収支、準静的な時変背景 | 有効区間で $\dot M=-L(M)$ | 蒸発終期 |
| 温度・光度・熱的部分状態 | 熱力学法則や量子系全体の状態の追加理論 | 次の問題を正確に定式化できる | エントロピーの微視的同定・情報回復 |

前半は固定背景上の量子場の予言で、後半は半古典的な近似や熱力学の追加条件を含みます。温度の一致、粒子数の一致、エネルギー収支の一致を、それぞれ異なる論理段階として扱うことで、議論の飛躍を見つけられます。

## 9. 演習――温度から光度、質量、次の問いへ

### Level A：係数・時計・境界条件

<a id="ex-qcurv21-a01"></a>
#### QCURV21-A01 表面重力から温度
- Level: A
- 問題: 幾何単位のSchwarzschild質量 $M=4$ について、無限遠規格化の $\kappa$、$T_H$、$\beta_H=1/T_H$ を求めよ。遠方周波数 $\omega=2T_H\log2$ の後期占有数も求めよ。

<!-- solution-start -->
**詳細解答**：$M>0$ なので[表面重力の公式](../QCURV9/index.md#prop-qcurv9-kappa)を使えます。$\kappa=1/(4M)=1/16$、[温度の接続](#prop-qcurv21-hawking-chain)から $T_H=\kappa/(2\pi)=1/(32\pi)$、$\beta_H=32\pi$。$\omega=2T_H\log2>0$ なら $\beta_H\omega=2\log2=\log4$ です。よって

$$
n_H(\omega)=\frac1{e^{\beta_H\omega}-1}
=\frac1{4-1}=\frac13.
$$

これは遠方時刻の後期波束の値で、局所静止時計の値と同一視しません。
<!-- solution-end -->

<a id="ex-qcurv21-a02"></a>
#### QCURV21-A02 一つのチャネルでの透過
- Level: A
- 問題: ある正の周波数で後期の占有数が $n_H=3/5$、一つの角運動量チャネルの透過確率が $\Gamma=2/3$ とする。透過後の平均個数と反射された平均個数をそれぞれ求めよ。ここでは散乱による吸収や新しい粒子生成はないとする。

<!-- solution-start -->
**詳細解答**：[透過率の定義](../QCURV12/index.md#def-qcurv12-greybody-factor)は流束の割合なので、透過数は $\Gamma n_H=(2/3)(3/5)=2/5$。流束保存を仮定した反射率は $1-\Gamma=1/3$ で、反射数は $(1/3)(3/5)=1/5$。和は $2/5+1/5=3/5=n_H$ です。$0\le2/3\le1$ と非負性も確認できます。この数は**一チャネルの平均個数**で、角運動量和も周波数積分も含みません。
<!-- solution-end -->

<a id="ex-qcurv21-a03"></a>
#### QCURV21-A03 同じ温度で異なる正味流束
- Level: A
- 問題: 同じ質量 $M>0$ の永遠のSchwarzschild外部に対し、Unruh型とHartle–Hawking型の状態の遠方入射/出射熱占有数を比較せよ。両方とも $T_H$ を持つのに正味光度が異なる理由を述べよ。

<!-- solution-start -->
**詳細解答**：[三状態の定義](../QCURV13/index.md#def-qcurv13-three-states)で Unruh型は $n_{\rm in}=0$、$n_{\rm up}=(e^{\omega/T_H}-1)^{-1}$、Hartle–Hawking型は両方のチャネルが同じ熱的占有数です。散乱で透過した出射成分と無限遠からの入射成分の正味エネルギーを比較すると、前者では外向き成分を相殺する熱的な入射粒子がなく正味の光度が正です。後者は入射・出射が平衡にあって正味流束が零です。[状態と流束の比較](../QCURV13/index.md#thm-qcurv13-state-flux)により、温度だけでなく状態の境界条件が必要と分かります。局所二点関数全体の正則性は、この占有数表だけで証明したものではありません。
<!-- solution-end -->

<a id="ex-qcurv21-a04"></a>
#### QCURV21-A04 温度から作る候補関数
- Level: A
- 問題: $T_H(M)=1/(8\pi M)$（$M>0$）とする。$dS_*/dM=1/T_H$、$S_*(1)=0$ を満たす関数を求め、$M=2$ での $T_H(dS_*/dM)$ を検算せよ。

<!-- solution-start -->
**詳細解答**：[候補関数の命題](#prop-qcurv21-entropy-integrating-factor)から $S_*(M)=4\pi M^2+S_0$ です。$S_*(1)=0$ により $S_0=-4\pi$、従って $S_*(M)=4\pi(M^2-1)$。微分すると $dS_*/dM=8\pi M$。$M=2$ では $T_H=1/(16\pi)$、$dS_*/dM=16\pi$ だから積は1です。積分定数を指定した数学的関数であり、零点の選択が物理的エントロピーの正規化を確定するわけではありません。
<!-- solution-end -->

<a id="ex-qcurv21-a05"></a>
#### QCURV21-A05 どの主張が飛躍か
- Level: A
- 問題: 次の推論の不足条件を一つずつ挙げよ。(i) 熱因子があるから無限遠光度は完全黒体、(ii) $L>0$ だから固定Schwarzschild計量が全時刻に正しい、(iii) 外側が熱状態だから全体系は混合状態、(iv) $T_H>0$ だからBoulware状態も未来地平線で正則。

<!-- solution-start -->
**詳細解答**：(i) [灰色体流束](#thm-qcurv21-flux-chain)には $\Gamma_\ell$、縮退数、境界条件が必要で、一般に $\Gamma_\ell\ne1$ です。(ii) エネルギー収支で $\dot M<0$ とするなら背景は時間変化し、[有効区間の命題](#prop-qcurv21-validity-window)の近似検査が必要です。(iii) [同じ外部状態を持つ反例](#prop-qcurv21-same-marginal)では全体が純粋でも外側は混合し得ます。(iv) [地平線正則性の定義](../QCURV13/index.md#def-qcurv13-horizon-regularity)はHadamard型の二点分布を地平線へ滑らかに拡張できることを要求し、単なる温度の存在とは別です。
<!-- solution-end -->

### Level B：独立に導いて接続する

<a id="ex-qcurv21-b01"></a>
#### QCURV21-B01 人工チャネルの光度を積分から求める
- Level: B
- 問題: $M>0$ とし、$\Gamma_0=1$、$\Gamma_\ell=0$（$\ell\ge1$）の比較模型で $L(M)$ を積分から求めよ。さらに $M$ を $2M$ にすると光度がどうなるか。実際の四次元Schwarzschildの係数と同一視できない理由を述べよ。

<!-- solution-start -->
**詳細解答**：[光度公式](#thm-qcurv21-flux-chain)に代入すると

$$
L(M)=\frac1{2\pi}\int_0^\infty\frac{\omega}{e^{8\pi M\omega}-1}\,d\omega.
$$

$x=8\pi M\omega$ と変数変換すると $\omega\,d\omega=x\,dx/(8\pi M)^2$。$x>0$ で $1/(e^x-1)=\sum_{n\ge1}e^{-nx}$。各項が非負なので積分と和を交換でき、部分積分で

$$
\int_0^\infty xe^{-nx}\,dx
=\left[-\frac{x}{n}e^{-nx}\right]_0^\infty
+\frac1n\int_0^\infty e^{-nx}\,dx
=\frac1{n^2}.
$$

従って $\int_0^\infty x/(e^x-1)\,dx=\sum_{n\ge1}n^{-2}=\pi^2/6$、

$$
L(M)=\frac1{2\pi(8\pi M)^2}\frac{\pi^2}{6}
=\frac1{768\pi M^2},\qquad L(2M)=\frac14L(M).
$$

実散乱では[低周波s波の透過率](../QCURV12/index.md#prop-qcurv12-swave-low-frequency)が周波数依存して零へ向かうので $\Gamma_0=1$ は現実の透過率ではありません。係数の一致は模型内だけです。
<!-- solution-end -->

<a id="ex-qcurv21-b02"></a>
#### QCURV21-B02 質量の下限までの時間と断熱指標
- Level: B
- 問題: 幾何単位で $M_0=20$、$C_s=1/100$ とし、$\dot M=-C_s/M^2$ を仮定する。$M=10$ までの時間 $u_*-u_0$、初期と終期の $\varepsilon_{\rm ad}$、および形式的に $M=0$ と置く時刻との差を求めよ。

<!-- solution-start -->
**詳細解答**：$20>10>0$、$C_s>0$ を確認します。[質量下限の命題](#prop-qcurv21-validity-window)に $M_*=10$ を代入して

$$
u_*-u_0=\frac{20^3-10^3}{3/100}
=\frac{7000\times100}{3}=\frac{700000}{3}.
$$

$\varepsilon_{\rm ad}=C_s/M^2$ より初期は $(1/100)/400=1/40000$、終期は $(1/100)/100=1/10000$。形式的な零点は $20^3/(3/100)=800000/3$ なので、その差は $100000/3$。この残り時間の数字は**模型を下限の先まで外挿した値**であり、有効な予測区間とはみなしません。
<!-- solution-end -->

<a id="ex-qcurv21-b03"></a>
#### QCURV21-B03 熱的な外部状態と全体の純粋度
- Level: B
- 問題: [二準位反例](#prop-qcurv21-same-marginal)で $p=1/4$ とする。(i) 外部密度行列、(ii) 全体の純粋状態と混合状態の $\operatorname{Tr}(\rho^2)$、(iii) エネルギー差 $E>0$ の熱状態だとしたときの $\beta E$ を求めよ。

<!-- solution-start -->
**詳細解答**：$p=1/4$ は $0<p<1$ を満たします。外部状態は

$$
\rho_O=\begin{pmatrix}3/4&0\\0&1/4\end{pmatrix},
\qquad \operatorname{Tr}\rho_O=1.
$$

純粋な全体の射影は二乗して自身に戻るので $\operatorname{Tr}[(\rho^{(P)}_{IO})^2]=1$。混合した全体は固有値 $3/4,1/4,0,0$ を持ち、

$$
\operatorname{Tr}[(\rho^{(M)}_{IO})^2]
=\left(\frac34\right)^2+\left(\frac14\right)^2
=\frac{10}{16}=\frac58.
$$

熱的な二準位系なら励起/基底比は $p/(1-p)=1/3=e^{-\beta E}$、よって $\beta E=\log3>0$。同じ熱的外部状態が全体の純粋性を確定しないことを、行列と数値で確認しました。
<!-- solution-end -->

<a id="ex-qcurv21-b04"></a>
#### QCURV21-B04 同じ遠方温度を異なる時計で測る
- Level: B
- 問題: $M>0$ のSchwarzschild外部の静止観測者が $r=4M$ にいる。無限遠温度 $T_H=1/(8\pi M)$ に対して、その観測者のTolman局所温度 $T_{\rm loc}$ を求めよ。自由落下観測者の検出率がその数値で必ず熱的になると結論できるか。

<!-- solution-start -->
**詳細解答**：Schwarzschildの静止世界線では $d\tau=\sqrt{1-2M/r}\,dt$ で、$r=4M>2M$ なら赤方偏移因子は $\sqrt{1-1/2}=1/\sqrt2$。[Tolman則](../QCURV14/index.md#thm-qcurv14-tolman)へ静止時計を代入して

$$
T_{\rm loc}=\frac{T_H}{\sqrt{1-2M/r}}
=\frac{\sqrt2}{8\pi M}.
$$

これは外部の定常Killing時計に沿った静止観測者の温度換算です。自由落下では軌道と固有時計が異なり、一般には静止Killing流の定常条件をそのまま用いられません。[観測者の比較](../QCURV14/index.md#prop-qcurv14-freefall-clock)に従い、検出器の二点関数をその世界線へ引き戻して別途評価する必要があります。
<!-- solution-end -->

### Level C：一連の導出を完成させる

<a id="ex-qcurv21-c01"></a>
#### QCURV21-C01 崩壊から温度・散乱・蒸発・情報の射程まで
- Level: C
- 問題: 質量 $M_0>0$ の四次元Schwarzschild型ブラックホールが形成され、質量零自由スカラーのin真空から後期放射が生じるとする。幾何光学で $p(u)=v_H-Ae^{-u/(4M_0)}$（$A>0$）である。次を求め、各段階で新たに使った仮定を示せ。

  1. Hawking温度と、同じ $\omega>0$ における $|\beta|^2/|\alpha|^2$ を求めよ。
  2. 散乱透過率 $\Gamma_\ell(\omega;M)$ を導入して、無限遠の光度を書け。
  3. 準静的に $L(M)=C_s/M^2$（$C_s>0$）と $\dot M=-L$ が成立する区間で、質量が $M_0$ から $M_0/2$ へ減る時間と終端の断熱指標を求めよ。
  4. BHTでのエントロピーの微視的同定やBHIでの情報回復をこの結果から証明できるか。追加の論点をそれぞれ挙げよ。

<!-- solution-start -->
**詳細解答**：

**(i) 光線から温度。** $p(u)$ の指数係数を[崩壊の後期指数則](../QCURV10/index.md#thm-qcurv10-late-exponential)の $\kappa$ と比較すると $\kappa=1/(4M_0)>0$。指数写像で入出射正周波数をFourier分解し、[係数比](#prop-qcurv21-hawking-chain)を適用すると

$$
\frac{|\beta_{\omega\omega'}|^2}{|\alpha_{\omega\omega'}|^2}
=e^{-2\pi\omega/\kappa}=e^{-8\pi M_0\omega},
\qquad T_H(M_0)=\frac{\kappa}{2\pi}=\frac1{8\pi M_0}.
$$

ここで追加したのはin真空と幾何光学・後期近似、同じ規格化のFourier係数です。**占有数へ進むには**狭帯域の正規化出射波束を作り、その後期極限で $n_H=(e^{8\pi M_0\omega}-1)^{-1}$ とします。連続モードの $\int d\omega'/\omega'$ を一粒子数としません。

**(ii) 遠方光度。** 定常近似した外部で、角運動量 $\ell$ と縮退度 $2\ell+1$、単位時間・単位周波数の状態密度 $1/(2\pi)$ を使います。[遠方光度の定理](#thm-qcurv21-flux-chain)から、収束を仮定して

$$
L(M)=\frac1{2\pi}\sum_{\ell=0}^\infty(2\ell+1)
\int_0^\infty\frac{\omega\,\Gamma_\ell(\omega;M)}{e^{8\pi M\omega}-1}\,d\omega.
$$

必要な新条件は、散乱境界条件、$0\le\Gamma_\ell\le1$、遠方への外向き符号、外部からの入射が無視できる状態、準静的に凍結した $M$ です。$\Gamma_\ell\equiv1$ としてよいとは限りません。

**(iii) 質量減少。** 散乱光度のスケール $L=C_s/M^2$ と孤立系のエネルギー収支 $\dot M=-L$ は、(i) だけからは従わない追加近似です。[有効区間の命題](#prop-qcurv21-validity-window)に $M_*=M_0/2$ を代入して

$$
\Delta u=\frac{M_0^3-(M_0/2)^3}{3C_s}
=\frac{(1-1/8)M_0^3}{3C_s}
=\frac{7M_0^3}{24C_s}.
$$

終端の断熱指標は $\varepsilon_{\rm ad}=C_s/(M_0/2)^2=4C_s/M_0^2$。例えば $M_0/2\gg1$ かつ $4C_s/M_0^2\ll1$ であれば二つの必要目安は保てますが、高次項・状態の正則性の十分条件を確認したわけではありません。この区間を越えて $M=0$ まで予測しません。

**(iv) 二つの未解決の接続。** 熱力学側では温度の積分から $S_*(M)=4\pi M^2+S_0$ が得られますが、[候補関数の命題](#prop-qcurv21-entropy-integrating-factor)はエントロピーの物理的同定を仮定していません。第一法則・平衡状態・微視的自由度・一般化第二法則などの議論が追加で必要です。情報側では、外側の熱的占有数だけでは全体系の純粋性が分かりません。[二準位の反例](#prop-qcurv21-same-marginal)のように同じ部分状態を純粋な全体にも混合した全体にも埋め込めます。蒸発前後の全量子状態、部分系と相関、後期放射、終期の量子重力的記述を指定せずに情報の消失・回復は断言できません。
<!-- solution-end -->

---

## 学び終えたら

独立に覚えるべき公式が五つ増えた、というのがこの章の到達点ではありません。各式を使うたびに**背景、状態、時計、散乱、エネルギー収支、近似の有効範囲**を再点検できることが目標です。

- $T_H$ は後期の正周波数混合から得た温度パラメータであり、局所観測者の任意の温度ではない。
- $L(M)$ は散乱・入射状態・遠方時計を入れた後の光度であり、熱因子だけではない。
- $\dot M=-L$ は独立の収支仮定を持つ半古典的な近似であり、蒸発終期までの解ではない。
- 熱力学のエントロピーと量子情報の全体状態には、この講座では導入していない追加の物理的入力が必要である。

こうして曲がった時空の自由量子場で確かめた結果を、ブラックホール熱力学と情報問題へ、仮定を明示したまま引き継げます。
