# Core 16 二項モデル：十分性・MLE・MSE・縮小

- 旧No.: 43
- 演習価値: S
- 難度: A
- 目安時間: 25分
- 手計算監査: ◎

## 問題

$X_i\overset{\mathrm{iid}}\sim\operatorname{Bernoulli}(p)$、$T=\sum X_i$とする。

1. $T$が$p$の十分統計量であることを示し、MLEを求めよ。
2. $\widehat p=T/n$のMSEを求めよ。
3. 縮小推定量

$$
\widetilde p=\frac{T+1}{n+2}
$$

のバイアス、分散、MSEを求めよ。
4. $p=1/2$で$\widetilde p$と$\widehat p$のMSEを比較せよ。

## 詳細解答

尤度は

$$
L(p)=p^T(1-p)^{n-T},
$$

したがって$T$は十分で、MLEは

$$
\widehat p=T/n.
$$

$T\sim\operatorname{Bin}(n,p)$より

$$
E[\widehat p]=p,
\qquad
\operatorname{Var}(\widehat p)=\frac{p(1-p)}n.
$$

従って

$$
\boxed{MSE(\widehat p)=\frac{p(1-p)}n}.
$$

一方

$$
E[\widetilde p]
=\frac{np+1}{n+2},
$$

よって

$$
\operatorname{Bias}(\widetilde p)
=\frac{1-2p}{n+2}.
$$

分散は

$$
\operatorname{Var}(\widetilde p)
=\frac{np(1-p)}{(n+2)^2}.
$$

したがって

$$
\boxed{
MSE(\widetilde p)
=\frac{np(1-p)+(1-2p)^2}{(n+2)^2}
}.
$$

$p=1/2$ではバイアス0なので

$$
MSE(\widetilde p)=\frac{n}{4(n+2)^2},
$$

$$
MSE(\widehat p)=\frac1{4n}.
$$

比は$n^2/(n+2)^2<1$だから、この点では縮小推定量の方がMSEが小さい。

## 本番答案

$$
L(p)=p^T(1-p)^{n-T}
$$

より$T$は十分、$\hat p=T/n$。

$$
MSE(\hat p)=p(1-p)/n.
$$

$$
Bias(\tilde p)=\frac{1-2p}{n+2},
\quad
Var(\tilde p)=\frac{np(1-p)}{(n+2)^2},
$$

よって

$$
MSE(\tilde p)=\frac{np(1-p)+(1-2p)^2}{(n+2)^2}.
$$

$p=1/2$では$n/[4(n+2)^2]<1/(4n)$。

## 採点基準

- 十分性・MLE: 5点
- MLEのMSE: 4点
- 縮小推定量のbias/variance/MSE: 8点
- $p=1/2$比較: 3点
