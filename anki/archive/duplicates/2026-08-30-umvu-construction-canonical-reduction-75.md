---
id: umvu-construction
category: math-estimation
subcategory: math-population-sample-statistic
title: 一様最小分散不偏（一様最小分散不偏推定量）推定量の構成
topic: umvu-construction
type: strategy
difficulty: 3
priority: A
hashtags:
  - 一様最小分散不偏推定量
  - 推定量
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
archive_note: UMVU構成の手順「不偏推定量→十分統計量で条件付け→完備性で一意なUMVU」は est-rao-blackwell
  正本の一手・Bernoulli例に統合済み。単独の構成カードは復習上の重複になるため隔離する。
---
## 問題
完備十分統計量 $T$ を使って $g(\theta)$ の一様最小分散不偏（一様最小分散不偏推定量）推定量を構成する手順を述べよ。
## 答え
1. $g(\theta)$ の不偏推定量 $\delta(X)$ を見つける。
2. ラオ・ブラックウェル化 $\delta_T=E[\delta(X)\mid T]$ して $T$ の関数にする。
3. $T$ が完備十分ならレーマン・シェッフェの定理から $\delta_T$ が一様最小分散不偏（一様最小分散不偏推定量）推定量になる。
## 使用公式・定理
$\delta_T=E[\delta(X)\mid T]$ は不偏かつ $T$ の関数である。$T$ が完備十分なら一意な一様最小分散不偏（一様最小分散不偏推定量）推定量になる。
## 計算例
$X_1,X_2\overset{iid}{\sim}\operatorname{Bernoulli}(p)$、$Y=X_1+X_2\sim\operatorname{Binomial}(2,p)$ は $p$ の完備十分統計量。$p^2$ の不偏推定量
$\delta(Y)=\frac{Y(Y-1)}{2}.$
$E[Y]=2p$、$E[Y^2]=\operatorname{Var}(Y)+E[Y]^2=2p(1-p)+4p^2=2p+2p^2$ より $E[Y(Y-1)]=2p^2$，すなわち $E[\delta]=p^2$。$Y$ の関数で不偏なので、レーマン・シェッフェの定理より一様最小分散不偏（一様最小分散不偏推定量）推定量である。
## 一手
「既知の不偏推定量 → $T$ で条件付け → 完備十分なら一様最小分散不偏（一様最小分散不偏推定量）推定量」の3段。
