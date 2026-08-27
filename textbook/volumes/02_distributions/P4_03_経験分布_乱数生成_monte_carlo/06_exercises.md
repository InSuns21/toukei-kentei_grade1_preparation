# 演習問題

## 問題で使う分布の定義

累積分布関数（cumulative distribution function; CDF）は $F_X(x)=P(X\le x)$ と定義する。一様分布 $\operatorname{Unif}(0,1)$ は密度 $f(u)=1$（$0<u<1$、それ以外で0）をもつ。指数分布 $\operatorname{Exp}(\lambda)$ は $\lambda>0$、台 $x\ge0$、密度 $f(x)=\lambda e^{-\lambda x}$、CDF $F(x)=1-e^{-\lambda x}$（$x\ge0$）をもつ。

ベルヌーイ分布（Bernoulli distribution）$\operatorname{Bernoulli}(p)$ は $0\le p\le1$、$P(K=1)=p$、$P(K=0)=1-p$ とする。二項分布（binomial distribution）$\operatorname{Bin}(n,p)$ は $n\in\mathbb N$、$0\le p\le1$、
$$P(K=k)=\binom nkp^k(1-p)^{n-k}\quad(k=0,\ldots,n)$$
を確率質量関数（probability mass function; PMF）にもつ。形状2・率 $\lambda$ のGamma分布は $\lambda>0$、台 $x\ge0$、密度 $f(x)=\lambda^2xe^{-\lambda x}$ をもつ。標準正規分布 $N(0,1)$ は台 $\mathbb R$、密度 $\phi(z)=(2\pi)^{-1/2}e^{-z^2/2}$ をもち、$\Phi(z)=P(Z\le z)=\int_{-\infty}^z\phi(t)dt$ をそのCDFとする。

実過去問を使う復習課題は `09_past_exam_practice.md` に示す。

## Level A

### P4R-A01
- level: A
- minutes: 7
- techniques: EDF-1
標本 $1,2,2,5$ の経験CDFと中央値を求めよ。

### P4R-A02
- level: A
- minutes: 7
- techniques: INV-1
$U\sim\operatorname{Unif}(0,1)$ からExp$(2)$乱数を作れ。

### P4R-A03
- level: A
- minutes: 8
- techniques: MC-1
$\int_0^1u\,du$ のMonte Carlo推定量の平均分散を求めよ。

### P4R-A04
- level: A
- minutes: 8
- techniques: REJECT-1
棄却法で $M=4$ のとき受理率を求めよ。

## Level B

### P4R-B01
- level: B
- minutes: 12
- techniques: EDF-1
固定 $x$ で $F_n(x)$ の平均分散を指示変数から導け。

### P4R-B02
- level: B
- minutes: 14
- techniques: INV-1
CDF $F(x)=x^2$（$0\le x\le1$）をもつ乱数を一様乱数から生成せよ。

### P4R-B03
- level: B
- minutes: 15
- techniques: REJECT-1
$f(x)=2x$、$g(x)=1$（$0<x<1$）の棄却法で最小の $M$ と受理率を求めよ。

### P4R-B04
- level: B
- minutes: 15
- techniques: MC-1
$I=\int_0^1u^2du$ の推定量の分散と標準誤差を求めよ。

## Level C

### P4R-C01 経験CDFから確率推定
- level: C
- minutes: 28
- calculation: medium
- finishability: 25分でCLT区間、28分で最悪時標本数まで完答
- techniques: EDF-1, CLT-1
$F_n(x)$について、1. 指示変数表示、2. 不偏性、3. 分散、4. 固定$x$でのCLT、5. $n=400,F_n(x)=0.3$ の標準誤差と、未知の $F(x)$ を $F_n(x)$ で置き換えるWald型95%近似信頼区間を求めよ。端点が $[0,1]$ の外へ出た場合の処理も述べよ。6. $F(x)$ の値によらず標準誤差を0.02以下にするための十分な標本サイズを求めよ。第3問を得られない場合、第4問以降では $\operatorname{Var}(F_n(x))=F(x)\{1-F(x)\}/n$ を用いてよい。

