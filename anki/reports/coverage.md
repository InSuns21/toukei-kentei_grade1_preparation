# シラバス coverage

- 公開カード: 140

| category | cards | subcategory coverage | types |
|---|---:|---:|---|
| 確率と確率変数 | 98 | 5/5 | formula, theorem, condition, proof_step, calc_step, expansion, recognition, strategy, reverse, pitfall |
| 種々の確率分布 | 1 | 1/3 | recognition |
| 統計的推測（推定） | 10 | 7/7 | formula, theorem, proof_step, calc_step, strategy |
| 統計的推測（検定） | 5 | 3/4 | recognition, strategy, pitfall |
| データ解析法の考え方と各種分析手法 | 7 | 6/7 | formula, calc_step, expansion, strategy |
| 統計応用（共通事項） | 6 | 3/7 | condition, calc_step, recognition, strategy |
| 統計応用（理工学） | 13 | 5/6 | formula, theorem, condition, proof_step, calc_step, recognition, strategy |

## 公式範囲の小項目

`complete` は全公式用語に操作カードあり、`partial` は既存カードがあるが未完、`planned` は未着手を表す。

| item | status | cards |
|---|---|---|
| 事象と確率 | complete | prob-inclusion-exclusion, prob-bayes-diagnostic, prob-conditional-multiplication, prob-total-probability, prob-independent-events, prob-pairwise-not-mutual, prob-complement-at-least-one, prob-inclusion-exclusion-three, prob-chain-rule-three, prob-independent-complements, prob-conditioning-breaks-independence, prob-counting-sample-space, prob-conditional-definition-direct |
| 確率分布と母関数 | complete | prob-cdf-from-pmf, dist-mgf-poisson, prob-cdf-from-density, prob-survival-hazard, prob-marginal-density, prob-conditional-density, prob-pgf-moments, prob-mgf-independent-sum, prob-density-normalization, prob-cdf-jump-mass, prob-discrete-marginal, prob-discrete-conditional, prob-joint-factorization-independence, prob-pmf-normalization, prob-cdf-validity, prob-interval-from-cdf, prob-cdf-endpoint-choice, prob-mixed-cdf, prob-joint-cdf-from-density, prob-rectangle-from-joint-cdf, prob-survival-from-cdf, prob-cumulative-hazard, prob-survival-from-hazard, prob-joint-density-normalization, prob-joint-pmf-normalization, prob-discrete-independence-cross-product, prob-conditional-equals-marginal, prob-joint-cdf-independence, prob-mixture-marginal, prob-truncated-conditional-density, prob-density-bayes-two-class, prob-conditional-cdf-from-density, prob-pgf-recover-pmf, prob-pgf-binomial, prob-pgf-geometric, prob-pgf-poisson, prob-pgf-independent-sum, prob-pgf-thinning, prob-pgf-factorial-moment, prob-pgf-validity, prob-mgf-mean-variance, prob-mgf-affine-transform, prob-mgf-iid-sum, prob-mgf-exponential-domain, prob-mgf-gamma, prob-mgf-identify-normal, prob-mgf-nonexistence, prob-mgf-uniqueness-domain, prob-density-from-cdf-derivative |
| 分布の特性値 | complete | dist-variance-moment, prob-expected-value-linearity, prob-expected-value-discrete, prob-expected-value-integral, prob-expected-value-function, prob-variance-affine, prob-variance-independent-sum, prob-standard-deviation-standardize, prob-moment-central-relation, prob-moment-third-central, prob-skewness-definition, prob-skewness-shape, prob-kurtosis-definition, prob-kurtosis-shape, prob-coefficient-of-variation, prob-percentile-from-cdf, prob-median-from-density, prob-quartiles-iqr, prob-range-definition, prob-mode-from-density, prob-covariance-computation, prob-correlation-coefficient, prob-correlation-independence, prob-partial-correlation, prob-shape-summary |
| 変数変換 | complete | dist-jacobian-scale, dist-convolution-uniform, prob-transform-inverse-cdf, prob-transform-nonmonotonic, prob-transform-jacobian-2d, prob-transform-sum-density, prob-transform-ratio, prob-linear-combination-normal, prob-linear-combination-moments, prob-transform-log |
| 極限定理と確率分布の近似 | partial | dist-clt-standardize, data-monte-carlo-integral |
| 離散型分布 | partial | dist-mgf-poisson, est-fisher-bernoulli, test-np-bernoulli |
| 連続型分布 | partial | dist-gamma-recognition, est-moments-exponential, dist-convolution-uniform |
| 標本分布 | planned |  |
| 母集団と標本・統計量 | partial | est-factorization, dist-order-max |
| 尤度と最尤推定 | partial | est-bernoulli-mle |
| 各種推定法 | partial | est-moments-exponential, data-ols-slope |
| 点推定量の性質 | partial | est-bias-variance |
| モデル評価基準 | partial | est-aic-choice |
| 漸近的性質など | partial | est-fisher-bernoulli, est-cramer-rao-bernoulli, est-delta-log |
| 区間推定 | partial | test-normal-ci |
| 検定の基礎 | partial | test-z-rejection |
| 検定法の導出 | partial | test-np-bernoulli, test-likelihood-ratio |
| 正規分布に関する検定 | planned |  |
| 種々の検定法 | partial | test-chi-square-fit, test-sign-test |
| 分散分析 | partial | data-anova-decomposition |
| 回帰分析 | partial | data-ols-slope |
| 分割表の解析 | partial | data-odds-ratio |
| ノンパラメトリック法 | partial | test-sign-test |
| 不完全データ | partial | data-em-responsibility |
| シミュレーション | partial | data-bootstrap-mean, data-monte-carlo-integral |
| ベイズ法 | partial | data-bayes-beta |
| 研究の種類 | planned |  |
| 標本調査法 | planned |  |
| 実験計画法 | partial | eng-blocking |
| 重回帰分析 | partial | model-gauss-markov, data-ols-slope |
| 各種多変量解析法 | partial | model-logistic-odds, model-poisson-glm |
| 確率過程 | partial | process-markov-two-step, process-stationary-markov, process-poisson-wait |
| 時系列解析 | planned |  |
| 多変量解析法 | partial | multi-linear-combination, multi-covariance-psd, multi-pca-eigen, multi-conditional-normal |
| 確率過程 | partial | process-ar1-stationary, process-ma1-autocovariance |
| 線形推測 | partial | model-gauss-markov, model-contrast |
| 漸近理論 | partial | dist-clt-standardize, est-delta-log |
| 品質管理 | partial | eng-xbar-limits, eng-capability-index, eng-series-reliability, eng-exponential-reliability |
| 実験計画 | partial | eng-two-factor-interaction, eng-blocking |

