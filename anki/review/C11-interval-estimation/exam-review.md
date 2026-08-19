# C11-interval-estimation 試験適合性査読（独立サブエージェント）

- 作業単位: C11-interval-estimation（区間推定）
- 査読対象: `anki/cards/32_interval_estimation.md`
- 担当ID: exam-reviewer-C11-001
- 実行日時: 2026-08-19 Asia/Tokyo
- 初回査読（旧指摘なし）
- 範囲境界: Ankiカード作業。連結演習・20〜30分完答・答案圧縮・部分点構造・撤退基準・90分5問3問選択は要求せず、それらがないことも指摘しない。
- 確認項目: 公式ねらい適合性、1カード1論点、再生・計算・条件判定・適用技能、重複・過不足・優先度（S/A/B/C）、配信品質。

## 1. ねらい適合性（公式シラバス「区間推定」の到達行動）

シラバスの主要ねらいはすべて新規カードで網羅されている。

| 公式ねらい / 到達行動 | 主対応カード | 評価 |
|---|---|---|
| 信頼区間の構成（ピボット量の利用） | ci-pivot-definition, ci-pivot-construction, ci-normal-mean-known, ci-t-interval-pivot, ci-variance-chi-derivation, ci-f-variance-ratio, ci-two-sample-mean-diff, ci-welch-interval, ci-proportion, ci-proportion-diff, ci-delta-method | 充足 |
| 被覆確率・信頼係数の理解 | ci-coverage-probability, ci-coverage-frequentist, ci-asymptotic-def | 充足 |
| 検定との双対性 | ci-test-duality, ci-duality-acceptance | 充足 |
| 漸近信頼区間 | ci-asymptotic-def, ci-asymptotic-mle, ci-asymptotic-mle-calc | 充足 |
| デルタ法による区間 | ci-delta-method, ci-delta-method-calc | 充足 |
| 区間幅と信頼係数のトレードオフ・標本サイズ | ci-length-confidence-tradeoff, ci-sample-size-for-width | 充足 |
| 片側信頼区間 | ci-one-sided, ci-one-sided-calc | 計算カードに**重大な誤りあり**（後述 major-1） |

ねらい適合性は全体として非常に高い。計算補強カード（*-calc）が定義・定理カードと対で構成されており、試験で要求される「式の再生→数値適用→区間端の確定」の技能連鎖が揃っている。

## 2. 知識充足性（1カード1論点・公式・計算技能）

- 全31カードが1論点に収束。定義系・定理系・計算系の分離が明確。
- 全カードに `## 使用公式・定理` があり、定義式・区間構成式を再掲。非自明な変形（ピボット構成、Welch自由度、デルタ法分散伝播、双対性の受容域⇔区間、非対称分布の分位点向き）は「操作/根拠→変形後」の順で示されている。
- 計算カードはすべて具体的数値・区間端へ完遂。私が独立に再計算した主な例は以下（すべて正しい）:
  - ci-variance-chi-calc: 135/27.488=4.91, 135/6.262=21.56 → [4.91,21.56] ✓
  - ci-f-variance-ratio-calc: 1.5/4.026=0.373, 1.5×4.026=6.04 → [0.373,6.04] ✓
  - ci-proportion-calc: SE=0.02291, 半幅0.0449 → [0.255,0.345] ✓
  - ci-proportion-diff-calc: SE=0.04950, 半幅0.0970 → [0.003,0.197] ✓
  - ci-sample-size-for-width: (1.96·2/0.5)²=61.47→n=62 ✓
  - ci-asymptotic-mle-calc: [0.304,0.496] ✓
  - ci-delta-method-calc: SE=1.478, 半幅2.896 → [4.49,10.29] ✓
  - ci-two-sample-mean-diff-calc: SE=0.8944, 半幅1.879 → [0.121,3.879] ✓
  - ci-welch-calc: ν≈18.38, 半幅2.118 → [−0.118,4.118] ✓
  - ci-one-sided-calc: **方向誤り**（major-1）

## 3. 過不足

- 目標30〜35枚に対し、実カード数は**31枚**（後述 minor-1 の通り「32」は記録誤り）。31枚は適量内。
- 欠落: 公式シラバスの「区間推定」ねらいは全件カバー。source タイトル 181–194（14件）はすべて主対応カードを持つ。
- 不要カード: なし。計算補強カードは過剰ではなく、試験技能の反復強化として妥当。
- 重複: 既存 `samp-ci-mean-t`・`samp-ci-variance-chisq`・`samp-welch-t`（math-sampling-distributions）と、本作業の `ci-variance-chi-calc`・`ci-welch-calc`・`ci-two-sample-mean-diff-calc` は論点（数値適用）が近い。ただし配置（subcategory の違い）と意図（導出・定理 vs 計算演習）が異なり、単一論点の重複には至っていない。minor-2 として注意のみ。

