# C12-testing-foundations-derivation 試験適合性査読（初回）

- 作業単位: C12-testing-foundations-derivation（検定の基礎・検定法の導出）
- 査読対象: `anki/cards/34_testing_foundations_derivation.md`（新規53枚）、`anki/formulae.md`、`anki/syllabus/syllabus.yaml`、`anki/syllabus/coverage.yaml`、`anki/progress.yaml`
- 担当ID: exam-reviewer-C12-001
- 実行日時: 2026-08-21 Asia/Tokyo
- 範囲境界: Ankiカード作業。連結演習、20〜30分論述、答案圧縮、部分点構造、撤退基準、90分5問3問選択は要求せず、それらがないことも欠陥としない。

## 1. ねらい適合性

公式ねらい全文は次のとおり。

> 統計的検定の原理を理解し、種々の最適性で検定が構成でき、その性質を数学的に記述できる。特に正規分布に関する検定を正しく理解すると共に、その他の代表的な分布に関する検定ができる。

今回の2サブカテゴリーが担う前半の到達行動は充足している。

| 到達行動 | 主対応カード | 評価 |
|---|---|---|
| 検定の原理を定義・条件付き確率・棄却域で記述する | test-null-alternative-definition, test-statistic-definition, test-critical-region-size, test-type-errors-definition, test-pvalue-definition, test-power-function-definition | 充足 |
| P値・有意水準・サイズを区別し、計算・判定する | test-level-versus-size, test-pvalue-two-sided, test-pvalue-smallest-level, test-composite-null-pvalue, test-discrete-pvalue-conservative | 充足 |
| 検出力・第二種過誤・標本サイズを計算する | test-power-normal-one-sided, test-sample-size-power-z, test-power-curve-reading, test-standardized-effect-power, test-power-binomial-exact, test-local-alternative-power | 充足 |
| 最強力性・UMP・不偏性・一致性を数学的に記述する | test-most-powerful-definition, test-unbiased-definition, test-consistency-definition, test-np-lemma-statement, test-monotone-likelihood-ratio, test-karlin-rubin-principle, test-ump-binomial-one-sided, test-ump-normal-one-sided, test-no-ump-two-sided | 充足 |
| GLRTを構成し、Wilks近似で判定する | test-glrt-definition, test-glrt-normal-mean-known-variance, test-glrt-normal-variance-known-mean, test-lr-deviance-statistic, test-wilks-theorem, test-wilks-restriction-rank, test-wilks-boundary-failure, test-lr-pvalue-chi-square | 充足 |
| LR・Wald・Scoreを選択・計算・比較する | test-wald-general, test-wald-bernoulli-numeric, test-score-general, test-score-bernoulli-numeric, test-lr-bernoulli-numeric, test-lr-wald-score-comparison, test-score-observed-expected-information | 充足 |

公式ねらい後半の「正規分布に関する検定」「その他の代表的な分布に関する検定」の個別手順は C13（math-normal-tests / math-various-tests）が担当する。本作業の正規平均・正規分散・二項・指数の例は検定原理や導出を学ぶための例に留まり、C13の平均・分散・2標本・適合度・独立性などの実施手順を先取りしていない。

## 2. 知識充足性（公式13用語）

