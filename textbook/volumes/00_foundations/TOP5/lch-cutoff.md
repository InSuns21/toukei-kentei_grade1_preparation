# TOP5 補遺：局所コンパクト Hausdorff 空間の縮小と cutoff

この補遺は MT5「Radon 測度・Riesz–Markov」で必要になる位相的道具だけを閉じます。一般の Urysohn 補題を「既知」として召喚せず、

```text
compact Hausdorff ⇒ normal
        ↓
閉集合を開集合の中へ closure ごと縮める
        ↓
compact Hausdorff 上の連続分離（Urysohn の特殊形）
        ↓
LCH 空間の precompact shrinking
        ↓
K ⊂ U に対する C_c cutoff
```

を本文から再構成できる形で証明します。

ここで既存 TOP4 の規約に合わせ、**正規性**という語そのものには $T_1$ を含めません。

---

## 1. 局所コンパクト性

<a id="def-top5-local-compact"></a>
<!-- formal-statement-start -->
### 定義（局所コンパクト）

位相空間 $X$ が **局所コンパクト**であるとは、任意の $x\in X$ に対し、$x$ の近傍 $N$ で compact なものが存在することをいう。

すなわち

$$
\forall x\in X\ \exists N\subseteq X:
\quad x\in\operatorname{int}N,
\qquad N\text{ compact}.
$$
<!-- formal-statement-end -->

本補遺では常に局所コンパクト性と Hausdorff 性を組にして使います。Hausdorff 性があるため、compact 部分集合は TOP5 本文の定理により閉集合になります。

---

## 2. compact Hausdorff 空間は正規

<a id="thm-top5-compact-hausdorff-normal"></a>
<!-- formal-statement-start -->
### 定理（compact Hausdorff $\Rightarrow$ normal）

$X$ を compact Hausdorff 空間とする。互いに素な閉集合 $A,B\subseteq X$ に対し、互いに素な開集合 $U,V$ が存在して

$$
A\subseteq U,
\qquad
B\subseteq V.
$$
<!-- formal-statement-end -->

<!-- proof-start -->
### 証明

$A,B$ は compact 空間 $X$ の閉部分集合なので compact です。

まず $a\in A$ を固定します。各 $b\in B$ に対し Hausdorff 性から、互いに素な開集合

$$
a\in U_{a,b},
\qquad
b\in V_{a,b}
$$

を取れます。$(V_{a,b})_{b\in B}$ は $B$ の開被覆なので、compact 性から有限個 $b_1,\ldots,b_n$ を選び

$$
B\subseteq\bigcup_{i=1}^nV_{a,b_i}
$$

とできます。そこで

$$
U_a:=\bigcap_{i=1}^nU_{a,b_i},
\qquad
V_a:=\bigcup_{i=1}^nV_{a,b_i}
$$

と置きます。すると $a\in U_a$, $B\subseteq V_a$, $U_a\cap V_a=\varnothing$ です。

次に $(U_a)_{a\in A}$ は $A$ の開被覆なので、有限個 $a_1,\ldots,a_m$ を選んで

$$
A\subseteq\bigcup_{j=1}^mU_{a_j}
$$

とできます。最後に

$$
U:=\bigcup_{j=1}^mU_{a_j},
\qquad
V:=\bigcap_{j=1}^mV_{a_j}
$$

と置けば $U,V$ は開、$A\subseteq U$, $B\subseteq V$ です。さらに $V\subseteq V_{a_j}$ が全ての $j$ で成り立つため $U\cap V=\varnothing$ です。$\square$
<!-- proof-end -->

有限化は二段階です。まず **一点 $a$ 対 compact 集合 $B$**、次に **compact 集合 $A$ 全体**を有限化しています。「Hausdorff だから閉集合どうしを分離できる」と一足飛びにはしていません。

---

## 3. closure ごと開集合の中へ縮める

<a id="lem-top5-normal-shrinking"></a>
<!-- formal-statement-start -->
### 補題（normal shrinking）

$X$ が正規性を満たし、$F\subseteq U$ が

$$
F\text{ closed},
\qquad
U\text{ open}
$$

を満たすとする。このとき開集合 $V$ が存在して

$$
\boxed{F\subseteq V\subseteq\overline V\subseteq U.}
$$
<!-- formal-statement-end -->

<!-- proof-start -->
### 証明

$F$ と $X\setminus U$ は互いに素な閉集合です。正規性から互いに素な開集合 $V,W$ を

$$
F\subseteq V,
\qquad
X\setminus U\subseteq W
$$

と取れます。

$V\cap W=\varnothing$ なので $V\subseteq X\setminus W$。右辺は閉だから

$$
\overline V\subseteq X\setminus W.
$$

また $X\setminus U\subseteq W$ から

$$
X\setminus W\subseteq U.
$$

従って

$$
F\subseteq V\subseteq\overline V\subseteq U.
$$

$\square$
<!-- proof-end -->

---

## 4. compact Hausdorff 上の連続分離

MT5 が必要とするのは「正規空間なら Urysohn」と定理名だけを置くことではなく、連続関数がどこから出るかです。ここでは compact Hausdorff 空間に限定して dyadic construction を実行します。

