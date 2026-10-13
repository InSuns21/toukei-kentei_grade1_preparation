# VAR4 Riemann多様体上の測地線

[VAR3の平面曲線の長さの第一変分](../VAR3/index.md#prop-var3-length-first)では、法線方向の変形に平面曲線の曲率が現れました。しかし球面上の飛行経路や曲がった空間内の自由運動では、曲線を平面に取り出した曲率をゼロにすることはできません。球面上の大円は空間内では曲がって見えても、球面内では「直進」に当たります。

[Riemann計量](../../../幾何系/GEO/GEO12/index.md#def-geo12-riemannian-metric)から速度の長さを測り、曲線の長さだけでなく速度の二乗を積分するエネルギーを考えます。後者を固定端点で停留させると、[GEO14の測地線](../../../幾何系/GEO/GEO14/index.md#def-geo14-geodesic)が現れます。本章では一般定理を重複して証明するのでなく、**計量の座標係数から速度二乗の作用密度を組み立てる全計算**、**速さの選び方と停留条件の違い**、**局所最短と大域最短の境界**を実例で解きます。

## 1. 計量を積分して何を小さくするか

$(M,g)$ を滑らかな $n$ 次元Riemann多様体、$[a,b]$ を $a<b$ の有限区間とし、$\gamma:[a,b]\to M$ は滑らかな曲線とします。局所座標 $x=(x^1,\ldots,x^n)$ では計量を正定値対称行列 $g_{ij}(x)$ で表し、添字の反復には総和を取ります。

[GEO12の長さとエネルギーの定義](../../../幾何系/GEO/GEO12/index.md#def-geo12-length-energy)に従い、

$$
L[\gamma]=\int_a^b \sqrt{g_{ij}(x(t))\dot x^i(t)\dot x^j(t)}\,dt,
\qquad
E[\gamma]=\frac12\int_a^b g_{ij}(x(t))\dot x^i(t)\dot x^j(t)\,dt
$$

とします。長さは進み方を変えても同じですが、エネルギーは時間配分を記録します。前者の被積分関数は速度に一次同次、後者は二次同次です。

古典的な変分では、端点 $\gamma(a)=p,\gamma(b)=q$ を固定した滑らかな曲線族 $F(s,t)$ を比較します。[GEO17の曲線変分](../../../幾何系/GEO/GEO17/index.md#def-geo17-variation)に従い、変分方向は $V(t)=\partial_sF(0,t)$ で $V(a)=V(b)=0$ を満たします。各曲線族について $dE[F(s,\cdot)]/ds|_{s=0}=0$ ならエネルギー停留とします。

[AMECH2の力学的ラグランジアン](../../../物理系/AMECH/AMECH2/index.md#def-amech2-mechanical-lagrangian)と同じ発想で、速度の二乗を扱うため、局所座標ごとに次を記号として用います。

<a id="def-var4-metric-lagrangian"></a>
<!-- formal-statement-start -->
> **定義（計量の運動エネルギー関数）**  
> Riemann多様体 $(M,g)$ の局所座標 $x$ と接ベクトル成分 $v=(v^1,\ldots,v^n)$ に対し、
>
$$
\mathcal L_g(x,v)=\frac12g_{ij}(x)v^iv^j
$$
>
> と置く。この局所表示から得る作用 $\int_a^b\mathcal L_g(x,\dot x)\,dt$ は曲線のエネルギー $E$ に等しい。
<!-- formal-statement-end -->

<!-- definition-example-start: def-var4-metric-lagrangian -->
**定義の確認**。$\mathbb R^2$ のEuclid計量では $g_{11}=g_{22}=1,\ g_{12}=0$ です。従って $\mathcal L_g=\tfrac12((v^1)^2+(v^2)^2)$。直線 $x(t)=(t,2t)$、$0\le t\le1$ のエネルギーは

$$
E=\frac12\int_0^1(1^2+2^2)\,dt=\frac52,\qquad L=\int_0^1\sqrt5\,dt=\sqrt5.
$$

速度の二乗に $1/2$ を掛けたものがエネルギー密度であり、長さ密度 $\sqrt5$ とは異なります。
<!-- definition-example-end -->

[GEO12の長さとエネルギーの不等式](../../../幾何系/GEO/GEO12/index.md#prop-geo12-length-energy)は、区間長 $T=b-a$ として

$$
L[\gamma]^2\le2T E[\gamma]
$$

であり、等号は $|\dot\gamma|_g$ がほとんど至る所で一定のときに限られます。滑らかな曲線なら、速度の連続性により一定速です。この不等式は、**最短な経路を一定速でたどるとエネルギーも小さい**ことの鍵になります。ただし極小点の存在そのものはまだ示していません。

## 2. Euler–Lagrange方程式を計量から計算する

[VAR1の第一変分の境界項公式](../VAR1/index.md#prop-var1-first-variation-boundary)を局所座標の各成分へ適用します。ここではまず曲線の像が一つの座標近傍に入る場合を計算し、後で重なり合う座標における幾何学的表示へ戻します。

速度に関する微分は対称性 $g_{ij}=g_{ji}$ より

$$
\frac{\partial\mathcal L_g}{\partial v^k}
=\frac12(g_{kj}v^j+g_{ik}v^i)
=g_{kj}v^j.
$$

さらに曲線上の全微分、位置に関する偏微分は

$$
\begin{aligned}
\frac d{dt}\frac{\partial\mathcal L_g}{\partial v^k}(x,\dot x)
&=\frac d{dt}\bigl(g_{kj}(x)\dot x^j\bigr)\\
&=g_{kj}(x)\ddot x^j+\partial_\ell g_{kj}(x)\dot x^\ell\dot x^j,\\
\frac{\partial\mathcal L_g}{\partial x^k}(x,\dot x)
&=\frac12\partial_k g_{ij}(x)\dot x^i\dot x^j.
\end{aligned}
$$

ここで対称な速度積 $\dot x^i\dot x^j$ に着目すると

$$
\partial_\ell g_{kj}\dot x^\ell\dot x^j
=\frac12(\partial_i g_{kj}+\partial_j g_{ki})\dot x^i\dot x^j
$$

です。この対称化がChristoffel係数の三項を生みます。

<a id="prop-var4-metric-el-connection"></a>
<!-- formal-statement-start -->
> **命題（計量エネルギーと測地線方程式）**  
> 滑らかなRiemann多様体 $(M,g)$ の局所座標で、固定端点の滑らかな曲線 $x:[a,b]\to M$ を考える。$\mathcal L_g(x,v)=g_{ij}(x)v^iv^j/2$ のEuler–Lagrange方程式は
>
$$
\ddot x^m+\Gamma^m_{ij}(x)\dot x^i\dot x^j=0,
\qquad
\Gamma^m_{ij}
=\frac12g^{mk}(\partial_i g_{kj}+\partial_j g_{ki}-\partial_k g_{ij})
$$
>
> に一致する。従ってこの方程式を満たす曲線は、Riemann計量のLevi-Civita接続に関する測地線である。
<!-- formal-statement-end -->

### 証明の見取り図

$g_{kj}$ は正定値なので逆行列が存在します。速度に関する偏微分の全微分と位置偏微分との差をまず $g_{kj}\ddot x^j$ の形で作り、逆行列を掛けると[既習の測地線の座標式](../../../幾何系/GEO/GEO14/index.md#prop-geo14-geodesic-equation)に一致します。

<!-- proof-start -->
### 証明

[固定端点のEuler–Lagrange方程式](../../../物理系/AMECH/AMECH3/index.md#thm-amech3-euler-lagrange)を各成分 $k$ へ適用すると

$$
0=\frac d{dt}\frac{\partial\mathcal L_g}{\partial v^k}
-\frac{\partial\mathcal L_g}{\partial x^k}
=g_{kj}\ddot x^j+
\left(\partial_i g_{kj}-\frac12\partial_k g_{ij}\right)\dot x^i\dot x^j.
$$

速度積は $i,j$ に関して対称なので、括弧の項を入れ替えて平均し、

$$
0=g_{kj}\ddot x^j+
\frac12(\partial_i g_{kj}+\partial_j g_{ki}-\partial_k g_{ij})
\dot x^i\dot x^j
$$

を得ます。両辺へ逆計量 $g^{mk}$ を掛けると

$$
\begin{aligned}
0
&=g^{mk}g_{kj}\ddot x^j
+\frac12g^{mk}(\partial_i g_{kj}+\partial_jg_{ki}-\partial_kg_{ij})
\dot x^i\dot x^j\\
&=\delta^m_j\ddot x^j+\Gamma^m_{ij}\dot x^i\dot x^j\\
&=\ddot x^m+\Gamma^m_{ij}\dot x^i\dot x^j.
\end{aligned}
$$

[GEO13のLevi-Civita接続の座標公式](../../../幾何系/GEO/GEO13/index.md#prop-geo13-levi-civita-christoffel)で定まる $\Gamma^m_{ij}$ です。したがって[測地線の座標方程式](../../../幾何系/GEO/GEO14/index.md#prop-geo14-geodesic-equation)と一致します。一般の曲線は有限個の座標近傍で分割して同じ計算を行え、方程式は $\nabla_{\dot\gamma}\dot\gamma=0$ という座標に依らない形を持ちます。
<!-- proof-end -->

一般の変分公式自体は[GEO17のエネルギーの第一変分定理](../../../幾何系/GEO/GEO17/index.md#thm-geo17-first-variation-energy)が証明済みです。記号を $D\dot\gamma/dt=\nabla_{\dot\gamma}\dot\gamma$ とすると

$$
\delta E
=\bigl[g(V,\dot\gamma)\bigr]_a^b
-\int_a^b g\left(V,\frac{D\dot\gamma}{dt}\right)\,dt.
$$

固定端なら境界項が消えます。任意の内部変分方向を動かせることと基本補題によって、停留曲線と測地線は同値です。これは[GEO17の臨界点同値定理](../../../幾何系/GEO/GEO17/index.md#cor-geo17-geodesic-critical)そのものであり、命題の座標計算を幾何的に言い直したものです。

## 3. 直進なのに座標が加速する例

極座標 $r>0,\ \theta\in\mathbb R$ の局所表示でEuclid計量を

$$
ds^2=dr^2+r^2d\theta^2
$$

と書きます。行列は $\operatorname{diag}(1,r^2)$、逆行列は $\operatorname{diag}(1,r^{-2})$ です。$\partial_r g_{\theta\theta}=2r$ だけが非零の計量偏微分なので、前命題へ代入すると

$$
\Gamma^r_{\theta\theta}=-\frac12(2r)=-r,
\qquad
\Gamma^\theta_{r\theta}=\Gamma^\theta_{\theta r}
=\frac12r^{-2}(2r)=\frac1r.
$$

それ以外はゼロです。したがって測地線方程式は

$$
\ddot r-r\dot\theta^2=0,\qquad
\ddot\theta+\frac{2\dot r\dot\theta}{r}=0.
$$

$\theta(t)=\theta_0$ と $r(t)=r_0+vt>0$ は両式を満たし、原点から放射方向に動く直線です。一方、$\theta$ の式へ $r^2$ を掛ければ

$$
\frac d{dt}(r^2\dot\theta)=r^2\ddot\theta+2r\dot r\dot\theta=0
$$

となり、角運動量型の量が保存されます。[測地線方程式の一般座標表示](../../../幾何系/GEO/GEO14/index.md#prop-geo14-geodesic-equation)が抽象的だった場合でも、ここでは計量の偏微分から毎項を復元できます。

この座標式の「見かけの加速度」は、座標基底が位置で変わる影響です。直線かどうかを $\ddot r$ や $\ddot\theta$ の片方だけで判定してはいけません。

## 4. 長さの停留とエネルギーの停留は異なる

長さの被積分関数は $\sqrt{g_{ij}\dot x^i\dot x^j}$ であり、$\dot x\ne0$ の正則曲線だけで滑らかに微分できます。[GEO17の長さの第一変分](../../../幾何系/GEO/GEO17/index.md#thm-geo17-first-variation-length)を $U=\dot\gamma/|\dot\gamma|_g$ として書けば

$$
\delta L=[g(V,U)]_a^b-\int_a^b g\left(V,\frac{DU}{dt}\right)\,dt.
$$

固定端の停留性は $DU/dt=0$ です。速度 $v(t)=|\dot\gamma|_g>0$ を置くと

$$
U=\frac{\dot\gamma}{v},\qquad
\frac{DU}{dt}
=\frac1v\frac{D\dot\gamma}{dt}
-\frac{\dot v}{v^2}\dot\gamma.
$$

よって $DU/dt=0$ なら $D\dot\gamma/dt=(\dot v/v)\dot\gamma$ ですが、必ずしも $D\dot\gamma/dt=0$ ではありません。長さの停留性は曲線の像が測地線軌道であることを示し、パラメータの進み方までは拘束しないのです。

<a id="prop-var4-reparam-critical"></a>
<!-- formal-statement-start -->
> **命題（再パラメータ化と二種類の停留性）**  
> $\gamma:[a,b]\to M$ を非定数の滑らかな測地線とする。$C^2$ 微分同相 $\phi:[c,d]\to[a,b]$ が $\phi'>0$ を満たすとき、$\widetilde\gamma=\gamma\circ\phi$ は固定端点の長さ変分に対して停留する。$\widetilde\gamma$ がエネルギー停留するのは $\phi''=0$ のとき、かつそのときに限る。
<!-- formal-statement-end -->

### 証明の見取り図

単位方向 $U$ は、正の再パラメータ化で不変です。しかし加速度には $\phi''\dot\gamma$ が加わります。[GEO14のアフィン再パラメータ化](../../../幾何系/GEO/GEO14/index.md#prop-geo14-affine-reparam)と整合する条件を確認します。

<!-- proof-start -->
### 証明

$\gamma$ は測地線なので[GEO14の一定速性](../../../幾何系/GEO/GEO14/index.md#prop-geo14-constant-speed)により $|\dot\gamma|=c_0>0$ です。合成の速度は $\widetilde\gamma'=\phi'\dot\gamma(\phi)$ で、$\phi'>0$ より

$$
\widetilde U
=\frac{\phi'\dot\gamma(\phi)}{\phi' c_0}
=\frac{\dot\gamma(\phi)}{c_0}.
$$

曲線に沿う微分則を適用すると、

$$
\frac{D\widetilde U}{ds}
=\frac{\phi'}{c_0}\left(\frac{D\dot\gamma}{dt}\right)(\phi)=0
$$

です。従って長さの第一変分は全固定端方向でゼロです。

一方、曲線に沿う共変微分の合成則を順に使うと

$$
\begin{aligned}
\frac{D\widetilde\gamma'}{ds}
&=\frac{D}{ds}\{\phi'\dot\gamma(\phi)\}\\
&=\phi''\dot\gamma(\phi)
+(\phi')^2\frac{D\dot\gamma}{dt}(\phi)\\
&=\phi''\dot\gamma(\phi).
\end{aligned}
$$

$\dot\gamma$ はどこでも非零なので、この式がゼロであることと $\phi''=0$ は同値です。[GEO17のエネルギー臨界点の同値](../../../幾何系/GEO/GEO17/index.md#cor-geo17-geodesic-critical)で結論を得ます。
<!-- proof-end -->

具体的には $\gamma(t)=(t,0)$、$0\le t\le1$ に対し

$$
\phi(s)=\frac{e^s-1}{e-1},\qquad0\le s\le1
$$

と置くと $\phi'>0$ で両端は保存されます。曲線の像は同じ長さ1の線分ですが、$\widetilde\gamma''=(e^s/(e-1),0)\ne0$ です。長さを停留させるだけなら許される進み方が、エネルギーでは失格になります。

## 5. 球面上で大円と緯線を比較する

半径 $R>0$ の球面で緯度の代わりに北極からの角度 $\theta\in(0,\pi)$、経度 $\varphi$ を取り、

$$
X(\theta,\varphi)
=R(\sin\theta\cos\varphi,\sin\theta\sin\varphi,\cos\theta)
$$

とします。偏微分を取ると

$$
X_\theta=R(\cos\theta\cos\varphi,\cos\theta\sin\varphi,-\sin\theta),
\quad
X_\varphi=R(-\sin\theta\sin\varphi,\sin\theta\cos\varphi,0).
$$

内積は $X_\theta\cdot X_\theta=R^2$、$X_\theta\cdot X_\varphi=0$、$X_\varphi\cdot X_\varphi=R^2\sin^2\theta$ なので

$$
ds^2=R^2(d\theta^2+\sin^2\theta\,d\varphi^2).
$$

この計量の $\theta$ 微分は $\partial_\theta g_{\varphi\varphi}=2R^2\sin\theta\cos\theta$ です。第2節の式から

$$
\Gamma^\theta_{\varphi\varphi}=-\sin\theta\cos\theta,\qquad
\Gamma^\varphi_{\theta\varphi}
=\Gamma^\varphi_{\varphi\theta}=\cot\theta
$$

を得て、測地線方程式は

$$
\ddot\theta-\sin\theta\cos\theta\,\dot\varphi^2=0,\qquad
\ddot\varphi+2\cot\theta\,\dot\theta\dot\varphi=0.
$$

赤道 $\theta=\pi/2,\ \varphi(t)=\omega t+\varphi_0$ は両式を満たします。北緯に相当する $\theta=\theta_0\ne\pi/2$ の緯線で $\dot\varphi=\omega\ne0$ とすると、第一式の左辺は

$$
-\sin\theta_0\cos\theta_0\,\omega^2\ne0
$$

です。従って一般の緯線は測地線ではありません。**球面に埋め込んだ曲線の空間曲率がゼロ**である必要はなく、球面内の共変加速度がゼロかどうかを判定しています。

なお球面の北極・南極ではこの座標は使えません。局所座標の特異点を曲線の特異点と取り違えないようにします。

## 6. 停留・局所最短・大域最短を区別する

[VAR2の第二変分と最小性の区別](../VAR2/index.md#thm-var2-necessary)と同じく、測地線であることは第一変分が消えるという条件にすぎません。最短性をいうには比較する端点、曲線クラス、区間の大きさを固定する必要があります。

[GEO14のGaussの補題](../../../幾何系/GEO/GEO14/index.md#thm-geo14-gauss-lemma)は、点 $p$ から指数写像で出る放射方向と角方向が直交するという結果です。[正規球内の放射測地線の最短性](../../../幾何系/GEO/GEO14/index.md#thm-geo14-radial-minimizing)ではこの直交性を利用します。$U=\exp_p(B_R(0))$（$B_R(0)\subset T_pM$）を $p$ の正規球とし、$v\in B_R(0)$ と $q=\exp_p(v)$ を定めます。$p$ から $q$ へ至る放射測地線 $\gamma(t)=\exp_p(tv)$、$0\le t\le1$ について

$$
L[\gamma]=|v|_g,\qquad E[\gamma]=\frac12|v|_g^2
$$

であり、同じ端点を結び $U$ 内に含まれる任意の区分的 $C^1$ 曲線 $c:[0,1]\to U$ には

$$
L[c]\ge |v|_g,\qquad
E[c]\ge\frac12 L[c]^2\ge\frac12|v|_g^2
$$

が成り立ちます。前の不等式はGaussの補題に基づく結果、後の不等式は第1節のCauchy–Schwarz（ここでは区間長1）です。これで放射測地線は、$U$ 内の許容曲線の間で長さとエネルギーの双方を最小化します。一般の測地線も[GEO14の局所最短性](../../../幾何系/GEO/GEO14/index.md#cor-geo14-local-minimizing)により、十分短い区間では同様です。

しかし「各点の近くで最短」と「曲線全体が最短」は異なります。半径 $R$ の球面の赤道を一周すれば、始点と終点は同じなのに長さは $2\pi R>0$ です。同じ二端点を結ぶ定数曲線の長さは0です。赤道一周は測地線で固定端点エネルギー停留ですが、大域最短ではありません。二点が異なる場合でも、半周より長い大円弧は逆向きの短い大円弧より長くなります。

最小性を第二変分から詳細に判定するときは、[GEO17の第二変分公式](../../../幾何系/GEO/GEO17/index.md#thm-geo17-second-variation)に空間曲率が現れます。Jacobi場・共役点が最短性を失わせる機構はVAR5で、二点を結ぶ最小長の曲線の存在と完備性はVAR6で扱います。ここではそれらを仮定なしの大域定理として使いません。

## 7. 力のない粒子はいつ測地線を動くか

[AMECH3の作用原理](../../../物理系/AMECH/AMECH3/index.md#thm-amech3-euler-lagrange)では力学的ラグランジアンの運動エネルギー項とポテンシャルを比較しました。質量 $m>0$ の粒子が、時刻に依存しないRiemann計量 $g$ を運動エネルギーに持ち、位置ポテンシャル $V(x)$ を受けるなら

$$
\mathcal L(x,\dot x)
=\frac m2g_{ij}(x)\dot x^i\dot x^j-V(x)
$$

です。時間を固定して両端の位置を動かさない作用変分から

$$
m g_{kj}\ddot x^j
+\frac m2(\partial_i g_{kj}+\partial_j g_{ki}-\partial_k g_{ij})\dot x^i\dot x^j
+\partial_kV=0
$$

となります。逆計量を掛ければ

$$
\frac{D\dot\gamma}{dt}=-\frac1m\operatorname{grad}_gV,\qquad
\operatorname{grad}_gV=g^{mk}\partial_kV\,\partial_m.
$$

力がないとは $\operatorname{grad}_gV=0$ を意味します。そのとき物理時間がアフィンパラメータの測地線になります。ポテンシャルが定数の場合も同じです。一方、外力、速度依存力、時間依存計量がある場合には、この結論をそのまま適用できません。

ここでの「直進」はRiemann計量から定まるLevi-Civita接続についての自己平行性です。力がないことと座標加速度がゼロであることは、一般座標では同義ではありません。

# 演習

## VAR4-A01 長さとエネルギーの数値計算

- Level: A
- 目安時間: 12分

Euclid平面で $\gamma(t)=(3t,4t)$、$0\le t\le2$ とする。$L[\gamma]$ と $E[\gamma]$ を計算し、$L^2\le2(b-a)E$ の等号条件を検査せよ。

<!-- solution-start -->
### 詳細解答

$\dot\gamma=(3,4)$ なので $|\dot\gamma|=\sqrt{9+16}=5$ は一定です。

$$
L=\int_0^2 5\,dt=10,\qquad
E=\frac12\int_0^2 25\,dt=25.
$$

区間長は $b-a=2$ です。従って $L^2=100$、$2(b-a)E=2\cdot2\cdot25=100$。両者が等しいのは速度が一定であるという[GEO12の等号条件](../../../幾何系/GEO/GEO12/index.md#prop-geo12-length-energy)に一致します。
<!-- solution-end -->

## VAR4-A02 対角計量から運動エネルギー関数

- Level: A
- 目安時間: 12分

$M=\mathbb R^2$ に $ds^2=dx^2+4dy^2$ を入れる。$\mathcal L_g(x,y,\dot x,\dot y)$ を求め、固定端点エネルギー停留曲線の一般形を計算せよ。

<!-- solution-start -->
### 詳細解答

$g_{11}=1,g_{22}=4,g_{12}=0$ だから

$$
\mathcal L_g=\frac12(\dot x^2+4\dot y^2),\quad
\partial_{\dot x}\mathcal L_g=\dot x,\quad
\partial_{\dot y}\mathcal L_g=4\dot y.
$$

計量係数は位置に依らないので、$\partial_x\mathcal L_g=\partial_y\mathcal L_g=0$ です。Euler–Lagrange方程式は $\ddot x=0,\ 4\ddot y=0$、すなわち

$$
x(t)=A+Bt,\qquad y(t)=C+Dt.
$$

二端点の座標を与えれば $A,B,C,D$ は一意に決まります。係数4は長さの重みを変えますが、定数計量での測地線の像は直線です。
<!-- solution-end -->

## VAR4-A03 球面の赤道

- Level: A
- 目安時間: 15分

半径 $R$ の球面の計量 $ds^2=R^2(d\theta^2+\sin^2\theta\,d\varphi^2)$ について、$\theta=\pi/2,\ \varphi(t)=t$ が測地線であることを第5節の方程式へ直接代入して検査し、その速度を求めよ。

<!-- solution-start -->
### 詳細解答

$\dot\theta=\ddot\theta=0,\ \dot\varphi=1,\ \ddot\varphi=0$ です。第1式は $0-\sin(\pi/2)\cos(\pi/2)=0$、第2式は $0+2\cot(\pi/2)\cdot0\cdot1=0$ です。よって測地線です。

$$
|\dot\gamma|_g
=\sqrt{R^2\dot\theta^2+R^2\sin^2\theta\,\dot\varphi^2}
=\sqrt{0+R^2}=R.
$$

速さは一定ですが単位速ではありません。単位速にするなら弧長パラメータ $s=Rt$ を用います。
<!-- solution-end -->

## VAR4-A04 自由粒子とポテンシャル

- Level: A
- 目安時間: 12分

Euclid直線上で質量 $m>0$、ポテンシャル $V(x)=kx^2/2$（$k>0$）の場合のEuler–Lagrange方程式を求めよ。$k=0$ のとき測地線条件となることを検査せよ。

<!-- solution-start -->
### 詳細解答

力学的ラグランジアンは $\mathcal L=m\dot x^2/2-kx^2/2$ です。$\partial_{\dot x}\mathcal L=m\dot x$、$\partial_x\mathcal L=-kx$ なので

$$
\frac d{dt}(m\dot x)-(-kx)=0,\qquad m\ddot x+kx=0.
$$

$k=0$ なら $m\ddot x=0$、$m>0$ より $\ddot x=0$ です。Euclid計量のChristoffel係数はゼロなので、[測地線の座標方程式](../../../幾何系/GEO/GEO14/index.md#prop-geo14-geodesic-equation)と一致します。$k>0$ の場合は一般に $\ddot x\ne0$ で、自由運動ではありません。
<!-- solution-end -->

## VAR4-B01 極座標の保存量を導出する

- Level: B
- 目安時間: 22分

$ds^2=dr^2+r^2d\theta^2$ について、計量の運動エネルギー関数からEuler–Lagrange方程式を両成分とも直接導き、$r^2\dot\theta$ が一定であることを示せ。$r$ が定数で $\dot\theta\ne0$ となる測地線はあるか。

<!-- solution-start -->
### 詳細解答

$\mathcal L_g=(\dot r^2+r^2\dot\theta^2)/2$ です。

$$
\partial_{\dot r}\mathcal L_g=\dot r,\quad
\partial_r\mathcal L_g=r\dot\theta^2,\quad
\partial_{\dot\theta}\mathcal L_g=r^2\dot\theta,\quad
\partial_\theta\mathcal L_g=0.
$$

$r$ 成分は $d(\dot r)/dt-r\dot\theta^2=0$、$\theta$ 成分は $d(r^2\dot\theta)/dt=0$。後者を積の微分で展開すると $2r\dot r\dot\theta+r^2\ddot\theta=0$ なので

$$
\ddot r-r\dot\theta^2=0,\qquad
\ddot\theta+\frac{2\dot r\dot\theta}{r}=0.
$$

積分定数 $C$ により $r^2\dot\theta=C$ です。もし $r(t)=r_0>0$ が一定なら $\ddot r=0$ で、第一式は $-r_0\dot\theta^2=0$、従って $\dot\theta=0$。原点を中心とする非定数の円周運動はEuclid測地線ではありません。
<!-- solution-end -->

## VAR4-B02 自由な端点の境界条件

- Level: B
- 目安時間: 22分

滑らかなRiemann多様体 $(M,g)$ で、始点 $p$ は固定し、終点 $\gamma(b)$ は埋め込まれた部分多様体 $N\subset M$ 上を自由に動けるとする。エネルギー停留する滑らかな曲線について、内部条件と終点条件を求めよ。Euclid平面で $N=\{(x,0):x\in\mathbb R\}$ の場合も述べよ。

<!-- solution-start -->
### 詳細解答

終点が $N$ に属する曲線族 $F(s,t)$ の方向は $V(a)=0,\ V(b)\in T_{\gamma(b)}N$ を満たします。[GEO17のエネルギー第一変分](../../../幾何系/GEO/GEO17/index.md#thm-geo17-first-variation-energy)は

$$
\delta E
=g(V(b),\dot\gamma(b))
-\int_a^b g\left(V,\frac{D\dot\gamma}{dt}\right)dt.
$$

内部で台を持つ方向を任意に選ぶと $D\dot\gamma/dt=0$ が必要です。その後の第一変分は $g(V(b),\dot\gamma(b))$。終点近傍の滑らかな曲線を $N$ 内で任意の接ベクトル方向へ動かせるので、停留条件は

$$
g(\dot\gamma(b),w)=0\qquad(w\in T_{\gamma(b)}N)
$$

です。すなわち測地線が $N$ に直交して到達する条件です。これら二条件があれば第一変分は全ての許容変分でゼロとなるので十分でもあります。

Euclid平面で $N$ を $x$ 軸とすると $T_qN=\operatorname{span}\{(1,0)\}$。終端速度 $\dot\gamma(b)=(v_x,v_y)$ の $x$ 成分が $v_x=0$ でなければならず、曲線は縦に入射します。端点が自由なのに固定端と見なして境界項を消してはいけません。
<!-- solution-end -->

## VAR4-B03 非アフィンな進み方

- Level: B
- 目安時間: 20分

$\gamma(t)=(t,0)$、$0\le t\le1$ とし、$\phi(s)=(e^s-1)/(e-1)$、$\widetilde\gamma(s)=\gamma(\phi(s))$ とする。$0\le s\le1$ で長さ、エネルギー、加速度を計算し、長さ停留とエネルギー停留を区別せよ。

<!-- solution-start -->
### 詳細解答

$\phi'(s)=e^s/(e-1)>0$、$\phi''(s)=e^s/(e-1)>0$ です。端点は $\phi(0)=0,\phi(1)=1$、長さは

$$
L=\int_0^1\phi'(s)ds=\phi(1)-\phi(0)=1.
$$

エネルギーは

$$
E=\frac12\int_0^1\frac{e^{2s}}{(e-1)^2}ds
=\frac{e^2-1}{4(e-1)^2}
=\frac{e+1}{4(e-1)}>\frac12.
$$

不等式 $E>1/2$ は、分子を比較すると $e+1-2(e-1)=3-e>0$（$e<3$）と直接確認できます。独立な説明として、第1節の不等式 $E\ge L^2/2=1/2$ の等号条件からも、$\phi'$ が定数でないため厳密不等号だと分かります。

$\widetilde\gamma''(s)=(e^s/(e-1),0)\ne0$ よりEuclid測地線方程式を満たしません。一方、単位接ベクトルは $(1,0)$ で一定だから、[長さの第一変分](../../../幾何系/GEO/GEO17/index.md#thm-geo17-first-variation-length)は固定端方向に対してゼロです。
<!-- solution-end -->

## VAR4-C01 回転対称計量の測地線

- Level: C
- 目安時間: 35分

$u$ がある開区間、$v$ が局所角座標を動く曲面に、$f(u)>0$ を滑らかな関数として $ds^2=du^2+f(u)^2dv^2$ を入れる。

1. 計量の運動エネルギー関数から測地線方程式を導け。
2. $f(u)^2\dot v$ が保存することを示せ。
3. $u(t)\equiv u_0,\ v(t)=\omega t$（$\omega\ne0$）が測地線になる条件を求めよ。
4. $f(u)=R\sin(u/R)$、$0<u<\pi R$ と置いて、球面の緯線で測地線となるものを判定せよ。
5. これらの結果だけから大域最短が言えるか。

<!-- solution-start -->
### 詳細解答

計量は $g_{uu}=1,\ g_{vv}=f(u)^2,\ g_{uv}=0$ です。従って

$$
\mathcal L_g=\frac12\{\dot u^2+f(u)^2\dot v^2\}.
$$

偏微分を一つずつ計算すると

$$
\partial_{\dot u}\mathcal L_g=\dot u,\quad
\partial_u\mathcal L_g=ff'\dot v^2,\quad
\partial_{\dot v}\mathcal L_g=f^2\dot v,\quad
\partial_v\mathcal L_g=0.
$$

Euler–Lagrange方程式へ代入して

$$
\ddot u-ff'\dot v^2=0,\qquad
\frac d{dt}(f^2\dot v)=0
$$

を得ます。後者は $2ff'\dot u\dot v+f^2\ddot v=0$ でもあり、$f>0$ で割れば

$$
\ddot v+2\frac{f'}f\dot u\dot v=0.
$$

従って $f(u)^2\dot v=C$ が保存されます。$u(t)=u_0$、$v(t)=\omega t$ なら $\dot u=\ddot u=0,\dot v=\omega$ です。第二式は一定量 $f(u_0)^2\omega$ の微分なのでゼロ、第一式は

$$
-f(u_0)f'(u_0)\omega^2=0.
$$

$f(u_0)>0,\omega\ne0$ より条件は $f'(u_0)=0$ です。球面では $f'(u)=\cos(u/R)$ なので、$0<u_0<\pi R$ では $u_0=\pi R/2$ だけが条件を満たします。これは赤道です。

大域最短は従いません。[GEO14の局所最短性](../../../幾何系/GEO/GEO14/index.md#cor-geo14-local-minimizing)は十分短い区間に限られ、赤道を長く進めば同じ端点へ短い反対向きの大円弧が存在します。保存量とEuler–Lagrange方程式は停留性を与えるのであって大域比較を代替しません。
<!-- solution-end -->

## 章末チェック

- 計量から作った二次の運動エネルギー関数を位置と速度で微分し、Christoffel係数まで中間式を追えるか。
- 長さは再パラメータ化不変だが、エネルギーは一定速を選ぶ理由を説明できるか。
- 球面の赤道とそれ以外の緯線を、測地線方程式で区別できるか。
- 停留、局所最短、大域最短を混同していないか。
- 物理的な力がゼロとなるために、計量とポテンシャルへ何を仮定したか説明できるか。

次のVAR5では、エネルギーの第二変分に空間の曲率が入り、Jacobi場と共役点が現れる仕組みを具体計算します。
