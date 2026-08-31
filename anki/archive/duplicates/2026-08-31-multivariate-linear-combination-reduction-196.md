---
id: engasym-multivariate-linear-combination
title: 多変量漸近正規分布から線形結合を取り出す
category: applied-engineering
subcategory: engineering-asymptotics
topic: multivariate-asymptotic-normality
type: calc_step
difficulty: 2
priority: A
hashtags:
  - 漸近分散
  - 線形結合の分布
  - 多変量正規分布
frequency:
  past_exam: 0
  textbook: 0
  independent_problems: 0
  source_confirmations: 0
sources:
  - type: official_syllabus
    topic: 漸近分散
archive_reason: duplicate
canonical_card: mv-covariance-linear-transform
coverage_card: mv-covariance-linear-transform
archive_note: 多変量漸近正規ベクトルの線形結合は通常の線形変換則 Var(a^T X)=a^T Sigma a と同一の判断単位。正本に
  sqrt(n)(beta_hat-beta)=>N_2(0,[[4,1],[1,9]])、a=(1,-1)^T、漸近分散定数11、推定量自身の近似分散11/nまで統合済み。
---
## 問題
$\sqrt n(\widehat\beta-\beta)\xrightarrow{d}N_2(0,\Sigma)$、$\Sigma=\begin{pmatrix}4&1\\1&9\end{pmatrix}$ とする。$\widehat\beta_1-\widehat\beta_2$ の漸近分散定数を求めよ。（ここで $N$ は正規分布を表す。）
## 記号・用語
漸近分散定数は実際の近似分散に現れる $1/n$ より前の係数である。
## 使用公式・定理
線形結合 $a^{\mathsf T}\widehat\beta$ の漸近分散定数は $a^{\mathsf T}\Sigma a$。
## 一手／方針
$a=(1,-1)^{\mathsf T}$ を二次形式へ代入する。
## 答え
$$a^{\mathsf T}\Sigma a=4+9-2(1)=11.$$
したがって近似分散は $11/n$。
## 計算例
和なら $a=(1,1)$ で分散定数は $4+9+2=15$。
## 注意
差の分散では共分散項の符号が負になる。
