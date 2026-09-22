# NA5 数値解析 V：数値積分・直交多項式・Gauss 型積分

積分

$$
I_w(f)=\int_a^b w(x)f(x)\,dx
$$

を計算したいが、積分値を閉じた式では評価できない。あるいは $f$ 自体が高価な数値計算の出力で、有限個の点でしか評価したくない。数値積分は、この状況で積分を

$$
Q(f)=\sum_{i=1}^m A_i f(x_i)
$$

という有限和へ置き換える理論です。

ここで本当に問うべきなのは「公式を覚えているか」ではありません。

- どの多項式まで厳密に積分できるのか。
- 補間を積分すると、なぜ台形則や Simpson 則が出てくるのか。
- 一つの高次数公式と、低次数公式を細かく複合する方法はどう違うのか。
- 節点を自由に選ぶと、なぜ $m$ 点だけで $2m-1$ 次まで厳密にできるのか。
- その最適な節点が、なぜ特別な多項式の零点として現れるのか。
- 滑らかな一般関数では、残った誤差を何が支配するのか。

本章では

~~~text
Lagrange 補間
  ↓ 積分する
補間を積分した有限和
  ↓ 等間隔節点
等間隔節点の公式
  ↓ 区間を細分
複合台形則・複合 Simpson 則
  ↓ 節点も設計する
重み関数付き積分で直交化する多項式
  ↓ 零点を節点にする
Gauss 求積
  ↓
2m-1 次正確性・正の重み・最適性・誤差公式
~~~

という流れで構成します。

直接の前提は

- [RA4 Riemann/Darboux 積分・微積分学の基本定理](../RA4/index.md)
- [NA4 多項式補間](../NA4/index.md)
- [F0-00E1 内積・Gram--Schmidt・直交射影](../F0_00E1_内積_Gram_Schmidt_射影_QR/index.md)

です。

特に

