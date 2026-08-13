---
id: dist-mgf-poisson
title: Poisson分布のモーメント母関数から平均を取り出す
category: math-probability
subcategory: math-distribution-functions
topic: moment-generating-function
type: calc_step
difficulty: 2
priority: B
hashtags: [MGF, Poisson分布, 微分]
frequency: { past_exam: 0, textbook: 0, independent_problems: 0, source_confirmations: 0 }
sources: [{ type: official_syllabus, topic: 母関数 }]
---
## 問題
$X$ はPoisson分布 $\operatorname{Poisson}(\lambda)$ に従うとする。台は $\mathbb N_0$、$\lambda>0$、$P(X=x)=e^{-\lambda}\lambda^x/x!$ である。MGFから $E[X]$ を求めよ。
## 答え
モーメント母関数 $M_X(t)=E[e^{tX}]$ を1回微分して $t=0$ を代入する。
## 使用公式・定理
$$E[X]=M_X'(0),\qquad M_X(t)=\exp\{\lambda(e^t-1)\}.$$
## 計算例
$$\begin{aligned}M_X'(t)&=\lambda e^t\exp\{\lambda(e^t-1)\},\\M_X'(0)&=\lambda\cdot1\cdot e^0=\lambda.\end{aligned}$$
## 注意
モーメント母関数が0の近傍で有限であることを確認する。

<!-- CARD -->
---
id: dist-convolution-uniform
title: 一様分布の和を畳み込みで求める
category: math-probability
subcategory: math-transformations
topic: convolution
type: strategy
difficulty: 3
priority: B
hashtags: [畳み込み, support, 一様分布]
frequency: { past_exam: 0, textbook: 0, independent_problems: 0, source_confirmations: 0 }
sources: [{ type: official_syllabus, topic: 確率変数の和 }]
---
## 問題
独立な $X,Y$ は一様分布 $U(0,1)$ に従うとする。密度は $f(x)=1$（$0<x<1$）、それ以外で0である。$Z=X+Y$ の密度を求めよ。
## 方針
畳み込みを立て、$0<x<1$ と $0<z-x<1$ の共通範囲を積分する。
## 使用公式・定理
$$f_Z(z)=\int_{-\infty}^{\infty}f_X(x)f_Y(z-x)\,dx.$$
## 計算例
条件は $\max(0,z-1)<x<\min(1,z)$。したがって
$$f_Z(z)=\begin{cases}\int_0^z1\,dx=z&(0<z<1),\\\int_{z-1}^11\,dx=2-z&(1\le z<2),\\0&\text{otherwise}.\end{cases}$$
## 注意
公式より先に積分区間を台から決める。

<!-- CARD -->
---
id: dist-order-max
title: 最大値の分布を累積分布関数から求める
category: math-estimation
subcategory: math-population-sample-statistic
topic: order-statistics
type: strategy
difficulty: 2
priority: B
hashtags: [順序統計量, CDF, 最大値]
frequency: { past_exam: 0, textbook: 0, independent_problems: 0, source_confirmations: 0 }
sources: [{ type: official_syllabus, topic: 順序統計量 }]
---
## 問題
$X_1,X_2$ は独立同分布に一様分布 $U(0,1)$ に従い、$M=\max(X_1,X_2)$ とする。$M$ の密度を求めよ。
## 方針
最大値が $m$ 以下とは、全標本が $m$ 以下ということなので累積分布関数から始める。
## 使用公式・定理
$$F_M(m)=P(M\le m)=\{F_X(m)\}^n.$$
## 計算例
$0<m<1$ では $F_X(m)=m$ だから
$$F_M(m)=m^2,\qquad f_M(m)=\frac{d}{dm}m^2=2m.$$
台の外では密度は0で、$\int_0^12m\,dm=1$。
## 注意
密度を出した後も台を残す。

