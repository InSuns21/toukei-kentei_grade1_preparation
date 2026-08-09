# 問題集

## Level A：基礎部品

### P3M-A01 線形結合
- level: A
- minutes: 7
- topics: 平均, 共分散
- techniques: AFFINE-1
- calculation_load: low

$E[X]=1$, $E[Y]=2$, $\operatorname{Var}(X)=4$, $\operatorname{Var}(Y)=9$, $\operatorname{Cov}(X,Y)=3$ とする。$2X-Y$の平均と分散を求めよ。

### P3M-A02 共分散行列の条件
- level: A
- minutes: 8
- topics: 共分散行列, 相関係数
- techniques: DIM-1
- calculation_load: low

$$
\Sigma=\begin{pmatrix}4&c\\c&9\end{pmatrix}
$$
が共分散行列となるために必要な$c$の範囲を求め、相関係数を$c$で表せ。

### P3M-A03 周辺と線形結合
- level: A
- minutes: 8
- topics: 多変量正規分布, 周辺分布
- techniques: AFFINE-1
- calculation_load: low

$$
\begin{pmatrix}X\\Y\end{pmatrix}
\sim N_2\left(
\begin{pmatrix}1\\2\end{pmatrix},
\begin{pmatrix}4&3\\3&9\end{pmatrix}
\right).
$$
$X$, $Y$, $X+Y$の分布を求めよ。

### P3M-A04 偏相関
- level: A
- minutes: 8
- topics: 偏相関係数
- techniques: PARTIAL-1
- calculation_load: low

$\rho_{12}=1/2$, $\rho_{13}=1/3$, $\rho_{23}=1/4$ のとき$\rho_{12\cdot3}$を求めよ。

## Level B：小問セット

### P3M-B01 アフィン変換
- level: B
- minutes: 15
- topics: 多変量正規分布, 線形変換
- techniques: AFFINE-1, DIM-1
- calculation_load: medium

$\boldsymbol X\sim N_3(\boldsymbol\mu,\Sigma)$、
$$
\boldsymbol\mu=\begin{pmatrix}1\\0\\2\end{pmatrix},\quad
\Sigma=\begin{pmatrix}2&1&0\\1&3&1\\0&1&2\end{pmatrix},\quad
A=\begin{pmatrix}1&1&0\\0&1&-1\end{pmatrix},\quad
\boldsymbol b=\begin{pmatrix}0\\1\end{pmatrix}
$$
とする。$\boldsymbol Y=A\boldsymbol X+\boldsymbol b$の分布を求めよ。

### P3M-B02 二変量正規の条件付け
- level: B
- minutes: 14
- topics: 条件付き分布
- techniques: COND-NORMAL-1
- calculation_load: medium

$(X,Y)$が平均$(0,1)^{\mathsf T}$、標準偏差$(2,3)$、相関$1/3$の二変量正規分布に従う。$Y\mid(X=x)$の分布を求めよ。

### P3M-B03 無相関と独立
- level: B
- minutes: 14
- topics: 独立性, 無相関
- techniques: INDEP-NORMAL-1
- calculation_load: medium

$X\sim\operatorname{Unif}(-1,1)$、$Y=X^2$とする。

1. $\operatorname{Cov}(X,Y)$を求めよ。
2. $X,Y$が独立でないことを示せ。
3. 同時正規分布なら共分散0から何が言えるか。

### P3M-B04 Mahalanobis二次形式
- level: B
- minutes: 15
- topics: 二次形式, 多変量正規分布
- techniques: QUAD-MVN-1
- calculation_load: medium

$\boldsymbol X\sim N_2(\boldsymbol0,\Sigma)$、
$$
\Sigma=\begin{pmatrix}2&1\\1&2\end{pmatrix}
$$
とする。$\Sigma^{-1}$を求め、$Q=\boldsymbol X^{\mathsf T}\Sigma^{-1}\boldsymbol X$の分布を示せ。また$\boldsymbol x=(1,-1)^{\mathsf T}$での二次形式の値を求めよ。

## Level C：本番標準

### P3M-C01 双方向の条件付き正規
- level: C
- minutes: 25
- topics: 二変量正規分布, 条件付き分布
- techniques: COND-NORMAL-1
- calculation_load: medium

$(X,Y)$は平均$(2,-1)^{\mathsf T}$、分散$\operatorname{Var}(X)=4$, $\operatorname{Var}(Y)=9$、共分散3の二変量正規分布に従う。

