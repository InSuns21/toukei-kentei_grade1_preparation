# 試験適合性査読記録 — ADHOC-20260817-sampling-extra

- 担当ID: exam-editor-reviewer-sampling
- 査読日時: 2026-08-17
- 対象work: ADHOC-20260817-sampling-extra（標本分布の欠落論点カード4枚）
- 対象カード: `anki/cards/27_sampling_extra.md` の新規4枚
  - `samp-statistic-definition` (A) 統計量の定義
  - `samp-two-sample-mean-diff` (S) 2標本平均差の標本分布
  - `samp-multinomial-cell-counts` (A) 多項標本の度数分布
  - `samp-sample-correlation-basic` (A) 標本相関係数の定義とρ=0のt分布
- 対象サブカテゴリー: math-distributions / math-sampling-distributions
- 正本: `anki/notation.md`・`anki/formulae.md`・`anki/syllabus/syllabus.yaml`・`anki/syllabus/coverage.yaml`
- 参考資料: `references/past-exam-trends.md`・`references/past-exam-index.yaml`
- 比較対象（重複・過不足の確認）: `anki/cards/22_sampling_distributions.md`、`20_discrete_continuous_distributions.md`（`dist-multinomial-*`）、`17_distribution_characteristics.md`（`prob-correlation-*`）

AGENTS.md「Anki作業と通常章・模試の範囲境界」を適用した。連結演習（同一設定4〜6小問）、20〜30分の完答論述、本番答案への圧縮、部分点構造・撤退基準、90分・5問中3問の問題選択戦略は Anki の必須成果物ではなく、それらの不在を欠陥としては取り扱わない。本査読では公式ねらいへの対応、1カード1論点、再生・計算・条件判定・適用技能、既存カードとの重複・過不足・優先度、配信品質を検査する。

## 1. 公式ねらい（到達行動）への適合性

対象サブカテゴリー `math-sampling-distributions` は大項目 `math-distributions`（種々の確率分布）に属し、対応するねらい全文は

>「標本分布を理解し、応用に用いることができる。」

本workの4枚は、既存 `22_sampling_distributions.md`（t・χ²・F・非心分布・2標本）。で未カバーの欠落論点（統計量の定義、既知分散の2標本平均差の分布、多項標本度数の同時分布、標本相関係数の帰無仮説下分布）を補う。カード群の到達行動を見る。

| カード | 到達行動（ねらいに対応） | 判定 |
|---|---|---|
| samp-statistic-definition | 統計量を観測値の関数として定義し、標本分布との関係を再生できる | 適合 |
| samp-two-sample-mean-diff | 独立2標本の平均差の標本分布を正規分布として導出できる | 適合 |
| samp-multinomial-cell-counts | 多項標本の度数ベクトルの同時分布を記述できる | 部分適合（後述3で重複・配置の問題） |
| samp-sample-correlation-basic | 標本相関係数を定義し、ρ=0の帰無仮説下の分布を述べられる | 適合 |

ねらい「標本分布を理解し、応用に用いる」への対応は4枚とも基本適合。ただし `samp-multinomial-cell-counts` は公式用語上の位置づけに疑義があり（後述3）、部分適合とする。

## 2. カードごとの試験適合性

### samp-statistic-definition（定義・再生）
- ねらい適合性: 適合。T=T(X_1,…,X_n) が観測値の関数で母数を含まないという定義の本質を正しく捉え、標本平均を例にしている。
- 1カード1論点: 満たす（統計量の定義という単一の到達行動）。
- 再生・適用技能: 定義の再生、および「母数を含む X_i-μ は統計量でない」という境界判定が入り、条件判定技能を訓練する。適切。
- 考察の明確さ: 「母数を含まないが分布は母数に依存する」を「注意」で核心論点として明示しており、標本分布の前提として教育上有効。
- 既存カードとの関係: 既存 `samp-xbar-normal-distribution` は標本平均の分布挙動を扱うのに対し、本カードは統計量一般の定義を扱う。直接の重複なし。
- 数学上の指摘: なし。
- 優先度: A。統計量の概念は標本分布・推定の前提で重要。Aは妥当。

