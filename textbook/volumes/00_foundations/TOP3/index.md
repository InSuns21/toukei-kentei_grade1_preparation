# TOP3 標準位相 III：連結性・弧状連結性・連結成分

<!-- definition-example-audit: strict -->

TOP1 では位相を生成する方法、TOP2 では商と貼り合わせで新しい空間を作る方法を学びました。この章では、できあがった空間が**一つにつながっているか**を位相だけで判定します。

「図でひと続きに見える」は定義ではありません。連結性では、空間を二つの非空な開部分へ分けられるかを調べます。弧状連結性では、二点を連続な道で結べるかを調べます。この二つは似ていますが同じ定義ではなく、まず

$$
\text{弧状連結}\Longrightarrow\text{連結}
$$

を証明します。

この章でも、矛盾の発生箇所、開集合の相対位相での扱い、包含関係を「明らか」で飛ばしません。

---

## 1. 空間を二つの開集合へ切る

<a id="def-top3-separation"></a>
<!-- formal-statement-start -->
> **定義（分離）**  
> 位相空間 $X$ に対し、部分集合 $U,V\subseteq X$ が次の四条件
>
> 1. $U,V$ は $X$ で開である。
> 2. $U\ne\varnothing$, $V\ne\varnothing$ である。
> 3. $U\cap V=\varnothing$ である。
> 4. $X=U\cup V$ である。
>
> を満たすとき、$(U,V)$ を $X$ の **分離** という。
<!-- formal-statement-end -->

<!-- definition-example-start: def-top3-separation -->
**定義の確認**
### 1.1 二本に離れた区間

$$
X=(-2,-1)\cup(1,2)\subset\mathbb R
$$

に部分空間位相を入れます。

$$
U=(-2,-1),\qquad V=(1,2)
$$

はどちらも $X$ で開で、非空、互いに交わらず、$U\cup V=X$ です。従って $(U,V)$ は $X$ の分離です。

単に $X=A\cup B$ と二つに書けるだけでは足りません。両方が非空で、互いに交わらず、しかも相対位相で開であることが必要です。
<!-- definition-example-end -->

<a id="def-top3-connected"></a>
<!-- formal-statement-start -->
> **定義（連結空間・連結性）**  
> 位相空間 $X$ に分離が存在しないとき、$X$ は **連結** であるという。部分集合 $A\subseteq X$ が連結であるとは、$A$ に部分空間位相を入れた位相空間が連結であることをいう。
<!-- formal-statement-end -->

<!-- definition-example-start: def-top3-connected -->
**定義の確認**
### 1.2 一点空間は連結

$X=\{p\}$ とします。もし $X=U\cup V$ が分離なら、$U,V$ はともに非空なので、唯一の点 $p$ は $U$ と $V$ の両方に入らなければなりません。すると

$$
p\in U\cap V,
$$

となり $U\cap V=\varnothing$ に反します。従って一点空間は連結です。
<!-- definition-example-end -->

---

## 2. 連結性は「非自明な開閉集合がない」と言い換えられる

<a id="def-top3-clopen"></a>
<!-- formal-statement-start -->
> **定義（開閉集合）**  
> 位相空間 $X$ の部分集合 $A\subseteq X$ が、$X$ で開集合であると同時に閉集合でもあるとき、$A$ を **開閉集合（clopen set）** という。
<!-- formal-statement-end -->

<!-- definition-example-start: def-top3-clopen -->
**定義の確認**
### 2.1 空集合と全体は必ず開閉集合

$\varnothing$ と $X$ はどちらも開です。また

$$
X\setminus\varnothing=X,
\qquad
X\setminus X=\varnothing
$$

も開なので、$\varnothing$ と $X$ はどちらも閉でもあります。従って任意の位相空間で $\varnothing$ と $X$ は開閉集合です。これら二つ以外の開閉集合を **非自明な開閉集合** と呼びます。
<!-- definition-example-end -->

<a id="prop-top3-clopen"></a>
<!-- formal-statement-start -->
> **命題（連結性と非自明な開閉集合の不存在）**  
> 位相空間 $X$ について、次は同値である。
>
> 1. $X$ は連結である。
> 2. $X$ の開閉集合は $\varnothing$ と $X$ だけである。
<!-- formal-statement-end -->

<!-- proof-start -->
### 証明

まず $X$ が連結であるとします。$A\subseteq X$ が開閉集合で、

