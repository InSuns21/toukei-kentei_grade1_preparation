---
id: prob-mgf-mean-variance
title: モーメント母関数の微分で平均と分散を求める
category: math-probability
subcategory: math-distribution-functions
topic: mgf-moments
type: formula
difficulty: 2
priority: A
hashtags: [モーメント母関数（積率母関数）, 期待値, 分散]
frequency: { past_exam: 1, textbook: 0, independent_problems: 0, source_confirmations: 1 }
sources: [{ type: official_syllabus, topic: モーメント母関数 }, { type: past_exam, id: MATH-2023-Q3, topic: 指数分布・モーメント母関数 }]
---
## 問題
$X$ のモーメント母関数が $M_X(t)=(1-2t)^{-1}$（$t<1/2$）である。$E[X]$ と $\operatorname{Var}(X)$ を求めよ。

## 答え
1階・2階微分へ $t=0$ を代入し、二次モーメントから平均の二乗を引く。

## 使用公式・定理
原点の近傍でモーメント母関数が有限なら
$$E[X]=M_X'(0),\qquad E[X^2]=M_X''(0),$$
$$\operatorname{Var}(X)=M_X''(0)-M_X'(0)^2.$$

## 計算例
$$M_X'(t)=2(1-2t)^{-2},\qquad M_X''(t)=8(1-2t)^{-3}.$$
したがって
$$E[X]=2,$$
$$\operatorname{Var}(X)=8-2^2=4.$$

## 一手
モーメント母関数では微分してから $t=0$ を代入する。

## 注意
$M_X''(0)$ は分散ではなく二次モーメントである。

<!-- CARD -->
---
id: prob-mgf-affine-transform
title: 線形変換のモーメント母関数を引数変換で求める
category: math-probability
subcategory: math-distribution-functions
topic: mgf-affine-transform
type: formula
difficulty: 2
priority: B
hashtags: [モーメント母関数（積率母関数）, 線形変換, 引数変換]
frequency: { past_exam: 0, textbook: 0, independent_problems: 0, source_confirmations: 0 }
sources: [{ type: official_syllabus, topic: モーメント母関数 }]
---
## 問題
$M_X(t)=(1-t)^{-1}$（$t<1$）で、$Y=2X+3$ とする。$M_Y(t)$ を求めよ。

## 答え
定数部分を指数因子として外へ出し、$X$ の母関数へ $2t$ を代入する。

## 使用公式・定理
$Y=aX+b$ なら
$$M_Y(t)=E[e^{t(aX+b)}]=e^{bt}M_X(at).$$

## 計算例
$$\begin{aligned}M_Y(t)&=e^{3t}M_X(2t)\\&=\frac{e^{3t}}{1-2t},\qquad t<\frac12.\end{aligned}$$

## 一手
加法定数は前の指数因子、倍率は母関数の引数へ入る。

## 注意
存在範囲も $2t<1$ へ変わる。

<!-- CARD -->
---
id: prob-mgf-iid-sum
title: 独立同分布和のモーメント母関数を累乗で表す
category: math-probability
subcategory: math-distribution-functions
topic: mgf-iid-sum
type: formula
difficulty: 2
priority: B
hashtags: [モーメント母関数（積率母関数）, 独立同分布, 和]
frequency: { past_exam: 0, textbook: 0, independent_problems: 0, source_confirmations: 0 }
sources: [{ type: official_syllabus, topic: モーメント母関数 }]
---
## 問題
$X_1,X_2,X_3$ は独立同分布で $M_{X_i}(t)=(1-t)^{-1}$（$t<1$）を持つ。$S=X_1+X_2+X_3$ のモーメント母関数を求めよ。

## 答え
独立和では母関数を掛け、同分布なので3乗にする。

## 使用公式・定理
独立な $X_1,\ldots,X_n$ について
$$M_{X_1+\cdots+X_n}(t)=\prod_{i=1}^nM_{X_i}(t).$$

## 計算例
$$\begin{aligned}M_S(t)&=M_{X_1}(t)M_{X_2}(t)M_{X_3}(t)\\&=(1-t)^{-3},\qquad t<1.\end{aligned}$$
これはshape $3$、rate $1$ のGamma分布のモーメント母関数である。

