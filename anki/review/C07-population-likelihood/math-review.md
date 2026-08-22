# 独立数理査読記録

- initial_reviewer_id: independent-math-reviewer-C07
- final_reviewer_id: independent-math-reviewer-C07
- initial_reviewed_at: 2026-08-18T13:55:00.000Z
- final_reviewed_at: 2026-08-18T14:40:00.000Z
- 担当ID: independent-math-reviewer-C07
- 作業: C07-population-likelihood（母集団と標本・統計量／尤度と最尤推定）
- 対象: anki/cards/28_likelihood_mle.md（新規カード群）
- 査読日時: 2026-08-18

## 検証の要点

- スコア方程式・正規/二項/指数/一様の各MLE、十分統計量、完備性、Rao-Blackwell、Lehmann-Scheffé、Basu、スコア関数、漸近正規性を独立再計算。大部分は正しい。

## 指摘

### major
- major-1（umvu-construction）: 計算例が数学的に誤り。単一の Bernoulli X では δ(X)=aX+b のみで、E[δ]=ap+b は p の線形関数。2X²-X は {0,1} 上で X に等しく E[X]=p（p² ではない）。p² の不偏推定量は存在しない。正しくは n≥2 の Y=ΣX_i∼Binomial(n,p) で δ(Y)=Y(Y-1)/(n(n-1)) が UMVU。

### minor
- minor-1（mle-uniform-endpoint）: 「微分すると θ̂=0」は誤り。-n/θ=0 は有限解を持たず、単調減少で境界 X_(n) が最大。
- minor-2（mle-invariance）: 単調性は不要。任意の g で不変。
- minor-3（rao-blackwell）: 不等号の厳密性は補足のみ。本文は正しい。

## 検証結果
- 禁止形 LaTeX なし。npm run anki:validate 成功（354 cards, 0 warnings）。

## 結論
fatal: 0 / major: 1 / minor: 3

---

## 再査読記録（修正確認）

- 担当ID: independent-math-reviewer-C07（再査読）
- 再査読日時: 2026-08-18
- 対象: 初回指摘 major-1 / minor-1 / minor-2 / minor-3 に対する修正の確認
- 初回指摘は全件、修正確認済みであり、再計算で解消を確認。

### major-1（umvu-construction）: 解消
- 単一Bernoulliの誤った例（p² のUMVU）を、n=2 の二項 $Y=X_1+X_2\sim\operatorname{Binomial}(2,p)$ の $\delta(Y)=Y(Y-1)/2$ に差し替え。
- 独立再計算: $E[Y]=2p$、$E[Y^2]=2p(1-p)+4p^2=2p+2p^2$ より $E[Y(Y-1)]=2p^2$、したがって $E[\delta]=p^2$。p=0.2/0.5/0.8 で数値確認OK。完備十分 $Y$ の関数で不偏なので Lehmann–Scheffé より UMVU。正当な例に修正済み。

### minor-1（mle-uniform-endpoint）: 解消
- 「微分でθ̂=0」を「対数尤度 ℓ=-n log θ は単調減少で内点解がなく、境界 X_(n) が最大」に修正。ℓ'(θ)=-n/θ<0 であり、-n/θ=0 は有限解を持たない。正しい説明に修正済み。

### minor-2（mle-invariance）: 解消
- 単調性不要であること（任意の関数 g で変換不変）を明記。g が全射で逆を持つ仮定の下で成立、も併記され妥当。

### minor-3（rao-blackwell）: 対応不要（確認）
- 本文の分散分解 $\operatorname{Var}(\delta)=\operatorname{Var}(E[\delta|T])+E[\operatorname{Var}(\delta|T)]$ は正しい。不等号の厳密性に関する指摘は補足の性質であり、本文変更不要。再確認で問題なし。

### 検証
- 禁止形 LaTeX（バックスラッシュ括弧を使う形式等）なし。
- npm run anki:validate 成功: validated 354 cards (0 warnings) / built 354 cards / checked 354 cards。

### 再査読の結論
- 初回指摘（major-1 / minor-1 / minor-2 / minor-3）は全て解消・対応済み。
- fatal: 0 / major: 0 / minor: 0

## 尤度・最尤推定の計算例展開査読（2026-08-23）

- 担当ID: /root/math_review_population_cards
- 対象: `math-likelihood-mle` 全文、とくに結論だけだった計算例
- 初回結果: fatal 0 / major 4 / minor 2
- 初回指摘: 平均既知の正規分散MLEの不偏性、一様分布の端点規約、一致性・正則条件、ポアソン全0標本、退化標本、数式コマンド脱落。
- 修正: 尤度から最大確認までを展開し、境界・退化条件を場合分け。一致性のargmax条件と漸近正規性の追加条件を明記。
- 再計算: 制約付き推定、不変性、一致性、漸近正規性、非正則極限、多母数、期待対数尤度、右打切りを含む全展開が整合。
- `npm run validate`: success
- fatal: 0 / major: 0 / minor: 0

## 追加カード・表記統一の独立数理査読（2026-08-23）

- 担当ID: /root/math_review_population_cards
- 実行日時: 2026-08-23（Asia/Tokyo）
- 対象: `math-population-sample-statistic` 全文、新規基礎5カード、`29_estimation_properties.md` のラオ・ブラックウェル／一様最小分散不偏推定量、`notation.md`、`formulae.md`

### 初回指摘

- fatal: 0 / major: 2 / minor: 4
- major: `suff-normal` の尤度から $-n\mu^2/(2\sigma^2)$ が欠落。
- major: `est-umvu-idea` に「一様最小分散不偏推定量の存在なら完備十分統計量の関数」という一般には成り立たない逆向きの記述。
- minor: ラオ・ブラックウェルの定理の二乗可積分条件、最小十分性判定の正値・共通台条件、離散標本で同順位がある場合の順序統計量の説明、固有名・略語の表記統一。

### 修正確認

- 正規尤度を定数項と $n\mu^2$ を含む完全な式へ修正。
- 完備十分統計量の存在を仮定してレーマン・シェッフェの定理を適用する正しい向きへ修正。
- 二乗可積分条件、$0<p<1$、同順位を含む条件付き並びの説明を追加。
- 「ラオ・ブラックウェル」「レーマン・シェッフェ」「一様最小分散不偏（UMVU）推定量」へ統一。

### 再査読結論

- `npm run validate`: success
- fatal: 0 / major: 0 / minor: 0

## 計算例展開の独立数理査読（2026-08-23）

- 担当ID: /root/math_review_population_cards
- 対象: `suff-minimal`、`complete-statistic`、`exponential-family-completeness`、`suff-complete`、`lehmann-scheffe`、`basu-theorem`、`order-statistic-sufficiency`
- 初回結果: fatal 0 / major 2 / minor 0
- 初回指摘: 数式コマンドのバックスラッシュ脱落、連続分布の密度を点確率として扱った条件付き確率。
- 修正: コマンドを復元し、順序統計量の例を正の確率質量を持つ離散3点へ変更。同順位 $(a,a,c)$ も含めて条件付き確率を再計算。
- 独立再計算: 正規2母数の最小十分性、ポアソンの完備性、ベルヌーイ指数型分布族、正規・ポアソンのUMVU、バスーの定理、順序統計量の $1/6$ と $1/3$ はすべて整合。
- `npm run validate`: success
- fatal: 0 / major: 0 / minor: 0
