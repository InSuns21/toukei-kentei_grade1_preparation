# C20-experimental-design 試験適合性査読

- initial_reviewer_id: c20_exam_review
- initial_reviewed_at: 2026-08-21T10:02:00+09:00
- final_reviewer_id: c20_exam_review
- final_reviewed_at: 2026-08-21T10:09:54+09:00

## 対象

- `anki/cards/42_experimental_design.md` の新規44枚
- `anki/formulae.md`
- `anki/syllabus/coverage.yaml` の `applied-design`
- `anki/progress.yaml` の C20 メタデータと公式ねらい全文
- 参照親見出し「実験計画」、title_ids 282–295、priority_counts A1/B13
- `references/past-exam-index.yaml` の実験計画関連ID

## ねらい適合性

公式ねらい全文「研究法の違いを理解すると共に、データの取り方に関する基礎事項を理解し実践に応用できる。」に対し、次の到達行動を確認した。

- 計画原理の再生・判定：`design-fisher-three-principles`、`design-randomization-purpose`、`design-replication-purpose`、`design-local-control` により、無作為化・反復・局所管理の目的を再生し、設定に適用できる。
- 実験単位の判定：`design-experimental-observational-unit`、`design-pseudoreplication`、`design-split-plot-error-strata` により、観測数ではなく無作為化単位から反復数と誤差層を判断できる。
- 計画の選択・計算：`design-crd-allocation-count`、`design-oneway-vs-block`、`design-rcbd-sums-squares`、`design-rcbd-anova-numeric`、ラテン方格4枚により、完全無作為化法・乱塊法・ラテン方格法を選び、自由度・平方和・F統計量を計算できる。
- 要因計画の適用：`design-two-level-coding`、`design-two-cubed-effects-numeric`、`design-block-confounding`、`design-fraction-generator`、`design-alias-structure`、`design-orthogonality-check` により、主効果・交互作用、交絡、部分実施、直交性を符号列から計算・判定できる。
- 検出力と設計：`design-power-determinants`、`design-two-sample-size`、`design-paired-sample-size`、`design-anova-effect-size-power` により、効果量・誤差分散・標本サイズの関係を再生し、概算へ適用できる。

以上から、公式ねらいの「基礎事項を理解」だけでなく「実践に応用できる」までを、短い再生・計算・条件判定カードとして扱っている。

## 知識充足性

title_ids 282–295 は全件に実質的な対応がある。282は3原則4枚、283は完全無作為化法2枚、284は乱塊法群、285はラテン方格法群、286–288は要因計画・2水準計画・主効果と交互作用、289–291は交絡・一部実施・直交表、292–294はブロック化・実験単位・固定／変量効果、A優先度295は検出力・標本サイズ4枚で扱われている。

公式用語のフィッシャーの3原則、一元配置法、二元配置法、ブロック化、乱塊法、一部実施要因計画は、カード本文・タイトル・hashtags・coverageに対応する。分割法、枝分かれ因子、変量切片は公式語の理解を補強する応用であり、過剰な発展にはなっていない。

ただし、既存の `math-anova` カードと同一の問い・答えを持つ新規カードが4枚あり、知識を増やさず反復負荷だけを増やしている。下記majorの解消が必要である。

## 過不足

### 初回指摘

1. major — `design-factorial-degrees-freedom`、`design-fixed-random-effects`、`design-rcbd-model`、`design-no-replication-interaction`：それぞれ既存の `anova-twoway-degrees-freedom`、`anova-fixed-random-effects`、`anova-randomized-block-model`、`anova-no-replication-limitation` と問題・結論・式が実質的に同一である。「同じ論点を重複させない」というカード設計と、限られた復習時間での試験効率に反する。削除だけで論点を失わないが、C20の枚数目標と実験計画固有の計算技能を両立するなら、例えば「2水準効果の平方和をコントラストから計算」「変量一元配置の分散成分を平均平方から推定」「乱塊法と完全無作為化法の相対効率を数値判定」「ブロック内欠測値または非加法性の扱い」のような未収録技能へ差し替えること。

44枚は目標40–50枚内である。上記以外では、定義カードと数値カードの分担が明確で、1カード1論点を保つ。連結演習、答案圧縮、部分点指針を追加する必要はない。

