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

## 重点修正

- `core/01_order_statistics_rao_blackwell.md`
  - Neyman–Fisher 因子分解定理の共通支配測度と因子分解を明示。
  - 条件付き順序統計量の一様性の前提を確認。
  - Rao–Blackwell の有限分散・十分性条件を確認。
- `core/40_fisher_information_delta_mle_efficiency.md`
  - 正則MLE漸近正規性の内部点・共通支持・滑らかさ・正の情報量を確認。
  - Delta法の微分可能性を確認。
  - 有限標本CR不等式と漸近情報下限を区別。
- `core/41_uniform_complete_sufficient_umvu.md`
  - 因子分解定理とLehmann–Schefféの条件を明示。
- `core/42_cramer_rao_efficiency.md`
  - Cramér–Raoの正則条件を列挙し、正規モデルで確認。
  - $\mu=0$ で $g'(\mu)=0$ となる退化も明示。
- `core/43_binomial_sufficiency_shrinkage.md`
  - 「尤度が $T$ だけを通るから十分」を禁止し、Neyman–Fisher因子分解定理を明示。
  - 数え上げ測度、母数非依存の標本空間、因子分解を確認。
  - MLEの内部点・境界を区別。
- `core/45_chisq_variance_confidence_interval.md`
  - Cochranの定理を明示し、正規性・対称冪等射影・ランクを確認。
- `core/48_student_t_confidence_interval.md`
  - Cochranの定理とt分布の定義を分離。
  - 正規性・射影直交性・独立性を確認。
- `core/49_poisson_mle_fisher_ci.md`
  - 漸近分布を一般MLE定理ではなくCLTで直接正当化。
  - LLNとSlutskyによるplug-in SEを明示。
- `core/55_exponential_complete_sufficient_umvu.md`
  - 因子分解、Laplace変換一意性、Gamma–Dirichlet、Lehmann–Schefféの各条件を確認。
- `core/62_multinomial_lrt_pearson.md`
  - Wilksの定理とPearsonのカイ二乗極限定理を分離。
  - 正のセル確率、内部点、固定次元、期待度数発散を確認。
- `core/63_neyman_pearson_ump.md`
  - Neyman–Pearson補題の単純対単純・共通支配条件を確認。
  - UMP性は全単純対立で同じNP棄却域になることから示し、Karlin–Rubinとの関係も明記。
- `core/70_bernoulli_lrt_wald_score.md`
  - CLT、LLN、Slutsky、Wilksをそれぞれ名前付きで使い、$0<p_0<1$ を確認。
- `core/71_poisson_conditional_binomial_test.md`
  - Poisson加法性は独立条件を明示。
  - 条件付き二項分布はpmfから直接導出し、正確検定になる理由を説明。
- `advanced/64_two_sided_umpu_mean.md`
  - 1母数指数型分布族の両側UMPU定理を名前付きで使用。
  - 開いた自然母数空間、連続十分統計量、正則full exponential familyを確認。

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
