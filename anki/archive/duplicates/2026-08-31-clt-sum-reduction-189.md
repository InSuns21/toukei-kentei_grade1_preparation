---
id: engasym-clt-sum-probability
title: 中心極限定理で合計値の超過確率を近似する
category: applied-engineering
subcategory: engineering-asymptotics
topic: central-limit-theorem
type: calc_step
difficulty: 2
priority: S
hashtags:
  - 中心極限定理
  - 正規近似
  - 合計
frequency:
  past_exam: 0
  textbook: 0
  independent_problems: 0
  source_confirmations: 0
sources:
  - type: official_syllabus
    topic: 中心極限定理
archive_reason: duplicate
canonical_card: dist-clt-sample-mean
coverage_card: dist-clt-sample-mean
archive_note: 中心極限定理による標準化は標本平均と合計で同一の学習単位。正本に S_n=n Xbar_n、E[S_n]=n
  mu、SD(S_n)=sigma sqrt(n)、n=100・mu=10・sigma=2 で P(S_n>1030)≈1-Phi(1.5)=0.0668
  を統合済み。
---
## 問題
独立同分布な部品重量の平均が10、分散が4である。100個の合計が1030を超える確率を正規近似せよ。
## 記号・用語
$S_n=\sum_{i=1}^nX_i$ とする。
## 使用公式・定理
中心極限定理により
$$\frac{S_n-n\mu}{\sigma\sqrt n}\xrightarrow{d}N(0,1).$$
## 一手／方針
合計の平均 $n\mu$ と標準偏差 $\sigma\sqrt n$ で標準化する。
## 答え
$$z=\frac{1030-1000}{2\sqrt{100}}=1.5,$$
$$P(S_{100}>1030)\approx1-\Phi(1.5)\approx0.0668.$$
## 計算例
閾値1020なら $z=1$ で超過確率は約0.1587。
## 注意
元分布が連続か不明なので連続性補正はここでは行っていない。