## 優先度根拠

- source親「実験計画」は全体としてAだが、作業メタデータの個別内訳はA1/B13である。個別Aの295「検出力と標本サイズの考え方」を `design-power-determinants` と `design-two-sample-size` のAカードで厚くし、他をBとした配分は妥当である。
- Bの282–294にも再生だけでなく、割付数、平方和・自由度・F比、要因効果、alias、内積を含む具体計算が配置されている。
- `references/past-exam-index.yaml` で直接確認できる関連IDは `SCI-2016-Q1`（不完備ブロック計画・推定可能性）である。本C20の公式用語・title_idsには不完備ブロック計画がなく、後続の理工学向け `C27-engineering-design` が予定されているため、C20の欠陥とはしない。ただしC27ではこのIDを優先度根拠として必ず回収すべきである。
- 各新規カードの `frequency.past_exam` は0であり、個別カードに過去問IDを直接結び付ける記録はない。このためS指定を設けず、公式ねらいとtitle_idsの優先度を採用した判断は保守的である。

## 配信品質・機械検証

- 新規44枚のIDはcoverageと一致し、`applied-design` は `complete`。公式6用語にもカード対応がある。
- 全カードに問題・答え・使用公式・計算例・注意があり、hashtagsとofficial_syllabus sourceも付与されている。
- `anki/formulae.md` は乱塊法、ラテン方格法、2水準効果、一部実施、変量効果、標本サイズを短く再掲している。
- `npm run anki:validate`：成功。982 cards、0 warnings、19 category pages、最大200枚。
- 初回 `npm run validate`：成功。構造検証、344 MarkdownのKaTeX strict検証、237生成対象テキスト検証が全て成功。

## 初回件数

fatal: 0 / major: 1 / minor: 0

## 修正確認

同じ担当者が新規44枚、`anki/formulae.md`、`applied-design` coverage、C20メタデータを全体再査読し、初回majorの解消を確認した。

1. `design-factorial-degrees-freedom` は `design-factorial-effect-ss` へ差し替えられた。既存の自由度再生ではなく、セル平均のAコントラスト $C_A=10$ から $SS_A=rC_A^2/2^2=50$ を計算する技能となり、効果推定と分散分析表を接続している。
2. `design-fixed-random-effects` は `design-random-oneway-components` へ差し替えられた。既存の固定／変量効果の定義再生ではなく、$E[MS_A]=\sigma^2+r\tau^2$、$E[MS_E]=\sigma^2$ から分散成分を数値推定する技能となった。
3. `design-rcbd-model` は `design-rcbd-relative-efficiency` へ差し替えられた。既存の乱塊法モデル再生ではなく、ブロックを無視した場合の誤差平均平方と乱塊法の誤差平均平方を比較し、相対効率2を得る完遂計算となった。
4. `design-no-replication-interaction` は `design-rcbd-missing-value` へ差し替えられた。既存の反復なし二元配置の限界ではなく、加法モデルの欠測値公式を数値適用し、補完後も誤差自由度を1減らす条件判定まで扱っている。

差替え後もtitle_ids 282–295の全論点、公式6用語、A1/B13の重点は維持されている。4枚はいずれも既存カード検索で同一の問い・計算を認めず、重複負荷は解消した。定義・計画選択・符号化・平方和／自由度／F比・分散成分・欠測値・標本サイズという再生・計算・適用・判定技能の組合せも十分である。

coverageは旧4 IDを新4 IDへ置換し、44枚全てと一致している。`anki/formulae.md` の実験計画節も、乱塊法、ラテン方格法、要因効果、一部実施、変量効果、検出力の中核公式を維持している。`SCI-2016-Q1` の不完備ブロック計画は初回判断どおり後続C27での回収事項であり、C20の公式ねらい・title_idsに対する欠落とはしない。

再査読時の機械検証結果は次のとおり。

- `npm run anki:validate`：成功。982 cards、0 warnings、19 category pages、最大200枚。
- `npm run validate`：成功。構造検証、346 MarkdownのKaTeX strict検証、237生成対象テキスト検証が全て成功。

## 最終件数

fatal: 0 / major: 0 / minor: 0

fatal: 0 / major: 0 / minor: 0
