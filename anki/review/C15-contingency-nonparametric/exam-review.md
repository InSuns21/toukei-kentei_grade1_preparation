# C15-contingency-nonparametric 試験適合性査読

- 担当ID: `/root/c15_exam_review`
- 実行日時: 2026-08-21T01:36:00+09:00
- 対象: `anki/cards/37_contingency_nonparametric.md` の新規51枚、`math-contingency-tables`・`math-nonparametric` のcoverage登録済み関連既存カード、`anki/progress.yaml`、公式シラバス、タイトルID 329〜342・398〜411の優先度付き一覧、過去問索引
- 査読段階: 初回独立査読

## ねらい適合性

公式のねらい全文は「実際問題で遭遇する分割表の解析ならびにノンパラメトリックな方法について理解し、実践することができる。」である。

- 分割表は、`cat-table-margins`〜`cat-product-multinomial` で標本設計と確率モデルを区別し、`cat-expected-counts-independence`〜`cat-standardized-residual` で期待度数、Pearson統計量、尤度比統計量、セル寄与を計算できる。公式用語「カイ二乗検定」は定義再生だけでなく数値計算へ接続されている。
- `cat-odds-ratio-formula`〜`cat-or-versus-rr` はオッズ比・相対リスク・リスク差の選択と計算、`cat-fisher-hypergeometric`、`cat-yates-corrected-shortcut`、`cat-mcnemar-choice` は小標本・対応あり設計の検定選択を扱う。関連既存カード `test-fisher-exact-2x2`、`test-yates-correction`、`test-mcnemar-asymptotic`、`mathstat-mcnemar-exact-test` によりP値計算と漸近・正確法の使い分けも補われ、公式用語「フィッシャー検定」「マクネマー検定」「イェーツの補正」を実質的に満たす。
- `cat-mantel-haenszel-or`〜`cat-measure-selection` は層別解析、Simpsonのパラドックス、対数線形モデル、ロジスティック回帰との接続まで扱い、タイトルID 398〜411に対応する。ID 400「適合度のカイ二乗検定」は新規ファイル内で重複追加せず、既存 `test-goodness-fit-statistic`、`test-goodness-fit-numeric`、`test-goodness-fit-estimated-parameters`、`test-goodness-fit-expected-counts` が公式、自由度、具体計算、期待度数条件を担うため不足ではない。
- ノンパラメトリック法は、符号検定、Wilcoxon符号付順位、Mann–Whitney U、Kruskal–Wallis、Friedman、2標本KS、Spearman・Kendall順位相関、連検定、中央値検定、置換検定を、公式・数値計算・手法選択へ分けて扱う。タイトルID 329〜342を全件実質的にカバーし、関連既存カード `test-sign-test`、`test-sign-test-numeric`、`test-wilcoxon-signed-rank`、`test-mann-whitney-u` などとの役割分担も成立する。

## 知識充足性

- 再生技能: 分割表の期待度数、Pearson・尤度比統計量、2×2効果尺度、Fisher条件付き分布、Yates補正、McNemar帰無仮説、主要順位検定の統計量と帰無平均・分散がカード内に再掲されている。
- 計算技能: 2×2表の周辺度数・カイ二乗・オッズ比区間、Mantel–Haenszel共通オッズ比、Wilcoxon・Mann–Whitneyの標準化、Kruskal–Wallis・Friedman、Spearman・Kendall、連検定、正確置換P値まで具体例が完遂されている。
- 判定技能: 1標本多項・積多項、独立性・同質性、独立群・対応群、2群・多群、小標本・大標本、順序カテゴリ・名義カテゴリを問題設定から見分けるカードがある。
- 重複回避: ID 400、Fisher、Yates、McNemar、符号検定などは既存カードの数値計算と新規カードのモデル・公式・選択判断を分担しており、同一論点の単純複製にはなっていない。
- ただし数式表示の制御語欠落により、`cat-log-odds-ratio-ci`、`np-mann-whitney-normal-numeric`、`np-hodges-lehmann-paired` の `qquad` と `cat-logistic-2x2-equivalence` の `log` が演算子・空白命令として表示されない。試験で公式を正確に再生するカードとして修正が必要である（m2）。

## 過不足

- 新規51枚は目標45〜55枚内で、分割表26枚、ノンパラメトリック法25枚である。タイトル28件に対し、基礎公式、具体計算、条件判定を分離した枚数と配分は妥当である。
- 対数線形モデル、傾向検定、Hodges–Lehmann推定、確率的優越度は公式用語一覧を越えるが、タイトルID 410・411、341および主要順位検定の解釈を支える範囲であり、削除を要する過剰ではない。
- `cat-standardized-residual` と既存適合度カード、`np-wilcoxon-normal-approx` と既存Wilcoxon数値カードには近接性があるが、前者はセル診断、後者は帰無平均・分散からの標準化を問うため、許容できる補完関係である。
- 必須論点の欠落は認めない。一方、全51枚を一律Aとしたため、優先度上はB論点をAへ過大評価し、反復順序が過剰に均質化されている（m1）。

## 優先度根拠

- source親「カテゴリカルデータ・ノンパラメトリック法」の内訳はA 4 / B 24である。AはID 398「分割表と周辺度数」、399「独立性のカイ二乗検定」、400「適合度のカイ二乗検定」、411「ロジスティック回帰との接続」で、残る24件はBである。
- 珐状は新規51枚がすべて `priority: A` であり、B指定のFisher、McNemar、Mantel–Haenszel、各順位検定、連検定、置換検定や、その補助的発展カードまでAへ引き上げられている。これはsourceのA/B配分をカードの学習順へ反映しておらず、`npm run anki:validate` も同一priorityをエラーとして検出した（m1）。
- 現行の過去問索引には本作業へ直接対応する年度・大問IDが収録されていないため、存在しない過去問IDを推測して付けるべきではない。現段階の優先度根拠は公式シラバスと優先度付きタイトル一覧であり、`frequency.past_exam: 0` 自体は矛盾しない。

