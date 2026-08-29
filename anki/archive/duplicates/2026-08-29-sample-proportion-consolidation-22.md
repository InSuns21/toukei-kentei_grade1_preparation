---
id: samp-two-proportion-diff
title: 2標本比率の差の分布
category: math-distributions
subcategory: math-sampling-distributions
topic: proportion-difference
type: theorem
difficulty: 3
priority: B
hashtags:
  - 2標本
  - 比率の差
  - 正規近似
frequency:
  past_exam: 0
  textbook: 0
  independent_problems: 0
  source_confirmations: 0
sources:
  - type: official_syllabus
    topic: 標本分布
archive_reason: duplicate
canonical_card: samp-sample-proportion
archive_note: 強化済み標本比率canonicalへベルヌーイ標本平均としての1群分布に加え、独立2群の比率差の期待値・分散・正規近似と数値例を吸収済み。
---
## 問題
独立な2群の標本比率 $\widehat p_1,\widehat p_2$（標本サイズ $n_1,n_2$）の差の期待値と分散を求めよ。

## 答え
$$E[\widehat p_1-\widehat p_2]=p_1-p_2,$$
$$\operatorname{Var}(\widehat p_1-\widehat p_2)=\frac{p_1(1-p_1)}{n_1}+\frac{p_2(1-p_2)}{n_2}.$$

## 使用公式・定理
標本比率はベルヌーイ平均。独立標本なので分散は和。中心極限定理で正規近似。

## 計算例
$n_1=n_2=100,p_1=0.6,p_2=0.4$ なら分散は $0.6\times0.4/100+0.4\times0.6/100=0.0048$、標準偏差 $\approx0.069$。

## 一手
帰無仮説 $p_1=p_2=p$ ではプールして $\widehat p$ を使い、分散は $p(1-p)(1/n_1+1/n_2)$。

## 注意
帰無仮説下では共通の $p$ をプールする方が検定のレベルを保ちやすい。
