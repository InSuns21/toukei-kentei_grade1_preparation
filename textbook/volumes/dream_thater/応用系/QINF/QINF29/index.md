# QINF29 情報漏洩・デカップリング

## 1. 受信者だけでなく、送信前の参照系を見る

[QINF28の消失訂正と秘密保持](../QINF28/index.md#thm-qinf28-erasure-privacy)では、失った部分系が論理入力に依存しないことと、残った側から完全回復できることを示しました。しかし一般の雑音は、特定の部分を捨てるだけではありません。環境が出力と相互作用する途中で、未知の量子状態の**位相や重ね合わせ**まで記録するかもしれません。

「入力の計算基底 $|0\rangle,|1\rangle$ を正しく送り届けた」だけでは、任意の量子状態を送れたことになりません。送信者が外部に保持する参照系 $R$ と入力 $L$ がもつれている場合を試すと、量子情報が保たれたかを一度に判定できます。ここでの参照系は環境でも受信者の補助系でもなく、チャネルの外に置いた比較対象です。

以下、すべて有限次元の複素Hilbert空間です。$L$ は論理入力、$A$ は物理入力、$B$ は受信出力、$E$ は環境、$R$ は入力を記録する参照系です。等長符号化 $V:L\to A$、CPTP雑音 $\mathcal N:L(A)\to L(B)$ を固定します。$L(H)$ は $H$ 上の線形作用素全体です。[Stinespring表示](../QINF8/index.md#thm-qinf8-stinespring)の等長写像 $U:A\to B\otimes E$ に対し、合成 $W=UV:L\to B\otimes E$ も等長です。

## 2. 最大エンタングル参照系で、全入力を一度に検査する

[精製](../QINF4/index.md#def-qinf4-purification)により、論理系だけを見る代わりに、入力と同じ次元 $d=\dim L\ge1$ の参照系 $R$ を保ちます。両者の固定した正規直交基底を $|j\rangle_R,|j\rangle_L$（$0\le j<d$）とし、$R\otimes L$ に最大エンタングル状態を作ります。これを符号化・雑音の等長写像へ通した $RBE$ の純粋状態が本講の主役です。

<a id="def-qinf29-reference"></a>

<!-- formal-statement-start -->
> **定義（参照系付きチャネル状態）**
> 有限次元 $L,A,B,E,R$、$d=\dim L=\dim R\ge1$、等長写像 $V:L\to A$、$U:A\to B\otimes E$ を固定し、$W=UV$ とする。参照系 $R$ と論理入力 $L$ にまたがる最大エンタングル入力と、その出力を

$$
|\Phi_d\rangle_{RL}=\frac1{\sqrt d}\sum_{j=0}^{d-1}|j\rangle_R|j\rangle_L,
\qquad |\Omega\rangle_{RBE}=(I_R\otimes W)|\Phi_d\rangle
$$

> とする。$\Omega_{RE}=\operatorname{Tr}_B|\Omega\rangle\langle\Omega|$、$\Omega_R=\operatorname{Tr}_{BE}|\Omega\rangle\langle\Omega|$、$\Omega_E=\operatorname{Tr}_{RB}|\Omega\rangle\langle\Omega|$ をその縮約状態とする。特に $\Omega_R=I_R/d$ である。
<!-- formal-statement-end -->

内積を直接計算すると $\langle\Phi_d|\Phi_d\rangle=d/d=1$、$W^\dagger W=I_L$ なので $\langle\Omega|\Omega\rangle=1$ です。いずれの縮約も[部分トレース](../QINF3/index.md#def-qinf3-partial-trace)によって正値・トレース1を保ちます。$R$ は一度も操作しないため $\Omega_R=\operatorname{Tr}_L|\Phi_d\rangle\langle\Phi_d|=I_R/d$ です。

<!-- definition-example-start: def-qinf29-reference -->
**定義の確認**：環境が固定された理想通信。$L=A=B=R=\mathbb C^2$、$E=\mathbb C^2$、$V=I$、$W|j\rangle=|j\rangle_B|0\rangle_E$ とします。$W^\dagger W=I_2$、したがって正しく正規化された純粋出力は

$$
|\Omega\rangle=\frac{|0\rangle_R|0\rangle_B+|1\rangle_R|1\rangle_B}{\sqrt2}\otimes|0\rangle_E.
$$

$B$ の直交基底で部分トレースすると $\Omega_{RE}=I_R/2\otimes|0\rangle\langle0|_E$、$\Omega_E=|0\rangle\langle0|$。環境状態は入力を変えても同じです。この「参照系と環境が積になる」という条件を形式化します。
<!-- definition-example-end -->

## 3. 参照系と環境が積なら、環境に論理情報はない

相関には、測定して見える古典的な一致だけでなく量子コヒーレンスに関するものもあります。そこで「互いを知らない」を、二つの縮約状態の**テンソル積そのもの**であることとして要求します。古典的なラベルの一致だけでは見えない相関も、これでまとめて判定できます。

<a id="def-qinf29-decoupling"></a>

<!-- formal-statement-start -->
> **定義（完全デカップリング）**
> [参照系付きチャネル状態](#def-qinf29-reference) $\Omega_{RE}$ が、参照系 $R$ と環境 $E$ の間で**完全デカップリング**しているとは、次が成り立つことをいう。

$$
\Omega_{RE}=\Omega_R\otimes\Omega_E=\frac{I_R}{d}\otimes\Omega_E.
$$

> これは、任意の $R,E$ の局所作用素 $X,Y$ について、相関期待値 $\operatorname{Tr}[(X\otimes Y)\Omega_{RE}]$ が、両縮約状態での期待値の積に等しいことと同値である。
<!-- formal-statement-end -->

最後の期待値条件は積状態ならトレースの積への分解で成立します。逆に有限次元では $R,E$ の行列単位 $|i\rangle\langle j|,|\mu\rangle\langle\nu|$ が全作用素の基底なので、全ての積作用素の期待値が一致すれば両状態の全行列成分が一致します。

<!-- definition-example-start: def-qinf29-decoupling -->
**定義の確認**。前節の理想通信では $\Omega_{RE}=I_R/2\otimes|0\rangle\langle0|$。右辺の因子はいずれも正値・トレース1で、実際に縮約した $\Omega_R$ と $\Omega_E$ に一致します。任意の $X,Y$ に対し

$$
\operatorname{Tr}[(X\otimes Y)\Omega_{RE}]
=\operatorname{Tr}(XI_R/2)\operatorname{Tr}(Y|0\rangle\langle0|)
$$

ですから期待値条件も検算できました。$E$ が1次元でも同じ結論ですが、ここでは環境を2次元とし、単に系が存在しないための積状態とは区別しています。
<!-- definition-example-end -->

環境に残る作用素を求めるには、[相補チャネル](../QINF8/index.md#def-qinf8-complement)を論理入力上へ制限して

$$
\mathcal M^c(X)=\operatorname{Tr}_B(WXW^\dagger)
\qquad (X\in L(L))
$$

とします。$\mathcal M=\mathcal N\circ(\rho\mapsto V\rho V^\dagger)$ は論理入力から受信出力へのCPTP写像です。$\mathcal M^c$ はその相補写像であり、$\mathcal N^c(VXV^\dagger)$ とも書けます。

<a id="lem-qinf29-blocks"></a>

<!-- formal-statement-start -->
> **補題（参照環境の成分条件）**
> [参照系付きチャネル状態](#def-qinf29-reference)を $R$ の基底で展開すると

$$
\Omega_{RE}=\frac1d\sum_{j,k=0}^{d-1}|j\rangle\langle k|_R
\otimes\mathcal M^c(|j\rangle\langle k|).
$$

> したがって[完全デカップリング](#def-qinf29-decoupling)と、ある $E$ 上の密度演算子 $\sigma_E$ について全 $j,k$ で（$\delta_{jk}$ は $j=k$ のとき1、それ以外では0）

$$
\mathcal M^c(|j\rangle\langle k|)=\delta_{jk}\sigma_E
$$

> が成立することは同値である。このとき任意の論理密度演算子 $\rho$ に対し $\mathcal M^c(\rho)=\sigma_E$ であり、逆も成り立つ。
<!-- formal-statement-end -->

### 証明の見取り図

$|\Phi_d\rangle\langle\Phi_d|$ の $j,k$ の交差項を残したまま $B$ を捨てます。積状態の $R$ 側は対角成分のみを持つので、**対角成分が同じだけでなく非対角成分がすべて0**でなければなりません。全ての入力で一定という主張の逆向きには位相の異なる二種類の重ね合わせを用います。

<!-- proof-start -->
### 証明

$|\Phi_d\rangle\langle\Phi_d|=d^{-1}\sum_{j,k}|j\rangle\langle k|_R\otimes|j\rangle\langle k|_L$ です。$I_R\otimes W$ で挟み $B$ をトレースすると補題の第1式です。一方

$$
\frac{I_R}{d}\otimes\sigma_E
=\frac1d\sum_j|j\rangle\langle j|_R\otimes\sigma_E.
$$

$R$ の $(j,k)$ 行列要素を比較すれば第2式が必要十分です。第2式なら $\Omega_E=\sigma_E$（$R$ をトレース）で、任意の $\rho=\sum_{j,k}\rho_{jk}|j\rangle\langle k|$ に対し

$$
\mathcal M^c(\rho)=\sum_{j,k}\rho_{jk}\delta_{jk}\sigma_E
=\operatorname{Tr}(\rho)\sigma_E=\sigma_E.
$$

逆に全密度演算子で一定とします。$|j\rangle\langle j|$ を入力すると各対角ブロックは $\sigma_E$。$j\ne k$ に対し $T=\mathcal M^c(|j\rangle\langle k|)$ と置き、$|+\rangle=(|j\rangle+|k\rangle)/\sqrt2$ と $|+i\rangle=(|j\rangle+i|k\rangle)/\sqrt2$ を入力します。$P_j=|j\rangle\langle j|$、$P_k=|k\rangle\langle k|$ と書けば、二つの入力密度演算子は

$$
\begin{aligned}
|+\rangle\langle+|&=\tfrac12(P_j+P_k+|j\rangle\langle k|+|k\rangle\langle j|),\\
|+i\rangle\langle+i|&=\tfrac12(P_j+P_k-i|j\rangle\langle k|+i|k\rangle\langle j|).
\end{aligned}
$$

$\mathcal M^c$ は線形で随伴を保ち、対角二項をそれぞれ $\sigma_E$ に写します。双方の出力が $\sigma_E$ であることから

$$
T+T^\dagger=0,\qquad -iT+iT^\dagger=0.
$$

第1式で $T^\dagger=-T$、第2式で $T^\dagger=T$ を得て $T=0$。$d=1$ なら非対角条件が空で、対角の一条件だけで成立します。
<!-- proof-end -->

ここまでで環境の全入力への応答が固定であることを示しました。しかし、**受信者に回復が本当に存在するか**は別に構成する必要があります。

## 4. 環境デカップリングと完全復号は同値

完全復号とは、受信側 $B$ だけに作用する単一のCPTP写像 $\mathcal D:L(B)\to L(L)$ があり、未知の全ての論理密度演算子 $\rho$ に対して $\mathcal D\mathcal M(\rho)=\rho$ となることです。成功確率が入力に依存する事後選別や、基底ラベルの読み取りだけではありません。

<a id="thm-qinf29-recovery"></a>

<!-- formal-statement-start -->
> **定理（完全復号と環境デカップリングの同値）**
> 有限次元 $L,A,B,E$、等長符号化 $V:L\to A$、CPTP写像 $\mathcal N:L(A)\to L(B)$、Stinespring等長写像 $U:A\to B\otimes E$ を固定する。合成写像を次のように置き、$d=\dim L\ge1$ の[参照系付きチャネル状態](#def-qinf29-reference)を作る。

$$
W=UV,\qquad\mathcal M(\rho)=\mathcal N(V\rho V^\dagger).
$$

> このとき次の三条件は同値である。
>
> **（1）完全復号：** 受信系だけのCPTP写像 $\mathcal D:L(B)\to L(L)$ が存在し、全論理密度演算子 $\rho$ で $\mathcal D\mathcal M(\rho)=\rho$。
>
> **（2）完全デカップリング：** $\Omega_{RE}=I_R/d\otimes\Omega_E$。
>
> **（3）環境の一定性：** ある密度演算子 $\sigma_E$ について、全論理密度演算子 $\rho$ で $\mathcal M^c(\rho)=\sigma_E$。
>
> さらに（1）が成り立つとき、任意の有限次元参照系 $R'$ と任意の入力状態 $\tau_{R'L}$ に対し $(\mathrm{id}_{R'}\otimes\mathcal D\mathcal M)(\tau_{R'L})=\tau_{R'L}$ である。
<!-- formal-statement-end -->

### 証明の見取り図

[参照環境の成分条件](#lem-qinf29-blocks)で（2）と（3）は既に同値です。残りは一般のCPTP雑音についての[Knill–Laflamme条件](../QINF26/index.md#thm-qinf26-kl)と同じ機構ですが、ここでは入出力空間が異なる場合も扱い、復号写像を最後まで構成します。Kraus枝の重なりが論理状態に依存しなければ、枝ごとの直交部分空間を見分けて戻せます。

<!-- proof-start -->
### 証明

**（1）から（3）。** 環境の正規直交基底 $|\mu\rangle_E$ を固定し、$W=\sum_\mu K_\mu\otimes|\mu\rangle_E$ と書きます。$K_\mu:L\to B$ は $\sum_\mu K_\mu^\dagger K_\mu=I_L$ を満たします。[相補チャネルのKraus行列成分](../QINF8/index.md#prop-qinf8-complement-matrix)を適用すると

$$
\langle\mu|\mathcal M^c(X)|\nu\rangle
=\operatorname{Tr}(XK_\nu^\dagger K_\mu).
$$

[有限次元Kraus表示](../QINF7/index.md#thm-qinf7-kraus-existence)により、復号 $\mathcal D(\tau)=\sum_a D_a\tau D_a^\dagger$ のKraus作用素 $D_a:B\to L$ を選ぶと $\sum_aD_a^\dagger D_a=I_B$ です。全純粋入力 $|\psi\rangle$ を復号した結果が $|\psi\rangle\langle\psi|$ なので、正作用素の和

$$
|\psi\rangle\langle\psi|=\sum_{a,\mu}D_aK_\mu|\psi\rangle\langle\psi|K_\mu^\dagger D_a^\dagger
$$

の各項の像は $\mathbb C|\psi\rangle$ 内にあります。したがって $D_aK_\mu|\psi\rangle=\alpha_{a\mu}(\psi)|\psi\rangle$。$d\ge2$ なら $|j\rangle,|k\rangle,(|j\rangle+|k\rangle)/\sqrt2$ に線形性を適用すると、係数は全入力で同じ $\alpha_{a\mu}$ です。$d=1$ でも一つの基底に対して定数です。従って $D_aK_\mu=\alpha_{a\mu}I_L$ です。

$$
\begin{aligned}
K_\nu^\dagger K_\mu
&=K_\nu^\dagger\Bigl(\sum_aD_a^\dagger D_a\Bigr)K_\mu\\
&=\sum_a\overline{\alpha_{a\nu}}\alpha_{a\mu}I_L
=:c_{\nu\mu}I_L.
\end{aligned}
$$

相補写像の成分公式へ代入すると $\langle\mu|\mathcal M^c(\rho)|\nu\rangle=c_{\nu\mu}\operatorname{Tr}\rho$。これは全密度演算子で一定です。出力 $\sigma_E$ は、例えば $\rho=I_L/d$ を代入した $\mathcal M^c(I_L/d)$ であり、CPTP性から密度演算子です。

**（3）から（1）。** まず[参照環境の成分条件](#lem-qinf29-blocks)で非対角ブロックを確定します。それを[相補チャネルのKraus行列成分](../QINF8/index.md#prop-qinf8-complement-matrix)へ代入すると

$$
\langle k|K_\nu^\dagger K_\mu|j\rangle
=\langle\mu|\mathcal M^c(|j\rangle\langle k|)|\nu\rangle
=\delta_{jk}(\sigma_E)_{\mu\nu}.
$$

したがって $K_\nu^\dagger K_\mu=(\sigma_E)_{\mu\nu}I_L$。添字を $K_\mu^\dagger K_\nu=c_{\mu\nu}I_L$ の順にそろえ、$C=(c_{\mu\nu})$ と置きます。任意の単位ベクトル $|\psi\rangle_L$ と複素数列 $z_\mu$ に対して

$$
\sum_{\mu,\nu}\overline{z_\mu}c_{\mu\nu}z_\nu
=\left\|\sum_\nu z_\nu K_\nu|\psi\rangle\right\|^2\ge0,
\qquad\operatorname{Tr}C
=\sum_\mu\langle\psi|K_\mu^\dagger K_\mu|\psi\rangle=1.
$$

従って $C$ は正半定値Hermitian行列で、固有値 $\lambda_a\ge0$ の和は1です。[QINF26のKraus添字の対角化](../QINF26/index.md#thm-qinf26-kl)と同様に、$S^\dagger CS=\operatorname{diag}(\lambda_a)$ となるユニタリ行列 $S$ を取り、$F_a=\sum_\mu S_{\mu a}K_\mu:L\to B$ と置きます。この変換では $\sum_a S_{\mu a}\overline{S_{\nu a}}=\delta_{\mu\nu}$ なのでチャネルは変わらず、

$$
F_a^\dagger F_b
=\sum_{\mu,\nu}\overline{S_{\mu a}}c_{\mu\nu}S_{\nu b}I_L
=\lambda_a\delta_{ab}I_L.
$$

ここでは $K_a:L\to B$ が矩形でも、積 $K_a^\dagger K_b:L\to L$ は正しく定義されます。$\lambda_a\ge0$ かつ $\sum_a\lambda_a=1$ で、固有値の零の枝を除いた直交性は次の復号構成で用います。

$\lambda_a>0$ の枝に対し $W_a=F_a/\sqrt{\lambda_a}:L\to B$ とすると $W_a^\dagger W_b=\delta_{ab}I_L$。したがって $\Pi_a=W_aW_a^\dagger$ は互いに直交する射影、$Q=I_B-\sum_{a:\lambda_a>0}\Pi_a$ も射影です。$\lambda_a=0$ の枝は $\|F_a|\psi\rangle\|^2=0$ から $F_a=0$。固定した単位ベクトル $|0\rangle_L$ と、$QB$ の正規直交基底 $|q_t\rangle$ を選び、次のKraus作用素で復号を構成します。

$$
D_a=W_a^\dagger:B\to L,
\qquad D_t^{\perp}=|0\rangle_L\langle q_t|.
$$

これらは $\sum_aD_a^\dagger D_a+\sum_t(D_t^\perp)^\dagger D_t^\perp=\sum_a\Pi_a+Q=I_B$ を満たし、[KrausのCPTP条件](../QINF7/index.md#thm-qinf7-kraus-cptp)から全 $B$ 上の復号 $\mathcal D$ を定義します。符号化後の論理密度演算子 $\rho$ には

$$
\mathcal M(\rho)=\sum_aF_a\rho F_a^\dagger
=\sum_{a:\lambda_a>0}\lambda_aW_a\rho W_a^\dagger.
$$

ここで $D_aW_b=\delta_{ab}I_L$、$D_t^\perp W_b=0$ を代入し、

$$
\mathcal D\mathcal M(\rho)
=\sum_a\lambda_a\rho=\rho
$$

を得ます。これは出力だけを測定してから逆等長写像を適用するCPTP復号で、未知の入力を測っていません。

最後の参照系付き主張は $\mathcal D\mathcal M$ が全密度演算子で恒等であることから従います。任意の基底 $|j\rangle$ について、密度演算子の差と位相の異なる重ね合わせの線形結合から $|j\rangle\langle k|$ の像も恒等です。よって $\tau_{R'L}=\sum_{j,k}T_{jk}\otimes|j\rangle\langle k|$ の各ブロックに $\mathrm{id}_{R'}\otimes\mathcal D\mathcal M$ を作用させれば全ブロックが不変です。
<!-- proof-end -->

**意味。** 受信者が保つべきものは「入力の一つの基底」ではなく、任意の参照系とのもつれを含む量子状態全体です。環境が論理入力のどの成分にも反応しなければ、誤りの枝を復号側が区別できるように配置できます。これは[QINF28の消失版の同値](../QINF28/index.md#thm-qinf28-erasure-privacy)を一般のCPTP雑音へ広げたものです。

## 5. 情報漏洩を数値で測る：零と小さいを区別する

完全デカップリングは真偽を判定する条件です。環境が**どのくらい**参照系と相関したかを測るには、既習の[量子相互情報量](../QINF18/index.md#def-qinf18-mutual)と[トレース距離](../QINF11/index.md#def-qinf11-trace-distance)が使えます。両者は違う尺度ですが、完全に零になる条件は一致します。

<a id="def-qinf29-leakage"></a>

<!-- formal-statement-start -->
> **定義（参照環境の情報漏洩量）**
> [参照系付きチャネル状態](#def-qinf29-reference) $\Omega_{RE}$ に対し、量子相互情報量による漏洩量 $\mathscr L$ と、積状態からのトレース距離 $\Delta$ を

$$
\mathscr L:=I(R:E)_\Omega
=S(\Omega_R)+S(\Omega_E)-S(\Omega_{RE}),
$$

$$
\Delta:=\frac12\left\|\Omega_{RE}-\Omega_R\otimes\Omega_E\right\|_1
$$

> と定める。$S(\rho)=-\operatorname{Tr}(\rho\log_2\rho)$ とし、零固有値の寄与は0とする。$\mathscr L$ はbit単位、$\Delta$ は無次元である。
<!-- formal-statement-end -->

ここで $S$ は[QINF17のvon Neumannエントロピー](../QINF17/index.md#def-qinf17-entropy)です。相互情報量は環境で「量子入力を一回測定したら何bit読めるか」という意味**ではありません**。参照系と環境に残る総相関を評価し、純粋なエンタングルメントの寄与も含む量です。

<!-- definition-example-start: def-qinf29-leakage -->
**定義の確認**：環境が参照ラベルを記録する。$W|j\rangle=|j\rangle_B|j\rangle_E$（$j=0,1$）とします。像は正規直交なので $W$ は等長です。[部分トレース](../QINF3/index.md#def-qinf3-partial-trace)から

$$
\Omega_{RE}=\tfrac12|00\rangle\langle00|+\tfrac12|11\rangle\langle11|,
\qquad\Omega_R=\Omega_E=I_2/2.
$$

全体の固有値は $(1/2,1/2,0,0)$ で $S(RE)=1$、各縮約も $S(R)=S(E)=1$。従って $\mathscr L=1$ bit。積状態は $I_4/4$ なので差の固有値は $(1/4,-1/4,-1/4,1/4)$、$\Delta=\tfrac12(4\cdot\tfrac14)=1/2$ です。どちらの量も非零で、位相を含む未知量子状態は完全には戻せません。
<!-- definition-example-end -->

<a id="prop-qinf29-zero-leakage"></a>

<!-- formal-statement-start -->
> **命題（相互情報量・トレース距離と完全デカップリング）**
> 任意の有限次元の参照系付きチャネル状態 $\Omega_{RE}$ に対し、

$$
\mathscr L=D(\Omega_{RE}\|\Omega_R\otimes\Omega_E)\ge0,
\qquad 0\le\Delta\le1.
$$

> さらに以下は同値である。
>
> **（1）** $\mathscr L=0$。
>
> **（2）** $\Delta=0$。
>
> **（3）** $\Omega_{RE}=\Omega_R\otimes\Omega_E$。
>
> 従って、[完全復号の定理](#thm-qinf29-recovery)により、いずれも完全CPTP復号が存在する条件である。
<!-- formal-statement-end -->

### 証明の見取り図

[量子相対エントロピーの非負性と等号条件](../QINF20/index.md#prop-qinf20-nonnegative)を使います。その前に、分母に相当する積状態の台が $\Omega_{RE}$ の台を含むことを確かめます。トレース距離の零は行列差の零そのものです。

<!-- proof-start -->
### 証明

$P_R,P_E$ を各縮約の正固有値部分への射影とします。$(I_R-P_R)\Omega_R=0$ なので

$$
\operatorname{Tr}\bigl[((I_R-P_R)\otimes I_E)\Omega_{RE}\bigr]
=\operatorname{Tr}[(I_R-P_R)\Omega_R]=0.
$$

$\Omega_{RE}\ge0$ なので、左辺は $\Omega_{RE}^{1/2}[(I-P_R)\otimes I]\Omega_{RE}^{1/2}$ という正作用素のトレースです。零ならその正作用素が零、従って $((I-P_R)\otimes I)\Omega_{RE}^{1/2}=0$。同様に $E$ 側にも支持条件が成り立ち、

$$
\operatorname{supp}\Omega_{RE}\subseteq
\operatorname{supp}\Omega_R\otimes\operatorname{supp}\Omega_E.
$$

従って[量子相対エントロピーの定義](../QINF20/index.md#def-qinf20-relative-entropy)で有限値となります。積状態の正の台上では $\log_2(\Omega_R\otimes\Omega_E)=\log_2\Omega_R\otimes I+I\otimes\log_2\Omega_E$。部分トレースの性質を使って

$$
\begin{aligned}
D(\Omega_{RE}\|\Omega_R\otimes\Omega_E)
&=\operatorname{Tr}(\Omega_{RE}\log_2\Omega_{RE})\\
&\quad-\operatorname{Tr}(\Omega_R\log_2\Omega_R)
-\operatorname{Tr}(\Omega_E\log_2\Omega_E)\\
&=S(\Omega_R)+S(\Omega_E)-S(\Omega_{RE})
=\mathscr L.
\end{aligned}
$$

[相対エントロピーの等号条件](../QINF20/index.md#prop-qinf20-nonnegative)は $\mathscr L=0$ と積状態条件の同値を与えます。一方 $\Delta=0$ は差作用素の全特異値が零であることと同値です。$\Delta\le1$ は[トレース距離の定義と上界](../QINF11/index.md#def-qinf11-trace-distance)を二つの密度演算子へ適用した結果です。
<!-- proof-end -->

ここで証明したのは **零になる条件**であって、$\mathscr L$ や $\Delta$ が小さいときの復号誤差の一般的な定量評価ではありません。近似復号に必要な追加の不等式と回復写像はQINF30で扱います。「小さいから復号誤差も同じ数値」と決めつけないことが重要です。また環境出力を更にCPTP処理するなら、[相互情報量のデータ処理不等式](../QINF20/index.md#cor-qinf20-mutual-dpi)から相関は増えませんが、元の環境ですでに漏れた情報が消えたことにはなりません。

## 6. 具体計算：確率的位相反転と参照系の相関

論理量子ビット上のPauli $Z=|0\rangle\langle0|-|1\rangle\langle1|$ を用い、確率 $p\in[0,1]$ の位相反転チャネルを

$$
\mathcal N_p(\rho)=(1-p)\rho+pZ\rho Z
$$

とします。Kraus作用素は $\sqrt{1-p}I,\sqrt pZ$、その随伴積の和は $(1-p)I+pI=I$ なのでCPTPです。$B=L=\mathbb C^2$、$E=\mathbb C^2$ に対して[Stinespring表示](../QINF8/index.md#thm-qinf8-stinespring)を

$$
W|j\rangle=|j\rangle_B|e_j\rangle_E,
\qquad |e_j\rangle=\sqrt{1-p}|0\rangle+(-1)^j\sqrt p|1\rangle
$$

と取れます。$|e_j\rangle$ は正規化され、異なる $j$ の像は $B$ 側が直交するので $W$ は等長です。

<a id="prop-qinf29-phase-flip"></a>

<!-- formal-statement-start -->
> **命題（確率的位相反転の情報漏洩）**
> 上の $\mathcal N_p$ と $d=2$ の最大エンタングル参照系に対し、二値エントロピー $h_2(p)=-p\log_2p-(1-p)\log_2(1-p)$（$0\log_20=0$）を用いると、

$$
\mathscr L=h_2(p),\qquad\Delta=\sqrt{p(1-p)}.
$$

> したがって、全未知量子ビットを完全復号できるのは $p=0$ または $p=1$ のとき、かつそのときに限る。$p=1/2$ では $\mathscr L=1$ bit、$\Delta=1/2$ となる。
<!-- formal-statement-end -->

### 証明の見取り図

$B$ をトレースすると参照基底が古典的な二値ラベルとして残り、$E$ に条件付きの純粋状態 $|e_j\rangle$ が対応します。全体と二つの縮約の固有値を求め、$\mathscr L$ を計算します。$\Delta$ では、積状態との差が環境の非対角項だけになる点を使います。

<!-- proof-start -->
### 証明

参照・受信・環境の純粋状態は $|\Omega\rangle=(|0\rangle_R|0\rangle_B|e_0\rangle_E+|1\rangle_R|1\rangle_B|e_1\rangle_E)/\sqrt2$。$\langle0|1\rangle_B=0$ から交差項が消え、

$$
\Omega_{RE}=\tfrac12|0\rangle\langle0|_R\otimes|e_0\rangle\langle e_0|
+\tfrac12|1\rangle\langle1|_R\otimes|e_1\rangle\langle e_1|.
$$

$R$ の直交する二つのブロックは純粋状態の半分なので、$\Omega_{RE}$ の非零固有値は $(1/2,1/2)$、$S(RE)=1$。$\Omega_R=I_2/2$ から $S(R)=1$。環境の二つの純粋状態の和では交差項の符号が相殺し、

$$
\Omega_E=\tfrac12(|e_0\rangle\langle e_0|+|e_1\rangle\langle e_1|)
=(1-p)|0\rangle\langle0|+p|1\rangle\langle1|.
$$

よって $S(E)=h_2(p)$、$\mathscr L=1+h_2(p)-1=h_2(p)$ です。環境の行列で $|e_0\rangle\langle e_0|$ の非対角要素は $+\sqrt{p(1-p)}$、$|e_1\rangle\langle e_1|$ のそれは負です。論理側と同じ計算基底表示を参照系へ移した $Z_R=|0\rangle\langle0|_R-|1\rangle\langle1|_R$ と、Pauli $X_E=|0\rangle\langle1|_E+|1\rangle\langle0|_E$ を使うと

$$
\Omega_{RE}-I_R/2\otimes\Omega_E
=\frac{\sqrt{p(1-p)}}2 Z_R\otimes X_E.
$$

$Z_R\otimes X_E$ の四つの固有値は $\pm1$（各二個）なので、差作用素の全特異値の和は $4\cdot\sqrt{p(1-p)}/2=2\sqrt{p(1-p)}$。従って $\Delta=\sqrt{p(1-p)}$ です。両者は $p=0,1$ のときだけ零となり、[完全復号と環境デカップリングの同値](#thm-qinf29-recovery)から結論します。実際、$p=0$ なら恒等、$p=1$ なら既知の $Z$ を再適用して復号できます。
<!-- proof-end -->

この例の重要な点は、$p=1$ では**毎回位相反転しているのに、環境へは一切情報が漏れない**ことです。乱数に従って未知の誤りが起きることと、確実に分かるユニタリ操作は区別しなければなりません。

### 位相だけが漏れる：対角縮約では不十分な反例

[QINF28のBell符号語](../QINF28/index.md#thm-qinf28-erasure-privacy)と同じ形の等長写像 $W:L\to B\otimes E$ を、$|0\rangle\mapsto|\Phi^+\rangle=(|00\rangle+|11\rangle)/\sqrt2$、$|1\rangle\mapsto|\Phi^-\rangle=(|00\rangle-|11\rangle)/\sqrt2$ とします。出力は正規直交なので $W^\dagger W=I_L$。$B$ をトレースすると

$$
\mathcal M^c(|0\rangle\langle0|)
=\mathcal M^c(|1\rangle\langle1|)=I_E/2,
\quad\mathcal M^c(|0\rangle\langle1|)=Z_E/2.
$$

従って $\Omega_R=\Omega_E=I_2/2$ であっても

$$
\Omega_{RE}=I_4/4+\tfrac14X_R\otimes Z_E
\ne I_R/2\otimes I_E/2.
$$

差の固有値は $\pm1/4$ が二個ずつなので $\Delta=1/2$。$\Omega_{RE}$ 自身の固有値は $(1/2,1/2,0,0)$ で $\mathscr L=1$ bit。入力 $|+\rangle$ は $|00\rangle_{BE}$、$|-\rangle$ は $|11\rangle_{BE}$ へ写り、環境が両者を区別できます。論理基底の秘密は守っても、位相が漏れるという具体的反例です。

## 7. 演習：参照と環境を同時に追跡する

<a id="ex-qinf29-a01"></a>

### 演習 A1：理想通信の参照系

- Level: A
- 問題: $d=3$、$W|j\rangle=|j\rangle_B|0\rangle_E$（$j=0,1,2$）とする。$W$ の等長性と $\Omega_{RE},\Omega_R,\Omega_E$ を求め、完全デカップリングを判定せよ。

<!-- solution-start -->
**詳細解答。** $B=\mathbb C^3$、$E=\mathbb C^2$ として $\langle Wi|Wj\rangle=\langle i|j\rangle_B\langle0|0\rangle_E=\delta_{ij}$、従って $W^\dagger W=I_3$。定義に代入すると

$$
|\Omega\rangle=\frac1{\sqrt3}(|00\rangle_{RB}+|11\rangle_{RB}+|22\rangle_{RB})\otimes|0\rangle_E.
$$

[部分トレースの基底展開](../QINF3/index.md#def-qinf3-partial-trace)では $B$ の交差項に $\langle k|j\rangle=\delta_{jk}$ が掛かるので

$$
\Omega_{RE}=\frac13\sum_{j=0}^2|j\rangle\langle j|_R\otimes|0\rangle\langle0|_E
=I_3/3\otimes|0\rangle\langle0|.
$$

$E$ をトレースすれば $\Omega_R=I_3/3$、$R$ をトレースすれば $\Omega_E=|0\rangle\langle0|$。両者は正値・トレース1で、[定義](#def-qinf29-decoupling)の積等式が成立するので完全デカップリングしています。
<!-- solution-end -->

<a id="ex-qinf29-a02"></a>

### 演習 A2：参照系の非対角成分

- Level: A
- 問題: 二次元論理系で $\mathcal M^c(|0\rangle\langle0|)=\mathcal M^c(|1\rangle\langle1|)=\sigma_E$、$\mathcal M^c(|0\rangle\langle1|)=T$ とする。$\Omega_{RE}$ の $2\times2$ ブロック行列を示し、$T\ne0$ ならデカップリングしないことを証明せよ。

<!-- solution-start -->
**詳細解答。** [参照環境の成分補題](#lem-qinf29-blocks)に $d=2$ を代入します。相補チャネルは随伴を保つので $\mathcal M^c(|1\rangle\langle0|)=T^\dagger$ です。$R$ の基底 $|0\rangle,|1\rangle$ に関するブロック行列は

$$
\Omega_{RE}=\frac12
\begin{pmatrix}\sigma_E&T\\T^\dagger&\sigma_E\end{pmatrix},
\qquad\Omega_R\otimes\Omega_E=\frac12
\begin{pmatrix}\sigma_E&0\\0&\sigma_E\end{pmatrix}.
$$

後者の $\Omega_E=\sigma_E$ は前者を $R$ でトレースして確認できます。差の $(0,1)$ ブロックが $T/2$ なので、$T\ne0$ なら二作用素は一致せず[完全デカップリングの定義](#def-qinf29-decoupling)に反します。
<!-- solution-end -->

<a id="ex-qinf29-a03"></a>

### 演習 A3：位相反転の途中の確率

- Level: A
- 問題: 確率的位相反転チャネル $\mathcal N_p$ に $p=1/4$ を代入し、環境の縮約状態、$\mathscr L$、$\Delta$ と、完全復号の可否を求めよ。$h_2$ は二値エントロピーとする。

<!-- solution-start -->
**詳細解答。** [位相反転の命題](#prop-qinf29-phase-flip)で得た環境状態に $p=1/4$ を代入すると

$$
\Omega_E=\frac34|0\rangle\langle0|+\frac14|1\rangle\langle1|.
$$

固有値は $(3/4,1/4)$ なので

$$
\mathscr L=h_2(1/4)
=-\tfrac14\log_2\tfrac14-\tfrac34\log_2\tfrac34
=2-\tfrac34\log_2 3\simeq0.8113\ \text{bit}.
$$

一方

$$
\Delta=\sqrt{\tfrac14\cdot\tfrac34}=\frac{\sqrt3}{4}>0.
$$

両者とも非零です。[相互情報量・トレース距離と完全デカップリング](#prop-qinf29-zero-leakage)の命題で積状態でないと分かります。さらに[完全復号と環境デカップリングの同値](#thm-qinf29-recovery)により完全復号は不可能です。$p=1/4$ は端点の既知ユニタリではなく、受信者には誤りが確率的に生じます。
<!-- solution-end -->

<a id="ex-qinf29-a04"></a>

### 演習 A4：三値ラベルを環境が記録する

- Level: A
- 問題: $d=3$、$W|j\rangle=|j\rangle_B|j\rangle_E$ とする。$\Omega_{RE}$、$\mathscr L$、$\Delta$ を固有値から求めよ。エントロピーの底は2とする。

<!-- solution-start -->
**詳細解答。** $W$ の像は正規直交なので等長です。$B$ をトレースすると

$$
\Omega_{RE}=\frac13\sum_{j=0}^2|jj\rangle\langle jj|,
\qquad\Omega_R=\Omega_E=I_3/3.
$$

$RE$ の9次元基底で $\Omega_{RE}$ の非零固有値は $1/3$ が3個で、$S(RE)=\log_23$。各縮約のエントロピーも $\log_23$ なので

$$
\mathscr L=\log_23+\log_23-\log_23=\log_23.
$$

積状態は $I_9/9$ です。差の固有値は $j=j$ の3個が $1/3-1/9=2/9$、$j\ne k$ の6個が $-1/9$。従って

$$
\Delta=\frac12\left(3\cdot\frac29+6\cdot\frac19\right)=\frac23.
$$

正規化や次元の違いを落とさず、参照ラベルが完全に環境へ記録された例となります。
<!-- solution-end -->

<a id="ex-qinf29-b01"></a>

### 演習 B1：受信者に誤りフラグがあれば戻せる

- Level: B
- 問題: $L=\mathbb C^2$、$B=F\otimes L$（$F=\mathbb C^2$）、$q\in(0,1)$ とし、$K_0=\sqrt{1-q}|0\rangle_F\otimes I_L$、$K_1=\sqrt q|1\rangle_F\otimes Z_L$ を $L\to B$ のKraus作用素とする。チャネル性、環境の一定性、受信側だけの具体的復号を検算せよ。

<!-- solution-start -->
**詳細解答。** $K_0^\dagger K_0=(1-q)I_L$、$K_1^\dagger K_1=qI_L$ なので和は $I_L$。よって[QINF7のKraus条件](../QINF7/index.md#thm-qinf7-kraus-cptp)からCPTPです。フラグの直交性 $\langle0|1\rangle_F=0$ により $K_0^\dagger K_1=K_1^\dagger K_0=0$。環境の基底 $|0\rangle_E,|1\rangle_E$ を固定します。[相補チャネルのKraus行列成分](../QINF8/index.md#prop-qinf8-complement-matrix)へ代入すると

$$
\mathcal M^c(\rho)=(1-q)|0\rangle\langle0|_E+q|1\rangle\langle1|_E
$$

で、$\rho$ に依存しません。復号はまず $F$ を計算基底で測定し、結果0なら何もせず、1なら $Z$ を物理量子ビットに作用させ、その後フラグを捨てます。入力 $\rho$ に対する分岐出力は $(1-q)|0\rangle\langle0|_F\otimes\rho$ と $q|1\rangle\langle1|_F\otimes Z\rho Z$ です。第2枝で $Z^2=I$ を使うと

$$
\mathcal D\mathcal M(\rho)=(1-q)\rho+q Z(Z\rho Z)Z=\rho.
$$

測定と条件付きユニタリと部分トレースの合成はCPTPなので、復号は全 $B$ 入力上で有効です。フラグを受信者が持つことが、次の失敗例との違いです。
<!-- solution-end -->

<a id="ex-qinf29-b02"></a>

### 演習 B2：消失訂正を参照系から読み直す

- Level: B
- 問題: [QINF28の4量子ビット符号](../QINF28/index.md#prop-qinf28-four-qubit)で、第1量子ビット $E$ を消失させる。既知の各縮約 $\operatorname{Tr}_B|j_L\rangle\langle k_L|=\delta_{jk}I_E/2$（$j,k=0,1$）から、$\Omega_{RE}$、$\mathscr L$、$\Delta$ と回復可能性を導け。$B$ は残り3量子ビットである。

<!-- solution-start -->
**詳細解答。** 消失を $W:L\to B\otimes E$ で表し、[参照環境のブロック展開](#lem-qinf29-blocks)へ条件を代入します。

$$
\begin{aligned}
\Omega_{RE}
&=\tfrac12\sum_{j,k=0}^1|j\rangle\langle k|_R\otimes\delta_{jk}I_E/2\\
&=(|0\rangle\langle0|+|1\rangle\langle1|)_R/2\otimes I_E/2
=I_4/4.
\end{aligned}
$$

$\Omega_R=I_R/2$、$\Omega_E=I_E/2$ なので積状態です。従って $S(R)=S(E)=1$、$S(RE)=2$ から $\mathscr L=0$、差作用素が零なので $\Delta=0$。消失チャネルは残り $B$ を保ちますから、[完全復号定理](#thm-qinf29-recovery)により $B$ だけからのCPTP復号が存在します。符号語の対角縮約だけではなく、与えられた交差縮約の零も使っている点に注意します。
<!-- solution-end -->

<a id="ex-qinf29-b03"></a>

### 演習 B3：参照基底を取り替えても判定は変わらない

- Level: B
- 問題: $L=R=\mathbb C^d$ とし、単位行列でないユニタリ $T$ を論理入力側に作用させた最大エンタングル入力 $|\Phi_T\rangle=(I_R\otimes T)|\Phi_d\rangle$ を考える。このとき $\Omega'_{RE}$ が $\Omega_{RE}$ の参照側ユニタリ共役で表せることを示し、$\mathscr L,\Delta$ とデカップリング判定が不変であることを説明せよ。

<!-- solution-start -->
**詳細解答。** 基底表示を用いて

$$
(I_R\otimes T)|\Phi_d\rangle
=\frac1{\sqrt d}\sum_{j,k}T_{kj}|j\rangle_R|k\rangle_L
=(T^{\mathsf T}_R\otimes I_L)|\Phi_d\rangle.
$$

$T^{\mathsf T}$ もユニタリです（$T^{\mathsf T}(T^{\mathsf T})^\dagger=(T^\dagger T)^{\mathsf T}=I$）。$W$ は論理入力だけに作用するので、$|\Omega'\rangle=(T^{\mathsf T}_R\otimes I_{BE})|\Omega\rangle$。$B$ を部分トレースして

$$
\Omega'_{RE}=(T^{\mathsf T}_R\otimes I_E)\Omega_{RE}(\overline T_R\otimes I_E).
$$

$\Omega'_R=T^{\mathsf T}\Omega_R\overline T=I_R/d$、$\Omega'_E=\Omega_E$ です。したがって差作用素も同じユニタリ共役を受けます。ユニタリ共役は固有値・特異値を変えないので[von Neumannエントロピー](../QINF17/index.md#def-qinf17-entropy)は不変です。また[トレース距離](../QINF11/index.md#def-qinf11-trace-distance)も差作用素の特異値の和で定まるため不変です。$\mathscr L'=\mathscr L$、$\Delta'=\Delta$、積状態との一致も不変です。
<!-- solution-end -->

<a id="ex-qinf29-b04"></a>

### 演習 B4：環境の後処理で見かけの漏洩が消える

- Level: B
- 問題: $0<p<1$ の確率的位相反転の環境 $E$ に、計算基底で非対角成分を消すCPTP写像 $\Gamma(X)=|0\rangle\langle0|X|0\rangle\langle0|+|1\rangle\langle1|X|1\rangle\langle1|$ を施す。$(\mathrm{id}_R\otimes\Gamma)(\Omega_{RE})$ を求め、後処理後の漏洩が零でも元の完全訂正は可能とは限らない理由を述べよ。

<!-- solution-start -->
**詳細解答。** 射影 $P_0=|0\rangle\langle0|,P_1=|1\rangle\langle1|$ は $P_0^\dagger P_0+P_1^\dagger P_1=I$ なので $\Gamma$ はCPTPです。位相反転の環境条件付き状態は $|e_j\rangle\langle e_j|$ で、各対角要素は $1-p,p$、非対角要素だけが $(-1)^j\sqrt{p(1-p)}$ です。従って

$$
\Gamma(|e_0\rangle\langle e_0|)
=\Gamma(|e_1\rangle\langle e_1|)
=(1-p)|0\rangle\langle0|+p|1\rangle\langle1|=\Omega_E.
$$

[位相反転の参照環境状態](#prop-qinf29-phase-flip)に代入すると

$$
(\mathrm{id}_R\otimes\Gamma)(\Omega_{RE})
=\tfrac12(|0\rangle\langle0|+|1\rangle\langle1|)_R\otimes\Omega_E
=I_R/2\otimes\Omega_E.
$$

後処理後の相互情報量は0です。一方、元のチャネルの漏洩量は $h_2(p)>0$。$\Gamma$ は**すでに環境へ出た情報を後で破棄する操作**で、受信者 $B$ へのチャネルを過去にさかのぼって変えません。[データ処理不等式](../QINF20/index.md#cor-qinf20-mutual-dpi)は相互情報量の減少を許し、元の完全復号可能性を保証しません。
<!-- solution-end -->

<a id="ex-qinf29-c01"></a>

### 演習 C1：位相反転の誤りフラグはどこに置くべきか

- Level: C
- 問題: $0<p<1$、論理量子ビット $L$ に対し、次の二つの通信路を比較する。
  1. **フラグなし**：受信者には $\mathcal N_p(\rho)=(1-p)\rho+pZ\rho Z$ のみ渡る。
  2. **受信者フラグ付き**：$B=F\otimes L$ とし、$\mathcal F_p(\rho)=(1-p)|0\rangle\langle0|_F\otimes\rho+p|1\rangle\langle1|_F\otimes Z\rho Z$ を渡す。

  両者について、(a) 対応する環境付き等長写像を構成する、(b) 参照環境の $\mathscr L,\Delta$ を求める、(c) 復号の可否を判定する。さらに $F$ を捨てる操作により、なぜ環境への情報が新たに漏れたか説明せよ。

<!-- solution-start -->
**詳細解答。** (a) フラグなしでは

$$
W_0|\psi\rangle=\sqrt{1-p}|\psi\rangle_B|0\rangle_E
+\sqrt p Z|\psi\rangle_B|1\rangle_E
$$

を取ります。二枝の環境基底が直交し、$W_0^\dagger W_0=(1-p)I+pZ^\dagger Z=I$ だから等長です。フラグ付きは

$$
W_1|\psi\rangle=\sqrt{1-p}|0\rangle_F|\psi\rangle_L|0\rangle_E
+\sqrt p|1\rangle_F Z|\psi\rangle_L|1\rangle_E
$$

です。同じくノルムは保たれ、$E$ の部分トレースで問題文の $\mathcal F_p$ が得られます。

(b) $W_0$ については[位相反転の命題](#prop-qinf29-phase-flip)の計算より

$$
\mathscr L_0=h_2(p)>0,\qquad\Delta_0=\sqrt{p(1-p)}>0.
$$

$W_1$ では環境の $0,1$ 行列成分の交差項が $\langle0|1\rangle_F=0$ により消えます。$E$ 側の対角ブロックは入力 $\rho$ に対してそれぞれ $(1-p)\operatorname{Tr}\rho$ と $p\operatorname{Tr}\rho$ です。従って全 $\rho$ で

$$
\mathcal F_p^c(\rho)=(1-p)|0\rangle\langle0|_E+p|1\rangle\langle1|_E
$$

となります。[参照環境の成分条件](#lem-qinf29-blocks)をここへ適用すると $\Omega^{(1)}_{RE}=I_R/2\otimes[(1-p)|0\rangle\langle0|+p|1\rangle\langle1|]$。よって $\mathscr L_1=\Delta_1=0$ です。

(c) フラグ付きは $F$ を計算基底で測定し、1なら $Z$ をもう一度作用させます。第0枝は $(1-p)\rho$、第1枝は $p Z(Z\rho Z)Z=p\rho$ に戻り、合計は $\rho$ です。フラグなしは $\mathscr L_0>0$ だから[完全復号定理](#thm-qinf29-recovery)により未知量子ビットを完全復号できません。例えば $|+\rangle\langle+|$ と $|-\rangle\langle-|$ は位相反転で互いに混じり、元のコヒーレンスを完全には戻せません。

最後に $\operatorname{Tr}_F\mathcal F_p(\rho)=\mathcal N_p(\rho)$ です。フラグを捨てる操作は受信者が利用できた誤り位置の情報を取り去ります。Stinespring模型で捨てた $F$ も新たな環境へ数えれば、参照系との相関が残り得ます。$W_1$ の元の $E$ だけが無相関だったことと、$F$ を環境へ移した**拡大された環境**が無相関であることは別です。これは環境の切り分けを変えると復号可能性の判定が変わるのではなく、受信者へ渡すチャネル自体が変わったためです。
<!-- solution-end -->

## 8. 次へ：完全な独立性が少しだけ壊れるとき

本講の判定は、最大エンタングル参照系一つから全ての入力の復号可能性を決定できるという、有限次元の厳密な同値でした。環境が参照と完全に積なら回復でき、相関が一つでも残れば**完全な**回復はできません。

実際の雑音では $\mathscr L,\Delta$ が小さくても零とは限りません。次のQINF30では、これらの「小さい」を回復後の忠実度や誤差とどう結び付けるかを、適用条件と回復の構成を分けて検討します。
