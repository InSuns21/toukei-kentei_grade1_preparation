# ANF3 Dedekind環とイデアルの分解

[ANF1の二次体の整数環](../ANF1/index.md#thm-anf1-quadratic-integers)で見たように、$\mathbb Q(\sqrt{-5})$ の整数環は $\mathbb Z[\sqrt{-5}]$ です。ところが

$$
6=2\cdot3=(1+\sqrt{-5})(1-\sqrt{-5})
$$

という二通りの元の分解があり、いずれの因子も既約で、互いに同伴ではありません。整数で使えた「素数を数える」という方法を、数体でどう取り戻せるでしょうか。

[イデアルの積](../../RNG/RNG2/index.md#def-rng2-ideal-sum-product-comaximal)なら、一つの元の代わりに、その元で生成される集合全体を分解できます。本講の目標は、**元の一意分解とイデアルの一意分解を区別**し、後者が整数環で成り立つ理由を証明することです。そのために、整数環の有限生成性・整性・素イデアルの性質を組み合わせます。

以下、特に断らない限り環は $1\ne0$ をもつ可換環です。$K$ は有限次拡大 $K/\mathbb Q$、$\mathcal O_K$ は[数体の整数環](../ANF1/index.md#def-anf1-ring-of-integers)を表します。素イデアル・極大イデアルは[環論の定義](../../RNG/RNG2/index.md#def-rng2-prime-maximal)、イデアルの積は[環論の定義](../../RNG/RNG2/index.md#def-rng2-ideal-sum-product-comaximal)に従います。

<!-- definition-example-audit: strict -->

## 1. 何があれば素イデアルへの分解を期待できるか

整数環のイデアルは無限に増えていくように見えても、[Noether環](../../AG/AG1-05/index.md#def-ag1-05-noetherian-ring)ではすべて有限個の元で生成できます。一方、元の商を取ると整数環から分数体へ出ます。分数体の元がモニック方程式を満たす場合、元の環へ戻るという**整閉性**が重要になります。

整域 $A$ の分数体を $F$ とします。[整元の定義](../../AG/AG1-06/index.md#def-ag1-06-integral-element)を $A\subset F$ に適用すると、$x\in F$ の整性は $A$ 係数のモニック方程式で調べます。

$
x^r+a_{r-1}x^{r-1}+\cdots+a_0=0,
\qquad a_i\in A.
$

分数体の中でこの方程式を満たす元が必ず $A$ に戻る性質が、次の定義で必要になる**整閉性**です。

また、零でない素イデアルがすべて極大なら、素イデアルの真の包含鎖は $(0)\subsetneq\mathfrak p$ で止まります。体でない整域では、この条件が次元 $1$ に相当します。

この三条件をまとめるのが次の定義です。

<a id="def-anf3-dedekind-domain"></a>

<!-- formal-statement-start -->
> **定義（Dedekind整域）**  
> 整域 $A$ が Dedekind整域であるとは、次の三条件をすべて満たすことをいう。
>
> 1. $A$ は Noether環（すべてのイデアルが有限生成）である。
> 2. $A$ は分数体 $F=\operatorname{Frac}(A)$ の中で整閉である。すなわち $F$ の $A$ 上整な元は $A$ に属する。
> 3. $A$ の零でない素イデアルはすべて極大イデアルである（体でなければ Krull次元 $1$）。
<!-- formal-statement-end -->

<!-- definition-example-start: def-anf3-dedekind-domain -->
**定義の確認：$\mathbb Z$。** 任意のイデアルは $(n)$ なので有限生成です。既習の[有理数の整性判定](../ANF1/index.md#prop-anf1-rational-integers)より $\mathbb Q$ の $\mathbb Z$ 上整な元は整数で、整閉です。零でない素イデアルは素数 $p$ の $(p)$ に限られ、$\mathbb Z/(p)$ は体なので極大です。三条件が別々に確かめられました。
<!-- definition-example-end -->

$K$ の整数環でもこの三条件が成り立つことを示します。ここでは[整数基底の存在](../ANF1/index.md#thm-anf1-integral-basis)が、単なる基底の計算を超えて、イデアルの有限性を保証します。

<a id="thm-anf3-number-ring-dedekind"></a>

<!-- formal-statement-start -->
> **定理（数体の整数環は Dedekind整域）**  
> $K/\mathbb Q$ を任意の有限次拡大とし、$\mathcal O_K$ をその整数環とする。このとき $\mathcal O_K$ は Noether整域で、分数体 $K$ において整閉であり、零でない素イデアルはすべて極大である。したがって $\mathcal O_K$ は Dedekind整域である。
<!-- formal-statement-end -->

**証明の見取り図。** 整数基底によって Noether性を証明し、整性の推移性で整閉性を示します。最後に、素イデアルの零でない元のモニック最小多項式から、ある有理素数がそのイデアルに入ることを示します。すると商は有限整域となり、体になります。

<!-- proof-start -->
### 証明

**(1) Noether性。** $n=[K:\mathbb Q]$ とします。[整数環の有限生成性と整数基底](../ANF1/index.md#thm-anf1-integral-basis)により、加法群として次の同型があります。

$
\mathcal O_K\simeq\mathbb Z^n.
$

任意のイデアル $I\subseteq\mathcal O_K$ は $\mathbb Z^n$ の部分群なので、有限個の元 $a_1,\ldots,a_r$ で $\mathbb Z$ 加群生成されます。

これらの元が生成する $\mathcal O_K$ イデアルは $I$ に含まれ、また $I$ の全元を含みます。ゆえに $I=(a_1,\ldots,a_r)$ です。[有限生成とNoether性の同値](../../AG/AG1-05/index.md#prop-ag1-05-acc-finite-generation)より、$\mathcal O_K$ は Noether環です。

**(2) 整閉性。** $x\in K$ が $\mathcal O_K$ 上整だとします。$\mathcal O_K$ のすべての元は $\mathbb Z$ 上整なので、[整性の推移性](../../AG/AG1-06/index.md#prop-ag1-06-finite-generators)から $x$ は $\mathbb Z$ 上整です。[整数環の定義](../ANF1/index.md#def-anf1-ring-of-integers)により $x\in\mathcal O_K$ となります。

**(3) 零でない素イデアルは極大。** $0\ne\mathfrak p\subset\mathcal O_K$ を素イデアルとし、$0\ne\alpha\in\mathfrak p$ を取ります。[最小多項式による整性判定](../ANF1/index.md#thm-anf1-minimal-polynomial)により、$\alpha$ は整数係数のモニック最小多項式

$$
f(T)=T^r+c_{r-1}T^{r-1}+\cdots+c_1T+c_0
$$

を持ちます。$\alpha\ne0$ なので $c_0\ne0$ です。$f(\alpha)=0$ を移項すると

$$
0\ne c_0=-\alpha(\alpha^{r-1}+c_{r-1}\alpha^{r-2}+\cdots+c_1)\in\mathfrak p.
$$

ゆえに $\mathfrak p\cap\mathbb Z$ は $\mathbb Z$ の零でない素イデアルであり、ある有理素数 $p$ について $\mathfrak p\cap\mathbb Z=(p)$ です。商 $B=\mathcal O_K/\mathfrak p$ は、$\mathfrak p$ が素であるため[商整域](../../RNG/RNG2/index.md#thm-rng2-prime-quotient-domain)です。同時に $p=0$ が $B$ で成立し、整数基底の像が $B$ を $\mathbb F_p$ 上で張るので

$$
|B|\le p^n<\infty.
$$

有限整域の $0\ne b$ に対し、$B\to B,\ x\mapsto bx$ は単射であるため全射です。特に $bx=1$ となる $x$ が存在し、$B$ は体です。[商が体である極大イデアル判定](../../RNG/RNG2/index.md#thm-rng2-maximal-quotient-field)から $\mathfrak p$ は極大です。三条件が示されました。
<!-- proof-end -->

**例：非一意分解の整数環。** $K=\mathbb Q(\sqrt{-5})$ は[二次体の整数環定理](../ANF1/index.md#thm-anf1-quadratic-integers)から $\mathcal O_K=\mathbb Z[\sqrt{-5}]$ です。ここには $6$ の非一意分解がありますが、上の定理により Dedekind整域です。**Dedekind整域であることと、元の一意分解整域であることは同値ではありません。**

## 2. イデアルにも逆数を用意する

整数の $(6)$ は $(2)(3)$ と書けます。イデアルを積へ分けるには、途中で片方のイデアルを「割る」操作が必要です。しかし一般のイデアルには一つの生成元がありません。そこで、分数体の部分集合まで許すことにします。

整域 $A$ の分数体を $F$ とします。分母を一つ払うと整イデアルに戻るような $F$ の部分集合を考えれば、分数での積が可能になります。

<a id="def-anf3-fractional-ideal"></a>

<!-- formal-statement-start -->
> **定義（分数イデアル）**  
> 整域 $A$ と分数体 $F$ に対し、$0\ne J\subseteq F$ が分数イデアルであるとは、$J$ が $A$ 加群で、ある $d\in A\setminus\{0\}$ に対して $dJ\subseteq A$ となることをいう。$J\subseteq A$ のときは（非零）整イデアルという。分数イデアルの積 $IJ$ は有限和 $\sum_k x_ky_k$（$x_k\in I,y_k\in J$）全体である。
<!-- formal-statement-end -->

<!-- definition-example-start: def-anf3-fractional-ideal -->
**定義の確認。** $A=\mathbb Z$、$F=\mathbb Q$ なら $J=\frac16\mathbb Z$ は非零な $\mathbb Z$ 加群で、$6J=\mathbb Z$ です。したがって分数イデアルですが、$1/6\notin\mathbb Z$ のため整イデアルではありません。また $(2)\cdot\frac12\mathbb Z=\mathbb Z$ は積の定義から確かめられます。
<!-- definition-example-end -->

イデアル $I$ を掛けて $A$ に戻せる元を集めれば、逆数に相当するものを作れます。単に $I$ を集合として分母へ置くのではなく、すべての元との積を同時に制御するのがポイントです。

<a id="def-anf3-inverse-ideal"></a>

<!-- formal-statement-start -->
> **定義（イデアルの逆と可逆性）**  
> 整域 $A$ の非零な分数イデアル $I$ に対し、
>
> $$
> I^{-1}=\{x\in\operatorname{Frac}(A):xI\subseteq A\}
> $$
>
> と置く。$II^{-1}=A$ であるとき、$I$ を可逆分数イデアルという。
<!-- formal-statement-end -->

<!-- definition-example-start: def-anf3-inverse-ideal -->
**定義の確認。** $A=\mathbb Z$、$I=(6)$ なら、$xI\subseteq\mathbb Z$ は $6x\in\mathbb Z$ と同値なので $I^{-1}=\frac16\mathbb Z$。その積は $\mathbb Z$ です。反対に $I=\frac16\mathbb Z$ の場合は $I^{-1}=6\mathbb Z$ です。どちらも積が単位イデアルとなることまで確認できます。
<!-- definition-example-end -->

一般の整域では非零イデアルがすべて可逆とは限りません。次に Dedekind の三条件が、まさにこの可逆性を保証することを示します。

## 3. 一つの素イデアルの近くでは単項になる

大域的なイデアルを直接扱う代わりに、ある極大イデアル $\mathfrak p$ の外にある元をすべて分母に許します。[局所化の定義](../../AG/AG1-04/index.md#def-ag1-04-localization)で $S=A\setminus\mathfrak p$ と置き、

$$
A_{\mathfrak p}=S^{-1}A
=\left\{\frac as:a\in A,\ s\notin\mathfrak p\right\}
$$

を考えます。$\mathfrak p$ が素であるため $S$ は積で閉じ、$A$ が整域なので通常の分数として計算できます。$\mathfrak p A_{\mathfrak p}$ は唯一の極大イデアルで、分母と分子の両方が $\mathfrak p$ の外にある分数は単元です。これは[局所環の構成](../../AG/AG1-04/index.md#def-ag1-04-local-ring)の整域版です。

**手計算の例。** $\mathbb Z_{(3)}$ では $2$ は可逆なので $6\mathbb Z_{(3)}=3\mathbb Z_{(3)}$ です。一方 $1/3$ はこの局所環にありません。すなわち、素数 $3$ 以外の因子が消えて、$3$ の指数だけが残ります。

<a id="lem-anf3-local-principal"></a>

<!-- formal-statement-start -->
> **補題（Dedekind整域の局所単項性）**  
> $A$ を Dedekind整域、$\mathfrak p\ne(0)$ をその素イデアルとする。$R=A_{\mathfrak p}$、$\mathfrak m=\mathfrak pR$ と置くと、$R$ は Noetherな整閉局所整域であり、唯一の極大イデアルは $\mathfrak m=(\pi)$ と単項である。さらに $R$ のすべての非零整イデアルは一意な $e\ge0$ により $(\pi^e)$ と表される。
<!-- formal-statement-end -->

**証明の見取り図。** 任意の $0\ne a\in\mathfrak m$ のイデアルは、$\mathfrak m$ のある冪を含みます。そこから $t\notin R$ で $t\mathfrak m\subset R$ を作ります。もし $t\mathfrak m\subset\mathfrak m$ なら行列式から $t$ は整になり整閉性に反するので、$t\mathfrak m$ は単元を含み、$\mathfrak m$ は単項になります。

<!-- proof-start -->
### 証明

[Noether性の局所化による保存](../../AG/AG1-05/index.md#prop-ag1-05-quotient-localization)から $R$ は Noether です。$R$ の素イデアルは $\mathfrak p$ 以下の $A$ の素イデアルに対応します。$A$ の零でない素イデアルは極大なので、$R$ の素イデアルは $(0)$ と $\mathfrak m$ の二つだけです。

**整閉性も保存されます。** $y\in\operatorname{Frac}(R)$ が $R$ 上整なら、モニック方程式の有限個の係数に共通分母 $s\in A\setminus\mathfrak p$ を選んで

$$
y^r+\frac{b_{r-1}}s y^{r-1}+\cdots+\frac{b_0}s=0
\quad(b_i\in A)
$$

と書けます。両辺に $s^r$ を掛け、$z=sy$ と置くと

$$
z^r+b_{r-1}z^{r-1}+b_{r-2}sz^{r-2}
+\cdots+b_0s^{r-1}=0.
$$

したがって $z$ は $A$ 上整です。[Dedekind整域の定義](#def-anf3-dedekind-domain)の整閉性（第2条件）を $A$ 上整な $z$ に適用すると $z\in A$ であり、$y=z/s\in R$ です。

**極大イデアルの単項性。** $0\ne a\in\mathfrak m$ を取ります。$(a)$ を含む素イデアルは $\mathfrak m$ のみなので $\sqrt{(a)}=\mathfrak m$ です。Noether性により $\mathfrak m=(x_1,\ldots,x_k)$。各 $x_i$ は根基に属するため $x_i^{n_i}\in(a)$ となる $n_i\ge1$ があり、$N=1+\sum_i(n_i-1)$ とすれば、$N$ 個の生成元の積には必ず $x_i^{n_i}$ が含まれます。従って $\mathfrak m^N\subseteq(a)$ です。

この包含が成り立つ最小の $N\ge1$ を選びます。$N=1$ なら $(a)\subseteq\mathfrak m\subseteq(a)$ から $\mathfrak m=(a)$ です。$N>1$ なら $\mathfrak m^{N-1}\nsubseteq(a)$ なので $b\in\mathfrak m^{N-1}\setminus(a)$ を取れます。$t=b/a$ と置くと

$$
t\notin R,\qquad t\mathfrak m\subseteq R.
$$

もし $t\mathfrak m\subseteq\mathfrak m$ なら、生成元 $x_i$ に対して $tx_i=\sum_jc_{ij}x_j$（$c_{ij}\in R$）と書けます。行列 $C=(c_{ij})$ に対し

$$
(tI_k-C)(x_1,\ldots,x_k)^{\mathsf T}=0
$$

であり、余因子行列を掛ければ $\det(tI_k-C)x_i=0$ です。$\mathfrak m\ne0$ なので少なくとも一つの $x_i$ は非零、$R$ は整域だから $\det(tI_k-C)=0$。これは $t$ が $R$ 係数のモニック方程式を満たすことを意味します。整閉性から $t\in R$ となり矛盾します。

従って $t\mathfrak m\subseteq R$ は $\mathfrak m$ に含まれず、ある $x\in\mathfrak m$ について $u=tx\in R\setminus\mathfrak m=R^\times$ です。任意の $y\in\mathfrak m$ について $ty\in R$ なので

$$
\frac yx=\frac{ty}{tx}=\frac{ty}u\in R.
$$

ゆえに $\mathfrak m\subseteq xR$、逆包含は $x\in\mathfrak m$ から従い、$\mathfrak m=(x)$ です。これを $\pi=x$ と書きます。

**イデアルの冪表示。** $0\ne a\in R$ が非単元なら $a\in(\pi)$ なので $a=\pi a_1$。$a_1$ も非単元なら同じ操作を繰り返します。ただし上述の議論から $(\pi)^N\subseteq(a)$ となる $N$ が存在し、$\pi^N=ac$ と書けます。仮に $a=\pi^{N+1}b$ まで続けば、消去により $1=\pi bc$ となり、$\pi$ が非単元であることに矛盾します。よって操作は有限回で止まり、$a=u\pi^e$（$u$ は単元）となります。

非零イデアル $J$ の元の指数 $e$ には最小値があり、その指数の元 $u\pi^e\in J$ を選ぶと $\pi^e\in J$。一方 $J$ のすべての元は $\pi^e$ で割り切れるので $J=(\pi^e)$ です。$\pi$ は非単元で整域に属するから、$(\pi^e)=(\pi^f)$ は $e=f$ のときだけです。
<!-- proof-end -->

この補題は「一つの素イデアルに注目すると、その指数が自然数として読める」ことを与えます。ここで扱うのは $A_{\mathfrak p}$ のイデアルであって、元の $A$ のすべてのイデアルが単項になるという意味ではありません。

## 4. 局所的に割れることから大域的に可逆となる

<a id="prop-anf3-invertible-ideals"></a>

<!-- formal-statement-start -->
> **命題（非零分数イデアルの可逆性）**  
> $A$ を Dedekind整域とする。このとき $A$ の任意の非零分数イデアル $I$ は可逆であり、
>
> $$
> I I^{-1}=A
> $$
>
> が成り立つ。特に任意の非零整イデアルは可逆である。
<!-- formal-statement-end -->

**証明の見取り図。** 分数イデアルの逆の定義を各極大イデアルで局所化すると、局所単項性によって積が単位イデアルになります。もし大域で積が真のイデアルなら、それを含む極大イデアルが存在するはずなので矛盾します。

<!-- proof-start -->
### 証明

まず非零な整イデアル $I\subseteq A$ で示します。$0\ne a\in I$ を取ると、$x\in I^{-1}$ なら $xa\in A$ なので $I^{-1}\subseteq a^{-1}A$ です。また $1\in I^{-1}$ ですから $I^{-1}$ は非零分数イデアルです。

各極大イデアル $\mathfrak p$ で、次の局所化の等式を確認します。

$$
(I^{-1})_{\mathfrak p}=(I_{\mathfrak p})^{-1}.
$$

左辺の元 $x/s$ は $I$ のすべての元との積を $A_{\mathfrak p}$ に入れるため右辺に含まれます。逆に右辺の元 $y$ を取り、Noether性により $I=(a_1,\ldots,a_r)$ と書きます。各 $ya_i\in A_{\mathfrak p}$ だから $s_i\notin\mathfrak p$ で $s_iya_i\in A$ となるものがあります。$s=\prod_i s_i$ とすれば $syI\subseteq A$ なので $sy\in I^{-1}$、$y=(sy)/s\in(I^{-1})_{\mathfrak p}$ です。

[局所単項性](#lem-anf3-local-principal)から $I_{\mathfrak p}=(\pi^e)$（$e\ge0$）です。従ってその逆は $\pi^{-e}A_{\mathfrak p}$ で、

$$
(II^{-1})_{\mathfrak p}
=I_{\mathfrak p}(I^{-1})_{\mathfrak p}
=(\pi^e)(\pi^{-e})=A_{\mathfrak p}.
$$

積 $II^{-1}$ は定義により $A$ のイデアルです。もし $II^{-1}\ne A$ ならある極大イデアル $\mathfrak p$ に含まれ、その局所化は $\mathfrak pA_{\mathfrak p}$ に含まれます。これは上の等式と矛盾するので $II^{-1}=A$ です。

最後に分数イデアル $J$ に対し、定義から $dJ\subseteq A$ となる $0\ne d\in A$ を選びます。$I=dJ$ は非零整イデアルで、$J=d^{-1}I$ です。逆の定義から $J^{-1}=dI^{-1}$ となるので $JJ^{-1}=II^{-1}=A$ です。
<!-- proof-end -->

**大切な区別。** 可逆とは、分数イデアルを掛けたときに $A$ に戻るということです。イデアル自体が一つの元で生成できること（主イデアル）とは異なります。すべての非零イデアルが主イデアルなら元の一意分解へ近づきますが、Dedekind整域が保証するのは、まず**イデアルの可逆性**です。

## 5. 素イデアル分解の存在と一意性

ここまでの道具で、整数の素因数分解に対応する定理を証明できます。「素」は、元の素元ではなく[素イデアル](../../RNG/RNG2/index.md#def-rng2-prime-maximal)を指します。

<a id="thm-anf3-prime-ideal-factorization"></a>

<!-- formal-statement-start -->
> **定理（Dedekind整域の素イデアル分解）**  
> $A$ を Dedekind整域とする。任意の非零整イデアル $I$ は、相異なる非零素イデアル $\mathfrak p_1,\ldots,\mathfrak p_r$ と正整数 $e_1,\ldots,e_r$ によって
>
> $$
> I=\mathfrak p_1^{e_1}\cdots\mathfrak p_r^{e_r}
> $$
>
> と表せる。$\mathfrak p_i$ と $e_i$ の組は順序を除いて一意である。$I=A$ のときは空積とする。
<!-- formal-statement-end -->

**証明の見取り図。** 真のイデアル $I$ を含む極大イデアル $\mathfrak p$ を選び、可逆性を使って $I\mathfrak p^{-1}$ へ移ると、より大きな整イデアルになります。この操作を続けると Noether性によって止まります。一意性は、一つの素イデアルで局所化して指数だけを残すことで読み取ります。

<!-- proof-start -->
### 証明

**存在。** $I=A$ なら終了です。非零の真のイデアル $I$ を取ると、ある極大イデアル $\mathfrak p$ が $I\subseteq\mathfrak p$ を満たします。$\mathfrak p$ は非零なので[可逆性](#prop-anf3-invertible-ideals)から $\mathfrak p\mathfrak p^{-1}=A$ です。$J=I\mathfrak p^{-1}$ と置くと

$$
J\subseteq\mathfrak p\mathfrak p^{-1}=A,\qquad
I\subseteq J
$$

です。後者は $1\in\mathfrak p^{-1}$ から従います。

しかも包含は真です。$\mathfrak p$ で局所化すると、[局所単項性](#lem-anf3-local-principal)により $I_{\mathfrak p}=(\pi^e)$（$e\ge1$）、$\mathfrak pA_{\mathfrak p}=(\pi)$ です。従って

$$
J_{\mathfrak p}=(\pi^e)(\pi^{-1})=(\pi^{e-1})
\supsetneq(\pi^e)=I_{\mathfrak p}.
$$

よって $I\subsetneq J$ です。同じ操作を $J$ が真のイデアルである間繰り返すと、整イデアルの真の昇鎖ができます。[Noether環の昇鎖停止](../../AG/AG1-05/index.md#def-ag1-05-ideal-acc)により有限回で止まり、止まるのは $A$ のときだけです。逆向きに書けば $I$ は有限個の非零極大（従って素）イデアルの積になります。同じ素イデアルの出現をまとめれば定理の表示を得ます。

**一意性。** 二つの素イデアル積が等しいとします。任意の非零素イデアル $\mathfrak p$ を固定します。別の非零素イデアル $\mathfrak q\ne\mathfrak p$ は極大なので、$\mathfrak q\nsubseteq\mathfrak p$ です。

したがって $s\in\mathfrak q\setminus\mathfrak p$ が取れます。$s$ は $A_{\mathfrak p}$ で単元になるため、$\mathfrak qA_{\mathfrak p}=A_{\mathfrak p}$ です。

一方、$\mathfrak pA_{\mathfrak p}=(\pi)$ です。両分解を局所化すると、$\mathfrak p$ に対応する因子だけが残ります。

$
(\pi^{e_{\mathfrak p}})=(\pi^{f_{\mathfrak p}}).
$

[冪指数の一意性](#lem-anf3-local-principal)から $e_{\mathfrak p}=f_{\mathfrak p}$ です。各 $\mathfrak p$ で同じ比較をすれば、二つの分解の素イデアルと指数は一致します。
<!-- proof-end -->

元の因数分解では既約元が素元とは限りませんが、この定理は**非零整イデアルが非零素イデアルの積に一意に分解する**と保証します。次講では、これを有理素数 $(p)$ の数体での分解へ適用します。

## 6. $\mathbb Q(\sqrt{-5})$ で二つの分解を照合する

$s=\sqrt{-5}$、$A=\mathbb Z[s]$ とします。[整数環の二次体公式](../ANF1/index.md#thm-anf1-quadratic-integers)によって確かに $A=\mathcal O_{\mathbb Q(s)}$ です。ここで三つのイデアル

$$
\mathfrak p=(2,1+s),\qquad
\mathfrak q=(3,1+s),\qquad
\mathfrak q'=(3,1-s)
$$

を作ります。各括弧は $A$ のイデアル生成を表します。

$\mathfrak p$ で割ると $2=0,\ s=-1=1$ なので

$$
A/\mathfrak p\simeq\mathbb F_2.
$$

同様に $A/\mathfrak q\simeq\mathbb F_3$（$s=-1$）、$A/\mathfrak q'\simeq\mathbb F_3$（$s=1$）。これは $s^2=-5$ がそれぞれの剰余体でも成立することから矛盾しません。すなわち、例えば $\mathfrak q$ は準同型 $a+bs\mapsto a-b\bmod3$ の核です（$s^2=-5\equiv1\bmod3$）。従って三つはすべて極大かつ素で、$\mathfrak q\ne\mathfrak q'$ です。

まず $\mathfrak p^2$ の生成元を積から書くと

$$
\mathfrak p^2=(4,\,2+2s,\,(1+s)^2)
=(4,\,2+2s,\,-4+2s).
$$

すべて $2A$ に属し、一方 $(2+2s)-(-4+2s)=6$、$6-4=2$ も $\mathfrak p^2$ に属します。よって

$$
(2)=\mathfrak p^2.
$$

$\mathfrak q\mathfrak q'$ については $(1+s)(1-s)=6$ なので

$$
\mathfrak q\mathfrak q'=(9,\,3(1+s),\,3(1-s),\,6).
$$

生成元はすべて $3A$ に属し、$9-6=3$ が積に属するので

$$
(3)=\mathfrak q\mathfrak q'.
$$

この二つから

$$
(6)=\mathfrak p^2\mathfrak q\mathfrak q'.
$$

他方、$(1+s)\subseteq\mathfrak p\cap\mathfrak q$ です。相異なる極大イデアルは互いに素なので、[互いに素なイデアルの積と交わり](../../RNG/RNG2/index.md#prop-rng2-comaximal-intersection-product)から $\mathfrak p\cap\mathfrak q=\mathfrak p\mathfrak q$。さらに[中国剰余定理](../../RNG/RNG2/index.md#thm-rng2-crt-two)より

$$
|A/\mathfrak p\mathfrak q|
=|A/\mathfrak p|\,|A/\mathfrak q|=2\cdot3=6.
$$

一方、[数体のノルム](../ANF2/index.md#def-anf2-field-norm)は $N_{K/\mathbb Q}(1+s)=1+5=6$ です。整数基底 $(1,s)$ での乗法行列

$$
[\mu_{1+s}]_{(1,s)}=
\begin{pmatrix}1&-5\\1&1\end{pmatrix}
$$

の行列式は $6$ です。[整数格子の指数と行列式](../ANF2/index.md#thm-anf2-discriminant-index)と同じ基底座標の議論から $|A/(1+s)|=6$。包含された二つのイデアルの商の位数が同じなので

$$
(1+s)=\mathfrak p\mathfrak q.
$$

同じ計算を $s\mapsto-s$ に移せば $(1-s)=\mathfrak p\mathfrak q'$ です。したがって

$$
(2)(3)=\mathfrak p^2\mathfrak q\mathfrak q'
=(1+s)(1-s).
$$

四つの因子がすべて既約であることも確かめます。[跡・ノルムの演算則と整性](../ANF2/index.md#prop-anf2-trace-norm-properties)によりノルムは積を保ちます。非単元のノルムは $1$ より大きい正整数です。一方、

$
N(a+bs)=a^2+5b^2
$

なので、このノルムが $2$ や $3$ になる整数の組は存在しません。

四因子のノルムは $N(2)=4$、$N(3)=9$、$N(1+s)=N(1-s)=6$ です。非単元への分解があるなら、それぞれのノルムは $2\cdot2$、$3\cdot3$、$2\cdot3$ に分かれる必要があります。しかしノルム $2,3$ の元がないので不可能です。

単元のノルムは $1$ であり、$a^2+5b^2=1$ の解から単元は $\pm1$ に限られます。また四因子はノルムが異なるか、$1+s\ne\pm(1-s)$ により同伴でもありません。従って冒頭の二つは異なる既約元分解です。

**元の分解が壊れた仕組み。** $\mathfrak p$ は主イデアルではありません。もし $\mathfrak p=(a+bs)$（$a,b\in\mathbb Z$）なら、上と同じ指数計算と[跡・ノルムの演算則と整性](../ANF2/index.md#prop-anf2-trace-norm-properties)から

$$
2=|A/\mathfrak p|
=|N_{K/\mathbb Q}(a+bs)|=a^2+5b^2
$$

が必要です。しかし $b=0$ なら $a^2=2$、$|b|\ge1$ なら右辺は $5$ 以上で、整数解はありません。つまり分解が一意でない原因は、素イデアルが存在しないことではなく、**素イデアルが主イデアルとは限らないこと**です。

## 7. 演習：元ではなくイデアルを分解する

問題ではイデアルの生成と積を区別し、途中で利用する既出定理の仮定を確認してください。

**Level A：三条件・局所化・分数イデアルの基本**

### A1. $\mathbb Z$ の三条件

$\mathbb Z$ が Dedekind整域の三条件を満たすことを、イデアル、整性、非零素イデアルに分けて説明せよ。

- Level: A
- ID: ANF3-A1

<!-- solution-start -->
**詳細解答**　$\mathbb Z$ のイデアルは $(n)$ なので全て一元生成、従って Noether環です。[有理数の整性判定](../ANF1/index.md#prop-anf1-rational-integers)から、$\mathbb Q$ の元が整数係数モニック方程式を満たすなら整数なので整閉です。非零素イデアルは $(p)$（$p$ 素数）であり、$\mathbb Z/(p)=\mathbb F_p$ は体、ゆえに各 $(p)$ は極大です。[Dedekindの三条件](#def-anf3-dedekind-domain)が全て成立します。
<!-- solution-end -->

### A2. 整数のイデアル分解

$\mathbb Z$ の整イデアル $(60)$ を非零素イデアルの冪積に分解し、一意性の判定方法を述べよ。

- Level: A
- ID: ANF3-A2

<!-- solution-start -->
**詳細解答**　整数の積と主イデアルの積は $(a)(b)=(ab)$ です。$60=2^2\cdot3\cdot5$ なので

$$
(60)=(2)^2(3)(5).
$$

$(2),(3),(5)$ は素かつ極大です。[素イデアル分解の一意性](#thm-anf3-prime-ideal-factorization)で他の非零素イデアルを加えたり指数を変えたりできません。具体的にも、各 $(p)$ で局所化すると $p$ 以外の素数は単元となり、指数 $2,1,1$ がそれぞれ残ります。
<!-- solution-end -->

### A3. 分数イデアルの逆

$A=\mathbb Z$、$I=6\mathbb Z$ とする。定義から $I^{-1}$ を決め、$II^{-1}=A$ を確認せよ。

- Level: A
- ID: ANF3-A3

<!-- solution-start -->
**詳細解答**　$F=\mathbb Q$ で

$$
I^{-1}=\{x\in\mathbb Q:6xn\in\mathbb Z\text{ for all }n\in\mathbb Z\}.
$$

$n=1$ を代入すると必要条件は $6x\in\mathbb Z$。この条件なら任意の $n$ に対しても $6xn\in\mathbb Z$ なので十分です。したがって $I^{-1}=\frac16\mathbb Z$ です。積は $6m\cdot(n/6)=mn$ の有限和で、$m=n=1$ により $1$ を含むから $II^{-1}=\mathbb Z$ です。
<!-- solution-end -->

### A4. 非主素イデアルの候補

$A=\mathbb Z[\sqrt{-5}]$、$\mathfrak p=(2,1+\sqrt{-5})$ とする。$A/\mathfrak p\simeq\mathbb F_2$ を示し、$\mathfrak p$ が非零素イデアルであると結論せよ。

- Level: A
- ID: ANF3-A4

<!-- solution-start -->
**詳細解答**　$s=\sqrt{-5}$ と置き、$\varphi:A\to\mathbb F_2$ を $\varphi(a+bs)=a+b\bmod2$ と定めます。$s^2=-5$ の像は $1=-5\bmod2$ に一致するので、$\varphi$ は環準同型です。$\varphi(2)=0$、$\varphi(1+s)=0$ だから $\mathfrak p\subseteq\ker\varphi$。逆に $\varphi(a+bs)=0$ は $a+b$ が偶数ということです。このとき

$$
a+bs=(a-b)+b(1+s)
$$

で $a-b$ も偶数なので $\ker\varphi\subseteq(2,1+s)$ です。従って核が $\mathfrak p$、像は $\mathbb F_2$ 全体なので $A/\mathfrak p\simeq\mathbb F_2$。商が体だから $\mathfrak p$ は極大、従って非零素イデアルです。
<!-- solution-end -->

**Level B：局所から大域へ証明を組み立てる**

### B1. 異なる極大イデアルを区別する

Dedekind整域 $A$ の相異なる非零素イデアル $\mathfrak p,\mathfrak q$ に対し、$\mathfrak qA_{\mathfrak p}=A_{\mathfrak p}$ を示せ。また $A=\mathbb Z$、$\mathfrak p=(3),\mathfrak q=(5)$ で具体的な単元を示せ。

- Level: B
- ID: ANF3-B1

<!-- solution-start -->
**詳細解答**　[Dedekind整域の定義](#def-anf3-dedekind-domain)から、非零素イデアル $\mathfrak p,\mathfrak q$ は極大です。もし $\mathfrak q\subseteq\mathfrak p$ なら極大性から両者は等しくなり、仮定と矛盾します。

そこで $s\in\mathfrak q\setminus\mathfrak p$ を取ります。[局所化の定義](../../AG/AG1-04/index.md#def-ag1-04-localization)により $1/s\in A_{\mathfrak p}$ です。$\mathfrak qA_{\mathfrak p}$ には $s$ が属するため、

$
1=(1/s)s\in\mathfrak qA_{\mathfrak p}.
$

したがって $\mathfrak qA_{\mathfrak p}=A_{\mathfrak p}$ です。整数の例では $5\notin(3)$ なので $1/5\in\mathbb Z_{(3)}$ が存在し、$(5)\mathbb Z_{(3)}=\mathbb Z_{(3)}$ となります。
<!-- solution-end -->

### B2. 素イデアルの平方を計算する

$A=\mathbb Z[\sqrt{-5}]$、$\mathfrak p=(2,1+\sqrt{-5})$ に対して $\mathfrak p^2=(2)$ を、積の生成元をすべて書くことで示せ。

- Level: B
- ID: ANF3-B2

<!-- solution-start -->
**詳細解答**　$s^2=-5$ を使うと

$$
(1+s)^2=1+2s+s^2=-4+2s.
$$

[イデアルの積](../../RNG/RNG2/index.md#def-rng2-ideal-sum-product-comaximal)の定義から

$$
\mathfrak p^2=(4,\,2+2s,\,-4+2s).
$$

三つとも $2A$ に属するので $\mathfrak p^2\subseteq(2)$。一方 $(2+2s)-(-4+2s)=6$ と $4$ は $\mathfrak p^2$ にあり、差の $2=6-4$ も属します。従って $(2)\subseteq\mathfrak p^2$ で、両包含から等号が成立します。
<!-- solution-end -->

### B3. 局所指数の計算

$A=\mathbb Z$、$\mathfrak p=(3)$、$I=(108)$ とする。$I_{\mathfrak p}$ を $(3^e)$ と表し、$e$ を決めよ。また $I_{\mathfrak p}$ に $(2)$ と $(5)$ の素イデアル因子が現れない理由を説明せよ。

- Level: B
- ID: ANF3-B3

<!-- solution-start -->
**詳細解答**　$108=2^2\cdot3^3$ です。$\mathbb Z_{(3)}$ では分母に $3$ の倍数でない整数を許すので $2$ は単元であり、その平方 $4$ も単元です。従って

$$
I_{\mathfrak p}=108\mathbb Z_{(3)}
=3^3\mathbb Z_{(3)}.
$$

[局所単項性と冪指数の一意性](#lem-anf3-local-principal)から $e=3$ です。$(2)$ と $(5)$ はいずれも $(3)$ と異なる極大イデアルなので、局所化後には $1$ を含み単位イデアルになります。したがって分解に残るのは $(3)$ の指数だけです。
<!-- solution-end -->

### B4. 主イデアルの指数と体ノルム

数体 $K/\mathbb Q$ の整数環 $A=\mathcal O_K$ と $0\ne\alpha\in A$ に対し、整数基底と乗法写像を使って

$$
|A/(\alpha)|=|N_{K/\mathbb Q}(\alpha)|
$$

を証明せよ。

- Level: B
- ID: ANF3-B4

<!-- solution-start -->
**詳細解答**　[整数環の有限生成性と整数基底](../ANF1/index.md#thm-anf1-integral-basis)により $A=\bigoplus_{i=1}^n\mathbb Z\omega_i$ です。$\alpha\omega_j\in A$ なので、$\alpha\omega_j=\sum_i m_{ij}\omega_i$（$m_{ij}\in\mathbb Z$）と一意に書けます。$M=(m_{ij})$ は $K$ 上の乗法写像 $\mu_\alpha$ の、この整数基底に関する行列です。$\alpha\ne0$ なので $\mu_\alpha$ は可逆、$\det M\ne0$ です。

$(\alpha)=\alpha A$ の基底座標は $M\mathbb Z^n$ だから

$$
A/(\alpha)\simeq\mathbb Z^n/M\mathbb Z^n.
$$

[指数と整数行列の行列式](../ANF2/index.md#thm-anf2-discriminant-index)の証明の対角化計算をこの $M$ に適用すると、商の位数は $|\det M|$ です。[数体のノルムの定義](../ANF2/index.md#def-anf2-field-norm)から $\det M=N_{K/\mathbb Q}(\alpha)$。従って所望の等式が成立します。
<!-- solution-end -->

**Level C：非一意分解の原因をイデアルで完全に説明する**

### C1. $6$ と $1\pm\sqrt{-5}$ のイデアル分解

$A=\mathbb Z[\sqrt{-5}]$、$s=\sqrt{-5}$ とし、

$$
\mathfrak p=(2,1+s),\quad
\mathfrak q=(3,1+s),\quad
\mathfrak q'=(3,1-s)
$$

を考える。

1. $\mathfrak p,\mathfrak q,\mathfrak q'$ が相異なる極大イデアルで、商の位数がそれぞれ $2,3,3$ であることを示せ。
2. $(2)=\mathfrak p^2$、$(3)=\mathfrak q\mathfrak q'$ を示せ。
3. $(1+s)=\mathfrak p\mathfrak q$、$(1-s)=\mathfrak p\mathfrak q'$ を示し、$(6)$ の分解が一致することを確認せよ。
4. $\mathfrak p$ が非主イデアルであることを示し、元の因数分解と矛盾しない理由を説明せよ。

- Level: C
- ID: ANF3-C1

<!-- solution-start -->
**詳細解答**

**(1)** $a+bs\mapsto a+b\bmod2$ の核は $\mathfrak p$ です（A4の表示では $a+bs=(a-b)+b(1+s)$）。同様に $a+bs\mapsto a-b\bmod3$ の核は $\mathfrak q$、$a+bs\mapsto a+b\bmod3$ の核は $\mathfrak q'$ です。$s^2=-5$ は $\mathbb F_3$ で $1$ になり、$s\mapsto\pm1$ の両方が関係式を保ちます。従って各商は $\mathbb F_2,\mathbb F_3,\mathbb F_3$ で極大です。$\mathfrak q$ では $s=-1$、$\mathfrak q'$ では $s=1$ であり、$1\ne-1$ が $\mathbb F_3$ で成立する なので両者は異なります。また $\mathfrak p$ は商の標数が $2$ なので他二つと異なります。

**(2)** $\mathfrak p^2=(4,2+2s,-4+2s)$。全生成元は $(2)$ に属し、$6=(2+2s)-(-4+2s)$ と $4$ の差から $2\in\mathfrak p^2$ を得るので $\mathfrak p^2=(2)$。一方

$$
\mathfrak q\mathfrak q'=(9,3+3s,3-3s,6).
$$

右辺の全生成元は $(3)$ に属し、$3=9-6$ も属するので $\mathfrak q\mathfrak q'=(3)$ です。

**(3)** $1+s$ は $\mathfrak p$ と $\mathfrak q$ に属します。(1) の相異なる極大性と[互いに素なイデアルの積と交わり](../../RNG/RNG2/index.md#prop-rng2-comaximal-intersection-product)から

$$
(1+s)\subseteq\mathfrak p\cap\mathfrak q=\mathfrak p\mathfrak q.
$$

[中国剰余定理](../../RNG/RNG2/index.md#thm-rng2-crt-two)で $|A/\mathfrak p\mathfrak q|=2\cdot3=6$。B4で証明した、[整数基底での行列式による指数計算](../ANF2/index.md#thm-anf2-discriminant-index)を使い、乗法行列を作ります：

$$
[\mu_{1+s}]=\begin{pmatrix}1&-5\\1&1\end{pmatrix},
\qquad |\det[\mu_{1+s}]|=6.
$$

従って $|A/(1+s)|=6$ です。包含する二つのイデアルの指数が同じなので $(1+s)=\mathfrak p\mathfrak q$。$s\mapsto-s$ は環の自己同型で $\mathfrak p$ を固定し $\mathfrak q$ と $\mathfrak q'$ を交換するので $(1-s)=\mathfrak p\mathfrak q'$。よって

$$
(1+s)(1-s)=\mathfrak p^2\mathfrak q\mathfrak q'=(2)(3)=(6).
$$

**(4)** $\mathfrak p=(\alpha)$ が成り立つなら、$\alpha=a+bs$（$a,b\in\mathbb Z$）に対して B4 の公式で

$$
2=|A/\mathfrak p|=|N(\alpha)|=a^2+5b^2
$$

が必要です。$b\ne0$ なら右辺は少なくとも $5$、$b=0$ なら $a^2=2$ は整数解を持ちません。従って $\mathfrak p$ は非主です。[素イデアル分解の一意性](#thm-anf3-prime-ideal-factorization)が対象にするのはイデアルであり、元を主イデアルへ写すと非主素イデアルの情報が現れます。元 $2,3,1+s,1-s$ の積表示が異なっても、対応するイデアルの素分解は同一で、矛盾しません。
<!-- solution-end -->

## 8. 次講への橋

本講の結論は、$\mathcal O_K$ ではすべての非零イデアルが可逆で、非零素イデアルへの分解が存在し一意であることです。次の ANF4 では有理素数 $p$ の主イデアル $(p)$ を分解し、どの素イデアルが何回現れ、その商がどの大きさの有限体になるかを計算します。