| 公式用語 | 再生・計算・判定を担うカード | 評価 |
|---|---|---|
| 仮説 | test-null-alternative-definition, test-simple-composite-hypotheses, test-ci-duality | 充足 |
| 検定統計量 | test-statistic-definition, test-function-randomized-definition | 充足。ただし表示脱字あり |
| P値 | test-pvalue-definition, test-pvalue-two-sided, test-pvalue-smallest-level, test-composite-null-pvalue, test-discrete-pvalue-conservative | 充足 |
| 有意水準 | test-critical-region-size, test-level-versus-size, test-randomized-boundary, test-bonferroni-threshold | 充足。ただし表示脱字あり |
| 棄却域 | test-critical-region-size, test-one-two-sided-critical-values, test-data-dependent-sidedness | 充足 |
| 第一種の過誤 | test-type-errors-definition, test-familywise-error, test-bonferroni-threshold | 充足 |
| 第二種の過誤 | test-type-errors-definition, test-power-curve-reading, test-power-binomial-exact | 充足 |
| 検出力（検定力） | test-power-function-definition, test-power-normal-one-sided, test-sample-size-power-z, test-standardized-effect-power | 充足 |
| 検出力曲線 | test-power-function-definition, test-power-curve-reading | 充足 |
| ネイマン・ピアソンの基本定理 | test-np-lemma-statement, test-np-normal-mean, test-np-exponential-rate, test-likelihood-ratio-ordering | 充足。ただし表示脱字あり |
| 尤度比検定 | test-glrt-definition, test-lr-deviance-statistic, test-wilks-theorem, test-lr-bernoulli-numeric, test-profile-likelihood-nuisance | 充足。ただし表示脱字あり |
| ワルド型検定 | test-wald-general, test-wald-bernoulli-numeric, test-lr-wald-score-comparison | 充足 |
| スコア型検定 | test-score-general, test-score-bernoulli-numeric, test-score-observed-expected-information | 充足 |

各カードは概ね1論点で、定義再生、公式選択、数値計算、適用条件判定が分離されている。特に、離散検定の無作為化、複合帰無仮説の上限P値、Wilks近似の境界失敗、WaldとScoreの分母の違いは、誤用を防ぐ条件判定として有効である。

## 3. title_ids 195–226 と C13 境界

- 195–201: test-null-alternative-definition、test-type-errors-definition、test-critical-region-size、test-pvalue-definition、test-power-function-definition、test-simple-composite-hypotheses、test-one-two-sided-critical-values で直接対応。
- 202–211: 個別検定の実施手順は C13 に留保。202（z検定）は既存 test-z-rejection と本作業の原理例があるが、C13での体系的扱いを妨げない。203–211（t検定、対応あり・2標本、母分散、等分散、比率、適合度、独立性）は本作業で無理に収録しておらず境界は適切。
- 212: test-familywise-error と test-bonferroni-threshold で対応。
- 213–226: test-np-lemma-statement から test-power-binomial-exact までで、NP、MP、尤度比順序、MLR、UMP、Karlin–Rubin、GLRT、逸脱度、Wilks、Wald、Score、3検定の漸近同値、両側UMP不存在、検出力計算を直接対応。

## 4. 過不足・重複・優先度根拠

- 新規53枚で、目標50〜60枚の範囲内。
- 公式13用語は全件が代表カードを持ち、定義だけでなく計算・条件判定まで揃う。必須知識の欠落は認めない。
- 既存 test-z-rejection、mathstat-p-value-uniformity、test-np-bernoulli、test-likelihood-ratio は coverage 上で併用されるが、新規カードは原理の定義・導出・条件判定を細分化しており、削除を要する重複ではない。
- source の title_ids は S11/A21。新規カードはS論点（P値、検出力、NP、GLRT、尤度比統計量、Wald、LR/Wald/Score比較、検出力計算）を複数の再生・計算カードで厚くし、A論点も条件判定まで補っている。B/Cへの拡散はなく、優先度設計は妥当。
- C13担当の202–211をカード枚数合わせで取り込んでいないため、過剰収録もない。

## 5. 指摘

### major-1: 5カードでLaTeX制御綴りのバックスラッシュが欠落し、公式・計算例が誤表示される

