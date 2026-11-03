# QCURV7 Rindlerくさび・等加速度世界線と真空の制限

<!-- definition-example-audit: strict -->

[QCURV6の検出器](../QCURV6/index.md#def-qcurv6-detector)は、検出器の世界線に場の二点分布を引き戻すことで応答を定めました。しかし慣性検出器の軌道を等加速度軌道へ変えるには、その時計と、加速観測者がアクセスできる時空領域を先に区別する必要があります。

この章では「**Minkowski時空の一部にしかいない加速観測者は、どの時刻を使い、どの状態を見ているか**」を考えます。右左のくさびと座標 → 固有加速度 → boost正振動数 → Minkowski真空の制限と二点相関を計算します。次の主題で初めて、定常応答のFourier変換・KMS条件・Unruh温度を導きます。

右くさびの幾何と固有加速度は[既習のSREL8のRindler座標](../../SREL/SREL8/index.md#def-srel8-rindler-chart)および[固有加速度の命題](../../SREL/SREL8/index.md#prop-srel8-proper-accel)に対応します。SREL8は時間成分を正とする旧計量規約と $c>0$ を用いているため、ここでは $c=1$ として[計量規約の変換](../../../../../dream-theater-lorentz-conventions.md)を適用し、さらに左くさびの時間向きと場の量子化に必要な式を明示します。

規約は[計量符号の正本](../../../../../dream-theater-lorentz-conventions.md)に従って $(-,+,+,+)$、自然単位 $\hbar=c=1$ とします。Minkowski座標を $X=(t,x,y,z)$ とし、

$$
ds^2=-dt^2+dx^2+dy^2+dz^2
$$

です。以後 $a>0$ はRindler時間の単位を決める**固定した尺度**で、個々の軌道の固有加速度とは必ずしも一致しません。

## 1. 加速観測者の時計は時空全体を覆わない

光は $x$ 方向に $t-x=\mathrm{const.}$ または $t+x=\mathrm{const.}$ を進みます。そこで $U=t-x$、$V=t+x$ を光線に沿う座標（null座標）と呼びます。右に位置し続ける等加速度軌道を記述するには、$x>|t|$ の領域だけで十分です。反対側の $x<-|t|$ は別のくさびです。両者の間の領域を、この座標で埋めたことにはなりません。

ここで[SREL8の地平線](../../SREL/SREL8/index.md#def-srel8-horizon)は $U_{\mathrm{SREL8}}=x-t$ と置いています。本章の $U=t-x=-U_{\mathrm{SREL8}}$ は符号が逆で、$V=t+x=V_{\mathrm{SREL8}}$ は同じです。どちらでも光的な境界は同じですが、不等号の向きは読み替えます。

右では $\rho>0$ を双曲線 $x^2-t^2=\rho^2$ の大きさとし、$\eta$ をその双曲線上のboost時間とします。左でも $\rho>0$ を用いますが、符号を二つとも反転させます。

<a id="def-qcurv7-wedges"></a>

<!-- formal-statement-start -->
> **定義（右左Rindlerくさびと座標）**
> 4次元Minkowski時空 $(\mathbb R^4,\operatorname{diag}(-1,1,1,1))$ の開領域を

$$
R=\{(t,x,y,z):x>|t|\},\qquad
L=\{(t,x,y,z):x<-|t|\}
$$

> とする。各領域で $(\eta,\rho,y,z)\in\mathbb R\times(0,\infty)\times\mathbb R^2$ を、右では

$$
t=\rho\sinh(a\eta),\qquad x=\rho\cosh(a\eta),
$$

> 左では

$$
t=-\rho\sinh(a\eta),\qquad x=-\rho\cosh(a\eta)
$$

> によって定める。$U=t-x$、$V=t+x$ をnull座標と呼ぶ。$R$ では $U<0<V$、$L$ では $V<0<U$ である。
<!-- formal-statement-end -->

<!-- definition-example-start: def-qcurv7-wedges -->
### 直接例：右の一点と左の一点

$a=2$、$\rho=3$、$\eta=0$ とすると、右の点は $(t,x)=(0,3)$ で $U=-3,V=3$、左の点は $(0,-3)$ で $U=3,V=-3$ です。いずれも $x^2-t^2=9$、$\rho=\sqrt{x^2-t^2}=3$ を満たします。両くさびで $t/x=\tanh(2\eta)=0$ ですが、時間向きまで同じとは限りません。

一般の点では $\rho=\sqrt{x^2-t^2}$ と $\eta=a^{-1}\operatorname{artanh}(t/x)$ で逆変換できます。$|t/x|<1$ がまさに両くさび内の条件で、右・左の符号は $x$ の符号から決まります。したがって各座標系は対応する**一つのくさび**への一対一対応です。

**定義の確認**：右・左とも $\rho>0$、実 $\eta$、null座標の指定された二つの符号を直接検査しました。逆変換の定義域も $|t/x|<1$ により確認できます。
<!-- definition-example-end -->

座標の変換で計量が変わって見えても、時空の曲率が現れたわけではありません。Jacobianを計算すると二つのくさびで同じ計量表示になり、boost時間に沿う移動が計量を保つことも分かります。

以下の $\partial_\eta$ は $\rho,y,z$ を固定した微分であり、$\partial_t,\partial_x$ はそれぞれ他のMinkowski座標を固定した微分です。したがって二つの座標表示の関係に連鎖律を適用すると

$$
\partial_\eta
=\frac{\partial t}{\partial\eta}\partial_t
+\frac{\partial x}{\partial\eta}\partial_x
$$

と計算します。

<a id="prop-qcurv7-metric"></a>

<!-- formal-statement-start -->
> **命題（Rindler計量と地平線）**
> [上のRindler座標](#def-qcurv7-wedges)において、左右いずれのくさびでも

$$
ds^2=-a^2\rho^2d\eta^2+d\rho^2+dy^2+dz^2
$$

> となる。右くさびのnull座標とboost生成子には

$$
U=-\rho e^{-a\eta},\qquad V=\rho e^{a\eta},
\qquad K=x\partial_t+t\partial_x
$$

> の関係があり、境界は $U=0$ または $V=0$ のnull面に沿う。両くさびで

$$
\partial_\eta=aK,\qquad g(K,K)=-\rho^2
$$

> が成り立つ。$\rho=0$ は座標領域外の地平線への境界で、Minkowski時空の曲率特異点ではない。
<!-- formal-statement-end -->

### 証明の見取り図

$dt,dx$ を一回微分して交差項が消えることを確かめます。次に $U,V$ の符号と、$\eta$ 微分のベクトル場を調べます。

<!-- proof-start -->
### 証明

右で

$$
\begin{aligned}
dt&=\sinh(a\eta)d\rho+a\rho\cosh(a\eta)d\eta,\\
dx&=\cosh(a\eta)d\rho+a\rho\sinh(a\eta)d\eta.
\end{aligned}
$$

したがって $-dt^2+dx^2$ の $d\rho^2$ 係数は $\cosh^2-\sinh^2=1$、交差項は $-2a\rho\sinh\cosh+2a\rho\cosh\sinh=0$、$d\eta^2$ 係数は $-a^2\rho^2(\cosh^2-\sinh^2)=-a^2\rho^2$ です。左は $dt,dx$ の両方に負号が付くだけなので同じ計量を得ます。

右では $\sinh q-\cosh q=-e^{-q}$、$\sinh q+\cosh q=e^q$ を用いて

$$
U=-\rho e^{-a\eta},\qquad V=\rho e^{a\eta}
$$

です。$R$ 内で $U$ は負、$V$ は正です。$U=0$ は $t=x$、$V=0$ は $t=-x$ という光的な境界を与えます。左でも $U=\rho e^{-a\eta}$、$V=-\rho e^{a\eta}$ を得ます。

計量係数は $\eta$ に依存しないので、$\partial_\eta$ に沿う座標の平行移動は計量を保存します。最後に右で

$$
\partial_\eta
=a\rho\cosh(a\eta)\partial_t
+a\rho\sinh(a\eta)\partial_x
=a(x\partial_t+t\partial_x)
$$

を得ます。左も各座標の二つの負号によって同じ関係です。$g(K,K)=-x^2+t^2=-\rho^2$。元のMinkowski計量の曲率は零なので、$g(\partial_\eta,\partial_\eta)\to0$ は計量の曲率発散を意味しません。
<!-- proof-end -->

ここで「地平線」は、$R$ の観測者が使う時間発展の領域境界を指します。例えば $R$ 内から過去向きにたどった $V=0$ と未来向きに近づく $U=0$ は別の境界です。有限の $\eta$ で $\rho=0$ を座標点として加えることはできず、右・左・未来・過去の四領域を一つの $(\eta,\rho)$ で覆うこともできません。

## 2. 同じboost時間でも時計の進み方は異なる

Rindler座標で「静止」とは $\rho,y,z$ が一定という意味です。Minkowski慣性座標で静止しているわけではありません。$ds^2=-a^2\rho^2d\eta^2$ に沿って固有時間は $d\tau=a\rho\,d\eta$ です。右くさびでは $\eta$ が未来向きに増加しますが、左では逆です。

<a id="def-qcurv7-observer"></a>

<!-- formal-statement-start -->
> **定義（Rindler静止観測者とboost時間）**
> [右Rindlerくさび](#def-qcurv7-wedges)でRindler空間座標を一定にした曲線

$$
\rho=\rho_0>0,\qquad y=y_0,\qquad z=z_0
$$

> を右のRindler静止観測者と呼ぶ。boost時間を生成する場は $K=x\partial_t+t\partial_x$ であるが、固有時間とは異なる。加法定数を0として未来向き固有時間は、右と左でそれぞれ

$$
\tau_R=a\rho_0\eta,\qquad \tau_L=-a\rho_0\eta
$$

> と取る。
<!-- formal-statement-end -->

<!-- definition-example-start: def-qcurv7-observer -->
### 直接例：尺度の選択

$\rho_0=1/a$ の右の軌道だけは $\tau=\eta$ です。$\rho_0=2/a$ なら $\tau=2\eta$ となり、同じ $\eta$ の増分で二倍の固有時間が経過します。左では $t=-\rho_0\sinh(a\eta)$ より $dt/d\eta=-a\rho_0\cosh(a\eta)<0$。したがって $\eta$ が増加する方向は過去向きであり、未来向きの時計には $-\eta$ が必要です。世界線の接ベクトルの向きも確認したので、単なる座標の符号の約束ではありません。

**定義の確認**：$\rho_0$ を正の定数に保つ静止条件、右の固有時間の倍率 $a\rho_0$、左の未来向きへ反転する符号をそれぞれ検査しました。
<!-- definition-example-end -->

<a id="prop-qcurv7-acceleration"></a>

<!-- formal-statement-start -->
> **命題（固有加速度の計量符号整合）**
> 計量 $(-,+,+,+)$ のMinkowski時空で、右くさびの[静止軌道](#def-qcurv7-observer)を未来向き固有時間 $\tau$ で表示すると

$$
X(\tau)=\left(\rho_0\sinh(\tau/\rho_0),
\rho_0\cosh(\tau/\rho_0),y_0,z_0\right)
$$

> である。四元速度と四元加速度を $u=dX/d\tau$、$A=du/d\tau$ とすれば

$$
g(u,u)=-1,\qquad g(u,A)=0,\qquad g(A,A)=\rho_0^{-2}
$$

> を満たす。固有加速度の大きさは $1/\rho_0$ で、尺度 $a$ ではなく軌道の半径が決める。
<!-- formal-statement-end -->

### 証明の見取り図

$a\eta=\tau/\rho_0$ を代入し、二回微分してMinkowski内積を直接取ります。

<!-- proof-start -->
### 証明

$\eta=\tau/(a\rho_0)$ を[右Rindler座標](#def-qcurv7-wedges)の写像へ代入して世界線の表示を得ます。$q=\tau/\rho_0$ と置けば

$$
u=(\cosh q,\sinh q,0,0),\qquad
A=\frac{1}{\rho_0}(\sinh q,\cosh q,0,0).
$$

したがって

$$
\begin{aligned}
g(u,u)&=-\cosh^2q+\sinh^2q=-1,\\
g(u,A)&=\rho_0^{-1}(-\cosh q\sinh q+\sinh q\cosh q)=0,\\
g(A,A)&=\rho_0^{-2}(-\sinh^2q+\cosh^2q)=\rho_0^{-2}.
\end{aligned}
$$

$u^0=\cosh q>0$ だから未来向きです。一定の $\rho_0$ でも加速度は非零で、$\rho_0\to\infty$ に向かうほど小さくなります。
<!-- proof-end -->

一定の座標加速度 $d^2x/dt^2$ と固有加速度は異なります。この軌道で $x^2-t^2=\rho_0^2$、$dx/dt=\tanh(\tau/\rho_0)$、$d^2x/dt^2=\rho_0^{-1}\cosh^{-3}(\tau/\rho_0)$ であり、座標加速度は一定ではありません。

## 3. どの振動を「正のエネルギー」と呼ぶか

[QCURV2のKlein–Gordon内積](../QCURV2/index.md#def-qcurv2-kg-pairing)は解の保存内積です。しかし「正振動数」の意味は、時間方向を何に選ぶかで異なります。右では $\partial_\eta$ が未来向き時間的、左では過去向き時間的です。

まず右くさびで $m\ge0$ の自由スカラー場の方程式 $(-\Box+m^2)\phi=0$ を考えます。$x_\perp=(y,z)$、横方向波数 $k_\perp=(k_y,k_z)$、$\kappa^2=m^2+|k_\perp|^2$ とします。

この節の $u$ は前節の四元速度ではなく**場の複素モード**です。動径関数 $f=f(\rho)$ の $f',f''$ は、それぞれ $\rho$ に関する一階・二階の通常の導関数を表します。

<a id="def-qcurv7-modes"></a>

<!-- formal-statement-start -->
> **定義（Rindler正振動数モード）**
> 右Rindlerくさびにおいて、自由Klein–Gordon方程式の複素解のうち、boost時間依存が

$$
u_{\omega,k_\perp}(\eta,\rho,x_\perp)
=e^{-i\omega\eta+i k_\perp\cdot x_\perp}f_{\omega,k_\perp}(\rho),
\qquad \omega>0
$$

> と書けるものを正のRindler振動数 $\omega$ を持つ（一般化）モードと呼ぶ。$f$ には方程式、くさび内の適切な境界・規格化条件を課す。左くさびでは未来向き時間が $-\eta$ なので、未来向き正振動数の時間因子は $e^{+i\omega\eta}$ とする。単一の連続スペクトルモードはデルタ規格化であり、正規化可能な一粒子状態は波束から作る。
<!-- formal-statement-end -->

<!-- definition-example-start: def-qcurv7-modes -->
### 直接例：時間因子とKG内積

$m=0$、$k_\perp=0$、$\omega>0$ とし、右くさびの $U=-\rho e^{-a\eta}<0$ から

$$
u(\eta,\rho)=e^{-i\omega\eta}(a\rho)^{i\omega/a}
=(-aU)^{i\omega/a}
$$

を考えます。$-aU>0$ なので複素冪は実対数を用いて滑らかに定まります。$U=t-x,V=t+x$ の連鎖律から、$\partial_t=\partial_U+\partial_V$、$\partial_x=-\partial_U+\partial_V$ です（$\partial_U$ は $V,y,z$ を固定する微分）。よって

$$
\Box=-\partial_t^2+\partial_x^2+\partial_y^2+\partial_z^2
=-4\partial_U\partial_V+\partial_y^2+\partial_z^2.
$$

$u$ は $U$ だけの関数なので $\Box u=0$、自由質量零場の方程式を満たします。さらに $i\partial_\eta u=\omega u$ です。

右で未来向き単位法線は $n=(a\rho)^{-1}\partial_\eta$。よって[KG内積の定義](../QCURV2/index.md#def-qcurv2-kg-pairing)の局所的な密度は

$$
i\{u^*n(u)-n(u^*)u\}
=\frac{2\omega}{a\rho}|u|^2>0.
$$

この例は横方向・動径方向に規格化できない**一般化モード**であり、正規化可能な波束と同一視しません。左で同じ時間因子を使うと $n=-(a\rho)^{-1}\partial_\eta$ なので密度は負になります。左の未来向き正振動数は $e^{+i\omega\eta}$ であり、これなら密度が正です。くさびをまたいで同じ $\eta$ の符号を機械的に使ってはいけません。

**定義の確認**：右での自由場方程式、正の $\omega$ と時間因子、右の未来向きKG符号を具体解で確認し、単一モードの規格化が分布的であるという条件も区別しました。
<!-- definition-example-end -->

<a id="prop-qcurv7-modes"></a>

<!-- formal-statement-start -->
> **命題（Rindlerモード方程式とKG符号）**
> [Rindler計量](#prop-qcurv7-metric)上の自由場 $(-\Box+m^2)\phi=0$ に対して、[分離形](#def-qcurv7-modes)の動径関数 $f$ は

$$
f''(\rho)+\frac1\rho f'(\rho)
+\left(\frac{\omega^2}{a^2\rho^2}-\kappa^2\right)f(\rho)=0,
\qquad \kappa^2=m^2+|k_\perp|^2
$$

> を満たす。右の $\eta=\mathrm{const.}$ 面で、十分な減衰・境界条件を満たす正振動数解のKG規格化密度は $2\omega |u|^2/(a\rho)$ で正、左では未来向き周波数を反転したとき正となる。$\kappa=0$ なら動径の独立解は $\rho^{\pm i\omega/a}$ であり、$\rho\to0$ の振動は直ちに時空の曲率特異性を意味しない。
<!-- formal-statement-end -->

### 証明の見取り図

計量行列式から $\Box$ を作り、時間・横方向の偏微分を分離形へ代入します。最後に正のKG密度を未来向き法線の符号から確認します。

<!-- proof-start -->
### 証明

座標基底 $(\partial_\eta,\partial_\rho,\partial_y,\partial_z)$ で、線素の各二次係数を計量行列へ並べます。混合項は零なので

$$
(g_{\mu\nu})=\operatorname{diag}(-a^2\rho^2,1,1,1),\qquad
\det(g_{\mu\nu})=-a^2\rho^2<0,\qquad
\sqrt{|\det g|}=a\rho
$$

です。$a,\rho>0$ だから非退化なLorentz計量で、[QCURV1のKlein–Gordon作用素の座標表示](../QCURV1/index.md#prop-qcurv1-kg-coordinate)の仮定に合います。逆計量の非零成分は $g^{\eta\eta}=-1/(a^2\rho^2)$、$g^{\rho\rho}=g^{yy}=g^{zz}=1$ です。従って

$$
\begin{aligned}
\Box\phi
&=\frac1{a\rho}\partial_\mu\!\left(a\rho g^{\mu\nu}\partial_\nu\phi\right)\\
&=-\frac1{a^2\rho^2}\partial_\eta^2\phi
+\frac1\rho\partial_\rho(\rho\partial_\rho\phi)
+\partial_y^2\phi+\partial_z^2\phi.
\end{aligned}
$$

$\partial_\eta^2u=-\omega^2u$、$(\partial_y^2+\partial_z^2)u=-|k_\perp|^2u$ を代入し、非零の時間・横因子で割ると

$$
\frac{\omega^2}{a^2\rho^2}f
+f''+\frac1\rho f'-|k_\perp|^2f-m^2f=0.
$$

右の面の誘導体積は $d\Sigma=d\rho\,dy\,dz$、未来向き法線は $n=(a\rho)^{-1}\partial_\eta$ です。[保存内積の定義](../QCURV2/index.md#def-qcurv2-kg-pairing)を使うと

$$
(u,u)_{\mathrm{KG}}
=\frac{2\omega}{a}\int_0^\infty\frac{d\rho}{\rho}
\int_{\mathbb R^2}dy\,dz\,|u|^2.
$$

これはモードの形式的なデルタ規格化を表す式です。厳密な規格化を持つ波束では収束・境界条件を別に確認します。左で $n$ の向きと時間因子を同時に反転すれば同じ正の密度を得ます。最後に $\kappa=0$ で $f=\rho^p$ を試すと $p(p-1)+p+\omega^2/a^2=0$、すなわち $p=\pm i\omega/a$ です。
<!-- proof-end -->

$\kappa>0$ の動径モードは上の微分方程式の適切な解を選ぶ必要があり、$\rho^{\pm i\omega/a}$ だけで遠方までの完全系を作れるわけではありません。また $\partial_\eta$ は $R$ で時間的でも、$R$ の外では必ずしも時間的ではありません。**Rindler正振動数**とMinkowskiの**慣性時間 $t$ の正振動数**は、異なる状態選択につながる概念です。

## 4. Minkowski真空を右くさびに持ち込む

検出器は自分がアクセスできる $R$ 内の場とだけ相互作用できます。しかし、状態を「$R$ の正振動数で選ぶ」のと「全Minkowski時空の真空を $R$ に制限する」のは異なる操作です。後者では元の状態の二点分布を $R\times R$ の試験関数で評価するだけで、新しい真空を選び直しません。

[QCURV2の二点分布](../QCURV2/index.md#def-qcurv2-wightman)を用います。以下、明示計算は**4次元・質量零・自由実スカラー場のMinkowski真空**に限定します。時間の $i0$ は正周波数境界値の分布処方であり、実数を単に0で割るという意味ではありません。

二点分布の具体式は、[QCURV6で用いた質量零の正振動数平面波表示](../QCURV6/index.md#prop-qcurv6-inertial-spectrum)を一般の時空差へ適用して確認できます。$\Delta t=t-t'$、$\boldsymbol r=(x-x',y-y',z-z')$、$r=|\boldsymbol r|>0$ と置き、$\epsilon>0$ により各周波数へ $e^{-\epsilon|\boldsymbol k|}$ を掛けます。角度積分

$$
\int_{S^2}e^{ikr\cos\theta}d\Omega=\frac{4\pi\sin(kr)}{kr}
$$

を使うと

$$
\begin{aligned}
W_{M,\epsilon}(X,X')
&=\int\frac{d^3\boldsymbol k}{(2\pi)^3\,2|\boldsymbol k|}
e^{-i|\boldsymbol k|\Delta t-\epsilon|\boldsymbol k|+i\boldsymbol k\cdot\boldsymbol r}\\
&=\frac1{4\pi^2r}\int_0^\infty e^{-(\epsilon+i\Delta t)k}\sin(kr)\,dk\\
&=\frac1{4\pi^2\{r^2-(\Delta t-i\epsilon)^2\}}.
\end{aligned}
$$

最後の積分は $\operatorname{Re}(\epsilon+i\Delta t)>0$ の下で、$\int_0^\infty e^{-zk}\sin(kr)\,dk=r/(z^2+r^2)$ を使いました。$\epsilon\downarrow0$ の分布極限が次の式で、$r=0$ にも分布として延長します。

<a id="def-qcurv7-restriction"></a>

<!-- formal-statement-start -->
> **定義（Minkowski真空のくさび制限）**
> 4次元Minkowski時空上の質量零自由実スカラー場のMinkowski真空 $\omega_M$ と、そのWightman二点分布 $W_M$ を固定する。右くさび $R$ に支持を持つ試験関数 $f,g\in C_c^\infty(R)$ について、制限状態の二点分布を

$$
W_R(f,g)=W_M(f,g)
$$

> と定める。慣性座標で

$$
W_M(X,X')
=-\frac1{4\pi^2}\lim_{\epsilon\downarrow0}
\frac1{(t-t'-i\epsilon)^2-(x-x')^2-|x_\perp-x'_\perp|^2}
$$

> である（極限は分布の意味）。同様に左くさび $L$ にも制限できる。これはくさびのboost正振動数から新しく定める真空の定義ではない。
<!-- formal-statement-end -->

<!-- definition-example-start: def-qcurv7-restriction -->
### 直接例：同時刻・右くさびの二点

$X=(0,2,0,0)$、$X'=(0,3,0,0)$ はともに $R$ 内にあり、空間距離は1です。したがって

$$
W_R(X,X')=-\frac1{4\pi^2(0-1)}=\frac1{4\pi^2}.
$$

ここでは二点間のMinkowski間隔二乗が $-\Delta t^2+|\Delta\boldsymbol x|^2=1>0$ で**空間的に分離**しているため、分布核を滑らかな関数として評価できます。二点が異なるだけでは十分ではなく、光的に分離する異なる二点には特異性があります。

試験関数 $f\in C_c^\infty(R)$ を $R$ の外で零に延長した関数を $\widetilde f$ とします。支持が $R$ の内部でコンパクトなので、この延長も滑らかです。[二点分布の正値性](../QCURV2/index.md#prop-qcurv2-wightman-properties)を適用すると

$$
W_R(\bar f,f)=W_M(\overline{\widetilde f},\widetilde f)\ge0
$$

となり、制限状態の正値性も確かめられます。ただし $W_R(X,X)$ はこの操作では定義されず、異なる正振動数選択の真空と同一であることも従いません。

**定義の確認**：二点は $R$ 内で、間隔二乗が正なので分布核は滑らかに評価できます。コンパクト支持の試験関数へ拡張した制限は元の正値性を引き継ぎ、対角・光的分離での点評価や新たな真空選択を含まないことも確認しました。
<!-- definition-example-end -->

具体的な等加速度世界線で二点分布を評価すると、$t$ と $\eta$ の時間選択が異なることを式で見られます。

<a id="prop-qcurv7-wightman"></a>

<!-- formal-statement-start -->
> **命題（Minkowski二点分布の等加速度引戻し）**
> 上の質量零Minkowski真空と、[右Rindler静止観測者](#def-qcurv7-observer)の未来向き固有時間軌道 $X(\tau)$ を取る。$s=\tau-\tau'$、固有加速度 $\alpha=1/\rho_0>0$ とすると、引戻しは分布として

$$
w_{\rho_0}(s)
=-\frac{\alpha^2}{16\pi^2}
\frac1{\sinh^2\!\left(\frac{\alpha(s-i0)}2\right)}
$$

> である。この二点分布は固有時間差だけに依存して定常的で、$\alpha\to0$ の固定 $s$ の極限ではMinkowski慣性静止軌道の $-1/[4\pi^2(s-i0)^2]$ を回復する。$s=0$ での値を通常の関数として評価してはならない。
<!-- formal-statement-end -->

### 証明の見取り図

双曲線上の二点のMinkowski間隔を先に計算し、Wightmanの正周波数境界値を保って分母へ代入します。短距離では $\sinh z$ を展開します。

<!-- proof-start -->
### 証明

$q=\tau/\rho_0$、$q'=\tau'/\rho_0$ とすると

$$
\begin{aligned}
(\Delta t)^2-(\Delta x)^2
&=\rho_0^2\{(\sinh q-\sinh q')^2
-(\cosh q-\cosh q')^2\}\\
&=2\rho_0^2(\cosh(q-q')-1)\\
&=4\rho_0^2\sinh^2\!\left(\frac{\tau-\tau'}{2\rho_0}\right).
\end{aligned}
$$

二行目では $\cosh^2q-\sinh^2q=1$ と $\cosh(q-q')=\cosh q\cosh q'-\sinh q\sinh q'$ を使いました。$y,z$ は一定です。$\Delta t=2\rho_0\cosh((q+q')/2)\sinh((q-q')/2)$ なので、$\Delta t$ と $s$ は同符号です。

ただし、これだけで分布の $i0$ を代入できるわけではありません。[正周波数の平面波表示](../QCURV6/index.md#prop-qcurv6-inertial-spectrum)に基づき、$\tau$ を $\tau-i\delta$（$0<\delta<\pi\rho_0$）へ動かすと

$$
\operatorname{Im}X(\tau-i\delta)
=-\rho_0\sin(\delta/\rho_0)(\cosh q,\sinh q,0,0)
$$

は未来向き四元速度の負の倍数です。正エネルギーの平面波（$\omega=|\boldsymbol k|>0$）には

$$
\exp\!\left[-\rho_0\sin(\delta/\rho_0)
(\omega\cosh q-k_x\sinh q)\right]
$$

という減衰因子が掛かり、$\omega\cosh q-k_x\sinh q\ge\omega(\cosh q-|\sinh q|)>0$ です。よってこの複素化は正周波数の分布境界値を保ちます。複素化した二点間隔は

$$
(\Delta t_\delta)^2-(\Delta x_\delta)^2
=4\rho_0^2\sinh^2\!\left(\frac{s-i\delta}{2\rho_0}\right).
$$

この境界値を $\delta\downarrow0$ として取ることが $s-i0$ の意味です。これを[二点分布](#def-qcurv7-restriction)へ代入すると

$$
w_{\rho_0}(s)
=-\frac1{16\pi^2\rho_0^2}
\frac1{\sinh^2((s-i0)/(2\rho_0))}.
$$

$\alpha=1/\rho_0$ を使えば命題の表示です。$s$ だけへの依存は定常性を示します。$z\to0$ では $\sinh z=z+z^3/6+O(z^5)$ なので

$$
\frac1{\sinh^2z}=\frac1{z^2}-\frac13+O(z^2),\qquad
w_{\rho_0}(s)
=-\frac1{4\pi^2(s-i0)^2}+\frac{\alpha^2}{48\pi^2}+O(\alpha^4s^2)
$$

を対角から離れた領域で得て、分布境界値としても慣性極限が成立します。
<!-- proof-end -->

慣性軌道の二点分布と加速軌道のものは同じではありません。特に二点分布が定常であることと、検出器の正負ギャップの遷移率が熱平衡の比を満たすことは**別の主張**です。後者には[QCURV6の遷移率](../QCURV6/index.md#def-qcurv6-stationary-rate)とそのFourier積分、状態の解析的構造をさらに調べる必要があります。

## 5. 右くさびだけの観測と左くさびの相関

右の観測者は左の場と直接相互作用できなくても、全時空のMinkowski真空の二点相関が左右にまたがっていることは計算できます。これは制限状態を「右の正振動数モードだけの真空」に置き換える根拠にはなりません。

<a id="prop-qcurv7-cross"></a>

<!-- formal-statement-start -->
> **命題（右左くさびにまたがるMinkowski真空の相関）**
> 上の4次元質量零Minkowski真空において、$\rho_R,\rho_L>0$ とし、$X_R=(0,\rho_R,0,0)\in R$、$X_L=(0,-\rho_L,0,0)\in L$ とする。この二点は空間的に分離され、

$$
W_M(X_R,X_L)=\frac1{4\pi^2(\rho_R+\rho_L)^2}>0
$$

> である。これは左右のくさび間に二点相関がある具体例であるが、**この値が非零という事実だけ**で、熱性や量子エンタングルメントの一般判定が完了したとは言えない。
<!-- formal-statement-end -->

### 証明の見取り図

二点間の時差は零、空間距離は $\rho_R+\rho_L$ なので、Wightman分母を直接評価します。

<!-- proof-start -->
### 証明

$\Delta t=0$、$\Delta x=\rho_R+\rho_L$、$\Delta y=\Delta z=0$ です。計量 $(-,+,+,+)$ における間隔二乗は

$$
-\Delta t^2+\Delta x^2+\Delta y^2+\Delta z^2
=(\rho_R+\rho_L)^2>0
$$

なので空間的分離です。[二点分布](#def-qcurv7-restriction)の分母は $-(\rho_R+\rho_L)^2$ であり、前の負号と相殺して表示した正の値になります。
<!-- proof-end -->

対照として、右くさび内の場の観測量は $R$ に支持する試験関数で定義され、その期待値は元のMinkowski真空の制限から一意に定まります。一方、左を捨てたからといって二点関数を零にしたり、Rindler正振動数から真空を選び直したりするのは別の操作です。

## 6. 何を確かめ、何をまだ確かめていないか

| 対象 | この章で計算したもの | この章だけでは言えないもの |
| --- | --- | --- |
| 幾何 | 右左くさび、null境界、boost時間、固有加速度 | 曲率特異点や重力による真の曲率生成 |
| モード | Rindler正振動数の時間因子とKG符号、分離方程式 | 左右両くさびを合わせた全モードのBogoliubov係数 |
| 状態 | Minkowski真空のくさび制限、加速軌道の二点分布 | この制限がどの温度のKMS状態か |
| 検出器 | 定常二点分布という応答計算の出発点 | 正負ギャップの率の比とUnruh温度 |

したがって「加速度があるから粒子数が何個ある」という一文にはできません。粒子数のモード、加速器の応答、くさびへ制限した状態を別々に指定して初めて比較できます。

## 演習

### Level A：領域・時計・時間向きを手で確かめる

<a id="ex-qcurv7-a01"></a>
#### QCURV7-A01 くさびの逆座標

- Level: A
- 問題: 計量 $(-,+,+,+)$ のMinkowski時空で、$a=2$ とする。$X=(t,x,y,z)=(3,5,0,0)$ が[どのくさび](#def-qcurv7-wedges)に属するか判定し、$\rho,\eta,U,V$ を求めよ。$X'=(-3,-5,0,0)$ も同様に判定せよ。

<!-- solution-start -->
**詳細解答**：$X$ は $5>|3|$ により右くさびです。$\rho=\sqrt{x^2-t^2}=\sqrt{25-9}=4$、$t/x=3/5$ なので $\eta=\frac12\operatorname{artanh}(3/5)=\frac14\log\{(1+3/5)/(1-3/5)\}=\frac14\log4=\frac12\log2$ です。$U=t-x=-2$、$V=t+x=8$ と符号も右の条件 $U<0<V$ に一致します。

$X'$ は $-5<-|-3|$ により左くさびです。$\rho=4$、$t/x=(-3)/(-5)=3/5$ から $\eta=\frac12\log2$、$U=-3-(-5)=2$、$V=-3+(-5)=-8$ です。左での未来向きは $-\eta$ なので、座標値が同じでも時間の向きは違います。
<!-- solution-end -->

<a id="ex-qcurv7-a02"></a>
#### QCURV7-A02 交差項を省略しない計量計算

- Level: A
- 問題: 右くさびで $t=\rho\sinh(a\eta)$、$x=\rho\cosh(a\eta)$、$a>0$ とする。$-dt^2+dx^2$ を展開し、$d\rho\,d\eta$ の係数も表示して求めよ。

<!-- solution-start -->
**詳細解答**：$dt=\sinh(a\eta)d\rho+a\rho\cosh(a\eta)d\eta$、$dx=\cosh(a\eta)d\rho+a\rho\sinh(a\eta)d\eta$ です。$-dt^2$ の交差項は $-2a\rho\sinh(a\eta)\cosh(a\eta)d\rho d\eta$、$dx^2$ のものは $+2a\rho\cosh(a\eta)\sinh(a\eta)d\rho d\eta$ で零になります。$d\rho^2$ 係数は $\cosh^2-\sinh^2=1$、$d\eta^2$ 係数は $-a^2\rho^2(\cosh^2-\sinh^2)=-a^2\rho^2$。従って $-dt^2+dx^2=d\rho^2-a^2\rho^2d\eta^2$ です。
<!-- solution-end -->

<a id="ex-qcurv7-a03"></a>
#### QCURV7-A03 座標尺度と固有加速度

- Level: A
- 問題: 右Rindlerくさびで $a=3$、$\rho_0=2$、$y=z=0$ の静止軌道を考える。$\tau$ と $\eta$ の関係、四元速度 $u(\tau)$、四元加速度 $A(\tau)$、その大きさを求めよ。

<!-- solution-start -->
**詳細解答**：軌道では $d\tau=a\rho_0d\eta=6d\eta$ なので $\tau=6\eta$ と取れます。$a\eta=\tau/\rho_0=\tau/2$ より $X(\tau)=(2\sinh(\tau/2),2\cosh(\tau/2),0,0)$。微分して $u=(\cosh(\tau/2),\sinh(\tau/2),0,0)$、$A=(\sinh(\tau/2)/2,\cosh(\tau/2)/2,0,0)$ を得ます。$g(A,A)=(-\sinh^2+\cosh^2)/4=1/4$ なので固有加速度は $1/2$ です。座標尺度 $a=3$ と取り違えません。
<!-- solution-end -->

<a id="ex-qcurv7-a04"></a>
#### QCURV7-A04 null境界への近づき方

- Level: A
- 問題: 右くさびの $U=-\rho e^{-a\eta}$、$V=\rho e^{a\eta}$ を使い、$V=v_0>0$ を一定に保って $\eta\to+\infty$ とすると、$(U,V,\rho)$ がどこへ収束するか示せ。$\rho$ を一定に保つ極限との違いも述べよ。

<!-- solution-start -->
**詳細解答**：$V=v_0$ から $\rho=v_0e^{-a\eta}$ です。これを $U$ に入れると $U=-v_0e^{-2a\eta}\to0^-$、$\rho\to0^+$、$V=v_0$ です。従って $(U,V)=(0,v_0)$、すなわち $t=x=v_0/2>0$ の右くさびの未来のnull境界へ近づきます。これに対して $\rho$ 一定で $\eta\to+\infty$ なら $U\to0^-$ ですが $V=\rho e^{a\eta}\to+\infty$ で、**有限の**境界点には収束しません。境界を一個の $\rho=0$ の座標点で表せない理由でもあります。
<!-- solution-end -->

<a id="ex-qcurv7-a05"></a>
#### QCURV7-A05 左くさびの未来向き

- Level: A
- 問題: 左くさびで $t=-\rho_0\sinh(a\eta)$、$x=-\rho_0\cosh(a\eta)$、$a,\rho_0>0$ とする。$\partial_\eta$ が過去向きであることを示し、未来向き固有時間 $\tau$ で表す四元速度の時間成分が正であることを確かめよ。

<!-- solution-start -->
**詳細解答**：固定 $\rho_0$ に沿い $dt/d\eta=-a\rho_0\cosh(a\eta)<0$ なので、$\eta$ 増加はMinkowski時間が減る方向です。計量から $d\tau=-a\rho_0d\eta$ を選び、$\tau=-a\rho_0\eta$ とすると、$a\eta=-\tau/\rho_0$。よって世界線は $X(\tau)=(\rho_0\sinh(\tau/\rho_0),-\rho_0\cosh(\tau/\rho_0),0,0)$ で、四元速度は $u=(\cosh(\tau/\rho_0),-\sinh(\tau/\rho_0),0,0)$。$u^0>0$、$g(u,u)=-1$ の両方を満たします。
<!-- solution-end -->

### Level B：場の方程式・内積・二点分布

<a id="ex-qcurv7-b01"></a>
#### QCURV7-B01 Rindler動径方程式を導く

- Level: B
- 問題: $ds^2=-a^2\rho^2d\eta^2+d\rho^2+dy^2+dz^2$、$a,\rho>0$ で、自由場は $(-\Box+m^2)\phi=0$、$m\ge0$ を満たす。$u=e^{-i\omega\eta+i(k_yy+k_zz)}f(\rho)$、$\omega>0$ として $f$ の方程式を出し、$m=k_y=k_z=0$ の場合の独立な局所解を求めよ。

<!-- solution-start -->
**詳細解答**：逆計量は $g^{\eta\eta}=-1/(a^2\rho^2)$、他の対角成分は1、$\sqrt{|g|}=a\rho$ です。従って $\Box=-\partial_\eta^2/(a^2\rho^2)+\rho^{-1}\partial_\rho(\rho\partial_\rho)+\partial_y^2+\partial_z^2$。分離形に代入すると $\partial_\eta^2u=-\omega^2u$、$\partial_y^2u+\partial_z^2u=-(k_y^2+k_z^2)u$ なので

$$
f''+\rho^{-1}f'+\left(\frac{\omega^2}{a^2\rho^2}-m^2-k_y^2-k_z^2\right)f=0.
$$

$m=k_y=k_z=0$ なら $f=\rho^p$ と置き、$p(p-1)\rho^{p-2}+p\rho^{p-2}+(\omega/a)^2\rho^{p-2}=0$。よって $p^2+(\omega/a)^2=0$、独立解は $\rho^{i\omega/a}$ と $\rho^{-i\omega/a}$ です。これは局所解であり、全空間の正規化済み完全系を示したわけではありません。
<!-- solution-end -->

<a id="ex-qcurv7-b02"></a>
#### QCURV7-B02 正振動数とKG内積の符号

- Level: B
- 問題: $a>0$、$\omega>0$ とし、右くさびで $u=e^{-i\omega\eta}F(\rho,y,z)$、左で $v=e^{+i\omega\eta}G(\rho,y,z)$ を考える。それぞれ $\eta=\mathrm{const.}$ 面の未来向き単位法線を求め、[KG内積](../QCURV2/index.md#def-qcurv2-kg-pairing)の密度が正であることを確認せよ。$v$ の時間因子を $e^{-i\omega\eta}$ に変えたらどうなるか。

<!-- solution-start -->
**詳細解答**：計量の $g_{\eta\eta}=-a^2\rho^2$ により、単位時間的な接ベクトルは $\pm(a\rho)^{-1}\partial_\eta$ です。右では $dt/d\eta>0$ なので $n_R=(a\rho)^{-1}\partial_\eta$、左では $dt/d\eta<0$ なので $n_L=-(a\rho)^{-1}\partial_\eta$ を未来向きに選びます。右のKG密度は

$$
i(u^*n_Ru-(n_Ru^*)u)
=i\left(-\frac{i\omega}{a\rho}|u|^2-\frac{i\omega}{a\rho}|u|^2\right)
=\frac{2\omega}{a\rho}|u|^2.
$$

左では $n_Lv=-(a\rho)^{-1}(+i\omega v)=-i\omega v/(a\rho)$ なので同じ $\frac{2\omega}{a\rho}|v|^2$ を得ます。左で $e^{-i\omega\eta}$ を使うと $n_Lv=+i\omega v/(a\rho)$ となり、密度は $-2\omega|v|^2/(a\rho)$。一つの連続スペクトルモードの全積分は通常デルタ規格化なので、ここでは密度と符号を主張しています。
<!-- solution-end -->

<a id="ex-qcurv7-b03"></a>
#### QCURV7-B03 加速世界線の二点分布と短距離

- Level: B
- 問題: 4次元質量零Minkowski真空の[二点分布](#def-qcurv7-restriction)と、$\rho_0>0$ の右Rindler静止軌道 $X(\tau)=(\rho_0\sinh(\tau/\rho_0),\rho_0\cosh(\tau/\rho_0),0,0)$ を取る。二点の間隔二乗を導き、$s=\tau-\tau'$ について $w_{\rho_0}(s)$ を求め、$|s|\ll\rho_0$ での最初の二項を示せ。

<!-- solution-start -->
**詳細解答**：$q=\tau/\rho_0$、$q'=\tau'/\rho_0$ と書くと

$$
\begin{aligned}
(\Delta t)^2-(\Delta x)^2
&=\rho_0^2\{(\sinh q-\sinh q')^2-(\cosh q-\cosh q')^2\}\\
&=2\rho_0^2\{\cosh(q-q')-1\}
=4\rho_0^2\sinh^2((q-q')/2).
\end{aligned}
$$

ここで $\cosh(q-q')=\cosh q\cosh q'-\sinh q\sinh q'$ を使用しました。時間差

$$
\Delta t=2\rho_0\cosh((q+q')/2)\sinh((q-q')/2)
$$

は $s$ と同符号です。さらに $\tau\mapsto\tau-i\delta$ と複素化したとき、$u(\tau)=dX/d\tau$ として

$$
\operatorname{Im}X(\tau-i\delta)=-\rho_0\sin(\delta/\rho_0)u(\tau)
$$

は過去向き時間的です。このため[正周波数の引戻し](#prop-qcurv7-wightman)と同じ境界値を $\delta\downarrow0$ で取り、

$$
w_{\rho_0}(s)=-\frac1{16\pi^2\rho_0^2\sinh^2((s-i0)/(2\rho_0))}.
$$

$\sinh z=z+z^3/6+O(z^5)$ から $\sinh^2z=z^2(1+z^2/3+O(z^4))$、逆数は $z^{-2}-1/3+O(z^2)$。従って対角から離れて

$$
w_{\rho_0}(s)=-\frac1{4\pi^2(s-i0)^2}+\frac1{48\pi^2\rho_0^2}+O(s^2/\rho_0^4).
$$

先頭は慣性真空の短距離特異性、次項は軌道の加速度に依存する有限差です。
<!-- solution-end -->

<a id="ex-qcurv7-b04"></a>
#### QCURV7-B04 左右相関とくさび制限

- Level: B
- 問題: 4次元質量零Minkowski真空で $X_R=(0,1,0,0)\in R$、$X_L=(0,-2,0,0)\in L$ とする。二点が空間的に分離していることを確かめ、$W_M(X_R,X_L)$ を計算せよ。これが非零だからといって、どの量の熱的詳細釣合いを証明できたことにはならないか説明せよ。

<!-- solution-start -->
**詳細解答**：$\Delta t=0$、$\Delta x=1-(-2)=3$、$\Delta y=\Delta z=0$ なので間隔二乗は $-\Delta t^2+\Delta x^2=9>0$、空間的分離です。[Minkowski二点分布](#def-qcurv7-restriction)の分母は $(0-i0)^2-3^2=-9$ で、$W_M(X_R,X_L)=1/(36\pi^2)$。非零の二点相関は、全時空の状態が左右の場の観測量を関連付けることを示します。しかし検出器の[正負ギャップの定常遷移率](../QCURV6/index.md#def-qcurv6-stationary-rate)の比もKMS境界条件も計算していません。従って熱的詳細釣合いや温度は、この計算から単独には導けません。
<!-- solution-end -->

### Level C：幾何、量子場、観測を一つにつなぐ

<a id="ex-qcurv7-c01"></a>
#### QCURV7-C01 等加速度検出器の入力データを全て再導出する

- Level: C
- 問題: 4次元Minkowski時空の計量符号を $(-,+,+,+)$ とし、$a>0$ とする。質量零自由実スカラー場はMinkowski真空にある。右くさびの $\rho_0=1/a$、$y=z=0$ に固定した点状検出器を考え、次を示せ。

  1. 世界線を固有時間 $\tau$ で表示し、未来向き単位接ベクトルと固有加速度を求めよ。
  2. 右くさびのnull座標と計量を導き、$\partial_\eta$ が時間的である範囲を明記せよ。
  3. $e^{-i\omega\eta+i k_\perp\cdot x_\perp}f(\rho)$、$\omega>0$ の自由場が満たす動径方程式を導け。左で未来向き正振動数の時間因子がなぜ逆になるか、KG密度で確認せよ。
  4. Minkowski二点分布を世界線へ引き戻し、$w_a(s)$ を求めよ。有限時間切替を持つ[検出器応答](../QCURV6/index.md#def-qcurv6-response)に何を代入するか書き、**その式だけでは温度を結論できない**理由を述べよ。

<!-- solution-start -->
**詳細解答**：

**(1)** 右座標の定義は $t=\rho\sinh(a\eta)$、$x=\rho\cosh(a\eta)$ です。$d\tau=a\rho_0d\eta=d\eta$ なので $\tau=\eta$ と取れ、

$$
X(\tau)=\left(a^{-1}\sinh(a\tau),a^{-1}\cosh(a\tau),0,0\right).
$$

微分すると $u=(\cosh(a\tau),\sinh(a\tau),0,0)$、$A=(a\sinh(a\tau),a\cosh(a\tau),0,0)$。$g(u,u)=-1$、$u^0>0$、$g(A,A)=a^2$ より固有加速度は $a$ です。

**(2)** $U=t-x=-\rho e^{-a\eta}<0$、$V=t+x=\rho e^{a\eta}>0$ です。$dt=\sinh(a\eta)d\rho+a\rho\cosh(a\eta)d\eta$、$dx=\cosh(a\eta)d\rho+a\rho\sinh(a\eta)d\eta$ を $-dt^2+dx^2$ へ入れ、交差項の相殺と $\cosh^2-\sinh^2=1$ から $ds^2=-a^2\rho^2d\eta^2+d\rho^2+dy^2+dz^2$ を得ます。$g(\partial_\eta,\partial_\eta)=-a^2\rho^2<0$ は右の $\rho>0$ で時間的です。右の座標域の外でこの性質を全時空へ延長したわけではありません。

**(3)** $\sqrt{|g|}=a\rho$、$g^{\eta\eta}=-1/(a^2\rho^2)$ なので

$$
\Box=-\frac{\partial_\eta^2}{a^2\rho^2}
+\frac1\rho\partial_\rho(\rho\partial_\rho)
+\partial_y^2+\partial_z^2.
$$

$\partial_\eta^2u=-\omega^2u$、$\Delta_\perp u=-|k_\perp|^2u$ を代入し、$(-\Box+m^2)u=0$ により

$$
f''+\rho^{-1}f'+\left(\omega^2/(a^2\rho^2)-|k_\perp|^2-m^2\right)f=0
$$

です。この問いでは質量零なので $m=0$ です。右の未来向き法線 $n_R=(a\rho)^{-1}\partial_\eta$ では $e^{-i\omega\eta}$ に対するKG密度が $2\omega|u|^2/(a\rho)>0$。左では未来向き法線が $n_L=-(a\rho)^{-1}\partial_\eta$ なので、正の密度には $e^{+i\omega\eta}$ が必要です。

**(4)** $s=\tau-\tau'$ とすると、世界線上の二点間隔は

$$
(\Delta t)^2-(\Delta x)^2=4a^{-2}\sinh^2(as/2)
$$

です。[等加速度引戻しの命題](#prop-qcurv7-wightman)のように $\tau\mapsto\tau-i\delta$ を使うと、虚部は $-a^{-1}\sin(a\delta)u(\tau)$ で過去向き時間的です。よって正周波数の $i0$ 処方を保持して

$$
w_a(s)=-\frac{a^2}{16\pi^2\sinh^2(a(s-i0)/2)}.
$$

$\chi\in C_c^\infty(\mathbb R)$ を実切替、$E\in\mathbb R$ を検出器の遷移エネルギー差とすれば、応答の出発点は

$$
\mathcal F_{\chi}(E)
=\left\langle w_a(\tau-\tau'),\,
\chi(\tau)\chi(\tau')e^{-iE(\tau-\tau')}\right\rangle.
$$

前提の[世界線への引戻し](../QCURV6/index.md#prop-qcurv6-pullback)により滑らかな切替を掛けた分布の対として意味があります。定常二点分布を得ただけでは、長時間の正負の $E$ に対する応答のFourier変換と比をまだ計算しておらず、KMS条件も検証していません。従ってこの段階で「温度が $a/(2\pi)$」と証明したことにはなりません。
<!-- solution-end -->
