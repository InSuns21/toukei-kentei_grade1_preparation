# 独立数理査読記録 — ADHOC-20260817-sampling-extra

- 担当ID: independent-math-reviewer-sampling
- 査読対象: `anki/cards/27_sampling_extra.md` の新規4枚
- 実行日時: 2026-08-17
- 適用範囲: AGENTS.md「Anki作業と通常章・模試の範囲境界」を適用する。連結演習・答案圧縮・部分点指針の不在は欠陥としない。

## 査読対象カード

1. `samp-statistic-definition` (A) 統計量の定義
2. `samp-two-sample-mean-diff` (S) 2標本平均差の標本分布
3. `samp-multinomial-cell-counts` (A) 多項標本の度数分布の同時分布
4. `samp-sample-correlation-basic` (A) 標本相関係数の定義とrho=0でのt分布

## 機械検証

- `npm run validate`（validate:structure / validate:math / validate:text）: **成功**（exit 0）
- validate:math で Markdown 286ファイルを KaTeX strict で検証、エラーなし。
- validate:text で生成対象テキスト237件を検証、エラーなし。
- 数式区切り：インライン `$...$`・別行 `$$...$$` を使用し、`\(...\)`・`\[...\]`・`align`・`\label`・`\ref`・`\tag`・独自マクロは不使用。
- YAMLフロントマター：4枚すべて parse 成功。IDは全カードで重複なし。`sources` の公式シラバス topic も実在。

## 正本整合

- `anki/notation.md`: 正規分布 $N(\mu,\sigma^2)$ 第2引数は分散（カード一致）、標本平均 $n^{-1}\sum X_i$（一致）、多項分布 $\operatorname{Multinomial}(n;p_1,\ldots,p_k)$ の同時PMF $n!\prod_jp_j^{x_j}/\prod_jx_j!$・台 $x_j\ge0,\sum_jx_j=n$（一致）、相関係数 $\rho=\operatorname{Cov}/(\sigma_X\sigma_Y)$、t分布粒度 $t_{n-2}$（自由度表示一致）、不偏標本分散 $S^2$ の定義（一致）。
- `anki/syllabus/syllabus.yaml`: `math-sampling-distributions` のねらい「標本分布を理解し、応用に用いることができる」に対応。4枚とも対象サブカテゴリー配下。
- `anki/syllabus/coverage.yaml`: `math-sampling-distributions` に4カードIDが登録済み。
- `anki/progress.yaml`: `ADHOC-20260817-sampling-extra` は `status: independent_review`、`target.min/max: 4` に整合、`review_dir` 本ファイルと一致、`baseline_card_count: 315`。

## 独立再計算

### card 1 samp-statistic-definition
- 統計量の定義「観測値 $X_1,\ldots,X_n$ の関数で未知母数を含まない確率変数」は正しい。$T=T(X_1,\ldots,X_n)$。
- $\bar X=\frac1n\sum_{i=1}^nX_i$ は母数 $\mu,\sigma^2$ を含まないので統計量。正しい。
- 正規例 $N(\mu,\sigma^2)$ で $\bar X\sim N(\mu,\sigma^2/n)$ は正しい（$E[\bar X]=\mu$、$\operatorname{Var}(\bar X)=\sigma^2/n$）。
- 注意「統計量は母数を含まないが分布は母数に依存する」は本質を正確に捉える。「$\mu$ を含む $X_i-\mu$ は統計量でない」も正しい。

### card 2 samp-two-sample-mean-diff
- 独立な正規標本で $\bar X-\bar Y\sim N(\mu_1-\mu_2,\ \sigma_1^2/n_1+\sigma_2^2/n_2)$。正しい。
- $E[\bar X-\bar Y]=\mu_1-\mu_2$（線形性）、$\operatorname{Var}(\bar X-\bar Y)=\operatorname{Var}(\bar X)+\operatorname{Var}(\bar Y)=\sigma_1^2/n_1+\sigma_2^2/n_2$（独立なので共分散0 → 和）。正しい。
- 計算例 $n_1=n_2=25,\sigma_1^2=4,\sigma_2^2=9$: $4/25+9/25=13/25$。正しい。
- 注意「独立なので共分散は0、分散は和」は正しい。

