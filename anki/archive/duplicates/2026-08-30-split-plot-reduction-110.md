---
id: engdesign-split-plot-degrees-freedom
title: 分割法の一次・二次誤差自由度を計算する
category: applied-engineering
subcategory: engineering-design
topic: split-plot-df
type: calc_step
difficulty: 3
priority: B
hashtags:
  - 実験の計画と実施
  - 分割法
  - 誤差項
frequency:
  past_exam: 0
  textbook: 0
  independent_problems: 0
  source_confirmations: 0
sources:
  - type: official_syllabus
    topic: 実験の計画と実施
archive_reason: duplicate
canonical_card: engdesign-split-plot-randomization
archive_note: 一次・二次実験単位、2段階無作為化、AとB・ABに対応する誤差項、一次・二次誤差自由度の計算をcanonical cardへ統合済み。
---
## 問題
反復ブロック数 $r=4$、一次因子Aが $a=3$ 水準、二次因子Bが $b=2$ 水準の分割法で、一次誤差と二次誤差の自由度を求めよ。
## 記号・用語
各ブロック内でAを一次単位へ、各一次単位内でBを二次単位へ無作為化する。
## 使用公式・定理
$df_{E_A}=(r-1)(a-1)$、$df_{E_B}=a(r-1)(b-1)$。
## 一手／方針
$r=4,a=3,b=2$ を代入する。
## 答え
一次誤差は $(4-1)(3-1)=6$、二次誤差は $3(4-1)(2-1)=9$ 自由度。
## 計算例
全自由度23は、ブロック3、A2、一次誤差6、B1、AB2、二次誤差9へ分かれる。
## 注意
欠測や不釣合いがあると単純な自由度分解から変わる。
