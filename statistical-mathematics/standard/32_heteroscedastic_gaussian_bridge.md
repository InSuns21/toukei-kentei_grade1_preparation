# Standard 12 不均一分散Gaussian bridge

- 旧No.: 32
- 層: Standard
- 演習価値: A
- 難度: A
- 目安時間: 25分
- 手計算監査: ◎

## 問題

独立に $X_i\sim N(\mu_i,\sigma_i^2)$, $i=1,\ldots,n$ とし $T=\sum_iX_i$ とする。$M=\sum_i\mu_i$, $V=\sum_i\sigma_i^2$ と置く。

1. $X_i\mid T=t$ の平均と分散を求めよ。
2. $i\ne j$ の条件付き共分散を求めよ。
3. 等分散の場合に通常のGaussian bridge公式へ戻ることを確認せよ。

## 詳細解答

$(X_i,T)$ は2変量正規で

$$
\operatorname{Cov}(X_i,T)=\sigma_i^2,
\qquad
\operatorname{Var}(T)=V.
$$

条件付き正規公式より

$$
E[X_i\mid T=t]
=\mu_i+\frac{\sigma_i^2}{V}(t-M),
$$

$$
\operatorname{Var}(X_i\mid T)
=\sigma_i^2-\frac{\sigma_i^4}{V}.
$$

$i\ne j$ では元の共分散が0なので

$$
\operatorname{Cov}(X_i,X_j\mid T)
=-\frac{\sigma_i^2\sigma_j^2}{V}.
$$

全て $\sigma_i^2=\sigma^2$ なら重みは $1/n$ となり、条件付き平均は $\mu_i+(t-M)/n$。同平均なら部分和bridgeの基本形に一致する。

## 本番答案

$$
E[X_i\mid T=t]=\mu_i+\frac{\sigma_i^2}{V}(t-M),
$$

$$
\operatorname{Var}(X_i\mid T)=\sigma_i^2-\frac{\sigma_i^4}{V},
\quad
\operatorname{Cov}(X_i,X_j\mid T)=-\frac{\sigma_i^2\sigma_j^2}{V}.
$$

等分散なら条件付き補正重みは $1/n$。

## 採点基準

- 共分散構造: 5点
- 条件付き平均: 6点
- 条件付き分散・共分散: 6点
- 等分散への帰着: 3点
