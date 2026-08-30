---
id: engproc-sample-autocovariance-numeric
title: 工程系列の標本自己共分散を計算する
category: applied-engineering
subcategory: engineering-stochastic-processes
topic: sample-autocovariance
type: calc_step
difficulty: 2
priority: A
hashtags:
  - 時系列解析
  - 自己共分散
  - 数値計算
frequency:
  past_exam: 0
  textbook: 0
  independent_problems: 0
  source_confirmations: 0
sources:
  - type: official_syllabus
    topic: 時系列解析
archive_reason: duplicate
canonical_card: ts-sample-acf
archive_note: 標本自己共分散から標本自己相関までの計算、(1,3,2,4)の数値例、分母nとn-kの規約差をcanonical cardへ統合済み。
---
## 問題
系列 $(1,3,2,4)$ のラグ1標本自己共分散を分母 $n$ の定義で求めよ。
## 記号・用語
$\widehat\gamma(1)=n^{-1}\sum_{t=2}^n(x_t-\bar x)(x_{t-1}-\bar x)$ とする。
## 使用公式・定理
標本平均は $\bar x=n^{-1}\sum_tx_t$。
## 一手／方針
平均を引いた偏差列を作り、隣接偏差の積を足す。
## 答え
$\bar x=2.5$、偏差は $(-1.5,0.5,-0.5,1.5)$。よって
$$\widehat\gamma(1)=\frac{0.5(-1.5)+(-0.5)(0.5)+1.5(-0.5)}4=-\frac{1.75}{4}=-0.4375.$$
## 計算例
ラグ0では偏差平方和を4で割る。
## 注意
分母 $n-k$ の定義もあるため問題文の規約に従う。
