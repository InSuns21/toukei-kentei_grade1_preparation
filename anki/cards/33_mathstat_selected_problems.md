---
id: mathstat-mean-residual-life
title: 生存関数から平均余寿命を求める
category: math-distributions
subcategory: math-continuous-distributions
topic: mean-residual-life
type: formula
difficulty: 3
priority: A
hashtags: [平均余寿命, 生存関数, 指数分布]
frequency: { past_exam: 0, textbook: 1, independent_problems: 0, source_confirmations: 1 }
sources: [{ type: textbook, id: MATHSTAT-CH3-Q21, topic: 平均余寿命 }]
---

## 問題
非負の連続型確率変数 $X$ の生存関数を $S(t)=P(X>t)$ とする。平均余寿命
$$r(t)=E[X-t\mid X>t]$$
を $S$ で表せ。また、$X$ が率 $\lambda>0$ の指数分布に従う場合を計算せよ。

## 使用公式・定理
**この欄の役割：解答で使う定義・公式・定理と、その適用条件**

非負の確率変数 $Y$ には、期待値が有限なら裾積分公式
$$E[Y]=\int_0^\infty P(Y>u)\,du$$
が成り立つ。これを条件付き分布の $Y=X-t$ に適用する。

## 一手
条件付き期待値を直接積分する前に、生存関数の裾積分へ変換する。

## 答え
$$r(t)=\frac{1}{S(t)}\int_t^\infty S(x)\,dx.$$
指数分布では $S(x)=e^{-\lambda x}$ なので、$r(t)=1/\lambda$ であり時点 $t$ に依存しない。

## 計算例
条件 $X>t$ の下で
$$P(X-t>u\mid X>t)=\frac{P(X>t+u)}{P(X>t)}
=\frac{S(t+u)}{S(t)}.$$
したがって
$$r(t)=\int_0^\infty\frac{S(t+u)}{S(t)}\,du
=\frac1{S(t)}\int_t^\infty S(x)\,dx,$$
ここで $x=t+u$ と置換した。指数分布なら
$$r(t)=e^{\lambda t}\int_t^\infty e^{-\lambda x}\,dx
=e^{\lambda t}\frac{e^{-\lambda t}}{\lambda}=\frac1\lambda.$$

## 注意
$X\ge t$ と $X>t$ は連続分布では同じ確率を与えるが、点質量を持つ分布では区別する。
<!-- CARD -->
---
id: mathstat-binomial-beta-tail
title: 二項分布の累積確率をベータ分布へ変換する
category: math-distributions
subcategory: math-discrete-distributions
topic: binomial-beta-tail-identity
type: theorem
difficulty: 3
priority: A
hashtags: [二項分布, ベータ分布, 累積確率]
frequency: { past_exam: 0, textbook: 1, independent_problems: 0, source_confirmations: 1 }
sources: [{ type: textbook, id: MATHSTAT-CH3-Q19, topic: 二項分布とベータ分布 }]
---

## 問題
$X\sim\operatorname{Bin}(n,p)$ とし、$0\le x\le n-1$ は整数とする。二項分布の下側確率 $P(X\le x)$ をベータ分布の確率で表せ。

## 使用公式・定理
**この欄の役割：解答で使う定義・公式・定理と、その適用条件**

ベータ関数と不完全ベータ積分を用いる恒等式
$$\sum_{k=0}^{x}\binom nkp^k(1-p)^{n-k}
=\frac1{B(n-x,x+1)}\int_0^{1-p}t^{n-x-1}(1-t)^x\,dt$$
を使う。ベータ分布 $\operatorname{Beta}(a,b)$ の台は $0<t<1$、密度は
$$f(t)=\frac{t^{a-1}(1-t)^{b-1}}{B(a,b)}$$
である。

## 一手
二項分布の正確な裾確率や比率の正確区間を、ベータ分位点へ結び付ける。

## 答え
$Y\sim\operatorname{Beta}(n-x,x+1)$ とすれば
$$P(X\le x)=P(Y\le1-p).$$

## 計算例
$n=3,p=1/2,x=1$ なら
$$P(X\le1)=\binom30\frac1{2^3}+\binom31\frac1{2^3}
=\frac18+\frac38=\frac12.$$
一方、$Y\sim\operatorname{Beta}(2,2)$ の密度は $6t(1-t)$ なので
$$P(Y\le1/2)=\int_0^{1/2}6t(1-t)\,dt
=\left[3t^2-2t^3\right]_0^{1/2}=\frac12.$$

