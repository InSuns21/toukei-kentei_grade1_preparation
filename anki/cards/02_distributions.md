---
id: dist-variance-moment
title: 二次モーメントから分散を計算する
category: distributions
subcategory: moments
topic: variance
type: reverse
difficulty: 1
priority: B
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
id: dist-gamma-recognition
title: Gamma型積分を正規化定数へ結び付ける
category: distributions
subcategory: named-distributions
topic: gamma-integral
type: recognition
difficulty: 2
priority: B
hashtags: [Gamma分布, 積分, 形の認識]
frequency: { past_exam: 0, textbook: 0, independent_problems: 0, source_confirmations: 0 }
sources: [{ type: official_syllabus, topic: 連続分布 }]
---
## 問題
$a,b>0$ のとき $\int_0^\infty x^{a-1}e^{-bx}\,dx$ を評価せよ。
## 答え
$u=bx$ と置いてGamma関数へ寄せる。
## 使用公式・定理
$$\Gamma(a)=\int_0^\infty u^{a-1}e^{-u}\,du,\qquad a>0.$$
## 計算例
$u=bx$ とすると $x=u/b$, $dx=du/b$ だから
$$\begin{aligned}\int_0^\infty x^{a-1}e^{-bx}\,dx&=\int_0^\infty(u/b)^{a-1}e^{-u}\frac{du}{b}\\&=b^{-a}\int_0^\infty u^{a-1}e^{-u}\,du\\&=\frac{\Gamma(a)}{b^a}.\end{aligned}$$
## 重要な一手
$x^{a-1}e^{-bx}$ を見たら shape-rate のGamma型と認識する。
## 注意
$b^{-a}$ を落とさない。

<!-- CARD -->
---
id: dist-jacobian-scale
title: 1変数変換でJacobianの絶対値を使う
category: distributions
subcategory: transformations
topic: jacobian
type: strategy
difficulty: 2
priority: B
hashtags: [Jacobian, 変数変換, support]
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

<!-- CARD -->
---
id: dist-clt-standardize
title: 標本平均を中心極限定理で標準化する
category: distributions
subcategory: asymptotics
topic: central-limit-theorem
type: strategy
difficulty: 2
priority: B
hashtags: [CLT, 標準化, 漸近分布]
frequency: { past_exam: 0, textbook: 0, independent_problems: 0, source_confirmations: 0 }
sources: [{ type: official_syllabus, topic: 中心極限定理 }]
---
## 問題
独立同分布な $X_i$ が $E[X_i]=10$, $\operatorname{Var}(X_i)=4$ を満たす。$n=100$ で $P(\overline X>10.4)$ を近似せよ。
## 方針
有限分散を確認し、中心化・標準化して標準正規分布へ接続する。
## 使用公式・定理
独立同分布で平均 $\mu$、有限な正の分散 $\sigma^2$ があれば
$$\frac{\sqrt n(\overline X-\mu)}{\sigma}\xrightarrow{d}N(0,1).$$
## 計算例
標準誤差は $2/\sqrt{100}=0.2$ なので
$$\begin{aligned}P(\overline X>10.4)&\approx P\left(Z>\frac{10.4-10}{0.2}\right)\\&=P(Z>2).\end{aligned}$$
## 重要な一手
標準誤差は $\sigma/\sqrt n=0.2$ である。
## 注意
母分散を $n$ で割り、標準偏差を $n$ で割らない。
