# C02 事象と確率・確率分布と母関数 試験適合性査読

initial_reviewer_id: /root/anki_exam_review
initial_reviewed_at: 2026-08-14T02:15:49+09:00

## 査読対象

- 新規55枚: `anki/cards/11_events_distribution_functions.md`〜`15_moment_generating_functions.md`
- 既存同サブカテゴリー4枚: `prob-inclusion-exclusion`、`prob-bayes-diagnostic`、`prob-cdf-from-pmf`、`dist-mgf-poisson`
- 正本: `anki/notation.md`、`anki/formulae.md`、`anki/syllabus/syllabus.yaml` schema 3、`anki/syllabus/coverage.yaml` schema 3
- 出題傾向: `references/past-exam-trends.md`、`references/past-exam-index.yaml`
- カード本文の数理的な独立再計算は独立数理査読の担当範囲とし、本査読では試験での再生・選択・計算・判定可能性を確認した。

## 初回指摘

### major 1: 具体的な過去問対応があるカードまで新規55枚すべて priority B / frequency 0 である

- 場所: 新規5ファイルの全55枚のfront matter。
- 根拠: `past-exam-index.yaml` には独立性、条件付き分布、混合分布、生存関数・故障率、指数分布のモーメント母関数などとの年度・科目・大問対応がある。一方、全55枚が `priority: B`、`past_exam: 0` であり、問題選択価値の差が検索・ソートへ反映されない。
- 影響: 90分で5問から3問を選ぶ学習で、反復すべき過去問直結技能と発展・条件確認カードを同順位で扱うことになる。
- 修正案: 下表の直接対応カードをAへ上げ、`sources` に `type: past_exam` と具体IDを追加し、`frequency.past_exam` を重複しないID数と整合させる。今回の索引はテーマ索引で問題全文の小問照合ではないため、Sは提案しない。表にない新規40枚はBを維持する。

| card ID | 推奨 | past exam ID | 対応技能 |
|---|---:|---|---|
| `prob-independent-events` | A | `MATH-2022-Q1` | 積条件による独立判定 |
| `prob-cdf-from-density` | A | `MATH-2024-Q2`, `MATH-2018-Q5`, `MATH-2012-Q1` | 密度・累積分布関数間の積分と分布導出 |
| `prob-marginal-density` | A | `MATH-2022-Q2`, `MATH-2018-Q4`, `MATH-2017-Q4` | 同時分布から周辺量を積分する |
| `prob-conditional-density` | A | `MATH-2022-Q2`, `MATH-2018-Q4`, `MATH-2017-Q4` | 条件付き分布を同時・周辺密度から作る |
| `prob-joint-factorization-independence` | A | `MATH-2022-Q1`, `MATH-2021-Q5` | 同時分布の積分解による独立判定 |
| `prob-mixed-cdf` | A | `MATH-2024-Q4` | 点質量と連続部分を含む累積分布関数 |
| `prob-mixture-marginal` | A | `MATH-2024-Q4`, `MATH-2022-Q3` | 潜在成分を周辺化して混合分布を作る |
| `prob-density-bayes-two-class` | A | `MATH-2021-Q2` | 観測後確率をBayes更新する橋渡し技能 |
| `prob-conditional-cdf-from-density` | A | `MATH-2022-Q2`, `MATH-2018-Q4`, `MATH-2017-Q4` | 条件付き密度から条件付き累積分布関数を作る |
| `prob-survival-from-cdf` | A | `SCI-2019-Q1` | 累積分布関数から生存関数を得る |
| `prob-survival-hazard` | A | `SCI-2019-Q1`, `SCI-2017-Q2` | 生存関数と密度から危険率を得る |
| `prob-cumulative-hazard` | A | `SCI-2019-Q1`, `SCI-2017-Q2` | 生存関数・危険率・累積危険率を変換する |
| `prob-survival-from-hazard` | A | `SCI-2019-Q1`, `SCI-2017-Q2` | 危険率から生存関数を復元する |
| `prob-mgf-mean-variance` | A | `MATH-2023-Q3` | モーメント母関数の微分でモーメントを得る |
| `prob-mgf-exponential-domain` | A | `MATH-2023-Q3` | 指数分布のモーメント母関数と収束域を導く |

