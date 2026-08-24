# 統計検定1級 統計数理 大問演習 — 正式演習目次

最終更新: 2026-08-25

## 設計方針

この問題集は、リポジトリ内に蓄積してきた統計検定1級「統計数理」の過去問型再構成演習とシラバス補完問題を、独立した演習コーパスとして再編したものである。

- 既存の本番型大問 **95題** は削らず、すべてこのディレクトリへ移動した。
- 内訳は **過去問型再構成56題 + 既存シラバス補完39題**。
- 単独問題集として見たときの穴を再監査し、横断補完を **5題** だけ追加した。
- したがって現時点では **100題** だが、100題に合わせるために削減・水増ししたものではない。必要な論点が見つかれば今後も増やす。
- 公式過去問の問題文・図表を転載せず、年度・問番号は出題テーマ・構造の参照情報として扱う。

## 学習層

- **Core**: 先に解く主戦力。頻出の骨格・他分野への転用性が高い。
- **Standard**: 変形耐性とシラバスの幅を作る。
- **Advanced**: 証明・非正則・漸近・二次形式など、難問対応と理論の穴埋め。

現時点の配分は **Core 48 / Standard 32 / Advanced 20**。題数を固定するルールではない。

## 評価軸

**演習価値**は、出題頻度だけでなく、他論点への転用性、理論の中心性、本番で得点源になりやすいかを含めて S/A/B/C で評価する。

- **S**: 最優先。統計数理の骨格となり、複数分野へ波及する。
- **A**: 高優先。頻出または重要な変形パターン。
- **B**: 網羅性・変形耐性を上げる補強問題。
- **C**: 低頻度だが必要に応じて穴を塞ぐ補完。

**難度**は大問として解いたときの想定難度で、`C < B < A < S` の順に難しい。

## 「過去問対応」の読み方

年度・問番号は「この問題文がそのまま出題された」という意味ではなく、同テーマまたは近接構造を確認した代表過去問を示す。`シラバス補完` は独自作成問題である。

## 分野別配分

| 分野 | 題数 |
| --- | ---: |
| 確率・分布 | 24 |
| 多変量正規 | 15 |
| 推定 | 22 |
| 検定 | 13 |
| 回帰・線形モデル | 12 |
| Monte Carlo | 9 |
| 横断補完 | 5 |
| **合計** | **100** |

## 100大問

### 確率・分布

