# NDA2 Dirichlet・Hurwitz・悪近似数

[NT7のDirichlet近似](../../NT/NT7/index.md#lem-nt7-dirichlet-approximation)から、無理数 $\alpha$ には $|\alpha-p/q|<1/q^2$ を満たす有理数が無限にあると分かりました。しかし係数 $1$ はどこまで小さくできるのでしょうか。小さくした係数をすべての無理数に共通して使えるのか、数によって近似の難しさが違うのかを調べます。

[前章の正規化近似誤差](../NDA1/index.md#def-nda1-normalized-error)は、その比較に適した量です。Hurwitzの定理は、**すべての無理数に通用する最良の係数が $1/\sqrt5$** であることを示します。その最適性を決めるのは黄金比です。さらに、ある無理数について近似誤差が一様に小さくなりすぎない条件を連分数の部分商で特徴付けます。

## 1. 分母の二乗を掛けて近似を比べる

無理数 $\alpha\in\mathbb R$、整数 $p$、正整数 $q$ に対し、$|\alpha-p/q|$ に $q^2$ を掛けると $q|q\alpha-p|$ になります。同じ分母 $q$ なら、最も近い整数 $p$ を選ぶことでこの値を最小にできます。この区別は重要です。特定の収束分数の正規化誤差と、分母 $q$ 全体の最良値とは別の量です。

<a id="def-nda2-approximation-constant"></a>

<!-- formal-statement-start -->
> **定義（近似定数と漸近近似定数）**  
> 無理数 $\alpha\in\mathbb R$、整数 $q\ge1$ に対して

$$
h_\alpha(q)=q\min_{p\in\mathbb Z}|q\alpha-p|
$$

> と置く。さらに

$$
c(\alpha)=\inf_{q\ge1}h_\alpha(q),
\qquad
\lambda(\alpha)=\liminf_{q\to\infty}h_\alpha(q)
$$

> を、それぞれ近似定数、漸近近似定数と呼ぶ。ここで下極限は $q$ を正整数として取る。
<!-- formal-statement-end -->

<!-- definition-example-start: def-nda2-approximation-constant -->
**定義の確認**：$\alpha=\sqrt2$、$q=2$ では $2\sqrt2$ に最も近い整数は $p=3$ です。$2<2\sqrt2<3$、かつ $2\sqrt2>5/2$ だから、整数 $3$ が唯一の最小化点であり、

$$
h_{\sqrt2}(2)=2(3-2\sqrt2)=6-4\sqrt2.
$$

これは[前章の $\theta_1$](../NDA1/index.md#def-nda1-normalized-error) と一致します。ただし $c(\sqrt2)$ はすべての分母を調べた下限であり、この一つの値だけで確定したわけではありません。
<!-- definition-example-end -->

収束分数を $p_n/q_n$ とし、

$$
e_n=|q_n\alpha-p_n|,
\qquad
\theta_n=q_ne_n
$$

と書きます。[NT7の第二種最良近似](../../NT/NT7/index.md#thm-nt7-best-approximation)は、分母 $q_n\le q<q_{n+1}$ の整数組に対して $|q\alpha-p|\ge e_n$ を保証します。このとき $q\ge q_n$ ですから

$$
h_\alpha(q)=q\min_p|q\alpha-p|
\ge qe_n\ge q_ne_n=\theta_n.
$$

反対に $q=q_n$ では $p=p_n$ が最小値を与えます。したがって、分母を連続した収束分数の間で動かしても、それより小さい正規化誤差を新たに作れません。この事実から次を得ます。

<a id="prop-nda2-liminf-convergents"></a>

<!-- formal-statement-start -->
> **命題（漸近近似定数の収束分数表示）**  
> 無理数 $\alpha$ の収束分数 $p_n/q_n$ に対して

$$
\lambda(\alpha)=
\liminf_{n\to\infty}q_n^2
\left|\alpha-\frac{p_n}{q_n}\right|
=\liminf_{n\to\infty}\theta_n
$$

> が成立する。
<!-- formal-statement-end -->

### 証明の見取り図

大きな分母 $q$ を隣り合う収束分数の分母の間に置き、第二種最良性で比較します。逆向きは $q=q_n$ を選ぶだけです。

<!-- proof-start -->
### 証明

[NT7の分母漸化式](../../NT/NT7/index.md#def-nt7-convergent)から、分母列は無限大へ発散し、十分後は厳密に増加します。任意の十分大きい正整数 $q$ に対し、連続する収束分数の分母の間に置ける添字 $n$ を選びます。

$
q_n\le q<q_{n+1}.
$

ここに[第二種最良近似](../../NT/NT7/index.md#thm-nt7-best-approximation)を用いると、先ほど計算した分母区間の評価が得られます。

$
h_\alpha(q)\ge\theta_n.
$

$q$ を無限大へ送れば、選んだ $n$ も無限大へ進みます。従って

$$
\liminf_{q\to\infty}h_\alpha(q)
\ge\liminf_{n\to\infty}\theta_n.
$$

逆に $q_n$ は無限大へ進み、[第二種最良近似](../../NT/NT7/index.md#thm-nt7-best-approximation)に $q=q_n$ を代入すると最小化する整数は $p_n$ です。したがって

$$
h_\alpha(q_n)=q_n|q_n\alpha-p_n|=\theta_n.
$$

全分母で取った下極限は部分列 $q_n$ の下極限以下なので逆向きの不等式も成立します。
<!-- proof-end -->

## 2. なぜ $\sqrt5$ が現れるのか

[前章の完全商による誤差表示](../NDA1/index.md#prop-nda1-exact-error)は、一つの $\theta_n$ を計算しました。ここでは**隣り合う三つ**を同時に比べます。次の部分商が大きいときは真ん中の誤差が小さくなり、部分商が $1$ のときは左右の誤差も使う必要があります。三つを同時に見ることで、黄金比を特徴付ける $\sqrt5$ が自然に現れます。

$n\ge2$ を固定し、$a=a_{n+1}$、次の二つの正の数を置きます。

$$
t=\frac{q_{n-1}}{q_n},
\qquad
s=\frac1{\alpha_{n+2}}.
$$

分母の漸化式から $0<t<1$、完全商の定義から $0<s<1$ です。さらに $\alpha_{n+1}=a+s$ で、$a\ge1$ は整数です。

<a id="lem-nda2-three-errors"></a>

<!-- formal-statement-start -->
> **補題（隣接する三収束分数の誤差公式）**  
> 無理数 $\alpha$ の収束分数について、上記の $n\ge2$、$a=a_{n+1}$、$t=q_{n-1}/q_n$、$s=1/\alpha_{n+2}$ に対し

$$
\theta_{n-1}=\frac{t(a+s)}{a+t+s},
\qquad
\theta_n=\frac1{a+t+s},
\qquad
\theta_{n+1}=\frac{s(a+t)}{a+t+s}
$$

> が成立する。
<!-- formal-statement-end -->

### 証明の見取り図

$\theta_n$ を基準にし、誤差 $e_{n-1}$ と $e_{n+1}$ を $e_n$ の倍数で表します。分母の比も漸化式だけで決まります。

<!-- proof-start -->
### 証明

[NT7の完全商公式と差積](../../NT/NT7/index.md#lem-nt7-convergent-matrix)から誤差 $e_j=|q_j\alpha-p_j|$ の符号は隣同士で交互です。また分子と分母の[収束分数漸化式](../../NT/NT7/index.md#def-nt7-convergent)を引き算すれば

$$
e_{n-1}=a e_n+e_{n+1}
$$

となります。一方、[完全商を用いた誤差表示](../NDA1/index.md#prop-nda1-exact-error)に $j=n$ を代入すると

$$
e_n=\frac1{q_n(a+s)+q_{n-1}}
=\frac1{q_n(a+t+s)}.
$$

同じ公式を $j=n+1$ に代入し、$q_{n+1}=a q_n+q_{n-1}=q_n(a+t)$ と $\alpha_{n+2}=1/s$ を用いると

$$
\begin{aligned}
e_{n+1}
&=\frac1{q_{n+1}\alpha_{n+2}+q_n}\\
&=\frac1{q_n((a+t)/s+1)}
=\frac{s}{q_n(a+t+s)}
=s e_n.
\end{aligned}
$$

ゆえに $e_{n-1}=(a+s)e_n$ です。最後に $\theta_j=q_je_j$ に戻せば

$$
\begin{aligned}
\theta_{n-1}&=q_{n-1}(a+s)e_n=\frac{t(a+s)}{a+t+s},\\
\theta_n&=q_ne_n=\frac1{a+t+s},\\
\theta_{n+1}&=q_{n+1}s e_n=\frac{s(a+t)}{a+t+s}.
\end{aligned}
$$

三式の正規化に同じ分母が現れました。
<!-- proof-end -->

<a id="lem-nda2-hurwitz-triple"></a>

<!-- formal-statement-start -->
> **補題（Hurwitzの三収束分数評価）**  
> 無理数 $\alpha$ の収束分数に対して、各整数 $n\ge2$ で

$$
\min\{\theta_{n-1},\theta_n,\theta_{n+1}\}
<\frac1{\sqrt5}
$$

> が成り立つ。
<!-- formal-statement-end -->

### 証明の見取り図

三つの誤差の共通分母を $a+t+s$ と書きます。$u=t+s$ を固定すると左右の誤差の小さい方は $t=s$ のときに最大になります。そこで左右の上界と真ん中の誤差を比較すると、交点の値は $1/\sqrt{a^2+4}$ です。$a$ は正整数なので、この値は $1/\sqrt5$ 以下です。

<!-- proof-start -->
### 証明

[三収束分数の誤差公式](#lem-nda2-three-errors)で $a=a_{n+1}\ge1$、$0<t,s<1$、$u=t+s\in(0,2)$ と置きます。真ん中の誤差は

$$
\theta_n=\frac1{a+u}.
$$

両端の誤差の分子の差は

$$
t(a+s)-s(a+t)=a(t-s)
$$

なので、小さい方は

$$
\min(\theta_{n-1},\theta_{n+1})
=\frac{a\min(t,s)+ts}{a+u}.
$$

ここで $\min(t,s)\le u/2$ であり、$(t-s)^2\ge0$ から $4ts\le(t+s)^2=u^2$ が従います。従って

$$
\min(\theta_{n-1},\theta_{n+1})
\le\frac{au/2+u^2/4}{a+u}
=\frac{u(2a+u)}{4(a+u)}.
$$

$u$ の関数として

$$
f_a(u)=\frac{u(2a+u)}{4(a+u)}
=\frac14\left((a+u)-\frac{a^2}{a+u}\right),
\qquad
g_a(u)=\frac1{a+u}
$$

を考えます。$a\ge1$ を固定すると $f_a$ は厳密に増加し、$g_a$ は厳密に減少します。交点は

$$
\begin{aligned}
f_a(u)=g_a(u)
&\ \Longleftrightarrow\
u(2a+u)=4\\
&\ \Longleftrightarrow\
(a+u)^2=a^2+4\\
&\ \Longleftrightarrow\
u=\sqrt{a^2+4}-a
\end{aligned}
$$

です。この交点 $u_*$ は正で、$\sqrt{a^2+4}<a+2$ から $u_*<2$ でもあります。従って許された $u\in(0,2)$ で比較できます。交点での値は

$$
f_a(u_*)=g_a(u_*)=\frac1{\sqrt{a^2+4}}.
$$

$u<u_*$ なら $f_a(u)<1/\sqrt{a^2+4}$、$u>u_*$ なら $g_a(u)<1/\sqrt{a^2+4}$ です。交点の場合だけは

$$
\min\{\theta_{n-1},\theta_n,\theta_{n+1}\}
\le\frac1{\sqrt{a^2+4}}
$$

という非厳密な評価ですが、$a\ge2$ なら $1/\sqrt{a^2+4}<1/\sqrt5$ なので十分です。

最後に $a=1$、$u=u_*=\sqrt5-1$ の場合を調べます。この場合に $\min(\theta_{n-1},\theta_{n+1})=1/\sqrt5$ になるには、$\min(t,s)=u/2$ と $ts=u^2/4$ がともに等号で、$t=s=(\sqrt5-1)/2$ が必要です。しかし $t=q_{n-1}/q_n$ は有理数で、右辺は無理数です。よってこの場合にも小さい方の誤差は $1/\sqrt5$ より厳密に小さくなります。すべての場合に目的の不等式を得ました。
<!-- proof-end -->

<a id="thm-nda2-hurwitz"></a>

<!-- formal-statement-start -->
> **定理（Hurwitzの近似定理）**  
> すべての無理数 $\alpha\in\mathbb R$ に対し、互いに素な整数 $p$ と正整数 $q$ の組が無限に存在して

$$
\left|\alpha-\frac pq\right|<\frac1{\sqrt5\,q^2}
$$

> を満たす。定数 $1/\sqrt5$ は、すべての無理数について「無限に存在」を保証する普遍定数としてこれ以上小さくできない。
<!-- formal-statement-end -->

### 証明の見取り図

存在部分は三項補題を任意に遠い添字へ適用することで得ます。最適性は次節で黄金比の整数係数二次方程式から証明します。二つが揃って初めて「最良」と言えます。

<!-- proof-start -->
### 証明（無限個の存在）

[三項補題](#lem-nda2-hurwitz-triple)を各 $n\ge2$ に適用します。各三項組に少なくとも一つ $\theta_j<1/\sqrt5$ があります。もしその条件を満たす $j$ が有限個しかなければ、最大の添字を $J$ として $n>J+1$ を選べば三項組 $n-1,n,n+1$ に一つも見つからず矛盾します。したがって添字 $j$ は無限にあります。

[収束分数の差積恒等式と完全商公式](../../NT/NT7/index.md#lem-nt7-convergent-matrix)から各 $p_j/q_j$ は既約であり、$q_j\to\infty$ なので相異なります。$\theta_j=q_j^2|\alpha-p_j/q_j|$ を代入すれば望む厳密不等式になります。定数の最適性は[次節の黄金比の命題](#prop-nda2-golden-sharpness)で示します。
<!-- proof-end -->

## 3. 黄金比が改良を阻む

黄金比 $\varphi=(1+\sqrt5)/2$ は $\varphi^2-\varphi-1=0$ を満たし、$\varphi=1+1/\varphi$ なので

$$
\varphi=[1;1,1,1,\ldots].
$$

したがって部分商は正の添字でずっと $1$ です。これが三項補題で $a\ge2$ の簡単な場合を一度も使えない理由です。

<a id="prop-nda2-golden-sharpness"></a>

<!-- formal-statement-start -->
> **命題（黄金比におけるHurwitz定数の最適性）**  
> $\varphi=(1+\sqrt5)/2$ とする。この数の漸近近似定数は

$$
\lambda(\varphi)=\frac1{\sqrt5}
$$

> である。さらに任意の実数 $0<c<1/\sqrt5$ について、

$$
\left|\varphi-\frac pq\right|<\frac c{q^2},
\qquad p\in\mathbb Z,\ q\in\mathbb Z_{>0}
$$

> を満たす組 $(p,q)$ は有限個しかない。
<!-- formal-statement-end -->

### 証明の見取り図

収束分数の比から $\lambda(\varphi)$ を求めます。全有理数についての最適性は、整数 $p^2-pq-q^2$ が零にならず、絶対値が少なくとも $1$ となることから導きます。収束分数だけを確認して終わらせない点が重要です。

<!-- proof-start -->
### 証明

まず[収束分数の漸化式](../../NT/NT7/index.md#def-nt7-convergent)は黄金比で $q_{n+1}=q_n+q_{n-1}$ となります。$t_n=q_{n-1}/q_n$ とすると

$$
t_{n+1}=\frac1{1+t_n}.
$$

写像 $F(t)=1/(1+t)$ の固定点 $r=1/\varphi$ は $r^2+r=1$ を満たします。また

$
F(F(t))=\frac{1+t}{2+t},\qquad
|F(F(t))-F(F(r))|
=\frac{|t-r|}{(2+t)(2+r)}
\le\frac{|t-r|}{4}
$

が $0<t<1$ について成立します。従って偶数番の $t_n$ は二回ごとに固定点 $r$ との距離が少なくとも $1/4$ 倍以下になり $r$ へ収束します。奇数番も $t_{n+1}=F(t_n)$ と $F$ の連続性から $r$ に収束します。ゆえに $t_n\to1/\varphi$ です。[前章の正規化誤差式](../NDA1/index.md#prop-nda1-exact-error)で完全商がすべて $\varphi$ であることを使うと

$$
\begin{aligned}
\theta_n(\varphi)
&=\frac1{\varphi+q_{n-1}/q_n}\\
&\longrightarrow \frac1{\varphi+1/\varphi}
=\frac1{\sqrt5}.
\end{aligned}
$$

最後は $1/\varphi=\varphi-1$ と $2\varphi-1=\sqrt5$ を用いました。[下極限の収束分数表示](#prop-nda2-liminf-convergents)から $\lambda(\varphi)=1/\sqrt5$ です。

次に**任意の**整数 $p$、正整数 $q$ を考えます。もう一つの根 $\varphi'=(1-\sqrt5)/2$ を用いると

$$
(p-q\varphi)(p-q\varphi')
=p^2-pq-q^2.
$$

右辺は整数であり、もし零なら $p/q$ が無理数 $\varphi$ または $\varphi'$ と一致してしまいます。したがって

$$
1\le |p-q\varphi|\,|p-q\varphi'|.
$$

固定した $c<1/\sqrt5$ に対し、仮に $|\varphi-p/q|<c/q^2$ なら $|p-q\varphi|<c/q$ です。また $\varphi-\varphi'=\sqrt5$ と三角不等式から

$$
\begin{aligned}
|p-q\varphi'|
&=|(p-q\varphi)+q(\varphi-\varphi')|\\
&\le |p-q\varphi|+\sqrt5\,q\\
&<\frac cq+\sqrt5\,q.
\end{aligned}
$$

したがって

$$
1<\frac cq\left(\frac cq+\sqrt5\,q\right)
=c\sqrt5+\frac{c^2}{q^2}.
$$

ここで $c\sqrt5<1$ ですから、$q^2>c^2/(1-c\sqrt5)$ となるほど大きな $q$ では右辺が $1$ 未満となり矛盾します。許される $q$ は有限個であり、その各 $q$ について $|p-q\varphi|<c/q$ を満たす整数 $p$ も有限個です。よって条件を満たす整数組は有限個です。
<!-- proof-end -->

この例では、小さい分母でたまたま $1/\sqrt5$ より良い近似が現れることと、**その改良が無限に続くか**を分ける必要があります。漸近近似定数 $\lambda$ は後者を表します。

## 4. 近似されにくい無理数と部分商の大きさ

近似定数が正なら、どの有理数を持ってきても分母二乗より速く近づくことはできません。一方、[NDA1の正規化誤差式](../NDA1/index.md#prop-nda1-exact-error)によれば、大きな部分商が現れる直前の収束分数は非常に良い近似になります。この対応を必要十分条件へ高めます。

<a id="def-nda2-badly-approximable"></a>

<!-- formal-statement-start -->
> **定義（悪近似数）**  
> 無理数 $\alpha\in\mathbb R$ が悪近似数（badly approximable number）であるとは、ある定数 $C>0$ が存在し、すべての整数 $p$ と正整数 $q$ に対して

$$
\left|\alpha-\frac pq\right|\ge\frac C{q^2}
$$

> が成り立つことをいう。これは近似定数 $c(\alpha)>0$ と同値である。
<!-- formal-statement-end -->

<!-- definition-example-start: def-nda2-badly-approximable -->
**定義の確認**：$\sqrt2=[1;2,2,\ldots]$ の正の添字の部分商はすべて $2$ です。次の定理で証明する評価に $A=2$ を代入すると、すべての整数 $p$ と $q\ge1$ に対し

$$
\left|\sqrt2-\frac pq\right|\ge\frac1{4q^2}
$$

が得られ、確かに定義を満たします。ここで $1/4$ は保証できる定数の一つであり、最大の定数だと主張していません。
<!-- definition-example-end -->

<a id="thm-nda2-bounded-quotients"></a>

<!-- formal-statement-start -->
> **定理（悪近似数と有界部分商の同値）**  
> 無理数 $\alpha=[a_0;a_1,a_2,\ldots]$ に対し、次の二条件は同値である。
>
> 1. $\alpha$ は悪近似数である。
> 2. 正の添字の部分商列 $(a_n)_{n\ge1}$ は有界である。
>
> 特に $1\le a_n\le A$（すべての $n\ge1$）なら、任意の整数 $p$ と正整数 $q$ に対して

$$
\left|\alpha-\frac pq\right|>\frac1{(A+2)q^2}
$$

> が成り立つ。
<!-- formal-statement-end -->

### 証明の見取り図

有界性からの向きは、分母 $q$ を $q_n\le q<q_{n+1}$ に置き、[NT7の第二種最良近似](../../NT/NT7/index.md#thm-nt7-best-approximation)で収束分数へ戻します。逆向きは、大きな次の部分商が近似誤差を零に近づけることを使います。

<!-- proof-start -->
### 証明

**（有界部分商 $\Rightarrow$ 悪近似）** $a_n\le A$（$n\ge1$）を仮定します。任意の $q\ge1$ に対し $q_n\le q<q_{n+1}$ となる $n\ge0$ を選びます。最初の分母が同じ $q_0=q_1=1$ となる場合は $n=1$ を選べばよく、十分後は分母は厳密に増加します。

[NT7の第二種最良近似](../../NT/NT7/index.md#thm-nt7-best-approximation)により、どの整数 $p$ についても

$$
|q\alpha-p|\ge |q_n\alpha-p_n|=e_n.
$$

[前章の完全商による誤差式](../NDA1/index.md#prop-nda1-exact-error)を用いると

$$
\begin{aligned}
e_n
&=\frac1{q_n(\alpha_{n+1}+q_{n-1}/q_n)}\\
&>\frac1{q_n(a_{n+1}+2)}
\ge\frac1{q_n(A+2)}
\ge\frac1{q(A+2)}.
\end{aligned}
$$

二番目の不等式は $0<\alpha_{n+1}-a_{n+1}<1$ と $0\le q_{n-1}/q_n\le1$ から従います。両辺を $q>0$ で割れば

$$
\left|\alpha-\frac pq\right|
=\frac{|q\alpha-p|}{q}
>\frac1{(A+2)q^2}.
$$

従って $C=1/(A+2)$ を選べます。

**（悪近似 $\Rightarrow$ 有界部分商）** 定義より、ある $C>0$ についてすべての収束分数が $\theta_n\ge C$ を満たします。一方、[前章の正規化誤差表示](../NDA1/index.md#prop-nda1-exact-error)によって

$$
C\le\theta_n
=\frac1{\alpha_{n+1}+q_{n-1}/q_n}
<\frac1{a_{n+1}}.
$$

従って $a_{n+1}<1/C$ が全 $n\ge0$ で成立し、正の添字の部分商は有界です。
<!-- proof-end -->

黄金比は部分商がすべて $1$ なので悪近似数です。一方、

$$
\gamma=[0;1,2,3,4,\ldots]
$$

という無限単純連分数は無理数で、正の添字の部分商が無限大へ増えます。このとき $\theta_n(\gamma)<1/a_{n+1}=1/(n+1)$ なので、任意の固定した $C>0$ より小さい正規化誤差が生じ、悪近似数ではありません。これが条件を外した場合の失敗機構です。

**平方根と一般の二次無理数**については、[Lagrangeの最終周期性定理](../NDA1/index.md#thm-nda1-lagrange)から連分数が最終周期的です。したがって部分商は有界であり、すべての実二次無理数は悪近似数です。逆向きは成り立ちません。たとえば部分商を $1$ と $2$ の非最終周期的な順序で並べた数列も有界ですが、[Lagrangeの最終周期性定理](../NDA1/index.md#thm-nda1-lagrange)により、その値は二次無理数ではありません。

## 5. 定数の違いを整理する

いま得た情報を区別すると、次のようになります。

| 問い | 見る量 | 結論 |
| --- | --- | --- |
| どの無理数にも無限に良い近似があるか | 収束分数の $\theta_n$ | Hurwitz定理で $1/\sqrt5$ 未満が無限回 |
| 一つの数に対する漸近的な限界は | $\lambda(\alpha)=\liminf h_\alpha(q)$ | 黄金比では $1/\sqrt5$ |
| **すべての**有理数について一定の下界があるか | $c(\alpha)=\inf h_\alpha(q)$ | 正であることと部分商の有界性が同値 |

$\lambda(\alpha)$ が正なら、十分大きい $q$ に対して $h_\alpha(q)$ は正の下界を持ちます。残る有限個の分母では無理数性から各 $h_\alpha(q)>0$ なので、結局 $c(\alpha)>0$ です。逆に $c(\alpha)>0$ なら当然 $\lambda(\alpha)\ge c(\alpha)>0$ です。従って悪近似性は $\lambda(\alpha)>0$ とも同値ですが、**数値としての $c(\alpha)$ と $\lambda(\alpha)$ は一般に等しくありません**。

## 6. 演習

### Level A：定義と計算

**NDA2-A1（平方根の正規化誤差）**  
$\alpha=\sqrt2$ の収束分数 $7/5$ について $\theta_2$ を正確に求め、$1/\sqrt5$ より小さいことを、部分商 $a_3$ からも確認してください。

- Level: A

<!-- solution-start -->
**詳細解答**

[正規化近似誤差の定義](../NDA1/index.md#def-nda1-normalized-error)を $p_2=7,q_2=5$ に使うと $7/5<\sqrt2$ なので

$$
\theta_2=25\left(\sqrt2-\frac75\right)=25\sqrt2-35.
$$

一方 $\sqrt2=[1;2,2,\ldots]$ より $a_3=2$ であり、$\alpha_3=1+\sqrt2$、$q_1/q_2=2/5$ です。[正規化誤差の完全商表示](../NDA1/index.md#prop-nda1-exact-error)から

$
\theta_2=\frac1{\alpha_3+q_1/q_2}
=\frac1{7/5+\sqrt2}.
$

$\sqrt2>7/5$ は $2>49/25$ から確認でき、さらに $14/5>\sqrt5$ は $196/25>5$ から確認できます。ゆえに

$
0<\theta_2<\frac5{14}<\frac1{\sqrt5}.
$

二つの計算は同じ $\theta_2$ を評価しています。
<!-- solution-end -->

**NDA2-A2（黄金比の小さい分母）**  
$\varphi=(1+\sqrt5)/2$ で、$p/q=2/1$ と $3/2$ の正規化誤差 $q^2|\varphi-p/q|$ を求めて比較してください。

- Level: A

<!-- solution-start -->
**詳細解答**

$3/2<\varphi<2$ は $2<\sqrt5<3$ から確認できます。したがって

$$
\begin{aligned}
1^2\left|\,\varphi-2\,\right|
&=2-\varphi=\frac{3-\sqrt5}2,\\
2^2\left|\,\varphi-\frac32\,\right|
&=4\left(\varphi-\frac32\right)=2\sqrt5-4.
\end{aligned}
$$

前者は約 $0.382$、後者は約 $0.472$ です。一方 $1/\sqrt5$ は約 $0.447$ ですから、一つ目はそれ未満、二つ目はそれ以上です。[黄金比の漸近定数](#prop-nda2-golden-sharpness)は、全ての分母で毎回同じ側になるという意味ではありません。
<!-- solution-end -->

**NDA2-A3（有界部分商から下界）**  
$\alpha=[0;3,1,3,1,\ldots]$ に対し、定理からすべての整数 $p$、$q\ge1$ に使える正の定数 $C$ を一つ求めてください。

- Level: A

<!-- solution-start -->
**詳細解答**

全ての正の添字の部分商は $1$ または $3$ ですから $A=3$ と取れます。[有界部分商の定理](#thm-nda2-bounded-quotients)へ代入すると

$$
\left|\alpha-\frac pq\right|
>\frac1{(3+2)q^2}=\frac1{5q^2}.
$$

従って $C=1/5$ でよいことが分かります。正の添字を見ているので $a_0=0$ を上限に数えません。
<!-- solution-end -->

**NDA2-A4（無界部分商の影響）**  
$\gamma=[0;1,2,3,4,\ldots]$ の第 $n$ 収束分数について、$\theta_n(\gamma)\to0$ を示し、悪近似数でないことを結論してください。

- Level: A

<!-- solution-start -->
**詳細解答**

この連分数は正の部分商が $a_{n+1}=n+1$ と無限大へ進む無限単純連分数なので無理数を表します。[完全商による正規化誤差表示](../NDA1/index.md#prop-nda1-exact-error)を使えば

$$
0<\theta_n(\gamma)
<\frac1{a_{n+1}}=\frac1{n+1}\longrightarrow0.
$$

任意の $C>0$ に対し $n+1>1/C$ と取れば $\theta_n<C$ です。したがって[悪近似数の定義](#def-nda2-badly-approximable)に必要な全分母一様の正の下界は存在しません。
<!-- solution-end -->

### Level B：証明を自力で再構成する

**NDA2-B1（三項の誤差）**  
収束分数の $e_n=|q_n\alpha-p_n|$ を用い、$e_{n-1}=a_{n+1}e_n+e_{n+1}$ と $e_{n+1}/e_n=1/\alpha_{n+2}$ から、$\theta_{n-1},\theta_n,\theta_{n+1}$ の三式を導出してください。

- Level: B

<!-- solution-start -->
**詳細解答**

$a=a_{n+1}$、$t=q_{n-1}/q_n$、$s=1/\alpha_{n+2}$ とします。仮定から $e_{n+1}=s e_n$、$e_{n-1}=(a+s)e_n$ です。さらに[収束分数の誤差の完全商表示](../NDA1/index.md#prop-nda1-exact-error)を $\alpha_{n+1}=a+s$ に適用すると

$$
e_n=\frac1{q_n\alpha_{n+1}+q_{n-1}}
=\frac1{q_n(a+t+s)}.
$$

分母の漸化式は $q_{n+1}=a q_n+q_{n-1}=q_n(a+t)$ です。よって

$$
\begin{aligned}
q_{n-1}e_{n-1}&=tq_n(a+s)e_n=\frac{t(a+s)}{a+t+s},\\
q_ne_n&=\frac1{a+t+s},\\
q_{n+1}e_{n+1}&=(a+t)q_nse_n=\frac{s(a+t)}{a+t+s}.
\end{aligned}
$$

これで[三項公式](#lem-nda2-three-errors)が得られます。絶対値を外す際には、収束分数の符号付き誤差が交互符号であることを使っています。
<!-- solution-end -->

**NDA2-B2（黄金比の整数ノルム）**  
$0<c<1/\sqrt5$ を固定します。黄金比 $\varphi$ に対して $|\varphi-p/q|<c/q^2$ を満たす組は有限個であることを、$p^2-pq-q^2$ を利用して示してください。

- Level: B

<!-- solution-start -->
**詳細解答**

$\varphi'=(1-\sqrt5)/2$ とすると

$$
(p-q\varphi)(p-q\varphi')=p^2-pq-q^2.
$$

右辺は零ではない整数です。零なら有理数 $p/q$ が $\varphi$ または $\varphi'$ に等しくなり、無理数性に反するためです。よって絶対値は少なくとも $1$ です。

近似条件から $|p-q\varphi|<c/q$ であり、

$$
|p-q\varphi'|
\le|p-q\varphi|+q|\varphi-\varphi'|
<\frac cq+\sqrt5\,q.
$$

これらを掛ければ

$$
1< c\sqrt5+\frac{c^2}{q^2}.
$$

ところが $1-c\sqrt5>0$ なので、これは $q^2<c^2/(1-c\sqrt5)$ を強制します。分母 $q$ は有限個です。各 $q$ に対して許される $p$ も $|p-q\varphi|<c/q$ により有限個です。したがって整数組は有限個です。
<!-- solution-end -->

**NDA2-B3（分母区間の最小値）**  
無理数 $\alpha$ の収束分数について、$q_n\le q<q_{n+1}$ なら $h_\alpha(q)\ge\theta_n$ を示してください。そこから $\lambda(\alpha)=\liminf_n\theta_n$ を導いてください。

- Level: B

<!-- solution-start -->
**詳細解答**

[NT7の第二種最良近似](../../NT/NT7/index.md#thm-nt7-best-approximation)は任意の整数 $p$ に対して

$$
|q\alpha-p|\ge |q_n\alpha-p_n|=e_n
$$

を与えます。$q\ge q_n$ を掛け合わせると

$$
q|q\alpha-p|\ge qe_n\ge q_ne_n=\theta_n.
$$

$p$ で最小化しても右辺は変わりません。従って $h_\alpha(q)\ge\theta_n$ です。$q_n\to\infty$ なので、$q\to\infty$ なら区間の添字 $n\to\infty$ となります。これで $\liminf_q h_\alpha(q)\ge\liminf_n\theta_n$ です。逆向きは $q=q_n$ として $h_\alpha(q_n)=\theta_n$ を使います。両向きを合わせて等式が得られます。
<!-- solution-end -->

**NDA2-B4（悪近似性の両方向）**  
部分商に上限 $A$ があるときの全有理数への下界を示し、逆に悪近似定数 $C>0$ があるとき、全ての $a_{n+1}<1/C$ を導いてください。

- Level: B

<!-- solution-start -->
**詳細解答**

任意の $q$ に対し $q_n\le q<q_{n+1}$ を選びます。[第二種最良近似](../../NT/NT7/index.md#thm-nt7-best-approximation)を適用すると、整数 $p$ について

$$
|q\alpha-p|\ge e_n
=\frac1{q_n(\alpha_{n+1}+q_{n-1}/q_n)}
>\frac1{q_n(A+2)}
\ge\frac1{q(A+2)}.
$$

$|q\alpha-p|=q|\alpha-p/q|$ で割れば $C=1/(A+2)$ が使えます。逆にすべての有理数で $\left|\alpha-p/q\right|\ge C/q^2$ なら、$p=p_n,q=q_n$ でも $\theta_n\ge C$ です。[正規化誤差の完全商表示](../NDA1/index.md#prop-nda1-exact-error)から

$$
C\le\theta_n=\frac1{\alpha_{n+1}+q_{n-1}/q_n}<\frac1{a_{n+1}}.
$$

ゆえに $a_{n+1}<1/C$ となります。存在する定数 $C$ と最適な定数 $c(\alpha)$ を混同する必要はありません。
<!-- solution-end -->

### Level C：定数の普遍性と個別性

**NDA2-C1（黄金比の平行移動と最良定数）**  
整数 $m$ に対し $\alpha_m=m+\varphi$、$\varphi=(1+\sqrt5)/2$ と置きます。次をすべて証明してください。(i) $\alpha_m$ は悪近似数である。(ii) $\lambda(\alpha_m)=1/\sqrt5$ である。(iii) 任意の $0<c<1/\sqrt5$ について $|\alpha_m-p/q|<c/q^2$ を満たす整数組は有限個である。(iv) これがHurwitzの定数を普遍的に改良できない理由を述べてください。

- Level: C

<!-- solution-start -->
**詳細解答**

(i) $\varphi=[1;1,1,\ldots]$ なので、整数 $m$ を足した $\alpha_m$ は整数部分だけを変え、

$$
\alpha_m=[m+1;1,1,\ldots]
$$

となります。正の添字の部分商はすべて $1$ です。[有界部分商の定理](#thm-nda2-bounded-quotients)に $A=1$ を代入すると

$$
\left|\alpha_m-\frac pq\right|>\frac1{3q^2}
$$

が全ての整数 $p,q\ge1$ に成立します。ゆえに悪近似数です。

(ii) 任意の整数 $p$、正整数 $q$ に対し $r=p-mq$ と置きます。$r$ は整数で、この対応は固定した $q$ ごとに整数全体の全単射です。よって

$$
\begin{aligned}
h_{\alpha_m}(q)
&=q\min_p|q(m+\varphi)-p|\\
&=q\min_r|q\varphi-r|
=h_\varphi(q).
\end{aligned}
$$

両辺で $q\to\infty$ の下極限を取れば、[黄金比の漸近定数](#prop-nda2-golden-sharpness)から

$$
\lambda(\alpha_m)=\lambda(\varphi)=\frac1{\sqrt5}.
$$

(iii) 近似条件を同じ $r=p-mq$ で書き換えると

$$
\left|m+\varphi-\frac pq\right|
=\left|\varphi-\frac rq\right|<\frac c{q^2}.
$$

[黄金比の最適性](#prop-nda2-golden-sharpness)から許される $(r,q)$ は有限個であり、$(p,q)=(r+mq,q)$ も有限個です。

(iv) [Hurwitzの定理](#thm-nda2-hurwitz)は全ての無理数について $1/\sqrt5$ の係数を保証します。しかし (iii) は任意の $c<1/\sqrt5$ に対し、具体的な無理数 $\alpha_m$ ではその係数による近似は有限個しか存在しないと示しました。したがって普遍係数を小さくすることはできません。悪近似性という個別の下界と、無限個の上からの近似を同時に議論できる例です。
<!-- solution-end -->

## まとめ

[一次元Dirichlet近似](../../NT/NT7/index.md#lem-nt7-dirichlet-approximation)の係数 $1$ は、収束分数の三項構造を利用するとすべての無理数に共通して $1/\sqrt5$ まで改良できます。黄金比の整数ノルムが、それより小さな普遍係数の可能性を阻みます。一方で、特定の数がどれほど近似されにくいかは部分商の有界性で完全に判定できます。この一変数の理解を、次章では整数格子と同時近似へ拡張します。
