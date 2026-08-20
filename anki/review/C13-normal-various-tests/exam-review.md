# C13-normal-various-tests 試験適合性査読

- 担当ID: `/root/c13_exam_review`
- 実行日時: 2026-08-21T00:50:37+09:00
- 対象: `anki/cards/35_normal_various_tests.md`、`math-normal-tests`・`math-various-tests` のcoverage登録済み既存カード、`anki/progress.yaml`、公式シラバス、優先度付きタイトル一覧、過去問索引
- 査読段階: 初回独立査読

## ねらい適合性

対象カテゴリーのねらいは「統計的検定の原理を理解し、種々の最適性で検定が構成でき、その性質を数学的に記述できる。特に正規分布に関する検定を正しく理解すると共に、その他の代表的な分布に関する検定ができる。」である。

- 正規分布に関する検定: `test-normal-z-known-formula` から `test-normality-test-selection` までにより、1標本Z・t、対応ありt、独立2標本の結合t・Welch、1母分散のカイ二乗検定、2母分散比のF検定について、統計量、帰無分布、自由度、片側・両側の裾、数値判定まで到達している。公式用語「平均値と分散に関する検定」「複数の平均に関する検定」の実質は充足している。
- その他の代表的分布に関する検定: `test-binomial-exact-one-sample`、`test-one-proportion-score`、`test-two-proportion-numeric`、`test-poisson-one-rate-exact`、`test-two-poisson-unequal-exposure` により、二項・ポアソンの正確検定と大標本検定を使い分けられる。
- 適合度・独立性: `test-goodness-fit-statistic`、`test-goodness-fit-numeric`、`test-goodness-fit-estimated-parameters`、`test-independence-chisquare`、`test-independence-2x2-numeric` により、期待度数、Pearson統計量、自由度、棄却判断を再生・計算できる。タイトルID 210・211、とくにS指定の211に十分な厚みがある。
- 検定原理・最適性は前作業C12のカード群が担い、C13はタイトルID 202〜211の具体的手順へ正しく分業されている。タイトルID 195〜201・212をC13で全面重複させていない点は適切である。
- ただしノンパラメトリック検定は、統計量の構成後に臨界値または正確P値を用いて判定する技能が一部未完であり、ねらいの「検定ができる」まで届いていない。下記M1の修正が必要である。

## 知識充足性

- 再生技能: Z、t、カイ二乗、F、比率Z、Pearson統計量、条件付き二項分布の主要公式はカード内に再掲されている。
- 計算技能: 片側・両側の裾選択、標準誤差、結合分散、Welch自由度、カイ二乗・F自由度、期待度数、分割表の全セル寄与まで、目で追える数値例がある。
- 判定技能: 正規系、比率系、ポアソン系、適合度・独立性では臨界値またはP値との比較と結論まで完遂している。
- 条件判定: 正規性、独立・対応、等分散、期待度数、交換可能性、同順位、離散分布の両側P値の流儀を明示しており、公式暗記だけに偏っていない。
- 不足: Wilcoxon符号付順位、Mann–Whitney、1標本Kolmogorov–Smirnovでは、観測統計量を作るだけで帰無分布・臨界値/P値・結論までの一連計算がない。

## 過不足

- 追加48枚は目標45〜55枚内で、タイトルID 202〜211の全項目を覆う。正規系22枚、種々の検定26枚という配分も、S指定の母分散・F・独立性を複数カードで訓練する構成として妥当である。
- `test-goodness-fit-estimated-parameters` は既存 `test-chi-square-fit` と「推定母数数を引いて自由度を求める」という問い・公式・注意が実質的に重複する。数値だけを変えた反復であり、1枚を推定母数から期待度数を実際に作る計算へ差し替えるのが望ましい。
- `test-sign-test` と `test-sign-test-numeric` は前者が帰無分布の再生、後者が両側P値の完遂なので役割分担がある。`mathstat-exact-poisson-rate-test` と `test-two-poisson-unequal-exposure` も、等曝露の標本和と不等曝露の率比較という差があり、許容できる補完関係である。

## 優先度根拠

- source親「仮説検定」は全体S、個別内訳はS 5 / A 13。C13の中心であるID 202〜211のうち、206「母分散のカイ二乗検定」、207「等分散のF検定」、211「独立性のカイ二乗検定」はSであり、対応カードもS指定かつ公式・数値計算・条件判定を複数枚で扱っている。
- 過去問索引では `MATH-2018-Q1` がカイ二乗分布・母標準偏差、`MATH-2014-Q4` がF分布・二標本比較を扱う。したがって母分散・F検定をSとして厚くする方針には直接の出題根拠がある。
- 一方、上記Sカードの `frequency.past_exam` はすべて0で、`sources` にも該当過去問IDがない。優先順位そのものは妥当だが、カードから過去問根拠を追跡できないため、修正対象とする。
- 比率、適合度、独立性について、現行 `past-exam-index.yaml` に直接対応する年度・大問IDがない箇所は、公式シラバスとS/Aタイトル一覧を根拠とし、存在しない過去問IDを推測して付与しない。

