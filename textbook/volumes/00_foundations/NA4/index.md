# NA4 数値解析 IV：多項式補間

離散的なデータ

$$
(x_0,y_0),\dots,(x_n,y_n)
$$

から、そのすべてを通る低次数の多項式を作るのが **多項式補間**です。

「点を全部通る多項式を作る」だけなら代数の問題に見えます。しかし数値解析として重要なのは、その後です。

- 補間多項式は本当に一意か。
- Lagrange 形と Newton 形は、同じ多項式をどう違う形で表すのか。
- 元の関数との誤差は、関数の滑らかさと節点配置にどう分解されるのか。
- 次数を上げれば必ず良くなるのか。
- 節点を等間隔に置くことは、本当に自然なのか。
- データの微小な誤差は、補間結果でどれだけ増幅されるのか。

本章では

~~~text
補間条件
  ↓
存在・一意性
  ↓
Lagrange 基底
  ↓
Lagrange 補間公式
  ↓
分割差分
  ↓
Newton 補間公式
  ↓
Rolle の定理
  ↓
補間誤差公式
  ↓
節点多項式の大きさ
  ↓
Chebyshev 節点
  ↓
Runge 現象・データ感度
~~~

という一本の流れで整理します。

直接の前提は [RA3 微分法・平均値・Taylor](../RA3/index.md) と [NA1 浮動小数点・誤差・条件数・安定性](../NA1/index.md) です。

特に本章では、

