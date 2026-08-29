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

---
id: prob-transform-affine-decreasing
title: 負の係数を持つ一次変換の密度を求める
category: math-probability
subcategory: math-transformations
topic: affine-decreasing-transform
type: calc_step
difficulty: 2
priority: S
hashtags: [変数変換, 単調減少, Jacobian]
frequency: { past_exam: 0, textbook: 0, independent_problems: 0, source_confirmations: 0 }
sources: [{ type: official_syllabus, topic: 変数変換 }]
---
## 問題
$X$ は一様分布 $U(0,2)$ に従い、$Y=3-2X$ とする。$Y$ の確率密度関数を求めよ。
## 答え
$$f_Y(y)=\frac14,\qquad -1<y<3.$$
## 使用公式・定理
$Y=a+bX$（$b\ne0$）なら
$$f_Y(y)=f_X\left(\frac{y-a}{b}\right)\frac1{|b|}.$$
## 計算例
逆変換は $x=(3-y)/2$、$|dx/dy|=1/2$。元密度は $1/2$ なので
$$f_Y(y)=\frac12\cdot\frac12=\frac14.$$
$0<(3-y)/2<2$ を解くと $-1<y<3$。
## 一手
係数が負なら台の不等号が反転する。Jacobianは絶対値を取る。
## 注意
$1/b$ をそのまま掛けて負の密度にしない。

<!-- CARD -->
---
id: prob-transform-reciprocal-uniform
title: 逆数変換でPareto型密度を導く
category: math-probability
subcategory: math-transformations
topic: reciprocal-transform
type: calc_step
difficulty: 3
priority: A
hashtags: [変数変換, 逆数, Pareto分布]
frequency: { past_exam: 0, textbook: 0, independent_problems: 0, source_confirmations: 0 }
sources: [{ type: official_syllabus, topic: 変数変換 }]
---
## 問題
$X$ は一様分布 $U(0,1)$ に従い、$Y=1/X$ とする。$Y$ の密度と $P(Y>4)$ を求めよ。
## 答え
$$f_Y(y)=\frac1{y^2},\qquad y>1,\qquad P(Y>4)=\frac14.$$
## 使用公式・定理
単調変換では $f_Y(y)=f_X(x(y))|dx/dy|$。
## 計算例
$x=1/y$、$|dx/dy|=1/y^2$。$0<x<1$ は $y>1$ と同値なので上の密度を得る。また
$$P(Y>4)=P(1/X>4)=P(X<1/4)=1/4.$$
## 一手
逆数変換では0に近い元の値が長い右裾を作る。
## 注意
期待値は $\int_1^\infty y\cdot y^{-2}dy=\infty$ で存在しない。

<!-- CARD -->
---
id: prob-transform-half-normal
title: 標準正規変数の絶対値から半正規密度を求める
category: math-probability
subcategory: math-transformations
topic: absolute-normal-transform
type: calc_step
difficulty: 2
priority: S
hashtags: [半正規分布, 絶対値変換, 多対一変換]
frequency: { past_exam: 0, textbook: 0, independent_problems: 0, source_confirmations: 0 }
sources: [{ type: official_syllabus, topic: 変数変換 }]
---
## 問題
$X$ は標準正規分布 $N(0,1)$ に従い、$Y=|X|$ とする。$Y$ の密度と平均を求めよ。
## 答え
$$f_Y(y)=2\phi(y)=\sqrt{\frac2\pi}e^{-y^2/2},\quad y>0,$$
$$E[Y]=\sqrt{\frac2\pi}.$$
## 使用公式・定理
$y>0$ には逆像 $x=y,-y$ があるため、両枝の密度を足す。
## 計算例
$$f_Y(y)=f_X(y)+f_X(-y)=2\phi(y).$$
さらに
$$E[Y]=2\int_0^\infty y\phi(y)dy
=\frac2{\sqrt{2\pi}}\left[-e^{-y^2/2}\right]_0^\infty
=\sqrt{\frac2\pi}.$$
## 一手
多対一変換では、同じ $y$ へ写るすべての逆像を列挙する。
## 注意
$Y$ の台は $y\ge0$ であり、負側の密度は0。

