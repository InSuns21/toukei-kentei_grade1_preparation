# RA2 極限・連続・一様連続

RA1 では、実数列について「収束する」「Cauchy 条件を満たす」を定義し、実数の完備性まで実数の上限性質から導きました。ここではその道具を実関数へ進めます。

この章では一般の距離空間や位相空間をまだ使いません。実数と閉区間だけを舞台に、

$$
\text{実数の完備性}
\Longrightarrow
\text{Bolzano--Weierstrass}
\Longrightarrow
\begin{cases}
\text{閉区間の有限部分被覆}\\
\text{最大最小}\\
\text{Heine--Cantor}
\end{cases}
$$

という存在証明の流れを組み立てます。後で位相空間論へ進むと、この「閉区間では逃げ道がない」という性質がコンパクト性として一般化されます。

---

## 1. 関数の極限と連続性

数列では「十分後ろの項」を制御しました。関数では、入力 $x$ を点 $a$ に十分近づけたとき、出力 $f(x)$ を目標値 $L$ にどこまで近づけられるかを制御します。

<a id="def-ra2-limit"></a>
<!-- formal-statement-start -->
> **定義（関数の極限）**  
> $f$ が $a$ の近くで定義されているとする。$\lim_{x\to a}f(x)=L$ とは、任意の $\varepsilon>0$ に対してある $\delta>0$ が存在し、
>
> $$
> 0<|x-a|<\delta
> \quad\Longrightarrow\quad
> |f(x)-L|<\varepsilon
> $$
>
> が成り立つことをいう。
<!-- formal-statement-end -->

極限の定義には $f(a)$ 自体は入りません。入力を $a$ に近づけたときの振る舞いだけを見ています。

<!-- definition-example-start: def-ra2-limit -->
**定義の確認**：$f(x)=3x+2$ では $L=3a+2$ とすると

$$
|f(x)-L|
=
|3x+2-(3a+2)|
=
3|x-a|.
$$

任意の $\varepsilon>0$ に対して $\delta=\varepsilon/3$ と取れば、

$$
0<|x-a|<\delta
\Longrightarrow
|f(x)-L|
<
3\delta
=
\varepsilon.
$$

したがって定義から

$$
\lim_{x\to a}(3x+2)=3a+2
$$

です。
<!-- definition-example-end -->

極限値と実際の関数値を一致させたものが連続性です。区間の端点も同じ式で扱えるよう、定義域 $E$ の中から $x$ を近づけます。

<a id="def-ra2-continuity"></a>
<!-- formal-statement-start -->
> **定義（連続性：実数版）**  
> $E\subset\mathbb R$、$f:E\to\mathbb R$、$a\in E$ とする。$f$ が $a$ で連続であるとは、任意の $\varepsilon>0$ に対してある $\delta>0$ が存在し、任意の $x\in E$ について
>
> $$
> |x-a|<\delta
> \quad\Longrightarrow\quad
> |f(x)-f(a)|<\varepsilon
> $$
>
> が成り立つことをいう。$E$ のすべての点で連続なら、$f$ は $E$ 上で連続であるという。
<!-- formal-statement-end -->

<!-- definition-example-start: def-ra2-continuity -->
**定義の確認**：$f(x)=x^2$ を $E=[0,2]$ 上で考えます。$a\in[0,2]$ とし、$x\in[0,2]$ なら

$$
|x^2-a^2|
=
|x-a||x+a|
\le
4|x-a|.
$$

したがって任意の $\varepsilon>0$ に対して

$$
\delta=\frac{\varepsilon}{4}
$$

と取れば、$|x-a|<\delta$ から

$$
|f(x)-f(a)|
\le
4|x-a|
<
4\delta
=
\varepsilon.
$$

よって $f(x)=x^2$ は $[0,2]$ 上で連続です。
<!-- definition-example-end -->

<a id="thm-ra2-sequential"></a>
<!-- formal-statement-start -->
> **定理（関数極限の点列判定）**  
> $\lim_{x\to a}f(x)=L$ であることと、$x_n\ne a$, $x_n\to a$ を満たすすべての実数列に対して $f(x_n)\to L$ となることは同値である。
<!-- formal-statement-end -->

<!-- proof-start -->
### 証明

まず

$$
\lim_{x\to a}f(x)=L
$$

とします。$x_n\ne a$, $x_n\to a$ を満たす任意の実数列を取ります。

