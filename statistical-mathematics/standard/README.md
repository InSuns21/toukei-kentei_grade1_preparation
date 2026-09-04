# Standard 32 実装順

Standard層の大問を1題1ファイルで管理する。各題は「問題・詳細解答・本番答案・20点採点基準」を含む。ファイル先頭の番号は正式100大問の旧No.で、見出し中の Standard No. は層内の実装順である。

## 記述品質の基準

Standard は難度・演習価値の層を表すものであり、**解説を省略してよい層ではない**。詳細解答の粒度は Core と同じ基準に揃える。

- 問題文だけで分布・母数化・支持が判別できるようにする。密度・確率質量関数・累積分布関数を計算に直接使う問題では、原則として式と支持を問題文に書く。
- `Exp(λ)` の rate / scale、ワイブル・パレートなど母数化に流儀がある分布は必ず式を明示する。標準正規・一様分布のような既知分布でも、その密度が直後の計算の出発点になる場合は式を併記する。
- 「公式より」で主要部分を飛ばさない。公式自体が論点でない場合でも、どの定義・定理から出るかを1段は示す。
- 変数変換では逆変換・Jacobian・支持の変化を、条件付き分布では条件付き密度の定義・正規化定数・支持を示す。
- 漸近定理・検定公式を使う場合は、少なくとも本問で重要な適用条件を確認する。
- 独立性・対称性・指示変数の性質などで項が消える場合は、「何が0だから消えるか」を明記する。
- 詳細解答は学習用、本番答案は圧縮版と役割を分ける。本番答案の短さを詳細解答へ持ち込まない。

この基準は `statistical-mathematics/core/` の記述粒度を基準とする。

| 実装順 | 100 No. | 演習価値 | 難度 | 主題 |
| ---: | ---: | :---: | :---: | --- |
| 01 | 11 | A | A | [二変量一様分布・条件付き分布・幾何確率](11_bivariate_uniform_conditional_geometry.md) |
| 02 | 12 | A | A | [カイ二乗・コーシー・逆関数法](12_chisq_cauchy_inverse_transform.md) |
| 03 | 13 | A | A | [指数分布モーメント母関数・指数傾斜](13_exponential_mgf_tilting.md) |
| 04 | 14 | A | A | [標本中心モーメント・不偏補正](14_sample_central_moments.md) |
| 05 | 15 | A | A | [標本平均の歪度・尖度](15_sample_mean_skewness_kurtosis.md) |
| 06 | 16 | B | B | [依存する一様分布・無相関](16_dependent_uniform_uncorrelated.md) |
| 07 | 19 | A | A | [経験分布・tail integral・混合重尾](19_empirical_distribution_tail_mixture.md) |
| 08 | 20 | A | A | [最大順序統計量・極値極限](20_max_order_extreme_limit.md) |
| 09 | 21 | A | A | [多項分布・分散共分散行列・多変量中心極限定理](21_multinomial_covariance_mvn_clt.md) |
| 10 | 22 | A | A | [階層ベルヌーイ・全分散・級内相関](22_hierarchical_bernoulli_icc.md) |
| 11 | 29 | A | A | [二値化正規・相関減衰](29_dichotomized_normal_correlation.md) |
| 12 | 32 | A | A | [不均一分散Gaussian bridge](32_heteroscedastic_gaussian_bridge.md) |
| 13 | 36 | A | A | [ノイズ付き線形観測の条件付き正規](36_noisy_linear_conditional_normal.md) |
| 14 | 47 | A | A | [二項比率ワルド区間・被覆確率](47_binomial_wald_coverage.md) |
| 15 | 50 | A | A | [二項2母数モーメント法・識別](50_two_parameter_binomial_moments.md) |
| 16 | 52 | A | A | [パレート最尤推定量・有限標本バイアス・効率](52_pareto_mle_bias_efficiency.md) |
| 17 | 54 | A | A | [一様分布最大値・不偏推定・分散比較](54_uniform_max_unbiased_variance.md) |
| 18 | 56 | A | A | [超幾何分布・有限母集団補正](56_hypergeometric_fpc.md) |
| 19 | 58 | A | A | [層化抽出・Horvitz–Thompson・Neyman配分](58_stratified_ht_neyman_allocation.md) |
| 20 | 60 | A | A | [右打切り指数寿命・観測尤度](60_right_censored_exponential.md) |
| 21 | 67 | A | A | [順序統計量で棄却域を設計](67_order_statistic_rejection_region.md) |
| 22 | 68 | A | A | [適合度尤度比検定・Pearson・自由度](68_gof_lrt_pearson.md) |
| 23 | 73 | A | A | [母相関係数・フィッシャー z変換](73_correlation_fisher_z.md) |
| 24 | 74 | A | A | [Wilcoxon順位和・並べ替え検定](74_wilcoxon_permutation.md) |
| 25 | 82 | A | A | [共分散分析・調整済み処置効果](82_ancova_adjusted_effect.md) |
| 26 | 83 | A | A | [Bonferroni・Scheffe多重比較](83_bonferroni_scheffe.md) |
| 27 | 84 | A | A | [偏決定係数・追加平方和](84_partial_r2_extra_ss.md) |
| 28 | 85 | A | A | [対数回帰・残差診断](85_log_regression_residuals.md) |
| 29 | 86 | B | B | [2変量正規・平均への回帰](86_bivariate_normal_regression_to_mean.md) |
| 30 | 89 | A | B | [稀事象・相対Monte Carlo誤差](89_rare_event_relative_mc_error.md) |
| 31 | 91 | A | A | [Box–Muller変換](91_box_muller.md) |
| 32 | 96 | A | A | [ワイブル・生存関数・ハザード](96_weibull_survival_hazard.md) |

**Standard 32: 32 / 32 実装済み。**
