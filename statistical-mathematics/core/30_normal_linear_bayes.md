# Core 36 正規線形観測・Bayes・条件付き正規

- 旧No.: 30
- 演習価値: A
- 難度: B
- 目安時間: 20分
- 手計算監査: ◎

## 問題

事前分布と観測モデルを

$$
\Theta\sim N(0,\tau^2),
\qquad
Y=\Theta+\varepsilon,
\qquad
\varepsilon\sim N(0,\sigma^2)
$$

とし、$\Theta$と$\varepsilon$は独立とする。

1. $(\Theta,Y)$の共分散行列を求めよ。
2. $\Theta\mid Y=y$の事後分布を求めよ。
3. 二乗損失のBayes推定量を求めよ。
4. $\tau^2=4,\sigma^2=1$のとき事後平均と事後分散を求めよ。

## 詳細解答

$$
Var(\Theta)=\tau^2,
$$

$$
Var(Y)=\tau^2+\sigma^2,
$$

$$
Cov(\Theta,Y)=Cov(\Theta,\Theta+\varepsilon)=\tau^2.
$$

従って

$$
\Sigma=
\begin{pmatrix}
\tau^2&\tau^2\\
\tau^2&\tau^2+\sigma^2
\end{pmatrix}.
$$

条件付き正規公式より

$$
\boxed{
E[\Theta\mid Y=y]
=\frac{\tau^2}{\tau^2+\sigma^2}y
},
$$

$$
\boxed{
Var(\Theta\mid Y)
=\tau^2-\frac{\tau^4}{\tau^2+\sigma^2}
=\frac{\tau^2\sigma^2}{\tau^2+\sigma^2}
}.
$$

二乗損失のBayes推定量は事後平均。

$\tau^2=4,\sigma^2=1$なら

$$
\boxed{E[\Theta\mid Y=y]=\frac45y},
\qquad
\boxed{Var(\Theta\mid Y)=\frac45}.
$$

## 本番答案

$$
Cov(\Theta,Y)=\tau^2,
\quad Var(Y)=\tau^2+\sigma^2.
$$

よって

$$
\Theta\mid Y=y
\sim N\left(
\frac{\tau^2}{\tau^2+\sigma^2}y,
\frac{\tau^2\sigma^2}{\tau^2+\sigma^2}
\right).
$$

二乗損失Bayes推定量は事後平均。$\tau^2=4,\sigma^2=1$では$4y/5$、事後分散$4/5$。

## 採点基準

- 共分散行列: 5点
- 事後平均: 6点
- 事後分散: 5点
- Bayes推定量・数値例: 4点
