---
id: multi-linear-combination
title: 多変量正規分布の線形結合を求める
category: applied-engineering
subcategory: engineering-multivariate
topic: linear-combination
type: theorem
difficulty: 2
priority: B
hashtags: [多変量正規分布, 線形変換, 分散]
frequency: { past_exam: 0, textbook: 0, independent_problems: 0, source_confirmations: 0 }
sources: [{ type: official_syllabus, topic: 多変量正規分布 }]
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

<!-- CARD -->
---
id: multi-covariance-psd
title: 共分散行列の半正定値性を二次形式で確認する
category: applied-engineering
subcategory: engineering-multivariate
topic: covariance-matrix
type: proof_step
difficulty: 2
priority: B
hashtags: [分散共分散行列, 半正定値, 二次形式]
frequency: { past_exam: 0, textbook: 0, independent_problems: 0, source_confirmations: 0 }
sources: [{ type: official_syllabus, topic: 共分散行列 }]
---
## 問題
共分散行列 $\boldsymbol\Sigma$ が半正定値である理由を示せ。
## 答え
任意の定数ベクトル $\boldsymbol a$ に対し、二次形式を分散と読む。
## 使用公式・定理
$$\operatorname{Var}(\boldsymbol a^{\mathsf T}\boldsymbol X)=\boldsymbol a^{\mathsf T}\operatorname{Cov}(\boldsymbol X)\boldsymbol a.$$
## 計算例
$$\boldsymbol a^{\mathsf T}\boldsymbol\Sigma\boldsymbol a=\operatorname{Var}(\boldsymbol a^{\mathsf T}\boldsymbol X)\ge0.$$
例えば $\boldsymbol\Sigma=\begin{pmatrix}1&1\\1&1\end{pmatrix}$ は半正定値だが正定値ではない。
## 注意
共分散行列は常に対称である。

<!-- CARD -->
---
id: multi-pca-eigen
title: 最大分散方向を固有ベクトルで求める
category: applied-engineering
subcategory: engineering-multivariate
topic: principal-component
type: strategy
difficulty: 3
priority: B
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