## 一手
同じ分布の独立和では、1個分の母関数を個数乗する。

## 注意
同分布だけでは積にできず、独立性も必要である。

<!-- CARD -->
---
id: prob-mgf-exponential-domain
title: 指数分布のモーメント母関数と存在範囲を求める
category: math-probability
subcategory: math-distribution-functions
topic: mgf-exponential
type: calc_step
difficulty: 2
priority: A
hashtags: [モーメント母関数（積率母関数）, 指数分布, 存在範囲]
frequency: { past_exam: 1, textbook: 0, independent_problems: 0, source_confirmations: 1 }
sources: [{ type: official_syllabus, topic: モーメント母関数 }, { type: past_exam, id: MATH-2023-Q3, topic: 指数分布・モーメント母関数 }]
---
## 問題
$X$ はrate $\lambda>0$ の指数分布に従う。台は $x>0$、確率密度関数は $f_X(x)=\lambda e^{-\lambda x}$ である。$M_X(t)$ と有限になる範囲を求めよ。

## 答え
指数をまとめ、無限遠で積分が収束する条件 $\lambda-t>0$ を付ける。

## 使用公式・定理
$$M_X(t)=E[e^{tX}]=\int_0^\infty e^{tx}f_X(x)\,dx.$$

## 計算例
$$\begin{aligned}M_X(t)&=\lambda\int_0^\infty e^{-(\lambda-t)x}\,dx\\&=\lambda\left[\frac{-e^{-(\lambda-t)x}}{\lambda-t}\right]_0^\infty\\&=\frac{\lambda}{\lambda-t},\qquad t<\lambda.\end{aligned}$$

## 一手
母関数の積分では、値だけでなく収束させる $t$ の範囲も求める。

## 注意
$t\ge\lambda$ では積分が発散する。

<!-- CARD -->
---
id: prob-mgf-gamma
title: Gamma分布のモーメント母関数をGamma積分で求める
category: math-probability
subcategory: math-distribution-functions
topic: mgf-gamma
type: expansion
difficulty: 3
priority: B
hashtags: [モーメント母関数（積率母関数）, ガンマ分布, Gamma積分]
frequency: { past_exam: 0, textbook: 0, independent_problems: 0, source_confirmations: 0 }
sources: [{ type: official_syllabus, topic: モーメント母関数 }]
---
## 問題
$X$ はshape $\alpha>0$、rate $\beta>0$ のGamma分布に従う。台は $x>0$、確率密度関数は $f_X(x)=\beta^\alpha x^{\alpha-1}e^{-\beta x}/\Gamma(\alpha)$ である。$M_X(t)$ を求めよ。

## 答え
指数のrateを $\beta-t$ にまとめ、Gamma積分へ合わせる。

## 使用公式・定理
$$\int_0^\infty x^{\alpha-1}e^{-cx}\,dx=\frac{\Gamma(\alpha)}{c^\alpha}\qquad(c>0).$$

## 計算例
$$\begin{aligned}M_X(t)&=\frac{\beta^\alpha}{\Gamma(\alpha)}\int_0^\infty x^{\alpha-1}e^{-(\beta-t)x}\,dx\\&=\frac{\beta^\alpha}{\Gamma(\alpha)}\frac{\Gamma(\alpha)}{(\beta-t)^\alpha}\\&=\left(\frac{\beta}{\beta-t}\right)^\alpha,\qquad t<\beta.\end{aligned}$$

## 一手
$e^{tx}$ を掛けた後の指数係数を新しいrateとして読む。

## 注意
本教材はshape-rate表示であり、尺度表示と混同しない。

<!-- CARD -->
---
id: prob-mgf-identify-normal
title: モーメント母関数の形から正規分布を同定する
category: math-probability
subcategory: math-distribution-functions
topic: mgf-identification-normal
type: recognition
difficulty: 2
priority: B
hashtags: [モーメント母関数（積率母関数）, 正規分布（ガウス分布）, 分布同定]
frequency: { past_exam: 0, textbook: 0, independent_problems: 0, source_confirmations: 0 }
sources: [{ type: official_syllabus, topic: モーメント母関数 }]
---
## 問題
$X$ のモーメント母関数が $M_X(t)=\exp(3t+2t^2)$ である。$X$ の分布を同定せよ。

