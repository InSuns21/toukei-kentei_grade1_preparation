---
id: sim-inverse-transform-exponential-numeric
title: 逆関数法で指数乱数を計算する
category: math-data-analysis
subcategory: math-simulation
topic: inverse-transform-exponential
type: calc_step
difficulty: 2
priority: C
hashtags:
  - 乱数
  - 逆関数法
  - 指数分布
frequency:
  past_exam: 0
  textbook: 0
  independent_problems: 0
  source_confirmations: 0
sources:
  - type: official_syllabus
    topic: 乱数
archive_reason: duplicate
canonical_card: sim-inverse-transform-continuous
archive_note: 指数分布の逆関数法の導出・数値代入・端点注意まで、原理証明を含むcanonical cardへ統合済み。
---
## 問題
率 $\lambda>0$ の指数分布（台 $x\ge0$、分布関数 $F(x)=1-e^{-\lambda x}$）の乱数生成式を導き、$\lambda=2,\ U=0.8$ で計算せよ。

## 使用公式・定理
**この欄の役割：解答で使う定義・公式・定理と、その適用条件**

逆関数法 $X=F^{-1}(U)$。$1-U$ も $U(0,1)$ なので $X=-\log U/\lambda$ でもよい。

## 答え
$$U=1-e^{-\lambda X}
\Longrightarrow X=-\frac1\lambda\log(1-U).$$
したがって
$$X=-\frac12\log0.2\approx0.8047.$$

## 計算例
$U=0.5,\lambda=1$ なら $X=\log2$。

## 注意
$\log0$ を避けるため、実装では端点0を生成しない一様乱数を使う。

<!-- CARD -->

---
id: sim-mc-ci-numeric
title: Monte Carlo誤差の近似区間を計算する
category: math-data-analysis
subcategory: math-simulation
topic: monte-carlo-confidence
type: calc_step
difficulty: 2
priority: C
hashtags:
  - モンテカルロシミュレーション
  - 信頼区間
  - 数値計算
frequency:
  past_exam: 0
  textbook: 0
  independent_problems: 0
  source_confirmations: 0
sources:
  - type: official_syllabus
    topic: モンテカルロシミュレーション
archive_reason: duplicate
canonical_card: sim-mc-standard-error
archive_note: Monte Carlo標準誤差、95%近似区間、反復数の平方根則を同じ誤差評価canonical cardへ統合済み。
---
## 問題
独立反復 $m=2500$ で推定値1.40、反復値の標本標準偏差 $s=2.5$ を得た。Monte Carlo誤差だけに関する近似95%区間を求めよ。

## 記号・用語
- SE：標準誤差（standard error）

## 使用公式・定理
**この欄の役割：解答で使う定義・公式・定理と、その適用条件**

中心極限定理による $\widehat\mu_m\pm z_{0.975}s/\sqrt m$。

## 答え
$$\widehat{\operatorname{SE}}=\frac{2.5}{\sqrt{2500}}=0.05.$$
したがって
$$1.40\pm1.96(0.05)=[1.302,1.498].$$

## 計算例
半幅は0.098。

## 注意
これは統計モデルの標本誤差ではなく、有限反復による数値誤差。
