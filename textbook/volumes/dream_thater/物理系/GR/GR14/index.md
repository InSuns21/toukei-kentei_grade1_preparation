# GR14 Killing場と測地線上の保存量

<!-- definition-example-audit: strict -->

[GR3の自由落下方程式](../GR3/index.md#thm-gr3-stationary-action)から測地線を求めるには、通常は四つの二階微分方程式を解かなければなりません。しかし計量が時間や角度に依存しないなら、運動の途中で変わらない量を先に見つけられます。これはNewton力学でエネルギーや角運動量を先に保存量として使う方法の、曲がった時空での対応です。

一方、[GR4の観測者が測るエネルギー](../GR4/index.md#def-gr4-measured-components)は観測者の四元速度にも依存しました。「ある座標で一定の数」と「実験室で測る数」が常に等しいわけではありません。本章では、計量の**対称性**をベクトル場の条件として捉え、測地線上の保存量を証明し、局所測定値と区別します。

以後、滑らかな時間向き付き4次元Lorentz時空 $(M,g)$、符号 $(-,+,+,+)$、$x^0=ct$、$c>0$ を使用します。$\nabla$ は[計量両立・捩率零のLevi-Civita接続](../../../幾何系/LORG/LORG4/index.md#thm-lorg4-lorentz-levi-civita)です。

時間的粒子の四元速度 $u=dx/d\tau$ は $g(u,u)=-c^2$、四元運動量は $p=mu$（$m>0$）とします。

光子ではアフィンパラメータで運ばれる物理的四元運動量 $p=\hbar k$ を使い、$g(p,p)=0$ とします。

時間並進生成場 $\xi=\partial_{x^0}$ は長さの次元を持つ座標での生成場なので、$-g(p,\xi)$ の単位は運動量、$-c\,g(p,\xi)$ はエネルギーです。$x^0$ の規格化を変えるとこのエネルギーも変わります。

## 1. 対称性を座標に頼らず言い表す

Minkowski時空の計量が時間に依存しないことは、同じ時間だけ動かしても時計・光円錐・距離の測定規則が変わらないことを意味します。この「点を移しても計量が変わらない」という条件を一般の時空へ拡張します。

滑らかなベクトル場 $\xi$ を使って各点を少し動かす局所的な流れを $\Phi_s$ とします。流れは微分方程式 $d\Phi_s(x)/ds=\xi(\Phi_s(x))$、$\Phi_0(x)=x$ から局所的に定まります。ベクトル場による計量の**Lie微分**は、計量を流れで引き戻した値の変化率です。

座標基底 $\partial_\mu$ で計量成分を $g_{\mu\nu}=g(\partial_\mu,\partial_\nu)$ と書くと、ベクトル場 $\xi=\xi^\rho\partial_\rho$ の計量双対の成分は

$$
\xi_\nu
=g(\partial_\nu,\xi)
=\xi^\rho g(\partial_\nu,\partial_\rho)
=g_{\nu\rho}\xi^\rho
$$

となります。この基底展開により、座標に依存しない定義を具体的な成分の条件に翻訳できます。

$$
(\mathcal L_\xi g)_x
=\left.\frac{d}{ds}\right|_{s=0}(\Phi_s^*g)_x.
$$

$\Phi_s^*g$ は、点を移した先の計量を元の点の二つの接ベクトルへ引き戻して比較する操作です。これが零なら計量はその流れで不変です。

<a id="def-gr14-killing-field"></a>

<!-- formal-statement-start -->
> **定義（Killing場）**  
> 滑らかなLorentz多様体 $(M,g)$ 上の滑らかなベクトル場 $\xi$ が、局所的な流れの定義域で

$$
\mathcal L_\xi g=0
$$

> を満たすとき、$\xi$ を **Killing場** と呼ぶ。この条件は、$g$ のLevi-Civita接続 $\nabla$ を用いた **Killing方程式**

$$
\nabla_\mu\xi_\nu+\nabla_\nu\xi_\mu=0,
\qquad \xi_\nu=g_{\nu\rho}\xi^\rho
$$

> と同値である。これは計量が正定値であることを要しない。
<!-- formal-statement-end -->

まず「座標独立な条件」と「実際の計算で使う条件」が一致することを導きます。

<a id="prop-gr14-killing-coordinate-test"></a>

<!-- formal-statement-start -->
> **命題（Killing方程式の座標表示）**  
> 滑らかなLorentz計量 $g$ とベクトル場 $\xi$ に対し、任意の局所座標で

$$
(\mathcal L_\xi g)_{\mu\nu}
=\xi^\rho\partial_\rho g_{\mu\nu}
+g_{\rho\nu}\partial_\mu\xi^\rho
+g_{\mu\rho}\partial_\nu\xi^\rho
=\nabla_\mu\xi_\nu+\nabla_\nu\xi_\mu
$$

> が成り立つ。したがって、ある座標成分 $x^a$ に計量成分が依存しなければ、座標ベクトル $\partial_{x^a}$ はその座標領域でKilling場である。
<!-- formal-statement-end -->

### 証明の見取り図

流れを一次まで展開し、計量の値が変わる寄与と座標基底が変わる寄与を足します。次に計量両立性と接続の対称性を代入します。

<!-- proof-start -->
### 証明

$\Phi_s^\alpha(x)=x^\alpha+s\xi^\alpha(x)+O(s^2)$ なので、連鎖律から

$$
\frac{\partial\Phi_s^\alpha}{\partial x^\mu}
=\delta^\alpha_\mu+s\partial_\mu\xi^\alpha+O(s^2).
$$

引き戻した計量は

$$
(\Phi_s^*g)_{\mu\nu}(x)
=g_{\alpha\beta}(\Phi_s(x))
\frac{\partial\Phi_s^\alpha}{\partial x^\mu}
\frac{\partial\Phi_s^\beta}{\partial x^\nu}.
$$

第一因子を $g_{\alpha\beta}(x)+s\xi^\rho\partial_\rho g_{\alpha\beta}+O(s^2)$ と展開します。三因子を掛けた一次の項は、計量自身の変化から一項、二つの基底のJacobianから各一項です。したがって

$$
\begin{aligned}
(\Phi_s^*g)_{\mu\nu}
={}&g_{\mu\nu}+s\bigl(
\xi^\rho\partial_\rho g_{\mu\nu}
+g_{\rho\nu}\partial_\mu\xi^\rho
+g_{\mu\rho}\partial_\nu\xi^\rho
\bigr)+O(s^2).
\end{aligned}
$$

$s=0$ で微分すると命題の第一の等式を得ます。

次に $\xi_\nu=g_{\nu\rho}\xi^\rho$ を微分して

$$
\begin{aligned}
\nabla_\mu\xi_\nu
&=\partial_\mu(g_{\nu\rho}\xi^\rho)-\Gamma^\sigma_{\mu\nu}g_{\sigma\rho}\xi^\rho\\
&=g_{\nu\rho}\partial_\mu\xi^\rho
+\xi^\rho\partial_\mu g_{\nu\rho}
-\Gamma^\sigma_{\mu\nu}g_{\sigma\rho}\xi^\rho.
\end{aligned}
$$

$\nabla g=0$ より

$$
\partial_\mu g_{\nu\rho}
=\Gamma^\sigma_{\mu\nu}g_{\sigma\rho}
+\Gamma^\sigma_{\mu\rho}g_{\nu\sigma}.
$$

したがって $\nabla_\mu\xi_\nu=g_{\nu\rho}\partial_\mu\xi^\rho+\xi^\rho\Gamma^\sigma_{\mu\rho}g_{\nu\sigma}$。$\mu,\nu$ を交換して加え、Christoffel係数の定義から得る

$$
\Gamma^\sigma_{\mu\rho}g_{\nu\sigma}
+\Gamma^\sigma_{\nu\rho}g_{\mu\sigma}
=\partial_\rho g_{\mu\nu}
$$

を代入すると、命題の第二の等式となります。$\xi=\partial_{x^a}$ では $\xi^\rho=\delta^\rho_a$ が定数なので、前二つの座標基底微分項が零になり、$\mathcal L_\xi g=\partial_a g$ です。$\square$
<!-- proof-end -->

<!-- definition-example-start: def-gr14-killing-field -->
**定義の確認**（時間並進と回転）。$r>0$ のMinkowski円柱座標

$$
ds^2=-(dx^0)^2+dr^2+r^2d\phi^2+dz^2,
\qquad \phi\sim\phi+2\pi
$$

では、$g_{\mu\nu}$ のどの成分も $x^0$ と $\phi$ に依存しません。$\xi=\partial_{x^0}$、$\psi=\partial_\phi$ はともに座標成分が定数なので、[座標表示の命題](#prop-gr14-killing-coordinate-test)に $\partial_0g_{\mu\nu}=\partial_\phi g_{\mu\nu}=0$ を代入するとKilling方程式の全成分が零と確認できます。

$\xi$ は $g(\xi,\xi)=-1$ の時間的場、$\psi$ は $g(\psi,\psi)=r^2>0$ の空間的場です。$\psi$ の軌道は角度を $2\pi$ 増やすと同じ点へ戻ります。回転対称は時間的対称でなくてもよい、という直接例です。
<!-- definition-example-end -->

この例で $\xi$ がどこでも時間的だったことは特殊な性質です。**Killing場一般が時間的とは限らず**、時間的という条件を付けないまま「保存量は正のエネルギー」と呼ぶのは危険です。

## 2. なぜ測地線上で一定になるのか

[GR3の測地線](../GR3/index.md#thm-gr3-stationary-action)は、時間的には $\nabla_u u=0$ を満たします。光的な場合も、[アフィンパラメータの光的測地線](../GR3/index.md#prop-gr3-null-affine-action)なら $\nabla_k k=0$ です。したがって質量正の自由粒子でも光子でも、対応する運動量 $p$ は進行方向へ平行です。

$a\mapsto\gamma(a)$ をアフィンパラメータ $a$ を持つ測地線とし、接ベクトル $v=d\gamma/da$ を置きます。計量による縮約 $g(\xi,p)=p_\mu\xi^\mu$ は、異なる点のベクトルを直接引き算することなく一つの数として比較できます。

<a id="thm-gr14-killing-charge"></a>

<!-- formal-statement-start -->
> **定理（Killing場による測地線保存量）**  
> 滑らかなLorentz時空 $(M,g)$ とそのKilling場 $\xi$ を考える。$\gamma:I\to M$ をアフィンパラメータ $a$ による $C^2$ 測地線とし、$v=d\gamma/da$ とする。$p=\alpha v$（$\alpha$ は定数）で定めた運動量なら、

$$
Q_\xi:=g(\xi,p)=p_\mu\xi^\mu
$$

> は $I$ 上で一定である。特に $p=mv$（質量正、$a=\tau$ が固有時）または $p=\hbar k$（アフィン光的波数 $k$）で成立する。
<!-- formal-statement-end -->

### 証明の見取り図

数値の微分は二つの項に分かれます。運動量の微分は測地線条件で消え、Killing場側の微分は速度二つとの対称な縮約で消えます。

<!-- proof-start -->
### 証明

$p=\alpha v$ は $\nabla_vp=\alpha\nabla_vv=0$ を満たします。Levi-Civita接続の計量両立性により、

$$
\frac{d}{da}g(\xi,p)
=g(\nabla_v\xi,p)+g(\xi,\nabla_vp)
=g(\nabla_v\xi,p).
$$

物理的な自由粒子・光子の $p$ は接ベクトルと定数倍の関係 $p=\alpha v$（$\alpha$ は軌道上一定）にあります。その場合

$$
\begin{aligned}
\frac{dQ_\xi}{da}
&=\alpha\,v^\mu v^\nu\nabla_\mu\xi_\nu\\
&=\frac{\alpha}{2}v^\mu v^\nu
(\nabla_\mu\xi_\nu+\nabla_\nu\xi_\mu)=0.
\end{aligned}
$$

任意の平行ベクトル $p$ で同じ結論が成り立つとは限りません。重要なのは $p=\alpha v$ であることです。$\square$
<!-- proof-end -->

定理の要点は **運動量が測地線の接方向に比例すること**です。任意の平行なベクトル $p$ なら必ず $g(\xi,p)$ が保存するわけではありません。以下では物理的自由粒子の運動量だけを扱います。

<a id="prop-gr14-force-nonaffine"></a>

<!-- formal-statement-start -->
> **命題（外力と非アフィンパラメータ）**  
> 時間的粒子が固有時 $\tau$ で動き、$p=mu$（$m$ 一定）、四元力 $F=\nabla_u p$ を受けるとする。Killing場 $\xi$ に対して

$$
\frac{d}{d\tau}g(\xi,p)=g(\xi,F)
$$

> である。また $w=d\gamma/ds$ を用いた非アフィン表示 $\nabla_w w=f(s)w$ では

$$
\frac{d}{ds}g(\xi,w)=f(s)g(\xi,w)
$$

> となる。よって単に曲線が測地線の像であるだけでは、任意のパラメータによる縮約は定数にならない。
<!-- formal-statement-end -->

### 証明の見取り図

前の証明で零にした項を、それぞれ外力、非アフィン加速度として残します。

<!-- proof-start -->
### 証明

$\frac{d}{d\tau}g(\xi,p)=g(\nabla_u\xi,p)+g(\xi,F)$。$p=mu$ かつ $m$ 一定より第一項は $m u^\mu u^\nu\nabla_\mu\xi_\nu=0$ です。非アフィンの場合も $\frac{d}{ds}g(\xi,w)=g(\nabla_w\xi,w)+g(\xi,\nabla_w w)$ と積の微分則を適用します。前項はKilling方程式で零、後項は $f(s)g(\xi,w)$ です。$\square$
<!-- proof-end -->

**反例。** 1+1次元Minkowski時空で同じ直線 $x^0=a,\ x^1=0$ を $a=s^2$（$s>0$）と書き直すと、$w=2s\partial_{x^0}$ です。$\xi=\partial_{x^0}$ はKilling場ですが、$g(\xi,w)=-2s$ は一定ではありません。失われた仮定は $s$ のアフィン性であり、$\nabla_w w=2\partial_{x^0}=(1/s)w$ が残るためです。

## 3. 時間並進と軸回転を E・L に換える

ある座標領域において $\partial_{x^0}$ と $\partial_\phi$ がKilling場であるとします。前者は時間並進、後者は角度 $2\pi$ に対応する軸回転の対称性です。ただし、座標名が $x^0$ や $\phi$ というだけでKilling場になるわけではありません。**計量がその座標に依存しない**ことが必要です。

<a id="def-gr14-energy-angular-momentum"></a>

<!-- formal-statement-start -->
> **定義（Killingエネルギーと軸角運動量）**  
> 座標 $x^0=ct,\phi$ に適合する二つのKilling場 $\xi=\partial_{x^0}$、$\psi=\partial_\phi$ が存在する領域で、自由粒子または光子の運動量 $p$ に対し

$$
E:=-c\,g(\xi,p)=-c\,p_0,\qquad
L:=g(\psi,p)=p_\phi
$$

> を、それぞれそのKilling場の規格化に関する **Killingエネルギー**、**軸角運動量** と定める。$E$ の単位はエネルギー、$L$ の単位は角運動量であり、時間的・光的アフィン測地線上で一定である。
<!-- formal-statement-end -->

$E$ の前の負号は未来向き時間的 $\xi$ と未来向き因果的 $p$ について $g(\xi,p)<0$ となる計量符号から来ます。$\xi$ が空間的になる領域では、同じ式でも $E$ が正とは限りません。時間座標を $y^0=a x^0$（定数 $a>0$）へ再規格化すると $\partial_{y^0}=\xi/a$、従って新しい生成場で定める $E$ は $E/a$ です。無限遠で $g(\xi,\xi)\to-1$ とするなど、物理的な規格化条件が別に要ります。

<!-- definition-example-start: def-gr14-energy-angular-momentum -->
**定義の確認**（Minkowski円柱座標）。先ほどの計量で、質量 $m>0$ の時間的自由粒子が $u^\mu=(\dot x^0,\dot r,\dot\phi,\dot z)$（点は $d/d\tau$）を持つとき

$$
p_0=g_{00}p^0=-m\dot x^0,\qquad
p_\phi=g_{\phi\phi}p^\phi=mr^2\dot\phi,
$$

なので $E=mc\dot x^0$、$L=mr^2\dot\phi$ です。$g_{0\phi}=0$ だからこの形ですが、交差項があると $p_0$ と $p_\phi$ は速度のそれぞれ一成分だけにはなりません。軸角運動量の $r^2$ は計量による添字下げで生じ、単に $\dot\phi$ を保存量としたものではありません。
<!-- definition-example-end -->

<a id="prop-gr14-cyclic-coordinate"></a>

<!-- formal-statement-start -->
> **命題（循環座標の正準運動量）**  
> 計量 $g_{\mu\nu}$ の座標成分が $x^a$ に依存しない領域で、アフィン測地線の接ベクトル $v^\mu=dx^\mu/ds$ を考える。二次ラグランジアン

$$
\mathscr L=\frac12g_{\mu\nu}(x)v^\mu v^\nu
$$

> の $v^a$ に関する正準運動量は $\partial\mathscr L/\partial v^a=g_{a\nu}v^\nu$ であり、測地線に沿って一定となる。これは $\partial_{x^a}$ がKilling場であることから得る $g(\partial_{x^a},v)$ と同じ数である。
<!-- formal-statement-end -->

### 証明の見取り図

計量の対称性によってラグランジアンから $x^a$ への明示依存がなくなります。Euler–Lagrange方程式を一成分だけ使って積分します。

<!-- proof-start -->
### 証明

速度成分を独立変数として微分すると

$$
\frac{\partial\mathscr L}{\partial v^a}
=\frac12(g_{a\nu}v^\nu+g_{\mu a}v^\mu)=g_{a\nu}v^\nu.
$$

また $\partial\mathscr L/\partial x^a=\tfrac12(\partial_a g_{\mu\nu})v^\mu v^\nu=0$。測地線の二次作用の停留条件は[GR3の光的二次作用と測地線](../GR3/index.md#prop-gr3-null-affine-action)で導いたEuler–Lagrange方程式なので、

$$
\frac{d}{ds}\left(\frac{\partial\mathscr L}{\partial v^a}\right)
=\frac{\partial\mathscr L}{\partial x^a}=0.
$$

ここで $g_{a\nu}v^\nu=g_{\mu\nu}(\partial_{x^a})^\mu v^\nu$ です。$\square$
<!-- proof-end -->

この命題は[Killing保存量の定理](#thm-gr14-killing-charge)の座標表示でもあります。ただし座標が使えない場所でも、ベクトル場と縮約による保存の主張は意味を持ちます。

## 4. 静止観測者が測るエネルギーは一定か

$\xi$ が時間的な領域で

$$
N(x):=\sqrt{-g(\xi,\xi)}>0
$$

と置くと、$\xi$ の積分曲線に沿って静止する観測者の規格化四元速度は $U=c\xi/N$ です。$g(U,U)=c^2g(\xi,\xi)/N^2=-c^2$ を確認でき、未来向きは $\xi$ の向きを選びます。この観測者が測る粒子・光子のエネルギーは[GR4の局所測定の定義](../GR4/index.md#def-gr4-measured-components)により $E_{\rm loc}=-g(p,U)$ です。

<a id="prop-gr14-local-energy-lapse"></a>

<!-- formal-statement-start -->
> **命題（静止観測者の局所エネルギー）**  
> 時間的な未来向きKilling場 $\xi=\partial_{x^0}$ の存在する領域で、$N=\sqrt{-g(\xi,\xi)}$、$U=c\xi/N$ と置く。自由粒子または光子のKillingエネルギー $E=-c\,g(\xi,p)$ に対して

$$
E_{\rm loc}=-g(p,U)=\frac{E}{N}
$$

> が成り立つ。軌道上で $E$ が一定でも、場所によって $N$ が異なれば、そこに静止する別々の観測者の測定値 $E_{\rm loc}$ は異なる。
<!-- formal-statement-end -->

### 証明の見取り図

局所観測の定義に正規化したKilling場を直接代入します。保存するのは $E$ であって、規格化因子 $N$ を含む局所量とは限りません。

<!-- proof-start -->
### 証明

$N>0$ かつ $g(\xi,\xi)=-N^2$ より $g(U,U)=-c^2$ です。観測者の局所エネルギーへ $U=c\xi/N$ を代入すると

$$
-g(p,U)=-\frac{c}{N}g(p,\xi)=\frac{E}{N}.
$$

[定理](#thm-gr14-killing-charge)はアフィン自由運動で $E$ の保存を与えますが $N$ を一定とはしていません。二つの事象で $E_{\rm loc,2}/E_{\rm loc,1}=N_1/N_2$ です。$\square$
<!-- proof-end -->

**直接計算。** 静的な対角計量

$$
ds^2=-N(r)^2(dx^0)^2+A(r)^2dr^2+r^2d\phi^2+dz^2
$$

で $N(r),A(r)>0$ とすると $\xi=\partial_{x^0}$、$\psi=\partial_\phi$ はKilling場です。質量正の測地線では

$$
E=mcN(r)^2\dot x^0,\qquad L=mr^2\dot\phi.
$$

静止観測者 $U=(c/N)\partial_{x^0}$ に対しては $E_{\rm loc}=mcN\dot x^0=E/N$ です。$N=N(r)$ が一定でない場合、二地点でこの値が違っても、測地線上の $E$ の保存と矛盾しません。[GR2の静止時計の固有時率](../GR2/index.md#prop-gr2-clock-rate)も $N$ を与えます。光の伝播と時計比較への応用は後のGR17で行います。

### 4.1 保存量と規格化条件から軌道を一階に落とす

同じ計量の $z=\text{定数}$ の時間的測地線に限ると、固有時の規格化と上の $E,L$ から

$$
\begin{aligned}
-c^2
&=-N^2(\dot x^0)^2+A^2\dot r^2+r^2\dot\phi^2,\\
\dot x^0&=\frac{E}{mcN^2},\qquad
\dot\phi=\frac{L}{mr^2}
\end{aligned}
$$

です。代入して移項すると

<a id="prop-gr14-radial-first-integral"></a>

<!-- formal-statement-start -->
> **命題（対角静的計量の一階軌道式）**  
> $N(r),A(r)>0$ が滑らかな領域で、上記の計量を持つ時空の $z$ 一定の時間的アフィン測地線について、質量 $m>0$、$E,L$ を前節の定義どおりとすると

$$
A(r)^2\dot r^2
=\frac{E^2}{m^2c^2N(r)^2}-c^2-\frac{L^2}{m^2r^2}
$$

> が成り立つ。ただしこれは軌道の必要な一階積分式であり、これだけで一般の場の方程式や半径方向の全ての初期条件を解決したとはいえない。
<!-- formal-statement-end -->

### 証明の見取り図

時間・角度の二階方程式を保存量で置き換え、残る規格化条件に代入します。符号は $g_{00}<0$ に依存します。

<!-- proof-start -->
### 証明

$-N^2(\dot x^0)^2=-E^2/(m^2c^2N^2)$、$r^2\dot\phi^2=L^2/(m^2r^2)$ なので、規格化式は

$$
-c^2=-\frac{E^2}{m^2c^2N^2}+A^2\dot r^2+\frac{L^2}{m^2r^2}.
$$

両辺を移項すると主張の式です。$z=\text{定数}$ が測地線の運動と両立するのは、この計量が $z$ に依存せず $g_{z\mu}=0$ で、初期条件 $\dot z=0$ としたためです。$z$ 成分の測地線方程式は $\ddot z=0$ となり、そのまま保たれます。$\square$
<!-- proof-end -->

この方法は後で球対称計量を導くGR15・Schwarzschild時空の光線や粒子の軌道を扱うGR18–19で利用します。この時点では **Schwarzschild解自体を仮定していません**。

## 5. 定常と静的は同じではない

まず時間並進の対称性があるという条件と、その時間方向に直交する空間面を選べるという、より強い条件を区別します。後者では時間方向のKilling場に直交する空間的超曲面を局所的に選べます。そのような時間座標を選べる領域では交差成分 $g_{0i}$ を零にした座標表示が可能です。したがって $g_{\mu\nu}$ が時間に依存しないだけで、同じ時間並進場が静的だとは結論できません。

<a id="def-gr14-stationary-static"></a>

<!-- formal-statement-start -->
> **定義（定常Killing場と静的Killing場）**  
> 時間向き付きLorentz時空の開領域 $U$ で、Killing場 $\xi$ が各点で未来向き時間的なら、$\xi$ を $U$ の **定常Killing場** と呼ぶ。さらに各点の近傍で $\xi$ と直交する空間的超曲面が存在するとき、$\xi$ をその領域の **静的Killing場** と呼ぶ。静的性はここでは指定したKilling場についての性質であり、別の時間並進Killing場が存在する可能性まで否定しない。
<!-- formal-statement-end -->

<!-- definition-example-start: def-gr14-stationary-static -->
**定義の確認**。 $N(r),A(r)>0$ を持つ前節の時間非依存対角計量では、$\xi=\partial_{x^0}$ の自己内積は $-N^2<0$、計量成分は時間非依存であり、$x^0=\text{定数}$ の接ベクトル $\partial_r,\partial_\phi,\partial_z$ と $\xi$ の内積は全部零です。この超曲面の誘導計量は $\operatorname{diag}(A^2,r^2,1)$ で、$r>0$ において正定値です。よって定常性と静的性の両方を直接確認できました。
<!-- definition-example-end -->

回転する座標に移るだけでも、「時間座標で変わらない」と「その時間方向に直交する空間面がある」を区別できます。Minkowski円柱座標の角度を $\phi=\varphi+\Omega x^0$（定数 $\Omega\ne0$、長さの逆数）で書き直すと

$$
ds^2=-(1-\Omega^2r^2)(dx^0)^2
+2\Omega r^2dx^0d\varphi
+dr^2+r^2d\varphi^2+dz^2.
$$

$\xi=\partial_{x^0}$ はKilling場で、$0<r<1/|\Omega|$ では $g(\xi,\xi)<0$ なので定常です。しかしこの $\xi$ に直交する超曲面は存在しません。座標1形式 $dx^0,dr,d\varphi$ の反対称積を $\wedge$ と書きます。例えば $dr\wedge dx^0=-dx^0\wedge dr$、$dr\wedge dr=0$ です。また1形式 $\alpha=\alpha_\mu dx^\mu$ の**外微分**とは

$$
d\alpha=\partial_\nu\alpha_\mu\,dx^\nu\wedge dx^\mu
$$

で作る2形式で、係数の微分と反対称積を組み合わせたものです。この道具で、時間方向に直交する超曲面があり得るかを確かめます。実際、$\xi$ の計量双対1形式を

$$
\alpha=g(\xi,\cdot)=-(1-\Omega^2r^2)dx^0+\Omega r^2d\varphi
$$

と書くと、

$$
\begin{aligned}
d\alpha&=2\Omega^2r\,dr\wedge dx^0
       +2\Omega r\,dr\wedge d\varphi,\\
\alpha\wedge d\alpha
&=-2\Omega r\,dx^0\wedge dr\wedge d\varphi\ne0
\qquad (r>0).
\end{aligned}
$$

後の積では、同じ1形式を二回含む項は零です。残りを $dx^0\wedge dr\wedge d\varphi$ の順にそろえると、係数は

$$
-2\Omega r(1-\Omega^2r^2)-2\Omega^3r^3=-2\Omega r
$$

となります。もし $\xi$ に直交する超曲面が局所的に $T=\text{定数}$ で表せるなら、$\alpha=h\,dT$（零でない関数 $h$）であり、積の微分から

$$
\alpha\wedge d\alpha
=h\,dT\wedge(dh\wedge dT+h\,d^2T)=0
$$

とならなければなりません。$d^2T=0$ は混合二階偏微分の交換です。非零の上式はそれに反するので、この回転する時間並進Killing場は静的ではありません。一方、**元のMinkowski時空そのものは慣性時間並進に関して静的**です。「交差項がある座標表示」という事実と「時空に静的対称性が全くない」という結論は区別します。

この回転座標では $p_0=-(1-\Omega^2r^2)p^0+\Omega r^2p^\varphi$、$p_\varphi=\Omega r^2p^0+r^2p^\varphi$ であり、$E$ と $L$ の計算には交差項が効きます。元の慣性角 $\phi=\varphi+\Omega x^0$ に対応するKilling場を $\xi_{\rm inertial}=\partial_{x^0}-\Omega\partial_\varphi$ とすると、慣性系でのエネルギーは

$$
E_{\rm inertial}
=-c\,g(p,\xi_{\rm inertial})
=E+c\Omega L.
$$

二種類の時間並進場の違いは保存量の違いとして現れます。光円柱 $r=1/|\Omega|$ を越えると $\xi$ は空間的になり、$E$ を静止観測者の正のエネルギーとして読むことはできません。

## 6. 演習：使える対称性と使えない対称性を見分ける

### Level A

<a id="ex-gr14-a01"></a>
#### GR14-A01 Killing方程式の直接判定
- Level: A

$ds^2=-(dx^0)^2+a(x)^2dx^2+dy^2+dz^2$（$a(x)>0$ が滑らか）について $\partial_{x^0}$ と $\partial_x$ がKilling場となるか、各条件を述べて判定せよ。

<!-- solution-start -->
**詳細解答。** $\partial_{x^0}$ の座標成分は定数で、$\partial_{x^0}g_{\mu\nu}=0$ だから[座標表示の判定](#prop-gr14-killing-coordinate-test)の右辺三項は全て零です。

一方 $\partial_x$ では $\partial_xg_{xx}=2aa'$ が残り、他の成分の微分は零です。従って $\partial_x$ がKilling場である必要十分条件は対象領域で $a'(x)=0$ です。$a>0$ なので $aa'=0$ と $a'=0$ は同値です。

$\partial_x$ がKillingでなくても、別の形のKilling場が存在しないとまでは言えません。
<!-- solution-end -->

<a id="ex-gr14-a02"></a>
#### GR14-A02 エネルギーの符号と単位
- Level: A

Minkowski時空で $p^\mu=(mc\gamma,mc\gamma\beta,0,0)$、$\gamma=(1-\beta^2)^{-1/2}$、$|\beta|<1$ とする。$\xi=\partial_{x^0}$ に対する $p_0$ と $E$ を求めよ。

<!-- solution-start -->
**詳細解答。** $g_{00}=-1$、$g_{0i}=0$ から $p_0=g_{00}p^0=-mc\gamma$。よって[定義](#def-gr14-energy-angular-momentum)から $E=-cp_0=mc^2\gamma$ です。$p_0$ は運動量の単位を持ち、$E$ はエネルギーの単位を持ちます。未来向きなので $\gamma>0$、従って $E>0$ です。
<!-- solution-end -->

<a id="ex-gr14-a03"></a>
#### GR14-A03 角度の保存量
- Level: A

Minkowski円柱座標で、時間的質点の $p_\phi$ を四元速度で求めよ。$r$ が変化する場合、$\dot\phi$ は一般に一定か。

<!-- solution-start -->
**詳細解答。** $\psi=\partial_\phi$ はKilling場、$g_{\phi\phi}=r^2$、$g_{\phi\mu}=0$（$\mu\ne\phi$）なので $L=p_\phi=mr^2\dot\phi$ が一定です。したがって $\dot\phi=L/(mr^2)$。$r$ が変わり $L\ne0$ なら $\dot\phi$ も変わります。$\dot\phi$ 単体を保存量にしない理由は計量による添字下げです。
<!-- solution-end -->

<a id="ex-gr14-a04"></a>
#### GR14-A04 静止時計と局所エネルギー
- Level: A

$ds^2=-N(x)^2(dx^0)^2+dx^2+dy^2+dz^2$、$N(x)>0$ で、$\partial_{x^0}$ を未来向きKilling場とする。静止観測者の四元速度を求め、$g(U,U)$ と $E_{\rm loc}$ を検算せよ。

<!-- solution-start -->
**詳細解答。** $g(\xi,\xi)=-N^2$ なので $U=c\xi/N$ です。$g(U,U)=c^2g(\xi,\xi)/N^2=-c^2$。観測値の定義は $E_{\rm loc}=-g(p,U)$ だから $E_{\rm loc}=-(c/N)p_0$。[Killingエネルギー](#def-gr14-energy-angular-momentum)の $E=-cp_0$ を代入すれば $E_{\rm loc}=E/N$。粒子が自由でも $N$ が変われば局所測定値は一定とは限りません。
<!-- solution-end -->

<a id="ex-gr14-a05"></a>
#### GR14-A05 非アフィンパラメータの落とし穴
- Level: A

平坦な1+1時空で $x^0=s^3$、$x^1=0$（$s>0$）と表した世界線と $\xi=\partial_{x^0}$ に対し、$g(\xi,dx/ds)$ を計算し、保存しない理由を述べよ。

<!-- solution-start -->
**詳細解答。** $w=3s^2\partial_{x^0}$ より $g(\xi,w)=-3s^2$ で一定ではありません。$\nabla_ww=d w/ds=6s\partial_{x^0}=(2/s)w$ となり、$s$ はアフィンではありません。[非アフィンの式](#prop-gr14-force-nonaffine)に $f=2/s$ を代入すると $\frac{d}{ds}(-3s^2)=(2/s)(-3s^2)=-6s$ で両辺が一致します。自由な測地線の像という情報だけでは、非アフィン速度の縮約は保存しません。
<!-- solution-end -->

### Level B

<a id="ex-gr14-b01"></a>
#### GR14-B01 Killing保存量を添字で証明
- Level: B

滑らかなKilling場 $\xi$ とアフィン測地線 $v=dx/ds$、定数 $\alpha$ に対して $Q=\alpha g(\xi,v)$ の微分を、共変微分を使って零まで証明せよ。

<!-- solution-start -->
**詳細解答。** $\nabla_vv=0$、$\nabla g=0$ を使い $dQ/ds=\alpha\{g(\nabla_v\xi,v)+g(\xi,\nabla_vv)\}=\alpha v^\mu v^\nu\nabla_\mu\xi_\nu$。$v^\mu v^\nu$ は $\mu,\nu$ 交換で対称なので

$$
\frac{dQ}{ds}=\frac\alpha2v^\mu v^\nu(\nabla_\mu\xi_\nu+\nabla_\nu\xi_\mu)=0.
$$

最後の括弧がKilling方程式です。計量両立性・アフィン測地線・Killing方程式をそれぞれどこで使ったかが分かります。
<!-- solution-end -->

<a id="ex-gr14-b02"></a>
#### GR14-B02 一階軌道式の許容領域
- Level: B

$ds^2=-N(r)^2(dx^0)^2+A(r)^2dr^2+r^2d\phi^2+dz^2$、$N,A>0$、$z=\text{定数}$ とする。質量正 $m$ の自由粒子について $\dot x^0,\dot\phi,\dot r^2$ を $E,L$ で表し、半径 $r$ が許容される必要条件を述べよ。

<!-- solution-start -->
**詳細解答。** $p_0=-mN^2\dot x^0$ と $p_\phi=mr^2\dot\phi$ なので $\dot x^0=E/(mcN^2)$、$\dot\phi=L/(mr^2)$。規格化 $-c^2=-N^2(\dot x^0)^2+A^2\dot r^2+r^2\dot\phi^2$ に代入して

$$
\dot r^2=\frac1{A^2}\left(\frac{E^2}{m^2c^2N^2}-c^2-\frac{L^2}{m^2r^2}\right).
$$

$A^2>0$、$\dot r^2\ge0$ だから $E^2/(m^2c^2N^2)\ge c^2+L^2/(m^2r^2)$ が必要です。等号はその瞬間の動径速度が零という意味で、それだけで安定円軌道とは結論できません。
<!-- solution-end -->

<a id="ex-gr14-b03"></a>
#### GR14-B03 回転座標の二つのエネルギー
- Level: B

平坦円柱座標で $\phi=\varphi+\Omega x^0$ とする。$E=-cp_0$、$L=p_\varphi$ をこの回転座標で定め、慣性時間並進の保存エネルギー $E_{\rm inertial}$ と比較せよ。また静止観測者が存在する範囲を求めよ。

<!-- solution-start -->
**詳細解答。** $\partial_{x^0}|_\phi=\partial_{x^0}|_\varphi-\Omega\partial_\varphi$ なので、慣性時間並進場は $\xi_{\rm inertial}=\xi-\Omega\psi$ です。したがって

$$
E_{\rm inertial}=-c\,g(p,\xi-\Omega\psi)
=-c\,g(p,\xi)+c\Omega g(p,\psi)=E+c\Omega L.
$$

回転時間並進場のノルムは $g(\xi,\xi)=-(1-\Omega^2r^2)$ で、未来向き時間的になるのは $r<1/|\Omega|$ です。$r=1/|\Omega|$ で光的、外側で空間的となり、回転静止観測者の四元速度 $c\xi/\sqrt{-g(\xi,\xi)}$ は外側では定義できません。
<!-- solution-end -->

<a id="ex-gr14-b04"></a>
#### GR14-B04 保存量がない場合の見分け
- Level: B

$ds^2=-a(x^0)^2(dx^0)^2+b(x^0)^2dx^2+dy^2+dz^2$（$a,b>0$、$b'\ne0$ の領域）で $\xi=\partial_{x^0}$ に対する $\mathcal L_\xi g$ を求めよ。$\xi$ に由来する測地線保存量の定理を適用できるか。座標変換で $a$ を定数にしても結論が変わるか。

<!-- solution-start -->
**詳細解答。** $\xi$ の座標成分は定数なので $\mathcal L_\xi g=\partial_0g$ です。非零候補は $(\mathcal L_\xi g)_{00}=-2aa'$、$(\mathcal L_\xi g)_{xx}=2bb'$ で、仮定 $b'\ne0$ と $b>0$ から少なくとも後者が非零です。

よってこの $\xi$ はKilling場でなく、[Killing保存量の定理](#thm-gr14-killing-charge)は適用できません。

$y^0=\int a(x^0)\,dx^0$ と置けば $dy^0/dx^0=a(x^0)>0$ なので局所的に可逆で、時間成分は $-(dy^0)^2$ となります。しかし連鎖律で

$$
\frac{db}{dy^0}=\frac{b'(x^0)}{a(x^0)}\ne0
$$

ですから、空間成分 $g_{xx}=b^2$ の時間依存は消えません。したがって新しい $\partial_{y^0}$ もKilling場ではありません。なお別のKilling場が存在するかはこの検査だけで確定できません。
<!-- solution-end -->

### Level C

<a id="ex-gr14-c01"></a>
#### GR14-C01 保存量・測定量・回転対称性の統合
- Level: C

時間向き付き領域 $r>0$ の計量

$$
ds^2=-N(r)^2(dx^0)^2+A(r)^2dr^2
+r^2(d\phi-\omega(r)dx^0)^2+dz^2
$$

を考える。$N,A>0$、$\omega$ は滑らかとする。時間的粒子 $p=mu$（$m>0$）のアフィン自由運動に対し、(i) 時間・角度のKilling場を確認し $E,L$ を $\dot x^0,\dot\phi$ で書け。(ii) $E,L$ を用いて $\dot x^0,\dot\phi$ を解け。(iii) $\xi=\partial_{x^0}$ が時間的である範囲を求めよ。(iv) $\omega=0$、$z=\text{定数}$ の場合に先ほどの一階軌道式へ戻ることを示せ。

<!-- solution-start -->
**詳細解答。** (i) 計量の成分は $x^0$ と $\phi$ に依存しないので $\xi=\partial_{x^0}$ と $\psi=\partial_\phi$ は[座標表示の命題](#prop-gr14-killing-coordinate-test)によってKilling場です。平方を展開すると $g_{00}=-N^2+r^2\omega^2$、$g_{0\phi}=-r^2\omega$、$g_{\phi\phi}=r^2$。従って

$$
\begin{aligned}
E&=-mc\{(-N^2+r^2\omega^2)\dot x^0-r^2\omega\dot\phi\},\\
L&=mr^2(\dot\phi-\omega\dot x^0).
\end{aligned}
$$

(ii) 第2式から $\dot\phi=L/(mr^2)+\omega\dot x^0$。第1式へ代入すると

$$
E=mcN^2\dot x^0+c\omega L,
\qquad
\dot x^0=\frac{E-c\omega L}{mcN^2}.
$$

したがって $\dot\phi=\omega(E-c\omega L)/(mcN^2)+L/(mr^2)$ です。

(iii) $\xi$ が時間的である条件は $g(\xi,\xi)=-N^2+r^2\omega^2<0$、すなわち $N^2>r^2\omega^2$ です。正しい時刻方向の判定には $g_{00}$ 全体が必要で、$N>0$ という条件だけでは不十分です。

(iv) $\omega=0$ で $\dot x^0=E/(mcN^2)$、$\dot\phi=L/(mr^2)$ です。$g(u,u)=-c^2$ より

$$
-c^2=-N^2\left(\frac{E}{mcN^2}\right)^2
+A^2\dot r^2+r^2\left(\frac{L}{mr^2}\right)^2.
$$

移項して $A^2\dot r^2=E^2/(m^2c^2N^2)-c^2-L^2/(m^2r^2)$ を得ます。$\omega\ne0$ なら交差成分がKilling量と座標速度の対応を変えるので、$\omega=0$ の式を無条件に転用できません。
<!-- solution-end -->

---

本章の保存量は **対称性を持つ計量の上を自由に動く粒子** に限って得られました。重力場が一般に時間変化する場合に大域エネルギー保存を無条件に仮定するのではなく、どのKilling場が存在するかを先に調べるのが重要です。次のGR15では球対称計量の座標を選び、GR16以降で場の方程式から計量そのものを求めて、この保存量を具体的な軌道計算へ使います。