新規55枚の全件監査でB維持とした40枚:

`prob-conditional-multiplication`, `prob-total-probability`, `prob-pairwise-not-mutual`, `prob-pgf-moments`, `prob-mgf-independent-sum`, `prob-complement-at-least-one`, `prob-inclusion-exclusion-three`, `prob-chain-rule-three`, `prob-independent-complements`, `prob-conditioning-breaks-independence`, `prob-density-normalization`, `prob-cdf-jump-mass`, `prob-discrete-marginal`, `prob-discrete-conditional`, `prob-pmf-normalization`, `prob-cdf-validity`, `prob-interval-from-cdf`, `prob-cdf-endpoint-choice`, `prob-joint-cdf-from-density`, `prob-rectangle-from-joint-cdf`, `prob-joint-density-normalization`, `prob-joint-pmf-normalization`, `prob-discrete-independence-cross-product`, `prob-conditional-equals-marginal`, `prob-joint-cdf-independence`, `prob-truncated-conditional-density`, `prob-pgf-recover-pmf`, `prob-pgf-binomial`, `prob-pgf-geometric`, `prob-pgf-poisson`, `prob-pgf-independent-sum`, `prob-pgf-thinning`, `prob-pgf-factorial-moment`, `prob-pgf-validity`, `prob-mgf-affine-transform`, `prob-mgf-iid-sum`, `prob-mgf-gamma`, `prob-mgf-identify-normal`, `prob-mgf-nonexistence`, `prob-mgf-uniqueness-domain`。

既存4枚についてはpilot時の未検証priorityを本作業で一括変更する必須対象とはしない。ただし `prob-bayes-diagnostic` は `MATH-2021-Q2`、`prob-cdf-from-pmf` は `MATH-2024-Q4`、`dist-mgf-poisson` はPoisson関連の `MATH-2023-Q1` / `MATH-2022-Q3` との対応を次回横断監査で精査する価値がある。カードが扱う操作と大問テーマが直接一致しない限りBを維持する。

### major 2: 「確率の計算」に有限標本空間・場合の数から確率を組み立てる技能がない

- 場所: `math-events`。coverage上は `prob-total-probability` と `prob-complement-at-least-one` で公式用語「確率の計算」をcompleteとしている。
- 再現: 11枚は包除、補集合、条件付き確率、全確率、Bayes、独立性を扱うが、等確率な有限標本空間で順列・組合せを使って分子・分母を数えるカードがない。
- 根拠: 公式ねらいは「種々の場面に応じた確率計算が正しくできる」まで要求する。`MATH-2021-Q2` の超幾何分布・事後確率のような非復元抽出では、組合せによる確率構成が後続計算の入口になる。
- 修正案: 非復元抽出または無作為配置を題材に、標本点の等確率性を確認し、組合せ比で確率を最後まで求める1枚を追加する。単なる公式列挙ではなく、「順序を区別するか」の判定を含める。

### major 3: 事象の条件付き確率を定義式の向きで直接計算するカードがない

- 場所: `prob-conditional-multiplication`、`prob-chain-rule-three`、coverageの「条件付き確率」。
- 再現: `prob-conditional-multiplication` は既知の $P(A\mid B)$ と $P(B)$ から $P(A\cap B)$ を求める逆向きであり、`prob-chain-rule-three` も条件付き確率を入力として使う。$P(A\cap B)$ と $P(B)$ から $P(A\mid B)$ を求め、条件で標本空間を絞る基本操作は事象カードにない。
- 根拠: `formulae.md` に定義式はあるが、公式を読むだけでは「条件側を分母に置く」「条件後の標本空間で正規化する」という試験時の選択・計算を訓練できない。離散確率変数の `prob-discrete-conditional` は表操作であり、事象の向き違いを代替しない。
- 修正案: $P(A\cap B)/P(B)$ を直接計算し、$P(A\mid B)$ と $P(B\mid A)$ を比較する1枚を追加する。