### card 3 samp-multinomial-cell-counts
- 同時PMF $P(X_1=x_1,\ldots,X_d=x_d)=\frac{n!}{x_1!\cdots x_d!}p_1^{x_1}\cdots p_d^{x_d}$、台 $x_j\ge0$、$\sum_{j=1}^dx_j=n$。正しい（規範式と一致）。
- 周辺 $X_j\sim\operatorname{Binomial}(n,p_j)$、共分散が負（$\operatorname{Cov}(X_i,X_j)=-np_ip_j$ の符号）という記述は正しい。
- 計算例 $n=4,d=3,(p_1,p_2,p_3)=(0.5,0.3,0.2)$、$(x_1,x_2,x_3)=(2,1,1)$:
  - 多項係数 $4!/(2!1!1!)=24/2=12$
  - $(0.5)^2(0.3)(0.2)=0.25\times0.06=0.015$
  - $12\times0.015=0.18$。**検算一致**。

### card 4 samp-sample-correlation-basic
- 標本相関係数 $r=\dfrac{\sum(X_i-\bar X)(Y_i-\bar Y)}{\sqrt{\sum(X_i-\bar X)^2}\sqrt{\sum(Y_i-\bar Y)^2}}$、$-1\le r\le1$。正しい。
- $\rho=0$ 帰無仮説下（2変量正規標本）で $t=\dfrac{r\sqrt{n-2}}{\sqrt{1-r^2}}\sim t_{n-2}$。正しい（$|r|<1$ の範囲）。
- 計算例 $n=20,r=0.4$:
  - $r\sqrt{n-2}=0.4\sqrt{18}=0.4\times4.2426=1.6971$
  - $\sqrt{1-r^2}=\sqrt{0.84}=0.9165$
  - $t=1.6971/0.9165=1.8518\approx1.85$。**検算一致**。
- Fisher $z$ 変換 $\frac12\log\frac{1+r}{1-r}$ の記述も正しい。

## 重複・矛盾チェック

- `samp-statistic-definition`: 既存 `03_estimation.md` の「十分統計量」系カードとは別概念で、既存の「統計量の定義」カードは存在しないため重複なし。
- `samp-two-sample-mean-diff`: 既存 `samp-two-sample-pooled-variance`（等分散t検定）・`samp-welch-t`（不等分散近似）はσをSに置き換えた検定統計量であり、本カードは「平均差そのものの正確な標本分布（正規）」を与える補完的関係。重複・矛盾なし。
- `samp-sample-correlation-basic`: 既存 `prob-correlation-coefficient`（母相関係数ρ）は母集団版、本カードは標本版とその標本分布。重複・矛盾なし。
- `samp-multinomial-cell-counts`: 既存 `dist-multinomial-definition`（`20_discrete_continuous_distributions.md`）と同時PMFの数式が同一（下記 minor M2）。

## 初回指摘

### 【minor M1】日本語名優先：正規分布の初出に日本語名を欠く — `anki/cards/27_sampling_extra.md` / `samp-statistic-definition`（計算例）
- 根拠: 統計量の定義カードの計算例が記号 $N(\mu,\sigma^2)$ を単独で用い、直前に「正規分布」の日本語名を置いていない。style-guide の「日本語名優先（正規分布 $N(...)$ など）」および同一ファイル内の他カード（`samp-two-sample-mean-diff` の主文）が「正規分布 $N(\mu_1,\sigma_1^2)$」と日本語名を併記しているのと不整合。
- 独立計算: 不要（表記論点）。数値・式自体は正しい。
- 修正案: 計算例を「$X_1,\ldots,X_n\overset{\mathrm{i.i.d.}}{\sim}$ 正規分布 $N(\mu,\sigma^2)$ のとき…」のように日本語名を併記する。

