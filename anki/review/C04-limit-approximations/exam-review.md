# C04-limit-approximations exam-suitability review (initial)

initial_reviewer_id: exam-reviewer-C04-20260815
final_reviewer_id: exam-reviewer-C04-20260815
initial_reviewed_at: 2026-08-15T17:30:00.000Z
final_reviewed_at: 2026-08-15T17:52:00.000Z

- Reviewer ID: `exam-reviewer-C04-20260815`
- Execution date: 2026-08-15
- Review type: initial independent exam-suitability review
- Scope: all 34 cards in `anki/cards/19_limit_approximations.md`, including `published: false`
- Reference set: `anki/syllabus/syllabus.yaml`, `anki/syllabus/coverage.yaml`, `references/official-scope.md`, `references/past-exam-trends.md`, and `references/past-exam-index.yaml`

## Review criteria and results

### Aim alignment

The work unit directly covers every official aim term for `math-limit-approximations`: weak law of large numbers, central limit theorem, normal approximation to the binomial, Poisson approximation, law of small numbers, and continuity correction. Cards explicitly use the required Japanese statistical concepts together with the mathematical notation needed for reproduction.

### Knowledge sufficiency

- Reproduction: cards cover convergence symbols, theorem assumptions, supports and parameters, Bernoulli/binomial/Poisson definitions, standard errors, and the direction of continuity corrections.
- Calculation: cards cover Chebyshev bounds, CLT interval and tail probabilities, binomial normal approximation, continuity-corrected intervals and tails, Poisson zero/one-or-more/two-or-more probabilities, and the binomial-to-Poisson limit.
- Decision: cards cover choosing normal versus Poisson versus exact binomial calculation and distinguish approximation error from continuity correction.
- The work contains both recognition cards and completed numerical examples, so it supports recall, calculation, and method selection rather than formula-only memorization.

### Overlap and excess

The weak-law cards and CLT standardization cards have some deliberate overlap, but the cards differ in action: theorem statement, condition checking, numerical calculation, interpretation, or standard-error construction. The overlap is therefore useful for spaced retrieval and does not create a material duplication problem. The eight unpublished cards are valid candidates for later release after revision because they fill condition-checking and transfer gaps.

### Exam-time and selection value

The calculations are short enough to reproduce within a 20-30 minute subproblem window. The unit also supplies prerequisite moves that can be chained in a main-question setting: identify a distribution, compute mean/variance, choose an approximation, apply continuity correction, standardize, and evaluate a CDF or complement. These moves are relevant to the 90-minute, 5-question/3-choice format, but this Anki work is appropriately treated as retrieval support rather than a replacement for an integrated written drill.

### Past-exam priority evidence

The priority of the Poisson and approximation cards is supported by the index entries `MATH-2023-Q1`, `MATH-2022-Q3`, `SCI-2017-Q2`, and `SCI-2016-Q4`, which include Poisson or related distribution/approximation skills. The CLT and weak-law cards are foundational prerequisites for the stated official scope and for the cross-unit asymptotic skills recorded in the syllabus. No card claims a direct reproduction of a past problem.

## Findings

No fatal, major, or minor exam-suitability findings. The unit is suitable as an Anki retrieval block for the official scope. The explicit boundary that it is not itself a 4-6-subquestion written drill is consistent with the Anki task type and should be handled by the chapter/exam-drill materials.

## Machine validation

`npm run validate` was executed on 2026-08-15 and succeeded. It reported successful structure/dependency/progress validation, KaTeX strict validation for 255 Markdown files, and text validation for 237 generated texts.

## Counts

- fatal: 0
- major: 0
- minor: 0

---

# 再査読記録（初回担当の再開）

- 担当ID: `exam-reviewer-C04-20260815`（初回と同一）
- 再査読実行日時: 2026-08-15（Asia/Tokyo）
- 査読種別: 初回指摘後の独立再査読
- 対象: 現行 `anki/cards/19_limit_approximations.md` 全34カード（公開26カード、`published: false` 8カードを含む）
- 再確認資料: `anki/syllabus/syllabus.yaml`、`anki/syllabus/coverage.yaml`、`anki/notation.md`、`anki/formulae.md`、`agents/exam-editor-reviewer.md`、`references/past-exam-trends.md`、`references/past-exam-index.yaml`
- 変更範囲: このレビュー記録のみ。カード本文、coverage、progressは変更していない。

## 初回指摘と修正確認

### 1. 20〜30分の複合答案との関係

