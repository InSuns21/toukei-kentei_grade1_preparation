# 定義と記法

## P2-DEF-06 期待値と絶対可積分性

離散型では $\sum_x|x|p_X(x)<\infty$、連続型では $\int|x|f_X(x)dx<\infty$ のとき
$$
E[X]=\sum_xxp_X(x),\qquad E[X]=\int xf_X(x)dx
$$
と定義します。正負部分がともに無限となる式を相殺して期待値と呼びません。

$P(H)>0$ の事象 $H$ に対しては、条件付き分布 $P(X\in A\mid H)$ に関する期待値を $E[X\mid H]$ と書きます。条件付き二次モーメントが有限なら

$$
\operatorname{Var}(X\mid H)=E[(X-E[X\mid H])^2\mid H]
$$

と定義します。本章の条件付き期待値は有限分割の各事象を条件とする数値だけを扱います。

## P2-DEF-07 分散・標準偏差

$E[X^2]<\infty$ のとき
$$
\operatorname{Var}(X)=E[(X-E[X])^2],\qquad
\operatorname{sd}(X)=\sqrt{\operatorname{Var}(X)}.
$$

## P2-DEF-08 共分散・相関係数

$E[X^2],E[Y^2]<\infty$ のとき
$$
\operatorname{Cov}(X,Y)=E[(X-E[X])(Y-E[Y])].
$$
$\operatorname{Var}(X),\operatorname{Var}(Y)>0$ なら
$$
\rho(X,Y)=\frac{\operatorname{Cov}(X,Y)}{\sqrt{\operatorname{Var}(X)\operatorname{Var}(Y)}}.
$$

## P2-DEF-09 確率母関数

$X\in\mathbb N_0$ に対し
$$
G_X(s)=E[s^X]=\sum_{k=0}^{\infty}P(X=k)s^k,\qquad |s|\leq1
$$
をPGFと呼びます。$G_X(1)=1$ です。

## P2-DEF-10 モーメント母関数

$$
M_X(t)=E[e^{tX}]
$$
をMGFと呼びます。少なくとも $t=0$ では1ですが、0以外で無限となる場合があります。0を含む開区間で有限なとき、その区間内のMGFは分布を一意に定めます。
