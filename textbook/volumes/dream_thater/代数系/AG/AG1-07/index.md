# AG1-07 弱・強Hilbertの零点定理

前章の[Noether正規化](../AG1-06/index.md#thm-ag1-06-noether-normalization)では、有限生成の代数を多項式環の上の有限加群として表せました。しかし、それだけでは連立多項式方程式が**本当に点を持つか**は分かりません。例えば複素数上で $x^2+1=0$ は解けますが、実数上では解けません。また $x^2=0$ と $x=0$ は同じ零点集合なのに、イデアル $(x^2)$ と $(x)$ は異なります。

この二つの問題を分けて解決します。まず「方程式系が矛盾するのは、式を多項式係数で組み合わせて $1$ を作れるときに限る」という**弱Hilbertの零点定理**を証明します。次に「すべての共通零点で消える多項式は、ある冪が元のイデアルに入る」という**強Hilbertの零点定理**を証明します。後者が、図形から復元できる代数情報を正確に記述します。

以下、特に断らない限り $k$ は**代数閉体**（具体的には $k=\mathbb C$ としてよい）、$n\ge1$、$R=k[x_1,\ldots,x_n]$ とし、すべての環は単位的可換環です。代数閉体とは、$k[T]$ の次数が正の任意の多項式が $k$ に根を持つ体です。一般の体で成立する箇所は区別します。[共通零点集合](../AG1-01/index.md#def-ag1-01-affine-zero-set) $V_k(J)$ と[消滅イデアル](../AG1-01/index.md#def-ag1-01-vanishing-ideal) $I_k(X)$ を使います。空集合上ですべての点に関する条件は真なので $I_k(\varnothing)=R$ です。

## 1. 最大イデアルはなぜ点を表すのか

一点 $a=(a_1,\ldots,a_n)\in k^n$ を固定すると、評価写像 $R\to k$、$p\mapsto p(a)$ は全射で、核は $(x_1-a_1,\ldots,x_n-a_n)$ です。後者の商が体 $k$ になるので、[極大イデアルと商体の判定](../../RNG/RNG2/index.md#thm-rng2-maximal-quotient-field)から極大です。問題は**これ以外の極大イデアルがあるか**です。

例えば $k[x,y]$ の $(x-2,y+3)$ は $(2,-3)$ に対応します。一方、実数上の $(x^2+1)$ は、$\mathbb R[x]/(x^2+1)$ が体となるため極大ですが、実数の点には対応しません。これを排除するのが代数閉性です。

極大イデアル $\mathfrak m$ に対して $K=R/\mathfrak m$ と置けば $K$ は体であり、$x_i$ の剰余類で $k$ 代数として生成されます。ここで必要な「有限個の元で生成された体は、代数閉体上では新しい元を含まない」という補題を証明します。

<a id="lem-ag1-07-zariski-lemma"></a>

<!-- formal-statement-start -->
> **補題（有限生成体の補題）**  
> $k$ を代数閉体とし、$K$ を $k$ を部分体として含む体とする。$K=k[b_1,\ldots,b_r]$ として有限個の元から **$k$ 代数として**生成されるなら、$K=k$ である。
<!-- formal-statement-end -->

### 証明の見取り図

有限**体拡大**と有限生成**代数**は同じ意味ではありません。そこで[Noether正規化](../AG1-06/index.md#thm-ag1-06-noether-normalization)を使い、$K$ を $k[t_1,\ldots,t_d]$ 上の有限加群にします。もし $d\ge1$ なら、体 $K$ にある $t_1^{-1}$ もこの多項式環上で整となります。しかし、それは $1$ が $t_1$ の倍数になることを強制し、矛盾します。

<!-- proof-start -->
### 証明

$K$ は零でない有限生成可換 $k$ 代数なので、[Noether正規化](../AG1-06/index.md#thm-ag1-06-noether-normalization)により、代数的独立な $t_1,\ldots,t_d\in K$ が存在し、$A=k[t_1,\ldots,t_d]\subseteq K$ で $K$ は有限 $A$ 加群です。特に[整元の有限加群判定](../AG1-06/index.md#prop-ag1-06-integral-finite-single)から、$K$ のすべての元は $A$ 上整です。

$d\ge1$ と仮定します。代数的独立性から $t_1\ne0$、また $K$ は体なので $u=t_1^{-1}\in K$ です。整性より、ある $m\ge1$ と $c_0,\ldots,c_{m-1}\in A$ に対し

$$
u^m+c_{m-1}u^{m-1}+\cdots+c_1u+c_0=0
$$

です。両辺に $t_1^m$ を掛けて $u=t_1^{-1}$ を代入すると

$$
1+c_{m-1}t_1+c_{m-2}t_1^2+\cdots+c_0t_1^m=0
$$

となります。この等式はすべての項が $A$ に属するので $A$ 内の等式です。$A$ は代数的独立性により本当に $k[T_1,\ldots,T_d]$ に同型です。従って $T_1=0$ と代入する環準同型 $A\to k[T_2,\ldots,T_d]$ を適用できます。左辺は $1$、右辺は $0$ となり、$1=0$ という矛盾を得ます。ゆえに $d=0$ です。

$d=0$ なら $A=k$ で、$K$ は有限次元 $k$ ベクトル空間です。任意の $\alpha\in K$ について、$1,\alpha,\ldots,\alpha^N$ は $N=\dim_kK$ とすれば線形従属です。従って非零の $p(T)\in k[T]$ が存在し $p(\alpha)=0$ となります。$k$ は代数閉体なので、$p(T)=c\prod_j(T-a_j)$ と一次式へ分解します。$K$ は体ゆえ零因子を持たず、

$$
0=p(\alpha)=c\prod_j(\alpha-a_j)
$$

ならある $j$ で $\alpha-a_j=0$ です。従って $\alpha\in k$ です。$K$ の全元が $k$ に入り、$k\subseteq K$ なので $K=k$ です。
<!-- proof-end -->

この補題には「$K$ が有限個の元から**体として**生成される」だけでは不足します。例えば $k(t)$ は $t$ を加えた生成体ですが、$k$ 上の有限生成**代数**ではありません。$t$ の逆数以外にも $(t-a)^{-1}$ などが必要になるからです。逆元が全部あることと、有限個の代数生成元で済むことの衝突が証明の核心です。

<a id="prop-ag1-07-maximal-points"></a>

<!-- formal-statement-start -->
> **命題（代数閉体上の多項式環の極大イデアル）**  
> $k$ が代数閉体なら、$k[x_1,\ldots,x_n]$ の極大イデアルは、点 $a=(a_1,\ldots,a_n)\in k^n$ に対する
>
$$
\mathfrak m_a=(x_1-a_1,\ldots,x_n-a_n)
$$
>
> に限る。対応する点 $a$ は一意である。
<!-- formal-statement-end -->

### 証明の見取り図

極大イデアルで割った商は体です。その商は座標の剰余類を有限個の生成元とする代数なので、直前の補題から $k$ 自身になります。座標の剰余類がどの定数に当たるかを読めば点が得られます。

<!-- proof-start -->
### 証明

$\mathfrak m\subset R$ を極大イデアルとすると、[極大イデアルと商体の判定](../../RNG/RNG2/index.md#thm-rng2-maximal-quotient-field)から $K=R/\mathfrak m$ は体です。$k\to K$ は単位元を保つ体の準同型なので単射です。さらに $K$ は $\overline{x}_1,\ldots,\overline{x}_n$ によって $k$ 代数として生成されます。[有限生成体の補題](#lem-ag1-07-zariski-lemma)を適用すると $K=k$ です。

従って各 $\overline{x}_i$ はある一意な $a_i\in k$ と一致し、$x_i-a_i\in\mathfrak m$ です。ゆえに $\mathfrak m_a\subseteq\mathfrak m$。一方、任意の $p\in R$ について

$$
p(x_1,\ldots,x_n)-p(a_1,\ldots,a_n)\in\mathfrak m_a
$$

です。実際、各単項式 $x_1^{e_1}\cdots x_n^{e_n}$ と定数 $a_1^{e_1}\cdots a_n^{e_n}$ の差は、一つずつ $x_i$ を $a_i$ に取り替えた差の和に分解でき、各差は $x_i-a_i$ で割り切れます。従って評価写像の核は $\mathfrak m_a$ で、$R/\mathfrak m_a\simeq k$ です。よって $\mathfrak m_a$ も極大であり、極大イデアルの包含 $\mathfrak m_a\subseteq\mathfrak m$ は等号になります。

点の一意性は、$\mathfrak m_a=\mathfrak m_b$ のとき $x_i-a_i$ を $b$ で評価すると $b_i-a_i=0$ となることから従います。逆に任意の $a$ に対して商 $R/\mathfrak m_a\simeq k$ なので $\mathfrak m_a$ は極大です。
<!-- proof-end -->

## 2. 弱Hilbertの零点定理：解の存在を代数で判定する

方程式 $g_1=\cdots=g_s=0$ に解がないことを、無限に点を探す代わりに有限個の式の関係で示せるでしょうか。例えば $x=0$ と $xy-1=0$ は同時には成り立ちませんが、式の側でも

$$
1=yx-(xy-1)
$$

という恒等式があり、$1\in(x,xy-1)$ です。解に代入すると左辺 $1$ と右辺 $0$ が矛盾するので、$1$ がイデアルに入れば解はありません。難しいのは逆向きです。

<a id="thm-ag1-07-weak-nullstellensatz"></a>

<!-- formal-statement-start -->
> **定理（弱Hilbertの零点定理）**  
> $k$ を代数閉体、$R=k[x_1,\ldots,x_n]$、$J\subseteq R$ をイデアルとする。このとき
>
$$
V_k(J)=\varnothing\quad\Longleftrightarrow\quad J=R.
$$
>
> 特に、真のイデアル $J\ne R$ は $k^n$ に共通零点を持つ。
<!-- formal-statement-end -->

### 証明の見取り図

$J=R$ なら $1\in J$ ですから、零点はありません。逆に $J$ が真なら、[Hilbertの基底定理](../AG1-05/index.md#thm-ag1-05-hilbert-basis)を使って極大イデアルを $J$ の上に選びます。極大イデアルが点に対応することは前節で示しました。

<!-- proof-start -->
### 証明

$J=R$ なら $1\in J$ です。どの点 $a\in k^n$ でも定数多項式 $1$ は $1(a)=1\ne0$ なので $V_k(J)=\varnothing$ です。

逆に $J\ne R$ とします。体 $k$ はNoether環なので、[Hilbertの基底定理](../AG1-05/index.md#thm-ag1-05-hilbert-basis)を $n$ 回適用すれば $R$ はNoether環です。[昇鎖条件と極大元の同値性](../AG1-05/index.md#prop-ag1-05-acc-finite-generation)を、$J$ を含む真のイデアル全体（少なくとも $J$ を含む）に適用すると、その中の極大元 $\mathfrak m$ が存在します。$\mathfrak m$ より真に大きい真のイデアルがあればこの集合内に属して矛盾するので、$\mathfrak m$ は $R$ の極大イデアルです。

[極大イデアルと点の対応](#prop-ag1-07-maximal-points)により、ある $a\in k^n$ が存在して $\mathfrak m=\mathfrak m_a$ です。$g\in J$ なら $g\in\mathfrak m_a$ なので $g(a)=0$ です。すべての $g\in J$ について成り立つため $a\in V_k(J)$ となります。従って $V_k(J)\ne\varnothing$ です。対偶を取って目的の同値が従います。
<!-- proof-end -->

この定理は**代数閉性が必要**です。$\mathbb R[x]$ の真のイデアル $(x^2+1)$ は実数上に共通零点を持ちません。逆に $k=\mathbb C$ なら任意の非定数一変数多項式には根があるので、少なくとも一変数ではその違いが直接見えます。多変数では上の極大イデアルの議論が、この「必ず点がある」を保証しています。

## 3. 強Hilbertの零点定理：零点で消える式はどこまで回収できるか

[消滅イデアルが根基的であること](../AG1-01/index.md#prop-ag1-01-vanishing-ideal-radical)はすでに示しました。例えば $V_k(x^2)=V_k(x)$ なので、零点集合から $(x^2)$ をそのまま復元することはできません。代わりに、ある正の冪が $J$ に入る式すべてを集めます。この操作が、図形から復元する際の正確な答えです。

<a id="def-ag1-07-ideal-radical"></a>

<!-- formal-statement-start -->
> **定義（イデアルの根基）**  
> 可換環 $R$ のイデアル $J$ に対し、次の集合を $J$ の**根基**と書く。
>
$$
\sqrt J=\{f\in R:\text{ある整数 }m\ge1\text{ で }f^m\in J\}.
$$
>
> $J=\sqrt J$ のとき $J$ は[根基的イデアル](../AG1-01/index.md#def-ag1-01-radical-ideal)である。
<!-- formal-statement-end -->

<!-- definition-example-start: def-ag1-07-ideal-radical -->
**定義の確認**：$R=k[x]$、$J=(x^2)$ なら $x^2\in J$ なので $x\in\sqrt J$ です。従って $(x)\subseteq\sqrt J$。逆に $f^m\in(x^2)\subseteq(x)$ なら $f(0)^m=0$、体では $f(0)=0$ です。[多項式除法](../../RNG/RNG4/index.md#thm-rng4-division-algorithm)から $f=xq$ なので $f\in(x)$ です。よって $\sqrt{(x^2)}=(x)$ となります。
<!-- definition-example-end -->

根基は実際にイデアルです。$f^m,g^\ell\in J$ なら、$(f+g)^{m+\ell-1}$ の各項は $f$ の指数が $m$ 以上、または $g$ の指数が $\ell$ 以上なので、どの項も $J$ に入ります。$r\in R$ について $(rf)^m=r^mf^m\in J$ です。また $J\subseteq\sqrt J$ で、$\sqrt J$ は[根基的イデアル](../AG1-01/index.md#def-ag1-01-radical-ideal)です。実際 $(h^q)^m=h^{qm}\in J$ なら $h\in\sqrt J$ となります。以上は代数閉性に関係なく任意の可換環で成立します。

$J\subseteq I_k(V_k(J))$ と、$f^m\in J$ ならすべての共通零点で $f(a)^m=0$ となることから、常に $\sqrt J\subseteq I_k(V_k(J))$ です。逆の包含には「解の不在」を扱う弱零点定理を使います。

### Rabinowitschの技巧：消えない式を逆元にする

$f$ が $J$ のすべての共通零点で消えるとします。新変数 $u$ を導入し、元の方程式に $uf-1=0$ を追加します。元の零点では $f=0$ なので $uf-1=-1$ となり、追加した方程式系には共通零点がありません。弱零点定理によって、そのイデアルは $1$ を含みます。形式的には $u=1/f$ と置きたくなりますが、**商環 $R/J$ における $f$ の像は零因子や冪零元になり得る**ので、元の商環で無条件に割ることはできません。局所化の等式を商環へ戻す際に、さらに $f$ の冪を掛ける操作が必要です。

<a id="thm-ag1-07-strong-nullstellensatz"></a>

<!-- formal-statement-start -->
> **定理（強Hilbertの零点定理）**  
> $k$ を代数閉体、$R=k[x_1,\ldots,x_n]$、$J\subseteq R$ を任意のイデアルとする。このとき
>
$$
I_k(V_k(J))=\sqrt J.
$$
>
> すなわち、$f$ が $J$ のすべての共通零点で消えることと、ある整数 $N\ge1$ について $f^N\in J$ となることは同値である。
<!-- formal-statement-end -->

### 証明の見取り図

容易な向きは、累乗が点で零ならその元も零という体の性質です。逆向きは、新変数を加えた環で[弱Hilbertの零点定理](#thm-ag1-07-weak-nullstellensatz)を適用し、$1$ を元のイデアルの生成元と $1-uf$ の組合せで書きます。その後、商環 $R/J$ で $f$ の像を局所化し、[局所化の等式判定](../AG1-04/index.md#def-ag1-04-localization)によって冪を消します。

<!-- proof-start -->
### 証明

**$\sqrt J\subseteq I_k(V_k(J))$。** $f\in\sqrt J$ なら $f^m\in J$ となる $m\ge1$ があります。任意の $a\in V_k(J)$ について $0=f^m(a)=f(a)^m$ です。体 $k$ に零因子がないので $f(a)=0$、つまり $f\in I_k(V_k(J))$ です。$V_k(J)=\varnothing$ の場合もこの包含は成り立ちます。

**$I_k(V_k(J))\subseteq\sqrt J$。** $f\in I_k(V_k(J))$ とします。$f=0$ なら $f\in J\subseteq\sqrt J$ なので、以下は $f\ne0$ として構いません。$J$ は[Hilbertの基底定理](../AG1-05/index.md#thm-ag1-05-hilbert-basis)と有限生成性の同値性から有限生成であり、$J=(g_1,\ldots,g_s)$ と書けます。$J=0$ の場合は空の生成系を許します。

新変数 $u$ を加えた $R[u]=k[x_1,\ldots,x_n,u]$ に

$$
H=(g_1,\ldots,g_s,\,1-uf)
$$

を取ります。もし $(a,c)\in k^{n+1}$ が $H$ の共通零点なら、$g_i(a)=0$ が全 $i$ で成立し $a\in V_k(J)$ です。仮定から $f(a)=0$ なので $1-cf(a)=1\ne0$、矛盾します。従って $V_k(H)=\varnothing$ です。

[弱Hilbertの零点定理](#thm-ag1-07-weak-nullstellensatz)を変数数 $n+1$、体 $k$、イデアル $H$ に適用すると $H=R[u]$ です。よって多項式 $A_1,\ldots,A_s,B\in R[u]$ を取れて

$$
1=\sum_{i=1}^{s}A_i(x,u)g_i(x)+B(x,u)(1-uf(x))
$$

となります。ここで **$A=R/J$** と置き、$f$ の剰余類を $\bar f\in A$ と書きます。$A$ では $g_i$ の剰余類が零なので、上の恒等式は $A[u]$ で

$$
1=\overline B(u)(1-u\bar f)
$$

となります。$S=\{1,\bar f,\bar f^2,\ldots\}$ で[局所化](../AG1-04/index.md#def-ag1-04-localization)した $A_{\bar f}=S^{-1}A$ では $\bar f/1$ に逆元 $1/\bar f$ があります。従って $u\mapsto1/\bar f$ と代入すると、右辺は零になり、

$$
1/1=\overline B(1/\bar f)\,(1-(1/\bar f)(\bar f/1))=0
\qquad\text{in }A_{\bar f}
$$

です。ここから **元の $A$ で $1=0$ と結論してはいけません**。[局所化の分数の同値条件](../AG1-04/index.md#def-ag1-04-localization)は $1/1=0/1$ が成り立つことを、ある整数 $L\ge0$ が存在し

$$
\bar f^L\cdot1=0\qquad\text{in }A=R/J
$$

となることと同値にします。$L=0$ の場合は $1\in J$ なので任意の $f$ が $J$ に属し、$N=1$ とできます。$L\ge1$ の場合は $f^L\in J$ で、$N=L$ とできます。いずれも正整数 $N$ が存在して $f^N\in J$ なので、$f\in\sqrt J$ です。これで逆包含も成立します。
<!-- proof-end -->

最後の $L$ は論証の核心です。$R=k[x_1,\ldots,x_n]$ 自体は整域ですが、$A=R/J$ では $\bar f$ が零因子や冪零元である可能性があります。従って $A\to A_{\bar f}$ は単射とは限りません。$1/1=0$ の帰結は $1=0$ ではなく「ある $L$ について $\bar f^L=0$」、すなわち $f^L\in J$ です。

## 4. 何が変わったか：冪の情報と体の仮定

**冪は零点に見えません。** $J=(x^2,y)\subset k[x,y]$ とすると、$V_k(J)=\{(0,0)\}$ です。一方 $I_k(\{(0,0)\})=(x,y)$ です。[強Hilbertの零点定理](#thm-ag1-07-strong-nullstellensatz)は

$$
\sqrt{(x^2,y)}=(x,y)
$$

を主張します。これは直接にも確認できます。$(x,y)$ の任意の元 $h=xp+yq$ は

$$
h^2=x^2p^2+y(2xpq+yq^2)\in(x^2,y)
$$

を満たします。逆に $h^m\in(x^2,y)$ なら原点で $h(0,0)^m=0$、従って $h(0,0)=0$ であり $h\in(x,y)$ です。

**基礎体が違うと二つの主張も変わります。** $\mathbb R[x]$ では $(x^2+1)$ は真のイデアルなのに零点は空です。また $\mathbb F_2[x]$ では非零多項式 $x^2+x$ が体のすべての点 $0,1$ で零となります。したがって、$J=(0)$ としても $I_{\mathbb F_2}(V_{\mathbb F_2}(J))\ne\sqrt J$ です。代数閉性は単なる証明上の便利な条件ではなく、結論の成立に本質的です。

**次の問題。** 零点集合から一般のイデアルは復元できませんが、根基を取れば正確に復元できます。次章ではこの結果を使い、根基イデアルとアフィン代数的集合との包含反転の対応を、演算や具体例まで整理します。

## 5. 演習：点、冪、そして逆元をつなぐ

特に指定しなければ $k=\mathbb C$ とします。解答では「どの環の中の等式か」を明示してください。

**Level A：基礎を具体式へ戻す**

### A1. 一点の極大イデアル

$k[x,y]$ の $J=(x-2,y+3)$ について $V_k(J)$、$k[x,y]/J$、$I_k(V_k(J))$ を求めよ。

- Level: A
- ID: AG1-07-A1

<!-- solution-start -->
**詳細解答**　共通零点は $x=2,y=-3$ を満たす点だけなので $V_k(J)=\{(2,-3)\}$ です。写像 $\operatorname{ev}_{(2,-3)}:k[x,y]\to k$ は全射で、任意の多項式 $p$ について

$$
p(x,y)-p(2,-3)=\bigl(p(x,y)-p(2,y)\bigr)+\bigl(p(2,y)-p(2,-3)\bigr).
$$

最初の差は $x-2$、次の差は $y+3$ で割り切れます。従って核は $J$ で、[環の第一同型定理](../../RNG/RNG1/index.md#thm-rng1-first-isomorphism-ring)から $k[x,y]/J\simeq k$ です。同じ評価の核が一点の消滅イデアルだから $I_k(V_k(J))=J$ となります。
<!-- solution-end -->

### A2. 二乗で消える方程式

$J=(x^2,y)\subseteq k[x,y]$ について $V_k(J)$ と $\sqrt J$ を求め、少なくとも一つの $J$ に属さない根基の元を挙げよ。

- Level: A
- ID: AG1-07-A2

<!-- solution-start -->
**詳細解答**　$x^2=0$ は体では $x=0$ と同値で、$y=0$ も必要なので $V_k(J)=\{(0,0)\}$ です。$x^2\in J$ かつ $y\in J$ より $x,y\in\sqrt J$ です。根基はイデアルなので $(x,y)\subseteq\sqrt J$ となります。逆に $f^m\in J$ なら $f(0,0)^m=0$、従って定数項が零なので $f\in(x,y)$ です。ゆえに $\sqrt J=(x,y)$ です。$x\notin J$ は $y=0$ とする写像の像で $x\notin(x^2)\subset k[x]$ となることから確かめられます。
<!-- solution-end -->

### A3. 代数閉でない体の反例

$\mathbb R[x]$ の $J=(x^2+1)$ は真のイデアルであること、しかし $V_{\mathbb R}(J)=\varnothing$ であることを示せ。

- Level: A
- ID: AG1-07-A3

<!-- solution-start -->
**詳細解答**　もし $1=(x^2+1)q(x)$ なら、$q\ne0$ の場合右辺の次数は $2+\deg q\ge2$ となって左辺の次数 $0$ に矛盾します。$q=0$ でも右辺は零なので矛盾します。従って $1\notin J$、つまり $J$ は真です。一方、任意の $a\in\mathbb R$ で $a^2+1>0$ だから $a$ は $x^2+1$ の零点になれず、共通零点集合は空です。失われた仮定は基礎体の代数閉性です。
<!-- solution-end -->

### A4. 根基の定義を使う

$J=(x^2,xy)\subset k[x,y]$ について $\sqrt J=(x)$ を、強零点定理を使わずに示せ。

- Level: A
- ID: AG1-07-A4

<!-- solution-start -->
**詳細解答**　$x^2\in J$ より $x\in\sqrt J$ で、根基がイデアルなので $(x)\subseteq\sqrt J$ です。逆に $f^m\in J\subseteq(x)$ とします。$x=0$ を代入する写像 $k[x,y]\to k[y]$ から $f(0,y)^m=0$ です。$k[y]$ は整域なので $f(0,y)=0$ です。$f$ を $x$ の多項式として書くと、定数項 $f(0,y)$ が零であるため $f= xq(x,y)$ と因数分解できます。よって $f\in(x)$ で、両包含から $\sqrt J=(x)$ です。
<!-- solution-end -->

**Level B：補題と定理の仮定を使い分ける**

### B1. 有限生成体の補題の使い方

代数閉体 $k$ 上の有理関数体 $k(t)$ は $k$ 代数として有限生成でないことを、[有限生成体の補題](#lem-ag1-07-zariski-lemma)から示せ。

- Level: B
- ID: AG1-07-B1

<!-- solution-start -->
**詳細解答**　仮に $k(t)=k[b_1,\ldots,b_r]$ と有限個の元で **代数** として生成されるなら、この環は体だから[有限生成体の補題](#lem-ag1-07-zariski-lemma)を適用でき、$k(t)=k$ と結論されます。しかし $t$ は $k$ 上超越的な不定元で $t\notin k$ なので矛盾です。ここで $k(t)$ が $t$ によって **体として** 生成される事実は、補題の有限生成代数という仮定を満たしません。
<!-- solution-end -->

### B2. Rabinowitschの恒等式

$J=(x^2)\subset k[x]$、$f=x$ とする。$k[x,u]$ における $H=(x^2,1-ux)$ に $1$ が属することを、明示的な恒等式で示せ。

- Level: B
- ID: AG1-07-B2

<!-- solution-start -->
**詳細解答**　$1-(ux)^2=(1-ux)(1+ux)$ を使います。従って $k[x,u]$ 内で

$$
1=(1+ux)(1-ux)+u^2x^2.
$$

右辺の第一項は $(1-ux)$、第二項は $(x^2)$ に入るので $1\in H$ です。この計算は $x^2=0$ と $ux=1$ が両立できないことの代数的証明です。$x\in\sqrt{(x^2)}$ は $x^2\in J$ からも直接確認でき、技巧の結論と一致します。
<!-- solution-end -->

### B3. 極大イデアルと二軸上の点

$R=k[x,y]$、$J=(xy)$ とする。$J$ を含む $R$ の極大イデアルをすべて記述せよ。$V_k(J)$ と比較せよ。

- Level: B
- ID: AG1-07-B3

<!-- solution-start -->
**詳細解答**　[極大イデアルと点の対応](#prop-ag1-07-maximal-points)から極大イデアルは $\mathfrak m_{a,b}=(x-a,y-b)$ に限ります。$J\subseteq\mathfrak m_{a,b}$ となるのは、評価で $xy$ が零になる場合、すなわち $ab=0$ の場合に限ります。従って求める集合は

$$
\{(x-a,y-b):a=0\text{ または }b=0\}.
$$

一方 $V_k(J)=\{(a,b)\in k^2:ab=0\}$ は二本の座標軸の和集合です。各極大イデアルと共通零点がちょうど一対一に対応しています。$(xy)$ の生成元が零になるかという評価と、極大イデアルの包含条件を対応させた点が重要です。
<!-- solution-end -->

### B4. 有限体では強い形も崩れる

$k=\mathbb F_2$、$J=(0)\subseteq k[x]$ とする。$x^2+x\in I_k(V_k(J))$ だが $x^2+x\notin\sqrt J$ であることを示せ。

- Level: B
- ID: AG1-07-B4

<!-- solution-start -->
**詳細解答**　$J=(0)$ には方程式の制約がないので $V_k(J)=k=\{0,1\}$ です。$f(x)=x^2+x$ は $f(0)=0$、$f(1)=1+1=0$（標数2）なので $f\in I_k(V_k(J))$ です。一方、$k[x]$ は整域だから $g^m=0$ なら $g=0$、従って $\sqrt{(0)}=(0)$ です。$x^2+x$ は最高次係数 $1$ の非零多項式なので $\sqrt J$ に入りません。ここでは基礎体の代数閉性が失われ、多項式関数として同じでも形式的な多項式が異なります。
<!-- solution-end -->

**Level C：複数の論証を接続する**

### C1. 冪零な方程式系を零点から復元する

$J=(x^2,xy)\subset k[x,y]$ とする。(1) $V_k(J)$ と $I_k(V_k(J))$ を直接計算せよ。(2) $f=x$ に対し $H=(x^2,xy,1-ux)\subset k[x,y,u]$ が $1$ を含むことを恒等式で示せ。(3) 強零点定理と直接計算の結論が一致することを確認せよ。

- Level: C
- ID: AG1-07-C1

<!-- solution-start -->
**詳細解答**

**(1)** $x^2=0$ は $x=0$ を強制し、$xy=0$ は $x=0$ の下ではすべての $y$ に対し成り立ちます。従って $V_k(J)=\{(0,b):b\in k\}$ です。任意の多項式 $p(x,y)$ は $x$ について定数項とそれ以外に分けて $p(x,y)=p(0,y)+xq(x,y)$ と書けます。$p$ がこの直線で消えるなら、すべての $b\in k$ について $p(0,b)=0$ です。$k$ は代数閉体なので無限体であり（有限体の全元を根に持つ多項式に定数 $1$ を足せば代数閉性に矛盾）、非零一変数多項式はその次数より多くの根を持てません。ゆえに $p(0,y)$ は零多項式で $p\in(x)$ です。逆に $xq$ は $x=0$ で零なので $I_k(V_k(J))=(x)$ です。

**(2)** $k[x,y,u]$ 内で

$$
1=(1+ux)(1-ux)+u^2x^2
$$

です。第一項は $1-ux$ の倍数、第二項は $x^2$ の倍数であり、いずれも $H$ に属します。従って $1\in H$ です。この恒等式で $xy$ の生成元を使わなくてよいのは、$x^2$ と $1-ux$ だけで既に共通零点がなくなるためです。

**(3)** $x^2\in J$ なので $x\in\sqrt J$ です。$\sqrt J$ はイデアルなので $(x)\subseteq\sqrt J$ です。また $J\subseteq(x)$ で、$(x)$ は $k[x,y]/(x)\simeq k[y]$ が整域となるため根基的です。よって $\sqrt J\subseteq(x)$、両包含から $\sqrt J=(x)$ です。これは (1) で求めた $I_k(V_k(J))$ と一致し、[強Hilbertの零点定理](#thm-ag1-07-strong-nullstellensatz)を具体例で再現しています。
<!-- solution-end -->

### C2. 強零点定理の分母消去を証明し直す

$R=k[x_1,\ldots,x_n]$、$J=(g_1,\ldots,g_s)$、$f\in I_k(V_k(J))$ とする。弱零点定理から得られる $R[u]$ の恒等式を出発点とし、商環 $A=R/J$ で $\bar f$ を局所化した後に **$A_{\bar f}$ から $A$ へ戻すための冪** を明記して $f^N\in J$ を示せ。

- Level: C
- ID: AG1-07-C2

<!-- solution-start -->
**詳細解答**　$H=(g_1,\ldots,g_s,1-uf)$ に共通零点 $(a,c)$ があるとすると $a\in V_k(J)$ なので $f(a)=0$ です。しかし $1-cf(a)=1$ だから矛盾し、$V_k(H)=\varnothing$ です。[弱Hilbertの零点定理](#thm-ag1-07-weak-nullstellensatz)を $n+1$ 変数へ適用し、ある $A_i,B\in R[u]$ により

$$
1=\sum_i A_i(x,u)g_i+B(x,u)(1-uf)
$$

を得ます。商環 $A=R/J$ に移り、$f$ の像を $\bar f$ とすると、各 $g_i$ の像は零です。よって $A[u]$ では

$$
1=\bar B(u)(1-u\bar f)
$$

です。$A_{\bar f}$ では $\bar f/1$ が可逆なので $u=1/\bar f$ を代入すると

$$
1/1=\bar B(1/\bar f)\,(1-1)=0/1
$$

となります。[局所化の同値関係](../AG1-04/index.md#def-ag1-04-localization)により、ある整数 $L\ge0$ で $\bar f^L=0$ が元の $A$ で成立します。つまり $f^L\in J$ です。$L=0$ なら $1\in J$ なので $f\in J$、$L\ge1$ なら $N=L$ とすれば、いずれも正の冪 $f^N\in J$ を得ます。$A_{\bar f}$ で $1/1=0$ だからといって元の $A$ でも $1=0$ と考えるのは誤りです。$\bar f$ が商環内で零因子または冪零元になり得ることが、追加の冪を必要とする理由です。
<!-- solution-end -->