## 項目（学習しておくべき用語）例

作業を完了するには、対象サブカテゴリーの全用語が `card` で、実際に操作するカードIDを持つ必要がある。

| item | term | status | cards |
|---|---|---|---|
| 事象と確率 | 確率の計算 | card | prob-total-probability, prob-complement-at-least-one, prob-counting-sample-space |
| 事象と確率 | 統計的独立 | card | prob-independent-events, prob-pairwise-not-mutual, prob-independent-complements, prob-conditioning-breaks-independence |
| 事象と確率 | 条件付き確率 | card | prob-conditional-multiplication, prob-chain-rule-three, prob-conditioning-breaks-independence, prob-conditional-definition-direct |
| 事象と確率 | ベイズの定理 | card | prob-bayes-diagnostic |
| 事象と確率 | 包除原理 | card | prob-inclusion-exclusion, prob-inclusion-exclusion-three |
| 確率分布と母関数 | 確率関数 | card | prob-pmf-normalization, prob-cdf-from-pmf |
| 確率分布と母関数 | 確率密度関数 | card | prob-density-normalization, prob-cdf-from-density, prob-density-from-cdf-derivative |
| 確率分布と母関数 | 累積分布関数 | card | prob-cdf-from-pmf, prob-cdf-from-density, prob-density-from-cdf-derivative, prob-cdf-jump-mass, prob-cdf-validity, prob-interval-from-cdf, prob-cdf-endpoint-choice, prob-mixed-cdf |
| 確率分布と母関数 | 生存関数 | card | prob-survival-hazard, prob-survival-from-cdf, prob-survival-from-hazard |
| 確率分布と母関数 | 危険率 | card | prob-survival-hazard, prob-cumulative-hazard, prob-survival-from-hazard |
| 確率分布と母関数 | 同時分布 | card | prob-marginal-density, prob-joint-factorization-independence, prob-discrete-marginal, prob-joint-cdf-from-density, prob-rectangle-from-joint-cdf, prob-joint-density-normalization, prob-joint-pmf-normalization, prob-discrete-independence-cross-product, prob-joint-cdf-independence |
| 確率分布と母関数 | 周辺分布 | card | prob-marginal-density, prob-discrete-marginal, prob-mixture-marginal |
| 確率分布と母関数 | 条件付き分布 | card | prob-conditional-density, prob-discrete-conditional, prob-conditional-equals-marginal, prob-truncated-conditional-density, prob-density-bayes-two-class, prob-conditional-cdf-from-density |
| 確率分布と母関数 | 確率母関数 | card | prob-pgf-moments, prob-pgf-recover-pmf, prob-pgf-binomial, prob-pgf-geometric, prob-pgf-poisson, prob-pgf-independent-sum, prob-pgf-thinning, prob-pgf-factorial-moment, prob-pgf-validity |
| 確率分布と母関数 | モーメント母関数（積率母関数） | card | dist-mgf-poisson, prob-mgf-independent-sum, prob-mgf-mean-variance, prob-mgf-affine-transform, prob-mgf-iid-sum, prob-mgf-exponential-domain, prob-mgf-gamma, prob-mgf-identify-normal, prob-mgf-nonexistence, prob-mgf-uniqueness-domain |
| 分布の特性値 | モーメント | card | prob-moment-central-relation, prob-moment-third-central |
| 分布の特性値 | 期待値 | card | prob-expected-value-linearity, prob-expected-value-discrete, prob-expected-value-integral, prob-expected-value-function |
| 分布の特性値 | 分散 | card | dist-variance-moment, prob-variance-affine, prob-variance-independent-sum |
| 分布の特性値 | 標準偏差 | card | prob-standard-deviation-standardize |
| 分布の特性値 | 歪度 | card | prob-skewness-definition, prob-skewness-shape |
| 分布の特性値 | 尖度 | card | prob-kurtosis-definition, prob-kurtosis-shape |
| 分布の特性値 | 変動係数 | card | prob-coefficient-of-variation |
| 分布の特性値 | パーセント点 | card | prob-percentile-from-cdf |
| 分布の特性値 | 中央値 | card | prob-median-from-density |
| 分布の特性値 | 四分位数 | card | prob-quartiles-iqr |
| 分布の特性値 | 範囲 | card | prob-range-definition |
| 分布の特性値 | 四分位範囲 | card | prob-quartiles-iqr |
| 分布の特性値 | 最頻値 | card | prob-mode-from-density |
| 分布の特性値 | 共分散 | card | prob-covariance-computation |
| 分布の特性値 | 相関係数 | card | prob-correlation-coefficient, prob-correlation-independence |
| 分布の特性値 | 偏相関係数 | card | prob-partial-correlation |
| 変数変換 | 変数変換 | card | dist-jacobian-scale, prob-transform-inverse-cdf, prob-transform-nonmonotonic, prob-transform-jacobian-2d, prob-transform-ratio, prob-transform-log |
| 変数変換 | 確率変数の線形結合 | card | dist-convolution-uniform, prob-transform-sum-density, prob-linear-combination-normal, prob-linear-combination-moments |
| 極限定理と確率分布の近似 | 大数の弱法則 | planned |  |
| 極限定理と確率分布の近似 | 中心極限定理 | planned |  |
| 極限定理と確率分布の近似 | 二項分布の正規近似とポアソン近似 | planned |  |
| 極限定理と確率分布の近似 | 少数法則 | planned |  |
| 極限定理と確率分布の近似 | 連続修正 | planned |  |
| 離散型分布 | 一様分布 | planned |  |
| 離散型分布 | ベルヌーイ分布 | planned |  |
| 離散型分布 | 二項分布 | planned |  |
| 離散型分布 | 超幾何分布 | planned |  |
| 離散型分布 | 幾何分布 | planned |  |
| 離散型分布 | ポアソン分布 | planned |  |
| 離散型分布 | 負の二項分布 | planned |  |
| 離散型分布 | 多項分布 | planned |  |
| 連続型分布 | 一様分布 | planned |  |
| 連続型分布 | 正規分布（ガウス分布） | planned |  |
| 連続型分布 | 指数分布 | planned |  |
| 連続型分布 | ガンマ分布 | planned |  |
| 連続型分布 | ベータ分布 | planned |  |
| 連続型分布 | コーシー分布 | planned |  |
| 連続型分布 | 対数正規分布 | planned |  |
| 連続型分布 | ワイブル分布 | planned |  |
| 連続型分布 | ロジスティック分布 | planned |  |
| 連続型分布 | 多変量正規分布 | planned |  |
| 標本分布 | t分布 | planned |  |
| 標本分布 | カイ二乗分布 | planned |  |
| 標本分布 | F分布 | planned |  |
| 母集団と標本・統計量 | 十分統計量 | planned |  |
| 母集団と標本・統計量 | ネイマンの分解定理 | planned |  |
| 母集団と標本・統計量 | 順序統計量 | planned |  |
| 尤度と最尤推定 | 尤度関数 | planned |  |
| 尤度と最尤推定 | 対数尤度関数 | planned |  |
| 尤度と最尤推定 | 有効スコア関数 | planned |  |
| 尤度と最尤推定 | 最尤推定 | planned |  |
| 各種推定法 | モーメント法 | planned |  |
| 各種推定法 | 最小二乗法 | planned |  |
| 各種推定法 | 線形推定（BLUE） | planned |  |
| 各種推定法 | その他の手法 | planned |  |
| 点推定量の性質 | 不偏性 | planned |  |
| 点推定量の性質 | 一致性 | planned |  |
| 点推定量の性質 | 十分性 | planned |  |
| 点推定量の性質 | 有効性 | planned |  |
| 点推定量の性質 | 推定量の相対効率 | planned |  |
| モデル評価基準 | カルバック・ライブラー情報量 | planned |  |
| モデル評価基準 | 情報量規準AIC | planned |  |
| モデル評価基準 | クロスバリデーション | planned |  |
| 漸近的性質など | クラーメル・ラオの不等式 | planned |  |
| 漸近的性質など | フィッシャー情報量（1次元） | planned |  |
| 漸近的性質など | 最尤推定量の漸近正規性 | planned |  |
| 漸近的性質など | デルタ法 | planned |  |
| 区間推定 | 信頼係数 | planned |  |
| 区間推定 | 信頼区間の構成 | planned |  |
| 区間推定 | 被覆確率 | planned |  |
| 検定の基礎 | 仮説 | planned |  |
| 検定の基礎 | 検定統計量 | planned |  |
| 検定の基礎 | P値 | planned |  |
| 検定の基礎 | 有意水準 | planned |  |
| 検定の基礎 | 棄却域 | planned |  |
| 検定の基礎 | 第一種の過誤 | planned |  |
| 検定の基礎 | 第二種の過誤 | planned |  |
| 検定の基礎 | 検出力（検定力） | planned |  |
| 検定の基礎 | 検出力曲線 | planned |  |
| 検定法の導出 | ネイマン・ピアソンの基本定理 | planned |  |
| 検定法の導出 | 尤度比検定 | planned |  |
| 検定法の導出 | ワルド型検定 | planned |  |
| 検定法の導出 | スコア型検定 | planned |  |
| 正規分布に関する検定 | 平均値と分散に関する検定 | planned |  |
| 正規分布に関する検定 | 複数の平均に関する検定 | planned |  |
| 種々の検定法 | 二項分布・ポアソン分布など基本的な分布に関する検定 | planned |  |
| 種々の検定法 | 適合度の検定 | planned |  |
| 種々の検定法 | ノンパラメトリック検定 | planned |  |
| 分散分析 | 一元配置分散分析 | planned |  |
| 分散分析 | 二元配置分散分析 | planned |  |
| 分散分析 | 交互作用 | planned |  |
| 分散分析 | 共分散分析 | planned |  |
| 分散分析 | 多重比較 | planned |  |
| 回帰分析 | 線形単回帰 | planned |  |
| 回帰分析 | 線形重回帰 | planned |  |
| 回帰分析 | 最小二乗推定 | planned |  |
| 回帰分析 | 回帰の分散分析 | planned |  |
| 回帰分析 | 重相関係数 | planned |  |
| 回帰分析 | 決定係数 | planned |  |
| 回帰分析 | 残差 | planned |  |
| 回帰分析 | 変数変換 | planned |  |
| 回帰分析 | 平均への回帰（回帰効果） | planned |  |
| 分割表の解析 | カイ二乗検定 | planned |  |
| 分割表の解析 | フィッシャー検定 | planned |  |
| 分割表の解析 | マクネマー検定 | planned |  |
| 分割表の解析 | イェーツの補正 | planned |  |
| ノンパラメトリック法 | 符号検定 | planned |  |
| ノンパラメトリック法 | ウィルコクソン順位和検定（マン・ホイットニーU検定） | planned |  |
| ノンパラメトリック法 | ウィルコクソン符号付き順位和検定 | planned |  |
| ノンパラメトリック法 | 順位相関係数 | planned |  |
| 不完全データ | 欠測（欠損） | planned |  |
| 不完全データ | 打ち切り | planned |  |
| 不完全データ | トランケーション | planned |  |
| シミュレーション | 乱数 | planned |  |
| シミュレーション | モンテカルロシミュレーション | planned |  |
| シミュレーション | MCMC | planned |  |
| シミュレーション | ブートストラップ | planned |  |
| ベイズ法 | 事前分布 | planned |  |
| ベイズ法 | 事後分布 | planned |  |
| ベイズ法 | 階層ベイズモデル | planned |  |
| ベイズ法 | ギブスサンプリング | planned |  |
| 研究の種類 | 実験研究 | planned |  |
| 研究の種類 | 観察研究 | planned |  |
| 研究の種類 | 調査 | planned |  |
| 標本調査法 | 完全無作為抽出 | planned |  |
| 標本調査法 | 層化抽出 | planned |  |
| 標本調査法 | 二段階抽出 | planned |  |
| 標本調査法 | サンプルサイズの設計 | planned |  |
| 実験計画法 | フィッシャーの3原則 | planned |  |
| 実験計画法 | 一元配置法 | planned |  |
| 実験計画法 | 二元配置法 | planned |  |
| 実験計画法 | ブロック化 | planned |  |
| 実験計画法 | 乱塊法 | planned |  |
| 実験計画法 | 一部実施要因計画 | planned |  |
| 重回帰分析 | 重回帰モデル | planned |  |
| 重回帰分析 | 変数選択 | planned |  |
| 重回帰分析 | 残差分析 | planned |  |
| 重回帰分析 | 一般化最小二乗推定 | planned |  |
| 重回帰分析 | ガウス・マルコフの定理 | planned |  |
| 重回帰分析 | 多重共線性 | planned |  |
| 重回帰分析 | L1正則化法 | planned |  |
| 重回帰分析 | 回帰診断法 | planned |  |
| 各種多変量解析法 | 主成分分析 | planned |  |
| 各種多変量解析法 | 因子分析 | planned |  |
| 各種多変量解析法 | 判別分析 | planned |  |
| 各種多変量解析法 | クラスター分析 | planned |  |
| 各種多変量解析法 | ロジスティック回帰分析 | planned |  |
| 各種多変量解析法 | プロビット分析 | planned |  |
| 各種多変量解析法 | トービット分析 | planned |  |
| 各種多変量解析法 | 一般化線形モデル | planned |  |
| 各種多変量解析法 | 非線形回帰モデル | planned |  |
| 各種多変量解析法 | サポートベクターマシン | planned |  |
| 確率過程 | マルコフ連鎖 | planned |  |
| 確率過程 | ランダムウォーク | planned |  |
| 確率過程 | ポアソン過程 | planned |  |
| 確率過程 | ブラウン運動 | planned |  |
| 時系列解析 | ARIMAモデル | planned |  |
| 時系列解析 | 状態空間モデル | planned |  |
| 多変量解析法 | 多変量正規分布 | planned |  |
| 多変量解析法 | 平均ベクトル | planned |  |
| 多変量解析法 | 分散共分散行列 | planned |  |
| 多変量解析法 | 相関行列 | planned |  |
| 多変量解析法 | 固有値・固有ベクトル | planned |  |
| 確率過程 | ランダムウォーク | planned |  |
| 確率過程 | マルコフ過程 | planned |  |
| 確率過程 | ポアソン過程 | planned |  |
| 確率過程 | マルコフ連鎖 | planned |  |
| 確率過程 | 時系列解析 | planned |  |
| 確率過程 | 自己回帰過程 | planned |  |
| 確率過程 | 移動平均過程 | planned |  |
| 確率過程 | ARIMA過程 | planned |  |
| 線形推測 | 線形モデル | planned |  |
| 線形推測 | 一般化線形モデル | planned |  |
| 線形推測 | 線形結合の分布 | planned |  |
| 線形推測 | 線形対比 | planned |  |
| 線形推測 | 線形制約 | planned |  |
| 漸近理論 | 大数の法則 | planned |  |
| 漸近理論 | 中心極限定理 | planned |  |
| 漸近理論 | 最尤推定量の漸近正規性 | planned |  |
| 漸近理論 | 漸近分散 | planned |  |
| 漸近理論 | 一致性 | planned |  |
| 漸近理論 | デルタ法 | planned |  |
| 品質管理 | 管理図 | planned |  |
| 品質管理 | 信頼性 | planned |  |
| 品質管理 | 保全性 | planned |  |
| 品質管理 | プロセス管理 | planned |  |
| 品質管理 | 工程能力指数 | planned |  |
| 実験計画 | 実験の計画と実施 | planned |  |
| 実験計画 | 固定効果 | planned |  |
| 実験計画 | 変量効果 | planned |  |
| 実験計画 | 交絡因子 | planned |  |
| 実験計画 | ブロック化 | planned |  |
| 実験計画 | 直交表 | planned |  |
| 実験計画 | 交絡法 | planned |  |
