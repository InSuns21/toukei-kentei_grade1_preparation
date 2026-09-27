# 統計検定1級 統計応用（理工学）80大問 — 問題一覧

80題を分野別に比較するための一覧です。各大問名から問題へ移動できます。普段の学習ではサイドバーから Core / Standard / Advanced の各問題へ直接移動できます。

## 分野別配分

| 分野 | 題数 |
| --- | ---: |
| 信頼性・寿命・生存時間 | 13 |
| 確率過程 | 9 |
| 時系列 | 9 |
| 線形モデル・回帰 | 12 |
| 実験計画 | 12 |
| 品質管理 | 8 |
| 多変量解析 | 6 |
| 一般化線形モデル・分類・漸近・計算統計 | 7 |
| 標本調査 | 4 |
| **合計** | **80** |

## 80大問

### 信頼性・寿命・生存時間 — 13題

| No. | 層 | 演習価値 | 難度 | 大問テーマ | 過去問対応年度 | 公式範囲 |
| ---: | --- | :---: | :---: | --- | --- | --- |
| 01 | Core | S | B | [ワイブル分布：分布関数・期待値・中央値・最頻値・ハザード](core/27_weibull_basics.md) | 2018, 2023 | 理工固有：信頼性 |
| 02 | Standard | A | B | [ワイブル形状母数と故障率の増減・劣化特性](standard/02_weibull_shape_hazard.md) | 2018, 2023 | 理工固有：信頼性 |
| 03 | Core | S | A | [ワイブル寿命モデルの最尤推定・信頼区間・デルタ法](core/25_weibull_mle_delta.md) | 2018, 2023 | 理工固有：信頼性・漸近理論 |
| 04 | Core | A | B | [指数分布：無記憶性・平均故障時間・信頼度・ハザード](core/40_exponential_reliability.md) | 2018 | 理工固有：信頼性 |
| 05 | Standard | A | B | [指数寿命の和とガンマ・Erlang分布：待ち時間と寿命](standard/05_erlang_waiting.md) | 2018 | 理工固有：信頼性・ポアソン過程 |
| 06 | Core | S | B | [生存関数・密度・ハザード・累積ハザードの相互変換](core/26_survival_hazard.md) | 2019 | 理工固有：信頼性 |
| 07 | Standard | A | A | [平均余命関数から寿命分布・ハザードを復元](standard/07_mean_residual_life.md) | 2019 | 理工固有：信頼性・保全性 |
| 08 | Core | S | A | [右打ち切り寿命データの尤度と最尤推定](core/24_right_censoring.md) | 2019 | 理工固有：信頼性／共通：不完全データ |
| 09 | Standard | A | A | [Kaplan--Meier推定量：打ち切りデータの生存曲線](standard/09_kaplan_meier.md) | 2019関連 | 共通・準1級包含：生存時間・打ち切り |
| 10 | Standard | B | B | [直列・並列システムの信頼度とシステム寿命](standard/10_series_parallel_reliability.md) | 2018関連 | 理工固有：信頼性 |
| 11 | Advanced | B | A | [競合リスク・複数故障モードと最小寿命](advanced/11_competing_risks.md) | 2019関連 | 理工固有：信頼性 |
| 12 | Advanced | C | A | [修理可能系：保全性・可用率・修理時間モデル](advanced/12_repairable_availability.md) | 2016, 2019関連 | 理工固有：保全性 |
| 64 | Advanced | A | A | [比例ハザード：ハザード比・生存関数・リスク集合・部分尤度](advanced/64_proportional_hazards.md) | 共通範囲補強 | 準1級包含：比例ハザード／理工固有：信頼性 |

### 確率過程 — 9題

| No. | 層 | 演習価値 | 難度 | 大問テーマ | 過去問対応年度 | 公式範囲 |
| ---: | --- | :---: | :---: | --- | --- | --- |
| 13 | Core | S | B | [ポアソン過程：定義・独立増分・到着回数・指数待ち時間](core/10_poisson_process.md) | 2017, 2018 | 共通・理工固有 |
| 14 | Core | A | A | [ポアソン過程の重ね合わせ・間引き・分割](core/32_poisson_superposition_thinning.md) | 2017, 2018関連 | 共通・理工固有 |
| 15 | Standard | A | A | [到着回数を条件とした到着時刻と一様順序統計量](standard/15_poisson_order_stats.md) | 2017, 2018関連 | 共通・理工固有 |
| 16 | Advanced | B | S | [非斉次ポアソン過程：強度関数と累積強度](advanced/16_nhpp.md) | シラバス拡張 | 理工固有の発展 |
| 17 | Core | S | B | [Markov連鎖：Markov性・推移行列・多段階推移・定常分布](core/09_markov_stationary.md) | 2025 | 共通・理工固有 |
| 18 | Core | A | A | [吸収Markov連鎖：吸収確率・平均吸収時間](core/33_absorbing_markov.md) | 2025関連 | 共通・理工固有 |
| 19 | Core | S | A | [推移度数から遷移確率を最尤推定し尤度比検定](core/08_markov_mle_lrt.md) | 2025 | 理工固有：Markov連鎖・漸近理論 |
| 20 | Standard | A | A | [ランダムウォーク：到達確率・初到達時間・停止問題](standard/20_random_walk_gambler_ruin.md) | 2017, 2021関連 | 共通・理工固有 |
| 21 | Advanced | A | A | [Brown運動：基本定義・独立正規増分・共分散・反射原理](advanced/21_brownian_reflection.md) | 2019, 2021関連 | **1級統計応用・共通事項に明示** |

