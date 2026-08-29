---
id: multi-linear-combination
title: 多変量正規分布の線形結合を求める
category: applied-engineering
subcategory: engineering-multivariate
topic: linear-combination
type: theorem
difficulty: 2
priority: S
hashtags: [多変量正規分布, 線形変換, 分散]
frequency: { past_exam: 0, textbook: 0, independent_problems: 0, source_confirmations: 0 }
sources: [{ type: official_syllabus, topic: 多変量正規分布 }]
archive_reason: duplicate
canonical_card: engmv-linear-combination-normal
---
## 問題
$\boldsymbol X$ が2変量正規分布 $N_2((1,2)^{\mathsf T},\begin{pmatrix}4&1\\1&9\end{pmatrix})$ に従うとき、$Y=X_1-X_2$ の分布を求めよ。
## 答え
線形結合は正規分布で、平均と分散を線形代数で移す。
## 使用公式・定理
$\boldsymbol X$ が多変量正規分布 $N_p(\boldsymbol\mu,\boldsymbol\Sigma)$ に従うなら
$$\boldsymbol a^{\mathsf T}\boldsymbol X\sim N(\boldsymbol a^{\mathsf T}\boldsymbol\mu,\boldsymbol a^{\mathsf T}\boldsymbol\Sigma\boldsymbol a).$$
## 計算例
$\boldsymbol a=(1,-1)^{\mathsf T}$ として
$$E[Y]=\boldsymbol a^{\mathsf T}\boldsymbol\mu=-1,\qquad \operatorname{Var}(Y)=\boldsymbol a^{\mathsf T}\boldsymbol\Sigma\boldsymbol a=11.$$
よって $Y$ は正規分布 $N(-1,11)$ に従う。
