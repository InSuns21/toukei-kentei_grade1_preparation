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
公平なサイコロの標本空間を $\Omega$、事象全体を $\mathcal{F}$ とする。$\mathcal{F}$ は $\Omega$ 上のシグマ代数である。$A=\{1,3,5\}$ の確率を、確率空間の公理を確認して求めよ。

## 答え
$\Omega=\{1,2,3,4,5,6\}$、$\mathcal{F}=2^\Omega$、$P(A)=1/2$ である。

## 使用公式・定理
確率空間は $(\Omega,\mathcal{F},P)$ で表す。$P$ は
$$P(\Omega)=1,\qquad P(E)\ge 0$$
および互いに排反な事象列 $(E_n)$ に対する可算加法性
$$P\left(\bigcup_{n=1}^{\infty}E_n\right)=\sum_{n=1}^{\infty}P(E_n)$$
を満たす。有限一様標本空間では $P(E)=|E|/|\Omega|$。

## 計算例
$|\Omega|=6$、$|A|=3$ なので
$$P(A)=\frac{|A|}{|\Omega|}=\frac{3}{6}=\frac12.$$
また $A^c=\{2,4,6\}$ であり、$P(A)+P(A^c)=1$ となる。

## 一手
まず $\Omega$ と事象 $A$ を定め、等確率を確認してから個数の比を使う。

## 注意
有限一様でない場合は $|A|/|\Omega|$ を使わず、確率質量を足す。

<!-- CARD -->

---
id: prob-basic-conditional-independence
title: 条件付き独立
category: math-probability
subcategory: math-events
topic: conditional-independence
type: condition
difficulty: 2
priority: S
hashtags: [条件付き独立, 条件付き確率, 統計的独立]
frequency: { past_exam: 0, textbook: 0, independent_problems: 0, source_confirmations: 0 }
sources: [{ type: official_syllabus, topic: 統計的独立 }, { type: official_syllabus, topic: 条件付き確率 }]
---
## 問題
$P(C)=0.5$、$P(A\cap C)=0.2$、$P(B\cap C)=0.3$、$P(A\cap B\cap C)=0.12$ とする。$C$ の条件下で $A,B$ が独立か判定せよ。

## 答え
$C$ の条件下で $A,B$ は独立である。

## 使用公式・定理
$P(C)>0$ のとき
$$P(A\cap B\mid C)=P(A\mid C)P(B\mid C)$$
で判定する。

## 計算例
$$P(A\cap B\mid C)=\frac{0.12}{0.5}=0.24.$$
$$P(A\mid C)=\frac{0.2}{0.5}=0.4,$$
$$P(B\mid C)=\frac{0.3}{0.5}=0.6.$$
$$P(A\mid C)P(B\mid C)=0.4\cdot0.6=0.24.$$
よって条件付き独立である。

## 一手
すべてを条件 $C$ の下の確率へ直して積を比較する。

## 注意
条件付き独立は無条件の独立とは別概念である。

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
