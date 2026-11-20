# ANF2 跡・ノルム・判別式

[ANF1](../ANF1/index.md) では、数体の整数環が有限個の整数基底を持つことを示しました。証明に用いた[跡形式](../ANF1/index.md#def-anf1-trace-pairing)は、元を掛ける線形写像の行列から定まりました。しかし整数基底を変えると行列も変わります。体そのものに固有の数値を、そこからどう取り出せるのでしょうか。

本講では、まず体の元の**トレース**と**ノルム**を複素数への埋め込みから計算します。次に跡形式の行列式を**判別式**と呼び、基底の取り換えでどのように変わるかを証明します。この二つを合わせると、「整な元を並べた基底候補が、整数環全体の基底か」という問いを数値で検査できます。

以下、$K/\mathbb Q$ は次数 $n\ge1$ の数体、$\mathcal O_K$ は[整数環](../ANF1/index.md#def-anf1-ring-of-integers)です。$\mathbb C$ の中に $K$ を一つ埋め込んで考えます（任意の数体は、その元を順に代数方程式の複素根へ送ることで埋め込めます）。[体の埋め込み](../../FLD/FLD2/index.md#def-fld2-f-map)とは、$1$ と和・積を保つ単射であり、ここでは $\mathbb Q$ の各元を固定します。

<!-- definition-example-audit: strict -->

## 1. 跡とノルムを共役根から計算する

たとえば $K=\mathbb Q(\sqrt2)$ で $x=3+2\sqrt2$ とすると、基底 $(1,\sqrt2)$ に関する乗法写像 $\mu_x:y\mapsto xy$ は

$$
[\mu_x]=\begin{pmatrix}3&4\\2&3\end{pmatrix}.
$$

この行列の対角和は $6$、行列式は $1$ です。二つの数は、それぞれ $(3+2\sqrt2)+(3-2\sqrt2)$ と $(3+2\sqrt2)(3-2\sqrt2)$ に一致します。なぜ「共役を足す・掛ける」だけで行列の値が出るのかを確かめます。

[ANF1 の跡の定義](../ANF1/index.md#def-anf1-trace-pairing)では行列の対角和を使いました。これに並んで、乗法行列の行列式をノルムと定めます。

<a id="def-anf2-field-norm"></a>

<!-- formal-statement-start -->
> **定義（数体のノルム）**  
> 数体 $K/\mathbb Q$、$x\in K$ に対し、$\mathbb Q$ 線形写像 $\mu_x:K\to K,\ y\mapsto xy$ の行列式を

$$
N_{K/\mathbb Q}(x)=\det_{\mathbb Q}(\mu_x)
$$

> と定義し、$x$ の**ノルム**という。行列式は基底変更による相似変換で変わらないため、これは基底に依存しない。
<!-- formal-statement-end -->

<!-- definition-example-start: def-anf2-field-norm -->
**定義の確認**：$x=3+2\sqrt2$ の上記行列は、$x\cdot1=3+2\sqrt2$ と $x\cdot\sqrt2=4+3\sqrt2$ の係数を列に並べたものです。従って $N_{K/\mathbb Q}(x)=3\cdot3-4\cdot2=1$。線形写像と基底を先に定めたので、ここでの行列式はノルムの定義を直接計算しています。
<!-- definition-example-end -->

いま $\mathbb Q$ を固定する $K$ から $\mathbb C$ への相異なる体の埋め込みを $\sigma_1,\ldots,\sigma_n$ と記します。次数が $n$ なら、このような埋め込みがちょうど $n$ 個あることも次の証明で確認します。重要なのは、同じ元をこれらの埋め込みへ通すと、その全ての共役値が現れることです。

<a id="thm-anf2-embedding-formulas"></a>

<!-- formal-statement-start -->
> **定理（埋め込みによる跡・ノルムの公式）**  
> $K/\mathbb Q$ を次数 $n$ の数体とする。$\mathbb Q$ を固定する相異なる埋め込み $\sigma_1,\ldots,\sigma_n:K\hookrightarrow\mathbb C$ がちょうど $n$ 個存在し、任意の $x\in K$ に対して

$$
\operatorname{Tr}_{K/\mathbb Q}(x)=\sum_{i=1}^n\sigma_i(x),
\qquad
N_{K/\mathbb Q}(x)=\prod_{i=1}^n\sigma_i(x)
$$

> が成り立つ。とくに $d=[\mathbb Q(x):\mathbb Q]$、$r=n/d$ とし、$x$ のモニック最小多項式を

$$
m_x(T)=T^d+c_{d-1}T^{d-1}+\cdots+c_0
$$

> と書けば、乗法写像 $\mu_x$ の特性多項式は $m_x(T)^r$ であり、

$$
\operatorname{Tr}_{K/\mathbb Q}(x)=-r c_{d-1},
\qquad
N_{K/\mathbb Q}(x)=\bigl((-1)^d c_0\bigr)^r
$$

> となる。
<!-- formal-statement-end -->

**証明の見取り図。** $x$ が $K$ 全体を生成する必要はありません。まず $K$ を $\mathbb Q(x)$ 上の $r$ 次元空間と見て、掛け算の行列を $r$ 個のブロックへ分けます。一方、$x$ の共役根は $\mathbb Q(x)$ の埋め込みで現れ、それぞれが $K$ の埋め込みへ $r$ 通りに延長されます。この二つの数え方が一致します。

<!-- proof-start -->
### 証明

**(1) 埋め込みの個数。** 数体の有限拡大では、任意の元の最小多項式が標数 $0$ のため重根を持ちません（[標数0での分離性](../../FLD/FLD2/index.md#cor-fld2-char-zero-algebraic)）。有限拡大 $E/F$ を $E=F(a_1,\ldots,a_s)$ と書き、$F$ の $\mathbb C$ への埋め込みを一つ固定します。$a_1$ の像はその最小多項式を係数ごと写した式の相異なる根の一つであり、[単純拡大の写像延長](../../FLD/FLD2/index.md#lem-fld2-one-step-field-map)により各根の選択が一つの埋め込みを定めます。$a_2,\ldots,a_s$ についても、その時点の中間体上で同じ操作をします。

各段階の延長数はその段階の拡大次数です。[次数の塔の公式](../../FLD/FLD1/index.md#thm-fld1-tower-law)でそれらの積が $[E:F]$ となるため、一つの $F$ の埋め込みに対する $E$ の埋め込みはちょうど $[E:F]$ 通りです。$F=\mathbb Q,E=K$ とすれば $n$ 個の存在が従い、$F=\mathbb Q(x),E=K$ とすれば $\mathbb Q(x)$ の各埋め込みがちょうど $r$ 個へ延長します。

**(2) 乗法行列。** $\mathbb Q(x)$ の $\mathbb Q$ 基底 $(1,x,\ldots,x^{d-1})$ で $\mu_x$ は最後の列が $(-c_0,\ldots,-c_{d-1})^{\mathsf T}$ のコンパニオン行列 $C$ です。したがって

$$
\det(TI_d-C)=m_x(T),\quad
\operatorname{tr}(C)=-c_{d-1},\quad
\det(C)=(-1)^d c_0.
$$

$K$ の $\mathbb Q(x)$ 基底 $u_1,\ldots,u_r$ を取り、$(u_jx^k)_{1\le j\le r,\,0\le k<d}$ を $\mathbb Q$ 基底にすると、$\mu_x$ は対角ブロックに $C$ を $r$ 個並べた行列となります。ゆえに特性多項式は $m_x(T)^r$、跡と行列式はそれぞれ $-r c_{d-1}$ と $((-1)^d c_0)^r$ です。

**(3) 共役根との一致。** $m_x$ は重根を持たず、複素根を $\alpha_1,\ldots,\alpha_d$ とすれば

$$
m_x(T)=\prod_{j=1}^d(T-\alpha_j),
\quad
\sum_{j=1}^d\alpha_j=-c_{d-1},
\quad
\prod_{j=1}^d\alpha_j=(-1)^dc_0.
$$

$\mathbb Q(x)$ の埋め込みは $x\mapsto\alpha_j$ の $d$ 通りです。(1) により各写像が $K$ へ $r$ 通りに延長するため、$\sigma_i(x)$ の列には各 $\alpha_j$ がちょうど $r$ 回現れます。その和・積は (2) で求めた跡・ノルムに一致します。
<!-- proof-end -->

定理の $r$ は忘れやすい係数です。$K=\mathbb Q(\sqrt2,\sqrt3)$ は次数 $4$ ですが、$x=\sqrt2$ の最小多項式は二次です。二つの共役値 $\pm\sqrt2$ が各二回現れるので、ノルムは $(-2)^2=4$ となります。**最小多項式の定数項だけを一度掛ける**と誤る例です。

<a id="prop-anf2-trace-norm-properties"></a>

<!-- formal-statement-start -->
> **命題（跡・ノルムの演算則と整性）**  
> 次数 $n$ の数体 $K/\mathbb Q$ に対し、$x,y\in K$、$q\in\mathbb Q$ とする。
>
> 1. 跡は $\mathbb Q$ 線形、ノルムは乗法的である。
> 2. $\operatorname{Tr}_{K/\mathbb Q}(q)=nq$、$N_{K/\mathbb Q}(q)=q^n$。
> 3. $x\in\mathcal O_K$ なら跡とノルムはいずれも整数である。
<!-- formal-statement-end -->

**証明の見取り図。** 和には乗法写像の和、積には写像の合成を使います。整性には、整数係数の最小多項式を使います。

<!-- proof-start -->
### 証明

$\mu_{x+y}=\mu_x+\mu_y$ および $\mu_{qx}=q\mu_x$ なので行列の対角和から跡の線形性が従います。$\mu_{xy}=\mu_x\circ\mu_y$ なので、行列式は $\det(AB)=\det(A)\det(B)$ を満たすので $N(xy)=N(x)N(y)$ です。$\mu_q=qI_n$ だから跡は $nq$、ノルムは $q^n$ です。

$x\in\mathcal O_K$ なら[ANF1 の最小多項式による整性判定](../ANF1/index.md#thm-anf1-minimal-polynomial)から $m_x(T)\in\mathbb Z[T]$ です。前定理の係数公式

$$
\operatorname{Tr}(x)=-r c_{d-1},\qquad
N(x)=((-1)^dc_0)^r
$$

はともに整数です。跡については [ANF1 の整数値性](../ANF1/index.md#lem-anf1-integral-trace) とも一致します。
<!-- proof-end -->

### ノルムの絶対値1が単元を特徴付ける

[整数環の閉性](../ANF1/index.md#thm-anf1-ring-closure)によって $\mathcal O_K$ は環です。ここで扱う[単元](../../RNG/RNG3/index.md#def-rng3-divisibility-unit-associate)は、$x$ とその逆数 $x^{-1}$ がともに整数環に属する場合の $x$ です。ノルムはこの条件を数値へ置き換えます。

<a id="prop-anf2-unit-norm"></a>

<!-- formal-statement-start -->
> **命題（単元のノルム判定）**  
> 数体 $K$ の代数的整数 $x\in\mathcal O_K$ について、$x$ が $\mathcal O_K$ の単元であるための必要十分条件は

$$
N_{K/\mathbb Q}(x)\in\{1,-1\}
$$

> である。
<!-- formal-statement-end -->

**証明の見取り図。** 単元ならノルムの積が $1$ です。逆向きでは、最小多項式の定数項が $\pm1$ となるため、その方程式から $x^{-1}$ を整数係数の多項式として表せます。

<!-- proof-start -->
### 証明

$x$ が単元なら $x^{-1}\in\mathcal O_K$ なので、前命題から $N(x),N(x^{-1})$ は整数です。乗法性により $N(x)N(x^{-1})=N(1)=1$。従って $N(x)=\pm1$ です。

逆に $N(x)=\pm1$ とします。$x$ の次数 $d$ のモニック最小多項式を

$$
m_x(T)=T^d+c_{d-1}T^{d-1}+\cdots+c_1T+c_0,\qquad c_j\in\mathbb Z
$$

と書きます。前定理で $N(x)=((-1)^dc_0)^r=\pm1$ なので、整数 $c_0$ は $\pm1$ です。$m_x(x)=0$ を移項すると

$$
x\bigl(x^{d-1}+c_{d-1}x^{d-2}+\cdots+c_1\bigr)=-c_0.
$$

よって $x\ne0$ で

$$
x^{-1}=-c_0^{-1}\bigl(x^{d-1}+c_{d-1}x^{d-2}+\cdots+c_1\bigr).
$$

右辺は $x$ の整数係数多項式だから、整数環の閉性により $\mathcal O_K$ に属します。
<!-- proof-end -->

**例**：$K=\mathbb Q(\sqrt3)$ の $x=2+\sqrt3$ は、二つの埋め込みで $2+\sqrt3$ と $2-\sqrt3$ に移ります。従って $N(x)=4-3=1$。実際、$x^{-1}=2-\sqrt3$ も整です。この判定は ANF7 の単数定理へつながります。

## 2. 跡形式の行列式を比較する

跡・ノルムは一つの元に付く値でした。今度は $K$ の**基底全体**を測ります。$n$ 個の基底元 $\beta_1,\ldots,\beta_n$ に対し、積 $\beta_i\beta_j$ の跡を表へ並べ、その行列式を取ります。[ANF1 の跡形式の非退化性](../ANF1/index.md#lem-anf1-integral-trace)がこの行列式の非零性を保証します。

<a id="def-anf2-basis-discriminant"></a>

<!-- formal-statement-start -->
> **定義（基底の判別式）**  
> 数体 $K/\mathbb Q$ の $\mathbb Q$ 基底 $\beta=(\beta_1,\ldots,\beta_n)$ に対し、

$$
G_\beta=\bigl(\operatorname{Tr}_{K/\mathbb Q}(\beta_i\beta_j)\bigr)_{1\le i,j\le n},
\qquad
\operatorname{disc}(\beta)=\det(G_\beta)
$$

> をそれぞれ**跡行列**、**基底の判別式**という。
<!-- formal-statement-end -->

定義だけでは複雑に見えますが、各列の係数を追う必要はありません。二次体 $K=\mathbb Q(\sqrt2)$ の基底 $(1,\sqrt2)$ を使えば

$$
\operatorname{Tr}(1)=2,\quad
\operatorname{Tr}(\sqrt2)=0,\quad
\operatorname{Tr}((\sqrt2)^2)=\operatorname{Tr}(2)=4
$$

なので、二行二列の行列を作るだけです。

<!-- definition-example-start: def-anf2-basis-discriminant -->
**定義の確認**：$\beta=(1,\sqrt2)$ は $\mathbb Q$ 基底であり、上の三つの値から

$$
G_\beta=\begin{pmatrix}2&0\\0&4\end{pmatrix},\qquad
\operatorname{disc}(\beta)=8.
$$

同じ体で $\beta'=(1,3\sqrt2)$ に替えると $G_{\beta'}=\operatorname{diag}(2,36)$、判別式は $72$ です。つまり、**基底の判別式は基底次第で変わる**値です。
<!-- definition-example-end -->

<a id="thm-anf2-basis-change"></a>

<!-- formal-statement-start -->
> **定理（判別式の基底変換則）**  
> $K/\mathbb Q$ を次数 $n$ の数体、$\beta=(\beta_1,\ldots,\beta_n)$ を $\mathbb Q$ 基底とする。$A=(a_{ij})\in\operatorname{GL}_n(\mathbb Q)$ とし、別の基底を

$$
\beta'_j=\sum_{i=1}^n\beta_i a_{ij}
$$

> で定める。このとき

$$
G_{\beta'}=A^{\mathsf T}G_\beta A,\qquad
\operatorname{disc}(\beta')=(\det A)^2\operatorname{disc}(\beta).
$$

> さらに $\operatorname{disc}(\beta)\ne0$ である。
<!-- formal-statement-end -->

**証明の見取り図。** 二つの変数を持つ跡形式の各変数で基底を一度ずつ取り換えると、行列の左右から $A$ が現れます。非零性は跡形式の非退化性によります。

<!-- proof-start -->
### 証明

跡の線形性で和を分け、積を展開して、$j,k$ 成分を直接展開すると

$$
\begin{aligned}
(G_{\beta'})_{jk}
&=\operatorname{Tr}(\beta'_j\beta'_k)\\
&=\operatorname{Tr}\left(\sum_{i,\ell}\beta_i\beta_\ell a_{ij}a_{\ell k}\right)\\
&=\sum_{i,\ell}a_{ij}\operatorname{Tr}(\beta_i\beta_\ell)a_{\ell k}\\
&=(A^{\mathsf T}G_\beta A)_{jk}.
\end{aligned}
$$

両辺の行列式を取り $\det(A^{\mathsf T})=\det A$ を使えば変換則が出ます。[ANF1 の跡形式の非退化性](../ANF1/index.md#lem-anf1-integral-trace)より、$G_\beta v=0$ なら $v=0$ です。したがって $G_\beta$ は可逆で、$\det G_\beta\ne0$ です。
<!-- proof-end -->

ここで $A=\operatorname{diag}(1,3)$ を入れると $(\det A)^2=9$、先ほどの $72=9\cdot8$ が説明できました。基底を取り換える行列の行列式は、**向きを含む一次の倍率**ですが、判別式では左右の二回の変換が起こるので二乗になります。

### 複素埋め込みで判別式を見る

$V=(\sigma_i(\beta_j))_{1\le i,j\le n}$ と置くと、[埋め込みによる跡・ノルムの公式](#thm-anf2-embedding-formulas)から

$$
(G_\beta)_{jk}=\sum_i\sigma_i(\beta_j)\sigma_i(\beta_k)
=(V^{\mathsf T}V)_{jk}.
$$

従って

$$
\operatorname{disc}(\beta)=\det(V)^2.
$$

ここは $V^{\mathsf T}V$ であって $V^*V$ ではありません。複素共役を取らないため、判別式は負になることもあります。実埋め込みの数を $r_1$、共役を組にした非実埋め込みの組数を $r_2$ とすれば $n=r_1+2r_2$ です。

<a id="prop-anf2-discriminant-sign"></a>

<!-- formal-statement-start -->
> **命題（判別式の符号）**  
> 数体 $K/\mathbb Q$ の非実複素埋め込みの共役対の個数を $r_2$ とする。任意の $\mathbb Q$ 基底 $\beta$ に対して

$$
(-1)^{r_2}\operatorname{disc}(\beta)>0
$$

> が成り立つ。
<!-- formal-statement-end -->

**証明の見取り図。** 埋め込み行列 $V$ を複素共役すると、非実埋め込みの二行が各組で交換されます。行交換一回につき行列式の符号が反転します。

<!-- proof-start -->
### 証明

$V$ の各成分を複素共役した $\overline V$ は、$V$ の実埋め込みに対応する行を固定し、非実埋め込みの共役対ごとに二行を交換した行列です。従って

$$
\overline{\det V}=\det\overline V=(-1)^{r_2}\det V.
$$

前定理より $\det V\ne0$ ですから

$$
\operatorname{disc}(\beta)=(\det V)^2
=(-1)^{r_2}|\det V|^2
$$

であり、右辺の絶対値部分は正です。
<!-- proof-end -->

**例**：$\mathbb Q(\sqrt{-3})$ の埋め込みは二つとも非実で一組の共役対をなし、$r_2=1$。どの $\mathbb Q$ 基底で計算しても判別式は負になります。

## 3. 整数基底から体の判別式へ

[整数環の有限生成性と整数基底](../ANF1/index.md#thm-anf1-integral-basis)により、$\mathcal O_K$ には階数 $n$ の $\mathbb Z$ 基底が存在します。二つの整数基底は互いに整数行列で変換でき、逆変換も整数行列です。従って変換行列の行列式は $\pm1$ となり、判別式は一致します。これによって**体に固有の整数**を定義できます。

<a id="def-anf2-field-discriminant"></a>

<!-- formal-statement-start -->
> **定義（数体の判別式）**  
> 数体 $K/\mathbb Q$ の整数環 $\mathcal O_K$ の整数基底 $\omega=(\omega_1,\ldots,\omega_n)$ を一つ選び、

$$
D_K=\operatorname{disc}(\omega_1,\ldots,\omega_n)
$$

> を $K$ の**判別式**という。これは整数基底の選択によらない、零でない整数である。
<!-- formal-statement-end -->

最後の主張を確認します。別の整数基底 $\omega'$ への変換行列 $U$ は整数成分を持ち、逆変換行列 $U^{-1}$ も整数成分を持ちます。従って二つの行列式は整数で、

$$
\det U\cdot\det(U^{-1})=1,\qquad \det U=\pm1
$$

です。[判別式の基底変換則](#thm-anf2-basis-change)を適用すると、二つの整数基底から求めた判別式は等しくなります。

また整数基底の積 $\omega_i\omega_j$ は整数環に属します。[整数のトレースとトレース形式の非退化性](../ANF1/index.md#lem-anf1-integral-trace)によって各 $\operatorname{Tr}(\omega_i\omega_j)$ は整数です。従って跡行列 $G_\omega$ の全成分と、その行列式 $D_K$ は整数です。非零性は[判別式の基底変換則](#thm-anf2-basis-change)の証明で確認しました。

<!-- definition-example-start: def-anf2-field-discriminant -->
**定義の確認**：$K=\mathbb Q(\sqrt2)$ では [二次体の整数環](../ANF1/index.md#thm-anf1-quadratic-integers)から $(1,\sqrt2)$ が整数基底です。すでに $\operatorname{disc}(1,\sqrt2)=8$ と計算しました。従ってこれは単なる基底の判別式にとどまらず、$D_K=8$ です。対して $(1,3\sqrt2)$ は整数環を生成しないため、$72$ を $D_K$ と呼ぶことはできません。
<!-- definition-example-end -->

**整数基底でない整な基底**の判別式がどれだけ大きくなるかには、正確な法則があります。整数基底 $\omega$ に対して整数係数で張られる部分加群 $L=\mathbb Z\beta_1+\cdots+\mathbb Z\beta_n\subseteq\mathcal O_K$ を考えます。$\beta$ は $\mathbb Q$ 基底とし、商加法群 $\mathcal O_K/L$ の元の個数（有限）を指数 $[\mathcal O_K:L]$ と書きます。

<a id="thm-anf2-discriminant-index"></a>

<!-- formal-statement-start -->
> **定理（判別式と指数の平方）**  
> 次数 $n$ の数体 $K$、$\mathbb Q$ 基底 $\beta_1,\ldots,\beta_n\in\mathcal O_K$、および $L=\sum_{i=1}^n\mathbb Z\beta_i$ に対し、

$$
\operatorname{disc}(\beta_1,\ldots,\beta_n)
=[\mathcal O_K:L]^2D_K
$$

> が成立する。従って、$\beta$ が整数基底であることと、$\operatorname{disc}(\beta)=D_K$ は同値である。
<!-- formal-statement-end -->

**証明の見取り図。** $\beta$ を整数基底 $\omega$ の整数係数で書いて正方整数行列 $A$ を得ます。変換則で判別式は $(\det A)^2$ 倍。一方、整数格子の商の個数が $|\det A|$ であることを確認します。

<!-- proof-start -->
### 証明

$\omega=(\omega_1,\ldots,\omega_n)$ を $\mathcal O_K$ の整数基底とします。$\beta_j$ は整なので $\beta_j=\sum_i\omega_i a_{ij}$ と一意に書け、$A=(a_{ij})\in M_n(\mathbb Z)$ です。$\beta$ が $\mathbb Q$ 基底だから $\det A\ne0$。整数基底を座標系とすれば

$$
\mathcal O_K/L\simeq\mathbb Z^n/A\mathbb Z^n.
$$

この商の位数を数えます。整数行列の行・列へ「二行（列）を入れ替える、一行（列）に他の整数倍を加える、符号を変える」という操作を行うと、$\mathbb Z^n/A\mathbb Z^n$ の位数と $|\det A|$ は変わりません。整数の除法と最大公約数の計算を第一行・第一列へ繰り返し適用すれば $A$ を対角整数行列 $\operatorname{diag}(d_1,\ldots,d_n)$（各 $d_i\ne0$）へ変えられます。対角の場合の商は $\bigoplus_i\mathbb Z/d_i\mathbb Z$ で、その位数は $\prod_i|d_i|=|\det A|$。従って一般にも

$$
[\mathcal O_K:L]=|\det A|.
$$

[判別式の基底変換則](#thm-anf2-basis-change)から

$$
\operatorname{disc}(\beta)
=(\det A)^2\operatorname{disc}(\omega)
=[\mathcal O_K:L]^2D_K.
$$

$D_K\ne0$ なので二つの判別式が等しいのは指数が $1$ のとき、すなわち $L=\mathcal O_K$ のときに限ります。
<!-- proof-end -->

この式が教えてくれるのは、同じ体の中で基底候補を細くすると判別式の絶対値が**指数の平方倍**になることです。ただし $D_K$ 自体が未知なら、判別式だけから「この基底は最大」と即断してはいけません。候補同士の指数や、既知の整数環の公式と合わせて使用します。

## 4. 二次体の判別式を求める

平方自由整数 $d\ne0,1$ と $K=\mathbb Q(\sqrt d)$ を取ります。[二次体の整数環](../ANF1/index.md#thm-anf1-quadratic-integers)により整数基底は $d\bmod4$ で二種類でした。これを跡行列へ代入します。

<a id="thm-anf2-quadratic-discriminant"></a>

<!-- formal-statement-start -->
> **定理（二次体の判別式公式）**  
> $d\ne0,1$ を平方自由整数とし、$K=\mathbb Q(\sqrt d)$ とする。このとき

$$
D_K=
\begin{cases}
d,&d\equiv1\pmod4,\\
4d,&d\equiv2,3\pmod4.
\end{cases}
$$
<!-- formal-statement-end -->

**証明の見取り図。** $(1,\sqrt d)$ と $(1,(1+\sqrt d)/2)$ の跡行列を別々に計算します。どちらが整数基底かを先に判定することが大切です。

<!-- proof-start -->
### 証明

二つの埋め込みは $a+b\sqrt d$ を $a\pm b\sqrt d$ に送るので、[埋め込みによる跡・ノルムの公式](#thm-anf2-embedding-formulas)から $\operatorname{Tr}(a+b\sqrt d)=2a$ です。

$d\equiv2,3\pmod4$ の場合、整数基底は $(1,\sqrt d)$ で、

$$
G=\begin{pmatrix}
\operatorname{Tr}(1)&\operatorname{Tr}(\sqrt d)\\
\operatorname{Tr}(\sqrt d)&\operatorname{Tr}(d)
\end{pmatrix}
=\begin{pmatrix}2&0\\0&2d\end{pmatrix}.
$$

従って $D_K=\det G=4d$ です。

$d\equiv1\pmod4$ では $w=(1+\sqrt d)/2$ と置くと整数基底は $(1,w)$ です。$w$ の共役は $(1-\sqrt d)/2$ だから $\operatorname{Tr}(w)=1$。また

$$
w^2=w+\frac{d-1}{4},\qquad
\operatorname{Tr}(w^2)=1+2\cdot\frac{d-1}{4}=\frac{d+1}{2}.
$$

よって

$$
G=\begin{pmatrix}2&1\\1&(d+1)/2\end{pmatrix},\qquad
D_K=2\cdot\frac{d+1}{2}-1=d.
$$

これで両場合を証明しました。
<!-- proof-end -->

**三つの比較例**

| 数体 | 整数基底 | 体の判別式 |
|---|---|---|
| $\mathbb Q(\sqrt2)$ | $(1,\sqrt2)$ | $8$ |
| $\mathbb Q(\sqrt5)$ | $(1,(1+\sqrt5)/2)$ | $5$ |
| $\mathbb Q(\sqrt{-5})$ | $(1,\sqrt{-5})$ | $-20$ |

$\mathbb Q(\sqrt5)$ について $(1,\sqrt5)$ の判別式を計算すると $20$ になります。$(1,\sqrt5)$ は整な $\mathbb Q$ 基底ですが整数基底ではありません。実際 $w=(1+\sqrt5)/2$ とすると $\sqrt5=2w-1$ なので変換行列は

$$
A=\begin{pmatrix}1&-1\\0&2\end{pmatrix},\qquad \det A=2.
$$

従って $[\mathcal O_K:\mathbb Z+\mathbb Z\sqrt5]=2$ であり、[指数の平方則](#thm-anf2-discriminant-index)は $20=2^2\cdot5$ を与えます。この数値は ANF3 以降で整数環のイデアルを調べるときの基本例となります。

## 5. 演習：基底の情報を数値へ変える

式の結果だけでなく、どの基底に関する行列か、何を使って整数基底と判断したかを記してください。

**Level A：跡・ノルム・判別式を定義から計算する**

### A1. 乗法行列から跡とノルム

$K=\mathbb Q(\sqrt2)$、$x=3+2\sqrt2$ とする。基底 $(1,\sqrt2)$ に関する $\mu_x$ の行列を作り、跡とノルムを求めよ。共役値でも検算せよ。

- Level: A
- ID: ANF2-A1

<!-- solution-start -->
**詳細解答**　$x\cdot1=3+2\sqrt2$、$x\cdot\sqrt2=4+3\sqrt2$ から

$$
[\mu_x]=\begin{pmatrix}3&4\\2&3\end{pmatrix}.
$$

従って跡は $3+3=6$、ノルムは $3\cdot3-4\cdot2=1$。埋め込みによる像は $3+2\sqrt2,3-2\sqrt2$ で、和は $6$、積は $9-8=1$ となり一致します。
<!-- solution-end -->

### A2. 半整数の跡・ノルム

$K=\mathbb Q(\sqrt5)$、$w=(1+\sqrt5)/2$ の跡・ノルムと $\operatorname{Tr}(w^2)$ を求めよ。

- Level: A
- ID: ANF2-A2

<!-- solution-start -->
**詳細解答**　二つの埋め込みによる像は $w=(1+\sqrt5)/2$ と $w'=(1-\sqrt5)/2$ です。従って

$$
\operatorname{Tr}(w)=w+w'=1,\quad
N(w)=ww'=\frac{1-5}{4}=-1.
$$

$w^2-w-1=0$ から $w^2=w+1$ なので、跡の線形性と $\operatorname{Tr}(1)=2$ より $\operatorname{Tr}(w^2)=1+2=3$ です。
<!-- solution-end -->

### A3. 虚二次体のノルム

$K=\mathbb Q(\sqrt{-3})$、$x=2+\sqrt{-3}$ とする。跡・ノルムを求め、$x$ が整数環の単元か判定せよ。

- Level: A
- ID: ANF2-A3

<!-- solution-start -->
**詳細解答**　$x$ は $T^2-4T+7$ の根なので整です。埋め込みでの二つの像は $2\pm\sqrt{-3}$ だから、跡は $4$、ノルムは $(2+\sqrt{-3})(2-\sqrt{-3})=4+3=7$ です。[単元のノルム判定](#prop-anf2-unit-norm)の必要条件 $N(x)=\pm1$ を満たさないので、整数環の単元ではありません。
<!-- solution-end -->

### A4. 基底を三倍したとき

$K=\mathbb Q(\sqrt2)$ の基底 $\beta=(1,\sqrt2)$ と $\beta'=(1,3\sqrt2)$ の判別式を、各跡行列から求め、基底変換則を確認せよ。

- Level: A
- ID: ANF2-A4

<!-- solution-start -->
**詳細解答**　$\operatorname{Tr}(1)=2$、$\operatorname{Tr}(\sqrt2)=0$、$\operatorname{Tr}(2)=4$ なので $G_\beta=\operatorname{diag}(2,4)$、$\operatorname{disc}(\beta)=8$。後者は $\operatorname{Tr}(3\sqrt2)=0$、$\operatorname{Tr}(18)=36$ より $G_{\beta'}=\operatorname{diag}(2,36)$、$\operatorname{disc}(\beta')=72$。変換行列 $A=\operatorname{diag}(1,3)$ の $\det A=3$ で、$72=3^2\cdot8$ と一致します。
<!-- solution-end -->

**Level B：構造と数値を結び付ける**

### B1. $\mathbb Z[\sqrt5]$ の指数

$K=\mathbb Q(\sqrt5)$、$L=\mathbb Z+\mathbb Z\sqrt5$ とする。$\operatorname{disc}(1,\sqrt5)$ と $D_K$ を求め、$[\mathcal O_K:L]$ を判別式から決定せよ。

- Level: B
- ID: ANF2-B1

<!-- solution-start -->
**詳細解答**　二つの埋め込みから $\operatorname{Tr}(1)=2$、$\operatorname{Tr}(\sqrt5)=0$、$\operatorname{Tr}(5)=10$ です。ゆえに

$$
G_{(1,\sqrt5)}=\begin{pmatrix}2&0\\0&10\end{pmatrix},\qquad
\operatorname{disc}(1,\sqrt5)=20.
$$

$5\equiv1\pmod4$ で平方自由なので、[二次体の判別式公式](#thm-anf2-quadratic-discriminant)から $D_K=5$。[指数の平方則](#thm-anf2-discriminant-index)より $[\mathcal O_K:L]^2=20/5=4$。指数は正整数なので $[\mathcal O_K:L]=2$ です。
<!-- solution-end -->

### B2. 共役値の重複を見抜く

$K=\mathbb Q(\sqrt2,\sqrt3)$、$x=\sqrt2$ とする。$[K:\mathbb Q]=4$ を確かめ、$\mu_x$ の特性多項式、跡、ノルムを求めよ。

- Level: B
- ID: ANF2-B2

<!-- solution-start -->
**詳細解答**　$\mathbb Q(\sqrt2)$ の元 $a+b\sqrt2$（$a,b\in\mathbb Q$）が平方して $3$ になると仮定すれば

$$
a^2+2b^2=3,\qquad 2ab=0.
$$

$a=0$ なら $b^2=3/2$、$b=0$ なら $a^2=3$ ですが、いずれも有理数の平方ではありません（素数 $3$ の指数が奇数）。よって $\sqrt3\notin\mathbb Q(\sqrt2)$、塔の公式から次数は $2\cdot2=4$ です。$x=\sqrt2$ の最小多項式は $T^2-2$ なので $d=2$、$r=4/2=2$。従って [共役根の公式](#thm-anf2-embedding-formulas)から

$$
\det(TI_4-[\mu_x])=(T^2-2)^2,\quad
\operatorname{Tr}(x)=0,\quad
N(x)=((-1)^2(-2))^2=4.
$$

実際、共役値は $\sqrt2,\sqrt2,-\sqrt2,-\sqrt2$ であり、積は $4$ です。
<!-- solution-end -->

### B3. 単元を二通りで確認する

$K=\mathbb Q(\sqrt3)$ と $u=2+\sqrt3$ に対し、ノルムによる単元判定と逆数の直接計算が一致することを示せ。

- Level: B
- ID: ANF2-B3

<!-- solution-start -->
**詳細解答**　$\sqrt3$ は $T^2-3$ の根なので整で、$u=2+\sqrt3$ も [整数環の閉性](../ANF1/index.md#thm-anf1-ring-closure)から整です。二つの共役値を掛けると $N(u)=(2+\sqrt3)(2-\sqrt3)=1$。[単元のノルム判定](#prop-anf2-unit-norm)から $u$ は単元です。直接にも $u^{-1}=2-\sqrt3$ で、これは整数環に属し、積が $1$ です。
<!-- solution-end -->

### B4. 三次の整な基底候補の判別式

$\alpha=\sqrt[3]2$（実根）、$K=\mathbb Q(\alpha)$ とし、$\beta=(1,\alpha,\alpha^2)$ の判別式を計算せよ。この値の符号も説明せよ。ただし $\beta$ が整数基底かどうかは仮定しない。

- Level: B
- ID: ANF2-B4

<!-- solution-start -->
**詳細解答**　$T^3-2$ は [Eisensteinの既約判定](../../RNG/RNG4/index.md#thm-rng4-eisenstein)を素数 $2$ で満たすので次数は $3$ です。最小多項式の三根は $\alpha,\zeta\alpha,\zeta^2\alpha$（$\zeta^3=1,\ \zeta\ne1$）で、$1+\zeta+\zeta^2=0$。よって

$$
\operatorname{Tr}(1)=3,\quad
\operatorname{Tr}(\alpha)=\operatorname{Tr}(\alpha^2)=0,\quad
\operatorname{Tr}(\alpha^3)=\operatorname{Tr}(2)=6,\quad
\operatorname{Tr}(\alpha^4)=\operatorname{Tr}(2\alpha)=0.
$$

各 $(i,j)$ に $\operatorname{Tr}(\beta_i\beta_j)$ を代入すると

$$
G_\beta=\begin{pmatrix}3&0&0\\0&0&6\\0&6&0\end{pmatrix},\qquad
\operatorname{disc}(\beta)=3(0-36)=-108.
$$

埋め込みは実根一つ、非実共役対一組なので $r_2=1$。[符号命題](#prop-anf2-discriminant-sign)から判別式が負であることとも一致します。$\beta$ の整性は $\alpha^3=2$ から確認できますが、整数環全体の整数基底とはまだ証明していないため、$-108$ をこの計算だけで $D_K$ とは断定しません。
<!-- solution-end -->

**Level C：整数基底・判別式・単元の統合**

### C1. $\mathbb Q(\sqrt{13})$ の二つの格子と単元

$K=\mathbb Q(\sqrt{13})$、$w=(1+\sqrt{13})/2$、$L=\mathbb Z+\mathbb Z\sqrt{13}$、$u=(3+\sqrt{13})/2$ とする。

1. $\mathcal O_K$ の整数基底を求め、跡行列から $D_K$ を計算せよ。
2. $L$ の判別式と指数 $[\mathcal O_K:L]$ を求め、指数の平方則を検算せよ。
3. $u$ の跡・ノルムを求め、$u^{-1}\in\mathcal O_K$ を整数基底表示で示せ。

- Level: C
- ID: ANF2-C1

<!-- solution-start -->
**詳細解答**

**(1)** $13$ は平方自由かつ $13\equiv1\pmod4$ なので [二次体の整数環定理](../ANF1/index.md#thm-anf1-quadratic-integers)より $\mathcal O_K=\mathbb Z+\mathbb Zw$ です。$w^2=w+3$、$\operatorname{Tr}(1)=2$、$\operatorname{Tr}(w)=1$ から

$$
\operatorname{Tr}(w^2)=\operatorname{Tr}(w)+3\operatorname{Tr}(1)=1+6=7,
\quad
G_{(1,w)}=\begin{pmatrix}2&1\\1&7\end{pmatrix}.
$$

従って $D_K=2\cdot7-1=13$ です。

**(2)** $\operatorname{Tr}(\sqrt{13})=0$、$\operatorname{Tr}(13)=26$ より

$$
G_{(1,\sqrt{13})}=\begin{pmatrix}2&0\\0&26\end{pmatrix},
\qquad \operatorname{disc}(1,\sqrt{13})=52.
$$

$\sqrt{13}=2w-1$ ですから、$(1,w)$ から $(1,\sqrt{13})$ への変換行列は $\begin{pmatrix}1&-1\\0&2\end{pmatrix}$、行列式は $2$ です。従って $[\mathcal O_K:L]=2$。実際 $52=2^2\cdot13$ となり [指数の平方則](#thm-anf2-discriminant-index)を検算できました。

**(3)** $u=1+w\in\mathcal O_K$、その共役は $(3-\sqrt{13})/2$ です。従って

$$
\operatorname{Tr}(u)=3,\qquad
N(u)=\frac{9-13}{4}=-1.
$$

単元のノルム判定で $u$ は単元です。逆数を具体的に書くと

$$
u^{-1}=\frac{1}{u}=-\frac{3-\sqrt{13}}2
=\frac{-3+\sqrt{13}}2=w-2\in\mathcal O_K.
$$

最後に $w^2=w+3$ を使うと $(1+w)(w-2)=w^2-w-2=1$ となり、逆数表示が直接確かめられます。
<!-- solution-end -->

## 6. 次の講義へ

判別式は、跡という線形代数の量を使い、整数基底の違いを**指数の平方**として記録します。次の ANF3 では、整数環の元が一意分解できなくても、適切な条件の下で**イデアル**が素イデアルへ一意に分解する理由を学びます。判別式はその先の素数の分岐を調べる際にも現れます。