## 配信品質

- coverageでは `math-contingency-tables`・`math-nonparametric` がcompleteとなり、51枚と関連既存カードが公式用語へ登録されている。
- `npm run anki:validate` は789枚を読み込んだが、「C15の10枚以上の新規カードでpriorityが全件同一」の1エラーで失敗した。警告は0件である。
- `npm run validate` は成功し、構造検証、324 MarkdownファイルのKaTeX strict検証、237生成対象テキスト検証を通過した。ただしKaTeXで文字列として解釈可能な `qquad`・`log` の制御語欠落は機械検証を通るため、目視修正が必要である。

## 指摘

### m1 — major — sourceのA/B優先度が全51枚一律Aへ置き換わっている

- 対象ID: `anki/cards/37_contingency_nonparametric.md` の全51枚
- 根拠: sourceはA 4 / B 24であるのに、新規カードはすべて `priority: A` である。中心論点と周辺・発展論点の反復順を区別できず、公式優先度の根拠がカード配信へ反映されない。さらに `npm run anki:validate` の完了条件を満たさない。
- 必要修正: タイトルIDとの対応と依存度をカード単位で査定し、A指定4件を直接支えるカードはA、B指定24件およびその発展・補助カードは原則Bとする。機械的な件数合わせではなく、複数タイトルを統合するカードは最も直接的な到達技能を基準にする。

### m2 — minor — 4枚でKaTeX制御語のバックスラッシュが欠落している

- 対象ID: `cat-log-odds-ratio-ci`、`cat-logistic-2x2-equivalence`、`np-mann-whitney-normal-numeric`、`np-hodges-lehmann-paired`
- 根拠: `,qquad` は `,\qquad`、`=log\widehat{OR}` は `=\log\widehat{OR}` であるべきで、現状は数式中の文字積として表示される。公式の正確な再生と配信上の可読性を損なう。
- 必要修正: 該当3箇所の `qquad` と1箇所の `log` にバックスラッシュを補い、表示式を読み直す。

## 初回件数

- fatal: 0
- major: 1
- minor: 1

## 機械検証

- `npm run anki:validate`: 失敗。789 cards、errors 1、warnings 0。C15新規カードのpriority全件同一が原因。
- `npm run validate`: 成功。構造検証成功、324 Markdown filesのKaTeX strict検証成功、237生成対象テキスト検証成功。

fatal: 0 / major: 1 / minor: 1

initial_reviewer_id: /root/c15_exam_review
initial_reviewed_at: 2026-08-21T01:36:00+09:00

## 修正後再査読

- 担当ID: `/root/c15_exam_review`（初回と同一担当）
- 実行日時: 2026-08-21T01:42:00+09:00
- 対象: 修正後のC15全体（新規51枚、coverage登録済み関連既存カード、公式集・coverage）

### 初回指摘の修正確認

- m1: 全51枚一律Aが解消された。タイトルID 398〜400・411へ直接対応する `cat-table-margins`、多項・積多項モデル、期待度数、Pearson・尤度比統計量、セル残差、独立性と同質性の区別、ロジスティック接続の10枚がA、残る41枚がBとなった。sourceのA 4 / B 24を、タイトルごとの基礎・計算・接続カードへ意味的に展開しており、主要論点と周辺・発展論点の反復順が区別できる。
- m2: `cat-log-odds-ratio-ci`、`np-mann-whitney-normal-numeric`、`np-hodges-lehmann-paired` は `\qquad`、`cat-logistic-2x2-equivalence` は `\log\widehat{OR}` へ修正された。式中の演算子と空白命令が正しく表示され、公式を目で追える。

### 全体最終判定

- 公式ねらい全文に対し、分割表のモデル・周辺度数・期待度数、独立性と適合度のカイ二乗検定、2×2効果尺度、Fisher・Yates・McNemar、層別解析、対数線形・ロジスティック接続について、定義・公式の再生、具体計算、条件判定を反復できる。
- ノンパラメトリック法は、符号、Wilcoxon符号付順位、Mann–Whitney U、Kruskal–Wallis、Friedman、KS、順位相関、連、中央値、置換の各検定を、標本設計と成立条件から選び、統計量を計算・判定できる。数理査読に伴うWilcoxonの連続性・0対称性、0差・同順位なしの条件明示とAREの標本数比解釈も確認した。
- タイトルID 329〜342・398〜411は、既存適合度・Fisher・Yates・McNemar・符号・順位検定カードとの分担を含め全件に実質対応する。新規51枚は目標45〜55枚内で、削除を要する実質重複や必須技能の不足はない。
- A 10枚・B 41枚への再査定はsourceのA/B指定とカードの直接性・依存度を反映する。現行過去問索引に直接対応IDがない点も変わらず、未確認の過去問根拠を付与していない扱いは妥当である。
- 数式表示、カード区切り、coverage、カテゴリー配信を含め、新たなfatal・major・minor指摘はない。

### 最終機械検証

- `npm run anki:validate`: 成功。789 cards、0 warnings、13 category pages、max 200/page。
- `npm run validate`: 成功。構造検証成功、326 Markdown filesのKaTeX strict検証成功、237生成対象テキスト検証成功。

### 最終件数

- fatal: 0
- major: 0
- minor: 0

final_reviewer_id: /root/c15_exam_review
final_reviewed_at: 2026-08-21T01:42:00+09:00

fatal: 0 / major: 0 / minor: 0