$$
A\ne\varnothing,\qquad A\ne X
$$

と仮定します。$A$ は開です。また $A$ は閉なので補集合 $X\setminus A$ は開です。$A\ne X$ だから $X\setminus A\ne\varnothing$ です。さらに

$$
A\cap(X\setminus A)=\varnothing,
\qquad
A\cup(X\setminus A)=X.
$$

従って $(A,X\setminus A)$ は $X$ の分離になり、連結性に矛盾します。よって非自明な開閉集合は存在しません。

逆に、$X$ の開閉集合が $\varnothing,X$ だけであるとします。もし $X$ が連結でなければ、分離 $(U,V)$ が存在します。$U$ は開です。また

$$
X\setminus U=V
$$

も開なので、$U$ は閉でもあります。分離の条件から

$$
U\ne\varnothing,\qquad U\ne X,
$$

です。従って $U$ は非自明な開閉集合となり、仮定に矛盾します。ゆえに $X$ は連結です。$\square$
<!-- proof-end -->

この命題では二つの向きで同じ補集合を使っていますが、役割が逆です。分離からは一方が閉であることを得て、非自明な開閉集合からは補集合と組にして分離を作ります。

---

## 3. 連続写像は連結性を壊さない

<a id="thm-top3-continuous-image"></a>
<!-- formal-statement-start -->
> **定理（連結空間の連続像は連結）**  
> $X$ を連結空間、$f:X\to Y$ を連続写像とする。このとき像 $f(X)$ は $Y$ の部分空間として連結である。
<!-- formal-statement-end -->

<!-- proof-start -->
### 証明

反対に $f(X)$ が連結でないと仮定します。すると $f(X)$ の分離 $(A,B)$ が存在します。

$A$ は部分空間 $f(X)$ で開なので、ある $Y$ の開集合 $O_A$ が存在して

$$
A=f(X)\cap O_A
$$

と書けます。同様に、ある開集合 $O_B\subseteq Y$ が存在して

$$
B=f(X)\cap O_B
$$

と書けます。

ここで

$$
f^{-1}(A)=f^{-1}(O_A),
\qquad
f^{-1}(B)=f^{-1}(O_B)
$$

です。実際、$f(x)$ は常に $f(X)$ に属するので、$f(x)\in f(X)\cap O_A$ であることと $f(x)\in O_A$ であることは同値です。$f$ は連続だから、二つの逆像は $X$ で開です。

$A,B$ は非空であり、しかも $A,B\subseteq f(X)$ なので、それぞれの点には $X$ 内の原像があります。従って

$$
f^{-1}(A)\ne\varnothing,
\qquad
f^{-1}(B)\ne\varnothing.
$$

さらに

$$
f^{-1}(A)\cap f^{-1}(B)
=f^{-1}(A\cap B)
=f^{-1}(\varnothing)
=\varnothing,
$$

また

$$
f^{-1}(A)\cup f^{-1}(B)
=f^{-1}(A\cup B)
=f^{-1}(f(X))
=X.
$$

従って $(f^{-1}(A),f^{-1}(B))$ は $X$ の分離です。これは $X$ の連結性に矛盾します。ゆえに $f(X)$ は連結です。$\square$
<!-- proof-end -->

「連続だから連結性が保存される」と一行で済ませず、像側の分離を逆像で元の空間へ引き戻すのが証明の核心です。

---

## 4. 実数の区間は連結である

ここで **区間** とは、$I\subseteq\mathbb R$ が

$$
a,b\in I,\quad a<c<b
\quad\Longrightarrow\quad
c\in I
$$

を満たすこととします。開区間・閉区間・半開区間・半直線・$\mathbb R$ 自身を含みます。

<a id="thm-top3-real-interval"></a>
<!-- formal-statement-start -->
> **定理（実数の区間は連結）**  
> 任意の区間 $I\subseteq\mathbb R$ は、通常位相から入る部分空間位相について連結である。
<!-- formal-statement-end -->

<!-- proof-start -->
### 証明

空集合と一点集合は直ちに連結なので、少なくとも二点を持つ場合を考えます。

反対に $I$ が連結でないと仮定し、分離 $(U,V)$ を取ります。$U,V$ はともに非空なので、$u\in U$, $v\in V$ を選べます。必要なら $U,V$ を入れ替えて、さらに点の名前を取り直すことで

$$
a\in U,
\qquad
b\in V,
\qquad
a<b
$$

