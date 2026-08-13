---
id: model-gauss-markov
title: Gauss--Markov定理の使用条件を列挙する
category: engineering-models
subcategory: linear-model
topic: blue
type: condition
difficulty: 2
priority: B
hashtags: [BLUE, 線形モデル, GaussMarkov]
frequency: { past_exam: 0, textbook: 0, independent_problems: 0, source_confirmations: 0 }
sources: [{ type: official_syllabus, topic: 線形モデル }]
---
## 問題
最小二乗推定量が最良線形不偏推定量（BLUE）となる主要条件は？
## 答え
固定計画 $\boldsymbol X\in\mathbb R^{n\times p}$（$n\ge p$）について、$\boldsymbol Y=\boldsymbol X\boldsymbol\beta+\boldsymbol\varepsilon$、$\boldsymbol\beta\in\mathbb R^p$、$E[\boldsymbol\varepsilon]=\boldsymbol0$、$\operatorname{Cov}(\boldsymbol\varepsilon)=\sigma^2\boldsymbol I_n$（$\sigma^2>0$）、$\boldsymbol X$ が列フルランクであること。
## 使用公式・定理
Gauss--Markov定理：上記条件の下で、最小二乗推定量は線形不偏推定量の中で共分散行列が最小である。
## 計算例
このとき
$$\widehat{\boldsymbol\beta}=(\boldsymbol X^{\mathsf T}\boldsymbol X)^{-1}\boldsymbol X^{\mathsf T}\boldsymbol Y,$$
公式へモデルを代入すると
$$\begin{aligned}E[\widehat{\boldsymbol\beta}]&=(\boldsymbol X^{\mathsf T}\boldsymbol X)^{-1}\boldsymbol X^{\mathsf T}E[\boldsymbol Y]\\&=(\boldsymbol X^{\mathsf T}\boldsymbol X)^{-1}\boldsymbol X^{\mathsf T}\boldsymbol X\boldsymbol\beta\\&=\boldsymbol\beta.\end{aligned}$$
## 注意
誤差の正規性はBLUE性そのものには不要である。

<!-- CARD -->
---
id: model-logistic-odds
title: ロジスティック回帰係数をオッズ比で読む
category: engineering-models
subcategory: glm
topic: logistic-regression
type: recognition
difficulty: 2
priority: B
hashtags: [GLM, ロジスティック回帰, オッズ比]
frequency: { past_exam: 0, textbook: 0, independent_problems: 0, source_confirmations: 0 }
sources: [{ type: official_syllabus, topic: 一般化線形モデル }]
---
## 問題
$\log\{p(x)/(1-p(x))\}=\beta_0+0.7x$ のとき、$x$ が1増えた際のオッズ比を求めよ。
## 答え
線形予測子の差を指数化する。
## 使用公式・定理
ロジットリンク $\log\{p(x)/(1-p(x))\}=\beta_0+\beta_1x$ では、$x$ が1増えるとオッズは $e^{\beta_1}$ 倍になる。
## 計算例
$$\exp\{(\beta_0+0.7(x+1))-(\beta_0+0.7x)\}=e^{0.7}\approx2.01.$$
## 注意
確率そのものが常に約2倍になるわけではない。

<!-- CARD -->
---
id: model-contrast
title: 線形対比の係数条件を確認する
category: engineering-models
subcategory: contrasts
topic: linear-contrast
type: condition
difficulty: 2
priority: B
hashtags: [線形対比, 制約, 分散分析]
frequency: { past_exam: 0, textbook: 0, independent_problems: 0, source_confirmations: 0 }
sources: [{ type: official_syllabus, topic: 線形対比と制約 }]
---
## 問題
3群平均の式 $\mu_1-(\mu_2+\mu_3)/2$ は線形対比か。
## 答え
係数の和が0なら線形対比である。
## 使用公式・定理
$\sum_{i=1}^kc_i=0$ を満たす $\sum_{i=1}^kc_i\mu_i$ を線形対比という。
## 計算例
$$1-\frac12-\frac12=0,$$
したがってこれは群1と群2・3の平均を比較する対比である。
## 注意
係数を定数倍しても同じ比較方向だが、推定量の分散は倍率の二乗倍になる。
