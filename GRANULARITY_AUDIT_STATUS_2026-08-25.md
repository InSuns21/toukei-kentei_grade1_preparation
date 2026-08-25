# 詳細解答の粒度監査ステータス 2026-08-25

## 目的

`statistical-mathematics` と `applied-rikou-80` の詳細解答について、演習価値の高い順に

1. S / A の真陽性を 0 にする
2. その後 B へ拡張する
3. 残る低優先度も同じ基準で処理する

という順序で監査する。

ここでいう **真陽性** は、機械監査が語句を拾ったこと自体ではなく、次のいずれかが実際にある場合をいう。

- 設問で「求めよ・導け・示せ」と要求した量を既知公式として置いている。
- 採点対象になり得る微分・積分・平方完成・行列計算・確率計算を非自明なまま飛ばしている。
- 定理適用が必要なのに、重要な適用条件を確認せず結果だけを使っている。
- 小問をまとめすぎた結果、どの計算がどの設問への回答か追えない。

逆に、「微分すると」「代入すると」等の語を含んでいても、その直前直後に十分な式があり再現可能なら誤検知とする。文字数だけを理由に水増ししない。

## 現在の完了条件

| 演習価値 | 未確認候補 | 未修正の真陽性 | 状態 |
| --- | ---: | ---: | --- |
| S | 0 | 0 | 完了 |
| A | 0 | 0 | 完了 |
| B | 0 | 0 | 完了 |

機械監査の候補件数そのものは 0 ではない。これは「尤度は」「微分すると」「代入すると」や、意図的に小問を結合した見出しを候補として拾うためである。品質目標は **機械候補 0** ではなく、**未確認 0 / 未修正真陽性 0** とする。

## S / A の根拠

### applied-rikou-80

- `applied-rikou-80/CORE_AUDIT_2026-08-25.md` で Core 40 題を横断監査。
- `applied-rikou-80/AUDIT_REMAINING_40_2026-08-25.md` で Standard 20 + Advanced 20 を横断監査。
- 後者では「設問で求めた対象を既知公式として先取りしていないか」を独立した監査項目として再監査済み。
- その後の粒度監査で残った候補も、問題文・詳細解答・採点基準を再確認し、真陽性だけ追加修正した。

追加修正例:

- `core/05_standardized_regression.md`: 正規方程式から標準化偏回帰係数を導出。
- `core/29_mvn_linear_transform.md`: 線形変換後の平均・共分散を成分計算まで補強。
- `core/31_oneway_anova.md`: 平方和と F 検定の計算過程を補強。
- `advanced/68_pca.md`, `standard/20_random_walk_gambler_ruin.md`, `standard/26_arma11.md` などは導出完全性監査で修正済み。

### statistical-mathematics

- `statistical-mathematics/AUDIT_REMAINING_52_2026-08-25.md` で Standard 32 + Advanced 20 を全件監査。
- `statistical-mathematics/THEOREM_APPLICATION_AUDIT_2026-08-25.md` で、定理名・必要条件・本問での条件確認・適用結果を独立に監査。
- Core を含む粒度監査の高優先候補を再確認し、真陽性を追加修正した。

追加修正例:

- `standard/11_bivariate_uniform_conditional_geometry.md`
- `standard/12_chisq_cauchy_inverse_transform.md`
- `standard/32_heteroscedastic_gaussian_bridge.md`
- `standard/36_normal_linear_observation.md`
- `standard/50_two_parameter_binomial_moments.md`
- `standard/74_wilcoxon_permutation.md`
- `standard/82_ancova_adjusted_effect.md`
- `standard/85_log_regression_residuals.md`
- `standard/89_rare_event_relative_mc_error.md`
- `standard/96_weibull_survival_hazard.md`
- `core/87_paired_binary_mcnemar.md`

## B 全件再監査

機械監査が挙げた B 候補 13 ファイルを全件確認した。

| ファイル | 判定 | 根拠 |
| --- | --- | --- |
| `statistical-mathematics/standard/86_bivariate_normal_regression_to_mean.md` | 真陽性 → 修正済み | 条件付き正規公式を丸置きしていた。標準化2変量正規密度の平方完成から条件付き分布と平均を導出する形へ修正。 |
| `applied-rikou-80/advanced/21_brownian_reflection.md` | 誤検知 | 問題文が反射原理の使用を明示し、標準Brown運動・連続性・対称性の条件確認と正規累積分布関数への変換まで記述済み。 |
| `statistical-mathematics/advanced/38_noncentral_mahalanobis.md` | 誤検知 | 白色化→独立正規成分→非心カイ二乗の定義→平均・分散の4次モーメント計算まで展開済み。 |
| `applied-rikou-80/advanced/70_whitening.md` | 誤検知 | 特性方程式、固有ベクトル正規化、固有分解、白色化共分散の行列積まで展開済み。 |
| `statistical-mathematics/advanced/69_cauchy_np_test.md` | 誤検知 | 尤度比の微分・分子整理・臨界点・Neyman–Pearson補題の条件まで記述済み。 |
| `applied-rikou-80/advanced/79_sample_size_design.md` | 誤検知 | 半幅不等式から標本数公式を導出し、有限母集団補正、平方完成、回収率まで途中式あり。 |
| `statistical-mathematics/advanced/94_control_variates.md` | 誤検知 | 分散二次式を微分し、二階微分による最小性、共分散計算、最小分散まで展開済み。 |
| `applied-rikou-80/advanced/63_cusum_ewma.md` | 誤検知 | 再帰展開、幾何級数重み、有限時点分散、定常極限まで展開済み。 |
| `applied-rikou-80/advanced/69_lda.md` | 誤検知 | Bayes則と正規密度から対数判別関数を作り、二次形式を展開して線形境界を導出済み。 |
| `applied-rikou-80/standard/10_series_parallel_reliability.md` | 誤検知 | 最小・最大寿命の事象、独立性、原因確率の密度×生存確率積分、平均の生存関数積分まで展開済み。 |
| `applied-rikou-80/advanced/11_competing_risks.md` | 誤検知 | 最小寿命、原因別積分、累積発生確率、同時密度と周辺密度の比まで展開済み。 |
| `statistical-mathematics/advanced/37_cholesky_residualization.md` | 誤検知 | 分散・3組の共分散・逆変換・$LL^T$ の成分確認まで展開済み。 |
| `statistical-mathematics/advanced/93_importance_sampling.md` | 誤検知 | 重点サンプリング恒等式、重み導出、二次モーメント、分散比較まで展開済み。 |

したがって B についても

- 未確認候補: **0**
- 未修正真陽性: **0**

とする。

## 次の段階

S / A / B が完了したため、次は C と演習価値未設定の候補を同じ基準で監査する。

CI の `audit:granularity` は引き続き非ブロッキングの候補抽出として使う。新規・修正問題で S / A / B に真陽性が再発した場合は、この台帳の完了状態を解除して再監査する。
