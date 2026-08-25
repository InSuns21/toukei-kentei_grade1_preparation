# 統計検定1級 統計数理 100大問 — 正式演習目次

演習の正本を `core/` / `standard/` / `advanced/` の3階層、1題1ファイルに統一した正式目次。100 No. は従来の100大問No.、実装順は各層内の学習順を表す。

## Core 48

| 実装順 | 100 No. | 演習価値 | 難度 | 主題 | 手計算監査 |
| ---: | ---: | :---: | :---: | --- | --- |
| 01 | 40 | S | A | [Fisher情報量・Delta法・最尤推定量の漸近効率](core/40_fisher_information_delta_mle_efficiency.md) | ◎ |
| 02 | 70 | S | S | [Bernoulliモデルで尤度比検定・Wald・Scoreを比較する](core/70_bernoulli_lrt_wald_score.md) | ◎・修正済（対数の数値評価不要） |
| 03 | 63 | S | A | [Neyman–Pearson・単調尤度比・一様最強力検定](core/63_neyman_pearson_ump.md) | 表 |
| 04 | 41 | S | A | [一様分布の完備十分統計量・Lehmann–Scheffé](core/41_uniform_complete_sufficient_umvu.md) | ◎ |
| 05 | 55 | S | A | [指数分布の十分性・完備性・一様最小分散不偏推定量](core/55_exponential_complete_sufficient_umvu.md) | ◎ |
| 06 | 42 | S | A | [Cramér–Rao下限・効率性](core/42_cramer_rao_efficiency.md) | ◎ |
| 07 | 25 | S | S | [多変量正規の線形変換・独立・残差化](core/25_mvn_linear_transform_residual.md) | ◎ |
| 08 | 26 | S | S | [条件付き正規・偏相関・条件付き独立](core/26_conditional_normal_partial_correlation.md) | ◎ |
| 09 | 62 | S | S | [多項分布尤度比検定とPearson適合度](core/62_multinomial_lrt_pearson.md) | ◎・修正済（対数は数値化不要） |
| 10 | 78 | S | A | [Gauss–Markov・最良線形不偏推定量](core/78_gauss_markov_blue.md) | ◎ |
| 11 | 80 | S | S | [一般線形仮説・partial F](core/80_general_linear_hypothesis_partial_f.md) | ○ |
| 12 | 75 | S | A | [回帰係数の最尤推定量・Fisher情報・検定・検出力](core/75_regression_mle_fisher_power.md) | 表・修正済（累積分布関数の数値評価不要） |
| 13 | 48 | S | A | [Student化とt信頼区間](core/48_student_t_confidence_interval.md) | 表・○ |
| 14 | 45 | S | A | [カイ二乗ピボットによる分散・標準偏差信頼区間](core/45_chisq_variance_confidence_interval.md) | 表・○ |
| 15 | 72 | S | A | [正規2標本のF検定・pooled t](core/72_two_sample_f_pooled_t.md) | 表・○ |
| 16 | 43 | S | A | [二項モデル：十分性・最尤推定量・平均二乗誤差・縮小](core/43_binomial_sufficiency_shrinkage.md) | ◎ |
| 17 | 44 | S | A | [台が母数に依存する非正則最尤推定量・不偏化](core/44_uniform_nonregular_mle.md) | ◎ |
| 18 | 57 | S | A | [逆分散重み付き推定・最良線形不偏推定量・最尤推定量・Cramér–Rao下限](core/57_inverse_variance_blue_mle.md) | ○ |
| 19 | 59 | S | A | [Beta–Binomial共役Bayes・事後予測](core/59_beta_binomial_bayes.md) | ◎ |
| 20 | 98 | S | A | [Bayes意思決定：二乗・絶対・0–1損失](core/98_bayes_decision_loss.md) | ◎ |
| 21 | 71 | S | A | [2標本Poisson率を条件付き二項検定へ](core/71_poisson_conditional_binomial_test.md) | ◎・修正済（小さい尾確率） |
| 22 | 49 | S | A | [Poisson 最尤推定量・Fisher情報・信頼区間](core/49_poisson_mle_fisher_ci.md) | 表・○ |
| 23 | 65 | S | S | [F検定・非心度・検出力](core/65_noncentral_f_power.md) | 表・修正済（非心Fの数値評価不要） |
| 24 | 1 | S | A | [順序統計量・十分性・Rao–Blackwell](core/01_order_statistics_rao_blackwell.md) | ◎ |
| 25 | 10 | S | A | [順序統計量の密度・同時密度・range](core/10_order_statistics_density_range.md) | ◎ |
| 26 | 2 | S | A | [Gamma–Beta関係・Jacobian・独立](core/02_gamma_beta_jacobian.md) | ◎ |
| 27 | 3 | S | A | [Poisson–Gamma混合・負の二項](core/03_poisson_gamma_mixture.md) | ◎ |
| 28 | 7 | S | B | [ペア独立と相互独立](core/07_pairwise_mutual_independence.md) | ◎ |
| 29 | 77 | S | A | [重回帰・分散拡大係数・欠落変数バイアス・平均二乗誤差](core/77_multiple_regression_vif_omitted_bias.md) | ◎ |
| 30 | 81 | S | A | [二元配置分散分析・交互作用](core/81_twoway_anova_interaction.md) | ○ |
| 31 | 87 | S | A | [Monte Carlo推定量の分散比較](core/87_monte_carlo_variance_comparison.md) | ○・修正済（必要な数値定数を供給） |
| 32 | 66 | A | A | [制約付き最尤推定量・尤度比検定](core/66_constrained_mle_lrt.md) | ◎・修正済（対数の数値評価不要） |
| 33 | 46 | A | A | [モーメント推定・一致性・Delta法・漸近分散比較](core/46_moment_estimation_delta.md) | ◎ |
| 34 | 27 | A | A | [2変量正規・条件付き分布・Markov構造](core/27_bivariate_normal_markov.md) | ◎ |
| 35 | 28 | A | A | [正規部分和・条件付き分布・Gaussian bridge](core/28_gaussian_bridge.md) | ◎ |
| 36 | 30 | A | B | [正規線形観測・Bayes・条件付き正規](core/30_normal_linear_bayes.md) | ◎ |
| 37 | 18 | A | A | [二項からPoisson極限・再生性・正規近似](core/18_binomial_poisson_normal_limit.md) | ◎ |
| 38 | 4 | A | B | [カイ二乗モーメント母関数・再生性・Beta接続](core/04_chisq_mgf_beta.md) | ◎ |
| 39 | 5 | A | A | [カイ二乗・F・t・Cauchyの比と変換](core/05_chisq_f_t_cauchy.md) | ◎ |
| 40 | 6 | A | B | [確率積分変換・一様分布・順序統計量](core/06_probability_integral_transform.md) | ◎ |
| 41 | 8 | A | B | [条件付き確率・全確率・Bayes](core/08_conditional_probability_bayes.md) | ○ |
| 42 | 9 | A | A | [指数分布＋一様分布：畳み込み・支持集合・依存](core/09_exponential_uniform_convolution.md) | ◎ |
| 43 | 53 | A | B | [Poisson母数推定：不偏性・一致性・平均二乗誤差](core/53_poisson_unbiased_consistent_mse.md) | ◎ |
| 44 | 79 | A | A | [分散分析・欠測後の不均衡データ](core/79_unbalanced_anova_missing.md) | ○ |
| 45 | 88 | A | A | [hit-or-miss法と標本平均法の分散比較](core/88_hit_or_miss_monte_carlo.md) | ◎ |
| 46 | 90 | A | A | [棄却法・受理率・乱数生成](core/90_rejection_sampling.md) | ◎ |
| 47 | 92 | A | B | [Monte Carlo標準誤差・必要試行数](core/92_monte_carlo_standard_error.md) | ○ |
| 48 | 97 | A | A | [幾何・負の二項：待ち時間・確率母関数・無記憶性](core/97_geometric_negative_binomial_pgf.md) | ◎ |

