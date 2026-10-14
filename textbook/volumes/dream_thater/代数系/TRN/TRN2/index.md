# TRN2 共役・跡・ノルム・分母消去

[TRN1の代数的整数](../TRN1/index.md#def-trn1-algebraic-integer)は、整数係数のモニック多項式を満たす数でした。しかし、代数的整数が零でなくても、絶対値が1以上とは限りません。例えば $(\sqrt5-1)/2$ は代数的整数ですが、0と1の間にあります。

超越性の証明で本当に必要なのは、**零でない数を、絶対値が1以上の通常の整数に変える方法**です。そこで、代数的な数を一つだけ見るのではなく、その共役を全部集めて足す・掛けることを考えます。これが跡とノルムです。さらに任意の代数的数の分母を共通に払う操作を整え、後の補助多項式の整数性判定へつなぎます。

本章では、どの体の埋め込みを数えているか、同じ共役を何回数えているか、どの段階で「代数的整数」から「通常の整数」へ移ったかを一つずつ確かめます。

## 1. 共役と埋め込みは何を数えるのか

[FLD1の最小多項式](../../FLD/FLD1/index.md#def-fld1-minimal-polynomial)は、代数的数 $\eta$ を根とする $\mathbb Q$ 係数のモニック既約多項式です。いま $\eta\in\overline{\mathbb Q}$ とし、次数を $d$ とします。[標数0の分離性](../../FLD/FLD2/index.md#cor-fld2-char-zero-algebraic)によって最小多項式に重根はなく、その複素数根は $d$ 個すべて異なります。

一方、有限拡大 $K/\mathbb Q$ を固定すると、[体の埋め込み](../../FLD/FLD2/index.md#def-fld2-f-map) $\sigma:K\to\mathbb C$ によって $\eta\in K$ の像を作れます。このとき $\sigma$ は有理数を固定するので、最小多項式 $m_\eta(\eta)=0$ に作用させて

$$
m_\eta(\sigma(\eta))=\sigma(m_\eta(\eta))=0
$$

です。したがって像は共役根の一つですが、**異なる埋め込みが同じ像を与えることもあります**。

<a id="def-trn2-conjugates"></a>

<!-- formal-statement-start -->
> **定義（共役根と埋め込みによる共役値）**  
> $\eta\in\overline{\mathbb Q}$ の $\mathbb Q$ 上の最小多項式の相異なる複素根を、$\eta$ の **$\mathbb Q$ 上の共役根**という。有限拡大 $K/\mathbb Q$ と $\eta\in K$ が与えられたとき、$\mathbb Q$ を固定する全ての埋め込み $\sigma:K\to\mathbb C$ による値 $\sigma(\eta)$ を、埋め込みごとに重複を許して並べたものを **$K$ 上で数えた共役値**と呼ぶ。
<!-- formal-statement-end -->

<!-- definition-example-start: def-trn2-conjugates -->
**定義の確認**

$\eta=\sqrt2$ の最小多項式は $T^2-2$ で、相異なる共役根は $\sqrt2,-\sqrt2$ の2個です。$K=\mathbb Q(\sqrt2)$ では埋め込みは $\sqrt2\mapsto\sqrt2$ と $\sqrt2\mapsto-\sqrt2$ の2個なので、値もこの2個です。

これに対し $K=\mathbb Q(\sqrt2,i)$ は $[\mathbb Q(\sqrt2):\mathbb Q]=2$ で、$\mathbb Q(\sqrt2)\subset\mathbb R$ に $i$ を加える次数も2です。[塔の公式](../../FLD/FLD1/index.md#thm-fld1-tower-law)により $[K:\mathbb Q]=4$ です。$\sqrt2$ の像は2通り、$i$ の像も2通りあり、それぞれの符号の組は関係式 $s^2=2,\ t^2=-1$ を保ちます。よって埋め込みは4個、$\sqrt2$ の共役値は

$$
\sqrt2,\quad\sqrt2,\quad-\sqrt2,\quad-\sqrt2
$$

です。相異なる根は2個でも、$K$ 上では各根を2回ずつ数えます。
<!-- definition-example-end -->

[有限分離拡大の埋め込み数](../../FLD/FLD4/index.md#thm-fld4-separable-embedding-count)を $K/\mathbb Q$ に適用すると、$\mathbb Q$ の標数が0で $K$ が有限分離拡大なので、埋め込みはちょうど $[K:\mathbb Q]$ 個です。以降の和や積は、**この全埋め込み**を添字に取ります。

## 2. 乗法を線形写像にして跡・ノルムを定める

$\eta\in K$ を掛ける操作は、$K$ を $\mathbb Q$ 上の有限次元ベクトル空間と見たときの線形写像です。実際、$x,y\in K$ と $a,b\in\mathbb Q$ に対し

$$
\eta(ax+by)=a\eta x+b\eta y
$$

です。この写像を $\mu_\eta:K\to K$、$\mu_\eta(x)=\eta x$ と書きます。基底 $v_1,\ldots,v_n$（$n=[K:\mathbb Q]$）を選べば、各 $j$ に対し

$$
\eta v_j=\sum_{i=1}^n a_{ij}v_i,\qquad a_{ij}\in\mathbb Q
$$

となります。第 $j$ 列が $(a_{1j},\ldots,a_{nj})^{\mathsf T}$ である行列 $A_\eta=(a_{ij})$ が、掛け算を表す行列です。

行列の対角成分の和 $\operatorname{tr}(A)=\sum_i a_{ii}$、行列式は[LA3Cの行列式](../../../基礎科目/LA/LA3C/index.md#thm-la3c-det-multiplicative)で扱った量です。これを乗法写像に適用します。

<a id="def-trn2-field-trace-norm"></a>

<!-- formal-statement-start -->
> **定義（体拡大の跡とノルム）**  
> $K/\mathbb Q$ を次数 $n<\infty$ の体拡大、$\eta\in K$ とする。$\mathbb Q$-線形写像 $\mu_\eta(x)=\eta x$ の任意の $\mathbb Q$-基底での行列を $A_\eta$ とするとき、跡とノルムを

$$
\operatorname{Tr}_{K/\mathbb Q}(\eta)=\operatorname{tr}(A_\eta),
\qquad
N_{K/\mathbb Q}(\eta)=\det(A_\eta)
$$

> と定める。どちらも $\mathbb Q$ の元であり、基底に依存しない。
<!-- formal-statement-end -->

基底を変えると行列は $S^{-1}A_\eta S$ へ移ります。行列式については[行列式の乗法性](../../../基礎科目/LA/LA3C/index.md#thm-la3c-det-multiplicative)から

$$
\det(S^{-1}A_\eta S)
=\det(S)^{-1}\det(A_\eta)\det(S)=\det(A_\eta).
$$

跡についても、成分を展開すると

$$
\operatorname{tr}(BC)=\sum_{i,j}b_{ij}c_{ji}
=\sum_{j,i}c_{ji}b_{ij}=\operatorname{tr}(CB)
$$

なので $\operatorname{tr}(S^{-1}A_\eta S)=\operatorname{tr}(A_\eta SS^{-1})=\operatorname{tr}(A_\eta)$ です。これで定義がどの基底でも同じ数を与えると分かります。

<!-- definition-example-start: def-trn2-field-trace-norm -->
**定義の確認**

二次拡大で行列の意味から計算します。

$K=\mathbb Q(\sqrt2)$、$\eta=a+b\sqrt2$（$a,b\in\mathbb Q$）を取り、$\mathbb Q$-基底 $(1,\sqrt2)$ を使います。

$$
\eta\cdot1=a+b\sqrt2,\qquad
\eta\cdot\sqrt2=2b+a\sqrt2.
$$

第1列は $(a,b)^{\mathsf T}$、第2列は $(2b,a)^{\mathsf T}$ なので

$$
A_\eta=
\begin{pmatrix}a&2b\\b&a\end{pmatrix}.
$$

これより

$$
\operatorname{Tr}_{K/\mathbb Q}(\eta)=2a,
\qquad
N_{K/\mathbb Q}(\eta)=a^2-2b^2.
$$

両者が有理数であること、乗法写像を表す行列から計算していること、基底の変更に依らないことをそれぞれ確認しました。
<!-- definition-example-end -->

**ここでの区別**：行列の跡はどんな有限次元線形写像にも定義できますが、今の記号 $\operatorname{Tr}_{K/\mathbb Q}$ と $N_{K/\mathbb Q}$ は **$K$ 上での乗法写像**から定まる数です。単に $\eta$ を複素数として眺めた「絶対値」ではありません。

## 3. 共役の和・積がなぜ跡・ノルムになるか

これまでの定義は行列からのものです。指数関数の超越性証明では、行列でなく共役値が先に現れます。その二つの計算をつなぐため、まず $\eta$ の最小多項式を使います。

<a id="thm-trn2-conjugate-formula"></a>

<!-- formal-statement-start -->
> **定理（共役による跡・ノルムの公式）**  
> $K/\mathbb Q$ を有限拡大、$\eta\in K$ とし、$m_\eta(T)\in\mathbb Q[T]$ を $\eta$ の $\mathbb Q$ 上のモニック最小多項式とする。$d=\deg m_\eta$、$r=[K:\mathbb Q(\eta)]$ と書く。$m_\eta$ の相異なる複素根を $\eta_1,\ldots,\eta_d$ とすれば、乗法写像の特性多項式は

$$
\det(TI_{[K:\mathbb Q]}-A_\eta)
=m_\eta(T)^r
=\prod_{j=1}^d(T-\eta_j)^r.
$$

> したがって、$\mathbb Q$ を固定する全埋め込み $\sigma:K\to\mathbb C$ に関して

$$
\operatorname{Tr}_{K/\mathbb Q}(\eta)
=\sum_\sigma\sigma(\eta)
=r\sum_{j=1}^d\eta_j,
$$

$$
N_{K/\mathbb Q}(\eta)
=\prod_\sigma\sigma(\eta)
=\left(\prod_{j=1}^d\eta_j\right)^r
$$

> が成り立つ。
<!-- formal-statement-end -->

### 証明の見取り図

$E=\mathbb Q(\eta)$ では $1,\eta,\ldots,\eta^{d-1}$ が基底です。乗法写像の特性多項式は次数 $d$ のモニック多項式で、$\eta$ 自身を根に持つので最小多項式と一致します。$K/E$ の基底を掛け合わせれば、その行列が $r$ 個並びます。最後に埋め込みを制限すると各根がちょうど $r$ 回現れることを確かめます。

<!-- proof-start -->
### 証明

[単純代数拡大の次数](../../FLD/FLD1/index.md#cor-fld1-simple-extension-degree)により $E=\mathbb Q(\eta)$ は次数 $d$、基底は

$$
1,\eta,\ldots,\eta^{d-1}
$$

です。$E$ 上の $\mathbb Q$-線形写像 $\mu_\eta$ の行列を $B\in M_d(\mathbb Q)$ とし、特性多項式を $p(T)=\det(TI_d-B)$ とします。$p$ は次数 $d$ のモニック有理係数多項式です。

[LA4のCayley–Hamilton定理](../../../基礎科目/LA/LA4/index.md#thm-la4-cayley-hamilton)を、$B$ を複素行列と見て適用すると $p(B)=0$ です。これをベクトル空間 $E$ の元 $1$ に作用させれば、$\mu_\eta^j(1)=\eta^j$ なので

$$
0=p(\mu_\eta)(1)=p(\eta).
$$

[最小多項式の除法性](../../FLD/FLD1/index.md#thm-fld1-minimal-polynomial)より $m_\eta\mid p$ です。両者はともにモニックで次数 $d$ なので

$$
p(T)=m_\eta(T).
$$

次に $E$ 上の $K$ の基底 $w_1,\ldots,w_r$ を選びます。[塔の公式](../../FLD/FLD1/index.md#thm-fld1-tower-law)により $[K:\mathbb Q]=rd$、また

$$
w_j,\eta w_j,\ldots,\eta^{d-1}w_j
\quad(1\le j\le r)
$$

を並べると $K$ の $\mathbb Q$-基底になります。$\eta(\eta^kw_j)=(\eta^{k+1})w_j$ は同じ $j$ の組の中の有理係数線形結合になるので、$\mu_\eta$ の行列は $B$ を $r$ 個並べたブロック対角行列です。したがって

$$
\det(TI_{rd}-A_\eta)
=\bigl(\det(TI_d-B)\bigr)^r=m_\eta(T)^r.
$$

最後に埋め込みを数えます。$E$ の $\mathbb Q$-埋め込みは $d$ 個あり、$\eta$ を相異なる根 $\eta_j$ へ送ります。固定した $E$ の埋め込み $\tau:E\to\mathbb C$ を $K$ へ延長する方法は、ちょうど $r=[K:E]$ 個です。実際、$K$ を $E$ 上で有限個の元を一つずつ加えた塔に分けると、各段の最小多項式は標数0ゆえ分離的であり、係数を現在の埋め込みで送った多項式にも次数と同数の相異なる根があります。各根への延長が一つずつ対応するので、[有限分離拡大の埋め込み数の証明](../../FLD/FLD4/index.md#thm-fld4-separable-embedding-count)と同じく延長数は各段の次数の積 $[K:E]=r$ です。

従って $\sigma(\eta)$ の並びでは各 $\eta_j$ が $r$ 回出ます。一方、特性多項式 $\det(TI-A_\eta)$ の $T^{rd-1}$ 係数は $-\operatorname{tr}(A_\eta)$、定数項は $(-1)^{rd}\det(A_\eta)$ です。右辺の $\prod_j(T-\eta_j)^r$ の対応する係数と比べると

$$
\operatorname{tr}(A_\eta)=r\sum_j\eta_j,
\qquad
\det(A_\eta)=\prod_j\eta_j^r
$$

となり、埋め込みに関する和・積の公式を得ます。
<!-- proof-end -->

**例：拡大体を大きくすると値も変わる。** $\eta=\sqrt2$ に対し

$$
\operatorname{Tr}_{\mathbb Q(\sqrt2)/\mathbb Q}(\eta)=0,\qquad
N_{\mathbb Q(\sqrt2)/\mathbb Q}(\eta)=-2.
$$

$K=\mathbb Q(\sqrt2,i)$ では $r=[K:\mathbb Q(\sqrt2)]=2$ なので

$$
\operatorname{Tr}_{K/\mathbb Q}(\eta)=2(\sqrt2-\sqrt2)=0,\qquad
N_{K/\mathbb Q}(\eta)=(-2)^2=4.
$$

したがって「$\eta$ のノルム」と言うときは、**必ず基礎体と作用体を指定**します。

## 4. 代数的整数を普通の整数に落とす

共役が何回出るかが分かりました。次に、各共役の整数性を確かめます。$\eta$ の整数係数モニック関係式 $P(\eta)=0$ は、$\sigma$ が有理数を固定するため、$\sigma(\eta)$ に対してもそのまま成り立ちます。

<a id="lem-trn2-integral-conjugates"></a>

<!-- formal-statement-start -->
> **補題（代数的整数の共役と最小多項式）**  
> $\eta\in\overline{\mathbb Q}$ が代数的整数なら、その全ての $\mathbb Q$ 上の共役根も代数的整数であり、$\eta$ の $\mathbb Q$ 上のモニック最小多項式は $\mathbb Z[T]$ に属する。
<!-- formal-statement-end -->

### 証明の見取り図

共役は同じ整数係数モニック多項式の根です。最小多項式の係数は共役根の基本対称式なので代数的整数でもあり、一方で有理数でもあります。[有理な代数的整数の特徴づけ](../TRN1/index.md#prop-trn1-rational-integers)で通常の整数に落とします。

<!-- proof-start -->
### 証明

$\eta$ が代数的整数なので、ある $P\in\mathbb Z[T]$ がモニックで $P(\eta)=0$ を満たします。任意の共役根 $\eta_j$ は、$E=\mathbb Q(\eta)$ の埋め込み $\tau_j:E\to\mathbb C$ による $\tau_j(\eta)$ として得られます。係数の整数を固定するから

$$
P(\eta_j)=\tau_j(P(\eta))=0.
$$

従って $\eta_j$ も[代数的整数の定義](../TRN1/index.md#def-trn1-algebraic-integer)を満たします。

$\eta$ のモニック最小多項式を

$$
m_\eta(T)=\prod_{j=1}^d(T-\eta_j)
=T^d+c_{d-1}T^{d-1}+\cdots+c_0
$$

と書きます。各 $c_k$ は $\eta_j$ たちの積を有限個足し合わせ、符号を付けた数です。[代数的整数の和・差・積の閉性](../TRN1/index.md#thm-trn1-integral-ring)より各 $c_k$ は代数的整数です。一方 $m_\eta\in\mathbb Q[T]$ だから $c_k\in\mathbb Q$ です。[有理な代数的整数の特徴づけ](../TRN1/index.md#prop-trn1-rational-integers)を $c_k$ に適用すると $c_k\in\mathbb Z$。全係数が整数となります。
<!-- proof-end -->

<a id="thm-trn2-integral-trace-norm"></a>

<!-- formal-statement-start -->
> **定理（代数的整数の跡・ノルムの整数性と非零性）**  
> $K/\mathbb Q$ を有限拡大とし、$\eta\in K$ が代数的整数なら

$$
\operatorname{Tr}_{K/\mathbb Q}(\eta)\in\mathbb Z,\qquad
N_{K/\mathbb Q}(\eta)\in\mathbb Z
$$

> が成り立つ。さらに $\eta\ne0$ なら $N_{K/\mathbb Q}(\eta)\ne0$ であり、

$$
|N_{K/\mathbb Q}(\eta)|\ge1
$$

> である。
<!-- formal-statement-end -->

### 証明の見取り図

前補題で最小多項式の係数は整数です。その $r$ 乗が乗法行列の特性多項式だから、跡とノルムは整数です。非零性には、$\eta\ne0$ なら $\eta^{-1}\in K$ が存在することを使い、乗法写像が可逆だと確かめます。

<!-- proof-start -->
### 証明

[共役による跡・ノルムの公式](#thm-trn2-conjugate-formula)から

$$
\det(TI_{[K:\mathbb Q]}-A_\eta)=m_\eta(T)^r,\qquad
r=[K:\mathbb Q(\eta)].
$$

前補題で $m_\eta(T)\in\mathbb Z[T]$ を示したので、その $r$ 乗の係数も整数です。$T^{[K:\mathbb Q]-1}$ の係数が $-\operatorname{Tr}_{K/\mathbb Q}(\eta)$、定数項が $(-1)^{[K:\mathbb Q]}N_{K/\mathbb Q}(\eta)$ だから、どちらも整数です。

$\eta\ne0$ なら $K$ が体なので $\eta^{-1}\in K$ があり、$\mu_{\eta^{-1}}\mu_\eta=\mathrm{id}_K$ です。従って $\mu_\eta$ は可逆、[行列式と可逆性の同値](../../../基礎科目/LA/LA3C/index.md#thm-la3c-det-invertible)から $\det(A_\eta)\ne0$ です。零でない通常の整数の絶対値は1以上ですから結論を得ます。
<!-- proof-end -->

これが超越性の議論で必要な「算術的な下界」です。ただし **$\eta$ 自身が小さくならないと言ったわけではありません**。他の共役を掛けたノルムが非零整数になる、という主張です。

<a id="cor-trn2-conjugate-lower-bound"></a>

<!-- formal-statement-start -->
> **系（共役の上界から得られる下界）**  
> 非零の代数的整数 $\eta$ の $\mathbb Q$ 上の共役根を $\eta=\eta_1,\eta_2,\ldots,\eta_d$ とし、ある $B\ge1$ に対して $|\eta_j|\le B$（$2\le j\le d$）が成り立つとする。このとき

$$
|\eta|\ge B^{-(d-1)}.
$$
<!-- formal-statement-end -->

[ノルムの整数性と非零性](#thm-trn2-integral-trace-norm)を $K=\mathbb Q(\eta)$ に適用します。$r=1$ だから

$$
1\le\left|N_{\mathbb Q(\eta)/\mathbb Q}(\eta)\right|
=|\eta|\prod_{j=2}^d|\eta_j|
\le|\eta|B^{d-1}.
$$

$B^{d-1}>0$ で割れば系の結論です。$d=1$ のとき積は空積の1となり、通常の非零整数に対する $|\eta|\ge1$ と一致します。

## 5. 代数的数の分母をまとめて払う

ここまでは $\eta$ が代数的整数である場合でした。指数関数を含む代数関係には一般の代数的係数も出てきます。必要なのは、有限個の係数を**同時に代数的整数へ変換する**ことです。

<a id="lem-trn2-denominator-clearing"></a>

<!-- formal-statement-start -->
> **補題（有限個の代数的数の共通分母消去）**  
> $\beta_1,\ldots,\beta_s\in\overline{\mathbb Q}$（$s\ge1$）に対し、ある正整数 $D$ が存在して、全ての $j$ について $D\beta_j$ が代数的整数になる。一般には $D\beta_j\in\mathbb Z$ までは結論できない。
<!-- formal-statement-end -->

### 証明の見取り図

各 $\beta_j$ の有理係数の関係式を整数係数にします。最高次係数を $a_j>0$ としたとき、**$a_j\beta_j$** がモニック整数係数多項式を満たすことを直接計算します。最後に $D$ を $a_j$ の共通倍数に取ります。

<!-- proof-start -->
### 証明

$\beta_j$ は代数的なので、非零整数係数多項式で消えます。最高次係数の符号を調整して

$$
a_j\beta_j^{d_j}+b_{j,d_j-1}\beta_j^{d_j-1}
+\cdots+b_{j,0}=0
$$

と書き、$a_j\in\mathbb Z_{>0}$、$b_{j,k}\in\mathbb Z$、$d_j\ge1$ とします。$\theta_j=a_j\beta_j$ と置き、上式に $a_j^{d_j-1}$ を掛けると

$$
\theta_j^{d_j}
+b_{j,d_j-1}\theta_j^{d_j-1}
+b_{j,d_j-2}a_j\theta_j^{d_j-2}
+\cdots+b_{j,0}a_j^{d_j-1}=0.
$$

これは $\theta_j$ を根とする整数係数モニック多項式です。従って $\theta_j$ は[代数的整数](../TRN1/index.md#def-trn1-algebraic-integer)です。

$$
D=\prod_{j=1}^s a_j
$$

とすれば $D/a_j\in\mathbb Z$ なので、$D\beta_j=(D/a_j)\theta_j$ は[代数的整数の積の閉性](../TRN1/index.md#thm-trn1-integral-ring)から代数的整数です。これは共通の **正整数** $D$ で、入力した全ての $\beta_j$ に使えます。
<!-- proof-end -->

**直接例：分母が消えても有理整数とは限らない。** $\beta=(1+\sqrt5)/4$ は

$$
4\beta^2-2\beta-1=0
$$

を満たします。$\theta=4\beta=1+\sqrt5$ には

$$
\theta^2-2\theta-4=0
$$

が成り立ち代数的整数です。さらに $2\beta=(1+\sqrt5)/2$ も $T^2-T-1$ の根であり代数的整数です。しかし $2\beta$ は無理数なので、通常の整数ではありません。消去したのは **代数的整数性のための分母** であり、複素数が $\mathbb Z$ に変わったわけではありません。

## 6. 非正規拡大での注意と Galois 拡大での共役積

$K=\mathbb Q(\sqrt[3]{2})$ を $\mathbb R$ の部分体として取ります。$t=\sqrt[3]{2}$ の最小多項式は $T^3-2$ です。$\omega=(-1+i\sqrt3)/2$ とすれば三根は $t,\omega t,\omega^2t$。$K/\mathbb Q$ は次数3で分離的ですが正規ではありません。実数体 $K$ の $\mathbb Q$-自己同型は $t$ を実根 $t$ にしか送れないため恒等写像だけです。それでも $K\to\mathbb C$ の埋め込みは3個あります。従って

$$
\operatorname{Tr}_{K/\mathbb Q}(t)=t+\omega t+\omega^2t=0,
$$

$$
N_{K/\mathbb Q}(t)=t(\omega t)(\omega^2t)=t^3\omega^3=2.
$$

**自己同型を1個しか数えないのは誤り**です。[有限Galois拡大の定義](../../FLD/FLD4/index.md#def-fld4-finite-galois)にある正規性が欠け、埋め込みの像が $K$ の外へ出るからです。

一方、$L/\mathbb Q$ が有限 Galois 拡大なら、[Galois群の位数と拡大次数](../../FLD/FLD4/index.md#cor-fld4-galois-order-degree)によって全埋め込みが $L$ の自己同型になります。よって

$$
\operatorname{Tr}_{L/\mathbb Q}(\eta)
=\sum_{\sigma\in\operatorname{Gal}(L/\mathbb Q)}\sigma(\eta),
\qquad
N_{L/\mathbb Q}(\eta)
=\prod_{\sigma\in\operatorname{Gal}(L/\mathbb Q)}\sigma(\eta).
$$

各 $\sigma$ は整数係数多項式の関係を保つので、代数的整数の積は代数的整数です。しかも Galois 群の元 $\tau$ で積の各因子は置換されます。この「共役全体で不変」という構造は、後の対称化で役に立ちます。ただし $\sigma$ を勝手に $e^\eta$ へ作用させて $e^{\sigma(\eta)}$ と等置してよいわけではありません。**ここで群が作用するのは代数的な元**です。

## 7. 演習：整数性に落ちるまでを再現する

### Level A：定義と単一操作

**TRN2-A1（行列から跡とノルム）**  
$K=\mathbb Q(\sqrt3)$、$\eta=2+\sqrt3$ とする。基底 $(1,\sqrt3)$ に関して $\mu_\eta$ の行列を作り、跡とノルムを求めてください。

- Level: A

<!-- solution-start -->
**詳細解答**

$$
\eta\cdot1=2+\sqrt3,\qquad
\eta\cdot\sqrt3=3+2\sqrt3.
$$

列を順に並べると

$$
A_\eta=\begin{pmatrix}2&3\\1&2\end{pmatrix}.
$$

[体拡大の跡とノルム](#def-trn2-field-trace-norm)から

$$
\operatorname{Tr}_{K/\mathbb Q}(\eta)=2+2=4,\qquad
N_{K/\mathbb Q}(\eta)=2\cdot2-3\cdot1=1.
$$

どちらも有理数で、実際には整数です。$\eta$ が $T^2-4T+1$ の根なので[整数性定理](#thm-trn2-integral-trace-norm)とも一致します。
<!-- solution-end -->

**TRN2-A2（共役根の個数）**  
$\eta=\sqrt5$ の $\mathbb Q$ 上の共役根を列挙してください。さらに $K=\mathbb Q(\sqrt5,i)$ 上で数える共役値を、重複を含めて列挙してください。

- Level: A

<!-- solution-start -->
**詳細解答**

$\eta$ の最小多項式は $T^2-5$ で、相異なる共役根は $\sqrt5,-\sqrt5$ です。$\mathbb Q(\sqrt5)\subset\mathbb R$ に $i$ を加える次数が2なので、塔の公式から $[K:\mathbb Q]=4$。埋め込みは $\sqrt5$ の像の符号2通りと $i$ の像の符号2通りで決まり、全4通りです。従って $\sqrt5,\sqrt5,-\sqrt5,-\sqrt5$ と重複を含めて数えます。[共役の定義](#def-trn2-conjugates)では「異なる共役根」と「埋め込みを添字とする値」を区別します。
<!-- solution-end -->

**TRN2-A3（代数的整数の共役）**  
$\varphi=(1+\sqrt5)/2$ の $\mathbb Q$ 上の共役、最小多項式、$\mathbb Q(\sqrt5)/\mathbb Q$ の跡とノルムを求めてください。

- Level: A

<!-- solution-start -->
**詳細解答**

[TRN1の例](../TRN1/index.md#def-trn1-algebraic-integer)から $\varphi^2-\varphi-1=0$ です。$\varphi\notin\mathbb Q$ なので最小多項式は $T^2-T-1$。もう一つの根は $\varphi'=(1-\sqrt5)/2$ です。

$$
\varphi+\varphi'=\frac{1+\sqrt5+1-\sqrt5}{2}=1,
$$

$$
\varphi\varphi'=\frac{1-5}{4}=-1.
$$

$\mathbb Q(\varphi)=\mathbb Q(\sqrt5)$ なので[共役公式](#thm-trn2-conjugate-formula)で $r=1$。跡は1、ノルムは $-1$ です。両共役が代数的整数であり、結果が通常の整数になることも確認できます。
<!-- solution-end -->

**TRN2-A4（単一の分母消去）**  
$\beta=\sqrt2/3$ が $9T^2-2$ の根であることを示し、正整数 $D$ を一つ選んで $D\beta$ が代数的整数になることを具体的なモニック多項式で確かめてください。

- Level: A

<!-- solution-start -->
**詳細解答**

$\beta^2=2/9$ なので $9\beta^2-2=0$。$D=3$ を取れば $D\beta=\sqrt2$ となり、

$$
(D\beta)^2-2=0
$$

です。従って $D\beta$ は整数係数モニック $T^2-2$ の根です。一般の[分母消去補題](#lem-trn2-denominator-clearing)に従って $D=9$ としても、$9\beta=3\sqrt2$ が $T^2-18$ の根なので正しいです。いずれも無理数で、通常の整数ではありません。
<!-- solution-end -->

### Level B：複数の条件を組み合わせる

**TRN2-B1（作用体による重複）**  
$\eta=\sqrt2$ に対し、$E=\mathbb Q(\sqrt2)$ と $K=\mathbb Q(\sqrt2,i)$ での跡とノルムを両方計算し、差が生まれる理由を $[K:E]$ から説明してください。

- Level: B

<!-- solution-start -->
**詳細解答**

$E$ 上では最小多項式が $T^2-2$ なので共役は $\sqrt2,-\sqrt2$ です。従って

$$
\operatorname{Tr}_{E/\mathbb Q}(\eta)=0,\qquad
N_{E/\mathbb Q}(\eta)=-2.
$$

$E$ は実数の部分体なので $i\notin E$。$i^2+1=0$ より $[K:E]=2$ です。[共役による特性多項式の公式](#thm-trn2-conjugate-formula)で $r=2$ だから

$$
\det(TI_4-A_\eta)=(T^2-2)^2
=T^4-4T^2+4.
$$

$T^3$ の係数は0、定数項は4なので、跡0、ノルム4です。$K$ では各共役が2回現れるため、積が $(-2)^2$ になります。
<!-- solution-end -->

**TRN2-B2（非正規拡大と非零整数）**  
$K=\mathbb Q(t)$、$t=\sqrt[3]{2}>0$ とする。$\mathbb Q$ を固定する $K\to\mathbb C$ の埋め込みを列挙し、$t$ の跡・ノルムを求めてください。自己同型 $K\to K$ だけで計算できない理由も示してください。

- Level: B

<!-- solution-start -->
**詳細解答**

$T^3-2$ は有理根を持たないので次数3で既約です。$t$ の像はこの最小多項式の三根 $t,\omega t,\omega^2t$ のいずれかであり、[一段の埋め込み延長](../../FLD/FLD2/index.md#lem-fld2-one-step-field-map)により3つの埋め込みが存在します。$\omega^3=1$、$1+\omega+\omega^2=0$ から

$$
\operatorname{Tr}_{K/\mathbb Q}(t)=t(1+\omega+\omega^2)=0,
$$

$$
N_{K/\mathbb Q}(t)=t^3\omega^{1+2}
=2\omega^3=2.
$$

$K\subset\mathbb R$ に対する自己同型では $t$ を実根にしか送れず、恒等写像1つだけです。残る2つの埋め込みは像が $K$ の外へ出ます。失われているのは正規性であり、全埋め込みの代わりに自己同型だけを数える方法は[定理の仮定](#thm-trn2-conjugate-formula)を満たす和・積になりません。
<!-- solution-end -->

**TRN2-B3（有限個の共通分母と積）**  
$\beta_1=1/2$、$\beta_2=\sqrt2/3$、$\beta_3=(1+\sqrt5)/4$ に対して、共通の正整数 $D$ を具体的に選び、全ての $D\beta_j$ が代数的整数となる根拠を示してください。それらの積も代数的整数であることを示してください。

- Level: B

<!-- solution-start -->
**詳細解答**

$D=12$ を取ると

$$
D\beta_1=6,\qquad
D\beta_2=4\sqrt2,\qquad
D\beta_3=3(1+\sqrt5).
$$

$6$ は $T-6$、$4\sqrt2$ は $T^2-32$、$1+\sqrt5$ は $T^2-2T-4$ の根です。これらは全て整数係数モニックなので代数的整数です。さらに $3(1+\sqrt5)$ は整数3と代数的整数 $1+\sqrt5$ の積ですから、[TRN1の積の閉性](../TRN1/index.md#thm-trn1-integral-ring)により代数的整数です。

従って3個全部が代数的整数であり、その積 $6\cdot4\sqrt2\cdot3(1+\sqrt5)$ も同じ閉性で代数的整数です。[分母消去補題](#lem-trn2-denominator-clearing)は存在を保証しますが、この例では $D=12$ を直接検証できました。
<!-- solution-end -->

### Level C：算術下界まで統合する

**TRN2-C1（共役の上界と有理数でない小さい整数）**  
$\eta=2-\sqrt3$ とする。(i) $\eta$ が零でない代数的整数であることを示す。(ii) $\eta$ の共役と $\mathbb Q(\sqrt3)/\mathbb Q$ のノルムを計算する。(iii) $|\eta|<1$ であっても $|N(\eta)|\ge1$ となる仕組みを説明する。(iv) 一般の非零代数的整数 $\alpha$ の相異なる共役 $\alpha_1=\alpha,\ldots,\alpha_d$ が $|\alpha_j|\le B$（$j\ge2$、$B\ge1$）を満たすときの $|\alpha|$ の下界を導いてください。

- Level: C

<!-- solution-start -->
**詳細解答**

$\eta=2-\sqrt3$ は

$$
(\eta-2)^2=3
\quad\Longrightarrow\quad
\eta^2-4\eta+1=0
$$

を満たし、$T^2-4T+1$ は整数係数モニックです。$\sqrt3<2$ なので $\eta>0$、したがって非零の代数的整数です。

最小多項式の二根は $2-\sqrt3$ と $2+\sqrt3$。基底 $(1,\sqrt3)$ で乗法行列を作れば

$$
A_\eta=\begin{pmatrix}2&-3\\-1&2\end{pmatrix}.
$$

この行列の行列式、または共役の積から

$$
N_{\mathbb Q(\sqrt3)/\mathbb Q}(\eta)
=(2-\sqrt3)(2+\sqrt3)
=4-3=1.
$$

$1<\sqrt3<2$ なので $0<2-\sqrt3<1$。しかし他方の共役 $2+\sqrt3$ が1より大きく、その積が通常の整数1です。すなわち整数性を持つのは個々の絶対値でなく共役全体の積です。

一般の場合も、[共役のノルム公式](#thm-trn2-conjugate-formula)を $K=\mathbb Q(\alpha)$ で使い、[非零整数性](#thm-trn2-integral-trace-norm)から

$$
1\le|N_{K/\mathbb Q}(\alpha)|
=|\alpha|\prod_{j=2}^d|\alpha_j|
\le|\alpha|B^{d-1}.
$$

$B>0$ で割ると

$$
|\alpha|\ge B^{-(d-1)}.
$$

これは[共役上界からの下界](#cor-trn2-conjugate-lower-bound)を例から一般形へ再構成したものです。$\eta$ の場合は $d=2$、$B=2+\sqrt3$ を選べば $|\eta|\ge(2+\sqrt3)^{-1}$ で、等号が成り立ちます。
<!-- solution-end -->

## 8. 次章で何を比較するか

本章で得たのは、代数的整数 $\eta\ne0$ から非零の通常の整数 $N(\eta)$ を作り、絶対値の下界1を得る道具です。また、一般の代数的係数は共通の正整数を掛ければ代数的整数へ移せます。

次のTRN3では、[NDA6のLiouvilleの近似下界](../../NDA/NDA6/index.md#thm-nda6-liouville-bound)と、指数関数に対するHermiteの補助式の方法を比較します。二つの方法で何を整数化し、どの量を小さくするのかを区別して進みます。
