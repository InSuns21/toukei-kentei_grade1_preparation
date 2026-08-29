---
id: prob-mgf-iid-sum
title: 独立同分布和のモーメント母関数を累乗で表す
category: math-probability
subcategory: math-distribution-functions
topic: mgf-iid-sum
type: formula
difficulty: 2
priority: S
hashtags:
  - モーメント母関数（積率母関数）
  - 独立同分布
  - 和
frequency:
  past_exam: 0
  textbook: 0
  independent_problems: 0
  source_confirmations: 0
sources:
  - type: official_syllabus
    topic: モーメント母関数
archive_reason: duplicate
canonical_card: prob-mgf-affine-transform
archive_note: 強化済みcanonicalへ独立和の積則、同分布なら累乗、一般線形結合Y=b+sum a_i X_iまで統合し、3個のiid和の数値例も吸収済み。
---
## 問題
$X_1,X_2,X_3$ は独立同分布で $M_{X_i}(t)=(1-t)^{-1}$（$t<1$）を持つ。$S=X_1+X_2+X_3$ のモーメント母関数を求めよ。

## 答え
独立和では母関数を掛け、同分布なので3乗にする。

## 使用公式・定理
独立な $X_1,\ldots,X_n$ について
$$M_{X_1+\cdots+X_n}(t)=\prod_{i=1}^nM_{X_i}(t).$$

## 計算例
$$\begin{aligned}M_S(t)&=M_{X_1}(t)M_{X_2}(t)M_{X_3}(t)\\&=(1-t)^{-3},\qquad t<1.\end{aligned}$$
これはshape $3$、rate $1$ のガンマ分布のモーメント母関数である。

## 一手
同じ分布の独立和では、1個分の母関数を個数乗する。

## 注意
同分布だけでは積にできず、独立性も必要である。

<!-- CARD -->

---
id: prob-mgf-exponential-domain
title: 指数分布のモーメント母関数と存在範囲を求める
category: math-probability
subcategory: math-distribution-functions
topic: mgf-exponential
type: calc_step
difficulty: 2
priority: S
hashtags:
  - モーメント母関数（積率母関数）
  - 指数分布
  - 存在範囲
frequency:
  past_exam: 1
  textbook: 0
  independent_problems: 0
  source_confirmations: 1
sources:
  - type: official_syllabus
    topic: モーメント母関数
  - type: past_exam
    id: MATH-2023-Q3
    topic: 指数分布・モーメント母関数
archive_reason: duplicate
canonical_card: prob-mgf-gamma
archive_note: ガンマ分布canonicalでshape=1,
  rate=lambdaを代入して指数分布M_X(t)=lambda/(lambda-t),
  t<lambdaを導出し、収束条件まで扱うため分布別カードは重複。
---
## 問題
$X$ はrate $\lambda>0$ の指数分布に従う。台は $x>0$、確率密度関数は $f_X(x)=\lambda e^{-\lambda x}$ である。$M_X(t)$ と有限になる範囲を求めよ。

## 答え
指数をまとめ、無限遠で積分が収束する条件 $\lambda-t>0$ を付ける。

## 使用公式・定理
$$M_X(t)=E[e^{tX}]=\int_0^\infty e^{tx}f_X(x)\,dx.$$

## 計算例
$$\begin{aligned}M_X(t)&=\lambda\int_0^\infty e^{-(\lambda-t)x}\,dx\\&=\lambda\left[\frac{-e^{-(\lambda-t)x}}{\lambda-t}\right]_0^\infty\\&=\frac{\lambda}{\lambda-t},\qquad t<\lambda.\end{aligned}$$

## 一手
母関数の積分では、値だけでなく収束させる $t$ の範囲も求める。

## 注意
$t\ge\lambda$ では積分が発散する。

<!-- CARD -->

---
id: prob-mgf-identify-normal
title: モーメント母関数の形から正規分布を同定する
category: math-probability
subcategory: math-distribution-functions
topic: mgf-identification-normal
type: recognition
difficulty: 2
priority: S
hashtags:
  - モーメント母関数（積率母関数）
  - 正規分布（ガウス分布）
  - 分布同定
frequency:
  past_exam: 0
  textbook: 0
  independent_problems: 0
  source_confirmations: 0
sources:
  - type: official_syllabus
    topic: モーメント母関数
archive_reason: duplicate
canonical_card: prob-mgf-uniqueness-domain
archive_note: 一意性canonicalへ正規分布のMGFとexp(3t+2t^2)からN(3,4)を同定する完全例を吸収済み。形の照合だけのカードは独立保持しない。
---
## 問題
$X$ のモーメント母関数が $M_X(t)=\exp(3t+2t^2)$ である。$X$ の分布を同定せよ。

## 答え
正規分布の母関数 $\exp(\mu t+\sigma^2t^2/2)$ と係数比較する。

## 使用公式・定理
正規分布 $N(\mu,\sigma^2)$ のモーメント母関数は
$$M(t)=\exp\left(\mu t+\frac{\sigma^2t^2}{2}\right).$$

## 計算例
係数を比較して
$$\mu=3,\qquad \frac{\sigma^2}{2}=2.$$
したがって $\sigma^2=4$ であり
$$X\sim N(3,4).$$

## 一手
$t$ の係数が平均、$t^2$ の係数の2倍が分散である。

## 注意
第2引数は標準偏差ではなく分散である。
