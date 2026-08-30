---
id: engproc-ctmc-holding-jump-probability
title: 生成行列から保持時間と遷移先確率を求める
category: applied-engineering
subcategory: engineering-stochastic-processes
topic: ctmc-holding-time
type: calc_step
difficulty: 3
priority: B
hashtags:
  - マルコフ過程
  - 保持時間
  - ジャンプ連鎖
frequency:
  past_exam: 0
  textbook: 0
  independent_problems: 0
  source_confirmations: 0
sources:
  - type: official_syllabus
    topic: マルコフ過程
archive_reason: duplicate
canonical_card: engproc-ctmc-generator-check
archive_note: 生成行列の判定、離脱率、指数保持時間、平均保持時間、埋込ジャンプ確率までcanonical cardへ統合済み。
---
## 問題
生成行列の状態1の行が $(-3,2,1)$ である。状態1の平均保持時間と、離脱時に状態2へ移る確率を求めよ。
## 記号・用語
離脱率は $\nu_i=-q_{ii}$、ジャンプ先確率は $q_{ij}/\nu_i$ である。$H_1$ は状態1の保持時間を表す。
## 使用公式・定理
保持時間は率 $\nu_i$ の指数分布に従い、平均は $1/\nu_i$。
## 一手／方針
対角成分から総離脱率を読み、非対角率を総率で割る。
## 答え
$$\nu_1=3,\qquad E[H_1]=\frac13,$$
$$P(1\to2\mid\text{離脱})=\frac{q_{12}}{\nu_1}=\frac23.$$
## 計算例
状態3へ移る確率は $1/3$ で、合計1になる。
## 注意
遷移率2は確率ではないため、そのまま確率として読まない。
