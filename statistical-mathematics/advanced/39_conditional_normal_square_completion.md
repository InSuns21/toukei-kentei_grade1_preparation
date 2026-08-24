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

中心化して

$$
u=x-\mu_X,
\qquad
v=y-\mu_Y
$$

とする。また

$$
B=\Sigma_{XY}\Sigma_{YY}^{-1},
$$

$$
S=\Sigma_{XX}-\Sigma_{XY}\Sigma_{YY}^{-1}\Sigma_{YX}
$$

と置く。

### 1. 共分散行列を分解する

$B\Sigma_{YY}=\Sigma_{XY}$ かつ

$$
S+B\Sigma_{YY}B^T
=\Sigma_{XX}
$$

なので、共分散行列は

$$
\Sigma
=
\begin{pmatrix}I&B\\0&I\end{pmatrix}
\begin{pmatrix}S&0\\0&\Sigma_{YY}\end{pmatrix}
\begin{pmatrix}I&0\\B^T&I\end{pmatrix}.
$$

右辺を実際に掛けると、左上は $S+B\Sigma_{YY}B^T=\Sigma_{XX}$、右上は $B\Sigma_{YY}=\Sigma_{XY}$、左下はその転置、右下は $\Sigma_{YY}$ となる。

### 2. 指数部を平方完成する

左端の下三角因子を $L$ とすれば $\Sigma=LDL^T$ で

$$
L^{-1}=
\begin{pmatrix}I&-B\\0&I\end{pmatrix}.
$$

従って

$$
\Sigma^{-1}=L^{-T}D^{-1}L^{-1}.
$$

よって同時正規密度の二次形式は

$$
\begin{aligned}
\begin{pmatrix}u\\v\end{pmatrix}^T
\Sigma^{-1}
\begin{pmatrix}u\\v\end{pmatrix}
&=
\left(L^{-1}\begin{pmatrix}u\\v\end{pmatrix}\right)^T
D^{-1}
\left(L^{-1}\begin{pmatrix}u\\v\end{pmatrix}\right)\\
&=
\begin{pmatrix}u-Bv\\v\end{pmatrix}^T
\begin{pmatrix}S^{-1}&0\\0&\Sigma_{YY}^{-1}\end{pmatrix}
\begin{pmatrix}u-Bv\\v\end{pmatrix}\\
&=(u-Bv)^TS^{-1}(u-Bv)+v^T\Sigma_{YY}^{-1}v.
\end{aligned}
$$

これが $x$ に関する平方完成そのものである。

### 3. 条件付き密度を読む

$Y=y$ を固定すると $v$ は定数なので、第2項は条件付き密度の正規化定数へ吸収される。従って $u$ に依存する部分は

$$
\exp\left[-\frac12(u-Bv)^TS^{-1}(u-Bv)\right].
$$

よって

$$
u\mid v\sim N(Bv,S).
$$

元の変数へ戻して

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

条件付き共分散が $y$ に依存しないことも二次形式から読み取れる。

## 本番答案

$u=x-\mu_X$, $v=y-\mu_Y$, $B=\Sigma_{XY}\Sigma_{YY}^{-1}$,

$$
S=\Sigma_{XX}-\Sigma_{XY}\Sigma_{YY}^{-1}\Sigma_{YX}
$$

と置く。すると

$$
\Sigma=
\begin{pmatrix}I&B\\0&I\end{pmatrix}
\begin{pmatrix}S&0\\0&\Sigma_{YY}\end{pmatrix}
\begin{pmatrix}I&0\\B^T&I\end{pmatrix},
$$

したがって

$$
\begin{pmatrix}u\\v\end{pmatrix}^T\Sigma^{-1}
\begin{pmatrix}u\\v\end{pmatrix}
=(u-Bv)^TS^{-1}(u-Bv)+v^T\Sigma_{YY}^{-1}v.
$$

$Y=y$ を固定すれば後項は定数なので $u\mid v\sim N(Bv,S)$。よって条件付き平均・共分散は上の boxed 式。

## 採点基準

- 中心化・ブロック設定: 3点
- 平方完成の導出: 8点
- 条件付き平均: 4点
- Schur complement共分散: 4点
- 解釈: 1点
