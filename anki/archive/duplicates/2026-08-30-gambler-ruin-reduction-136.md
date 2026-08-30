---
id: engproc-biased-walk-hit-upper
title: 偏りのあるランダムウォークの上側到達確率を計算する
category: applied-engineering
subcategory: engineering-stochastic-processes
topic: gambler-ruin-biased
type: calc_step
difficulty: 4
priority: B
hashtags:
  - ランダムウォーク
  - 到達確率
  - 差分方程式
frequency:
  past_exam: 0
  textbook: 0
  independent_problems: 0
  source_confirmations: 0
sources:
  - type: official_syllabus
    topic: ランダムウォーク
archive_reason: duplicate
canonical_card: stoch-gambler-ruin
archive_note: 最初の1歩による差分方程式から偏りありの到達確率を導出し、対称p=qの特殊例とp=0.6,q=0.4,N=5,i=2の135/211数値例までcanonical
  cardへ統合済み。
---
## 問題
状態 $0,1,\ldots,5$ 上で、確率 $p=0.6$ で $+1$、$q=0.4$ で $-1$ 進む。状態2から出発し、0より先に5へ到達する確率を求めよ。
## 記号・用語
$h_i=P_i(T_5<T_0)$、$T_j$ は状態 $j$ への初到達時刻である。
## 使用公式・定理
$p\ne q$ の吸収ランダムウォークでは
$$h_i=\frac{1-(q/p)^i}{1-(q/p)^N},\qquad h_0=0, h_N=1.$$
## 一手／方針
$q/p=2/3$、$i=2$、$N=5$ を公式へ代入する。
## 答え
$$h_2=\frac{1-(2/3)^2}{1-(2/3)^5}=\frac{5/9}{211/243}=\frac{135}{211}\approx0.640.$$
## 計算例
公平な場合の $i/N=2/5$ より、上向きドリフトにより到達確率が大きい。
## 注意
$p=q$ のときは比の公式でなく $h_i=i/N$ を使う。
