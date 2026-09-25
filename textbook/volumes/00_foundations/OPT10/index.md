# OPT10 線形計画 I：多面体・極点・双対

<!-- definition-example-audit: strict -->

[OPT2](../OPT2/index.md) では分離定理と Farkas の補題を、[OPT5](../OPT5/index.md) では Lagrange 双対・強双対・KKT を学びました。本章では、それらを有限次元線形計画へ集約します。

線形計画は

$$
\text{線形目的関数}
\quad+\quad
\text{線形等式・不等式制約}
$$

だけからできています。式の形は単純ですが、ここには後続の単体法、内点法、整数計画、minimax、協力ゲーム、割当市場の骨格がほぼ全部現れます。

本章の主線は

$$
\boxed{
\text{標準形}
\to
\text{多面体}
\to
\text{極点}
\to
\text{基本実行可能解}
\to
\text{最適極点}
\to
\text{LP 双対}
\to
\text{Farkas}
\to
\text{相補性}
}
$$

です。

> **この章で重要な見方**  
> 線形計画では「最適解を計算する」前に、なぜ候補を極点へ絞れるのか、なぜ双対変数が下界の証明書になるのか、なぜ主問題と双対問題の最適値が一致するのかを理解します。OPT11 の単体法（simplex method）は、この幾何を実際のピボット操作へ変換する章です。

---

## 1. 線形計画を一つの標準形へ集める

本章では、主問題を

$$
\min_{x\in\mathbb R^n} c^{\mathsf T}x
\quad\text{subject to}\quad
Ax=b,
\qquad
x\ge0
$$

という形へ統一します。

ここで

$$
A\in\mathbb R^{m\times n},
\qquad
b\in\mathbb R^m,
\qquad
c\in\mathbb R^n
$$

です。不等式 $x\ge0$ は成分ごとの不等式です。

<a id="def-opt10-standard-form"></a>
<!-- formal-statement-start -->
> **定義（線形計画問題の標準形）**  
> $A\in\mathbb R^{m\times n}$、$b\in\mathbb R^m$、$c\in\mathbb R^n$ とする。
>
> $$
> \boxed{
> \min c^{\mathsf T}x
> \quad\text{subject to}\quad
> Ax=b,\qquad x\ge0
> }
> $$
>
> の形の線形計画問題を、本章では **標準形**という。$Ax=b,\ x\ge0$ を満たす $x$ を **実行可能解**といい、その集合を実行可能集合と呼ぶ。
<!-- formal-statement-end -->

<!-- definition-example-start: def-opt10-standard-form -->
**定義の確認**：余剰変数で不等式を等式へ変える

$$
\min_{u,v\ge0} 3u+2v
$$

subject to

$$
u+v\ge4,
\qquad
u+2v\ge6
$$

を考えます。

余剰変数 $s_1,s_2\ge0$ を入れて

$$
u+v-s_1=4,
$$

$$
u+2v-s_2=6
$$

とすれば、

$$
x=
\begin{pmatrix}
u\\v\\s_1\\s_2
\end{pmatrix},
\quad
A=
\begin{pmatrix}
1&1&-1&0\\
1&2&0&-1
\end{pmatrix},
\quad
b=
\begin{pmatrix}
4\\6
\end{pmatrix},
\quad
c=
\begin{pmatrix}
3\\2\\0\\0
\end{pmatrix}
$$

として標準形になります。
<!-- definition-example-end -->

### 1.1 不等式・自由変数・最大化はどう直すか

線形計画の典型的な変換は次の三つです。

不等式

$$
a^{\mathsf T}x\le\beta
$$

にはスラック変数 $s\ge0$ を加えて

$$
a^{\mathsf T}x+s=\beta
$$

とします。

逆向きの不等式

$$
a^{\mathsf T}x\ge\beta
$$

には余剰変数 $s\ge0$ を引いて

$$
a^{\mathsf T}x-s=\beta
$$

とします。

符号制約のない自由変数 $z\in\mathbb R$ は

$$
z=z^+-z^-,
\qquad
z^+,z^-\ge0
$$

と分解します。

また

$$
\max c^{\mathsf T}x
$$

は

$$
\min (-c)^{\mathsf T}x
$$

へ直せます。

したがって、有限次元の通常の線形計画は標準形へ移せます。

---

## 2. 実行可能集合は多面体である

標準形の実行可能集合

$$
P=\{x\in\mathbb R^n:Ax=b,\ x\ge0\}
$$

は、有限個の線形等式と線形不等式の共通解です。

<a id="def-opt10-polyhedron"></a>
<!-- formal-statement-start -->
> **定義（多面体・有界多面体）**  
> 有限個の線形不等式
>
> $$
> Gx\le h
> $$
>
> と線形等式
>
> $$
> Ex=f
> $$
>
> の共通解集合として表される集合を **多面体**（polyhedron）という。
>
> 多面体が有界であるとき、これを **有界多面体**（polytope）という。
<!-- formal-statement-end -->

<!-- definition-example-start: def-opt10-polyhedron -->
**定義の確認**：有界な例と有界でない例

$$
P_1
=
\{(x_1,x_2):x_1\ge0,\ x_2\ge0,\ x_1+x_2\le1\}
$$

は三角形なので有界多面体です。

一方

$$
P_2
=
\{(x_1,x_2):x_1\ge0,\ x_2\ge0\}
$$

は第1象限全体であり、多面体ですが有界ではありません。
<!-- definition-example-end -->

各線形不等式が定める半空間は凸集合であり、線形等式が定めるアフィン集合も凸です。従って多面体は凸集合です。

ただし、多面体が必ず「頂点を持つ」とは限りません。例えば

$$
L=\{(t,0):t\in\mathbb R\}
$$

は多面体ですが、後で定義する極点を一つも持ちません。

標準形の非負制約は、この事情をかなり変えます。

---

## 3. 実行可能方向：その点からどちらへ動けるか

極点を理解する前に、「局所的に動ける方向」を定義します。

<a id="def-opt10-feasible-direction"></a>
<!-- formal-statement-start -->
> **定義（実行可能方向）**  
> $P\subset\mathbb R^n$、$x\in P$ とする。ベクトル $d\in\mathbb R^n$ が $x$ における **実行可能方向**であるとは、ある $\varepsilon>0$ が存在して
>
> $$
> x+td\in P
> \qquad
> (0\le t\le\varepsilon)
> $$
>
> が成り立つことをいう。
<!-- formal-statement-end -->

<!-- definition-example-start: def-opt10-feasible-direction -->
**定義の確認**：2次元単体の辺に沿う

$$
P=
\{(x_1,x_2):x_1+x_2=1,\ x_1,x_2\ge0\}
$$

の点

$$
x=
\begin{pmatrix}
1\\0
\end{pmatrix}
$$

を考えます。

$$
d=
\begin{pmatrix}
-1\\1
\end{pmatrix}
$$

なら

$$
x+td=
\begin{pmatrix}
1-t\\t
\end{pmatrix}
$$

なので、$0\le t\le1$ で実行可能です。従って $d$ は実行可能方向です。

一方

$$
-d=
\begin{pmatrix}
1\\-1
\end{pmatrix}
$$

では第2成分が直ちに負になるので、$-d$ は $x$ における実行可能方向ではありません。
<!-- definition-example-end -->

標準形では実行可能方向を完全に成分条件へ落とせます。

<a id="thm-opt10-feasible-direction-test"></a>
<!-- formal-statement-start -->
> **定理（標準形多面体の実行可能方向判定）**  
> $P=\{x\in\mathbb R^n:Ax=b,\ x\ge0\}$、$x\in P$ とする。
>
> $$
> I_0(x)=\{j:x_j=0\}
> $$
>
> と置く。このとき $d\in\mathbb R^n$ が $x$ における実行可能方向であることと
>
> $$
> \boxed{
> Ad=0,
> \qquad
> d_j\ge0\quad(j\in I_0(x))
> }
> $$
>
> は同値である。
<!-- formal-statement-end -->

### 証明の見取り図

等式制約は一次式なので、動いた後も $Ax=b$ を保つ条件はそのまま $Ad=0$ です。

非負制約で問題になるのは現在 0 の成分です。正の成分には小さな負方向を許せますが、0 の成分は負方向へ一歩も動けません。

<!-- proof-start -->
### 証明

まず $d$ が実行可能方向だとします。ある $\varepsilon>0$ に対して

$$
x+td\in P
\qquad
(0\le t\le\varepsilon)
$$

です。

等式制約から

$$
A(x+td)=b.
$$

$x\in P$ なので $Ax=b$ です。従って $t>0$ に対して

$$
tAd=0,
$$

よって

$$
Ad=0.
$$

また $j\in I_0(x)$ なら $x_j=0$ です。非負性より

$$
0\le x_j+td_j=td_j
$$

なので

$$
d_j\ge0.
$$

逆に

$$
Ad=0,
\qquad
d_j\ge0\quad(j\in I_0(x))
$$

とします。

$d_j<0$ となる成分は必ず $x_j>0$ です。そこで

$$
\varepsilon
=
\min_{j:d_j<0}
\frac{x_j}{-d_j}
$$

と置きます。負成分が一つもなければ、任意の正の $\varepsilon$ を取れます。

$0\le t\le\varepsilon$ なら、$d_j<0$ の成分でも

$$
x_j+td_j\ge0
$$

です。$d_j\ge0$ の成分では自明に非負です。

さらに

$$
A(x+td)
=
Ax+tAd
=
b.
$$

