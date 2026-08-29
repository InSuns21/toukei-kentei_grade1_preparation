---
id: ms-aic-formula
title: AIC（赤池情報量規準）の定義式を書く
category: math-estimation
subcategory: math-model-selection
topic: aic
type: formula
difficulty: 2
priority: B
hashtags:
  - 情報量規準AIC
  - モデル選択
  - 尤度
frequency:
  past_exam: 0
  textbook: 0
  independent_problems: 0
  source_confirmations: 0
sources:
  - type: official_syllabus
    topic: AIC
archive_reason: duplicate
canonical_card: ms-bic-numeric-comparison
archive_note: AIC=-2ell+2k
  の公式だけを再生するカードを別に持たない。canonical側は公式、2モデルへの代入、罰則とのトレードオフ、選択まで一度に実行する。
---
## 問題
標本サイズ $n$、最大化対数尤度 $\ell(\widehat\theta)$、推定母数数 $k$ のモデルのAICを定義せよ。
## 答え
正則なモデルで、期待KL損失を定数差を除いて推定する規準である。対数尤度が大きいほど、推定母数数が少ないほど小さくなる。
## 使用公式・定理
$\operatorname{AIC}=-2\ell(\widehat\theta)+2k$。
## 計算例
$\ell(\widehat\theta)=-100$、$k=3$ なら $\operatorname{AIC}=-2(-100)+2\cdot3=206$。$k=7$ なら $-2(-100)+2\cdot7=214$。
## 注意
小さいAICのモデルを選ぶ。ペナルティ $2k$ は自由度に対するもので正則化そのものではない。

<!-- CARD -->

---
id: ms-bic-formula
title: BIC（ベイズ情報量規準）の定義式を書く
category: math-estimation
subcategory: math-model-selection
topic: bic
type: formula
difficulty: 2
priority: C
hashtags:
  - ベイズ情報量規準
  - モデル選択
  - 尤度
frequency:
  past_exam: 0
  textbook: 0
  independent_problems: 0
  source_confirmations: 0
sources:
  - type: official_syllabus
    topic: モデル評価基準
archive_reason: duplicate
canonical_card: ms-bic-numeric-comparison
archive_note: BIC=-2ell+k log n の定義だけのカードを、標本サイズからlog nを計算し2モデルを比較するcanonicalへ統合する。
---
## 問題
標本サイズ $n$、最大化対数尤度 $\ell(\widehat\theta)$、推定母数数 $k$ のモデルのBICを定義せよ。
## 答え
AICと同形だが、母数ペナルティが標本サイズに依存し $\log n$ 倍になる。
## 使用公式・定理
$\operatorname{BIC}=-2\ell(\widehat\theta)+k\log n$。
## 計算例
$\ell(\widehat\theta)=-100$、$k=3$、$n=200$ なら $\operatorname{BIC}=-2(-100)+3\log200\approx200+3\cdot5.30=215.9$。
## 注意
小さいBICを選ぶ。$n>e^2$ なら $\log n>2$ なので、同じ $k$ に対するペナルティはAICより強い。

<!-- CARD -->

---
id: ms-cv-model-selection
title: k分割交差検証でモデルを選ぶ
category: math-estimation
subcategory: math-model-selection
topic: cv-model-selection
type: strategy
difficulty: 2
priority: B
hashtags:
  - クロスバリデーション
  - k分割交差検証
  - モデル選択
frequency:
  past_exam: 0
  textbook: 0
  independent_problems: 0
  source_confirmations: 0
sources:
  - type: official_syllabus
    topic: モデル評価基準
archive_reason: duplicate
canonical_card: ms-kfold-cv-numeric
archive_note: k分割交差検証の説明だけでなく、各foldの損失を平均してモデル選択まで行うcanonicalが同じmoveを包含する。
---
## 問題
モデルの複雑さパラメータ（多項式次数など）を決めたい。k分割交差検証（k-fold CV）でどう選ぶか。
## 方針
データをk分割し、各分割を一度ずつ検証に回し、残りで学習して検証誤差を出す。その平均が最小の複雑さを選ぶ。
## 使用公式・定理
$\operatorname{CV}_{(k)}=\dfrac1k\sum_{j=1}^k\dfrac1{|I_j|}\sum_{i\in I_j}L(\widehat f_{-j}(X_i),Y_i)$。
## 計算例
$k=5$、次数 $d=1,3,9$ のCV誤差がそれぞれ $2.1,0.9,1.4$。最小の $d=3$ を選ぶ。
## 注意
データは学習と検証で分け、検証誤差は未知データの代わりに使う。

