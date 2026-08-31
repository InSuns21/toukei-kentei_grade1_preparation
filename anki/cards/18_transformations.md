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
title: 1変数変換を単調・多対1で使い分けて密度を求める
category: math-probability
subcategory: math-transformations
topic: one-dimensional-transform-canonical
type: strategy
difficulty: 3
priority: S
hashtags:
  - 変数変換
  - 非単調
  - 二乗変換
frequency:
  past_exam: 0
  textbook: 0
  independent_problems: 0
  source_confirmations: 0
sources:
  - type: official_syllabus
    topic: 変数変換
---
## 問題
1変数の変数変換について次を解け。

1. $X$ の確率密度関数が $f_X(x)=e^{-x}$（$x>0$）、それ以外で0である。$Y=2X$ の確率密度関数を求めよ。
2. $X$ が一様分布 $U(-1,1)$ に従い、$Y=X^2$ とする。$Y$ の確率密度関数を求めよ。

## 答え
1. $Y=2X$ では逆変換は
$$
x=\frac y2,
\qquad
\left|\frac{dx}{dy}\right|=\frac12.
$$
$X>0$ から $Y>0$ なので
$$
f_Y(y)=e^{-y/2}\frac12
=\boxed{\frac12e^{-y/2}},\qquad y>0.
$$

2. $0<y<1$ では逆像が $\pm\sqrt y$ の2本ある。累積分布関数を使うと
$$
\begin{aligned}
F_Y(y)
&=P(-\sqrt y\le X\le\sqrt y)\\
&=\int_{-\sqrt y}^{\sqrt y}\frac12\,dx\\
&=\sqrt y.
\end{aligned}
$$
よって
$$
f_Y(y)=F_Y'(y)
=\boxed{\frac1{2\sqrt y}},\qquad0<y<1.
$$

## 使用公式・定理
$Y=g(X)$ が1対1で単調で、逆変換 $x=g^{-1}(y)$ が微分可能なら
$$
f_Y(y)=f_X(g^{-1}(y))
\left|\frac{d}{dy}g^{-1}(y)\right|.
$$
**逆変換→変換後の台→Jacobianの絶対値**の順に処理する。

一方、$g$ が1対1でなく、ある $y$ に対する逆像が
$$
x_1(y),\ldots,x_m(y)
$$
で各枝が局所的に単調なら
$$
f_Y(y)=\sum_{j=1}^m
f_X(x_j(y))\left|\frac{dx_j}{dy}\right|.
$$
同じ $y$ を生む全ての枝を足す。

多対1変換では累積分布関数
$$
F_Y(y)=P\{g(X)\le y\}
$$
を領域確率として求めてから微分する方法も安全である。

## 計算例
単調変換の例では
$$
\int_0^\infty\frac12e^{-y/2}\,dy=1
$$
となり、Jacobianを掛けることで正規化が保たれる。

多対1変換で標準正規分布に従う $X$ と $Y=X^2$ を考えると、逆像は $\pm\sqrt y$ なので
$$
\begin{aligned}
f_Y(y)
&=\phi(\sqrt y)\frac1{2\sqrt y}
+\phi(-\sqrt y)\frac1{2\sqrt y}\\
&=\frac{e^{-y/2}}{\sqrt{2\pi y}},\qquad y>0.
\end{aligned}
$$
これは自由度1のカイ二乗分布の密度である。

## 一手／方針
**最初に「この $y$ を生む元の $x$ は何個あるか」を数える。** 1個なら逆変換とJacobian、複数なら各逆像枝の寄与を足す。多対1で迷ったら累積分布関数法へ戻る。

## 注意
変換後の台を書き忘れない。Jacobianは絶対値を取る。

二乗・絶対値のような多対1変換で1本の逆関数だけを使うと確率質量を落とす。単調変換の公式は多対1変換の各枝へ適用して足し合わせる特殊ケースだと捉える。

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
逆変換は
$$
x=\frac{u+v}{2},
\qquad
y=\frac{u-v}{2}.
$$
したがって
$$
\frac{\partial(x,y)}{\partial(u,v)}
=\begin{pmatrix}
1/2&1/2\\
1/2&-1/2
\end{pmatrix},
$$
$$
\left|\det\frac{\partial(x,y)}{\partial(u,v)}\right|
=\left|-\frac12\right|
=\frac12.
$$
次に元の support $0<x<1$, $0<y<1$ を変換する。
$$
0<\frac{u+v}{2}<1
\Longleftrightarrow
-u<v<2-u,
$$
$$
0<\frac{u-v}{2}<1
\Longleftrightarrow
u-2<v<u.
$$
この2条件の共通部分を整理すると
$$
-1<v<1,
\qquad
|v|<u<2-|v|.
$$
元の同時密度は正方形内で1だから、変数変換公式より
$$
f_{U,V}(u,v)
=1\cdot\frac12
=\frac12
$$
（$-1<v<1$, $|v|<u<2-|v|$）、それ以外では0である。

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
独立な $X,Y\sim\operatorname{Exp}(1)$ なら
$$f_{X+Y}(s)=se^{-s},\qquad s>0.$$

