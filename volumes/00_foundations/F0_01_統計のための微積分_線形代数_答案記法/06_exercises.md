# 問題集

各問題に `id`、`level`、`minutes`、`topics`、`techniques`、`calculation_load` を付ける。

## 問題で使う分布の定義

本章には前提章がないため、入力分布をここに示す。台の外では密度を0とする。
$$
\begin{aligned}
X\sim\operatorname{Unif}(a,b),\ a<b&:\quad f_X(x)=\frac1{b-a}\boldsymbol{1}_{(a,b)}(x),\\
X\sim\operatorname{Exp}(\lambda),\ \lambda>0&:\quad f_X(x)=\lambda e^{-\lambda x}\boldsymbol{1}_{(0,\infty)}(x),\\
X\sim N(0,1)&:\quad f_X(x)=\frac1{\sqrt{2\pi}}e^{-x^2/2},\quad x\in\mathbb R.
\end{aligned}
$$
独立な連続変数の同時密度は各密度の積である。期待値、分散、尤度、最尤推定量は`02_definitions.md`冒頭の最小定義を用いる。

## Level A：基礎部品

### F0-A01 端点での可積分性

- level: A
- minutes: 6
- topics: 積分、期待値の存在
- techniques: CALC-1
- calculation_load: low

実数 $a$ に対し、$\int_0^1x^a\,dx$ が有限になる必要十分条件を求め、有限な場合の値を計算せよ。

### F0-A02 勾配とHessian

- level: A
- minutes: 7
- topics: 多変数微分、二次形式
- techniques: CALC-1
- calculation_load: low

$g(\boldsymbol{x})=\boldsymbol{x}^{\mathsf T}\boldsymbol{A}\boldsymbol{x}-2\boldsymbol{b}^{\mathsf T}\boldsymbol{x}$ とする。ただし $\boldsymbol{A}$ は $p\times p$ 実対称行列、$\boldsymbol{b}\in\mathbb{R}^p$ である。$\nabla g$ と $\nabla^2g$ を求めよ。

### F0-A03 固有値と正定値性

- level: A
- minutes: 8
- topics: 固有値、正定値性
- techniques: QUAD-1
- calculation_load: low

$$
\boldsymbol{A}=
\begin{pmatrix}
3&1\\
1&3
\end{pmatrix}
$$

の固有値を求め、$\boldsymbol{A}$ が正定値であることを示せ。

### F0-A04 射影行列

- level: A
- minutes: 8
- topics: 射影、rank
- techniques: PROJ-1
- calculation_load: low

$\boldsymbol{u}\in\mathbb{R}^n$、$\boldsymbol{u}\neq\boldsymbol{0}$ とし、

$$
\boldsymbol{P}=\frac{\boldsymbol{u}\boldsymbol{u}^{\mathsf T}}
{\boldsymbol{u}^{\mathsf T}\boldsymbol{u}}
$$

とおく。$\boldsymbol{P}$ が直交射影行列であることを示し、rankを求めよ。

## Level B：小問セット

### F0-B01 Gamma型密度

- level: B
- minutes: 12
- topics: 正規化、期待値
- techniques: CALC-1、部分積分
- calculation_load: medium

$\theta>0$ とし、

$$
f_\theta(x)=c(\theta)x^2e^{-\theta x}\boldsymbol{1}_{(0,\infty)}(x)
$$

とする。(1) $c(\theta)$ を求めよ。(2) $E_\theta[X]$ を求めよ。

### F0-B02 和と差への変換

- level: B
- minutes: 15
- topics: 変数変換、領域
- techniques: JAC-1
- calculation_load: medium

$X,Y$ は独立に $(0,1)$ 上の一様分布に従う。すなわち$f_X(x)=f_Y(x)=\boldsymbol{1}_{(0,1)}(x)$である。$U=X+Y$、$V=X-Y$ とする。$(U,V)$ の同時密度を、台を明記して求めよ。

### F0-B03 線形変換の共分散

- level: B
- minutes: 12
- topics: 線形結合、共分散行列
- techniques: 行列計算
- calculation_load: medium

$E[\boldsymbol{X}]=\boldsymbol{\mu}$、$\operatorname{Cov}(\boldsymbol{X})=\boldsymbol{\Sigma}$ とする。定数行列 $\boldsymbol{A}$ と定数ベクトル $\boldsymbol{b}$ に対し、$\boldsymbol{Y}=\boldsymbol{A}\boldsymbol{X}+\boldsymbol{b}$ の平均と共分散行列を導け。

### F0-B04 停留点と最大点

