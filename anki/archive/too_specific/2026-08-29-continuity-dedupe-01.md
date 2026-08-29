---
id: dist-continuity-correction-single
title: 二項分布の一点確率を連続修正する
category: math-probability
subcategory: math-limit-approximations
topic: continuity-correction-point
type: calc_step
difficulty: 1
priority: A
hashtags:
  - 連続修正
  - 二項分布
  - 一点確率
frequency:
  past_exam: 0
  textbook: 0
  independent_problems: 0
  source_confirmations: 0
sources:
  - type: official_syllabus
    topic: 連続修正
archive_reason: too_specific
canonical_card: dist-continuity-correction-interval
archive_note: 一点事象 X=k は区間 k<=X<=k の特殊例で、連続近似では [k-0.5,k+0.5] へ置き換える。区間カードの同一moveに含める。
---
## 問題
整数値確率変数 $X$ の一点確率 $P(X=k)$ を、連続確率変数 $Y$ で近似する。連続修正後の確率を答えよ。

## 答え
$$P(X=k)\approx P(k-0.5\le Y\le k+0.5).$$

## 使用公式・定理
整数 $k$ の一点を、隣接する整数との中点で囲まれる区間
$$[k-0.5,k+0.5]$$
へ対応させる。

## 計算例
例えば $P(X=20)$ なら、20に対応する幅1の区間を取って
$$P(X=20)\approx P(19.5\le Y\le20.5).$$
もし $Y\sim N(\mu,\sigma^2)$ なら、さらに
$$P(19.5\le Y\le20.5)=\Phi\left(\frac{20.5-\mu}{\sigma}\right)-\Phi\left(\frac{19.5-\mu}{\sigma}\right).$$

## 一手
一点 $k$ を中心とする幅1の区間へ置き換える。

## 注意
一点をそのまま $P(Y=k)$ としてはいけない。連続分布では $P(Y=k)=0$ だからである。
