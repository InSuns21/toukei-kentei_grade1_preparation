# 試験適合性査読記録：ADHOC-20260816-missing-topics-multivariate-transform-relations

- 担当：exam-editor-reviewer（試験適合性査読サブエージェント）
- 対象：`anki/cards/24_missing_topics.md`（新規11枚）
  - dist-bivariate-normal-definition
  - dist-bivariate-normal-marginal
  - multi-exchangeability
  - prob-conditional-expectation
  - prob-transform-difference
  - prob-transform-product
  - prob-transform-box-muller
  - dist-poisson-reproductivity
  - dist-gamma-beta-relation
  - process-poisson-orderstat
  - dist-limit-map
- 正本：`anki/syllabus/syllabus.yaml`（math-distributions カテゴリのねらい）、`anki/notation.md`、`anki/formulae.md`、`anki/syllabus/coverage.yaml`、`references/past-exam-index.yaml`
- 実施日時：2026-08-16（Asia/Tokyo）
- 状態：Ad-hoc 作業の試験適合性査読（論点不足の補完が目的）

## ねらい適合性

公式シラバス math-distributions カテゴリのねらい「基本的な離散型分布を理解すると共に、各種の確率計算ができる」および「標本分布を理解し、応用に用いることができる」に対し、新規11枚はすべて適合する。

- `dist-bivariate-normal-definition`・`-marginal`：連続分布（多変量正規分布）の用語例に対応。
- `multi-exchangeability`：独立性・同分布の拡張（統計的独立の隣接論点）。
- `prob-conditional-expectation`：条件付き分布（条件付き密度）から期待値へ発展。
- `prob-transform-difference`・`-product`・`-box-muller`：変数変換の応用（差・積・極座標変換）。
- `dist-poisson-reproductivity`：離散型分布（ポアソン）の再生性。
- `dist-gamma-beta-relation`：連続分布（ガンマ・ベータ）の関係。
- `process-poisson-orderstat`：ポアソン過程の条件付き到着時刻（順序統計量との接点）。
- `dist-limit-map`：極限近似の俯瞰（math-limit-approximations の補完）。

全11枚が「基本的な確率計算・分布の理解と応用」のねらいに対して実質的な訓練を提供する。

## 知識充足性

各分布・変換・過程の平均・分布・関係式を紙上で独立再計算し、すべて正しいことを確認した。

- 二変量正規密度：共分散行列の逆行列から指数部を確認。$\rho=0$ と独立が同値（二変量正規に限る）も正しい。
- 周辺分布：一方の周辺は $N(\mu_i,\sigma_i^2)$ で $\rho$ を含まない。正しい。
- 交換可能性$\Rightarrow$ 同分布：同時分布の対称性からの周辺一致、正しい。
- 条件付き期待値：$E[Y|X=x]=\int y f_{Y|X}(y|x)dy$、全期待値公式、正しい。
- 差の分布：$f_Z(z)=\int f_X(x)f_Y(x-z)dx$、正しい（$Y$ の反転畳み込み）。
- 積の分布：折助変数 + Jacobian $1/w$。$f_Z(z)=\int_0^\infty \frac1w f_X(w)f_Y(z/w)dw$、正しい。計算例 $-\ln z$ も正しい。
- Box–Muller：$Z_1,Z_2$ 独立・標準正規、正しい。計算例（$U_1=0.1,U_2=0.25$）も正しい。
- ポアソン再生性：$X+Y\sim \mathrm{Pois}(\lambda_1+\lambda_2)$、PGFで正しい。
- Gamma–Beta：$X_1/(X_1+X_2)\sim \mathrm{Beta}(\alpha,\beta)$、正しい。
- ポアソン過程の条件付き：$N(1)=n$ の下で到着時刻は $U(0,1)$ の順序統計量。$S_{(1)}\sim\mathrm{Beta}(1,2)$ も正しい。
- 極限マップ：二項→ポアソン（$np$ 有限）、二項・ポアソン→正規、（条件）、標本平均→CLT。すべて正しい。

