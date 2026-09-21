# TOP5A 連続分離と局所化

TOP5 ではコンパクト性そのものを扱いました。この章では、その先で解析に必要になる

~~~
正規性
  ↓
閉集合を開集合の中へ閉包ごと縮める
  ↓
連続関数で二つの閉集合を分離する
  ↓
開近傍をコンパクトな閉包を持つように縮める
  ↓
解析で使う局所化関数を作る
~~~

を独立した一本の流れとして閉じます。

新しく導入する用語と記号は、本文で使う前に定義します。文献によって定義が揺れやすい語についても、この章で採用する規約を導入箇所で明示します。

---

## 1. 用語の規約を先に固定する

この章では TOP4 の規約を引き継ぎます。

- **正規性**には $T_1$ 条件を含めません。互いに素な任意の閉集合を互いに素な開集合で分離できる、という性質だけを「正規性」と呼びます。

したがって本章でも「正規性」と $T_4$ は同じ語として扱いません。新しい用語の規約は、それぞれの定義の直後で固定します。

---

## 2. 各点にコンパクトな近傍を持たせる

「各点のすぐ近くに、コンパクトな器がある」という性質です。

<a id="def-top5a-local-compact"></a>

<!-- formal-statement-start -->
> **定義（局所コンパクト空間）**  
> 位相空間 $X$ が **局所コンパクト**であるとは、任意の $x\in X$ に対して、$x$ のコンパクトな近傍 $N$ が存在することをいう。すなわち、ある開集合 $O$ が存在して

$$
x\in O\subseteq N,
$$

> かつ $N$ がコンパクトであることをいう。
<!-- formal-statement-end -->

本教材では、この定義に Hausdorff 性を含めません。

<a id="def-top5a-lch-space"></a>

<!-- formal-statement-start -->
> **定義（局所コンパクト Hausdorff 空間）**  
> 位相空間 $X$ が局所コンパクトであり、かつ Hausdorff 性を満たすとき、$X$ を **局所コンパクト Hausdorff 空間** と呼ぶ。
<!-- formal-statement-end -->

### 2.1 実直線は局所コンパクト

<!-- definition-example-start: def-top5a-local-compact, def-top5a-lch-space -->
**定義の確認**：通常の位相を入れた $\mathbb R$ では、任意の $x\in\mathbb R$ に対し

$$
N=[x-1,x+1]
$$

