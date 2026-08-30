---
id: engproc-ma1-invertible-shock-recovery
title: 可逆MA(1)から直近の革新を復元する
category: applied-engineering
subcategory: engineering-stochastic-processes
topic: ma1-invertibility
type: calc_step
difficulty: 3
priority: B
hashtags:
  - 時系列解析
  - 移動平均過程
  - 可逆性
frequency:
  past_exam: 0
  textbook: 0
  independent_problems: 0
  source_confirmations: 0
sources:
  - type: official_syllabus
    topic: 移動平均過程
archive_reason: duplicate
canonical_card: ts-ma1-invertibility
archive_note: MA(1)の再帰表示から可逆条件を導き、観測値から革新を逐次復元する数値例までcanonical cardへ統合済み。
---
## 問題
$X_t=\varepsilon_t+0.4\varepsilon_{t-1}$ で、$X_t=3.0$、$\varepsilon_{t-1}=-0.5$ とする。$\varepsilon_t$ を求め、可逆性も判定せよ。
## 記号・用語
$\varepsilon_t$ は時点 $t$ の革新、可逆性は観測系列から革新を一意に安定復元できる性質である。
## 使用公式・定理
MA(1)では $\varepsilon_t=X_t-\theta\varepsilon_{t-1}$。規約 $X_t=\varepsilon_t+\theta\varepsilon_{t-1}$ では $|\theta|<1$ が可逆条件である。
## 一手／方針
観測式を現在の革新について解き、係数の絶対値を1と比較する。
## 答え
$$\varepsilon_t=3.0-0.4(-0.5)=3.2,$$
かつ $|0.4|<1$ なので可逆である。
## 計算例
次期観測が $X_{t+1}=1.8$ なら、$\varepsilon_{t+1}=1.8-0.4(3.2)=0.52$ と逐次復元できる。
## 注意
MA多項式を $1-\theta B$ と置く別規約では係数の符号が変わるため、モデル式を先に確認する。
