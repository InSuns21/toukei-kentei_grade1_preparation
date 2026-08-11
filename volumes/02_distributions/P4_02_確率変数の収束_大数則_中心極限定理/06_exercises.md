# 演習問題

正規分布 $N(\mu,\sigma^2)$ は $\mu\in\mathbb R,\sigma^2>0$、台 $\mathbb R$、密度
$$f(x)=\frac1{\sigma\sqrt{2\pi}}e^{-(x-\mu)^2/(2\sigma^2)}$$
をもつ。$X\sim\operatorname{Bernoulli}(p)$ は $P(X=0)=1-p,P(X=1)=p$、$B\sim\operatorname{Bin}(n,p)$ は $P(B=k)=\binom nkp^k(1-p)^{n-k}$（$k=0,\ldots,n$）とする。

## 問題で使う分布の定義

$X\sim\operatorname{Bernoulli}(p)$ は $p\in[0,1]$、$P(X=1)=p$。$X\sim\operatorname{Poisson}(\lambda)$ は $\lambda>0$、$P(X=k)=e^{-\lambda}\lambda^k/k!$（$k\in\mathbb N_0$）。$B\sim\operatorname{Bin}(n,p)$ は $n\in\mathbb N,p\in[0,1]$。

## Level A

### P4T-A01
- level: A
- minutes: 7
- techniques: CONV-1
$X_n=1/n$ が0へ確率収束、概収束、分布収束することを示せ。

### P4T-A02
- level: A
- minutes: 7
- techniques: LLN-1
$X_i\sim\operatorname{Bernoulli}(p)$ の標本平均の平均と分散を求めよ。

### P4T-A03
- level: A
- minutes: 8
- techniques: CLT-1
$X_i\sim N(\mu,\sigma^2)$ の標本平均の分布を求めよ。

### P4T-A04
ここでは $\lambda>0$、$n\ge\lceil\lambda\rceil$ とする。
- level: A
- minutes: 8
- techniques: POISSON-APPROX
$B_n\sim\operatorname{Bin}(n,\lambda/n)$ の平均と分散の極限を求めよ。

## Level B

### P4T-B01
- level: B
- minutes: 12
- techniques: CONV-1
$X_n$ が $X$ に確率収束するとき $aX_n+b$ の収束先を示せ。

### P4T-B02
- level: B
- minutes: 14
- techniques: LLN-1
独立同分布で $E|X_1|<\infty$ のとき、$\overline X_n$ の確率収束を大数の法則で説明せよ。

### P4T-B03
- level: B
- minutes: 15
- techniques: CLT-1
$X_i\sim\operatorname{Poisson}(\lambda)$ について、$P(|\overline X_n-\lambda|\le\varepsilon)$ のCLT近似を書け。

### P4T-B04
- level: B
- minutes: 15
- techniques: BIN-NORMAL
$B\sim\operatorname{Bin}(400,0.3)$ の $P(B\le130)$ を連続補正付き正規近似で表せ。

## Level C

### P4T-C01 標本平均から推定
- level: C
- minutes: 25
- calculation: medium
- finishability: 25分で不偏性・一致性・漸近分布まで完答
- techniques: LLN-1, CLT-1
$X_i\sim\operatorname{Poisson}(\lambda)$ を独立に観測し、$\overline X_n$ を用いる。1. $E[\overline X_n],\operatorname{Var}(\overline X_n)$。2. $\overline X_n$ の不偏性。3. 一致性。4. $\sqrt n(\overline X_n-\lambda)$ の極限分布。5. $\lambda=4,n=100$ で $|\overline X_n-\lambda|\le0.4$ の近似確率。

### P4T-C02 二項推定と近似
ここでは $0<p<1$ とする。
- level: C
- minutes: 25
- calculation: medium
- finishability: 25分で推定量と被覆確率まで完答
- techniques: LLN-1, CLT-1, BIN-NORMAL
$X_i\sim\operatorname{Bernoulli}(p)$。1. $\overline X_n$ の平均分散。2. $p$ の不偏推定量。3. 一致性。4. 漸近95%区間を式で示せ。5. $n=400,\hat p=0.3$ の区間を数値化せよ。

### P4T-C03 ポアソン和と近似
- level: C
- minutes: 25
- calculation: high
- finishability: 25分で和の分布・標準化・確率まで完答
- techniques: POISSON-SUM, CLT-1
$X_i\sim\operatorname{Poisson}(\lambda)$ 独立、$T_n=\sum_iX_i$。1. $T_n$ の分布。2. $T_n/n$ の平均分散。3. $T_n$ の正規近似。4. $\lambda$ のMLE。5. $n=50,\lambda=2$ で $T_n\ge120$ を近似せよ。

### P4T-C04 収束概念の反例
- level: C
- minutes: 24
- calculation: medium
- finishability: 24分で各収束の判定と根拠を完答
- techniques: CONV-1
$X_n$ が $1$ と $-1$ を確率1/2でとる独立列とする。1. 分布収束。2. 確率収束。3. 概収束。4. $X_n^2$ の収束。5. 収束概念の含意を整理せよ。

### P4T-C05 二項ポアソン極限
ここでは $\lambda>0$、$n\ge\lceil\lambda\rceil$ とする。
- level: C
- minutes: 25
- calculation: high
- finishability: 25分で極限分布と数値確率まで完答
- techniques: POISSON-APPROX
$B_n\sim\operatorname{Bin}(n,\lambda/n)$。1. PMFの極限。2. 平均分散の極限。3. $P(B_n=0)$。4. $\lambda=3$ のとき $n=300$ で $P(B_n\le2)$ をポアソン近似。5. 近似条件を説明せよ。

## Level D

### P4T-D01 推定量の漸近評価
- level: D
- minutes: 30
- calculation: high
- finishability: 25分で標準化と漸近分布、30分でデルタ法まで完答
- techniques: LLN-1, CLT-1, DELTA-1
$X_i\sim\operatorname{Poisson}(\lambda)$。$\hat\lambda_n=\overline X_n$、$g(x)=\log(1+x)$ とする。1. $\hat\lambda_n$ の一致性。2. $\sqrt n(\hat\lambda_n-\lambda)$ の極限。3. $\sqrt n\{g(\hat\lambda_n)-g(\lambda)\}$ の極限。4. $\lambda=4,n=100$ の $g(\hat\lambda_n)$ の近似分散。5. 近似の仮定を列挙せよ。