### major 4: 累積分布関数から連続部分の確率密度関数へ戻す操作カードがない

- 場所: `math-distribution-functions` の「確率密度関数」「累積分布関数」。
- 再現: `prob-cdf-from-density` は密度を積分して累積分布関数を作り、`prob-cdf-jump-mass` は跳びから点確率を回収するが、微分可能点で $f_X(x)=F_X'(x)$ を使って連続密度を得るカードがない。
- 根拠: `formulae.md` に公式はあるものの、区分的な累積分布関数を微分し、端点・跳び・台外を処理する技能までは再生できない。過去問では前半で分布関数を導出し、後半の条件付き量・推定へ再利用する構造が多い。
- 修正案: 区分的な累積分布関数から連続部分の密度と点質量を分けて回収し、密度の積分と跳びの和が1になることまで検算する1枚を追加する。`prob-cdf-jump-mass` と役割を明確に分ける。

### minor 1: 3カードの数式に `\qquad` ではなく裸の `qquad` が表示される

- 場所: `prob-survival-hazard` の使用公式、`prob-conditioning-breaks-independence` の計算例、`prob-survival-from-hazard` の使用公式。
- 再現: それぞれ `,qquad` と記述され、KaTeXではエラーにならず文字 $q q u a d$ として表示される。
- 影響: 公式の区切りが未知の積のように見え、暗記カードの可読性を損なう。
- 修正案: 3箇所を `,\qquad` へ修正する。

初回判定: fatal: 0 / major: 4 / minor: 1

## ねらい適合性

公式 `aims[]` 全文: 「確率と確率分布に関する基礎的な事項を理解し、種々の場面に応じた確率計算が正しくできる。」

| 到達行動 | 対応カードID | 学習者が実行する操作 | 判定 |
|---|---|---|---|
| 確率に関する基礎事項を理解する | `prob-inclusion-exclusion`, `prob-conditional-multiplication`, `prob-independent-events`, `prob-pairwise-not-mutual`, `prob-independent-complements`, `prob-conditioning-breaks-independence` | 和・積・補集合、条件、独立・相互独立を式で区別する | 概ね適合。ただし条件付き確率を定義式の向きで計算する技能が不足（major 3） |
| 確率分布に関する基礎事項を理解する | `prob-pmf-normalization`, `prob-density-normalization`, `prob-cdf-validity`, `prob-mixed-cdf`, `prob-joint-density-normalization`, `prob-joint-pmf-normalization` | PMF/PDF/CDF・同時分布が確率分布になる条件を判定し、正規化する | 適合 |
| 種々の場面に応じて公式を選ぶ | `prob-total-probability`, `prob-bayes-diagnostic`, `prob-complement-at-least-one`, `prob-inclusion-exclusion-three`, `prob-density-bayes-two-class`, `prob-pgf-thinning` | 場合分け、逆確率、少なくとも、混合・間引きの局面を見て式を選ぶ | 概ね適合。ただし有限標本空間の数え上げ局面が不足（major 2） |
| 確率を正しく計算する | `prob-interval-from-cdf`, `prob-cdf-endpoint-choice`, `prob-rectangle-from-joint-cdf`, `prob-marginal-density`, `prob-discrete-marginal`, `prob-conditional-density`, `prob-discrete-conditional` | 区間端点、二次元包除、周辺化、条件付き正規化を最後まで計算する | 概ね適合。ただしCDFから連続密度への逆変換が不足（major 4） |
| 分布を母関数で計算・同定する | `prob-pgf-recover-pmf`, `prob-pgf-moments`, `prob-pgf-independent-sum`, `prob-pgf-thinning`, `prob-mgf-mean-variance`, `prob-mgf-affine-transform`, `prob-mgf-iid-sum`, `prob-mgf-identify-normal`, `prob-mgf-uniqueness-domain` | 係数・微分・積・合成・引数変換を選び、確率・モーメント・分布を得る | 適合 |

