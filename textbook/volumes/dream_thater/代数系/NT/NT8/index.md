# NT8 素数分布への入口

[整数の合同式](../NT1/index.md#def-nt1-congruence)や[乗法的な算術関数](../NT4/index.md#def-nt4-multiplicative)を使うと、個々の整数の素因数について調べられます。しかし、ある数までに素数がいくつあるかという全体像は、合同式を解くだけでは見えません。$10$ 以下の素数は $2,3,5,7$ の4個です。上限を大きくしたとき、この個数はどのように増えるのでしょうか。

この章では、まず素数が尽きないことを示します。次に個数・対数の重み・素数冪という三通りの数え方を作り、階乗と二項係数から定量的な上界と下界を導きます。素数定理の主張を理解し、最後に Dirichlet 級数と Euler 積を証明します。素数定理の完全証明は解析的整数論（ANT）へ送ります。

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
**定義の確認**：$\pi(10)=4$ です。$x$ が $10$ から $10.5$ に増えても値は $4$ のままで、$x=11$ では $5$ になります。素数で $1$ だけ増える階段関数です。
<!-- definition-example-end -->

<a id="def-nt8-chebyshev-theta"></a>

<!-- formal-statement-start -->
> **定義（Chebyshev の $\theta$ 関数）**  
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
> **定義（Chebyshev の $\psi$ 関数）**  
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

**例**：$m=4$ では $\binom84=70$、$(4,8]$ の素数は $5,7$ です。$35=5\cdot7\mid70$ なので $\theta(8)-\theta(4)=\log35\le\log70$ を確認できます。

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
<\sum_{\sqrt x<p\le x}\log p
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
> **補題（二項係数からの $\psi$ の下界）**  
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

## 6. 素数定理が新たに答える問い

$ f(x)\sim g(x)$ は $f(x)/g(x)\to1$ を意味し、単に上下の定数倍で挟まれることより強い主張です。次の定理は解析的整数論で証明するため、本章では**証明なしの到達目標**として掲げます。

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
> **命題（素数定理と $\theta$ の漸近式の同値性）**  
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
二つの評価を $x$ で割り、$\pi(x)\log x/x\to1$ を入れると、$\theta(x)/x$ の下極限は $1-\varepsilon$ 以上、上極限は $1$ 以下です。$\varepsilon$ は任意なので $\theta(x)/x\to1$ です。

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

