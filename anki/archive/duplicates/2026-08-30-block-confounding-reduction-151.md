---
id: design-block-confounding
title: ブロック化で高次交互作用を交絡させる
category: applied-common
subcategory: applied-design
topic: block-confounding
type: recognition
difficulty: 4
priority: B
hashtags:
  - 交絡
  - ブロック化
  - 要因実験
frequency:
  past_exam: 0
  textbook: 0
  independent_problems: 0
  source_confirmations: 0
sources:
  - type: official_syllabus
    topic: 交絡
archive_reason: duplicate
canonical_card: engdesign-block-generator-protect-effects
archive_note: 2^3計画をABC符号で2ブロック化したときABCとブロック効果が完全交絡する例、重要な主効果・低次交互作用をブロック生成子へ選ばない判断をcanonical
  cardへ統合済み。
---
## 問題
$2^3$ 計画を各4点の2ブロックへ分けるため、ABC符号でブロックを作った。何が交絡するか。

## 記号・用語
- 交絡：実験計画上、複数の効果が同じコントラストに対応して分離できない状態

## 使用公式・定理
**この欄の役割：解答で使う定義・公式・定理と、その適用条件**

同じ計画行列の列をもつ効果は完全交絡する。

## 答え
ブロック指標がABC列と同一なので、ブロック効果とABC交互作用を分離できない。ABCを無視できると仮定して主効果・低次交互作用を推定する。

## 計算例
ABC=+1の4点を一方、−1の4点を他方のブロックへ置く。

## 注意
重要と考える主効果や2因子交互作用をブロックと交絡させない。

<!-- CARD -->

---
id: engdesign-partial-confounding
title: 部分交絡で情報を回復する仕組みを説明する
category: applied-engineering
subcategory: engineering-design
topic: partial-confounding
type: recognition
difficulty: 3
priority: B
hashtags:
  - 交絡法
  - 部分交絡
  - 反復
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
archive_note: 完全交絡と部分交絡の違い、反復1でABC・反復2でABDを交絡させ、各効果を交絡していない反復から推定して情報を回復する例をcanonical
  cardへ統合済み。
---
## 問題
同じ要因計画を複数反復するとき、各反復で異なる交互作用をブロックと交絡させる部分交絡の利点を答えよ。
## 記号・用語
完全交絡は全反復で同じ効果をブロックと一致させ、部分交絡は反復ごとに一致させる効果を変える。
## 使用公式・定理
ある効果が交絡していない反復の情報を用いれば、その効果を推定できる。
## 一手／方針
各効果について少なくとも一部の反復でブロック列と異なるかを見る。
## 答え
ブロックサイズを保ちながら、交絡対象を反復間で分散させて主要な交互作用の情報を部分的に回復できる。
## 計算例
反復1でABC、反復2でABDを交絡させれば、ABCは反復2、ABDは反復1から推定できる。
## 注意
効果ごとの情報量は完全直交計画より少なくなり得る。
