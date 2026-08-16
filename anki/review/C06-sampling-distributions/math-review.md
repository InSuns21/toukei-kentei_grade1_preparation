# 独立数理査読記録：C06-sampling-distributions（標本分布）

- 担当：independent-math-reviewer（独立数理査読サブエージェント）
- 対象：`anki/cards/22_sampling_distributions.md`（新規47枚、IDはすべて `samp-` または `content-` で始まる標本分布カード）
- 正本：`anki/notation.md`、`anki/formulae.md`、`anki/syllabus/syllabus.yaml`
- 実施日時：2026-08-16（Asia/Tokyo）
- 状態：初回査読（`anki/progress.yaml` の C06-sampling-distributions は self_review 中）

## 査読メタデータ

- initial_reviewer_id: independent-math-reviewer
- final_reviewer_id: independent-math-reviewer
- initial_reviewed_at: 2026-08-16T10:49:20.000Z
- final_reviewed_at: 2026-08-16T20:05:00.000Z

## 確認範囲

本文を全47カード分読み、定義・定理・密度・分位点・漸近分布・非心分布について独立に再計算・再導出した。対象カードID：

samp-xbar-normal-distribution, samp-chisq-definition, samp-chisq-additive, samp-chisq-mean-variance, samp-chisq-mean-var-indep, samp-chisq-expectation-squared, samp-t-distribution-definition, samp-t-statistic-mean-test, samp-t-distribution-variance-unknown, samp-t-converges-normal, samp-t-distribution-limits, samp-f-distribution-definition, samp-f-inverse-relation, samp-t-squared-f, samp-sqrt-f-t, samp-f-ratio-of-variances, samp-z-statistic-known-variance, samp-clt-approx-mean, samp-sample-proportion, samp-sample-variance-expectation, samp-two-sample-pooled-variance, samp-order-statistics-distribution, samp-max-distribution, samp-min-distribution, samp-range-statistic, samp-quantile-approx, samp-xbar-unbiased, samp-iid-sum-variance, samp-chisq-from-normal, samp-chisq-gamma-relation, samp-chisq-degree-of-freedom, samp-normal-linear-combo, samp-continuity-correction, samp-poisson-normal-approx, samp-cochran-theorem, samp-ci-mean-t, samp-ci-variance-chisq, samp-chisq-percentile, samp-f-percentile, samp-t-percentile-symmetry, samp-sample-size-mean, samp-sample-size-proportion, samp-welch-t, samp-two-proportion-diff, samp-noncentral-chisq, samp-noncentral-t, samp-f-anova-ratio

Coverage：`anki/syllabus/coverage.yaml` に上の47枚すべて登録されていることを確認（math-sampling-distributions）。

## 独立再計算・数値検証

- `z_{0.025}=1.960`：`samp-sample-size-mean` の「≈1.96」と一致。
- `χ²_{9,0.975}=19.023`、`χ²_{9,0.025}=2.700`：`samp-ci-variance-chisq`、`samp-chisq-percentile` の記載と一致。
- `t_{15,0.025}=2.131`：`samp-ci-mean-t` の記載と一致。
- `t_{10,0.025}=2.228`：`samp-t-percentile-symmetry` の記載と一致（`t_{10,0.975}=-2.228` も導出一致）。
- `d₂(5)=2.326`：正規順序統計量の期待レンジを数値積分し `E[R]/σ≈2.3259` を確認（`samp-range-statistic`）。
- F分位点の逆数関係：`F_{3,8;0.05}=4.0662` と `1/F_{8,3;0.95}=4.0662` が一致（`samp-f-inverse-relation`、`samp-f-percentile`）。
- 非心カイ二乗：`E[X]=ν+λ`、`Var(X)=2(ν+2λ)`。例 `ν=3,λ=2` で `E=5,Var=14` を確認（`samp-noncentral-chisq`）。
- 非心t：`T=Z/√(V/ν)`（`Z~N(δ,1)`、独立 `V~χ²_ν`）、`δ=0` のとき通常の `t_ν`、密度が複雑であること（`samp-noncentral-t`）。
- カイ二乗とガンマ：`χ²_ν=Gamma(ν/2,1/2)` の一致を反復（shape-rate 表示）。`ν=2` では `Exp(1/2)`（`samp-chisq-gamma-relation`）。
- 順序統計量のCDF・密度、標本最大・最小値、標本分位の近似分散（中央値 `1/(4f(m)²)`、正規なら `π/2`）、t分布の極限・Cauchy、F分布の密度、t²分布 `F_{1,ν}`、`√F=|t|`、不偏標本分散の期待値、Welchの自由度式、連続修正、ポアソン近似なども確認済み（いずれも正しい）。
- NaN・過誤数値は検出されなかった。

## 初回指摘

### minor

