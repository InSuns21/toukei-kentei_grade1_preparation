# GR3 自由落下の測地線方程式

<!-- definition-example-audit: strict -->

[GR1の局所自由落下実験室](../GR1/index.md#def-gr1-freefall-lab)では、落下する実験室の中では見かけの重力が消えることを学びました。[GR2の固有時率](../GR2/index.md#prop-gr2-clock-rate)を使えば、任意の時間的世界線に沿って時計が刻む時間も計算できます。しかし、**無数にある世界線のうち、外力を受けない粒子はどれをたどるのでしょうか**。計量から運動を予測する規則がまだ必要です。

[SREL4の自由質点の固有時作用](../../SREL/SREL4/index.md#def-srel4-free-action)は平坦時空でその規則を与えました。[LORG4のLorentz計量のLevi-Civita接続](../../../幾何系/LORG/LORG4/index.md#thm-lorg4-lorentz-levi-civita)と[測地線方程式](../../../幾何系/LORG/LORG4/index.md#prop-lorg4-geodesic-causal-type)は、曲がった時空の「まっすぐ進む」を数学的に記述します。本章は両者をつなぎ、**自由落下という物理的仮定がどう測地線の微分方程式になるか**を導きます。

以下、時空は滑らかな時間向き付き四次元Lorentz多様体、計量の符号は $(-,+,+,+)$、光速は $c>0$ とします。座標は $x^\mu$（$\mu=0,1,2,3$）、$x^0=ct$ とすることが多く、繰り返す上下添字は $0$ から $3$ まで和を取ります。時間的世界線の固有時を $\tau$、別のパラメータを $\lambda$ または $s$ と書きます。どの微分がどの変数についてかは都度明示します。

## 1. 自由落下の意味と、計量から作る作用

平坦な慣性座標では自由粒子は一定の四元速度で進みます。しかしRindler座標では同じ自由粒子にも座標加速度が現れます。従って「座標二階微分が零」をどの座標でも要求することはできません。座標系に依存しない運動法則を作るため、物理的には**重力以外の力が作用しない理想的な質点**を考え、一般相対論の最小結合の仮定としてその作用を固有時で与えます。これは計量だけから自動的に証明される物理法則ではありません。

質量 $m>0$ の粒子について、未来向き時間的な $C^2$ 曲線 $x(\lambda)$ の接ベクトルを $v^\mu=dx^\mu/d\lambda$ とします。時間的条件 $g_{\mu\nu}v^\mu v^\nu<0$ から、正の量

$$
q(\lambda)=\sqrt{-g_{\mu\nu}(x(\lambda))v^\mu v^\nu}>0
$$

を取り出せます。[GR2の固有時の解釈](../GR2/index.md#prop-gr2-clock-rate)により $d\tau/d\lambda=q/c$ です。**粒子の質量を正とし、二つの端点事象を固定する**という条件は、次の変分でも保ちます。

<a id="def-gr3-proper-time-action"></a>

<!-- formal-statement-start -->
> **定義（曲がった時空における自由質点の固有時作用）**  
> 滑らかな時間向き付きLorentz多様体 $(M,g)$、定数 $m>0$、未来向き時間的な $C^2$ 曲線 $x:[\lambda_0,\lambda_1]\to M$ に対し、自由質点の作用を

$$
S[x]=-mc^2\int_{\lambda_0}^{\lambda_1}d\tau
=-mc\int_{\lambda_0}^{\lambda_1}
\sqrt{-g_{\mu\nu}(x)\frac{dx^\mu}{d\lambda}
\frac{dx^\nu}{d\lambda}}\,d\lambda
$$

> と定める。端点 $x(\lambda_0),x(\lambda_1)$ を固定し、十分小さい変分中も時間的な曲線を考える。
<!-- formal-statement-end -->

<!-- definition-example-start: def-gr3-proper-time-action -->
**定義の確認**。Minkowski座標 $(ct,x,y,z)$ で $\eta=\operatorname{diag}(-1,1,1,1)$、$\lambda=t$、$\boldsymbol x(t)=\boldsymbol v t+\boldsymbol b$、$|\boldsymbol v|<c$、$t_1>t_0$ とします。接ベクトルは $(c,\boldsymbol v)$ で、$q=\sqrt{c^2-|\boldsymbol v|^2}>0$ です。従って

$$
S=-mc\sqrt{c^2-|\boldsymbol v|^2}(t_1-t_0)
=-mc^2\sqrt{1-|\boldsymbol v|^2/c^2}(t_1-t_0).
$$

これは[SREL4で定義した作用](../../SREL/SREL4/index.md#def-srel4-free-action)を $(-,+,+,+)$ の規約で書き直したものです。両端はこの曲線が通る二事象として固定しています。座標変換しても[GR2の固有時の不変性](../GR2/index.md#prop-gr2-coordinate-invariance)から作用の値は変わりません。
<!-- definition-example-end -->

## 2. 固有時作用を変分すると何が出るか

まず作用が停留する曲線を探します。端点を固定した小さな変分を $x_\varepsilon^\mu=x^\mu+\varepsilon h^\mu$ とし、$h^\mu(\lambda_0)=h^\mu(\lambda_1)=0$ とします。時間的条件は開条件なので、元の曲線を含むコンパクトなパラメータ区間上では十分小さい滑らかな変分で保たれます。座標領域内で計算し、最後に座標に依存しない式として読み替えます。

<a id="thm-gr3-stationary-action"></a>

<!-- formal-statement-start -->
> **定理（固有時作用の停留条件と自由落下）**  
> 滑らかなLorentz計量 $g$ を持つ時空の一つの座標領域内で、質量 $m>0$ の未来向き時間的 $C^2$ 曲線 $x(\lambda)$ と両端固定の十分小さい滑らかな時間的変分を考える。前節の作用 $S$ がすべての変分について停留する必要十分条件は、固有時 $\tau$ に関して

$$
\frac{d^2x^\rho}{d\tau^2}
+\Gamma^\rho_{\mu\nu}(x)
\frac{dx^\mu}{d\tau}\frac{dx^\nu}{d\tau}=0
\qquad(\rho=0,1,2,3)
$$

> が成り立つことである。$\Gamma^\rho_{\mu\nu}$ は計量 $g$ のLevi-Civita接続の係数であり、固有時はこの方程式のアフィンパラメータである。これは重力以外の力がない質量正の理想粒子の運動法則である。
<!-- formal-statement-end -->

### 証明の見取り図

平方根に現れる計量は位置にも速度にも依存します。両方を微分して部分積分し、固有時へ取り直すと、接続係数を含む式が現れます。逆向きも、得られたEuler–Lagrange方程式を積分の変分式へ戻して示します。

<!-- proof-start -->
### 証明

$L(x,v)=-mc\sqrt{-g_{\alpha\beta}(x)v^\alpha v^\beta}=-mcq$ とします。$q>0$ なので平方根を微分できます。$g_{\alpha\beta}=g_{\beta\alpha}$ を使って、速度微分と位置微分をそれぞれ計算すると

$$
\begin{aligned}
\frac{\partial L}{\partial v^\sigma}
&=-mc\frac{-2g_{\sigma\nu}v^\nu}{2q}
=mc\frac{g_{\sigma\nu}v^\nu}{q},\\
\frac{\partial L}{\partial x^\sigma}
&=-mc\frac{-\partial_\sigma g_{\mu\nu}v^\mu v^\nu}{2q}
=\frac{mc}{2q}\partial_\sigma g_{\mu\nu}v^\mu v^\nu.
\end{aligned}
$$

従って一次変分は、端点で $h^\sigma=0$ であることから、部分積分により

$$
\begin{aligned}
\delta S
&=\int_{\lambda_0}^{\lambda_1}
\left(\frac{\partial L}{\partial x^\sigma}h^\sigma+
\frac{\partial L}{\partial v^\sigma}\frac{dh^\sigma}{d\lambda}\right)d\lambda\\
&=\left[\frac{\partial L}{\partial v^\sigma}h^\sigma\right]_{\lambda_0}^{\lambda_1}
+\int_{\lambda_0}^{\lambda_1}
\left(\frac{\partial L}{\partial x^\sigma}
-\frac{d}{d\lambda}\frac{\partial L}{\partial v^\sigma}\right)h^\sigma d\lambda\\
&=-mc\int_{\lambda_0}^{\lambda_1}
\left\{\frac{d}{d\lambda}
\left(\frac{g_{\sigma\nu}v^\nu}{q}\right)
-\frac{\partial_\sigma g_{\mu\nu}v^\mu v^\nu}{2q}\right\}h^\sigma d\lambda.
\end{aligned}
$$

各 $h^\sigma$ を任意の内点の近傍に台を持つよう選べます。括弧内は連続なので、すべての変分に対し $\delta S=0$ となることと、その四成分がすべて零になることは同値です。したがって

$$
\frac{d}{d\lambda}\left(\frac{g_{\sigma\nu}v^\nu}{q}\right)
-\frac1{2q}\partial_\sigma g_{\mu\nu}v^\mu v^\nu=0.
$$

ここで $u^\mu=dx^\mu/d\tau$ とすると $v^\mu=(q/c)u^\mu$ かつ $d/d\lambda=(q/c)d/d\tau$ です。第一項、第二項へ別々に代入して

$$
\frac{q}{c^2}\frac d{d\tau}(g_{\sigma\nu}u^\nu)
-\frac{q}{2c^2}\partial_\sigma g_{\mu\nu}u^\mu u^\nu=0
$$

となり、正数 $q/c^2$ で割って

$$
g_{\sigma\nu}\frac{du^\nu}{d\tau}
+\partial_\mu g_{\sigma\nu}u^\mu u^\nu
-\frac12\partial_\sigma g_{\mu\nu}u^\mu u^\nu=0
$$

を得ます。$u^\mu u^\nu$ は対称だから、中項の係数を $\mu,\nu$ で対称化して

$$
g_{\sigma\nu}\frac{du^\nu}{d\tau}
+\frac12(\partial_\mu g_{\sigma\nu}
+\partial_\nu g_{\sigma\mu}-\partial_\sigma g_{\mu\nu})
u^\mu u^\nu=0.
$$

[LORG4のLevi-Civita係数の構成](../../../幾何系/LORG/LORG4/index.md#thm-lorg4-lorentz-levi-civita)では括弧内に $g^{\rho\sigma}/2$ を掛けたものが $\Gamma^\rho_{\mu\nu}$ です。計量の非退化性により逆行列が存在するので、両辺に $g^{\rho\sigma}$ を掛ければ定理の測地線方程式になります。逆に測地線方程式を満たせば、この計算を逆順にたどって一次変分は零です。$\square$
<!-- proof-end -->

固有時は粒子自身の時計なので、この変数での測地線方程式は物理的な加速度を直接区別するのに便利です。ただし、**固有時が時間的測地線のアフィンパラメータになること**と、任意の座標時刻 $t$ もアフィンであることは同じではありません。

## 3. Christoffel係数と四元加速度

速度を位置ごとに比較するとき、普通の座標微分だけでは座標基底そのものの変化を見落とします。[LORG4の共変微分による測地線表示](../../../幾何系/LORG/LORG4/index.md#prop-lorg4-geodesic-causal-type)を用いて、運動を座標に依らない量で判定します。

<a id="def-gr3-four-acceleration"></a>

<!-- formal-statement-start -->
> **定義（四元加速度と自由落下判定）**  
> 未来向き時間的 $C^2$ 世界線 $x(\tau)$ の四元速度を $u^\mu=dx^\mu/d\tau$ とし、Levi-Civita接続に沿う四元加速度を

$$
a^\rho=(D_\tau u)^\rho
=\frac{du^\rho}{d\tau}+\Gamma^\rho_{\mu\nu}u^\mu u^\nu
$$

> と定める。固有時で表示した曲線が自由落下の時間的測地線である条件は $a^\rho=0$ である。この四元加速度は、ある座標成分の二階微分のみとは異なる。
<!-- formal-statement-end -->

<!-- definition-example-start: def-gr3-four-acceleration -->
**定義の確認**。Minkowskiの慣性座標で $x^\mu(\tau)=b^\mu+u_0^\mu\tau$、$g_{\mu\nu}u_0^\mu u_0^\nu=-c^2$、$u_0^0>0$ とします。係数行列は一定なので[LORG4の係数公式](../../../幾何系/LORG/LORG4/index.md#thm-lorg4-lorentz-levi-civita)の各偏微分は零で $\Gamma^\rho_{\mu\nu}=0$ です。$du^\rho/d\tau=0$ も満たすため、すべての $a^\rho$ は零です。時間的条件、未来向き、固有時規格化をそれぞれ直接確認しました。
<!-- definition-example-end -->

規格化 $g_{\mu\nu}u^\mu u^\nu=-c^2$ を微分し、計量両立性を使うと

$$
0=D_\tau g(u,u)=2g(D_\tau u,u)=2g(a,u).
$$

よって $g(a,u)=0$ です。自由落下でなくてもこの直交性は成立します。四元加速度が非零ならその世界線を保つために何らかの非重力的な加速が必要です。なおChristoffel係数だけを「重力の強さ」と同一視してはいけません。座標変換で係数が変わっても、ベクトル $a$ が零かどうかは不変です。

## 4. Rindler座標：平坦時空でも座標加速度が出る

[GR1のRindler計量](../GR1/index.md#prop-gr1-rindler-metric)を $a_0>0$、$N(x)=1+a_0x/c^2>0$ の領域で

$$
ds^2=-c^2N(x)^2dt^2+dx^2+dy^2+dz^2
$$

と書きます。$a_0$ は加速度の単位を持つ定数で、$N$ は無次元です。$g_{tt}=-c^2N^2,\ g_{xx}=1$ なので

$$
g^{tt}=-\frac1{c^2N^2},\qquad
\partial_xg_{tt}=-2c^2NN',\qquad N'=\frac{a_0}{c^2}.
$$

[Lorentz計量のLevi-Civita接続とKoszul表示](../../../幾何系/LORG/LORG4/index.md#thm-lorg4-lorentz-levi-civita)により、時間・$x$ の添字を含む非零成分は

$$
\begin{aligned}
\Gamma^t_{tx}=\Gamma^t_{xt}
&=\frac12g^{tt}\partial_xg_{tt}=\frac{N'}{N},\\
\Gamma^x_{tt}
&=-\frac12g^{xx}\partial_xg_{tt}
=c^2NN'=a_0N.
\end{aligned}
$$

<a id="prop-gr3-rindler-motion"></a>

<!-- formal-statement-start -->
> **命題（Rindler自由粒子と静止観測者の加速度）**  
> $N=1+a_0x/c^2>0$ のRindler領域において、時間的測地線 $x^\mu(\tau)$ は

$$
\frac{d^2t}{d\tau^2}
+2\frac{N'}{N}\frac{dt}{d\tau}\frac{dx}{d\tau}=0,
\qquad
\frac{d^2x}{d\tau^2}
+a_0N\left(\frac{dt}{d\tau}\right)^2=0
$$

> を満たす。粒子がある瞬間に座標静止するなら、その瞬間の座標時刻に関する加速度は

$$
\left.\frac{d^2x}{dt^2}\right|_{\mathrm{rest}}=-a_0N(x).
$$

> 一方、$x=x_*$ 一定に保つ静止観測者の四元加速度は $a^x=a_0/N(x_*)$ で、その大きさも $a_0/N(x_*)$ である。
<!-- formal-statement-end -->

### 証明の見取り図

係数を測地線方程式へ入れ、瞬間静止条件で固有時率を規格化します。静止観測者は測地線ではないので、同じ計量係数でも四元加速度が残ります。

<!-- proof-start -->
### 証明

非零の $\Gamma$ は上記二種類だけなので、[測地線方程式](#thm-gr3-stationary-action)の $t,x$ 成分は命題の最初の二式となります。瞬間静止では $dx/d\tau=0$、時間的速度の規格化は

$$
-c^2N^2\left(\frac{dt}{d\tau}\right)^2=-c^2,
\qquad \frac{dt}{d\tau}=\frac1N>0.
$$

よって $d^2x/d\tau^2=-a_0/N$ です。連鎖律を二回用いて

$$
\frac{d^2x}{dt^2}
=\frac{(d^2x/d\tau^2)(dt/d\tau)
-(dx/d\tau)(d^2t/d\tau^2)}{(dt/d\tau)^3}
$$

を得ます。瞬間静止条件を代入すると $d^2x/dt^2=(-a_0/N)/(1/N)^2=-a_0N$ です。

次に静止世界線は $u^t=1/N(x_*),\ u^x=0$、$du^\mu/d\tau=0$ です。定義から

$$
a^x=\Gamma^x_{tt}(u^t)^2
=(a_0N)\frac1{N^2}=\frac{a_0}{N},
\qquad a^t=0.
$$

$g_{xx}=1$ なので $\sqrt{g(a,a)}=a_0/N$ となり、非零です。$\square$
<!-- proof-end -->

この二つを読み違えないことが重要です。**自由落下粒子は四元加速度零でもRindler座標で加速して見え、静止観測者は座標加速度零でも四元加速度が非零**です。さらに次の座標変換で、Rindlerの計量は平坦なMinkowski計量に帰着します。

$$
X^0=\frac{c^2}{a_0}N(x)\sinh\!\left(\frac{a_0t}{c}\right),
\qquad
X^1=\frac{c^2}{a_0}N(x)\cosh\!\left(\frac{a_0t}{c}\right).
$$

実際、$dX^0=cN\cosh(a_0t/c)\,dt+\sinh(a_0t/c)\,dx$、$dX^1=cN\sinh(a_0t/c)\,dt+\cosh(a_0t/c)\,dx$ なので、双曲線関数の $\cosh^2-\sinh^2=1$ と交差項の相殺から

$$
-(dX^0)^2+(dX^1)^2=-c^2N^2dt^2+dx^2.
$$

従って接続係数が非零であること**だけ**を曲率が非零である証拠にはできません。

## 5. 光はなぜ固有時でパラメータ化しないのか

[GR2で調べた光的ベクトル](../GR2/index.md#prop-gr2-null-cone)は自己二乗が零なので、光的世界線では

$$
d\tau=\frac1c\sqrt{-g_{\mu\nu}dx^\mu dx^\nu}=0.
$$

固有時が一定なら、それを増加する曲線パラメータに使えません。しかも前節の平方根作用は光的速度で $q=0$ となり、変分導出に使った $1/q$ が定義されません。光の運動には、固有時ではなく**アフィンパラメータ**を使います。測地線としての定義とその因果型保存は[LORG4](../../../幾何系/LORG/LORG4/index.md#prop-lorg4-geodesic-causal-type)で学びました。

<a id="prop-gr3-null-affine-action"></a>

<!-- formal-statement-start -->
> **命題（光的測地線のアフィンパラメータと二次作用）**  
> 滑らかなLorentz計量 $g$ の座標領域で、固定したアフィンパラメータ候補 $s$ の区間上の $C^2$ 曲線に

$$
E[x]=\frac12\int_{s_0}^{s_1}
g_{\mu\nu}(x)\frac{dx^\mu}{ds}\frac{dx^\nu}{ds}\,ds
$$

> を定める。端点固定の任意の滑らかな変分に対して $E$ が停留する必要十分条件は

$$
\frac{d^2x^\rho}{ds^2}
+\Gamma^\rho_{\mu\nu}\frac{dx^\mu}{ds}\frac{dx^\nu}{ds}=0
$$

> である。この方程式の解で、初速度が非零・光的なら、その全存在区間で非零・光的な測地線となる。この $s$ は固有時ではない。光的条件は、上の二次作用の変分から得る運動方程式とは別に初期値へ課す。
<!-- formal-statement-end -->

### 証明の見取り図

平方根がないため光的速度でも微分可能です。変分で測地線方程式を得た後、計量両立性から速度の自己内積が保存されることを使います。

<!-- proof-start -->
### 証明

$w^\mu=dx^\mu/ds$ とし、積分内の $L_2=\tfrac12g_{\mu\nu}w^\mu w^\nu$ を微分すると

$$
\frac{\partial L_2}{\partial w^\sigma}=g_{\sigma\nu}w^\nu,\qquad
\frac{\partial L_2}{\partial x^\sigma}
=\frac12\partial_\sigma g_{\mu\nu}w^\mu w^\nu.
$$

端点固定変分に部分積分と変分の任意性を用いると

$$
\frac d{ds}(g_{\sigma\nu}w^\nu)
-\frac12\partial_\sigma g_{\mu\nu}w^\mu w^\nu=0.
$$

第2節と同様に積の微分、添字の対称化、逆計量との縮約を順に行うと $d^2x^\rho/ds^2+\Gamma^\rho_{\mu\nu}w^\mu w^\nu=0$ です。これで必要十分性が出ます。

計量両立性を速度へ使えば

$$
\frac d{ds}g(w,w)
=2g(D_sw,w)=0
$$

なので自己内積は初期値と同じく零です。初速度が非零なら、[LORG4の測地線ODEの一意性](../../../幾何系/LORG/LORG4/index.md#prop-lorg4-geodesic-causal-type)によって途中で零速度にはなれません。よって非零・光的なままです。$\square$
<!-- proof-end -->

ここでは $E$ の停留を**光的曲線に制限せず**変分しました。最初から光的曲線だけに制限して $E=0$ と置けば、すべての候補で値が零になり運動方程式を選べません。また任意の非線形再パラメータ化で二次作用の停留方程式を保てるわけではありません。[LORG4のアフィンパラメータ条件](../../../幾何系/LORG/LORG4/index.md#prop-lorg4-geodesic-causal-type)に従い、非定数測地線の許されるアフィン変更は $s\mapsto As+B$（$A\ne0$）です。

## 6. 演習：作用・接続・時計を一つの運動へ

各問題で時間向きは $t$ が増える方向とします。$1+1$ 次元模型は必要に応じて $dy^2+dz^2$ を足した四次元模型の一部とみなします。Rindler領域では $a_0>0,\ N=1+a_0x/c^2>0$ です。

### Level A

<a id="ex-gr3-a01"></a>
#### GR3-A01 慣性系の自由粒子
- Level: A

$ds^2=-c^2dt^2+dx^2$ とし、$x=vt+x_0$（$|v|<c$）を考える。固有時による表示と四元加速度を求めよ。

<!-- solution-start -->
**詳細解答**。$-c^2d\tau^2=(-c^2+v^2)dt^2$ より $d\tau/dt=\sqrt{1-v^2/c^2}=1/\gamma$、$\gamma=(1-v^2/c^2)^{-1/2}>0$ です。$t(0)=0$ とすれば $t(\tau)=\gamma\tau$、$x(\tau)=v\gamma\tau+x_0$ となります。成分微分で $d^2t/d\tau^2=d^2x/d\tau^2=0$、計量が定数なので[Levi-Civita接続の構成定理](../../../幾何系/LORG/LORG4/index.md#thm-lorg4-lorentz-levi-civita)に現れる係数行列の偏微分が消え、 $\Gamma=0$ です。よって[四元加速度の定義](#def-gr3-four-acceleration)で $a^\mu=0$、未来向きで $g(u,u)=-c^2$ です。
<!-- solution-end -->

<a id="ex-gr3-a02"></a>
#### GR3-A02 Rindler接続を計算する
- Level: A

$ds^2=-c^2N(x)^2dt^2+dx^2$ に対して $\Gamma^t_{tx}$ と $\Gamma^x_{tt}$ を計算し、$N=1+a_0x/c^2$ を代入せよ。

<!-- solution-start -->
**詳細解答**。$g_{tt}=-c^2N^2,\ g_{xx}=1$、逆行列は $g^{tt}=-1/(c^2N^2),\ g^{xx}=1$ です。$\partial_xg_{tt}=-2c^2NN'$ だけが非零の微分なので

$$
\Gamma^t_{tx}
=\tfrac12g^{tt}\partial_xg_{tt}
=\frac{N'}N,\qquad
\Gamma^x_{tt}
=-\tfrac12g^{xx}\partial_xg_{tt}=c^2NN'.
$$

$N'=a_0/c^2$ を代入すれば $\Gamma^t_{tx}=a_0/(c^2N)$、$\Gamma^x_{tt}=a_0N$ です。上付き添字 $t$ と $x$ の位置を交換してはいけません。
<!-- solution-end -->

<a id="ex-gr3-a03"></a>
#### GR3-A03 静止時計は自由落下か
- Level: A

Rindlerの $x=x_*$ 一定の世界線について $u^t$、$a^x$ とその大きさを求め、測地線か判定せよ。

<!-- solution-start -->
**詳細解答**。$g(u,u)=-c^2$ と未来向き条件から $-c^2N(x_*)^2(u^t)^2=-c^2$、従って $u^t=1/N(x_*)$ です。座標速度は一定なので $du^\mu/d\tau=0$、しかし

$$
a^x=\Gamma^x_{tt}(u^t)^2
=a_0N(x_*)/N(x_*)^2=a_0/N(x_*)>0.
$$

$g_{xx}=1$ より $\sqrt{g(a,a)}=a_0/N(x_*)$、四元加速度が非零なので[自由落下判定](#def-gr3-four-acceleration)によって測地線ではありません。静止を維持するには加速が必要です。
<!-- solution-end -->

<a id="ex-gr3-a04"></a>
#### GR3-A04 光には時計が使えない
- Level: A

Minkowskiの $x=ct$ に沿って $d\tau$ を求め、$S=-mc^2\int d\tau$ の変分を光の運動方程式にそのまま転用できない理由を述べよ。

<!-- solution-start -->
**詳細解答**。$dx=c\,dt$ なので $ds^2=-c^2dt^2+dx^2=0$、従って $d\tau=0$ です。$m>0$ の時間的世界線について行った第2節の計算では $q=\sqrt{-g(v,v)}>0$ を仮定し、$\partial L/\partial v^\sigma=mcg_{\sigma\nu}v^\nu/q$ としています。光的速度では $q=0$ でこの微分式が定義されません。また $\tau$ は一定で曲線をたどる媒介変数になりません。よって[光的二次作用の命題](#prop-gr3-null-affine-action)で別のアフィンパラメータを使います。
<!-- solution-end -->

<a id="ex-gr3-a05"></a>
#### GR3-A05 アフィンでない媒介変数
- Level: A

Minkowski直線 $X^\mu(s)=P^\mu+V^\mu s$（$V\ne0$）を $s=u^2$、$u>0$ で表示する。新しい表示は測地線方程式を満たすか。

<!-- solution-start -->
**詳細解答**。新表示は $Y^\mu(u)=P^\mu+V^\mu u^2$ なので $dY^\mu/du=2uV^\mu$、$d^2Y^\mu/du^2=2V^\mu\ne0$ です。定数計量の慣性座標では $\Gamma^\rho_{\mu\nu}=0$ だから、アフィン測地線方程式の左辺は $2V^\mu$ となり満たしません。同じ曲線の像でも、速度の取り直しはアフィン変換でないと方程式を保存しません。
<!-- solution-end -->

### Level B

<a id="ex-gr3-b01"></a>
#### GR3-B01 時間座標の測地線方程式を積分する
- Level: B

Rindlerの時間的測地線について $N^2dt/d\tau$ が一定であることを示せ。

<!-- solution-start -->
**詳細解答**。[Rindler測地線方程式](#prop-gr3-rindler-motion)の $t$ 成分は $t''+2(N'/N)t'x'=0$ です（プライムはここだけ $\tau$ 微分）。積の微分を逐一行うと

$$
\frac d{d\tau}(N^2t')
=2NN'x't'+N^2t''
=N^2\left(t''+2\frac{N'}N t'x'\right)=0.
$$

従って連結な存在区間で $N^2t'=K$ が定数です。未来向きで $t'>0$、$N>0$ だから $K>0$ です。ここで $N'=dN/dx$ と $t'=dt/d\tau$ は別の微分であり、上の最初の $N'$ は $x$ 微分です。
<!-- solution-end -->

<a id="ex-gr3-b02"></a>
#### GR3-B02 Rindlerの光的測地線
- Level: B

Rindlerの光的アフィン測地線 $x^\mu(s)$ について $N^2dt/ds=K>0$ から、$dx/ds=\pm cK/N$ を導け。$s$ が固有時でないことも確認せよ。

<!-- solution-start -->
**詳細解答**。[GEO14の測地線方程式](../../../幾何系/GEO/GEO14/index.md#prop-geo14-geodesic-equation)と[光的二次作用の変分](#prop-gr3-null-affine-action)を適用すると $t$ 成分は時間的の場合と同じ $t''+2(N'/N)t'x'=0$ です（ここではプライムは $s$ 微分、$dN/dx=a_0/c^2$）。積の微分で $d(N^2t')/ds=0$、従って $t'=K/N^2$。光的条件は

$$
0=-c^2N^2(t')^2+(x')^2
=-\frac{c^2K^2}{N^2}+(x')^2.
$$

平方根の二つの符号を取ると $x'=\pm cK/N$ です。$K>0$ と $N>0$ から $t'>0$ なので未来向きであり、$(t',x')$ は非零です。自己二乗零により $d\tau=0$ だから $s$ は固有時ではありません。
<!-- solution-end -->

<a id="ex-gr3-b03"></a>
#### GR3-B03 Rindlerは本当に平坦か
- Level: B

$X^0=(c^2/a_0)N\sinh(a_0t/c)$、$X^1=(c^2/a_0)N\cosh(a_0t/c)$ について、計量の交差成分が零であることを計算し、Minkowski計量を得よ。

<!-- solution-start -->
**詳細解答**。$\theta=a_0t/c$ と置くと

$$
\begin{aligned}
dX^0&=cN\cosh\theta\,dt+\sinh\theta\,dx,\\
dX^1&=cN\sinh\theta\,dt+\cosh\theta\,dx.
\end{aligned}
$$

従って $-(dX^0)^2+(dX^1)^2$ の $dt\,dx$ 係数は $-2cN\cosh\theta\sinh\theta+2cN\sinh\theta\cosh\theta=0$。$dt^2$ の係数は $-c^2N^2(\cosh^2-\sinh^2)=-c^2N^2$、$dx^2$ の係数は $\cosh^2-\sinh^2=1$ です。よって $-(dX^0)^2+(dX^1)^2=-c^2N^2dt^2+dx^2$。領域 $N>0$ で座標変換のJacobi行列式は $cN\ne0$ なので、これは正則な座標変換です。非零Christoffel係数だけから曲率非零は結論できません。
<!-- solution-end -->

<a id="ex-gr3-b04"></a>
#### GR3-B04 二次作用で光的条件を固定しない理由
- Level: B

二次作用 $E$ のEuler–Lagrange方程式を座標式で求めよ。また最初から光的な曲線だけを変分候補にすると何が失われるか述べよ。

<!-- solution-start -->
**詳細解答**。$L_2=\tfrac12g_{\mu\nu}w^\mu w^\nu$ なら $\partial L_2/\partial w^\sigma=g_{\sigma\nu}w^\nu$、$\partial L_2/\partial x^\sigma=\tfrac12\partial_\sigma g_{\mu\nu}w^\mu w^\nu$ です。端点項が零になる部分積分から

$$
\frac d{ds}(g_{\sigma\nu}w^\nu)
-\frac12\partial_\sigma g_{\mu\nu}w^\mu w^\nu=0.
$$

左辺を展開し $g^{\rho\sigma}$ を掛けて[LORG4の接続係数](../../../幾何系/LORG/LORG4/index.md#thm-lorg4-lorentz-levi-civita)と照合すると $x''^\rho+\Gamma^\rho_{\mu\nu}w^\mu w^\nu=0$ です。一方、最初からすべての候補で $g(w,w)=0$ を要求すると、どの候補でも $E=\tfrac12\int0\,ds=0$ となり、任意の光的候補の制限変分が零です。運動方程式を特定する情報が失われるため、無制限の変分で方程式を導いてから光的初期値を指定します。
<!-- solution-end -->

### Level C

<a id="ex-gr3-c01"></a>
#### GR3-C01 自由粒子を最後まで追う
- Level: C

Rindler模型で $t(0)=0,\ x(0)=0,\ (dx/d\tau)(0)=0$ の未来向き自由粒子を考える。Minkowski座標 $X^0=(c^2/a_0)N\sinh(a_0t/c)$、$X^1=(c^2/a_0)N\cosh(a_0t/c)$ を使い、粒子の $x(\tau)$、$t(\tau)$ を求めよ。また初期の座標加速度と四元加速度を求め、式の成立するRindler領域を指定せよ。

<!-- solution-start -->
**詳細解答**。初期点は $N(0)=1$ なので $(X^0,X^1)=(0,c^2/a_0)$ です。未来向きで初期に $dx/d\tau=0$、$g(u,u)=-c^2$ より $dt/d\tau=1$。座標変換を微分して初期速度を求めると

$$
\left.\frac{dX^0}{d\tau}\right|_0
=cN\cosh(0)\frac{dt}{d\tau}+\sinh(0)\frac{dx}{d\tau}=c,
\qquad
\left.\frac{dX^1}{d\tau}\right|_0=0.
$$

Minkowski座標ではChristoffel係数が零なので、この初期値を持つ自由粒子は $X^0=c\tau$、$X^1=c^2/a_0$ という直線です。変換の二式の二乗の差と比から

$$
N^2=\left(\frac{a_0}{c^2}\right)^2\{(X^1)^2-(X^0)^2\}
=1-\left(\frac{a_0\tau}{c}\right)^2,
\qquad
\tanh\left(\frac{a_0t}{c}\right)=\frac{X^0}{X^1}
=\frac{a_0\tau}{c}.
$$

$N>0$ の正の根と未来方向を選べば

$$
x(\tau)=\frac{c^2}{a_0}
\left(\sqrt{1-\frac{a_0^2\tau^2}{c^2}}-1\right),
\qquad
t(\tau)=\frac{c}{a_0}\operatorname{artanh}\left(\frac{a_0\tau}{c}\right).
$$

ここでは $0\le\tau<c/a_0$ で $N>0$、$t$ は有限な各 $\tau$ で定義されます。$z=a_0\tau/c$ と書くと

$$
\frac{dx}{d\tau}=-\frac{a_0\tau}{\sqrt{1-z^2}},
\qquad
\frac{dt}{d\tau}=\frac1{1-z^2},
\qquad
\frac{dx}{dt}=-a_0\tau\sqrt{1-z^2}.
$$

従って $\tau=0$ では $(d^2x/dt^2)_0=-a_0$ です。他方Minkowski座標で $d^2X^\mu/d\tau^2=0$、Christoffel係数も零なので四元加速度ベクトルは零であり、[その座標不変な定義](#def-gr3-four-acceleration)によりRindler座標でも零です。Rindlerの $N\to0$ は座標領域の境界であり、粒子が非重力的な力を受け始めることではありません。
<!-- solution-end -->

## 7. 次章へ：観測者が測る速度とは何か

測地線方程式は、与えられた計量と初期位置・初期速度から自由粒子の世界線を決めます。一方で、座標成分 $dt/d\tau$ や $dx/dt$ がそのまま観測者の読みになるとは限りません。例えばRindlerでは自由粒子の座標加速度と静止観測者の加速度がまったく異なりました。次のGR4では、観測者自身の時計と物差しを**局所直交枠**で組み立て、測定された速度・エネルギー・周波数へ移ります。