### samp-two-sample-mean-diff（計算・適用）
- ねらい適合性: 適合。独立2標本の平均差 X̄-Ȳ ∼ N(μ_1-μ_2, σ_1²/n_1+σ_2²/n_2) を導出。
- 1カード1論点: 満たす（2標本平均差の分布）。
- 計算技能: 期待値・分散の計算（独立なら分散は和）と数値例（n_1=n_2=25 等）が目で追える。適切。
- 既存カードとの関係: 既存 `samp-two-sample-pooled-variance`（等分散・t検定統計量）と `samp-welch-t`（不均等分散・近似自由度）は「検定統計量と不偏分散による推定」に焦点がある。本カードは分散が与えられたときの分布そのもの（既知分散の基礎）を扱い、両者の前提を補完する。直接の重複なし。
- 数学上の指摘: なし。σ_1²/n_1+σ_2²/n_2 は正しい。
- 改善提案（minor）: 統一感のため、既存 `samp-welch-t`・`samp-two-sample-pooled-variance` との相互参照（「使用公式・定理」や「注意」で「等分散・不均等分散のt検定へ接続」）を明示すると、検定カードとの差分が読み手に伝わりやすい。
- 優先度: S。2標本比較（MATH-2014-Q4 二標本比較、MATH-2014-Q3 t分布）の基礎で他論点の前提。S妥当。

### samp-multinomial-cell-counts（過剰・配置の疑義）→ major
- ねらい適合性・内容の正しさ: 同時PMF `n!/(x_1!⋯x_d!) p_1^{x_1}⋯p_d^{x_d}`、台 x_j≥0, Σx_j=n は数学的に正しい。数値例（n=4 で0.18）も正しい。
- 1カード1論点: 満たす（同時PMFの記述）。
- **既存カードとの重複（過剰）**: 既存 `dist-multinomial-definition`（`20_discrete_continuous_distributions.md`, topic multinomial, subcategory math-discrete-distributions, priority A）が同一の同時PMFを扱う。両者を比較すると：
  - 既存: 『n回の独立試行をdカテゴリーに分類し、個数ベクトルの確率質量関数を答えよ』→ `P(X_1=k_1,…,X_d=k_d)= n!/(∏k_i!)∏p_i^{k_i}`、台と多項係数の根拠、負の共分散の注意。
  - 新規: 『カテゴリーjの度数X_jの同時確率質量関数を答えよ』→ 同一の `n!/(x_1!⋯x_d!)p_1^{x_1}⋯p_d^{x_d}`、同じ台条件。
  - 式・到達行動・注意（合計固定で独立でない）が実質同一で、新カードに既存カードを超える新しい到達行動（例: 多項標本からχ²適合度統計量への接続、n→∞での分布近似、周辺・モーメントの利用）が含まれていない。
- **サブカテゴリー配置の整合性**: `syllabus.yaml` の `math-sampling-distributions` の公式用語は「t分布・カイ二乗分布・F分布」のみで、多項分布は `math-discrete-distributions` の用語例「多項分布」に属す。本カードを `math-sampling-distributions` に置くのは公式用語との対応が弱く、かつ既存の多項分布カード群（定義・モーメント・二項縮約）が離散分布カテゴリーに集約されていることと一貫しない。
- 判定: 内容は正しいが、既存 `dist-multinomial-definition` との実質重複（過剰）とサブカテゴリー配置の不整合がある。標本分布の「欠落論点」として独立カード化する価値が現状では薄い。**major: 1件**。
  - 解消方向（例）: (a) 既存 `dist-multinomial-definition` と統合し本カードを廃止、または (b) 標本分布として独自の到達行動を付与（例: 多項標本の度数分布がχ²適合度検定の基礎であること、n→∞で適切な標準化によりχ²分布へ収束すること）して既存カードと差別化・相互接続を明示する。
- 優先度: A 自体は、多項分布の応用（適合度）を鑑みれば致命的ではない。ただし上記の過剰を解消しない限り、このまま独立S/Aとして残す根拠は弱い。

