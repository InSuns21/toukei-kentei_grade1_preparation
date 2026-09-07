# TOP4 標準位相 IV：分離公理・可算性公理

<!-- definition-example-audit: strict -->

TOP3 までは、位相を作り、その空間がつながっているかを調べました。この章では別の二つの問いを扱います。

- **分離公理**：異なる点、点と閉集合、二つの閉集合を、どこまで開集合で引き離せるか。
- **可算性公理**：点の近くの情報、あるいは空間全体の開集合の情報を、どこまで可算な族へ圧縮できるか。

名前だけを見ると $T_0,T_1,T_2,T_3,T_4$ は番号表に見えます。しかし本体は「何を分離するか」です。同様に、第一可算・第二可算・可分性は全て「可算」という語を含みますが、可算にする対象が違います。

本章では次の比較軸を使います。

$$
\begin{array}{c|c}
\text{条件} & \text{制御する対象}\\ \hline
T_0,T_1,T_2 & \text{二点}\\
T_3 & \text{点と閉集合}\\
T_4 & \text{二つの閉集合}\\ \hline
\text{第一可算} & \text{各点の近傍}\\
\text{第二可算} & \text{空間全体の位相}\\
\text{可分} & \text{空間を検出する点集合}
\end{array}
$$

なお Hausdorff 空間は F0-00B1 で既に定義しています。本章ではそれを $T_2$ として含意鎖の中へ置きます。

---

## 1. 二点をどこまで区別できるか：$T_0,T_1,T_2$

<a id="def-top4-t0"></a>
<!-- formal-statement-start -->
> **定義（$T_0$ 空間）**  
> 位相空間 $X$ が **$T_0$** であるとは、任意の異なる二点 $x,y\in X$ に対し、$x,y$ の一方を含み他方を含まない開集合が存在することをいう。
<!-- formal-statement-end -->

<!-- definition-example-start: def-top4-t0 -->
**定義の確認**
### 1.1 二点 Sierpinski 空間

$$
X=\{0,1\},
\qquad
\tau=\{\varnothing,\{1\},X\}
$$

とします。異なる二点は $0,1$ だけです。開集合 $\{1\}$ は $1$ を含み $0$ を含まないので、この空間は $T_0$ です。

ただし $0$ を含んで $1$ を含まない開集合はありません。$T_0$ は「どちらの向きにも区別できる」とは要求していない点が重要です。
<!-- definition-example-end -->

<a id="def-top4-t1"></a>
<!-- formal-statement-start -->
> **定義（$T_1$ 空間）**  
> 位相空間 $X$ が **$T_1$** であるとは、任意の異なる二点 $x,y\in X$ に対し、
>
> - $x$ を含み $y$ を含まない開集合 $U$、
> - $y$ を含み $x$ を含まない開集合 $V$
>
> がそれぞれ存在することをいう。$U,V$ が互いに素であることまでは要求しない。
<!-- formal-statement-end -->

<!-- definition-example-start: def-top4-t1 -->
**定義の確認**
### 1.2 実直線は $T_1$

通常の位相を入れた $\mathbb R$ で $x\ne y$ とします。

$$
r=\frac{|x-y|}{2}>0
$$

と置けば、$U=(x-r,x+r)$ は $x$ を含み $y$ を含みません。同様に $V=(y-r,y+r)$ は $y$ を含み $x$ を含みません。従って $\mathbb R$ は $T_1$ です。
<!-- definition-example-end -->

<a id="prop-top4-t1-singleton"></a>
<!-- formal-statement-start -->
> **命題（$T_1$ 空間と一点集合の閉性）**  
> 位相空間 $X$ について、次は同値である。
>
> 1. $X$ は $T_1$ である。
> 2. 任意の $y\in X$ について一点集合 $\{y\}$ は閉である。
<!-- formal-statement-end -->

<!-- proof-start -->
### 証明

まず $X$ が $T_1$ であるとします。$y\in X$ を固定します。各 $x\in X\setminus\{y\}$ に対し、$T_1$ 性から

$$
x\in U_x,
\qquad
y\notin U_x
$$

となる開集合 $U_x$ が存在します。従って

$$
U_x\subseteq X\setminus\{y\}.
$$

一方、$X\setminus\{y\}$ の任意の点 $x$ は対応する $U_x$ に入るので、

$$
X\setminus\{y\}
=
\bigcup_{x\ne y}U_x.
$$

右辺は開集合の合併だから開です。よって $\{y\}$ は閉です。

逆に全ての一点集合が閉であるとします。$x\ne y$ を取ります。$\{y\}$ が閉なので

$$
X\setminus\{y\}
$$

は開で、$x$ を含み $y$ を含みません。同様に $X\setminus\{x\}$ は $y$ を含み $x$ を含まない開集合です。従って $X$ は $T_1$ です。$\square$
<!-- proof-end -->

Hausdorff 空間では、異なる $x,y$ に対し

$$
x\in U,\qquad y\in V,\qquad U\cap V=\varnothing
$$

となる開集合 $U,V$ を要求します。従って $T_1$ よりさらに強く、二点の近傍そのものを交わらないようにできます。

<a id="prop-top4-sierpinski"></a>
<!-- formal-statement-start -->
> **命題（Sierpinski 空間は $T_0$ だが $T_1$ でない）**  
> $X=\{0,1\}$ に $\tau=\{\varnothing,\{1\},X\}$ を入れた空間は $T_0$ だが $T_1$ ではない。
<!-- formal-statement-end -->

