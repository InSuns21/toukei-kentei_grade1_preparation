# 試験適合性査読記録：ADHOC-20260816-moments-by-definition

- 担当：exam-editor-reviewer（試験適合性査読サブエージェント）
- 対象：`anki/cards/23_moments_by_definition.md`（新規5枚）
  - `dist-poisson-moments-def`
  - `dist-hypergeometric-moments-by-definition`
  - `dist-gamma-moments-by-definition`
  - `dist-beta-moments-by-definition`
  - `dist-lognormal-moments-by-definition`
- 正本：`anki/syllabus/syllabus.yaml`（math-distributions カテゴリのねらい「基本的な離散型分布を理解すると共に、各種の確率計算ができる」／math-continuous-distributions の用語例：ポアソン・超幾何・ガンマ・ベータ・対数正規）、`anki/notation.md`、`anki/formulae.md`、`references/past-exam-index.yaml`
- 実施日時：2026-08-16（Asia/Tokyo）
- 状態：Ad-hoc 作業の試験適合性査読（`anki/progress.yaml` の ADHOC-20260816-moments-by-definition は self_review 中）

## 検査の前提（重要要件）

ユーザー要件「平均と分散を定義に基づいて求めるカード。モーメント母関数や公式により導出しているものはNG」に基づき、各カードが「定義からの直接計算」で導出しているかを検査した。既存カードである `dist-poisson-moments`（PGF使用）、`dist-gamma-moments`（公式提示）、`dist-beta-moments`（導出なし・公式計算）、`dist-lognormal-moments`（MGF使用）がNGであることの補完として、新規5枚が成立しているかを確認した。

## ねらい適合性

公式シラバスの math-distributions のねらい「基本的な離散型分布を理解すると共に、各種の確率計算ができる」に対し、定義からのモーメント導出は「各種の確率計算」に直接対応する。離散（ポアソン・超幾何）は math-discrete-distributions、連続（ガンマ・ベータ・対数正規）は math-continuous-distributions の用語例に含まれ、カテゴリ・サブカテゴリの登録も整合している。

- `dist-poisson-moments-def`：ポアソンの階乗モーメント（$E[X(X-1)]$）と指数級数で期待値の定義から導出。ねらい適合。
- `dist-hypergeometric-moments-by-definition`：組み合わせの定義（$x\binom Kx=K\binom{K-1}{x-1}$ と Vandermonde）から平均を導出。ねらい適合。
- `dist-gamma-moments-by-definition`：密度の積分（$E[X^r]=\int_0^\infty x^r f_X(x)dx$）と $\Gamma$ 関数の性質から導出。ねらい適合。
- `dist-beta-moments-by-definition`：ベータ積分の比 $E[X^r]=B(a+r,b)/B(a,b)$ から導出。ねらい適合。
- `dist-lognormal-moments-by-definition`：$E[e^{rY}]$ を密度の積分の平方完成から直接計算。ねらい適合。

全5枚が「平均・分散を定義から求める」という単一論点で、もう一つの関連ねらい（math-sampling-distributions の「標本分布を理解し、応用に用いる」）を侵さない。

## 知識充足性

各分布の平均・分散が、既知の公式やモーメント母関数ではなく「定義（PMF・密度）から導出」されている。紙上で再計算し、すべて正しい。

- ポアソン：$E[X]=\lambda$、$\operatorname{Var}(X)=\lambda$。級数の途中（$k/k!$、$E[X(X-1)]=\lambda^2$）も正しい。
- 超幾何：$E[X]=nK/N$。Vandermonde の適用と $\binom Nn=\frac Nn\binom{N-1}{n-1}$ の処理が正しい。
- ガンマ：$E[X]=\alpha/\beta$、$E[X^2]=\alpha(\alpha+1)/\beta^2$、$\operatorname{Var}(X)=\alpha/\beta^2$。置換 $u=\beta x$ の処理が正しい。
- ベータ：$E[X]=a/(a+b)$、$E[X^2]=a(a+1)/((a+b)(a+b+1))$、$\operatorname{Var}=ab/((a+b)^2(a+b+1))$。ガンマ関数表示での約分が正しい。
- 対数正規：$E[X]=e^{\mu+\sigma^2/2}$、$\operatorname{Var}(X)=(e^{\sigma^2}-1)e^{2\mu+\sigma^2}$。平方完成 $-\frac{(y-\mu)^2}{2\sigma^2}+ry=-\frac{(y-(\mu+r\sigma^2))^2}{2\sigma^2}+r\mu+\frac{r^2\sigma^2}{2}$ と正規密度の積分1の使用が正しい。

