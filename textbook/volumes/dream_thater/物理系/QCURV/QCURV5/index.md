# QCURV5 断熱真空・WKB近似とHadamard性

<!-- definition-example-audit: strict -->

[QCURV4のFLRWモード方程式](../QCURV4/index.md#prop-qcurv4-mode)は、膨張する宇宙の自由場を時間依存振動子に帰着しました。過去と未来に静的な領域があればin/out真空を比較できます。しかし、宇宙の膨張がずっと続く場合は、どの時刻にも自然なin/out基準があるとは限りません。

そこで「**短い時間の間に背景がゆっくり変化する**」ことから正振動数モードを近似し、指定時刻の量子状態を構成します。ただし近似が高精度でも、二点分布の**任意に短い距離での特異性**が正しいとは自動的にはいえません。後者を検査する道具がHadamard条件です。

本章の道筋は **WKB試行解 → 残差と断熱次数 → 正規化された厳密初期値 → 局所Hadamard条件 → 有限次数だけでは足りない反例** です。計量符号は $(-,+,+,+)$、$\Box_g=g^{ab}\nabla_a\nabla_b$、$P=-\Box_g+m^2+\xi R$ とします（[統一規約](../../../../../dream-theater-lorentz-conventions.md)）。自然単位は $\hbar=c=1$ です。

## 1. 「ゆっくり変わる振動数」から何を作るか

考える背景は、[平坦FLRW計量](../QCURV4/index.md#def-qcurv4-flrw)

$$
g=a(\eta)^2(-d\eta^2+d\boldsymbol x^2),\qquad
\boldsymbol x\in\mathbb T_L^3,\quad a>0
$$

です。共形時間についての微分をプライムで表し、$a\in C^\infty(I,(0,\infty))$ とします。モードの空間波数は $\boldsymbol k=2\pi\boldsymbol n/L$、$k=|\boldsymbol k|$ です。実スカラー場を $\phi=a^{-1}L^{-3/2}\sum_{\boldsymbol k}\chi_{\boldsymbol k}e^{i\boldsymbol k\cdot\boldsymbol x}$ と展開すると、[FLRWの再スケーリング後のモード方程式](../QCURV4/index.md#prop-qcurv4-mode)から

$$
\chi_k''+\Omega_k^2\chi_k=0,\qquad
\Omega_k^2=k^2+m^2a^2+(6\xi-1)\frac{a''}{a}
$$

を得ます。ここでは $m\ge0$、$\xi\in\mathbb R$。$a''/a$ の項により $\Omega_k^2$ は負にもなります。従って以下の正の試行周波数は**正値となるモードと区間に限って**使います。

振動数が正の定数 $\omega$ なら、厳密解 $e^{-i\omega\eta}/\sqrt{2\omega}$ は正の[KG規格化](../QCURV4/index.md#prop-qcurv4-wronskian-number)を持ちます。変化する場合に指数の位相だけを $\int\omega\,d\eta$ としても、振幅の微分項が残ります。この残差を量的に見るために試行解を定義します。

<a id="def-qcurv5-wkb-mode"></a>

<!-- formal-statement-start -->
> **定義（FLRWモードのWKB試行解）**
> 区間 $J\subset I$ で $W_k\in C^2(J,(0,\infty))$ を任意に選び、基準時刻 $\eta_0\in J$ を固定する。正振動数型のWKB試行解を

$$
f_{W,k}(\eta)=\frac{1}{\sqrt{2W_k(\eta)}}\,
\exp\left(-i\int_{\eta_0}^{\eta}W_k(s)\,ds\right)
$$

> と定める。これは元のモード方程式に対して正しい形かどうかを調べる**候補**であり、追加の条件を満たさない限り厳密解とは呼ばない。
<!-- formal-statement-end -->

<!-- definition-example-start: def-qcurv5-wkb-mode -->
### 直接例：定数振動数

$a(\eta)=a_0>0$、$\omega_k=\sqrt{k^2+m^2a_0^2}>0$ の場合、$W_k=\omega_k$ は正かつ二回連続微分可能です。積分は $\omega_k(\eta-\eta_0)$、振幅は一定なので

$$
f_{W,k}'=-i\omega_k f_{W,k},\qquad
f_{W,k}''=-\omega_k^2 f_{W,k}.
$$

したがって試行解がこの場合は厳密解になります。特に質量零の零波数 $k=m=0$ は $W_k=0$ なのでこの定義に入らず、別の初期値処方が必要です。**定義の確認**：正値性、$C^2$ 性、指定された位相積分と振幅をそれぞれ確認しました。
<!-- definition-example-end -->

<a id="prop-qcurv5-wkb-residual"></a>

<!-- formal-statement-start -->
> **命題（WKB残差と保存Wronskian）**
> $J$ 上で $\Omega_k^2\in C^0(J;\mathbb R)$、$W_k\in C^2(J,(0,\infty))$ とする。[WKB試行解](#def-qcurv5-wkb-mode)は

$$
f_{W,k}''+\Omega_k^2 f_{W,k}
=\mathcal R[W_k]f_{W,k},
$$

$$
\mathcal R[W_k]
=\Omega_k^2-W_k^2-\frac{W_k''}{2W_k}
+\frac{3(W_k')^2}{4W_k^2}
$$

> を満たす。また試行解自身の規格化は、厳密方程式を満たすか否かによらず

$$
i(\overline f_{W,k}f_{W,k}'-\overline f_{W,k}'f_{W,k})=1
$$

> となる。従って $\mathcal R[W_k]=0$ は試行解が厳密解であるための十分条件であり、同値な周波数方程式は

$$
W_k^2=\Omega_k^2-\frac{W_k''}{2W_k}
+\frac{3(W_k')^2}{4W_k^2}.
$$
<!-- formal-statement-end -->

### 証明の見取り図

振幅 $A=(2W)^{-1/2}$ と位相 $\theta' =W$ を**別々に**微分すると、$-iW'$ と振幅微分に由来する項が相殺されます。その後、残った実数項が上の残差です。

<!-- proof-start -->
### 証明

$k$ を固定し、$A=(2W)^{-1/2}$、$\theta=\int_{\eta_0}^{\eta}W$ と略記します。$A'/A=-W'/(2W)$ なので

$$
\frac{f'}{f}=-\frac{W'}{2W}-iW.
$$

もう一回微分して $f''/f=(f'/f)'+(f'/f)^2$ を使うと

$$
\begin{aligned}
\left(\frac{f'}f\right)'
&=-\frac{W''}{2W}+\frac{(W')^2}{2W^2}-iW',\\
\left(\frac{f'}f\right)^2
&=\frac{(W')^2}{4W^2}+iW'-W^2.
\end{aligned}
$$

虚数項を相殺して加えれば

$$
\frac{f''}f=-W^2-\frac{W''}{2W}
+\frac{3(W')^2}{4W^2}
$$

となり、残差の式が出ます。さらに $|f|^2=(2W)^{-1}$ と $\overline{f'}/\overline f=-W'/(2W)+iW$ により

$$
i(\bar f f'-\bar f'f)
=i|f|^2(-2iW)=1.
$$

$f$ はどの点でも零でないため $\mathcal R[W]=0$ ならモード方程式を満たします。逆にこの特定の試行解が厳密解なら、残差恒等式を $f$ で割って $\mathcal R[W]=0$ です。
<!-- proof-end -->

**重要**：Wronskianが1でも残差が零とは限りません。「正しい規格化」と「正しい運動方程式」は別の検査です。

## 2. 断熱展開は何を小さな量と数えるか

時間微分を一回増やすほど背景の変化が弱いという近似を考えます。ただし「$\eta$ の値が小さい」ことではありません。比較するのは変化率 $|W'|/W^2$ や $|W''|/W^3$ などです。振動数が零に近づけば、この比は発散し得ます。

質量項を時間微分を含まない主要部とし、曲率項を二階微分の寄与として分けます。

$$
\omega_k=(k^2+m^2a^2)^{1/2},\qquad
q=(6\xi-1)\frac{a''}{a},\qquad
\Omega_k^2=\omega_k^2+q.
$$

この分割の断熱次数は、$a^{(r)}$ に次数 $r$ を付け、積では足し算し、微分は次数を1上げるという**形式的な数え方**です。例えば $q$ は二次、$\omega_k'$ は一次、$\omega_k''$ は二次です。近似が実際に良いかは別途残差と正値性で判断します。

<a id="def-qcurv5-adiabatic-order"></a>

<!-- formal-statement-start -->
> **定義（断熱次数と零次・二次周波数）**
> $a\in C^\infty(I,(0,\infty))$、$m\ge0$、$\xi\in\mathbb R$ とし、対象モードで $\omega_k>0$ とする。上記の時間微分の数え方で、[WKB周波数方程式](#prop-qcurv5-wkb-residual)を次数ごとに解く形式展開を断熱展開と呼ぶ。零次の周波数は

$$
W_k^{[0]}=\omega_k
$$

> とし、二次の周波数 $W_k^{[2]}$ は同方程式を二次まで満たす形式式とする。上付き $[r]$ は微分次数であり、$\eta$ に関する $r$ 階微分ではない。
<!-- formal-statement-end -->

<a id="prop-qcurv5-second-order"></a>

<!-- formal-statement-start -->
> **命題（二次断熱周波数の導出）**
> 上のFLRW模型で $\omega_k>0$ とし、時間微分次数による形式展開を行うと、二次の周波数は

$$
\boxed{
W_k^{[2]}=\omega_k+
\frac{1}{2\omega_k}
\left[(6\xi-1)\frac{a''}{a}
-\frac{\omega_k''}{2\omega_k}
+\frac{3(\omega_k')^2}{4\omega_k^2}\right]}.
$$

> これは微分次数四次以上を捨てた**形式式**である。すべての有限波数で正値であることや、任意の膨張速度で誤差が小さいことは結論に含まない。
<!-- formal-statement-end -->

### 証明の見取り図

未知の補正 $\delta_2$ は二次なので、二次精度では $W^2=\omega^2+2\omega\delta_2$ と置けます。一方、$W''/W$ などの微分項に $\delta_2$ を入れると少なくとも四次になります。従ってそれらでは $\omega$ だけを使います。

<!-- proof-start -->
### 証明

$W=\omega+\delta_2$ と置き、$\delta_2$ の断熱次数を2とします。二次までで

$$
W^2=\omega^2+2\omega\delta_2+O_{\rm ad}(4),
$$

$$
\frac{W''}{W}=\frac{\omega''}{\omega}
+O_{\rm ad}(4),\qquad
\frac{(W')^2}{W^2}=\frac{(\omega')^2}{\omega^2}
+O_{\rm ad}(4).
$$

[周波数方程式](#prop-qcurv5-wkb-residual)の右辺に $\Omega^2=\omega^2+q$ を代入すると

$$
\omega^2+2\omega\delta_2
=\omega^2+q-\frac{\omega''}{2\omega}
+\frac{3(\omega')^2}{4\omega^2}
+O_{\rm ad}(4).
$$

両辺から $\omega^2$ を引き、$\omega>0$ で割れば主張が得られます。ここで $O_{\rm ad}(4)$ は微分次数についての形式的な残項であり、数値的な一様誤差の上界ではありません。
<!-- proof-end -->

<!-- definition-example-start: def-qcurv5-adiabatic-order -->
### 直接例：曲がり方を変えると二次補正が現れる

局所区間 $|\eta|<T$ で $a(\eta)=a_0(1+\varepsilon\eta^2/T^2)$、$a_0,T,\varepsilon>0$ とし、$m>0$、$\xi=1/6$ を取ります。$\eta_0=0$ で $a'=0$、$a''=2a_0\varepsilon/T^2$。$\omega=(k^2+m^2a^2)^{1/2}>0$ を微分すると

$$
\omega'=\frac{m^2aa'}{\omega},\qquad
\omega''=\frac{m^2(a'^2+aa'')}{\omega}
-\frac{m^4a^2(a')^2}{\omega^3}.
$$

従って中心では $\omega'=0$、$\omega''=2m^2a_0^2\varepsilon/(T^2\omega_0)$、$\omega_0=\sqrt{k^2+m^2a_0^2}$。曲率結合項 $q=0$ を二次式に入れると

$$
W_k^{[0]}(0)=\omega_0,\qquad
W_k^{[2]}(0)=\omega_0-
\frac{m^2a_0^2\varepsilon}{2T^2\omega_0^3}.
$$

これは二次までの**式の評価**であり、正値には例えば $\varepsilon m^2a_0^2<2T^2\omega_0^4$ が必要です。**定義の確認**：$a$ は正で滑らか、$\omega_0>0$、一階微分項が消え、二階微分の項だけが残ることを計算しました。高周波では補正の相対量は $O(k^{-4})$ ですが、$k$ が小さければ保証になりません。
<!-- definition-example-end -->

### 厳密になる対照例

四次元で $m=0$、$\xi=1/6$、$k>0$ なら [QCURV4の共形非生成の定理](../QCURV4/index.md#thm-qcurv4-conformal)の条件により $\Omega_k^2=k^2$ です。$W^{[0]}=W^{[2]}=k$、すべての微分補正は零で、WKBは**任意の正で滑らかな** $a$ に対し厳密になります。これは特殊な共形模型の結論で、質量を入れたり $\xi$ を変えたりすれば一般に成立しません。$k=0$ は正の周波数の仮定から除外します。

## 3. 近似式から本当に方程式を満たす状態を作る

近似関数 $f_{W,k}$ をそのまま解だと思って量子化してはいけません。通常の構成では、指定時刻の**値と一階微分だけ**を近似式から取り、その後は厳密なモード方程式で時間発展させます。[QCURV4のWronskian保存](../QCURV4/index.md#prop-qcurv4-wronskian-number)があるため、初期値の規格化が全時刻へ伝わります。

<a id="def-qcurv5-adiabatic-data"></a>

<!-- formal-statement-start -->
> **定義（断熱初期データからのモード状態）**
> 平坦FLRWの三次元トーラス上で $\eta_0\in I$ を選び、各波数に正の実数 $W_k(\eta_0)>0$ と実数 $W_k'(\eta_0)$ を指定する。$W_{-k}=W_k$ と $W_{-k}'=W_k'$ を仮定する。$\Omega_k^2$ は実で滑らかとする。各波数について厳密方程式 $\chi_k''+\Omega_k^2\chi_k=0$ を、初期値

$$
\chi_k(\eta_0)=\frac1{\sqrt{2W_k(\eta_0)}},\qquad
\chi_k'(\eta_0)=
\left[-iW_k(\eta_0)-\frac{W_k'(\eta_0)}{2W_k(\eta_0)}\right]\chi_k(\eta_0)
$$

> から解く。対応する正規化モード $u_{\boldsymbol k}=L^{-3/2}a^{-1}\chi_ke^{i\boldsymbol k\cdot\boldsymbol x}$ を正振動数部分空間として選び、二点分布 $W(x,y)=\sum_{\boldsymbol k}u_{\boldsymbol k}(x)\overline{u_{\boldsymbol k}(y)}$ で定まる純粋準自由モード状態を考える。和は分布として解釈し、状態の構成には高周波で通常の正の主周波数に漸近する等の標準的な分布収束条件を課す。断熱展開 $W^{[r]}$ を採用するときは、必要なら**低波数だけ**正値のデータへ調整する。
<!-- formal-statement-end -->

<!-- definition-example-start: def-qcurv5-adiabatic-data -->
### 直接例：定数背景の真空

$a=a_0$、$\omega_k>0$ で $W_k=\omega_k$ と取れば $W_k'=0$、初期値は $\chi_k(\eta_0)=(2\omega_k)^{-1/2}$、$\chi_k'=-i\omega_k\chi_k$ です。実係数二階常微分方程式の一意性から

$$
\chi_k(\eta)=\frac{e^{-i\omega_k(\eta-\eta_0)}}{\sqrt{2\omega_k}}
$$

が全時刻の解です。$W_{-k}=W_k$、正値性、分布としてのモード和を満たし、位相の基準 $\eta_0$ の違いで同じ二点分布になります。**定義の確認**：方程式、初期値、規格化、正負波数の一致を直接確かめました。
<!-- definition-example-end -->

<a id="prop-qcurv5-initial-normalization"></a>

<!-- formal-statement-start -->
> **命題（初期データのKG規格化）**
> 上記の正の初期周波数データから作った各厳密解 $\chi_k$ は、全時刻で

$$
i(\overline{\chi_k}\chi_k'-\overline{\chi_k'}\chi_k)=1
$$

> を満たす。$W_{-k}=W_k$ を課した対称なモードでは、対応する全時空モードはKG正規直交し、正負モードの混合内積も零となる。これは規格化の主張であって、選んだ状態のHadamard性の主張ではない。
<!-- formal-statement-end -->

### 証明の見取り図

値と速度の両方を用いたため、実数の $W_k'/W_k$ は共役差で消えます。残る $-2iW_k$ が振幅の $1/(2W_k)$ と打ち消し合います。時間発展では実係数方程式がWronskianを保存します。

<!-- proof-start -->
### 証明

初期時刻で $c_k=(2W_k)^{-1/2}>0$、$d_k=-W_k'/(2W_k)\in\mathbb R$ と置けば

$$
\chi_k=c_k,\quad \chi_k'=(d_k-iW_k)c_k,\quad
\overline{\chi_k'}=(d_k+iW_k)c_k.
$$

従って

$$
i(\bar\chi_k\chi_k'-\overline{\chi_k'}\chi_k)
=ic_k^2[(d_k-iW_k)-(d_k+iW_k)]
=\frac{i(-2iW_k)}{2W_k}=1.
$$

厳密方程式の係数 $\Omega_k^2$ は実なので、時間微分は

$$
i(\bar\chi_k\chi_k''-\overline{\chi_k''}\chi_k)
=i(-\Omega_k^2\bar\chi_k\chi_k+
\Omega_k^2\bar\chi_k\chi_k)=0.
$$

故に全時刻で1です。全時空のKG内積では空間積分が $\delta_{\boldsymbol k\boldsymbol l}$ を与えます。$W_k,W_k'$ が $k$ の絶対値だけに依存する条件で、$\chi_{-k}=\chi_k$ は初期値と一意性から従い、正モードと負モードの交差内積は共役Wronskianの組で相殺されます（[QCURV4の規格化の証明](../QCURV4/index.md#prop-qcurv4-wronskian-number)）。
<!-- proof-end -->

高周波での断熱式を低波数へ延長する方法、初期時刻、断熱次数を変えると、一般に**異なる状態**になります。特に「断熱真空」という名前だけで唯一の物理的真空を指定したことにはなりません。

## 4. なぜHadamard条件が別に必要なのか

モード粒子数は二つの正振動数選択の比較です。一方、局所測定量を作るためには、二点分布 $W(x,y)$ が $x\to y$ で持つ普遍的な特異性を制御する必要があります。ここで $W$ は二点分布であり、第1〜3節の正の**試行周波数** $W_k$ と混同しないでください。

四次元の時間向き付き大域双曲時空において、[MICA12の局所Hadamard parametrix](../../../解析系/MICA/MICA12/index.md#def-mica12-local-parametrix)は、測地的凸正規近傍での短距離の特異部を

$$
H_\ell(x,y)=\frac1{8\pi^2}
\left[\frac{U(x,y)}{\sigma_+(x,y)}
+V(x,y)\log\frac{\sigma_+(x,y)}{\ell^2}\right]
$$

という形で表します。$\sigma$ は二点間の世界関数、$\sigma_+$ は未来向き時間差を指定した$i0$境界値、$U$ は幾何で決まるvan Vleck因子、$V$ は場の作用素から決まる滑らかな係数です。ここでは[MICA12の正周波数境界値](../../../解析系/MICA/MICA12/index.md#def-mica12-positive-boundary)の符号を使います。$V$ は一般の滑らかな計量で収束を仮定した無限べき級数ではありません。適切な局所parametrixを固定したとき、Hadamard二点分布との差は滑らかになります。

[MICA13のHadamard波面集合条件](../../../解析系/MICA/MICA13/index.md#def-mica13-wfsc)は、この局所式とは別の大域的な表現です。$\mathcal C^+$ を、二点を結ぶ零測地線に沿って未来向きの光的余接ベクトルを平行移動し、第二変数の共変ベクトルに負号を付けて作る関係とすると

$$
WF(W)=\mathcal C^+
$$

を要求します。ここで $WF$ は分布の波面集合です。「$W$ 自身が滑らか」という意味ではなく、**許される特異方向が厳密に決まる**という意味です。自由場の双解性・正値性・交換子条件も別に必要です。

[MICA13のRadzikowski同値定理](../../../解析系/MICA/MICA13/index.md#thm-mica13-equivalence)が適用できる自由場の二点分布について、局所Hadamard形と上の波面条件は同値です。本章ではこの深い微局所解析の一般証明を複製しません。重要なのは、[Hadamard二点分布の差の滑らかさ](../../../解析系/MICA/MICA13/index.md#prop-mica13-smooth-difference)も同じ条件から得られる点です。

### 直接例：平坦時空の短距離係数

四次元質量零Minkowski真空では $U=1$、$V=0$、$\sigma=(-\Delta t^2+|\Delta\boldsymbol x|^2)/2$ です。[MICA12のFourier積分による正規化](../../../解析系/MICA/MICA12/index.md#prop-mica12-massless-boundary)から

$$
W_0(x,y)=\frac1{4\pi^2\{|\Delta\boldsymbol x|^2-(\Delta t-i0)^2\}}
=\frac1{8\pi^2\sigma_+(x,y)}.
$$

単に $1/\sigma$ の関数として対角へ代入するのではなく、$i0$ を伴う分布です。[MICA13の平坦模型の波面計算](../../../解析系/MICA/MICA13/index.md#prop-mica13-flat-wavefront)はこれが正しい未来向きの $\mathcal C^+$ を持つことまで確かめています。

Hadamard条件は局所の高周波情報を制約しますが、状態を一意には選びません。異なるHadamard状態の二点分布は**滑らかな関数だけ異なる**ことがあり、それでも粒子数や測定応答は異なり得ます。

## 5. 有限次数の高周波近似だけで十分か

答えは一般に**否**です。断熱展開を有限次数で止めることは、短距離の誤差を有限次数まで減らす操作です。Hadamard性は、あらゆる次数での滑らかな余りに対応する、より強い要求です。正確な断熱状態の有限次数・無限次数とSobolev波面集合の対応を一般に論じるには追加の仮定と解析が必要であり、「二次WKBなら必ずHadamard」という推論はできません。

有限冪の減衰が不足することを、時間依存性のない模型でも確かめます。背景が静的だからこそ、断熱近似の誤差と、**意図して選んだ別の量子状態**の高周波混合を明確に区別できます。

<a id="prop-qcurv5-power-tail"></a>

<!-- formal-statement-start -->
> **命題（有限冪の高周波混合ではHadamard性を保証しない）**
> $M=\mathbb R\times\mathbb T_L^3$ に平坦計量 $-dt^2+d\boldsymbol x^2$ を入れ、質量 $m>0$ の実自由場を考える。$\omega_k=\sqrt{k^2+m^2}$ とし、平坦真空モード

$$
u_{\boldsymbol k}(t,\boldsymbol x)
=\frac{e^{-i\omega_kt+i\boldsymbol k\cdot\boldsymbol x}}
{L^{3/2}\sqrt{2\omega_k}}
$$

> に対し、実数 $\beta_k=(1+k^2/\mu^2)^{-2}$（$\mu>0$）、$\alpha_k=\sqrt{1+\beta_k^2}$ とする。新モード

$$
v_{\boldsymbol k}=\alpha_k u_{\boldsymbol k}
+\beta_k\overline{u_{-\boldsymbol k}}
$$

> が定める正値の規格化準自由状態の二点分布 $W_v$ は、一般にHadamardではない。具体的には平坦真空二点分布 $W_0$ との差が滑らかでない。
<!-- formal-statement-end -->

### 証明の見取り図

各波数では $|\alpha_k|^2-|\beta_k|^2=1$ なのでBogoliubovの正準関係を満たします。しかし全波数にわたる $k^{-4}$ の混合は、等時刻二点分布のFourier係数に $k^{-5}$ の尾を残します。滑らかな周期関数なら係数は任意の冪より速く減衰するはずです。

<!-- proof-start -->
### 証明

まず $\beta_{-k}=\beta_k$、$\alpha_{-k}=\alpha_k$ です。従って $u_{\boldsymbol k}$ と $\overline{u_{-\boldsymbol k}}$ は同じ空間因子を持ち、[QCURV3の正準条件](../QCURV3/index.md#thm-qcurv3-canonical)から

$$
|\alpha_k|^2-|\beta_k|^2=(1+\beta_k^2)-\beta_k^2=1
$$

が正規化を保証します。各モードは自由方程式の解です。$\sum_k|\beta_k|^2<\infty$ であり（三次元の格子で $k^{-8}$ は総和可能）、[QCURV3のHilbert–Schmidt条件](../QCURV3/index.md#def-qcurv3-wavepacket-hs)にも従います。よってこの例ではFock表示の同値性に問題はありません。

$t_x=t_y=0$ とおくと、$\alpha_k,\beta_k$ は実なので、$v_{\boldsymbol k}(0,\boldsymbol x)=(\alpha_k+\beta_k)u_{\boldsymbol k}(0,\boldsymbol x)$ です。従って差の等時刻核は

$$
(W_v-W_0)(0,\boldsymbol x;0,\boldsymbol y)
=\frac1{L^3}\sum_{\boldsymbol k}
c_k e^{i\boldsymbol k\cdot(\boldsymbol x-\boldsymbol y)},
$$

$$
c_k=\frac{(\alpha_k+\beta_k)^2-1}{2\omega_k}
=\frac{\beta_k^2+\alpha_k\beta_k}{\omega_k}.
$$

最後の式では $\alpha_k^2=1+\beta_k^2$ を代入しました。$k\to\infty$ では

$$
\beta_k\sim\mu^4 k^{-4},\quad
\alpha_k=1+O(k^{-8}),\quad
\omega_k\sim k,\quad
c_k\sim\mu^4k^{-5}.
$$

この級数は絶対収束しますが、係数は任意の次数に急減少しません。もし核が $t_x=t_y=0$ で滑らかな周期関数なら、空間変数で任意回数部分積分したFourier係数はすべての $N$ について $O((1+k)^{-N})$ となり、$c_k\sim k^{-5}$ に矛盾します。従って等時刻の差は滑らかでありません。

平坦トーラスの基準真空 $W_0$ は局所的にMinkowski真空と同じ正の高周波特異性を持ち、Hadamardです（[MICA13の平坦真空の波面計算](../../../解析系/MICA/MICA13/index.md#prop-mica13-flat-wavefront)を周期局所表示に適用）。仮に $W_v$ もHadamardなら、[二つのHadamard二点分布の滑らかな差](../../../解析系/MICA/MICA13/index.md#prop-mica13-smooth-difference)と矛盾します。よって $W_v$ はHadamardではありません。
<!-- proof-end -->

この反例は「有限次のWKBから作ったすべての状態が非Hadamard」という証明ではありません。定数背景で厳密な $W_k=\omega_k$ を選べば零次でもHadamardです。証明したのは**有限冪の高周波制御やFock表現の同値性だけではHadamard性を結論できない**ということです。

## 6. 何を検査すればよいか

1. **モード方程式**：WKBの $\mathcal R[W]$ が対象時間区間と波数帯で十分小さいか。$W>0$ が維持されるか。
2. **厳密な状態**：初期データから厳密方程式を解き、KG規格化と正値性を保つか。低波数の調整と初期時刻の選択を宣言したか。
3. **局所短距離**：二点分布が[Hadamard条件](../../../解析系/MICA/MICA13/index.md#def-mica13-wfsc)を満たすと結論するなら、そのための全高周波制御・既存定理の仮定を別に検証したか。
4. **物理的観測量**：粒子数はモード選択に依存し、点分離で定義する局所観測量とは別か。後者の一般的処方は[MICA14のHadamard差引き](../../../解析系/MICA/MICA14/index.md#def-mica14-subtracted-remainder)以降で扱う。

次章では、粒子数を直接数える代わりに、検出器を有限時間だけ場へ結合したときの遷移確率を二点分布から求めます。Hadamard性はその計算の短距離特異性を制御する入口ですが、それだけで検出器の熱平衡や「粒子の実在」を保証するわけではありません。

## 演習

### Level A：一つずつ条件を確かめる

<a id="ex-qcurv5-a01"></a>
#### QCURV5-A01 WKBの一階・二階微分
- Level: A

$f=(2W)^{-1/2}e^{-i\int W}$、$W\in C^2(J,(0,\infty))$ とする。$f'/f$ と $f''/f$ を求め、虚数項の相殺を示せ。

<!-- solution-start -->
**詳細解答。** 対数微分から $f'/f=-W'/(2W)-iW$ です。さらに

$$
(f'/f)'=-W''/(2W)+(W')^2/(2W^2)-iW',
$$

$$
(f'/f)^2=(W')^2/(4W^2)+iW'-W^2.
$$

$f''/f=(f'/f)'+(f'/f)^2$ なので $-iW'+iW'=0$、残りは $-W^2-W''/(2W)+3(W')^2/(4W^2)$ です。[残差公式](#prop-qcurv5-wkb-residual)を再現しました。
<!-- solution-end -->

<a id="ex-qcurv5-a02"></a>
#### QCURV5-A02 正の規格化を数値に依存せず確認
- Level: A

$W(\eta_0)=w>0$、$W'(\eta_0)=d\in\mathbb R$ とする。WKB初期値で $i(\bar\chi\chi'-\overline{\chi'}\chi)=1$ を示せ。

<!-- solution-start -->
**詳細解答。** $c=(2w)^{-1/2}$、$\chi=c$、$\chi'=(-iw-d/(2w))c$。共役は $(iw-d/(2w))c$ なので、差は $[-2iw]c^2=-i$。これに $i$ を掛けると1です。$d$ が消えるのは実数で共役時に符号が変わらないからです。
<!-- solution-end -->

<a id="ex-qcurv5-a03"></a>
#### QCURV5-A03 断熱次数を数える
- Level: A

$\omega=(k^2+m^2a^2)^{1/2}$、$q=(6\xi-1)a''/a$ について、$q$、$\omega'$、$\omega''$、$(\omega')^2/\omega^2$ の断熱次数を求めよ。

<!-- solution-start -->
**詳細解答。** $\omega$ は $a$ の関数で時間微分を含まないため次数0です。$q$ は $a''$ を一つ含むので次数2。$\omega'=m^2aa'/\omega$ は次数1です。さらに微分して

$$
\omega''=\frac{m^2(a'^2+aa'')}{\omega}
-\frac{m^4a^2(a')^2}{\omega^3}
$$

を得て、各項は次数2です。$(\omega')^2/\omega^2$ も次数2です。従って二次周波数の括弧内はすべて次数2で揃います。
<!-- solution-end -->

<a id="ex-qcurv5-a04"></a>
#### QCURV5-A04 共形非生成と零モード
- Level: A

$m=0$、$\xi=1/6$ の4次元FLRWで $\Omega_k^2$ と $W_k^{[2]}$ を求めよ。$k=0$ を別扱いする理由も述べよ。

<!-- solution-start -->
**詳細解答。** [モード方程式](../QCURV4/index.md#prop-qcurv4-mode)に代入すると

$$
\Omega_k^2=k^2+0+(6/6-1)a''/a=k^2.
$$

$k>0$ では $\omega=k$ が定数なので $\omega'=\omega''=0$、$q=0$ で $W^{[2]}=k$。[残差公式](#prop-qcurv5-wkb-residual)でも $\mathcal R=0$ です。$k=0$ では $W=0$、$(2W)^{-1/2}$ が未定義なのでWKB正振動数処方は適用できません。
<!-- solution-end -->

<a id="ex-qcurv5-a05"></a>
#### QCURV5-A05 Hadamardの二つの条件を区別
- Level: A

ある二点分布が $WF(W)=\mathcal C^+$ を満たすとする。この式だけで正値性と交換子条件が従うか。また $W$ が滑らかだといえるか。

<!-- solution-start -->
**詳細解答。** どれも一般には従いません。[MICA13の定義](../../../解析系/MICA/MICA13/index.md#def-mica13-wfsc)は波面の位置と方向だけを規制します。自由場の状態には双解性・正値性・交換子条件を別に課します。また $\mathcal C^+$ は通常空でないので $W$ 自体には光的な特異性があり、滑らかな分布なら波面集合は空になるはずです。二つのHadamard状態の**差**が滑らかだという別の命題と混同しないことが要点です。
<!-- solution-end -->

### Level B：二つ以上の結果をつなぐ

<a id="ex-qcurv5-b01"></a>
#### QCURV5-B01 二次補正の符号と適用域
- Level: B

$a=a_0(1+\varepsilon\eta^2/T^2)$、$m>0$、$\xi=1/6$、$\eta_0=0$ とする。$W^{[2]}(0)$ を求め、正値となる明示条件を示せ。

<!-- solution-start -->
**詳細解答。** $a'(0)=0$、$a''(0)=2a_0\varepsilon/T^2$、$\omega_0=\sqrt{k^2+m^2a_0^2}>0$。$\omega'=m^2aa'/\omega$ より $\omega'(0)=0$、$\omega''(0)=m^2a_0a''(0)/\omega_0=2m^2a_0^2\varepsilon/(T^2\omega_0)$。$q=(6\xi-1)a''/a=0$ なので[二次式](#prop-qcurv5-second-order)へ入れ、

$$
W^{[2]}(0)=\omega_0+
\frac1{2\omega_0}\left(-\frac{m^2a_0^2\varepsilon}{T^2\omega_0^2}\right)
=\omega_0-\frac{m^2a_0^2\varepsilon}{2T^2\omega_0^3}.
$$

正値性は $2T^2\omega_0^4>m^2a_0^2\varepsilon$ と同値です。これが破れる場合、形式展開の記号を正の初期周波数に使うことはできず、特に低波数の補正が要ります。
<!-- solution-end -->

<a id="ex-qcurv5-b02"></a>
#### QCURV5-B02 残差と粒子数を混同しない
- Level: B

$\Omega^2(\eta)=\omega^2+\lambda h(\eta)$、$\omega>0$、$h$ は滑らかで有界とする。定数試行周波数 $W=\omega$ の残差を求め、Wronskianが1である事実から何を結論できないか述べよ。

<!-- solution-start -->
**詳細解答。** $W'=W''=0$ なので[WKB残差と保存Wronskian](#prop-qcurv5-wkb-residual)より

$$
\mathcal R[\omega]=(\omega^2+\lambda h)-\omega^2=\lambda h(\eta).
$$

$h$ が零でない区間では $f=e^{-i\omega(\eta-\eta_0)}/\sqrt{2\omega}$ は厳密解ではありません。それでも $i(\bar f f'-\bar f'f)=1$ は成り立ちます。従ってこの候補をそのまま場の解と見なし、in/out粒子数や状態を正しく計算したとはいえません。必要なら[断熱初期データからのモード状態](#def-qcurv5-adiabatic-data)で厳密方程式へ発展させます。
<!-- solution-end -->

<a id="ex-qcurv5-b03"></a>
#### QCURV5-B03 高周波squeezeと滑らかさ
- Level: B

三次元トーラス上の質量 $m>0$ の自由場で $\beta_k=(1+k^2/\mu^2)^{-p/2}$、$\alpha_k=\sqrt{1+\beta_k^2}$、$p>3/2$ として $v_k=\alpha_ku_k+\beta_k\bar u_{-k}$ を作る。等時刻の二点分布差のFourier係数の減衰次数を求め、$p$ が有限であればHadamard性をこの方法から結論できない理由を述べよ。

<!-- solution-start -->
**詳細解答。** $\beta_k\sim\mu^pk^{-p}$、$\alpha_k=1+O(k^{-2p})$ です。$t=0$ における差の係数は[高周波混合の命題](#prop-qcurv5-power-tail)と同じ代数で

$$
c_k=\frac{\beta_k^2+\alpha_k\beta_k}{\omega_k}
\sim\mu^p k^{-(p+1)}.
$$

$p>3/2$ だから $\sum_{\boldsymbol k}|\beta_k|^2<\infty$ で、変換のFock実装可能性は妨げられません。しかし有限 $p$ では $c_k$ が任意の冪より速く減衰する条件を満たさないため、等時刻差は滑らかでありません。基準真空がHadamardであれば、[Hadamard二点分布の差の滑らかさ](../../../解析系/MICA/MICA13/index.md#prop-mica13-smooth-difference)から新状態はHadamardではありません。Hilbert–Schmidt条件とHadamard条件は異なる強さです。
<!-- solution-end -->

<a id="ex-qcurv5-b04"></a>
#### QCURV5-B04 局所性と真空選択
- Level: B

二つの自由場二点分布 $W_1,W_2$ が同じ背景・作用素でHadamard条件を満たすとする。(i) $W_1-W_2$ の局所正則性、(ii) 粒子数の一致、(iii) 状態の一意性について結論できることを分けて説明せよ。

<!-- solution-start -->
**詳細解答。** (i) [Hadamard二点分布の差の滑らかさ](../../../解析系/MICA/MICA13/index.md#prop-mica13-smooth-difference)により $W_1-W_2$ は滑らかです。波面集合が同じであることだけでなく、交換子条件により反対称部分が同じであること等が定理の仮定です。(ii) ある正振動数モード基底に対する粒子数は状態に依存するので一致しません。(iii) $W_1-W_2$ が非零の滑らかな双解であってもHadamard条件と両立するため、一意性も従いません。短距離の普遍構造を共有していても大域的な励起は異なり得ます。
<!-- solution-end -->

### Level C：総合再導出

<a id="ex-qcurv5-c01"></a>
#### QCURV5-C01 断熱近似から局所量子状態まで
- Level: C

平坦FLRWの正で滑らかな $a(\eta)$、$m>0$、$\xi\in\mathbb R$ を考える。ある時刻 $\eta_0$ と高波数帯で $\omega_k=(k^2+m^2a^2)^{1/2}>0$ とし、二次断熱データを使いたい。(i) その式の導出、(ii) 厳密規格化解の作り方、(iii) 低周波での障害、(iv) Hadamard性を別に検査する理由を、互いの論理依存が分かるように説明せよ。

<!-- solution-start -->
**詳細解答。** (i) [FLRWモード方程式](../QCURV4/index.md#prop-qcurv4-mode)を $\chi''+(\omega^2+q)\chi=0$、$q=(6\xi-1)a''/a$ と書く。[WKB残差](#prop-qcurv5-wkb-residual)を零にする式に $W=\omega+\delta_2$ を代入し、$W^2=\omega^2+2\omega\delta_2+O_{\rm ad}(4)$、$W''/W=\omega''/\omega+O_{\rm ad}(4)$、$(W')^2/W^2=(\omega')^2/\omega^2+O_{\rm ad}(4)$ を使う。よって

$$
2\omega\delta_2=q-\frac{\omega''}{2\omega}
+\frac{3(\omega')^2}{4\omega^2},\qquad
W^{[2]}=\omega+\delta_2.
$$

(ii) $\eta_0$ で $W^{[2]}(\eta_0)>0$ を確認したら、値 $(2W)^{-1/2}$、速度 $(-iW-W'/2W)(2W)^{-1/2}$ を取ります。[初期データのKG規格化](#prop-qcurv5-initial-normalization)によりKGノルムは1で、厳密な微分方程式で発展させれば保存されます。近似の候補をそのまま厳密解に置き換えてはいけません。

(iii) 低波数では $\omega^2$ が小さく補正が主要部を超えたり、$\Omega_k^2$ が負になったりします。形式的な $W^{[2]}$ が非正なら初期値が定義できません。必要なら低波数を別の正規化データで指定しますが、その自由度は状態選択を反映します。

(iv) 以上は「正の初期データ・運動方程式・KG規格化」を与えますが、二点分布の波面集合が $\mathcal C^+$ であることは示していません。[MICA13のHadamard条件](../../../解析系/MICA/MICA13/index.md#def-mica13-wfsc)は全高周波での特異方向の制約であり、有限次の形式近似とは別の論証が必要です。[有限冪混合の反例](#prop-qcurv5-power-tail)では正準規格化とFock同値を満たすのにHadamard性が失敗します。従って「断熱真空がある」だけで局所くりこみ可能な状態だと宣言しないのが結論です。
<!-- solution-end -->