### 【minor M2】多項分布の同時PMFが既存カードと重複 — `anki/cards/27_sampling_extra.md` / `samp-multinomial-cell-counts`
- 根拠: `20_discrete_continuous_distributions.md` の `dist-multinomial-definition`（$\operatorname{Multinomial}(n;p_1,\ldots,p_d)$ の同時PMF・台条件）と、本カードの答えの数式が実質同一。本カードは「多項標本の度数ベクトルの標本分布」という枠付けで区別しているが、提示されるPMF本文に差がなく、読む側の重複印象が残る。
- 独立計算: 式自体は正当（$\sum_jx_j=n$ の台・多項係数・$p_j^{x_j}$ の積で正しい）。
- 修正案: 同時PMFの導出を再掲しつつ、問題文・注意で「固定 $n$ の多項標本から得られる度数ベクトル $(X_1,\ldots,X_d)$ の標本分布そのものである」という標本分布としての解釈を明示して、`dist-multinomial-definition`（確率分布の定義）との役割分担を明確化する。既存カードとの相互参照を1行添えるのでもよい。

## 正本・シラバス・progress 整合

- 4枚とも YAML 前付が構造検証に適合し、`coverage.yaml` の `math-sampling-distributions` に登録済み。ID重複なし。
- `sources` topic はすべて公式シラバスに実在（標本分布・多項分布）。優先度 S/A は論点重要度と整合。
- `notation.md`・`syllabus.yaml` と矛盾なし。数式区切り・分布の台・母数規約・日本語名の主要規則を満たす（M1は例示部の表記のみ）。

## 最終判定（初回査読）

- fatal: 0
- major: 0
- minor: 2（M1, M2）

## 完了確認

- `npm run validate`（structure / math / text）: **成功**（exit 0）。末尾に記録する。
- M1/M2 の修正後に同一担当（independent-math-reviewer-sampling）での再査読が必要。全文再査読時に完了判定（fatal: 0 / major: 0 / minor: 0）へ更新する。

## 最終判定（単一行）

fatal: 0 / major: 0 / minor: 2

## 査読メタデータ

- initial_reviewer_id: independent-math-reviewer-sampling
- final_reviewer_id: independent-math-reviewer-sampling
- initial_reviewed_at: 2026-08-17T02:30:00.000Z
- final_reviewed_at: 2026-08-17T03:49:00.000Z

## 機械検証記録

- 実行: `npm run validate` @ 2026-08-17
- 結果: validate:structure 成功 / validate:math 成功（286ファイル）/ validate:text 成功（237件）

---

# 修正後再査読（2回目）

- 担当ID: independent-math-reviewer-sampling（初回と同一）
- 実行日時: 2026-08-17
- 対象: `anki/cards/27_sampling_extra.md` の全4枚全文再査読。旧指摘M1・M2の解消確認 + 書き換えカードの独立再計算。

## M1 解消確認

- `samp-statistic-definition` の計算例が「$X_1,\ldots,X_n\overset{\mathrm{i.i.d.}}{\sim}$ 正規分布 $N(\mu,\sigma^2)$ のとき…」となり、日本語名「正規分布」を記号 $N(\mu,\sigma^2)$ の直前に明記した。
- style-guide の日本語名優先と同一ファイル他カードの併記方式に整合。
- 結果: **指摘解消**。

## M2 解消確認

- `samp-multinomial-cell-counts` を「Pearson適合度統計量 $X^2=\sum_j(O_j-E_j)^2/E_j\ \overset{d}{\to}\ \chi^2_{d-1}$」への接続カードへ書き換え、同時PMF本文は除去。
- 観測度数 $O_j$・期待度数 $E_j=np_j$ を導入し、同時PMFの重複は消えた。
- 既存 `dist-multinomial-definition`・`dist-multinomial-moments` への相互参照を問題文と注意欄に明記し、役割分担を明示。
- 結果: **指摘解消**。

## 書き換えカードの独立再計算（samp-multinomial-cell-counts）