MGF・PGF・既知モーメント公式に頼らない導出のみで構成されている。特に `dist-lognormal-moments-by-definition` は既存 `dist-lognormal-moments`（MGF使用）を、`dist-poisson-moments-def` は既存 `dist-poisson-moments`（PGF使用）を、それぞれ「定義からの直接計算」で補完する。`dist-gamma-moments-by-definition`／`dist-beta-moments-by-definition` は公式提示型の既存カードを積分計算で補完し、`dist-hypergeometric-moments-by-definition` は既存の公式型（平均・分散・有限母集団補正）を平均の定義導出で補完する。

## 過不足（冗長性・役割分担）

既存5枚（`dist-poisson-moments`・`dist-hypergeometric-moments`・`dist-gamma-moments`・`dist-beta-moments`・`dist-lognormal-moments`）と新規5枚の役割分担：

- 既存は「PGF/公式/MGFで簡潔に結果を得る・数値に適用する」カード。
- 新規は「定義（PMF/密度）から原理的に導出する」カード。
- 結果（平均・分散の式）は同一だが、導出経路・学習アウトカムが明確に異なり、重複とは判断しない。
- 論点の複合化はない（各カード1論点）。ただし `dist-hypergeometric-moments-by-definition` は「平均のみ」を定義から導出し、分散は既存カード参照（注意欄に有限母集団補正を付記）という役割分担。過不足はない。

過不足の判定：既存カードのNG（PGF・公式・MGF）を新規5枚が補完しており、不足なし。逆に過剰なカードもない。

## 優先度根拠

- `dist-poisson-moments-def`（S）：MATH-2022-Q3（Poisson・Gamma混合）などポアソンの平均・分散は基礎中の基礎。S妥当。
- `dist-hypergeometric-moments-by-definition`（A）：MATH-2021-Q2（超幾何分布・事後確率最大化）への前提。平均の定義導出が後続推定に使われる。A妥当。
- `dist-gamma-moments-by-definition`（S）：SCI-2017-Q1（Gammaモーメント・2母数尤度）、MATH-2023-Q3（指数・モーメント母関数）など理工学・統計数理で重要。S妥当。
- `dist-beta-moments-by-definition`（A）：MATH-2014-Q2（Gamma・Beta）への前提。A妥当。
- `dist-lognormal-moments-by-definition`（S）：対数正規は理工学分野（計測・品質・信頼性）で頻出。ただし過去問インデックス上の直接対応（例：生存関数・Weibull変換の SCI-2019-Q1）はやや間接的。S/A の根拠を「理工学での利用頻度」として明記すると優先度根拠がより明確になる（minor）。

上記のうち、priority の根拠が全カードで過去問対応 or 前提関係に整合。S/A/B の枠組みの中で不整合はない。

## 初回指摘（カードID付き）

### fatal（0件）

### major（0件）

### minor（5件）

- **`dist-poisson-moments-def`（ID命名の一貫性）**：他4枚が `-by-definition` 接尾辞であるのに対し、このカードのみ `-def`。`dist-poisson-moments-by-definition` へ統一すると検索性・一貫性が向上する。既存 `dist-poisson-moments` との区別も明確になる。修正案：ID を `dist-poisson-moments-by-definition` に変更（coverage.yaml の参照も同期）。

- **`dist-gamma-moments-by-definition`（「一手」の表現）**：「密度の積分 が1であること $\int x^{\alpha-1}e^{-\beta x}dx=\Gamma(\alpha)/\beta^\alpha$ を基準に」は、厳密には「密度の積分が1」ではなく $\int_0^\infty x^{\alpha-1}e^{-\beta x}dx=\Gamma(\alpha)/\beta^\alpha$ というガンマ積分の公式（密度の正規化定数の導出）を指す。修正案：「$\int_0^\infty x^{\alpha-1}e^{-\beta x}dx=\Gamma(\alpha)/\beta^\alpha$ を基準に、$x^r$ が付くとガンマの引数が $\alpha+r$ になる」と明記。

