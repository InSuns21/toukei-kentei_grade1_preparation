# 問題集

## 問題で使う分布の定義

台の外では密度を0とする。
$$
\begin{aligned}
X\sim\operatorname{Unif}(a,b),\ a<b&:\quad f_X(x)=\frac1{b-a}\boldsymbol{1}_{(a,b)}(x),\\
X\sim\operatorname{Exp}(\lambda),\ \lambda>0&:\quad f_X(x)=\lambda e^{-\lambda x}\boldsymbol{1}_{(0,\infty)}(x),\\
X\sim N(0,1)&:\quad f_X(x)=\frac1{\sqrt{2\pi}}e^{-x^2/2},\quad x\in\mathbb R.
\end{aligned}
$$
Beta$(a,b)$分布（$a,b>0$）を同定するときは、$0<z<1$で$f(z)=z^{a-1}(1-z)^{b-1}/B(a,b)$となることを用いる。累積分布関数（cumulative distribution function; CDF）は$F_X(x)=P(X\leq x)$、モーメント母関数（moment generating function; MGF）は$M_X(t)=E[e^{tX}]$である。

## Level A：基礎部品

### P4-A01 平方変換
- level: A
- minutes: 8
- topics: 一変数変換
- techniques: PREIMAGE-1
- calculation_load: low

$X\sim\operatorname{Unif}(-1,1)$、$Y=X^2$とする。$Y$の台、CDF、密度を求めよ。

### P4-A02 尺度変換
- level: A
- minutes: 7
- topics: 一変数変換, 指数分布
- techniques: PREIMAGE-1
- calculation_load: low

$\lambda>0$とし、$X\sim\operatorname{Exp}(\lambda)$、$Y=2X$とする。$Y$の密度と分布名・パラメータを求めよ。

### P4-A03 一様標本の最大値
- level: A
- minutes: 8
- topics: 最大値
- techniques: EXTREME-1
- calculation_load: low

$X_1,\ldots,X_4$を独立なUnif$(0,1)$とし、$M=\max_iX_i$とする。$M$のCDF、密度、平均を求めよ。

### P4-A04 一様順序統計量
- level: A
- minutes: 8
- topics: 順序統計量, Beta分布
- techniques: ORDER-1
- calculation_load: low

$X_1,\ldots,X_5$を独立なUnif$(0,1)$とする。$X_{(2)}$の分布、平均、分散を求めよ。

## Level B：小問セット

### P4-B01 一様分布の畳込み
- level: B
- minutes: 15
- topics: 和, 畳込み
- techniques: CONV-1, SUPPORT-MAP-1
- calculation_load: medium

独立な$X,Y\sim\operatorname{Unif}(0,1)$について$S=X+Y$の密度とCDFを求めよ。

### P4-B02 指数比
- level: B
- minutes: 15
- topics: 比, Jacobian
- techniques: RATIO-1
- calculation_load: medium

$\lambda,\mu>0$とし、独立な$X\sim\operatorname{Exp}(\lambda)$、$Y\sim\operatorname{Exp}(\mu)$について$R=X/Y$の台、密度、CDFを求めよ。

### P4-B03 極座標変換
- level: B
- minutes: 15
- topics: 多変数変換, Jacobian
- techniques: JACOBIAN-1, SUPPORT-MAP-1
- calculation_load: medium

独立な$X,Y\sim N(0,1)$について$R=\sqrt{X^2+Y^2}$、$\Theta=\operatorname{atan2}(Y,X)\in[0,2\pi)$とする。同時密度、各周辺密度、独立性、$R^2$の分布を求めよ。

### P4-B04 最小値と最大値
- level: B
- minutes: 15
- topics: 最小値, 最大値
- techniques: EXTREME-1
- calculation_load: medium

$X_1,X_2,X_3$を独立なUnif$(0,1)$とし、$U=X_{(1)}$, $V=X_{(3)}$とする。$(U,V)$の同時密度を求め、$P(U>0.2,V<0.8)$を計算せよ。

