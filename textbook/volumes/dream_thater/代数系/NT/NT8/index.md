# NT8 素数分布への入口

[整数の合同式](../NT1/index.md#def-nt1-congruence)や[乗法的な算術関数](../NT4/index.md#def-nt4-multiplicative)を使うと、個々の整数の素因数について調べられます。しかし、ある数までに素数がいくつあるかという全体像は、合同式を解くだけでは見えません。$10$ 以下の素数は $2,3,5,7$ の4個です。上限を大きくしたとき、この個数はどのように増えるのでしょうか。

この章では、まず素数が尽きないことを示します。次に個数・対数の重み・素数冪という三通りの数え方を作り、階乗と二項係数から定量的な上界と下界を導きます。さらに正確な漸近式の意味を調べ、整数の無限和と素数ごとの積を結びます。精密な漸近式そのものの完全証明は ANT 系列へ送ります。

以下、$\mathbb N=\{1,2,\ldots\}$ とし、$\log$ は自然対数、$x\ge2$ は実数とします。

## 1. 素数は有限リストに収まらない

全素数を列挙できたと仮定し、その積に $1$ を加えます。元の素数では割り切れない整数ができるので、有限リストで完結しないことが分かります。

<a id="thm-nt8-euclid-infinitude"></a>

<!-- formal-statement-start -->
> **定理（Euclid の素数無限性）**  
> 正の素数は無限個存在する。
<!-- formal-statement-end -->

### 証明の見取り図

有限個の素数 $p_1,\ldots,p_r$ がすべてだと仮定します。$p_1\cdots p_r+1$ は各 $p_i$ で割ると余りが $1$ ですが、$1$ より大きい整数には素因数があります。

<!-- proof-start -->
### 証明

素数が有限個だと仮定し、その全体を $p_1,\ldots,p_r$ とします。$N=p_1\cdots p_r+1>1$ と置きます。各 $i$ について、$N$ は $p_i$ の倍数に $1$ を加えた数なので $p_i\nmid N$ です。一方 $N>1$ には素因数 $q$ が存在します。仮定から $q=p_i$ となる $i$ があるはずですが、先ほどの $p_i\nmid N$ と矛盾します。
<!-- proof-end -->

例えば $2,3,5$ の積に $1$ を加えると $31$ です。ただし一般の積 $p_1\cdots p_r+1$ が**必ず素数になる**とは限りません。必要なのは、その整数の素因数が元のリストにないことです。

## 2. 素数の個数・重み・冪を区別する

素数が無限個存在するだけでは、$x$ 以下にいくつあるかは分かりません。まず個数を数え、次に大きな素数をより重く数えます。正整数を動かす和は[総和関数](../NT5/index.md#def-nt5-summatory-function)の延長として理解できます。

<a id="def-nt8-prime-counting"></a>

<!-- formal-statement-start -->
> **定義（素数計数関数）**  
> $x\ge2$ に対して
>
$$
\pi(x)=\#\{p\le x:p\text{ は素数}\}
$$
>
> と定める。
<!-- formal-statement-end -->

<!-- definition-example-start: def-nt8-prime-counting -->
**定義の確認**：$\pi(10)=4$ です。$x$ が $10$ から $10.5$ に増えても値は $4$ のままで、$x=11$ では $5$ になります。素数を通過したところで値が $1$ だけ跳ぶ関数です。
<!-- definition-example-end -->

<a id="def-nt8-chebyshev-theta"></a>

<!-- formal-statement-start -->
> **定義（Chebyshev の θ 関数）**  
> $x\ge2$ に対して
>
$$
\theta(x)=\sum_{\substack{p\le x\\p\text{ は素数}}}\log p
$$
>
> と定める。
<!-- formal-statement-end -->

<!-- definition-example-start: def-nt8-chebyshev-theta -->
**定義の確認**：$\theta(10)=\log2+\log3+\log5+\log7=\log210$ です。個数 $4$ に代わり、各素数の対数を足しています。
<!-- definition-example-end -->

階乗では $2$ と $4=2^2$ が別の因子として現れます。素数だけでなく素数冪に重みを与えるため、次の算術関数を作ります。

<a id="def-nt8-von-mangoldt"></a>

<!-- formal-statement-start -->
> **定義（von Mangoldt 関数）**  
> 正整数 $n$ に対して
>
$$
\Lambda(n)=
\begin{cases}
\log p &(n=p^k,\ p\text{ は素数},\ k\ge1),\\
0 &(\text{それ以外})
\end{cases}
$$
>
> と定める。特に $\Lambda(1)=0$ である。
<!-- formal-statement-end -->

<!-- definition-example-start: def-nt8-von-mangoldt -->
**定義の確認**：$8=2^3$ なので $\Lambda(8)=\log2$、$9=3^2$ なので $\Lambda(9)=\log3$ です。$12=2^2\cdot3$ は一種類の素数の冪ではないため $\Lambda(12)=0$ です。
<!-- definition-example-end -->

<a id="def-nt8-chebyshev-psi"></a>

<!-- formal-statement-start -->
> **定義（Chebyshev の ψ 関数）**  
> $x\ge2$ に対して
>
$$
\psi(x)=\sum_{1\le n\le x}\Lambda(n)
$$
>
> と定める。
<!-- formal-statement-end -->

<!-- definition-example-start: def-nt8-chebyshev-psi -->
**定義の確認**：$10$ 以下で $\Lambda(n)\ne0$ なのは $2,3,4,5,7,8,9$ です。従って $\psi(10)=\log(2\cdot3\cdot2\cdot5\cdot7\cdot2\cdot3)=\log2520$、一方 $\theta(10)=\log210$ です。
<!-- definition-example-end -->

<a id="prop-nt8-psi-prime-powers"></a>

<!-- formal-statement-start -->
> **命題（素数冪ごとの分解）**  
> $x\ge2$、$K=\lfloor\log_2x\rfloor$ に対し
>
$$
\psi(x)=\sum_{k=1}^{K}\theta(x^{1/k})
$$
>
> が成り立ち、特に $\psi(x)\ge\theta(x)$ である。
<!-- formal-statement-end -->

### 証明の見取り図

$\Lambda(n)$ が非零の整数を $n=p^k$ と書き、指数 $k$ で分類します。

<!-- proof-start -->
### 証明

定義から $\psi(x)=\sum_{p^k\le x}\log p$ です。$p\ge2$ なので $p^k\le x$ なら $k\le K$ です。指数を固定すると $p^k\le x$ と $p\le x^{1/k}$ は同値で、有限和の順序交換により
$$
\psi(x)=\sum_{k=1}^{K}\ \sum_{p\le x^{1/k}}\log p
=\sum_{k=1}^{K}\theta(x^{1/k}).
$$
$k=1$ の項は $\theta(x)$、残りは非負です。
<!-- proof-end -->

## 3. 階乗の中には $\Lambda$ が隠れている

$\log(N!)$ は一つ一つの整数の対数の和です。各整数の約数で $\Lambda$ を足し、和の順序を交換すれば階乗が素数冪ごとに分解されます。

<a id="prop-nt8-von-mangoldt-divisor-sum"></a>

<!-- formal-statement-start -->
> **命題（対数の約数和と階乗恒等式）**  
> すべての正整数 $n,N$ に対して
>
$$
\log n=\sum_{d\mid n}\Lambda(d),
\qquad
\log(N!)=\sum_{d\le N}\Lambda(d)\left\lfloor\frac Nd\right\rfloor
$$
>
> が成立する。
<!-- formal-statement-end -->

### 証明の見取り図

素因数 $p$ の指数が $a$ なら、約数に含まれる $p,p^2,\ldots,p^a$ のそれぞれから $\log p$ が現れます。階乗では、$d$ の倍数が $N$ 以下に何個あるかを数えます。

<!-- proof-start -->
### 証明

$n=1$ では両辺が $0$ です。$n>1$ で $n=\prod_{i=1}^r p_i^{a_i}$ と素因数分解すると、$\Lambda(d)$ が非零となる約数 $d$ は $p_i^j$（$1\le j\le a_i$）に限られます。従って
$$
\sum_{d\mid n}\Lambda(d)
=\sum_{i=1}^r\sum_{j=1}^{a_i}\log p_i
=\sum_{i=1}^r a_i\log p_i
=\log n.
$$
$n=1,\ldots,N$ で足すと
$$
\log(N!)=\sum_{n=1}^N\sum_{d\mid n}\Lambda(d).
$$
これは有限和であり、各 $d$ の倍数は $d,2d,\ldots,\lfloor N/d\rfloor d$ の $\lfloor N/d\rfloor$ 個です。順序を交換して
$$
\log(N!)=\sum_{d=1}^N\Lambda(d)\left\lfloor\frac Nd\right\rfloor.
$$
<!-- proof-end -->

**例**：$6$ 以下で非零の $\Lambda(d)$ は $d=2,3,4,5$ に限られます。よって
$$
\log(6!)=3\log2+2\log3+\log2+\log5
=\log(2^4\cdot3^2\cdot5)=\log720.
$$
これは $6!=720$ と一致します。数え直しの方法は[約数和の二重計数](../NT5/index.md#thm-nt5-summatory-convolution)と共通です。

## 4. 二項係数から素数の上界を得る

$(m,2m]$ にある素数は、中央二項係数の分子 $(2m)!$ を割り、分母 $(m!)^2$ を割りません。この性質から区間内の素数の積を評価できます。

<a id="lem-nt8-binomial-bounds"></a>

<!-- formal-statement-start -->
> **補題（二項係数と区間内素数）**  
> 任意の正整数 $m$ に対して
>
$$
\frac{4^m}{2m+1}\le \binom{2m}{m}\le4^m
$$
>
> および
>
$$
\theta(2m)-\theta(m)\le\log\binom{2m}{m}\le2m\log2
$$
>
> が成立する。
<!-- formal-statement-end -->

### 証明の見取り図

二項定理で係数をすべて足すと $4^m$ です。中央の係数が最大なので上下に挟めます。区間内の相異なる素数はすべて中央二項係数を割るので、その積も割ります。

<!-- proof-start -->
### 証明

二項定理より $\sum_{j=0}^{2m}\binom{2m}{j}=4^m$ です。中央の係数はこの和以下です。また
$$
\frac{\binom{2m}{j+1}}{\binom{2m}{j}}=\frac{2m-j}{j+1}
$$
は $j<m$ では $1$ 以上、$j\ge m$ では $1$ 以下なので中央が最大です。項数は $2m+1$ だから $4^m\le(2m+1)\binom{2m}{m}$ です。

$m<p\le2m$ の素数 $p$ は $(2m)!$ に一度現れ、$m!$ には現れません。従って $p\mid\binom{2m}{m}$ です。異なる素数は互いに素なので $\prod_{m<p\le2m}p$ も二項係数を割ります。対数を取り
$$
\theta(2m)-\theta(m)
=\log\prod_{m<p\le2m}p
\le\log\binom{2m}{m}
\le2m\log2.
$$
<!-- proof-end -->

**例**：$m=4$ では $\binom{8}{4}=70$、$(4,8]$ の素数は $5,7$ です。$35=5\cdot7\mid70$ なので $\theta(8)-\theta(4)=\log35\le\log70$ を確認できます。

<a id="thm-nt8-chebyshev-upper"></a>

<!-- formal-statement-start -->
> **定理（Chebyshev 型の上界）**  
> すべての $x\ge2$ に対して
>
$$
\theta(x)\le5x\log2,\qquad
\pi(x)\le(1+10\log2)\frac{x}{\log x}
$$
>
> が成り立つ。
<!-- formal-statement-end -->

### 証明の見取り図

[二項係数の補題](#lem-nt8-binomial-bounds)を、上限を半分にするたびに繰り返します。$\pi$ は $\sqrt x$ 以下の素数とそれより大きい素数を分けて評価します。

<!-- proof-start -->
### 証明

$m=\lfloor x\rfloor\ge2$ とし、$m_0=m$、$m_{j+1}=\lceil m_j/2\rceil$ と定め、初めて $m_t\le2$ となる $t$ を取ります。$m_j\ge3$ なら真に減少し、$t\le\lceil\log_2m\rceil$ です。

$m_j\le2m_{j+1}$ なので、[補題](#lem-nt8-binomial-bounds)を $m_{j+1}$ に適用して
$$
\theta(m_j)-\theta(m_{j+1})
\le\theta(2m_{j+1})-\theta(m_{j+1})
\le2m_{j+1}\log2.
$$
$m_{j+1}\le(m_j+1)/2$ を繰り返すと、帰納的に $m_j\le(m-1)/2^j+1$ です。よって
$$
\sum_{j=1}^t2m_j
\le2(m-1)\sum_{j=1}^t2^{-j}+2t
\le2m+2t.
$$
$\theta(m_t)\le\theta(2)=\log2$ と $t\le\lceil\log_2m\rceil\le m$ を使い、望遠鏡和で
$$
\theta(x)=\theta(m)
\le(2m+2t+1)\log2
\le(4m+1)\log2\le5x\log2.
$$

$p\le\sqrt x$ の素数は高々 $\sqrt x$ 個です。$\sqrt x<p\le x$ なら $\log p>\frac12\log x$ なので、その個数を $R$ として
$$
\frac12R\log x
\le\sum_{\sqrt x<p\le x}\log p
\le\theta(x).
$$
従って
$$
\pi(x)\le\sqrt x+\frac{2\theta(x)}{\log x}
\le\sqrt x+10\log2\,\frac{x}{\log x}.
$$
$x\ge2$ では $\log x\le\sqrt x$ です。実際 $u=\sqrt x$ とすれば $u-2\log u$ の最小値は $u=2$ における $2-2\log2>0$ です。よって $\sqrt x\le x/\log x$ を代入して結論を得ます。
<!-- proof-end -->

この定理は $\pi(x)$ が $x/\log x$ の定数倍より大きくならないことを示します。しかし下側の評価も必要です。

## 5. 素数が極端に少なくないことを示す

中央二項係数は $\psi$ を下から評価できます。ただし $\psi$ には素数の平方・立方も入るため、$\theta$ との差を別に見積もります。

<a id="lem-nt8-binomial-psi"></a>

<!-- formal-statement-start -->
> **補題（二項係数からの ψ の下界）**  
> すべての正整数 $m$ に対して
>
$$
\psi(2m)\ge2m\log2-\log(2m+1)
$$
>
> が成り立つ。
<!-- formal-statement-end -->

### 証明の見取り図

二項係数の素因数 $p$ の指数を、素数冪 $p^k$ ごとの寄与へ分解します。一つの冪の寄与は $0$ または $1$ なので、$\psi(2m)$ の重みが二項係数の対数を上から押さえます。

<!-- proof-start -->
### 証明

$N!$ に含まれる素数 $p$ の指数を $v_p(N!)$ とします。$1,\ldots,N$ にある $p^k$ の倍数は $\lfloor N/p^k\rfloor$ 個なので
$$
v_p(N!)=\sum_{k\ge1}\left\lfloor\frac N{p^k}\right\rfloor.
$$
従って
$$
v_p\binom{2m}{m}
=\sum_{k\ge1}
\left(\left\lfloor\frac{2m}{p^k}\right\rfloor
-2\left\lfloor\frac m{p^k}\right\rfloor\right).
$$
任意の実数 $u$ で $\lfloor2u\rfloor-2\lfloor u\rfloor$ は $0$ または $1$ です。また $p^k>2m$ の項は零です。従って
$$
v_p\binom{2m}{m}
\le\#\{k\ge1:p^k\le2m\}.
$$
両辺を $\log p$ 倍して全素数で加えると
$$
\log\binom{2m}{m}
=\sum_pv_p\binom{2m}{m}\log p
\le\sum_{p^k\le2m}\log p
=\psi(2m).
$$
さらに[二項係数の下界](#lem-nt8-binomial-bounds)から
$$
\log\binom{2m}{m}\ge2m\log2-\log(2m+1)
$$
なので結論が従います。
<!-- proof-end -->

<a id="lem-nt8-prime-powers-error"></a>

<!-- formal-statement-start -->
> **補題（素数冪の余剰寄与）**  
> $x\ge2$ で
>
$$
0\le\psi(x)-\theta(x)
\le\sqrt x\,\log x\,\lfloor\log_2x\rfloor
$$
>
> が成り立つ。
<!-- formal-statement-end -->

<!-- proof-start -->
### 証明

[素数冪ごとの分解](#prop-nt8-psi-prime-powers)より
$$
\psi(x)-\theta(x)=\sum_{k=2}^{K}\theta(x^{1/k}),
\qquad K=\lfloor\log_2x\rfloor.
$$
$k\ge2$ では $x^{1/k}\le\sqrt x$ です。$\sqrt x$ 以下の素数は高々 $\sqrt x$ 個で、一つの重みは $\log p\le\log x$ なので、各項は $\sqrt x\log x$ 以下です。項数は高々 $K$ です。$K<2$ なら和は空で差は零です。
<!-- proof-end -->

<a id="thm-nt8-chebyshev-two-sided"></a>

<!-- formal-statement-start -->
> **定理（素数計数関数の両側 Chebyshev 型評価）**  
> 正定数 $c,C$ と $x_0\ge2$ が存在し、$x\ge x_0$ に対して
>
$$
c\frac{x}{\log x}\le\pi(x)\le C\frac{x}{\log x}
$$
>
> が成り立つ。
<!-- formal-statement-end -->

### 証明の見取り図

二項係数で $\psi(2m)$ を下から押さえ、素数冪の余剰分を引いて $\theta(2m)$ を求めます。次に $\theta(x)\le\pi(x)\log x$ へ代入します。

<!-- proof-start -->
### 証明

[二項係数の下界](#lem-nt8-binomial-psi)と[素数冪の補正](#lem-nt8-prime-powers-error)を組み合わせると
$$
\theta(2m)\ge2m\log2-\log(2m+1)
-\sqrt{2m}\log(2m)\lfloor\log_2(2m)\rfloor.
$$
誤差を $2m$ で割ると、第一項は $\log(2m+1)/(2m)\to0$、第二項は
$$
\frac{\sqrt{2m}\log(2m)\lfloor\log_2(2m)\rfloor}{2m}
\le\frac{(\log(2m))^2}{\sqrt{2m}\log2}\longrightarrow0.
$$
最後の極限は $u=\log(2m)$ と置き $u^2e^{-u/2}\to0$ と確認できます。従って十分大きい $m$ で $\theta(2m)\ge m\log2$ です。

十分大きい $x$ で $m=\lfloor x/2\rfloor$ とすれば $2m\le x$ です。$\theta$ は非減少なので
$$
\theta(x)\ge\theta(2m)\ge m\log2
\ge(x/2-1)\log2\ge x\log2/3
$$
です（最後は $x\ge6$）。一方、各 $p\le x$ に対して $\log p\le\log x$ だから
$$
\theta(x)=\sum_{p\le x}\log p\le\pi(x)\log x.
$$
よって $\pi(x)\ge(\log2/3)x/\log x$ です。[上界の定理](#thm-nt8-chebyshev-upper)を併用して、$c=\log2/3$、$C=1+10\log2$ と適当な $x_0$ を取れば結論が得られます。
<!-- proof-end -->

**何が分かったか**：$x/\log x$ の正定数倍の間に $\pi(x)$ が収まります。しかし $\pi(x)\log x/x$ の極限が存在するか、その値が何かは、まだ分かりません。

## 6. 定数倍から正確な漸近比へ

$ f(x)\sim g(x)$ は $f(x)/g(x)\to1$ を意味し、単に上下の定数倍で挟まれることより強い主張です。次の定理の完全証明は ANT 系列で扱うため、本章では**証明なしの到達目標**として掲げます。

<a id="thm-nt8-prime-number-theorem"></a>

<!-- formal-statement-start -->
> **定理（素数定理：本章では主張のみ）**  
> $x\to\infty$ のとき
>
$$
\pi(x)\sim\frac{x}{\log x},
\qquad
\lim_{x\to\infty}\frac{\pi(x)\log x}{x}=1
$$
>
> が成立する。
<!-- formal-statement-end -->

両側 Chebyshev 型評価は比を $c$ と $C$ の間へ閉じ込めます。素数定理はその比を正確に $1$ に収束させる結果です。無限個あるというだけの事実から、定数倍の評価、さらに正確な漸近式へと問題の精度が上がっています。

<a id="prop-nt8-pnt-theta-equivalence"></a>

<!-- formal-statement-start -->
> **命題（素数定理と θ の漸近式の同値性）**  
> $x\to\infty$ で次の二条件は同値である。
>
$$
\pi(x)\sim\frac{x}{\log x},
\qquad
\theta(x)\sim x.
$$
<!-- formal-statement-end -->

### 証明の見取り図

$0<\varepsilon<1$ を固定し、$x^{1-\varepsilon}$ 以下の素数と、それより大きい素数を分けます。小さい素数は個数で押さえ、大きい素数は $\log x$ に近い重みで押さえます。

<!-- proof-start -->
### 証明

$y=x^{1-\varepsilon}$ とします。各 $\log p\le\log x$ なので $\theta(x)\le\pi(x)\log x$ です。一方 $y<p\le x$ なら $\log p>(1-\varepsilon)\log x$ なので
$$
\theta(x)\ge(1-\varepsilon)\log x\,(\pi(x)-\pi(y)).
$$
$\pi(x)\sim x/\log x$ と仮定します。$\pi(y)\le y$ だから
$$
\frac{\pi(y)\log x}{x}
\le\frac{\log x}{x^\varepsilon}\longrightarrow0.
$$
二つの評価を $x$ で割り、$\pi(x)\log x/x\to1$ を入れると、[下極限](../../../基礎科目/RA/RA1/index.md#def-ra1-limsup)の値は $1-\varepsilon$ 以上、上極限は $1$ 以下です。$\varepsilon$ は任意なので $\theta(x)/x\to1$ です。

逆に $\theta(x)/x\to1$ と仮定します。先ほどの上界から
$$
\frac{\pi(x)\log x}{x}\ge\frac{\theta(x)}x.
$$
また $p\le y$ は高々 $y$ 個で、$p>y$ の重みは $(1-\varepsilon)\log x$ より大きいので
$$
\pi(x)\le y+\frac{\theta(x)}{(1-\varepsilon)\log x},
$$
すなわち
$$
\frac{\pi(x)\log x}{x}
\le\frac{\log x}{x^\varepsilon}+\frac{\theta(x)/x}{1-\varepsilon}.
$$
下極限は $1$ 以上、上極限は $1/(1-\varepsilon)$ 以下です。$\varepsilon\downarrow0$ により上極限も $1$ 以下となるので、比は $1$ に収束します。
<!-- proof-end -->

## 7. 整数の重み付き無限和から素数の積へ

[Dirichlet 畳み込み](../NT4/index.md#def-nt4-dirichlet)では、整数の約数に沿って二つの関数を組み合わせました。今度は $n^{-s}$ を重みとする無限和を使います。素因数分解の一意性によって、それは素数ごとの無限積にも変えられます。

<a id="def-nt8-dirichlet-series"></a>

<!-- formal-statement-start -->
> **定義（Dirichlet 級数）**  
> 算術関数 $a:\mathbb N\to\mathbb C$ に対し、収束するとき
>
$$
D_a(s)=\sum_{n=1}^{\infty}\frac{a(n)}{n^s}
$$
>
> をその Dirichlet 級数という。実数 $s>1$ で $a(n)=1$ とした級数を $\zeta(s)=\sum_{n=1}^\infty n^{-s}$ と書く。
<!-- formal-statement-end -->

<!-- definition-example-start: def-nt8-dirichlet-series -->
**定義の確認**：$s=2$ で $a(n)=1$ とすると $1+1/4+1/9+\cdots$ です。積分比較により
$$
1\le\zeta(2)\le1+\int_1^\infty t^{-2}\,dt=2
$$
なので有限値へ収束します。$s=1$ では $2^{j-1}<n\le2^j$ の $2^{j-1}$ 個の項の各値が $1/2^j$ 以上なので、区間ごとの和は $1/2$ 以上です。よって調和級数は発散します。
<!-- definition-example-end -->

<a id="thm-nt8-euler-product"></a>

<!-- formal-statement-start -->
> **定理（絶対収束域における Euler 積）**  
> すべての実数 $s>1$ に対して
>
$$
\zeta(s)=\sum_{n=1}^\infty\frac1{n^s}
=\prod_{p\text{ は素数}}(1-p^{-s})^{-1}
$$
>
> が成り立つ。右辺は素数を小さい順に増やした有限積の極限である。
<!-- formal-statement-end -->

### 証明の見取り図

一つの素数について幾何級数を作り、それらを有限個だけ掛け合わせます。素因数分解の一意性で、得られる整数を重複なく数えます。無限積への極限は正項級数の収束で正当化します。

<!-- proof-start -->
### 証明

$s>1$ では積分比較により
$$
\zeta(s)\le1+\int_1^\infty t^{-s}\,dt
=1+\frac1{s-1}<\infty.
$$
各素数 $p$ に対して $0<p^{-s}<1$ なので幾何級数の和を使えます。素数 $P$ 以下の有限積を展開すると
$$
\prod_{p\le P}(1-p^{-s})^{-1}
=\prod_{p\le P}\sum_{a=0}^\infty p^{-as}
=\sum_{\substack{n\ge1\\n\text{ の素因数はすべて }P\text{ 以下}}}n^{-s}.
$$
有限個の素数に対応する正項級数の積は和の順序を変更でき、素因数分解の一意性により各整数が一度だけ現れます。この有限積は $\zeta(s)$ 以下で、$P$ を増やすと非減少です。極限を $L\le\zeta(s)$ とします。

任意の $N$ について $P\ge N$ なら $1,\ldots,N$ の素因数はすべて $P$ 以下なので
$$
\sum_{n=1}^Nn^{-s}
\le\prod_{p\le P}(1-p^{-s})^{-1}\le L.
$$
$N\to\infty$ とすると $\zeta(s)\le L$ が得られ、両側から $L=\zeta(s)$ です。
<!-- proof-end -->

ここでは $s>1$ のみを証明しました。$s=1$ に直接代入することも、複素平面へ延長することも許されません。Euler 積は整数全体の和と素数ごとの積を結ぶ入口で、ANT 系列でこの関係をさらに発展させます。

## 8. 演習と詳細解答

個数と重みの違いを計算で確認し、二項係数による評価と Dirichlet 級数の収束条件を、異なる数値や仮定から再構成します。

### Level A：定義と小さな数の計算

#### A1. 三つの数え方

$x=10$ に対する $\pi(x),\theta(x),\psi(x)$ を定義から計算せよ。

- Level: A

<!-- solution-start -->
**詳細解答**：$10$ 以下の素数は $2,3,5,7$ なので $\pi(10)=4$、$\theta(10)=\log(2\cdot3\cdot5\cdot7)=\log210$ です。[von Mangoldt 関数](#def-nt8-von-mangoldt)が非零なのは $2,3,4,5,7,8,9$ なので
$$
\psi(10)=3\log2+2\log3+\log5+\log7=\log2520.
$$
$\psi$ は素数冪の $4,8,9$ も数えます。
<!-- solution-end -->

#### A2. 素数冪と重み

$\Lambda(1),\Lambda(16),\Lambda(18),\Lambda(25),\Lambda(27)$ を求めよ。

- Level: A

<!-- solution-start -->
**詳細解答**：[定義](#def-nt8-von-mangoldt)から $\Lambda(1)=0$ です。$16=2^4$、$25=5^2$、$27=3^3$ なので順に $\log2,\log5,\log3$ です。$18=2\cdot3^2$ は一種類の素数の冪ではないため $\Lambda(18)=0$ です。
<!-- solution-end -->

#### A3. 有限リストへの反例

$2,3,5$ しか素数がないと仮定して矛盾を導け。

- Level: A

<!-- solution-start -->
**詳細解答**：[Euclid の構成](#thm-nt8-euclid-infinitude)に従って $N=2\cdot3\cdot5+1=31$ と置きます。$31$ を $2,3,5$ で割ると余りが $1$ です。$N>1$ には素因数が存在するのに、その素因数は仮定したどの素数にも一致できません。これが矛盾です。$31$ 自身の素数判定はこの矛盾に必須ではありません。
<!-- solution-end -->

#### A4. 対数の約数和

$n=36$ で $\sum_{d\mid36}\Lambda(d)$ を非零の項に分けて計算せよ。

- Level: A

<!-- solution-start -->
**詳細解答**：$36=2^2\cdot3^2$ なので、約数のうち素数冪は $2,4,3,9$ です。従って
$$
\sum_{d\mid36}\Lambda(d)
=\log2+\log2+\log3+\log3
=2\log2+2\log3=\log36.
$$
これは[対数の約数和](#prop-nt8-von-mangoldt-divisor-sum)と一致します。
<!-- solution-end -->

#### A5. 有限 Euler 積

$s=2$ で素数 $2,3$ だけを使った Euler 積を分数で求め、展開に現れる整数を述べよ。

- Level: A

<!-- solution-start -->
**詳細解答**：積は
$$
(1-2^{-2})^{-1}(1-3^{-2})^{-1}
=\frac43\cdot\frac98=\frac32
$$
です。幾何級数の展開では $\sum_{a,b\ge0}2^{-2a}3^{-2b}$ となり、整数 $2^a3^b$ が一度ずつ現れます。$1,2,3,4,6,8,9$ などは現れ、素因数 $5$ を持つ整数は現れません。
<!-- solution-end -->

### Level B：定理の適用条件と数え直し

#### B1. 二項係数の中の区間素数

$m=4$ に対して $(m,2m]$ 内の素数の積が中央二項係数を割ることを確認し、対応する対数不等式を書け。

- Level: B

<!-- solution-start -->
**詳細解答**：区間 $(4,8]$ の素数は $5,7$ で積は $35$ です。$\binom{8}{4}=70=2\cdot35$ だから $35\mid70$ です。従って
$$
\theta(8)-\theta(4)=\log35
\le\log70\le\log256=8\log2.
$$
最後の上界は[二項係数の補題](#lem-nt8-binomial-bounds)で $m=4$ としたものです。
<!-- solution-end -->

#### B2. 大きい素数の個数を評価する

$x\ge2$ で $\theta(x)\le Kx$（$K>0$）と仮定する。$\pi(x)\le\sqrt x+2Kx/\log x$ を示し、$K=5\log2$ を代入せよ。

- Level: B

<!-- solution-start -->
**詳細解答**：$p\le\sqrt x$ の素数は高々 $\sqrt x$ 個です。$\sqrt x<p\le x$ の素数は $\log p>\frac12\log x$ を満たします。個数を $R$ とすると
$$
\frac12R\log x
\le\sum_{\sqrt x<p\le x}\log p
\le\theta(x)\le Kx.
$$
従って $R<2Kx/\log x$ です。二群を足すと $\pi(x)\le\sqrt x+2Kx/\log x$ です。[上界定理](#thm-nt8-chebyshev-upper)により $K=5\log2$ を使うと
$$
\pi(x)\le\sqrt x+10\log2\,\frac{x}{\log x}.
$$
<!-- solution-end -->

#### B3. 階乗を素数冪へ分配する

$N=10$ に対し $\sum_{d\le10}\Lambda(d)\lfloor10/d\rfloor$ を計算し、$10!$ の素因数分解と照合せよ。

- Level: B

<!-- solution-start -->
**詳細解答**：[階乗の恒等式](#prop-nt8-von-mangoldt-divisor-sum)に現れる非零の項は $d=2,3,4,5,7,8,9$ です。床関数値は順に $5,3,2,2,1,1,1$ なので
$$
\begin{aligned}
\sum_{d\le10}\Lambda(d)\left\lfloor\frac{10}d\right\rfloor
&=(5+2+1)\log2+(3+1)\log3+2\log5+\log7\\
&=8\log2+4\log3+2\log5+\log7.
\end{aligned}
$$
別に、階乗内の素数 $p$ の指数は $v_p(10!)=\sum_{k\ge1}\lfloor10/p^k\rfloor$ だから、$v_2=5+2+1=8$、$v_3=3+1=4$、$v_5=2$、$v_7=1$ です。よって $10!=2^8 3^4 5^2 7$ となり、対数が一致します。
<!-- solution-end -->

#### B4. 素数と素数冪の差

$x=30$ で $\psi(x)-\theta(x)$ を直接求め、$\sum_{k=2}^{\lfloor\log_2x\rfloor}\theta(x^{1/k})$ と照合せよ。

- Level: B

<!-- solution-start -->
**詳細解答**：$30$ 以下で指数 $2$ 以上の素数冪は $4,8,16$（重みは各 $\log2$）、$9,27$（各 $\log3$）、$25$（$\log5$）です。従って
$$
\psi(30)-\theta(30)=3\log2+2\log3+\log5=\log360.
$$
$K=\lfloor\log_2 30\rfloor=4$ です。[素数冪分解](#prop-nt8-psi-prime-powers)に従い、$k=2$ は素数 $2,3,5$、$k=3$ は素数 $2,3$、$k=4$ は素数 $2$ を数えます。従って
$$
\theta(\sqrt{30})+\theta(30^{1/3})+\theta(30^{1/4})
=(\log2+\log3+\log5)+(\log2+\log3)+\log2,
$$
これは先ほどの $\log360$ に等しいです。
<!-- solution-end -->

### Level C：複数の概念をつないで証明する

#### C1. 素数の逆数和の発散

[Euler 積](#thm-nt8-euler-product)を使って、素数上の級数 $\sum_{p\text{ は素数}}1/p$ が発散することを証明せよ。$s>1$ で考えた後、$s\downarrow1$ とすること。

- Level: C

<!-- solution-start -->
**詳細解答**：まず $0\le t\le1/2$ に対して $-\log(1-t)\le2t$ を示します。関数 $h(t)=-\log(1-t)-2t$ は $h(0)=0$ であり
$$
h'(t)=\frac1{1-t}-2\le0
$$
なので $h(t)\le0$ です。

背理法で $\sum_p1/p<\infty$ と仮定します。$s>1$ では $0<p^{-s}\le1/2$ なので、任意の有限積について
$$
0\le\sum_{p\le P}-\log(1-p^{-s})
\le2\sum_{p\le P}p^{-s}\le2\sum_p\frac1p.
$$
[Euler 積](#thm-nt8-euler-product)は正の有限値 $\zeta(s)$ に収束するので、対数の連続性から
$$
\log\zeta(s)\le2\sum_p\frac1p
$$
です。従って $\zeta(s)$ はすべての $s>1$ で共通の有限定数により上から抑えられます。

一方、任意の正整数 $N$ と $s>1$ で
$$
\zeta(s)\ge\sum_{n=1}^Nn^{-s}.
$$
$s\downarrow1$ とすると右辺は $\sum_{n=1}^N1/n$ へ近づきます。調和級数は、$2^{j-1}<n\le2^j$ の項が合計で少なくとも $1/2$ になることから、$N\to\infty$ で発散します。従って $\zeta(s)$ を $s>1$ 全体で一様に上から押さえることは不可能です。矛盾により $\sum_p1/p$ は発散します。
<!-- solution-end -->

#### C2. 漸近式の同値性を片側から導く

$\theta(x)\sim x$ を仮定する。任意の $0<\varepsilon<1$ に対して $y=x^{1-\varepsilon}$ と置き、$\pi(x)\sim x/\log x$ を示せ。

- Level: C

<!-- solution-start -->
**詳細解答**：まずすべての $p\le x$ に対し $\log p\le\log x$ なので
$$
\theta(x)\le\pi(x)\log x.
$$
従って $\pi(x)\log x/x$ の下極限は $1$ 以上です。

$p\le y$ の素数は高々 $y$ 個、$y<p\le x$ の素数は一つにつき $\log p>(1-\varepsilon)\log x$ の重みを持ちます。そこで
$$
\pi(x)\le y+\frac{\theta(x)}{(1-\varepsilon)\log x}
$$
が従います。両辺に $\log x/x$ を掛けると
$$
\frac{\pi(x)\log x}{x}
\le\frac{\log x}{x^\varepsilon}
+\frac{\theta(x)/x}{1-\varepsilon}.
$$
$\log x/x^\varepsilon\to0$、$\theta(x)/x\to1$ より、左辺の上極限は $1/(1-\varepsilon)$ 以下です。$\varepsilon$ は任意なので上極限は $1$ 以下、下極限は先ほどの評価で $1$ 以上です。従って $\pi(x)\log x/x\to1$ となり結論を得ます。
<!-- solution-end -->

## 9. 次の問い

素数が無限個あることを確認した後、その個数が上下の定数倍を除けば $x/\log x$ と同じ大きさだと証明しました。素数定理は定数倍での評価を「比が $1$ に収束する」という精密な主張へ変えますが、その完全証明はここでは扱っていません。

Dirichlet 級数の Euler 積は、整数上の和と素数ごとの積を直接結びます。この接続は後の ANT 系列の入口です。NT9 以降では対象を変え、整数方程式の可解性と計算可能性を結ぶ問題へ進みます。
