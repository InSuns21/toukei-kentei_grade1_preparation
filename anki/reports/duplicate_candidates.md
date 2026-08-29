# 重複・統合候補

このファイルは旧来の文字列近似だけでなく、`memo/anki.md` の **same trigger → same move** 基準で確認する候補の短縮一覧です。

詳細・分野別の監査方針は `reduction_audit_2026-08-29.md` を参照してください。

## 本文確認済み・処理済み

- `est-bernoulli-mle` → `mle-bernoulli-binomial`
  - 同じベルヌーイMLE操作。後者が一般の $n$・二項表現・境界注意まで包含。
  - `est-bernoulli-mle` は `archive/duplicates/` へ移動済み。
- `est-bias-variance` → `est-bias-variance-tradeoff`
  - $T-E[T]+E[T]-\theta$ の分解と交差項0が同一。
  - `est-bias-variance` は `archive/duplicates/` へ移動済み。
- `est-delta-log` → `asym-delta-method`
  - 一般Delta法の対数変換だけの特殊化。独立反復カードとしては過剰。
  - `est-delta-log` は `archive/too_specific/` へ移動済み。
- `test-normal-ci` → `ci-normal-mean-known`
  - 分散既知正規平均の同じ $z$ ピボット・同じ区間構成。
  - `test-normal-ci` は `archive/duplicates/` へ移動済み。

## 高確度・未処理

- `lehmann-scheffe` / `est-lehmann-scheffe`
- `asym-delta-method-sqrt` / `engasym-delta-square-root`
- `est-delta-log` の旧理工側相当 `engasym-delta-log` / `asym-delta-method`
- `dist-clt-standardize` / `dist-clt-sample-mean` / `samp-clt-approx-mean` / `asym-sample-mean-normality` / `engasym-clt-sample-mean-tolerance`
- `dist-continuity-correction-*` / `samp-continuity-correction` / `engasym-binomial-continuity-correction`
- `prob-basic-conditional-probability` / `prob-conditional-definition-direct`
- `prob-basic-total-probability` / `prob-total-probability`
- `prob-basic-inclusion-exclusion` / `prob-inclusion-exclusion` / `prob-inclusion-exclusion-three`
- `prob-basic-bayes` / `prob-bayes-diagnostic`
- `prob-transform-iid-maximum-density` / `samp-max-distribution` / `dist-order-max`

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
