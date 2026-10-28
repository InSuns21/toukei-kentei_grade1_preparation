# QINF23 量子通信路での古典通信

## 1. 一回の測定の限界から、長い符号語の通信へ

[Holevo界](../QINF21/index.md#thm-qinf21-holevo-bound)は、与えられた量子アンサンブルを一度測って取り出せる古典情報を制限しました。しかし、送信者が長い符号語を選び、受信者が全出力を**まとめて**測定すると、単一出力の最適測定を繰り返すよりよい通信が可能です。ここでは送信者の目的を「未知の量子状態を保存すること」ではなく、**あらかじめ決めた古典メッセージ番号を正しく復号すること**とします。[QINF22の典型射影](../QINF22/index.md#lem-qinf22-typical-bounds)を符号語の識別へ再利用します。

すべて有限次元、対数の底は2です。断りなく「容量」と書くときは、独立に同じ通信路を使い、平均復号誤りが0へ向かうときの1使用あたりのビット数を指します。送受信者に事前共有エンタングルメントはありません。

## 2. cq符号・平均誤り・通信率

量子チャネルの入力に古典ラベルだけを許す場合、ラベル $x$ に対応する出力状態 $\rho_x$ が決まります。これを *cq通信路*（classical-to-quantum channel）と呼びます。ラベルを $n$ 個並べれば、記憶のない通信路の出力はテンソル積になります。

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

**定義の確認。** $\rho_0=|0\rangle\langle0|$、$\rho_1=|1\rangle\langle1|$ とし、$n=2$、$M=4$ で $00,01,10,11$ を使います。$\Lambda_m=|x^2(m)\rangle\langle x^2(m)|$ は互いに直交し和は $I_4$、各成功確率は1です。したがって $P_e^{(2)}=0$、$R_2=\log_2 4/2=1$。一方、$\rho_0=\rho_1=I/2$ ならどんなPOVMでも $\sum_m\operatorname{Tr}(\rho^{\otimes n}\Lambda_m)=1$ なので成功確率は $1/M$ です。単なる符号語の個数ではなく、**出力が区別できること**が必要です。

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

まず誤りが起きたかの1ビットと、誤り時の残り $M-1$ 通りを使って $H(U|\widehat U)$ を抑えます。次にPOVMは量子系から古典結果へのチャネルなので[Holevo界](../QINF21/index.md#thm-qinf21-holevo-bound)を適用します。

<!-- proof-start -->
### 証明

$E=1_{\{U\ne\widehat U\}}$ は $(U,\widehat U)$ から決まるので、連鎖律から

$$
H(U|\widehat U)=H(E|\widehat U)+H(U|E,\widehat U).
$$

$H(E|\widehat U)\le H(E)=h_2(\varepsilon)$。$E=0$ なら $U=\widehat U$ で残りの不確かさは0、$E=1$ なら $U$ は高々 $M-1$ 個なので

$$
H(U|E,\widehat U)\le\varepsilon\log_2(M-1)\le\varepsilon\log_2M.
$$

$H(U)=\log_2M$ と $I(U;\widehat U)=H(U)-H(U|\widehat U)$ を代入します。さらに $U$ と $\sigma_U$ のアンサンブルにHolevo界を適用すれば後半の不等式です。$M=1$ は自明です。
<!-- proof-end -->

**cq通信路の逆定理。** 任意の長さ $n$ のcq符号について、メッセージを一様に選んだ確率変数を $U$、その各時刻の入力を $X_i=x_i(U)$、出力を $B^n$ とします。[量子相互情報量のデータ処理](../QINF20/index.md#cor-qinf20-mutual-dpi)とエントロピーの部分加法性から

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

固定した入力分布 $p$ と平均出力 $\bar\rho=\sum_xp_x\rho_x$ を選びます。平均出力に対する[量子典型射影](../QINF22/index.md#def-qinf22-typical)を $P$ とし、各符号語 $x^n$ に対して、出力 $\rho_{x^n}$ の積スペクトルをその符号語ごとに典型化した射影 $P_{x^n}$ を作ります。後者は $x_i$ ごとに異なる固有値分布の列を扱うので、出現回数の少ない文字の部分は全空間として扱ってよいです。

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

各 $\rho_x$ の正の固有値の対数の期待値は $S(\rho_x)$ です。$x$ が現れた $N_x$ 箇所に限り、その固有値列の自己情報量が $N_xS(\rho_x)$ から高々 $N_x\delta/4$ ずれる部分を選びます。$N_x\to\infty$ なら大数の法則で対応する射影の成功確率は1へ向かいます。$p_x=0$ の文字は発生せず、$p_x>0$ の文字について $N_x/n\to p_x$ です。典型入力の集合を、すべての $|N_x/n-p_x|$ が十分小さい文字列に限定します。有限個の文字について一斉にこの条件を満たす確率は1へ向かいます。

各文字の固有値典型列の数は $2^{N_x(S(\rho_x)+\delta/4)}$ 以下なので、全体のrankはそれらの積以下です。有限個の $S(\rho_x)$ は有界なので、頻度の誤差を十分小さく取れば

$$
\log_2\operatorname{rank}P_{x^n}\le\sum_xN_x(S(\rho_x)+\delta/4)
\le n\left(\sum_xp_xS(\rho_x)+\delta\right).
$$

この射影は $\rho_{x^n}$ と可換で、条件付きスペクトルの確率を1へ近づけます。平均については典型でない文字列の確率が消えるので第3式です。

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

符号語に対応する半正定値作用素 $D_m=PP_{x^n(m)}P$ を作り、$D=\sum_mD_m$ とします。$D$ の台上で逆平方根を取り、$\Lambda_m=D^{-1/2}D_mD^{-1/2}$ とします。これは **平方根測定**（pretty-good measurement）です。$\sum_m\Lambda_m$ は $D$ の台への射影であり、残余は任意の復号結果へ割り当てられます。逆行列を全空間に要求しないことが重要です。

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

この作用素不等式自体の核心は次の補助評価です。$V=(S+T)^{-1/2}S^{1/2}$、$VV^\dagger=\Lambda$ と置くと、$\|V\|\le1$ であり、任意のベクトル $v$ についてCauchy–Schwarzと $2ab\le a^2+b^2$ を適用して

$$
\langle v,(I-VV^\dagger)v\rangle
\le2\langle v,(I-S)v\rangle+4\langle v,Tv\rangle
$$

を得ます。これはベクトル $v$ を $S^{1/2}v$ と $(I-S)^{1/2}v$ に分解し、$S+T$ による正規化のずれを $T$ の二次形式で抑える評価です。すべての $v$ に成り立つので作用素不等式です。
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

が成り立ちます。実際、状態の精製 $|\psi\rangle$ を取ると $\|(I-P)|\psi\rangle\|^2=\operatorname{Tr}[\rho(I-P)]$、$\|P_{x^n}\|\le1$ なので、$\langle\psi|A|\psi\rangle-\langle\psi|PAP|\psi\rangle$ を左右の片方に $(I-P)$ を持つ二項に分け、Cauchy–Schwarzで抑えられます。平方根の凹性により平均では上界 $2\sqrt{\eta_n}$ です。したがって

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

**二元対称な可換出力。** $0\le q\le1/2$ として

$$
\rho_0=\operatorname{diag}(1-q,q),\qquad
\rho_1=\operatorname{diag}(q,1-q)
$$

を考えます。入力確率 $p$ の平均状態は $\operatorname{diag}(q+p(1-2q),1-q-p(1-2q))$ です。各出力のエントロピーは $h_2(q)$、平均出力のエントロピーは高々1で、$p=1/2$ で1です。したがって $C_{\mathrm{cq}}=1-h_2(q)$。すべての出力が同じ基底で対角なので、その基底を各回測定するだけで古典二元対称通信路に戻ります。$q=0$ では1ビット、$q=1/2$ では0ビットです。

**非直交な純粋出力。** $\rho_0=|0\rangle\langle0|$、$\rho_1=|\psi\rangle\langle\psi|$ とし、$|\psi\rangle=c|0\rangle+\sqrt{1-c^2}|1\rangle$、$0<c<1$ とします。等確率混合の固有値は $(1\pm c)/2$（行列式 $(1-c^2)/4$、トレース1）、個々のエントロピーは0です。一般の入力確率 $p$ では行列式が $p(1-p)(1-c^2)$ となり、$p(1-p)$ が最大の $p=1/2$ で平均状態のエントロピーが最大です。よって

$$
C_{\mathrm{cq}}=h_2\!\left(\frac{1+c}{2}\right).
$$

単一回の測定では非直交二状態を誤り0で識別できません。それでも長いブロックではこの正の率で平均誤りを0へ近づけられます。ただし $c=1$ なら二状態は同じで容量0、$c=0$ なら直交して容量1です。

## 7. 一般量子チャネルではなぜ正則化が必要か

一般の $\mathcal N:A\to B$ に対し、1回の使用で入力アンサンブルを最適化したHolevo量を

$$
\chi^*(\mathcal N)=\max_{\{p_x,\omega_x\}}
\left[S\!\left(\sum_xp_x\mathcal N(\omega_x)\right)
-\sum_xp_xS(\mathcal N(\omega_x))\right]
$$

と書きます。有限次元なので有限個の入力状態によるアンサンブルを考えれば足ります。この値は**積入力符号**の容量ですが、入力 $A^{\otimes n}$ にエンタングル状態を許す一般符号の容量とは直ちに同じではありません。

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

$a_k=\chi^*(\mathcal N^{\otimes k})$ と置きます。$k$ 個と $\ell$ 個の最適入力アンサンブルの直積を考えると、出力平均状態も各出力状態も積状態です。エントロピー加法性からそのHolevo量は $a_k+a_\ell$ なので、$a_{k+\ell}\ge a_k+a_\ell$ です。また $0\le a_k\le k\log_2\dim B$。超加法列のFeketeの補題は、$n=qk+r$ と分け $a_n\ge qa_k+a_r\ge qa_k$ とすれば、固定 $k$ について $\liminf_n a_n/n\ge a_k/k$、一方各 $a_n/n\le\sup_k a_k/k$ だから導けます。ゆえに極限と上限が等しいです。

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
**詳細解答。** $\operatorname{Tr}(\rho_0\Lambda_1)=1-t$、$\operatorname{Tr}(\rho_1\Lambda_2)=1-t$。よって $P_e=1-[(1-t)+(1-t)]/2=t$、$R=\log_2 2=1$ ビット/使用。POVMの両要素は非負で和が $I$ であることも $0\le t\le1$ から確認できる。
<!-- solution-end -->

<a id="ex-qinf23-a02"></a>

### 演習 A2：同じ出力しか出ない通信路

- Level: A
- 問題: すべての $x$ に $\rho_x=\tau$ が成り立つcq通信路について任意の $n,M$ の成功確率と容量を求めよ。

<!-- solution-start -->
**詳細解答。** 各符号語の出力は $\tau^{\otimes n}$ で共通だから、成功確率は $M^{-1}\sum_m\operatorname{Tr}(\tau^{\otimes n}\Lambda_m)=M^{-1}\operatorname{Tr}(\tau^{\otimes n}I)=1/M$。誤りが0へ向かうには $M=1$ が最終的に必要なので正の率は不可能。さらに $\chi=S(\tau)-\sum_xp_xS(\tau)=0$ でありHSW式とも一致する。
<!-- solution-end -->

<a id="ex-qinf23-a03"></a>

### 演習 A3：Fanoの数値評価

- Level: A
- 問題: $M=16$、平均誤り $\varepsilon=1/8$ の符号について、復号結果との相互情報量の下界を $h_2(1/8)$ を用いて示せ。

<!-- solution-start -->
**詳細解答。** [Fano不等式とブロックHolevo逆評価](#lem-qinf23-fano)から $I(U;\widehat U)\ge(1-1/8)\log_2 16-h_2(1/8)=7/2-h_2(1/8)$ ビット。$h_2(1/8)=3-(7/8)\log_2 7$ なので、下界は $1/2+(7/8)\log_2 7$ ビット。$I\ge0$ という自明な評価より強い。
<!-- solution-end -->

<a id="ex-qinf23-a04"></a>

### 演習 A4：非直交純粋状態の固有値

- Level: A
- 問題: $|\psi\rangle=c|0\rangle+\sqrt{1-c^2}|1\rangle$（$0\le c\le1$）とし、$\bar\rho=(|0\rangle\langle0|+|\psi\rangle\langle\psi|)/2$ の固有値を求めよ。

<!-- solution-start -->
**詳細解答。** 基底 $|0\rangle,|1\rangle$ で $\bar\rho$ の対角成分は $(1+c^2)/2,(1-c^2)/2$、非対角成分は $c\sqrt{1-c^2}/2$。トレースは1、行列式は $[(1-c^4)-c^2(1-c^2)]/4=(1-c^2)/4$。特性方程式 $\lambda^2-\lambda+(1-c^2)/4=0$ の解は $(1\pm c)/2$。したがってエントロピーは $h_2((1+c)/2)$。
<!-- solution-end -->

<a id="ex-qinf23-b01"></a>

### 演習 B1：可換二元対称cq通信路

- Level: B
- 問題: $\rho_0=\operatorname{diag}(3/4,1/4)$、$\rho_1=\operatorname{diag}(1/4,3/4)$ の容量を計算し、符号語を一度も復号せず各回測定する古典通信路との対応を述べよ。

<!-- solution-start -->
**詳細解答。** 両出力のエントロピーは $h_2(1/4)$。入力確率 $p$ の平均出力の第1対角成分は $p(3/4)+(1-p)(1/4)=1/4+p/2$ であり、$h_2(1/4+p/2)\le1$。$p=1/2$ で等号なので $C=1-h_2(1/4)=1-[2-(3/4)\log_2 3]=(3/4)\log_2 3-1$。計算基底測定後は、入力ビットが確率 $1/4$ で反転する古典二元対称通信路になる。出力が可換なので一回ごとのこの測定でHolevo量を失わず、古典符号化定理に戻る。
<!-- solution-end -->

<a id="ex-qinf23-b02"></a>

### 演習 B2：ランダム符号の誤差指数

- Level: B
- 問題: ある入力分布で $\chi=0.6$、典型射影補題の $2\delta=0.1$ とし、$R=0.4$ の符号を選ぶ。HSW証明の偽候補への重なり項がどの指数で減るか示せ。また $R=0.55$ では同じ $\delta$ の証明で何が不足するか。

<!-- solution-start -->
**詳細解答。** $M\le2^{0.4n}$ より偽候補項は $4(M-1)2^{-n(0.6-0.1)}\le4\cdot2^{-0.1n}$ で消える。$R=0.55$ では上界が $4\cdot2^{0.05n}$ となり、誤差が消えることを示さない。ただし容量超過を意味するのではない。$2\delta<0.6-0.55=0.05$ となるよう典型幅を狭めてから十分大きい $n$ を取れば同じ論法が使える。
<!-- solution-end -->

<a id="ex-qinf23-b03"></a>

### 演習 B3：正則化の上下界

- Level: B
- 問題: 任意の有限次元チャネルについて $a_k=\chi^*(\mathcal N^{\otimes k})$ が $a_{k+\ell}\ge a_k+a_\ell$ を満たす理由を証明し、$\chi^*(\mathcal N)\le C(\mathcal N)\le\log_2\dim B$ を示せ。

<!-- solution-start -->
**詳細解答。** $k$ 使用と $\ell$ 使用のアンサンブルをそれぞれ独立に選び、入力状態のテンソル積を使う。その出力の平均は $\bar\sigma_k\otimes\bar\sigma_\ell$、各出力も積状態なのでエントロピーの加法性からHolevo量は $\chi_k+\chi_\ell$。最適化すると $a_{k+\ell}\ge a_k+a_\ell$。特に $a_k\ge ka_1$、したがって $C=\sup_k a_k/k\ge a_1$。また出力平均のエントロピーは高々 $\log_2(\dim B)^k=k\log_2\dim B$、各出力のエントロピーは非負だから $a_k\le k\log_2\dim B$。上限を取れば結論。
<!-- solution-end -->

<a id="ex-qinf23-c01"></a>

### 演習 C1：非直交二純粋出力の容量とブロック符号

- Level: C
- 問題: $\rho_0=|0\rangle\langle0|$、$\rho_1=|\psi\rangle\langle\psi|$、$|\langle0|\psi\rangle|=1/2$ とする。(i) 入力確率 $p$ に対する平均出力の固有値を求めよ。(ii) 最適 $p$ と容量を求めよ。(iii) 一回の測定での完全識別が不可能な理由と、$0<R<C$ で誤りの消えるブロック符号が存在する理由を、それぞれ異なる論証で説明せよ。

<!-- solution-start -->
**詳細解答。** 位相を調整して $|\psi\rangle=(1/2)|0\rangle+(\sqrt3/2)|1\rangle$ と置ける。$\bar\rho_p=p|0\rangle\langle0|+(1-p)|\psi\rangle\langle\psi|$ はトレース1で、行列式は $p(1-p)(1-|\langle0|\psi\rangle|^2)=3p(1-p)/4$。特性方程式 $\lambda^2-\lambda+3p(1-p)/4=0$ より $\lambda_\pm=[1\pm\sqrt{1-3p(1-p)}]/2$。両出力が純粋なので $\chi(p)=h_2(\lambda_+)$。$p(1-p)\le1/4$ で等号は $p=1/2$、このとき $\lambda_+=3/4$、$\lambda_-=1/4$ となる。二値エントロピーは $[1/2,1]$ で減少するから $C=h_2(3/4)=2-(3/4)\log_2 3$ ビット/使用。

完全識別POVM $E_0,E_1$ があれば $\langle0|E_1|0\rangle=0$、$\langle\psi|E_0|\psi\rangle=0$。正作用素では期待値0はそのベクトルが核にあることを意味する。$E_0+E_1=I$ と合わせると $\langle0|\psi\rangle=\langle0|(E_0+E_1)|\psi\rangle=0$ となり、与えられた重なり $1/2$ に反する。他方、HSW定理のランダム符号では任意の $R<h_2(3/4)$ に対し $2\delta<h_2(3/4)-R$ を選び、平均誤りを $2\eta_n+4\sqrt{\eta_n}+4\cdot2^{-n(C-2\delta-R)}\to0$ と抑える。これは各回の完全識別を要求せず、全出力の合同POVMを使うから矛盾しない。
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
