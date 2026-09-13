# RA5 標準実解析 V：関数列・関数級数・一様収束

数値級数の収束判定は [RA1A](../RA1A/index.md) までで閉じました。ここからは数を足す代わりに関数を足します。関数列では「各 $x$ では収束する」だけでは、連続性・積分・微分が極限へ引き継がれません。その境界を整理するのが一様収束です。

---

## 1. 各点収束と一様収束

<a id="def-ra5-pointwise"></a>
<!-- formal-statement-start -->
> **定義（各点収束）**  
> $f_n:E\to\mathbb R$ が $f$ に各点収束するとは、各 $x\in E$ を固定したとき
$$
f_n(x)\to f(x)
$$
> となることをいう。
<!-- formal-statement-end -->

<a id="def-ra5-uniform"></a>
<!-- formal-statement-start -->
> **定義（一様収束）**  
> $f_n\to f$ が一様収束するとは、任意の $\varepsilon>0$ に対してある $N$ が存在し、すべての $n\ge N$ とすべての $x\in E$ について
$$
|f_n(x)-f(x)|<\varepsilon
$$
> が成り立つことをいう。
<!-- formal-statement-end -->

同値に
$$
\sup_{x\in E}|f_n(x)-f(x)|\to0
$$
です。実際、上限が $\varepsilon$ 未満なら全ての $x$ で誤差が $\varepsilon$ 未満です。逆に全ての $x$ で誤差が $\varepsilon$ 未満なら上限も高々 $\varepsilon$ です。本質的な違いは量化記号の順序で、各点収束では $N$ が $x$ に依存してよいのに対し、一様収束では一つの $N$ を領域全体で共有します。

<a id="def-ra5-uniform-cauchy"></a>
<!-- formal-statement-start -->
> **定義（一様Cauchy条件）**  
> 任意の $\varepsilon>0$ に対してある $N$ が存在し、$m,n\ge N$ ならすべての $x\in E$ について
$$
|f_n(x)-f_m(x)|<\varepsilon
$$
> となることをいう。
<!-- formal-statement-end -->

### 一様Cauchy条件から一様極限を作る

実数値関数列では、一様Cauchy条件は一様収束と同値です。

まず $f_n\to f$ が一様収束するとします。任意の $\varepsilon>0$ に対し、十分大きい $m,n$ では全ての $x$ について
$$
|f_n(x)-f(x)|<\frac\varepsilon2,
\qquad
|f_m(x)-f(x)|<\frac\varepsilon2.
$$
したがって
$$
|f_n(x)-f_m(x)|
\le |f_n(x)-f(x)|+|f_m(x)-f(x)|
<\varepsilon,
$$
なので一様Cauchy条件を満たします。

逆に $(f_n)$ が一様Cauchyだとします。各 $x$ を固定すれば $(f_n(x))$ は実数のCauchy列なので、実数の完備性からある $f(x)\in\mathbb R$ に収束します。これで候補の極限関数 $f$ が各点ごとに定まります。

任意の $\varepsilon>0$ に対し、一様Cauchy条件を $\varepsilon/2$ で使って $N$ を取ります。$n\ge N$ を固定すると、全ての $m\ge N$ と全ての $x$ について
$$
|f_n(x)-f_m(x)|<\frac\varepsilon2.
$$
ここで $m\to\infty$ とすると $f_m(x)\to f(x)$ なので
$$
|f_n(x)-f(x)|\le\frac\varepsilon2<\varepsilon.
$$
この $N$ は $x$ に依存しません。したがって $f_n\to f$ は一様収束です。

