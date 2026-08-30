---
id: rao-blackwell
category: math-estimation
subcategory: math-population-sample-statistic
title: ラオ・ブラックウェルの定理
topic: rao-blackwell
type: theorem
difficulty: 3
priority: S
hashtags:
  - ラオ・ブラックウェルの定理
  - 十分統計量
  - 不偏性
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
archive_note: Rao–Blackwell化の不偏性保存・分散減少は、Lehmann–Scheffé/UMVUまで一続きに扱う
  est-rao-blackwell 正本へ統合済み。独立反復する旧定理カードは重複のため隔離する。
---
## 問題
ラオ・ブラックウェルの定理を述べよ。十分統計量 $T$ と、$E_\theta[\delta(X)^2]<\infty$ を満たす不偏推定量 $\delta(X)$ が与えられたとき、$\delta_T=E[\delta(X)\mid T]$ はどうなるか。
## 答え
$\delta_T=E[\delta(X)\mid T]$ は不偏で、$\operatorname{Var}_\theta(\delta_T)\le\operatorname{Var}_\theta(\delta(X))$（$\forall\theta$）。すなわち条件付き期待値を取る（ラオ・ブラックウェル化）と分散が減る。
## 使用公式・定理
不偏性は条件付き期待値の全期待値から
$$E_\theta[\delta_T]
=E_\theta\!\left[E_\theta[\delta(X)\mid T]\right]
=E_\theta[\delta(X)]
=\theta$$
と確認できる。分散分解から
$$\operatorname{Var}(\delta)
=\operatorname{Var}(E[\delta\mid T])
+E[\operatorname{Var}(\delta\mid T)]
\ge\operatorname{Var}(E[\delta\mid T])$$
である。
## 計算例
$X_1,X_2$ をベルヌーイ分布 $\operatorname{Bernoulli}(p)$ に従う独立同分布標本とし、$T=X_1+X_2$ とする。$T=t$ のもとで成功位置は対称だから
$$P(X_1=1\mid T=t)=\frac t2,$$
$$E[X_1\mid T=t]=1\cdot\frac t2+0\cdot\left(1-\frac t2\right)=\frac t2.$$
よって $E[X_1\mid T]=T/2=(X_1+X_2)/2$。さらに
$$\operatorname{Var}(X_1)=p(1-p),$$
$$\operatorname{Var}\!\left(\frac{X_1+X_2}{2}\right)
=\frac14\{\operatorname{Var}(X_1)+\operatorname{Var}(X_2)\}
=\frac{p(1-p)}2$$
となり、分散は半分になる。
## 一手
不偏なまま $T$ の関数に直すことで分散を下げる。
