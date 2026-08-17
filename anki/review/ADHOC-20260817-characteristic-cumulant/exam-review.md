# 試験適合性査読記録 — ADHOC-20260817-characteristic-cumulant

- 担当ID: exam-editor-reviewer
- 査読日時: 2026-08-17
- 対象work: ADHOC-20260817-characteristic-cumulant（特性関数・キュムラント母関数）
- 対象カード: `anki/cards/26_characteristic_cumulant.md` の新規7枚
- 対象サブカテゴリー: math-distribution-functions
- 正本: `anki/notation.md`・`anki/formulae.md`・`anki/syllabus/syllabus.yaml`・`anki/syllabus/coverage.yaml`
- 参考資料: `references/past-exam-trends.md`・`references/past-exam-index.yaml`

査読範囲への適用にあたり、AGENTS.md「Anki作業と通常章・模試の範囲境界」を踏まえた。連結演習（同一設定4〜6小問）、20〜30分の完答演習、本番答案への圧縮、部分点構造・撤退基準、90分・5問中3問の問題選択戦略は Anki の必須成果物ではなく、それらの不在を欠陥としては取り扱わない。

## 1. 公式ねらい（到達行動）

対象サブカテゴリー `math-distribution-functions` は大項目 `math-probability`（確率と確率変数）に属し、対応するねらい全文は

>「確率と確率分布に関する基礎的な事項を理解し、種々の場面に応じた確率計算が正しくできる。」

本workは公式用語「モーメント母関数（積率母関数）」・「確率母関数」の拡張として、特性関数・キュムラント母関数を追加する。カード群は次の校内到達行動を満たす。

| カード | 到達行動（ねらいに対応） | 判定 |
|---|---|---|
| prob-characteristic-function-definition | 期待値の式で特性関数を定義し、実変数 $t$ について常に存在することを再生できる | 適合 |
| prob-characteristic-function-sum | 独立な和の特性関数を積に分解する計算・適用ができる | 適合 |
| prob-characteristic-function-uniqueness | 特性関数の一意性で分布を対応付け・同定できる | 適合 |
| prob-characteristic-function-normal | 正規分布の特性関数を導出・再生できる | 適合 |
| prob-cumulant-mgf | キュムラント母関数を対数モーメント母関数で定義し、第1・第2キュムラントと平均・分散を対応できる | 適合 |
| prob-cumulant-sum | 独立和のキュムラントの加法性を導出できる | 適合 |
| prob-characteristic-nonexistence-mgf | モーメント母関数が不存在でも特性関数が存在する条件判定ができる | 適合 |

すべてのカードがねらいの「基礎的事項の理解」と「種々の場面に応じた確率計算」に内包され、適合。

## 2. カードごとの試験適合性

### prob-characteristic-function-definition（定義・存在・再生）
- ねらい適合性: 適合。`E[e^{itX}]` の複素表示、`$\lvert e^{itX}\rvert=1$` による絶対収束が正しい。$t$ を実数と明示している。
- 1カード1論点: 満たす（定義＋存在保証、1つの到達行動）。
- 正本整合: 記法 `E[X]`・上付きバーなし等は `notation.md` に整合。分布の母数・密度の再掲は論点に必要な範囲（Bernoulli の特性関数）で適切。`notation.md` に特性関数の定義式が未登録なため、「使用公式・定理」欄の再掲で補完できている。
- 数学上の指摘: なし。Bernoulli の特性関数 $1-p+pe^{it}$ は正しい。
- 優先度: S。特性関数の導入であり、後のsum/uniqueness/nonexistenceの前提。

### prob-characteristic-function-sum（独立和の積）
- ねらい適合性: 適合。独立性による積への分解を、実数 $t$ の共通性まで含めて正しく示している。「注意」で既存の `prob-mgf-iid-sum`・`prob-pgf-independent-sum` を明示参照し、補完関係を自覚している。
- 1カード1論点: 満たす。
- 数学上の指摘: なし。Bernoulli の $n$ 和の特性関数 $(1-p+pe^{it})^n$ と二項分布の同定は正しい。
- 優先度: S。再生性・和の分布の同定（uniquness と連動）に直結。