この作業は公式aimが対応付ける `math-events` と `math-distribution-functions` の双方を担当する。分布の特性値、変数変換、極限定理は後続C03/C04が担当するが、上記major 2〜4は今回2サブカテゴリー自身の基礎技能なので後続へ保留できない。

## 知識充足性

coverage schema 3の15公式termsについて、名目上のcard割当だけでなく試験時の操作を確認した。

| 公式term | 主なカードID | 再生・選択・計算・判定 | 判定 |
|---|---|---|---|
| 確率の計算 | `prob-total-probability`, `prob-complement-at-least-one`, `prob-inclusion-exclusion` | 全確率、補集合、包除を選び計算 | 不足: 場合の数から確率を構成できない（major 2） |
| 統計的独立 | `prob-independent-events`, `prob-pairwise-not-mutual`, `prob-independent-complements`, `prob-conditioning-breaks-independence` | 積条件、相互独立、補事象、条件付き独立を判定・証明 | 充足 |
| 条件付き確率 | `prob-conditional-multiplication`, `prob-chain-rule-three`, `prob-conditioning-breaks-independence` | 乗法公式・連鎖則を使う | 不足: 定義式方向の直接計算がない（major 3） |
| ベイズの定理 | `prob-bayes-diagnostic`, `prob-density-bayes-two-class` | 離散診断・連続観測で事後確率を正規化 | 充足 |
| 包除原理 | `prob-inclusion-exclusion`, `prob-inclusion-exclusion-three` | 2事象・3事象の重複を補正 | 充足 |
| 確率関数 | `prob-pmf-normalization`, `prob-cdf-from-pmf` | 非負性・総和1、PMFからCDFを作る | 充足 |
| 確率密度関数 | `prob-density-normalization`, `prob-cdf-from-density` | 非負性・積分1、密度からCDFを作る | 不足: CDFから密度へ戻せない（major 4） |
| 累積分布関数 | `prob-cdf-validity`, `prob-interval-from-cdf`, `prob-cdf-endpoint-choice`, `prob-cdf-jump-mass`, `prob-mixed-cdf` | 三条件判定、区間確率、左極限、跳び・混合を処理 | 不足: 連続部分の微分回収がない（major 4） |
| 生存関数 | `prob-survival-from-cdf`, `prob-survival-hazard`, `prob-survival-from-hazard` | CDF・危険率との相互変換 | 充足 |
| 危険率 | `prob-survival-hazard`, `prob-cumulative-hazard`, `prob-survival-from-hazard` | $f/S$、負の対数、積分・指数で相互変換 | 充足（表示minorあり） |
| 同時分布 | `prob-joint-density-normalization`, `prob-joint-pmf-normalization`, `prob-joint-cdf-from-density`, `prob-rectangle-from-joint-cdf`, `prob-joint-factorization-independence` | 二重和・二重積分、同時CDF、長方形確率、独立判定 | 充足 |
| 周辺分布 | `prob-marginal-density`, `prob-discrete-marginal`, `prob-mixture-marginal` | 和・積分・潜在変数の消去 | 充足 |
| 条件付き分布 | `prob-conditional-density`, `prob-discrete-conditional`, `prob-truncated-conditional-density`, `prob-conditional-cdf-from-density` | 同時/周辺比、切断再正規化、条件付きCDF | 充足 |
| 確率母関数 | `prob-pgf-recover-pmf`, `prob-pgf-moments`, `prob-pgf-binomial`, `prob-pgf-geometric`, `prob-pgf-poisson`, `prob-pgf-independent-sum`, `prob-pgf-thinning`, `prob-pgf-validity` | 定義、係数回収、微分、導出、積、合成、妥当性判定 | 充足 |
| モーメント母関数（積率母関数） | `dist-mgf-poisson`, `prob-mgf-independent-sum`, `prob-mgf-mean-variance`, `prob-mgf-affine-transform`, `prob-mgf-iid-sum`, `prob-mgf-exponential-domain`, `prob-mgf-gamma`, `prob-mgf-identify-normal`, `prob-mgf-nonexistence`, `prob-mgf-uniqueness-domain` | 定義、微分、積、変換、収束域、分布同定、存在・一意性条件 | 充足 |

