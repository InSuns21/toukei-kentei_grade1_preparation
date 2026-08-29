---
id: ms-cv-loo
title: leave-one-out交差検証（LOOCV）を定義する
category: math-estimation
subcategory: math-model-selection
topic: loo-cv
type: formula
difficulty: 2
priority: C
hashtags:
  - クロスバリデーション
  - Leave-One-Out交差検証
  - モデル選択
frequency:
  past_exam: 0
  textbook: 0
  independent_problems: 0
  source_confirmations: 0
sources:
  - type: official_syllabus
    topic: モデル評価基準
archive_reason: too_specific
canonical_card: ms-kfold-cv-numeric
archive_note: LOOCVはk=nの交差検証という特殊例。線形回帰のPRESS/レバレッジによる閉形式は別の回帰canonicalで扱うため、モデル選択側に定義専用カードを重ねない。
---
## 問題
観測数 $n$ のleave-one-out交差検証（LOOCV）の予測誤差を定義せよ。
## 答え
各 $i$ を一度ずつ検証にし、残り $n-1$ 件で学習したモデルで予測誤差を出し、全件平均する。
## 使用公式・定理
$\operatorname{LOOCV}=\dfrac1n\sum_{i=1}^nL(\widehat f_{-i}(X_i),Y_i)$。
## 計算例
$n=100$。各 $i$ について $\widehat f_{-i}$ を作り、その予測と $Y_i$ の二乗誤差を平均する。$i=1$ で $(0.3)^2=0.09$ など。
## 注意
線形回帰では閉形式 $\operatorname{LOOCV}=n^{-1}\sum_i\{(Y_i-\widehat Y_i)/(1-h_{ii})\}^2$ がある（$h_{ii}$ はレバレッジ）。

<!-- CARD -->

---
id: ms-aic-asymptotic-loo
title: AICがleave-one-out交差検証と漸近的に等価な理由を述べる
category: math-estimation
subcategory: math-model-selection
topic: aic-loo
type: expansion
difficulty: 3
priority: C
hashtags:
  - 情報量規準AIC
  - クロスバリデーション
  - 予測誤差
frequency:
  past_exam: 0
  textbook: 0
  independent_problems: 0
  source_confirmations: 0
sources:
  - type: official_syllabus
    topic: AIC
archive_reason: too_specific
canonical_card: ms-bic-numeric-comparison
archive_note: AICとLOOCVの漸近同値は理論補足としては有用だが、通常の統計検定1級カード600枚枠で独立に反復する優先度は低い。公式・補足側へ寄せる。
---
## 問題
なぜAICはデータの分割をせずに、leave-one-out交差検証（LOOCV）の予測誤差と漸近的に一致するのか。
## 答え
予測対数尤度の期待値と訓練対数尤度の差が $k$ で漸近評価できるため。
## 使用公式・定理
正則なモデルでは、AICとLOOCVの負の予測対数尤度は、モデル比較に共通な定数と尺度を除いて漸近的に同じ評価を与える。すなわち
$$\operatorname{AIC}=-2\ell(\widehat\theta)+2k\ \approx\ -2\sum_{i=1}^n\log f(X_i;\widehat\theta_{-i}).$$
$f$ は密度、$\widehat\theta_{-i}$ は $i$ 番目を除いて求めた推定量である。LOOCV側へさらに $2k$ を加えない。
## 計算例
線形回帰・正規誤差モデルでは $\operatorname{AIC}=n\log(\widehat\sigma^2)+2k+C$（$C$ は定数）。これは $\widehat\sigma^2$ によるLOOCV評価と $n\to\infty$ で一致する。
## 注意
一致は大標本・正則性の下の漸近的性質。

<!-- CARD -->

---
id: ms-bic-consistency
title: BICが真のモデルを選ぶ一致性を持つことを確認する
category: math-estimation
subcategory: math-model-selection
topic: bic-consistency
type: recognition
difficulty: 3
priority: C
hashtags:
  - ベイズ情報量規準
  - 一致性
  - モデル選択
frequency:
  past_exam: 0
  textbook: 0
  independent_problems: 0
  source_confirmations: 0
sources:
  - type: official_syllabus
    topic: モデル評価基準
archive_reason: too_specific
canonical_card: ms-bic-numeric-comparison
archive_note: BICのモデル選択一致性は標準的な性質だが、通常デッキではBIC計算・AICとの罰則差を優先し、漸近的一致性だけの独立カードは外す。
---
## 問題
真の分布が候補モデル群に含まれるとき、BICによるモデル選択の大標本極限の性質は何か。
## 答え
正則性などの条件の下で、真のモデル（真の分布を含む最小の候補）を選ぶ確率が $1$ へ収束する。すなわちBICはモデル選択一致性を持つ。
## 使用公式・定理
$n\to\infty$ で $P(\text{BICが真のモデルを選ぶ})\to1$。
## 計算例
真が $k=2$ のモデルなら、過剰な $k=5$ モデルの $-2\ell$ の改善 $O_p(1)$ に対しペナルティ差 $(5-2)\log n\to\infty$ なので過剰モデルは棄却される。
## 注意
AICは一致性を持たず、過剰なモデルを選びうる。

<!-- CARD -->

---
id: ms-elastic-net
title: Elastic Netの定義式を書く
category: math-estimation
subcategory: math-model-selection
topic: elastic-net
type: formula
difficulty: 3
priority: C
hashtags:
  - Elastic Net
  - L1正則化
  - L2正則化
frequency:
  past_exam: 0
  textbook: 0
  independent_problems: 0
  source_confirmations: 0
sources:
  - type: official_syllabus
    topic: L1正則化法
archive_reason: too_specific
canonical_card: ms-ridge-lasso-orthogonal-numeric
archive_note: Elastic
  NetはL1/L2の混合という派生で、通常デッキではRidgeとLassoの違いを数値で再生できれば十分。定義式はformula/reference側に置く。
---
## 問題
Elastic Netの推定量を定義せよ。$\alpha\in[0,1]$ は混合比。
## 答え
L1とL2のペナルティを混ぜ、スパース性と相関変数のグループ選択を両立させる。
## 使用公式・定理
$\widehat{\boldsymbol\beta}=\arg\min_{\boldsymbol\beta}\left\{\sum_{i=1}^n(Y_i-\boldsymbol x_i^{\mathsf T}\boldsymbol\beta)^2+\lambda\bigl(\alpha\sum_j|\beta_j|+(1-\alpha)\tfrac12\sum_j\beta_j^2\bigr)\right\}$。
## 計算例
$\alpha=0.5$、$\lambda=1$ ならペナルティは $0.5\sum|\beta_j|+0.25\sum\beta_j^2$。$\alpha=0$ はRidge、$\alpha=1$ はLassoに一致。
## 注意
強相関変数をまとめて選びやすい。