<!-- CARD -->
---
id: prob-transform-normal-square
title: 標準正規変数の2乗からカイ二乗密度を導く
category: math-probability
subcategory: math-transformations
topic: normal-square-transform
type: calc_step
difficulty: 3
priority: S
hashtags: [カイ二乗分布, 二乗変換, 標準正規分布]
frequency: { past_exam: 0, textbook: 0, independent_problems: 0, source_confirmations: 0 }
sources: [{ type: official_syllabus, topic: 変数変換 }]
---
## 問題
$X$ は正規分布 $N(0,1)$ に従い、$Y=X^2$ とする。$Y$ の密度を求めよ。
## 答え
$$f_Y(y)=\frac1{\sqrt{2\pi y}}e^{-y/2},\qquad y>0.$$
これは自由度1のカイ二乗分布 $\chi_1^2$ の密度である。
## 使用公式・定理
$y>0$ の逆像は $x=\pm\sqrt y$ で、各枝のJacobianは $|dx/dy|=1/(2\sqrt y)$。
## 計算例
$$f_Y(y)=\phi(\sqrt y)\frac1{2\sqrt y}
+\phi(-\sqrt y)\frac1{2\sqrt y}
=\frac{\phi(\sqrt y)}{\sqrt y}
=\frac{e^{-y/2}}{\sqrt{2\pi y}}.$$
## 一手
二乗変換では正負2枝を足し、Jacobian $1/(2\sqrt y)$ を各枝へ掛ける。
## 注意
$y=0$ で密度は発散するが、積分可能である。

<!-- CARD -->
---
id: prob-transform-uniform-product
title: 独立一様変数の積の密度を領域積分で求める
category: math-probability
subcategory: math-transformations
topic: uniform-product-density
type: calc_step
difficulty: 3
priority: S
hashtags: [積の分布, 一様分布, 変数変換]
frequency: { past_exam: 0, textbook: 0, independent_problems: 0, source_confirmations: 0 }
sources: [{ type: official_syllabus, topic: 変数変換 }]
---
## 問題
$X,Y$ は独立に一様分布 $U(0,1)$ に従う。$Z=XY$ の密度を求めよ。
## 答え
$$f_Z(z)=-\log z,\qquad 0<z<1.$$
## 使用公式・定理
$$F_Z(z)=P(XY\le z)=\int_0^1P(Y\le z/x\mid X=x)dx.$$
## 計算例
$0<z<1$ では $x\le z$ なら常に $XY\le z$、$x>z$ なら $Y\le z/x$。よって
$$F_Z(z)=\int_0^z1dx+\int_z^1\frac zxdx
=z-z\log z.$$
微分して $f_Z(z)=1-(\log z+1)=-\log z$。
## 一手
$z/x$ が1を超える範囲と超えない範囲を分ける。
## 注意
$\int_0^1-\log z\,dz=1$。

<!-- CARD -->
---
id: prob-transform-iid-maximum-density
title: 独立同分布標本の最大値の密度を累積分布関数から求める
category: math-probability
subcategory: math-transformations
topic: maximum-transform-density
type: calc_step
difficulty: 2
priority: S
hashtags: [最大値, 順序統計量, 累積分布関数]
frequency: { past_exam: 0, textbook: 0, independent_problems: 0, source_confirmations: 0 }
sources: [{ type: official_syllabus, topic: 変数変換 }]
---
## 問題
$X_1,\ldots,X_n$ は累積分布関数 $F$、密度 $f$ を持つ独立同分布標本である。$M=\max_iX_i$ の密度を求め、一様分布 $U(0,1)$、$n=3$ で具体化せよ。
## 答え
$$f_M(m)=nF(m)^{n-1}f(m).$$
$U(0,1)$、$n=3$ なら $f_M(m)=3m^2$（$0<m<1$）。
## 使用公式・定理
$$P(M\le m)=P(X_1\le m,\ldots,X_n\le m)=F(m)^n.$$
## 計算例
$F(m)=m$ を代入して $F_M(m)=m^3$。微分すると $f_M(m)=3m^2$。
## 一手
最大値の「以下」は全標本が以下という積事象に直す。
## 注意
独立性がなければ $F(m)^n$ にはならない。

