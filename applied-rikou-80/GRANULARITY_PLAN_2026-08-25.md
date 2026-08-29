# 統計応用（理工学）80題 詳細解答粒度統一計画

## 目的

`statistical-mathematics/core/40_fisher_information_delta_mle_efficiency.md` を代表例とする詳細解答粒度に、`applied-rikou-80` 全80題を段階的に揃える。

ここで揃えるのは文字数ではない。各小問について、受験者が初見から再現できるように次を確認する。

1. 出発式・定義が明示されている。
2. 定理・公式を使う場合、何をどこへ代入するかが追える。
3. 採点対象になる微分・積分・平方和分解・条件付き確率・行列計算を飛ばさない。
4. 「整理すると」「計算すると」「公式より」だけで主要な導出を省略しない。
5. 詳細解答は学習用に十分な行間を持たせ、本番答案は別に圧縮する。
6. 非自明な略語に依存せず、日本語名を基本とする。

共通規約の正本は `../EXERCISE_GUIDELINES.md` とする。

## 監査の読み方

`scripts/audit_solution_granularity.mjs` のスコアは候補抽出に使い、スコア順をそのまま修正順にはしない。

たとえば `core/07_wald_lr_score.md` は「微分すると」「尤度は」等の語を多く含むため監査スコアが高いが、現状はすでに尤度、対数尤度、最尤推定量、フィッシャー情報量、Wald・スコア・尤度比統計量、Taylor展開まで詳細化されている。この種の誤検知は人手確認で除外する。

一方、5〜6小問を詳細解答200〜400字程度で処理し、小問対応見出しがない問題は強い優先候補とする。

## 修正優先順位

### 第一波: 明確に薄い問題

まず、複数小問を1段落で処理している問題を直す。

- `advanced/12_repairable_availability.md`
- `advanced/42_twoway_anova.md`
- `standard/72_poisson_regression.md`
- `advanced/76_mcmc.md`
- `advanced/16_nhpp.md`
- `advanced/53_central_composite.md`
- `advanced/55_i_optimal.md`
- `advanced/59_overdispersion_control.md`
- `advanced/63_cusum_ewma.md`
- `advanced/64_maintenance_availability.md`
- `advanced/77_stratified_sampling.md`
- `advanced/78_two_stage_sampling.md`
- `advanced/79_sample_size_design.md`
- `advanced/80_randomized_response.md`

### 第二波: Standard の薄い基礎・頻出論点

- `standard/02_weibull_shape_hazard.md`
- `standard/05_erlang_waiting.md`
- `standard/07_mean_residual_life.md`
- `standard/09_kaplan_meier.md`
- `standard/10_series_parallel_reliability.md`
- `standard/29_ar_estimation.md`
- `standard/38_multicollinearity_diagnostics.md`
- `standard/46_random_effects_ems.md`
- `standard/51_confounding_blocks.md`
- `standard/52_response_surface.md`
- `standard/57_xbar_s_individuals.md`
- `standard/67_mahalanobis_geometry.md`

### 第三波: Core・高得点論点の再監査

Core は原則として先行整備済みだが、次は人手で再確認する。

- `core/09_markov_stationary.md`
- `core/15_factorial_2k.md`
- `core/07_wald_lr_score.md` は現状を基準確認し、不必要な水増しはしない。

高演習価値 S/A の問題では、文字数より「本番で減点される導出を既知公式として置いていないか」を優先する。

## 分野別に追加する説明

### 信頼性・生存時間

- ハザード、信頼度、平均残存寿命の関係を積分から追えるようにする。
- 修理可能系は状態遷移率、定常流量平衡、イベント頻度の違いを分ける。
- Kaplan–Meier推定量は各時点の条件付き生存確率の積であることを示す。

### 時系列

- Yule–Walker方程式を突然置かず、自己共分散を両辺に掛けて期待値を取る段階を示す。
- 定常性条件と推定式を混同しない。

### 回帰・一般化線形モデル

- 確率分布から尤度、対数尤度、スコアへ進む。
- 係数解釈はリンク関数を逆変換して示す。
- 過分散では「分散=平均」というPoisson仮定とのずれを明示する。

### 実験計画・分散分析

- 自由度を水準数・反復数から数える。
- 平方和→平均平方→F統計量の順を省略しない。
- 交互作用がある場合の主効果解釈、欠測時の直交性崩壊を説明する。

### Monte Carlo・標本調査

- 推定量の期待値と分散を明示する。
- マルコフ連鎖Monte Carlo法では提案確率、受理確率、遷移確率を区別する。
- 詳細釣り合いから定常性へ進む総和を1段書く。
- 層化・二段抽出は重みと包含確率を明示する。

## 完了条件

各段階の完了時に以下を確認する。

- `npm run validate:rikou80`
- `npm run validate:exercise-style`
- `npm run audit:granularity`

粒度監査は非ブロッキング候補抽出であり、最終判定は本文の人手確認で行う。