過去問の橋渡し技能として、周辺化→条件付き分布、CDF→区間確率、母関数→モーメント/独立和、生存関数→危険率は揃う。欠落する橋渡しはmajor 2〜4に集約した。

## 過不足

- `target.min: 55`〜`target.max: 65` に対し新規55枚で、枚数は目安内の下限ちょうどである。内訳は `math-events` 9枚、`math-distribution-functions` 46枚、難易度1が12枚・2が40枚・3が3枚、typeはformula 17・calc_step 17を中心に9種である。
- 同じ式を異なる局面で使うカードはあるが、重大な言い換え重複とは判定しない。例: PGFの二項分布導出と独立Bernoulli和、MGFの一般独立和とi.i.d.和、CDF/生存/危険率の各方向は、導出根拠または逆向き操作が異なる。
- `prob-joint-pmf-normalization` は `prob-pmf-normalization` の二変量化で近いが、二重添字の台列挙を独立技能として扱えるため削除必須とはしない。PGF/MGFの存在条件・妥当性カードも発展的だが、公式選択の誤用防止に寄与し過剰とはしない。
- 目安内でもmajor 2〜4の基礎操作不足がある。重複カードの削除より、不足3枚を追加して58枚とする案が目安内で最も明瞭である。
- 1枚1論点、公式再掲、具体例の完遂は概ね満たす。55枚を単一カードへ詰め込んだ箇所や20〜30分大問相当の過剰長文化はない。Ankiは部品訓練であり、複合大問構造は通常教材・ドリル側で扱う。

## Web・配信確認

- `npm run anki:validate` により105枚、warnings 0、7カテゴリーpage、1page最大200、buildと`--check`の一致を確認した。
- 実ブラウザを768×1024へ設定し、`index.html` のカテゴリー一覧から「確率と確率変数」63枚へ遷移できた。サブカテゴリーは「事象と確率」「確率分布と母関数」等の日本語表示である。
- サブカテゴリーを「事象と確率」、全文検索を「Bayes」にすると `1 / 63 cards` へ絞り込まれ、検索・フィルターが併用できた。カテゴリー一覧、記法、公式への導線も表示された。
- `build_site.mjs --check` のローカル資産・外部network URL拒否と、全HTML/CSS/JS/KaTeX資産の同梱検査が成功しており、`dist/` 一式を配るオフライン要件に回帰はない。HTTPページをブラウザのoffline modeで再読込すればサーバー自体へ到達できず失敗するのは期待動作であり、コピー配布の静的オフライン性とは区別した。

## 機械検証

- 実行日時: 2026-08-14T02:14:00+09:00（aims更新後）、2026-08-14T02:15:00+09:00（coverage schema 3更新後）
- `npm run anki:validate`: success — `validated 105 cards (0 warnings)`、7 category pages、max 200、build / `--check`成功。
- `npm run validate`: success — structure成功、KaTeX strict 245 Markdown成功、text 237件成功。

初回最終件数: fatal: 0 / major: 4 / minor: 1

## 修正確認

### 初回指摘の解消

