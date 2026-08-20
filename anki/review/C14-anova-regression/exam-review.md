# C14-anova-regression 試験適合性査読

- 担当ID: `/root/c14_exam_review`
- 実行日時: 2026-08-21T01:20:00+09:00
- 対象: `anki/cards/36_anova_regression.md`、`math-anova`・`math-regression` のcoverage登録済み既存カード、`anki/progress.yaml`、公式シラバス、タイトルID 245〜281の優先度付き一覧、過去問索引
- 査読段階: 初回独立査読

## ねらい適合性

公式のねらい全文は「データ解析法の中でも重要な位置を占める分散分析と回帰分析について正しく理解し、応用することができる。」である。

- 分散分析は、`anova-oneway-model-assumptions`〜`anova-oneway-table-numeric` によりモデル、仮定、平方和、自由度、F統計量、棄却判断を一続きで再生・計算できる。`anova-twoway-model`〜`anova-no-replication-limitation` は反復あり・なし二元配置、主効果、交互作用、誤差との交絡を区別でき、公式用語「一元配置分散分析」「二元配置分散分析」「交互作用」を実質的に満たす。
- `anova-contrast-definition`〜`anova-multiple-comparison-choice` は直交対比、Tukey、Bonferroni、Schefféを、公式、数値計算、手法選択に分けて扱う。`anova-ancova-model`〜`anova-ancova-parallel-slopes` は共分散分析の調整平均と平行回帰仮定まで扱い、公式用語「共分散分析」「多重比較」への到達がある。
- 回帰分析は、`reg-simple-model-assumptions`〜`reg-ci-versus-pi-numeric` が単回帰の最小二乗推定、分散、t検定、平均応答の信頼区間、新観測の予測区間を扱う。`reg-multiple-model-matrix`〜`reg-f-equals-t-squared` は行列表現、正規方程式、ハット行列、個別t、全体F、部分Fを扱い、公式用語「線形単回帰」「線形重回帰」「最小二乗推定」「回帰の分散分析」を満たす。
- `reg-r-squared`、`reg-adjusted-r-squared`、`reg-multiple-correlation`、残差・レバレッジ・Cook距離のカード群、変数変換2枚、`reg-regression-to-mean` により、残る公式用語も定義再生だけでなく計算・判定へ接続されている。
- タイトルID 245〜281は概ね全件に対応する。ただしS指定のID 247「回帰係数の幾何学的解釈」は、関連部品こそあるが問いとして明示されていないため、下記m1を指摘する。

## 知識充足性

- 再生技能: ANOVAのモデル・平方和・自由度・平均平方、単回帰と重回帰の最小二乗推定量、係数分散、t・F統計量、区間推定の公式がカード内に再掲されている。
- 計算技能: 一元配置ANOVA表、計画対比、Tukey比較、2×2交互作用、調整平均、単回帰係数、決定係数、t検定、信頼・予測区間、全体・部分Fまで数値例が完遂されている。
- 判定技能: 交互作用の有無、反復なし二元配置の限界、固定効果と変量効果、多重比較法、残差図、多重共線性、不均一分散、影響点を問題設定から選べる。
- 式展開: 正規方程式、平方和分解、OLSの不偏性・共分散、ハット行列の冪等性は、変形前・根拠・変形後が追える。
- ID 247に対しては、`reg-ols-simple-formula` が $S_{xy}/S_{xx}$、`reg-residual-orthogonality` が直交性、`reg-hat-matrix-properties` が射影を別々に扱うが、中心化応答ベクトルを中心化説明変数へ射影した係数が傾きであるという統合的な再生・判定技能がない。

## 過不足

- 新規73枚は目標65〜75枚内で、分散分析30枚、回帰分析43枚という配分である。S指定19件を公式・導出・数値判定へ厚くし、A指定18件を条件・解釈・手法選択で補完しており、量と配分は妥当である。
- 既存 `data-anova-decomposition` は一般的不均衡配置の平方和導出、新規 `anova-oneway-ss-numeric` は数値計算で役割が分かれる。既存 `data-ols-slope` は小標本の具体計算、新規 `reg-ols-simple-formula` は一般公式の再生であり、許容できる補完関係である。
- ANCOVA、乱塊法、Cook距離、欠落変数バイアスはタイトル一覧を越える部分もあるが、公式用語「共分散分析」「残差」および応用判断を支える範囲であり、過剰ではない。
- 実質重複によって削除すべきカードは認めない。

## 優先度根拠

- source親「線形回帰・分散分析」は、タイトルID 245〜281の内訳がS 19 / A 18である。Sの最小二乗推定、係数分散、t・F検定、平方和、交互作用、異分散、ANOVA表計算に複数の公式・導出・数値カードが配置され、優先度に沿う。
- 過去問索引 `MATH-2024-Q1` は「回帰係数の推定・検定・検出力」を扱うため、ID 246、248、250、254に直接対応する根拠である。現状、関連する `reg-ols-normal-equations-simple`、`reg-ols-simple-formula`、`reg-beta-unbiased-covariance`、`reg-slope-variance`、`reg-slope-t-test`、`reg-slope-t-numeric` はすべて `frequency.past_exam: 0` かつ過去問sourceなしで、カードからS優先度の直接根拠を追跡できない。下記m2を指摘する。
- 分散分析について現行過去問索引に直接対応する年度・大問IDがない箇所は、公式シラバスとS/Aタイトル一覧を根拠とし、存在しないIDを推測して付ける必要はない。

