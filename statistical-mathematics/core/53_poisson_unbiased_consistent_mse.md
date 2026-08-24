# Core 43 Poisson母数推定：不偏性・一致性・MSE

- 旧No.: 53
- 演習価値: A
- 難度: B
- 目安時間: 15分
- 手計算監査: ◎

## 問題

$X_i\overset{\mathrm{iid}}\sim Poi(\lambda)$ とし、$\widehat\lambda=\bar X$とする。

1. 不偏性を示せ。
2. 分散とMSEを求めよ。
3. Chebyshevの不等式を使って一致性を示せ。
4. 中心極限定理による漸近分布を求めよ。

## 詳細解答

Poisson分布では$E[X_i]=Var(X_i)=\lambda$。従って

$$
E[\widehat\lambda]=E[\bar X]=\lambda,
$$

よって不偏。

$$
Var(\widehat\lambda)=\frac\lambda n.
$$

不偏なので

$$
\boxed{MSE(\widehat\lambda)=\lambda/n}.
$$

任意の$\varepsilon>0$に対しChebyshevより

$$
P(|\widehat\lambda-\lambda|>\varepsilon)
\le\frac{\lambda}{n\varepsilon^2}\to0.
$$

従って$\widehat\lambda\to_p\lambda$。

CLTより

$$
\boxed{
\sqrt n(\widehat\lambda-\lambda)
\Rightarrow N(0,\lambda)
}.
$$

## 本番答案

$$
E[\bar X]=\lambda,
\quad
Var(\bar X)=\lambda/n,
\quad
MSE=\lambda/n.
$$

Chebyshevより

$$
P(|\bar X-\lambda|>\varepsilon)
\le\lambda/(n\varepsilon^2)\to0,
$$

したがって一致。

$$
\sqrt n(\bar X-\lambda)\Rightarrow N(0,\lambda).
$$

## 採点基準

- 不偏性: 4点
- 分散・MSE: 5点
- 一致性: 6点
- CLT: 5点
