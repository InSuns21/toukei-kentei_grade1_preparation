# Core 37 二項からPoisson極限・再生性・正規近似

- 旧No.: 18
- 演習価値: A
- 難度: A
- 目安時間: 20分
- 手計算監査: ◎

## 問題

固定した$\lambda>0$に対し

$$
X_n\sim\operatorname{Binomial}\left(n,\frac\lambda n\right)
$$

とする。

1. 固定した非負整数$k$について$P(X_n=k)$の極限を求めよ。
2. $E[X_n]$と$\operatorname{Var}(X_n)$の極限を求めよ。
3. 独立な$X\sim Poi(\lambda_1)$、$Y\sim Poi(\lambda_2)$について$X+Y$の分布を求めよ。
4. $\lambda$が大きいときPoisson分布を正規近似する標準化を書け。

## 詳細解答

$$
P(X_n=k)
=\binom nk\left(\frac\lambda n\right)^k
\left(1-\frac\lambda n\right)^{n-k}.
$$

固定$k$に対し

$$
\binom nk\frac1{n^k}
=\frac{n(n-1)\cdots(n-k+1)}{k!n^k}
\to\frac1{k!},
$$

また

$$
\left(1-\frac\lambda n\right)^n\to e^{-\lambda},
\qquad
\left(1-\frac\lambda n\right)^{-k}\to1.
$$

従って

$$
\boxed{
P(X_n=k)\to e^{-\lambda}\frac{\lambda^k}{k!}
}.
$$

平均と分散は

$$
E[X_n]=\lambda,
$$

$$
Var(X_n)=\lambda\left(1-\frac\lambda n\right)\to\lambda.
$$

Poissonの確率母関数は

$$
G_X(s)=\exp\{\lambda_1(s-1)\},
\quad
G_Y(s)=\exp\{\lambda_2(s-1)\}.
$$

独立性から積を取ると

$$
G_{X+Y}(s)=\exp\{(\lambda_1+\lambda_2)(s-1)\},
$$

よって

$$
\boxed{X+Y\sim Poi(\lambda_1+\lambda_2)}.
$$

$\lambda$が大きいとき

$$
\boxed{
\frac{X-\lambda}{\sqrt\lambda}\approx N(0,1)
}.
$$

## 本番答案

固定$k$について

$$
\binom nk(\lambda/n)^k(1-\lambda/n)^{n-k}
\to e^{-\lambda}\lambda^k/k!,
$$

したがって$Bin(n,\lambda/n)\Rightarrow Poi(\lambda)$。

$$
E[X_n]=\lambda,
\quad
Var(X_n)\to\lambda.
$$

独立PoissonのPGFの積から

$$
X+Y\sim Poi(\lambda_1+\lambda_2).
$$

大きい$\lambda$では$(X-\lambda)/\sqrt\lambda\approx N(0,1)$。

## 採点基準

- Poisson極限: 8点
- 平均・分散: 4点
- 再生性: 5点
- 正規近似: 3点
