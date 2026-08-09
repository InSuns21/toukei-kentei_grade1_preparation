# 典型例と完全な導出

## 例1：線形結合

$E[X]=1$, $E[Y]=2$, $\operatorname{Var}(X)=4$, $\operatorname{Var}(Y)=9$, $\operatorname{Cov}(X,Y)=3$なら
$$
E[2X-Y]=0,
$$
$$
\operatorname{Var}(2X-Y)=4\cdot4+9-4\cdot3=13.
$$
交差項は$2ab\operatorname{Cov}(X,Y)$です。

## 例2：二変量正規の条件付け

$(X,Y)$が平均$(0,1)^{\mathsf T}$、分散$\sigma_X^2=4$, $\sigma_Y^2=9$、相関$1/3$の二変量正規なら
$$
Y\mid(X=x)\sim N\left(1+\frac12x,8\right).
$$
係数は$(1/3)(3/2)=1/2$、条件付き分散は$9(1-1/9)=8$です。

## 例3：偏相関

$\rho_{12}=0.7$, $\rho_{13}=0.5$, $\rho_{23}=0.4$なら
$$
\rho_{12\cdot3}
=\frac{0.7-0.5\cdot0.4}
{\sqrt{(1-0.5^2)(1-0.4^2)}}
=\frac{0.5}{\sqrt{0.63}}.
$$
単純相関0.7の一部が$X_3$との共通の線形関係で説明されます。

## 例4：Mahalanobis距離

$\boldsymbol\Sigma=\operatorname{diag}(4,9)$、$\boldsymbol x-\boldsymbol\mu=(2,3)^{\mathsf T}$なら
$$
Q=(2,3)
\begin{pmatrix}1/4&0\\0&1/9\end{pmatrix}
\begin{pmatrix}2\\3\end{pmatrix}=2.
$$
各座標を標準偏差で割った平方和になっています。