従って $x+td\in P$ であり、$d$ は実行可能方向です。$\square$
<!-- proof-end -->

---

## 4. 極点：両側へ割れない点

凸集合の「角」を座標に依存せず定義します。

<a id="def-opt10-extreme-point"></a>
<!-- formal-statement-start -->
> **定義（極点）**  
> 凸集合 $C\subset\mathbb R^n$ と $x\in C$ を取る。
>
> $$
> x=\theta u+(1-\theta)v,
> \qquad
> u,v\in C,
> \qquad
> 0<\theta<1
> $$
>
> なら必ず $u=v=x$ となるとき、$x$ を $C$ の **極点**という。
<!-- formal-statement-end -->

<!-- definition-example-start: def-opt10-extreme-point -->
**定義の確認**：単体の端点

$$
P=
\{(x_1,x_2):x_1+x_2=1,\ x_1,x_2\ge0\}
$$

では

$$
e_1=(1,0),
\qquad
e_2=(0,1)
$$

が極点です。

例えば $e_1$ を

$$
e_1=\theta u+(1-\theta)v
$$

と非自明な凸結合で書いたとします。第2成分は

$$
0=\theta u_2+(1-\theta)v_2.
$$

$u_2,v_2\ge0$ なので

$$
u_2=v_2=0.
$$

さらに $u_1=v_1=1$ です。従って $u=v=e_1$ しかありません。

一方

$$
\left(\frac12,\frac12\right)
=
\frac12(1,0)
+
\frac12(0,1)
$$

なので中央点は極点ではありません。
<!-- definition-example-end -->

標準形多面体では、極点かどうかは「正の変数に対応する列が一次独立か」で判定できます。

<a id="thm-opt10-extreme-point-test"></a>
<!-- formal-statement-start -->
> **定理（標準形多面体の極点判定）**  
> $A=(a_1\ \cdots\ a_n)\in\mathbb R^{m\times n}$ とし、
>
> $$
> P=\{x\in\mathbb R^n:Ax=b,\ x\ge0\}.
> $$
>
> $x\in P$ に対し
>
> $$
> I_+(x)=\{j:x_j>0\}
> $$
>
> と置く。このとき次は同値である。
>
> 1. $x$ は $P$ の極点である。
> 2. 列ベクトル族 $\{a_j:j\in I_+(x)\}$ は一次独立である。
<!-- formal-statement-end -->

### 証明の見取り図

正成分に対応する列が一次従属なら、その従属関係を方向 $d$ にできます。正成分の場所だけで $x\pm\varepsilon d$ と両側へ少し動けるため、$x$ は線分の中点になります。

逆に $x$ が二点の中間に割れるなら、$x_j=0$ の成分では両端点も 0 でなければなりません。従って両端点の差は $I_+(x)$ の上だけに載り、そこに列の一次従属関係が生じます。

<!-- proof-start -->
### 証明

まず $\{a_j:j\in I_+(x)\}$ が一次従属だとします。

すると 0 でない係数ベクトル $d\in\mathbb R^n$ を、$I_+(x)$ の外では $d_j=0$ となるように取れて、

$$
Ad=0
$$

とできます。

$j\in I_+(x)$ では $x_j>0$ なので、十分小さい $\varepsilon>0$ を取れば

$$
x+\varepsilon d\ge0,
\qquad
x-\varepsilon d\ge0
$$

を同時に満たせます。

また

$$
A(x\pm\varepsilon d)
=
Ax\pm\varepsilon Ad
=
b.
$$

従って

$$
x^+=x+\varepsilon d,
\qquad
x^-=x-\varepsilon d
$$

は異なる二つの実行可能点です。そして

$$
x=\frac12x^++\frac12x^-.
$$

よって $x$ は極点ではありません。

逆に $x$ が極点でないとします。ある異なる $u,v\in P$ と $0<\theta<1$ が存在して

$$
x=\theta u+(1-\theta)v
$$

と書けます。

$x_j=0$ の成分を考えます。$u_j,v_j\ge0$ かつ

$$
0=\theta u_j+(1-\theta)v_j
$$

なので

$$
u_j=v_j=0.
$$

従って

$$
d=u-v
$$

は $I_+(x)$ の外で 0 です。

一方

$$
Ad=Au-Av=b-b=0.
$$

$u\ne v$ なので $d\ne0$ です。したがって

$$
\sum_{j\in I_+(x)}d_j a_j=0
$$

は非自明な一次関係であり、$\{a_j:j\in I_+(x)\}$ は一次従属です。

以上で同値性が示されました。$\square$
<!-- proof-end -->

---

## 5. 基本実行可能解：極点を線形代数で作る

ここから

$$
\operatorname{rank}A=m
$$

を仮定します。つまり $A$ の $m$ 本の行は一次独立です。

<a id="def-opt10-bfs"></a>
<!-- formal-statement-start -->
> **定義（基底解・基本実行可能解）**  
> $A\in\mathbb R^{m\times n}$ が $\operatorname{rank}A=m$ を満たすとする。
>
> 添字集合
>
> $$
> B\subset\{1,\ldots,n\},
> \qquad
> |B|=m
> $$
>
> を選び、$A$ の $B$ に対応する列からなる正方行列 $A_B$ が可逆であるとする。
>
> $N=\{1,\ldots,n\}\setminus B$ とし、
>
> $$
> x_N=0,
> \qquad
> x_B=A_B^{-1}b
> $$
>
> と定めた $x$ を **基底解**という。
>
> さらに $x_B\ge0$ を満たす基底解を **基本実行可能解**（basic feasible solution; BFS）という。
<!-- formal-statement-end -->

<!-- definition-example-start: def-opt10-bfs -->
**定義の確認**：3変数単体

$$
x_1+x_2+x_3=1,
\qquad
x\ge0
$$

では

$$
A=
\begin{pmatrix}
1&1&1
\end{pmatrix},
\qquad
m=1.
$$

基底は 1 本の非零列を選べばよいので、

$$
B=\{1\},\{2\},\{3\}
$$

の三通りです。

それぞれ

$$
(1,0,0),
\qquad
(0,1,0),
\qquad
(0,0,1)
$$

という基本実行可能解を与えます。これは三角形単体の三つの極点そのものです。
<!-- definition-example-end -->

<a id="thm-opt10-extreme-point-bfs"></a>
<!-- formal-statement-start -->
> **定理（極点と基本実行可能解の同値性）**  
> $A\in\mathbb R^{m\times n}$、$\operatorname{rank}A=m$ とし、
>
> $$
> P=\{x\in\mathbb R^n:Ax=b,\ x\ge0\}.
> $$
>
> このとき $x\in P$ について
>
> $$
> \boxed{
> x\text{ は }P\text{ の極点}
> \iff
> x\text{ は基本実行可能解}
> }
> $$
>
> が成り立つ。
<!-- formal-statement-end -->

### 証明の見取り図

極点なら、正成分に対応する列は一次独立です。その列集合を $m$ 本の基底へ延長すれば、残りの非基底変数はもともと 0 なので、その点自身が基底解になります。

逆に基本実行可能解では、正成分を持つ列は基底列の部分集合です。基底列は一次独立なので、先ほどの極点判定が使えます。

<!-- proof-start -->
### 証明

まず $x$ が極点だとします。

