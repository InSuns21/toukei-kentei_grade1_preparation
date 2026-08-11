# 分布・略語の入口

このファイルは、本文で分布名や略語を見たときの最初の参照先です。教材本文では日本語名を先に書き、略語だけで説明を始めません。

## 五つの基本用語

| 日本語 | 英語と略語 | 定義 |
|---|---|---|
| 確率質量関数 | probability mass function (PMF) | 離散型で $p_X(x)=P(X=x)$ |
| 確率密度関数 | probability density function (PDF) | 連続型で $P(a<X\leq b)=\int_a^b f_X(x)\,dx$ |
| 累積分布関数 | cumulative distribution function (CDF) | $F_X(x)=P(X\leq x)$ |
| 確率母関数 | probability generating function (PGF) | 非負整数値の $X$ で $G_X(s)=E[s^X]$ |
| モーメント母関数 | moment generating function (MGF) | $M_X(t)=E[e^{tX}]$。有限となる範囲を確認する |

## 主な離散分布

以下では$q=1-p$です。表に書かれていない点での確率は0です。

| 分布 | 母数と台 | 確率質量関数 |
|---|---|---|
| Bernoulli$(p)$ | $0\leq p\leq1$, $k\in\{0,1\}$ | $P(X=0)=1-p$, $P(X=1)=p$ |
| Bin$(n,p)$ | $n\in\mathbb N$, $0\leq p\leq1$, $k=0,\ldots,n$ | $P(X=k)=\binom nkp^kq^{n-k}$ |
| Hypergeom$(N,K,n)$ | $N\in\mathbb N$, $K,n\in\{0,\ldots,N\}$, $\max(0,n-N+K)\leq k\leq\min(n,K)$ | $P(X=k)=\binom Kk\binom{N-K}{n-k}/\binom Nn$ |
| Geom$(p)$ | $0<p\leq1$, $k=1,2,\ldots$ | $P(X=k)=q^{k-1}p$ |
| NegBin$(r,p)$ | $r\in\mathbb N$, $0<p\leq1$, $k=r,r+1,\ldots$ | $P(X=k)=\binom{k-1}{r-1}p^rq^{k-r}$ |
| Poisson$(\lambda)$ | $\lambda>0$, $k\in\mathbb N_0$ | $P(X=k)=e^{-\lambda}\lambda^k/k!$ |
| Multinomial$(n;p_1,\ldots,p_m)$ | $m\geq2$, $n\in\mathbb N$, $p_i\geq0$, $\sum_i p_i=1$; $x_i\in\mathbb N_0$, $\sum_i x_i=n$ | $P(\boldsymbol X=\boldsymbol x)=n!\prod_i p_i^{x_i}/\prod_i x_i!$ |

## 主な連続分布

| 分布 | 母数と台 | 確率密度関数または累積分布関数 |
|---|---|---|
| Unif$(a,b)$ | $a<b$, $a<x<b$ | $f(x)=1/(b-a)$ |
| $N(\mu,\sigma^2)$ | $\mu\in\mathbb R$, $\sigma>0$, $x\in\mathbb R$ | $f(x)=e^{-(x-\mu)^2/(2\sigma^2)}/(\sqrt{2\pi}\sigma)$ |
| Exp$(\lambda)$ | $\lambda>0$, $x>0$ | $f(x)=\lambda e^{-\lambda x}$ |
| Gamma$(\alpha,\beta)$ | $\alpha,\beta>0$, $x>0$ | $f(x)=\beta^\alpha x^{\alpha-1}e^{-\beta x}/\Gamma(\alpha)$ |
| Beta$(\alpha,\beta)$ | $\alpha,\beta>0$, $0<x<1$ | $f(x)=x^{\alpha-1}(1-x)^{\beta-1}/B(\alpha,\beta)$ |
| Cauchy$(x_0,\gamma)$ | $x_0\in\mathbb R$, $\gamma>0$, $x\in\mathbb R$ | $f(x)=1/[\pi\gamma\{1+((x-x_0)/\gamma)^2\}]$ |
| Lognormal$(\mu,\sigma^2)$ | $\mu\in\mathbb R$, $\sigma>0$, $x>0$ | $f(x)=e^{-(\log x-\mu)^2/(2\sigma^2)}/(x\sigma\sqrt{2\pi})$ |
| Weibull$(c,\eta)$ | $c,\eta>0$, $x>0$ | $f(x)=c(x/\eta)^{c-1}e^{-(x/\eta)^c}/\eta$ |
| Logistic$(\mu,s)$ | $\mu\in\mathbb R$, $s>0$, $x\in\mathbb R$ | $F(x)=1/[1+e^{-(x-\mu)/s}]$ |

Gamma分布は形状・率表示です。正規分布の第2引数は分散、幾何分布は初成功までの試行回数です。別の規約を使う問題では、その場で式を明記します。

## 厳密さに関する初等的な読み替え

- 「面積0の例外を除く」とあるとき、有限個の端点や曲線上の値は、密度を積分して得る確率を変えません。
- 密度の独立性判定では、一点だけでなく正の面積をもつ領域で因数分解が崩れることを示します。連続な式なら、一点での不一致がその周囲でも続くことを示せば十分です。
- 測度論の専門語は本教材の前提にしません。必要な場合は、区間・長方形の確率と通常の和・積分で使える形を本文に示します。
