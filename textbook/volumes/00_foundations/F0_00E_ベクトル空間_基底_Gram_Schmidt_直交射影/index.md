# F0-00E ベクトル空間・基底

この講義では、行列計算の背後にある線形代数の構造を最初から組み立てます。

F0-00では「行列式や固有値を計算できる」ことを優先しましたが、ここから先の関数解析ではそれだけでは足りません。有限次元・無限次元、基底、線形写像、表現行列を扱うために、まず

**ベクトル空間 → 部分空間 → 線形包 → 一次独立 → 基底 → 次元**

を定義から通します。

---

## 1. ベクトル空間とは何か

<a id="def-f0-00e-vector-space"></a>

<!-- formal-statement-start -->
> **定義（実ベクトル空間）**  
> 集合 $V$ に加法 $V\times V\to V$ と実数によるスカラー倍 $\mathbb R\times V\to V$ が定義され、任意の $x,y,z\in V$ と $a,b\in\mathbb R$ に対して次を満たすとき、$V$ を **実ベクトル空間** といいます。
>
> 1. $x+y=y+x$
> 2. $(x+y)+z=x+(y+z)$
> 3. $x+0=x$ となる零ベクトル $0\in V$ がある
> 4. $x+(-x)=0$ となる逆元 $-x\in V$ がある
> 5. $a(x+y)=ax+ay$
> 6. $(a+b)x=ax+bx$
> 7. $(ab)x=a(bx)$
> 8. $1x=x$
<!-- formal-statement-end -->

<!-- definition-example-start: def-f0-00e-vector-space -->
**定義の確認**

### 1.1 多項式全体でベクトル空間の条件を確かめる

2次以下の多項式全体

$$
P_2=\{a+bx+cx^2:a,b,c\in\mathbb R\}
$$

に、通常の多項式の加法と実数倍を入れます。$p,q,r\in P_2$、$\alpha,\beta\in\mathbb R$ とします。

$p+q$ と $\alpha p$ は再び2次以下なので、演算は $P_2$ の中で閉じています。また多項式の係数を比較すれば

$$
p+q=q+p,
\qquad
(p+q)+r=p+(q+r)
$$

が成り立ち、零多項式が零ベクトル、$-p$ が加法逆元です。さらに

$$
\alpha(p+q)=\alpha p+\alpha q,
\qquad
(\alpha+\beta)p=\alpha p+\beta p,
$$

$$
(\alpha\beta)p=\alpha(\beta p),
\qquad
1p=p
$$

も係数ごとに成り立ちます。

したがって定義の8条件をすべて満たし、$P_2$ は実ベクトル空間です。
<!-- definition-example-end -->

この定義で重要なのは、**ベクトルが数の縦並びである必要はない**ことです。

典型例は

$$
\mathbb R^n
$$

ですが、たとえば2次以下の多項式全体

$$
P_2
=
\{a+bx+cx^2:a,b,c\in\mathbb R\}
$$

もベクトル空間です。

さらに関数全体の集合も、条件を適切に入れればベクトル空間になります。関数解析では「関数そのものをベクトルとして扱う」ので、この抽象化が必要になります。

---

## 2. 部分空間

ベクトル空間の中から一部のベクトルだけを取り出して計算したいとき、加法やスカラー倍を行うたびに集合の外へ出てしまうと、同じ線形代数をその集合の中だけで続けられません。そこで、**線形演算に対して閉じた部分集合**を区別します。

<a id="def-f0-00e-linear-subspace"></a>

<!-- formal-statement-start -->
> **定義（線形部分空間）**  
> ベクトル空間 $V$ の部分集合 $W\subset V$ が、$V$ と同じ加法とスカラー倍についてベクトル空間になるとき、$W$ を $V$ の **線形部分空間** といいます。
<!-- formal-statement-end -->

<!-- definition-example-start: def-f0-00e-linear-subspace -->
**定義の確認**

### 2.1 平面 $x+y+z=0$ は線形部分空間

$$
W=\{(x,y,z)\in\mathbb R^3:x+y+z=0\}
$$

とします。$0=(0,0,0)\in W$ なので $W$ は空ではありません。

$u=(x_1,y_1,z_1),v=(x_2,y_2,z_2)\in W$ と $a,b\in\mathbb R$ に対し、

$$
x_1+y_1+z_1=0,
\qquad
x_2+y_2+z_2=0.
$$

したがって $au+bv$ の成分の和は

$$
a(x_1+y_1+z_1)+b(x_2+y_2+z_2)=0.
$$

よって $au+bv\in W$ です。加法とスカラー倍に閉じているので、$W$ は $\mathbb R^3$ の線形部分空間です。
<!-- definition-example-end -->

実際の判定では、次の条件で十分です。

<a id="prop-f0-00e-subspace-test"></a>

<!-- formal-statement-start -->
> **命題（部分空間判定法）**  
> 空でない集合 $W\subset V$ が部分空間であるための必要十分条件は、任意の $u,v\in W$ と $a,b\in\mathbb R$ に対して

$$
au+bv\in W
$$

> が成り立つことです。
<!-- formal-statement-end -->

### 証明の見取り図

条件 $au+bv\in W$ から、加法・スカラー倍・逆元に対する閉性を一度に取り出します。残りのベクトル空間の公理は $V$ からそのまま引き継がれます。

<!-- proof-start -->
### 証明

必要性から確認します。$W$ が線形部分空間なら、$u,v\in W$ と $a,b\in\mathbb R$ に対して $au,bv\in W$ であり、さらに加法に閉じているので

$
au+bv\in W
$

です。

逆に、$W$ は空でなく、任意の $u,v\in W$ と $a,b\in\mathbb R$ に対して $au+bv\in W$ と仮定します。まず $w\in W$ を一つ取ります。$a=b=0$ とすれば

$
0w+0w=0\in W.
$

次に $a=b=1$ とすれば $u+v\in W$、$b=0$ とすれば任意の $a\in\mathbb R$ に対して $au\in W$ です。特に $a=-1$ から $-u\in W$ です。

したがって $W$ は零ベクトルを含み、加法・スカラー倍・加法逆元に閉じています。結合法則、可換法則、分配法則など残りの公理は、$W$ 上の演算が $V$ の演算の制限なので $V$ から継承されます。ゆえに $W$ は線形部分空間です。$\square$
<!-- proof-end -->

### 例1：部分空間になる

