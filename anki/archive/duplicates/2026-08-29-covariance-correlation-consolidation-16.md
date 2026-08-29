---
id: prob-covariance-computation
title: 同時分布から共分散を計算する
category: math-probability
subcategory: math-distribution-characteristics
topic: covariance
type: calc_step
difficulty: 2
priority: A
hashtags:
  - 共分散
  - 同時分布
  - 期待値
frequency:
  past_exam: 0
  textbook: 0
  independent_problems: 0
  source_confirmations: 0
sources:
  - type: official_syllabus
    topic: 共分散
archive_reason: duplicate
canonical_card: prob-correlation-coefficient
archive_note: 強化済み相関canonicalへ同時確率質量関数からE[X],E[Y],E[XY]を計算しCov(X,Y)=E[XY]-E[X]E[Y]を得る全手順を吸収済み。
---
## 問題
$(X,Y)$ の同時確率質量関数を $p(0,0)=0.1$、$p(0,1)=0.2$、$p(1,0)=0.3$、$p(1,1)=0.4$ とする。$\operatorname{Cov}(X,Y)$ を求めよ。

## 答え
$E[XY]$、$E[X]$、$E[Y]$ を計算し、$\operatorname{Cov}(X,Y)=E[XY]-E[X]E[Y]$ に代入する。

## 使用公式・定理
共分散は、$E[X^2]<\infty$ かつ $E[Y^2]<\infty$ のとき（Cauchy--Schwarz不等式により $E|XY|<\infty$ も保証される）
$\operatorname{Cov}(X,Y)=E[XY]-E[X]E[Y].$

## 計算例
$X,Y$ はともに0か1の値しか取らないので
$$E[XY]=1\cdot1\cdot p(1,1)=0.4,$$
$$E[X]=1\cdot\{p(1,0)+p(1,1)\}=0.7,$$
$$E[Y]=1\cdot\{p(0,1)+p(1,1)\}=0.6.$$
したがって
$$\operatorname{Cov}(X,Y)=0.4-0.7\cdot0.6=0.4-0.42=-0.02.$$

## 一手
周辺分布を先に求めてから $E[X],E[Y]$ を計算すると間違いが少ない。

## 注意
共分散が負なら一方が大きいとき他方が小さい傾向を示す。ここではわずかに負。

<!-- CARD -->

---
id: prob-cauchy-schwarz-correlation
title: コーシー–シュワルツの不等式で相関係数の範囲を確定する
category: math-probability
subcategory: math-distribution-characteristics
topic: cauchy-schwarz-correlation
type: theorem
difficulty: 2
priority: A
hashtags:
  - コーシー–シュワルツの不等式
  - 相関係数
  - 不等式
frequency:
  past_exam: 0
  textbook: 0
  independent_problems: 0
  source_confirmations: 0
sources:
  - type: official_syllabus
    topic: 相関係数
archive_reason: duplicate
canonical_card: prob-correlation-coefficient
archive_note: 相関canonicalへ中心化変数にコーシー–シュワルツの不等式を適用してCov^2<=VarX
  VarY、したがって|rho|<=1を導く証明と等号条件を吸収済み。
---
## 問題
$E[X^2],E[Y^2]<\infty$ のとき、相関係数 $\rho_{X,Y}$ の取り得る範囲を求めよ。

## 答え
$-1\le\rho_{X,Y}\le1.$
$\operatorname{Var}(X),\operatorname{Var}(Y)>0$（非退化）の下で、$\lvert\rho\rvert=1$ は直線関係 $Y=aX+b$（$a\ne0$）と同値になる。

## 使用公式・定理
Cauchy–Schwarzの不等式の期待値版
$$\operatorname{Cov}(X,Y)^2\le\operatorname{Var}(X)\operatorname{Var}(Y).$$
$\rho_{X,Y}=\operatorname{Cov}(X,Y)/(\sigma_X\sigma_Y)$ より、両辺を $(\sigma_X\sigma_Y)^2$ で割ると $0\le\rho^2\le1$。

## 計算例
$\operatorname{Var}(X)=16,\ \operatorname{Var}(Y)=25$ なら
$$\lvert\operatorname{Cov}(X,Y)\rvert\le\sqrt{16\cdot25}=20.$$

## 一手
$\operatorname{Cov}(X,Y)$ にコーシー不等式を適用し、標準偏差の積で割って無次元化する。

## 注意
$\rho=0$ は無相関を表し、独立性は含意しない。$\lvert\rho\rvert=1$ は退化した直線関係。

<!-- CARD -->

---
id: prob-correlation-independence
title: 無相関と独立性の関係を判定する
category: math-probability
subcategory: math-distribution-characteristics
topic: correlation-independence
type: recognition
difficulty: 2
priority: A
hashtags:
  - 相関係数
  - 統計的独立
  - 無相関
frequency:
  past_exam: 0
  textbook: 0
  independent_problems: 0
  source_confirmations: 0
sources:
  - type: official_syllabus
    topic: 相関係数
archive_reason: duplicate
canonical_card: prob-correlation-coefficient
archive_note: 相関canonicalへ独立なら無相関、逆は一般に不成立という関係と、X in {-1,0,1}, Y=X^2による無相関だが従属な具体例を吸収済み。
---
## 問題
$X$ を $p_X(-1)=p_X(0)=p_X(1)=1/3$ とし、$Y=X^2$ とする。$\operatorname{Cov}(X,Y)$ を計算し、$X$ と $Y$ が独立かどうか答えよ。

## 答え
共分散は0になるが、$Y$ は $X$ の関数なので独立ではない。

## 使用公式・定理
独立なら $\operatorname{Cov}(X,Y)=0$（無相関）である。しかし逆は一般に成り立たない。$\operatorname{Cov}(X,Y)=0$ でも関数関係があり得る。

## 計算例
$E[X]=(-1+0+1)/3=0$。$XY=X^3$ で、$X^3$ の取る値は $-1,0,1$ だから
$$E[XY]=E[X^3]=\frac{-1+0+1}{3}=0.$$
よって
$$\operatorname{Cov}(X,Y)=E[XY]-E[X]E[Y]=0-0\cdot E[Y]=0.$$
一方、$P(X=1,Y=0)=0$ だが $P(X=1)P(Y=0)=(1/3)(1/3)=1/9\ne0$ なので独立ではない。

## 一手
「無相関だが独立でない」例は、対称な $X$ と偶関数 $Y=X^2$ の組合せが典型。

## 注意
多変量正規分布に限り、無相関と独立は同値になる。一般の分布では区別する。
