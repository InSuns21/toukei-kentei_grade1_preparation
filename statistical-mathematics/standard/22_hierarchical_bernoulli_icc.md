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
3. 級内相関係数を求めよ。

## 詳細解答

### 1. 周辺平均と周辺分散

$P=p$ を与えると

$$
X_i\mid P=p\sim\operatorname{Bernoulli}(p)
$$

なので

$$
E[X_i\mid P]=P.
$$

全期待値の公式から

$$
E[X_i]=E\{E[X_i\mid P]\}=E[P].
$$

Beta$(a,b)$ の平均は

$$
E[P]=\frac{a}{a+b}
$$

だから

$$
\boxed{E[X_i]=\frac{a}{a+b}}.
$$

次に分散を全分散の公式から確認する。

$$
\operatorname{Var}(X_i)
=E\{\operatorname{Var}(X_i\mid P)\}
+\operatorname{Var}\{E[X_i\mid P]\}.
$$

条件付きBernoulli分布より

$$
\operatorname{Var}(X_i\mid P)=P(1-P),
$$

したがって

$$
\operatorname{Var}(X_i)
=E[P(1-P)]+\operatorname{Var}(P).
$$

ここで

$$
E[P(1-P)]
=E[P]-E[P^2],
$$

$$
\operatorname{Var}(P)=E[P^2]-E[P]^2
$$

なので $E[P^2]$ が消えて

$$
\operatorname{Var}(X_i)
=E[P]-E[P]^2.
$$

従って

$$
\boxed{
\operatorname{Var}(X_i)
=\frac{a}{a+b}\left(1-\frac{a}{a+b}\right)
=\frac{ab}{(a+b)^2}
}.
$$

これは、周辺分布では $X_i$ 自体が成功確率 $a/(a+b)$ のBernoulli分布になることとも一致する。

### 2. 異なる個体間の共分散

$i\ne j$ とする。条件付きでは $X_i,X_j$ は独立なので

$$
E[X_iX_j\mid P]
=E[X_i\mid P]E[X_j\mid P]
=P^2.
$$

全期待値を取ると

$$
E[X_iX_j]=E[P^2].
$$

したがって

$$
\begin{aligned}
\operatorname{Cov}(X_i,X_j)
&=E[X_iX_j]-E[X_i]E[X_j]\\
&=E[P^2]-E[P]^2\\
&=\operatorname{Var}(P).
\end{aligned}
$$

Beta$(a,b)$ の分散は

$$
\operatorname{Var}(P)
=\frac{ab}{(a+b)^2(a+b+1)}
$$

だから

$$
\boxed{
\operatorname{Cov}(X_i,X_j)
=\frac{ab}{(a+b)^2(a+b+1)}
}.
$$

重要なのは、$P$ を固定すれば独立でも、$P$ を観測せずに周辺化すると共通の $P$ の変動を共有するため正の相関が生じる点である。

### 3. 級内相関係数

すべての $X_i$ は同じ分散を持つので

$$
\rho
=\frac{\operatorname{Cov}(X_i,X_j)}
{\sqrt{\operatorname{Var}(X_i)\operatorname{Var}(X_j)}}
=\frac{\operatorname{Cov}(X_i,X_j)}{\operatorname{Var}(X_i)}.
$$

第1,2問の結果を代入すると

$$
\begin{aligned}
\rho
&=\frac{ab/\{(a+b)^2(a+b+1)\}}
{ab/(a+b)^2}\\
&=\boxed{\frac1{a+b+1}}.
\end{aligned}
$$

$a+b$ が大きいほど $P$ の事前分布は集中し、集団間のランダムな成功確率のばらつきが小さくなるので、級内相関も小さくなる。

## 本番答案

$$
E[X_i]=E[P]=\frac a{a+b}.
$$

全分散より

$$
\operatorname{Var}(X_i)
=E[P(1-P)]+\operatorname{Var}(P)
=E[P]-E[P]^2
=\frac{ab}{(a+b)^2}.
$$

$i\ne j$ では条件付き独立性から

$$
E[X_iX_j\mid P]=P^2,
$$

よって

$$
\operatorname{Cov}(X_i,X_j)
=\operatorname{Var}(P)
=\frac{ab}{(a+b)^2(a+b+1)}.
$$

したがって

$$
\rho
=\frac{\operatorname{Cov}(X_i,X_j)}{\operatorname{Var}(X_i)}
=\frac1{a+b+1}.
$$

## 採点基準

- 全期待値による平均: 4点
- 全分散による周辺分散: 5点
- 条件付き独立性から共分散を導出: 7点
- 級内相関係数・解釈: 4点
