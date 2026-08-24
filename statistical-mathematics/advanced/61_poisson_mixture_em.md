# Advanced 12 2成分Poisson混合・EM

- 旧No.: 61
- 層: Advanced
- 演習価値: A
- 難度: S
- 目安時間: 30分
- 手計算監査: ◎・修正済（収束までの反復計算不要）

## 問題

独立観測 $x_1,\ldots,x_n$ が

$$
f(x)=\pi\,Poi(x;\lambda_1)+(1-\pi)Poi(x;\lambda_2),
\qquad0<\pi<1
$$

から得られた。潜在変数 $Z_i\in\{0,1\}$ を成分1の所属指標とする。

1. 完全データ対数尤度を書け。
2. E-stepの責任度 $r_i=E[Z_i\mid x_i]$ を求めよ。
3. M-stepの $\pi,\lambda_1,\lambda_2$ 更新式を導け。
4. 数値反復を手で最後まで行う必要がない理由と、label switchingを説明せよ。

## 詳細解答

### 1. 完全データ対数尤度

$Z_i=1$ なら成分1、$Z_i=0$ なら成分2なので完全データ尤度の第 $i$ 因子は

$$
\{\pi Poi(x_i;\lambda_1)\}^{Z_i}
\{(1-\pi)Poi(x_i;\lambda_2)\}^{1-Z_i}.
$$

対数を取り、$\log(x_i!)$ のように母数へ依存しない項を除くと

$$
\ell_c
=\sum_i\left[
Z_i\{\log\pi-\lambda_1+x_i\log\lambda_1\}
+(1-Z_i)\{\log(1-\pi)-\lambda_2+x_i\log\lambda_2\}
\right].
$$

### 2. E-step

$Z_i$ は0-1変数なので $r_i=E[Z_i\mid x_i]=P(Z_i=1\mid x_i)$。Bayes則から

$$
\boxed{
r_i
=\frac{\pi Poi(x_i;\lambda_1)}
{\pi Poi(x_i;\lambda_1)+(1-\pi)Poi(x_i;\lambda_2)}
}.
$$

実際の反復では右辺の $\pi,\lambda_1,\lambda_2$ に現在値を入れる。

### 3. M-step

$Z_i$ を条件付き期待値 $r_i$ で置き換えた期待完全対数尤度は

$$
Q=\sum_i\left[
r_i\{\log\pi-\lambda_1+x_i\log\lambda_1\}
+(1-r_i)\{\log(1-\pi)-\lambda_2+x_i\log\lambda_2\}
\right].
$$

まず $\pi$ で微分すると

$$
\frac{\partial Q}{\partial\pi}
=\sum_i\frac{r_i}{\pi}-\sum_i\frac{1-r_i}{1-\pi}.
$$

これを0と置いて整理すると

$$
\boxed{\pi^{new}=\frac1n\sum_i r_i}.
$$

次に

$$
\frac{\partial Q}{\partial\lambda_1}
=-\sum_ir_i+\frac1{\lambda_1}\sum_ir_ix_i.
$$

0と置けば

$$
\boxed{\lambda_1^{new}=\frac{\sum_i r_ix_i}{\sum_i r_i}}.
$$

同様に

$$
\frac{\partial Q}{\partial\lambda_2}
=-\sum_i(1-r_i)+\frac1{\lambda_2}\sum_i(1-r_i)x_i
$$

から

$$
\boxed{\lambda_2^{new}=\frac{\sum_i(1-r_i)x_i}{\sum_i(1-r_i)}}.
$$

### 4. 反復とlabel switching

試験で問う本質はE-stepとM-stepの導出であり、収束まで多数回反復するのは計算機向きである。また成分ラベルを入れ替えた

$$
(\pi,\lambda_1,\lambda_2)
\quad\text{と}\quad
(1-\pi,\lambda_2,\lambda_1)
$$

は同じ混合分布を表す。これがlabel switchingで、必要なら $\lambda_1<\lambda_2$ などの識別規約を置く。

## 本番答案

完全対数尤度は

$$
\ell_c=\sum_i[Z_i\{\log\pi-\lambda_1+x_i\log\lambda_1\}+(1-Z_i)\{\log(1-\pi)-\lambda_2+x_i\log\lambda_2\}]
$$

（定数項省略）。Bayes則で

$$
r_i=\frac{\pi Poi(x_i;\lambda_1)}{\pi Poi(x_i;\lambda_1)+(1-\pi)Poi(x_i;\lambda_2)}.
$$

$Q=E(\ell_c\mid x)$ を $\pi,\lambda_1,\lambda_2$ で微分して0と置けば

$$
\pi^{new}=n^{-1}\sum r_i,
\quad
\lambda_1^{new}=\frac{\sum r_ix_i}{\sum r_i},
\quad
\lambda_2^{new}=\frac{\sum(1-r_i)x_i}{\sum(1-r_i)}.
$$

## 採点基準

- 完全データ尤度: 5点
- E-step: 6点
- M-step（微分を含む）: 7点
- label switching: 2点