$$
W
=
\{(x,y,z)\in\mathbb R^3:x+y+z=0\}
$$

とします。

$u=(x_1,y_1,z_1)$、$v=(x_2,y_2,z_2)$ が $W$ に属するなら

$$
x_1+y_1+z_1=0,
\qquad
x_2+y_2+z_2=0.
$$

したがって

$$
a(x_1+y_1+z_1)+b(x_2+y_2+z_2)=0
$$

なので $au+bv\in W$ です。

### 例2：部分空間にならない

$$
\{(x,y,z):x+y+z=1\}
$$

は原点を含みません。したがって部分空間ではありません。

---

## 3. 線形結合と線形包

有限次元では $v_1,\dots,v_k$ のようにベクトルを有限本並べれば十分でした。一般のベクトル空間では、候補集合 $S\subseteq V$ が無限集合でも扱える形にしておく必要があります。

ここで重要なのは、**$S$ 自体が無限でも、一つの線形結合に実際に現れるベクトルは有限個だけ**という点です。無限個の項を足し合わせる操作はまだ使いません。

<a id="def-f0-00e-linear-combination-span"></a>

<!-- formal-statement-start -->
> **定義（線形結合と線形包）**  
> ベクトル空間 $V$ の部分集合 $S\subseteq V$ に対し、$S$ から有限個のベクトル $v_1,\dots,v_k$ と係数 $a_1,\dots,a_k\in\mathbb R$ を選んで作る $a_1v_1+\cdots+a_kv_k$ を **線形結合** という。$S$ の有限線形結合すべてと零ベクトルを集めた集合を $\operatorname{span}(S)$ と書き、$S$ の **線形包** という。
<!-- formal-statement-end -->

<!-- definition-example-start: def-f0-00e-linear-combination-span -->
**定義の確認**

### 3.1 二つのベクトルの線形包を直接求める

$$
v_1=(1,0,1),
\qquad
v_2=(0,1,1)
$$

とします。有限線形結合は

$$
av_1+bv_2=(a,b,a+b)
$$

なので、得られるベクトルは必ず $z=x+y$ を満たします。

逆に $(x,y,z)$ が $z=x+y$ を満たせば、

$$
(x,y,z)=xv_1+yv_2.
$$

したがって

$$
\operatorname{span}\{v_1,v_2\}
=
\{(x,y,z)\in\mathbb R^3:z=x+y\}.
$$

これは「$v_1,v_2$ の有限線形結合をすべて集める」という定義を直接使った計算です。
<!-- definition-example-end -->

したがって

$$
\operatorname{span}(S)
=
\{0\}
\cup
\left\{
\sum_{i=1}^k a_iv_i:
k\ge1,\ 
v_i\in S,\ 
a_i\in\mathbb R
\right\}.
$$

<a id="prop-f0-00e-span-minimal"></a>

<!-- formal-statement-start -->
> **命題（線形包の最小性）**  
> $\operatorname{span}(S)$ は $S$ を含む線形部分空間である。さらに、$S$ を含む任意の線形部分空間 $W$ に対して

$
\operatorname{span}(S)\subseteq W
$

> が成り立つ。したがって $\operatorname{span}(S)$ は $S$ を含む最小の線形部分空間である。
<!-- formal-statement-end -->

### 証明の見取り図

有限線形結合同士を加えたり実数倍したりしても、やはり有限線形結合です。また $W$ が $S$ を含むなら、$W$ は線形演算に閉じているので $S$ の有限線形結合をすべて含みます。

<!-- proof-start -->
### 証明

まず $0\in\operatorname{span}(S)$ です。$x,y\in\operatorname{span}(S)$ を

$
x=\sum_{i=1}^r a_i u_i,
\qquad
y=\sum_{j=1}^q b_j w_j
$

と有限線形結合で表します。任意の $\alpha,\beta\in\mathbb R$ に対して

$
\alpha x+\beta y
=
\sum_{i=1}^r (\alpha a_i)u_i
+
\sum_{j=1}^q (\beta b_j)w_j
$

も $S$ の有限線形結合なので、$\alpha x+\beta y\in\operatorname{span}(S)$ です。部分空間判定法から $\operatorname{span}(S)$ は線形部分空間です。各 $s\in S$ は $s=1\cdot s$ と書けるので $S\subseteq\operatorname{span}(S)$ です。

次に $W$ を $S\subseteq W$ を満たす線形部分空間とします。$W$ は加法とスカラー倍に閉じているので、$S$ の任意の有限線形結合は $W$ に属します。よって

$
\operatorname{span}(S)\subseteq W.
$

以上から $\operatorname{span}(S)$ は $S$ を含む最小の線形部分空間です。$\square$
<!-- proof-end -->

$S=\{v_1,\dots,v_k\}$ が有限集合なら、従来どおり

$$
\operatorname{span}(v_1,\dots,v_k)
$$

とも書きます。

### 3.1 有限集合の例

$$
v_1=(1,0,1),
\qquad
v_2=(0,1,1)
$$

なら

$$
av_1+bv_2=(a,b,a+b),
$$

したがって

$$
\operatorname{span}\{v_1,v_2\}
=
\{(x,y,z)\in\mathbb R^3:z=x+y\}.
$$

### 3.2 無限集合でも各ベクトルは有限和で作る

多項式空間

$$
\mathbb R[x]
$$

で

$$
S=\{1,x,x^2,x^3,\dots\}
$$

とします。

任意の多項式

$$
p(x)=a_0+a_1x+\cdots+a_nx^n
$$

は $S$ の有限個の元の線形結合です。したがって

$$
\operatorname{span}(S)=\mathbb R[x].
$$

$S$ は無限集合ですが、一つの多項式を表すのに無限和は必要ありません。

---

## 4. 一次独立・一次従属

無限集合 $S$ の一次独立性も、「有限個を取り出したときに余分な関係がない」という形で定義します。

<a id="def-f0-00e-linear-independence"></a>

<!-- formal-statement-start -->
> **定義（一次独立・一次従属）**  
> 部分集合 $S\subseteq V$ が **一次独立** であるとは、$S$ から相異なる有限個 $v_1,\dots,v_k$ と係数 $a_1,\dots,a_k\in\mathbb R$ を任意に取ったとき、

$$
a_1v_1+\cdots+a_kv_k=0
\quad\Longrightarrow\quad
a_1=\cdots=a_k=0
$$

