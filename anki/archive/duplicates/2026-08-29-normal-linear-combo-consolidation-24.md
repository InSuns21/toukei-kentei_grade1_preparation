---
id: samp-normal-linear-combo
title: 正規標本の線形結合の分布
category: math-distributions
subcategory: math-sampling-distributions
topic: normal-linear-combination
type: theorem
difficulty: 2
priority: A
hashtags:
  - 正規分布
  - 線形結合
  - 標本分布
frequency:
  past_exam: 0
  textbook: 0
  independent_problems: 0
  source_confirmations: 0
sources:
  - type: official_syllabus
    topic: 標本分布
archive_reason: duplicate
canonical_card: engmv-linear-combination-normal
coverage_card: samp-xbar-normal-distribution
archive_note: 独立同分布正規の線形結合は多変量正規の一般式 a^T X ~ N(a^T mu,a^T Sigma a)
  の特殊形。標本分布の公式シラバスcoverageは正規母集団での標本平均canonicalで保持する。
---
## 問題
$X_i\overset{\mathrm{i.i.d.}}{\sim}$ 正規分布 $N(\mu,\sigma^2)$ のとき、$a_i$ を定数として $Y=\sum_{i=1}^na_iX_i$ の分布を答えよ。

## 答え
$$Y\sim N\left(\mu\sum_i a_i,\ \sigma^2\sum_i a_i^2\right).$$

## 使用公式・定理
独立な正規分布の線形結合は正規分布。平均は線形、分散は係数2乗の和に $\sigma^2$ を掛ける。

## 計算例
$a_i=1/n$ なら $Y=\overline X\sim N(\mu,\sigma^2/n)$。

## 一手
平均は係数の和、分散は係数2乗和。

## 注意
独立でないと共分散項が残る。
