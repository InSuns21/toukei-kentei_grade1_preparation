---
id: anova-tukey-numeric
title: テューキー法で有意な群対を選ぶ
category: math-data-analysis
subcategory: math-anova
topic: tukey-numeric
type: calc_step
difficulty: 3
priority: A
hashtags:
  - テューキー法
  - 多重比較
  - 群間差
frequency:
  past_exam: 0
  textbook: 0
  independent_problems: 0
  source_confirmations: 0
sources:
  - type: official_syllabus
    topic: 多重比較
archive_reason: duplicate
canonical_card: anova-tukey-hsd-formula
archive_note: テューキーHSDの比較幅を作って全群対を判定する数値計算を、等群サイズ公式とTukey-Kramer拡張を含む正本へ統合済み。
---
## 問題
各観測が独立な正規分布に従い、全群で分散が共通であるとする。3群の標本平均が $(10,13,16)$、誤差平均平方が $MS_E=4$、各群の標本サイズが $n=4$ である。テューキー法のStudent化範囲分布の臨界値を $q=3.5$ として、有意な群対を求めよ。

## 記号・用語
- 棄却域：帰無仮説を棄却する統計量・標本結果の集合

## 使用公式・定理
**この欄の役割：解答で使う定義・公式・定理と、その適用条件**

$|\overline Y_i-\overline Y_j|>q\sqrt{MS_E/n}$。

## 答え
$$\mathrm{HSD}=3.5\sqrt{4/4}=3.5.$$
差は $|10-13|=3$、$|10-16|=6$、$|13-16|=3$。3.5を超える群1–群3だけが有意。

## 計算例
同時比較幅は
$$3.5\sqrt{\frac44}=3.5.$$
3つの絶対差は
$$|10-13|=3,
\qquad |10-16|=6,
\qquad |13-16|=3.$$
3.5を超えるのは6だけなので、群1と群3の差だけが有意である。

## 注意
境界と等しい場合の扱いは棄却域の不等号規約に従う。
