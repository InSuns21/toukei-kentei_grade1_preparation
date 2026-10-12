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