### 数学内容の検算
- 設定: $n=200,d=3$、帰無仮説 $p=(0.5,0.3,0.2)$、観測 $(O_1,O_2,O_3)=(94,63,43)$。期待度数 $E_j=np_j$ は $(100,60,40)$。制約検算: $\sum_jO_j=94+63+43=200=n$ ✓、$\sum_jE_j=100+60+40=200$ ✓。
- 各部分: $(94-100)^2/100=36/100=0.36$、$(63-60)^2/60=9/60=0.15$、$(43-40)^2/40=9/40=0.225$。
- 合計: $0.36+0.15+0.225=0.735$。**X²=0.735 検算一致** ✓
- 自由度: 完全指定の帰無仮説（母数未推定）では $d-1=2$。正しい。
- 漸近分布: 多項標本の観測度数に対し $X^2\overset{d}{\to}\chi^2_{d-1}$。正しい（$O_j-np_j$ たちが平均0・分散 $np_j(1-p_j)$ へ漸近正規し、$\sum_j(O_j-np_j)=0$ の1本の線形制約が自由度を1減らす）。
- 期待度数条件: $E_j=np_j$ の各セルが十分大きい（慣例5以上）旨を注意欄に明記。全セル $100,60,40\ge5$ ✓。
- $\sum_j(O_j-np_j)=0$ の制約により自由度が $d$ ではなく $d-1$ になる論理も正しい。

### 既存カードとの関係（新規重複チェック）
- 既存 `04_testing.md` の `chi-square-goodness-fit` は「内部母数を最尤推定したとき自由度 $k-1-r$」という pitfall カード。本カードは「完全指定 H0（母数未推定）で自由度 $d-1$」の標本分布フレーミングを与える theorem で、次の層（適合度検定）への橋渡し。役割・自由度の条件設定が異なり、重複・矛盾なし。
- 既存 `dist-multinomial-definition`・`dist-multinomial-moments` との同時PMF本文重複は、書き換えにより解消。

## 全文再査読（他3枚）

### card 1 samp-statistic-definition
- 定義・$\bar X$ 例・$N(\mu,\sigma^2/n)$ の標本分布・注意の「母数を含まないが分布は母数に依存」はすべて正しい。M1修正後の計算例も日本語名併記で整合。新規指摘なし。

### card 2 samp-two-sample-mean-diff
- $N(\mu_1-\mu_2,\sigma_1^2/n_1+\sigma_2^2/n_2)$。平均は差・分散は和（独立）。計算例 $4/25+9/25=13/25$。正しい。
- 注意欄に既存 `samp-two-sample-pooled-variance`・`samp-welch-t` への接続を追加（母分散未知のt検定の前提）。補完関係として妥当。新規指摘なし。

### card 4 samp-sample-correlation-basic
- $r$ の定義式・$-1\le r\le1$・$\rho=0$ で $t=r\sqrt{n-2}/\sqrt{1-r^2}\sim t_{n-2}$・計算例 $t\approx1.85$ はすべて正しい（$0.4\sqrt{18}/\sqrt{0.84}\approx1.8518$）。新規指摘なし。

## 機械検証（再査読時）

- 実行: `npm run validate` @ 2026-08-17
- 結果: validate:structure 成功 / validate:math 成功（288ファイル）/ validate:text 成功（237件）exit 0
- 数式区切り規則（インライン $...$ と別行 $...$、align・label・tag 不使用）と YAML 前付・ID 重複なしを再確認。

## 修正確認

初回指摘の M1（正規分布の日本語名併記）と M2（多項カードの重複）は、メイン担当の修正により解消したことを再査読で確認した（M1/M2 解消確認の各節を参照）。全文再査読でも新規指摘はなかった。

## 最終判定（2回目）

- fatal: 0
- major: 0
- minor: 0（初回2件の minor はすべて解消。全文再査読で新規指摘なし）

## 最終判定（単一行）

fatal: 0 / major: 0 / minor: 0

## 査読メタデータ（更新）

- initial_reviewer_id: independent-math-reviewer-sampling
- final_reviewer_id: independent-math-reviewer-sampling
- initial_reviewed_at: 2026-08-17T02:30:00.000Z
- final_reviewed_at: 2026-08-17T03:10:00.000Z