<!-- CARD -->
---
id: est-moments-exponential
title: 指数分布のモーメント法推定量を求める
category: math-estimation
subcategory: math-estimation-methods
topic: method-of-moments
type: strategy
difficulty: 2
priority: B
hashtags: [モーメント法, 指数分布, 標本平均]
frequency: { past_exam: 0, textbook: 0, independent_problems: 0, source_confirmations: 0 }
sources: [{ type: official_syllabus, topic: モーメント法 }]
---
## 問題
$X_i$ は独立同分布に指数分布 $\operatorname{Exp}(\lambda)$ に従うとする。台は $x>0$、$\lambda>0$、密度は $f(x)=\lambda e^{-\lambda x}$。$\lambda$ のモーメント法推定量を求めよ。
## 方針
母平均と標本平均を等置して母数について解く。
## 使用公式・定理
$$E[X]=\frac1\lambda,\qquad \overline X=\frac1n\sum_{i=1}^nX_i.$$
## 計算例
$$\begin{aligned}\overline X&=\frac1\lambda,\\\lambda\overline X&=1,\\\widehat\lambda_{\mathrm{MM}}&=\frac1{\overline X}.\end{aligned}$$
$x=(1,2,3)$ なら $\overline x=2$ より推定値は $1/2$。
## 注意
rate母数化を使っている。

<!-- CARD -->
---
id: est-fisher-bernoulli
title: Bernoulli分布のFisher情報量を求める
category: math-estimation
subcategory: math-asymptotic-estimation
topic: fisher-information
type: calc_step
difficulty: 3
priority: B
hashtags: [Fisher情報, Bernoulli分布, スコア]
frequency: { past_exam: 0, textbook: 0, independent_problems: 0, source_confirmations: 0 }
sources: [{ type: official_syllabus, topic: Fisher情報量 }]
---
## 問題
$X$ はBernoulli分布 $\operatorname{Bernoulli}(p)$ に従い、$X\in\{0,1\}$、$0<p<1$、$P(X=x)=p^x(1-p)^{1-x}$ とする。1観測当たりのFisher情報量を求めよ。
## 答え
対数尤度を2回微分し、負の期待値を取る。
## 使用公式・定理
正則条件の下で $I_1(p)=-E[\ell''(p;X)]$。
## 計算例
$$\begin{aligned}\ell(p;X)&=X\log p+(1-X)\log(1-p),\\\ell''(p;X)&=-\frac X{p^2}-\frac{1-X}{(1-p)^2},\\I_1(p)&=\frac p{p^2}+\frac{1-p}{(1-p)^2}=\frac1{p(1-p)}.\end{aligned}$$
## 注意
標本全体なら $I_n(p)=nI_1(p)$。

