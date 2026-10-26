# QINF7 量子チャネルとKraus表示

[QINF5の測定instrument](../QINF5/index.md#def-qinf5-instrument)では、結果を読まないときの状態更新を、測定演算子の和として計算しました。しかし雑音は、測定結果を読み取らなくても起こります。例えば、外部へ位相情報だけが漏れれば密度行列の非対角成分が縮み、励起したqubitが緩和すれば占有確率（対角成分）も変化します。こうした操作を、入力状態を出力状態へ送る一つの線形写像として扱いたいのです。

単に「密度演算子を密度演算子へ写す」と定めるだけでは不十分です。操作する系 $A$ が別の系 $R$ とエンタングルしているとき、$A$ だけに同じ操作を施しても、複合系 $R\otimes A$ の状態は正値でなければなりません。この要求が **完全正値性** です。この章では、完全正値性とトレース保存を組み合わせて物理的な操作を定義し、それを有限個の行列で記述する方法を導きます。

以下、$H_{\mathrm{in}},H_{\mathrm{out}}$ は次元 $d_{\mathrm{in}},d_{\mathrm{out}}\ge1$ の有限次元複素Hilbert空間とします。

$L(H)$ は $H$ 上のすべての線形作用素、$L(H_{\mathrm{in}},H_{\mathrm{out}})$ は入力から出力への線形写像の空間です。$\dagger$ は随伴、$I_H$ は単位作用素、$\operatorname{Tr}$ はトレースを表します。

[密度演算子](../QINF2/index.md#def-qinf2-ensemble-density)は正半定値かつトレース1の作用素です。正半定値作用素を $X\ge0$ と書きます。写像 $\Phi:L(H_{\mathrm{in}})\to L(H_{\mathrm{out}})$ は複素線形とします。

## 1. 状態を保つだけでよいか

まず、$\mathbb C^2$ 上の行列を転置する操作 $T(X)=X^{\mathsf T}$ を考えます。$X\ge0$ なら、任意のベクトル $v$ について

$$
v^\dagger X^{\mathsf T}v
=\overline{(\overline v)^\dagger X\,\overline v}\ge0
$$

なので転置は正値性を保ちます。また対角成分が変わらないため、$\operatorname{Tr}(X^{\mathsf T})=\operatorname{Tr}X$ です。ところがこの写像をエンタングルした片側だけへ施すと問題が生じます。正値性を単一系だけで検査するのではなく、任意の有限次元の補助系を付けても検査する必要があります。

<a id="def-qinf7-positive-cp"></a>

<!-- formal-statement-start -->
> **定義（正写像と完全正写像）**  
> 有限次元複素Hilbert空間 $H_{\mathrm{in}},H_{\mathrm{out}}$ 間の複素線形写像 $\Phi:L(H_{\mathrm{in}})\to L(H_{\mathrm{out}})$ を考える。
>
> - 任意の $X\ge0$ に対して $\Phi(X)\ge0$ なら、$\Phi$ を**正写像**という。
> - 任意の正整数 $n$ と任意の $Y\ge0$（$Y\in L(\mathbb C^n\otimes H_{\mathrm{in}})$）に対し、補助系には何もしない写像 $\mathrm{id}_n\otimes\Phi$ が

$$
(\mathrm{id}_n\otimes\Phi)(Y)\ge0
$$

> を満たすなら、$\Phi$ を**完全正写像**（completely positive; CP）という。$\mathrm{id}_n$ は $n$ 次元作用素の恒等写像である。
<!-- formal-statement-end -->

単に正値な写像は、補助系を付けない $n=1$ の場合しか保証しません。完全正値性では、補助系にどんなエンタングルした入力があっても出力の正値性が壊れないことを要求します。

<!-- definition-example-start: def-qinf7-positive-cp -->
### 定義の確認：ユニタリ共役

**定義の確認**：単一系だけでなく、任意の補助系を付けても二次形式が非負であることを確かめます。

入力と出力が同じ有限次元空間 $H$ のとき、ユニタリ作用素 $U$ に対し $\Phi_U(X)=UXU^\dagger$ とします。任意の $X\ge0$ と $v\in H$ で

$$
\langle v,\Phi_U(X)v\rangle
=\langle U^\dagger v,XU^\dagger v\rangle\ge0.
$$

補助系を $\mathbb C^n$ とし、任意の $Y\ge0$ をとれば

$$
(\mathrm{id}_n\otimes\Phi_U)(Y)
=(I_n\otimes U)Y(I_n\otimes U^\dagger)\ge0.
$$

最後の不等式は任意の $w$ に対して $(I_n\otimes U^\dagger)w$ を $Y$ の二次形式へ代入すれば確かめられます。$n$ を制限していないので、これは定義どおり完全正です。
<!-- definition-example-end -->

<a id="prop-qinf7-transpose"></a>

<!-- formal-statement-start -->
> **命題（転置は正だが完全正ではない）**  
> $T:L(\mathbb C^2)\to L(\mathbb C^2)$ を計算基底に関する転置 $T(X)=X^{\mathsf T}$ とする。$T$ は正でトレースを保存するが、完全正ではない。
<!-- formal-statement-end -->

### 証明の見取り図

単一系の正値性とトレース保存は直前の計算で分かっています。補助qubitを付け、[QINF1で導入したエンタングル純粋状態](../QINF1/index.md#def-qinf1-product-entangled)の例であるBell状態に片側転置を施すと、反対称ベクトルの方向で負の期待値が現れます。

<!-- proof-start -->
### 証明

$|\Omega\rangle=(|00\rangle+|11\rangle)/\sqrt2$、$P_\Omega=|\Omega\rangle\langle\Omega|$ とします。$P_\Omega\ge0$ です。第一系を補助系、第二系を転置される入力系とし、行列単位 $E_{ij}=|i\rangle\langle j|$ を使えば

$$
P_\Omega=\frac12\sum_{i,j=0}^1E_{ij}\otimes E_{ij}.
$$

したがって

$$
\begin{aligned}
(\mathrm{id}_2\otimes T)(P_\Omega)
&=\frac12\sum_{i,j=0}^1E_{ij}\otimes E_{ji}\\
&=\frac12F,
\end{aligned}
$$

ここで $F(|a\rangle\otimes|b\rangle)=|b\rangle\otimes|a\rangle$ は交換作用素です。単位ベクトル $|\psi^-\rangle=(|01\rangle-|10\rangle)/\sqrt2$ では $F|\psi^-\rangle=-|\psi^-\rangle$ なので

$$
\langle\psi^-|(\mathrm{id}_2\otimes T)(P_\Omega)|\psi^-\rangle=-\frac12<0.
$$

出力は正半定値ではありません。ゆえに $T$ は完全正ではありません。$\square$
<!-- proof-end -->

この反例で壊れたのはトレース保存でも単一系の正値性でもなく、**外部系と結び付いた入力への正値性**です。物理的な局所雑音をモデル化する際、この違いを無視できません。

## 2. 量子チャネルと行列による実現

雑音の出力を確率1の状態とするには、正値性だけでなくトレース保存も必要です。完全正値性とトレース保存を合わせた条件を採用します。

<a id="def-qinf7-channel"></a>

<!-- formal-statement-start -->
> **定義（量子チャネル）**  
> 有限次元複素Hilbert空間 $H_{\mathrm{in}},H_{\mathrm{out}}$ に対し、複素線形写像 $\Phi:L(H_{\mathrm{in}})\to L(H_{\mathrm{out}})$ が、[完全正](#def-qinf7-positive-cp)であり、かつすべての $X\in L(H_{\mathrm{in}})$ に対して

$$
\operatorname{Tr}\Phi(X)=\operatorname{Tr}X
$$

> を満たすとき、$\Phi$ を**量子チャネル**、または**完全正・トレース保存写像**（CPTP写像）と呼ぶ。入力と出力の次元は異なってもよい。
<!-- formal-statement-end -->

<!-- definition-example-start: def-qinf7-channel -->
### 定義の確認：固定した状態への置換

**定義の確認**：入出力次元が異なっても、トレース保存と補助系に関する正値性を直接検査します。

$H_{\mathrm{in}}=\mathbb C^2$、$H_{\mathrm{out}}=\mathbb C$ とし、$\Phi(X)=\operatorname{Tr}X$（$1\times1$ 行列とみなす）とします。トレースを保存することは直接分かります。さらに任意の補助系 $R$ と $Y\ge0$ について、[部分トレースの状態保存性](../QINF3/index.md#prop-qinf3-state-product)の計算と同じく

$$
\langle r|(\mathrm{id}_R\otimes\Phi)(Y)|r\rangle
=\sum_{j=0}^1\langle r\otimes j|Y|r\otimes j\rangle\ge0.
$$

したがって出力は正で、補助系の次元にも制限がなく、完全正です。$\Phi$ は二次元入力から一次元出力への量子チャネルです。「どのような行列でも出力状態になる」のではなく、密度演算子の入力に対して値1の一次元状態を返します。
<!-- definition-example-end -->

物理的な操作を計算しやすくするため、$H_{\mathrm{in}}$ から $H_{\mathrm{out}}$ へ作用する有限個の行列 $K_\alpha$ を用意し、$K_\alpha X K_\alpha^\dagger$ を足します。この表示では、各項が正値性を保つことを二次形式で直接確認できます。

<a id="def-qinf7-kraus"></a>

<!-- formal-statement-start -->
> **定義（Kraus表示）**  
> 有限次元複素Hilbert空間 $H_{\mathrm{in}},H_{\mathrm{out}}$ 間の線形写像 $\Phi:L(H_{\mathrm{in}})\to L(H_{\mathrm{out}})$ に対し、有限個の行列 $K_\alpha:H_{\mathrm{in}}\to H_{\mathrm{out}}$（$1\le\alpha\le r$）が存在して

$$
\Phi(X)=\sum_{\alpha=1}^rK_\alpha X K_\alpha^\dagger
\quad(X\in L(H_{\mathrm{in}}))
$$

> と書けるとき、これを**Kraus表示**と呼び、$K_\alpha$ を**Kraus作用素**と呼ぶ。各 $K_\alpha$ は $d_{\mathrm{out}}\times d_{\mathrm{in}}$ 行列でよい。
<!-- formal-statement-end -->

<!-- definition-example-start: def-qinf7-kraus -->
### 定義の確認：計算基底を忘れて初期化する操作

**定義の確認**：作用素の入出力の型と、任意の入力 $X$ に対して指定のKraus和が成立することを確かめます。

$H_{\mathrm{in}}=H_{\mathrm{out}}=\mathbb C^2$ とします。計算基底のどちらを入力しても $|0\rangle$ に初期化したいので、各基底成分を取り出す $\langle j|$ と出力を作る $|0\rangle$ を組み合わせ、

$$
K_0=|0\rangle\langle0|,\qquad K_1=|0\rangle\langle1|
$$

と選びます。基底への作用は $K_0|0\rangle=K_1|1\rangle=|0\rangle$、$K_0|1\rangle=K_1|0\rangle=0$ です。入力基底に関する第 $i$ 列が出力 $K_j|i\rangle$ を表すので、これらは二次元から二次元への行列になります。随伴積は

$$
K_0^\dagger K_0=|0\rangle\langle0|,\qquad
K_1^\dagger K_1=|1\rangle\langle1|
$$

です。一般の $X=\sum_{i,k}x_{ik}|i\rangle\langle k|$ について、両側の $\langle j|$ と $|j\rangle$ が $(j,j)$ 成分だけを選ぶため、

$$
K_0XK_0^\dagger=x_{00}|0\rangle\langle0|,\qquad
K_1XK_1^\dagger=x_{11}|0\rangle\langle0|,
$$

ゆえに $\Phi(X)=(\operatorname{Tr}X)|0\rangle\langle0|$ と再現でき、定義どおりKraus表示です。密度演算子なら入力によらず $|0\rangle\langle0|$ に初期化されます。
<!-- definition-example-end -->

<a id="thm-qinf7-kraus-cptp"></a>

<!-- formal-statement-start -->
> **定理（Kraus表示からの完全正値性とトレース保存条件）**  
> 有限次元複素Hilbert空間 $H_{\mathrm{in}},H_{\mathrm{out}}$ 間の線形写像 $\Phi$ が [Kraus表示](#def-qinf7-kraus)

$$
\Phi(X)=\sum_{\alpha=1}^rK_\alpha X K_\alpha^\dagger
$$

> を持つなら、$\Phi$ は完全正である。さらに $\Phi$ がトレースを保存することと、次の**完全性関係**は同値である。

$$
\sum_{\alpha=1}^rK_\alpha^\dagger K_\alpha=I_{H_{\mathrm{in}}}.
$$

> 特にKraus表示を持つ写像が量子チャネルであるための必要十分条件は、この完全性関係である。
<!-- formal-statement-end -->

### 証明の見取り図

補助系を加えても各項は $(I\otimes K_\alpha)Y(I\otimes K_\alpha^\dagger)$ という正値作用素になります。トレースの循環性を使うと、トレース保存は $\sum K_\alpha^\dagger K_\alpha$ と入力行列 $X$ の積のトレースで判定できます。逆向きはすべての $X$ で検査することが重要です。

<!-- proof-start -->
### 証明

任意の正整数 $n$ と $Y\ge0$（$Y\in L(\mathbb C^n\otimes H_{\mathrm{in}})$）に対し、

$$
(\mathrm{id}_n\otimes\Phi)(Y)
=\sum_\alpha(I_n\otimes K_\alpha)Y(I_n\otimes K_\alpha^\dagger).
$$

任意の $w$ について第 $\alpha$ 項の二次形式は

$$
\langle(I_n\otimes K_\alpha^\dagger)w,
Y(I_n\otimes K_\alpha^\dagger)w\rangle\ge0.
$$

和も正なので $\Phi$ は完全正です。次に $S=\sum_\alpha K_\alpha^\dagger K_\alpha\in L(H_{\mathrm{in}})$ と置くと、矩形行列にも成立するトレースの循環性から

$$
\begin{aligned}
\operatorname{Tr}\Phi(X)
&=\sum_\alpha\operatorname{Tr}(K_\alpha XK_\alpha^\dagger)\\
&=\sum_\alpha\operatorname{Tr}(K_\alpha^\dagger K_\alpha X)
=\operatorname{Tr}(SX).
\end{aligned}
$$

$S=I$ なら直ちにトレース保存です。逆に全 $X$ で $\operatorname{Tr}((S-I)X)=0$ なら、入力空間の正規直交基底に関する行列単位 $E_{ji}=|j\rangle\langle i|$ を $X$ に代入して

$$
0=\operatorname{Tr}((S-I)E_{ji})=(S-I)_{ij}
$$

を各 $i,j$ について得ます。よって $S=I$ です。$\square$
<!-- proof-end -->

この条件は入力側の恒等演算子についての等式です。入力と出力の次元が異なる場合、$\sum_\alpha K_\alpha K_\alpha^\dagger=I_{H_{\mathrm{out}}}$ を要求しているわけではありません。

## 3. 完全正写像は必ずKraus表示を持つ

先ほどは「Kraus表示があれば完全正」と示しました。逆に、完全正と定義された写像にKraus作用素を構成できることを証明します。これによりKraus形式が、単なる便利な例ではなく、**有限次元の完全正写像全体の表示**だと分かります。

<a id="thm-qinf7-kraus-existence"></a>

<!-- formal-statement-start -->
> **定理（有限次元完全正写像のKraus表示）**  
> 有限次元複素Hilbert空間 $H_{\mathrm{in}},H_{\mathrm{out}}$ と複素線形写像 $\Phi:L(H_{\mathrm{in}})\to L(H_{\mathrm{out}})$ について、$\Phi$ が完全正であることと、有限個の $K_\alpha:H_{\mathrm{in}}\to H_{\mathrm{out}}$ を用いて

$$
\Phi(X)=\sum_\alpha K_\alpha X K_\alpha^\dagger
$$

> と書けることは同値である。必要なKraus作用素の数は $d_{\mathrm{in}}d_{\mathrm{out}}$ 個以下にできる。さらに $\Phi$ がトレース保存なら、Kraus作用素は

$$
\sum_\alpha K_\alpha^\dagger K_\alpha=I_{H_{\mathrm{in}}}
$$

> を満たす。
<!-- formal-statement-end -->

### 証明の見取り図

任意の作用素は入力基底の行列単位 $E_{ij}=|i\rangle\langle j|$ から作れます。補助系に入力空間と同じ次元を用意し、$\sum_i|i\rangle\otimes|i\rangle$ という**規格化しない**ベクトルの射影へ $\mathrm{id}\otimes\Phi$ を作用させます。完全正値性によって得られる正の行列をスペクトル分解し、各固有ベクトルの成分を並べ替えるとKraus作用素の各列が決まります。この行列をチャネル判定に直接使う視点はQINF9で改めて扱います。

<!-- proof-start -->
### 証明

完全正写像 $\Phi$ をとり、$d=d_{\mathrm{in}}$ とします。入力空間の正規直交基底を $|i\rangle$（$1\le i\le d$）、出力の基底を $|a\rangle$（$1\le a\le d_{\mathrm{out}}$）とします。$|\Omega_d\rangle=\sum_i|i\rangle\otimes|i\rangle$ と置き、

$$
\begin{aligned}
C&=(\mathrm{id}_d\otimes\Phi)(|\Omega_d\rangle\langle\Omega_d|)\\
&=\sum_{i,j=1}^d|i\rangle\langle j|\otimes\Phi(E_{ij})
\end{aligned}
$$

を補助空間 $\mathbb C^d\otimes H_{\mathrm{out}}$ 上に作ります。$|\Omega_d\rangle\langle\Omega_d|\ge0$ であり、$\Phi$ は完全正なので $C\ge0$ です。もし $C=0$ なら、その $(i,j)$ 成分は $\Phi(E_{ij})=0$ であり、行列単位の線形結合で任意の入力を書けるため $\Phi=0$ です。この場合は一個の零作用素 $K_1=0$ がKraus表示を与えます。

以下 $C\ne0$ とします。$C$ は自己共役であり、[有限次元のスペクトル定理](../../../基礎科目/LA/LA5/index.md#thm-la5-normal-spectral)を適用できます。固有値が非負であることは、固有ベクトル $u$ について $\langle u,Cu\rangle=\lambda\|u\|^2\ge0$ から分かります。正固有値だけを残し、$1\le r=\operatorname{rank}C\le d\,d_{\mathrm{out}}$ として

$$
C=\sum_{\alpha=1}^r|w_\alpha\rangle\langle w_\alpha|
$$

と書けます。ここで $w_\alpha$ は、$C$ の正固有値 $\lambda_\alpha$ の正規直交固有ベクトル $u_\alpha$ に $\sqrt{\lambda_\alpha}$ を掛けたものです。各 $w_\alpha$ を

$$
|w_\alpha\rangle
=\sum_{i=1}^d|i\rangle\otimes|k_{\alpha i}\rangle,
\qquad |k_{\alpha i}\rangle\in H_{\mathrm{out}}
$$

と展開します。行列 $K_\alpha:H_{\mathrm{in}}\to H_{\mathrm{out}}$ を、入力基底の第 $i$ 列が $K_\alpha|i\rangle=|k_{\alpha i}\rangle$ となるように定めます。

両側で補助系の $(i,j)$ 成分、つまり $(\langle i|\otimes I_{H_{\mathrm{out}}})C(|j\rangle\otimes I_{H_{\mathrm{out}}})$ を比較します。$C$ の定義式へ代入すると、$\langle i|s\rangle\langle t|j\rangle=\delta_{is}\delta_{tj}$ により $\Phi(E_{ij})$ だけが残ります。他方 $w_\alpha$ の基底展開を代入すると、同じ成分は

$$
\sum_{\alpha=1}^r
|k_{\alpha i}\rangle\langle k_{\alpha j}|
=\sum_{\alpha=1}^rK_\alpha E_{ij}K_\alpha^\dagger
$$

です。従って、すべての $i,j$ で

$$
\Phi(E_{ij})=\sum_\alpha K_\alpha E_{ij}K_\alpha^\dagger.
$$

任意の $X$ は $X=\sum_{i,j}x_{ij}E_{ij}$ なので、両辺の線形性によりKraus表示が成り立ちます。逆向きの「Kraus表示 $\Rightarrow$ 完全正」とトレース保存の場合の完全性関係は、どちらも[Kraus表示からの完全正値性とトレース保存条件](#thm-qinf7-kraus-cptp)から従います。$\square$
<!-- proof-end -->

この証明は、入力の $d$ 個の基底方向と出力の $d_{\mathrm{out}}$ 個の成分を掛けた $dd_{\mathrm{out}}$ 次元の正半定値行列を使います。得られる作用素数の上界は次元だけに依存します。Kraus表示そのものは一般に一意ではありません。例えば同じチャネルをより多くのKraus作用素で書くこともできます。

実際、$H_{\mathrm{in}}=H_{\mathrm{out}}=\mathbb C^2$ 上の恒等チャネル $\Phi(X)=X$ は、一つのKraus作用素 $K_1=I$ でも、二つの作用素 $L_1=L_2=I/\sqrt2$ でも表せます。後者では

$$
L_1XL_1^\dagger+L_2XL_2^\dagger=\frac12X+\frac12X=X,
\qquad
L_1^\dagger L_1+L_2^\dagger L_2=I.
$$

したがってKraus作用素の個数や個々の行列から、チャネルそのものを一意に識別することはできません。

<a id="prop-qinf7-composition"></a>

<!-- formal-statement-start -->
> **命題（チャネルの合成と古典的混合）**  
> 有限次元の量子チャネル $\Phi:L(H_A)\to L(H_B)$、$\Psi:L(H_B)\to L(H_C)$ がKraus作用素 $\{K_\alpha\}$、$\{L_\beta\}$ を持つとする。このとき $\Psi\circ\Phi$ も量子チャネルであり、Kraus作用素に $\{L_\beta K_\alpha\}_{\alpha,\beta}$ を取れる。また同じ入出力空間を持つチャネル $\Phi,\Psi$ と $0\le q\le1$ に対し、$(1-q)\Phi+q\Psi$ も量子チャネルである。
<!-- formal-statement-end -->

### 証明の見取り図

合成は各Kraus行列を順番に掛け、混合は重みの平方根を掛けて一つのKraus族へ結合します。いずれも完全性関係が保持されます。

<!-- proof-start -->
### 証明

合成について

$$
\begin{aligned}
(\Psi\circ\Phi)(X)
&=\sum_\beta L_\beta\Bigl(\sum_\alpha K_\alpha XK_\alpha^\dagger\Bigr)L_\beta^\dagger\\
&=\sum_{\beta,\alpha}(L_\beta K_\alpha)X(L_\beta K_\alpha)^\dagger.
\end{aligned}
$$

また $\sum_\beta L_\beta^\dagger L_\beta=I_{H_B}$ を使えば

$$
\begin{aligned}
\sum_{\alpha,\beta}(L_\beta K_\alpha)^\dagger(L_\beta K_\alpha)
&=\sum_\alpha K_\alpha^\dagger
\Bigl(\sum_\beta L_\beta^\dagger L_\beta\Bigr)K_\alpha\\
&=\sum_\alpha K_\alpha^\dagger K_\alpha=I_{H_A}.
\end{aligned}
$$

混合には $\{\sqrt{1-q}K_\alpha\}_\alpha$ と $\{\sqrt q L_\beta\}_\beta$ を合わせて使えます。この族の随伴積の和は $(1-q)I+qI=I$ です。[Kraus表示からの完全正値性とトレース保存条件](#thm-qinf7-kraus-cptp)により、どちらも量子チャネルです。$\square$
<!-- proof-end -->

入力と出力の次元や作用素の順序を確かめるには、この積の式が便利です。雑音を二回通すとき、一般には $L_\beta K_\alpha$ と $K_\alpha L_\beta$ は交換できません。

## 4. 三つのqubit雑音を計算する

以下では $H=\mathbb C^2$、計算基底 $|0\rangle,|1\rangle$ を使います。$I,X,Y,Z$ はPauli行列

$$
I=\begin{pmatrix}1&0\\0&1\end{pmatrix},\quad
X=\begin{pmatrix}0&1\\1&0\end{pmatrix},\quad
Y=\begin{pmatrix}0&-i\\i&0\end{pmatrix},\quad
Z=\begin{pmatrix}1&0\\0&-1\end{pmatrix}
$$

です。$X^\dagger X=Y^\dagger Y=Z^\dagger Z=I$ です。一般の入力行列を

$$
\rho=\begin{pmatrix}a&b\\\overline b&d\end{pmatrix},
\quad a,d\ge0,\quad a+d=1,\quad |b|^2\le ad
$$

と表します。これは計算基底における行列表示です。[密度演算子の定義](../QINF2/index.md#def-qinf2-ensemble-density)の自己共役性は非対角成分の共役関係に、トレース1は $a+d=1$ に対応します。

正半定値性は任意のベクトルに対する二次形式が非負という条件です。まず基底ベクトル $|0\rangle,|1\rangle$ を代入すると $a,d\ge0$ が必要です。さらにこの自己共役行列の固有値は、特性方程式

$$
t^2-(a+d)t+(ad-|b|^2)=0
$$

の二根です。[有限次元のスペクトル定理](../../../基礎科目/LA/LA5/index.md#thm-la5-normal-spectral)より二次形式の非負性と固有値の非負性は同値です。固有値の和は $a+d=1>0$ なので、積 $ad-|b|^2\ge0$ が残りの必要十分条件です。これで行列に課した条件が元の定義から導かれ、逆に密度演算子であることも判定できます。

### 4.1 位相緩和（dephasing）

位相緩和では、$|0\rangle$ と $|1\rangle$ の個別の確率は変えず、両者の干渉に関わる非対角成分だけを減らします。非対角成分の残存率を $0\le\lambda\le1$ として、Kraus作用素を

$$
K_0=\sqrt{\frac{1+\lambda}{2}}I,\qquad
K_1=\sqrt{\frac{1-\lambda}{2}}Z
$$

と取ります。両係数は非負で、$K_0^\dagger K_0+K_1^\dagger K_1=I$ です。したがって[完全性条件](#thm-qinf7-kraus-cptp)から量子チャネルです。$Z\rho Z=\begin{pmatrix}a&-b\\-\overline b&d\end{pmatrix}$ なので

$$
\begin{aligned}
\mathcal D_\lambda(\rho)
&=\frac{1+\lambda}{2}\rho+\frac{1-\lambda}{2}Z\rho Z\\
&=\begin{pmatrix}a&\lambda b\\\lambda\overline b&d\end{pmatrix}.
\end{aligned}
$$

$\lambda=1$ は恒等写像、$\lambda=0$ は完全位相緩和で、非対角成分が0になります。$|+\rangle=(|0\rangle+|1\rangle)/\sqrt2$ では

$$
\mathcal D_\lambda(|+\rangle\langle+|)
=\frac12\begin{pmatrix}1&\lambda\\\lambda&1\end{pmatrix},
$$

で、固有値は $(1+\lambda)/2,(1-\lambda)/2$ と非負です。ここで非対角成分が消えても、計算基底の各測定結果の確率はともに $1/2$ のままです。

### 4.2 脱分極（depolarizing）

脱分極は、入力状態を確率 $p$ で最大混合状態へ置き換える作用です。$0\le p\le1$ に対して

$$
\mathcal P_p(X)=(1-p)X+\frac p2(\operatorname{Tr}X)I
$$

と線形写像として定義します。密度演算子 $\rho$ では $\operatorname{Tr}\rho=1$ なので $\mathcal P_p(\rho)=(1-p)\rho+pI/2$ です。次のKraus作用素がこの写像を実現します。

$$
K_0=\sqrt{1-\frac{3p}{4}}I,\quad
K_1=\sqrt{\frac p4}X,\quad
K_2=\sqrt{\frac p4}Y,\quad
K_3=\sqrt{\frac p4}Z.
$$

非負の平方根が定義でき、随伴積の和は

$$
\sum_{\alpha=0}^3K_\alpha^\dagger K_\alpha
=\left(1-\frac{3p}{4}+3\frac p4\right)I=I
$$

です。[Krausの完全性条件](#thm-qinf7-kraus-cptp)によってトレースを保存し、完全正でもあります。実際、任意の $2\times2$ 行列 $X_0$ をPauli基底で

$$
X_0=c_0I+c_xX+c_yY+c_zZ,\qquad c_0=\frac12\operatorname{Tr}X_0
$$

と展開します。Pauli行列の積を直接計算すると、異なる二つは反交換し、同じ行列の二乗は $I$ です。例えば $XY=-YX$、$XZ=-ZX$ より

$$
XXX+YXY+ZXZ=X-X-X=-X.
$$

$Y,Z$ の成分でも同様の積を確かめると、$X,Y,Z$ の共役和では $I$ の係数が3倍、各Pauli成分が $-1$ 倍になるため

$$
XX_0X+YX_0Y+ZX_0Z
=3c_0I-c_xX-c_yY-c_zZ
=2(\operatorname{Tr}X_0)I-X_0.
$$

従ってKraus和に代入すると

$$
\begin{aligned}
\sum_{\alpha=0}^3K_\alpha X_0K_\alpha^\dagger
&=\left(1-\frac{3p}{4}\right)X_0+\frac p4\{2(\operatorname{Tr}X_0)I-X_0\}\\
&=(1-p)X_0+\frac p2(\operatorname{Tr}X_0)I.
\end{aligned}
$$

$p=0$ なら恒等、$p=1$ なら任意の入力密度演算子が $I/2$ になります。位相緩和と違い、脱分極は対角の偏りも縮めます。

### 4.3 振幅減衰（amplitude damping）

振幅減衰では、二準位模型で励起した側を表す $|1\rangle$ が確率 $\gamma$ で $|0\rangle$ へ緩和します。$0\le\gamma\le1$ に対し

$$
K_0=\begin{pmatrix}1&0\\0&\sqrt{1-\gamma}\end{pmatrix},
\qquad
K_1=\begin{pmatrix}0&\sqrt\gamma\\0&0\end{pmatrix}.
$$

$K_0$ は「緩和が起きない」枝、$K_1$ は励起から基底への遷移の枝を表します。随伴積は

$$
K_0^\dagger K_0=\begin{pmatrix}1&0\\0&1-\gamma\end{pmatrix},
\qquad
K_1^\dagger K_1=\begin{pmatrix}0&0\\0&\gamma\end{pmatrix}
$$

で、和は $I$ です。行列積を順に実行すると

$$
K_0\rho K_0^\dagger
=\begin{pmatrix}
a&\sqrt{1-\gamma}\,b\\
\sqrt{1-\gamma}\,\overline b&(1-\gamma)d
\end{pmatrix},
\qquad
K_1\rho K_1^\dagger
=\begin{pmatrix}\gamma d&0\\0&0\end{pmatrix}.
$$

したがって

$$
\mathcal A_\gamma(\rho)
=\begin{pmatrix}
a+\gamma d&\sqrt{1-\gamma}\,b\\
\sqrt{1-\gamma}\,\overline b&(1-\gamma)d
\end{pmatrix}.
$$

出力のトレースは $a+\gamma d+(1-\gamma)d=a+d=1$ です。例えば

$$
\mathcal A_\gamma(|1\rangle\langle1|)
=\gamma|0\rangle\langle0|+(1-\gamma)|1\rangle\langle1|,
\quad
\mathcal A_\gamma(|0\rangle\langle0|)=|0\rangle\langle0|.
$$

位相緩和や脱分極とは違い、これは単位作用素を一般には単位作用素へ送りません。

$$
\mathcal A_\gamma(I)
=\begin{pmatrix}1+\gamma&0\\0&1-\gamma\end{pmatrix}\ne I
\qquad(\gamma>0).
$$

[Krausのトレース保存条件](#thm-qinf7-kraus-cptp)は $\sum K_\alpha^\dagger K_\alpha=I$ ですが、**単位作用素を保存すること**は $\sum K_\alpha K_\alpha^\dagger=I$ という別条件です。振幅減衰は前者を満たし、後者は満たしません。

## 5. 観測しない測定と量子チャネル

[QINF5の測定instrument](../QINF5/index.md#def-qinf5-instrument)が結果 $i$ ごとに測定演算子 $M_{i\alpha}$ を持つとき、結果を捨てた写像

$$
\Phi(X)=\sum_{i,\alpha}M_{i\alpha}XM_{i\alpha}^\dagger
$$

は $\sum_{i,\alpha}M_{i\alpha}^\dagger M_{i\alpha}=I$ と[KrausのCPTP条件](#thm-qinf7-kraus-cptp)により量子チャネルです。観測結果を記録して条件づけることと、結果を捨てて平均することは違います。条件付き結果の状態は（確率が正の場合）正規化が必要ですが、非選択チャネルの出力は最初からトレース1です。

状態を出力へ送る $\Phi$ に対し、出力側の観測量 $B$ の期待値 $\operatorname{Tr}(\Phi(\rho)B)$ を、入力 $\rho$ だけを使って計算したい場合があります。トレース内の作用素を移すと、入力側に作用する $\Phi^*(B)$ が自然に現れます。この観測量の引き戻しを**双対作用**と呼び、次の命題で式を定めます。

<a id="prop-qinf7-adjoint"></a>

<!-- formal-statement-start -->
> **命題（チャネルと観測量の双対作用）**  
> 有限次元量子チャネル $\Phi:L(H_{\mathrm{in}})\to L(H_{\mathrm{out}})$ がKraus表示 $\Phi(X)=\sum_\alpha K_\alpha X K_\alpha^\dagger$ を持つとする。出力の観測量 $B\in L(H_{\mathrm{out}})$ に対し

$$
\Phi^*(B)=\sum_\alpha K_\alpha^\dagger BK_\alpha
$$

> と定めれば、任意の入力作用素 $X$ に対し

$$
\operatorname{Tr}(\Phi(X)B)=\operatorname{Tr}(X\Phi^*(B))
$$

> が成立し、$\Phi^*(I_{H_{\mathrm{out}}})=I_{H_{\mathrm{in}}}$ である。
<!-- formal-statement-end -->

### 証明の見取り図

左辺の各項でトレースの循環性を用い、$\Phi^*$ の式を得ます。単位作用素を入れた場合は完全性関係へ戻ります。

<!-- proof-start -->
### 証明

矩形作用素にも許されるトレースの循環性から

$$
\begin{aligned}
\operatorname{Tr}(\Phi(X)B)
&=\sum_\alpha\operatorname{Tr}(K_\alpha XK_\alpha^\dagger B)\\
&=\sum_\alpha\operatorname{Tr}(XK_\alpha^\dagger BK_\alpha)\\
&=\operatorname{Tr}\left(X\sum_\alpha K_\alpha^\dagger BK_\alpha\right).
\end{aligned}
$$

$B=I_{H_{\mathrm{out}}}$ とし、[Krausの完全性関係](#thm-qinf7-kraus-cptp)を適用すれば

$$
\Phi^*(I_{H_{\mathrm{out}}})
=\sum_\alpha K_\alpha^\dagger K_\alpha=I_{H_{\mathrm{in}}},
$$

となります。$\square$
<!-- proof-end -->

入力に作用するチャネルと、出力側の観測量を入力側へ引き戻す $\Phi^*$ の違いにも注意しましょう。例えば振幅減衰が単位作用素 $I$ を保存しないことと、その双対が単位作用素を保存することは両立します。

## 6. 演習

<a id="ex-qinf7-a01"></a>
### QINF7-A01 完全性関係を判定する

- Level: A

$H=\mathbb C^2$、$Z=\operatorname{diag}(1,-1)$ とする。$K_0=\sqrt{3/4}I$、$K_1=\sqrt{1/4}Z$ は量子チャネルを与えるか、Kraus完全性関係と完全正値性の両方から答えよ。また $|+\rangle=(|0\rangle+|1\rangle)/\sqrt2$ の出力を求めよ。

<!-- solution-start -->
### 詳細解答

各行列の随伴積は $K_0^\dagger K_0=3I/4$、$K_1^\dagger K_1=I/4$ であり、和は $I$ です。任意の補助系の正半定値 $Y$ に対する出力は $(I\otimes K_0)Y(I\otimes K_0^\dagger)+(I\otimes K_1)Y(I\otimes K_1^\dagger)\ge0$ なので完全正です。[KrausのCPTP条件](#thm-qinf7-kraus-cptp)からチャネルです。$|+\rangle\langle+|=\frac12\begin{pmatrix}1&1\\1&1\end{pmatrix}$、$Z|+\rangle\langle+|Z=\frac12\begin{pmatrix}1&-1\\-1&1\end{pmatrix}$ を代入すると

$$
\Phi(|+\rangle\langle+|)
=\frac34\cdot\frac12\begin{pmatrix}1&1\\1&1\end{pmatrix}
+\frac14\cdot\frac12\begin{pmatrix}1&-1\\-1&1\end{pmatrix}
=\frac12\begin{pmatrix}1&1/2\\1/2&1\end{pmatrix}.
$$

入力の非対角成分は $1/2$ から $1/4$ に減ります。
<!-- solution-end -->

<a id="ex-qinf7-a02"></a>
### QINF7-A02 位相緩和と完全な干渉消失

- Level: A

$\rho=\begin{pmatrix}3/4&1/4\\1/4&1/4\end{pmatrix}$ に位相緩和 $\mathcal D_\lambda$ を施す。$\lambda=0,1/2,1$ の出力と、各出力の計算基底測定確率を求めよ。またそれぞれの正半定値性を確認せよ。

<!-- solution-start -->
### 詳細解答

まず入力はトレース1、行列式 $3/16-1/16=1/8>0$ なので正定値です。位相緩和の式へ代入すると

$$
\mathcal D_0(\rho)=\begin{pmatrix}3/4&0\\0&1/4\end{pmatrix},\quad
\mathcal D_{1/2}(\rho)=\begin{pmatrix}3/4&1/8\\1/8&1/4\end{pmatrix},\quad
\mathcal D_1(\rho)=\rho.
$$

対角成分はどれも $(3/4,1/4)$ で、[混合状態のBorn則](../QINF2/index.md#prop-qinf2-trace-born)による測定確率も同じです。行列式は順に $3/16$、$3/16-1/64=11/64$、$1/8$ で、対角が非負かつ行列式が非負なのでいずれも正半定値です。
<!-- solution-end -->

<a id="ex-qinf7-a03"></a>
### QINF7-A03 脱分極後の固有値

- Level: A

$0\le p\le1$、$\rho=|0\rangle\langle0|$ に対し、$\mathcal P_p(\rho)$ の行列・固有値・トレースを求めよ。$p=1$ の意味を説明せよ。

<!-- solution-start -->
### 詳細解答

$\rho=\operatorname{diag}(1,0)$、$I/2=\operatorname{diag}(1/2,1/2)$ なので

$$
\mathcal P_p(\rho)
=(1-p)\begin{pmatrix}1&0\\0&0\end{pmatrix}
+\frac p2\begin{pmatrix}1&0\\0&1\end{pmatrix}
=\begin{pmatrix}1-p/2&0\\0&p/2\end{pmatrix}.
$$

対角行列だから固有値は $1-p/2,p/2$ で、$0\le p\le1$ により非負です。和は1で、トレースが保存されています。$p=1$ では $I/2$ となり、初期状態の偏りが完全に失われます。
<!-- solution-end -->

<a id="ex-qinf7-a04"></a>
### QINF7-A04 振幅減衰の確率

- Level: A

$\gamma=1/4$ の振幅減衰チャネルを、入力 $\rho=|1\rangle\langle1|$ に施す。出力と計算基底測定の確率を求め、Kraus完全性関係も確認せよ。

<!-- solution-start -->
### 詳細解答

$K_0=\operatorname{diag}(1,\sqrt3/2)$、$K_1=\begin{pmatrix}0&1/2\\0&0\end{pmatrix}$ です。従って

$$
K_0^\dagger K_0=\operatorname{diag}(1,3/4),\qquad
K_1^\dagger K_1=\operatorname{diag}(0,1/4),
$$

で和は $I$ です。入力を各枝に作用させれば

$$
K_0\rho K_0^\dagger=\frac34|1\rangle\langle1|,
\qquad
K_1\rho K_1^\dagger=\frac14|0\rangle\langle0|.
$$

従って出力は $\operatorname{diag}(1/4,3/4)$ で、Born確率は $P(0)=1/4$、$P(1)=3/4$ です。
<!-- solution-end -->

<a id="ex-qinf7-b01"></a>
### QINF7-B01 正値性と完全正値性を区別する

- Level: B

$T(X)=X^{\mathsf T}$ を $\mathbb C^2$ 上の転置とする。(1) $T$ が正写像・トレース保存写像であること、(2) $|\Omega\rangle=(|00\rangle+|11\rangle)/\sqrt2$ の密度演算子に $\mathrm{id}_2\otimes T$ を施した行列、(3) 反対称状態の期待値とCP判定を示せ。

<!-- solution-start -->
### 詳細解答

$X\ge0$ のとき $X=B^\dagger B$ と因数分解すれば $X^{\mathsf T}=\overline B^{\dagger}\overline B\ge0$ です（または本文の二次形式による確認でもよい）。対角が不変なので $\operatorname{Tr}T(X)=\operatorname{Tr}X$ です。Bell射影を展開すると

$$
|\Omega\rangle\langle\Omega|
=\frac12\bigl(|00\rangle\langle00|+|00\rangle\langle11|
+|11\rangle\langle00|+|11\rangle\langle11|\bigr).
$$

第二系だけを転置すると、中央の二項が $|01\rangle\langle10|$、$|10\rangle\langle01|$ へ変わり、基底 $(00,01,10,11)$ で

$$
(\mathrm{id}_2\otimes T)(|\Omega\rangle\langle\Omega|)
=\frac12\begin{pmatrix}
1&0&0&0\\
0&0&1&0\\
0&1&0&0\\
0&0&0&1
\end{pmatrix}.
$$

単位ベクトル $|\psi^-\rangle=(|01\rangle-|10\rangle)/\sqrt2$ を掛けると固有値 $-1/2$ を得ます。正値性が破れるため $T$ はCPでなく、トレース保存でも量子チャネルにはなりません。
<!-- solution-end -->

<a id="ex-qinf7-b02"></a>
### QINF7-B02 位相緩和を続けて施す

- Level: B

位相緩和 $\mathcal D_\lambda,\mathcal D_\mu$（$0\le\lambda,\mu\le1$）を同じqubitへ順に施す。合成を行列要素で計算し、$\mathcal D_\mu\circ\mathcal D_\lambda=\mathcal D_{\lambda\mu}$ を示せ。合成のKraus作用素が完全性関係を満たすことも一般論から確認せよ。

<!-- solution-start -->
### 詳細解答

入力 $\rho=\begin{pmatrix}a&b\\\overline b&d\end{pmatrix}$ にまず $\mathcal D_\lambda$ を適用すると $\rho'=\begin{pmatrix}a&\lambda b\\\lambda\overline b&d\end{pmatrix}$ です。次に $\mathcal D_\mu$ では対角を固定し、非対角へさらに $\mu$ を掛けるので

$$
(\mathcal D_\mu\circ\mathcal D_\lambda)(\rho)
=\begin{pmatrix}a&\mu\lambda b\\\mu\lambda\overline b&d\end{pmatrix}
=\mathcal D_{\lambda\mu}(\rho).
$$

各Kraus族を $\{K_\alpha\},\{L_\beta\}$ とすれば、合成の族は $\{L_\beta K_\alpha\}$ です。[合成の命題](#prop-qinf7-composition)の中間式を使うと

$$
\sum_{\alpha,\beta}(L_\beta K_\alpha)^\dagger(L_\beta K_\alpha)
=\sum_\alpha K_\alpha^\dagger I K_\alpha=I.
$$

$\lambda\mu\in[0,1]$ なので、この合成は再び指定範囲の位相緩和です。
<!-- solution-end -->

<a id="ex-qinf7-b03"></a>
### QINF7-B03 振幅減衰を二段にする

- Level: B

同じqubitへ振幅減衰 $\mathcal A_\gamma$、続いて $\mathcal A_\delta$（$0\le\gamma,\delta\le1$）を施す。合成が $\mathcal A_{\gamma+\delta-\gamma\delta}$ であることを、対角と非対角の両方について示せ。また合成パラメータの範囲を確かめよ。

<!-- solution-start -->
### 詳細解答

$\rho=\begin{pmatrix}a&b\\\overline b&d\end{pmatrix}$ の第一段の出力は

$$
\rho'=\begin{pmatrix}
a+\gamma d&\sqrt{1-\gamma}\,b\\
\sqrt{1-\gamma}\,\overline b&(1-\gamma)d
\end{pmatrix}.
$$

第二段では、右下成分が $(1-\delta)(1-\gamma)d$、左上成分が

$$
(a+\gamma d)+\delta(1-\gamma)d
=a+(\gamma+\delta-\gamma\delta)d
$$

となります。非対角は $\sqrt{1-\delta}\sqrt{1-\gamma}\,b$ です。$\eta=\gamma+\delta-\gamma\delta=1-(1-\gamma)(1-\delta)$ と置くと $1-\eta=(1-\gamma)(1-\delta)$ ですから、全成分が $\mathcal A_\eta(\rho)$ に一致します。$0\le(1-\gamma)(1-\delta)\le1$ より $0\le\eta\le1$ です。
<!-- solution-end -->

<a id="ex-qinf7-b04"></a>
### QINF7-B04 非選択測定と条件付き測定

- Level: B

$H=\mathbb C^2$ の計算基底射影 $P_0=|0\rangle\langle0|,P_1=|1\rangle\langle1|$ を測定演算子とする。入力 $|+\rangle\langle+|$ について、次を示せ。

1. 各結果の確率と条件付き状態を求める。
2. 結果を捨てたチャネルの出力を計算する。
3. 同チャネルと $\mathcal D_0$ が一致することを確かめる。

<!-- solution-start -->
### 詳細解答

$\rho_+=|+\rangle\langle+|=\frac12\begin{pmatrix}1&1\\1&1\end{pmatrix}$ とします。$P_0\rho_+P_0=\frac12P_0$、$P_1\rho_+P_1=\frac12P_1$ です。[instrumentの確率・状態更新](../QINF5/index.md#prop-qinf5-state-update)により確率はそれぞれ $1/2$、確率で割った条件付き状態は $P_0,P_1$ です。一方、結果を捨てれば

$$
\Phi(\rho_+)=P_0\rho_+P_0+P_1\rho_+P_1
=\frac12P_0+\frac12P_1=\frac12I.
$$

任意の $X=\begin{pmatrix}x_{00}&x_{01}\\x_{10}&x_{11}\end{pmatrix}$ について同じ和は $\operatorname{diag}(x_{00},x_{11})$ となり、位相緩和の $\lambda=0$ の式と一致します。条件付き状態と非選択状態を同一視してはいけません。
<!-- solution-end -->

<a id="ex-qinf7-c01"></a>
### QINF7-C01 雑音を並べる順序を変える

- Level: C

$H=\mathbb C^2$、$0\le p,\gamma\le1$ とする。脱分極 $\mathcal P_p$ と振幅減衰 $\mathcal A_\gamma$ を用い、入力 $\rho_0=|1\rangle\langle1|$ を考える。

1. $\mathcal A_\gamma\circ\mathcal P_p$ と $\mathcal P_p\circ\mathcal A_\gamma$ の出力密度行列を求める。
2. 出力の $|0\rangle$ 測定確率の差を求め、どの条件で順序に依らないかを判定する。
3. 各合成がCPTPである根拠をKraus作用素の完全性関係まで戻って述べる。
4. $\gamma>0$ で振幅減衰が単位作用素を保たないことと、上記2種類の合成の非可換性の関係を説明する。

<!-- solution-start -->
### 詳細解答

**1. 二つの順序を計算する。** 入力 $\rho_0=\operatorname{diag}(0,1)$ にまず脱分極を施すと

$$
\mathcal P_p(\rho_0)
=(1-p)\operatorname{diag}(0,1)+pI/2
=\operatorname{diag}(p/2,1-p/2).
$$

続けて振幅減衰を施すと、右下人口の $\gamma$ 倍が左上へ移るため

$$
(\mathcal A_\gamma\circ\mathcal P_p)(\rho_0)
=\operatorname{diag}\left(
\frac p2+\gamma\left(1-\frac p2\right),
(1-\gamma)\left(1-\frac p2\right)
\right).
$$

逆順では $\mathcal A_\gamma(\rho_0)=\operatorname{diag}(\gamma,1-\gamma)$ なので

$$
\begin{aligned}
(\mathcal P_p\circ\mathcal A_\gamma)(\rho_0)
&=(1-p)\operatorname{diag}(\gamma,1-\gamma)+pI/2\\
&=\operatorname{diag}\left((1-p)\gamma+\frac p2,\,
(1-p)(1-\gamma)+\frac p2\right).
\end{aligned}
$$

どちらもトレース1、非負の対角成分を持つことを確認できます。

**2. 順序の差。** 二つの $|0\rangle$ 確率の差（先に脱分極した方から逆順を引く）は

$$
\begin{aligned}
\Delta
&=\left[\frac p2+\gamma\left(1-\frac p2\right)\right]
-\left[(1-p)\gamma+\frac p2\right]\\
&=\frac{\gamma p}{2}.
\end{aligned}
$$

$p,\gamma\ge0$ なので順序に依らないのは $p=0$ または $\gamma=0$ のときに限ります。

**3. CPTPを確認する。** 各チャネルのKraus族を $\{K_\alpha\}$、$\{L_\beta\}$ とすると、例えば $\mathcal A_\gamma\circ\mathcal P_p$ では $\{L_\beta K_\alpha\}$ を用います。両者の完全性は本文の直接計算から既知で、

$$
\sum_{\alpha,\beta}K_\alpha^\dagger L_\beta^\dagger L_\beta K_\alpha
=\sum_\alpha K_\alpha^\dagger I K_\alpha=I.
$$

Kraus和ゆえ完全正でもあり、[合成の命題](#prop-qinf7-composition)によってCPTPです。逆順でも $K_\alpha L_\beta$ の完全性を同じ順序で検査できます。

**4. 非可換性の意味。** 脱分極は $\mathcal P_p(X)=(1-p)X+p(\operatorname{Tr}X)I/2$ であり、$\mathcal A_\gamma$ はトレースを保存するので、一般の $X$ に対し

$$
\begin{aligned}
(\mathcal A_\gamma\circ\mathcal P_p)(X)
&=(1-p)\mathcal A_\gamma(X)+\frac p2(\operatorname{Tr}X)\mathcal A_\gamma(I),\\
(\mathcal P_p\circ\mathcal A_\gamma)(X)
&=(1-p)\mathcal A_\gamma(X)+\frac p2(\operatorname{Tr}X)I.
\end{aligned}
$$

差は $p(\operatorname{Tr}X)(\mathcal A_\gamma(I)-I)/2$ です。本文で得た $\mathcal A_\gamma(I)=\operatorname{diag}(1+\gamma,1-\gamma)$ を代入すると、$\rho_0$ の測定確率差 $\gamma p/2$ が再び得られます。つまり振幅減衰が最大混合状態を固定しないことが、脱分極との順序差の原因です。
<!-- solution-end -->

## 7. 次へ

量子チャネルは、エンタングルした補助系を含めても正値性が保たれる完全正写像であり、トレース保存を加えて定義されます。有限次元ではKraus表示が必ず存在し、$\sum K_\alpha^\dagger K_\alpha=I$ だけでトレース保存を判定できます。位相緩和、脱分極、振幅減衰はどれも量子チャネルですが、消す情報と単位作用素を保つかどうかが異なります。

次のQINF8ではKraus作用素の添字を環境の直交基底と考え、等長写像と部分トレースとして同じチャネルを実現します。その際、環境へ何の情報が漏れたかを相補チャネルで見ることができます。