> が成り立つことをいう。一次独立でない集合を **一次従属** という。
<!-- formal-statement-end -->

<!-- definition-example-start: def-f0-00e-linear-independence -->
**定義の確認**

### 4.1 標準基底の二本は一次独立

$\mathbb R^2$ で

$$
e_1=(1,0),
\qquad
e_2=(0,1)
$$

とします。

$$
ae_1+be_2=0
$$

なら左辺は $(a,b)$ なので、

$$
(a,b)=(0,0).
$$

従って $a=b=0$ です。非自明な有限線形関係が存在しないため、$\{e_1,e_2\}$ は定義どおり一次独立です。
<!-- definition-example-end -->

この定義から、$S$ が一次独立であることと、$S$ の任意の有限部分集合が一次独立であることは同じです。

有限集合 $S=\{v_1,\dots,v_k\}$ では、以前の「$a_1v_1+\cdots+a_kv_k=0$ なら全係数が0」という判定に戻ります。

一次独立とは、生成に使うベクトルの間に有限な冗長性がないことです。

---

<a id="ref-basis-dimension"></a>

## 5. 基底と座標

線形包と一次独立を任意集合へ拡張したので、基底も有限次元に限定せず定義できます。

<a id="def-f0-00e-basis"></a>

<!-- formal-statement-start -->
> **定義（基底）**  
> ベクトル空間 $V$ の部分集合 $B\subseteq V$ が $\operatorname{span}(B)=V$ を満たし、かつ一次独立であるとき、$B$ を $V$ の **基底** という。この代数的な基底を **Hamel 基底** とも呼ぶ。
<!-- formal-statement-end -->

<!-- definition-example-start: def-f0-00e-basis -->
**定義の確認**

### 5.1 $\mathbb R^2$ の標準基底

$$
B=\{e_1,e_2\}
=
\{(1,0),(0,1)\}
$$

とします。任意の $(x,y)\in\mathbb R^2$ は

$$
(x,y)=xe_1+ye_2
$$

と書けるので

$$
\operatorname{span}(B)=\mathbb R^2.
$$

また前節で確認したように $B$ は一次独立です。したがって「空間全体を張る」と「一次独立」の二条件を満たし、$B$ は $\mathbb R^2$ の基底です。
<!-- definition-example-end -->

<a id="prop-f0-00e-basis-expansion-unique"></a>

<!-- formal-statement-start -->
> **命題（基底展開の存在と一意性）**  
> $B$ をベクトル空間 $V$ の基底とする。任意の $x\in V$ は、$B$ の相異なる有限個の元 $b_1,\dots,b_k$ と係数 $c_1,\dots,c_k\in\mathbb R$ を用いて有限線形結合として表せる。さらに、同じ基底ベクトルごとの係数は一意である。
<!-- formal-statement-end -->

### 証明の見取り図

存在は $\operatorname{span}(B)=V$ そのものです。一意性は、二つの表示を引き算して一次独立性へ戻します。

<!-- proof-start -->
### 証明

$\operatorname{span}(B)=V$ なので、任意の $x\in V$ は $B$ の有限個の元の線形結合として表せます。

二つの表示

$
x=\sum_{i=1}^r a_i u_i
=
\sum_{j=1}^q b_j w_j
$

があるとします。ここで $u_i,w_j\in B$ です。両辺を移項し、両方の表示に現れる基底ベクトルをまとめると、相異なる有限個の $z_1,\dots,z_m\in B$ と係数 $d_1,\dots,d_m$ に対して

$
d_1z_1+\cdots+d_mz_m=0
$

を得ます。$B$ は一次独立なので

$
d_1=\cdots=d_m=0.
$

したがって各基底ベクトルの係数は二つの表示で一致します。よって基底展開は一意です。$\square$
<!-- proof-end -->

有限次元で順序付き基底

$$
\mathcal B=(v_1,\dots,v_n)
$$

を選んだ場合は、係数を縦に並べたものを次のように定義します。

<a id="def-f0-00e-coordinate-vector"></a>

<!-- formal-statement-start -->
> **定義（座標ベクトル）**  
> 有限次元ベクトル空間の順序付き基底 $\mathcal B=(v_1,\dots,v_n)$ に対し、$x\in V$ を一意に

$$
x=c_1v_1+\cdots+c_nv_n
$$

> と表す。このとき

$$
[x]_{\mathcal B}
=
(c_1,\dots,c_n)^T
$$

> を $\mathcal B$ に関する $x$ の **座標ベクトル** という。
<!-- formal-statement-end -->

<!-- definition-example-start: def-f0-00e-coordinate-vector -->
**定義の確認**

### 5.2 順序付き基底に対する座標

$\mathbb R^2$ の順序付き基底

$$
\mathcal B=((1,0),(1,1))
$$

と $x=(3,2)$ を考えます。

$$
(3,2)
=
1(1,0)+2(1,1)
$$

なので、定義に従って係数を順に並べれば

$$
[x]_{\mathcal B}
=
\begin{pmatrix}
1\\
2
\end{pmatrix}.
$$

基底の順序を入れ替えれば係数を並べる順序も変わるため、座標ベクトルは「どの順序付き基底を選んだか」に依存します。
<!-- definition-example-end -->

この「基底を選ぶと抽象ベクトルを係数で記述できる」という事実が、後続の表現行列の土台です。

---

## 6. 交換補題：なぜ基底の本数は同じなのか

「次元」を基底の本数として定義するには、どの基底を選んでも本数が同じであることを示す必要があります。

その核心が次の交換補題です。

<a id="lem-steinitz-exchange"></a>

<!-- formal-statement-start -->
> **補題（Steinitzの交換補題）**  
> $V$ が $n$ 本のベクトル $v_1,\dots,v_n$ で張られているとします。$u_1,\dots,u_m$ が一次独立なら

$$
m\le n.
$$
<!-- formal-statement-end -->

### 証明の考え方

$u_1$ は $v_1,\dots,v_n$ の線形結合で表せます。$u_1\ne0$ なので、少なくとも一つの係数は0でありません。その $v_j$ を $u_1$ と交換しても、空間全体を張る性質は失われません。

次に $u_2$ を入れ、さらに別の $v_j$ と交換します。

一次独立性により、$u_2$ を入れる段階で $u_1$ を捨てる必要はありません。

この操作を繰り返すと、$m$ 本の一次独立なベクトルを、もとの $n$ 本の生成系の中へ1本ずつ入れられます。したがって $m>n$ は不可能です。