### samp-sample-correlation-basic（定義・条件判定・適用）
- ねらい適合性: 適合。標本相関係数 r の定義と ρ=0 の帰無仮説下の検定統計量 t=r√(n-2)/√(1-r²) ∼ t_{n-2} を提示。
- 1カード1論点: 満たす（標本相関係数の定義＋帰無仮説下の分布を1つの到達行動に収める。やや幅があるが一貫）。
- 条件判定技能: ρ=0 なら t_{n-2}、一般のρではFisherのz変換 ½ log((1+r)/(1-r)) と正規近似、という条件分岐が明示され、適用技能を訓練する。適切。
- 数値例: n=20, r=0.4 で t≈1.85。計算は正しい（0.4×4.243/0.9165≈1.852）。
- 既存カードとの関係: 既存 `prob-correlation-coefficient`（母相関係数 ρ=Cov/(σ_X σ_Y)）と `prob-correlation-independence`（無相関と独立）は母集団側の定義・関係を扱う。本カードは「標本」相関係数とその検定分布であり、母数推定の標本版として補完的位置づけ。直接の重複なし。
- 数学上の指摘: なし。
- 優先度: A。相関係数は統計応用で頻出で、理工学分野の多変量・回帰の基礎。A妥当。

## 3. 知識充足性（再生・計算・条件判定・適用技能）

- 再生: 統計量の定義（samp-statistic-definition）、標本相関係数の定義（samp-sample-correlation-basic）を再生できる。
- 計算: 2標本平均差の分散 σ_1²/n_1+σ_2²/n_2（samp-two-sample-mean-diff）、多項同時PMFの数値計算（samp-multinomial-cell-counts）が目で追える。
- 条件判定: ρ=0 の t 検定と一般ρのFisher z変換の使い分け（samp-sample-correlation-basic）、統計量が母数を含むか否かの境界判定（samp-statistic-definition）が入っており、条件判定技能が充足している。
- 適用: 標本平均・標本相関係数を実際の統計量として適用する例が揃っている。
- 総じて、3枚（samp-statistic-definition / samp-two-sample-mean-diff / samp-sample-correlation-basic）は技能が必要十分に充足。samp-multinomial-cell-counts は技能面は充足しているが、上記2の重複・配置の欠陥を除けば新規性が不足。

## 4. 過不足（既存カードとの補完関係）

- 過少: なし。本workのねらい（統計量・2標本平均差・標本相関係数）は既存 `22_sampling_distributions.md` で未カバーであり、追加価値がある。
- 過剰: `samp-multinomial-cell-counts` が既存 `dist-multinomial-definition` と実質重複（過剰）。式・到達行動・注意が同一で、新カードに新規の到達行動がない。
- 枚数: 進捗 `target.min=max=4` に対し新規4枚で枚数は一致するが、うち1枚（samp-multinomial-cell-counts）が既存と重複している点で、内容上の過剰が残る。
- 補完関係は以下のとおり明瞭: 2標本（新）→ 等分散t検定（既存 `samp-two-sample-pooled-variance`）／不均等分散（既存 `samp-welch-t`）／2標本比率（既存 `samp-two-proportion-diff`）。標本相関係数（新）→ 母相関係数（既存 `prob-correlation-coefficient`）／無相関と独立（既存 `prob-correlation-independence`）。これらの補完は妥当。

## 5. 優先度根拠（過去問ID）

`references/past-exam-index.yaml` を確認した。

- MATH-2017-Q1「標本平均の歪度・尖度」: 統計量・標本平均の性質に関連し、`samp-statistic-definition`（統計量の概念）の根拠として妥当。
- MATH-2014-Q4「F分布・二標本比較」: 二標本比較の前提として `samp-two-sample-mean-diff`（S）の根拠として妥当。
- MATH-2014-Q3「t分布・信頼区間端点」: 平均・信頼区間の基礎として同カード（S）の根拠を補強。
- 多項分布・標本相関係数の直接的な過去問IDは索引に無いが、適合度検定（多項）、相関係数検定（応用）は標準的出題要素であり、Aの優先度は根拠と矛盾しない。

優先度の整合性：S=1（samp-two-sample-mean-diff）、A=3（他）は妥当。`samp-multinomial-cell-counts` は既存重複を解消した上で位置づける必要があり、現状の優先度は内容の新規性と比べて過大に見える。

## 6. 配信品質

