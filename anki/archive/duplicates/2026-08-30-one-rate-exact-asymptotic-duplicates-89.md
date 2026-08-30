---
id: test-binomial-exact-one-sample
title: 1標本比率の正確二項検定を計算する
category: math-testing
subcategory: math-various-tests
topic: exact-binomial-test
type: calc_step
difficulty: 2
priority: A
hashtags:
  - 二項分布
  - 正確検定
  - 母比率
frequency:
  past_exam: 0
  textbook: 0
  independent_problems: 0
  source_confirmations: 0
sources:
  - type: official_syllabus
    topic: 二項分布・ポアソン分布など基本的な分布に関する検定
archive_reason: duplicate
canonical_card: test-one-proportion-score
archive_note: 正確二項裾確率、小標本時の方法選択、大標本スコア型Z近似まで1母比率検定canonical cardへ統合済み。
---
## 問題
$X\sim\operatorname{Binomial}(10,p)$ で成功数9。$H_0:p=0.5$ 対 $H_1:p>0.5$ の正確P値を求めよ。

## 使用公式・定理
**この欄の役割：解答で使う定義・公式・定理と、その適用条件**

帰無仮説下の二項分布で観測値以上の上側確率を足す。

## 答え
$$p\text{値}=P_{0.5}(X\ge9)
=\frac{\binom{10}{9}+\binom{10}{10}}{2^{10}}
=\frac{11}{1024}\approx0.01074.$$

## 計算例
5%では棄却し、1%では棄却しない。

## 注意
両側正確P値には複数の定義があり、採用した定義を明記する。

<!-- CARD -->

---
id: test-one-proportion-continuity
title: 1標本比率検定に連続修正を適用する
category: math-testing
subcategory: math-various-tests
topic: proportion-continuity-correction
type: calc_step
difficulty: 3
priority: A
hashtags:
  - 母比率
  - 連続修正
  - 二項分布
frequency:
  past_exam: 0
  textbook: 0
  independent_problems: 0
  source_confirmations: 0
sources:
  - type: official_syllabus
    topic: 二項分布・ポアソン分布など基本的な分布に関する検定
archive_reason: duplicate
canonical_card: test-one-proportion-score
archive_note: 二項分布の正規近似における連続修正と数値例は1母比率検定canonical cardへ統合済み。
---
## 問題
$X\sim\operatorname{Binomial}(100,0.5)$ で $P(X\ge60)$ を正規近似する標準化値を、連続修正ありで求めよ。

## 記号・用語
- $\Phi$：標準正規分布の累積分布関数

## 使用公式・定理
**この欄の役割：解答で使う定義・公式・定理と、その適用条件**

整数の上側事象 $X\ge x$ は境界を $x-0.5$ とする。

## 答え
$X\ge60$ を連続変数では $X>59.5$ と近似する。平均50、標準偏差5なので
$$z=\frac{59.5-50}{5}=1.9.$$

## 計算例
上側確率は $1-\Phi(1.9)\approx0.0287$。

## 注意
修正なしの $z=2$ より保守的な近似になる。

<!-- CARD -->

---
id: test-poisson-rate-score
title: ポアソン率のScore型検定を構成する
category: math-testing
subcategory: math-various-tests
topic: poisson-rate-score
type: formula
difficulty: 3
priority: A
hashtags:
  - ポアソン分布
  - スコア型検定
  - 率
frequency:
  past_exam: 0
  textbook: 0
  independent_problems: 0
  source_confirmations: 0
sources:
  - type: official_syllabus
    topic: 二項分布・ポアソン分布など基本的な分布に関する検定
archive_reason: duplicate
canonical_card: test-poisson-one-rate-exact
archive_note: 大標本のポアソン率スコア型Z近似と期待事象数による正確法・近似法の選択はcanonical cardへ統合済み。
---
## 問題
$X\sim\operatorname{Poisson}(t\lambda)$ の $H_0:\lambda=\lambda_0$ に対する大標本Z統計量を書け。

## 使用公式・定理
**この欄の役割：解答で使う定義・公式・定理と、その適用条件**

ポアソン分布の平均と分散はともに $t\lambda_0$。

## 答え
$E_0[X]=t\lambda_0$、$\operatorname{Var}_0(X)=t\lambda_0$ より
$$Z=\frac{X-t\lambda_0}{\sqrt{t\lambda_0}}.$$

## 計算例
$t=100,\lambda_0=2,X=230$ なら $Z=30/\sqrt{200}\approx2.121$。

## 注意
小さい期待度数では正規近似より正確検定を優先する。
