---
id: model-gauss-markov
title: Gauss--Markov定理の使用条件を列挙する
category: applied-common
subcategory: applied-multiple-regression
topic: blue
type: condition
difficulty: 2
priority: A
hashtags:
  - BLUE
  - 線形モデル
  - GaussMarkov
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
archive_note: 行列回帰正本へGauss--Markov定理の条件を統合済み。固定された列フルランクX、E[epsilon]=0、Var(epsilon)=sigma^2
  Iの下で最小二乗推定量の不偏性・共分散を導くだけでなく、任意の線形不偏推定量CyについてD=C-Bと置きVar(Cy)-Var(By)=sigma^2
  DD^T≽0を示してBLUE性まで証明し、正規性不要も明記したため旧単発カードは不要。
---
## 問題
最小二乗推定量が最良線形不偏推定量（BLUE）となる主要条件は？
## 答え
固定計画 $\boldsymbol X\in\mathbb R^{n\times p}$（$n\ge p$）について、$\boldsymbol Y=\boldsymbol X\boldsymbol\beta+\boldsymbol\varepsilon$、$\boldsymbol\beta\in\mathbb R^p$、$E[\boldsymbol\varepsilon]=\boldsymbol0$、$\operatorname{Cov}(\boldsymbol\varepsilon)=\sigma^2\boldsymbol I_n$（$\sigma^2>0$）、$\boldsymbol X$ が列フルランクであること。
## 使用公式・定理
Gauss--Markov定理：上記条件の下で、最小二乗推定量は線形不偏推定量の中で分散共分散行列が最小である。
## 計算例
このとき
$$\widehat{\boldsymbol\beta}=(\boldsymbol X^{\mathsf T}\boldsymbol X)^{-1}\boldsymbol X^{\mathsf T}\boldsymbol Y,$$
公式へモデルを代入すると
$$\begin{aligned}E[\widehat{\boldsymbol\beta}]&=(\boldsymbol X^{\mathsf T}\boldsymbol X)^{-1}\boldsymbol X^{\mathsf T}E[\boldsymbol Y]\\&=(\boldsymbol X^{\mathsf T}\boldsymbol X)^{-1}\boldsymbol X^{\mathsf T}\boldsymbol X\boldsymbol\beta\\&=\boldsymbol\beta.\end{aligned}$$
## 注意
誤差の正規性はBLUE性そのものには不要である。
