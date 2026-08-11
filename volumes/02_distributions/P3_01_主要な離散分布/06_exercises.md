# 問題集

## 問題で使う分布の定義

以下では$q=1-p$とし、表に書かれていない点での確率は0とする。表の関数を確率質量関数（probability mass function; PMF）という。確率母関数（probability generating function; PGF）は$G_X(s)=E[s^X]$である。

| 分布 | 台 | 確率質量関数 |
|---|---|---|
| Bernoulli$(p)$ | $0\leq p\leq1$; $k\in\{0,1\}$ | $P(X=0)=1-p$, $P(X=1)=p$ |
| Bin$(n,p)$ | $n\in\mathbb N$, $0\leq p\leq1$; $k=0,\ldots,n$ | $P(X=k)=\binom nkp^kq^{n-k}$ |
| Hypergeom$(N,K,n)$ | $N\in\mathbb N$, $K,n\in\{0,\ldots,N\}$; $\max(0,n-N+K)\leq k\leq\min(n,K)$ | $P(X=k)=\binom Kk\binom{N-K}{n-k}/\binom Nn$ |
| Geom$(p)$ | $0<p\leq1$; $k=1,2,\ldots$ | $P(X=k)=q^{k-1}p$ |
| NegBin$(r,p)$ | $r\in\mathbb N$, $0<p\leq1$; $k=r,r+1,\ldots$ | $P(X=k)=\binom{k-1}{r-1}p^rq^{k-r}$ |
| Poisson$(\lambda)$ | $\lambda>0$; $k\in\mathbb N_0$ | $P(X=k)=e^{-\lambda}\lambda^k/k!$ |
| Multinomial$(n;p_1,\ldots,p_m)$ | $m\geq2$, $n\in\mathbb N$, $p_i\geq0$, $\sum_i p_i=1$; $x_i\in\mathbb N_0$, $\sum_i x_i=n$ | $P(\boldsymbol X=\boldsymbol x)=n!\prod_i p_i^{x_i}/\prod_i x_i!$ |

## Level A

### P3-A01 二項確率
- level: A
- minutes: 7
- topics: 二項分布
- techniques: BINOM-1
- calculation_load: low

$X\sim\operatorname{Bin}(5,0.2)$ の $P(X=2)$、平均、分散を求めよ。

### P3-A02 幾何待ち時間
- level: A
- minutes: 7
- topics: 幾何分布
- techniques: WAIT-1
- calculation_load: low

$X\sim\operatorname{Geom}(0.25)$ の $P(X=4)$、平均、分散を求めよ。

### P3-A03 Poisson確率
- level: A
- minutes: 7
- topics: Poisson分布
- techniques: POIS-1
- calculation_load: low

$X\sim\operatorname{Poisson}(2)$ の $P(X\leq1)$、平均、分散を求めよ。

### P3-A04 Bernoulli分布
- level: A
- minutes: 6
- topics: Bernoulli分布
- techniques: BINOM-1
- calculation_load: low

成功確率0.3の一回の試行の成功指示変数を$I$とする。$I$のPMF、平均、分散を求めよ。

## Level B

### P3-B01 非復元抽出
- level: B
- minutes: 14
- topics: 超幾何分布
- techniques: HYPER-1
- calculation_load: medium

20個中6個が不良である。非復元で5個選ぶ不良数$X$について、台、$P(X=2)$、平均、分散を求めよ。

### P3-B02 3回目の成功
- level: B
- minutes: 13
- topics: 負の二項分布
- techniques: WAIT-1
- calculation_load: medium

成功確率0.4の独立試行で3回目の成功までの試行回数を$T$とする。$P(T=5)$、平均、分散を求めよ。

### P3-B03 三カテゴリ
- level: B
- minutes: 15
- topics: 多項分布
- techniques: MULTI-1
- calculation_load: medium

$\boldsymbol X\sim\operatorname{Multinomial}(6;0.2,0.3,0.5)$ とする。$P(X_1=1,X_2=2,X_3=3)$、$E[X_1]$、$\operatorname{Cov}(X_1,X_2)$ を求めよ。