### P4R-C02 逆関数法総合
- level: C
- minutes: 28
- calculation: medium
- finishability: 25分で和の密度、28分で不偏推定まで完答
- techniques: INV-1
$\lambda>0$ とし、$U\sim\operatorname{Unif}(0,1)$、$X=-\log U/\lambda$ とする。1. 台、2. CDF、3. 密度、4. $E[X]$、5. この方法で独立に生成した2個の和 $T$ の分布、6. $T$ だけを観測したとき $\widehat\lambda=1/T$ が $\lambda$ の不偏推定量であることを示せ。第3問を得られない場合、第4問以降では $f_X(x)=\lambda e^{-\lambda x}$（$x\ge0$）を用いてよい。

### P4R-C03 棄却法総合
- level: C
- minutes: 28
- calculation: high
- finishability: 25分で受理後密度、28分で効率判断まで完答
- techniques: REJECT-1
$f(x)=2x$、$g(x)=1$（$0<x<1$）。各回の提案値と補助一様乱数は、回をまたいでもすべて独立とする。1. $M$、2. 受理条件、3. 受理率、4. 受理後CDF、5. 1000提案の受理数の分布・平均・分散、6. 別の提案法の包絡定数が4で1提案当たりの計算時間が同じとき、1000個の受理値を得るための期待提案回数を比較し、採用法を決めよ。第1問を得られない場合、第2問以降では $M=2$ を用いてよい。

### P4R-C04 Monte Carlo積分
- level: C
- minutes: 28
- calculation: high
- finishability: 25分でCLT標本数、28分でChebyshev保証との比較まで完答
- techniques: MC-1, CLT-1
$I=\int_0^1e^u\,du$。1. 期待値表示、2. 推定量、3. 不偏性、4. 分散、5. 中心極限定理による95%誤差幅を0.01以下にする十分な $N$、6. チェビシェフの不等式 $P(|\widehat I_N-I|\ge\varepsilon)\le\operatorname{Var}(\widehat I_N)/\varepsilon^2$ だけで同じ95%保証を得る $N$ を求め、差を解釈せよ。第4問を得られない場合、第5・6問では $\operatorname{Var}(e^U)=0.242036$ を用いてよい。

### P4R-C05 経験分布からの再標本化
- level: C
- minutes: 27
- calculation: high
- finishability: 25分で再標本化確率、27分で外れ値感度まで完答
- techniques: EDF-1, QUANTILE-1, MC-1
標本 $1,2,3,4,20$ の経験CDFを $F_5$ とする。$F_5$ から独立に生成する再標本値を $X^*$ と書く。1. $F_5$、2. $U\sim\operatorname{Unif}(0,1)$ から $X^*$ を生成する区分的な逆変換、3. $E[X^*]$ と $\operatorname{Var}(X^*)$、4. 独立な再標本値10個の平均の分散、および10個中に20が少なくとも1回現れる確率、5. 20を200へ変えた場合の中央値、$E[X^*]$、$\operatorname{Var}(X^*)$ を求め、中央値と平均の安定性を比較せよ。第3問を得られない場合、第4問では $\operatorname{Var}(X^*)=50$ を用いてよい。

## Level D

### P4R-D01 生成と誤差の統合
- level: D
- minutes: 30
- calculation: high
- finishability: 25分で生成・不偏性・分散、30分で効率比較まで完答
- techniques: INV-1, MC-1, VAR-REDUCE
$U_1,\ldots,U_N\sim\operatorname{Unif}(0,1)$ は独立とし、$X_i=-\log U_i$ とする。1. $X_i$ の分布、2. $E[X_i^2]$、3. $E[X_i]$ のMonte Carlo推定量、4. その分散、5. $U_i$ と $1-U_i$ を対にする推定量の不偏性を示し、独立な一様乱数を $2N$ 個使う単純推定量との分散比較をせよ。第2問を得られない場合、第3問以降では $E[X_i]=1$、$E[X_i^2]=2$、$\operatorname{Var}(X_i)=1$ を用いてよい。第5問では
$$\int_0^1\log u\log(1-u)du=2-\frac{\pi^2}{6}$$
を用いてよい。