## 配信品質

- `npm run anki:validate` は661枚、警告0で成功し、13カテゴリー、1ページ最大200枚の配信境界も成功した。
- カード区切り、カテゴリー・サブカテゴリー、公式再掲、KaTeX構文は機械検証を通過している。
- coverage上の公式用語へのカード割当には下記m1の意味的なずれがある。

## 指摘

### M1 — major — ノンパラメトリック3手法が棄却判断まで完遂していない

- 対象ID: `test-wilcoxon-signed-rank`、`test-mann-whitney-u`、`test-ks-one-sample`
- 根拠: 各カードは統計量の定義または部分計算までで、帰無分布・臨界値または正確P値との比較・有意水準での結論がない。公式ねらいの「代表的な分布に関する検定ができる」および自己査読条件「具体例完遂」に届かない。
- 必要修正: それぞれについて小標本の具体データから統計量を作り、問題文で与えた臨界値または列挙した正確帰無分布を使って、棄却/非棄却まで完遂するカードを追加または既存カードへ補う。1カード1論点を守るなら数値判定カードを各1枚追加する。

### m1 — minor — coverage・source topicの意味的割当が一部誤っている

- 対象ID: `test-normal-variance-ratio-f`、`test-normal-variance-ratio-numeric`、`test-f-reciprocal-quantile`、`test-holm-stepdown`、`test-independence-chisquare`、`test-independence-2x2-numeric`
- 根拠: F分散比3枚がcoverageで「複数の平均に関する検定」にだけ割り当てられている。Holm法は `sources.topic` とcoverageで「二項分布・ポアソン分布など…」へ入り、多重検定という内容と一致しない。独立性検定2枚の `sources.topic` が「適合度の検定」だけで、タイトルID 211「独立性のカイ二乗検定」を明示しない。
- 必要修正: F分散比は「平均値と分散に関する検定」へ割り当てる。Holm法はC12の「多重検定と第一種過誤」側へ対応付けるか、少なくともsource topicを多重検定へ直す。独立性カードのsource topicは「独立性のカイ二乗検定」とする。

### m2 — minor — 適合度自由度カードが既存カードと実質重複する

- 対象ID: `test-goodness-fit-estimated-parameters`、既存 `test-chi-square-fit`
- 根拠: どちらも $k-1-r$ を数値代入し、推定母数分を引くことだけを問う。同じ論点を重複させないという作業条件に対して、数値変更以上の技能差がない。
- 必要修正: 新規カードを削るか、例えば同じ度数からポアソン母数を推定して各期待度数を作り、その後に自由度を判定する別技能へ差し替える。

### m3 — minor — Sカードから直接過去問根拠を追跡できない

- 対象ID: `test-normal-variance-chisquare`、`test-normal-variance-chisquare-numeric`、`test-normal-variance-one-sided`、`test-normal-variance-ratio-f`、`test-normal-variance-ratio-numeric`、`test-f-reciprocal-quantile`
- 根拠: `MATH-2018-Q1`、`MATH-2014-Q4` という直接関連する過去問索引があるのに、全カードの `frequency.past_exam` が0、sourceが公式シラバスのみである。
- 必要修正: 問題文を転載せず、対応する過去問IDをsourceへ追加し、確認済み件数をfrequencyへ反映する。各カードに機械的に同じIDを付けず、実際に対応する技能だけへ付ける。

## 最終件数

- fatal: 0
- major: 1
- minor: 3

## 機械検証

- `npm run anki:validate`: 成功。661 cards、0 warnings、13 category pages、max 200/page。
- `npm run validate`: 成功。構造検証成功、316 Markdown filesのKaTeX strict検証成功、237生成対象テキスト検証成功。

## 修正後再査読（第1回）

- 担当ID: `/root/c13_exam_review`（初回と同一担当）
- 実行日時: 2026-08-21T00:57:17+09:00
- 対象: 修正後のC13全体（新規51枚およびcoverage登録済み関連既存カード）

### 初回指摘の修正確認

