# Core 22 Poisson MLE・Fisher情報・信頼区間

- 旧No.: 49
- 演習価値: S
- 難度: A
- 目安時間: 20分
- 手計算監査: 表・○

## 問題

$X_i\overset{\mathrm{iid}}\sim\operatorname{Poisson}(\lambda)$ とする。

1. $\lambda$のMLEを求めよ。
2. Fisher情報量を求めよ。
3. MLEの漸近分布を求めよ。
4. $n=100,\sum X_i=400$のとき、$z_{0.975}=1.96$を用いた95% Wald信頼区間を求めよ。

## 詳細解答

対数尤度は定数を除いて

$$
\ell(\lambda)
=\left(\sum X_i\right)\log\lambda-n\lambda.
$$

スコア方程式から

$$
\boxed{\widehat\lambda=\bar X}.
$$

1標本のスコアは$X/\lambda-1$なので

$$
I_1(\lambda)=\frac1\lambda,
\qquad
I_n(\lambda)=\frac n\lambda.
$$

従って

$$
\sqrt n(\widehat\lambda-\lambda)
\Rightarrow N(0,\lambda),
$$

すなわち

$$
\widehat\lambda\approx N\left(\lambda,\frac\lambda n\right).
$$

数値例では$\widehat\lambda=4$、推定標準誤差は

$$
\sqrt{\widehat\lambda/n}=\sqrt{4/100}=0.2.
$$

従って

$$
\boxed{4\pm1.96\cdot0.2=(3.608,4.392)}.
$$

## 本番答案

$$
\hat\lambda=\bar X,
\qquad
I_n(\lambda)=n/\lambda.
$$

よって

$$
\sqrt n(\hat\lambda-\lambda)\Rightarrow N(0,\lambda).
$$

$n=100,\bar x=4$では$SE=\sqrt{4/100}=0.2$なので

$$
4\pm1.96(0.2)=(3.608,4.392).
$$

## 採点基準

- MLE: 5点
- Fisher情報: 5点
- 漸近分布: 5点
- Wald CI: 5点
