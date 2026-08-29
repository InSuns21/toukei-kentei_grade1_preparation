---
id: process-markov-two-step
title: マルコフ連鎖の2期推移確率を行列積で求める
category: applied-common
subcategory: applied-stochastic-processes
topic: transition-matrix
type: calc_step
difficulty: 2
priority: A
hashtags: [マルコフ連鎖, 推移行列, 行列積]
frequency: { past_exam: 0, textbook: 0, independent_problems: 0, source_confirmations: 0 }
sources: [{ type: official_syllabus, topic: Markov過程 }]
archive_reason: duplicate
canonical_card: stoch-three-state-two-step
---
## 問題
$\boldsymbol P=\begin{pmatrix}0.8&0.2\\0.3&0.7\end{pmatrix}$ のとき、状態1から2へ2期で移る確率を求めよ。
## 答え
Chapman--Kolmogorov関係により $\boldsymbol P^2$ の $(1,2)$ 成分を取る。
## 使用公式・定理
$$P_{ij}^{(m+n)}=\sum_kP_{ik}^{(m)}P_{kj}^{(n)}.$$
## 計算例
$$\begin{aligned}P_{12}^{(2)}&=P_{11}P_{12}+P_{12}P_{22}\\&=0.8\cdot0.2+0.2\cdot0.7\\&=0.16+0.14\\&=0.30.\end{aligned}$$
## 一手
中間状態1と2をすべて足す。