- major 1（priority一様化）: C02全62枚を再査定し、A 17枚 / B 45枚となった。Aは全件に `past-exam-index.yaml` の実在IDを持つ `past_exam` sourceがあり、`frequency.past_exam` と `source_confirmations` は重複を除くID数に一致する。Bには正のfrequencyやpast-exam sourceが混在しない。索引はテーマ確認であって個別小問の完全照合ではないため、Sを付けない判断も妥当である。
- major 2（場合の数）: `prob-counting-sample-space` が、等確率性を先に判定し、$|A|/|\Omega|$ を組合せで計算する技能を補った。公式は `formulae.md` の確率節にも同期された。
- major 3（条件付き確率の直接計算）: `prob-conditional-definition-direct` が、条件側を分母に置いて $P(A\cap B)/P(B)$ を直接計算し、逆向きとの取り違えを判定する技能を補った。
- major 4（CDFから密度）: `prob-density-from-cdf-derivative` が、区分的CDFを微分して連続密度を回収し、台外を0として積分1まで検算する。跳びは微分で回収できないという注意を持ち、既存 `prob-cdf-jump-mass` と合わせて連続部分・点質量の双方を扱える。
- minor 1（裸の`qquad`）: `prob-survival-hazard`、`prob-conditioning-breaks-independence`、`prob-survival-from-hazard` の3箇所は `\qquad` に修正された。対象6ファイルに裸の`qquad`が残っていないことを検索確認した。
- 再査読中の追加minor（等確率公式の正本未同期）: `formulae.md` に「等確率な有限標本空間」が追加され、カード内再掲と一致した。

### 最終ねらい適合性

対象公式aim全文は「確率と確率分布に関する基礎的な事項を理解し、種々の場面に応じた確率計算が正しくできる。」である。

| 到達行動 | 最終的な代表カード | 学習者が実行できる操作 | 判定 |
|---|---|---|---|
| 確率の基礎事項を理解する | `prob-counting-sample-space`, `prob-conditional-definition-direct`, `prob-independent-events`, `prob-pairwise-not-mutual`, `prob-inclusion-exclusion` | 等確率性、条件付き確率、独立・相互独立、集合演算を定義と条件から判定する | 充足 |
| 確率分布の基礎事項を理解する | `prob-pmf-normalization`, `prob-density-normalization`, `prob-cdf-validity`, `prob-density-from-cdf-derivative`, `prob-joint-density-normalization` | PMF/PDF/CDF・同時分布の成立条件と相互変換を説明・検算する | 充足 |
| 場面に応じた方法を選択する | `prob-total-probability`, `prob-bayes-diagnostic`, `prob-complement-at-least-one`, `prob-mixture-marginal`, `prob-pgf-thinning` | 場合分け、逆確率、補集合、周辺化、母関数合成を局面から選ぶ | 充足 |
| 確率計算を正しく完遂する | `prob-interval-from-cdf`, `prob-cdf-endpoint-choice`, `prob-rectangle-from-joint-cdf`, `prob-marginal-density`, `prob-conditional-density`, `prob-survival-from-hazard` | 端点・台・積分範囲・条件側分母を明示して数値または分布を結論まで求める | 充足 |
| 母関数を計算へ応用する | `prob-pgf-recover-pmf`, `prob-pgf-moments`, `prob-pgf-independent-sum`, `prob-mgf-mean-variance`, `prob-mgf-exponential-domain`, `prob-mgf-identify-normal` | 係数、微分、積、存在範囲、形の照合から確率・モーメント・分布を得る | 充足 |

C03/C04が担う特性値・変数変換・極限定理を先取りしてカテゴリー全体完了と誤認していない。今回の2サブカテゴリーが担うaim部分には、後続へ保留すべきでない基礎操作の欠落は残っていない。

### 最終知識充足性

公式15 termsはcoverage schema 3で公式と同順・同名に登録され、全て `status: card` で実在する同サブカテゴリーのカードに結び付く。割当の実質は次のとおりである。