## 4. 優先度根拠

- source（親「区間推定」、title_ids 181–194）の優先度は S11/A3（14タイトル中 S=11, A=3）: A は 182(ピボット), 188(Welch), 190(母比率差)。
- 新規31枚の実配分は **S25 / A6**（B・C なし）。A6 は source の A3 に加え、その計算補強版（ci-welch-calc, ci-proportion-diff-calc）を A に位置づけたもの。計算補強カードを S に振った方針は、過去問対応・技能の前提として妥当。
- source S11 の論点（被覆確率・既知/未知平均・カイ二乗・F・2標本・片側・双対性・漸近・デルタ法）はすべて S に配置されており、source 意図と整合。配分は妥当。

## 5. 配信品質

- カードID: 全件 `ci-*` 接頭辞で一貫。category=math-estimation, subcategory=math-interval-estimation で統一。
- hashtags は日本語で付与されており検索性は良い。
- 同一設定の再利用（ci-normal-mean-known-calc と ci-one-sided-calc が n=25,σ=2,x̄=100,α=0.05 を共有）は、両側/片側の比較という意図的な教材設計であり問題なし。
- ファイル名 `32_interval_estimation.md` と実カード数31の不一致は minor-1（記録・命名の不整合）。

---

## 指摘

### major-1: ci-one-sided-calc の片側区間の方向（下側/上側）が誤り、かつ自公式カードと矛盾

- 対象: `ci-one-sided-calc`（および `ci-one-sided` との整合）
- 内容: 問題は「95% 下側信頼区間」を求めること。下側（lower）信頼区間は $[\overline x - z_\alpha\sigma/\sqrt n,\ \infty)$ のはず（ci-one-sided の `使用公式・定理` も「下側：$P(\theta\ge \overline x-z_\alpha\sigma/\sqrt n)=1-\alpha$」と正しく記述）。しかし ci-one-sided-calc の `答え` は「下側区間 $(-\infty,100-0.658]=(-\infty,99.342]$」としており、これは実際には**上側（upper）**信頼区間である。さらに `計算例` で「下側 $(-\infty,99.342]$、上側 $[100.658,\infty)$」と両者を入れ替えており、同一カード内でも `使用公式・定理`（上側端=100.658）と矛盾している。正しくは:
  - 下側（lower）: $[99.342,\ \infty)$
  - 上側（upper）: $(-\infty,\ 100.658]$
- 根拠: 片側信頼区間の方向は統計検定1級の頻出かつ採点で厳格に問われる技能。下側を $(-\infty, \text{上限}]$ と覚えると、本番で点数を落とす。しかも自作の公式カード ci-one-sided と矛盾するため、学習者が正誤を自己修正できない。
- 修正要求: ci-one-sided-calc の `答え` と `計算例` を下側=$[99.342,\infty)$、上側=$(-\infty,100.658]$ に修正し、ci-one-sided の記述と一致させる。

### minor-1: カード枚数・優先度の記録が実体と一致しない

- 対象: 自己査読記録およびファイル名
- 内容: 自己査読・タスク記述は「新規32枚」「S29/A3」としているが、実体は**新規31枚・S25/A6**（B/C なし）。coverage.yaml は31新規（+既存 test-normal-ci）を正しく登録している。ファイル名 `32_interval_estimation.md` も実枚数31と一致しない（32はサブカテゴリー全体の登録枚数とみなせるが、明示が望ましい）。
- 根拠: カード内容自体に欠陥はないが、進捗・査読記録の正確性は `complete` の前提となる。
- 修正要求: 自己査読の「32枚」「S29/A3」を「31枚」「S25/A6」へ訂正。必要ならファイル名の扱いを進捗管理と整合。

### minor-2: 既存 samp-* 計算カードとの論点近接（注意）

- 対象: ci-variance-chi-calc, ci-welch-calc, ci-two-sample-mean-diff-calc と既存 samp-ci-variance-chisq / samp-welch-t 等
- 内容: 数値適用の論点が既存サンプリング分布カードと近い。subcategory 配置と意図（導出・定理と計算の分離、試験技能の反復）の違いで許容範囲だが、配信上の重複として認識しておく。現状は単一論点の重複には至っておらず、追加削除は不要。

