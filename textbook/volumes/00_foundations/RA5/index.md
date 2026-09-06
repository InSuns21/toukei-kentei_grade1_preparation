# RA5 標準実解析 V：関数列・関数級数・一様収束

関数列では「各 $x$ では収束する」だけでは、連続性・積分・微分が極限へ引き継がれません。ここで必要になるのが一様収束です。

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
> $f_n\to f$ が一様収束するとは、任意の $\varepsilon>0$ に対しある $N$ が存在して、すべての $n\ge N$ とすべての $x\in E$ について
> $$
> |f_n(x)-f(x)|<\varepsilon
> $$
> となることをいう。
<!-- formal-statement-end -->

同値に
$$
\sup_{x\in E}|f_n(x)-f(x)|\to0
$$
です。量化記号の順序が本体です。

<a id="def-ra5-uniform-cauchy"></a>
<!-- formal-statement-start -->
> **定義（一様Cauchy条件）**  
> 任意の $\varepsilon>0$ に対しある $N$ が存在して、$m,n\ge N$ ならすべての $x\in E$ について
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

点 $x_0$ と $\varepsilon>0$ を固定します。一様収束から $n$ を十分大きくして
$$
\sup_x|f_n(x)-f(x)|<\varepsilon/3
$$
とします。この固定した $f_n$ の $x_0$ での連続性から、$|x-x_0|<\delta$ なら
$$
|f_n(x)-f_n(x_0)|<\varepsilon/3.
$$
三角不等式で
$$
|f(x)-f(x_0)|<\varepsilon.
$$
よって $f$ は連続です。$\square$
<!-- proof-end -->

反例は $f_n(x)=x^n$ on $[0,1]$。各 $f_n$ は連続ですが各点極限は $[0,1)$ で0、$x=1$ で1となり不連続です。したがって収束は一様ではありません。

---

## 3. 積分と極限の交換

<a id="thm-ra5-integral"></a>
<!-- formal-statement-start -->
> **定理（一様収束と積分の交換）**  
> $f_n$ が $[a,b]$ 上Riemann可積分で $f_n\to f$ が一様収束するなら $f$ もRiemann可積分で
> $$
> \int_a^b f(x)dx=\lim_{n\to\infty}\int_a^b f_n(x)dx.
> $$
<!-- formal-statement-end -->

核は
$$
\left|\int_a^b(f_n-f)dx\right|
\le(b-a)\sup_{x\in[a,b]}|f_n(x)-f(x)|\to0
$$
です。

---

## 4. 微分と極限の交換はさらに強い条件が要る

<a id="thm-ra5-derivative"></a>
<!-- formal-statement-start -->
> **定理（微分と極限の交換）**  
> $f_n\in C^1([a,b])$ とする。ある $x_0\in[a,b]$ で $(f_n(x_0))$ が収束し、導関数列 $f_n'$ が $[a,b]$ 上一様収束するなら、ある $f\in C^1([a,b])$ に $f_n\to f$ が一様収束し、
> $$
> f'=\lim_{n\to\infty}f_n'
> $$
> が成り立つ。
<!-- formal-statement-end -->

FTCにより
$$
f_n(x)=f_n(x_0)+\int_{x_0}^x f_n'(t)dt
$$
と書き、積分と極限を交換するのが証明の骨格です。

---

## 5. 関数級数とWeierstrass M-test

<a id="thm-ra5-mtest"></a>
<!-- formal-statement-start -->
> **定理（Weierstrass M-test）**  
> $|f_n(x)|\le M_n$ がすべての $x\in E$ で成り立ち、数値級数 $\sum M_n$ が収束するなら、関数級数 $\sum f_n(x)$ は $E$ 上一様かつ絶対収束する。
<!-- formal-statement-end -->

tailについて
$$
\sup_x\left|\sum_{k=n+1}^m f_k(x)\right|
\le\sum_{k=n+1}^mM_k
$$
と抑えれば一様Cauchy条件が出ます。

冪級数は収束半径の内部の閉区間ではM-testで一様収束するため、項別積分・項別微分が正当化できます。

---

## 6. 演習

### Level A

<a id="ex-ra5-a01"></a>
#### RA5-A01 x^nの各点極限
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

$\sum_{n=1}^\infty x^n/n^2$ が $[-1,1]$ 上一様収束することを示せ。

<!-- solution-start -->
**解答**：$|x^n/n^2|\le1/n^2$ で $\sum1/n^2$ は収束。M-testより一様絶対収束。
<!-- solution-end -->

<a id="ex-ra5-a04"></a>
#### RA5-A04 積分交換
- Level: A

$f_n(x)=x/n$ on $[0,1]$ について $\lim_n\int_0^1f_n=\int_0^1\lim_nf_n$ を確認せよ。

<!-- solution-start -->
**解答**：左辺は $\lim 1/(2n)=0$、右辺は $\int_0^10dx=0$。
<!-- solution-end -->

### Level B

<a id="ex-ra5-b01"></a>
#### RA5-B01 x^nが一様収束しないこと
- Level: B

A01の関数列が $[0,1]$ 上一様収束しないことを示せ。

<!-- solution-start -->
**解答**：一様極限なら連続関数列の極限は連続であるはずだが、A01の極限は1で不連続。したがって一様収束ではない。
<!-- solution-end -->

<a id="ex-ra5-b02"></a>
#### RA5-B02 開区間ではM-testが効くか
- Level: B

$\sum x^n$ は $(-1,1)$ の各点で収束するが、$(-1,1)$ 全体では一様収束しないことを示せ。

<!-- solution-start -->
**解答**：tailの最初の項 $|x|^{N+1}$ だけでも $x\uparrow1$ とすると上限は1。したがってtailを領域全体で一様に小さくできない。任意の $r<1$ に対する $[-r,r]$ では一様収束する。
<!-- solution-end -->

<a id="ex-ra5-b03"></a>
#### RA5-B03 項別積分
- Level: B

$0\le r<1$ とし、$\sum_{n=0}^\infty x^n$ を $[0,r]$ で項別積分して $-\log(1-r)$ の級数表示を得よ。

<!-- solution-start -->
**解答**：$[0,r]$ では $|x^n|\le r^n$ で幾何級数により一様収束。したがって
$$
\int_0^r\sum_{n=0}^\infty x^n dx
=\sum_{n=0}^\infty\frac{r^{n+1}}{n+1}.
$$
左辺は $\int_0^r(1-x)^{-1}dx=-\log(1-r)$。
<!-- solution-end -->

### Level C

<a id="ex-ra5-c01"></a>
#### RA5-C01 微分交換条件の必要性
- Level: C

$f_n(x)=\sqrt{x^2+1/n}$ on $[-1,1]$ を考える。$f_n$ は各点で $|x|$ に収束するが、導関数 $f_n'(x)=x/\sqrt{x^2+1/n}$ は0で常に0である一方、極限関数 $|x|$ は0で微分不能である。この例が「関数列が一様収束するだけでは微分と極限を交換できない」ことをどう示しているか説明せよ。

<!-- solution-start -->
**解答**：実際 $0\le f_n(x)-|x|\le1/\sqrt n$ なので $f_n\to|x|$ は一様収束する。それでも極限は0で微分不能。したがって関数列自身の一様収束だけでは不十分で、定理のように導関数列の一様収束など追加条件が必要である。ここでは $f_n'$ は0近傍で急変し、一様収束しない。
<!-- solution-end -->

---

## 7. 次に進む

実解析の第一バッチはここで閉じます。次はRiemann積分とLebesgue積分を明示的につなぐ **MT-RL** です。