| 公式term | 定義再生・公式選択・計算・条件判定を担うカード | 最終判定 |
|---|---|---|
| 確率の計算 | `prob-counting-sample-space`, `prob-total-probability`, `prob-complement-at-least-one` | 等確率な場合の数、場合分け、補集合を選択・計算できる |
| 統計的独立 | `prob-independent-events`, `prob-pairwise-not-mutual`, `prob-independent-complements`, `prob-conditioning-breaks-independence` | 積条件・相互独立・条件付け後を判定できる |
| 条件付き確率 | `prob-conditional-definition-direct`, `prob-conditional-multiplication`, `prob-chain-rule-three` | 定義式、逆向きの乗法公式、連鎖則を双方向に使える |
| ベイズの定理 | `prob-bayes-diagnostic`, `prob-density-bayes-two-class` | 離散診断と連続観測で事後確率を正規化できる |
| 包除原理 | `prob-inclusion-exclusion`, `prob-inclusion-exclusion-three` | 2・3事象の重複を補正できる |
| 確率関数 | `prob-pmf-normalization`, `prob-cdf-from-pmf` | 非負性・総和1とCDFへの累積を扱える |
| 確率密度関数 | `prob-density-normalization`, `prob-cdf-from-density`, `prob-density-from-cdf-derivative` | 積分1、PDF→CDF、CDF→PDFを扱える |
| 累積分布関数 | `prob-cdf-validity`, `prob-interval-from-cdf`, `prob-cdf-endpoint-choice`, `prob-cdf-jump-mass`, `prob-mixed-cdf`, `prob-density-from-cdf-derivative` | 三条件、区間端点、跳び、連続部分を判定・計算できる |
| 生存関数 | `prob-survival-from-cdf`, `prob-survival-hazard`, `prob-survival-from-hazard` | CDF・危険率との相互変換ができる |
| 危険率 | `prob-survival-hazard`, `prob-cumulative-hazard`, `prob-survival-from-hazard` | $f/S$、負の対数、積分・指数を選べる |
| 同時分布 | `prob-joint-density-normalization`, `prob-joint-pmf-normalization`, `prob-joint-cdf-from-density`, `prob-rectangle-from-joint-cdf`, `prob-joint-factorization-independence` | 二重和・積分、長方形確率、独立性を扱える |
| 周辺分布 | `prob-marginal-density`, `prob-discrete-marginal`, `prob-mixture-marginal` | 積分・総和・潜在クラス消去ができる |
| 条件付き分布 | `prob-conditional-density`, `prob-discrete-conditional`, `prob-truncated-conditional-density`, `prob-conditional-cdf-from-density` | 同時/周辺比、切断再正規化、条件付きCDFを計算できる |
| 確率母関数 | `prob-pgf-recover-pmf`, `prob-pgf-moments`, `prob-pgf-binomial`, `prob-pgf-geometric`, `prob-pgf-poisson`, `prob-pgf-independent-sum`, `prob-pgf-thinning`, `prob-pgf-validity` | 係数・微分・導出・積・合成・妥当性判定ができる |
| モーメント母関数（積率母関数） | `dist-mgf-poisson`, `prob-mgf-independent-sum`, `prob-mgf-mean-variance`, `prob-mgf-affine-transform`, `prob-mgf-iid-sum`, `prob-mgf-exponential-domain`, `prob-mgf-gamma`, `prob-mgf-identify-normal`, `prob-mgf-nonexistence`, `prob-mgf-uniqueness-domain` | 定義・微分・積・変換・収束域・同定・存在条件を扱える |

### 最終過不足

- 新規58枚は目安55〜65枚内である。C02全体は既存4枚を含む62枚で、A 17 / B 45。追加3枚はいずれも初回に欠けた別の基礎操作であり、既存カードの言い換えではない。
- PMF/PDFの一変量・二変量正規化、離散・連続の周辺化、PGF/MGFの一般和・i.i.d.和など近接カードは、台・計算方向・判定条件が異なる。削除・統合を要する実質重複はない。
- 追加後も1枚1論点を維持し、公式再掲と数値・式の具体例を結論まで完遂している。試験範囲外へ逸脱する過剰カードや、今回の公式terms・aimに必要な不足は残っていない。

### 最終優先度根拠

A 17枚と具体past-exam IDは次のとおり。いずれもカードの中心操作が索引テーマまたはその大問を解く直前の不可欠な操作に対応する。

