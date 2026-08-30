---
id: reg-stepwise-selection-warning
title: ステップワイズ選択後推論の問題を説明する
category: applied-common
subcategory: applied-multiple-regression
topic: stepwise-selection
type: recognition
difficulty: 3
priority: B
hashtags:
  - 変数選択
  - ステップワイズ法
  - 選択後推論
frequency:
  past_exam: 0
  textbook: 0
  independent_problems: 0
  source_confirmations: 0
sources:
  - type: official_syllabus
    topic: 変数選択
archive_reason: duplicate
canonical_card: reg-aic-variable-selection
archive_note: stepwise探索の局所性、選択後推論の楽観性、CV等で手順全体を評価する注意をAIC変数選択正本へ統合済み。
---
## 問題
同じデータで変数選択した後、通常のt検定をそのまま報告する問題点は何か。

## 記号・用語
- P値：帰無仮説の下で、観測結果以上に帰無仮説と整合しない結果が出る確率
- 交絡：処置・曝露と結果の双方に関係する第三の要因によって効果比較が歪むこと

## 使用公式・定理
**この欄の役割：解答で使う定義・公式・定理と、その適用条件**

推論手順の標本分布にはモデル選択規則も含める必要がある。

## 答え
選択過程を固定済みとみなす通常の標準誤差・P値は選択の不確実性を無視し、第一種過誤や係数の過大評価を招き得る。

## 計算例
予測評価は独立テスト標本や入れ子交差検証で行う。

## 注意
自動選択は因果的交絡調整の代替ではない。
