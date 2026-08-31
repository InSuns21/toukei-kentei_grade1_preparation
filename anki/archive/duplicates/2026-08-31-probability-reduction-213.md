---
id: prob-counting-sample-space
title: 場合の数から有限標本空間の確率を求める
category: math-probability
subcategory: math-events
topic: counting-probability
type: calc_step
difficulty: 2
priority: S
hashtags:
  - 確率の計算
  - 場合の数
  - 標本空間
frequency:
  past_exam: 1
  textbook: 0
  independent_problems: 0
  source_confirmations: 1
sources:
  - type: official_syllabus
    topic: 確率の計算
  - type: past_exam
    id: MATH-2022-Q1
    topic: 確率空間・独立性
archive_reason: duplicate
canonical_card: prob-basic-sample-space
coverage_card: prob-basic-sample-space
archive_note: 有限一様標本空間の正本へ、硬貨3回で表ちょうど2回を binom(3,2)/2^3=3/8
  と数える同一問題を統合済み。さらに赤5・青3から非復元で2個選ぶ組合せ例も保持し、分子分母で順序・復元条件をそろえる注意まで吸収した。
---
## 問題
公平な硬貨を3回投げる。表がちょうど2回出る確率を求めよ。

## 答え
公平な硬貨を3回投げて表がちょうど2回出る確率は
$$
\frac{\binom32}{2^3}=\frac38.
$$

## 使用公式・定理
有限標本空間の各基本結果が等確率なら
$$
P(A)=\frac{|A|}{|\Omega|}.
$$
重要なのは、分子と分母を**同じ数え方**で数えることである。順序を区別するなら両方で区別し、順序を無視するなら両方で組合せを使う。

## 計算例
硬貨3回では各列
$$
HHH,HHT,HTH,HTT,THH,THT,TTH,TTT
$$
が等確率なので
$$
|\Omega|=2^3=8.
$$
表が2回の列は
$$
HHT,HTH,THH
$$
の3通り、すなわち
$$
|A|=\binom32=3.
$$
よって
$$
P(A)=\frac38.
$$

順序を無視する例として、赤5個・青3個から同時に2個取り、赤1個・青1個となる確率は
$$
\begin{aligned}
P(E)
&=\frac{\binom51\binom31}{\binom82}\\
&=\frac{15}{28}.
\end{aligned}
$$
ここでは分子・分母とも組合せで数えている。

## 一手
先に「何を1つの基本結果と数えるか」を決め、その結果が等確率か確認する。その後で有利な結果数を全結果数で割る。

## 注意
結果が等確率でないときは個数の比を使えない。非復元で同時抽出する問題の分母を $8^2$ のような復元・順序ありの数にしない。

<!-- CARD -->

---
id: prob-mixture-marginal
title: 潜在クラスを足し上げて混合分布を作る
category: math-probability
subcategory: math-distribution-functions
topic: mixture-marginalization
type: formula
difficulty: 2
priority: S
hashtags:
  - 混合分布
  - 周辺分布
  - 全確率
frequency:
  past_exam: 1
  textbook: 0
  independent_problems: 0
  source_confirmations: 1
sources:
  - type: official_syllabus
    topic: 周辺分布
  - type: past_exam
    id: MATH-2024-Q4
    topic: 経験分布・混合分布
archive_reason: duplicate
canonical_card: prob-marginal-density
coverage_card: prob-marginal-density
archive_note: 周辺化正本を、連続変数の積分だけでなく離散潜在クラスの総和 p_X(x)=sum_z p(x|z)P(z)
  まで拡張済み。旧カードと同じ0.3/0.7、0.8/0.2の例でP(X=1)=0.38、さらにBayes逆更新P(Z=1|X=1)=12/19≈0.632と連続混合密度例まで統合したため独立カード不要。
---
## 問題
$P(Z=1)=0.3,P(Z=2)=0.7$ で、$P(X=1\mid Z=1)=0.8,P(X=1\mid Z=2)=0.2$ である。$P(X=1)$ を求めよ。

## 答え
$P(Z=1)=0.3,P(Z=2)=0.7$、
$P(X=1\mid Z=1)=0.8,P(X=1\mid Z=2)=0.2$ なら
$$P(X=1)=0.38.$$

## 使用公式・定理
潜在クラス $Z$ を観測しないとき、$X$ の周辺分布は全確率で
$$
p_X(x)=\sum_z p_{X\mid Z}(x\mid z)P(Z=z)
$$
と得る。連続観測なら確率質量を条件付き密度へ置き換えて
$$
f_X(x)=\sum_z f_{X\mid Z}(x\mid z)P(Z=z).
$$

観測 $X=x$ から潜在クラスへ逆向きに更新するにはベイズの定理を使い、
$$
P(Z=k\mid X=x)
=\frac{P(Z=k)f_{X\mid Z}(x\mid k)}
{\sum_jP(Z=j)f_{X\mid Z}(x\mid j)}.
$$
分母はまさに周辺密度 $f_X(x)$ である。

## 計算例
離散観測の周辺化では
$$
\begin{aligned}
P(X=1)
&=P(X=1\mid Z=1)P(Z=1)\\
&\quad+P(X=1\mid Z=2)P(Z=2)\\
&=0.8\cdot0.3+0.2\cdot0.7\\
&=0.38.
\end{aligned}
$$

逆向きの連続観測例として
$$P(Z=1)=P(Z=2)=\frac12,$$
$$f_{X\mid Z}(x\mid1)=0.6,\qquad f_{X\mid Z}(x\mid2)=0.2$$
とする。まず周辺密度は
$$
f_X(x)=0.5\cdot0.6+0.5\cdot0.2=0.4.
$$
よってベイズの定理から
$$
\begin{aligned}
P(Z=1\mid X=x)
&=\frac{0.5\cdot0.6}{0.4}\\
&=0.75.
\end{aligned}
$$

## 一手
潜在クラスを消すときは「条件付き分布×混合比を足す」。観測後にクラスへ戻るときは同じ各項を作り、その総和で割って正規化する。

## 注意
連続観測では $P(X=x)=0$ なので点確率の比を使わず、条件付き密度と周辺密度でベイズの定理を書く。
