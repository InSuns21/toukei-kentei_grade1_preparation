# Standard 11 二値化正規・相関減衰

- 旧No.: 29
- 層: Standard
- 演習価値: A
- 難度: A
- 目安時間: 20分
- 手計算監査: ◎

## 問題

$(X,Y)$ は平均0、分散1、相関 $\rho$ の2変量正規分布とする。$A=\boldsymbol{1}_{\{X>0\}}$, $B=\boldsymbol{1}_{\{Y>0\}}$ とする。

1. $E[A],\operatorname{Var}(A)$ を求めよ。
2. 公式

$$
P(X>0,Y>0)=\frac14+\frac{1}{2\pi}\arcsin\rho
$$

を用いて $\operatorname{Corr}(A,B)$ を求めよ。
3. $\rho=1/2$ の場合を求め、二値化による相関の変化を述べよ。

## 詳細解答

対称性から $E[A]=1/2$, $\operatorname{Var}(A)=1/4$。また

$$
\operatorname{Cov}(A,B)
=P(X>0,Y>0)-\frac14
=\frac{1}{2\pi}\arcsin\rho.
$$

従って

$$
\boxed{\operatorname{Corr}(A,B)=\frac{2}{\pi}\arcsin\rho}.
$$

$\rho=1/2$ なら $\arcsin(1/2)=\pi/6$ なので

$$
\operatorname{Corr}(A,B)=\frac13.
$$

元の相関 $1/2$ より小さく、粗い二値化で線形関係の情報が失われている。

## 本番答案

$A,B$ は成功確率 $1/2$ のBernoulli。四分円確率公式より

$$
\operatorname{Corr}(A,B)=4\left(P(X>0,Y>0)-\frac14\right)
=\frac2\pi\arcsin\rho.
$$

$\rho=1/2$ では $1/3$。

## 採点基準

- Bernoulliモーメント: 4点
- 共分散: 6点
- 相関公式: 6点
- 特殊値・解釈: 4点
