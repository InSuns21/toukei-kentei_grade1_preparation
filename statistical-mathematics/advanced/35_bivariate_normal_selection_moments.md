# Advanced 07 2変量正規・選択後モーメント

- 旧No.: 35
- 層: Advanced
- 演習価値: B
- 難度: A
- 目安時間: 25分
- 手計算監査: 表

## 問題

$(X,Y)$ は平均0、分散1、相関 $\rho$ の2変量正規分布。$X>a$ の個体だけを選択する。$\lambda(a)=\phi(a)/(1-\Phi(a))$ とする。

1. $E[Y\mid X>a]$ を求めよ。
2. $\operatorname{Var}(Y\mid X>a)$ を求めよ。
3. $\operatorname{Cov}(X,Y\mid X>a)$ を求めよ。
4. 選択が相関構造を変える理由を説明せよ。

## 詳細解答

2変量正規は

$$
Y=\rho X+\sqrt{1-\rho^2}\,\varepsilon,
\qquad
\varepsilon\sim N(0,1),\quad\varepsilon\perp X
$$

と表せる。切断正規の結果

$$
E[X\mid X>a]=\lambda(a),
$$

$$
V_a=\operatorname{Var}(X\mid X>a)
=1+a\lambda(a)-\lambda(a)^2.
$$

従って

$$
\boxed{E[Y\mid X>a]=\rho\lambda(a)},
$$

$$
\boxed{\operatorname{Var}(Y\mid X>a)=\rho^2V_a+1-\rho^2},
$$

$$
\boxed{\operatorname{Cov}(X,Y\mid X>a)=\rho V_a}.
$$

選択後は $X$ の分散が1から $V_a$ へ変わるため、共分散・相関も元の $\rho$ のままではない。

## 本番答案

$Y=\rho X+\sqrt{1-\rho^2}\varepsilon$ と表し、$V_a=1+a\lambda-\lambda^2$ と置けば

$$
E[Y\mid X>a]=\rho\lambda,
$$

$$
Var(Y\mid X>a)=\rho^2V_a+1-\rho^2,
\quad
Cov(X,Y\mid X>a)=\rho V_a.
$$

## 採点基準

- 回帰表現: 4点
- 条件付き平均: 5点
- 条件付き分散: 6点
- 共分散・選択効果: 5点