<!-- CARD -->
---
id: est-cramer-rao-bernoulli
title: Cramér--Rao下限へ情報量を代入する
category: math-estimation
subcategory: math-asymptotic-estimation
topic: cramer-rao
type: formula
difficulty: 2
priority: B
hashtags: [CRLB, Fisher情報, 不偏推定]
frequency: { past_exam: 0, textbook: 0, independent_problems: 0, source_confirmations: 0 }
sources: [{ type: official_syllabus, topic: Cramér--Rao不等式 }]
---
## 問題
Bernoulli標本 $X_1,\ldots,X_n$ から $p$ を不偏推定する。分散のCramér--Rao下限を求めよ。
## 答え
1観測当たりの情報量 $I_1(p)=1/[p(1-p)]$ を標本全体の情報量へ直す。
## 使用公式・定理
$g(p)=p$ の不偏推定量 $T$ に対し、正則条件の下で
$$\operatorname{Var}_p(T)\ge\frac{\{g'(p)\}^2}{I_n(p)}.$$
## 計算例
$$\begin{aligned}I_n(p)&=\frac n{p(1-p)},\\\operatorname{Var}_p(T)&\ge\frac1{I_n(p)}=\frac{p(1-p)}n.\end{aligned}$$
$T=\overline X$ はこの下限に等しい。
## 注意
不偏性と正則条件が必要である。

<!-- CARD -->
---
id: est-aic-choice
title: AICでモデルを比較する
category: math-estimation
subcategory: math-model-selection
topic: aic
type: formula
difficulty: 1
priority: B
hashtags: [AIC, モデル選択, 尤度]
frequency: { past_exam: 0, textbook: 0, independent_problems: 0, source_confirmations: 0 }
sources: [{ type: official_syllabus, topic: AIC }]
---
## 問題
モデルAは最大対数尤度 $-100$、母数数3、モデルBは $-97$、母数数7である。AICで選べ。
## 答え
AICが小さいモデルを選ぶ。
## 使用公式・定理
$$\operatorname{AIC}=-2\ell(\widehat\theta)+2k.$$
## 計算例
$$\operatorname{AIC}_A=-2(-100)+2\cdot3=206,$$
$$\operatorname{AIC}_B=-2(-97)+2\cdot7=208.$$
$206<208$ なのでAを選ぶ。
## 注意
母数数のペナルティを忘れない。

<!-- CARD -->
---
id: test-z-rejection
title: 両側Z検定の棄却域を作る
category: math-testing
subcategory: math-testing-foundations
topic: z-test
type: strategy
difficulty: 2
priority: B
hashtags: [検定, 棄却域, 正規分布]
frequency: { past_exam: 0, textbook: 0, independent_problems: 0, source_confirmations: 0 }
sources: [{ type: official_syllabus, topic: 正規母集団の検定 }]
---
## 問題
$X_i$ は独立同分布に正規分布 $N(\mu,4)$ に従い、$n=100$ とする。$H_0:\mu=10$ 対 $H_1:\mu\ne10$ を有意水準5%で検定する。$\overline x=10.5$ の結論は？
## 方針
帰無仮説の平均で中心化し、既知の標準誤差で割る。
## 使用公式・定理
$H_0$ の下で $Z=(\overline X-10)/(2/\sqrt{100})\sim N(0,1)$。両側5%の棄却域は $|Z|>1.96$。
## 計算例
$$Z=\frac{10.5-10}{2/10}=\frac{0.5}{0.2}=2.5.$$
$2.5>1.96$ だから $H_0$ を棄却する。
## 注意
対立仮説が両側なので両端へ2.5%ずつ配る。

<!-- CARD -->
---
id: test-likelihood-ratio
title: 尤度比検定統計量を制約付きMLEから作る
category: math-testing
subcategory: math-test-derivation
topic: likelihood-ratio-test
type: strategy
difficulty: 3
priority: B
hashtags: [尤度比検定, MLE, 漸近分布]
frequency: { past_exam: 0, textbook: 0, independent_problems: 0, source_confirmations: 0 }
sources: [{ type: official_syllabus, topic: 尤度比検定 }]
---
## 問題
無制約の最大対数尤度が $-40$、帰無仮説の制約下で $-42$ である。制約数1の尤度比検定統計量を求めよ。
## 方針
制約下と無制約の最大対数尤度の差を $-2$ 倍する。
## 使用公式・定理
正則条件の下で、検定統計量はカイ二乗分布へ収束し、
$$-2\log\Lambda=2\{\ell(\widehat\theta)-\ell(\widetilde\theta)\}\xrightarrow{d}\chi^2_r.$$
## 計算例
$$-2\log\Lambda=2\{-40-(-42)\}=2\cdot2=4.$$
自由度は制約数 $r=1$。
## 注意
制約下の最大尤度は無制約より大きくならない。

<!-- CARD -->
---
id: data-bayes-beta
title: Beta--Bernoulli共役更新を行う
category: math-data-analysis
subcategory: math-bayesian-methods
topic: bayes-estimation
type: strategy
difficulty: 2
priority: B
hashtags: [Bayes, 共役事前分布, 事後分布]
frequency: { past_exam: 0, textbook: 0, independent_problems: 0, source_confirmations: 0 }
sources: [{ type: official_syllabus, topic: Bayes法 }]
---
## 問題
$p$ はBeta分布 $\operatorname{Beta}(2,3)$ に従うとし、Bernoulli試行5回で成功3回とする。事後分布を求めよ。
## 方針
事前密度の $p$ と $1-p$ の指数へ成功数・失敗数を足す。
## 使用公式・定理
Beta分布の台は $0<p<1$、密度は $p^{a-1}(1-p)^{b-1}/B(a,b)$。成功 $s$、失敗 $f$ なら事後分布は $\operatorname{Beta}(a+s,b+f)$。
## 計算例
$$\pi(p\mid x)\propto p^{2-1}(1-p)^{3-1}p^3(1-p)^2=p^4(1-p)^4.$$
よって $p\mid x\sim\operatorname{Beta}(5,5)$。
## 注意
試行回数5、成功3なので失敗は2。

<!-- CARD -->
---
id: data-em-responsibility
title: 2成分混合分布のE-stepを計算する
category: math-data-analysis
subcategory: math-incomplete-data
topic: em-algorithm
type: calc_step
difficulty: 3
priority: B
hashtags: [EM, 混合分布, 潜在変数]
frequency: { past_exam: 0, textbook: 0, independent_problems: 0, source_confirmations: 0 }
sources: [{ type: official_syllabus, topic: 不完全データ }]
---
## 問題
混合比 $\pi=0.4$、観測 $x$ における成分密度が $f_1(x)=0.3$, $f_2(x)=0.1$ のとき、成分1の負担率を求めよ。
## 答え
潜在成分についてBayesの定理を使う。
## 使用公式・定理
$$r_1(x)=P(Z=1\mid x)=\frac{\pi f_1(x)}{\pi f_1(x)+(1-\pi)f_2(x)}.$$
## 計算例
$$\begin{aligned}r_1(x)&=\frac{0.4\cdot0.3}{0.4\cdot0.3+0.6\cdot0.1}\\&=\frac{0.12}{0.18}=\frac23.\end{aligned}$$
## 注意
分母には全成分の重み付き密度を足す。

<!-- CARD -->
---
id: data-monte-carlo-integral
title: Monte Carlo平均で積分を推定する
category: math-data-analysis
subcategory: math-simulation
topic: monte-carlo
type: strategy
difficulty: 2
priority: B
hashtags: [MonteCarlo, 積分, 大数則]
frequency: { past_exam: 0, textbook: 0, independent_problems: 0, source_confirmations: 0 }
sources: [{ type: official_syllabus, topic: シミュレーション }]
---
## 問題
$U_i$ は独立同分布に一様分布 $U(0,1)$ に従うとして、$\int_0^1x^2\,dx$ を推定する式を作れ。例として $u=(1/4,1/2,3/4)$ を使え。
## 方針
積分を一様分布の期待値と読み、標本平均で置き換える。
## 使用公式・定理
$$\int_0^1g(x)\,dx=E[g(U)],\qquad \widehat I_n=\frac1n\sum_{i=1}^ng(U_i).$$
## 計算例
$$\widehat I_3=\frac{(1/4)^2+(1/2)^2+(3/4)^2}{3}=\frac7{24}\approx0.292.$$
真値は $[x^3/3]_0^1=1/3$。小標本なので誤差が大きい。
## 注意
乱数は実際には連続一様分布から生成する。

<!-- CARD -->
---
id: multi-conditional-normal
title: 2変量正規分布の条件付き平均を求める
category: applied-engineering
subcategory: engineering-multivariate
topic: conditional-normal
type: formula
difficulty: 3
priority: B
hashtags: [多変量正規分布, 条件付き分布, 回帰]
frequency: { past_exam: 0, textbook: 0, independent_problems: 0, source_confirmations: 0 }
sources: [{ type: official_syllabus, topic: 多変量正規分布 }]
---
## 問題
$(X,Y)^{\mathsf T}$ は平均 $(0,1)^{\mathsf T}$、分散 $\operatorname{Var}(X)=4$, $\operatorname{Var}(Y)=9$、共分散3の2変量正規分布に従う。$Y=4$ の条件付き平均を求めよ。
## 答え
平均からのずれへ回帰係数 $\operatorname{Cov}(X,Y)/\operatorname{Var}(Y)$ を掛ける。
## 使用公式・定理
$$E[X\mid Y=y]=\mu_X+\frac{\sigma_{XY}}{\sigma_Y^2}(y-\mu_Y).$$
## 計算例
$$\begin{aligned}E[X\mid Y=4]&=0+\frac39(4-1)\\&=\frac13\cdot3=1.\end{aligned}$$
## 注意
分母は $Y$ の分散である。

<!-- CARD -->
---
id: process-stationary-markov
title: 2状態Markov連鎖の定常分布を解く
category: applied-common
subcategory: applied-stochastic-processes
topic: stationary-distribution
type: strategy
difficulty: 2
priority: B
hashtags: [Markov連鎖, 定常分布, 連立方程式]
frequency: { past_exam: 0, textbook: 0, independent_problems: 0, source_confirmations: 0 }
sources: [{ type: official_syllabus, topic: Markov連鎖 }]
---
## 問題
$\boldsymbol P=\begin{pmatrix}0.8&0.2\\0.3&0.7\end{pmatrix}$ の定常分布 $\boldsymbol\pi$ を求めよ。
## 方針
$\boldsymbol\pi^{\mathsf T}\boldsymbol P=\boldsymbol\pi^{\mathsf T}$ と確率和1を同時に解く。
## 使用公式・定理
$$\boldsymbol\pi^{\mathsf T}\boldsymbol P=\boldsymbol\pi^{\mathsf T},\qquad \pi_1+\pi_2=1.$$
## 計算例
第1成分から $\pi_1=0.8\pi_1+0.3\pi_2$、すなわち $0.2\pi_1=0.3\pi_2$。よって $\pi_1:\pi_2=3:2$ なので
$$\boldsymbol\pi=(3/5,2/5)^{\mathsf T}.$$
## 注意
行ベクトル規約か列ベクトル規約かを式で明示する。

<!-- CARD -->
---
id: process-ma1-autocovariance
title: MA(1)過程の自己共分散を求める
category: applied-engineering
subcategory: engineering-stochastic-processes
topic: ma1
type: calc_step
difficulty: 3
priority: B
hashtags: [MA, 自己共分散, 時系列]
frequency: { past_exam: 0, textbook: 0, independent_problems: 0, source_confirmations: 0 }
sources: [{ type: official_syllabus, topic: MA過程 }]
---
## 問題
$X_t=\varepsilon_t+0.5\varepsilon_{t-1}$、革新は平均0、分散4で互いに無相関とする。$\gamma(0),\gamma(1)$ を求めよ。
## 答え
同じ時点の革新が重なる項だけを残す。
## 使用公式・定理
$$\gamma(h)=\operatorname{Cov}(X_t,X_{t-h}).$$
## 計算例
$$\begin{aligned}\gamma(0)&=\operatorname{Var}(\varepsilon_t)+0.5^2\operatorname{Var}(\varepsilon_{t-1})=4+1=5,\\\gamma(1)&=\operatorname{Cov}(\varepsilon_t+0.5\varepsilon_{t-1},\varepsilon_{t-1}+0.5\varepsilon_{t-2})\\&=0.5\operatorname{Var}(\varepsilon_{t-1})=2.\end{aligned}$$
## 注意
$|h|>1$ では重なる革新がなく $\gamma(h)=0$。

<!-- CARD -->
---
id: model-poisson-glm
title: Poisson回帰係数を平均比で読む
category: applied-common
subcategory: applied-multivariate
topic: poisson-regression
type: recognition
difficulty: 2
priority: B
hashtags: [GLM, Poisson回帰, 平均比]
frequency: { past_exam: 0, textbook: 0, independent_problems: 0, source_confirmations: 0 }
sources: [{ type: official_syllabus, topic: 一般化線形モデル }]
---
## 問題
$Y\mid x$ はPoisson分布 $\operatorname{Poisson}(\mu(x))$ に従い、$\log\mu(x)=\beta_0+0.4x$ とする。$x$ が2増えたとき条件付き平均は何倍か。
## 答え
対数平均の差を取り、指数化する。
## 使用公式・定理
$$\frac{\mu(x+c)}{\mu(x)}=e^{c\beta_1}.$$
## 計算例
$$\begin{aligned}\log\frac{\mu(x+2)}{\mu(x)}&=0.4(x+2)-0.4x=0.8,\\\frac{\mu(x+2)}{\mu(x)}&=e^{0.8}\approx2.23.\end{aligned}$$
## 注意
加法効果でなく乗法効果である。

<!-- CARD -->
---
id: eng-xbar-limits
title: X̄管理図の3σ管理限界を求める
category: applied-engineering
subcategory: engineering-quality
topic: control-chart
type: formula
difficulty: 2
priority: B
hashtags: [管理図, 工程管理, 標準誤差]
frequency: { past_exam: 0, textbook: 0, independent_problems: 0, source_confirmations: 0 }
sources: [{ type: official_syllabus, topic: 管理図 }]
---
## 問題
工程平均10、工程標準偏差2、群サイズ4の $\overline X$ 管理図で、3標準偏差管理限界を求めよ。
## 答え
標本平均の標準偏差 $\sigma/\sqrt n$ を中心線の上下3倍に置く。
## 使用公式・定理
$$UCL=\mu+3\frac\sigma{\sqrt n},\qquad CL=\mu,\qquad LCL=\mu-3\frac\sigma{\sqrt n}.$$
## 計算例
$\sigma/\sqrt n=2/2=1$ だから
$$UCL=13,\qquad CL=10,\qquad LCL=7.$$
## 注意
個々の観測の標準偏差2でなく標本平均の標準偏差1を使う。

<!-- CARD -->
---
id: eng-exponential-reliability
title: 指数寿命の信頼度とMTBFを求める
category: applied-engineering
subcategory: engineering-quality
topic: exponential-lifetime
type: formula
difficulty: 2
priority: B
hashtags: [信頼性, 指数分布, MTBF]
frequency: { past_exam: 0, textbook: 0, independent_problems: 0, source_confirmations: 0 }
sources: [{ type: official_syllabus, topic: MTBF }]
---
## 問題
寿命 $T$ の密度が $f(t)=0.01e^{-0.01t}$（$t>0$）である。時刻100の信頼度と平均故障間隔を求めよ。
## 答え
指数分布の生存関数と平均を使う。
## 使用公式・定理
率 $\lambda$ の指数寿命では $R(t)=P(T>t)=e^{-\lambda t}$、$E[T]=1/\lambda$。
## 計算例
$$R(100)=e^{-0.01\cdot100}=e^{-1}\approx0.368,$$
$$\operatorname{MTBF}=E[T]=1/0.01=100.$$
## 注意
時間の単位を揃える。

<!-- CARD -->
---
id: eng-two-factor-interaction
title: 2因子実験の交互作用を差の差で読む
category: applied-engineering
subcategory: engineering-design
topic: interaction
type: recognition
difficulty: 2
priority: B
hashtags: [実験計画, 交互作用, 差の差]
frequency: { past_exam: 0, textbook: 0, independent_problems: 0, source_confirmations: 0 }
sources: [{ type: official_syllabus, topic: 交互作用 }]
---
## 問題
セル平均を $(\mu_{11},\mu_{12},\mu_{21},\mu_{22})=(10,14,12,20)$ とする。第1添字は因子A、第2添字は因子Bの低水準1・高水準2を表す。交互作用の差の差を求めよ。
## 答え
Bが低いときと高いときのA効果の差を取る。
## 使用公式・定理
$$\text{差の差}=(\mu_{22}-\mu_{12})-(\mu_{21}-\mu_{11}).$$
## 計算例
B低でのA効果は $12-10=2$、B高では $20-14=6$。したがって
$$6-2=4.$$
## 注意
差の差が0なら加法的であり、0でなければ交互作用を示す。
