---
id: engproc-yule-walker-estimate-ar1
title: 標本自己相関からAR(1)係数をYule--Walker推定する
category: applied-engineering
subcategory: engineering-stochastic-processes
topic: yule-walker-estimation
type: calc_step
difficulty: 2
priority: A
hashtags:
  - 自己回帰過程
  - Yule-Walker方程式
  - 推定
frequency:
  past_exam: 0
  textbook: 0
  independent_problems: 0
  source_confirmations: 0
sources:
  - type: official_syllabus
    topic: 自己回帰過程
archive_reason: duplicate
canonical_card: ts-acf-pacf-identification
coverage_card: ts-acf-pacf-identification
archive_note: AR(1)で標本自己共分散からphi=gamma1/gamma0を推定し、gamma0(1-phi^2)から革新分散を求める手順、gamma0=10,gamma1=6でphi=0.6・革新分散6.4の数値例、定常性確認、有限標本の偏り注意まで時系列canonical
  cardへ統合済み。
---
## 問題
中心化済み系列の標本自己共分散が $\widehat\gamma(0)=10$、$\widehat\gamma(1)=6$ である。AR(1)係数と革新分散をYule--Walker法で推定せよ。
## 記号・用語
$\widehat\phi$ はAR係数、$\widehat\sigma_\varepsilon^2$ は革新分散推定値である。
## 使用公式・定理
$\phi=\gamma(1)/\gamma(0)$、$\sigma_\varepsilon^2=\gamma(0)(1-\phi^2)$。
## 一手／方針
ラグ1とラグ0の比で係数を求め、定常分散式を逆に解く。
## 答え
$$\widehat\phi=6/10=0.6,$$
$$\widehat\sigma_\varepsilon^2=10(1-0.6^2)=6.4.$$
## 計算例
推定係数は定常域 $|\widehat\phi|<1$ にある。
## 注意
有限標本では推定値に偏りがあり得る。
