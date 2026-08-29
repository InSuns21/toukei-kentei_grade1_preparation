# Anki canonical-card 削減監査 — 2026-08-29

## 0. 目的

既存1373枚を priority 順に上位600枚へ切るのではなく、**約600個の canonical な解法単位へ編集する**。

判定は次を使う。

- `keep`: 独立して反復する価値が高い canonical card
- `merge`: 同じ trigger → same move のカードへ統合
- `archive`: 正しいが通常600枚には不要
- `delete`: 明白な完全重複。Git履歴で復元可能
- `review`: 本文比較・過去問根拠確認後に判定

このファイルは監査の入口であり、文字列類似だけで自動削除するためのリストではない。

---

# 1. 現状と目標

現行 coverage のカード数は次の通り。

| category | 現在 | 初期目標 | 差 |
|---|---:|---:|---:|
| 確率と確率変数 | 176 | 70 | -106 |
| 種々の確率分布 | 131 | 75 | -56 |
| 統計的推測（推定） | 223 | 110 | -113 |
| 統計的推測（検定） | 112 | 95 | -17 |
| データ解析法の考え方と各種分析手法 | 240 | 80 | -160 |
| 統計応用（共通事項） | 222 | 70 | -152 |
| 統計応用（理工学） | 269 | 100 | -169 |
| **合計** | **1373** | **600** | **-773** |

580～620枚を正常範囲とするため、最低でも753枚分の統合・archiveが必要である。

ただし分野別目標は quota ではない。特に「検定」は現状112枚と比較的締まっているため、他分野より削減率を低くしてよい。

---

# 2. 監査で最初に止める増殖パターン

## A. `type` 違いだけの増殖

```text
formula
recognition
condition
reverse
pitfall
```

が同じ trigger / move を共有する場合、1枚へ統合する。

## B. 「一般形」と「数値例」の2枚化

例：

```text
ci-normal-mean-known
ci-normal-mean-known-calc
```

一般形カード内の短い計算例で完遂できるなら1枚へ統合する。

## C. 分野プレフィックス違いの再実装

例：

```text
asym-delta-method-sqrt
engasym-delta-square-root
```

数理と理工で同じ数学操作なら canonical card を共有し、理工設定は使用例・source・tagへ寄せる。

## D. 分布だけ変えた同じ計算

MLE、Fisher情報、Delta法、モーメント法などを全分布で1枚ずつ持たない。

「一般手順 + 代表例」と「本当に分布固有の罠」のみ残す。

## E. `formulae.md` で足りる定義カード

定義・公式を置くだけで解法操作がないカードは `reference_only` 候補。

---

# 3. 高確度の既知重複

既存 `duplicate_candidates.md` が挙げている2組。

| cards | 初期判定 |
|---|---|
| `lehmann-scheffe` / `est-lehmann-scheffe` | `merge`。本文比較後、より良い一方を canonical にする |
| `asym-delta-method-sqrt` / `engasym-delta-square-root` | `merge`。一般Delta法カードへの吸収も併せて検討 |

この2組しか検出されていないこと自体が、従来 duplicate detector の意味的重複検出不足を示す。

---

# 4. 確率と確率変数 — 176 → 約70

## 4.1 基本確率

強い統合候補：

```text
prob-basic-conditional-probability
prob-conditional-definition-direct
```

```text
prob-basic-chain-rule
prob-chain-rule-three
prob-conditional-multiplication
```

```text
prob-basic-total-probability
prob-total-probability
```

```text
prob-basic-inclusion-exclusion
prob-inclusion-exclusion
prob-inclusion-exclusion-three
```

```text
prob-basic-bayes
prob-bayes-diagnostic
```

`basic-*` と後発の操作カードの双方を残す理由があるかを本文比較する。原則として具体例・説明が良い方を canonical にする。

## 4.2 CDF / PMF / PDF

現状は CDF 周辺だけで多数ある。

```text
prob-cdf-from-pmf
prob-cdf-from-density
prob-density-from-cdf-derivative
prob-cdf-jump-mass
prob-cdf-validity
prob-interval-from-cdf
prob-cdf-endpoint-choice
prob-mixed-cdf
```

目安：8枚 → 3～4枚。

- 離散CDFと跳躍
- 連続CDFと微分
- CDFから区間確率
- 混合分布（必要なら独立）

程度の解法単位へ整理する。

## 4.3 生存関数・hazard

