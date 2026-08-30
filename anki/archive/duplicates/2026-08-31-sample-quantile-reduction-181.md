---
id: engasym-sample-quantile-variance
title: 標本分位点の漸近分散を計算する
category: applied-engineering
subcategory: engineering-asymptotics
topic: sample-quantile
type: calc_step
difficulty: 4
priority: B
hashtags:
  - 漸近分散
  - 標本分位点
  - デルタ法
frequency:
  past_exam: 0
  textbook: 0
  independent_problems: 0
  source_confirmations: 0
sources:
  - type: official_syllabus
    topic: 漸近分散
archive_reason: duplicate
canonical_card: asym-exponential-sample-median
coverage_card: asym-exponential-sample-median
archive_note: 一般側正本へ、標本p分位点の漸近正規性
  p(1-p)/f(q_p)^2、経験分布のベルヌーイCLTから逆関数の一次近似で導く理由、一般数値例、指数分布中央値の具体例、f(q_p)>0条件まで統合済み。
---
## 問題
独立同分布な連続標本について、$p$ 分位点 $q_p$ の近傍で分布関数 $F$ が微分可能、密度 $f$ が連続かつ $f(q_p)>0$ とする。標本 $p$ 分位点 $\widehat q_p$ の漸近分散を答えよ。
## 記号・用語
$F(q_p)=p$、$\widehat q_p$ は経験分布に基づく標本分位点である。
## 使用公式・定理
分位点の漸近正規性：
$$\sqrt n(\widehat q_p-q_p)\xrightarrow{d}N\left(0,\frac{p(1-p)}{f(q_p)^2}\right).$$
## 一手／方針
経験分布の分散 $p(1-p)$ を逆関数の微分 $1/f(q_p)$ で変換する。
## 答え
近似分散は
$$\operatorname{Avar}(\widehat q_p)=\frac{p(1-p)}{n f(q_p)^2}.$$
## 計算例
中央値なら $p=1/2$ なので $1/\{4nf(q_{1/2})^2\}$。
## 注意
$f(q_p)=0$ では通常の $\sqrt n$ 漸近正規性を使えない。
