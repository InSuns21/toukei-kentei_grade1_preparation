---
id: prob-mgf-mean-variance
title: モーメント母関数の微分で平均と分散を求める
category: math-probability
subcategory: math-distribution-functions
topic: mgf-moments
type: formula
difficulty: 2
priority: S
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
priority: S
hashtags: [モーメント母関数（積率母関数）, 線形変換, 引数変換]
frequency: { past_exam: 0, textbook: 0, independent_problems: 0, source_confirmations: 0 }
sources: [{ type: official_syllabus, topic: モーメント母関数 }]
---
## 問題
$M_X(t)=(1-t)^{-1}$（$t<1$）で、$Y=2X+3$ とする。$M_Y(t)$ を求めよ。

## 答え
$M_X(t)=(1-t)^{-1}$、$Y=2X+3$ なら
$$
M_Y(t)=\frac{e^{3t}}{1-2t},\qquad t<\frac12.
$$

## 使用公式・定理
$Y=aX+b$ なら
$$
M_Y(t)=E[e^{t(aX+b)}]=e^{bt}M_X(at).
$$
また独立な $X_1,\ldots,X_n$ について
$$
M_{X_1+\cdots+X_n}(t)=\prod_{i=1}^nM_{X_i}(t).
$$
したがって独立な確率変数の線形結合
$$Y=b+\sum_{i=1}^na_iX_i$$
では
$$
M_Y(t)=e^{bt}\prod_{i=1}^nM_{X_i}(a_it).
$$
同じ分布なら同じ因子を累乗できる。

## 計算例
1変数のアフィン変換では
$$
\begin{aligned}
M_Y(t)
&=E[e^{t(2X+3)}]\\
&=e^{3t}E[e^{(2t)X}]\\
&=e^{3t}M_X(2t)\\
&=\frac{e^{3t}}{1-2t},\qquad t<\frac12.
\end{aligned}
$$

次に $X_1,X_2,X_3$ が独立同分布で
$$M_{X_i}(t)=(1-t)^{-1},\qquad t<1$$
なら
$$
\begin{aligned}
M_{X_1+X_2+X_3}(t)
&=\prod_{i=1}^3M_{X_i}(t)\\
&=(1-t)^{-3}.
\end{aligned}
$$
これはshape $3$、rate $1$ のガンマ分布のモーメント母関数である。

さらに独立な $X_1,X_2$ に対して $Z=2X_1-X_2+4$ なら
$$
M_Z(t)=e^{4t}M_{X_1}(2t)M_{X_2}(-t).
$$

## 一手
定数項は前へ $e^{bt}$ として出し、係数 $a_i$ は各モーメント母関数の引数へ入れ、独立な和は積へ変える。

## 注意
同分布だけでは積に分解できず独立性が必要である。各 $M_{X_i}(a_it)$ が有限となる範囲の共通部分が、変換後の存在範囲になる。

<!-- CARD -->
---
id: prob-mgf-iid-sum
title: 独立同分布和のモーメント母関数を累乗で表す
category: math-probability
subcategory: math-distribution-functions
topic: mgf-iid-sum
type: formula
difficulty: 2
priority: S
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
これはshape $3$、rate $1$ のガンマ分布のモーメント母関数である。

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
priority: S
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
title: ガンマ分布のモーメント母関数をガンマ積分で求める
category: math-probability
subcategory: math-distribution-functions
topic: mgf-gamma
type: expansion
difficulty: 3
priority: S
hashtags: [モーメント母関数（積率母関数）, ガンマ分布, ガンマ積分]
frequency: { past_exam: 0, textbook: 0, independent_problems: 0, source_confirmations: 0 }
sources: [{ type: official_syllabus, topic: モーメント母関数 }]
---
## 問題
$X$ はshape $\alpha>0$、rate $\beta>0$ のガンマ分布に従う。台は $x>0$、確率密度関数は $f_X(x)=\beta^\alpha x^{\alpha-1}e^{-\beta x}/\Gamma(\alpha)$ である。$M_X(t)$ を求めよ。

## 答え
$$
M_X(t)=\left(\frac{\beta}{\beta-t}\right)^\alpha,
\qquad t<\beta.
$$

