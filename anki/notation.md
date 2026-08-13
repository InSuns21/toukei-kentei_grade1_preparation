# 記法一覧

このファイルをカード教材の記法の正本とする。カード査読では、以下との一致を確認する。

## 確率・分布

- 確率測度は $P$、期待値は $E[X]$、分散は $\operatorname{Var}(X)$、共分散は $\operatorname{Cov}(X,Y)$ とする。
- 指示関数は $\boldsymbol{1}_A$ とする。
- 累積分布関数は $F_X(x)=P(X\le x)$、確率質量関数は $p_X(x)$、確率密度関数は $f_X(x)$ とする。
- 独立同分布標本は $X_1,\ldots,X_n\overset{\mathrm{i.i.d.}}{\sim}P_\theta$ とする。
- 標本平均は $\overline X=n^{-1}\sum_{i=1}^nX_i$、不偏標本分散は $S^2=(n-1)^{-1}\sum_{i=1}^n(X_i-\overline X)^2$ とする。
- 正規分布は $N(\mu,\sigma^2)$ とし、第2引数は分散である。多変量正規分布は $N_p(\boldsymbol\mu,\boldsymbol\Sigma)$ とする。
- Gamma分布は shape-rate 表示 $\operatorname{Gamma}(\alpha,\beta)$ とする。
- 幾何分布の台は $\{1,2,\ldots\}$ とする。

## 収束・推測

- 分布収束は $X_n\xrightarrow{d}X$、確率収束は $X_n\xrightarrow{p}X$ とする。
- 推定量は $\widehat\theta$、尤度は $L(\theta;x)$、対数尤度は $\ell(\theta;x)$ とする。
- 1観測当たりのFisher情報量は $I_1(\theta)$、標本全体は $I_n(\theta)$ とする。
- 帰無仮説は $H_0$、対立仮説は $H_1$、有意水準は $\alpha$ とする。

## 線形代数・時系列

- ベクトルは太字小文字 $\boldsymbol x$、行列は太字大文字 $\boldsymbol X$ とする。
- 転置は $\boldsymbol X^{\mathsf T}$、逆行列は $\boldsymbol X^{-1}$、単位行列は $\boldsymbol I_n$ とする。
- 線形モデルは $\boldsymbol Y=\boldsymbol X\boldsymbol\beta+\boldsymbol\varepsilon$ とし、初出時に次元を示す。
- 自己共分散は $\gamma(h)$、自己相関は $\rho(h)$ とする。

## 表示規則

- インライン数式はドル記号1個、別行数式はドル記号2個で囲む。
- 名前付き分布を問題で使う場合は、日本語名を明記する。台・母数範囲・確率質量関数または密度の正本はこの一覧とし、カードには論点に必要な式と条件だけを再掲する。
- 確率変数は大文字、観測値は小文字で区別する。

## 離散分布

- Bernoulli分布 $\operatorname{Bernoulli}(p)$：台 $\{0,1\}$、$0\le p\le1$、$p_X(x)=p^x(1-p)^{1-x}$。平均 $p$、分散 $p(1-p)$。
- 二項分布 $\operatorname{Binomial}(n,p)$：台 $\{0,1,\ldots,n\}$、$n\in\mathbb N$、$0\le p\le1$、$p_X(x)=\binom nxp^x(1-p)^{n-x}$。平均 $np$、分散 $np(1-p)$。
- Poisson分布 $\operatorname{Poisson}(\lambda)$：台 $\mathbb N_0$、$\lambda>0$、$p_X(x)=e^{-\lambda}\lambda^x/x!$。平均・分散はともに $\lambda$。
- 幾何分布 $\operatorname{Geometric}(p)$：台 $\{1,2,\ldots\}$、$0<p\le1$、$p_X(x)=p(1-p)^{x-1}$。平均 $1/p$、分散 $(1-p)/p^2$。
- 負の二項分布 $\operatorname{NegBin}(r,p)$：$r$ 回目の成功までの試行回数を $X$ とし、台 $\{r,r+1,\ldots\}$、$r\in\mathbb N$、$0<p\le1$、$p_X(x)=\binom{x-1}{r-1}p^r(1-p)^{x-r}$。平均 $r/p$、分散 $r(1-p)/p^2$。
- 超幾何分布：母集団サイズ $N$、成功個体数 $K$ から非復元で $n$ 個抽出した成功数 $X$。$p_X(x)=\binom Kx\binom{N-K}{n-x}/\binom Nn$。台は組合せが定義できる整数、平均 $nK/N$。
- 多項分布 $\operatorname{Multinomial}(n;p_1,\ldots,p_k)$：$x_j\in\mathbb N_0$、$\sum_jx_j=n$、$p_j\ge0$、$\sum_jp_j=1$、確率質量は $n!\prod_jp_j^{x_j}/\prod_jx_j!$。

## 連続分布