<!-- proof-start -->
### 証明

$V=\operatorname{span}(v_1,\dots,v_n)$ とします。$u_1,\dots,u_m$ が一次独立であるとします。

帰納的に、$k=0,1,\dots$ について

$
V=
\operatorname{span}
(u_1,\dots,u_k,w_{k+1},\dots,w_n)
$

となるように、もとの $v_1,\dots,v_n$ のうち $n-k$ 本を残せることを示します。$k=0$ では $w_j=v_j$ とすれば成立します。

$k-1$ までできたとします。すると $u_k\in V$ なので

$
u_k
=
a_1u_1+\cdots+a_{k-1}u_{k-1}
+
b_kw_k+\cdots+b_nw_n
$

と書けます。もし $b_k=\cdots=b_n=0$ なら、$u_k$ は $u_1,\dots,u_{k-1}$ の線形結合となり、$u_1,\dots,u_m$ の一次独立性に反します。したがって少なくとも一つ、たとえば $b_j\ne0$ となる $j$ があります。

この等式を $w_j$ について解くと

$
w_j
=
\frac1{b_j}
\left(
u_k
-
\sum_{i=1}^{k-1}a_i u_i
-
\sum_{\substack{\ell=k\\ \ell\ne j}}^n b_\ell w_\ell
\right).
$

よって $w_j$ を $u_k$ に交換しても、交換後のベクトル族は $w_j$ を再び生成できるため $V$ 全体を張ります。これで帰納段階が成立します。

もし $m>n$ なら、この操作を $n$ 回行った時点で

$
V=\operatorname{span}(u_1,\dots,u_n)
$

となります。しかし $u_{n+1}\in V$ なので $u_{n+1}$ は $u_1,\dots,u_n$ の線形結合となり、一次独立性に反します。したがって $m\le n$ です。$\square$
<!-- proof-end -->

---

## 7. 次元は基底の選び方によらない

まず、「有限本で張れる」ことから実際に基底を取り出せることを確認します。

<a id="prop-f0-00e-finite-spanning-basis"></a>

<!-- formal-statement-start -->
> **命題（有限生成空間から基底を取り出せる）**  
> $V$ が有限個のベクトル $v_1,\dots,v_N$ で張られているなら、$\{v_1,\dots,v_N\}$ の部分集合の中に $V$ の基底が存在する。
<!-- formal-statement-end -->

<!-- proof-start -->
### 証明

$v_1,\dots,v_N$ が一次独立なら、そのまま基底です。一次従属なら、ある $v_j$ は残りのベクトルの線形結合として書けます。実際、全て0ではない係数 $a_i$ に対して

$
a_1v_1+\cdots+a_Nv_N=0
$

があり、$a_j\ne0$ を一つ選べば

$
v_j
=
-\frac1{a_j}
\sum_{i\ne j}a_iv_i.
$

したがって $v_j$ を捨てても線形包は変わりません。この削除を、残った族が一次独立になるまで繰り返します。もとの本数は有限なので有限回で停止し、最後に残ったベクトル族は一次独立かつ $V$ を張ります。ゆえに基底です。$\square$
<!-- proof-end -->

<a id="thm-f0-00e-basis-cardinality"></a>

<!-- formal-statement-start -->
> **定理（有限次元で基底の本数は一定）**  
> 有限本のベクトルで張られるベクトル空間 $V$ の二つの基底

$
\mathcal B=(v_1,\dots,v_n),
\qquad
\mathcal C=(w_1,\dots,w_m)
$

> に対して $n=m$ が成り立つ。
<!-- formal-statement-end -->

### 証明の見取り図

一方の基底を「生成系」、もう一方を「一次独立系」として Steinitz の交換補題へ入れ、向きを入れ替えて二つの不等式を得ます。

<!-- proof-start -->
### 証明

