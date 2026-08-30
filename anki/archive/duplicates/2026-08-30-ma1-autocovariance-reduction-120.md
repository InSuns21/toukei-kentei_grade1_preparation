---
id: engproc-ma1-autocovariance-numeric
title: MA(1)工程変動の自己共分散を数値計算する
category: applied-engineering
subcategory: engineering-stochastic-processes
topic: ma1-autocovariance
type: calc_step
difficulty: 2
priority: A
hashtags:
  - 時系列解析
  - 移動平均過程
  - 自己共分散
frequency:
  past_exam: 0
  textbook: 0
  independent_problems: 0
  source_confirmations: 0
sources:
  - type: official_syllabus
    topic: 移動平均過程
archive_reason: duplicate
canonical_card: ts-maq-acf-cutoff
archive_note: MA(q)の一般自己共分散式、ACF打切りの導出、MA(1)の数値計算と自己相関までcanonical cardへ統合済み。
---
## 問題
$X_t=\varepsilon_t+0.5\varepsilon_{t-1}$、$\operatorname{Var}(\varepsilon_t)=4$ とする。$\gamma(0),\gamma(1),\gamma(2)$ を求めよ。
## 記号・用語
$\gamma(h)=\operatorname{Cov}(X_t,X_{t-h})$ はラグ $h$ の自己共分散であり、革新 $\varepsilon_t$ は平均0で互いに無相関とする。
## 使用公式・定理
MA(1) $X_t=\varepsilon_t+\theta\varepsilon_{t-1}$ では
$$\gamma(0)=(1+\theta^2)\sigma_\varepsilon^2,\qquad \gamma(1)=\theta\sigma_\varepsilon^2,\qquad \gamma(h)=0\ (h\ge2).$$
## 一手／方針
同じ革新を共有する項だけが共分散に残る。
## 答え
$$\gamma(0)=(1+0.5^2)4=5,\qquad \gamma(1)=0.5\cdot4=2,\qquad \gamma(2)=0.$$
## 計算例
$\rho(1)=\gamma(1)/\gamma(0)=2/5=0.4$ である。
## 注意
MA(1)の自己共分散はラグ2以降で0になるが、有限標本の標本自己共分散は厳密に0とは限らない。