<!-- CARD -->
---
id: prob-transform-iid-minimum-density
title: 独立同分布標本の最小値の密度を生存関数から求める
category: math-probability
subcategory: math-transformations
topic: minimum-transform-density
type: calc_step
difficulty: 2
priority: S
hashtags: [最小値, 順序統計量, 生存関数]
frequency: { past_exam: 0, textbook: 0, independent_problems: 0, source_confirmations: 0 }
sources: [{ type: official_syllabus, topic: 変数変換 }]
---
## 問題
$X_1,\ldots,X_n$ は累積分布関数 $F$、密度 $f$ を持つ独立同分布標本である。$L=\min_iX_i$ の密度を求め、率 $\lambda$ の指数分布で具体化せよ。
## 答え
$$f_L(\ell)=n\{1-F(\ell)\}^{n-1}f(\ell).$$
指数分布では $L\sim\operatorname{Exp}(n\lambda)$。
## 使用公式・定理
$$P(L>\ell)=P(X_1>\ell,\ldots,X_n>\ell)=\{1-F(\ell)\}^n.$$
## 計算例
指数分布の生存関数は $e^{-\lambda\ell}$ なので
$$P(L>\ell)=e^{-n\lambda\ell},\qquad
f_L(\ell)=n\lambda e^{-n\lambda\ell}.$$
## 一手
最小値は累積分布関数より生存関数で処理すると積へ直しやすい。
## 注意
最小値の指数率は $\lambda/n$ でなく $n\lambda$。

<!-- CARD -->
---
id: prob-transform-uniform-sum-triangular
title: 2つの一様分布の和を区分的に畳み込む
category: math-probability
subcategory: math-transformations
topic: uniform-sum-density
type: calc_step
difficulty: 3
priority: S
hashtags: [畳み込み, 一様分布, 三角分布]
frequency: { past_exam: 0, textbook: 0, independent_problems: 0, source_confirmations: 0 }
sources: [{ type: official_syllabus, topic: 確率変数の線形結合 }]
---
## 問題
$X,Y$ は独立に一様分布 $U(0,1)$ に従う。$S=X+Y$ の密度を求めよ。
## 答え
$$f_S(s)=\begin{cases}s&(0<s<1),\\2-s&(1\le s<2),\\0&\text{otherwise}.\end{cases}$$
## 使用公式・定理
$$f_S(s)=\int f_X(x)f_Y(s-x)dx.$$
## 計算例
$0<x<1$ と $0<s-x<1$ の共通範囲は
$$\max(0,s-1)<x<\min(1,s).$$
被積分関数は1なので密度は区間長。$0<s<1$ では長さ $s$、$1\le s<2$ では長さ $2-s$。
## 一手
畳み込みでは被積分関数より先に、台の共通部分の長さを求める。
## 注意
密度は $s=1$ を頂点として連続につながる。

<!-- CARD -->
---
id: prob-transform-uniform-difference-triangular
title: 2つの一様分布の差の密度を求める
category: math-probability
subcategory: math-transformations
topic: uniform-difference-density
type: calc_step
difficulty: 3
priority: A
hashtags: [差の分布, 一様分布, 畳み込み]
frequency: { past_exam: 0, textbook: 0, independent_problems: 0, source_confirmations: 0 }
sources: [{ type: official_syllabus, topic: 確率変数の線形結合 }]
---
## 問題
$X,Y$ は独立に一様分布 $U(0,1)$ に従う。$D=X-Y$ の密度を求めよ。
## 答え
$$f_D(d)=1-|d|,\qquad -1<d<1.$$
## 使用公式・定理
$D=X+(-Y)$ と見るか
$$f_D(d)=\int f_X(d+y)f_Y(y)dy$$
を使う。
## 計算例
条件 $0<y<1$ と $0<d+y<1$ の共通区間の長さを求める。$0\le d<1$ なら $0<y<1-d$ で長さ $1-d$。$-1<d<0$ なら $-d<y<1$ で長さ $1+d$。まとめて $1-|d|$。
## 一手
差の密度は、元の2つの台がずらした後に重なる長さで決まる。
## 注意
$X,Y$ が同分布なので $D$ の密度は0を中心に対称。

