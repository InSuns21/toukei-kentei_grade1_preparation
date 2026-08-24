# Advanced 05 射影行列・二次形式・Cochran分解

- 旧No.: 33
- 層: Advanced
- 演習価値: S
- 難度: S
- 目安時間: 30分
- 手計算監査: ◎

## 問題

$X=(X_1,\ldots,X_n)^T\sim N_n(\mu\mathbf1,\sigma^2I)$。$P=\mathbf1\mathbf1^T/n$, $Q=I-P$ とする。

1. $P,Q$ が直交射影であることを示し、ランクを求めよ。
2. $PX$ と $QX$ が独立であることを示せ。
3. $\bar X$ と標本分散 $S^2=(n-1)^{-1}\sum(X_i-\bar X)^2$ の分布を導け。
4. $\bar X$ と $S^2$ の独立性を示せ。

## 詳細解答

$P^T=P$, $P^2=P$ なので射影。$Q^T=Q$, $Q^2=Q$, $PQ=0$。ランクは

$$
\operatorname{rank}(P)=1,
\qquad
\operatorname{rank}(Q)=n-1.
$$

正規ベクトルの線形変換なので $(PX,QX)$ は同時正規。共分散は

$$
\operatorname{Cov}(PX,QX)=\sigma^2PQ=0
$$

だから独立。

$PX=\bar X\mathbf1$ より

$$
\bar X\sim N(\mu,\sigma^2/n).
$$

また

$$
\frac{X^TQX}{\sigma^2}
=\frac{(n-1)S^2}{\sigma^2}
\sim\chi^2_{n-1},
$$

これはランク $n-1$ の直交射影二次形式の結果。$PX\perp QX$ なので $\bar X\perp S^2$。

## 本番答案

$P,Q$ は対称冪等、$PQ=0$、ランク $1,n-1$。正規性と共分散0から $PX\perp QX$。従って

$$
\bar X\sim N(\mu,\sigma^2/n),
\qquad
\frac{(n-1)S^2}{\sigma^2}\sim\chi^2_{n-1},
$$

かつ $\bar X\perp S^2$。

## 採点基準

- 射影・ランク: 5点
- 独立性: 5点
- 平均の分布: 3点
- 二次形式のカイ二乗: 5点
- 平均と分散の独立: 2点
