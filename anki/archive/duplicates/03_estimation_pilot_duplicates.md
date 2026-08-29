---
id: est-bernoulli-mle
title: ベルヌーイ標本の最尤推定量を求める
category: math-estimation
subcategory: math-likelihood-mle
topic: maximum-likelihood
type: strategy
difficulty: 2
priority: S
hashtags: [最尤推定, 尤度, 微分]
frequency: { past_exam: 0, textbook: 0, independent_problems: 0, source_confirmations: 0 }
sources: [{ type: official_syllabus, topic: 最尤法 }]
archive_reason: duplicate
canonical_card: mle-bernoulli-binomial
---
## 問題
ベルヌーイ分布 $P(X=x)=p^x(1-p)^{1-x}$（$x\in\{0,1\}$、$p\in[0,1]$）からの独立同分布標本が $1,0,1,1,0$ のとき、最尤推定値を求めよ。
## 方針
積を対数で和にし、内部解と境界を比較する。
## 使用公式・定理
$$\widehat p\in\mathop{\rm arg\,max}_{0\le p\le1}L(p;x)=\mathop{\rm arg\,max}_{0\le p\le1}\ell(p;x).$$
## 計算例
$$\begin{aligned}\ell(p)&=3\log p+2\log(1-p),\\\ell'(p)&=\frac3p-\frac2{1-p}\\&=\frac{3-5p}{p(1-p)}=0.\end{aligned}$$
よって $\widehat p=3/5$。また $\ell''(p)=-3/p^2-2/(1-p)^2<0$ なので最大である。
## 重要な一手
成功回数と失敗回数を数えてから対数尤度を書く。
## 注意
全成功・全失敗なら最大値は境界にある。

<!-- CARD -->
---
id: est-bias-variance
title: 平均二乗誤差を分散とバイアスに分解する
category: math-estimation
subcategory: math-point-estimator-properties
topic: mse-decomposition
type: proof_step
difficulty: 2
priority: A
hashtags: [不偏性, 平均二乗誤差, 証明の一手]
frequency: { past_exam: 0, textbook: 0, independent_problems: 0, source_confirmations: 0 }
sources: [{ type: official_syllabus, topic: 推定量の評価 }]
archive_reason: duplicate
canonical_card: est-bias-variance-tradeoff
---
## 問題
$E[T^2]<\infty$ とする。推定量 $T$ の $\theta$ に対する平均二乗誤差を分解せよ。
## 答え
$T-\theta=(T-E[T])+(E[T]-\theta)$ と中心化する。
## 使用公式・定理
$$\operatorname{MSE}_\theta(T)=E_\theta[(T-\theta)^2]=\operatorname{Var}_\theta(T)+\operatorname{Bias}_\theta(T)^2.$$
## 計算例
交差項の期待値は $2(E[T]-\theta)E[T-E[T]]=0$ なので
$$E[(T-\theta)^2]=\operatorname{Var}(T)+(E[T]-\theta)^2.$$
## 重要な一手
確率変数部分と定数のバイアス部分を分ける。
