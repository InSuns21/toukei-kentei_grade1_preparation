---
id: test-z-rejection
title: 両側Z検定の棄却域を作る
category: math-testing
subcategory: math-testing-foundations
topic: z-test
type: strategy
difficulty: 2
priority: S
hashtags: [検定, 棄却域, 正規分布（ガウス分布）]
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
title: 尤度比検定統計量を制約付き最尤推定から作る
category: math-testing
subcategory: math-test-derivation
topic: likelihood-ratio-test
type: strategy
difficulty: 3
priority: S
hashtags: [尤度比検定, 最尤推定, 漸近分布]
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
title: ベータ–ベルヌーイ共役更新を行う
category: math-data-analysis
subcategory: math-bayesian-methods
topic: bayes-estimation
type: strategy
difficulty: 2
priority: A
hashtags: [ベイズの定理, 共役事前分布, 事後分布]
frequency: { past_exam: 0, textbook: 0, independent_problems: 0, source_confirmations: 0 }
sources: [{ type: official_syllabus, topic: ベイズの定理法 }]
---
## 問題
$p$ はベータ分布 $\operatorname{Beta}(2,3)$ に従うとし、ベルヌーイ試行5回で成功3回とする。事後分布を求めよ。
## 方針
事前密度の $p$ と $1-p$ の指数へ成功数・失敗数を足す。
## 使用公式・定理
ベータ分布の台は $0<p<1$、密度は $p^{a-1}(1-p)^{b-1}/B(a,b)$。成功 $s$、失敗 $f$ なら事後分布は $\operatorname{Beta}(a+s,b+f)$。
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
潜在成分についてベイズの定理を使う。
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
hashtags: [MonteCarlo, 積分, 大数の弱法則]
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
priority: S
hashtags: [多変量正規分布, 条件付き分布, 回帰分析]
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
title: 2状態マルコフ連鎖の定常分布を解く
category: applied-common
subcategory: applied-stochastic-processes
topic: stationary-distribution
type: strategy
difficulty: 2
priority: A
hashtags: [マルコフ連鎖, 定常分布, 連立方程式]
frequency: { past_exam: 0, textbook: 0, independent_problems: 0, source_confirmations: 0 }
sources: [{ type: official_syllabus, topic: マルコフ連鎖 }]
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
priority: A
hashtags: [MA, 自己共分散, 時系列解析]
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
title: ポアソン回帰係数を平均比で読む
category: applied-common
subcategory: applied-multivariate
topic: poisson-regression
type: recognition
difficulty: 2
priority: A
hashtags: [一般化線形モデル, ポアソン回帰, 平均比]
frequency: { past_exam: 0, textbook: 0, independent_problems: 0, source_confirmations: 0 }
sources: [{ type: official_syllabus, topic: 一般化線形モデル }]
---
## 問題
$Y\mid x$ はポアソン分布 $\operatorname{Poisson}(\mu(x))$ に従い、$\log\mu(x)=\beta_0+0.4x$ とする。$x$ が2増えたとき条件付き平均は何倍か。
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
priority: A
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
priority: A
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
priority: A
hashtags: [実験計画法, 交互作用, 差の差]
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
