# 演習問題

## 問題で使う分布の定義

確率質量関数（probability mass function; PMF）は離散型で $P(X=x)$、累積分布関数（cumulative distribution function; CDF）は $F(x)=P(X\leq x)$ である。

以下では $Z\in\{1,2\}$、$P(Z=1)=\pi$、$P(Z=2)=1-\pi$、$0\leq\pi\leq1$ とする。$X\mid Z=j$ の質量関数または密度を $g_j$ と書くと、周辺分布は $g(x)=\pi g_1(x)+(1-\pi)g_2(x)$ である。Poissonは
$$P(X=k\mid\lambda)=e^{-\lambda}\lambda^k/k!,\quad k\in\mathbb N_0,\ \lambda>0,$$
Gammaはshape-rate表示
$$f(\lambda)=\frac{\beta^\alpha}{\Gamma(\alpha)}\lambda^{\alpha-1}e^{-\beta\lambda},\quad \lambda>0,\ \alpha,\beta>0,$$
正規は
$$f_j(x)=\frac{1}{\sqrt{2\pi\sigma_j^2}}e^{-(x-\mu_j)^2/(2\sigma_j^2)},\quad x\in\mathbb R,\ \sigma_j>0.$$

## Level A

### P3L-A01 全確率

- level: A
- minutes: 7
- topics: 混合分布、全確率
- techniques: MIX-PMF-1

$\pi=0.4$、$P(X=0\mid Z=1)=0.2$、$P(X=0\mid Z=2)=0.5$ のとき $P(X=0)$ を求めよ。

### P3L-A02 全期待値

- level: A
- minutes: 7
- topics: 全期待値
- techniques: MIX-MOMENT-1

$P(Z=1)=1/4$、$E[X\mid Z=1]=2$、$E[X\mid Z=2]=6$ のとき $E[X]$ を求めよ。

### P3L-A03 全分散

- level: A
- minutes: 8
- topics: 全分散
- techniques: MIX-VAR-1

$P(Z=1)=1/2$、$\operatorname{Var}(X\mid Z=1)=1$、$\operatorname{Var}(X\mid Z=2)=4$、$E[X\mid Z=1]=0$、$E[X\mid Z=2]=2$ のとき $\operatorname{Var}(X)$ を求めよ。

### P3L-A04 責務の定義

- level: A
- minutes: 8
- topics: Bayes公式、責務
- techniques: RESPONSIBILITY-1

$\pi=1/3$、$g_1(x)=1/2$、$g_2(x)=1/4$ の点で $P(Z=1\mid X=x)$ を求めよ。

## Level B

### P3L-B01 二成分Poisson混合

- level: B
- minutes: 14
- topics: Poisson混合、平均分散
- techniques: MIX-PMF-1, MIX-VAR-1

$P(Z=1)=1/3$、$X\mid Z=1\sim\operatorname{Poisson}(1)$、$X\mid Z=2\sim\operatorname{Poisson}(4)$ とする。

1. $P(X=k)$ を $k\in\mathbb N_0$ について書け。
2. $E[X]$ を求めよ。
3. $\operatorname{Var}(X)$ を全分散公式で求めよ。

### P3L-B02 Poisson--Gamma混合の周辺化

- level: B
- minutes: 16
- topics: Poisson、Gamma、積分
- techniques: POIS-GAMMA-1

$X\mid\Lambda=\lambda\sim\operatorname{Poisson}(\lambda)$、$\Lambda\sim\operatorname{Gamma}(2,3)$ とする。

1. $P(X=k)$ を積分で表せ。
2. $P(X=k)=\dfrac{3^2\Gamma(k+2)}{k!\Gamma(2)4^{k+2}}$ を示せ。
3. $E[X]$ と $\operatorname{Var}(X)$ を求めよ。

### P3L-B03 正規混合の平均分散

- level: B
- minutes: 15
- topics: 正規混合、過分散
- techniques: NORM-MIX-1

$P(Z=1)=\pi$、$X\mid Z=1\sim N(0,1)$、$X\mid Z=2\sim N(3,1)$ とする。

1. $E[X]$ と $\operatorname{Var}(X)$ を求めよ。
2. $\operatorname{Var}(X)$ が1より大きくなる条件を述べよ。
3. $E[X]=1$ となる $\pi$ を求めよ。

