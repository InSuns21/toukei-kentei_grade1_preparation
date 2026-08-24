# 基本命題と主要定理

## P3-THM-01 母関数とモーメント

確率母関数（probability generating function; PGF）は$G_X(s)=E[s^X]$である。以下では$q=1-p$とする。母数範囲はBernoulliで$0\leq p\leq1$、二項で$n\in\mathbb N$かつ$0\leq p\leq1$、幾何で$0<p\leq1$、負の二項で$r\in\mathbb N$かつ$0<p\leq1$、Poissonで$\lambda>0$である。以下の分布の確率質量関数は`02_definitions.md`に加え、この表の直後にもまとめる。

| 分布 | PGF | 平均 | 分散 |
|---|---|---:|---:|
| Bernoulli$(p)$ | $q+ps$ | $p$ | $pq$ |
| Bin$(n,p)$ | $(q+ps)^n$ | $np$ | $npq$ |
| Geom$(p)$ | $ps/(1-qs)$ | $1/p$ | $q/p^2$ |
| NegBin$(r,p)$ | $\{ps/(1-qs)\}^r$ | $r/p$ | $rq/p^2$ |
| Poisson$(\lambda)$ | $\exp\{\lambda(s-1)\}$ | $\lambda$ | $\lambda$ |

$$
\begin{aligned}
X\sim\operatorname{Bernoulli}(p)&:\quad P(X=0)=q,\quad P(X=1)=p,\\
X\sim\operatorname{Bin}(n,p)&:\quad P(X=k)=\binom nkp^kq^{n-k},&&0\leq k\leq n,\\
X\sim\operatorname{Geom}(p)&:\quad P(X=k)=q^{k-1}p,&&k\geq1,\\
X\sim\operatorname{NegBin}(r,p)&:\quad P(X=k)=\binom{k-1}{r-1}p^rq^{k-r},&&k\geq r,\\
X\sim\operatorname{Poisson}(\lambda)&:\quad P(X=k)=e^{-\lambda}\frac{\lambda^k}{k!},&&k\in\mathbb N_0.
\end{aligned}
$$

P2-THM-08より、PGF $G$ に対して
$$
E[X]=G'(1),\qquad
\operatorname{Var}(X)=G''(1)+G'(1)-\{G'(1)\}^2
$$
です。各PMFから順に計算します。

Bernoulliでは $G(s)=q+ps$ なので $G'(1)=p$, $G''(1)=0$ です。二項分布では二項定理から
$$
G(s)=\sum_{k=0}^n\binom nk(ps)^kq^{n-k}=(q+ps)^n.
$$
従って $G'(1)=np$、$G''(1)=n(n-1)p^2$ であり、分散式へ代入すると $npq$ です。

幾何分布では
$$
G(s)=\sum_{k=1}^{\infty}q^{k-1}p s^k
=ps\sum_{j=0}^{\infty}(qs)^j
=\frac{ps}{1-qs},\quad
G'(s)=\frac{p}{(1-qs)^2},\quad
G''(s)=\frac{2pq}{(1-qs)^3}.
$$
$1-q=p$ を代入すると平均 $1/p$、分散 $q/p^2$ です。負の二項分布では $j=k-r$ と置き、負の二項級数から
$$
G(s)=(ps)^r\sum_{j=0}^{\infty}\binom{j+r-1}{r-1}(qs)^j
=\left(\frac{ps}{1-qs}\right)^r.
$$
これは独立な$r$個の幾何待ち時間のPGFの積です。従って平均と分散の加法性により $E[T]=r/p$, $\operatorname{Var}(T)=rq/p^2$ となります。

Poisson分布では指数級数から
$$
G(s)=e^{-\lambda}\sum_{k=0}^{\infty}\frac{(\lambda s)^k}{k!}
=e^{\lambda(s-1)}.
$$
$G'(s)=\lambda G(s)$、$G''(s)=\lambda^2G(s)$ かつ $G(1)=1$ なので、平均・分散はいずれも $\lambda$ です。

## P3-THM-02 再生性

独立な $X_i\sim\operatorname{Bin}(n_i,p)$ なら $\sum_iX_i\sim\operatorname{Bin}(\sum_i n_i,p)$。独立な $Y_i\sim\operatorname{Poisson}(\lambda_i)$ なら $\sum_iY_i\sim\operatorname{Poisson}(\sum_i\lambda_i)$ です。

### 証明

独立和のPGFは積です。二項では $\prod_i(q+ps)^{n_i}=(q+ps)^{\sum_i n_i}$、Poissonでは $\prod_i e^{\lambda_i(s-1)}=e^{(\sum_i\lambda_i)(s-1)}$。PGFの係数がPMFを一意に定めるので結論を得ます。

## P3-THM-03 超幾何分布の平均・分散

$X\sim\operatorname{Hypergeom}(N,K,n)$、$N>1$、$p=K/N$ なら
$$
E[X]=np,\qquad
\operatorname{Var}(X)=np(1-p)\frac{N-n}{N-1}.
$$

非復元抽出の指示変数を $I_j$ とすると $X=\sum_{j=1}^nI_j$、$E[I_j]=p$ です。$i\neq j$ では
$$
E[I_iI_j]=\frac{K(K-1)}{N(N-1)},\qquad
\operatorname{Cov}(I_i,I_j)=-\frac{p(1-p)}{N-1}.
$$
従って分散和へ代入すると
$$
\begin{aligned}
\operatorname{Var}(X)
&=np(1-p)+n(n-1)\left\{-\frac{p(1-p)}{N-1}\right\}\\
&=np(1-p)\left(1-\frac{n-1}{N-1}\right)\\
&=np(1-p)\frac{N-n}{N-1}
\end{aligned}
$$
を得ます。

## P3-THM-04 多項分布の共分散

$\boldsymbol X\sim\operatorname{Multinomial}(n;p_1,\ldots,p_m)$ なら
$$
E[X_i]=np_i,\quad \operatorname{Var}(X_i)=np_i(1-p_i),\quad
\operatorname{Cov}(X_i,X_j)=-np_ip_j\qquad(i\neq j).
$$

第$t$試行がカテゴリ$i$へ入る指示変数を$I_{ti}$とすると、$X_i=\sum_{t=1}^n I_{ti}$です。従って
$$
E[X_i]=\sum_{t=1}^nE[I_{ti}]=np_i,
\qquad
\operatorname{Var}(X_i)=\sum_{t=1}^n\operatorname{Var}(I_{ti})=np_i(1-p_i).
$$
$i\neq j$ のとき、同一試行では $I_{ti}I_{tj}=0$ なので
$$
\operatorname{Cov}(I_{ti},I_{tj})=0-p_ip_j=-p_ip_j.
$$
異なる試行の指示変数は独立で共分散が0です。従って
$$
\operatorname{Cov}(X_i,X_j)
=\sum_{t=1}^n\operatorname{Cov}(I_{ti},I_{tj})
=-np_ip_j.
$$