とできます。区間性から

$$
[a,b]\subseteq I.
$$

集合

$$
S=U\cap[a,b]
$$

を考えます。$a\in S$ なので $S$ は非空であり、$b$ は上界です。実数の上限性質により

$$
c=\sup S
$$

が存在します。$a\le c\le b$ なので $c\in[a,b]\subseteq I$ です。$I=U\cup V$ だから、$c$ は $U$ または $V$ のどちらかに属します。

**場合1：$c\in U$。**  
$U$ は $I$ で開なので、ある $\varepsilon>0$ が存在して

$$
(c-\varepsilon,c+\varepsilon)\cap I\subseteq U
$$

となります。$b\in V$ で $U\cap V=\varnothing$ だから $c\ne b$、従って $c<b$ です。そこで

$$
c<d<\min\{c+\varepsilon,b\}
$$

となる $d$ を取れます。$c<d<b$ と $a,b\in I$ から区間性により $d\in I$ です。また $d<c+\varepsilon$ なので $d\in U$。従って

$$
d\in U\cap[a,b]=S
$$

ですが、$d>c=\sup S$ です。これは $c$ が $S$ の上界であることに矛盾します。

**場合2：$c\in V$。**  
$V$ は $I$ で開なので、ある $\varepsilon>0$ が存在して

$$
(c-\varepsilon,c+\varepsilon)\cap I\subseteq V
$$

となります。$a\in U$ だから $c\ne a$、従って $a<c$ です。

正数

$$
\eta=\min\left\{\frac{\varepsilon}{2},\frac{c-a}{2}\right\}
$$

を取ります。$c=\sup S$ なので $c-\eta$ は $S$ の上界ではありません。従ってある $s\in S$ が存在して

$$
c-\eta<s\le c
$$

となります。$c\in V$ かつ $S\subseteq U$ で $U\cap V=\varnothing$ だから $s\ne c$、よって

$$
c-\varepsilon<s<c.
$$

$s\in[a,b]\subseteq I$ でもあるので、上の $V$ の近傍条件から $s\in V$ です。一方 $s\in S\subseteq U$ ですから

$$
s\in U\cap V,
$$

となり、$U\cap V=\varnothing$ に矛盾します。

どちらの場合も矛盾するので分離は存在せず、$I$ は連結です。$\square$
<!-- proof-end -->

上限 $c$ を置いただけでは証明は終わりません。$c\in U$ なら「上限より右の $S$ の点」を作り、$c\in V$ なら「上限のすぐ左にある $S$ の点」を作る、という二つの矛盾が必要です。

---

## 5. 実直線では「連結」と「区間」が一致する

<a id="thm-top3-connected-real-interval"></a>
<!-- formal-statement-start -->
> **定理（実数の連結部分集合は区間）**  
> 部分集合 $C\subseteq\mathbb R$ が連結であることと、$C$ が区間であることは同値である。
<!-- formal-statement-end -->

<!-- proof-start -->
### 証明

区間なら連結であることは直前の定理で示しました。

逆に $C$ が連結であるとします。$x,z\in C$ と $x<z$ を取り、その間の点 $y$、

$$
x<y<z
$$

を考えます。$y\notin C$ と仮定します。このとき

$$
U=C\cap(-\infty,y),
\qquad
V=C\cap(y,\infty)
$$

と置きます。$(-\infty,y)$ と $(y,\infty)$ は $\mathbb R$ で開なので、$U,V$ は $C$ の部分空間位相で開です。また

$$
x\in U,
\qquad
z\in V,
$$

だから両方とも非空です。二つは互いに交わりません。さらに $y\notin C$ なので、任意の $c\in C$ は $c<y$ または $c>y$ のどちらかであり、

$$
C=U\cup V.
$$

従って $(U,V)$ は $C$ の分離となり、連結性に矛盾します。ゆえに $y\in C$ です。

任意の $x<y<z$ についてこの結論が成り立つので、$C$ は区間です。$\square$
<!-- proof-end -->

この結果により、実数上では連結集合を分類できます。例えば $[0,1]$, $(0,1)$, $[0,\infty)$ は連結ですが、$[0,1]\cup[2,3]$ は区間ではないので連結ではありません。

---

## 6. 二点を連続な道で結ぶ

<a id="def-top3-path-connected"></a>
<!-- formal-statement-start -->
> **定義（道・弧状連結）**  
> 位相空間 $X$ の点 $x,y\in X$ に対し、連続写像

