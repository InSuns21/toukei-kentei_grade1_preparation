---
id: dist-normal-linear-transform
published: true
title: 正規分布の線形変換後の分布を求める
category: math-distributions
subcategory: math-continuous-distributions
topic: normal-linear-transform
type: calc_step
difficulty: 1
priority: S
hashtags:
  - 正規分布（ガウス分布）
  - 線形変換
  - 分散
frequency:
  past_exam: 0
  textbook: 0
  independent_problems: 0
  source_confirmations: 0
sources:
  - type: official_syllabus
    topic: 正規分布（ガウス分布）
archive_reason: duplicate
canonical_card: prob-linear-combination-normal
coverage_card: prob-linear-combination-normal
archive_note: 多変量正規の正本をY=a^T X+bへ拡張し、1変量X~N(mu,sigma^2)ならaX+b~N(a mu+b,a^2
  sigma^2)、旧カードと同じX~N(2,9),Y=-X+4の例、a=0の退化分布まで統合済み。1変量だけの旧カードは一般アフィン変換の特殊ケース。
---
## 問題
正規分布 $X\sim N(\mu,\sigma^2)$、$a\ne0$、$Y=aX+b$ の分布を答えよ。
## 答え
$Y\sim N(a\mu+b,a^2\sigma^2).$
$a=0$ のときは $Y=b$ という退化分布になる。
## 使用公式・定理
期待値の線形性と $\operatorname{Var}(aX+b)=a^2\operatorname{Var}(X)$。
## 計算例
正規分布 $X\sim N(2,9)$、$Y=-X+4$ なら
$$Y\sim N(2,9).$$
平均は $-2+4=2$、分散は $(-1)^2\times9=9$。
## 一手
平均は $a\mu+b$、分散は $a^2\sigma^2$ と別々に計算する。
## 注意
分散に $b$ は入らず、係数 $a$ は二乗される。
