initial_reviewer_id: agent-exam-C09
final_reviewer_id: agent-exam-C09
initial_reviewed_at: 2026-08-19T04:17:40Z
final_reviewed_at: 2026-08-19T05:05:00Z

# C09-model-selection 試験適合性査読

## 初回指摘
- 初回査読は `fatal: 0 / major: 0 / minor: 0`。指摘なし。

## 修正確認
- `ms-aic-formula` のAIC計算が $214$ に修正、`ms-multicollinearity-ridge` の最小固有値方向限定が追加されたことを確認。両件とも解決。

- 査読対象: `anki/cards/30_model_selection.md` の新規21枚
- 査読者: EXAM-FITNESS reviewer
- 実行日時: 2026-08-19 (Asia/Tokyo)
- 範囲: Ankiカード単位の試験適合性。連結演習・答案圧縮・部分点指針は Anki の必須成果物ではないため、対象外とする。

## 対象とする公式ねらい

`math-model-selection` は、統計数理「統計的推測（推定）」の公式ねらい「尤度などの統計的推測に重要な役割を果たす概念を理解し、パラメータの推定法の原理を知り、推定量の良さを数学的に定式化できる。」の対象サブカテゴリーである。この作業の cards は、モデル評価・選択・正則化に関する再生・計算・条件判定の反復技能をこのねらいに沿って養う。

## 公式用語の操作確認

- カルバック・ライブラー情報量: `ms-kl-divergence` が離散・連続の定義式を再掲し、数値例で計算する。`ms-kl-nonnegativity` が非負性の根拠となる不等式と導出を再掲する。**適合。**
- 情報量規準AIC: `ms-aic-formula` が $-2\ell(\widehat\theta)+2k$ を再掲し、数値例と選択規則を与える。`ms-aic-asymptotic-loo`、`ms-info-criterion-likelihood` が理解を補う。**適合。**
- クロスバリデーション: `ms-cv-model-selection` が k-fold の定義式とモデル選択例を、`ms-cv-loo` が LOOCV の定義式と線形回帰の閉形式を与える。**適合。**

## source titles 455–469 の対応

- 455 過学習と汎化誤差: `ms-overfitting-generalization`
- 456 訓練誤差とテスト誤差: `ms-train-test-error`
- 457 AIC: `ms-aic-formula`, `ms-aic-asymptotic-loo`
- 458 BIC: `ms-bic-formula`, `ms-bic-consistency`
- 459 尤度と情報量規準: `ms-info-criterion-likelihood`
- 460 変数選択: `ms-variable-selection-stepwise`
- 461 交差検証によるモデル選択: `ms-cv-model-selection`, `ms-cv-loo`
- 462 Ridge回帰: `ms-ridge-regression`, `ms-ridge-shrinkage`
- 463 Lasso回帰: `ms-lasso-regression`
- 464 L1・L2正則化の違い: `ms-l1-l2-difference`
- 465 正則化とバイアス・バリアンス: `ms-regularization-bias-variance`
- 466 Lassoの変数選択性: `ms-lasso-selection`
- 467 Elastic Net: `ms-elastic-net`
- 468 多重共線性とRidge: `ms-multicollinearity-ridge`
- 469 予測目的と推測目的の違い: `ms-prediction-vs-inference`

15 source titles すべてが合理的に対応している。`ms-kl-divergence` / `ms-kl-nonnegativity` は source title 番号には直接対応しないが、公式用語「カルバック・ライブラー情報量」を操作するために必要であり、過剰とは言えない。

## カード単位の適合性

- 1カード1論点: 各カードは過学習、AIC、BIC、k-fold、LOOCV、Ridge、Lasso、Elastic Net、目的の違いなど、独立した技能単位に分かれている。複数の概念が混在するカードも、AIC/LOOCV の漸近的関係や Ridge/多重共線性のような意味的まとまりとして機能しており、論点の機械混在ではない。
- 再生・計算・判定技能: 定義式・選択規則の再生、AIC/BIC/KL/CV/Ridge縮小の数値計算、モデル選択・目的判定・正則化条件の判断が揃っている。
- 公式・定義・条件の再掲: 使用公式・定理欄で必要な式が再掲され、台・対数の底・ `$\lambda\ge0$`・ランク条件・漸近条件など主要条件が示されている。
- 重複・過不足: `ms-overfitting-generalization` と `ms-train-test-error` は、前者が誤差曲線の理解、後者が実測値に基づく選択判断という別技能を扱う。`ms-cv-model-selection` と `ms-cv-loo` も一般 k-fold と LOOCV という別規程を扱う。重複ではない。21枚は `target.min: 18` / `target.max: 22` の範囲内であり、過剰ではない。
- 優先度: source の B/C 分類に沿い、AIC・CV・Ridge・Lasso・Lasso選択性・多重共線性Ridgeを B、概念整理や BIC・Elastic Net 等を C としている。公式用語と関連する一方で過去問索引に直接的な該当が確認できない範囲のため、親「モデル選択・正則化」の B 位置と整合する。S/A がない点も source の priority_counts（S:0, A:0, B:6, C:9）と一致する。
- 過去問対応: `references/past-exam-trends.md`・`past-exam-index.yaml` には、この21枚に直結するモデル選択・正則化の実過去問が確認できない。このため頻度値 0 のまま扱うのは conservative であり、優先度根拠としては source の親優先度と公式シラバス用語が実質根拠となる。

