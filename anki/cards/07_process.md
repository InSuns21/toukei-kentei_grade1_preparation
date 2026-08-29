---
id: process-poisson-wait
title: ポアソン過程の待ち時間を指数分布へ結び付ける
category: applied-common
subcategory: applied-stochastic-processes
topic: waiting-time
type: recognition
difficulty: 2
priority: S
hashtags: [ポアソン過程, 指数分布, 待ち時間]
frequency: { past_exam: 0, textbook: 0, independent_problems: 0, source_confirmations: 0 }
sources: [{ type: official_syllabus, topic: ポアソン過程 }]
---
## 問題
率 $\lambda=2$ のポアソン過程で、最初の到着時刻 $T_1$ が1を超える確率を求めよ。
## 答え
$T_1>t$ は時刻 $t$ まで到着が0回という事象である。
## 使用公式・定理
率 $\lambda$ のポアソン過程では、計数 $N(t)$ はポアソン分布 $\operatorname{Poisson}(\lambda t)$ に従うので
$$P(T_1>t)=P(N(t)=0)=e^{-\lambda t}.$$
## 計算例
$$P(T_1>1)=P(N(1)=0)=e^{-2}.$$
したがって $T_1$ の台は $t>0$、密度は $2e^{-2t}$。
## 注意
指数分布のrateと平均 $1/\lambda$ を混同しない。

<!-- CARD -->
---
id: process-ar1-stationary
title: AR(1)過程の定常分散を解く
category: applied-engineering
subcategory: engineering-stochastic-processes
topic: ar1
type: strategy
difficulty: 3
priority: A
hashtags: [AR, 時系列解析, 定常性]
frequency: { past_exam: 0, textbook: 0, independent_problems: 0, source_confirmations: 0 }
sources: [{ type: official_syllabus, topic: AR・MA・ARIMA }]
---
## 問題
$X_t=0.5X_{t-1}+\varepsilon_t$、$E[\varepsilon_t]=0$、$\operatorname{Var}(\varepsilon_t)=3$ で、革新は過去と独立である。弱定常分散を求めよ。
## 方針
両辺の分散を取り、定常性 $\operatorname{Var}(X_t)=\operatorname{Var}(X_{t-1})$ を使う。
## 使用公式・定理
$X_t=\phi X_{t-1}+\varepsilon_t$、$|\phi|<1$、革新分散 $\sigma_\varepsilon^2$ なら
$$\gamma(0)=\frac{\sigma_\varepsilon^2}{1-\phi^2}.$$
## 計算例
$$\begin{aligned}\gamma(0)&=0.5^2\gamma(0)+3,\\{}(1-0.25)\gamma(0)&=3,\\{}\gamma(0)&=3/0.75=4.\end{aligned}$$
## 注意
弱定常解の条件は $|0.5|<1$ である。