任意の $\varepsilon>0$ を固定します。関数極限の定義から、ある $\delta>0$ が存在して

$$
0<|x-a|<\delta
\Longrightarrow
|f(x)-L|<\varepsilon
$$

です。

一方 $x_n\to a$ なので、ある $N$ が存在して $n\ge N$ なら

$$
|x_n-a|<\delta.
$$

さらに $x_n\ne a$ なので

$$
0<|x_n-a|<\delta.
$$

したがって $n\ge N$ なら

$$
|f(x_n)-L|<\varepsilon.
$$

よって $f(x_n)\to L$ です。

逆に、点列による条件が成り立つのに

$$
\lim_{x\to a}f(x)\ne L
$$

だと仮定します。極限の定義の否定から、ある $\varepsilon_0>0$ が存在し、どんな $\delta>0$ に対しても

$$
0<|x-a|<\delta,
\qquad
|f(x)-L|\ge\varepsilon_0
$$

を満たす $x$ が存在します。

各 $n$ について $\delta=1/n$ を代入し、そのような点を $x_n$ と取ります。すると

$$
0<|x_n-a|<\frac1n.
$$

RA1 で示した $1/n\to0$ から $x_n\to a$ です。しかし構成上

$$
|f(x_n)-L|\ge\varepsilon_0
$$

がすべての $n$ で成り立つため、$f(x_n)$ は $L$ に収束しません。点列による条件に反します。$\square$
<!-- proof-end -->

極限が存在しないことを示すときは、同じ点 $a$ に近づく二つの点列を作り、像が異なる極限へ行くことを示す方法が使えます。

---

## 2. 有界列から収束部分列を取り出す

有界な列でも、列全体が収束するとは限りません。例えば

$$
x_n=(-1)^n+\frac1n
$$

は有界ですが、偶数番目は $1$ へ、奇数番目は $-1$ へ近づきます。

そこで必要なのは「列全体の収束」ではなく、**無限個の項を選び直せば収束する部分列を必ず作れるか**という性質です。

<a id="thm-ra2-bolzano-weierstrass"></a>
<!-- formal-statement-start -->
> **定理（Bolzano--Weierstrassの定理：実数版）**  
> 有界な実数列 $(x_n)$ は収束部分列を持つ。
<!-- formal-statement-end -->

<!-- proof-start -->
### 証明

$(x_n)$ は有界なので、ある閉区間

$$
I_1=[a_1,b_1]
$$

がすべての項 $x_n$ を含みます。

$I_1$ を中点で二つの閉区間に分けます。$(x_n)$ の項は無限個あるので、二つの半区間のうち少なくとも一方には $(x_n)$ の項が無限個入ります。その半区間を $I_2$ とします。

同じ操作を繰り返すと、

$$
I_1\supset I_2\supset I_3\supset\cdots
$$

で、各 $I_k$ が $(x_n)$ の項を無限個含み、区間の長さが

$$
|I_k|
=
2^{-(k-1)}|I_1|
\to0
$$

となる閉区間列を作れます。

各 $I_k$ には元の列の項が無限個あるので、添字を

$$
n_1<n_2<n_3<\cdots
$$

と増加させながら

$$
x_{n_k}\in I_k
$$

となるように選べます。

ここで $(x_{n_k})$ が Cauchy 列であることを示します。任意の $\varepsilon>0$ を取ります。$|I_k|\to0$ なので、ある $K$ が存在して

$$
|I_K|<\varepsilon.
$$

$p,q\ge K$ なら、区間が入れ子になっているため

$$
x_{n_p},x_{n_q}\in I_K.
$$

したがって

$$
|x_{n_p}-x_{n_q}|
\le
|I_K|
<
\varepsilon.
$$

よって $(x_{n_k})$ は Cauchy 列です。

