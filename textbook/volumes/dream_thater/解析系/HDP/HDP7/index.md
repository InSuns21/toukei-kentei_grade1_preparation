# HDP7 sub-Gaussianベクトルと標本共分散

[HDP3のsub-Gaussian条件](../HDP3/index.md#def-hdp3-psi2)は一つの実数値確率変数の尾部を制御し、[HDP6の有限net](../HDP6/index.md#lem-hdp6-volumetric-net)は無限個の方向を有限個へ帰着しました。しかし観測値が $d$ 次元のベクトルなら、共分散は $d\times d$ 行列です。各座標の分散だけが正確でも、座標間の相関を大きく取り違えれば行列全体の推定は失敗します。

例えば $X=(R,R)$（$R$ は平均零のRademacher変数）では、両座標の分散は $1$ ですが、共分散の非対角要素も $1$ です。必要なのはすべての方向 $u$ に対する $E\langle X,u\rangle^2$ の同時評価です。この章では一次元のsub-Gaussian条件を**全方向で一様に**課し、二乗した際の尾部変化を確かめ、有限netから標本共分散の作用素ノルム誤差へ進みます。さらに母平均未知の場合と、共分散が退化している場合の違いも解き分けます。

## 1. 方向ごとの尾部を一つの条件にまとめる

$d\ge1$ とし、$X$ は $\mathbb R^d$ 値確率ベクトル、$\mu=EX$ は各座標の期待値とします。実数値の $\psi_2$ ノルムは[指数積分による定義](../HDP3/index.md#def-hdp3-psi2)を用い、任意の実数値変数 $Y$ について

$$
\|Y\|_{\psi_2}
=\inf\{s>0:E\exp(Y^2/s^2)\le2\}
$$

です。分散を調べるには一座標ずつではなく、方向 $u\in S^{d-1}$ との内積を調べます。方向によって尺度が異なる可能性があるので、その最大値を統一した定数にします。

<a id="def-hdp7-subgaussian-vector"></a>

<!-- formal-statement-start -->
> **定義（sub-Gaussian確率ベクトル）**  
> $d\ge1$、$X\in\mathbb R^d$、$EX=\mu$ とする。すべての $u\in S^{d-1}$ について $\langle X-\mu,u\rangle$ がsub-Gaussianであり、
>
$$
K_{\mathrm{abs}}(X)
=\sup_{\|u\|_2=1}\|\langle X-\mu,u\rangle\|_{\psi_2}<\infty
$$
>
> なら、$X$ をsub-Gaussian確率ベクトルという。特に $K\ge K_{\mathrm{abs}}(X)$ を全方向の一様な尺度として用いる。
<!-- formal-statement-end -->

<!-- definition-example-start: def-hdp7-subgaussian-vector -->
**定義の確認**（独立な符号ベクトル）。 $R_1,\ldots,R_d$ を独立なRademacher変数とし $X=(R_1,\ldots,R_d)$ とします。任意の単位 $u$ に対し $Y=\sum_j u_jR_j$ は平均零です。[Hoeffdingの補題](../HDP1/index.md#lem-hdp1-hoeffding)を各項 $u_jR_j\in[-|u_j|,|u_j|]$ に適用し、独立性から

$$
E e^{\lambda Y}
=\prod_{j=1}^d E e^{\lambda u_jR_j}
\le\prod_{j=1}^d e^{\lambda^2u_j^2/2}
=e^{\lambda^2/2}.
$$

[指数Markov法](../HDP1/index.md#prop-hdp1-exponential-markov)で $\lambda=t$ とし、$-Y$ にも適用すると $P(|Y|\ge t)\le2e^{-t^2/2}$ です。$W=Y^2/8$ について $P(W>v)\le2e^{-4v}$ です。非負な $W$ では $e^W=1+\int_0^\infty e^v\boldsymbol{1}_{\{W>v\}}\,dv$ なので、非負積分の順序を交換して期待値を取ると

$$
E e^{Y^2/8}
=1+\int_0^\infty e^vP(W>v)\,dv
\le1+2\int_0^\infty e^{-3v}\,dv
=\frac53<2.
$$

従ってすべての単位 $u$ に対し $\|Y\|_{\psi_2}\le\sqrt8$ です。一つの $u$ だけでなく、**同じ** $K=\sqrt8$ が全方向に通用することを実際に検証しました。
<!-- definition-example-end -->

異なる座標の間で独立であることは定義には要求しません。固定した有限次元では各座標がsub-Gaussianなら各方向もsub-Gaussianですが、**座標ごとに次元に依存しない尺度があるだけでは、全方向でも同じ尺度が使えるとは限りません**。例えば各 $d$ ごとに $X=(R,\ldots,R)$ と置くと個々の座標の $\psi_2$ ノルムは一定ですが、$u=d^{-1/2}(1,\ldots,1)$ に対して $\langle X,u\rangle=\sqrt d\,R$ であり、全方向の尺度は $\sqrt d$ に比例して増えます。

行列推定では期待値の二次形式が特に単純な場合を基準にします。まず等方性を定義し、それから一般の共分散へ戻します。

<a id="def-hdp7-isotropy"></a>

<!-- formal-statement-start -->
> **定義（等方的確率ベクトル）**  
> $d\ge1$ とし、$X\in\mathbb R^d$ の二次モーメントが有限とする。$EX=0$ かつ $E[XX^{\mathsf T}]=I_d$ なら $X$ を等方的（isotropic）という。これは任意の $u\in\mathbb R^d$ について
>
$$
E\langle X,u\rangle^2=\|u\|_2^2
$$
>
> が成り立つことと同値である（ただし平均零を併せて仮定する）。
<!-- formal-statement-end -->

<!-- definition-example-start: def-hdp7-isotropy -->
**定義の確認**。 独立なRademacher成分を持つ前の $X$ について $EX_j=0$、$EX_j^2=1$ で、$j\ne k$ では独立性から $E[X_jX_k]=EX_jEX_k=0$ です。したがって $E[XX^{\mathsf T}]=I_d$ です。さらに

$$
E\langle X,u\rangle^2
=\sum_{j,k}u_ju_kE[X_jX_k]
=\sum_j u_j^2=\|u\|_2^2.
$$

逆に全 $u$ でこの等式が成立すれば $u=e_j$ により対角成分が $1$ と分かり、$u=e_j+e_k$ により $2E[X_jX_k]=0$ と分かるので、二次モーメント行列は $I_d$ です。
<!-- definition-example-end -->

等方的ならどの単位方向でも $EY^2=1$ です。指数関数の接線不等式 $e^x\ge e^a(1+x-a)$（$e^t\ge1+t$ を $t=x-a$ に適用すれば従う）に $x=Y^2/K^2$、$a=EY^2/K^2$ を代入して期待値を取ると $Ee^{Y^2/K^2}\ge e^{EY^2/K^2}=e^{1/K^2}$ ですから、$\psi_2$ 条件 $Ee^{Y^2/K^2}\le2$ を満たす $K$ は $K^2\ge1/\log2>1$ です。以下の標本数条件で $K\ge1$ を利用する際はこの事実が根拠になります。

## 2. 二乗した射影はどのように集中するか

共分散の方向 $u$ の推定値は、射影の**二乗**を平均した値です。sub-Gaussian変数 $Y$ 自身と $Y^2-EY^2$ とは同じ尾部条件を持ちません。二乗にすると通常のsub-exponential型になり、偏差が小さい領域と大きい領域を分けて扱います。以下は定数まで追えるよう、指数の級数から示します。

<a id="lem-hdp7-square-mgf"></a>

<!-- formal-statement-start -->
> **補題（sub-Gaussian平方の中心化指数モーメント）**  
> 実数値確率変数 $Y$ と $K>0$ が
>
$$
E\exp(Y^2/K^2)\le2
$$
>
> を満たすとする。$Z=Y^2-EY^2$ とおくと、任意の $|\lambda|\le1/(4K^2)$ に対して
>
$$
E e^{\lambda Z}\le\exp(16\lambda^2K^4)
$$
>
> が成立する。$Y$ 自身の平均零は不要である。
<!-- formal-statement-end -->

### 証明の見取り図

まず指数積分から任意次数の偶数モーメントを上から押さえます。平均を引いた変数の一次モーメントは零なので、指数の級数では二次以上だけが残ります。最後に等比級数を足す際の $\lambda$ の範囲が、Bernstein型の「局所的な指数モーメント」の条件になります。

<!-- proof-start -->
### 証明

$W=Y^2\ge0$ とおきます。$e^x=\sum_{k=0}^\infty x^k/k!$ の各項は $x\ge0$ で非負です。単調収束により、整数 $p\ge1$ について

$$
\frac{EW^p}{p!K^{2p}}
\le E e^{W/K^2}\le2,
\qquad EW^p\le2p!K^{2p}.
$$

さらに指数関数の接線不等式 $e^x\ge e^a(1+x-a)$ に $x=W/K^2$、$a=EW/K^2$ を代入し、期待値を取ると

$$
e^{EW/K^2}\le E e^{W/K^2}\le2,
\qquad EW\le K^2\log2<K^2.
$$

$Z=W-EW$ について $|a-b|^p\le2^{p-1}(|a|^p+|b|^p)$ を用いると、$p\ge2$ では

$$
\begin{aligned}
E|Z|^p
&\le2^{p-1}\{EW^p+(EW)^p\}\\
&\le2^{p-1}(2p!K^{2p}+K^{2p})\\
&\le2^{p+1}p!K^{2p}.
\end{aligned}
$$

$EZ=0$ です。$2K^2|\lambda|\le1/2$ なら絶対収束が成立するので、指数級数と期待値を交換して

$$
\begin{aligned}
Ee^{\lambda Z}
&=1+\sum_{p=2}^\infty\frac{\lambda^pEZ^p}{p!}\\
&\le1+\sum_{p=2}^\infty2^{p+1}(|\lambda|K^2)^p\\
&=1+\frac{8\lambda^2K^4}{1-2|\lambda|K^2}\\
&\le1+16\lambda^2K^4
\le e^{16\lambda^2K^4}.
\end{aligned}
$$

最後の二つの不等式では $2|\lambda|K^2\le1/2$ と $1+x\le e^x$ を使いました。これで結論が得られます。
<!-- proof-end -->

<a id="lem-hdp7-fixed-direction"></a>

<!-- formal-statement-start -->
> **補題（固定方向の経験二次モーメント集中）**  
> $Y_1,\ldots,Y_n$ は独立な実数値確率変数で、共通する $K>0$ に対し $Ee^{Y_i^2/K^2}\le2$ を満たすとする。同一分布性は不要である。$Z_i=Y_i^2-EY_i^2$ とおけば、任意の $t>0$ について
>
$$
P\left(\left|\frac1n\sum_{i=1}^n Z_i\right|\ge t\right)
\le2\exp\left[-n\min\left\{\frac{t^2}{64K^4},
\frac{t}{8K^2}\right\}\right].
$$
<!-- formal-statement-end -->

### 証明の見取り図

各 $Z_i$ の指数モーメントを独立性によって掛け、[指数Markov法](../HDP1/index.md#prop-hdp1-exponential-markov)を使います。二次式の頂点が許された $\lambda$ の区間の内側か外側かで二つの尾部領域に分かれます。

<!-- proof-start -->
### 証明

[直前の補題](#lem-hdp7-square-mgf)を各 $Y_i$ に適用し、[独立変数の期待値の因数分解](../../F0/F0-00P3/index.md#thm-f0-00p3-expectation-factorization)により $|\lambda|\le n/(4K^2)$ の範囲で

$$
\begin{aligned}
E\exp\left(\lambda\frac1n\sum_iZ_i\right)
&=\prod_i E e^{(\lambda/n)Z_i}\\
&\le\prod_i\exp(16\lambda^2K^4/n^2)
=\exp(16\lambda^2K^4/n).
\end{aligned}
$$

従って $0\le\lambda\le n/(4K^2)$ について

$$
P\left(\frac1n\sum_iZ_i\ge t\right)
\le\exp\left(-\lambda t+\frac{16\lambda^2K^4}{n}\right).
$$

$t\le8K^2$ なら $\lambda=nt/(32K^4)$ は許容区間内であり、指数は

$$
-\frac{nt^2}{32K^4}
+\frac{16K^4}{n}\frac{n^2t^2}{1024K^8}
=-\frac{nt^2}{64K^4}
$$

となります。$t>8K^2$ なら $\lambda=n/(4K^2)$ と選び、

$$
-\lambda t+\frac{16\lambda^2K^4}{n}
=-\frac{nt}{4K^2}+n
\le-\frac{nt}{8K^2}
$$

を得ます。$-Z_i$ に対しても補題の指数モーメント評価が同じ範囲で成立するので、下側確率も同じです。二つを加算して結論が従います。
<!-- proof-end -->

$t\ll K^2$ の領域では二乗型の $\exp(-cnt^2/K^4)$、$t\gg K^2$ では一次型の $\exp(-cnt/K^2)$ となります。すべての $t$ で二乗型と断言しないことが、ここでの重要な区別です。

## 3. 有限netから標本共分散の作用素ノルムへ

$X_1,\ldots,X_n$ は独立同分布の等方的sub-Gaussianベクトルとし、全単位方向の $\psi_2$ ノルムが $K$ 以下とします。母平均 $0$ が分かっている場合の経験二次モーメント行列を

$$
\widehat\Sigma_0=\frac1n\sum_{i=1}^n X_iX_i^{\mathsf T}
\in\mathbb R^{d\times d}
$$

と置きます。各 $u\in S^{d-1}$ について

$$
u^{\mathsf T}(\widehat\Sigma_0-I_d)u
=\frac1n\sum_{i=1}^n\left(\langle X_i,u\rangle^2-1\right)
$$

です。等方性により $E\langle X_i,u\rangle^2=1$ であり、[固定方向の集中](#lem-hdp7-fixed-direction)が使えます。しかし $u$ を観測後に選ぶことはできません。そこで[球面netの構成](../HDP6/index.md#lem-hdp6-volumetric-net)と[対称二次形式のnet評価](../HDP6/index.md#lem-hdp6-quadratic-net)を使います。

<a id="thm-hdp7-isotropic-covariance"></a>

<!-- formal-statement-start -->
> **定理（等方的sub-Gaussian標本の共分散作用素ノルム評価）**  
> $d,n\ge1$、$0<\delta<1$、$K>0$ とする。$X_1,\ldots,X_n\in\mathbb R^d$ は独立同分布で $EX_i=0$、$E[X_iX_i^{\mathsf T}]=I_d$、かつ
>
$$
\sup_{\|u\|_2=1}\|\langle X_i,u\rangle\|_{\psi_2}\le K
$$
>
> とする。$\widehat\Sigma_0=n^{-1}\sum_{i=1}^nX_iX_i^{\mathsf T}$、$L=d\log9+\log(2/\delta)$ とおけば、確率 $1-\delta$ 以上で
>
$$
\|\widehat\Sigma_0-I_d\|_{\mathrm{op}}
\le16K^2\max\left\{\sqrt{\frac Ln},\frac Ln\right\}
\le16K^2\left(\sqrt{\frac Ln}+\frac Ln\right)
$$
>
> が成り立つ。特に $0<\varepsilon<1$ に対し
>
$$
n\ge\frac{256K^4}{\varepsilon^2}
\left(d\log9+\log\frac2\delta\right)
$$
>
> なら $P(\|\widehat\Sigma_0-I_d\|_{\mathrm{op}}\le\varepsilon)\ge1-\delta$ である。
<!-- formal-statement-end -->

### 証明の見取り図

半径 $1/4$ のnetを一つ**標本を見る前に固定**します。各net方向の二次形式に前節の確率評価を使い、失敗事象を $9^d$ 個以下だけ足します。最後に対称行列のnet評価の係数 $2$ を掛けます。$n$ が $d$ に比例する理由は、方向の個数そのものではなくその**対数** $d\log9$ です。

<!-- proof-start -->
### 証明

[体積法によるnet](../HDP6/index.md#lem-hdp6-volumetric-net)で、決定論的な $1/4$-net $\mathcal N$ を $|\mathcal N|\le9^d$ となるよう取ります。$B=\widehat\Sigma_0-I_d$ は実対称行列です。任意の固定した $v\in\mathcal N$ について $Y_i=\langle X_i,v\rangle$ は独立で、等方性から $EY_i^2=1$、sub-Gaussian条件から $Ee^{Y_i^2/K^2}\le2$ です。ここで $\psi_2$ ノルムの下限が $K$ 以下なら、定義の単調性と極限を用いてこの期待値条件が $K$ 自身でも成立します。

[固定方向の経験二次モーメント集中](#lem-hdp7-fixed-direction)を適用すると

$$
P(|v^{\mathsf T}Bv|\ge t)
\le2\exp\left[-n\min\left\{\frac{t^2}{64K^4},\frac{t}{8K^2}\right\}\right].
$$

netの点ごとの事象には独立性を仮定せず、[和集合の劣加法性](../../F0/F0-00P2A/index.md#thm-f0-00p2a-union-bound)から

$$
P\left(\max_{v\in\mathcal N}|v^{\mathsf T}Bv|\ge t\right)
\le2\,9^d
\exp\left[-n\min\left\{\frac{t^2}{64K^4},\frac{t}{8K^2}\right\}\right].
$$

$a=L/n>0$、$t=8K^2\max\{\sqrt a,a\}$ と置きます。$a\le1$ なら $t=8K^2\sqrt a$ で

$$
\min\{t^2/(64K^4),t/(8K^2)\}
=\min\{a,\sqrt a\}=a.
$$

$a\ge1$ なら $t=8K^2a$ で、同じ最小値は $\min\{a^2,a\}=a$ です。したがって失敗確率は

$$
2\,9^d e^{-L}
=2\exp(d\log9-d\log9-\log(2/\delta))
=\delta
$$

以下です。成功事象では[対称二次形式のnet評価](../HDP6/index.md#lem-hdp6-quadratic-net)を $\eta=1/4$ として適用し、

$$
\|B\|_{\mathrm{op}}
\le\frac{1}{1-2(1/4)}\max_{v\in\mathcal N}|v^{\mathsf T}Bv|
\le2t
=16K^2\max\{\sqrt a,a\}.
$$

最後の標本数条件を確認します。等方性から $K^2\ge1/\log2>1$ です。$n\ge256K^4L/\varepsilon^2$ なら $\sqrt{L/n}\le\varepsilon/(16K^2)<1$ であり、$L/n\le\sqrt{L/n}$ です。従って最初の上界が $\varepsilon$ 以下になります。
<!-- proof-end -->

この保証は成分数 $d$ に対し $n$ が概ね $K^4d/\varepsilon^2$ 以上なら成立するという、**非漸近的な**主張です。ただし定数 $256$ は計算を通すための十分条件で、最良定数を主張しません。$n<d$ なら $\widehat\Sigma_0$ の階数が高々 $n$ で非零の核方向が存在するため、

$$
\|\widehat\Sigma_0-I_d\|_{\mathrm{op}}\ge1
$$

です。この決定論的な障害は、$n$ を小さくしたまま全方向で単位行列からのずれを $1$ 未満にできないことを示します。

## 4. 母平均が未知なら中心化を忘れない

通常の標本共分散では真の平均 $\mu$ が分からず、$\overline X=n^{-1}\sum_iX_i$ を引きます。真の平均による行列と、標本平均で中心化した行列は同じではありません。

$$
\widehat\Sigma_\mu=\frac1n\sum_i(X_i-\mu)(X_i-\mu)^{\mathsf T},
\qquad
\widehat\Sigma_c=\frac1n\sum_i(X_i-\overline X)(X_i-\overline X)^{\mathsf T}.
$$

$\overline Y=\overline X-\mu$ とおくと $X_i-\overline X=(X_i-\mu)-\overline Y$ です。和の交差項を展開し $n^{-1}\sum_i(X_i-\mu)=\overline Y$ を使えば

$$
\begin{aligned}
\widehat\Sigma_c
&=\widehat\Sigma_\mu
-\overline Y\,\overline Y^{\mathsf T}
-\overline Y\,\overline Y^{\mathsf T}
+\overline Y\,\overline Y^{\mathsf T}\\
&=\widehat\Sigma_\mu-\overline Y\,\overline Y^{\mathsf T}.
\end{aligned}
$$

従って $\widehat\Sigma_c$ の評価には平均の誤差を加えなければなりません。ここでは $1/n$ を使う定義を採用しています。通常の不偏な $1/(n-1)$ 版（$n\ge2$）は $(n/(n-1))\widehat\Sigma_c$ であり、両者を混同しません。

<a id="lem-hdp7-mean-net"></a>

<!-- formal-statement-start -->
> **補題（等方的sub-Gaussian標本平均のノルム評価）**  
> $d,n\ge1$、$K>0$、$0<\delta<1$ とする。$X_1,\ldots,X_n\in\mathbb R^d$ は独立同分布で $EX_i=0$、$E[X_iX_i^{\mathsf T}]=I_d$ とし、全単位方向で
>
$$
\|\langle X_i,u\rangle\|_{\psi_2}\le K
\qquad(\|u\|_2=1)
$$
>
> が成り立つとする。$\overline X=n^{-1}\sum_{i=1}^nX_i$、$M=d\log5+\log(2/\delta)$ とすると、確率 $1-\delta$ 以上で
>
$$
\|\overline X\|_2^2\le\frac{32K^2M}{n}
$$
>
> が成り立つ。
<!-- formal-statement-end -->

### 証明の見取り図

標本平均の方向射影はsub-Gaussian**和**なので、二乗した射影の評価より単純です。半径 $1/2$ のnet上の内積を押さえ、それをベクトルのノルムへ変換します。

<!-- proof-start -->
### 証明

[球面netの構成](../HDP6/index.md#lem-hdp6-volumetric-net)により、$|\mathcal M|\le5^d$ の決定論的 $1/2$-netを取ります。各固定 $v\in\mathcal M$ に対し、独立な $\langle X_i,v\rangle$ は平均零で $\psi_2$ ノルムが $K$ 以下です。[独立sub-Gaussian和の集中](../HDP3/index.md#thm-hdp3-subgaussian-sum)に $V=nK^2$、和の閾値 $ns$ を代入すると

$$
P(|\langle\overline X,v\rangle|\ge s)
\le2e^{-ns^2/(8K^2)}.
$$

[和集合の劣加法性](../../F0/F0-00P2A/index.md#thm-f0-00p2a-union-bound)から全 $v$ で $|\langle\overline X,v\rangle|<s$ となる確率は $1-2\,5^de^{-ns^2/(8K^2)}$ 以上です。$\overline X\ne0$ なら $u=\overline X/\|\overline X\|_2$ を取り、netの $v$ で $\|u-v\|_2\le1/2$ を満たすものを選びます。[Cauchy–Schwarz不等式](../../../基礎科目/F0/F0-00E2/index.md#thm-f0-00e2-cauchy-schwarz)から

$$
\begin{aligned}
\|\overline X\|_2
&=\langle\overline X,u\rangle\\
&=\langle\overline X,v\rangle+\langle\overline X,u-v\rangle\\
&\le|\langle\overline X,v\rangle|
+\frac12\|\overline X\|_2.
\end{aligned}
$$

従って $\|\overline X\|_2\le2\max_{v\in\mathcal M}|\langle\overline X,v\rangle|$ です。$\overline X=0$ なら同じ結論は自明です。$s=K\sqrt{8M/n}$ とすれば失敗確率は $2\,5^de^{-M}=\delta$、成功事象で $\|\overline X\|_2^2\le4s^2=32K^2M/n$ となります。
<!-- proof-end -->

<a id="cor-hdp7-centered-covariance"></a>

<!-- formal-statement-start -->
> **系（標本平均で中心化した共分散の評価）**  
> $d,n\ge1$、$K>0$、$0<\delta<1$ とする。$X_1,\ldots,X_n\in\mathbb R^d$ は独立同分布で $EX_i=0$、$E[X_iX_i^{\mathsf T}]=I_d$ かつ
>
$$
\sup_{\|u\|_2=1}\|\langle X_i,u\rangle\|_{\psi_2}\le K
$$
>
> とする。$\overline X=n^{-1}\sum_iX_i$、
>
$$
\widehat\Sigma_c
=\frac1n\sum_{i=1}^n(X_i-\overline X)(X_i-\overline X)^{\mathsf T}
$$
>
> とし、$L_1=d\log9+\log(4/\delta)$、$L_2=d\log5+\log(4/\delta)$ と置くと、確率 $1-\delta$ 以上で
>
$$
\|\widehat\Sigma_c-I_d\|_{\mathrm{op}}
\le16K^2\max\left\{\sqrt{\frac{L_1}{n}},\frac{L_1}{n}\right\}
+\frac{32K^2L_2}{n}
$$
>
> が成り立つ。
<!-- formal-statement-end -->

### 証明の見取り図

母平均既知の評価と、標本平均の評価を、それぞれ失敗確率 $\delta/2$ で同時に使います。中心化が行列から階数一の正半定値行列を引く操作であることが要点です。

<!-- proof-start -->
### 証明

前節の恒等式を $\mu=0$ として使い、

$$
\widehat\Sigma_c-I_d
=(\widehat\Sigma_0-I_d)-\overline X\overline X^{\mathsf T}.
$$

作用素ノルムの三角不等式と $\|\overline X\overline X^{\mathsf T}\|_{\mathrm{op}}=\|\overline X\|_2^2$ を使います。後者は任意の単位 $v$ について $\|\overline X\overline X^{\mathsf T}v\|_2=|\langle\overline X,v\rangle|\|\overline X\|_2\le\|\overline X\|_2^2$ であり、$\overline X\ne0$ なら $v=\overline X/\|\overline X\|_2$ で等号となるためです。

[共分散作用素ノルム定理](#thm-hdp7-isotropic-covariance)を $\delta/2$ で適用すると最初の項が現れます。[標本平均の補題](#lem-hdp7-mean-net)を $\delta/2$ で適用すると第二項が現れます。二つの失敗事象へ[和集合の劣加法性](../../F0/F0-00P2A/index.md#thm-f0-00p2a-union-bound)を適用すると、同時成功の確率が $1-\delta$ 以上になり結論を得ます。
<!-- proof-end -->

## 5. 非等方的・特異な共分散に戻す

一般の共分散 $\Sigma=E[(X-\mu)(X-\mu)^{\mathsf T}]$ は対称・正半定値ですが、逆行列が存在するとは限りません。例えば $X=(2G,0)$、$G\sim N(0,1)$ では

$$
\Sigma=\begin{pmatrix}4&0\\0&0\end{pmatrix}
$$

です。零分散方向を「白色化」するために $0$ で割るのは誤りです。正の固有値に対応する部分空間だけを使います。

<a id="def-hdp7-covariance-adapted"></a>

<!-- formal-statement-start -->
> **定義（共分散尺度に適合するsub-Gaussian条件）**  
> $X\in\mathbb R^d$ の平均を $\mu$、共分散を $\Sigma$ とする。$K>0$ に対し、すべての $u\in\mathbb R^d$ で
>
$$
\|\langle X-\mu,u\rangle\|_{\psi_2}
\le K\sqrt{u^{\mathsf T}\Sigma u}
$$
>
> が成り立つとき、$X$ は共分散尺度 $K$ のsub-Gaussian条件を満たすという。$u^{\mathsf T}\Sigma u=0$ なら左辺も $0$ であると解釈する。
<!-- formal-statement-end -->

<!-- definition-example-start: def-hdp7-covariance-adapted -->
**定義の確認**。 $X=(2G,0)$、$G\sim N(0,1)$ とします。標準正規の密度は $(2\pi)^{-1/2}e^{-x^2/2}$ です。$s^2>2$ なら $a=1/2-1/s^2>0$ と置きます。$z=\sqrt{2a}\,x$ と変数変換すると、標準正規密度の積分が $1$ であることから $\int_{\mathbb R}e^{-ax^2}\,dx=(2a)^{-1/2}\int_{\mathbb R}e^{-z^2/2}\,dz=\sqrt{\pi/a}$ です。これを代入すると

$$
\begin{aligned}
Ee^{G^2/s^2}
&=\frac1{\sqrt{2\pi}}\int_{\mathbb R}
e^{-(1/2-1/s^2)x^2}\,dx\\
&=\frac1{\sqrt{2\pi}}\sqrt{\frac{\pi}{1/2-1/s^2}}
=\frac1{\sqrt{1-2/s^2}}.
\end{aligned}
$$

$s^2\le2$ なら積分は発散します。$s^2>2$ の場合、上式が $2$ 以下であることは $1-2/s^2\ge1/4$、すなわち $s^2\ge8/3$ と同値です。従って $\|G\|_{\psi_2}=\sqrt{8/3}$ です。任意の $u=(u_1,u_2)$ に対し

$$
\|\langle X,u\rangle\|_{\psi_2}
=2|u_1|\sqrt{8/3},\qquad
\sqrt{u^{\mathsf T}\Sigma u}=2|u_1|.
$$

従って $K=\sqrt{8/3}$ が全方向で通用します。$u=(0,1)$ では両辺が $0$ です。絶対尺度 $K_{\mathrm{abs}}(X)=2\sqrt{8/3}$ とは区別します。
<!-- definition-example-end -->

<a id="thm-hdp7-general-covariance"></a>

<!-- formal-statement-start -->
> **定理（退化を許す一般共分散の評価）**  
> $d,n\ge1$、$K>0$、$0<\delta<1$ とする。独立同分布な $X_1,\ldots,X_n\in\mathbb R^d$ は平均 $\mu$ と有限共分散 $\Sigma$ を持ち、すべての $u\in\mathbb R^d$ に対して
>
$$
\|\langle X_i-\mu,u\rangle\|_{\psi_2}
\le K\sqrt{u^{\mathsf T}\Sigma u}
$$
>
> を満たすとする。$\overline X=n^{-1}\sum_iX_i$、真の平均を用いた $\widehat\Sigma_\mu$ と標本平均で中心化した $\widehat\Sigma_c$ を
>
$$
\widehat\Sigma_\mu=\frac1n\sum_i(X_i-\mu)(X_i-\mu)^{\mathsf T},
\qquad
\widehat\Sigma_c=\frac1n\sum_i(X_i-\overline X)(X_i-\overline X)^{\mathsf T}
$$
>
> で定義する。$r=\operatorname{rank}\Sigma\ge1$ なら、$L_r=r\log9+\log(2/\delta)$ として、確率 $1-\delta$ 以上で
>
$$
\|\widehat\Sigma_\mu-\Sigma\|_{\mathrm{op}}
\le16K^2\|\Sigma\|_{\mathrm{op}}
\max\left\{\sqrt{\frac{L_r}{n}},\frac{L_r}{n}\right\}.
$$
>
> また $L_1=r\log9+\log(4/\delta)$、$L_2=r\log5+\log(4/\delta)$ とすれば、確率 $1-\delta$ 以上で
>
$$
\|\widehat\Sigma_c-\Sigma\|_{\mathrm{op}}
\le\|\Sigma\|_{\mathrm{op}}
\left[
16K^2\max\left\{\sqrt{\frac{L_1}{n}},\frac{L_1}{n}\right\}
+\frac{32K^2L_2}{n}
\right].
$$
>
> $r=0$（すなわち $\Sigma=0$）なら両推定行列は確率一で零行列である。
<!-- formal-statement-end -->

### 証明の見取り図

$\Sigma$ の正の固有値に対応する $r$ 次元部分だけを取り、そこで白色化した変数 $Z_i$ は等方的になります。元の共分散は $BZ_i$ の二次形式へ戻せるので、作用素ノルムには $\|B\|_{\mathrm{op}}^2=\|\Sigma\|_{\mathrm{op}}$ が現れます。

<!-- proof-start -->
### 証明

$\Sigma$ の正固有値を $\lambda_1,\ldots,\lambda_r$ とし、対応する直交単位固有ベクトルを列に並べた $d\times r$ 行列を $U$ とします。$\Lambda=\operatorname{diag}(\lambda_1,\ldots,\lambda_r)$、$B=U\Lambda^{1/2}$ と置けば $\Sigma=BB^{\mathsf T}$ です。

零固有値に対応する任意の固定単位ベクトル $v$ について

$$
E\langle X_i-\mu,v\rangle^2
=v^{\mathsf T}\Sigma v=0
$$

です。非負変数の期待値が零ならその変数は確率一で零であり、零固有空間の有限個の正規直交基底について同時に成り立ちます。したがって $X_i-\mu$ は確率一で $\operatorname{im}U$ に属します。

$$
Z_i=\Lambda^{-1/2}U^{\mathsf T}(X_i-\mu)
\in\mathbb R^r
$$

と定めると、$EZ_i=0$ であり、

$$
\begin{aligned}
E[Z_iZ_i^{\mathsf T}]
&=\Lambda^{-1/2}U^{\mathsf T}\Sigma U\Lambda^{-1/2}\\
&=\Lambda^{-1/2}\Lambda\Lambda^{-1/2}=I_r.
\end{aligned}
$$

さらに $w\in S^{r-1}$ を固定し $u=U\Lambda^{-1/2}w\in\mathbb R^d$ とすると

$$
\langle Z_i,w\rangle=\langle X_i-\mu,u\rangle,
\qquad
u^{\mathsf T}\Sigma u
=w^{\mathsf T}\Lambda^{-1/2}\Lambda\Lambda^{-1/2}w=1.
$$

仮定から $\|\langle Z_i,w\rangle\|_{\psi_2}\le K$ です。よって $Z_i$ は $r$ 次元の等方的sub-Gaussianベクトルです。また元の標本に対し $X_i-\mu=BZ_i$ が成立するので

$$
\widehat\Sigma_\mu-\Sigma
=B\left(\frac1n\sum_iZ_iZ_i^{\mathsf T}-I_r\right)B^{\mathsf T}.
$$

[作用素ノルムの定義](../../../基礎科目/F0/F0-00F2/index.md#def-f0-00f2-operator-norm)で $\|STv\|_2\le\|S\|_{\mathrm{op}}\|Tv\|_2\le\|S\|_{\mathrm{op}}\|T\|_{\mathrm{op}}\|v\|_2$ と二度評価できることから

$$
\|\widehat\Sigma_\mu-\Sigma\|_{\mathrm{op}}
\le\|B\|_{\mathrm{op}}^2
\left\|\frac1n\sum_iZ_iZ_i^{\mathsf T}-I_r\right\|_{\mathrm{op}}.
$$

$B^{\mathsf T}B=\Lambda$ なので $\|B\|_{\mathrm{op}}^2=\max_j\lambda_j=\|\Sigma\|_{\mathrm{op}}$ です。[等方的な定理](#thm-hdp7-isotropic-covariance)を $Z_i$ に適用すれば第一の主張が得られます。標本平均についても $\overline X-\mu=B\overline Z$ であり、

$$
\widehat\Sigma_c
=B\left\{\frac1n\sum_iZ_iZ_i^{\mathsf T}
-\overline Z\overline Z^{\mathsf T}\right\}B^{\mathsf T}
$$

なので[中心化の系](#cor-hdp7-centered-covariance)で同じ操作ができます。最後に $\Sigma=0$ なら $E\|X_i-\mu\|_2^2=\operatorname{tr}\Sigma=0$ なので全標本は確率一で $\mu$ に等しく、両推定行列は零です。
<!-- proof-end -->

共分散尺度に適合する条件は、単に絶対的な $\psi_2$ 尺度が有限という条件より強い**相対的な仮定**です。絶対尺度だけから同じ $\|\Sigma\|_{\mathrm{op}}$ 倍の評価が得られると主張しないでください。小さな分散方向を白色化すると、その方向の $\psi_2$ 尺度が大きくなる場合があるからです。

## 6. 反例から適用条件を確認する

**独立性を外すと標本数が効きません。** $d=1$、一つの標準正規 $G$ を全標本に使い $X_i=G$ とします。各標本は平均零・分散 $1$、共通するsub-Gaussian尺度 $\sqrt{8/3}$ を持ちますが、互いに独立ではありません。どの $n$ でも $\widehat\Sigma_0=G^2$ であり、事象 $\{|G|\ge2\}$ 上で $|\widehat\Sigma_0-1|\ge3$ です。この事象の確率は正で $n$ によらないため、定理の失敗確率を $n$ で減衰させることはできません。失われた証明機構は、独立性による指数モーメントの積表示です。

**全方向を各座標だけへ置き換えてはいけません。** $X=(R,\ldots,R)$ では各座標の分散は $1$ ですが、$\Sigma$ の最大固有値は $d$ です。各座標の標本二乗は正確に $1$ でも、共分散の非対角成分はすべて $1$ です。各座標の精度だけを検査しても、作用素ノルムは制御できません。等方性を仮定する場合にはそもそもこのベクトルを代入できません。

**階数の制約は確率によらず残ります。** $n<d$ の場合は $n$ 個の階数1以下の行列 $X_iX_i^{\mathsf T}$ の和の階数が高々 $n$ です。母共分散が $I_d$ なら零固有値を持つため誤差作用素ノルムは少なくとも $1$ です。標本平均で中心化した場合には偏差ベクトルの和が零なので階数はさらに高々 $n-1$ です。

## 7. 演習：定義から行列誤差まで

**Level A：条件と最小計算を確認する**

### A1. 独立な符号成分の等方性

独立なRademacher変数 $R_1,R_2$ から $X=(R_1,R_2)$ とする。$EX$、$E[XX^{\mathsf T}]$、$E\langle X,(a,b)\rangle^2$ を計算し、全方向のsub-Gaussian尺度として $\sqrt8$ が使える理由を述べよ。

- Level: A
- ID: HDP7-A1

<!-- solution-start -->
**詳細解答**　$ER_j=0$、$ER_j^2=1$、独立性から $E[R_1R_2]=ER_1ER_2=0$ です。従って

$$
EX=(0,0),\qquad
E[XX^{\mathsf T}]=
\begin{pmatrix}1&0\\0&1\end{pmatrix}.
$$

任意の $(a,b)$ に対し

$$
E(aR_1+bR_2)^2
=a^2 ER_1^2+2abE[R_1R_2]+b^2ER_2^2
=a^2+b^2.
$$

$\|(a,b)\|_2=1$ なら本文の[定義の確認](#def-hdp7-subgaussian-vector)で導いた $P(|aR_1+bR_2|\ge t)\le2e^{-t^2/2}$ を使えます。尾部積分により $E e^{(aR_1+bR_2)^2/8}\le5/3<2$ なので、全方向で同じ $\sqrt8$ が通用します。
<!-- solution-end -->

### A2. 退化共分散の方向別尺度

$G\sim N(0,1)$、$X=(2G,0)$ とする。$\Sigma$ を計算し、共分散尺度 $K=\sqrt{8/3}$ の条件を各 $u=(u_1,u_2)$ について確認せよ。

- Level: A
- ID: HDP7-A2

<!-- solution-start -->
**詳細解答**　$EG=0$、$EG^2=1$ から $EX=0$、$\Sigma=\operatorname{diag}(4,0)$ です。[定義の確認](#def-hdp7-covariance-adapted)で示した正規密度の積分より $\|G\|_{\psi_2}=\sqrt{8/3}$ です。ノルムの斉次性から

$$
\|\langle X,u\rangle\|_{\psi_2}
=\|2u_1G\|_{\psi_2}=2|u_1|\sqrt{8/3},
$$

一方 $u^{\mathsf T}\Sigma u=4u_1^2$ なので $K\sqrt{u^{\mathsf T}\Sigma u}=2|u_1|\sqrt{8/3}$ となり、すべての方向で等号です。$u_1=0$ でも両辺は零です。
<!-- solution-end -->

### A3. 標本数が次元より少ない場合

等方的な $d$ 次元ベクトルの任意の実現値 $x_1,\ldots,x_n$ について、$n<d$ なら $\|n^{-1}\sum_i x_ix_i^{\mathsf T}-I_d\|_{\mathrm{op}}\ge1$ を証明せよ。

- Level: A
- ID: HDP7-A3

<!-- solution-start -->
**詳細解答**　各行列 $x_ix_i^{\mathsf T}$ の像は $\operatorname{span}\{x_i\}$ に含まれるので、その和の像は $n$ 個以下のベクトルが張る空間に含まれ、階数は高々 $n<d$ です。従って非零の核ベクトル $v$ があり、$\|v\|_2=1$ とできます。$A=n^{-1}\sum_i x_ix_i^{\mathsf T}$ とおくと $Av=0$ なので

$$
\|(A-I_d)v\|_2=\|-v\|_2=1.
$$

作用素ノルムは単位ベクトル上の最大伸長率なので $\|A-I_d\|_{\mathrm{op}}\ge1$ です。分布の仮定を全く使わない決定論的な結論です。
<!-- solution-end -->

### A4. 二乗変数のモーメント

$Ee^{Y^2/K^2}\le2$ とし $Z=Y^2-EY^2$ とする。$EY^4\le4K^4$、$EZ^2\le16K^4$ を順に示せ。

- Level: A
- ID: HDP7-A4

<!-- solution-start -->
**詳細解答**　指数級数の $p=2$ 項を取り出して

$$
\frac{EY^4}{2!K^4}\le Ee^{Y^2/K^2}\le2
$$

より $EY^4\le4K^4$ です。また $EY^2\le K^2\log2<K^2$ です。$|a-b|^2\le2(a^2+b^2)$ を $a=Y^2$、$b=EY^2$ に適用すると

$$
EZ^2\le2\{EY^4+(EY^2)^2\}
\le2(4K^4+K^4)=10K^4\le16K^4.
$$

実際には分散公式 $EZ^2=EY^4-(EY^2)^2\le4K^4$ とさらに強く評価できますが、ここでは中心化モーメントの一般的な上界の作り方も確認しました。
<!-- solution-end -->

### A5. netの個数と二次形式

$d=3$ の単位球面に半径 $1/4$ のnet $\mathcal N$ が存在することと、任意の実対称 $3\times3$ 行列 $B$ について $\|B\|_{\mathrm{op}}\le2\max_{v\in\mathcal N}|v^{\mathsf T}Bv|$ を示せ。

- Level: A
- ID: HDP7-A5

<!-- solution-start -->
**詳細解答**　[体積法の補題](../HDP6/index.md#lem-hdp6-volumetric-net)で $\eta=1/4$、$d=3$ とすると $|\mathcal N|\le(1+8)^3=729$ のnetを選べます。[対称二次形式net評価](../HDP6/index.md#lem-hdp6-quadratic-net)では $\eta<1/2$ が必要で、$1/4$ はこの条件を満たします。係数は

$$
\frac1{1-2\eta}=\frac1{1-1/2}=2
$$

なので所望の上界が得られます。netの具体的な点を列挙する必要はなく、存在と濃度が示されれば確率論的な和集合評価に使用できます。
<!-- solution-end -->

**Level B：定理の組合せと仮定を検査する**

### B1. 誤差確率から必要な標本数へ

等方的sub-Gaussian標本について $K=2$、$d=10$、$0<\delta<1$、$0<\varepsilon<1$ とする。$\|\widehat\Sigma_0-I\|_{\mathrm{op}}\le\varepsilon$ を確率 $1-\delta$ 以上で得る標本数の十分条件を式で示せ。

- Level: B
- ID: HDP7-B1

<!-- solution-start -->
**詳細解答**　[共分散評価定理](#thm-hdp7-isotropic-covariance)を直接使い、$K^4=16$、$L=10\log9+\log(2/\delta)$ と代入します。

$$
n\ge\frac{256\cdot16}{\varepsilon^2}
\left(10\log9+\log\frac2\delta\right)
=\frac{4096}{\varepsilon^2}
\left(10\log9+\log\frac2\delta\right).
$$

$n$ は整数なので右辺の切上げで十分です。この条件では $L/n\le\varepsilon^2/4096$、従って $\sqrt{L/n}\le\varepsilon/64$ です。$K^2=4$ より $16K^2\sqrt{L/n}\le64(\varepsilon/64)=\varepsilon$ となり、定理の最大値を取る二つの項はいずれも制御できます。
<!-- solution-end -->

### B2. 標本平均で中心化すると何が変わるか

実数 $x_1,x_2$、母平均 $\mu=0$、$n=2$ とする。$\widehat\sigma_0^2=(x_1^2+x_2^2)/2$ と $\widehat\sigma_c^2=\{(x_1-\bar x)^2+(x_2-\bar x)^2\}/2$ を求め、両者の差を確認せよ。

- Level: B
- ID: HDP7-B2

<!-- solution-start -->
**詳細解答**　$\bar x=(x_1+x_2)/2$ なので

$$
x_1-\bar x=\frac{x_1-x_2}{2},\qquad
x_2-\bar x=-\frac{x_1-x_2}{2}.
$$

従って

$$
\widehat\sigma_c^2
=\frac12\left[\frac{(x_1-x_2)^2}{4}
+\frac{(x_1-x_2)^2}{4}\right]
=\frac{(x_1-x_2)^2}{4}.
$$

一方

$$
\begin{aligned}
\widehat\sigma_0^2-\bar x^2
&=\frac{x_1^2+x_2^2}{2}
-\frac{(x_1+x_2)^2}{4}\\
&=\frac{2x_1^2+2x_2^2-x_1^2-2x_1x_2-x_2^2}{4}\\
&=\frac{(x_1-x_2)^2}{4}.
\end{aligned}
$$

従って $\widehat\sigma_c^2=\widehat\sigma_0^2-\bar x^2$ です。$x_1=x_2$ なら中心化分散は零になりますが、非中心化二次モーメントは $x_1^2$ です。
<!-- solution-end -->

### B3. 共分散の変換と作用素ノルム

$Z\in\mathbb R^2$ は平均零・共分散 $I_2$、$B=\operatorname{diag}(3,1)$、$X=BZ$ とする。$\Sigma_X$ を求め、任意の標本について $\|\widehat\Sigma_X-\Sigma_X\|_{\mathrm{op}}\le9\|\widehat\Sigma_Z-I_2\|_{\mathrm{op}}$ を証明せよ。

- Level: B
- ID: HDP7-B3

<!-- solution-start -->
**詳細解答**　$EX=B EZ=0$ なので

$$
\Sigma_X=E[BZZ^{\mathsf T}B^{\mathsf T}]
=B I_2 B^{\mathsf T}
=\operatorname{diag}(9,1).
$$

標本ごとに $X_i=BZ_i$ を代入すると

$$
\widehat\Sigma_X-\Sigma_X
=B(\widehat\Sigma_Z-I_2)B^{\mathsf T}.
$$

[作用素ノルムの定義](../../../基礎科目/F0/F0-00F2/index.md#def-f0-00f2-operator-norm)で $\|STv\|_2\le\|S\|_{\mathrm{op}}\|Tv\|_2\le\|S\|_{\mathrm{op}}\|T\|_{\mathrm{op}}\|v\|_2$ と二度評価できることから、このノルムは $\|B\|_{\mathrm{op}}^2\|\widehat\Sigma_Z-I_2\|_{\mathrm{op}}$ 以下です。対角行列 $B$ の最大伸長率は $3$ だから係数は $3^2=9$ です。共分散は単純に定数 $3$ 倍されるわけではなく、二次形式なので二乗が現れます。
<!-- solution-end -->

### B4. 依存標本で何が失われるか

$G\sim N(0,1)$、すべての $i$ について $X_i=G$ とする。各標本は平均零・分散 $1$・sub-Gaussianであるにもかかわらず、$\widehat\sigma_0^2$ が $1$ へ[確率収束](../../F0/F0-00P4/index.md#def-f0-00p4-probability-convergence)しないことを示し、定理の証明で使えなくなる等式を挙げよ。

- Level: B
- ID: HDP7-B4

<!-- solution-start -->
**詳細解答**　どの $n$ でも

$$
\widehat\sigma_0^2=\frac1n\sum_{i=1}^nG^2=G^2.
$$

$G$ は非退化な標準正規分布なので $p=P(|G|\ge2)>0$ です。この事象では $|\widehat\sigma_0^2-1|=G^2-1\ge3$ であり、すべての $n$ で $P(|\widehat\sigma_0^2-1|\ge1/2)\ge p>0$ です。従って確率収束しません。[独立変数の期待値の因数分解](../../F0/F0-00P3/index.md#thm-f0-00p3-expectation-factorization)が使えるなら $Z_i=X_i^2-EX_i^2$ の指数モーメントについて

$$
E\exp\left(\frac{\lambda}{n}\sum_iZ_i\right)
=\prod_i E e^{(\lambda/n)Z_i}
$$

と書けますが、この例では $Z_i=G^2-1$ が同一であり、一般には右辺への因数分解が成立しません。
<!-- solution-end -->

**Level C：共分散推定を一から組み立てる**

### C1. 母平均未知の行列誤差

$d,n\ge1$、$0<\delta<1$ とし、$X_1,\ldots,X_n$ は独立同分布の等方的sub-Gaussianベクトル、全方向の $\psi_2$ ノルムは $K$ 以下とする。

1. $\widehat\Sigma_c=\widehat\Sigma_0-\bar X\bar X^{\mathsf T}$ を示せ。
2. 母平均既知の場合と標本平均の誤差に失敗確率をそれぞれ $\delta/2$ ずつ割り当て、$\|\widehat\Sigma_c-I_d\|_{\mathrm{op}}$ の同時確率評価を導け。

- Level: C
- ID: HDP7-C1

<!-- solution-start -->
**詳細解答**　(1) $EX_i=0$ なので $\bar X=n^{-1}\sum_iX_i$ です。各項を展開すると

$$
\begin{aligned}
\widehat\Sigma_c
&=\frac1n\sum_i(X_i-\bar X)(X_i-\bar X)^{\mathsf T}\\
&=\frac1n\sum_i(X_iX_i^{\mathsf T}
-X_i\bar X^{\mathsf T}-\bar X X_i^{\mathsf T}
+\bar X\bar X^{\mathsf T})\\
&=\widehat\Sigma_0-\bar X\bar X^{\mathsf T}.
\end{aligned}
$$

(2) $L_1=d\log9+\log(4/\delta)$、$L_2=d\log5+\log(4/\delta)$ と置きます。[等方共分散定理](#thm-hdp7-isotropic-covariance)の $\delta$ を $\delta/2$ に置き換えると、確率 $1-\delta/2$ 以上で

$$
\|\widehat\Sigma_0-I_d\|_{\mathrm{op}}
\le16K^2\max\{\sqrt{L_1/n},L_1/n\}
$$

です。[平均のnet補題](#lem-hdp7-mean-net)でも $\delta/2$ を使うと、確率 $1-\delta/2$ 以上で $\|\bar X\|_2^2\le32K^2L_2/n$ です。[和集合の劣加法性](../../F0/F0-00P2A/index.md#thm-f0-00p2a-union-bound)により二つの失敗確率を加えると、交差事象は確率 $1-\delta$ 以上です。その事象上で

$$
\begin{aligned}
\|\widehat\Sigma_c-I_d\|_{\mathrm{op}}
&=\|(\widehat\Sigma_0-I_d)-\bar X\bar X^{\mathsf T}\|_{\mathrm{op}}\\
&\le\|\widehat\Sigma_0-I_d\|_{\mathrm{op}}
+\|\bar X\|_2^2\\
&\le16K^2\max\{\sqrt{L_1/n},L_1/n\}
+32K^2L_2/n.
\end{aligned}
$$

これは[本文の中心化の系](#cor-hdp7-centered-covariance)と一致します。二つの推定量の成功事象が独立である必要はありません。
<!-- solution-end -->

### C2. 特異な母集団共分散からの帰着

$d=3$、$X=(2G,0,G)$ とする。ただし $G\sim N(0,1)$。

1. $\Sigma$ の階数・非零固有値・作用素ノルムを求めよ。
2. このベクトルが共分散尺度 $K=\sqrt{8/3}$ のsub-Gaussian条件を満たすことを示せ。
3. 独立標本 $X_1,\ldots,X_n$ の $\widehat\Sigma_0$ について、本章の一般共分散定理による確率評価を明記せよ。

- Level: C
- ID: HDP7-C2

<!-- solution-start -->
**詳細解答**　(1) $a=(2,0,1)^{\mathsf T}$ と書くと $X=aG$ なので、$EX=0$、$\Sigma=E[G^2]aa^{\mathsf T}=aa^{\mathsf T}$ です。

$$
\Sigma=
\begin{pmatrix}
4&0&2\\0&0&0\\2&0&1
\end{pmatrix}.
$$

$a^{\mathsf T}a=5$ なので $\Sigma a=a(a^{\mathsf T}a)=5a$ です。$a$ に直交する二次元空間では $\Sigma u=a(a^{\mathsf T}u)=0$ となります。従って固有値は $5,0,0$、階数 $r=1$、$\|\Sigma\|_{\mathrm{op}}=5$ です。

(2) 任意の $u\in\mathbb R^3$ に対して $\langle X,u\rangle=(a^{\mathsf T}u)G$ です。標準正規の $\psi_2$ ノルムは $\sqrt{8/3}$ なので

$$
\|\langle X,u\rangle\|_{\psi_2}
=|a^{\mathsf T}u|\sqrt{8/3},
\qquad
\sqrt{u^{\mathsf T}\Sigma u}
=\sqrt{(a^{\mathsf T}u)^2}=|a^{\mathsf T}u|.
$$

すべての $u$ で定義の条件が等号で成立します。(3) [一般共分散定理](#thm-hdp7-general-covariance)へ $r=1$、$K^2=8/3$、$\|\Sigma\|_{\mathrm{op}}=5$ を代入し、$L=\log9+\log(2/\delta)$ とすると、確率 $1-\delta$ 以上で

$$
\|\widehat\Sigma_0-\Sigma\|_{\mathrm{op}}
\le16\cdot\frac83\cdot5\,
\max\{\sqrt{L/n},L/n\}
=\frac{640}{3}\max\{\sqrt{L/n},L/n\}.
$$

この問題では $d=3$ でも、確率評価のnetを張る空間は共分散の像である一次元です。従って対数の次元係数は $3\log9$ ではなく $\log9$ になります。
<!-- solution-end -->

## 8. 次章へ：行列全体の集中を直接扱うには

この章では「固定方向 $\to$ 一次元の二乗集中 $\to$ 有限net $\to$ 作用素ノルム」という経路で、標本共分散を非漸近的に評価しました。$\sqrt{d/n}$ と $d/n$ の二領域、平均推定による階数一補正、退化共分散における有効な方向の数が、どこから出てきたか追えるはずです。

次は、行列値の確率変数そのものの指数モーメントを扱います。行列は一般に可換でないため $e^{A+B}=e^Ae^B$ と置くことはできません。この障害をどう処理するかが、行列Bernstein不等式への入口です。