$\mathcal B$ は $V$ を張り、$\mathcal C$ は一次独立なので、[Steinitz の交換補題](#lem-steinitz-exchange)から

$
m\le n.
$

逆に $\mathcal C$ は $V$ を張り、$\mathcal B$ は一次独立なので、同じ補題を役割を入れ替えて適用すると

$
n\le m.
$

したがって $n=m$ です。$\square$
<!-- proof-end -->

よって有限次元空間では、**どの基底も同じ本数を持ちます**。

<a id="def-f0-00e-dimension"></a>

<!-- formal-statement-start -->
> **定義（次元）**  
> 有限次元ベクトル空間 $V$ の基底に含まれるベクトルの本数を $V$ の **次元** といい、

$$
\dim V
$$

> と書きます。
<!-- formal-statement-end -->

<!-- definition-example-start: def-f0-00e-dimension -->
**定義の確認**

### 7.1 $\mathbb R^2$ の次元

標準基底

$$
\{(1,0),(0,1)\}
$$

は2本のベクトルからなります。[Steinitz の交換補題](#lem-steinitz-exchange)により、有限次元空間ではどの基底を選んでも本数は同じです。

したがって定義から

$$
\dim\mathbb R^2=2.
$$

「基底の本数」が基底の選び方に依存しないことを先に示したので、この数を空間そのものの次元として定義できます。
<!-- definition-example-end -->

---

## 8. 次元から直ちに分かること

$\dim V=n$ とします。

### 一次独立なベクトルは高々 $n$ 本

交換補題より、一次独立なベクトル族の本数は $n$ を超えません。

### $n$ 本の一次独立なベクトルは自動的に基底

$u_1,\dots,u_n$ が一次独立だが $V$ を張らないと仮定します。すると

$
x\in V\setminus\operatorname{span}(u_1,\dots,u_n)
$

を取れます。関係

$
a_1u_1+\cdots+a_nu_n+bx=0
$

で $b\ne0$ なら $x$ が $u_1,\dots,u_n$ の線形結合になってしまうので、必ず $b=0$ です。その後は $u_1,\dots,u_n$ の一次独立性から $a_1=\cdots=a_n=0$ です。

したがって $u_1,\dots,u_n,x$ は $n+1$ 本の一次独立なベクトルとなり、交換補題に反します。よって $u_1,\dots,u_n$ は $V$ を張り、基底です。

### $n$ 本で $V$ を張れば自動的に基底

$v_1,\dots,v_n$ が $V$ を張るが一次従属だと仮定します。すると全て0ではない係数 $a_i$ が存在して

$
a_1v_1+\cdots+a_nv_n=0.
$

$a_j\ne0$ を一つ選ぶと

$
v_j
=
-\frac1{a_j}
\sum_{i\ne j}a_iv_i
$

なので、$v_j$ を除いた $n-1$ 本でも $V$ を張ります。

一方、$V$ には $n$ 本からなる基底があり、それは一次独立です。この基底を、いま得た $n-1$ 本の生成系に対して交換補題へ入れると

$
n\le n-1
$

となり矛盾です。したがって $v_1,\dots,v_n$ は一次独立であり、基底です。

---

## 9. 基底延長定理

有限次元空間では、一次独立なベクトル族

$$
u_1,\dots,u_r
$$

を必ず $V$ の基底へ延長できます。

<a id="thm-basis-extension"></a>

<!-- formal-statement-start -->
> **定理（基底延長定理）**  
> $u_1,\dots,u_r$ が有限次元ベクトル空間 $V$ で一次独立なら、ある $v_{r+1},\dots,v_n$ が存在して

$$
u_1,\dots,u_r,v_{r+1},\dots,v_n
$$

> が $V$ の基底になります。
<!-- formal-statement-end -->

### 証明の見取り図

まだ $V$ 全体を張っていなければ、現在の線形包の外にあるベクトルを1本追加します。線形包の外から選んだことにより一次独立性は保たれます。有限次元では一次独立なベクトルの本数に上限があるので、この操作は有限回で止まります。

<!-- proof-start -->
### 証明

$\dim V=n$ とします。最初の一次独立系を

$
S_r=\{u_1,\dots,u_r\}
$

とします。

もし $\operatorname{span}(S_r)=V$ なら、すでに $S_r$ は基底です。そうでなければ

$
v_{r+1}\in V\setminus\operatorname{span}(S_r)
$

を一つ取ります。このとき $S_{r+1}=S_r\cup\{v_{r+1}\}$ は一次独立です。実際、

$
a_1u_1+\cdots+a_ru_r+bv_{r+1}=0
$

とし、もし $b\ne0$ なら

$
v_{r+1}
=
-\frac1b(a_1u_1+\cdots+a_ru_r)
\in
\operatorname{span}(S_r)
$

となって選び方に矛盾します。したがって $b=0$ であり、さらに $S_r$ の一次独立性から $a_1=\cdots=a_r=0$ です。

同じ操作を、線形包が $V$ になるまで繰り返します。各段階で一次独立性は保たれ、一次独立なベクトルは高々 $n$ 本なので、遅くとも $n-r$ 回の追加で停止します。停止時には一次独立かつ $V$ を張るので基底です。$\square$
<!-- proof-end -->

この定理は次講で $\ker T$ の基底を $V$ の基底へ延長して rank-nullity theorem を証明するときに使います。

---

<a id="thm-f0-00e-hamel-basis-existence"></a>

## 10. 一般のベクトル空間にも Hamel 基底が存在する

有限次元の基底延長では、一次独立なベクトルの本数が $\dim V$ を超えられないため、「線形包の外から1本ずつ追加する」操作は有限回で止まりました。

無限次元では、その停止回数を自然数で押さえられません。そこで [Zorn の補題](../F0_00A3_半順序_Zorn_極大延長/index.md#thm-zorn)を使い、**一次独立集合をこれ以上追加できないところまで一度に極大化**します。

<!-- formal-statement-start -->
> **定理（Hamel 基底の存在）**  
> 任意の実ベクトル空間 $V$ は Hamel 基底を持つ。
<!-- formal-statement-end -->

<!-- proof-start -->
### 証明

### 10.1 Zorn を適用する候補集合

$V$ の一次独立部分集合全体を

$$
P
=
\{S\subseteq V:S\text{ は一次独立}\}
$$

とし、包含関係 $\subseteq$ で順序付けます。空集合は一次独立なので $P$ は空ではありません。

### 10.2 一次独立集合の鎖の合併は一次独立

$\Gamma\subseteq P$ を包含関係についての鎖とし、

$$
U=\bigcup_{S\in\Gamma}S
$$

と置きます。

$U$ から相異なる有限個

$$
v_1,\dots,v_k
$$

を取り、

$$
a_1v_1+\cdots+a_kv_k=0
$$

とします。

各 $v_i$ はある $S_i\in\Gamma$ に属します。$\Gamma$ は包含関係について鎖で、$S_1,\dots,S_k$ は有限個なので、この中に全てを含む集合 $S_*\in\Gamma$ があります。したがって

$$
v_1,\dots,v_k\in S_*.
$$

$S_*$ は一次独立なので

$$
a_1=\cdots=a_k=0.
$$

よって $U$ は一次独立であり $U\in P$ です。さらに各 $S\in\Gamma$ について $S\subseteq U$ なので、$U$ は $\Gamma$ の上界です。

### 10.3 極大一次独立集合は空間全体を張る

[Zorn の補題](../F0_00A3_半順序_Zorn_極大延長/index.md#thm-zorn)より、$P$ は極大元 $B$ を持ちます。つまり $B$ は極大一次独立集合です。

もし

$$
\operatorname{span}(B)\ne V
$$

なら

$$
x\in V\setminus\operatorname{span}(B)
$$

を一つ取れます。

$B\cup\{x\}$ が一次独立であることを確認します。有限個 $b_1,\dots,b_m\in B$ と係数について

$$
a x+a_1b_1+\cdots+a_mb_m=0
$$

とします。

もし $a\ne0$ なら

$$
x
=
-\frac1a
\left(
a_1b_1+\cdots+a_mb_m
\right)
\in
\operatorname{span}(B),
$$

となり $x$ の選び方に矛盾します。したがって $a=0$ です。残りは $B$ の一次独立性から

$$
a_1=\cdots=a_m=0.
$$

よって $B\cup\{x\}$ は一次独立です。これは $B$ の極大性に反します。

したがって

$$
\operatorname{span}(B)=V.
$$

$B$ は一次独立かつ $V$ を張るので、定義より Hamel 基底です。$\square$
<!-- proof-end -->

この証明で [Zorn の補題](../F0_00A3_半順序_Zorn_極大延長/index.md#thm-zorn)を使う場所は、F0-00A3 の4段階そのものです。

$$
\boxed{
\text{一次独立集合}
\to
\text{包含順序}
\to
\text{鎖の合併}
\to
\text{極大一次独立集合}
\to
\text{Hamel 基底}
}
$$

---

## 11. 部分空間の和と直和

二つの部分空間 $U,W$ を同時に使って大きな部分空間を作るとき、$u+w$ という表示が一意かどうかが重要になります。交わりが零ベクトルだけなら、二つの成分を混同せずに分解できます。この違いを「和」と「直和」として定義します。

<a id="def-f0-00e-sum-direct-sum"></a>

<!-- formal-statement-start -->
> **定義（部分空間の和・直和）**  
> 部分空間 $U,W\subset V$ に対して

$$
U+W=\{u+w:u\in U,\ w\in W\}
$$

> を **部分空間の和** といいます。さらに $U\cap W=\{0\}$ のとき、各元の表示 $u+w$ は一意になり、この和を **直和** といい $U\oplus W$ と書きます。
<!-- formal-statement-end -->

<!-- definition-example-start: def-f0-00e-sum-direct-sum -->
**定義の確認**

### 11.1 座標軸の直和

$\mathbb R^2$ で

$$
U=\{(x,0):x\in\mathbb R\},
\qquad
W=\{(0,y):y\in\mathbb R\}
$$

とします。

任意の $(x,y)\in\mathbb R^2$ は

$$
(x,y)=(x,0)+(0,y)
$$

と書けるので $U+W=\mathbb R^2$ です。

また

$$
U\cap W=\{(0,0)\}.
$$

もし

$$
u_1+w_1=u_2+w_2
$$

なら $u_1-u_2=w_2-w_1$ は $U\cap W$ に属するので両辺は $0$ です。従って $u_1=u_2$, $w_1=w_2$ で、表示は一意です。

したがって定義より

$$
\mathbb R^2=U\oplus W.
$$
<!-- definition-example-end -->

一般の場合にも、$U\cap W=\{0\}$ なら表示の一意性はすぐ確認できます。もし

$
u_1+w_1=u_2+w_2
$

なら

$
u_1-u_2=w_2-w_1.
$

左辺は $U$、右辺は $W$ に属するので、この共通ベクトルは $U\cap W=\{0\}$ に属します。したがって $u_1=u_2$ かつ $w_1=w_2$ です。

また $U+W$ 自体が部分空間であることも確認できます。$u_i\in U$, $w_i\in W$ と $a,b\in\mathbb R$ に対して

$
a(u_1+w_1)+b(u_2+w_2)
=
(au_1+bu_2)+(aw_1+bw_2)\in U+W.
$

<a id="thm-f0-00e-dimension-sum"></a>

<!-- formal-statement-start -->
> **定理（部分空間の和の次元公式）**  
> $U,W$ を有限次元ベクトル空間 $V$ の部分空間とする。このとき

$
\dim(U+W)
=
\dim U+\dim W-\dim(U\cap W).
$

> 特に $U\cap W=\{0\}$ なら

$
\dim(U\oplus W)
=
\dim U+\dim W.
$
<!-- formal-statement-end -->

### 証明の見取り図

まず $U\cap W$ の基底を $U$ と $W$ の基底へそれぞれ延長します。その二つの延長部分を合わせると $U+W$ の基底になり、本数を数えれば公式が出ます。

<!-- proof-start -->
### 証明

$U\cap W$ の基底を

$
e_1,\dots,e_r
$

とします。基底延長定理により、これを $U$ の基底

$
e_1,\dots,e_r,u_{r+1},\dots,u_p
$

へ延長し、また $W$ の基底

$
e_1,\dots,e_r,w_{r+1},\dots,w_q
$

へ延長します。ここで

$
p=\dim U,
\qquad
q=\dim W,
\qquad
r=\dim(U\cap W).
$

まず

$
\mathcal S=
\{e_1,\dots,e_r,u_{r+1},\dots,u_p,w_{r+1},\dots,w_q\}
$

が $U+W$ を張ることを示します。任意の $u+w\in U+W$ について、$u$ は $U$ の上の基底で、$w$ は $W$ の上の基底で展開できるので、$u+w$ は $\mathcal S$ の線形結合です。

次に一次独立性を示します。係数について

$
\sum_{i=1}^r a_i e_i
+
\sum_{j=r+1}^p b_j u_j
+
\sum_{k=r+1}^q c_k w_k
=0
$

とします。移項すると

$
\sum_{j=r+1}^p b_j u_j
=
-
\left(
\sum_{i=1}^r a_i e_i
+
\sum_{k=r+1}^q c_k w_k
\right).
$

左辺は $U$ に属し、右辺は $W$ に属するので、このベクトルは $U\cap W$ に属します。したがってある $d_1,\dots,d_r$ を用いて

$
\sum_{j=r+1}^p b_j u_j
=
\sum_{i=1}^r d_i e_i
$

と書けます。ところが $e_1,\dots,e_r,u_{r+1},\dots,u_p$ は $U$ の基底なので一次独立です。よって

$
b_{r+1}=\cdots=b_p=0,
\qquad
d_1=\cdots=d_r=0.
$

元の関係は

$
\sum_{i=1}^r a_i e_i
+
\sum_{k=r+1}^q c_k w_k
=0
$

となり、$W$ の基底の一次独立性から

$
a_1=\cdots=a_r=0,
\qquad
c_{r+1}=\cdots=c_q=0.
$

したがって $\mathcal S$ は一次独立で、$U+W$ の基底です。よって

$
\dim(U+W)
=
r+(p-r)+(q-r)
=
p+q-r.
$

すなわち

$
\dim(U+W)
=
\dim U+\dim W-\dim(U\cap W).
$

直和の場合は $U\cap W=\{0\}$ なので $r=0$ を代入すればよいです。$\square$
<!-- proof-end -->

固有空間による分解や直交分解を理解するために、この言葉を使います。

---

## 12. 座標写像は線形同型

基底を選ぶと、抽象ベクトルと係数列の対応が単なる記号上の対応ではなく、加法とスカラー倍を保つことを確認できます。

<a id="thm-f0-00e-coordinate-isomorphism"></a>

<!-- formal-statement-start -->
> **定理（座標写像は線形同型）**  
> $V$ を $n$ 次元実ベクトル空間とし、順序付き基底

$
\mathcal B=(v_1,\dots,v_n)
$

> を固定する。このとき座標写像

$
\Phi_{\mathcal B}:V\to\mathbb R^n,
\qquad
x\mapsto[x]_{\mathcal B}
$

> は線形同型である。したがって $V\cong\mathbb R^n$ である。
<!-- formal-statement-end -->

### 証明の見取り図

線形性は「係数ごとに足し算・実数倍される」ことから従います。単射は座標が全て0なら元のベクトルも0であること、全射は任意の係数列から基底の線形結合を作れることを使います。

<!-- proof-start -->
### 証明

$x,y\in V$ を

$
x=\sum_{i=1}^n c_i v_i,
\qquad
y=\sum_{i=1}^n d_i v_i
$

と表します。任意の $\alpha,\beta\in\mathbb R$ に対して

$
\alpha x+\beta y
=
\sum_{i=1}^n(\alpha c_i+\beta d_i)v_i.
$

基底展開の一意性から

$
[\alpha x+\beta y]_{\mathcal B}
=
\alpha[x]_{\mathcal B}
+
\beta[y]_{\mathcal B}.
$

したがって $\Phi_{\mathcal B}$ は線形です。

次に $\Phi_{\mathcal B}(x)=0$ とすると、$x$ の全ての基底係数が0なので

$
x=0.
$

よって核は $\{0\}$ であり、$\Phi_{\mathcal B}$ は単射です。

最後に任意の

$
c=
\begin{pmatrix}
c_1\\
\vdots\\
c_n
\end{pmatrix}
\in\mathbb R^n
$

を取ります。

$
x=c_1v_1+\cdots+c_nv_n
$

と置けば

$
\Phi_{\mathcal B}(x)=c.
$

したがって全射です。以上より $\Phi_{\mathcal B}$ は線形同型です。$\square$
<!-- proof-end -->

ただし重要なのは

> **同型だから同じものなのではなく、基底を選ぶことで座標表示できる**

という順序です。

行列はこの座標化の後に現れます。

---

## 13. 演習

### F0-00E-A01 線形包と一次独立

- Level: A
- 目安時間: 10分
- 主題: 有限集合の線形包

$v_1=(1,0,1)^T$, $v_2=(0,1,1)^T$ とする。

1. $x=(2,3,5)^T$ が $\operatorname{span}\{v_1,v_2\}$ に属することを示せ。
2. $\{v_1,v_2\}$ が一次独立であることを示せ。
3. $\operatorname{span}\{v_1,v_2\}$ の次元を求めよ。

<!-- solution-start -->
#### 詳細解答

任意の係数 $a,b$ に対して

$$
av_1+bv_2=(a,b,a+b)^T.
$$

$a=2$, $b=3$ とすれば

$$
2v_1+3v_2=(2,3,5)^T=x,
$$

なので $x\in\operatorname{span}\{v_1,v_2\}$ です。

次に

$$
av_1+bv_2=0
$$

とします。第1成分から $a=0$、第2成分から $b=0$ です。したがって $\{v_1,v_2\}$ は一次独立です。

よって $v_1,v_2$ は $\operatorname{span}\{v_1,v_2\}$ の基底であり、次元は

$$
2
$$

です。
<!-- solution-end -->

### F0-00E-A02 無限集合の線形包は有限線形結合で作る

- Level: A
- 目安時間: 10分
- 主題: 無限生成集合

$\mathbb R[x]$ で

$$
S=\{1,x,x^2,x^3,\dots\}
$$

とする。

1. $p(x)=2-3x+5x^4$ が $\operatorname{span}(S)$ に属することを示せ。
2. $\operatorname{span}(S)=\mathbb R[x]$ を示せ。
3. この主張で無限個の項を足し合わせる操作が不要な理由を説明せよ。

<!-- solution-start -->
#### 詳細解答

まず

$$
p(x)=2\cdot1+(-3)x+5x^4
$$

なので、$S$ の3個の元の線形結合として表されています。したがって

$$
p\in\operatorname{span}(S).
$$

一般の多項式

$$
q(x)=a_0+a_1x+\cdots+a_nx^n
$$

も $1,x,\dots,x^n$ という有限個の $S$ の元の線形結合です。よって

$$
\mathbb R[x]\subseteq\operatorname{span}(S).
$$

逆に $S\subseteq\mathbb R[x]$ で、$\mathbb R[x]$ は線形結合に閉じているので

$$
\operatorname{span}(S)\subseteq\mathbb R[x].
$$

したがって両者は等しいです。

$S$ 自体は無限集合ですが、一つの多項式に現れる項は有限個なので、その表示に必要な $S$ の元も有限個です。Hamel 基底で使う線形包は有限線形結合だけを使います。
<!-- solution-end -->

### F0-00E-A03 Hamel 基底では各ベクトルの表示は有限

- Level: A
- 目安時間: 8分
- 主題: Hamel 基底の意味

$B$ をベクトル空間 $V$ の Hamel 基底とする。任意の $x\in V$ が $B$ の有限個の元の線形結合で表され、その表示が一意である理由を説明せよ。

<!-- solution-start -->
#### 詳細解答

基底の定義から

$$
\operatorname{span}(B)=V.
$$

線形包は有限線形結合の全体として定義したので、任意の $x\in V$ には相異なる有限個 $b_1,\dots,b_k\in B$ と係数 $a_1,\dots,a_k$ が存在して

$$
x=a_1b_1+\cdots+a_kb_k
$$

と書けます。

二つの有限表示があると仮定します。両辺を移項し、両方に現れる基底ベクトルをまとめれば、$B$ の有限個の元について

$$
c_1u_1+\cdots+c_mu_m=0
$$

という関係を得ます。

$B$ は一次独立なので

$$
c_1=\cdots=c_m=0.
$$

したがって同じ基底ベクトルの係数は一致し、表示は一意です。
<!-- solution-end -->

### F0-00E-A04 一次従属な生成集合

- Level: A
- 目安時間: 10分
- 主題: 線形包と一次従属

$\mathbb R^3$ で

$$
S=\{e_1,e_2,e_1+e_2\}
$$

とする。

1. $S$ が一次従属であることを示せ。
2. $\operatorname{span}(S)=\operatorname{span}\{e_1,e_2\}$ を示せ。

<!-- solution-start -->
#### 詳細解答

まず

$$
e_1+e_2-(e_1+e_2)=0
$$

は係数が全て0ではない線形関係です。したがって $S$ は一次従属です。

$\{e_1,e_2\}\subseteq S$ なので

$$
\operatorname{span}\{e_1,e_2\}
\subseteq
\operatorname{span}(S).
$$

一方、$S$ の第3の元 $e_1+e_2$ はすでに $\operatorname{span}\{e_1,e_2\}$ に属します。したがって $S$ の全ての元が $\operatorname{span}\{e_1,e_2\}$ に入り、

$$
\operatorname{span}(S)
\subseteq
\operatorname{span}\{e_1,e_2\}.
$$

よって両者は等しいです。
<!-- solution-end -->

### F0-00E-B01 基底延長と次元

- Level: B
- 目安時間: 15分
- 主題: 有限次元の基底延長

$V=\mathbb R^4$ とし

$$
u_1=(1,0,1,0)^T,
\qquad
u_2=(0,1,0,1)^T
$$

とする。

1. $u_1,u_2$ が一次独立であることを示せ。
2. この2本を $\mathbb R^4$ の基底へ延長するベクトルを2本具体的に与えよ。
3. 一次独立な5本のベクトルが $\mathbb R^4$ に存在しない理由を説明せよ。

<!-- solution-start -->
#### 詳細解答

$$
au_1+bu_2=0
$$

とすると、第1成分から $a=0$、第2成分から $b=0$ なので $u_1,u_2$ は一次独立です。

例えば

$$
e_3=(0,0,1,0)^T,
\qquad
e_4=(0,0,0,1)^T
$$

を追加します。

$$
au_1+bu_2+ce_3+de_4=0
$$

とすると、第1成分から $a=0$、第2成分から $b=0$、第3成分から $c=0$、第4成分から $d=0$ です。したがって4本は一次独立です。

$\mathbb R^4$ の次元は4なので、この4本は基底です。

また [Steinitz の交換補題](#lem-steinitz-exchange)から、4次元空間の一次独立集合は高々4本です。したがって一次独立な5本は存在しません。
<!-- solution-end -->

### F0-00E-B02 一次独立集合の鎖の合併

- Level: B
- 目安時間: 15分
- 主題: Hamel 基底存在証明の鎖上界

$V$ の一次独立部分集合全体を包含関係で順序付ける。$\Gamma$ がその鎖なら

$$
U=\bigcup_{S\in\Gamma}S
$$

が一次独立であることを示せ。

<!-- solution-start -->
#### 詳細解答

$U$ から相異なる有限個

$$
v_1,\dots,v_k
$$

を取り、

$$
a_1v_1+\cdots+a_kv_k=0
$$

とします。

各 $v_i$ について $v_i\in S_i$ となる $S_i\in\Gamma$ を取ります。$S_1,\dots,S_k$ は有限個で、$\Gamma$ は包含関係について鎖なので、この有限個の中に全てを含む最大のもの $S_*$ があります。

したがって

$$
v_1,\dots,v_k\in S_*.
$$

$S_*$ は一次独立なので

$$
a_1=\cdots=a_k=0.
$$

任意の有限線形関係が自明なので、$U$ は一次独立です。
<!-- solution-end -->

### F0-00E-B03 極大一次独立集合は空間を張る

- Level: B
- 目安時間: 15分
- 主題: Zorn 後の極大性

$B\subseteq V$ が包含関係について極大な一次独立集合であるとする。$\operatorname{span}(B)=V$ を示せ。

<!-- solution-start -->
#### 詳細解答

反対に

$$
\operatorname{span}(B)\ne V
$$

と仮定します。すると

$$
x\in V\setminus\operatorname{span}(B)
$$

を一つ取れます。

$B\cup\{x\}$ が一次独立であることを示します。$b_1,\dots,b_m\in B$ と係数について

$$
a x+a_1b_1+\cdots+a_mb_m=0
$$

とします。

もし $a\ne0$ なら

$$
x
=
-\frac1a
(a_1b_1+\cdots+a_mb_m)
\in
\operatorname{span}(B),
$$

となり $x$ の選び方に矛盾します。よって $a=0$ です。

すると

$$
a_1b_1+\cdots+a_mb_m=0
$$

であり、$B$ の一次独立性から $a_1=\cdots=a_m=0$ です。

したがって $B\cup\{x\}$ は一次独立で、$B$ を真に含みます。これは $B$ の極大性に反します。

よって

$$
\operatorname{span}(B)=V.
$$
<!-- solution-end -->

### F0-00E-C01 Zorn の補題から Hamel 基底を構成する

- Level: C
- 目安時間: 22分
- 主題: 一般ベクトル空間の基底存在

任意の実ベクトル空間 $V$ が Hamel 基底を持つことを [Zorn の補題](../F0_00A3_半順序_Zorn_極大延長/index.md#thm-zorn)を使って証明せよ。候補集合・順序・鎖の上界・極大元の意味をすべて明示すること。

<!-- solution-start -->
#### 詳細解答

候補集合を

$$
P
=
\{S\subseteq V:S\text{ は一次独立}\}
$$

とし、包含関係で順序付けます。空集合は一次独立なので $P$ は非空です。

$\Gamma\subseteq P$ を包含関係についての鎖とし、

$$
U=\bigcup_{S\in\Gamma}S
$$

と置きます。

B02 の議論により、$U$ の任意の有限部分集合は鎖中の一つの一次独立集合に含まれるので、$U$ も一次独立です。したがって $U\in P$ であり、各 $S\in\Gamma$ を含むので $\Gamma$ の上界です。

よって $P$ の任意の鎖は上界を持ちます。[Zorn の補題](../F0_00A3_半順序_Zorn_極大延長/index.md#thm-zorn)から、$P$ は極大元 $B$ を持ちます。つまり $B$ は極大一次独立集合です。

B03 の議論により、もし $\operatorname{span}(B)\ne V$ なら $x\in V\setminus\operatorname{span}(B)$ を追加して $B\cup\{x\}$ をより大きな一次独立集合にでき、極大性に矛盾します。

したがって

$$
\operatorname{span}(B)=V.
$$

$B$ は一次独立かつ $V$ を張るので、定義より Hamel 基底です。
<!-- solution-end -->

---

## 14. 次に進む

ここまでで、有限次元の基底・次元・座標に加え、一般のベクトル空間で Hamel 基底が存在するところまで準備しました。

次は線形写像を基底で座標化し、**表現行列・基底変換・相似・対角化**を構造として扱います。

**次：[F0-00F 線形写像・表現行列・基底変換・対角化](../F0_00F_線形写像_固有空間_スペクトル定理_SVD/index.md)**
