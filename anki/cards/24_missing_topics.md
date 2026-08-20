---
id: dist-bivariate-normal-definition
title: 二変量正規分布の定義とパラメータ
category: math-distributions
subcategory: math-continuous-distributions
topic: bivariate-normal-definition
type: recognition
difficulty: 2
priority: S
hashtags: [二変量正規分布, 同時密度, 相関係数]
frequency: { past_exam: 0, textbook: 0, independent_problems: 0, source_confirmations: 0 }
sources: [{ type: official_syllabus, topic: 多変量正規分布 }]
---
## 問題
$(X,Y)$ を平均 $\boldsymbol\mu=(\mu_1,\mu_2)$、分散 $\sigma_1^2,\sigma_2^2$、相関係数 $\rho$ の二変量正規分布に従うとする。密度関数とパラメータ条件を書け。

## 答え
$\sigma_1,\sigma_2>0,\ -1<\rho<1$ のとき
$$f_{X,Y}(x,y)=\frac{1}{2\pi\sigma_1\sigma_2\sqrt{1-\rho^2}}\exp\left\{-\frac{1}{2(1-\rho^2)}\left(\frac{(x-\mu_1)^2}{\sigma_1^2}-2\rho\frac{(x-\mu_1)(y-\mu_2)}{\sigma_1\sigma_2}+\frac{(y-\mu_2)^2}{\sigma_2^2}\right)\right\}.$$

## 使用公式・定理
5個のパラメータ $(\mu_1,\mu_2,\sigma_1^2,\sigma_2^2,\rho)$ で指定される。共分散行列は
$$\boldsymbol\Sigma=
\begin{pmatrix}\sigma_1^2&\rho\sigma_1\sigma_2\\
\rho\sigma_1\sigma_2&\sigma_2^2\end{pmatrix},$$
$$|\boldsymbol\Sigma|=\sigma_1^2\sigma_2^2(1-\rho^2),$$
$$\boldsymbol\Sigma^{-1}=\frac1{1-\rho^2}
\begin{pmatrix}
1/\sigma_1^2&-\rho/(\sigma_1\sigma_2)\\
-\rho/(\sigma_1\sigma_2)&1/\sigma_2^2
\end{pmatrix}.$$ 
多変量正規密度
$$f(\boldsymbol x)=\frac{
\exp\{-\tfrac12(\boldsymbol x-\boldsymbol\mu)^{\mathsf T}
\boldsymbol\Sigma^{-1}(\boldsymbol x-\boldsymbol\mu)\}}
{2\pi|\boldsymbol\Sigma|^{1/2}}$$
へ代入すると答えの式になる。

## 計算例
$\mu_1=\mu_2=0,\sigma_1=\sigma_2=1,\rho=0$ なら標準二変量正規になり、密度は $f=\frac1{2\pi}\exp\{-\frac{x^2+y^2}{2}\}$。

## 一手
相関係数 $\rho$ は共分散行列の非対角項を $\sigma_1\sigma_2$ で正規化したもの。$\rho=0$ と独立が一致するのはこの場合だけ。

## 注意
正定値性のため $\lvert\rho\rvert<1$ が要る。$\lvert\rho\rvert=1$ では退化（超平面上に分布）する。

<!-- CARD -->
---
id: dist-bivariate-normal-marginal
title: 二変量正規分布の周辺分布
category: math-distributions
subcategory: math-continuous-distributions
topic: bivariate-normal-marginal
type: theorem
difficulty: 2
priority: S
hashtags: [二変量正規分布, 周辺分布]
frequency: { past_exam: 0, textbook: 0, independent_problems: 0, source_confirmations: 0 }
sources: [{ type: official_syllabus, topic: 多変量正規分布 }]
---
## 問題
二変量正規分布 $N_2(\boldsymbol\mu,\boldsymbol\Sigma)$ の周辺分布 $X_1$ と $X_2$ を求めよ。

## 答え
$$X_1\sim N(\mu_1,\sigma_1^2),\qquad X_2\sim N(\mu_2,\sigma_2^2).$$
周辺分布はそれぞれ1変量の正規分布であり、$\rho$ に依存しない。

## 使用公式・定理
独立な $Z_1,Z_2\sim N(0,1)$ を使うと、二変量正規分布は
$$X_1=\mu_1+\sigma_1Z_1,$$
$$X_2=\mu_2+\sigma_2\{\rho Z_1+\sqrt{1-\rho^2}Z_2\}$$
と表せる。正規分布の独立な線形結合は正規分布であり、
$$\operatorname{Var}\{\rho Z_1+\sqrt{1-\rho^2}Z_2\}
=\rho^2+(1-\rho^2)=1.$$ 

