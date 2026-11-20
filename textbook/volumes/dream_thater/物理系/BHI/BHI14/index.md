# BHI14 scrambling時間と情報放出時間

<!-- definition-example-audit: strict -->

## 1. どの時計が「情報を取り戻すまでの時間」を測るのか

[BHI12のHayden–Preskill投入模型](../BHI12/index.md#def-bhi12-old-input)では、日記 $A$ が、早期放射 $E$ と最大エンタングルした古いブラックホール $B$ に投入されました。受信者は $E$ を量子的に保存し、新たな放射 $D$ を集めます。[BHI13のHaar回収閾値](../BHI13/index.md#thm-bhi13-recovery-threshold)は、内部の量子発展を表すユニタリをHaarランダムに**すでに選び終えた**とき、十分な $D$ があれば高確率で回復写像が存在すると保証しました。

しかしHaar分布は物理的な時間を持っていません。実際の実験では、日記投入から内部の情報が広がるまでの時間、放射を集める時間、受信者が回復演算を計算・実行する時間を別々に測る必要があります。

この講義で比較する四つの量は次のとおりです。

| 時計 | 何の終点か | 何を知れば計算できるか |
| --- | --- | --- |
| $t_{\rm spread}$ | 内部の影響が多数の自由度に及ぶ | 内部回路の局所性、層数、結合強度 |
| $t_{\rm scr}$ | 指定したscrambling判定を満たす | 判定量と具体的な時間発展 |
| $\Delta u_{\rm rad}$ | 必要な新放射を集める | 放射の符号化単位・放出率 |
| $t_{\rm dec}$ | 回復写像を古典計算・量子操作で実行する | 回復アルゴリズムと資源 |

最初の二つは同じではありません。以下では拡散を手計算する模型と、BHI13の**情報理論的な**回収保証を接続するために必要な追加仮定を明示します。時間 $u$ は遠方にいる静止観測者の時計で測り、$G=\hbar=c=k_{\mathrm B}=1$ を使用します。時間とエントロピーの対数の単位を混同しません。

## 2. 対数時間が出る最小模型

一個の自由度に投入した摂動が、相互作用を通して別の自由度に影響を及ぼすと考えます。$n\ge2$ 個の二準位自由度（量子ビット）を用意し、$x(u)$ を影響が到達した自由度の**有効個数**とします。ここで $x$ は連続変数による平均場近似であり、厳密な整数個数やエンタングルメント・エントロピーではありません。

小さい $x$ の間は既に影響を受けた自由度の数に比例して拡散が進み、全体に行き渡ると飽和する、という仮定を置きます。

<a id="def-bhi14-spreading-clock"></a>

<!-- formal-statement-start -->
> **定義（平均場の拡散時計）**
>
> 整数 $n\ge2$ と実数 $\gamma>0$ を固定する。時刻 $u\ge0$ の拡散指標 $x(u)$ を、初期値問題

$$
\frac{dx}{du}=\gamma x\left(1-\frac{x}{n}\right),
\qquad x(0)=1
$$

> の解とする。$1/n\le\theta<1$ に対し、$x(u)=\theta n$ に初めて達する時刻を $t_\theta$ とする。特に半数到達時刻 $t_{1/2}$ を**この模型でのscrambling代理時間**とする。$\gamma$ は逆時間の単位を持つ。
<!-- formal-statement-end -->

この式では $x$ が小さいほど $dx/du\simeq\gamma x$、$x=n$ に近づくほど変化率が小さくなります。分母の $n$ は「内部の自由度の数」であり、Hilbert空間の次元 $2^n$ ではありません。

<!-- definition-example-start: def-bhi14-spreading-clock -->
**定義の確認**： $n=8,\gamma=1$ なら初期勾配は $x'(0)=1(1-1/8)=7/8>0$。$x=8$ では右辺が零です。$x=4$ で右辺は $4(1-4/8)=2$ となり、途中で拡散が最速になることも検算できます。判定 $x=4$ は整数個の量子ビットの測定を意味せず、あくまでこの微分方程式の実数値の条件です。
<!-- definition-example-end -->

この初期値問題は変数分離で厳密に解けます。

<a id="thm-bhi14-logarithmic-clock"></a>

<!-- formal-statement-start -->
> **定理（平均場模型の対数到達時間）**
>
> [平均場の拡散時計](#def-bhi14-spreading-clock)において、全ての $u\ge0$ で

$$
x(u)=\frac{n}{1+(n-1)e^{-\gamma u}}
$$

> が成り立つ。$1/n\le\theta<1$ に対して到達時刻は

$$
t_\theta=\frac1\gamma
\log\left(\frac{(n-1)\theta}{1-\theta}\right)
$$

> であり、特に

$$
t_{1/2}=\frac{\log(n-1)}{\gamma}.
$$

> 固定した $\theta\in(0,1)$ に対して $n\to\infty$ とすると、$t_\theta=(\log n)/\gamma+O(1/\gamma)$ である。
<!-- formal-statement-end -->

### 証明の見取り図

$1/x$ と $1/(n-x)$ に分けて積分すると $\log(x/(n-x))$ が現れます。初期値 $x(0)=1$ が積分定数を決めるので、単なる比例則よりも明確な式になります。

<!-- proof-start -->
### 証明

$1\le x<n$ の間は分母が正なので、変数を分離できます。

$$
\frac{dx}{x(1-x/n)}=\gamma\,du,
\qquad
\frac{1}{x(1-x/n)}=\frac1x+\frac1{n-x}.
$$

したがって左辺の原始関数は $\log x-\log(n-x)$ であり、

$$
\log\frac{x(u)}{n-x(u)}
=\gamma u+C.
$$

$x(0)=1$ を代入すると $C=-\log(n-1)$ です。指数を取って移項すると

$$
\frac{x}{n-x}=\frac{e^{\gamma u}}{n-1},
\qquad
x(n-1+e^{\gamma u})=ne^{\gamma u},
$$

$$
x(u)=\frac{ne^{\gamma u}}{n-1+e^{\gamma u}}
=\frac{n}{1+(n-1)e^{-\gamma u}}.
$$

この式は $x(0)=1$ を満たし、$u\ge0$ で $1\le x(u)<n$、右辺が正なので単調増加します。従って $x=\theta n$ の到達時刻は存在し一意です。式へ代入すると

$$
\theta=\frac1{1+(n-1)e^{-\gamma t_\theta}},
\quad
e^{-\gamma t_\theta}=\frac{1-\theta}{(n-1)\theta}.
$$

対数を取れば主張の式です。$\theta=1/2$ では比が $n-1$ となります。さらに

$$
\log(n-1)=\log n+\log(1-1/n),
$$

であり、固定した $\theta$ の $\log(\theta/(1-\theta))$ は定数なので漸近式が従います。$n=2$ の半数条件は初期状態で既に満たされ、$t_{1/2}=0$ です。
<!-- proof-end -->

例えば $n=64,\gamma=1/2$ なら $t_{1/2}=2\log63\simeq8.286$。$n$ を64倍にしても到達時間は64倍ではなく、主項には $2\log64$ だけが加わります。

## 3. 二体ゲートの光円錐と、scramblingでない「広がり」

平均場模型だけでは、実際の量子ユニタリがどこまで情報を隠したか分かりません。そこで回路のゲートを見ます。二量子ビットゲートは一度に二個の量子ビットにしか作用できません。**一つのゲート層では、各量子ビットは高々一つのゲートに参加する**とします。

ある一量子ビット演算子 $P$ を回路で共役したとき、$P$ が非自明に作用する量子ビットの集合をその演算子の**台**（support）といいます。例えば $X_1\otimes I_2\otimes I_3$ の台は $\{1\}$ で、$X_1X_2X_3$ の台は $\{1,2,3\}$ です。ここで $X|0\rangle=|1\rangle$、$X|1\rangle=|0\rangle$ はPauliの $X$、$Z|0\rangle=|0\rangle$、$Z|1\rangle=-|1\rangle$ は $Z$ です。

<a id="lem-bhi14-two-site-lightcone"></a>

<!-- formal-statement-start -->
> **補題（二体ゲート回路の作用素台の上界）**
>
> $n$ 量子ビットの回路 $V_\ell\cdots V_1$ の各層 $V_j$ が、互いに交わらない二量子ビットゲートと一量子ビットゲートの積であるとする。一量子ビットに台を持つ演算子 $P$ を、この回路の順に共役した演算子の台の大きさを $w_\ell$ とすると

$$
w_\ell\le\min\{2^\ell,n\}.
$$

> よって台を全 $n$ 量子ビットへ広げるには、少なくとも $\lceil\log_2n\rceil$ 層が必要である。
<!-- formal-statement-end -->

### 証明の見取り図

台を既に持つ量子ビット一個から、一層で新たに高々一個へしか影響を移せません。層ごとに台が二倍以下であることを帰納法で示します。

<!-- proof-start -->
### 証明

$w_0=1$ です。ある層に入る前の台の集合を $S$ とします。$S$ と交わらないゲートは演算子と可換なので、共役しても台を増やしません。$S$ と一つだけ交わる二体ゲートは、高々もう一つの量子ビットを台へ加えます。$S$ と二つ交わるゲートは台を増やしません。

層内でゲートは互いに素なので、増え得る量子ビット数は高々 $|S|$。従って

$$
w_{j+1}\le\min\{2w_j,n\}.
$$

$w_0=1$ から帰納的に $w_\ell\le\min\{2^\ell,n\}$ です。$w_\ell=n$ なら $2^\ell\ge n$、従って $\ell\ge\lceil\log_2n\rceil$ です。
<!-- proof-end -->

この上界は、量子情報を隠すための十分条件ではありません。実際にちょうど対数層で一種類の作用素を全サイトへ広げながら、日記を回収できなくする回路を作れます。

<a id="prop-bhi14-fanout-counterexample"></a>

<!-- formal-statement-start -->
> **命題（作用素の全域拡散だけではデカップリングしない）**
>
> $n=2^h\ge2$ 量子ビットの内部 $AB$ のうち第1量子ビットを日記 $A$ とし、残りを古い内部 $B$ とする。[BHI12の最大エンタングル投入状態](../BHI12/index.md#def-bhi12-old-input)を用いる。$h$ 層のCNOTゲートからなるユニタリ $F$ で、次の性質を同時に満たすものが存在する。

$$
F X_1 F^\dagger=X_1X_2\cdots X_n,
\qquad
F Z_1 F^\dagger=Z_1.
$$

> 新放射 $D$ の割り当て後も第1量子ビットが残存系 $C$ に含まれるなら、参照系 $M$ と $C$ はデカップリングせず、[BHI13のトレースノルム誤差](../BHI13/index.md#def-bhi13-decoupling-error)は $L\ge1$ である。
<!-- formal-statement-end -->

### 証明の見取り図

CNOTの制御側の $X$ は標的へ広がる一方、制御側の $Z$ はそのままです。毎層、既に広がった量子ビットをそれぞれ未使用の標的へつなぎます。最後まで保存される $Z_A$ と参照 $Z_M$ の相関がデカップリングを妨げます。

<!-- proof-start -->
### 証明

CNOTの制御を $c$、標的を $t$ とすると、計算基底への作用は $|a,b\rangle\mapsto|a,b\oplus a\rangle$ です。$|a,b\rangle$ に両辺を作用させて確かめると、共役作用は

$$
\mathrm{CNOT}_{c\to t}\,X_c\,\mathrm{CNOT}_{c\to t}^\dagger=X_cX_t,
\qquad
\mathrm{CNOT}_{c\to t}\,Z_c\,\mathrm{CNOT}_{c\to t}^\dagger=Z_c.
$$

最初は $X_1$ の台が $\{1\}$。第1層で $1\to2$、第2層で $1\to3$ と $2\to4$、以後各層で全ての既感染サイトを一つずつ新しい標的へ結ぶと、台は $1,2,4,\ldots,2^h$ 個となります。各層は互いに交わらないゲートなので[補題](#lem-bhi14-two-site-lightcone)の上界を達成します。どのゲートも第1量子ビットを標的にしないので $FZ_1F^\dagger=Z_1$ も成り立ちます。

初期の最大エンタングル対 $MA$ に対して $\langle Z_M Z_A\rangle=1$ です。$FZ_AF^\dagger=Z_A$ なので出力でも $\operatorname{Tr}(\rho_{MC}Z_MZ_1)=1$。比較する積状態では $\operatorname{Tr}(\pi_MZ_M)=0$ のため、

$$
\operatorname{Tr}[(\pi_M\otimes\rho_C)Z_MZ_1]=0.
$$

$Z_MZ_1$ の作用素ノルムは1です。[BHI13で定義した距離 $L$](../BHI13/index.md#def-bhi13-decoupling-error)を用い、$X=\rho_{MC}-\pi_M\otimes\rho_C$、$Y=Z_MZ_1$ と置くと、特異値に関する不等式から

$$
|\operatorname{Tr}(XY)|\le\|X\|_1\|Y\|_\infty=\|X\|_1.
$$

したがって

$$
L=\|\rho_{MC}-\pi_M\otimes\rho_C\|_1
\ge\left|\operatorname{Tr}[(\rho_{MC}-\pi_M\otimes\rho_C)Z_MZ_1]\right|=1.
$$

従って第1量子ビットが $C$ に残る限り、情報が積状態に隠れることはありません。
<!-- proof-end -->

$F X_1F^\dagger$ と離れた $Z_j$ の交換子は $j\ge2$ で非零になります。非可換性を測るOTOC型診断はこのような拡散を検出できますが、**一種類の作用素の広がりだけを見て量子情報全体の回収可能性を判定してはいけません**。実際、$Z_1$ は保存されます。量子カオスの診断と復号条件を区別する理由がここにあります。

## 4. なぜブラックホールでは $\beta\log S_{\rm BH}$ が現れるか

ここから重力側へ移ります。[BHI4の準静的蒸発模型](../BHI4/index.md#def-bhi4-energy-ledger)と[Schwarzschildの面積エントロピー](../../BHT/BHT9/index.md#prop-bht9-schwarzschild-entropy)に沿い、遠方静止観測者の時間 $u$、Hawking温度 $T_{\rm H}$、逆温度 $\beta=1/T_{\rm H}$ を使います。$\beta$ は自然単位で**時間**の次元を持ち、$\log S_{\rm BH}$ は無次元です。

モデルとして $n$ 個の有効二準位自由度がエントロピーを担い、$S_{\rm BH}\simeq n\log2$ と仮定します（実在の重力Hilbert空間を厳密に $n$ 個へ因数分解した主張ではありません）。さらに平均場の増殖率を $\gamma=\kappa/\beta$、$\kappa>0$ は無次元の模型パラメータと仮定します。

<a id="prop-bhi14-thermal-log-scaling"></a>

<!-- formal-statement-start -->
> **命題（熱的拡散模型の時間スケーリング）**
>
> $n\ge2$、$\beta>0$、$\kappa>0$ とし、[平均場の拡散時計](#def-bhi14-spreading-clock)の $\gamma=\kappa/\beta$ とする。この模型の半数到達時刻は

$$
t_{1/2}=\frac{\beta}{\kappa}\log(n-1).
$$

> $S_{\rm BH}=n\log2$ と置き、$\kappa$ を $n$ に依らず固定すると、大きな $S_{\rm BH}$ に対して

$$
t_{1/2}=\frac{\beta}{\kappa}\log S_{\rm BH}+O(\beta/\kappa)
$$

> である。これは拡散模型の結論であり、実際のブラックホールの完全scrambling時間の普遍的な定理ではない。
<!-- formal-statement-end -->

### 証明の見取り図

[対数到達時間定理](#thm-bhi14-logarithmic-clock)の $1/\gamma$ に $\beta/\kappa$ を代入し、$n=S_{\rm BH}/\log2$ を用います。

<!-- proof-start -->
### 証明

上の二つの仮定を代入すると

$$
t_{1/2}=\frac1\gamma\log(n-1)
=\frac{\beta}{\kappa}\log(n-1).
$$

次に $n=S_{\rm BH}/\log2$ なので

$$
\log(n-1)=\log S_{\rm BH}-\log(\log2)+\log(1-1/n).
$$

最後の二項は $n\to\infty$ で有界であり、$O(1)$ です。これに $\beta/\kappa$ を掛けて主張を得ます。
<!-- proof-end -->

四次元Schwarzschildの瞬間静的近似では、[温度と面積エントロピー](../../BHT/BHT9/index.md#prop-bht9-schwarzschild-entropy)は

$$
T_{\rm H}=\frac1{8\pi M},\qquad
\beta=8\pi M,\qquad S_{\rm BH}=4\pi M^2.
$$

従って代理時間の主項は $(8\pi M/\kappa)\log(4\pi M^2)$ です。仮に $\gamma=2\pi/\beta$ と**追加で**置くなら $\kappa=2\pi$ となり $t_{1/2}\simeq4M\log S_{\rm BH}$ ですが、この係数はここで採用した増殖率の仮定から出たもので、一般のブラックホールに無条件で適用する値ではありません。

量子カオスのLyapunov指数を $\lambda_L$ と書く文献には、特定の熱平衡・相関関数の解析性などを仮定した $\lambda_L\le2\pi/\beta$ というMaldacena–Shenker–Stanfordの評価があります。その $\lambda_L$ と本節の**平均場係数** $\gamma$ を同一視するには別の力学的根拠が必要です。近地平線の固有時と遠方時刻 $u$ も赤方偏移により異なるため、時計を固定せず係数を比較しません。

[準静的な質量三乗則](../BHI4/index.md#thm-bhi4-fraction-time)の時間尺度 $O(M^3)$ と比べると、定数係数を固定し大きな $M$ に限る模型では $O(M\log M)$ の拡散代理時間の方が短いです。ただし放射の実際の符号化率はこの比較だけでは決まりません。

## 5. 放射の収集時計をBHI13の閾値へ結び付ける

[BHI13の量子ビット閾値](../BHI13/index.md#cor-bhi13-extra-qubits)では、投入日記は $k$ 量子ビット、古い内部は $m$ 量子ビット、追加放射は $k+s$ 量子ビットでした。古い内部と早期放射 $BE$ は最大エンタングル対、新たな放射 $D$ は受信者が集めます。

しかし「何量子ビット集めればよいか」を「何時間で集められるか」に変えるには放射率が必要です。ここでは物理的な灰色体スペクトルを置き換えるのではなく、**受信者に渡る量子レジスタの有効量子ビット収集率** $r>0$ を時刻 $u$ 当たりの個数として独立に指定します。

<a id="def-bhi14-staged-clock"></a>

<!-- formal-statement-start -->
> **定義（二段階の放射収集模型）**
>
> 整数 $k\ge1,m\ge1,0\le s\le m$、実数 $r>0$、時刻 $\tau\ge0$ を固定する。日記 $A$ は $k$ 量子ビット、古い内部 $B$ と早期放射 $E$ はそれぞれ $m$ 量子ビットとし、初期状態は[BHI13のHaar投入・放出実験](../BHI13/index.md#def-bhi13-haar-experiment)と同じ二つの最大エンタングル対とする。
>
> 時刻 $0$ に投入し、時刻 $\tau$ に一度選ばれたHaarユニタリ $U:AB\to CD$ を有効写像として使用する。**これは連続時間でHaar性が発生することを仮定する模型上の操作である。** $D$ は $k+s$ 量子ビット、$C$ は $m-s$ 量子ビットとする。
>
> 時刻 $\tau$ より**後**に $D$ を受信者へ順次渡し、$(k+s)$ 個全ての引き渡しを終えるまでの所要時間を

$$
\Delta u_{\rm rad}=\frac{k+s}{r}
$$

> と定義する。収集完了時刻は $\tau+\Delta u_{\rm rad}$ とする。受信者は $E$ を量子的に保管する。
<!-- formal-statement-end -->

$c=2^{m-s}$、$d=2^{k+s}$、$a=2^k$、$b=2^m$ なら $cd=ab$ です。$s\le m$ が必要なのは残存系 $C$ の次元が少なくとも1となるためです。$\Delta u_{\rm rad}$ はこの模型の**全レジスタを引き渡す時間**であって、熱放射のエネルギー光度を量子ビット率に直接換算した値ではありません。

<!-- definition-example-start: def-bhi14-staged-clock -->
**定義の確認**： $k=2,m=6,s=3,r=2,\tau=5$ なら $A,B,C,D$ の次元は順に $4,64,8,32$ で、$4\cdot64=8\cdot32=256$。$D$ は5量子ビットなので収集時間は $5/2$、完了時刻は $5+5/2=7.5$ です。$E$ は64次元のままで、5量子ビットへ数え直しません。
<!-- definition-example-end -->

ここでHaar選択と対数時間は別々の仮定です。前節の平均場方程式、回路の光円錐上界だけでは、$\tau$ で得られた $U$ がHaar分布だとは示せません。**Haar性を補助仮定として指定したときだけ**、BHI13の確率定理を時刻に翻訳できます。

<a id="thm-bhi14-conditional-collection"></a>

<!-- formal-statement-start -->
> **定理（二段階模型での条件付き回収完了時刻）**
>
> [二段階の放射収集模型](#def-bhi14-staged-clock)において、$0<\varepsilon<1$、$0<\eta<1$ を指定し、

$$
s_*=\left\lceil\log_2\frac1{\varepsilon\sqrt\eta}\right\rceil
$$

> とする。$m\ge s_*$ で $s_*\le s\le m$ を選べば、時刻

$$
u_{\rm collect}=\tau+\frac{k+s}{r}
$$

> において、確率少なくとも $1-\eta$ で、受信側 $DE$ から日記へ作用するCPTP回復写像が**存在し**、その最適エンタングルメント不忠実度は $\varepsilon$ 以下となる。特に最少の余剰量 $s=s_*$ を採用すれば

$$
u_{\rm collect}=\tau+\frac{k+s_*}{r}.
$$

> ここで確率は有効Haarユニタリの選択についてだけ取る。**回復写像の計算・実行に要する時間を含まず**、一般の物理的な局所回路についての命題でもない。
<!-- formal-statement-end -->

### 証明の見取り図

[BHI13の高確率不忠実度界](../BHI13/index.md#cor-bhi13-extra-qubits)から $\Pr\{1-F_{\mathrm e,opt}\ge\varepsilon\}\le2^{-2s}/\varepsilon^2$。これを $\eta$ 以下にした後、収集率から時計へ換算します。

<!-- proof-start -->
### 証明

設定より $a=2^k,b=2^m,c=2^{m-s},d=2^{k+s}$ で $ab=cd$。初期の二つのBell対、Haar分布、受信側 $DE$ と環境 $C$ は[BHI13の回収閾値](../BHI13/index.md#thm-bhi13-recovery-threshold)の仮定に一致します。従ってその[量子ビット版](../BHI13/index.md#cor-bhi13-extra-qubits)により

$$
\Pr_U\{1-F_{\mathrm e,opt}(U)\ge\varepsilon\}
\le\min\left\{1,\frac{2^{-2s}}{\varepsilon^2}\right\}.
$$

右端を $\eta$ 以下にする十分条件は

$$
\frac{2^{-2s}}{\varepsilon^2}\le\eta
\quad\Longleftrightarrow\quad
2^{2s}\ge\frac1{\varepsilon^2\eta}
\quad\Longleftrightarrow\quad
s\ge\log_2\frac1{\varepsilon\sqrt\eta}.
$$

$s$ は整数なので $s\ge s_*$ です。$m\ge s_*$ なら $s$ を許される範囲に選べます。収集模型の定義から $D$ の $k+s$ 個を受け取るには $(k+s)/r$ の時間が要り、$U$ が選ばれる時刻 $\tau$ の後から収集するので $u_{\rm collect}=\tau+(k+s)/r$ です。すべてを受け取ると、$DE$ に作用する最適回復の**存在保証**を適用でき、成功確率は少なくとも $1-\eta$ になります。$s=s_*$ の場合は最後の等式です。
<!-- proof-end -->

**数値検算。** $\varepsilon=1/4,\eta=1/4$ とすると

$$
s_*=\left\lceil\log_2\frac1{(1/4)(1/2)}\right\rceil
=\lceil\log_2 8\rceil=3.
$$

実際、$2^{-2s_*}/\varepsilon^2=2^{-6}/(1/16)=1/4=\eta$。日記が $k=2$ 量子ビットで $r=2$ なら、$\tau$ の後の収集時間は $(2+3)/2=2.5$ です。

## 6. 並行放射・物理的な蒸発・復号計算量

前定理の和は、**scramblingの完了後に新放射を数え始める**二段階設定の定義によるものです。投入直後から放射が進む場合は別の時計になります。例えば時刻0から率 $r$ で集める模型で「少なくとも $\tau$ 経過」かつ「少なくとも $k+s$ 量子ビット収集」が両方必要なら、両条件を満たす最早時刻の形式的下界は

$$
u_{\rm earliest}\ge\max\left\{\tau,\frac{k+s}{r}\right\}.
$$

これは二条件だけから出る下界です。$\max$ に達した段階で放射状態が本当にデカップリングしていると保証するわけではありません。投入前・混合途中・混合後のどの放射に日記の情報が載るかは、**時間依存のチャネル**を具体的に指定して調べます。

高エネルギー光度 $L(M)$ から直接 $r$ を決めることもできません。[BHI4の灰色体・種数依存](../BHI4/index.md#prop-bhi4-variable-coefficient)の通り、放射のモード・周波数と透過率を知る必要があり、受信者が利用可能な論理量子ビット数にはさらに符号化・保存・誤りの条件が入ります。

最後に回復写像の**存在**と**実装**を区別します。

- **数学上の回収時刻:** 上の定理で $DE$ がそろい、最適なCPTP回復が存在すると分かる時刻。
- **回復演算の構築:** 与えられた $U$ を使い、回復チャネルの古典的記述や量子回路を求める計算。
- **回復の実行:** 求めた回路を $DE$ に作用させ、出力を検証する作業。

これらは異なる課題です。例えば単純なSWAPで $A$ が $D$ へ移されれば[BHI12の完全回収例](../BHI12/index.md#thm-bhi12-recovery-condition)のように短い回路で元に戻せますが、そこでscramblingは必要ありません。一方、[BHI13のHaar回収定理](../BHI13/index.md#thm-bhi13-recovery-threshold)は最適回復写像の計算量上界を一つも与えません。Harlow–Haydenの計算複雑性の議論も、特定の復号課題の困難性についてのものであり、全ユニタリに対する無条件の不可能定理ではありません。

この講義の結論は、**「短い拡散時計」＋「その時点の十分なscramblingの追加仮定」＋「放射収集率」から回復の存在時刻を条件付きで得られる**ということです。実際の回復アルゴリズムや重力内外の厳密な部分系分割は、それぞれ別の検討が要ります。

## 7. 演習：時間・広がり・回収保証を分けて計算する

### Level A：定義・単位・境界を確かめる

<a id="ex-bhi14-a01"></a>

#### BHI14-A01 半数到達時刻の直接計算

- Level: A
- 問題: [平均場の拡散時計](#def-bhi14-spreading-clock)で $n=32,\gamma=1/2$ とする。$x(0)$、$x(\infty)$、$t_{1/2}$ を求めよ。$\gamma$ の次元も記せ。

<!-- solution-start -->
**詳細解答。** 定義から $x(0)=1$。解の式に $u\to\infty$ を代入すると $e^{-\gamma u}\to0$ より $x(\infty)=n=32$（有限時刻では到達しない）。[対数到達時間](#thm-bhi14-logarithmic-clock)から $t_{1/2}=\gamma^{-1}\log(n-1)=2\log31\simeq6.868$。$\gamma x$ と $dx/du$ の単位を比較すると $\gamma$ の単位は時間の逆数である。
<!-- solution-end -->

<a id="ex-bhi14-a02"></a>

#### BHI14-A02 二つのしきい値の差

- Level: A
- 問題: $n=8,\gamma=1$ のとき $\theta=1/4$ および $\theta=3/4$ の到達時刻を求め、その差を計算せよ。

<!-- solution-start -->
**詳細解答。** どちらも $1/n=1/8$ より大きいので[到達時間式](#thm-bhi14-logarithmic-clock)を使える。$\theta=1/4$ なら $(n-1)\theta/(1-\theta)=7(1/4)/(3/4)=7/3$、従って $t_{1/4}=\log(7/3)$。$\theta=3/4$ なら比は $7(3/4)/(1/4)=21$ なので $t_{3/4}=\log21$。差は $\log21-\log(7/3)=\log9$ である。対数の引数はいずれも無次元である。
<!-- solution-end -->

<a id="ex-bhi14-a03"></a>

#### BHI14-A03 回路層数と実現例

- Level: A
- 問題: 16量子ビットで、各層のゲートは互いに交わらない二体ゲートのみとする。一つの量子ビット上の演算子を全域へ広げる層数の下界を求めよ。各層で達する台の大きさを挙げよ。

<!-- solution-start -->
**詳細解答。** [台の上界補題](#lem-bhi14-two-site-lightcone)より $16\le2^\ell$ が必要なので $\ell\ge4$。各層で既感染量子ビットを制御側、新しい量子ビットを標的とするCNOTを互いに重ならないように並べれば、初期の台1個から各層後の台は2、4、8、16個となる。$X$ のCNOT共役規則を使った構成であり、この事実だけでは量子状態のデカップリングを示していない。
<!-- solution-end -->

<a id="ex-bhi14-a04"></a>

#### BHI14-A04 遠方時計と温度

- Level: A
- 問題: 自然単位のSchwarzschild近似で $M=10$ とする。$\beta,S_{\rm BH}$ を求め、模型仮定 $\kappa=2\pi$ の下で[熱的拡散の主項](#prop-bhi14-thermal-log-scaling)を表示せよ。$S_{\rm BH}$ に単位はあるか。

<!-- solution-start -->
**詳細解答。** [Schwarzschildの質量依存](../../BHT/BHT9/index.md#prop-bht9-schwarzschild-entropy)から $\beta=8\pi M=80\pi$、$S_{\rm BH}=4\pi M^2=400\pi$。$\beta/\kappa=80\pi/(2\pi)=40$ なので主項は $40\log(400\pi)$。これは$n$ が大きいときのモデル近似であり、有限 $n$ の厳密式 $(\beta/\kappa)\log(n-1)$ とは区別する。$S_{\rm BH}$ は自然単位で無次元で、対数の中に時間や質量の次元を残してはならない。
<!-- solution-end -->

<a id="ex-bhi14-a05"></a>

#### BHI14-A05 余剰放射数と次元

- Level: A
- 問題: $k=2,m=6,\varepsilon=\eta=1/4$ とする。[条件付き回収定理](#thm-bhi14-conditional-collection)で必要な最小 $s$、$D,C$ の次元、$\Pr\{\mathrm{failure}\}$ の上界を求めよ。

<!-- solution-start -->
**詳細解答。** $\varepsilon\sqrt\eta=(1/4)(1/2)=1/8$ より $s_*=\lceil\log_2 8\rceil=3\le m$。$d_D=2^{k+s}=2^5=32$、$d_C=2^{m-s}=2^3=8$ である。確率界は $2^{-2s}/\varepsilon^2=(1/64)/(1/16)=1/4$。これはHaar抽選について最適不忠実度が $\varepsilon$ 以上となる事象の上界であり、任意の固定したユニタリについての失敗確率ではない。
<!-- solution-end -->

### Level B：推論の条件と反例を検査する

<a id="ex-bhi14-b01"></a>

#### BHI14-B01 全域へ広がっても残る相関

- Level: B
- 問題: [fanout反例](#prop-bhi14-fanout-counterexample)のCNOT木で、第1量子ビットが $C$ に残るとする。$X_1$ の台が全域になる理由と、$\rho_{MC}$ が積状態にならない理由を別々に示せ。

<!-- solution-start -->
**詳細解答。** 制御 $c$・標的 $t$ のCNOTは $X_c$ を $X_cX_t$ に変える。各層で既存の台を互いに異なる未使用の標的に拡げるので、$h=\log_2n$ 層後には $FX_1F^\dagger=X_1\cdots X_n$。一方、制御側の $Z_1$ は全ゲートと可換なので $FZ_1F^\dagger=Z_1$。初期Bell対から $\operatorname{Tr}\rho_{MC}Z_MZ_1=1$。もし $\rho_{MC}=\pi_M\otimes\rho_C$ なら左辺は $\operatorname{Tr}\pi_MZ_M\operatorname{Tr}\rho_CZ_1=0$ となり矛盾。双対ノルム評価から $L\ge1$。演算子の**台**の大きさと、参照系との**相関**は異なる量である。
<!-- solution-end -->

<a id="ex-bhi14-b02"></a>

#### BHI14-B02 並行収集の下界と二段階模型

- Level: B
- 問題: $\tau=6$、$k+s=8$ 量子ビット、$r=2$ 量子ビット／時間とする。二段階模型の収集完了時刻を求めよ。時刻0から並行して収集する別模型において、$\tau$ の経過と8量子ビット収集が共に必要な場合の形式的下界を求めよ。この下界をそのまま回復の十分条件として使えるか。

<!-- solution-start -->
**詳細解答。** 8量子ビットの収集時間は $\Delta u_{\rm rad}=8/2=4$。二段階模型では時刻6の後から集めるので完了は $6+4=10$。並行模型では時刻6と時刻4の双方以後でなければならず、最早時刻は $u\ge\max\{6,4\}=6$。ただし並行放出の個々の量子ビットが日記の情報をどの程度符号化するかを指定していないため、時刻6にデカップリングしたとは結論できない。下界を十分条件に読み替えるのは誤りである。
<!-- solution-end -->

<a id="ex-bhi14-b03"></a>

#### BHI14-B03 高確率を保証する収集時計

- Level: B
- 問題: $\varepsilon=1/8,\eta=1/16,k=3,m=9,r=4,\tau=6$ とする。最小の余剰量子ビット数、回収保証を適用できる収集完了時刻、確率界を求めよ。古い放射 $E$ を新放射量に加算してよいか。

<!-- solution-start -->
**詳細解答。** $\sqrt\eta=1/4$ で $\varepsilon\sqrt\eta=(1/8)(1/4)=1/32$、よって $s_*=\lceil\log_2 32\rceil=5\le9$。新放射は $k+s=8$ 量子ビットだから収集時間は $8/4=2$、収集完了時刻は $6+2=8$。確率上界は $2^{-2s}/\varepsilon^2=2^{-10}/(1/64)=1/16=\eta$。$E$ は投入前から受信者が保持する早期放射で、今回の8量子ビットには加えない。確率はHaarユニタリの抽選についてだけである。
<!-- solution-end -->

<a id="ex-bhi14-b04"></a>

#### BHI14-B04 質量スケールと蒸発時間の比較

- Level: B
- 問題: 瞬間Schwarzschild近似で $\kappa=2\pi$ と仮定し、$t_{\rm spread}=4M\log(4\pi M^2)$ と置く。さらに独立に質量収支模型 $dM/du=-C/M^2$（$C>0$一定）で形式寿命 $\tau_{\rm evap}=M^3/(3C)$ と置く。時間比を求め、$M\to\infty$ でどうなるか説明せよ。

<!-- solution-start -->
**詳細解答。** [熱的拡散のスケーリング](#prop-bhi14-thermal-log-scaling)で $\beta=8\pi M,\kappa=2\pi$ を代入すると先頭係数が $4M$ となる。[BHI4の質量三乗則](../BHI4/index.md#thm-bhi4-fraction-time)の形式寿命と割り算すると

$$
\frac{t_{\rm spread}}{\tau_{\rm evap}}
=\frac{4M\log(4\pi M^2)}{M^3/(3C)}
=\frac{12C\log(4\pi M^2)}{M^2}.
$$

$C$ 固定では $\log M/M^2\to0$ なので比は0に収束する。これは「拡散代理時間が形式寿命より漸近的に短い」という比較であって、蒸発終期までの半古典近似や物理的な復号実行時間を証明するものではない。
<!-- solution-end -->

### Level C：二つの理論を混同せず統合する

<a id="ex-bhi14-c01"></a>

#### BHI14-C01 古いブラックホールの情報回収時計

- Level: C
- 問題: 内部は $n=64$ 個の有効量子ビットからなり、日記は $k=2$、古い内部は $m=62$ 量子ビットである。平均場では $\gamma=\kappa/\beta$、$\kappa=1$、$\beta=2$ とする。半数到達時刻を二段階模型の $\tau$ とし、収集率 $r=2$、誤差目標 $\varepsilon=\eta=1/4$ とする。次を求めよ。

  1. scrambling代理時間。
  2. 必要余剰量 $s$ と $C,D$ の次元。
  3. 収集完了時刻と高確率回収の意味。
  4. fanout回路へこの結論をそのまま適用できない理由。
  5. 並行放出の場合の形式的下界。

<!-- solution-start -->
**詳細解答。**

(1) $\gamma=\kappa/\beta=1/2$。[平均場定理](#thm-bhi14-logarithmic-clock)より

$$
\tau=t_{1/2}=\frac1\gamma\log(n-1)
=2\log63\simeq8.286.
$$

(2) $\varepsilon\sqrt\eta=(1/4)(1/2)=1/8$ だから $s_*=\lceil\log_2 8\rceil=3\le m=62$。$D$ の量子ビット数は $k+s=5$、$C$ の量子ビット数は $m-s=59$。従って $d_D=2^5=32$、$d_C=2^{59}$ で、$d_Cd_D=2^{64}=d_Ad_B$ が保たれる。

(3) 二段階模型では収集時間が $5/2=2.5$ なので

$$
u_{\rm collect}=2\log63+\frac52\simeq10.786.
$$

[二段階模型での条件付き回収完了時刻](#thm-bhi14-conditional-collection)から、時刻 $\tau$ に選ぶ有効ユニタリが**[BHI13のHaar投入・放出実験](../BHI13/index.md#def-bhi13-haar-experiment)と同じ抽選法に従う**という追加仮定を置いた場合だけ、少なくとも $1-\eta=3/4$ の抽選確率で、最適エンタングルメント不忠実度 $\varepsilon=1/4$ 以下のCPTP回復写像が存在する。復号器を求める計算時間はこの10.786へ含めない。

(4) [fanout反例](#prop-bhi14-fanout-counterexample)の作用素台は $\log_2n=6$ 層で全域へ広がる。しかし $Z_A$ の相関が保存され、$A$ が $C$ に残れば $L\ge1$ である。したがって平均場の半数到達や作用素の全域拡散だけからHaar性を導くことはできず、(3)をfanoutへ移せない。

(5) 時刻0から並行に5量子ビットを集める設定なら、二つの必要条件だけからの形式的下界は

$$
u\ge\max\{2\log63,5/2\}=2\log63\simeq8.286.
$$

これは二段階模型の10.786より短いが、混合途中の放射の状態を与えていないため、この時刻で回収可能と結論することはできない。
<!-- solution-end -->

## 8. 何を証明し、何を物理仮定として残したか

| 対象 | この講義の判定 |
| --- | --- |
| 平均場の対数到達時間 | 指定したロジスティック微分方程式の厳密解 |
| 二体ゲートの $\log_2 n$ 層下界 | ゲート層の非重複性の下での厳密な回路結果 |
| 作用素台の全域拡散 $\Rightarrow$ デカップリング | fanoutで反例。一般には成立しない |
| $t_{\rm scr}\sim\beta\log S_{\rm BH}$ | 時間の規約・増殖率・自由度の対応を置く物理的スケーリング |
| 回収存在時刻 $\tau+(k+s)/r$ | 時刻 $\tau$ でのHaar有効写像と二段階収集を仮定した高確率保証 |
| 実際の回復アルゴリズムの実行時間 | 本講の存在定理では未評価 |

次のBHI15では、これまでの $AB\to CD$ というテンソル積の分け方そのものに立ち戻り、ゲージ制約や局所演算子代数において単純な内部・外部の部分系分割が成立するかを検討します。

### 参照文献

- P. Hayden and J. Preskill, [*Black Holes as Mirrors: Quantum Information in Random Subsystems*](https://arxiv.org/abs/0708.4025) (2007): 古いブラックホール、回収時間、復号の設定。
- Y. Sekino and L. Susskind, [*Fast Scramblers*](https://arxiv.org/abs/0808.2096) (2008): 対数scramblingの物理的予想。
- J. Maldacena, S. H. Shenker and D. Stanford, [*A Bound on Chaos*](https://arxiv.org/abs/1503.01409) (2016): 特定の熱的相関関数における成長率の制約。
- D. Harlow and P. Hayden, [*Quantum Computation vs. Firewalls*](https://arxiv.org/abs/1301.4504) (2013): 復号の計算複雑性と観測可能性。
