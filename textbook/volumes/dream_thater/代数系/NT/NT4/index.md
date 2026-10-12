# NT4 算術関数と Dirichlet 畳み込み

[前章](../NT3/index.md#def-nt3-legendre-symbol)まで、整数の合同や素数ごとの性質を調べてきました。しかし「$n$ の正の約数はいくつあるか」「約数を全部足すといくつか」という問いは、ひとつの法の合同式では直接扱いません。$n=12$ なら正の約数は $1,2,3,4,6,12$ で、個数は $6$、和は $28$ です。素因数分解を利用すると、これらを $2^2$ と $3$ についての小さな計算へ分割できます。

こうした整数ごとの情報を関数として記録し、さらに約数を通じて二つの関数を組み合わせる演算を作ります。まず関数の定義と素数冪での計算を確かめ、次にこの演算の法則と逆元を導きます。これにより次章の Möbius 反転を理解する準備が整います。ここでは $\mathbb N=\{1,2,\ldots\}$、$d\mid n$ は正の約数を表します。

## 1. 整数を入力して数を返す関数

整数そのものではなく、整数の約数の個数や和を入力 $n$ ごとに記録したいので、定義域を正整数全体に固定します。

<a id="def-nt4-arithmetic-function"></a>

<!-- formal-statement-start -->
> **定義（算術関数）**  
> 正整数を入力とし複素数を値とする写像 $f:\mathbb N\to\mathbb C$ を算術関数という。算術関数の和と積、スカラー倍は入力 $n$ ごとに定める。
<!-- formal-statement-end -->

<!-- definition-example-start: def-nt4-arithmetic-function -->
### 例：同じ入力で二つの情報を記録する

**定義の確認**：$f(n)=n$ と $g(n)=1$ は、すべての正整数に値を割り当てるので算術関数です。例えば $(f+g)(3)=4$、$(fg)(3)=3$ です。ここでの $fg$ は**同じ入力での積**で、後で導入する約数上の組合せとは別の演算です。
<!-- definition-example-end -->

各入力で常に $1$ を返す関数と、入力をそのまま返す関数は、後の約数和の基本になります。ここで記号を固定します。

<a id="def-nt4-constant-one"></a>

<!-- formal-statement-start -->
> **定義（定数1関数）**  
> 算術関数 $1:\mathbb N\to\mathbb C$ を、各正整数 $n$ に対し $1(n)=1$ と定める。また $\operatorname{id}(n)=n$ と書く。数 $1$ と算術関数 $1$ は文脈で区別する。
<!-- formal-statement-end -->

<!-- definition-example-start: def-nt4-constant-one -->
**定義の確認**：入力 $n=3$ では $1(3)=1$、$\operatorname{id}(3)=3$ です。$n=1$ では両方とも $1$ を返します。どちらも正整数全体から複素数への写像になっています。
<!-- definition-example-end -->

後者は入力の正整数をそのまま返します。これらの関数は次に調べる乗法性を持ちます。

### 互いに素な入力に分けられるか

例えば $12=4\cdot3$ に対して約数は、$4$ の約数 $1,2,4$ と $3$ の約数 $1,3$ の積として一意に並びます。しかし $8=4\cdot2$ では $4$ と $2$ が互いに素ではなく、約数の組から作る積が重複します。必要な仮定を関数の性質として切り出します。

<a id="def-nt4-multiplicative"></a>

<!-- formal-statement-start -->
> **定義（乗法的関数と完全乗法的関数）**  
> 算術関数 $f$ は $f(1)=1$ かつ、$\gcd(m,n)=1$ を満たす任意の正整数 $m,n$ について
>
$$
f(mn)=f(m)f(n)
$$
>
> を満たすとき**乗法的**という。互いに素という条件を外し、すべての正整数 $m,n$ に対して同じ等式を満たすとき**完全乗法的**という（この場合も $f(1)=1$ とする）。
<!-- formal-statement-end -->

<!-- definition-example-start: def-nt4-multiplicative -->
### 例：$\operatorname{id}$ は完全乗法的、約数個数はそうではない

**定義の確認**：$\operatorname{id}(1)=1$ で、任意の $m,n$ に対し $\operatorname{id}(mn)=mn=\operatorname{id}(m)\operatorname{id}(n)$ です。対して約数の個数を数えると、$4$ の約数は $1,2,4$、$2$ の約数は $1,2$、$8$ の約数は $1,2,4,8$ です。従って $\tau(4)\tau(2)=3\cdot2=6\neq4=\tau(8)$ となり、約数個数関数は完全乗法的ではありません。$4$ と $2$ が互いに素でない点が重要です。
<!-- definition-example-end -->

## 2. 四つの基本算術関数を素数冪から理解する

まず、約数を数える関数と足す関数を定めます。約数は有限個なので各値は有限和です。

<a id="def-nt4-divisor-functions"></a>

<!-- formal-statement-start -->
> **定義（約数個数関数と約数和関数）**  
> $n\in\mathbb N$ に対し、正の約数の個数を $\tau(n)$、正の約数の和を $\sigma(n)$ とし、
>
$$
\tau(n)=\sum_{d\mid n}1,\qquad
\sigma(n)=\sum_{d\mid n}d
$$
>
> と定める。特に $\tau(1)=\sigma(1)=1$ である。
<!-- formal-statement-end -->

<!-- definition-example-start: def-nt4-divisor-functions -->
### 例：$12$ で個数と和を確かめる

**定義の確認**：$12$ の約数集合は $\{1,2,3,4,6,12\}$ です。ゆえに $\tau(12)=1+1+1+1+1+1=6$、$\sigma(12)=1+2+3+4+6+12=28$ です。単に値を暗記するのではなく、両者で**同じ約数を異なる重みで足す**ことを確かめてください。
<!-- definition-example-end -->

既習の [Euler の $\varphi$ 関数](../NT2/index.md#def-nt2-euler-phi) は $n$ 以下で $n$ と互いに素な整数を数えます。例えば $\varphi(12)=4$ で、$\tau(12)=6$ とは違います。もう一つ、素因数が何種類あるかと平方因子を持つかに注目する関数を用意します。

<a id="def-nt4-mobius"></a>

<!-- formal-statement-start -->
> **定義（Möbius 関数）**  
> $\mu(1)=1$ と定める。$n\ge2$ が相異なる $r$ 個の素数の積（平方因子を持たない整数）なら、次の値を取る。

$
\mu(n)=(-1)^r.
$

> 一方、ある素数 $p$ について $p^2\mid n$ なら、$\mu(n)=0$ と定める。
<!-- formal-statement-end -->

<!-- definition-example-start: def-nt4-mobius -->
### 例：平方因子の有無を直接確認する

**定義の確認**：$30=2\cdot3\cdot5$ は相異なる三素数の積なので $\mu(30)=(-1)^3=-1$ です。$12=2^2\cdot3$ は $2^2\mid12$ なので $\mu(12)=0$ です。素数 $p$ について $\mu(p)=-1$、$\mu(p^k)=0$（$k\ge2$）となります。
<!-- definition-example-end -->

### 素因数分解は関数の計算規則になる

一つの素数 $p$ の冪 $p^k$（$k\ge0$）の正の約数は、重複のない $1,p,\ldots,p^k$ です。$k=0$ の場合は $p^0=1$ と約数 $1$ だけを意味します。この列挙と、互いに素な部分ごとの約数の一意な分解を組み合わせます。

<a id="prop-nt4-basic-multiplicative"></a>

<!-- formal-statement-start -->
> **命題（基本算術関数の乗法性と素数冪表示）**  
> $\tau,\sigma,\varphi,\mu$ は乗法的関数である。任意の素数 $p$ と整数 $k\ge1$ に対し、
>
$$
\tau(p^k)=k+1,\qquad
\sigma(p^k)=1+p+\cdots+p^k=\frac{p^{k+1}-1}{p-1},
$$
$$
\varphi(p^k)=p^k-p^{k-1},\qquad
\mu(p^k)=
\begin{cases}
-1 &(k=1),\\
0 &(k\ge2).
\end{cases}
$$
>
> したがって素因数分解 $n=\prod_{i=1}^r p_i^{a_i}$（相異なる $p_i$、$a_i\ge1$）で各関数値は局所値の積になる。$n=1$ では四関数とも値 $1$ である。
<!-- formal-statement-end -->

### 証明の見取り図

互いに素な $m,n$ の約数は、$m$ の約数 $a$ と $n$ の約数 $b$ の積 $ab$ にただ一通りで表せます。これにより「個数」と「和」は積へ分離します。$\varphi$ は[φ 関数の積公式](../NT2/index.md#prop-nt2-totient-formula)を使い、$\mu$ では異なる素因数の集合が互いに交わらないことを使います。

<!-- proof-start -->
### 証明

$\gcd(m,n)=1$ で $d\mid mn$ とします。素因数分解において $m,n$ が共通素因数を持たないので、$d$ のうち $m$ に属する素数冪の積を $a$、$n$ に属する素数冪の積を $b$ とすると $d=ab$、$a\mid m$、$b\mid n$ です。因数の割当てが一意なので、写像 $(a,b)\mapsto ab$ は二つの約数集合の直積から $mn$ の約数集合への全単射です。

従って
$$
\tau(mn)=\sum_{a\mid m}\sum_{b\mid n}1
=\left(\sum_{a\mid m}1\right)\left(\sum_{b\mid n}1\right)
=\tau(m)\tau(n),
$$
$$
\sigma(mn)=\sum_{a\mid m}\sum_{b\mid n}ab
=\left(\sum_{a\mid m}a\right)\left(\sum_{b\mid n}b\right)
=\sigma(m)\sigma(n).
$$

$\mu$ は、$m$ または $n$ に平方因子があるなら $mn$ も平方因子を持つため両辺が $0$ です。両者が平方因子を持たない場合、$m$ の相異なる素因数を $r$ 個、$n$ のそれを $s$ 個とすると、互いに素という仮定により $mn$ の異なる素因数は $r+s$ 個です。よって $\mu(mn)=(-1)^{r+s}=(-1)^r(-1)^s=\mu(m)\mu(n)$ です。$\varphi$ の乗法性は [積公式の証明](../NT2/index.md#prop-nt2-totient-formula)で中国剰余定理から既に得ています。

素数冪では約数 $1,p,\ldots,p^k$ を数えて $\tau(p^k)=k+1$、これらを足して $\sigma(p^k)=\sum_{j=0}^k p^j$ です。$(p-1)(1+p+\cdots+p^k)=p^{k+1}-1$ を両辺に掛けて確かめれば表示した等比和公式になります。$\varphi(p^k)$ は[積公式](../NT2/index.md#prop-nt2-totient-formula)、$\mu(p^k)$ は定義から従います。素因数分解における異なる素数冪は互いに素なので、乗法性を順に適用して最後の主張を得ます。
<!-- proof-end -->

例えば $72=2^3 3^2$ と分解すれば、$\tau(72)=(3+1)(2+1)=12$、$\sigma(72)=(1+2+4+8)(1+3+9)=15\cdot13=195$ です。さらに $\varphi(72)=(8-4)(9-3)=24$、$\mu(72)=0$ です。異なる素因数の局所値を**掛ける**のは、乗法性の仮定が満たされるときだけです。

## 3. 約数を介して二つの算術関数を合成する

点ごとの積 $f(n)g(n)$ では「約数の全体を足す」という操作を作れません。そこで $n$ の二つの因子 $d$ と $n/d$ に、それぞれ異なる関数を評価させます。

<a id="def-nt4-dirichlet"></a>

<!-- formal-statement-start -->
> **定義（Dirichlet 畳み込み）**  
> 算術関数 $f,g:\mathbb N\to\mathbb C$ の Dirichlet 畳み込み $f*g$ を、各 $n\in\mathbb N$ に対して
>
$$
(f*g)(n)=\sum_{d\mid n}f(d)g(n/d)
$$
>
> と定める。この和は $n$ の正の約数全体にわたる有限和である。
<!-- formal-statement-end -->

<!-- definition-example-start: def-nt4-dirichlet -->
### 例：$n=6$ に対する畳み込みを実際に並べる

**定義の確認**：$f(n)=n$、$g(n)=1$ とすると、約数 $d=1,2,3,6$ に対して $g(6/d)=1$ です。ゆえに $(f*g)(6)=1+2+3+6=12$ です。一方、点ごとの積では $(fg)(6)=6$ です。二つの演算を混同しないことが重要です。
<!-- definition-example-end -->

### 定数1関数と単位元は異なる

定数1関数 $1$ について $(1*f)(n)=\sum_{d\mid n}f(n/d)=\sum_{e\mid n}f(e)$ です。一般には $f(n)$ に戻らないので、$1$ は畳み込みの単位元ではありません。和のうち $d=1$ の項だけを残す関数を用意します。

<a id="def-nt4-epsilon"></a>

<!-- formal-statement-start -->
> **定義（畳み込みの単位元）**  
> 算術関数 $\varepsilon$ を
>
$$
\varepsilon(n)=
\begin{cases}
1 &(n=1),\\
0 &(n\ge2)
\end{cases}
$$
>
> と定める。$\varepsilon$ は Dirichlet 畳み込みの単位元になる。
<!-- formal-statement-end -->

<!-- definition-example-start: def-nt4-epsilon -->
### 例：$n=6$ で $1$ と $\varepsilon$ を比較する

**定義の確認**：$(\varepsilon*f)(6)$ では $d=1$ の項 $\varepsilon(1)f(6)=f(6)$ 以外は $\varepsilon(d)=0$ です。これに対し $(1*f)(6)=f(1)+f(2)+f(3)+f(6)$ です。例えば $f(n)=n$ なら前者は $6$、後者は $12$ です。
<!-- definition-example-end -->

## 4. 畳み込みの代数法則と逆元

約数和は有限和なので、足し算の順序変更を正しく数えれば、普通の数の積に似た法則が得られます。ただし、結合則では**三つの因子の順序付き組**を数える点が肝心です。

<a id="thm-nt4-convolution-laws"></a>

<!-- formal-statement-start -->
> **定理（Dirichlet 畳み込みの代数法則）**  
> 任意の算術関数 $f,g,h$ と複素数 $a,b$ に対し、$f*g=g*f$、$(f*g)*h=f*(g*h)$、
>
$$
f*(ag+bh)=a(f*g)+b(f*h)
$$
>
> および $f*\varepsilon=\varepsilon*f=f$ が成立する。
<!-- formal-statement-end -->

### 証明の見取り図

可換性は約数 $d$ と $n/d$ の交換、結合性は $abc=n$ を満たす順序付き正整数三つ組への書き換えです。単位元は $\varepsilon(d)$ が $d=1$ でのみ $1$ である事実から出ます。

<!-- proof-start -->
### 証明

$n$ の約数 $d$ に対して $e=n/d$ も約数で、$d\mapsto e$ は約数集合の全単射です。従って
$$
(f*g)(n)=\sum_{d\mid n}f(d)g(n/d)
=\sum_{e\mid n}g(e)f(n/e)=(g*f)(n).
$$
左からの結合については定義を二度適用して
$$
((f*g)*h)(n)
=\sum_{c\mid n}\left(\sum_{a\mid n/c}f(a)g((n/c)/a)\right)h(c)
=\sum_{\substack{a,b,c\ge1\\abc=n}}f(a)g(b)h(c).
$$
内側の和で $b=n/(ac)$ と置いたので、すべての順序付き三つ組が重複なく現れます。一方、
$$
(f*(g*h))(n)
=\sum_{a\mid n}f(a)\left(\sum_{b\mid n/a}g(b)h((n/a)/b)\right)
=\sum_{\substack{a,b,c\ge1\\abc=n}}f(a)g(b)h(c).
$$
よって結合性が従います。線形性は
$$
\sum_{d\mid n} f(d)(ag(n/d)+bh(n/d))
=a\sum_{d\mid n}f(d)g(n/d)+b\sum_{d\mid n}f(d)h(n/d)
$$
から従います。さらに
$$
(\varepsilon*f)(n)
=\varepsilon(1)f(n)+\sum_{\substack{d\mid n\\d>1}}\varepsilon(d)f(n/d)
=f(n)+0=f(n)
$$
で、可換性から $f*\varepsilon=f$ です。
<!-- proof-end -->

このように算術関数の集合には、点ごとの加法と畳み込みによる**可換な単位的環**の構造があります。積の単位元は定数1関数ではなく $\varepsilon$ です。環という語が未習でも、ここで証明した四つの法則と分配性から必要な計算をすべて再現できます。

### 割り算に当たる Dirichlet 逆元

畳み込みで $f*g=\varepsilon$ を満たす $g$ を探せば、足し算に対する逆元ではなく、畳み込みに対する逆元が得られます。$n=1$ での値を見ると、まず $f(1)g(1)=1$ でなければなりません。驚くことに、この条件だけで全ての値を順に決められます。

<a id="thm-nt4-inverse"></a>

<!-- formal-statement-start -->
> **定理（Dirichlet 逆元の存在条件）**  
> 算術関数 $f:\mathbb N\to\mathbb C$ に対して、$f*g=\varepsilon$ を満たす算術関数 $g$ が存在するための必要十分条件は $f(1)\ne0$ である。その場合 $g$ は一意であり、
>
$$
g(1)=\frac1{f(1)},\qquad
g(n)=-\frac1{f(1)}\sum_{\substack{d\mid n\\d>1}}f(d)g(n/d)\quad(n>1)
$$
>
> によって再帰的に構成できる。
<!-- formal-statement-end -->

### 証明の見取り図

$n=1$ の条件で初期値を決め、$n>1$ では畳み込みの $d=1$ の項を分離します。残りの項には必ず $n/d<n$ の関数値しか現れないため、正整数についての帰納法で進められます。

<!-- proof-start -->
### 証明

$f*g=\varepsilon$ なら $n=1$ での定義から
$$
1=\varepsilon(1)=(f*g)(1)=f(1)g(1)
$$
なので $f(1)\ne0$ が必要です。

逆に $f(1)\ne0$ とします。最初に $g(1)=1/f(1)$ と置きます。$n\ge2$ について、全ての $1\le k<n$ に対する $g(k)$ が決まったと仮定します。$d>1$ かつ $d\mid n$ なら $n/d$ は $1\le n/d<n$ なので、表示した有限和の全項は既に決まっています。従って再帰式は $g(n)$ を一意に定めます。これを畳み込みへ代入すると
$$
(f*g)(n)
=f(1)g(n)+\sum_{\substack{d\mid n\\d>1}}f(d)g(n/d)
=0=\varepsilon(n)\quad(n>1)
$$
となり、$n=1$ でも値は $1=\varepsilon(1)$ です。よって存在が成立します。

別の解 $g'$ があれば $n=1$ で $g'(1)=g(1)$ です。同じ帰納の段階で $g'(k)=g(k)$（$k<n$）なら、$f(1)g'(n)$ の係数が非零なので $g'(n)$ も同じ再帰式から $g(n)$ に一致します。帰納法で一意性が従います。
<!-- proof-end -->

例えば $f(n)=1+n$ なら $f(1)=2$ なので逆元 $g$ があります。$g(1)=1/2$、$n=2$ では約数 $d>1$ は $2$ だけなので $g(2)=-(1/2)f(2)g(1)=-3/4$ です。$n=4$ では $d=2,4$ を使い
$$
g(4)=-\frac12\bigl(f(2)g(2)+f(4)g(1)\bigr)
=-\frac12\left(3\cdot(-3/4)+5\cdot(1/2)\right)=-\frac18
$$
となります。**$g(4)$ の計算に $g(2)$ が必要**なことが、再帰公式の意味です。

## 5. 乗法性を畳み込みに引き継ぐ

乗法的関数を二つ畳み込んでも乗法的でしょうか。$m,n$ が互いに素なら、$mn$ の約数 $d$ を $m$ 側と $n$ 側へ一意に分解できるため、畳み込みの和も二つの和に分離します。

<a id="thm-nt4-closure"></a>

<!-- formal-statement-start -->
> **定理（乗法的関数の畳み込み閉性）**  
> $f,g:\mathbb N\to\mathbb C$ がともに乗法的なら、Dirichlet 畳み込み $f*g$ も乗法的である。
<!-- formal-statement-end -->

### 証明の見取り図

$\gcd(m,n)=1$ の下で約数 $d\mid mn$ を $d=ab$（$a\mid m,b\mid n$）と表し、さらに $mn/d=(m/a)(n/b)$ と分けます。この二つの積には、それぞれ乗法性を適用できます。

<!-- proof-start -->
### 証明

$f(1)=g(1)=1$ より $(f*g)(1)=f(1)g(1)=1$ です。互いに素な $m,n$ を取り、[基本算術関数の乗法性の証明](#prop-nt4-basic-multiplicative)で示した約数分解を使います。任意の $d\mid mn$ は一意に $d=ab$（$a\mid m,b\mid n$）と書けます。また $\gcd(a,b)=1$ であり、$\gcd(m/a,n/b)=1$ も成り立ちます。従って
$$
\begin{aligned}
(f*g)(mn)
&=\sum_{a\mid m}\sum_{b\mid n} f(ab)g\bigl((m/a)(n/b)\bigr)\\
&=\sum_{a\mid m}\sum_{b\mid n} f(a)f(b)g(m/a)g(n/b)\\
&=\left(\sum_{a\mid m}f(a)g(m/a)\right)
  \left(\sum_{b\mid n}f(b)g(n/b)\right)\\
&=(f*g)(m)(f*g)(n).
\end{aligned}
$$
二行目では $f,g$ それぞれの乗法性に、直前で確認した互いに素の条件を適用しました。これで定義の二条件が満たされます。
<!-- proof-end -->

### 素数冪では約数が一直線に並ぶ

乗法性を持つ関数は $n$ の素因数を分離して計算できます。したがって一つの素数冪での畳み込みを明示すれば、任意の正整数にも値を求められます。

<a id="prop-nt4-prime-power"></a>

<!-- formal-statement-start -->
> **命題（素数冪での畳み込み）**  
> 任意の算術関数 $f,g$、素数 $p$、整数 $k\ge0$ について、
>
$$
(f*g)(p^k)=\sum_{j=0}^k f(p^j)g(p^{k-j}).
$$
>
> さらに $f,g$ が乗法的で、$n=\prod_i p_i^{a_i}$ なら、$(f*g)(n)$ は各素数冪 $p_i^{a_i}$ における上記の値の積である。
<!-- formal-statement-end -->

<!-- proof-start -->
### 証明

$p^k$ の正の約数は $p^j$（$0\le j\le k$）に限られます。[Dirichlet 畳み込みの定義](#def-nt4-dirichlet)で $d=p^j$ と置くと $p^k/d=p^{k-j}$ なので第一式が従います。$f,g$ が乗法的なら [畳み込み閉性](#thm-nt4-closure)により $f*g$ も乗法的です。相異なる素数冪は互いに素なので、$n$ の素因数分解に乗法性を繰り返し使えば第二の主張を得ます。
<!-- proof-end -->

例えば $k=3$ なら
$$
(f*g)(p^3)=f(1)g(p^3)+f(p)g(p^2)+f(p^2)g(p)+f(p^3)g(1).
$$
この四項は約数 $1,p,p^2,p^3$ に一対一で対応しています。

### 既知の約数和も畳み込みだった

定数1関数 $1$ と $\operatorname{id}$ はいずれも完全乗法的なので、[畳み込み閉性](#thm-nt4-closure)を使えます。

<a id="prop-nt4-divisor-convolutions"></a>

<!-- formal-statement-start -->
> **命題（約数関数の畳み込み表示）**  
> 定数1関数 $1(n)=1$ と恒等値関数 $\operatorname{id}(n)=n$ について、すべての $n\ge1$ で
>
$$
\tau=1*1,\qquad \sigma=\operatorname{id}*1
$$
>
> が成立する。特にこれらの関数が乗法的であることも畳み込み閉性から分かる。
<!-- formal-statement-end -->

<!-- proof-start -->
### 証明

各 $n$ について定義に代入すると
$$
(1*1)(n)=\sum_{d\mid n}1(d)1(n/d)
=\sum_{d\mid n}1=\tau(n)
$$
です。同様に、ここでは因子を省略せず書くと
$$
(\operatorname{id}*1)(n)=\sum_{d\mid n}\operatorname{id}(d)1(n/d)
=\sum_{d\mid n}d=\sigma(n)
$$
です。$1$ と $\operatorname{id}$ は $n=1$ で値 $1$、任意の二整数の積に対して完全乗法的なので、[畳み込み閉性](#thm-nt4-closure)により二つの畳み込みは乗法的です。
<!-- proof-end -->

これは計算の別表現に留まりません。例えば $\tau*1=1*1*1$ は、[結合則](#thm-nt4-convolution-laws)により $n=abc$ を満たす順序付き三つ組を数えます。$p^k$ なら $a=p^i,b=p^j,c=p^\ell$、$i+j+\ell=k$ で、その個数は $\sum_{j=0}^k(j+1)=(k+1)(k+2)/2$ です。こうして畳み込みは「約数を一回数える」から「因子への分け方を数える」へ問いを拡張します。

## 6. 演習と詳細解答

### Level A：定義・値・条件を確かめる

#### A1. 同じ整数に四つの関数を評価する

$n=18$ の正の約数をすべて列挙し、$\tau(18)$、$\sigma(18)$、$\varphi(18)$、$\mu(18)$ を求めよ。

- Level: A
- ID: NT4-A1

<!-- solution-start -->
**詳細解答**　$18=2\cdot3^2$ の正の約数は $1,2,3,6,9,18$ の六個です。ゆえに [約数個数関数と約数和関数](#def-nt4-divisor-functions) の定義から $\tau(18)=6$、$\sigma(18)=1+2+3+6+9+18=39$ です。$18$ 以下で互いに素な整数は $1,5,7,11,13,17$ の六個なので [Euler の $\varphi$ 関数の定義](../NT2/index.md#def-nt2-euler-phi)から $\varphi(18)=6$ です。$3^2\mid18$ なので [Möbius 関数の定義](#def-nt4-mobius)から $\mu(18)=0$ です。二つの値が偶然同じ $6$ でも、数えている集合は異なります。
<!-- solution-end -->

#### A2. 平方因子による零を見分ける

$\mu(1),\mu(6),\mu(10),\mu(45),\mu(210)$ を計算せよ。

- Level: A
- ID: NT4-A2

<!-- solution-start -->
**詳細解答**　定義により $\mu(1)=1$ です。$6=2\cdot3$、$10=2\cdot5$ は相異なる二素数の積なのでいずれも $(-1)^2=1$ です。$45=3^2\cdot5$ には平方因子 $3^2$ があるので $\mu(45)=0$ です。$210=2\cdot3\cdot5\cdot7$ は相異なる四素数の積で $\mu(210)=(-1)^4=1$ です。すべて [定義](#def-nt4-mobius)のどの場合かを特定して判断しました。
<!-- solution-end -->

#### A3. 乗法的か完全乗法的か

$f(n)=n^2$ と $g(n)=\tau(n)$ について、乗法性と完全乗法性をそれぞれ判定し、成り立たない場合は反例を一つ示せ。

- Level: A
- ID: NT4-A3

<!-- solution-start -->
**詳細解答**　$f(1)=1$ かつ任意の正整数 $m,n$ で $f(mn)=(mn)^2=m^2n^2=f(m)f(n)$ なので、$f$ は完全乗法的であり乗法的でもあります。$g(1)=1$ で、[基本算術関数の乗法性](#prop-nt4-basic-multiplicative)により互いに素な整数の積には乗法性を満たします。しかし $m=n=2$ とすると $g(4)=3$、$g(2)g(2)=2\cdot2=4$ です。従って $g$ は完全乗法的ではありません。失われたのは $\gcd(2,2)=1$ という仮定で、約数を二側へ一意に割り振れません。
<!-- solution-end -->

#### A4. 単位元を定数1関数と区別する

$f(n)=n$ とし、$(\varepsilon*f)(6)$ と $(1*f)(6)$ を計算せよ。

- Level: A
- ID: NT4-A4

<!-- solution-start -->
**詳細解答**　$n=6$ の約数は $1,2,3,6$ です。[単位元の定義](#def-nt4-epsilon)により $\varepsilon(d)$ が非零なのは $d=1$ のみなので、$(\varepsilon*f)(6)=\varepsilon(1)f(6)=6$ です。一方 $1(d)=1$ は全ての約数で成り立ち、$(1*f)(6)=f(6)+f(3)+f(2)+f(1)=6+3+2+1=12$ です。
<!-- solution-end -->

#### A5. 素数冪の局所計算

$\tau(2^4),\sigma(3^3),\varphi(5^2),\mu(7^2)$ を求めよ。

- Level: A
- ID: NT4-A5

<!-- solution-start -->
**詳細解答**　[素数冪の公式](#prop-nt4-basic-multiplicative)に $p,k$ をそれぞれ代入します。$\tau(2^4)=4+1=5$、$\sigma(3^3)=1+3+9+27=40$ です。$\varphi(5^2)=5^2-5=20$ は $25$ 個の剰余のうち $5$ の倍数を除いた個数です。$7^2$ は平方因子を持つので $\mu(7^2)=0$ です。
<!-- solution-end -->

### Level B：和の変形と再帰を自力で行う

#### B1. 約数の順序を変えて畳み込みを計算する

$f(n)=n$、$g(n)=\tau(n)$ とする。$(f*g)(12)$ と $(g*f)(12)$ を定義から別々に計算して一致を確認せよ。

- Level: B
- ID: NT4-B1

<!-- solution-start -->
**詳細解答**　$12$ の約数は $1,2,3,4,6,12$ です。[Dirichlet 畳み込みの定義](#def-nt4-dirichlet)より
$$
(f*g)(12)
=1\tau(12)+2\tau(6)+3\tau(4)+4\tau(3)+6\tau(2)+12\tau(1)
=6+2\cdot4+3\cdot3+4\cdot2+6\cdot2+12\cdot1=55.
$$
交換した順序でも
$$
(g*f)(12)
=\tau(1)12+\tau(2)6+\tau(3)4+\tau(4)3+\tau(6)2+\tau(12)1
=12+12+8+9+8+6=55.
$$
二式の各項は $d\mapsto12/d$ の対応で一致します。[可換性の証明](#thm-nt4-convolution-laws)を具体的に追認できます。
<!-- solution-end -->

#### B2. 畳み込みが乗法的になる理由を局所的に書く

互いに素な $m=4,n=9$ の約数 $d\mid36$ を $d=ab$、$a\mid4,b\mid9$ へ分解し、$\tau(36)=\tau(4)\tau(9)$ をこの対応から証明せよ。$\tau(16)$ と $\tau(4)^2$ も比べよ。

- Level: B
- ID: NT4-B2

<!-- solution-start -->
**詳細解答**　$4$ の約数は $1,2,4$、$9$ の約数は $1,3,9$ です。$4$ 側の各 $a$ と $9$ 側の各 $b$ を掛けて得られる $9$ 個は、$1,3,9$、$2,6,18$、$4,12,36$ で互いに異なり、全て $36$ の約数です。素因数 $2$ と $3$ の指数から逆に $a,b$ を一意に復元できます。よって $\tau(36)=3\cdot3=9$ です。一方 $\tau(16)=5$、$\tau(4)^2=3^2=9$ です。$4,4$ には共通因数 $2$ があるので $ab$ の表示が重複し、[乗法性の仮定](#def-nt4-multiplicative)は使えません。
<!-- solution-end -->

#### B3. Dirichlet 逆元を再帰的に計算する

$f(n)=1+n$ とし、$f*g=\varepsilon$ を満たす $g$ について $g(1),g(2),g(3),g(4)$ を順に求め、$n=4$ の畳み込みを検算せよ。

- Level: B
- ID: NT4-B3

<!-- solution-start -->
**詳細解答**　$f(1)=2\ne0$ なので[逆元の存在条件](#thm-nt4-inverse)により $g$ は一意に存在します。$g(1)=1/2$ です。$n=2,3$ は $d>1$ の約数が自身だけなので
$$
g(2)=-\frac12 f(2)g(1)=-\frac34,\qquad
g(3)=-\frac12 f(3)g(1)=-1.
$$
$n=4$ では $d=2,4$ を使い
$$
g(4)=-\frac12\{f(2)g(2)+f(4)g(1)\}
=-\frac12\{-9/4+5/2\}=-1/8.
$$
定義に戻すと
$$
(f*g)(4)=f(1)g(4)+f(2)g(2)+f(4)g(1)
=2(-1/8)+3(-3/4)+5(1/2)=0=\varepsilon(4).
$$
途中で必要なのは $n$ より小さい $g$ の値だけです。
<!-- solution-end -->

#### B4. 三重の畳み込みを数え直す

$h=1*1*1$ とする。素数 $p$、整数 $k\ge0$ について $h(p^k)=(k+1)(k+2)/2$ を、指数の分割を数えて証明せよ。さらに $h(12)$ を求めよ。

- Level: B
- ID: NT4-B4

<!-- solution-start -->
**詳細解答**　[結合則](#thm-nt4-convolution-laws)と[約数関数の表示](#prop-nt4-divisor-convolutions)から $h=\tau*1$ です。[素数冪の式](#prop-nt4-prime-power)で
$$
h(p^k)=\sum_{j=0}^k\tau(p^j)1(p^{k-j})=\sum_{j=0}^k(j+1).
$$
初項 $1$、末項 $k+1$、項数 $k+1$ の和なので $(k+1)(k+2)/2$ です。これは $p^k=p^ip^jp^\ell$ を満たす非負整数 $i+j+\ell=k$ を、まず $i+j=s$ として $s=0,\ldots,k$ に分類すると各 $s$ で $s+1$ 通りあることにも一致します。$12=2^2\cdot3$ で $h$ は [畳み込み閉性](#thm-nt4-closure)により乗法的なので、$h(12)=h(2^2)h(3)=6\cdot3=18$ です。
<!-- solution-end -->

### Level C：全体と素数冪を往復する

#### C1. 二つの数え方と素因数分解を接続する

$f=\tau*\operatorname{id}$ とする。(1) $f(n)$ を $abc=n$ の順序付き正整数三つ組を使った和で表せ。(2) 素数冪での式を導き、$f(72)$ を求めよ。(3) なぜ $f(72)=f(8)f(9)$ とできるか、仮定と使用結果を明記せよ。

- Level: C
- ID: NT4-C1

<!-- solution-start -->
**詳細解答**　(1) [約数関数の表示](#prop-nt4-divisor-convolutions)から $\tau=1*1$ であり、[結合則](#thm-nt4-convolution-laws)で
$$
f(n)=((1*1)*\operatorname{id})(n)
=\sum_{\substack{a,b,c\ge1\\abc=n}}1(a)1(b)\operatorname{id}(c)
=\sum_{\substack{a,b,c\ge1\\abc=n}}c.
$$
ここで三つ組は順序付きで、例えば $(1,2,6)$ と $(2,1,6)$ は別々に数えています。

(2) [素数冪の畳み込み公式](#prop-nt4-prime-power)と $\tau(p^j)=j+1$ から
$$
f(p^k)=\sum_{j=0}^k(j+1)p^{k-j}.
$$
$72=2^3\cdot3^2$ なので、$f(8)=1\cdot8+2\cdot4+3\cdot2+4\cdot1=26$、$f(9)=1\cdot9+2\cdot3+3\cdot1=18$ です。従って $f(72)=26\cdot18=468$ です。

(3) [基本算術関数の乗法性](#prop-nt4-basic-multiplicative)で $\tau$ は乗法的で、$\operatorname{id}(mn)=mn=\operatorname{id}(m)\operatorname{id}(n)$ により $\operatorname{id}$ も乗法的です。[畳み込み閉性](#thm-nt4-closure)から $f$ が乗法的です。$8=2^3$、$9=3^2$ に共通素因数はないので $\gcd(8,9)=1$ という必要条件を満たし、積 $f(8)f(9)$ が使えます。
<!-- solution-end -->

## 7. 次章への橋：逆元を見つけるという問題

算術関数の値は素数冪に分解して計算でき、Dirichlet 畳み込みでは約数和を積のように扱えます。さらに $f(1)\ne0$ なら逆元が存在することも証明しました。しかし**その逆元を閉じた式で書く**ことは、再帰式があるだけではまだ解決していません。

特に定数1関数 $1$ は $1(1)=1$ なので逆元を持ちます。その逆元は、ここで定義した Möbius 関数 $\mu$ とどう結び付くでしょうか。次章では $\mu*1=\varepsilon$ を証明し、任意の約数和を元の関数へ戻す Möbius 反転を導きます。