---

## 機械検証

- `npm run validate`（C:\srcjs\toukei-kentei_grade1_preparation）: 成功（exit code 0）。
  - validate:structure: OK
  - validate:math: 307ファイル KaTeX strict 検証 OK
  - validate:text: 237テキスト検証 OK
- 検証日時: 2026-08-19

## 結論

ねらい適合性・知識充足性・優先度・配信品質は総じて良好。ただし major-1（ci-one-sided-calc の片側方向誤り・自公式カードとの矛盾）は試験適合性を損なう実装上の誤りであり、修正が必要。minor-1（記録枚数/優先度の不整合）も訂正を推奨。修正後に再査読を依頼されたい。

fatal: 0 / major: 1 / minor: 2

---

# 修正後再査読（試験適合性）

- 作業単位: C11-interval-estimation（区間推定）
- 査読対象: `anki/cards/32_interval_estimation.md`（新規31枚）
- 担当ID: exam-reviewer-C11-001（初回と同一の独立試験適合性査読サブエージェント）
- 実行日時: 2026-08-19 Asia/Tokyo（再査読）
- 範囲境界: Ankiカード作業。連結演習・論述完答・答案圧縮・部分点・撤退基準・90分5問3問選択は要求せず、それらがないことも指摘しない。
- 遵守: `agents/exam-editor-reviewer.md`

## R1. major-1 の解消確認（本文の実記述を直接検証）

執筆者の言い分を鵜呑みにせず、対象ファイルの実際の記述を確認した。

- `ci-one-sided`（定義カード）の `使用公式・定理`: 「下側：$P(\theta\ge \overline X-z_{\alpha}\sigma/\sqrt n)=1-\alpha$。上側：$P(\theta\le \overline X+z_{\alpha}\sigma/\sqrt n)=1-\alpha$」。下側=$[\theta_L,\infty)$、上側=$(-\infty,\theta_U]$ の定義と一致。
- `ci-one-sided-calc` の `答え`: 「下側信頼区間は $[100-0.658,\infty)=[99.342,\infty)$ となる」→ 下側が正しく $[99.342,\infty)$。
- `ci-one-sided-calc` の `計算例`: 「下側 $[99.342,\infty)$、上側 $(-\infty,100.658]$ が得られる」→ 上側が正しく $(-\infty,100.658]$。
- `ci-one-sided-calc` の `使用公式・定理`: 下側端 $\theta_L=\overline x-z_{0.05}\sigma/\sqrt n=99.342$ と明記。

旧指摘の「下側=(-∞,99.342]、上側=[100.658,∞) の逆転」は完全に解消。新旧方向の矛盾（同一カード内の `使用公式・定理` と `答え`/`計算例` の不一致）も解消し、`ci-one-sided` の定義と整合している。

独立確認（方向の意味論）: 下側信頼区間は $\theta$ の下界のみを与え、上限なし $[L,\infty)$；上側は上界のみ $(-∞,U]$。$n=25,\sigma=2,\overline x=100,SE=0.4, z_{0.05}=1.645$ より $L=99.342, U=100.658$。本文の数値・向きはともに正しい。

→ **major-1: 解消確認**。

## R2. 31枚全体の再査読（ねらい適合性・知識充足性・過不足・優先度・配信品質）

### R2.1 ねらい適合性
初回で確認済みのシラバス「区間推定」到達行動（被覆確率・ピボット構成・検定双対性・漸近区間・デルタ法・トレードオフ・片側）はすべて維持。今回、major-1 修正により「片側信頼区間」のねらいが正しい方向で学習可能になった。新たなねらい欠落はなし。

### R2.2 知識充足性（1カード1論点・公式・計算技能）
全31枚を本文で再確認。各カードに `使用公式・定理` があり、定義式・区間構成式を再掲。非自明な変形は「操作/根拠→変形後」の順で示されている。計算カードはすべて具体区間端へ完遂。今回あらためて独立再計算した主な例:
- ci-normal-mean-known-calc: $1.96\times2/5=0.784$ → $[99.216,100.784]$ ✓
- ci-proportion-diff-calc: $SE=\sqrt{0.25/200+0.24/200}=0.04950$, 半幅 $0.0970$ → $[0.003,0.197]$ ✓
- ci-welch-calc: $SE=\sqrt{9/12+4/15}=1.008$, $\nu\approx18.38$, 半幅 $2.118$ → $[-0.118,4.118]$ ✓
- ci-one-sided-calc: $[99.342,\infty)$ / $(-∞,100.658]$ ✓（R1参照）

