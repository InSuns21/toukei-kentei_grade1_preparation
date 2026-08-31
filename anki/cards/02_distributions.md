---
id: dist-variance-moment
title: 二次モーメントから分散を計算する
category: math-probability
subcategory: math-distribution-characteristics
topic: variance
type: reverse
difficulty: 1
priority: A
hashtags: [分散, 期待値, 頻出]
frequency: { past_exam: 0, textbook: 0, independent_problems: 0, source_confirmations: 0 }
sources: [{ type: official_syllabus, topic: 期待値と分散 }]
---
## 問題
$E[X]=2$, $E[X^2]=6$ から $\operatorname{Var}(X)$ を求めよ。
## 答え
$$\operatorname{Var}(X)=E[X^2]-E[X]^2.$$
## 使用公式・定理
$$\operatorname{Var}(X)=E[(X-E[X])^2]=E[X^2]-E[X]^2.$$
## 計算例
$$\begin{aligned}\operatorname{Var}(X)&=E[X^2]-E[X]^2\\&=6-2^2\\&=2.\end{aligned}$$
## 一手
二乗の期待値から平均の二乗を引く。
## 注意
$E[X^2]$ と $E[X]^2$ は異なる。

<!-- CARD -->

---
id: dist-jacobian-scale
title: 1変数変換でJacobianの絶対値を使う
category: math-probability
subcategory: math-transformations
topic: jacobian
type: strategy
difficulty: 2
priority: A
hashtags: [変数変換, 台]
frequency: { past_exam: 0, textbook: 0, independent_problems: 0, source_confirmations: 0 }
sources: [{ type: official_syllabus, topic: 変数変換 }]
---
## 問題
$X$ の確率密度関数が $f_X(x)=e^{-x}$（$x>0$）で、$Y=2X$ である。$f_Y$ を求めよ。
## 方針
逆変換、台、Jacobianの順に処理する。
## 使用公式・定理
単調な変換 $Y=g(X)$ では
$$f_Y(y)=f_X(g^{-1}(y))\left|\frac{d}{dy}g^{-1}(y)\right|.$$
## 計算例
$x=y/2$, $|dx/dy|=1/2$ より
$$\begin{aligned}f_Y(y)&=f_X(y/2)\left|\frac{d(y/2)}{dy}\right|\\&=e^{-y/2}\cdot\frac12\\&=\frac12e^{-y/2},\qquad y>0.\end{aligned}$$
積分は $\int_0^\infty f_Y(y)\,dy=1$ となる。
## 重要な一手
元密度へ逆変換を代入し、導関数の絶対値を掛ける。
## 注意
変換後の台 $y>0$ を明記する。
