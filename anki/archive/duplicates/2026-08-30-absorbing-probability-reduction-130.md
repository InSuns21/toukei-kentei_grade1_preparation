---
id: engproc-absorbing-probability-matrix
title: 基本行列から吸収先確率を計算する
category: applied-engineering
subcategory: engineering-stochastic-processes
topic: absorbing-probability
type: calc_step
difficulty: 4
priority: B
hashtags:
  - マルコフ連鎖
  - 吸収確率
  - 基本行列
frequency:
  past_exam: 0
  textbook: 0
  independent_problems: 0
  source_confirmations: 0
sources:
  - type: official_syllabus
    topic: マルコフ連鎖
archive_reason: duplicate
canonical_card: engproc-absorbing-fundamental-matrix
archive_note: 吸収連鎖の標準形からQ,Rを取り出し、N=(I-Q)^(-1)、期待訪問回数、平均吸収時間、B=NRによる吸収確率までcanonical cardへ統合済み。
---
## 問題
一時状態から2つの吸収状態への遷移部分を $R=\begin{pmatrix}0.2&0.1\\0.1&0.2\end{pmatrix}$、基本行列を $N=\begin{pmatrix}20/9&10/9\\5/9&25/9\end{pmatrix}$ とする。吸収確率行列を求めよ。
## 記号・用語
$B_{ij}$ は一時状態 $i$ から最終的に吸収状態 $j$ へ入る確率である。
## 使用公式・定理
吸収確率行列は $B=NR$。
## 一手／方針
基本行列と吸収遷移部分を行列乗算する。
## 答え
$$B=\begin{pmatrix}5/9&4/9\\7/18&11/18\end{pmatrix}.$$
## 計算例
各行和は1で、いずれかの吸収状態へ最終的に入る。
## 注意
行が出発する一時状態、列が吸収先に対応する。
