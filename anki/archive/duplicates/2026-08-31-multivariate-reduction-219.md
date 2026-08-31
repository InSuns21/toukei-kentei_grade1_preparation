---
id: multi-covariance-psd
title: 分散共分散行列の半正定値性を二次形式で確認する
category: applied-engineering
subcategory: engineering-multivariate
topic: covariance-matrix
type: proof_step
difficulty: 2
priority: S
hashtags:
  - 分散共分散行列
  - 半正定値
  - 二次形式
frequency:
  past_exam: 0
  textbook: 0
  independent_problems: 0
  source_confirmations: 0
sources:
  - type: official_syllabus
    topic: 分散共分散行列
archive_reason: duplicate
canonical_card: mv-mean-covariance-numeric
coverage_card: mv-mean-covariance-numeric
archive_note: 多変量平均・分散共分散行列の正本へ、任意のaについてa^T Sigma a=Var(a^T
  X)>=0から母分散共分散行列が半正定値である証明を統合済み。さらに標本共分散でもa^T S a=(n-1)^(-1) sum_i
  {a^T(x_i-xbar)}^2>=0を示し、数値例S=[[2,2],[2,2]]が半正定値だがdet(S)=0で特異となる理由まで扱うため旧単発カードは不要。
---
## 問題
分散共分散行列 $\boldsymbol\Sigma$ が半正定値である理由を示せ。
## 答え
任意の定数ベクトル $\boldsymbol a$ に対し、二次形式を分散と読む。
## 使用公式・定理
$$\operatorname{Var}(\boldsymbol a^{\mathsf T}\boldsymbol X)=\boldsymbol a^{\mathsf T}\operatorname{Cov}(\boldsymbol X)\boldsymbol a.$$
## 計算例
$$\boldsymbol a^{\mathsf T}\boldsymbol\Sigma\boldsymbol a=\operatorname{Var}(\boldsymbol a^{\mathsf T}\boldsymbol X)\ge0.$$
例えば $\boldsymbol\Sigma=\begin{pmatrix}1&1\\1&1\end{pmatrix}$ は半正定値だが正定値ではない。
## 注意
分散共分散行列は常に対称である。
