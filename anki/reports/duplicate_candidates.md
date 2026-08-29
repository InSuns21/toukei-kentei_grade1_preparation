# 重複・統合候補

このファイルは旧来の文字列近似だけでなく、`memo/anki.md` の **same trigger → same move** 基準で確認する候補の短縮一覧です。

詳細・分野別の監査方針は `reduction_audit_2026-08-29.md` を参照してください。

## 現在の削減状況

- 監査開始時 canonical 候補: 1373枚
- `cards/` から archive へ移動済み: **48枚**
- 現在の canonical 候補: **1325枚**
- canonical + archive の査読済み履歴集合: 1373枚
- 目標: 580〜620枚

`audit_mode: true` の間は archive も数式・front matter 等の数学品質検証対象にするが、通常ビルド・通常 card count・公式 coverage には含めない。

## 処理済みbatch

### 初期pilot・手動監査 — 12枚

代表例:

- `est-bernoulli-mle` → `mle-bernoulli-binomial`
- `est-bias-variance` → `est-bias-variance-tradeoff`
- `est-delta-log` → `asym-delta-method`
- `test-normal-ci` → `ci-normal-mean-known`
- `data-ols-slope` → 最終 `reg-ols-normal-equations-simple`
- `data-odds-ratio` → `cat-odds-ratio-formula`
- `multi-linear-combination` → `engmv-linear-combination-normal`
- `process-markov-two-step` → `stoch-three-state-two-step`
- `model-logistic-odds` → `glm-logistic-odds-ratio`
- `model-contrast` → `enginf-contrast-estimate-se`
- `engproc-ar1-stationary-variance` → `process-ar1-stationary`
- `engasym-delta-log` → `asym-delta-method`

`data-ols-slope` は当初 `reg-ols-simple-formula` を canonical としたが、そのカード自身を後で `reg-ols-normal-equations-simple` へ統合した。reduction script が過去 archive の `canonical_card` を最終 canonical へ自動追随させることを確認済み。

### CI / Delta / CLT / MLE / Fisher / CRLB / 回帰 — 23枚

- CI の「一般形 + 数値だけの専用カード」10組を一般形へ統合。
- `engasym-delta-square-root` → `asym-delta-method-sqrt`。
- `samp-clt-approx-mean`, `asym-sample-mean-normality` 等の標本平均CLT重複を一般CLTへ統合。
- `mle-poisson`, `mle-normal-mean` を一般 score-equation card へ整理。
- Fisher情報量の Bernoulli / Poisson / Normal / Exponential / Geometric という分布違いだけの反復を代表例へ圧縮。
- CRLB の分布違いだけの反復を代表例へ圧縮し、`g(θ)` 型・等号条件は残した。
- 一般線形仮説の同じ二次形式F統計量を統合。

### 回帰 / 時系列 — 7枚

- 行列表記の次元確認、2×2 OLS数値計算、係数t区間、回帰ANOVA出力の重複を数理側 canonical へ統合。
- AR(2)根による安定性判定、ランダムウォーク差分、独立増分和の平均・分散を common 側へ統合。

### OLS / Poisson過程 — 6枚

- `reg-ols-simple-formula` → `reg-ols-normal-equations-simple`。
- 工学設定に着替えただけのポアソン件数、thinning、superposition、compound Poisson を common 側へ統合。
- 最初の到着時刻 Exp は第k到着時刻 Gamma の `k=1` として統合。

## 本文比較して「簡単そうだから消す」をしなかった代表例

- `data-anova-decomposition`
  - 群平均を足して引き、交差項が0になるところまで示す。単なる平方和数値計算とは別価値。
- `process-ar1-stationary`
  - $\gamma(0)=\phi^2\gamma(0)+\sigma_\varepsilon^2$ を実際に解くため、公式代入だけの後発カードより canonical 向き。
- `model-gauss-markov`
  - BLUEの主要条件と「正規性はBLUE性に不要」をまとめている。
- `eng-capability-index`
  - $C_p$ の基本操作であり、$C_{pk}$・非正規工程等の派生とは役割が違う。
- `eng-series-reliability`
  - 独立直列系の基本積。必要部品信頼度の逆算とは方向が異なる。
- `engproc-ma1-invertible-shock-recovery`
  - 単なる可逆条件判定ではなく、観測から革新を逐次復元する別move。
- `enginf-restricted-least-squares`
  - 一般線形仮説の検定ではなく、制約下で推定量そのものを求める別move。

## 次の高確度クラスタ

### 推定理論chain

- `lehmann-scheffe` / `est-lehmann-scheffe`
- `rao-blackwell` / `est-rao-blackwell` / `est-rao-blackwell-bernoulli`
- `suff-complete` / `est-sufficiency-completeness`
- `umvu-construction` / `est-umvu-idea` / `est-poisson-square-umvu`

ただし定理条件・具体例の片方にしかない説明を先に canonical へ吸収してから archive する。

### 連続修正

- `dist-continuity-correction-interval`
- `dist-continuity-correction-tail`
- `dist-continuity-correction-single`
- `samp-continuity-correction`
- `engasym-binomial-continuity-correction`

「整数事象を境界±0.5へ直す」という同じmoveを1〜2枚へ整理する。

### 基本確率

- `prob-basic-conditional-probability` / `prob-conditional-definition-direct`
- `prob-basic-total-probability` / `prob-total-probability`
- `prob-basic-inclusion-exclusion` / `prob-inclusion-exclusion` / `prob-inclusion-exclusion-three`
- `prob-basic-bayes` / `prob-bayes-diagnostic`

### 順序統計量 max

- `prob-transform-iid-maximum-density`
- `samp-max-distribution`
- `dist-order-max`

### merge-first が必要な組

- `model-gauss-markov` / `enginf-gauss-markov-comparison`
  - 前者の条件整理と、後者の「分散共分散行列差が半正定値」という最良性の意味を1枚へ統合したい。
- `reg-gls-estimator` / `enginf-gls-whitening`
  - 二次形式最小化と白色化という2説明を1枚へまとめてから片方をarchiveする。

## 名前空間横断で引き続き優先監査

- `test-*` ↔ `np-*` / `cat-*`
- `reg-*` / `model-*` ↔ `enginf-*`
- `mv-*` / `multi-*` ↔ `engmv-*`
- `asym-*` ↔ `engasym-*`
- `stoch-*` / `ts-*` ↔ `engproc-*`
- `design-*` ↔ `engdesign-*`

自動類似度だけでの削除は禁止。本文・条件・本質的操作・過去問根拠を比較し、`keep / merge / archive / delete / review` を確定する。
