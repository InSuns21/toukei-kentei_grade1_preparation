---
id: est-delta-log
title: デルタ法で対数変換後の漸近分散を求める
category: math-estimation
subcategory: math-asymptotic-estimation
topic: delta-method
type: strategy
difficulty: 3
priority: S
hashtags: [デルタ法, 漸近分布, 微分]
frequency: { past_exam: 0, textbook: 0, independent_problems: 0, source_confirmations: 0 }
sources: [{ type: official_syllabus, topic: デルタ法 }]
archive_reason: too_specific
canonical_card: asym-delta-method
---
## 問題
$0<\sigma^2<\infty$、$\theta>0$ とし、正値推定量 $\widehat\theta$ が $\sqrt n(\widehat\theta-\theta)\xrightarrow{d}N(0,\sigma^2)$、すなわち正規分布 $N(0,\sigma^2)$ へ分布収束するとする。$\log\widehat\theta$ の漸近分布を求めよ。
## 方針
$g(x)=\log x$ の真値での導関数を漸近分散へ掛ける。
## 使用公式・定理
デルタ法：$\sqrt n(\widehat\theta-\theta)\xrightarrow{d}N(0,\sigma^2)$ かつ $g$ が $\theta$ で微分可能なら
$$\sqrt n\{g(\widehat\theta)-g(\theta)\}\xrightarrow{d}N(0,\{g'(\theta)\}^2\sigma^2).$$
## 計算例
$g'(\theta)=1/\theta$ だから、デルタ法の極限分散は
$$\sqrt n(\log\widehat\theta-\log\theta)\xrightarrow{d}N\left(0,\frac{\sigma^2}{\theta^2}\right).$$
$\theta=2$、元の極限分散が $\sigma^2=1$、$n=100$ なら
$$g'(2)=\frac12,
\qquad \operatorname{Avar}(\log\widehat\theta)
=\frac{(1/2)^2\cdot1}{100}=0.0025.$$
したがって漸近標準誤差は
$$\sqrt{0.0025}=0.05.$$
## 重要な一手
微分は推定値でなく真値 $\theta$ で評価する。
