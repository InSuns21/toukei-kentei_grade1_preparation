# 定義と記法

以下で $q=1-p$ とします。

## P3-DEF-01 Bernoulli分布と二項分布

$X\sim\operatorname{Bernoulli}(p)$（$0\leq p\leq1$）とは、台 $\{0,1\}$ で $P(X=1)=p$, $P(X=0)=q$ となる分布です。

$X\sim\operatorname{Bin}(n,p)$（$n\in\mathbb N$, $0\leq p\leq1$）とは、台 $\{0,\ldots,n\}$ で
$$
P(X=k)=\binom nkp^kq^{n-k}
$$
となる分布です。

Bernoulliでは $q+p=1$ です。二項分布でも二項定理から
$$
\sum_{k=0}^n\binom nkp^kq^{n-k}=(p+q)^n=1
$$
となり、確率質量関数（probability mass function; PMF）は正規化されています。

## P3-DEF-02 超幾何分布

$N$ 個中 $K$ 個が成功の有限母集団から $n$ 個を非復元抽出した成功数 $X$ は $\operatorname{Hypergeom}(N,K,n)$ に従います。$0\leq K,n\leq N$ で
$$
P(X=k)=\frac{\binom Kk\binom{N-K}{n-k}}{\binom Nn},
$$
$$
\max(0,n-N+K)\leq k\leq\min(n,K).
$$

成功側から$k$個、失敗側から$n-k$個を選ぶ場合を$k$について足すと、全体から$n$個選ぶ場合を尽くします。従ってVandermondeの恒等式より
$$
\sum_k\binom Kk\binom{N-K}{n-k}=\binom Nn,
$$
であり、PMFの総和は1です。和は上記の台にわたります。

## P3-DEF-03 幾何分布と負の二項分布

$X\sim\operatorname{Geom}(p)$（$0<p\leq1$）は初成功までの試行回数で、台 $\{1,2,\ldots\}$、PMFは $P(X=k)=q^{k-1}p$ です。

$T\sim\operatorname{NegBin}(r,p)$（$r\in\mathbb N$, $0<p\leq1$）は $r$ 回目の成功までの試行回数で、台 $\{r,r+1,\ldots\}$、
$$
P(T=k)=\binom{k-1}{r-1}p^rq^{k-r}.
$$

幾何級数と負の二項級数を使うと
$$
\sum_{k=1}^{\infty}q^{k-1}p=\frac{p}{1-q}=1,
$$
$$
\sum_{k=r}^{\infty}\binom{k-1}{r-1}p^rq^{k-r}
=p^r\sum_{j=0}^{\infty}\binom{j+r-1}{r-1}q^j
=p^r(1-q)^{-r}=1.
$$

## P3-DEF-04 Poisson分布

$X\sim\operatorname{Poisson}(\lambda)$（$\lambda>0$）とは、台 $\mathbb N_0$ で
$$
P(X=k)=e^{-\lambda}\frac{\lambda^k}{k!}
$$
となる分布です。

指数級数より
$$
\sum_{k=0}^{\infty}e^{-\lambda}\frac{\lambda^k}{k!}
=e^{-\lambda}e^{\lambda}=1
$$
です。

## P3-DEF-05 多項分布

$m\geq2$, $n\in\mathbb N$ とします。$\boldsymbol X=(X_1,\ldots,X_m)\sim\operatorname{Multinomial}(n;p_1,\ldots,p_m)$ は、$p_i\geq0$, $\sum_ip_i=1$、台 $x_i\in\mathbb N_0$, $\sum_ix_i=n$ で
$$
P(\boldsymbol X=\boldsymbol x)=\frac{n!}{\prod_i x_i!}\prod_{i=1}^mp_i^{x_i}.
$$

多項定理から
$$
\sum_{\substack{x_1,\ldots,x_m\geq0\\x_1+\cdots+x_m=n}}
\frac{n!}{x_1!\cdots x_m!}\prod_{i=1}^mp_i^{x_i}
=(p_1+\cdots+p_m)^n=1
$$
となります。