<!-- definition-example-start: def-ra5-pointwise, def-ra5-uniform, def-ra5-uniform-cauchy -->
**定義の確認**：$E=[0,1]$, $f_n(x)=x/n$, $f(x)=0$ とします。各 $x$ を固定すれば $x/n\to0$ なので各点収束します。さらに
$$
\sup_{x\in[0,1]}|f_n(x)-f(x)|
=\sup_{x\in[0,1]}\frac{x}{n}
=\frac1n\to0
$$
なので一様収束です。また $m,n\ge N$ なら
$$
\sup_{x\in[0,1]}|f_n(x)-f_m(x)|
\le \frac1n+\frac1m
\le\frac2N.
$$
したがって $N>2/\varepsilon$ とすれば一様Cauchy条件も満たします。同じ例で、各点ごとの極限より一様収束・一様Cauchyの方が強い量化条件を持つことを確認できます。
<!-- definition-example-end -->

---

## 2. 一様極限は連続性を保存する

<a id="thm-ra5-continuity"></a>
<!-- formal-statement-start -->
> **定理（一様極限の連続性）**  
> $f_n:E\to\mathbb R$ がすべて連続で、$f_n\to f$ が一様収束するなら $f$ も連続である。
<!-- formal-statement-end -->

<!-- proof-start -->
### 証明

$x_0\in E$ と $\varepsilon>0$ を固定します。一様収束から、ある $N$ が存在して $n\ge N$ ならすべての $x\in E$ で
$$
|f_n(x)-f(x)|<\frac\varepsilon3.
$$
ここで一つの $n\ge N$ を固定します。この $f_n$ は $x_0$ で連続なので、ある $\delta>0$ が存在して $|x-x_0|<\delta$ なら
$$
|f_n(x)-f_n(x_0)|<\frac\varepsilon3.
$$
したがって
$$
\begin{aligned}
|f(x)-f(x_0)|
&\le |f(x)-f_n(x)|
+|f_n(x)-f_n(x_0)|
+|f_n(x_0)-f(x_0)|\\
&<\frac\varepsilon3+\frac\varepsilon3+\frac\varepsilon3
=\varepsilon.
\end{aligned}
$$
よって $f$ は $x_0$ で連続です。$x_0$ は任意なので $f$ は $E$ 上連続です。$\square$
<!-- proof-end -->

$f_n(x)=x^n$ on $[0,1]$ は各点収束しますが、極限は $x=1$ だけ値1、それ以外0で不連続です。各 $f_n$ は連続なので、もし一様収束なら上の定理により極限も連続でなければなりません。したがってこの収束は一様ではありません。

---

## 3. 積分と極限の交換

<a id="thm-ra5-integral"></a>
<!-- formal-statement-start -->
> **定理（一様収束と積分の交換）**  
> $f_n$ が $[a,b]$ 上Riemann可積分で $f_n\to f$ が一様収束するなら $f$ もRiemann可積分で
$$
\int_a^bf(x)dx=\lim_{n\to\infty}\int_a^bf_n(x)dx.
$$
<!-- formal-statement-end -->

<!-- proof-start -->
### 証明

$a=b$ なら自明なので $a<b$ とします。まず、極限関数 $f$ 自身がRiemann可積分であることを示します。ここを飛ばすと「積分の極限交換」の左辺自体がまだ定義できません。

一様収束から、ある一つの $f_N$ に対して $\|f-f_N\|_\infty<1$ とできます。$f_N$ はRiemann可積分なので有界であり、したがって
$$
|f(x)|\le |f_N(x)|+1
$$
から $f$ も有界です。

