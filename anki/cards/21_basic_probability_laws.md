---
id: prob-basic-sample-space
title: 標本空間・事象・確率測度の基本
category: math-probability
subcategory: math-events
topic: probability-space
type: recognition
difficulty: 1
priority: A
hashtags: [標本空間, 事象, 確率測度, 確率]
frequency: { past_exam: 0, textbook: 0, independent_problems: 0, source_confirmations: 0 }
sources: [{ type: official_syllabus, topic: 確率の計算 }]
---
## 問題
有限一様標本空間について次を解け。

1. 公平なサイコロ1回の標本空間を $\Omega$、事象全体を $\mathcal F$ とする。$A=\{1,3,5\}$ の確率を、確率空間の公理を確認して求めよ。
2. 公平な硬貨を3回投げるとき、表がちょうど2回出る確率を場合の数から求めよ。

## 答え
1.
$$
\Omega=\{1,2,3,4,5,6\},\qquad \mathcal F=2^\Omega.
$$
公平なので6個の基本結果は等確率であり
$$
P(A)=\frac{|A|}{|\Omega|}=\frac36=\boxed{\frac12}.
$$

2. 3回の硬貨投げでは順序付きの結果が $2^3=8$ 通りあり、表が2回の列は
$$
\binom32=3
$$
通りである。したがって
$$
P(\text{表が2回})=\frac{\binom32}{2^3}=\boxed{\frac38}.
$$

## 使用公式・定理
確率空間は $(\Omega,\mathcal F,P)$ で表す。確率測度 $P$ は
$$
P(\Omega)=1,\qquad P(E)\ge0
$$
および互いに排反な事象列 $(E_n)$ に対する可算加法性
$$
P\left(\bigcup_{n=1}^{\infty}E_n\right)
=\sum_{n=1}^{\infty}P(E_n)
$$
を満たす。

有限標本空間で全ての基本結果が等確率なら
$$
P(E)=\frac{|E|}{|\Omega|}.
$$
場合の数で計算するときは、分子と分母を同じ数え方で数える。順序を区別するなら両方で区別し、順序を無視するなら両方で組合せを使う。

## 計算例
サイコロでは $A^c=\{2,4,6\}$ なので
$$
P(A)+P(A^c)=\frac12+\frac12=1
$$
となる。

組合せを使う別例として、赤5個・青3個から同時に2個を非復元抽出し、赤1個・青1個となる確率は
$$
\frac{\binom51\binom31}{\binom82}
=\frac{15}{28}.
$$
分子も分母も「順序を無視した2個の組合せ」で数えている。

## 一手／方針
まず「何を1つの基本結果と数えるか」を決め、それらが等確率かを確認する。等確率なら有利な結果数を全結果数で割る。

場合の数が必要なら、分子と分母で順序あり・なし、復元・非復元の条件をそろえる。

## 注意
基本結果が等確率でない場合は $|E|/|\Omega|$ を使わず、各基本結果の確率を足す。

非復元で同時に2個選ぶ問題の分母を、復元・順序ありの $8^2$ のように数えない。

<!-- CARD -->

---
id: prob-basic-conditional-independence
title: 条件付き確率を定義から計算し条件付き独立まで判定する
category: math-probability
subcategory: math-events
topic: conditional-probability-independence-canonical
type: strategy
difficulty: 2
priority: S
hashtags:
  - 条件付き確率
  - 条件付き独立
  - 統計的独立
  - 共通部分
frequency:
  past_exam: 0
  textbook: 0
  independent_problems: 0
  source_confirmations: 0
sources:
  - type: official_syllabus
    topic: 統計的独立
  - type: official_syllabus
    topic: 条件付き確率
---
## 問題
条件付き確率と条件付き独立について次を解け。

