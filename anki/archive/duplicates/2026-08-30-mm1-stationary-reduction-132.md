---
id: engproc-mm1-stationary-probability
title: M/M/1待ち行列の定常確率を計算する
category: applied-engineering
subcategory: engineering-stochastic-processes
topic: mm1-stationary
type: calc_step
difficulty: 3
priority: B
hashtags:
  - マルコフ過程
  - M-M-1待ち行列
  - 定常分布
frequency:
  past_exam: 0
  textbook: 0
  independent_problems: 0
  source_confirmations: 0
sources:
  - type: official_syllabus
    topic: マルコフ過程
archive_reason: duplicate
canonical_card: engproc-birth-death-detailed-balance
archive_note: 出生死亡過程の詳細釣合いから一般定常分布を構成し、M/M/1のrho<1、pi_n=(1-rho)rho^n、lambda=2・mu=3のpi_3数値例までcanonical
  cardへ統合済み。Littleの法則による性能指標は別技能として残す。
---
## 問題
到着率 $\lambda=2$/時、サービス率 $\mu=3$/時のM/M/1待ち行列で、定常時に系内人数が3人である確率を求めよ。
## 記号・用語
$\rho=\lambda/\mu$ は利用率で、定常分布には $\rho<1$ が必要である。
## 使用公式・定理
M/M/1の定常確率は $\pi_n=(1-\rho)\rho^n$。
## 一手／方針
利用率を計算し、幾何分布型の定常確率へ代入する。
## 答え
$$\rho=\frac23,$$
$$\pi_3=\left(1-\frac23\right)\left(\frac23\right)^3=\frac8{81}\approx0.0988.$$
## 計算例
空系確率は $\pi_0=1/3$。
## 注意
系内人数にはサービス中の1人も含む。
