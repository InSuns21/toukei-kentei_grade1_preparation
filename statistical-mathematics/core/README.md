# Core 48 実装順

Core層の大問を1題1ファイルで管理する。各題は「問題・詳細解答・本番答案・20点採点基準」を含む。ファイル先頭の番号は正式100大問の旧No.で、見出し中の Core No. は層内の実装順である。

| 実装順 | 100 No. | 演習価値 | 難度 | 主題 |
| ---: | ---: | :---: | :---: | --- |
| 01 | 40 | S | A | [Fisher情報量・Delta法・MLEの漸近効率](40_fisher_information_delta_mle_efficiency.md) |
| 02 | 70 | S | S | [BernoulliモデルでLRT・Wald・Scoreを比較する](70_bernoulli_lrt_wald_score.md) |
| 03 | 63 | S | A | [Neyman–Pearson・単調尤度比・UMP](63_neyman_pearson_ump.md) |
| 04 | 41 | S | A | [一様分布の完備十分統計量・Lehmann–Scheffé](41_uniform_complete_sufficient_umvu.md) |
| 05 | 55 | S | A | [指数分布の十分性・完備性・UMVU](55_exponential_complete_sufficient_umvu.md) |
| 06 | 42 | S | A | [Cramér–Rao下限・効率性](42_cramer_rao_efficiency.md) |
| 07 | 25 | S | S | [多変量正規の線形変換・独立・残差化](25_mvn_linear_transform_residual.md) |
| 08 | 26 | S | S | [条件付き正規・偏相関・条件付き独立](26_conditional_normal_partial_correlation.md) |
| 09 | 62 | S | S | [多項分布LRTとPearson適合度](62_multinomial_lrt_pearson.md) |
| 10 | 78 | S | A | [Gauss–Markov・BLUE](78_gauss_markov_blue.md) |
| 11 | 80 | S | S | [一般線形仮説・partial F](80_general_linear_hypothesis_partial_f.md) |
| 12 | 75 | S | A | [回帰係数のMLE・Fisher情報・検定・検出力](75_regression_mle_fisher_power.md) |
| 13 | 48 | S | A | [Student化とt信頼区間](48_student_t_confidence_interval.md) |
| 14 | 45 | S | A | [カイ二乗ピボットによる分散・標準偏差CI](45_chisq_variance_confidence_interval.md) |
| 15 | 72 | S | A | [正規2標本のF検定・pooled t](72_two_sample_f_pooled_t.md) |
| 16 | 43 | S | A | [二項モデル：十分性・MLE・MSE・縮小](43_binomial_sufficiency_shrinkage.md) |
| 17 | 44 | S | A | [台が母数に依存する非正則MLE・不偏化](44_uniform_nonregular_mle.md) |
| 18 | 57 | S | A | [逆分散重み付き推定・BLUE・MLE・CRLB](57_inverse_variance_blue_mle.md) |
| 19 | 59 | S | A | [Beta–Binomial共役Bayes・事後予測](59_beta_binomial_bayes.md) |
| 20 | 98 | S | A | [Bayes意思決定：二乗・絶対・0–1損失](98_bayes_decision_loss.md) |
| 21 | 71 | S | A | [2標本Poisson率を条件付き二項検定へ](71_poisson_conditional_binomial_test.md) |
| 22 | 49 | S | A | [Poisson MLE・Fisher情報・信頼区間](49_poisson_mle_fisher_ci.md) |
| 23 | 65 | S | S | [F検定・非心度・検出力](65_noncentral_f_power.md) |
| 24 | 1 | S | A | [順序統計量・十分性・Rao–Blackwell](01_order_statistics_rao_blackwell.md) |
| 25 | 10 | S | A | [順序統計量の密度・同時密度・range](10_order_statistics_density_range.md) |
| 26 | 2 | S | A | [Gamma–Beta関係・Jacobian・独立](02_gamma_beta_jacobian.md) |
| 27 | 3 | S | A | [Poisson–Gamma混合・負の二項](03_poisson_gamma_mixture.md) |
| 28 | 7 | S | B | [ペア独立と相互独立](07_pairwise_mutual_independence.md) |
| 29 | 77 | S | A | [重回帰・VIF・欠落変数バイアス・MSE](77_multiple_regression_vif_omitted_bias.md) |
| 30 | 81 | S | A | [二元配置分散分析・交互作用](81_twoway_anova_interaction.md) |
| 31 | 87 | S | A | [Monte Carlo推定量の分散比較](87_monte_carlo_variance_comparison.md) |
| 32 | 66 | A | A | [制約付きMLE・尤度比検定](66_constrained_mle_lrt.md) |
| 33 | 46 | A | A | [モーメント推定・一致性・Delta法・漸近分散比較](46_moment_estimation_delta.md) |
| 34 | 27 | A | A | [2変量正規・条件付き分布・Markov構造](27_bivariate_normal_markov.md) |
| 35 | 28 | A | A | [正規部分和・条件付き分布・Gaussian bridge](28_gaussian_bridge.md) |
| 36 | 30 | A | B | [正規線形観測・Bayes・条件付き正規](30_normal_linear_bayes.md) |
| 37 | 18 | A | A | [二項からPoisson極限・再生性・正規近似](18_binomial_poisson_normal_limit.md) |
| 38 | 4 | A | B | [カイ二乗MGF・再生性・Beta接続](04_chisq_mgf_beta.md) |
| 39 | 5 | A | A | [カイ二乗・F・t・Cauchyの比と変換](05_chisq_f_t_cauchy.md) |
| 40 | 6 | A | B | [確率積分変換・一様分布・順序統計量](06_probability_integral_transform.md) |
| 41 | 8 | A | B | [条件付き確率・全確率・Bayes](08_conditional_probability_bayes.md) |
| 42 | 9 | A | A | [指数分布＋一様分布：畳み込み・支持集合・依存](09_exponential_uniform_convolution.md) |
| 43 | 53 | A | B | [Poisson母数推定：不偏性・一致性・MSE](53_poisson_unbiased_consistent_mse.md) |
| 44 | 79 | A | A | [分散分析・欠測後の不均衡データ](79_unbalanced_anova_missing.md) |
| 45 | 88 | A | A | [hit-or-miss法と標本平均法の分散比較](88_hit_or_miss_monte_carlo.md) |
| 46 | 90 | A | A | [棄却法・受理率・乱数生成](90_rejection_sampling.md) |
| 47 | 92 | A | B | [Monte Carlo標準誤差・必要試行数](92_monte_carlo_standard_error.md) |
| 48 | 97 | A | A | [幾何・負の二項：待ち時間・PGF・無記憶性](97_geometric_negative_binomial_pgf.md) |

**Core 48: 48 / 48 実装済み。**
