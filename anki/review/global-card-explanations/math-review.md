# 独立数理査読：カード説明改善（31〜43）

- reviewer_id: global_explanation_math_review
- reviewed_at: 2026-08-22T07:25:55+09:00
- scope: `anki/cards/31_asymptotic_estimation.md` から `anki/cards/43_regression_multivariate.md` までの13ファイル、589枚
- result: fatal: 0 / major: 4 / minor: 0

## 査読方法

`git diff` と `HEAD` のカードをID単位で対応付け、全589枚について、元の本文行の保持、節順序、節の重複、追加した用語定義、区分ラベル、`解答で用いる式` の複製元、数式区切りを確認した。追加された `解答で用いる式` は372枚すべてで現在の答え中の式と空白を除いて一致し、同一カード内に問題・用語・公式・答え・複製式の重複見出しはなかった。

## 初回指摘

### M1 [major] 55枚で既存の「一手」が削除され、導出の入口が失われている

追加された「まず上の公式で各記号を対応させ、問題の値を代入して順に計算する。」等は一般的な案内であり、削除された一手が示していたカード固有の変形・着眼点を代替していない。これは今回の目的である「式がどこから来たかを追えるようにする」に反する。各カードで旧「一手」を、答えの冒頭または公式直後の「導出方針」として復元すること。単に `## 一手` 見出しを戻す必要はないが、内容は失わないこと。

対象カード：

- `31_asymptotic_estimation.md`（18枚）: `asym-mle-poisson-tail-probability`, `asym-mle-exponential-rate-numeric`, `asym-mle-normal-variance-known-mean`, `asym-delta-exponential-mean`, `asym-delta-bernoulli-odds`, `asym-delta-arcsine-proportion`, `asym-delta-two-sample-log-risk-ratio`, `asym-delta-normal-standard-deviation`, `asym-exponential-mean-tail`, `asym-poisson-mle-numeric`, `asym-exponential-rate-mle`, `asym-logit-proportion-delta`, `asym-ratio-two-means-delta`, `asym-second-order-delta-square`, `asym-sample-variance-fourth-moment`, `asym-exponential-sample-median`, `asym-bernoulli-plugin-se`, `asym-uniform-moment-estimator`
- `32_interval_estimation.md`（3枚）: `ci-poisson-rate-exact`, `ci-clopper-pearson-zero-success`, `ci-paired-mean-difference`
- `33_mathstat_selected_problems.md`（15枚）: `mathstat-mean-residual-life`, `mathstat-binomial-beta-tail`, `mathstat-poisson-gamma-tail`, `mathstat-total-covariance`, `mathstat-poisson-conditioned-multinomial`, `mathstat-exponential-spacings`, `mathstat-empirical-cdf-pointwise-clt`, `mathstat-inverse-variance-weighting`, `mathstat-gamma-poisson-posterior`, `mathstat-exact-poisson-rate-test`, `mathstat-mcnemar-exact-test`, `mathstat-p-value-uniformity`, `mathstat-shortest-probability-interval`, `mathstat-fisher-z-confidence-interval`, `mathstat-uniform-endpoint-shortest-ci`
- `34_testing_foundations_derivation.md`（12枚）: `test-null-alternative-definition`, `test-critical-region-size`, `test-level-versus-size`, `test-power-function-definition`, `test-power-normal-one-sided`, `test-function-randomized-definition`, `test-standardized-effect-power`, `test-np-normal-mean`, `test-karlin-rubin-principle`, `test-ump-normal-one-sided`, `test-glrt-normal-mean-known-variance`, `test-score-bernoulli-numeric`
- `35_normal_various_tests.md`（7枚）: `test-normal-z-one-sided-numeric`, `test-normal-t-numeric`, `test-pooled-two-sample-t-numeric`, `test-normal-variance-ratio-numeric`, `test-two-proportion-numeric`, `test-goodness-fit-numeric`, `test-independence-2x2-numeric`

具体例として `test-sample-size-power-z` も、「検出力式を $n$ について解くと」とだけ書いて最終式へ飛んでいる。公式の提示・複製だけでは、正規分位点を用いる反転過程は読者に追えない。少なくとも

$$
1-\beta=1-\Phi\left(z_\alpha-\frac{\sqrt n\delta}{\sigma}\right)
$$

から

$$
\Phi\left(z_\alpha-\frac{\sqrt n\delta}{\sigma}\right)=\beta,
\quad
z_\alpha-\frac{\sqrt n\delta}{\sigma}=-z_\beta
$$

を経て標本サイズ式に至る過程を示すべきである。

### M2 [major] MCMC文脈の `MH` をMantel–Haenszel法と誤定義している

対象カード：`sim-mh-algorithm`, `sim-mh-numeric`, `sim-random-walk-mh`, `sim-mcmc-convergence-conditions`

これらの `MH` は Metropolis–Hastings 法であり、Mantel–Haenszel法ではない。提案分布、受理確率、ランダムウォーク、MCMC収束を扱う文脈なので解釈の余地はない。

修正案：4枚の用語欄を `MH：Metropolis–Hastings（メトロポリス・ヘイスティングス）法` とする。分割表の `MH` だけをMantel–Haenszel法とする。

### M3 [major] `ci-t-interval-pivot` の公式欄に壊れた関係記号がある

現在の式末尾は

$$
\frac{\overline X-\mu}{S/\sqrt n}sim t_{n-1}
$$

となっており、`\sim` のバックスラッシュが欠けている。KaTeXは `sim` を変数文字列として解釈するため機械検証を通るが、数理記法として誤りである。答え側の式は正しい。

修正案：公式欄を

$$
\frac{\overline X-\mu}{S/\sqrt n}\sim t_{n-1}
$$