$$
\gamma:[0,1]\to X
$$

> が

$$
\gamma(0)=x,
\qquad
\gamma(1)=y
$$

> を満たすとき、$\gamma$ を $x$ から $y$ への **道（path）** という。任意の二点 $x,y\in X$ の間に道が存在するとき、$X$ は **弧状連結（path-connected）** であるという。
>
> ここで道に単射性は要求しない。
<!-- formal-statement-end -->

<!-- definition-example-start: def-top3-path-connected -->
**定義の確認**
### 6.1 ユークリッド空間では線分が道になる

$x,y\in\mathbb R^n$ に対し

$$
\gamma(t)=(1-t)x+ty
$$

と置きます。各座標は $t$ の一次関数なので連続で、

$$
\gamma(0)=x,
\qquad
\gamma(1)=y.
$$

従って $\mathbb R^n$ の任意の二点は線分で結べます。
<!-- definition-example-end -->

<a id="thm-top3-path-implies-connected"></a>
<!-- formal-statement-start -->
> **定理（弧状連結なら連結）**  
> 弧状連結な位相空間は連結である。
<!-- formal-statement-end -->

<!-- proof-start -->
### 証明

$X$ が弧状連結だが連結ではないと仮定します。分離 $(U,V)$ を取ります。$U,V$ は非空なので

$$
x\in U,
\qquad
y\in V
$$

を選べます。弧状連結性から、$x$ と $y$ を結ぶ道

$$
\gamma:[0,1]\to X
$$

が存在します。

実区間 $[0,1]$ は連結であり、$\gamma$ は連続なので、連続像

$$
K=\gamma([0,1])
$$

は連結です。

一方

$$
K=(K\cap U)\cup(K\cap V).
$$

$U,V$ は $X$ で開なので $K\cap U,K\cap V$ は $K$ で開です。また

$$
x=\gamma(0)\in K\cap U,
\qquad
y=\gamma(1)\in K\cap V,
$$

だから両方とも非空です。さらに

$$
(K\cap U)\cap(K\cap V)
=K\cap(U\cap V)
=\varnothing.
$$

従って $(K\cap U,K\cap V)$ は $K$ の分離です。これは $K$ の連結性に矛盾します。ゆえに $X$ は連結です。$\square$
<!-- proof-end -->

この次の命題だけは、後続の [F0-00G](../F0_00G_凸集合_凸関数_凸最適化/index.md) で定義する **凸集合** を先取りして使います。TOP3の前提へ追加するのではなく、ここでは「線分が集合内に残る」という性質だけを使います。

<a id="prop-top3-convex-path"></a>
<!-- formal-statement-start -->
> **命題（凸集合は弧状連結）**  
> 凸集合 $C\subseteq\mathbb R^n$ は弧状連結である。
<!-- formal-statement-end -->

<!-- proof-start -->
### 証明

$x,y\in C$ を任意に取ります。凸性から、任意の $t\in[0,1]$ に対して

$$
(1-t)x+ty\in C.
$$

従って

$$
\gamma(t)=(1-t)x+ty
$$

は $[0,1]$ から $C$ への写像として定義できます。各座標が一次関数なので連続であり、$\gamma(0)=x$, $\gamma(1)=y$ です。よって任意の二点を道で結べるので $C$ は弧状連結です。$\square$
<!-- proof-end -->

したがって球、開球、閉球、直方体などの凸集合は弧状連結であり、特に連結です。

---

## 7. 共通点を持つ連結集合はまとめても連結

<a id="lem-top3-union-connected"></a>
<!-- formal-statement-start -->
> **補題（共通点を持つ連結集合族の合併は連結）**  
> 位相空間 $X$ の連結部分集合族 $\{C_\alpha\}_{\alpha\in A}$ があり、ある点 $p\in X$ が全ての $C_\alpha$ に属するとする。このとき

$$
C=\bigcup_{\alpha\in A}C_\alpha
$$

> は連結である。
<!-- formal-statement-end -->

<!-- proof-start -->
### 証明

$C$ が連結でないと仮定し、分離 $(U,V)$ を取ります。共通点 $p$ は $C=U\cup V$ に属するので、$p\in U$ または $p\in V$ です。必要なら $U,V$ を入れ替えて

$$
p\in U
$$

とします。

任意の $\alpha$ を固定します。$C_\alpha\subseteq C$ なので

