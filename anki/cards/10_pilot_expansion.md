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
