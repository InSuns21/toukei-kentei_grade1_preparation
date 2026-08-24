# Core 07 多変量正規の線形変換・独立・残差化

- 旧No.: 25
- 演習価値: S
- 難度: S
- 目安時間: 25分
- 手計算監査: ◎

## 問題

$X_1,X_2,X_3$ は独立な$N(0,1)$とし

$$
Y=X_1+X_2,
\qquad
Z=X_2+X_3
$$

とする。

1. $(Y,Z)$の平均ベクトルと共分散行列を求めよ。
2. $Y$と$Z$は独立か。
3. $R=Y-aZ$ が$Z$と独立となる$a$を求めよ。
4. $Y\mid Z=z$の条件付き分布を求めよ。

## 詳細解答

線形変換なので$(Y,Z)$は2変量正規。

$$
E[Y]=E[Z]=0,
$$

$$
\operatorname{Var}(Y)=2,
\qquad
\operatorname{Var}(Z)=2,
$$

$$
\operatorname{Cov}(Y,Z)=\operatorname{Cov}(X_1+X_2,X_2+X_3)=1.
$$

したがって

$$
\Sigma_{YZ}=\begin{pmatrix}2&1\\1&2\end{pmatrix}.
$$

共分散が0ではないので独立ではない。

$R=Y-aZ$について

$$
\operatorname{Cov}(R,Z)=1-2a.
$$

これを0にする$a=1/2$。$(R,Z)$も同時正規なので無相関なら独立。

さらに

$$
Y=\frac12Z+R,
$$

$$
\operatorname{Var}(R)
=2-\frac{1^2}{2}=\frac32.
$$

従って

$$
\boxed{
Y\mid Z=z\sim N\left(\frac z2,\frac32\right)
}.
$$

## 本番答案

$(Y,Z)$は線形変換された正規ベクトルで

$$
\operatorname{Cov}(Y,Z)=1,
\qquad
\Sigma=\begin{pmatrix}2&1\\1&2\end{pmatrix}.
$$

よって$Y,Z$は独立でない。

$$
\operatorname{Cov}(Y-aZ,Z)=1-2a=0
$$

から$a=1/2$。同時正規より$R=Y-Z/2$と$Z$は独立。

$$
\operatorname{Var}(R)=2-1/2=3/2
$$

なので

$$
Y\mid Z=z\sim N(z/2,3/2).
$$

## 採点基準

- 共分散行列: 6点
- 独立判定: 3点
- 残差化係数: 5点
- 条件付き分布: 6点
