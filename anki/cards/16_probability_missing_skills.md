---
id: prob-counting-sample-space
title: 場合の数から有限標本空間の確率を求める
category: math-probability
subcategory: math-events
topic: counting-probability
type: calc_step
difficulty: 2
priority: S
hashtags: [確率の計算, 場合の数, 標本空間]
frequency: { past_exam: 1, textbook: 0, independent_problems: 0, source_confirmations: 1 }
sources: [{ type: official_syllabus, topic: 確率の計算 }, { type: past_exam, id: MATH-2022-Q1, topic: 確率空間・独立性 }]
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
id: prob-conditional-definition-direct
title: 共通部分と条件事象から条件付き確率を求める
category: math-probability
subcategory: math-events
topic: conditional-probability-definition
type: formula
difficulty: 2
priority: S
hashtags: [条件付き確率, 共通部分, 定義]
frequency: { past_exam: 1, textbook: 0, independent_problems: 0, source_confirmations: 1 }
sources: [{ type: official_syllabus, topic: 条件付き確率 }, { type: past_exam, id: MATH-2022-Q2, topic: 一様分布・条件付き分布 }]
---
## 問題
$P(A\cap B)=0.18$、$P(B)=0.30$ である。$P(A\mid B)$ を求めよ。

## 答え
$$
P(A\mid B)=\frac{0.18}{0.30}=0.60.
$$

## 使用公式・定理
$P(B)>0$ のとき条件付き確率は
$$
P(A\mid B)=\frac{P(A\cap B)}{P(B)}.
$$
同じ式を $P(A\cap B)$ について解けば
$$
P(A\cap B)=P(A\mid B)P(B).
$$
したがって「条件付き確率を求める」と「共通部分へ戻す」は別公式ではなく同じ定義の往復である。

## 計算例
まず定義をそのまま使う例では
$$
\begin{aligned}
P(A\mid B)
&=\frac{P(A\cap B)}{P(B)}\\
&=\frac{0.18}{0.30}\\
&=0.60.
\end{aligned}
$$
逆向きに、$P(B)=0.4$, $P(A\mid B)=0.75$ が与えられたなら、同じ式の両辺へ $P(B)$ を掛けて
$$
\begin{aligned}
P(A\cap B)
&=P(A\mid B)P(B)\\
&=0.75\cdot0.4\\
&=0.30.
\end{aligned}
$$
となる。

## 一手
条件記号の右側 $B$ が分母である。共通部分が欲しいなら分母を払って掛け算へ戻す。

## 注意
$P(A\mid B)$ と $P(B\mid A)$ は一般に異なる。ベイズの定理は、この向きの違う条件付き確率を周辺確率と尤度で結び直す。

<!-- CARD -->
---
id: prob-density-from-cdf-derivative
title: 累積分布関数を微分して確率密度関数を求める
category: math-probability
subcategory: math-distribution-functions
topic: density-from-cdf
type: calc_step
difficulty: 2
priority: S
hashtags: [累積分布関数, 確率密度関数, 微分]
frequency: { past_exam: 1, textbook: 0, independent_problems: 0, source_confirmations: 1 }
sources: [{ type: official_syllabus, topic: 累積分布関数・確率密度関数 }, { type: past_exam, id: MATH-2018-Q5, topic: 順序統計量の確率密度 }]
---
## 問題
累積分布関数が
$$F_X(x)=\begin{cases}0&(x\le0),\\x^2&(0<x<1),\\1&(x\ge1)\end{cases}$$
である。確率密度関数 $f_X(x)$ を求めよ。

## 答え
累積分布関数が微分可能な区間で微分し、定数区間では0とする。

## 使用公式・定理
絶対連続な分布では、累積分布関数が微分可能な点で
$$f_X(x)=F_X'(x).$$

## 計算例
$0<x<1$ では
$$f_X(x)=\frac{d}{dx}x^2=2x.$$
$x<0$ と $x>1$ では $F_X$ が定数だから $f_X(x)=0$ である。従って
$$f_X(x)=\begin{cases}2x&(0<x<1),\\0&\text{それ以外}.
\end{cases}$$
確認すると
$$\int_{-\infty}^{\infty}f_X(x)\,dx=\int_0^1 2x\,dx=[x^2]_0^1=1.$$

## 一手
区分ごとに微分し、最後に密度の積分が1になることを確認する。

## 注意
累積分布関数に跳びがある場合、その点質量は通常の微分だけでは回収できない。
