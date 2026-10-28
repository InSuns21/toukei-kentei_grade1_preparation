# QFT12 散乱の運動学・不変位相空間・崩壊率と断面積

<!-- definition-example-audit: strict -->

[QFT11のLSZ還元](../QFT11/index.md#thm-qft11-lsz-four-leg)は、相関関数から運動量保存デルタを取り除いた振幅 $\mathcal M$ を与えました。しかし振幅の二乗だけでは、検出器が単位時間に何件の散乱を数えるかは決まりません。終状態として許される運動量の数と、入射粒子が互いに出会う頻度がまだ入っていないからです。

例えば同じ定数振幅でも、反応後の粒子が重すぎれば終状態は存在せず、二つの同種粒子を「粒子3、粒子4」と入れ替えて二度数えても実験結果は二倍にはなりません。この章では質量殻とエネルギー運動量保存からその両方を明示し、振幅を崩壊率・断面積に変換します。

時空は $3+1$ 次元Minkowski空間、$\eta=\operatorname{diag}(1,-1,-1,-1)$、$c=\hbar=1$ とします。散乱の入出射および崩壊の終状態で扱う安定なスカラー粒子は正エネルギー質量殻 $p^2=m^2,\ p^0>0$ に乗り、[QFT11の一粒子規格化](../QFT11/index.md#def-qft11-invariant-packet)

$$
\langle\boldsymbol p|\boldsymbol q\rangle
=(2\pi)^3\,2E_{\boldsymbol p}\delta^{(3)}(\boldsymbol p-\boldsymbol q),
\qquad
d\Pi_p=\frac{d^3\boldsymbol p}{(2\pi)^3\,2E_{\boldsymbol p}}
$$

を使います。断面積への同定には[漸近状態とS行列](../QFT11/index.md#def-qft11-asymptotic-s)の存在を仮定し、平面波と時間・体積のデルタは正規化した波束または有限箱の極限で理解します。崩壊する親粒子は厳密には安定な無限時間の漸近状態ではありません。崩壊率の導出では弱結合・狭幅の準安定状態を準備し、その寿命より短い時間での最低非零次数を計算します。

## 1. 何が運動学だけで決まるか

最初に反応 $1+2\to3+4$ を考えます。$p_1,p_2$ は入射、$p_3,p_4$ は出射の四運動量で、各粒子の質量は $m_a\ge0$ です。量子論的な頂点を一つも計算しなくても、保存則 $p_1+p_2=p_3+p_4$ が使えます。

<a id="def-qft12-mandelstam"></a>

<!-- formal-statement-start -->
> **定義（Mandelstam不変量と二体反応の重心系）**  
> 正エネルギー質量殻 $p_a^2=m_a^2$ にある四粒子が $p_1+p_2=p_3+p_4$ を満たす $2\to2$ 反応に対し、Lorentz不変量を

$$
s=(p_1+p_2)^2,\qquad
t=(p_1-p_3)^2,\qquad
u=(p_1-p_4)^2
$$

> とする。全空間運動量 $\boldsymbol p_1+\boldsymbol p_2=0$ となる慣性系を**重心系**とする。この系では全エネルギーは $\sqrt s>0$、入射と出射の運動量の大きさをそれぞれ $p_{\mathrm i},p_{\mathrm f}$ と書く。入射粒子1の方向と出射粒子3の方向のなす角を $\theta$ とする。
<!-- formal-statement-end -->

この定義は振幅がどの関数になるかを指定しません。Lorentz対称なスカラー散乱なら、質量を固定した振幅を $\mathcal M(s,t)$ などで表す際の引数を準備しただけです。

<!-- definition-example-start: def-qft12-mandelstam -->
### 例：等質量の弾性散乱で三つの量を調べる

**定義の確認**：四粒子の質量が同じ $m>0$ で、重心系で入射が $(E,0,0,\pm p)$、出射粒子3が $(E,p\sin\theta,0,p\cos\theta)$ なら $E^2=p^2+m^2$ です。各四運動量の二乗は $m^2$、空間運動量の和は零となり、定義の質量殻・重心系条件を満たします。定義へ代入して

$$
s=4E^2,\qquad
t=-2p^2(1-\cos\theta),\qquad
u=-2p^2(1+\cos\theta).
$$

実際に $s+t+u=4(E^2-p^2)=4m^2$ で、後述する一般の質量殻恒等式を満たします。$t\le0$ で、前方散乱 $\theta=0$ では $t=0$ となることも定義から直接確かめられます。
<!-- definition-example-end -->

重心系のエネルギーと運動量を質量から求めるため、三変数の多項式

$$
\lambda(x,y,z)=x^2+y^2+z^2-2xy-2yz-2zx
=[x-(\sqrt y+\sqrt z)^2][x-(\sqrt y-\sqrt z)^2]
$$

を使います。最後の因数分解は $y,z\ge0$ での表示で、平方根の枝を指定した式です。この多項式が閾値を一目で見せます。

<a id="prop-qft12-cm-momentum"></a>

<!-- formal-statement-start -->
> **命題（重心系二体運動量とKällén関数）**  
> 正エネルギー四運動量が保存する $1+2\to3+4$ について、$s=(p_1+p_2)^2$ とし、$s>(m_1+m_2)^2$、$s>(m_3+m_4)^2$ と仮定する。重心系で

$$
\begin{aligned}
E_1&=\frac{s+m_1^2-m_2^2}{2\sqrt s},
&E_3&=\frac{s+m_3^2-m_4^2}{2\sqrt s},\\
p_{\mathrm i}&=\frac{\sqrt{\lambda(s,m_1^2,m_2^2)}}{2\sqrt s},
&p_{\mathrm f}&=\frac{\sqrt{\lambda(s,m_3^2,m_4^2)}}{2\sqrt s}.
\end{aligned}
$$

> また、質量殻と保存則から

$$
s+t+u=m_1^2+m_2^2+m_3^2+m_4^2,
\qquad
t=m_1^2+m_3^2-2E_1E_3+2p_{\mathrm i}p_{\mathrm f}\cos\theta.
$$

> 二粒子の正エネルギーを同時に実現できるのは、それぞれの側で $\sqrt s\ge m_a+m_b$ のときに限る。等号は二体の相対運動量が零となる閾値であり、上の角度式は閾値の内側から極限として読む。
<!-- formal-statement-end -->

### 証明の見取り図

総運動量を $P=(\sqrt s,\boldsymbol0)$ と置くと、$P\cdot p_1=(s+m_1^2-m_2^2)/2$ です。これで $E_1$ が決まり、$p_{\mathrm i}^2=E_1^2-m_1^2$ を因数分解するとKällén関数になります。最後に四運動量の内積を展開します。

<!-- proof-start -->
### 証明

$p_2=P-p_1$ と $p_2^2=m_2^2$ を使うと

$$
m_2^2=(P-p_1)^2=s+m_1^2-2P\cdot p_1
=s+m_1^2-2\sqrt s\,E_1.
$$

従って $E_1=(s+m_1^2-m_2^2)/(2\sqrt s)$ であり、

$$
\begin{aligned}
4s\,p_{\mathrm i}^2
&=(s+m_1^2-m_2^2)^2-4sm_1^2\\
&=s^2+m_1^4+m_2^4-2sm_1^2-2sm_2^2-2m_1^2m_2^2\\
&=\lambda(s,m_1^2,m_2^2).
\end{aligned}
$$

出射側に $p_4=P-p_3$ を用いれば $E_3,p_{\mathrm f}$ も同じ計算で得られます。正エネルギーで $E_a\ge m_a$ だから $\sqrt s=E_1+E_2\ge m_1+m_2$ です。逆に $\sqrt s\ge m_1+m_2$ のとき、上の二体運動量は実数で、$E_{1,2}$ は非負（質量が正なら正）となるので重心系を構成できます。

四運動量の二乗を展開し、

$$
\begin{aligned}
s+t+u
&=m_1^2+m_2^2+2p_1\cdot p_2
+m_1^2+m_3^2-2p_1\cdot p_3\\
&\quad +m_1^2+m_4^2-2p_1\cdot p_4\\
&=3m_1^2+m_2^2+m_3^2+m_4^2
+2p_1\cdot(p_2-p_3-p_4)\\
&=\sum_{a=1}^4m_a^2
\end{aligned}
$$

を得ます。最終行では $p_2-p_3-p_4=-p_1$ を使いました。重心系で $\boldsymbol p_1\cdot\boldsymbol p_3=p_{\mathrm i}p_{\mathrm f}\cos\theta$ とすれば $p_1\cdot p_3=E_1E_3-p_{\mathrm i}p_{\mathrm f}\cos\theta$ なので $t$ の式も従います。
<!-- proof-end -->

この結果から、同じ $s$ でも重心系での散乱角が異なれば $t$ が変わります。逆に $p_{\mathrm i}p_{\mathrm f}>0$ であれば $t$ の変域は $\cos\theta=\pm1$ を代入して求められます。これが角度分布を $t$ について積分する際の橋になります。

## 2. 終状態の数え方は質量殻上の積分である

終状態の各運動量を独立に積分すると、エネルギー・運動量を保存しない候補まで数えてしまいます。そこで[QFT11の不変一粒子測度](../QFT11/index.md#def-qft11-invariant-packet)の積に四次元デルタを掛け、保存則を満たす点だけを残します。

<a id="def-qft12-phase-space"></a>

<!-- formal-statement-start -->
> **定義（Lorentz不変終状態位相空間）**  
> 正エネルギーの安定な終状態粒子 $n$ 個の質量を $m_j\ge0$、四運動量を $k_j$ とし、時間的な全四運動量 $P$ が $P^2>0$, $P^0>0$ を満たすとする。ラベル付きの終状態位相空間測度を

$$
d\Phi_n(P;k_1,\ldots,k_n)
=(2\pi)^4\delta^{(4)}\!\left(P-\sum_{j=1}^n k_j\right)
\prod_{j=1}^n\frac{d^3\boldsymbol k_j}{(2\pi)^3\,2E_j},
\qquad E_j=\sqrt{|\boldsymbol k_j|^2+m_j^2}
$$

> とする。同種終状態を入れ替えても物理的状態が変わらず、振幅と観測量がその入れ替えに対称なら、同じ状態を重複計数しないための因子 $1/S_{\mathrm f}$ を別に掛ける。複数の同種粒子群の個数が $n_a$ なら $S_{\mathrm f}=\prod_a n_a!$ とする。
<!-- formal-statement-end -->

各因子は四次元表示

$$
\frac{d^3\boldsymbol k}{(2\pi)^3\,2E_{\boldsymbol k}}
=\frac{d^4k}{(2\pi)^3}\,
\theta(k^0)\delta(k^2-m^2)
$$

へ変えられます。正エネルギーの根だけを選び、その根でのデルタのJacobian $1/(2E_{\boldsymbol k})$ を取るためです。従って $d\Phi_n$ は固有Lorentz変換に不変です。等粒子因子は**振幅の頂点やLSZ外線の係数ではなく、ラベル付き終状態を積分する段階**の補正です。

<!-- definition-example-start: def-qft12-phase-space -->
### 例：同種二粒子のラベル交換を直接数える

**定義の確認**：一個の粒子が二個の同種粒子へ崩壊するとき、終状態 $(\boldsymbol k,-\boldsymbol k)$ と $(-\boldsymbol k,\boldsymbol k)$ は同じFock状態です。両方とも正エネルギー質量殻を満たし、運動量の和は親粒子の静止系で零です。ラベル付き積分はこの二つを別々に数え、運動量の入れ替えで $d\Phi_2$ と $|\mathcal M|^2$ が不変なら積分値が二倍になります。そこで $S_{\mathrm f}=2!$ を用います。異種粒子AとBなら $(A,\boldsymbol k;B,-\boldsymbol k)$ と $(A,-\boldsymbol k;B,\boldsymbol k)$ は区別できるため、この $1/2!$ は付けません。
<!-- definition-example-end -->

二体位相空間には、積分で残る自由度が方向の二角だけという利点があります。次の式では出射質量を $m_3,m_4$ とし、$\boldsymbol k_3$ の立体角を $d\Omega=d\varphi\,d(\cos\theta)$ の絶対測度として扱います。

<a id="prop-qft12-two-body-phase-space"></a>

<!-- formal-statement-start -->
> **命題（二体位相空間の角度表示）**  
> 時間的な $P$ が $P^2=s>(m_3+m_4)^2$ を満たし、正エネルギーの二粒子に分解されるとする。重心系で終状態運動量の大きさを

$$
p_{\mathrm f}=\frac{\sqrt{\lambda(s,m_3^2,m_4^2)}}{2\sqrt s}
$$

> とすると、ラベル付き二体位相空間は

$$
\boxed{\displaystyle
\frac{d\Phi_2}{d\Omega}
=\frac{p_{\mathrm f}}{16\pi^2\sqrt s}
=\frac{\sqrt{\lambda(s,m_3^2,m_4^2)}}{32\pi^2s}}
$$

> である。積分する関数が角度によらなければ $\int d\Phi_2=p_{\mathrm f}/(4\pi\sqrt s)$ となる。ここには同種粒子の $1/S_{\mathrm f}$ は含まない。
<!-- formal-statement-end -->

### 証明の見取り図

運動量デルタで $\boldsymbol k_4=-\boldsymbol k_3$ とした後、エネルギーデルタで運動量の絶対値を固定します。そのデルタの導関数を忘れると、断面積が誤った係数・次元になります。

<!-- proof-start -->
### 証明

重心系で $P=(\sqrt s,\boldsymbol0)$ と置き、$\boldsymbol k_3=\boldsymbol k$、$k=|\boldsymbol k|$ とします。空間運動量デルタで $\boldsymbol k_4=-\boldsymbol k$ を積分すると

$$
d\Phi_2
=\frac{1}{16\pi^2}
\frac{k^2\,dk\,d\Omega}{E_3(k)E_4(k)}
\delta(\sqrt s-E_3(k)-E_4(k)).
$$

関数 $h(k)=\sqrt s-E_3(k)-E_4(k)$ の正の根は[重心系運動量の命題](#prop-qft12-cm-momentum)による $p_{\mathrm f}$ です。$p_{\mathrm f}>0$ で

$$
|h'(p_{\mathrm f})|
=p_{\mathrm f}\left(\frac1{E_3}+\frac1{E_4}\right)
=\frac{p_{\mathrm f}\sqrt s}{E_3E_4}.
$$

従って $\delta(h(k))=\delta(k-p_{\mathrm f})E_3E_4/(p_{\mathrm f}\sqrt s)$ を積分へ代入すると

$$
\frac{d\Phi_2}{d\Omega}
=\frac1{16\pi^2}\frac{p_{\mathrm f}^2}{E_3E_4}
\frac{E_3E_4}{p_{\mathrm f}\sqrt s}
=\frac{p_{\mathrm f}}{16\pi^2\sqrt s}.
$$

$\int d\Omega=4\pi$ なので角度非依存の積分式も従います。閾値では $h'(0)=0$ なので、このデルタ変数変換そのものは閾値の内点で行い、閾値へは上の最終式の片側極限を取ります。
<!-- proof-end -->

例えば質量零の異種二粒子なら $p_{\mathrm f}=\sqrt s/2$ なので、$d\Phi_2/d\Omega=1/(32\pi^2)$、全角で $1/(8\pi)$ です。逆に重い終状態で $p_{\mathrm f}\to0$ なら、有限の振幅に対する位相空間の寄与は消えます。

## 3. 振幅の二乗から確率率へ

次に、$S=I+iT$ のうち恒等寄与ではない遷移を考えます。[QFT11の連結振幅](../QFT11/index.md#def-qft11-lsz-amputation)を使い、入射と出射の合計四運動量を $P_{\mathrm i},P_{\mathrm f}$ とすると

$$
\langle f|iT|i\rangle_c
=i(2\pi)^4\delta^{(4)}(P_{\mathrm i}-P_{\mathrm f})\,\mathcal M_{i\to f}
$$

です。ただしこの平面波式をそのまま絶対値二乗するとデルタの二乗が現れます。有限箱・有限時間で確率へ戻す必要があります。

<a id="def-qft12-rate-cross-section"></a>

<!-- formal-statement-start -->
> **定義（崩壊率と入射流束による断面積）**  
> 安定な漸近粒子をもつ理論で、長い観測時間 $T$ に指定終状態へ遷移する確率を $P_{i\to f}(T)$ とする。初期粒子が一個なら、その静止系での遷移確率率 $\Gamma$ を $\lim_{T\to\infty}P_{i\to f}(T)/T$ とする（寿命を与える弱い結合の最低非零次数での定義）。初期粒子が二個なら、遷移確率率を、単位面積・単位時間当たりの入射対の流束で割った量を断面積 $\sigma$ とする。
>
> 二粒子の正エネルギー四運動量を $p_1,p_2$ としたとき、計算に使う不変流束因子を

$$
\mathcal F=\sqrt{(p_1\cdot p_2)^2-m_1^2m_2^2},
\qquad
4\mathcal F=4E_1E_2\,v_{\mathrm M},
\qquad
v_{\mathrm M}=\frac{\mathcal F}{E_1E_2}
$$

> と表す。$E_1,E_2$ は選んだ慣性系の粒子エネルギーであり、$v_{\mathrm M}$ は入射束を計算するMøller因子である。
<!-- formal-statement-end -->

$v_{\mathrm M}$ は**一般の二粒子の相対速度の大きさではありません**。対向する高エネルギー粒子では2へ近づくことがあり、光速を超える物体の運動を意味しません。物理的な量はこの値単独でなく、入射状態の密度・規格化と組み合わせた流束です。

<!-- definition-example-start: def-qft12-rate-cross-section -->
### 例：静止標的に一個の粒子を当てる

**定義の確認**：粒子2が静止し $p_2=(m_2,\boldsymbol0)$、粒子1が $p_1=(E_1,\boldsymbol p_1)$、$m_2>0$ なら、両者の質量殻と $E_1>0$ を満たします。この具体例で不変内積 $p_1\cdot p_2=E_1m_2$ を流束の定義へ代入すると

$$
\mathcal F
=\sqrt{E_1^2m_2^2-m_1^2m_2^2}
=m_2|\boldsymbol p_1|,
\qquad
v_{\mathrm M}=\frac{|\boldsymbol p_1|}{E_1}.
$$

これは静止標的から見た入射粒子の速度の大きさで、通常の粒子数密度×速さの流束と一致します。この例ではMøller因子を速度と読んでもよい理由を、標的静止条件から確認できました。
<!-- definition-example-end -->

<a id="thm-qft12-rate-formulas"></a>

<!-- formal-statement-start -->
> **定理（S行列規格化からの崩壊率と断面積）**  
> 散乱の入出射と崩壊の終状態は正エネルギーの安定な漸近粒子であり、崩壊の親粒子は弱結合・狭幅の準安定状態として準備するとする。[QFT11型の相対論的一粒子規格化](../QFT11/index.md#def-qft11-invariant-packet)、エネルギー運動量保存、有限箱・有限時間からの率の極限（崩壊では寿命に比べて短い時間での摂動次数）が定義できると仮定する。終状態のラベル付き位相空間を $d\Phi_n$、同種粒子の重複計数因子を $S_{\mathrm f}$、連結不変振幅を $\mathcal M$ とする。質量 $M>0$ の一個の初期粒子の静止系崩壊率、及び二個の入射粒子による散乱断面積は、それぞれ

$$
\boxed{\displaystyle
d\Gamma=\frac{|\mathcal M|^2}{2M\,S_{\mathrm f}}\,d\Phi_n},
\qquad
\boxed{\displaystyle
d\sigma=\frac{|\mathcal M|^2}{4\mathcal F\,S_{\mathrm f}}\,d\Phi_n},
\quad
\mathcal F=\sqrt{(p_1\cdot p_2)^2-m_1^2m_2^2}.
$$

> 散乱公式では $\mathcal F>0$ を仮定する。入射のスピン平均や終状態のスピン和が必要なら $|\mathcal M|^2$ の部分で行う。式は適切に正規化された散乱波束の局在領域または有限箱の極限に関する率を与えるもので、任意の相互作用の厳密な $S$ 行列の存在まで含意しない。
<!-- formal-statement-end -->

### 証明の見取り図

箱の体積を $V$、観測時間を $T$ として、正規化した一粒子あたり $1/\sqrt{2EV}$ を振幅に掛けます。振幅のエネルギーデルタを二乗すると観測時間 $T$ が現れ、終状態の和を積分へ移すと $d\Phi_n$ が現れます。一粒子初期状態なら $1/(2E)$ が残り、二粒子なら単位体積あたりの入射対数に由来する $1/V$ を入射流束で割ります。

<!-- proof-start -->
### 証明

長さ $L$ の周期箱 $V=L^3$ を取り、許された運動量に対する規格化状態を $|\boldsymbol p\rangle_V=|\boldsymbol p\rangle/\sqrt{2E_{\boldsymbol p}V}$ とします。外線が $r$ 本入射、$n$ 本出射の連結遷移の最低非零次数について、平面波の有限時間版は

$$
S^c_{fi}
=\frac{i\mathcal M\,V\delta_{\boldsymbol P_{\mathrm i},\boldsymbol P_{\mathrm f}}}
{\sqrt{\prod_{a=1}^r(2E_aV)\prod_{j=1}^n(2E_jV)}}
\int_{-T/2}^{T/2}e^{i(E_{\mathrm f}-E_{\mathrm i})t}\,dt.
$$

各粒子が箱で正規化されているため、出射粒子の和を $\sum_{\boldsymbol k}\to V\int d^3\boldsymbol k/(2\pi)^3$ とし、長時間極限で

$$
\lim_{T\to\infty}\frac1T
\left|\int_{-T/2}^{T/2}e^{i\omega t}\,dt\right|^2
=2\pi\delta(\omega)
$$

を分布として適用します。離散運動量保存のKroneckerデルタは二乗しても同じであり、連続極限で

$$
\delta_{\boldsymbol P_{\mathrm i},\boldsymbol P_{\mathrm f}}
\longrightarrow \frac{(2\pi)^3}{V}
\delta^{(3)}(\boldsymbol P_{\mathrm i}-\boldsymbol P_{\mathrm f})
$$

です。従って出射 $n$ 粒子を全て和に取った微小遷移率は

$$
\begin{aligned}
dR_{1\to n}
&=\frac{|\mathcal M|^2}{2E_{\mathrm i}}\,d\Phi_n,\\
dR_{2\to n}
&=\frac1V\frac{|\mathcal M|^2}{4E_1E_2}\,d\Phi_n.
\end{aligned}
$$

最初の式は初期一粒子の静止系で $E_{\mathrm i}=M$ とすれば $d\Gamma$ です。一般の慣性系では $\Gamma_{\mathrm{lab}}=(M/E_{\mathrm i})\Gamma_{\mathrm{rest}}$ となり時間の遅れと一致します。二つ目の式では箱の中の入射対の密度に対応する入射流束が $v_{\mathrm M}/V$ なので、これで割ると

$$
d\sigma=\frac{dR_{2\to n}}{v_{\mathrm M}/V}
=\frac{|\mathcal M|^2}{4E_1E_2v_{\mathrm M}}\,d\Phi_n
=\frac{|\mathcal M|^2}{4\mathcal F}\,d\Phi_n.
$$

$v_{\mathrm M}$ は任意慣性系でこの結果がLorentz不変となるように定義した入射束因子であり、標的静止系では直前の例と一致します。最後に、状態の数え上げをラベル付きで行った場合は、同じ物理状態を $S_{\mathrm f}$ 回数数えているので各式を $S_{\mathrm f}$ で割ります。
<!-- proof-end -->

厳密な散乱の確率率を構成するには有限時間近似、波束の空間分離、極限の交換の制御が必要です。ここでの導出は、これらが成立する散乱理論に対する標準の外線規格化を検算するものです。例えば長距離QEDの荷電粒子では通常の孤立一粒子状態という前提自体を調べ直さなければなりません。

## 4. 重心系で角度ごとの断面積を出す

初期二粒子に対する流束を重心系で計算します。$p_1=(E_1,\boldsymbol p)$、$p_2=(E_2,-\boldsymbol p)$ で $\sqrt s=E_1+E_2$ とすると

$$
\begin{aligned}
\mathcal F^2
&=(E_1E_2+p_{\mathrm i}^2)^2-m_1^2m_2^2\\
&=p_{\mathrm i}^2(E_1+E_2)^2
=s\,p_{\mathrm i}^2.
\end{aligned}
$$

二行目では $m_a^2=E_a^2-p_{\mathrm i}^2$ を代入しました。従って $4\mathcal F=4p_{\mathrm i}\sqrt s$ です。

<a id="prop-qft12-cm-cross-section"></a>

<!-- formal-statement-start -->
> **命題（重心系二体微分断面積）**  
> 質量 $m_1,m_2$ の二粒子から質量 $m_3,m_4$ の二粒子への反応で、$s$ が両側の二体閾値より大きく、散乱振幅 $\mathcal M(s,\theta,\varphi)$ と漸近散乱率が定義できるとする。重心系の入射・出射運動量の大きさを $p_{\mathrm i},p_{\mathrm f}>0$ とし、同種終状態の重複計数因子を $S_{\mathrm f}$ とする。このとき

$$
\boxed{\displaystyle
\frac{d\sigma}{d\Omega}
=\frac{1}{64\pi^2s}\frac{p_{\mathrm f}}{p_{\mathrm i}}
\frac{|\mathcal M(s,\theta,\varphi)|^2}{S_{\mathrm f}}}.
$$

> $\mathcal M$ が角度に依存しなければ、全断面積は

$$
\sigma=\frac{1}{16\pi s}\frac{p_{\mathrm f}}{p_{\mathrm i}}
\frac{|\mathcal M|^2}{S_{\mathrm f}}.
$$
<!-- formal-statement-end -->

### 証明の見取り図

新しい場の理論計算は不要です。[率の定理](#thm-qft12-rate-formulas)の $4\mathcal F$ を $4p_{\mathrm i}\sqrt s$ に、[二体位相空間](#prop-qft12-two-body-phase-space)を $p_{\mathrm f}d\Omega/(16\pi^2\sqrt s)$ に置き換えます。

<!-- proof-start -->
### 証明

[崩壊率と断面積の定理](#thm-qft12-rate-formulas)を二体終状態へ適用すると

$$
\frac{d\sigma}{d\Omega}
=\frac{|\mathcal M|^2}{4\mathcal F S_{\mathrm f}}
\frac{d\Phi_2}{d\Omega}.
$$

重心系では $\mathcal F=p_{\mathrm i}\sqrt s$、かつ[位相空間の角度表示](#prop-qft12-two-body-phase-space)から $d\Phi_2/d\Omega=p_{\mathrm f}/(16\pi^2\sqrt s)$ なので

$$
\frac{d\sigma}{d\Omega}
=\frac{|\mathcal M|^2}{4p_{\mathrm i}\sqrt s\,S_{\mathrm f}}
\frac{p_{\mathrm f}}{16\pi^2\sqrt s}
=\frac{p_{\mathrm f}}{p_{\mathrm i}}
\frac{|\mathcal M|^2}{64\pi^2s\,S_{\mathrm f}}.
$$

角度非依存なら $\int d\Omega=4\pi$ を掛けて全断面積の式になります。
<!-- proof-end -->

ここで $p_{\mathrm i}\to0$ にすると断面積に $1/p_{\mathrm i}$ が現れることがあります。これは有限の遷移確率をゼロに近づく入射流束で割るためであり、断面積だけで反応頻度を議論できないことを示します。物理的に観測する率は入射流束と断面積の積です。

## 5. 四次スカラー頂点を観測量まで運ぶ

等質量 $m>0$ の実スカラー $\phi$ に、$-\lambda_4\phi^4/4!$ の相互作用を入れます。[QFT11の木レベルLSZ計算](../QFT11/index.md#prop-qft11-quartic-tree)で、安定な外線を仮定した最低次数の接続振幅は $\mathcal M^{\mathrm{tree}}=-\lambda_4$ です。四本の外線ラベルに対する $4!$ は頂点の $1/4!$ と既に相殺されており、ここで掛け直しません。

<a id="prop-qft12-quartic-total"></a>

<!-- formal-statement-start -->
> **命題（四次スカラー相互作用の木レベル全断面積）**  
> 質量 $m>0$ の同種実スカラー二粒子の弾性 $2\to2$ 散乱を、$s>4m^2$ の重心系で考える。安定な漸近粒子と散乱公式が使え、相互作用 $\mathcal L_I=-\lambda_4\phi^4/4!$ の木レベル振幅を $\mathcal M^{\rm tree}=-\lambda_4$ とする。終状態二粒子は同一粒子なので $S_{\mathrm f}=2!$ であり、最低非零次数の断面積は

$$
\boxed{\displaystyle
\left.\frac{d\sigma}{d\Omega}\right|_{\rm tree}
=\frac{\lambda_4^2}{128\pi^2s},
\qquad
\sigma_{\rm tree}=\frac{\lambda_4^2}{32\pi s}}.
$$

> 右辺は断面積の最低非零次数の寄与であって、全次数で単位性を満たす厳密値の宣言ではない。
<!-- formal-statement-end -->

### 証明の見取り図

弾性散乱では入射と出射の質量が同じなので $p_{\mathrm f}/p_{\mathrm i}=1$ です。最終二粒子の入れ替えだけを $1/2!$ で補正し、全立体角に積分します。

<!-- proof-start -->
### 証明

[重心系運動量](#prop-qft12-cm-momentum)の式で四粒子の質量を $m$ とすれば

$$
p_{\mathrm i}=p_{\mathrm f}
=\frac{\sqrt{s(s-4m^2)}}{2\sqrt s}
=\frac12\sqrt{s-4m^2}.
$$

[重心系二体微分断面積](#prop-qft12-cm-cross-section)に $p_{\mathrm f}/p_{\mathrm i}=1$、$|\mathcal M|^2=\lambda_4^2$、$S_{\mathrm f}=2$ を代入すると

$$
\frac{d\sigma}{d\Omega}
=\frac{1}{64\pi^2s}\frac{\lambda_4^2}{2}
=\frac{\lambda_4^2}{128\pi^2s}.
$$

角度非依存なので全立体角 $4\pi$ で積分して $\sigma_{\rm tree}=\lambda_4^2/(32\pi s)$ です。区別できる終状態なら $S_{\mathrm f}=1$ で同じ定数振幅の断面積は二倍になりますが、ここで外部粒子が同一という物理的条件を無視してはいけません。
<!-- proof-end -->

最後に一次的な崩壊の例も見ておきます。質量 $M>2m$ のスカラー $\Phi$ が、相互作用 $\mathcal L_I=-g\Phi\chi^2/2$ によって質量 $m$ の同種スカラー $\chi$ 二個へ崩壊するとします。木レベル $\mathcal M=-g$ と[二体位相空間](#prop-qft12-two-body-phase-space)、[崩壊率の式](#thm-qft12-rate-formulas)を合わせると

$$
\begin{aligned}
\Gamma(\Phi\to\chi\chi)
&=\frac{g^2}{2M}\frac1{2!}
\frac{p_{\mathrm f}}{4\pi M}\\
&=\frac{g^2}{32\pi M}
\sqrt{1-\frac{4m^2}{M^2}},
\qquad
p_{\mathrm f}=\frac M2\sqrt{1-\frac{4m^2}{M^2}}.
\end{aligned}
$$

崩壊では初期粒子の質量 $M$ が決まり、二体閾値 $M=2m$ で率が零へ近づきます。散乱では同じ位相空間に加え、入射流束が必要です。

## 6. 演習：振幅から観測可能な率まで計算する

特に断らなければ $3+1$ 次元、$\eta=(+---)$、$c=\hbar=1$、正エネルギーの安定スカラー外線と、十分に局在した漸近波束を仮定します。質量殻測度は $d\Pi_p=d^3\boldsymbol p/[(2\pi)^3 2E_{\boldsymbol p}]$ です。振幅 $\mathcal M$ は運動量保存デルタを除いた連結振幅とし、観測量はその最低非零次数で計算します。

### Level A：保存則、Jacobian、流束の一つずつ

### 演習 QFT12-A1：非弾性散乱の不変量と閾値

質量 $m_1,m_2$ の入射粒子から質量 $m_3,m_4$ の粒子へ変わる $2\to2$ 反応で、すべて正エネルギー質量殻にあるとする。$s=(p_1+p_2)^2$、$t=(p_1-p_3)^2$、$u=(p_1-p_4)^2$ と定める。$s+t+u$ を求め、反応の重心系で必要な $s$ の下限を示せ。

- Level: A

<!-- solution-start -->
#### 詳細解答

[Mandelstam不変量の定義](#def-qft12-mandelstam)を展開し、保存則 $p_3+p_4=p_1+p_2$ から

$$
\begin{aligned}
s+t+u
&=3p_1^2+p_2^2+p_3^2+p_4^2
+2p_1\cdot(p_2-p_3-p_4)\\
&=3m_1^2+m_2^2+m_3^2+m_4^2-2m_1^2\\
&=m_1^2+m_2^2+m_3^2+m_4^2.
\end{aligned}
$$

重心系で $\sqrt s=E_1+E_2=E_3+E_4$ です。各粒子のエネルギーは $E_a\ge m_a$ だから

$$
\sqrt s\ge m_1+m_2,\qquad
\sqrt s\ge m_3+m_4.
$$

従って必要十分な二体運動学の条件は $\sqrt s\ge\max(m_1+m_2,m_3+m_4)$ です。等号における相対運動量零の極限は[重心系運動量の式](#prop-qft12-cm-momentum)でも確認できます。
<!-- solution-end -->

### 演習 QFT12-A2：質量零二体の位相空間

全四運動量が $P=(Q,\boldsymbol0)$、$Q>0$ の粒子が異種の質量零二粒子へ崩壊するとする。ラベル付き $d\Phi_2$ の角度密度と全角度積分を、エネルギーデルタの変数変換を明記して求めよ。

- Level: A

<!-- solution-start -->
#### 詳細解答

運動量保存により $\boldsymbol k_4=-\boldsymbol k_3$、$k=|\boldsymbol k_3|$ とすれば $E_3=E_4=k$ です。[二体位相空間の定義](#def-qft12-phase-space)から

$$
d\Phi_2
=\frac{k^2dk\,d\Omega}{16\pi^2k^2}\,
\delta(Q-2k).
$$

$Q-2k$ の根は $k=Q/2$、導関数の絶対値は2なので $\delta(Q-2k)=\delta(k-Q/2)/2$ です。従って

$$
\frac{d\Phi_2}{d\Omega}
=\frac1{16\pi^2}\int_0^\infty dk\,\frac12\delta(k-Q/2)
=\frac1{32\pi^2},
\qquad
\int d\Phi_2=\frac{4\pi}{32\pi^2}=\frac1{8\pi}.
$$

異種の終状態なので $S_{\mathrm f}=1$ です。$1/(2E_3 2E_4)$ だけでなく、残るエネルギーデルタの $1/2$ も含めました。
<!-- solution-end -->

### 演習 QFT12-A3：静止標的の流束

質量 $m_1>0$、運動量 $\boldsymbol p_1$、エネルギー $E_1$ の入射粒子を、静止した質量 $m_2>0$ の標的へ当てる。$4\mathcal F$ と $v_{\mathrm M}$ を求め、非相対論的な低速極限での意味を説明せよ。

- Level: A

<!-- solution-start -->
#### 詳細解答

[不変流束の定義](#def-qft12-rate-cross-section)で $p_2=(m_2,\boldsymbol0)$ とすると $p_1\cdot p_2=m_2E_1$ です。質量殻 $E_1^2-m_1^2=|\boldsymbol p_1|^2$ を使い

$$
\mathcal F
=\sqrt{m_2^2E_1^2-m_1^2m_2^2}
=m_2|\boldsymbol p_1|,
\quad
4\mathcal F=4m_2|\boldsymbol p_1|.
$$

さらに

$$
v_{\mathrm M}
=\frac{\mathcal F}{E_1m_2}
=\frac{|\boldsymbol p_1|}{E_1}
\simeq \frac{|\boldsymbol p_1|}{m_1}
$$

で、最後は $|\boldsymbol p_1|\ll m_1$ の近似です。標的静止系では入射粒子の通常の速さに一致し、単位体積の一個の粒子の入射流束は $v_{\mathrm M}/V$ となります。
<!-- solution-end -->

### 演習 QFT12-A4：角度積分で同じ終状態を二度数えない

静止したスカラーが、質量の等しい二個の粒子へ崩壊する。振幅は運動量の方向に依存せず、終状態の二粒子を交換しても同一である。ラベル付き全立体角積分と、物理的な終状態の数え方を比較せよ。終状態が区別できる場合も答えよ。

- Level: A

<!-- solution-start -->
#### 詳細解答

重心系では出射運動量が $(\boldsymbol k,-\boldsymbol k)$ です。全角度で $\boldsymbol k$ を積分すると、反対方向 $-\boldsymbol k$ を粒子3の運動量とした点も含まれます。同一粒子の場合、前者と後者は作成演算子の順序だけが異なる同じ状態なので、[位相空間の定義](#def-qft12-phase-space)の積分へ $1/S_{\mathrm f}=1/2!$ を掛けます。角度非依存の積分なら

$$
\frac1{2!}\int_{4\pi}d\Omega
=\frac12\,4\pi=2\pi.
$$

これは互いに反対方向を同一視して半球分だけ積分することと等価です。ただし半球で数えるなら**さらに** $1/2!$ を掛けてはいけません。終状態が異種粒子ならどちらがどちらの方向へ進むかで区別でき、$S_{\mathrm f}=1$、角度範囲は $4\pi$ です。
<!-- solution-end -->

### 演習 QFT12-A5：角度から運動量移行量へ

等質量 $m>0$ の弾性 $2\to2$ 反応を重心系で考え、$s>4m^2$ とする。$t=(p_1-p_3)^2$ を散乱角 $\theta$ で表し、$t$ の変域と $dt/d(\cos\theta)$ を求めよ。

- Level: A

<!-- solution-start -->
#### 詳細解答

[重心系二体運動量](#prop-qft12-cm-momentum)から $p_{\mathrm i}=p_{\mathrm f}=p=\sqrt{s/4-m^2}$、$E_1=E_3=\sqrt s/2$ です。角度式に代入すると

$$
\begin{aligned}
t&=2m^2-2(s/4)+2p^2\cos\theta\\
&=-2p^2(1-\cos\theta).
\end{aligned}
$$

$-1\le\cos\theta\le1$ だから $-4p^2\le t\le0$、また

$$
\frac{dt}{d(\cos\theta)}=2p^2>0.
$$

従って角度積分を $t$ に直すときは $d\Omega=2\pi\,dt/(2p^2)$（方位角非依存の場合）となります。$p=0$ の閾値ではこの変数変換は退化します。
<!-- solution-end -->

### Level B：運動学と率の公式を接続する

### 演習 QFT12-B1：異種二体崩壊

静止質量 $M>m_a+m_b>0$ のスカラーが、質量 $m_a,m_b$ の異種スカラー二個へ崩壊する。木レベル振幅が角度非依存の $\mathcal M=-g$ と与えられたとき、全崩壊率を $M,m_a,m_b,g$ で表せ。さらに $m_a=m_b=m$ でも二粒子が異種のままの場合と、同種になる場合を比べよ。

- Level: B

<!-- solution-start -->
#### 詳細解答

静止系で $s=M^2$ とし、[二体運動量](#prop-qft12-cm-momentum)は

$$
p_{\mathrm f}
=\frac{\sqrt{\lambda(M^2,m_a^2,m_b^2)}}{2M}.
$$

[崩壊率の定理](#thm-qft12-rate-formulas)に $S_{\mathrm f}=1$ と[二体位相空間](#prop-qft12-two-body-phase-space)を代入して

$$
\begin{aligned}
\Gamma
&=\frac{g^2}{2M}\int d\Phi_2
=\frac{g^2}{2M}\frac{p_{\mathrm f}}{4\pi M}\\
&=\frac{g^2\sqrt{\lambda(M^2,m_a^2,m_b^2)}}{16\pi M^3}.
\end{aligned}
$$

二つの質量が偶然同じでも粒子種が異なれば $S_{\mathrm f}=1$ です。$m_a=m_b=m$ なら $\lambda(M^2,m^2,m^2)=M^2(M^2-4m^2)$ なので

$$
\Gamma_{\mathrm{distinct}}
=\frac{g^2}{16\pi M}\sqrt{1-\frac{4m^2}{M^2}}.
$$

同種二粒子ならラベル付き位相空間を二度数えているため、$1/2!$ で割り

$$
\Gamma_{\mathrm{identical}}
=\frac{g^2}{32\pi M}\sqrt{1-\frac{4m^2}{M^2}}.
$$

これは同じ振幅 $-g$ を仮定した比較であり、ラグランジアンの結合定数を同じ文字で書いた場合に両頂点規則まで同じとは限らない点は区別します。
<!-- solution-end -->

### 演習 QFT12-B2：四次接触相互作用の断面積

質量 $m>0$ の同種実スカラー二粒子の弾性散乱で、$\mathcal L_I=-\lambda_4\phi^4/4!$ とする。$s>4m^2$、木レベル $\mathcal M=-\lambda_4$、漸近粒子の存在を仮定し、$d\sigma/d\Omega$ と $\sigma$ を計算せよ。$p_{\mathrm i}\to0^+$ での断面積と単位体積の入射流束の傾向も説明せよ。

- Level: B

<!-- solution-start -->
#### 詳細解答

[QFT11の四次頂点](../QFT11/index.md#prop-qft11-quartic-tree)は $|\mathcal M|^2=\lambda_4^2$ です。弾性なので [重心系の運動量](#prop-qft12-cm-momentum)により $p_{\mathrm f}=p_{\mathrm i}$、同種終状態は $S_{\mathrm f}=2$ です。[二体微分断面積](#prop-qft12-cm-cross-section)へ代入すると

$$
\frac{d\sigma}{d\Omega}
=\frac{\lambda_4^2}{64\pi^2s}\frac12
=\frac{\lambda_4^2}{128\pi^2s}.
$$

全角積分は $4\pi$ を掛けるので

$$
\sigma=\frac{\lambda_4^2}{32\pi s}.
$$

閾値へ近づくと $s\to4m^2$ で $\sigma\to\lambda_4^2/(128\pi m^2)$ と有限です。一方、重心系のMøller因子は $v_{\mathrm M}=p_{\mathrm i}(E_1+E_2)/(E_1E_2)$、等質量 $E_1=E_2=\sqrt s/2$ なので $v_{\mathrm M}=4p_{\mathrm i}/\sqrt s\to0$。従って一定体積の一対について観測する遷移率 $v_{\mathrm M}\sigma/V$ は零へ向かいます。断面積の極限と実際の率は別です。
<!-- solution-end -->

### 演習 QFT12-B3：対向ビームのMøller因子

重心系で質量 $m>0$、エネルギー $E=\sqrt{p^2+m^2}$ の二粒子がそれぞれ運動量 $\boldsymbol p$ と $-\boldsymbol p$ で入射する。$\mathcal F$、$v_{\mathrm M}$ を求め、$p\gg m$ で $v_{\mathrm M}$ が2へ近づくことを示せ。それが相対速度の光速超過を意味しない理由も説明せよ。

- Level: B

<!-- solution-start -->
#### 詳細解答

$p_1=(E,\boldsymbol p)$、$p_2=(E,-\boldsymbol p)$ だから $p_1\cdot p_2=E^2+p^2=m^2+2p^2$ です。[不変流束の定義](#def-qft12-rate-cross-section)から

$$
\begin{aligned}
\mathcal F^2
&=(m^2+2p^2)^2-m^4\\
&=4p^2(m^2+p^2)=4p^2E^2,
\end{aligned}
$$

従って $\mathcal F=2pE$、$4\mathcal F=8pE$、$v_{\mathrm M}=2p/E$ です。$p\gg m$ なら $E/p\to1$ なので $v_{\mathrm M}\to2$ です。

これは二つの粒子の速度の和を入射密度の規格化と組み合わせた**流束因子**です。片方の粒子の静止系で測る相対速度はLorentz速度合成則から

$$
v_{\mathrm{rel}}
=\frac{(p/E)+(p/E)}{1+(p/E)^2}
=\frac{2pE}{E^2+p^2}<1
$$

で、混同すると光速制限を誤解します。Møller因子を物理的な相対速度と同一視しないことが必要です。
<!-- solution-end -->

### 演習 QFT12-B4：角度依存振幅を積分する

重心系で等質量 $m>0$ の、互いに区別できる二種類のスカラーの弾性 $2\to2$ 散乱を考え、$s>4m^2$ とする。終状態も区別可能で $S_{\mathrm f}=1$ である。最低次数の振幅を

$$
\mathcal M(\theta)
=-\frac{g^2}{a+b(1-\cos\theta)},
\qquad a>0,\ b>0
$$

とする（$g$ は質量次元1、$a,b$ は質量次元2）。全断面積を求め、$b\to0$ の極限を定数振幅の公式と比較せよ。

- Level: B

<!-- solution-start -->
#### 詳細解答

弾性なので $p_{\mathrm f}/p_{\mathrm i}=1$ です。[重心系二体微分断面積](#prop-qft12-cm-cross-section)に代入して

$$
\frac{d\sigma}{d\Omega}
=\frac{g^4}{64\pi^2s[a+b(1-\cos\theta)]^2}.
$$

$x=\cos\theta$ と置き、方位角については $0\le\varphi<2\pi$ を積分します。$b>0$ の下で

$$
\begin{aligned}
\int_{-1}^{1}\frac{dx}{[a+b(1-x)]^2}
&=\left[\frac{1}{b[a+b(1-x)]}\right]_{x=-1}^{x=1}\\
&=\frac1b\left(\frac1a-\frac1{a+2b}\right)\\
&=\frac{2}{a(a+2b)}.
\end{aligned}
$$

よって

$$
\sigma=\frac{g^4}{64\pi^2s}\,2\pi
\frac{2}{a(a+2b)}
=\frac{g^4}{16\pi s\,a(a+2b)}.
$$

$b\to0$ では振幅が $-g^2/a$ に近づくので、上式は $\sigma\to g^4/(16\pi s a^2)$ です。これは $S_{\mathrm f}=1$ での角度非依存振幅の全断面積 $\sigma=|\mathcal M|^2/(16\pi s)$ に一致します。次元も $g^4/[s\,a(a+2b)]$ が質量の $-2$ 乗となり、断面積として整合します。
<!-- solution-end -->

### Level C：二種類の場の反応を最後まで設計する

### 演習 QFT12-C1：非弾性スカラー散乱の閾値・角度・率

実スカラー場 $\phi,\chi$ の質量をそれぞれ $m,\mu>0$ とする。相互作用 $\mathcal L_I=-\lambda\phi^2\chi^2/4$ により、二個の同種 $\phi$ が二個の同種 $\chi$ へ散乱する $2\to2$ 反応を考える。漸近粒子の存在、木レベル $\mathcal M=-\lambda$、$s>4\max(m^2,\mu^2)$ を仮定する。

1. 重心系の $p_{\mathrm i},p_{\mathrm f}$ と、反応可能な $s$ の閾値を求めよ。
2. $t=(p_1-p_3)^2$、$u=(p_1-p_4)^2$ を $\cos\theta$ で表し、$s+t+u$ を検算せよ。
3. $d\sigma/d\Omega$、全断面積 $\sigma$ を求め、終状態の同種粒子因子がどこで必要か説明せよ。
4. $\mu>m$ の場合の出射閾値 $s\downarrow4\mu^2$ での $\sigma$ の挙動を求めよ。逆に $m>\mu$ で $s\downarrow4m^2$ のとき、入射流束と $\sigma$ の積がどうなるか説明せよ。

- Level: C

<!-- solution-start -->
#### 詳細解答

**(1) 運動量と閾値。** [Källén関数の命題](#prop-qft12-cm-momentum)で入射の二つの質量はともに $m$、出射はともに $\mu$ です。従って

$$
\begin{aligned}
p_{\mathrm i}
&=\frac{\sqrt{\lambda(s,m^2,m^2)}}{2\sqrt s}
=\frac12\sqrt{s-4m^2},\\
p_{\mathrm f}
&=\frac{\sqrt{\lambda(s,\mu^2,\mu^2)}}{2\sqrt s}
=\frac12\sqrt{s-4\mu^2}.
\end{aligned}
$$

両側で正エネルギーの実運動量が存在する条件は $s\ge4m^2$ かつ $s\ge4\mu^2$ なので、閾値は $s=4\max(m^2,\mu^2)$ です。厳密な散乱断面積の公式では $p_{\mathrm i}>0$ として閾値外側から極限を取ります。

**(2) 角度。** 等質量の各組では $E_1=E_2=E_3=E_4=\sqrt s/2$ です。出射粒子3の方向を入射粒子1から $\theta$ とし、出射粒子4は反対方向なので

$$
\begin{aligned}
t&=m^2+\mu^2-\frac s2+2p_{\mathrm i}p_{\mathrm f}\cos\theta,\\
u&=m^2+\mu^2-\frac s2-2p_{\mathrm i}p_{\mathrm f}\cos\theta.
\end{aligned}
$$

和は $t+u=2m^2+2\mu^2-s$、従って $s+t+u=2m^2+2\mu^2$ で、質量殻恒等式を満たします。

**(3) 断面積。** 二個の同種終状態 $\chi\chi$ をラベル付き積分で数えるので $S_{\mathrm f}=2!$ です。[重心系微分断面積](#prop-qft12-cm-cross-section)へ $|\mathcal M|^2=\lambda^2$ と運動量比を代入すると

$$
\frac{d\sigma}{d\Omega}
=\frac{\lambda^2}{128\pi^2s}
\sqrt{\frac{s-4\mu^2}{s-4m^2}}.
$$

角度非依存なので全角度 $4\pi$ を積分して

$$
\boxed{\displaystyle
\sigma_{\phi\phi\to\chi\chi}
=\frac{\lambda^2}{32\pi s}
\sqrt{\frac{s-4\mu^2}{s-4m^2}}}.
$$

頂点の $1/(2!2!)$ はWick収縮時に外線ラベルの数え上げと既に相殺されています。**この** $1/2!$ は、同じ $\chi$ 終状態を $(k_3,k_4)$ と $(k_4,k_3)$ の二通りで積分する重複を除くもので、振幅にさらに $1/2$ を掛けて二乗する操作ではありません。

**(4) 閾値と流束。** $\mu>m$ なら出射閾値 $s\downarrow4\mu^2$ では $p_{\mathrm f}\to0$ ですが $p_{\mathrm i}\to\sqrt{\mu^2-m^2}>0$ です。従って $\sigma\propto p_{\mathrm f}\to0$ となります。これは終状態の位相空間が閉じるためです。

$m>\mu$ では入射閾値 $s\downarrow4m^2$ で $p_{\mathrm i}\to0$、$p_{\mathrm f}\to\sqrt{m^2-\mu^2}>0$ だから $\sigma\propto1/p_{\mathrm i}$ と増大します。しかし重心系の[流束因子](#def-qft12-rate-cross-section)は、$E_1=E_2=\sqrt s/2$ より

$$
v_{\mathrm M}
=\frac{\mathcal F}{E_1E_2}
=\frac{p_{\mathrm i}\sqrt s}{s/4}
=\frac{4p_{\mathrm i}}{\sqrt s}.
$$

従って箱中の一入射対の遷移率に比例する積は

$$
v_{\mathrm M}\sigma
=\frac{4p_{\mathrm i}}{\sqrt s}
\frac{\lambda^2}{32\pi s}\frac{p_{\mathrm f}}{p_{\mathrm i}}
=\frac{\lambda^2p_{\mathrm f}}{8\pi s^{3/2}}
$$

で有限の正の値へ近づきます。$\sigma$ の発散がそのまま反応確率率の発散を意味しないことが分かります。
<!-- solution-end -->

## 7. まとめと次の問い

外線から得た不変振幅は、質量殻・保存則の制限を受ける終状態位相空間 $d\Phi_n$、一粒子の初期規格化 $1/(2M)$ または二粒子の不変入射流束 $1/(4\mathcal F)$、同種終状態の $1/S_{\mathrm f}$ と組み合わせると初めて崩壊率・断面積になります。二体位相空間の $p_{\mathrm f}/(16\pi^2\sqrt s)$ はエネルギーデルタのJacobianから現れ、$\phi^4$ 木レベルの同種スカラー全断面積は $\lambda_4^2/(32\pi s)$ となりました。

この計算は散乱の**大きさ**を与えますが、異なる運動量配置の振幅をどう関連付けるか、また散乱確率の保存が振幅の虚部へどんな制約を課すかはまだ説明していません。次は交差対称性の適用条件と光学定理の入口を扱います。