| No. | 層 | 演習価値 | 難度 | 大問テーマ | 種別 | 過去問対応 | 公式シラバス対応項目 | 収録先 |
| ---: | --- | :---: | :---: | --- | --- | --- | --- | --- |
| 01 | Core | S | A | 一様分布の順序統計量：十分性・条件付き期待値・Rao–Blackwell | 過去問型再構成 | 2024 問5 | 確率分布／順序統計量／十分統計量 | [問題・解答](01_probability_distributions/past_exam_reconstructed_top10.md) |
| 02 | Core | S | A | Gamma–Beta関係：再生性・Jacobian・比の分布 | 過去問型再構成 | 2014 問2 | 確率分布／変数変換 | [問題・解答](01_probability_distributions/past_exam_reconstructed_top10.md) |
| 03 | Core | S | A | Poisson–Gamma混合から負の二項分布を導く | 過去問型再構成 | 2022 問3 | 混合分布／モーメント | [問題・解答](01_probability_distributions/past_exam_reconstructed_top10.md) |
| 04 | Core | A | B | カイ二乗分布：MGF・再生性・Betaとの接続 | 過去問型再構成 | 2012 問2 | 標本分布／カイ二乗分布／変数変換 | [問題・解答](01_probability_distributions/past_exam_reconstructed_top10.md) |
| 05 | Core | A | A | カイ二乗・F・Cauchy：比と非単調変換 | 過去問型再構成 | 2017 問5 | 標本分布／F分布／Cauchy分布 | [問題・解答](01_probability_distributions/past_exam_reconstructed_top10.md) |
| 06 | Core | A | B | 確率積分変換と一様分布・順序統計量 | 過去問型再構成 | 2012 問1 | 確率変数の変換／順序統計量 | [問題・解答](01_probability_distributions/past_exam_reconstructed_top10.md) |
| 07 | Core | S | B | 確率空間・独立性：ペア独立と相互独立 | 過去問型再構成 | 2022 問1 | 事象と確率／独立性 | [問題・解答](01_probability_distributions/past_exam_reconstructed_top10.md) |
| 08 | Core | A | B | 条件付き確率・全確率・独立性 | 過去問型再構成 | 2014 問1 | 条件付き確率／独立性 | [問題・解答](01_probability_distributions/past_exam_reconstructed_top10.md) |
| 09 | Core | A | A | 指数分布と一様分布：畳み込み・支持集合・依存 | 過去問型再構成 | 2021 問1 | 連続分布／畳み込み／変数変換 | [問題・解答](01_probability_distributions/past_exam_reconstructed_top10.md) |
| 10 | Core | S | A | 順序統計量の密度・同時密度・range | 過去問型再構成 | 2018 問5 | 順序統計量／同時分布 | [問題・解答](01_probability_distributions/past_exam_reconstructed_top10.md) |
| 11 | Standard | A | A | 二変量一様分布の条件付き分布・幾何確率・相関 | 過去問型再構成 | 2022 問2 | 多変量分布／条件付き分布 | [問題・解答](01_probability_distributions/past_exam_reconstructed_11_15.md) |
| 12 | Standard | A | A | カイ二乗分布・Cauchy分布・逆関数法 | 過去問型再構成 | 2023 問2 | 確率分布／乱数生成／変数変換 | [問題・解答](01_probability_distributions/past_exam_reconstructed_11_15.md) |
| 13 | Standard | A | A | 指数分布のMGF・指数傾斜・モーメント | 過去問型再構成 | 2023 問3 | モーメント母関数／指数分布 | [問題・解答](01_probability_distributions/past_exam_reconstructed_11_15.md) |
| 14 | Standard | A | A | 中心モーメントと標本中心化・不偏推定 | 過去問型再構成 | 2021 問4 | モーメント／標本分布／推定 | [問題・解答](01_probability_distributions/past_exam_reconstructed_11_15.md) |
| 15 | Standard | A | A | 標本平均の歪度・尖度と正規近似 | 過去問型再構成 | 2017 問1 | 高次モーメント／中心極限定理 | [問題・解答](01_probability_distributions/past_exam_reconstructed_11_15.md) |
| 16 | Standard | B | B | 依存する一様分布・相関・単調変換 | 過去問型再構成 | 2013 問1 | 共分散・相関／変数変換 | [問題・解答](01_probability_distributions/past_exam_reconstructed_16_19.md) |
| 17 | Advanced | A | S | 二項分布のPGFとChernoff型確率評価 | 過去問型再構成 | 2019 問1 | 確率母関数／確率不等式 | [問題・解答](01_probability_distributions/past_exam_reconstructed_16_19.md) |
| 18 | Core | A | A | 二項からPoissonへの極限・再生性・正規近似 | 過去問型再構成 | 2017 問3 | 分布の極限／Poisson分布／中心極限定理 | [問題・解答](01_probability_distributions/past_exam_reconstructed_16_19.md) |
| 19 | Standard | A | A | 経験分布・tail integral・混合分布と重尾 | 過去問型再構成 | 2024 問4 | 経験分布関数／混合分布 | [問題・解答](01_probability_distributions/past_exam_reconstructed_16_19.md) |
| 20 | Standard | A | A | 一様分布の最大順序統計量と極値極限 | シラバス補完 | シラバス補完 | 順序統計量／確率変数の収束 | [問題・解答](01_probability_distributions/predicted_exam_problems_syllabus_gaps.md) |
| 21 | Standard | A | A | 多項分布の共分散行列と多変量中心極限定理 | シラバス補完 | シラバス補完 | 多項分布／共分散行列／中心極限定理 | [問題・解答](01_probability_distributions/predicted_exam_problems_syllabus_gaps.md) |
| 22 | Standard | A | A | 階層Bernoulli混合：全期待値・全分散・級内相関 | シラバス補完 | シラバス補完 | 混合分布／条件付き期待値・分散 | [問題・解答](01_probability_distributions/predicted_exam_problems_syllabus_gaps.md) |
| 23 | Advanced | B | A | 切断正規分布の正規化・平均・分散 | シラバス補完 | シラバス補完 | 切断分布／条件付き分布 | [問題・解答](01_probability_distributions/predicted_exam_problems_syllabus_gaps.md) |
| 24 | Advanced | A | S | 特性関数による中心極限定理の導出 | シラバス補完 | シラバス補完 | 特性関数／中心極限定理 | [問題・解答](01_probability_distributions/predicted_exam_problems_syllabus_gaps.md) |

