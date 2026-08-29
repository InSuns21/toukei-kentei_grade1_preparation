---
id: multi-covariance-psd
title: 分散共分散行列の半正定値性を二次形式で確認する
category: applied-engineering
subcategory: engineering-multivariate
topic: covariance-matrix
type: proof_step
difficulty: 2
priority: S
hashtags: [分散共分散行列, 半正定値, 二次形式]
frequency: { past_exam: 0, textbook: 0, independent_problems: 0, source_confirmations: 0 }
sources: [{ type: official_syllabus, topic: 分散共分散行列 }]
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

<!-- CARD -->
---
id: multi-pca-eigen
title: 最大分散方向を固有ベクトルで求める
category: applied-engineering
subcategory: engineering-multivariate
topic: principal-component
type: strategy
difficulty: 3
priority: A
hashtags: [主成分分析, 固有値, Rayleigh商]
frequency: { past_exam: 0, textbook: 0, independent_problems: 0, source_confirmations: 0 }
sources: [{ type: official_syllabus, topic: 固有値と固有ベクトル }]
---
## 問題
$\boldsymbol\Sigma=\begin{pmatrix}2&1\\1&2\end{pmatrix}$ の第1主成分方向を求めよ。
## 方針
$\|\boldsymbol a\|=1$ の下で $\boldsymbol a^{\mathsf T}\boldsymbol\Sigma\boldsymbol a$ を最大化するので、最大固有値の固有ベクトルを取る。
## 使用公式・定理
Rayleigh商の最大化：対称行列 $\boldsymbol\Sigma$ に対し
$$\max_{\boldsymbol a^{\mathsf T}\boldsymbol a=1}\boldsymbol a^{\mathsf T}\boldsymbol\Sigma\boldsymbol a=\lambda_{\max}.$$
## 計算例
まず特性方程式を解く。
$$\begin{aligned}0&=\det(\boldsymbol\Sigma-\lambda\boldsymbol I_2)\\&=\det\begin{pmatrix}2-\lambda&1\\1&2-\lambda\end{pmatrix}\\&=(2-\lambda)^2-1\\&=(\lambda-3)(\lambda-1).\end{aligned}$$
よって固有値は $3,1$。最大固有値 $3$ について
$$\begin{pmatrix}-1&1\\1&-1\end{pmatrix}\begin{pmatrix}a_1\\a_2\end{pmatrix}=\boldsymbol0$$
から $a_1=a_2$。長さを1に正規化して
$$\boldsymbol a=\frac1{\sqrt2}(1,1)^{\mathsf T}.$$
## 注意
固有ベクトルの符号反転は同じ主成分方向を表す。
