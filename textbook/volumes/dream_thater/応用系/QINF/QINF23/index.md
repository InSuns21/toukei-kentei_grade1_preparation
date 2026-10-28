# QINF23 量子通信路での古典通信

## 1. 一回の測定の限界から、長い符号語の通信へ

[Holevo界](../QINF21/index.md#thm-qinf21-holevo-bound)は、与えられた量子アンサンブルを一度測って取り出せる古典情報を制限しました。しかし、送信者が長い符号語を選び、受信者が全出力を**まとめて**測定すると、単一出力の最適測定を繰り返すよりよい通信が可能です。ここでは送信者の目的を「未知の量子状態を保存すること」ではなく、**あらかじめ決めた古典メッセージ番号を正しく復号すること**とします。[QINF22の典型射影](../QINF22/index.md#lem-qinf22-typical-bounds)を符号語の識別へ再利用します。

すべて有限次元、対数の底は2です。断りなく「容量」と書くときは、独立に同じ通信路を使い、平均復号誤りが0へ向かうときの1使用あたりのビット数を指します。送受信者に事前共有エンタングルメントはありません。

## 2. cq符号・平均誤り・通信率

[量子チャネル](../QINF7/index.md#def-qinf7-channel)の入力を古典ラベルに制限すると、ラベル $x$ ごとに[密度演算子](../QINF2/index.md#def-qinf2-ensemble-density) $\rho_x$ が出力されます。これを *cq通信路*（classical-to-quantum channel）と呼びます。$x^n=(x_1,\ldots,x_n)$ は長さ $n\ge1$ のラベル列を表し、記憶のない通信路では各回の出力がテンソル積になります。復号には[POVMとBorn則](../QINF5/index.md#def-qinf5-povm)を用います。

<a id="def-qinf23-cq-code"></a>

<!-- formal-statement-start -->
> **定義（cq通信路と古典メッセージ符号）**
> 有限集合 $\mathcal X$、有限次元Hilbert空間 $B$ と密度演算子族 $\{\rho_x\}$ を固定する。記憶のないcq通信路の長さ $n$ の出力を次で定める。

$$
\rho_{x^n}=\rho_{x_1}\otimes\cdots\otimes\rho_{x_n}
$$

> 長さ $n$、メッセージ数 $M$ の符号は、各メッセージ $m$ に対応する文字列 $x^n(m)$ と、$B^{\otimes n}$ 上のPOVM $\{\Lambda_m\}$ である。POVMは $\Lambda_m\ge0$、$\sum_m\Lambda_m=I$ を満たす。一様なメッセージの**平均誤り**と**通信率**を

$$
P_e^{(n)}=1-\frac1M\sum_{m=1}^M\operatorname{Tr}(\rho_{x^n(m)}\Lambda_m),
\qquad R_n=\frac{\log_2M}{n}
$$
<!-- formal-statement-end -->

とする。誤りに応じた「失敗」POVM要素を追加する方式も、失敗を任意の一つのメッセージへ割り当てればこの形にでき、平均誤りは増えません。

<!-- definition-example-start: def-qinf23-cq-code -->
**定義の確認**。 [計算基底](../QINF1/index.md#def-qinf1-qubit)の $\rho_0=|0\rangle\langle0|$、$\rho_1=|1\rangle\langle1|$ を使い、$n=2$、$M=4$ とします。符号語を $00,01,10,11$ とし、$|x^2(m)\rangle=|x_1(m)\rangle\otimes|x_2(m)\rangle$ と置きます。これは4次元空間の正規直交基底なので、

$$
\Lambda_m=|x^2(m)\rangle\langle x^2(m)|\ge0,\qquad
\sum_{m=1}^4\Lambda_m=I_4,\qquad
\operatorname{Tr}(\rho_{x^2(m)}\Lambda_m)=1.
$$

正値性と完全性はPOVMの二条件に対応します。従って平均誤りと率は

$$
P_e^{(2)}=1-\frac44=0,\qquad R_2=\frac{\log_2 4}{2}=1
$$

です。一方、$\rho_0=\rho_1=I_2/2=:\tau$ なら、どんなPOVMでも

$$
\frac1M\sum_m\operatorname{Tr}(\tau^{\otimes n}\Lambda_m)
=\frac1M\operatorname{Tr}\!\left(\tau^{\otimes n}\sum_m\Lambda_m\right)=\frac1M
$$

となります。単なる符号語の個数ではなく、**出力が区別できること**が必要です。
<!-- definition-example-end -->

<a id="def-qinf23-capacity"></a>

<!-- formal-statement-start -->
> **定義（古典通信の達成可能率と容量）**
> 記憶のないcq通信路について、符号列 $\{(n,M_n)\}$ が存在し、次を満たすなら $R$ を達成可能と呼ぶ。

$$
P_e^{(n)}\to0,\qquad
\liminf_{n\to\infty}\frac{\log_2M_n}{n}\ge R
$$

> その上限を $C_{\mathrm{cq}}$ とする。一般の量子チャネル $\mathcal N:A\to B$ では、各メッセージに $A^{\otimes n}$ 上の任意の密度演算子 $\omega_m^{(n)}$ を入力できる。その出力は $\mathcal N^{\otimes n}(\omega_m^{(n)})$ である。この場合の同様の上限を $C(\mathcal N)$ とする。
<!-- formal-statement-end -->

後者の $\omega_m^{(n)}$ は $n$ 回分の入力間でエンタングルしていても構いません。この自由度こそ後で単一文字式を安易に一般化できない理由です。

<!-- definition-example-start: def-qinf23-capacity -->
**定義の確認**。 直交する二出力では長さ $n$ の $2^n$ 通りのビット列を互いに直交する状態へ写せるため、計算基底測定で

$$
M_n=2^n,\qquad P_e^{(n)}=0,\qquad \frac{\log_2M_n}{n}=1
$$

を達成します。一方、すべての出力が同じ状態なら上の例より $P_e^{(n)}=1-1/M_n$ です。整数 $M_n\ge1$ について $P_e^{(n)}\to0$ には、十分大きな $n$ で $M_n=1$ が必要となり、正の達成可能率はありません。これらは容量定義の極限条件を直接調べた例です。
<!-- definition-example-end -->

## 3. 逆向き評価：誤りが小さいなら情報は十分ある

[Holevo情報](../QINF21/index.md#def-qinf21-holevo)を $\chi(p,\rho)=S(\sum_xp_x\rho_x)-\sum_xp_xS(\rho_x)$ と書きます。[古典量子状態のブロックエントロピー](../QINF21/index.md#lem-qinf21-cq-entropy)から、この差は古典ラベルと量子出力の相互情報量です。$p$ は有限集合上の確率分布です。

<a id="lem-qinf23-fano"></a>

<!-- formal-statement-start -->
> **補題（Fano不等式とブロックHolevo逆評価）**
> 一様メッセージ $U\in\{1,\ldots,M\}$ の符号をPOVMで復号して $\widehat U$ を得たとする。平均誤りを $\varepsilon=\Pr\{U\ne\widehat U\}$ とすれば

$$
(1-\varepsilon)\log_2M\le I(U;\widehat U)+h_2(\varepsilon)
\le\chi\!\left(\left\{\tfrac1M,\sigma_m\right\}_{m=1}^M\right)+h_2(\varepsilon),
$$
<!-- formal-statement-end -->

ここで $\sigma_m$ は各符号語の量子出力、$h_2(t)=-t\log_2t-(1-t)\log_2(1-t)$ です（端点は連続延長）。

### 証明の見取り図

まず誤りが起きたかの1ビットと、誤り時の残り $M-1$ 通りを使って $H(U|\widehat U)$ を抑えます。ここで $H$ は[古典条件付きエントロピー](../../INFO/INFO1/index.md#def-info1-conditional-entropy)、$I(U;\widehat U)$ は[古典相互情報量](../../INFO/INFO2/index.md#thm-info2-mutual-kl)です。次にPOVMは量子系から古典結果へのチャネルなので[Holevo界](../QINF21/index.md#thm-qinf21-holevo-bound)を適用します。

<!-- proof-start -->
### 証明

$M=1$ なら誤りは0で主張は自明です。以下 $M\ge2$ とします。$E=1_{\{U\ne\widehat U\}}$ は $(U,\widehat U)$ から決まるので、[古典エントロピーの連鎖律](../../INFO/INFO1/index.md#thm-info1-chain-rule)から

$$
H(U|\widehat U)=H(E|\widehat U)+H(U|E,\widehat U).
$$

$H(E|\widehat U)\le H(E)=h_2(\varepsilon)$。$E=0$ なら $U=\widehat U$ で残りの不確かさは0、$E=1$ なら $U$ は高々 $M-1$ 個なので

$$
H(U|E,\widehat U)\le\varepsilon\log_2(M-1)\le\varepsilon\log_2M.
$$

$H(U)=\log_2M$ と $I(U;\widehat U)=H(U)-H(U|\widehat U)$ を代入します。さらに $U$ と $\sigma_U$ のアンサンブルに[Holevo界](../QINF21/index.md#thm-qinf21-holevo-bound)を適用すれば後半の不等式です。
<!-- proof-end -->

**cq通信路の逆定理。** 長さ $n$ の任意のcq符号でメッセージを一様に選び、これを $U$ とします。第 $i$ 回の入力を $X_i=x_i(U)$、出力系を $B_i$ と呼び、全出力を $B^n=B_1\cdots B_n$ と略記します。添字 $i$ は通信路の使用回数を動きます。

$\chi(U;B^n)$ はメッセージと量子出力の[Holevo情報](../QINF21/index.md#def-qinf21-holevo)で、既出の $\chi(p,\rho)$ を符号語アンサンブルへ適用した同じ量です。[エントロピーの部分加法性](../QINF18/index.md#thm-qinf18-subadditivity)と[積状態のエントロピー加法性](../QINF17/index.md#prop-qinf17-tensor)から

$$
\begin{aligned}
\chi(U;B^n)
&=S(B^n)-\frac1M\sum_mS(\rho_{x^n(m)})\\
&\le\sum_{i=1}^n S(B_i)-\sum_{i=1}^n\frac1M\sum_m S(\rho_{x_i(m)})\\
&=\sum_{i=1}^n\chi(p_i,\rho)\le n\max_p\chi(p,\rho),
\end{aligned}
$$

ここで $p_i(x)=M^{-1}|\{m:x_i(m)=x\}|$。二行目は各 $\sigma_m$ が積状態であるため $S(\sigma_m)=\sum_iS(\rho_{x_i(m)})$ が成り立つことに依存します。補題より

$$
(1-P_e^{(n)})R_n\le\max_p\chi(p,\rho)+\frac1n h_2(P_e^{(n)}).
$$

したがって誤りが0へ向かう符号の率は $\max_p\chi$ を超えません。**この逆定理だけでは、その率に達する符号があるとはまだ言えません。**

## 4. 長い符号語を区別するための典型射影

入力分布 $p=(p_x)_{x\in\mathcal X}$ を固定し、平均出力を $\bar\rho=\sum_xp_x\rho_x$ とします。その平均状態に対する[量子典型射影](../QINF22/index.md#def-qinf22-typical)を $P$ と呼びます。

一方、符号語 $x^n$ については、文字 $x$ の出現回数を $N_x=|\{i:x_i=x\}|$ と定めます。その $N_x$ 個の位置にある $\rho_x$ の固有値列を典型化し、選ばれた積固有ベクトルの張る空間への射影を $P_{x^n}$ と呼びます。これは平均状態の固有基底への射影ではなく、$\rho_{x^n}$ の積スペクトルに対応します。出現回数が小さい文字の部分は全空間として扱ってよく、入力列が非典型なら零射影にしても構いません。

<a id="lem-qinf23-overlap"></a>

<!-- formal-statement-start -->
> **補題（条件付き典型射影の平均重なり）**
> 有限入力cq通信路 $x\mapsto\rho_x$、分布 $p$ と $\delta>0$ を固定する。$X^n\sim p^{\otimes n}$ とする。十分大きい $n$ に対して射影 $P$ と $P_{x^n}$ を選べて、$\eta_n\to0$（$n\to\infty$）が存在し、

$$
\begin{gathered}
\operatorname{Tr}(P\bar\rho^{\otimes n})\ge1-\eta_n,
\qquad \operatorname{Tr}(P\bar\rho^{\otimes n}P)\ge1-\eta_n,\\
\mathbb E\operatorname{Tr}(P_{X^n}\rho_{X^n})\ge1-\eta_n,\\
\operatorname{rank}P_{x^n}\le 2^{n(\sum_xp_xS(\rho_x)+\delta)}
\quad\text{for typical }x^n,\\
P\bar\rho^{\otimes n}P\le2^{-n(S(\bar\rho)-\delta)}P.
\end{gathered}
$$

ここで典型でない $x^n$ には $P_{x^n}=0$ を設定してよい。特に、独立な $X'^n\sim p^{\otimes n}$ と $X^n$ に対して

$$
\mathbb E_{X^n,X'^n}\operatorname{Tr}\!\left(PP_{X'^n}P\rho_{X^n}\right)
\le2^{-n(\chi(p,\rho)-2\delta)}.
$$
<!-- formal-statement-end -->

### 証明の見取り図

$P$ の固有値上界は平均状態 $\bar\rho$ の典型性から来ます。一方、$P_{x^n}$ のrankは、入力文字 $x$ の出現頻度に応じて各 $\rho_x$ の固有値の典型列を数えて評価します。最後は独立な「間違った符号語」の射影を平均し、$P\bar\rho^{\otimes n}P$ の小ささを使います。

<!-- proof-start -->
### 証明

各 $\rho_x$ の正の固有値を $r_{xj}$ とすると、固有値分布から選ぶ $J$ の自己情報量 $Z_x=-\log_2r_{xJ}$ は、$E[Z_x]=S(\rho_x)$、分散 $V_x<\infty$ を持ちます。$x$ が現れた $N_x$ 箇所の積固有値を選び、その自己情報量の和が $N_xS(\rho_x)$ から高々 $N_x\delta/4$ ずれる固有ベクトルだけを残します。[典型射影のスペクトル構成](../QINF22/index.md#def-qinf22-typical)と同じ判定を文字ごとの位置集合へ適用したものです。

$p_x=0$ の文字は確率1で発生しません。$p_x>0$ の各文字では $N_x/n\to p_x$ なので、典型入力集合で $N_x\ge np_x/2$ としてよく、$\Pr\{X^n\text{ が非典型}\}\to0$ です。この集合上で[Chebyshev評価](../../INFO/INFO3/index.md#thm-info3-aep)を条件付き固有値分布に使うと

$$
\Pr\!\left\{\left|\sum_{j=1}^{N_x}Z_{x,j}-N_xS(\rho_x)\right|>\frac{N_x\delta}{4}\,\middle|\,X^n=x^n\right\}
\le\frac{16V_x}{N_x\delta^2}\le\frac{32V_x}{np_x\delta^2}.
$$

有限個の $p_x>0$ の文字についてこの失敗確率を足しても0へ向かいます。従って $P_{x^n}$ は、典型入力上で $\rho_{x^n}$ の重みを一様に $1-o(1)$ だけ拾い、非典型入力を零射影にしても平均成功確率は1へ向かいます。

各文字の固有値典型列の数は $2^{N_x(S(\rho_x)+\delta/4)}$ 以下なので、全体のrankはそれらの積以下です。有限個の $S(\rho_x)$ は有界なので、頻度の誤差を十分小さく取れば

$$
\log_2\operatorname{rank}P_{x^n}\le\sum_xN_x(S(\rho_x)+\delta/4)
\le n\left(\sum_xp_xS(\rho_x)+\delta\right).
$$

この射影は $\rho_{x^n}$ の積固有ベクトルから作ったので可換です。上の確率評価が補題の平均重みの主張を与えます。

$P$ は[QINF22の典型射影評価](../QINF22/index.md#lem-qinf22-typical-bounds)を $\bar\rho$ に適用したものです。最後に $\mathbb E\rho_{X^n}=\bar\rho^{\otimes n}$ と独立性を使うと

$$
\begin{aligned}
\mathbb E\operatorname{Tr}(PP_{X'^n}P\rho_{X^n})
&=\mathbb E_{X'^n}\operatorname{Tr}(P_{X'^n}P\bar\rho^{\otimes n}P)\\
&\le2^{-n(S(\bar\rho)-\delta)}\mathbb E\operatorname{rank}P_{X'^n}\\
&\le2^{-n(S(\bar\rho)-\sum_xp_xS(\rho_x)-2\delta)}.
\end{aligned}
$$

二行目で $P\bar\rho^{\otimes n}P\le cP$ を正作用素 $P_{X'^n}$ とトレースし、$\operatorname{Tr}(P_{X'^n}P)\le\operatorname{rank}P_{X'^n}$ を用いました。
<!-- proof-end -->

## 5. 平方根測定からHSW達成可能性へ

符号語に対応する作用素 $D_m=PP_{x^n(m)}P$ を作り、$D=\sum_mD_m$ とします。$P,P_{x^n(m)}$ は直交射影なので、任意の $v$ について $\langle v|D_m|v\rangle=\|P_{x^n(m)}Pv\|^2$ であり、$0\le D_m\le I$ です。$D$ の正の固有値 $d$ にだけ $d^{-1/2}$ を施し、核では0とする逆平方根 $D^{-1/2}$ を用います。

$$
\Lambda_m=D^{-1/2}D_mD^{-1/2},\qquad
\sum_m\Lambda_m=D^{-1/2}DD^{-1/2}=\Pi_{\operatorname{supp}D}.
$$

これが **平方根測定**（pretty-good measurement）です。各 $\Lambda_m$ は正作用素で、和が台への射影となるので、残余 $I-\Pi_{\operatorname{supp}D}\ge0$ を任意の復号結果へ割り当てれば[POVMの完全性](../QINF5/index.md#def-qinf5-povm)を満たします。全空間での可逆性を仮定していません。

<a id="lem-qinf23-pgm"></a>

<!-- formal-statement-start -->
> **補題（平方根測定の誤差評価）**
> $0\le D_m\le I$ とし、$D=\sum_mD_m$ とする。平方根測定の要素 $\Lambda_m=D^{-1/2}D_mD^{-1/2}$ に対し、任意の密度演算子 $\sigma_m$ について

$$
1-\operatorname{Tr}(\sigma_m\Lambda_m)
\le2\operatorname{Tr}[\sigma_m(I-D_m)]
+4\sum_{j\ne m}\operatorname{Tr}(\sigma_m D_j).
$$
<!-- formal-statement-end -->

### 証明の見取り図

左辺は正しい識別に失敗する確率です。右辺の第1項は正しい候補への射影漏れ、第2項は間違った候補への重なりです。この二つを分ける作用素評価を以下で説明します。

<!-- proof-start -->
### 証明

半正定値 $S\le I$、$T\ge0$ に対するHayashi–Nagaoka作用素不等式

$$
I-(S+T)^{-1/2}S(S+T)^{-1/2}\le2(I-S)+4T
$$

を $S=D_m$、$T=\sum_{j\ne m}D_j$ に適用し、$\sigma_m$ とトレースします。逆平方根は台上で定義し、核上で0とします。核上でも左辺は $I$、右辺は少なくとも $2I$ です。

この作用素不等式を途中式から証明します。まず $A=S+T$ が正定値の場合を扱い、$R=A^{-1/2}$、$K=R-I$ と置きます。$T^{1/2}$ は正の平方根です。任意の $c>0$ について

$$
0\le(c^{-1/2}T^{1/2}-c^{1/2}T^{1/2}K)^\dagger
(c^{-1/2}T^{1/2}-c^{1/2}T^{1/2}K)
$$

を展開し、$K=K^\dagger$ を用いて交差項を移すと

$$
TK+KT\le c^{-1}T+cKTK
$$

です。$A=S+T$ と $RA=AR=A^{1/2}$ より、$RASR$ ではなく $RAR=I$ を使って

$$
\begin{aligned}
I-RSR&=RTR\\
&=(I+K)T(I+K)\\
&=T+TK+KT+KTK\\
&\le(1+c^{-1})T+(1+c)KTK\\
&\le(1+c^{-1})T+(1+c)KAK\\
&=(1+c^{-1})T+(1+c)(I+A-2A^{1/2}).
\end{aligned}
$$

第5行は $A-T=S\ge0$ から $K(A-T)K\ge0$、最終行は $(A^{-1/2}-I)A(A^{-1/2}-I)=I+A-2A^{1/2}$ から従います。

残る一手は **正の平方根の作用素単調性**、すなわち $0\le B\le A$ なら $B^{1/2}\le A^{1/2}$ です。これも有限次元で次のように確かめられます。$t>0$ に対し、$0<X\le Y$ なら $Y^{-1}\le X^{-1}$ です。実際 $Y^{-1/2}XY^{-1/2}\le I$ の正の固有値を逆数にすると $Y^{1/2}X^{-1}Y^{1/2}\ge I$ で、合同変換を戻せます。これを $X=B+tI$、$Y=A+tI$ に使うと

$$
A(A+tI)^{-1}=I-t(A+tI)^{-1}
\ge I-t(B+tI)^{-1}=B(B+tI)^{-1}.
$$

固有値ごとに成立する積分表示

$$
X^{1/2}=\frac1\pi\int_0^\infty t^{-1/2}X(X+tI)^{-1}\,dt
$$

を両辺に適用すれば、積分の重みが正なので平方根の単調性を得ます（固有値 $a\ge0$ では $t=au^2$ と置くと積分が $\sqrt a$ になり、$a=0$ は0です）。今 $A\ge S$、また $0\le S\le I$ の各固有値 $s$ は $\sqrt s\ge s$ を満たすので

$$
A^{1/2}\ge S^{1/2}\ge S.
$$

したがって先ほどの最終行は

$$
I-RSR\le(1+c^{-1})T+(1+c)(I+S+T-2S)
=(1+c)(I-S)+(2+c+c^{-1})T.
$$

$c=1$ として目的の係数2、4を得ます。

$A$ に核がある場合、その台への射影を $P$ とします。正作用素の性質から

$$
\ker A=\ker S\cap\ker T
$$

です。従って $P$ は $S,T$ と可換です。$P$ 上では正定値の場合を適用でき、$P^\perp$ 上では左辺が $I$、右辺が $2I$ です。これで全空間の不等式が成立します。

これは[Hayashi–Nagaokaの原論文](https://arxiv.org/pdf/quant-ph/0206186)の作用素評価を、平方根の単調性まで展開したものです。
<!-- proof-end -->

<a id="thm-qinf23-hsw"></a>

<!-- formal-statement-start -->
> **定理（有限入力cq通信路のHSW定理）**
> 有限集合 $\mathcal X$ から有限次元量子系への記憶のないcq通信路 $x\mapsto\rho_x$ の、平均誤りが0へ向かう古典通信容量は

$$
C_{\mathrm{cq}}=\max_{p\in\mathcal P(\mathcal X)}
\left[S\left(\sum_xp_x\rho_x\right)-\sum_xp_xS(\rho_x)\right].
$$
<!-- formal-statement-end -->

### 証明の見取り図

逆向きは第3節で証明しました。達成向きは固定した $p$ から符号語を独立に無作為抽出し、条件付き典型射影を使った平方根測定で識別します。候補数 $M$ に比例する「偽候補への重なり」が $2^{-n\chi}$ で減るので、$R<\chi$ なら消えます。

<!-- proof-start -->
### 証明

任意の $p$ と $0<R<\chi(p,\rho)$ を固定し、$0<3\delta<\chi-R$ を選びます。$M=\lfloor2^{nR}\rfloor$ 個の $X^n(m)$ を互いに独立に $p^{\otimes n}$ に従って引きます。第4節の $P,P_{x^n}$ と $D_m=PP_{X^n(m)}P$ を使用します。$0\le D_m\le I$ です。

[平方根測定の誤差評価](#lem-qinf23-pgm)を使うと、符号語の無作為性についての平均誤りは

$$
\mathbb EP_e^{(n)}\le2\mathbb E\operatorname{Tr}[\rho_{X^n}(I-PP_{X^n}P)]
+4(M-1)2^{-n(\chi-2\delta)}.
$$

第1項を評価します。$0\le P_{x^n}\le I$ と射影 $P$ に対して

$$
\left|\operatorname{Tr}(\rho_{x^n}P_{x^n})-\operatorname{Tr}(\rho_{x^n}PP_{x^n}P)\right|
\le2\sqrt{\operatorname{Tr}[\rho_{x^n}(I-P)]}
$$

が成り立ちます。[精製](../QINF4/index.md#def-qinf4-purification) $|\psi\rangle$ を取って $A=P_{x^n}\otimes I$、$Q=P\otimes I$ と置けば $0\le A\le I$、$\|Q\psi\|\le1$ なので

$$
\begin{aligned}
|\langle\psi|(A-QAQ)|\psi\rangle|
&=|\langle(I-Q)\psi|A|\psi\rangle+\langle Q\psi|A|(I-Q)\psi\rangle|\\
&\le2\|(I-Q)\psi\|
=2\sqrt{\operatorname{Tr}[\rho_{x^n}(I-P)]}.
\end{aligned}
$$

平方根の凹性により平均では上界 $2\sqrt{\eta_n}$ です。したがって

$$
\mathbb E\operatorname{Tr}[\rho_{X^n}(I-PP_{X^n}P)]
\le\eta_n+2\sqrt{\eta_n}.
$$

$M\le2^{nR}$ より

$$
\mathbb EP_e^{(n)}\le2\eta_n+4\sqrt{\eta_n}
+4\cdot2^{-n(\chi-2\delta-R)}\longrightarrow0.
$$

平均値以下の誤りを持つ決定的符号帳が少なくとも一つ存在します。$M=\lfloor2^{nR}\rfloor$ なので $\log_2M/n\to R$。$p$ と $R<\chi(p,\rho)$ を任意に選べるため $C_{\mathrm{cq}}\ge\max_p\chi$。逆向きの上界と合わせて等号です。$\chi=0$ の場合の達成可能率0はメッセージを一つにする符号から従います。
<!-- proof-end -->

この証明で典型射影を使うのは、出力を圧縮するためではなく、**多数の非直交状態の候補を集合的に見分ける測定**を構成するためです。

## 6. 例：可換出力と非直交純粋出力

**二元対称な可換出力。** $0\le q\le1/2$ として、次の計算基底表示を持つ密度演算子を考えます。

$$
\rho_0=\operatorname{diag}(1-q,q),\qquad
\rho_1=\operatorname{diag}(q,1-q)
$$

入力確率 $p=\Pr\{X=0\}$ とすると、平均状態は

$$
\bar\rho_p=p\rho_0+(1-p)\rho_1
=\operatorname{diag}(q+p(1-2q),\,1-q-p(1-2q))
$$

です。対角成分がそのまま固有値なので、[対角状態のエントロピー](../QINF17/index.md#prop-qinf17-classical)より $S(\rho_0)=S(\rho_1)=h_2(q)$、$S(\bar\rho_p)\le1$ であり、$p=1/2$ のとき等号です。[HSW定理](#thm-qinf23-hsw)から

$$
C_{\mathrm{cq}}=\max_p\{S(\bar\rho_p)-h_2(q)\}=1-h_2(q).
$$

すべての出力が同じ基底で対角なので、[可換アンサンブルの測定](../QINF21/index.md#prop-qinf21-commuting)は各回の古典的な条件付き確率を失いません。実際、この基底での測定結果は入力ビットを確率 $q$ で反転したものです。$q=0$ では容量1ビット、$q=1/2$ では0ビットです。

**非直交な純粋出力。** $\rho_0=|0\rangle\langle0|$、$\rho_1=|\psi\rangle\langle\psi|$ とし、$|\psi\rangle=c|0\rangle+\sqrt{1-c^2}|1\rangle$、$0<c<1$ とします。$|\psi\rangle$ は規格化されているため、両 $\rho_x$ は正値・トレース1のrank 1射影です。従って $S(\rho_x)=0$ です。

平均状態のエントロピーを求めるため、$s=\sqrt{1-c^2}$、$p=\Pr\{X=0\}$ と置いて計算基底で外積を展開します。

$$
\bar\rho_p=p\rho_0+(1-p)\rho_1
=\begin{pmatrix}
p+(1-p)c^2&(1-p)cs\\
(1-p)cs&(1-p)s^2
\end{pmatrix}.
$$

この行列は元の二密度演算子を非負の重み $p,1-p$（和1）で混合したものなので正値・トレース1です。固有値の和と積はそれぞれトレースと行列式に等しく、

$$
\begin{aligned}
\operatorname{Tr}\bar\rho_p&=1,\\
\det\bar\rho_p&=[p+(1-p)c^2](1-p)s^2-(1-p)^2c^2s^2
=p(1-p)(1-c^2),\\
\lambda_\pm(p)&=\frac{1\pm\sqrt{1-4p(1-p)(1-c^2)}}2.
\end{aligned}
$$

従って $\chi(p)=h_2(\lambda_+(p))$ です。$p(1-p)\le1/4$ で、$\lambda_+(p)$ はこの積が大きいほど $1/2$ に近づきます。一方、二値エントロピーは

$$
h_2'(u)=\log_2\frac{1-u}{u}\le0\qquad(1/2\le u<1)
$$

を満たすため、入力確率 $p=1/2$ で最大となります。このとき $\lambda_\pm=(1\pm c)/2$ であり、

$$
C_{\mathrm{cq}}=h_2\!\left(\frac{1+c}{2}\right).
$$

[二状態の完全識別条件](../QINF10/index.md#prop-qinf10-pure-states)から単一回の測定では非直交二状態を誤り0で識別できません。それでも[HSW定理](#thm-qinf23-hsw)により長いブロックではこの正の率で平均誤りを0へ近づけられます。ただし $c=1$ なら二状態は同じで容量0、$c=0$ なら直交して容量1です。

## 7. 一般量子チャネルではなぜ正則化が必要か

一般の[量子チャネル](../QINF7/index.md#def-qinf7-channel) $\mathcal N:A\to B$ に対し、1回の使用で入力アンサンブルを最適化したHolevo量を考えます。$\{p_x,\omega_x\}$ は有限個のラベル $x$ に関する確率 $p_x$（$\sum_xp_x=1$）と $A$ 上の密度演算子 $\omega_x$ の組を表し、最大化ではラベル数も変えてよいものとします。

$$
\chi^*(\mathcal N)=\max_{\{p_x,\omega_x\}}
\left[S\!\left(\sum_xp_x\mathcal N(\omega_x)\right)
-\sum_xp_xS(\mathcal N(\omega_x))\right]
$$

と書きます。有限個で最大値を取れる理由も確認します。$d=\dim B$ とし、出力状態 $\sigma_x=\mathcal N(\omega_x)$ とそのエントロピーの組を

$$
(\sigma_x,S(\sigma_x))\in\mathbb R^{d^2-1}\times\mathbb R=\mathbb R^{d^2}
$$

の点として表します。トレース1のHermitian行列は $d^2-1$ 個の実座標で表せるからです。$d^2+2$ 個以上の点はアフィン従属なので、係数の和・平均出力・平均エントロピーを保ったまま重みを増減し、少なくとも1個を0にできます。反復すれば高々 $d^2+1$ 個の入力状態で同じHolevo量を表せます。入力状態のコンパクト性とエントロピーの連続性から、その個数以下のアンサンブル上で最大値が存在します。

この値は**積入力符号**の容量ですが、入力 $A^{\otimes n}$ にエンタングル状態を許す一般符号の容量とは直ちに同じではありません。一般符号では各ブロック全体を一つの入力として扱うため、単回の最大化と区別します。

<a id="thm-qinf23-regularized"></a>

<!-- formal-statement-start -->
> **定理（一般量子チャネルの正則化古典容量）**
> 有限次元の記憶のない量子チャネル $\mathcal N:A\to B$ について、送信者が各ブロック内で任意の入力状態を用い、受信者が全出力へのPOVMを用いる古典通信容量は

$$
C(\mathcal N)=\lim_{k\to\infty}\frac1k\chi^*(\mathcal N^{\otimes k})
=\sup_{k\ge1}\frac1k\chi^*(\mathcal N^{\otimes k}).
$$
<!-- formal-statement-end -->

### 証明の見取り図

長さ $k$ の入力ブロック全体をcq通信路の一つの「文字」と見れば、[有限入力cq通信路のHSW定理](#thm-qinf23-hsw)から $\chi^*(\mathcal N^{\otimes k})/k$ を達成できます。逆向きは各長さ $n$ の符号帳そのものに[Holevo界](../QINF21/index.md#thm-qinf21-holevo-bound)を当てます。ブロックを並べられることから最適Holevo量が超加法的になり、極限が存在します。

<!-- proof-start -->
### 証明

$a_k=\chi^*(\mathcal N^{\otimes k})$、$a_0=0$ と置きます。$k$ 個と $\ell$ 個の最適入力アンサンブルの直積を考えると、出力平均状態も各出力状態も積状態です。[エントロピーのテンソル積加法性](../QINF17/index.md#prop-qinf17-tensor)から、そのHolevo量は $a_k+a_\ell$ なので、$a_{k+\ell}\ge a_k+a_\ell$ です。また[エントロピーの次元上界](../QINF17/index.md#thm-qinf17-entropy-bounds)により $0\le a_k\le k\log_2\dim B$ です。

超加法列のFeketeの補題は、$n=qk+r$（$0\le r<k$）と分けて

$$
\frac{a_n}{n}\ge\frac{q a_k+a_r}{n}\ge\frac{q a_k}{qk+r}
\longrightarrow\frac{a_k}{k}\quad(n\to\infty)
$$

とすれば、固定 $k$ について $\liminf_n a_n/n\ge a_k/k$ と分かります。一方 $a_n/n\le\sup_k a_k/k$ なので、極限と上限が等しいです。

達成向きでは $k$ を固定し、$A^{\otimes k}$ 上の有限個の状態 $\omega_x$ を「入力文字」、$\mathcal N^{\otimes k}(\omega_x)$ を「出力文字」とするcq通信路へ[HSW定理](#thm-qinf23-hsw)を適用します。$t$ 文字を送る符号は元のチャネルの $kt$ 回の符号なので、率 $\chi(\{p_x,\mathcal N^{\otimes k}(\omega_x)\})/k$ に近づけます。入力アンサンブルと $k$ を最適化して下界が出ます。

逆向きには任意の長さ $n$ の一般符号の出力アンサンブル $\{1/M,\mathcal N^{\otimes n}(\omega_m^{(n)})\}$ を第3節の[Fano・Holevo補題](#lem-qinf23-fano)に代入します。そのHolevo量は定義により $a_n$ 以下です。したがって $(1-P_e^{(n)})R_n\le a_n/n+1/n$。$P_e^{(n)}\to0$ と $a_n/n\to\sup_k a_k/k$ から上界を得ます。
<!-- proof-end -->

**注意。** すべてのチャネルに対して $C(\mathcal N)=\chi^*(\mathcal N)$ と置くことはできません。上の正則化は一般に必要です。またこの章の容量は古典メッセージ用であり、量子状態を忠実に送る容量（次章QINF24）とも、事前共有エンタングルメントを許す容量とも異なります。

## 8. 演習と詳細解答

<a id="ex-qinf23-a01"></a>

### 演習 A1：平均誤りの直接計算

- Level: A
- 問題: $\rho_0=|0\rangle\langle0|$、$\rho_1=|1\rangle\langle1|$ に対して長さ1、$M=2$、復号POVM $\Lambda_1=(1-t)|0\rangle\langle0|+t|1\rangle\langle1|$、$\Lambda_2=I-\Lambda_1$（$0\le t\le1$）を用いる。符号語0,1を割り当てたときの平均誤りと率を求めよ。

<!-- solution-start -->
**詳細解答。** 計算基底で $\Lambda_1=\operatorname{diag}(1-t,t)$、$\Lambda_2=\operatorname{diag}(t,1-t)$ です。$0\le t\le1$ より両者の固有値は非負、かつ $\Lambda_1+\Lambda_2=I_2$ なので[POVMの条件](../QINF5/index.md#def-qinf5-povm)を満たします。

各符号語の成功確率は $\operatorname{Tr}(\rho_0\Lambda_1)=\operatorname{Tr}(\rho_1\Lambda_2)=1-t$ です。[平均誤りと率の定義](#def-qinf23-cq-code)に代入すると

$$
P_e^{(1)}=1-\frac{(1-t)+(1-t)}2=t,\qquad
R_1=\frac{\log_2 2}{1}=1\ \text{ビット/使用}.
$$
<!-- solution-end -->

<a id="ex-qinf23-a02"></a>

### 演習 A2：同じ出力しか出ない通信路

- Level: A
- 問題: すべての $x$ に $\rho_x=\tau$ が成り立つcq通信路について任意の $n,M$ の成功確率と容量を求めよ。

<!-- solution-start -->
**詳細解答。** 各符号語の出力は $\tau^{\otimes n}$ で共通です。[POVMの完全性](../QINF5/index.md#def-qinf5-povm)を用いると、平均成功確率は

$$
\frac1M\sum_m\operatorname{Tr}(\tau^{\otimes n}\Lambda_m)
=\frac1M\operatorname{Tr}\!\left(\tau^{\otimes n}\sum_m\Lambda_m\right)
=\frac1M.
$$

従って $P_e^{(n)}=1-1/M_n$ です。これが0へ向かうには整数 $M_n=1$ が十分大きな $n$ で必要なので、正の率は不可能です。また

$$
\chi(p,\rho)=S(\tau)-\sum_xp_xS(\tau)=0
$$

であり、[HSW容量公式](#thm-qinf23-hsw)とも一致します。
<!-- solution-end -->

<a id="ex-qinf23-a03"></a>

### 演習 A3：Fanoの数値評価

- Level: A
- 問題: $M=16$、平均誤り $\varepsilon=1/8$ の符号について、復号結果との相互情報量の下界を $h_2(1/8)$ を用いて示せ。

<!-- solution-start -->
**詳細解答。** [Fano不等式とブロックHolevo逆評価](#lem-qinf23-fano)に $M=16$、$\varepsilon=1/8$ を代入すると

$$
I(U;\widehat U)\ge\left(1-\frac18\right)\log_2 16-h_2(1/8)
=\frac72-h_2(1/8).
$$

二値エントロピーを定義から計算すれば

$$
h_2(1/8)=-\frac18\log_2\frac18-\frac78\log_2\frac78
=3-\frac78\log_2 7.
$$

従って $I(U;\widehat U)\ge\frac12+\frac78\log_2 7$ ビットです。これは $I\ge0$ より強い下界です。
<!-- solution-end -->

<a id="ex-qinf23-a04"></a>

### 演習 A4：非直交純粋状態の固有値

- Level: A
- 問題: $|\psi\rangle=c|0\rangle+\sqrt{1-c^2}|1\rangle$（$0\le c\le1$）とし、$\bar\rho=(|0\rangle\langle0|+|\psi\rangle\langle\psi|)/2$ の固有値を求めよ。

<!-- solution-start -->
**詳細解答。** $s=\sqrt{1-c^2}$ と置き、計算基底で外積の成分 $\langle i|\psi\rangle\langle\psi|j\rangle$ を並べると

$$
\bar\rho=\frac12\begin{pmatrix}1+c^2&cs\\cs&1-c^2\end{pmatrix}.
$$

規格化された二純粋状態の平均なので正値・トレース1です。固有値の積は行列式であり、

$$
\det\bar\rho=\frac{(1+c^2)(1-c^2)-c^2(1-c^2)}4
=\frac{1-c^2}{4}.
$$

従って特性方程式とその解は

$$
\lambda^2-\lambda+\frac{1-c^2}4=0,
\qquad \lambda_\pm=\frac{1\pm c}{2}.
$$

[von Neumannエントロピーの定義](../QINF17/index.md#def-qinf17-entropy)より $S(\bar\rho)=h_2((1+c)/2)$ です。端点 $c=0,1$ でも固有値は非負で和が1です。
<!-- solution-end -->

<a id="ex-qinf23-b01"></a>

### 演習 B1：可換二元対称cq通信路

- Level: B
- 問題: $\rho_0=\operatorname{diag}(3/4,1/4)$、$\rho_1=\operatorname{diag}(1/4,3/4)$ の容量を計算し、符号語を一度も復号せず各回測定する古典通信路との対応を述べよ。

<!-- solution-start -->
**詳細解答。** $p=\Pr\{X=0\}$ とします。両出力のエントロピーは[対角状態の計算法](../QINF17/index.md#prop-qinf17-classical)より $h_2(1/4)$ です。平均出力は

$$
\bar\rho_p=p\rho_0+(1-p)\rho_1
=\operatorname{diag}\left(\frac14+\frac p2,\frac34-\frac p2\right).
$$

従って $S(\bar\rho_p)=h_2(1/4+p/2)\le1$ であり、$p=1/2$ のとき等号です。[HSW定理](#thm-qinf23-hsw)により

$$
C_{\mathrm{cq}}=1-h_2(1/4)
=1-\left(2-\frac34\log_2 3\right)
=\frac34\log_2 3-1.
$$

計算基底測定では $q(1|0)=q(0|1)=1/4$、$q(0|0)=q(1|1)=3/4$ となります。これは入力ビットが確率 $1/4$ で反転する古典二元対称通信路です。[可換アンサンブルのHolevo界達成](../QINF21/index.md#prop-qinf21-commuting)により各回測定で情報量を失わず、同じ容量になります。
<!-- solution-end -->

<a id="ex-qinf23-b02"></a>

### 演習 B2：ランダム符号の誤差指数

- Level: B
- 問題: ある入力分布で $\chi=0.6$、典型射影補題の $2\delta=0.1$ とし、$R=0.4$ の符号を選ぶ。HSW証明の偽候補への重なり項がどの指数で減るか示せ。また $R=0.55$ では同じ $\delta$ の証明で何が不足するか。

<!-- solution-start -->
**詳細解答。** [HSW証明の誤り評価](#thm-qinf23-hsw)の偽候補項に $M\le2^{nR}$ を使うと

$$
4(M-1)2^{-n(\chi-2\delta)}
\le4\cdot 2^{-n(\chi-2\delta-R)}.
$$

$R=0.4$ では指数の差が $0.6-0.1-0.4=0.1>0$ なので、上界は $4\cdot2^{-0.1n}\to0$ です。$R=0.55$ では同じ幅だと

$$
\chi-2\delta-R=0.6-0.1-0.55=-0.05,
\qquad 4\cdot2^{-n(\chi-2\delta-R)}=4\cdot2^{0.05n}
$$

となり、誤差が消えることを示せません。ただし容量超過を意味するのではありません。$2\delta<0.05$ となるよう典型幅を狭めてから十分大きい $n$ を取れば、同じ論法が使えます。
<!-- solution-end -->

<a id="ex-qinf23-b03"></a>

### 演習 B3：正則化の上下界

- Level: B
- 問題: 任意の有限次元チャネルについて $a_k=\chi^*(\mathcal N^{\otimes k})$ が $a_{k+\ell}\ge a_k+a_\ell$ を満たす理由を証明し、$\chi^*(\mathcal N)\le C(\mathcal N)\le\log_2\dim B$ を示せ。

<!-- solution-start -->
**詳細解答。** $k$ 使用と $\ell$ 使用の入力アンサンブルをそれぞれ独立に選び、その入力状態のテンソル積を使います。前者の確率・出力を $p_x,\sigma_x$、後者を $q_y,\tau_y$、それぞれのHolevo量を $\chi_k,\chi_\ell$、平均出力を $\bar\sigma_k,\bar\sigma_\ell$ と書きます。直積アンサンブルでは確率が $p_xq_y$、出力が $\sigma_x\otimes\tau_y$ なので、[エントロピーの加法性](../QINF17/index.md#prop-qinf17-tensor)から

$$
\begin{aligned}
\chi_{k+\ell}^{\mathrm{product}}
&=S(\bar\sigma_k\otimes\bar\sigma_\ell)
-\sum_{x,y}p_xq_yS(\sigma_x\otimes\tau_y)\\
&=S(\bar\sigma_k)+S(\bar\sigma_\ell)
-\sum_xp_xS(\sigma_x)-\sum_yq_yS(\tau_y)\\
&=\chi_k+\chi_\ell.
\end{aligned}
$$

入力アンサンブルを最適化すれば $a_{k+\ell}\ge a_k+a_\ell$ です。これを $a_k\ge ka_1$ と繰り返し、[正則化容量定理](#thm-qinf23-regularized)に代入すると

$$
C(\mathcal N)=\sup_{k\ge1}\frac{a_k}{k}\ge a_1=\chi^*(\mathcal N).
$$

一方、$k$ ブロックの最適アンサンブルの平均出力を改めて $\bar\sigma_k$ とすれば、その次元は $(\dim B)^k$ なので[エントロピー上界](../QINF17/index.md#thm-qinf17-entropy-bounds)から

$$
a_k\le S(\bar\sigma_k)\le\log_2(\dim B)^k=k\log_2\dim B,
\quad C(\mathcal N)\le\log_2\dim B.
$$
<!-- solution-end -->

<a id="ex-qinf23-c01"></a>

### 演習 C1：非直交二純粋出力の容量とブロック符号

- Level: C
- 問題: $\rho_0=|0\rangle\langle0|$、$\rho_1=|\psi\rangle\langle\psi|$、$|\langle0|\psi\rangle|=1/2$ とする。(i) 入力確率 $p$ に対する平均出力の固有値を求めよ。(ii) 最適 $p$ と容量を求めよ。(iii) 一回の測定での完全識別が不可能な理由と、$0<R<C$ で誤りの消えるブロック符号が存在する理由を、それぞれ異なる論証で説明せよ。

<!-- solution-start -->
**詳細解答。** (i) $|\langle0|\psi\rangle|=1/2$ なので全体位相と $|1\rangle$ の位相を選び、$|\psi\rangle=(|0\rangle+\sqrt3|1\rangle)/2$ と書けます。$p=\Pr\{X=0\}$ と置けば、計算基底の外積表示は

$$
\bar\rho_p=p|0\rangle\langle0|+(1-p)|\psi\rangle\langle\psi|
=\begin{pmatrix}p+(1-p)/4&\sqrt3(1-p)/4\\
\sqrt3(1-p)/4&3(1-p)/4\end{pmatrix}.
$$

これは二密度演算子の混合なので正値・トレース1です。対角成分の和は1、行列式と固有値は

$$
\begin{aligned}
\det\bar\rho_p&=\frac{3(1-p)}4\left(p+\frac{1-p}4\right)
-\frac{3(1-p)^2}{16}=\frac{3p(1-p)}4,\\
\lambda^2-\lambda+\frac{3p(1-p)}4&=0,\qquad
\lambda_\pm(p)=\frac{1\pm\sqrt{1-3p(1-p)}}2.
\end{aligned}
$$

(ii) 両出力が純粋なので $\chi(p)=h_2(\lambda_+(p))$ です。$p(1-p)\le1/4$ で等号は $p=1/2$、このとき固有値は $\lambda_+=3/4$、$\lambda_-=1/4$。$h_2$ は $[1/2,1]$ で減少するため[HSW容量式](#thm-qinf23-hsw)を最大化すると

$$
C_{\mathrm{cq}}=h_2(3/4)=2-\frac34\log_2 3\quad\text{ビット/使用}.
$$

(iii) 完全識別POVM $E_0,E_1$ があると仮定します。誤り0なら $\langle0|E_1|0\rangle=0$、$\langle\psi|E_0|\psi\rangle=0$ です。正作用素では $\langle v|E|v\rangle=\|E^{1/2}v\|^2=0$ から $Ev=0$ となるため、$E_1|0\rangle=0$ と $E_0|\psi\rangle=0$ を得ます。従って

$$
\langle0|\psi\rangle
=\langle0|(E_0+E_1)|\psi\rangle=0+0=0
$$

となり、重なり $1/2$ に反します。一方、[HSW定理](#thm-qinf23-hsw)のランダム符号では、任意の $0<R<C_{\mathrm{cq}}$ に対して $2\delta<C_{\mathrm{cq}}-R$ を選ぶと

$$
\mathbb EP_e^{(n)}\le2\eta_n+4\sqrt{\eta_n}
+4\cdot2^{-n(C_{\mathrm{cq}}-2\delta-R)}\longrightarrow0.
$$

全出力への合同POVMを使うブロック識別は、各回の完全識別を要求しないため矛盾しません。
<!-- solution-end -->

## 9. まとめと次への接続

- cq通信路の古典容量は入力分布で最大化したHolevo量です。逆向きはFano＋Holevo、達成向きは典型射影＋集合測定で証明しました。
- 一回の測定で非直交状態を完全識別できないことと、長い符号語で正の通信率を達成できることは両立します。
- 一般量子チャネルの古典容量では入力間のエンタングルメントを許すため、$\chi^*(\mathcal N^{\otimes k})/k$ の正則化を残します。次のQINF24は**量子情報そのもの**の伝送を扱います。

### 前提講座

- [QINF5 一般化量子測定](../QINF5/index.md)
- [QINF7 量子チャネルとKraus表示](../QINF7/index.md)
- [QINF17 von Neumannエントロピー](../QINF17/index.md)
- [QINF18 条件付きエントロピーと相互情報量](../QINF18/index.md)
- [QINF20 量子相対エントロピーとデータ処理](../QINF20/index.md)
- [QINF21 Holevo情報と測定の限界](../QINF21/index.md)
- [QINF22 量子典型部分空間とSchumacher圧縮](../QINF22/index.md)
- [INFO3 漸近等分割性と典型集合](../../INFO/INFO3/index.md)