- [Riemann 積分の線形性](../RA4/index.md#thm-ra4-integral-properties)
- [Lagrange 基底](../NA4/index.md#def-na4-lagrange-basis)
- [多項式補間の存在一意性](../NA4/index.md#thm-na4-lagrange-interpolation)
- [Rolle の定理](../RA3/index.md#thm-ra3-rolle)
- [Gram--Schmidt 直交化法](../F0_00E1_内積_Gram_Schmidt_射影_QR/index.md#thm-f0-00e1-gram-schmidt)

を既知として使います。

<!-- definition-example-audit: strict -->

---

## 0. 積分を有限個の関数値へ置き換える

本章では $a<b$ とし、重み関数 $w$ は $[a,b]$ 上連続で

$$
w(x)>0
$$

を満たすとします。等間隔節点を扱う前半では $w\equiv1$ を使います。

<a id="def-na5-quadrature"></a>
<!-- formal-statement-start -->
### 定義（求積公式）

相異なる節点

$$
x_1,\dots,x_m\in[a,b]
$$

と実数の重み

$$
A_1,\dots,A_m
$$

を用いて

$$
\boxed{
Q(f)=\sum_{i=1}^m A_i f(x_i)
}
$$

と置く。

重み付き積分

$$
I_w(f)=\int_a^b w(x)f(x)\,dx
$$

を $Q(f)$ で近似する公式を **求積公式**という。
<!-- formal-statement-end -->

<!-- definition-example-start: def-na5-quadrature -->
**定義の確認**。$[0,1]$、$w\equiv1$ で

$$
Q(f)=\frac{f(0)+f(1)}2
$$

と置けば、節点は $0,1$、重みはどちらも $1/2$ です。

$f(x)=x^2$ なら

$$
I(f)=\int_0^1x^2\,dx=\frac13,
\qquad
Q(f)=\frac12.
$$

したがって求積公式は「積分そのもの」ではなく、一般には誤差を持つ有限和です。
<!-- definition-example-end -->

<a id="def-na5-degree-exactness"></a>
<!-- formal-statement-start -->
### 定義（正確次数）

求積公式 $Q$ が、すべての $p\in\mathcal P_d$ に対して

$$
Q(p)=I_w(p)
$$

を満たすとする。

さらに次数 $d+1$ の多項式ではこの等式が一般には成り立たないとき、$d$ を $Q$ の **正確次数**という。
<!-- formal-statement-end -->

<!-- definition-example-start: def-na5-degree-exactness -->
**定義の確認**。$[-1,1]$ の中点則

$$
Q_M(f)=2f(0)
$$

を考えます。

定数 $1$ では

$$
Q_M(1)=2=\int_{-1}^1 1\,dx,
$$

一次関数 $x$ では

$$
Q_M(x)=0=\int_{-1}^1x\,dx.
$$

しかし $x^2$ では

$$
Q_M(x^2)=0
\ne
\frac23
=
\int_{-1}^1x^2\,dx.
$$

よって中点則の正確次数は $1$ です。
<!-- definition-example-end -->

正確次数は、滑らかな一般関数に対する誤差を考える前の最初の物差しです。多項式で完全に消える部分が大きいほど、Taylor 展開や補間誤差で残る項も高階へ押し上げられます。

---

## 1. Lagrange 補間を積分して有限和を作る

相異なる節点 $x_1,\dots,x_m$ に対する Lagrange 基底を $\ell_i$ とします。すなわち

$$
\ell_i(x_j)=\delta_{ij}.
$$

<a id="thm-na5-interpolatory-quadrature"></a>
<!-- formal-statement-start -->
### 定理（補間型求積公式）

Lagrange 基底 $\ell_1,\dots,\ell_m$ に対し

$$
\boxed{
A_i=\int_a^b w(x)\ell_i(x)\,dx
}
$$

と置く。

このとき

$$
Q(f)=\sum_{i=1}^m A_i f(x_i)
$$

はすべての $p\in\mathcal P_{m-1}$ を厳密に積分する。

すなわち

$$
Q(p)=I_w(p)
\qquad
(p\in\mathcal P_{m-1})
$$

である。
<!-- formal-statement-end -->

<!-- proof-start -->
### 証明

$p\in\mathcal P_{m-1}$ とします。

[NA4 の Lagrange 補間公式](../NA4/index.md#thm-na4-lagrange-interpolation)より、節点 $x_1,\dots,x_m$ 上での補間多項式は $p$ 自身なので

$$
p(x)
=
\sum_{i=1}^m p(x_i)\ell_i(x)
$$

が恒等的に成り立ちます。

両辺へ $w(x)$ を掛けて積分し、[Riemann 積分の線形性](../RA4/index.md#thm-ra4-integral-properties)を使うと

$$
\begin{aligned}
I_w(p)
&=
\int_a^b
w(x)
\sum_{i=1}^m p(x_i)\ell_i(x)\,dx\\
&=
\sum_{i=1}^m
p(x_i)
\int_a^b w(x)\ell_i(x)\,dx\\
&=
\sum_{i=1}^m A_i p(x_i)\\
&=
Q(p).
\end{aligned}
$$

したがって少なくとも $m-1$ 次までは厳密です。

$\square$
<!-- proof-end -->

ここで重要なのは、求積重み $A_i$ が暗記対象ではなく

$$
\text{Lagrange 基底を積分したもの}
$$

だという点です。

---

## 2. 等間隔節点を使う公式

<a id="def-na5-newton-cotes"></a>
<!-- formal-statement-start -->
### 定義（Newton--Cotes 公式）

$w\equiv1$ とする。

区間 $[a,b]$ に等間隔節点

$$
x_i
=
a+i\frac{b-a}{n},
\qquad
i=0,\dots,n
$$

を取り、その Lagrange 基底を積分して得られる補間型求積公式を **閉 Newton--Cotes 公式**という。

端点を使わず、内部の等間隔節点から作るものを **開 Newton--Cotes 公式**という。
<!-- formal-statement-end -->

<!-- definition-example-start: def-na5-newton-cotes -->
**定義の確認**。$n=1$ の閉 Newton--Cotes では節点は $a,b$ です。

Lagrange 基底は

$$
\ell_0(x)=\frac{b-x}{b-a},
\qquad
\ell_1(x)=\frac{x-a}{b-a}.
$$

したがって

$$
\int_a^b\ell_0(x)\,dx
=
\int_a^b\ell_1(x)\,dx
=
\frac{b-a}{2}.
$$

よって

$$
\boxed{
T(f)
=
\frac{b-a}{2}\{f(a)+f(b)\}
}
$$

を得ます。これが **台形則**です。
<!-- definition-example-end -->

### $n=2$：Simpson 則

節点を

$$
a,\qquad
m=\frac{a+b}{2},\qquad
b
$$

とします。

補間型求積公式の重みを計算すると

$$
\boxed{
S(f)
=
\frac{b-a}{6}
\left\{
f(a)+4f(m)+f(b)
\right\}.
}
$$

これが **Simpson 則**です。

補間多項式は二次式なので、[補間型求積公式](#thm-na5-interpolatory-quadrature)から少なくとも二次までは厳密です。しかし Simpson 則には対称性があり、実際には三次式まで厳密です。

標準区間 $[-1,1]$ で

$$
S(f)
=
\frac13\{f(-1)+4f(0)+f(1)\}
$$

と書くと、

$$
S(1)=2,
\qquad
S(x)=0,
\qquad
S(x^2)=\frac23,
\qquad
S(x^3)=0.
$$

これはそれぞれ厳密な積分値と一致します。

一方

$$
S(x^4)=\frac23
\ne
\frac25
=
\int_{-1}^1x^4\,dx.
$$

したがって Simpson 則の正確次数は $3$ です。

### 一点の開 Newton--Cotes：中点則

中点だけを使えば

$$
\boxed{
M(f)
=
(b-a)f\left(\frac{a+b}{2}\right).
}
$$

定数には厳密です。さらに区間中心に関する奇関数部分の積分が0になるため、一次式まで厳密です。

---

## 3. 高次数公式を一発で使うより、低次数公式を複合する

NA4 では、等間隔節点の高次数補間が端点付近で不安定になり得ることを [Runge 現象](../NA4/index.md#thm-na4-interpolation-error) と節点配置の議論から見ました。

数値積分でも同じ発想が重要です。

一つの区間全体へ非常に高次数の Newton--Cotes 公式を当てる代わりに、

1. 区間を短い小区間へ分ける。
2. 各小区間で低次数公式を使う。
3. 結果を足す。

という **複合則**を使います。

---

## 4. 複合台形則：局所の $h^3$ 誤差が、大域では $h^2$ になる

等分点

$$
x_j=a+jh,
\qquad
h=\frac{b-a}{N},
\qquad
j=0,\dots,N
$$

を取ります。

複合台形則は

$$
\boxed{
T_N(f)
=
h
\left\{
\frac{f(x_0)+f(x_N)}2
+
\sum_{j=1}^{N-1}f(x_j)
\right\}.
}
$$

<a id="thm-na5-composite-trapezoidal-error"></a>
<!-- formal-statement-start -->
### 定理（複合台形則の誤差評価）

$f\in C^2([a,b])$ とする。

このとき

$$
\boxed{
\left|
I(f)-T_N(f)
\right|
\le
\frac{b-a}{12}h^2
\max_{a\le x\le b}|f''(x)|
}
$$

が成り立つ。
<!-- formal-statement-end -->

<!-- proof-start -->
### 証明

まず一つの小区間 $[u,v]$ を考え、幅を

$$
h=v-u
$$

とします。

$$
k(x)=(x-u)(v-x)
$$

と置くと

$$
k(u)=k(v)=0,
\qquad
k'(u)=h,
\qquad
k'(v)=-h,
\qquad
k''(x)=-2.
$$

部分積分を2回行うと

$$
\begin{aligned}
\int_u^v k(x)f''(x)\,dx
&=
-\int_u^v k'(x)f'(x)\,dx\\
&=
-\left[k'(x)f(x)\right]_u^v
+
\int_u^v k''(x)f(x)\,dx\\
&=
h\{f(u)+f(v)\}
-
2\int_u^v f(x)\,dx.
\end{aligned}
$$

したがって

$$
\int_u^v f(x)\,dx
-
\frac h2\{f(u)+f(v)\}
=
-\frac12
\int_u^v
(x-u)(v-x)f''(x)\,dx.
$$

よって

$$
\begin{aligned}
\left|
\int_u^v f(x)\,dx
-
\frac h2\{f(u)+f(v)\}
\right|
&\le
\frac12
\max_{u\le x\le v}|f''(x)|
\int_u^v(x-u)(v-x)\,dx\\
&=
\frac{h^3}{12}
\max_{u\le x\le v}|f''(x)|.
\end{aligned}
$$

これを $N$ 個の小区間で足すと

$$
|I(f)-T_N(f)|
\le
N\frac{h^3}{12}
\max_{a\le x\le b}|f''(x)|.
$$

最後に

$$
Nh=b-a
$$

を使えば

$$
|I(f)-T_N(f)|
\le
\frac{b-a}{12}h^2
\max_{a\le x\le b}|f''(x)|.
$$

$\square$
<!-- proof-end -->

ここで

$$
\text{一小区間の誤差}\le C h^3
$$

でも、小区間数が

$$
N=\frac{b-a}{h}
$$

個あるため、大域誤差は

$$
C(b-a)h^2
$$

の大きさになります。

「局所誤差の指数をそのまま大域誤差の指数だと思わない」ことは、後続の時間離散化・差分法でも繰り返し現れます。

---

## 5. 複合 Simpson 則：対称性が四階微分まで誤差を押し上げる

$N$ を偶数とし

$$
h=\frac{b-a}{N}
$$

とします。

複合 Simpson 則は

$$
\boxed{
S_N(f)
=
\frac h3
\left[
f(x_0)+f(x_N)
+
4\sum_{\substack{1\le j\le N-1\\j\ {\rm odd}}}f(x_j)
+
2\sum_{\substack{2\le j\le N-2\\j\ {\rm even}}}f(x_j)
\right].
}
$$

局所誤差を厳密に追うため、まず標準区間 $[-1,1]$ 上の Simpson 誤差汎関数

$$
L(f)
=
\int_{-1}^1f(x)\,dx
-
\frac13\{f(-1)+4f(0)+f(1)\}
$$

を考えます。

$L$ は三次以下の多項式をすべて消します。

### 一組の局所誤差を Rolle の定理から導く

中心 $c$、半幅 $h>0$ の区間

$$
[c-h,c+h]
$$

を考えます。

まず、条件

$$
H(c-h)=f(c-h),
\qquad
H(c)=f(c),
\qquad
H'(c)=f'(c),
\qquad
H(c+h)=f(c+h)
$$

を満たす

$$
H\in\mathcal P_3
$$

が一意に存在することを確認します。

線形写像

$$
\mathcal P_3\longrightarrow\mathbb R^4,
\qquad
p\longmapsto
\bigl(
p(c-h),p(c),p'(c),p(c+h)
\bigr)
$$

を考えます。

この写像の核に属する $p$ は、$c-h,c+h$ を零点に持ち、$c$ を少なくとも二重零点に持ちます。従って

$$
(x-(c-h))(x-c)^2(x-(c+h))
$$

が $p$ を割ります。

左辺は四次式ですが $\deg p\le3$ なので、核は零多項式だけです。

よって写像は単射であり、定義域・値域はともに4次元なので全射です。従って $H$ は一意に存在します。

次に固定した

$$
x\in[c-h,c+h]
$$

が三つの節点 $c-h,c,c+h$ のいずれでもないとします。

$$
\omega(t)
=
(t-(c-h))(t-c)^2(t-(c+h))
$$

と置き、

$$
C_x
=
\frac{f(x)-H(x)}{\omega(x)},
$$

$$
\Phi(t)
=
f(t)-H(t)-C_x\omega(t)
$$

とします。

$\Phi$ は $c-h$ と $c+h$ で零点を持ち、$c$ では値と一階微分が0なので二重零点を持ち、さらに $x$ でも0です。

従って重複度を数えて少なくとも5個の零点があります。

[Rolle の定理](../RA3/index.md#thm-ra3-rolle)を4回反復すると、ある

$$
\xi_x\in(c-h,c+h)
$$

が存在して

$$
\Phi^{(4)}(\xi_x)=0.
$$

$H$ は三次以下なので

$$
H^{(4)}=0,
$$

また $\omega$ は最高次係数1の四次式なので

$$
\omega^{(4)}=4!.
$$

従って

$$
f(x)-H(x)
=
\frac{f^{(4)}(\xi_x)}{4!}
\omega(x).
$$

節点では両辺とも0なので、この表示は区間全体で使えます。

ここで

$$
\omega(x)
=
\bigl((x-c)^2-h^2\bigr)(x-c)^2
\le0
$$

です。

さらに Simpson 則は三次以下を厳密に積分し、$H$ は $f$ と三つの Simpson 節点で同じ値を取るので

$$
S(H)=S(f),
\qquad
S(H)=\int_{c-h}^{c+h}H(x)\,dx.
$$

従って

$$
\int_{c-h}^{c+h}f(x)\,dx-S(f)
=
\int_{c-h}^{c+h}\{f(x)-H(x)\}\,dx.
$$

$f^{(4)}$ の最小値・最大値と $\omega\le0$ を使うと、連続性によりある

$$
\xi\in(c-h,c+h)
$$

が存在して

$$
\int_{c-h}^{c+h}f(x)\,dx-S(f)
=
\frac{f^{(4)}(\xi)}{4!}
\int_{c-h}^{c+h}\omega(x)\,dx.
$$

$y=x-c$ と置けば

$$
\begin{aligned}
\int_{c-h}^{c+h}\omega(x)\,dx
&=
\int_{-h}^{h}(y^4-h^2y^2)\,dy\\
&=
\frac{2h^5}{5}
-
\frac{2h^5}{3}\\
&=
-\frac{4h^5}{15}.
\end{aligned}
$$

よって

$$
\boxed{
\int_{c-h}^{c+h}f(x)\,dx
-
\frac h3
\{f(c-h)+4f(c)+f(c+h)\}
=
-\frac{h^5}{90}f^{(4)}(\xi)
}.
$$

この局所公式から複合則の大域評価を導きます。

<a id="thm-na5-composite-simpson-error"></a>
<!-- formal-statement-start -->
### 定理（複合 Simpson 則の誤差評価）

$f\in C^4([a,b])$、$N$ は偶数とする。

このとき

$$
\boxed{
|I(f)-S_N(f)|
\le
\frac{b-a}{180}h^4
\max_{a\le x\le b}|f^{(4)}(x)|
}
$$

が成り立つ。
<!-- formal-statement-end -->

<!-- proof-start -->
### 証明

小区間を2個ずつまとめます。一組の幅は $2h$ で、その組に対する局所 Simpson 誤差の絶対値は

$$
\frac{h^5}{90}
\max|f^{(4)}|
$$

以下です。

組の個数は $N/2$ なので

$$
\begin{aligned}
|I(f)-S_N(f)|
&\le
\frac N2
\frac{h^5}{90}
\max_{[a,b]}|f^{(4)}|\\
&=
\frac{Nh}{180}
h^4
\max_{[a,b]}|f^{(4)}|\\
&=
\frac{b-a}{180}
h^4
\max_{[a,b]}|f^{(4)}|.
\end{aligned}
$$

$\square$
<!-- proof-end -->

複合台形則では二階微分、複合 Simpson 則では四階微分が現れました。

これは単なる公式上の偶然ではありません。

$$
\text{どの次数まで多項式を厳密に積分できるか}
$$

が、一般関数で最初に残る高階微分を決めています。

---

## 6. 節点まで自由に選ぶ：重み付き直交多項式

Newton--Cotes では節点を等間隔に固定しました。

Gauss 求積では逆に、

> 与えられた点数で、正確次数を最大にするには節点をどこへ置けばよいか

を考えます。

<a id="def-na5-orthogonal-polynomial"></a>
<!-- formal-statement-start -->
### 定義（重み付き多項式内積・直交多項式）

$w\in C([a,b])$ が $w(x)>0$ を満たすとする。

多項式 $p,q$ に対して

$$
\boxed{
\langle p,q\rangle_w
=
\int_a^b w(x)p(x)q(x)\,dx
}
$$

と置く。

次数 $n$ の多項式 $\pi_n$ が

$$
\langle \pi_n,q\rangle_w=0
\qquad
(q\in\mathcal P_{n-1})
$$

を満たすとき、$\pi_n$ を **$n$ 次直交多項式**という。

最高次係数が1のものを **モニック直交多項式**という。
<!-- formal-statement-end -->

<!-- definition-example-start: def-na5-orthogonal-polynomial -->
**定義の確認**。$[-1,1]$、$w\equiv1$ では

$$
\pi_0(x)=1,
\qquad
\pi_1(x)=x,
\qquad
\pi_2(x)=x^2-\frac13
$$

と取れます。

実際、

$$
\int_{-1}^1
\left(x^2-\frac13\right)\,dx
=
\frac23-\frac23
=
0,
$$

また

$$
\int_{-1}^1
x\left(x^2-\frac13\right)\,dx
=
0
$$

です。

したがって $\pi_2$ は $\mathcal P_1$ のすべての多項式に直交します。
<!-- definition-example-end -->

<a id="prop-na5-orthogonal-existence"></a>
<!-- formal-statement-start -->
### 命題（モニック直交多項式の存在一意性）

各 $n\ge0$ に対して、$n$ 次モニック直交多項式 $\pi_n$ はただ一つ存在する。
<!-- formal-statement-end -->

<!-- proof-start -->
### 証明

$w(x)>0$ なので、0でない多項式 $p$ に対して

$$
\langle p,p\rangle_w
=
\int_a^b w(x)p(x)^2\,dx
>
0.
$$

したがって $\langle\cdot,\cdot\rangle_w$ は各有限次元多項式空間上の内積です。

$1,x,\dots,x^n$ に [Gram--Schmidt 直交化法](../F0_00E1_内積_Gram_Schmidt_射影_QR/index.md#thm-f0-00e1-gram-schmidt)を適用すれば、$x^n$ から $\mathcal P_{n-1}$ 成分を引いた $n$ 次直交多項式が得られます。最高次係数は $x^n$ 由来で1なので、モニックです。これで存在が示されました。

一意性を示します。

$\pi_n$ と $\widetilde\pi_n$ がともにモニック直交多項式なら

$$
r=\pi_n-\widetilde\pi_n
$$

は最高次項が消えるため

$$
r\in\mathcal P_{n-1}.
$$

両者は $\mathcal P_{n-1}$ に直交するので

$$
\langle r,r\rangle_w
=
\langle \pi_n-\widetilde\pi_n,r\rangle_w
=
0.
$$

内積の正定値性から $r=0$、従って

$$
\pi_n=\widetilde\pi_n.
$$

$\square$
<!-- proof-end -->

---

## 7. 直交多項式の零点は、すべて区間内部の単純零点になる

Gauss 求積の節点は、直交多項式の零点です。

その前に「本当に $n$ 個の使える実零点があるのか」を閉じます。

<a id="thm-na5-orthogonal-roots"></a>
<!-- formal-statement-start -->
### 定理（直交多項式の零点定理）

$w\in C([a,b])$、$w(x)>0$ とし、$\pi_n$ を $n$ 次直交多項式とする。

このとき $\pi_n$ は開区間 $(a,b)$ に相異なる $n$ 個の零点を持つ。

従って、その零点はすべて単純零点である。
<!-- formal-statement-end -->

<!-- proof-start -->
### 証明

$\pi_n$ が $(a,b)$ 内で符号を変える相異なる零点を

$$
r_1,\dots,r_m
$$

とします。

もし

$$
m<n
$$

なら

$$
q(x)=\prod_{j=1}^m(x-r_j)
$$

と置くと

$$
\deg q=m<n
$$

なので

$$
q\in\mathcal P_{n-1}.
$$

各 $r_j$ で $\pi_n$ と $q$ はともに符号を変えます。したがって積

$$
\pi_n(x)q(x)
$$

は $r_j$ を通過しても符号を変えません。

一方、$\pi_n$ の偶数重零点や区間外の零点は、そもそも $(a,b)$ 内で符号変化を起こしません。

従って $\pi_n q$ は $[a,b]$ 上で一定符号を持ち、零多項式ではありません。

さらに $w(x)>0$ なので

$$
\int_a^b
w(x)\pi_n(x)q(x)\,dx
\ne0.
$$

しかし $q\in\mathcal P_{n-1}$ であり、$\pi_n$ は $\mathcal P_{n-1}$ に直交するため

$$
\int_a^b
w(x)\pi_n(x)q(x)\,dx
=
0.
$$

矛盾です。

したがって

$$
m\ge n.
$$

$n$ 次多項式が相異なる零点を $n$ 個より多く持つことはできないので

$$
m=n.
$$

よって $\pi_n$ の全次数は $(a,b)$ 内の $n$ 個の符号変化零点だけで使い切られます。各零点の重複度は1でなければなりません。

$\square$
<!-- proof-end -->

この証明で $w>0$ が使われた場所は明確です。

$$
\pi_n q
$$

が一定符号でも、重み $w$ が符号を変えれば積分が相殺される可能性があります。正の重みという仮定が、零点の幾何を保証しています。

---

## 8. Gauss 求積：直交多項式の零点を節点にすると次数が倍近く伸びる

$\pi_n$ の $n$ 個の零点を

$$
x_1,\dots,x_n
$$

とします。

これらを節点とする Lagrange 基底を $\ell_i$ とし、

$$
A_i
=
\int_a^b w(x)\ell_i(x)\,dx
$$

と置きます。

<a id="def-na5-gauss-quadrature"></a>
<!-- formal-statement-start -->
### 定義（Gauss 求積公式）

$n$ 次モニック直交多項式 $\pi_n$ の零点

$$
x_1,\dots,x_n
$$

を節点とする補間型求積公式

$$
\boxed{
G_n(f)
=
\sum_{i=1}^n A_i f(x_i),
\qquad
A_i
=
\int_a^b w(x)\ell_i(x)\,dx
}
$$

を **$n$ 点 Gauss 求積公式**という。
<!-- formal-statement-end -->

<!-- definition-example-start: def-na5-gauss-quadrature -->
**定義の確認**。$[-1,1]$、$w\equiv1$、$n=2$ では

$$
\pi_2(x)=x^2-\frac13
$$

なので節点は

$$
x_1=-\frac1{\sqrt3},
\qquad
x_2=\frac1{\sqrt3}.
$$

この二点の Lagrange 基底は

$$
\ell_1(x)
=
\frac{1-\sqrt3x}{2},
\qquad
\ell_2(x)
=
\frac{1+\sqrt3x}{2}.
$$

従って定義どおりに重みを積分すると

$$
A_1
=
\int_{-1}^1\ell_1(x)\,dx
=
1,
\qquad
A_2
=
\int_{-1}^1\ell_2(x)\,dx
=
1.
$$

よって

$$
G_2(f)
=
f\left(-\frac1{\sqrt3}\right)
+
f\left(\frac1{\sqrt3}\right)
$$

を得ます。
<!-- definition-example-end -->

<a id="thm-na5-gauss-exactness"></a>
<!-- formal-statement-start -->
### 定理（Gauss 求積公式の 2n-1 次正確性）

$n$ 点 Gauss 求積公式 $G_n$ は、すべての

$$
p\in\mathcal P_{2n-1}
$$

を厳密に積分する。

すなわち

$$
\boxed{
G_n(p)
=
\int_a^b w(x)p(x)\,dx
}
$$

である。
<!-- formal-statement-end -->

<!-- proof-start -->
### 証明

$p\in\mathcal P_{2n-1}$ とします。

$\pi_n$ は最高次係数1の $n$ 次多項式です。$p$ の最高次項から順に $\pi_n$ の適切な倍を引いて次数を下げていけば、一意に

$$
p=q\pi_n+r
$$

と書けます。ただし

$$
\deg q\le n-1,
\qquad
\deg r\le n-1.
$$

まず積分を考えます。

$q\in\mathcal P_{n-1}$ であり、$\pi_n$ は $\mathcal P_{n-1}$ に直交するので

$$
\int_a^b w(x)q(x)\pi_n(x)\,dx
=
0.
$$

従って

$$
I_w(p)=I_w(r).
$$

次に求積公式を考えます。

節点 $x_i$ は $\pi_n$ の零点なので

$$
\pi_n(x_i)=0.
$$

従って

$$
p(x_i)=r(x_i),
$$

よって

$$
G_n(p)=G_n(r).
$$

$r$ の次数は $n-1$ 以下です。Gauss 求積は[補間型求積公式](#thm-na5-interpolatory-quadrature)なので、その定理より

$$
G_n(r)=I_w(r).
$$

以上をつなぐと

$$
G_n(p)
=
G_n(r)
=
I_w(r)
=
I_w(p).
$$

$\square$
<!-- proof-end -->

証明の核心は

$$
p=q\pi_n+r
$$

です。

- 節点では $\pi_n=0$ なので $q\pi_n$ は求積和から消える。
- 積分では直交性により $q\pi_n$ が消える。

同じ項を「節点側」と「積分側」の両方で消すために、直交多項式の零点を節点へ選んでいます。

---

## 9. Gauss の重みは正であり、正確次数 $2n-1$ は n 点公式の限界である

<a id="prop-na5-gauss-positive-weights"></a>
<!-- formal-statement-start -->
### 命題（Gauss 求積公式の重みの正値性）

$n$ 点 Gauss 求積公式の重みは

$$
A_i>0
\qquad
(i=1,\dots,n)
$$

を満たす。
<!-- formal-statement-end -->

<!-- proof-start -->
### 証明

$i$ 番目の Lagrange 基底 $\ell_i$ を考えます。

$$
\ell_i^2
$$

の次数は $2n-2$ 以下なので、Gauss 求積の $2n-1$ 次正確性を使えます。

従って

$$
\int_a^b w(x)\ell_i(x)^2\,dx
=
G_n(\ell_i^2).
$$

一方

$$
\ell_i(x_j)=\delta_{ij}
$$

なので

$$
G_n(\ell_i^2)
=
\sum_{j=1}^n
A_j\ell_i(x_j)^2
=
A_i.
$$

従って

$$
A_i
=
\int_a^b w(x)\ell_i(x)^2\,dx.
$$

$w>0$ で $\ell_i$ は零多項式ではないため

$$
A_i>0.
$$

$\square$
<!-- proof-end -->

正の重みから直ちに

$$
\sum_{i=1}^nA_i
=
\int_a^bw(x)\,dx
$$

と

$$
|G_n(f)|
\le
\left(\int_a^b w(x)\,dx\right)
\max_{[a,b]}|f(x)|
$$

が従います。

<a id="thm-na5-quadrature-upper-bound"></a>
<!-- formal-statement-start -->
### 定理（n 点求積公式の正確次数の上限）

$w(x)>0$ とする。

相異なる $n$ 個の節点を使う任意の $n$ 点求積公式は、次数 $2n$ のすべての多項式を厳密に積分することはできない。

従って $n$ 点求積公式の正確次数は高々

$$
2n-1
$$

である。
<!-- formal-statement-end -->

<!-- proof-start -->
### 証明

任意の節点を

$$
y_1,\dots,y_n
$$

とし、

$$
p(x)
=
\prod_{i=1}^n(x-y_i)^2
$$

と置きます。

$p$ は次数 $2n$ の多項式で

$$
p(y_i)=0
$$

なので、重みが何であっても

$$
Q(p)=0.
$$

一方

$$
p(x)\ge0
$$

で、零多項式ではありません。さらに $w(x)>0$ なので

$$
I_w(p)
=
\int_a^b
w(x)p(x)\,dx
>
0.
$$

従って

$$
Q(p)\ne I_w(p).
$$

よって次数 $2n$ の全多項式を厳密に積分する $n$ 点公式は存在しません。

$\square$
<!-- proof-end -->

Gauss 求積は正確次数 $2n-1$ を達成しました。

したがって

$$
\boxed{
\text{$n$ 点という制約の下で、Gauss 求積の正確次数は最適}
}
$$

です。

---

## 10. 2点 Gauss--Legendre 求積を最初から導く

$[-1,1]$、$w\equiv1$ とします。

二次モニック直交多項式は

$$
\pi_2(x)
=
x^2-\frac13.
$$

零点は

$$
\pm\frac1{\sqrt3}.
$$

対称性から両重みは等しいと見込めます。定数関数を厳密に積分する条件から

$$
A_1+A_2=2.
$$

さらに対称性より

$$
A_1=A_2
$$

なので

$$
A_1=A_2=1.
$$

従って

$$
\boxed{
G_2(f)
=
f\left(-\frac1{\sqrt3}\right)
+
f\left(\frac1{\sqrt3}\right)
}
$$

です。

実際、

$$
G_2(1)=2,
\qquad
G_2(x)=0,
$$

$$
G_2(x^2)
=
2\cdot\frac13
=
\frac23,
$$

$$
G_2(x^3)=0.
$$

したがって三次式まで厳密です。

しかし

$$
G_2(x^4)
=
2\cdot\frac19
=
\frac29
\ne
\frac25
=
\int_{-1}^1x^4\,dx.
$$

正確次数はちょうど

$$
3=2\cdot2-1
$$

です。

同じ2点でも、端点 $\{-1,1\}$ を使う台形則は一次までしか厳密ではありません。

「点数」だけでなく「点の置き方」が正確次数を決めています。

---

## 11. Gauss 求積の誤差は直交多項式の二乗で測られる

多項式以外の滑らかな関数では誤差が残ります。

その形を求めます。

<a id="thm-na5-gauss-error"></a>
<!-- formal-statement-start -->
### 定理（Gauss 求積の誤差公式）

$f\in C^{2n}([a,b])$ とし、$\pi_n$ を $n$ 次モニック直交多項式とする。

$n$ 点 Gauss 求積公式 $G_n$ に対して、ある

$$
\xi\in(a,b)
$$

が存在し

$$
\boxed{
I_w(f)-G_n(f)
=
\frac{f^{(2n)}(\xi)}{(2n)!}
\int_a^b
w(x)\pi_n(x)^2\,dx
}
$$

が成り立つ。
<!-- formal-statement-end -->

<!-- proof-start -->
### 証明

Gauss 節点を

$$
x_1,\dots,x_n
$$

とします。

まず、各節点で値と一階微分を一致させる多項式が本当に存在することを確認します。

線形写像

$$
\mathcal H:\mathcal P_{2n-1}\longrightarrow\mathbb R^{2n},
$$

$$
\mathcal H(p)
=
\bigl(
p(x_1),p'(x_1),\dots,p(x_n),p'(x_n)
\bigr)
$$

を考えます。

$\mathcal H(p)=0$ なら、各 $x_i$ は $p$ の少なくとも二重零点です。従って

$$
\prod_{i=1}^n(x-x_i)^2
$$

が $p$ を割ります。

左辺の次数は $2n$ ですが

$$
\deg p\le2n-1
$$

なので

$$
p=0.
$$

よって $\mathcal H$ は単射です。

一方

$$
\dim\mathcal P_{2n-1}=2n
=
\dim\mathbb R^{2n}
$$

なので、有限次元線形空間の同次元間の単射は全射でもあります。

従って一意な

$$
H\in\mathcal P_{2n-1}
$$

が存在して

$$
H(x_i)=f(x_i),
\qquad
H'(x_i)=f'(x_i)
\qquad
(i=1,\dots,n)
$$

を満たします。これがここで必要な Hermite 補間多項式です。

次に、その剰余を Rolle の定理だけから導きます。

$x$ が節点でないとし、

$$
\omega(t)
=
\prod_{i=1}^n(t-x_i)^2
=
\pi_n(t)^2
$$

と置きます。

さらに

$$
C_x
=
\frac{f(x)-H(x)}{\omega(x)}
$$

として

$$
\Phi(t)
=
f(t)-H(t)-C_x\omega(t)
$$

を考えます。

各節点 $x_i$ では

$$
\Phi(x_i)=0,
\qquad
\Phi'(x_i)=0
$$

です。また定義から

$$
\Phi(x)=0.
$$

したがって $\Phi$ は、重複度を数えると少なくとも $2n+1$ 個の零点を持ちます。

[Rolle の定理](../RA3/index.md#thm-ra3-rolle)を $2n$ 回反復すると、ある

$$
\xi_x\in(a,b)
$$

が存在して

$$
\Phi^{(2n)}(\xi_x)=0.
$$

$H$ の次数は $2n-1$ 以下なので

$$
H^{(2n)}=0.
$$

また $\omega=\pi_n^2$ は最高次係数1の $2n$ 次多項式だから

$$
\omega^{(2n)}=(2n)!.
$$

従って

$$
0
=
f^{(2n)}(\xi_x)
-
C_x(2n)!.
$$

すなわち

$$
C_x
=
\frac{f^{(2n)}(\xi_x)}{(2n)!}.
$$

$C_x$ の定義へ戻すと

$$
\boxed{
f(x)-H(x)
=
\frac{f^{(2n)}(\xi_x)}{(2n)!}
\pi_n(x)^2
}.
$$

$x$ が節点なら両辺とも0なので、この式は全 $x\in[a,b]$ で成り立つと読めます。

ここから求積誤差へ戻ります。

$H$ の次数は $2n-1$ 以下なので、Gauss 求積の正確性より

$$
G_n(H)=I_w(H).
$$

また $H(x_i)=f(x_i)$ なので

$$
G_n(H)=G_n(f).
$$

従って

$$
\begin{aligned}
I_w(f)-G_n(f)
&=
I_w(f)-I_w(H)\\
&=
\int_a^b
w(x)\{f(x)-H(x)\}\,dx.
\end{aligned}
$$

$f^{(2n)}$ の区間上の最小値・最大値を

$$
m
=
\min_{[a,b]}f^{(2n)},
\qquad
M
=
\max_{[a,b]}f^{(2n)}
$$

とします。

各 $x$ について

$$
m
\le
f^{(2n)}(\xi_x)
\le
M
$$

であり、

$$
w(x)\pi_n(x)^2\ge0.
$$

従って

$$
\frac{m}{(2n)!}
\int_a^b w(x)\pi_n(x)^2\,dx
\le
I_w(f)-G_n(f)
\le
\frac{M}{(2n)!}
\int_a^b w(x)\pi_n(x)^2\,dx.
$$

$f^{(2n)}$ は連続なので中間値をすべて取ります。

また

$$
\int_a^b w(x)\pi_n(x)^2\,dx>0
$$

です。

よってある $\xi\in(a,b)$ が存在して

$$
I_w(f)-G_n(f)
=
\frac{f^{(2n)}(\xi)}{(2n)!}
\int_a^b
w(x)\pi_n(x)^2\,dx.
$$

$\square$
<!-- proof-end -->

この公式では二つの要因が分離されています。

$$
\boxed{
\text{関数側}
=
f^{(2n)}
}
$$

と

$$
\boxed{
\text{節点・重み側}
=
\int_a^bw\pi_n^2
}
$$

です。

直交多項式は正確次数だけでなく、誤差定数にも直接現れます。

---

## 12. Newton--Cotes と Gauss をどう見分けるか

ここまでを比較します。

| 観点 | Newton--Cotes | Gauss |
|---|---|---|
| 節点 | 等間隔に固定 | 直交多項式の零点として設計 |
| 重み | Lagrange 基底を積分 | 同じく Lagrange 基底を積分 |
| $m$ 点で最低保証される正確次数 | $m-1$ | $2m-1$ |
| 長所 | 単純・複合則を作りやすい | 少ない関数評価で高い正確次数 |
| 注意 | 高次数化で重み・補間が悪化し得る | 節点計算と重み関数への依存がある |

Newton--Cotes を高次数にすることと、Gauss 求積で節点を最適化することは別物です。

また、Gauss 求積が「常に最善」という意味でもありません。

- 関数が非滑らかなら高階微分に基づく誤差公式は効きにくい。
- 被積分関数が有界でない箇所や滑らかでない点を持つなら、区間分割や変数変換が先に必要になる。
- 既に等間隔データしか持っていないなら Gauss 節点で新たに関数評価できない。
- 適応積分では局所誤差推定と区間細分が主役になる。

数値積分は「高い正確次数の公式を一つ選ぶ問題」ではなく、関数の情報と評価コストに合わせて離散化を設計する問題です。

---

## 13. 演習

### Level A

<a id="ex-na5-a1"></a>
#### NA5-A01 正確次数を判定する
- Level: A

$[-1,1]$ 上で次の公式の正確次数を求めよ。

1. 中点則
   $$
   Q_M(f)=2f(0)
   $$
2. 台形則
   $$
   Q_T(f)=f(-1)+f(1)
   $$
3. Simpson 則
   $$
   Q_S(f)=\frac13\{f(-1)+4f(0)+f(1)\}.
   $$

---

<a id="ex-na5-a2"></a>
#### NA5-A02 Lagrange 基底から Simpson 則を導く
- Level: A

節点

$$
-1,\qquad0,\qquad1
$$

の Lagrange 基底を構成し、それぞれを $[-1,1]$ 上で積分して Simpson 則の重み

$$
\frac13,\qquad\frac43,\qquad\frac13
$$

を導け。

---

<a id="ex-na5-a3"></a>
#### NA5-A03 複合台形則で $x^2$ を積分する
- Level: A

$[0,1]$ を $N$ 等分し、$f(x)=x^2$ に複合台形則を適用せよ。

1. $T_N(f)$ を $N$ の式として厳密に求めよ。
2. 真の積分値との差
   $$
   I(f)-T_N(f)
   $$
   を求めよ。
3. 複合台形則の誤差公式と一致することを確認せよ。

---

<a id="ex-na5-a4"></a>
#### NA5-A04 最初の Legendre 型直交多項式
- Level: A

$[-1,1]$、$w\equiv1$ とする。

$1,x,x^2$ をこの順に Gram--Schmidt 直交化し、最高次係数を1にそろえて

$$
\pi_0,\pi_1,\pi_2
$$

を求めよ。

---

### Level B

<a id="ex-na5-b1"></a>
#### NA5-B01 複合台形則の誤差を区間ごとに積み上げる
- Level: B

$f\in C^2([a,b])$ とし、$N$ 等分の複合台形則を考える。

一小区間 $[x_j,x_{j+1}]$ で

$$
E_j
=
-\frac12
\int_{x_j}^{x_{j+1}}
(x-x_j)(x_{j+1}-x)f''(x)\,dx
$$

が成り立つことから、

$$
|I(f)-T_N(f)|
\le
\frac{b-a}{12}h^2
\max|f''|
$$

を導け。

---

<a id="ex-na5-b2"></a>
#### NA5-B02 2点 Gauss--Legendre 求積を多項式の積分条件から再構成する
- Level: B

$[-1,1]$ 上で対称な2点公式

$$
Q(f)=A f(-c)+A f(c)
$$

を考える。

$1$ と $x^2$ を厳密に積分する条件から $A,c$ を決定し、この公式が三次式まで厳密であることを示せ。

---

<a id="ex-na5-b3"></a>
#### NA5-B03 正の Gauss 重みから安定性評価を導く
- Level: B

$n$ 点 Gauss 求積公式の重みが $A_i>0$ を満たすことを用いて

$$
\sum_{i=1}^nA_i
=
\int_a^b w(x)\,dx
$$

および

$$
|G_n(f)|
\le
\left(\int_a^bw(x)\,dx\right)
\max_{[a,b]}|f|
$$

を証明せよ。

さらに、任意の摂動 $\delta_i$ に対し

$$
\left|
\sum_{i=1}^n A_i\delta_i
\right|
\le
\left(\int_a^bw(x)\,dx\right)
\max_i|\delta_i|
$$

を示せ。

---

### Level C

<a id="ex-na5-c1"></a>
#### NA5-C01 3点 Gauss--Legendre 求積を構成する
- Level: C

$[-1,1]$、$w\equiv1$ とする。

1. 三次モニック直交多項式が
   $$
   \pi_3(x)=x^3-\frac35x
   $$
   であることを示せ。
2. Gauss 節点を求めよ。
3. 対称性と $1,x^2$ の厳密積分条件から重みを求めよ。
4. 得られた公式が五次式まで厳密であることを Gauss 求積定理から説明せよ。
5. $x^6$ では厳密でないことを直接確かめよ。
6. $f(x)=e^x$ に対する誤差の符号を Gauss 誤差公式から判定せよ。

---

## 14. 詳細解答

### A1 解答

#### 1. 中点則

$$
Q_M(1)=2=\int_{-1}^1 1\,dx,
$$

$$
Q_M(x)=0=\int_{-1}^1x\,dx.
$$

しかし

$$
Q_M(x^2)=0
$$

に対し

$$
\int_{-1}^1x^2\,dx=\frac23.
$$

従って正確次数は

$$
\boxed{1}.
$$

#### 2. 台形則

$$
Q_T(1)=2,
\qquad
Q_T(x)=(-1)+1=0.
$$

どちらも厳密な積分値と一致します。

しかし

$$
Q_T(x^2)=1+1=2
$$

に対し

$$
\int_{-1}^1x^2\,dx=\frac23.
$$

従って正確次数は

$$
\boxed{1}.
$$

#### 3. Simpson 則

$$
Q_S(1)
=
\frac13(1+4+1)
=
2,
$$

$$
Q_S(x)
=
\frac13(-1+0+1)
=
0,
$$

$$
Q_S(x^2)
=
\frac13(1+0+1)
=
\frac23,
$$

$$
Q_S(x^3)
=
\frac13(-1+0+1)
=
0.
$$

したがって三次式までは厳密です。

一方

$$
Q_S(x^4)
=
\frac23
$$

ですが

$$
\int_{-1}^1x^4\,dx
=
\frac25.
$$

従って正確次数は

$$
\boxed{3}.
$$

---

### A2 解答

節点 $-1,0,1$ の Lagrange 基底は

$$
\ell_{-1}(x)
=
\frac{x(x-1)}{(-1-0)(-1-1)}
=
\frac{x(x-1)}2,
$$

$$
\ell_0(x)
=
\frac{(x+1)(x-1)}{(0+1)(0-1)}
=
1-x^2,
$$

$$
\ell_1(x)
=
\frac{(x+1)x}{(1+1)(1-0)}
=
\frac{x(x+1)}2.
$$

それぞれ積分すると

$$
\int_{-1}^1\ell_{-1}(x)\,dx
=
\frac12
\int_{-1}^1(x^2-x)\,dx
=
\frac13,
$$

$$
\int_{-1}^1\ell_0(x)\,dx
=
\int_{-1}^1(1-x^2)\,dx
=
2-\frac23
=
\frac43,
$$

$$
\int_{-1}^1\ell_1(x)\,dx
=
\frac12
\int_{-1}^1(x^2+x)\,dx
=
\frac13.
$$

従って

$$
\boxed{
Q(f)
=
\frac13f(-1)
+
\frac43f(0)
+
\frac13f(1)
}
$$

です。

これは

$$
\boxed{
Q(f)=\frac13\{f(-1)+4f(0)+f(1)\}
}
$$

という Simpson 則です。

---

### A3 解答

$h=1/N$、$x_k=k/N$ とします。

複合台形則は

$$
T_N(f)
=
\frac1N
\left[
\frac{f(0)+f(1)}2
+
\sum_{k=1}^{N-1}f\left(\frac{k}{N}\right)
\right].
$$

$f(x)=x^2$ なので

$$
T_N(f)
=
\frac1N
\left[
\frac12
+
\frac1{N^2}
\sum_{k=1}^{N-1}k^2
\right].
$$

公式

$$
\sum_{k=1}^{N-1}k^2
=
\frac{(N-1)N(2N-1)}6
$$

を使うと

$$
\begin{aligned}
T_N(f)
&=
\frac1{2N}
+
\frac{(N-1)(2N-1)}{6N^2}\\
&=
\frac{2N^2+1}{6N^2}\\
&=
\frac13+\frac1{6N^2}.
\end{aligned}
$$

従って

$$
\boxed{
T_N(f)
=
\frac13+\frac1{6N^2}
}.
$$

真の積分値は

$$
I(f)
=
\int_0^1x^2\,dx
=
\frac13
$$

なので

$$
\boxed{
I(f)-T_N(f)
=
-\frac1{6N^2}
}.
$$

一方

$$
f''(x)=2,
\qquad
h=\frac1N.
$$

台形則の誤差公式は、この二次関数では一定の二階微分をそのまま使えて

$$
I(f)-T_N(f)
=
-\frac{b-a}{12}h^2f''
=
-\frac1{12}\frac1{N^2}\cdot2
=
-\frac1{6N^2}.
$$

一致しました。

---

### A4 解答

内積は

$$
\langle p,q\rangle
=
\int_{-1}^1p(x)q(x)\,dx
$$

です。

最初は

$$
\pi_0(x)=1.
$$

次に $x$ は $1$ と直交します。実際

$$
\langle x,1\rangle
=
\int_{-1}^1x\,dx
=
0.
$$

従って

$$
\pi_1(x)=x.
$$

$x^2$ から $\operatorname{span}\{1,x\}$ への成分を引きます。

偶奇性から

$$
\langle x^2,x\rangle
=
\int_{-1}^1x^3\,dx
=
0.
$$

従って引く必要があるのは定数成分だけです。

$$
\frac{\langle x^2,1\rangle}{\langle1,1\rangle}
=
\frac{2/3}{2}
=
\frac13.
$$

よって

$$
\boxed{
\pi_2(x)=x^2-\frac13
}.
$$

したがって

$$
\boxed{
\pi_0=1,\qquad
\pi_1=x,\qquad
\pi_2=x^2-\frac13
}.
$$

---

### B1 解答

一小区間で

$$
E_j
=
-\frac12
\int_{x_j}^{x_{j+1}}
(x-x_j)(x_{j+1}-x)f''(x)\,dx.
$$

区間幅は $h$ なので

$$
\begin{aligned}
|E_j|
&\le
\frac12
\max_{[x_j,x_{j+1}]}|f''|
\int_{x_j}^{x_{j+1}}
(x-x_j)(x_{j+1}-x)\,dx\\
&=
\frac12
\max_{[x_j,x_{j+1}]}|f''|
\frac{h^3}{6}\\
&=
\frac{h^3}{12}
\max_{[x_j,x_{j+1}]}|f''|.
\end{aligned}
$$

従って全区間で

$$
\begin{aligned}
|I(f)-T_N(f)|
&=
\left|
\sum_{j=0}^{N-1}E_j
\right|\\
&\le
\sum_{j=0}^{N-1}|E_j|\\
&\le
N\frac{h^3}{12}
\max_{[a,b]}|f''|.
\end{aligned}
$$

$Nh=b-a$ より

$$
\boxed{
|I(f)-T_N(f)|
\le
\frac{b-a}{12}h^2
\max_{[a,b]}|f''|
}.
$$

局所の $h^3$ が、$N=(b-a)/h$ 個足されて大域の $h^2$ になることが確認できます。

---

### B2 解答

公式は

$$
Q(f)=Af(-c)+Af(c)
$$

です。

定数 $1$ を厳密に積分するには

$$
2A
=
\int_{-1}^1 1\,dx
=
2.
$$

従って

$$
A=1.
$$

次に $x^2$ を厳密に積分する条件は

$$
2Ac^2
=
\frac23.
$$

$A=1$ を代入して

$$
2c^2=\frac23,
$$

よって

$$
c^2=\frac13.
$$

$0<c<1$ と取れば

$$
c=\frac1{\sqrt3}.
$$

したがって

$$
\boxed{
Q(f)
=
f\left(-\frac1{\sqrt3}\right)
+
f\left(\frac1{\sqrt3}\right)
}.
$$

対称性により奇関数 $x$ と $x^3$ では

$$
Q(x)=Q(x^3)=0.
$$

厳密積分も

$$
\int_{-1}^1x\,dx
=
\int_{-1}^1x^3\,dx
=
0.
$$

従って $1,x,x^2,x^3$ のすべてで厳密です。

よって三次以下の任意の多項式で厳密であり、正確次数は少なくとも3です。

さらに $x^4$ では

$$
Q(x^4)=\frac29
\ne
\frac25,
$$

なので正確次数はちょうど

$$
\boxed{3}.
$$

---

### B3 解答

Gauss 求積は定数関数 $1$ を厳密に積分します。

従って

$$
\sum_{i=1}^nA_i
=
G_n(1)
=
I_w(1)
=
\int_a^bw(x)\,dx.
$$

また $A_i>0$ なので

$$
\begin{aligned}
|G_n(f)|
&=
\left|
\sum_{i=1}^nA_i f(x_i)
\right|\\
&\le
\sum_{i=1}^nA_i|f(x_i)|\\
&\le
\left(\max_{[a,b]}|f|\right)
\sum_{i=1}^nA_i\\
&=
\left(\int_a^bw(x)\,dx\right)
\max_{[a,b]}|f|.
\end{aligned}
$$

従って

$$
\boxed{
|G_n(f)|
\le
\left(\int_a^bw\right)
\max|f|
}.
$$

同様に

$$
\begin{aligned}
\left|
\sum_{i=1}^nA_i\delta_i
\right|
&\le
\sum_{i=1}^nA_i|\delta_i|\\
&\le
\left(\max_i|\delta_i|\right)
\sum_{i=1}^nA_i\\
&=
\left(\int_a^bw(x)\,dx\right)
\max_i|\delta_i|.
\end{aligned}
$$

よって

$$
\boxed{
\left|
\sum_{i=1}^nA_i\delta_i
\right|
\le
\left(\int_a^bw\right)
\max_i|\delta_i|
}.
$$

重みの正値性により、関数値の摂動が正負の大きな重みで不必要に増幅されることを防いでいると読めます。

---

### C1 解答

#### 1. 三次モニック直交多項式

対称区間 $[-1,1]$、重み $1$ なので、三次直交多項式は奇関数として

$$
\pi_3(x)=x^3-\alpha x
$$

と置けます。

$\mathcal P_2$ に直交するには $1,x,x^2$ に直交すれば十分です。

奇偶性から

$$
\langle \pi_3,1\rangle=0,
\qquad
\langle \pi_3,x^2\rangle=0
$$

は自動的です。

残る条件は

$$
0
=
\langle \pi_3,x\rangle
=
\int_{-1}^1(x^4-\alpha x^2)\,dx.
$$

従って

$$
\frac25-\alpha\frac23=0.
$$

よって

$$
\alpha=\frac35.
$$

したがって

$$
\boxed{
\pi_3(x)=x^3-\frac35x
}.
$$

#### 2. Gauss 節点

$$
\pi_3(x)
=
x\left(x^2-\frac35\right)
$$

なので零点は

$$
\boxed{
-\sqrt{\frac35},
\qquad
0,
\qquad
\sqrt{\frac35}
}.
$$

#### 3. 重み

対称性から外側二点の重みを $A$、中央を $B$ と置きます。

定数 $1$ の厳密性から

$$
2A+B=2.
$$

$x^2$ の厳密性から

$$
2A\frac35
=
\frac23.
$$

従って

$$
A
=
\frac{5}{9}.
$$

これを最初の式へ代入して

$$
B
=
2-\frac{10}{9}
=
\frac89.
$$

従って

$$
\boxed{
G_3(f)
=
\frac59
f\left(-\sqrt{\frac35}\right)
+
\frac89f(0)
+
\frac59
f\left(\sqrt{\frac35}\right)
}.
$$

#### 4. 五次式まで厳密

三点 Gauss 求積なので、Gauss 求積定理から正確次数は少なくとも

$$
2\cdot3-1=5.
$$

従って

$$
p\in\mathcal P_5
$$

ならすべて厳密です。

#### 5. $x^6$ では厳密でない

求積値は

$$
\begin{aligned}
G_3(x^6)
&=
2\cdot\frac59
\left(\frac35\right)^3\\
&=
\frac{10}{9}\cdot\frac{27}{125}\\
&=
\frac6{25}.
\end{aligned}
$$

一方

$$
\int_{-1}^1x^6\,dx
=
\frac27.
$$

そして

$$
\frac6{25}\ne\frac27.
$$

従って六次では厳密ではありません。

よって正確次数はちょうど

$$
\boxed{5}.
$$

#### 6. $e^x$ の誤差の符号

$n=3$ なので誤差公式は

$$
I(f)-G_3(f)
=
\frac{f^{(6)}(\xi)}{6!}
\int_{-1}^1\pi_3(x)^2\,dx.
$$

$f(x)=e^x$ では

$$
f^{(6)}(x)=e^x>0.
$$

また

$$
\int_{-1}^1\pi_3(x)^2\,dx>0.
$$

従って

$$
I(e^x)-G_3(e^x)>0.
$$

つまり

$$
\boxed{
G_3(e^x)
<
\int_{-1}^1e^x\,dx
}.
$$

さらに誤差定数を計算すると

$$
\begin{aligned}
\int_{-1}^1
\left(x^3-\frac35x\right)^2\,dx
&=
\frac27-\frac{12}{25}+\frac6{25}\\
&=
\frac8{175}.
\end{aligned}
$$

よってある $\xi\in(-1,1)$ に対し

$$
I(e^x)-G_3(e^x)
=
\frac{e^\xi}{720}\frac8{175}
=
\boxed{
\frac{e^\xi}{15750}
}.
$$

---

## 15. まとめ

この章の中心は、求積公式をばらばらに暗記することではありません。

1. **補間を積分する**
   $$
   A_i=\int w\ell_i
   $$
   により補間型求積公式が得られる。

2. **等間隔節点を固定する**
   と Newton--Cotes になり、台形則・Simpson 則が出る。

3. **区間を細分する**
   と複合則になり、
   $$
   |I-T_N|
   \le
   \frac{b-a}{12}h^2\max|f''|,
   $$
   $$
   |I-S_N|
   \le
   \frac{b-a}{180}h^4\max|f^{(4)}|
   $$
   が得られる。

4. **節点そのものを設計する**
   と直交多項式が現れる。

5. **直交多項式の零点を節点にする**
   と、$n$ 点だけで
   $$
   2n-1
   $$
   次まで厳密になる。

6. **この次数は最適**
   であり、$n$ 点公式で次数 $2n$ の全多項式を厳密にすることはできない。

7. **一般関数の誤差**
   は
   $$
   I_w(f)-G_n(f)
   =
   \frac{f^{(2n)}(\xi)}{(2n)!}
   \int w\pi_n^2
   $$
   と、関数の滑らかさと節点設計へ分離される。

次の NA6 では、積分ではなく微分方程式を時間方向へ離散化します。

そこで再び

~~~text
局所誤差
  ↓
安定性
  ↓
大域誤差
~~~

という構造が現れます。