| Aカード | past-exam ID |
|---|---|
| `prob-bayes-diagnostic` | `MATH-2021-Q2` |
| `prob-independent-events` | `MATH-2022-Q1` |
| `prob-cdf-from-density` | `MATH-2024-Q2`, `MATH-2018-Q5` |
| `prob-survival-hazard` | `SCI-2019-Q1`, `SCI-2017-Q2` |
| `prob-marginal-density` | `MATH-2022-Q2` |
| `prob-conditional-density` | `MATH-2022-Q2`, `MATH-2018-Q4`, `MATH-2017-Q4` |
| `prob-mixed-cdf` | `MATH-2024-Q4` |
| `prob-survival-from-cdf` | `SCI-2019-Q1` |
| `prob-cumulative-hazard` | `SCI-2019-Q1`, `SCI-2017-Q2` |
| `prob-survival-from-hazard` | `SCI-2019-Q1`, `SCI-2017-Q2` |
| `prob-mixture-marginal` | `MATH-2024-Q4` |
| `prob-conditional-cdf-from-density` | `MATH-2022-Q2`, `MATH-2018-Q4`, `MATH-2017-Q4` |
| `prob-mgf-mean-variance` | `MATH-2023-Q3` |
| `prob-mgf-exponential-domain` | `MATH-2023-Q3` |
| `prob-counting-sample-space` | `MATH-2022-Q1` |
| `prob-conditional-definition-direct` | `MATH-2022-Q2` |
| `prob-density-from-cdf-derivative` | `MATH-2018-Q5` |

B 45枚は、公式基礎、別方向の検算、発展的な存在条件として有用だが、現在の索引だけではカード中心操作への直接対応を確認できないためBを維持した: `prob-inclusion-exclusion`, `prob-cdf-from-pmf`, `dist-mgf-poisson`, `prob-conditional-multiplication`, `prob-total-probability`, `prob-pairwise-not-mutual`, `prob-pgf-moments`, `prob-mgf-independent-sum`, `prob-complement-at-least-one`, `prob-inclusion-exclusion-three`, `prob-chain-rule-three`, `prob-independent-complements`, `prob-conditioning-breaks-independence`, `prob-density-normalization`, `prob-cdf-jump-mass`, `prob-discrete-marginal`, `prob-discrete-conditional`, `prob-joint-factorization-independence`, `prob-pmf-normalization`, `prob-cdf-validity`, `prob-interval-from-cdf`, `prob-cdf-endpoint-choice`, `prob-joint-cdf-from-density`, `prob-rectangle-from-joint-cdf`, `prob-joint-density-normalization`, `prob-joint-pmf-normalization`, `prob-discrete-independence-cross-product`, `prob-conditional-equals-marginal`, `prob-joint-cdf-independence`, `prob-truncated-conditional-density`, `prob-density-bayes-two-class`, `prob-pgf-recover-pmf`, `prob-pgf-binomial`, `prob-pgf-geometric`, `prob-pgf-poisson`, `prob-pgf-independent-sum`, `prob-pgf-thinning`, `prob-pgf-factorial-moment`, `prob-pgf-validity`, `prob-mgf-affine-transform`, `prob-mgf-iid-sum`, `prob-mgf-gamma`, `prob-mgf-identify-normal`, `prob-mgf-nonexistence`, `prob-mgf-uniqueness-domain`。

Sは0枚とした。`past-exam-index.yaml` は年度・大問のテーマ索引であり、個別小問の出題頻度や同一操作の反復を公式問題本文から全件確認した根拠ではないため、Aより上へ引き上げない。

### 最終機械検証

- 実行日時: 2026-08-14T02:24:34+09:00
- `npm run anki:validate`: success — `validated 108 cards (0 warnings)`、7 category pages、max 200、build / `--check`成功。
- `npm run validate`: success — structure成功、KaTeX strict 246 Markdown成功、text 237件成功。

final_reviewer_id: /root/anki_exam_review
final_reviewed_at: 2026-08-14T02:24:34+09:00

fatal: 0 / major: 0 / minor: 0