## 使用公式・定理
独立な連続確率変数 $X,Y$ の和 $S=X+Y$ の密度は
$$
f_S(s)=\int_{-\infty}^{\infty}f_X(x)f_Y(s-x)\,dx.
$$
差 $D=X-Y$ なら
$$
f_D(d)=\int_{-\infty}^{\infty}f_X(d+y)f_Y(y)\,dy.
$$
どちらも先に「両方の密度が正になる積分区間」を台から決める。

## 計算例
指数分布では $x>0$ と $s-x>0$ の共通条件が $0<x<s$ なので
$$
\begin{aligned}
f_S(s)
&=\int_0^s e^{-x}e^{-(s-x)}\,dx\\
&=e^{-s}\int_0^s1\,dx\\
&=se^{-s},\qquad s>0.
\end{aligned}
$$

$X,Y\sim U(0,1)$ なら、和では
$$\max(0,s-1)<x<\min(1,s)$$
が積分範囲で、被積分関数は1だから
$$
f_S(s)=\begin{cases}
s,&0<s<1,\\
2-s,&1\le s<2,\\
0,&\text{otherwise}.
\end{cases}
$$
差 $D=X-Y$ では台の重なりの長さから
$$f_D(d)=1-|d|,\qquad -1<d<1.$$

さらに $X\sim\operatorname{Exp}(\lambda)$、$Y\sim\operatorname{Exp}(\mu)$、$\lambda\ne\mu$ なら
$$
\begin{aligned}
f_S(s)
&=\int_0^s\lambda e^{-\lambda x}\mu e^{-\mu(s-x)}\,dx\\
&=\frac{\lambda\mu}{\mu-\lambda}
\left(e^{-\lambda s}-e^{-\mu s}\right),\qquad s>0.
\end{aligned}
$$

## 一手
畳み込みでは公式を書いた直後に積分しない。まず元の2つの台を同時に満たす積分区間を解く。

## 注意
独立性が必要である。台の共通部分を誤ると、積分計算が合っていても密度は誤る。

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
独立な $X,Y\sim U(0,1)$ なら
$$
F_R(r)=\begin{cases}
0,&r\le0,\\
r/2,&0<r\le1,\\
1-1/(2r),&r>1.
\end{cases}
$$

## 使用公式・定理
$Y>0$ のとき $R=X/Y$ について
$$
F_R(r)=P(X\le rY)
=\int P(X\le ry\mid Y=y)f_Y(y)\,dy.
$$
独立なら条件付き分布は周辺分布へ戻せるので
$$
F_R(r)=\int F_X(ry)f_Y(y)\,dy
$$
と書ける。台が有界なら、同じ確率を領域 $\{(x,y):x\le ry\}$ の二重積分で求めてもよい。

## 計算例
$0<r\le1$ では単位正方形内で $0<x<ry$ だから
$$F_R(r)=\int_0^1\int_0^{ry}1\,dx\,dy=\frac r2.$$
$r>1$ では $y=1/r$ で領域が変わるので
$$
\begin{aligned}
F_R(r)
&=\int_0^{1/r}ry\,dy+\int_{1/r}^11\,dy\\
&=1-\frac1{2r}.
\end{aligned}
$$

一方、独立な $X,Y\sim\operatorname{Exp}(1)$ では分母 $Y=y$ で条件付けて
$$
\begin{aligned}
F_R(r)
&=\int_0^\infty P(X\le ry)e^{-y}\,dy\\
&=\int_0^\infty(1-e^{-ry})e^{-y}\,dy\\
&=1-\frac1{1+r}\\
&=\frac r{1+r},\qquad r>0.
\end{aligned}
$$
微分して
$$f_R(r)=\frac1{(1+r)^2},\qquad r>0.$$

## 一手
分母が正なら、$X/Y\le r$ を $X\le rY$ に直す。次に分母で条件付けるか、台の中の領域として積分する。

## 注意
分母が負も取り得る場合は不等号の向きが変わるため、符号で場合分けが必要である。

<!-- CARD -->

---
id: prob-linear-combination-normal
title: 正規ベクトルのアフィン結合の分布を求める
category: math-probability
subcategory: math-transformations
topic: multivariate-normal-affine-combination
type: strategy
difficulty: 2
priority: S
hashtags:
  - 確率変数の線形結合
  - 多変量正規分布
  - アフィン変換
  - 分散共分散行列
