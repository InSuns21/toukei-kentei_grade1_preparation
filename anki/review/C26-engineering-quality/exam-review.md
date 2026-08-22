# C26-engineering-quality 試験適合性査読

## 初回査読

- reviewer ID: `/root/c26_exam_review`
- 実行日時: 2026-08-22T21:37:45+09:00
- initial_reviewer_id: c26_exam_review
- initial_reviewed_at: 2026-08-22T21:37:45+09:00
- 対象: `anki/cards/48_engineering_quality.md` の新規47枚、`anki/progress.yaml`、`anki/syllabus/syllabus.yaml`、`anki/syllabus/coverage.yaml`、既存の `eng-*` カード、C20/C24関連カード
- 結果: `fatal: 0 / major: 3 / minor: 3`

### ねらい適合性

公式のねらい全文は「品質管理に関する種々の統計手法を正しく使うことができる。」である。5用語の実質的対応は次のとおりで、公式範囲そのものへの適合性は高い。

- 管理図: `engqc-xbar-known-sigma`、`engqc-xbar-r-chart-limits`〜`engqc-control-chart-sample-size` により、計量値・計数値管理図、誤警報、平均連長、ランルール、EWMA、CUSUMまで再生・計算・判定を扱う。
- プロセス管理: `engqc-control-vs-specification`、`engqc-common-special-causes`、`engqc-rational-subgrouping`、`engqc-phase1-phase2`、`engqc-process-adjustment-overcontrol` により、管理限界と規格限界、原因別行動、群分け、運用段階、過剰調整を判定できる。
- 工程能力指数: `engqc-cp-numeric`〜`engqc-nonnormal-capability` により、$C_p,C_{pk},C_{pm},C_{pu}$、規格外率、安定性・正規性の条件を扱う。
- 信頼性: `engrel-series-system`〜`engrel-bathtub-curve` により、直列・並列・k-out-of-n、指数・ワイブル寿命、故障率推定、競合リスクを扱う。
- 保全性: `engmaint-steady-availability`、`engmaint-maintainability-exponential`、`engmaint-two-state-availability`、`engmaint-preventive-replacement-rate`、`engmaint-series-availability`、`engmaint-reliability-vs-availability` により、保全度・可用度・予防取替を扱う。

全47枚が「問題 → 記号・用語 → 使用公式・定理 → 一手／方針 → 答え → 計算例 → 注意」の7節を備える。通常章向けの連結演習、答案圧縮、部分点構造、撤退基準はAnkiには要求していない。

### 知識充足性

- 計算技能は、管理限界、誤警報確率と平均連長、能力指数、系信頼度、寿命信頼度、可用度まで広く具体値で完遂している。
- 公式・定義の再生は、各カードの「使用公式・定理」に局所提示され、条件も「注意」でおおむね回収されている。
- 判定技能は、`engqc-control-vs-specification`、`engqc-common-special-causes`、`engqc-run-rule-eight-one-side`、`engqc-capability-stability-first`、`engrel-bathtub-curve`、`engmaint-reliability-vs-availability` が補っている。
- ただし、公式の「正しく使う」に直結する管理図の選択と、基準値を生データから推定する技能に不足がある（major-3）。

### 過不足

#### major-1: 既存カードとの実質重複

新規カードのうち次は、数値だけを変えた同一技能、または既存1枚を分割しただけであり、「同じ論点が存在する場合は重複させない」という方針を満たさない。

- `engqc-xbar-known-sigma` ↔ `eng-xbar-limits`
- `engqc-cp-numeric` ↔ `eng-capability-index`
- `engrel-series-system` ↔ `eng-series-reliability`
- `engrel-exponential-reliability` と `engrel-exponential-mtbf` ↔ `eng-exponential-reliability`
- `engrel-failure-rate-exposure-mle` ↔ C24の `engproc-poisson-rate-estimate-exposure`

既存カードを残すなら、新規側を異なる技能（管理図の選択、基準値推定、OC/検出確率を指定した標本数、並列系の共通原因故障、信頼区間など）へ差し替えること。C20の実験計画カードとは直接重複しない。C24の `engproc-repair-chain-stationary-availability` は離散時間、`engmaint-two-state-availability` は連続時間なので区別できる。

#### major-2: title_ids・親見出し・優先度根拠が作業内容と不一致

