# QCURV11 Hawking温度を生むFourier積分と後期波束

<!-- definition-example-audit: strict -->

[QCURV10の崩壊光線写像](../QCURV10/index.md#thm-qcurv10-late-exponential)から、遅い出射光線の過去の入射時刻は $p(u)=v_H-Ae^{-\kappa u}+O(e^{-2\kappa u})$ と分かりました。しかし光線の間隔が指数的に縮むこと自体は、量子場の粒子数を教えてくれません。必要なのは、その光線に沿って運ばれた**位相を過去の正周波数と負周波数に分解する計算**です。

ここでは、正負のFourier係数の非対称性から $T_H=\kappa/(2\pi)$ を導き、周波数が連続な一個のモードに現れる発散を[QCURV10の波束](../QCURV10/index.md#def-qcurv10-asymptotic-packets)で解消します。**温度の導出**と**遠方へ届く全放射の強度**は別の問いです。後者には角運動量ごとの散乱を加える必要があります。

計量符号は $(-,+,+,+)$、自然単位は $\hbar=c=k_B=G=1$ とします。背景は球対称・漸近平坦な、地平線を形成する崩壊時空です。まず散乱障壁を外した質量零スカラー場の動径幾何光学部分を、規格化された $1+1$ 次元の零無限遠モードとして計算します。$\kappa>0$ は遠方で規格化した時刻 $u$ に関する表面重力、$A>0$ は長さの次元を持つ光線接続係数、$v_H$ は最後に脱出する入射ラベルです。後期指数近似を**全時刻の厳密な関係だとは仮定しません**。

## 1. なぜ正負周波数の係数を別々に測るのか

過去零無限遠 $\mathscr I^-$ の正周波数と、未来零無限遠 $\mathscr I^+$ の正周波数は、それぞれ異なる時計で定めます。$\omega,\omega'>0$ として、位相は

$$
\text{in: }e^{-i\omega'v},\qquad
\text{out: }e^{-i\omega u}
$$

です。[QCURV3のBogoliubov係数](../QCURV3/index.md#def-qcurv3-bogoliubov)は、二つの正振動数分解がどれだけ混ざるかを表すものでした。[QCURV10の光線追跡](../QCURV10/index.md#def-qcurv10-ray-map)で $v=p(u)$ を代入すると、過去のin位相は未来の脱出光線に沿って $e^{-i\omega'p(u)}$ となります。これは一般に $u$ の単一周波数ではありません。

零無限遠のモードを $f_\omega(u)=e^{-i\omega u}/\sqrt{4\pi\omega}$ と規格化します。$u$ に関するFourier分解では、$e^{+i\omega u}$ 側の成分が負周波数です。以下の $\alpha,\beta$ は、[QCURV3の展開規約](../QCURV3/index.md#def-qcurv3-bogoliubov)でoutモードをinの正・負モードに展開した際の**展開係数**として定めます。KG内積で直接取り出す係数とは複素共役・符号の対応があるので、定義の後で計算して確認します。実際の崩壊では地平線へ落ちるモードも完備化に必要で、以下の脱出成分だけを全解空間と同一視しません.

<a id="def-qcurv11-fourier-coefficients"></a>

<!-- formal-statement-start -->
> **定義（脱出光線のFourier–Bogoliubov係数）**
> $\omega,\omega'>0$ とし、入射位相 $e^{-i\omega'p(u)}$ が出射座標 $u$ で分解できる領域を考える。境界項を消す滑らかな波束化・減衰正則化の下で、脱出成分の正負周波数係数を、全体の位相規約を一つ固定して

$$
\begin{aligned}
\alpha_{\omega\omega'}&:=\frac1{2\pi}\sqrt{\frac\omega{\omega'}}
 \int_{-\infty}^{\infty}e^{-i\omega u}e^{+i\omega'p(u)}\,du,\\
\beta_{\omega\omega'}&:=-\frac1{2\pi}\sqrt{\frac\omega{\omega'}}
 \int_{-\infty}^{\infty}e^{-i\omega u}e^{-i\omega'p(u)}\,du
\end{aligned}
$$

> と書く。積分は一般に通常の絶対収束積分ではなく、切替・減衰後のFourier振幅を表す。全体符号や複素共役の規約は粒子数 $|\beta|^2$ に影響しない。$\omega$ と $\omega'$ の両方を**正の独立変数**とする。
<!-- formal-statement-end -->

<!-- definition-example-start: def-qcurv11-fourier-coefficients -->
### 直接例：指数圧縮のない平坦な光線

$p(u)=u$ とすると、負周波数係数の核は $e^{-i(\omega+\omega')u}$ です。幅の広い滑らかな切替の極限で、そのFourier変換は $2\pi\delta(\omega+\omega')$ に比例します。$\omega,\omega'>0$ では和が零にならないため $\beta_{\omega\omega'}=0$ です。一方、正周波数側は

$$
\alpha_{\omega\omega'}=\sqrt{\frac\omega{\omega'}}\,\delta(\omega-\omega')
=\delta(\omega-\omega')
$$

です。最後の等号はデルタ分布の台 $\omega=\omega'$ 上で $\sqrt{\omega/\omega'}=1$ となるためです。したがって正周波数は係数1で対応し、負周波数への混合はありません。

**定義の確認**：正負・周波数域・規格化の三条件を直接確かめました。有限幅の切替では過渡項が現れるため、そのときの $\beta$ を厳密に零とは主張しません。
<!-- definition-example-end -->

### Fourier式とKG内積の接続

なぜ $\sqrt{\omega/\omega'}$ が現れるのでしょうか。未来の右向き零モードの[KG流束内積](../QCURV10/index.md#def-qcurv10-asymptotic-packets)は、適切な境界条件の下で

$$
(f,g)_{\mathscr I^+}=i\int_{-\infty}^{\infty}
\bigl(f^*\partial_u g-(\partial_u f^*)g\bigr)\,du
$$

です。$g=e^{-i\omega'p(u)}/\sqrt{4\pi\omega'}$ と $f=e^{-i\omega u}/\sqrt{4\pi\omega}$ を入れます。ここで $\partial_u$ は $\omega,\omega'$ を固定して出射時刻 $u$ で微分する演算子であり、$p'(u)=dp/du$ です。[QCURV10の入出射写像](../QCURV10/index.md#def-qcurv10-ray-map)の連鎖律によって、導関数から $\omega$ と $\omega'p'(u)$ が出ます。例えば

$$
\partial_u e^{-i\omega'p(u)}=-i\omega'p'(u)e^{-i\omega'p(u)},
\qquad \partial_u e^{i\omega u}=i\omega e^{i\omega u}.
$$

境界項が消える切替付き積分で部分積分すると、$\omega'p'(u)$ の項は $\omega$ の項に移ります。正周波数側では $\partial_u e^{i\omega u-i\omega'p(u)}=i(\omega-\omega'p'(u))e^{i\omega u-i\omega'p(u)}$ なので

$$
\begin{aligned}
(f_\omega,g)_{\mathscr I^+}
&=\frac1{4\pi\sqrt{\omega\omega'}}
\int(\omega+\omega'p'(u))e^{i\omega u-i\omega'p(u)}\,du\\
&=\frac1{2\pi}\sqrt{\frac\omega{\omega'}}
\int e^{i\omega u-i\omega'p(u)}\,du
=\overline{\alpha_{\omega\omega'}}.
\end{aligned}
$$

負周波数側では $\partial_u e^{i\omega u+i\omega'p(u)}=i(\omega+\omega'p'(u))e^{i\omega u+i\omega'p(u)}$ を用いると

$$
(f_\omega,\overline g)_{\mathscr I^+}
=\frac1{2\pi}\sqrt{\frac\omega{\omega'}}
\int e^{i\omega u+i\omega'p(u)}\,du
=-\overline{\beta_{\omega\omega'}}.
$$

つまり本章の展開係数はQCURV3のKG内積係数の $\overline{\alpha^{\rm KG}}$ と $-\overline{\beta^{\rm KG}}$ であり、[QCURV3のoutモード展開](../QCURV3/index.md#def-qcurv3-bogoliubov)と一致します。$2\omega/(4\pi\sqrt{\omega\omega'})=\sqrt{\omega/\omega'}/(2\pi)$ が正規化係数の由来です。波束についても第一引数に共役線形なKG内積で重みが共役され、本章の展開係数を重ねた波束混合係数とは全体の負号・複素共役だけが違い、粒子数 $|\beta_{jn,\omega'}|^2$ は一致します。$p'(u)$ を無視して規格化を推測したわけではありません。

## 2. 指数写像の積分をGamma関数に変える

遅い時刻の主要項だけを残すモデルとして

$$
p_{\mathrm{exp}}(u)=v_H-Ae^{-\kappa u}
$$

を一旦 $u\in\mathbb R$ 全体へ延長します。これはFourier積分を閉じて計算するための**理想化した指数模型**です。実際の崩壊写像は早い時刻にこの形ではないので、後期波束への適用条件を第4節で別に確認します。$a:=\omega/\kappa>0$ は無次元の周波数です。

正負を分ける決定的な計算は、変数 $x=A\omega'e^{-\kappa u}>0$ による置換です。$u\to+\infty$ が $x\to0$ に対応し、

$$
u=-\kappa^{-1}\log\frac{x}{A\omega'},\qquad
du=-\frac{dx}{\kappa x},\qquad
e^{-i\omega u}=\left(\frac{x}{A\omega'}\right)^{ia}.
$$

虚数指数を持つ振動積分を計算するために、[CA11のGamma関数](../../../解析系/CA/CA11/index.md#def-ca11-gamma-function)のEuler積分を使います。$\Gamma(s)=\int_0^\infty x^{s-1}e^{-x}dx$ は当初 $\Re s>0$ で定義されます。ここではすぐ $s=ia$ を代入せず、$s=\rho+ia$（$0<\rho<1$）および $e^{-\eta x}$（$\eta>0$）で端点を正則化してから極限を取ります。

<a id="thm-qcurv11-gamma-amplitudes"></a>

<!-- formal-statement-start -->
> **定理（指数光線写像のGamma型振幅）**
> $\kappa,A,\omega,\omega'>0$、$v_H\in\mathbb R$ とし、$p_{\mathrm{exp}}(u)=v_H-Ae^{-\kappa u}$ を全実数上の理想模型として採用する。前節のFourier–Bogoliubov係数を端点正則化した振動積分として評価すると、$a=\omega/\kappa$ に対し

$$
\begin{aligned}
\alpha_{\omega\omega'}&=\frac{e^{i\omega'v_H}}{2\pi\kappa}
\sqrt{\frac\omega{\omega'}}(A\omega')^{-ia}e^{\pi a/2}\Gamma(ia),\\
\beta_{\omega\omega'}&=-\frac{e^{-i\omega'v_H}}{2\pi\kappa}
\sqrt{\frac\omega{\omega'}}(A\omega')^{-ia}e^{-\pi a/2}\Gamma(ia).
\end{aligned}
$$

> この表示は時間全域で指数則を採用した模型の振幅であり、実際の崩壊時空の全時刻・全周波数での厳密なBogoliubov変換という主張ではない。
<!-- formal-statement-end -->

### 証明の見取り図

$u$ の積分を正の変数 $x$ へ換えます。正負のin位相の違いは $e^{-ix}$ と $e^{+ix}$ だけです。Gamma積分を複素方向へ回すと、この符号の差が $e^{\pm\pi a/2}$ を作ります。

<!-- proof-start -->
### 証明

まず $\beta$ 側の積分を代入して

$$
\begin{aligned}
I_-&:=\int_{-\infty}^{\infty}e^{-i\omega u-i\omega'p_{\rm exp}(u)}\,du\\
&=\frac{e^{-i\omega'v_H}}\kappa (A\omega')^{-ia}
\int_0^\infty x^{ia-1}e^{ix}\,dx.
\end{aligned}
$$

端点を制御するため $s=\rho+ia$、$0<\rho<1$、$\eta>0$ で考えると、[Gamma関数の積分表示](../../../解析系/CA/CA11/index.md#def-ca11-gamma-function)を複素減衰率 $\eta-i$ に適用して

$$
\int_0^\infty x^{s-1}e^{-(\eta-i)x}\,dx
=\Gamma(s)(\eta-i)^{-s}.
$$

この等式は減衰率 $\lambda>0$ が実数なら $t=\lambda x$ の置換で得られ、$\Re\lambda>0$ の両辺が $\lambda$ の正則関数なので一致の定理で複素 $\lambda=\eta-i$ に拡張できます。$x^{s-1}$ は $x>0$ の実対数で定め、$\lambda^{-s}$ には右半平面で連続な複素対数を使います。ここで複素冪には主枝 $\operatorname{Log}z=\log|z|+i\arg z$（$-\pi<\arg z<\pi$）を使います。$\eta\downarrow0$ では $\operatorname{Log}(\eta-i)\to-i\pi/2$ なので

$$
(\eta-i)^{-s}\to e^{i\pi s/2},\qquad
e^{i\pi(ia)/2}=e^{-\pi a/2}.
$$

その後 $\rho\downarrow0$ とすると、$a>0$ により $ia$ はGamma関数の極ではないので

$$
I_- =\frac{e^{-i\omega'v_H}}\kappa
(A\omega')^{-ia}e^{-\pi a/2}\Gamma(ia)
$$

という正則化した振動積分を得ます。$\alpha$ 側では $e^{+i\omega'p_{\rm exp}(u)}=e^{i\omega'v_H}e^{-ix}$ となり、減衰率は $\eta+i$、$\operatorname{Log}(\eta+i)\to+i\pi/2$ です。ゆえに $e^{-i\pi(ia)/2}=e^{+\pi a/2}$ が出ます。両者に定義の $\sqrt{\omega/\omega'}/(2\pi)$ を掛け、$\beta$ の符号を戻せば表示式になります。$\square$
<!-- proof-end -->

**枝の検算**：$e^{+ix}$ に対しては $\eta-i$、$e^{-ix}$ に対しては $\eta+i$ です。ここを逆にすると熱因子が反転し、励起の方が優勢になる誤った結論になります。$A$ は対数の内部で $A\omega'>0$ となるので、$\log(A\omega')$ は実数で枝の曖昧さを生みません。

## 3. 正負の振幅比から温度を読み取る

係数のGamma関数部分と $A$ に依存する位相は正負で共通です。したがって上の定理で絶対値を取れば、いきなり粒子数を積分する前に、周波数混合の比が得られます。

<a id="thm-qcurv11-thermal-ratio"></a>

<!-- formal-statement-start -->
> **定理（Hawkingの熱因子と温度）**
> $\kappa,A,\omega,\omega'>0$ の指数光線模型で、定理の $\alpha_{\omega\omega'},\beta_{\omega\omega'}$ を用いると

$$
\boxed{\frac{|\beta_{\omega\omega'}|^2}{|\alpha_{\omega\omega'}|^2}
=e^{-2\pi\omega/\kappa}}
$$

> が成り立つ。また連続モードの混合係数は

$$
\boxed{|\beta_{\omega\omega'}|^2
=\frac1{2\pi\kappa\omega'}
\frac1{e^{2\pi\omega/\kappa}-1}.}
$$

> 後期の粒子占有数がBose–Einstein形になる極限での温度パラメータは

$$
\boxed{T_H=\frac\kappa{2\pi}}.
$$

> $\kappa$ は未来無限遠で規格化した時間に関する値であり、この式だけから全時刻の熱平衡や遠方の黒体流束を主張しない。
<!-- formal-statement-end -->

### 証明の見取り図

振幅の比だけならGamma関数の絶対値を知らずに求まります。粒子数の式へ進む際は、[CA11の反射公式](../../../解析系/CA/CA11/index.md#thm-ca11-reflection)と関数等式から $|\Gamma(ia)|^2$ を求め、係数の次元まで追います。

<!-- proof-start -->
### 証明

[$\alpha,\beta$ のGamma型振幅](#thm-qcurv11-gamma-amplitudes)を比べると、$e^{\pm i\omega'v_H}$、$(A\omega')^{-ia}$ は絶対値1です。$\Gamma(ia)$ と $\sqrt{\omega/\omega'}$ も共通だから、

$$
\frac{|\beta|^2}{|\alpha|^2}
=\frac{e^{-\pi a}}{e^{\pi a}}=e^{-2\pi a}.
$$

次に $a>0$ で $\overline{\Gamma(ia)}=\Gamma(-ia)$ を使います。[Gamma関数の関数等式](../../../解析系/CA/CA11/index.md#thm-ca11-functional-equation)に $z=-ia$、[Eulerの反射公式](../../../解析系/CA/CA11/index.md#thm-ca11-reflection)に $z=ia$ を代入すると

$$
\begin{aligned}
\Gamma(1-ia)&=(-ia)\Gamma(-ia),\\
\Gamma(ia)\Gamma(1-ia)&=\frac\pi{\sin(i\pi a)}
=\frac\pi{i\sinh(\pi a)}.
\end{aligned}
$$

両式をつなぐと、$\sin(ix)=i\sinh x$ に注意して

$$
|\Gamma(ia)|^2=\Gamma(ia)\Gamma(-ia)
=\frac\pi{a\sinh(\pi a)}.
$$

したがって

$$
\begin{aligned}
|\beta_{\omega\omega'}|^2
&=\frac{\omega}{4\pi^2\kappa^2\omega'}
 e^{-\pi a}\frac\pi{a\sinh(\pi a)}\\
&=\frac{\omega}{2\pi\kappa^2\omega'a}
 \frac1{e^{2\pi a}-1}\\
&=\frac1{2\pi\kappa\omega'}
 \frac1{e^{2\pi\omega/\kappa}-1}.
\end{aligned}
$$

最後の式で $a=\omega/\kappa$ を使いました。Bose–Einsteinの占有数 $n(\omega)=(e^{\omega/T}-1)^{-1}$ と指数を照合すると $1/T=2\pi/\kappa$ です。ここでいう温度は遠方の正規化時間を使う後期スペクトルのパラメータです。$\square$
<!-- proof-end -->

### 直接例：Schwarzschildブラックホール

遠方で規格化した[QCURV9の表面重力](../QCURV9/index.md#prop-qcurv9-kappa)は $\kappa=1/(4M)$（$M>0$）です。これを温度式へ代入すると

$$
T_H=\frac{1/(4M)}{2\pi}=\frac1{8\pi M}.
$$

質量 $M$ を2倍にすると温度は半分です。自然単位から復元すれば $T_H=\hbar c^3/(8\pi GMk_B)$。この $M$ はSchwarzschild質量であり、遠方の熱スペクトルが全周波数で完全黒体になるという意味ではありません。

## 4. なぜ波束が必要で、遅い時刻とはどの極限か

[QCURV3の波束粒子数](../QCURV3/index.md#def-qcurv3-wavepacket-hs)によれば、in真空のout波束の粒子数は $\int d\omega'\,|\beta_{jn,\omega'}|^2$ です。しかし連続する単一の $\omega$ を固定して前節の式をそのまま積分すると

$$
\int_0^\infty |\beta_{\omega\omega'}|^2\,d\omega'
=\frac1{2\pi\kappa(e^{2\pi\omega/\kappa}-1)}
\int_0^\infty\frac{d\omega'}{\omega'}
$$

となり、両端で発散します。これは**一個の規格化粒子の無限個生成**ではありません。単色の連続モードは到着時刻について無限に広がり、粒子数を数える正規化された波束ではないためです。

帯域と時刻ラベルを、幅 $\epsilon>0$、整数 $j\ge1$、$n\in\mathbb Z$ に対して

$$
[j\epsilon,(j+1)\epsilon],\qquad
\omega_j=(j+1/2)\epsilon,\qquad
u_n=\frac{2\pi n}{\epsilon}
$$

と置きます。$\omega_j$ は帯域中央、$u_n$ は[QCURV10の出射波束の時刻中心](../QCURV10/index.md#prop-qcurv10-packet-localization)です。

$\epsilon\ll\min(\omega_j,\kappa)$ に加え、Gamma因子の位相も含めて後で定義する $C(\omega)$ が帯域内でほぼ一定になる範囲を考えます。これは追加の周波数依存位相で中心が大きくずれないようにする仮定です。単に $\epsilon/\kappa$ が小さいだけでは、任意に高い $\omega_j/\kappa$ でこの条件は保証されません。

<a id="def-qcurv11-packet-mixing"></a>

<!-- formal-statement-start -->
> **定義（後期出射波束の混合係数と占有数）**
> $\epsilon>0$、整数 $j\ge1,n\in\mathbb Z$ を取り、[QCURV10の単位規格化した出射波束](../QCURV10/index.md#def-qcurv10-asymptotic-packets)に対して、連続in周波数 $\omega'>0$ への混合係数とin真空での平均out占有数を

$$
\begin{aligned}
\beta_{jn,\omega'}&:=\frac1{\sqrt\epsilon}
\int_{j\epsilon}^{(j+1)\epsilon}e^{2\pi i\omega n/\epsilon}
\beta_{\omega\omega'}\,d\omega,\\
N_{jn}&:=\int_0^\infty|\beta_{jn,\omega'}|^2\,d\omega'
\end{aligned}
$$

> と定める。$N_{jn}$ は各波束について積分が存在するときの量であり、単色モードの $\delta(0)$ を直接評価したものではない。
<!-- formal-statement-end -->

<!-- definition-example-start: def-qcurv11-packet-mixing -->
### 直接例：混合のない光線写像と波束の規格化

$p(u)=u$ なら第1節で $\beta_{\omega\omega'}=0$（$\omega,\omega'>0$）を確認しました。したがって帯域の積分も $\beta_{jn,\omega'}=0$、さらに $N_{jn}=\int_0^\infty0\,d\omega'=0$ です。

**定義の確認**：波束の正周波数・単位規格化・$\omega'$ 積分の収束が揃い、定義が実際に評価できます。有限時間の切替による過渡応答を除いた定常比較です。
<!-- definition-example-end -->

指数模型では前節の係数の $\omega'$ 依存性を分けると、$\beta_{\omega\omega'}=C(\omega)\omega'^{-1/2}\exp[-i\omega'v_H-i(\omega/\kappa)\log(A\omega')]$ です。ここで $\omega'$ に依存しない複素係数を

$$
C(\omega):=-\frac{\sqrt\omega}{2\pi\kappa}
e^{-\pi\omega/(2\kappa)}\Gamma(i\omega/\kappa)
$$

と定義します。$C(\omega)$ は $\omega>0$ で零になりません（[CA11のGamma関数の零点不存在](../../../解析系/CA/CA11/index.md#cor-ca11-gamma-zero-free)を使用）。以下の $\partial_\omega\log C$ は $\kappa$ を固定して帯域内の**出射周波数 $\omega$** を微分するものです（対数の局所的な枝を用い、導関数は枝の選択に依存しません）。$\epsilon$ が狭く、位相も含めて $C(\omega)\simeq C(\omega_j)$ とできれば、波束の周波数積分に残る位相は

$$
e^{i\omega\Delta},\qquad
\Delta:=u_n-\kappa^{-1}\log(A\omega').
$$

これにより、どの入射周波数 $\omega'$ が時刻 $u_n$ の波束へ主に寄与するかを明示的に確かめられます。$C(\omega)$ の位相を帯域内で一定とみなせない場合には、位相の $\omega$ 微分も局在中心に寄与します。

<a id="prop-qcurv11-late-packet-planck"></a>

<!-- formal-statement-start -->
> **命題（狭帯域・後期波束のPlanck占有数）**
> 指数光線模型で $\kappa,A,\omega'>0$、$\epsilon>0$、整数 $j\ge1$、$n\in\mathbb Z$ とし、$\omega_j=(j+1/2)\epsilon$、$u_n=2\pi n/\epsilon$ を固定する。係数と位相差を

$$
\begin{aligned}
C(\omega)&=-\frac{\sqrt\omega}{2\pi\kappa}
e^{-\pi\omega/(2\kappa)}\Gamma(i\omega/\kappa),\\
\Delta&=u_n-\kappa^{-1}\log(A\omega')
\end{aligned}
$$

> とする。$\epsilon\ll\min(\omega_j,\kappa)$ に加えて次の緩変化条件を仮定する。

$$
\epsilon\sup_{\omega\in[j\epsilon,(j+1)\epsilon]}
|\partial_\omega\log C(\omega)|\ll1.
$$

> この狭帯域近似で $C(\omega)$ を $C(\omega_j)$ に置き換えると、波束の中心位相により

$$
|\beta_{jn,\omega'}|^2\simeq
\frac\epsilon{2\pi\kappa\omega'}
\frac{\operatorname{sinc}^2(\epsilon\Delta/2)}
{e^{2\pi\omega_j/\kappa}-1},
\qquad \operatorname{sinc}z:=\begin{cases}\sin z/z&(z\ne0),\\1&(z=0),\end{cases}
$$

> となる。$\omega'$ を $(0,\infty)$ で積分した指数模型の主要項は

$$
\boxed{N_{jn}\simeq\frac1{e^{2\pi\omega_j/\kappa}-1}.}
$$

> 実際の崩壊への後期適用には、波束が指数則の成立領域に集中すること、初期・過渡部分が長時間極限で寄与しないこと、幾何光学・状態の仮定を別途要する。$n$ に無条件で厳密に独立という主張ではない。
<!-- formal-statement-end -->

### 証明の見取り図

$\omega$ 帯域の位相積分はsinc関数になります。さらに $z=\kappa^{-1}\log(A\omega')$ に換えて $d\omega'/\omega'=\kappa dz$ とすれば、sinc二乗の積分がちょうど規格化を打ち消します。

<!-- proof-start -->
### 証明

[$\beta$ のGamma型振幅](#thm-qcurv11-gamma-amplitudes)を、帯域中央で $C(\omega)\simeq C(\omega_j)$ と近似します。$\Delta=u_n-\kappa^{-1}\log(A\omega')$ と置くと

$$
\begin{aligned}
\beta_{jn,\omega'}&\simeq
\frac{C(\omega_j)e^{-i\omega'v_H}}{\sqrt{\epsilon\omega'}}
\int_{j\epsilon}^{(j+1)\epsilon}e^{i\omega\Delta}\,d\omega\\
&=\sqrt\epsilon\,\frac{C(\omega_j)e^{-i\omega'v_H}}{\sqrt{\omega'}}
e^{i\omega_j\Delta}\operatorname{sinc}(\epsilon\Delta/2).
\end{aligned}
$$

ここで $\int_{\omega_j-\epsilon/2}^{\omega_j+\epsilon/2}e^{i\omega\Delta}d\omega=e^{i\omega_j\Delta}\,2\sin(\epsilon\Delta/2)/\Delta$ を使いました。[熱因子の定理](#thm-qcurv11-thermal-ratio)より

$$
|C(\omega_j)|^2=\frac1{2\pi\kappa}
\frac1{e^{2\pi\omega_j/\kappa}-1}.
$$

従って最初の表示が得られます。$z=\kappa^{-1}\log(A\omega')$ は $\omega'>0$ を $z\in\mathbb R$ へ一対一に写し、導関数 $d\omega'/dz=\kappa\omega'$ から $d\omega'/\omega'=\kappa dz$ です。必要なsinc二乗の積分も、[QCURV10の連続モードのデルタ規格化](../QCURV10/index.md#def-qcurv10-asymptotic-packets)から確認できます。$h(t):=\int_{-1}^1e^{i\nu t}\,d\nu=2\sin t/t$（$t=0$ では2）と置くと、Fourier積分の二乗を滑らかな減衰で正則化してからデルタ規格化を使えば

$$
\int_{-\infty}^{\infty}|h(t)|^2\,dt
=2\pi\int_{-1}^1d\nu=4\pi,
\qquad
\int_{-\infty}^{\infty}\operatorname{sinc}^2t\,dt=\pi.
$$

この等式は有限区間の指示関数のFourier等長性と同じ計算です。$t=\epsilon(u_n-z)/2$ とさらに置換すると

$$
\begin{aligned}
\int_0^\infty\frac{d\omega'}{\omega'}
\operatorname{sinc}^2\!\left(\frac\epsilon2(u_n-z)\right)
&=\kappa\int_{-\infty}^{\infty}
\operatorname{sinc}^2\!\left(\frac\epsilon2(u_n-z)\right)dz\\
&=\frac{2\pi\kappa}\epsilon.
\end{aligned}
$$

これを定義の $N_{jn}$ に代入すれば、$\epsilon/(2\pi\kappa)$ と積分値が相殺され、Planck占有数が残ります。$\square$
<!-- proof-end -->

### 入射側の周波数はなぜ大きくなるか

sinc関数が最大となるのは $\Delta=0$、すなわち

$$
\boxed{\omega'_{\rm center}=A^{-1}e^{\kappa u_n}.}
$$

この中心は上で述べた $C(\omega)$ の位相が帯域内でほぼ一定という近似の下での値です。次元は $A^{-1}$ が逆時間、指数は無次元です。$n\to+\infty$ でこの中心は指数的に大きくなります。これが**超Planckianな遡及周波数問題**の入り口です。出射側の観測周波数 $\omega_j$ まで指数的に増えるわけではありません。高いin周波数への遡及を含む近似がどの範囲まで妥当かは、後の物理的検討が必要です。

さらに厳密な崩壊では $p(u)$ の初期部分が指数模型と異なります。$u_n$ が十分遅く、$1/\epsilon$ 程度の波束幅が後期領域に収まり、定常的な近似を使える場合にPlanck分布が現れる、という順番で結論を理解します。有限の切替・有限の検出時間・地平線へ落ちるモードを省略して、全時刻の厳密な熱平衡を得たとはしません。

## 5. 温度の導出から遠方の放射強度へはまだ一段ある

| 観測・計算対象 | 本章で示した範囲 | 追加で必要なもの |
| --- | --- | --- |
| 崩壊光線の周波数混合 | 指数写像で正負係数の比が $e^{-2\pi\omega/\kappa}$ | 初期過渡と崩壊模型ごとの補正 |
| 一つの後期出射波束 | 理想模型の狭帯域極限でPlanck占有数 | 遅い時刻への局在と状態・近似の条件 |
| 4次元の無限遠に届く放射 | $T_H=\kappa/(2\pi)$ が熱因子を決める | 球面調和モードの散乱・透過率（灰色体因子） |
| ブラックホールの温度と平衡 | 無限遠時刻による温度の規格化 | 状態選択、地平線正則性、流束・検出器の区別 |

本章ではBoltzmann因子の指数を、崩壊の光線追跡から**直接**出しました。これは永遠のSchwarzschild時空にEuclid時間の周期を仮定しただけの議論とは異なります。一方、粒子占有数はモードごとに定義されるため、球面上の散乱障壁がある現実の4次元Schwarzschild時空では、その透過率が遠方での計数に掛かります。

## 演習

### Level A：符号・枝・係数を確かめる

<a id="ex-qcurv11-a01"></a>
#### QCURV11-A01 指数置換の端点と次元

- Level: A
- 問題: $A,\kappa,\omega'>0$、$x=A\omega'e^{-\kappa u}$ とする。$u\to\pm\infty$ での端点、$du$ と $e^{-i\omega u}$ の変換を導き、$x$ の次元を確認せよ。$\omega>0$ とする。

<!-- solution-start -->
**詳細解答**：$dx/du=-\kappa x$ なので $du=-dx/(\kappa x)$ です。$u\to+\infty$ で $x\to0^+$、$u\to-\infty$ で $x\to+\infty$。$u=-\kappa^{-1}\log(x/(A\omega'))$ より $e^{-i\omega u}=\exp[i(\omega/\kappa)\log(x/(A\omega'))]=(x/(A\omega'))^{i\omega/\kappa}$。$A$ は時間、$\omega'$ は逆時間なので $x$ と $A\omega'$ は無次元です。積分端点を入れ替えると $du$ の負号も解消します。
<!-- solution-end -->

<a id="ex-qcurv11-a02"></a>
#### QCURV11-A02 枝の向きと振幅比

- Level: A
- 問題: $a>0$、$s=\rho+ia$（$0<\rho<1$）で $\int_0^\infty x^{s-1}e^{-(\eta\mp i)x}dx$ を $\Gamma(s)$ で表せ。$\eta\downarrow0$、$\rho\downarrow0$ の順で正負の絶対値因子とその比を求めよ。

<!-- solution-start -->
**詳細解答**：[Gamma積分](../../../解析系/CA/CA11/index.md#def-ca11-gamma-function)より $\Gamma(s)(\eta\mp i)^{-s}$ です。主枝では $\operatorname{Log}(\eta-i)\to-i\pi/2$、$\operatorname{Log}(\eta+i)\to+i\pi/2$。従って前者は $e^{i\pi s/2}\Gamma(s)$、後者は $e^{-i\pi s/2}\Gamma(s)$ に近づきます。$s\to ia$ では絶対値因子がそれぞれ $e^{-\pi a/2}$、$e^{+\pi a/2}$。振幅の比は $e^{-\pi a}$、二乗比は $e^{-2\pi a}$ です。$a>0$ により $\Gamma(ia)$ に極はありません。
<!-- solution-end -->

<a id="ex-qcurv11-a03"></a>
#### QCURV11-A03 温度と質量の尺度

- Level: A
- 問題: 遠方規格化で $\kappa=1/(4M)$、$M>0$ のとき、$T_H$ と $M\mapsto3M$ による温度比を求めよ。$\omega/T_H$ の次元を確認せよ。

<!-- solution-start -->
**詳細解答**：[$T_H$ の式](#thm-qcurv11-thermal-ratio)で $T_H=\kappa/(2\pi)=1/(8\pi M)$。$M$ が $3M$ になると $T_H'=1/(24\pi M)$ だから $T_H'/T_H=1/3$ です。自然単位で $\omega$ はエネルギー、$T_H$ もエネルギーなので $\omega/T_H$ は無次元です。遠方時計の規格化を変えれば $\kappa$ と周波数を同時に読み替える必要があります。
<!-- solution-end -->

<a id="ex-qcurv11-a04"></a>
#### QCURV11-A04 入射周波数の中心

- Level: A
- 問題: $\epsilon,\kappa,A>0$、$u_n=2\pi n/\epsilon$ とする。$\Delta=u_n-\kappa^{-1}\log(A\omega')$ が零になる $\omega'$ を求め、$n$ を1増すと中心周波数が何倍になるか計算せよ。

<!-- solution-start -->
**詳細解答**：$\Delta=0$ は $\log(A\omega')=\kappa u_n$ と同値です。指数を取って $\omega'=A^{-1}e^{\kappa u_n}$。$u_{n+1}-u_n=2\pi/\epsilon$ より比は $e^{\kappa(u_{n+1}-u_n)}=e^{2\pi\kappa/\epsilon}>1$。これはin側の周波数であり、out帯域の $\omega_j$ は固定されたままです。
<!-- solution-end -->

### Level B：正則化・波束・近似の使い方を練習する

<a id="ex-qcurv11-b01"></a>
#### QCURV11-B01 Gamma関数の絶対値

- Level: B
- 問題: $a>0$ とする。[Gammaの反射公式](../../../解析系/CA/CA11/index.md#thm-ca11-reflection)と関数等式から $|\Gamma(ia)|^2=\pi/(a\sinh\pi a)$ を再導出せよ。さらに $e^{-\pi a}|\Gamma(ia)|^2$ を $e^{2\pi a}-1$ で表せ。

<!-- solution-start -->
**詳細解答**：反射公式は $\Gamma(ia)\Gamma(1-ia)=\pi/\sin(i\pi a)$。[Gamma関数の関数等式](../../../解析系/CA/CA11/index.md#thm-ca11-functional-equation)から $\Gamma(1-ia)=(-ia)\Gamma(-ia)$、複素共役から $\Gamma(-ia)=\overline{\Gamma(ia)}$。従って $(-ia)|\Gamma(ia)|^2=\pi/[i\sinh(\pi a)]$。両辺を $-ia$ で割り、$(-i)\cdot i=1$ に注意すると $|\Gamma(ia)|^2=\pi/(a\sinh\pi a)$。さらに $\sinh\pi a=(e^{\pi a}-e^{-\pi a})/2$ なので $e^{-\pi a}/\sinh\pi a=2/(e^{2\pi a}-1)$、従って

$$
e^{-\pi a}|\Gamma(ia)|^2=\frac{2\pi}{a(e^{2\pi a}-1)}.
$$

これは $\beta$ の係数に掛けたときの粒子数の分母を決めます。
<!-- solution-end -->

<a id="ex-qcurv11-b02"></a>
#### QCURV11-B02 単色モードの発散とsinc積分

- Level: B
- 問題: $\kappa,\omega,\epsilon>0$ とし、指数模型の $|\beta_{\omega\omega'}|^2$ を $\omega'$ で積分すると発散することを両端別々に示せ。また $u_n\in\mathbb R$、$z=\kappa^{-1}\log(A\omega')$ とした波束の $\operatorname{sinc}^2(\epsilon(u_n-z)/2)$ の積分は有限になることを求めよ。

<!-- solution-start -->
**詳細解答**：単色モードでは正の定数 $K=[2\pi\kappa(e^{2\pi\omega/\kappa}-1)]^{-1}$ に対して $\int_0^\infty K\,d\omega'/\omega'$ です。$\int_0^1 d\omega'/\omega'$ は下端で、$\int_1^\infty d\omega'/\omega'$ は上端でそれぞれ対数発散します。一方、$\omega'=A^{-1}e^{\kappa z}$ なら $d\omega'/\omega'=\kappa dz$。$t=\epsilon(u_n-z)/2$ と置くと $dz=-2dt/\epsilon$、端点は逆転して

$$
\int_0^\infty\frac{d\omega'}{\omega'}\operatorname{sinc}^2\!\left(\frac\epsilon2(u_n-z)\right)
=\frac{2\kappa}\epsilon\int_{-\infty}^\infty\operatorname{sinc}^2(t)dt
=\frac{2\pi\kappa}\epsilon.
$$

両端でsinc二乗が $O(t^{-2})$ となるため収束します（$t=0$ は連続に1）。これは波束を作ってから積分することの重要性です。
<!-- solution-end -->

<a id="ex-qcurv11-b03"></a>
#### QCURV11-B03 直線写像では熱性が消える

- Level: B
- 問題: $p(u)=v_0+Bu$（$v_0\in\mathbb R$ は時間、$B>0$ は無次元）を形式的に考える。指数写像の計算をそのまま使わず、$\beta_{\omega\omega'}$ が消えることと、その理由を示せ。

<!-- solution-start -->
**詳細解答**：$e^{-i\omega'p(u)}=e^{-i\omega'v_0}e^{-i(B\omega')u}$。$B>0$、$\omega'>0$ だから出射座標 $u$ に関しても正周波数 $B\omega'>0$ のままです。負周波数係数は定義より $e^{-i\omega'v_0}\int_{-\infty}^\infty e^{-i(\omega+B\omega')u}du$ に比例し、$\delta(\omega+B\omega')=0$（正の領域）となります。従って $\beta=0$。この模型には $x=A\omega'e^{-\kappa u}$ という指数置換が存在せず、枝を回したときの $e^{\pm\pi a/2}$ が生じません。$B$ の一定倍率は周波数の再標識であり、粒子生成の原因ではありません。
<!-- solution-end -->

<a id="ex-qcurv11-b04"></a>
#### QCURV11-B04 狭帯域近似の適用域

- Level: B
- 問題: $\omega_j=(j+1/2)\epsilon$、$\Delta=u_n-\kappa^{-1}\log(A\omega')$ とする。$C(\omega)$ が帯域内でほぼ一定な場合の波束積分を評価し、$\epsilon\ll\kappa$ が役立つ理由、Gamma因子の位相に関する追加条件と、遅い時刻への局在に必要な条件を説明せよ。

<!-- solution-start -->
**詳細解答**：帯域内で $C(\omega)\simeq C(\omega_j)$ と近似すると、残る積分は

$$
\int_{\omega_j-\epsilon/2}^{\omega_j+\epsilon/2}e^{i\omega\Delta}\,d\omega
=\epsilon e^{i\omega_j\Delta}\operatorname{sinc}(\epsilon\Delta/2).
$$

これを $1/\sqrt\epsilon$ 倍するので振幅の係数は $\sqrt\epsilon C(\omega_j)$ です。$C(\omega)$ には $e^{-\pi\omega/(2\kappa)}\Gamma(i\omega/\kappa)$ があり、帯域内で $\omega/\kappa$ が変化する尺度は $\epsilon/\kappa$ です。ゆえに $\epsilon\ll\kappa$ は有用な目安ですが、位相も含めた十分な緩変化条件は

$$
\epsilon\sup_{\omega\in[j\epsilon,(j+1)\epsilon]}
|\partial_\omega\log C(\omega)|\ll1
$$

です。位相が揃う時間幅は $O(1/\epsilon)$。指数則が有効となる時刻 $u_*$ があるなら、$u_n-u_*\gg1/\epsilon$ で波束の主要部分を後期領域へ置けます。ただしsincの裾は厳密に零でなく、初期過渡の消失には別の評価が必要です。
<!-- solution-end -->

### Level C：崩壊光線から後期粒子数までつなぐ

<a id="ex-qcurv11-c01"></a>
#### QCURV11-C01 指数則・温度・波束の総合再導出

- Level: C
- 問題: $\kappa,A>0$、$p_{\rm exp}(u)=v_H-Ae^{-\kappa u}$、$\omega,\omega'>0$ とする。$\mathscr I^-$ のin真空から $\mathscr I^+$ の出射波束を測る模型について、次を順に示せ。

  1. $x=A\omega'e^{-\kappa u}$ による置換から $\alpha,\beta$ の振動積分をGamma関数で評価し、正負の枝を明記する。
  2. $|\beta|^2/|\alpha|^2$ と $|\beta|^2$ の規格化を計算し、温度を求める。
  3. $\epsilon\ll\min(\omega_j,\kappa)$ に加え、$C(\omega)$ が帯域内でほぼ一定とした波束の主要項を求め、$\omega'$ の積分で有限な占有数が残る理由を示す。
  4. この模型から直ちに4次元の遠方エネルギー流束を求められない理由と、初期過渡・高入射周波数の二つの注意点を述べよ。

<!-- solution-start -->
**詳細解答**：

**（1）** $du=-dx/(\kappa x)$、$e^{-i\omega u}=(x/(A\omega'))^{ia}$、$a=\omega/\kappa$ です。$\beta$ のin位相は $e^{-i\omega'v_H}e^{+ix}$、$\alpha$ は $e^{+i\omega'v_H}e^{-ix}$ になります。$s=\rho+ia$、$0<\rho<1$、$\eta>0$ として $\int_0^\infty x^{s-1}e^{-(\eta\mp i)x}dx=\Gamma(s)(\eta\mp i)^{-s}$ を使います。主枝 $\operatorname{Log}(\eta-i)\to-i\pi/2$、$\operatorname{Log}(\eta+i)\to+i\pi/2$ なので、$\rho\downarrow0$ の結果はそれぞれ $e^{-\pi a/2}\Gamma(ia)$ と $e^{+\pi a/2}\Gamma(ia)$。従って

$$
\beta_{\omega\omega'}=-\frac{e^{-i\omega'v_H}}{2\pi\kappa}\sqrt{\frac\omega{\omega'}}
(A\omega')^{-ia}e^{-\pi a/2}\Gamma(ia),
$$

$$
\alpha_{\omega\omega'}=\frac{e^{i\omega'v_H}}{2\pi\kappa}\sqrt{\frac\omega{\omega'}}
(A\omega')^{-ia}e^{\pi a/2}\Gamma(ia).
$$

**（2）** 位相とGamma関数は絶対値比で消え、$|\beta|^2/|\alpha|^2=e^{-2\pi a}$。[反射公式](../../../解析系/CA/CA11/index.md#thm-ca11-reflection)と[Gamma関数の関数等式](../../../解析系/CA/CA11/index.md#thm-ca11-functional-equation)に $ia$ を代入して $|\Gamma(ia)|^2=\pi/[a\sinh(\pi a)]$ を得ます。これを二乗振幅に入れると

$$
|\beta|^2=\frac\omega{4\pi^2\kappa^2\omega'}e^{-\pi a}
\frac\pi{a\sinh(\pi a)}
=\frac1{2\pi\kappa\omega'(e^{2\pi a}-1)}.
$$

よって占有数の指数は $\omega/T_H=2\pi\omega/\kappa$ であり、$T_H=\kappa/(2\pi)$。

**（3）** $u_n=2\pi n/\epsilon$ とし、$\Delta=u_n-\kappa^{-1}\log(A\omega')$ を置きます。Gamma型振幅の緩やかな $\omega$ 依存部分を帯域中央 $\omega_j$ で固定すると、Fourier積分は $\epsilon e^{i\omega_j\Delta}\operatorname{sinc}(\epsilon\Delta/2)$。従って

$$
|\beta_{jn,\omega'}|^2\simeq
\frac\epsilon{2\pi\kappa\omega'(e^{2\pi\omega_j/\kappa}-1)}
\operatorname{sinc}^2(\epsilon\Delta/2).
$$

$z=\kappa^{-1}\log(A\omega')$ で $d\omega'/\omega'=\kappa dz$ とすると、$\int_{-\infty}^{\infty}\operatorname{sinc}^2 t\,dt=\pi$ より積分は $2\pi\kappa/\epsilon$。したがって $N_{jn}\simeq(e^{2\pi\omega_j/\kappa}-1)^{-1}$。単色で発散した $\int d\omega'/\omega'$ に波束の位相局在が入り、有限になります。

**（4）** 球対称4次元場では、出射モードが角運動量ごとの有効ポテンシャルで反射・透過します。その透過係数なしに無限遠の流束は決まりません。また実際の光線写像の初期部分は指数近似ではないため、有限時刻の波束には過渡補正があり得ます。中心入射周波数 $\omega'_{\rm center}=A^{-1}e^{\kappa u_n}$ は遅い時刻に指数増大し、超高周波領域での近似の妥当性も別問題です。温度パラメータの計算は、これらを無条件に解決しません。
<!-- solution-end -->