<!-- CARD -->

---
id: ms-ridge-shrinkage
title: Ridgeが係数を一様に縮小することを確認する
category: math-estimation
subcategory: math-model-selection
topic: ridge-shrinkage
type: calc_step
difficulty: 3
priority: C
hashtags:
  - Ridge回帰
  - L2正則化
  - 縮小
frequency:
  past_exam: 0
  textbook: 0
  independent_problems: 0
  source_confirmations: 0
sources:
  - type: official_syllabus
    topic: 重回帰モデル
archive_reason: duplicate
canonical_card: ms-ridge-lasso-orthogonal-numeric
archive_note: 直交設計でRidgeが係数を縮める計算は、RidgeとLassoを同じ数値例で比較するcanonicalに包含される。
---
## 問題
$\boldsymbol X$ の列が直交（$\boldsymbol X^{\mathsf T}\boldsymbol X=\boldsymbol I$）するとき、Ridge推定量が最小二乗法推定量をどう変えるか示せ。
## 答え
各係数を $1/(\lambda+1)$ 倍に縮小する。L2は係数を0にしない。
## 使用公式・定理
$\boldsymbol X^{\mathsf T}\boldsymbol X=\boldsymbol I$ をRidge公式へ代入すると
$$\widehat{\boldsymbol\beta}_{\mathrm{ridge}}
=(\boldsymbol I+\lambda\boldsymbol I)^{-1}\boldsymbol X^{\mathsf T}\boldsymbol Y
=\frac1{1+\lambda}\boldsymbol X^{\mathsf T}\boldsymbol Y.$$
一方、$\widehat{\boldsymbol\beta}^{\mathrm{LS}}=\boldsymbol X^{\mathsf T}\boldsymbol Y$ なので
$$\widehat\beta_j^{\mathrm{ridge}}=\frac1{1+\lambda}\widehat\beta_j^{\mathrm{LS}}.$$
## 計算例
$\widehat\beta_1^{\mathrm{LS}}=3$、$\lambda=0.5$ なら $\widehat\beta_1^{\mathrm{ridge}}=3/1.5=2$。符号も大きさも最小二乗法より小さい。
## 注意
縮小は一様だが非零なので変数選択はしない。

<!-- CARD -->

---
id: ms-train-test-error
title: 訓練誤差と検証誤差を比較してモデルを選ぶ
category: math-estimation
subcategory: math-model-selection
topic: train-test-error
type: formula
difficulty: 2
priority: C
hashtags:
  - 訓練誤差
  - テスト誤差
  - モデル選択
frequency:
  past_exam: 0
  textbook: 0
  independent_problems: 0
  source_confirmations: 0
sources:
  - type: official_syllabus
    topic: モデル評価基準
archive_reason: duplicate
canonical_card: ms-overfitting-generalization
archive_note: 訓練誤差が低くても検証誤差が悪化するという同一判断。canonical側は複雑度1,3,9の訓練・テスト誤差を並べ、過学習まで説明する。
---
## 問題
候補モデルが2つある。訓練平均二乗誤差と検証平均二乗誤差がそれぞれ $(0.30,0.55)$ と $(0.50,0.48)$ のとき、未知データへの予測を目的としてどちらを選ぶか。
## 答え
モデル選択に使う検証誤差が小さい方を選ぶ。
## 使用公式・定理
検証誤差 $= \dfrac1{m_{\mathrm{val}}}\sum_{i=1}^{m_{\mathrm{val}}}L(\widehat f(X_i),Y_i)$。学習に使わない検証データで候補を比較する。
## 計算例
モデル1の検証平均二乗誤差 $0.55$ > モデル2の $0.48$。よってモデル2を選ぶ。モデル1は訓練誤差 $0.30$ が小さいが過学習の疑いがある。
## 注意
テストデータはモデル選択に使わず、モデルと調整値を確定した後の最終評価にだけ使う。検証データを繰り返し見て調整すると、検証データにも過学習しうる。
