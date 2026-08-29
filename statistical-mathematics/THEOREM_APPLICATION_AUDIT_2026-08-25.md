# 統計数理 定理適用監査 2026-08-25

## 目的

前回の導出完全性監査では「設問で求めた式を既知公式として置かない」ことを中心に修正した。しかし、統計検定1級の答案では、途中式が正しくても

- どの定理を使ったか不明
- 定理の仮定を満たすか未確認
- 正確分布と漸近結果の条件を混同

していると、論証として不十分になり得る。

そこで今回、次の4点を独立した品質基準として追加した。

1. 定理名
2. 必要条件
3. 本問での条件確認
4. 適用結果

また「定理名を増やす」こと自体は目的としない。定義やpmf/累積分布関数から短く直接導出できる場合は、ブラックボックス定理を減らして直接導出する。

## 重点修正

### 十分性・完備性・一様最小分散不偏推定量

- `core/01_order_statistics_rao_blackwell.md`
  - Neyman–Fisher 因子分解定理の共通支配測度と因子分解を明示。
  - 条件付き順序統計量の一様性の前提を確認。
  - Rao–Blackwell の有限分散・十分性条件を確認。
- `core/41_uniform_complete_sufficient_umvu.md`
  - 因子分解定理とLehmann–Schefféの条件を明示。
- `core/43_binomial_sufficiency_shrinkage.md`
  - 「尤度が $T$ だけを通るから十分」を禁止し、Neyman–Fisher因子分解定理を明示。
  - 数え上げ測度、母数非依存の標本空間、因子分解を確認。
  - 最尤推定量の内部点・境界を区別。
- `core/55_exponential_complete_sufficient_umvu.md`
  - 因子分解、Laplace変換一意性、Gamma–Dirichlet、Lehmann–Schefféの各条件を確認。

### Fisher情報・Cramér–Rao・漸近推定

- `core/40_fisher_information_delta_mle_efficiency.md`
  - 正則最尤推定量漸近正規性の内部点・共通支持・滑らかさ・正の情報量を確認。
  - Delta法の微分可能性を確認。
  - 有限標本CR不等式と漸近情報下限を区別。
- `core/42_cramer_rao_efficiency.md`
  - Cramér–Raoの正則条件を列挙し、正規モデルで確認。
  - $\mu=0$ で $g'(\mu)=0$ となる退化も明示。
- `core/44_uniform_nonregular_mle.md`
  - 最大値の `Beta(n,1)` を公式引用せず、累積分布関数→密度→積分からモーメントを導出。
  - Cramér–Raoの共通支持条件が壊れ、スコア平均0の正則議論が成立しないことを明示。
- `core/46_moment_estimation_delta.md`
  - 大数の法則、連続写像定理、中心極限定理、Delta法、正則最尤推定量漸近正規性を名前付きで分離。
  - 可積分性、有限分散、真値での連続・微分可能性、内部点・共通支持・有限正情報量を確認。
- `core/49_poisson_mle_fisher_ci.md`
  - 最尤推定量の母数空間を $\lambda\ge0$ とし、全観測0の境界最尤推定量と、漸近論で真値 $\lambda>0$ を置く内部点条件を区別。
  - 漸近分布は中心極限定理で直接正当化し、大数の法則とSlutskyによるplug-in 標準誤差を明示。
- `core/57_inverse_variance_blue_mle.md`
  - BLUEは分散最小化で直接証明。
  - クラーメル・ラオの不等式一致を述べる前に、共通支持、滑らかさ、内部点、有限正情報量、不偏性を確認。
- `standard/47_binomial_wald_coverage.md`
  - Wald区間を中心極限定理→大数の法則→Slutskyから導出。
  - 固定内部点 $0<p<1$ の漸近論と、境界近傍での有限標本破綻を区別。

### 正確分布・Cochran・F・t

- `core/45_chisq_variance_confidence_interval.md`
  - Cochranの定理を明示し、正規性・対称冪等射影・ランクを確認。
- `core/48_student_t_confidence_interval.md`
  - Cochranの定理とt分布の定義を分離。
  - 正規性・射影直交性・独立性を確認。
- `core/65_noncentral_f_power.md`
  - 帰無下のFをCochranの定理から導出。
  - 対立下の群間平方和について、正規射影二次形式の非心カイ二乗条件を確認し、非心Fへ接続。
