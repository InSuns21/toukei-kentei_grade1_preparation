# RA5 標準実解析 V：関数列・関数級数・一様収束

関数列では「各 $x$ では収束する」だけでは、連続性・積分・微分が極限へ引き継がれません。その境界を整理するのが一様収束です。

---

## 1. 各点収束と一様収束

<a id="def-ra5-pointwise"></a>
<!-- formal-statement-start -->
> **定義（各点収束）**  
> $f_n:E\to\mathbb R$ が $f$ に各点収束するとは、各 $x\in E$ を固定したとき
> $$
> f_n(x)\to f(x)
> $$
> となることをいう。
<!-- formal-statement-end -->

<a id="def-ra5-uniform"></a>
<!-- formal-statement-start -->
> **定義（一様収束）**  
> $f_n\to f$ が一様収束するとは、任意の $\varepsilon>0$ に対してある $N$ が存在し、すべての $n\ge N$ とすべての $x\in E$ について
> $$
> |f_n(x)-f(x)|<\varepsilon
> $$
> が成り立つことをいう。
<!-- formal-statement-end -->

同値に
$$
\sup_{x\in E}|f_n(x)-f(x)|\to0
$$
です。違いは量化記号の順序です。

<a id="def-ra5-uniform-cauchy"></a>
<!-- formal-statement-start -->
> **定義（一様Cauchy条件）**  
> 任意の $\varepsilon>0$ に対してある $N$ が存在し、$m,n\ge N$ ならすべての $x\in E$ について
> $$
> |f_n(x)-f_m(x)|<\varepsilon
> $$
> となることをいう。
<!-- formal-statement-end -->

---

## 2. 一様極限は連続性を保存する

<a id="thm-ra5-continuity"></a>
<!-- formal-statement-start -->
> **定理（一様極限の連続性）**  
> $f_n:E\to\mathbb R$ がすべて連続で、$f_n\to f$ が一様収束するなら $f$ も連続である。
<!-- formal-statement-end -->

<!-- proof-start -->
### 証明

$x_0$ と $\varepsilon>0$ を固定します。一様収束から $n$ を十分大きくして
$$
\sup_x|f_n(x)-f(x)|<\varepsilon/3
$$
とします。この固定した $f_n$ の連続性により、$|x-x_0|<\delta$ なら
$$
|f_n(x)-f_n(x_0)|<\varepsilon/3.
$$
三角不等式で $|f(x)-f(x_0)|<\varepsilon$。$\square$
<!-- proof-end -->

$f_n(x)=x^n$ on $[0,1]$ は各点収束しますが、極限は $x=1$ だけ値1、それ以外0で不連続です。したがって一様収束ではありません。

---

## 3. 積分と極限の交換

<a id="thm-ra5-integral"></a>
<!-- formal-statement-start -->
> **定理（一様収束と積分の交換）**  
> $f_n$ が $[a,b]$ 上Riemann可積分で $f_n\to f$ が一様収束するなら $f$ もRiemann可積分で
> $$
> \int_a^bf(x)dx=\lim_{n\to\infty}\int_a^bf_n(x)dx.
> $$
<!-- formal-statement-end -->

核になる評価は
$$
\left|\int_a^b(f_n-f)dx\right|
\le(b-a)\sup_{x\in[a,b]}|f_n(x)-f(x)|\to0
$$
です。

---

## 4. 微分と極限の交換

<a id="thm-ra5-derivative"></a>
<!-- formal-statement-start -->
> **定理（微分と極限の交換定理）**  
> $f_n\in C^1([a,b])$ とする。ある $x_0\in[a,b]$ で $(f_n(x_0))$ が収束し、導関数列 $f_n'$ が $[a,b]$ 上一様収束するなら、ある $f\in C^1([a,b])$ に $f_n\to f$ が一様収束し、
> $$
> f'=\lim_{n\to\infty}f_n'
> $$
> が成り立つ。
<!-- formal-statement-end -->

<!-- proof-start -->
### 証明の骨格