## Level C：本番標準

### P4-C01 正規変数の平方
- level: C
- minutes: 25
- topics: 非単調変換, 二次形式
- techniques: PREIMAGE-1
- calculation_load: high

$X\sim N(0,1)$、$Y=X^2$とする。

1. $Y$の台と逆像を示せ。
2. $Y$の密度を求めよ。
3. 密度をGamma分布の形で同定せよ。
4. $E[Y]$, $\operatorname{Var}(Y)$を求めよ。
5. $Y$のMGFと存在範囲を求めよ。

### P4-C02 指数変数の和と比率
- level: C
- minutes: 28
- topics: 多変数変換, 和, 比
- techniques: JACOBIAN-1, SUPPORT-MAP-1
- calculation_load: high

$\lambda>0$とし、独立な$X,Y\sim\operatorname{Exp}(\lambda)$とする。
$$
S=X+Y,\qquad U=\frac{X}{X+Y}
$$
とする。

1. 逆変換を求めよ。
2. 変換後の台を求めよ。
3. 逆変換のヤコビアンの絶対値を求めよ。
4. $(S,U)$の同時密度と各周辺分布を求めよ。
5. $S,U$の独立性を示せ。

### P4-C03 第k順序統計量
- level: C
- minutes: 27
- topics: 順序統計量, Beta分布
- techniques: ORDER-1
- calculation_load: high

$n\in\mathbb N$、$1\leq k\leq n$とし、連続な累積分布関数$F$と密度$f$からの独立同分布標本$X_1,\ldots,X_n$を考える。

1. $X_{(k)}\in(x,x+dx)$となる標本配置を分類せよ。
2. $X_{(k)}$の密度を導け。
3. 正規化をBeta積分で確認せよ。
4. $F\{X_{(k)}\}$の分布を示せ。
5. $n=5$, $k=3$, $F(x)=x$（$0<x<1$）のとき平均と分散を求めよ。

### P4-C04 指数標本の両極端
- level: C
- minutes: 25
- topics: 最大値, 最小値, 指数分布
- techniques: EXTREME-1
- calculation_load: medium

$n\in\mathbb N$、$\lambda>0$とし、$X_1,\ldots,X_n$を独立なExp$(\lambda)$とする。$U=X_{(1)}$, $V=X_{(n)}$とする。

1. $U$の生存関数と分布を求めよ。
2. $E[U]$を求めよ。
3. $V$のCDFと密度を求めよ。
4. $0\leq a<b$に対し$P(U>a,V\leq b)$を求めよ。
5. $U,V$が$n\geq2$で独立でないことを説明せよ。

### P4-C05 差・積・比
- level: C
- minutes: 28
- topics: 差, 積, 比
- techniques: CONV-1, RATIO-1, SUPPORT-MAP-1
- calculation_load: high

独立な$X,Y\sim\operatorname{Unif}(0,1)$とする。

1. $D=X-Y$の台と密度を求めよ。
2. $P=XY$の台と密度を求めよ。
3. $R=X/Y$の台と密度を求めよ。
4. 三つの密度が正規化されることを確認せよ。
5. $P(X<Y)$を比$R$から求めよ。

## Level D：発展

### P4-D01 二つの順序統計量
- level: D
- minutes: 40
- topics: 順序統計量, 同時密度
- techniques: ORDER-1
- calculation_load: high

連続CDF$F$、密度$f$からの独立同分布標本サイズ$n$について$1\leq i<j\leq n$とする。

1. $X_{(i)}\in(x,x+dx)$、$X_{(j)}\in(y,y+dy)$（$x<y$）となる配置を分類せよ。
2. 配置数を求めよ。
3. $(X_{(i)},X_{(j)})$の同時密度を導け。
4. $i=1,j=n$として最小・最大の公式を回収せよ。
5. CDF変換により正規化をDirichlet型積分または配置確率から説明せよ。
