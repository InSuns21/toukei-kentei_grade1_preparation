# Core 40 実装順

統計検定1級「統計応用（理工学）」80大問から Core 40 を抽出し、演習価値 `S > A > B > C`、同ランク内は本番での転用性・近年の出題との接続・他分野への波及を基準に並べ直した。

- Core No. はこの実装順で固定する。
- 「80 No.」は親目次 `../index.md` の元番号。
- 各大問は原則20〜30分、4〜6小問。
- 各ファイルに問題、詳細解答、本番答案、採点基準、打ち切り判断を含める。
- 電卓・数表の扱いは [CALCULATOR_POLICY.md](CALCULATOR_POLICY.md) に従う。
- 2026-08-25の横断監査は [AUDIT_2026-08-25.md](AUDIT_2026-08-25.md)、差し替え・短問増強は [AUGMENTATION_2026-08-25.md](AUGMENTATION_2026-08-25.md) を参照。

| Core No. | 80 No. | 演習価値 | 難度 | 主題 |
| ---: | ---: | :---: | :---: | --- |
| 01 | 31 | S | B | [行列による通常最小二乗法・射影・残差空間](01_ols_projection.md) |
| 02 | 34 | S | A | [線形制約・追加平方和・一般線形仮説のF検定](02_general_linear_hypothesis.md) |
| 03 | 32 | S | A | [Gauss–Markov定理と最良線形不偏推定量](03_gauss_markov.md) |
| 04 | 35 | S | B | [重回帰の分散分析・決定係数・部分F](04_regression_anova.md) |
| 05 | 36 | S | B | [標準化重回帰・偏相関・分散拡大係数](05_standardized_regression.md) |
| 06 | 40 | S | A | [制約モデルとバイアス・バリアンス](06_restricted_bias_variance.md) |
| 07 | 74 | S | S | [最尤推定量の漸近正規性・Wald/尤度比/Score](07_wald_lr_score.md) |
| 08 | 19 | S | A | [Markov推移度数の最尤推定量・尤度比検定](08_markov_mle_lrt.md) |
| 09 | 17 | S | B | [Markov連鎖・定常分布・平均再帰時間](09_markov_stationary.md) |
| 10 | 13 | S | B | [Poisson過程・指数待ち時間・条件付き二項](10_poisson_process.md) |
| 11 | 22 | S | B | [AR(1)](11_ar1.md) |
| 12 | 23 | S | A | [AR(2)・Yule–Walker](12_ar2_yule_walker.md) |
| 13 | 27 | S | A | [ARIMA・差分・単位根](13_arima_difference.md) |
| 14 | 47 | S | B | [$2^2$要因計画・単純効果](14_factorial_2x2.md) |
| 15 | 48 | S | A | [$2^k$要因計画](15_factorial_2k.md) |
| 16 | 49 | S | A | [一部実施要因計画・alias・解像度](16_fractional_factorial.md) |
| 17 | 50 | S | A | [直交表・列割付・誤差自由度](17_orthogonal_array.md) |
| 18 | 44 | S | B | [乱塊法・相対効率・加法性](18_randomized_block.md) |
| 19 | 45 | S | A | [分割法・split-plot](19_split_plot.md) |
| 20 | 54 | S | A | [D最適計画](20_d_optimal.md) |
| 21 | 56 | S | B | [$\bar X-R$管理図・$A_2$の由来](21_xbar_r_chart.md) |
| 22 | 60 | S | B | [工程能力指数 $C_p,C_{pk}$](22_process_capability.md) |
| 23 | 66 | S | A | [多変量正規の条件付き分布](23_conditional_mvn.md) |
| 24 | 08 | S | A | [右打ち切り寿命データ・情報量](24_right_censoring.md) |
| 25 | 03 | S | A | [Weibull寿命モデルの最尤推定量・デルタ法](25_weibull_mle_delta.md) |
| 26 | 06 | S | B | [生存関数・ハザード・条件付き生存](26_survival_hazard.md) |
| 27 | 01 | S | B | [Weibull分布・指数変換・分位点](27_weibull_basics.md) |
| 28 | 71 | A | A | [指数型分布族・Score・Fisher情報量](28_exponential_family_information.md) |
| 29 | 65 | A | B | [多変量正規・線形変換・$\chi^2$](29_mvn_linear_transform.md) |
| 30 | 33 | A | B | [線形結合・直交対比](30_linear_contrast.md) |
| 31 | 41 | A | B | [一元配置分散分析](31_oneway_anova.md) |
| 32 | 14 | A | A | [Poisson過程の重ね合わせ・間引き](32_poisson_superposition_thinning.md) |
| 33 | 18 | A | A | [吸収Markov連鎖](33_absorbing_markov.md) |
| 34 | 28 | A | A | [時系列の多期予測・一般予測誤差分散](34_time_series_forecast.md) |
| 35 | 24 | A | B | [MA(1)・自己共分散・可逆性](35_ma1_invertibility.md) |
| 36 | 62 | A | A | [管理限界・検出確率・平均連長](36_control_chart_arl.md) |
| 37 | 58 | A | B | [属性管理図 $p,np,c,u$](37_attribute_charts.md) |
| 38 | 43 | A | C | [Fisherの3原則・実験単位](38_fisher_principles.md) |
| 39 | 61 | S | A | [工程能力指数 $C_p$ の推定・カイ二乗信頼区間](39_cp_confidence_interval.md) |
| 40 | 04 | A | B | [指数分布・無記憶性・直列系](40_exponential_reliability.md) |

## 実装状況

- [x] Core 01〜10
- [x] Core 11〜20
- [x] Core 21〜30
- [x] Core 31〜40
- [x] Core 39差し替え
- [x] 短問18枠の20〜30分級への増強
- [x] 2026年度一般電卓・統計数値表ポリシー反映

**Core 40: 40 / 40 実装・横断監査・短問増強済み。**