## 注意
ベータ分布の母数の順序は $(n-x,x+1)$、評価点は $1-p$ である。
<!-- CARD -->
---
id: mathstat-poisson-gamma-tail
title: ポアソン分布の累積確率をガンマ分布へ変換する
category: math-distributions
subcategory: math-discrete-distributions
topic: poisson-gamma-tail-identity
type: theorem
difficulty: 3
priority: A
hashtags: [ポアソン分布, ガンマ分布, 累積確率]
frequency: { past_exam: 0, textbook: 1, independent_problems: 0, source_confirmations: 1 }
sources: [{ type: textbook, id: MATHSTAT-CH3-Q20, topic: ポアソン分布とガンマ分布 }]
---

## 問題
$X\sim\operatorname{Poisson}(\lambda)$ とし、$x\ge1$ は整数とする。$P(X\le x-1)$ をガンマ分布の確率で表せ。

## 使用公式・定理
**この欄の役割：解答で使う定義・公式・定理と、その適用条件**

整数 $x\ge1$ に対するガンマ分布の生存関数は、部分積分を繰り返すことで
$$P(Y\ge y)=\frac1{\Gamma(x)}\int_y^\infty t^{x-1}e^{-t}\,dt
=e^{-y}\sum_{k=0}^{x-1}\frac{y^k}{k!}$$
となる。

## 一手
ポアソンの正確な裾確率をガンマ分位点へ変換し、率母数の正確区間へ接続する。

## 答え
$Y\sim\operatorname{Gamma}(\text{shape}=x,\text{rate}=1)$ とすれば
$$P(X\le x-1)=P(Y\ge\lambda).$$

## 計算例
$\lambda=2,x=2$ なら
$$P(X\le1)=e^{-2}\left(1+2\right)=3e^{-2}.$$
$Y\sim\operatorname{Gamma}(2,1)$ の密度は $te^{-t}$ だから
$$P(Y\ge2)=\int_2^\infty te^{-t}\,dt
=\left[-(t+1)e^{-t}\right]_2^\infty=3e^{-2}.$$

## 注意
ここでのガンマ分布は shape-rate 表記である。
<!-- CARD -->
---
id: mathstat-total-covariance
title: 全共分散の公式で潜在変数による依存を分解する
category: math-probability
subcategory: math-distribution-characteristics
topic: law-of-total-covariance
type: theorem
difficulty: 3
priority: S
hashtags: [全共分散, 条件付き共分散, 潜在変数]
frequency: { past_exam: 0, textbook: 1, independent_problems: 0, source_confirmations: 1 }
sources: [{ type: textbook, id: MATHSTAT-CH4-Q16, topic: 全共分散の公式 }]
---

## 問題
確率変数 $X,Y,Z$ について、$\operatorname{Cov}(X,Y)$ を条件付き共分散と条件付き期待値で分解せよ。

## 使用公式・定理
**この欄の役割：解答で使う定義・公式・定理と、その適用条件**

全期待値の公式 $E[E[X\mid Z]]=E[X]$ と
$$E[XY\mid Z]=\operatorname{Cov}(X,Y\mid Z)+E[X\mid Z]E[Y\mid Z]$$
を使う。

## 一手
「条件付きでは独立」でも、共通の $Z$ が動けば周辺では依存し得る。

## 答え
$$\operatorname{Cov}(X,Y)
=E[\operatorname{Cov}(X,Y\mid Z)]
+\operatorname{Cov}(E[X\mid Z],E[Y\mid Z]).$$

## 計算例
$Z\sim\operatorname{Bernoulli}(1/2)$ とし、$X=Z+\varepsilon_X$、$Y=Z+\varepsilon_Y$ とする。$Z,\varepsilon_X,\varepsilon_Y$ は独立で、誤差の平均は0とする。$Z$ を固定すると誤差だけが変動するので
$$\operatorname{Cov}(X,Y\mid Z)=0.$$
また $E[X\mid Z]=E[Y\mid Z]=Z$ だから
$$\operatorname{Cov}(X,Y)=0+\operatorname{Var}(Z)
=\frac12\left(1-\frac12\right)=\frac14.$$