- M1: `test-wilcoxon-signed-rank-numeric`、`test-mann-whitney-u-numeric`、`test-ks-one-sample-numeric` が追加された。前二者は正確帰無分布の標本点列挙、両側P値、有意水準との比較、棄却結論まで完遂している。KSも $D^+,D^-$ の全候補、$D_n$、臨界値比較、結論まで追える。ノンパラメトリックの判定技能不足は解消した。ただしKSの臨界値表示には下記r1が残る。
- m1: F分散比カードは「平均値と分散に関する検定」へ移り、Holm法のsource topicとcoverage上の誤った二項・ポアソン対応は修正された。独立性カードのsource topicは一部だけ修正され、下記r2が残る。
- m2: `test-goodness-fit-estimated-parameters` は、ポアソン母数の推定、確率質量関数への代入、期待度数、自由度を順に求める別技能へ差し替えられ、既存カードとの実質重複は解消した。
- m3: 母分散3枚に `MATH-2018-Q1`、F分散比3枚に `MATH-2014-Q4` が付与され、frequencyも確認済み件数と整合した。優先度根拠をカードから追跡できる。

### 残存指摘

#### r1 — minor — KS検定の5%臨界値が標準的な正確値と一致しない

- 対象ID: `test-ks-one-sample-numeric`
- 根拠: $n=4$ の完全指定連続分布に対する両側1標本KS検定の5%正確臨界値は通常約0.624であり、カードが「5%臨界値」とする0.68とは一致しない。与えられた値との比較手順と棄却結論自体は変わらないが、試験対策カードとして誤った確率水準を記憶させる。
- 必要修正: 臨界値を正確な5%値（採用する表の規約を明示）へ直すか、「この問題では臨界値0.68が与えられた」とだけ述べて5%値という主張を外す。前者の場合でも $0.80$ は棄却域に入る。

#### r2 — minor — 適合度・独立性カードのsource topicが入れ替わって残っている

- 対象ID: `test-goodness-fit-expected-counts`、`test-independence-2x2-numeric`
- 根拠: 前者は適合度検定の区分統合を問うのにsource topicが「独立性のカイ二乗検定」、後者は独立性検定を問うのにsource topicが「適合度の検定」となっている。タイトル、topic、本文とメタデータが不一致である。
- 必要修正: 前者を「適合度の検定」、後者を「独立性のカイ二乗検定」へ修正する。

### 再査読時の機械検証

- `npm run anki:validate`: 成功。664 cards、0 warnings、13 category pages、max 200/page。
- `npm run validate`: 成功。構造検証成功、318 Markdown filesのKaTeX strict検証成功、237生成対象テキスト検証成功。

### 第1回再査読件数

- fatal: 0
- major: 0
- minor: 2

## 最終再査読

- 担当ID: `/root/c13_exam_review`（初回・第1回再査読と同一担当）
- 実行日時: 2026-08-21T00:59:09+09:00
- 対象: 修正後のC13全体（新規51枚およびcoverage登録済み関連既存カード）

### 残存指摘の修正確認

- r1: `test-ks-one-sample-numeric` は $n=4$ の両側5%正確臨界値を0.624と明記し、$D_n=0.80>0.624$ の比較と棄却結論まで整合した。解消。
- r2: `test-goodness-fit-expected-counts` のsource topicは「適合度の検定」、`test-independence-2x2-numeric` は「独立性のカイ二乗検定」となり、タイトル・本文・メタデータが一致した。解消。

### 全体最終判定

- 公式ねらいに対し、正規平均・正規母分散、二項・ポアソン、適合度・独立性、代表的ノンパラメトリック検定について、公式再生、統計量構成、数値計算、裾または臨界値の選択、棄却判断までを反復できる。
- タイトルID 202〜211を全件扱い、S指定の206・207・211には複数の公式・計算・条件カードがある。母分散・F検定は過去問IDによる優先度根拠も追跡できる。
- 既存カードとの役割分担、51枚という目標45〜55枚内の量、coverageの公式用語対応、配信上のカテゴリー境界はいずれも妥当である。
- 新たなfatal・major・minor指摘はない。

### 最終機械検証

- `npm run anki:validate`: 成功。664 cards、0 warnings、13 category pages、max 200/page。
- `npm run validate`: 成功。構造検証成功、318 Markdown filesのKaTeX strict検証成功、237生成対象テキスト検証成功。

### 最終件数

- fatal: 0
- major: 0
- minor: 0

fatal: 0 / major: 0 / minor: 0

initial_reviewer_id: /root/c13_exam_review
final_reviewer_id: /root/c13_exam_review
initial_reviewed_at: 2026-08-21T00:50:37+09:00
final_reviewed_at: 2026-08-21T00:59:09+09:00
