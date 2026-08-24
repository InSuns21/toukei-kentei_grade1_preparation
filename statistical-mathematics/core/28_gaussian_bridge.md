# Core 35 正規部分和・条件付き分布・Gaussian bridge

- 旧No.: 28
- 演習価値: A
- 難度: A
- 目安時間: 20分
- 手計算監査: ◎

## 問題

$X_i\overset{\mathrm{iid}}\sim N(\mu,\sigma^2)$ とし

$$
S_k=\sum_{i=1}^kX_i,
\qquad
S_n=\sum_{i=1}^nX_i,
\qquad k<n
$$

とする。

1. $(S_k,S_n)$の平均・分散・共分散を求めよ。
2. $S_k\mid S_n=s$の分布を求めよ。
3. 条件付き平均に$\mu$が現れない理由を式から確認せよ。
4. $k=n/2$のとき条件付き分散を簡単化せよ。

## 詳細解答

線形結合なので$(S_k,S_n)$は2変量正規で

$$
E[S_k]=k\mu,
\quad
E[S_n]=n\mu,
$$

$$
Var(S_k)=k\sigma^2,
\quad
Var(S_n)=n\sigma^2,
$$

$$
Cov(S_k,S_n)=k\sigma^2.
$$

従って

$$
\begin{aligned}
E[S_k\mid S_n=s]
&=k\mu+\frac{k\sigma^2}{n\sigma^2}(s-n\mu)\\
&=\boxed{\frac{k}{n}s}.
\end{aligned}
$$

条件付き分散は

$$
\begin{aligned}
Var(S_k\mid S_n)
&=k\sigma^2-\frac{(k\sigma^2)^2}{n\sigma^2}\\
&=\boxed{\frac{k(n-k)}{n}\sigma^2}.
\end{aligned}
$$

したがって

$$
\boxed{
S_k\mid S_n=s
\sim N\left(
\frac{k}{n}s,
\frac{k(n-k)}{n}\sigma^2
\right)
}.
$$

$k=n/2$なら分散は$n\sigma^2/4$。

## 本番答案

$$
Var(S_k)=k\sigma^2,
\quad Var(S_n)=n\sigma^2,
\quad Cov(S_k,S_n)=k\sigma^2.
$$

条件付き正規公式より

$$
S_k\mid S_n=s
\sim N\left(
\frac{k}{n}s,
\frac{k(n-k)}{n}\sigma^2
\right).
$$

$k=n/2$では条件付き分散$n\sigma^2/4$。

## 採点基準

- 同時モーメント: 6点
- 条件付き平均: 5点
- 条件付き分散: 5点
- $k=n/2$・解釈: 4点
