---
id: data-em-responsibility
title: 2成分混合分布のE-stepを計算する
category: math-data-analysis
subcategory: math-incomplete-data
topic: em-algorithm
type: calc_step
difficulty: 3
priority: B
hashtags:
  - EM
  - 混合分布
  - 潜在変数
frequency:
  past_exam: 0
  textbook: 0
  independent_problems: 0
  source_confirmations: 0
sources:
  - type: official_syllabus
    topic: 不完全データ
archive_reason: duplicate
canonical_card: inc-em-observed-likelihood
archive_note: 混合分布のEステップで負担率を求める旧pilot数値例は、Q関数の定義から負担率 2/3 の具体計算まで吸収した不完全データcanonicalへ統合済み。
---
## 問題
混合比 $\pi=0.4$、観測 $x$ における成分密度が $f_1(x)=0.3$, $f_2(x)=0.1$ のとき、成分1の負担率を求めよ。
## 答え
潜在成分についてベイズの定理を使う。
## 使用公式・定理
$$r_1(x)=P(Z=1\mid x)=\frac{\pi f_1(x)}{\pi f_1(x)+(1-\pi)f_2(x)}.$$
## 計算例
$$\begin{aligned}r_1(x)&=\frac{0.4\cdot0.3}{0.4\cdot0.3+0.6\cdot0.1}\\&=\frac{0.12}{0.18}=\frac23.\end{aligned}$$
## 注意
分母には全成分の重み付き密度を足す。

<!-- CARD -->

---
id: data-monte-carlo-integral
title: Monte Carlo平均で積分を推定する
category: math-data-analysis
subcategory: math-simulation
topic: monte-carlo
type: strategy
difficulty: 2
priority: B
hashtags:
  - MonteCarlo
  - 積分
  - 大数の弱法則
frequency:
  past_exam: 0
  textbook: 0
  independent_problems: 0
  source_confirmations: 0
sources:
  - type: official_syllabus
    topic: シミュレーション
archive_reason: duplicate
canonical_card: sim-mc-standard-error
archive_note: 積分を期待値に直して標本平均で近似する旧pilotは、積分→期待値→Monte Carlo平均→標準誤差まで一続きに扱うcanonicalへ統合済み。
---
## 問題
$U_i$ は独立同分布に一様分布 $U(0,1)$ に従うとして、$\int_0^1x^2\,dx$ を推定する式を作れ。例として $u=(1/4,1/2,3/4)$ を使え。
## 方針
積分を一様分布の期待値と読み、標本平均で置き換える。
## 使用公式・定理
$$\int_0^1g(x)\,dx=E[g(U)],\qquad \widehat I_n=\frac1n\sum_{i=1}^ng(U_i).$$
## 計算例
$$\widehat I_3=\frac{(1/4)^2+(1/2)^2+(3/4)^2}{3}=\frac7{24}\approx0.292.$$
真値は $[x^3/3]_0^1=1/3$。小標本なので誤差が大きい。
## 注意
乱数は実際には連続一様分布から生成する。
