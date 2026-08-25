# 統計応用（理工学） 定理適用監査 2026-08-25

## 目的

理工学80題について、前回の「途中式を隠さない」監査に加え、答案で定理を使うときの論証を

1. 定理名
2. 必要条件
3. 本問での条件確認
4. 適用結果

の4段階で追えるかを再監査した。

## 重点修正

- `core/02_general_linear_hypothesis.md`
  - 正規線形変換、Cochranの定理、同時正規で無相関なら独立、F分布の定義を分離。
  - 正規誤差、$X$列フルランク、$R$行フルランク、直交性を確認。
- `core/04_regression_anova.md`
  - 全体F・部分Fで「回帰だからF」を禁止。
  - 正規・等分散・nested・フルランク・直交射影を確認。
- `core/07_wald_lr_score.md`
  - CLT、LLN、Slutsky、Wilksを名前付きで使い、$0<p_0<1$ を確認。
- `core/08_markov_mle_lrt.md`
  - i.i.d.版Wilksを無条件に流用しない。
  - 有限状態Markovモデルで内部遷移確率、既約・非周期・エルゴード、推移数発散、滑らかなランク1制約を確認。
- `core/09_markov_stationary.md`
  - 有限Markov連鎖の収束定理、エルゴード定理、Kac公式を区別。
  - 全遷移確率正から既約・非周期、有限既約から正再帰を確認。
- `core/10_poisson_process.md`
  - 第1・第3到着時間はPoisson回数事象から直接導出。
  - 条件付き一様順序統計量は homogeneous Poisson process と総数条件付けを明示。
- `standard/15_poisson_order_stats.md`
  - Poisson条件付き順序統計量定理の homogeneous 条件を明記。
  - $S_k/T$ のBeta密度と平均を展開。
- `advanced/21_brownian_reflection.md`
  - Brown運動の反射原理を名前付きで使用。
  - 標準Brown運動、$a>0,T>0$、連続経路を確認。

## 変更不要と判定した代表例

- `core/01_ols_projection.md`
  - 同時正規性と共分散0を明示して独立性を示し、射影条件も展開済み。
- `core/03_gauss_markov.md`
  - 問題文で $E[\varepsilon]=0$, $Var(\varepsilon)=\sigma^2I$, $X$ 列フルランク、正規性不要を明示し、BLUEを直接証明している。
- `advanced/68_pca.md`, `advanced/69_lda.md`, `advanced/70_whitening.md`
  - 前回修正で定理をブラックボックス化せず、固有方程式・正規密度・共分散計算から直接導出済み。

## 注意する失敗パターン

### F検定

`F\sim F_{q,n-p}` とだけ書かない。有限標本で正確なF分布を得るには通常、正規誤差と独立なカイ二乗分解が必要。

### Markov連鎖

「定常分布がある」ことと「$P^n$ が定常分布へ収束する」ことは別。後者には非周期性が必要。時間平均のエルゴード定理、平均再帰時間のKac公式も別定理として条件を確認する。

### Poisson過程

総数条件付きで到着位置が一様になるのは homogeneous Poisson process の性質。NHPPでは累積強度による変換が必要で、そのまま一様とはならない。

### Brown運動

反射原理を使うなら、どのBrown運動・どの水準・どの時間区間かを明示する。初到達事象と最大値事象の同一視には経路連続性を使う。

## 今後のレビュー質問

1. 定理名を書いたか。
2. 条件を一般論だけでなく本問の記号で確認したか。
3. 正確分布と大標本近似を区別したか。
4. 境界・非正規・非既約・非周期・非homogeneousなど、定理が壊れる設定を見落としていないか。
5. 問題文が定理使用を許していても、適用可能性の確認を残したか。
