# C27-engineering-design 試験適合性査読

## 初回査読

- reviewer ID: `/root/c27_exam_review`
- 実行日時: 2026-08-22T22:06:55+09:00
- initial_reviewer_id: c27_exam_review
- initial_reviewed_at: 2026-08-22T22:06:55+09:00
- 対象: `anki/cards/49_engineering_design.md` の新規43枚、`anki/progress.yaml`、`anki/syllabus/syllabus.yaml`、`anki/syllabus/coverage.yaml`、既存C20 `design-*` カード、関連する分散分析カード、source parent「実験計画」の title_ids 282–295、過去問 `SCI-2016-Q1`
- 結果: `fatal: 0 / major: 2 / minor: 1`

### ねらい適合性

公式のねらい全文は「品質管理に関する種々の統計手法を正しく使うことができる。」である。`engineering-design` はこのねらいに割り当てられており、新規43枚は実験計画を選び、割り付け、効果を計算し、識別可能性を判定する技能を具体化している。公式7用語への実質的対応は次のとおりである。

- 実験の計画と実施: `engdesign-objective-response-factor`、`engdesign-pseudoreplication-count`、`engdesign-randomization-permutation`、`engdesign-crd-treatment-effect`、`engdesign-factorial-22-effects`、`engdesign-split-plot-randomization`、`engdesign-repeated-measures-unit`、`engdesign-choice-integrated` などが、実験目的、実験単位、無作為化、反復、要因計画、誤差層、計画選択を扱う。
- 固定効果: `engdesign-fixed-random-classification` と `engdesign-fixed-effect-hypothesis` が、推測対象による分類と帰無仮説の再生を扱う。
- 変量効果: `engdesign-fixed-random-classification`、`engdesign-random-intercept-moments`、`engdesign-oneway-random-ems` が、分散成分、群内相関、期待平均平方の計算を扱う。
- 交絡因子: `engdesign-confounder-randomization` と `engdesign-block-vs-covariate` が、処置割付との関連、無作為化、ブロック・共変量による制御を扱う。
- ブロック化: `engdesign-blocking-variance-reduction`、`engdesign-rcbd-adjusted-difference`、`engdesign-rcbd-sums-of-squares`、ラテン方格、分割法、不完備ブロックの各カードが、局所管理から推定可能性まで扱う。
- 直交表: `engdesign-contrast-orthogonality`、`engdesign-balanced-factor-orthogonality`、`engdesign-oa-l4-assignment`、`engdesign-oa-column-df`、`engdesign-oa-level-effect`、`engdesign-oa-interaction-conflict`、`engdesign-snr-smaller-better` が、直交条件、列割付、自由度、効果、列競合を扱う。
- 交絡法: `engdesign-defining-relation-23half` から `engdesign-partial-confounding` までが、生成式、定義関係、別名構造、解像度、foldover、ブロック交絡、部分交絡を扱う。

全43枚が「問題 → 記号・用語 → 使用公式・定理 → 一手／方針 → 答え → 計算例 → 注意」の7節を備える。Ankiの範囲外である連結演習、答案圧縮、部分点構造、撤退基準は要求していない。

### 知識充足性

- 再生技能は、実験単位、固定効果・変量効果、交絡因子、別名、解像度、誤差層、計画選択をカード単位で問えている。
- 計算技能は、主効果・交互作用、平方和、乱塊法・ラテン方格、直交表、分散成分、BIBD、反復数と標準誤差まで具体値で完遂している。
- 判定技能は、直交性、別名、計画の解像度、ブロック化の有効性、固定・変量分類、交絡因子、列競合、処置対比の推定可能性を扱う。
- `SCI-2016-Q1` に対応する `engdesign-incomplete-block-connectivity` は、不完備ブロックの接続グラフから処置対比の推定可能性を判定させ、過去問構造に対応する独自カードとして有用である。
- source 282–295の14論点は集合として扱われている。ただしtitle 295「検出力と標本サイズの考え方」の優先度追跡はmajor-2のとおり不整合である。

### 過不足

#### major-1: 既存C20カードとの実質重複が多数残る

次の新規カードは、既存 `design-*` カードと問い・使用公式・到達技能が同一または数値だけを変えた関係である。「同じ論点が存在する場合は重複させない」という方針を満たさず、同一配信教材内で復習負荷を増やす。