- 対象: test-randomized-boundary, test-function-randomized-definition, test-ump-binomial-one-sided, test-likelihood-ratio-ordering, test-glrt-normal-variance-known-mean
- 内容:
  - test-randomized-boundary: `0.05,qquad` は `0.05,\qquad` が正しい。
  - test-function-randomized-definition: `\phi(0)=0,phi(1)=1/2` は `\phi(0)=0,\phi(1)=1/2` が正しい。
  - test-ump-binomial-one-sided: `0.05,qquad` は `0.05,\qquad` が正しい。
  - test-likelihood-ratio-ordering: `1/6,qquad` と `1,qquad` はそれぞれ `1/6,\qquad` と `1,\qquad` が正しい。
  - test-glrt-normal-variance-known-mean: 使用公式の `tau^{-n/2}` の先頭がタブ文字になっており、`\tau^{-n/2}` が正しい。
- 根拠: いずれも定義・公式・計算手順の再生カードで、現状は `qquad`、`phi`、`au` が数式中の変数列として表示される。機械検証は構文として許容してしまうが、配信画面で公式を誤って記憶させるため、作業完了前に修正が必要。
- 修正要求: 上記5箇所の制御綴りを修正し、配信HTMLで記号間隔、`\phi`、`\tau` が意図どおり表示される状態にする。

## 6. 機械検証

- `npm run anki:validate`: 成功（613 cards、warnings 0、13 category pages、各200枚以下）
- `npm run validate`: 成功
  - structure: 成功
  - math: 312 Markdown files、KaTeX strict 成功
  - text: 237 generated texts 成功
- 検証日時: 2026-08-21

## 7. 初回結論

公式ねらい、13用語、title_ids 195–226のうち本作業が担う基礎・導出範囲、S/A優先度、C13との境界はいずれも適切で、内容面の欠落や過剰は認めない。ただし、5カードの重要な式に同種の表示脱字があり、配信品質と公式再生を損なうため major 1件として修正を要する。

fatal: 0 / major: 1 / minor: 0

## 初回指摘

- major-1: 5カードのLaTeX制御綴りでバックスラッシュが欠落し、`qquad`、`phi`、`au` が誤表示される。

<!-- initial_reviewer_id: exam-reviewer-C12-001 initial_reviewed_at: 2026-08-21T00:27:06+09:00 -->

---

# 修正後再査読（試験適合性）

- 作業単位: C12-testing-foundations-derivation（検定の基礎・検定法の導出）
- 査読対象: `anki/cards/34_testing_foundations_derivation.md`（新規53枚）、`anki/formulae.md`、`anki/syllabus/syllabus.yaml`、`anki/syllabus/coverage.yaml`、`anki/progress.yaml`
- 担当ID: exam-reviewer-C12-001（初回と同一）
- 実行日時: 2026-08-21T00:30:06+09:00

## R1. 初回 major-1 の修正確認

カード本文を直接確認し、5カードの表示脱字がすべて解消した。

- test-randomized-boundary: `0.05,\qquad` へ修正され、境界無作為化の連立式が正しく表示される。
- test-function-randomized-definition: `\phi(1)=1/2` へ修正され、検定関数の数値例が正しく表示される。
- test-ump-binomial-one-sided: `0.05,\qquad` へ修正された。さらに数理査読修正により $X=9$ での無作為化確率 $\gamma\approx0.03118$ まで計算し、サイズ0.05のUMP検定と非無作為化臨界値 $c=10$ を区別している。
- test-likelihood-ratio-ordering: 2箇所とも `\qquad` へ修正され、3標本点の尤度比が正しく表示される。
- test-glrt-normal-variance-known-mean: `\tau^{-n/2}` へ修正され、分散母数の範囲 $\tau>0$ も明記された。

以上により初回 major-1 は解消。

## R2. 数理査読修正が試験適合性へ与える影響

