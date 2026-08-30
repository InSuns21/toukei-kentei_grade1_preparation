---
id: engproc-repair-chain-stationary-availability
title: 故障修復連鎖の定常可用率を計算する
category: applied-engineering
subcategory: engineering-stochastic-processes
topic: stationary-availability
type: calc_step
difficulty: 3
priority: A
hashtags:
  - マルコフ連鎖
  - 定常分布
  - 可用率
frequency:
  past_exam: 0
  textbook: 0
  independent_problems: 0
  source_confirmations: 0
sources:
  - type: official_syllabus
    topic: マルコフ連鎖
archive_reason: duplicate
canonical_card: stoch-three-state-stationary
archive_note: πP=πと正規化で定常分布を解く一般手順に、故障修復2状態連鎖の(0.8,0.2)と長期可用率0.8の工学数値例まで統合済み。詳細釣合いは別技能として残す。
---
## 問題
稼働0・故障1の遷移行列が $P=\begin{pmatrix}0.9&0.1\\0.4&0.6\end{pmatrix}$ である。長期可用率を求めよ。
## 記号・用語
定常分布 $\boldsymbol\pi=(\pi_0,\pi_1)$ の $\pi_0$ が長期可用率である。
## 使用公式・定理
$\boldsymbol\pi^\top P=\boldsymbol\pi^\top$、$\pi_0+\pi_1=1$。
## 一手／方針
稼働から故障への定常流量と故障から修復への流量を等置する。
## 答え
$$0.1\pi_0=0.4\pi_1,\qquad \pi_0+\pi_1=1,$$
より $\pi_0=0.8,\pi_1=0.2$。長期可用率は0.8。
## 計算例
長期的には観測時点の20%で故障状態にいる。
## 注意
初期状態によらず収束するには既約性・非周期性を確認する。