`anki/progress.yaml` は parent を「分散分析・仮説検定」、title_ids を195–212（仮説検定）と267–281（分散分析）、priority_counts を S10/A23 とするが、新規47枚は品質管理・信頼性・保全性であり、当該33タイトルを実質的に扱っていない。したがって、カードごとのS/A（実数はS19枚・A28枚）は指定sourceから追跡できず、「過去問IDに基づく優先度」の根拠になっていない。

品質管理用の正しいsource/parent/title_idsを設定するか、公式シラバスのみを根拠とする作業であることを明示して、無関係なIDと優先度集計を外すこと。少なくとも現状のままS/Aを過去問根拠として記録してはならない。

#### major-3: 管理図の選択・基準値推定という適用技能が不足

`engqc-p-chart-constant-n`、`engqc-np-chart`、`engqc-c-chart`、`engqc-u-chart` は各公式を個別に計算できるが、「不適合品数／不適合数」「標本数一定／可変」から適切な管理図を選ぶ横断カードがない。また $\bar p,\bar c,\bar u,\bar{\bar X},\bar R$ はすべて所与で、生の群別データから重み付き基準不適合品率や中心線を推定する計算がない。公式の「正しく使う」ため、重複カードの差し替えで少なくとも選択判定1枚と基準値推定1枚を追加すること。

#### minor-1: `engqc-control-chart-sample-size` の表題と到達技能がずれる

このカードは $1.5\sqrt n\ge3$ から「シフト後平均が管理限界位置に達する」条件を求めるだけで、その位置での1点検出確率は約0.5である。「シフト検出標本数」という表題は所望検出力からの設計と誤解させる。表題・問題を「平均位置が3シグマ限界に達する群サイズ」へ直すか、目標検出確率を与えた標本数設計へ改めること。

#### minor-2: 公式用語「ワイブル分布」と表記が不統一

`engrel-weibull-hazard-shape` と `engrel-weibull-reliability` のtitle・問題・記号欄は「Weibull寿命」とする一方、公式termsとhashtagsは「ワイブル分布」である。初出を「ワイブル分布（Weibull distribution）」に統一し、検索語も維持すること。

#### minor-3: カード単体で略号の意味を復元しにくい箇所がある

`engqc-xbar-known-sigma`〜`engqc-u-chart` の $CL,UCL,LCL$、`engqc-cp-numeric`〜`engqc-one-sided-cpu` の $USL,LSL$、`engqc-arl0-three-sigma`・`engqc-arl1-mean-shift` の添字0/1、`engqc-capability-defect-rate`・`engqc-nonnormal-capability` の ppm は、日本語の意味または英語展開がカード内で十分に明示されない。カード単体で再生できるよう「記号・用語」に中心線／上方・下方管理限界、上側・下側規格限界、管理内／変化後平均連長、parts per millionを短く追記すること。

### 優先度根拠

- S相当: 基本管理図の限界計算、管理限界と規格限界、共通原因と特殊原因、$C_p/C_{pk}$、直列・並列信頼度、指数寿命、可用度は、5用語の中核で他カードの前提でもあるため妥当。
- A相当: EWMA/CUSUM、非正規能力、競合リスク、予防取替、ワイブル形状などは中核の後に扱う発展・応用として妥当。
- ただしtitle_ids 195–212/267–281はこの区分を裏づけないため、major-2を解消するまで「S10/A23に基づく」とは評価できない。全カードのfrequencyも0であり、過去問頻度による追加裏付けはない。

### 配信品質

- `engineering-quality` はcoverage上completeで、47新規IDと既存4IDがカテゴリー配信対象に登録され、5公式用語もカードへ対応付けられている。
- 7節構成とメタデータは機械検証を通過している。
- 重複カードが同一配信ページに並ぶ検索・復習上の冗長性はmajor-1の解消が必要。

### 機械検証

- `npm run anki:validate`: 成功（1325 cards、0 warnings、30 category pages、max 200）
- `npm run validate`: 成功（structure / math / text すべて成功、KaTeX 370 Markdown files）

## 修正後再査読

- reviewer ID: `/root/c26_exam_review`
- 実行日時: 2026-08-22T21:48:02+09:00
- 対象: 修正後の新規47枚と関連正本の全文
- 結果: `fatal: 0 / major: 0 / minor: 1`

### 初回指摘の修正確認