<!-- CARD -->
---
id: prob-transform-unequal-exponential-sum
title: 率の異なる指数分布の和を畳み込みで求める
category: math-probability
subcategory: math-transformations
topic: hypoexponential-sum
type: calc_step
difficulty: 3
priority: A
hashtags: [指数分布, 畳み込み, hypoexponential]
frequency: { past_exam: 0, textbook: 0, independent_problems: 0, source_confirmations: 0 }
sources: [{ type: official_syllabus, topic: 確率変数の線形結合 }]
---
## 問題
独立に $X\sim\operatorname{Exp}(\lambda)$、$Y\sim\operatorname{Exp}(\mu)$ とし、$\lambda\ne\mu$ とする。$S=X+Y$ の密度を求めよ。
## 答え
$$f_S(s)=\frac{\lambda\mu}{\mu-\lambda}
\left(e^{-\lambda s}-e^{-\mu s}\right),\qquad s>0.$$
## 使用公式・定理
独立和の畳み込みを $0<x<s$ で計算する。
## 計算例
$$\begin{aligned}
f_S(s)&=\int_0^s\lambda e^{-\lambda x}\mu e^{-\mu(s-x)}dx\\
&=\lambda\mu e^{-\mu s}\int_0^s e^{(\mu-\lambda)x}dx\\
&=\frac{\lambda\mu}{\mu-\lambda}(e^{-\lambda s}-e^{-\mu s}).
\end{aligned}$$
## 一手
指数部を $e^{-\mu s}e^{(\mu-\lambda)x}$ に整理してから積分する。
## 注意
$\mu\to\lambda$ の極限は $\lambda^2se^{-\lambda s}$ となりGamma$(2,\lambda)$ に一致する。

<!-- CARD -->
---
id: prob-transform-exponential-ratio
title: 独立指数変数の比の分布を求める
category: math-probability
subcategory: math-transformations
topic: exponential-ratio-density
type: calc_step
difficulty: 3
priority: A
hashtags: [比の分布, 指数分布, 変数変換]
frequency: { past_exam: 0, textbook: 0, independent_problems: 0, source_confirmations: 0 }
sources: [{ type: official_syllabus, topic: 変数変換 }]
---
## 問題
$X,Y$ は独立に率1の指数分布に従う。$R=X/Y$ の累積分布関数と密度を求めよ。
## 答え
$$F_R(r)=\frac r{1+r},\qquad
f_R(r)=\frac1{(1+r)^2},\qquad r>0.$$
## 使用公式・定理
$r>0$ では
$$P(X/Y\le r)=\int_0^\infty P(X\le ry\mid Y=y)f_Y(y)dy.$$
## 計算例
$$F_R(r)=\int_0^\infty(1-e^{-ry})e^{-y}dy
=1-\int_0^\infty e^{-(1+r)y}dy
=1-\frac1{1+r}.$$
微分して密度を得る。
## 一手
分母が正なので不等号の向きを変えず、分母で条件付ける。
## 注意
平均は $\int_0^\infty r/(1+r)^2dr=\infty$ で存在しない。

<!-- CARD -->

