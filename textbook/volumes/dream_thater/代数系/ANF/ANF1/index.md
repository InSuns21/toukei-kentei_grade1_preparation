# ANF1 代数的整数と整数環

[体拡大と最小多項式](../../FLD/FLD1/index.md#def-fld1-minimal-polynomial)では、$\sqrt2$ のような数を有理数係数の多項式で扱いました。また [整元](../../AG/AG1-06/index.md#def-ag1-06-integral-element)では、係数を置く環を決め、最高次係数が $1$ の方程式を満たすことに注目しました。

しかし $\mathbb Q(\sqrt5)$ には、整数だけでなく $(1+\sqrt5)/2$ という分母をもつ数も現れます。この数は

$$
\left(\frac{1+\sqrt5}{2}\right)^2-
\frac{1+\sqrt5}{2}-1=0
$$

を満たします。分母の有無だけでは「整数に相当する元」を見分けられません。そこで本章では、[既習の代数的整数の定義](../../TRN/TRN1/index.md#def-trn1-algebraic-integer)を $\mathbb Q$ の有限拡大の中で用い、**整数係数のモニック方程式を満たす数全体**を取り出します。これが後でイデアルの分解を考える舞台になります。

本章の問いは三つです。①方程式から整性をどう判定するか。②そのような元の全体がなぜ有限個の整数基底を持つ環になるか。③二次体ではその基底を具体的にどう求めるか。

以後、$\mathbb Q$ を部分体として含み、その上で有限次元のベクトル空間となる体を考えます。ここで使う体の名前と条件を確定しておきます。

<a id="def-anf1-number-field"></a>

<!-- formal-statement-start -->
> **定義（数体）**  
> 体 $K$ が $\mathbb Q$ を部分体として含み、拡大次数

$$
[K:\mathbb Q]=\dim_{\mathbb Q}K=n<\infty
$$

> を満たすとき、$K$ を**数体**という。
<!-- formal-statement-end -->

<!-- definition-example-start: def-anf1-number-field -->
**定義の確認**：$\mathbb Q(\sqrt2)$ は有理数体を含み、各元が $a+b\sqrt2$（$a,b\in\mathbb Q$）と書けます。$1,\sqrt2$ は有理数上一次独立なので、$\mathbb Q$ 上の次元は $2$ です。従って $\mathbb Q(\sqrt2)$ は次数 $2$ の数体です。拡大次数と基底の根拠は[体拡大の定義と実例](../../FLD/FLD1/index.md#def-fld1-field-extension)からも確かめられます。
<!-- definition-example-end -->

以下 $K/\mathbb Q$ は次数 $n$ の数体とします。$\mathbb Z[T]$ と $\mathbb Q[T]$ はそれぞれ整数係数・有理数係数の一変数多項式環です。

<!-- definition-example-audit: strict -->

## 1. 整数に相当する元を方程式から取り出す

例えば $\sqrt2$ は $T^2-2$ の根ですが、$1/2$ を根にもつ一次式 $T-1/2$ は整数係数ではありません。この違いを、式の次数や根の表示に依存せず定義します。

<a id="ref-anf1-algebraic-integer"></a>
### 既習の定義を数体に適用する

[代数的整数の定義](../../TRN/TRN1/index.md#def-trn1-algebraic-integer)をこの数体 $K$ に適用すると、$\alpha\in K$ が代数的整数であるとは、整数 $m\ge1$ と係数 $a_0,\ldots,a_{m-1}\in\mathbb Z$ があって

$$
\alpha^m+a_{m-1}\alpha^{m-1}+\cdots+a_1\alpha+a_0=0
$$

となることです。元の定義と同じ条件を、対象を $K$ に限定して書き直しました。

**定義の確認**： $\sqrt2$ は $T^2-2\in\mathbb Z[T]$ の根なので代数的整数です。一方、$(1+\sqrt5)/2$ は上の $T^2-T-1$ の根なので、分母があっても代数的整数です。いずれも最高次係数が $1$ で、**他の係数がすべて整数**であることを具体的に確認しました。


代数的整数なら有理数係数の非零多項式の根でもあるため、[代数的元](../../FLD/FLD1/index.md#def-fld1-algebraic-element)です。逆に、代数的であるだけでは足りません。例えば $1/2$ は $2T-1$ の根ですが、モニックな整数係数多項式の根にはなりません。この失敗を次の命題で証明します。

<a id="prop-anf1-rational-integers"></a>

<!-- formal-statement-start -->
> **命題（有理数の中の代数的整数）**  
> 有理数 $r\in\mathbb Q$ が代数的整数であるための必要十分条件は $r\in\mathbb Z$ である。
<!-- formal-statement-end -->

**証明の見取り図。** 有理数を既約分数 $a/b$ にし、モニック方程式の分母を払います。最高次係数が $1$ であることが、分母 $b$ を消す決め手です。

<!-- proof-start -->
### 証明

整数 $r$ は一次のモニック方程式 $T-r=0$ の根なので、十分性が成立します。逆に $r=a/b$（$a\in\mathbb Z,\ b\in\mathbb Z_{>0},\ \gcd(a,b)=1$）が次数 $m$ の整方程式を満たすとします。$b^m$ を掛けると

$$
a^m+a_{m-1}a^{m-1}b+\cdots+a_1ab^{m-1}+a_0b^m=0.
$$

第2項以降はすべて $b$ の倍数ですから $b\mid a^m$ です。もし素数 $p$ が $b$ を割れば $p\mid a^m$、従って $p\mid a$ となり $\gcd(a,b)=1$ に反します。よって $b=1$、すなわち $r=a\in\mathbb Z$ です。
<!-- proof-end -->

### 最小多項式だけで判定する

[最小多項式](../../FLD/FLD1/index.md#thm-fld1-minimal-polynomial)とは、代数的元 $\alpha$ を根にもつ $\mathbb Q[T]$ のモニック既約多項式 $m_\alpha(T)$ です。どの整方程式を探せばよいかを、この一つの多項式へ絞れます。

<a id="thm-anf1-minimal-polynomial"></a>

<!-- formal-statement-start -->
> **定理（最小多項式による整性判定）**  
> 数体 $K$ の元 $\alpha$ の $\mathbb Q$ 上のモニック最小多項式を $m_\alpha(T)$ とする。このとき

$$
\alpha\text{ が代数的整数}
\quad\Longleftrightarrow\quad
m_\alpha(T)\in\mathbb Z[T].
$$
<!-- formal-statement-end -->

**証明の見取り図。** 右から左は定義そのものです。左から右では、$m_\alpha$ に有理数の分母があっても、整数係数の**原始多項式**に直します。その多項式がモニックな整方程式を割るなら、先頭係数は $1$ を割るはずです。

<!-- proof-start -->
### 証明

$m_\alpha\in\mathbb Z[T]$ なら、それを $\alpha$ に代入するだけで定義を満たします。

逆に $\alpha$ が代数的整数なら、モニックな $f(T)\in\mathbb Z[T]$ が存在して $f(\alpha)=0$ です。[最小多項式の割り切り性](../../FLD/FLD1/index.md#thm-fld1-minimal-polynomial)から、$m_\alpha\mid f$ が $\mathbb Q[T]$ で成立します。


$m_\alpha$ の係数の分母を払って共通因子を除くと、整数係数が互いに素な**原始多項式** $P\in\mathbb Z[T]$ と正の有理数 $c$ があって $m_\alpha=cP$ と書けます。この $P$ も $\mathbb Q[T]$ で $f$ を割ります。

[Gaussの補題（既約性の移送）](../../RNG/RNG4/index.md#thm-rng4-gauss-irreducibility)の証明で用いた原始多項式の積の性質から、整数係数の原始多項式 $P$ が整数係数多項式 $f$ を $\mathbb Q[T]$ で割るなら、整数係数の多項式 $Q$ を使って

$$
f=P Q,\qquad Q\in\mathbb Z[T]
$$

と書けます。

$f$ の最高次係数は $1$ なので、$P,Q$ の最高次係数は整数で、その積は $1$ です。従って $P$ の最高次係数は $\pm1$。また $m_\alpha=cP$ はモニックなので、$c=\pm1$ となります。よって $m_\alpha$ は整数係数です。
<!-- proof-end -->

例えば $\alpha=(1+\sqrt5)/2$ について、$2\alpha-1=\sqrt5$ を二乗すると

$$
4\alpha^2-4\alpha+1=5,\qquad
m_\alpha(T)=T^2-T-1.
$$

$\sqrt5\notin\mathbb Q$ より $\alpha\notin\mathbb Q$ なので、二次式が最小多項式です。こうして整性が判定できます。

## 2. 代数的整数は環をなす

整数の性質を拡張したいなら、足したり掛けたりしても新しい元が整である必要があります。個別の整方程式を加減しても、一般にすぐモニック方程式にはなりません。[有限加群判定](../../AG/AG1-06/index.md#prop-ag1-06-integral-finite-single)と[整元の有限個の添加](../../AG/AG1-06/index.md#prop-ag1-06-finite-generators)を使えば、この問題を解けます。

<a id="def-anf1-ring-of-integers"></a>

<!-- formal-statement-start -->
> **定義（数体の整数環）**  
> 数体 $K$ に属する代数的整数全体を

$$
\mathcal O_K
=\{\alpha\in K:\alpha\text{ は }\mathbb Z\text{ 上整}\}
$$

> と書き、$K$ の**整数環**と呼ぶ。
<!-- formal-statement-end -->

この段階では集合として定義しました。本当に環になることを次で証明します。

<a id="thm-anf1-ring-closure"></a>

<!-- formal-statement-start -->
> **定理（整数環の閉性）**  
> 数体 $K$ に対して $\mathcal O_K$ は $1$ を含む $K$ の部分環であり、

$$
\mathcal O_K\cap\mathbb Q=\mathbb Z
$$

> が成り立つ。
<!-- formal-statement-end -->

**証明の見取り図。** 整元 $\alpha,\beta$ を同時に含む $\mathbb Z$ 上有限な加群を作れば、その中の $\alpha+\beta$ と $\alpha\beta$ も整になります。

<!-- proof-start -->
### 証明

$0,1$ はそれぞれ $T$ と $T-1$ の根です。$\alpha,\beta\in\mathcal O_K$ を取ると、[整元の有限個の添加と推移性](../../AG/AG1-06/index.md#prop-ag1-06-finite-generators)を $A=\mathbb Z,\ B=K,\ b_1=\alpha,\ b_2=\beta$ に適用でき、

$$
M=\mathbb Z[\alpha,\beta]
$$

は有限 $\mathbb Z$ 加群となります。この環 $M$ は $\alpha+\beta,\alpha\beta,-\alpha$ を含みます。[整元の有限加群判定](../../AG/AG1-06/index.md#prop-ag1-06-integral-finite-single)の (3)$\Rightarrow$(1) を、これら三つの元と $M$ に適用すると、いずれも $\mathbb Z$ 上整です。したがって $\mathcal O_K$ は和・積・加法逆元で閉じ、単位元を含む部分環となります。

最後に $\mathbb Z\subseteq\mathcal O_K\cap\mathbb Q$ は定義から成立し、逆包含は[有理数の中の代数的整数](#prop-anf1-rational-integers)から従います。
<!-- proof-end -->

<!-- definition-example-start: def-anf1-ring-of-integers -->
**定義の確認**： $K=\mathbb Q(\sqrt2)$ では、$\sqrt2$ と $1+\sqrt2$ はそれぞれ $T^2-2$ と $T^2-2T-1$ の根です。また

$$
(1+\sqrt2)\sqrt2=2+\sqrt2,\qquad
(2+\sqrt2)^2-4(2+\sqrt2)+2=0.
$$

ここでは和・積が再び整になることを、環の閉性の定理に加えて方程式から直接確認しました。
<!-- definition-example-end -->

## 3. なぜ整数環は有限個の整数基底を持つのか

数体 $K$ は $\mathbb Q$ 上有限次元です。しかし一般に、有理数ベクトル空間の中の部分加群が $\mathbb Z$ 上有限生成とは限りません。例えば $\mathbb Q$ 自身は $\mathbb Z$ 上有限生成ではありません。整数環の場合に有限生成となる理由は、整数係数の方程式によって分母が制限されるからです。

その制限を取り出すため、行列の対角成分の和である**トレース**を補助的に導入します。体の元 $x\in K$ に対し、$y\mapsto xy$ は $K$ を $\mathbb Q$ ベクトル空間と見た線形写像です。

その行列の対角成分の和を $\operatorname{Tr}_{K/\mathbb Q}(x)$ と書きます。基底を変更すると行列は相似になり、トレースは変わりません。次章ではこれを埋め込みとの関係から詳しく研究します。

既習の[双線形形式](../../../基礎科目/LA/LA3E/index.md#def-la3e-bilinear-form)は実数体・複素数体上で導入しましたが、「二つの引数のそれぞれについて線形」という条件は有理数体上でも定義できます。ここでは $\mathbb Q$ ベクトル空間 $K$ 上の $\mathbb Q$ 値の双線形形式を考えます。$x,x',y,y'\in K$、$a,b\in\mathbb Q$ なら、乗法の分配法則とトレースの線形性から

$$
\operatorname{Tr}_{K/\mathbb Q}((ax+bx')y)
=a\operatorname{Tr}_{K/\mathbb Q}(xy)
+b\operatorname{Tr}_{K/\mathbb Q}(x'y),
$$

$$
\operatorname{Tr}_{K/\mathbb Q}(x(ay+by'))
=a\operatorname{Tr}_{K/\mathbb Q}(xy)
+b\operatorname{Tr}_{K/\mathbb Q}(xy')
$$

が成り立ちます。

<a id="def-anf1-trace-pairing"></a>

<!-- formal-statement-start -->
> **定義（数体のトレースと双線形形式）**  
> 次数 $n$ の数体 $K/\mathbb Q$ と $x\in K$ に対し、$\mathbb Q$ 線形写像 $\mu_x(y)=xy$ のトレースを $\operatorname{Tr}_{K/\mathbb Q}(x)$ とする。$x,y\in K$ について

$$
B(x,y)=\operatorname{Tr}_{K/\mathbb Q}(xy)
$$

> と定める。これをトレース双線形形式と呼ぶ。
<!-- formal-statement-end -->

<!-- definition-example-start: def-anf1-trace-pairing -->
**定義の確認**： $K=\mathbb Q(\sqrt2)$ の $\mathbb Q$ 基底 $(1,\sqrt2)$ で、$\mu_{a+b\sqrt2}$ が基底ベクトルをどこへ送るか計算します。

$$
\mu_{a+b\sqrt2}(1)=a+b\sqrt2,\qquad
\mu_{a+b\sqrt2}(\sqrt2)=2b+a\sqrt2.
$$

したがって行列の第1列は $(a,b)^{\mathsf T}$、第2列は $(2b,a)^{\mathsf T}$ となり、

$$
[\mu_{a+b\sqrt2}]
=\begin{pmatrix}a&2b\\b&a\end{pmatrix},\qquad
\operatorname{Tr}_{K/\mathbb Q}(a+b\sqrt2)=2a.
$$

特に $B(1,\sqrt2)=0$、$B(\sqrt2,\sqrt2)=4$ です。線形写像の行列が**どの基底で何を表すか**を確認しました。
<!-- definition-example-end -->

さらに、[既習の双線形形式の非退化性](../../../基礎科目/LA/LA3E/index.md#def-la3e-nondegenerate-bilinear-form)と同じ条件をここでは $\mathbb Q$ 上で用います。すなわち、$B(x,y)=0$ が**すべての** $y\in K$ について成り立つなら $x=0$ となることを、非退化と呼びます。これは $B(x,x)\ne0$ をすべての非零 $x$ に要求する条件ではありません。

<a id="lem-anf1-integral-trace"></a>

<!-- formal-statement-start -->
> **補題（整数のトレースとトレース形式の非退化性）**  
> 数体 $K/\mathbb Q$ の次数を $n$ とする。
>
> 1. $x\in\mathcal O_K$ なら $\operatorname{Tr}_{K/\mathbb Q}(x)\in\mathbb Z$。
> 2. $x\in K$ が全ての $y\in K$ に対して $B(x,y)=0$ を満たすなら $x=0$。
<!-- formal-statement-end -->

**証明の見取り図。** (1) は $x$ の整数係数最小多項式から乗法行列の対角和を読み取ります。(2) は $x\ne0$ なら $y=x^{-1}$ を選べることを使います。

<!-- proof-start -->
### 証明

(1) $d=[\mathbb Q(x):\mathbb Q]$ とし、[最小多項式による整性判定](#thm-anf1-minimal-polynomial)から

$$
m_x(T)=T^d+c_{d-1}T^{d-1}+\cdots+c_0,\qquad c_i\in\mathbb Z
$$

と書けます。$\mathbb Q(x)$ の基底 $(1,x,\ldots,x^{d-1})$ で $\mu_x$ の行列は、最初の $d-1$ 列が冪を一段進め、最後の列が $x^d=-c_{d-1}x^{d-1}-\cdots-c_0$ を表すコンパニオン行列です。対角和は $-c_{d-1}$ です。

[塔の公式](../../FLD/FLD1/index.md#thm-fld1-tower-law)から $r=[K:\mathbb Q(x)]=n/d$ は整数です。$K$ の $\mathbb Q(x)$ 基底 $(u_1,\ldots,u_r)$ を選ぶと、$(u_jx^i)_{1\le j\le r,\,0\le i<d}$ が $K$ の $\mathbb Q$ 基底になります。この基底で $\mu_x$ は同じコンパニオン行列 $r$ 個の対角ブロックを持つので、

$$
\operatorname{Tr}_{K/\mathbb Q}(x)
=-r c_{d-1}\in\mathbb Z.
$$

(2) $x\ne0$ と仮定すれば、体なので $y=x^{-1}\in K$ を選べます。そのとき $xy=1$ で、$\mu_1$ は $n$ 次単位行列です。従って

$$
B(x,x^{-1})
=\operatorname{Tr}_{K/\mathbb Q}(1)=n\ne0
$$

となり仮定に矛盾します。
<!-- proof-end -->

この非退化性は、どの $\mathbb Q$ 基底を選んでもトレース形式の行列が可逆であることと同値です。実際、基底 $\beta_1,\ldots,\beta_n$ と

$$
G=(B(\beta_i,\beta_j))_{1\le i,j\le n}
$$

を取ります。$x=\sum_i v_i\beta_i$、$y=\sum_j w_j\beta_j$ と基底展開すると、双線形性により

$$
B(x,y)=\sum_{i,j}v_iw_j B(\beta_i,\beta_j)=v^{\mathsf T}Gw.
$$

また $K$ の乗法は可換なので $G_{ij}=G_{ji}$ です。$Gv=0$ なら任意の $w$ について $B(x,y)=v^{\mathsf T}Gw=(Gv)^{\mathsf T}w=0$ となります。補題の非退化性から $x=0$、基底の一次独立性から $v=0$ です。従って $G$ の核は $\{0\}$ であり、$n$ 次正方行列 $G$ は可逆です。逆に $G$ が可逆なら、$B(x,y)=0$ が全ての $y$ について成立するとき $v^{\mathsf T}G=0$ から $v=0$ となり、非退化性を得ます。

<a id="thm-anf1-integral-basis"></a>

<!-- formal-statement-start -->
> **定理（整数環の有限生成性と整数基底）**  
> $K/\mathbb Q$ を次数 $n$ の数体とする。このとき $\mathcal O_K$ は階数 $n$ の自由 $\mathbb Z$ 加群である。すなわち、ある $\omega_1,\ldots,\omega_n\in\mathcal O_K$ が存在して、各 $\alpha\in\mathcal O_K$ を一意に

$$
\alpha=z_1\omega_1+\cdots+z_n\omega_n,\qquad z_i\in\mathbb Z
$$

> と表せる。このような組を**整数基底**と呼ぶ。
<!-- formal-statement-end -->

**証明の見取り図。** 最初に整な $\mathbb Q$ 基底を作り、そのトレース行列 $G$ を使って任意の整数環の元の分母を $1/\det G$ 以下の固定された格子へ押し込みます。ここでいう「格子」は、$\mathbb Q$ ベクトル空間の基底の**整数係数の和**です。

<!-- proof-start -->
### 証明

**第1段階（整な基底）。** $\mathbb Q$ 基底 $x_1,\ldots,x_n$ を任意に選びます。各 $x_i$ は数体内にあるので代数的です。[代数的元の定義](../../FLD/FLD1/index.md#def-fld1-algebraic-element)から、整数係数を持つ非零多項式

$$
a_mT^m+a_{m-1}T^{m-1}+\cdots+a_0
$$

で $x_i$ を消すものがあり、$a_m\ne0$ です。$\beta_i=a_mx_i$ とすると、元の式に $a_m^{m-1}$ を掛けることで

$$
\beta_i^m+a_{m-1}\beta_i^{m-1}
+a_ma_{m-2}\beta_i^{m-2}
+\cdots+a_m^{m-1}a_0=0
$$

を得ます。従って $\beta_i$ は代数的整数であり、非零有理数倍なので $(\beta_i)$ は依然として $\mathbb Q$ 基底です。$L=\sum_i\mathbb Z\beta_i$ と置くと $L\subseteq\mathcal O_K$ です。

**第2段階（分母の一様な制限）。** 整数係数行列

$$
G_{ij}=\operatorname{Tr}_{K/\mathbb Q}(\beta_i\beta_j)\in\mathbb Z
$$

を作ります。各 $\beta_i\beta_j$ は[整数環の閉性](#thm-anf1-ring-closure)から整なので、[整数のトレースの補題](#lem-anf1-integral-trace)が使えます。同じ補題の非退化性によって $G$ は可逆であり、$D=\det G$ は非零整数です。

任意の $\alpha\in\mathcal O_K$ を $\alpha=\sum_i q_i\beta_i$（$q_i\in\mathbb Q$）と展開します。各 $j$ について $\alpha\beta_j$ は整なので

$$
v_j=\operatorname{Tr}_{K/\mathbb Q}(\alpha\beta_j)\in\mathbb Z.
$$

トレースの線形性から $v=Gq$ です。整数係数行列 $G$ は $\det G=D\ne0$ なので、[余因子行列の恒等式](../../../基礎科目/LA/LA3C/index.md#thm-la3c-adjugate-identity)を使って

$$
q=G^{-1}v=\frac{\operatorname{adj}(G)v}{D}
$$

となり、$\operatorname{adj}(G)$ は整数係数行列です。従って

$$
L\subseteq\mathcal O_K\subseteq D^{-1}L.
$$

**第3段階（有限生成から整数基底）。** $D^{-1}L$ は $(\beta_i/D)$ を基底とする自由 $\mathbb Z$ 加群で、$\mathbb Z^n$ と同型です。$\mathcal O_K$ はその加法部分群です。

$\mathbb Z^n$ の部分群が自由有限生成であることは、$n$ に関する帰納法で確かめられます。$n=1$ では部分群は $d\mathbb Z$ の形です。

$n\ge2$ の場合、第1座標への射影像はある $d\ge0$ について $d\mathbb Z$ となります。$d\ne0$ なら第1座標が $d$ の元を一つ選び、その整数倍を引けば、残りは第1座標が $0$ の部分群へ落ちます。

この核は $\mathbb Z^{n-1}$ の部分群なので帰納法で自由有限生成です。選んだ元と核の基底を合わせれば、もとの部分群の基底になります。$d=0$ なら射影像が零なので、最初から核だけを考えればよいです。

従って $\mathcal O_K$ は有限生成自由 $\mathbb Z$ 加群です。さらに $L\subseteq\mathcal O_K\subseteq K$ で、$L$ の $\mathbb Q$ 線形包は $K$ 全体だから、その階数は少なくとも $n$、一方 $K$ の $\mathbb Q$ 次元が $n$ なので高々 $n$ です。ゆえに階数はちょうど $n$ です。
<!-- proof-end -->

この証明で $D$ は選んだ基底のトレース行列式です。その意味を二次体で具体的に調べ、次章では判別式として体系化します。**整数基底が存在する**ことと、**最初に選んだ整な基底がすでに整数基底である**ことは別です。

## 4. 二次体の整数環を完全に計算する

$d\in\mathbb Z$ を $d\ne0,1$ の**平方因子を持たない整数**、すなわち $d$ がどの素数 $p$ についても $p^2$ で割り切れない整数（平方自由整数）とします。二次体 $K=\mathbb Q(\sqrt d)$ を考えます。$d$ は整数の平方ではないので $\sqrt d\notin\mathbb Q$ であり、$K$ の $\mathbb Q$ 基底は $(1,\sqrt d)$ です。

ここでは $\alpha=a+b\sqrt d$（$a,b\in\mathbb Q$）を整かどうか調べます。$b\ne0$ なら、$a+b\sqrt d$ と $a-b\sqrt d$ は二つの異なる根であり、

$$
(T-\alpha)(T-(a-b\sqrt d))
=T^2-2aT+(a^2-db^2)
$$

は $\alpha$ の $\mathbb Q$ 上のモニック最小多項式です。$b=0$ なら $\alpha=a\in\mathbb Q$ で、整性は先の有理数命題から分かります。

<a id="thm-anf1-quadratic-integers"></a>

<!-- formal-statement-start -->
> **定理（二次体の整数環）**  
> $d\ne0,1$ を平方自由整数、$K=\mathbb Q(\sqrt d)$ とする。
>
> - $d\equiv2,3\pmod4$ なら

$$
\mathcal O_K=\mathbb Z[\sqrt d]
=\mathbb Z\cdot1\oplus\mathbb Z\cdot\sqrt d.
$$

> - $d\equiv1\pmod4$ なら

$$
\mathcal O_K=\mathbb Z\left[\frac{1+\sqrt d}{2}\right]
=\mathbb Z\cdot1\oplus
\mathbb Z\cdot\frac{1+\sqrt d}{2}.
$$
<!-- formal-statement-end -->

**証明の見取り図。** 最小多項式の二つの係数が整数である条件をまず読み取り、分母を追います。平方自由性が $2b$ を整数にし、$4$ を法とする平方数の剰余が $d$ の二種類の基底を分けます。

<!-- proof-start -->
### 証明

$\alpha=a+b\sqrt d$ を整とします。$b=0$ なら[有理数の整性判定](#prop-anf1-rational-integers)より $a\in\mathbb Z$ で、結論のどちらにも含まれます。$b\ne0$ では[最小多項式による整性判定](#thm-anf1-minimal-polynomial)を二次式へ適用して

$$
r=2a\in\mathbb Z,\qquad
N=a^2-db^2\in\mathbb Z
$$

を得ます。$s=2b\in\mathbb Q$ とおくと

$$
ds^2=r^2-4N\in\mathbb Z.
$$

$s=u/v$（$u\in\mathbb Z,\ v\in\mathbb Z_{>0},\ \gcd(u,v)=1$）と既約に書けば、$ds^2\in\mathbb Z$ より $v^2\mid du^2$ です。$\gcd(u^2,v^2)=1$ なので、整数の[Bézout 等式](../../RNG/RNG3/index.md#def-rng3-gcd-bezout)により、ある整数 $h,k$ について

$$
hu^2+kv^2=1
$$

と書けます。これに $d$ を掛けると

$$
d=h(du^2)+k(dv^2)
$$

です。右辺の両項は $v^2$ の倍数なので $v^2\mid d$ です。$d$ は平方自由であり、$v>1$ ならその素因子の平方が $d$ を割って矛盾するため、$v=1$ です。すなわち $s\in\mathbb Z$ です。したがって

$$
\alpha=\frac{r+s\sqrt d}{2},
\qquad r,s\in\mathbb Z,\qquad
r^2-ds^2\equiv0\pmod4.
$$

平方整数は法 $4$ で $0$ または $1$ に合同です。

- $d\equiv2\pmod4$ のとき、$s$ が奇数なら $ds^2\equiv2$ となり $r^2$ と一致できません。従って $s$ は偶数で、$r^2\equiv0$ から $r$ も偶数です。
- $d\equiv3\pmod4$ のとき、$s$ が奇数なら $ds^2\equiv3$ となり、やはり $r^2$ と一致できません。従って $r,s$ とも偶数です。
- $d\equiv1\pmod4$ のとき、条件は $r^2\equiv s^2\pmod4$ なので、$r,s$ は同じ偶奇です。

前二者では $\alpha=(r/2)+(s/2)\sqrt d\in\mathbb Z[\sqrt d]$ です。後者では $r-s$ が偶数だから

$$
\alpha=\frac{r-s}{2}
+s\,\frac{1+\sqrt d}{2}
$$

と書けます。従っていずれも定理の右辺への包含が示されました。

逆に、$\sqrt d$ は $T^2-d$ の根であり整です。$d\equiv1\pmod4$ なら $w=(1+\sqrt d)/2$ は

$$
w^2-w-\frac{d-1}{4}=0
$$

を満たし、$(d-1)/4\in\mathbb Z$ なので整です。[整数環の閉性](#thm-anf1-ring-closure)から $\mathbb Z[\sqrt d]$ と $\mathbb Z[w]$ の全元が整です。これで逆包含も成立します。

最後に $(1,\sqrt d)$ と $(1,w)$ のそれぞれが $\mathbb Q$ 上一次独立なので、示した表示は $\mathbb Z$ 上も一意です。
<!-- proof-end -->

**定理の適用例**

**例1：$d=5$。** $5\equiv1\pmod4$ なので $w=(1+\sqrt5)/2$ が整数基底の第2元です。実際 $w^2-w-1=0$ です。一方 $\sqrt5=2w-1$ なので、$\mathbb Z[\sqrt5]$ は $\mathbb Z[w]$ の真部分環です。$w=a+b\sqrt5$ と整数 $a,b$ で書くなら $b=1/2$ となって矛盾します。

**例2：$d=-5$。** $-5\equiv3\pmod4$ だから $\mathcal O_{\mathbb Q(\sqrt{-5})}=\mathbb Z[\sqrt{-5}]$ です。$(1+\sqrt{-5})/2$ の最小多項式は

$$
T^2-T+\frac32
$$

なので整ではありません。二次体という共通点だけで $1/2$ の分母を許してはいけません。


### 一意分解が壊れても整数環は存在する

[一意分解整域](../../RNG/RNG3/index.md#def-rng3-ufd)で考えるような元の素因数分解は、整数環では必ずしも成立しません。例えば $\mathbb Z[\sqrt{-5}]$ には

$$
6=2\cdot3=(1+\sqrt{-5})(1-\sqrt{-5})
$$

という異なる分解があります。**元がうまく分解できない場合にも、環そのものは有限個の整数基底で管理できます。** どのようにイデアルの分解へ進むかは ANF3 以降の問いです。

## 5. 演習：整性・有限性・二次体を再構成する

各問題では、どの係数環のモニック多項式を使うかを明記してください。

**Level A：定義と直接計算**

### A1. 有理数を整方程式へ代入する

$r=7/3$ が代数的整数ではないことを、既約分数とモニック方程式によって示せ。

- Level: A
- ID: ANF1-A1

<!-- solution-start -->
**詳細解答**　もし $r=7/3$ が $T^m+a_{m-1}T^{m-1}+\cdots+a_0$（$a_i\in\mathbb Z$）の根なら、両辺に $3^m$ を掛けて

$$
7^m+a_{m-1}7^{m-1}3+\cdots+a_0 3^m=0
$$

となります。後ろの項はすべて $3$ の倍数なので $3\mid 7^m$ が必要ですが、$3\nmid7$ なので不可能です。従って $7/3$ は整ではありません。
<!-- solution-end -->

### A2. 平方根と最小多項式

$\sqrt6\in\mathbb Q(\sqrt6)$ が代数的整数であることを示し、その $\mathbb Q$ 上の最小多項式を求めよ。

- Level: A
- ID: ANF1-A2

<!-- solution-start -->
**詳細解答**　$T^2-6\in\mathbb Z[T]$ はモニックで $(\sqrt6)^2-6=0$ だから整です。もし $T^2-6$ が $\mathbb Q$ 上可約なら一次因子を持つので $\sqrt6\in\mathbb Q$ となります。既約分数 $u/v$ で $(u/v)^2=6$ とすると $v^2\mid6$ なので $v=1$、さらに整数平方が $6$ となることはありません。よって $T^2-6$ は既約で最小多項式です。
<!-- solution-end -->

### A3. 分母があっても整

$w=(1+\sqrt5)/2$ の最小多項式を求め、整性を判定せよ。また $w^2$ を $1,w$ の整数係数一次結合で表せ。

- Level: A
- ID: ANF1-A3

<!-- solution-start -->
**詳細解答**　$2w-1=\sqrt5$ を二乗すると $4w^2-4w+1=5$、従って

$$
w^2-w-1=0.
$$

$w\notin\mathbb Q$ なのでモニック二次式 $T^2-T-1$ が最小多項式です。その係数は整数であるため $w$ は整です。関係式を移項して $w^2=1+w$ です。
<!-- solution-end -->

### A4. 二次体で禁止される半整数

$\alpha=(1+\sqrt{-5})/2$ が代数的整数でないことを、最小多項式から示せ。

- Level: A
- ID: ANF1-A4

<!-- solution-start -->
**詳細解答**　$2\alpha-1=\sqrt{-5}$ より $(2\alpha-1)^2=-5$、つまり

$$
4\alpha^2-4\alpha+6=0,\qquad
\alpha^2-\alpha+\frac32=0.
$$

$\alpha\notin\mathbb Q$ なので二次の $T^2-T+3/2$ が最小多項式です。その定数項が整数ではないので、[最小多項式による整性判定](#thm-anf1-minimal-polynomial)により $\alpha$ は代数的整数ではありません。
<!-- solution-end -->

**Level B：定理の仕組みを組み合わせる**

### B1. 代数的だが整ではない二次の元

$\alpha=1+\sqrt2/2$ の最小多項式を求め、$\alpha$ が代数的でも整でないことを証明せよ。

- Level: B
- ID: ANF1-B1

<!-- solution-start -->
**詳細解答**　$\alpha-1=\sqrt2/2$ を二乗すると $(\alpha-1)^2=1/2$ です。従って

$$
\alpha^2-2\alpha+\frac12=0.
$$

$\sqrt2\notin\mathbb Q$ だから $\alpha$ は有理数ではなく、この二次式が $\mathbb Q$ 上のモニック最小多項式です。定数項 $1/2$ が整数ではないため整ではありません。「代数的」と「整」は有理数係数か整数係数か、かつモニックかという違いです。
<!-- solution-end -->

### B2. 分母を払って整な基底を作る

$x$ は $2T^2-3\in\mathbb Z[T]$ の正の実根とする。$x$ は整でないが、$\beta=2x$ は整であることを示せ。$\mathbb Q(x)$ の整な $\mathbb Q$ 基底を一組挙げよ。

- Level: B
- ID: ANF1-B2

<!-- solution-start -->
**詳細解答**　$x^2=3/2$ です。もし $x=u/v\in\mathbb Q$ を既約分数（$u\in\mathbb Z,\ v\in\mathbb Z_{>0}$）で表せば

$$
2u^2=3v^2
$$

となります。右辺から $3\mid u^2$、よって $u=3k$ と書けます。代入すると $v^2=6k^2$ なので $3\mid v$ となり、既約性に矛盾します。したがって $x\notin\mathbb Q$ であり、モニック最小多項式は $T^2-3/2$ です。定数項が非整数なので $x$ は整でありません。一方 $\beta=2x$ と置くと

$$
\beta^2=4x^2=4\cdot\frac32=6,\qquad
\beta^2-6=0.
$$

従って $\beta$ はモニック整数係数多項式の根で整です。さらに $\mathbb Q(x)=\mathbb Q(\sqrt6)$ で、$\beta=\sqrt6\notin\mathbb Q$ なので $(1,\beta)$ は $\mathbb Q$ 基底です。両元とも整なので、これは整数環に含まれる**整な $\mathbb Q$ 基底**です。この計算だけでは整数環全体の整数基底であることまでは言えず、それは[二次体の定理](#thm-anf1-quadratic-integers)の $d=6$ の場合から従います。
<!-- solution-end -->

### B3. 整数環で元の一意分解が壊れる

$R=\mathbb Z[\sqrt{-5}]$ で $2,3,1+\sqrt{-5},1-\sqrt{-5}$ が既約元であることを示し、$6$ の二通りの分解が同伴を除いて一致しないことを証明せよ。

- Level: B
- ID: ANF1-B3

<!-- solution-start -->
**詳細解答**　$z=a+b\sqrt{-5}$（$a,b\in\mathbb Z$）の共役を $\bar z=a-b\sqrt{-5}$ とすると

$$
q(z)=z\bar z=a^2+5b^2\in\mathbb Z_{\ge0}.
$$

積を取ると $q(zw)=zw\overline{zw}=z\bar z\,w\bar w=q(z)q(w)$ です。$z\ne0$ なら $q(z)\ge1$ で、$q(z)=1$ は $b=0,\ a=\pm1$ の場合だけです。これらは実際に[単元](../../RNG/RNG3/index.md#def-rng3-divisibility-unit-associate)であり、他に単元がないことも乗法性から分かります。

$q(z)=2$ または $q(z)=3$ となる整数 $a,b$ はありません。$b\ne0$ なら $q(z)\ge5$、$b=0$ なら $q(z)$ は平方数だからです。$q(2)=4$、$q(3)=9$、$q(1\pm\sqrt{-5})=6$ です。いずれかが非単元の積へ分解すれば、両因子の $q$ は $1$ より大きい整数で、その積が $4,9,6$ のいずれかになります。$4$ なら $2\cdot2$、$9$ なら $3\cdot3$、$6$ なら $2\cdot3$ しかありませんが、$q=2,3$ の元は存在しないため矛盾します。

$$
6=2\cdot3=(1+\sqrt{-5})(1-\sqrt{-5})
$$

の各因子は[既約](../../RNG/RNG3/index.md#def-rng3-irreducible-prime)です。$q$ の値が $4,9,6$ で異なるものは同伴ではなく、$1+\sqrt{-5}$ と $1-\sqrt{-5}$ も $\pm1$ 倍では一致しません。従って分解は同伴を除いて異なり、$R$ は一意分解整域ではありません。
<!-- solution-end -->

**Level C：有限生成性・トレース・二次体の統合**

### C1. $\mathbb Q(\sqrt{13})$ のトレース行列と整数基底

$K=\mathbb Q(\sqrt{13})$、$w=(1+\sqrt{13})/2$ とする。

1. $w$ の最小多項式を求め、$w$ が整であることを示せ。
2. $\beta_1=1,\beta_2=w$ に対し $G_{ij}=\operatorname{Tr}_{K/\mathbb Q}(\beta_i\beta_j)$ を計算し、$\det G$ を求めよ。
3. トレース行列から $\mathcal O_K\subseteq(1/13)(\mathbb Z\beta_1+\mathbb Z\beta_2)$ を導け。
4. さらに $\mathcal O_K=\mathbb Z\beta_1\oplus\mathbb Z\beta_2$ を証明し、$\alpha=(3+\sqrt{13})/2$ と $\gamma=(1+2\sqrt{13})/2$ の整性を判定せよ。

- Level: C
- ID: ANF1-C1

<!-- solution-start -->
**詳細解答**

**(1)** $2w-1=\sqrt{13}$ から $4w^2-4w+1=13$ なので

$$
w^2-w-3=0.
$$

$w\notin\mathbb Q$ より $T^2-T-3$ はモニック最小多項式で、整数係数ゆえ $w$ は整です。

**(2)** 以後この解答では $\operatorname{Tr}=\operatorname{Tr}_{K/\mathbb Q}$ と略記します。$\operatorname{Tr}(1)=2$ は乗法写像 $\mu_1$ の行列が二次単位行列であるためです。次に $(1,w)$ を基底として $w^2=w+3$ を使うと

$$
\mu_w(1)=w=0\cdot1+1\cdot w,\qquad
\mu_w(w)=w^2=3\cdot1+1\cdot w.
$$

よってこの基底での乗法行列は

$$
[\mu_w]_{(1,w)}=\begin{pmatrix}0&3\\1&1\end{pmatrix},
\qquad \operatorname{Tr}(w)=0+1=1.
$$

さらに $\mu_{w^2}=\mu_w+3\mu_1$ なので、トレースの線形性から $\operatorname{Tr}(w^2)=1+3\cdot2=7$ です。従って

$$
G=\begin{pmatrix}2&1\\1&7\end{pmatrix},
\qquad \det G=14-1=13.
$$

**(3)** $\delta\in\mathcal O_K$ を $\delta=q_1\beta_1+q_2\beta_2$ と書きます。$\delta\beta_j$ は整なので [整数のトレースの補題](#lem-anf1-integral-trace)により $v_j=\operatorname{Tr}(\delta\beta_j)\in\mathbb Z$ です。$Gq=v$ を解くと

$$
\begin{pmatrix}q_1\\q_2\end{pmatrix}
=\frac1{13}
\begin{pmatrix}7&-1\\-1&2\end{pmatrix}
\begin{pmatrix}v_1\\v_2\end{pmatrix}.
$$

各 $q_i\in(1/13)\mathbb Z$ なので指定の包含が成立します。この包含だけでは $\mathcal O_K$ と $\mathbb Z[ w]$ の一致は言えません。

**(4)** $13$ は平方自由で $13\equiv1\pmod4$ だから、[二次体の整数環定理](#thm-anf1-quadratic-integers)から

$$
\mathcal O_K=\mathbb Z\oplus\mathbb Zw
$$

です。$\alpha=1+w$ は係数 $(1,1)$ が整数なので整です。実際 $\alpha^2-3\alpha-1=0$ とも計算できます。一方 $\gamma=(r+s\sqrt{13})/2$ の表示では $r=1,s=2$ となり、$r,s$ の偶奇が一致しません。従って二次体の定理から整ではありません。最小多項式を直接計算しても

$$
m_\gamma(T)=T^2-T-\frac{51}{4}
$$

となり非整数係数です。
<!-- solution-end -->

## 6. 次の講義へ

数体の整数環は、[代数的整数の定義](../../TRN/TRN1/index.md#def-trn1-algebraic-integer)から始まり、有限個の整数基底を持つ環であることまで示せました。ただし整数基底の取り方は体によって異なり、二次体では $d\bmod4$ で変わります。次の ANF2 では、ここで補助的に使った**トレース**を体系化し、ノルムと**判別式**によって整数基底の情報を読み取ります。