<!-- proof-start -->
### 証明

$\{1\}$ が $1$ を含み $0$ を含まないため $T_0$ です。一方、$0$ を含む開集合は $X$ しかなく、これは $1$ も含みます。従って $0$ を含み $1$ を除く開集合が存在せず、$T_1$ ではありません。$\square$
<!-- proof-end -->

これで

$$
T_0\not\Rightarrow T_1
$$

が具体的に分かります。

<a id="prop-top4-cofinite"></a>
<!-- formal-statement-start -->
> **命題（無限集合の補有限位相は $T_1$ だが Hausdorff でない）**  
> 無限集合 $X$ に

$$
\tau=\{\varnothing\}\cup\{U\subseteq X:X\setminus U\text{ が有限}\}
$$

> を入れる。この空間は $T_1$ だが Hausdorff ではない。
<!-- formal-statement-end -->

<!-- proof-start -->
### 証明

任意の $x\in X$ について

$$
X\setminus\{x\}
$$

の補集合は一点集合で有限なので開です。従って $\{x\}$ は閉です。直前の命題から $X$ は $T_1$ です。

次に Hausdorff でないことを示します。相異なる $x,y\in X$ を取り、$x\in U$, $y\in V$ となる非空開集合 $U,V$ を任意に取ります。補有限位相の定義から

$$
X\setminus U,\qquad X\setminus V
$$

は有限です。もし $U\cap V=\varnothing$ なら De Morgan の法則により

$$
X
=X\setminus(U\cap V)
=(X\setminus U)\cup(X\setminus V)
$$

となります。右辺は有限集合二つの合併なので有限です。これは $X$ が無限であることに反します。従って任意の二つの非空開集合は交わり、$x,y$ を互いに素な開近傍で分離できません。よって Hausdorff ではありません。$\square$
<!-- proof-end -->

したがって

$$
T_1\not\Rightarrow T_2
$$

です。ここで **$X$ が無限** という仮定は不可欠です。有限集合上の補有限位相は離散位相になり、Hausdorff になります。

---

## 2. 点と閉集合を分離する：正則性と $T_3$

<a id="def-top4-regularity"></a>
<!-- formal-statement-start -->
> **定義（正則性）**  
> 位相空間 $X$ が **正則性** を満たすとは、任意の閉集合 $F\subseteq X$ と点 $x\notin F$ に対し、開集合 $U,V\subseteq X$ が存在して

$$
x\in U,
\qquad
F\subseteq V,
\qquad
U\cap V=\varnothing
$$

> となることをいう。本章では、この語自体には $T_1$ 条件を含めない。
<!-- formal-statement-end -->

<!-- definition-example-start: def-top4-regularity -->
**定義の確認**
### 2.1 点 $0$ と閉集合 $[2,\infty)$

通常の $\mathbb R$ で

$$
x=0,\qquad F=[2,\infty)
$$

とします。

$$
U=(-1,1),\qquad V=(3/2,\infty)
$$

なら $0\in U$, $F\subseteq V$, $U\cap V=\varnothing$ です。正則性では、一点ずつではなく閉集合 $F$ 全体を一つの開集合 $V$ に入れたうえで $x$ 側と切り離すことが要求されます。
<!-- definition-example-end -->

<a id="def-top4-t3"></a>
<!-- formal-statement-start -->
> **定義（$T_3$ 空間）**  
> 位相空間 $X$ が **$T_3$** であるとは、$X$ が $T_1$ であり、かつ正則性を満たすことをいう。
<!-- formal-statement-end -->

<!-- definition-example-start: def-top4-t3 -->
**定義の確認**
### 2.2 離散空間は $T_3$

離散位相では全ての部分集合が開かつ閉です。従って一点集合は閉なので $T_1$ です。

閉集合 $F$ と $x\notin F$ に対して

$$
U=\{x\},
\qquad
V=F
$$

と置けば、$U,V$ は開で互いに素です。従って正則性も満たし、離散空間は $T_3$ です。
<!-- definition-example-end -->

<a id="prop-top4-k-topology"></a>
<!-- formal-statement-start -->
> **命題（$K$ 位相は Hausdorff だが正則でない）**

$$
K=\{1/n:n\in\mathbb N\}\subset\mathbb R
$$

> とし、通常の開区間 $(a,b)$ と $(a,b)\setminus K$ を全て集めた族を基底として $\mathbb R$ に位相を入れる。この位相は Hausdorff だが正則性を満たさない。従って $T_2$ であっても $T_3$ とは限らない。
<!-- formal-statement-end -->

<!-- proof-start -->
### 証明

まず、この族が基底になることを確認します。各点は通常の開区間に入るので全体を覆います。次に二つの基底要素 $B_1,B_2$ と点 $z\in B_1\cap B_2$ を取ります。それぞれの基底要素の元になった通常の開区間を $I_1,I_2$ とします。$z\in I_1\cap I_2$ なので、ある通常の開区間 $J$ を

$$
z\in J\subseteq I_1\cap I_2
$$

