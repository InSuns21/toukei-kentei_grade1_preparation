---
id: samp-chisq-percentile
title: カイ二乗分布の上側分位点の使い方
category: math-distributions
subcategory: math-sampling-distributions
topic: chi-square-percentile
type: calc_step
difficulty: 2
priority: A
hashtags:
  - カイ二乗分布
  - 上側分位点
  - 区間推定
frequency:
  past_exam: 0
  textbook: 0
  independent_problems: 0
  source_confirmations: 0
sources:
  - type: official_syllabus
    topic: カイ二乗分布
archive_reason: reference_only
canonical_card: ci-variance-chi-derivation
archive_note: カイ二乗分位点の上下の使い分けは母分散区間canonicalで実際の区間構成として扱っており、単独参照カードは不要。
---
## 問題
$X\sim\chi^2_\nu$ とし、上側 $\alpha$ 分位点を $\chi^2_{\nu,\alpha}$ と書く。$P(\chi^2_{\nu,1-\alpha/2}\le X\le\chi^2_{\nu,\alpha/2})$ はいくらか。

## 答え
$$1-\alpha.$$

## 使用公式・定理
上側 $\alpha$ 分位点 $\chi^2_{\nu,\alpha}$ は $P(X>\chi^2_{\nu,\alpha})=\alpha$ を満たす。両側 $1-\alpha$ の区間は下側 $\chi^2_{\nu,1-\alpha/2}$ と上側 $\chi^2_{\nu,\alpha/2}$ ではさむ。

## 計算例
$\nu=9,\alpha=0.05$ なら $\chi^2_{9,0.975}\approx2.700$、$\chi^2_{9,0.025}\approx19.023$。確率 $0.95$ で $X$ はこの間にある。

## 一手
左右で確率 $\alpha/2$ ずつ残す。上側分位点は「その値より右の確率が $\alpha$」。

## 注意
$\chi^2$ は非対称なので上下の分位点は等距離でない。

<!-- CARD -->

---
id: samp-f-percentile
title: F分布の上側分位点と逆数関係
category: math-distributions
subcategory: math-sampling-distributions
topic: f-percentile-inverse
type: calc_step
difficulty: 2
priority: A
hashtags:
  - F分布
  - 上側分位点
  - 逆数
frequency:
  past_exam: 0
  textbook: 0
  independent_problems: 0
  source_confirmations: 0
sources:
  - type: official_syllabus
    topic: F分布
archive_reason: reference_only
canonical_card: samp-f-distribution-definition
archive_note: F分位点の逆数関係は強化済みF分布canonicalの1/F~F_{nu2,nu1}から導けるため単独参照カードは不要。
---
## 問題
$F_{\nu_1,\nu_2;\alpha}$ を上側 $\alpha$ 分位点とする。$F_{\nu_1,\nu_2;\alpha}$ を $F_{\nu_2,\nu_1;1-\alpha}$ で表せ。

## 答え
$$F_{\nu_1,\nu_2;\alpha}=\frac{1}{F_{\nu_2,\nu_1;1-\alpha}}.$$

## 使用公式・定理
$F\sim F_{\nu_1,\nu_2}$ なら $1/F\sim F_{\nu_2,\nu_1}$。上側 $\alpha$ 点と下側 $\alpha$ 点が逆数の関係で結ばれる。

## 計算例
$F_{3,8;0.05}=1/F_{8,3;0.95}$。

## 一手
上側 $\alpha$ を下側 $\alpha$ の逆数に直し、自由度を入れ替える。

## 注意
F分布表は上側分位点のみ載せていることが多い。小さい確率側は逆数で求める。

<!-- CARD -->

---
id: samp-t-percentile-symmetry
title: t分布の対称性と分位点
category: math-distributions
subcategory: math-sampling-distributions
topic: t-percentile-symmetry
type: calc_step
difficulty: 1
priority: A
hashtags:
  - t分布
  - 対称性
  - 分位点
frequency:
  past_exam: 0
  textbook: 0
  independent_problems: 0
  source_confirmations: 0
sources:
  - type: official_syllabus
    topic: t分布
archive_reason: reference_only
canonical_card: samp-t-distribution-definition
archive_note: t分布の0対称性は強化済みt分布canonicalに含まれ、分位点の符号反転はそこから直ちに導けるため単独カードは不要。
---
## 問題
$t_{\nu,\alpha}$ を上側 $\alpha$ 分位点とする。$t_{\nu,1-\alpha}$ を $t_{\nu,\alpha}$ で表せ。

## 答え
$$t_{\nu,1-\alpha}=-t_{\nu,\alpha}.$$

## 使用公式・定理
$t$ 分布の密度は0に関して対称なので、左裾の $\alpha$ 点は右裾の $\alpha$ 点の符号反転。

## 計算例
$t_{10,0.975}=-t_{10,0.025}$。$t_{10,0.025}\approx2.228$ なので $t_{10,0.975}\approx-2.228$。

## 一手
対称分布では下側分位点は上側の符号を反転。

## 注意
標準正規分布の $z$ 分位点と同じ性質。$\chi^2$ や $F$ にはない。
