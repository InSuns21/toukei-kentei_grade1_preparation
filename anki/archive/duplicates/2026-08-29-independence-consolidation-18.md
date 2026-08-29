---
id: prob-pairwise-not-mutual
title: ペアごとの独立と相互独立を区別する
category: math-probability
subcategory: math-events
topic: mutual-independence
type: pitfall
difficulty: 2
priority: A
hashtags:
  - 統計的独立
  - 相互独立
  - 典型的な罠
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
archive_note: 強化済み独立性canonicalへ3事象の相互独立ではペアごとの独立に加えて3重共通部分の積条件が必要であることと、ペアごとには独立だが相互独立でない具体例を吸収済み。
---
## 問題
$(U,V)$ は $(0,0),(0,1),(1,0),(1,1)$ を各確率 $1/4$ で取る。$A=\{U=0\}$、$B=\{V=0\}$、$C=\{U=V\}$ とする。3事象は相互独立か。

## 答え
どの2事象も独立だが、3事象は相互独立ではない。

## 使用公式・定理
$A,B,C$ の相互独立には、ペアごとの積の条件に加えて
$$P(A\cap B\cap C)=P(A)P(B)P(C)$$
が必要である。

## 計算例
$P(A)=P(B)=P(C)=1/2$ であり、各ペアの共通部分は1結果だけなので確率 $1/4=(1/2)^2$ である。しかし
$$A\cap B\cap C=\{(0,0)\}$$
だから
$$P(A\cap B\cap C)=\frac14\ne\frac18=P(A)P(B)P(C).$$
よってペアごとには独立だが、相互独立ではない。

## 一手
3事象以上では、ペアだけでなく全ての組合せの積条件を確認する。

## 注意
「任意の2事象が独立」から「全事象が相互独立」と結論しない。

<!-- CARD -->

---
id: prob-independent-complements
title: 独立な事象の補事象も独立と示す
category: math-probability
subcategory: math-events
topic: independence-complements
type: proof_step
difficulty: 2
priority: A
hashtags:
  - 統計的独立
  - 補事象
  - 証明の一手
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
archive_note: 独立性canonicalへP(A^c∩B)=P(B)-P(A∩B)=P(A^c)P(B)の証明と補事象への独立性の保存を吸収済み。
---
## 問題
$A,B$ が独立で、$P(A)=0.4$、$P(B)=0.5$ である。$A^c$ と $B$ が独立であることを式で示し、$P(A^c\cap B)$ を求めよ。

## 答え
$B$ を $(A\cap B)$ と $(A^c\cap B)$ に分割する。

## 使用公式・定理
$A,B$ の独立性から $P(A\cap B)=P(A)P(B)$ である。また
$$P(A^c\cap B)=P(B)-P(A\cap B).$$

## 計算例
$$\begin{aligned}P(A^c\cap B)&=P(B)-P(A)P(B)\\&=P(B)\{1-P(A)\}\\&=P(B)P(A^c).\end{aligned}$$
数値を入れると
$$P(A^c\cap B)=0.5(1-0.4)=0.3=0.6\cdot0.5.$$
よって $A^c$ と $B$ も独立である。

## 一手
補事象との共通部分は、元の事象から共通部分を引いて作る。

## 注意
独立性を使った箇所は $P(A\cap B)=P(A)P(B)$ の1か所である。

<!-- CARD -->

---
id: prob-conditioning-breaks-independence
title: 条件付けで独立性が失われる例を判定する
category: math-probability
subcategory: math-events
topic: conditional-independence-pitfall
type: pitfall
difficulty: 2
priority: S
hashtags:
  - 条件付き確率
  - 統計的独立
  - 典型的な罠
frequency:
  past_exam: 0
  textbook: 0
  independent_problems: 0
  source_confirmations: 0
sources:
  - type: official_syllabus
    topic: 条件付き確率と統計的独立
archive_reason: duplicate
canonical_card: prob-independent-events
archive_note: 独立性canonicalへ無条件で独立でも条件付け後には独立性が失われ得ること、2回の硬貨投げを「表がちょうど1回」で条件付ける反例を吸収済み。
---
## 問題
硬貨を2回投げ、$A=$「1回目が表」、$B=$「2回目が表」、$C=$「表がちょうど1回」とする。$A,B$ は独立だが、$C$ の下でも条件付き独立か。

## 答え
$C$ の下では $A$ と $B$ は同時に起こらないので、条件付き独立ではない。

## 使用公式・定理
$P(C)>0$ の下での条件付き独立には
$$P(A\cap B\mid C)=P(A\mid C)P(B\mid C)$$
が必要である。

## 計算例
$C$ の下では $(\text{表},\text{裏})$ と $(\text{裏},\text{表})$ が各条件付き確率 $1/2$ なので
$$P(A\mid C)=\frac12,\qquad P(B\mid C)=\frac12.$$
しかし $A\cap B\cap C=\varnothing$ だから
$$P(A\cap B\mid C)=0\ne\frac14=P(A\mid C)P(B\mid C).$$

## 一手
無条件の独立性と、ある情報を与えた後の条件付き独立性は別々に検査する。

## 注意
条件付けは独立性を常に保存するわけではない。