[標準形多面体の極点判定](#thm-opt10-extreme-point-test)より、

$$
\{a_j:j\in I_+(x)\}
$$

は一次独立です。

$\operatorname{rank}A=m$ なので、この一次独立な列族を $A$ の $m$ 本の一次独立な列へ延長できます。その添字集合を $B$ とします。

$I_+(x)\subset B$ です。従って $N=B^c$ では $x_N=0$ です。

また $Ax=b$ より

$$
A_Bx_B=b.
$$

$A_B$ は可逆なので

$$
x_B=A_B^{-1}b.
$$

さらに $x\ge0$ ですから、$x$ は基本実行可能解です。

逆に $x$ が基本実行可能解だとします。ある基底 $B$ に対して

$$
x_N=0
$$

なので

$$
I_+(x)\subset B.
$$

$A_B$ の列は一次独立ですから、その部分族

$$
\{a_j:j\in I_+(x)\}
$$

も一次独立です。

再び[標準形多面体の極点判定](#thm-opt10-extreme-point-test)を使うと、$x$ は極点です。$\square$
<!-- proof-end -->

### 5.1 退化した基本実行可能解

基底変数は $m$ 個ありますが、そのすべてが正とは限りません。

例えば

$$
A=
\begin{pmatrix}
1&1&0\\
0&1&1
\end{pmatrix},
\qquad
b=
\begin{pmatrix}
1\\0
\end{pmatrix}
$$

で基底 $B=\{1,2\}$ を取ると

$$
A_B=
\begin{pmatrix}
1&1\\
0&1
\end{pmatrix},
$$

$$
x_B=
A_B^{-1}b
=
\begin{pmatrix}
1\\0
\end{pmatrix}.
$$

したがって

$$
x=(1,0,0)
$$

は基本実行可能解ですが、基底変数 $x_2$ が 0 です。

このような点を **退化した基本実行可能解**と呼びます。退化は単体法のピボットで重要になりますが、アルゴリズム上の扱いは OPT11 に回します。

---

## 6. なぜ線形目的関数は極点だけ見ればよいのか

「線形計画の最適解は頂点にある」とよく言われます。

ただし、その言い方だけでは不十分です。

- 実行可能集合が有界とは限らない。
- 最適解が複数の辺全体に並ぶこともある。
- 一般の多面体には極点がない場合もある。

標準形では、非負制約を使って「支持する変数の数を減らす」という操作ができます。

<a id="thm-opt10-fundamental"></a>
<!-- formal-statement-start -->
> **定理（線形計画の基本定理）**  
> $A\in\mathbb R^{m\times n}$、$\operatorname{rank}A=m$ とし、
>
> $$
> P=\{x\in\mathbb R^n:Ax=b,\ x\ge0\}
> $$
>
> が非空であるとする。
>
> 線形目的関数 $c^{\mathsf T}x$ が $P$ 上で下に有界なら、標準形線形計画
>
> $$
> \min_{x\in P}c^{\mathsf T}x
> $$
>
> は最適解を持ち、しかも最適解の一つを基本実行可能解、従って極点として取れる。
<!-- formal-statement-end -->

### 証明の見取り図

任意の実行可能点から始めます。

その点が極点でなければ、正成分に対応する列に一次従属関係があります。その従属方向へ、目的関数を増やさない向きを選んで進み、少なくとも一つの正成分を 0 にします。

これを繰り返すと、有限回で極点へ到達します。

さらに基底の候補は有限個しかないため、基本実行可能解の中で目的値最小のものが存在します。それが全実行可能点に対して最適です。

<!-- proof-start -->
### 証明

$x\in P$ を任意に取ります。

$x$ が極点なら、そのまま基本実行可能解です。

$x$ が極点でないとします。[標準形多面体の極点判定](#thm-opt10-extreme-point-test)より、$I_+(x)$ に対応する列は一次従属です。

従って 0 でない $d$ を

$$
Ad=0,
\qquad
d_j=0\quad(j\notin I_+(x))
$$

となるように取れます。

目的関数が下に有界であることを使って、次の条件を同時に満たす向き $\delta\in\{d,-d\}$ を選べます。

$$
c^{\mathsf T}\delta\le0,
$$

かつ $\delta$ は少なくとも一つ負の成分を持つ。

実際、$d$ が正負両方の成分を持つなら、$d$ と $-d$ のどちらにも負成分があるので、目的関数を増やさない方を選べます。

$d\ge0$ の場合、もし $c^{\mathsf T}d<0$ なら

$$
x+td\in P
\qquad(t\ge0)
$$

かつ

$$
c^{\mathsf T}(x+td)\to-\infty
$$

となり、下に有界という仮定に反します。従って $c^{\mathsf T}d\ge0$ であり、$\delta=-d$ を選べます。$d\le0$ の場合も同様です。

そこで

$$
t^*
=
\min_{j:\delta_j<0}
\frac{x_j}{-\delta_j}
$$

と置きます。$\delta_j<0$ なら $j\in I_+(x)$ なので分子は正であり、

$$
t^*>0.
$$

$$
x^+=x+t^*\delta
$$

と置くと

$$
Ax^+
=
Ax+t^*A\delta
=
b
$$

であり、$t^*$ の定義から $x^+\ge0$ です。したがって $x^+\in P$ です。

さらに

$$
c^{\mathsf T}x^+
=
c^{\mathsf T}x+t^*c^{\mathsf T}\delta
\le
c^{\mathsf T}x.
$$

そして $t^*$ を達成する成分では

$$
x_j+t^*\delta_j=0
$$

となるので、正成分の個数が少なくとも一つ減ります。

この操作を繰り返すと、正成分の個数は高々 $n$ 個なので有限回で極点へ到達します。従って任意の実行可能点 $x$ に対し、それ以下の目的値を持つ基本実行可能解が存在します。

基底 $B$ の候補数は有限であり、高々

$$
\binom{n}{m}
$$

個です。従って基本実行可能解も有限個です。その中で目的値最小のものを $\hat x$ とします。

任意の $x\in P$ に対して、ある基本実行可能解 $x_B$ が存在して

$$
c^{\mathsf T}x_B\le c^{\mathsf T}x
$$

です。一方 $\hat x$ は基本実行可能解の中で最小なので

$$
c^{\mathsf T}\hat x
\le
c^{\mathsf T}x_B
\le
c^{\mathsf T}x.
$$

よって $\hat x$ は大域最適解です。$\square$
<!-- proof-end -->

この定理が単体法の理論的出発点です。

$$
\boxed{
\text{連続な無限個の実行可能点}
\quad\longrightarrow\quad
\text{有限個の基底候補}
}
$$

へ候補が圧縮されます。

もちろん、実際に全基底を列挙すると組合せ爆発します。OPT11 では、隣接する基底を効率よく移動します。

---

## 7. 線形計画双対：下界証明書を最大化する

主問題を

$$
\text{(P)}
\qquad
\min c^{\mathsf T}x
\quad\text{subject to}\quad
Ax=b,\ x\ge0
$$

とします。

$y\in\mathbb R^m$ を取り、

$$
A^{\mathsf T}y\le c
$$

を満たすとします。

主問題の任意の実行可能解 $x$ に対し

$$
b^{\mathsf T}y
=
x^{\mathsf T}A^{\mathsf T}y
\le
x^{\mathsf T}c
=
c^{\mathsf T}x.
$$

従って $b^{\mathsf T}y$ は主目的値の下界です。

ならば、その下界をできるだけ大きくしたくなります。

<a id="def-opt10-lp-dual"></a>
<!-- formal-statement-start -->
> **定義（線形計画双対）**  
> 標準形主問題
>
> $$
> \text{(P)}
> \qquad
> \min c^{\mathsf T}x
> \quad\text{subject to}\quad
> Ax=b,\qquad x\ge0
> $$
>
> に対し、
>
> $$
> \boxed{
> \text{(D)}
> \qquad
> \max b^{\mathsf T}y
> \quad\text{subject to}\quad
> A^{\mathsf T}y\le c
> }
> $$
>
> を **双対問題**という。$y\in\mathbb R^m$ 自体には符号制約を課さない。
<!-- formal-statement-end -->

<!-- definition-example-start: def-opt10-lp-dual -->
**定義の確認**：1本の等式から双対を作る

$$
\min 2x_1+x_2
$$

subject to

$$
x_1+x_2=1,
\qquad
x_1,x_2\ge0
$$

を考えます。

ここでは

$$
A=
\begin{pmatrix}
1&1
\end{pmatrix},
\quad
b=1,
\quad
c=
\begin{pmatrix}
2\\1
\end{pmatrix}.
$$

双対変数を $y\in\mathbb R$ とすると

$$
A^{\mathsf T}y
=
\begin{pmatrix}
y\\y
\end{pmatrix}
\le
\begin{pmatrix}
2\\1
\end{pmatrix}.
$$

従って双対問題は

$$
\max y
\quad\text{subject to}\quad
y\le1.
$$

最適値は $y^*=1$ です。

主問題でも $x^*=(0,1)$ で目的値 1 なので、主・双対の最適値は一致しています。
<!-- definition-example-end -->

<a id="thm-opt10-weak-duality"></a>
<!-- formal-statement-start -->
> **定理（線形計画の弱双対性）**  
> 主問題 (P) の実行可能解 $x$ と双対問題 (D) の実行可能解 $y$ に対して
>
> $$
> \boxed{
> b^{\mathsf T}y
> \le
> c^{\mathsf T}x
> }
> $$
>
> が成り立つ。
<!-- formal-statement-end -->

### 証明の見取り図

双対制約の余裕

$$
s=c-A^{\mathsf T}y
$$

は成分ごとに非負です。主変数も $x\ge0$ なので、

$$
x^{\mathsf T}s\ge0
$$

です。これがそのまま双対ギャップです。

<!-- proof-start -->
### 証明

$x$ は主実行可能なので

$$
Ax=b,
\qquad
x\ge0.
$$

$y$ は双対実行可能なので

$$
A^{\mathsf T}y\le c.
$$

従って

$$
c-A^{\mathsf T}y\ge0.
$$

$x\ge0$ との内積を取ると

$$
x^{\mathsf T}(c-A^{\mathsf T}y)\ge0.
$$

左辺を展開して

$$
c^{\mathsf T}x
-
x^{\mathsf T}A^{\mathsf T}y
\ge0.
$$

さらに

$$
x^{\mathsf T}A^{\mathsf T}y
=
(Ax)^{\mathsf T}y
=
b^{\mathsf T}y.
$$

よって

$$
c^{\mathsf T}x-b^{\mathsf T}y\ge0.
$$

すなわち

$$
b^{\mathsf T}y\le c^{\mathsf T}x.
$$

$\square$
<!-- proof-end -->

この証明で重要なのは、$y$ が「候補解」ではなく **下界の証明書**になっていることです。

---

## 8. LP 双対は Lagrange 双対でもある

[OPT5 の Lagrangian](../OPT5/index.md#def-opt5-lagrangian)とつなげます。

主問題

$$
\min_{x\ge0} c^{\mathsf T}x
\quad\text{subject to}\quad
Ax=b
$$

に対し、等式制約を

$$
b-Ax=0
$$

と書いて、$y\in\mathbb R^m$ を乗数とします。

非負制約 $x\ge0$ は最小化する領域として残します。

Lagrangian は

$$
L(x,y)
=
c^{\mathsf T}x
+
y^{\mathsf T}(b-Ax).
$$

整理すると

$$
L(x,y)
=
b^{\mathsf T}y
+
(c-A^{\mathsf T}y)^{\mathsf T}x.
$$

$x\ge0$ 上で下に有界になるためには

$$
c-A^{\mathsf T}y\ge0
$$

が必要です。

この条件を満たすとき

$$
\inf_{x\ge0}L(x,y)
=
b^{\mathsf T}y
$$

です。したがって Lagrange 双対問題は

$$
\max b^{\mathsf T}y
\quad\text{subject to}\quad
A^{\mathsf T}y\le c,
$$

すなわち先ほどの LP 双対そのものです。

ただし、LP の強双対を「Slater 条件が成り立つから」で済ませるのは適切ではありません。退化した LP では狭義可行点が存在しないことがあります。

本章では [OPT2 の Farkas の補題](../OPT2/index.md#thm-opt2-farkas)から直接証明します。

---

## 9. Farkas の補題から強双対を出す

弱双対性からは

$$
d^*\le p^*
$$

しか分かりません。

ここで

$$
p^*
=
\min\{c^{\mathsf T}x:Ax=b,\ x\ge0\}
$$

を主最適値、

$$
d^*
=
\sup\{b^{\mathsf T}y:A^{\mathsf T}y\le c\}
$$

を双対最適値とします。

線形計画では、有限最適値を持つときこの隙間が完全に閉じます。

<a id="thm-opt10-strong-duality"></a>
<!-- formal-statement-start -->
> **定理（線形計画の強双対性）**  
> $A\in\mathbb R^{m\times n}$、$\operatorname{rank}A=m$ とする。標準形主問題
>
> $$
> \text{(P)}
> \qquad
> \min c^{\mathsf T}x
> \quad\text{subject to}\quad
> Ax=b,\qquad x\ge0
> $$
>
> の実行可能集合が非空で、$c^{\mathsf T}x$ が実行可能集合上で下に有界であるとする。
>
> このとき主問題は最適解 $x^*$ を持ち、双対問題
>
> $$
> \text{(D)}
> \qquad
> \max b^{\mathsf T}y
> \quad\text{subject to}\quad
> A^{\mathsf T}y\le c
> $$
>
> も最適解 $y^*$ を持つ。さらに
>
> $$
> \boxed{
> c^{\mathsf T}x^*
> =
> b^{\mathsf T}y^*
> }
> $$
>
> が成り立つ。
<!-- formal-statement-end -->

### 証明の見取り図

[線形計画の基本定理](#thm-opt10-fundamental)で主最適解 $x^*$ は存在します。

残る仕事は、同じ値を達成する双対可行 $y$ を作ることです。

そこで

$$
A^{\mathsf T}y+z=c,
\qquad
b^{\mathsf T}y-r=p^*,
\qquad
z\ge0,
\quad
r\ge0
$$

という連立方程式を考えます。

これが解ければ $A^{\mathsf T}y\le c$ かつ $b^{\mathsf T}y\ge p^*$ です。弱双対性により逆向きの不等式もあるので、等号しか残りません。

この連立方程式が解けないと仮定し、Farkas の補題で証明書を出すと、

- 主問題の $p^*$ より小さい実行可能解ができるか、
- 目的関数を $-\infty$ へ下げる実行可能方向ができるか、

のどちらかになります。どちらも仮定に反します。

<!-- proof-start -->
### 証明

[線形計画の基本定理](#thm-opt10-fundamental)より、主問題には最適解 $x^*$ が存在します。

$$
p^*=c^{\mathsf T}x^*
$$

と置きます。

双対可行解 $y$ で $b^{\mathsf T}y=p^*$ を満たすものが存在することを示します。

$y$ は自由変数なので

$$
y=y^+-y^-,
\qquad
y^+,y^-\ge0
$$

と分解します。

さらに双対余裕 $z\ge0$ とスカラー $r\ge0$ を導入して、未知変数

$$
u=
\begin{pmatrix}
y^+\\
y^-\\
z\\
r
\end{pmatrix}
\ge0
$$

に対する方程式

$$
Mu=d
$$

を考えます。ただし

$$
M=
\begin{pmatrix}
A^{\mathsf T}&-A^{\mathsf T}&I&0\\
b^{\mathsf T}&-b^{\mathsf T}&0&-1
\end{pmatrix},
$$

$$
d=
\begin{pmatrix}
c\\
p^*
\end{pmatrix}.
$$

この方程式が解けるなら

$$
A^{\mathsf T}(y^+-y^-)+z=c,
$$

$$
b^{\mathsf T}(y^+-y^-)-r=p^*.
$$

$y=y^+-y^-$ と置けば

$$
A^{\mathsf T}y
=
c-z
\le c,
$$

なので $y$ は双対可行です。また

$$
b^{\mathsf T}y
=
p^*+r
\ge p^*.
$$

しかし弱双対性より任意の双対可行 $y$ に対して

$$
b^{\mathsf T}y\le p^*
$$

です。従って

$$
r=0,
\qquad
b^{\mathsf T}y=p^*.
$$

よって $Mu=d,\ u\ge0$ が解けることを示せば十分です。

反対に、この非負解が存在しないと仮定します。

[OPT2 の Farkas の補題](../OPT2/index.md#thm-opt2-farkas)を行列 $M$ とベクトル $d$ に適用すると、ある

$$
w=
\begin{pmatrix}
v\\
\alpha
\end{pmatrix}
\in\mathbb R^{n+1}
$$

が存在して

$$
M^{\mathsf T}w\le0,
$$

$$
d^{\mathsf T}w>0
$$

となります。

$M^{\mathsf T}w\le0$ を各変数ブロックに分けます。

$y^+$ の列から

$$
Av+\alpha b\le0.
$$

$y^-$ の列から

$$
-Av-\alpha b\le0.
$$

従って

$$
Av+\alpha b=0.
$$

$z$ の列から

$$
v\le0.
$$

$r$ の列から

$$
-\alpha\le0,
$$

従って

$$
\alpha\ge0.
$$

また

$$
d^{\mathsf T}w
=
c^{\mathsf T}v+\alpha p^*
>0.
$$

ここで

$$
q=-v
$$

と置くと

$$
q\ge0,
$$

$$
Aq=\alpha b,
$$

そして

$$
c^{\mathsf T}q<\alpha p^*.
$$

まず $\alpha>0$ とします。

$$
\bar x=\frac{q}{\alpha}
$$

と置けば

$$
\bar x\ge0,
$$

$$
A\bar x=b.
$$

従って $\bar x$ は主実行可能です。

しかし

$$
c^{\mathsf T}\bar x
=
\frac{c^{\mathsf T}q}{\alpha}
<
p^*,
$$

となり、$p^*$ の最適性に反します。

次に $\alpha=0$ とします。

このとき

$$
Aq=0,
\qquad
q\ge0,
$$

かつ

$$
c^{\mathsf T}q<0.
$$

$q\ne0$ です。

任意の $t\ge0$ に対して

$$
x^*+tq\ge0,
$$

$$
A(x^*+tq)
=
b+tAq
=
b.
$$

従って $x^*+tq$ は主実行可能です。

ところが

$$
c^{\mathsf T}(x^*+tq)
=
p^*+t\,c^{\mathsf T}q
\to-\infty
\qquad(t\to\infty),
$$

となり、目的関数が下に有界という仮定に反します。

どちらの場合も矛盾です。

従って $Mu=d,\ u\ge0$ は解を持ち、前半の議論から双対最適解 $y^*$ が存在して

$$
b^{\mathsf T}y^*
=
p^*
=
c^{\mathsf T}x^*.
$$

$\square$
<!-- proof-end -->

この証明で Farkas の補題が担った役割は、

$$
\boxed{
\text{双対証明書が存在しない}
\Longrightarrow
\text{主問題側の反証明書が存在する}
}
$$

という二者択一です。

LP 双対は、分離定理の幾何を最適値へ変換したものだと読めます。

---

## 10. 相補性：双対ギャップを成分ごとに 0 にする

主実行可能 $x$ と双対実行可能 $y$ に対し、双対余裕を

$$
s=c-A^{\mathsf T}y
$$

と置きます。

すると

$$
s\ge0.
$$

弱双対性の証明をもう一度書くと

$$
c^{\mathsf T}x-b^{\mathsf T}y
=
x^{\mathsf T}s.
$$

成分ごとには

$$
x^{\mathsf T}s
=
\sum_{j=1}^n x_js_j.
$$

$x_j,s_j\ge0$ なので、総和が 0 になるためには各項が 0 でなければなりません。

<a id="thm-opt10-complementary-slackness"></a>
<!-- formal-statement-start -->
> **定理（相補性と最適性）**  
> 標準形主問題 (P) とその双対 (D) を考える。$x$ を主実行可能解、$y$ を双対実行可能解とし、
>
> $$
> s=c-A^{\mathsf T}y\ge0
> $$
>
> と置く。
>
> このとき、$x$ と $y$ がそれぞれ主問題・双対問題の最適解であることと
>
> $$
> \boxed{
> x_js_j=0
> \qquad
> (j=1,\ldots,n)
> }
> $$
>
> は同値である。
<!-- formal-statement-end -->

### 証明の見取り図

相補性が成り立てば

$$
c^{\mathsf T}x-b^{\mathsf T}y
=
\sum_jx_js_j
=
0
$$

です。主実行可能値と双対実行可能値が一致した時点で、弱双対性により両方が最適です。

逆向きでは、LP 強双対により最適な主・双対目的値が一致します。非負項の総和が 0 なので、各項も 0 です。

<!-- proof-start -->
### 証明

まず

$$
x_js_j=0
\qquad(j=1,\ldots,n)
$$

とします。

すると

$$
c^{\mathsf T}x-b^{\mathsf T}y
=
x^{\mathsf T}(c-A^{\mathsf T}y)
=
x^{\mathsf T}s
=
\sum_{j=1}^n x_js_j
=
0.
$$

従って

$$
c^{\mathsf T}x=b^{\mathsf T}y.
$$

弱双対性より、任意の主実行可能 $\tilde x$ と双対実行可能 $\tilde y$ に対して

$$
b^{\mathsf T}\tilde y
\le
c^{\mathsf T}x
=
b^{\mathsf T}y
\le
c^{\mathsf T}\tilde x.
$$

よって $x$ は主最適、$y$ は双対最適です。

逆に $x,y$ がそれぞれ最適だとします。

[線形計画の強双対性](#thm-opt10-strong-duality)より

$$
c^{\mathsf T}x=b^{\mathsf T}y.
$$

したがって

$$
0
=
c^{\mathsf T}x-b^{\mathsf T}y
=
\sum_{j=1}^n x_js_j.
$$

各項は

$$
x_js_j\ge0
$$

なので、総和が 0 なら

$$
x_js_j=0
$$

が各 $j$ で成り立ちます。$\square$
<!-- proof-end -->

相補性を言葉で読むと、

$$
\boxed{
x_j>0
\Longrightarrow
a_j^{\mathsf T}y=c_j
}
$$

です。

つまり主問題で実際に使われる変数の双対制約は、最適点でぴったり等号になります。

逆に

$$
a_j^{\mathsf T}y<c_j
$$

という正の双対余裕があるなら

$$
x_j=0
$$

でなければなりません。

---

## 11. 一つの二変数 LP を4つの視点で解く

先ほど標準形へ変換した

$$
\min_{u,v\ge0} 3u+2v
$$

subject to

$$
u+v\ge4,
\qquad
u+2v\ge6
$$

を最後まで解きます。

### 11.1 幾何：極点を調べる

実行可能領域の境界候補は

$$
u+v=4,
$$

$$
u+2v=6,
$$

$$
u=0,
$$

$$
v=0.
$$

2本の制約直線の交点は

$$
u+v=4,
\qquad
u+2v=6
$$

より

$$
v=2,
\qquad
u=2.
$$

従って

$$
(2,2)
$$

で目的値は

$$
3\cdot2+2\cdot2=10.
$$

$v$ 軸上では $u=0$ なので

$$
v\ge4
$$

が必要です。最小候補は

$$
(0,4)
$$

で、目的値は

$$
8.
$$

$u$ 軸上では $v=0$ なので

$$
u\ge6
$$

が必要です。候補

$$
(6,0)
$$

の目的値は

$$
18.
$$

したがって

$$
\boxed{
(u^*,v^*)=(0,4),
\qquad
p^*=8.
}
$$

### 11.2 標準形：基本実行可能解として読む

余剰変数を入れて

$$
u+v-s_1=4,
$$

$$
u+2v-s_2=6,
$$

$$
u,v,s_1,s_2\ge0
$$

です。

最適点では

$$
u=0,
\qquad
v=4,
$$

$$
s_1=0,
\qquad
s_2=2.
$$

従って

$$
x^*
=
\begin{pmatrix}
0\\4\\0\\2
\end{pmatrix}.
$$

正成分に対応する列は

$$
a_2=
\begin{pmatrix}
1\\2
\end{pmatrix},
\qquad
a_4=
\begin{pmatrix}
0\\-1
\end{pmatrix}.
$$

これらは一次独立です。従って $x^*$ は極点であり、基底 $B=\{2,4\}$ に対応する基本実行可能解です。

### 11.3 双対：下界証明書を作る

標準形では

$$
A=
\begin{pmatrix}
1&1&-1&0\\
1&2&0&-1
\end{pmatrix},
\qquad
c=
\begin{pmatrix}
3\\2\\0\\0
\end{pmatrix}.
$$

双対制約

$$
A^{\mathsf T}y\le c
$$

は

$$
y_1+y_2\le3,
$$

$$
y_1+2y_2\le2,
$$

$$
-y_1\le0,
$$

$$
-y_2\le0.
$$

従って

$$
y_1,y_2\ge0.
$$

双対目的関数は

$$
4y_1+6y_2.
$$

$$
y^*=
\begin{pmatrix}
2\\0
\end{pmatrix}
$$

を取ると双対可行で、

$$
b^{\mathsf T}y^*
=
4\cdot2+6\cdot0
=
8.
$$

主実行可能点 $x^*$ も目的値 8 なので、弱双対性だけで両方の最適性が確定します。

### 11.4 相補性：使われる変数と等号制約

双対余裕は

$$
s
=
c-A^{\mathsf T}y^*
=
\begin{pmatrix}
3\\2\\0\\0
\end{pmatrix}
-
\begin{pmatrix}
2\\2\\-2\\0
\end{pmatrix}
=
\begin{pmatrix}
1\\0\\2\\0
\end{pmatrix}.
$$

主解は

$$
x^*
=
\begin{pmatrix}
0\\4\\0\\2
\end{pmatrix}.
$$

成分積は

$$
x_j^*s_j
=
(0,\ 0,\ 0,\ 0).
$$

従って相補性が成り立っています。

主変数ベクトルの第2成分 $v=4$ と第4成分（第2制約の余剰変数）$s_2=2$ が正です。したがって、対応する双対余裕の第2成分と第4成分はどちらも 0 になっています。

---

## 12. Farkas・KKT・LP 双対の役割分担

ここまでの三つの見方を整理します。

### 12.1 実行可能性の証明書として見る

[OPT2 の Farkas の補題](../OPT2/index.md#thm-opt2-farkas)は、

$$
Ax=b,\qquad x\ge0
$$

が解けるか、それが無理なら分離証明書があるか、という **実行可能性の二者択一**を与えます。

### 12.2 LP 双対

LP 双対は、その証明書を目的値の下界へ変換します。

$$
A^{\mathsf T}y\le c
$$

なら

$$
b^{\mathsf T}y
\le
c^{\mathsf T}x
$$

です。

強双対は、最良の下界証明書が実際の最適値まで届くことを言っています。

### 12.3 KKT

[OPT5 の KKT 条件](../OPT5/index.md#thm-opt5-kkt)では、停留条件・主実行可能性・双対実行可能性・相補性が一つの系として現れました。

LP では Hessian も非線形性もなく、KKT の内容が

$$
Ax=b,
\qquad
x\ge0,
$$

$$
A^{\mathsf T}y+s=c,
\qquad
s\ge0,
$$

$$
x_js_j=0
$$

へ純化されます。

この簡潔さが、単体法と主双対内点法の両方を支えます。

---

## 13. 仮定を外すと何が壊れるか

### 13.1 一般の多面体には極点がないことがある

$$
L=\{(t,0):t\in\mathbb R\}
$$

では、任意の点 $x$ と任意の小さな $d\ne0$ に対し

$$
x=\frac12(x+d)+\frac12(x-d)
$$

と書けます。従って極点はありません。

「多面体だから頂点を列挙すればよい」は一般には誤りです。

本章の線形計画の基本定理は、標準形

$$
Ax=b,\qquad x\ge0
$$

の非負構造を使っています。

### 13.2 下に有界でなければ最適基本実行可能解は存在しない

例えば

$$
\min -x
\quad\text{subject to}\quad
x\ge0
$$

では目的値は

$$
-x\to-\infty
$$

なので最適解そのものがありません。

極点 $x=0$ は存在しますが、最適ではありません。

### 13.3 双対可行解があれば主問題は下に有界

双対可行 $y$ が一つでも存在すれば、弱双対性により

$$
c^{\mathsf T}x\ge b^{\mathsf T}y
$$

がすべての主実行可能 $x$ に対して成り立ちます。

従って主問題が $-\infty$ へ発散するなら、双対問題に実行可能解はありません。

この種の実行不能 / 非有界の分類は OPT11 で単体法とともに扱います。

### 13.4 退化は極点と基底の一対一対応を壊す

極点と基本実行可能解は「点として」は一致します。

しかし退化した極点では、同じ点を複数の異なる基底が表すことがあります。

したがって

$$
\boxed{
\text{極点}
\leftrightarrow
\text{基本実行可能解という点}
}
$$

は成り立っても、

$$
\boxed{
\text{極点}
\leftrightarrow
\text{基底}
}
$$

が一対一とは限りません。

これが単体法で巡回を考える理由の一つです。

---

## 14. この章の見取り図

線形計画の構造を一枚にまとめると

$$
\boxed{
\begin{array}{c}
Ax=b,\ x\ge0\\
\downarrow\\
\text{多面体}\\
\downarrow\\
\text{極点}
\iff
\text{正成分の列が一次独立}\\
\downarrow\\
\text{基本実行可能解}\\
\downarrow\\
\text{最適解を極点に取れる}
\end{array}
}
$$

です。

双対側は

$$
\boxed{
A^{\mathsf T}y\le c
\Longrightarrow
b^{\mathsf T}y\le c^{\mathsf T}x
}
$$

という下界証明書から始まり、

$$
\boxed{
\text{Farkas}
\Longrightarrow
p^*=d^*
}
$$

へ進みます。

最後に

$$
\boxed{
c^{\mathsf T}x-b^{\mathsf T}y
=
\sum_j
x_j(c_j-a_j^{\mathsf T}y)
}
$$

を 0 にする条件が相補性です。

---

## 15. 演習 Level A

<a id="ex-opt10-a01"></a>
### OPT10-A01 不等式を標準形へ変換する

- Level: A
- 目安時間: 10分

$$
\min_{x_1,x_2\ge0}
4x_1+x_2
$$

subject to

$$
2x_1+x_2\ge5,
$$

$$
x_1+3x_2\le9
$$

を考える。

1. 余剰変数・スラック変数を導入して標準形へ直せ。
2. 標準形の $A,b,c$ を書け。
3. 点 $(x_1,x_2)=(2,1)$ が元問題で実行可能か判定し、対応する余剰変数・スラック変数を求めよ。

<!-- solution-start -->
#### 詳細解答

第1制約は

$$
2x_1+x_2\ge5
$$

なので余剰変数 $s_1\ge0$ を引いて

$$
2x_1+x_2-s_1=5
$$

とします。

第2制約は

$$
x_1+3x_2\le9
$$

なのでスラック変数 $s_2\ge0$ を加えて

$$
x_1+3x_2+s_2=9
$$

とします。

従って

$$
x=
\begin{pmatrix}
x_1\\x_2\\s_1\\s_2
\end{pmatrix}
\ge0
$$

と置けば

$$
A=
\begin{pmatrix}
2&1&-1&0\\
1&3&0&1
\end{pmatrix},
$$

$$
b=
\begin{pmatrix}
5\\9
\end{pmatrix},
$$

$$
c=
\begin{pmatrix}
4\\1\\0\\0
\end{pmatrix}.
$$

次に

$$
(x_1,x_2)=(2,1)
$$

を代入します。

第1制約では

$$
2\cdot2+1=5
$$

なので

$$
s_1=0.
$$

第2制約では

$$
2+3\cdot1=5
$$

なので

$$
5+s_2=9,
$$

$$
s_2=4.
$$

どちらも非負なので、元の点は実行可能です。

標準形では

$$
\boxed{
x=(2,1,0,4)^{\mathsf T}
}
$$

に対応します。
<!-- solution-end -->

<a id="ex-opt10-a02"></a>
### OPT10-A02 実行可能方向を判定する

- Level: A
- 目安時間: 12分

$$
P=
\{x\in\mathbb R^3:
x_1+x_2+x_3=1,\ x\ge0\}
$$

とし、

$$
x=
\begin{pmatrix}
1/2\\
1/2\\
0
\end{pmatrix}
$$

を取る。

次のベクトルが $x$ における実行可能方向か判定せよ。

$$
d^{(1)}=
\begin{pmatrix}
-1\\1\\0
\end{pmatrix},
\qquad
d^{(2)}=
\begin{pmatrix}
-1\\0\\1
\end{pmatrix},
\qquad
d^{(3)}=
\begin{pmatrix}
1\\0\\-1
\end{pmatrix}.
$$

<!-- solution-start -->
#### 詳細解答

この多面体では

$$
A=
\begin{pmatrix}
1&1&1
\end{pmatrix}.
$$

現在点で 0 の成分は第3成分だけなので

$$
I_0(x)=\{3\}.
$$

[標準形多面体の実行可能方向判定](#thm-opt10-feasible-direction-test)より、必要十分条件は

$$
d_1+d_2+d_3=0,
$$

$$
d_3\ge0
$$

です。

まず

$$
d^{(1)}=(-1,1,0)^{\mathsf T}
$$

では

$$
-1+1+0=0,
\qquad
d_3^{(1)}=0\ge0.
$$

従って実行可能方向です。

次に

$$
d^{(2)}=(-1,0,1)^{\mathsf T}
$$

では

$$
-1+0+1=0,
\qquad
d_3^{(2)}=1\ge0.
$$

従って実行可能方向です。

最後に

$$
d^{(3)}=(1,0,-1)^{\mathsf T}
$$

では

$$
1+0-1=0
$$

ですが

$$
d_3^{(3)}=-1<0.
$$

現在 $x_3=0$ なので、第3成分を負方向へ動かすことはできません。

従って

$$
\boxed{
d^{(1)},d^{(2)}\text{ は実行可能方向},
\qquad
d^{(3)}\text{ は実行可能方向でない}.
}
$$
<!-- solution-end -->

<a id="ex-opt10-a03"></a>
### OPT10-A03 単体の極点と基本実行可能解

- Level: A
- 目安時間: 12分

$$
P=
\{x\in\mathbb R^3:
x_1+x_2+x_3=1,\ x\ge0\}
$$

を考える。

1. すべての基本実行可能解を求めよ。
2. それらが極点であることを確認せよ。
3. 点 $(1/2,1/2,0)$ が極点でないことを、凸結合と列の一次独立性の両方から示せ。

<!-- solution-start -->
#### 詳細解答

ここでは

$$
A=
\begin{pmatrix}
1&1&1
\end{pmatrix},
\qquad
b=1,
$$

で、$m=1$ です。

どの列も $1$ で非零なので、基底は

$$
B=\{1\},
\qquad
B=\{2\},
\qquad
B=\{3\}
$$

の三通りです。

それぞれ非基底変数を 0 にして

$$
x_1=1,
\qquad
x_2=1,
\qquad
x_3=1
$$

を得るので、基本実行可能解は

$$
\boxed{
e_1=(1,0,0),
\quad
e_2=(0,1,0),
\quad
e_3=(0,0,1)
}
$$

です。

[極点と基本実行可能解の同値性](#thm-opt10-extreme-point-bfs)より、これらはすべて極点です。

次に

$$
x=
\left(\frac12,\frac12,0\right)
$$

は

$$
x
=
\frac12e_1+\frac12e_2
$$

と異なる二つの実行可能点の非自明な凸結合で表されるので、極点ではありません。

列による判定では、正成分の添字は

$$
I_+(x)=\{1,2\}.
$$

対応する列は

$$
a_1=1,
\qquad
a_2=1.
$$

$\mathbb R^1$ の中の二つの同じベクトルなので一次従属です。

従って[標準形多面体の極点判定](#thm-opt10-extreme-point-test)からも、$x$ は極点でないと分かります。
<!-- solution-end -->

<a id="ex-opt10-a04"></a>
### OPT10-A04 双対可行解を下界証明書として使う

- Level: A
- 目安時間: 12分

主問題

$$
\min 5x_1+2x_2
$$

subject to

$$
x_1+x_2=3,
\qquad
x_1,x_2\ge0
$$

を考える。

1. 双対問題を書け。
2. 双対最適解を求めよ。
3. 主問題の最適解を求めよ。
4. 双対最適解が主目的値の下界を与え、その下界が最適点で一致することを確認せよ。

<!-- solution-start -->
#### 詳細解答

主問題では

$$
A=
\begin{pmatrix}
1&1
\end{pmatrix},
\qquad
b=3,
\qquad
c=
\begin{pmatrix}
5\\2
\end{pmatrix}.
$$

双対変数を $y\in\mathbb R$ とすると

$$
A^{\mathsf T}y\le c
$$

は

$$
y\le5,
$$

$$
y\le2
$$

です。

従って双対問題は

$$
\max 3y
\quad\text{subject to}\quad
y\le2.
$$

よって

$$
\boxed{
y^*=2,
\qquad
d^*=6.
}
$$

主問題では

$$
x_2=3-x_1,
\qquad
0\le x_1\le3.
$$

目的関数は

$$
5x_1+2(3-x_1)
=
6+3x_1.
$$

従って最小は $x_1=0$ で、

$$
\boxed{
x^*=(0,3),
\qquad
p^*=6.
}
$$

任意の主実行可能 $x$ に対し、弱双対性より

$$
5x_1+2x_2
\ge
3y^*
=
6.
$$

実際、$x^*$ では

$$
5\cdot0+2\cdot3=6
$$

となり、双対の下界 6 と一致します。
<!-- solution-end -->

---

## 16. 演習 Level B

<a id="ex-opt10-b01"></a>
### OPT10-B01 極点判定を定義から再構成する

- Level: B
- 目安時間: 20分

$$
P=
\{x\in\mathbb R^n:Ax=b,\ x\ge0\}
$$

とし、$x\in P$ を取る。

$$
I_+(x)=\{j:x_j>0\}
$$

とする。

1. $\{a_j:j\in I_+(x)\}$ が一次従属なら、$x$ が極点でないことを示せ。
2. $x$ が極点でないなら、$\{a_j:j\in I_+(x)\}$ が一次従属であることを示せ。
3. 「0 成分では、凸結合の両端点も 0 になる」ことが逆向きの証明で必要な理由を説明せよ。

<!-- solution-start -->
#### 詳細解答

### 1. 列が一次従属なら極点でない

一次従属なので、0 でない係数 $d_j$ を用いて

$$
\sum_{j\in I_+(x)}d_ja_j=0
$$

と書けます。

$I_+(x)$ の外では $d_j=0$ と定めれば

$$
Ad=0.
$$

$I_+(x)$ 上では $x_j>0$ なので、十分小さい $\varepsilon>0$ を取れば

$$
x_j\pm\varepsilon d_j\ge0
$$

をすべての $j$ で満たせます。

従って

$$
x^\pm=x\pm\varepsilon d
$$

は

$$
Ax^\pm
=
Ax\pm\varepsilon Ad
=
b
$$

かつ $x^\pm\ge0$ を満たすので実行可能です。

$d\ne0$ だから $x^+\ne x^-$ で、

$$
x=\frac12x^++\frac12x^-.
$$

よって $x$ は極点ではありません。

### 2. 極点でないなら列が一次従属

$x$ が極点でないので、異なる $u,v\in P$ と $0<\theta<1$ が存在して

$$
x=\theta u+(1-\theta)v
$$

と書けます。

$x_j=0$ なら

$$
0=\theta u_j+(1-\theta)v_j.
$$

$u_j,v_j\ge0$ なので

$$
u_j=v_j=0.
$$

したがって

$$
d=u-v
$$

は $I_+(x)$ の外で 0 です。

また

$$
Ad
=
Au-Av
=
b-b
=
0.
$$

$u\ne v$ なので $d\ne0$ です。

従って

$$
\sum_{j\in I_+(x)}d_ja_j=0
$$

は非自明な一次関係であり、列族は一次従属です。

### 3. 0 成分の確認が必要な理由

$Ad=0$ だけでは、$d$ の非零成分が $I_+(x)$ の外へ出ている可能性があります。

極点判定で必要なのは

$$
\{a_j:j\in I_+(x)\}
$$

だけの一次従属です。

$x_j=0$ なら $u_j=v_j=0$ と示すことで、

$$
d_j=u_j-v_j=0
$$

となり、差ベクトル $d$ の支持を $I_+(x)$ の中へ閉じ込められます。

この一段があるため、極点でないことから正成分列の一次従属を結論できます。
<!-- solution-end -->

<a id="ex-opt10-b02"></a>
### OPT10-B02 線形計画の基本定理で支持を減らす

- Level: B
- 目安時間: 25分

$$
P=
\{x\in\mathbb R^4:
x_1+x_2+x_3+x_4=1,\ x\ge0\}
$$

上で

$$
\min c^{\mathsf T}x,
\qquad
c=
\begin{pmatrix}
4\\1\\3\\2
\end{pmatrix}
$$

を考える。

初期点を

$$
x^{(0)}
=
\begin{pmatrix}
1/4\\1/4\\1/4\\1/4
\end{pmatrix}
$$

とする。

1. $x^{(0)}$ が極点でないことを示せ。
2. $Ad=0$ を満たす支持内方向を一つ選び、目的関数を増やさない向きを取れ。
3. 少なくとも一つの正成分が 0 になるまで進めよ。
4. この操作を繰り返し、最適基本実行可能解へ到達せよ。

<!-- solution-start -->
#### 詳細解答

ここでは

$$
A=
\begin{pmatrix}
1&1&1&1
\end{pmatrix}.
$$

$x^{(0)}$ は4成分すべて正です。

正成分に対応する列は

$$
1,1,1,1
$$

の4本なので、$\mathbb R^1$ では明らかに一次従属です。従って $x^{(0)}$ は極点ではありません。

例えば

$$
d=
\begin{pmatrix}
-1\\1\\0\\0
\end{pmatrix}
$$

を取ると

$$
Ad=-1+1=0.
$$

目的関数の方向微分は

$$
c^{\mathsf T}d
=
4(-1)+1(1)
=
-3<0.
$$

従って $d$ の向きへ進めば目的値が減ります。

非負性を保てる最大歩幅は、第1成分が 0 になるまでなので

$$
t^*
=
\frac{1/4}{1}
=
\frac14.
$$

従って

$$
x^{(1)}
=
x^{(0)}+\frac14d
=
\begin{pmatrix}
0\\1/2\\1/4\\1/4
\end{pmatrix}.
$$

目的値は

$$
c^{\mathsf T}x^{(0)}
=
\frac{4+1+3+2}{4}
=
\frac{10}{4}
=
\frac52,
$$

$$
c^{\mathsf T}x^{(1)}
=
\frac12+\frac34+\frac12
=
\frac74
$$

へ減っています。

次に

$$
d^{(1)}
=
\begin{pmatrix}
0\\1\\-1\\0
\end{pmatrix}
$$

を取ると

$$
Ad^{(1)}=0,
$$

$$
c^{\mathsf T}d^{(1)}
=
1-3
=
-2<0.
$$

第3成分が 0 になるまで

$$
t=\frac14
$$

進めると

$$
x^{(2)}
=
\begin{pmatrix}
0\\3/4\\0\\1/4
\end{pmatrix}.
$$

さらに

$$
d^{(2)}
=
\begin{pmatrix}
0\\1\\0\\-1
\end{pmatrix}
$$

では

$$
Ad^{(2)}=0,
$$

$$
c^{\mathsf T}d^{(2)}
=
1-2
=
-1<0.
$$

第4成分が 0 になるまで $t=1/4$ 進めて

$$
x^{(3)}
=
\begin{pmatrix}
0\\1\\0\\0
\end{pmatrix}.
$$

これは基本実行可能解です。

目的値は

$$
c^{\mathsf T}x^{(3)}=1.
$$

単体の基本実行可能解は $e_1,e_2,e_3,e_4$ で、その目的値はそれぞれ

$$
4,\ 1,\ 3,\ 2
$$

なので

$$
\boxed{
x^*=e_2,
\qquad
p^*=1
}
$$

です。

この計算は、証明中の「支持を減らしながら目的値を増やさない」操作を具体的に再現しています。
<!-- solution-end -->

<a id="ex-opt10-b03"></a>
### OPT10-B03 Farkas から強双対を再構成する

- Level: B
- 目安時間: 30分

標準形主問題

$$
\min c^{\mathsf T}x
\quad\text{subject to}\quad
Ax=b,\ x\ge0
$$

が有限最適値 $p^*$ を持つとする。

双対最適解の存在を示すため、

$$
A^{\mathsf T}y+z=c,
$$

$$
b^{\mathsf T}y-r=p^*,
$$

$$
z\ge0,
\qquad
r\ge0
$$

を考える。

1. $y=y^+-y^-$ と分解し、Farkas の補題を適用できる $Mu=d,\ u\ge0$ の形にせよ。
2. この系が実行不能だと仮定したとき、Farkas 証明書 $(v,\alpha)$ が
   $$
   Av+\alpha b=0,\qquad v\le0,\qquad \alpha\ge0
   $$
   を満たすことを導け。
3. $q=-v$ と置き、$\alpha>0$ が $p^*$ の最適性に反することを示せ。
4. $\alpha=0$ が目的関数の下方非有界性を導くことを示せ。
5. 最後に弱双対性を使って $r=0$ を示せ。

<!-- solution-start -->
#### 詳細解答

自由変数 $y$ を

$$
y=y^+-y^-,
\qquad
y^+,y^-\ge0
$$

と分解します。

未知変数を

$$
u=
\begin{pmatrix}
y^+\\y^-\\z\\r
\end{pmatrix}
\ge0
$$

と置けば、

$$
A^{\mathsf T}(y^+-y^-)+z=c,
$$

$$
b^{\mathsf T}(y^+-y^-)-r=p^*
$$

は

$$
Mu=d
$$

と書けます。ただし

$$
M=
\begin{pmatrix}
A^{\mathsf T}&-A^{\mathsf T}&I&0\\
b^{\mathsf T}&-b^{\mathsf T}&0&-1
\end{pmatrix},
$$

$$
d=
\begin{pmatrix}
c\\p^*
\end{pmatrix}.
$$

この非負解が存在しないと仮定します。

[OPT2 の Farkas の補題](../OPT2/index.md#thm-opt2-farkas)より、ある

$$
w=
\begin{pmatrix}
v\\\alpha
\end{pmatrix}
$$

が存在して

$$
M^{\mathsf T}w\le0,
$$

$$
d^{\mathsf T}w>0
$$

です。

$y^+$ の列に対応する不等式は

$$
Av+\alpha b\le0.
$$

$y^-$ の列に対応する不等式は

$$
-Av-\alpha b\le0.
$$

両方を合わせると

$$
Av+\alpha b=0.
$$

$z$ の列から

$$
v\le0.
$$

$r$ の列から

$$
-\alpha\le0,
$$

よって

$$
\alpha\ge0.
$$

さらに

$$
c^{\mathsf T}v+\alpha p^*>0.
$$

$q=-v$ と置けば

$$
q\ge0,
$$

$$
Aq=\alpha b,
$$

$$
c^{\mathsf T}q<\alpha p^*.
$$

$\alpha>0$ なら

$$
\bar x=\frac{q}{\alpha}
$$

と置けます。

すると

$$
A\bar x=b,
\qquad
\bar x\ge0,
$$

なので $\bar x$ は主実行可能です。

一方

$$
c^{\mathsf T}\bar x
=
\frac{c^{\mathsf T}q}{\alpha}
<
p^*,
$$

となり、$p^*$ の最適性に反します。

$\alpha=0$ なら

$$
Aq=0,
\qquad
q\ge0,
\qquad
c^{\mathsf T}q<0.
$$

主最適解 $x^*$ に対して任意の $t\ge0$ で

$$
x^*+tq\ge0,
$$

$$
A(x^*+tq)=b
$$

なので実行可能です。

しかし

$$
c^{\mathsf T}(x^*+tq)
=
p^*+t\,c^{\mathsf T}q
\to-\infty.
$$

これは有限最適値を持つことに反します。

従って $Mu=d,\ u\ge0$ は実行可能です。

したがってある $y,z,r$ が存在して

$$
A^{\mathsf T}y+z=c,
\qquad
z\ge0,
$$

$$
b^{\mathsf T}y-r=p^*,
\qquad
r\ge0.
$$

前者から $y$ は双対実行可能です。後者から

$$
b^{\mathsf T}y=p^*+r\ge p^*.
$$

一方、弱双対性より

$$
b^{\mathsf T}y\le p^*.
$$

従って

$$
\boxed{
r=0,
\qquad
b^{\mathsf T}y=p^*.
}
$$

これで双対最適解の存在と強双対が得られます。
<!-- solution-end -->

---

## 17. 演習 Level C

<a id="ex-opt10-c01"></a>
### OPT10-C01 極点・基底・双対・相補性を一周する

- Level: C
- 目安時間: 45分

線形計画

$$
\min_{u,v\ge0}
3u+2v
$$

subject to

$$
u+v\ge4,
$$

$$
u+2v\ge6
$$

を考える。

1. 余剰変数 $s_1,s_2\ge0$ を導入し、標準形の $A,b,c$ を書け。
2. 元の $(u,v)$ 平面で実行可能領域の極点候補を求め、目的値を比較して主最適解を求めよ。
3. 主最適解に対応する標準形の $x^*$ を求め、その正成分に対応する列が一次独立であることを確認せよ。
4. 双対問題を明示し、双対最適解 $y^*$ を求めよ。
5. 双対余裕
   $$
   s=c-A^{\mathsf T}y^*
   $$
   を求め、相補性
   $$
   x_j^*s_j=0
   $$
   を各成分で確認せよ。
6. $y^*$ だけを先に渡されたと仮定し、それが任意の主実行可能解に対する目的値 8 の下界証明書になることを式で示せ。
7. 「極点」「基本実行可能解」「双対変数」「相補性」が同じ最適解を別方向から説明していることを文章でまとめよ。

<!-- solution-start -->
#### 詳細解答

### 1. 標準形

制約

$$
u+v\ge4
$$

には余剰変数 $s_1\ge0$ を導入して

$$
u+v-s_1=4
$$

とします。

同様に

$$
u+2v-s_2=6.
$$

従って

$$
x=
\begin{pmatrix}
u\\v\\s_1\\s_2
\end{pmatrix}
\ge0,
$$

$$
A=
\begin{pmatrix}
1&1&-1&0\\
1&2&0&-1
\end{pmatrix},
$$

$$
b=
\begin{pmatrix}
4\\6
\end{pmatrix},
$$

$$
c=
\begin{pmatrix}
3\\2\\0\\0
\end{pmatrix}.
$$

### 2. 元の平面で主最適解を求める

2本の境界直線

$$
u+v=4,
$$

$$
u+2v=6
$$

の交点を求めます。

第2式から第1式を引くと

$$
v=2.
$$

従って

$$
u=2.
$$

交点は

$$
(2,2)
$$

で、目的値は

$$
3\cdot2+2\cdot2=10.
$$

$v$ 軸上では $u=0$ なので

$$
v\ge4
$$

が必要です。端点

$$
(0,4)
$$

の目的値は

$$
8.
$$

$u$ 軸上では $v=0$ なので

$$
u\ge6
$$

が必要です。端点

$$
(6,0)
$$

の目的値は

$$
18.
$$

従って

$$
\boxed{
(u^*,v^*)=(0,4),
\qquad
p^*=8.
}
$$

### 3. 基本実行可能解として確認する

$(u,v)=(0,4)$ を制約へ代入すると

$$
0+4-s_1=4
$$

より

$$
s_1=0.
$$

また

$$
0+8-s_2=6
$$

より

$$
s_2=2.
$$

従って

$$
x^*
=
\begin{pmatrix}
0\\4\\0\\2
\end{pmatrix}.
$$

正成分の添字は

$$
I_+(x^*)=\{2,4\}.
$$

対応する列は

$$
a_2=
\begin{pmatrix}
1\\2
\end{pmatrix},
\qquad
a_4=
\begin{pmatrix}
0\\-1
\end{pmatrix}.
$$

行列

$$
\begin{pmatrix}
1&0\\
2&-1
\end{pmatrix}
$$

の行列式は

$$
-1\ne0
$$

なので、この2本は一次独立です。

従って $x^*$ は極点であり、基底 $B=\{2,4\}$ に対応する基本実行可能解です。

### 4. 双対問題

双対制約

$$
A^{\mathsf T}y\le c
$$

を成分ごとに書きます。

第1列から

$$
y_1+y_2\le3.
$$

第2列から

$$
y_1+2y_2\le2.
$$

第3列から

$$
-y_1\le0,
$$

すなわち

$$
y_1\ge0.
$$

第4列から

$$
-y_2\le0,
$$

すなわち

$$
y_2\ge0.
$$

したがって双対問題は

$$
\max 4y_1+6y_2
$$

subject to

$$
y_1+y_2\le3,
$$

$$
y_1+2y_2\le2,
$$

$$
y_1,y_2\ge0.
$$

第2制約から

$$
y_1+2y_2\le2.
$$

目的関数を

$$
4y_1+6y_2
=
4(y_1+2y_2)-2y_2
$$

と書くと

$$
4y_1+6y_2
\le
8-2y_2
\le8.
$$

$$
y_1=2,
\qquad
y_2=0
$$

なら両双対制約を満たし、目的値 8 を達成します。

従って

$$
\boxed{
y^*=
\begin{pmatrix}
2\\0
\end{pmatrix},
\qquad
d^*=8.
}
$$

### 5. 相補性

まず

$$
A^{\mathsf T}y^*
=
\begin{pmatrix}
1&1\\
1&2\\
-1&0\\
0&-1
\end{pmatrix}
\begin{pmatrix}
2\\0
\end{pmatrix}
=
\begin{pmatrix}
2\\2\\-2\\0
\end{pmatrix}.
$$

したがって双対余裕は

$$
s
=
c-A^{\mathsf T}y^*
=
\begin{pmatrix}
3\\2\\0\\0
\end{pmatrix}
-
\begin{pmatrix}
2\\2\\-2\\0
\end{pmatrix}
=
\begin{pmatrix}
1\\0\\2\\0
\end{pmatrix}.
$$

主解は

$$
x^*
=
\begin{pmatrix}
0\\4\\0\\2
\end{pmatrix}.
$$

成分積は

$$
x_1^*s_1=0\cdot1=0,
$$

$$
x_2^*s_2=4\cdot0=0,
$$

$$
x_3^*s_3=0\cdot2=0,
$$

$$
x_4^*s_4=2\cdot0=0.
$$

よって

$$
\boxed{
x_j^*s_j=0
\quad(j=1,\ldots,4).
}
$$

### 6. $y^*$ を下界証明書として読む

任意の主実行可能 $x$ に対して

$$
Ax=b,
\qquad
x\ge0.
$$

また

$$
A^{\mathsf T}y^*\le c.
$$

従って

$$
b^{\mathsf T}y^*
=
x^{\mathsf T}A^{\mathsf T}y^*
\le
x^{\mathsf T}c
=
c^{\mathsf T}x.
$$

左辺は

$$
b^{\mathsf T}y^*
=
4\cdot2+6\cdot0
=
8.
$$

従って任意の主実行可能解に対して

$$
\boxed{
c^{\mathsf T}x\ge8.
}
$$

一方 $x^*$ は目的値 8 を達成するので、$x^*$ の最適性が証明されます。

### 7. 四つの見方を統合する

- **極点**：線形目的関数の最適解を、実行可能多面体の極点に取れる。
- **基本実行可能解**：極点は、標準形では $m$ 本の一次独立な列を基底として選ぶ線形代数的対象になる。
- **双対変数**：双対可行 $y$ は、すべての主実行可能解に対する目的値の下界を与える証明書になる。
- **相補性**：最適点では、正の主変数に対応する双対制約が等号になり、主・双対の双対ギャップが成分ごとに消える。

この問題では

$$
\boxed{
x^*=(0,4,0,2),
\qquad
y^*=(2,0),
\qquad
p^*=d^*=8
}
$$

という同じ事実を、幾何・基底・双対・相補性の四つの言葉で読んでいます。
<!-- solution-end -->

---

## 18. この章の要点

- 線形計画は、スラック変数・余剰変数・自由変数分解を使って
  $$
  \min c^{\mathsf T}x
  \quad\text{subject to}\quad
  Ax=b,\ x\ge0
  $$
  という標準形へ移せる。
- 多面体は有限個の線形等式・不等式の共通解集合であり、有界な多面体を有界多面体という。
- 標準形多面体で $d$ が実行可能方向であることは
  $$
  Ad=0
  $$
  と、現在 0 の成分で $d_j\ge0$ を満たすことに等しい。
- 標準形多面体の点 $x$ が極点であることは、$x_j>0$ に対応する列 $a_j$ が一次独立であることに等しい。
- $\operatorname{rank}A=m$ なら
  $$
  \boxed{
  \text{極点}
  \iff
  \text{基本実行可能解}
  }
  $$
  である。
- 実行可能で目的関数が下に有界な標準形 LP は、基本実行可能最適解を持つ。
- 標準形主問題
  $$
  \min c^{\mathsf T}x
  \quad
  Ax=b,\ x\ge0
  $$
  の双対は
  $$
  \max b^{\mathsf T}y
  \quad
  A^{\mathsf T}y\le c
  $$
  である。
- 双対可行 $y$ は
  $$
  b^{\mathsf T}y\le c^{\mathsf T}x
  $$
  という主目的値の下界証明書を与える。
- Farkas の補題により、有限最適値を持つ LP では双対証明書が最適値まで到達し、
  $$
  p^*=d^*
  $$
  となる。
- 主・双対可行解が同時に最適であることは
  $$
  x_j(c_j-a_j^{\mathsf T}y)=0
  $$
  という相補性と同値である。

次の OPT11 では、この有限個の基底候補を実際にどう移動するかを扱います。単体法のピボット、退化、実行不能・非有界の判定、対数障壁と中心路、内点法、双対変数の感度解釈へ進みます。