No.21 は基本定義から反射原理・初到達までを一題の中で段階的に扱います。

### 時系列 — 9題

| No. | 層 | 演習価値 | 難度 | 大問テーマ | 過去問対応年度 | 公式範囲 |
| ---: | --- | :---: | :---: | --- | --- | --- |
| 22 | Core | S | B | [AR(1)：白色雑音・弱定常性・自己共分散・自己相関・予測](core/11_ar1.md) | 2019 | 共通・理工固有 |
| 23 | Core | S | A | [AR(2)：特性多項式・Yule--Walker方程式・定常条件](core/12_ar2_yule_walker.md) | 2021関連 | 理工固有 |
| 24 | Core | A | B | [MA(1)：自己共分散・自己相関・可逆性](core/35_ma1_invertibility.md) | 2021関連 | 理工固有 |
| 25 | Standard | A | A | [自己相関・偏自己相関・ペリオドグラム・AIC・クロスバリデーションによるモデル識別](standard/25_acf_pacf_identification.md) | 2019, 2021関連 | 共通・準1級包含：時系列診断・モデル評価 |
| 26 | Standard | A | A | [ARMA(1,1)：自己共分散と1期先予測](standard/26_arma11.md) | 2021関連 | 共通・理工固有 |
| 27 | Core | S | A | [ARIMA：差分・単位根・定常化、後退作用素は後置](core/13_arima_difference.md) | 2021関連 | 共通・理工固有 |
| 28 | Core | A | A | [線形時系列の1期先・多期先予測と予測誤差分散](core/34_time_series_forecast.md) | 2019, 2021関連 | 共通・理工固有 |
| 29 | Standard | A | A | [自己回帰係数のYule--Walker推定・最小二乗推定](standard/29_ar_estimation.md) | 2019, 2021関連 | 理工固有・漸近理論 |
| 30 | Advanced | A | A | [状態空間モデル：状態方程式・観測方程式・予測・更新](advanced/30_state_space.md) | 共通範囲補強 | **1級統計応用・共通事項に明示** |

No.30 は状態空間モデルの基礎として、予測と観測更新を扱います。

### 線形モデル・回帰 — 12題

| No. | 層 | 演習価値 | 難度 | 大問テーマ | 過去問対応年度 | 公式範囲 |
| ---: | --- | :---: | :---: | --- | --- | --- |
| 31 | Core | S | B | [工程校正の重回帰：通常最小二乗・残差直交性・レバレッジ・標準化残差・予測](core/01_ols_projection.md) | 2023, 2024, 2025 | 共通・理工固有：線形モデル・回帰診断 |
| 32 | Core | S | A | [ガウス・マルコフ定理と最良線形不偏推定量](core/03_gauss_markov.md) | 2022, 2025関連 | 共通・理工固有 |
| 33 | Core | A | B | [線形結合・線形対比の分布と推定量の分散](core/30_linear_contrast.md) | 2022, 2025関連 | 理工固有 |
| 34 | Core | S | A | [線形制約・追加平方和・一般線形仮説のF検定](core/02_general_linear_hypothesis.md) | 2022, 2025関連 | 理工固有 |
| 35 | Core | S | B | [重回帰の分散分析・決定係数・自由度調整済み決定係数](core/04_regression_anova.md) | 2022, 2025 | 共通：重回帰 |
| 36 | Core | S | B | [標準化重回帰：相関行列から偏回帰係数と予測値](core/05_standardized_regression.md) | 2025 | 共通・理工固有 |
| 37 | Standard | S | A | [Frisch--Waugh--Lovell：残差化と偏回帰係数](standard/37_fwl.md) | 2025 | 共通：重回帰 |
| 38 | Standard | A | A | [多重共線性・回帰診断・$L_1$正則化・ソフトしきい値](standard/38_multicollinearity_diagnostics.md) | 2021, 2022, 2025関連 | **1級統計応用・共通事項に明示** |
| 39 | Standard | A | S | [一般化最小二乗：不均一分散・相関誤差の下での推定](standard/39_gls.md) | 2021関連 | 共通：重回帰 |
| 40 | Core | S | A | [制約線形モデルとバイアス・バリアンス分解](core/06_restricted_bias_variance.md) | 2025 | 理工固有：線形モデル・制約 |
| 41 | Core | A | B | [一元配置分散分析：平方和分解・F検定・線形モデル表現](core/31_oneway_anova.md) | 2015–2024関連 | 共通：実験計画・分散分析 |
| 42 | Advanced | B | A | [二元配置分散分析：主効果・交互作用・欠測時の考え方](advanced/42_twoway_anova.md) | 2015–2024関連 | 共通：実験計画・分散分析 |