- `engdesign-contrast-orthogonality` ↔ `design-orthogonality-check`
- `engdesign-balanced-factor-orthogonality` ↔ `design-balanced-orthogonality`
- `engdesign-factorial-22-effects` ↔ `design-two-by-two-effects` / `design-two-by-two-numeric`
- `engdesign-factorial-23-main-effect` ↔ `design-two-cubed-effects-numeric`
- `engdesign-factorial-effect-ss-numeric` ↔ `design-factorial-effect-ss`
- `engdesign-defining-relation-23half` ↔ `design-defining-relation`
- `engdesign-alias-23half` ↔ `design-alias-structure`
- `engdesign-resolution-classification` ↔ `design-resolution-levels`
- `engdesign-block-confounding-23` ↔ `design-block-confounding`
- `engdesign-pseudoreplication-count` ↔ `design-experimental-observational-unit` / `design-pseudoreplication`
- `engdesign-crd-treatment-effect` ↔ `design-crd-difference-means`
- `engdesign-blocking-variance-reduction` ↔ `design-blocking-paired-variance`
- `engdesign-rcbd-sums-of-squares` ↔ `design-rcbd-sums-squares`
- `engdesign-latin-square-df` ↔ `design-latin-square-degrees-freedom`
- `engdesign-random-intercept-moments` ↔ `design-random-intercept-covariance`
- `engdesign-split-plot-error-strata` ↔ `design-split-plot-error-strata`

数値例の追加だけでは1カード1論点の別技能にはならない。既存カードをcoverageから参照し、新規側は未収録の技能へ差し替えること。差し替え候補として、制約付き無作為割付の妥当性判定、反復を含む要因計画の誤差平方和、別名構造から推定可能な効果の選択、複数生成子を持つ一部実施計画、直交表での誤差列確保、計画段階の検出力比較、不完備ブロックの調整処置平均などがある。

#### major-2: sourceのA優先度と新規カードのA指定が対応しない

source parent「実験計画」のAは title 295「検出力と標本サイズの考え方」であり、282–294はすべてBである。一方、新規カードで唯一Aなのは `engdesign-incomplete-block-connectivity`（不完備ブロック、`SCI-2016-Q1`）で、title 295に最も近い `engdesign-replication-power-ratio` はBである。このため `priority_counts: {A: 1, B: 13}` のAをどのカードが具体化したか追跡できない。

`SCI-2016-Q1` を直接根拠に `engdesign-incomplete-block-connectivity` をAとする判断自体は妥当だが、それはsourceのA1とは別根拠である。title 295は既存 `design-power-determinants`、`design-two-sample-size`、`design-paired-sample-size`、`design-anova-effect-size-power` が既に十分扱うため、重複カードを新設せず既存カード対応を明記すること。そのうえで、progressの `priority_counts` がタイトル一覧の集計なのか新規カードの枚数内訳なのかを査読記録とメタデータで混同しないこと。

#### minor-1: `engdesign-block-vs-covariate` の表題に非正規化された用語と余分な空白がある

表題が「` nuisance変数をブロックか共変量で扱う`」で始まり、公式termsの日本語表示にも既存教材の用語にも沿わない。本文では意味を定義しているため理解不能ではないが、検索と表記統一のため、余分な先頭空白を除き「局外因子（nuisance factor）をブロックか共変量で扱う」のように日本語名を先に示すこと。

### 優先度根拠

- source 282–294はB、295のみAである。無作為化、完全無作為化、乱塊法、ラテン方格、要因実験、交絡、直交表、実験単位、固定・変量効果は標準技能としてB指定に整合する。
- `engdesign-incomplete-block-connectivity` は `SCI-2016-Q1` の直接対応を持ち、実過去問に基づくA指定には独立した根拠がある。ただしsource集計のA1と同一視できない。
- ほか42枚は `past_exam: 0` であり、B指定は公式範囲と標準技能としての位置付けに基づく。重複解消後も、追加範囲がtitle_idsの標準論点を圧迫しないようにする必要がある。

### 配信品質

- `engineering-design` はcoverage上completeで、新規43IDと既存2IDが配信対象に登録され、公式7用語はすべてカードIDへ対応付けられている。
- 全43枚の7節、メタデータ、KaTeX、カテゴリー配信は機械検証を通過している。
- 現状は同じ教材内に同一技能のC20カードとC27カードが並ぶため、検索・復習上の冗長性がmajor-1として残る。