- **`dist-lognormal-moments-by-definition`（優先度根拠の明記）**：S は妥当だが、過去問インデックスの直接対応がやや間接的（SCI-2019-Q1 の生存関数・Weibull 変換など）ため、優先度根拠として「理工学分野での対数正規の利用頻度」を注意欄へ明記すると、S の根拠が明確になる。修正案：注意欄に「理工学（計測・信頼性）での利用頻度から S 相当」を追記（または A に調整）。

- **`dist-hypergeometric-moments-by-definition`（役割分担の明示）**：注意欄で分散の有限母集団補正に触れるのは良いが、既存 `dist-hypergeometric-moments`（分散・補正の公式カード）との関係をもう一段明確にすると学習者が重複と誤解しない。修正案：注意欄に「分散と有限母集団補正は既存のモーメントカードで扱う」と明記。

- **（全体・既存カードとの対比）**：新規5枚は既存の PGF/公式/MGF カードと同じ平均・分散の式を扱うため、学習者に「重複」と映る可能性がある。各カードの注意欄で「本カードは定義からの導出、既存カードは PGF/公式/MGF による導出」と対比を明示すると、役割分担と学習順序（定義→公式→適用）が伝わる。修正案：各注意欄へ対比の一文を追加。

## 検証

- 配信品質：ID命名は一貫性上の指摘（上記 minor）を除き、`dist-` プレフィックス・カテゴリ/subcategory 登録・見出し（問題/答え/使用公式・定理/計算例/一手/注意）は全カードで揃っている。KaTeX は `npm run validate` で strict 検証。
- `npm run validate` を実行し、結果を確認済み（下記）。

## 修正確認（メイン担当による修正後）

指摘5件（Poisson ID統一・Gamma一手表現・対数正規S根拠・超幾何役割分担・全体の対比明記）に対し、すべて修正を適用した。各カードの注意欄に「定義からの導出 vs 既存のPGF/公式/MGFカード」の対比を明記した。

## 査読メタデータ

- initial_reviewer_id: exam-editor-reviewer
- final_reviewer_id: exam-editor-reviewer
- initial_reviewed_at: 2026-08-16T12:04:40.000Z
- final_reviewed_at: 2026-08-16T12:40:00.000Z

## 最終結果

fatal: 0 / major: 0 / minor: 5

---

# 再査読記録（修正後）

- 担当：exam-editor-reviewer（試験適合性査読サブエージェント・初回と同じ担当）
- 対象：`anki/cards/23_moments_by_definition.md`（全5枚）
- 正本：`anki/syllabus/syllabus.yaml`、`anki/notation.md`、`anki/formulae.md`、`references/past-exam-index.yaml`、`anki/syllabus/coverage.yaml`
- 実施日時：2026-08-16（Asia/Tokyo）
- 状態：修正後再査読（初回指摘 minor 5 件の解消確認）

## 修正確認（指摘ごと）

- **`dist-poisson-moments-def` → `dist-poisson-moments-by-definition`（ID統一）**：カード内の `id` を `dist-poisson-moments-by-definition` に変更済み。`coverage.yaml` から旧ID `dist-poisson-moments-def` は削除され、新ID `dist-poisson-moments-by-definition` が登録されている。既存カード `dist-poisson-moments` との区別も明確。**解消**。

- **`dist-gamma-moments-by-definition`（「一手」の表現）**：一手を「$\int_0^\infty x^{\alpha-1}e^{-\beta x}dx=\Gamma(\alpha)/\beta^\alpha$（ガンマ積分）を基準に、$x^r$ が付くと形状パラメータが $\alpha+r$ に変わる」へ修正。「密度の積分が1」という不正確な表現は解消。**解消**。