## Standard 32

| 実装順 | 100 No. | 演習価値 | 難度 | 主題 | 手計算監査 |
| ---: | ---: | :---: | :---: | --- | --- |
| 01 | 11 | A | A | [二変量一様分布・条件付き分布・幾何確率](standard/11_bivariate_uniform_conditional_geometry.md) | ◎ |
| 02 | 12 | A | A | [カイ二乗・Cauchy・逆関数法](standard/12_chisq_cauchy_inverse_transform.md) | ◎・修正済（逆三角関数の数値評価不要） |
| 03 | 13 | A | A | [指数分布モーメント母関数・指数傾斜](standard/13_exponential_mgf_tilting.md) | ◎ |
| 04 | 14 | A | A | [標本中心モーメント・不偏補正](standard/14_sample_central_moments.md) | ◎ |
| 05 | 15 | A | A | [標本平均の歪度・尖度](standard/15_sample_mean_skewness_kurtosis.md) | ◎ |
| 06 | 16 | B | B | [依存する一様分布・無相関](standard/16_dependent_uniform_uncorrelated.md) | ◎ |
| 07 | 19 | A | A | [経験分布・tail integral・混合重尾](standard/19_empirical_distribution_tail_mixture.md) | ◎ |
| 08 | 20 | A | A | [最大順序統計量・極値極限](standard/20_max_order_extreme_limit.md) | ◎ |
| 09 | 21 | A | A | [多項分布・共分散行列・多変量中心極限定理](standard/21_multinomial_covariance_mvn_clt.md) | ◎ |
| 10 | 22 | A | A | [階層Bernoulli・全分散・級内相関](standard/22_hierarchical_bernoulli_icc.md) | ◎ |
| 11 | 29 | A | A | [二値化正規・相関減衰](standard/29_dichotomized_normal_correlation.md) | ◎ |
| 12 | 32 | A | A | [不均一分散Gaussian bridge](standard/32_heteroscedastic_gaussian_bridge.md) | ◎ |
| 13 | 36 | A | A | [ノイズ付き線形観測の条件付き正規](standard/36_noisy_linear_conditional_normal.md) | ◎ |
| 14 | 47 | A | A | [二項比率Wald区間・被覆確率](standard/47_binomial_wald_coverage.md) | ◎・修正済（巨大な二項和の数値評価不要） |
| 15 | 50 | A | A | [二項2母数モーメント法・識別](standard/50_two_parameter_binomial_moments.md) | ◎ |
| 16 | 52 | A | A | [Pareto 最尤推定量・有限標本バイアス・効率](standard/52_pareto_mle_bias_efficiency.md) | ◎ |
| 17 | 54 | A | A | [一様分布最大値・不偏推定・分散比較](standard/54_uniform_max_unbiased_variance.md) | ◎ |
| 18 | 56 | A | A | [超幾何分布・有限母集団補正](standard/56_hypergeometric_fpc.md) | ○ |
| 19 | 58 | A | A | [層化抽出・Horvitz–Thompson・Neyman配分](standard/58_stratified_ht_neyman_allocation.md) | ○ |
| 20 | 60 | A | A | [右打切り指数寿命・観測尤度](standard/60_right_censored_exponential.md) | ◎ |
| 21 | 67 | A | A | [順序統計量で棄却域を設計](standard/67_order_statistic_rejection_region.md) | ◎ |
| 22 | 68 | A | A | [適合度尤度比検定・Pearson・自由度](standard/68_gof_lrt_pearson.md) | ◎・修正済（対数の数値評価不要） |
| 23 | 73 | A | A | [母相関係数・Fisher z変換](standard/73_correlation_fisher_z.md) | 表・修正済（$\operatorname{atanh}$ の数値は与値使用） |
| 24 | 74 | A | A | [Wilcoxon順位和・並べ替え検定](standard/74_wilcoxon_permutation.md) | ◎ |
| 25 | 82 | A | A | [ANCOVA・調整済み処置効果](standard/82_ancova_adjusted_effect.md) | ○ |
| 26 | 83 | A | A | [Bonferroni・Scheffe多重比較](standard/83_bonferroni_scheffe.md) | 表 |
| 27 | 84 | A | A | [partial R2・追加平方和](standard/84_partial_r2_extra_ss.md) | ○ |
| 28 | 85 | A | A | [対数回帰・残差診断](standard/85_log_regression_residuals.md) | ◎・修正済（指数関数の数値評価不要） |
| 29 | 86 | B | B | [2変量正規・平均への回帰](standard/86_bivariate_normal_regression_to_mean.md) | ◎ |
| 30 | 89 | A | B | [稀事象・相対Monte Carlo誤差](standard/89_rare_event_relative_mc_error.md) | ○ |
| 31 | 91 | A | A | [Box–Muller変換](standard/91_box_muller.md) | ◎・修正済（$\log,\sin,\cos$ の数値評価不要） |
| 32 | 96 | A | A | [Weibull・生存関数・ハザード](standard/96_weibull_survival_hazard.md) | ◎ |