frequency:
  past_exam: 1
  textbook: 0
  independent_problems: 0
  source_confirmations: 1
sources:
  - type: official_syllabus
    topic: 確率変数の線形結合
  - type: past_exam
    id: MATH-2021-Q5
    topic: 多変量正規分布の線形変換・独立性
---
## 問題
多変量正規分布に従う確率ベクトルを
$$
\boldsymbol X\sim N_p(\boldsymbol\mu,\boldsymbol\Sigma)
$$
とする。定数ベクトル $\boldsymbol a$ と定数 $b$ に対する
$$
Y=\boldsymbol a^{\mathsf T}\boldsymbol X+b
$$
の分布を求めよ。

また次を計算せよ。

1. $\boldsymbol\mu=(1,2)^{\mathsf T}$、$\boldsymbol\Sigma=\begin{pmatrix}4&1\\1&9\end{pmatrix}$、$Y=X_1-2X_2+5$。
2. 1変量で $X\sim N(2,9)$、$Y=-X+4$。
3. $\boldsymbol a=\boldsymbol0$ のときの分布。

## 答え
多変量正規分布はアフィン変換で閉じているので
$$
\boxed{
Y\sim N\left(
\boldsymbol a^{\mathsf T}\boldsymbol\mu+b,
\boldsymbol a^{\mathsf T}\boldsymbol\Sigma\boldsymbol a
\right)}.
$$

1. $\boldsymbol a=(1,-2)^{\mathsf T}$ だから
$$
E[Y]=1-2\cdot2+5=2,
\qquad
\operatorname{Var}(Y)=36,
$$
よって
$$
Y\sim N(2,36).
$$

2. 1変量の特殊形では
$$
Y=aX+b\sim N(a\mu+b,a^2\sigma^2).
$$
ここでは $a=-1,b=4$ なので
$$
Y\sim N(2,9).
$$

3. $\boldsymbol a=\boldsymbol0$ なら $Y=b$ が確率1で成り立つ退化分布である。

## 使用公式・定理
多変量正規分布に対する線形変換は再び正規分布になる。定数項は平均だけを平行移動するため
$$
E[\boldsymbol a^{\mathsf T}\boldsymbol X+b]
=\boldsymbol a^{\mathsf T}\boldsymbol\mu+b,
$$
$$
\operatorname{Var}(\boldsymbol a^{\mathsf T}\boldsymbol X+b)
=\boldsymbol a^{\mathsf T}\boldsymbol\Sigma\boldsymbol a.
$$

2変量なら
$$
\operatorname{Var}(aX_1+cX_2)
=a^2\sigma_1^2+c^2\sigma_2^2+2ac\sigma_{12}.
$$
独立正規変数では共分散項が0になる。

1変量 $p=1$ へ特殊化すると
$$
X\sim N(\mu,\sigma^2)
\quad\Longrightarrow\quad
aX+b\sim N(a\mu+b,a^2\sigma^2)
$$
となる。したがって1変量の正規分布の線形変換は、多変量正規のアフィン結合の特殊ケースである。

## 計算例
$\boldsymbol a=(1,-2)^{\mathsf T}$ とする。定数項を除いた平均は
$$
\boldsymbol a^{\mathsf T}\boldsymbol\mu
=1\cdot1+(-2)\cdot2=-3.
$$
$b=5$ を加えると $E[Y]=2$ になる。

分散は定数項 $b$ の影響を受けず
$$
\begin{aligned}
\boldsymbol a^{\mathsf T}\boldsymbol\Sigma\boldsymbol a
&=1^2\cdot4+(-2)^2\cdot9+2(1)(-2)(1)\\
&=4+36-4\\
&=36.
\end{aligned}
$$

独立な $X\sim N(1,4)$、$Z\sim N(2,9)$ で $W=2X-3Z+7$ なら
$$
E[W]=2-6+7=3,
$$
$$
\operatorname{Var}(W)=2^2\cdot4+(-3)^2\cdot9=97,
$$
よって
$$
W\sim N(3,97).
$$

## 一手／方針
**正規性はアフィン変換で保たれる。** 平均には係数を1回掛けて最後に定数項を足し、分散には係数を二次形式として掛ける。定数項は分散に入らない。

## 注意
各成分が個別に正規分布だからといって、確率ベクトル全体が多変量正規分布とは限らない。一般の線形結合が正規分布になるという結論には、多変量正規性が必要である。

$\boldsymbol a=\boldsymbol0$ の場合は分散0の退化分布になる。1変量で $a<0$ でも分散は $a^2\sigma^2$ なので正であり、定数項 $b$ は平均だけを動かす。

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