## 計算例
上の表現から直ちに
$$X_1\sim N(\mu_1,\sigma_1^2),$$
$$X_2\sim N\left(\mu_2,\sigma_2^2
\{\rho^2+(1-\rho^2)\}\right)=N(\mu_2,\sigma_2^2).$$
したがって周辺分布には $\rho$ が現れない。

## 一手
周辺密度は密度を他方で積分して得る。結果の分散は $\sigma_1^2$ で、$\rho$ を含まない。

## 注意
周辺が正規だからといって独立とは限らない。独立性は $\rho=0$ と同値（二変量正規だけ）。

<!-- CARD -->
---
id: multi-exchangeability
title: 交換可能性と同分布
category: math-distributions
subcategory: math-continuous-distributions
topic: exchangeability
type: recognition
difficulty: 3
priority: A
hashtags: [交換可能性, 同分布, 独立同分布]
frequency: { past_exam: 0, textbook: 0, independent_problems: 0, source_confirmations: 0 }
sources: [{ type: official_syllabus, topic: 独立性 }]
---
## 問題
$(X_1,X_2)$ の分布が $(X_2,X_1)$ の分布と一致するとき、$(X_1,X_2)$ を交換可能（exchangeable）という。交換可能なら $X_1$ と $X_2$ は同分布であることを示せ。
## 答え
交換可能より同時分布が対称なので
$P(X_1\le a)=P(X_1\le a,\ X_2\in\mathbb R)=P(X_2\le a,\ X_1\in\mathbb R)=P(X_2\le a).$
よって周辺分布は等しく、$X_1,X_2$ は同分布。
## 使用公式・定理
交換可能性 = 同時分布が変数の置換に対して不変。独立同分布は交換可能だが、交換可能だからといって独立ではない。
## 計算例
$P(X_1=1,X_2=0)=P(X_1=0,X_2=1)=0.5$ の混合分布は交換可能だが、$X_1,X_2$ は独立でない。
## 一手
同時分布の対称性から一方の周辺確率を他方の周辺で書き直し、分布の等しさを示す。
## 注意
交換可能 $\Rightarrow$ 同分布は真。一方で同分布は交換可能を意味しない（同分布だが独立でない例は交換可能でないことがある）。交換可能だが独立でない例も存在する。
<!-- CARD -->
---
id: prob-conditional-expectation
title: 条件付き期待値を条件付き分布から求める
category: math-distributions
subcategory: math-continuous-distributions
topic: conditional-expectation
type: calc_step
difficulty: 3
priority: S
hashtags: [条件付き期待値, 条件付き分布]
frequency: { past_exam: 0, textbook: 0, independent_problems: 0, source_confirmations: 0 }
sources: [{ type: official_syllabus, topic: 条件付き分布 }]
---
## 問題
連続型の $(X,Y)$ で周辺密度 $f_X(x)$、条件付き密度 $f_{Y\mid X}(y\mid x)$ が与えられたとき、$E[Y\mid X=x]$ を定義せよ。

## 答え
$$E[Y\mid X=x]=\int_{-\infty}^{\infty}y\,f_{Y\mid X}(y\mid x)\,dy.$$
離散型では和で定義される。

## 使用公式・定理
条件付き期待値は、条件 $X=x$ の下での $Y$ の期待値を条件付き密度で計算する。$E[Y]=E[E[Y\mid X]]$（全期待値の公式）が成り立つ。

## 計算例
$f_{Y\mid X}(y\mid x)=\frac1x e^{-y/x}$（$x>0,\ y>0$）なら
$$E[Y\mid X=x]=\int_0^\infty y\frac1x e^{-y/x}dy.$$ 
$u=y/x$、すなわち $y=xu,\ dy=xdu$ と置くと
$$E[Y\mid X=x]=x\int_0^\infty ue^{-u}du
=x\Gamma(2)=x.$$ 

## 一手
「条件を固定してから期待値を取る」。条件付き密度に $y$ を掛けて全区間で積分する。

## 注意
$E[Y\mid X]$ は $X$ の関数であり、$E[Y]=\int E[Y\mid X=x]f_X(x)\,dx$ と求まり、全体の期待値と一致する。


<!-- CARD -->
---
id: prob-transform-difference
title: 独立な差の分布
category: math-distributions
subcategory: math-continuous-distributions
topic: difference-distribution
type: calc_step
difficulty: 3
priority: A
hashtags: [差の分布, 畳み込み, 独立]
frequency: { past_exam: 0, textbook: 0, independent_problems: 0, source_confirmations: 0 }
sources: [{ type: official_syllabus, topic: 変数変換 }]
---
## 問題
独立な $X,Y$ の差 $Z=X-Y$ の密度を $f_X,f_Y$ で表せ。

