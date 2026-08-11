# 定義

累積分布関数（cumulative distribution function; CDF）は $F_X(x)=P(X\le x)$、確率質量関数（probability mass function; PMF）は離散型で $p_X(k)=P(X=k)$ と定義する。標準正規分布は密度
$$\phi(z)=\frac1{\sqrt{2\pi}}e^{-z^2/2},\qquad \Phi(z)=\int_{-\infty}^z\phi(u)\,du$$
をもつ。

$X_n$ が $X$ に確率収束するとは、任意の $\varepsilon>0$ で
$$P(|X_n-X|>\varepsilon)\to0$$
となること（$X_n\xrightarrow{p}X$）。概収束は $P(\lim_{n\to\infty}X_n=X)=1$、分布収束は任意のCDFの連続点 $x$ で $F_{X_n}(x)\to F_X(x)$ と定義する。

確率収束は分布収束を含意する。概収束は確率収束を含意するが、逆は一般には成り立たない。

独立同分布標本 $X_1,\ldots,X_n$ の標本平均を $\overline X_n=n^{-1}\sum_iX_i$ と書く。母平均 $\mu=E[X_1]$、母分散 $\sigma^2=\operatorname{Var}(X_1)$ とし、$0<\sigma^2<\infty$ を必要に応じて仮定する。

標準化変数は $Z_n=\sqrt n(\overline X_n-\mu)/\sigma$。標準正規分布のCDFを $\Phi$ と書く。

$X\sim\operatorname{Bernoulli}(p)$ は $P(X=1)=p,P(X=0)=1-p$、$X\sim\operatorname{Bin}(n,p)$ は
$$P(X=k)=\binom nkp^k(1-p)^{n-k}\quad(k=0,\ldots,n),$$
$X\sim\operatorname{Poisson}(\lambda)$ は
$$P(X=k)=e^{-\lambda}\lambda^k/k!\quad(k\in\mathbb N_0).$$

デルタ法とは、$Z_n=\sqrt n(\hat\theta_n-\theta)\xrightarrow dN(0,V)$ かつ $g$ が $\theta$ で微分可能なら
$$\sqrt n\{g(\hat\theta_n)-g(\theta)\}\xrightarrow dN(0,[g'(\theta)]^2V)$$
とする一次テイラー近似である。

最尤推定量（maximum likelihood estimator; MLE）は観測データの尤度を最大にする値である。漸近95%区間は、漸近標準誤差 $\operatorname{se}(\hat\theta)$ を用いて $\hat\theta\pm1.96\operatorname{se}(\hat\theta)$ とする。
