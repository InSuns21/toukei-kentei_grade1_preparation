---
id: engproc-ljung-box-numeric
title: Ljung--Box統計量を残差自己相関から計算する
category: applied-engineering
subcategory: engineering-stochastic-processes
topic: ljung-box-test
type: calc_step
difficulty: 3
priority: A
hashtags:
  - 時系列解析
  - 残差診断
  - Ljung-Box検定
frequency:
  past_exam: 0
  textbook: 0
  independent_problems: 0
  source_confirmations: 0
sources:
  - type: official_syllabus
    topic: 時系列解析
archive_reason: duplicate
canonical_card: ts-software-residual-diagnostics
archive_note: Ljung--Box統計量の数値計算、自由度の扱い、P値出力の解釈、モデル見直しまでcanonical cardへ統合済み。
---
## 問題
$n=50$、残差自己相関が $r_1=0.20,r_2=-0.10$ である。ラグ2までのLjung--Box統計量 $Q$ を計算せよ。
## 記号・用語
$r_h$ はラグ $h$ の残差自己相関、帰無仮説は指定ラグまで残差が無相関であること。
## 使用公式・定理
$$Q=n(n+2)\sum_{h=1}^m\frac{r_h^2}{n-h}.$$
ARMA($p,q$)残差では近似的に $\chi^2_{m-p-q}$ と比較する。季節AR・MA項があれば、その動的係数数も自由度から引く。
## 一手／方針
各ラグの二乗を $n-h$ で割って足し、最後に $n(n+2)$ を掛ける。
## 答え
$$Q=50(52)\left(\frac{0.20^2}{49}+\frac{(-0.10)^2}{48}\right)$$
$$=2600(0.0008163+0.0002083)\approx2.66.$$
## 計算例
モデル母数を推定していない比較なら、自由度2の5%上側点5.991より小さく、帰無仮説を棄却しない。
## 注意
切片と革新分散は自由度から引く動的係数数に含めない。比較自由度が正になるよう $m$ を選ぶ。
