---
id: engasym-empirical-cdf-point
title: 経験分布関数の一点での漸近分布を求める
category: applied-engineering
subcategory: engineering-asymptotics
topic: empirical-cdf
type: calc_step
difficulty: 2
priority: A
hashtags:
  - 中心極限定理
  - 経験分布関数
  - 漸近分散
frequency:
  past_exam: 0
  textbook: 0
  independent_problems: 0
  source_confirmations: 0
sources:
  - type: official_syllabus
    topic: 中心極限定理
archive_reason: duplicate
canonical_card: dist-clt-bernoulli-proportion
coverage_card: dist-clt-bernoulli-proportion
archive_note: 固定点xの経験分布関数は指示変数 B_i=1_{Y_i<=x} の標本平均であり、B_iは成功確率F(x)のベルヌーイ変数。正本に
  sqrt(n){F_n(x)-F(x)} => N(0,F(x){1-F(x)}) と F(x)=0.5,n=100 の標準誤差0.05まで統合済み。
---
## 問題
固定した $x$ で経験分布関数 $F_n(x)$ の漸近分布を求めよ。
## 記号・用語
$F_n(x)=n^{-1}\sum_{i=1}^n\boldsymbol1_{\{X_i\le x\}}$、$F(x)=P(X_i\le x)$。
## 使用公式・定理
指示変数は成功確率 $F(x)$ のベルヌーイ変数なので標本平均の中心極限定理を使う。
## 一手／方針
経験分布関数をベルヌーイ標本平均と見なす。
## 答え
$$\sqrt n\{F_n(x)-F(x)\}\xrightarrow{d}
N(0,F(x)\{1-F(x)\}).$$
## 計算例
$F(x)=0.5,n=100$ なら $F_n(x)$ の近似標準誤差は0.05。
## 注意
これは固定した一点の結果で、関数全体の一様収束とは別である。
