---
id: engqc-common-special-causes
title: 共通原因と特殊原因を判別する
category: applied-engineering
subcategory: engineering-quality
topic: variation-causes
type: recognition
difficulty: 1
priority: S
hashtags:
  - プロセス管理
  - 共通原因
  - 特殊原因
frequency:
  past_exam: 0
  textbook: 0
  independent_problems: 0
  source_confirmations: 0
sources:
  - type: official_syllabus
    topic: プロセス管理
archive_reason: duplicate
canonical_card: engqc-phase1-phase2
archive_note: 共通原因・特殊原因の区別と、特殊原因は局所対応・共通原因は工程システム改善という対応方針をcanonical cardへ統合済み。
---
## 問題
共通原因変動と特殊原因変動に対する改善行動の違いを答えよ。
## 記号・用語
共通原因は通常工程に組み込まれた変動、特殊原因は特定可能な一時的・局所的変動である。
## 使用公式・定理
管理図の管理外信号は特殊原因の候補を示す。
## 一手／方針
現場の個別除去と工程システム全体の改善を分ける。
## 答え
特殊原因は設備故障や材料ロットなどを特定・除去する。共通原因は工程設計、設備能力、標準作業など管理側のシステム改善を要する。
## 計算例
安定工程を作業者が点ごとに調整すると過剰調整で変動を増やし得る。
## 注意
管理図の信号だけで原因そのものが特定されるわけではない。

<!-- CARD -->

---
id: engqc-rational-subgrouping
title: 合理的群分けの目的を説明する
category: applied-engineering
subcategory: engineering-quality
topic: rational-subgroup
type: recognition
difficulty: 2
priority: A
hashtags:
  - プロセス管理
  - 合理的群分け
  - 管理図
frequency:
  past_exam: 0
  textbook: 0
  independent_problems: 0
  source_confirmations: 0
sources:
  - type: official_syllabus
    topic: プロセス管理
archive_reason: duplicate
canonical_card: engqc-phase1-phase2
archive_note: 合理的群分けの目的、群内を短期変動・群間を工程変化の検出場所にする考え方、午前午後の水準変化例をcanonical cardへ統合済み。
---
## 問題
Xbar-R管理図で合理的群分けを行う目的を答えよ。
## 記号・用語
合理的群分けは群内を短時間・同条件の観測で構成する考え方である。
## 使用公式・定理
群内変動は短期共通原因変動を表し、群間変動に時間的な工程変化を現れやすくする。
## 一手／方針
検出したい変化を群内に混ぜず、群間へ出す。
## 答え
同一条件の観測を群内にまとめることで、特殊原因による水準変化を群平均の差として検出しやすくする。
## 計算例
1日中から無作為に5個集めるより、同時刻付近の5個を1群にする。
## 注意
不適切な群分けは特殊原因を群内ばらつきへ吸収してしまう。
