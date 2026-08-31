---
id: test-chi-square-fit
title: 適合度検定の自由度を数える
category: math-testing
subcategory: math-various-tests
topic: chi-square-goodness-fit
type: pitfall
difficulty: 2
priority: A
hashtags: [適合度の検定, カイ二乗, 自由度]
frequency: { past_exam: 0, textbook: 0, independent_problems: 0, source_confirmations: 0 }
sources: [{ type: official_syllabus, topic: 適合度の検定 }]
---
## 問題
$k=5$ 区分の正則で識別可能な帰無モデルで、各区分確率は正、期待度数は標本サイズとともに増えるとする。内部母数を最尤法で1個推定したときの自由度は？
## 答え
区分確率の和が1という制約と、推定した母数の個数を引く。
## 使用公式・定理
母数を $r$ 個推定したPearson適合度統計量は、条件の下でカイ二乗分布へ収束し、
$$\sum_{j=1}^k\frac{(O_j-E_j)^2}{E_j}\xrightarrow{d}\chi^2_{k-1-r}.$$
## 計算例
$$\mathrm{df}=k-1-r=5-1-1=3.$$
## 注意
機械的に $k-1$ としない。期待度数が小さすぎる区分は統合も検討する。
