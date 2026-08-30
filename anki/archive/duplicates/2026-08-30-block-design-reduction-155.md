---
id: design-rcbd-sums-squares
title: 乱塊法の平方和を分解する
category: applied-common
subcategory: applied-design
topic: rcbd-sums-squares
type: formula
difficulty: 4
priority: B
hashtags:
  - 乱塊法
  - 平方和
  - 分散分析
frequency:
  past_exam: 0
  textbook: 0
  independent_problems: 0
  source_confirmations: 0
sources:
  - type: official_syllabus
    topic: 乱塊法
archive_reason: duplicate
canonical_card: design-rcbd-anova-numeric
archive_note: 乱塊法の処置・ブロック・誤差平方和の定義と分解を、加法モデルからF検定まで解くcanonical cardへ統合済み。
---
## 問題
a処置、bブロック、各セル1観測の乱塊法で平方和を平均記号で書け。

## 使用公式・定理
**この欄の役割：解答で使う定義・公式・定理と、その適用条件**

バランスした加法モデルの直交平方和分解。

## 答え
$$SS_T=\sum_{i,j}(y_{ij}-\bar y_{\cdot\cdot})^2,$$
$$SS_A=b\sum_i(\bar y_{i\cdot}-\bar y_{\cdot\cdot})^2,$$
$$SS_B=a\sum_j(\bar y_{\cdot j}-\bar y_{\cdot\cdot})^2,$$
$$SS_E=SS_T-SS_A-SS_B.$$

## 計算例
処置平方和は処置平均差、ブロック平方和はブロック平均差を測る。

## 注意
ここで添字Tは全平方和、Aは処置、Bはブロック。

<!-- CARD -->

---
id: design-rcbd-degrees-freedom
title: 乱塊法の自由度を穴埋めする
category: applied-common
subcategory: applied-design
topic: rcbd-degrees-freedom
type: calc_step
difficulty: 2
priority: B
hashtags:
  - 乱塊法
  - 自由度
  - 分散分析表
frequency:
  past_exam: 0
  textbook: 0
  independent_problems: 0
  source_confirmations: 0
sources:
  - type: official_syllabus
    topic: 乱塊法
archive_reason: duplicate
canonical_card: design-rcbd-anova-numeric
archive_note: df_T=ab-1、df_A=a-1、df_B=b-1、df_E=(a-1)(b-1) と自由度和の検算をcanonical cardへ統合済み。
---
## 問題
a処置、bブロック、各セル1観測の乱塊法について、全・処置・ブロック・誤差の自由度を書け。

## 使用公式・定理
**この欄の役割：解答で使う定義・公式・定理と、その適用条件**

$$ab-1=(a-1)+(b-1)+(a-1)(b-1).$$

## 答え
$$df_T=ab-1,\quad df_A=a-1,\quad df_B=b-1,$$
$$df_E=(a-1)(b-1).$$

## 計算例
$a=4,b=5$ なら自由度は全19、処置3、ブロック4、誤差12。

## 注意
交互作用を誤差として扱う各セル1観測の加法モデル。

<!-- CARD -->

---
id: engdesign-rcbd-adjusted-difference
title: 乱塊法の処置差をブロック内差から求める
category: applied-engineering
subcategory: engineering-design
topic: randomized-complete-block
type: calc_step
difficulty: 2
priority: B
hashtags:
  - ブロック化
  - 乱塊法
  - 処置差
frequency:
  past_exam: 0
  textbook: 0
  independent_problems: 0
  source_confirmations: 0
sources:
  - type: official_syllabus
    topic: ブロック化
archive_reason: duplicate
canonical_card: design-rcbd-anova-numeric
archive_note: 2処置3ブロックの数値例(4,3,2)から処置差3を求め、加法モデルでブロック共通項が差により消える導出までcanonical cardへ統合済み。
---
## 問題
3ブロックで処置A、Bの観測が $(10,14),(9,12),(13,15)$ である。B−Aの処置差を求めよ。
## 記号・用語
各組は同一ブロック内の $(A,B)$ 観測である。
## 使用公式・定理
完全ブロックで2処置なら処置差推定量はブロック内差 $D_j=Y_{Bj}-Y_{Aj}$ の平均である。
## 一手／方針
ブロックごとの差を作り、その平均を取る。
## 答え
差は $(4,3,2)$ なので $\overline D=(4+3+2)/3=3$。
## 計算例
ブロック水準がそれぞれ大きく違っても、加法モデルなら差で除ける。
## 注意
欠測がある不完備ブロックでは単純な差平均をそのまま使えない。