- 確率点は正本 `anki/notation.md` の「上側 $\alpha$ 点」に統一された。test-power-normal-one-sided、test-sample-size-power-z、test-one-two-sided-critical-values、test-np-normal-mean、test-np-exponential-rate、test-ump-normal-one-sided、test-local-alternative-power と `anki/formulae.md` が整合し、公式選択技能が改善した。
- test-np-lemma-statement は、閾値・境界無作為化とサイズを $\alpha$ まで使う条件を明記し、最強力性の再生に必要な条件が揃った。
- test-power-curve-reading は検出力曲線の非減少性を問題条件に加え、帰無境界の値からサイズを読む推論が正当化された。
- test-null-alternative-definition と test-simple-composite-hypotheses は、母数空間の分割と「標本分布を一意に定める単純仮説」を正確に記述する。

これらの修正はカードの本来の1論点を維持し、余分な論述課題を持ち込まず、定義再生・公式選択・計算・条件判定を明確にした。新たな fatal / major / minor は認めない。

## R3. 全53枚の再査読

### ねらい適合性

公式ねらい全文「統計的検定の原理を理解し、種々の最適性で検定が構成でき、その性質を数学的に記述できる。特に正規分布に関する検定を正しく理解すると共に、その他の代表的な分布に関する検定ができる。」に対し、C12担当範囲である検定原理、P値・過誤・検出力、NP・MP・UMP、GLRT・Wilks、Wald・Scoreの到達行動は維持されている。正規平均・分散、二項、指数の例は原理・導出の例であり、個別検定手順を担うC13への範囲逸脱はない。

### 13用語の知識充足性

仮説、検定統計量、P値、有意水準、棄却域、第一種の過誤、第二種の過誤、検出力（検定力）、検出力曲線、ネイマン・ピアソンの基本定理、尤度比検定、ワルド型検定、スコア型検定は、coverageの代表カードと実本文が一致する。初回に表示欠陥のあった検定関数、無作為化、尤度比、GLRT分散例も正しく再生・計算できる状態になった。

### title_ids・過不足・優先度

- 195–201と212は基礎カード、213–226は導出カードで直接対応する。
- 202–211の個別検定はC13に留保され、C12では原理例に限定される。C13境界は適切。
- 新規53枚は target 50〜60の範囲内。必須論点の欠落、削除を要する重複、過度な細分化は認めない。
- sourceのS11/A21に対し、S論点は定義と計算を厚く、A論点は条件判定まで配置されている。B/Cへの拡散はなく、優先度は妥当。

### 配信品質

- 全53枚のcategory / subcategory / ID / hashtagsは検索・配信単位と整合する。
- `anki/formulae.md` とcoverageは修正後カード内容に同期している。
- 初回の制御綴り脱字は解消し、配信HTMLで誤記号を学習させる問題はなくなった。

## R4. 機械検証

- `npm run anki:validate`: 成功（613 cards、warnings 0、13 category pages、各200枚以下）
- `npm run validate`: 成功
  - structure: 成功
  - math: 314 Markdown files、KaTeX strict 成功
  - text: 237 generated texts 成功
- 検証日時: 2026-08-21T00:30:06+09:00

## R5. 最終結論

初回 major-1 は全件解消。全53枚を公式ねらい、13用語、title_ids 195–226、定義再生・公式選択・計算・条件判定、重複・過不足、S/A優先度、C13境界、配信品質の観点から再査読し、新たな指摘は認めない。

fatal: 0 / major: 0 / minor: 0

## 修正確認

- major-1: 5カードの `\qquad`、`\phi`、`\tau` の制御綴りを修正し、表示欠陥を解消。
- 数理査読修正: 上側確率点記法、NPのサイズ条件、二項UMPの境界無作為化、検出力曲線の単調条件、仮説定義を確認し、試験技能上も適切。

<!-- final_reviewer_id: exam-reviewer-C12-001 final_reviewed_at: 2026-08-21T00:30:06+09:00 -->

---

# 最終変更後の再確認

- 担当ID: exam-reviewer-C12-001（初回・前回と同一）
- 実行日時: 2026-08-21T00:32:35+09:00
- 対象: C12全53枚、`anki/formulae.md`、coverage / progress / syllabus関連