### prob-characteristic-function-uniqueness（一意性・分布同定）
- ねらい適合性: 適合。「一意性定理」「実変数 $t$ 全体で一致なら同分布」の内容は正しい。応用（再生性・和の分布同定）まで要求している。
- 1カード1論点: 満たす。
- 数学上の指摘: なし。MGF の一意性（`prob-mgf-uniqueness-domain`）が「原点近傍で有限」を要するのに対し、特性関数は実軸全体という利点を「注意」で正確に対比している。過不足なし。
- 優先度: S。

### prob-characteristic-function-normal（正規分布の特性関数）
- ねらい適合性: 適合。正規分布のモーメント母関数へ $it$ を代入する導出が正しい。$M_X(it)=e^{i\mu t-\sigma^2t^2/2}$ で指数部の符号の説明も明示。既存 `prob-mgf-identify-normal` を参照して補完性を保つ。
- 1カード1論点: 満たす。
- 数学上の指摘: 「注意」に「$N(\mu,\sigma^2)$ の第2引数は分散」と明記しており、`notation.md` の正規分布規約と一致。$it$ の置き換えがモーメント母関数の解析接続として正当化される旨は、読者に高度な保証を要求せず任意の補足に留めており妥当。
- 優先度: S。正規分布は和の再生・同定の代表例。

### prob-cumulant-mgf（キュムラント母関数の定義）
- ねらい適合性: 適合。$K_X(t)=\log M_X(t)$、展開係数 $\kappa_r$、$\kappa_1=E[X]$、$\kappa_2=\operatorname{Var}(X)$ は正しい。正規分布の例で $r\ge3$ が0になる点も正しい。
- 1カード1論点: 定義＋第1・第2キュムラントの解釈を1つの到達行動に収めており、やや幅があるが1論点の範囲内。
- 数学上の指摘: なし。ただし「注意」で既存 `prob-mgf-mean-variance` との関係を明示している一方、このカード自体が（モーメント母関数の微分による平均・分散ではなく）**対数母関数の展開係数**として平均・分散を再導出している趣旨であり、既存カードと実質的に重複していない。論点分離は妥当。
- 優先度: S。正規分布・指数型分布族の歪度・尖度や、独立和の同定への前提。
- 補足（positive）: 「キュムラント母関数」は公式用語の拡張であり直接の過去問IDはないが、モーメント母関数の過去問 `MATH-2023-Q3` を局所的な前提として位置づけられる。

### prob-cumulant-sum（独立和の加法性）
- ねらい適合性: 適合。$M_S=M_XM_Y$ から $\log$ で和、$\kappa_r(S)=\kappa_r(X)+\kappa_r(Y)$。正規分布の再生の例も正しい。
- 1カード1論点: 満たす。1つの性質（加法性）に限定。
- 数学上の指摘: なし。期待値・分散だけでなく全次数で成立、という「注意」は正しい。
- 優先度: A。独立和の同定・再生を扱うが、`prob-characteristic-function-sum` と一部目的が重なり、単体での過去問直接対応が薄いため S より一段下げた A は妥当。

### prob-characteristic-nonexistence-mgf（MGF不存在でも特性関数は存在）
- ねらい適合性: 適合。対数正規・Cauchy で MGF が不存在でも特性関数が実軸全体で定義されることを正しく判定。Cauchy の特性関数 $e^{-\gamma|t|}$ も正しい。
- 1カード1論点: 満たす。存在条件の判定という pitfall に特化。
- 数学上の指摘: 「注意」の「特性関数は複素数値になるため、直接の期待値計算は複素積分が必要」は妥当な但し書き。既存 `prob-mgf-nonexistence`（対数正規 MGF 不存在）と題材が近いが、本カードは**特性関数の存在**という逆方向の論点であり、pitfall の観点が異なるため過剰な重複ではない。補完関係を満たす。
- 優先度: S。受験者が MGF 不存在の分布で特性関数に切り替える判定力に直結。

## 3. 既存カードとの重複・関係性

既存 MGF/PGF カード（`prob-mgf-*`, `prob-pgf-*`）と比較した。