任意の $\varepsilon>0$ を取ります。一様収束から、ある $n$ を十分大きく選んで
$$
\|f-f_n\|_\infty
:=\sup_{x\in[a,b]}|f(x)-f_n(x)|
<\eta,
\qquad
\eta=\frac{\varepsilon}{4(b-a)}
$$
とできます。$f_n$ はRiemann可積分なので、[Darboux可積分性判定](../RA4/index.md#thm-ra4-darboux-criterion) から、ある分割 $P$ が存在して
$$
U(f_n,P)-L(f_n,P)<\frac\varepsilon2.
$$

各小区間 $I_i$ で $|f-f_n|<\eta$ だから
$$
\sup_{I_i}f
\le \sup_{I_i}f_n+\eta,
\qquad
\inf_{I_i}f
\ge \inf_{I_i}f_n-\eta.
$$
したがって
$$
U(f,P)\le U(f_n,P)+\eta(b-a),
$$
$$
L(f,P)\ge L(f_n,P)-\eta(b-a).
$$
差を取ると
$$
\begin{aligned}
U(f,P)-L(f,P)
&\le U(f_n,P)-L(f_n,P)+2\eta(b-a)\\
&<\frac\varepsilon2+\frac\varepsilon2
=\varepsilon.
\end{aligned}
$$
よって $f$ はRiemann可積分です。

次に積分値の収束を示します。積分の線形性とRA4の基本評価から
$$
\begin{aligned}
\left|\int_a^bf_n(x)dx-\int_a^bf(x)dx\right|
&=\left|\int_a^b(f_n-f)(x)dx\right|\\
&\le(b-a)\|f_n-f\|_\infty.
\end{aligned}
$$
右辺は一様収束により0へ行くので
$$
\int_a^bf_n(x)dx\to\int_a^bf(x)dx.
$$
$\square$
<!-- proof-end -->

一様収束が効く場所は二つあります。第一に、可積分な $f_n$ の上和・下和へ極限関数 $f$ を一様誤差で挟めること。第二に、積分値の差を区間長×一様誤差で抑えられることです。

---

## 4. 微分と極限の交換

<a id="thm-ra5-derivative"></a>
<!-- formal-statement-start -->
> **定理（微分と極限の交換定理）**  
> $f_n\in C^1([a,b])$ とする。ある $x_0\in[a,b]$ で $(f_n(x_0))$ が収束し、導関数列 $f_n'$ が $[a,b]$ 上一様収束するなら、ある $f\in C^1([a,b])$ に $f_n\to f$ が一様収束し、
$$
f'=\lim_{n\to\infty}f_n'
$$
> が成り立つ。
<!-- formal-statement-end -->

<!-- proof-start -->
### 証明

導関数列の一様極限を
$$
g(x)=\lim_{n\to\infty}f_n'(x)
$$
と置きます。各 $f_n'$ は連続で、一様収束しています。したがって [一様極限の連続性](#thm-ra5-continuity) により $g$ は連続です。

また
$$
c=\lim_{n\to\infty}f_n(x_0)
$$
と置き、候補となる極限関数を
$$
f(x)=c+\int_{x_0}^{x}g(t)dt
$$
で定めます。$g$ は連続なので [微積分学の基本定理I](../RA4/index.md#thm-ra4-ftc1) から
$$
f'(x)=g(x).
$$
したがって $f\in C^1([a,b])$ です。

残るのは $f_n\to f$ が一様であることです。各 $f_n$ に [微積分学の基本定理II](../RA4/index.md#thm-ra4-ftc2) を適用すると
$$
f_n(x)
=f_n(x_0)+\int_{x_0}^{x}f_n'(t)dt.
$$
したがって
$$
\begin{aligned}
|f_n(x)-f(x)|
&\le |f_n(x_0)-c|
+\left|\int_{x_0}^{x}(f_n'(t)-g(t))dt\right|\\
&\le |f_n(x_0)-c|
+(b-a)\|f_n'-g\|_\infty.
\end{aligned}
$$
右辺は $x$ に依存せず、仮定により0へ行きます。よって
$$
\|f_n-f\|_\infty\to0,
$$
すなわち $f_n\to f$ は一様収束です。さらに最初に示したように
$$
f'=g=\lim_{n\to\infty}f_n'.
$$
$\square$
<!-- proof-end -->

関数列自身が一様収束するだけでは不足です。微分は局所的な差商を取る操作なので、導関数側を制御しないと極限で尖りが生まれます。

---

## 5. 関数級数とM-test

<a id="thm-ra5-mtest"></a>
<!-- formal-statement-start -->
> **定理（Weierstrass M-test）**  
> $|f_n(x)|\le M_n$ がすべての $x\in E$ で成り立ち、数値級数 $\sum M_n$ が収束するなら、関数級数 $\sum f_n(x)$ は $E$ 上一様かつ絶対収束する。
<!-- formal-statement-end -->

<!-- proof-start -->
### 証明

まず各 $x\in E$ を固定すると
$$
\sum_{n=1}^{\infty}|f_n(x)|
\le\sum_{n=1}^{\infty}M_n<\infty.
$$
したがって各点で絶対収束します。

次に部分和
$$
S_N(x)=\sum_{n=1}^{N}f_n(x)
$$
を考えます。$m>n$ なら
$$
\begin{aligned}
|S_m(x)-S_n(x)|
&=\left|\sum_{k=n+1}^{m}f_k(x)\right|\\
&\le\sum_{k=n+1}^{m}|f_k(x)|\\
&\le\sum_{k=n+1}^{m}M_k.
\end{aligned}
$$
右辺は $x$ に依存しません。数値級数 $\sum M_n$ は収束するのでCauchy判定により、そのtailは $m,n$ を十分大きくすれば任意に小さくできます。したがって $(S_N)$ は一様Cauchyです。第1節で示した一様Cauchy条件と一様収束の同値性から、$S_N$ はある関数へ一様収束します。$\square$
<!-- proof-end -->

### 冪級数は収束半径の内側で項別積分・項別微分できる

中心 $x_0$、収束半径 $R$ の冪級数
$$
\sum_{n=0}^{\infty}c_n(x-x_0)^n
$$
を考え、$0<\rho<R$ を固定します。さらに
$$
\rho<r<R
$$
を満たす $r$ を一つ取ります。$r<R$ なので
$$
\sum_{n=0}^{\infty}|c_n|r^n
$$
は収束します。$|x-x_0|\le\rho$ なら
$$
|c_n(x-x_0)^n|
\le |c_n|\rho^n
\le |c_n|r^n.
$$
したがって [Weierstrass M-test](#thm-ra5-mtest) により元の冪級数は閉区間 $|x-x_0|\le\rho$ 上で一様収束し、[一様収束と積分の交換](#thm-ra5-integral) により項別積分できます。

項別微分には導関数級数の一様収束も必要です。収束級数の一般項は有界なので、ある $C>0$ が存在して
$$
|c_n|r^n\le C
$$
とできます。すると $n\ge1$ について
$$
\begin{aligned}
n|c_n|\rho^{n-1}
&\le \frac Cr\,n\left(\frac\rho r\right)^{n-1}.
\end{aligned}
$$
$q=\rho/r<1$ と置けば、RA1のCauchy積で得た
$$
\sum_{n=1}^{\infty}nq^{n-1}=\frac1{(1-q)^2}<\infty
$$
から、[Weierstrass M-test](#thm-ra5-mtest) により
$$
\sum_{n=1}^{\infty}n c_n(x-x_0)^{n-1}
$$
は $|x-x_0|\le\rho$ 上一様収束します。部分和 $S_N$ は $C^1$ で、中心では $S_N(x_0)=c_0$ が一定なので、[微分と極限の交換定理](#thm-ra5-derivative) を適用でき、
$$
\frac d{dx}\sum_{n=0}^{\infty}c_n(x-x_0)^n
=\sum_{n=1}^{\infty}n c_n(x-x_0)^{n-1}
$$
が得られます。

「収束半径の内側なら項別微分できる」は、単に元の級数が一様収束するからではなく、**少し大きい半径 $r$ を使って導関数級数までM-testで一様制御できる**ことが核心です。

---

## 6. 演習

### Level A

<a id="ex-ra5-a01"></a>
#### RA5-A01 $x^n$ の各点極限
- Level: A

$f_n(x)=x^n$ on $[0,1]$ の各点極限を求めよ。

<!-- solution-start -->
**解答**：$0\le x<1$ を固定すると幾何数列 $x^n\to0$ です。一方 $x=1$ では
$$
f_n(1)=1
$$
がすべての $n$ で成り立ちます。したがって各点極限 $f$ は
$$
f(x)=
\begin{cases}
0,&0\le x<1,\\
1,&x=1.
\end{cases}
$$
<!-- solution-end -->

<a id="ex-ra5-a02"></a>
#### RA5-A02 一様収束判定
- Level: A

$f_n(x)=x/n$ on $[0,1]$ が0へ一様収束することを示せ。

<!-- solution-start -->
**解答**：$0\le x\le1$ なので
$$
|f_n(x)|=\frac xn\le\frac1n.
$$
実際、最大値は $x=1$ で取られるため
$$
\sup_{x\in[0,1]}|f_n(x)-0|=\frac1n\to0.
$$
したがって一様収束です。
<!-- solution-end -->

<a id="ex-ra5-a03"></a>
#### RA5-A03 M-test
- Level: A

$\sum_{n=1}^{\infty}x^n/n^2$ が $[-1,1]$ 上一様収束することを示せ。

<!-- solution-start -->
**解答**：$|x|\le1$ なら
$$
\left|\frac{x^n}{n^2}\right|\le\frac1{n^2}.
$$
RA1で使った2の冪によるブロック比較から $\sum 1/n^2$ は収束します。したがって $M_n=1/n^2$ として [Weierstrass M-test](#thm-ra5-mtest) を適用でき、$[-1,1]$ 上一様かつ絶対収束します。
<!-- solution-end -->

<a id="ex-ra5-a04"></a>
#### RA5-A04 積分交換
- Level: A

$f_n(x)=x/n$ on $[0,1]$ について積分と極限の交換を直接確認せよ。

<!-- solution-start -->
**解答**：各 $x$ で $f_n(x)\to0$ なので極限関数は $f(x)=0$ です。一方
$$
\int_0^1\frac xn\,dx
=\frac1n\left[\frac{x^2}{2}\right]_0^1
=\frac1{2n}\to0.
$$
したがって
$$
\lim_{n\to\infty}\int_0^1f_n(x)dx=0
=\int_0^1\lim_{n\to\infty}f_n(x)dx.
$$
この例では両辺を別々に計算して一致を直接確認できました。
<!-- solution-end -->

### Level B

<a id="ex-ra5-b01"></a>
#### RA5-B01 $x^n$ は一様収束しない
- Level: B

A01の関数列が $[0,1]$ 上一様収束しないことを示せ。

<!-- solution-start -->
**解答**：A01で求めた極限関数は $[0,1)$ で0、$x=1$ で1なので $x=1$ で不連続です。一方、各 $f_n(x)=x^n$ は $[0,1]$ 上連続です。もし $f_n\to f$ が一様収束なら [一様極限の連続性](#thm-ra5-continuity) により $f$ も連続でなければなりません。矛盾。したがって一様収束ではありません。
<!-- solution-end -->

<a id="ex-ra5-b02"></a>
#### RA5-B02 幾何関数級数
- Level: B

$\sum_{n=0}^{\infty}x^n$ は $(-1,1)$ の各点で収束するが、区間全体では一様収束しないことを示せ。

<!-- solution-start -->
**解答**：各固定 $x\in(-1,1)$ では通常の幾何級数なので収束します。

一様収束しないことは一様Cauchy条件で直接確認できます。部分和を $S_N(x)=\sum_{k=0}^{N}x^k$ とすると
$$
S_{N+1}(x)-S_N(x)=x^{N+1}.
$$
ところが
$$
\sup_{x\in(-1,1)}|x|^{N+1}=1
$$
です。上限1は区間内で達成されませんが、$x$ を1へ十分近づければいくらでも1に近づきます。したがって、例えば $\varepsilon=1/2$ に対して、どれだけ大きい $N$ を取っても
$$
|S_{N+1}(x)-S_N(x)|<\frac12
$$
を全ての $x\in(-1,1)$ で同時に成立させることはできません。よって一様Cauchyではなく、一様収束でもありません。

一方、任意の $0<r<1$ に対する $[-r,r]$ では
$$
|x^n|\le r^n
$$
で、$\sum r^n$ が収束するため [Weierstrass M-test](#thm-ra5-mtest) により一様収束します。
<!-- solution-end -->

<a id="ex-ra5-b03"></a>
#### RA5-B03 項別積分
- Level: B

$0\le r<1$ とし、$\sum_{n=0}^{\infty}x^n$ を $[0,r]$ で項別積分して $-\log(1-r)$ の級数表示を得よ。

<!-- solution-start -->
**解答**：$0\le x\le r<1$ なら
$$
|x^n|\le r^n
$$
で、$\sum r^n$ は収束します。したがって [Weierstrass M-test](#thm-ra5-mtest) から $\sum x^n$ は $[0,r]$ 上一様収束し、[一様収束と積分の交換](#thm-ra5-integral) を使えます。

幾何級数の和は
$$
\sum_{n=0}^{\infty}x^n=\frac1{1-x}
$$
なので
$$
\begin{aligned}
-\log(1-r)
&=\int_0^r\frac{dx}{1-x}\\
&=\int_0^r\sum_{n=0}^{\infty}x^n dx\\
&=\sum_{n=0}^{\infty}\int_0^r x^n dx\\
&=\sum_{n=0}^{\infty}\frac{r^{n+1}}{n+1}.
\end{aligned}
$$
したがって
$$
-\log(1-r)=\sum_{k=1}^{\infty}\frac{r^k}{k},
\qquad 0\le r<1.
$$
<!-- solution-end -->

### Level C

<a id="ex-ra5-c01"></a>
#### RA5-C01 一様収束だけでは微分交換できない
- Level: C

$f_n(x)=\sqrt{x^2+1/n}$ on $[-1,1]$ を考える。$f_n\to|x|$ は一様収束するが、極限関数は0で微分不能であることを確認し、微分交換に追加条件が必要な理由を説明せよ。

<!-- solution-start -->
**解答**：まず
$$
\sqrt{x^2+\frac1n}-|x|
=\frac{1/n}{\sqrt{x^2+1/n}+|x|}\ge0.
$$
また分母は $\sqrt{1/n}=1/\sqrt n$ 以上なので
$$
0\le\sqrt{x^2+\frac1n}-|x|
\le\frac1{\sqrt n}.
$$
したがって
$$
\|f_n-|\cdot|\|_\infty\le\frac1{\sqrt n}\to0,
$$
よって一様収束です。

しかし $|x|$ は0で右微分が1、左微分が $-1$ なので微分可能ではありません。一方
$$
f_n'(x)=\frac{x}{\sqrt{x^2+1/n}}.
$$
各 $f_n'$ は連続ですが、各点極限は
$$
g(x)=
\begin{cases}
-1,&x<0,\\
0,&x=0,\\
1,&x>0,
\end{cases}
$$
で不連続です。もし $f_n'$ が一様収束していれば、[一様極限の連続性](#thm-ra5-continuity) から $g$ は連続でなければならないので矛盾します。したがって導関数列は一様収束していません。

この例は、関数列 $f_n$ 自身の一様収束だけでは微分交換できず、[微分と極限の交換定理](#thm-ra5-derivative) のように導関数側の一様制御が必要であることを示しています。
<!-- solution-end -->

---

## 7. 次に進む

ここまでで、数列・極限・微分・Riemann積分・一様収束という標準実解析の基礎が一巡しました。次は **MT-RL：Riemann積分とLebesgue積分の橋** へ進みます。