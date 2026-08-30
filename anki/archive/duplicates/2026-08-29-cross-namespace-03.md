---
id: engproc-ar1-stationary-variance
title: AR(1)工程変動の定常分散を計算する
category: applied-engineering
subcategory: engineering-stochastic-processes
topic: ar1-variance
type: calc_step
difficulty: 2
priority: A
hashtags:
  - 自己回帰過程
  - ARモデル
  - 定常分散
frequency:
  past_exam: 0
  textbook: 0
  independent_problems: 0
  source_confirmations: 0
sources:
  - type: official_syllabus
    topic: 自己回帰過程
archive_reason: duplicate
canonical_card: ts-ar1-acf
archive_note: 同じAR(1)定常分散。canonical側は定常方程式 gamma(0)=phi^2 gamma(0)+sigma_e^2
  を実際に解くため、公式代入だけの理工派生より解法カードとして強い。engineering-stochastic-processes
  の自己回帰過程coverageは他の同一subcategoryカードで維持する。
---
## 問題
$X_t=0.6X_{t-1}+\varepsilon_t$、$\operatorname{Var}(\varepsilon_t)=4$ の定常AR(1)過程の分散を求めよ。
## 記号・用語
革新 $\varepsilon_t$ は過去の系列と無相関である。
## 使用公式・定理
$\gamma(0)=\sigma_\varepsilon^2/(1-\phi^2)$。
## 一手／方針
革新分散とAR係数を定常分散公式へ代入する。
## 答え
$$\gamma(0)=\frac4{1-0.6^2}=\frac4{0.64}=6.25.$$
## 計算例
標準偏差は $2.5$。
## 注意
$1-\phi$ でなく $1-\phi^2$ で割る。
