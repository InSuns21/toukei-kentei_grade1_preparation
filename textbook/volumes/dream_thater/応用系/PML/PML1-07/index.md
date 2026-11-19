# PML1-07 最適化を連続時間の散逸過程として見られるか

<!-- definition-example-audit: strict -->

[OPT7 の固定歩幅最急降下法](../../../応用系/OPT/OPT7/index.md#def-opt7-fixed-step-gradient)は、損失を小さくするように点を更新する。一方、[ODE4 の非線形自律系](../../../解析系/ODE/ODE4/index.md#def-ode4-nonlinear-autonomous-system)は、現在の状態から時間的な変化率を定める。この二つを結ぶと、更新の一回一回ではなく、損失が**時間に沿ってどう変わるか**を微分で追える。

しかし「損失が下がる」ことから「大域最小値へ着く」ことは出てこない。本章では、連続時間に変えたからこそ証明できる散逸の等式と、それだけでは保証できない収束を分ける。確率的な揺らぎを加えるのは次のPML1-08であり、本章の運動は決定論的である。

ここでは有限次元ユークリッド空間 $\mathbb R^d$（$d\ge1$）、標準内積 $\langle u,v\rangle=u^\mathsf Tv$ とノルム $\|u\|^2=\langle u,u\rangle$ を使う。時間 $t$ と勾配を取る変数 $x$ は別物で、$\dot x(t)=dx(t)/dt$ は時間微分、$\nabla f(x)$ は状態に関する勾配とする。

## 1. 最急降下の差分から勾配流へ

[OPT7 の固定歩幅最急降下法](../../../応用系/OPT/OPT7/index.md#def-opt7-fixed-step-gradient)の一歩を、時間刻み $h>0$ と読み替えると

$$
\frac{x_{k+1}-x_k}{h}=-\nabla f(x_k)
$$

となる。左辺は時間変化率の差分である。形式的に $h\to0$ とした右辺が決める常微分方程式を、ここでは「勾配流」として調べる。この読み替え自体は、離散軌道が必ず収束するという証明ではない。離散化誤差は第6節で改めて扱う。

<a id="def-pml1-07-gradient-flow"></a>

<!-- formal-statement-start -->
> **定義（ユークリッド勾配流）**  
> $f:\mathbb R^d\to\mathbb R$ は連続微分可能で、その勾配 $\nabla f$ は各点の近傍で Lipschitz 連続とする。区間 $I$ 上で連続微分可能な曲線 $x:I\to\mathbb R^d$ が

$$
\dot x(t)=-\nabla f(x(t))\qquad(t\in I)
$$

> を満たすとき、$f$ の**ユークリッド勾配流の軌道**という。$x(0)=x_0$ を加えたものを初期値問題とする。
<!-- formal-statement-end -->

<!-- definition-example-start: def-pml1-07-gradient-flow -->
**定義の確認**：$d=1$、$f(x)=x^2/2$ と置く。$f'(x)=x$ なので $|f'(x)-f'(y)|=|x-y|$ であり、勾配は全域でLipschitz連続である。任意の初期値 $a\in\mathbb R$ に対して

$$
x(t)=ae^{-t},\qquad
\dot x(t)=-ae^{-t}=-f'(ae^{-t})
$$

だから $x$ は $[0,\infty)$ 上の軌道で、$x(0)=a$ を満たす。$a=0$ のときは動かない軌道である。
<!-- definition-example-end -->

局所Lipschitz条件は、[ODE1 の初期値一意性の機構](../../../解析系/ODE/ODE1/index.md#thm-ode1-picard-lindelof)と同じく近い二点の速度差を制御するために課す。有限次元連立系では各成分に同じPicard反復の評価を適用して局所的な存在・一意性を得る。ただし**局所解があること**と**すべての未来時刻まで存在すること**は別である。

## 2. エネルギー散逸は等式である

力学で保存量なら時間微分はゼロになるが、最急降下の運動では損失は減るはずである。損失の時間微分を、状態空間の勾配と速度の内積として計算する。

<a id="thm-pml1-07-dissipation"></a>

<!-- formal-statement-start -->
> **定理（勾配流の散逸恒等式）**  
> [ユークリッド勾配流](#def-pml1-07-gradient-flow) $x:[0,T)\to\mathbb R^d$ と $0\le s\le t<T$ に対して、

$$
\frac{d}{dt}f(x(t))=-\|\nabla f(x(t))\|^2=-\|\dot x(t)\|^2\le0
$$

> が成り立つ。さらに

$$
f(x(t))+\int_s^t\|\nabla f(x(u))\|^2\,du=f(x(s))
$$

> である。したがって $f$ が軌道上で下に有界なら、$x$ が $[0,\infty)$ 上に存在する場合、

$$
\int_0^\infty\|\nabla f(x(u))\|^2\,du<\infty
$$

> が成り立つ。
<!-- formal-statement-end -->

### 証明の見取り図

時間の関数 $t\mapsto f(x(t))$ に[連鎖律](../../../基礎科目/RA/RA3/index.md#prop-ra3-chain-rule)を適用し、各成分の速度を $-\partial_i f$ に置き換えると負の平方和になる。等式を積分すると、失われた損失の量が勾配ノルム二乗の時間積分と一致する。

<!-- proof-start -->
### 証明

合成関数に連鎖律を使うと

$$
\frac{d}{dt}f(x(t))
=\sum_{i=1}^d\frac{\partial f}{\partial x_i}(x(t))\dot x_i(t).
$$

勾配流方程式の各成分 $\dot x_i(t)=-\partial_i f(x(t))$ を代入して

$$
\frac{d}{dt}f(x(t))
=-\sum_{i=1}^d\left(\partial_i f(x(t))\right)^2
=-\|\nabla f(x(t))\|^2.
$$

また $\dot x=-\nabla f$ なので二つのノルムは等しい。[微積分学の基本定理II](../../../基礎科目/RA/RA4/index.md#thm-ra4-ftc2)を区間 $[s,t]$ の合成関数に適用すると

$$
f(x(t))-f(x(s))
=\int_s^t\frac{d}{du}f(x(u))\,du
=-\int_s^t\|\nabla f(x(u))\|^2\,du.
$$

最後に $f(x(u))\ge m$ と仮定すれば

$$
0\le\int_0^t\|\nabla f(x(u))\|^2\,du
=f(x(0))-f(x(t))\le f(x(0))-m.
$$

左辺は $t$ に関して単調非減少で上に有界なので、その極限は有限である。
<!-- proof-end -->

この定理は**凸性を使わない**。一方、最後の積分評価は $t\to\infty$ まで軌道が存在することを明示的に仮定している。有限時間で解が発散する模型に無条件で使ってはいけない。

### 二次関数での散逸量を直接積分する

第1節の $f(x)=x^2/2$、$x(t)=ae^{-t}$ では

$$
f(x(t))=\frac{a^2}{2}e^{-2t},\qquad
\|\nabla f(x(t))\|^2=a^2e^{-2t}.
$$

$$
\int_0^t a^2e^{-2u}\,du
=\left[-\frac{a^2}{2}e^{-2u}\right]_{0}^{t}
=\frac{a^2}{2}(1-e^{-2t})
=f(a)-f(x(t)).
$$

負の微分だけでなく、積分した損失の減少量まで一致する。

## 3. 停留点は最小点とは限らない

[ODE4 の平衡点](../../../解析系/ODE/ODE4/index.md#def-ode4-nonlinear-autonomous-system)は速度が消える状態である。勾配流では速度が負の勾配なので、平衡点は勾配ゼロの点と一致する。ただし、その点は最小点とは限らない。

<a id="def-pml1-07-stationary"></a>

<!-- formal-statement-start -->
> **定義（勾配流の停留点）**  
> 微分可能な $f:\mathbb R^d\to\mathbb R$ に対し、$\nabla f(x_\ast)=0$ を満たす $x_\ast\in\mathbb R^d$ を停留点という。$f$ の勾配流方程式では、$x(t)\equiv x_\ast$ が定数解となることと同値である。
<!-- formal-statement-end -->

<!-- definition-example-start: def-pml1-07-stationary -->
**定義の確認**：$f(x)=(x^2-1)^2/4$ とすると

$$
f'(x)=x(x^2-1).
$$

$f'(-1)=f'(0)=f'(1)=0$ だから三つとも停留点である。$f(\pm1)=0$ だが $f(0)=1/4$。さらに $|x|<1$ で $f(x)<f(0)$ だから、$0$ は最小点ではなく局所最大点である。それでも $x(0)=0$ なら $x(t)\equiv0$ は勾配流の解である。
<!-- definition-example-end -->

この模型の方程式は $\dot x=x(1-x^2)$ である。$0<x<1$ なら速度が正、$x>1$ なら負なので、正側の軌道は $1$ へ向かう。一方、ちょうど $x_0=0$ からは一歩も動かない。散逸等式の右辺が $0$ でも、最小点にいるとは限らない。

もう一つの注意は、損失が減ることと運動が無限時間続くことが別だという点である。$f(x)=-x^3/3$ と $x_0>0$ の場合、

$$
\dot x=x^2,\qquad x(t)=\frac{x_0}{1-x_0t}
\quad(0\le t<1/x_0).
$$

この解は微分して $\dot x=x_0^2/(1-x_0t)^2=x(t)^2$ を満たすが、有限時刻 $1/x_0$ で発散する。ここでは $f$ が下に有界でない。散逸の符号だけから大域存在を宣言できない。

## 4. 散逸するだけで収束すると言えるか

散逸恒等式から、全時刻に存在して損失が下に有界な軌道について、勾配の**二乗積分**が有限だと分かった。だが一般の連続関数では、二乗積分が有限でもときどき細い峰を作れるため、値そのものがゼロへ収束すると即断できない。ここでは軌道の有界性と滑らかさを加えて、その隙間を埋める。

<a id="prop-pml1-07-bounded-critical"></a>

<!-- formal-statement-start -->
> **命題（有界な滑らか勾配流の漸近的停留性）**  
> $f:\mathbb R^d\to\mathbb R$ は $C^2$ 級とする。勾配流の解 $x:[0,\infty)\to\mathbb R^d$ が有界で、$f(x(t))$ が下に有界とする。このとき

$$
\lim_{t\to\infty}\|\nabla f(x(t))\|=0.
$$

> さらに、$x(t_n)\to\bar x$ を満たす $t_n\to\infty$ があれば $\nabla f(\bar x)=0$ である。ただし、この命題だけでは $x(t)$ 自身の一点への収束は結論しない。
<!-- formal-statement-end -->

### 証明の見取り図

軌道が入る閉球上では $\nabla f$ とHessianが有界である。$g(t)=\|\nabla f(x(t))\|^2$ と置き、その時間微分も有界と示すと、$g$ は一様に急な峰を作れない。$g$ の積分が有限であることと合わせて $g(t)\to0$ が従う。

<!-- proof-start -->
### 証明

軌道は半径 $R$ の閉球に入り、有限次元の閉球はコンパクトである。$f\in C^2$ だから、ある $G,H<\infty$ が存在し、球内で

$$
\|\nabla f(x)\|\le G,\qquad
\|\nabla^2f(x)\|_{\mathrm{op}}\le H
$$

が成り立つ。$g(t)=\|\nabla f(x(t))\|^2$ に連鎖律を適用すると

$$
g'(t)=2\left\langle\nabla f(x(t)),
\nabla^2f(x(t))\dot x(t)\right\rangle.
$$

$\dot x=-\nabla f$ を代入し、Cauchy--Schwarzを用いて

$$
|g'(t)|\le2GH\|\dot x(t)\|\le2G^2H=:K.
$$

したがって $|g(t)-g(s)|\le K|t-s|$ である。[散逸恒等式](#thm-pml1-07-dissipation)より $\int_0^\infty g(u)\,du<\infty$。もし $g(t)\not\to0$ なら、ある $\varepsilon>0$ と $t_n\to\infty$ があり $g(t_n)\ge\varepsilon$。$K=0$ なら $g$ は定数だから積分可能性により $g\equiv0$ となり矛盾する。$K>0$ なら $|u-t_n|\le\varepsilon/(2K)$ の間は $g(u)\ge\varepsilon/2$。重ならないこのような区間を無限個選べるので、積分が無限大となって矛盾する。よって $g(t)\to0$。

最後に $t_n\to\infty$ で $x(t_n)\to\bar x$ なら、$\nabla f$ の連続性から

$$
\|\nabla f(\bar x)\|
=\lim_{n\to\infty}\|\nabla f(x(t_n))\|=0.
$$

したがって $\bar x$ は停留点である。
<!-- proof-end -->

この命題は「すべての集積点が停留点」を保証する。集積点が一つしかない、とまでは言っていない。次に、**強凸性**を加えるともっと強い結論が得られる。

## 5. 強凸性があると最小点への速度を証明できる

[OPT7 の強凸性](../../../応用系/OPT/OPT7/index.md#def-opt7-strong-convexity)を仮定すると、停留点はただ一つの最小点であり、勾配の大きさが最適値との差を制御する。ここでは連続時間の減衰率を求め、離散反復の収束率と区別する。

<a id="thm-pml1-07-strong-convex-flow"></a>

<!-- formal-statement-start -->
> **定理（強凸勾配流の指数収束）**  
> $f:\mathbb R^d\to\mathbb R$ は $C^1$ 級、$\nabla f$ は大域的にLipschitz連続であり、$f$ は定数 $\mu>0$ で強凸とする。唯一の最小点を $x_\ast$ とする。初期値 $x(0)=x_0$ の勾配流は $[0,\infty)$ 上に一意に存在し、すべての $t\ge0$ について

$$
f(x(t))-f(x_\ast)\le
e^{-2\mu t}\bigl(f(x_0)-f(x_\ast)\bigr)
$$

> および

$$
\|x(t)-x_\ast\|\le
e^{-\mu t}\|x_0-x_\ast\|
$$

> が成り立つ。
<!-- formal-statement-end -->

### 証明の見取り図

[OPT7 の強凸勾配下界](../../../応用系/OPT/OPT7/index.md#thm-opt7-strong-convex-gradient-bound)で $\|\nabla f\|^2\ge2\mu(f-f_\ast)$ を得る。散逸恒等式へ代入すれば、最適値との差が満たす微分不等式になる。距離については強凸の二点での一次不等式を足し、勾配差の内積の下界を作る。

<!-- proof-start -->
### 証明

大域的Lipschitz連続なベクトル場 $-\nabla f$ に対するPicard反復の局所解は、有限時刻で発散できない。実際、$\|\nabla f(x)\|\le\|\nabla f(0)\|+L\|x\|$ なので、積分方程式から

$$
\|x(t)\|\le\|x_0\|
+\int_0^t\bigl(\|\nabla f(0)\|+L\|x(u)\|\bigr)\,du
$$

となる。区間 $[0,T]$ 上のGronwall型評価（積分右辺を $v(t)$ と置くと $v'\le\|\nabla f(0)\|+Lv$）により

$$
\|x(t)\|\le
\bigl(\|x_0\|+T\|\nabla f(0)\|\bigr)e^{LT}
\quad(0\le t\le T).
$$

したがって有限時刻でノルムは発散せず、局所解を延長できる。一意性もLipschitz性による。

強凸連続関数は下に二次的に増大するので最小点を持ち、強凸性で一意である。[OPT7 の強凸勾配下界](../../../応用系/OPT/OPT7/index.md#thm-opt7-strong-convex-gradient-bound)を時刻 $t$ の点 $x(t)$ に使うと

$$
\|\nabla f(x(t))\|^2
\ge2\mu\bigl(f(x(t))-f(x_\ast)\bigr).
$$

$E(t)=f(x(t))-f(x_\ast)\ge0$ と置いて[散逸恒等式](#thm-pml1-07-dissipation)へ代入すると

$$
E'(t)=-\|\nabla f(x(t))\|^2\le-2\mu E(t).
$$

積の微分を取って

$$
\frac{d}{dt}\bigl(e^{2\mu t}E(t)\bigr)
=e^{2\mu t}\bigl(E'(t)+2\mu E(t)\bigr)\le0,
$$

ゆえに $e^{2\mu t}E(t)\le E(0)$ となる。

距離の評価では強凸性の一次不等式を $x,y$ と $y,x$ の順に使って足すと

$$
\langle\nabla f(x)-\nabla f(y),x-y\rangle
\ge\mu\|x-y\|^2.
$$

最小点で $\nabla f(x_\ast)=0$ だから、$D(t)=\|x(t)-x_\ast\|^2$ に対して

$$
\begin{aligned}
D'(t)
&=2\langle x(t)-x_\ast,\dot x(t)\rangle\\
&=-2\langle x(t)-x_\ast,\nabla f(x(t))-\nabla f(x_\ast)\rangle\\
&\le-2\mu D(t).
\end{aligned}
$$

再び $e^{2\mu t}D(t)$ を微分して非増加性を得る。$D(t)\le e^{-2\mu t}D(0)$ の両辺の平方根を取って距離評価が従う。
<!-- proof-end -->

**直接例**：$f(x_1,x_2)=(x_1^2+4x_2^2)/2$ はHessianが $\operatorname{diag}(1,4)$ で、最小固有値 $1$、最大固有値 $4$。したがって $\mu=1$、勾配のLipschitz定数は $L=4$ である。流れは

$$
x_1(t)=a e^{-t},\qquad x_2(t)=b e^{-4t}.
$$

二つの座標をそれぞれ微分すると $\dot x_1=-x_1$、$\dot x_2=-4x_2$ となり、方程式を満たす。距離は

$$
\|x(t)\|^2=a^2e^{-2t}+b^2e^{-8t}
\le e^{-2t}(a^2+b^2).
$$

強凸性がない場合でも減衰は起こり得る。例えば $f(x,y)=x^2/2$ なら $(x(t),y(t))=(ae^{-t},b)$ で、$f$ は減るが $y$ は全く動かない。最小点は直線 $\{(0,b):b\in\mathbb R\}$ 全体であり、強凸性の一意性はない。

## 6. 正定値な移動度と離散時間の落とし穴

勾配をそのまま速度にせず、ある方向だけ速く動けるようにしたいことがある。定数行列 $M$ を使った $\dot x=-M\nabla f(x)$ を考えると、損失の減少は $M$ の性質で決まる。ここでの行列は、**状態の勾配を速度へ変換する係数**であり、Hessianそのものではない。

<a id="def-pml1-07-mobility"></a>

<!-- formal-statement-start -->
> **定義（定数移動度の勾配系）**  
> $f:\mathbb R^d\to\mathbb R$ を $C^1$ 級、$M\in\mathbb R^{d\times d}$ を実対称正定値行列とする。このとき

$$
\dot x=-M\nabla f(x)
$$

> を定数移動度 $M$ の勾配系という。実対称正定値とは任意の $v\ne0$ について $v^\mathsf TMv>0$ が成り立つことである。
<!-- formal-statement-end -->

<!-- definition-example-start: def-pml1-07-mobility -->
**定義の確認**：$d=2$、$M=\operatorname{diag}(2,1)$、$f(x,y)=(x^2+y^2)/2$ とする。$M^\mathsf T=M$ で、任意の非零 $v=(v_1,v_2)$ に対して $v^\mathsf TMv=2v_1^2+v_2^2>0$。よって定義の対称性と正定値性を満たす。勾配 $\nabla f=(x,y)$ を $M$ に掛けると速度は $(-2x,-y)$ になり、軌道は $(ae^{-2t},be^{-t})$ と確かめられる。
<!-- definition-example-end -->

<a id="prop-pml1-07-mobility-dissipation"></a>

<!-- formal-statement-start -->
> **命題（移動度が正定値なら散逸する）**  
> $f\in C^1(\mathbb R^d)$、$M$ が実対称正定値行列で、$x$ が $\dot x=-M\nabla f(x)$ の $C^1$ 級解なら、

$$
\frac{d}{dt}f(x(t))=
-\nabla f(x(t))^\mathsf TM\nabla f(x(t))\le0.
$$

> 等号が成立するのは、その時刻の $\nabla f(x(t))=0$ のとき、かつそのときに限る。
<!-- formal-statement-end -->

<!-- proof-start -->
### 証明

連鎖律から $d f(x(t))/dt=\nabla f(x(t))^\mathsf T\dot x(t)$。速度に $-M\nabla f$ を代入すると主張の等式を得る。実対称正定値の定義より任意の非零 $v$ で $v^\mathsf TMv>0$ なので、右辺が $0$ となるのは $v=\nabla f=0$ の場合だけである。
<!-- proof-end -->

**仮定を落とした反例**：対称だが半正定値の $M=\operatorname{diag}(1,0)$ と $f(x,y)=(x^2+y^2)/2$ を使う。流れは $\dot x=-x,\dot y=0$。初期値 $(0,1)$ なら $\dot x=\dot y=0$ なのに勾配は $(0,1)\ne0$ である。半正定値では方向 $y$ の運動が封じられ、等号から停留点を結論する証明が壊れる。

### Euler離散化は自動的に散逸しない

連続時間の勾配流を刻み幅 $h>0$ の陽的Euler法で近似すると

$$
x_{k+1}=x_k-h\nabla f(x_k)
$$

であり、式の形は[OPT7 の固定歩幅最急降下法](../../../応用系/OPT/OPT7/index.md#def-opt7-fixed-step-gradient)と同じになる。だが [OPT7 の固定歩幅の降下評価](../../../応用系/OPT/OPT7/index.md#thm-opt7-fixed-step-decrease)では、$L$-滑らかな関数の離散的散逸に $0<h<2/L$ が必要だった。

具体的に $f(x)=\lambda x^2/2$、$\lambda>0$ とすれば、連続解と離散解はそれぞれ

$$
x(t)=x_0e^{-\lambda t},\qquad
x_k=(1-h\lambda)^k x_0.
$$

$h\lambda=2$ なら $x_{k+1}=-x_k$ で損失は毎回同じ、$h\lambda>2$ なら絶対値も損失も増える。連続系では常に $d f/dt=-\lambda^2x(t)^2\le0$ なのに、刻み幅が大きいとこの性質は数値更新に移らない。$t=kh$ と見なす近似と等式としての一致を混同しないことが重要である。

## 7. 学んだことを整理する

勾配流は損失の微分を**負の勾配ノルム二乗**にするので、軌道が存在する間の散逸は厳密な等式である。停留点が最小点であるか、軌道が全時刻に存在するか、ある一点に収束するかは別途仮定を要する。強凸性とLipschitz連続勾配を加えると、大域存在と指数収束まで証明できる。

次のPML1-08では $\dot x=-\nabla f(x)$ に雑音を足す。確率的な揺らぎが入れば個々の軌道の損失は単調とは限らず、本章の散逸等式をそのまま流用してはならない。

## 8. 演習 Level A

<a id="ex-pml1-07-a01"></a>
### PML1-07-A01 一次元二次関数の流れ

$f(x)=3x^2/2$、$x(0)=2$ の勾配流を解き、散逸等式を $[0,t]$ で検算せよ。

<!-- solution-start -->
#### 詳細解答

$f'(x)=3x$ だから方程式は $\dot x=-3x$。初期値から $x(t)=2e^{-3t}$。実際、微分した $-6e^{-3t}$ と $-3x(t)$ が等しい。損失と勾配二乗は

$$
f(x(t))=6e^{-6t},\qquad |f'(x(t))|^2=36e^{-6t}.
$$

積分すると

$$
\int_0^t36e^{-6u}\,du
=\left[-6e^{-6u}\right]_0^t
=6(1-e^{-6t}).
$$

$f(x(0))-f(x(t))=6-6e^{-6t}$ に等しいので[散逸恒等式](#thm-pml1-07-dissipation)を直接確かめた。
<!-- solution-end -->

<a id="ex-pml1-07-a02"></a>
### PML1-07-A02 動かない点と最小点

$f(x)=(x^2-1)^2/4$ の停留点を列挙し、各点が局所最大か大域最小か判定せよ。

<!-- solution-start -->
#### 詳細解答

$f'(x)=x(x^2-1)$ から停留点は $-1,0,1$。$f(x)\ge0$、等号が成立するのは $\pm1$ のみなので、$\pm1$ は大域最小点である。$f''(x)=3x^2-1$ を計算すると $f''(0)=-1<0$。連続な二階微分を持つ関数の局所二次近似から $0$ は厳密局所最大点である。どの点でも勾配はゼロなので、それぞれ定数軌道を作るが、$0$ から最小点へは自動では移動しない。
<!-- solution-end -->

<a id="ex-pml1-07-a03"></a>
### PML1-07-A03 二方向で異なる減衰

$f(x,y)=(x^2+9y^2)/2$、初期点 $(a,b)$ の勾配流を解き、損失の時間微分を求めよ。

<!-- solution-start -->
#### 詳細解答

$\nabla f=(x,9y)$ なので $\dot x=-x$、$\dot y=-9y$。それぞれを解くと $x(t)=ae^{-t}$、$y(t)=be^{-9t}$。したがって

$$
f(x(t),y(t))=\frac12a^2e^{-2t}+\frac92b^2e^{-18t}.
$$

微分は

$$
\frac{d f}{dt}=-a^2e^{-2t}-81b^2e^{-18t}
=-\|\nabla f(x(t),y(t))\|^2.
$$

$x,y$ が同じ速度で減るわけではなく、曲率の大きい第二方向は速く減衰する。
<!-- solution-end -->

<a id="ex-pml1-07-a04"></a>
### PML1-07-A04 散逸積分から分かること

全時刻に存在する勾配流 $x(t)$ について $f(x(t))\ge-2$、$f(x(0))=5$ とする。$\int_0^\infty\|\nabla f(x(t))\|^2dt$ の上界を求めよ。また、この条件だけで $x(t)$ の一点への収束を断言できるか。

<!-- solution-start -->
#### 詳細解答

[散逸恒等式](#thm-pml1-07-dissipation)より任意の $T$ で

$$
\int_0^T\|\nabla f(x(t))\|^2\,dt
=5-f(x(T))\le5-(-2)=7.
$$

積分は非負の関数の積分なので $T$ とともに単調非減少で、極限も $7$ 以下である。一点への収束はこの積分上界だけでは証明されない。$x(t)$ の有界性も強凸性も仮定していないためである。
<!-- solution-end -->

<a id="ex-pml1-07-a05"></a>
### PML1-07-A05 移動度の正定値を確認する

$M=\operatorname{diag}(2,5)$、$f(x,y)=(x^2+y^2)/2$ に対し、移動度の定義の各条件と散逸率を確認せよ。

<!-- solution-start -->
#### 詳細解答

$M$ は実 $2\times2$ 行列、$M^\mathsf T=M$。非零 $v=(v_1,v_2)$ なら

$$
v^\mathsf TMv=2v_1^2+5v_2^2>0,
$$

したがって正定値である。$\nabla f=(x,y)$ だから運動は $\dot x=-2x$、$\dot y=-5y$。[移動度の散逸命題](#prop-pml1-07-mobility-dissipation)の式へ代入すると

$$
\frac{df}{dt}=x(-2x)+y(-5y)=-2x^2-5y^2.
$$

どの方向の散逸率が大きいかは移動度と現在の勾配の両方に依存する。
<!-- solution-end -->

## 9. 演習 Level B

<a id="ex-pml1-07-b01"></a>
### PML1-07-B01 指数収束を積分因子で再構成する

$f$ が $\mu$-強凸で、ある大域勾配流について $\|\nabla f(x(t))\|^2\ge2\mu(f(x(t))-f_\ast)$ が成り立つとする。散逸等式から損失差の指数上界を導け。

<!-- solution-start -->
#### 詳細解答

$E(t)=f(x(t))-f_\ast$ と置くと、[散逸恒等式](#thm-pml1-07-dissipation)から

$$
E'(t)=-\|\nabla f(x(t))\|^2\le-2\mu E(t).
$$

両辺に $e^{2\mu t}>0$ を掛け、積の微分

$$
\frac{d}{dt}(e^{2\mu t}E(t))
=e^{2\mu t}(E'(t)+2\mu E(t))\le0
$$

を使う。したがって $e^{2\mu t}E(t)\le E(0)$。結論は $E(t)\le E(0)e^{-2\mu t}$。これは離散反復の $(1-\mu/L)^k$ とは異なる、連続時間 $t$ に関する評価である。
<!-- solution-end -->

<a id="ex-pml1-07-b02"></a>
### PML1-07-B02 有界軌道で勾配が消える機構

$g:[0,\infty)\to[0,\infty)$ が微分可能で、$|g'|\le K$、$\int_0^\infty g(t)dt<\infty$ とする。$g(t)\to0$ を証明し、[有界な滑らか勾配流の命題](#prop-pml1-07-bounded-critical)で $g(t)$ に何を取るか述べよ。

<!-- solution-start -->
#### 詳細解答

$K=0$ の場合 $g$ は非負定数で、積分が有限となるには $g\equiv0$ である。$K>0$ とする。$g(t)\not\to0$ なら、$\varepsilon>0$ と $t_n\to\infty$ で $g(t_n)\ge\varepsilon$ となる列がある。微分の上界から $|g(u)-g(t_n)|\le K|u-t_n|$。したがって

$$
|u-t_n|\le\frac{\varepsilon}{2K}
\quad\Longrightarrow\quad
g(u)\ge\frac{\varepsilon}{2}.
$$

$t_n$ の部分列を選び区間を互いに交わらなくすると、各区間の積分は少なくとも $\varepsilon^2/(2K)$ となり、無限個の区間の総和は発散して矛盾する。勾配流では $g(t)=\|\nabla f(x(t))\|^2$ を用いる。二階微分と軌道の有界性が $|g'|$ の一様上界を与え、散逸等式が積分可能性を与える。
<!-- solution-end -->

<a id="ex-pml1-07-b03"></a>
### PML1-07-B03 連続散逸とEuler更新の相違

$f(x)=2x^2$、$x(0)=1$ について連続勾配流の $x(t)$ を求める。またEuler更新の刻み幅を $h=1/2$、$h=3/5$ としたとき、最初の2更新と損失を求めよ。

<!-- solution-start -->
#### 詳細解答

$f'(x)=4x$ だから連続系は $\dot x=-4x$ であり、$x(t)=e^{-4t}$、$f(x(t))=2e^{-8t}$ と減る。Euler更新は $x_{k+1}=(1-4h)x_k$。

$h=1/2$ なら倍率は $-1$ であり、$x_0=1,x_1=-1,x_2=1$、損失は $2,2,2$ で減らない。

$h=3/5$ なら倍率は $1-12/5=-7/5$。したがって

$$
x_0=1,\qquad x_1=-\frac75,\qquad x_2=\frac{49}{25},
$$

$$
f(x_0)=2,\quad f(x_1)=\frac{98}{25},\quad
f(x_2)=\frac{4802}{625}.
$$

$98/25>2$ かつ $4802/625>98/25$ なので離散更新の損失は増える。[OPT7 の降下評価](../../../応用系/OPT/OPT7/index.md#thm-opt7-fixed-step-decrease)の安全域 $0<h<2/L=1/2$ を二つとも満たしていないためである。
<!-- solution-end -->

<a id="ex-pml1-07-b04"></a>
### PML1-07-B04 非対角の正定値移動度

$M=\begin{pmatrix}2&1\\1&2\end{pmatrix}$、$f(x,y)=(x^2+y^2)/2$ とする。$M$ が対称正定値であることを確認し、初期値 $(1,1)$ の流れと散逸率を計算せよ。

<!-- solution-start -->
#### 詳細解答

$M^\mathsf T=M$。任意の $v=(v_1,v_2)$ で

$$
v^\mathsf TMv
=2v_1^2+2v_1v_2+2v_2^2
=(v_1+v_2)^2+v_1^2+v_2^2>0
$$

（$v\ne0$）だから正定値。$\nabla f=(x,y)$ で、$(1,1)$ は $M$ の固有値 $3$ の固有ベクトルなので、$x(t)=y(t)=e^{-3t}$ を候補とする。両成分を微分すると $(-3e^{-3t},-3e^{-3t})=-M(e^{-3t},e^{-3t})$ であり、初期値も満たす。損失は $f=e^{-6t}$。したがって

$$
\frac{df}{dt}=-6e^{-6t}
=-(e^{-3t},e^{-3t})M(e^{-3t},e^{-3t})^\mathsf T.
$$

非対角項があっても、正定値なら散逸する。
<!-- solution-end -->

## 10. 演習 Level C

<a id="ex-pml1-07-c01"></a>
### PML1-07-C01 二つの極小点をもつ損失を連続・離散で比較する

$f(x)=(x^2-1)^2/4$ を考える。初期値 $x_0\in(0,1)$ として、次を示せ。

1. 連続勾配流は $0<x(t)<1$ のまま単調に増加し、$x(t)\to1$ となる。
2. $x_0=0$ の場合、散逸がゼロでも最適値 $0$ に達していないことを確認する。
3. 陽的Euler更新を $x_{k+1}=x_k-hf'(x_k)$ としたとき、最小点 $x=1$ の近傍の線形化倍率を計算し、$h>1$ では小さい誤差が一歩で増幅することを示す。

<!-- solution-start -->
#### 詳細解答

$f'(x)=x(x^2-1)$ なので連続系は

$$
\dot x=x(1-x^2).
$$

$0<x<1$ では右辺が正、両端 $0,1$ は平衡点である。多項式ベクトル場は局所Lipschitzであるため、有限時刻に平衡点へ到着して別の軌道へ抜けることは一意性に反する。したがって初期値が $(0,1)$ なら軌道はこの区間を出ず、単調に増える。上に $1$ で有界なので極限 $\ell\in(0,1]$ が存在する。もし $\ell<1$ なら $\ell(1-\ell^2)>0$。連続性から十分大きい時刻には $\dot x\ge c>0$ となり、$x$ が有界であることに矛盾する。よって $\ell=1$。

二番目は $f'(0)=0$ なので $x(t)\equiv0$。散逸率 $-|f'(0)|^2=0$ だが $f(0)=1/4>f(\pm1)=0$ である。ここでは「平衡」と「最小」を同一視するのが誤りである。

三番目は更新写像

$$
\Phi_h(x)=x-hx(x^2-1)
$$

を $x=1$ の近くで調べる。微分は $\Phi_h'(x)=1-h(3x^2-1)$ だから

$$
\Phi_h'(1)=1-2h.
$$

$x=1+e$ と置いて展開すると

$$
\Phi_h(1+e)-1=(1-2h)e-3he^2-he^3.
$$

$h>1$ なら $|1-2h|>1$。十分小さい非零誤差 $e$ では高次項より線形項が支配し、$\left|\Phi_h(1+e)-1\right|>|e|$。連続系で安定な極小点も、粗いEuler更新では局所的に不安定になる。これは連続散逸を離散化後に無条件で引き継げない具体例である。
<!-- solution-end -->