## 答え
$$f_Z(z)=\int_{-\infty}^{\infty}f_X(x)\,f_Y(x-z)\,dx.$$

## 使用公式・定理
$Z=X+(-Y)$ と見て畳み込みを適用する。$-Y$ の密度は $f_{-Y}(u)=f_Y(-u)$。

## 計算例
$X,Y\sim \operatorname{Exponential}(\lambda)$ 独立なら、$x>0$ と $x-z>0$ を同時に満たす範囲は $x>\max(0,z)$ である。よって
$$f_Z(z)=\int_{\max(0,z)}^\infty
\lambda e^{-\lambda x}\lambda e^{-\lambda(x-z)}dx$$
$$=\lambda^2e^{\lambda z}
\int_{\max(0,z)}^\infty e^{-2\lambda x}dx
=\frac{\lambda}{2}e^{\lambda z-2\lambda\max(0,z)}.$$ 
したがって
$$f_Z(z)=\begin{cases}
(\lambda/2)e^{\lambda z},&z<0,\\
(\lambda/2)e^{-\lambda z},&z\ge0
\end{cases}
=\frac{\lambda}{2}e^{-\lambda|z|}.$$ 

## 一手
$X$ を固定して $Y=x-z$ を代入し、$x$ で積分する。

## 注意
畳み込みの符号に注意。$X+Y$ は $f_X(x)f_Y(z-x)$ を積分する通常の畳み込み、$X-Y$ は $Y$ を $-Y$ と見た符号反転を使う。


<!-- CARD -->
---
id: prob-transform-product
title: 独立な積の分布
category: math-distributions
subcategory: math-continuous-distributions
topic: product-distribution
type: calc_step
difficulty: 3
priority: A
hashtags: [積の分布, Jacobian, 独立]
frequency: { past_exam: 0, textbook: 0, independent_problems: 0, source_confirmations: 0 }
sources: [{ type: official_syllabus, topic: 変数変換 }]
---
## 問題
独立な $X,Y>0$ の積 $Z=XY$ の密度を求めよ。

## 答え
補助変数を $W=X$ とすると同時変換の Jacobian から
$$f_Z(z)=\int_{0}^{\infty}\frac1w f_X(w)\,f_Y\!\left(\frac zw\right)dw.$$

## 使用公式・定理
$W=X$、$Z=XY$ と置くと逆変換は $x=w,\ y=z/w$。したがって
$$\left|\frac{\partial(x,y)}{\partial(w,z)}\right|
=\left|\begin{matrix}1&0\\-z/w^2&1/w\end{matrix}\right|
=\frac1w.$$ 
変数変換公式から
$$f_{W,Z}(w,z)=f_X(w)f_Y(z/w)\frac1w,$$
これを $w$ について積分して $f_Z$ を得る。

## 計算例
$X,Y\sim U(0,1)$ 独立なら $f_Z(z)=\int_{z}^{1}\frac{1}{w}\,dw=-\ln z$（$0<z<1$）。

## 一手
$W=X$、$Z=XY$ と置くと $Y=Z/W$。$Y$ を $Z/W$ へ代入し、Jacobian の絶対値 $1/w$ を掛けて $w$ で積分する。

## 注意
積は対数変換で和になるので、独立な対数正規分布の積が再び対数正規分布になることを導くのに使える。一方、独立なガンマ分布の積は一般にはガンマ分布にならない。


<!-- CARD -->
---
id: prob-transform-box-muller
title: Box–Muller変換の考え方
category: math-distributions
subcategory: math-continuous-distributions
topic: box-muller
type: recognition
difficulty: 2
priority: A
hashtags: [Box--Muller, 極座標変換, 標準正規分布]
frequency: { past_exam: 0, textbook: 0, independent_problems: 0, source_confirmations: 0 }
sources: [{ type: official_syllabus, topic: 変数変換 }]
---
## 問題
一様分布 $U_1,U_2$ を独立な $U(0,1)$ とする。極座標変換で標準正規分布に従う対 $(Z_1,Z_2)$ を作る Box–Muller 変換を書き、その考え方を説明せよ。

## 答え
$$Z_1=\sqrt{-2\ln U_1}\cos(2\pi U_2),\qquad Z_2=\sqrt{-2\ln U_1}\sin(2\pi U_2).$$
$(Z_1,Z_2)$ は独立な標準正規分布に従う。