## Level C

### P3-C01 復元・非復元の比較
- level: C
- minutes: 25
- topics: 二項分布、超幾何分布
- techniques: MODEL-1, BINOM-1, HYPER-1
- calculation_load: medium

100個中20個が成功である。

1. 復元して10回抽出する成功数の分布を示せ。
2. 非復元で10個抽出する成功数の分布と台を示せ。
3. 両平均を求めよ。
4. 両分散を求めよ。
5. 非復元側の分散が小さい理由を説明せよ。

### P3-C02 待ち時間と無記憶性
- level: C
- minutes: 24
- topics: 幾何分布、負の二項分布
- techniques: WAIT-1
- calculation_load: medium

$X\sim\operatorname{Geom}(p)$、$0<p<1$ とし、$m,n\in\mathbb N_0$ とする。

1. $P(X>m)$ を求めよ。
2. $P(X>m+n\mid X>m)=P(X>n)$ を示せ。
3. 2回目の成功までの試行回数$T$のPMFを求めよ。
4. $E[T]$, $\operatorname{Var}(T)$ を求めよ。
5. $T$ が幾何分布でない理由を台と無記憶性から述べよ。

### P3-C03 Poisson和と条件付き分布
- level: C
- minutes: 28
- topics: Poisson分布、二項分布
- techniques: POIS-1, BINOM-1
- calculation_load: high

独立な $X\sim\operatorname{Poisson}(\lambda)$, $Y\sim\operatorname{Poisson}(\mu)$ とする。

$n\in\mathbb N_0$ とし、条件付き確率では $k=0,\ldots,n$ とする。

1. $S=X+Y$ の分布を求めよ。
2. $P(X=k,S=n)$ を求めよ。
3. $P(X=k\mid S=n)$ を求めよ。
4. 条件付き分布名とパラメータを示せ。
5. 条件付き平均を求めよ。

### P3-C04 多項分布の集約
- level: C
- minutes: 25
- topics: 多項分布、共分散
- techniques: MULTI-1, COV-1
- calculation_load: medium

$\boldsymbol X\sim\operatorname{Multinomial}(n;p_1,p_2,p_3)$ とし、$p_1>0$, $p_2>0$ とする。

1. 各周辺分布を示せ。
2. $X_1+X_2$ の分布を示せ。
3. $\operatorname{Var}(X_1+X_2)$ を共分散公式で求めよ。
4. 二項分布の公式と一致することを確認せよ。
5. $\operatorname{Cov}(X_1,X_2)<0$ の直観を述べよ。

### P3-C05 分布選択総合
- level: C
- minutes: 25
- topics: 離散分布の選択
- techniques: MODEL-1, ANSWER-1
- calculation_load: medium

次の各変数について分布名・パラメータ・台・平均を示せ。

1. 成功確率0.1の独立試行20回の成功数。
2. 50個中成功10個から非復元で8個選ぶ成功数。
3. 成功確率0.2で初成功までの回数。
4. 長さ$t$の区間の発生件数がPoisson$(\lambda t)$に従うPoisson過程について、平均3件となる指定区間内の発生件数。
5. 10回の独立試行を確率$(0.2,0.3,0.5)$の三分類へ分けた度数。

## Level D

### P3-D01 Poisson thinning
- level: D
- minutes: 40
- topics: Poisson分布、二項分布、独立
- techniques: POIS-1, BINOM-1, PGF-1
- calculation_load: high

$\lambda>0$, $0<p<1$ とする。$N\sim\operatorname{Poisson}(\lambda)$ とし、各件を独立に確率$p$でA、確率$q=1-p$でBへ分類する。A,Bの件数を$X,Y$とする。$X\sim\operatorname{Poisson}(\lambda p)$、$Y\sim\operatorname{Poisson}(\lambda q)$、かつ$X,Y$が独立であることを同時PMFから証明せよ。
