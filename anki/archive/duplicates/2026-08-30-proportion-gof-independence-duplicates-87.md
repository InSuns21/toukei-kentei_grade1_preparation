---
id: test-two-proportion-numeric
title: 2母比率差のZ検定を数値で完遂する
category: math-testing
subcategory: math-various-tests
topic: two-proportion-numeric
type: calc_step
difficulty: 3
priority: A
hashtags:
  - 母比率差
  - Z検定
  - P値
frequency:
  past_exam: 0
  textbook: 0
  independent_problems: 0
  source_confirmations: 0
sources:
  - type: official_syllabus
    topic: 二項分布・ポアソン分布など基本的な分布に関する検定
archive_reason: duplicate
canonical_card: test-two-proportion-pooled
archive_note: 2母比率差のプール比率、標準誤差、Z統計量、両側P値の数値計算はcanonical cardへ統合済み。
---
## 問題
独立2群で $(x_1,n_1)=(60,100)$、$(x_2,n_2)=(40,100)$。$H_0:p_1=p_2$ を両側5%で検定せよ。

## 記号・用語
- 棄却域：帰無仮説を棄却する統計量・標本結果の集合

## 使用公式・定理
**この欄の役割：解答で使う定義・公式・定理と、その適用条件**

両側棄却域は $|Z|>z_{0.025}=1.96$。

## 一手
分子は標本比率差、分母だけ帰無仮説下でプールする。

## 答え
$\widehat p=100/200=0.5$。標準誤差は
$$\sqrt{0.5(0.5)(1/100+1/100)}=\sqrt{0.005}\approx0.07071.$$
$$Z=\frac{0.6-0.4}{0.07071}\approx2.828.$$

## 計算例
$2.828>1.96$ なので棄却し、P値は約0.0047。

<!-- CARD -->

---
id: test-goodness-fit-numeric
title: Pearson適合度検定を数値で完遂する
category: math-testing
subcategory: math-various-tests
topic: goodness-fit-numeric
type: calc_step
difficulty: 2
priority: A
hashtags:
  - 適合度の検定
  - Pearson統計量
  - 期待度数
frequency:
  past_exam: 0
  textbook: 0
  independent_problems: 0
  source_confirmations: 0
sources:
  - type: official_syllabus
    topic: 適合度の検定
archive_reason: duplicate
canonical_card: test-goodness-fit-statistic
archive_note: Pearson適合度統計量の数値計算と臨界値判定はcanonical cardへ統合済み。
---
## 問題
4区分の帰無確率が各 $1/4$、$n=100$、観測度数が $(35,25,20,20)$。Pearson統計量を求めよ。

## 使用公式・定理
**この欄の役割：解答で使う定義・公式・定理と、その適用条件**

自由度は $4-1=3$。

## 一手
期待度数を全区分で先に計算し、和が標本数になるか確認する。

## 答え
期待度数は各25。
$$X^2=\frac{(35-25)^2}{25}+0+\frac{(20-25)^2}{25}+\frac{(20-25)^2}{25}=4+1+1=6.$$

## 計算例
$\chi^2_3$ の上側5%点7.815より小さいため棄却しない。

<!-- CARD -->

---
id: test-goodness-fit-estimated-parameters
title: ポアソン適合度検定の期待度数と自由度を作る
category: math-testing
subcategory: math-various-tests
topic: goodness-fit-df
type: calc_step
difficulty: 3
priority: A
hashtags:
  - 適合度の検定
  - 自由度
  - 母数推定
frequency:
  past_exam: 0
  textbook: 0
  independent_problems: 0
  source_confirmations: 0
sources:
  - type: official_syllabus
    topic: 適合度の検定
archive_reason: duplicate
canonical_card: test-goodness-fit-statistic
archive_note: 同じデータから母数を推定したときの自由度 k-1-r とポアソン適合度の数値例はcanonical cardへ統合済み。
---
## 問題
$n=50$ 個の度数データの総和が40である。ポアソン分布への適合度検定で、区分を $0,1,2,3+$ の4個とする。$X=0$ の期待度数と自由度を求めよ。

## 使用公式・定理
**この欄の役割：解答で使う定義・公式・定理と、その適用条件**

$r$ 個の独立な母数を効率的に推定すると、各推定制約につき自由度を1つ失う。

## 答え
まず同じデータから
$$\widehat\lambda=\frac{40}{50}=0.8$$
と推定する。ポアソン分布の確率質量関数 $P(X=x)=e^{-\lambda}\lambda^x/x!$ より、
$$E_0=50P_{\widehat\lambda}(X=0)=50e^{-0.8}\approx22.47.$$
区分数 $k=4$、推定母数数 $r=1$ なので
$$\nu=k-1-r=4-1-1=2.$$

