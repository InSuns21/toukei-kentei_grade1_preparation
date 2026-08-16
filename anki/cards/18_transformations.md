---
id: prob-transform-inverse-cdf
title: 逆関数法で一様分布から任意分布を生成する
category: math-probability
subcategory: math-transformations
topic: inverse-cdf-method
type: strategy
difficulty: 2
priority: S
hashtags: [変数変換, 逆関数法, 一様分布]
frequency: { past_exam: 1, textbook: 0, independent_problems: 0, source_confirmations: 1 }
sources: [{ type: official_syllabus, topic: 変数変換 }, { type: past_exam, id: MATH-2023-Q2, topic: カイ二乗分布・逆関数法 }]
---
## 問題
$U$ を一様分布 $U(0,1)$ に従う確率変数とする。$X=-\log(1-U)$ の累積分布関数を求め、分布名を答えよ。

## 答え
$P(X\le x)$ を $U$ についての不等式に変形して計算する。

## 使用公式・定理
$F$ が連続で狭義単調増加な累積分布関数のとき、$U\sim U(0,1)$ に対し $X=F^{-1}(U)$ は $F$ に従う。これを逆関数法という。

## 計算例
$x>0$ に対し
$$\begin{aligned}F_X(x)&=P(-\log(1-U)\le x)\\&=P(\log(1-U)\ge -x)\\&=P(1-U\ge e^{-x})\\&=P(U\le 1-e^{-x})\\&=1-e^{-x}.\end{aligned}$$
$x\le0$ では $X>0$ より $F_X(x)=0$。したがって
$F_X(x)=\begin{cases}1-e^{-x}&(x>0),\\0&(x\le0).\end{cases}$
これは指数分布 $\operatorname{Exp}(1)$ の累積分布関数である。

## 一手
変換を不等式の中で逆に解き、$U$ の一様性（$P(U\le u)=u$）を使う。

## 注意
$1-U$ も $U(0,1)$ に従うので、$-\log U$ も同じ指数分布になる。

<!-- CARD -->
---
id: prob-transform-nonmonotonic
title: 非単調変換で台を分割して密度を求める
category: math-probability
subcategory: math-transformations
topic: nonmonotonic-transform
type: calc_step
difficulty: 3
priority: S
hashtags: [変数変換, 非単調, 二乗変換]
frequency: { past_exam: 0, textbook: 0, independent_problems: 0, source_confirmations: 0 }
sources: [{ type: official_syllabus, topic: 変数変換 }]
---
## 問題
$X$ の確率密度関数を $f_X(x)=1/2$（$-1<x<1$）、それ以外で0とする。$Y=X^2$ の確率密度関数を求めよ。

## 答え
$Y=X^2$ は単調でないので、累積分布関数を直接計算してから微分する。

## 使用公式・定理
非単調変換では $F_Y(y)=P(g(X)\le y)$ を領域 $\{x:g(x)\le y\}$ 上の積分で求め、$f_Y(y)=F_Y'(y)$ とする。

## 計算例
$0<y<1$ に対し、$X^2\le y$ は $-\sqrt y\le X\le\sqrt y$ と同値。したがって
$$F_Y(y)=P(-\sqrt y\le X\le\sqrt y)=\int_{-\sqrt y}^{\sqrt y}\frac12\,dx=\sqrt y.$$
微分して
$$f_Y(y)=\frac{d}{dy}\sqrt y=\frac{1}{2\sqrt y},\qquad 0<y<1.$$
積分確認: $\int_0^1\frac{1}{2\sqrt y}dy=[\sqrt y]_0^1=1$。

## 一手
非単調では逆関数の公式を直接使わず、累積分布関数経由で処理する。

## 注意
$y\ge1$ では $F_Y(y)=1$、$y\le0$ では $F_Y(y)=0$。端点の跳びはない。

<!-- CARD -->
---
id: prob-transform-jacobian-2d
title: 2変数の同時変換でJacobian行列式を使う
category: math-probability
subcategory: math-transformations
topic: jacobian-2d
type: calc_step
difficulty: 3
priority: A
hashtags: [変数変換, 同時分布]
frequency: { past_exam: 0, textbook: 0, independent_problems: 0, source_confirmations: 0 }
sources: [{ type: official_syllabus, topic: 変数変換 }]
---
## 問題
独立な $X,Y$ はともに一様分布 $U(0,1)$ に従うとする。$U=X+Y$、$V=X-Y$ の同時確率密度関数を求めよ。

## 答え
逆変換を求め、Jacobian行列式の絶対値を掛ける。

## 使用公式・定理
$(U,V)=g(X,Y)$ が1対1の変換で逆変換が微分可能なら
$$f_{U,V}(u,v)=f_{X,Y}(x(u,v),y(u,v))\left|\det\frac{\partial(x,y)}{\partial(u,v)}\right|.$$