### 多変量正規

| No. | 層 | 演習価値 | 難度 | 大問テーマ | 種別 | 過去問対応 | 公式シラバス対応項目 | 収録先 |
| ---: | --- | :---: | :---: | --- | --- | --- | --- | --- |
| 25 | Core | S | S | 多変量正規の線形変換・独立性・残差化 | 過去問型再構成 | 2021 問5 | 多変量正規分布／線形変換／独立性 | [問題・解答](02_multivariate_normal/multivariate_normal_past_exam_reconstructed_01_06.md) |
| 26 | Core | S | S | 3変量正規の条件付き分布・偏相関・条件付き独立 | 過去問型再構成 | 2012 問5 | 条件付き正規分布／偏相関 | [問題・解答](02_multivariate_normal/multivariate_normal_past_exam_reconstructed_01_06.md) |
| 27 | Core | A | A | 2変量正規の条件付き分布とMarkov構造 | 過去問型再構成 | 2018 問4 | 条件付き分布／多変量正規 | [問題・解答](02_multivariate_normal/multivariate_normal_past_exam_reconstructed_01_06.md) |
| 28 | Core | A | A | 正規部分和の周辺・条件付き分布とGaussian bridge | 過去問型再構成 | 2013 問2 | 多変量正規／条件付き分布 | [問題・解答](02_multivariate_normal/multivariate_normal_past_exam_reconstructed_01_06.md) |
| 29 | Standard | A | A | 相関係数・二値化・切断正規による相関減衰 | 過去問型再構成 | 2015 問5 | 相関係数／条件付き分布 | [問題・解答](02_multivariate_normal/multivariate_normal_past_exam_reconstructed_01_06.md) |
| 30 | Core | A | B | 正規分布の線形変換・Bayes・条件付き正規 | 過去問型再構成 | 2017 問4 | 多変量正規／条件付き分布 | [問題・解答](02_multivariate_normal/multivariate_normal_past_exam_reconstructed_01_06.md) |
| 31 | Advanced | S | S | 等相関行列：固有値・正定値性・精度行列・偏相関 | シラバス補完 | シラバス補完 | 相関行列／偏相関／二次形式 | [問題・解答](02_multivariate_normal/syllabus_gap_predicted_01_08.md) |
| 32 | Standard | A | A | 正規ベクトルを標本和で条件付けるGaussian bridge | シラバス補完 | シラバス補完 | 条件付き分布／線形変換 | [問題・解答](02_multivariate_normal/syllabus_gap_predicted_01_08.md) |
| 33 | Advanced | S | S | 射影行列と二次形式から標本平均・標本分散を導く | シラバス補完 | シラバス補完 | 二次形式／多変量正規／カイ二乗分布 | [問題・解答](02_multivariate_normal/syllabus_gap_predicted_01_08.md) |
| 34 | Advanced | A | A | 精度行列からGaussian条件付き独立を読む | シラバス補完 | シラバス補完 | 精度行列／偏相関／条件付き独立 | [問題・解答](02_multivariate_normal/syllabus_gap_predicted_01_08.md) |
| 35 | Advanced | B | A | 2変量正規の切断・選択後モーメント | シラバス補完 | シラバス補完 | 切断分布／条件付き分布 | [問題・解答](02_multivariate_normal/syllabus_gap_predicted_01_08.md) |
| 36 | Standard | A | A | ノイズ付き線形観測の条件付き正規分布 | シラバス補完 | シラバス補完 | 線形変換／条件付き正規 | [問題・解答](02_multivariate_normal/syllabus_gap_predicted_01_08.md) |
| 37 | Advanced | B | S | 逐次残差化とCholesky型標準化 | シラバス補完 | シラバス補完 | 多変量正規／独立性／行列分解 | [問題・解答](02_multivariate_normal/syllabus_gap_predicted_01_08.md) |
| 38 | Advanced | B | A | 非心Mahalanobis二次形式と非心カイ二乗 | シラバス補完 | シラバス補完 | 二次形式／非心カイ二乗 | [問題・解答](02_multivariate_normal/syllabus_gap_predicted_01_08.md) |
| 39 | Advanced | S | S | 条件付き正規分布公式を平方完成から導出する | シラバス補完 | シラバス補完 | 多変量正規／条件付き分布／ブロック行列 | [問題・解答](02_multivariate_normal/syllabus_gap_predicted_09_conditional_normal_derivation.md) |

