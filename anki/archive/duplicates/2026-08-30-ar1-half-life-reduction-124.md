---
id: engproc-ar1-correlation-half-life
title: AR(1)自己相関の半減時点を計算する
category: applied-engineering
subcategory: engineering-stochastic-processes
topic: ar1-correlation-decay
type: calc_step
difficulty: 3
priority: B
hashtags:
  - 自己回帰過程
  - 自己相関
  - 半減期
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
archive_note: AR(1)の定常平均・分散・自己相関の導出、phi=0.8の数値例、自己相関の幾何減衰、絶対自己相関が0.5以下になる最小ラグまでcanonical
  cardへ統合済み。
---
## 問題
AR(1)係数が $\phi=0.8$ のとき、自己相関が0.5以下になる最小ラグを求めよ。
## 記号・用語
定常AR(1)のラグ $h$ 自己相関は $\rho(h)=\phi^h$。
## 使用公式・定理
$0<\phi<1$ では $\phi^h\le0.5$ を対数で解く。
## 一手／方針
$h\ge\log(0.5)/\log(0.8)$ を計算し、最小整数へ切り上げる。
## 答え
$$\frac{\log0.5}{\log0.8}\approx3.106,$$
よって最小ラグは $h=4$。実際 $0.8^3=0.512>0.5$、$0.8^4=0.4096$。
## 計算例
係数が1に近いほど相関の減衰は遅い。
## 注意
負のAR係数では自己相関の符号が交互に変わる。
