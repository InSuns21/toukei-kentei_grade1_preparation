# シラバス coverage

- 公開カード: 50

| category | cards | subcategory coverage | types |
|---|---:|---:|---|
| 確率 | 3 | 3/3 | formula, calc_step, strategy |
| 分布・変数変換 | 7 | 4/4 | calc_step, recognition, strategy, reverse |
| 推定・漸近論 | 8 | 4/4 | formula, theorem, proof_step, calc_step, strategy |
| 区間推定・検定 | 6 | 4/4 | formula, recognition, strategy, pitfall |
| データ解析 | 7 | 4/4 | formula, calc_step, expansion, strategy |
| 多変量解析 | 4 | 3/3 | formula, theorem, proof_step, strategy |
| 確率過程・時系列 | 5 | 3/3 | calc_step, recognition, strategy |
| 線形・一般化線形モデル | 4 | 3/3 | condition, recognition |
| 品質・信頼性・実験計画 | 6 | 3/3 | formula, recognition, strategy |

## 公式範囲の原子項目

`card` はpilot内で計算カードあり、`reference` は正本に定義あり、`planned` はpilot後の拡張対象を表す。

| item | status | cards |
|---|---|---|
| 事象・条件付き確率・Bayes | card | prob-inclusion-exclusion, prob-bayes-diagnostic |
| 同時・周辺・条件付き分布 | card | multi-conditional-normal |
| 分布関数 | card | prob-cdf-from-pmf, dist-order-max |
| 母関数 | card | dist-mgf-poisson |
| 期待値・分散・共分散 | card | dist-variance-moment, multi-covariance-psd |
| 歪度・尖度 | planned |  |
| 変数変換・畳み込み・順序統計量 | card | dist-jacobian-scale, dist-convolution-uniform, dist-order-max |
| 主要な離散分布 | card | dist-mgf-poisson, est-fisher-bernoulli, test-np-bernoulli |
| 主要な連続分布 | card | dist-gamma-recognition, est-moments-exponential, dist-convolution-uniform |
| t・カイ二乗・F分布 | reference |  |
| 大数の法則 | card | data-monte-carlo-integral |
| 中心極限定理 | card | dist-clt-standardize |
| 二項分布の正規・Poisson近似 | planned |  |
| 十分統計量 | card | est-factorization |
| 尤度・最尤法 | card | est-bernoulli-mle |
| モーメント法 | card | est-moments-exponential |
| 最小二乗法・BLUE | card | data-ols-slope, model-gauss-markov |
| 不偏性・一致性・有効性 | card | est-bias-variance, est-cramer-rao-bernoulli |
| Fisher情報量・Cramér--Rao不等式 | card | est-fisher-bernoulli, est-cramer-rao-bernoulli |
| MLE漸近正規性 | planned |  |
| Delta法 | card | est-delta-log |
| KL情報量 | planned |  |
| AIC | card | est-aic-choice |
| 交差検証 | planned |  |
| 区間推定・被覆確率 | card | test-normal-ci |
| Neyman--Pearson・尤度比検定 | card | test-np-bernoulli, test-likelihood-ratio |
| Wald・Score検定 | planned |  |
| 適合度・ノンパラメトリック検定 | card | test-chi-square-fit, test-sign-test |
| 回帰・分散分析 | card | data-ols-slope, data-anova-decomposition |
| 分割表 | card | data-odds-ratio |
| Bayes法 | card | data-bayes-beta |
| 不完全データ・EM法 | card | data-em-responsibility |
| simulation・bootstrap・Monte Carlo | card | data-bootstrap-mean, data-monte-carlo-integral |
| MCMC | planned |  |
| 多変量正規・共分散・固有値 | card | multi-linear-combination, multi-covariance-psd, multi-pca-eigen |
| Markov過程・連鎖 | card | process-markov-two-step, process-stationary-markov |
| Poisson過程 | card | process-poisson-wait |
| AR過程 | card | process-ar1-stationary |
| MA過程 | card | process-ma1-autocovariance |
| ARIMA過程 | planned |  |
| 一般化線形モデル | card | model-logistic-odds, model-poisson-glm |
| 線形対比・制約 | card | model-contrast |
| 管理図・工程能力 | card | eng-xbar-limits, eng-capability-index |
| 信頼性 | card | eng-series-reliability, eng-exponential-reliability |
| 保全性 | planned |  |
| 固定効果 | card | eng-two-factor-interaction |
| 変量効果 | planned |  |
| ブロック化 | card | eng-blocking |
| 直交表 | planned |  |
| 交絡法 | planned |  |