---
id: prob-transform-normal-polar
title: 独立標準正規分布を極座標変換して半径と角度を分離する
category: math-probability
subcategory: math-transformations
topic: normal-polar-transform
type: calc_step
difficulty: 4
priority: S
hashtags: [極座標変換, 標準正規分布, Jacobian]
frequency: { past_exam: 0, textbook: 0, independent_problems: 0, source_confirmations: 0 }
sources: [{ type: official_syllabus, topic: 変数変換 }]
---
## 問題
$X,Y$ は独立に標準正規分布 $N(0,1)$ に従う。$R=\sqrt{X^2+Y^2}$、$\Theta=\operatorname{atan2}(Y,X)$ の同時密度と周辺密度を求めよ。
## 答え
$$f_{R,\Theta}(r,\theta)=\frac1{2\pi}re^{-r^2/2},
\quad r>0,\ 0\le\theta<2\pi.$$
$$f_R(r)=re^{-r^2/2},\qquad f_\Theta(\theta)=\frac1{2\pi},$$
かつ $R$ と $\Theta$ は独立。
## 使用公式・定理
$x=r\cos\theta,y=r\sin\theta$ のJacobianは
$$\left|\frac{\partial(x,y)}{\partial(r,\theta)}\right|=r.$$
## 計算例
$$f_{X,Y}(x,y)=\frac1{2\pi}e^{-(x^2+y^2)/2}$$
へ $x^2+y^2=r^2$ とJacobian $r$ を代入する。$\theta$ を積分すると
$$f_R(r)=\int_0^{2\pi}\frac1{2\pi}re^{-r^2/2}d\theta=re^{-r^2/2}.$$
## 一手
極座標では面積要素が $dx\,dy=r\,dr\,d\theta$ に変わる。
## 注意
Jacobianの因子 $r$ を落とさない。

<!-- CARD -->
---
id: prob-transform-normal-square-sum
title: 独立標準正規変数の平方和をカイ二乗分布に結び付ける
category: math-probability
subcategory: math-transformations
topic: chi-square-sum-transform
type: calc_step
difficulty: 2
priority: S
hashtags: [カイ二乗分布, 平方和, 再生性]
frequency: { past_exam: 0, textbook: 0, independent_problems: 0, source_confirmations: 0 }
sources: [{ type: official_syllabus, topic: 変数変換 }]
---
## 問題
$Z_1,\ldots,Z_4$ は独立に標準正規分布に従う。$Q=\sum_{i=1}^4Z_i^2$ の分布、平均、分散を求めよ。
## 答え
$$Q\sim\chi_4^2,\qquad E[Q]=4,\qquad \operatorname{Var}(Q)=8.$$
## 使用公式・定理
$Z_i^2\sim\chi_1^2$ であり、独立なカイ二乗分布の自由度は加法的。
$$\chi_{\nu_1}^2+\chi_{\nu_2}^2\sim\chi_{\nu_1+\nu_2}^2.$$
## 計算例
自由度は $1+1+1+1=4$。カイ二乗分布の公式
$$E[\chi_\nu^2]=\nu,\qquad \operatorname{Var}(\chi_\nu^2)=2\nu$$
へ $\nu=4$ を代入する。
## 一手
平方和の項数が自由度になるのは、各標準正規変数が独立な場合。
## 注意
相関がある正規変数の平方和にはそのまま適用できない。

<!-- CARD -->
---
id: prob-transform-student-t
title: 正規変数とカイ二乗変数の比からt分布を作る
category: math-probability
subcategory: math-transformations
topic: student-t-ratio
type: calc_step
difficulty: 2
priority: S
hashtags: [Studentのt分布, カイ二乗分布, 比の分布]
frequency: { past_exam: 0, textbook: 0, independent_problems: 0, source_confirmations: 0 }
sources: [{ type: official_syllabus, topic: 変数変換 }]
---
## 問題
$Z$ は正規分布 $N(0,1)$、$V$ はカイ二乗分布 $\chi_{9}^2$ に従い、互いに独立である。$T=Z/\sqrt{V/9}$ の分布と $P(|T|\le2.262)$ を答えよ。
## 答え
$$T\sim t_9,\qquad P(|T|\le2.262)=0.95.$$
## 使用公式・定理
独立な $Z\sim N(0,1)$、$V\sim\chi_\nu^2$ に対し
$$\frac{Z}{\sqrt{V/\nu}}\sim t_\nu.$$
## 計算例
自由度は分母のカイ二乗自由度9。$t_{9;0.975}=2.262$ と対称性から
$$P(-2.262\le T\le2.262)=0.975-0.025=0.95.$$
## 一手
分母が $\sqrt{V}$ だけなら、自由度で割った形 $\sqrt{V/\nu}$ へ直す。
## 注意
$Z$ と $V$ の独立性が定義の一部。