## 答え
正規分布の母関数 $\exp(\mu t+\sigma^2t^2/2)$ と係数比較する。

## 使用公式・定理
正規分布 $N(\mu,\sigma^2)$ のモーメント母関数は
$$M(t)=\exp\left(\mu t+\frac{\sigma^2t^2}{2}\right).$$

## 計算例
係数を比較して
$$\mu=3,\qquad \frac{\sigma^2}{2}=2.$$
したがって $\sigma^2=4$ であり
$$X\sim N(3,4).$$

## 一手
$t$ の係数が平均、$t^2$ の係数の2倍が分散である。

## 注意
第2引数は標準偏差ではなく分散である。

<!-- CARD -->
---
id: prob-mgf-nonexistence
title: モーメントがあってもモーメント母関数が存在しない場合を見抜く
category: math-probability
subcategory: math-distribution-functions
topic: mgf-nonexistence
type: pitfall
difficulty: 3
priority: B
hashtags: [モーメント母関数（積率母関数）, 存在条件, 対数正規分布]
frequency: { past_exam: 0, textbook: 0, independent_problems: 0, source_confirmations: 0 }
sources: [{ type: official_syllabus, topic: モーメント母関数 }]
---
## 問題
$Z$ は標準正規分布 $N(0,1)$ に従うとし、$X=e^Z$ は対数正規分布に従う。$E[X^r]=e^{r^2/2}$ は全ての正整数 $r$ で有限である。この事実だけから、$M_X(t)$ が $t=0$ の近傍で有限と結論できるか。

## 答え
結論できない。対数正規分布では全ての正整数次モーメントが有限でも、$t>0$ で $M_X(t)=E[e^{tX}]$ は発散する。

## 使用公式・定理
モーメント母関数を分布同定や項別微分に使うには、原点を含む開区間で有限であることが必要である。

## 計算例
$t>0$ とする。十分大きい $z$ では $te^z\ge z^2$ だから、積分の指数部について
$$te^z-\frac{z^2}{2}\ge\frac{z^2}{2}\ge0.$$
したがって、ある $z_0$ 以降で被積分関数は正の定数 $1/\sqrt{2\pi}$ 以上となるので
$$M_X(t)=\frac{1}{\sqrt{2\pi}}\int_{-\infty}^{\infty}\exp\left(te^z-\frac{z^2}{2}\right)dz=\infty.$$

## 一手
各次数のモーメントの存在と、指数モーメントの近傍存在を区別する。

## 注意
形式的なべき級数へ期待値を入れ替えない。

<!-- CARD -->
---
id: prob-mgf-uniqueness-domain
title: モーメント母関数で分布を同定できる条件を確認する
category: math-probability
subcategory: math-distribution-functions
topic: mgf-uniqueness
type: condition
difficulty: 2
priority: B
hashtags: [モーメント母関数（積率母関数）, 一意性, 存在範囲]
frequency: { past_exam: 0, textbook: 0, independent_problems: 0, source_confirmations: 0 }
sources: [{ type: official_syllabus, topic: モーメント母関数 }]
---
## 問題
2つの確率変数 $X,Y$ について、$M_X(t)=M_Y(t)$ が $-0.1<t<0.1$ で成り立つ。何が結論できるか。また $t=0$ の1点だけで一致する場合はどうか。

## 答え
原点を含む開区間で両母関数が有限かつ一致するので、$X,Y$ は同じ分布に従う。$t=0$ の1点だけの一致では結論できない。

## 使用公式・定理
モーメント母関数が原点を含む開区間で有限なら、その区間での母関数は分布を一意に定める。

## 計算例
任意の確率変数で
$$M_X(0)=E[e^{0X}]=1.$$
したがって $M_X(0)=M_Y(0)$ は常に成り立ち、分布同定の情報を持たない。一方、開区間での一致には一意性定理を使える。

## 一手
母関数による同定では「原点近傍で有限かつ一致」を確認する。

## 注意
存在範囲を書かずに母関数の一致だけを主張しない。
