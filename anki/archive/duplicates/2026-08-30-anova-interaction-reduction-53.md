---
id: anova-interaction-contrast-test
title: 2×2交互作用対比をt検定する
category: math-data-analysis
subcategory: math-anova
topic: interaction-test
type: calc_step
difficulty: 4
priority: S
hashtags:
  - 交互作用
  - 対比
  - t検定
frequency:
  past_exam: 0
  textbook: 0
  independent_problems: 0
  source_confirmations: 0
sources:
  - type: official_syllabus
    topic: 交互作用
archive_reason: duplicate
canonical_card: anova-interaction-definition
archive_note: 2×2交互作用の差の差、標準誤差、t/F検定を一続きに扱う正本へ統合済み。
---
## 問題
独立な正規誤差が共通分散を持つ2×2二元配置で、各セル5反復、セル平均 $\begin{pmatrix}10&12\\14&20\end{pmatrix}$、誤差平均平方 $MS_E=5$ を得た。交互作用なしを両側5%で検定せよ。誤差自由度16のt分布の両側臨界値を2.120とする。

## 記号・用語
- SE：標準誤差（standard error）

## 使用公式・定理
**この欄の役割：解答で使う定義・公式・定理と、その適用条件**

自由度1の効果では、同じ仮説に対する $F=t^2$。

## 答え
差の差は
$$\widehat\Delta_{AB}=10-12-14+20=4.$$
4セル平均は独立で各分散 $\sigma^2/5$ だから
$$\operatorname{SE}(\widehat\Delta_{AB})=\sqrt{5(1/5+1/5+1/5+1/5)}=2.$$
したがって $t=4/2=2$、また $F=t^2=4$。誤差自由度は $2\cdot2(5-1)=16$。

## 計算例
差の差は
$$\widehat\Delta_{AB}=10-12-14+20=4.$$
各セル平均の推定分散は $MS_E/5=1$ なので
$$\operatorname{SE}(\widehat\Delta_{AB})
=\sqrt{1+1+1+1}=2.$$
したがって
$$t=\frac42=2,
\qquad F=t^2=4.$$
$|t|=2<2.120$ なので、5%水準では交互作用なしを棄却しない。

## 注意
結論まで出すには指定された有意水準と臨界値を使う。

<!-- CARD -->

---
id: anova-interaction-interpretation
title: 有意な交互作用があるとき単純主効果を見る
category: math-data-analysis
subcategory: math-anova
topic: interaction-interpretation
type: strategy
difficulty: 3
priority: A
hashtags:
  - 交互作用
  - 単純主効果
  - 主効果
frequency:
  past_exam: 0
  textbook: 0
  independent_problems: 0
  source_confirmations: 0
sources:
  - type: official_syllabus
    topic: 交互作用
archive_reason: duplicate
canonical_card: anova-interaction-definition
archive_note: 交互作用が有意な場合に単純主効果を確認する解釈まで、差の差の定義・検定を含む正本へ統合済み。
---
## 問題
A×B交互作用が有意だった。次に何を比較すべきか。

## 使用公式・定理
**この欄の役割：解答で使う定義・公式・定理と、その適用条件**

交互作用があると、全水準で平均した主効果は局所的な効果を隠すことがある。

## 答え
Bの各水準を固定したAの単純主効果、またはAの各水準を固定したBの単純主効果を調べる。例えば
$$H_0:\mu_{1j}=\cdots=\mu_{aj}$$
を各 $j$ で検定する。

## 計算例
B=1ではA差0、B=2ではA差10なら、平均主効果5だけでは構造を表せない。

## 注意
複数の単純主効果検定には多重性調整を考える。
