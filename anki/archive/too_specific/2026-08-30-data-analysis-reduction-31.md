---
id: mv-pca-reconstruction
title: 切り捨て主成分分析の再構成誤差を計算する
category: applied-common
subcategory: applied-multivariate
topic: pca-reconstruction
type: calc_step
difficulty: 3
priority: B
hashtags:
  - 主成分分析
  - 次元削減
  - 再構成誤差
frequency:
  past_exam: 0
  textbook: 0
  independent_problems: 0
  source_confirmations: 0
sources:
  - type: official_syllabus
    topic: 主成分分析
archive_reason: too_specific
canonical_card: mv-pca-variance-max
archive_note: 切り捨てPCAの再構成誤差が捨てた固有値の和になる性質を分散最大化canonicalへ補足・数値化したため、独立カードは不要。
---
## 問題
固有値が6,2,1である。第1主成分だけ残すと1観測当たりの平均二乗再構成誤差の総和はいくらか。

## 使用公式・定理
**この欄の役割：解答で使う定義・公式・定理と、その適用条件**

上位m主成分による最小再構成誤差は $\sum_{j>m}\lambda_j$。

## 答え
捨てた方向の分散和なので
$$\lambda_2+\lambda_3=2+1=3.$$

## 計算例
第2まで残せば誤差は1。

## 注意
データを中心化したEuclid距離での結果。
