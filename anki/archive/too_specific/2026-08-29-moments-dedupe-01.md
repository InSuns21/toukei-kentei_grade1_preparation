---
id: dist-hypergeometric-moments-by-definition
title: 超幾何分布の平均を定義から求める
category: math-distributions
subcategory: math-discrete-distributions
topic: hypergeometric-moments-definition
type: calc_step
difficulty: 3
priority: A
hashtags:
  - 超幾何分布
  - 平均
  - 定義
  - 順列
frequency:
  past_exam: 0
  textbook: 0
  independent_problems: 0
  source_confirmations: 0
sources:
  - type: official_syllabus
    topic: 超幾何分布
archive_reason: too_specific
canonical_card: dist-hypergeometric-moments
archive_note: Vandermondeで平均だけを導く派生。canonical側は平均に加え分散と有限母集団補正まで扱い、試験で必要な情報が広い。
---
## 問題
$N$ 個中 $K$ 個が成功の母集団から非復元で $n$ 個を取ったときの成功数 $X$ は $p_X(x)=\dfrac{\binom Kx\binom{N-K}{n-x}}{\binom Nn}$ を持つ。$E[X]$ をこの定義から求めよ。

## 答え
$$E[X]=n\frac{K}{N}.$$

## 使用公式・定理
$E[X]=\sum_{x=0}^{n}x\dfrac{\binom Kx\binom{N-K}{n-x}}{\binom Nn}$。組合わせ記号の恒等式
$$x\binom Kx=K\binom{K-1}{x-1}$$
と
$\sum_{x=1}^{n}\binom{K-1}{x-1}\binom{N-K}{n-x}=\binom{N-1}{n-1}$
（Vandermonde の恒等式）を使う。

## 計算例
$$E[X]=\frac{1}{\binom Nn}\sum_{x=1}^{n}K\binom{K-1}{x-1}\binom{N-K}{n-x}=\frac{K\binom{N-1}{n-1}}{\binom Nn}.$$
$\binom Nn=\dfrac Nn\binom{N-1}{n-1}$ なので
$$E[X]=K\frac{\binom{N-1}{n-1}}{\binom Nn}=K\frac{n}{N}=n\frac KN.$$

## 一手
$x\binom Kx=K\binom{K-1}{x-1}$ で $x$ を吸収し、Vandermonde の恒等式で二つの二項係数をまとめる。

## 注意
本カードは平均を定義から導出する。分散・有限母集団補正の結果は既存カード `dist-hypergeometric-moments` で扱う。導出では $x=0$ の項が消えることを確認する。
