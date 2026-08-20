# C16-incomplete-data 試験適合性査読

- 担当ID: `/root/c16_exam_review`
- 実行日時: 2026-08-21T01:55:09+09:00
- 対象: `anki/cards/38_incomplete_data.md` の新規27枚、`math-incomplete-data` のcoverage、公式集、`anki/progress.yaml`、タイトルID 429〜441、既存関連カード、過去問索引
- 査読段階: 初回独立査読

## ねらい適合性

公式のねらい全文は「不完全データの分析について理解すると共に、コンピュータを用いたシミュレーションができる。モデル構築に役立てる。」である。本作業はこのうち `math-incomplete-data` を担当し、シミュレーションは後続 `C17-simulation` の範囲である。

- 公式用語「欠測（欠損）」は、`inc-mcar-mar-mnar` で機構を判別し、`inc-missing-indicator-likelihood`、`inc-complete-case-bias`、`inc-mean-imputation-variance`、`inc-ipw-mean`、`inc-em-observed-likelihood`、`inc-multiple-imputation-rubin` で尤度、偏り、単一・多重代入、逆確率重み付け、EM法へ接続している。定義の再生だけでなく計算・方法選択を行える。
- 公式用語「打ち切り」は、`surv-censoring-definition`、`surv-type-i-type-ii-censoring` で種類を判別し、`surv-right-censored-likelihood`、`surv-exponential-censored-mle` で尤度を構成・最大化できる。Kaplan–Meier、Greenwood、log-rank、Coxへ進むカード列もあり、生存時間解析の主要な再生・計算・解釈技能を扱う。
- 公式用語「トランケーション」は、`surv-truncation-density`、`surv-left-truncated-exponential`、`surv-censoring-vs-truncation`、`surv-delayed-entry-risk-set` により条件付き密度、打ち切りとの差、遅延参加時のリスク集合を判定・計算できる。
- タイトルID 429〜441は全件に対応する。ただしID 429〜432・438の基礎公式は既存カードと重複しており、同じ論点を新規カードとして再登録する必要はない（m1）。

## 知識充足性

- 再生技能: 欠測機構、観測データ尤度、右打ち切り尤度、条件付きトランケーション密度、Kaplan–Meier推定量、Greenwood公式、Coxモデルとハザード比がカード内に提示されている。
- 計算技能: 平均値代入後の分散過小評価、IPW平均、Rubin則、右打ち切り指数モデルの最尤推定、KM生存率、Greenwood分散、1事象時点のlog-rank寄与、Cox部分尤度、ハザード比が数値または式変形で完遂されている。
- 判定技能: MCAR・MAR・MNAR、右・左・区間打ち切り、I型・II型打ち切り、打ち切りとトランケーション、比例ハザード仮定の破れを区別できる。
- `surv-logrank-statistic` は標準化式の分散を単に $V$ と置き、カード内で多時点の分散公式を明示していない。`surv-logrank-numeric` は1時点の寄与だけなので、公式カード単独では本番の複数時点計算を再生できない（m2）。

## 過不足

- 新規27枚は目標25〜30枚内で、欠測7枚、生存時間・打ち切り・トランケーション20枚である。source親が「生存時間解析」であることを踏まえれば配分は妥当である。
- `surv-survival-hazard-relations` は既存 `prob-survival-from-cdf`、`prob-survival-hazard`、`prob-cumulative-hazard`、`prob-survival-from-hazard` と実質的に同じ公式をまとめ直している。`surv-exponential-model` も既存 `prob-survival-hazard`、`dist-exponential-cdf-survival` と同じ指数分布の密度・生存関数・一定ハザードを再度問う。既存カードには具体的な積分・微分と過去問根拠もあるため、追加2枚は補完ではなく重複である（m1）。
- 上記2枚を除いても新規25枚となり目標下限を満たす。coverageで既存カードを公式用語「打ち切り」の前提として参照すれば、タイトルID 429〜432・438を欠落させずに重複を解消できる。
- Cox診断、多重代入、IPWは公式用語一覧を越えるが、「不完全データの分析を理解しモデル構築に役立てる」という到達行動とsourceタイトルID 439〜441を支える範囲で、削除を要する過剰ではない。

## 優先度根拠

- source親「生存時間解析」の内訳はB 1 / C 12であり、BはID 438「指数分布の生存モデル」、残るID 429〜437・439〜441はCである。
- 過去問索引には `SCI-2019-Q1`「生存関数・平均残存寿命・Weibull変換」があり、既存 `prob-survival-from-cdf`、`prob-survival-hazard`、`prob-cumulative-hazard`、`prob-survival-from-hazard` はこのIDを明記してpriority Sとしている。新規の重複カードへ根拠を再付与するより、この既存カード群を再利用する方が優先度と出典を正しく保てる。
- `surv-exponential-censored-mle` のBはID 438を打ち切り下の推定へ直接展開する計算技能、`inc-mcar-mar-mnar` のBは公式3用語の一つである欠測分析の入口として妥当である。その他の発展的生存解析カードをCとする配分もsourceに沿う。
- `frequency.past_exam: 0` は新規カード自体が過去問を直接参照していないことを表すが、重複解消後は、過去問IDを持つ既存基礎カードと本作業の打ち切り・推定カードの役割分担をcoverageと査読記録で明示できる。

## 配信品質

- coverageは `math-incomplete-data` をcompleteとし、新規27枚と既存 `data-em-responsibility` を3公式用語へ登録している。formulaeにはIPW、Rubin則、生存・ハザード、右打ち切り尤度、指数モデル最尤推定、左トランケーション、KM、Greenwood、log-rank、Coxが同期されている。
- `npm run anki:validate` は成功し、816枚、警告0件、13カテゴリページ、各ページ最大200枚である。
- `npm run validate` は成功し、構造検証、328 MarkdownファイルのKaTeX strict検証、237生成対象テキスト検証を通過した。

