# C21-regression-multivariate 試験適合性査読

- initial_reviewer_id: c21_exam_review
- initial_reviewed_at: 2026-08-21T03:46:38Z
- 対象: `anki/cards/43_regression_multivariate.md` の新規70枚、`anki/formulae.md`、`anki/syllabus/coverage.yaml`、`anki/progress.yaml`
- 公式ねらい: 「重回帰分析・各種多変量解析法・確率過程・時系列解析について正しく理解すると共に、ソフトウェアの出力結果の解釈ができる。」のうち、C21が担当する重回帰分析・各種多変量解析法
- 参照タイトル: 親「多変量解析・一般化線形モデル・線形回帰」の 245–266、296–311、343–359
- 参照優先度: S 14 / A 16 / B 24 / C 1

## 初回指摘

### major

1. 公式ねらいの「ソフトウェアの出力結果の解釈」がカード技能として欠けている。
   - 根拠: 新規70枚は `calc_step` 45枚、`formula` 14枚、`recognition` 11枚で、数式の再生・手計算・条件判定は厚いが、係数表、分散分析表、逸脱度表、主成分分析の固有値・負荷量表、因子負荷量表、分類結果など、ソフトウェア出力を提示して必要な列・検定・解釈を選ばせるカードがない。
   - 影響: `reg-general-linear-hypothesis`、`glm-likelihood-ratio-test`、`mv-pca-contribution-rate`、`mv-factor-communality`、`mv-lda-classification-rule` は公式を直接計算できても、実際の出力から対応する統計量・自由度・符号・判定を読み取る到達行動を確認できない。
   - 必要な修正: 少なくとも、(a) 重回帰の係数表またはANOVA表、(b) GLMの逸脱度・係数出力、(c) PCAまたは因子分析の出力表、の3種類について、短い模擬出力から結論を読む具体的計算・判定カードを追加する。カードID案は `reg-software-output-coefficient-table`、`glm-software-output-deviance-table`、`mv-software-output-pca-table`。現在70枚なので、追加後も目安70〜80枚に収まる。

### minor

1. `mv-kmeans-one-iteration` の重心更新式が `\bar x_{C_1}=1,qquad \bar x_{C_2}=9` となっており、`\qquad` のバックスラッシュが欠けている。
   - 影響: 配信画面では `qquad` が数式中の文字として表示され、正しい等式を目で追う妨げになる。
   - 必要な修正: `\bar x_{C_1}=1,\qquad \bar x_{C_2}=9` とする。

## ねらい適合性

- 「重回帰分析・各種多変量解析法について正しく理解」は概ね達成している。45枚の計算カードにより、公式暗記だけでなく、一般線形仮説、回帰診断、一般化最小二乗、正則化、PCA、因子分析、判別分析、クラスタリング、GLMの計算・適用まで確認できる。
- 公式用語は `applied-multiple-regression` の8用語と `applied-multivariate` の10用語をすべて実質的に扱っている。プロビット分析、トービット分析、非線形回帰モデル、サポートベクターマシンは各1枚であるが、B相当の周辺技能として定義・適用条件を再生できる最小単位になっている。
- 「ソフトウェアの出力結果の解釈」は上記majorのとおり未達である。公式ねらい全文への適合には、数値が既に整理された模擬出力を読むカードが必要である。

## 知識充足性

- タイトル245–266の線形回帰は、既存 `math-regression` の `reg-simple-model-assumptions`、`reg-matrix-ols-derivation`、`reg-slope-geometric-projection`、`reg-beta-unbiased-covariance`、`reg-residual-orthogonality`、`reg-r-squared`、`reg-adjusted-r-squared`、`reg-slope-t-test`、`reg-overall-f-test`、`reg-mean-response-ci`、`reg-prediction-interval`、`reg-hat-matrix-properties`、`reg-multicollinearity-vif`、`reg-dummy-variable`、`reg-interaction-dummy-continuous`、`reg-model-diagnostics-summary` 等で既に充足している。C21では `reg-general-linear-hypothesis`、`reg-robust-sandwich`、`reg-gls-estimator` 等へ進めており、同一論点の不要な複製を避けている。
- タイトル296–311は `glm-three-components` から `glm-logistic-marginal-effect` までで、三要素、指数型分布族、正準リンク、二項・ポアソン、IRLS、逸脱度、Pearson統計量、尤度比、交互作用、過分散、限界効果を網羅する。
- タイトル343–359は `mv-mean-covariance-numeric` から `mv-mds-double-centering` までで、平均・共分散、Mahalanobis距離、Hotelling、PCA、因子分析、判別、階層法、k-means、正準相関、MDSを網羅する。
- 個々のカードは原則1カード1論点で、使用公式・定理をカード内に再掲し、数値例まで完遂している。ソフトウェア出力技能を除けば、再生・計算・適用・条件判定の組合せは十分である。

## 過不足

