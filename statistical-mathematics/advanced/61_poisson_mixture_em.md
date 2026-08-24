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

定数項を除く完全データ対数尤度は

$$
\ell_c
=\sum_i\left[
Z_i\{\log\pi-\lambda_1+x_i\log\lambda_1\}
+(1-Z_i)\{\log(1-\pi)-\lambda_2+x_i\log\lambda_2\}
\right].
$$

E-stepはBayes則より

$$
\boxed{
r_i
=\frac{\pi Poi(x_i;\lambda_1)}
{\pi Poi(x_i;\lambda_1)+(1-\pi)Poi(x_i;\lambda_2)}
}.
$$

M-stepでは $Z_i$ を $r_i$ で置き換えた期待完全対数尤度を最大化するので

$$
\boxed{\pi^{new}=\frac1n\sum_i r_i},
$$

$$
\boxed{\lambda_1^{new}=\frac{\sum_i r_ix_i}{\sum_i r_i}},
$$

$$
\boxed{\lambda_2^{new}=\frac{\sum_i(1-r_i)x_i}{\sum_i(1-r_i)}}.
$$

EMの本質は更新式の導出であり、収束までの多数回反復は計算機作業。成分ラベルを入れ替えた $(\pi,\lambda_1,\lambda_2)$ と $(1-\pi,\lambda_2,\lambda_1)$ は同じ混合分布を表すためlabel switchingがある。必要なら $\lambda_1<\lambda_2$ などの規約を置く。

## 本番答案

潜在所属 $Z_i$ を導入するとE-stepは

$$
r_i=\frac{\pi Poi(x_i;\lambda_1)}{\pi Poi(x_i;\lambda_1)+(1-\pi)Poi(x_i;\lambda_2)}.
$$

M-stepは

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
- M-step: 7点
- label switching: 2点