## 使用公式・定理
$R^2=Z_1^2+Z_2^2$ は $\chi^2_2=\operatorname{Exp}(1/2)$、角度は独立な一様分布。極座標変換の Jacobian で密度が直積 $e^{-(z_1^2+z_2^2)/2}/(2\pi)$ になる。

## 計算例
$U_1=0.1,U_2=0.25$ なら $R=\sqrt{-2\ln0.1}\approx2.146$、$Z_1=2.146\cos(\pi/2)=0$、$Z_2=2.146\sin(\pi/2)\approx2.146$。

## 一手
半径と角度に分ける。半径の2乗は指数分布、角度は一様分布。

## 注意
標準正規の性質（$Z_1,Z_2$ 独立・半径は指数）が核。乱数生成の基礎。


<!-- CARD -->
﻿
---
id: dist-poisson-reproductivity
title: 独立なポアソン分布の再生性
category: math-distributions
subcategory: math-discrete-distributions
topic: poisson-reproductivity
type: theorem
difficulty: 2
priority: S
hashtags: [ポアソン分布, 再生性, 独立和]
frequency: { past_exam: 0, textbook: 0, independent_problems: 0, source_confirmations: 0 }
sources: [{ type: official_syllabus, topic: ポアソン分布 }]
---
## 問題
独立な $X\sim\operatorname{Poisson}(\lambda_1)$ と $Y\sim\operatorname{Poisson}(\lambda_2)$ の和 $X+Y$ の分布を答えよ。
## 答え
$$X+Y\sim\operatorname{Poisson}(\lambda_1+\lambda_2).$$
## 使用公式・定理
独立和の確率母関数 $G_{X+Y}(s)=G_X(s)G_Y(s)$ を使う。ポアソンの母関数は $\exp\{\lambda(s-1)\}$ なので
$$G_{X+Y}(s)=e^{\lambda_1(s-1)}e^{\lambda_2(s-1)}=e^{(\lambda_1+\lambda_2)(s-1)}.$$
## 計算例
独立な $X\sim\operatorname{Poisson}(2)$、$Y\sim\operatorname{Poisson}(3)$ なら $X+Y\sim\operatorname{Poisson}(5)$。
## 一手
母関数の指数部を足す。$\lambda$ は加算される。
## 注意
再生性は独立な場合のみ。ポアソン過程の到着数を時間区間で足す連結にも使う。
<!-- CARD -->
---
id: dist-gamma-beta-relation
title: ガンマ分布とベータ分布の関係
category: math-distributions
subcategory: math-continuous-distributions
topic: gamma-beta-relation
type: theorem
difficulty: 3
priority: A
hashtags: [ガンマ分布, ベータ分布, 変換]
frequency: { past_exam: 0, textbook: 0, independent_problems: 0, source_confirmations: 0 }
sources: [{ type: official_syllabus, topic: ガンマ分布 }, { type: official_syllabus, topic: ベータ分布 }]
---
## 問題
独立な $X_1\sim\operatorname{Gamma}(\alpha,\lambda)$、$X_2\sim\operatorname{Gamma}(\beta,\lambda)$ とする。比 $\dfrac{X_1}{X_1+X_2}$ はどの分布に従うか。
## 答え
$$\frac{X_1}{X_1+X_2}\sim\operatorname{Beta}(\alpha,\beta).$$
また $X_1+X_2\sim\operatorname{Gamma}(\alpha+\beta,\lambda)$。
## 使用公式・定理
同じ率の独立ガンマに対して
$$U=\frac{X_1}{X_1+X_2},\qquad V=X_1+X_2$$
と置く。逆変換は $x_1=uv,\ x_2=(1-u)v$ で、
$$\left|\frac{\partial(x_1,x_2)}{\partial(u,v)}\right|
=\left|\begin{matrix}v&u\\-v&1-u\end{matrix}\right|=v.$$ 
## 計算例
独立性と変数変換公式から、$0<u<1,\ v>0$ で
$$f_{U,V}(u,v)
=\frac{\lambda^{\alpha+\beta}}{\Gamma(\alpha)\Gamma(\beta)}
u^{\alpha-1}(1-u)^{\beta-1}v^{\alpha+\beta-1}e^{-\lambda v}.$$ 
これを
$$\frac{u^{\alpha-1}(1-u)^{\beta-1}}{B(\alpha,\beta)}
\frac{\lambda^{\alpha+\beta}}{\Gamma(\alpha+\beta)}
v^{\alpha+\beta-1}e^{-\lambda v}$$
と因数分解できるので、$U\sim\operatorname{Beta}(\alpha,\beta)$、$V\sim\operatorname{Gamma}(\alpha+\beta,\lambda)$ で、さらに $U,V$ は独立である。$\alpha=\beta=1$ なら $U\sim U(0,1)$。
## 一手
分母を和にして Beta へ帰着。rate が共通であることが条件。
## 注意
rate が異なると Beta にならない。
<!-- CARD -->
---
id: process-poisson-orderstat
title: ポアソン過程の条件付き到着時刻と順序統計量
category: math-distributions
subcategory: math-continuous-distributions
topic: poisson-conditional-orderstat
type: theorem
difficulty: 3
priority: S
hashtags: [ポアソン過程, 順序統計量, 条件付き分布]
frequency: { past_exam: 0, textbook: 0, independent_problems: 0, source_confirmations: 0 }
sources: [{ type: official_syllabus, topic: ポアソン過程 }]
---
## 問題
率 $\lambda$ のポアソン過程で区間 $(0,1]$ の到着件数を $\mathcal N$ とし、$\mathcal N=n$ とする。この条件の下で、到着時刻の組の分布は何に従うか。
## 答え
$\mathcal N=n$ の下で、到着時刻は $(0,1]$ 上の独立な一様分布標本の順序統計量と同じ分布を持つ。
## 使用公式・定理
到着時刻を昇順 $S_{(1)}<\cdots<S_{(n)}$ とすると、$\mathcal N=n$ という条件の下での同時密度は
$$f(s_1,\ldots,s_n\mid\mathcal N=n)
=n!\boldsymbol1_{\{0<s_1<\cdots<s_n<1\}}.$$ 
これは独立な $U(0,1)$ 標本の順序統計量の同時密度である。
## 計算例
$(0,1]$ に2件到着したとき、$0<s<1$ に対して
$$P(S_{(1)}>s\mid\mathcal N=2)=P(U_1>s,U_2>s)=(1-s)^2.$$ 
したがって
$$F_{S_{(1)}}(s)=1-(1-s)^2,\qquad
f_{S_{(1)}}(s)=2(1-s),$$
すなわち $S_{(1)}\sim\operatorname{Beta}(1,2)$。
## 一手
到着件数 $\mathcal N$ を条件付けると「$n$ 個の独立一様標本の順序統計量」へ帰着させる。
## 注意
条件付けで到着数の情報は落ち、時刻の相対順序が残る。これはポアソン過程の核心的性質である。
<!-- CARD -->
---
id: dist-limit-map
title: 極限定理でつながる代表分布マップ
category: math-distributions
subcategory: math-continuous-distributions
topic: limit-distribution-map
type: recognition
difficulty: 3
priority: A
hashtags: [分布マップ, 中心極限定理, ポアソン近似]
frequency: { past_exam: 0, textbook: 0, independent_problems: 0, source_confirmations: 0 }
sources: [{ type: official_syllabus, topic: 極限近似 }]
---
## 問題
分布同士をつなぐ代表的な極限関係を、二項・ポアソン・正規・標本平均を中心に列挙せよ。
## 答え
- $n\to\infty$, $p\to0$, $np\to\lambda\in(0,\infty)$ なら $\operatorname{Binomial}(n,p)$ は $\operatorname{Poisson}(\lambda)$ に収束する。実用上は $p$ が小さく $np$ が中程度のときにポアソン近似を使う。
- 二項分布は $np$ と $n(1-p)$ がともに十分大きいとき、ポアソン分布は平均 $\lambda$ が十分大きいとき、それぞれ正規分布で近似できる。
- 平均 $\mu$、分散 $0<\sigma^2<\infty$ の独立同分布標本では、標準化した標本平均 $\sqrt n(\overline X_n-\mu)/\sigma$ が $N(0,1)$ に分布収束する。標準化しない $\overline X_n$ 自体は大数則により $\mu$ へ確率収束する。
## 使用公式・定理
中心極限定理：平均 $\mu$、分散 $0<\sigma^2<\infty$ の独立同分布標本について
$$\frac{\sqrt n(\overline X_n-\mu)}{\sigma}\xrightarrow{d}N(0,1).$$
## 計算例
$n=50,p=0.02$ なら $np=1$ で $\operatorname{Binomial}(50,0.02)\approx\operatorname{Poisson}(1)$。$n=100,p=0.3$ は平均 $30$、分散 $21$ の正規近似。
## 一手
「レアな成功数→ポアソン」「多数の和→正規」を軸に、二項・ポアソン・正規・標本平均の関係を整理する。
## 注意
本カードは近似の全体マップであり、条件ごとの個別判定は異なるカード（近似選択・二項ポアソン条件）を参照する。各近似にはパラメータ条件（$np$ 有限、$np(1-p)$ 十分大）が必要で、その有効域を押さえるのが要点。
<!-- CARD -->