1. **`samp-t-distribution-limits`**（行間）
   - 実：`Var(V/ν)=2/ν→0` のみでは「分母は確率収束で1」が導けない（期待値が一定であることも使う）。`E[V/ν]=1`（`E[V]=ν`）を明記して、分散→0と合わせて Chebyshev 不等式で `V/ν→1 in prob.` とするのが正。
   - 修正案：「`E[V/ν]=1` かつ `Var(V/ν)=2/ν→0` より、Chebyshev の不等式によって `V/ν→1`（確率収束）」の形に追記する。

2. **`samp-welch-t`**（計算例の曖昧さ）
   - 実：`n₁=n₂=10, S₁²=4S₂²` なら Welch自由度は厳密に `ν=900/68≈13.24<18` と決まる。現文「18 より小さくなることが多い」は一般論として誤りではないが、具体値で示せば読者の暗算を不要にできる。
   - 修正案：例を `ν≈13.24（<18）` と具体化し、「一般に ω ≤ n₁+n₂−2」を追記する。

3. **分位点の表記揺れ**（`samp-ci-mean-t`）
   - 実：同一カード内で `t_{n-1}(α/2)`（問題文）と `t_{n-1,α/2}`（答え）が混在。ほかの分布では添字で統一しているため、記法を揃える。
   - 修正案：問題文も `t_{n-1,\alpha/2}` の添字形式に統一する。

## 機械検証

- `npm run validate` を実行し、成功を確認（`validate:structure`、`validate:math`＝KaTeX strict、`validate:text` すべて成功。Markdown 266ファイル、生成対象テキスト 237件）。

## 最終結果（初回査読）

fatal: 0 / major: 0 / minor: 3

---

# 再査読（修正確認）：C06-sampling-distributions

- 実施日時：2026-08-16（Asia/Tokyo・再査読）
- 担当：初回と同じ independent-math-reviewer
- 対象：`anki/cards/22_sampling_distributions.md` 全47枚（再確認）

## 修正1：samp-t-distribution-limits（解消）

修正後本文（346行）：「`E[V/ν]=1` かつ `Var(V/ν)=2/ν→0` なので、Chebyshev の不等式より `V/ν` は1へ確率収束し、分母は1に収束する」

確認：`E[V]=ν` から `E[V/ν]=1` が成り立ち、`Var(V/ν)=Var(V)/ν²=2ν/ν²=2/ν→0`。Chebyshev の不等式により任意の ε>0 で `P(|V/ν-1|≥ε)≤Var(V/ν)/ε²→0`、すなわち `V/ν→1`（確率収束）。指摘の行間は解消され、説明は数学的に完全になった。この修正で他カードの数式・数値へ影響はない。

## 修正2：samp-welch-t（解消）

修正後計算例（1371行）：「$n_1=n_2=10$、$S_1^2=4S_2^2$ なら … $\nu\approx13.24<18$」

確認：$S_1^2=4S_2^2=4a$、$S_2^2=a$ とすると（$a>0$）
$\nu=\frac{(4a/10+a/10)^2}{(4a/10)^2/9+(a/10)^2/9}=\frac{25a^2/100}{(16a^2/100+a^2/100)/9}=\frac{25}{17}\cdot9\approx13.235.$
よって $\nu\approx13.24<18$ は正しい。具体数値化により読者の暗算が不要になり、指摘2は解消。また「$n_1+n_2-2$ 以下になりやすい」の記述も維持され、誤りではない。

## 修正3：samp-ci-mean-t の分位点表記（解消）

修正後：問題文・答え・使用公式すべて `t_{n-1,\alpha/2}` の添字形式に統一（括弧形式 `t_{n-1}(α/2)` は消滅）。全文から `t_{...}(...)` 形式（正規表現 `t_\{[^}]+\}\([^)]*\)`）および χ²・F の括弧形式を走査し、残存なしを確認。ほかのカードの分位点表記（`χ²_{ν,α}`、`F_{ν1,ν2;α}`、`t_{ν,α}`、`z_{α/2}`）とも整合。

## 全体再確認（修正の波及なし）

- ID 47個・重複なし。`<!-- CARD -->` 区切り47個で全カードが正しく分離され、末尾も `<!-- CARD -->`。
- 主要数値は変更なし：`χ²_{9,0.975}=19.023`、`χ²_{9,0.025}=2.700`、`t_{15,0.025}=2.131`、`t_{10,0.025}=2.228`、`z_{0.025}=1.96`、`d₂(5)=2.326`、`n≈1068`、`SD≈0.069` など。
- 定義・密度・台・母数条件（t分布 `ν>1` 平均/`ν>2` 分散、F分布 `ν₂>2` 平均など）に変更なし。
- 新たな数式・数値エラー、NaN、行間の発生なし。

## 機械検証（再査読）

- `npm run validate` を再実行し、成功を確認（structure／math＝KaTeX strict／text すべて成功）。

## 最終結果（再査読）

fatal: 0 / major: 0 / minor: 0