## 使用公式・定理
shape $\alpha>0$、rate $\beta>0$ のガンマ分布の確率密度関数は
$$
f_X(x)=\frac{\beta^\alpha}{\Gamma(\alpha)}x^{\alpha-1}e^{-\beta x},\qquad x>0.
$$
モーメント母関数は
$$
M_X(t)=\int_0^\infty e^{tx}f_X(x)\,dx
$$
から求める。ガンマ積分
$$
\int_0^\infty x^{\alpha-1}e^{-cx}\,dx
=\frac{\Gamma(\alpha)}{c^\alpha},\qquad c>0
$$
を使う。

## 計算例
定義へ確率密度関数を代入すると
$$
\begin{aligned}
M_X(t)
&=\frac{\beta^\alpha}{\Gamma(\alpha)}
  \int_0^\infty x^{\alpha-1}e^{-(\beta-t)x}\,dx\\
&=\frac{\beta^\alpha}{\Gamma(\alpha)}
  \frac{\Gamma(\alpha)}{(\beta-t)^\alpha}\\
&=\left(\frac{\beta}{\beta-t}\right)^\alpha.
\end{aligned}
$$
ただし積分が収束するには
$$\beta-t>0,$$
すなわち $t<\beta$ が必要である。

指数分布は $\alpha=1$, $\beta=\lambda$ の特殊形なので
$$
M_X(t)=\frac{\lambda}{\lambda-t},\qquad t<\lambda.
$$
したがって指数分布のモーメント母関数を別公式として暗記する必要はない。

## 一手
$e^{tx}$ を掛けた後、指数部を $e^{-(\beta-t)x}$ にまとめる。残った積分をガンマ積分と比較し、同時に収束条件 $\beta-t>0$ を読む。

## 注意
値だけでなく存在範囲を書く。本教材はshape-rate表示であり、尺度表示では式のパラメータ位置が変わる。

<!-- CARD -->
---
id: prob-mgf-identify-normal
title: モーメント母関数の形から正規分布を同定する
category: math-probability
subcategory: math-distribution-functions
topic: mgf-identification-normal
type: recognition
difficulty: 2
priority: S
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
priority: S
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
priority: S
hashtags: [モーメント母関数（積率母関数）, 一意性, 存在範囲]
frequency: { past_exam: 0, textbook: 0, independent_problems: 0, source_confirmations: 0 }
sources: [{ type: official_syllabus, topic: モーメント母関数 }]
---
## 問題
2つの確率変数 $X,Y$ について、$M_X(t)=M_Y(t)$ が $-0.1<t<0.1$ で成り立つ。何が結論できるか。また $t=0$ の1点だけで一致する場合はどうか。

## 答え
原点を含む開区間で有限なモーメント母関数が一致すれば分布は一致する。$t=0$ の1点だけでは何も同定できない。

## 使用公式・定理
モーメント母関数が原点を含む開区間で有限なら、その区間でのモーメント母関数は分布を一意に定める。したがって
$$
M_X(t)=M_Y(t)
$$
が原点近傍で成り立てば $X,Y$ は同じ分布に従う。

正規分布 $N(\mu,\sigma^2)$ のモーメント母関数は
$$
M(t)=\exp\left(\mu t+\frac{\sigma^2t^2}{2}\right),
$$
しかも全ての実数 $t$ で有限であるため、この形との一致から分布を同定できる。

## 計算例
例えば
$$M_X(t)=\exp(3t+2t^2)$$
とする。正規分布の形
$$
\exp\left(\mu t+\frac{\sigma^2t^2}{2}\right)
$$
と係数を比較すると
$$
\mu=3,\qquad \frac{\sigma^2}{2}=2,
$$
よって
$$
\sigma^2=4,
\qquad X\sim N(3,4).
$$
これは単なる形の暗記ではなく、原点近傍で有限なモーメント母関数の一意性を使った同定である。

一方、任意の確率変数で
$$M_X(0)=E[e^{0X}]=1$$
なので、$M_X(0)=M_Y(0)$ だけは常に成り立ち、分布同定の情報を持たない。

## 一手
モーメント母関数から分布名を読む前に「原点近傍で有限か」を確認し、その後に既知の母関数の形と係数比較する。

## 注意
正規分布 $N(\mu,\sigma^2)$ の第2引数は標準偏差ではなく分散である。モーメント母関数の存在範囲を書かずに一意性を使わない。
