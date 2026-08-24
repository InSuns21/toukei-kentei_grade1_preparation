# Advanced 10 条件付き正規公式の平方完成導出

- 旧No.: 39
- 層: Advanced
- 演習価値: S
- 難度: S
- 目安時間: 30分
- 手計算監査: ◎

## 問題

$$
\begin{pmatrix}X\\Y\end{pmatrix}
\sim N\left(
\begin{pmatrix}\mu_X\\\mu_Y\end{pmatrix},
\begin{pmatrix}
\Sigma_{XX}&\Sigma_{XY}\\
\Sigma_{YX}&\Sigma_{YY}
\end{pmatrix}
\right)
$$

とし $\Sigma_{YY}$ は正定値とする。条件付き分布 $X\mid Y=y$ の平均・共分散を、公式を引用せず平方完成から導け。

## 詳細解答

中心化して $x_c=x-\mu_X$, $y_c=y-\mu_Y$ とする。ブロック逆行列またはSchur complementを用いる。条件付き密度で $y$ にのみ依存する項を定数へ吸収すると、$x$ に関する指数部は

$$
-\frac12
\left(x_c-\Sigma_{XY}\Sigma_{YY}^{-1}y_c\right)^T
S^{-1}
\left(x_c-\Sigma_{XY}\Sigma_{YY}^{-1}y_c\right),
$$

ここで

$$
S=\Sigma_{XX}-\Sigma_{XY}\Sigma_{YY}^{-1}\Sigma_{YX}
$$

はSchur complement。

従って

$$
\boxed{
E[X\mid Y=y]
=\mu_X+\Sigma_{XY}\Sigma_{YY}^{-1}(y-\mu_Y)
},
$$

$$
\boxed{
Cov(X\mid Y=y)
=\Sigma_{XX}-\Sigma_{XY}\Sigma_{YY}^{-1}\Sigma_{YX}
}.
$$

条件付き共分散が $y$ に依存しないのはGaussianの特徴。

平方完成の見方では、$\Sigma_{XY}\Sigma_{YY}^{-1}(y-\mu_Y)$ が $Y$ から線形に予測できる部分、Schur complementが予測後の残差共分散である。

## 本番答案

同時正規密度の指数二次形式を $x$ について平方完成すると

$$
(x_c-\Sigma_{XY}\Sigma_{YY}^{-1}y_c)^TS^{-1}
(x_c-\Sigma_{XY}\Sigma_{YY}^{-1}y_c),
$$

$$
S=\Sigma_{XX}-\Sigma_{XY}\Sigma_{YY}^{-1}\Sigma_{YX}.
$$

従って条件付き平均は $\mu_X+\Sigma_{XY}\Sigma_{YY}^{-1}(y-\mu_Y)$、共分散は $S$。

## 採点基準

- 中心化・ブロック設定: 3点
- 平方完成: 8点
- 条件付き平均: 4点
- Schur complement共分散: 4点
- 解釈: 1点