## 注意
全分散公式は $X=Y$ とした特別な場合である。
<!-- CARD -->
---
id: mathstat-poisson-conditioned-multinomial
title: 独立ポアソン変数を総和で条件付けて多項分布にする
category: math-distributions
subcategory: math-discrete-distributions
topic: conditional-poisson-multinomial
type: calc_step
difficulty: 3
priority: S
hashtags: [ポアソン分布, 多項分布, 条件付き分布]
frequency: { past_exam: 0, textbook: 1, independent_problems: 0, source_confirmations: 1 }
sources: [{ type: textbook, id: MATHSTAT-CH4-Q34, topic: 条件付きポアソン分布 }]
---

## 問題
$X_i\sim\operatorname{Poisson}(\lambda_i)$（$i=1,\ldots,k$）が独立で、$N=\sum_iX_i$ とする。$N=n$ の条件下で $(X_1,\ldots,X_k)$ はどの分布に従うか。

## 使用公式・定理
**この欄の役割：解答で使う定義・公式・定理と、その適用条件**

独立なポアソン変数の和には
$$N\sim\operatorname{Poisson}(\Lambda)$$
が成り立つ。条件付き確率 $P(\boldsymbol X=\boldsymbol x\mid N=n)=P(\boldsymbol X=\boldsymbol x)/P(N=n)$ を使う。

## 一手
独立ポアソンを総和で条件付けると、総強度は消えて構成比だけが残る。

## 答え
$$ (X_1,ldots,X_k)\mid N=n
\sim\operatorname{Multinomial}\left(n;\frac{\lambda_1}{\Lambda},\ldots,\frac{\lambda_k}{\Lambda}\right),
\qquad \Lambda=\sum_{i=1}^k\lambda_i.$$

## 計算例
$x_1+\cdots+x_k=n$ に対し
$$\begin{aligned}
P(\boldsymbol X=\boldsymbol x\mid N=n)
&=\frac{\prod_i e^{-\lambda_i}\lambda_i^{x_i}/x_i!}{e^{-\Lambda}\Lambda^n/n!}\\
&=\frac{n!}{\prod_i x_i!}\prod_i\left(\frac{\lambda_i}{\Lambda}\right)^{x_i}.
\end{aligned}$$
これは多項分布の確率質量関数である。例えば $(\lambda_1,\lambda_2)=(1,2)$、$N=3$ なら
$$X_1\mid N=3\sim\operatorname{Binomial}(3,1/3).$$

## 注意
条件付け後の $X_i$ は、総和が固定されるため独立ではない。
<!-- CARD -->
---
id: mathstat-exponential-spacings
title: 指数標本の順序統計量の間隔を独立な指数分布に直す
category: math-distributions
subcategory: math-sampling-distributions
topic: exponential-order-statistic-spacings
type: theorem
difficulty: 4
priority: A
hashtags: [順序統計量, 指数分布, 間隔]
frequency: { past_exam: 0, textbook: 1, independent_problems: 0, source_confirmations: 1 }
sources: [{ type: textbook, id: MATHSTAT-CH5-Q14, topic: 指数順序統計量の間隔 }]
---

## 問題
$X_1,…,X_n$ が率 $\lambda$ の指数分布からの独立同分布標本で、順序統計量を $X_{(1)}<\cdots<X_{(n)}$ とする。$X_{(0)}=0$ として、互いに独立で同じ指数分布に従う間隔を作れ。

## 使用公式・定理
**この欄の役割：解答で使う定義・公式・定理と、その適用条件**

率 $\lambda$ の独立な指数分布が $m$ 個あるとき、その最小値は率 $m\lambda$ の指数分布に従う。指数分布の無記憶性により、最小値を除いた残りの待ち時間は再び独立な率 $\lambda$ の指数分布になる。

## 一手
指数順序統計量では、まず各段階で「まだ残っている個数」を率に掛ける。

## 答え
$$D_j=(n-j+1)(X_{(j)}-X_{(j-1)}),\qquad j=1,ldots,n$$
とおけば、$D_1,ldots,D_n$ は互いに独立で
$$D_j\sim\operatorname{Exponential}(\text{rate}=\lambda)$$
に従う。