### 推定

| No. | 層 | 演習価値 | 難度 | 大問テーマ | 種別 | 過去問対応 | 公式シラバス対応項目 | 収録先 |
| ---: | --- | :---: | :---: | --- | --- | --- | --- | --- |
| 40 | Core | S | A | Fisher情報量・Delta法・MLEの漸近効率 | 過去問型再構成 | 2012 問3 | 最尤法／Fisher情報量／Delta法 | [問題・解答](03_estimation/past_exam_reconstructed_01_05.md) |
| 41 | Core | S | A | 一様分布の完備十分統計量とLehmann–Scheffé | 過去問型再構成 | 2019 問3 | 十分統計量／完備性／UMVU | [問題・解答](03_estimation/past_exam_reconstructed_01_05.md) |
| 42 | Core | S | A | 正規分布のCramér–Rao下限と効率性 | 過去問型再構成 | 2016 問1 | Fisher情報量／Cramér–Rao | [問題・解答](03_estimation/past_exam_reconstructed_01_05.md) |
| 43 | Core | S | A | 二項モデル：十分性・MLE・MSE・縮小推定 | 過去問型再構成 | 2024 問3 | 最尤推定／十分性／MSE | [問題・解答](03_estimation/past_exam_reconstructed_01_05.md) |
| 44 | Core | S | A | 台が母数に依存するモデルの非正則MLE・不偏化 | 過去問型再構成 | 2024 問2 | 最尤推定／順序統計量／非正則モデル | [問題・解答](03_estimation/past_exam_reconstructed_01_05.md) |
| 45 | Core | S | A | カイ二乗ピボットによる母分散・母標準偏差の信頼区間 | 過去問型再構成 | 2018 問1 | 区間推定／カイ二乗分布 | [問題・解答](03_estimation/past_exam_reconstructed_06_10.md) |
| 46 | Core | A | A | モーメント推定量の一致性・Delta法・漸近分散比較 | 過去問型再構成 | 2015 問1 | モーメント法／一致性／Delta法 | [問題・解答](03_estimation/past_exam_reconstructed_06_10.md) |
| 47 | Standard | A | A | 二項比率の推定量・Wald区間・被覆確率 | 過去問型再構成 | 2013 問3 | 区間推定／被覆確率 | [問題・解答](03_estimation/past_exam_reconstructed_06_10.md) |
| 48 | Core | S | A | Student化とt分布による母平均の厳密信頼区間 | 過去問型再構成 | 2014 問3 | t分布／区間推定 | [問題・解答](03_estimation/past_exam_reconstructed_06_10.md) |
| 49 | Core | S | A | Poisson母数のMLE・Fisher情報量・信頼区間 | 過去問型再構成 | 2021 問3 | Poisson分布／最尤推定／区間推定 | [問題・解答](03_estimation/past_exam_reconstructed_06_10.md) |
| 50 | Standard | A | A | 二項分布の2母数モーメント法・識別・一致性 | 過去問型再構成 | 2018 問3 | モーメント法／識別可能性 | [問題・解答](03_estimation/past_exam_reconstructed_11_17.md) |
| 51 | Advanced | A | S | 位置母数付き指数分布の非正則2母数MLE | 過去問型再構成 | 2019 問2 | 非正則尤度／順序統計量 | [問題・解答](03_estimation/past_exam_reconstructed_11_17.md) |
| 52 | Standard | A | A | Pareto母数のMLE・有限標本バイアス・漸近効率 | 過去問型再構成 | 2022 問4 | Pareto分布／最尤推定 | [問題・解答](03_estimation/past_exam_reconstructed_11_17.md) |
| 53 | Core | A | B | Poisson母数推定：不偏性・一致性・MSE | 過去問型再構成 | 2023 問1 | 不偏性／一致性／MSE | [問題・解答](03_estimation/past_exam_reconstructed_11_17.md) |
| 54 | Standard | A | A | 一様分布の最大順序統計量による不偏推定・分散比較 | 過去問型再構成 | 2017 問2 | 順序統計量／不偏推定 | [問題・解答](03_estimation/past_exam_reconstructed_11_17.md) |
| 55 | Core | S | A | 指数分布の十分統計量・完備性・UMVU | 過去問型再構成 | 2016 問2 | 十分性／完備性／UMVU | [問題・解答](03_estimation/past_exam_reconstructed_11_17.md) |
| 56 | Standard | A | A | 超幾何分布の不偏推定と有限母集団補正 | 過去問型再構成 | 2018 問2 | 有限母集団／不偏推定 | [問題・解答](03_estimation/past_exam_reconstructed_11_17.md) |
| 57 | Core | S | A | 逆分散重み付き推定：BLUE・MLE・Cramér–Rao | シラバス補完 | シラバス補完 | 線形不偏推定／BLUE／Fisher情報量 | [問題・解答](03_estimation/syllabus_gap_predicted_01_05.md) |
| 58 | Standard | A | A | 層化抽出・Horvitz–Thompson推定量・Neyman配分 | シラバス補完 | シラバス補完 | 標本調査／層化抽出／有限母集団 | [問題・解答](03_estimation/syllabus_gap_predicted_01_05.md) |
| 59 | Core | S | A | Beta–Binomial共役Bayes推定と事後予測 | シラバス補完 | シラバス補完 | Bayes推定／共役事前分布／予測分布 | [問題・解答](03_estimation/syllabus_gap_predicted_01_05.md) |
| 60 | Standard | A | A | 右打切り指数寿命の観測データ尤度 | シラバス補完 | シラバス補完 | 不完全データ／打切り／最尤推定 | [問題・解答](03_estimation/syllabus_gap_predicted_01_05.md) |
| 61 | Advanced | A | S | 2成分Poisson混合分布のEMアルゴリズム | シラバス補完 | シラバス補完 | 不完全データ／EM法／混合分布 | [問題・解答](03_estimation/syllabus_gap_predicted_01_05.md) |

