---
id: engdesign-block-generator-count
title: ブロック生成子数からブロック数を求める
category: applied-engineering
subcategory: engineering-design
topic: block-generators
type: calc_step
difficulty: 2
priority: B
hashtags:
  - 交絡法
  - ブロック生成子
  - ブロック数
frequency:
  past_exam: 0
  textbook: 0
  independent_problems: 0
  source_confirmations: 0
sources:
  - type: official_syllabus
    topic: 交絡法
archive_reason: duplicate
canonical_card: engdesign-block-generator-protect-effects
archive_note: 独立生成子数からブロック数・各ブロック実施数を求める操作は、生成子選択とブロック定義群まで含むcanonical cardへ統合済み。
---
## 問題
$2^4$ 要因計画で独立なブロック生成子を2個使う。ブロック数と各ブロックの実施数を求めよ。
## 記号・用語
独立なブロック生成子は実施を符号の組合せで分割する。
## 使用公式・定理
$p$ 個の独立生成子ならブロック数は $2^p$、各ブロックの実施数は $2^{k-p}$。
## 一手／方針
$k=4,p=2$ を指数へ代入する。
## 答え
ブロック数は $2^2=4$、各ブロックは $2^{4-2}=4$ 実施。
## 計算例
生成子がABとCDなら、それらの積ABCDもブロック定義群に入る。
## 注意
生成子は互いに独立でなければブロック数を倍増させない。