<!-- CARD -->
---
id: prob-transform-f-ratio
title: 2つのカイ二乗変数の比からF分布を作る
category: math-probability
subcategory: math-transformations
topic: f-ratio-transform
type: calc_step
difficulty: 2
priority: S
hashtags: [F分布, カイ二乗分布, 分散比]
frequency: { past_exam: 0, textbook: 0, independent_problems: 0, source_confirmations: 0 }
sources: [{ type: official_syllabus, topic: 変数変換 }]
---
## 問題
$U\sim\chi_5^2$、$V\sim\chi_{10}^2$ が独立である。$W=(U/5)/(V/10)$ の分布を答え、$U=8,V=12$ の実現値を計算せよ。
## 答え
$$W\sim F_{5,10},\qquad w=\frac{8/5}{12/10}=\frac43\approx1.333.$$
## 使用公式・定理
独立な $U\sim\chi_m^2$、$V\sim\chi_n^2$ に対し
$$\frac{U/m}{V/n}\sim F_{m,n}.$$
## 計算例
$$\frac{8/5}{12/10}=\frac{1.6}{1.2}=1.333\ldots.$$
分子自由度5、分母自由度10の順で記す。
## 一手
各カイ二乗変数を自由度で割ってから比を取る。
## 注意
分子と分母を逆にすると $F_{10,5}$ になり、元の逆数である。

<!-- CARD -->
---
id: prob-transform-bivariate-normal-decorrelation
title: 相関正規変数を線形変換して独立な標準正規変数にする
category: math-probability
subcategory: math-transformations
topic: bivariate-normal-decorrelation
type: calc_step
difficulty: 4
priority: S
hashtags: [二変量正規分布, 無相関化, 線形変換]
frequency: { past_exam: 0, textbook: 0, independent_problems: 0, source_confirmations: 0 }
sources: [{ type: official_syllabus, topic: 変数変換 }]
---
## 問題
$(X,Y)$ は平均0、分散1、相関係数 $\rho$ の二変量正規分布に従う。$U=X$、$V=(Y-\rho X)/\sqrt{1-\rho^2}$ とする。$(U,V)$ の分布を求めよ。
## 答え
$U,V$ は独立に標準正規分布 $N(0,1)$ に従う。
## 使用公式・定理
多変量正規分布の線形変換は多変量正規分布。共同正規では共分散0と独立が同値。
## 計算例
$$E[V]=0,$$
$$\operatorname{Var}(V)=\frac{1+\rho^2-2\rho^2}{1-\rho^2}=1,$$
$$\operatorname{Cov}(U,V)
=\frac{\operatorname{Cov}(X,Y)-\rho\operatorname{Var}(X)}
{\sqrt{1-\rho^2}}=0.$$
よって共同正規かつ無相関なので独立。
## 一手
$Y$ から $X$ で説明される成分 $\rho X$ を引き、残差分散で標準化する。
## 注意
共同正規でない場合、無相関だけから独立とはいえない。

<!-- CARD -->
---
id: prob-transform-uniform-min-max-joint
title: 一様標本2個の最小値と最大値の同時密度を求める
category: math-probability
subcategory: math-transformations
topic: min-max-joint-transform
type: calc_step
difficulty: 3
priority: A
hashtags: [順序統計量, 最小値, 最大値, 同時密度]
frequency: { past_exam: 0, textbook: 0, independent_problems: 0, source_confirmations: 0 }
sources: [{ type: official_syllabus, topic: 変数変換 }]
---
## 問題
$X_1,X_2$ は独立に一様分布 $U(0,1)$ に従う。$L=\min(X_1,X_2)$、$M=\max(X_1,X_2)$ の同時密度を求め、$P(M-L<1/2)$ を計算せよ。
## 答え
$$f_{L,M}(\ell,m)=2,\qquad0<\ell<m<1,$$
$$P(M-L<1/2)=\frac34.$$
## 使用公式・定理
$\ell<m$ には $(X_1,X_2)=(\ell,m),(m,\ell)$ の2通りが対応する。
## 計算例
$$P(M-L<1/2)=\int_0^1\int_\ell^{\min(1,\ell+1/2)}2\,dm\,d\ell.$$
区間を分けて
$$\int_0^{1/2}1\,d\ell+\int_{1/2}^12(1-\ell)d\ell
=\frac12+\frac14=\frac34.$$
## 一手
順序を並べ替える変換では、元の並び順の個数 $2!$ を掛ける。
## 注意
対角線 $\ell=m$ は面積0なので密度計算に寄与しない。

