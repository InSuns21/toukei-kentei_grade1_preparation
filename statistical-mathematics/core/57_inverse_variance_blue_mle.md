# Core 18 逆分散重み付き推定・BLUE・MLE・CRLB

- 旧No.: 57
- 演習価値: S
- 難度: A
- 目安時間: 25分
- 手計算監査: ○

## 問題

独立な

$$
X_i\sim N(\mu,\sigma_i^2)
$$

を観測し、$\sigma_i^2$は既知とする。

1. $\sum_iw_iX_i$が不偏となる条件を述べよ。
2. その条件下で分散を最小にする重みを求めよ。
3. この推定量がMLEでもあることを示せ。
4. $(\sigma_1^2,\sigma_2^2,\sigma_3^2)=(1,4,9)$のとき重みと分散を求め、CRLBと一致することを確認せよ。

## 詳細解答

不偏性には

$$
\sum_iw_i=1
$$

が必要十分。分散は

$$
\sum_iw_i^2\sigma_i^2.
$$

Lagrange乗数法で最小化すると

$$
2w_i\sigma_i^2-\lambda=0
$$

より$w_i\propto1/\sigma_i^2$。従って

$$
\boxed{
w_i=\frac{\sigma_i^{-2}}{\sum_j\sigma_j^{-2}}
}.
$$

正規尤度の対数を$\mu$で微分すると

$$
\sum_i\frac{X_i-\mu}{\sigma_i^2}=0,
$$

よってMLEも同じ逆分散重み付き平均。

数値例では

$$
1+\frac14+\frac19=\frac{49}{36}.
$$

したがって

$$
(w_1,w_2,w_3)=\left(\frac{36}{49},\frac9{49},\frac4{49}\right).
$$

最小分散は

$$
\boxed{
\left(\sum_i\sigma_i^{-2}\right)^{-1}=\frac{36}{49}
}.
$$

Fisher情報量も$49/36$なので、その逆数と一致しCRLBを達成する。

## 本番答案

不偏条件は$\sum w_i=1$。分散最小化より

$$
w_i=\frac{1/\sigma_i^2}{\sum_j1/\sigma_j^2}.
$$

正規対数尤度のスコア方程式も同じ重みを与える。

$(1,4,9)$なら

$$
\sum1/\sigma_i^2=49/36,
$$

$$
(w_1,w_2,w_3)=(36,9,4)/49,
\quad
Var(\hat\mu)=36/49.
$$

$I(\mu)=49/36$なのでCRLBと一致。

## 採点基準

- 不偏条件: 3点
- 最適重み: 7点
- MLEとの一致: 5点
- 数値例・CRLB: 5点
