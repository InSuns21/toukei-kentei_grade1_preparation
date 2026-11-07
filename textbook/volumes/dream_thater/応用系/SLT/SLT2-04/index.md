# SLT2-04 double descentの成立条件

前章では、固定された設計行列の[ridge予測リスク](../SLT2-03/index.md#thm-slt2-03-modewise-risk)を、信号の偏りと雑音の分散に分けた。そこでの特異値は最初から固定されていた。しかし特徴量の個数 $p$ を増やすと、設計行列そのものの大きさと特異値が変わる。**訓練点で完全に補間できる境目で、未知の入力への誤差がかえって大きくなる**ことはあるのだろうか。

この問いを検証するには、まず「何の期待値をどの乱数について取るか」を固定しなければならない。今回は行が独立な標準Gaussianベクトルとなる**等方設計**で、最小ノルム最小二乗推定を分析する。補間閾値近くの逆Gram行列を直接調べると、補間前後で異なる分母が現れる。ただしそれが全てのデータ・正則化・ニューラルネットで成り立つ法則だとは主張しない。

学習の流れは次のとおりである。

1. 標本外の予測誤差を、係数誤差に換算する。
2. Gaussianベクトルを直交射影したときの二乗長の逆数を計算する。
3. 補間前後の期待リスクを導出し、偏りと分散を分ける。
4. 低次元側の下降・補間ピーク・高次元側の下降が成立する条件と、成立しない例を比べる。

## 1. 固定設計からランダム設計へ

[設計行列](../../ML/ML1-04/index.md#def-ml1-04-design-matrix)は $X\in\mathbb R^{n\times p}$、$n,p$ は正整数とする。行 $x_i^{\mathsf T}$ は訓練入力を表し、今回だけは $x_i$ 自体も確率変数とする。各成分が独立な平均0・分散1の正規分布に従うとき、$x_i\sim N(0,I_p)$ と書く。任意の固定ベクトル $v\in\mathbb R^p$ について

$$
\mathbb E[x_i]=0,\qquad
\mathbb E[x_ix_i^{\mathsf T}]=I_p,\qquad
\mathbb E[(x_i^{\mathsf T}v)^2]=\|v\|_2^2
$$

が成り立つ。最後の式は成分表示で $\sum_{j,k}v_jv_k\mathbb E[x_{ij}x_{ik}]=\sum_jv_j^2$ と確かめられる。方向によらず二次モーメントが同じなので「等方」という。

真の係数 $\beta_\star\in\mathbb R^p$ は固定し、応答を $Y=X\beta_\star+\varepsilon$ とする。訓練雑音 $\varepsilon\in\mathbb R^n$ は $X$ と独立で、平均0、共分散 $\tau^2 I_n$（$\tau^2\ge0$）を持つ。雑音は正規分布である必要がない。推定量は[最小ノルム最小二乗解](../SLT2-02/index.md#thm-slt2-02-minimum-norm)

$$
\widehat\beta=X^\dagger Y
$$

とする。$X$ は連続分布なので、$p<n$ なら列フルランク、$p\ge n$ なら行フルランクがほとんど確実に成立する。実際、先に選んだ独立Gaussianベクトルの張る真部分空間へ次のGaussianベクトルが入る確率は0であり、これを順に適用すればよい。

訓練で使わない新しい入力 $x_{\mathrm{new}}\sim N(0,I_p)$ は、$X,\varepsilon$ と独立とする。新しい応答 $Y_{\mathrm{new}}=x_{\mathrm{new}}^{\mathsf T}\beta_\star+\varepsilon_{\mathrm{new}}$ の雑音も全てから独立で、平均0・分散 $\tau^2$ とする。「新しい入力での信号予測誤差」と「新しい応答への二乗誤差」は、後者が不可避の新規雑音を含む点で異なる。

<a id="def-slt2-04-gaussian-risk"></a>

<!-- formal-statement-start -->
> **定義（Gaussian等方設計と標本外予測リスク）**
> $n,p\ge1$、$X$ の $n$ 行が独立同分布 $N(0,I_p)$、$\beta_\star\in\mathbb R^p$ が固定、$Y=X\beta_\star+\varepsilon$ であり、$\varepsilon$ は $X$ と独立、平均0、共分散 $\tau^2I_n$ とする。$x_{\mathrm{new}}\sim N(0,I_p)$ は訓練標本と独立とする。任意の訓練標本から作った推定量 $\widehat\beta$ の標本外**信号予測リスク**を

$$
L_{n,p}=\mathbb E_{X,\varepsilon,x_{\mathrm{new}}}
\left[(x_{\mathrm{new}}^{\mathsf T}\widehat\beta
-x_{\mathrm{new}}^{\mathsf T}\beta_\star)^2\right]
=\mathbb E_{X,\varepsilon}\|\widehat\beta-\beta_\star\|_2^2
$$

> と定義する。期待値が発散する場合は $+\infty$ を許す。独立な平均0・分散 $\tau^2$ の新規雑音を含む応答の二乗予測誤差を $M_{n,p}$ とすると $M_{n,p}=L_{n,p}+\tau^2$ である。
<!-- formal-statement-end -->

<!-- definition-example-start: def-slt2-04-gaussian-risk -->
### 例：標本外誤差を係数誤差へ変える

**定義の確認**。訓練標本が実現した後の係数誤差を $\widehat\beta-\beta_\star=(1,-2)^{\mathsf T}$ とし、独立な新規入力 $x_{\mathrm{new}}=(Z_1,Z_2)^{\mathsf T}$ の各成分を標準正規分布とする。条件付きで

$$
\mathbb E_{x_{\mathrm{new}}}
[(Z_1-2Z_2)^2]
=\mathbb E[Z_1^2]-4\mathbb E[Z_1Z_2]+4\mathbb E[Z_2^2]
=1+0+4=5
$$

となり、係数誤差の二乗長 $1^2+(-2)^2=5$ に一致する。ここでは新規入力の独立性と等方性を実際に使った。新規雑音の分散が $\tau^2=2$ なら応答の二乗予測誤差は $5+2=7$ となる。新規入力の共分散が $I_2$ 以外なら一般に5にはならない。
<!-- definition-example-end -->

前章の[固定設計上のリスク](../SLT2-03/index.md#thm-slt2-03-modewise-risk)は同じ訓練点の真の平均応答 $X\beta_\star$ を予測する誤差だった。ここでは**独立な新しい入力**を評価するため、核方向も含む係数全体の誤差が現れる。

## 2. 小さい固有値が期待値を発散させる理由

最小二乗解は、$p<n$ なら $(X^{\mathsf T}X)^{-1}X^{\mathsf T}Y$、$p\ge n$ なら $X^{\mathsf T}(XX^{\mathsf T})^{-1}Y$ である。これらの公式は[最小ノルム解の定理](../SLT2-02/index.md#thm-slt2-02-minimum-norm)から従う。どちらもGram行列の逆行列を含み、正の固有値が極端に小さくなる標本では雑音が増幅される。

Gram行列とは、ベクトルの内積を並べた行列である。例えば列ベクトル $c_1,\ldots,c_p\in\mathbb R^n$ を持つ $X$ なら $(X^{\mathsf T}X)_{jk}=c_j^{\mathsf T}c_k$。ある列が他の列の張る空間に近いほど、残差の二乗長が小さくなる。まずその残差の逆数の期待値を計算しよう。

<a id="lem-slt2-04-gaussian-projection"></a>

<!-- formal-statement-start -->
> **補題（Gaussian射影の逆二乗長）**
> $m\ge k\ge1$、$g\sim N(0,I_m)$ とし、$g$ と独立な直交射影行列 $Q\in\mathbb R^{m\times m}$ がほとんど確実に階数 $k$ を持つとする。$U=g^{\mathsf T}Qg$ とおくと、$U>0$ はほとんど確実で、

$$
\mathbb E\frac1U=
\begin{cases}
\displaystyle\frac1{k-2},&k>2,\\
+\infty,&k=1,2.
\end{cases}
$$

> $Q$ が確率変数でも、$g$ から独立で階数が固定なら同じ結論である。
<!-- formal-statement-end -->

### 証明の見取り図

射影の像を最初の $k$ 座標に選び直せば、二乗長は独立な標準正規変数 $k$ 個の二乗和になる。逆数 $1/U$ は指数関数の積分で表し、Gaussian積分を一変数ずつ計算する。

<!-- proof-start -->
### 証明

$Q$ を固定して[条件付き期待値](../../../解析系/F0/F0-00P3A/index.md#def-f0-00p3a-conditional-expectation)を取る。直交射影の対称性・冪等性は

$$
Q^{\mathsf T}=Q,\qquad Q^2=Q
$$

である。[実対称行列のスペクトル定理](../../../基礎科目/F0/F0-00F1/index.md#thm-real-symmetric-spectral)で直交固有基底を選ぶ。各固有値 $\lambda$ は $\lambda^2=\lambda$ より0か1であり、階数が $k$ なので1の固有値はちょうど $k$ 個となる。

従って直交行列 $O$ を使って

$$
Q=O^{\mathsf T}\operatorname{diag}(I_k,0)O
$$

と書ける。標準Gaussianの密度は $\|g\|_2$ のみに依存し、直交変換は長さと体積を保つため、$Og$ も $N(0,I_m)$。したがって

$$
U=g^{\mathsf T}Qg=\sum_{j=1}^kZ_j^2
$$

となる。$Z_j$ は独立な標準正規変数であり、同時に全て0となる確率は0だから $U>0$ はほとんど確実である。$t\ge0$ について、密度のGaussian積分を平方完成で計算すると

$$
\begin{aligned}
\mathbb E[e^{-tZ_j^2}]
&=\frac{\int_{\mathbb R}e^{-(1/2+t)z^2}\,dz}
{\int_{\mathbb R}e^{-z^2/2}\,dz}
=(1+2t)^{-1/2},\\
\mathbb E[e^{-tU}]
&=\prod_{j=1}^k\mathbb E[e^{-tZ_j^2}]
=(1+2t)^{-k/2}.
\end{aligned}
$$

$U>0$ で $1/U=\int_0^\infty e^{-tU}\,dt$ が成立する。積分の上端を $T$ にした非負量を考えてから $T\uparrow\infty$ とすると、単調収束により期待値と積分の交換が正当化される。その結果

$$
\mathbb E\frac1U
=\int_0^\infty(1+2t)^{-k/2}\,dt.
$$

$k>2$ なら $v=1+2t$ の置換で

$$
\frac12\int_1^\infty v^{-k/2}\,dv
=\frac12\left[\frac{v^{1-k/2}}{1-k/2}\right]_1^\infty
=\frac1{k-2}.
$$

$k=2$ では $v^{-1}$ の積分が、$k=1$ では $v^{-1/2}$ の積分が無限大になる。条件付き計算の結果は $Q$ の向きに依存しないので、独立なランダム射影についても同じである。$\square$
<!-- proof-end -->

この補題で重要なのは「$U>0$ が確率1」と「$\mathbb E[1/U]<\infty$」は違うという点である。各標本で逆行列が存在しても、まれな極小固有値の寄与が期待値を発散させ得る。

次に、Gram行列の逆行列の**対角成分**と、ある列を他の列で最小二乗近似した残差の二乗長が逆数の関係にあることを用いる。これがなぜ成り立つかも行列から導く。

<a id="lem-slt2-04-gram-inverse"></a>

<!-- formal-statement-start -->
> **補題（Gaussian Gram逆行列の期待跡）**
> $X\in\mathbb R^{n\times p}$ の各成分が独立な $N(0,1)$ とする。
>
> (i) $1\le p\le n$ では $X^{\mathsf T}X$ はほとんど確実に可逆で、

$$
\mathbb E\operatorname{tr}((X^{\mathsf T}X)^{-1})
=\begin{cases}
\displaystyle\frac{p}{n-p-1},&n>p+1,\\
+\infty,&n=p,\ n=p+1.
\end{cases}
$$

> (ii) $1\le n\le p$ では $XX^{\mathsf T}$ はほとんど確実に可逆で、

$$
\mathbb E\operatorname{tr}((XX^{\mathsf T})^{-1})
=\begin{cases}
\displaystyle\frac{n}{p-n-1},&p>n+1,\\
+\infty,&p=n,\ p=n+1.
\end{cases}
$$

> 特に $p=n$ で双方のGram行列は可逆であっても、逆行列の跡の期待値は無限大である。
<!-- formal-statement-end -->

### 証明の見取り図

列ごとにGram行列を分割する。逆行列の対角成分は、その列の「他の列に直交する残りの長さ」の逆数となる。残りの直交補空間の次元は $n-p+1$。行と列を交換すればもう一つの式が得られる。

<!-- proof-start -->
### 証明

(i) の $p\le n$ を考える。$X=(c_1,\ldots,c_p)$ と列を並べ、$G=X^{\mathsf T}X$ と置く。任意の $j$ について $C_{-j}$ を第 $j$ 列を除いた行列とし、$P_{-j}$ をその列空間への直交射影とする。

$p=1$ なら他の列はなく、$P_{-1}=0$ なので $(G^{-1})_{11}=1/\|c_1\|_2^2=1/\|(I_n-P_{-1})c_1\|_2^2$ が直接成り立つ。

以下では $p\ge2$ とする。$p-1<n$ なので $C_{-j}$ はほとんど確実に列フルランクである。列の順序を第 $j$ 列が先頭になるよう並べ替えると、Gram行列は

$$
G=
\begin{pmatrix}
c_j^{\mathsf T}c_j&c_j^{\mathsf T}C_{-j}\\
C_{-j}^{\mathsf T}c_j&C_{-j}^{\mathsf T}C_{-j}
\end{pmatrix}.
$$

ここで $P_{-j}$ の行列表現を確かめる。[列フルランク最小二乗解](../../ML/ML1-04/index.md#thm-ml1-04-full-rank-solution)により、任意の $v\in\mathbb R^n$ を列空間へ射影する係数は $(C_{-j}^{\mathsf T}C_{-j})^{-1}C_{-j}^{\mathsf T}v$ だから

$$
P_{-j}=C_{-j}(C_{-j}^{\mathsf T}C_{-j})^{-1}C_{-j}^{\mathsf T}
$$

となる。次に $G(a,b)^{\mathsf T}=(1,0)^{\mathsf T}$ を解く。ここで $a$ は実数、$b\in\mathbb R^{p-1}$、右辺の0は $p-1$ 次元の零ベクトルである。下段から

$$
b=-(C_{-j}^{\mathsf T}C_{-j})^{-1}C_{-j}^{\mathsf T}c_j\,a
$$

であり、上段へ代入すると

$$
\begin{aligned}
1&=\{c_j^{\mathsf T}c_j
-c_j^{\mathsf T}C_{-j}
(C_{-j}^{\mathsf T}C_{-j})^{-1}C_{-j}^{\mathsf T}c_j\}\,a\\
&=c_j^{\mathsf T}(I_n-P_{-j})c_j\,a.
\end{aligned}
$$

上段で他の列の係数 $b$ を消去した括弧内のスカラーを、この分割に関する **Schur補数** と呼ぶ。その値は射影残差の二乗長である。従って

$$
(G^{-1})_{jj}=a=\frac1{\|(I_n-P_{-j})c_j\|_2^2}
$$

となる。先に分けた $p=1$ の場合にも同じ式が成り立つ。

列 $c_j$ は $C_{-j}$ から独立な $N(0,I_n)$ で、$I_n-P_{-j}$ は階数 $n-(p-1)=n-p+1$ の直交射影となる。[Gaussian射影の補題](#lem-slt2-04-gaussian-projection)を $k=n-p+1$ に適用すれば

$$
\mathbb E(G^{-1})_{jj}=
\begin{cases}
1/(n-p-1),&n>p+1,\\
+\infty,&n=p,\ n=p+1.
\end{cases}
$$

が得られる。跡は非負の対角成分の $p$ 項の和なので、期待値を足すと (i) になる。(ii) は $X^{\mathsf T}\in\mathbb R^{p\times n}$ に (i) を適用すればよく、列数を $n$、行数を $p$ に置き換える。$\square$
<!-- proof-end -->

### 例：一本の列の「残りの長さ」を実際に計算する

$$
c_1=(1,0,0)^{\mathsf T},\qquad c_2=(a,b,0)^{\mathsf T},
\qquad b\ne0
$$

とする。この例は非確率的な幾何の確認である。$c_2$ の張る直線への $c_1$ の射影は $c_2\,a/(a^2+b^2)$ なので、

$$
c_1^{\mathsf T}(I-P_2)c_1
=1-\frac{a^2}{a^2+b^2}
=\frac{b^2}{a^2+b^2}.
$$

一方 $G=X^{\mathsf T}X=\begin{pmatrix}1&a\\a&a^2+b^2\end{pmatrix}$ の行列式は $b^2>0$ であり、

$$
G^{-1}=\frac1{b^2}
\begin{pmatrix}a^2+b^2&-a\\-a&1\end{pmatrix}.
$$

従って $(G^{-1})_{11}=(a^2+b^2)/b^2$ は先ほどの射影残差二乗の逆数と一致する。なぜ逆Gram行列に小さい残差の逆数が現れるかを、二次元の手計算で確かめた。

## 3. 補間閾値のリスクを正確に計算する

前節の補題を雑音の増幅へ適用する。[最小ノルム公式](../SLT2-02/index.md#thm-slt2-02-minimum-norm)で、$p<n$ は係数が一意、$p\ge n$ は通常は係数が多すぎるが訓練応答を全て補間できる。その境界が $p=n$ である。

<a id="thm-slt2-04-exact-risk"></a>

<!-- formal-statement-start -->
> **定理（最小ノルム推定の補間前後の正確な期待リスク）**
> [Gaussian等方設計](#def-slt2-04-gaussian-risk)で $n,p\ge1$、$\tau^2>0$、固定された $\beta_\star\in\mathbb R^p$ とし、$\widehat\beta=X^\dagger Y$ とする。新規入力の信号予測リスクは次のとおり。
>
> **補間前**（$p<n$）：

$$
L_{n,p}=
\begin{cases}
\displaystyle \tau^2\frac{p}{n-p-1},&p\le n-2,\\
+\infty,&p=n-1.
\end{cases}
$$

> **補間閾値**（$p=n$）：$L_{n,n}=+\infty$。
>
> **補間後**（$p>n$）：

$$
L_{n,p}=
\begin{cases}
+\infty,&p=n+1,\\
\displaystyle\left(1-\frac np\right)\|\beta_\star\|_2^2
+\tau^2\frac{n}{p-n-1},&p\ge n+2.
\end{cases}
$$

> $p\ge n$ での第一項は最小ノルム解が見ない核方向の偏り二乗、第二項は雑音分散である。各有限行列の解はほとんど確実に存在するが、$\tau^2>0$ のとき $p=n-1,n,n+1$ の期待リスクは発散する。
<!-- formal-statement-end -->

### 証明の見取り図

補間前には真の係数をそのまま再現でき、誤差は雑音だけ。補間後には真の係数の核方向が失われる。どちらも雑音項を逆Gram行列の跡に直し、前節の[期待跡の補題](#lem-slt2-04-gram-inverse)で評価する。

<!-- proof-start -->
### 証明

まず $p<n$ では $X^{\mathsf T}X$ が可逆なので、[最小ノルム公式](../SLT2-02/index.md#thm-slt2-02-minimum-norm)に $Y=X\beta_\star+\varepsilon$ を代入して

$$
\widehat\beta-\beta_\star
=(X^{\mathsf T}X)^{-1}X^{\mathsf T}\varepsilon
$$

を得る。$X$ を固定した雑音の二乗期待値は、$\mathbb E[\varepsilon\varepsilon^{\mathsf T}\mid X]=\tau^2 I_n$ より

$$
\begin{aligned}
\mathbb E[\|\widehat\beta-\beta_\star\|_2^2\mid X]
&=\tau^2\operatorname{tr}\left(
(X^{\mathsf T}X)^{-1}X^{\mathsf T}X
(X^{\mathsf T}X)^{-1}\right)\\
&=\tau^2\operatorname{tr}((X^{\mathsf T}X)^{-1}).
\end{aligned}
$$

ここでは二次形式の期待値を成分ごとに展開し、跡の巡回性を使った。[Gram逆行列の補題](#lem-slt2-04-gram-inverse) (i) で $X$ の期待値を取ると補間前の式が得られる。

次に $p\ge n$ では $XX^{\mathsf T}$ が可逆である。行空間への直交射影を

$$
P_X=X^{\mathsf T}(XX^{\mathsf T})^{-1}X
$$

と置く。$P_X^{\mathsf T}=P_X$、$P_X^2=P_X$ は行列の積で確認でき、$\operatorname{Im}P_X=\operatorname{row}(X)$、$\operatorname{rank}P_X=n$。さらに[行空間と核の直交分解](../SLT2-01/index.md#thm-slt2-01-row-null-prediction)によって $\operatorname{Im}(I_p-P_X)=\ker X$ である。したがって

$$
\widehat\beta-\beta_\star
=-(I_p-P_X)\beta_\star
+X^{\mathsf T}(XX^{\mathsf T})^{-1}\varepsilon.
$$

第一項は $\ker X$、第二項は $\operatorname{row}(X)$ に属するので、**各標本で直交**する。よって条件付き二乗期待値は

$$
\begin{aligned}
\mathbb E[\|\widehat\beta-\beta_\star\|_2^2\mid X]
&=\|(I_p-P_X)\beta_\star\|_2^2\\
&\quad+\tau^2\operatorname{tr}\left(
(XX^{\mathsf T})^{-1}XX^{\mathsf T}(XX^{\mathsf T})^{-1}
\right)\\
&=\|(I_p-P_X)\beta_\star\|_2^2
+\tau^2\operatorname{tr}((XX^{\mathsf T})^{-1}).
\end{aligned}
$$

最後の雑音項の期待値は[Gram逆行列の補題](#lem-slt2-04-gram-inverse) (ii) から得られる。偏り項については、$X$ の分布が特徴座標の任意の符号反転と置換で変わらない。これらの変換に対して $\mathbb E[P_X]$ が不変なので、その非対角成分は全て0で、対角成分は共通の値 $c$ である。しかも全ての標本で $\operatorname{tr}P_X=n$ だから

$$
pc=\operatorname{tr}(\mathbb E[P_X])
=\mathbb E[\operatorname{tr}P_X]=n,
\qquad \mathbb E[P_X]=\frac np I_p.
$$

射影の性質 $(I_p-P_X)^2=I_p-P_X$ を使えば

$$
\begin{aligned}
\mathbb E_X\|(I_p-P_X)\beta_\star\|_2^2
&=\beta_\star^{\mathsf T}(I_p-\mathbb E[P_X])\beta_\star\\
&=\left(1-\frac np\right)\|\beta_\star\|_2^2.
\end{aligned}
$$

これと逆Gram行列の期待跡を足せば補間後の式になる。$p=n$ では列側・行側のどちらの計算も逆Gram行列の期待跡が無限大であり、$\tau^2>0$ なのでリスクも無限大となる。$\square$
<!-- proof-end -->

### 3.1 純雑音なら補間前は上昇し、補間後は下降する

真の係数を $\beta_\star=0$、$\tau^2=1$、$n=6$ に固定する。定理から値を計算すると次のようになる。

| 特徴数 $p$ | 1 | 3 | 4 | 5 | 6 | 7 | 8 | 10 | 14 |
| --- | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: |
| $L_{6,p}$ | $1/4$ | $3/2$ | $4$ | $\infty$ | $\infty$ | $\infty$ | $6$ | $2$ | $6/7$ |

例えば $p=4$ では $p/(n-p-1)=4/(6-4-1)=4$、$p=8$ では $n/(p-n-1)=6/(8-6-1)=6$。分母が0以下になった範囲にはこの有理式を代入せず、補題から直接 $\mathbb E[1/U]=\infty$ と判断する。

この模型は補間閾値付近の**ピーク**と、過剰パラメータ側の**第二下降**を厳密に示す。ただし $p<n-1$ ではリスクが単調に増えるので、これだけでは「最初に下降し、上昇し、また下降する」完全なdouble descent曲線ではない。最初の下降には、特徴量を追加すると見落としていた信号の予測誤差が減るなど、別の機構が必要となる。

### 3.2 最初の下降は、見落としていた信号を取り込むと起こり得る

新しい入力に互いに独立な標準Gaussian特徴 $x_1,x_2,\ldots$ があるとし、真の平均応答が $\sqrt3\,x_2$、新規雑音分散が1、訓練件数が $n=10$ とする。特徴量を $x_1$ から順に $p$ 個使う。$p\ge2$ なら $\beta_\star=(0,\sqrt3,0,\ldots,0)^{\mathsf T}$ で $\|\beta_\star\|^2=3$ だから[定理](#thm-slt2-04-exact-risk)が使える。

$p=1$ は真の $x_2$ を使えないので、その回帰係数の推定時には $\sqrt3\,x_2+\varepsilon$ が分散4の独立な残差として作用する。訓練の $x_1$ の二乗和を $S=\sum_{i=1}^{10}x_{i1}^2$ とすると

$$
\mathbb E[\widehat\beta_1^2\mid x_{11},\ldots,x_{10,1}]
=\frac4S,\qquad
\mathbb E\frac1S=\frac1{10-2}=\frac18
$$

である。[Gaussian射影の補題](#lem-slt2-04-gaussian-projection)では $Q=I_{10}$、$k=10$ を用いた。標本外の真の信号 $\sqrt3\,x_2$ と予測 $\widehat\beta_1x_1$ は独立な座標に乗るため、信号予測リスクは $3+4/8=7/2$ になる。各 $p$ の結果は

| $p$ | 1 | 2 | 3 | 8 | 9–11 | 12 | 20 |
| --- | ---: | ---: | ---: | ---: | ---: | ---: | ---: |
| 信号予測リスク | $7/2$ | $2/7$ | $1/2$ | $8$ | $\infty$ | $21/2$ | $47/18$ |

である。$p=12$ は $(1-10/12)3+10/(12-10-1)=1/2+10=21/2$、$p=20$ は $(1-10/20)3+10/(20-10-1)=3/2+10/9=47/18$ と求めた。

最初の $p=1\to2$ の下降は**欠落していた真の特徴の採用**、閾値近傍の増大は**逆Gram行列の雑音増幅**、$p=12\to20$ の下降は**過剰パラメータ側の雑音分散低下**による。同じ曲線に複数の原因が重なっている。さらに $p\to\infty$ では雑音項は0へ行くが、核方向の偏りは3へ近づくので、リスク全体が必ず0へ近づくとは言えない。

## 4. いつピークは消え、いつ別の形になるか

まず新規雑音がない $\tau^2=0$ を考える。[定理](#thm-slt2-04-exact-risk)は $\tau^2>0$ を仮定したので、その発散結論を適用してはいけない。証明中の直交分解を雑音0で読み直すと、$p<n$ では $L_{n,p}=0$、$p\ge n$ では $L_{n,p}=(1-n/p)\|\beta_\star\|^2$ となる。特に $\beta_\star=0$ なら**全ての $p$ でリスクは0**。逆Gram行列が極端に悪条件でも、それによって増幅される雑音がなければ、この補間ピークは現れない。

次に雑音は残して正則化を入れる。[前章のridgeフィルタ](../SLT2-03/index.md#def-slt2-03-spectral-filter)を $\mu>0$ で固定する。特異値 $s$ の係数への倍率は $s/(s^2+\mu)$ であり、最小二乗の $1/s$ とは違って全ての $s\ge0$ で上限がある。

<a id="prop-slt2-04-ridge-bound"></a>

<!-- formal-statement-start -->
> **命題（固定ridge正則化のリスク上界）**
> [Gaussian等方設計](#def-slt2-04-gaussian-risk)で $n,p\ge1$、固定 $\beta_\star\in\mathbb R^p$、$\tau^2\ge0$ とし、$X,Y$ を観測する前に決定論的な定数 $\mu>0$ を固定する。[ridge推定量](../SLT2-03/index.md#def-slt2-03-spectral-filter)

$$
\widehat\beta_\mu=(X^{\mathsf T}X+\mu I_p)^{-1}X^{\mathsf T}Y
$$

> の信号予測リスクは

$$
L_{n,p}(\mu)
\le\|\beta_\star\|_2^2
+\frac{\tau^2\min(n,p)}{4\mu}
\le\|\beta_\star\|_2^2+\frac{\tau^2n}{4\mu}<\infty.
$$

> よって固定された正の $\mu$ では、補間閾値 $p=n$ で期待リスクが無限大になる現象は起きない。この上界はリスクが $p$ に関して単調であることまでは保証しない。
<!-- formal-statement-end -->

### 証明の見取り図

ridgeの信号成分を縮める行列の固有値は0以上1以下である。他方、雑音に作用するフィルタは全ての特異値で $1/(2\sqrt\mu)$ 以下になる。両者の二乗期待値を足す。

<!-- proof-start -->
### 証明

$G_\mu=(X^{\mathsf T}X+\mu I_p)^{-1}X^{\mathsf T}$、$B_\mu=G_\mu X$ とおくと

$$
\widehat\beta_\mu-\beta_\star
=-(I_p-B_\mu)\beta_\star+G_\mu\varepsilon.
$$

[特異値フィルタ](../SLT2-03/index.md#def-slt2-03-spectral-filter)より、$B_\mu$ の固有値は各正特異方向で $s_j^2/(s_j^2+\mu)\in[0,1)$、核方向で0である。ゆえに $I_p-B_\mu$ の作用素ノルムは1以下で

$$
\|(I_p-B_\mu)\beta_\star\|_2^2
\le\|\beta_\star\|_2^2.
$$

雑音の条件付き平均は0なので信号との交差項は消える。さらに $s_j^2+\mu\ge2s_j\sqrt\mu$ を二乗すれば

$$
\begin{aligned}
\mathbb E[\|G_\mu\varepsilon\|_2^2\mid X]
&=\tau^2\operatorname{tr}(G_\mu G_\mu^{\mathsf T})
=\tau^2\sum_{j=1}^{\operatorname{rank}X}
\frac{s_j^2}{(s_j^2+\mu)^2}\\
&\le\frac{\tau^2\operatorname{rank}X}{4\mu}
\le\frac{\tau^2\min(n,p)}{4\mu}.
\end{aligned}
$$

固定 $X$ の条件付き二乗期待値を取り、最後に $X$ に関して期待値を取れば命題が従う。$\square$
<!-- proof-end -->

ただし $p,n$ を変えるときに $\mu\downarrow0$ とすれば上界は大きくなり得る。**正則化を掛けたから必ずdouble descentが消える**とは言っていない。ここで証明したのは、各 $n,p$ に対し正の $\mu$ を固定したときの期待値の有限性である。

また、等方性は本質的な仮定である。訓練標本と独立な、**平均0** の新規入力 $x_{\mathrm{new}}$ の共分散を $\Sigma_{\mathrm{test}}$ とすると、条件付き信号予測誤差は

$$
\mathbb E_{x_{\mathrm{new}}}
[(x_{\mathrm{new}}^{\mathsf T}(\widehat\beta-\beta_\star))^2\mid X,Y]
=(\widehat\beta-\beta_\star)^{\mathsf T}
\Sigma_{\mathrm{test}}(\widehat\beta-\beta_\star)
$$

となる。平均ベクトル $m_{\mathrm{test}}=\mathbb E[x_{\mathrm{new}}]\ne0$ の入力なら、係数誤差 $d=\widehat\beta-\beta_\star$ に対して二次モーメントと条件付き信号予測誤差は

$$
\begin{aligned}
\mathbb E[x_{\mathrm{new}}x_{\mathrm{new}}^{\mathsf T}]
&=\Sigma_{\mathrm{test}}+m_{\mathrm{test}}m_{\mathrm{test}}^{\mathsf T},\\
\mathbb E[(x_{\mathrm{new}}^{\mathsf T}d)^2\mid X,Y]
&=d^{\mathsf T}\Sigma_{\mathrm{test}}d+(m_{\mathrm{test}}^{\mathsf T}d)^2.
\end{aligned}
$$

となり、共分散の項だけでは不足する。例えば平均0で係数誤差が $(1,0)^{\mathsf T}$ なら、試験共分散 $I_2$ では1、$\operatorname{diag}(9,1)$ では9である。**試験分布を替えたとき**に係数ノルムの式をそのまま使うことはできない。非等方な訓練分布での最小Euclidノルム解も、等方Gaussianの回転対称性を利用した上記定理からは一般に求まらない。

結局、ここで証明したのは「等方Gaussian設計・独立な等分散雑音・最小ノルム解・独立な等方試験入力」という限定模型の結果である。$p/n$ が1に近い高次元極限、有限次元の期待値、典型的な一回の標本の誤差は同じ命題ではない。次章では、こうした設計行列の非漸近的・比例漸近的な評価の前提をさらに区別する。

## 演習

### SLT2-04-A01 標本外リスクの換算
- Level: A
- 目安時間: 10分

新規入力 $x=(Z_1,Z_2,Z_3)^{\mathsf T}\sim N(0,I_3)$ と、訓練標本の実現により固定された係数誤差 $d=(2,-1,3)^{\mathsf T}$ を考える。$\mathbb E[(x^{\mathsf T}d)^2]$ と、新規雑音が独立・平均0・分散2のときの応答二乗予測誤差を求めよ。

<!-- solution-start -->
#### 詳細解答

$x^{\mathsf T}d=2Z_1-Z_2+3Z_3$ を二乗する。異なる添字の積の期待値は独立性と平均0により0、各二乗の期待値は1だから

$$
\mathbb E[(x^{\mathsf T}d)^2]
=4\mathbb E Z_1^2+\mathbb E Z_2^2+9\mathbb E Z_3^2
=4+1+9=14.
$$

新規雑音を $\varepsilon_{\mathrm{new}}$ とすると、交差項の期待値は独立性から0。従って応答二乗予測誤差は $14+\mathbb E\varepsilon_{\mathrm{new}}^2=14+2=16$ である。
<!-- solution-end -->

### SLT2-04-A02 逆射影長の境界
- Level: A
- 目安時間: 12分

独立な標準正規変数 $Z_j$ の二乗和 $U_k=\sum_{j=1}^kZ_j^2$ について、$k=1,2,3,5$ の $\mathbb E[1/U_k]$ をそれぞれ求めよ。$U_k>0$ がほとんど確実であることと期待値の有限性は同じか。

<!-- solution-start -->
#### 詳細解答

[Gaussian射影の補題](#lem-slt2-04-gaussian-projection)で $Q=I_k$ とすれば、積分表示は

$$
\mathbb E[1/U_k]
=\int_0^\infty(1+2t)^{-k/2}\,dt.
$$

$k=1$ は被積分関数が大きい $t$ で $t^{-1/2}$ 型、$k=2$ は $t^{-1}$ 型であり、いずれも積分が発散する。$k=3$ は $1/(3-2)=1$、$k=5$ は $1/(5-2)=1/3$。いずれの $k$ でも正規変数が全て0となる確率は0で $U_k>0$ は確率1だが、$k=1,2$ の逆数の期待値は無限大である。
<!-- solution-end -->

### SLT2-04-A03 補間前後の代入
- Level: A
- 目安時間: 12分

$n=7$、$\beta_\star=0$、$\tau^2=2$ とする。$p=3$ と $p=10$ で最小ノルム解の信号予測リスクを求め、それぞれどのGram行列の逆行列を使うか示せ。

<!-- solution-start -->
#### 詳細解答

$p=3<7$ で $n>p+1$ なので $X^{\mathsf T}X$ は $3\times3$、[最小ノルム推定の補間前後の正確な期待リスク](#thm-slt2-04-exact-risk)により

$$
L_{7,3}=2\frac3{7-3-1}=\frac63=2.
$$

$p=10>7$ で $p>n+1$ なので $XX^{\mathsf T}$ は $7\times7$、真の係数は0で偏り項も0となり

$$
L_{7,10}=2\frac7{10-7-1}=\frac{14}2=7.
$$

前後で逆にするGram行列の次元と分母が異なる。
<!-- solution-end -->

### SLT2-04-A04 二列のSchur補数
- Level: A
- 目安時間: 15分

$c_1=(1,0,0)^{\mathsf T}$、$c_2=(3,4,0)^{\mathsf T}$、$X=(c_1,c_2)$ とする。$G=X^{\mathsf T}X$ の逆行列の $(1,1)$ 成分を直接求め、$c_1$ を $c_2$ の張る直線へ射影した残差二乗の逆数と一致することを確かめよ。

<!-- solution-start -->
#### 詳細解答

$G=\begin{pmatrix}1&3\\3&25\end{pmatrix}$ で、行列式は $25-9=16$。よって

$$
G^{-1}=\frac1{16}\begin{pmatrix}25&-3\\-3&1\end{pmatrix},
\qquad (G^{-1})_{11}=\frac{25}{16}.
$$

射影は $(c_1^{\mathsf T}c_2)/(c_2^{\mathsf T}c_2)=3/25$ を係数として $(3/25)c_2$。残差の二乗は

$$
\|c_1-(3/25)c_2\|^2
=\|c_1\|^2-\frac{(c_1^{\mathsf T}c_2)^2}{\|c_2\|^2}
=1-\frac9{25}=\frac{16}{25}.
$$

逆数は $25/16$ で、Gram逆行列の対角成分と一致する。
<!-- solution-end -->

### SLT2-04-A05 訓練残差と標本外誤差
- Level: A
- 目安時間: 10分

$n=4,p=6$、$\beta_\star=0$、$\tau^2=1$ のGaussian等方設計を考える。最小ノルム解の訓練残差、標本外信号予測リスク、独立な新規応答の二乗予測誤差を求めよ。

<!-- solution-start -->
#### 詳細解答

$p\ge n$ なので $X$ は行フルランクであり、[最小ノルム公式](../SLT2-02/index.md#thm-slt2-02-minimum-norm)による解は $X\widehat\beta=Y$ を満たす。従って訓練残差 $\|X\widehat\beta-Y\|^2=0$ がほとんど確実に成立する。

$p=6>n+1=5$ だから[最小ノルム推定の補間前後の正確な期待リスク](#thm-slt2-04-exact-risk)で

$$
L_{4,6}=\frac4{6-4-1}=4,\qquad M_{4,6}=L_{4,6}+\tau^2=5.
$$

訓練残差が0でも、別の新規入力には雑音で学んだ係数が作用する。
<!-- solution-end -->

### SLT2-04-B01 三点の発散域
- Level: B
- 目安時間: 20分

$n=8$、$\beta_\star=0$、$\tau^2=1$ とする。$p=6,7,8,9,10,11$ について期待信号予測リスクを全て求め、期待値が無限大になるのに係数がほとんど確実に存在する理由を述べよ。

<!-- solution-start -->
#### 詳細解答

$p=6<8$ では $8>6+1$ より $6/(8-6-1)=6$。$p=7$ は $n=p+1$、$p=8$ は正方、$p=9$ は $p=n+1$ に当たり、[逆Gram行列の期待跡](#lem-slt2-04-gram-inverse)はそれぞれ無限大である。$p=10$ では $8/(10-8-1)=8$、$p=11$ では $8/(11-8-1)=4$。従って順に

$$
(L_{8,6},L_{8,7},L_{8,8},L_{8,9},L_{8,10},L_{8,11})
=(6,\infty,\infty,\infty,8,4).
$$

Gaussian設計の行または列は必要な本数だけほとんど確実に独立だから逆行列は存在する。ただし逆行列の対角成分に現れる射影残差の次元 $k=2$ または1では、[逆二乗長の補題](#lem-slt2-04-gaussian-projection)の積分が発散する。個々の標本の有限性と期待値の有限性は別である。
<!-- solution-end -->

### SLT2-04-B02 核方向の偏りを含む場合
- Level: B
- 目安時間: 20分

$n=3,p=6$、$\beta_\star=(1,2,0,0,0,0)^{\mathsf T}$、$\tau^2=2$ とする。標本外信号予測リスクを偏り二乗と雑音分散に分けて求め、新規応答の二乗予測誤差も答えよ。

<!-- solution-start -->
#### 詳細解答

$p=6>n+1=4$、$\|\beta_\star\|^2=1^2+2^2=5$ である。[最小ノルム推定の補間前後の正確な期待リスク](#thm-slt2-04-exact-risk)より、行空間の外に落ちる信号の期待二乗長は

$$
\left(1-\frac np\right)\|\beta_\star\|^2
=\left(1-\frac36\right)5=\frac52.
$$

雑音分散の寄与は $2\cdot3/(6-3-1)=3$。両者は直交するので加えられ、$L_{3,6}=5/2+3=11/2$。新規応答にはさらに独立な分散2の雑音が加わるため $M_{3,6}=11/2+2=15/2$ である。
<!-- solution-end -->

### SLT2-04-B03 固定ridgeでの有限性
- Level: B
- 目安時間: 20分

$n=5$、$\beta_\star=0$、$\tau^2=1$、$\mu=1/4$ として、任意の正整数 $p$ に対するridgeの信号予測リスクの共通上界を求めよ。$p=5$ でも有限と言える理由を式で説明せよ。

<!-- solution-start -->
#### 詳細解答

[固定ridgeの上界](#prop-slt2-04-ridge-bound)では $\|\beta_\star\|^2=0$、$4\mu=1$ だから

$$
L_{5,p}(1/4)
\le\frac{\min(5,p)}{4(1/4)}
=\min(5,p)\le5.
$$

$p=5$ でも特異値ごとの雑音フィルタは $s/(s^2+1/4)$ であり、二乗は $(2\sqrt{1/4})^{-2}=1$ 以下である。正特異値は高々5本なので、雑音分散の条件付き和も高々5になる。最小二乗の $1/s$ のように小さい特異値で発散しないことが要点である。
<!-- solution-end -->

### SLT2-04-B04 試験分布が変わるとどうなるか
- Level: B
- 目安時間: 20分

ある訓練標本から得た係数誤差が $d=(1,0)^{\mathsf T}$ だった。新規入力は平均0、共分散が (i) $I_2$、(ii) $\operatorname{diag}(9,1)$ の二通りとする。双方の条件付き信号予測誤差を求め、本章の定理を (ii) にそのまま適用できるか述べよ。

<!-- solution-start -->
#### 詳細解答

平均0の新規入力について、条件付き二乗予測誤差は

$$
\mathbb E[(x^{\mathsf T}d)^2]
=d^{\mathsf T}\mathbb E[xx^{\mathsf T}]d
=d^{\mathsf T}\Sigma_{\mathrm{test}}d.
$$

(i) は $(1,0)I_2(1,0)^{\mathsf T}=1$、(ii) は $(1,0)\operatorname{diag}(9,1)(1,0)^{\mathsf T}=9$。[最小ノルム推定の補間前後の正確な期待リスク](#thm-slt2-04-exact-risk)の等方試験入力 $N(0,I_p)$ の仮定が (ii) で失われる。予測誤差を単に係数誤差の二乗長とする証明の第一歩が壊れるため、同じ係数リスク公式を試験誤差へ無条件には移せない。
<!-- solution-end -->

### SLT2-04-C01 下降が二度現れる模型の全検算
- Level: C
- 目安時間: 40分

訓練件数を $n=8$、各特徴を独立標準Gaussian、新規雑音分散を $\tau^2=1$、真の平均応答を $2x_2$ とする。モデルでは最初の $p$ 特徴だけを用い、係数の最小Euclidノルム最小二乗解を採用する。

1. $p=1$ では真の信号がモデルに含まれない。標本外信号予測リスクを条件付き分散から計算せよ。
2. $p=2,3,6,7,8,9,10,12$ の標本外信号予測リスクを全て求め、有限・無限と低次元側・高次元側を区別せよ。
3. $p=10$ の偏り二乗と分散項を別々に求めよ。また、$\mu=1$ のridgeを全ての $p$ に適用した場合、本章の上界でどの程度まで有限性を保証できるか述べよ。
4. $p=1\to2$ と $p=10\to12$ のリスク下降の原因が同じかどうか説明せよ。

<!-- solution-start -->
#### 詳細解答

**(1)** $p=1$ の訓練応答は $Y_i=2x_{i2}+\varepsilon_i$ で、使用する $x_{i1}$ から独立であり、平均0・分散 $4+1=5$ を持つ。[最小ノルム解](../SLT2-02/index.md#thm-slt2-02-minimum-norm)は一列の普通の最小二乗解

$$
\widehat\beta_1
=\frac{\sum_{i=1}^8x_{i1}Y_i}{\sum_{i=1}^8x_{i1}^2}.
$$

$x_{11},\ldots,x_{81}$ を固定した分子の分散は $5\sum_i x_{i1}^2$、平均は0。従って

$$
\mathbb E[\widehat\beta_1^2\mid x_{11},\ldots,x_{81}]
=\frac5{\sum_i x_{i1}^2}.
$$

[Gaussian射影の補題](#lem-slt2-04-gaussian-projection)で $k=8$ とすると、二乗和の逆数の期待値は $1/(8-2)=1/6$ である。独立な新規特徴について、予測 $\widehat\beta_1x_1$ と真の信号 $2x_2$ の交差項は0だから

$$
L_{8,1}=\mathbb E\widehat\beta_1^2+4
=\frac56+4=\frac{29}{6}.
$$

**(2)** $p\ge2$ では真の係数を $(0,2,0,\ldots,0)^{\mathsf T}$ と書け、$\|\beta_\star\|^2=4$。[最小ノルム推定の補間前後の正確な期待リスク](#thm-slt2-04-exact-risk)を適用すると

$$
\begin{aligned}
L_{8,2}&=\frac2{8-2-1}=\frac25,&
L_{8,3}&=\frac3{8-3-1}=\frac34,\\
L_{8,6}&=\frac6{8-6-1}=6,&
L_{8,7}&=L_{8,8}=L_{8,9}=+\infty,\\
L_{8,10}&=\left(1-\frac8{10}\right)4
+\frac8{10-8-1}
=\frac45+8=\frac{44}{5},\\
L_{8,12}&=\left(1-\frac8{12}\right)4
+\frac8{12-8-1}
=\frac43+\frac83=4.
\end{aligned}
$$

$p=2,3,6$ は補間前、$p=7,8,9$ は期待値の発散域、$p=10,12$ は補間後である。

**(3)** $p=10$ の核方向の偏り二乗は $(1-8/10)4=4/5$、逆Gram行列からの雑音分散は $8/(10-8-1)=8$ である。正則化 $\mu=1$ を全ての $p$ で固定した場合、[ridgeの上界](#prop-slt2-04-ridge-bound)で $p\ge2$ なら

$$
L_{8,p}(1)\le4+\frac{\min(8,p)}4\le6.
$$

$p=1$ は真の第2特徴を含まないので、この式の $\beta_\star\in\mathbb R^p$ という指定を満たさない。ここは別に計算する必要がある。$p=1$ では有効残差分散が5、真の信号の見落としによる誤差が4である。ridge係数を $\widehat b_\mu=(\sum_i x_{i1}Y_i)/(\sum_i x_{i1}^2+\mu)$ とすれば、条件付き分散は

$$
5\frac{S}{(S+\mu)^2}\le\frac5{4\mu}
\qquad(S=\sum_i x_{i1}^2).
$$

よって $\mu=1$ の標本外信号予測リスクは $4+5/4=21/4$ 以下となる。いずれの $p$ でも有限である。

**(4)** $p=1\to2$ ではモデルが初めて真の第2特徴を含み、見落としによる二乗誤差4がなくなるため $29/6\to2/5$ と下降する。一方 $p=10\to12$ では既に信号は含まれており、逆Gram行列の雑音分散が $8\to8/3$ に減ることが主因である。核方向の偏りは $4/5\to4/3$ と**むしろ増える**。その増加を上回る分散減少で全体が $44/5\to4$ と下降する。原因を分けずに「特徴数を増やすと汎化する」とは説明できない。
<!-- solution-end -->
