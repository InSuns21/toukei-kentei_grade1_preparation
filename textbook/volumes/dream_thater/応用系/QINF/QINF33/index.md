# QINF33 可逆発展と放射への情報移送

## 1. 全体が純粋なのに、放射は混合してよいのか

[部分トレース](../QINF3/index.md#def-qinf3-partial-trace)を取ると、純粋な複合系から混合した部分系が生じます。[Schmidt分解](../QINF6/index.md#def-qinf6-schmidt)はその仕組みを明らかにし、[von Neumannエントロピー](../QINF17/index.md#def-qinf17-entropy)は混合の量を測ります。さらに前講では、[Haarランダム状態のPage型平均評価](../QINF32/index.md#thm-qinf32-page-type-mean)を、二つの因子空間の**次元を指定して**求めました。

ところが放射を考えると「放射が増えるにつれてエントロピーは増え続けるのか」「全系がユニタリに進むなら情報はどこにあるのか」という、時間に関する問いが現れます。**次元を変えて異なる分割を比較すること**と、**一つの物理系を時間発展させること**は、まだ同じことではありません。

ここでは有限個の量子ビットを順番に別のレジスタへ運ぶ、完全に可逆な模型を作ります。放射側の観測者が触れられる部分を明示し、状態、縮約、エントロピー、相互情報量を一段ずつ計算します。すべての対数の底は2で、エントロピーの単位はbitとします。

## 2. 固定されたHilbert空間で「放出」を定義する

まず2量子ビットの場合を想像してください。記憶用量子ビット $M_1,M_2$ がBell対を作り、受け皿の $R_1,R_2$ は初め $|0\rangle$ です。$M_1$ と $R_1$ の**状態を交換**すれば、外へ出た $R_1$ だけは混合して見えます。しかし交換の逆操作は同じ交換です。量子ビットを消したわけではありません。

一般に、記憶側 $M_1,\ldots,M_N$ と、最初は空の受け皿 $R_1,\ldots,R_N$ を、それぞれ2次元の量子ビットとします。二つの量子ビットの計算基底を交換する線形作用素を $\operatorname{SWAP}_{M_jR_j}$ と書きます。基底上の作用は

$$
\operatorname{SWAP}_{M_jR_j}|a\rangle_{M_j}|b\rangle_{R_j}
=|b\rangle_{M_j}|a\rangle_{R_j}
\qquad(a,b\in\{0,1\})
$$

です。他の因子には恒等作用素を作用させます。交換を2回行えば元に戻り、計算基底を置換するので内積も保存します。

<a id="def-qinf33-swap-emission"></a>

<!-- formal-statement-start -->
> **定義（段階的SWAP放出模型）**
>
> 整数 $N\ge1$ と、各々2次元の量子ビット $M_1,\ldots,M_N,R_1,\ldots,R_N$ を固定し、全Hilbert空間を

$$
\mathcal H=\left(\bigotimes_{j=1}^N M_j\right)
\otimes\left(\bigotimes_{j=1}^N R_j\right)
$$

> とする。記憶側の任意の単位ベクトル $|\phi\rangle_M$ と、受け皿の初期状態 $|0\rangle_R^{\otimes N}$ に対し、$W_j=\operatorname{SWAP}_{M_jR_j}$ とおく。時刻を表す整数 $k=0,\ldots,N$ に対し

$$
|\Omega_k\rangle=W_kW_{k-1}\cdots W_1
\left(|\phi\rangle_M\otimes|0\rangle_R^{\otimes N}\right),
\qquad |\Omega_0\rangle=|\phi\rangle_M\otimes|0\rangle_R^{\otimes N}
$$

> を**段階的SWAP放出模型**とする。各 $W_j$ は全空間上のユニタリ作用素であり、全空間の次元 $2^{2N}$ はどの $k$ でも変えない。
<!-- formal-statement-end -->

<!-- definition-example-start: def-qinf33-swap-emission -->
**定義の確認**（$N=2$）。記憶側を

$$
|\phi\rangle_M=|\Phi^+\rangle_{M_1M_2}
=\frac{|00\rangle+|11\rangle}{\sqrt2}
$$

とし、$R_1,R_2$ を $|00\rangle$ で初期化します。最初の交換は $|a\rangle_{M_1}|0\rangle_{R_1}\mapsto|0\rangle_{M_1}|a\rangle_{R_1}$ なので

$$
|\Omega_1\rangle=|0\rangle_{M_1}|0\rangle_{R_2}
\otimes\frac{|00\rangle+|11\rangle}{\sqrt2}_{R_1M_2},
$$

と表せます（テンソル因子の書く順だけを並べ替えています）。次の交換後は

$$
|\Omega_2\rangle=|00\rangle_{M_1M_2}
\otimes|\Phi^+\rangle_{R_1R_2}.
$$

どの段階でも4量子ビットは存在し、$\langle\Omega_k|\Omega_k\rangle=1$ です。$W_j^\dagger=W_j$ と $W_j^2=I$ により逆変換があることも直接確かめられます。
<!-- definition-example-end -->

放射を受け取る人が時刻 $k$ にアクセスできるのは、受け皿全体ではなく、既に放出された $R_1,\ldots,R_k$ です。初期の空の $R_{k+1},\ldots,R_N$ は放射として数えません。そこで**見えている部分**のエントロピーを履歴にします。

<a id="def-qinf33-radiation-history"></a>

<!-- formal-statement-start -->
> **定義（放射エントロピー履歴）**
>
> 上の $N$ 量子ビット段階的SWAP放出模型について、$k=1,\ldots,N$ で $R_{\le k}=R_1\otimes\cdots\otimes R_k$ とし、

$$
\rho_{R_{\le k}}^{(k)}
=\operatorname{Tr}_{M_1\cdots M_N,\;R_{k+1}\cdots R_N}
|\Omega_k\rangle\langle\Omega_k|,
\qquad
s(k)=S\bigl(\rho_{R_{\le k}}^{(k)}\bigr)
$$

> と定める。$k=0$ では $R_{\le0}$ を自明な1次元系とし、その唯一の状態のエントロピー $s(0)=S(R_{\le0})=0$ とする。整数列 $s(0),s(1),\ldots,s(N)$ を**放射エントロピー履歴**という。ここで $S$ はvon Neumannエントロピー、$\operatorname{Tr}$ の添字は放射 $R_{\le k}$ 以外の全因子を表し、$k=N$ のとき未使用の $R$ 因子は空である。
<!-- formal-statement-end -->

<!-- definition-example-start: def-qinf33-radiation-history -->
**定義の確認**。直前の $N=2$ の例では $k=1$ に放射 $R_1$ と記憶 $M_2$ がBell対です。[部分トレースの定義](../QINF3/index.md#def-qinf3-partial-trace)から

$$
\rho_{R_1}^{(1)}=\tfrac12|0\rangle\langle0|
+\tfrac12|1\rangle\langle1|=I_2/2,
\qquad s(1)=1.
$$

$k=0$ では放射は1次元の自明な系です。$k=2$ では $\rho_{R_1R_2}^{(2)}=|\Phi^+\rangle\langle\Phi^+|$ が純粋です。計算基底で $I_2/2=\operatorname{diag}(1/2,1/2)$ なので、その固有値は $1/2,1/2$ です。一方、正規化された $|\Phi^+\rangle$ への射影は $|\Phi^+\rangle$ 上で固有値1、直交補空間で固有値0を持ちます。従って[エントロピーの定義](../QINF17/index.md#def-qinf17-entropy)に各固有値を代入して

$$
s(0)=0,\qquad s(1)=-2\cdot\tfrac12\log_2\tfrac12=1,\qquad
s(2)=-1\log_2 1=0
$$

を得ます。これで履歴は $(0,1,0)$ と直接確認できました。
<!-- definition-example-end -->

## 3. 可逆性と部分系のエントロピーは矛盾しない

全空間での状態はどの段階でも純粋なので、全系のエントロピーは常に0です。一方、縮約で他の因子を捨てれば固有値は一般に変わります。重要なのは、$k$ 回交換した後に、使い終えた $M_1,\ldots,M_k$ と未使用の $R_{k+1},\ldots,R_N$ は $|0\rangle$ に固定されることです。もとの $N$ 量子ビットの情報は、放射済みの $R_{\le k}$ と残存記憶 $B_k=M_{k+1}\otimes\cdots\otimes M_N$ にまたがっています。

以下、時刻 $k$ が文脈で固定されるときは、縮約状態 $\rho_{R_{\le k}}^{(k)}$ の右肩の $(k)$ を省略します。$S(R_{\le k})$ はその時刻の縮約状態のエントロピーを表します。

<a id="prop-qinf33-pure-budget"></a>

<!-- formal-statement-start -->
> **命題（可逆全系と縮約エントロピー）**
>
> $N\ge1$ の段階的SWAP放出模型で、任意の記憶側純粋初期状態 $|\phi\rangle_M$ と任意の $k=0,\ldots,N$ を取る。$B_k=M_{k+1}\otimes\cdots\otimes M_N$（$B_N$ は自明な1次元系）とすると、全系は純粋で

$$
S(|\Omega_k\rangle\langle\Omega_k|)=0,
\qquad S(R_{\le k})=S(B_k)=s(k),
$$

> かつ

$$
0\le s(k)\le\min\{k,N-k\}.
$$

> ここで $S(R_{\le k}),S(B_k)$ は時刻 $k$ の縮約状態のエントロピーを表す。
<!-- formal-statement-end -->

### 証明の見取り図

SWAPは量子ビットの値を移すだけです。空の因子を除けば、初期状態の最初の $k$ 因子を $R_{\le k}$ へ読み替え、残りを $B_k$ とした純粋状態になります。その二部系へ[縮約スペクトルの一致](../QINF6/index.md#thm-qinf6-reduced-spectrum)と[エントロピーの次元上界](../QINF17/index.md#thm-qinf17-entropy-bounds)を適用します。

<!-- proof-start -->
### 証明

記憶側の状態を計算基底で

$$
|\phi\rangle_M=\sum_{a_1,\ldots,a_N\in\{0,1\}}
c_{a_1\cdots a_N}|a_1\cdots a_N\rangle_M,
\qquad\sum_{a_1,\ldots,a_N}|c_{a_1\cdots a_N}|^2=1
$$

と展開します。$W_j$ は $M_j$ と初期状態が $|0\rangle$ の $R_j$ を交換し、他の因子に作用しません。したがって $k$ 回作用した状態は、因子の並べ替えを省略すれば

$$
|\Omega_k\rangle=
|0\rangle_{M_1\cdots M_k}
\otimes|0\rangle_{R_{k+1}\cdots R_N}
\otimes\sum_{a_1,\ldots,a_N}c_{a_1\cdots a_N}
|a_1\cdots a_k\rangle_{R_{\le k}}
|a_{k+1}\cdots a_N\rangle_{B_k}.
$$

最後の和は係数の二乗和が1の純粋二部状態 $|\varphi_k\rangle_{R_{\le k}B_k}$ です。空の因子を部分トレースしても、残りの縮約状態を変えません。[Schmidt分解からの縮約スペクトル一致](../QINF6/index.md#thm-qinf6-reduced-spectrum)を $|\varphi_k\rangle$ に適用すると、$R_{\le k}$ と $B_k$ の非零固有値が等しいため、[von Neumannエントロピーの定義](../QINF17/index.md#def-qinf17-entropy)から両者の $S$ が等しくなります。

$R_{\le k}$ は $2^k$ 次元、$B_k$ は $2^{N-k}$ 次元です。それぞれの密度演算子へ[最大エントロピー界](../QINF17/index.md#thm-qinf17-entropy-bounds)を適用し

$$
S(R_{\le k})\le\log_2(2^k)=k,\qquad
S(B_k)\le\log_2(2^{N-k})=N-k
$$

を得ます。また各 $W_j$ はユニタリで純粋状態を純粋状態へ写すので、全系のエントロピーは0のままです。二つの上界と非負性を合わせて結論が従います。
<!-- proof-end -->

この命題は一般の量子力学における「エントロピー増大則」を述べたものではありません。**全系のユニタリ性だけでは $s(k)$ の増減は決まりません。** $N-k$ の上界が使えたのは、空の受け皿を置いた特定のSWAP放出模型だからです。

## 4. Bell対二組を放出すると山型になる

4量子ビットの記憶 $M_1M_2M_3M_4$ に、離れた位置どうしのBell対をあらかじめ二組用意します。片方は1番と4番、もう片方は2番と3番です。$k=1,2$ ではBell対が放射と残存記憶をまたぎ、$k=3,4$ では相方も放射に入るため、放射だけで純粋なBell対を再構成できるようになります。

<a id="thm-qinf33-bell-tent"></a>

<!-- formal-statement-start -->
> **定理（Bell対放出模型の山型履歴）**
>
> $N=4$ の段階的SWAP放出模型で、初期記憶状態を

$$
|\phi\rangle_M
=|\Phi^+\rangle_{M_1M_4}\otimes|\Phi^+\rangle_{M_2M_3},
\qquad |\Phi^+\rangle=(|00\rangle+|11\rangle)/\sqrt2
$$

> とし、放射用受け皿を $|0000\rangle_R$ とする。このとき

$$
\boxed{(s(0),s(1),s(2),s(3),s(4))=(0,1,2,1,0)}
$$

> である。さらに $k=1,2,3$ で放射と残存記憶の[量子相互情報量](../QINF18/index.md#def-qinf18-mutual)は

$$
I(R_{\le k}:B_k)=2s(k)
$$

> となる。
<!-- formal-statement-end -->

### 証明の見取り図

一つのBell対が境界の両側に分かれていると、片側の縮約は $I_2/2$ で1 bitです。対が両方とも放射側または記憶側なら、その対の放射への寄与は純粋因子で0 bitです。[テンソル積のエントロピー加法性](../QINF17/index.md#prop-qinf17-tensor)を使って、境界をまたぐ対の数を数えます。相互情報量は残りとの全体が純粋であることから求めます。

<!-- proof-start -->
### 証明

初期記憶の計算基底表示は、$a,b\in\{0,1\}$ として

$$
|\phi\rangle_M=\frac12\sum_{a,b}|a\,b\,b\,a\rangle
=\frac12\bigl(|0000\rangle+|0110\rangle
+|1001\rangle+|1111\rangle\bigr).
$$

第3節の[可逆全系と縮約エントロピーの命題](#prop-qinf33-pure-budget)により、放出後の有効状態は同じ係数を $R_{\le k}B_k$ へ配し直したものです。各 $k$ で[部分トレース](../QINF3/index.md#def-qinf3-partial-trace)を取ると、

$$
\begin{aligned}
k=0:\quad&\rho_{R_{\le0}}=1,\\
k=1:\quad&\rho_{R_1}=I_2/2,\\
k=2:\quad&\rho_{R_1R_2}=I_4/4,\\
k=3:\quad&\rho_{R_1R_2R_3}=(I_2/2)_{R_1}\otimes
|\Phi^+\rangle\langle\Phi^+|_{R_2R_3},\\
k=4:\quad&\rho_{R_1R_2R_3R_4}
=|\Phi^+\rangle\langle\Phi^+|_{R_1R_4}
\otimes|\Phi^+\rangle\langle\Phi^+|_{R_2R_3}.
\end{aligned}
$$

例えば $k=2$ で放射の基底 $|ab\rangle$ に対応する残存記憶は $|ba\rangle$ です。異なる $a,b$ の残存記憶ベクトルは直交するので、部分トレースすると交差項は消え、

$$
\rho_{R_1R_2}=\frac14\sum_{a,b}|ab\rangle\langle ab|=I_4/4.
$$

$k=3$ では2番と3番のBell対が放射内で完結し、1番の相方4番だけが残存記憶へ置かれるため、表示した直積形になります。各行の非零固有値は順に $1$、$(1/2,1/2)$、$(1/4,1/4,1/4,1/4)$、$(1/2,1/2)$、$1$ です。[エントロピー定義](../QINF17/index.md#def-qinf17-entropy)へ代入すると $0,1,2,1,0$ を得ます。

次に[相互情報量の定義](../QINF18/index.md#def-qinf18-mutual)を $R_{\le k},B_k$ に適用します。有効二部系は純粋なので $S(R_{\le k}B_k)=0$、[前命題](#prop-qinf33-pure-budget)により $S(R_{\le k})=S(B_k)=s(k)$。従って

$$
I(R_{\le k}:B_k)
=S(R_{\le k})+S(B_k)-S(R_{\le k}B_k)
=s(k)+s(k)-0=2s(k).
$$
<!-- proof-end -->

この例は第3節の上界 $s(k)\le\min(k,4-k)$ を各 $k$ で等号達成します。しかし、それは**特別に用意した初期エンタングルメント**の帰結です。例えば初期記憶が $|0000\rangle$ なら、すべての放射縮約が純粋で $s(k)=0$ となります。全系の可逆性だけから山型の曲線は出ません。

もう一つ注意点があります。任意の純粋な4量子ビット状態で $s(k)=s(4-k)$ が標本ごとに成り立つわけでもありません。初期状態 $|\Phi^+\rangle_{M_1M_2}|00\rangle_{M_3M_4}$ なら、$s(k)=(0,1,0,0,0)$ です。純粋性が保証するのは「同じ時刻の放射とその補系のエントロピー一致」であって、「別時刻の放射同士の一致」ではありません。

## 5. 混合した早期放射にも、後期放射との相関が残る

山型の後半で放射のエントロピーが下がるのは、既に放射された部分が突然純粋になるからではありません。例えば前節の $R_1$ の縮約は最後まで $I_2/2$ です。しかし最後に $R_4$ が到着すると、$R_1R_4$ を一緒に見ることができます。

最終時刻の[相互情報量](../QINF18/index.md#def-qinf18-mutual)は

$$
\begin{aligned}
I(R_1:R_4)
&=S(R_1)+S(R_4)-S(R_1R_4)\\
&=1+1-0=2,
\end{aligned}
$$

です。一方、時刻 $k=3$ の $R_1$ と $R_2R_3$ の状態は $(I_2/2)\otimes|\Phi^+\rangle\langle\Phi^+|$ で、相互情報量は $1+0-1=0$ です。この模型では、早期放射の相方が後期放射へ運ばれたことで、放射全体に相関が現れます。放射の一部だけを見る人には混合していても、全体から情報が消失したとは限りません。

ただしこれは、特定のBell対についての**相関**の検算です。「任意の未知入力状態が放射から復号できる」と結論するには、情報を保持する参照系を使って通信の保存を確かめる必要があります。次にそれを扱います。

## 6. 参照系を固定すると「情報がどこへ移るか」を定量化できる

[参照系の導入](../QINF29/index.md#def-qinf29-reference)では、入力が未知の量子状態でも、外部の参照系 $A$ と初期にエンタングルした状態を追えば、入力情報の保存と漏洩を判定できました。ここでも $A$ に手を触れず、記憶系 $M$ と放射系 $R$ のみにユニタリを作用させます。

全体 $AMR$ が純粋なら、$A$ と $M$ の相関と、$A$ と $R$ の相関には厳密な収支があります。両方の相関を単純に足した量は、参照系のエントロピーで決まります。

<a id="thm-qinf33-reference-budget"></a>

<!-- formal-statement-start -->
> **定理（参照系との相互情報量収支）**
>
> $A,M,R$ を有限次元の量子系とし、その純粋状態 $\sigma_{AMR}=|\Psi\rangle\langle\Psi|$ を取る。$I(X:Y)=S(X)+S(Y)-S(XY)$ を量子相互情報量とすると、

$$
\boxed{I(A:M)+I(A:R)=2S(A)}.
$$

> さらに $A$ に作用しない任意のユニタリ $I_A\otimes U_{MR}$ の前後では、$S(A)$ と右辺の値は不変である。
<!-- formal-statement-end -->

### 証明の見取り図

純粋三部系では、一つの部分系と残り二つの部分系の縮約状態は同じ非零スペクトルを持ちます。その対応を相互情報量の定義へ代入すると、$S(M)$ と $S(R)$ が相殺します。最後にユニタリが $A$ の縮約を変えないことを確認します。

<!-- proof-start -->
### 証明

$\sigma_{AMR}$ が純粋なので、[Schmidt分解による縮約スペクトルの一致](../QINF6/index.md#thm-qinf6-reduced-spectrum)を二つの分割 $AM|R$ と $AR|M$ に適用します。それぞれ有限次元の純粋二部状態なので

$$
S(AM)=S(R),\qquad S(AR)=S(M).
$$

[相互情報量の定義](../QINF18/index.md#def-qinf18-mutual)へ代入すると

$$
\begin{aligned}
I(A:M)+I(A:R)
&=\{S(A)+S(M)-S(AM)\}\\
&\quad+\{S(A)+S(R)-S(AR)\}\\
&=2S(A)+S(M)-S(R)+S(R)-S(M)\\
&=2S(A).
\end{aligned}
$$

次に $A$ 上の任意の作用素 $X_A$ を考えます。$U_{MR}$ は $X_A\otimes I_{MR}$ と可換なので、トレースの巡回性により

$$
\begin{aligned}
\operatorname{Tr}\bigl[(X_A\otimes I)(I_A\otimes U_{MR})
\sigma(I_A\otimes U_{MR}^\dagger)\bigr]
&=\operatorname{Tr}\bigl[(I_A\otimes U_{MR}^\dagger)
(X_A\otimes I)(I_A\otimes U_{MR})\sigma\bigr]\\
&=\operatorname{Tr}[(X_A\otimes I)\sigma].
\end{aligned}
$$

よって[部分トレースの期待値による一意性](../QINF3/index.md#thm-qinf3-expectation-uniqueness)から $A$ の縮約密度演算子は変わらず、$S(A)$ も不変です。全系の純粋性はユニタリで保たれるため、前後の双方で証明した恒等式が成立します。
<!-- proof-end -->

**直接例：量子情報の引っ越し**。$A,M,R$ をそれぞれ1量子ビットとし、初期状態を $|\Phi^+\rangle_{AM}|0\rangle_R$ とします。最初は

$$
I(A:M)=1+1-0=2,\qquad I(A:R)=1+0-1=0.
$$

$M,R$ をSWAPすると $|0\rangle_M|\Phi^+\rangle_{AR}$ へ移り、今度は

$$
I(A:M)=1+0-1=0,\qquad I(A:R)=1+1-0=2.
$$

合計はどちらも $2S(A)=2$ です。$A$ が外部に残り、$R$ を受け取った人が参照系とのエンタングルメントを回復できるという、明示的な完全情報移送の例になっています。一方、この等式だけでは、任意の分割・雑音の下で復号器が構成できるとは主張していません。実際の復号条件は[環境からの独立性と完全回復](../QINF29/index.md#thm-qinf29-recovery)で学んだ仮定を別に調べます。

## 7. Page型の平均曲線は、放出の時間発展を決めない

次に初期記憶 $|\phi\rangle_M$ を**一度だけ** $2^N$ 次元のHaar分布から選び、その後は第2節の固定SWAPを実行するとします。これは確率分布に従う初期状態の**集団**です。同じ状態の時間軌道上で毎回独立に乱数を引き直す模型ではありません。

各 $k$ について、放射 $R_{\le k}$ と残存記憶 $B_k$ の有効状態は、初期Haar状態を $2^k\times2^{N-k}$ に因子分解し直しただけです。分割の一方が大きければ、小さい側の縮約は平均的に最大混合に近くなります。これは前講の結果の正しい使用場面です。

<a id="prop-qinf33-haar-partitions"></a>

<!-- formal-statement-start -->
> **命題（Haar次元分割の平均評価）**
>
> $N\ge1$ の段階的SWAP放出模型で、初期記憶状態 $|\phi\rangle_M$ を $\mathbb C^{2^N}$ 上のHaarランダム純粋状態とする。同じ標本を $k=0,\ldots,N$ の全段階で用いる。$s(k)$ を放射エントロピー履歴とすると、各 $k$ について

$$
\boxed{\log_2\frac{2^N+1}{2^k+2^{N-k}}
\le\mathbb E_{\phi}s(k)\le\min(k,N-k)}.
$$

> また $\mathbb E_{\phi}s(k)=\mathbb E_{\phi}s(N-k)$ である。ただし、標本ごとの等式 $s(k)=s(N-k)$ や、ある実験の $s(k)$ が単調に増減することは主張しない。
<!-- formal-statement-end -->

### 証明の見取り図

各 $k$ を固定し、小さい側の次元を $m=2^{\min(k,N-k)}$、大きい側を $n=2^{\max(k,N-k)}$ とします。前講の[Page型平均評価](../QINF32/index.md#thm-qinf32-page-type-mean)にこの二つの次元を代入します。時間発展についての確率的仮定を追加する必要はありません。

<!-- proof-start -->
### 証明

時刻 $k$ で非空の受け皿を除いた有効状態は、第3節で示したとおり、初期係数 $c_{a_1\cdots a_N}$ を $R_{\le k}B_k$ へ配置し直したものです。この再配置は基底の固定ユニタリ置換なので、[Haar分布のユニタリ不変性](../QINF31/index.md#def-qinf31-haar)から、有効状態は $\mathbb C^{2^k}\otimes\mathbb C^{2^{N-k}}$ 上のHaar純粋状態です。

$m=2^{\min(k,N-k)}$、$n=2^{\max(k,N-k)}$ なら $m\le n$、$mn=2^N$、$m+n=2^k+2^{N-k}$ です。[前講のPage型平均定理](../QINF32/index.md#thm-qinf32-page-type-mean)の仮定を満たすので

$$
\log_2\frac{mn+1}{m+n}
\le\mathbb E S(\rho_{\mathrm{small}})\le\log_2m
$$

に代入します。[縮約スペクトルの一致](../QINF6/index.md#thm-qinf6-reduced-spectrum)から小さい側も放射側も同じエントロピーなので $\mathbb E S(\rho_{\mathrm{small}})=\mathbb E_\phi s(k)$ です。これで表示した上下界が従います。

最後にHaar分布は量子ビットの順列にも不変です。$k$ と $N-k$ で二部系の次元の組が交換されるだけなので、[Schmidt分解によるエントロピー一致](../QINF6/index.md#thm-qinf6-reduced-spectrum)を併せると二つのエントロピー確率変数の分布が等しく、期待値も等しくなります。**同一の標本の二つの時刻**を結び付けた等式ではありません。
<!-- proof-end -->

例えば $N=4$ では次の値になります。対数値は下界を小数第3位まで丸めたものです。

| $k$ | $(d_R,d_B)$ | $\mathbb E_\phi s(k)$ の下界 | 上界 |
|---:|---:|---:|---:|
| 0 | $(1,16)$ | $0$ | $0$ |
| 1 | $(2,8)$ | $\log_2(17/10)\simeq0.766$ | $1$ |
| 2 | $(4,4)$ | $\log_2(17/8)\simeq1.087$ | $2$ |
| 3 | $(8,2)$ | $\log_2(17/10)\simeq0.766$ | $1$ |
| 4 | $(16,1)$ | $0$ | $0$ |

第4節のBell対模型は各上界を**厳密に達成する一つの特別な純粋状態**です。一方、この表はHaar**平均の上下界**であり、平均エントロピーそのものでも、個々の標本の履歴でもありません。前講で見たとおり[平均purityの対数と平均エントロピー](../QINF32/index.md#thm-qinf32-page-type-mean)を等置することもできません。

## 8. 有限次元の情報収支から、物理的な蒸発へ

ここまでで確かめられたのは、固定された有限次元全系が可逆でも、その一部分のエントロピーは増減し得ること、そして相互情報量の形で情報の所在を追えることです。物理的なブラックホールの放射を表現するには、次の問いを**新たな物理仮定**とともに考える必要があります。

| この講義で指定したもの | 実際の蒸発を扱うために別途必要なもの |
|---|---|
最初から固定した $M_j,R_j$ のテンソル因子 | 重力と量子場で「内部」「外部」をどう分けるか、その因数分解の意味 |
| 計算基底をそのまま交換するSWAP | 時空上の場の方程式、Hawking放射の生成機構とエネルギー収支 |
| 任意に選んだ初期Bell対またはHaar状態 | 蒸発中の状態を作る動力学と、乱数模型を採用する根拠 |
| 有限次元密度行列の部分トレース | 局所場の理論でのUV・Type IIIの問題、適切なエントロピーの定義 |
| 量子ビット数による次元の変化 | 幾何学的な面積、半古典近似、重力の寄与とその適用範囲 |

Hawking放射や曲がった時空の場はQCURV、ブラックホールの幾何と熱力学はBHT、レプリカ・island等によるエントロピー評価はBHI、ホログラフィックな復号の解釈はHOLOで、それぞれ独自の仮定が加わります。**この講の山型を、それらの物理模型のPage曲線の証明として読み替えることはできません。**

## 9. 演習と詳細解答

<a id="ex-qinf33-a01"></a>

### 演習 A1：交換はなぜ可逆か

- Level: A
- 問題: 2量子ビット $M,R$ の基底 $|00\rangle,|01\rangle,|10\rangle,|11\rangle$ に対し $\operatorname{SWAP}|ab\rangle=|ba\rangle$ とする。行列を求め、$\operatorname{SWAP}^\dagger\operatorname{SWAP}=I$ と $\operatorname{SWAP}^2=I$ を確認してください。

<!-- solution-start -->
**詳細解答**。各基底ベクトルの像は順に $|00\rangle,|10\rangle,|01\rangle,|11\rangle$ です。像を列に置くと

$$
W=\begin{pmatrix}
1&0&0&0\\0&0&1&0\\0&1&0&0\\0&0&0&1
\end{pmatrix}.
$$

行と列を転置しても同じ実行列で $W^\dagger=W$ です。中央の2本の基底を一度入れ替え、もう一度入れ替えると元に戻り、行列積でも $W^2=I_4$ です。したがって $W^\dagger W=I_4$。ノルム保存と逆操作 $W^{-1}=W$ が確認できました。
<!-- solution-end -->

<a id="ex-qinf33-a02"></a>

### 演習 A2：1量子ビットだけを取り出す

- Level: A
- 問題: 記憶系 $M_1M_2$ の初期状態を $(|00\rangle+|11\rangle)/\sqrt2$、受け皿 $R_1R_2$ を $|00\rangle$ とする。$M_1,R_1$ のSWAP後に $\rho_{R_1}$ と $S(R_1)$ を求めてください。

<!-- solution-start -->
**詳細解答**。SWAP後、空の $M_1,R_2$ を省いた有効状態は

$$
|\psi\rangle_{R_1M_2}=(|00\rangle+|11\rangle)/\sqrt2.
$$

外積を展開し、[部分トレース](../QINF3/index.md#def-qinf3-partial-trace)で $M_2$ の基底内積 $\langle0|1\rangle=0$ を使うと、交差項は消えます。

$$
\rho_{R_1}=\operatorname{Tr}_{M_2}|\psi\rangle\langle\psi|
=\frac12|0\rangle\langle0|+\frac12|1\rangle\langle1|
=I_2/2.
$$

固有値は $1/2,1/2$ なので[von Neumannエントロピーの定義](../QINF17/index.md#def-qinf17-entropy)より $S(R_1)=-2(1/2)\log_2(1/2)=1$ bitです。
<!-- solution-end -->

<a id="ex-qinf33-a03"></a>

### 演習 A3：可逆性は増大を強制しない

- Level: A
- 問題: $N=4$ の段階的SWAP放出模型で、初期記憶状態が $|0000\rangle_M$、受け皿が $|0000\rangle_R$ のとき、$s(k)$ を $k=0,\ldots,4$ で求めてください。

<!-- solution-start -->
**詳細解答**。各SWAPは $|0\rangle_{M_j}|0\rangle_{R_j}$ を変えません。従って全時刻で $|\Omega_k\rangle=|0000\rangle_M|0000\rangle_R$ です。放射 $R_{\le k}$ の縮約は $|0\rangle^{\otimes k}\langle0|^{\otimes k}$、固有値は1が一つで他は0。よって

$$
s(k)=-1\log_2 1=0\qquad(k=0,1,2,3,4).
$$

全系はユニタリ発展していますが、放射のエントロピーは一度も増えません。
<!-- solution-end -->

<a id="ex-qinf33-a04"></a>

### 演習 A4：Bell対の相互情報量

- Level: A
- 問題: 2量子ビット $X,Y$ が $|\Phi^+\rangle=(|00\rangle+|11\rangle)/\sqrt2$ にある。$I(X:Y)$ を密度演算子の固有値から計算してください。

<!-- solution-start -->
**詳細解答**。[部分トレース](../QINF3/index.md#def-qinf3-partial-trace)により $\rho_X=\rho_Y=I_2/2$ で、両者のエントロピーは1です。全系は純粋なので $S(XY)=0$。[相互情報量の定義](../QINF18/index.md#def-qinf18-mutual)から

$$
I(X:Y)=S(X)+S(Y)-S(XY)=1+1-0=2
$$

bitとなります。量子相互情報量は1量子ビットのエントロピー上限1 bitと同じ量ではないことに注意してください。
<!-- solution-end -->

<a id="ex-qinf33-b01"></a>

### 演習 B1：二組のBell対を追跡する

- Level: B
- 問題: $N=4$ のSWAP放出模型で $|\phi\rangle_M=|\Phi^+\rangle_{M_1M_4}|\Phi^+\rangle_{M_2M_3}$ とする。$k=2$ と $k=3$ の放射縮約状態を具体的に求め、$s(2),s(3)$ を計算してください。

<!-- solution-start -->
**詳細解答**。初期状態は $2^{-1}\sum_{a,b}|a\,b\,b\,a\rangle$ です。$k=2$ の有効状態は $2^{-1}\sum_{a,b}|ab\rangle_{R_1R_2}|ba\rangle_{M_3M_4}$。残存記憶の4つのベクトルは直交するので

$$
\rho_{R_1R_2}^{(2)}=\frac14\sum_{a,b}|ab\rangle\langle ab|=I_4/4,
\qquad s(2)=-4\cdot\tfrac14\log_2\tfrac14=2.
$$

$k=3$ なら有効状態は $2^{-1}\sum_{a,b}|abb\rangle_{R_1R_2R_3}|a\rangle_{M_4}$。$a$ と $b$ の和を分離して

$$
|\varphi_3\rangle
=\frac{|00\rangle+|11\rangle}{\sqrt2}_{R_1M_4}
\otimes\frac{|00\rangle+|11\rangle}{\sqrt2}_{R_2R_3}.
$$

従って

$$
\rho_{R_1R_2R_3}^{(3)}=(I_2/2)_{R_1}\otimes
|\Phi^+\rangle\langle\Phi^+|_{R_2R_3},
\qquad s(3)=1+0=1.
$$

最後は[テンソル積に対するエントロピー加法性](../QINF17/index.md#prop-qinf17-tensor)を使い、二つの因子の固有値・正規化を確認しています。
<!-- solution-end -->

<a id="ex-qinf33-b02"></a>

### 演習 B2：山型でも対称でもない履歴

- Level: B
- 問題: $N=4$ のSWAP放出模型で $|\phi\rangle_M=|\Phi^+\rangle_{M_1M_2}\otimes|00\rangle_{M_3M_4}$ とする。$s(0),\ldots,s(4)$ を求め、各時刻の純粋性と $s(1)\ne s(3)$ が矛盾しない理由を述べてください。

<!-- solution-start -->
**詳細解答**。放射前は純粋なので $s(0)=0$。$k=1$ では $R_1$ の相方 $M_2$ が残り、$\rho_{R_1}=I_2/2$ で $s(1)=1$ です。$k=2$ ではBell対の両方が $R_1R_2$ に移って純粋になり、$s(2)=0$ です。$R_3,R_4$ は純粋な $|0\rangle$ を追加するだけなので[エントロピー加法性](../QINF17/index.md#prop-qinf17-tensor)から $s(3)=s(4)=0$。すなわち

$$
(s(0),s(1),s(2),s(3),s(4))=(0,1,0,0,0).
$$

時刻1で $S(R_1)=S(M_2M_3M_4)=1$、時刻3で $S(R_1R_2R_3)=S(M_4)=0$ と、[同一時刻の二部縮約エントロピー一致](../QINF6/index.md#thm-qinf6-reduced-spectrum)はそれぞれ満たします。異なる時刻1と3の放射側を等置する定理はないため、矛盾しません。
<!-- solution-end -->

<a id="ex-qinf33-b03"></a>

### 演習 B3：参照系との相関を二方向に分ける

- Level: B
- 問題: 3量子ビット $A,M,R$ の純粋状態を $|\mathrm{GHZ}\rangle=(|000\rangle+|111\rangle)/\sqrt2$ とする。$I(A:M)$ と $I(A:R)$ を求め、[参照系との相互情報量収支](#thm-qinf33-reference-budget)を確認してください。量子相互情報量を計算するときは各縮約の固有値を確かめてください。

<!-- solution-start -->
**詳細解答**。$R$ を部分トレースすると、$|0\rangle_R$ と $|1\rangle_R$ が直交するため交差項が消え、

$$
\rho_{AM}=\tfrac12|00\rangle\langle00|
+\tfrac12|11\rangle\langle11|.
$$

この固有値は $1/2,1/2,0,0$ なので $S(AM)=1$。同じ操作で $\rho_{AR}$ の固有値も $1/2,1/2,0,0$、$\rho_A,\rho_M,\rho_R$ は各 $I_2/2$ です。従って

$$
I(A:M)=1+1-1=1,\qquad I(A:R)=1+1-1=1.
$$

合計は2で、$2S(A)=2\cdot1=2$ と一致します。ここでは参照系との相関が $M,R$ の両方に1 bitずつありますが、どちらか一方とBell対を作っているわけではありません。
<!-- solution-end -->

<a id="ex-qinf33-b04"></a>

### 演習 B4：Haar平均の上下界を分割に代入する

- Level: B
- 問題: $N=4$ の記憶側初期純粋状態をHaarランダムに選び、段階的SWAP放出模型で同じ標本を全段階に用いる。$k=1,2,3$ の $\mathbb E s(k)$ の上下界を[Page型平均定理](../QINF32/index.md#thm-qinf32-page-type-mean)から導出し、$\mathbb E s(1)=\mathbb E s(3)$ と、各標本での $s(1)=s(3)$ を区別してください。

<!-- solution-start -->
**詳細解答**。時刻 $k$ の有効分割の次元は $2^k,2^{4-k}$ です。$k=1,3$ では小さい側 $m=2$、大きい側 $n=8$、$k=2$ では $m=n=4$。すべて $1\le m\le n$ です。[Page型平均定理](../QINF32/index.md#thm-qinf32-page-type-mean)の $\log_2((mn+1)/(m+n))\le\mathbb ES\le\log_2m$ へ代入すると

$$
\begin{aligned}
\log_2(17/10)&\le\mathbb Es(1)\le1,\\
\log_2(17/8)&\le\mathbb Es(2)\le2,\\
\log_2(17/10)&\le\mathbb Es(3)\le1.
\end{aligned}
$$

初期Haar分布は量子ビットの置換に不変なので、$k=1,3$ の縮約エントロピーの確率分布が等しく、**期待値**は同じです。一方、演習B2の一つの純粋状態では $s(1)=1,s(3)=0$ でした。従って同一標本の二時刻の等式は導けません。
<!-- solution-end -->

<a id="ex-qinf33-c01"></a>

### 演習 C1：同じ可逆放出でも情報の配り方は異なる

- Level: C
- 問題: $N=4$ の段階的SWAP放出模型で、次の二つの初期記憶純粋状態を考える。

  **（甲）** $|\Phi^+\rangle_{M_1M_4}\otimes|\Phi^+\rangle_{M_2M_3}$。

  **（乙）** $(|0000\rangle+|1111\rangle)/\sqrt2$。

  両者について、次を求めて比較してください。

  1. 放射エントロピー履歴 $s(k)$（$k=0,\ldots,4$）。
  2. 最終時刻の早期 $R_1$ と後期 $R_4$ の相互情報量 $I(R_1:R_4)$。
  3. なぜ両方とも全系のユニタリ性と矛盾しないか。また、Haar平均に対するPage型評価からどちらか一方の履歴を必然と結論できるか。

<!-- solution-start -->
**詳細解答**。どちらも初めの記憶4量子ビットが純粋で、受け皿も純粋、SWAPはユニタリです。[可逆全系と縮約エントロピー](#prop-qinf33-pure-budget)の仮定を満たします。

以下、数式の添字では（甲）を $\mathrm A$、（乙）を $\mathrm B$ と略記します。

**（甲）** $|\phi\rangle=2^{-1}\sum_{a,b}|abba\rangle$ です。$k=1$ では $R_1$ の相方 $M_4$ が残り、$\rho_{R_1}=I_2/2$。$k=2$ では $R_1,R_2$ の相方が別々に残るため $\rho_{R_1R_2}=I_4/4$。$k=3$ では $R_2R_3$ が純粋なBell対をなし、$R_1$ のみが相方 $M_4$ と分かれます。$k=4$ は全放射が純粋です。従って

$$
s_{\mathrm A}=(0,1,2,1,0).
$$

最終時刻の $\rho_{R_1R_4}=|\Phi^+\rangle\langle\Phi^+|$ なので $S(R_1)=S(R_4)=1$、$S(R_1R_4)=0$。[相互情報量](../QINF18/index.md#def-qinf18-mutual)は

$$
I_{\mathrm A}(R_1:R_4)=1+1-0=2.
$$

**（乙）** 初めに $|0000\rangle$ と $|1111\rangle$ の二成分があり、任意の $1\le k\le3$ について、放射と残存記憶に分けると

$$
|\varphi_k\rangle=
\frac{|0\rangle^{\otimes k}_{R_{\le k}}|0\rangle^{\otimes(4-k)}_{B_k}
+|1\rangle^{\otimes k}_{R_{\le k}}|1\rangle^{\otimes(4-k)}_{B_k}}{\sqrt2}.
$$

残存記憶の二つのベクトルは直交するため部分トレースの交差項は0になり、$\rho_{R_{\le k}}$ の非零固有値は $1/2,1/2$ です。よって $s(1)=s(2)=s(3)=1$。$k=0,4$ は純粋なので0、したがって

$$
s_{\mathrm B}=(0,1,1,1,0).
$$

最終時刻に $R_2,R_3$ を部分トレースすると、$\rho_{R_1R_4}=\tfrac12|00\rangle\langle00|+\tfrac12|11\rangle\langle11|$。この状態のエントロピーは1、各周辺は $I_2/2$ なので

$$
I_{\mathrm B}(R_1:R_4)=1+1-1=1.
$$

（甲）の2 bitは量子的なBell相関、（乙）の1 bitはこの二部分系については対角な古典相関です。

**解釈**。どちらも全時刻で全系の純粋性を保ちますが、縮約の固有値は時刻によって異なるため、部分系のエントロピー履歴が違ってよいのです。[Haar平均のPage型評価](#prop-qinf33-haar-partitions)はランダムな初期状態の**期待値**の範囲を与えるもので、指定した（甲）（乙）のいずれかを強制しません。さらにこのSWAP模型は蒸発する時空の方程式を与えていないため、二つの履歴が実際のブラックホールの蒸発曲線を表すという結論もありません。
<!-- solution-end -->

## 10. 次に物理へ進むための問い

有限量子系のユニタリ性、混合した部分系、後から届く放射との相関、そして参照系に対する情報の移送は、矛盾なく同居します。どの相関がいつ放射へ届くかは、**初期状態・分割・時間発展則**の選択に依存します。

ここから先、ブラックホールの蒸発を論じるには、時空における量子場の状態、内外の領域の同定、幾何の時間変化、重力を含むエントロピーの計算法を与える必要があります。QINFで作った有限次元の情報収支は、これらの追加仮定を吟味するための道具となります。