### 検定

| No. | 層 | 演習価値 | 難度 | 大問テーマ | 種別 | 過去問対応 | 公式シラバス対応項目 | 収録先 |
| ---: | --- | :---: | :---: | --- | --- | --- | --- | --- |
| 62 | Core | S | S | 多項分布のLRTとPearson適合度検定の漸近同値 | 過去問型再構成 | 2013 問5 | 尤度比検定／適合度検定／漸近理論 | [問題・解答](04_hypothesis_testing/testing_past_exam_reconstructed_01_05.md) |
| 63 | Core | S | A | Neyman–Pearson補題・単調尤度比・UMP検定 | 過去問型再構成 | 2015 問2 | 最強力検定／UMP／検出力 | [問題・解答](04_hypothesis_testing/testing_past_exam_reconstructed_01_05.md) |
| 64 | Advanced | S | S | 母平均の両側UMPU検定 | 過去問型再構成 | 2012 問4 | UMPU検定／不偏検定 | [問題・解答](04_hypothesis_testing/testing_past_exam_reconstructed_01_05.md) |
| 65 | Core | S | S | F検定・測定法比較・非心度と検出力 | 過去問型再構成 | 2014 問4 | F検定／検出力／線形モデル | [問題・解答](04_hypothesis_testing/testing_past_exam_reconstructed_01_05.md) |
| 66 | Core | A | A | 制約付きMLEと尤度比検定 | 過去問型再構成 | 2015 問4 | 尤度比検定／制約付き最尤推定 | [問題・解答](04_hypothesis_testing/testing_past_exam_reconstructed_01_05.md) |
| 67 | Standard | A | A | 順序統計量から帰無分布と棄却域を設計する | 過去問型再構成 | 2013 問4 | 順序統計量／検定 | [問題・解答](04_hypothesis_testing/testing_past_exam_reconstructed_06_08.md) |
| 68 | Standard | A | A | 適合度検定・尤度比検定・自由度 | 過去問型再構成 | 2014 問5 | 適合度検定／尤度比検定 | [問題・解答](04_hypothesis_testing/testing_past_exam_reconstructed_06_08.md) |
| 69 | Advanced | B | A | Cauchy分布に対するNeyman–Pearson最強力検定 | 過去問型再構成 | 2019 問4 | 最強力検定／Cauchy分布 | [問題・解答](04_hypothesis_testing/testing_past_exam_reconstructed_06_08.md) |
| 70 | Core | S | S | BernoulliモデルでLRT・Wald・Score検定を比較する | シラバス補完 | シラバス補完 | 尤度比・Wald・Score検定／漸近理論 | [問題・解答](04_hypothesis_testing/testing_predicted_problems_01_05.md) |
| 71 | Core | S | A | 2標本Poisson率の等値検定を条件付き二項検定へ帰着する | シラバス補完 | シラバス補完 | 正確検定／条件付き分布／nuisance parameter | [問題・解答](04_hypothesis_testing/testing_predicted_problems_01_05.md) |
| 72 | Core | S | A | 正規2標本のF検定とpooled t検定 | シラバス補完 | シラバス補完 | 正規母集団の検定／F・t分布 | [問題・解答](04_hypothesis_testing/testing_predicted_problems_01_05.md) |
| 73 | Standard | A | A | 母相関係数の検定とFisherのz変換 | シラバス補完 | シラバス補完 | 相関係数／漸近検定 | [問題・解答](04_hypothesis_testing/testing_predicted_problems_01_05.md) |
| 74 | Standard | A | A | Wilcoxon順位和検定と並べ替え検定 | シラバス補完 | シラバス補完 | ノンパラメトリック検定／順位検定 | [問題・解答](04_hypothesis_testing/testing_predicted_problems_01_05.md) |

