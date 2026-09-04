# 統計応用（理工学）80題 詳細解答粒度・人手監査 2026-08-30

## 目的

`scripts/audit_solution_granularity.mjs` は省略候補を広く拾うため、検出スコアそのものを修正要求とはみなさない。本記録は `applied-rikou-80` の Core / Standard / Advanced を人手で確認し、**本当に導出・定義・適用条件が抜けていた箇所**と、**監査上は高得点でも本文上は十分だった偽陽性**を区別するための記録である。

判断基準は `GRANULARITY_PLAN_2026-08-25.md` と `../EXERCISE_GUIDELINES.md` に従う。

## 2026-08-30 時点の結論

- Core / Standard の高優先候補は一巡済み。
- Advanced 20題は全件を目視済み。
- 機械監査の残存高スコアは、現在は「固有値は」「正規方程式から」「尤度は」などの検出語による偽陽性が中心。
- 文字数を増やすだけの修正は行わず、採点対象の出発点・主要途中式・結論が再現できるかで判断した。
- 最終確認時点で小問対応見出し不足は0件。

## 本物の省略として修正した主要ファイル

### Core

- `core/03_gauss_markov.md`
  - 半正定値の意味を $c^\top Bc\ge0$ から定義。
  - $\sigma^2DD^\top$ が半正定値であることを $\|D^\top c\|^2$ で確認し、ガウス・マルコフの「最良」を任意の線形結合の分散比較へ接続。
- `core/09_markov_stationary.md`
  - 定常分布・収束条件・固有値の意味、平均再帰時間の導出を補強。
- `core/12_ar2_yule_walker.md`
  - AR(2)の定常条件とYule–Walker方程式を自己共分散の定義から導出。
- `core/13_arima_difference.md`
  - 後退作用素、差分と単位根、多段階予測の接続を補強。
- `core/14_factorial_2x2.md`
  - 効果・対比・平方和を定義から導出。
- `core/15_factorial_2k.md`
  - 一般効果公式を高水準平均−低水準平均から導出し、符号列の直交性を設計行列へ接続。
- `core/16_fractional_factorial.md`
  - defining relation、alias、resolution を実施点と符号列から導入。
- `core/17_orthogonal_array.md`
  - 直交表の列直交性、交絡、効果推定、残差自由度0の意味を補強。
- `core/19_split_plot.md`
  - 2段階の実験単位から一次・二次誤差の自由度とF検定分母を導出。
- `core/21_xbar_r_chart.md`
  - $A_2$ を3σ限界と $E[R]=d_2\sigma$ から導出し、$D_3,D_4$ の位置付けを明示。
- `core/22_process_capability.md`
  - $C_p,C_{pk}$ を規格幅と工程変動の意味から導入し、中心ずれと管理状態を区別。
- `core/30_linear_contrast.md`
  - 対比条件、t統計量、直交条件を分散・共分散から接続。
- `core/34_time_series_forecast.md`
  - AR(2)から移動平均$(\infty)$係数 $\psi_j$ の漸化式を導出。
  - 一般の多期先予測誤差分散と、予測値が無条件平均へ戻る理由を特性根から説明。
- `core/35_ma1_invertibility.md`
  - 可逆性をイノベーション復元の意味から定義し、$|\theta|<1$ を再帰展開から導出。

### Advanced

Advanced 20題は全件目視し、特に次を本修正した。

- `advanced/53_central_composite.md`
  - factorial点だけでは二次項を識別できないことを設計行列の列から説明。
  - 回転可能性条件 $\alpha^4=n_f$ は本問で使用してよい設計理論として明示。
- `advanced/55_i_optimal.md`
  - $\operatorname{Var}\{f(x)^\top\widehat\beta\}=\sigma^2f(x)^\top M^{-1}f(x)$ を回帰係数の共分散から導出し、I最適を平均予測分散最小化として定義。
- `advanced/68_pca.md`
  - 分散最大化 + 単位長制約から固有値問題を導出。
  - 主成分分散、寄与率、射影再構成、捨てた固有値と再構成誤差まで接続。