### P3L-B04 責務の比較

- level: B
- minutes: 15
- topics: 正規混合、事後確率
- techniques: RESPONSIBILITY-1

$P(Z=1)=1/4$、$X\mid Z=1\sim N(0,1)$、$X\mid Z=2\sim N(3,1)$ とする。

1. $\tau_1(x)=P(Z=1\mid X=x)$ を $\phi$ を用いて書け。
2. $\tau_1(0)$ と $\tau_1(3)$ の大小を比較せよ。
3. $x=3/2$ での $\tau_1(x)$ を求め、$\tau_1(x)=1/2$ にならない理由を述べよ。

## Level C

### P3L-C01 Poisson--Gamma混合から推定へ

- level: C
- minutes: 25
- topics: 階層モデル、負の二項型、モーメント推定
- techniques: POIS-GAMMA-1, MIX-MOMENT-1
- calculation: medium
- finishability: 25分で周辺化・モーメント・一致性まで完答可能

$X_i\mid\Lambda_i\sim\operatorname{Poisson}(\Lambda_i)$、$\Lambda_i\overset{\mathrm{i.i.d.}}{\sim}\operatorname{Gamma}(\alpha,\beta)$、$i=1,\ldots,n$ とする。

1. $P(X_i=k)$ を求めよ。
2. $E[X_i]$ と $\operatorname{Var}(X_i)$ を求めよ。
3. $\bar X$ が $E[X_i]$ の不偏推定量であることを示せ。
4. $\beta$ が既知のとき、$\alpha$ のモーメント推定量を求めよ。
5. $\operatorname{Var}(\bar X)$ を求め、$\bar X$ が $\alpha/\beta$ に確率収束することをChebyshev不等式 $P(|Y-EY|\geq\varepsilon)\leq\operatorname{Var}(Y)/\varepsilon^2$ で示せ。

第1問を得られない場合、第2問以降では $E[X_i]=\alpha/\beta$、$\operatorname{Var}(X_i)=\alpha/\beta+\alpha/\beta^2$ を用いてよい。

### P3L-C02 二成分Poisson混合と責務

- level: C
- minutes: 26
- topics: 混合確率、責務、予測
- techniques: MIX-PMF-1, RESPONSIBILITY-1
- calculation: medium
- finishability: 26分で責務と予測まで完答可能

$P(Z=1)=\pi$、$X\mid Z=1\sim\operatorname{Poisson}(2)$、$X\mid Z=2\sim\operatorname{Poisson}(5)$ とする。観測 $X=3$ の後に、同じ成分から独立に $Y$ が発生する。

1. $P(X=3)$ を求めよ。
2. $P(Z=1\mid X=3)$ を求めよ。
3. $P(Y=0\mid X=3)$ を責務で表せ。
4. $\pi=1/2$ のとき $P(Y=0\mid X=3)$ を計算せよ。
5. 観測後の予測で事前の $\pi$ をそのまま使えない理由を一文で説明せよ。

第2問を得られない場合、第3問以降では $\tau_1=P(Z=1\mid X=3)$ を既知として用いてよい。

### P3L-C03 正規混合と閾値分類

- level: C
- minutes: 25
- topics: 正規混合、損失なし分類、責務
- techniques: NORM-MIX-1, RESPONSIBILITY-1
- calculation: medium
- finishability: 25分で閾値・誤分類・推定まで完答可能

$P(Z=1)=P(Z=2)=1/2$、$X\mid Z=1\sim N(-1,1)$、$X\mid Z=2\sim N(1,1)$ とする。

1. $\tau_2(x)=P(Z=2\mid X=x)$ を書け。
2. $\tau_2(x)>1/2$ となる $x$ の範囲を求めよ。
3. 誤分類確率を $P(\text{分類誤り})$ と書き、標準正規分布のCDF $\Phi$ で表せ。
4. $E[X]$ と $\operatorname{Var}(X)$ を求めよ。
5. 成分平均が既知で混合比が未知のとき、$\bar X$ による混合比のモーメント推定量を求めよ。推定量を $[0,1]$ に制約する場合の投影も述べよ。

第2問を得られない場合、第3問以降では分類境界が0であることを用いてよい。

### P3L-C04 潜在指標が一部観測される場合

