# NDA6 Liouvilleの近似定理・Liouville数・超越性

[NDA5の無理性指数](../NDA5/index.md#def-nda5-irrationality-exponent)は、ある無理数へ分母の何乗の速さで近づけるかを表しました。連分数の部分商を急激に大きくすれば、指数をいくらでも大きくできることも分かりました。しかし、そのように近づきやすい数を実際に作ったとして、その数が有理数でも代数的無理数でもないと、どうして言えるのでしょうか。

鍵は、[代数的元の最小多項式](../../FLD/FLD1/index.md#def-fld1-minimal-polynomial)が整数係数の多項式関係を与えることです。有理数を代入して分母を払うと、**零でない整数の絶対値は1以上**という離散性が現れます。これと多項式の連続的な変化を組み合わせれば、有理数が代数的無理数へ近づく速さに上限が付きます。

本章ではこの計算からLiouvilleの近似定理を証明し、無理性指数が無限大の数は超越的であると結論します。そのうえで、階乗の位置に小数桁を置く級数が、その条件を実際に満たすことを一つずつ確かめます。

## 1. 代数的無理数には整数多項式の制約がある

例えば $\sqrt2$ に分数 $p/q$ を代入すると、$p^2-2q^2$ は整数です。平方根2が無理数であるため、この整数は零になれません。次数が $d$ の多項式に置き換えると、同じ仕組みで分母の $d$ 乗が現れます。

<a id="lem-nda6-integer-polynomial"></a>

<!-- formal-statement-start -->
> **補題（整数係数多項式の分母評価）**  
> $P(x)=a_0+a_1x+\cdots+a_dx^d\in\mathbb Z[x]$ を次数 $d\ge1$ の多項式とする。整数 $p$ と正整数 $q$ に対し $P(p/q)\ne0$ ならば

$$
\left|P\left(\frac pq\right)\right|\ge\frac1{q^d}.
$$
<!-- formal-statement-end -->

### 証明の見取り図

各項に $q^d$ を掛ければ整数になります。その整数が零でないことを使うだけで、$p/q$ の既約性は必要ありません。

<!-- proof-start -->
### 証明

分母を払うと

$$
q^dP\left(\frac pq\right)
=\sum_{j=0}^{d}a_jp^jq^{d-j}\in\mathbb Z.
$$

仮定 $P(p/q)\ne0$ により右辺は零でない整数です。したがって

$$
\left|q^dP\left(\frac pq\right)\right|\ge1.
$$

$q^d>0$ で割ると主張を得ます。
<!-- proof-end -->

ここで必要なのは $P(p/q)\ne0$ という条件です。例えば $P(x)=x-1$ と $p/q=1$ では左辺が零なので、この下界は成立しません。「代数的な数なら何でも」という言い方が誤りになる理由はここにあります。

## 2. 代数的無理数への近似は次数で制限される

次数 $d$ の代数的無理数 $\alpha$ には、[最小多項式の存在・既約性](../../FLD/FLD1/index.md#thm-fld1-minimal-polynomial)によって $\mathbb Q[x]$ 上の既約多項式が存在します。係数の分母を払って整数係数に直しても根と次数は変わりません。$d\ge2$ の既約多項式には有理根が存在しません。もし $p/q$ が根なら $x-p/q$ が因子となり、既約性に反するからです。

<a id="thm-nda6-liouville-bound"></a>

<!-- formal-statement-start -->
> **定理（Liouvilleの近似下界）**  
> $\alpha\in\mathbb R$ を $\mathbb Q$ 上の次数 $d\ge2$ の代数的無理数とする。このとき $\alpha$ のみに依存する定数 $C_\alpha>0$ が存在して、すべての整数 $p$ と正整数 $q$ に対し

$$
\left|\alpha-\frac pq\right|\ge\frac{C_\alpha}{q^d}
$$

> が成り立つ。したがって無理性指数は $\mu(\alpha)\le d$ を満たす。
<!-- formal-statement-end -->

### 証明の見取り図

$\alpha$ を根に持つ整数係数多項式 $P$ を選びます。補題で $|P(p/q)|$ を下から押さえ、$\alpha$ の近くでは平均値定理で $|P(p/q)-P(\alpha)|$ を上から押さえます。二つの評価の間に $|\alpha-p/q|$ が挟まれます。

<!-- proof-start -->
### 証明

[代数的元の最小多項式の存在・一意性と既約性](../../FLD/FLD1/index.md#thm-fld1-minimal-polynomial)から $\alpha$ を根に持つ次数 $d$ の既約多項式 $m_\alpha\in\mathbb Q[x]$ を取ります。各係数の分母の最小公倍数を掛け、必要なら係数の最大公約数で割ると、整数係数の次数 $d$ の多項式

$$
P(x)=a_0+a_1x+\cdots+a_dx^d,\qquad P(\alpha)=0
$$

を得ます。$P$ は $\mathbb Q[x]$ 上も既約です。$d\ge2$ なので任意の $p/q\in\mathbb Q$ について $P(p/q)\ne0$ です。従って[整数多項式の分母評価](#lem-nda6-integer-polynomial)を適用でき、

$$
\left|P\left(\frac pq\right)\right|\ge q^{-d}
$$

が成立します。

次に

$$
M=\max\left\{1,\ \max_{|x-\alpha|\le1}|P'(x)|\right\}
$$

と置きます。$P'$ は多項式で閉区間上連続だから最大値が存在し、$1\le M<\infty$ です。$|p/q-\alpha|\le1$ の場合、[平均値定理](../../../基礎科目/RA/RA3/index.md#thm-ra3-mvt)を $P$ に区間 $\alpha$ と $p/q$ の間で適用します。ある中間点 $\xi$ が存在して

$$
P\left(\frac pq\right)-P(\alpha)
=P'(\xi)\left(\frac pq-\alpha\right)
$$

です。$|\xi-\alpha|\le1$ と $P(\alpha)=0$ より

$$
q^{-d}
\le\left|P\left(\frac pq\right)\right|
=|P'(\xi)|\left|\frac pq-\alpha\right|
\le M\left|\frac pq-\alpha\right|.
$$

したがって $|\alpha-p/q|\ge M^{-1}q^{-d}$ です。一方、$|p/q-\alpha|>1$ なら $q\ge1$ と $M\ge1$ より

$$
\left|\alpha-\frac pq\right|>1\ge M^{-1}q^{-d}.
$$

よってどの場合も $C_\alpha=M^{-1}>0$ を選べます。

最後に、任意の $\nu>d$ を固定します。$q^{\nu-d}>1/C_\alpha$ となる十分大きい $q$ では

$$
C_\alpha q^{-d}>q^{-\nu}.
$$

従って $|\alpha-p/q|<q^{-\nu}$ は大きい分母では成立しません。[無理性指数の量化](../NDA5/index.md#prop-nda5-exponent-quantifiers)により、すべての $\nu>d$ が許容されないので $\mu(\alpha)\le d$ を得ます。
<!-- proof-end -->

### 具体例：次数によってどこまで言えるか

$\alpha=\sqrt[3]2$ は $x^3-2$ の根であり、この三次式には有理根がないので $\mathbb Q[x]$ 上既約です。次数は $3$ です。$P'(x)=3x^2$ を用いると、$|x-\alpha|\le1$ に対し $|x|\le\alpha+1$ なので

$$
|P'(x)|\le3(\alpha+1)^2.
$$

上の証明で $M=3(\alpha+1)^2$ と取れ、

$$
\left|\sqrt[3]2-\frac pq\right|
\ge\frac1{3(\sqrt[3]2+1)^2q^3}
$$

がすべての $p\in\mathbb Z,q\ge1$ について成立します。従って $2\le\mu(\sqrt[3]2)\le3$ です。下側の $2$ は[Dirichlet近似による普遍下界](../NDA5/index.md#thm-nda5-dirichlet-lower-bound)から来ます。

ここでは **$\mu(\sqrt[3]2)=3$ と証明したわけではありません**。Liouvilleの近似定理は代数的次数に依存する上界を与えるものであり、より鋭い指数2の結論は次章の深い定理で扱います。

## 3. 無限に良い近似を受け入れる数

前章で作った「無理性指数が無限大」の例は、どの有限次数の代数的無理数にも不可能な近づき方をしています。これを独立した概念として定めます。

<a id="def-nda6-liouville-number"></a>

<!-- formal-statement-start -->
> **定義（Liouville数）**  
> 無理数 $\alpha\in\mathbb R\setminus\mathbb Q$ が **Liouville数**であるとは、任意の正整数 $m$ に対し、既約な整数組 $p\in\mathbb Z,q\ge2$ で

$$
\left|\alpha-\frac pq\right|<\frac1{q^m}
$$

> を満たす相異なる有理数 $p/q$ が無限個存在することをいう。
<!-- formal-statement-end -->

<!-- definition-example-start: def-nda6-liouville-number -->
**定義の確認**

前章の連分数の構成で、分母 $q_n$ が定まるたびに $a_{n+1}=q_n^n$ と置いた無理数 $\beta$ を考えます。[連分数から無理性指数を求める公式](../NDA5/index.md#thm-nda5-denominator-growth)に代入すると

$$
\mu(\beta)
=2+\limsup_{n\to\infty}\frac{\log(q_n^n)}{\log q_n}
=2+\limsup_{n\to\infty}n
=\infty.
$$

この等式の最後の量化を次の命題で確かめると、$\beta$ はLiouville数です。単に「とてもよく近似される」と述べるのではなく、**指数 $m$ を先に固定しても無限個ある**ことが条件です。
<!-- definition-example-end -->

<a id="prop-nda6-liouville-exponent"></a>

<!-- formal-statement-start -->
> **命題（Liouville数と無理性指数）**  
> 無理数 $\alpha$ について、$\alpha$ がLiouville数であることと $\mu(\alpha)=\infty$ は同値である。
<!-- formal-statement-end -->

### 証明の見取り図

一方向は、任意の整数指数が許容されるならその上限は無限大という事実です。逆方向は「上限が無限大なら**各**有限指数より大きい許容指数がある」ことと、分母が $2$ 以上であることを利用します。

<!-- proof-start -->
### 証明

Liouville数なら、定義から任意の正整数 $m$ が[無理性指数の定義](../NDA5/index.md#def-nda5-irrationality-exponent)における許容指数です。許容指数の上限はすべての正整数以上なので $\mu(\alpha)=\infty$ です。

逆に $\mu(\alpha)=\infty$ とします。任意の正整数 $m$ を固定します。許容指数の集合の上限が無限大なので、ある許容指数 $\nu>m$ が存在します。その指数に対応する無限個の既約分数では、$q\ge2$ より

$$
\left|\alpha-\frac pq\right|
<q^{-\nu}<q^{-m}.
$$

従って指数 $m$ に対しても無限個の分数が存在し、$\alpha$ はLiouville数です。
<!-- proof-end -->

## 4. なぜLiouville数は超越数になるのか

超越的であるという語は、[FLD1の代数的元・超越的元の定義](../../FLD/FLD1/index.md#def-fld1-algebraic-element)に従い、$\mathbb Q$ 上の非零多項式を一つも零にしないという意味です。

<a id="thm-nda6-transcendence"></a>

<!-- formal-statement-start -->
> **定理（Liouville数の超越性）**  
> 任意のLiouville数 $\alpha$ は $\mathbb Q$ 上超越的である。
<!-- formal-statement-end -->

### 証明の見取り図

代数的と仮定して次数 $d$ を固定します。Liouville数なら指数 $d+1$ の近似が分母をいくらでも大きくして現れますが、Liouvilleの近似下界はそれを禁じます。

<!-- proof-start -->
### 証明

$\alpha$ はLiouville数なので無理数です。背理法により代数的であると仮定し、$\alpha$ の $\mathbb Q$ 上の次数を $d\ge2$ とします。[Liouvilleの近似下界](#thm-nda6-liouville-bound)によってある $C_\alpha>0$ が存在し、

$$
\left|\alpha-\frac pq\right|\ge C_\alpha q^{-d}
$$

が全整数 $p$・正整数 $q$ について成立します。

Liouville数の定義で $m=d+1$ を選べば、

$$
\left|\alpha-\frac pq\right|<q^{-(d+1)}
$$

となる既約分数が無限個存在します。分母が有界なら、その分母を持ち $|\alpha-p/q|<1$ を満たす分子 $p$ も有界なので、こうした分数は有限個にしかなりません。従って分母 $q$ はいくらでも大きくできます。

特に $q>1/C_\alpha$ のものを選ぶと

$$
q^{-(d+1)}<C_\alpha q^{-d}
\le\left|\alpha-\frac pq\right|
<q^{-(d+1)},
$$

という矛盾が生じます。ゆえに $\alpha$ は代数的ではなく、超越的です。
<!-- proof-end -->

この定理からLiouville数なら超越数だと分かりますが、超越数が必ずLiouville数であるという逆向きは示していません。

## 5. 階乗の桁を使って超越数を一つ作る

存在を示すだけでなく、具体的な数を十進小数で作ります。通常の等比級数と違い、$1!,2!,3!,\ldots$ 桁目だけへ $1$ を置くと、有限個で打ち切った分数の分母に比べ、残りの桁が急速に遠ざかります。

<a id="thm-nda6-liouville-constant"></a>

<!-- formal-statement-start -->
> **定理（Liouville定数の構成）**  
> 次の実数を考える。

$$
L=\sum_{k=1}^{\infty}10^{-k!}
=0.110001000000000000000001\ldots.
$$

> このとき $L$ は無理数であり、任意の正整数 $m$ に対して

$$
\left|L-\frac pq\right|<q^{-m}
$$

> を満たす既約分数 $p/q$ が無限個存在する。従って $L$ はLiouville数であり、超越数である。
<!-- formal-statement-end -->

### 証明の見取り図

最初の $n$ 項を分母 $q_n=10^{n!}$ の分数に直します。最後の項が分子の下一桁に $1$ を置くので既約です。尾部は次の $(n+1)!$ 桁以降しかないため、誤差が $q_n^{-n}$ より小さくなります。無理性は、もし $L=a/b$ なら異なる二つの有理数の距離が $1/(bq_n)$ 以上という整数の離散性に矛盾することで示します。

<!-- proof-start -->
### 証明

まず有限部分和 $T_N=\sum_{k=1}^{N}10^{-k!}$ を考えます。各項は正なので $(T_N)$ は単調増加です。また $k!\ge k$ から

$
0<T_N
\le\sum_{k=1}^{N}10^{-k}
=\frac{1-10^{-N}}9
<\frac19.
$

よって $(T_N)$ は上に有界です。[有界単調数列の収束定理](../../../基礎科目/RA/RA1/index.md#thm-ra1-monotone)を適用すると、$(T_N)$ は有限な極限 $L$ に収束します。$n\ge1$ について

$$
L_n=\sum_{k=1}^{n}10^{-k!}
=\frac{A_n}{q_n},\quad
q_n=10^{n!},\quad
A_n=\sum_{k=1}^{n}10^{n!-k!}
$$

と置きます。$A_n$ は整数です。$k<n$ の指数 $n!-k!$ は正整数なのでその項は10の倍数、$k=n$ の項は1です。従って

$$
A_n\equiv1\pmod{10},\qquad \gcd(A_n,q_n)=1.
$$

よって $A_n/q_n$ は既約であり、$q_n\to\infty$、$L_n<L_{n+1}<L$ なので各分数は相異なります。

次に尾部を評価します。$k\ge n+1$ では階乗が厳密に増加し、連続する階乗の差は1以上です。従って

$$
\begin{aligned}
0<L-L_n
&=\sum_{k=n+1}^{\infty}10^{-k!}\\
&\le10^{-(n+1)!}\sum_{j=0}^{\infty}10^{-j}\\
&=\frac{10}{9}\,10^{-(n+1)!}
<2\,10^{-(n+1)!}.
\end{aligned}
$$

**無理性の確認**を先に済ませます。仮に $L=a/b$（$a\in\mathbb Z,b\in\mathbb Z_{\ge1}$）とします。$L>L_n$ なので $a/b\ne A_n/q_n$ であり、

$$
\left|\frac ab-\frac{A_n}{q_n}\right|
=\frac{|aq_n-bA_n|}{bq_n}
\ge\frac1{bq_n}.
$$

一方、尾部の上界を分母 $q_n$ で書くと

$$
0<L-L_n<2q_n^{-(n+1)}.
$$

$n$ を十分大きくして $q_n^n>2b$ とすれば

$$
2q_n^{-(n+1)}<\frac1{bq_n},
$$

となり、二つの評価が矛盾します。従って $L$ は無理数です。

最後に任意の正整数 $m$ を固定します。$n\ge\max\{2,m\}$ なら $n+1-m\ge1$ かつ $q_n\ge100$ なので、

$$
0<L-\frac{A_n}{q_n}
<2q_n^{-(n+1)}
=q_n^{-m}\frac2{q_n^{n+1-m}}
<q_n^{-m}.
$$

この条件を満たす $n$ は無限にあり、しかも $A_n/q_n$ は相異なる既約分数です。よって[Liouville数の定義](#def-nda6-liouville-number)を満たします。[Liouville数の超越性](#thm-nda6-transcendence)から $L$ は超越数です。
<!-- proof-end -->

例えば $n=3$ では

$$
L_3=\frac{110001}{10^6},\qquad
10^{-24}<L-L_3<2\cdot10^{-24}
$$

です。尾部の第1項は $10^{-4!}=10^{-24}$ で、それ以降にも正の項が続くため、この下界は厳密な不等式です。分母 $q_3=10^6$ に対して、残差は $q_3^{-4}$ より大きいものの $2q_3^{-4}$ 未満です。ただし有限個の近似だけではLiouville数とは判定できません。証明で $n$ をいくらでも大きくしたことが本質です。

同じ考え方は十進法に固有ではありません。任意の整数 $b\ge2$ に対して $\sum_{k\ge1}b^{-k!}$ でも、打切り分数の分子は $b$ で割った余りが1となり、同じ近似評価が成立します。演習では桁を変えた数や、無数の異なる例まで構成します。

## 6. 演習：分母の整数性から超越性まで

### Level A：多項式評価と量化

**NDA6-A1（整数多項式の分母）**  
$P(x)=2x^3-3x+1$ と整数 $p$・正整数 $q$ について、$q^3P(p/q)$ が整数になる式を展開してください。また $P(1)=0$ であることから補題の仮定が必要な理由を説明してください。

- Level: A

<!-- solution-start -->
**詳細解答**

代入して $q^3$ を掛けると

$$
q^3P(p/q)
=2p^3-3pq^2+q^3\in\mathbb Z
$$

です。$p/q=1$ なら

$$
P(1)=2-3+1=0
$$

ですから $|P(1)|\ge q^{-3}$ は $q=1$ で $0\ge1$ という偽の主張になります。零でない整数であることを確認したときだけ、絶対値を1以上と評価できます。
<!-- solution-end -->

**NDA6-A2（平方根3への一様下界）**  
すべての整数 $p$ と正整数 $q$ に対して

$$
\left|\sqrt3-\frac pq\right|
\ge\frac1{(2\sqrt3+1)q^2}
$$

を示してください。

- Level: A

<!-- solution-start -->
**詳細解答**

$\sqrt3$ は無理数なので $p^2-3q^2$ は零でない整数です。従って

$$
1\le|p^2-3q^2|
=q^2\left|\frac pq-\sqrt3\right|
\left|\frac pq+\sqrt3\right|.
$$

$|p/q-\sqrt3|\le1$ なら

$$
\left|\frac pq+\sqrt3\right|
\le\left|\frac pq-\sqrt3\right|+2\sqrt3
\le1+2\sqrt3.
$$

従って所望の下界が出ます。$|p/q-\sqrt3|>1$ の場合も、$(2\sqrt3+1)q^2>1$ だから同じ下界が成立します。
<!-- solution-end -->

**NDA6-A3（打切り分数の既約性）**  
$L_n=\sum_{k=1}^n10^{-k!}$ を分母 $10^{n!}$ にそろえ、分子が10で割って1余ることを示してください。$n=3$ の分子を計算してください。

- Level: A

<!-- solution-start -->
**詳細解答**

$$
L_n=\frac{\sum_{k=1}^n10^{n!-k!}}{10^{n!}}
$$

です。$k<n$ の項は10の倍数で、$k=n$ の項だけが $10^0=1$ です。従って分子は10と互いに素で、分母が10の冪なので分数は既約です。$n=3$ では

$$
10^{6-1}+10^{6-2}+10^{6-6}
=100000+10000+1=110001.
$$

よって $L_3=110001/10^6$ です。
<!-- solution-end -->

**NDA6-A4（次数と指数）**  
代数的無理数 $\alpha$ の次数が2のとき、$\mu(\alpha)=2$ であることを示してください。また次数が4のとき、本章の定理とDirichlet近似だけから言える範囲を答えてください。

- Level: A

<!-- solution-start -->
**詳細解答**

[無理性指数の普遍下界](../NDA5/index.md#thm-nda5-dirichlet-lower-bound)より、無理数なら $\mu(\alpha)\ge2$ です。一方[Liouvilleの近似下界](#thm-nda6-liouville-bound)から、代数的次数 $d$ なら $\mu(\alpha)\le d$ です。従って $d=2$ では両側が2となります。$d=4$ なら

$$
2\le\mu(\alpha)\le4
$$

までが本章とDirichlet近似から得られます。上界4が等号で実現するとは主張できません。
<!-- solution-end -->

### Level B：仮定を使い分ける

**NDA6-B1（三次無理数の評価定数）**  
$\alpha=\sqrt[3]2$ の最小多項式が $x^3-2$ であることを確認し、$M=3(\alpha+1)^2$ を使って全有理数の近似下界を証明してください。

- Level: B

<!-- solution-start -->
**詳細解答**

仮に既約な $p/q$（$q>0$）が $(p/q)^3=2$ を満たすとします。$p^3=2q^3$ より、素因数2の指数を両辺で比較すると左辺は3の倍数、右辺は1を足した3の倍数となり矛盾します。三次多項式が $\mathbb Q[x]$ 上可約なら一次因子を持ち有理根が存在するので、$x^3-2$ は既約です。[代数的元の最小多項式の存在・一意性と既約性](../../FLD/FLD1/index.md#thm-fld1-minimal-polynomial)により次数は3です。

$|p/q-\alpha|\le1$ なら区間の各 $x$ は $|x|\le\alpha+1$ を満たし、$|P'(x)|=3x^2\le M$ です。[平均値定理](../../../基礎科目/RA/RA3/index.md#thm-ra3-mvt)と[整数多項式の分母評価](#lem-nda6-integer-polynomial)を組み合わせると

$$
q^{-3}\le|P(p/q)-P(\alpha)|
\le M|p/q-\alpha|.
$$

$|p/q-\alpha|>1$ の場合にも $M>1,q\ge1$ より $|p/q-\alpha|\ge (Mq^3)^{-1}$ です。従って

$$
|\alpha-p/q|\ge\frac{1}{3(\alpha+1)^2q^3}
$$

がすべての整数組に成立します。
<!-- solution-end -->

**NDA6-B2（任意の底のLiouville数）**  
整数 $b\ge2$ を固定し $L_b=\sum_{k\ge1}b^{-k!}$ とします。$L_{b,n}=\sum_{k=1}^nb^{-k!}$ が既約分数であること、$L_b$ が無理数であること、任意の正整数 $m$ に対して無限個の $m$ 乗近似があることを証明してください。

- Level: B

<!-- solution-start -->
**詳細解答**

$q_n=b^{n!}$ とすれば

$$
L_{b,n}=\frac{A_n}{q_n},\qquad
A_n=\sum_{k=1}^{n}b^{n!-k!}\equiv1\pmod b.
$$

分母の素因数はすべて $b$ の素因数なので $\gcd(A_n,q_n)=1$ です。尾部は階乗が1以上ずつ増えることから

$$
0<L_b-\frac{A_n}{q_n}
\le\frac b{b-1}b^{-(n+1)!}
\le2q_n^{-(n+1)}.
$$

仮に $L_b=a/c$（$c\ge1$）なら、正の尾部があるため $a/c\ne A_n/q_n$ です。整数 $aq_n-cA_n\ne0$ から

$$
|L_b-A_n/q_n|\ge\frac1{cq_n}
$$

ですが、$q_n^n>2c$ となる大きい $n$ では尾部の上界が $1/(cq_n)$ より小さく矛盾します。従って無理数です。任意の $m$ について $n\ge\max\{2,m\}$ を大きくすれば

$$
0<L_b-A_n/q_n
\le2q_n^{-(n+1)}
<q_n^{-m}
$$

です。$A_n/q_n$ は $n$ とともに狭義増加する既約分数だから無限個あります。よって[Liouville数の定義](#def-nda6-liouville-number)を満たします。
<!-- solution-end -->

**NDA6-B3（指数の量化から超越性）**  
無理数 $\gamma$ が $\mu(\gamma)=\infty$ を満たすとします。$\gamma$ が次数 $d\ge2$ の代数的無理数であると仮定したとき、指数 $d+2$ を選んで矛盾を構成してください。

- Level: B

<!-- solution-start -->
**詳細解答**

[Liouville数と指数の同値](#prop-nda6-liouville-exponent)により、指数 $d+2$ で

$$
|\gamma-p/q|<q^{-(d+2)}
$$

となる既約分数が無限個存在し、分母は非有界です。もし $\gamma$ が次数 $d$ の代数的無理数なら[Liouvilleの近似下界](#thm-nda6-liouville-bound)から

$$
|\gamma-p/q|\ge C_\gamma q^{-d}.
$$

両辺を合わせると $C_\gamma<q^{-2}$ です。$q>C_\gamma^{-1/2}$ を選べるので $q^{-2}<C_\gamma$ と矛盾します。指数 $d+1$ でも矛盾しますが、$d+2$ を選んでも論理は変わりません。
<!-- solution-end -->

**NDA6-B4（近似の有限性と分母）**  
無理数 $\alpha$、正整数 $Q$、実数 $\nu>0$ に対し、$1\le q\le Q$ の範囲で $|\alpha-p/q|<q^{-\nu}$ を満たす整数組 $(p,q)$ は有限個であることを証明し、Liouville数の超越性の証明で使った箇所を説明してください。

- Level: B

<!-- solution-start -->
**詳細解答**

$q$ を固定した条件を分子 $p$ について解くと

$$
q\alpha-q^{1-\nu}<p<q\alpha+q^{1-\nu}
$$

です。これは有界区間なので入る整数 $p$ は有限個です。さらに $q$ は $1,\ldots,Q$ の有限個しかありません。よって全組の集合も有限です。超越性の証明では、特定の指数 $d+1$ に対して近似分数が無限個あることから、分母が任意に大きいものを選べると結論するためにこの有限性を使用しました。これがなければ定数 $C_\alpha$ と比較する大きな $q$ を選べません。
<!-- solution-end -->

### Level C：構成法を拡張する

**NDA6-C1（互いに異なるLiouville数を非可算個構成する）**  
任意の列 $(\varepsilon_k)_{k\ge1}\in\{0,1\}^{\mathbb N}$ について

$$
L_{\varepsilon}=\sum_{k=1}^{\infty}(1+2\varepsilon_k)10^{-k!}
$$

と定めます。(i) 各 $L_\varepsilon$ がLiouville数であることを、打切り分数の既約性・無理性・誤差評価から証明してください。(ii) 異なる列は異なる実数を与えることを証明してください。(iii) これらがすべて超越数であり、非可算個存在すると結論してください。

- Level: C

<!-- solution-start -->
**詳細解答**

(i) $c_k=1+2\varepsilon_k\in\{1,3\}$、$q_n=10^{n!}$ と置き、

$$
S_n=\sum_{k=1}^{n}c_k10^{-k!}
=\frac{A_n}{q_n},\qquad
A_n=\sum_{k=1}^{n}c_k10^{n!-k!}
$$

とします。$A_n\equiv c_n\pmod{10}$ であり、$c_n$ は1または3なので $\gcd(A_n,q_n)=1$ です。尾部はすべての $c_k\le3$ から

$$
0<L_\varepsilon-S_n
\le3\sum_{k=n+1}^\infty10^{-k!}
\le\frac{10}{3}\,10^{-(n+1)!}
<4q_n^{-(n+1)}.
$$

もし $L_\varepsilon=a/b$ と有理数なら $L_\varepsilon>S_n$ より $a/b\ne A_n/q_n$、したがって $|L_\varepsilon-S_n|\ge1/(bq_n)$ です。しかし $q_n^n>4b$ を満たす大きい $n$ で尾部の上界はこれより小さくなり矛盾します。よって無理数です。任意の整数 $m\ge1$ に対し十分大きい $n\ge m$ で

$$
0<L_\varepsilon-S_n
<4q_n^{-(n+1)}
=q_n^{-m}\frac4{q_n^{n+1-m}}
<q_n^{-m}.
$$

$S_n$ は正の項を加えた狭義増加列なので、相異なる既約分数が無限個あります。[Liouville数の定義](#def-nda6-liouville-number)によりLiouville数です。

(ii) 二列 $\varepsilon\ne\eta$ の最初の相違位置を $j$ とします。第 $j$ 項の差の絶対値は $2\cdot10^{-j!}$ です。それより後ろの差は、三角不等式と $|c_k(\varepsilon)-c_k(\eta)|\le2$ により

$$
\left|\sum_{k>j}(c_k(\varepsilon)-c_k(\eta))10^{-k!}\right|
\le\frac{20}{9}10^{-(j+1)!}.
$$

$(j+1)!-j!\ge1$ だから

$$
\frac{20}{9}10^{-(j+1)!}
\le\frac29\,10^{-j!}
<2\cdot10^{-j!}.
$$

先頭の相違を後続項が打ち消せず、$L_\varepsilon\ne L_\eta$ です。

(iii) 集合 $\{0,1\}^{\mathbb N}$ は、任意の列挙に対し第 $n$ 列の第 $n$ 桁を反転する対角線論法で非可算です。(ii) で得た単射により $L_\varepsilon$ の集合も非可算です。(i) と[Liouville数の超越性](#thm-nda6-transcendence)により、それらはすべて超越数です。
<!-- solution-end -->

## 7. 次章へ：上界をどこまで改善できるか

[Liouvilleの近似下界](#thm-nda6-liouville-bound)から分かったのは、次数 $d$ の代数的無理数について $\mu(\alpha)\le d$ ということでした。一方、[普遍下界](../NDA5/index.md#thm-nda5-dirichlet-lower-bound)は $\mu(\alpha)\ge2$ を保証します。次数が大きいほど両側の間隔が開きます。

次章では、この間隔を代数的無理数すべてについて埋めるThue–Siegel–Rothの定理を扱います。そこでは指数 $2+\varepsilon$ が任意の $\varepsilon>0$ に対して使えるという量化と、Liouvilleの初等的な多項式評価では到達できない強さを区別します。
