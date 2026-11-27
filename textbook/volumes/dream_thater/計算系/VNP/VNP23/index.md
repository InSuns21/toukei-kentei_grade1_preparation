# VNP23 N：Laurent切断、近似few-term lemma・近似accelerator、VNP not⊆ closure(VP)

[第22講](../VNP22/index.md#thm-vnp22-all-fields)では厳密な算術回路の下界を得た。しかし微小な誤差を許す回路について、厳密な下界だけから同じ結論は出ない。そこで形式変数を導入し、誤差を正次数へ閉じ込める。平坦側ではテンソルの冪、収縮側では加速器の尺度変更と定数項抽出が鍵となる。

一次資料：Claude (Anthropic), [VP ≠ VNP over every field, v1](https://hexagonmath.org/2611.00954v1), Appendix N。以下は論文の主張の再構成であり、形式化の対応箇所を示す。

## 1. Laurent級数と近似

体 $F$ 上の形式Laurent級数体 $F((\varepsilon))$ は、指数が下に有界な形式和 $\sum_{i\ge-D}a_i\varepsilon^i$ からなる。$D$ は非負整数で、係数は $F$ の元である。負次数を含まない部分環を $F[[\varepsilon]]$ とし、有限個の項だけを持つ部分環を $F[\varepsilon,\varepsilon^{-1}]$ と書く。積の各係数は有限和で定まる。ここで収束は数値的な極限ではない。

<a id="def-vnp23-approx"></a>

<!-- formal-statement-start -->
> **定義（近似算術回路）**
>
> $f\in F[X_1,\ldots,X_d]$、$s\ge1$ とする。$F((\varepsilon))$ 上の除算なし二入力算術回路で全ゲート数が高々 $s$、出力が
>

$
f+\varepsilon G,\quad G\in F[[\varepsilon]][X_1,\ldots,X_d]
$

>
> となるものを $f$ の近似算術回路という。この存在を $\operatorname{Approx}_F(f,s)$ と書く。
<!-- formal-statement-end -->

[全ゲート数](../VNP1/index.md#def-vnp1-total-gates)には入力・定数・演算ゲートを含める。定義は、全ての変数単項式についてLaurent係数の負次数が消え、次数0が目標係数に一致することを要求する。

<!-- definition-example-start: def-vnp23-approx -->
**定義の確認**

例として $X$、$\varepsilon^{-1}$、$\varepsilon+\varepsilon^2$ の3入力と2乗算を取る。出力は

$$
X\varepsilon^{-1}(\varepsilon+\varepsilon^2)=X+\varepsilon X.
$$

負次数が消え、次数0が $X$ なので5ゲートの近似回路である。
<!-- definition-example-end -->

対して $\varepsilon^{-1}X+X$ は次数0が正しくても負次数が残る。

## 2. 有限個のLaurent係数で十分な理由

無限級数を直接保持する必要はない。回路内で何回掛けても、負次数の下限から必要な正次数を先に計算できる。

<a id="lem-vnp23-cutoff"></a>

<!-- formal-statement-start -->
> **補題（Laurent切断の保存則）**
>
> 有限個のLaurent級数 $a_j$ の指数が全て $-D$ 以上とする。$D\ge0$、$n\ge1$ は整数とする。各 $a_j$ を指数 $N=nD+1$ 未満の項だけに切断する。このとき高々 $n$ 個の因子（反復可）からなる積の非正次数の係数は保存される。
<!-- formal-statement-end -->

<!-- proof-start -->
### 証明

切断を $a'_j$ と書く。積の因子数を $k\le n$ とする。差は

$$
\prod_{j=1}^k a_j-\prod_{j=1}^k a'_j
=\sum_{i=1}^k
\left(\prod_{j<i}a'_j\right)(a_i-a'_i)
\left(\prod_{j>i}a_j\right).
$$

右辺各項の最小可能次数は $N-(k-1)D\ge D+1>0$ である。係数の打ち消しは最小次数をさらに上げることしかできない。空積の差は0なので結論はその場合にも成立する。
<!-- proof-end -->

$s$ ゲートの回路に現れる定数を独立な変数として扱うと、各ゲートの次数は加算で最大値以下、乗算で和以下となる。入力の次数を1とすれば、ゲートを一つ進むたび最大次数は高々2倍なので $2^s$ が上界である。したがって各定数の共通下限を $-D$ とし $n=2^s$ を取れば、出力の全単項式係数について切断が成立する。置き換えるのは定数ゲートの値だけで、ゲート数は変わらない。

例：$(\varepsilon^{-2}+1)(\varepsilon^2+\varepsilon^7)$ の定数項は1である。両因子を正次数なしに切ると1を失うが、$D=2,n=2$ なら $N=5$ の切断で $\varepsilon^2$ を残せる。

## 3. 平坦側：近似被覆の費用

[少数項の選択費用](../VNP12/index.md#thm-vnp12-few)は、有限の材料テンソルを局所線形写像で変換して足し合わせる際の評価を与えた。局所写像の係数がLaurent多項式の場合にも、この費用を増やさずに定数項を取り出したい。

<a id="lem-vnp23-few"></a>

<!-- formal-statement-start -->
> **補題（近似少数項の選択費用）**
>
> 体 $F$ 上の有限非空party集合 $V$ と非空部分集合 $P\subseteq V$、[被覆型スペクトル点](../VNP3/index.md#def-vnp3-cover-spectral) $\phi$ を取る。$J\ge1$ 個の材料 $T_j$ にLaurent多項式係数の局所線形写像を施した結果を $S_j(\varepsilon)$ とする。和が $t+\varepsilon E(\varepsilon)$ で $E$ の次数が非負、$P$ 外の $t$ の添字集合が一元集合なら
>
$$
\phi(t)\le J^{g_\phi(P)}\max_{1\le j\le J}\phi(T_j).
$$
>
> ここで $g_\phi(P)$ は[対角資源の指数](../VNP3/index.md#lem-vnp3-exponents)である。
<!-- formal-statement-end -->

<!-- proof-start -->
### 証明

[局所制限の和による被覆](../VNP2/index.md#def-vnp2-sum-restrictions)の係数式を使う。全局所写像の係数の指数を含む有限区間 $[-D,D]$ を選ぶ。$M=\max_j\phi(T_j)$ とする。$M=0$ なら材料は零で結論は直ちに成立する。

$n$ 重のテンソル積を取ると、正次数の誤差が定数項に寄与しないから

$$
t^{\otimes n}=[\varepsilon^0]
\sum_{w\in[J]^n}S_{w_1}\otimes\cdots\otimes S_{w_n}.
$$

固定した語 $w$ に対応する材料は $T_{w_1}\otimes\cdots\otimes T_{w_n}$ である。各party $v$ の局所写像のテンソル積を $\sum_{i=-nD}^{nD}\varepsilon^i L_{v,i}$ と展開する。定数項に寄与するのは $\sum_{v\in V}i_v=0$ を満たす組だけで、その組ごとに $F$ 上の局所写像 $\bigotimes_{v\in V}L_{v,i_v}$ が得られる。

組は高々 $(2nD+1)^{|V|}$ 個、語は $J^n$ 個である。材料の評価は乗法性から高々 $M^n$ であり、外側の添字集合は冪を取っても一元集合である。[少数項の選択費用](../VNP12/index.md#thm-vnp12-few)をこの通常の被覆へ適用すると

$$
\phi(t)^n\le
\bigl(J^n(2nD+1)^{|V|}\bigr)^{g_\phi(P)}M^n.
$$

$n$ 乗根を取り、$\log(2nD+1)/n\to0$ を使えば多項式個の追加材料の費用は1へ収束する。よって主張を得る。
<!-- proof-end -->

例えば材料数2、party数3、$D=1$ なら $n$ 重積の材料数上界は $2^n(2n+1)^3$ であり、指数的増加率は依然2である。

<a id="thm-vnp23-flat"></a>

<!-- formal-statement-start -->
> **定理（完全な族の近似平坦側下界）**
>
> 体 $F$ が[平坦仮説](../VNP9/index.md#def-vnp9-cases)を満たし、多項式族 $G_m$ が固定倍率 $\kappa$ で[格子和に対して完全](../VNP22/index.md#def-vnp22-grid-complete)とする。十分大きな $m$ について $\operatorname{Approx}_F(G_m,s)$ なら
>
$$
s>2^{(\log_2 m)^{4/3}/1600^2}
$$
>
> が成立する。
<!-- formal-statement-end -->

<!-- proof-start -->
### 証明

[完全な族への節和の代入](../VNP22/index.md#thm-vnp22-clause-projection)は $\varepsilon$ に依存しない。したがって $G_m+\varepsilon E$ を代入しても、目標の完全ネットワーク多項式 $f_{k,\ell}$ に正次数の誤差が加わるだけで、回路費用は高々 $5s$ である。

[二ハブ被覆](../VNP11/index.md#thm-vnp11-hub-cover)の回路分解をLaurent級数体上で行う。材料となるwireは係数0または1で元の体上にある。Laurent係数が必要なのは局所写像だけである。全局所写像は有限次元で有限個の成分しかなく、各出力係数はparty数個の因子の積の有限和である。[Laurent切断の保存則](#lem-vnp23-cutoff)で写像成分を有限多項式に切り、[近似少数項の選択費用](#lem-vnp23-few)を元の体 $F$ 上のスペクトル点に適用する。

これで[平坦側の回路評価](../VNP12/index.md#thm-vnp12-flat-rate)における被覆不等式がそのまま成立する。距離、wire長、材料数の評価は変更されない。したがって $\ell\ge100\sqrt{k}$ の条件で

$$
\log_2(5s)\ge \ell k^{3/2}/16.
$$

[完全な族の平坦側下界](../VNP22/index.md#thm-vnp22-flat-general)と同じ整数選択を行う。$L=\log_2 m$、$r=\lfloor(\lfloor L\rfloor/200)^{1/3}\rfloor$、$k=r^2$、$\ell=100r$ と置く。十分大きい $r$ で $\kappa k^3\ell 2^{k\ell}\le 2^{200r^3}\le m$、また $\ell=100\sqrt{k}$ である。$r\ge (L/200)^{1/3}/2$ が十分大きな $L$ で成立し、

$$
\log_2 s\ge \frac{100r^4}{16}-\log_2 5
\ge \frac{100}{256\cdot200^{4/3}}L^{4/3}-\log_2 5.
$$

$200^{1/3}<6$ より右辺の係数は $100/(256\cdot1200)>1/1600^2$ である。定数 $\log_2 5$ を吸収するほど大きな $m$ を選べば結論が従う。
<!-- proof-end -->

## 4. 収縮側：近似加速器

[加速器](../VNP21/index.md#def-vnp21-accelerator)は有限の定数木とプログラムを保持し、短い入力を所定の枝時間内で評価する。定数の環をLaurent多項式へ変え、値の条件だけを緩める。以下 $\lg u=\lfloor\log_2 u\rfloor+1$ とする。

<a id="def-vnp23-acc"></a>

<!-- formal-statement-start -->
> **定義（近似加速器）**
>
> 可換環 $A$、有限台の重み関数 $\theta$、可換 $A$-代数 $R$、整数 $H\ge32,v\ge2,s\ge1$ を固定する。定数木 $K$ の葉は $R[\varepsilon,\varepsilon^{-1}]$ の元、木プログラムを $D$、指数上界を $B$ とする。
>
> 1. サイズ $v^{H-32}$ 以下の全入力で全枝が停止し、受理枝時間は $v^{H-16}$ 以下、定数名は葉の値 $\lambda$ の冪 $\lambda^{2^i}$ ($0\le i<B$) のみを指定する。
> 2. さらに入力が $v^H$-plain なら、値は
>
$$
\operatorname{val}(D,z)-\iota(\operatorname{pv}(z))
\in\varepsilon R[\varepsilon]
$$
>
> を満たす（$\iota:A\to R$ は構造写像）。
> 3. $K$ の節点数と $D$ のサイズはともに $s$ 以下、高さ $\eta\le L^2$、$B\le L^3$、ただし $L=\lg(\max(v^H,s))$ とする。
>
> これらを満たす組を近似加速器という。
<!-- formal-statement-end -->

<!-- definition-example-start: def-vnp23-acc -->
**定義の確認**

零環 $R=\{0\}$ と単位を保つ構造写像 $\iota:A\to R$ を取る。入力を読まず拒否する停止プログラム $D$、値0の一節点の定数木、$B=1$、$s\ge\max(1,|D|)$ とする。全入力で停止し、受理枝がないので名前と枝時間の条件は空虚に成立する。plain入力でも空和0が $\iota(\operatorname{pv}(z))=0$ に一致し、誤差は0である。節点数1、コード長 $|D|\le s$、高さ0、$1\le(\lg(\max(v^H,s)))^3$ より残るサイズ条件も満たす。
<!-- definition-example-end -->

この退化例のため不存在定理では非零環を要求する。

非零環では、誤差が正次数でも $\varepsilon^{-1}$ を掛ければ次数0へ移る。再尺度化の大きさを決めるには定数の指数幅と項数を別々に管理する必要がある。

<a id="def-vnp23-span"></a>

<!-- formal-statement-start -->
> **定義（Laurent指数幅と冪の疎性）**
>
> Laurent多項式 $a$ と非負整数 $M,\Delta$ に対し、非零係数の指数集合を $\operatorname{supp}(a)$ と書く。
>
$$
\operatorname{Span}(M,a)
\iff \operatorname{supp}(a)\subseteq[-M,M].
$$
>
$$
\operatorname{Thin}(\Delta,a)
\iff \forall n\ge0,\quad
|\operatorname{supp}(a^n)|\le2n\Delta+1.
$$
<!-- formal-statement-end -->

<!-- definition-example-start: def-vnp23-span -->
**定義の確認**

例えば非零環上で $a=\varepsilon^{-1000}+\varepsilon^{1000}$ は幅1000であり、$n$ 乗の指数は $-1000n+2000j$ ($0\le j\le n$) に限られる。項数は高々 $n+1\le2n+1$ なので $\operatorname{Thin}(1,a)$ である。係数が標数によって消えても上界は保たれる。空の冪 $n=0$ も1項なので条件に含まれる。
<!-- definition-example-end -->

<a id="lem-vnp23-rescale"></a>

<!-- formal-statement-start -->
> **補題（再尺度化による誤差の保存）**
>
> $R$ を可換環、$q_i-p_i\in\varepsilon R[\varepsilon]$ ($p_i\in R$) とし、Laurent多項式 $b$ の指数は $-M$ 以上とする。正整数 $r>M$ に対し
>
$$
b\left(\prod_i q_i(\varepsilon^r)-\prod_i p_i\right)
\in\varepsilon R[\varepsilon].
$$
<!-- formal-statement-end -->

<!-- proof-start -->
### 証明

$q_i=p_i+\varepsilon E_i(\varepsilon)$ と書く。置換後は $q_i(\varepsilon^r)=p_i+\varepsilon^r E_i(\varepsilon^r)$ である。積の展開で全て $p_i$ を選んだ項を引けば、残る各項は少なくとも一つ $\varepsilon^r$ を含み、他の因子も非負次数である。$b$ を掛けた最低可能次数は $r-M\ge1$ である。

また $\operatorname{Span}(M,a)$ なら $a^n$ の指数は $[-nM,nM]$ なので $\operatorname{Thin}(M,a)$ である。置換 $\varepsilon\mapsto\varepsilon^r$ は指数を $r$ 倍し、整数上で単射であるため各冪の非零項数は変えない。従って幅が $rM$ となっても疎性の $\Delta$ はそのまま保てる。
<!-- proof-end -->

$b=\varepsilon^{-3}$、$q=2+\varepsilon$、$p=2$ なら $r=3$ では誤差1が残り、$r=4$ では誤差が $\varepsilon$ になる。

## 5. 定数項だけを評価する

[定数使用の後置](../VNP21/index.md#thm-vnp21-postpone)では、定数木を展開して許可された冪を葉にし、各葉の使用回数を先に予算として選ぶ。以下 $Q_B$ を展開木の節点数、$q\le Q_B$ を葉数、$a_i$ を葉の値、$e_i$ を使用回数とする。プログラムの値は回数を固定した枝の重みの和 $s_e$ を用いて $\sum_e s_e\prod_i a_i^{e_i}$ と書ける。

<a id="lem-vnp23-extraction"></a>

<!-- formal-statement-start -->
> **補題（定数項抽出の正しさ）**
>
> 有限個の予算 $e=(e_1,\ldots,e_q)$ で $0\le e_i<2^J$、各葉 $a_i$ の指数幅が高々 $M$ とする。$s_e\in R$ とし、$2^W>q2^JM$ と取る。
>
> 各 $a_i^{e_i}$ から一つの非零項を選び、指数和を $2^W$ で割った余りが0の選択だけについて係数の積に $s_e$ を掛けて足す。この値は $\sum_e s_e\prod_i a_i^{e_i}$ の定数項に等しい。
<!-- formal-statement-end -->

<!-- proof-start -->
### 証明

$a_i^{e_i}=\sum_d c_{i,d}\varepsilon^d$ と展開する。各選択の指数和は

$$
\left|\sum_i d_i\right|
\le\sum_i |d_i|
\le\sum_i e_iM
<2^W.
$$

従って余り0と指数和0は同値である。各固定予算で寄与する係数積の和は、分配法則から厳密に積の定数項となる。全予算について和を取り、係数抽出の線形性を使えば結論を得る。
<!-- proof-end -->

例：$(\varepsilon^{-3}+2)(\varepsilon^3+1)$ では指数の組 $(-3,3),(0,0)$ が寄与し、定数項は $1+2=3$ である。法2では $\varepsilon^2$ の指数も余り0になり、幅の条件がなければ誤判定する。

### プログラムへの実装

展開前の定数木の高さを $\eta$、定数冪のビット上限を $B$ とする。葉は元の定数 $a$ の $2^b$ 乗（$b<B$）である。元の葉が $\operatorname{Span}(M,a)$ と $\operatorname{Thin}(\Delta,a)$ を満たすとする。予算 $e<2^J$ で選ぶべき冪 $a^{2^be}$ は高々 $2\cdot 2^{B+J}\Delta+1$ 項なので、項選択のビット数 $m$ を

$$
2^m\ge 2\cdot2^{B+J}\Delta+1
$$

とすれば十分である。指数和の幅は高々 $Q_B2^{B+J}M$ なので $2^W$ をそれより大きく取る。

形式化の [ApproxExtract.lean](https://github.com/anthropics/formal-math/blob/db8472ee0fe3ebea21765160a6e3a04f5eaba4c5/vp-vnp/NS1/ApproxExtract.lean) の coefK, xL, xF は次の再帰を実装する。

1. 空木：空の予算、係数1、指数0。
2. 葉：$J$ ビットで使用回数、$m$ ビットで冪の項を選ぶ。存在しない項は係数0で埋める。選択した係数を定数木から読み、指数の $W$ ビット表現を返す。
3. 内部節点：左右の予算を組にし、係数を掛け、指数を法 $2^W$ で加える。
4. [ApproxBack.lean](https://github.com/anthropics/formal-math/blob/db8472ee0fe3ebea21765160a6e3a04f5eaba4c5/vp-vnp/NS1/ApproxBack.lean) の extF は余りが0のときだけ元のプログラムを選択した予算で評価する。

各展開葉に深さ $J+m$ の二分木を付けるから、新しい木の節点数は $Q_B2^{J+m+1}$ 以下、高さは $\eta+B+J+m$ 以下である。指数の巨大な絶対値に比例した木を作らない点が重要である。

[ApproxRound.lean](https://github.com/anthropics/formal-math/blob/db8472ee0fe3ebea21765160a6e3a04f5eaba4c5/vp-vnp/Paper/ApproxRound.lean) の prop_approx_acc_exact では、元の枝時間 $t<2^J$ に対し新しい枝時間上界として

$$
Q_B(60W+3(J+m)+100)
+\operatorname{MM}(\eta+B+J+1)t
+40Q_B(J+1)+40(W+1)+120
$$

を得る。$\operatorname{MM}(x)=1000+100x$ は後置評価の固定の線形費用関数である。第1項は各節点での予算・係数選択、次の項は元プログラム評価、残りは予算照合とカウンタの検査に対応する。新プログラム長の上界は、固定定数 $c_*$ を使い

$$
Q_B2^{J+m}\bigl(8(\eta+B+J+m+W)+c_*+31\bigr)
+|D|+c_*.
$$

形式化では xF_ev、extF_kv が評価の正しさ、sum_xL、coeff_wrap_zero が定数項抽出、size_xF、size_extF がプログラム長に対応する。

## 6. 尺度変更から不存在へ

[全尺度での分割](../VNP20/index.md#thm-vnp20-allscales)と[小加速器の不存在](../VNP21/index.md#thm-vnp21-noacc)の仮定を引き継ぐ。$\lg u=\lfloor\log_2 u\rfloor+1$ とし $H=16h$、$h\ge17$ とする。近似加速器を大尺度へ繰り返し移し、定数項抽出に必要な一冪分の時間余裕を作る。

<a id="thm-vnp23-noacc"></a>

<!-- formal-statement-start -->
> **定理（近似加速器の不存在）**
>
> [小加速器の不存在](../VNP21/index.md#thm-vnp21-noacc)と同じ有限生成環 $A$、$H=16h$ ($h\ge17$)、全尺度分割の仮定の下で、定数 $C,v_1$ が存在する。$v\ge v_1$、整数 $a\ge0$、$(\lg v)^{Ca}\le v$ なら、任意の非零可換 $A$ 代数上でサイズ $v^a$ の近似加速器は存在しない。
<!-- formal-statement-end -->

<!-- proof-start -->
### 証明

存在を仮定する。[加速器の尺度移送](../VNP21/index.md#thm-vnp21-next)と同様、最初はplain入力でのみ正しい暫定評価器から始め、後置・分割を行う。一回以上の分割後には全入力について停止する評価器となる。まず原資料の尺度変更の数値条件を確認する。基準尺度 $u$ と整数 $\alpha\ge5$ に対し $J$ を $u^{16h\alpha+1}<2^J$ となるように選ぶ。木の高さ $\eta$ と冪の上限 $B$ から

$$
X=B+(2\alpha+2)(J+1)+2\eta+10
$$

とし、$1000X^3\le u$ を要求する。prop_approx_acc_next（[ApproxRound.lean](https://github.com/anthropics/formal-math/blob/db8472ee0fe3ebea21765160a6e3a04f5eaba4c5/vp-vnp/Paper/ApproxRound.lean)）の尺度変更では $2\alpha+1$ 回の後置・分割・評価を実行する。枝時間指数 $e+8$ の前段から、分割器を時間 $u^{e+9}$ で用い、分割の枝時間 $u^{e-15}$ と片数 $u^{e+11-16h}$ の上界を得る。各片の評価時間 $u^{16h-16}$ を掛けると

$$
u^{e+11-16h}u^{16h-16}=u^{e-5}.
$$

一段の詳細を確認する。現在の定数木 $K_c$ と小尺度の元の定数木 $K_0$ の節点数をそれぞれ $u^{h\alpha}$ 以下とし、その展開木節点数を $n_c,n_0$ とする。展開前の指数上界 $B_i+1\le X$ から $n_i\le2Xu^{h\alpha}$。$cX^2\le1000X^3\le u$ なら

$
n_i(cX)\le2u^{h\alpha+1}.
$

後置の時間は $\operatorname{MM}(\eta_c+B_c+J+1)u^{e+8}+40n_c(J+1)+40$ 以下である。$\operatorname{MM}+2\le u$、後二項は各 $u^{e+8}$ 以下なので $u^{e+9}$ に収まる。後置入力のサイズは元の入力 $u^{\alpha(H-32)}$、コード $u^{4h\alpha}$、予算符号化 $4n_c(J+1)$、固定コードの和であり、各項は $u^{\alpha(H-32)}$ 以下なので合計は $u^{\alpha(H-32)+1}$ 以下になる。

分割の入力条件は $u^{\alpha(H-32)+1+48}\le u^{e+9}$、すなわち $e\ge\alpha(H-32)+40$。$H\le e+9\le2H\alpha$ なら倍率 $2\alpha$ で分割できる。片リストの時間は $(u^{H-16}+30)u^{e+11-H}+10\le31u^{e-5}+10\le u^{e-4}$。後置評価の倍率は高々 $u$ なので $u^{e-3}$ 以下である。予算生成 $(8J+10)n_i$ と照合 $40n_0(J+1)$ は各 $2u^{h\alpha+1}$ 以下、$e\ge h\alpha+3$ から $u^{e-1}$ 以下。分割時間 $u^{e-15}$ と固定費も $u^{e-1}$ 以下であり、有限個の和を $u\ge2000$ の一冪の余裕へ収める。各段の時間指数減少は8である。後置は暫定評価器を直接実行せず入力木を組み立てるだけなので、plain性なしの入力でも分割器と小尺度の加速器が停止する。

値の正しさでは、外側の各予算 $q$ の定数積を $b_q$ とする。後置入力を厳密に分割して得た片の値の積に近似値を代入するとき、$b_q$ の幅は $n_c2^{B_c+J}M$ 以下なので倍率 $r=n_c2^{B_c+J}M+1$ を選ぶ。[再尺度化による誤差の保存](#lem-vnp23-rescale)により、分割枝ごとの差は正次数であり、全分割枝と全予算の和でも正次数に留まる。元の暫定評価の誤差と足しても正次数である。$n_c\le 2u^{h\alpha+1}\le u^{e+8}<2^J$ より

$
r\le2^{B_c+2J+1}M\le2^{3X}M.
$

新しい木は $K_c$ と再尺度化した $K_0$ を根で接続する。予算生成コードのサイズは $n_i(J+1)(4(\eta_i+B_i+J+1)+100)$ 以下、従って $n_i18X^2\le2u^{h\alpha+1}$。二つの小尺度コード、固定コード、サイズ $u^H$ 以下の分割器を含む増分は $u^{h\alpha+2}+u^{H+1}$ 以下となる。これらは prop_approx_acc_round と prop_approx_acc_round_num の数値台帳に対応する。

空の定数木と万能プログラムから始め、$n$ 段後には高々 $n(|K_0|+1)+1$ 節点、高さ $\eta+n$、冪上限 $B+nJ$、コード長 $u+n(u^{h\alpha+2}+u^{H+1})$ を得る。幅は $(2^{3X}M_0)^n$ で帰納的に抑えられ、新しい葉は元の葉の再尺度化なので疎性は不変である。$n\le2\alpha+1$ では木の節点数が $(4\alpha+5)|K_0|$ 以下、また $2\alpha+1\le X\le u$ よりコード長は $u+u^{h\alpha+3}+u^{H+2}\le u^{4h\alpha}$（3項の指数が各 $4h\alpha-1$ 以下）となる。最後の段の時間指数 $e=H\alpha-16\alpha-7$ は $\alpha(H-32)+40$ 以上（差 $16\alpha-47\ge33$）、初回の $e+9=H\alpha+2$ は $2H\alpha$ 以下である。従って全段の分割条件が成立する。初期の条件 $(4\alpha+5)|K_0|,|D_0|\le u^{h\alpha}$ により一段の節点数条件も保つ。ここまでの台帳は

$$
t_{\rm new}\le u^{16h\alpha+1-8(2\alpha+1)}
=u^{16h\alpha-16\alpha-7},
$$

$$
B'\le B+(2\alpha+1)J,\qquad
\eta'\le\eta+2\alpha+1,
$$

$$
|K'|\le(4\alpha+5)|K|,\qquad
|D'|\le(u^\alpha)^{4h}.
$$

幅は $M'=(2^{3X}M)^{2\alpha+1}$ を上界にでき、疎性 $\Delta$ は変わらない。この幅は予算付き定数積と再尺度化の倍率を抑える prop_approx_acc_next の結論である。

初回は $u=v,\alpha=a+5,L=\lg v,P=h\alpha L,J=(16h\alpha+1)L$ と置く。初期加速器の高さと冪の条件から $B\le(16P)^3,\eta\le(16P)^2$、$J\le17P$、$\alpha+1\le2P$ なので $X\le7000P^3$ となる。全尺度分割の対数べき条件の定数を $C_0$ とし $C'=2C_0+40$ と置く。$C=2C'$ として $v$ を十分大きくすれば

$$
L^{2C'\alpha}=L^{2C'a}L^{10C'}\le v^2,
\qquad L^{C'\alpha}\le v.
$$

$\alpha\le L^\alpha$ から $\alpha^9 L^9\le L^{18\alpha}$、固定係数も $L^\alpha$ で吸収できるため、$1000X^3\le L^{19\alpha}\le v$ が成立する。$4\alpha+5\le v$ も従い、新定数木は $v^{a+1}\le v^\alpha$ 節点以下である。初期のコード長 $v^a\le v^{h\alpha}$ と $(4\alpha+5)v^a\le v^{h\alpha}$ も成立する。$C'\ge2C_0$ より $L^{2C_0\alpha}\le v$ で倍率 $2\alpha$ の分割条件を満たす。固定コードの大きさと分割閾値は最初の $v_1$ に含める。

初回の定数の幅の共通上界を $\Delta$ として、以後の尺度を改めて $u$ と記す。$c_B=100000h^3$、固定整数 $b_0,c_\Delta$ を十分大きく取り $c_\Delta\ge4c_B$ とすれば、[ApproxMain.lean](https://github.com/anthropics/formal-math/blob/db8472ee0fe3ebea21765160a6e3a04f5eaba4c5/vp-vnp/NS1/ApproxMain.lean) の InvA に対応する不変条件は

$$
|K|\le u,\quad |D|\le u^{4h},\quad
B,\eta\le c_B(\lg u)^3,
$$

$$
B,\eta\le b_0+2000h\lg u,
$$

$$
\operatorname{Span}(2^{c_\Delta(\lg u)^3},a_i),
\qquad \operatorname{Thin}(\Delta,a_i)
$$

である。初回は $\alpha L\le2\lg(v^\alpha)$ なので $P^3\le8h^3(\lg(v^\alpha))^3$。$B'\le4096P^3+(2\alpha+1)17P\le4096P^3+51P^2\le12500P^3$、$\eta'\le256P^2+2\alpha+1\le12500P^3$ なので三次対数上界内に入り、線形上界は初回の値を $b_0$ に吸収すればよい。幅については $M=2^\Delta$ を選び、$c_\Delta=4c_B+(3X+\Delta)(2\alpha+1)$ とすれば成立する。

以後 $\alpha=5$、$L=\lg u$、$J=(80h+1)L$ と取る。$X\le6c_B L^3$ であり、元の木とコードについて $25u\le u^{5h}$、$u^{4h}\le u^{5h}$ も成立する。倍率10での分割条件は固定対数べき $(\lg u)^{10C_0}\le u$ なので、十分大きな初回閾値を選べば反復中も保たれる。固定定数に対して $1000(6c_B)^3L^9\le u$ は十分大きな $u$ で成立する。新尺度 $u'=u^5$ では $\lg u'\ge4L$ である。$B'$ の増分は $11J\le891hL$、高さの増分は11なので線形上界を保つ。三次上界には $4^3=64$ 倍の余裕があり、幅についても

$$
11(18c_B+c_\Delta)\le64c_\Delta
$$

が $c_\Delta\ge4c_B$ から従う。節点数は $25u\le u^5$、プログラム長は $(u^5)^{4h}$ 以下となる。枝時間は

$$
u^{80h-87}<(u^5)^{16h-17}
$$

なので新尺度において一冪分の余裕を確保できる。以上を反復すると任意に大きな尺度で不変条件と枝時間 $u^{16h-17}$ を満たす。

ここで $L=\lg u$ として $b_0,\Delta\le L$ となる尺度を取る。展開木の節点数 $Q_B\le |K|(2B+1)\le u^2$、$B,\eta\le(2000h+1)L$ である。次のビット数を選ぶ。

$$
J=16hL,\qquad m=B+J+L+2,
$$

$$
W=2L+B+J+c_\Delta L^3+1.
$$

$t=u^{16h-17}<2^J$、また $\Delta\le2^L$ から

$$
2\cdot2^{B+J}\Delta+1\le2^{B+J+L+2}=2^m.
$$

$Q_B<2^{2L}$ より

$$
Q_B2^{B+J}2^{c_\Delta L^3}<2^W.
$$

従って[定数項抽出の正しさ](#lem-vnp23-extraction)とその実装を適用できる。$J,m=O(L)$、$W=O(L^3)$ なので抽出後の枝時間は

$$
O(u^2L^3)+O(L)u^{16h-17}\le u^{16h-16}
$$

となるほど大きな $u$ を選べる。$J+m+1=B+32hL+L+3\le(2032h+2)L+3\le2200hL$ と $2^L\le2u\le u^2$ から、新しい木の節点数は高々 $u^{4400h+2}$、前節の長さの式からプログラム長は高々 $u^{4400h+6}$ である。高さは $O(L)$ で対数二乗の条件を満たし、定数冪の上限は1にできる。

plain入力では近似値の定数項が厳密値である。よって固定指数 $a_0=4400h+6$ の厳密加速器が任意に大きな尺度に存在する。固定した指数の対数べきは尺度より遅く増えるため、[小加速器の不存在](../VNP21/index.md#thm-vnp21-noacc)の閾値と $(\lg u)^{C_ea_0}\le u$ を同時に満たす尺度を取れる。ここで $C_e$ は厳密版の定数である。非零環上では矛盾となる。
<!-- proof-end -->

対応する尺度・抽出の形式証明は [ApproxScales.lean](https://github.com/anthropics/formal-math/blob/db8472ee0fe3ebea21765160a6e3a04f5eaba4c5/vp-vnp/Paper/ApproxScales.lean) の prop_approx_acc_first, prop_approx_acc_step, prop_approx_acc_all_scales, prop_approx_acc_hasAcc と prop_approx_acc である。

## 7. 近似回路から収縮側の下界へ

<a id="thm-vnp23-contract"></a>

<!-- formal-statement-start -->
> **定理（完全な族の近似収縮側下界）**
>
> 体 $F$ が[収縮仮説](../VNP9/index.md#def-vnp9-cases)を満たし、族 $G_m$ が固定倍率で[格子和に対して完全](../VNP22/index.md#def-vnp22-grid-complete)とする。ある $b>0$ が存在し、十分大きな $m$ について $\operatorname{Approx}_F(G_m,s)$ なら
>
$$
s>2^{b(\log_2 m)^2/\log_2\log_2 m}.
$$
<!-- formal-statement-end -->

<!-- proof-start -->
### 証明

[低次数の評価](../VNP21/index.md#thm-vnp21-lowdeg)は可換環上で成立する。目標 $P$ の次数を $d$ とし、変数次数 $d$ 以下だけを取る操作を $\pi_{\le d}$ と書くと

$$
\pi_{\le d}(P+\varepsilon E)=P+\varepsilon\pi_{\le d}E.
$$

これは変数次数の選択でありLaurent次数を変えない。[Laurent切断の保存則](#lem-vnp23-cutoff)で定数を有限にしてからこの評価を用いれば、[回路から加速器への変換](../VNP21/index.md#thm-vnp21-circuit)と同じ費用で近似値を得る。

[ApproxScales.lean](https://github.com/anthropics/formal-math/blob/db8472ee0fe3ebea21765160a6e3a04f5eaba4c5/vp-vnp/Paper/ApproxScales.lean) の lem_circuit_approx は固定整数 $B_0,C_1,v_1$ に対し、$v\ge v_1,m\ge v^{B_0},(\lg v)^{C_1a'}\le v$ のとき $v^{a'}$ ゲートの近似回路からサイズ $v^{C_1(a'+1)}$ の近似加速器を構成する。不存在定理の定数を $C_2$ とする。

[完全な族の収縮側下界](../VNP22/index.md#thm-vnp22-contract-general)と同じ指数比較を行う。$v=\lfloor m^{1/B_0}\rfloor$ とすれば $v^{B_0}\le m\le v^{2B_0}$ が十分大きな $m$ で成立する。$m^a$ ゲートの回路を仮定し $a'=2B_0a$、$E_0=(C_2+1)C_1$ と置く。$a\ge1$、$C\ge2B_0E_0(2B_0+1)$ なら

$$
(\lg v)^{2B_0E_0(a'+1)}
\le(\lg m)^{Ca}\le m\le v^{2B_0}
$$

より $(\lg v)^{E_0(a'+1)}\le v$。これは構成条件と[近似加速器の不存在](#thm-vnp23-noacc)の条件をともに満たして矛盾する。$a=0$ のときも固定対数べきを大尺度で抑えられる。

$L=\log_2 m$、$a=\lfloor L/(2(C+1)\log_2 L)\rfloor$ と取る。十分大きな $L$ で $\lg m\le L^2$ だから $Ca\log_2\lg m\le L$、従って $(\lg m)^{Ca}\le m$。また床の中身が2以上なら $a\ge L/(4(C+1)\log_2 L)$ である。矛盾から $s>m^a$ であり、主張は $b=1/(4(C+1))$ で成立する。
<!-- proof-end -->

## 8. 全標数へ移す

<a id="lem-vnp23-transfer"></a>

<!-- formal-statement-start -->
> **補題（近似回路の同標数移送）**
>
> 同じ標数の体 $F,K$ で $K$ は代数閉体とする。整数係数多項式 $f$ の各体への係数移送を $f_F,f_K$ と書く。$\operatorname{Approx}_F(f_F,s)$ なら $\operatorname{Approx}_K(f_K,s)$ である。
<!-- formal-statement-end -->

<!-- proof-start -->
### 証明

[Laurent切断の保存則](#lem-vnp23-cutoff)で定数の指数を有限区間に制限する。各定数ゲートの各指数の係数を不定元 $U_{j,i}$ とし、配線を固定する。出力は共通素体 $k_0$ 上の有限Laurent多項式で、その各係数は $U_{j,i}$ の多項式である。

全変数単項式について負次数の係数を0、次数0の係数を $f$ の像に等置する。指数と単項式は有限種類なので有限個の多項式方程式となる。元の体 $F$ に解があるから、その生成イデアルは真である。

[同標数の回路移送](../VNP22/index.md#thm-vnp22-transfer)の議論と同様に $K[U]$ でも真である。実際1が生成元の $K[U]$ 線形結合なら、その有限個の係数と1の張る $k_0$ 線形空間から1を1に送る線形写像を取り、係数に作用させれば $k_0[U]$ における1の表示となって矛盾する。

[弱Hilbert零点定理](../../../代数系/AG/AG1-07/index.md#thm-ag1-07-weak-nullstellensatz)により $K$ 上の解が存在する。その値で元の定数ゲートを作り直せば配線とゲート数は同一であり、負次数0・定数項一致の条件を満たす。
<!-- proof-end -->

<a id="thm-vnp23-allfields"></a>

<!-- formal-statement-start -->
> **定理（全標数の近似回路下界）**
>
> 絶対定数 $c>0$ が存在し、標数 $p=0$ または素数ごとに閾値 $m_0(p)$ が存在する。標数 $p$ の任意の体 $F$ と $m\ge m_0(p)$ について、Hamilton閉路多項式の近似回路の全ゲート数 $s$ は
>
$$
s>m^{c(\log_2 m)^{1/3}}
$$
>
> を満たす。$p\ne2$ ならパーマネントにも同じ下界が成立する。
<!-- formal-statement-end -->

<!-- proof-start -->
### 証明

標数 $p$ の素体の代数閉包 $K_p$ を一つ固定する。[平坦または収縮](../VNP9/index.md#thm-vnp9-two-cases)により $K_p$ は少なくとも一方を満たす。[格子和のHamilton閉路表示](../VNP22/index.md#thm-vnp22-hc-grid)からHamilton閉路族は完全である。[格子和のパーマネント表示](../VNP10/index.md#thm-vnp10-grid-permanent)によるパーマネントの完全性には標数2の除外が必要である。

平坦なら[近似平坦側下界](#thm-vnp23-flat)を適用し $c=1/1600^2$ と取る。収縮なら[近似収縮側下界](#thm-vnp23-contract)を適用する。[対数指数の比較](../VNP22/index.md#lem-vnp22-rate-compare)から $bL^2/\log_2 L\ge cL^{4/3}$ が十分大きい $L=\log_2 m$ で成立するので同じ $c$ を取れる。二つの閾値の最大値（標数2ではHamilton閉路側だけ）を $m_0(p)$ とする。

両多項式は整数係数である。[近似回路の同標数移送](#lem-vnp23-transfer)により $F$ でサイズ $s$ の近似回路があれば $K_p$ にも存在する。$2^{cL^{4/3}}=m^{cL^{1/3}}$ なので結論が従う。
<!-- proof-end -->

## 9. 近似クラス分離

$\overline{\mathrm{VP}}(F)$ を、変数数、次数、近似算術回路の全ゲート数が族の添字について固定多項式で抑えられる族のクラスとする。厳密な $\mathrm{VP}$ は誤差0の特別な場合である。

<a id="cor-vnp23-closure"></a>

<!-- formal-statement-start -->
> **系（VNPの近似VPへの非包含）**
>
> 任意の体 $F$ について
>
$$
\mathrm{VNP}(F)\not\subseteq\overline{\mathrm{VP}}(F).
$$
<!-- formal-statement-end -->

<!-- proof-start -->
### 証明

[Hamilton閉路多項式族のVNP所属](../../ACOMP/ACOMP12/index.md#thm-acomp12-hamilton-vnp)は全標数で成立する。もし近似VPにも属すれば、固定整数 $d$ を十分大きく選び、全ゲート数は $m^d+d$ 以下になる。しかし[下界の増加率](../VNP1/index.md#thm-vnp1-growth)から $c(\log_2 m)^{1/3}>d+1$ となる十分大きな $m$ があり、$m\ge d+2$ なら $m^{d+1}>m^d+d$ である。標数ごとの閾値も満たす $m$ を選べば[全標数の近似回路下界](#thm-vnp23-allfields)に反する。
<!-- proof-end -->

一次資料の対応は [Approximate.lean](https://github.com/anthropics/formal-math/blob/db8472ee0fe3ebea21765160a6e3a04f5eaba4c5/vp-vnp/Paper/Approximate.lean) の lem_few_approx と thm_approx、[Transfer.lean](https://github.com/anthropics/formal-math/blob/db8472ee0fe3ebea21765160a6e3a04f5eaba4c5/vp-vnp/Paper/Transfer.lean) の lem_transfer_approx、[Statement.lean](https://github.com/anthropics/formal-math/blob/db8472ee0fe3ebea21765160a6e3a04f5eaba4c5/vp-vnp/Statement.lean) の MainTheoremApprox および SeparationClosure である。ここでの分離は代数的な回路クラスの分離であり、Boolean計算のP対NPへの含意は別の問題である。

## 10. 演習

<a id="exercise-vnp23-a1"></a>

### A1. 近似の判定

- Level: A

$(\varepsilon^{-2}+\varepsilon)(\varepsilon^2+\varepsilon^4)X$ は $X$ の近似か。

<!-- solution-start -->
**詳細解答**：展開は $(1+\varepsilon^2+\varepsilon^3+\varepsilon^5)X$。負次数はなく定数項は $X$ なので[定義](#def-vnp23-approx)を満たす。
<!-- solution-end -->

<a id="exercise-vnp23-a2"></a>

### A2. 切断の閾値

- Level: A

共通下限が $-3$、因子数が高々4なら[切断](#lem-vnp23-cutoff)の $N$ と差の最小可能次数を求めよ。

<!-- solution-start -->
**詳細解答**：$D=3,n=4$ なので $N=4\cdot3+1=13$。差の一因子は13以上、残りは高々3因子で各下限 $-3$ だから $13-9=4$ 以上。非正次数は保存される。
<!-- solution-end -->

<a id="exercise-vnp23-a3"></a>

### A3. 幅と疎性

- Level: A

$(\varepsilon^{-7}+\varepsilon^{11})^3$ の指数と幅の上界を求め、$\varepsilon\mapsto\varepsilon^5$ の後の幅・項数と比較せよ。

<!-- solution-start -->
**詳細解答**：指数は $-21+18j$ ($j=0,1,2,3$)、すなわち $-21,-3,15,33$。幅33、項数高々4。置換後は $-105,-15,75,165$ で幅165、項数は高々4のままである。標数3なら中央二項が消えるが上界は維持される。
<!-- solution-end -->

<a id="exercise-vnp23-a4"></a>

### A4. 誤差の再尺度化

- Level: A

標数0で $b=\varepsilon^{-5}$、$q=1+2\varepsilon$、$p=1$ とする。$b(q(\varepsilon^r)-p)$ が正次数のみになる最小正整数 $r$ を求めよ。

<!-- solution-start -->
**詳細解答**：差は $2\varepsilon^{r-5}$。$r-5\ge1$ が必要十分なので $r=6$。$r=5$ では定数項2が残る。
<!-- solution-end -->

<a id="exercise-vnp23-a5"></a>

### A5. 指数カウンタ

- Level: A

指数和が $[-12,12]$ にあるとき[抽出補題](#lem-vnp23-extraction)のための最小の $W$ を求め、$W-1$ での誤判定例を示せ。

<!-- solution-start -->
**詳細解答**：$2^3=8\le12<16=2^4$ なので $W=4$。法8では $\varepsilon^8$ の指数が余り0となるが、実際の定数項は0である。
<!-- solution-end -->

<a id="exercise-vnp23-b1"></a>

### B1. 冪による追加費用の消去

- Level: B

近似被覆に $J=3,|V|=4,D=2,g_\phi(P)=1/2$ を仮定する。$n$ 重積の材料数上界と選択費用の $n$ 乗根の極限を求めよ。

<!-- solution-start -->
**詳細解答**：語は $3^n$ 個、指数選択は高々 $(4n+1)^4$ 個。従って材料数上界は $3^n(4n+1)^4$。選択費用の $n$ 乗根は $\sqrt3(4n+1)^{2/n}$ で、後者の対数 $2\log(4n+1)/n$ が0に収束するので極限は $\sqrt3$。
<!-- solution-end -->

<a id="exercise-vnp23-b2"></a>

### B2. 冪の係数表

- Level: B

$\operatorname{Thin}(3,a)$、$B=2,J=4$ のとき、本文の安全な上界による項数と最小の $m$ を求めよ。

<!-- solution-start -->
**詳細解答**：$2\cdot2^{B+J}\Delta+1=2\cdot64\cdot3+1=385$。$2^8=256<385\le512=2^9$ なので $m=9$。個別の冪では項がさらに少なくなる可能性があるが、この上界なら全予算を覆う。
<!-- solution-end -->

<a id="exercise-vnp23-b3"></a>

### B3. 移送のための係数方程式

- Level: B

$(a\varepsilon^{-1}+b)(c\varepsilon+d)X$ が $X$ を近似するための係数方程式を求めよ。

<!-- solution-start -->
**詳細解答**：展開は $(ad\varepsilon^{-1}+ac+bd+bc\varepsilon)X$。負次数0より $ad=0$、定数項一致より $ac+bd=1$。正次数係数 $bc$ に条件はない。これは整数係数の有限方程式であり、[同標数移送](#lem-vnp23-transfer)で扱える。
<!-- solution-end -->

<a id="exercise-vnp23-b4"></a>

### B4. 尺度移送の時間余裕

- Level: B

$h=17,\alpha=5$ で新枝時間指数 $16h\alpha+1-8(2\alpha+1)$ を計算し、新尺度 $u^5$ での近似・厳密加速器時間上界の指数と比較せよ。

<!-- solution-start -->
**詳細解答**：$16\cdot17\cdot5+1-8\cdot11=1361-88=1273$。近似段階の余裕込み上界の指数は $5(272-17)=1275$、通常の上界は $5(272-16)=1280$。従って $u^{1273}<u^{1275}<u^{1280}$ ($u>1$) で、抽出の対数費用に一尺度分の余裕がある。
<!-- solution-end -->

<a id="exercise-vnp23-c1"></a>

### C1. 抽出から矛盾まで

- Level: C

任意に大きな尺度 $u$ に本文の不変条件と枝時間 $u^{16h-17}$ を満たす近似加速器があるとする。抽出のビット数を選んで厳密加速器の不存在との矛盾を導け。

<!-- solution-start -->
**詳細解答**：$L=\lg u$ とし、固定 $b_0,\Delta\le L$ となる尺度を選ぶ。すると $B,\eta\le(2000h+1)L$、$Q_B\le u^2$。$J=16hL,m=B+J+L+2,W=2L+B+J+c_\Delta L^3+1$ と取る。$u^{16h-17}<2^J$、$2\cdot2^{B+J}\Delta+1\le2^m$、$Q_B2^{B+J}2^{c_\Delta L^3}<2^W$ が順に成立する。従って[定数項抽出](#lem-vnp23-extraction)を実行できる。枝時間は $O(u^2L^3)+O(L)u^{16h-17}$ で $u^{16h-16}$ 以下、木とプログラムは $2^{J+m+1}\le u^{4400h}$ および本文の長さの式から $u^{4400h+6}$ 以下。高さ $O(L)$ は対数二乗以下、冪上限1も条件を満たす。plain入力の値は厳密値である。固定 $a_0=4400h+6$ に対し $(\lg u)^{C_ea_0}\le u$ と閾値を同時に満たす $u$ を取れば[小加速器の不存在](../VNP21/index.md#thm-vnp21-noacc)と矛盾する。
<!-- solution-end -->

<a id="exercise-vnp23-c2"></a>

### C2. 全標数でのクラス分離

- Level: C

全標数の近似下界からVNPの近似VPへの非包含を示し、パーマネントだけでは標数2を扱えない理由を述べよ。

<!-- solution-start -->
**詳細解答**：Hamilton閉路族は全標数でVNPに属す。近似VPに属すと仮定すると固定 $d$ で $m^d+d$ ゲートの近似回路が存在する。標数の閾値を超え、$c(\log_2 m)^{1/3}>d+1$、$m\ge d+2$ とすると $m^{c(\log_2 m)^{1/3}}>m^{d+1}>m^d+d$ で矛盾する。標数2では置換の符号 $-1$ と $1$ が等しく、パーマネントは行列式に一致する。従って標数2を含む下界にはHamilton閉路族を使う。
<!-- solution-end -->

## 11. 次講へ

第24講では一次資料の主要定理とLean対応を横断的に照合し、形式化の保証範囲とP対NPへの限界を整理する。