[微積分学の基本定理I](../RA4/index.md#thm-ra4-ftc1) を用いて
$$
f_n(x)=f_n(x_0)+\int_{x_0}^{x}f_n'(t)dt
$$
と書きます。導関数列の一様収束により積分との極限交換ができ、右辺の極限から $f$ を構成できます。さらに積分で定義された極限関数を微分すれば、導関数の極限が得られます。$\square$
<!-- proof-end -->

関数列自身が一様収束するだけでは不足です。

---

## 5. 関数級数とM-test

<a id="thm-ra5-mtest"></a>
<!-- formal-statement-start -->
> **定理（Weierstrass M-test）**  
> $|f_n(x)|\le M_n$ がすべての $x\in E$ で成り立ち、数値級数 $\sum M_n$ が収束するなら、関数級数 $\sum f_n(x)$ は $E$ 上一様かつ絶対収束する。
<!-- formal-statement-end -->

実際、tailについて
$$
\sup_x\left|\sum_{k=n+1}^{m}f_k(x)\right|
\le\sum_{k=n+1}^{m}M_k
$$
と抑えれば一様Cauchy条件が得られます。

収束半径の内部に閉区間を取れば冪級数はM-testで一様収束するため、項別積分・項別微分を正当化できます。

---

## 6. 演習

### Level A

<a id="ex-ra5-a01"></a>
#### RA5-A01 $x^n$ の各点極限
- Level: A

$f_n(x)=x^n$ on $[0,1]$ の各点極限を求めよ。

<!-- solution-start -->
**解答**：$0\le x<1$ では $x^n\to0$、$x=1$ では常に1。したがって極限は $[0,1)$ で0、1で1。
<!-- solution-end -->

<a id="ex-ra5-a02"></a>
#### RA5-A02 一様収束判定
- Level: A

$f_n(x)=x/n$ on $[0,1]$ が0へ一様収束することを示せ。

<!-- solution-start -->
**解答**：$\sup_{x\in[0,1]}|x/n|=1/n\to0$。
<!-- solution-end -->

<a id="ex-ra5-a03"></a>
#### RA5-A03 M-test
- Level: A

$\sum_{n=1}^{\infty}x^n/n^2$ が $[-1,1]$ 上一様収束することを示せ。

<!-- solution-start -->
**解答**：$|x^n/n^2|\le1/n^2$ で $\sum1/n^2$ は収束するので [Weierstrass M-test](#thm-ra5-mtest) を適用できる。
<!-- solution-end -->

<a id="ex-ra5-a04"></a>
#### RA5-A04 積分交換
- Level: A

$f_n(x)=x/n$ on $[0,1]$ について積分と極限の交換を直接確認せよ。

<!-- solution-start -->
**解答**：左辺は $\lim_n\int_0^1x/n\,dx=\lim_n1/(2n)=0$、右辺は $\int_0^10\,dx=0$。
<!-- solution-end -->

### Level B

<a id="ex-ra5-b01"></a>
#### RA5-B01 $x^n$ は一様収束しない
- Level: B

A01の関数列が $[0,1]$ 上一様収束しないことを示せ。

<!-- solution-start -->
**解答**：各 $f_n$ は連続だが極限関数は $x=1$ で不連続。[一様極限の連続性](#thm-ra5-continuity) に反するので一様収束ではない。
<!-- solution-end -->

<a id="ex-ra5-b02"></a>
#### RA5-B02 幾何関数級数
- Level: B

$\sum_{n=0}^{\infty}x^n$ は $(-1,1)$ の各点で収束するが、区間全体では一様収束しないことを示せ。

<!-- solution-start -->
**解答**：tailの最初の項 $|x|^{N+1}$ だけ見ても、$x\uparrow1$ とすると上限は1。したがってtailを領域全体で一様に小さくできない。一方、任意の $r<1$ に対する $[-r,r]$ では一様収束する。
<!-- solution-end -->

<a id="ex-ra5-b03"></a>
#### RA5-B03 項別積分
- Level: B

$0\le r<1$ とし、$\sum_{n=0}^{\infty}x^n$ を $[0,r]$ で項別積分して $-\log(1-r)$ の級数表示を得よ。

<!-- solution-start -->
**解答**：$[0,r]$ では $|x^n|\le r^n$ なので一様収束し、[一様収束と積分の交換](#thm-ra5-integral) が使える。したがって
$$
-\log(1-r)=\int_0^r\frac{dx}{1-x}
=\sum_{n=0}^{\infty}\frac{r^{n+1}}{n+1}.
$$
<!-- solution-end -->

### Level C

<a id="ex-ra5-c01"></a>
#### RA5-C01 一様収束だけでは微分交換できない
- Level: C

$f_n(x)=\sqrt{x^2+1/n}$ on $[-1,1]$ を考える。$f_n\to|x|$ は一様収束するが、極限関数は0で微分不能であることを確認し、微分交換に追加条件が必要な理由を説明せよ。

<!-- solution-start -->
**解答**：
$$
0\le\sqrt{x^2+1/n}-|x|\le1/\sqrt n
$$
なので一様収束する。しかし $|x|$ は0で微分不能。一方
$$
f_n'(x)=\frac{x}{\sqrt{x^2+1/n}}
$$
は0近傍で急変し、一様収束しない。したがって関数列自身の一様収束だけでは足りず、[微分と極限の交換定理](#thm-ra5-derivative) のような導関数側の条件が必要である。
<!-- solution-end -->

---

## 7. 次に進む

ここまでで、数列・極限・微分・Riemann積分・一様収束という標準実解析の基礎が一巡しました。次は **MT-RL：Riemann積分とLebesgue積分の橋** へ進みます。
