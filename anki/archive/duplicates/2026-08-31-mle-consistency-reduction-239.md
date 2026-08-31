---
id: mle-consistency
category: math-estimation
subcategory: math-likelihood-mle
title: 最尤推定量の一致性（直観と条件）
topic: mle-consistency
type: condition
difficulty: 3
priority: S
hashtags:
  - 最尤推定
  - 一致性
frequency:
  past_exam: 0
  textbook: 0
  independent_problems: 0
  source_confirmations: 0
sources:
  - type: official_syllabus
    topic: 最尤推定
archive_reason: duplicate
canonical_card: asym-mle-consistency
coverage_card: asym-mle-consistency
archive_note: 最尤推定量の一致性について、期待対数尤度の一意最大性と標本対数尤度の一様収束によるargmax条件は
  asym-mle-consistency が正本。旧カード固有だった一様分布 U(0,theta) の端点最尤推定量 X_(n)
  の直接一致性証明も正本へ吸収済みで、Bernoulli例も正本側に保持されるため旧カード固有の技能は残らない。
---
## 問題
最尤推定量 $\widehat\theta_n$ が真値 $\theta_0$ へ確率収束するための直観と条件を述べよ。
## 答え
識別可能性により期待対数尤度が真値 $\theta_0$ で一意に最大となり、標本対数尤度がその期待値へ母数について一様に近づけば、その最大点も $\theta_0$ に近づく。これが $\widehat\theta_n\xrightarrow{p}\theta_0$ の基本的な流れである。
## 使用公式・定理
代表的な argmax 条件は、(1) 真値が母数空間の内部にある、(2) 識別可能で期待対数尤度が真値で一意に最大、(3) 母数空間がコンパクト、または遠方で最大化を防ぐ外側制御がある、(4) 標本対数尤度が期待対数尤度へ一様収束する、である。各固定 $\theta$ での点ごとの大数の法則だけでは、移動する最大点の収束は保証できない。
## 計算例
$X_i\overset{iid}{\sim}U(0,\theta_0)$ では $\widehat\theta=X_{(n)}$ である。$0<\varepsilon<\theta_0$ に対して
$$P_{\theta_0}(|\widehat\theta-\theta_0|>\varepsilon)
=P_{\theta_0}(X_{(n)}<\theta_0-\varepsilon).$$
最大値が $\theta_0-\varepsilon$ より小さいのは全標本がそうである場合なので
$$P_{\theta_0}(X_{(n)}<\theta_0-\varepsilon)
=\left(\frac{\theta_0-\varepsilon}{\theta_0}\right)^n
\longrightarrow0.$$
よって $X_{(n)}\xrightarrow{p}\theta_0$ であり、最尤推定量は一致する。
## 一手
「1観測当たり対数尤度の極限が最大になるのは真値」という識別可能性を覚える。
