# Standard 13 ノイズ付き線形観測の条件付き正規

- 旧No.: 36
- 層: Standard
- 演習価値: A
- 難度: A
- 目安時間: 25分
- 手計算監査: ◎

## 問題

$X\sim N_p(\mu,\Sigma)$、$\varepsilon\sim N(0,\tau^2)$ は独立で、

$$
Y=a^TX+\varepsilon
$$

を観測する。

1. $(X,Y)$ の平均と共分散を求めよ。
2. $X\mid Y=y$ の分布を求めよ。
3. $\tau^2\to0$ と $\tau^2\to\infty$ の極限を解釈せよ。

## 詳細解答

$$
E[Y]=a^T\mu,
\quad
\operatorname{Var}(Y)=a^T\Sigma a+\tau^2,
\quad
\operatorname{Cov}(X,Y)=\Sigma a.
$$

よって条件付き正規公式から

$$
E[X\mid Y=y]
=\mu+\frac{\Sigma a}{a^T\Sigma a+\tau^2}(y-a^T\mu),
$$

$$
\operatorname{Cov}(X\mid Y)
=\Sigma-\frac{\Sigma aa^T\Sigma}{a^T\Sigma a+\tau^2}.
$$

$\tau^2\to0$ では線形制約 $a^TX=y$ をほぼ正確に観測し、$\tau^2\to\infty$ では観測情報が消えて事前分布 $N_p(\mu,\Sigma)$ に戻る。

## 本番答案

$(X,Y)$ の共分散ブロックは $\operatorname{Cov}(X,Y)=\Sigma a$, $\operatorname{Var}(Y)=a^T\Sigma a+\tau^2$。従って

$$
X\mid Y=y\sim N_p\left(
\mu+\frac{\Sigma a}{a^T\Sigma a+\tau^2}(y-a^T\mu),
\Sigma-\frac{\Sigma aa^T\Sigma}{a^T\Sigma a+\tau^2}
\right).
$$

## 採点基準

- 同時モーメント: 6点
- 条件付き平均: 6点
- 条件付き共分散: 5点
- 極限解釈: 3点
