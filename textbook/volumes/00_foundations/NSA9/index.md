# NSA9 級数・関数列・一様収束を無限添字で読む

NSA6 では、数列の「十分大きい添字」を無限超自然数へ置き換えると、極限と Cauchy 条件を無限小近接で読めることを示しました。RA1 と RA5 では、その考えを級数・関数列へ進めるための標準解析を学びました。

関数列では添字だけでなく点 $x$ も動きます。各点収束なら「標準点 $x$ を一つ固定してから添字を無限へ送る」で足ります。しかし一様収束では、収束速度が点に依存してはいけません。超準世界では標準点だけを見るのでは足りず、${}^*E$ の全ての超準点を同時に調べる必要があります。

この章では、級数を無限添字の尾和で読み、各点収束と一様収束の量化順序の差を超準点で可視化し、一様 Cauchy 条件と Weierstrass M-test まで接続します。標準側の定義・定理は [RA1 の級数](../RA1/index.md#def-ra1-series) と [RA5 の各点収束・一様収束](../RA5/index.md#def-ra5-pointwise)を正本として使います。

---

## 1. 級数は無限添字どうしの尾和で判定できる

実数級数

$$
\sum_{n=1}^{\infty}a_n
$$

を考え、部分和を

$$
s_N=\sum_{n=1}^{N}a_n
$$

と置きます。級数の収束は部分和列 $(s_N)$ の収束です。[RA1 の級数の Cauchy 判定](../RA1/index.md#thm-ra1-series-cauchy)では、十分後ろの有限尾和が一様に小さくなることと収束が同値でした。

<a id="thm-nsa9-series-cauchy"></a>
<!-- formal-statement-start -->
### 定理（級数の超準的 Cauchy 判定）

標準実数列 $(a_n)$ に対し、次は同値である。

1. 級数 $\sum_{n=1}^{\infty}a_n$ は収束する。
2. 任意の無限超自然数 $H,K\in{}^*\mathbb N$ で $H<K$ なら

$$
\sum_{n=H+1}^{K}{}^*a_n\approx0.
$$
<!-- formal-statement-end -->

### 証明の見取り図

部分和列 $(s_N)$ を一つの標準数列として見て、NSA6 の Cauchy 条件の特徴付けを適用します。差 $s_K-s_H$ が尾和になることだけを確認すればよいです。

<!-- proof-start -->
### 証明

[RA1 の級数の Cauchy 判定](../RA1/index.md#thm-ra1-series-cauchy)と[実数の完備性](../RA1/index.md#thm-ra1-real-completeness)から、

$$
\sum_{n=1}^{\infty}a_n\text{ が収束}
\iff
(s_N)\text{ が Cauchy 列}
$$

です。

[NSA6 の Cauchy 条件の超準的特徴付け](../NSA6/index.md#thm-nsa6-cauchy)を $(s_N)$ に適用すると、

$$
(s_N)\text{ が Cauchy}
\iff
{}^*s_H\approx{}^*s_K
$$

が任意の無限 $H,K$ について成り立ちます。

$H<K$ とすると、有限部分和の恒等式を移送して

$$
{}^*s_K-{}^*s_H
=
\sum_{n=H+1}^{K}{}^*a_n.
$$

従って

$$
{}^*s_H\approx{}^*s_K
\iff
\sum_{n=H+1}^{K}{}^*a_n\approx0.
$$

以上をつなげれば結論です。
<!-- proof-end -->

### 幾何級数と調和級数

$a_n=2^{-n}$ なら、無限 $H<K$ に対して

$$
0<
\sum_{n=H+1}^{K}2^{-n}
<
2^{-H}.
$$

標準列 $2^{-n}\to0$ なので $2^{-H}\approx0$ です。従って尾和も無限小です。

一方、調和級数では $K=2H$ と取ると

$$
\sum_{n=H+1}^{2H}\frac1n
\ge
H\frac1{2H}
=
\frac12.
$$

尾和が無限小になりません。一般項 $1/H$ が無限小であることだけでは級数収束には足りません。

---

## 2. 比較判定は無限尾和の大小比較になる

[RA1A の比較判定](../RA1A/index.md#thm-ra1a-comparison)は、十分大きい添字で $0\le a_n\le b_n$ なら、$\sum b_n$ の収束から $\sum a_n$ の収束を導きます。

<a id="cor-nsa9-comparison"></a>
<!-- formal-statement-start -->
### 系（比較判定の無限尾和表示）

標準実数列 $(a_n),(b_n)$ が、ある標準 $N_0$ 以降で

$$
0\le a_n\le b_n
$$

を満たすとする。$\sum b_n$ が収束するなら $\sum a_n$ も収束する。
<!-- formal-statement-end -->

<!-- proof-start -->
### 証明

無限 $H<K$ を任意に取ります。$H\ge N_0$ なので、有限の項別不等式を移送して

$$
0
\le
\sum_{n=H+1}^{K}{}^*a_n
\le
\sum_{n=H+1}^{K}{}^*b_n.
$$

$\sum b_n$ の収束から、[級数の超準的 Cauchy 判定](#thm-nsa9-series-cauchy)により右端は無限小です。中央も非負で右端以下だから無限小です。

任意の無限 $H<K$ でこの条件が成り立つため、同じ定理を逆向きに使って $\sum a_n$ は収束します。
<!-- proof-end -->

標準解析の比較判定が、実際には「十分後ろの尾和を一つの収束する尾和で抑える」議論であることが見えます。

---

## 3. 各点収束は標準点を固定してから無限添字へ送る

標準関数列 $f_n:E\to\mathbb R$ を考えます。[RA5 の各点収束](../RA5/index.md#def-ra5-pointwise)では、各標準点 $x\in E$ を一つ固定した後で、数列 $(f_n(x))$ の収束を調べます。

<a id="thm-nsa9-pointwise"></a>
<!-- formal-statement-start -->
### 定理（各点収束の超準的特徴付け）

標準関数列 $f_n:E\to\mathbb R$ と標準関数 $f:E\to\mathbb R$ に対し、次は同値である。

1. $f_n\to f$ は $E$ 上で各点収束する。
2. 任意の標準点 $x\in E$ と任意の無限超自然数 $H$ に対して

$$
{}^*f_H(x)\approx f(x).
$$
<!-- formal-statement-end -->

<!-- proof-start -->
### 証明

標準点 $x\in E$ を固定し、標準実数列

$$
a_n=f_n(x)
$$

を考えます。[NSA6 の数列極限の超準的特徴付け](../NSA6/index.md#thm-nsa6-sequence-limit)から、

$$
a_n\to f(x)
\iff
{}^*a_H\approx f(x)
$$

が任意の無限 $H$ について成り立ちます。

関数列の評価を移送すると ${}^*a_H={}^*f_H(x)$ なので、

$$
f_n(x)\to f(x)
\iff
{}^*f_H(x)\approx f(x).
$$

これを全ての標準点 $x$ について要求したものが結論です。
<!-- proof-end -->

ここでは $x$ が標準点であることが重要です。各点収束は、標準世界の各点を一つずつ固定して調べる概念だからです。

---

## 4. 一様収束では全ての超準点を見る

各点収束では $N$ が点 $x$ に依存してよいのに対し、一様収束では一つの $N$ が全ての点に同時に効きます。この全称量化を移送すると、標準点だけでなく ${}^*E$ の全点へ広がります。

<a id="thm-nsa9-uniform"></a>
<!-- formal-statement-start -->
### 定理（一様収束の超準的特徴付け）

標準関数列 $f_n:E\to\mathbb R$ と標準関数 $f:E\to\mathbb R$ に対し、次は同値である。

1. $f_n\to f$ は $E$ 上で一様収束する。
2. 任意の無限超自然数 $H$ と任意の $X\in{}^*E$ に対して

$$
{}^*f_H(X)\approx{}^*f(X).
$$
<!-- formal-statement-end -->

### 証明の見取り図

順方向では、一様収束の標準 $N$ が点に依存しないため、その同じ $N$ が移送後の全超準点にも効きます。逆方向では、一様収束の否定を無限の開始位置へ移送し、無限添字と超準点の反例を作ります。

<!-- proof-start -->
### 証明

$f_n\to f$ が一様収束するとします。標準 $\varepsilon>0$ に対し、ある標準 $N$ が存在して

$$
n\ge N,\ x\in E
\Longrightarrow
|f_n(x)-f(x)|<\varepsilon.
$$

移送により、

$$
\nu\ge N,\ X\in{}^*E
\Longrightarrow
|{}^*f_\nu(X)-{}^*f(X)|<\varepsilon.
$$

無限 $H$ は $H\ge N$ なので、任意の $X\in{}^*E$ について同じ評価が成り立ちます。任意の標準 $\varepsilon>0$ で成り立つため差は無限小です。

逆に、超準条件が成り立つのに一様収束しないと仮定します。一様収束の否定から、ある標準 $\varepsilon_0>0$ が存在して、任意の標準 $N$ に対し

$$
\exists n\ge N\;\exists x\in E:
|f_n(x)-f(x)|\ge\varepsilon_0.
$$

この文を移送すると、任意の $N\in{}^*\mathbb N$ に対し

$$
\exists \nu\ge N\;\exists X\in{}^*E:
|{}^*f_\nu(X)-{}^*f(X)|\ge\varepsilon_0.
$$

無限超自然数 $N_0$ を一つ代入すると、$\nu\ge N_0$ は無限です。従って無限 $\nu$ と超準点 $X$ で差が標準正実数 $\varepsilon_0$ 以上となり、超準条件に反します。

よって一様収束します。
<!-- proof-end -->

したがって、各点収束は標準点を固定して無限添字を見るのに対し、一様収束は全超準点と無限添字を同時に見ます。

---

## 5. $x^n$ は境界へ寄る超準点が非一様性を検出する

$E=[0,1)$ 上で $f_n(x)=x^n$ とします。各標準 $x<1$ では $x^n\to0$ なので各点収束します。

しかし無限 $H$ を取り、

$$
X=1-\frac1{H^2}
$$

と置くと $X\in{}^*[0,1)$ です。有限自然数 $n$ と $0\le u\le1$ に対する

$$
(1-u)^n\ge1-nu
$$

を移送し、$n=H$, $u=1/H^2$ と代入すると

$$
1-\frac1H
\le
\left(1-\frac1{H^2}\right)^H
\le1.
$$

従って $X^H\approx1$ です。極限関数は0なので

$$
{}^*f_H(X)=X^H\not\approx0.
$$

一様収束の超準的特徴付けに反します。標準点を一つ固定すると境界まで標準的な距離がありますが、超準点は境界へ無限小距離まで近づけます。一様性を壊す「動く悪い点」を一つの点として捕まえたわけです。

---

## 6. 一様 Cauchy 条件も全超準点で判定する

極限関数がまだ分からないときは、RA5 の [一様 Cauchy 条件](../RA5/index.md#def-ra5-uniform-cauchy)を使います。

<a id="thm-nsa9-uniform-cauchy"></a>
<!-- formal-statement-start -->
### 定理（一様 Cauchy 条件の超準的特徴付け）

標準実数値関数列 $f_n:E\to\mathbb R$ に対し、次は同値である。

1. $(f_n)$ は $E$ 上で一様 Cauchy である。
2. 任意の無限超自然数 $H,K$ と任意の $X\in{}^*E$ に対して

$$
{}^*f_H(X)\approx{}^*f_K(X).
$$
<!-- formal-statement-end -->

<!-- proof-start -->
### 証明

一様 Cauchy 条件は

$$
\forall\varepsilon>0\;
\exists N\;
\forall m,n\ge N\;
\forall x\in E:
|f_m(x)-f_n(x)|<\varepsilon
$$

です。

順方向では、標準 $\varepsilon>0$ に対して得られる標準 $N$ を固定して移送すると、任意の超自然数 $\mu,\nu\ge N$ と任意の $X\in{}^*E$ で同じ不等式が成り立ちます。特に無限 $H,K$ で差は無限小です。

逆方向で一様 Cauchy でないとすると、ある標準 $\varepsilon_0>0$ が存在し、任意の標準 $N$ に対して

$$
\exists m,n\ge N\;\exists x\in E:
|f_m(x)-f_n(x)|\ge\varepsilon_0.
$$

これを移送し、開始位置に無限超自然数 $N_0$ を代入すると、無限 $\mu,\nu\ge N_0$ と $X\in{}^*E$ が存在して差が $\varepsilon_0$ 以上になります。仮定に反するので一様 Cauchy です。
<!-- proof-end -->

実数値関数列では [RA5 の一様 Cauchy 判定](../RA5/index.md#thm-ra5-uniform-cauchy-criterion)により、一様 Cauchy と一様収束は同値です。

---

## 7. Weierstrass M-test は尾和の一様上界になる

部分和関数を

$$
S_N(x)=\sum_{n=1}^{N}f_n(x)
$$

とします。[RA5 の Weierstrass M-test](../RA5/index.md#thm-ra5-mtest)の仮定 $|f_n(x)|\le M_n$ が全点で成り立つとき、数値尾和が関数尾和を点に依存せず抑えます。

<a id="cor-nsa9-mtest"></a>
<!-- formal-statement-start -->
### 系（Weierstrass M-test の超準的読み方）

標準関数列 $f_n:E\to\mathbb R$ と標準非負数列 $(M_n)$ が

$$
|f_n(x)|\le M_n
\qquad
(\forall n,\ \forall x\in E)
$$

を満たし、$\sum M_n$ が収束するとする。

任意の無限 $H<K$ と任意の $X\in{}^*E$ に対し、

$$
\left|
\sum_{n=H+1}^{K}{}^*f_n(X)
\right|
\approx0.
$$

従って関数級数 $\sum f_n$ の部分和関数列は $E$ 上で一様収束する。
<!-- formal-statement-end -->

<!-- proof-start -->
### 証明

仮定を移送すると

$$
|{}^*f_n(X)|\le{}^*M_n
$$

が全ての超自然数 $n$ と $X\in{}^*E$ で成り立ちます。無限 $H<K$ に対して、有限和の三角不等式を移送すると、

$$
\left|
\sum_{n=H+1}^{K}{}^*f_n(X)
\right|
\le
\sum_{n=H+1}^{K}|{}^*f_n(X)|
\le
\sum_{n=H+1}^{K}{}^*M_n.
$$

$\sum M_n$ は収束するので、[級数の超準的 Cauchy 判定](#thm-nsa9-series-cauchy)から右端は無限小です。

従って部分和関数列は [一様 Cauchy 条件の超準的特徴付け](#thm-nsa9-uniform-cauchy)を満たします。最後に [RA5 の一様 Cauchy 判定](../RA5/index.md#thm-ra5-uniform-cauchy-criterion)から一様収束します。
<!-- proof-end -->

同じ数値尾和が全ての超準点を同時に抑えることが、一様性の源です。

---

## 8. 一様極限と連続性

[RA5 の一様極限の連続性](../RA5/index.md#thm-ra5-continuity)では、各 $f_n$ が連続で $f_n\to f$ が一様なら $f$ も連続です。

ここで無限添字 $H$ を固定して ${}^*f_H(X)\approx{}^*f_H(a)$ と即座に書くのは危険です。各標準 $f_n$ が連続でも、連続性の尺度は $n$ に依存し得ます。

正しい証明では、まず一様収束から標準の一つの添字 $n_0$ を選び、

$$
|f_{n_0}(x)-f(x)|<\frac{\varepsilon}{3}
$$

を全ての $x$ で同時に確保します。その後、固定した標準関数 $f_{n_0}$ の連続性から $\delta$ を取り、

$$
|f(x)-f(a)|
\le
|f(x)-f_{n_0}(x)|
+
|f_{n_0}(x)-f_{n_0}(a)|
+
|f_{n_0}(a)-f(a)|
<
\varepsilon.
$$

超準的特徴付けの価値は証明を無理に一行へ短縮することではなく、「悪い点が動いても全超準点の量化から逃げられない」ことを見える形にする点にあります。

---

## 9. 幾何関数級数：局所一様と全域非一様

幾何関数級数

$$
\sum_{n=0}^{\infty}x^n
$$

を考えます。標準 $0<r<1$ を固定し、$E_r=[-r,r]$ とします。$X\in{}^*E_r$ なら $|X|\le r$ なので、無限 $H<K$ に対し

$$
\left|
\sum_{n=H+1}^{K}X^n
\right|
\le
\sum_{n=H+1}^{K}r^n
\le
\frac{r^{H+1}}{1-r}
\approx0.
$$

従って $[-r,r]$ 上では一様収束します。

しかし $E=(-1,1)$ 全体では一様収束しません。無限 $H$ と $X=1-1/H^2$ を使うと $X^H\approx1$ です。極限関数 $f(x)=1/(1-x)$ と有限部分和 $S_H$ について、有限幾何級数公式の移送から

$$
{}^*f(X)-{}^*S_H(X)
=
\frac{X^{H+1}}{1-X}
=
H^2X^{H+1}.
$$

$X^{H+1}\approx1$ なので、この差は無限小どころか無限大です。同じ関数級数でも、境界から標準距離を取った閉区間では一様、境界へ無限小距離まで近づける全区間では非一様です。

---

## 10. この章で得た見方

- 級数の収束：無限 $H<K$ の尾和が全て無限小。
- 各点収束：標準点 $x$ を固定し、全ての無限 $H$ で ${}^*f_H(x)\approx f(x)$。
- 一様収束：全ての超準点 $X\in{}^*E$ と全ての無限 $H$ で ${}^*f_H(X)\approx{}^*f(X)$。
- 一様 Cauchy：全ての超準点 $X$ と無限 $H,K$ で ${}^*f_H(X)\approx{}^*f_K(X)$。
- M-test：点に依存しない数値尾和が、全ての超準点で関数尾和を同時に抑える。

特に一様性では、標準点の全称量化を移送すると全超準点になることが決定的です。$x^n$ のような例では、標準点を一つずつ見る限り悪い点は毎回逃げますが、境界へ無限小距離で寄る超準点を許すと、その逃げ道を一つの反例として固定できます。

---

## 演習

<a id="ex-nsa9-a01"></a>
### NSA9-A01 幾何級数の無限尾和
- Level: A

$a_n=3^{-n}$ とする。無限 $H<K$ に対し尾和が無限小になることを示し、$\sum_{n=1}^{\infty}3^{-n}$ の収束を説明せよ。

<!-- solution-start -->
**詳細解答**。

$$
\sum_{n=H+1}^{K}3^{-n}
=
3^{-(H+1)}
\frac{1-3^{-(K-H)}}{1-\frac13}
<
\frac{3^{-H}}2.
$$

標準列 $3^{-n}\to0$ なので、無限 $H$ では $3^{-H}\approx0$ です。従って尾和も無限小です。任意の無限 $H<K$ で成り立つため、[級数の超準的 Cauchy 判定](#thm-nsa9-series-cauchy)から級数は収束します。
<!-- solution-end -->

<a id="ex-nsa9-a02"></a>
### NSA9-A02 調和級数は一般項が無限小でも発散する
- Level: A

無限 $H$ に対し $\sum_{n=H+1}^{2H}1/n\ge1/2$ を示し、調和級数が収束しないことを説明せよ。

<!-- solution-start -->
**詳細解答**。

$H<n\le2H$ なら $1/n\ge1/(2H)$ です。項数は $H$ 個なので

$$
\sum_{n=H+1}^{2H}\frac1n
\ge
H\frac1{2H}
=
\frac12.
$$

$1/2$ は無限小ではありません。従って無限添字間の尾和が無限小になる条件を満たさず、調和級数は発散します。
<!-- solution-end -->

<a id="ex-nsa9-a03"></a>
### NSA9-A03 $x^n$ の各点収束
- Level: A

$f_n(x)=x^n$ を $[0,1)$ 上で考える。標準 $x\in[0,1)$ と無限 $H$ に対し $x^H\approx0$ であることを説明せよ。

<!-- solution-start -->
**詳細解答**。

標準 $x\in[0,1)$ を固定すると、標準解析で $x^n\to0$ です。[NSA6 の数列極限の超準的特徴付け](../NSA6/index.md#thm-nsa6-sequence-limit)を適用すると、任意の無限 $H$ に対して $x^H\approx0$ です。従って[各点収束の超準的特徴付け](#thm-nsa9-pointwise)から $f_n\to0$ は各点収束です。
<!-- solution-end -->

<a id="ex-nsa9-a04"></a>
### NSA9-A04 $[0,r]$ 上では $x^n$ は一様に0へ収束する
- Level: A

標準 $0<r<1$ を固定する。$E=[0,r]$ 上で $f_n(x)=x^n$ が0へ一様収束することを示せ。

<!-- solution-start -->
**詳細解答**。

任意の無限 $H$ と $X\in{}^*[0,r]$ を取ります。$0\le X\le r$ なので

$$
0\le X^H\le r^H.
$$

標準列 $r^n\to0$ だから $r^H\approx0$ です。従って $X^H\approx0$ です。全ての無限 $H$ と全超準点 $X$ で成り立つため、一様収束します。
<!-- solution-end -->

<a id="ex-nsa9-a05"></a>
### NSA9-A05 各点収束と一様収束の量化対象
- Level: A

各点収束の超準条件では標準点だけを見て、一様収束の超準条件では全超準点を見る理由を説明せよ。

<!-- solution-start -->
**詳細解答**。

各点収束では、最初に標準点 $x$ を固定し、その点での数列 $(f_n(x))$ を調べます。したがって無限添字へ拡張されるのは添字側です。

一様収束では、一つの $N$ が全ての $x\in E$ に同時に効きます。この全称量化を移送すると、$x$ の範囲は ${}^*E$ の全点へ広がります。この差が「動く悪い点」を検出します。
<!-- solution-end -->

<a id="ex-nsa9-b01"></a>
### NSA9-B01 比較判定を無限尾和で再構成する
- Level: B

ある標準 $N_0$ 以降で $0\le a_n\le b_n$ とし、$\sum b_n$ は収束するとする。$\sum a_n$ の収束を示せ。

<!-- solution-start -->
**詳細解答**。

無限 $H<K$ を任意に取ります。$H\ge N_0$ なので

$$
0
\le
\sum_{n=H+1}^{K}{}^*a_n
\le
\sum_{n=H+1}^{K}{}^*b_n.
$$

右端は $\sum b_n$ の収束により無限小です。従って中央も無限小です。任意の無限 $H<K$ で成り立つため、[級数の超準的 Cauchy 判定](#thm-nsa9-series-cauchy)から $\sum a_n$ は収束します。
<!-- solution-end -->

<a id="ex-nsa9-b02"></a>
### NSA9-B02 一様 Cauchy 条件の逆向き
- Level: B

任意の無限 $H,K$ と任意の $X\in{}^*E$ に対し ${}^*f_H(X)\approx{}^*f_K(X)$ とする。一様 Cauchy でないと仮定して矛盾を導け。

<!-- solution-start -->
**詳細解答**。

一様 Cauchy でないなら、ある標準 $\varepsilon_0>0$ が存在して、任意の標準 $N$ に対し

$$
\exists m,n\ge N\;\exists x\in E:
|f_m(x)-f_n(x)|\ge\varepsilon_0.
$$

移送後、開始位置に無限 $N_0$ を代入すると、ある無限 $\mu,\nu\ge N_0$ と $X\in{}^*E$ が存在して差が $\varepsilon_0$ 以上になります。しかし仮定では差は無限小なので矛盾です。
<!-- solution-end -->

<a id="ex-nsa9-b03"></a>
### NSA9-B03 $x^n$ の非一様収束を超準点で検出する
- Level: B

$E=[0,1)$、$f_n(x)=x^n$ とする。無限 $H$ と $X=1-1/H^2$ に対して $X^H\approx1$ を示し、一様収束しないことを証明せよ。

<!-- solution-start -->
**詳細解答**。

$X\in{}^*[0,1)$ です。移送した不等式 $(1-u)^n\ge1-nu$ へ $n=H$, $u=1/H^2$ を代入すると

$$
1-\frac1H
\le
X^H
\le1.
$$

$1/H\approx0$ だから $X^H\approx1$ です。極限候補は0ですが ${}^*f_H(X)\not\approx0$ なので、一様収束の超準的特徴付けに反します。
<!-- solution-end -->

<a id="ex-nsa9-b04"></a>
### NSA9-B04 M-test を超準的に使う
- Level: B

標準 $0<r<1$ とし、$E=[-r,r]$ 上で $f_n(x)=x^n$ とする。$M_n=r^n$ を使って $\sum_{n=0}^{\infty}x^n$ が一様収束することを示せ。

<!-- solution-start -->
**詳細解答**。

$x\in[-r,r]$ なら $|f_n(x)|=|x|^n\le r^n=M_n$ です。数値級数 $\sum r^n$ は収束します。従って任意の無限 $H<K$ と $X\in{}^*[-r,r]$ について

$$
\left|
\sum_{n=H+1}^{K}X^n
\right|
\le
\sum_{n=H+1}^{K}r^n
\approx0.
$$

部分和関数列は一様 Cauchy であり、[RA5 の一様 Cauchy 判定](../RA5/index.md#thm-ra5-uniform-cauchy-criterion)から一様収束します。
<!-- solution-end -->

<a id="ex-nsa9-c01"></a>
### NSA9-C01 幾何関数級数は境界から離れた閉区間では一様だが $(-1,1)$ 全体では一様でない
- Level: C

$$
S_N(x)=\sum_{n=0}^{N}x^n,
\qquad
f(x)=\frac1{1-x}
$$

とする。

1. 任意の標準 $0<r<1$ に対して $[-r,r]$ 上では $S_N\to f$ が一様収束することを示せ。
2. $(-1,1)$ 全体では一様収束しないことを、無限 $H$ と $X=1-1/H^2$ を使って示せ。

<!-- solution-start -->
**詳細解答**。

まず $X\in{}^*[-r,r]$ と無限 $H$ を取ります。有限幾何級数公式の移送から

$$
|{}^*f(X)-{}^*S_H(X)|
=
\frac{|X|^{H+1}}{|1-X|}
\le
\frac{r^{H+1}}{1-r}.
$$

$r^{H+1}\approx0$ で、$1-r$ は標準正実数なので右辺は無限小です。全ての超準点で成り立つため、$[-r,r]$ 上で一様収束します。

次に $E=(-1,1)$ とし、$X=1-1/H^2$ を取ります。$X\in{}^*E$ で、B03 と同様に $X^H\approx1$、さらに $X\approx1$ なので $X^{H+1}\approx1$ です。

部分和公式から

$$
{}^*f(X)-{}^*S_H(X)
=
\frac{X^{H+1}}{1-X}
=
H^2X^{H+1}.
$$

これは無限大であり無限小ではありません。従って一様収束の超準的特徴付けに反し、$(-1,1)$ 全体では一様収束しません。

同じ級数でも、境界から標準距離を取れば一様、境界へ無限小距離まで近づける領域では非一様になることが確認できました。
<!-- solution-end -->