## 計算例
逆変換は $x=(u+v)/2$、$y=(u-v)/2$。Jacobian行列は
$$\frac{\partial(x,y)}{\partial(u,v)}=\begin{pmatrix}1/2&1/2\\1/2&-1/2\end{pmatrix},\qquad \det=-\frac12.$$
$|\det|=1/2$。独立性から $f_{X,Y}(x,y)=1$（$0<x,y<1$）なので
$$f_{U,V}(u,v)=\frac12,\qquad 0<\frac{u+v}{2}<1,\ 0<\frac{u-v}{2}<1.$$
台は $|v|<u<2-|v|$、$-1<v<1$ の菱形領域である。

## 一手
逆変換→Jacobian行列式→元密度へ代入→台の変換、の順で処理する。

## 注意
台の変換を忘れると密度の積分が1にならない。ここでは菱形の面積2に $1/2$ を掛けて1になる。

<!-- CARD -->
---
id: prob-transform-sum-density
title: 独立な和の密度を畳み込みで求める
category: math-probability
subcategory: math-transformations
topic: convolution-general
type: calc_step
difficulty: 3
priority: S
hashtags: [変数変換, 畳み込み, 独立和]
frequency: { past_exam: 0, textbook: 0, independent_problems: 0, source_confirmations: 0 }
sources: [{ type: official_syllabus, topic: 確率変数の線形結合 }]
---
## 問題
独立な $X,Y$ はともに指数分布 $\operatorname{Exp}(1)$ に従うとする。密度は $f(x)=e^{-x}$（$x>0$）。$Z=X+Y$ の確率密度関数を求めよ。

## 答え
畳み込み積分を立て、両方の密度が正になる積分区間を求める。

## 使用公式・定理
独立な連続確率変数の和の密度は畳み込み
$$f_Z(z)=\int_{-\infty}^{\infty}f_X(x)f_Y(z-x)\,dx.$$

## 計算例
$f_X(x)>0$ には $x>0$、$f_Y(z-x)>0$ には $z-x>0$ すなわち $x<z$ が必要。$z>0$ では
$$f_Z(z)=\int_0^z e^{-x}e^{-(z-x)}\,dx=\int_0^z e^{-z}\,dx=ze^{-z}.$$
これは $\operatorname{Gamma}(2,1)$ の密度である。

## 一手
被積分関数が正になる $x$ の範囲を先に特定してから積分する。

## 注意
独立同分布の指数分布の和はガンマ分布になる。$z\le0$ では $f_Z(z)=0$。

<!-- CARD -->
---
id: prob-transform-ratio
title: 独立な比の分布を累積分布関数から求める
category: math-probability
subcategory: math-transformations
topic: ratio-distribution
type: calc_step
difficulty: 3
priority: A
hashtags: [変数変換, 比の分布, 累積分布関数]
frequency: { past_exam: 0, textbook: 0, independent_problems: 0, source_confirmations: 0 }
sources: [{ type: official_syllabus, topic: 変数変換 }]
---
## 問題
独立な $X,Y$ はともに一様分布 $U(0,1)$ に従うとする。$Z=X/Y$ の累積分布関数を求めよ。

## 答え
$P(X/Y\le z)$ を領域 $\{(x,y):x\le zy\}$ 上の二重積分で計算する。

## 使用公式・定理
連続な $(X,Y)$ の関数 $Z=g(X,Y)$ の累積分布関数は
$$F_Z(z)=\iint_{g(x,y)\le z}f_{X,Y}(x,y)\,dx\,dy.$$

## 計算例
独立性から $f_{X,Y}(x,y)=1$（$0<x,y<1$）。$z>0$ として場合分けする。

$0<z\le1$ のとき、$x\le zy$ は単位正方形内で直線 $x=zy$ の下側。
$$F_Z(z)=\int_0^1\int_0^{zy}1\,dx\,dy=\int_0^1 zy\,dy=\frac{z}{2}.$$

$z>1$ のとき、$y<1/z$ では $x$ は $zy$ まで、$y\ge1/z$ では $x$ は1まで。
$$F_Z(z)=\int_0^{1/z}zy\,dy+\int_{1/z}^1 1\,dy=\frac{1}{2z}+1-\frac1z=1-\frac{1}{2z}.$$

## 一手
不等式の領域を図示し、台との交わり方で積分区間を場合分けする。

## 注意
$z\le0$ では $F_Z(z)=0$。微分すると $f_Z(z)=1/2$（$0<z\le1$）、$f_Z(z)=1/(2z^2)$（$z>1$）。