- `advanced/70_whitening.md`
  - $A\Sigma A^\top=I$ を目標に、固有分解→回転→尺度調整から白色化を構成。
  - 主成分分析との差、正規時の独立性、白色化の非一意性を説明。
- `advanced/75_random_generation.md`
  - 逆関数法を分布関数から証明。
  - 棄却法で採択後の条件付き密度が目的密度 $f$ になることを導出。

`advanced/README.md` には、Advancedでも説明を省略せず、Core修了者が同ページから追えることを標準とする前提知識ルールを追加した。

## 人手確認済みの主な偽陽性

次は監査スコアが高い、または「詳細解答量の要確認」に残るが、採点対象の主要導出を本文で確認済みであり、**スコアを下げる目的の水増しは不要**と判断した。

### Core / Standard

- `core/04_regression_anova.md`
- `core/05_standardized_regression.md`
- `core/08_markov_mle_lrt.md`
- `core/11_ar1.md`
- `core/24_right_censoring.md`
- `core/25_weibull_mle_delta.md`
- `core/26_survival_hazard.md`
- `core/38_fisher_principles.md`
- `core/39_cp_confidence_interval.md`
- `standard/15_poisson_order_stats.md`
- `standard/20_random_walk_gambler_ruin.md`
- `standard/25_acf_pacf_identification.md`
- `standard/29_ar_estimation.md`
- `standard/37_fwl.md`
- `standard/57_xbar_s_individuals.md`
- `standard/67_mahalanobis_geometry.md`
- `standard/72_poisson_regression.md`
- `standard/73_logistic_regression.md`

例として `standard/67_mahalanobis_geometry.md` は「固有値は」という語により高得点になるが、固有値計算そのものは本文にある。`core/05_standardized_regression.md` も「正規方程式から」が検出されるが、その正規方程式は既に展開されている。

### Advanced

次は全件目視の結果、現状で本流解答が十分と判断した。

- `advanced/11_competing_risks.md`
- `advanced/12_repairable_availability.md`
- `advanced/16_nhpp.md`
- `advanced/21_brownian_reflection.md`
- `advanced/30_state_space.md`
- `advanced/42_twoway_anova.md`
- `advanced/59_overdispersion_control.md`
- `advanced/63_cusum_ewma.md`
- `advanced/64_maintenance_availability.md`
- `advanced/69_lda.md`
- `advanced/76_mcmc.md`
- `advanced/77_stratified_sampling.md`
- `advanced/78_two_stage_sampling.md`
- `advanced/79_sample_size_design.md`
- `advanced/80_randomized_response.md`

`advanced/70_whitening.md` は修正後も機械監査で「固有値は」を拾うが、現在は固有分解の計算と白色化の構成を明示しているため、残存スコアは偽陽性として扱う。

## 監査値の推移

2026-08-30 の修正過程で、全演習を対象とする機械監査は概ね次のように改善した。

| 指標 | 初回確認 | 最終確認 |
| --- | ---: | ---: |
| 候補総数 | 265 | 258 |
| 候補を含むファイル | 127 | 122 |
| 線形代数・最小二乗候補 | 13 | 11 |
| 詳細解答量の要確認 | 21 | 14 |
| 小問対応見出し不足 | 0 | 0 |

この数値は品質スコアではない。修正済みの良質な長文でも「代入すると」「尤度は」等を含めば候補に残るため、今後も**差分監査→人手確認→本物だけ修正**の順を維持する。

## 今後の扱い

1. 既に本記録で「偽陽性」と確認したファイルは、監査語が残っているだけでは再修正しない。
2. 新しい問題追加・大幅改稿があったときは、当該ファイルを再監査する。
3. 機械監査で新たに「強い省略表現」「小問対応見出し不足」が出た場合は優先的に目視する。
4. 高演習価値 S/A では、公式名ではなく「その公式へ至る出発式・条件・主要途中計算」が残っているかを最優先する。
5. Advancedでは `advanced/README.md` の前提知識ルールに従い、Advanced固有の概念を暗黙の既知事項にしない。