1. $P(A\cap B)=0.18$、$P(B)=0.30$ とする。$P(A\mid B)$ を求めよ。また $P(B)=0.4$、$P(A\mid B)=0.75$ なら $P(A\cap B)$ を求めよ。
2. $P(C)=0.5$、$P(A\cap C)=0.2$、$P(B\cap C)=0.3$、$P(A\cap B\cap C)=0.12$ とする。$C$ の条件下で $A,B$ が独立か判定せよ。

## 答え
1. 定義より
$$
P(A\mid B)
=\frac{0.18}{0.30}
=\boxed{0.60}.
$$
逆向きには
$$
P(A\cap B)
=P(A\mid B)P(B)
=0.75\cdot0.4
=\boxed{0.30}.
$$

2. まず
$$
P(A\mid C)=\frac{0.2}{0.5}=0.4,
$$
$$
P(B\mid C)=\frac{0.3}{0.5}=0.6,
$$
$$
P(A\cap B\mid C)=\frac{0.12}{0.5}=0.24.
$$
一方
$$
P(A\mid C)P(B\mid C)=0.4\cdot0.6=0.24.
$$
したがって
$$
\boxed{A,B\text{ は }C\text{ の条件下で独立}}
$$
である。

## 使用公式・定理
$P(B)>0$ のとき、条件付き確率の定義は
$$
P(A\mid B)=\frac{P(A\cap B)}{P(B)}.
$$
同じ式を共通部分について解けば乗法公式
$$
P(A\cap B)=P(A\mid B)P(B)
$$
を得る。これは別の公式ではなく、条件付き確率の定義を書き換えただけである。

$P(C)>0$ のとき、$C$ の条件下で $A,B$ が独立であるための条件は
$$
P(A\cap B\mid C)=P(A\mid C)P(B\mid C).
$$
条件付き確率は全て
$$
P(E\mid C)=\frac{P(E\cap C)}{P(C)}
$$
の形へ戻して計算できる。

## 計算例
$P(B)=0.25$、$P(A\cap B)=0.10$ なら
$$
P(A\mid B)=\frac{0.10}{0.25}=0.40.
$$
逆に $P(A\mid B)=0.40$ と $P(B)=0.25$ が与えられれば
$$
P(A\cap B)=0.40\cdot0.25=0.10
$$
と同じ関係を往復できる。

条件付き独立の判定では、例えば
$$
P(A\mid C)=0.4,\qquad P(B\mid C)=0.6
$$
でも
$$
P(A\cap B\mid C)=0.20
$$
なら $0.20\ne0.24$ なので条件付き独立ではない。

## 一手／方針
**条件記号の右側を新しい標本空間とみなす。** まず右側の事象の確率で割って条件付き確率へ直し、共通部分が欲しいときは逆に掛け算へ戻す。

条件付き独立では、元の無条件確率をそのまま比較せず、$P(A\mid C)$、$P(B\mid C)$、$P(A\cap B\mid C)$ の3つを同じ条件 $C$ の下へそろえてから積条件を確認する。

## 注意
$P(A\mid B)$ と $P(B\mid A)$ は一般に異なる。条件記号の右側を取り違えない。ベイズの定理は、この向きの違う条件付き確率を周辺確率と尤度で結び直す。

条件付き独立と無条件の独立は別概念である。無条件で独立でも条件付けにより依存が生じることがあり、逆に無条件では依存していても条件付きで独立になることがある。条件付け後は必ず条件付き積条件を改めて確認する。

<!-- CARD -->

---
id: prob-basic-event-limsup-liminf
title: 事象列のlimsup・liminf
category: math-probability
subcategory: math-events
topic: event-sequences-limsup-liminf
type: recognition
difficulty: 2
priority: A
hashtags: [事象列, limsup, liminf, 無限回]
frequency: { past_exam: 0, textbook: 0, independent_problems: 0, source_confirmations: 0 }
sources: [{ type: official_syllabus, topic: 確率の計算 }]
---
## 問題
事象列 $(A_n)$ の $\limsup A_n$ と $\liminf A_n$ を定義せよ。また奇数 $n$ では $A_n=A$、偶数 $n$ では $A_n=A^c$ としたとき両者を求めよ。