- 初回の論点: Ankiカード単体からは、4〜6小問の連結、答案圧縮、部分点回収、撤退基準を直接検証できない。
- 修正内容: ユーザー要望により、`dist-approximation-error` から「連結演習（20〜30分）」およびその解答（答案圧縮・部分点の指針）が削除された。
- 再査読結果: 修正確認。現行の `dist-approximation-error` は、(a) $n$ を大きくすること、(b) 連続修正、(c) ポアソン近似への切替えを区別する一つの認識論点であり、連結演習ではない。Ankiの1カード1論点という作業単位に適合する。20〜30分の記述演習は章・模試側の成果物で扱うべきであり、本作業の欠陥とはしない。
- 最終判定: 解消。

### 2. 近似法選択を答案へ移す補強

- 初回の論点: 正規近似・ポアソン近似・厳密二項計算の選択理由を、本番答案用の短い判定文へ圧縮する余地。
- 修正確認: `dist-binomial-normal-conditions`、`dist-binomial-poisson-conditions`、`dist-approximation-choice`、`dist-approximation-error` に、$np$、$n(1-p)$、$p$ の小ささ、$np\to\lambda$、連続修正の役割、厳密計算を検討する場合が明記されている。`dist-approximation-choice` は正規・ポアソン・厳密二項の3択を含む。
- 最終判定: 解消。カードの役割として十分であり、複合答案そのものを要求しない。

### 3. 近接技能の重複

- 初回の論点: 中心極限定理、連続修正、弱法則で近接カードが複数ある。
- 修正確認: 現行カードは、定理再生、条件判定、標準誤差、標準化、尾確率、補集合、境界変換など、問題行動が分かれている。各カードに `問題`、`答え`、公式・定理、計算例が一つずつある。`dist-continuity-correction-tail` の4つの不等号は一つの境界変換規則、`dist-approximation-error` の(a)〜(c)は近似機構を区別する一つの概念であり、複合大問化ではない。
- 最終判定: 解消。Ankiの想起分解として許容できる。

### 4. priorityと過去問根拠

- 初回の論点: `priority` の多くがBで、カード個別の過去問頻度は0。
- 修正確認: 現行34カードはBが31、Cが3で、S/Aは使用していない。全カードの `frequency.past_exam` は0、sourceは公式シラバス中心である。これは直接出題頻度を主張していない設定と整合する。関連する過去問インデックスとして `MATH-2023-Q1`、`MATH-2022-Q3`、`SCI-2017-Q2`、`SCI-2016-Q4` を再確認したが、C04の正規近似・連続修正を直接示すIDではない。したがって、直接過去問準拠を装わず、Bを中核技能、Cを補助的・認識的技能として用いる現状に過大主張はない。
- 最終判定: 解消。今後S/Aへ引き上げる場合だけ、具体的なsourceとfrequencyの追加が必要。

## ねらい適合性

公式aimは「確率分布の極限的な性質を理解すると共に、分布の近似に応用できる。」である。公式用語の「大数の弱法則、中心極限定理、二項分布の正規近似とポアソン近似、少数法則、連続修正」は、現行カードに全て対応している。

- 大数の弱法則: `dist-weak-law-chebyshev`, `dist-weak-law-sample-mean`, `dist-weak-law-conditions`, `dist-weak-law-variance-rate`, `dist-weak-law-mean-identification`, `dist-weak-law-bernoulli-frequency`
- 中心極限定理: `dist-clt-statement`, `dist-clt-sample-mean`, `dist-clt-bernoulli-proportion`, `dist-clt-normal-quantile`, `dist-clt-sum-variance`, `dist-clt-convergence-notation`, `dist-clt-standard-error`, `dist-clt-approximation-limit`, `dist-clt-bernoulli-count`, `dist-clt-finite-variance`
- 二項分布の正規近似とポアソン近似: `dist-binomial-normal-conditions`, `dist-binomial-normal-probability`, `dist-binomial-normal-tail`, `dist-binomial-poisson-conditions`, `dist-binomial-poisson-probability`, `dist-poisson-limit-derivation`, `dist-approximation-choice`, `dist-approximation-error`, `dist-normal-approximation-symmetry`, `dist-normal-approximation-continuity-full`, `dist-clt-bernoulli-count`, `dist-normal-approximation-standardization`, `dist-poisson-approximation-complement`
- 少数法則: `dist-poisson-limit-derivation`, `dist-law-small-numbers`, `dist-poisson-mean-variance-approximation`, `dist-poisson-tail-approximation`, `dist-poisson-approximation-complement`
- 連続修正: `dist-continuity-correction-interval`, `dist-continuity-correction-tail`, `dist-approximation-error`, `dist-normal-approximation-symmetry`, `dist-normal-approximation-continuity-full`, `dist-continuity-correction-single`

