---
id: lehmann-scheffe
category: math-estimation
subcategory: math-population-sample-statistic
title: レーマン・シェッフェの定理
topic: lehmann-scheffe
type: theorem
difficulty: 3
priority: S
hashtags:
  - レーマン・シェッフェの定理
  - 一様最小分散不偏推定量
  - 完備十分
frequency:
  past_exam: 0
  textbook: 0
  independent_problems: 0
  source_confirmations: 0
sources:
  - type: official_syllabus
    topic: 十分統計量
archive_reason: duplicate
canonical_card: est-rao-blackwell
archive_note: 完備十分統計量の不偏関数が一意なUMVUになるLehmann–Schefféの役割は est-rao-blackwell
  正本でRao–Blackwell化との接続まで含めて扱っているため、単独定理カードを隔離する。
---
## 問題
レーマン・シェッフェの定理を述べよ。
## 答え
$T$ が完備十分統計量であり、$\delta(T)$ が $\theta$ の不偏推定量なら、$\delta(T)$ は $\theta$ の一意な一様最小分散不偏（一様最小分散不偏推定量）推定量である。
## 使用公式・定理
完備性により $T$ の関数で不偏なものは一意。よってそのような $\delta(T)$ が存在すれば、これが一様最小分散不偏（一様最小分散不偏推定量）推定量であり、一意に定まる。
## 計算例
$X_1,\ldots,X_n\overset{iid}{\sim}N(\mu,\sigma^2)$ とし、$\sigma^2$ は既知とする。尤度は
$$L(\mu;x)
=h(x)\exp\!\left\{\frac{\mu}{\sigma^2}\sum_i x_i
-\frac{n\mu^2}{2\sigma^2}\right\}$$
と書ける。自然母数 $\eta=\mu/\sigma^2$ は $\mathbb R$ 全体を動くので、$T=\sum_iX_i$ は完備十分統計量である。さらに
$$\overline X=\frac Tn,\qquad
E_\mu[\overline X]=\frac1n\sum_iE_\mu[X_i]=\mu.$$
よってレーマン・シェッフェの定理から、$\overline X$ は $\mu$ の一様最小分散不偏（一様最小分散不偏推定量）推定量である。
## 一手
「完備十分 $T$ の不偏な関数＝一様最小分散不偏（一様最小分散不偏推定量）推定量」を確認する。存在すれば一意である。