### 実験計画 — 12題

| No. | 層 | 演習価値 | 難度 | 大問テーマ | 過去問対応年度 | 公式範囲 |
| ---: | --- | :---: | :---: | --- | --- | --- |
| 43 | Core | A | C | [フィッシャーの3原則：反復・無作為化・局所管理](core/38_fisher_principles.md) | 2021関連 | 共通・理工固有：実験計画 |
| 44 | Core | S | B | [乱塊法：ブロック化による誤差削減と分散分析](core/18_randomized_block.md) | 2019, 2021関連 | 共通・理工固有 |
| 45 | Core | S | A | [分割法：一次誤差と二次誤差](core/19_split_plot.md) | 2021 | 理工固有：実験計画 |
| 46 | Standard | A | A | [固定効果・変量効果・期待平均平方と分散成分](standard/46_random_effects_ems.md) | 2021関連 | 理工固有 |
| 47 | Core | S | B | [$2^2$要因計画：主効果・交互作用・直交対比](core/14_factorial_2x2.md) | 2016, 2024関連 | 共通・理工固有 |
| 48 | Core | S | A | [$2^k$要因計画：効果推定・平方和・直交性](core/15_factorial_2k.md) | 2016, 2024関連 | 共通・理工固有 |
| 49 | Core | S | A | [一部実施要因計画：$2^{k-p}$・alias・解像度](core/16_fractional_factorial.md) | 2016, 2024関連 | 共通・理工固有 |
| 50 | Core | S | A | [直交表：列割付・効果推定・分散分析](core/17_orthogonal_array.md) | 2016, 2024関連 | 理工固有 |
| 51 | Standard | A | A | [交絡法：ブロック生成子と交絡構造](standard/51_confounding_blocks.md) | 2016, 2024関連 | 理工固有 |
| 52 | Standard | A | A | [応答曲面法・非線形回帰：最急上昇・二次モデル・Gauss--Newton法](standard/52_response_surface.md) | 2023, 2024関連 | 共通：非線形回帰／理工固有：実験計画 |
| 53 | Advanced | B | S | [中心複合計画：二次応答曲面・回転可能性](advanced/53_central_composite.md) | 2023, 2024関連 | 理工固有の発展 |
| 54 | Core | S | A | [D最適計画：$\det(X^\top X)$ と推定量共分散](core/20_d_optimal.md) | 2023 | 理工固有：実験計画 |

### 品質管理 — 8題

| No. | 層 | 演習価値 | 難度 | 大問テーマ | 過去問対応年度 | 公式範囲 |
| ---: | --- | :---: | :---: | --- | --- | --- |
| 56 | Core | S | B | [$\bar X-R$管理図：3シグマ管理限界と管理状態](core/21_xbar_r_chart.md) | 2019, 2025 | 理工固有：管理図・工程管理 |
| 57 | Standard | A | A | [$\bar X-S$管理図・個別値管理図](standard/57_xbar_s_individuals.md) | 2019, 2025関連 | 理工固有：管理図 |
| 58 | Core | A | B | [属性管理図：$p,np,c,u$ 管理図](core/37_attribute_charts.md) | 2019関連 | 理工固有：管理図 |
| 59 | Advanced | B | S | [過分散工程：ポアソン--ガンマ・Binomial混合による管理限界](advanced/59_overdispersion_control.md) | 2025関連 | 理工固有の発展 |
| 60 | Core | S | B | [工程能力指数 $C_p,C_{pk}$ と不良率・中心ずれ](core/22_process_capability.md) | 2016, 2025 | 理工固有：工程能力指数 |
| 61 | Core | S | A | [$C_p$ の点推定とカイ二乗分布による信頼区間](core/39_cp_confidence_interval.md) | 2016, 2025 | 理工固有：工程能力指数 |
| 62 | Core | A | A | [管理限界と規格限界：検出確率・第2種過誤・平均連長](core/36_control_chart_arl.md) | 2019, 2025関連 | 理工固有：管理図・工程管理 |
| 63 | Advanced | B | S | [累積和・指数加重移動平均管理図](advanced/63_cusum_ewma.md) | シラバス拡張 | 理工固有の発展 |

