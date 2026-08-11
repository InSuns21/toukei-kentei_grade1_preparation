# 定義と記法

列ベクトルを用います。転置は$\mathsf T$、$p$次単位行列は$I_p$です。

## P3M-DEF-01 確率ベクトルと共分散行列

$\boldsymbol X=(X_1,\ldots,X_p)^{\mathsf T}$の各成分が二乗可積分であるとします。平均ベクトルと共分散行列を
$$
\boldsymbol\mu=E[\boldsymbol X]\in\mathbb R^p,
\qquad
\boldsymbol\Sigma
=E[(\boldsymbol X-\boldsymbol\mu)(\boldsymbol X-\boldsymbol\mu)^{\mathsf T}]
\in\mathbb R^{p\times p}
$$
と定めます。$(i,j)$成分は$\operatorname{Cov}(X_i,X_j)$です。$\boldsymbol\Sigma$は対称半正定値であり、特異でも構いません。

## P3M-DEF-02 相関行列と偏相関

全成分の分散が正とします。$D=\operatorname{diag}(\sigma_1^2,\ldots,\sigma_p^2)$ と置くと相関行列は
$$
R=D^{-1/2}\boldsymbol\Sigma D^{-1/2},
\qquad R_{ij}=\rho_{ij}.
$$

$X_i,X_j$から残りの変数への最良線形予測を引いた残差の相関を、残りを制御した偏相関といいます。三変数では、各分散が正で相関行列が正定値なら
$$
\rho_{12\cdot3}
=\frac{\rho_{12}-\rho_{13}\rho_{23}}
{\sqrt{(1-\rho_{13}^2)(1-\rho_{23}^2)}}.
$$

## P3M-DEF-03 多変量正規分布

$\boldsymbol X\in\mathbb R^p$が、任意の$\boldsymbol a\in\mathbb R^p$について$\boldsymbol a^{\mathsf T}\boldsymbol X$が退化を許す一変量正規分布に従うとき
$$
\boldsymbol X\sim N_p(\boldsymbol\mu,\boldsymbol\Sigma)
$$
と書きます。ここで$\boldsymbol\Sigma$は半正定値です。

$\boldsymbol\Sigma$が正定値のときに限り、$p$次元空間で通常の体積$d\boldsymbol x$に関する密度は
$$
f(\boldsymbol x)=
\frac{1}{(2\pi)^{p/2}|\boldsymbol\Sigma|^{1/2}}
\exp\left\{-\frac12
(\boldsymbol x-\boldsymbol\mu)^{\mathsf T}
\boldsymbol\Sigma^{-1}
(\boldsymbol x-\boldsymbol\mu)\right\},
\quad\boldsymbol x\in\mathbb R^p.
$$
正規化も、平均を引いて共分散が単位行列になるように線形変換する操作（白色化）で確認できます。$LL^{\mathsf T}=\boldsymbol\Sigma$を満たす可逆$L$を取り、$\boldsymbol z=L^{-1}(\boldsymbol x-\boldsymbol\mu)$と置くと、ヤコビアンは
$$
d\boldsymbol x=|\det L|d\boldsymbol z
=|\det\boldsymbol\Sigma|^{1/2}d\boldsymbol z
$$
です。密度積分は独立標準正規$p$個の積密度の積分へ戻るため1です。

特異な場合は、ある線形制約を必ず満たして低次元の平面上に集中するため、この$p$次元密度式は使えません。

## P3M-DEF-04 条件付き密度

連続確率ベクトル$(\boldsymbol X,\boldsymbol Y)$の同時密度を$f_{\boldsymbol X,\boldsymbol Y}$、周辺密度を$f_{\boldsymbol Y}$とします。$f_{\boldsymbol Y}(\boldsymbol y)>0$のとき
$$
f_{\boldsymbol X\mid\boldsymbol Y}
(\boldsymbol x\mid\boldsymbol y)
=\frac{f_{\boldsymbol X,\boldsymbol Y}(\boldsymbol x,\boldsymbol y)}
{f_{\boldsymbol Y}(\boldsymbol y)}.
$$
長さ・面積・体積が0の例外集合上で密度の値を変更しても、積分で求める確率は変わりません。したがって条件付き密度の式も、そのような例外点を除いて一致すれば同じ分布を表します。

## P3M-DEF-05 二次形式とMahalanobis距離

対称行列$A\in\mathbb R^{p\times p}$に対する$\boldsymbol X^{\mathsf T}A\boldsymbol X$を二次形式といいます。正定値な$\boldsymbol\Sigma$に対し
$$
Q=(\boldsymbol X-\boldsymbol\mu)^{\mathsf T}
\boldsymbol\Sigma^{-1}(\boldsymbol X-\boldsymbol\mu)
$$
をMahalanobis二次形式と呼びます。単位や相関を除いた中心からの距離の二乗です。
