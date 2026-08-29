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
