---
id: engasym-delta-log
title: デルタ法で対数推定量の漸近分散を求める
category: applied-engineering
subcategory: engineering-asymptotics
topic: delta-method
type: calc_step
difficulty: 2
priority: S
hashtags:
  - デルタ法
  - 漸近分散
  - 対数変換
frequency:
  past_exam: 0
  textbook: 0
  independent_problems: 0
  source_confirmations: 0
sources:
  - type: official_syllabus
    topic: デルタ法
archive_reason: too_specific
canonical_card: asym-delta-method
archive_note: 一般Delta法カードがTaylor展開・漸近分散・具体例まで扱う。log変換だけの理工派生を独立反復しない。engineering-asymptotics
  のデルタ法coverageは他の同一subcategoryカードで維持する。
---
## 問題
$\sqrt n(\widehat\theta-\theta)\xrightarrow{d}N(0,V)$、$\theta>0$ のとき、$\log\widehat\theta$ の漸近分布を求めよ。（ここで $N$ は正規分布を表す。）
## 記号・用語
漸近分散定数は $\sqrt n$ で標準化した極限正規分布の分散をいう。推定量自体の近似分散はこれを $n$ で割る。
## 使用公式・定理
デルタ法：微分可能な $g$ に対し、漸近分散定数は $[g'(\theta)]^2V$。
## 一手／方針
$g(\theta)=\log\theta$ の導関数を求める。
## 答え
$g'(\theta)=1/\theta$ なので
$$\sqrt n(\log\widehat\theta-\log\theta)\xrightarrow{d}N\left(0,\frac V{\theta^2}\right).$$
## 計算例
$\widehat\theta$ 自体の近似分散が $V/n$ なら、対数の近似分散は $V/(n\theta^2)$。
## 注意
$\theta>0$ が対数変換の前提である。
