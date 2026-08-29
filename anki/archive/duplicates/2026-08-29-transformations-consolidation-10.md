---
id: prob-transform-affine-decreasing
title: 負の係数を持つ一次変換の密度を求める
category: math-probability
subcategory: math-transformations
topic: affine-decreasing-transform
type: calc_step
difficulty: 2
priority: S
hashtags:
  - 変数変換
  - 単調減少
  - Jacobian
frequency:
  past_exam: 0
  textbook: 0
  independent_problems: 0
  source_confirmations: 0
sources:
  - type: official_syllabus
    topic: 変数変換
archive_reason: duplicate
canonical_card: prob-transform-log
archive_note: 単調変換canonicalへ逆変換・Jacobian絶対値・台の変換を一般化し、係数が負の一次変換Y=3-2Xも数値例として吸収済み。
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
title: 逆数変換でパレート型密度を導く
category: math-probability
subcategory: math-transformations
topic: reciprocal-transform
type: calc_step
difficulty: 3
priority: A
hashtags:
  - 変数変換
  - 逆数
  - パレート分布
frequency:
  past_exam: 0
  textbook: 0
  independent_problems: 0
  source_confirmations: 0
sources:
  - type: official_syllabus
    topic: 変数変換
archive_reason: duplicate
canonical_card: prob-transform-log
archive_note: 単調減少の非線形例Y=1/Xをcanonicalへ吸収し、逆変換x=1/y、Jacobian 1/y^2、台y>1まで扱うため独立カードにしない。
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
hashtags:
  - 半正規分布
  - 絶対値変換
  - 多対一変換
frequency:
  past_exam: 0
  textbook: 0
  independent_problems: 0
  source_confirmations: 0
sources:
  - type: official_syllabus
    topic: 変数変換
archive_reason: duplicate
canonical_card: prob-transform-nonmonotonic
archive_note: 多対一変換canonicalでY=|X|の逆像±yを列挙してf_Y(y)=2phi(y)まで扱う。半正規分布固有の平均値は参照事項として独立カードにしない。
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
hashtags:
  - カイ二乗分布
  - 二乗変換
  - 標準正規分布
frequency:
  past_exam: 0
  textbook: 0
  independent_problems: 0
  source_confirmations: 0
sources:
  - type: official_syllabus
    topic: 変数変換
archive_reason: duplicate
canonical_card: prob-transform-nonmonotonic
archive_note: 多対一変換canonicalへ標準正規の二乗を追加し、±sqrt(y)の2枝とJacobianからchi-square自由度1の密度まで導出済み。
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
id: dist-convolution-uniform
title: 一様分布の和を畳み込みで求める
category: math-probability
subcategory: math-transformations
topic: convolution
type: strategy
difficulty: 3
priority: S
hashtags:
  - 畳み込み
  - 台
  - 一様分布
frequency:
  past_exam: 0
  textbook: 0
  independent_problems: 0
  source_confirmations: 0
sources:
  - type: official_syllabus
    topic: 確率変数の和
archive_reason: duplicate
canonical_card: prob-transform-sum-density
archive_note: 一様分布2個の和を台の重なりから三角密度へ導く同一計算。補強済み畳み込みcanonicalで完全に扱う。
---
## 問題
独立な $X,Y$ は一様分布 $U(0,1)$ に従うとする。密度は $f(x)=1$（$0<x<1$）、それ以外で0である。$Z=X+Y$ の密度を求めよ。
## 方針
畳み込みを立て、$0<x<1$ と $0<z-x<1$ の共通範囲を積分する。
## 使用公式・定理
$$f_Z(z)=\int_{-\infty}^{\infty}f_X(x)f_Y(z-x)\,dx.$$
## 計算例
条件は $\max(0,z-1)<x<\min(1,z)$。したがって
$$f_Z(z)=\begin{cases}\int_0^z1\,dx=z&(0<z<1),\\\int_{z-1}^11\,dx=2-z&(1\le z<2),\\0&\text{otherwise}.\end{cases}$$
## 注意
公式より先に積分区間を台から決める。

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
hashtags:
  - 畳み込み
  - 一様分布
  - 三角分布
frequency:
  past_exam: 0
  textbook: 0
  independent_problems: 0
  source_confirmations: 0
sources:
  - type: official_syllabus
    topic: 確率変数の線形結合
archive_reason: duplicate
canonical_card: prob-transform-sum-density
archive_note: 畳み込みcanonicalへU(0,1)同士の和の積分区間max(0,s-1)<x<min(1,s)と区分的三角密度を吸収済み。
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
hashtags:
  - 差の分布
  - 一様分布
  - 畳み込み
frequency:
  past_exam: 0
  textbook: 0
  independent_problems: 0
  source_confirmations: 0
sources:
  - type: official_syllabus
    topic: 確率変数の線形結合
archive_reason: duplicate
canonical_card: prob-transform-sum-density
archive_note: 畳み込みcanonicalへ差D=X-Yの一般式とU(0,1)でf_D(d)=1-|d|の計算を吸収済み。
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
hashtags:
  - 指数分布
  - 畳み込み
  - hypoexponential
frequency:
  past_exam: 0
  textbook: 0
  independent_problems: 0
  source_confirmations: 0
sources:
  - type: official_syllabus
    topic: 確率変数の線形結合
archive_reason: duplicate
canonical_card: prob-transform-sum-density
archive_note: 畳み込みcanonicalへ異なる率lambda,muの指数分布和も積分途中から最終密度まで吸収済み。
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
hashtags:
  - 比の分布
  - 指数分布
  - 変数変換
frequency:
  past_exam: 0
  textbook: 0
  independent_problems: 0
  source_confirmations: 0
sources:
  - type: official_syllabus
    topic: 変数変換
archive_reason: duplicate
canonical_card: prob-transform-ratio
archive_note: 比の分布canonicalへ分母で条件付ける一般式とExp(1)同士の比F_R(r)=r/(1+r), f_R(r)=1/(1+r)^2を吸収済み。
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
id: prob-transform-iid-minimum-density
title: 独立同分布標本の最小値の密度を生存関数から求める
category: math-probability
subcategory: math-transformations
topic: minimum-transform-density
type: calc_step
difficulty: 2
priority: S
hashtags:
  - 最小値
  - 順序統計量
  - 生存関数
frequency:
  past_exam: 0
  textbook: 0
  independent_problems: 0
  source_confirmations: 0
sources:
  - type: official_syllabus
    topic: 変数変換
archive_reason: duplicate
canonical_card: prob-transform-iid-maximum-density
archive_note: 最大値canonicalへ最小値を生存関数の双対として統合し、一般密度と指数分布でExp(n lambda)になる計算まで吸収済み。
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