と取れます。$B_1,B_2$ がともに通常の開区間型なら $J$ 自身が $z$ を含み $B_1\cap B_2$ に含まれる基底要素です。一方、少なくとも一方が $I_i\setminus K$ 型なら $z\notin K$ であり、$J\setminus K$ が $z$ を含み $B_1\cap B_2$ に含まれる基底要素です。従って基底の共通部分条件も満たします。

この位相は全ての通常の開区間を開集合として含むので、通常の位相より細かい位相です。相異なる二点 $x<y$ に対して通常の位相で互いに素な小区間を取れば、それらは $K$ 位相でも開です。よって Hausdorff です。

次に $K$ が閉であることを確認します。$x\notin K$ なら任意の小区間 $(a,b)$ で $x\in(a,b)$ として

$$
x\in(a,b)\setminus K\subseteq\mathbb R\setminus K
$$

となります。従って $\mathbb R\setminus K$ は開で、$K$ は閉です。また $0\notin K$ です。

正則性を仮定し、点 $0$ と閉集合 $K$ を互いに素な開集合 $U,V$ で分離できたとします。すなわち

$$
0\in U,\qquad K\subseteq V,\qquad U\cap V=\varnothing.
$$

$U$ は $0$ の開近傍なので、ある $\varepsilon>0$ が存在して

$$
(-\varepsilon,\varepsilon)\setminus K\subseteq U
$$

となります。$1/n\to0$ だから、十分大きな $n$ を取り

$$
0<1/n<\varepsilon/2
$$

とできます。

$1/n\in K\subseteq V$ です。$V$ は開なので、$1/n$ を含み $V$ に含まれる基底要素 $B$ が存在します。ところが $(a,b)\setminus K$ 型の基底要素は $K$ の点を一つも含まないため、$B$ は通常の開区間 $(a,b)$ でなければなりません。

従って

$$
1/n\in(a,b)\cap(-\varepsilon,\varepsilon)
$$

であり、この共通部分は非空な通常の開区間です。その中には $K$ に属さない点 $z$ が存在します。すると

$$
z\in(-\varepsilon,\varepsilon)\setminus K\subseteq U,
\qquad
z\in(a,b)\subseteq V,
$$

となり $U\cap V=\varnothing$ に矛盾します。よって正則性を満たしません。$\square$
<!-- proof-end -->

この反例の核心は、$0$ 側の近傍から $K$ の点だけを抜いても、$K$ 側の各点の近傍は通常の区間を含むため、両者の間に必ず $K$ 以外の点が残ることです。

---

## 3. 二つの閉集合を分離する：正規性と $T_4$

<a id="def-top4-normality"></a>
<!-- formal-statement-start -->
> **定義（正規性）**  
> 位相空間 $X$ が **正規性** を満たすとは、互いに素な任意の閉集合 $F,G\subseteq X$ に対し、開集合 $U,V\subseteq X$ が存在して

$$
F\subseteq U,
\qquad
G\subseteq V,
\qquad
U\cap V=\varnothing
$$

> となることをいう。本章では、この語自体には $T_1$ 条件を含めない。
<!-- formal-statement-end -->

<!-- definition-example-start: def-top4-normality -->
**定義の確認**
### 3.1 実直線上の二つの閉集合

$$
F=(-\infty,0],
\qquad
G=[2,\infty)
$$

は互いに素な閉集合です。

$$
U=(-\infty,1/2),
\qquad
V=(3/2,\infty)
$$

とすれば $F\subseteq U$, $G\subseteq V$, $U\cap V=\varnothing$ です。正規性では分離する対象の両方が閉集合です。
<!-- definition-example-end -->

<a id="def-top4-t4"></a>
<!-- formal-statement-start -->
> **定義（$T_4$ 空間）**  
> 位相空間 $X$ が **$T_4$** であるとは、$X$ が $T_1$ であり、かつ正規性を満たすことをいう。
<!-- formal-statement-end -->

<!-- definition-example-start: def-top4-t4 -->
**定義の確認**
### 3.2 離散空間は $T_4$

離散空間は $T_1$ です。また互いに素な閉集合 $F,G$ はそれ自身が開でもあるので

$$
U=F,\qquad V=G
$$

と取れば正規性を満たします。従って離散空間は $T_4$ です。
<!-- definition-example-end -->

<a id="thm-top4-separation-chain"></a>
<!-- formal-statement-start -->
> **定理（分離公理の含意鎖）**  
> 本章の規約では

$$
T_4\Longrightarrow T_3\Longrightarrow T_2\text{ (Hausdorff)}
\Longrightarrow T_1\Longrightarrow T_0
$$

> が成り立つ。
<!-- formal-statement-end -->

<!-- proof-start -->
### 証明