- [Rolle の定理](../RA3/index.md#thm-ra3-rolle)
- [絶対誤差・相対誤差](../NA1/index.md#def-na1-absolute-relative-error)
- [前方誤差・後方誤差](../NA1/index.md#def-na1-forward-backward-error)

を既知として使います。

<!-- definition-example-audit: strict -->

---

## 0. 多項式補間とは何を解く問題か

<a id="def-na4-polynomial-interpolation"></a>
<!-- formal-statement-start -->
### 定義（多項式補間問題）

相異なる実数

$$
x_0,\dots,x_n
$$

とデータ

$$
y_0,\dots,y_n
$$

が与えられているとする。

$$
\mathcal P_n
=
\{p:\text{実係数で次数が }n\text{ 以下の多項式}\}
$$

と書く。

$$
p(x_i)=y_i
\qquad
(i=0,\dots,n)
$$

を満たす

$$
p\in\mathcal P_n
$$

を求める問題を **多項式補間問題**といい、その解を **補間多項式**という。$x_i$ を **補間節点**という。
<!-- formal-statement-end -->

<!-- definition-example-start: def-na4-polynomial-interpolation -->
**定義の確認**。節点

$$
x_0=-1,\qquad x_1=0,\qquad x_2=1
$$

に対して

$$
y_0=1,\qquad y_1=0,\qquad y_2=1
$$

とします。

$$
p(x)=x^2
$$

なら

$$
p(-1)=1,\qquad
p(0)=0,\qquad
p(1)=1,
$$

かつ $p\in\mathcal P_2$ なので、これは補間多項式です。

ここで「節点が相異なる」は飾りではありません。もし同じ $x_i$ に異なる値を同時に指定すれば、通常の関数として補間できません。
<!-- definition-example-end -->

---

## 1. 相異なる $n+1$ 点には、次数 $n$ 以下の補間多項式がただ一つある

まず存在と一意性を同時に閉じます。

<a id="def-na4-lagrange-basis"></a>
<!-- formal-statement-start -->
### 定義（Lagrange 基底多項式）

相異なる節点 $x_0,\dots,x_n$ に対し、

$$
\boxed{
\ell_i(x)
=
\prod_{\substack{0\le j\le n\\j\ne i}}
\frac{x-x_j}{x_i-x_j}
}
\qquad
(i=0,\dots,n)
$$

を **Lagrange 基底多項式**という。
<!-- formal-statement-end -->

分母は $x_i\ne x_j$ によって0ではありません。

さらに各節点で

$$
\ell_i(x_k)
=
\begin{cases}
1,&k=i,\\
0,&k\ne i
\end{cases}
$$

となります。Kronecker のデルタを使えば

$$
\ell_i(x_k)=\delta_{ik}
$$

です。

<!-- definition-example-start: def-na4-lagrange-basis -->
**定義の確認**。節点 $-1,0,1$ では

$$
\ell_0(x)
=
\frac{x(x-1)}{(-1-0)(-1-1)}
=
\frac{x(x-1)}2,
$$

$$
\ell_1(x)
=
\frac{(x+1)(x-1)}{(0+1)(0-1)}
=
1-x^2,
$$

$$
\ell_2(x)
=
\frac{(x+1)x}{(1+1)(1-0)}
=
\frac{x(x+1)}2.
$$

例えば

$$
\ell_1(-1)=0,\qquad
\ell_1(0)=1,\qquad
\ell_1(1)=0
$$

であり、「自分の節点で1、他の節点で0」を実際に満たしています。
<!-- definition-example-end -->

<a id="thm-na4-lagrange-interpolation"></a>
<!-- formal-statement-start -->
### 定理（多項式補間の存在一意性と Lagrange 公式）

相異なる実数 $x_0,\dots,x_n$ と実数 $y_0,\dots,y_n$ に対し、

$$
p(x_i)=y_i
\qquad
(i=0,\dots,n)
$$

を満たす $p\in\mathcal P_n$ はただ一つ存在する。

その多項式は

$$
\boxed{
p_n(x)
=
\sum_{i=0}^n y_i\ell_i(x)
}
$$

で与えられる。
<!-- formal-statement-end -->

<!-- proof-start -->
### 証明

**存在**から示します。

Lagrange 基底の定義から

$$
\ell_i\in\mathcal P_n
$$

なので、

$$
p_n(x)
=
\sum_{i=0}^n y_i\ell_i(x)
$$

も $\mathcal P_n$ に属します。

節点 $x_k$ を代入すると

$$
\begin{aligned}
p_n(x_k)
&=
\sum_{i=0}^n y_i\ell_i(x_k)\\
&=
\sum_{i=0}^n y_i\delta_{ik}\\
&=
y_k.
\end{aligned}
$$

したがって補間条件をすべて満たします。

次に **一意性**を示します。

$p,q\in\mathcal P_n$ が同じ補間条件を満たすとします。差

$$
r=p-q
$$

も次数 $n$ 以下の多項式で、

$$
r(x_i)
=
p(x_i)-q(x_i)
=
0
$$

です。

したがって $r$ は相異なる $n+1$ 個の根

$$
x_0,\dots,x_n
$$

を持ちます。

0でない次数 $n$ 以下の多項式が持てる相異なる実根は高々 $n$ 個なので、$r$ は零多項式でなければなりません。

従って

$$
p=q.
$$

よって補間多項式は一意です。

$\square$
<!-- proof-end -->

この一意性は、この章で何度も使います。

別の式を作って「補間条件を満たす次数 $n$ 以下の多項式」であることを示せば、それは自動的に Lagrange 形と同じ多項式です。

---

## 2. Lagrange 形は「各データ値の寄与」を分解して見せる

Lagrange 公式

$$
p_n(x)
=
\sum_{i=0}^n y_i\ell_i(x)
$$

では、データ値 $y_i$ が係数として直接見えます。

### 例：3点から二次補間

$$
(-1,2),\qquad
(0,1),\qquad
(2,5)
$$

を補間します。

Lagrange 基底は

$$
\ell_0(x)
=
\frac{x(x-2)}{(-1)(-3)}
=
\frac{x(x-2)}3,
$$

$$
\ell_1(x)
=
\frac{(x+1)(x-2)}{(1)(-2)}
=
-\frac{(x+1)(x-2)}2,
$$

$$
\ell_2(x)
=
\frac{(x+1)x}{(3)(2)}
=
\frac{x(x+1)}6.
$$

したがって

$$
p_2(x)
=
2\ell_0(x)+\ell_1(x)+5\ell_2(x).
$$

通分して整理すると

$$
p_2(x)
=
x^2+x+1.
$$

実際、

$$
p_2(-1)=2,\qquad
p_2(0)=1,\qquad
p_2(2)=5.
$$

### 「係数を連立方程式で解く」方法との違い

もちろん

$$
p_n(x)
=
a_0+a_1x+\cdots+a_nx^n
$$

と置いて、

$$
\begin{pmatrix}
1&x_0&\cdots&x_0^n\\
1&x_1&\cdots&x_1^n\\
\vdots&\vdots&&\vdots\\
1&x_n&\cdots&x_n^n
\end{pmatrix}
\begin{pmatrix}
a_0\\a_1\\\vdots\\a_n
\end{pmatrix}
=
\begin{pmatrix}
y_0\\y_1\\\vdots\\y_n
\end{pmatrix}
$$

を解いてもよい。

しかし Lagrange 公式は、

- 存在を明示的に与える。
- 一意性の証明と直結する。
- 各データ値の摂動が補間値へどう伝わるか見やすい。

という利点があります。

一方、新しい節点を1個追加するたびに基底を作り直すのは不便です。そこで Newton 形が出てきます。

---

## 3. 分割差分は「補間多項式の最高次係数」を取り出す

<a id="def-na4-divided-difference"></a>
<!-- formal-statement-start -->
### 定義（分割差分）

相異なる節点 $x_0,\dots,x_k$ と関数値

$$
f(x_0),\dots,f(x_k)
$$

を考える。

これら $k+1$ 点を補間する次数 $k$ 以下の一意な多項式を $p_k$ とする。

$p_k$ の $x^k$ の係数を

$$
\boxed{
f[x_0,\dots,x_k]
}
$$

と書き、**$k$ 階分割差分**という。

特に

$$
f[x_i]=f(x_i).
$$
<!-- formal-statement-end -->

この定義は「表を作る再帰公式」と同値です。その再帰公式を次で導きます。

<!-- definition-example-start: def-na4-divided-difference -->
**定義の確認**。二点 $x_0\ne x_1$ を通る一次補間多項式は

$$
p_1(x)
=
f(x_0)
+
\frac{f(x_1)-f(x_0)}{x_1-x_0}(x-x_0).
$$

したがって $x$ の係数は

$$
\boxed{
f[x_0,x_1]
=
\frac{f(x_1)-f(x_0)}{x_1-x_0}
}.
$$

一次分割差分は、二点間の割線の傾きそのものです。
<!-- definition-example-end -->

<a id="prop-na4-divided-difference-recurrence"></a>
<!-- formal-statement-start -->
### 命題（分割差分の再帰公式）

相異なる節点 $x_0,\dots,x_k$ に対して $k\ge1$ なら、

$$
\boxed{
f[x_0,\dots,x_k]
=
\frac{
f[x_1,\dots,x_k]
-
f[x_0,\dots,x_{k-1}]
}{
x_k-x_0
}
}
$$

が成り立つ。
<!-- formal-statement-end -->

<!-- proof-start -->
### 証明

$x_0,\dots,x_{k-1}$ を補間する多項式を $p_L$、
$x_1,\dots,x_k$ を補間する多項式を $p_R$ とします。

どちらも次数は $k-1$ 以下です。

次の多項式を作ります。

$$
q(x)
=
\frac{
(x-x_0)p_R(x)
-
(x-x_k)p_L(x)
}{
x_k-x_0
}.
$$

$x=x_0$ では

$$
q(x_0)
=
\frac{
0-(x_0-x_k)f(x_0)
}{
x_k-x_0
}
=
f(x_0).
$$

$x=x_k$ では

$$
q(x_k)
=
\frac{
(x_k-x_0)f(x_k)-0
}{
x_k-x_0
}
=
f(x_k).
$$

中間の節点 $x_i$、$1\le i\le k-1$ では

$$
p_L(x_i)=p_R(x_i)=f(x_i)
$$

なので、

$$
\begin{aligned}
q(x_i)
&=
\frac{
(x_i-x_0)f(x_i)
-
(x_i-x_k)f(x_i)
}{
x_k-x_0
}\\
&=
f(x_i).
\end{aligned}
$$

従って $q$ は $x_0,\dots,x_k$ のすべてを補間します。

しかも $\deg q\le k$ なので、補間多項式の一意性から $q$ は $k+1$ 点の補間多項式そのものです。

$p_R$ の最高次係数は

$$
f[x_1,\dots,x_k],
$$

$p_L$ の最高次係数は

$$
f[x_0,\dots,x_{k-1}]
$$

です。

したがって $q$ の $x^k$ の係数は

$$
\frac{
f[x_1,\dots,x_k]
-
f[x_0,\dots,x_{k-1}]
}{
x_k-x_0
}.
$$

定義より、これは $f[x_0,\dots,x_k]$ に等しい。

$\square$
<!-- proof-end -->

---

## 4. Newton 補間は、節点を一つずつ追加する形になっている

<a id="thm-na4-newton-interpolation"></a>
<!-- formal-statement-start -->
### 定理（Newton 補間公式）

相異なる節点 $x_0,\dots,x_n$ における関数値 $f(x_i)$ を補間する多項式を $p_n$ とする。

このとき

$$
\boxed{
p_n(x)
=
f[x_0]
+
\sum_{k=1}^n
f[x_0,\dots,x_k]
\prod_{j=0}^{k-1}(x-x_j)
}
$$

が成り立つ。
<!-- formal-statement-end -->

<!-- proof-start -->
### 証明

$x_0,\dots,x_k$ を補間する多項式を $p_k$ とします。

$p_k$ と $p_{k-1}$ は、最初の $k$ 個の節点

$$
x_0,\dots,x_{k-1}
$$

で同じ値を取ります。

したがって差

$$
p_k-p_{k-1}
$$

はこれら $k$ 点を根に持ちます。

しかも次数は $k$ 以下なので、ある定数 $c_k$ が存在して

$$
p_k(x)-p_{k-1}(x)
=
c_k
\prod_{j=0}^{k-1}(x-x_j).
$$

右辺の積は 最高次係数が1の $k$ 次多項式です。

$p_{k-1}$ の次数は $k-1$ 以下なので、左辺の $x^k$ の係数は $p_k$ の $x^k$ の係数そのものです。

分割差分の定義から

$$
c_k
=
f[x_0,\dots,x_k].
$$

従って

$$
p_k(x)
=
p_{k-1}(x)
+
f[x_0,\dots,x_k]
\prod_{j=0}^{k-1}(x-x_j).
$$

これを $k=1,\dots,n$ まで繰り返し、

$$
p_0(x)=f[x_0]
$$

を使えば、

$$
p_n(x)
=
f[x_0]
+
\sum_{k=1}^n
f[x_0,\dots,x_k]
\prod_{j=0}^{k-1}(x-x_j).
$$

$\square$
<!-- proof-end -->

### 例：分割差分表から Newton 形を作る

$$
x_0=0,\qquad
x_1=1,\qquad
x_2=2
$$

で

$$
f(x)=\frac1{1+x}
$$

を補間します。

まず

$$
f[0]=1,\qquad
f[1]=\frac12,\qquad
f[2]=\frac13.
$$

一次分割差分は

$$
f[0,1]
=
\frac{1/2-1}{1-0}
=
-\frac12,
$$

$$
f[1,2]
=
\frac{1/3-1/2}{2-1}
=
-\frac16.
$$

二次分割差分は

$$
f[0,1,2]
=
\frac{-1/6-(-1/2)}{2-0}
=
\frac16.
$$

したがって

$$
p_2(x)
=
1-\frac12x+\frac16x(x-1).
$$

整理すると

$$
p_2(x)
=
1-\frac23x+\frac16x^2.
$$

実際、

$$
p_2(0)=1,\qquad
p_2(1)=\frac12,\qquad
p_2(2)=\frac13.
$$

### Newton 形の利点

新しい節点 $x_{n+1}$ を追加するとき、

$$
p_{n+1}(x)
=
p_n(x)
+
f[x_0,\dots,x_{n+1}]
\prod_{j=0}^{n}(x-x_j)
$$

と **最後の一項を付け足す**だけで済みます。

Lagrange 形と Newton 形は別の近似ではありません。一意性定理により、同じ節点と同じデータを補間する限り、完全に同じ多項式です。

---

## 5. 補間誤差は「滑らかさ」と「節点配置」に分かれる

ここからが数値解析としての本題です。

関数 $f$ を節点で一致させても、節点の間では一般に

$$
f(x)\ne p_n(x)
$$

です。

節点だけで0になる多項式を

<a id="def-na4-node-polynomial"></a>
<!-- formal-statement-start -->
### 定義（節点多項式）

相異なる節点 $x_0,\dots,x_n$ に対し、

$$
\boxed{
\omega_{n+1}(x)
=
\prod_{i=0}^n(x-x_i)
}
$$

を **節点多項式**という。
<!-- formal-statement-end -->

<!-- definition-example-start: def-na4-node-polynomial -->
**定義の確認**。節点 $-1,0,1$ なら

$$
\omega_3(x)
=
(x+1)x(x-1)
=
x^3-x.
$$

実際、

$$
\omega_3(-1)=\omega_3(0)=\omega_3(1)=0.
$$

補間誤差も同じ節点で0になるため、この積が誤差公式に現れます。
<!-- definition-example-end -->

<a id="thm-na4-interpolation-error"></a>
<!-- formal-statement-start -->
### 定理（多項式補間の誤差公式）

$a<b$ とし、

$$
x_0,\dots,x_n\in[a,b]
$$

を相異なる節点とする。

$f\in C^{n+1}([a,b])$ とし、$p_n\in\mathcal P_n$ を $f$ の節点 $x_0,\dots,x_n$ における補間多項式とする。

任意の $x\in[a,b]$ に対し、ある $\xi$ が $x,x_0,\dots,x_n$ の最小値と最大値の間に存在して、

$$
\boxed{
f(x)-p_n(x)
=
\frac{f^{(n+1)}(\xi)}{(n+1)!}
\omega_{n+1}(x)
}
$$

が成り立つ。
<!-- formal-statement-end -->

### 証明の見取り図

$x$ も補間節点だったなら誤差は0です。

そうでなければ、

$$
f(t)-p_n(t)
$$

から $\omega_{n+1}(t)$ の適切な定数倍を引いて、$x$ でも0になる補助関数を作ります。

すると相異なる $n+2$ 個の零点を持つため、[Rolle の定理](../RA3/index.md#thm-ra3-rolle)を $n+1$ 回繰り返せます。

<!-- proof-start -->
### 証明

$x$ が節点の一つ、例えば $x=x_i$ なら

$$
f(x)-p_n(x)=0
$$

であり、

$$
\omega_{n+1}(x)=0
$$

なので等式は自明です。

以下、$x$ はどの節点とも異なるとします。

定数

$$
\lambda
=
\frac{
f(x)-p_n(x)
}{
\omega_{n+1}(x)
}
$$

を定め、

$$
g(t)
=
f(t)-p_n(t)-\lambda\omega_{n+1}(t)
$$

と置きます。

各節点 $x_i$ では

$$
f(x_i)-p_n(x_i)=0
$$

かつ

$$
\omega_{n+1}(x_i)=0
$$

なので、

$$
g(x_i)=0.
$$

また $\lambda$ の定義から

$$
g(x)=0.
$$

従って $g$ は相異なる $n+2$ 個の零点

$$
x_0,\dots,x_n,x
$$

を持ちます。

$f\in C^{n+1}([a,b])$、$p_n$ と $\omega_{n+1}$ は多項式なので、$g$ は閉区間上で $n+1$ 回連続微分可能です。

零点を小さい順に並べます。

隣り合う零点ごとに Rolle の定理を使うと、$g'$ は少なくとも $n+1$ 個の零点を持ちます。

さらにそれらの隣り合う零点へ Rolle の定理を使うと、$g''$ は少なくとも $n$ 個の零点を持ちます。

これを繰り返すと、ある $\xi$ が零点全体の最小値と最大値の間に存在して

$$
g^{(n+1)}(\xi)=0
$$

となります。

$p_n$ の次数は $n$ 以下だから

$$
p_n^{(n+1)}=0.
$$

また

$$
\omega_{n+1}(t)
=
t^{n+1}+\text{低次項}
$$

は 最高次係数が1のので

$$
\omega_{n+1}^{(n+1)}(t)
=
(n+1)!.
$$

従って

$$
0
=
g^{(n+1)}(\xi)
=
f^{(n+1)}(\xi)
-
\lambda(n+1)!.
$$

よって

$$
\lambda
=
\frac{f^{(n+1)}(\xi)}{(n+1)!}.
$$

一方 $\lambda$ は

$$
\lambda
=
\frac{
f(x)-p_n(x)
}{
\omega_{n+1}(x)
}
$$

だったので、

$$
f(x)-p_n(x)
=
\frac{f^{(n+1)}(\xi)}{(n+1)!}
\omega_{n+1}(x).
$$

$\square$
<!-- proof-end -->

### 仮定がどこで働いたか

- **節点が相異なる**：$\omega_{n+1}$ が $n+1$ 個の異なる零点を持ち、補間問題も一意になる。
- **$f\in C^{n+1}$**：Rolle の定理を $n+1$ 回反復できる。
- **補間多項式の次数が $n$ 以下**：$(n+1)$ 階微分で $p_n$ が消える。
- **$\omega_{n+1}$ が monic**：$(n+1)$ 階微分がちょうど $(n+1)!$ になる。

### 系：一様誤差評価

もし

$$
M_{n+1}
=
\max_{t\in[a,b]}
|f^{(n+1)}(t)|
$$

なら、

$$
\boxed{
|f(x)-p_n(x)|
\le
\frac{M_{n+1}}{(n+1)!}
|\omega_{n+1}(x)|
}
$$

です。

さらに

$$
\boxed{
\|f-p_n\|_\infty
\le
\frac{M_{n+1}}{(n+1)!}
\|\omega_{n+1}\|_\infty
}.
$$

ここで二つの要因が分離されました。

~~~text
関数側
M_{n+1}/(n+1)!
        ×
節点側
||ω_{n+1}||∞
~~~

節点選択は、後半の幾何学的な因子を小さくする問題になります。

---

## 6. 例：$e^x$ の二次補間誤差を評価する

区間 $[0,1]$ で

$$
x_0=0,\qquad
x_1=\frac12,\qquad
x_2=1
$$

を使い、$f(x)=e^x$ を二次補間します。

誤差公式から

$$
e^x-p_2(x)
=
\frac{e^\xi}{3!}
x\left(x-\frac12\right)(x-1)
$$

です。

$\xi\in(0,1)$ なので

$$
e^\xi\le e.
$$

従って

$$
|e^x-p_2(x)|
\le
\frac e6
\left|
x\left(x-\frac12\right)(x-1)
\right|.
$$

例えば $x=1/4$ では

$$
\left|
\frac14
\left(-\frac14\right)
\left(-\frac34\right)
\right|
=
\frac3{64},
$$

よって

$$
\boxed{
\left|e^{1/4}-p_2(1/4)\right|
\le
\frac e{128}
}.
$$

ここでは補間多項式を展開しなくても誤差を評価できました。

---

## 7. 節点配置を変えると、節点多項式の大きさが変わる

同じ次数でも節点の置き方は一意ではありません。

誤差上界

$$
\|f-p_n\|_\infty
\le
\frac{M_{n+1}}{(n+1)!}
\|\omega_{n+1}\|_\infty
$$

を見ると、

$$
\|\omega_{n+1}\|_\infty
$$

を小さくしたくなります。

区間 $[-1,1]$ では、その最適解を Chebyshev 多項式が与えます。

---

## 8. Chebyshev 多項式と Chebyshev 節点

$m\ge0$ に対して

$$
T_m(\cos\theta)
=
\cos(m\theta)
$$

で定まる多項式を **Chebyshev 多項式**とします。

三角関数の恒等式

$$
\cos((m+1)\theta)
+
\cos((m-1)\theta)
=
2\cos\theta\cos(m\theta)
$$

から

$$
T_{m+1}(x)
=
2xT_m(x)-T_{m-1}(x)
$$

です。

初期値

$$
T_0(x)=1,\qquad
T_1(x)=x
$$

から帰納的に、$m\ge1$ では $T_m$ は $m$ 次で最高次係数は

$$
2^{m-1}
$$

だと分かります。

また $x\in[-1,1]$ なら $x=\cos\theta$ と書けるため、

$$
|T_m(x)|
=
|\cos(m\theta)|
\le1.
$$

<a id="def-na4-chebyshev-nodes"></a>
<!-- formal-statement-start -->
### 定義（Chebyshev 節点）

次数 $n$ 以下の補間に用いる $n+1$ 個の **Chebyshev 節点**を

$$
\boxed{
x_j
=
\cos
\frac{(2j+1)\pi}{2(n+1)}
}
\qquad
(j=0,\dots,n)
$$

と定める。

これらは $T_{n+1}$ の $n+1$ 個の零点である。
<!-- formal-statement-end -->

<!-- definition-example-start: def-na4-chebyshev-nodes -->
**定義の確認**。$n=2$ なら

$$
x_j
=
\cos\frac{(2j+1)\pi}{6}
$$

なので、

$$
x_0=\frac{\sqrt3}{2},
\qquad
x_1=0,
\qquad
x_2=-\frac{\sqrt3}{2}.
$$

一方

$$
T_3(x)=4x^3-3x
=
x(4x^2-3)
$$

なので、その零点は確かに

$$
0,\qquad
\pm\frac{\sqrt3}{2}
$$

です。
<!-- definition-example-end -->

Chebyshev 節点は端点そのものを含みませんが、端点付近へ密に集まります。

これは Runge 現象で問題になる「端点付近の暴れ」を抑える方向の配置です。

---

## 9. Chebyshev 節点は節点多項式の最大値を最小にする

<a id="thm-na4-chebyshev-minimax"></a>
<!-- formal-statement-start -->
### 定理（最高次係数1の多項式に対する Chebyshev の最小最大性）

$m\ge1$ とする。

$[-1,1]$ 上で、最高次係数が1の $m$ 次実多項式 $q$ 全体を考える。

このとき

$$
\boxed{
\min_q
\|q\|_{\infty,[-1,1]}
=
2^{1-m}
}
$$

であり、

$$
\boxed{
q_*(x)
=
2^{1-m}T_m(x)
}
$$

がこの最小値を達成する。
<!-- formal-statement-end -->

<!-- proof-start -->
### 証明

$T_m$ の最高次係数は $2^{m-1}$ なので、

$$
q_*(x)
=
2^{1-m}T_m(x)
$$

は 最高次係数が1の $m$ 次多項式です。

また $|T_m(x)|\le1$ より

$$
\|q_*\|_\infty
\le
2^{1-m}.
$$

実際、

$$
t_k
=
\cos\frac{k\pi}{m},
\qquad
k=0,\dots,m
$$

では

$$
T_m(t_k)
=
\cos(k\pi)
=
(-1)^k
$$

なので、

$$
\|q_*\|_\infty
=
2^{1-m}.
$$

残るのは、これより小さくできないことです。

反対に、最高次係数が1の $m$ 次多項式 $q$ が

$$
\|q\|_\infty
<
2^{1-m}
$$

を満たすと仮定します。

差

$$
r=q-q_*
$$

を考えます。

$q$ と $q_*$ はどちらも 最高次係数が1の $m$ 次多項式なので、最高次項が打ち消し合い、

$$
\deg r\le m-1.
$$

一方、$t_k$ では

$$
q_*(t_k)
=
2^{1-m}(-1)^k.
$$

$k$ が偶数なら

$$
q_*(t_k)=2^{1-m}
$$

であり、$|q(t_k)|<2^{1-m}$ だから

$$
r(t_k)
=
q(t_k)-q_*(t_k)
<
0.
$$

$k$ が奇数なら

$$
q_*(t_k)=-2^{1-m}
$$

であり、$q(t_k)>-2^{1-m}$ だから

$$
r(t_k)>0.
$$

従って

$$
r(t_0),r(t_1),\dots,r(t_m)
$$

の符号は交互に変わります。

$t_0,\dots,t_m$ は $[-1,1]$ に並ぶ $m+1$ 個の異なる点なので、中間値定理から隣り合う点の各区間に少なくとも一つずつ根があります。

したがって $r$ は少なくとも $m$ 個の相異なる実根を持ちます。

しかし

$$
\deg r\le m-1
$$

なので、$r$ が零多項式でない限りこれは不可能です。

$r=0$ なら $q=q_*$ ですが、そのとき

$$
\|q\|_\infty
=
2^{1-m}
$$

であり、厳密不等式にも反します。

よって

$$
\|q\|_\infty
<
2^{1-m}
$$

を満たす 最高次係数が1の $m$ 次多項式は存在しません。

従って最小値は $2^{1-m}$ です。

$\square$
<!-- proof-end -->

### 補間へ戻す

次数 $n$ の補間では節点多項式は 最高次係数が1の $n+1$ 次多項式です。

Chebyshev 節点は $T_{n+1}$ の零点なので、

$$
\omega_{n+1}(x)
=
2^{-n}T_{n+1}(x).
$$

したがって

$$
\boxed{
\|\omega_{n+1}\|_{\infty,[-1,1]}
=
2^{-n}
}.
$$

しかもこの値は、どんな $n+1$ 個の実節点を選んでもこれより小さくできません。

したがって Chebyshev 節点は、補間誤差評価に現れる

$$
\|\omega_{n+1}\|_\infty
$$

を最小にします。

### 一般区間 $[a,b]$ では

変数変換

$$
x
=
\frac{a+b}{2}
+
\frac{b-a}{2}t,
\qquad
t\in[-1,1]
$$

を使えばよい。

従って節点は

$$
\boxed{
x_j
=
\frac{a+b}{2}
+
\frac{b-a}{2}
\cos
\frac{(2j+1)\pi}{2(n+1)}
}
$$

です。

---

## 10. 「次数を増やせば良くなる」は一般には偽：Runge 現象

多項式近似そのものには非常に強い近似能力があります。

しかし **等間隔節点で補間する**という特定の方法では、次数を増やすほど端点付近の振動が悪化することがあります。

典型例は

$$
\boxed{
f(x)=\frac1{1+25x^2}
}
\qquad
(-1\le x\le1)
$$

です。

これを Runge の関数と呼ぶことがあります。

### 低次数だけでも「悪化」は見える

まず節点

$$
-1,\ 0,\ 1
$$

で二次補間すると、

$$
p_2(x)
=
1-\frac{25}{26}x^2
=
-\frac{25x^2-26}{26}.
$$

$x=0.9=9/10$ では

$$
p_2(0.9)
=
\frac{23}{104}
\approx0.22115.
$$

真値は

$$
f(0.9)
=
\frac4{85}
\approx0.04706.
$$

誤差は

$$
\left|
p_2(0.9)-f(0.9)
\right|
=
\frac{1539}{8840}
\approx0.17410.
$$

次に等間隔の5点

$$
-1,\ -\frac12,\ 0,\ \frac12,\ 1
$$

で四次補間すると、偶関数なので補間多項式も偶関数となり、

$$
p_4(x)
=
\frac{
2500x^4-3225x^2+754
}{754}.
$$

同じ $x=0.9$ では

$$
p_4(0.9)
=
-\frac{109}{377}
\approx-0.28912.
$$

従って誤差は

$$
\left|
p_4(0.9)-f(0.9)
\right|
=
\frac{10773}{32045}
\approx0.33619.
$$

次数を2から4へ上げたのに、$x=0.9$ の誤差は約2倍に増えました。

### 何が壊れたのか

失われた仮定は「高次数なら収束する」という仮定ではありません。そもそも、そのような一般定理はありません。

補間誤差公式は

$$
f(x)-p_n(x)
=
\frac{f^{(n+1)}(\xi)}{(n+1)!}
\omega_{n+1}(x)
$$

としか言っていません。

次数を上げると、

- $(n+1)!$ は大きくなる。
- しかし高階導関数も大きくなり得る。
- 等間隔節点では $\omega_{n+1}$ の端点付近の挙動も悪くなり得る。

という競争があります。

したがって「点が増えたから自動的に良くなる」とは言えません。

これが Runge 現象の基本機構です。

Chebyshev 節点は少なくとも節点側の因子

$$
\|\omega_{n+1}\|_\infty
$$

を最適化し、端点付近へ節点を集めます。

---

## 11. 補間誤差とデータ誤差は別物：Lebesgue 定数

ここまでの誤差

$$
f-p_n
$$

は、正確なデータ $f(x_i)$ から関数を補間したときの **近似誤差**でした。

現実のデータには誤差が入ります。

$$
y_i
\longmapsto
y_i+\delta_i
$$

とすると、Lagrange 公式から補間多項式の変化は

$$
\Delta p_n(x)
=
\sum_{i=0}^n\delta_i\ell_i(x)
$$

です。

<a id="def-na4-lebesgue-constant"></a>
<!-- formal-statement-start -->
### 定義（Lebesgue 関数・Lebesgue 定数）

節点 $x_0,\dots,x_n$ の Lagrange 基底を $\ell_i$ とする。

区間 $[a,b]$ 上で

$$
\boxed{
\Lambda_n(x)
=
\sum_{i=0}^n|\ell_i(x)|
}
$$

を **Lebesgue 関数**、

$$
\boxed{
\Lambda_n
=
\max_{x\in[a,b]}\Lambda_n(x)
}
$$

を **Lebesgue 定数**という。
<!-- formal-statement-end -->

<!-- definition-example-start: def-na4-lebesgue-constant -->
**定義の確認**。節点が $-1,1$ の二点なら

$$
\ell_0(x)=\frac{1-x}{2},
\qquad
\ell_1(x)=\frac{1+x}{2}.
$$

$-1\le x\le1$ では両方とも非負なので、

$$
\Lambda_1(x)
=
\frac{1-x}{2}
+
\frac{1+x}{2}
=
1.
$$

従って

$$
\Lambda_1=1.
$$
<!-- definition-example-end -->

<a id="prop-na4-data-perturbation"></a>
<!-- formal-statement-start -->
### 命題（データ摂動の増幅評価）

補間データが

$$
y_i\longmapsto y_i+\delta_i
$$

と変化し、それぞれの補間多項式を $p_n,\widetilde p_n$ とする。

このとき

$$
\boxed{
\|\widetilde p_n-p_n\|_{\infty,[a,b]}
\le
\Lambda_n
\max_i|\delta_i|
}
$$

が成り立つ。
<!-- formal-statement-end -->

<!-- proof-start -->
### 証明

Lagrange 公式から

$$
\widetilde p_n(x)-p_n(x)
=
\sum_{i=0}^n\delta_i\ell_i(x).
$$

三角不等式より

$$
\begin{aligned}
|\widetilde p_n(x)-p_n(x)|
&\le
\sum_{i=0}^n|\delta_i||\ell_i(x)|\\
&\le
\left(\max_i|\delta_i|\right)
\sum_{i=0}^n|\ell_i(x)|\\
&=
\left(\max_i|\delta_i|\right)\Lambda_n(x)\\
&\le
\Lambda_n\max_i|\delta_i|.
\end{aligned}
$$

$x\in[a,b]$ について最大を取ればよい。

$\square$
<!-- proof-end -->

### NA1 との接続

これは「入力データの小さな摂動が出力へどれだけ増幅されるか」という条件付けの問題です。

したがって、

- **補間誤差**：真の関数 $f$ と正確な補間多項式 $p_n$ の差。
- **データ感度**：$y_i$ の誤差が補間値へ何倍に増幅されるか。
- **丸め誤差**：有限精度で式を評価するときに生じる誤差。

を分ける必要があります。

NA1 で行った「問題の条件」と「アルゴリズムの安定性」を分ける見方が、そのまま現れています。

---

## 12. Lagrange 形をそのまま計算する必要はない：重心形式

理論上は

$$
p_n(x)
=
\sum_{i=0}^n y_i\ell_i(x)
$$

で十分です。

しかし各 $\ell_i$ の積を毎回作ると、計算量も丸め誤差も気になります。

節点多項式を

$$
\omega_{n+1}(x)
=
\prod_{j=0}^n(x-x_j)
$$

とし、

$$
w_i
=
\frac1{\prod_{j\ne i}(x_i-x_j)}
=
\frac1{\omega_{n+1}'(x_i)}
$$

と置きます。

$x$ が節点でなければ

$$
\ell_i(x)
=
\omega_{n+1}(x)\frac{w_i}{x-x_i}.
$$

したがって

$$
p_n(x)
=
\omega_{n+1}(x)
\sum_{i=0}^n
\frac{w_i y_i}{x-x_i}.
$$

一方、定数関数 $1$ を補間すると

$$
1
=
\sum_{i=0}^n\ell_i(x)
=
\omega_{n+1}(x)
\sum_{i=0}^n
\frac{w_i}{x-x_i}.
$$

両式の比を取ると

$$
\boxed{
p_n(x)
=
\frac{
\displaystyle
\sum_{i=0}^n\frac{w_i y_i}{x-x_i}
}{
\displaystyle
\sum_{i=0}^n\frac{w_i}{x-x_i}
}
}
$$

を得ます。

これが **Lagrange 補間の重心形式**です。

節点 $x=x_i$ では分数式を直接評価せず、

$$
p_n(x_i)=y_i
$$

を使います。

実装上の安定な評価は NUMLAB1 で数値実験へ接続します。本章では、Lagrange 形・Newton 形・重心形式が **同じ一意な補間多項式の異なる表現**だと理解しておけば十分です。

---

## 13. この章で区別しておく四つの問い

### 問い1：補間多項式は存在するか

Lagrange 公式が明示的に作ります。

### 問い2：一意か

差が $n+1$ 個の根を持つ次数 $n$ 以下の多項式になるため、一意です。

### 問い3：元の関数に近いか

誤差公式

$$
f(x)-p_n(x)
=
\frac{f^{(n+1)}(\xi)}{(n+1)!}
\omega_{n+1}(x)
$$

で調べます。

### 問い4：データや丸めに対して安定か

Lebesgue 定数や評価アルゴリズムを調べます。

この四つは同じ問いではありません。

「補間条件を厳密に満たした」からといって、関数近似として良いとも、有限精度計算で安定とも限りません。

---

## 14. 演習

### Level A

<a id="ex-na4-a1"></a>
#### NA4-A01 Lagrange 補間
- Level: A

3点

$$
(-1,1),\qquad
(0,2),\qquad
(2,3)
$$

を通る二次以下の補間多項式を Lagrange 公式で求めよ。

最後に3点を代入して補間条件を確認せよ。

<a id="ex-na4-a2"></a>
#### NA4-A02 一意性
- Level: A

$p,q\in\mathcal P_4$ が相異なる5点

$$
x_0,\dots,x_4
$$

で

$$
p(x_i)=q(x_i)
$$

を満たすとする。

$p=q$ を示せ。

さらに、「節点が4点しかない」なら同じ結論は一般に成り立たないことを具体例で示せ。

<a id="ex-na4-a3"></a>
#### NA4-A03 分割差分表
- Level: A

$$
f(x)=\frac1{1+x}
$$

を

$$
x_0=0,\qquad
x_1=1,\qquad
x_2=3
$$

で補間する。

1. 0階、1階、2階分割差分をすべて求めよ。
2. Newton 形で $p_2(x)$ を書け。
3. $p_2(3)=f(3)$ を確認せよ。

<a id="ex-na4-a4"></a>
#### NA4-A04 誤差公式の点評価
- Level: A

$f(x)=e^x$ を節点

$$
0,\quad \frac12,\quad 1
$$

で二次補間した多項式を $p_2$ とする。

誤差公式だけを使って

$$
\left|
e^{1/4}-p_2(1/4)
\right|
$$

の上界を求めよ。

### Level B

<a id="ex-na4-b1"></a>
#### NA4-B01 Newton 形の増分構造
- Level: B

$x_0,\dots,x_n$ の補間多項式を $p_n$、
$x_0,\dots,x_{n+1}$ の補間多項式を $p_{n+1}$ とする。

1. $p_{n+1}-p_n$ が $x_0,\dots,x_n$ を根に持つことを示せ。
2. ある定数 $c$ によって
   $$
   p_{n+1}(x)-p_n(x)
   =
   c\prod_{j=0}^n(x-x_j)
   $$
   と書けることを示せ。
3. $c=f[x_0,\dots,x_{n+1}]$ であることを示せ。
4. 新しい節点を追加するとき Newton 形が再利用しやすい理由を説明せよ。

<a id="ex-na4-b2"></a>
#### NA4-B02 補間誤差公式を再構成する
- Level: B

$f\in C^{n+1}([a,b])$ とし、$p_n$ を相異なる節点 $x_0,\dots,x_n$ における補間多項式とする。

$x$ はどの節点とも異なるとする。

$$
g(t)
=
f(t)-p_n(t)-\lambda\omega_{n+1}(t)
$$

を使って、適切な $\lambda$ を選び、

$$
f(x)-p_n(x)
=
\frac{f^{(n+1)}(\xi)}{(n+1)!}
\omega_{n+1}(x)
$$

を導け。

Rolle の定理を何回使うかも明記せよ。

<a id="ex-na4-b3"></a>
#### NA4-B03 Chebyshev 節点と節点多項式
- Level: B

$[-1,1]$ で次数3以下の補間を行うため、$T_4$ の零点を節点にする。

1. $T_4(x)=8x^4-8x^2+1$ を確認せよ。
2. 4個の Chebyshev 節点を書け。
3. 節点多項式 $\omega_4$ が
   $$
   \omega_4(x)
   =
   \frac18T_4(x)
   $$
   であることを示せ。
4.
   $$
   \|\omega_4\|_{\infty,[-1,1]}
   $$
   を求めよ。
5. この値が 最高次係数が1の4次多項式の最小可能な一様ノルムである理由を本文の最小最大定理から説明せよ。

### Level C

<a id="ex-na4-c1"></a>
#### NA4-C01 Runge 関数：次数を上げると悪くなる例
- Level: C

$$
f(x)=\frac1{1+25x^2},
\qquad
-1\le x\le1
$$

を考える。

1. 節点 $-1,0,1$ における二次補間多項式 $p_2$ を求めよ。
2. 節点 $-1,-1/2,0,1/2,1$ における四次補間多項式 $p_4$ を求めよ。$f$ が偶関数で節点集合も原点対称であることから、$p_4$ も偶関数になることをまず示してよい。
3. $x=0.9$ における真値、$p_2(0.9)$、$p_4(0.9)$ を求め、誤差を比較せよ。
4. 次数を上げたのに誤差が増えた理由を、補間誤差公式の二つの因子
   $$
   \frac{f^{(n+1)}(\xi)}{(n+1)!},
   \qquad
   \omega_{n+1}(x)
   $$
   の観点から説明せよ。
5. Chebyshev 節点がこの問題に対して何を改善するのかを、最小最大定理を使って説明せよ。「任意の関数に対し誤差を必ず最小化する」とは言わないこと。

---

## 15. 詳細解答

### A1 解答

節点

$$
x_0=-1,\qquad
x_1=0,\qquad
x_2=2
$$

に対する Lagrange 基底は

$$
\ell_0(x)
=
\frac{x(x-2)}{(-1-0)(-1-2)}
=
\frac{x(x-2)}3,
$$

$$
\ell_1(x)
=
\frac{(x+1)(x-2)}{(0+1)(0-2)}
=
-\frac{(x+1)(x-2)}2,
$$

$$
\ell_2(x)
=
\frac{(x+1)x}{(2+1)(2-0)}
=
\frac{x(x+1)}6.
$$

データ値は

$$
y_0=1,\qquad
y_1=2,\qquad
y_2=3
$$

なので、

$$
p_2(x)
=
\ell_0(x)+2\ell_1(x)+3\ell_2(x).
$$

各項を展開します。

$$
\ell_0(x)
=
\frac{x^2-2x}{3},
$$

$$
2\ell_1(x)
=
-(x+1)(x-2)
=
-x^2+x+2,
$$

$$
3\ell_2(x)
=
\frac{x(x+1)}2
=
\frac{x^2+x}{2}.
$$

通分すると

$$
\begin{aligned}
p_2(x)
&=
\frac{2x^2-4x}{6}
+
\frac{-6x^2+6x+12}{6}
+
\frac{3x^2+3x}{6}\\
&=
\frac{-x^2+5x+12}{6}.
\end{aligned}
$$

従って

$$
\boxed{
p_2(x)
=
-\frac16x^2+\frac56x+2
}.
$$

確認すると

$$
p_2(-1)
=
-\frac16-\frac56+2
=
1,
$$

$$
p_2(0)=2,
$$

$$
p_2(2)
=
-\frac46+\frac{10}{6}+2
=
3.
$$

すべての補間条件を満たします。

### A2 解答

差

$$
r=p-q
$$

を考えます。

$p,q\in\mathcal P_4$ なので

$$
r\in\mathcal P_4.
$$

各 $i=0,\dots,4$ について

$$
r(x_i)
=
p(x_i)-q(x_i)
=
0.
$$

したがって $r$ は相異なる5個の根を持ちます。

0でない4次以下の多項式が持てる相異なる根は高々4個です。

よって

$$
r=0,
$$

すなわち

$$
\boxed{p=q}.
$$

一方、節点が4点だけなら結論は一般に偽です。

相異なる4点 $x_0,\dots,x_3$ に対し、

$$
p(x)=0,
$$

$$
q(x)
=
(x-x_0)(x-x_1)(x-x_2)(x-x_3)
$$

とします。

どちらも $\mathcal P_4$ に属し、4点では

$$
p(x_i)=q(x_i)=0.
$$

しかし $q$ は零多項式ではないので

$$
p\ne q.
$$

4次以下の多項式を一意に決めるには、一般に5個の相異なる補間条件が必要です。

### A3 解答

まず0階分割差分は

$$
f[0]=1,
\qquad
f[1]=\frac12,
\qquad
f[3]=\frac14.
$$

一次分割差分は

$$
f[0,1]
=
\frac{1/2-1}{1-0}
=
-\frac12,
$$

$$
f[1,3]
=
\frac{1/4-1/2}{3-1}
=
\frac{-1/4}{2}
=
-\frac18.
$$

二次分割差分は

$$
\begin{aligned}
f[0,1,3]
&=
\frac{
f[1,3]-f[0,1]
}{
3-0
}\\
&=
\frac{
-1/8+1/2
}{3}\\
&=
\frac{3/8}{3}\\
&=
\frac18.
\end{aligned}
$$

従って Newton 形は

$$
\boxed{
p_2(x)
=
1-\frac12x+\frac18x(x-1)
}.
$$

$x=3$ を代入すると

$$
\begin{aligned}
p_2(3)
&=
1-\frac32+\frac18\cdot3\cdot2\\
&=
-\frac12+\frac34\\
&=
\frac14.
\end{aligned}
$$

一方

$$
f(3)=\frac1{1+3}=\frac14.
$$

従って補間条件を満たしています。

### A4 解答

$f(x)=e^x$ なので

$$
f^{(3)}(x)=e^x.
$$

区間 $[0,1]$ では

$$
|f^{(3)}(x)|
\le e.
$$

節点多項式は

$$
\omega_3(x)
=
x\left(x-\frac12\right)(x-1).
$$

$x=1/4$ では

$$
\omega_3(1/4)
=
\frac14
\left(-\frac14\right)
\left(-\frac34\right)
=
\frac3{64}.
$$

誤差公式から、ある $\xi\in(0,1)$ に対し

$$
e^{1/4}-p_2(1/4)
=
\frac{e^\xi}{3!}\frac3{64}.
$$

従って

$$
\left|
e^{1/4}-p_2(1/4)
\right|
\le
\frac e6\cdot\frac3{64}
=
\boxed{\frac e{128}}.
$$

補間多項式そのものを計算しなくても上界を得られます。

### B1 解答

$p_{n+1}$ と $p_n$ は、$x_0,\dots,x_n$ では同じ関数値を補間します。

従って

$$
p_{n+1}(x_i)-p_n(x_i)=0
\qquad
(i=0,\dots,n).
$$

よって

$$
p_{n+1}-p_n
$$

は相異なる $n+1$ 個の根 $x_0,\dots,x_n$ を持ちます。

また

$$
\deg(p_{n+1}-p_n)
\le n+1.
$$

したがってある定数 $c$ によって

$$
p_{n+1}(x)-p_n(x)
=
c\prod_{j=0}^n(x-x_j)
$$

と書けます。

右辺の積は 最高次係数が1の $n+1$ 次多項式です。

$p_n$ の次数は $n$ 以下なので、左辺の $x^{n+1}$ の係数は $p_{n+1}$ の $x^{n+1}$ の係数です。

分割差分の定義から、その係数は

$$
f[x_0,\dots,x_{n+1}].
$$

従って

$$
\boxed{
c=f[x_0,\dots,x_{n+1}]
}.
$$

よって

$$
\boxed{
p_{n+1}(x)
=
p_n(x)
+
f[x_0,\dots,x_{n+1}]
\prod_{j=0}^n(x-x_j)
}.
$$

新しい節点を追加しても、既存の $p_n$ を捨てずに最後の一項だけを追加できます。

これが Newton 形の増分的な利点です。

### B2 解答

$x$ はどの節点とも異なるので

$$
\omega_{n+1}(x)\ne0.
$$

そこで

$$
\lambda
=
\frac{
f(x)-p_n(x)
}{
\omega_{n+1}(x)
}
$$

と選びます。

すると

$$
g(x)=0.
$$

また各節点 $x_i$ では

$$
f(x_i)-p_n(x_i)=0
$$

かつ

$$
\omega_{n+1}(x_i)=0
$$

なので、

$$
g(x_i)=0.
$$

したがって $g$ は

$$
x_0,\dots,x_n,x
$$

という相異なる $n+2$ 個の零点を持ちます。

零点を小さい順に並べます。

Rolle の定理を一度適用すると $g'$ は少なくとも $n+1$ 個の零点を持ちます。

二度目で $g''$ は少なくとも $n$ 個の零点を持ちます。

この操作を合計

$$
\boxed{n+1\text{ 回}}
$$

行うと、ある $\xi$ で

$$
g^{(n+1)}(\xi)=0.
$$

$p_n$ の次数は $n$ 以下なので

$$
p_n^{(n+1)}=0.
$$

また

$$
\omega_{n+1}(t)
=
t^{n+1}+\text{低次項}
$$

だから

$$
\omega_{n+1}^{(n+1)}=(n+1)!.
$$

従って

$$
0
=
f^{(n+1)}(\xi)
-
\lambda(n+1)!.
$$

よって

$$
\lambda
=
\frac{f^{(n+1)}(\xi)}{(n+1)!}.
$$

$\lambda$ の最初の定義と合わせて

$$
\boxed{
f(x)-p_n(x)
=
\frac{f^{(n+1)}(\xi)}{(n+1)!}
\omega_{n+1}(x)
}.
$$

### B3 解答

Chebyshev 多項式は

$$
T_0=1,\qquad
T_1=x,
$$

$$
T_{m+1}=2xT_m-T_{m-1}
$$

を満たします。

まず

$$
T_2
=
2x^2-1.
$$

次に

$$
T_3
=
2x(2x^2-1)-x
=
4x^3-3x.
$$

さらに

$$
\begin{aligned}
T_4
&=
2x(4x^3-3x)-(2x^2-1)\\
&=
8x^4-6x^2-2x^2+1\\
&=
\boxed{8x^4-8x^2+1}.
\end{aligned}
$$

次数3以下の補間では $n=3$ なので、4個の Chebyshev 節点は

$$
x_j
=
\cos\frac{(2j+1)\pi}{8},
\qquad
j=0,1,2,3.
$$

すなわち

$$
\boxed{
\cos\frac\pi8,\quad
\cos\frac{3\pi}8,\quad
\cos\frac{5\pi}8,\quad
\cos\frac{7\pi}8
}.
$$

これらは $T_4$ の4個の零点です。

したがって $T_4$ は

$$
T_4(x)
=
8\prod_{j=0}^3(x-x_j)
$$

と因数分解できます。最高次係数が8なので、係数は8です。

従って節点多項式は

$$
\boxed{
\omega_4(x)
=
\prod_{j=0}^3(x-x_j)
=
\frac18T_4(x)
}.
$$

$[-1,1]$ では

$$
|T_4(x)|\le1
$$

であり、極値点では1を達成します。

したがって

$$
\boxed{
\|\omega_4\|_\infty
=
\frac18
}.
$$

本文の Chebyshev 最小最大定理で $m=4$ とすると、最高次係数が1の4次多項式 $q$ は必ず

$$
\|q\|_\infty
\ge
2^{1-4}
=
\frac18
$$

を満たします。

よって $\omega_4$ は最小可能値を達成しています。

### C1 解答

関数

$$
f(x)=\frac1{1+25x^2}
$$

は偶関数です。

#### 1. 二次補間

節点 $-1,0,1$ では

$$
f(-1)=f(1)=\frac1{26},
\qquad
f(0)=1.
$$

節点集合が原点対称でデータも偶対称なので、一意な補間多項式も偶関数です。

従って

$$
p_2(x)=a+bx^2
$$

と置けます。

$x=0$ から

$$
a=1.
$$

$x=1$ から

$$
1+b=\frac1{26},
$$

よって

$$
b=-\frac{25}{26}.
$$

したがって

$$
\boxed{
p_2(x)
=
1-\frac{25}{26}x^2
=
\frac{26-25x^2}{26}
}.
$$

#### 2. 四次補間

節点

$$
-1,-\frac12,0,\frac12,1
$$

も原点対称です。

$q(x)=p_4(-x)$ とすると、$q$ も同じ5点で同じデータを補間します。

補間多項式の一意性から

$$
q=p_4.
$$

従って

$$
p_4(-x)=p_4(x)
$$

で、$p_4$ は偶関数です。

よって

$$
p_4(x)=a+bx^2+cx^4
$$

と置けます。

$x=0$ から

$$
a=1.
$$

$x=1$ では

$$
1+b+c=\frac1{26},
$$

したがって

$$
b+c=-\frac{25}{26}.
$$

これを式 (1) とします。

$x=1/2$ では

$$
f(1/2)
=
\frac1{1+25/4}
=
\frac4{29}.
$$

従って

$$
1+\frac b4+\frac c{16}
=
\frac4{29}.
$$

両辺から1を引くと

$$
\frac b4+\frac c{16}
=
-\frac{25}{29}.
$$

16倍して

$$
4b+c
=
-\frac{400}{29}.
$$

これを式 (2) とします。

(2)から(1)を引くと

$$
3b
=
-\frac{400}{29}
+
\frac{25}{26}.
$$

通分して

$$
3b
=
\frac{-10400+725}{754}
=
-\frac{9675}{754}.
$$

よって

$$
b
=
-\frac{3225}{754}.
$$

(1)から

$$
c
=
-\frac{25}{26}
+
\frac{3225}{754}.
$$

$\frac{25}{26}=\frac{725}{754}$ なので

$$
c
=
\frac{2500}{754}.
$$

従って

$$
\boxed{
p_4(x)
=
\frac{
2500x^4-3225x^2+754
}{754}
}.
$$

#### 3. $x=0.9$ で比較

$x=9/10$ とします。

真値は

$$
f(9/10)
=
\frac1{1+25\cdot81/100}
=
\frac1{85/4}
=
\boxed{\frac4{85}}
\approx0.04706.
$$

二次補間は

$$
\begin{aligned}
p_2(9/10)
&=
1-\frac{25}{26}\frac{81}{100}\\
&=
1-\frac{81}{104}\\
&=
\boxed{\frac{23}{104}}
\approx0.22115.
\end{aligned}
$$

従って誤差は

$$
\left|
\frac{23}{104}-\frac4{85}
\right|
=
\boxed{
\frac{1539}{8840}
}
\approx0.17410.
$$

四次補間は

$$
p_4(9/10)
=
\boxed{
-\frac{109}{377}
}
\approx-0.28912.
$$

従って誤差は

$$
\left|
-\frac{109}{377}-\frac4{85}
\right|
=
\boxed{
\frac{10773}{32045}
}
\approx0.33619.
$$

したがって

$$
0.33619>0.17410
$$

であり、次数を2から4へ上げたのに、この点での誤差は増えました。

#### 4. 誤差公式から読む

誤差公式は

$$
f(x)-p_n(x)
=
\frac{f^{(n+1)}(\xi)}{(n+1)!}
\omega_{n+1}(x)
$$

です。

次数を増やすと分母の $(n+1)!$ は大きくなりますが、それだけを見てはいけません。

同時に

$$
f^{(n+1)}(\xi)
$$

も高階になり、その大きさは増え得ます。

さらに等間隔節点では

$$
\omega_{n+1}(x)
$$

が端点付近で十分小さくならないことがあります。

したがって、次数増加だけから誤差減少は結論できません。

この例では実際に端点に近い $x=0.9$ で四次補間の方が悪化しました。

#### 5. Chebyshev 節点が改善するもの

Chebyshev 節点を使うと、節点多項式は

$$
\omega_{n+1}(x)
=
2^{-n}T_{n+1}(x)
$$

となり、

$$
\|\omega_{n+1}\|_\infty
=
2^{-n}.
$$

Chebyshev 最小最大定理により、これは 最高次係数が1の $n+1$ 次節点多項式の一様ノルムとして最小可能です。

したがって、誤差上界

$$
\|f-p_n\|_\infty
\le
\frac{
\max|f^{(n+1)}|
}{
(n+1)!
}
\|\omega_{n+1}\|_\infty
$$

のうち、**節点だけで制御できる因子**を最小にします。

ただし

$$
f^{(n+1)}(\xi)
$$

の実際の値や、補間誤差の符号・相殺までは節点多項式だけで決まりません。

したがって「Chebyshev 節点が任意の関数・任意の次数で実際の誤差を必ず最小化する」と主張するのは強すぎます。

正しい結論は、

> Chebyshev 節点は、標準的な補間誤差評価に現れる節点多項式の最大値を最小化する。

です。

---

## 16. まとめ

多項式補間では、まず相異なる $n+1$ 点に対して

$$
p_n\in\mathcal P_n
$$

が一意に存在します。

Lagrange 形は

$$
p_n(x)
=
\sum_{i=0}^n f(x_i)\ell_i(x)
$$

と各データ値の寄与を直接見せます。

Newton 形は

$$
p_n(x)
=
f[x_0]
+
\sum_{k=1}^n
f[x_0,\dots,x_k]
\prod_{j=0}^{k-1}(x-x_j)
$$

と、節点を追加しやすい増分構造を持ちます。

誤差は

$$
f(x)-p_n(x)
=
\frac{f^{(n+1)}(\xi)}{(n+1)!}
\omega_{n+1}(x)
$$

であり、

~~~text
関数の滑らかさ
×
節点配置
~~~

に分かれます。

Chebyshev 節点は $[-1,1]$ 上で節点多項式の一様ノルムを最小にし、等間隔高次補間で現れる Runge 現象を理解するための基準になります。

さらにデータ誤差に対しては

$$
\|\widetilde p_n-p_n\|_\infty
\le
\Lambda_n\max_i|\delta_i|
$$

があり、補間近似の精度とデータ感度を区別する必要があります。

次の NA5「数値積分・直交多項式・Gauss 型積分」では、補間多項式を積分するという発想から Newton--Cotes 型公式へ進み、さらに節点そのものを積分精度のために設計する Gauss 型積分へ進みます。
