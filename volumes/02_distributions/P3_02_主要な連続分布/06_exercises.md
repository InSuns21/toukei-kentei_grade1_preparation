# 問題集

## Level A：基礎部品

### P3C-A01 一様分布
- level: A
- minutes: 7
- topics: 一様分布
- techniques: SUPPORT-1
- calculation_load: low

$X\sim\operatorname{Unif}(2,6)$ のCDF、$P(3<X\leq5)$、平均、分散を求めよ。

### P3C-A02 指数分布
- level: A
- minutes: 7
- topics: 指数分布
- techniques: SURVIVAL-1
- calculation_load: low

$X\sim\operatorname{Exp}(0.5)$ の $P(X>4)$、$P(X>6\mid X>2)$、平均、分散を求めよ。

### P3C-A03 正規標準化
- level: A
- minutes: 7
- topics: 正規分布
- techniques: STANDARDIZE-1
- calculation_load: low

$X\sim N(10,2^2)$ の $P(8<X\leq13)$ を標準正規CDF $\Phi$ で表し、平均と分散を答えよ。

### P3C-A04 Cauchy分布
- level: A
- minutes: 8
- topics: Cauchy分布
- techniques: HEAVYTAIL-1
- calculation_load: low

$X\sim\operatorname{Cauchy}(0,1)$ のCDF、$P(|X|\leq1)$を求め、期待値が存在しない理由を述べよ。

## Level B：小問セット

### P3C-B01 Gamma分布
- level: B
- minutes: 15
- topics: Gamma分布
- techniques: GAMMA-1
- calculation_load: medium

$f(x)=c x^2e^{-2x}\boldsymbol{1}_{(0,\infty)}(x)$ が密度となる$c$を求め、分布名とパラメータ、平均、分散、MGFの存在範囲を示せ。

### P3C-B02 Beta分布
- level: B
- minutes: 15
- topics: Beta分布
- techniques: BETA-1
- calculation_load: medium

$f(x)=c x(1-x)^2\boldsymbol{1}_{(0,1)}(x)$ が密度となる$c$を求め、分布名とパラメータ、平均、分散を示せ。

### P3C-B03 Weibull分布
- level: B
- minutes: 15
- topics: Weibull分布
- techniques: SURVIVAL-1, TRANSFORM-1
- calculation_load: medium

$X\sim\operatorname{Weibull}(2,3)$ とする。生存関数、ハザード、中央値を求め、$Y=(X/3)^2$ の分布を示せ。

### P3C-B04 対数正規とLogistic
- level: B
- minutes: 15
- topics: 対数正規分布, Logistic分布
- techniques: TRANSFORM-1, STANDARDIZE-1
- calculation_load: medium

1. $X\sim\operatorname{Lognormal}(0,1)$ の中央値、平均、分散を求めよ。
2. $Y\sim\operatorname{Logistic}(\mu,s)$ の中央値と第1・第3四分位点を求めよ。

## Level C：本番標準

### P3C-C01 指数和とGamma分布
- level: C
- minutes: 27
- topics: 指数分布, Gamma分布
- techniques: GAMMA-1
- calculation_load: high

独立な $X_1,X_2\sim\operatorname{Exp}(\lambda)$ とし、$S=X_1+X_2$ とする。

1. 畳込みで$S$の密度を求めよ。
2. 分布名とパラメータを示せ。
3. $E[S]$, $\operatorname{Var}(S)$ を求めよ。
4. $P(S>x)$ を求めよ。
5. $S$が指数分布でない理由をハザードまたは無記憶性から述べよ。

### P3C-C02 Beta分布の形とモーメント
- level: C
- minutes: 25
- topics: Beta分布
- techniques: BETA-1
- calculation_load: high

$X\sim\operatorname{Beta}(\alpha,\beta)$、$\alpha>1$, $\beta>1$ とする。

1. 密度の正規化を示せ。
2. $E[X]$ と $E[X^2]$ を導け。
3. 分散を求めよ。
4. 密度の最頻値を求めよ。
5. $1-X$ の分布を示せ。

### P3C-C03 対数正規分布
- level: C
- minutes: 28
- topics: 対数正規分布, 正規分布
- techniques: TRANSFORM-1, HEAVYTAIL-1
- calculation_load: high

$Y\sim N(\mu,\sigma^2)$、$X=e^Y$、$\sigma>0$ とする。

1. $X$の台と密度を求めよ。
2. $E[X^r]$を実数$r$について求めよ。
3. 平均と分散を求めよ。
4. 中央値を求めよ。
5. $t>0$で$E[e^{tX}]=\infty$となる理由を述べよ。

### P3C-C04 Weibull寿命
- level: C
- minutes: 25
- topics: Weibull分布, 信頼性
- techniques: SURVIVAL-1, TRANSFORM-1
- calculation_load: medium

$X\sim\operatorname{Weibull}(c,\eta)$、$c,\eta>0$ とする。

1. CDFと生存関数を求めよ。
2. ハザードを求めよ。
3. ハザードの増減を$c$で分類せよ。
4. $u$分位点（$0<u<1$）を求めよ。
5. $E[X^r]$を求め、その存在条件を示せ。

### P3C-C05 分布選択総合
- level: C
- minutes: 27
- topics: 主要な連続分布
- techniques: SUPPORT-1, ANSWER-1
- calculation_load: medium

次の生成機構に対応する分布名とパラメータを示し、台と平均が存在する場合は平均も書け。

1. 区間$(a,b)$から一様に選ぶ値。
2. 平均$\mu$、分散$\sigma^2$の対称なGaussian誤差。
3. 率$\lambda$のPoisson過程の次の到着までの時間。
4. 同じ率$\lambda$の独立指数待ち時間$r$個の和。
5. 区間$(0,1)$上で密度が$x^{\alpha-1}(1-x)^{\beta-1}$に比例する割合。
6. 独立な標準正規$Z_1,Z_2$の比$Z_1/Z_2$。
7. 対数が$N(\mu,\sigma^2)$となる正値量。
8. 生存関数が$\exp\{-(x/\eta)^c\}$の寿命。
9. CDFが$[1+e^{-(x-\mu)/s}]^{-1}$の実数値変数。

## Level D：発展

### P3C-D01 Logistic分布のMGF
- level: D
- minutes: 40
- topics: Logistic分布, Beta関数, MGF
- techniques: BETA-1, TRANSFORM-1
- calculation_load: high

$X\sim\operatorname{Logistic}(\mu,s)$ とする。

1. $U=F(X)$ がUnif$(0,1)$に従うことを示せ。
2. $X=\mu+s\log\{U/(1-U)\}$ を示せ。
3. $|t|<1/s$でMGFをBeta積分として求めよ。
4. $\Gamma(1+z)\Gamma(1-z)=\pi z/\sin(\pi z)$ を用いてMGFを整理せよ。
5. 対称性とMGFの$t=0$周りの展開から平均・分散を求めよ。