- level: C
- minutes: 24
- topics: 完全データ尤度、責務、推定
- techniques: IDENT-1, RESPONSIBILITY-1
- calculation: medium
- finishability: 24分で完全尤度・観測尤度・責務まで完答可能

$(X_i,Z_i)$、$i=1,\ldots,n$ は互いに独立で同じ分布に従うとする。$Z_i\in\{1,2\}$、$P(Z_i=1)=\pi$、$X_i\mid Z_i=j\sim N(\mu_j,1)$ とし、$\mu_1=0,\mu_2=2$ とする。

1. $(X_i,Z_i)$ の完全データ尤度を書け。
2. $Z_i$ が観測されたときの $\pi$ の最尤推定量を求めよ。成分1の観測数が0または$n$の場合も含める。
3. $Z_i$ が観測されないときの観測データ尤度を書け。
4. 現在の $\pi=1/2$ で $X_i=x_i$ を観測したときの責務 $\tau_{i1}$ を書け。
5. 完全データの指示関数を責務に置き換える操作の意味を説明せよ。

第1・2問を得られなくても、第3問以降は各観測の周辺密度 $\pi f_1(x_i)+(1-\pi)f_2(x_i)$ を用いて開始してよい。

### P3L-C05 混合モデルの識別可能性

- level: C
- minutes: 25
- topics: ラベル交換、モーメント、モデル批判
- techniques: IDENT-1, MIX-MOMENT-1
- calculation: medium
- finishability: 25分で反例とモデル注意まで完答可能

二成分正規混合 $\pi N(\mu_1,1)+(1-\pi)N(\mu_2,1)$ を考える。

1. 成分1と成分2を交換しても同じ密度になることを式で示せ。
2. $\mu_1<\mu_2$ という制約がラベル交換を除く理由を説明せよ。
3. $E[X]$ と $\operatorname{Var}(X)$ を $\pi,\mu_1,\mu_2$ で表せ。
4. 平均と分散だけでは一般に3母数を一意に定められないことを、具体例で示せ。
5. 実データで正規混合を使う前に確認すべきモデル上の注意を2つ挙げよ。

第3問を得られない場合、第4問では
$E[X]=\pi\mu_1+(1-\pi)\mu_2$、
$\operatorname{Var}(X)=1+\pi(1-\pi)(\mu_1-\mu_2)^2$
を用いてよい。

## Level D

### P3L-D01 Poisson--Gamma混合大問

- level: D
- minutes: 40
- topics: 階層モデル、周辺化、推定、予測
- techniques: POIS-GAMMA-1, RESPONSIBILITY-1, ANSWER-1
- calculation: high
- finishability: 40分の発展問題。25分で推定までの部分答案を完成可能

$X_i\mid\Lambda_i\sim\operatorname{Poisson}(\Lambda_i)$、$\Lambda_i\overset{\mathrm{i.i.d.}}{\sim}\operatorname{Gamma}(\alpha,\beta)$ とし、各 $X_i$ は対応する $\Lambda_i$ を条件に独立、$\beta$ は既知とする。4では同じ個体を再観測し、$Y\mid\Lambda_1=\lambda\sim\operatorname{Poisson}(\lambda)$ は $X_1$ と条件付き独立とする。

1. $X_i$ の周辺確率質量関数を導出せよ。
2. $E[X_i]$、$\operatorname{Var}(X_i)$、$\operatorname{Var}(\bar X)$ を求めよ。
3. $\widehat\alpha=\beta\bar X$ が不偏で、$n\to\infty$ で $\alpha$ に確率収束することを示せ。
4. 共有潜在率 $\Lambda_1$ による $Y\mid\Lambda_1=\lambda\sim\operatorname{Poisson}(\lambda)$ に対し、観測 $X_1=x$ 後の $P(Y=0\mid X_1=x)$ を求めよ。
5. $\beta$ が未知になるとき、平均だけでは識別できない量を説明し、追加で必要な情報を述べよ。

第1問を得られない場合、第2・3問では
$E[X_i]=\alpha/\beta$、
$\operatorname{Var}(X_i)=\alpha/\beta+\alpha/\beta^2$
を用いてよい。第4問は
$\Lambda_1\mid X_1=x\sim\operatorname{Gamma}(\alpha+x,\beta+1)$
を用いて開始してよい。