## 指摘

なし。

## 機械検証

- コマンド: `npm run anki:validate`
- 実行日時: 2026-08-19 (Asia/Tokyo)
- 結果: 成功。`validated 418 cards (0 warnings)`、`built 418 cards in 7 category page(s), max 200 per page`、`checked 418 cards in 7 category page(s), max 200 per page`。

fatal: 0 / major: 0 / minor: 0

<!-- initial_reviewer_id: agent-exam-C09  initial_reviewed_at: 2026-08-19T04:17:40Z  final_reviewer_id: agent-exam-C09  final_reviewed_at: 2026-08-19T05:05:00Z -->

<!-- 2026-08-19 EXAM-FITNESS RE-REVIEW -->

## 再査読（修正後）

- 査読対象: `anki/cards/30_model_selection.md` の全21枚（`ms-overfitting-generalization` 〜 `ms-prediction-vs-inference`）
- 査読者: EXAM-FITNESS reviewer
- 実行日時: 2026-08-19 (Asia/Tokyo)
- 前回判定: `fatal: 0 / major: 0 / minor: 0`

### 修正確認

- AIC計算: `ms-aic-formula` の $k=7$ の例が $-2(-100)+2\cdot7=214$ に修正されている。数値計算・選択規則・母数ペナルティの説明は試験運用上も適切である。**解決。**
- 多重共線性とRidge: `ms-multicollinearity-ridge` は $\operatorname{Var}(\widehat{\boldsymbol\beta}_{\mathrm{LS}})=\sigma^2(\boldsymbol X^{\mathsf T}\boldsymbol X)^{-1}$、最小固有値方向の分散増大、$\lambda I_p$ 追加による安定化を整理している。条件判定と理由説明として試験運用上適切である。**解決。**

### 全21枚の再評価

- ねらい適合性: 全カードが公式ねらい「尤度などの統計的推測に重要な役割を果たす概念を理解し、パラメータの推定法の原理を知り、推定量の良さを数学的に定式化できる。」の対象として、モデル評価・選択・正則化の再生・計算・条件判定・適用技能を養う。範囲逸脱はない。
- 知識充足性: 過学習・汎化誤差、訓練／テスト誤差、KL情報量と非負性、AIC・BIC・尤度に基づく規準、変数選択、k-fold CV・LOOCV、Ridge・Lasso・Elastic Net、バイアス・バリアンス、多重共線性、予測／推測目的まで、合格に必要な基礎操作が揃っている。
- 公式用語の操作カード: カルバック・ライブラー情報量は `ms-kl-divergence` / `ms-kl-nonnegativity`、情報量規準AICは `ms-aic-formula` / `ms-aic-asymptotic-loo`、クロスバリデーションは `ms-cv-model-selection` / `ms-cv-loo` で操作可能であり、3用語とも要件を満たす。
- source titles 455–469: 前回査読に記録した15件の対応表のまま、455〜469の全タイトルが特定カード群で合理的にカバーされている。公式用語「カルバック・ライブラー情報量」対応の2枚は source 番号外だが、公式シラバス充足に必要で過剰ではない。
- 重複・過不足: 一般誤差曲線／実測値選択、k-fold／LOOCV、Ridge定義／直交縮小などは互いに別技能であり、重複とは判定しない。21枚は `target.min: 18` / `target.max: 22` の範囲内で、不足も過剰もない。
- 優先度: B/Cの付与は source の親「モデル選択・正則化」（B）と各タイトルの B/C 分布、公式シラバス用語の必要性、過去問索引上で直結実過去問が確認できないことと整合する。過度な昇格・降格は不要である。
- 優先度根拠: 親「モデル選択・正則化」は公式シラバス上 B 位置、各タイトルは B:6 / C:9（priority_counts S:0, A:0）。過去問索引に直結実過去問がないため頻度値 0 のまま保守的に扱い、公式用語操作に必要なカードを優先して B に、概念整理・発展を C に振り分けた。
- 配信品質: 1カード1論点が保たれ、公式・定理・条件・具体例が各カード内で完結している。検索語・日本語用語も配信上問題ない。サイト表示の「OLS」表記に関する既知の非正規用語指摘は対象外とする（validator成功により確認）。

### 現在の指摘

- fatal: なし
- major: なし
- minor: なし

### 機械検証（再査読時）

- コマンド: `npm run anki:validate`
- 実行日時: 2026-08-19 (Asia/Tokyo)
- 結果: 成功。`validated 418 cards (0 warnings)`、`built 418 cards in 7 category page(s), max 200 per page`、`checked 418 cards in 7 category page(s), max 200 per page`。

fatal: 0 / major: 0 / minor: 0