## F1. 数理再査読の残存2件

- test-np-lemma-statement: 不正確だった非無作為化検定の但し書きは削除済み。尤度比順序、閾値、境界無作為化、サイズ $\alpha$、有意水準 $\alpha$ の全検定中での最強力性が一続きで正しく再生できる。解消確認。
- test-ump-binomial-one-sided: 一般形は $X>c$ で必ず棄却し、$X=c$ で確率 $\gamma$ により棄却する形へ統一された。$n=20,p_0=0.3,\alpha=0.05$ の例も $c=9$、$\gamma\approx0.03118$ によりサイズ0.05となり、境界無作為化込みのUMP検定として正しい。

## F2. 残存指摘

### minor-1: test-ump-binomial-one-sided の末尾で同じ臨界値記号 `c` を別規約に再利用している

- 場所: test-ump-binomial-one-sided の計算例末尾
- 内容: カード冒頭では「$X>c$ なら必ず棄却、$X=c$ なら確率 $\gamma$ で棄却」と定義するため、数値例の境界は $c=9$ である。一方、末尾は「非無作為化検定に限定すれば臨界値は $c=10$」とし、説明なしに棄却規則を $X\ge c$ へ切り替えて同じ `c` を再利用している。境界無作為化を理解する学習者に、$c=9$ と $c=10$ の矛盾と見える。
- 修正案: 末尾の非無作為化検定への言及を削除する。比較を残すなら「非無作為化検定では棄却域を $\{X\ge10\}$ とする」と書き、`c` を再利用しない。
- severity根拠: UMP本体と数値計算は正しく、公式13用語・ねらいの充足を損なわないが、同一カード内の記号規約が一貫せず再生時に混乱を招くため minor。

## F3. C12全体の維持確認

公式ねらい、13用語、title_ids 195–226、定義再生・公式選択・計算・条件判定、S/A優先度、目標50〜60枚に対する53枚、C13への範囲境界、coverage / formulae同期、配信品質を再確認した。上記 minor-1 以外に新規指摘はない。

## F4. 機械検証

- `npm run anki:validate`: 成功（613 cards、warnings 0、13 category pages、各200枚以下）
- `npm run validate`: 成功（structure、KaTeX strict 314 Markdown files、text 237 generated texts）
- 検証日時: 2026-08-21T00:32:35+09:00

## F5. 最新最終件数

fatal: 0 / major: 0 / minor: 1

<!-- final_reviewer_id: exam-reviewer-C12-001 final_reviewed_at: 2026-08-21T00:32:35+09:00 -->

---

# minor-1 修正後の最終再査読

- 担当ID: exam-reviewer-C12-001（全回同一）
- 実行日時: 2026-08-21T00:34:10+09:00

## 解消確認

test-ump-binomial-one-sided の末尾は「非無作為化検定に限定する場合の棄却域は $\{X\ge10\}$」へ修正された。境界無作為化込みの一般形では $c=9$ と $\gamma\approx0.03118$、非無作為化検定では棄却域 $\{X\ge10\}$ と、同じ `c` を別規約で再利用せず明確に区別できている。旧 minor-1 は解消。

C12全53枚について、公式ねらい、13用語、title_ids 195–226、定義再生・公式選択・計算・条件判定、重複・過不足、S/A優先度、C13境界、formulae / coverage同期、配信品質を再確認し、新たな指摘は認めない。

## 機械検証

- `npm run anki:validate`: 成功（613 cards、warnings 0、13 category pages、各200枚以下）
- `npm run validate`: 成功（structure、KaTeX strict 314 Markdown files、text 237 generated texts）
- 検証日時: 2026-08-21T00:34:10+09:00

## 最新最終件数

fatal: 0 / major: 0 / minor: 0

<!-- final_reviewer_id: exam-reviewer-C12-001 final_reviewed_at: 2026-08-21T00:34:10+09:00 -->