```text
prob-survival-hazard
prob-survival-from-cdf
prob-cumulative-hazard
prob-survival-from-hazard
```

4枚 → 1～2枚候補。

## 4.4 PGF

```text
prob-pgf-moments
prob-pgf-recover-pmf
prob-pgf-binomial
prob-pgf-geometric
prob-pgf-poisson
prob-pgf-independent-sum
prob-pgf-thinning
prob-pgf-factorial-moment
prob-pgf-validity
```

9枚 → 3～4枚を目安。

- PGFの定義・係数からPMFを戻す
- 微分と階乗モーメント
- 独立和・thinning
- 分布固有の重要導出があれば1枚

既知分布のPGF一覧は `formulae.md` へ寄せる。

## 4.5 MGF

```text
dist-mgf-poisson
prob-mgf-independent-sum
prob-mgf-mean-variance
prob-mgf-affine-transform
prob-mgf-iid-sum
prob-mgf-exponential-domain
prob-mgf-gamma
prob-mgf-identify-normal
prob-mgf-nonexistence
prob-mgf-uniqueness-domain
```

10枚 → 4～5枚を目安。

独立和とiid和、分布別MGF暗記、存在域・一意性などを分けすぎない。

## 4.6 分布の特性値

次は `formulae.md` への退避・統合候補。

```text
prob-skewness-definition
prob-skewness-shape
prob-kurtosis-definition
prob-kurtosis-shape
prob-coefficient-of-variation
prob-percentile-from-cdf
prob-median-from-density
prob-quartiles-iqr
prob-range-definition
prob-mode-from-density
```

特に「定義」と「形の解釈」の2枚化を避ける。

## 4.7 変数変換

```text
dist-jacobian-scale
prob-transform-nonmonotonic
prob-transform-jacobian-2d
prob-transform-log
prob-transform-affine-decreasing
prob-transform-reciprocal-uniform
prob-transform-half-normal
...
```

個別変換を大量に持つのではなく、

- 単調1変量変換
- 非単調1変量変換
- 2変量Jacobian
- 和の畳み込み
- 順序統計量 max/min

を canonical move として残し、特殊例は本当に過去問価値があるものだけ独立させる。

`prob-transform-iid-maximum-density`、`samp-max-distribution`、`dist-order-max` は横断統合候補。

## 4.8 CLT・近似

```text
dist-clt-standardize
dist-clt-statement
dist-clt-sample-mean
dist-clt-bernoulli-proportion
dist-clt-sum-variance
dist-clt-standard-error
dist-clt-bernoulli-count
dist-clt-finite-variance
samp-clt-approx-mean
asym-clt
asym-sample-mean-normality
```

分野横断で同一技能が増殖している。一般CLT、標本平均、割合/二項の代表例程度へ整理する。

連続修正も

```text
dist-continuity-correction-interval
dist-continuity-correction-tail
dist-continuity-correction-single
samp-continuity-correction
engasym-binomial-continuity-correction
```

を1～2枚へ寄せる。

---

# 5. 種々の確率分布 — 131 → 約75

## 5.1 「definition + moments」の機械的2枚化を止める

各分布で、定義カードを残す必要があるかを再判定する。分布のPMF/PDF・台・母数は `formulae.md` が正本。

特に、

```text
dist-poisson-moments
dist-poisson-moments-by-definition
```

```text
dist-hypergeometric-moments
dist-hypergeometric-moments-by-definition
```

```text
dist-gamma-moments
dist-gamma-moments-by-definition
```

```text
dist-beta-moments
dist-beta-moments-by-definition
```

```text
dist-lognormal-moments
dist-lognormal-moments-by-definition
```

は強い統合候補。

「公式を言うカード」と「定義から導出するカード」を両方残すなら、両者が実際に別の1級小問技能であることを要求する。

## 5.2 標本分布

`t`, `chi-square`, `F` では、定義・関係式・percentile・応用が多数分割されている。

例：

```text
samp-t-distribution-definition
samp-t-distribution-variance-unknown
samp-t-statistic-mean-test
samp-t-percentile-symmetry
samp-t-squared-f
samp-sqrt-f-t
```

分布関係を「χ²・t・Fの関係」canonical card へ集約できないか確認する。

`percentile` 単独カードは通常参照で済むなら archive。

---

# 6. 統計的推測（推定） — 223 → 約110

## 6.1 定義系

