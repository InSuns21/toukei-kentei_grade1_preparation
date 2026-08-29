---
id: prob-bayes-diagnostic
title: 診断結果からベイズの定理で逆確率を求める
category: math-probability
subcategory: math-events
topic: bayes-theorem
type: strategy
difficulty: 2
priority: S
hashtags: [ベイズの定理, 条件付き確率, 計算の一手]
frequency: { past_exam: 1, textbook: 0, independent_problems: 0, source_confirmations: 1 }
sources: [{ type: official_syllabus, topic: ベイズの定理 }, { type: past_exam, id: MATH-2021-Q2, topic: 事後確率最大化 }]
---
## 問題
罹患率が $0.01$、感度が $0.9$、偽陽性率が $0.05$ である。陽性者が罹患している確率は？
## 方針
陽性の全確率を分母に置く。
## 使用公式・定理
$$P(D\mid +)=\frac{P(+\mid D)P(D)}{P(+\mid D)P(D)+P(+\mid D^c)P(D^c)}.$$
## なぜ？
求める向き $P(D\mid +)$ と与えられた向き $P(+\mid D)$ が逆だからである。
## 計算例
$D=$罹患、$+=$陽性と置く。公式へ代入すると
$$\begin{aligned}P(D\mid +)&=\frac{0.9\cdot0.01}{0.9\cdot0.01+0.05\cdot0.99}\\&=\frac{0.009}{0.0585}\\&=\frac{2}{13}\\&\approx0.154.\end{aligned}$$
## 重要な一手
分母には罹患者と非罹患者の両方から生じる陽性を足す。
## 注意
感度 $0.9$ をそのまま答えにしない。