を取れます。開区間 $(x-1,x+1)$ が $x$ を含み $N$ に入るので、$N$ は $x$ の近傍です。また [Heine–Borel の定理](../F0_00C1_コンパクト性_点列コンパクト性_Heine_Borel/index.md#thm-f0-00c1-02)により $N$ はコンパクトです。

従って $\mathbb R$ は局所コンパクトです。通常の $\mathbb R$ は Hausdorff でもあるので、局所コンパクト Hausdorff 空間の定義も満たします。
<!-- definition-example-end -->

### 2.2 局所コンパクトでも Hausdorff とは限らない

有限集合 $X$ に任意の位相を入れると、$X$ 自身がコンパクトです。各点 $x\in X$ に対し $X$ はコンパクトな近傍なので、$X$ は局所コンパクトです。

しかし有限位相空間が Hausdorff とは限りません。したがって本章では

$$
\text{局所コンパクト}
\quad\text{と}\quad
\text{局所コンパクト Hausdorff}
$$

を区別します。

---

## 3. Hausdorff 性とコンパクト性から閉集合を分離する

後で連続関数による分離へ進むため、まずコンパクト性と Hausdorff 性から正規性を導きます。

<a id="thm-top5a-compact-hausdorff-normal"></a>

<!-- formal-statement-start -->
> **定理（コンパクト Hausdorff 空間は正規）**  
> $X$ をコンパクト Hausdorff 空間とする。互いに素な閉集合 $A,B\subseteq X$ に対し、開集合 $U,V\subseteq X$ が存在して

$$
A\subseteq U,\qquad B\subseteq V,\qquad U\cap V=\varnothing
$$

> となる。従って $X$ は正規性を満たす。
<!-- formal-statement-end -->

### 証明の見取り図

Hausdorff 性は「一点 $a$ と一点 $b$」を分離します。コンパクト性を二回使うと、その点ごとの分離を

$$
A\quad\text{対}\quad B
$$

という二つの閉集合全体の分離へ有限化できます。

<!-- proof-start -->
### 証明

$A=\varnothing$ または $B=\varnothing$ なら、一方を空集合、他方を $X$ とする開集合で分離できるので自明です。以下、$A,B$ はともに非空とします。

$A,B$ はコンパクト空間 $X$ の閉部分集合なので、[コンパクト空間の閉部分集合はコンパクト](../TOP5/index.md#thm-top5-closed-subset)から両方ともコンパクトです。

まず $a\in A$ を一つ固定します。各 $b\in B$ に対し Hausdorff 性から開集合 $U_{a,b},V_{a,b}$ を

$$
a\in U_{a,b},\qquad
b\in V_{a,b},\qquad
U_{a,b}\cap V_{a,b}=\varnothing
$$

となるように取れます。

$(V_{a,b})_{b\in B}$ は $B$ の開被覆です。$B$ のコンパクト性から有限個 $b_1,\ldots,b_n\in B$ を選んで

$$
B\subseteq V_{a,b_1}\cup\cdots\cup V_{a,b_n}
$$

とできます。そこで

$$
U_a:=\bigcap_{j=1}^n U_{a,b_j},
\qquad
V_a:=\bigcup_{j=1}^n V_{a,b_j}
$$

と置きます。すると $U_a,V_a$ は開で、

$$
a\in U_a,\qquad B\subseteq V_a,\qquad U_a\cap V_a=\varnothing
$$

です。

次に $(U_a)_{a\in A}$ は $A$ の開被覆です。$A$ のコンパクト性から有限個 $a_1,\ldots,a_m\in A$ を選んで

$$
A\subseteq U_{a_1}\cup\cdots\cup U_{a_m}
$$

とできます。ここで

$$
U:=\bigcup_{i=1}^m U_{a_i},
\qquad
V:=\bigcap_{i=1}^m V_{a_i}
$$

と置きます。

各 $V_{a_i}$ は $B$ を含むので $B\subseteq V$ です。また $U,V$ は開です。さらに $x\in U\cap V$ とすると、ある $i$ について $x\in U_{a_i}$ であり、同時に $x\in V\subseteq V_{a_i}$ となって $U_{a_i}\cap V_{a_i}=\varnothing$ に反します。

従って

$$
A\subseteq U,\qquad B\subseteq V,\qquad U\cap V=\varnothing.
$$

よって $X$ は正規です。$\square$
<!-- proof-end -->

ここで Hausdorff 性だけでは一点対一点の分離しか得られません。**二度のコンパクト性が「無限個の局所分離」を有限個へ圧縮する**ことが核心です。

---

## 4. 正規性は「閉包ごと縮める」ことと結びつく

後で局所化関数を作るには、単に

$$
F\subseteq V\subseteq U
$$

では足りず、

$$
F\subseteq V\subseteq \overline V\subseteq U
$$

という一段強い包含が欲しくなります。

<a id="lem-top5a-normal-shrinking"></a>

<!-- formal-statement-start -->
> **補題（正規空間の縮小）**  
> $X$ が正規性を満たし、$F\subseteq X$ が閉、$U\subseteq X$ が開で

$$
F\subseteq U
$$

> とする。このとき開集合 $V\subseteq X$ が存在して

$$
F\subseteq V\subseteq \overline V\subseteq U
$$

> となる。
<!-- formal-statement-end -->

### 証明の見取り図

$F$ と $X\setminus U$ は互いに素な閉集合です。正規性でこの二つを開集合 $V,W$ に分けると、$V$ の閉包は $W$ を避けるため $U$ の中に残ります。

<!-- proof-start -->
### 証明

$F$ と $X\setminus U$ は互いに素な閉集合です。正規性から互いに素な開集合 $V,W$ を

$$
F\subseteq V,\qquad
X\setminus U\subseteq W,\qquad
V\cap W=\varnothing
$$

となるように取れます。

$W$ は開で $V\cap W=\varnothing$ なので、$\overline V\cap W=\varnothing$ です。実際、もし $x\in\overline V\cap W$ なら、開近傍 $W$ が $V$ と交わらないため $x\in\overline V$ に反します。

従って

$$
\overline V\subseteq X\setminus W.
$$

また $X\setminus U\subseteq W$ だから

$$
X\setminus W\subseteq U.
$$

以上より

$$
F\subseteq V\subseteq\overline V\subseteq U.
$$

$\square$
<!-- proof-end -->

---

## 5. 正規性から連続関数による分離へ

正規性が「閉集合を開集合で分離できる」だけでなく、「閉集合を連続関数の値 $0$ と $1$ で分離できる」ことを示します。

ここではコンパクト性を仮定しません。TOP4 の規約どおり、**正規性そのものにも $T_1$ は含めません**。

<a id="thm-top5a-urysohn"></a>

<!-- formal-statement-start -->
> **定理（Urysohn の補題）**  
> $X$ が正規性を満たし、$A,B\subseteq X$ が互いに素な閉集合であるとする。このとき連続関数

$$
f:X\to[0,1]
$$

> が存在して

$$
f(x)=0\quad(x\in A),\qquad
f(x)=1\quad(x\in B)
$$

> となる。
<!-- formal-statement-end -->

### 5.1 実直線では何を作っているのか

たとえば

$$
A=(-\infty,0],\qquad B=[1,\infty)
$$

なら

$$
f(x)=
\begin{cases}
0,&x\le0,\\
x,&0<x<1,\\
1,&x\ge1
\end{cases}
$$

で十分です。

この定理は、「二つの閉集合の間を連続的に $0$ から $1$ へつなぐ」操作を、距離や座標を持たない正規空間でも実行できると主張しています。

### 証明の見取り図

二進有理数

$$
\mathbb D
=
\left\{
\frac{k}{2^n}:
n=0,1,2,\ldots,\ 0\le k\le2^n
\right\}
\subseteq[0,1]
$$

ごとに開集合 $U_r$ を作り、

$$
r<s
\quad\Longrightarrow\quad
\overline{U_r}\subseteq U_s
$$

を保ちます。

その後

$$
f(x)
=
\inf\Bigl(
\{r\in\mathbb D:x\in U_r\}\cup\{1\}
\Bigr)
$$

と置くと、集合の入れ子構造がそのまま $f$ の連続性になります。

<!-- proof-start -->
### 証明

まず $A\subseteq X\setminus B$ で、$A$ は閉、$X\setminus B$ は開です。[正規空間の縮小](#lem-top5a-normal-shrinking)から開集合 $U_0$ を

$$
A\subseteq U_0
\subseteq
\overline{U_0}
\subseteq
X\setminus B
$$

となるように取れます。また

$$
U_1:=X\setminus B
$$

と置きます。従って

$$
\overline{U_0}\subseteq U_1
$$

です。

次に二進有理数に沿って開集合を帰納的に挿入します。各 $n\ge0$ について

$$
\mathbb D_n
=
\left\{
\frac{k}{2^n}:0\le k\le2^n
\right\}
$$

と置きます。$\mathbb D_n\subseteq\mathbb D_{n+1}$ です。

$n=0$ では $\mathbb D_0=\{0,1\}$ で、すでに

$$
\overline{U_0}\subseteq U_1
$$

が成り立っています。

$\mathbb D_n$ の各点に $U_r$ が定義され、隣り合う $r<s$ について

$$
\overline{U_r}\subseteq U_s
$$

が成り立っているとします。$\mathbb D_{n+1}$ で新しく加わる点は

$$
t=\frac{2j+1}{2^{n+1}}
$$

の形です。その左右の点

$$
r=\frac{j}{2^n},
\qquad
s=\frac{j+1}{2^n}
$$

は $\mathbb D_n$ で隣り合い、帰納法の仮定から $\overline{U_r}\subseteq U_s$ です。閉集合 $\overline{U_r}$ と開集合 $U_s$ に縮小補題を適用し、開集合 $U_t$ を

$$
\overline{U_r}
\subseteq
U_t
\subseteq
\overline{U_t}
\subseteq
U_s
$$

となるように取ります。

これを各新規点 $t$ について行えば、$\mathbb D_{n+1}$ の隣り合う二点についても同じ包含が成り立ちます。帰納法により、全ての $r\in\mathbb D$ に $U_r$ が定義されます。

任意の $r<s$ を $\mathbb D$ から取ります。十分大きい $n$ を選べば $r,s\in\mathbb D_n$ です。$r$ から $s$ まで $\mathbb D_n$ の隣接点を順に並べると、隣接点ごとの包含をつなげて

$$
\overline{U_r}\subseteq U_s
$$

を得ます。従って

$$
r<s
\quad\Longrightarrow\quad
\overline{U_r}\subseteq U_s
$$

が全ての $r,s\in\mathbb D$ で成り立ちます。

各 $x\in X$ に対し

$$
f(x)
=
\inf\Bigl(
\{r\in\mathbb D:x\in U_r\}\cup\{1\}
\Bigr)
$$

と定めます。集合に $\{1\}$ を加えているので下限を取る集合は非空で、しかも $[0,1]$ に含まれます。従って実数の完備性により下限が存在し、$0\le f(x)\le1$ です。

まず $x\in A$ なら $x\in U_0$ なので

$$
f(x)=0.
$$

一方 $x\in B$ なら、$r<1$ に対して $U_r\subseteq U_1=X\setminus B$ だから $x\notin U_r$ です。また $x\notin U_1$ でもあるので、定義から

$$
f(x)=1.
$$

残るのは連続性です。

$0<a\le1$ に対し

$$
\{x:f(x)<a\}
=
\bigcup_{\substack{r\in\mathbb D\\ r<a}}U_r.
$$

右辺は開集合の合併なので開です。

次に $0\le a<1$ とします。このとき

$$
\{x:f(x)>a\}
=
\bigcup_{\substack{r\in\mathbb D\\ r>a}}
\left(X\setminus\overline{U_r}\right).
$$

右辺が $\{f>a\}$ に一致することを確認します。

まず $x\notin\overline{U_r}$ となる $r>a$ があるとします。もし $f(x)\le a$ なら $f(x)<r$ なので、下限の定義から $s<r$ かつ $x\in U_s$ となる二進有理数 $s$ を取れます。ところが

$$
U_s\subseteq\overline{U_s}\subseteq U_r\subseteq\overline{U_r}
$$

なので $x\in\overline{U_r}$ となり矛盾です。従って $f(x)>a$ です。

逆に $f(x)>a$ とします。二進有理数は $[0,1]$ で稠密です。実際、$\alpha<\beta$ に対し $2^{-n}<\beta-\alpha$ となる $n$ を取れば、ある整数 $k$ を選んで $\alpha<k/2^n<\beta$ とできます。従って

$$
a<r<f(x)
$$

となる $r\in\mathbb D$ を取れます。もし $x\in\overline{U_r}$ なら、さらに

$$
r<s<f(x)
$$

となる $s\in\mathbb D$ を取り、

$$
\overline{U_r}\subseteq U_s
$$

から $x\in U_s$ となります。すると $f(x)\le s<f(x)$ となり矛盾です。よって

$$
x\notin\overline{U_r}.
$$

従って $\{f<a\}$ と $\{f>a\}$ は任意の $a$ について開です。これは $f:X\to\mathbb R$ が連続であることを意味します。

以上で $f:X\to[0,1]$ は連続で、

$$
f|_A=0,\qquad f|_B=1.
$$

$\square$
<!-- proof-end -->

### 5.2 どの仮定が効いたか

証明で正規性を使ったのは、二進有理数の各段階で

$$
\overline{U_r}\subseteq U_t\subseteq\overline{U_t}\subseteq U_s
$$

という「閉包をはさんだ入れ子」を作る箇所です。

距離は使っていません。コンパクト性も使っていません。したがって Urysohn の補題は、コンパクト Hausdorff 空間だけの定理ではなく、**正規空間一般の連続分離定理**です。

---

## 6. 開近傍をコンパクトな閉包を持つように縮める

解析では、点 $x$ の近傍を開集合 $U$ の中に取りながら、その閉包をコンパクトにしたい場面が頻繁にあります。

<a id="thm-top5a-lch-shrinking"></a>

<!-- formal-statement-start -->
> **定理（局所コンパクト Hausdorff 空間の縮小）**  
> $X$ を局所コンパクト Hausdorff 空間とする。任意の $x\in X$ と開集合 $U\subseteq X$ で $x\in U$ を満たすものに対し、開集合 $V\subseteq X$ が存在して

$$
x\in V\subseteq\overline V\subseteq U
$$

> かつ $\overline V$ はコンパクトとなる。
<!-- formal-statement-end -->

### 証明の見取り図

局所コンパクト性で $x$ のコンパクト近傍 $N$ を取ります。Hausdorff 性により $N$ は閉で、部分空間 $N$ はコンパクト Hausdorff、従って正規です。

あとは $N$ の中で一点 $\{x\}$ を $U$ の内側へ閉包ごと縮めます。

<!-- proof-start -->
### 証明

局所コンパクト性から、$x$ のコンパクトな近傍 $N$ を取れます。近傍の定義から、ある $X$ の開集合 $O$ が存在して

$$
x\in O\subseteq N
$$

となります。

$X$ は Hausdorff なので、[Hausdorff 空間のコンパクト部分集合は閉](../TOP5/index.md#thm-top5-compact-hausdorff-closed)からコンパクト部分集合 $N$ は $X$ で閉です。また部分空間 $N$ はコンパクト Hausdorff です。従って[コンパクト Hausdorff 空間は正規](#thm-top5a-compact-hausdorff-normal)から $N$ は正規です。

$$
W:=O\cap U
$$

と置きます。$W$ は $X$ で開、$x\in W$、かつ $W\subseteq N$ です。したがって $W$ は部分空間 $N$ でも開です。

一点集合 $\{x\}$ は Hausdorff 性から $N$ で閉です。正規空間 $N$ の縮小補題を

$$
\{x\}\subseteq W
$$

に適用して、$N$ の相対位相で開な集合 $V_N$ を

$$
x\in V_N
\subseteq
\overline{V_N}^{\,N}
\subseteq
W
$$

となるように取ります。

$V_N$ は $N$ で相対開なので、ある $X$ の開集合 $G$ が存在して

$$
V_N=N\cap G.
$$

しかも $V_N\subseteq W\subseteq N$ だから

$$
V_N=G\cap W.
$$

右辺は $X$ の開集合の共通部分なので、$V_N$ 自身が $X$ で開です。$V:=V_N$ と置きます。

$N$ は $X$ で閉で $V\subseteq N$ なので

$$
\overline V^{\,X}\subseteq N.
$$

従って

$$
\overline V^{\,X}
=
\overline V^{\,N}
\subseteq W\subseteq U.
$$

さらに $\overline V^{\,X}$ はコンパクト空間 $N$ の閉部分集合なのでコンパクトです。

よって

$$
x\in V\subseteq\overline V\subseteq U,
\qquad
\overline V\text{ はコンパクト}.
$$

$\square$
<!-- proof-end -->

Hausdorff 性は二箇所で使いました。

1. コンパクト近傍 $N$ を $X$ の閉集合にする。
2. $N$ をコンパクト Hausdorff 空間として正規性へつなぐ。

「局所コンパクト」だけでは、この証明をそのまま通せません。

---

## 7. 関数の非零部分を閉集合として記録する

ここから局所化に使う関数を作る準備をします。その前に、記号を曖昧にしません。

<a id="def-top5a-support"></a>

<!-- formal-statement-start -->
> **定義（関数の台）**  
> 位相空間 $X$ 上の実数値関数 $f:X\to\mathbb R$ に対し、$f$ の **台（support）** を

$$
\operatorname{supp}f
:=
\overline{\{x\in X:f(x)\ne0\}}
$$

> と定義する。閉包は $X$ の位相で取る。
<!-- formal-statement-end -->

「$f(x)\ne0$ となる点の集合」そのものではなく、**その閉包**であることが重要です。

<a id="def-top5a-compact-support-cc"></a>

<!-- formal-statement-start -->
> **定義（コンパクト台と $C_c(X)$）**  
> 連続関数 $f:X\to\mathbb R$ の台 $\operatorname{supp}f$ がコンパクトであるとき、$f$ は **コンパクト台を持つ**という。実数値連続関数について

$$
C_c(X)
:=
\left\{
f:X\to\mathbb R:
f\text{ は連続で }
\operatorname{supp}f\text{ はコンパクト}
\right\}
$$

> と書く。
<!-- formal-statement-end -->

### 7.1 三角形関数の台

<!-- definition-example-start: def-top5a-support, def-top5a-compact-support-cc -->
**定義の確認**：次の関数について、台とコンパクト台の条件を直接確認します。

$$
f(x)=\max(1-|x|,0)
\qquad(x\in\mathbb R)
$$

とします。$f(x)\ne0$ となるのは $(-1,1)$ なので

$$
\operatorname{supp}f
=
\overline{(-1,1)}
=
[-1,1].
$$

従って $f\in C_c(\mathbb R)$ です。
<!-- definition-example-end -->

### 7.2 急速に減衰してもコンパクト台とは限らない

$$
g(x)=e^{-x^2}
$$

は $x\to\pm\infty$ で急速に $0$ へ近づきますが、どの $x\in\mathbb R$ でも $g(x)>0$ です。従って

$$
\{x:g(x)\ne0\}=\mathbb R,
\qquad
\operatorname{supp}g=\mathbb R.
$$

$\mathbb R$ はコンパクトでないので

$$
g\notin C_c(\mathbb R).
$$

「無限遠で小さくなる」と「コンパクト台を持つ」は別の性質です。

---

## 8. コンパクト集合を開集合の内部に局所化する

欲しいのは、コンパクト集合 $K$ の周りでは $1$ で、指定した開集合 $U$ の外へ台がはみ出さない連続関数です。

<a id="def-top5a-compact-open-cutoff"></a>

<!-- formal-statement-start -->
> **定義（コンパクト集合–開集合局所化関数）**  
> 位相空間 $X$、集合 $K\subseteq U\subseteq X$ に対し、$U$ が開であるとする。$f\in C_c(X)$ が **$K$ と $U$ に対する cutoff 関数**であるとは、

$$
0\le f\le1,
$$

> かつ、ある開集合 $N\subseteq X$ が存在して

$$
K\subseteq N,\qquad f|_N=1,
$$

> さらに

$$
\operatorname{supp}f\subseteq U
$$

> が成り立つことをいう。
<!-- formal-statement-end -->

英語ではこの条件を compact-open cutoff と表すことがあります。本章では以後「$K$ と $U$ に対する cutoff 関数」と書きます。

<!-- definition-example-start: def-top5a-compact-open-cutoff -->
**定義の確認**：$X=\mathbb R$、$K=[-1,1]$、$U=(-2,2)$ とします。

$$
f(x)
=
\max\!\left(0,\min\!\left(1,6-4|x|\right)\right)
$$

と置くと、$0\le f\le1$ で、開集合 $N=(-5/4,5/4)$ 上では $f=1$ です。また

$$
\{x:f(x)\ne0\}=(-3/2,3/2),
$$

したがって

$$
\operatorname{supp}f=[-3/2,3/2]\subset(-2,2)=U.
$$

よって $f\in C_c(\mathbb R)$ であり、$K$ と $U$ に対する cutoff 関数の条件をすべて直接確認できます。
<!-- definition-example-end -->

<a id="thm-top5a-lch-cutoff"></a>

<!-- formal-statement-start -->
> **定理（局所コンパクト Hausdorff 空間での局所化関数の存在）**  
> $X$ を局所コンパクト Hausdorff 空間とし、$K\subseteq X$ をコンパクト、$U\subseteq X$ を開で

$$
K\subseteq U
$$

> とする。このとき $K$ と $U$ に対する cutoff 関数が存在する。
<!-- formal-statement-end -->

### 証明の見取り図

一点 $x\in K$ ごとに

$$
x\in W_x\subseteq\overline{W_x}
\subseteq
V_x\subseteq\overline{V_x}
\subseteq U
$$

となる二重の縮小を作ります。

コンパクト Hausdorff 空間 $\overline{V_x}$ 上で [Urysohn の補題](#thm-top5a-urysohn)を使い、

- $\overline{W_x}$ では $1$
- $\overline{V_x}\setminus V_x$ では $0$

となる関数を作ります。境界で $0$ なので、外側を $0$ として $X$ 全体へ延長できます。

最後に $K$ のコンパクト性で有限個だけ残し、その最大値を取ります。

<!-- proof-start -->
### 証明

各 $x\in K$ を固定します。[局所コンパクト Hausdorff 空間の縮小](#thm-top5a-lch-shrinking)を $x\in U$ に適用し、開集合 $V_x$ を

$$
x\in V_x
\subseteq
\overline{V_x}
\subseteq U,
\qquad
\overline{V_x}\text{ はコンパクト}
$$

となるように取ります。

もう一度[同じ縮小定理](#thm-top5a-lch-shrinking)を $x\in V_x$ に適用して、開集合 $W_x$ を

$$
x\in W_x
\subseteq
\overline{W_x}
\subseteq
V_x
$$

となるように取れます。

$$
C_x:=\overline{V_x}
$$

と置きます。$C_x$ は $X$ の部分空間としてコンパクト Hausdorff です。従って正規です。

$C_x$ の中で

$$
A_x:=\overline{W_x},
\qquad
B_x:=C_x\setminus V_x
$$

を考えます。どちらも $C_x$ で閉で、$\overline{W_x}\subseteq V_x$ だから互いに素です。

[Urysohn の補題](#thm-top5a-urysohn)から連続関数

$$
g_x:C_x\to[0,1]
$$

で

$$
g_x=1\text{ on }A_x,
\qquad
g_x=0\text{ on }B_x
$$

となるものが存在します。

これを $X$ 全体へ

$$
f_x(y)
=
\begin{cases}
g_x(y),&y\in C_x,\\
0,&y\notin C_x
\end{cases}
$$

と延長します。

この延長が連続であることを確認します。$C_x$ と $X\setminus V_x$ はどちらも $X$ の閉集合で、

$$
C_x\cup(X\setminus V_x)=X
$$

です。両者の共通部分は $C_x\setminus V_x=B_x$ であり、そこで $g_x=0$ なので二つの定義は一致します。

したがって閉集合上の貼り合わせにより $f_x$ は連続です。ここで貼り合わせを直接確認するなら、任意の閉集合 $F\subseteq[0,1]$ に対し

$$
E_F
:=
\begin{cases}
X\setminus V_x,&0\in F,\\
\varnothing,&0\notin F
\end{cases}
$$

と置けば

$$
f_x^{-1}(F)=g_x^{-1}(F)\cup E_F.
$$

$g_x^{-1}(F)$ は閉部分空間 $C_x$ の中で閉なので $X$ でも閉です。また $E_F$ も $X$ で閉です。従って $f_x^{-1}(F)$ は閉で、$f_x$ は連続です。

さらに

$$
0\le f_x\le1,
\qquad
f_x=1\text{ on }W_x.
$$

また $f_x\ne0$ となり得る点は $V_x$ の中にあるので

$$
\operatorname{supp}f_x
=
\overline{\{f_x\ne0\}}
\subseteq
\overline{V_x}
=
C_x
\subseteq U.
$$

$(W_x)_{x\in K}$ は $K$ の開被覆です。$K$ はコンパクトなので、有限個

$$
x_1,\ldots,x_n\in K
$$

を選んで

$$
K\subseteq W_{x_1}\cup\cdots\cup W_{x_n}
$$

とできます。

最後に

$$
f(y):=\max_{1\le i\le n}f_{x_i}(y)
$$

と定めます。有限個の連続関数の最大値は連続です。たとえば二つなら

$$
\max(a,b)=\frac{a+b+|a-b|}{2}
$$

であり、有限個の場合はこれを繰り返せばよいです。

明らかに $0\le f\le1$ です。また

$$
N:=W_{x_1}\cup\cdots\cup W_{x_n}
$$

は $K$ の開近傍で、各 $y\in N$ では少なくとも一つの $f_{x_i}(y)=1$ なので

$$
f=1\text{ on }N.
$$

さらに

$$
\{f\ne0\}
\subseteq
\bigcup_{i=1}^n\{f_{x_i}\ne0\}.
$$

有限合併なので閉包を取って

$$
\operatorname{supp}f
\subseteq
\bigcup_{i=1}^n\operatorname{supp}f_{x_i}
\subseteq
\bigcup_{i=1}^n C_{x_i}
\subseteq U.
$$

右辺の有限合併はコンパクトです。従って $\operatorname{supp}f$ もその閉部分集合としてコンパクトで、

$$
f\in C_c(X).
$$

以上で

$$
0\le f\le1,\qquad
\text{$K$ のある開近傍上で }f=1,\qquad
\operatorname{supp}f\subseteq U
$$

を満たす $f$ が得られました。$\square$
<!-- proof-end -->

### 8.1 何を使い、何を使っていないか

この定理の依存は

~~~
TOP4：正規性
  +
TOP5：コンパクト性・Hausdorff 空間のコンパクト集合の閉性
  ↓
コンパクト Hausdorff ⇒ 正規
  ↓
正規空間の縮小
  ↓
Urysohn の補題
  ↓
局所コンパクト Hausdorff 空間の縮小
  ↓
compact-open cutoff
~~~

です。

一般の partition of unity、one-point compactification、Tietze の拡張定理は使っていません。

---

## 9. 演習

### Level A

<a id="ex-top5a-a01"></a>
#### TOP5A-A01 局所コンパクト性の直接確認
- Level: A

通常の位相を入れた $\mathbb R^n$ が局所コンパクトであることを、各 $x\in\mathbb R^n$ のコンパクト近傍を具体的に一つ与えて示せ。

<!-- solution-start -->
**解答・解説**：

任意の $x\in\mathbb R^n$ に対し閉球

$$
N=\{y\in\mathbb R^n:\|y-x\|\le1\}
$$

を取ります。開球

$$
B(x,1)=\{y:\|y-x\|<1\}
$$

について

$$
x\in B(x,1)\subseteq N
$$

なので $N$ は $x$ の近傍です。[Heine–Borel の定理](../F0_00C1_コンパクト性_点列コンパクト性_Heine_Borel/index.md#thm-f0-00c1-02)により閉球はコンパクトなので $N$ はコンパクトです。従って $\mathbb R^n$ は局所コンパクトです。

「局所コンパクト」の定義では、点そのものを含むコンパクト集合を出すだけでなく、その集合が本当に近傍、すなわち点を含む開集合を内側に持つことまで確認します。
<!-- solution-end -->

<a id="ex-top5a-a02"></a>
#### TOP5A-A02 台を計算する
- Level: A

$$
f(x)=\max(1-|x|,0)
$$

について $\operatorname{supp}f$ を定義から求め、$f\in C_c(\mathbb R)$ を確認せよ。

<!-- solution-start -->
**解答・解説**：

$f(x)\ne0$ となる条件は

$$
1-|x|>0
\iff
|x|<1
$$

なので

$$
\{x:f(x)\ne0\}=(-1,1).
$$

台はこの集合そのものではなく閉包なので

$$
\operatorname{supp}f
=
\overline{(-1,1)}
=
[-1,1].
$$

$f$ は連続で、$[-1,1]$ はコンパクトです。従って

$$
f\in C_c(\mathbb R).
$$
<!-- solution-end -->

<a id="ex-top5a-a03"></a>
#### TOP5A-A03 減衰とコンパクト台は別
- Level: A

$$
g(x)=e^{-|x|}
$$

が $x\to\pm\infty$ で $0$ に収束するにもかかわらず、$g\notin C_c(\mathbb R)$ であることを示せ。

<!-- solution-start -->
**解答・解説**：

任意の $x\in\mathbb R$ に対し

$$
e^{-|x|}>0
$$

なので

$$
\{x:g(x)\ne0\}=\mathbb R.
$$

従って

$$
\operatorname{supp}g
=
\overline{\mathbb R}
=
\mathbb R.
$$

通常の $\mathbb R$ はコンパクトでないため、$g$ はコンパクト台を持ちません。よって

$$
g\notin C_c(\mathbb R).
$$

無限遠で値が小さくなることと、あるコンパクト集合の外で完全に $0$ になることは異なります。
<!-- solution-end -->

<a id="ex-top5a-a04"></a>
#### TOP5A-A04 実直線上の Urysohn 関数
- Level: A

$$
A=(-\infty,0],\qquad B=[2,\infty)
$$

に対して、$f|_A=0$、$f|_B=1$ を満たす連続関数 $f:\mathbb R\to[0,1]$ を一つ具体的に作れ。

<!-- solution-start -->
**解答・解説**：

例えば

$$
f(x)=
\begin{cases}
0,&x\le0,\\
x/2,&0<x<2,\\
1,&x\ge2
\end{cases}
$$

とします。各区間では連続で、接続点 $0,2$ でも左右の値が一致するので $\mathbb R$ 全体で連続です。

また $0\le f\le1$ で、

$$
x\in A\Rightarrow f(x)=0,
\qquad
x\in B\Rightarrow f(x)=1.
$$

一般の正規空間では座標 $x$ を使えないため、Urysohn の補題では二進有理数で開集合を段階的に挿入して同じ役割の関数を作ります。
<!-- solution-end -->

### Level B

<a id="ex-top5a-b01"></a>
#### TOP5A-B01 コンパクト Hausdorff から正規性へ
- Level: B

コンパクト Hausdorff 空間 $X$ の互いに素な閉集合 $A,B$ を取る。Hausdorff 性による点ごとの分離を、なぜ $B$ のコンパクト性、次に $A$ のコンパクト性の順に二回有限化する必要があるか、集合式を含めて説明せよ。

<!-- solution-start -->
**解答・解説**：

固定した $a\in A$ と各 $b\in B$ を Hausdorff 性で分離して

$$
a\in U_{a,b},\qquad
b\in V_{a,b},\qquad
U_{a,b}\cap V_{a,b}=\varnothing
$$

を得ます。

ここで $b$ ごとに別々の $U_{a,b}$ が出るため、そのままでは $a$ と $B$ 全体を一組の開集合で分離できません。$B$ のコンパクト性で有限個 $b_1,\ldots,b_n$ に減らし、

$$
U_a=\bigcap_{j=1}^nU_{a,b_j},
\qquad
V_a=\bigcup_{j=1}^nV_{a,b_j}
$$

と置けば

$$
a\in U_a,\qquad B\subseteq V_a,\qquad U_a\cap V_a=\varnothing
$$

となります。有限共通部分なので $U_a$ は開です。

次に $a$ ごとに別々の $U_a,V_a$ があるので、$A$ のコンパクト性で有限個 $a_1,\ldots,a_m$ に減らし、

$$
U=\bigcup_{i=1}^mU_{a_i},
\qquad
V=\bigcap_{i=1}^mV_{a_i}
$$

と置きます。すると

$$
A\subseteq U,\qquad B\subseteq V,\qquad U\cap V=\varnothing.
$$

二回の有限化は、それぞれ「固定した一点 $a$ 対 $B$ 全体」「$A$ 全体対 $B$ 全体」へ分離を昇格させる役割を持ちます。
<!-- solution-end -->

<a id="ex-top5a-b02"></a>
#### TOP5A-B02 Urysohn 関数から縮小を作る
- Level: B

$X$ を正規空間、$F\subseteq U$ を閉集合 $F$ と開集合 $U$ の包含とする。[Urysohn の補題](#thm-top5a-urysohn)を使って

$$
F\subseteq V\subseteq\overline V\subseteq U
$$

を満たす開集合 $V$ を構成せよ。

<!-- solution-start -->
**解答・解説**：

$F$ と $X\setminus U$ は互いに素な閉集合です。[Urysohn の補題](#thm-top5a-urysohn)から連続関数

$$
f:X\to[0,1]
$$

で

$$
f=0\text{ on }F,
\qquad
f=1\text{ on }X\setminus U
$$

となるものを取れます。

$$
V:=\{x:f(x)<1/3\}
$$

と置くと、連続性から $V$ は開で、$F\subseteq V$ です。

さらに

$$
\overline V
\subseteq
\{x:f(x)\le1/3\}.
$$

実際、$\{f\le1/3\}$ は閉で $V$ を含むので、$V$ の閉包もその中に入ります。

一方 $x\in X\setminus U$ なら $f(x)=1$ なので

$$
x\notin\{f\le1/3\}.
$$

従って

$$
\{f\le1/3\}\subseteq U.
$$

以上より

$$
F\subseteq V
\subseteq
\overline V
\subseteq
U.
$$

本文では縮小補題を先に証明して Urysohn の補題を構成しましたが、Urysohn の補題を得た後は逆にこのように縮小を一行で再構成できます。
<!-- solution-end -->

<a id="ex-top5a-b03"></a>
#### TOP5A-B03 局所コンパクト Hausdorff の仮定の役割
- Level: B

本文の「局所コンパクト Hausdorff 空間の縮小」の証明で、局所コンパクト性と Hausdorff 性をそれぞれどこに使ったか説明せよ。

<!-- solution-start -->
**解答・解説**：

局所コンパクト性は、点 $x$ のコンパクト近傍 $N$ を得るために使います。これにより、局所的な議論をコンパクトな部分空間 $N$ の中へ移せます。

Hausdorff 性は少なくとも二箇所に使います。

第一に、コンパクト部分集合 $N$ が $X$ で閉であることを保証します。これにより $V\subseteq N$ の $X$ における閉包も $N$ の中に残ります。

第二に、部分空間 $N$ がコンパクト Hausdorff となるので、本文の定理

$$
\text{コンパクト Hausdorff}\Rightarrow\text{正規}
$$

を使えます。

従って「局所コンパクト」だけを仮定した証明ではなく、局所コンパクト性と Hausdorff 性が別々の役割を持っています。
<!-- solution-end -->

### Level C

<a id="ex-top5a-c01"></a>
#### TOP5A-C01 コンパクト集合–開集合 cutoff を再構成する
- Level: C

$X$ を局所コンパクト Hausdorff 空間、$K\subseteq U$ をコンパクト集合 $K$ と開集合 $U$ の包含とする。

本文の [Urysohn の補題](#thm-top5a-urysohn)と[局所コンパクト Hausdorff 空間の縮小](#thm-top5a-lch-shrinking)だけを使って、

$$
0\le f\le1,\qquad
\text{$K$ のある開近傍上で }f=1,\qquad
\operatorname{supp}f\subseteq U
$$

を満たす $f\in C_c(X)$ を構成せよ。特に、最後に $\operatorname{supp}f$ が本当に $U$ の中へ入る理由まで示せ。

<!-- solution-start -->
**解答・解説**：

各 $x\in K$ に対し、縮小定理を二回使って

$$
x\in W_x
\subseteq
\overline{W_x}
\subseteq
V_x
\subseteq
\overline{V_x}
\subseteq U
$$

となる開集合 $W_x,V_x$ を取ります。ただし $\overline{V_x}$ はコンパクトです。

$$
C_x:=\overline{V_x}
$$

はコンパクト Hausdorff なので正規です。$C_x$ の閉集合

$$
\overline{W_x},
\qquad
C_x\setminus V_x
$$

は互いに素です。[Urysohn の補題](#thm-top5a-urysohn)から

$$
g_x:C_x\to[0,1]
$$

で

$$
g_x=1\text{ on }\overline{W_x},
\qquad
g_x=0\text{ on }C_x\setminus V_x
$$

となるものを取れます。

$C_x$ の外で $0$ として延長した関数を $f_x:X\to[0,1]$ とします。$C_x$ と $X\setminus V_x$ は閉集合で $X$ を覆い、共通部分 $C_x\setminus V_x$ では $g_x=0$ なので、閉集合上の貼り合わせによりこの延長は連続です。また

$$
f_x=1\text{ on }W_x,
\qquad
\operatorname{supp}f_x
\subseteq
C_x
\subseteq U.
$$

$(W_x)_{x\in K}$ は $K$ の開被覆なので、コンパクト性から有限個

$$
x_1,\ldots,x_n
$$

を選んで

$$
K\subseteq W_{x_1}\cup\cdots\cup W_{x_n}
$$

とできます。

$$
f:=\max(f_{x_1},\ldots,f_{x_n})
$$

と置きます。有限最大は連続なので $f$ は連続で、$0\le f\le1$ です。また

$$
N:=W_{x_1}\cup\cdots\cup W_{x_n}
$$

は $K$ の開近傍であり、$N$ 上では少なくとも一つの $f_{x_i}$ が $1$ だから

$$
f=1\text{ on }N.
$$

さらに

$$
\{f\ne0\}
\subseteq
\bigcup_{i=1}^n\{f_{x_i}\ne0\}.
$$

右辺は有限合併なので閉包を取ると

$$
\operatorname{supp}f
\subseteq
\bigcup_{i=1}^n\operatorname{supp}f_{x_i}
\subseteq
\bigcup_{i=1}^n C_{x_i}
\subseteq U.
$$

$\bigcup_i C_{x_i}$ は有限個のコンパクト集合の合併なのでコンパクトです。したがって、その閉部分集合 $\operatorname{supp}f$ もコンパクトです。

よって

$$
f\in C_c(X)
$$

であり、要求された三条件を全て満たします。
<!-- solution-end -->

---

## 10. 章末チェック

この章を終えた時点で、次を自力で説明できることを確認してください。

1. 本教材の「正規性」が $T_1$ を含まない規約であること。
2. 本教材の「局所コンパクト性」が Hausdorff 性を含まない規約であること。
3. コンパクト Hausdorff $\Rightarrow$ 正規の証明で、コンパクト性を二回使う理由。
4. 正規空間の縮小 $F\subseteq V\subseteq\overline V\subseteq U$ をどの補集合から作るか。
5. Urysohn の補題で二進有理数と $\overline{U_r}\subseteq U_s$ が連続性をどう生むか。
6. $\operatorname{supp}f$ が $\{f\ne0\}$ そのものではなく、その閉包であること。
7. 「$K$ のある開近傍上で $f=1$」という条件の意味。
8. 局所コンパクト Hausdorff 空間で cutoff 関数を作るとき、局所コンパクト性・Hausdorff 性・Urysohn の補題・$K$ のコンパクト性がそれぞれ何を担当するか。

この八点を再構成できれば、MT5 で cutoff を「魔法の関数」として使わず、自分で依存をたどれる状態です。