- level: B
- minutes: 10
- topics: 論理、最適化
- techniques: CALC-1、反例
- calculation_load: low

「微分可能な関数 $h$ が $h'(a)=0$ を満たせば、$a$ は $h$ の局所最大点である」という主張を反例で否定せよ。その後、内部の停留点を狭義局所最大点と結論するために追加確認すべき事項を二つ挙げよ。さらに、大域的最大点と結論するには別の確認が必要である理由を述べよ。

## Level C：本番標準

### F0-C01 台が母数に依存する最尤推定

- level: C
- minutes: 24
- topics: 尤度、順序統計量、バイアス補正
- techniques: CALC-1、ANSWER-1
- calculation_load: medium

$X_1,\ldots,X_n$ は独立に $[0,\theta]$ 上の一様分布に従う。ただし $\theta>0$、$n\geq2$ とし、各変数の密度は
$$
f_\theta(x)=\frac1\theta\boldsymbol{1}_{[0,\theta]}(x)
$$
とする。

1. 尤度を書き、$\theta$ の最尤推定量を求めよ。
2. $M=X_{(n)}=\max_iX_i$ の分布関数と密度を求めよ。
3. $E_\theta[M]$ を求め、$M$ を定数倍した $\theta$ の不偏推定量を構成せよ。
4. 最尤推定量が不偏でないことと、微分だけでは導けない理由を説明せよ。

### F0-C02 二次形式と主成分方向

- level: C
- minutes: 22
- topics: 固有値、二次形式、主成分
- techniques: QUAD-1、ANSWER-1
- calculation_load: medium

共分散行列

$$
\boldsymbol{\Sigma}=
\begin{pmatrix}
4&2\\
2&4
\end{pmatrix}
$$

を考える。

1. 固有値と単位固有ベクトルを求めよ。
2. $\boldsymbol{a}^{\mathsf T}\boldsymbol{\Sigma}\boldsymbol{a}$ を $\lVert\boldsymbol{a}\rVert=1$ の下で最大化せよ。
3. 最大化方向を第一主成分方向と呼ぶ理由を、線形結合の分散を用いて説明せよ。
4. $\boldsymbol{\Sigma}$ が正定値であることを二通りの方法で確認せよ。

### F0-C03 最小二乗と残差の直交性

- level: C
- minutes: 25
- topics: 線形モデル、射影、残差
- techniques: PROJ-1、ANSWER-1
- calculation_load: high

単回帰モデル $y_i=\beta_0+\beta_1x_i+\varepsilon_i$ を考える。$x_1=-1,x_2=0,x_3=1$、観測値が $y_1,y_2,y_3$ である。

1. 計画行列 $\boldsymbol{X}$ を書き、列フルランクであることを示せ。
2. $\widehat{\beta}_0,\widehat{\beta}_1$ を求めよ。
3. hat matrix $\boldsymbol{H}$ を求めよ。
4. 残差 $\widehat{\boldsymbol{\varepsilon}}$ が $\boldsymbol{X}$ の各列と直交することを確認せよ。

### F0-C04 異なる率をもつ指数変数

- level: C
- minutes: 27
- topics: 二変数変換、周辺密度
- techniques: JAC-1、ANSWER-1
- calculation_load: high

$X\sim\operatorname{Exp}(\lambda)$、$Y\sim\operatorname{Exp}(\mu)$ は独立で、$\lambda,\mu>0$ とする。すなわち
$$
f_X(x)=\lambda e^{-\lambda x}\boldsymbol{1}_{(0,\infty)}(x),\qquad
f_Y(y)=\mu e^{-\mu y}\boldsymbol{1}_{(0,\infty)}(y).
$$
$U=X+Y$、$V=X/(X+Y)$ とおく。

1. $(U,V)$ の台を求めよ。
2. $(U,V)$ の同時密度を求めよ。
3. $V$ の周辺密度を求めよ。
4. $U$ と $V$ が独立となるための必要十分条件を求めよ。

## Level D：発展

### F0-D01 一対一でない変換

- level: D
- minutes: 35
- topics: 非単射変換、カイ二乗分布
- techniques: JAC-1、逆像の枝
- calculation_load: high

$X\sim N(0,1)$、すなわち
$$
f_X(x)=\frac1{\sqrt{2\pi}}e^{-x^2/2},\qquad x\in\mathbb R,
$$
とし、$Y=X^2$ とする。

1. $y>0$ に対する逆像を全て求めよ。
2. 各逆像の寄与を足して $Y$ の密度を導け。
3. 導いた密度が1へ積分されることを確認せよ。
4. $E[Y]$ を密度から求め、$E[X^2]$ と一致することを確認せよ。