<a id="lem-top5-compact-urysohn"></a>
<!-- formal-statement-start -->
### 補題（compact Hausdorff 上の Urysohn 型連続分離）

$X$ を compact Hausdorff 空間、$A,B\subseteq X$ を互いに素な閉集合とする。このとき連続関数

$$
f:X\to[0,1]
$$

が存在して

$$
\boxed{f|_A=0,
\qquad
f|_B=1.}
$$
<!-- formal-statement-end -->

<!-- proof-start -->
### 証明

直前の定理から $X$ は正規です。二進有理数

$$
D:=\left\{\frac{k}{2^n}:n\ge0,\ 0\le k\le2^n\right\}\subset[0,1]
$$

を使います。

まず

$$
U_1:=X\setminus B
$$

と置きます。$A\subseteq U_1$ で $A$ は閉、$U_1$ は開なので normal shrinking により開集合 $U_0$ を

$$
A\subseteq U_0,
\qquad
\overline{U_0}\subseteq U_1
$$

となるように取れます。

二進分割を段階的に細かくします。ある段階で隣接する二進有理数 $r<s$ に対して

$$
\overline{U_r}\subseteq U_s
$$

が作られているとき、中点 $t=(r+s)/2$ に normal shrinking を適用し

$$
\overline{U_r}
\subseteq U_t
\subseteq\overline{U_t}
\subseteq U_s
$$

となる開集合 $U_t$ を取ります。各段階の隣接対についてこれを繰り返します。すると帰納的に、任意の $r,s\in D$ について

$$
r<s
\quad\Longrightarrow\quad
\boxed{\overline{U_r}\subseteq U_s}
\qquad\text{(1)}
$$

が成り立ちます。実際、$r<s$ を含む十分細かい同一二進格子を取れば、隣接点間の包含を有限回つないで得られます。

ここで

$$
f(x):=
\inf\bigl(\{r\in D:x\in U_r\}\cup\{1\}\bigr)
$$

と定めます。

$A\subseteq U_0$ なので $x\in A$ なら $f(x)=0$ です。一方 $B\cap U_1=\varnothing$ であり、$r<1$ なら (1) から $U_r\subseteq U_1$ なので、$x\in B$ はどの $U_r\ (r<1)$ にも属しません。従って $f(x)=1$ です。

残るのは連続性です。$0<a\le1$ に対し

$$
\{x:f(x)<a\}
=
\bigcup_{\substack{r\in D\\r<a}}U_r
\qquad\text{(2)}
$$

右辺は開です。$a\le0$ なら左辺は空集合、$a>1$ なら左辺は $X$ なので、任意の $a\in\mathbb R$ について $\{f<a\}$ は開です。

次に $0\le a<1$ に対し

$$
\{x:f(x)>a\}
=
\bigcup_{\substack{r\in D\\r>a}}
\bigl(X\setminus\overline{U_r}\bigr)
\qquad\text{(3)}
$$

右から左を示します。$x\notin\overline{U_r}$ で $r>a$ とします。もし $s<r$ なら (1) により

$$
U_s\subseteq\overline{U_s}\subseteq U_r,
$$

だから $x\notin U_s$ です。従って $f(x)\ge r>a$ です。

左から右を示します。$f(x)>a$ なら二進有理数の稠密性から

$$
a<r<s<f(x)
$$

となる $r,s\in D$ を取れます。もし $x\in\overline{U_r}$ なら (1) から $x\in U_s$ となり $f(x)\le s$、矛盾です。従って $x\notin\overline{U_r}$ です。

$a<0$ なら $\{f>a\}=X$、$a\ge1$ なら $\{f>a\}=\varnothing$ です。よって任意の $a\in\mathbb R$ について $\{f>a\}$ も開です。

したがって全ての開区間の逆像が開となり、$f:X\to\mathbb R$ は連続です。値域は定義から $[0,1]$ に入ります。$\square$
<!-- proof-end -->

この証明で使ったのは compact Hausdorff $\Rightarrow$ normal と normal shrinking だけです。一般の Urysohn 補題を外部依存にしていません。

---

## 5. LCH 空間では closure を compact のまま縮められる

<a id="thm-top5-lch-shrinking"></a>
<!-- formal-statement-start -->
### 定理（LCH の precompact shrinking）

$X$ を局所コンパクト Hausdorff 空間とする。任意の $x\in X$ と開集合 $U\ni x$ に対し、開集合 $V$ が存在して

$$
\boxed{
x\in V,
\qquad
\overline V\text{ compact},
\qquad
\overline V\subseteq U.}
$$
<!-- formal-statement-end -->

<!-- proof-start -->
### 証明

局所コンパクト性から $x$ の compact 近傍 $N$ を取れます。従ってある開集合 $O$ が存在して

$$
x\in O\subseteq N.
$$

$X$ は Hausdorff なので compact 集合 $N$ は閉です。また部分空間 $N$ は compact Hausdorff です。

$$
W:=O\cap U
$$

