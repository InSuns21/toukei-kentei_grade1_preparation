---
id: prob-basic-symmetry
title: 対称性を使う確率計算
category: math-probability
subcategory: math-events
topic: symmetry
type: calc_step
difficulty: 1
priority: A
hashtags:
  - 対称性
  - 順列
  - 確率の計算
frequency:
  past_exam: 0
  textbook: 0
  independent_problems: 0
  source_confirmations: 0
sources:
  - type: official_syllabus
    topic: 確率の計算
archive_reason: low_priority
archive_note: 対称性による確率1/2は有用な観察だが、独立した解法カードにするほどではなく、有限等確率標本空間や分布の対称性の計算内で都度使う。
---
## 問題
3人をランダムに1列へ並べる。特定の人が1番目になる確率を求めよ。

## 答え
確率は $1/3$ である。

## 使用公式・定理
ランダムな順列は $3!=6$ 通りが等確率で、特定の人を1番目に固定すると残りは $2!=2$ 通りである。

## 計算例
$$P(\text{特定の人が1番目})=\frac{2}{6}=\frac13.$$
3人は対称なので、各人が1番目になる確率は同じであり、合計1からも $1/3$ と分かる。

## 一手
全列挙の前に、候補が同じ確率を持つ対称性を探す。

## 注意
重み付き抽出などで候補が同確率でない場合、対称性は使えない。
