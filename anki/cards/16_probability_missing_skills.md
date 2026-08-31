---
id: prob-conditional-definition-direct
title: 共通部分と条件事象から条件付き確率を求める
category: math-probability
subcategory: math-events
topic: conditional-probability-definition
type: formula
difficulty: 2
priority: S
hashtags: [条件付き確率, 共通部分, 定義]
frequency: { past_exam: 1, textbook: 0, independent_problems: 0, source_confirmations: 1 }
sources: [{ type: official_syllabus, topic: 条件付き確率 }, { type: past_exam, id: MATH-2022-Q2, topic: 一様分布・条件付き分布 }]
---
## 問題
$P(A\cap B)=0.18$、$P(B)=0.30$ である。$P(A\mid B)$ を求めよ。

## 答え
$$
P(A\mid B)=\frac{0.18}{0.30}=0.60.
$$

## 使用公式・定理
$P(B)>0$ のとき条件付き確率は
$$
P(A\mid B)=\frac{P(A\cap B)}{P(B)}.
$$
同じ式を $P(A\cap B)$ について解けば
$$
P(A\cap B)=P(A\mid B)P(B).
$$
したがって「条件付き確率を求める」と「共通部分へ戻す」は別公式ではなく同じ定義の往復である。

## 計算例
まず定義をそのまま使う例では
$$
\begin{aligned}
P(A\mid B)
&=\frac{P(A\cap B)}{P(B)}\\
&=\frac{0.18}{0.30}\\
&=0.60.
\end{aligned}
$$
逆向きに、$P(B)=0.4$, $P(A\mid B)=0.75$ が与えられたなら、同じ式の両辺へ $P(B)$ を掛けて
$$
\begin{aligned}
P(A\cap B)
&=P(A\mid B)P(B)\\
&=0.75\cdot0.4\\
&=0.30.
\end{aligned}
$$
となる。

## 一手
条件記号の右側 $B$ が分母である。共通部分が欲しいなら分母を払って掛け算へ戻す。

## 注意
$P(A\mid B)$ と $P(B\mid A)$ は一般に異なる。ベイズの定理は、この向きの違う条件付き確率を周辺確率と尤度で結び直す。
