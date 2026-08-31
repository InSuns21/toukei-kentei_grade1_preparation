---
id: engproc-random-walk-expected-absorption
title: 公平なランダムウォークの平均吸収時間を計算する
category: applied-engineering
subcategory: engineering-stochastic-processes
topic: random-walk-absorption-time
type: calc_step
difficulty: 3
priority: B
hashtags:
  - ランダムウォーク
  - 平均到達時間
  - 吸収
frequency:
  past_exam: 0
  textbook: 0
  independent_problems: 0
  source_confirmations: 0
sources:
  - type: official_syllabus
    topic: ランダムウォーク
archive_reason: duplicate
canonical_card: stoch-expected-hitting-time
coverage_card: stoch-expected-hitting-time
archive_note: 対称吸収ランダムウォークの平均吸収時間 m_i=i(N-i) は、平均到達時間の一般再帰 m_i=1+sum_j p_ij m_j
  の特殊形。common正本へ2階差分方程式からの導出、境界条件、N=6,i=2で8となる数値例まで吸収済みで、工学側カード固有の技能は残らない。
---
## 問題
状態 $0,1,\ldots,6$ 上の公平なランダムウォークが状態2から出発する。0または6へ吸収されるまでの平均時点数を求めよ。
## 記号・用語
$m_i=E_i[T_{\{0,N\}}]$ はいずれかの境界への平均吸収時間である。
## 使用公式・定理
公平な吸収ランダムウォークでは $m_i=i(N-i)$。
## 一手／方針
出発状態 $i=2$ と上側境界 $N=6$ を代入する。
## 答え
$$m_2=2(6-2)=8.$$
## 計算例
中央の状態3では $m_3=3\cdot3=9$ で最大になる。
## 注意
これは吸収までの時点数の期待値で、上側へ到達する条件付き時間ではない。