<!-- CARD -->
---
id: prob-linear-combination-normal
title: 独立正規分布の線形結合の分布を求める
category: math-probability
subcategory: math-transformations
topic: linear-combination-normal
type: calc_step
difficulty: 2
priority: S
hashtags: [確率変数の線形結合, 正規分布（ガウス分布）, 統計的独立]
frequency: { past_exam: 1, textbook: 0, independent_problems: 0, source_confirmations: 1 }
sources: [{ type: official_syllabus, topic: 確率変数の線形結合 }, { type: past_exam, id: MATH-2021-Q5, topic: 多変量正規分布の線形変換・独立性 }]
---
## 問題
独立に $X$ は正規分布 $N(1,4)$、$Y$ は正規分布 $N(2,9)$ に従うとする。$W=2X-3Y$ の分布を求めよ。

## 答え
独立正規分布の線形結合は正規分布に従い、平均と分散を計算すればよい。

## 使用公式・定理
独立に $X\sim N(\mu_X,\sigma_X^2)$、$Y\sim N(\mu_Y,\sigma_Y^2)$ なら
$$aX+bY\sim N(a\mu_X+b\mu_Y,\ a^2\sigma_X^2+b^2\sigma_Y^2).$$

## 計算例
平均は
$$E[W]=2\cdot1-3\cdot2=2-6=-4.$$
分散は独立性から
$$\operatorname{Var}(W)=2^2\cdot4+(-3)^2\cdot9=16+81=97.$$
したがって
$$W\sim N(-4,97).$$

## 一手
平均は線形に、分散は係数の二乗で重み付けして足す。

## 注意
$(X,Y)$ が同時正規分布なら、独立でなくても線形結合は正規分布に従い、分散に共分散項 $2ab\operatorname{Cov}(X,Y)$ を加える。周辺分布がそれぞれ正規分布であるだけでは、線形結合が正規分布になるとは限らない。

<!-- CARD -->
---
id: prob-linear-combination-moments
title: 線形結合の平均と分散を一般の分布で計算する
category: math-probability
subcategory: math-transformations
topic: linear-combination-moments
type: calc_step
difficulty: 2
priority: S
hashtags: [確率変数の線形結合, 期待値, 分散, 共分散]
frequency: { past_exam: 0, textbook: 0, independent_problems: 0, source_confirmations: 0 }
sources: [{ type: official_syllabus, topic: 確率変数の線形結合 }]
---
## 問題
$E[X]=1$、$E[Y]=2$、$\operatorname{Var}(X)=4$、$\operatorname{Var}(Y)=1$、$\operatorname{Cov}(X,Y)=0.5$ とする。$W=3X-2Y$ の平均と分散を求めよ。

## 答え
期待値の線形性と分散の双線形公式に代入する。

## 使用公式・定理
期待値と分散が存在する確率変数について
$$E[aX+bY]=aE[X]+bE[Y],$$
$$\operatorname{Var}(aX+bY)=a^2\operatorname{Var}(X)+b^2\operatorname{Var}(Y)+2ab\operatorname{Cov}(X,Y).$$

## 計算例
平均は
$$E[W]=3\cdot1-2\cdot2=3-4=-1.$$
分散は
$$\begin{aligned}\operatorname{Var}(W)&=3^2\cdot4+(-2)^2\cdot1+2\cdot3\cdot(-2)\cdot0.5\\&=36+4-6\\&=34.\end{aligned}$$

## 一手
共分散項の符号は $2ab$ の符号で決まる。ここでは $a=3,b=-2$ なので負。

## 注意
独立なら共分散項は0になるが、この問題では $\operatorname{Cov}(X,Y)=0.5\ne0$ なので落とせない。

<!-- CARD -->
---
id: prob-transform-log
title: 対数変換で対数正規分布の密度を導出する
category: math-probability
subcategory: math-transformations
topic: log-transform
type: calc_step
difficulty: 3
priority: S
hashtags: [変数変換, 対数正規分布, 単調変換]
frequency: { past_exam: 0, textbook: 0, independent_problems: 0, source_confirmations: 0 }
sources: [{ type: official_syllabus, topic: 変数変換 }]
---
## 問題
$X$ を標準正規分布 $N(0,1)$ に従う確率変数とし、$Y=e^X$ とする。$Y$ の確率密度関数を求めよ。

## 答え
単調増加変換なので逆変換とJacobianの公式を使う。

## 使用公式・定理
単調な変換 $Y=g(X)$ では
$$f_Y(y)=f_X(g^{-1}(y))\left|\frac{d}{dy}g^{-1}(y)\right|.$$

## 計算例
逆変換は $x=\log y$、導関数は $dx/dy=1/y$。標準正規密度 $\phi(x)=(2\pi)^{-1/2}e^{-x^2/2}$ を代入して
$$f_Y(y)=\frac{1}{\sqrt{2\pi}}e^{-(\log y)^2/2}\cdot\frac1y,\qquad y>0.$$
これは対数正規分布（$\log Y\sim N(0,1)$）の密度である。

## 一手
逆変換 $g^{-1}(y)$ を求め、元密度へ代入してから $|d g^{-1}/dy|$ を掛ける。

## 注意
変換後の台は $y>0$。$y\le0$ では $f_Y(y)=0$。

<!-- CARD -->
