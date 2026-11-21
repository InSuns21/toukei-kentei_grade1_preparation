# ANF11 局所体の整数環・分岐

[ANF10 の Eisenstein 拡大の構成](../ANF10/index.md#thm-anf10-eisenstein-extension)では、$X^2-5$ の根 $\pi$ を加えると $\mathbb Q_5(\pi)$ の整数環が $\mathbb Z_5[\pi]$ になり、$5$ は $\pi$ の平方の単元倍になることを示しました。では任意の有限拡大でも、整数環を作り、素数 $p$ が何回重なるかを測れるのでしょうか。

この問いは、[ANF4 の数体の分岐指数・剰余次数](../ANF4/index.md#def-anf4-ramification-residue)の局所版です。数体では $p$ の上に複数の素イデアルが現れました。一つの局所体 $L/\mathbb Q_p$ に注目すると、極大イデアルは一つになり、**一様化元**の冪で測れます。さらに、[ANF2 の跡・判別式](../ANF2/index.md#def-anf2-basis-discriminant)を局所体に移すと、分岐をより細かく測る「異なる」を定義できます。

本講で示す道筋は、整数環の構成、分岐指数と剰余次数の次数公式、跡双対からの異なる、最後に非分岐・分岐・強い分岐の手計算です。以下 $p$ は素数、$K=\mathbb Q_p$、$L/K$ は **有限次の体拡大**、$n=[L:K]\ge1$ とします。$v_p(p)=1$、$\mathbb Z_p=\{x\in K:v_p(x)\ge0\}$ です。[有限局所拡大の意味](../ANF10/index.md#def-anf10-finite-local-extension)と[非Archimedes付値の和・積](../ANF9/index.md#prop-anf9-valuation-rules)を使用します。

<!-- definition-example-audit: strict -->

## 1. 一つの素イデアルだけを持つ整数環

まず「$\pi$ で割り切れるか」を判定できる環が必要です。数体の整数環と同じように、体 $L$ の元で $\mathbb Z_p$ 係数のモニック方程式を満たすものを集めます。この条件が**整性**です（[整元の定義](../../AG/AG1-06/index.md#def-ag1-06-integral-element)）。数体の議論との違いは、係数環 $\mathbb Z_p$ が完備である点です。

<a id="def-anf11-integer-ring"></a>

<!-- formal-statement-start -->
> **定義（局所拡大の整数環）**  
> 有限次拡大 $L/\mathbb Q_p$ に対し、$x\in L$ が $\mathbb Z_p$ 上整であるとは、ある $r\ge1$ と $a_0,\ldots,a_{r-1}\in\mathbb Z_p$ について

$$
x^r+a_{r-1}x^{r-1}+\cdots+a_0=0
$$

> が成り立つことをいう。そのような元全体を $\mathcal O_L$ と記し、**整数環**と呼ぶ。
<!-- formal-statement-end -->

<!-- definition-example-start: def-anf11-integer-ring -->
**定義の確認**： $L=\mathbb Q_5(\pi)$、$\pi^2=5$ では $\pi$ は $X^2-5$、$1+\pi$ は $(X-1)^2-5=X^2-2X-4$ という、それぞれ $\mathbb Z_5$ 係数のモニック方程式を満たします。

よって両者は整数環に入ります。

逆に[Eisenstein 拡大の局所体構造](../ANF10/index.md#thm-anf10-eisenstein-extension)によれば、この例の整数環全体は $\mathbb Z_5[\pi]=\mathbb Z_5\oplus\mathbb Z_5\pi$ です。$\pi^{-1}=\pi/5$ は基底 $(1,\pi)$ に関する係数 $1/5\notin\mathbb Z_5$ を持つので、整数環には入りません。
<!-- definition-example-end -->

一般の $\mathcal O_L$ がいつも一つの極大イデアルを持ち、しかもそのイデアルが一つの元で生成されることを証明します。準備として、$K=\mathbb Q_p$ とし、$x\in L$ に対する乗法写像を

$$
m_x:L\longrightarrow L,\qquad y\longmapsto xy
$$

と置きます。この $K$ 線形写像の跡を $\operatorname{Tr}_{L/K}(x)$、行列式を $N_{L/K}(x)$ と書きます。拡大 $L/K$ を固定した箇所では添字を省いて $\operatorname{Tr},N$ と記します。これは[跡・ノルムの乗法行列による定義と演算則](../ANF2/index.md#prop-anf2-trace-norm-properties)を $\mathbb Q_p$ 上に移したものです。

$L/K$ は標数 $0$ の有限拡大なので分離的です。双線形形式 $(x,y)\mapsto\operatorname{Tr}(xy)$ が**非退化**とは、$x\ne0$ に対して $\operatorname{Tr}(xy)\ne0$ となる $y\in L$ を選べることをいいます。

[共役による跡の表示](../ANF2/index.md#thm-anf2-embedding-formulas)から、原始元 $\theta$ の相異なる共役 $\theta_1,\ldots,\theta_n$ を用いた冪基底上の行列は

$$
T=VV^{\mathsf T},\qquad
V=(\theta_j^i)_{0\le i<n,\,1\le j\le n}.
$$

Vandermonde 行列 $V$ は可逆なので $T$ も可逆となり、非退化性が従います。

次の定理では、整数環の非零元を一つの元の冪と単元の積で一意に表せることを示します。この構造が離散付値環を具体的に扱う鍵です。論証には[既習の局所単項性](../ANF3/index.md#lem-anf3-local-principal)を用います。

<a id="thm-anf11-local-dvr"></a>

<!-- formal-statement-start -->
> **定理（局所体の整数環は完備な離散付値環）**  
> $L/\mathbb Q_p$ を有限次拡大、$n=[L:\mathbb Q_p]$ とする。$\mathcal O_L$ は $\mathbb Z_p$ 上階数 $n$ の有限自由加群で、$p$ 進完備な整閉 Noether 整域である。$\mathcal O_L$ は唯一の極大イデアル $\mathfrak m_L$ を持ち、ある $\pi\in\mathfrak m_L$ により

$$
\mathfrak m_L=(\pi),\qquad
\mathcal O_L\setminus\{0\}
=\{u\pi^r:u\in\mathcal O_L^\times,\ r\in\mathbb Z_{\ge0}\}
$$

> と表せる。指数 $r$ は一意で、$L^\times$ では $r\in\mathbb Z$ を許す。特に $L$ はこの付値について完備であり、剰余体 $\kappa_L=\mathcal O_L/\mathfrak m_L$ は有限体である。
<!-- formal-statement-end -->

### 証明の見取り図

数体の[局所単項性の補題](../ANF3/index.md#lem-anf3-local-principal)に到達するために、$\mathcal O_L$ が Dedekind 整域かつ局所環であることを確認します。有限生成性は跡形式から得る係数の双対加群によって従い、「極大イデアルが一つ」は $\mathbb Z_p$ の完備性を使って示します。

<!-- proof-start -->
### 証明

**(1) 有限生成性。** 分離拡大 $L/K$ では原始元 $\alpha$ を選べます。その最小多項式を $X^n+c_{n-1}X^{n-1}+\cdots+c_0$（$c_j\in K$）とすると、$\theta=p^s\alpha$ は

$$
X^n+p^sc_{n-1}X^{n-1}+\cdots+p^{sn}c_0
$$

の根です。$s$ を十分大きく選べばすべての係数が $\mathbb Z_p$ に入るので $\theta$ は整で、$K(\theta)=L$ も保たれます。

$E=\mathbb Z_p[\theta]$ は基底 $1,\theta,\ldots,\theta^{n-1}$ を持つ自由加群です。

[整元の積についての閉性](../../AG/AG1-06/index.md#prop-ag1-06-finite-generators)より、$x\in\mathcal O_L$ と $0\le j<n$ について $x\theta^j$ も整です。

整元 $z$ の最小多項式の係数が整数となる理由を確認します。$z$ の共役を根とするモニック最小多項式の係数は、整元の和・積なので $\mathbb Z_p$ 上整です。一方、それらの係数は $K$ に属します。[整数環の整閉性](../ANF9/index.md#prop-anf9-dvr-structure)から、係数は $\mathbb Z_p$ に入ります。

[共役による跡の表示](../ANF2/index.md#thm-anf2-embedding-formulas)を $K$ 上に適用します。最小多項式の次数が $d$、拡大次数が $n$ なら、各共役値は $n/d$ 回ずつ現れます。従って跡は最小多項式の整数係数の整数倍であり、$\mathbb Z_p$ に属します。特に

$$
\operatorname{Tr}(x\theta^j)\in\mathbb Z_p
\qquad(0\le j<n).
$$

$T=(\operatorname{Tr}(\theta^{i+j}))_{0\le i,j<n}$ と置きます。$\theta$ の共役を $\theta_1,\ldots,\theta_n$ とすると、$V=(\theta_j^i)_{i,j}$ により $T=VV^{\mathsf T}$。共役は相異なるので

$$
\det T=\left(\prod_{a<b}(\theta_b-\theta_a)\right)^2\ne0.
$$

任意の $x\in L$ を冪基底で $x=\sum_{i=0}^{n-1}b_i\theta^i$（$b_i\in K$）と表します。跡の線形性から

$$
\operatorname{Tr}(x\theta^j)
=\sum_{i=0}^{n-1}b_i\operatorname{Tr}(\theta^{i+j})
=(T\boldsymbol b)_j,\qquad
\boldsymbol b=(b_0,\ldots,b_{n-1})^{\mathsf T}.
$$

従って整元に対する跡条件は $T\boldsymbol b\in\mathbb Z_p^n$ であり、$T$ が可逆なので $\boldsymbol b\in T^{-1}\mathbb Z_p^n$ と判定できます。$T^{-1}$ の成分の分母を払う $p^s$ を選べば

$$
E\subseteq\mathcal O_L\subseteq p^{-s}E.
$$

$\mathbb Z_p$ は PID で、有限自由加群の部分加群は有限自由です。また $E$ を含むので階数は $n$ です。従って $\mathcal O_L$ は $p$ 進完備で、$\mathcal O_L/p\mathcal O_L$ は有限環です。

**(2) 極大イデアルは一つ。** $\mathcal O_L$ は $\mathbb Z_p$ 上有限かつ整です。$\mathbb Z_p$ は整閉なので $\mathcal O_L\cap K=\mathbb Z_p$ であり、$1/p\notin\mathcal O_L$、従って $p\mathcal O_L$ は真のイデアルです。$\mathcal O_L$ の極大イデアル $M$ の $\mathbb Z_p$ への縮約は整拡大の性質で極大となります（体 $\mathcal O_L/M$ が $\mathbb Z_p/(M\cap\mathbb Z_p)$ 上整なら後者も体）。$\mathbb Z_p$ の唯一の極大イデアルは $(p)$ なので、すべての $M$ は $p\mathcal O_L$ を含みます。$R=\mathcal O_L/p\mathcal O_L$ を考えます。

有限可換環 $R$ に非自明な冪等元がなければ $R$ は局所環です。実際、任意の $a\in R$ について冪列は有限性からいずれ周期に入り、十分大きい周期の倍数 $M$ を選ぶと $a^{2M}=a^M$ です。従って $a^M$ は冪等元で、$0$ または $1$。前者なら $a$ は冪零、後者なら $a$ は単元です。冪零元は和と環元による積で閉じるため、非単元全体がただ一つの極大イデアルになります。

$R$ に非自明な冪等元 $\bar e$ があったと仮定します。代表 $e_0\in\mathcal O_L$ を選ぶと $F(e_0)=e_0^2-e_0\in p\mathcal O_L$ かつ $F'(e_0)=2e_0-1$ は法 $p$ で平方が $1$ だから単元です。$F'(e_0)$ の逆数は、法 $p$ の逆数の代表から幾何級数で構成できます。Newton 反復

$$
e_{k+1}=e_k-\frac{e_k^2-e_k}{2e_k-1}
$$

を行います。$h_k=-F(e_k)/F'(e_k)$ と置くと二次式の展開から

$$
F(e_k+h_k)=F(e_k)+F'(e_k)h_k+h_k^2=h_k^2
$$

です。$F'(e_k)^2=1+4F(e_k)$ なので $F(e_k)\in p\mathcal O_L$ なら $F'(e_k)$ は単元であり、この性質は反復で保たれます。帰納的に $F(e_k),h_k\in p^{2^k}\mathcal O_L$ となるので、[Newton 反復の残差評価](../ANF10/index.md#prop-anf10-newton-doubling)と同様に $(e_k)$ は Cauchy 列です。$\mathcal O_L$ の $p$ 進完備性と多項式の連続性から $e_k\to e\in\mathcal O_L$、$F(e)=0$ が従います。

ところが $\mathcal O_L\subset L$ は整域なので冪等元は $0,1$ に限られ、非自明な $\bar e$ に矛盾します。よって $R$ は局所環、従って $\mathcal O_L$ も局所環です。

**(3) 離散付値環性。** $\mathcal O_L$ は整元全体なので整閉です。有限 $\mathbb Z_p$ 加群ゆえ Noether 環です。

任意の非零素イデアル $P$ の $0\ne x\in P$ は、定数項 $a_0\ne0$ のモニック方程式を満たします。等式を移項すると $a_0\in(x)\subseteq P$ なので $P\cap\mathbb Z_p$ は $(p)$ です。

従って $P$ は有限環 $\mathcal O_L/p\mathcal O_L$ の素イデアルに対応し極大です。

これで[Dedekind 整域の三条件](../ANF3/index.md#def-anf3-dedekind-domain)を満たします。

しかも $\mathcal O_L$ は局所環なので、その唯一の極大イデアル $\mathfrak m_L$ で局所化しても $\mathcal O_{L,\mathfrak m_L}=\mathcal O_L$ です。[Dedekind 整域の局所単項性](../ANF3/index.md#lem-anf3-local-principal)をここに適用すると唯一の極大イデアルは $(\pi)$、非零元は一意に $u\pi^r$ と表せます。

分数体も確かめます。任意の $x\in L$ の最小多項式の係数の分母を払うように $s$ を大きく選ぶと、$p^s x$ は整になります。そのため

$$
x=\frac{p^s x}{p^s}\in\operatorname{Frac}(\mathcal O_L),
\qquad L=\operatorname{Frac}(\mathcal O_L).
$$

従って非零元の表示は、分数体まで拡げると $\pi^r u$（整数 $r$、単元 $u$）となります。剰余体は有限環 $\mathcal O_L/p\mathcal O_L$ の商なので有限です。

最後に完備性を確認します。非単元 $p$ は $p=u\pi^e$（単元 $u$、$e\ge1$）と書けます。従って任意の正整数 $k$ について

$$
p^k\mathcal O_L=\pi^{ek}\mathcal O_L.
$$

両冪が定める近傍系は同じなので、$p$ 進位相と $\pi$ 進位相は一致します。$\pi$ 進 Cauchy 列の尾部はある $\pi^{-r}\mathcal O_L$ に入るため、$\pi^r$ を掛けて整数環の完備性を適用し、極限を得てから $\pi^{-r}$ を掛ければ $L$ 自身も完備です。
<!-- proof-end -->

**何が分かったか。** Eisenstein 型でなくても整数環が構成され、分母・分子を一様化元 $\pi$ の整数冪で数えられます。これは局所体での「素数の指数」です。

## 2. 一様化元・剰余体・二つの次数

一様化元は整数環の唯一の極大イデアルを生成する元です。どの一様化元を選んでも、$u\pi^r$ の指数 $r$ は同じになります。これを規格化された付値として定義します。$p$ は $\pi$ の何乗に相当するか、剰余体は $\mathbb F_p$ の何次拡大か、という二つの整数が求める不変量です。

<a id="def-anf11-uniformizer-valuation"></a>

<!-- formal-statement-start -->
> **定義（一様化元と規格化付値）**  
> 有限拡大 $L/\mathbb Q_p$ の整数環 $\mathcal O_L$ とその唯一の極大イデアル $\mathfrak m_L$ に対し、$\mathfrak m_L=\pi\mathcal O_L$ を満たす $\pi$ を**一様化元**という。任意の $x\in L^\times$ を $x=\pi^r u$（$r\in\mathbb Z,\ u\in\mathcal O_L^\times$）と表したとき

$$
v_L(x)=r,\qquad v_L(0)=\infty
$$

> と定める。$v_L(\pi)=1$、$\mathcal O_L=\{x:v_L(x)\ge0\}$、$\mathfrak m_L=\{x:v_L(x)\ge1\}$ である。
<!-- formal-statement-end -->

<!-- definition-example-start: def-anf11-uniformizer-valuation -->
**定義の確認**： $L=\mathbb Q_5(\pi)$、$\pi^2=5$ なら、[前講の構成](../ANF10/index.md#thm-anf10-eisenstein-extension)で $\mathfrak m_L=\pi\mathbb Z_5[\pi]$ かつ $5=\pi^2$ です。従って $\pi$ は一様化元、$v_L(\pi)=1$、$v_L(5)=2$、$v_L(1+\pi)=0$。最後の等式は $1+\pi$ が法 $\pi$ で $1$ に写るので単元であることから従います。
<!-- definition-example-end -->

一様化元以外の候補 $\pi'=u\pi$ も $u$ が単元なら同じ極大イデアルを生成します。指数 $r$ は変わらず、付値は選択に依存しません。

<a id="def-anf11-e-f"></a>

<!-- formal-statement-start -->
> **定義（局所拡大の分岐指数・剰余次数）**  
> $L/\mathbb Q_p$ を有限拡大とし、規格化付値を $v_L$、剰余体を $\kappa_L=\mathcal O_L/\mathfrak m_L$ とする。正整数

$$
e(L/\mathbb Q_p)=v_L(p),\qquad
f(L/\mathbb Q_p)=[\kappa_L:\mathbb F_p]
$$

> をそれぞれ**分岐指数**、**剰余次数**という。$e=1$ のとき**非分岐**、$e>1$ のとき**分岐**といい、$f=1$ のとき**全分岐**という（下で証明する $n=ef$ により、このとき $e=n$）。
<!-- formal-statement-end -->

<!-- definition-example-start: def-anf11-e-f -->
**定義の確認**： $L=\mathbb Q_5(\sqrt5)$ では $v_L(5)=2$ なので $e=2$、$\mathcal O_L/(\pi)\cong\mathbb F_5$ なので $f=1$。一方、基礎体 $L=\mathbb Q_5$ 自身では一様化元が $5$、剰余体が $\mathbb F_5$ であり $e=f=1$ です。分岐指数は付値の値、剰余次数は剰余体の次元と、別の定義条件を実際に確認しました。
<!-- definition-example-end -->

<a id="thm-anf11-ef-degree"></a>

<!-- formal-statement-start -->
> **定理（局所拡大の次数公式）**  
> $L/\mathbb Q_p$ を次数 $n$ の有限拡大、$e=v_L(p)$、$f=[\kappa_L:\mathbb F_p]$ とする。このとき

$$
n=ef,\qquad
p\mathcal O_L=\mathfrak m_L^{\,e},\qquad
v_L|_{\mathbb Q_p^\times}=e\,v_p.
$$

> さらに $|x|_L=p^{-v_L(x)/e}$（$|0|_L=0$）は $|\cdot|_p$ を延長する絶対値であり、この延長は一意である。
<!-- formal-statement-end -->

### 証明の見取り図

$p$ は一様化元 $\pi$ の $e$ 乗に単元を掛けたものです。$\mathcal O_L/p\mathcal O_L$ を、$\mathbb F_p$ ベクトル空間として数えると $n$ 次元、$\pi$ の冪による段階的な商として数えると各段階が $f$ 次元で全部で $e$ 段です。

<!-- proof-start -->
### 証明

$p\in\mathcal O_L$ は非単元です。よって $p=u\pi^e$（$u\in\mathcal O_L^\times$, $e\ge1$）と一意に表せ、$p\mathcal O_L=(\pi^e)=\mathfrak m_L^e$。$\mathcal O_L$ が $\mathbb Z_p$ 上階数 $n$ の自由加群なので

$$
|\mathcal O_L/p\mathcal O_L|=|\mathbb F_p^n|=p^n.
$$

一方、$\mathfrak m_L^j/\mathfrak m_L^{j+1}$ に対し、$a+\mathfrak m_L\mapsto a\pi^j+\mathfrak m_L^{j+1}$ は $\kappa_L$ からの同型です。全射性は $\mathfrak m_L^j=(\pi^j)$ から、単射性は $\pi^j a\in\pi^{j+1}\mathcal O_L$ なら整域で $\pi^j$ を消して $a\in(\pi)$ となることから従います。従って各商の元数は $|\kappa_L|=p^f$ です。$j=0,\ldots,e-1$ の $e$ 個の商の元数を掛ければ

$$
|\mathcal O_L/\mathfrak m_L^e|
=\prod_{j=0}^{e-1}|\mathfrak m_L^j/\mathfrak m_L^{j+1}|
=(p^f)^e=p^{ef}.
$$

$p\mathcal O_L=\mathfrak m_L^e$ だから $p^n=p^{ef}$、すなわち $n=ef$ です。$a=p^r w\in\mathbb Q_p^\times$（$w\in\mathbb Z_p^\times$）なら、$w,w^{-1}\in\mathcal O_L$ なので $v_L(w)=0$、従って $v_L(a)=er=e\,v_p(a)$ です。

[離散付値の和と積の性質](../ANF9/index.md#prop-anf9-valuation-rules)を $\pi$ の冪表示に適用すれば $p^{-v_L(x)/e}$ は非Archimedes絶対値となり、制限は $|a|_p=p^{-v_p(a)}$ です。

延長の一意性では、通常の絶対値 $|\cdot|'$ が $|\cdot|_p$ を延長すると仮定します。まず $a,b\in L$、$M=\max(|a|',|b|')$ と正整数 $m$ を取ります。二項定理と $|\binom mk|'=|\binom mk|_p\le1$ から

$$
|a+b|'^m
\le\sum_{k=0}^m\left|\binom mk\right|'|a|'^k|b|'^{m-k}
\le(m+1)M^m.
$$

$m$ 乗根を取って $m\to\infty$ とすれば $|a+b|'\le M$ です。従って拡張絶対値は非Archimedes的です。整元 $x$ のモニック方程式の係数 $a_j\in\mathbb Z_p$ は $|a_j|'\le1$ を満たすので、$|x|'>1$ なら最高次項だけが他の各項より絶対値が大きくなり、強三角不等式と矛盾します。ゆえに $|x|'\le1$ です。

単元 $u$ とその逆元はともに整なので $|u|'=1$。$p=u\pi^e$ から $|\pi|'=p^{-1/e}$、従って $x=\pi^ru$ を代入すると $|x|'=p^{-v_L(x)/e}$ です。

最後に、$\mathcal O_L$ の $p$ 進位相と $\pi$ 進位相は、$p\mathcal O_L=\pi^e\mathcal O_L$ により同じです。$\mathcal O_L$ は $p$ 進完備なので $L$ は $v_L$ の距離で完備です（Cauchy 列の尾部を一つの $\pi^{-r}\mathcal O_L$ に移して収束させる）。
<!-- proof-end -->

**次数を取り違えない。** $n=ef$ であるため、有限拡大における「全分岐」は $f=1$ と $e=n$ が同値です。「非分岐」は $e=1$ と $f=n$ が同値です。一つの局所拡大では、[大域の和の公式](../ANF4/index.md#thm-anf4-fundamental-identity)に現れる複数の素イデアルを足し合わせる必要はありません。

## 3. 非分岐な二次拡大を手で作る

分岐する例だけでは $e$ と $f$ の役割が混ざります。今度は $p=3$、$L=\mathbb Q_3(i)$、$i^2=-1$ を考えます。$X^2+1$ は $\mathbb F_3$ に根を持ちません（$0^2+1=1$、$1^2+1=2$、$2^2+1=2$）から $\mathbb Q_3$ 上既約で、$[L:\mathbb Q_3]=2$ です。

$E=\mathbb Z_3[i]$ と置くと $E/3E\cong\mathbb F_3[X]/(X^2+1)$ は元数 $9$ の体です。従って $3E$ は極大イデアルです。ただし、**この計算だけで $E=\mathcal O_L$ とはまだ言えません**。他の整な元があるかを、次節の跡双対で判定します。その判定で実際に $\mathcal O_L=E$ を証明すると、一様化元は $3$、剰余体は $\mathbb F_9$ なので

$$
e(L/\mathbb Q_3)=1,\qquad f(L/\mathbb Q_3)=2.
$$

従って、分岐指数が $1$ でも拡大次数は $2$ になり得ます。増えた次数は剰余体に現れているのです。

## 4. 跡双対から異なるを定義する

分岐指数 $e$ は、素数 $p$ が整数環の極大イデアル $\mathfrak m_L$ の何乗に対応するかを数えます。しかし例えば $p=2$ の分岐と奇素数の分岐では、同じ $e=2$ でも判別式への影響が異なります。これを測るため、跡の整数性を判定する格子を作ります。

[ANF2 の跡形式と判別式](../ANF2/index.md#def-anf2-basis-discriminant)を、$\mathbb Q$ 上の数体から $\mathbb Q_p$ 上の拡大へ移します。$L/\mathbb Q_p$ は分離拡大なので、跡形式は非退化です。逆を取る対象は[ANF3 の分数イデアル](../ANF3/index.md#def-anf3-fractional-ideal)であり、その[逆分数イデアルの定義](../ANF3/index.md#def-anf3-inverse-ideal)を使います。跡の整数性を、まず基底上の有限個の条件へ直します。

<a id="def-anf11-codifferent"></a>

<!-- formal-statement-start -->
> **定義（余異なる・異なる）**  
> 有限拡大 $L/\mathbb Q_p$ の整数環を $\mathcal O_L$ とする。**余異なる（codifferent）**を、跡がすべての整数環の元に対して整となる $L$ の元の集合

$$
\mathfrak D_{L/\mathbb Q_p}^{-1}
=\{x\in L:\operatorname{Tr}_{L/\mathbb Q_p}(x\mathcal O_L)
\subseteq\mathbb Z_p\}
$$

> で定める。これは $\mathcal O_L$ の非零分数イデアルであり、その逆分数イデアル $\mathfrak D_{L/\mathbb Q_p}$ を **異なる（different）**という。$\mathcal O_L$ は離散付値環なので

$$
\mathfrak D_{L/\mathbb Q_p}=\mathfrak m_L^{\,d}
$$

> となる一意な整数 $d\ge0$ がある。$d$ を異なる指数という。
<!-- formal-statement-end -->

<!-- definition-example-start: def-anf11-codifferent -->
**定義の確認**： $L=\mathbb Q_p$ なら跡は恒等写像です。$\{x:x\mathbb Z_p\subseteq\mathbb Z_p\}=\mathbb Z_p$ なので余異なるも異なるも $\mathbb Z_p$ です。従って $d=0$。ここでは元 $x=1$ を試すだけでなく、すべての $y\in\mathbb Z_p$ に対する条件が $x\in\mathbb Z_p$ と同値であることを確かめました。
<!-- definition-example-end -->

**定義から基底による判定へ。** $\mathcal O_L$ の $\mathbb Z_p$ 基底を $\omega_1,\ldots,\omega_n$ とします。$x=\sum_i b_i\omega_i$（$b_i\in K$）、$y=\sum_jc_j\omega_j$（$c_j\in\mathbb Z_p$）と書き、

$$
T_{ij}=\operatorname{Tr}(\omega_i\omega_j),\qquad
\operatorname{Tr}(xy)=\sum_{i,j}b_iT_{ij}c_j
=\boldsymbol b^{\mathsf T}T\boldsymbol c
$$

を得ます。従って**すべての** $y\in\mathcal O_L$ に対する跡の整数性は、$y=\omega_j$ の $n$ 通りの検査、すなわち $T\boldsymbol b\in\mathbb Z_p^n$ と同値です。第1節で示した非退化性から $T$ は $K$ 上可逆なので

$$
\mathfrak D^{-1}
=\left\{\sum_i b_i\omega_i:
\boldsymbol b\in T^{-1}\mathbb Z_p^n\right\}.
$$

**分数イデアル性の確認。** この表示は余異なるが階数 $n$ の有限自由 $\mathbb Z_p$ 加群で $L$ を張ることを示します。$T^{-1}$ の全成分について共通分母 $p^s$ を払えば $p^s\mathfrak D^{-1}\subseteq\mathcal O_L$ です。従って残る $\mathcal O_L$ 加群性を確かめれば[分数イデアルの定義](../ANF3/index.md#def-anf3-fractional-ideal)を満たします。

また $a\in\mathcal O_L$、$x$ が余異なる、$y\in\mathcal O_L$ なら $axy$ は $x(ay)$ と書け、$ay\in\mathcal O_L$ なので $\operatorname{Tr}(axy)\in\mathbb Z_p$。

従って余異なるは $\mathcal O_L$ 加群です。有限生成で分数体を張るので、非零分数イデアルとなります。

整数環の元の跡は整なので $\mathcal O_L\subseteq\mathfrak D^{-1}$、その逆イデアル $\mathfrak D$ は $\mathcal O_L$ に含まれ、$d\ge0$ が従います。

一つの多項式で整数環が書けるとき、異なるは導関数一つで計算できます。以下 $g'(X)$ は $g(X)$ を多項式の変数 $X$ で形式微分したもの、$g'(\theta)$ はそれに $\theta$ を代入した元を表します（時間微分ではありません）。

<a id="thm-anf11-monogenic-different"></a>

<!-- formal-statement-start -->
> **定理（単項生成の整数環の異なる公式）**  
> $L/\mathbb Q_p$ を次数 $n$ の有限拡大、$\theta\in\mathcal O_L$ を $\mathbb Q_p$ 上のモニック最小多項式 $g(X)\in\mathbb Z_p[X]$ の根とする。さらに $\mathcal O_L=\mathbb Z_p[\theta]$ と仮定する。このとき $g'(\theta)\ne0$ であり

$$
\mathfrak D_{L/\mathbb Q_p}^{-1}
=\frac{1}{g'(\theta)}\mathcal O_L,
\qquad
\mathfrak D_{L/\mathbb Q_p}
=g'(\theta)\mathcal O_L,
\qquad
d=v_L(g'(\theta)).
$$

> また基底 $1,\theta,\ldots,\theta^{n-1}$ の跡判別式は $(-1)^{n(n-1)/2}N_{L/\mathbb Q_p}(g'(\theta))$ に等しい。
<!-- formal-statement-end -->

### 証明の見取り図

分母の $g'(\theta)$ は、相異なる根 $\theta_j$ の積 $\prod_{k\ne j}(\theta_j-\theta_k)$ に対応します。Lagrange 補間の最高次係数を読み取ると、跡双対の元を列として構成できます。

<!-- proof-start -->
### 証明

標数 $0$ だから $g$ は分離的で、その相異なる根を $\theta_1,\ldots,\theta_n$ とします。次数 $n$ 未満の任意の $h(X)\in\mathbb Q_p[X]$ に対し、Lagrange 補間式

$$
h(X)=\sum_{j=1}^n
h(\theta_j)\frac{g(X)}{(X-\theta_j)g'(\theta_j)}
$$

が成立します。各 $\frac{g(X)}{X-\theta_j}$ はモニックで次数 $n-1$ なので、両辺の $X^{n-1}$ 係数を比較すると

$$
\sum_{j=1}^n\frac{h(\theta_j)}{g'(\theta_j)}
=[X^{n-1}]h(X)
$$

です。左辺は $\operatorname{Tr}_{L/\mathbb Q_p}(h(\theta)/g'(\theta))$ です。任意の $a(X),b(X)\in\mathbb Z_p[X]$（次数 $<n$）について、$a(X)b(X)$ を $g$ で割った余り $r(X)$ も $\mathbb Z_p[X]$ にあります。[モニック多項式による除法](../../../基礎科目/LA/LA4/index.md#lem-la4-polynomial-division)で係数が整数に保たれるためです。よって

$$
\operatorname{Tr}\!\left(\frac{a(\theta)b(\theta)}{g'(\theta)}\right)
=[X^{n-1}]r(X)\in\mathbb Z_p.
$$

これにより $g'(\theta)^{-1}\mathcal O_L\subseteq\mathfrak D^{-1}$。逆包含のため、$a(X)=\sum_{i=0}^{n-1}a_iX^i$ に対する上の跡汎関数を、$b(X)=1,X,\ldots,X^{n-1}$ で評価します。その行列は $( [X^{n-1}](X^{i+j}\bmod g))_{0\le i,j<n}$ で、$i+j<n-1$ なら $0$、$i+j=n-1$ なら $1$ です。列を逆順に並べ替えると対角成分 $1$ の三角行列になるので、行列式は $\pm1$ です。つまり $a\mapsto(b\mapsto\operatorname{Tr}(a(\theta)b(\theta)/g'(\theta)))$ は、$\mathbb Z_p$ 加群 $\mathcal O_L$ とその双対 $\operatorname{Hom}_{\mathbb Z_p}(\mathcal O_L,\mathbb Z_p)$ の同型です。従って逆包含も成立し、異なるの式が得られます。

判別式は根の Vandermonde 行列の行列式の平方です。他方

$$
\prod_{j=1}^n g'(\theta_j)
=\prod_{j=1}^n\prod_{k\ne j}(\theta_j-\theta_k)
=(-1)^{n(n-1)/2}\prod_{j<k}(\theta_j-\theta_k)^2.
$$

ゆえに判別式は次の値です。

$$
\operatorname{disc}(1,\theta,\ldots,\theta^{n-1})
=(-1)^{n(n-1)/2}N(g'(\theta)).
$$
<!-- proof-end -->

**仮定が重要です。** $L=\mathbb Q_p(\theta)$ であるだけではこの公式を $\mathcal O_L$ の異なるへ適用できません。$\mathbb Z_p[\theta]$ が**整数環全体**であることを確認して初めて使えます。そうでなければ、上の計算が求めるのは部分環 $\mathbb Z_p[\theta]$ の跡双対です。

## 5. 三つの計算で分岐の強さを比べる

### 5.1 非分岐：$\mathbb Q_3(i)$

先ほどの $E=\mathbb Z_3[i]=\mathbb Z_3\oplus\mathbb Z_3i$ について、まず跡の定義を基底 $(1,i)$ で調べます。共役 $i\mapsto-i$ により $\operatorname{Tr}(1)=2$、$\operatorname{Tr}(i)=0$、$\operatorname{Tr}(i^2)=-2$ なので

$$
T=\begin{pmatrix}2&0\\0&-2\end{pmatrix},
\qquad T^{-1}=\begin{pmatrix}1/2&0\\0&-1/2\end{pmatrix}.
$$

$2$ は $\mathbb Z_3$ の単元ですから、$x=a+bi$ に対する条件 $\operatorname{Tr}(x)=2a\in\mathbb Z_3$ と $\operatorname{Tr}(xi)=-2b\in\mathbb Z_3$ は $a,b\in\mathbb Z_3$ と同値です。従って[第4節の余異なるの基底判定](#def-anf11-codifferent)の通り、$E$ の跡双対 $E^\vee=\{x\in L:\operatorname{Tr}(xE)\subseteq\mathbb Z_3\}$ は $E$ 自身です。ここでは $E=\mathcal O_L$ をまだ仮定していません。なお $g(X)=X^2+1$ の $g'(i)=2i$ は $E$ の単元なので、単項生成の跡双対公式 $E^\vee=(2i)^{-1}E$ とも一致します。

任意の $x\in\mathcal O_L$ と $y\in E$ はともに整なので $\operatorname{Tr}(xy)\in\mathbb Z_3$ です。よって $\mathcal O_L\subseteq E^\vee=E$。逆に $E\subseteq\mathcal O_L$ なので $\mathcal O_L=E$ が証明できました。従って

$$
\mathfrak m_L=3\mathcal O_L,\quad
\kappa_L=\mathbb F_9,\quad e=1,\quad f=2,\quad
\mathfrak D_{L/\mathbb Q_3}=\mathcal O_L,\quad d=0.
$$

非分岐例では、導関数 $2i$ が単元であるため跡双対も整数環そのものになります。

### 5.2 分岐：$\mathbb Q_5(\sqrt5)$

$\pi^2=5$、$g(X)=X^2-5$ とします。これは [Eisenstein 多項式](../ANF10/index.md#def-anf10-eisenstein)なので、[Eisenstein 拡大の局所体構造](../ANF10/index.md#thm-anf10-eisenstein-extension)から $\mathcal O_L=\mathbb Z_5[\pi]$、$v_L(\pi)=1$、$v_L(5)=2$、$\kappa_L=\mathbb F_5$ です。従って $e=2,f=1$。

導関数 $g'(\pi)=2\pi$ で $2$ は単元だから $v_L(g'(\pi))=1$。よって [異なる公式](#thm-anf11-monogenic-different)は

$$
\mathfrak D_{L/\mathbb Q_5}=(2\pi)=(\pi),
\qquad d=1
$$

を与えます。判別式は二次基底 $(1,\pi)$ について

$$
\det\begin{pmatrix}
\operatorname{Tr}(1)&\operatorname{Tr}(\pi)\\
\operatorname{Tr}(\pi)&\operatorname{Tr}(\pi^2)
\end{pmatrix}
=\det\begin{pmatrix}2&0\\0&10\end{pmatrix}=20,
$$

で $v_5(20)=1$。$N(2\pi)=N(2)N(\pi)=4(-5)=-20$ だから $-N(2\pi)=20$ とも一致します。

### 5.3 強い分岐：$\mathbb Q_2(\sqrt2)$

$\pi^2=2$ でも $X^2-2$ は $2$ 進 Eisenstein 型で、$\mathcal O_L=\mathbb Z_2[\pi]$、$e=2$、$f=1$ は同じ形です。しかし今度は $g'(\pi)=2\pi$ で、$2$ 自身が単元ではありません。

$$
v_L(g'(\pi))=v_L(2)+v_L(\pi)=2+1=3.
$$

よって異なるは $\mathfrak m_L^3$、異なる指数は $d=3$ です。判別式は $(1,\pi)$ の跡行列 $\operatorname{diag}(2,4)$ から $8$ となり、$v_2(8)=3$ です。同じ $e=2$ でも、$p=5$ では $d=1$、$p=2$ では $d=3$。$p$ が分岐指数を割ると導関数に追加の $p$ 因子が現れることが、差の原因です。

**用語の位置付け。** 分岐指数 $e$ が $p$ で割り切れない場合を *穏分岐*、割り切れる場合を *激分岐* といいます。有限剰余体は完全なので、この章の有限拡大ではこの条件で区別できます。後の ANF13 では体の自己同型が整数環に及ぼす作用から、分岐をさらに細分します。

## 6. 異なる指数と判別式の $p$ 進指数

ノルムの付値を計算します。非零元を $x=u\pi^r$（単元 $u$、整数 $r$）と表します。単元による乗法は整数環の自己同型なので、その行列式 $N(u)$ も $\mathbb Z_p$ の単元です。残る問題は一様化元のノルムです。

$\pi$ による乗法は、階数 $n$ の自由 $\mathbb Z_p$ 加群 $\mathcal O_L$ を $\pi\mathcal O_L$ に写し、その商は剰余体 $\kappa_L$ で元数は $p^f$ です。この乗法写像の行列を、同じ $\mathbb Z_p$ 基底を使って $A$ と書くと

$$
A\in M_n(\mathbb Z_p),\qquad
\operatorname{coker} A\cong\kappa_L.
$$

$\mathbb Z_p$ は PID なので可逆な行・列の基本変形によって $A$ を対角行列へ変形できます。対角成分の単元因子を取り除き、非負整数 $a_1,\ldots,a_n$ に対して $\operatorname{diag}(p^{a_1},\ldots,p^{a_n})$ が得られます。従って

$$
|\mathcal O_L/\pi\mathcal O_L|
=\prod_{j=1}^n|\mathbb Z_p/p^{a_j}\mathbb Z_p|
=p^{\sum_j a_j},
\qquad
v_p(\det A)=\sum_ja_j.
$$

左辺は $p^f$ なので、$N(\pi)=\det A$ により $v_p(N(\pi))=f$ です。従って

<a id="prop-anf11-norm-valuation"></a>

<!-- formal-statement-start -->
> **命題（ノルムと付値・異なる指数）**  
> $L/\mathbb Q_p$ を有限拡大、$f=[\kappa_L:\mathbb F_p]$ とし、$v_L$ を規格化付値とする。任意の $x\in L^\times$ について

$$
v_p(N_{L/\mathbb Q_p}(x))=f\,v_L(x).
$$

> とくに $\mathcal O_L=\mathbb Z_p[\theta]$、$\theta$ のモニック最小多項式を $g$ とすると、整数基底の跡判別式 $\Delta$ の指数は

$$
v_p(\Delta)=f\,v_L(g'(\theta))=fd.
$$
<!-- formal-statement-end -->

上の議論で命題が示されました。計算例を照合すると、各体の剰余次数と異なる指数は次の通りです。

$$
\begin{array}{c|ccc}
p&5&2&3\\ \hline
(f,d)&(1,1)&(1,3)&(2,0)\\
v_p(\Delta)=fd&1&3&0
\end{array}
$$

基底に依存しないことも確認します。[判別式の基底変換則](../ANF2/index.md#thm-anf2-basis-change)を使い、整数環の二つの $\mathbb Z_p$ 基底の変換行列を $U\in\operatorname{GL}_n(\mathbb Z_p)$、元の跡行列を $T$ とします。新しい跡行列と判別式には

$$
T_{\mathrm{new}}=U^{\mathsf T}TU,\qquad
\det T_{\mathrm{new}}=(\det U)^2\det T
$$

が成り立ちます。$\det U$ は $p$ 進単元なので、判別式の $p$ 進指数は不変です。

## 7. 演習：整数環から分岐・異なるまで

### A1. 一様化元の取り換え

$L=\mathbb Q_5(\pi)$、$\pi^2=5$ とする。$1+\pi$ が整数環の単元であることを示し、$\pi'=\pi(1+\pi)$ が一様化元であることと $v_L(5/\pi')$ を求めよ。

- Level: A
- ID: ANF11-A1

<!-- solution-start -->
**詳細解答。** [Eisenstein 拡大の局所体構造](../ANF10/index.md#thm-anf10-eisenstein-extension)により $\mathcal O_L=\mathbb Z_5[\pi]$、$\mathfrak m_L=(\pi)$。$1+\pi$ の法 $\pi$ の像は $1$ だから、局所環の単元の判定より $u=1+\pi$ は単元です。$\pi'=\pi u$ なので $(\pi')=(\pi)$、従って一様化元です。$5/\pi'=\pi^2/(\pi u)=\pi/u$ だから $v_L(5/\pi')=1-0=1$ です。
<!-- solution-end -->

### A2. 剰余体と二つの次数

$L=\mathbb Q_3(i)$、$i^2=-1$ とする。$X^2+1$ が $\mathbb F_3$ 上既約であることを調べ、$\mathcal O_L=\mathbb Z_3[i]$ を用いて $\kappa_L,e,f$ を求めよ。

- Level: A
- ID: ANF11-A2

<!-- solution-start -->
**詳細解答。** $a=0,1,2$ の平方は法 $3$ で $0,1,1$ なので $a^2+1$ はそれぞれ $1,2,2$、零になりません。よって二次多項式は既約です。本文第5.1節の跡双対の議論により整数環は $\mathbb Z_3[i]$ で、$\mathcal O_L/3\mathcal O_L=\mathbb F_3[X]/(X^2+1)$ は $3^2=9$ 個の元を持つ体です。従って $\mathfrak m_L=3\mathcal O_L$、一様化元は $3$、$e=v_L(3)=1$、$f=[\mathbb F_9:\mathbb F_3]=2$ です。$ef=2=[L:\mathbb Q_3]$ と検算できます。
<!-- solution-end -->

### A3. 積の付値と整性

$L=\mathbb Q_5(\pi)$、$\pi^2=5$ において、$x=(5+\pi)/(1+\pi)$ と $y=1/\pi^2$ の $v_L$ を計算し、どちらが $\mathcal O_L$ に属するか判定せよ。

- Level: A
- ID: ANF11-A3

<!-- solution-start -->
**詳細解答。** $5+\pi=\pi^2+\pi=\pi(\pi+1)$ なので $x=\pi$（分母 $\pi+1$ は単元で特に非零）。従って $v_L(x)=1$ で整数環に属します。一方 $y=\pi^{-2}=1/5$ なので $v_L(y)=-2$、整数環には属しません。[整数環の付値判定](#def-anf11-uniformizer-valuation)は $v_L(z)\ge0$ と同値です。
<!-- solution-end -->

### A4. 二次式の導関数

$L=\mathbb Q_7(\pi)$、$\pi^2=7$ とする。$\mathcal O_L=\mathbb Z_7[\pi]$ を確認し、$\mathfrak D_{L/\mathbb Q_7}$ と異なる指数 $d$ を求めよ。

- Level: A
- ID: ANF11-A4

<!-- solution-start -->
**詳細解答。** $X^2-7$ は先頭係数 $1$、他の係数は $7$ の倍数、定数項 $-7$ は $49$ の倍数でないので Eisenstein 型です。

[整数環の構成](../ANF10/index.md#thm-anf10-eisenstein-extension)により $\mathcal O_L=\mathbb Z_7[\pi]$、$v_L(\pi)=1$、$v_L(7)=2$。

最小多項式 $g=X^2-7$ の導関数は $g'(\pi)=2\pi$ で、$2\in\mathbb Z_7^\times$ です。

[異なる公式](#thm-anf11-monogenic-different)により $\mathfrak D=(2\pi)=(\pi)$、$d=v_L(2)+v_L(\pi)=0+1=1$。
<!-- solution-end -->

### A5. ノルムの指数

$L=\mathbb Q_5(\pi)$、$\pi^2=5$ で $x=\pi^3(1+\pi)$ とする。$v_L(x)$ と $v_5(N_{L/\mathbb Q_5}(x))$ を求め、ノルムを直接計算して検算せよ。

- Level: A
- ID: ANF11-A5

<!-- solution-start -->
**詳細解答。** $\pi$ が一様化元で $1+\pi$ は単元なので $v_L(x)=3$。この拡大では $f=1$ で、[ノルムと付値・異なる指数](#prop-anf11-norm-valuation)から $v_5(N(x))=3$。具体的に共役は $\pi\mapsto-\pi$ なので $N(\pi)=\pi(-\pi)=-5$、$N(1+\pi)=(1+\pi)(1-\pi)=1-5=-4$ です。積性より

$$
N(x)=(-5)^3(-4)=500=5^3\cdot4.
$$

$4$ は $5$ 進単元で、指数 $3$ と一致します。
<!-- solution-end -->

### B1. $ef=n$ を商の個数から証明する

有限拡大 $L/\mathbb Q_p$ について、$\mathcal O_L$ が $\mathbb Z_p$ 上階数 $n$ の自由加群で $\mathfrak m_L=(\pi)$、$p=u\pi^e$ とする。各 $\mathfrak m_L^j/\mathfrak m_L^{j+1}$ が $\kappa_L$ と同型であることを両方向から説明し、$n=ef$ を導け。

- Level: B
- ID: ANF11-B1

<!-- solution-start -->
**詳細解答。** $j\ge0$ を固定し、写像を

$$
\phi_j:\kappa_L\longrightarrow\mathfrak m_L^j/\mathfrak m_L^{j+1},
\qquad
a+\mathfrak m_L\longmapsto a\pi^j+\mathfrak m_L^{j+1}
$$

と定めます。代表を $\pi b$ だけ変えると像は $\pi^{j+1}b$ だけ変わるので、写像は well-defined です。任意の $\mathfrak m_L^j$ の元は $\pi^j a$ と書けるため全射です。さらに

$$
\phi_j(a+\mathfrak m_L)=0
\ \Longrightarrow\
\pi^j a=\pi^{j+1}b
\ \Longrightarrow\
a=\pi b\in\mathfrak m_L
$$

であり、非零元 $\pi^j$ を整域で消去できるため単射です。従って商の元数は $|\kappa_L|=p^f$ となります。

一方 $\mathcal O_L$ は $\mathbb Z_p$ 上階数 $n$ の自由加群なので

$$
|\mathcal O_L/p\mathcal O_L|
=|(\mathbb Z_p/p\mathbb Z_p)^n|
=p^n.
$$

$p\mathcal O_L=\mathfrak m_L^e$ により $j=0,\ldots,e-1$ の $e$ 個の商の元数を掛けると

$$
p^n=|\mathcal O_L/\mathfrak m_L^e|
=\prod_{j=0}^{e-1}p^f=p^{ef}.
$$

よって $n=ef$ です。
<!-- solution-end -->

### B2. 跡の直接計算と余異なる

$L=\mathbb Q_5(\pi)$、$\pi^2=5$ とする。$x=(a+b\pi)/(2\pi)$（$a,b\in\mathbb Q_5$）について、$\operatorname{Tr}(x)$ と $\operatorname{Tr}(x\pi)$ を求め、$x$ が余異なるに入る必要十分条件を $a,b$ で表せ。

- Level: B
- ID: ANF11-B2

<!-- solution-start -->
**詳細解答。** $x=a/(2\pi)+b/2=a\pi/10+b/2$ です。$\pi$ の共役は $-\pi$ なので $\operatorname{Tr}(r+s\pi)=2r$。従って

$$
\operatorname{Tr}(x)=b,\qquad
x\pi=\frac a2+\frac b2\pi,\qquad
\operatorname{Tr}(x\pi)=a.
$$

$\mathcal O_L=\mathbb Z_5\oplus\mathbb Z_5\pi$ であるため、すべての $y=c+d\pi\in\mathcal O_L$ に対し $\operatorname{Tr}(xy)=cb+da$ です。これが常に $\mathbb Z_5$ に属する必要十分条件は、$y=1,\pi$ を代入したときの $a,b\in\mathbb Z_5$ です。ゆえに余異なるは $(2\pi)^{-1}\mathcal O_L$、逆イデアルは $(2\pi)=(\pi)$ です。[異なるの定義](#def-anf11-codifferent)を基底で直接検証できました。
<!-- solution-end -->

### B3. 同じ分岐指数でも異なる指数が違う理由

$L_5=\mathbb Q_5(\sqrt5)$、$L_2=\mathbb Q_2(\sqrt2)$ の $e,f,d$ をそれぞれ求め、$d=e-1$ が両方で成り立つか調べよ。どの仮定が違いを生むか説明せよ。

- Level: B
- ID: ANF11-B3

<!-- solution-start -->
**詳細解答。** いずれも $X^2-p$ は Eisenstein なので[前講の局所体構造定理](../ANF10/index.md#thm-anf10-eisenstein-extension)から

$$
\mathcal O_{L_p}=\mathbb Z_p[\pi],\qquad
\pi^2=p,\qquad e=2,\quad f=1
$$

です。[異なる公式](#thm-anf11-monogenic-different)の仮定 $\mathcal O_{L_p}=\mathbb Z_p[\pi]$ を満たすので

$$
d=v_{L_p}(g'(\pi))
=v_{L_p}(2\pi)=v_{L_p}(2)+1
$$

となります。$p=5$ では $2$ は単元だから $v_{L_5}(2)=0$ であり、$d=1=e-1$ です。$p=2$ では[局所拡大の次数公式](#thm-anf11-ef-degree)により $v_{L_2}(2)=e\,v_2(2)=2$、従って $d=3\ne e-1$ です。

差は剰余標数 $2$ のもとで導関数の係数 $2$ が単元でなくなり、$g'(\pi)=2\pi$ に余分な付値が付くことです。$p\nmid e$ という穏分岐の仮定を落とすと、この例では $d=e-1$ という式が壊れます。
<!-- solution-end -->

### B4. 剰余体が拡がる二次例と跡双対

$L=\mathbb Q_3(i)$、$i^2=-1$ で $E=\mathbb Z_3[i]$ と置く。$(1,i)$ の跡行列を求め、その行列の逆を使って $E^\vee=E$ と $\mathcal O_L=E$ を証明せよ。

- Level: B
- ID: ANF11-B4

<!-- solution-start -->
**詳細解答。** 共役 $i\mapsto-i$ を使うと $\operatorname{Tr}(1)=2$、$\operatorname{Tr}(i)=0$、$\operatorname{Tr}(i^2)=\operatorname{Tr}(-1)=-2$ です。跡行列は

$$
T=\begin{pmatrix}2&0\\0&-2\end{pmatrix},
\qquad
T^{-1}=\begin{pmatrix}1/2&0\\0&-1/2\end{pmatrix}.
$$

$2$ は $\mathbb Z_3$ の単元です。$x=a+bi$ の係数ベクトルを $\boldsymbol b=(a,b)^{\mathsf T}$ と置くと、[余異なるの基底判定](#def-anf11-codifferent)の条件は

$$
T\boldsymbol b=(2a,-2b)^{\mathsf T}\in\mathbb Z_3^2
\quad\Longleftrightarrow\quad
a,b\in\mathbb Z_3.
$$

これが $E^\vee=E$ の理由です。$x\in\mathcal O_L$ と $y\in E$ はともに整で、その積の跡は $\mathbb Z_3$ に属します。従って $\mathcal O_L\subseteq E^\vee=E$ です。逆包含は $i^2+1=0$ というモニック整方程式から $1,i$ が整であるため成立します。

結局 $\mathcal O_L=E$ となり、$E/(3)\cong\mathbb F_9$ が体なので $\mathfrak m_L=(3)$、一様化元は $3$、$e=1$、$f=2$ です。
<!-- solution-end -->

### C1. 三種類の局所拡大を一枚の計算表へ

次の三つの拡大を考える。

1. $L_1=\mathbb Q_3(i)$、$i^2=-1$。
2. $L_2=\mathbb Q_5(\alpha)$、$\alpha^2=5$。
3. $L_3=\mathbb Q_2(\beta)$、$\beta^2=2$。

それぞれについて、(a) 最小多項式の既約性と整数環、(b) 一様化元と剰余体、(c) $e,f,[L_j:\mathbb Q_p]$ の関係、(d) 異なる、異なる指数と整数基底の判別式を求めよ。最後に $e$ の値だけで判別式の指数を一意に決められるか答えよ。

- Level: C
- ID: ANF11-C1

<!-- solution-start -->
**詳細解答。** それぞれについて、整数環を確定してから一様化元、剰余体、異なるを求めます。最小多項式の微分だけでは整数環全体の異なるを計算できないので、まずその条件を検証します。

**(1) $L_1/\mathbb Q_3$。** $X^2+1$ は法 $3$ に根がないので既約です。$E=\mathbb Z_3[i]$ の冪基底 $(1,i)$ について、共役 $i\mapsto-i$ を用いると

$$
T=\begin{pmatrix}2&0\\0&-2\end{pmatrix},
\qquad \det T=-4\in\mathbb Z_3^\times.
$$

任意の $x=a+bi$ に対し $\operatorname{Tr}(x)=2a$、$\operatorname{Tr}(xi)=-2b$ です。従って $E$ の跡双対は $E^\vee=E$。整元の積の跡の整数性から $\mathcal O_{L_1}\subseteq E^\vee$、逆包含は $i^2+1=0$ による整性から従い、$\mathcal O_{L_1}=E$ です。

法 $3$ の既約多項式から剰余環は体になり、

$$
\kappa_{L_1}=\mathbb F_3[X]/(X^2+1)\cong\mathbb F_9,
\qquad (e,f,n)=(1,2,2).
$$

一様化元は $3$ です。[単項生成の異なる公式](#thm-anf11-monogenic-different)で $g'(i)=2i$ は単元なので

$$
\mathfrak D_{L_1/\mathbb Q_3}=(1),\quad
d=0,\quad \Delta_1=-4,\quad v_3(\Delta_1)=0=fd.
$$

**(2) $L_2/\mathbb Q_5$。** $X^2-5$ は Eisenstein なので既約で、[前講の整数環構成](../ANF10/index.md#thm-anf10-eisenstein-extension)から $\mathcal O_{L_2}=\mathbb Z_5[\alpha]$、一様化元は $\alpha$、剰余体は $\mathbb F_5$ です。$\alpha^2=5$ より $v_{L_2}(5)=2$、従って $(e,f,n)=(2,1,2)$ です。

最小多項式の導関数は $g'(\alpha)=2\alpha$ で、$2$ は $5$ 進単元です。[異なる公式](#thm-anf11-monogenic-different)と基底 $(1,\alpha)$ の跡行列を用いると

$$
\mathfrak D_{L_2/\mathbb Q_5}=(2\alpha)=(\alpha),\qquad d=1,
$$

$$
T=\begin{pmatrix}2&0\\0&10\end{pmatrix},\qquad
\Delta_2=\det T=20,\qquad v_5(\Delta_2)=1=fd.
$$

**(3) $L_3/\mathbb Q_2$。** $X^2-2$ は Eisenstein なので既約で、同じ[整数環構成定理](../ANF10/index.md#thm-anf10-eisenstein-extension)から $\mathcal O_{L_3}=\mathbb Z_2[\beta]$、一様化元は $\beta$、剰余体は $\mathbb F_2$ です。$\beta^2=2$ より $(e,f,n)=(2,1,2)$ です。

ここでは $2$ が単元でないため、導関数の付値は

$$
v_{L_3}(g'(\beta))=v_{L_3}(2\beta)
=v_{L_3}(2)+v_{L_3}(\beta)=2+1=3.
$$

従って

$$
\mathfrak D_{L_3/\mathbb Q_2}=(2\beta)=(\beta^3),\qquad d=3,
$$

$$
T=\begin{pmatrix}2&0\\0&4\end{pmatrix},\qquad
\Delta_3=\det T=8,\qquad v_2(\Delta_3)=3=fd.
$$

**比較。** $L_2,L_3$ はともに $e=2,f=1$ ですが、判別式の指数はそれぞれ $1$ と $3$ です。従って $e$ だけでは異なる指数も判別式の指数も決まりません。導関数の係数が剰余標数で単元かどうかが差を生みます。
<!-- solution-end -->

---

**次講：ANF12 局所単数・ノルム・跡。** 一様化元で測った付値に対して、今度は単元 $u\in\mathcal O_L^\times$ がどのように階層化されるか、その階層でノルムと跡がどう振る舞うかを調べます。