とする。またこの欄は、正規・カイ二乗分布と独立性という定理、およびt分布の定義を併用しているため、区分を単なる「定義」ではなく「定理・定義」とする。

### M4 [major] 定義・定理・公式の区分が複数カードで内容と一致しない

今回の変更目的が区分の明示であるため、誤ラベルは単なる表記差ではない。少なくとも次を修正すること。

- `test-statistic-definition`: 検定統計量の定義を扱うため「公式」ではなく「定義」。
- `test-type-errors-definition`: 第一種・第二種過誤の条件付き確率は定義なので「定義」。
- `test-function-randomized-definition`: 検定関数と無作為化確率は定義なので「定義」。
- `anova-contrast-definition`: 係数和0は対比の定義なので「定義」。
- `anova-interaction-definition`: 差の差による交互作用の表現を定義として導入しているため「定義」または「定義・公式」。
- `bayes-hierarchical-definition`: 階層モデルの因子分解はモデルの定義なので「定義」。
- `sampling-ht-definition`: Horvitz–Thompson推定量そのものを導入する式なので「定義」。
- `sampling-srs-definition`: 単純無作為抽出と包含確率の定義なので「定義」。
- `glm-deviance-definition`: 逸脱度の式は定義なので「定義」。
- `test-paired-t-numeric`: 数値検定統計量と右片側P値を使う計算カードであり「定義」ではなく「公式」。
- `test-score-observed-expected-information`: 掲載しているスコア統計量の漸近正規性は定義ではなく定理。一方、期待情報量と観測情報量の式は定義なので「定理・定義」とする。
- `reg-hat-matrix-properties`: $H$ の式は定義だが、対称性・冪等性と直交射影の性質も用いるため「定義・定理」とする。

## 数式・構造の確認結果

- 13ファイルのカード数は順に45, 34, 15, 53, 51, 74, 51, 25, 37, 45, 42, 44, 73で、合計589枚。
- HEADとの行単位比較では、元の答え・計算例・注意・公式の内容は上記M1の55件を除き保持されていた。表示数式からインライン数式への変更は一部あるが、式内容の欠落はなかった。
- `解答で用いる式` を持つ372枚では、複製式はすべて答え中の式と空白を除いて完全一致した。
- `問題 -> 記号・用語（存在時） -> 使用公式・定理 -> 答え` の順序違反は0件。
- 同一カード内の対象見出し・区分ラベル・`解答で用いる式` の重複は0件。
- 追加用語の一般的定義は、M2の `MH` 4件を除いて文脈上の明確な誤りを認めなかった。

## 機械検証

- `npm run anki:validate`: 成功。1055 cards、0 warnings。配信HTMLのbuild/checkも成功。
- `npm run validate`: 成功。構造検証、351 MarkdownファイルのKaTeX strict検証、テキスト検証がすべて成功。
- 注記：M3の `sim` はKaTeX上で英字の積として構文解析できるため、機械検証成功は数理記法の正しさを保証しない。

## 修正確認

初回の問題を生じさせた一括変換を撤回した版について、同じ13ファイル・589枚と `anki/scripts/improve_card_explanations.mjs` を全文再査読した。

- M1: 解消。HEADに存在した55枚の `## 一手` 本文は全件保持され、公式欄の前へ移る逆転もない。汎用方針文と答え式の機械的複製は撤回された。
- M2: 解消。シミュレーションの `MH` は Metropolis–Hastings法と定義され、スクリプトもMCMC・Metropolis文脈と分割表文脈を分ける。
- M3: 解消。`ci-t-interval-pivot` は `\sim t_{n-1}` となり、正規標本での正規統計量・カイ二乗統計量の独立性からt分布へ至る式が正しい。
- M4: 解消。機械的な区分ラベルを廃止し、各 `## 使用公式・定理` の冒頭で「解答で使う定義・公式・定理と、その適用条件」を置く欄であることを明示した。これにより、定義式を一律に公式と誤分類する問題はない。

再査読中に検出した残存事項も修正確認した。

- `test-sample-size-power-z`: 上側点 $z_q$ を定義し、必要検出力の不等式から $\Phi(A)\le\beta$、$A\le-z_\beta$、標本サイズ下限へ至る変形が順に示されている。
- `inc-ipw-mean`: MAR条件 $P(R_i=1\mid Y_i,X_i)=P(R_i=1\mid X_i)=\pi_i>0$ とpositivityを明示し、条件付き期待値の各等号が正当である。
- `asym-mle-poisson-tail-probability`: `\widehat\theta_{\mathrm{ML}}` の添字が正しい。
- `sampling-neyman-allocation`: 目的関数、標本数制約、Lagrange関数、偏微分、比例関係、制約への代入が連続している。
- `ci-variance-chi-calc`, `mathstat-uniform-endpoint-shortest-ci`, `sim-importance-numeric`, `glm-irls-update` などの個別補強は、分位点規約、制約付き最短化、測度変換、Fisher scoringからIRLSへの接続を正しく示している。

構造照合の最終結果は、カード589枚、既存一手の欠落0件、指定節順の違反0件、対象見出しの重複0件である。スクリプトは既存の記号・用語欄を上書きせず、既存の一手・方針を保持し、再実行時に役割文を重複させない。

## 最終再査読

- final_reviewer_id: global_explanation_math_review
- final_reviewed_at: 2026-08-22T07:41:13+09:00
- final_result: fatal: 0 / major: 0 / minor: 0
- `npm run anki:validate`: 成功。1055 cards、0 warnings。配信HTMLのbuild/checkも成功。
- `npm run validate`: 成功。構造検証、353 MarkdownファイルのKaTeX strict検証、237生成対象テキストの検証がすべて成功。