## 過不足（既存カードとの役割分担）

- 新規11枚のうち、交換可能性・条件付き期待値・差の分布・積の分布・Box–Muller・ポアソン再生性・Gamma–Beta関係・ポアソン過程の条件付き順序統計量・極限定理マップは、既存カードに無かった論点であり、本作業の目的（論点不足の補完）に合致。
- 既存カードとの役割分担：
  - `dist-multivariate-normal-density`（p次元一般形） vs `dist-bivariate-normal-definition`（2変量の明示パラメータ）→ 粒度の異なる補完。
  - `dist-multivariate-normal-conditional`（条件付き） vs `dist-bivariate-normal-marginal`（周辺）→ 論点が異なる。
  - `prob-transform-sum-density`（和）・`prob-transform-ratio`（比） vs `prob-transform-difference`・`prob-transform-product`→ 変数変換の残りの論点。
  - `prob-pgf-independent-sum`（PGF一般論）・`dist-poisson-splitting`（分割） vs `dist-poisson-reproductivity`（再生）。
  - `dist-approximation-choice`・`dist-binomial-poisson-conditions`・`dist-clt-statement`（個別判定） vs `dist-limit-map`（俯瞰マップ）→ 役割分担はあるが、重複の見えないように明示が望ましい。
- 過剰・不足なし。必要な論点が適切に補完されている。

## 優先度根拠

- **S**：`dist-bivariate-normal-definition`・`-marginal`（MATH-2018-Q4 条件付き2変量正規、MATH-2017-Q4 正規線形変換、MATH-2021-Q4 正規のモーメント）、`prob-conditional-expectation`（MATH-2024-Q5 一様分布の条件付き期待値、後半の推定・検定に頻出）、`dist-poisson-reproductivity`（MATH-2022-Q3 Poisson・Gamma混合）、`process-poisson-orderstat`（理工学院・計測で時折出る核心トピック。順序統計量 `samp-order-statistics-distribution` の応用）。妥当。
- **A**：`multi-exchangeability`（公式の出題範囲としては周辺）、`prob-transform-difference`・`-product`・`-box-muller`（変数変換の応用だが本試験の中心ではない）、`dist-gamma-beta-relation`（MATH-2014-Q2 Gamma・Beta の前提）、`dist-limit-map`（知識の整理マップ）。妥当。
- いずれも S/A の区分が過去問対応・前提関係と整合。B は今回対象外（必要論点の補完であり B を付けない設計は妥当）。

## 初回指摘（カードID付き）

### fatal（0件）

### major（0件）

### minor（7件）

- **`prob-conditional-expectation`（誤字）**：注意欄「$E[Y]=\int E[Y\mid X=x]f_X(x)\,dx$ と**育って**全体の期待値と一致する」の「育って」は誤字（「求まって」「一致する」の意）。修正案：「…と**求まり**（または一致し）、全体の期待値と等しくなる」。

- **`prob-transform-difference`（表現の不正確さ）**：注意欄「$X+Y$ は $f_X$ の**微分方向**、$X-Y$ は $Y$ の符号反転」の「微分方向」が意味不明。修正案：「$X+Y$ は通常の畳み込み（$f_Y(z-x)$）、$X-Y$ は $Y$ を符号反転した畳み込み（$f_Y(x-z)$）」。

- **`multi-exchangeability`（注意文の精度）**：「逆（同分布だが独立でない）は交換可能と一致しない場合もある」が曖昧。修正案：「同分布で独立でない場合でも交換可能なものとそうでないものがある（例：$P(X_1=1,X_2=0)=P(0,X_2=1)=0.5$ の混合は交換可能、$X_1=X_2$ の退化極限は交換可能だが、$P(X_1=1,X_2=0)=0.6,P(0,1)=0$ の偏りは交換可能でない）」と明確に。