## 初回指摘

### m1 — major — 生存・ハザード基礎と指数生存モデルが既存カードを実質重複している

- 対象ID: `surv-survival-hazard-relations`、`surv-exponential-model`
- 根拠: 前者の $S=1-F$、$h=f/S$、$H=-\log S$、$S=e^{-H}$ は `prob-survival-from-cdf`、`prob-survival-hazard`、`prob-cumulative-hazard`、`prob-survival-from-hazard` に公式と具体計算付きで既存である。後者の指数分布の密度・生存関数・一定ハザードは `prob-survival-hazard`、`dist-exponential-cdf-survival` に既存である。同じ論点を重複させない要件に反する。
- 必要修正: 2枚を削除し、coverageの関連用語へ上記既存カードを登録する。タイトルID 429〜432・438は、既存基礎カードと新規 `surv-exponential-censored-mle` の役割分担で対応させる。新規枚数は25枚となりtarget内を維持する。

### m2 — major — log-rank公式カードで分散 $V$ が未定義のまま残る

- 対象ID: `surv-logrank-statistic`
- 根拠: $Z=(O_1-E_1)/\sqrt V$ と書く一方、複数時点で用いる超幾何分散の式をカード内に示していない。次の数値カードは1時点だけであり、試験で表から統計量を構成する際に必要な公式をカードだけから再生できない。
- 必要修正: 使用公式または答えに $V=\sum_j d_j(n_j-d_j)n_{1j}n_{0j}/\{n_j^2(n_j-1)\}$ を明示し、$n_{0j}=n_j-n_{1j}$ も定義する。formulaeとの記号を一致させる。

## 初回件数

- fatal: 0
- major: 2
- minor: 0

## 機械検証

- `npm run anki:validate`: 成功。816 cards、0 warnings、13 category pages、max 200/page。
- `npm run validate`: 成功。構造検証成功、328 Markdown filesのKaTeX strict検証成功、237生成対象テキスト検証成功。

fatal: 0 / major: 2 / minor: 0

initial_reviewer_id: /root/c16_exam_review
initial_reviewed_at: 2026-08-21T01:55:09+09:00

## 修正後再査読

- 担当ID: `/root/c16_exam_review`（初回と同一担当）
- 実行日時: 2026-08-21T01:58:08+09:00
- 対象: 修正後のC16全体（新規25枚、coverage、公式集、公式シラバス、タイトルID 429〜441、既存関連カード）

### 初回指摘の修正確認

- m1: `surv-survival-hazard-relations` と `surv-exponential-model` は削除された。新規カードは25枚となりtarget 25〜30枚内を維持している。タイトルID 429〜432は既存 `prob-survival-from-cdf`、`prob-survival-hazard`、`prob-cumulative-hazard`、`prob-survival-from-hazard`、ID 438の指数生存モデルは既存 `prob-survival-hazard`、`dist-exponential-cdf-survival` と新規 `surv-exponential-censored-mle` の役割分担で実質対応する。既存カードには `SCI-2019-Q1`・`SCI-2017-Q2` の根拠と具体計算があり、重複削除によって試験技能は失われていない。coverageから削除カードIDも除かれ、公式3用語には不完全データ固有の25枚と既存EMカードが同期されている。
- m2: `surv-logrank-statistic` に
  $$V=\sum_j\frac{d_j(n_j-d_j)n_{1j}(n_j-n_{1j})}{n_j^2(n_j-1)}$$
  が明記された。各時点の超幾何分散を加える操作から $Z=(O_1-E_1)/\sqrt V$ までカード単独で追え、公式集の $n_{0j}=n_j-n_{1j}$ 表記とも一致する。

### 全体最終判定

- 公式ねらい「不完全データの分析について理解する」に対し、欠測は機構判定、観測データ尤度、完全ケース、単一・多重代入、IPW、EM、打ち切りは種類判定、尤度・最尤推定、KM・Greenwood・log-rank・Cox、トランケーションは条件付き密度、打ち切りとの識別、遅延参加を扱う。定義・公式の再生、具体計算、条件判定の3技能がそろう。
- Kaplan–Meierカードは、事象時刻直前の追跡中集団を条件とする生存確率を掛ける説明へ修正され、積極限の条件付けを誤読しない。EMカードも「欠測成分そのもの」ではなく完全データ対数尤度または十分統計量の条件付き期待値を計算する説明となり、方法選択時の理解が正確である。
- タイトルID 429〜441は既存カードとの役割分担を含め全件に実質対応する。公式用語「欠測（欠損）」「打ち切り」「トランケーション」の欠落、削除を要する重複、過剰な発展は認めない。
- 優先度はB 2枚・C 23枚である。ID 438を推定へ展開する `surv-exponential-censored-mle` と公式用語「欠測」の入口 `inc-mcar-mar-mnar` をB、sourceでCの生存解析各論と欠測・トランケーションの補助技能をCとする配分は妥当である。基礎的な生存・ハザード計算は過去問ID付き既存Sカードへ委ねられ、反復順も維持される。
- coverage、formulae、カード区切り、検索用タイトル・hashtags、カテゴリー配信に新たなfatal・major・minor指摘はない。

### 最終機械検証

- `npm run anki:validate`: 成功。814 cards、0 warnings、13 category pages、max 200/page。
- `npm run validate`: 成功。構造検証成功、330 Markdown filesのKaTeX strict検証成功、237生成対象テキスト検証成功。

### 最終件数

- fatal: 0
- major: 0
- minor: 0

final_reviewer_id: /root/c16_exam_review
final_reviewed_at: 2026-08-21T01:58:08+09:00

fatal: 0 / major: 0 / minor: 0