- `prob-mgf-iid-sum` / `prob-pgf-independent-sum` ↔ `prob-characteristic-function-sum`: いずれも「独立和の母関数が積」だが、母関数の種類（実指数・級数・複素指数）が異なる。同じ数理構造を3つの母関数で確認することで適用技能を固める意図であり、計3枚の類似は過剰とは判定しない。`prob-characteristic-function-sum` は「注意」で既存2枚を明示参照し、補完関係を自覚している。
- `prob-mgf-identify-normal` ↔ `prob-characteristic-function-normal`: 前者が正規 MGF の同定、後者が特性関数の導出。論点が異なる（同定 vs 導出）。
- `prob-mgf-mean-variance` ↔ `prob-cumulant-mgf`: 前者は MGF 微分による平均・分散、後者は対数母関数の展開係数によるキュムラント。手段と解釈が異なる。再整理であることを「注意」に明記し、過剰な重複とはしない。
- `prob-mgf-uniqueness-domain` ↔ `prob-characteristic-function-uniqueness`: 一意性の成立条件（原点近傍 vs 実軸全体）を対比しており、正しく補完。
- `prob-mgf-nonexistence` ↔ `prob-characteristic-nonexistence-mgf`: 不存在（MGFの視点）と存在（特性関数の視点）という逆方向の pitfall で補完。題材（対数正規）は共通だが扱いが異なる。

結論: 過剰な重複はない。特性関数・キュムラント母関数は MGF/PGF カード群と**補完関係**にあり、1カード1論点も維持されている。また、MGF/PGF がカバーしない「MGF が無い分布でも扱える道具」という視点（sum/uniquness/nonexistence）が追加できており、知識充足性を高めている。

## 4. 優先度の根拠（過去問ID対応）

`references/past-exam-index.yaml` には直接「特性関数」「キュムラント」をテーマとするエントリはない。そこで、モーメント母関数・分布同定・和の分布を扱う既存エントリを局所的な前提・類縁として対応付けた。

- `prob-characteristic-function-definition`（S）: 特性関数の第一原理。MGF/PGF の前提群（`MATH-2023-Q3` 指数分布・モーメント母関数）の拡張であり、この体系の入り口。
- `prob-characteristic-function-sum`（S）: 独立和の分布・再生性（`MATH-2021-Q1` 指数分布・畳込み、`MATH-2023-Q3`）への汎用ツール。
- `prob-characteristic-function-uniqueness`（S）: 分布同定（`MATH-2021-Q4` 正規分布のモーメント、`MATH-2021-Q5` 多変量正規の線形変換・独立性）と和の同定へ接続。
- `prob-characteristic-function-normal`（S）: 正規分布の再生・線形変換（`MATH-2017-Q4`、`MATH-2021-Q5`）の前提。
- `prob-cumulant-mgf`（S）: 平均・分散および高次モーメントの系統的導出（`MATH-2021-Q4`、`MATH-2017-Q1` 標本平均の歪度・尖度）へ接続。モーメント母関数単体の扱いを拡張。
- `prob-cumulant-sum`（A）: 独立和の同定を全次数で扱う。直接の過去問IDなし、特性関数・MGFの和カードと目的が一部重なるため、Sに続く重要度A。
- `prob-characteristic-nonexistence-mgf`（S）: MGF不存在な分布（コーシー・対数正規、`math-continuous-distributions` の代表例）で道具を切り替える判定力。過年度索引では直接テーマ化されていないが、試験計算の頻出注意点としてS。

全7枚で過去問IDに基づく優先度を矛盾なく付与できている。

## 5. 配信品質（YAML・hashtags・sources・coverage登録）

- YAMLフロントマター: 7枚すべてで `id / title / category / subcategory / topic / type / difficulty / priority / hashtags / frequency / sources` が揃い、形式が既存カードと一致。
- subcategory: すべて `math-distribution-functions`。
- hashtags: `[特性関数, 定義, 存在]`, `[特性関数, 独立和, 積]`, `[特性関数, 一意性, 分布の同定]`, `[特性関数, 正規分布, モーメント母関数]`, `[キュムラント母関数, 対数, モーメント母関数]`, `[キュムラント, 独立和, 加法性]`, `[特性関数, モーメント母関数, 存在]`。論点を適切に抽出しており重複・欠落なし。
- sources: `{ type: additional, topic: ... }` を7枚すべてに付与し、公式MGF/PGFの拡張・ユーザー要請である根拠を明示。過去問エビデンスを捏造せず `past_exam: 0` に留めている。
- frequency: 全カード `{ past_exam: 0, textbook: 0, independent_problems: 0, source_confirmations: 0 }`。過年度インデックスに直接該当が無いことと整合し誠実。ただし、`SOURCES_CONFIRMATIONS` は正則性が保てている（`MATH-2023-Q3` 等を直接 `sources` に書かず、additional に区分している）。
- coverage.yaml: `math-distribution-functions` の `cards` に新規7枚（`prob-characteristic-*`, `prob-cumulant-*`）が登録済み。`terms` 側では公式用語（確率母関数・モーメント母関数）に紐づく追加操作として、対応する `cards` リストへの反映を確認。
- カード本文は Markdown＋KaTeX の `$...$` / `$$...$$` に準拠し、`align`・`\label`・`\tag`・独自マクロ不使用（検証スクリプトも成功）。
- 配信ページ分割: `math-distribution-functions` はカード数が閾値200を超えない範囲であり、単一ページ分割は不要。