```text
population-sample-definition
random-sample-iid-definition
statistic-definition-basic
estimator-estimate-distinction
order-statistic-definition-basic
suff-statistic-definition
```

初学者向け説明としては必要でも、通常600枚で反復すべきカードかを再判定する。`formulae.md`・textbook 側へ寄せる候補。

## 6.2 十分性 → Rao–Blackwell → Lehmann–Scheffé / UMVU

```text
rao-blackwell
est-rao-blackwell
est-rao-blackwell-bernoulli

lehmann-scheffe
est-lehmann-scheffe

umvu-construction
est-umvu-idea
est-poisson-square-umvu

suff-complete
est-sufficiency-completeness
```

同じ理論鎖を複数名前空間で重複実装している。定理・条件・具体例を適切にまとめ、数枚の canonical chain に整理する。

## 6.3 MLE

```text
mle-likelihood-construction
mle-log-likelihood
mle-score-equation
mle-normal-mean
mle-normal-variance
mle-bernoulli-binomial
mle-poisson
mle-exponential
mle-normal-both
...
```

「尤度→log→score=0」という同じ move を分布ごとに増殖させない。

残す目安：

- 尤度の作り方
- 内点MLEの標準手順
- 多母数MLE
- 境界/非正則MLE
- 代表分布例2～3

分布別例は過去問価値・固有の罠で選ぶ。

## 6.4 モーメント法

```text
est-method-of-moments
est-moments-exponential
est-moments-uniform
est-moments-normal-numeric
est-moments-gamma-two-parameter
est-moments-beta-two-parameter
est-moments-uniform-two-endpoints
```

一般法 + 1母数代表例 + 2母数代表例程度へ整理候補。

## 6.5 Fisher情報

```text
est-fisher-information-def
est-fisher-two-forms
est-fisher-additivity
est-fisher-bernoulli-example
est-fisher-poisson-example
est-fisher-exponential
est-fisher-normal-example
est-fisher-bernoulli
est-fisher-geometric
```

一般式・二形式・加法性を1枚、代表計算を1～2枚程度へ圧縮候補。

## 6.6 CRLB

```text
est-cramer-rao-lower-bound
est-crlb-equality
est-crlb-exponential
est-cramer-rao-bernoulli
est-crlb-poisson-mean-efficiency
est-crlb-normal-mean-known-variance
est-crlb-bernoulli-square
```

一般CRLB + 等号条件/効率性 + 代表例程度へ。

## 6.7 Delta法

数理側：

```text
est-delta-log
asym-delta-method
asym-delta-method-sqrt
asym-delta-exponential-mean
asym-delta-bernoulli-odds
asym-delta-arcsine-proportion
asym-delta-two-sample-log-risk-ratio
asym-delta-normal-standard-deviation
```

理工側：

```text
engasym-delta-log
engasym-delta-square-root
engasym-delta-ratio
engasym-delta-risk-ratio
engasym-delta-odds-ratio
```

最優先の横断統合クラスタ。一般Delta法 + 1変量代表例 + 比/2変量代表例 + 2次Delta法（必要なら）の3～4枚程度を基準に本文比較する。

## 6.8 信頼区間

一般形と `-calc` のペアは原則 merge 候補。

```text
ci-normal-mean-known / ci-normal-mean-known-calc
ci-variance-chi-derivation / ci-variance-chi-calc
ci-f-variance-ratio / ci-f-variance-ratio-calc
ci-two-sample-mean-diff / ci-two-sample-mean-diff-calc
ci-welch-interval / ci-welch-calc
ci-proportion / ci-proportion-calc
ci-proportion-diff / ci-proportion-diff-calc
ci-one-sided / ci-one-sided-calc
ci-asymptotic-mle / ci-asymptotic-mle-calc
ci-delta-method / ci-delta-method-calc
```

20枚前後 → 約10枚へ素直に削減可能。

---

# 7. 統計的推測（検定） — 112 → 約95

この分野は削りすぎない。

## 7.1 検定の基礎

```text
test-pvalue-definition
test-pvalue-two-sided
test-pvalue-smallest-level
test-composite-null-pvalue
test-discrete-pvalue-conservative
mathstat-p-value-uniformity
```

P値の定義・両側・複合帰無・離散性は意味が異なるため、単純に1枚へ潰さない。ただし「定義カード + 派生用語カード」の冗長性を本文比較する。

## 7.2 Wald / Score / LR