- YAMLフロントマター: 4枚すべて `id/title/category/subcategory/topic/type/difficulty/priority/hashtags/frequency/sources` が揃い、既存カードと形式一致。
- hashtags: 論点（統計量・関数・2標本平均差・多項分布・度数分布・標本相関係数）を適切に抽出。既存 `dist-multinomial-*`（多項分布・確率関数・カテゴリー）と `samp-multinomial-cell-counts`（多項分布・度数分布・標本分布）で「多項分布」が重なるが、用途語は論点別に異なり問題なし。
- sources: `{ type: official_syllabus, topic: … }` を明示し、過去問エビデンスの捏造なし（frequency は0を正直に記録）。
- coverage.yaml: `math-sampling-distributions.cards`（695〜698行）に4枚を登録済み。登録位置は整合。
- サブカテゴリーのカード数: math-sampling-distributions は閾値200を大きく下回り、配信ページ分割不要。
- カード本文: Markdown＋KaTeX（`$...$`/`$$...$$`）に準拠し、`align`・`\label`・`\tag`・独自マクロ不使用。`samp-sample-correlation-basic` の分数 `\frac{r\sqrt{n-2}}{\sqrt{1-r^2}}` 等はKaTeX厳密モードで問題なし。
- 正本同期: 対象4枚は既存 `22_sampling_distributions.md` と同じ記法（N(μ,σ²)等）で書かれており、`notation.md` の規約と整合。特別な新規公式・記法の追加は本work範囲で不要。

## 7. 機械検証

`npm run validate` を実行した。

- 結果: 成功（exit 0）
- validate:structure: 教材構造・依存関係・進捗メタデータの確認
- validate:math: Markdown の KaTeX strict 検証
- validate:text: 生成対象テキストの検証

## 8. 指摘件数

- fatal: 0
- major: 1
  - `samp-multinomial-cell-counts` が既存 `dist-multinomial-definition` と式・到達行動・注意の実質同一で重複（過剰）し、かつ `math-sampling-distributions` の公式用語（t・χ²・F）に該当せずサブカテゴリー配置が不整合。標本分布としての新規到達行動がない。
- minor: 1
  - `samp-two-sample-mean-diff` に既存 `samp-welch-t`・`samp-two-sample-pooled-variance` との相互参照を明示し、既知分散の分布と不偏分散によるt検定の差分を読み手に伝えると補完性がより明確になる。

## 修正確認・最終判定

- 内容の数学的正しさと3枚（samp-statistic-definition / samp-two-sample-mean-diff / samp-sample-correlation-basic）のねらい適合・技能充足は確認できた。
- ただし、`samp-multinomial-cell-counts` の既存重複（major）と、`samp-two-sample-mean-diff` の相互参照（minor）を確認する必要がある。修正後に再査読を実施する。

fatal: 0 / major: 1 / minor: 1

## 機械検証の最終結果

- `npm run validate`: 成功（exit 0）
  - validate:structure: 教材構造・依存関係・進捗メタデータ確認
  - validate:math: 288個の Markdown を KaTeX strict で検証
  - validate:text: 237個の生成対象テキストを検証

## 修正後再査読（2026-08-17）

初回指摘（major 1 / minor 1）に対し修正が行われた。修正後の `anki/cards/27_sampling_extra.md` 4枚を全文再査読した。

### 1. 主要な修正内容の確認

#### samp-multinomial-cell-counts（major指摘への対応）
- **書き換え内容**: 到達行動が「多項標本の同時PMFを記述する」から「Pearson適合度統計量 $X^2=\sum_j(O_j-E_j)^2/E_j$ の帰無仮説下での漸近分布と、適合度検定への接続」に変更された。観測度数 $O_j$・期待度数 $E_j=np_j$ を導入し、自由度 $d-1$ を題目に据えている。
- **重複解消の確認**: 既存 `dist-multinomial-definition`（`20_discrete_continuous_distributions.md`）が扱う同時PMFの記述自体は本カードの主目的から外れ、「注意」に「多項分布の確率質量関数そのものは既存 `dist-multinomial-definition`・`dist-multinomial-moments` と重複するため、本カードは標本分布としての漸近・検定への接続に限定する」と役割分担が明記された。これにより、初回指摘の実質重複（過剰）は解消された。
- **χ²適合度検定との重複の再確認**: 既存 `test-chi-square-fit`（`04_testing.md`, topic chi-square-goodness-fit）は「母数を $r$ 個推定した場合の自由度 $k-1-r$」を扱う pitfall カードで、本カードの「母数既知・完全指定帰無仮説での自由度 $d-1$」の基礎分布を述べるものと相補的である。同一の統計量式を使うが、到達行動（基礎分布 vs. 母数推定時の自由度減）が異なり、重複ではない。
- **数学的正しさ**: 計算例 $n=200,\,d=3,\,p=(0.5,0.3,0.2)$、観測 $(94,63,43)$ で $E=(100,60,40)$、$X^2=0.36+0.15+0.225=0.735$、自由度 $d-1=2$ はすべて正しい（観測和=200、$p$ の和=1 で整合）。
- **1カード1論点**: 適合度検定への漸近接続という単一の到達行動に収まっており満たす。難易度は3に引き上げられ、検定への接続内容と整合。