## 計算例
$n=3$ では生の間隔
$$G_1=X_{(1)},\quad G_2=X_{(2)}-X_{(1)},\quad G_3=X_{(3)}-X_{(2)}$$
が独立で、それぞれ率 $3\lambda,2\lambda,\lambda$ の指数分布に従う。定数倍の公式
$$G\sim\operatorname{Exponential}(r)\Rightarrow cG\sim\operatorname{Exponential}(r/c)$$
より
$$3G_1,\quad2G_2,\quad G_3$$
はすべて率 $\lambda$ の指数分布になる。

## 注意
独立なのは順序統計量そのものではなく、隣接する順序統計量の間隔である。
<!-- CARD -->
---
id: mathstat-empirical-cdf-pointwise-clt
title: 経験分布関数の一点での漸近分布を求める
category: math-distributions
subcategory: math-sampling-distributions
topic: empirical-cdf-pointwise-clt
type: calc_step
difficulty: 3
priority: A
hashtags: [経験分布関数, 中心極限定理, 指示変数]
frequency: { past_exam: 0, textbook: 1, independent_problems: 0, source_confirmations: 1 }
sources: [{ type: textbook, id: MATHSTAT-CH5-Q23, topic: 経験分布関数 }]
---

## 問題
$X_1,ldots,X_n$ は累積分布関数 $F$ を持つ母集団からの独立同分布標本である。固定した $x$ における経験分布関数
$$\widehat F_n(x)=\frac1n\sum_{i=1}^n I(X_i\le x)$$
の漸近分布を求めよ。

## 記号・用語
- $\xrightarrow{d}$：分布収束

## 使用公式・定理
**この欄の役割：解答で使う定義・公式・定理と、その適用条件**

固定した $x$ に対し
$$I(X_i\le x)\sim\operatorname{Bernoulli}(F(x)).$$
したがって、ベルヌーイ標本平均に中心極限定理を適用する。

## 一手
経験分布関数を見たら、固定した $x$ ごとに指示変数の標本平均と読む。

## 答え
$0<F(x)<1$ なら
$$\sqrt n\{\widehat F_n(x)-F(x)\}
\xrightarrow{d}N\left(0,F(x)\{1-F(x)\}\right).$$

## 計算例
$F(x)=0.4,n=100$ なら
$$E[\widehat F_n(x)]=0.4,qquad
\operatorname{Var}(\widehat F_n(x))=\frac{0.4(1-0.4)}{100}=0.0024.$$
よって標準誤差は
$$\sqrt{0.0024}\approx0.0490.$$

## 注意
これは一点ごとの中心極限定理であり、$x$ 全体にわたる一様収束や経験過程の主張ではない。
<!-- CARD -->
---
id: mathstat-inverse-variance-weighting
title: 独立な不偏推定量を逆分散で重み付けする
category: math-estimation
subcategory: math-point-estimator-properties
topic: inverse-variance-weighting
type: calc_step
difficulty: 3
priority: S
hashtags: [不偏推定量, 逆分散重み, 最小分散]
frequency: { past_exam: 0, textbook: 1, independent_problems: 0, source_confirmations: 1 }
sources: [{ type: textbook, id: MATHSTAT-CH6-Q9, topic: 線形不偏推定量 }]
---

## 問題
独立な不偏推定量 $T_1,ldots,T_k$ が $E[T_i]=\theta$、$\operatorname{Var}(T_i)=\sigma_i^2$ を満たす。線形不偏推定量 $T=\sum_i a_iT_i$ の分散を最小にする重みを求めよ。

## 使用公式・定理
**この欄の役割：解答で使う定義・公式・定理と、その適用条件**

独立性から
$$\operatorname{Var}\left(\sum_i a_iT_i\right)=\sum_i a_i^2\sigma_i^2.$$
制約 $\sum_i a_i=1$ の下でラグランジュ未定乗数法を使う。

## 一手
精度は分散の逆数で測り、精度に比例して重みを割り当てる。

## 答え
不偏条件は $\sum_i a_i=1$ であり、最小分散重みは
$$a_i=\frac{1/\sigma_i^2}{\sum_{j=1}^k1/\sigma_j^2}.$$
最小分散は
$$\operatorname{Var}(T)=\left(\sum_{j=1}^k\frac1{\sigma_j^2}\right)^{-1}.$$

