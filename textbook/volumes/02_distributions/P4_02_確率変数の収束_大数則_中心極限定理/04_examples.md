# 例題

## 例1 ベルヌーイ標本

$X_i\sim\operatorname{Bernoulli}(p)$ なら $\mu=p,\sigma^2=p(1-p)$。従って $\overline X_n\xrightarrow{p}p$、$\sqrt n(\overline X_n-p)/\sqrt{p(1-p)}\xrightarrow{d}N(0,1)$。

## 例2 ポアソン標本

$X_i\sim\operatorname{Poisson}(\lambda)$ なら $\overline X_n$ は平均 $\lambda$、分散 $\lambda/n$。$\sqrt n(\overline X_n-\lambda)/\sqrt\lambda$ は標準正規へ収束する。

## 例3 二項正規近似

$B\sim\operatorname{Bin}(400,0.3)$ とする。$P(B\le130)$ は連続補正により
$$\Phi\left(\frac{130.5-120}{\sqrt{84}}\right)$$
で近似する。