## Advanced 20

| 実装順 | 100 No. | 演習価値 | 難度 | 主題 | 手計算監査 |
| ---: | ---: | :---: | :---: | --- | --- |
| 01 | 17 | A | S | [二項確率母関数・Chernoff型評価](advanced/17_binomial_pgf_chernoff.md) | ◎・修正済（対数の数値評価不要） |
| 02 | 23 | B | A | [切断正規・平均・分散](advanced/23_truncated_normal_moments.md) | 表 |
| 03 | 24 | A | S | [特性関数による中心極限定理](advanced/24_characteristic_function_clt.md) | ◎ |
| 04 | 31 | S | S | [等相関行列・精度行列・偏相関](advanced/31_equicorrelation_precision_partial.md) | ◎ |
| 05 | 33 | S | S | [射影行列・二次形式・Cochran分解](advanced/33_projection_quadratic_cochran.md) | ◎ |
| 06 | 34 | A | A | [精度行列・Gaussian条件付き独立](advanced/34_precision_gaussian_conditional_independence.md) | ◎ |
| 07 | 35 | B | A | [2変量正規・選択後モーメント](advanced/35_bivariate_normal_selection_moments.md) | 表 |
| 08 | 37 | B | S | [逐次残差化・Cholesky標準化](advanced/37_cholesky_residualization.md) | ◎ |
| 09 | 38 | B | A | [非心Mahalanobis二次形式](advanced/38_noncentral_mahalanobis.md) | ◎ |
| 10 | 39 | S | S | [条件付き正規公式の平方完成導出](advanced/39_conditional_normal_square_completion.md) | ◎ |
| 11 | 51 | A | S | [位置母数付き指数・非正則2母数最尤推定量](advanced/51_shifted_exponential_nonregular_mle.md) | ◎ |
| 12 | 61 | A | S | [2成分Poisson混合・期待値最大化法](advanced/61_poisson_mixture_em.md) | ◎・修正済（収束までの反復計算不要） |
| 13 | 64 | S | S | [母平均の両側一様最強力不偏検定](advanced/64_two_sided_umpu_mean.md) | 表 |
| 14 | 69 | B | A | [Cauchy単純対単純Neyman–Pearson検定](advanced/69_cauchy_np_test.md) | ◎・修正済（臨界値の数値求解不要） |
| 15 | 76 | S | S | [射影・Cochran・予測誤差](advanced/76_projection_cochran_prediction.md) | ◎ |
| 16 | 93 | B | A | [重点サンプリング](advanced/93_importance_sampling.md) | ◎ |
| 17 | 94 | B | A | [制御変量・最適係数](advanced/94_control_variates.md) | ◎ |
| 18 | 95 | B | A | [層化Monte Carlo](advanced/95_stratified_monte_carlo.md) | ◎ |
| 19 | 99 | S | A | [複合帰無・妥当なP値](advanced/99_composite_null_valid_pvalue.md) | 表 |
| 20 | 100 | S | S | [一致検定・局所対立・漸近検出力](advanced/100_equivalence_local_power.md) | 表 |

## 運用

- まず Core 48 を実装順に解く。
- 次に Standard 32、最後に Advanced 20 へ進む。
- 分野別の再構成元や補完原稿を確認するときだけ `sources/` を参照する。
- 数式変更後は `npm run validate:mathstat` を実行する。