### 回帰・線形モデル

| No. | 層 | 演習価値 | 難度 | 大問テーマ | 種別 | 過去問対応 | 公式シラバス対応項目 | 収録先 |
| ---: | --- | :---: | :---: | --- | --- | --- | --- | --- |
| 75 | Core | S | A | 回帰係数のMLE・Fisher情報量・検定・検出力 | 過去問型再構成 | 2024 問1 | 線形回帰／推定・検定／検出力 | [問題・解答](05_regression_linear_models/regression_linear_model_past_exam_reconstructed_01_05.md) |
| 76 | Advanced | S | S | 射影行列・Cochran型カイ二乗分解・予測誤差 | 過去問型再構成 | 2023 問4 | 線形モデル／射影／二次形式 | [問題・解答](05_regression_linear_models/regression_linear_model_past_exam_reconstructed_01_05.md) |
| 77 | Core | S | A | 重回帰・VIF・欠落変数バイアス・MSE | 過去問型再構成 | 2015 問3 | 重回帰／多重共線性／MSE | [問題・解答](05_regression_linear_models/regression_linear_model_past_exam_reconstructed_01_05.md) |
| 78 | Core | S | A | 線形不偏推定量の分散比較とGauss–Markov | 過去問型再構成 | 2016 問3 | 最小二乗法／BLUE | [問題・解答](05_regression_linear_models/regression_linear_model_past_exam_reconstructed_01_05.md) |
| 79 | Core | A | A | 分散分析・検定・欠測データ | 過去問型再構成 | 2022 問5 | 分散分析／欠測 | [問題・解答](05_regression_linear_models/regression_linear_model_past_exam_reconstructed_01_05.md) |
| 80 | Core | S | S | 一般線形仮説・制約付き最小二乗・partial F検定 | シラバス補完 | シラバス補完 | 一般線形モデル／F検定 | [問題・解答](05_regression_linear_models/syllabus_gap_predicted_01_07.md) |
| 81 | Core | S | A | 二元配置分散分析と交互作用 | シラバス補完 | シラバス補完 | 二元配置分散分析／交互作用 | [問題・解答](05_regression_linear_models/syllabus_gap_predicted_01_07.md) |
| 82 | Standard | A | A | 共分散分析：共通傾きと調整済み処置効果 | シラバス補完 | シラバス補完 | 共分散分析 | [問題・解答](05_regression_linear_models/syllabus_gap_predicted_01_07.md) |
| 83 | Standard | A | A | 多重比較：Bonferroni法とScheffé法 | シラバス補完 | シラバス補完 | 多重比較 | [問題・解答](05_regression_linear_models/syllabus_gap_predicted_01_07.md) |
| 84 | Standard | A | A | 重回帰のpartial R²と追加平方和 | シラバス補完 | シラバス補完 | 重回帰／決定係数 | [問題・解答](05_regression_linear_models/syllabus_gap_predicted_01_07.md) |
| 85 | Standard | A | A | 変数変換・対数回帰・残差診断 | シラバス補完 | シラバス補完 | 回帰分析／変数変換／残差 | [問題・解答](05_regression_linear_models/syllabus_gap_predicted_01_07.md) |
| 86 | Standard | B | B | 2変量正規分布と平均への回帰 | シラバス補完 | シラバス補完 | 線形回帰／平均への回帰 | [問題・解答](05_regression_linear_models/syllabus_gap_predicted_01_07.md) |

