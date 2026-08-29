---
id: asym-delta-bernoulli-odds
title: デルタ法でベルヌーイ確率のオッズの漸近分散を求める
category: math-estimation
subcategory: math-asymptotic-estimation
topic: delta-odds
type: calc_step
difficulty: 3
priority: A
hashtags:
  - デルタ法
  - ベルヌーイ分布
  - オッズ
frequency:
  past_exam: 0
  textbook: 0
  independent_problems: 0
  source_confirmations: 0
sources:
  - type: official_syllabus
    topic: デルタ法
archive_reason: too_specific
canonical_card: asym-logit-proportion-delta
archive_note: Bernoulli比率へ1次元Delta法を適用する同型例。オッズ p/(1-p) 単独より、logit=log{p/(1-p)}
  の方が統計推測で標準的で、同じ「微分の二乗×元分散」を練習できる。
---
## 問題
$\widehat p=\overline X$、$X_i\overset{iid}{\sim}\operatorname{Bernoulli}(p)$ とする。オッズ $g(p)=p/(1-p)$ の推定量 $g(\widehat p)$ の漸近分散を求めよ。

## 記号・用語
- $\xrightarrow{d}$：分布収束

## 使用公式・定理
**この欄の役割：解答で使う定義・公式・定理と、その適用条件**

1次元デルタ法：極限分散を $V$ とすると、変換後は $\{g'(p)\}^2V$。

## 一手
$g'(p)$ を商の微分で求めてから二乗する。

## 答え
$$\sqrt n(\widehat p-p)\xrightarrow{d}N(0,p(1-p)),$$
$$g'(p)=\frac1{(1-p)^2}.$$
したがって
$$\sqrt n\{g(\widehat p)-g(p)\}
\xrightarrow{d}N\left(0,\frac{p}{(1-p)^3}\right).$$
よって $g(\widehat p)$ 自身の漸近分散は $p/[n(1-p)^3]$。

## 計算例
$g(p)=p/(1-p)$ を微分すると
$$g'(p)=\frac{(1-p)+p}{(1-p)^2}=\frac1{(1-p)^2}.$$
$p=0.4$ では元の極限分散が $p(1-p)=0.24$ なので、変換後の極限分散は
$$\{g'(0.4)\}^2(0.24)
=\frac{0.24}{0.6^4}=\frac{0.4}{0.6^3}\approx1.85185.$$
$n=100$ では推定量自身の漸近分散が $1.85185/100\approx0.01852$、漸近標準誤差が $\sqrt{0.01852}\approx0.1361$ となる。

## 注意
$p$ が0または1に近いと微分が大きくなり、正規近似は不安定になる。

<!-- CARD -->

---
id: asym-delta-two-sample-log-risk-ratio
title: 多変量デルタ法で二標本の対数リスク比の分散を求める
category: math-estimation
subcategory: math-asymptotic-estimation
topic: multivariate-delta-risk-ratio
type: calc_step
difficulty: 4
priority: A
hashtags:
  - デルタ法
  - 二標本
  - リスク比
frequency:
  past_exam: 0
  textbook: 0
  independent_problems: 0
  source_confirmations: 0
sources:
  - type: official_syllabus
    topic: デルタ法
archive_reason: too_specific
canonical_card: asym-ratio-two-means-delta
archive_note: 独立2標本に多変量Delta法を使い、対角共分散行列と勾配から分散を作る同一move。平均比のcanonicalを代表例にし、log
  risk ratio固有の式はformula/reference側で参照可能とする。
---
## 問題
独立な2群で $Y_1\sim\operatorname{Binomial}(n_1,p_1)$、$Y_2\sim\operatorname{Binomial}(n_2,p_2)$ とし、$\widehat p_j=Y_j/n_j$ とする。$\log(\widehat p_1/\widehat p_2)$ の漸近分散を求めよ。

## 使用公式・定理
**この欄の役割：解答で使う定義・公式・定理と、その適用条件**

多変量デルタ法の分散公式：
$$\operatorname{Avar}\{g(\widehat{\boldsymbol\theta})\}
\approx\nabla g(\boldsymbol\theta)^T
\operatorname{Cov}(\widehat{\boldsymbol\theta})
\nabla g(\boldsymbol\theta).$$

## 一手
独立二標本なら分散共分散行列が対角になり、2項の和になる。

## 答え
$g(p_1,p_2)=\log p_1-\log p_2$ だから
$$\nabla g=\begin{pmatrix}1/p_1\\-1/p_2\end{pmatrix}.$$
独立性から共分散は0であり、
$$\operatorname{Avar}(\widehat p_j)=\frac{p_j(1-p_j)}{n_j}.$$
よって
$$\operatorname{Avar}\left\{\log\frac{\widehat p_1}{\widehat p_2}\right\}
\approx
\frac{1-p_1}{n_1p_1}+\frac{1-p_2}{n_2p_2}.$$

## 計算例
$g(p_1,p_2)=\log p_1-\log p_2$ なので
$$\nabla g(0.4,0.2)=\begin{pmatrix}1/0.4\\-1/0.2\end{pmatrix}
=\begin{pmatrix}2.5\\-5\end{pmatrix}.$$
$n_1=n_2=100$ では
$$\widehat{\operatorname{Var}}(\widehat p_1)=\frac{0.4(0.6)}{100}=0.0024,$$
$$\widehat{\operatorname{Var}}(\widehat p_2)=\frac{0.2(0.8)}{100}=0.0016.$$
独立性から共分散項は0なので
$$\widehat{\operatorname{Avar}}\left(\log\frac{\widehat p_1}{\widehat p_2}\right)
=(2.5)^2(0.0024)+(-5)^2(0.0016)
=0.015+0.04=0.055.$$
したがって標準誤差は $\sqrt{0.055}\approx0.2345$ である。

## 注意
成功数が0なら対数を取れないため、この近似をそのまま使えない。
