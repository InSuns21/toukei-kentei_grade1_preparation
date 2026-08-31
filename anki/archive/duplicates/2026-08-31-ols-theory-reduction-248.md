---
id: enginf-ols-unbiased-condition
title: 最小二乗法の不偏性を条件付き期待値から導く
category: applied-engineering
subcategory: engineering-linear-inference
topic: ols-unbiasedness
type: calc_step
difficulty: 2
priority: S
hashtags:
  - 線形モデル
  - 不偏性
  - 外生性
frequency:
  past_exam: 0
  textbook: 0
  independent_problems: 0
  source_confirmations: 0
sources:
  - type: official_syllabus
    topic: 線形モデル
archive_reason: duplicate
canonical_card: reg-multiple-model-matrix
coverage_card: reg-multiple-model-matrix
archive_note: 固定された列フルランク計画の下で OLS を y=Xbeta+epsilon へ代入し、平均0誤差から
  E(beta_hat)=beta を導く議論は reg-multiple-model-matrix
  が正規方程式から不偏性・共分散・BLUE性まで一続きで導出済み。工学側の条件付き期待値表現は固定Xの同じ内容で、等分散性が不偏性には不要という区別も正本の議論から保持される。
---
## 問題
$\boldsymbol X$ が列フルランクで、$E[\boldsymbol\varepsilon\mid\boldsymbol X]=\boldsymbol0$ のもとで、最小二乗法が条件付き不偏であることを示せ。
## 記号・用語
条件付き不偏とは $E[\widehat{\boldsymbol\beta}\mid\boldsymbol X]=\boldsymbol\beta$ をいう。
## 使用公式・定理
$\boldsymbol Y=\boldsymbol X\boldsymbol\beta+\boldsymbol\varepsilon$ と最小二乗法公式を用いる。
## 一手／方針
応答モデルを最小二乗法公式へ代入し、誤差項を分離する。
## 答え
$$\widehat{\boldsymbol\beta}
=\boldsymbol\beta+(\boldsymbol X^{\mathsf T}\boldsymbol X)^{-1}\boldsymbol X^{\mathsf T}\boldsymbol\varepsilon,$$
したがって
$$E[\widehat{\boldsymbol\beta}\mid\boldsymbol X]
=\boldsymbol\beta+(\boldsymbol X^{\mathsf T}\boldsymbol X)^{-1}\boldsymbol X^{\mathsf T}E[\boldsymbol\varepsilon\mid\boldsymbol X]
=\boldsymbol\beta.$$
## 計算例
説明変数と誤差が相関すると最後の項が0にならず、欠落変数バイアスなどが生じ得る。
## 注意
等分散性は不偏性には不要であり、分散公式やBLUE性に必要である。

<!-- CARD -->

---
id: enginf-ols-covariance-matrix
title: 最小二乗法の分散共分散行列を導く
category: applied-engineering
subcategory: engineering-linear-inference
topic: ols-covariance
type: calc_step
difficulty: 3
priority: S
hashtags:
  - 線形モデル
  - 分散共分散行列
  - 最小二乗法
frequency:
  past_exam: 0
  textbook: 0
  independent_problems: 0
  source_confirmations: 0
sources:
  - type: official_syllabus
    topic: 線形モデル
archive_reason: duplicate
canonical_card: reg-multiple-model-matrix
coverage_card: reg-multiple-model-matrix
archive_note: Var(beta_hat)=sigma^2(X^T X)^(-1) の導出は reg-multiple-model-matrix が
  beta_hat=(X^T X)^(-1)X^T y
  と線形変換の分散公式から明示的に導出している。工学側は同じ導出を独立カード化しただけで、独自技能は残らない。
---
## 問題
$\boldsymbol X$ が列フルランクで、$\operatorname{Var}(\boldsymbol\varepsilon\mid\boldsymbol X)=\sigma^2\boldsymbol I_n$ のもとで、最小二乗法の条件付き分散を導け。
## 記号・用語
$\boldsymbol I_n$ は $n$ 次単位行列、$\sigma^2$ は誤差分散である。
## 使用公式・定理
$\operatorname{Var}(A\boldsymbol Z)=A\operatorname{Var}(\boldsymbol Z)A^{\mathsf T}$。
## 一手／方針
最小二乗法の確率部分を $A\boldsymbol\varepsilon$ と見て線形変換の分散公式を使う。
## 答え
$$\operatorname{Var}(\widehat{\boldsymbol\beta}\mid\boldsymbol X)
=(X^{\mathsf T}X)^{-1}X^{\mathsf T}(\sigma^2I_n)X(X^{\mathsf T}X)^{-1}$$
$$=\sigma^2(X^{\mathsf T}X)^{-1}.$$
## 計算例
$\sigma^2$ を $s^2=SSE/(n-k)$ で置換すると推定分散共分散行列になる。
## 注意
不均一分散では中央の $\sigma^2I_n$ が成立せず、サンドイッチ型分散などを使う。

<!-- CARD -->

---
id: enginf-gauss-markov-comparison
title: Gauss--Markov定理で線形推定量を比較する
category: applied-engineering
subcategory: engineering-linear-inference
topic: gauss-markov
type: recognition
difficulty: 2
priority: A
hashtags:
  - 線形モデル
  - Gauss-Markov定理
  - BLUE
frequency:
  past_exam: 0
  textbook: 0
  independent_problems: 0
  source_confirmations: 0
sources:
  - type: official_syllabus
    topic: 線形モデル
archive_reason: duplicate
canonical_card: reg-gauss-markov-theorem
coverage_card: reg-multiple-model-matrix
archive_note: Gauss--Markov定理の条件、BLUEの意味、任意の線形不偏推定量との差の共分散行列が半正定値になることは
  reg-gauss-markov-theorem が専用正本として扱い、reg-multiple-model-matrix では D=C-B
  を用いた証明まで導出している。工学側の比較カードは同結論の要約である。
---
## 問題
固定された列フルランク計画、$E[\varepsilon\mid X]=0$、$\operatorname{Var}(\varepsilon\mid X)=\sigma^2I$ のもとで、最小二乗法と他の線形不偏推定量をどう比較できるか。
## 記号・用語
BLUEは最良線形不偏推定量（best linear unbiased estimator）の略である。
## 使用公式・定理
Gauss--Markov定理：任意の線形不偏推定量 $\widetilde\beta$ に対し、$\operatorname{Var}(\widetilde\beta)-\operatorname{Var}(\widehat\beta_{\mathrm{LS}})$ は半正定値。
## 一手／方針
「最良」が分散共分散行列の差の半正定値性を意味すると読む。
## 答え
最小二乗法は線形不偏推定量のクラスでBLUEであり、任意の係数ベクトル $a$ について
$$\operatorname{Var}(a^{\mathsf T}\widetilde\beta)\ge
\operatorname{Var}(a^{\mathsf T}\widehat\beta_{\mathrm{LS}}).$$
## 計算例
誤差の正規性はBLUE性には不要だが、有限標本の $t,F$ 分布には必要である。
## 注意
非線形推定量を含む全推定量の中で最小分散という主張ではない。