```text
test-wald-general
test-wald-bernoulli-numeric
test-score-general
test-score-bernoulli-numeric
test-lr-bernoulli-numeric
test-lr-wald-score-comparison
engasym-score-wald-lr-equivalence
```

一般形と数値例を統合しつつ、三者比較カードは残す価値が高い。

## 7.3 正規検定

```text
test-normal-z-known-formula
test-normal-z-one-sided-numeric
test-normal-z-left-sided
test-normal-z-two-sided-pvalue
```

Z検定の向きだけで4枚にしない。片側/両側の判断を含む canonical card へ整理。

同様に

```text
test-normal-t-pivot
test-normal-t-numeric
```

```text
test-pooled-two-sample-t
test-pooled-two-sample-t-numeric
```

```text
test-welch-two-sample-formula
test-welch-two-sample-numeric
```

```text
test-normal-variance-chisquare
test-normal-variance-chisquare-numeric
```

```text
test-normal-variance-ratio-f
test-normal-variance-ratio-numeric
```

は merge 候補。

## 7.4 ノンパラメトリック

`test-*` と `np-*` に同じ検定が二重実装されている。

```text
test-sign-test / test-sign-test-numeric / np-sign-median-ci

test-wilcoxon-signed-rank / test-wilcoxon-signed-rank-numeric /
np-wilcoxon-null-moments / np-wilcoxon-normal-approx

test-mann-whitney-u / test-mann-whitney-u-numeric /
np-mann-whitney-ranksum-equivalence / np-mann-whitney-null-moments /
np-mann-whitney-normal-numeric
```

試験価値の高い「正確分布→大標本近似」まで1つの流れとして再設計する。

---

# 8. データ解析法 — 240 → 約80

ここは最も大きな編集対象の一つ。

## 8.1 ANOVA

一元配置だけで

```text
model assumptions
SS numeric
degrees freedom
F statistic
ANOVA table numeric
expected mean squares
```

と細分化されている。

「一元配置ANOVAを一度最後まで動かす」カードを中心に、平方和分解・自由度・F比をまとめる余地が大きい。

多重比較も `formula + numeric` ペアを統合する。

## 8.2 回帰

`reg-*` には、公式・性質・数値例・診断が44枚程度ある。

強い統合候補例：

```text
reg-slope-t-test / reg-slope-t-numeric / reg-slope-confidence-interval
reg-mean-response-ci / reg-prediction-interval / reg-ci-versus-pi-numeric
reg-overall-f-test / reg-overall-f-r2
reg-partial-f-test / reg-partial-f-numeric / reg-f-equals-t-squared
reg-hat-matrix-properties / reg-leverage-meaning / reg-residual-variance-leverage
```

「公式だけ」「数値例だけ」に割らず1枚で動かす。

## 8.3 分割表

`test-*` 側と `cat-*` 側の重複を優先監査する。

```text
test-independence-chisquare ↔ cat-expected-counts-independence / cat-pearson-shortcut-2x2

test-fisher-exact-2x2 ↔ cat-fisher-hypergeometric

test-mcnemar-asymptotic / mathstat-mcnemar-exact-test ↔ cat-mcnemar-choice

test-yates-correction ↔ cat-yates-corrected-shortcut
```

## 8.4 シミュレーション

アルゴリズム説明と数値例のペアを統合。

```text
sim-inverse-transform-continuous / sim-inverse-transform-exponential-numeric
sim-mh-algorithm / sim-mh-numeric
sim-mc-standard-error / sim-mc-ci-numeric
sim-importance-sampling / sim-importance-numeric
```

MCMC の `burnin-thinning` などは、独立小問価値と現代的妥当性を再査定する。

## 8.5 ベイズ

45枚前後あり、600枚制約下では過剰。

- ベイズ更新の基本
- 代表共役族（Beta-Binomial、Gamma-Poisson、Normal-Normal等）
- ベイズ推定量と損失
- 信用区間と頻度論CIの違い
- Bayes factor
- 階層モデル / Gibbs の基本

を中心にし、各共役族の `update / numeric / predictive` 三重化を抑える。

---

# 9. 統計応用（共通事項） — 222 → 約70

このカテゴリーは、数理・データ解析と**同じ数学の再実装**が非常に多い。

## 9.1 重回帰分析

```text
model-gauss-markov
reg-gls-estimator
reg-wls-two-points
reg-ridge-closed-form
reg-lasso-soft-threshold
...
```

データ解析側 `reg-*` / `ms-*` と canonical を共有する。