## 6. 数学上の明らかな誤り

明らかな数学的誤りは検出されなかった。以下は精度向上のための任意の改善（severity: minorの懸念を含む精査結果）である。

- `prob-cumulant-mgf` の式 $K_X(t)=\sum_{r=1}^{\infty}\kappa_r t^r/r!$ は標準的な定義のまま正しく、`$\kappa_1=E[X]$`・`$\kappa_2=\operatorname{Var}(X)$` も正。発展として $K_X(0)=\log M_X(0)=0$ の考察はなく、収束半径の問題も暗黙だが、Ankiカードの範囲としては過不足なし。

severity 判定は変更を要する誤りなし（major/fatalゼロ）。

## 7. 機械検証

`npm run validate` を実行した。

- 結果: 成功（exit 0）
- validate:structure: 教材構造・依存関係・進捗メタデータ確認
- validate:math: 282個の Markdown を KaTeX strict で検証
- validate:text: 237個の生成対象テキストを検証

## 8. 初回指摘一覧

- fatal: 0
- major: 0
- minor: 0

指摘なし。ねらい適合性・知識充足性・過不足・優先度根拠・配信品質・機械検証のいずれも合格基準を満たす。

---

## 修正後再査読（2回目：初回指摘の解消確認・全文再査読）

- 担当ID: exam-editor-reviewer（初回と同じ担当）
- 査読日時: 2026-08-17
- 対象: ADHOC-20260817-characteristic-cumulant の新規7枚（`anki/cards/26_characteristic_cumulant.md`、サブカテゴリー `math-distribution-functions`）

初回の試験適合性査読は指摘0件（fatal 0 / major 0 / minor 0）だった。今回は独立数理査読（`math-review.md`）が指摘した minor C1/C2/C3/F1/H1/H2 を踏まえた修正後状態を、全文再査読で確認した。AGENTS.md「Anki作業と通常章・模試の範囲境界」に従い、連結演習・完答演習・答案圧縮・部分点指針・問題選択戦略の不在は欠陥として扱っていない。

### 1. ねらい適合性（到達行動）

公式ねらい「確率と確率分布に関する基礎的な事項を理解し、種々の場面に応じた確率計算が正しくできる。」に対し、全7枚が内包・適合。MGF/PGF の拡張である本workの位置づけは `sources.type: additional` と `syllabus.yaml` の公式用語（確率母関数・モーメント母関数（積率母関数））との補完関係から妥当。修正後も1カード1論点・到達行動の明確化は損なわれていない。

- `prob-characteristic-function-definition`: 特性関数を $E[e^{itX}]$ で定義し、実数 $t$ 全体で存在（絶対収束）を再生。適合。
- `prob-characteristic-function-sum`: 独立和の特性関数の積分解。適合。
- `prob-characteristic-function-uniqueness`: 一意性と分布同定。適合。
- `prob-characteristic-function-normal`: 正規分布の特性関数導出（$i\mu t-\sigma^2t^2/2$）。適合。
- `prob-cumulant-mgf`: $K_X(t)=\log M_X(t)$ の定義と第1・第2キュムラント。修正により定義式が明示化され、題名と一致。適合。
- `prob-cumulant-sum`: 独立和のキュムラント加法性。適合。
- `prob-characteristic-nonexistence-mgf`: MGF不存在（コーシー・対数正規）でもCFは存在する条件判定。適合。

### 2. 知識充足性（再生・計算・条件判定技能）

- 再生: 特性関数定義・一意性・キュムラント定義を再生でき、修正後は `prob-cumulant-mgf` の定義式が問題文/答えで明示された。
- 計算: Bernoulli→二項の和、正規分布の $M(it)$ 導出、キュムラント加法性の導出が目で追える式展開で示されている。
- 条件判定: MGF不存在自動の存在条件、MGFの一意性（原点近傍で有限）とCFの一意性（実軸全体）の対比が正確。
- 特に `prob-characteristic-function-normal` の注意では、$it$ 置換が正規分布（指数部が整関数）に限って正当であることが明示され、一般分布での形式的代入との不一致が指摘でき、教育上適切。

