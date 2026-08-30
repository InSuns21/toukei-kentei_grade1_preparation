---
id: engproc-ar1-spectral-ratio
title: AR(1)スペクトルの低周波・高周波比を求める
category: applied-engineering
subcategory: engineering-stochastic-processes
topic: ar1-spectrum
type: calc_step
difficulty: 3
priority: B
hashtags:
  - 時系列解析
  - スペクトル密度
  - 自己回帰過程
frequency:
  past_exam: 0
  textbook: 0
  independent_problems: 0
  source_confirmations: 0
sources:
  - type: official_syllabus
    topic: 時系列解析
archive_reason: duplicate
canonical_card: ts-spectral-density-ar1
archive_note: AR(1)スペクトル密度の導出、f(0)/f(pi)の一般式、phi=0.6の数値例、AR係数の符号による低周波・高周波強度の解釈までcanonical
  cardへ統合済み。
---
## 問題
$X_t=0.6X_{t-1}+\varepsilon_t$ のスペクトル密度について、$f(0)/f(\pi)$ を求めよ。
## 記号・用語
$f(\omega)$ は角周波数 $\omega$ におけるスペクトル密度である。$\omega=0$ は低周波、$\omega=\pi$ は最高周波側を表す。
## 使用公式・定理
AR(1)では
$$f(\omega)=\frac{\sigma_\varepsilon^2}{2\pi\{1+\phi^2-2\phi\cos\omega\}}.$$
## 一手／方針
$\cos0=1$、$\cos\pi=-1$ を代入し、共通因子を約分する。
## 答え
$$\frac{f(0)}{f(\pi)}=\frac{(1+\phi)^2}{(1-\phi)^2}
=\left(\frac{1.6}{0.4}\right)^2=16.$$
## 計算例
正のAR係数により、ゆっくりした工程変動の強さが高周波変動の16倍になる。
## 注意
$f(0)$ と $f(\pi)$ の分母の比を逆向きにしない。