## 9.2 多変量解析

PCA、LDA、GLM等が、理工側 `engmv-*`, `enginf-*` とも重なる。

例：

```text
mv-pca-eigen-numeric
multi-pca-eigen
engmv-eigenvalues-covariance-2x2
engmv-eigenvectors-covariance-2x2
engmv-pca-loading-numeric
```

PCA固有値計算の canonical card を共有し、分野別コピーを廃止する。

## 9.3 確率過程・時系列

共通側：

```text
stoch-*
ts-*
```

理工側：

```text
engproc-*
```

で大量に重複している。AR(1), MA(1), ARMA, Poisson process, Markov chain 等は数学的操作単位を共有する。

---

# 10. 統計応用（理工学） — 269 → 約100

理工固有の「品質管理・信頼性・実験計画」の価値は残す。一方、数理・共通事項の再実装を大幅に削る。

## 10.1 多変量

```text
multi-linear-combination ↔ engmv-linear-combination-normal
multi-conditional-normal ↔ engmv-conditional-normal-numeric
multi-pca-eigen ↔ engmv-eigenvalues/eigenvectors/pca-loading
```

理工の数値設定だけを理由に別カードへしない。

## 10.2 線形推測

```text
reg-* / model-* ↔ enginf-*
```

に重複が多い。

例：

```text
reg-matrix-ols-derivation ↔ enginf-ols-matrix-numeric
reg-hat-matrix-properties / leverage ↔ enginf-leverage-numeric
reg-partial-f-test ↔ enginf-extra-sum-squares
model-contrast ↔ enginf-contrast-estimate-se / enginf-contrast-t-test
```

## 10.3 漸近理論

`engasym-*` は数理側の CLT / Delta / MLE asymptotics と統合する。

理工側に残すのは、センサー平均・工程能力等の**理工固有の判断が増える場合だけ**。

## 10.4 品質管理

ここは理工固有性が高いので、単純な削減率を適用しない。

ただし管理図を

```text
Xbar-R
R
S
p fixed n
p varying n
np
c
u
I-MR
```

と全部独立カードにする必要があるかは監査する。

「どのデータならどの管理図か」という選択カードと、代表的な管理限界計算を組み合わせる方が演習価値が高い可能性がある。

## 10.5 実験計画

共通側 `design-*` と理工側 `engdesign-*` の重複を横断監査する。

直交表、交絡、一部実施、ブロック化は特に同じ構造を別文脈で再実装しやすい。

---

# 11. 優先監査クラスタ

削減効率と重複確度から、本文比較の順序を次とする。

1. **名前空間をまたぐ明白な重複**
   - `basic-*` vs 通常確率カード
   - `test-*` vs `np-*` / `cat-*`
   - `reg-*` vs `enginf-*`
   - `mv-*` / `multi-*` vs `engmv-*`
   - `asym-*` vs `engasym-*`
   - `stoch-*` / `ts-*` vs `engproc-*`
2. **general + numeric ペア**
   - CI
   - 正規検定
   - ANOVA
   - 回帰
   - simulation
3. **definition / formula reference-only**
   - 分布定義
   - 基本統計量定義
   - percentile等
4. **分布だけ変えた同一手法**
   - MLE
   - Fisher情報
   - CRLB
   - Delta法
   - モーメント法
5. **特殊・低頻度の派生例**
   - C/D priority
   - software-output-only
   - 数値設定だけを変えたカード

---

# 12. 監査の完了条件

次をすべて満たしたとき `curation.yaml` の `audit_mode` を `false` にする。

```text
[ ] cards/**/*.md が580～620枚
[ ] 同じtrigger → same moveの既知重複が解消
[ ] formula/reference-onlyが通常カードに大量残存していない
[ ] 公式シラバス各項目の到達行動がcoverageされている
[ ] 1枚で複数公式用語をcoverするmappingがcoverage.yamlへ反映
[ ] priority Sが「重要そう」だけで膨張していない
[ ] 過去問頻出のcanonical moveを落としていない
[ ] `npm run anki:validate` 成功
[ ] `npm run validate` 成功
```

---

# 13. 次の実作業

次回以降の削減監査では、上記優先順に**本文を実際に比較して**、カードID単位で

```text
canonical_card
merged_from
archive_reason
```

を確定する。

coverage 一覧だけで内容を推測して削除しない。タイトル上の強い候補を抽出した後、本文と過去問根拠を確認して移動・統合する。