## 配信品質

- `npm run anki:validate` は737枚、警告0で成功し、13カテゴリー、1ページ最大200枚の配信境界も成功した。
- coverageでは `math-anova`・`math-regression` がcompleteとなり、全カードIDと公式用語への対応が登録されている。
- カード区切り、必須メタデータ、KaTeX構文、カテゴリー表示に機械的な欠陥はない。

## 指摘

### m1 — minor — S指定「回帰係数の幾何学的解釈」が明示的な問いになっていない

- 対象ID: `reg-ols-simple-formula`、`reg-residual-orthogonality`、`reg-hat-matrix-properties`
- 根拠: $\widehat\beta_1=S_{xy}/S_{xx}$、残差の直交性、ハット行列による射影は個別に扱われるが、中心化ベクトル $x_c,y_c$ に対し $\widehat\beta_1=(x_c^{\mathsf T}y_c)/(x_c^{\mathsf T}x_c)$ が $y_c$ の $x_c$ 方向への射影係数であることを説明・判定させるカードがない。タイトルID 247はS指定であり、暗黙の統合を学習者に委ねている。
- 必要修正: 既存カードの役割を崩さず、中心化ベクトルによる射影係数と残差直交を1枚で結ぶカードを追加するか、`reg-ols-simple-formula` の使用公式・計算例へ幾何学的解釈を明示する。

### m2 — minor — 直接対応する過去問IDがSカードから追跡できない

- 対象ID: `reg-ols-normal-equations-simple`、`reg-ols-simple-formula`、`reg-beta-unbiased-covariance`、`reg-slope-variance`、`reg-slope-t-test`、`reg-slope-t-numeric`
- 根拠: 過去問索引 `MATH-2024-Q1` は回帰係数の推定・検定・検出力に直接対応するが、対象カードは `frequency.past_exam: 0` でsourceも公式シラバスのみである。S優先度自体は妥当でも、過去問IDに基づく根拠をカードから追跡できない。
- 必要修正: 問題文を転載せず、実際に対応する技能のカードだけへ `MATH-2024-Q1` をsourceとして追加し、確認済み件数をfrequencyへ反映する。6枚へ機械的に一律付与せず、索引テーマとカード技能の直接対応を確認する。

## 初回件数

- fatal: 0
- major: 0
- minor: 2

## 機械検証

- `npm run anki:validate`: 成功。737 cards、0 warnings、13 category pages、max 200/page。
- `npm run validate`: 成功。構造検証成功、320 Markdown filesのKaTeX strict検証成功、237生成対象テキスト検証成功。

fatal: 0 / major: 0 / minor: 2

initial_reviewer_id: /root/c14_exam_review
initial_reviewed_at: 2026-08-21T01:20:00+09:00

## 修正後再査読

- 担当ID: `/root/c14_exam_review`（初回と同一担当）
- 実行日時: 2026-08-21T01:30:00+09:00
- 対象: 修正後のC14全体（新規74枚、coverage登録済み関連既存カード、公式集・coverage）

### 初回指摘の修正確認

- m1: `reg-slope-geometric-projection` が追加された。中心化ベクトルを定義し、射影式、残差直交条件、内積を解いた射影係数、$S_{xy}/S_{xx}$ との一致、具体ベクトルの数値計算まで1枚で追える。S指定タイトルID 247「回帰係数の幾何学的解釈」の不足は解消した。
- m2: 過去問索引のテーマと直接対応する `reg-ols-normal-equations-simple`、`reg-beta-unbiased-covariance`、`reg-slope-variance`、`reg-slope-t-numeric` に限って、`MATH-2024-Q1` のsourceと確認済みfrequencyが付与された。一般公式の再生だけのカードへ機械的に一律付与せず、推定・不偏性と分散・数値検定という直接対応技能へ絞っており妥当である。

### 再査読中の表示指摘と修正確認

- 新規 `reg-slope-geometric-projection` の初稿で、射影式の係数側が `widehat\beta_1` となりバックスラッシュが欠落していた。`\widehat\beta_1` へ修正され、当てはめベクトル、残差式、射影係数の記法が全て一致した。

### 全体最終判定

- 公式ねらい全文に対し、一元・二元配置分散分析、交互作用、共分散分析、多重比較、単・重回帰、最小二乗推定、回帰の分散分析、重相関・決定係数、残差診断、変数変換、平均への回帰について、定義・公式の再生、式の導出、具体計算、条件判定を反復できる。
- タイトルID 245〜281は全件に実質対応し、S 19 / A 18の優先度に応じて主要なS論点へ導出・数値判定が配置された。`MATH-2024-Q1` による回帰係数の推定・検定の優先度根拠もカードから追跡できる。
- 新規74枚は目標65〜75枚内で、既存2枚とは一般公式と数値計算、一般分解と具体例という役割分担がある。不要な実質重複や公式用語のcoverage漏れはない。
- 数理査読由来の修正を含む全カードを確認し、新たなfatal・major・minor指摘はない。

### 最終機械検証

- `npm run anki:validate`: 成功。738 cards、0 warnings、13 category pages、max 200/page。
- `npm run validate`: 成功。構造検証成功、322 Markdown filesのKaTeX strict検証成功、237生成対象テキスト検証成功。

### 最終件数

- fatal: 0
- major: 0
- minor: 0

final_reviewer_id: /root/c14_exam_review
final_reviewed_at: 2026-08-21T01:30:00+09:00

fatal: 0 / major: 0 / minor: 0