## 計算例
$$L=\sum_i a_i^2\sigma_i^2-2\eta\left(\sum_i a_i-1\right)$$
とおくと
$$\frac{\partial L}{\partial a_i}=2a_i\sigma_i^2-2\eta=0
\Rightarrow a_i=\frac{\eta}{\sigma_i^2}.$$
総和条件から $\eta=(\sum_j1/\sigma_j^2)^{-1}$ を得る。2個の分散が $4,9$ なら
$$a_1=\frac{1/4}{1/4+1/9}=\frac9{13},\qquad
a_2=\frac4{13},$$
$$\operatorname{Var}(T)=\left(\frac14+\frac19\right)^{-1}=\frac{36}{13}.$$

## 注意
推定量が相関する場合は共分散項が入り、この単純な逆分散重みにはならない。
<!-- CARD -->
---
id: mathstat-gamma-poisson-posterior
title: ガンマ事前分布とポアソン標本の共役更新を行う
category: math-data-analysis
subcategory: math-bayesian-methods
topic: gamma-poisson-conjugacy
type: calc_step
difficulty: 3
priority: S
hashtags: [ベイズ推定, ガンマ分布, ポアソン分布, 共役事前分布]
frequency: { past_exam: 0, textbook: 1, independent_problems: 0, source_confirmations: 1 }
sources: [{ type: textbook, id: MATHSTAT-CH6-Q8, topic: ガンマ・ポアソン共役更新 }]
---

## 問題
$X_1,ldots,X_n\mid\lambda$ は独立に $\operatorname{Poisson}(\lambda)$ に従い、事前分布を shape-rate 表記で $\lambda\sim\operatorname{Gamma}(\alpha,\beta)$ とする。事後分布を求めよ。

## 記号・用語
- 事前分布：データ観測前の母数に関する不確実性を表す分布
- 事後分布：事前分布を尤度で更新した、データ観測後の母数分布

## 使用公式・定理
**この欄の役割：解答で使う定義・公式・定理と、その適用条件**

ガンマ分布の事前密度の核は
$$\pi(\lambda)\propto\lambda^{\alpha-1}e^{-\beta\lambda},\qquad\lambda>0,$$
ポアソン標本の尤度の核は
$$L(\lambda)\propto\lambda^{\sum_i x_i}e^{-n\lambda}$$
である。事後密度は尤度と事前密度の積に比例する。

## 一手
尤度と事前分布を「$\lambda$ のべき」と「指数部」に分け、指数を足す。

## 答え
$$\lambda\mid\boldsymbol X
\sim\operatorname{Gamma}\left(\alpha+\sum_{i=1}^nX_i,\ \beta+n\right).$$
したがって
$$E[\lambda\mid\boldsymbol X]=\frac{\alpha+\sum_iX_i}{\beta+n},qquad
\operatorname{Var}(\lambda\mid\boldsymbol X)=\frac{\alpha+\sum_iX_i}{(\beta+n)^2}.$$

## 計算例
$$\begin{aligned}
\pi(\lambda\mid\boldsymbol x)
&\propto L(\lambda)\pi(\lambda)\\
&\propto\lambda^{\sum_i x_i}e^{-n\lambda}
\lambda^{\alpha-1}e^{-\beta\lambda}\\
&=\lambda^{\alpha+\sum_i x_i-1}e^{-(\beta+n)\lambda}.
\end{aligned}$$
$\alpha=2,\beta=1,n=3,\sum_i x_i=4$ なら事後分布は $\operatorname{Gamma}(6,4)$、事後平均は $6/4=1.5$、事後分散は $6/16=0.375$。

## 注意
scale 表記では更新式が変わるため、rate か scale かを必ず確認する。
<!-- CARD -->
---
id: mathstat-exact-poisson-rate-test
title: 2標本ポアソン率の等値検定を条件付き二項検定へ帰着する
category: math-testing
subcategory: math-various-tests
topic: exact-poisson-rate-test
type: strategy
difficulty: 4
priority: S
hashtags: [ポアソン分布, 正確検定, 条件付き検定, 二項分布]
frequency: { past_exam: 0, textbook: 1, independent_problems: 0, source_confirmations: 1 }
sources: [{ type: textbook, id: MATHSTAT-CH7-Q13, topic: 2標本ポアソン正確検定 }]
---

## 問題
$X_1,\ldots,X_n\sim\operatorname{Poisson}(\lambda)$、$Y_1,\ldots,Y_m\sim\operatorname{Poisson}(\mu)$ は独立とする。$H_0:\lambda=\mu$ の正確な検定を二項分布へ帰着せよ。