## 答え
$\limsup A_n=\Omega$、$\liminf A_n=\varnothing$ である。

## 使用公式・定理
$$\limsup_{n\to\infty}A_n=\bigcap_{n=1}^{\infty}\bigcup_{k=n}^{\infty}A_k$$
は「無限回起こる」事象、
$$\liminf_{n\to\infty}A_n=\bigcup_{n=1}^{\infty}\bigcap_{k=n}^{\infty}A_k$$
は「十分先では常に起こる」事象である。

## 計算例
任意の $n$ 以降に奇数と偶数があるので
$$\bigcup_{k=n}^{\infty}A_k=\Omega,$$
$$\bigcap_{k=n}^{\infty}A_k=\varnothing.$$
よって $\limsup A_n=\Omega$、$\liminf A_n=\varnothing$。

## 一手
limsup は「何度も起きる」、liminf は「最後にはずっと起きる」と読む。

## 注意
常に $\liminf A_n\subseteq\limsup A_n$ だが、両者は一般に異なる。

<!-- CARD -->

---
id: prob-basic-boole-inequality
title: Booleの不等式
category: math-probability
subcategory: math-events
topic: boole-inequality
type: formula
difficulty: 2
priority: A
hashtags: [Booleの不等式, 和集合, 上界]
frequency: { past_exam: 0, textbook: 0, independent_problems: 0, source_confirmations: 0 }
sources: [{ type: official_syllabus, topic: 確率の計算 }]
---
## 問題
事象 $A_1,A_2,A_3$ がそれぞれ確率 $0.2$ である。Booleの不等式から $P(A_1\cup A_2\cup A_3)$ の上界を求めよ。

## 答え
上界は $0.6$ である。

## 使用公式・定理
有限個および可算個の事象に対して
$$P\left(\bigcup_{i=1}^{n}A_i\right)\le\sum_{i=1}^{n}P(A_i)$$
$$P\left(\bigcup_{i=1}^{\infty}A_i\right)\le\sum_{i=1}^{\infty}P(A_i)$$
が成り立つ。

## 計算例
$$P(A_1\cup A_2\cup A_3)\le0.2+0.2+0.2=0.6.$$

## 一手
和集合を厳密に求めにくいとき、各事象の確率を足して上から押さえる。

## 注意
一般に等号ではない。上界が1を超える場合は、確率の上界として1も使える。

<!-- CARD -->

---
id: prob-basic-borel-cantelli
title: Borel–Cantelliの補題（基本形）
category: math-probability
subcategory: math-events
topic: borel-cantelli
type: theorem
difficulty: 2
priority: B
hashtags: [Borel–Cantelli, limsup, 事象列]
frequency: { past_exam: 0, textbook: 0, independent_problems: 0, source_confirmations: 0 }
sources: [{ type: official_syllabus, topic: 確率の計算 }]
---
## 問題
事象列 $(A_n)$ が $P(A_n)=1/n^2$ を満たすとする。$A_n$ が無限回起こる確率について結論を述べよ。

## 答え
無限回起こる確率は $0$ である。

## 使用公式・定理
Borel–Cantelliの補題の基本形は
$$\sum_{n=1}^{\infty}P(A_n)<\infty\quad\Longrightarrow\quad P(\limsup_{n\to\infty}A_n)=0$$
である。この向きには独立性を仮定しない。

## 計算例
$$\sum_{n=1}^{\infty}P(A_n)=\sum_{n=1}^{\infty}\frac{1}{n^2}=\frac{\pi^2}{6}<\infty.$$
したがって
$$P(\limsup_{n\to\infty}A_n)=0.$$

## 一手
確率の無限和が有限かを調べ、有限なら無限回発生の確率0を結論する。

## 注意
逆向き（無限和が発散すれば無限回起こる確率が1）は、通常は独立性など追加条件が必要である。
