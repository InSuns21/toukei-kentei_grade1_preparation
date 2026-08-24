# Core 21 2標本Poisson率を条件付き二項検定へ

- 旧No.: 71
- 演習価値: S
- 難度: A
- 目安時間: 20分
- 手計算監査: ◎・修正済（小さい尾確率）

## 問題

独立に

$$
X_i\sim\operatorname{Poisson}(\lambda),\quad i=1,\ldots,n,
$$

$$
Y_j\sim\operatorname{Poisson}(\mu),\quad j=1,\ldots,m
$$

とする。$S=\sum X_i,T=\sum Y_j,K=S+T$とおく。

1. $S,T$の分布を求めよ。
2. $H_0:\lambda=\mu$の下で$S\mid K=k$の分布を求めよ。
3. $H_1:\lambda>\mu$に対する正確検定のP値を表せ。
4. $n=m$、$k=10$、観測$s=8$のときP値を手計算せよ。

## 詳細解答

Poissonの再生性より

$$
S\sim\operatorname{Poisson}(n\lambda),
\qquad
T\sim\operatorname{Poisson}(m\mu),
$$

かつ独立。

独立Poisson変数の和で条件付けると二項分布になるので

$$
S\mid K=k
\sim\operatorname{Binomial}\left(
k,
\frac{n\lambda}{n\lambda+m\mu}
\right).
$$

$H_0:\lambda=\mu$では共通母数が消え

$$
\boxed{
S\mid K=k,H_0
\sim\operatorname{Binomial}\left(k,\frac{n}{n+m}\right)
}.
$$

片側対立$\lambda>\mu$では大きい$S$が対立寄りなので

$$
p=P_{H_0}(S\ge s\mid K=k).
$$

$n=m,k=10,s=8$なら$p=1/2$で

$$
\begin{aligned}
p
&=\frac{\binom{10}{8}+\binom{10}{9}+\binom{10}{10}}{2^{10}}\\
&=\frac{45+10+1}{1024}
=\boxed{\frac7{128}}.
\end{aligned}
$$

## 本番答案

$$
S\sim Poi(n\lambda),\quad T\sim Poi(m\mu).
$$

条件付きPoisson分割より

$$
S\mid K=k\sim Bin\left(k,\frac{n\lambda}{n\lambda+m\mu}\right).
$$

$H_0$では

$$
S\mid K=k\sim Bin\left(k,\frac n{n+m}\right),
$$

よって片側P値は$P(S\ge s\mid K=k)$。

$n=m,k=10,s=8$なら

$$
p=(45+10+1)/1024=7/128.
$$

## 採点基準

- $S,T$の分布: 4点
- 条件付き二項: 7点
- P値の方向: 4点
- 数値例: 5点
