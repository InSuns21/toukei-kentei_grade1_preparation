# Standard 20 右打切り指数寿命・観測尤度

- 旧No.: 60
- 層: Standard
- 演習価値: A
- 難度: A
- 目安時間: 20分
- 手計算監査: ◎

## 問題

寿命 $T_i\sim Exp(\lambda)$。各個体には打切り時刻 $C_i$ があり、観測は

$$
Y_i=\min(T_i,C_i),
\qquad
\delta_i=1\{T_i\le C_i\}
$$

である。打切りは寿命と独立とする。

1. $\lambda$ に関する観測尤度を書け。
2. $D=\sum\delta_i$, $R=\sum Y_i$ を使ってMLEを求めよ。
3. $D=0$ の場合を説明せよ。

## 詳細解答

イベント観測では密度 $\lambda e^{-\lambda Y_i}$、打切りでは生存関数 $e^{-\lambda Y_i}$ が寄与する。従って

$$
L(\lambda)
=\prod_i\lambda^{\delta_i}e^{-\lambda Y_i}
=\lambda^D e^{-\lambda R}.
$$

対数尤度は

$$
\ell(\lambda)=D\log\lambda-\lambda R.
$$

$D>0$ なら

$$
\boxed{\widehat\lambda=D/R}.
$$

$D=0$ では $L(\lambda)=e^{-\lambda R}$ は $\lambda\downarrow0$ で最大となり、正の内部MLEは存在しない。

## 本番答案

各観測の寄与は $[\lambda e^{-\lambda Y_i}]^{\delta_i}[e^{-\lambda Y_i}]^{1-\delta_i}$。従って

$$
L(\lambda)=\lambda^D e^{-\lambda R},
\quad
\widehat\lambda=D/R
$$

ただし $D>0$。$D=0$ では境界 $\lambda=0$ 側へ最大化される。

## 採点基準

- 打切り尤度の構成: 8点
- 集約統計量 $D,R$: 3点
- MLE: 6点
- $D=0$ の境界: 3点