**$T_4\Rightarrow T_3$** を示します。$X$ を $T_4$ とし、閉集合 $F$ と点 $x\notin F$ を取ります。$T_4$ の定義に $T_1$ が含まれるので、[$T_1$ 空間と一点集合の閉性](#prop-top4-t1-singleton)から $\{x\}$ は閉です。

$$
\{x\}\cap F=\varnothing
$$

なので、正規性から互いに素な開集合 $U,V$ を

$$
\{x\}\subseteq U,
\qquad
F\subseteq V
$$

と取れます。これは点 $x$ と閉集合 $F$ の正則な分離です。よって $X$ は正則です。もともと $T_1$ なので $T_3$ です。

ここで $T_1$ を使った場所は **$\{x\}$ を閉集合にするところ**です。

**$T_3\Rightarrow T_2$** を示します。相異なる $x,y\in X$ を取ります。$T_3$ は $T_1$ を含むので $\{y\}$ は閉です。さらに $x\notin\{y\}$ なので、正則性から

$$
x\in U,
\qquad
\{y\}\subseteq V,
\qquad
U\cap V=\varnothing
$$

となる開集合 $U,V$ が存在します。特に $y\in V$ です。従って異なる二点 $x,y$ は互いに素な開近傍を持ち、$X$ は Hausdorff です。

ここでも $T_1$ は **一点集合を閉にして正則性を適用するため**に使われています。

**$T_2\Rightarrow T_1$** を示します。$y\in X$ を固定します。各 $x\ne y$ について Hausdorff 性から、互いに素な開集合 $U_x,V_x$ を

$$
x\in U_x,\qquad y\in V_x
$$

と取れます。$U_x\cap V_x=\varnothing$ だから $y\notin U_x$ です。従って

$$
X\setminus\{y\}
=
\bigcup_{x\ne y}U_x
$$

は開です。よって $\{y\}$ は閉であり、$T_1$ です。

**$T_1\Rightarrow T_0$** は、$T_1$ なら異なる $x,y$ について $x$ を含み $y$ を含まない開集合が存在するので、$T_0$ の要求を満たします。$\square$
<!-- proof-end -->

### 3.3 規約に注意する理由

文献によっては「regular space」に $T_1$ を含めるものと含めないものがあります。「normal space」も同様です。本章では **正則性・正規性という性質には $T_1$ を含めず、$T_3,T_4$ の定義で $T_1$ を明示的に加える**規約に固定しました。

この分離をしておくと、上の証明で $T_1$ が何をしているかが見えます。単に「定義より明らか」とすると、一点集合を閉集合として扱える理由が消えてしまいます。

### 3.4 $T_3\not\Rightarrow T_4$ について

逆向きも一般には成り立ちません。標準的な反例として Sorgenfrey 直線の積空間があります。ただしその非正規性をこの章の前提だけで完全に証明しようとすると、Baire 型の議論や同程度の補題が必要になります。本教材では後続概念を `requires` に偽装して先取りせず、ここでは

$$
T_3\not\Rightarrow T_4
$$

という境界だけを明示します。反例の完全証明は、その補題を正式に導入した後に接続します。

---

## 4. 可算性公理は「何を数えるか」が違う

分離公理が「何を開集合で引き離すか」を比較したのに対し、可算性公理では「どの情報を可算個で持てるか」を比較します。

<a id="def-top4-first-countable"></a>
<!-- formal-statement-start -->
> **定義（局所基底・第一可算）**  
> 位相空間 $X$ の点 $x$ に対し、$x$ の近傍からなる族 $\mathcal B_x$ が **局所基底** であるとは、任意の $x$ の近傍 $N$ に対し、ある $B\in\mathcal B_x$ が存在して

$$
x\in B\subseteq N
$$

> となることをいう。
>
> 各 $x\in X$ が可算な局所基底を持つとき、$X$ は **第一可算** であるという。
<!-- formal-statement-end -->

<!-- definition-example-start: def-top4-first-countable -->
**定義の確認**
### 4.1 距離空間では $1/n$ の球だけで足りる

距離空間 $(X,d)$ と $x\in X$ を固定し、

$$
\mathcal B_x=\{B(x,1/n):n\in\mathbb N\}
$$

とします。$N$ を $x$ の任意の近傍とすると、ある開集合 $O$ が存在して

$$
x\in O\subseteq N
$$

となります。$O$ は開なので、ある $\varepsilon>0$ に対し

$$
B(x,\varepsilon)\subseteq O
$$

です。$1/n<\varepsilon$ となる $n$ を取れば

$$
x\in B(x,1/n)\subseteq B(x,\varepsilon)\subseteq N.
$$

従って $\mathcal B_x$ は可算な局所基底です。よって全ての距離空間は第一可算です。
<!-- definition-example-end -->

第一可算性は **点ごと** に別々の可算族を持ってよい条件です。空間全体を一つの可算族で記述する必要はありません。

<a id="def-top4-second-countable"></a>
<!-- formal-statement-start -->
> **定義（第二可算）**  
> 位相空間 $X$ が **第二可算** であるとは、$X$ の位相が可算な基底 $\mathcal B$ を持つことをいう。
<!-- formal-statement-end -->

<!-- definition-example-start: def-top4-second-countable -->
**定義の確認**
### 4.2 実直線の有理端点区間

通常の $\mathbb R$ で

$$
\mathcal B
=
\{(p,q):p,q\in\mathbb Q,\ p<q\}
$$

を考えます。$\mathbb Q\times\mathbb Q$ は可算なので $\mathcal B$ も可算です。

開集合 $U\subseteq\mathbb R$ と $x\in U$ を取ります。ある $\varepsilon>0$ が存在して

$$
(x-\varepsilon,x+\varepsilon)\subseteq U.
$$

有理数の稠密性から

$$
x-\varepsilon<p<x<q<x+\varepsilon
$$

となる $p,q\in\mathbb Q$ を取れます。すると

$$
x\in(p,q)\subseteq U.
$$

従って $\mathcal B$ は位相の基底であり、$\mathbb R$ は第二可算です。
<!-- definition-example-end -->

<a id="def-top4-separable"></a>
<!-- formal-statement-start -->
> **定義（可分空間）**  
> 位相空間 $X$ が **可分** であるとは、可算部分集合 $D\subseteq X$ で

$$
\overline D=X
$$

> となるものが存在することをいう。すなわち可算な稠密部分集合を持つことをいう。
<!-- formal-statement-end -->

<!-- definition-example-start: def-top4-separable -->
**定義の確認**
### 4.3 $\mathbb Q$ は $\mathbb R$ で稠密

$\mathbb Q$ は可算です。また $\mathbb R$ の任意の非空開集合 $U$ は、ある非空開区間 $(a,b)$ を含みます。有理数の稠密性から

$$
(a,b)\cap\mathbb Q\ne\varnothing.
$$

従って全ての非空開集合が $\mathbb Q$ と交わり、$\overline{\mathbb Q}=\mathbb R$ です。よって $\mathbb R$ は可分です。
<!-- definition-example-end -->

ここで三条件を混同しないため、対象を書き分けると

$$
\begin{array}{c|c}
\text{第一可算} & \text{各点 }x\text{ の近傍を可算化}\\
\text{第二可算} & \text{位相全体の基底を可算化}\\
\text{可分} & \text{空間を稠密に検出する点を可算化}
\end{array}
$$

となります。

---

## 5. 第二可算は第一可算と可分性を同時に導く

<a id="thm-top4-second-implies"></a>
<!-- formal-statement-start -->
> **定理（第二可算なら第一可算かつ可分）**  
> 第二可算な位相空間は第一可算であり、かつ可分である。
<!-- formal-statement-end -->

<!-- proof-start -->
### 証明

$X$ が第二可算であるとし、可算基底

$$
\mathcal B=\{B_1,B_2,\dots\}
$$

を取ります。

まず第一可算性を示します。$x\in X$ を固定し、

$$
\mathcal B_x
=
\{B\in\mathcal B:x\in B\}
$$

と置きます。$\mathcal B_x$ は可算集合 $\mathcal B$ の部分集合なので可算です。

$N$ を $x$ の任意の近傍とします。近傍の定義から、ある開集合 $O$ が存在して

$$
x\in O\subseteq N
$$

となります。$\mathcal B$ は基底なので、$x\in O$ に対しある $B\in\mathcal B$ が存在して

$$
x\in B\subseteq O.
$$

この $B$ は $\mathcal B_x$ に属し、

$$
x\in B\subseteq O\subseteq N.
$$

従って $\mathcal B_x$ は $x$ の局所基底です。$x$ は任意だったので $X$ は第一可算です。

次に可分性を示します。空の基底要素を除いても基底性は変わらないので、非空な基底要素を

$$
B_{n_1},B_{n_2},\dots
$$

と並べます。通常の ZFC の範囲で各非空基底要素から一点ずつ

$$
x_k\in B_{n_k}
$$

を選び、

$$
D=\{x_1,x_2,\dots\}
$$

と置きます。$D$ は可算です。

$U$ を任意の非空開集合とし、$x\in U$ を一つ取ります。基底性から、ある非空基底要素 $B_{n_k}$ が存在して

$$
x\in B_{n_k}\subseteq U.
$$

選んだ点 $x_k$ は $B_{n_k}$ に入るので

$$
x_k\in D\cap U.
$$

従って任意の非空開集合が $D$ と交わります。よって $D$ は稠密で、$X$ は可分です。$\square$
<!-- proof-end -->

二つの結論は別々の構成から出ています。第一可算性では **基底を点 $x$ を含むものだけに絞る**。可分性では **各基底要素を代表する点を一つずつ取る**。ここを一括して「明らか」としないことが重要です。

---

## 6. 逆向きは一般には成り立たない

<a id="prop-top4-uncountable-discrete"></a>
<!-- formal-statement-start -->
> **命題（非可算離散空間は第一可算だが第二可算でも可分でもない）**  
> 非可算集合 $X$ に離散位相を入れる。この空間は第一可算だが、第二可算でも可分でもない。
<!-- formal-statement-end -->

<!-- proof-start -->
### 証明

各 $x\in X$ について

$$
\mathcal B_x=\{\{x\}\}
$$

は一要素からなる局所基底です。実際、離散位相では $\{x\}$ は開であり、$x$ の任意の近傍 $N$ は $x$ を含むので $\{x\}\subseteq N$ です。従って第一可算です。

第二可算でないことを示します。$\mathcal B$ を離散位相の任意の基底とします。各 $x\in X$ について $\{x\}$ は開なので、基底性から

$$
x\in B_x\subseteq\{x\}
$$

となる $B_x\in\mathcal B$ が存在します。従って

$$
B_x=\{x\}.
$$

つまり $\mathcal B$ は全ての一点集合 $\{x\}$ を含まなければなりません。$X$ は非可算なので、$\mathcal B$ も非可算です。よって可算基底は存在しません。

最後に可分でないことを示します。$D\subseteq X$ が稠密なら、任意の $x\in X$ について非空開集合 $\{x\}$ が $D$ と交わらなければならないので

$$
x\in D.
$$

従って $D=X$ です。$X$ は非可算なので可算稠密集合は存在しません。$\square$
<!-- proof-end -->

この一例で

$$
\text{第一可算}\not\Rightarrow\text{第二可算},
\qquad
\text{第一可算}\not\Rightarrow\text{可分}
$$

が同時に分かります。

<a id="prop-top4-separable-not-first"></a>
<!-- formal-statement-start -->
> **命題（可分でも第一可算とは限らない）**  
> 集合

$$
X=\{p\}\cup(\mathbb N\times\mathbb N)
$$

> に次の位相を入れる。各 $(m,n)$ は孤立点とし、$p$ を含む集合 $U$ は、各 $m\in\mathbb N$ について

$$
\{n\in\mathbb N:(m,n)\notin U\}
$$

> が有限であるとき開とする。この空間は可分だが第一可算ではない。
<!-- formal-statement-end -->

<!-- proof-start -->
### 証明

まず指定された開集合族が位相になることを確認します。空集合は $p$ を含まないので開で、$X$ は各行の補集合が空なので開です。$p$ を含む二つの開集合 $U,V$ の共通部分について、各行で外れる点は

$$
\{n:(m,n)\notin U\cap V\}
\subseteq
\{n:(m,n)\notin U\}\cup\{n:(m,n)\notin V\}
$$

であり、有限集合二つの合併なので有限です。有限個の共通部分も同様です。任意の開集合族の合併が $p$ を含む場合、その族の少なくとも一つ $U_0$ が $p$ を含みます。合併は $U_0$ を含むので、各行で合併の外に残る点は $U_0$ の外に残る有限集合の部分集合です。従って合併も開です。

$X$ 自身が可算集合なので、$D=X$ と取れば可算かつ稠密です。従って $X$ は可分です。

第一可算でないことを示します。反対に $p$ が可算な局所基底

$$
\mathcal B_p=\{B_1,B_2,\dots\}
$$

を持つと仮定します。各 $B_k$ は $p$ の近傍なので、ある開集合 $O_k$ が存在して

$$
p\in O_k\subseteq B_k
$$

となります。$O_k$ は第 $k$ 行の点を有限個しか除かないため、ある $n_k$ を選んで

$$
(k,n_k)\in O_k\subseteq B_k
$$

とできます。

そこで

$$
W
=
X\setminus\{(k,n_k):k\in\mathbb N\}
$$

と置きます。各行から除いた点はちょうど一つなので有限です。従って $W$ は $p$ を含む開集合、特に $p$ の近傍です。

$\mathcal B_p$ が局所基底なら、ある $k$ が存在して

$$
B_k\subseteq W
$$

となるはずです。しかし $(k,n_k)\in B_k$ である一方、定義から $(k,n_k)\notin W$ です。矛盾です。従って $p$ は可算局所基底を持たず、$X$ は第一可算ではありません。$\square$
<!-- proof-end -->

第二可算なら第一可算なので、この例は同時に

$$
\text{可分}\not\Rightarrow\text{第二可算}
$$

も示しています。反例の核心は、候補となる可算局所基底 $B_k$ ごとに第 $k$ 行から一点を抜き、それら全てを一度に破る新しい近傍 $W$ を作る対角化です。

---

## 7. 距離空間では可分性と第二可算性が一致する

一般の位相空間では可分でも第二可算とは限りません。しかし距離があると、稠密な点集合から小さな球を作れるため状況が強くなります。

<a id="thm-top4-metric-separable-second"></a>
<!-- formal-statement-start -->
> **定理（距離空間では可分性と第二可算性が同値）**  
> 距離空間 $(X,d)$ について、次は同値である。
>
> 1. $X$ は可分である。
> 2. $X$ は第二可算である。
<!-- formal-statement-end -->

<!-- proof-start -->
### 証明

**第二可算 $\Rightarrow$ 可分** は[第二可算なら第一可算かつ可分](#thm-top4-second-implies)で既に示しました。

逆向きを示します。$X$ が可分であるとし、可算稠密集合

$$
D=\{d_1,d_2,\dots\}
$$

を取ります。正の有理数全体を $\mathbb Q_{>0}$ とし、

$$
\mathcal B
=
\{B(d_m,q):m\in\mathbb N,\ q\in\mathbb Q_{>0}\}
$$

と置きます。$\mathbb N\times\mathbb Q_{>0}$ は可算なので $\mathcal B$ は可算です。

これが位相の基底であることを示します。$U\subseteq X$ を開集合、$x\in U$ とします。ある $\varepsilon>0$ が存在して

$$
B(x,\varepsilon)\subseteq U.
$$

$D$ は稠密なので非空開球 $B(x,\varepsilon/3)$ は $D$ と交わります。従ってある $d_m\in D$ が存在して

$$
d(x,d_m)<\varepsilon/3.
$$

有理数の稠密性から

$$
\varepsilon/3<q<2\varepsilon/3
$$

となる正の有理数 $q$ を取れます。このとき

$$
d(x,d_m)<q
$$

なので $x\in B(d_m,q)$ です。

さらに $y\in B(d_m,q)$ なら三角不等式により

$$
d(x,y)
\le d(x,d_m)+d(d_m,y)
<\varepsilon/3+2\varepsilon/3
=\varepsilon.
$$

従って

$$
x\in B(d_m,q)\subseteq B(x,\varepsilon)\subseteq U.
$$

任意の開集合 $U$ とその点 $x$ に対して $\mathcal B$ の要素をこのように挟めるので、$\mathcal B$ は基底です。従って $X$ は第二可算です。$\square$
<!-- proof-end -->

この証明で距離が担った役割は、稠密集合の点 $d_m$ を $x$ の近くに取り、**中心を $x$ から $d_m$ へ少しずらしても、半径を調整すれば元の開集合からはみ出さない**と三角不等式で保証することです。

従って距離空間では

$$
\text{第二可算}
\Longleftrightarrow
\text{可分}
\Longrightarrow
\text{第一可算}
$$

となります。一般の位相空間で壊れていた含意が、距離によって一部復活します。

---

## 8. 分離公理と可算性公理を一枚で読む

分離公理では、条件が強くなるにつれて分離する対象が大きくなります。

$$
\boxed{
T_4
\Rightarrow
T_3
\Rightarrow
T_2
\Rightarrow
T_1
\Rightarrow
T_0
}
$$

- $T_0$：二点を少なくとも一方向で区別する。
- $T_1$：二点を両方向で区別する。一点集合が閉になる。
- $T_2$：二点を互いに素な開近傍へ入れる。
- $T_3$：$T_1$ に加え、点と閉集合を分離する。
- $T_4$：$T_1$ に加え、二つの閉集合を分離する。

可算性では強弱だけを見るより、「可算化する対象」を分けます。

$$
\boxed{
\text{第二可算}
\Rightarrow
\begin{cases}
\text{第一可算},\\
\text{可分}
\end{cases}}
$$

第一可算と可分の間には一般にはどちら向きの含意もありません。距離空間に限定すると可分性と第二可算性が同値になります。

---

## 9. 演習

### Level A

<a id="ex-top4-a01"></a>
#### TOP4-A01 $T_1$ の一点集合判定
- Level: A

位相空間 $X$ で全ての一点集合が閉であるとする。異なる $x,y\in X$ に対し、$T_1$ の定義に現れる二つの開集合を具体的に書け。

<!-- solution-start -->
**解答**：

$$
U=X\setminus\{y\},
\qquad
V=X\setminus\{x\}
$$

と取ります。一点集合が閉なので $U,V$ は開です。また $x\in U$, $y\notin U$, $y\in V$, $x\notin V$ です。
<!-- solution-end -->

<a id="ex-top4-a02"></a>
#### TOP4-A02 補有限位相で開集合は交わる
- Level: A

無限集合上の補有限位相で、任意の二つの非空開集合 $U,V$ が交わることを示せ。

<!-- solution-start -->
**解答**：もし $U\cap V=\varnothing$ なら

$$
X=(X\setminus U)\cup(X\setminus V)
$$

です。二つの補集合は有限なので右辺は有限となり、$X$ が無限であることに反します。
<!-- solution-end -->

<a id="ex-top4-a03"></a>
#### TOP4-A03 第二可算から局所基底を作る
- Level: A

可算基底 $\mathcal B$ を持つ空間で、点 $x$ の可算局所基底を $\mathcal B$ から構成せよ。

<!-- solution-start -->
**解答**：

$$
\mathcal B_x=\{B\in\mathcal B:x\in B\}
$$

とします。これは可算です。任意の $x$ の近傍 $N$ に対し、$x\in O\subseteq N$ となる開集合 $O$ を取り、基底性から $x\in B\subseteq O$ となる $B\in\mathcal B$ を取れば $B\in\mathcal B_x$ です。
<!-- solution-end -->

<a id="ex-top4-a04"></a>
#### TOP4-A04 離散空間の局所基底
- Level: A

離散空間 $X$ で各点 $x$ の最も単純な局所基底を一つ書け。

<!-- solution-start -->
**解答**：$\{\{x\}\}$ です。任意の $x$ の近傍は $x$ を含むので $\{x\}$ を含みます。
<!-- solution-end -->

<a id="ex-top4-a05"></a>
#### TOP4-A05 距離空間の第一可算性
- Level: A

距離空間 $(X,d)$ で $\{B(x,2^{-n}):n\in\mathbb N\}$ も $x$ の局所基底になることを示せ。

<!-- solution-start -->
**解答**：$N$ を $x$ の近傍とすると、ある $\varepsilon>0$ で $B(x,\varepsilon)\subseteq N$ とできます。$2^{-n}<\varepsilon$ となる $n$ を取れば

$$
B(x,2^{-n})\subseteq B(x,\varepsilon)\subseteq N.
$$
<!-- solution-end -->

### Level B

<a id="ex-top4-b01"></a>
#### TOP4-B01 Hausdorff から $T_1$
- Level: B

Hausdorff 空間 $X$ と $y\in X$ に対し、$X\setminus\{y\}$ を開集合の合併として表し、$\{y\}$ が閉であることを示せ。

<!-- solution-start -->
**解答**：各 $x\ne y$ に対し Hausdorff 性から互いに素な開近傍 $x\in U_x$, $y\in V_x$ を取ります。すると $y\notin U_x$ なので

$$
X\setminus\{y\}=\bigcup_{x\ne y}U_x.
$$

右辺は開集合の合併だから開です。従って $\{y\}$ は閉です。
<!-- solution-end -->

<a id="ex-top4-b02"></a>
#### TOP4-B02 非可算離散空間は第二可算でない
- Level: B

非可算離散空間 $X$ の任意の基底 $\mathcal B$ が全ての一点集合を含むことを示せ。

<!-- solution-start -->
**解答**：各 $x\in X$ について $\{x\}$ は開です。基底性から $x\in B\subseteq\{x\}$ となる $B\in\mathcal B$ が存在します。従って $B=\{x\}$ です。よって $\{x\}\in\mathcal B$ が全ての $x$ で成り立ち、$\mathcal B$ は非可算です。
<!-- solution-end -->

<a id="ex-top4-b03"></a>
#### TOP4-B03 第二可算から稠密集合を構成する
- Level: B

可算基底 $\mathcal B=\{B_n:n\in\mathbb N\}$ の各非空要素から一点 $x_n$ を選ぶ。$D=\{x_n\}$ が稠密であることを示せ。

<!-- solution-start -->
**解答**：非空開集合 $U$ と $x\in U$ を取ります。基底性から $x\in B_n\subseteq U$ となる非空 $B_n$ が存在します。選んだ $x_n$ は $D\cap U$ に入るので、全ての非空開集合が $D$ と交わります。従って $D$ は稠密です。
<!-- solution-end -->

<a id="ex-top4-b04"></a>
#### TOP4-B04 可分距離空間の基底
- Level: B

可分距離空間 $(X,d)$ の可算稠密集合を $D$ とする。

$$
\{B(a,q):a\in D,\ q\in\mathbb Q_{>0}\}
$$

が可算である理由と、任意の開集合の基底になる理由を説明せよ。

<!-- solution-start -->
**解答**：$D$ と $\mathbb Q_{>0}$ は可算なので直積も可算です。$x\in U$ に対し $B(x,\varepsilon)\subseteq U$ を取り、$a\in D\cap B(x,\varepsilon/3)$ と $\varepsilon/3<q<2\varepsilon/3$ を選びます。すると $x\in B(a,q)$ です。さらに $y\in B(a,q)$ なら

$$
d(x,y)<\varepsilon/3+2\varepsilon/3=\varepsilon,
$$

なので $B(a,q)\subseteq U$ です。
<!-- solution-end -->

### Level C

<a id="ex-top4-c01"></a>
#### TOP4-C01 $K$ 位相が正則でない理由を再構成する
- Level: C

$K=\{1/n:n\in\mathbb N\}$ と $0$ を用い、本文を見ずに $K$ 位相が正則でないことを証明せよ。特に次の三点を明示せよ。

1. $K$ が閉であること。
2. $0$ の任意の開近傍が $(-\varepsilon,\varepsilon)\setminus K$ を含むこと。
3. $K$ を含む開集合の $1/n$ 近傍が通常の開区間を含むこと。

<!-- solution-start -->
**解答**：$\mathbb R\setminus K$ は $(a,b)\setminus K$ 型の基底要素の合併なので開、従って $K$ は閉です。正則性により $0\in U$, $K\subseteq V$, $U\cap V=\varnothing$ とできると仮定します。$U$ の基底要素から $(-\varepsilon,\varepsilon)\setminus K\subseteq U$ を取ります。十分大きな $n$ で $1/n<\varepsilon/2$ とします。$1/n\in V$ を含む基底要素は $(a,b)\setminus K$ 型ではありえないので通常の区間 $(a,b)\subseteq V$ です。$(a,b)\cap(-\varepsilon,\varepsilon)$ から $K$ に属さない点を取れば $U\cap V$ に入って矛盾します。
<!-- solution-end -->

<a id="ex-top4-c02"></a>
#### TOP4-C02 対角化で局所基底候補を全て壊す
- Level: C

本文の空間 $X=\{p\}\cup(\mathbb N\times\mathbb N)$ で、可算な近傍族 $B_1,B_2,\dots$ が $p$ の局所基底になれないことを、各第 $k$ 行から一点ずつ選ぶ対角化で示せ。

<!-- solution-start -->
**解答**：各 $B_k$ は $p$ の近傍なので、その中の開近傍 $O_k$ を取り、第 $k$ 行で $(k,n_k)\in O_k\subseteq B_k$ を選べます。

$$
W=X\setminus\{(k,n_k):k\in\mathbb N\}
$$

は各行から一点しか除かないため $p$ の開近傍です。しかし各 $k$ について $(k,n_k)\in B_k\setminus W$ なので $B_k\not\subseteq W$ です。従ってどの $B_k$ も $W$ を細分せず、局所基底ではありません。
<!-- solution-end -->

---

## 10. この章の到達点

分離公理では、番号を覚えるのではなく

$$
\text{二点}
\longrightarrow
\text{点と閉集合}
\longrightarrow
\text{二閉集合}
$$

と分離対象が強くなる流れを見ました。$T_4\Rightarrow T_3\Rightarrow T_2\Rightarrow T_1\Rightarrow T_0$ の証明では、特に $T_1$ が一点集合を閉集合へ変える役割を担います。

可算性公理では、第一可算は点ごとの近傍、第二可算は空間全体の基底、可分性は稠密な点集合を可算化します。一般には同じではありませんが、第二可算からは第一可算と可分性が従い、距離空間では可分性と第二可算性が一致します。

次のコンパクト性では、ここで得た分離性・可算性の条件が、有限部分被覆、点列、Lebesgue 数などの性質とどう噛み合うかを調べます。
