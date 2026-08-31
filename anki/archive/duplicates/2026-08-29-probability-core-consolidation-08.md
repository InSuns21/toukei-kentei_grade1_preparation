---
id: prob-conditional-multiplication
title: 条件付き確率から共通部分の確率を求める
category: math-probability
subcategory: math-events
topic: conditional-probability
type: formula
difficulty: 1
priority: S
hashtags:
  - 条件付き確率
  - 乗法公式
  - 確率
frequency:
  past_exam: 0
  textbook: 0
  independent_problems: 0
  source_confirmations: 0
sources:
  - type: official_syllabus
    topic: 条件付き確率
archive_reason: duplicate
canonical_card: prob-conditional-definition-direct
archive_note: 条件付き確率の定義をP(A∩B)について解いただけの同一move。canonical側で割り算と掛け算の両方向を数値で扱うよう補強済み。
---
## 問題
$P(B)=0.4$、$P(A\mid B)=0.75$ のとき、$P(A\cap B)$ を求めよ。

## 答え
条件付き確率の定義を $P(A\cap B)$ について解く。

## 使用公式・定理
$P(B)>0$ のとき、乗法公式は
$$P(A\cap B)=P(A\mid B)P(B)$$
である。

## 計算例
公式へ値を代入すると
$$\begin{aligned}P(A\cap B)&=P(A\mid B)P(B)\\&=0.75\cdot0.4\\&=0.30.\end{aligned}$$

## 一手
「$B$ が起きた条件下で $A$」と「$B$」が与えられたら、両者を掛けて共通部分へ戻す。

## 注意
$P(A\mid B)$ と $P(B\mid A)$ を入れ替えない。

<!-- CARD -->

---
id: prob-basic-independent-vs-disjoint
title: 独立事象と排反事象の違い
category: math-probability
subcategory: math-events
topic: independence-disjointness
type: condition
difficulty: 2
priority: S
hashtags:
  - 統計的独立
  - 排反事象
  - 条件
frequency:
  past_exam: 0
  textbook: 0
  independent_problems: 0
  source_confirmations: 0
sources:
  - type: official_syllabus
    topic: 統計的独立
archive_reason: duplicate
canonical_card: prob-independent-events
archive_note: 補強済み独立性canonicalで、独立条件P(A∩B)=P(A)P(B)と排反条件P(A∩B)=0を同じ数値例で比較するため、説明専用カードは重複。
---
## 問題
$P(A)=0.4$、$P(B)=0.5$、$P(A\cap B)=0$ である。$A,B$ は排反か、独立かを判定せよ。

## 答え
$A,B$ は排反だが、独立ではない。

## 使用公式・定理
排反は $P(A\cap B)=0$、独立は
$$P(A\cap B)=P(A)P(B)$$
をいう。

## 計算例
$P(A\cap B)=0$ なので排反である。一方
$$P(A)P(B)=0.4\cdot0.5=0.2\ne0.$$
よって独立ではない。

## 一手
排反は「同時に起きない」、独立は「一方が他方の確率を変えない」と区別する。

## 注意
両方の確率が正の排反事象は独立ではない。

<!-- CARD -->

---
id: prob-inclusion-exclusion
title: 2事象の和事象を包除原理で求める
category: math-probability
subcategory: math-events
topic: inclusion-exclusion
type: formula
difficulty: 1
priority: A
hashtags:
  - 確率
  - 包除原理
  - 頻出
frequency:
  past_exam: 0
  textbook: 0
  independent_problems: 0
  source_confirmations: 0
sources:
  - type: official_syllabus
    topic: 事象と確率
archive_reason: duplicate
canonical_card: prob-inclusion-exclusion-three
archive_note: 3事象包除canonicalへ2事象版も吸収し、2事象と3事象を同じ原理で数値計算するため、2事象専用カードを残さない。
---
## 問題
$P(A)=0.6$, $P(B)=0.5$, $P(A\cap B)=0.2$ のとき、$P(A\cup B)$ を求めよ。
## 答え
重複する $A\cap B$ を1回引き、$P(A\cup B)=P(A)+P(B)-P(A\cap B)$ とする。
## 使用公式・定理
$$P(A\cup B)=P(A)+P(B)-P(A\cap B).$$
## 計算例
公式へ代入すると
$$\begin{aligned}P(A\cup B)&=P(A)+P(B)-P(A\cap B)\\&=0.6+0.5-0.2\\&=0.9.\end{aligned}$$
## 一手
「少なくとも一方」を見たら和事象に直し、重複を確認する。
## 注意
$0.6+0.5=1.1$ のままにしない。

<!-- CARD -->

---
id: prob-basic-combination-probability
title: 組合せ計数と確率
category: math-probability
subcategory: math-events
topic: combinations-probability
type: calc_step
difficulty: 2
priority: A
hashtags:
  - 組合せ
  - 非復元抽出
  - 確率の計算
frequency:
  past_exam: 0
  textbook: 0
  independent_problems: 0
  source_confirmations: 0
sources:
  - type: official_syllabus
    topic: 確率の計算
archive_reason: duplicate
canonical_card: prob-basic-sample-space
archive_note: 等確率有限標本空間のcanonicalへ、順序ありの硬貨列と順序なしの組合せ抽出を両方追加したため、組合せだけの単独カードは重複。
---
## 問題
赤玉5個、青玉3個から、各2個の組合せが等確率となるよう無作為に、同時に2個を非復元抽出する。赤1個、青1個となる確率を求めよ。

## 答え
確率は $15/28$ である。

## 使用公式・定理
等確率な組合せから選ぶとき
$$P(E)=\frac{\text{条件を満たす組合せ数}}{\text{全組合せ数}}.$$

## 計算例
$$P(E)=\frac{\binom51\binom31}{\binom82}=\frac{5\cdot3}{28}=\frac{15}{28}.$$

## 一手
種類ごとの組合せを分子に、全体の組合せを分母に置く。

## 注意
非復元抽出の分母を $8^2$ としない。ここでは順序を無視した組合せを使う。
