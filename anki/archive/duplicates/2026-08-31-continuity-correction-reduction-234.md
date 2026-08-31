---
id: dist-continuity-correction-tail
title: 上側・下側確率に連続修正を施す
category: math-probability
subcategory: math-limit-approximations
topic: continuity-correction-tail
type: recognition
difficulty: 2
priority: A
hashtags:
  - 連続修正
  - 上側確率
  - 下側確率
frequency:
  past_exam: 0
  textbook: 0
  independent_problems: 0
  source_confirmations: 0
sources:
  - type: official_syllabus
    topic: 連続修正
archive_reason: duplicate
canonical_card: dist-continuity-correction-interval
coverage_card: dist-continuity-correction-interval
archive_note: 片側事象の ±0.5 は、整数点 j を幅1のセル [j-0.5,j+0.5] に対応させる正本から直接導ける。正本には >=,
  >, <=, < の4方向と一点確率、二項分布の数値例まで統合済みで、旧 tail カードに独立した判断技能は残らない。
---
## 問題
整数値確率変数 $X$ を連続確率変数 $Y$ で近似する。$k\in\mathbb Z$ とし、次の各事象を連続修正後の事象へ直せ。

1. $X\ge k$
2. $X>k$
3. $X\le k$
4. $X<k$

## 答え
順に $Y\ge k-0.5$、$Y\ge k+0.5$、$Y\le k+0.5$、$Y\le k-0.5$ とする。

## 使用公式・定理
整数値の各点 $k$ を、区間 $[k-0.5,k+0.5]$ に対応させる。これを使うと
$$X\ge k\ \leftrightarrow\ Y\ge k-0.5,$$
$$X\le k\ \leftrightarrow\ Y\le k+0.5.$$

## 計算例
$X>k$ は整数値なら $X\ge k+1$ と同じである。したがって下端を $0.5$ 下げて
$$X>k\ \leftrightarrow\ X\ge k+1\ \approx\ Y\ge k+0.5.$$
同様に $X<k$ は $X\le k-1$ なので
$$X<k\ \approx\ Y\le k-0.5.$$

## 一手
まず整数値の不等号を $\ge$ または $\le$ に直し、その後で端点を $0.5$ 動かす。

## 注意
「$>$ だから常に $k+0.5$」と暗記せず、整数値であることを使って境界を確認する。
