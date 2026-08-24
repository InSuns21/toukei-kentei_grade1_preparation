# Advanced 09 非心Mahalanobis二次形式

- 旧No.: 38
- 層: Advanced
- 演習価値: B
- 難度: A
- 目安時間: 20分
- 手計算監査: ◎

## 問題

$X\sim N_p(\mu,\Sigma)$, $\Sigma$ は正定値。固定ベクトル $a$ に対し

$$
Q=(X-a)^T\Sigma^{-1}(X-a)
$$

とする。

1. $Q$ の分布を求めよ。
2. 非心度を求めよ。
3. $E[Q]$, $\operatorname{Var}(Q)$ を求めよ。
4. $a=\mu$ の場合を説明せよ。

## 詳細解答

$$
Z=\Sigma^{-1/2}(X-a)
$$

と置くと

$$
Z\sim N_p(\delta,I),
\qquad
\delta=\Sigma^{-1/2}(\mu-a),
$$

かつ $Q=Z^TZ$。従って

$$
\boxed{Q\sim\chi_p^2(\lambda)},
$$

$$
\boxed{\lambda=\delta^T\delta=(\mu-a)^T\Sigma^{-1}(\mu-a)}.
$$

非心カイ二乗のモーメントより

$$
E[Q]=p+\lambda,
\qquad
Var(Q)=2(p+2\lambda).
$$

$a=\mu$ なら $\lambda=0$ で中心カイ二乗 $\chi_p^2$。

## 本番答案

白色化 $Z=\Sigma^{-1/2}(X-a)$ により $Q=\|Z\|^2$。従って

$$
Q\sim\chi_p^2(\lambda),
\quad
\lambda=(\mu-a)^T\Sigma^{-1}(\mu-a).
$$

平均 $p+\lambda$、分散 $2(p+2\lambda)$。$a=\mu$ なら中心カイ二乗。

## 採点基準

- 白色化: 5点
- 分布同定: 5点
- 非心度: 4点
- 平均・分散: 4点
- 中心化特例: 2点
