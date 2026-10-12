# HDP9 Hanson–Wrightの二次形式集中

[HDP7の標本共分散評価](../HDP7/index.md#thm-hdp7-isotropic-covariance)では、固定方向に沿った標本の二乗和を集中させ、球面の有限集合へ拡張しました。しかし一般の二次形式には異なる座標の積 $X_iX_j$ が登場します。[HDP3の独立なsub-Gaussian和](../HDP3/index.md#thm-hdp3-subgaussian-sum)を積の和にそのまま適用することはできません。座標が独立でも、積同士は共通の座標を含むため従属になり得るからです。

例えば互いに独立で各々が標準正規分布に従う実数値確率変数 $X_1,X_2,X_3$ に対し、$U=X_1X_2$ と $V=X_1X_3$ は独立ではありません。標準正規の二次・四次モーメントから、

$$
EU^2=EV^2=1,\qquad
E(U^2V^2)=E(X_1^4)E(X_2^2)E(X_3^2)=3\ne1
$$

となるためです。反対に、独立なRademacher変数 $R_1,R_2$ では、$a,b\in\{-1,1\}$ に対し

$$
P(R_1=a,\ R_1R_2=b)=P(R_1=a,\ R_2=ab)=\frac14
=\frac12\cdot\frac12
$$

なので、$R_1R_2$ は $R_1$ と独立です。「積なら必ず従属」ではなく、**積の和に必要な独立性を個別に確認できない**ことが問題です。

ここで知りたいのは、独立な中心化座標を持つベクトル $X\in\mathbb R^n$ と確定行列 $A$ に対して、二次形式 $X^{\mathsf T}AX$ が期待値からどの程度離れるかです。結論を支配するのは **Frobeniusノルム（すべての成分の二乗和）**と **作用素ノルム（最大の伸び）**という異なる二つの大きさです。

最初に対角項と非対角項を分けます。対角項には平方変数の指数モーメントを、非対角項には独立な二群へのランダムな分割とGaussian補助変数を使います。これらを合成して、Hanson–Wright不等式の一般的な有限次元版を**具体的な定数付きで証明**します。

## 1. 二次形式を二種類の揺らぎに分ける

実数行列 $A=(a_{ij})_{i,j=1}^n$ と $X=(X_1,\ldots,X_n)^{\mathsf T}$ に対し、$X^{\mathsf T}AX=\sum_{i,j}a_{ij}X_iX_j$ です。$A$ を $(A+A^{\mathsf T})/2$ に置き換えても二次形式は変わりません。実際、交換すると $X_iX_j=X_jX_i$ なので反対称成分の寄与が相殺されます。以後、原則として $A=A^{\mathsf T}$ とします。

独立で中心化された $X_i$ では $E[X_iX_j]=0$（$i\ne j$）であり、二次形式の中心化は

$$
Q_A=X^{\mathsf T}AX-E[X^{\mathsf T}AX]=D_A+S_A,
$$

$$
D_A=\sum_{i=1}^n a_{ii}(X_i^2-EX_i^2),
\qquad
S_A=\sum_{i\ne j}a_{ij}X_iX_j
$$

です。$D_A$ の項は独立ですが、$S_A$ の各積は座標を共有します。ここがこの章固有の難所です。

sub-Gaussian変数には[HDP3で学んだモーメント母関数評価](../HDP3/index.md#thm-hdp3-subgaussian-mgf)を使います。ただしノルム規約による絶対定数の差を避けるため、ここでは**指数モーメントによる一様な代理量** $K$ を固定します。

<a id="def-hdp9-mgf-proxy"></a>

<!-- formal-statement-start -->
> **定義（中心化sub-Gaussian座標の共通代理量）**  
> $n\ge1$ とし、実数値確率変数 $X_1,\ldots,X_n$ が各々 $EX_i=0$ を満たすとする。$K>0$ が共通代理量であるとは、すべての $i=1,\ldots,n$ とすべての $u\in\mathbb R$ について次が成り立つことをいう。

$$
Ee^{uX_i}\le \exp(K^2u^2/2).
$$
<!-- formal-statement-end -->

<!-- definition-example-start: def-hdp9-mgf-proxy -->
**定義の確認**。$P(R_i=1)=P(R_i=-1)=1/2$ の符号変数では $ER_i=0$、$Ee^{uR_i}=\cosh u$ です。級数を比べると $(2k)!\ge2^k k!$ より

$$
\cosh u=\sum_{k=0}^{\infty}\frac{u^{2k}}{(2k)!}
\le\sum_{k=0}^{\infty}\frac{(u^2/2)^k}{k!}
=e^{u^2/2}.
$$

したがって $K=1$ が使えます。分散 $1$ の標準正規変数 $G$ でも $Ee^{uG}=e^{u^2/2}$ なので $K=1$ です。この定義は個別座標の性質であり、**独立性自体は主定理で別途要求**します。
<!-- definition-example-end -->

<a id="def-hdp9-quadratic-norms"></a>

<!-- formal-statement-start -->
> **定義（二次形式と行列の二つのノルム）**  
> $A\in\mathbb R^{n\times n}$、$x\in\mathbb R^n$ とする。二次形式は $x^{\mathsf T}Ax$ である。Frobeniusノルムと作用素ノルムをそれぞれ

$$
\|A\|_{\mathrm F}^2=\sum_{i,j=1}^n a_{ij}^2,
\qquad
\|A\|_{\mathrm{op}}=\sup_{\|x\|_2=1}\|Ax\|_2
$$

> とする。
<!-- formal-statement-end -->

<!-- definition-example-start: def-hdp9-quadratic-norms -->
**定義の確認**。$A=\operatorname{diag}(3,4)$ では $x^{\mathsf T}Ax=3x_1^2+4x_2^2$ です。$\|A\|_{\mathrm F}=\sqrt{3^2+4^2}=5$ ですが、$\|Ax\|_2^2=9x_1^2+16x_2^2\le16\|x\|_2^2$ で、$x=(0,1)^{\mathsf T}$ で等号が成立するので $\|A\|_{\mathrm{op}}=4$ です。二つのノルムを混同してはいけません。
<!-- definition-example-end -->

## 2. 対角部分：二乗した変数は二領域の集中になる

[HDP7の平方指数モーメント補題](../HDP7/index.md#lem-hdp7-square-mgf)では $Ee^{X^2/L^2}\le2$ を直接仮定しました。ここではその仮定を追加せず、座標の全実数モーメント母関数に与えた共通代理量 $K$ から明示的な定数で導き直します。

sub-Gaussianという条件は $X_i$ 自体の線形な指数モーメントの上界です。平方 $X_i^2$ には、全実数のパラメータで同じ上界を期待できません。例えば正規変数では $Ee^{\lambda X_i^2}$ は $\lambda\ge1/2$ で発散します。したがって小さい $\lambda$ に限定した**局所的な指数モーメント評価**を作ります。

<a id="lem-hdp9-square-mgf"></a>

<!-- formal-statement-start -->
> **補題（モーメント母関数代理量からの平方評価）**  
> $X$ は実数値で $EX=0$、$K>0$ に対し $Ee^{uX}\le e^{K^2u^2/2}$ がすべての実数 $u$ で成り立つとする。$Y=X^2-EX^2$ とおけば、すべての $|\lambda|\le1/(8K^2)$ で

$$
Ee^{\lambda Y}\le \exp(64\lambda^2K^4)
$$

> が成り立つ。
<!-- formal-statement-end -->

### 証明の見取り図

[指数Markov法](../HDP1/index.md#prop-hdp1-exponential-markov)から $X$ の両側尾部を押さえ、尾部積分で偶数次モーメントへ進みます。中心化後は一次の項が消えるため、指数級数の二次以降を等比級数で支配できます。

<!-- proof-start -->
### 証明

任意の $s>0,u>0$ に対し[指数Markov法](../HDP1/index.md#prop-hdp1-exponential-markov)から

$$
P(X\ge s)\le e^{-us}Ee^{uX}
\le e^{-us+K^2u^2/2}.
$$

$u=s/K^2$ とし、$-X$ にも同じ操作をすると

$$
P(|X|\ge s)\le2e^{-s^2/(2K^2)}.
$$

非負確率変数 $|X|^{2p}$ の尾部積分を用い、整数 $p\ge1$ について $z=s^2/(2K^2)$ と変数変換して

$$
\begin{aligned}
E|X|^{2p}
&=2p\int_0^\infty s^{2p-1}P(|X|>s)\,ds\\
&\le4p\int_0^\infty s^{2p-1}e^{-s^2/(2K^2)}\,ds\\
&=2p(2K^2)^p\int_0^\infty z^{p-1}e^{-z}\,dz\\
&=2(2K^2)^p p!.
\end{aligned}
$$

$Y=X^2-EX^2$ とし、整数 $p\ge1$ を固定します。まず $a=EX^2$ と置きます。$a=0$ なら $X=0$ がほとんど確実に成り立ち、結論は自明です。$a>0$ の場合、任意の $z\ge0$ に対する初等不等式

$$
z^p\ge pz-(p-1)
$$

を $z=X^2/a$ に適用します。この不等式は、左辺から右辺を引いた関数の導関数が $p(z^{p-1}-1)$ で、最小値 $0$ を $z=1$ で取ることから分かります。$E(X^2/a)=1$ を使って期待値を取れば

$$
\frac{E|X|^{2p}}{a^p}
\ge pE(X^2/a)-(p-1)=1,
\qquad
(EX^2)^p\le E|X|^{2p}.
$$

次に非負数 $u,v$ について $(u+v)^p\le2^{p-1}(u^p+v^p)$ が成り立ちます。$u=|X|^2$、$v=EX^2$ として $|Y|\le u+v$ を使えば

$$
\begin{aligned}
E|Y|^p
&\le2^{p-1}\{E|X|^{2p}+(EX^2)^p\}\\
&\le2^p E|X|^{2p}.
\end{aligned}
$$

したがって $E|Y|^p\le 2^pE|X|^{2p}\le2(4K^2)^pp!$ です。$EY=0$ を用いて指数級数の一次項を除くと、$r=4K^2|\lambda|\le1/2$ の範囲で

$$
\begin{aligned}
Ee^{\lambda Y}
&=1+\sum_{p=2}^{\infty}\frac{\lambda^pEY^p}{p!}\\
&\le1+2\sum_{p=2}^{\infty}r^p
=1+\frac{2r^2}{1-r}\\
&\le 1+4r^2\le e^{4r^2}
=e^{64\lambda^2K^4}.
\end{aligned}
$$

絶対収束は上記の絶対モーメント評価と $r<1$ から保証されます。これで正負双方の $\lambda$ に対して成立します。
<!-- proof-end -->

<a id="lem-hdp9-diagonal-mgf"></a>

<!-- formal-statement-start -->
> **補題（独立な対角項の指数モーメント）**  
> $X_1,\ldots,X_n$ は独立・平均零で共通代理量 $K>0$ を満たすとする。確定実数 $a_1,\ldots,a_n$ と $D=\sum_i a_i(X_i^2-EX_i^2)$ を考える。$M=\max_i|a_i|$ とすると、$M>0$ かつ $|\lambda|\le1/(8K^2M)$ で

$$
Ee^{\lambda D}\le
\exp\left(64\lambda^2K^4\sum_{i=1}^n a_i^2\right).
$$

> $M=0$ なら $D=0$ であり、すべての $\lambda$ で同じ結論が成り立つ。
<!-- formal-statement-end -->

### 証明の見取り図

各 $a_i(X_i^2-EX_i^2)$ に前の補題を使い、独立性で積へ分解します。

<!-- proof-start -->
### 証明

$M>0$ なら各 $|\lambda a_i|\le 1/(8K^2)$ です。[モーメント母関数代理量からの平方評価](#lem-hdp9-square-mgf)から

$$
Ee^{\lambda a_i(X_i^2-EX_i^2)}
\le e^{64\lambda^2a_i^2K^4}.
$$

$X_i$ が独立なので平方の関数も独立であり、

$$
Ee^{\lambda D}
=\prod_{i=1}^n Ee^{\lambda a_i(X_i^2-EX_i^2)}
\le\prod_{i=1}^n e^{64\lambda^2a_i^2K^4}
=e^{64\lambda^2K^4\sum_i a_i^2}.
$$
<!-- proof-end -->

## 3. 非対角部分：ランダム分割とGaussian比較

非対角部分 $S_A=\sum_{i\ne j}a_{ij}X_iX_j$ を、無理に独立和と扱うことはできません。そこで各座標を確率 $1/2$ で二群へ振り分け、一方の群を固定すれば他方の群について線形和になる形へ変換します。

具体的に、$X$ と独立なBernoulli変数 $\delta_i\in\{0,1\}$ を互いに独立に用意し、$I=\{i:\delta_i=1\}$、$J=\{j:\delta_j=0\}$ とします。両群にまたがる和を

$$
T_\delta=\sum_{i\in I}\sum_{j\in J}a_{ij}X_iX_j
$$

とすると、$i\ne j$ に対して $P(i\in I,j\in J)=1/4$ なので $E_\delta T_\delta=S_A/4$ です。この平均の順序を確かめることが、比較の核心です。

<a id="lem-hdp9-gaussian-comparison"></a>

<!-- formal-statement-start -->
> **補題（独立sub-Gaussian線形像のGaussian比較）**  
> $Z=(Z_1,\ldots,Z_m)^{\mathsf T}$ は独立な平均零の実数値確率変数からなり、すべての $i,u$ に対し $Ee^{uZ_i}\le e^{K^2u^2/2}$ とする。$B\in\mathbb R^{r\times m}$ は確定行列、$K>0$、$\alpha\ge0$ とする。$G\sim N(0,I_r)$ は $Z$ と独立とする。このとき

$$
Ee^{\alpha\|BZ\|_2^2}
\le Ee^{\alpha K^2\|B^{\mathsf T}G\|_2^2}.
$$

> さらに $4\alpha K^2\|B\|_{\mathrm{op}}^2\le1$ なら右辺は有限で、

$$
Ee^{\alpha\|BZ\|_2^2}
\le\exp\left(2\alpha K^2\|B\|_{\mathrm F}^2\right).
$$
<!-- formal-statement-end -->

### 証明の見取り図

Gaussianの一変量モーメント母関数 $Ee^{uG_1}=e^{u^2/2}$ を利用し、ノルムの二乗の指数を、$G$ との内積の指数に書き換えます。$Z$ については独立性で評価し、最後は特異値ごとのGaussian二乗指数モーメントを掛けます。

<!-- proof-start -->
### 証明

固定 $z\in\mathbb R^m$ に対して $\langle G,Bz\rangle$ は平均零・分散 $\|Bz\|_2^2$ の正規変数なので、$\alpha\ge0$ で

$$
e^{\alpha\|Bz\|_2^2}
=E_Ge^{\sqrt{2\alpha}\langle G,Bz\rangle}.
$$

非負の被積分関数に対し期待値の順序を交換します。$G=g$ を固定すると $\langle g,BZ\rangle=\sum_i(B^{\mathsf T}g)_iZ_i$ だから、独立性と共通代理量より

$$
\begin{aligned}
E_Ze^{\sqrt{2\alpha}\langle g,BZ\rangle}
&=\prod_i Ee^{\sqrt{2\alpha}(B^{\mathsf T}g)_iZ_i}\\
&\le \prod_i e^{\alpha K^2(B^{\mathsf T}g)_i^2}
=e^{\alpha K^2\|B^{\mathsf T}g\|_2^2}.
\end{aligned}
$$

$B$ の非零特異値を $\sigma_1,\ldots,\sigma_q$ とします。[特異値分解](../../../基礎科目/LA/LA6/index.md#thm-la6-complex-svd)と標準正規ベクトルの直交不変性により $\|B^{\mathsf T}G\|_2^2$ は $\sum_{k=1}^q\sigma_k^2G_k^2$ と同分布です。実数 $0\le s<1/2$ では正規密度の積分から

$$
Ee^{sG_k^2}=
\frac{1}{\sqrt{2\pi}}\int_{\mathbb R}
e^{-(1-2s)x^2/2}\,dx
=(1-2s)^{-1/2}.
$$

よって $\alpha K^2\sigma_k^2<1/2$ なら

$$
\log Ee^{\alpha K^2\|B^{\mathsf T}G\|_2^2}
=-\frac12\sum_{k=1}^q\log(1-2\alpha K^2\sigma_k^2).
$$

$0\le z\le1/2$ に対し $-\log(1-z)=\int_0^z(1-v)^{-1}dv\le2z$ です。仮定から $z_k=2\alpha K^2\sigma_k^2\le1/2$ なので

$$
-\frac12\sum_k\log(1-z_k)
\le \sum_k z_k
=2\alpha K^2\sum_k\sigma_k^2
=2\alpha K^2\|B\|_{\mathrm F}^2.
$$

$\alpha=0$ または $B=0$ の場合も両辺は $1$ で成立します。
<!-- proof-end -->

<a id="lem-hdp9-offdiagonal-mgf"></a>

<!-- formal-statement-start -->
> **補題（非対角二次形式の指数モーメント）**  
> $X_1,\ldots,X_n$ は独立で、平均零・共通代理量 $K>0$ を満たすとする。$A=A^{\mathsf T}\in\mathbb R^{n\times n}$ は確定行列、$S_A=\sum_{i\ne j}a_{ij}X_iX_j$ とする。$A\ne0$ で

$$
|\lambda|\le
\frac{1}{\sqrt{32}\,K^2\|A\|_{\mathrm{op}}}
$$

> なら、次が成立する。

$$
Ee^{\lambda S_A}
\le\exp\left(16\lambda^2K^4\|A\|_{\mathrm F}^2\right).
$$

> $A=0$ の場合は $S_A=0$ とする。
<!-- formal-statement-end -->

### 証明の見取り図

分割の有限平均に指数関数の二点平均不等式を繰り返し適用して、$S_A$ を $4T_\delta$ へ置き換えます。群 $I$ を固定すれば $J$ の座標の線形和になるので、もう一度指数モーメントを取ってGaussian比較を適用します。部分行列の両ノルムは元の $A$ を超えません。

<!-- proof-start -->
### 証明

$I,J$ を冒頭の独立なランダム分割とすると、固定 $X$ に対して $S_A=4E_\delta T_\delta$ です。分割 $\delta$ の $2^n$ 通りは全て等確率です。任意の実数 $a,b$ について、$(e^{a/2}-e^{b/2})^2\ge0$ を展開すると $2e^{(a+b)/2}\le e^a+e^b$ なので

$$
e^{(a+b)/2}=\sqrt{e^ae^b}\le\frac{e^a+e^b}{2}
$$

です。これを $2^n$ 個の数に対して二個ずつ組にして $n$ 段繰り返すと、指数関数の有限平均不等式が得られます。各数に $4\lambda T_\delta$ を入れれば、正負どちらの $\lambda$ に対しても

$$
e^{\lambda S_A}
=\exp\left(\frac1{2^n}\sum_{\delta\in\{0,1\}^n}4\lambda T_\delta\right)
\le\frac1{2^n}\sum_{\delta\in\{0,1\}^n}e^{4\lambda T_\delta}
=E_\delta e^{4\lambda T_\delta}.
$$

ここでは $X$ を固定したまま分割だけを平均しており、積同士の独立性を仮定していません。

$I,J$ の実現を固定し、部分行列 $B=A_{J,I}$ と $Z=X_I$ を置きます。$T_\delta=(X_J)^{\mathsf T}BZ$ です。$X_I$ と $X_J$ の独立性から、$Z$ を固定して後者で期待値を取ると

$$
E_{X_J}e^{4\lambda(X_J)^{\mathsf T}BZ}
\le\exp\left(\frac{K^2(4\lambda)^2}{2}\|BZ\|_2^2\right)
=e^{8\lambda^2K^2\|BZ\|_2^2}.
$$

[Gaussian比較補題](#lem-hdp9-gaussian-comparison)の $\alpha=8\lambda^2K^2$ を使います。$B$ は座標選択行列 $P_J,P_I$ により $B=P_JAP_I^{\mathsf T}$ と表せるので

$$
\|B\|_{\mathrm{op}}\le\|A\|_{\mathrm{op}},
\qquad
\|B\|_{\mathrm F}^2
=\sum_{j\in J,i\in I}a_{ji}^2
\le\|A\|_{\mathrm F}^2.
$$

指定した $\lambda$ の範囲では

$$
4\alpha K^2\|B\|_{\mathrm{op}}^2
=32\lambda^2K^4\|B\|_{\mathrm{op}}^2
\le1.
$$

したがって

$$
\begin{aligned}
E_Xe^{4\lambda T_\delta}
&\le E_Ze^{8\lambda^2K^2\|BZ\|_2^2}\\
&\le e^{16\lambda^2K^4\|B\|_{\mathrm F}^2}
\le e^{16\lambda^2K^4\|A\|_{\mathrm F}^2}.
\end{aligned}
$$

右辺は分割 $\delta$ に依存しません。最初のJensen不等式で残っている $E_\delta$ を取れば結論が得られます。$I$ または $J$ が空なら $T_\delta=0$ で同じ評価が成立します。
<!-- proof-end -->

## 4. Hanson–Wright不等式を証明する

ここまでの二つの指数モーメント評価は、それぞれ $D_A$ と $S_A$ を扱いました。しかし $D_A$ と $S_A$ は**互いに独立ではありません**。ここで積に分けるのでなく、[Cauchy–Schwarz不等式](../../../基礎科目/F0/F0-00E2/index.md#thm-f0-00e2-cauchy-schwarz)を使います。

<a id="lem-hdp9-quadratic-mgf"></a>

<!-- formal-statement-start -->
> **補題（中心化二次形式の局所指数モーメント）**  
> $n\ge1$、$X_i$ は独立な平均零の実数値確率変数で、共通代理量 $K>0$ を満たすとする。確定実対称行列 $A\in\mathbb R^{n\times n}$ が $A\ne0$ であるとする。$Q_A=X^{\mathsf T}AX-E[X^{\mathsf T}AX]$ とおくと、

$$
|\lambda|\le\frac{1}{16K^2\|A\|_{\mathrm{op}}}
$$

> の範囲で次が成立する。

$$
Ee^{\lambda Q_A}
\le\exp\left(160\lambda^2K^4\|A\|_{\mathrm F}^2\right).
$$
<!-- formal-statement-end -->

### 証明の見取り図

$Q_A=D_A+S_A$ に対して平方根の積の形で指数モーメントを比較し、二つの補題のパラメータ範囲を照合します。

<!-- proof-start -->
### 証明

[Cauchy–Schwarz不等式](../../../基礎科目/F0/F0-00E2/index.md#thm-f0-00e2-cauchy-schwarz)を $e^{\lambda D_A}$ と $e^{\lambda S_A}$ に適用して

$$
Ee^{\lambda(D_A+S_A)}
\le (Ee^{2\lambda D_A})^{1/2}
(Ee^{2\lambda S_A})^{1/2}.
$$

実対称 $A$ では単位ベクトル $e_i$ に対して $|a_{ii}|=|e_i^{\mathsf T}Ae_i|\le\|Ae_i\|_2\le\|A\|_{\mathrm{op}}$ です。仮定 $|\lambda|\le1/(16K^2\|A\|_{\mathrm{op}})$ から

$$
|2\lambda|\le\frac1{8K^2\|A\|_{\mathrm{op}}}
$$

となります。最大対角成分の絶対値が正なら右辺は $1/(8K^2\max_i|a_{ii}|)$ 以下なので、[対角項の補題](#lem-hdp9-diagonal-mgf)を使えます。全対角成分が零なら $D_A=0$ です。また $8>\sqrt{32}$ なので

$$
|2\lambda|
\le\frac1{8K^2\|A\|_{\mathrm{op}}}
\le\frac1{\sqrt{32}K^2\|A\|_{\mathrm{op}}}
$$

となり、[非対角項の補題](#lem-hdp9-offdiagonal-mgf)も使えます。


よって

$$
\begin{aligned}
\log Ee^{\lambda Q_A}
&\le\frac12\cdot64(2\lambda)^2K^4\sum_i a_{ii}^2
+\frac12\cdot16(2\lambda)^2K^4\|A\|_{\mathrm F}^2\\
&=128\lambda^2K^4\sum_i a_{ii}^2
+32\lambda^2K^4\|A\|_{\mathrm F}^2\\
&\le160\lambda^2K^4\|A\|_{\mathrm F}^2.
\end{aligned}
$$
<!-- proof-end -->

<a id="thm-hdp9-hanson-wright"></a>

<!-- formal-statement-start -->
> **定理（Hanson–Wrightの二次形式集中不等式）**  
> $n\ge1$ とする。$X=(X_1,\ldots,X_n)^{\mathsf T}$ の実数値座標は互いに独立で、$EX_i=0$、すべての $u\in\mathbb R$ で $Ee^{uX_i}\le e^{K^2u^2/2}$ を満たす共通定数 $K>0$ があるとする。$A\in\mathbb R^{n\times n}$ は確定行列とし、$H=(A+A^{\mathsf T})/2$ と置く。$H\ne0$ なら任意の $t>0$ について

$$
P\left(\left|X^{\mathsf T}AX-E[X^{\mathsf T}AX]\right|\ge t\right)
\le2\exp\left[
-\min\left\{
\frac{t^2}{640K^4\|H\|_{\mathrm F}^2},
\frac{t}{64K^2\|H\|_{\mathrm{op}}}
\right\}\right].
$$

> $H=0$ なら二次形式は恒等的に零であり、左辺は $0$ となる。
<!-- formal-statement-end -->

### 証明の見取り図

反対称部分は二次形式に寄与しません。[中心化二次形式の局所指数モーメント](#lem-hdp9-quadratic-mgf)と[指数Markov法](../HDP1/index.md#prop-hdp1-exponential-markov)により、指数中の二次項と一次項を釣り合わせます。小偏差では $\lambda$ を $t$ に比例させ、大偏差では許された最大の $\lambda$ に固定します。

<!-- proof-start -->
### 証明

$X^{\mathsf T}AX=X^{\mathsf T}HX$ なので $H$ を $A$ と改めて書きます。$A\ne0$ とし、

$$
v=K^4\|A\|_{\mathrm F}^2>0,
\qquad
b=\frac{1}{16K^2\|A\|_{\mathrm{op}}}>0
$$

と置きます。[中心化指数モーメント補題](#lem-hdp9-quadratic-mgf)で $0\le\lambda\le b$ について $Ee^{\lambda Q_A}\le e^{160v\lambda^2}$ です。[指数Markov法](../HDP1/index.md#prop-hdp1-exponential-markov)を $e^{\lambda Q_A}$ に適用すると

$$
P(Q_A\ge t)\le\exp(-\lambda t+160v\lambda^2).
$$

ここでは明示的に $\lambda=\min\{t/(320v),b/2\}$ を選びます。

$t/(320v)\le b/2$ のときは $\lambda=t/(320v)$ とでき、指数は

$$
-\frac{t^2}{320v}
+160v\frac{t^2}{(320v)^2}
=-\frac{t^2}{640v}.
$$

$t/(320v)>b/2$ のときは $t>160vb$ です。$\lambda=b/2$ を代入して

$$
-\frac{bt}{2}+160v\frac{b^2}{4}
=-\frac{bt}{2}+40vb^2
<-\frac{bt}{2}+\frac{bt}{4}
=-\frac{bt}{4}.
$$

以上を合わせ

$$
P(Q_A\ge t)\le
\exp\left[-\min\left\{\frac{t^2}{640v},\frac{bt}{4}\right\}\right].
$$

$-Q_A=Q_{-A}$ であり、$-A$ の二つのノルムは $A$ と等しいので、$P(Q_A\le-t)$ にも同じ評価が使えます。両側を和集合で結合し、$v$ と $b$ の定義を代入すれば主張どおりです。$A=0$ の場合は $Q_A=0$ です。
<!-- proof-end -->

二領域の境目は $t$ が概ね $K^2\|A\|_{\mathrm F}^2/\|A\|_{\mathrm{op}}$ の大きさになる場所です。前半は多くの小さな寄与を足した平方根型、後半は最大方向が支配する指数型の偏差になります。定数 $640$ と $64$ は証明の簡潔さを優先した保守的な値です。

## 5. 具体例・応用と落とし穴

### 例1：独立な符号座標

$X_i=R_i$ を独立なRademacher変数、$A=\begin{pmatrix}0&1\\1&0\end{pmatrix}$ とすると $X^{\mathsf T}AX=2R_1R_2$、期待値は $0$ です。$A^2=I_2$ なので $\|A\|_{\mathrm F}^2=2$、$\|A\|_{\mathrm{op}}=1$、$K=1$ です。この例では $|Q_A|=2$ が確率一で成立します。上の一般的な不等式は普遍的な上界であって、低次元で鋭いことを保証しません。

### 例2：独立な標準正規変数の長さ

$G_i$ を独立な標準正規変数とし $A=I_n$ と置きます。$Q_A=\sum_i(G_i^2-1)$ で、$\|A\|_{\mathrm F}^2=n$、$\|A\|_{\mathrm{op}}=1$ です。したがって

$$
P\left(\left|\|G\|_2^2-n\right|\ge t\right)
\le2\exp\left[-\min\left\{\frac{t^2}{640n},\frac{t}{64}\right\}\right].
$$

標本二乗ノルムの揺らぎが $\sqrt n$ 程度になることと、大きな偏差で指数の減衰が一次型になることの両方が読めます。

<a id="cor-hdp9-positive-quadratic"></a>

<!-- formal-statement-start -->
> **系（確定行列で変換した独立座標の二乗ノルム）**  
> $X\in\mathbb R^n$ は独立な平均零の座標からなり、共通代理量 $K>0$ を持つとする。確定行列 $B\in\mathbb R^{m\times n}$ と $A=B^{\mathsf T}B$ に対し、$A\ne0$ なら任意の $t>0$ で

$$
P\left(\left|\|BX\|_2^2-E\|BX\|_2^2\right|\ge t\right)
\le2\exp\left[-\min\left\{
\frac{t^2}{640K^4\|A\|_{\mathrm F}^2},
\frac{t}{64K^2\|A\|_{\mathrm{op}}}
\right\}\right].
$$

> $B=0$ の場合、左辺は $0$ となる。
<!-- formal-statement-end -->

### 証明の見取り図

ノルムの二乗は $X^{\mathsf T}(B^{\mathsf T}B)X$ であり、$A$ は対称半正定値です。したがってHanson–Wright定理をそのまま適用できます。

<!-- proof-start -->
### 証明

$\|BX\|_2^2=(BX)^{\mathsf T}BX=X^{\mathsf T}B^{\mathsf T}BX$ です。$B^{\mathsf T}B$ は $n\times n$ の確定実対称行列で、[Hanson–Wrightの二次形式集中不等式](#thm-hdp9-hanson-wright)の行列の条件を満たします。$A\ne0$ なら主定理の $H=A$ に置けばよく、$A=0$ なら $0=x^{\mathsf T}Ax=\|Bx\|_2^2$ がすべての $x$ で成立するので $B=0$ です。
<!-- proof-end -->

この系は固定の線形変換後のエネルギーや、回帰・ランダム射影で現れる二乗残差のゆらぎに使えます。ただし **各座標 $X_i$ が互いに独立である仮定** は「任意方向の射影がsub-Gaussian」という条件とは異なります。

**独立性を失った反例**。$G\sim N(0,1)$ とし、すべての $i$ で $X_i=G$ とします。各座標は平均零で $K=1$ のsub-Gaussianですが、座標同士は完全に従属です。$A=I_n$ では

$$
Q_A=n(G^2-1),\qquad
P(|Q_A|\ge n)=P(|G^2-1|\ge1)
\ge P(|G|\ge\sqrt2)>0.
$$

独立性を誤って仮定すると上界が $2e^{-\min(n/640,n/64)}=2e^{-n/640}$ と $n\to\infty$ で $0$ になり、矛盾します。壊れたのは、[対角項の積への分解](#lem-hdp9-diagonal-mgf)と[群間独立を使うGaussian比較](#lem-hdp9-offdiagonal-mgf)です。

**対称化を忘れる誤り**。二次形式に関係するのは $A$ の対称部分です。純粋な反対称行列 $A^{\mathsf T}=-A$ なら $x^{\mathsf T}Ax=0$ ですから、そのまま $\|A\|$ を使用すると有効ではあっても不要に緩い評価になります。

## 6. 演習：二次形式の証明を再構成する

**Level A：仮定・分解・最小計算**

### A1. 非対称行列の対称化

$A=\begin{pmatrix}1&3\\-1&2\end{pmatrix}$ に対して $H=(A+A^{\mathsf T})/2$ と $x^{\mathsf T}Ax$ を求め、$x^{\mathsf T}Hx$ と一致することを確認せよ。

- Level: A
- ID: HDP9-A1

<!-- solution-start -->
**詳細解答**　対称部分は

$$
H=\frac12(A+A^{\mathsf T})
=\frac12\begin{pmatrix}2&2\\2&4\end{pmatrix}
=\begin{pmatrix}1&1\\1&2\end{pmatrix}
$$

です。$x=(x_1,x_2)^{\mathsf T}$ とすると

$$
\begin{aligned}
Ax&=(x_1+3x_2,-x_1+2x_2)^{\mathsf T},\\
x^{\mathsf T}Ax&=x_1(x_1+3x_2)+x_2(-x_1+2x_2)
=x_1^2+2x_1x_2+2x_2^2,\\
Hx&=(x_1+x_2,x_1+2x_2)^{\mathsf T},\\
x^{\mathsf T}Hx&=x_1(x_1+x_2)+x_2(x_1+2x_2)
=x_1^2+2x_1x_2+2x_2^2.
\end{aligned}
$$

二次形式が一致することを確認できました。
<!-- solution-end -->

### A2. 独立符号変数と中心化

独立なRademacher変数 $R_1,R_2$ と $A=\begin{pmatrix}2&1\\1&-3\end{pmatrix}$ に対して、$Q_A$、$D_A$、$S_A$ を計算せよ。

- Level: A
- ID: HDP9-A2

<!-- solution-start -->
**詳細解答**　$R_i^2=1$ より $R^{\mathsf T}AR=2R_1^2+2R_1R_2-3R_2^2=-1+2R_1R_2$ です。独立・平均零なので $E(R_1R_2)=ER_1 ER_2=0$、従って期待値は $-1$ です。$D_A=2(R_1^2-1)-3(R_2^2-1)=0$、$S_A=1\cdot R_1R_2+1\cdot R_2R_1=2R_1R_2$、ゆえに $Q_A=2R_1R_2$ です。
<!-- solution-end -->

### A3. ノルムの使い分け

$A=\operatorname{diag}(1,-2,2)$ の二つのノルムを計算し、$\max_i|a_{ii}|\le\|A\|_{\mathrm{op}}$ を確認せよ。

- Level: A
- ID: HDP9-A3

<!-- solution-start -->
**詳細解答**　成分の二乗和は $1+4+4=9$ なので $\|A\|_{\mathrm F}=3$ です。$\|Ax\|_2^2=x_1^2+4x_2^2+4x_3^2\le4\|x\|_2^2$ で $x=(0,1,0)^{\mathsf T}$ は等号を与えるので $\|A\|_{\mathrm{op}}=2$ です。最大対角絶対値は $2$ で作用素ノルムと一致します。
<!-- solution-end -->

### A4. ランダム分割の係数

$n=2$、$S_A=2a_{12}X_1X_2$（$A$ 対称・対角零）とする。$I,J$ を独立な公平Bernoulliによって分割した $T_\delta$ の4通りの値と $E_\delta T_\delta$ を求めよ。

- Level: A
- ID: HDP9-A4

<!-- solution-start -->
**詳細解答**　片方の群が空なら和を取る組は存在しないので $T_\delta=0$ です。残る二つの分割は一つずつの項を与えます。

$$
\begin{array}{c|c}
(\delta_1,\delta_2)&T_\delta\\ \hline
(0,0)&0\\
(1,1)&0\\
(1,0)&a_{12}X_1X_2\\
(0,1)&a_{21}X_2X_1=a_{12}X_1X_2
\end{array}
$$

各分割の確率が $1/4$ であることから、

$$
E_\delta T_\delta
=\frac{0+0+a_{12}X_1X_2+a_{12}X_1X_2}{4}
=\frac{a_{12}X_1X_2}{2}
=\frac{S_A}{4}.
$$

対称性 $a_{21}=a_{12}$ を使う場所が重要です。
<!-- solution-end -->

### A5. 正規二乗の指数モーメントの定義域

$G\sim N(0,1)$ とする。$Ee^{sG^2}$ を正規密度から計算し、有限となる $s$ の範囲を求めよ。

- Level: A
- ID: HDP9-A5

<!-- solution-start -->
**詳細解答**　正規密度を代入すると $Ee^{sG^2}=(2\pi)^{-1/2}\int_{\mathbb R}e^{-(1-2s)x^2/2}dx$ です。$1-2s>0$ なら $y=\sqrt{1-2s}\,x$ により $(1-2s)^{-1/2}$ を得ます。$s=1/2$ では被積分関数が定数、$s>1/2$ では無限遠で増大するので積分は発散します。よって $s<1/2$ でのみ有限です。
<!-- solution-end -->

**Level B：補題を独立に組み立てる**

### B1. 二乗のモーメントから指数へ

平均零・共通代理量 $K$ の実数値変数 $X$ に対し、$Y=X^2-EX^2$ とする。$E|Y|^p\le2(4K^2)^pp!$ を用いて $|\lambda|\le1/(8K^2)$ で $Ee^{\lambda Y}\le e^{64\lambda^2K^4}$ を再導出せよ。

- Level: B
- ID: HDP9-B1

<!-- solution-start -->
**詳細解答**　$EY=0$ なので指数級数の $p=1$ 項が消えます。$r=4K^2|\lambda|\le1/2$ と置き、$p\ge2$ の絶対値をモーメント上界で押さえると $Ee^{\lambda Y}\le1+\sum_{p\ge2}2r^p=1+2r^2/(1-r)$ です。$1/(1-r)\le2$ より $1+2r^2/(1-r)\le1+4r^2\le e^{4r^2}=e^{64\lambda^2K^4}$。収束は $r<1$ によります。
<!-- solution-end -->

### B2. Gaussian比較の最小行列

独立な平均零sub-Gaussian変数 $Z_1,Z_2$ が共通代理量 $K$ を持ち、$B=(a,b)\in\mathbb R^{1\times2}$ とする。$0\le\alpha\le1/\{4K^2(a^2+b^2)\}$（$(a,b)\ne(0,0)$）で $Ee^{\alpha(aZ_1+bZ_2)^2}\le e^{2\alpha K^2(a^2+b^2)}$ を証明せよ。

- Level: B
- ID: HDP9-B2

<!-- solution-start -->
**詳細解答**　$Z_1,Z_2$ と独立な $G\sim N(0,1)$ を導入します。$z=(z_1,z_2)$ を固定して正規モーメント母関数を使うと

$$
e^{\alpha(az_1+bz_2)^2}
=E_Ge^{\sqrt{2\alpha}G(az_1+bz_2)}
$$

です。次に $G=g$ を固定し、$Z_1,Z_2$ の独立性と指数モーメント代理量を使うと

$$
\begin{aligned}
E_Ze^{\sqrt{2\alpha}g(aZ_1+bZ_2)}
&=Ee^{\sqrt{2\alpha}gaZ_1}\,Ee^{\sqrt{2\alpha}gbZ_2}\\
&\le e^{\alpha K^2a^2g^2}e^{\alpha K^2b^2g^2}
=e^{\alpha K^2(a^2+b^2)g^2}.
\end{aligned}
$$

非負の指数関数について期待値の順序を交換できます。$s=\alpha K^2(a^2+b^2)\le1/4$ と置けば、[本章で求めた正規二乗の指数モーメント](#lem-hdp9-gaussian-comparison)と同じ密度積分から

$$
Ee^{\alpha(aZ_1+bZ_2)^2}
\le Ee^{sG^2}=(1-2s)^{-1/2}
$$

です。$0\le2s\le1/2$ だから $-\log(1-2s)\le4s$ です。右辺の対数は $-\frac12\log(1-2s)\le2s$ となるので、所望の上界 $e^{2\alpha K^2(a^2+b^2)}$ が得られます。
<!-- solution-end -->

### B3. パラメータの選択と二領域

中心化変数 $Y$ が $Ee^{\lambda Y}\le e^{cv\lambda^2}$（$|\lambda|\le b$）、$c,v,b>0$ を満たすとする。$\lambda=\min(t/(2cv),b/2)$ として $P(|Y|\ge t)$ の上界を求めよ。

- Level: B
- ID: HDP9-B3

<!-- solution-start -->
**詳細解答**　$Y$ の指数モーメントの仮定は正負両方の $\lambda$ で成り立ちます。まず $t>0$ について[指数Markov法](../HDP1/index.md#prop-hdp1-exponential-markov)を $e^{\lambda Y}$ に適用すると、$0<\lambda\le b$ で

$$
P(Y\ge t)\le e^{-\lambda t+cv\lambda^2}
$$

です。指定された $\lambda=\min\{t/(2cv),b/2\}$ は必ず $0<\lambda\le b$ に入ります。

$t/(2cv)\le b/2$ の場合、$\lambda=t/(2cv)$ を代入すると

$$
-\lambda t+cv\lambda^2
=-\frac{t^2}{2cv}+\frac{t^2}{4cv}
=-\frac{t^2}{4cv}.
$$

逆の場合は $t>cvb$ です。$\lambda=b/2$ とすると

$$
-\lambda t+cv\lambda^2
=-\frac{bt}{2}+\frac{cvb^2}{4}
<-\frac{bt}{2}+\frac{bt}{4}
=-\frac{bt}{4}.
$$

$-Y$ にも同じ指数モーメント評価を適用し、$P(Y\ge t)+P(-Y\ge t)$ で両側を評価します。従って

$$
P(|Y|\ge t)\le
2\exp\left[-\min\left\{\frac{t^2}{4cv},\frac{bt}{4}\right\}\right].
$$
<!-- solution-end -->

### B4. 独立性が失われる反例

$G\sim N(0,1)$、$X=(G,\ldots,G)^{\mathsf T}\in\mathbb R^n$、$A=I_n$ とする。各座標のsub-Gaussian性を確認し、独立版のHanson–Wright上界がこの例に一様には適用できないことを示せ。

- Level: B
- ID: HDP9-B4

<!-- solution-start -->
**詳細解答**　各 $X_i=G$ は平均零で $Ee^{uX_i}=e^{u^2/2}$ なので代理量 $K=1$ です。しかしすべて同じ確率変数なので独立ではありません。$X^{\mathsf T}AX=\sum_iG^2=nG^2$、期待値は $n$ です。したがって $P(|Q_A|\ge n)=P(|G^2-1|\ge1)\ge P(|G|\ge\sqrt2)>0$ は $n$ に依存しません。一方、$A=I_n$ は $\|A\|_{\mathrm F}^2=n$、$\|A\|_{\mathrm{op}}=1$ なので独立版を誤用すると上界は $2e^{-n/640}\to0$ です。壊れたのは座標独立性による指数モーメントの積への分解です。
<!-- solution-end -->

**Level C：総合的な再構成**

### C1. 重み付き正規二乗和の非漸近評価

独立な $G_i\sim N(0,1)$ と実数 $w_1,\ldots,w_n$ に対して $T=\sum_iw_i(G_i^2-1)$ とする。(1) $T$ の行列表現、(2) 分散、(3) Hanson–Wrightによる両側上界、(4) 全ての $w_i=1$ の場合の評価を求めよ。

- Level: C
- ID: HDP9-C1

<!-- solution-start -->
**詳細解答**　(1) $A=\operatorname{diag}(w_1,\ldots,w_n)$ とすると $G^{\mathsf T}AG=\sum_iw_iG_i^2$、期待値は $\sum_iw_i$ なので $T=Q_A$ です。(2) 独立性により共分散の交差項は零です。標準正規分布の四次モーメント $EG_i^4=3$（正規密度の部分積分で $EG^4=3EG^2=3$）を用いると、$\operatorname{Var}(G_i^2)=3-1=2$ で、

$$
\operatorname{Var}(T)
=\sum_i w_i^2\operatorname{Var}(G_i^2)
=2\sum_iw_i^2.
$$

(3) 標準正規なので $K=1$、$\|A\|_{\mathrm F}^2=\sum_iw_i^2$、$\|A\|_{\mathrm{op}}=\max_i|w_i|$ です。[Hanson–Wrightの二次形式集中不等式](#thm-hdp9-hanson-wright)から、少なくとも一つの重みが非零なら

$$
P(|T|\ge t)\le2\exp\left[-\min\left\{
\frac{t^2}{640\sum_iw_i^2},
\frac{t}{64\max_i|w_i|}
\right\}\right].
$$

全重み零なら $T=0$ です。(4) $w_i=1$ なら分散は $2n$、上界は $2\exp[-\min\{t^2/(640n),t/64\}]$ です。小偏差領域で標準偏差 $\sqrt{2n}$ と整合する $\sqrt n$ の尺度が現れます。
<!-- solution-end -->

### C2. Gaussian二次形式の混合項と数値パラメータ

独立な $G_1,G_2\sim N(0,1)$ と $A=\begin{pmatrix}0&2\\2&0\end{pmatrix}$ を考える。(1) 二次形式と中心化、(2) 二つのノルム、(3) 本章の不等式で $P(|Q_A|\ge t)$ を評価せよ。(4) $G_1,G_2$ を同じ正規変数 $G$ に置き換えた場合に何が変わるか述べよ。

- Level: C
- ID: HDP9-C2

<!-- solution-start -->
**詳細解答**　(1) 二次形式の行列積を展開すると

$$
G^{\mathsf T}AG=G_1(2G_2)+G_2(2G_1)=4G_1G_2.
$$

独立性と平均零から $E(G_1G_2)=EG_1EG_2=0$ なので、$Q_A=4G_1G_2$ です。

(2) Frobeniusノルムは全成分の二乗和で、

$$
\|A\|_{\mathrm F}^2=0^2+2^2+2^2+0^2=8.
$$

一方 $A^2=4I_2$ かつ $A=A^{\mathsf T}$ なので、任意の $x\in\mathbb R^2$ に対して

$$
\|Ax\|_2^2=x^{\mathsf T}A^{\mathsf T}Ax
=x^{\mathsf T}(4I_2)x=4\|x\|_2^2.
$$

従って $\|A\|_{\mathrm{op}}=2$ です。

(3) 各 $G_i$ は独立な中心化標準正規なので共通代理量 $K=1$ を持ちます。[Hanson–Wrightの二次形式集中不等式](#thm-hdp9-hanson-wright)に $H=A$ と前段のノルムを代入し、

$$
P(|4G_1G_2|\ge t)\le
2\exp\left[-\min\left\{\frac{t^2}{640\cdot8},\frac{t}{64\cdot2}\right\}\right]
=2\exp\left[-\min\left\{\frac{t^2}{5120},\frac{t}{128}\right\}\right]
$$

を得ます。

(4) $G_1=G_2=G$ と置くと $G^{\mathsf T}AG=4G^2$、その期待値は $4EG^2=4$、中心化は $4(G^2-1)$ です。二つの座標は同じ変数となり独立性を失うので、(3) の定理は使えません。特定の二次元で不等式が偶然成立するかどうかと、**その適用条件を満たすか**は別の問題です。
<!-- solution-end -->

この章の中心操作は、積の従属性を無視せず、分割した二群を条件付きで独立に扱い、Gaussianのモーメント母関数へ落とすことです。次章では、候補が無限にある場合に、有限集合への和集合評価から一歩進んだ複雑度制御を考えます。
