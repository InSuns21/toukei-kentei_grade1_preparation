# Standard 17 一様分布最大値・不偏推定・分散比較

- 旧No.: 54
- 層: Standard
- 演習価値: A
- 難度: A
- 目安時間: 20分
- 手計算監査: ◎

## 問題

$X_1,\ldots,X_n\overset{iid}\sim U(0,\theta)$ とする。$\bar X$ と $M=X_{(n)}$ から

$$
T_1=2\bar X,
\qquad
T_2=\frac{n+1}{n}M
$$

を考える。

1. 両者が $\theta$ の不偏推定量であることを示せ。
2. 分散を求め比較せよ。
3. なぜ最大値を使う推定量が有利なのか説明せよ。

## 詳細解答

$E[X_i]=\theta/2$, $\operatorname{Var}(X_i)=\theta^2/12$ だから

$$
E[T_1]=\theta,
\qquad
\operatorname{Var}(T_1)=4\frac{\theta^2}{12n}=\frac{\theta^2}{3n}.
$$

一方 $M/\theta\sim Beta(n,1)$ なので

$$
E[M]=\frac n{n+1}\theta,
\qquad
\operatorname{Var}(M)=\frac{n\theta^2}{(n+1)^2(n+2)}.
$$

従って

$$
E[T_2]=\theta,
\qquad
\operatorname{Var}(T_2)=\frac{\theta^2}{n(n+2)}.
$$

$n>1$ なら $1/[n(n+2)]<1/(3n)$ なので $T_2$ の方が小分散。$\theta$ は支持集合の端点を決めるため、最大値が母数情報を強く持つ非正則モデルである。

## 本番答案

$$
E[2\bar X]=\theta,
\quad
\operatorname{Var}(2\bar X)=\frac{\theta^2}{3n}.
$$

また $M/\theta\sim Beta(n,1)$ より

$$
E\left[\frac{n+1}{n}M\right]=\theta,
\quad
\operatorname{Var}\left(\frac{n+1}{n}M\right)=\frac{\theta^2}{n(n+2)}.
$$

従って $n>1$ で最大値型が小分散。

## 採点基準

- $T_1$ の不偏性・分散: 5点
- 最大値分布: 5点
- $T_2$ の不偏性・分散: 6点
- 比較・解釈: 4点