RA1 で証明した [実数の完備性](../RA1/index.md#thm-ra1-real-completeness) により、実数 Cauchy 列は収束します。従って $(x_{n_k})$ は収束部分列です。$\square$
<!-- proof-end -->

この証明の中心は、長さが0へ行く入れ子区間を使って「選んだ部分列そのものを Cauchy にする」ことです。一般のコンパクト性を使って収束部分列を取り出しているのではありません。

---

## 3. 閉区間を有限個の局所情報で覆う

連続性は点ごとの局所的な情報です。後で一様連続性を示すには、無限にある点ごとの情報から有限個だけを残し、区間全体を一度に制御したくなります。

その有限化を、閉区間について実数の上限性質から直接証明します。

<a id="thm-ra2-closed-interval-finite-subcover"></a>
<!-- formal-statement-start -->
> **定理（閉区間の有限部分被覆定理）**  
> $a\le b$ とし、開区間の族 $\mathcal U$ が
>
> $$
> [a,b]\subset\bigcup_{U\in\mathcal U}U
> $$
>
> を満たすとする。このとき、有限個の $U_1,\ldots,U_m\in\mathcal U$ が存在して
>
> $$
> [a,b]\subset U_1\cup\cdots\cup U_m
> $$
>
> となる。
<!-- formal-statement-end -->

<!-- proof-start -->
### 証明

$a=b$ なら、$a$ を含む $\mathcal U$ の区間を一つ取ればよいので自明です。以下 $a<b$ とします。

$$
S
=
\left\{
x\in[a,b]:
[a,x]\text{ は }\mathcal U\text{ の有限個の区間で覆える}
\right\}
$$

と置きます。

まず $S$ は空ではありません。被覆の仮定から $a$ を含む $U_a\in\mathcal U$ があります。$U_a$ は開区間なので、ある $\eta>0$ が存在して

$$
(a-\eta,a+\eta)\subset U_a.
$$

従って

$$
x_0=\min\left\{b,a+\frac{\eta}{2}\right\}
$$

と置けば

$$
[a,x_0]\subset U_a,
$$

したがって $x_0\in S$ です。

また $S\subset[a,b]$ なので $S$ は上に有界です。実数の上限性質から

$$
s=\sup S
$$

が存在します。

$s<b$ だと仮定します。被覆の仮定から $s$ を含む $U_s\in\mathcal U$ があり、$U_s$ は開区間なので、ある $\eta>0$ に対して

$$
(s-\eta,s+\eta)\subset U_s.
$$

$s-\eta/2<s=\sup S$ なので、$s-\eta/2$ は $S$ の上界ではありません。よって

$$
s-\frac{\eta}{2}<x\le s
$$

を満たす $x\in S$ を取れます。

$x\in S$ だから $[a,x]$ は $\mathcal U$ の有限個の区間で覆えます。一方

$$
y=\min\left\{b,s+\frac{\eta}{2}\right\}
$$

と置くと、$s<b$ なので $y>s$ であり、

$$
[x,y]\subset(s-\eta,s+\eta)\subset U_s.
$$

従って $[a,y]$ も有限個の区間で覆え、$y\in S$ です。しかし $y>s$ なので $s$ が $S$ の上界であることに反します。

従って

$$
s=b.
$$

最後に $b\in S$ を確認します。$b$ を含む $U_b\in\mathcal U$ を取り、

$$
(b-\rho,b+\rho)\subset U_b
$$

となる $\rho>0$ を取ります。$\sup S=b$ なので

$$
b-\frac{\rho}{2}<x\le b
$$

となる $x\in S$ が存在します。$[a,x]$ を覆う有限個の区間に $U_b$ を一つ加えれば $[a,b]$ を覆えます。したがって $b\in S$ であり、求める有限部分被覆が存在します。$\square$
<!-- proof-end -->

これは閉区間に対する有限化の定理です。位相空間論では、後にこの性質を抽象化してコンパクト性を定義します。

---

## 4. 連続関数の存在定理

### 4.1 中間値定理

連続関数のグラフが端点で値 $c$ の上下にあるなら、その途中で $c$ を通るはずです。「グラフを描けば明らか」で済ませず、実数の上限性質から交点を作ります。

<a id="thm-ra2-ivt"></a>
<!-- formal-statement-start -->
> **定理（中間値定理）**  
> $a<b$ とし、$f:[a,b]\to\mathbb R$ が連続で
>
> $$
> f(a)<c<f(b)
> $$
>
> とする。このとき、ある $x\in(a,b)$ が存在して $f(x)=c$ となる。
<!-- formal-statement-end -->

<!-- proof-start -->
### 証明

$$
A=\{x\in[a,b]:f(x)\le c\}
$$

と置きます。$f(a)<c$ なので $a\in A$、従って $A$ は空ではありません。また $A\subset[a,b]$ なので上に有界です。[実数の上限性質](../F0_00A1B_実数の上限性質_Archimedes性/index.md#thm-f0-00a1b-lub)から

$$
s=\sup A
$$

が存在します。

まず $s>a$ を示します。

$$
\varepsilon_a=\frac{c-f(a)}{2}>0
$$

と置きます。$f$ は $a$ で連続なので、ある $\delta_a>0$ が存在して

$$
x\in[a,b],
\quad
|x-a|<\delta_a
\Longrightarrow
|f(x)-f(a)|<\varepsilon_a.
$$

$$
0<h<\min\{\delta_a,b-a\}
$$

を取ると

$$
f(a+h)
<
f(a)+\varepsilon_a
=
\frac{f(a)+c}{2}
<
c.
$$

従って $a+h\in A$ であり、$s\ge a+h>a$ です。

同様に $s<b$ を示します。

$$
\varepsilon_b=\frac{f(b)-c}{2}>0
$$

と置き、$b$ での連続性から $0<h<\min\{\delta_b,b-a\}$ を十分小さく取ると、

$$
x\in(b-h,b]
\Longrightarrow
f(x)>c.
$$

従って $A$ の点は $b-h$ より右にはなく、

$$
s\le b-h<b.
$$

あとは $f(s)=c$ を示します。

もし $f(s)<c$ なら

$$
\varepsilon=\frac{c-f(s)}{2}>0
$$

です。$s$ での連続性から、ある $\eta>0$ が存在して

$$
|x-s|<\eta
\Longrightarrow
|f(x)-f(s)|<\varepsilon.
$$

$$
0<h<\min\{\eta,b-s\}
$$

を取れば

$$
f(s+h)
<
f(s)+\varepsilon
<
c.
$$

従って $s+h\in A$ ですが $s+h>s$ であり、$s$ が $A$ の上界であることに反します。

逆に $f(s)>c$ なら

$$
\varepsilon=\frac{f(s)-c}{2}>0
$$

と置けます。連続性から、ある $\eta>0$ が存在して

$$
|x-s|<\eta
\Longrightarrow
f(x)>c.
$$

$s=\sup A$ なので $s-\eta$ は $A$ の上界ではありません。従って

$$
s-\eta<x\le s
$$

を満たす $x\in A$ が存在します。この $x$ は $|x-s|<\eta$ を満たすので $f(x)>c$ ですが、$x\in A$ だから $f(x)\le c$ です。矛盾です。

したがって

$$
f(s)=c.
$$

さらに $a<s<b$ なので $s\in(a,b)$ です。$\square$
<!-- proof-end -->

### 4.2 最大値・最小値は実際に達成される

閉区間上で連続な関数は、値が無限大へ逃げることも、上限へ近づくだけで達成点が消えることもありません。この二つを Bolzano--Weierstrass で止めます。

<a id="thm-ra2-extreme-value"></a>
<!-- formal-statement-start -->
> **定理（Weierstrassの最大最小定理：閉区間版）**  
> $a\le b$ とし、$f:[a,b]\to\mathbb R$ が連続であるとする。このとき、ある $x_{\min},x_{\max}\in[a,b]$ が存在して
>
> $$
> f(x_{\min})
> =
> \min_{x\in[a,b]}f(x),
> \qquad
> f(x_{\max})
> =
> \max_{x\in[a,b]}f(x)
> $$
>
> が成り立つ。
<!-- formal-statement-end -->

<!-- proof-start -->
### 証明

まず $f$ が有界であることを示します。

$f$ が有界でないと仮定します。このとき各 $n\in\mathbb N$ について

$$
|f(x_n)|>n
$$

となる $x_n\in[a,b]$ を取れます。

$(x_n)$ は有界な実数列なので、[Bolzano--Weierstrassの定理](#thm-ra2-bolzano-weierstrass) により収束部分列

$$
x_{n_k}\to x_*
$$

を取れます。

ここで $x_*\in[a,b]$ です。実際、もし $x_*<a$ なら

$$
\varepsilon=\frac{a-x_*}{2}>0
$$

とすると、十分大きい $k$ で $x_{n_k}<a$ となり $x_{n_k}\in[a,b]$ に反します。$x_*>b$ も同様に矛盾します。

$f$ は $x_*$ で連続なので

$$
f(x_{n_k})\to f(x_*).
$$

収束する実数列は有界です。一方、

$$
|f(x_{n_k})|>n_k\ge k
$$

なので $(f(x_{n_k}))$ は有界ではありません。矛盾です。

従って $f([a,b])$ は有界です。

上限を

$$
M=\sup f([a,b])
$$

と置きます。上限の定義から、各 $n$ について $x_n\in[a,b]$ を

$$
M-\frac1n<f(x_n)\le M
$$

となるように取れます。

再び Bolzano--Weierstrass により、ある部分列が

$$
x_{n_k}\to x_{\max}\in[a,b]
$$

と収束します。連続性から

$$
f(x_{n_k})\to f(x_{\max}).
$$

一方、

$$
0\le M-f(x_{n_k})<\frac1{n_k}\to0
$$

なので

$$
f(x_{n_k})\to M.
$$

実数列の極限は一意なので

$$
f(x_{\max})=M.
$$

従って最大値は実際に達成されます。

最小値については

$$
m=\inf f([a,b])
$$

と置き、

$$
m\le f(y_n)<m+\frac1n
$$

となる $y_n\in[a,b]$ を選んで同じ議論を行えば、ある $x_{\min}\in[a,b]$ で

$$
f(x_{\min})=m
$$

となります。$\square$
<!-- proof-end -->

$(0,1)$ 上の $f(x)=x$ では

$$
\inf_{0<x<1}f(x)=0
$$

ですが、$f(x)=0$ を満たす点は定義域にありません。閉区間という条件が「極限へ近づいた点を定義域の中に残す」役割を持っています。

---

## 5. 一様連続とLipschitz連続

点 $a$ での連続性では、許される入力誤差 $\delta$ を点 $a$ ごとに変えて構いません。しかし数値計算や極限交換では、定義域全体で一つの $\delta$ を使いたい場面があります。

<a id="def-ra2-uniform"></a>
<!-- formal-statement-start -->
> **定義（一様連続）**  
> $f:E\to\mathbb R$ が一様連続であるとは、任意の $\varepsilon>0$ に対してある $\delta>0$ が存在し、任意の $x,y\in E$ について
>
> $$
> |x-y|<\delta
> \quad\Longrightarrow\quad
> |f(x)-f(y)|<\varepsilon
> $$
>
> が成り立つことをいう。
<!-- formal-statement-end -->

通常の連続では $\delta$ を基準点ごとに変えてよいのに対し、一様連続では定義域全体で同じ $\delta$ を使います。

さらに強い条件として、出力差を入力差の定数倍で直接抑えることを考えます。

<a id="def-ra2-lipschitz"></a>
<!-- formal-statement-start -->
> **定義（Lipschitz連続）**  
> ある $K\ge0$ が存在して、すべての $x,y\in E$ に対して
>
> $$
> |f(x)-f(y)|
> \le
> K|x-y|
> $$
>
> が成り立つとき、$f$ はLipschitz連続であるという。
<!-- formal-statement-end -->

$K>0$ なら任意の $\varepsilon>0$ に対して

$$
\delta=\frac{\varepsilon}{K}
$$

と取れば、

$$
|x-y|<\delta
\Longrightarrow
|f(x)-f(y)|
\le
K|x-y|
<
K\delta
=
\varepsilon.
$$

$K=0$ なら $f$ は定数関数なので、任意の $\delta>0$ が使えます。従って Lipschitz 連続なら一様連続です。

<!-- definition-example-start: def-ra2-uniform, def-ra2-lipschitz -->
**定義の確認**：$f(x)=2x$ を $\mathbb R$ 上で考えると

$$
|f(x)-f(y)|
=
2|x-y|.
$$

従って $K=2$ で Lipschitz 連続です。また任意の $\varepsilon>0$ に対して $\delta=\varepsilon/2$ と取れば、点 $x,y$ の位置に依存せず

$$
|x-y|<\delta
\Longrightarrow
|f(x)-f(y)|
<
\varepsilon
$$

となるので、一様連続の定義も満たします。
<!-- definition-example-end -->

---

## 6. 閉区間では連続性が一様になる

閉区間上では、点ごとにしか分からなかった連続性を区間全体で共通の誤差制御へ引き上げられます。証明では「一様にできない」と仮定して悪い点対を並べ、Bolzano--Weierstrass で同じ極限点へ押し込みます。

<a id="thm-ra2-heine-cantor"></a>
<!-- formal-statement-start -->
> **定理（Heine--Cantorの定理：閉区間版）**  
> $a\le b$ とし、連続関数 $f:[a,b]\to\mathbb R$ は $[a,b]$ 上で一様連続である。
<!-- formal-statement-end -->

<!-- proof-start -->
### 証明

$f$ が一様連続でないと仮定します。一様連続性の否定から、ある $\varepsilon_0>0$ が存在し、どんな $\delta>0$ に対しても $x,y\in[a,b]$ を

$$
|x-y|<\delta,
\qquad
|f(x)-f(y)|\ge\varepsilon_0
$$

となるように取れます。

各 $n$ に対して $\delta=1/n$ とし、

$$
x_n,y_n\in[a,b],
\qquad
|x_n-y_n|<\frac1n,
\qquad
|f(x_n)-f(y_n)|\ge\varepsilon_0
$$

となる点を取ります。

$(x_n)$ は有界なので Bolzano--Weierstrass により、ある部分列が

$$
x_{n_k}\to x_*
$$

と収束します。最大最小定理の証明と同じ閉区間の議論から

$$
x_*\in[a,b].
$$

また

$$
|y_{n_k}-x_*|
\le
|y_{n_k}-x_{n_k}|
+
|x_{n_k}-x_*|
<
\frac1{n_k}
+
|x_{n_k}-x_*|
\to0,
$$

従って

$$
y_{n_k}\to x_*.
$$

$f$ は $x_*$ で連続なので

$$
f(x_{n_k})\to f(x_*),
\qquad
f(y_{n_k})\to f(x_*).
$$

三角不等式から

$$
|f(x_{n_k})-f(y_{n_k})|
\le
|f(x_{n_k})-f(x_*)|
+
|f(y_{n_k})-f(x_*)|
\to0.
$$

しかし構成上

$$
|f(x_{n_k})-f(y_{n_k})|
\ge
\varepsilon_0
$$

がすべての $k$ で成り立ちます。矛盾です。

従って $f$ は $[a,b]$ 上で一様連続です。$\square$
<!-- proof-end -->

閉区間を開区間へ弱めると結論は壊れます。$f(x)=1/x$ は $(0,1)$ 上で連続ですが一様連続ではありません。$x\to0$ で、局所的に必要な $\delta$ が際限なく小さくなるからです。

---

## 7. 演習

### Level A

<a id="ex-ra2-a01"></a>
#### RA2-A01 $\varepsilon$-$\delta$ で連続性を示す
- Level: A

$f(x)=3x+2$ が任意の $a\in\mathbb R$ で連続であることを示せ。

<!-- solution-start -->
**解答**：任意の $\varepsilon>0$ を取ります。

$$
|f(x)-f(a)|
=
|3x+2-(3a+2)|
=
3|x-a|.
$$

そこで

$$
\delta=\frac{\varepsilon}{3}
$$

と取れば、$|x-a|<\delta$ から

$$
|f(x)-f(a)|
<
3\delta
=
\varepsilon
$$

が従います。よって $f$ は $a$ で連続です。$a$ は任意なので実数全体で連続です。
<!-- solution-end -->

<a id="ex-ra2-a02"></a>
#### RA2-A02 Lipschitz連続
- Level: A

$f(x)=x^2$ が $[0,2]$ 上で Lipschitz 連続であることを示せ。

<!-- solution-start -->
**解答**：$x,y\in[0,2]$ なら

$$
|x^2-y^2|
=
|x-y||x+y|.
$$

ここで

$$
0\le x+y\le4
$$

なので

$$
|x^2-y^2|
\le
4|x-y|.
$$

従って Lipschitz 定数 $K=4$ を取れます。
<!-- solution-end -->

<a id="ex-ra2-a03"></a>
#### RA2-A03 中間値定理で零点を作る
- Level: A

$x^3+x-1=0$ が $(0,1)$ に少なくとも一つ解を持つことを示せ。

<!-- solution-start -->
**解答**：$f(x)=x^3+x-1$ と置きます。多項式なので $[0,1]$ で連続であり、

$$
f(0)=-1<0<1=f(1).
$$

従って [中間値定理](#thm-ra2-ivt) を $c=0$ に対して適用すると、ある $x\in(0,1)$ が存在して

$$
f(x)=0
$$

となります。
<!-- solution-end -->

<a id="ex-ra2-a04"></a>
#### RA2-A04 非一様連続
- Level: A

$f(x)=1/x$ が $(0,1)$ 上で一様連続でないことを示せ。

<!-- solution-start -->
**解答**：

$$
x_n=\frac1n,
\qquad
y_n=\frac1{n+1}
$$

と置きます。すると

$$
|x_n-y_n|
=
\frac1{n(n+1)}
\to0
$$

ですが、

$$
|f(x_n)-f(y_n)|
=
|n-(n+1)|
=
1.
$$

もし $f$ が一様連続なら、$\varepsilon=1/2$ に対してある $\delta>0$ が存在するはずです。十分大きい $n$ では

$$
|x_n-y_n|<\delta
$$

なので、一様連続性から

$$
|f(x_n)-f(y_n)|<\frac12
$$

でなければなりません。しかし実際には常に1です。矛盾です。
<!-- solution-end -->

<a id="ex-ra2-a05"></a>
#### RA2-A05 Bolzano--Weierstrassを具体列で確認する
- Level: A

$$
x_n=(-1)^n+\frac1n
$$

について、偶数番目と奇数番目の部分列の極限を求め、有界列が列全体として収束しなくても収束部分列を持ち得ることを確認せよ。

<!-- solution-start -->
**解答**：偶数番目では

$$
x_{2k}
=
1+\frac1{2k}
\to1.
$$

奇数番目では

$$
x_{2k-1}
=
-1+\frac1{2k-1}
\to-1.
$$

二つの部分列の極限が異なるため、元の列 $(x_n)$ 自体は収束しません。一方、少なくとも $(x_{2k})$ と $(x_{2k-1})$ という二つの収束部分列を持ちます。

Bolzano--Weierstrass の定理は「有界列そのものが収束する」とは主張せず、「少なくとも一つの収束部分列を持つ」と主張していることが、この例で確認できます。
<!-- solution-end -->

<a id="ex-ra2-a06"></a>
#### RA2-A06 閉区間上の最大値・最小値
- Level: A

$$
f(x)=\frac1{1+x^2},
\qquad
x\in[-2,1]
$$

について、最大値・最小値が存在する理由を述べ、実際の値を求めよ。

<!-- solution-start -->
**解答**：分母 $1+x^2$ は $[-2,1]$ で0にならないので、$f$ は閉区間 $[-2,1]$ 上で連続です。従って [Weierstrassの最大最小定理](#thm-ra2-extreme-value) により最大値・最小値は必ず達成されます。

区間内では

$$
0\le x^2\le4,
$$

従って

$$
1\le1+x^2\le5.
$$

正数の逆数では大小が逆になるので

$$
\frac15
\le
\frac1{1+x^2}
\le
1.
$$

上端 $1$ は $x=0$ で達成され、下端 $1/5$ は $x=-2$ で達成されます。従って

$$
\max_{[-2,1]}f=1,
\qquad
\min_{[-2,1]}f=\frac15.
$$
<!-- solution-end -->

### Level B

<a id="ex-ra2-b01"></a>
#### RA2-B01 一様連続写像はCauchy列を保つ
- Level: B

$f:E\to\mathbb R$ が一様連続なら、$E$ 内の Cauchy 列 $(x_n)$ に対して $(f(x_n))$ も Cauchy 列であることを示せ。

<!-- solution-start -->
**解答**：任意の $\varepsilon>0$ を取ります。一様連続性から、すべての $x,y\in E$ に共通して使える $\delta>0$ が存在して

$$
|x-y|<\delta
\Longrightarrow
|f(x)-f(y)|<\varepsilon
$$

です。

$(x_n)$ は Cauchy 列なので、ある $N$ が存在して $m,n\ge N$ なら

$$
|x_m-x_n|<\delta.
$$

従って

$$
|f(x_m)-f(x_n)|<\varepsilon.
$$

よって $(f(x_n))$ も Cauchy 列です。
<!-- solution-end -->

<a id="ex-ra2-b02"></a>
#### RA2-B02 $x^2$ は実数全体で一様連続か
- Level: B

$f(x)=x^2$ が $\mathbb R$ 上では一様連続でないことを示せ。

<!-- solution-start -->
**解答**：

$$
x_n=n,
\qquad
y_n=n+\frac1n
$$

と置くと

$$
|x_n-y_n|
=
\frac1n
\to0
$$

ですが、

$$
|y_n^2-x_n^2|
=
\left(n+\frac1n\right)^2-n^2
=
2+\frac1{n^2}
\to2.
$$

特にすべての $n$ で像の差は2より大きいです。$\varepsilon=1$ と固定すると、どんな $\delta>0$ に対しても十分大きい $n$ では $|x_n-y_n|<\delta$ なのに

$$
|f(x_n)-f(y_n)|>1.
$$

従って一様連続ではありません。
<!-- solution-end -->

<a id="ex-ra2-b03"></a>
#### RA2-B03 零点の一意性
- Level: B

$f(x)=x^3+x-1$ の零点が一意であることを示せ。

<!-- solution-start -->
**解答**：$x<y$ とします。すると

$$
f(y)-f(x)
=
(y^3-x^3)+(y-x)
=
(y-x)(x^2+xy+y^2+1).
$$

第1因子は正です。また

$$
x^2+xy+y^2
=
\left(x+\frac y2\right)^2
+
\frac34y^2
\ge0
$$

なので

$$
x^2+xy+y^2+1>0.
$$

従って $f(y)>f(x)$ であり、$f$ は狭義単調増加です。ゆえに零点は高々一つです。

A03 で零点の存在を示したので、零点はちょうど一つです。
<!-- solution-end -->

<a id="ex-ra2-b04"></a>
#### RA2-B04 閉区間上の連続関数は有界
- Level: B

$f:[a,b]\to\mathbb R$ が連続なら $f$ は有界であることを、Bolzano--Weierstrass の定理を使って再証明せよ。

<!-- solution-start -->
**解答**：$f$ が有界でないと仮定します。各 $n$ について

$$
|f(x_n)|>n
$$

となる $x_n\in[a,b]$ を取れます。

$(x_n)$ は有界な実数列なので、Bolzano--Weierstrass により、ある部分列が

$$
x_{n_k}\to x_*
$$

と収束します。各項が $[a,b]$ にあり、閉区間の外側へ収束することはできないので

$$
x_*\in[a,b].
$$

$f$ は $x_*$ で連続だから

$$
f(x_{n_k})\to f(x_*).
$$

従って $(f(x_{n_k}))$ は有界です。しかし

$$
|f(x_{n_k})|>n_k\ge k
$$

なので有界ではありません。矛盾です。よって $f$ は有界です。
<!-- solution-end -->

### Level C

<a id="ex-ra2-c01"></a>
#### RA2-C01 Heine--Cantorを有限部分被覆から証明する
- Level: C

$f:[a,b]\to\mathbb R$ が連続であるとする。[閉区間の有限部分被覆定理](#thm-ra2-closed-interval-finite-subcover) を用いて、$f$ が $[a,b]$ 上で一様連続であることを証明せよ。

<!-- solution-start -->
**解答**：任意の $\varepsilon>0$ を固定します。

各 $x\in[a,b]$ について $f$ は $x$ で連続なので、ある $r_x>0$ が存在して

$$
u\in[a,b],
\quad
|u-x|<r_x
\Longrightarrow
|f(u)-f(x)|<\frac{\varepsilon}{2}
$$

となります。

各 $x$ に対して開区間

$$
U_x
=
\left(x-\frac{r_x}{2},x+\frac{r_x}{2}\right)
$$

を考えます。$x\in U_x$ なので、族

$$
\{U_x:x\in[a,b]\}
$$

は $[a,b]$ を覆います。

閉区間の有限部分被覆定理により、有限個の点

$$
x_1,\ldots,x_m\in[a,b]
$$

を選んで

$$
[a,b]
\subset
U_{x_1}\cup\cdots\cup U_{x_m}
$$

とできます。

ここで

$$
\delta
=
\min_{1\le i\le m}\frac{r_{x_i}}{2}.
$$

有限個の正数の最小値なので $\delta>0$ です。

$u,v\in[a,b]$ が

$$
|u-v|<\delta
$$

を満たすとします。有限被覆から、ある $i$ が存在して

$$
u\in U_{x_i},
$$

従って

$$
|u-x_i|<\frac{r_{x_i}}{2}.
$$

さらに

$$
|v-x_i|
\le
|v-u|+|u-x_i|
<
\delta+\frac{r_{x_i}}{2}
\le
r_{x_i}.
$$

従って連続性から

$$
|f(u)-f(x_i)|<\frac{\varepsilon}{2},
\qquad
|f(v)-f(x_i)|<\frac{\varepsilon}{2}.
$$

三角不等式により

$$
|f(u)-f(v)|
\le
|f(u)-f(x_i)|
+
|f(v)-f(x_i)|
<
\varepsilon.
$$

この $\delta$ は $u,v$ に依存しません。従って $f$ は $[a,b]$ 上で一様連続です。
<!-- solution-end -->

---

## 8. 次に進む

閉区間上で最大値・最小値が実際に取れることまで分かったので、次はその極値を微分で検出し、Rolle の定理・平均値定理へ進みます。

**次：[RA3 微分法の理論](../RA3/index.md)**