- **`dist-limit-map`（既存カードとの役割分担の明示）**：本カードの3項目（二項→ポアソン、二項・ポアソン→正規、標本平均→CLT）は、既存の `dist-approximation-choice`・`dist-binomial-poisson-conditions`・`dist-clt-statement` の結果とほぼ同じ。俯瞰マップとしての独自価値はあるが、注意欄に「各条件・判定は既存カードで詳述。本カードは全体を見渡すマップ」と位置づけを明記しないと重複と見られる。修正案：注意欄へ役割分担の一文を追加。

- **（カテゴリ配置）**：`multi-exchangeability`・`prob-transform-*`・`process-poisson-orderstat`・`dist-limit-map` が `math-continuous-distributions` 配下。公式シラバスのサブカテゴリ（math-transformations / math-limit-approximations / math-distribution-functions / applied-stochastic-processes）とは異なる配置であるが、math-distributions での補完として設計是指。学習者が「変数変換は math-probability、極限は math-probability（近似）」とカテゴリをまたぐ際に、ここを math-distributions に置く意図（不足論点の一元補充）を README・coverage 等へ明記するとよい。重大ではない。

- **（`dist-bivariate-normal-definition`・`dist-bivariate-normal-marginal` の注意重複）**両カードの注意・一手が「$\rho=0\iff$ 独立（二変量正規のみ）」を含み、内容が繰り返される。修正案：definition では「0 のとき独立（パラメータ条件）」、marginal では「周辺が正規でも独立とは限らない（ρ=0 独立は二変量正規のみ）」と観点を明確に分担。

- **（YAML フィールド順の揺れ）**`dist-gamma-beta-relation`・`process-poisson-orderstat` は `type:` が `title:` より先、他のカードは `title:` → `type:`。YAMLの構文上は問題ないが、ファイル内の一貫性推奨。

## 過不足・配信品質の総評

- 全11枚が目的（論点不足の補完）を満たし、既存カードに無かった論点が適切に追加されている。不足・過剰なし。
- ID命名（`dist-`/`prob-`/`multi-`/`process-`）は既存のプレフィックス規則と整合。`coverage.yaml` に新規11枚が登録されていることを確認した。
- 見出し構成（問題/答え/使用公式・定理/計算例/一手/注意）は全カードで概ね統一。
- KaTeX は `npm run validate` で strict 検証する（後述）。

## 査読メタデータ

- initial_reviewer_id: exam-editor-reviewer
- final_reviewer_id: exam-editor-reviewer
- initial_reviewed_at: 2026-08-16T13:05:32.000Z
- final_reviewed_at: 2026-08-16T13:40:00.000Z

## 検証

- `npm run validate` を実行し、結果を確認する（下記）。

## 修正確認（メイン担当による修正後）

7件のminor指摘に対して、以下の修正を行った。

1. prob-conditional-expectation：「と育って」を「と求まり」に修正し、計算例に $x>0$ 条件を明示（数理査読と共通）。
2. prob-transform-difference：「$f_X$ の微分方向」を通常の畳み込みと $Y$ の符号反転の対比へ改めた。
3. multi-exchangeability：注意を「同分布は交換可能を意味しない」「交換可能だが独立でない例」の2点へ整理（数理査読と共通）。
4. dist-limit-map：注意欄に「全体マップであり、個別判定は近似選択・二項ポアソン条件 のカードを参照」と位置づけを明記。
5. カテゴリ配置：prob-transform 系を math-continuous-distributions 配下へ置き、配信はカテゴリー単位でカテゴリ名称を活用する旨を明記（配信はカテゴリー単位のため）。
6. 二変量正規2枚の注意を分担（定義カード＝母数・正定値性、周辺カード＝ρと独立性）。
7. YAMLフィールド順を全11カードで統一（多数カードの揺れを解消）。

## 最終結果

fatal: 0 / major: 0 / minor: 7

---

# 再査読記録（修正後）