$$
C_\alpha=(C_\alpha\cap U)\cup(C_\alpha\cap V).
$$

$U,V$ は $C$ で開だから、二つの交わりは $C_\alpha$ で開です。また互いに交わりません。しかも

$$
p\in C_\alpha\cap U,
$$

だから $C_\alpha\cap U$ は非空です。

もし $C_\alpha\cap V$ も非空なら、$(C_\alpha\cap U,C_\alpha\cap V)$ が $C_\alpha$ の分離となり、$C_\alpha$ の連結性に矛盾します。従って

$$
C_\alpha\cap V=\varnothing,
\qquad
C_\alpha\subseteq U.
$$

これは全ての $\alpha$ について成り立つので

$$
C=\bigcup_{\alpha\in A}C_\alpha\subseteq U.
$$

しかし $(U,V)$ は $C$ の分離だから $V\ne\varnothing$ であり、$C=U\cup V$ に反します。従って $C$ は連結です。$\square$
<!-- proof-end -->

共通点という条件が、各 $C_\alpha$ を分離の同じ側へ固定する役割を果たしています。

---

## 8. 連結成分は「その点を含む最大の連結部分」

<a id="def-top3-component"></a>
<!-- formal-statement-start -->
> **定義（連結成分）**  
> 位相空間 $X$ と点 $x\in X$ に対し、$x$ を含む全ての連結部分集合の合併

$$
C(x)
=
\bigcup\{A\subseteq X:A\text{ は連結で }x\in A\}
$$

> を $x$ の **連結成分** という。
<!-- formal-statement-end -->

<!-- definition-example-start: def-top3-component -->
**定義の確認**
### 8.1 実直線から原点を除く

$$
X=\mathbb R\setminus\{0\}
$$

を考えます。$x>0$ なら $(0,\infty)$ は区間なので連結で、$x$ を含みます。一方、正の点と負の点を同時に含む $X$ の連結部分集合があれば、実数の連結部分集合は区間なので、その間の $0$ も含まなければなりません。しかし $0\notin X$ です。従って

$$
C(x)=
\begin{cases}
(-\infty,0),&x<0,\\
(0,\infty),&x>0.
\end{cases}
$$

です。
<!-- definition-example-end -->

<a id="thm-top3-components-partition"></a>
<!-- formal-statement-start -->
> **定理（連結成分は極大連結集合であり空間を分割する）**  
> 任意の $x\in X$ について $C(x)$ は連結であり、$x$ を含む連結部分集合の中で包含関係について最大である。さらに任意の $x,y\in X$ について

$$
C(x)=C(y)
\quad\text{または}\quad
C(x)\cap C(y)=\varnothing
$$

> のどちらかが成り立つ。従って連結成分全体は $X$ を分割する。
<!-- formal-statement-end -->

<!-- proof-start -->
### 証明

