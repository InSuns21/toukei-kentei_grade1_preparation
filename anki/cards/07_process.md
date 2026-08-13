---
id: process-markov-two-step
title: Markov連鎖の2期推移確率を行列積で求める
category: applied-common
subcategory: applied-stochastic-processes
topic: transition-matrix
type: calc_step
difficulty: 2
priority: B
hashtags: [Markov連鎖, 推移行列, 行列積]
frequency: { past_exam: 0, textbook: 0, independent_problems: 0, source_confirmations: 0 }
sources: [{ type: official_syllabus, topic: Markov過程 }]
---
## 問題
$\boldsymbol P=\begin{pmatrix}0.8&0.2\\0.3&0.7\end{pmatrix}$ のとき、状態1から2へ2期で移る確率を求めよ。
## 答え
Chapman--Kolmogorov関係により $\boldsymbol P^2$ の $(1,2)$ 成分を取る。
## 使用公式・定理
$$P_{ij}^{(m+n)}=\sum_kP_{ik}^{(m)}P_{kj}^{(n)}.$$
## 計算例
$$\begin{aligned}P_{12}^{(2)}&=P_{11}P_{12}+P_{12}P_{22}\\&=0.8\cdot0.2+0.2\cdot0.7\\&=0.16+0.14\\&=0.30.\end{aligned}$$
## 一手
中間状態1と2をすべて足す。

<!-- CARD -->
---
id: process-poisson-wait
title: Poisson過程の待ち時間を指数分布へ結び付ける
category: applied-common
subcategory: applied-stochastic-processes
topic: waiting-time
type: recognition
difficulty: 2
priority: B
hashtags: [Poisson過程, 指数分布, 待ち時間]
frequency: { past_exam: 0, textbook: 0, independent_problems: 0, source_confirmations: 0 }
sources: [{ type: official_syllabus, topic: Poisson過程 }]
---
## 問題
率 $\lambda=2$ のPoisson過程で、最初の到着時刻 $T_1$ が1を超える確率を求めよ。
## 答え
$T_1>t$ は時刻 $t$ まで到着が0回という事象である。
## 使用公式・定理
率 $\lambda$ のPoisson過程では、計数 $N(t)$ はPoisson分布 $\operatorname{Poisson}(\lambda t)$ に従うので
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
priority: B
hashtags: [AR, 時系列, 定常性]
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
