# Standard 10 階層Bernoulli・全分散・級内相関

- 旧No.: 22
- 層: Standard
- 演習価値: A
- 難度: A
- 目安時間: 20分
- 手計算監査: ◎

## 問題

$P\sim\operatorname{Beta}(a,b)$ とし、$P$ を与えた下で $X_1,\ldots,X_m$ は独立な $\operatorname{Bernoulli}(P)$ とする。

1. $E[X_i]$, $\operatorname{Var}(X_i)$ を求めよ。
2. $i\ne j$ に対し $\operatorname{Cov}(X_i,X_j)$ を求めよ。
3. 級内相関を求めよ。

## 詳細解答

$$
E[X_i]=E[E(X_i\mid P)]=E[P]=\frac{a}{a+b}.
$$

周辺では $X_i$ は成功確率 $a/(a+b)$ のBernoulliなので

$$
\operatorname{Var}(X_i)=\frac{ab}{(a+b)^2}.
$$

条件付き独立性より

$$
\operatorname{Cov}(X_i,X_j)
=\operatorname{Cov}(E[X_i\mid P],E[X_j\mid P])
=\operatorname{Var}(P)
=\frac{ab}{(a+b)^2(a+b+1)}.
$$

従って級内相関は

$$
\boxed{\rho=\frac1{a+b+1}}.
$$

条件付きでは独立でも、共通のランダム効果 $P$ を積分消去すると正の相関が生じる。

## 本番答案

全期待値・全共分散を使うと

$$
E[X_i]=\frac a{a+b},
\quad
\operatorname{Var}(X_i)=\frac{ab}{(a+b)^2},
$$

$$
\operatorname{Cov}(X_i,X_j)=\operatorname{Var}(P)
=\frac{ab}{(a+b)^2(a+b+1)}.
$$

よって $\rho=1/(a+b+1)$。

## 採点基準

- 平均: 4点
- 分散: 5点
- 共分散: 7点
- 級内相関・解釈: 4点