#### samp-two-sample-mean-diff（minor指摘への対応）
- **相互参照の追記確認**: 「注意」に「この既知分散の分布は、母分散未知の等分散・不等分散t検定（既存 `samp-two-sample-pooled-variance`・`samp-welch-t`）の前提として使う」が追記された。既知分散の基礎分布と不偏分散によるt検定の差分が明示され、補完関係が明確になった。初回 minor 指摘は解消された。

#### samp-statistic-definition / samp-sample-correlation-basic
- 変更なし。初回判定（適合・技能充足）を維持する。

### 2. 修正後の再評価

- ねらい適合性: 4枚とも `math-sampling-distributions` のねらい「標本分布を理解し、応用に用いる」に適合。多項カードは χ²分布（公式用語）へ接続され、サブカテゴリー配置も整合した。
- 1カード1論点: 4枚すべて単一の到達行動を保つ。
- 再生・計算・条件判定・適用技能: 統計量の境界判定、2標本平均差の導出、適合度統計量の計算と自由度の条件、ρ=0のt検定とFisher z変換の使い分けが揃い充足。
- 重複・過不足: 多項カードは既存 `dist-multinomial-definition`・`dist-multinomial-moments` と役割分担し、`test-chi-square-fit` と相補的。2標本カードは既存t検定カード群と相互参照で接続。標本相関係数カードは既存 `prob-correlation-*` と補完。過剰なし、過少なし（進捗 target 4 = 新規4枚）。
- 優先度根拠: 変更なし。S=1（samp-two-sample-mean-diff、MATH-2014-Q4/Q3の根拠）、A=3（他、統計量の前提性・適合度・相関の応用頻度）は妥当。書き換え後も多項カードは適合度検定（標準的出題要素）への接続としてAを維持できる。
- 配信品質: YAML整合・hashtags・coverage登録（`math-sampling-distributions.cards` 695〜698行に4枚、`test-chi-square-fit` は `math-various-tests` 920行に登録済み）・KaTeX準拠はすべて維持。多項カードのhashtagsに「適合度検定」「カイ二乗分布」が追加され、新たな到達行動と整合。

### 3. 残る指摘

初回指摘（major 1 / minor 1）は、修正によりいずれも解消された。新たなfatal・major・minorの指摘はない。

### 4. 機械検証

`npm run validate` を実施した。
- 結果: validate:structure 成功 / validate:math 成功（288ファイル）/ validate:text 成功（237件）、exit 0。
- 再査読時に `math-review.md:165` の禁止記法（`\label`・`\tag` 文字列）を1件検出したが、メイン担当が該当行を言い換え、最終状態では `npm run validate` は exit 0 で成功することを確認した。
- 本カード本文（`27_sampling_extra.md`）および本記録（`exam-review.md`）に禁止記法は存在しない。

### 5. 修正後再査読の最終判定

fatal: 0 / major: 0 / minor: 0

（カード・正本・本記録の試験適合性は全体合格。`math-review.md:165` の禁止記法はメイン担当が是正し、最終的に `npm run validate` は exit 0 で成功することを確認済み。）

## 査読メタデータ

- initial_reviewer_id: exam-editor-reviewer-sampling
- final_reviewer_id: exam-editor-reviewer-sampling
- reviewer_id: exam-editor-reviewer-sampling
- initial_reviewed_at: 2026-08-17T02:30:00.000Z
- final_reviewed_at: 2026-08-17T03:30:00.000Z
- compare_files:
  - anki/cards/20_discrete_continuous_distributions.md（dist-multinomial-definition / moments / binomial-reduction）
  - anki/cards/22_sampling_distributions.md（samp-two-sample-pooled-variance / samp-welch-t / samp-two-proportion-diff）
  - anki/cards/17_distribution_characteristics.md（prob-correlation-coefficient / prob-correlation-independence）
