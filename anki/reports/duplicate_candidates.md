# 重複・統合候補

このファイルは旧来の文字列近似だけでなく、`memo/anki.md` の **same trigger → same move** 基準で確認する候補の短縮一覧です。

詳細・分野別の監査方針は `reduction_audit_2026-08-29.md` を参照してください。

## 現在の削減状況

- 監査開始時 canonical 候補: 1373枚
- `cards/` から archive へ移動済み: 10枚
- 現在の canonical 候補: **1363枚**
- archive: **10枚**
- canonical + archive の査読済み履歴集合: 1373枚

`audit_mode: true` の間は archive も数学品質検証の対象にするが、通常ビルド・通常card countには含めない。

## 本文確認済み・処理済み

- `est-bernoulli-mle` → `mle-bernoulli-binomial`
  - 同じベルヌーイMLE操作。後者が一般の $n$・二項表現・境界注意まで包含。
  - `archive/duplicates/` へ移動済み。
- `est-bias-variance` → `est-bias-variance-tradeoff`
  - $T-E[T]+E[T]-\theta$ の分解と交差項0が同一。
  - `archive/duplicates/` へ移動済み。
- `est-delta-log` → `asym-delta-method`
  - 一般Delta法の対数変換だけの特殊化。独立反復カードとしては過剰。
  - `archive/too_specific/` へ移動済み。
- `test-normal-ci` → `ci-normal-mean-known`
  - 分散既知正規平均の同じ $z$ ピボット・同じ区間構成。
  - `archive/duplicates/` へ移動済み。
- `data-ols-slope` → `reg-ols-simple-formula`
  - ともに切片あり単回帰で $\widehat\beta_1=S_{xy}/S_{xx}$ を中心化平方和から計算する。後者は切片まで同一カードで完結する。
  - `archive/duplicates/` へ移動済み。
- `data-odds-ratio` → `cat-odds-ratio-formula`
  - 2×2表の $ad/(bc)$、基準カテゴリ反転で逆数という注意まで同一。
  - `archive/duplicates/` へ移動済み。
- `multi-linear-combination` → `engmv-linear-combination-normal`
  - 多変量正規の線形結合 $a^TX$ の平均・分散計算が同一。後者は共分散の交差項も明示する。
  - `archive/duplicates/` へ移動済み。
- `process-markov-two-step` → `stoch-three-state-two-step`
  - Chapman--Kolmogorovで中間状態を総和する2段階遷移確率計算が同一。
  - `archive/duplicates/` へ移動済み。
- `model-logistic-odds` → `glm-logistic-odds-ratio`
  - ロジスティック係数差を指数化してオッズ比を得る操作が同一。後者は任意の増分 $c$ へ一般化している。
  - `archive/duplicates/` へ移動済み。
- `model-contrast` → `enginf-contrast-estimate-se`
  - 係数和0という対比の定義だけを独立反復するカードは過剰。後者が定義を使いながら推定値・標準誤差まで実行する。
  - `archive/duplicates/` へ移動済み。

## 本文比較して「pilot側を残す」と判断した代表例

削減監査は「古いカードを一括削除」ではない。次は後発カードがあっても現時点で pilot 側を残している。

- `data-anova-decomposition`
  - 群平均を足して引き、交差項が0になることまで示す。後発の平方和数値計算だけでは代替しない。
- `process-ar1-stationary`
  - 定常分散公式を単に代入せず、$\gamma(0)=\phi^2\gamma(0)+\sigma_\varepsilon^2$ を実際に解く。後発 `engproc-ar1-stationary-variance` より導出カードとして強い。
- `model-gauss-markov`
  - BLUEの主要条件と「正規性はBLUE性に不要」を1枚で扱う。単なる回帰数値例へ吸収しない。
- `eng-capability-index`
  - $C_p$ の最小基本計算として理工固有性が高く、後発の $C_{pk}$・非正規工程等の派生とは役割が異なる。
- `eng-series-reliability`
  - 独立直列系の基本積を直接実行する。後発の必要部品信頼度逆算はこの基本操作を前提とする。

## 高確度・未処理

- `lehmann-scheffe` / `est-lehmann-scheffe`
- `asym-delta-method-sqrt` / `engasym-delta-square-root`
- `engasym-delta-log` / `asym-delta-method`
- `dist-clt-standardize` / `dist-clt-sample-mean` / `samp-clt-approx-mean` / `asym-sample-mean-normality` / `engasym-clt-sample-mean-tolerance`
- `dist-continuity-correction-*` / `samp-continuity-correction` / `engasym-binomial-continuity-correction`
- `prob-basic-conditional-probability` / `prob-conditional-definition-direct`
- `prob-basic-total-probability` / `prob-total-probability`
- `prob-basic-inclusion-exclusion` / `prob-inclusion-exclusion` / `prob-inclusion-exclusion-three`
- `prob-basic-bayes` / `prob-bayes-diagnostic`
- `prob-transform-iid-maximum-density` / `samp-max-distribution` / `dist-order-max`
- `engproc-ar1-stationary-variance` / `process-ar1-stationary`（pilot側をcanonical候補として比較）

## 一般形 + 数値例の統合候補

- `ci-normal-mean-known` / `ci-normal-mean-known-calc`
- `ci-variance-chi-derivation` / `ci-variance-chi-calc`
- `ci-f-variance-ratio` / `ci-f-variance-ratio-calc`
- `ci-two-sample-mean-diff` / `ci-two-sample-mean-diff-calc`
- `ci-welch-interval` / `ci-welch-calc`
- `ci-proportion` / `ci-proportion-calc`
- `ci-proportion-diff` / `ci-proportion-diff-calc`
- `ci-one-sided` / `ci-one-sided-calc`
- `ci-asymptotic-mle` / `ci-asymptotic-mle-calc`
- `ci-delta-method` / `ci-delta-method-calc`

## 名前空間横断で優先監査する組

- `test-*` ↔ `np-*` / `cat-*`
- `reg-*` / `model-*` ↔ `enginf-*`
- `mv-*` / `multi-*` ↔ `engmv-*`
- `asym-*` ↔ `engasym-*`
- `stoch-*` / `ts-*` ↔ `engproc-*`
- `design-*` ↔ `engdesign-*`

自動削除は禁止。各候補は本文・条件・本質的操作・過去問根拠を比較し、`keep / merge / archive / delete / review` のいずれかを確定する。