### Monte Carlo

| No. | 層 | 演習価値 | 難度 | 大問テーマ | 種別 | 過去問対応 | 公式シラバス対応項目 | 収録先 |
| ---: | --- | :---: | :---: | --- | --- | --- | --- | --- |
| 87 | Core | S | A | 標準正規確率を3通りのMonte Carlo推定量で推定し分散比較 | 過去問型再構成 | 2016 問4 | Monte Carlo法／不偏推定／シミュレーション誤差 | [問題・解答](06_monte_carlo/monte_carlo_past_exam_reconstructed_2016_q4.md) |
| 88 | Core | A | A | hit-or-miss法と標本平均法の分散比較 | シラバス補完 | シラバス補完 | Monte Carlo積分／シミュレーション誤差 | [問題・解答](06_monte_carlo/syllabus_gap_predicted_monte_carlo_01_08.md) |
| 89 | Standard | A | B | 稀事象確率と相対Monte Carlo誤差 | シラバス補完 | シラバス補完 | シミュレーション誤差 | [問題・解答](06_monte_carlo/syllabus_gap_predicted_monte_carlo_01_08.md) |
| 90 | Core | A | A | 非単調密度に対する棄却法・受理率 | シラバス補完 | シラバス補完 | 棄却法／乱数生成 | [問題・解答](06_monte_carlo/syllabus_gap_predicted_monte_carlo_01_08.md) |
| 91 | Standard | A | A | Box–Muller変換による正規乱数生成 | シラバス補完 | シラバス補完 | 乱数生成／変数変換 | [問題・解答](06_monte_carlo/syllabus_gap_predicted_monte_carlo_01_08.md) |
| 92 | Core | A | B | 実測分散から標準誤差と必要試行数を設計する | シラバス補完 | シラバス補完 | シミュレーション誤差 | [問題・解答](06_monte_carlo/syllabus_gap_predicted_monte_carlo_01_08.md) |
| 93 | Advanced | B | A | 重点サンプリングによるMonte Carlo積分 | シラバス補完 | シラバス補完 | Monte Carlo積分／分散削減 | [問題・解答](06_monte_carlo/syllabus_gap_predicted_monte_carlo_01_08.md) |
| 94 | Advanced | B | A | 制御変量法と最適係数 | シラバス補完 | シラバス補完 | Monte Carlo／分散削減 | [問題・解答](06_monte_carlo/syllabus_gap_predicted_monte_carlo_01_08.md) |
| 95 | Advanced | B | A | 層化Monte Carloと分散比較 | シラバス補完 | シラバス補完 | Monte Carlo積分／分散削減 | [問題・解答](06_monte_carlo/syllabus_gap_predicted_monte_carlo_01_08.md) |

