---
id: engasym-sample-variance-normal
title: 正規標本の標本分散の漸近分布を求める
category: applied-engineering
subcategory: engineering-asymptotics
topic: sample-variance-asymptotics
type: calc_step
difficulty: 3
priority: A
hashtags:
  - 中心極限定理
  - 標本分散
  - 漸近分散
frequency:
  past_exam: 0
  textbook: 0
  independent_problems: 0
  source_confirmations: 0
sources:
  - type: official_syllabus
    topic: 漸近分散
archive_reason: duplicate
canonical_card: asym-sample-variance-fourth-moment
coverage_card: asym-sample-variance-fourth-moment
archive_note: 一般側正本へ、一般分布の4次中心モーメントによる導出に加え、正規標本の (n-1)S^2/sigma^2 ~ chi^2_{n-1}
  からの別導出、極限分散2sigma^4、n=100・S^2=9のプラグイン標準誤差約1.273まで統合済み。
---
## 問題
$X_i\overset{\mathrm{iid}}\sim N(\mu,\sigma^2)$ の不偏標本分散 $S^2$ の漸近分布を求めよ。（ここで $N$ は正規分布を表す。）
## 記号・用語
$S^2=(n-1)^{-1}\sum_i(X_i-\overline X)^2$。
## 使用公式・定理
正規標本では $(n-1)S^2/\sigma^2\sim\chi^2_{n-1}$、また $U_\nu\sim\chi_\nu^2$ なら $(U_\nu-\nu)/\sqrt{2\nu}\xrightarrow{d}N(0,1)$。
## 一手／方針
カイ二乗変数の平均 $n-1$ と分散 $2(n-1)$ で標準化する。
## 答え
$$\frac{(n-1)S^2/\sigma^2-(n-1)}{\sqrt{2(n-1)}}
=\frac{\sqrt{n-1}(S^2-\sigma^2)}{\sqrt2\,\sigma^2}\xrightarrow{d}N(0,1).$$
$\sqrt n/\sqrt{n-1}\to1$ とSlutskyの定理より
$$\sqrt n(S^2-\sigma^2)\xrightarrow{d}N(0,2\sigma^4).$$
## 計算例
$n=100,\widehat\sigma^2=9$ ならプラグイン標準誤差は $\sqrt{2(9^2)/100}\approx1.273$。
## 注意
非正規分布では漸近分散に第4中心モーメントが現れる。