### 機械検証

- `npm run anki:validate`: 成功（1368 cards、0 warnings、30 category pages、max 200）
- `npm run validate`: 成功（structure / math / text すべて成功、KaTeX strictで374 Markdown files）

## 修正後再査読

- reviewer ID: `/root/c27_exam_review`
- 実行日時: 2026-08-22T22:16:19+09:00
- 対象: 差し替え後の新規43枚、coverage、source・優先度、既存C20/C36カードを含む全文
- 結果: `fatal: 0 / major: 1 / minor: 0`

### 初回指摘の修正確認

- major-1の初回列挙16組は、すべてIDと内容ごと異なる技能へ差し替えられた。重み付きコントラスト、欠測による非直交化、純粋誤差、中心点曲率、適合不足、複数生成子、推定可能効果の選択、語長パターン、重要効果を守るブロック生成子、標本内測定、再無作為化、グレコ・ラテン方格、BLUP、分割法の自由度などは、初回対象の既存カードと異なる到達技能である。
- major-2について、`priority_counts: {A: 1, B: 13}` はsourceの14タイトルの集計であり、新規43枚のpriority枚数内訳ではないことを確認した。title 295に対応する `engdesign-replication-power-ratio` はAへ変更され、既存の `design-power-determinants`、`design-two-sample-size`、`design-paired-sample-size`、`design-anova-effect-size-power` と合わせて、検出力・標本サイズの再生・計算技能を満たす。`engdesign-incomplete-block-connectivity` のAは `SCI-2016-Q1` という別の直接根拠に基づくため、Aカードが2枚あることとsourceのA1は矛盾しない。
- minor-1は、表題が「局外因子をブロックか共変量で扱う」へ修正され、「記号・用語」で「局外因子（nuisance factor）」を日本語名から定義する形になった。
- 数学査読に伴うBIBD、欠測非直交性、語長パターン、折返し計画、BLUP、再無作為化、直交表の列自由度の修正も7節を維持している。

### 残存指摘

#### major-1: 差し替え後にも既存カードと同一技能の重複が4組残る

初回列挙カードの差し替え先に、別の既存C20/C36カードと同じ論点が含まれた。次の4組は、問い、公式、答えまで実質的に同一で、数値または与え方だけが異なる。

- `engdesign-blocking-relative-efficiency` ↔ `design-rcbd-relative-efficiency`: どちらも完全無作為化法と乱塊法の誤差平均平方比 $MS_{E,\mathrm{CRD}}/MS_{E,\mathrm{RCBD}}$ を相対効率として計算する。
- `engdesign-rcbd-single-missing-value` ↔ `design-rcbd-missing-value`: どちらも乱塊法の単一欠測値を同じ加法モデル公式で補い、自由度を1減らす。
- `engdesign-fixed-random-classification` ↔ `anova-fixed-random-effects`: どちらも観測水準自体の比較か水準母集団への一般化かによって固定効果・変量効果を分類する。
- `engdesign-oneway-random-ems` ↔ `design-random-oneway-components`: どちらも $E[MS_E]=\sigma^2$、$E[MS_B]=\sigma^2+n\tau^2$ から同じモーメント推定量と群内相関を計算する。

この4枚も、既存カードにない技能へID・内容ごと差し替えること。公式用語のcoverageは、固定効果なら固定効果の対比推定・制約の扱い、変量効果なら分散成分比の信頼限界や混合効果での検定分母、ブロック化なら不完備ブロックの調整平方和・接続度比較などで維持できる。

### ねらい適合性・知識充足性・過不足・優先度根拠

初回指摘16組の解消後は、計算技能の幅と公式7用語の実質的扱いが改善した。source 282–295と `SCI-2016-Q1` の優先度根拠も区別できている。残る4組を除けば、新規カードは既存カードを補完し、公式のねらいに対する再生・計算・判定技能は十分である。

### 配信品質

coverageのID差し替え、公式7用語の対応、43枚の7節、カテゴリー配信は整合している。残る重複4組のみ、同一教材内の検索・復習冗長性として解消が必要である。

### 機械検証

- `npm run anki:validate`: 成功（1368 cards、0 warnings、30 category pages、max 200）
- `npm run validate`: 成功（structure / math / text すべて成功、KaTeX strictで376 Markdown files）

