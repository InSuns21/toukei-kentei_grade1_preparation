---
id: prob-total-variance
title: 全分散の法則で分散を2成分に分解する
category: math-probability
subcategory: math-distribution-characteristics
topic: total-variance
type: formula
difficulty: 3
priority: S
hashtags:
  - 全分散の法則
  - 分散の分解
  - 条件付き分散
frequency:
  past_exam: 0
  textbook: 0
  independent_problems: 0
  source_confirmations: 0
sources:
  - type: official_syllabus
    topic: 分散
archive_reason: duplicate
canonical_card: prob-conditional-covariance
archive_note: 全共分散canonicalへY=Xを代入して全分散の法則を導出し、E[Var(X|Z)]=4, Var(E[X|Z])=3からVar(X)=7まで吸収済み。
---
## 問題
$Y$ に応じて $E[X\mid Y]$ と $\operatorname{Var}(X\mid Y)$ が判明しているとき、全体の $\operatorname{Var}(X)$ を2項に分解せよ。

## 答え
$$\operatorname{Var}(X)=E[\operatorname{Var}(X\mid Y)]+\operatorname{Var}(E[X\mid Y]).$$
第1項は「条件付き分散の平均」、第2項は「条件平均の分散」と呼ばれる。

## 使用公式・定理
$E[X^2]<\infty$ のとき、全分散の法則
$$\operatorname{Var}(X)=E[\operatorname{Var}(X\mid Y)]+\operatorname{Var}(E[X\mid Y]).$$
実際、$m(Y)=E[X\mid Y]$ と置くと
$$X-E[X]=\{X-m(Y)\}+\{m(Y)-E[X]\}.$$
両辺を2乗して期待値を取る。交差項は
$$E[(X-m(Y))(m(Y)-E[X])]
=E[E[X-m(Y)\mid Y](m(Y)-E[X])]=0$$
なので、残る2項がそれぞれ $E[\operatorname{Var}(X\mid Y)]$ と $\operatorname{Var}(E[X\mid Y])$ になる。

## 計算例
$E[\operatorname{Var}(X\mid Y)]=4$、$\operatorname{Var}(E[X\mid Y])=3$ なら
$$\operatorname{Var}(X)=4+3=7.$$

## 一手
「条件の散布を平均した項」と「条件平均のばらつきの項」の2つの項に分ける。分散の有限性 $E[X^2]<\infty$ が前提。

## 注意
全期待値の法則と対になる。$E[X\mid Y]$ の分布を先に整理してから計算すると符号を間違えにくい。

<!-- CARD -->

---
id: prob-markov-inequality
title: Markovの不等式で非負変数の超過確率を抑える
category: math-probability
subcategory: math-distribution-characteristics
topic: markov-inequality
type: theorem
difficulty: 2
priority: A
hashtags:
  - Markovの不等式
  - 超過確率
  - 期待値
frequency:
  past_exam: 0
  textbook: 0
  independent_problems: 0
  source_confirmations: 0
sources:
  - type: official_syllabus
    topic: 期待値
archive_reason: duplicate
canonical_card: prob-chebyshev-inequality
archive_note: チェビシェフcanonicalへMarkovの一般定理、指示関数による導出、E[Y]=2でP(Y>=10)<=0.2の例を吸収し、二乗偏差へ適用してチェビシェフを導出済み。
---
## 問題
$X\ge0$（非負）で $E[X]=2$ のとき、$P(X\ge10)$ の上界を求めよ。

## 答え
$$P(X\ge a)\le\frac{E[X]}{a},\qquad a>0.$$
実際の確率はこの上界以下になる。

## 使用公式・定理
非負変数 $X\ge0$ に対するMarkovの不等式
$$aP(X\ge a)\le E[X],\qquad a>0.$$
指示関数を $\mathbf 1_{\{X\ge a\}}$ と書けば、各標本点で
$$X\ge a\mathbf 1_{\{X\ge a\}}$$
だから、期待値を取って
$$E[X]\ge aE[\mathbf 1_{\{X\ge a\}}]=aP(X\ge a)$$
を得る。

## 計算例
$$P(X\ge10)\le\frac2{10}=0.2.$$

## 一手
$X\ge0$ の非負性と $a>0$ を確認し、$aP(X\ge a)$ を $E[X]$ で上から押さえる。

## 注意
負の値を取る変数には成立しない。$a$ は正の閾値に限定する。