## 使用公式・定理
**この欄の役割：解答で使う定義・公式・定理と、その適用条件**

独立ポアソン変数の和と条件付き分布について
$$S\sim\operatorname{Poisson}(n\lambda),\quad
T\sim\operatorname{Poisson}(m\mu),$$
$$S\mid S+T=k\sim\operatorname{Binomial}
\left(k,\frac{n\lambda}{n\lambda+m\mu}\right)$$
が成り立つ。$H_0$ では未知の共通率が約分される。

## 一手
未知の共通率を消すため、総度数で条件付ける。

## 答え
$$S=\sum_{i=1}^nX_i,\qquad T=\sum_{j=1}^mY_j,\qquad K=S+T$$
とすると、$H_0$ の下で
$$S\mid K=k\sim\operatorname{Binomial}\left(k,\frac{n}{n+m}\right).$$
したがって、片側対立 $H_1:\lambda>\mu$ では観測値 $s$ に対する $P(S\ge s\mid K=k)$ を正確な $p$ 値に使える。

## 計算例
$n=m$、$s=8,t=2$ なら $k=10$ で、帰無仮説の下では $S\mid K=10\sim\operatorname{Binomial}(10,1/2)$。片側 $p$ 値は
$$P(S\ge8)=\frac{\binom{10}{8}+\binom{10}{9}+\binom{10}{10}}{2^{10}}
=\frac{45+10+1}{1024}=0.0546875.$$

## 注意
両側の正確 $p$ 値は離散分布なので定義に複数の流儀がある。単純に片側 $p$ 値を2倍する場合は1を上限とする。
<!-- CARD -->
---
id: mathstat-mcnemar-exact-test
title: 対応のある2値データをMcNemar検定で比較する
category: math-testing
subcategory: math-various-tests
topic: mcnemar-test
type: strategy
difficulty: 3
priority: S
hashtags: [McNemar検定, 対応のあるデータ, 二項検定]
frequency: { past_exam: 0, textbook: 1, independent_problems: 0, source_confirmations: 1 }
sources: [{ type: textbook, id: MATHSTAT-CH7-Q17, topic: 対応のある2値データ }]
---

## 問題
同じ対象から得た2つの2値反応について、$(X,Y)=(1,0)$ の度数を $b$、$(0,1)$ の度数を $c$ とする。周辺成功確率が等しいという帰無仮説をどう検定するか。

## 使用公式・定理
**この欄の役割：解答で使う定義・公式・定理と、その適用条件**

周辺成功確率の差は
$$P(X=1)-P(Y=1)=P(X=1,Y=0)-P(X=0,Y=1)$$
だから、帰無仮説は2種類の不一致確率が等しいことと同値である。一致ペア $(0,0),(1,1)$ は差に寄与しない。

## 一手
対応ありの2値比較では、全成功数ではなく不一致ペアだけを見る。

## 答え
不一致ペア数 $b+c$ で条件付けると、帰無仮説の下で
$$B\mid(B+C=b+c)\sim\operatorname{Binomial}(b+c,1/2).$$
これを使う正確二項検定がMcNemar（マクネマー）検定である。大標本では
$$\frac{(b-c)^2}{b+c}\ \dot\sim\ \chi_1^2$$
を使う。

## 計算例
$b=9,c=3$ なら不一致は12組である。両側正確 $p$ 値を対称な裾の2倍で求めると
$$p=2P\{\operatorname{Binomial}(12,1/2)\ge9\}$$
$$=2\frac{\binom{12}{9}+\binom{12}{10}+\binom{12}{11}+\binom{12}{12}}{2^{12}}
=2\frac{220+66+12+1}{4096}\approx0.146.$$

## 注意
独立2標本の比率差検定を使うと、ペア内の対応を無視してしまう。
<!-- CARD -->
---
id: mathstat-p-value-uniformity
title: 連続な帰無分布の下でP値が一様分布になることを示す
category: math-testing
subcategory: math-testing-foundations
topic: p-value-uniformity
type: theorem
difficulty: 3
priority: S
hashtags: [P値, 一様分布, 有意水準]
frequency: { past_exam: 0, textbook: 1, independent_problems: 0, source_confirmations: 1 }
sources: [{ type: textbook, id: MATHSTAT-CH7-Q19, topic: P値の帰無分布 }]
---