### 3. 過不足（既存MGF/PGFカードとの補完関係）

- 既存 `prob-mgf-*` 群（`15_moment_generating_functions.md`）との目的重複はなく、和（`prob-mgf-iid-sum`）、同定（`prob-mgf-identify-normal` / `prob-mgf-uniqueness-domain`）、不存在（`prob-mgf-nonexistence`）、平均・分散（`prob-mgf-mean-variance`）を明示参照して相補的。
- PGF/MGF から本work（CF・キュムラント母関数）への拡張が一方向で整理され、既存カードとの重複や過剰なし。
- 枚数: 進捗 `target.min=max=7` に対し新規7枚で一致し、過少・過多なし。

### 4. 優先度根拠（過去問ID）

`references/past-exam-index.yaml` のエントリ（`MATH-2021-Q1` 指数分布・畳込み、`MATH-2021-Q4` 正規分布・モーメント、`MATH-2021-Q5` 多変量正規の線形変換、`MATH-2023-Q3` 指数分布・モーメント母関数、`MATH-2017-Q1` 標本平均の歪度・尖度、`MATH-2017-Q4` 正規分布の線形変換）を確認した。過年度索引に「特性関数」「キュムラント」の直接エントリが無いことを踏まえ、distribution同定・和の分布・正規分布の線形変換・モーメント導出へ接続するS（6枚）/A（1枚：`prob-cumulant-sum`）の優先度付与は根拠と矛盾しない。

### 5. 配信品質

- YAMLフロントマター: 7枚すべて `id/title/category/subcategory/topic/type/difficulty/priority/hashtags/frequency/sources` が揃い既存カードと形式一致。
- hashtags: 論点（定義・独立和・一意性・正規分布・対数MGF・加法性・存在）を適切に抽出し、既存MGFカードと重複しない。
- sources: `{ type: additional }` で公式MGF/PGFの拡張・ユーザー要請を明示し、過去問エビデンスの捏造なし。
- coverage.yaml: `math-distribution-functions.cards`（122〜128行）に新規7枚を登録済み。特性関数・キュムラント母関数は公式シラバス用語に無いため `terms` への追加は不要で、`cards` 側登録で整合。
- 正本同期: `notation.md` に特性関数・キュムラント母関数の定義、`formulae.md` に特性関数（定義・独立和・代表例・一意性）とキュムラント（定義・加法性）が登録済み（C2解消）。
- カード本文は Markdown＋KaTeX（`$...$` / `$$...$$`）に準拠し、`align`・`\label`・`\tag`・独自マクロ不使用。
- サブカテゴリーのカード数は閾値200以下で配信ページ分割不要。

### 6. 初回指摘の解消確認（試験適合性側）

初回 exam-review 自体の指摘は0件で、追加指摘なし。独立数理査読の minor 指摘（C1/C2/C3/F1/H1/H2）が修正後のカード・正本に反映され、いずれも解消していることを確認。修正がねらい適合性・知識充足性・過不足・優先度根拠・配信品質を損なう変更は含まれていない。

### 7. 機械検証

`npm run validate` を2回目検証として実行した。

- 結果: 成功（exit 0）
- validate:structure: 教材構造・依存関係・進捗メタデータ確認
- validate:math: 284個の Markdown を KaTeX strict で検証
- validate:text: 237個の生成対象テキストを検証

### 8. 修正後再査読の指摘件数

- fatal: 0
- major: 0
- minor: 0

指摘なし。全文再査読・初回指摘の解消確認・機械検証のいずれも合格基準を満たす。

## 修正確認

初回 exam-review 自体の指摘は0件であり、独立数理査読の minor（C1/C2/C3/F1/H1/H2）が修正後にすべて解消し、ねらい適合性・知識充足性・過不足・優先度根拠・配信品質を損なう変更がないことを確認した（fatal: 0 / major: 0 / minor: 0）。

## 最終判定（単一行）

fatal: 0 / major: 0 / minor: 0

## 査読メタデータ

- initial_reviewer_id: exam-editor-reviewer
- final_reviewer_id: exam-editor-reviewer
- initial_reviewed_at: 2026-08-17T00:20:30.000Z
- final_reviewed_at: 2026-08-17T01:00:30.000Z