<!-- CARD -->
---
id: prob-transform-probability-integral
title: 確率積分変換で累積分布関数を一様分布にする
category: math-probability
subcategory: math-transformations
topic: probability-integral-transform
type: theorem
difficulty: 2
priority: S
hashtags: [確率積分変換, 累積分布関数, 一様分布]
frequency: { past_exam: 0, textbook: 0, independent_problems: 0, source_confirmations: 0 }
sources: [{ type: official_syllabus, topic: 変数変換 }]
---
## 問題
$X$ の累積分布関数 $F$ が連続で狭義単調増加とする。$U=F(X)$ の分布を求め、$X\sim\operatorname{Exp}(2)$ で確認せよ。
## 答え
$$U=F(X)\sim U(0,1).$$
## 使用公式・定理
$0<u<1$ で単調性を使い
$$P(F(X)\le u)=P(X\le F^{-1}(u)).$$
## 計算例
一般に
$$P(U\le u)=F(F^{-1}(u))=u.$$
指数分布では $F(x)=1-e^{-2x}$ なので
$$P(1-e^{-2X}\le u)
=P\left(X\le-\frac12\log(1-u)\right)=u.$$
## 一手
累積分布関数を確率変数へ代入すると一様化し、逆累積分布関数で元の分布へ戻せる。
## 注意
離散分布では $F(X)$ は一般に連続一様分布にならない。

<!-- CARD -->
---
id: prob-transform-discrete-many-to-one
title: 離散確率変数の多対一変換で確率を足し上げる
category: math-probability
subcategory: math-transformations
topic: discrete-many-to-one-transform
type: calc_step
difficulty: 2
priority: A
hashtags: [離散分布, 多対一変換, 確率質量関数]
frequency: { past_exam: 0, textbook: 0, independent_problems: 0, source_confirmations: 0 }
sources: [{ type: official_syllabus, topic: 変数変換 }]
---
## 問題
$P(X=-2)=0.1,P(X=-1)=0.2,P(X=0)=0.3,P(X=1)=0.25,P(X=2)=0.15$ とする。$Y=X^2$ の確率質量関数を求めよ。
## 答え
$$P(Y=0)=0.30,\quad P(Y=1)=0.45,\quad P(Y=4)=0.25.$$
## 使用公式・定理
離散変換 $Y=g(X)$ では
$$P(Y=y)=\sum_{x:g(x)=y}P(X=x).$$
## 計算例
$$P(Y=1)=P(X=-1)+P(X=1)=0.20+0.25=0.45,$$
$$P(Y=4)=P(X=-2)+P(X=2)=0.10+0.15=0.25.$$
総和は $0.30+0.45+0.25=1$。
## 一手
変換後の各値について逆像をすべて列挙する。
## 注意
連続変換のJacobian公式を離散分布へ使わない。

