# Advanced 11 位置母数付き指数・非正則2母数MLE

- 旧No.: 51
- 層: Advanced
- 演習価値: A
- 難度: S
- 目安時間: 30分
- 手計算監査: ◎

## 問題

$n\ge2$ とし、$X_1,\ldots,X_n$ は

$$
f(x;\theta,\lambda)
=\lambda e^{-\lambda(x-\theta)}1\{x\ge\theta\},
\qquad \lambda>0
$$

にi.i.d.に従う。

1. 尤度を書け。
2. $(\theta,\lambda)$ のMLEを求めよ。
3. このモデルが通常の正則MLE理論から外れる理由を説明せよ。
4. $X_{(1)}-\theta$ の分布を求めよ。

## 詳細解答

尤度は

$$
L(\theta,\lambda)
=\lambda^n
\exp\left[-\lambda\sum_{i=1}^n(X_i-\theta)\right]
1\{\theta\le X_{(1)}\}.
$$

固定した $\lambda$ では、許される範囲で $\theta$ が大きいほど指数部が大きくなる。従って

$$
\boxed{\widehat\theta=X_{(1)}}.
$$

これを代入すると

$$
\ell(\lambda)
=n\log\lambda-\lambda\sum_i(X_i-X_{(1)}),
$$

よって

$$
\boxed{
\widehat\lambda
=\frac{n}{\sum_i(X_i-X_{(1)})}
}.
$$

支持集合 $[\theta,\infty)$ が母数 $\theta$ に依存し、尤度微分と積分の交換など通常の正則条件が破れる。このため $\widehat\theta$ は通常の $n^{-1/2}$ ではなく $n^{-1}$ スケールで収束する。

$X_i-\theta\sim Exp(\lambda)$ の最小値なので

$$
X_{(1)}-\theta\sim Exp(n\lambda).
$$

従って $n(X_{(1)}-\theta)$ は率 $\lambda$ の指数分布と同分布。

## 本番答案

$$
L=\lambda^n e^{-\lambda\sum(X_i-\theta)}1\{\theta\le X_{(1)}\}.
$$

固定 $\lambda$ で $\theta$ に単調増加なので $\hat\theta=X_{(1)}$。代入後のスコアから

$$
\hat\lambda=n/\sum(X_i-X_{(1)}).
$$

台が $\theta$ に依存する非正則モデル。さらに $X_{(1)}-\theta\sim Exp(n\lambda)$。

## 採点基準

- 尤度: 5点
- $\widehat\theta$: 5点
- $\widehat\lambda$: 5点
- 非正則性・最小値分布: 5点
