# OPT12 二次計画・錐計画入門

<!-- definition-example-audit: strict -->

線形計画では目的関数も制約も線形でした。ここでは目的関数に曲率を入れ、

$$
\min_x
\left(
\frac12 x^{\mathsf T}Qx+c^{\mathsf T}x
\right)
$$

を考えます。

二次項が入ると、最適点は必ずしも多面体の極点にはありません。一方で、$Q$ が半正定値なら目的関数は凸であり、[OPT5 の KKT 条件](../OPT5/index.md#thm-opt5-kkt)を使って大域最適性まで判定できます。等式制約だけなら KKT 条件は一つの対称な線形方程式系になり、不等式制約があると「どの制約が最適点で活性になるか」を選ぶ活性集合の視点へつながります。

後半では、Euclid ノルム制約

$$
\|u\|_2\le t
$$

を凸錐への所属条件として扱い、線形計画を自然に拡張する錐最適化へつなげます。

本章の主線は

$$
\boxed{
Q\succeq0
\Longrightarrow
\text{凸二次計画}
\Longrightarrow
\text{KKT 線形系}
\Longrightarrow
\text{活性集合}
\Longrightarrow
\text{錐制約}
}
$$

です。

---

## 1. 二次計画では何が線形計画と変わるのか

$Q\in\mathbb R^{n\times n}$ は対称行列とします。一般の二次形式でも

$$
x^{\mathsf T}Qx
=
x^{\mathsf T}
\left(
\frac{Q+Q^{\mathsf T}}2
\right)
x
$$

なので、二次項については対称部分だけを考えれば十分です。

<a id="def-opt12-quadratic-program"></a>
<!-- formal-statement-start -->
> **定義（二次計画問題・凸二次計画問題）**  
> 対称行列 $Q\in\mathbb R^{n\times n}$、$c\in\mathbb R^n$、行列
> $A\in\mathbb R^{r\times n}$、$G\in\mathbb R^{m\times n}$ とベクトル
> $b\in\mathbb R^r$、$h\in\mathbb R^m$ に対する
>
$$
\boxed{
\min_{x\in\mathbb R^n}
\frac12x^{\mathsf T}Qx+c^{\mathsf T}x
\quad
\text{subject to}
\quad
Ax=b,\qquad Gx\le h
}
$$
>
> を **二次計画問題**という。さらに
>
$$
Q\succeq0
$$
>
> なら、この問題を **凸二次計画問題**という。
<!-- formal-statement-end -->

<!-- definition-example-start: def-opt12-quadratic-program -->
**定義の確認**：楕円状の目的関数を半空間で切る

$$
Q=
\begin{pmatrix}
2&0\\
0&4
\end{pmatrix},
\qquad
c=
\begin{pmatrix}
-2\\-4
\end{pmatrix}
$$

とし、

$$
x_1+x_2\ge1
$$

の下で

$$
\frac12x^{\mathsf T}Qx+c^{\mathsf T}x
=
x_1^2+2x_2^2-2x_1-4x_2
$$

を最小化します。

任意の $z=(z_1,z_2)^{\mathsf T}$ に対して

$$
z^{\mathsf T}Qz
=
2z_1^2+4z_2^2
\ge0
$$

なので $Q\succeq0$ です。制約も半空間で凸です。従ってこれは凸二次計画問題です。
<!-- definition-example-end -->

二次計画で最初に見るべきものは、係数の個数ではなく $Q$ の符号です。

---

## 2. $Q\succeq0$ が凸性を生む

<a id="thm-opt12-quadratic-convexity"></a>
<!-- formal-statement-start -->
> **定理（二次目的関数の凸性と狭義凸性）**  
> 対称行列 $Q\in\mathbb R^{n\times n}$ と $c\in\mathbb R^n$ に対し
>
$$
f(x)=\frac12x^{\mathsf T}Qx+c^{\mathsf T}x
$$
>
> と置く。このとき
>
> 1. $f$ が凸であることと $Q\succeq0$ は同値である。
> 2. $f$ が狭義凸であることと $Q\succ0$ は同値である。
<!-- formal-statement-end -->

### 証明の見取り図

二点 $x,y$ を結ぶ線分上で二次関数を展開すると、凸性からのずれは

$$
\frac12t(1-t)(x-y)^{\mathsf T}Q(x-y)
$$

だけになります。したがって二次形式の符号が、そのまま凸性の符号です。

<!-- proof-start -->
### 証明

$x,y\in\mathbb R^n$、$0<t<1$ とし、

$$
z=(1-t)x+ty
$$

と置きます。

二次項を展開すると

$$
\begin{aligned}
(1-t)f(x)+tf(y)-f(z)
&=
\frac12t(1-t)(x-y)^{\mathsf T}Q(x-y).
\end{aligned}
$$

まず $Q\succeq0$ なら右辺は常に非負なので

$$
f((1-t)x+ty)
\le
(1-t)f(x)+tf(y).
$$

従って $f$ は凸です。

逆に $f$ が凸なら、任意の $d\in\mathbb R^n$ に対し $x=0$、$y=d$、例えば $t=1/2$ とすれば

$$
\frac18d^{\mathsf T}Qd
=
\frac12f(0)+\frac12f(d)-f(d/2)
\ge0.
$$

よって

$$
d^{\mathsf T}Qd\ge0
$$

が任意の $d$ で成り立ち、$Q\succeq0$ です。

同じ恒等式から、$Q\succ0$ なら $x\ne y$ に対して右辺は厳密に正なので $f$ は狭義凸です。

逆に $f$ が狭義凸だとします。すでに凸性から $Q\succeq0$ です。もし $Q\succ0$ でなければ、ある $d\ne0$ が存在して

$$
d^{\mathsf T}Qd=0.
$$

すると $x=0$、$y=d$ に対して上の凸性差が 0 になり、狭義凸性に反します。従って $Q\succ0$ です。

$\square$
<!-- proof-end -->

この定理により、二次計画の「凸かどうか」は行列の半正定値性へ還元されます。

### 2.1 正定値なら最小点は高々一つ

<a id="cor-opt12-pd-unique"></a>
<!-- formal-statement-start -->
> **系（正定値二次目的関数の最小点の一意性）**  
> $Q\succ0$ とし、$C\subset\mathbb R^n$ を凸集合とする。
>
$$
\min_{x\in C}
\frac12x^{\mathsf T}Qx+c^{\mathsf T}x
$$
>
> が最小点を持つなら、その最小点は一意である。
<!-- formal-statement-end -->

これは前定理と [OPT1 の狭義凸関数の最小点の一意性](../OPT1/index.md#thm-opt1-strict-unique)の直接の帰結です。

ただし、$Q\succ0$ は **十分条件であって、制約付き問題における一意性の必要条件ではありません**。後で見るように、$Q$ がある方向に平らでも、その方向を等式制約が禁止すれば最小点は一意になり得ます。

### 2.2 半正定値性を失うと何が壊れるか

$$
Q=
\begin{pmatrix}
1&0\\
0&-1
\end{pmatrix}
$$

なら

$$
f(x_1,x_2)
=
\frac12(x_1^2-x_2^2).
$$

点 $(0,1)$ と $(0,-1)$ では

$$
f(0,\pm1)=-\frac12
$$

ですが、中点 $(0,0)$ では

$$
f(0,0)=0.
$$

従って

$$
f(0,0)
>
\frac12f(0,1)+\frac12f(0,-1),
$$

となり凸性が壊れます。

失った仮定は $Q\succeq0$ です。証明では、凸性差

$$
\frac12t(1-t)(x-y)^{\mathsf T}Q(x-y)
$$

を非負とする箇所が使えなくなっています。この後の KKT 条件も、凸性を失うと「大域最適性の証明書」ではなく単なる停留条件になり得ます。

---

## 3. 等式制約付き二次計画は一つの線形系になる

まず

$$
\min_x
\frac12x^{\mathsf T}Qx+c^{\mathsf T}x
\quad
\text{subject to}
\quad
Ax=b
$$

を考えます。

Lagrangian を

$$
L(x,\nu)
=
\frac12x^{\mathsf T}Qx+c^{\mathsf T}x
+
\nu^{\mathsf T}(Ax-b)
$$

と置くと、停留条件は

$$
Qx+c+A^{\mathsf T}\nu=0.
$$

制約 $Ax=b$ と合わせると、一つのブロック線形方程式になります。

<a id="thm-opt12-equality-kkt"></a>
<!-- formal-statement-start -->
> **定理（等式制約付き凸二次計画の KKT 線形系）**  
> $Q\in\mathbb R^{n\times n}$ を対称半正定値行列、
> $A\in\mathbb R^{r\times n}$ を行フルランク行列とし、実行可能集合
>
$$
\{x\in\mathbb R^n:Ax=b\}
$$
>
> が空でないとする。
>
> 点 $x^*$ が
>
$$
\min_x
\frac12x^{\mathsf T}Qx+c^{\mathsf T}x
\quad
\text{subject to}
\quad
Ax=b
$$
>
> の最適解であることと、ある $\nu^*\in\mathbb R^r$ が存在して
>
$$
\boxed{
\begin{pmatrix}
Q&A^{\mathsf T}\\
A&0
\end{pmatrix}
\begin{pmatrix}
x^*\\
\nu^*
\end{pmatrix}
=
\begin{pmatrix}
-c\\
b
\end{pmatrix}
}
$$
>
> を満たすことは同値である。
<!-- formal-statement-end -->

### 証明の見取り図

必要性では、実行可能な微小変位 $d$ は $Ad=0$ を満たします。最適点では、その全方向に対する一次変化が 0 なので

$$
Qx^*+c
$$

は $\ker A$ に直交します。行フルランクなら

$$
(\ker A)^\perp=\operatorname{range}(A^{\mathsf T})
$$

なので Lagrange 乗数が現れます。

十分性では、任意の実行可能変位 $d$ に対し一次項が消え、残るのは

$$
\frac12d^{\mathsf T}Qd\ge0
$$

だけです。

<!-- proof-start -->
### 証明

まず $x^*$ を最適解とします。

任意の $d\in\ker A$ に対し

$$
A(x^*+td)=b
$$

がすべての $t\in\mathbb R$ で成り立つので、

$$
\phi(t)
=
\frac12(x^*+td)^{\mathsf T}Q(x^*+td)
+c^{\mathsf T}(x^*+td)
$$

は $t=0$ で最小になります。

従って

$$
\phi'(0)
=
d^{\mathsf T}(Qx^*+c)
=
0.
$$

これは $Qx^*+c$ が $\ker A$ の全ベクトルに直交することを意味します。よって

$$
Qx^*+c
\in
(\ker A)^\perp.
$$

有限次元線形代数より

$$
(\ker A)^\perp
=
\operatorname{range}(A^{\mathsf T}).
$$

従って、ある $\nu^*$ が存在して

$$
Qx^*+c=-A^{\mathsf T}\nu^*.
$$

さらに $Ax^*=b$ なので KKT 線形系を満たします。

逆に KKT 線形系を満たす $(x^*,\nu^*)$ があるとします。任意の実行可能点 $x$ に対し

$$
d=x-x^*
$$

と置けば

$$
Ad=0.
$$

二次関数の差を展開すると

$$
\begin{aligned}
f(x)-f(x^*)
&=
d^{\mathsf T}(Qx^*+c)
+
\frac12d^{\mathsf T}Qd\\
&=
-d^{\mathsf T}A^{\mathsf T}\nu^*
+
\frac12d^{\mathsf T}Qd\\
&=
-(Ad)^{\mathsf T}\nu^*
+
\frac12d^{\mathsf T}Qd\\
&=
\frac12d^{\mathsf T}Qd
\ge0.
\end{aligned}
$$

従って $x^*$ は大域最適解です。

$\square$
<!-- proof-end -->

### 3.1 具体例：最短距離の分配

$$
\min_{x_1,x_2}
\frac12(x_1^2+x_2^2)
\quad
\text{subject to}
\quad
x_1+x_2=1
$$

を考えます。

ここでは

$$
Q=I,
\qquad
c=0,
\qquad
A=
\begin{pmatrix}
1&1
\end{pmatrix},
\qquad
b=1.
$$

KKT 線形系は

$$
\begin{pmatrix}
1&0&1\\
0&1&1\\
1&1&0
\end{pmatrix}
\begin{pmatrix}
x_1\\x_2\\\nu
\end{pmatrix}
=
\begin{pmatrix}
0\\0\\1
\end{pmatrix}.
$$

最初の二式から

$$
x_1=-\nu,
\qquad
x_2=-\nu.
$$

制約へ入れると

$$
-2\nu=1,
$$

よって

$$
\boxed{
x_1=x_2=\frac12,
\qquad
\nu=-\frac12.
}
$$

二次計画が、非線形反復なしで一つの線形方程式系に落ちました。

---

## 4. 一意性に本当に必要なのは実行可能方向上の曲率

$Q$ が全空間で正定値でなくても、等式制約が許す方向にだけ正の曲率があれば十分です。

<a id="thm-opt12-nullspace-positive-kkt"></a>
<!-- formal-statement-start -->
> **定理（零空間上の正定値性と KKT 行列の正則性）**  
> 対称行列 $Q\in\mathbb R^{n\times n}$ と行フルランク行列
> $A\in\mathbb R^{r\times n}$ が
>
$$
d^{\mathsf T}Qd>0
\qquad
(\forall d\in\ker A\setminus\{0\})
$$
>
> を満たすとする。このとき KKT 行列
>
$$
\boxed{
K=
\begin{pmatrix}
Q&A^{\mathsf T}\\
A&0
\end{pmatrix}
}
$$
>
> は正則である。
>
> 特に、等式制約付き二次計画の KKT 線形系は高々一つの解 $(x,\nu)$ を持つ。
<!-- formal-statement-end -->

### 証明の見取り図

同次方程式 $K(d,\eta)^{\mathsf T}=0$ を考えます。第2ブロックから $d\in\ker A$。第1ブロックへ左から $d^{\mathsf T}$ を掛けると $d^{\mathsf T}Qd=0$ となり、仮定から $d=0$。残りは $A^{\mathsf T}\eta=0$ で、行フルランク性から $\eta=0$ です。

<!-- proof-start -->
### 証明

$$
\begin{pmatrix}
Q&A^{\mathsf T}\\
A&0
\end{pmatrix}
\begin{pmatrix}
d\\
\eta
\end{pmatrix}
=
0
$$

とします。

第2ブロックから

$$
Ad=0,
$$

すなわち $d\in\ker A$ です。

第1ブロックは

$$
Qd+A^{\mathsf T}\eta=0.
$$

左から $d^{\mathsf T}$ を掛けると

$$
d^{\mathsf T}Qd
+
d^{\mathsf T}A^{\mathsf T}\eta
=
0.
$$

$Ad=0$ なので

$$
d^{\mathsf T}A^{\mathsf T}\eta
=
(Ad)^{\mathsf T}\eta
=
0.
$$

従って

$$
d^{\mathsf T}Qd=0.
$$

零空間上の正定値性から

$$
d=0.
$$

すると第1ブロックは

$$
A^{\mathsf T}\eta=0
$$

となります。$A$ は行フルランクなので $A^{\mathsf T}$ は単射です。従って

$$
\eta=0.
$$

同次方程式の解が零ベクトルだけなので $K$ は正則です。

$\square$
<!-- proof-end -->

ここが「$Q\succ0$ は十分だが必要ではない」の具体化です。制約で消される方向に $Q$ の零曲率があっても問題ありません。

---

## 5. 不等式制約では相補性が活性集合を選ぶ

一般の凸二次計画

$$
\min_x
\frac12x^{\mathsf T}Qx+c^{\mathsf T}x
$$

subject to

$$
Gx\le h,
\qquad
Ax=b
$$

へ戻ります。

$G$ の第 $i$ 行を $g_i^{\mathsf T}$ と書きます。Lagrangian は

$$
L(x,\mu,\nu)
=
\frac12x^{\mathsf T}Qx+c^{\mathsf T}x
+
\mu^{\mathsf T}(Gx-h)
+
\nu^{\mathsf T}(Ax-b)
$$

です。

<a id="thm-opt12-convex-qp-kkt"></a>
<!-- formal-statement-start -->
> **定理（凸二次計画の KKT 条件）**  
> $Q\succeq0$ とし、
>
$$
\min_x
\frac12x^{\mathsf T}Qx+c^{\mathsf T}x
\quad
\text{subject to}
\quad
Gx\le h,\qquad Ax=b
$$
>
> を考える。
>
> 実行可能点 $x^*$ と乗数 $\mu^*\in\mathbb R_+^m$、
> $\nu^*\in\mathbb R^r$ が
>
$$
\boxed{
\begin{aligned}
Qx^*+c+G^{\mathsf T}\mu^*+A^{\mathsf T}\nu^*&=0,\\
Gx^*&\le h,\\
Ax^*&=b,\\
\mu^*&\ge0,\\
\mu_i^*(g_i^{\mathsf T}x^*-h_i)&=0
\quad(i=1,\dots,m)
\end{aligned}
}
$$
>
> を満たすなら、$x^*$ は大域最適解である。
>
> さらに、ある $\bar x$ が存在して
>
$$
A\bar x=b,
\qquad
G\bar x<h
$$
>
> を満たすなら、任意の最適解 $x^*$ に対して上の KKT 条件を満たす乗数が存在する。
<!-- formal-statement-end -->

### 証明の見取り図

十分性では、任意の実行可能点との差 $d=x-x^*$ を取ります。停留条件で一次項を乗数へ変換し、相補性と実行可能性でその項が非負になることを示します。最後に $Q\succeq0$ が二次の残差を非負にします。

逆向きは、目的関数が凸、制約関数がアフィンなので [OPT5 の凸問題の KKT 条件](../OPT5/index.md#thm-opt5-kkt)をそのまま適用できます。ここで $G\bar x<h$ が Slater 条件です。

<!-- proof-start -->
### 証明

まず KKT 条件を満たす $(x^*,\mu^*,\nu^*)$ があるとします。

任意の実行可能点 $x$ に対し

$$
d=x-x^*
$$

と置きます。

二次関数の差は

$$
f(x)-f(x^*)
=
d^{\mathsf T}(Qx^*+c)
+
\frac12d^{\mathsf T}Qd.
$$

停留条件から

$$
Qx^*+c
=
-G^{\mathsf T}\mu^*
-A^{\mathsf T}\nu^*.
$$

従って

$$
\begin{aligned}
f(x)-f(x^*)
&=
-(\mu^*)^{\mathsf T}Gd
-(\nu^*)^{\mathsf T}Ad
+
\frac12d^{\mathsf T}Qd.
\end{aligned}
$$

両点とも $Ax=b$ を満たすので

$$
Ad=0.
$$

また相補性から

$$
(\mu^*)^{\mathsf T}(Gx^*-h)=0,
$$

したがって

$$
(\mu^*)^{\mathsf T}Gx^*
=
(\mu^*)^{\mathsf T}h.
$$

一方、$x$ は実行可能で $\mu^*\ge0$ だから

$$
(\mu^*)^{\mathsf T}Gx
\le
(\mu^*)^{\mathsf T}h.
$$

よって

$$
-(\mu^*)^{\mathsf T}Gd
=
(\mu^*)^{\mathsf T}(Gx^*-Gx)
\ge0.
$$

さらに $Q\succeq0$ なので

$$
\frac12d^{\mathsf T}Qd\ge0.
$$

以上より

$$
f(x)-f(x^*)\ge0.
$$

従って $x^*$ は大域最適解です。

逆向きでは、[二次目的関数の凸性と狭義凸性](#thm-opt12-quadratic-convexity)から目的関数は凸です。不等式制約

$$
g_i^{\mathsf T}x-h_i\le0
$$

はアフィンなので凸であり、等式制約もアフィンです。仮定した $\bar x$ は Slater 点です。

従って [OPT5 の KKT 定理](../OPT5/index.md#thm-opt5-kkt)から、任意の最適解に対して必要な乗数が存在します。

$\square$
<!-- proof-end -->

### 5.1 具体例：一つの活性制約

$$
\min_{x_1,x_2}
\frac12(x_1^2+x_2^2)
$$

subject to

$$
x_1+x_2\ge2
$$

を考えます。

不等式を

$$
2-x_1-x_2\le0
$$

と書き、乗数を $\mu\ge0$ とします。

停留条件は

$$
x_1-\mu=0,
\qquad
x_2-\mu=0.
$$

もし制約が非活性なら $\mu=0$ で $x=(0,0)$ ですが、これは実行不能です。従って制約は活性で

$$
x_1+x_2=2.
$$

停留条件と合わせると

$$
2\mu=2,
$$

したがって

$$
\boxed{
x^*=(1,1),
\qquad
\mu^*=1.
}
$$

です。

相補性は、「どの制約を等式として解くべきか」を乗数と同時に選んでいます。

---

## 6. 活性集合を固定すると、また KKT 線形系になる

[OPT5 の活性制約](../OPT5/index.md#def-opt5-active-constraint)に従い、点 $x$ で等号になっている不等式制約の添字集合を考えます。

候補集合 $I\subset\{1,\dots,m\}$ が最適点の活性集合だと仮定すると、

$$
G_Ix=h_I
$$

を等式として扱えます。

その候補に対する KKT 線形系は

$$
\boxed{
\begin{pmatrix}
Q&A^{\mathsf T}&G_I^{\mathsf T}\\
A&0&0\\
G_I&0&0
\end{pmatrix}
\begin{pmatrix}
x\\
\nu\\
\mu_I
\end{pmatrix}
=
\begin{pmatrix}
-c\\
b\\
h_I
\end{pmatrix}.
}
$$

ただし、これを解いただけではまだ最適解とは限りません。

候補が正しいためには

$$
\mu_I\ge0
$$

に加えて、非活性と仮定した制約について

$$
G_jx<h_j
\qquad(j\notin I)
$$

を確認する必要があります。等号が出たなら、その制約も活性集合に加える候補です。

<a id="prop-opt12-active-set-kkt"></a>
<!-- formal-statement-start -->
> **命題（固定活性集合からの KKT 候補判定）**  
> $Q\succeq0$ の凸二次計画に対し、添字集合 $I$ を固定する。
> 上の固定活性集合 KKT 線形系の解 $(x,\nu,\mu_I)$ が存在し、
>
$$
\mu_I\ge0,
\qquad
G_jx\le h_j\quad(j\notin I)
$$
>
> を満たすとする。非活性側の乗数を
>
$$
\mu_j=0\quad(j\notin I)
$$
>
> と置けば、$(x,\mu,\nu)$ は元の二次計画の KKT 条件を満たす。
> 従って $x$ は大域最適解である。
<!-- formal-statement-end -->

### 証明の見取り図

固定活性集合の線形系は、停留条件、等式制約、$I$ 上の活性制約をすでに満たします。残るのは乗数の符号、非活性側の実行可能性、相補性だけです。非活性側の乗数を 0 と置けば相補性が自動的に成立します。

<!-- proof-start -->
### 証明

固定活性集合の KKT 線形系から

$$
Qx+c+A^{\mathsf T}\nu+G_I^{\mathsf T}\mu_I=0,
$$

$$
Ax=b,
$$

$$
G_Ix=h_I
$$

です。

$j\notin I$ に対して $\mu_j=0$ と置けば、停留条件は全制約を並べた形

$$
Qx+c+A^{\mathsf T}\nu+G^{\mathsf T}\mu=0
$$

になります。

仮定から $\mu_I\ge0$ であり、非活性側は 0 なので

$$
\mu\ge0.
$$

また $I$ 上では $G_Ix=h_I$、それ以外では仮定から $G_jx\le h_j$ なので主実行可能です。

相補性は、$i\in I$ では

$$
g_i^{\mathsf T}x-h_i=0,
$$

$j\notin I$ では

$$
\mu_j=0
$$

なので、すべての成分で

$$
\mu_i(g_i^{\mathsf T}x-h_i)=0
$$

が成り立ちます。

従って前節の KKT 条件を満たし、$x$ は大域最適解です。

$\square$
<!-- proof-end -->

これは活性集合を推定しては KKT 線形系を解き直す active-set 法の基本構造です。

線形計画の単体法も境界上の制約集合を組み替えて進みましたが、二次計画では目的関数に曲率があるため、最適点が必ず多面体の極点に来るわけではありません。共通しているのは「現在どの制約が支配的かを更新する」という視点です。

---

## 7. 二次錐：ノルム不等式を一つの凸錐として読む

<a id="def-opt12-second-order-cone"></a>
<!-- formal-statement-start -->
> **定義（二次錐）**  
> $m\ge1$ とする。
>
$$
\boxed{
\mathcal Q_{m+1}
=
\left\{
(t,u)\in\mathbb R\times\mathbb R^m:
\|u\|_2\le t
\right\}
}
$$
>
> を **二次錐**という。Lorentz cone とも呼ばれる。
<!-- formal-statement-end -->

<!-- definition-example-start: def-opt12-second-order-cone -->
**定義の確認**：$3$-$4$-$5$ の境界点

$$
(t,u)=(5,(3,4))
$$

では

$$
\|u\|_2
=
\sqrt{3^2+4^2}
=
5=t
$$

なので

$$
(5,3,4)\in\mathcal Q_3.
$$

一方

$$
(4,3,4)\notin\mathcal Q_3
$$

です。右辺 $t$ は単に非負であればよいのではなく、ベクトル部分の Euclid ノルム以上でなければなりません。
<!-- definition-example-end -->

二次錐は、円錐のような図を持つから重要なのではありません。双対を取っても同じ錐に戻るため、錐制約と双対性を非常に扱いやすい形で結びます。

<a id="thm-opt12-soc-self-dual"></a>
<!-- formal-statement-start -->
> **定理（二次錐の閉凸性と自己双対性）**  
> Euclid 内積に関する双対錐を
>
$$
K^*
=
\{y:\langle y,x\rangle\ge0\ \text{for all }x\in K\}
$$
>
> とする。このとき二次錐 $\mathcal Q_{m+1}$ は閉凸錐であり、
>
$$
\boxed{
\mathcal Q_{m+1}^*
=
\mathcal Q_{m+1}
}
$$
>
> が成り立つ。
<!-- formal-statement-end -->

### 証明の見取り図

凸性はノルムの三角不等式から出ます。自己双対性の一方向は Cauchy--Schwarz の不等式で内積を下から評価します。逆方向では、錐の外の点に対して、その点との内積が負になる境界ベクトルを一つ具体的に作ります。

<!-- proof-start -->
### 証明

まず $\mathcal Q_{m+1}$ が錐であることを確認します。

$(t,u)\in\mathcal Q_{m+1}$、$\alpha\ge0$ なら

$$
\|\alpha u\|_2
=
\alpha\|u\|_2
\le
\alpha t,
$$

なので

$$
(\alpha t,\alpha u)\in\mathcal Q_{m+1}.
$$

次に凸性を示します。

$(t_1,u_1),(t_2,u_2)\in\mathcal Q_{m+1}$、$0\le\theta\le1$ とすると、三角不等式から

$$
\begin{aligned}
\|\theta u_1+(1-\theta)u_2\|_2
&\le
\theta\|u_1\|_2+(1-\theta)\|u_2\|_2\\
&\le
\theta t_1+(1-\theta)t_2.
\end{aligned}
$$

従って凸です。

写像

$$
(t,u)\mapsto \|u\|_2-t
$$

は連続であり、

$$
\mathcal Q_{m+1}
=
\{(t,u):\|u\|_2-t\le0\}
$$

なので閉集合です。

次に自己双対性を示します。

$(s,v),(t,u)\in\mathcal Q_{m+1}$ とします。[Cauchy--Schwarz の不等式](../F0_00E2_Cauchy_Schwarz_Bessel_Parseval/index.md#thm-f0-00e2-cauchy-schwarz)より

$$
v^{\mathsf T}u
\ge
-\|v\|_2\|u\|_2.
$$

従って

$$
\begin{aligned}
\langle(s,v),(t,u)\rangle
&=
st+v^{\mathsf T}u\\
&\ge
st-\|v\|_2\|u\|_2\\
&\ge
st-st\\
&=0.
\end{aligned}
$$

よって

$$
\mathcal Q_{m+1}
\subset
\mathcal Q_{m+1}^*.
$$

逆に $(s,v)\notin\mathcal Q_{m+1}$ とします。

$v\ne0$ なら

$$
x=
\left(
1,-\frac{v}{\|v\|_2}
\right)
$$

と置きます。ベクトル部分のノルムは 1 なので

$$
x\in\mathcal Q_{m+1}.
$$

しかし $(s,v)\notin\mathcal Q_{m+1}$ だから

$$
s<\|v\|_2,
$$

従って

$$
\langle(s,v),x\rangle
=
s-\|v\|_2
<0.
$$

よって $(s,v)$ は双対錐に入りません。

$v=0$ の場合、錐の外にあることから $s<0$ です。このとき

$$
x=(1,0)\in\mathcal Q_{m+1}
$$

に対して

$$
\langle(s,0),x\rangle=s<0.
$$

従ってやはり $(s,0)$ は双対錐に入りません。

以上から

$$
\mathcal Q_{m+1}^*
\subset
\mathcal Q_{m+1}.
$$

従って

$$
\mathcal Q_{m+1}^*
=
\mathcal Q_{m+1}.
$$

$\square$
<!-- proof-end -->

この定理は [OPT6A の錐制約](../OPT6A/index.md#def-opt6a-cone-constraint)を、具体的で計算可能な錐へ落としたものです。

---

## 8. 二次錐計画は「線形写像が二次錐へ入る」という問題

<a id="def-opt12-socp"></a>
<!-- formal-statement-start -->
> **定義（二次錐計画）**  
> 変数 $x\in\mathbb R^n$ に対し
>
$$
\boxed{
\min_x c^{\mathsf T}x
}
$$
>
> subject to
>
$$
\|A_i x+b_i\|_2
\le
d_i^{\mathsf T}x+e_i
\qquad(i=1,\dots,k),
$$
>
$$
Fx=g
$$
>
> という形の凸最適化問題を **二次錐計画**という。
>
> 各ノルム制約は
>
$$
\left(
d_i^{\mathsf T}x+e_i,\,
A_i x+b_i
\right)
\in
\mathcal Q
$$
>
> という二次錐制約と同値である。
<!-- formal-statement-end -->

<!-- definition-example-start: def-opt12-socp -->
**定義の確認**：点から直線までの距離

$$
\min_{x_1,x_2,t} t
$$

subject to

$$
\left\|
\begin{pmatrix}
x_1-1\\
x_2-1
\end{pmatrix}
\right\|_2
\le t,
$$

$$
x_1+x_2=0
$$

を考えます。

第1制約は

$$
\left(
t,
\begin{pmatrix}
x_1-1\\
x_2-1
\end{pmatrix}
\right)
\in
\mathcal Q_3
$$

なので二次錐制約です。目的関数と第2制約は線形です。従ってこれは二次錐計画です。
<!-- definition-example-end -->

この例は「ノルムを最小化する」という非線形に見える問題を、補助変数 $t$ を使って線形目的関数と錐制約へ移したものです。

[OPT6A](../OPT6A/index.md) で学んだ一般化 KKT は、このような錐制約にも適用できます。本章では二次錐そのものの幾何と標準形までを扱い、一般錐に対する Robinson 制約想定や乗数理論は OPT6A の結果を使います。

---

## 9. hard-margin SVM は半正定値二次計画になる

二次計画が機械学習へ直接つながる代表例が最大マージン分類です。

データ

$$
(x_i,y_i),
\qquad
x_i\in\mathbb R^p,
\qquad
y_i\in\{-1,1\}
$$

に対して、hard-margin SVM の主問題は

$$
\boxed{
\min_{w,b}
\frac12\|w\|_2^2
\quad
\text{subject to}
\quad
y_i(w^{\mathsf T}x_i+b)\ge1
}
$$

です。

変数を

$$
z=
\begin{pmatrix}
w\\b
\end{pmatrix}
$$

とまとめると、二次項の行列は

$$
Q=
\begin{pmatrix}
I_p&0\\
0&0
\end{pmatrix}.
$$

従って

$$
Q\succeq0
$$

ですが、$b$ 方向には零固有値があるため

$$
Q\not\succ0.
$$

ここは重要です。

$$
\boxed{
\text{SVM の主問題は凸 QP だが、変数 }(w,b)\text{ 全体では目的関数は狭義凸とは限らない}
}
$$

それでも KKT 条件は大域最適性の判定に使えます。さらに、制約とデータ配置によって $b$ まで一意に決まる場合があります。

後続の RKHS・SVM 系列では、この QP に Lagrange 双対と KKT 条件を適用し、双対変数、support vector、kernel 表現へ進みます。

---

## 10. 凸性を失うと KKT は大域最適性を保証しない

最後に、なぜ本章で何度も $Q\succeq0$ を確認したのかを反例で見ます。

$$
\min_{-1\le x\le1}
-\frac12x^2
$$

を考えます。

$x=0$ は区間の内部なので、両方の不等式制約は非活性です。目的関数の微分は

$$
f'(0)=0
$$

です。従って乗数を 0 と置けば KKT の形は満たします。

しかし

$$
f(0)=0,
\qquad
f(\pm1)=-\frac12.
$$

したがって $x=0$ は最小点ではなく、むしろ最大点です。

ここで失った仮定は

$$
Q\succeq0
$$

です。この例では $Q=-1$ です。

凸 QP の KKT 十分性の証明では、最後に

$$
\frac12d^{\mathsf T}Qd\ge0
$$

を使いました。この非負性がなくなると、停留条件と相補性だけでは二次の下降方向を排除できません。

---

## 11. 演習 Level A

<a id="ex-opt12-a01"></a>
### OPT12-A01 二次形式から凸性と最小点を読む

- Level: A
- 目安時間: 15分

$$
Q=
\begin{pmatrix}
2&1\\
1&2
\end{pmatrix},
\qquad
c=
\begin{pmatrix}
-3\\-3
\end{pmatrix}
$$

とする。

1. $Q$ の固有値を求め、$Q\succ0$ を確認せよ。
2. 
   $$
   f(x)=\frac12x^{\mathsf T}Qx+c^{\mathsf T}x
   $$
   が狭義凸であることを示せ。
3. 無制約最小点を求め、一意性を説明せよ。

<!-- solution-start -->
#### 詳細解答

特性多項式は

$$
\det(Q-\lambda I)
=
(2-\lambda)^2-1
=
(\lambda-1)(\lambda-3).
$$

従って固有値は

$$
1,\qquad3.
$$

どちらも正なので

$$
Q\succ0.
$$

本文の二次目的関数の凸性定理から $f$ は狭義凸です。

無制約最小点では

$$
\nabla f(x)
=
Qx+c
=
0.
$$

したがって

$$
\begin{pmatrix}
2&1\\
1&2
\end{pmatrix}
\begin{pmatrix}
x_1\\x_2
\end{pmatrix}
=
\begin{pmatrix}
3\\3
\end{pmatrix}.
$$

2式の差から

$$
x_1=x_2.
$$

これを代入すると

$$
3x_1=3,
$$

よって

$$
x_1=x_2=1.
$$

従って

$$
\boxed{x^*=(1,1).}
$$

$f$ は狭義凸なので、この停留点は一意な大域最小点です。
<!-- solution-end -->

<a id="ex-opt12-a02"></a>
### OPT12-A02 等式制約 KKT 線形系を解く

- Level: A
- 目安時間: 15分

$$
\min_{x_1,x_2}
\left(
\frac12x_1^2+x_2^2
\right)
$$

subject to

$$
x_1+x_2=3
$$

を考える。

1. $Q,c,A,b$ を書け。
2. KKT 線形系を書け。
3. 最適解と乗数を求めよ。

<!-- solution-start -->
#### 詳細解答

目的関数は

$$
\frac12
\begin{pmatrix}
x_1&x_2
\end{pmatrix}
\begin{pmatrix}
1&0\\
0&2
\end{pmatrix}
\begin{pmatrix}
x_1\\x_2
\end{pmatrix}
$$

なので

$$
Q=
\begin{pmatrix}
1&0\\
0&2
\end{pmatrix},
\qquad
c=0.
$$

また

$$
A=
\begin{pmatrix}
1&1
\end{pmatrix},
\qquad
b=3.
$$

KKT 線形系は

$$
\begin{pmatrix}
1&0&1\\
0&2&1\\
1&1&0
\end{pmatrix}
\begin{pmatrix}
x_1\\x_2\\\nu
\end{pmatrix}
=
\begin{pmatrix}
0\\0\\3
\end{pmatrix}.
$$

最初の二式は

$$
x_1+\nu=0,
$$

$$
2x_2+\nu=0.
$$

従って

$$
x_1=-\nu,
\qquad
x_2=-\frac{\nu}{2}.
$$

等式制約へ代入すると

$$
-\frac32\nu=3,
$$

なので

$$
\nu=-2.
$$

従って

$$
\boxed{
x^*=(2,1),
\qquad
\nu^*=-2.
}
$$

です。

$Q\succ0$ なので目的関数は狭義凸であり、この最適解は一意です。
<!-- solution-end -->

<a id="ex-opt12-a03"></a>
### OPT12-A03 不等式制約と相補性

- Level: A
- 目安時間: 15分

$$
\min_{x_1,x_2}
\frac12(x_1^2+x_2^2)
$$

subject to

$$
x_1+x_2\ge2
$$

を KKT 条件で解け。

<!-- solution-start -->
#### 詳細解答

制約を

$$
g(x)=2-x_1-x_2\le0
$$

と書きます。乗数を $\mu\ge0$ とすると

$$
L(x,\mu)
=
\frac12(x_1^2+x_2^2)
+
\mu(2-x_1-x_2).
$$

停留条件は

$$
x_1-\mu=0,
$$

$$
x_2-\mu=0.
$$

従って

$$
x_1=x_2=\mu.
$$

相補性は

$$
\mu(2-x_1-x_2)=0.
$$

もし $\mu=0$ なら

$$
x_1=x_2=0
$$

となり、制約 $x_1+x_2\ge2$ に反します。

従って

$$
\mu>0
$$

であり、相補性から制約は活性です。

$$
2-x_1-x_2=0.
$$

$x_1=x_2=\mu$ を代入して

$$
2-2\mu=0,
$$

よって

$$
\mu=1.
$$

したがって

$$
\boxed{
x^*=(1,1),
\qquad
\mu^*=1.
}
$$

です。

$Q=I\succ0$ なので凸 QP であり、KKT 条件を満たしたこの点は一意な大域最小点です。
<!-- solution-end -->

<a id="ex-opt12-a04"></a>
### OPT12-A04 二次錐へ実際に代入する

- Level: A
- 目安時間: 10分

$\mathcal Q_3$ について次を答えよ。

1. $(5,3,4)$ が $\mathcal Q_3$ に属することを確認せよ。
2. $(2,1,1)$ が $\mathcal Q_3$ の内部に属することを確認せよ。
3. 二点の Euclid 内積を計算し、非負であることを確認せよ。
4. 一般の二点 $(s,v),(t,u)\in\mathcal Q_{m+1}$ の内積が非負になる理由を一行で示せ。

<!-- solution-start -->
#### 詳細解答

まず

$$
\sqrt{3^2+4^2}=5
$$

なので

$$
(5,3,4)\in\mathcal Q_3.
$$

しかも等号なので境界上です。

次に

$$
\sqrt{1^2+1^2}
=
\sqrt2
<
2
$$

なので

$$
(2,1,1)
$$

は $\mathcal Q_3$ の内部にあります。

内積は

$$
5\cdot2+3\cdot1+4\cdot1
=
17
>0.
$$

一般には Cauchy--Schwarz の不等式と錐の条件から

$$
\begin{aligned}
st+v^{\mathsf T}u
&\ge
st-\|v\|_2\|u\|_2\\
&\ge
st-st\\
&=0.
\end{aligned}
$$

です。

この評価が

$$
\mathcal Q_{m+1}
\subset
\mathcal Q_{m+1}^*
$$

を与えます。
<!-- solution-end -->

---

## 12. 演習 Level B

<a id="ex-opt12-b01"></a>
### OPT12-B01 $Q$ が特異でも制約付き最小点は一意になり得る

- Level: B
- 目安時間: 25分

$$
Q=
\begin{pmatrix}
0&0\\
0&2
\end{pmatrix},
\qquad
A=
\begin{pmatrix}
1&1
\end{pmatrix}
$$

とし、

$$
\min_{x_1,x_2}
x_2^2
\quad
\text{subject to}
\quad
x_1+x_2=1
$$

を考える。

1. $Q$ が半正定値だが正定値でないことを確認せよ。
2. $\ker A$ を求め、任意の $0\ne d\in\ker A$ に対して $d^{\mathsf T}Qd>0$ を示せ。
3. KKT 行列が正則であることを本文の定理から説明せよ。
4. 最適解を求めよ。

<!-- solution-start -->
#### 詳細解答

任意の $z=(z_1,z_2)^{\mathsf T}$ に対して

$$
z^{\mathsf T}Qz
=
2z_2^2
\ge0.
$$

従って $Q\succeq0$ です。

しかし

$$
e_1=
\begin{pmatrix}
1\\0
\end{pmatrix}
\ne0
$$

に対し

$$
e_1^{\mathsf T}Qe_1=0
$$

なので $Q\not\succ0$ です。

次に

$$
Ad=0
$$

は

$$
d_1+d_2=0
$$

なので

$$
\ker A
=
\left\{
t
\begin{pmatrix}
1\\-1
\end{pmatrix}
:t\in\mathbb R
\right\}.
$$

$0\ne d\in\ker A$ なら $t\ne0$ で

$$
d=
\begin{pmatrix}
t\\-t
\end{pmatrix}.
$$

従って

$$
d^{\mathsf T}Qd
=
2t^2
>0.
$$

よって $Q$ は全空間では正定値でなくても、$\ker A$ 上では正定値です。本文の[零空間上の正定値性と KKT 行列の正則性](#thm-opt12-nullspace-positive-kkt)から KKT 行列は正則です。

直接解くと、制約から

$$
x_1=1-x_2.
$$

目的関数は $x_2^2$ なので

$$
x_2^*=0,
\qquad
x_1^*=1.
$$

従って

$$
\boxed{x^*=(1,0).}
$$

です。

この例では、目的関数が平らな $x_1$ 方向を等式制約が自由方向として許しません。そのため特異な $Q$ でも最小点が一意になります。
<!-- solution-end -->

<a id="ex-opt12-b02"></a>
### OPT12-B02 活性集合を推定して二次計画を解く

- Level: B
- 目安時間: 30分

$$
\min_{x_1,x_2}
\frac12\left[(x_1-2)^2+(x_2-1)^2\right]
$$

subject to

$$
x_1+x_2\le2,
\qquad
x_1\ge0,
\qquad
x_2\ge0
$$

を考える。

1. 無制約最小点を求め、どの制約に違反するか確認せよ。
2. 最適点では $x_1+x_2=2$ が活性で、非負制約は非活性だと仮定して KKT 条件を解け。
3. 得られた乗数の符号と非活性制約の実行可能性を確認し、仮定した活性集合が正しいことを示せ。

<!-- solution-start -->
#### 詳細解答

目的関数は点 $(2,1)$ からの距離の二乗の半分です。従って無制約最小点は

$$
(2,1).
$$

しかし

$$
2+1=3>2
$$

なので制約

$$
x_1+x_2\le2
$$

に違反します。

この制約だけが活性だと仮定し、

$$
g(x)=x_1+x_2-2\le0
$$

に乗数 $\mu\ge0$ を付けます。

Lagrangian は

$$
L
=
\frac12[(x_1-2)^2+(x_2-1)^2]
+
\mu(x_1+x_2-2).
$$

停留条件は

$$
x_1-2+\mu=0,
$$

$$
x_2-1+\mu=0.
$$

従って

$$
x_1=2-\mu,
\qquad
x_2=1-\mu.
$$

活性条件

$$
x_1+x_2=2
$$

を代入すると

$$
3-2\mu=2,
$$

よって

$$
\mu=\frac12.
$$

したがって

$$
\boxed{
x^*=
\left(
\frac32,\frac12
\right),
\qquad
\mu^*=\frac12.
}
$$

です。

乗数は

$$
\mu^*=\frac12\ge0.
$$

また

$$
x_1^*=\frac32>0,
\qquad
x_2^*=\frac12>0
$$

なので、二つの非負制約は確かに非活性です。

従って仮定した活性集合は KKT 条件と整合します。目的関数の Hessian は $I\succ0$ なので、この点は一意な大域最小点です。
<!-- solution-end -->

<a id="ex-opt12-b03"></a>
### OPT12-B03 ノルム最小化を二次錐計画へ直す

- Level: B
- 目安時間: 25分

点 $a=(1,1)$ と直線

$$
H=\{x\in\mathbb R^2:x_1+x_2=0\}
$$

の距離を求めたい。

1. 問題
   $$
   \min_{x\in H}\|x-a\|_2
   $$
   を補助変数 $t$ を使って二次錐計画に書き直せ。
2. $H$ 上の点を一変数で表し、最適点を求めよ。
3. 最適値 $t^*$ を求めよ。
4. 最適解で二次錐制約が境界上にあることを確認せよ。

<!-- solution-start -->
#### 詳細解答

補助変数 $t$ を導入すると

$$
\min_{x_1,x_2,t} t
$$

subject to

$$
\left\|
\begin{pmatrix}
x_1-1\\
x_2-1
\end{pmatrix}
\right\|_2
\le t,
$$

$$
x_1+x_2=0
$$

となります。

第1制約は

$$
\left(
t,
\begin{pmatrix}
x_1-1\\
x_2-1
\end{pmatrix}
\right)
\in\mathcal Q_3
$$

なので二次錐計画です。

直線上では

$$
x_2=-x_1.
$$

$x_1=s$ と置くと

$$
\|x-a\|_2^2
=
(s-1)^2+(-s-1)^2.
$$

展開して

$$
(s-1)^2+(s+1)^2
=
2s^2+2.
$$

これは $s=0$ で最小になります。

従って

$$
x^*=(0,0).
$$

最小距離は

$$
t^*
=
\|(-1,-1)\|_2
=
\sqrt2.
$$

よって

$$
\boxed{
x^*=(0,0),
\qquad
t^*=\sqrt2.
}
$$

です。

最適解では

$$
\left\|
\begin{pmatrix}
-1\\-1
\end{pmatrix}
\right\|_2
=
\sqrt2
=
t^*.
$$

従って二次錐制約は境界上で活性です。

もし不等号が厳密なら $t$ をさらに小さくできるため、距離最小化では最適点で錐制約が境界へ到達することも確認できます。
<!-- solution-end -->

---

## 13. 演習 Level C

<a id="ex-opt12-c01"></a>
### OPT12-C01 hard-margin SVM を QP・KKT として一周する

- Level: C
- 目安時間: 40分

一次元の二点

$$
(x_1,y_1)=(-1,-1),
\qquad
(x_2,y_2)=(1,1)
$$

を hard-margin SVM で分離する。

主問題を

$$
\min_{w,b}\frac12w^2
$$

subject to

$$
y_i(wx_i+b)\ge1
\qquad(i=1,2)
$$

とする。

1. 二つの制約を $w,b$ の線形不等式として書け。
2. 変数 $z=(w,b)^{\mathsf T}$ に対する二次行列 $Q$ を書き、$Q\succeq0$ だが $Q\not\succ0$ であることを確認せよ。
3. 実行可能性だけから $w\ge1$ を導き、主最適解 $(w^*,b^*)$ を求めよ。
4. 二つの制約を
   $
   1-w+b\le0,
   \qquad
   1-w-b\le0
   $$
   と書き、乗数 $\alpha_1,\alpha_2\ge0$ を付けて [KKT 条件](../OPT5/index.md#thm-opt5-kkt)を書け。
5. [KKT 条件](../OPT5/index.md#thm-opt5-kkt)から $\alpha_1^*,\alpha_2^*$ を求めよ。
6. $Q$ が正定値でないのに、この例では $(w,b)$ が一意に決まる理由を説明せよ。

<!-- solution-start -->
#### 詳細解答

第1点では

$$
y_1(wx_1+b)
=
(-1)(-w+b)
=
w-b.
$$

従って

$$
w-b\ge1.
$$

第2点では

$$
y_2(wx_2+b)
=
w+b,
$$

なので

$$
w+b\ge1.
$$

したがって実行可能条件は

$$
w-b\ge1,
\qquad
w+b\ge1.
$$

変数を

$$
z=
\begin{pmatrix}
w\\b
\end{pmatrix}
$$

とすると

$$
\frac12w^2
=
\frac12
z^{\mathsf T}
\begin{pmatrix}
1&0\\
0&0
\end{pmatrix}
z.
$$

従って

$$
Q=
\begin{pmatrix}
1&0\\
0&0
\end{pmatrix}.
$$

任意の $(u,v)$ に対して

$$
\begin{pmatrix}
u&v
\end{pmatrix}
Q
\begin{pmatrix}
u\\v
\end{pmatrix}
=
u^2
\ge0
$$

なので $Q\succeq0$ です。

しかし $(0,1)\ne0$ に対して二次形式は 0 なので

$$
Q\not\succ0.
$$

次に二つの実行可能条件を足すと

$$
2w\ge2,
$$

従って

$$
w\ge1.
$$

目的関数は $w\ge1$ 上で

$$
\frac12w^2
$$

なので、最小にするには

$$
w^*=1.
$$

このとき制約は

$$
1-b\ge1,
$$

$$
1+b\ge1.
$$

すなわち

$$
b\le0,
\qquad
b\ge0.
$$

よって

$$
b^*=0.
$$

従って

$$
\boxed{
(w^*,b^*)=(1,0).
}
$$

です。

[OPT5 の KKT 条件](../OPT5/index.md#thm-opt5-kkt)に沿って条件を書きます。制約を

$$
g_1(w,b)=1-w+b\le0,
$$

$$
g_2(w,b)=1-w-b\le0
$$

とします。

Lagrangian は

$$
L(w,b,\alpha_1,\alpha_2)
=
\frac12w^2
+
\alpha_1(1-w+b)
+
\alpha_2(1-w-b).
$$

停留条件は

$$
\frac{\partial L}{\partial w}
=
w-\alpha_1-\alpha_2
=
0,
$$

$$
\frac{\partial L}{\partial b}
=
\alpha_1-\alpha_2
=
0.
$$

さらに

$$
\alpha_1,\alpha_2\ge0,
$$

$$
1-w+b\le0,
\qquad
1-w-b\le0,
$$

$$
\alpha_1(1-w+b)=0,
$$

$$
\alpha_2(1-w-b)=0
$$

です。

最適点 $(w,b)=(1,0)$ では二つの制約がともに活性です。

停留条件から

$$
\alpha_1=\alpha_2.
$$

また

$$
1-\alpha_1-\alpha_2=0.
$$

従って

$$
2\alpha_1=1,
$$

よって

$$
\boxed{
\alpha_1^*=\alpha_2^*=\frac12.
}
$$

です。

最後に一意性を考えます。

$Q$ は $b$ 方向に曲率を持たないため、目的関数だけを見れば $b$ は決まりません。しかし最小の $w=1$ に到達すると、二つの活性制約が

$$
b\le0,
\qquad
b\ge0
$$

を同時に課し、

$$
b=0
$$

を強制します。

つまり

$$
\boxed{
\text{目的関数の曲率がない方向を、活性制約が固定している}
}
$$

ため、$Q\not\succ0$ でもこの問題の最適解は一意です。

この構造が、後続の SVM で「半正定値 QP・KKT・support vector」を結びつける出発点になります。
<!-- solution-end -->

---

## 14. この章の要点

- 二次計画
  $$
  \min \frac12x^{\mathsf T}Qx+c^{\mathsf T}x
  $$
  では、対称行列 $Q$ の符号が目的関数の曲率を決める。
- 
  $$
  Q\succeq0
  \iff
  \text{二次目的関数は凸},
  $$
  $$
  Q\succ0
  \iff
  \text{二次目的関数は狭義凸}.
  $$
- $Q\succ0$ なら凸実行可能集合上の最小点は高々一つだが、制約付き問題では $Q\succ0$ は一意性の必要条件ではない。
- 等式制約付き凸 QP は
  $$
  \begin{pmatrix}
  Q&A^{\mathsf T}\\
  A&0
  \end{pmatrix}
  \begin{pmatrix}
  x\\\nu
  \end{pmatrix}
  =
  \begin{pmatrix}
  -c\\b
  \end{pmatrix}
  $$
  という KKT 線形系へ落ちる。
- $Q$ が $\ker A$ 上で正定値なら、KKT 行列は正則になる。
- 不等式制約付き凸 QP では、停留条件・主実行可能性・双対実行可能性・相補性を満たす点は大域最適である。Slater 条件があれば最適解から KKT 乗数も得られる。
- 活性集合を固定すると、不等式 QP も等式制約付き KKT 線形系として候補を計算できる。候補後には乗数の非負性と残りの制約の実行可能性を確認する。
- 二次錐
  $$
  \mathcal Q_{m+1}
  =
  \{(t,u):\|u\|_2\le t\}
  $$
  は閉凸錐であり自己双対である。
- 二次錐計画は
  $$
  \|A_ix+b_i\|_2
  \le
  d_i^{\mathsf T}x+e_i
  $$
  を二次錐への所属として扱う凸最適化問題である。
- hard-margin SVM は
  $$
  \min_{w,b}\frac12\|w\|_2^2
  $$
  と線形不等式からなる凸 QP であり、後続の双対・kernel 法へ直接つながる。