<!-- CARD -->
---
id: prob-transform-standardization-density
title: 位置尺度変換で密度を標準化する
category: math-probability
subcategory: math-transformations
topic: location-scale-standardization
type: calc_step
difficulty: 2
priority: S
hashtags: [標準化, 位置尺度変換, 正規分布]
frequency: { past_exam: 0, textbook: 0, independent_problems: 0, source_confirmations: 0 }
sources: [{ type: official_syllabus, topic: 変数変換 }]
---
## 問題
$X$ は正規分布 $N(10,9)$ に従う。$Z=(X-10)/3$ の密度を変数変換で導け。
## 答え
$$f_Z(z)=\frac1{\sqrt{2\pi}}e^{-z^2/2},\qquad z\in\mathbb R.$$
したがって $Z\sim N(0,1)$。
## 使用公式・定理
$x=10+3z$、$|dx/dz|=3$ として $f_Z(z)=f_X(10+3z)3$。
## 計算例
$$f_X(x)=\frac1{3\sqrt{2\pi}}
\exp\left\{-\frac{(x-10)^2}{18}\right\}.$$
代入すると
$$f_Z(z)=\frac1{3\sqrt{2\pi}}e^{-9z^2/18}\cdot3
=\frac1{\sqrt{2\pi}}e^{-z^2/2}.$$
## 一手
密度前の尺度係数 $1/\sigma$ とJacobian $\sigma$ が相殺する。
## 注意
$N(10,9)$ の第2母数9は分散であり、標準偏差は3。

<!-- CARD -->
---
id: prob-transform-normal-ratio-cauchy
title: 独立標準正規変数の比からコーシー密度を導く
category: math-probability
subcategory: math-transformations
topic: normal-ratio-cauchy
type: calc_step
difficulty: 4
priority: S
hashtags: [コーシー分布, 比の分布, Jacobian]
frequency: { past_exam: 0, textbook: 0, independent_problems: 0, source_confirmations: 0 }
sources: [{ type: official_syllabus, topic: 変数変換 }]
---
## 問題
$X,Y$ は独立に標準正規分布 $N(0,1)$ に従う。$Z=X/Y$ の密度を求めよ。
## 答え
$$f_Z(z)=\frac1{\pi(1+z^2)},\qquad z\in\mathbb R.$$
これは標準コーシー分布である。
## 使用公式・定理
$Z=X/Y,W=Y$ とおくと逆変換は $x=zw,y=w$、Jacobianは $|w|$。
## 計算例
$$\begin{aligned}
f_Z(z)&=\int_{-\infty}^{\infty}
\frac1{2\pi}e^{-(z^2w^2+w^2)/2}|w|dw\\
&=\frac1\pi\int_0^\infty
w e^{-(1+z^2)w^2/2}dw\\
&=\frac1{\pi(1+z^2)}.
\end{aligned}$$
最後は $u=(1+z^2)w^2/2$ と置換した。
## 一手
比では $(Z,W)=(X/Y,Y)$ とし、分母を補助変数として残す。
## 注意
コーシー分布の平均と分散は存在しない。

<!-- CARD -->
---
id: prob-transform-logit-uniform
title: 一様変数のロジット変換からロジスティック密度を導く
category: math-probability
subcategory: math-transformations
topic: logit-uniform-logistic
type: calc_step
difficulty: 3
priority: A
hashtags: [ロジット変換, ロジスティック分布, 一様分布]
frequency: { past_exam: 0, textbook: 0, independent_problems: 0, source_confirmations: 0 }
sources: [{ type: official_syllabus, topic: 変数変換 }]
---
## 問題
$U$ は一様分布 $U(0,1)$ に従い、$X=\log\{U/(1-U)\}$ とする。$X$ の累積分布関数と密度を求めよ。
## 答え
$$F_X(x)=\frac{e^x}{1+e^x}=\frac1{1+e^{-x}},$$
$$f_X(x)=\frac{e^{-x}}{(1+e^{-x})^2},\qquad x\in\mathbb R.$$
## 使用公式・定理
ロジットの逆変換は
$$U=\frac{e^X}{1+e^X}.$$
## 計算例
変換は単調増加なので
$$P(X\le x)=P\left(U\le\frac{e^x}{1+e^x}\right)
=\frac{e^x}{1+e^x}.$$
微分すると
$$f_X(x)=\frac{e^x}{(1+e^x)^2}
=\frac{e^{-x}}{(1+e^{-x})^2}.$$
## 一手
ロジット不等式を $U$ について解き、一様分布の累積分布関数をそのまま使う。
## 注意
ロジスティック密度は0を中心に対称で、台は実数全体。

<!-- CARD -->
