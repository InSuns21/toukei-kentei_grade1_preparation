# ANT5 ζ'/ζとvon Mangoldt関数

[ANT4のDirichletの定理](../ANT4/index.md#thm-ant4-dirichlet)は、既約剰余類ごとに素数が無限個あることを証明しました。しかし「$x$ 以下にどの程度あるか」という数の増え方は、そこからは分かりません。[NT8の素数計数関数](../../NT/NT8/index.md#def-nt8-prime-counting) $\pi(x)$ に解析的な関数を結び付けるには、素数を個数だけで数えるのではなく、素数冪に適切な重みを与えるのが有効です。

[NT8で定義したvon Mangoldt関数](../../NT/NT8/index.md#def-nt8-von-mangoldt) $\Lambda$ は、$n=p^k$（$p$ は素数、$k\ge1$）なら $\log p$、それ以外なら $0$ です。

[Chebyshev の θ 関数](../../NT/NT8/index.md#def-nt8-chebyshev-theta)は次のように素数へ重みを与えます。

$$
\theta(x)=\sum_{p\le x}\log p.
$$

[Chebyshev の ψ 関数](../../NT/NT8/index.md#def-nt8-chebyshev-psi)は、素数冪を含めた総和です。

$$
\psi(x)=\sum_{n\le x}\Lambda(n).
$$

この章では既存の定義を作り直しません。**なぜこの重みが $\zeta'/\zeta$ に現れるか**、そして解析的な情報をどのように素数の側へ戻すかを調べます。

以下、$x\ge2$ は実数、$s=\sigma+it$ は複素数、$\log$ は正の実数上では自然対数とします。$O$ の定数が依存するパラメータは必要に応じて明記します。素数についての和は $\sum_p$ と書きます。積分変換で $1\le x<2$ を扱うときは、$\psi(x)=\sum_{1\le n\le x}\Lambda(n)=0$ と定めて定義域を拡張します（$\Lambda(1)=0$）。

## 1. 素数冪への重みが必要な理由

例えば $10$ 以下では $\Lambda(n)\ne0$ となる整数は $2,3,4,5,7,8,9$ です。[定義](../../NT/NT8/index.md#def-nt8-von-mangoldt)を実際に適用すると、

$$
\begin{aligned}
\psi(10)&=\log2+\log3+\log2+\log5+\log7+\log2+\log3=\log2520,\\
\theta(10)&=\log2+\log3+\log5+\log7=\log210,\\
\psi(10)-\theta(10)&=\log12.
\end{aligned}
$$

$\theta$ は各素数の一乗だけを数え、$\psi$ は $4=2^2$、$8=2^3$、$9=3^2$ まで数えます。こうして冪を含める理由はEuler積を微分すると一つの素数からすべての冪が出るためです。まず別の方向から$\Lambda$ の構造を確認します。

[NT8の対数の約数和](../../NT/NT8/index.md#prop-nt8-von-mangoldt-divisor-sum)は $\log n=\sum_{d\mid n}\Lambda(d)$ でした。[NT5のMöbius反転](../../NT/NT5/index.md#thm-nt5-mobius-inversion)で逆にすれば、$\Lambda$ を約数の対数から計算できます。

<a id="prop-ant5-mobius-log"></a>

<!-- formal-statement-start -->
> **命題（von Mangoldt関数のMöbius反転表示）**  
> すべての整数 $n\ge1$ に対し、Möbius関数を $\mu$ とすると

$$
\Lambda(n)=\sum_{d\mid n}\mu(d)\log\frac nd.
$$

> 特に $n=1$ では右辺も $0$ となる。
<!-- formal-statement-end -->

### 証明の見取り図

対数の約数和を既知とし、和の中に現れる除数をもう一度数え直すことで、$\Lambda$ 以外の係数を消します。

<!-- proof-start -->
### 証明

[NT8の恒等式](../../NT/NT8/index.md#prop-nt8-von-mangoldt-divisor-sum)を $m=n/d$ に用いると

$$
\begin{aligned}
\sum_{d\mid n}\mu(d)\log(n/d)
&=\sum_{d\mid n}\mu(d)\sum_{e\mid n/d}\Lambda(e)\\
&=\sum_{e\mid n}\Lambda(e)\sum_{d\mid n/e}\mu(d).
\end{aligned}
$$

有限和なので交換は自由です。[Möbiusの逆元関係](../../NT/NT5/index.md#thm-nt5-mobius-unit)によって内側は $n/e=1$ のとき $1$、そうでなければ $0$ です。よって残る項は $e=n$ の $\Lambda(n)$ 一項だけです。
<!-- proof-end -->

**直接確認**：$n=12$ では $\mu(1)=1,\mu(2)=-1,\mu(3)=-1,\mu(6)=1$ で、他の約数の $\mu$ は $0$ です。

$$
\sum_{d\mid12}\mu(d)\log(12/d)
=\log12-\log6-\log4+\log2=\log1=0.
$$

$12$ が素数冪でないので $\Lambda(12)=0$ という定義と一致します。素数冪のときには、たとえば $n=8$ で $\log8-\log4=\log2$ が残ります。

## 2. Euler積を対数微分すると何が起きるか

[CA12のζのEuler積](../../../解析系/CA/CA12/index.md#thm-ca12-euler-product)は $\sigma>1$ で絶対収束し、非零です。そのため、この領域では $\zeta'(s)/\zeta(s)$ が定義できます。微分前のEuler積の係数はすべて $1$ ですが、対数微分は素数冪を選んで $\log p$ という重みを生成します。

<a id="thm-ant5-logarithmic-derivative"></a>

<!-- formal-statement-start -->
> **定理（ζの対数微分とvon Mangoldt級数）**  
> $\zeta(s)=\sum_{n\ge1}n^{-s}$ とする。$\operatorname{Re}s>1$ なら $\zeta(s)\ne0$ であり、

$$
-\frac{\zeta'(s)}{\zeta(s)}
=\sum_p\frac{\log p\,p^{-s}}{1-p^{-s}}
=\sum_p\sum_{k=1}^{\infty}\frac{\log p}{p^{ks}}
=\sum_{n=1}^{\infty}\frac{\Lambda(n)}{n^s}.
$$

> すべての級数は $\operatorname{Re}s>1$ で絶対収束し、各閉半平面 $\operatorname{Re}s\ge1+\varepsilon$（$\varepsilon>0$）で局所一様収束する。
<!-- formal-statement-end -->

### 証明の見取り図

Euler積から対数を取ってから微分します。微分で出る $\log p$ と、幾何級数の展開で出る $p^k$ が、$\Lambda(p^k)$ の二つの成分です。ここで重要なのは、**無限和の微分を許す収束評価を先に確認すること**です。

<!-- proof-start -->
### 証明

$\sigma>1$ では[Euler積](../../../解析系/CA/CA12/index.md#thm-ca12-euler-product)

$$
\zeta(s)=\prod_p(1-p^{-s})^{-1}
$$

が非零で、$|p^{-s}|=p^{-\sigma}<1$ です。各因子で $-\log(1-z)=\sum_{k\ge1}z^k/k$ の $z=p^{-s}$ を使います。絶対収束は

$$
\begin{aligned}
\sum_p\sum_{k\ge1}\frac{p^{-k\sigma}}k
&\le\sum_p\frac{p^{-\sigma}}{1-p^{-\sigma}}\\
&\le\frac1{1-2^{-\sigma}}\sum_{n\ge2}n^{-\sigma}<\infty
\end{aligned}
$$

から従います。そこで複素対数の枝を、絶対収束する級数で選んで

$$
\mathcal L(s)=\sum_p\sum_{k\ge1}\frac{p^{-ks}}k,
\qquad \exp(\mathcal L(s))=\zeta(s)
$$

とします。微分の絶対収束は任意の $\varepsilon>0$ に対し $\sigma\ge1+\varepsilon$ で

$$
\begin{aligned}
\sum_p\sum_{k\ge1}\frac{\log p}{p^{k\sigma}}
&=\sum_p\frac{\log p\,p^{-\sigma}}{1-p^{-\sigma}}\\
&\le\frac1{1-2^{-(1+\varepsilon)}}\sum_{n\ge2}\frac{\log n}{n^{1+\varepsilon}}<\infty
\end{aligned}
$$

によって保証されます。最後の級数は、十分大きい $n$ で $\log n\le n^{\varepsilon/2}$ と比較すれば $\sum n^{-1-\varepsilon/2}$ に支配されます。この評価はコンパクト集合上で一様なので、[ANT2の局所一様収束と項別微分](../ANT2/index.md#thm-ant2-holomorphic-halfplane)と同じ正則関数列の議論で $\mathcal L$ を項別微分できます。

$$
\mathcal L'(s)
=\sum_p\sum_{k\ge1}\frac{-k\log p\,p^{-ks}}k
=-\sum_p\sum_{k\ge1}\log p\,p^{-ks}.
$$

一方、$\exp\mathcal L=\zeta$ を微分すれば $\zeta'=\zeta\mathcal L'$、従って $\zeta'/\zeta=\mathcal L'$ です。各 $p$ の内部は幾何級数で

$$
\sum_{k\ge1}p^{-ks}=\frac{p^{-s}}{1-p^{-s}}.
$$

さらに $n=p^k$ では[von Mangoldt 関数](../../NT/NT8/index.md#def-nt8-von-mangoldt)により $\Lambda(n)=\log p$、それ以外は $\Lambda(n)=0$ なので、絶対収束する二重和を正整数に番号付けし直せば最後の式になります。
<!-- proof-end -->

**例：素数2の寄与**。$p=2$ のEuler因子は $(1-2^{-s})^{-1}$ で、その対数微分の負号付きの寄与は

$$
\frac{\log2\,2^{-s}}{1-2^{-s}}
=\frac{\log2}{2^s}+\frac{\log2}{4^s}+\frac{\log2}{8^s}+\cdots.
$$

$\Lambda(2)=\Lambda(4)=\Lambda(8)=\log2$ を一挙に出すため、素数だけでなく素数冪が自然に入るわけです。ここまでは $\sigma>1$ の恒等式であり、境界 $\sigma=1$ に単純に代入してはいけません。

## 3. ψ・θ・πはどうつながるか

[NT8の素数冪分解](../../NT/NT8/index.md#prop-nt8-psi-prime-powers)は、$K=\lfloor\log_2x\rfloor$ として

$$
\psi(x)=\sum_{k=1}^K\theta(x^{1/k})
=\theta(x)+\sum_{k=2}^K\theta(x^{1/k})
$$

でした。つまり $\psi$ と $\theta$ の違いは**指数が2以上の素数冪だけ**です。[NT8のChebyshev上界](../../NT/NT8/index.md#thm-nt8-chebyshev-upper)を使うと、その差を主項 $x$ よりずっと小さく抑えられます。

<a id="prop-ant5-prime-powers-error"></a>

<!-- formal-statement-start -->
> **命題（素数冪による補正は平方根程度）**  
> $x\ge2$ に対し $0\le\theta(x)\le\psi(x)$ であり、$x\to\infty$ で

$$
0\le\psi(x)-\theta(x)=O(\sqrt x).
$$

> 従って $\psi(x)\sim x$ と $\theta(x)\sim x$ は同値である。
<!-- formal-statement-end -->

### 証明の見取り図

冪指数 $k=2$ の項をまず $O(\sqrt x)$ で抑え、$k\ge3$ は項数が高々 $\log_2x$ しかないことを使います。$x^{1/3}\log x$ も $\sqrt x$ より小さい規模です。

<!-- proof-start -->
### 証明

[NT8の素数冪分解](../../NT/NT8/index.md#prop-nt8-psi-prime-powers)と[Chebyshev上界](../../NT/NT8/index.md#thm-nt8-chebyshev-upper)から、ある定数 $C$ について $y\ge2$ で $0\le\theta(y)\le Cy$ です。$x\ge8$ とし、$K=\lfloor\log_2x\rfloor$ とすると

$$
\begin{aligned}
0\le\psi(x)-\theta(x)
&=\theta(\sqrt x)+\sum_{k=3}^{K}\theta(x^{1/k})\\
&\le C\sqrt x+C(K-2)x^{1/3}\\
&\le C\sqrt x+\frac C{\log2}x^{1/3}\log x.
\end{aligned}
$$

最後の項と $\sqrt x$ の比は $(\log x)/x^{1/6}$ です。$u=\log x$ と置けばその比は $u e^{-u/6}$ で、$e^{u/6}\ge(u/6)^2/2$ より $u e^{-u/6}\le72/u$（$u>0$）なので零へ収束します。従って差は $O(\sqrt x)$ です。$2\le x<8$ は有界区間なので定数を増せば同じ評価で包含できます。

さらに $(\psi(x)-\theta(x))/x=O(x^{-1/2})\to0$ です。よって $\psi(x)/x-\theta(x)/x\to0$ であり、一方が $1$ に収束することと他方が $1$ に収束することは同値です。
<!-- proof-end -->

$\theta$ と $\pi$ については[NT8で証明済みの素数定理との同値性](../../NT/NT8/index.md#prop-nt8-pnt-theta-equivalence)を参照できます。ここではさらに、近似だけでなく**任意の $x$ で正確に成り立つ式**を確認します。

<a id="prop-ant5-prime-summation"></a>

<!-- formal-statement-start -->
> **命題（素数計数関数の部分和恒等式）**  
> $x\ge2$ について、$\pi(x)=\#\{p\le x\}$、$\theta(x)=\sum_{p\le x}\log p$ とすると

$$
\theta(x)=\pi(x)\log x-\int_2^x\frac{\pi(t)}t\,dt
$$

> および

$$
\pi(x)=\frac{\theta(x)}{\log x}
+\int_2^x\frac{\theta(t)}{t(\log t)^2}\,dt
$$

> が厳密に成り立つ。
<!-- formal-statement-end -->

### 証明の見取り図

[ANT1のAbelの部分和公式](../ANT1/index.md#thm-ant1-abel)を、素数の指示関数と $\log t$、または $\Lambda$ の一乗側の重みと $1/\log t$ に適用します。素数の位置でジャンプする階段関数に対しても積分で重みを移せます。

<!-- proof-start -->
### 証明

$1\le n\le x$ で $a(n)=1$（$n$ が素数）、それ以外は $0$ とすると総和は $\pi(t)$ です。[Abelの部分和公式](../ANT1/index.md#thm-ant1-abel)に $b(t)=\log t$ を入れ、$b'(t)=1/t$ を使うと

$$
\sum_{p\le x}\log p
=\pi(x)\log x-\int_1^x\frac{\pi(t)}t\,dt.
$$

$1\le t<2$ では $\pi(t)=0$ なので積分の下限を $2$ として最初の式を得ます。

次に $a(n)=\log n$（$n$ が素数）、それ以外は $0$ とすると総和は $\theta(t)$ です。$t\ge2$ で $b(t)=1/\log t$ は微分可能で、$b'(t)=-1/(t(\log t)^2)$ です。$[2,x]$ における有限和の部分積分では

$$
\sum_{2\le n\le x}a(n)b(n)
=\theta(x)b(x)-\int_2^x\theta(t)b'(t)\,dt
$$

が成り立ちます。これは $[1,x]$ 上の[Abelの部分和公式](../ANT1/index.md#thm-ant1-abel)を証明したのと同じ有限差の恒等式で、下端では $\theta(t)=0$（$t<2$）のため余分な境界項はありません。左辺は各素数 $p$ に対して $(\log p)/(\log p)=1$ を足すので $\pi(x)$ です。$b,b'$ を代入すれば第二の式を得ます。
<!-- proof-end -->

**検算**：$x=5$ なら $\pi(5)=3$、$\theta(5)=\log2+\log3+\log5=\log30$ です。第一式の積分は区間 $[2,3),[3,5)$ のそれぞれで $\pi(t)=1,2$ なので

$$
\int_2^5\frac{\pi(t)}t\,dt
=\log(3/2)+2\log(5/3)=\log(25/6).
$$

よって $3\log5-\log(25/6)=\log30$ となり、左辺と一致します。この等式は素数の位置が不規則でも、階段状の総和関数だけで成立します。

$\theta(x)\sim x$ と分かれば、第二式の第一項は $x/\log x$ に漸近します。第二項は $O(x/(\log x)^2)$ です。実際 $\theta(t)\le Ct$ を使い、積分を $[2,\sqrt x]$ と $[\sqrt x,x]$ に分けると、前者は $O(\sqrt x)$、後者は $O(x/(\log x)^2)$ です。従って $\pi(x)\sim x/\log x$ が導けます。逆方向も含めた同値性は[NT8の命題](../../NT/NT8/index.md#prop-nt8-pnt-theta-equivalence)です。

## 4. Dirichlet級数から積分変換へ

級数 $\sum \Lambda(n)n^{-s}$ は整数上の離散的な情報ですが、総和関数 $\psi(x)$ は実数の変数を持っています。個々の係数と総和の関係を積分として書けば、$\zeta$ の解析的な性質を $\psi$ の増加の仕方へ接続できます。

<a id="thm-ant5-mellin-psi"></a>

<!-- formal-statement-start -->
> **定理（ψのMellin型積分表示）**  
> $\psi(x)=\sum_{1\le n\le x}\Lambda(n)$ を $x\ge1$ で定義する（$1\le x<2$ では $\psi(x)=0$）。$\operatorname{Re}s>1$ において、次の積分は絶対収束し、

$$
-\frac{\zeta'(s)}{\zeta(s)}
=s\int_1^\infty\frac{\psi(x)}{x^{s+1}}\,dx
$$

> が成立する。$E(x)=\psi(x)-x$（$x\ge1$）と置けば、同じ領域で

$$
-\frac{\zeta'(s)}{\zeta(s)}
=\frac{s}{s-1}
+s\int_1^\infty\frac{E(x)}{x^{s+1}}\,dx.
$$
<!-- formal-statement-end -->

### 証明の見取り図

$\psi(x)=\sum_{n\le x}\Lambda(n)$ を代入し、$n$ ごとの積分 $\int_n^\infty s x^{-s-1}\,dx=n^{-s}$ を計算します。非負の係数を持つ場合も、複素 $s$ の交換の正当化には絶対収束が必要です。

<!-- proof-start -->
### 証明

[Chebyshev の ψ 関数](../../NT/NT8/index.md#def-nt8-chebyshev-psi)により $\psi(x)=\sum_{n\le x}\Lambda(n)$ です。$s\ne0$、$\sigma>1$ では

$$
\int_n^\infty x^{-s-1}\,dx
=\left[-\frac{x^{-s}}s\right]_{x=n}^{x=\infty}
=\frac{n^{-s}}s.
$$

ここで $x^{-s}=e^{-s\log x}$ であり、$\sigma>0$ なら上端の極限は $0$ です。積分と和の交換の絶対値は

$$
\begin{aligned}
\sum_{n\ge1}\Lambda(n)\int_n^\infty |s|x^{-\sigma-1}\,dx
&=\frac{|s|}{\sigma}\sum_{n\ge1}\frac{\Lambda(n)}{n^\sigma}\\
&<\infty
\end{aligned}
$$

です。最後の収束は[対数微分の定理](#thm-ant5-logarithmic-derivative)によります。従って

$$
\begin{aligned}
s\int_1^\infty\psi(x)x^{-s-1}\,dx
&=s\sum_{n\ge1}\Lambda(n)\int_n^\infty x^{-s-1}\,dx\\
&=\sum_{n\ge1}\Lambda(n)n^{-s}
=-\frac{\zeta'(s)}{\zeta(s)}.
\end{aligned}
$$

最後に $\psi(x)=x+E(x)$ と置き、$\sigma>1$ で絶対収束する積分を分けます。

$$
s\int_1^\infty x\cdot x^{-s-1}\,dx
=s\int_1^\infty x^{-s}\,dx
=\frac{s}{s-1}.
$$

これにより第二の表示が得られます。
<!-- proof-end -->

この式では、主項 $x$ が $\frac{s}{s-1}$ に対応しています。

[CA12のζの有理型接続](../../../解析系/CA/CA12/index.md#thm-ca12-meromorphic-continuation)で $\zeta$ は $s=1$ に単純極を持つため、$-\zeta'/\zeta$ の $s=1$ での留数は $+1$ です。実際、

$$
\frac{s}{s-1}=1+\frac{1}{s-1}
$$

も同じ留数を持ちます。**ただし「極がある」だけで $\psi(x)\sim x$ を結論してはいけません。** この後の論証で、ほかの零点が邪魔をする仕組みを特定します。

## 5. ψの誤差とζの零点――一方向の含意

$\zeta(s)$ は[CA12で有理型に延長](../../../解析系/CA/CA12/index.md#thm-ca12-meromorphic-continuation)されています。零点 $s_0$ があると、$-\zeta'/\zeta$ はその点に極を持ちます。これは、局所的に $\zeta(s)=(s-s_0)^m g(s)$（$g(s_0)\ne0$）と書けば

$$
-\frac{\zeta'(s)}{\zeta(s)}
=-\frac{m}{s-s_0}-\frac{g'(s)}{g(s)}
$$

となるためです。$\psi(x)$ の誤差が小さければ、前節の誤差積分がより左の領域まで正則に延長され、このような極を許さなくなります。

<a id="thm-ant5-error-zero-free"></a>

<!-- formal-statement-start -->
> **定理（ψの冪誤差から導く零点不存在）**  
> 実数 $0\le\alpha<1$ が存在して

$$
\psi(x)=x+O(x^\alpha)\qquad(x\to\infty)
$$

> が成立すると仮定する。このとき、Riemann ζ関数は半平面 $\operatorname{Re}s>\alpha$ に零点を持たない。なお $s=1$ は零点でなく単純極である。
<!-- formal-statement-end -->

### 証明の見取り図

誤差積分の絶対値を $\int_1^\infty x^{\alpha-\sigma-1}\,dx$ で支配します。すると誤差部分は $\sigma>\alpha$ で正則になり、$\zeta$ の零点が作るはずの対数微分の極と矛盾します。これは**誤差評価から零点不存在へ**の方向であり、逆はここでは扱いません。

<!-- proof-start -->
### 証明

仮定から $x\ge2$ で $|E(x)|\le Cx^\alpha$ としてよく、$1\le x\le2$ でも $E(x)=\psi(x)-x$ は有界なので定数を増やせば $x\ge1$ で同じ評価になります。

$\sigma>\alpha$ に対し

$$
\int_1^\infty |E(x)x^{-s-1}|\,dx
\le C\int_1^\infty x^{\alpha-\sigma-1}\,dx
=\frac C{\sigma-\alpha}<\infty.
$$

さらに任意のコンパクト集合 $K\subset\{\operatorname{Re}s>\alpha\}$ に対して、ある $\delta>0$ で $\operatorname{Re}s\ge\alpha+\delta$ が $K$ 上成り立ちます。$s$ 微分を $j$ 回行った被積分関数は $(-\log x)^j E(x)x^{-s-1}$ なので

$$
\big|(-\log x)^j E(x)x^{-s-1}\big|
\le C(\log x)^j x^{-1-\delta},
$$

右辺は各整数 $j\ge0$ で可積分です。従って積分

$$
G(s)=s\int_1^\infty E(x)x^{-s-1}\,dx
$$

は $\operatorname{Re}s>\alpha$ で正則です。

[前節の積分表示](#thm-ant5-mellin-psi)から $\operatorname{Re}s>1$ で

$$
-\frac{\zeta'(s)}{\zeta(s)}
=\frac{s}{s-1}+G(s)
$$

です。右辺は $\operatorname{Re}s>\alpha$ において $s=1$ 以外正則です。左辺は[CA12の有理型接続](../../../解析系/CA/CA12/index.md#thm-ca12-meromorphic-continuation)に基づく有理型関数で、両辺は開集合 $\operatorname{Re}s>1$ で一致します。[恒等定理](../../../解析系/CA/CA3/index.md#thm-ca3-isolated-zeros-identity)により有理型関数として一致するため、左辺もこの半平面の $s=1$ 以外で極を持ちません。

もし $s_0\ne1$ かつ $\operatorname{Re}s_0>\alpha$ で $\zeta(s_0)=0$ なら、零点の位数を $m\ge1$ とした上記の局所表示から $-\zeta'/\zeta$ は $s_0$ に留数 $-m$ の極を持ちます。右辺は $s_0$ で正則なので矛盾します。$s=1$ は[CA12の単純極](../../../解析系/CA/CA12/index.md#thm-ca12-meromorphic-continuation)であり零点ではありません。以上で零点不存在が従います。
<!-- proof-end -->

例えば仮に $\psi(x)=x+O(x^{3/4})$ を証明できれば、この定理から $\operatorname{Re}s>3/4$ にζの零点がないと分かります。しかしこの具体的な誤差評価を**この章では証明していません**。「もし強い誤差評価があれば何が従うか」を示した条件付きの推論です。

逆に、ある縦線上の零点不存在だけで同じ冪誤差が出ると即断してはいけません。解析的な情報から正確な漸近式へ戻すには、積分反転・Tauber型定理などの追加の道具が必要です。この課題がANT6へつながります。

## 6. 演習と詳細解答

演習では $\pi,\theta,\psi,\Lambda$ を[von Mangoldt 関数](../../NT/NT8/index.md#def-nt8-von-mangoldt)に従って用います。絶対収束が必要な箇所では $\operatorname{Re}s>1$ を明示してください。

### Level A：基礎計算と定義の使い分け

#### A1. 素数冪とΛの値

$1,2,4,6,8,9,12,25$ について $\Lambda(n)$ をすべて求め、$\psi(9)-\theta(9)$ を計算せよ。

- Level: A
- ID: ANT5-A1

<!-- solution-start -->
**詳細解答**：[NT8のvon Mangoldt関数](../../NT/NT8/index.md#def-nt8-von-mangoldt)は素数冪 $p^k$ のときだけ $\log p$ です。よって

$$
\begin{array}{c|cccccccc}
n&1&2&4&6&8&9&12&25\\ \hline
\Lambda(n)&0&\log2&\log2&0&\log2&\log3&0&\log5
\end{array}
$$

です。$9$ 以下の素数冪のうち、一乗でないものは $4,8,9$ なので、[素数冪分解](../../NT/NT8/index.md#prop-nt8-psi-prime-powers)から

$$
\psi(9)-\theta(9)
=\Lambda(4)+\Lambda(8)+\Lambda(9)
=2\log2+\log3=\log12.
$$

$25>9$ はこの和に入りません。
<!-- solution-end -->

#### A2. Möbius反転の小さい例

[本章のMöbius表示](#prop-ant5-mobius-log)を用いて $\Lambda(9)$ と $\Lambda(10)$ を直接計算せよ。

- Level: A
- ID: ANT5-A2

<!-- solution-start -->
**詳細解答**：$9$ の約数は $1,3,9$ で、$\mu(1)=1,\mu(3)=-1,\mu(9)=0$ です。

$$
\Lambda(9)=\log9-\log3+0=\log3.
$$

$10$ の約数 $1,2,5,10$ では $\mu$ の値が $1,-1,-1,1$ なので

$$
\Lambda(10)=\log10-\log5-\log2+\log1
=\log(10/(5\cdot2))=0.
$$

$9=3^2$ は素数冪、$10=2\cdot5$ は二種類の素因数を持つ、という[定義](../../NT/NT8/index.md#def-nt8-von-mangoldt)に一致します。
<!-- solution-end -->

#### A3. Euler因子の対数微分

$\sigma>1$ として、素数 $p=3$ の因子 $(1-3^{-s})^{-1}$ の対数微分と、その負号付きの量をそれぞれ計算せよ。両方について $3^{-s},9^{-s},27^{-s}$ の係数を答えよ。

- Level: A
- ID: ANT5-A3

<!-- solution-start -->
**詳細解答**：$u(s)=3^{-s}$ と置くと $u'(s)=-(\log3)u(s)$ です。対数因子 $-\log(1-u(s))$ の導関数は $u'(s)/(1-u(s))$ なので

$$
-\frac{\log3\,3^{-s}}{1-3^{-s}}
=-(\log3)\sum_{k\ge1}3^{-ks}.
$$

これはEuler因子の**対数微分**であり、$3^{-s},9^{-s},27^{-s}$ の係数はすべて $-\log3$ です。一方、[本章の定理](#thm-ant5-logarithmic-derivative)で使う負号付きの対数微分は

$$
-\frac{d}{ds}\log(1-3^{-s})^{-1}
=(\log3)\sum_{k\ge1}3^{-ks}
$$

なので、その3つの係数はすべて $+\log3$ です。$\sigma>1$ なので両方の幾何級数表示は絶対収束します。
<!-- solution-end -->

#### A4. 二つの計数関数

$x=5$ で $\pi(x),\theta(x)$ を求め、[素数計数の部分和恒等式](#prop-ant5-prime-summation)の第一式を積分の各区間で確認せよ。

- Level: A
- ID: ANT5-A4

<!-- solution-start -->
**詳細解答**：$5$ 以下の素数は $2,3,5$ なので $\pi(5)=3$、$\theta(5)=\log30$ です。$2\le t<3$ で $\pi(t)=1$、$3\le t<5$ で $\pi(t)=2$ なので

$$
\begin{aligned}
\int_2^5\frac{\pi(t)}t\,dt
&=\int_2^3\frac{dt}t+2\int_3^5\frac{dt}t\\
&=\log(3/2)+2\log(5/3)=\log(25/6).
\end{aligned}
$$

右辺は $3\log5-\log(25/6)=\log(125\cdot6/25)=\log30$ となり、左辺と一致します。端点での $\pi$ の値は積分に影響しません。
<!-- solution-end -->

### Level B：評価と積分の正当化

#### B1. 素数冪の補正

[Chebyshev上界](../../NT/NT8/index.md#thm-nt8-chebyshev-upper) $\theta(y)\le Cy$ と[素数冪分解](../../NT/NT8/index.md#prop-nt8-psi-prime-powers)だけから、$\psi(x)-\theta(x)=O(\sqrt x)$ を導け。$k\ge3$ の総和を無視しないこと。

- Level: B
- ID: ANT5-B1

<!-- solution-start -->
**詳細解答**：$x\ge8$ で $K=\lfloor\log_2x\rfloor$ とすると、素数冪分解から

$$
\begin{aligned}
0\le\psi(x)-\theta(x)
&=\sum_{k=2}^K\theta(x^{1/k})\\
&\le C\sqrt x+C\sum_{k=3}^K x^{1/k}\\
&\le C\sqrt x+C(K-2)x^{1/3}.
\end{aligned}
$$

$K\le\log x/\log2$ なので最後は $C\sqrt x+C x^{1/3}(\log x)/\log2$ 以下です。$\log x/x^{1/6}\to0$ より $x^{1/3}\log x=o(\sqrt x)$ となり、全体は $O(\sqrt x)$ です。$2\le x<8$ は定数の調整で含められます。重要なのは $k=3,4,\ldots$ の項数も評価したことです。
<!-- solution-end -->

#### B2. ψからDirichlet級数を戻す

$\sigma>1$ で $\psi(x)=\sum_{n\le x}\Lambda(n)$ とする。積分と和を交換できる根拠を絶対値で示し、$s\int_1^\infty\psi(x)x^{-s-1}dx=\sum_n\Lambda(n)n^{-s}$ を導け。

- Level: B
- ID: ANT5-B2

<!-- solution-start -->
**詳細解答**：[対数微分の定理](#thm-ant5-logarithmic-derivative)から $\sum_n\Lambda(n)n^{-\sigma}<\infty$ です。$\Lambda(n)\ge0$ なので、被積分関数の絶対値を先に合計すると

$$
\begin{aligned}
\sum_{n\ge1}\Lambda(n)\int_n^\infty|s|x^{-\sigma-1}dx
&=\frac{|s|}{\sigma}\sum_{n\ge1}\Lambda(n)n^{-\sigma}\\
&<\infty.
\end{aligned}
$$

ゆえに交換でき、$\int_n^\infty x^{-s-1}dx=n^{-s}/s$ を使って

$$
\begin{aligned}
s\int_1^\infty\psi(x)x^{-s-1}dx
&=s\sum_{n\ge1}\Lambda(n)\int_n^\infty x^{-s-1}dx\\
&=\sum_{n\ge1}\Lambda(n)n^{-s}.
\end{aligned}
$$

この計算は $\operatorname{Re}s>1$ のみで正当化したので、境界へ代入したわけではありません。
<!-- solution-end -->

#### B3. θからπの主項を得る

$\theta(x)=x+o(x)$ を仮定し、[本章の部分和恒等式](#prop-ant5-prime-summation)と $\theta(t)\le Ct$ から $\pi(x)\sim x/\log x$ を示せ。

- Level: B
- ID: ANT5-B3

<!-- solution-start -->
**詳細解答**：部分和恒等式は

$$
\pi(x)=\frac{\theta(x)}{\log x}
+\int_2^x\frac{\theta(t)}{t(\log t)^2}dt.
$$

仮定から第一項は $x/\log x+o(x/\log x)$ です。第二項について $x\ge4$ で積分を $\sqrt x$ で分けます。$2\le t\le\sqrt x$ では $\log t\ge\log2$ なので

$$
\int_2^{\sqrt x}\frac{\theta(t)}{t(\log t)^2}dt
\le\frac C{(\log2)^2}\sqrt x=O(\sqrt x).
$$

$\sqrt x\le t\le x$ では $\log t\ge(\log x)/2$ なので

$$
\int_{\sqrt x}^{x}\frac{\theta(t)}{t(\log t)^2}dt
\le\frac{4C}{(\log x)^2}(x-\sqrt x)
=O\left(\frac{x}{(\log x)^2}\right).
$$

二つとも $x/\log x$ で割ると零に収束します。よって $\pi(x)=x/\log x+o(x/\log x)$、すなわち $\pi(x)\sim x/\log x$ です。
<!-- solution-end -->

### Level C：解析側の仮定と零点を接続する

#### C1. 誤差の冪評価がもたらす帰結

仮に $\psi(x)=x+O(x^{2/3})$ が証明されたとする。$-\zeta'/\zeta$ の積分表示から、$\operatorname{Re}s>2/3$ でζに零点がないことを示せ。さらに、この仮定なしで「ζが $s=1$ に単純極を持つ」という事実だけでは同じ結論を得られない理由を述べよ。

- Level: C
- ID: ANT5-C1

<!-- solution-start -->
**詳細解答**：$E(x)=\psi(x)-x$ とし、仮定の定数を $x\ge1$ に拡張して $|E(x)|\le Cx^{2/3}$ とします。[積分表示](#thm-ant5-mellin-psi)は $\sigma>1$ で

$$
-\frac{\zeta'(s)}{\zeta(s)}
=\frac{s}{s-1}+s\int_1^\infty E(x)x^{-s-1}dx
$$

です。$\sigma>2/3$ なら

$$
\int_1^\infty|E(x)x^{-s-1}|dx
\le C\int_1^\infty x^{-1-(\sigma-2/3)}dx
=\frac C{\sigma-2/3}.
$$

閉半平面 $\sigma\ge2/3+\delta$ で $s$ 微分すると、被積分関数には $(\log x)^j$ が付きます。各整数 $j\ge0$ に対して

$$
\int_1^\infty(\log x)^j x^{-1-\delta}\,dx<\infty
$$

なので、誤差積分は半平面 $\sigma>2/3$ で正則です。右辺は $s=1$ 以外に極を持ちません。

[CA12のζの有理型性](../../../解析系/CA/CA12/index.md#thm-ca12-meromorphic-continuation)により、左辺は有理型関数です。[恒等定理](../../../解析系/CA/CA3/index.md#thm-ca3-isolated-zeros-identity)を有理型関数の正則な部分へ適用し、両者が半平面内で一致すると分かります。

もし $s_0\ne1$ が零点で位数 $m$ なら、局所的に $\zeta(s)=(s-s_0)^m g(s)$ と書けるので

$$
-\frac{\zeta'(s)}{\zeta(s)}
=-\frac{m}{s-s_0}-\frac{g'(s)}{g(s)}
$$

となり、$s_0$ に極が生じて矛盾します。$s=1$ は零点ではなく単純極です。

単純極という情報は $s=1$ の**局所的**な性質だけを指定します。他の点でζが零になる可能性や、誤差積分がどこまで正則に延長できるかは制御しません。従って冪誤差の仮定を除いて同じ零点不存在を主張することはできません。
<!-- solution-end -->

## 7. 次章への橋

Euler積の対数微分から $\Lambda(n)$ を係数とする級数を得て、さらにその級数を $\psi(x)$ の積分へ戻しました。[NT8の素数定理の主張](../../NT/NT8/index.md#thm-nt8-prime-number-theorem)に到達するには $\psi(x)\sim x$ を**実際に証明する**必要があります。この章で示したのは、強い誤差評価を仮定すれば零点不存在が従うという一方向の含意までです。ANT6では $\operatorname{Re}s=1$ の零点を排除し、解析情報を漸近式へ戻す追加の論理を組み立てます。