- 一様分布 $U(a,b)$：台 $a<x<b$、$a<b$、$f_X(x)=1/(b-a)$。平均 $(a+b)/2$、分散 $(b-a)^2/12$。
- 正規分布 $N(\mu,\sigma^2)$：台 $\mathbb R$、$\mu\in\mathbb R$、$\sigma^2>0$、$f_X(x)=(2\pi\sigma^2)^{-1/2}\exp\{-(x-\mu)^2/(2\sigma^2)\}$。平均 $\mu$、分散 $\sigma^2$。
- 指数分布 $\operatorname{Exp}(\lambda)$：台 $x>0$、rate $\lambda>0$、$f_X(x)=\lambda e^{-\lambda x}$。平均 $1/\lambda$、分散 $1/\lambda^2$。
- Gamma分布 $\operatorname{Gamma}(\alpha,\beta)$：台 $x>0$、shape $\alpha>0$、rate $\beta>0$、$f_X(x)=\beta^\alpha x^{\alpha-1}e^{-\beta x}/\Gamma(\alpha)$。平均 $\alpha/\beta$、分散 $\alpha/\beta^2$。
- Beta分布 $\operatorname{Beta}(a,b)$：台 $0<x<1$、$a,b>0$、$f_X(x)=x^{a-1}(1-x)^{b-1}/B(a,b)$。平均 $a/(a+b)$、分散 $ab/\{(a+b)^2(a+b+1)\}$。
- カイ二乗分布 $\chi^2_\nu$：台 $x>0$、自由度 $\nu>0$、$\operatorname{Gamma}(\nu/2,1/2)$ と同じ分布。平均 $\nu$、分散 $2\nu$。
- Studentの $t$ 分布 $t_\nu$：$Z\sim N(0,1)$、$V\sim\chi^2_\nu$ が独立なら $T=Z/\sqrt{V/\nu}$。台 $\mathbb R$、$\nu>0$、密度 $f_T(t)=\Gamma\{(\nu+1)/2\}[\sqrt{\nu\pi}\Gamma(\nu/2)]^{-1}(1+t^2/\nu)^{-(\nu+1)/2}$。
- $F$ 分布 $F_{\nu_1,\nu_2}$：独立な $U\sim\chi^2_{\nu_1}$、$V\sim\chi^2_{\nu_2}$ に対し $(U/\nu_1)/(V/\nu_2)$。台 $x>0$、$\nu_1,\nu_2>0$、密度 $f_X(x)=B(\nu_1/2,\nu_2/2)^{-1}(\nu_1/\nu_2)^{\nu_1/2}x^{\nu_1/2-1}(1+\nu_1x/\nu_2)^{-(\nu_1+\nu_2)/2}$。
- Cauchy分布 $\operatorname{Cauchy}(x_0,\gamma)$：台 $\mathbb R$、$\gamma>0$、$f_X(x)=\{\pi\gamma[1+((x-x_0)/\gamma)^2]\}^{-1}$。平均・分散は存在しない。
- 対数正規分布：$\log X\sim N(\mu,\sigma^2)$、台 $x>0$。密度は $f_X(x)=\{x\sigma\sqrt{2\pi}\}^{-1}\exp[-(\log x-\mu)^2/(2\sigma^2)]$。
- Weibull分布 $\operatorname{Weibull}(k,\lambda)$：台 $x>0$、shape $k>0$、scale $\lambda>0$、$f_X(x)=(k/\lambda)(x/\lambda)^{k-1}e^{-(x/\lambda)^k}$。
- logistic分布：台 $\mathbb R$、位置 $\mu\in\mathbb R$、scale $s>0$、$F_X(x)=\{1+e^{-(x-\mu)/s}\}^{-1}$、密度 $f_X(x)=e^{-(x-\mu)/s}/[s\{1+e^{-(x-\mu)/s}\}^2]$。
- Pareto分布 $\operatorname{Pareto}(x_m,\alpha)$：台 $x\ge x_m$、$x_m,\alpha>0$、$f_X(x)=\alpha x_m^\alpha/x^{\alpha+1}$。
- Laplace分布 $\operatorname{Laplace}(\mu,b)$：台 $\mathbb R$、$b>0$、$f_X(x)=(2b)^{-1}e^{-|x-\mu|/b}$。
- Rayleigh分布 $\operatorname{Rayleigh}(\sigma)$：台 $x>0$、$\sigma>0$、$f_X(x)=x\sigma^{-2}e^{-x^2/(2\sigma^2)}$。

## 多変量分布

- 多変量正規分布 $N_p(\boldsymbol\mu,\boldsymbol\Sigma)$：台 $\mathbb R^p$、$\boldsymbol\mu\in\mathbb R^p$、$\boldsymbol\Sigma$ は $p\times p$ 正定値対称行列。密度は $(2\pi)^{-p/2}|\boldsymbol\Sigma|^{-1/2}\exp[-(\boldsymbol x-\boldsymbol\mu)^{\mathsf T}\boldsymbol\Sigma^{-1}(\boldsymbol x-\boldsymbol\mu)/2]$。
- 混合分布：潜在変数 $Z$ の確率を $\pi_k$ とすると $f_X(x)=\sum_k\pi_k f_{X\mid Z=k}(x)$、$\pi_k\ge0$、$\sum_k\pi_k=1$。