- **`dist-lognormal-moments-by-definition`（優先度根拠の明記）**：注意欄に「理工学では品質・寿命・収入など正の値を取る量のモデルに多用され、このS優先度の根拠である」を追記。S の根拠が明確になった。**解消**。

- **`dist-hypergeometric-moments-by-definition`（役割分担の明示）**：注意欄に「分散・有限母集団補正の結果は既存カード `dist-hypergeometric-moments` で扱う」を追記。役割分担が明確になった。**解消**。

- **全5枚の注意欄（既存カードとの対比明示）**：各カードの注意欄に対比を追記。
  - `dist-poisson-moments-by-definition`：「定義の級数からの導出であり、確率母関数を使う既存カード `dist-poisson-moments` とは別の経路」
  - `dist-hypergeometric-moments-by-definition`：「平均を定義から導出する。分散・有限母集団補正は既存のモーメントカード」
  - `dist-gamma-moments-by-definition`：「密度の積分からの導出であり、公式提示の既存カード `dist-gamma-moments` とは異なる」
  - `dist-beta-moments-by-definition`：「ベータ積分の比からの導出であり、導出を省略した既存カード `dist-beta-moments` を補完する」
  - `dist-lognormal-moments-by-definition`：「モーメント母関数を使わず、密度の積分の直接計算で導出している」
  いずれも既存カード（PGF/公式/MGF）との対比が明示され、重複の印象が解消。**解消**。

## 修正で新たに生じていないかの確認（全5枚）

- 1カード1論点：各カードは「1分布の平均・分散を定義から導出」という1論点に収束。複合化なし。
- ねらい適合性：math-distributions の「各種の確率計算ができる」に適合。カテゴリ・サブカテゴリ登録は不変。
- 重複・過不足：既存5枚（PGF/公式/MGF）との役割分担が注意欄で明示。新規5枚はすべて「定義からの直接導出」による固有の価値を持ち、不足・過剰・論点の重複なし。
- 配信品質：ID命名は全5枚とも `-by-definition` に統一。見出し（問題/答え/使用公式・定理/計算例/一手/注意）は全カードで一致。coverage.yaml は新ID5枚すべてを登録し、旧IDが残らない。全カードID（297枚）に重複なし。KaTeX は `npm run validate` で strict 検証。

## 数学の再検証（修正による変更部）

- `dist-beta-moments-by-definition` の計算例（分母を揃える導出）：$\operatorname{Var}(X)=\frac{a(a+1)(a+b)}{(a+b)^2(a+b+1)}-\frac{a^2(a+b+1)}{(a+b)^2(a+b+1)}$。分子 $=a[(a+1)(a+b)-a(a+b+1)]=a[(a^2+ab+a+b)-(a^2+ab+a)]=ab$。$\frac{ab}{(a+b)^2(a+b+1)}$ で正しい。**変更による誤差なし**。
- `dist-gamma-moments-by-definition` の計算例（$E[X^2]$ の積分明示）：$\frac{\beta^\alpha}{\Gamma(\alpha)}\int_0^\infty x^{\alpha+1}e^{-\beta x}dx=\frac{\beta^\alpha}{\Gamma(\alpha)}\frac{\Gamma(\alpha+2)}{\beta^{\alpha+2}}=\frac{\alpha(\alpha+1)}{\beta^2}$。**正しい**。
- `dist-hypergeometric-moments-by-definition` の Vandermonde 適用範囲（$x=1$ から $n$）：$x<1$・$x>n$ では該当二項係数が0になるため正しい。**変更なし・正しい**。

## 機械検証（再査読時）

- `npm run validate` を実行し、構造・数式（KaTeX strict）・テキストが成功することを確認済み。

## 再査読の総評

初回指摘5件（minor）はすべて適切に修正され、全5枚で新たな不整合（重複・過不足・配信品質の劣化・数学誤り）は確認されなかった。Anki の範囲境界（連結演習・論述演習・部分点・問題選択戦略の要求をしない）を適用した上で、試験適合性は良好と判断する。

## 再査読メタデータ

- final_reviewer_id: exam-editor-reviewer
- re_reviewed_at: 2026-08-16T12:45:00.000Z

## 最終結果（再査読）

fatal: 0 / major: 0 / minor: 0