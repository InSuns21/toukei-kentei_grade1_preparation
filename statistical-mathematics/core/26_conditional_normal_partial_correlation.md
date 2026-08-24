# Core 08 条件付き正規・偏相関・条件付き独立

- 旧No.: 26
- 演習価値: S
- 難度: S
- 目安時間: 30分
- 手計算監査: ◎

## 問題

$(X,Y,Z)^T$ は平均0、共分散行列

$$
\Sigma=
\begin{pmatrix}
1&1/2&1/2\\
1/2&1&1/4\\
1/2&1/4&1
\end{pmatrix}
$$

の3変量正規分布に従う。

1. $(Y,Z)\mid X=x$ の平均ベクトルを求めよ。
2. 条件付き共分散行列を求めよ。
3. $Y$と$Z$は$X$を条件として独立か。
4. 偏相関係数$\rho_{YZ\cdot X}$を求めよ。

## 詳細解答

$W=(Y,Z)^T$ と置くと

$$
\Sigma_{WX}=\begin{pmatrix}1/2\\1/2\end{pmatrix},
\qquad
\Sigma_{WW}=\begin{pmatrix}1&1/4\\1/4&1\end{pmatrix}.
$$

$\operatorname{Var}(X)=1$なので

$$
E[W\mid X=x]
=\Sigma_{WX}x
=\begin{pmatrix}x/2\\x/2\end{pmatrix}.
$$

条件付き共分散はSchur補

$$
\Sigma_{W\mid X}
=\Sigma_{WW}-\Sigma_{WX}\Sigma_{XW}.
$$

したがって

$$
\Sigma_{W\mid X}
=
\begin{pmatrix}1&1/4\\1/4&1\end{pmatrix}
-
\begin{pmatrix}1/4&1/4\\1/4&1/4\end{pmatrix}
=
\begin{pmatrix}3/4&0\\0&3/4\end{pmatrix}.
$$

条件付き分布も正規で、条件付き共分散が0なので

$$
\boxed{Y\perp Z\mid X}.
$$

偏相関は条件付き相関に等しいため

$$
\boxed{\rho_{YZ\cdot X}=0}.
$$

## 本番答案

$$
E[(Y,Z)^T\mid X=x]=(x/2,x/2)^T.
$$

条件付き共分散は

$$
\begin{pmatrix}1&1/4\\1/4&1\end{pmatrix}
-
\begin{pmatrix}1/2\\1/2\end{pmatrix}
\begin{pmatrix}1/2&1/2\end{pmatrix}
=
\begin{pmatrix}3/4&0\\0&3/4\end{pmatrix}.
$$

よって条件付き正規性から$Y\perp Z\mid X$、したがって$\rho_{YZ\cdot X}=0$。

## 採点基準

- 条件付き平均: 5点
- 条件付き共分散: 7点
- 条件付き独立: 4点
- 偏相関: 4点