- major-1: 重複していたカードは、管理図選択、$p$ 管理図の基準値推定、共通原因故障、直列系信頼度の逆算、使命信頼度からのMTBF要件、故障率の正確信頼区間へ差し替えられた。既存 `eng-*` およびC20/C24との実質重複は解消した。
- major-2: 無関係なparent・title_ids・priority_countsは削除され、`basis: official_syllabus` と5公式用語を根拠とする説明へ修正された。
- major-3: `engqc-xbar-known-sigma` の管理図選択と `engqc-cp-numeric` の重み付き基準不適合品率推定により、選択・基準値推定技能が補充された。
- minor-1: `engqc-control-chart-sample-size` は表題が実際の計算内容へ一致した。
- minor-2: 2枚とも「ワイブル分布（Weibull distribution）」へ統一された。
- minor-3: $CL,UCL,LCL$、$USL,LSL$、$ARL_0,ARL_1$、ppmの意味がカード内へ追記された。

### 残存指摘

#### minor-1: 差し替え後のカードIDが内容と一致しない

次の5枚はtitle・topic・本文は正しく差し替えられたが、IDだけが旧論点を表したままである。coverage・検索・後続査読で誤認を生むため、内容に対応する安定IDへ変更し、coverageと作業記録の参照を同期すること。

- `engqc-xbar-known-sigma`（実内容: 管理図選択）
- `engqc-cp-numeric`（実内容: $p$ 管理図の基準値推定）
- `engrel-series-system`（実内容: 共通原因故障を含む並列系）
- `engrel-exponential-reliability`（実内容: 直列系の部品信頼度要件）
- `engrel-failure-rate-exposure-mle`（実内容: 故障率の正確信頼区間）

### ねらい適合性・知識充足性・過不足・優先度根拠

初回の3 majorと3 minorは上記のとおり内容面では解消した。公式5用語をすべて再生・計算・選択・条件判定で扱い、公式のねらい「品質管理に関する種々の統計手法を正しく使うことができる。」を満たす。47枚はS19/A28で、Sは基本管理図・能力・基本信頼性・可用度、Aは逐次管理図・非正規能力・発展信頼性・保全方策という順序になっており、公式シラバスbasisに対する学習順として妥当である。残る過不足は上記ID不一致だけである。

### 配信品質

coverageの5用語対応、47枚の7節、カテゴリー配信は正常である。ただしID不一致は検索・参照品質のため修正を要する。

### 機械検証

- `npm run anki:validate`: 成功（1325 cards、0 warnings、30 category pages、max 200）
- `npm run validate`: 成功（structure / math / text すべて成功、KaTeX 372 Markdown files）

### 最終結果

`fatal: 0 / major: 0 / minor: 1`

## 最終再査読

- final reviewer ID: `/root/c26_exam_review`
- final reviewed at: 2026-08-22T21:53:10+09:00
- final_reviewer_id: c26_exam_review
- final_reviewed_at: 2026-08-22T21:53:10+09:00
- 対象: 最終修正後の新規47枚、`anki/progress.yaml`、`anki/syllabus/syllabus.yaml`、`anki/syllabus/coverage.yaml`、記法・公式正本、既存C20/C24/`eng-*`カード
- 修正確認: 5枚のIDは `engqc-control-chart-selection`、`engqc-p-chart-baseline-estimation`、`engrel-parallel-common-cause`、`engrel-series-component-requirement`、`engrel-failure-rate-exact-ci` へ変更され、title・topic・本文およびcoverage参照と一致した。
- ねらい適合性: 公式のねらい全文「品質管理に関する種々の統計手法を正しく使うことができる。」に対し、管理図、信頼性、保全性、プロセス管理、工程能力指数の5用語を、公式再生だけでなく具体計算・管理図選択・前提判定・運用判断まで扱う。
- 知識充足性: 管理図の選択と基準値推定、各種管理限界、誤警報・平均連長、小変化検出、工程能力、系信頼度、寿命モデル、故障率区間、保全度・可用度・予防取替を充足する。各カードは7節で1論点を完結し、式・条件・具体例をカード内で再生できる。
- 過不足: 既存カードおよびC20/C24との実質重複はなく、47枚はtarget 45〜55内である。過剰な論述要件はAnkiへ持ち込まれていない。
- 優先度根拠: 無関係なtitle_idsは除去済みで、公式シラバス5用語をbasisとする。S19枚は基本計算・中核判定、A28枚は発展管理図・非正規能力・信頼性／保全性の応用として学習順が妥当である。
- 配信品質: coverageの全IDと5用語対応は本文に一致し、検索用ID、公式用語表記、略号定義に残存不整合はない。
- `npm run anki:validate`: 成功（1325 cards、0 warnings、30 category pages、max 200）
- `npm run validate`: 成功（structure / math / text すべて成功、KaTeX 372 Markdown files）
- final result: `fatal: 0 / major: 0 / minor: 0`