と置くと、$W$ は $X$ の開集合で $x\in W\subseteq N$、従って $N$ の相対位相でも開です。一点集合 $\{x\}$ は Hausdorff 性から閉です。compact Hausdorff 空間 $N$ は正規なので、normal shrinking を $N$ の中で使って相対開集合 $V_N$ を

$$
x\in V_N,
\qquad
\overline{V_N}^{\,N}\subseteq W
$$

となるように取れます。

$V_N\subseteq W\subseteq O\subseteq\operatorname{int}_X N$ です。$V_N=N\cap G$ と書ける $X$ の開集合 $G$ を取れば、$V_N\subseteq W$ より

$$
V_N=G\cap W,
$$

となるので $V_N$ 自身が $X$ で開です。これを $V$ と書きます。

さらに $N$ は $X$ で閉、$V\subseteq N$ なので

$$
\overline V^{\,X}
=
\overline V^{\,N}
\subseteq W
\subseteq U.
$$

$\overline V$ は compact 空間 $N$ の閉部分集合なので compact です。$\square$
<!-- proof-end -->

Hausdorff 性は、compact 近傍 $N$ を母空間で閉にすることと、$N$ を compact Hausdorff として正規性へ進めることの二箇所に効いています。

---

## 6. compact–open cutoff

$C_c(X)$ は実数値の compact support を持つ連続関数全体とします。

<a id="thm-top5-lch-cutoff"></a>
<!-- formal-statement-start -->
### 定理（LCH compact–open cutoff）

$X$ を局所コンパクト Hausdorff 空間、$K\subseteq U$ を

$$
K\text{ compact},
\qquad
U\text{ open}
$$

とする。このとき $f\in C_c(X)$ が存在して

$$
\boxed{
0\le f\le1,
\qquad
f=1\text{ on some open neighborhood of }K,
\qquad
\operatorname{supp}f\subseteq U.}
$$

特に $f|_K=1$ である。
<!-- formal-statement-end -->

<!-- proof-start -->
### 証明

まず一点 $x\in K$ を固定します。precompact shrinking を $x\in U$ に適用して開集合 $V_x$ を

$$
x\in V_x,
\qquad
C_x:=\overline{V_x}\text{ compact},
\qquad
C_x\subseteq U
$$

となるように取ります。

さらに同じ定理を $x\in V_x$ に適用し、開集合 $W_x$ を

$$
x\in W_x,
\qquad
D_x:=\overline{W_x}\text{ compact},
\qquad
D_x\subseteq V_x
$$

となるように取ります。

compact Hausdorff 空間 $C_x$ の中で

$$
D_x,
\qquad
C_x\setminus V_x
$$

は互いに素な閉集合です。compact Hausdorff 上の連続分離を使い、連続関数

$$
g_x:C_x\to[0,1]
$$

を

$$
g_x=1\text{ on }D_x,
\qquad
g_x=0\text{ on }C_x\setminus V_x
$$

となるように取ります。

これを $C_x$ の外で0として延長し

$$
f_x(y)=
\begin{cases}g_x(y),&y\in C_x,\\0,&y\notin C_x\end{cases}
$$

と置きます。$C_x$ と $X\setminus V_x$ は閉集合で $X$ を覆い、その共通部分 $C_x\setminus V_x$ 上では $g_x=0$ と0関数が一致します。有限閉集合版の貼り合わせ補題により $f_x$ は連続です。

従って

$$
f_x\in C_c(X),
\quad0\le f_x\le1,
\quad f_x=1\text{ on }W_x,
\quad\operatorname{supp}f_x\subseteq C_x\subseteq U.
$$

$(W_x)_{x\in K}$ は compact 集合 $K$ の開被覆です。有限個 $x_1,\ldots,x_n$ を選んで

$$
K\subseteq\bigcup_{i=1}^nW_{x_i}
$$

とします。最後に

$$
f:=1-\prod_{i=1}^n(1-f_{x_i})
$$

と置きます。有限積なので連続で $0\le f\le1$。各 $y\in\bigcup_iW_{x_i}$ では少なくとも一つの $f_{x_i}(y)=1$ なので $f(y)=1$ です。従って $K$ の開近傍上で $f=1$ です。

また

$$
\operatorname{supp}f
\subseteq
\bigcup_{i=1}^n\operatorname{supp}f_{x_i}
\subseteq U.
$$

右辺の最初の有限合併は compact なので $f$ は compact support を持ちます。$\square$
<!-- proof-end -->

---

## 7. MT5 で使ってよい形

以後 MT5 では、上の定理を次の略記で使います。

$$
K\prec U
$$

と書いたとき、$K$ は compact、$U$ は open、$K\subseteq U$ を意味し、必要なら

$$
\exists f\in C_c(X):
\quad0\le f\le1,
\quad f=1\text{ near }K,
\quad\operatorname{supp}f\subseteq U
$$

をこの補遺から呼び出してよいものとします。

重要なのは、これは「LCH なら bump function がある」という暗黙の folklore ではなく、**compactness + Hausdorff separation + dyadic continuous separation + finite subcover** の積み上げとして証明済みだという点です。