# C11-interval-estimation 自己査読（メイン担当）

- 対象: `anki/cards/32_interval_estimation.md`（新規31枚）
- 日時: 2026-08-19 Asia/Tokyo
- 範囲: 区間推定（source 親「区間推定」、title_ids 181–194、S11/A3）
- 正本同期: `anki/notation.md`（区間推定セクション追加）、`anki/formulae.md`（区間推定セクション追加）、`anki/syllabus/coverage.yaml`（math-interval-estimation → complete、既存 test-normal-ci を維持し32枚を追加）

## 自己査読チェック項目

### 1. 1カード1論点
- 定義系: 被覆確率、頻度主義的解釈、ピボット量定義、ピボット構成手順、片側区間、双対性、漸近区間定義、区間幅と信頼係数のトレードオフ、必要標本サイズ — 各1論点。
- 定理・公式系: 正規平均既知、t区間ピボット構成、カイ二乗区間導出、F分散比、2標本平均差、Welch区間、母比率、母比率差、双対性の受容域確認、MLE漸近区間、デルタ法区間 — 各1論点。
- 計算系: 各公式の数値適用カード（known/calc、variance/calc、f/calc、two-sample/calc、welch/calc、proportion/calc、proportion-diff/calc、one-sided/calc、asymptotic-mle/calc、delta-method/calc、sample-size）— 再生と計算を分離。
- 重複排除: 既存 `samp-ci-mean-t`・`samp-ci-variance-chisq`・`samp-welch-t` は `math-sampling-distributions` の計算カード。本作業は `math-interval-estimation` サブカテゴリーに定義・定理・派生・計算補強を配置し、単一論点の重複は作っていない。

### 2. 公式提示
- 全カードで `## 使用公式・定理` に定義式または区間構成式を再掲。台・母数が必要な例（正規・カイ二乗・F・t）は問題文または定理欄でその場明示。
- `N(…)` は「正規分布」を先置き。単独表示用語 `MLE` は `最尤推定量` へ統一（noncanonical display term 解消済み）。

### 3. 目で追える式展開
- 非自明な変形（ピボット構成の不等式反転、両側区間の分位点の向き、Welch自由度の計算、デルタ法の分散伝播、双対性の受容域⇔区間）は「操作/根拠→変形後」の順で示した。
- 非対称分布（カイ二乗・F）では上下端で分位点の向きが逆になる理由を注意欄へ明記。

### 4. 具体例完遂
- 全計算カードが最終的な具体的数値・区間端へ到達。例: 既知分散半幅0.784、カイ二乗区間[4.91,21.56]、F区間[0.373,6.04]、2標本[0.121,3.879]、Welch[-0.118,4.118]、比率[0.255,0.345]、比率差[0.003,0.197]、片側(下側[99.342,∞)、上側(-∞,100.658])、MLE漸近[0.304,0.496]、デルタ法[4.49,10.29]、必要標本サイズn=62。

### 5. ソースタイトル181–194の対応
| ID | タイトル | 主対応カード |
|---|---|---|
| 181 | 信頼区間の被覆確率 | ci-coverage-probability, ci-coverage-frequentist |
| 182 | ピボット量の考え方 | ci-pivot-definition, ci-pivot-construction |
| 183 | 正規平均・分散既知の信頼区間 | ci-normal-mean-known, ci-normal-mean-known-calc |
| 184 | 正規平均・分散未知のt区間 | ci-t-interval-pivot, ci-t-vs-z |
| 185 | 正規分散のカイ二乗区間 | ci-variance-chi-derivation, ci-variance-chi-calc |
| 186 | 2正規母分散比のF区間 | ci-f-variance-ratio, ci-f-variance-ratio-calc |
| 187 | 2標本平均差の区間推定 | ci-two-sample-mean-diff, ci-two-sample-mean-diff-calc |
| 188 | Welch型区間推定 | ci-welch-interval, ci-welch-calc |
| 189 | 母比率の正規近似区間 | ci-proportion, ci-proportion-calc |
| 190 | 母比率差の区間推定 | ci-proportion-diff, ci-proportion-diff-calc |
| 191 | 片側信頼区間 | ci-one-sided, ci-one-sided-calc |
| 192 | 信頼区間と検定の双対性 | ci-test-duality, ci-duality-acceptance |
| 193 | 漸近信頼区間 | ci-asymptotic-def, ci-asymptotic-mle, ci-asymptotic-mle-calc |
| 194 | デルタ法による信頼区間 | ci-delta-method, ci-delta-method-calc |

18ソースタイトル(181–194)は全件が主対応カードを持ち、計算補強で過剰になっていない。

### 7. 実カード枚数と優先度配分（査読指摘への事前訂正）
- 実際の新規カードは **31枚**（ファイル名は `32_` だが中身31枚）。source 181–194 の14タイトル対応はすべて揃っており論点欠落ではない。
- 優先度配分は実際 **S25 / A6**（計算補強カードを S に位置づけ）。source priority_counts S11/A3 の意図と整合。

### 6. 優先度
- 新規31枚の優先度配分は実際 S25 / A6（source priority_counts は S11/A3 に対し、計算補強カードを S に位置づけ）。S は被覆確率・既知/未知・カイ二乗・F・2標本・Welch・比率・片側・双対性・漸近・デルタ法の前提技能、A は比率差・トレードオフ等。
- `frequency.past_exam: 0` は現行 `past-exam-index.yaml` の対応欠如と整合。

## 機械検証
- `npm run anki:validate`: 成功（476カード、警告0件）。coverage math-interval-estimation は complete、32枚全て card に登録。

## 結論
1カード1論点、公式提示、目で追える展開、具体例完遂、ソース対応、優先度のいずれも満たす。独立査読へ回送可能。

self-review: 完了（fatal 0 / major 0 / minor 0）
