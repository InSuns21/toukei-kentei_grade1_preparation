---
id: prob-counting-sample-space
title: 場合の数から有限標本空間の確率を求める
category: math-probability
subcategory: math-events
topic: counting-probability
type: calc_step
difficulty: 2
priority: S
hashtags: [確率の計算, 場合の数, 標本空間]
frequency: { past_exam: 1, textbook: 0, independent_problems: 0, source_confirmations: 1 }
sources: [{ type: official_syllabus, topic: 確率の計算 }, { type: past_exam, id: MATH-2022-Q1, topic: 確率空間・独立性 }]
---
## 問題
公平な硬貨を3回投げる。表がちょうど2回出る確率を求めよ。

## 答え
等確率な結果の総数と、条件を満たす結果の数を別々に数えて比を取る。

## 使用公式・定理
有限標本空間の各結果が等確率なら、事象 $A$ について
$$P(A)=\frac{|A|}{|\Omega|}.$$

## 計算例
各回の表・裏の選択から
$$|\Omega|=2^3=8.$$
表になる2回を3回から選ぶので
$$|A|=\binom32=3.$$
したがって
$$P(A)=\frac{3}{8}.$$

## 一手
「全結果」と「有利な結果」が同じ確率かを確認してから個数の比を使う。

## 注意
結果が等確率でない問題では、個数の比だけでは求められない。

<!-- CARD -->
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
条件 $B$ の中で $A$ も起きる割合として、共通部分を $P(B)$ で割る。

## 使用公式・定理
$P(B)>0$ のとき、条件付き確率の定義は
$$P(A\mid B)=\frac{P(A\cap B)}{P(B)}.$$

## 計算例
$$P(A\mid B)=\frac{0.18}{0.30}=0.60.$$

## 一手
分母には条件記号の右側にある事象の確率を置く。

## 注意
$P(B\mid A)$ と取り違えない。

<!-- CARD -->
---
id: prob-density-from-cdf-derivative
title: 累積分布関数を微分して確率密度関数を求める
category: math-probability
subcategory: math-distribution-functions
topic: density-from-cdf
type: calc_step
difficulty: 2
priority: S
hashtags: [累積分布関数, 確率密度関数, 微分]
frequency: { past_exam: 1, textbook: 0, independent_problems: 0, source_confirmations: 1 }
sources: [{ type: official_syllabus, topic: 累積分布関数・確率密度関数 }, { type: past_exam, id: MATH-2018-Q5, topic: 順序統計量の確率密度 }]
---
## 問題
累積分布関数が
$$F_X(x)=\begin{cases}0&(x\le0),\\x^2&(0<x<1),\\1&(x\ge1)\end{cases}$$
である。確率密度関数 $f_X(x)$ を求めよ。

## 答え
累積分布関数が微分可能な区間で微分し、定数区間では0とする。

## 使用公式・定理
絶対連続な分布では、累積分布関数が微分可能な点で
$$f_X(x)=F_X'(x).$$

## 計算例
$0<x<1$ では
$$f_X(x)=\frac{d}{dx}x^2=2x.$$
$x<0$ と $x>1$ では $F_X$ が定数だから $f_X(x)=0$ である。従って
$$f_X(x)=\begin{cases}2x&(0<x<1),\\0&\text{それ以外}.
\end{cases}$$
確認すると
$$\int_{-\infty}^{\infty}f_X(x)\,dx=\int_0^1 2x\,dx=[x^2]_0^1=1.$$

## 一手
区分ごとに微分し、最後に密度の積分が1になることを確認する。

## 注意
累積分布関数に跳びがある場合、その点質量は通常の微分だけでは回収できない。