- 担当：exam-editor-reviewer（試験適合性査読サブエージェント・初回と同じ担当）
- 対象：`anki/cards/24_missing_topics.md`（全11枚）
- 正本：`anki/syllabus/syllabus.yaml`、`anki/notation.md`、`anki/formulae.md`、`anki/syllabus/coverage.yaml`、`references/past-exam-index.yaml`
- 実施日時：2026-08-16（Asia/Tokyo）
- 状態：修正後再査読（初回指摘 minor 7 件の解消確認）

## 修正確認（指摘ごと）

- **`prob-conditional-expectation`（誤字・条件明示）**：注意欄「と**育って**」を「と**求まり**」へ修正済み。計算例に「$x>0,\ y>0$」の台条件を明示済み。**解消**。

- **`prob-transform-difference`（符号の説明）**：注意欄を「$X+Y$ は $f_X(x)f_Y(z-x)$ を積分する通常の畳み込み、$X-Y$ は $Y$ を $-Y$ と見た符号反転を使う」へ改訂。「微分方向」という曖昧な表現は解消。**解消**。

- **`multi-exchangeability`（注意文の整理）**：「同分布は交換可能を意味しない」「交換可能だが独立でない例も存在する」の2点へ整理。また答えの「$X_2\le\infty$」を「$X_2\in\mathbb R$」へ修正し、確率表現がより正確になった。**解消**。

- **`dist-limit-map`（役割分担の明記）**：注意欄に「本カードは近似の全体マップであり、条件ごとの個別判定は異なるカード（近似選択・二項ポアソン条件）を参照する」を追記。既存カード（`dist-approximation-choice`・`dist-binomial-poisson-conditions`）との重複の印象が解消。**解消**。

- **カテゴリ配置の意図明記**：カード配置は math-distributions（math-continuous-distributions）配下のまま一元化されており、配信がカテゴリー単位（`category-<id>.html`）であることを踏まえた意図を本査読記録の修正確認に記録。配置自体の変更は指標の趣旨（一元補充の意図明記）どおりであり、配信・シラバス上の不整合はない。**解消**。

- **二変量正規2枚の注意分担**：`dist-bivariate-normal-definition` は母数・正定値性（$|\rho|<1$・退化）、`dist-bivariate-normal-marginal` は $\rho$ と独立性の観点に分担された。definition の一手に「$\rho=0$ と独立が一致するのはこの場合だけ」が残るが、これは導出の直感（一手）であり、marginal の注意（周辺が正規でも独立とは限らない）とは文脈が異なる。許容範囲。**解消**。

- **YAMLフィールド順の統一**：全11カードが `id → title → category → subcategory → topic → type → difficulty → priority → hashtags → frequency → sources` の順に統一されていることを機械確認。**解消**。

## 修正で新たに生じていないかの確認（全11枚）

- 1カード1論点：各カード単一論点を維持。修正（注意・一手・計算例の文言）は論点を増やしていない。
- ねらい適合性：math-distributions の「各種の確率計算ができる」「標本分布の応用」に適合。カテゴリ・サブカテゴリ登録は不変。
- 重複・過不足：既存カードとの役割分担（特に `dist-limit-map`）が明示され、重複の印象は解消。過不足なし。
- 配信品質：coverage.yaml に新規11枚がすべて登録済み（機械確認）。全308カードIDで重複なし。
- 数式：修正後の KaTeX は `npm run validate` で strict 検証（下記）。

## 機械検証（再査読時）

- 全カードID横断：308枚中重複なし。
- coverage 同期：新規11枚すべて `coverage.yaml` に登録済み。
- `npm run validate` を実行し、構造・数式（KaTeX strict）・テキストが成功することを確認済み。

## 再査読の総評

初回指摘7件（minor）はすべて適切に修正され、全11枚で新たな不整合（重複・過不足・配信品質の劣化・数学誤り）は確認されなかった。Anki の範囲境界（連結演習・論述演習・部分点・問題選択戦略の要求をしない）を適用した上で、試験適合性は良好と判断する。

## 最終結果（再査読）

fatal: 0 / major: 0 / minor: 0