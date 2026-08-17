# 試験適合性査読記録：ADHOC-20260817-expectation-covariance

- 対象：`anki/cards/25_moments_inequalities.md`（新規8枚）
- 正本：`anki/notation.md`、`anki/syllabus/syllabus.yaml`、`anki/syllabus/coverage.yaml`、`references/past-exam-index.yaml`、`references/past-exam-trends.md`
- 担当：試験適合性査読サブエージェント
- 適用境界：AGENTS.md「Anki作業と通常章・模試の範囲境界」。連結演習・答案圧縮・部分点指針の不在は欠陥としない。

## ねらい適合性

対象は `math-distribution-characteristics` のねらい「分布の各種特性値の意味を理解すると共に、特性値の値から分布の形状が推測できる」に適合する。全8カードが特性値（期待値・分散・共分散・相関係数）とその関係・不等式を直接操作する。条件付き期待値・全分散・共分散分解は、過去問（例 `MATH-2024-Q5` 順序統計量の条件付き期待値、`MATH-2018-Q4` 条件付き2変量正規）の部品技能であり、試験設計上の位置づけは妥当。

## 知識充足性

- 全カードが定義式・成立条件・計算例・一手（手続き）を持ち、目で追える式展開になっている。
- マクロ・`\tag`・`\label` 不使用。KaTeX strict で検証成功。

## 過不足

- coverage.yaml の `math-distribution-characteristics` に新規8枚すべてを登録済み。
- 対応用語：期待値（prob-total-expectation / prob-jensen-inequality / prob-markov-inequality）、分散（prob-total-variance / prob-chebyshev-inequality）、共分散（prob-conditional-covariance / prob-covariance-matrix-components）、相関係数（prob-cauchy-schwarz-correlation）。
- 二重登録・過不足なし。

## 優先度根拠

- S（prob-total-expectation / prob-total-variance / prob-conditional-covariance / prob-covariance-matrix-components）：条件付き期待値・条件付き量は過去問で他の論点の部品として頻出。共分散行列成分は多変量・応用（理工）の分散共分散行列に直結する前提技能。S妥当。
- A（prob-cauchy-schwarz-correlation / prob-jensen-inequality / prob-markov-inequality / prob-chebyshev-inequality）：Cramér–Rao（Cauchy–Schwarz型）、大数の法則・確率収束（Markov/Chebyshev）、不等式評価（Jensen）の前提で重要。単体で直接出題される頻度はS群より低い。A妥当。

## 初回指摘

### minor

1. **prob-total-variance**（一手）：分散の有限性 $E[X^2]<\infty$ を明示（許容範囲だが明示するとより堅牢）
2. **prob-conditional-covariance**（注意）：分解式の成立条件 $E[X^2],E[Y^2]<\infty$ を明示
3. **prob-markov-inequality**（一手の誤字）：`押さる` → `aP(X\ge a) を E[X] で上から押さえる`
4. **prob-cauchy-schwarz-correlation**（重複確認）：既存 `prob-correlation-coefficient` との部分的重複。ただし本カードは不等式導出が論点で目的が異なるため欠陥ではないが確認対象として残す

## 初回査読の最終判定

fatal: 0 / major: 0 / minor: 4

## 機械検証（初回査読）

- `npm run validate` 成功（構造・数学 KaTeX strict 278ファイル・テキスト237ファイル）

## 修正確認（メイン担当による修正後）

1. prob-total-variance：一手に $E[X^2]<\infty$ を明記。→ 解消
2. prob-conditional-covariance：注意に $E[X^2],E[Y^2]<\infty$ を明記。→ 解消
3. prob-markov-inequality：`aP(X\ge a) を E[X] で上から押さえる` に修正。→ 解消
4. 重複の最終見解：既存 `prob-correlation-coefficient` は「定義式から $\rho$ を計算する」計算技能が論点、本カードはCauchy–Schwarzから $\lvert\rho\rvert\le1$ を不等式として導出・正当化する点が論点。到達技能が異なり、1カード1論点の観点で共存は妥当。重複なし。

## 再査読（試験適合性査読による修正確認）

- 上記4件が解消したことを確認。
- 初回指摘外で追加修正された `prob-jensen-inequality` の等号条件（線形関数の例外）も内容の明確化であり、新たな欠陥はない。
- `npm run anki:validate` 成功（308 cards, 0 warnings；7 category pages）。
- `npm run validate` 成功（構造・数学・テキスト全段階）。

## 最終判定（再査読）

fatal: 0 / major: 0 / minor: 0

## 査読メタデータ

- initial_reviewer_id: exam-editor-reviewer
- final_reviewer_id: exam-editor-reviewer
- initial_reviewed_at: 2026-08-16T15:20:30.000Z
- final_reviewed_at: 2026-08-16T15:31:40.000Z