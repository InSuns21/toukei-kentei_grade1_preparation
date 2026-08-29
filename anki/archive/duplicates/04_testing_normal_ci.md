---
id: test-normal-ci
title: 母分散既知の正規平均の信頼区間を作る
category: math-estimation
subcategory: math-interval-estimation
topic: confidence-interval
type: formula
difficulty: 2
priority: S
hashtags:
  - 信頼区間
  - 正規分布（ガウス分布）
  - 被覆確率
frequency:
  past_exam: 0
  textbook: 0
  independent_problems: 0
  source_confirmations: 0
sources:
  - type: official_syllabus
    topic: 区間推定
archive_reason: duplicate
canonical_card: ci-pivot-construction
---
## 問題
$X_i$ は独立同分布に正規分布 $N(\mu,4)$ に従うとする。台は実数全体、密度は $f(x)=(2\sqrt{2\pi})^{-1}\exp\{-(x-\mu)^2/8\}$ である。$n=100$、$\overline x=10$、$z_{0.975}=1.96$ のとき95%信頼区間を求めよ。
## 答え
$$\overline X\pm z_{0.975}\frac{\sigma}{\sqrt n}.$$
## 使用公式・定理
$Z=(\overline X-\mu)/(\sigma/\sqrt n)\sim N(0,1)$ を反転すると、信頼係数 $1-\alpha$ の区間は
$$\overline X\pm z_{1-\alpha/2}\frac{\sigma}{\sqrt n}.$$
## 計算例
$$\begin{aligned}\overline x\pm z_{0.975}\frac{\sigma}{\sqrt n}&=10\pm1.96\frac2{\sqrt{100}}\\&=10\pm0.392.\end{aligned}$$
下端は $10-0.392=9.608$、上端は $10+0.392=10.392$。したがって $(9.608,10.392)$。
## 注意
95%は「この実現区間に母数が95%の確率で入る」という事後確率ではない。
