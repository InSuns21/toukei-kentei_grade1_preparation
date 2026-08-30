---
id: design-two-level-coding
title: 2水準要因計画を±1符号化する
category: applied-common
subcategory: applied-design
topic: two-level-coding
type: recognition
difficulty: 2
priority: B
hashtags:
  - 2水準要因計画
  - 符号化
  - 直交性
frequency:
  past_exam: 0
  textbook: 0
  independent_problems: 0
  source_confirmations: 0
sources:
  - type: official_syllabus
    topic: 2水準要因計画
archive_reason: duplicate
canonical_card: design-two-level-effect-contrast
archive_note: ±1符号化、交互作用列の積、回帰係数と効果の関係はcanonical cardへ統合済み。
---
## 問題
2水準要因を−1・+1で符号化する利点を述べよ。

## 使用公式・定理
**この欄の役割：解答で使う定義・公式・定理と、その適用条件**

$AB$ 列は各実験点で $x_Ax_B$。

## 答え
主効果列を各因子の符号、交互作用列を対応列の積で作れる。バランスした完全計画では各列の和が0、異なる効果列の内積が0となり、効果推定が直交する。

## 計算例
A=−1、B=+1ならAB=−1。

## 注意
回帰係数は通常、主効果の半分になる符号化規約。

<!-- CARD -->

---
id: design-two-cubed-effects-numeric
title: 2³計画の効果を数値計算する
category: applied-common
subcategory: applied-design
topic: two-cubed-effects
type: calc_step
difficulty: 4
priority: B
hashtags:
  - 2水準要因計画
  - 主効果
  - 交互作用
frequency:
  past_exam: 0
  textbook: 0
  independent_problems: 0
  source_confirmations: 0
sources:
  - type: official_syllabus
    topic: 2水準要因計画
archive_reason: duplicate
canonical_card: design-two-level-effect-contrast
archive_note: 2^3計画のA効果・AB効果の数値計算はcanonical cardへ統合済み。
---
## 問題
$2^3$ 計画の平均が $(1,a,b,ab,c,ac,bc,abc)=(10,14,12,18,8,16,10,22)$。A効果とAB効果を求めよ。

## 使用公式・定理
**この欄の役割：解答で使う定義・公式・定理と、その適用条件**

効果＝対応する±1列との符号付き和／$2^{3-1}$。

## 答え
Aコントラストは
$$C_A=(14+18+16+22)-(10+12+8+10)=30,$$
$$\widehat A=30/4=7.5.$$
ABコントラストは
$$C_{AB}=(10+18+8+22)-(14+12+16+10)=6,$$
$$\widehat{AB}=6/4=1.5.$$

## 計算例
AB列が+1の点は1,ab,c,abc。

## 注意
処置記号aはAだけ高水準、1は全因子低水準。

<!-- CARD -->

---
id: design-factorial-effect-ss
title: 2水準要因効果から平方和を計算する
category: applied-common
subcategory: applied-design
topic: factorial-effect-sum-of-squares
type: calc_step
difficulty: 4
priority: B
hashtags:
  - 2水準要因計画
  - コントラスト
  - 平方和
frequency:
  past_exam: 0
  textbook: 0
  independent_problems: 0
  source_confirmations: 0
sources:
  - type: official_syllabus
    topic: 2水準要因計画
archive_reason: duplicate
canonical_card: design-two-level-effect-contrast
archive_note: 等反復2水準計画で同じコントラストから効果平方和を計算する手順はcanonical cardへ統合済み。
---
## 問題
$2^2$ 要因計画で各処置組合せをr回反復し、セル平均を $\bar y_{(1)},\bar y_a,\bar y_b,\bar y_{ab}$ とする。A効果の平方和を求める公式を書き、$r=2$、セル平均が順に10, 14, 12, 18のとき計算せよ。

## 使用公式・定理
**この欄の役割：解答で使う定義・公式・定理と、その適用条件**

$2^k$ 計画でセル平均から作る効果コントラストCの平方和は $SS=rC^2/2^k$。

## 答え
Aのコントラストは
$$C_A=-\bar y_{(1)}+\bar y_a-\bar y_b+\bar y_{ab}
=-10+14-12+18=10.$$
したがって
$$SS_A=\frac{rC_A^2}{2^2}
=\frac{2\cdot10^2}{4}=50.$$

## 計算例
推定A効果は $C_A/2^{2-1}=5$ であり、$SS_A=r2^{2-2}(5)^2=50$ とも確認できる。

## 注意
生データの合計をコントラストに使う式とは分母が異なる。