## 計算例
母数が事前に完全指定なら自由度は $4-1=3$ だが、$\lambda$ を推定したため2。

## 注意
外部データから母数が既知として与えられた場合は推定母数として引かない。

<!-- CARD -->

---
id: test-goodness-fit-expected-counts
title: 適合度検定の小さい期待度数を処理する
category: math-testing
subcategory: math-various-tests
topic: goodness-fit-conditions
type: condition
difficulty: 2
priority: A
hashtags:
  - 適合度の検定
  - 期待度数
  - 適用条件
frequency:
  past_exam: 0
  textbook: 0
  independent_problems: 0
  source_confirmations: 0
sources:
  - type: official_syllabus
    topic: 適合度の検定
archive_reason: duplicate
canonical_card: test-goodness-fit-statistic
archive_note: 小さい期待度数の確認、隣接区分の統合、区分統合に伴う自由度減少はcanonical cardへ統合済み。
---
## 問題
期待度数が $(40,35,20,3,2)$ のとき、カイ二乗近似のために何を検討するか。

## 使用公式・定理
**この欄の役割：解答で使う定義・公式・定理と、その適用条件**

Pearson統計量のカイ二乗近似は各期待度数が十分増大する漸近結果。

## 答え
期待度数が小さい末尾区分を、意味を壊さない隣接区分と統合して期待度数を確保する。

## 計算例
最後の2区分を統合すれば期待度数5となり、区分数は5から4へ減るので自由度も1減る。

## 注意
観測度数ではなく期待度数を確認する。

<!-- CARD -->

---
id: test-independence-2x2-numeric
title: 2×2表の独立性カイ二乗検定を計算する
category: math-testing
subcategory: math-various-tests
topic: independence-2x2
type: calc_step
difficulty: 3
priority: S
hashtags:
  - 独立性のカイ二乗検定
  - 2×2表
  - Pearson統計量
frequency:
  past_exam: 0
  textbook: 0
  independent_problems: 0
  source_confirmations: 0
sources:
  - type: official_syllabus
    topic: 独立性のカイ二乗検定
archive_reason: duplicate
canonical_card: test-independence-chisquare
archive_note: 2×2表の期待度数作成、Pearson統計量、自由度、数値判定は独立性検定canonical cardへ統合済み。
---
## 問題
観測表が $\begin{pmatrix}30&20\\10&40\end{pmatrix}$ のとき独立性検定のPearson統計量を求めよ。

## 使用公式・定理
**この欄の役割：解答で使う定義・公式・定理と、その適用条件**

自由度は $(2-1)(2-1)=1$。

## 一手
周辺度数から期待表を作り、全セルの寄与を足す。

## 答え
行合計は50,50、列合計は40,60、総数100なので期待表は $\begin{pmatrix}20&30\\20&30\end{pmatrix}$。
$$X^2=\frac{100}{20}+\frac{100}{30}+\frac{100}{20}+\frac{100}{30}=\frac{50}{3}\approx16.67.$$

## 計算例
上側5%点3.841を超えるため独立性を棄却する。

<!-- CARD -->

---
id: test-yates-correction
title: 2×2表でYatesの連続修正を計算する
category: math-testing
subcategory: math-various-tests
topic: yates-correction
type: formula
difficulty: 3
priority: A
hashtags:
  - 独立性のカイ二乗検定
  - 連続修正
  - 2×2表
frequency:
  past_exam: 0
  textbook: 0
  independent_problems: 0
  source_confirmations: 0
sources:
  - type: official_syllabus
    topic: 適合度の検定
archive_reason: duplicate
canonical_card: test-independence-chisquare
archive_note: 2×2表のYates連続修正の意味と数値寄与は独立性検定canonical cardへ統合済み。小期待度数ではフィッシャー検定を別法として残す。
---
## 問題
2×2表のPearson統計量に対するYates修正のセル寄与を書け。

## 使用公式・定理
**この欄の役割：解答で使う定義・公式・定理と、その適用条件**

離散度数を連続なカイ二乗分布で近似するずれを0.5だけ補正する。

## 答え
$$X_Y^2=\sum_{i,j}\frac{\{\max(0,|O_{ij}-E_{ij}|-0.5)\}^2}{E_{ij}}.$$

## 計算例
$O=12,E=10$ のセル寄与は未修正 $4/10=0.4$、修正後 $(2-0.5)^2/10=0.225$。

## 注意
修正により統計量は小さくなり、一般に保守的になる。
