# Advanced 20 実装順

Advanced層の大問を1題1ファイルで管理する。各題は「問題・詳細解答・本番答案・20点採点基準」を含む。ファイル先頭の番号は正式100大問の旧No.で、見出し中の Advanced No. は層内の実装順である。

## Advanced層の前提知識ルール

Advancedは「説明を省略してよい層」ではない。**Core 48を一通り学習した受験者が、問題文とリンクされた補講を読めば自力で追えること**を基準とする。

### 既知としてよいもの

原則として、次だけを既知としてよい。

1. 統計検定1級・準1級の基礎事項としてTextbook/Coreで既に扱った内容
2. 当該問題の冒頭で「既知としてよい」と明記した事項
3. 問題文中で定義・提示した定理や公式

逆に、Advancedで初めて現れる固有名詞・定理・公式を、説明なしに既知として使ってはならない。

### 各問題に明示するもの

前提知識の飛躍が起こりやすい問題では、問題の前に次を置く。

- **既知としてよい**：Coreまでで要求する知識
- **この問題で導入**：本問で初めて扱う概念
- **1級での扱い**：名称・一般公式まで暗記対象か、本問中で導けばよい発展事項か
- **関連Core・共通解説**：同じ理論を既に説明しているページ

### 発展概念の扱い

- Cholesky分解、精度行列、EM法、Chernoff評価など、1級対策として有用でもCoreで未導入の概念は、**定義または導出を先に置き、名前は後から付ける**。
- 一般定理を使う場合は、少なくとも「定理の内容」「本問で条件が満たされる理由」を書く。定理名だけで解答を終えない。
- 一般定理の完全な証明が1級対策を明らかに超える場合は、本流解答から分離して「補足・発展」とする。
- 同じ理論を複数問題で繰り返す場合は `../common/` の共通解説を正本とし、各問題では本問固有の適用に集中する。

### Cochran・射影の共通前提

正規標本の平均・残差への直交射影、対称冪等行列、スペクトル定理、標準多変量正規の直交変換不変性、二次形式のカイ二乗分布については、次を共通の補講とする。

[共通解説：正規標本の直交射影・Cochranの定理](../common/normal_sample_projection_cochran.md)

Advanced 05・15ではこのページを前提補講として参照し、同じ理論を別々のブラックボックスとして再導入しない。

| 実装順 | 100 No. | 演習価値 | 難度 | 主題 |
| ---: | ---: | :---: | :---: | --- |
| 01 | 17 | A | S | [二項確率母関数・Chernoff型評価](17_binomial_pgf_chernoff.md) |
| 02 | 23 | B | A | [切断正規・平均・分散](23_truncated_normal_moments.md) |
| 03 | 24 | A | S | [特性関数による中心極限定理](24_characteristic_function_clt.md) |
| 04 | 31 | S | S | [等相関行列・精度行列・偏相関](31_equicorrelation_precision_partial.md) |
| 05 | 33 | S | S | [射影行列・二次形式・Cochran分解](33_projection_quadratic_cochran.md) |
| 06 | 34 | A | A | [精度行列・Gaussian条件付き独立](34_precision_gaussian_conditional_independence.md) |
| 07 | 35 | B | A | [2変量正規・選択後モーメント](35_bivariate_normal_selection_moments.md) |
| 08 | 37 | B | S | [逐次残差化・Cholesky分解への接続](37_cholesky_residualization.md) |
| 09 | 38 | B | A | [非心Mahalanobis二次形式](38_noncentral_mahalanobis.md) |
| 10 | 39 | S | S | [条件付き正規公式の平方完成導出](39_conditional_normal_square_completion.md) |
| 11 | 51 | A | S | [位置母数付き指数・非正則2母数最尤推定量](51_shifted_exponential_nonregular_mle.md) |
| 12 | 61 | A | S | [2成分Poisson混合・期待値最大化法](61_poisson_mixture_em.md) |
| 13 | 64 | S | S | [母平均の両側一様最強力不偏検定](64_two_sided_umpu_mean.md) |
| 14 | 69 | B | A | [コーシー単純対単純Neyman–Pearson検定](69_cauchy_np_test.md) |
| 15 | 76 | S | S | [射影・Cochran・予測誤差](76_projection_cochran_prediction.md) |
| 16 | 93 | B | A | [重点サンプリング](93_importance_sampling.md) |
| 17 | 94 | B | A | [制御変量・最適係数](94_control_variates.md) |
| 18 | 95 | B | A | [層化Monte Carlo](95_stratified_monte_carlo.md) |
| 19 | 99 | S | A | [複合帰無・妥当なP値](99_composite_null_valid_pvalue.md) |
| 20 | 100 | S | S | [一致検定・局所対立・漸近検出力](100_equivalence_local_power.md) |

**Advanced 20: 20 / 20 実装済み。**