数式・論理の行間補完の要請は初回から皆無。新たな fatal/major は検出せず。

### R2.3 過不足
- 実カード数を対象ファイルで正規表現計数: `^id: ` は **31件**（ci-coverage-probability … ci-sample-size-for-width）。初回指摘 minor-1（実体31枚だが「32」記録）のとおり、実体は31枚。
- minor-1 の修正: 自己査読記録 `self-review.md` は既に「新規31枚」「S25/A6」へ訂正済み（§5, §7）。`coverage.yaml` は31新規（+既存 test-normal-ci）を正しく登録。本ファイルの初回指摘 minor-1 も「実体は新規31枚・S25/A6」と正しく記述されている。
- 欠落: source 181–194（14タイトル）の全件が主対応カードを持つ。不要カードなし。

### R2.4 優先度根拠
実配分 S25/A6（B・C なし）。source priority_counts S11/A3 に対し、計算補強カードを S に位置づけた方針は過去問対応・技能前提として妥当。Welch（ci-welch-interval, ci-welch-calc）と母比率差（ci-proportion-diff, ci-proportion-diff-calc）を A に置く source 意図と整合。新たな優先度不整合なし。

### R2.5 配信品質
- 全31枚 `ci-*` 接頭辞で一貫。category=math-estimation, subcategory=math-interval-estimation で統一。
- hashtags は日本語で検索性良好。
- 同一設定再利用（known-calc と one-sided-calc が n=25,σ=2,x̄=100,α=0.05 を共有）は両側/片側比較の意図的教材設計であり問題なし。
- minor-2 の既存 samp-* 近接は、subcategory 配置と意図の違いで単一論点重複に至らず、削除不要（初回通り注意のみ）。

## R3. 機械検証（validate）
- コマンド: `npm run validate`（C:\srcjs\toukei-kentei_grade1_preparation）
- 結果: 成功（exit code 0）
  - validate:structure: OK
  - validate:math: KaTeX strict 検証 OK
  - validate:text: テキスト検証 OK
- 検証日時: 2026-08-19（再査読）

## R4. 結論（再査読）
初回指摘 major-1 はカード本文 `ci-one-sided-calc` で実際に下側=$[99.342,\infty)$、上側=$(-∞,100.658]$ に修正され、`ci-one-sided` の定義と整合していることを本文レベルで確認。minor-1（記録表記の実体31枚・S25/A6 への訂正）と minor-2（samp-* 近接の注意）はいずれも解消・維持されている。31枚全体の再査読でも、ねらい適合性・知識充足性・過不足・優先度・配信品質に新たな指摘はない。

fatal: 0 / major: 0 / minor: 0

## 初回指摘
- major-1: ci-one-sided-calc で「下側信頼区間」の答えが実質的に上側区間になっていた（下側=(-∞,99.342]、上側=[100.658,∞) と逆転）。試験の採点に直結する方向の誤り。
- minor-1: 実体は31枚だが「32枚」と記録不一致。
- minor-2: 既存 samp-* 計算カードとの論点近接を注意として記録（削除不要）。

## 修正確認
- major-1: ci-one-sided-calc の答え・計算例を下側=[99.342,∞)、上側=(-∞,100.658] に修正。ci-one-sided の定義と整合。
- minor-1: 自己査読記録を「新規31枚・S25/A6」へ訂正。coverage.yaml も31新規を正しく登録。
- minor-2: samp-* 近接は単一論点重複に至らず注意のみ（維持）。

<!-- initial_reviewer_id: exam-reviewer-C11-001 final_reviewer_id: exam-reviewer-C11-001 initial_reviewed_at: 2026-08-19T14:45:00Z final_reviewed_at: 2026-08-19T14:53:00Z -->

## 再査読担当の同一性について（メモ）
初回試験適合性査読（exam-reviewer-C11-001、2026-08-19）と修正後再査読（Locke 起動、担当ID は初回と同一の exam-reviewer-C11-001 で全文再査読）は同一IDである。セッション越えのため新規スレッドで起動したが、初回指摘だけでなく31枚全体を再査読し、その事情を本ファイルに記録する（AGENTS.md の規定に準拠）。
