---
id: prob-basic-conditional-probability
title: 条件付き確率の定義と計算
category: math-probability
subcategory: math-events
topic: conditional-probability-definition
type: formula
difficulty: 1
priority: S
hashtags:
  - 条件付き確率
  - 定義
  - 確率の計算
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
archive_note: どちらも P(A|B)=P(A∩B)/P(B) へ数値を代入する同一操作。後者は過去問根拠があり、分母は条件記号右側という一手も明示する。
---
## 問題
$P(A\cap B)=0.12$、$P(B)=0.30$ のとき、$P(A\mid B)$ を求めよ。

## 答え
$P(A\mid B)=0.4$ である。

## 使用公式・定理
$P(B)>0$ のとき
$$P(A\mid B)=\frac{P(A\cap B)}{P(B)}$$
で定義される。

## 計算例
$$P(A\mid B)=\frac{0.12}{0.30}=0.4.$$

## 一手
$A\mid B$ は、$B$ の世界で $A$ が起きる割合と読む。

## 注意
$P(B)=0$ のときこの分数は使えない。$P(A\mid B)$ と $P(B\mid A)$ を交換しない。

<!-- CARD -->

---
id: prob-basic-total-probability
title: 全確率の公式
category: math-probability
subcategory: math-events
topic: total-probability
type: calc_step
difficulty: 1
priority: S
hashtags:
  - 全確率
  - 場合分け
  - 条件付き確率
frequency:
  past_exam: 0
  textbook: 0
  independent_problems: 0
  source_confirmations: 0
sources:
  - type: official_syllabus
    topic: 確率の計算
archive_reason: duplicate
canonical_card: prob-total-probability
archive_note: 分割ごとに P(D|A_j)P(A_j) を足す全確率の同一計算。既存解法カードへ統合する。
---
## 問題
事象 $A,B$ は標本空間を分割し、$P(A)=0.7$、$P(B)=0.3$、$P(D\mid A)=0.02$、$P(D\mid B)=0.08$ とする。$P(D)$ を求めよ。

## 答え
$P(D)=0.038$ である。

## 使用公式・定理
分割 $A_1,\ldots,A_k$ に対して
$$P(D)=\sum_{j=1}^kP(D\mid A_j)P(A_j).$$

## 計算例
$$P(D)=0.02\cdot0.7+0.08\cdot0.3=0.014+0.024=0.038.$$

## 一手
各場合の条件付き確率に、その場合の確率を掛けて足す。

## 注意
条件付き確率だけを足さず、各場合の重みを掛ける。

<!-- CARD -->

---
id: prob-basic-bayes
title: ベイズの定理
category: math-probability
subcategory: math-events
topic: bayes-theorem
type: calc_step
difficulty: 2
priority: S
hashtags:
  - ベイズの定理
  - 条件付き確率
  - ベイズ
frequency:
  past_exam: 0
  textbook: 0
  independent_problems: 0
  source_confirmations: 0
sources:
  - type: official_syllabus
    topic: ベイズの定理
archive_reason: duplicate
canonical_card: bayes-density-formula
archive_note: 事後確率を全確率で割る同一move。canonical側は過去問根拠があり、与えられた条件付き確率と求める向きが逆という理由まで扱う。
---
## 問題
壺 $U_1,U_2$ をそれぞれ確率 $0.4,0.6$ で選ぶ。赤玉が出る確率は $U_1$ で $0.7$、$U_2$ で $0.2$ である。赤玉が出たとき、$U_1$ を選んだ確率を求めよ。

## 答え
$P(U_1\mid R)=0.7$ である。

## 使用公式・定理
$$P(U_1\mid R)=\frac{P(R\mid U_1)P(U_1)}{P(R\mid U_1)P(U_1)+P(R\mid U_2)P(U_2)}.$$

## 計算例
$$P(R)=0.7\cdot0.4+0.2\cdot0.6=0.28+0.12=0.4.$$
$$P(U_1\mid R)=\frac{0.7\cdot0.4}{0.4}=0.7.$$

## 一手
分子を「原因 $U_1$ の確率×その原因で赤が出る確率」とし、全原因から赤が出る確率で割る。

## 注意
条件付き確率 $P(R\mid U_1)$ と逆向きの事後確率 $P(U_1\mid R)$ を取り違えない。

<!-- CARD -->

---
id: prob-basic-inclusion-exclusion
title: 包除原理による確率計算
category: math-probability
subcategory: math-events
topic: inclusion-exclusion
type: formula
difficulty: 1
priority: A
hashtags:
  - 包除原理
  - 和集合
  - 確率の計算
frequency:
  past_exam: 0
  textbook: 0
  independent_problems: 0
  source_confirmations: 0
sources:
  - type: official_syllabus
    topic: 包除原理
archive_reason: duplicate
canonical_card: prob-inclusion-exclusion-three
archive_note: 2事象の和集合で共通部分を1回引く完全重複。3事象版は別カードとして残す。
---
## 問題
$P(A)=0.55$、$P(B)=0.40$、$P(A\cap B)=0.18$ のとき、$P(A\cup B)$ を求めよ。

## 答え
$P(A\cup B)=0.77$ である。

## 使用公式・定理
$$P(A\cup B)=P(A)+P(B)-P(A\cap B).$$

## 計算例
$$P(A\cup B)=0.55+0.40-0.18=0.77.$$
共通部分は二重に数えられるため1回引く。

## 一手
「少なくとも一方」を求めたら、和集合を包除原理で整理する。

## 注意
共通部分が未知なら、$P(A)+P(B)$ だけでは和集合を確定できない。

<!-- CARD -->

---
id: prob-basic-chain-rule
title: 乗法定理と確率の連鎖律
category: math-probability
subcategory: math-events
topic: multiplication-chain-rule
type: calc_step
difficulty: 2
priority: A
hashtags:
  - 乗法定理
  - 連鎖律
  - 条件付き確率
frequency:
  past_exam: 0
  textbook: 0
  independent_problems: 0
  source_confirmations: 0
sources:
  - type: official_syllabus
    topic: 条件付き確率
archive_reason: duplicate
canonical_card: prob-chain-rule-three
archive_note: 3事象の共通部分を P(A)P(B|A)P(C|A∩B) に分解する同一操作。より一般的な既存chain-ruleカードへ統合する。
---
## 問題
$P(A)=0.5$、$P(B\mid A)=0.6$、$P(C\mid A\cap B)=0.25$ のとき、$P(A\cap B\cap C)$ を求めよ。

## 答え
$P(A\cap B\cap C)=0.075$ である。

## 使用公式・定理
$$P(A\cap B)=P(B\mid A)P(A)$$
$$P(A\cap B\cap C)=P(A)P(B\mid A)P(C\mid A\cap B)$$

## 計算例
$$P(A\cap B)=0.5\cdot0.6=0.30.$$
$$P(A\cap B\cap C)=0.30\cdot0.25=0.075.$$

## 一手
同時発生を、最初の確率と後続の条件付き確率の積へ分解する。

## 注意
条件付き確率の分母が正であることを確認する。
