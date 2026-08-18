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