## 問題
帰無仮説の下で検定統計量 $W$ が連続な累積分布関数 $F_0$ を持ち、大きいほど帰無仮説に不利とする。$p$ 値 $p(W)=P_0(W'\ge W)$ の帰無分布を求めよ。

## 記号・用語
- 棄却域：帰無仮説を棄却する統計量・標本結果の集合

## 使用公式・定理
**この欄の役割：解答で使う定義・公式・定理と、その適用条件**

連続な累積分布関数に対する確率積分変換
$$F_0(W)\sim U(0,1)$$
を使う。$U\sim U(0,1)$ なら $1-U\sim U(0,1)$ でもある。

## 一手
$p$ 値の妥当性は、帰無仮説の下で小さな $p$ 値が指定割合以上に出ないことで確認する。

## 答え
$$p(W)=1-F_0(W)\sim U(0,1).$$
したがって
$$P_0\{p(W)\le\alpha\}=\alpha,$$
なので棄却域 $p(W)\le\alpha$ は有意水準 $\alpha$ を持つ。

## 計算例
$W\sim U(0,1)$ の上側検定なら
$$p(W)=P(W'\ge W)=1-W.$$
よって
$$P\{p(W)\le0.05\}=P(W\ge0.95)=0.05.$$

## 注意
帰無分布が離散的な場合、通常は $P_0(p\le\alpha)\le\alpha$ となり、一様分布に正確にはならない。
<!-- CARD -->
---
id: mathstat-shortest-probability-interval
title: 最短確率区間の両端で密度が等しいことを使う
category: math-estimation
subcategory: math-interval-estimation
topic: shortest-probability-interval
type: theorem
difficulty: 4
priority: A
hashtags: [最短区間, 密度, 単峰分布]
frequency: { past_exam: 0, textbook: 1, independent_problems: 0, source_confirmations: 1 }
sources: [{ type: textbook, id: MATHSTAT-CH8-Q10, topic: 最短確率区間 }]
---

## 問題
連続で単峰な密度 $f$ に対し、確率 $1-\gamma$ を含む区間 $[a,b]$ のうち長さ $b-a$ が最小となる内部解の必要条件を答えよ。

## 使用公式・定理
**この欄の役割：解答で使う定義・公式・定理と、その適用条件**

制約を保って $a$ を動かすと
$$-f(a)+f(b)\frac{db}{da}=0
\quad\Rightarrow\quad
\frac{db}{da}=\frac{f(a)}{f(b)}.$$
区間長 $L(a)=b(a)-a$ の停留条件 $L'(a)=0$ を使う。

## 一手
確率を固定したまま端点を微小に動かし、区間長の微分を0にする。

## 答え
制約
$$\int_a^b f(x)\,dx=1-\gamma$$
の下で最短となる内部解は
$$f(a)=f(b)$$
を満たす。密度が中心 $m$ に関して対称かつ単峰なら、最短区間も $m$ を中心とする。

## 計算例
$$L'(a)=\frac{db}{da}-1
=\frac{f(a)}{f(b)}-1.$$
したがって $L'(a)=0$ なら $f(a)=f(b)$。標準正規密度は0を中心に対称で単峰なので、確率0.95の最短区間は
$$[-z_{0.975},z_{0.975}]=[-1.96,1.96]$$
となる。

## 注意
台の境界に端点が張り付く場合は内部解でなく、$f(a)=f(b)$ が必要とは限らない。
<!-- CARD -->
---
id: mathstat-fisher-z-confidence-interval
title: フィッシャーのz変換で相関係数の信頼区間を作る
category: math-estimation
subcategory: math-interval-estimation
topic: fisher-z-confidence-interval
type: calc_step
difficulty: 3
priority: S
hashtags: [相関係数, フィッシャーのz変換, 信頼区間]
frequency: { past_exam: 0, textbook: 1, independent_problems: 0, source_confirmations: 1 }
sources: [{ type: textbook, id: MATHSTAT-CH8-Q12, topic: フィッシャーのz変換 }]
---

## 問題
2変量正規標本の標本相関係数が $r$、標本サイズが $n$ のとき、フィッシャーの $z$ 変換による母相関係数 $\rho$ の近似信頼区間を作れ。

## 記号・用語
- SE：標準誤差（standard error）

## 使用公式・定理
**この欄の役割：解答で使う定義・公式・定理と、その適用条件**

近似的な信頼係数 $1-\alpha$ の区間は
$$h(\rho)\in
\left[h(r)-\frac{z_{1-\alpha/2}}{\sqrt{n-3}},
h(r)+\frac{z_{1-\alpha/2}}{\sqrt{n-3}}\right].$$
$h^{-1}(z)=\tanh z$ だから、母相関係数の区間は各端点の $\tanh$ で得る。

## 一手
相関係数をそのまま正規近似せず、まず $h(r)$ に変換して分散を安定化する。

## 答え
$$h(r)=\frac12\log\frac{1+r}{1-r}$$
とおくと
$$h(r)\ \dot\sim\ N\left(h(\rho),\frac1{n-3}\right).$$
したがって $h(\rho)$ の区間を作り、両端を $\tanh$ で逆変換する。

## 計算例
$n=50,r=0.6$ なら
$$h(r)=\frac12\log\frac{1.6}{0.4}=\frac12\log4\approx0.6931,$$
$$\operatorname{SE}=\frac1{\sqrt{47}}\approx0.1459.$$
95%区間は $z$ 尺度で
$$0.6931\pm1.96(0.1459)\approx[0.407,0.979].$$
逆変換して
$$\rho\in[\tanh(0.407),\tanh(0.979)]\approx[0.386,0.753].$$

## 注意
これは2変量正規標本に基づく近似区間であり、小標本や外れ値に強い方法ではない。
<!-- CARD -->
---
id: mathstat-uniform-endpoint-shortest-ci
title: 一様分布の上端母数に最短の正確信頼区間を作る
category: math-estimation
subcategory: math-interval-estimation
topic: uniform-endpoint-shortest-confidence-interval
type: calc_step
difficulty: 4
priority: A
hashtags: [一様分布, 最大値, 最短信頼区間, 非正則モデル]
frequency: { past_exam: 0, textbook: 1, independent_problems: 0, source_confirmations: 1 }
sources: [{ type: textbook, id: MATHSTAT-CH8-Q7, topic: 一様分布の上端母数 }]
---

## 問題
$X_1,\ldots,X_n$ は一様分布 $U(0,\theta)$ からの独立同分布標本で、$M=X_{(n)}$ とする。信頼係数 $1-\gamma$ の最短の正確信頼区間を求めよ。

## 使用公式・定理
**この欄の役割：解答で使う定義・公式・定理と、その適用条件**

$0<y<1$ に対し
$$P_\theta\left(\frac{M}{\theta}\le y\right)
=P_\theta(X_1\le y\theta,\ldots,X_n\le y\theta)=y^n.$$
したがって $Y=M/\theta$ は母数に依存しないピボット量である。

## 一手
最大値を母数で割ってピボット化し、被覆確率の制約を母数について反転する。

## 答え
$0<a<b\le1$ とおく。ピボット量 $Y=M/\theta$ について
$$P(a\le Y\le b)=b^n-a^n$$
だから、被覆確率を $1-\gamma$ にする制約は $b^n-a^n=1-\gamma$ である。また
$$a\le\frac{M}{\theta}\le b
\iff \frac{M}{b}\le\theta\le\frac{M}{a}.$$
この区間の長さは
$$M\left(\frac1a-\frac1b\right).$$
制約から $a=(b^n-1+\gamma)^{1/n}$ である。区間長を $L(b)$ とすると
$$\frac{L'(b)}M
=-\frac{b^{n-1}}{a^{n+1}}+\frac1{b^2}<0$$
である。最後の不等号は $0<a<b$、すなわち $a^{n+1}<b^{n+1}$ から従う。したがって最大の $b=1$ を選び、制約から $a^n=\gamma$、すなわち $a=\gamma^{1/n}$ を得る。よって最短区間は
$$\boxed{\left[M,\frac{M}{\gamma^{1/n}}\right]}.$$

## 計算例
$n=10,\gamma=0.05,M=8$ なら
$$\gamma^{1/n}=0.05^{1/10}\approx0.7411,$$
$$\theta\in[8,8/0.7411]\approx[8,10.79].$$

## 注意
$M\le\theta$ は標本ごとに必ず成り立つ。通常の左右対称な区間を作る問題ではない。
