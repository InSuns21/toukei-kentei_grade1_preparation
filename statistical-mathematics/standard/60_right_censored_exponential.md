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
\delta_i=\boldsymbol{1}_{\{T_i\le C_i\}}
$$

である。打切りは寿命と独立とする。

1. $\lambda$ に関する観測尤度を書け。
2. $D=\sum\delta_i$, $R=\sum Y_i$ を使って最尤推定量を求めよ。
3. $D=0$ の場合を説明せよ。

## 詳細解答

### 1. 観測尤度

指数分布の密度と生存関数は

$$
f_T(t)=\lambda e^{-\lambda t},
\qquad
S_T(t)=P(T>t)=e^{-\lambda t}.
$$

$\delta_i=1$ なら時刻 $Y_i$ でイベントを観測したので密度 $f_T(Y_i)$、$\delta_i=0$ なら $Y_i$ まで生存したことだけ分かるので生存関数 $S_T(Y_i)$ が $\lambda$ に関する尤度へ寄与する。従って第 $i$ 観測の寄与は

$$
\{\lambda e^{-\lambda Y_i}\}^{\delta_i}
\{e^{-\lambda Y_i}\}^{1-\delta_i}
=\lambda^{\delta_i}e^{-\lambda Y_i}.
$$

全観測を掛けると

$$
\begin{aligned}
L(\lambda)
&=\prod_{i=1}^n\lambda^{\delta_i}e^{-\lambda Y_i}\\
&=\lambda^{\sum_i\delta_i}e^{-\lambda\sum_iY_i}\\
&=\boxed{\lambda^D e^{-\lambda R}}.
\end{aligned}
$$

### 2. 最尤推定量

対数尤度は

$$
\ell(\lambda)=D\log\lambda-\lambda R.
$$

$D>0$ なら

$$
\ell'(\lambda)=\frac D\lambda-R.
$$

停留条件 $\ell'(\lambda)=0$ から

$$
\widehat\lambda=\frac DR.
$$

さらに

$$
\ell''(\lambda)=-\frac D{\lambda^2}<0
$$

なのでこの停留点は最大点。従って

$$
\boxed{\widehat\lambda=\frac DR},\qquad D>0.
$$

### 3. $D=0$

イベントが1件もないと

$$
L(\lambda)=e^{-\lambda R}.
$$

$R>0$ ならこれは $\lambda>0$ で単調減少する。したがって正の内部最尤推定量は存在せず、母数空間を $\lambda\ge0$ まで閉じれば境界 $\lambda=0$ で最大になる。$\lambda>0$ の開区間だけを母数空間にするなら上限は $\lambda\downarrow0$ で達するが最大値は達成されない。

## 本番答案

各観測の寄与は

$$
[\lambda e^{-\lambda Y_i}]^{\delta_i}
[e^{-\lambda Y_i}]^{1-\delta_i}
=\lambda^{\delta_i}e^{-\lambda Y_i}.
$$

従って

$$
L(\lambda)=\lambda^D e^{-\lambda R},
\quad
\ell(\lambda)=D\log\lambda-\lambda R.
$$

$D>0$ では

$$
\ell'(\lambda)=D/\lambda-R=0
$$

より $\hat\lambda=D/R$、かつ $\ell''(\lambda)=-D/\lambda^2<0$。$D=0$ では尤度は $\lambda$ に単調減少し、正の内部最尤推定量はない。

## 採点基準

- 打切り尤度の構成: 8点
- 集約統計量 $D,R$: 3点
- 最尤推定量（微分・最大性）: 6点
- $D=0$ の境界: 3点