- 不足: 模擬ソフトウェア出力の読解カード。上記majorの3系統を追加すべきである。
- 過剰: `reg-elastic-net-objective`、`reg-nested-cross-validation`、`glm-svm-margin` などは指定タイトルの周辺だが、各1枚かつBであり、公式用語の理解や実践的判定を支える範囲に留まるため削除不要である。
- 重複: 線形回帰245–266を既存 `math-regression` に委ねた判断は妥当である。新規カード内では、HC0とHC3、Lassoの閉形式とKKT、PCAの固有値・得点・負荷量が役割分担されており、同一の問いの重複ではない。
- 配信品質: 1枚の表示誤記を除き、検索用タイトル・hashtags・subcategoryは論点を識別できる。coverageは両サブカテゴリーをcompleteとし、公式用語へのカード対応も記録している。

## 優先度根拠

- sourceのS 14件は線形回帰の中核で、既存 `math-regression` のS/Aカードにより先行充足している。C21で重複追加しない判断は妥当である。
- 新規A 16枚は、GLMの三要素・推定・ロジスティック・ポアソン・過分散、PCAの導出、平均共分散、頑健標準誤差、一般化最小二乗など、計算連鎖の入口または頻出の適用技能に配されている。
- 新規Cは `mv-canonical-correlation` の1枚でsourceのC 1件と一致する。その他の発展・診断カードをBに留めた配分も、S/Aを先に学ぶ順序を損なわない。
- 追加するソフトウェア出力カードは公式ねらいに直結するため、少なくとも重回帰・GLMをA、PCA/因子分析をBとするのが妥当である。

## 機械検証

- `npm run anki:validate`: 成功。1052 cards、0 warnings、19 category pages、最大200枚。
- `npm run validate`: 成功。構造検証、348 MarkdownファイルのKaTeX strict検証、237生成対象テキスト検証を完了。
- 機械検証は `mv-kmeans-one-iteration` の `qquad` を有効な文字列として受理するため、表示上の誤記は手動査読指摘として残す。

## 初回集計

- fatal: 0
- major: 1
- minor: 1
- fatal: 0 / major: 1 / minor: 1

## 修正確認

- final_reviewer_id: c21_exam_review
- final_reviewed_at: 2026-08-21T03:51:29Z
- 再査読範囲: 修正箇所だけでなく、新規73枚、formulae、coverage、progressの作業単位全体

### 初回majorの確認

- `reg-software-output-interpretation` が、重回帰の係数表から係数の条件付き解釈、個別t検定、回帰全体F検定を区別して判定させる。出力内の `Estimate / Std. Error = t` も再計算するため、単なる用語再生ではない。
- `glm-software-deviance-output` が、Null devianceとResidual devianceおよび自由度差から尤度比統計量と帰無分布を復元し、棄却判定まで完遂させる。
- `mv-pca-software-output` が、標準化PCA出力の固有値から寄与率を計算し、固有ベクトルの方向・大きさを変数寄与として解釈させる。固有ベクトル成分と変数・主成分間相関を混同しない注意もある。
- 3枚により、公式ねらいの「ソフトウェアの出力結果の解釈」は重回帰・一般化線形モデル・多変量解析の各領域で直接測定されるようになった。初回majorは解消した。

### 初回minorの確認

- `mv-kmeans-one-iteration` の更新式は `$\bar x_{C_1}=1,\qquad \bar x_{C_2}=9$` に修正され、配信時に数式として正しく表示される。初回minorは解消した。

### 全体再査読

- 73枚は目安70〜80枚の範囲内で、`calc_step` 47枚、`recognition` 12枚、`formula` 14枚である。公式・定義の再生だけに偏らず、数値計算、適用条件、モデル選択、出力解釈を問う構成になっている。
- 公式ねらい全文のうちC21担当範囲について、重回帰分析は既存 `math-regression` の中核カードを再利用しつつ、一般線形仮説、GLS、異分散頑健推論、診断、正則化、モデル選択へ拡張されている。各種多変量解析はPCA、因子、判別、クラスタリング、正準相関、MDSに加え、公式用語として列挙されたロジスティック、プロビット、トービット、一般化線形モデル、非線形回帰、SVMまで扱う。
- title_ids 245–266は既存 `math-regression` の対応カードで充足し、296–311と343–359は新規カードで全件実質的に対応する。同じ公式や数値例をそのまま重ねたカードはなく、既存カードとの役割分担は妥当である。
- 追加後も過剰はない。ソフトウェア出力3枚は公式aimに直接必要であり、重回帰出力をS、GLM・PCA出力をAとした優先度は妥当である。全体の優先度はS 3 / A 18 / B 51 / C 1で、sourceのS 14件は既存線形回帰カードによる充足を前提にしているため、新規枚数分布だけをsource件数へ機械的に合わせる必要はない。
- coverageには3枚が各サブカテゴリーのcardsと対応termへ同期され、両サブカテゴリーの公式用語はすべてcard状態である。タイトル、hashtags、サブカテゴリーから検索可能で、配信ページ上限にも抵触しない。

## 再査読時の機械検証

- `npm run anki:validate`: 成功。1055 cards、0 warnings、19 category pages、最大200枚。
- `npm run validate`: 成功。構造検証、350 MarkdownファイルのKaTeX strict検証、237生成対象テキスト検証を完了。

## 最終件数

- fatal: 0
- major: 0
- minor: 0
- fatal: 0 / major: 0 / minor: 0