### 多変量解析 — 6題

| No. | 層 | 演習価値 | 難度 | 大問テーマ | 過去問対応年度 | 公式範囲 |
| ---: | --- | :---: | :---: | --- | --- | --- |
| 65 | Core | A | B | [多変量正規：線形変換・平均ベクトル・分散共分散・独立性](core/29_mvn_linear_transform.md) | 2017, 2022関連 | 理工固有 |
| 66 | Core | S | A | [多変量正規の条件付き分布・条件付き期待値](core/23_conditional_mvn.md) | 2017, 2022 | 理工固有 |
| 67 | Standard | A | B | [Mahalanobis距離・標準化・相関行列の幾何](standard/67_mahalanobis_geometry.md) | 2022関連 | 理工固有 |
| 68 | Advanced | A | A | [主成分分析：固有値・固有ベクトル・寄与率](advanced/68_pca.md) | 共通範囲補強 | **1級統計応用・共通事項に明示** |
| 69 | Advanced | A | A | [フィッシャーの線形判別・二次判別・混同行列・ROC曲線・曲線下面積](advanced/69_lda.md) | 共通範囲補強 | **1級共通：判別分析／準1級包含：分類評価** |
| 70 | Advanced | A | A | [因子分析・クラスター分析：共通因子モデル・共通性・$k$-means・Ward法](advanced/70_factor_cluster.md) | 共通範囲補強 | **1級統計応用・共通事項に明示** |

### 一般化線形モデル・分類・漸近・計算統計 — 7題

| No. | 層 | 演習価値 | 難度 | 大問テーマ | 過去問対応年度 | 公式範囲 |
| ---: | --- | :---: | :---: | --- | --- | --- |
| 55 | Advanced | A | A | [サポートベクターマシン：最大マージン・hinge損失・ソフトマージン・カーネル法](advanced/55_svm_margin.md) | 共通範囲補強 | **1級統計応用・共通事項に明示** |
| 71 | Core | A | A | [指数型分布族・スコア・フィッシャー情報量と統計モデリング](core/28_exponential_family_information.md) | 2023 | 理工固有：一般化線形モデル・漸近 |
| 72 | Standard | A | A | [ポアソン回帰：対数リンク・尤度・係数解釈](standard/72_poisson_regression.md) | 2023関連 | 共通・理工固有：一般化線形モデル |
| 73 | Standard | A | A | [ロジスティック回帰・プロビット：尤度・潜在変数・限界効果](standard/73_logistic_regression.md) | 2023関連 | **1級統計応用・共通事項に明示** |
| 74 | Core | S | S | [最尤推定量の漸近正規性：ワルド・尤度比・スコア検定](core/07_wald_lr_score.md) | 2016, 2025関連 | 理工固有：漸近理論 |
| 75 | Advanced | A | A | [乱数生成・ブートストラップ・jackknife：逆関数法・棄却法・標準誤差・バイアス補正](advanced/75_random_generation.md) | 2018関連 | 準1級包含・計算統計・再標本化 |
| 76 | Advanced | B | S | [Markov連鎖Monte Carlo：定常分布・詳細釣り合い・推定](advanced/76_mcmc.md) | 2019, 2021関連 | 準1級包含・計算統計 |

### 標本調査 — 4題

| No. | 層 | 演習価値 | 難度 | 大問テーマ | 過去問対応年度 | 公式範囲 |
| ---: | --- | :---: | :---: | --- | --- | --- |
| 77 | Advanced | A | A | [層化抽出：比例配分とNeyman配分の分散比較](advanced/77_stratified_sampling.md) | 2025共通問題関連 | 1級共通・準1級包含：標本調査 |
| 78 | Advanced | B | S | [二段階抽出：推定量の不偏性と分散分解](advanced/78_two_stage_sampling.md) | 共通範囲補強 | 1級共通・準1級包含：標本調査 |
| 79 | Advanced | B | A | [標本サイズ設計：精度・コスト・有限母集団](advanced/79_sample_size_design.md) | 共通範囲補強 | 1級共通・準1級包含：標本調査 |
| 80 | Advanced | S | A | [確率化回答法：回答確率・最尤推定・不偏補正・設計](advanced/80_randomized_response.md) | 2025 | 1級共通：調査・標本調査 |
