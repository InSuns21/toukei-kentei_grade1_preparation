# Core 34 2変量正規・条件付き分布・Markov構造

- 旧No.: 27
- 演習価値: A
- 難度: A
- 目安時間: 20分
- 手計算監査: ◎

## 問題

$|\rho|<1$とし、$(X_0,X_1,X_2)$が平均0、共分散行列

$$
\Sigma=
\begin{pmatrix}
1&\rho&\rho^2\\
\rho&1&\rho\\
\rho^2&\rho&1
\end{pmatrix}
$$

の3変量正規分布に従う。

1. $X_2\mid X_1=x$の分布を求めよ。
2. $\operatorname{Cov}(X_0,X_2\mid X_1)$を求めよ。
3. $X_0\perp X_2\mid X_1$を示せ。
4. この共分散構造がGaussian Markov連鎖$X_0\to X_1\to X_2$に対応することを説明せよ。

## 詳細解答

2変量正規の条件付き分布公式から

$$
\boxed{
X_2\mid X_1=x
\sim N(\rho x,1-\rho^2)
}.
$$

条件付き共分散は

$$
\begin{aligned}
Cov(X_0,X_2\mid X_1)
&=Cov(X_0,X_2)
-Cov(X_0,X_1)Var(X_1)^{-1}Cov(X_1,X_2)\\
&=\rho^2-\rho\cdot1^{-1}\cdot\rho\\
&=0.
\end{aligned}
$$

条件付き分布も正規なので、条件付き無相関は条件付き独立を意味し

$$
\boxed{X_0\perp X_2\mid X_1}.
$$

従って$X_2$の条件付き分布は、過去$X_0$を追加で知っても$X_1$を知った後には変わらない。これがMarkov性。

## 本番答案

$$
X_2\mid X_1=x\sim N(\rho x,1-\rho^2).
$$

また

$$
Cov(X_0,X_2\mid X_1)=\rho^2-\rho^2=0.
$$

条件付き正規性より$X_0\perp X_2\mid X_1$。したがって$X_0\to X_1\to X_2$のGaussian Markov構造を持つ。

## 採点基準

- 条件付き分布: 6点
- 条件付き共分散: 6点
- 条件付き独立: 4点
- Markov解釈: 4点