## 第2回修正後再査読

- reviewer ID: `/root/c27_exam_review`
- 実行日時: 2026-08-22T22:21:55+09:00
- 対象: 残存重複4枚の差し替え後を含む新規43枚、coverage、既存全カードとの重複、数理査読修正
- 結果: `fatal: 0 / major: 0 / minor: 1`

### 初回・前回指摘の修正確認

- `engdesign-precision-weighted-block-difference` は不等精度のブロック差を逆分散重みで統合する技能で、既存の乱塊法相対効率カードとは異なる。
- `engdesign-cyclic-incomplete-blocks` は基本ブロックの法 $v$ 巡回と接続性を扱い、既存の単一欠測補完カードとは異なる。
- `engdesign-random-slope-covariance` は変量切片・変量傾きの共分散関数を数値計算し、固定・変量分類カードとは異なる。
- `engdesign-gage-rr-variance` は交差型Gage R&Rの測定システム分散割合を求め、変量一元配置の期待平均平方カードとは異なる。
- これらを含む43枚を既存全カードと再照合し、問い・公式・到達技能が同一の重複は解消した。
- BIBD処置差分散は $lambda$ を明示した正しい形、標本内平均分散は装置数 $n$ も含む形、BLUPは既知母数・独立同分散の適用条件へ修正され、各カード単体で条件を再生できる。

### 残存指摘

#### minor-1: 差し替えカードに旧カード由来の不適切なhashtagsが残る

- `engdesign-cyclic-incomplete-blocks` は巡回不完備ブロックと接続性を扱うが、hashtagsが `[ブロック化, 乱塊法, 平方和]` のままで、「平方和」を扱わない。`[ブロック化, 不完備ブロック, 巡回計画]` などへ直すこと。
- `engdesign-gage-rr-variance` は与えられた分散成分から割合を計算するカードで、期待平均平方を提示・使用しないが、hashtagsに「期待平均平方」が残る。`[変量効果, Gage R&R, 分散成分]` など内容に一致させること。

### ねらい適合性・知識充足性・過不足・優先度根拠

上記検索メタデータを除き、公式7用語、source 282–295、`SCI-2016-Q1`、再生・計算・判定技能は十分である。priority_countsをsourceタイトル集計として扱う区別も維持され、過不足に新たな問題はない。

### 配信品質

本文、7節、coverage、カテゴリー配信は整合する。minor-1は検索・復習時の到達技能ラベルだけに残る。

### 機械検証

- `npm run anki:validate`: 成功（1368 cards、0 warnings、30 category pages、max 200）
- `npm run validate`: 成功（structure / math / text すべて成功、KaTeX strictで376 Markdown files）

## 最終再査読

- reviewer ID: `/root/c27_exam_review`
- 実行日時: 2026-08-22T22:23:15+09:00
- final_reviewer_id: c27_exam_review
- final_reviewed_at: 2026-08-22T22:23:15+09:00
- 対象: 最終版の新規43枚、公式7用語、source 282–295、`SCI-2016-Q1`、coverage、既存全カードとの重複、配信品質

### 修正確認

- `engdesign-cyclic-incomplete-blocks` のhashtagsは `[ブロック化, 不完備ブロック, 巡回計画]` となり、巡回不完備ブロックと接続性という本文技能に一致した。
- `engdesign-gage-rr-variance` のhashtagsは `[変量効果, Gage R&R, 分散成分]` となり、測定システム分散割合の計算技能に一致した。
- 初回以降の重複差し替え、公式・条件、表記、source優先度の区別は維持されている。

### 最終評価

公式のねらい全文「品質管理に関する種々の統計手法を正しく使うことができる。」に対し、公式7用語を再生・計算・判定技能として実質的に扱う。43枚は全て7節を備え、既存カードとの実質重複はなく、source 282–295の優先度と `SCI-2016-Q1` の独立根拠も区別されている。過不足・配信品質に未解消指摘はない。

### 機械検証

- `npm run anki:validate`: 成功（1368 cards、0 warnings、30 category pages、max 200）
- `npm run validate`: 成功（structure / math / text すべて成功、KaTeX strictで376 Markdown files）

### 最終結果

`fatal: 0 / major: 0 / minor: 0`
