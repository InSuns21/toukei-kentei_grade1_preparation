---
id: engasym-asymptotic-bias-mse
title: 漸近バイアスを含む近似平均二乗誤差を計算する
category: applied-engineering
subcategory: engineering-asymptotics
topic: asymptotic-mse
type: calc_step
difficulty: 3
priority: B
hashtags:
  - 漸近分散
  - バイアス
  - 平均二乗誤差
frequency:
  past_exam: 0
  textbook: 0
  independent_problems: 0
  source_confirmations: 0
sources:
  - type: official_syllabus
    topic: 漸近分散
archive_reason: duplicate
canonical_card: asym-convergence-ms
coverage_card: asym-convergence-ms
archive_note: 平均二乗収束・一致性の正本へ、MSE=分散+バイアス平方、Bias=O(n^-1)なら平方はO(n^-2)でVar=O(n^-1)より低次、Bias=O(n^-1/2)なら平方もO(n^-1)で主要項に残ること、n=100の数値比較まで統合済み。
---
## 問題
$E[\widehat\theta_n]-\theta\approx b/n$、$\operatorname{Var}(\widehat\theta_n)\approx V/n$ とする。1次近似平均二乗誤差を書け。
## 記号・用語
平均二乗誤差は分散とバイアス平方の和である。
## 使用公式・定理
$$\operatorname{MSE}(\widehat\theta)=\operatorname{Var}(\widehat\theta)+\operatorname{Bias}(\widehat\theta)^2.$$
## 一手／方針
与えられた次数をそのまま代入し、$n^{-1}$ と $n^{-2}$ を区別する。
## 答え
$$\operatorname{MSE}(\widehat\theta_n)\approx\frac Vn+\frac{b^2}{n^2}.$$
## 計算例
大標本では通常 $V/n$ が主要項となる。
## 注意
バイアスが $n^{-1/2}$ 級ならバイアス平方も分散と同じ $n^{-1}$ 級になる。
