---
id: prob-inclusion-exclusion
title: 2事象の和事象を包除原理で求める
category: probability
subcategory: events
topic: inclusion-exclusion
type: formula
difficulty: 1
priority: B
hashtags: [確率, 包除原理, 頻出]
frequency: { past_exam: 0, textbook: 0, independent_problems: 0, source_confirmations: 0 }
sources: [{ type: official_syllabus, topic: 事象と確率 }]
---
## 問題
$P(A)=0.6$, $P(B)=0.5$, $P(A\cap B)=0.2$ のとき、$P(A\cup B)$ を求めよ。
## 答え
重複する $A\cap B$ を1回引き、$P(A\cup B)=P(A)+P(B)-P(A\cap B)$ とする。
## 使用公式・定理
$$P(A\cup B)=P(A)+P(B)-P(A\cap B).$$
## 計算例
公式へ代入すると
$$\begin{aligned}P(A\cup B)&=P(A)+P(B)-P(A\cap B)\\&=0.6+0.5-0.2\\&=0.9.\end{aligned}$$
## 一手
「少なくとも一方」を見たら和事象に直し、重複を確認する。
## 注意
$0.6+0.5=1.1$ のままにしない。

<!-- CARD -->
---
id: prob-bayes-diagnostic
title: 診断結果からBayesの定理で逆確率を求める
category: probability
subcategory: conditional
topic: bayes-theorem
type: strategy
difficulty: 2
priority: B
hashtags: [Bayes, 条件付き確率, 計算の一手]
frequency: { past_exam: 0, textbook: 0, independent_problems: 0, source_confirmations: 0 }
sources: [{ type: official_syllabus, topic: Bayesの定理 }]
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

<!-- CARD -->
---
id: prob-cdf-from-pmf
title: 確率質量関数から累積分布関数を作る
category: probability
subcategory: random-variables
topic: cdf
type: calc_step
difficulty: 1
priority: B
hashtags: [CDF, PMF, 確率変数]
frequency: { past_exam: 0, textbook: 0, independent_problems: 0, source_confirmations: 0 }
sources: [{ type: official_syllabus, topic: 確率変数と分布関数 }]
---
## 問題
$P(X=0)=1/4$, $P(X=1)=3/4$ のとき累積分布関数 $F_X(x)=P(X\le x)$ を求めよ。
## 答え
点 $x$ 以下の確率質量を累積する。
## 使用公式・定理
$$F_X(x)=P(X\le x)=\sum_{u\le x}p_X(u).$$
## 計算例
$$F_X(x)=\begin{cases}0&(x<0),\\1/4&(0\le x<1),\\1&(x\ge1).\end{cases}$$
## 一手
台の点を境に場合分けする。
## 注意
右連続なので $F_X(0)=1/4$ である。