まず $C(x)$ の定義に現れる全ての連結集合は共通点 $x$ を持ちます。従って[共通点を持つ連結集合族の合併は連結](#lem-top3-union-connected)から、$C(x)$ 自身が連結です。

次に極大性を示します。$D\subseteq X$ が連結で

$$
x\in D
$$

とします。$D$ は $C(x)$ の定義で合併している集合族の一員なので

$$
D\subseteq C(x).
$$

従って $C(x)$ は $x$ を含む全ての連結部分集合を含みます。

最後に二つの成分が交わる場合を考えます。$C(x)\cap C(y)\ne\varnothing$ とします。二つの連結集合は共通点を持つので

$$
C(x)\cup C(y)
$$

は連結です。この合併は $x$ を含むため、$C(x)$ の極大性から

$$
C(x)\cup C(y)\subseteq C(x).
$$

よって $C(y)\subseteq C(x)$ です。同様に、この合併は $y$ も含むので $C(y)$ の極大性から

$$
C(x)\subseteq C(y).
$$

従って $C(x)=C(y)$ です。つまり異なる連結成分は交わりません。

各 $x\in X$ は少なくとも一点集合 $\{x\}$ という連結部分集合に属するので $x\in C(x)$ です。従って連結成分の合併は $X$ 全体であり、異なる成分は互いに素です。ゆえに連結成分は $X$ を分割します。$\square$
<!-- proof-end -->

---

## 9. 連結成分は閉集合である

まず連結集合を閉包しても連結性が壊れないことを示します。

<a id="lem-top3-closure-connected"></a>
<!-- formal-statement-start -->
> **補題（連結集合の閉包は連結）**  
> 位相空間 $X$ の連結部分集合 $A\subseteq X$ に対し、閉包 $\overline A$ は連結である。
<!-- formal-statement-end -->

<!-- proof-start -->
### 証明

$\overline A$ が連結でないと仮定し、分離 $(U,V)$ を取ります。

$A\subseteq\overline A=U\cup V$ なので

$$
A=(A\cap U)\cup(A\cap V).
$$

$U,V$ は $\overline A$ で開だから、$A\cap U,A\cap V$ は $A$ で開です。また互いに交わりません。$A$ は連結なので、両方が非空であることはできません。必要なら $U,V$ を入れ替えて

$$
A\cap V=\varnothing,
\qquad
A\subseteq U
$$

とします。

一方、分離なので $V\ne\varnothing$ です。$y\in V$ を取ります。$V$ は部分空間 $\overline A$ で開なので、ある $X$ の開集合 $O$ が存在して

$$
V=O\cap\overline A,
\qquad
y\in O
$$

と書けます。

$y\in\overline A$ であり $O$ は $y$ の開近傍なので、閉包の性質から

$$
O\cap A\ne\varnothing.
$$

ところが $A\subseteq\overline A$ なので

$$
O\cap A
\subseteq
O\cap\overline A
=V.
$$

従って $A\cap V\ne\varnothing$ となり、先ほどの $A\cap V=\varnothing$ に矛盾します。ゆえに $\overline A$ は連結です。$\square$
<!-- proof-end -->

<a id="thm-top3-components-closed"></a>
<!-- formal-statement-start -->
> **定理（連結成分は閉集合）**  
> 位相空間 $X$ の各連結成分 $C(x)$ は $X$ の閉集合である。
<!-- formal-statement-end -->

<!-- proof-start -->
### 証明

$C(x)$ は連結なので、直前の補題から閉包

$$
\overline{C(x)}
$$

も連結です。また

$$
x\in C(x)\subseteq\overline{C(x)}.
$$

従って $\overline{C(x)}$ は $x$ を含む連結部分集合です。$C(x)$ の極大性から

$$
\overline{C(x)}\subseteq C(x).
$$

逆の包含

$$
C(x)\subseteq\overline{C(x)}
$$

は閉包の定義から常に成り立ちます。従って

$$
C(x)=\overline{C(x)}.
$$

よって $C(x)$ は閉集合です。$\square$
<!-- proof-end -->

### 9.1 連結成分は一般には開ではない

有理数全体 $\mathbb Q$ に $\mathbb R$ からの部分空間位相を入れます。異なる $p<q$ を含む部分集合 $A\subseteq\mathbb Q$ を考えると、$p<\alpha<q$ となる無理数 $\alpha$ を取れます。

$$
A_-=A\cap(-\infty,\alpha),
\qquad
A_+=A\cap(\alpha,\infty)
$$

は $A$ で開、非空、互いに素で、$\alpha\notin\mathbb Q$ なので $A=A_-\cup A_+$ です。従って二点以上を含む $\mathbb Q$ の部分集合は連結ではありません。つまり $\mathbb Q$ の連結成分は全て一点集合です。

しかし任意の $q\in\mathbb Q$ と $\varepsilon>0$ に対し $(q-\varepsilon,q+\varepsilon)\cap\mathbb Q$ は $q$ 以外の有理数も含むので、$\{q\}$ は $\mathbb Q$ で開ではありません。従って「連結成分は閉」は一般に「開でもある」へ強められません。

---

## 10. 連結性を使うと中間値性が見える

連結性は「途中を飛ばせない」という性質を抽象化しています。$X$ が連結で $f:X\to\mathbb R$ が連続なら、連続像 $f(X)$ は連結です。実数の連結部分集合は区間なので、

$$
f(x)<c<f(y)
$$

なら必ず

$$
c\in f(X)
$$

です。従ってある $z\in X$ が存在して $f(z)=c$ となります。

これは中間値の定理を「区間上の計算定理」ではなく、**連結空間から実直線への連続写像は値を飛び越せない**という位相的事実として読み直したものです。

---

## 11. 構造を見分けるチェックリスト

1. **分離を作るのか、否定するのか**：二つの集合が相対位相で開・非空・互いに素・全体を覆うか。
2. **clopenを見るのか**：補集合も開なら、非自明な開閉集合から分離を作れる。
3. **連続像を使うのか**：像で分離が起きたと仮定し、逆像で元の空間の分離を作る。
4. **実数上か**：連結部分集合は区間なので、中間の点が欠ければ分離できる。
5. **道を作れるか**：具体的な $\gamma:[0,1]\to X$ を書き、値域が本当に $X$ 内にあることまで確認する。
6. **連結成分か**：その点を含む連結集合を合併し、共通点を使って合併自体の連結性を示す。
7. **閉性か**：連結集合の閉包が連結であることと成分の極大性を組み合わせる。

---

## 12. 演習

### Level A

<a id="ex-top3-a01"></a>
#### TOP3-A01 原点を除いた実直線の分離
- Level: A

$$
X=\mathbb R\setminus\{0\}
$$

が連結でないことを、分離を具体的に書いて示せ。

<!-- solution-start -->
**解答**：

$$
U=(-\infty,0),
\qquad
V=(0,\infty)
$$

と置きます。$U,V$ は $X$ の部分空間位相で開、非空、互いに素であり、

$$
X=U\cup V.
$$

従って $(U,V)$ は $X$ の分離なので、$X$ は連結ではありません。
<!-- solution-end -->

<a id="ex-top3-a02"></a>
#### TOP3-A02 非自明な開閉集合
- Level: A

位相空間 $X$ に非空真部分集合 $A$ があり、$A$ と $X\setminus A$ がともに開であるとする。$X$ が連結でないことを示せ。

<!-- solution-start -->
**解答**：$A$ は非空で、真部分集合だから $X\setminus A$ も非空です。仮定より両方とも開で、

$$
A\cap(X\setminus A)=\varnothing,
\qquad
A\cup(X\setminus A)=X.
$$

従って $(A,X\setminus A)$ は分離です。よって $X$ は連結ではありません。
<!-- solution-end -->

<a id="ex-top3-a03"></a>
#### TOP3-A03 線分で結ぶ
- Level: A

閉球

$$
\overline B(0,1)=\{x\in\mathbb R^n:\|x\|\le1\}
$$

が弧状連結であることを示せ。

<!-- solution-start -->
**解答**：$x,y\in\overline B(0,1)$ を取り、

$$
\gamma(t)=(1-t)x+ty
$$

と置きます。三角不等式から

$$
\|\gamma(t)\|
\le(1-t)\|x\|+t\|y\|
\le(1-t)+t=1.
$$

従って $\gamma(t)\in\overline B(0,1)$ です。$\gamma$ は連続で、$\gamma(0)=x$, $\gamma(1)=y$ なので道です。任意の二点を結べるため閉球は弧状連結です。
<!-- solution-end -->

<a id="ex-top3-a04"></a>
#### TOP3-A04 連結成分を求める
- Level: A

$$
X=(-3,-2)\cup[0,1]\cup(5,\infty)
$$

の連結成分を全て求めよ。

<!-- solution-start -->
**解答**：三つの部分集合

$$
(-3,-2),\qquad[0,1],\qquad(5,\infty)
$$

はいずれも実数の区間なので連結です。

異なる二つの部分を同時に含む連結部分集合があると、その集合は実数の連結部分集合なので区間でなければなりません。しかし二つの部分の間には $X$ に属さない点があります。従ってそのような連結部分集合は存在しません。

よって上の三集合がちょうど連結成分です。
<!-- solution-end -->

### Level B

<a id="ex-top3-b01"></a>
#### TOP3-B01 二つの連結集合の合併
- Level: B

$A,B\subseteq X$ が連結で $A\cap B\ne\varnothing$ とする。$A\cup B$ が連結であることを、分離を仮定して証明せよ。

<!-- solution-start -->
**解答**：$p\in A\cap B$ を取ります。$A\cup B$ に分離 $(U,V)$ があると仮定し、必要なら入れ替えて $p\in U$ とします。

$A=(A\cap U)\cup(A\cap V)$ で、二つは $A$ で開かつ互いに素です。$p\in A\cap U$ なので $A\cap U$ は非空です。$A$ は連結だから $A\cap V$ は空でなければならず、$A\subseteq U$ です。

同じ議論で $B\subseteq U$ です。従って $A\cup B\subseteq U$ となり、分離のもう一方 $V$ が非空であることに矛盾します。よって $A\cup B$ は連結です。
<!-- solution-end -->

<a id="ex-top3-b02"></a>
#### TOP3-B02 連続な二値関数
- Level: B

$X$ を連結空間とし、$D=\{0,1\}$ に離散位相を入れる。連続写像 $f:X\to D$ は定数写像であることを示せ。

<!-- solution-start -->
**解答**：連続像 $f(X)$ は連結です。一方、離散空間 $D$ の部分集合で二点 $0,1$ を両方含むものは $D$ 自身であり、

$$
D=\{0\}\cup\{1\}
$$

は二つの非空な開集合による分離です。従って $D$ は連結ではありません。

よって連結な $f(X)$ は $D$ の二点を両方含めず、一点集合でなければなりません。従って $f$ は定数写像です。
<!-- solution-end -->

<a id="ex-top3-b03"></a>
#### TOP3-B03 連結性から中間値性を導く
- Level: B

$X$ を連結空間、$f:X\to\mathbb R$ を連続とする。$x,y\in X$ について

$$
f(x)<c<f(y)
$$

なら、ある $z\in X$ が存在して $f(z)=c$ となることを示せ。

<!-- solution-start -->
**解答**：連続像 $f(X)$ は連結です。実数の連結部分集合は区間なので、

$$
f(x),f(y)\in f(X),
\qquad
f(x)<c<f(y)
$$

から

$$
c\in f(X)
$$

です。像の定義により、ある $z\in X$ が存在して $f(z)=c$ となります。
<!-- solution-end -->

### Level C

<a id="ex-top3-c01"></a>
#### TOP3-C01 有理数の連結成分
- Level: C

$\mathbb Q$ に $\mathbb R$ からの部分空間位相を入れる。次を示せ。

1. $\mathbb Q$ の連結部分集合は一点集合または空集合だけである。
2. 従って各連結成分は一点集合である。
3. それにもかかわらず、各連結成分は $\mathbb Q$ で開ではない。

<!-- solution-start -->
**解答**：二点以上を含む $A\subseteq\mathbb Q$ が連結であると仮定します。異なる $p<q$ を $A$ から選び、密度性により

$$
p<\alpha<q
$$

となる無理数 $\alpha$ を取ります。

$$
U=A\cap(-\infty,\alpha),
\qquad
V=A\cap(\alpha,\infty)
$$

と置くと、$U,V$ は $A$ で開です。$p\in U$, $q\in V$ なので非空、互いに素です。さらに $\alpha\notin\mathbb Q$ なので $\alpha\notin A$ であり、全ての $a\in A$ は $a<\alpha$ または $a>\alpha$ です。従って

$$
A=U\cup V.
$$

これは $A$ の分離となり、連結性に矛盾します。よって $\mathbb Q$ の非空連結部分集合は一点集合だけです。従って各連結成分は $\{q\}$ です。

最後に $\{q\}$ が開だと仮定すると、ある $\varepsilon>0$ が存在して

$$
(q-\varepsilon,q+\varepsilon)\cap\mathbb Q=\{q\}
$$

となるはずです。しかし有理数の稠密性から、この区間には $q$ と異なる有理数が存在します。矛盾です。従って一点の連結成分は閉ですが開ではありません。
<!-- solution-end -->

---

## 13. 章末チェック

- 分離の四条件を列挙し、具体的な空間が非連結であることを分離で示せる。
- 連結性と「非自明な開閉集合がない」ことの両方向を証明できる。
- 連結空間の連続像が連結であることを、像の分離の逆像から証明できる。
- 実区間の連結性を、上限 $c$ が分離のどちら側に入っても矛盾することまで展開して証明できる。
- 実数の連結部分集合が区間であることを、中間点を一つ欠くと分離が生じることから証明できる。
- 道を具体式で書き、値域が空間内に収まることまで確認できる。
- 弧状連結なら連結であることを、道の像の連結性から証明できる。
- 共通点を持つ連結集合族の合併が連結である理由を説明できる。
- 連結成分の極大性と、異なる成分が交わらないことを両包含まで追って証明できる。
- 連結集合の閉包が連結であることを使い、連結成分が閉集合であることを証明できる。
- 連結成分が一般には開とは限らないことを $\mathbb Q$ の例で説明できる。

---

## 14. 次に進む

連結性では、空間を「二つに切れるか」を開集合だけで判定しました。次の TOP4 では、点や閉集合をどこまで開集合で分離できるかという **分離公理** と、位相をどれだけ小さな族で記述できるかという **可算性公理** へ進みます。