### 横断補完

| No. | 層 | 演習価値 | 難度 | 大問テーマ | 種別 | 過去問対応 | 公式シラバス対応項目 | 収録先 |
| ---: | --- | :---: | :---: | --- | --- | --- | --- | --- |
| 96 | Standard | A | A | Weibull寿命モデル：生存関数・ハザード・累積ハザード・母数解釈 | 追加補完 | シラバス補完 | 連続分布／信頼性・寿命分布 | [問題・解答](07_crosscutting_gaps/supplemental_predicted_01_05.md) |
| 97 | Core | A | A | 幾何分布・負の二項分布：待ち時間・PGF・無記憶性 | 追加補完 | シラバス補完 | 離散分布／確率母関数／待ち時間 | [問題・解答](07_crosscutting_gaps/supplemental_predicted_01_05.md) |
| 98 | Core | S | A | Bayes意思決定：二乗・絶対・0–1損失と事後平均・中央値・MAP | 追加補完 | シラバス補完 | Bayes推定／損失関数／意思決定 | [問題・解答](07_crosscutting_gaps/supplemental_predicted_01_05.md) |
| 99 | Advanced | S | A | 複合帰無仮説の妥当なP値：上限確率とplug-inの危険 | 追加補完 | シラバス補完 | 仮説検定／P値／複合仮説 | [問題・解答](07_crosscutting_gaps/supplemental_predicted_01_05.md) |
| 100 | Advanced | S | S | 一致検定・固定対立・局所対立と漸近検出力 | 追加補完 | シラバス補完 | 検定の一致性／局所対立／漸近検出力 | [問題・解答](07_crosscutting_gaps/supplemental_predicted_01_05.md) |

## 追加補完5題を入れた理由

既存95題は非常に厚いが、旧配置では各章の一般ドリルに任せていたため、この独立問題集へ切り出すと相対的に薄くなる論点があった。そこで、Weibullのハザード表現、幾何・負の二項の待ち時間構造、損失関数まで含むBayes意思決定、複合帰無仮説での妥当なP値、一致検定と局所対立を追加した。

これらは `07_crosscutting_gaps/supplemental_predicted_01_05.md` にまとめ、既存問題と区別して管理する。
