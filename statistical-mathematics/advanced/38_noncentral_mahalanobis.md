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

### 1・2. 白色化と非心度

$\Sigma^{-1/2}$ を対称平方根の逆行列とし

$$
Z=\Sigma^{-1/2}(X-a)
$$

と置く。正規分布の線形変換から

$$
Z\sim N_p(\delta,I),
\qquad
\delta=\Sigma^{-1/2}(\mu-a).
$$

共分散が $I$ の多変量正規なので $Z_1,\ldots,Z_p$ は独立で $Z_j\sim N(\delta_j,1)$。また

$$
Q=(X-a)^T\Sigma^{-1}(X-a)=Z^TZ=\sum_{j=1}^pZ_j^2.
$$

非心カイ二乗分布 $\chi_p^2(\lambda)$ は、このような独立な $N(\delta_j,1)$ の平方和で、非心度 $\lambda=\sum\delta_j^2$ と定義される。従って

$$
\boxed{Q\sim\chi_p^2(\lambda)},
$$

$$
\begin{aligned}
\lambda
&=\delta^T\delta\\
&=(\mu-a)^T\Sigma^{-1}(\mu-a).
\end{aligned}
$$

### 3. 平均と分散

$Z_j\sim N(\delta_j,1)$ について

$$
E[Z_j^2]=1+\delta_j^2.
$$

さらに正規4次モーメント

$$
E[Z_j^4]=3+6\delta_j^2+\delta_j^4
$$

から

$$
\begin{aligned}
Var(Z_j^2)
&=E[Z_j^4]-E[Z_j^2]^2\\
&=3+6\delta_j^2+\delta_j^4-(1+\delta_j^2)^2\\
&=2+4\delta_j^2.
\end{aligned}
$$

独立な平方の和なので

$$
\begin{aligned}
E[Q]
&=\sum_j(1+\delta_j^2)=\boxed{p+\lambda},\\
Var(Q)
&=\sum_j(2+4\delta_j^2)=\boxed{2(p+2\lambda)}.
\end{aligned}
$$

### 4. 中心ケース

$a=\mu$ なら $\delta=0$, $\lambda=0$ なので

$$
\boxed{Q\sim\chi_p^2}.
$$

## 本番答案

$Z=\Sigma^{-1/2}(X-a)$ と置くと

$$
Z\sim N_p(\delta,I),
\quad
\delta=\Sigma^{-1/2}(\mu-a),
\quad
Q=\sum_jZ_j^2.
$$

従って定義から $Q\sim\chi_p^2(\lambda)$ で

$$
\lambda=\sum_j\delta_j^2=(\mu-a)^T\Sigma^{-1}(\mu-a).
$$

各 $Z_j$ について $E[Z_j^2]=1+\delta_j^2$, $Var(Z_j^2)=2+4\delta_j^2$ なので

$$
E[Q]=p+\lambda,
\qquad
Var(Q)=2(p+2\lambda).
$$

$a=\mu$ なら $\lambda=0$。

## 採点基準

- 白色化: 5点
- 分布同定: 5点
- 非心度: 4点
- 平均・分散の導出: 4点
- 中心化特例: 2点