- `core/72_two_sample_f_pooled_t.md`
  - 二群の正規性・相互独立からCochranを適用。
  - pooled tでは等分散仮定、平均差とpooled varianceの独立性を確認してStudent化。
- `core/80_general_linear_hypothesis_partial_f.md`
  - 正規誤差、$X$列フルランク、$R$の階数、nested・直交射影を確認してCochran→Fへ接続。

### 尤度比検定・Wald・Score・適合度

- `core/62_multinomial_lrt_pearson.md`
  - Wilksの定理とPearsonのカイ二乗極限定理を分離。
  - 正のセル確率、内部点、固定次元、期待度数発散を確認。
- `core/66_constrained_mle_lrt.md`
  - Wilksの定理を明示。
  - 真のセル確率が単体内部にあること、滑らかなランク1制約を確認し、単なる「次元差1」だけで結論しない。
- `core/70_bernoulli_lrt_wald_score.md`
  - 中心極限定理、大数の法則、Slutsky、Wilksをそれぞれ名前付きで使い、$0<p_0<1$ を確認。
- `standard/68_gof_lrt_pearson.md`
  - 母数推定を伴うPearson適合度のカイ二乗極限定理とWilksを明示。
  - 真の $\theta$ の内部点、正セル確率、固定カテゴリ数、推定母数の局所ランクを確認して $df=4-1-1$ を導く。
- `standard/73_correlation_fisher_z.md`
  - Fisher zの $1/(n-3)$ を厳密分散ではなく、i.i.d.2変量正規・固定 $|\rho|<1$・大標本での近似と明示。

### 検定原理・多重比較・P値

- `core/63_neyman_pearson_ump.md`
  - Neyman–Pearson補題の単純対単純・共通支配条件を確認。
  - 一様最強力検定性は全単純対立で同じNP棄却域になることから示し、Karlin–Rubinとの関係も明記。
- `core/71_poisson_conditional_binomial_test.md`
  - $\lambda,\mu>0$ を明示し、Poisson加法性は独立条件を確認。
  - 条件付き二項分布はpmfから直接導出し、nuisance parameter が消えるため正確検定になることを説明。
- `standard/83_bonferroni_scheffe.md`
  - Bonferroniのunion boundを名前付きで示し、独立性不要を明記。
  - Scheffeは独立正規・共通分散の固定効果一元配置で全コントラストを同時保証する定理として条件を明示。
- `advanced/64_two_sided_umpu_mean.md`
  - 1母数指数型分布族の両側一様最強力不偏検定定理を名前付きで使用。
  - 開いた自然母数空間、連続十分統計量、正則full exponential familyを確認。
- `advanced/69_cauchy_np_test.md`
  - Neyman–Pearson補題の単純対単純・共通Lebesgue支配・共通支持を確認。
  - 連続分布なので境界ランダム化が通常不要であることも明示。
- `advanced/99_composite_null_valid_pvalue.md`
  - 連続帰無分布では確率積分変換を使うことを明示。
  - 連続なら一様、離散ならsuper-uniformを区別して複合帰無のworst-case P値の妥当性を証明。

## 変更不要と判定した代表例

- `core/78_gauss_markov_blue.md`
  - Gauss–Markov定理をブラックボックス引用せず、任意の線形不偏推定量との差を $\sigma^2DD^T$ と直接証明しているため、定理名の追加を不要とした。
- 問題文で明示的に使用を許可した公式についても、適用条件が既に問題文に含まれ、そこからの計算が展開済みなら過剰に証明を追加しない。

## 監査上の区別

次は同じ扱いにしない。

- **定理を証明する問題**: 定理名だけでは不足。採点対象の証明を展開する。
- **定理を適用する問題**: 定理名 + 必要条件 + 本問での条件確認を残す。
- **問題文で定理使用を許可**: 定理そのものの証明は不要だが、適用条件の確認は必要。
- **定理を使わず直接導出できる**: 直接導出を優先し、余計なブラックボックスを増やさない。

## 今後のレビュー質問

新規・修正問題では少なくとも次を確認する。

1. 「よって」「定理より」の直前に定理名があるか。
2. その定理の仮定のうち、答案で落とすと危険な条件を列挙したか。
3. 本問の設定が各条件を満たすことを一行以上で確認したか。
4. 正確結果と漸近結果を混同していないか。
5. 境界母数・母数依存支持・ゼロ期待度数など、定理が壊れる典型例を見落としていないか。
6. 直接導出できる短い結果を、不要な定理名でブラックボックス化していないか。