公式aimの到達行動、用語、近似法の選択と適用は再確認できた。coverageは公開カードを既存カードとともに登録しており、非公開8カードが配信対象から除外されていることも現行の公開範囲と整合する。`dist-normal-approximation-symmetry` の偶数条件は問題文に明記済みであり、ねらい適合性について追加指摘はない。

## 知識充足性

大数の弱法則では、独立同分布・有限分散、チェビシェフ不等式、標本平均の分散、確率収束、ベルヌーイ頻度を再生・計算できる。中心極限定理では、有限分散条件、分布収束と確率収束の区別、標本平均・和・ベルヌーイ比率の標準化、標準誤差、上側確率を扱う。近似計算では、二項分布の平均・分散、正規近似条件、ポアソン近似条件、少数法則の極限、0回・1回以上・2回以上の確率、区間・片側・一点の連続修正を確認できる。知識充足性について、実戦に必要な基本技能の欠落は認めない。

### RECHECK-RESOLVED-01: `dist-normal-approximation-symmetry` の偶数条件は明記済み

- 対象: `dist-normal-approximation-symmetry`
- 初回再査読時の判定: minor（誤認）
- 再確認: 現行問題文847行に「偶数の正整数 $n$ に対し」と明記されている。したがって $n/2$ は整数であり、連続修正後の下端 $n/2-0.5$ と答え $\Phi(1/\sqrt n)$ が問題設定に適合する。
- 修正確認: 条件明記済み。残存指摘ではない。
- 最終判定: 条件明記済みのため誤認・解消。severityなし。

## 過不足と1カード1論点性

現行34カードは各カードに一つの問いと一つの解答があり、連結演習・答案圧縮・部分点指針は削除されている。`dist-approximation-error` は3つの近似機構を比較する認識カードだが、目的は「近似誤差・連続修正・少数法則による分布形状の違いを区別する」一論点であり、Ankiの1カード1論点性を損なわない。`dist-continuity-correction-tail` の4事象も、片側不等号を整数値から連続境界へ移す一つの規則の確認である。過剰な複合演習化は再査読で確認されなかった。

過去問根拠については、利用可能なインデックス上のPoisson関連ID（`MATH-2023-Q1`, `MATH-2022-Q3`, `SCI-2017-Q2`, `SCI-2016-Q4`）は周辺技能の根拠であり、C04近似の直接出題IDではない。この限界を超えて頻度を推測していないため、過不足の追加指摘はない。

## 優先度根拠

priorityはBが中核の再生・計算・判定カード、Cが補助的な認識カードに使われている。全カードで過去問頻度0、S/Aなし、公式シラバスsource中心であり、直接出題頻度を偽っていない。正規近似条件、近似法選択、連続修正付き尾確率、ポアソン補集合、中心極限定理標準化は依存先が多く、Bの中核扱いは妥当である。定義確認や一点の連続修正をCに置く区別も確認できる。優先度根拠について追加指摘はない。

## 検証

再査読時に次を実行する。

```text
npm run validate
```

結果は下記のとおりである。

```text
教材構造、依存関係、進捗メタデータを検証しました。
254 個の Markdown ファイルを KaTeX strict で検証しました。
237 個の生成対象テキストを検証しました。
```

## 再査読最終判定

- fatal: 0
- major: 0
- minor: 0

初回指摘の修正を確認した。連結演習の削除はAnki作業の目的に適合し、`dist-normal-approximation-symmetry` の偶数条件も現行問題文に明記済みである。再確認日時点の最終判定は `fatal: 0 / major: 0 / minor: 0` とする。

## 最終再確認（偶数条件の訂正）

- 担当ID: `exam-reviewer-C04-20260815`（初回から維持）
- 再確認日時: 2026-08-15（Asia/Tokyo）
- 対象箇所: `anki/cards/19_limit_approximations.md` の `dist-normal-approximation-symmetry`、問題文847行付近
- 修正確認: 「偶数の正整数 $n$ に対し」と明記されていることを現行ファイルで確認した。前回再査読記録のminor 1件は誤判定として訂正した。
- 最終件数: fatal 0 / major 0 / minor 0

fatal: 0 / major: 0 / minor: 0