1. 相関係数を求めよ。
2. $Y\mid(X=4)$の分布を求めよ。
3. $P(Y>1/2\mid X=4)$を求めよ。
4. $E[X\mid Y=y]$を求めよ。
5. $\operatorname{Var}(X\mid Y=y)$を求めよ。

### P3M-C02 ブロック条件付け
- level: C
- minutes: 28
- topics: 多変量正規分布, 条件付き分布, 独立性
- techniques: BLOCK-1, COND-NORMAL-1
- calculation_load: high

$$
\boldsymbol X=\begin{pmatrix}X_1\\X_2\\X_3\end{pmatrix}
\sim N_3\left(
\begin{pmatrix}0\\1\\2\end{pmatrix},
\begin{pmatrix}4&1&2\\1&3&1\\2&1&2\end{pmatrix}
\right).
$$

1. 対応する二次形式を平方完成し、共分散行列が正定値であることを確認せよ。
2. $(X_1,X_2)^{\mathsf T}\mid(X_3=4)$の条件付き平均を求めよ。
3. 条件付き共分散行列を求めよ。
4. 条件付きで$X_1,X_2$は独立か。
5. $X_1\mid(X_3=4)$の分布を求めよ。

### P3M-C03 残差と偏相関
- level: C
- minutes: 27
- topics: 偏相関係数, 条件付き独立
- techniques: PARTIAL-1
- calculation_load: high

中心化・標準化された$(X_1,X_2,X_3)$の相関が
$$
\rho_{12}=0.3,\qquad \rho_{13}=0.5,\qquad \rho_{23}=0.6
$$
であるとする。

1. $X_1$, $X_2$をそれぞれ$X_3$へ線形回帰した残差$R_1,R_2$を示せ。
2. $\operatorname{Cov}(R_1,R_2)$を求めよ。
3. 各残差分散を求めよ。
4. $\rho_{12\cdot3}$を求めよ。
5. 三変量正規分布なら、$X_3$を与えた下での$X_1,X_2$の独立性について述べよ。

### P3M-C04 白色化と二次形式
- level: C
- minutes: 25
- topics: 線形変換, 二次形式
- techniques: AFFINE-1, QUAD-MVN-1
- calculation_load: medium

$\boldsymbol X\sim N_p(\boldsymbol\mu,\Sigma)$、$\Sigma$は正定値とする。$L$を$LL^{\mathsf T}=\Sigma$を満たす可逆行列とし、$\boldsymbol Z=L^{-1}(\boldsymbol X-\boldsymbol\mu)$と置く。

1. $\boldsymbol Z$の平均と共分散を求めよ。
2. $\boldsymbol Z$の分布と成分の独立性を示せ。
3. Mahalanobis二次形式が$\boldsymbol Z^{\mathsf T}\boldsymbol Z$に等しいことを示せ。
4. 二次形式の分布を求めよ。
5. 二次形式の平均と分散を求めよ。

### P3M-C05 正誤判定総合
- level: C
- minutes: 25
- topics: 多変量分布, 独立性, 条件付き分布
- techniques: INDEP-NORMAL-1, ANSWER-1
- calculation_load: medium

次を正誤判定し、正しければ根拠、誤りなら反例または不足仮定を示せ。

1. 任意の共分散行列は対称半正定値である。
2. 二乗可積分な$X,Y$で$\operatorname{Cov}(X,Y)=0$なら独立である。
3. jointly normalな$X,Y$で共分散0なら独立である。
4. 多変量正規の条件付き共分散は条件付けた観測値に依存する。
5. 多変量正規の任意の部分ベクトルは多変量正規である。

## Level D：発展

### P3M-D01 条件付き正規公式の導出
- level: D
- minutes: 40
- topics: 多変量正規分布, 条件付き分布, Schur補
- techniques: BLOCK-1, COND-NORMAL-1
- calculation_load: high

P3M-THM-03の設定で、全共分散行列を正定値とする。

1. $B=\Sigma_{12}\Sigma_{22}^{-1}$、$\boldsymbol R=\boldsymbol X_1-\boldsymbol\mu_1-B(\boldsymbol X_2-\boldsymbol\mu_2)$と置き、$\operatorname{Cov}(\boldsymbol R,\boldsymbol X_2)=0$を示せ。
2. $\operatorname{Cov}(\boldsymbol R)$がSchur補$\Sigma_{1\mid2}$であることを示せ。
3. $(\boldsymbol R,\boldsymbol X_2)$がjointly normalであることを示せ。
4. $\boldsymbol R$と$\boldsymbol X_2$の独立性を示せ。
5. 以上から$\boldsymbol X_1\mid(\boldsymbol X_2=\boldsymbol x_2)$の分布を導け。
