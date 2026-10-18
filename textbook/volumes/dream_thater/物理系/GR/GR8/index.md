# GR8 塵・完全流体とエネルギー運動量

<!-- definition-example-audit: strict -->

[GR7のEinsteinテンソルの共変発散零](../GR7/index.md#thm-gr7-einstein-divergence-free)は、時空の曲率から作ったテンソルに成り立つ幾何学的恒等式でした。しかし右辺に置きたい「物質のエネルギー・運動量」は、まだ曲がった時空では記述していません。[SREL7の完全流体](../../SREL/SREL7/index.md#def-srel7-perfect-fluid)は平坦時空の静止系でエネルギー密度と圧力を測り、運動する観測者が見る流束へ変換しました。曲がった時空では一つの慣性系を遠方まで延ばせないため、**各点の流体とともに動く観測者で物質を測り、その測定値をテンソルとしてつなぎたい**のです。

本章では物質の模型として塵と完全流体を仮定します。応力テンソルの式は等価原理だけから一意に導かれるのではなく、静止系で熱流束と異方性応力を持たないという**物質模型の選択**です。また局所収支式 $\nabla_\mu T^{\mu\nu}=0$ も、一般の任意の物質に無条件に成立する恒等式ではありません。外部とのエネルギー・運動量交換がない場合の運動方程式として置き、[GR7の幾何学的恒等式](../GR7/index.md#thm-gr7-einstein-divergence-free)との接続は後のGR12で検討します。

以下、$(M,g)$ は滑らかな時間向き付き4次元Lorentz多様体です。計量の符号は $(-,+,+,+)$、光速は $c>0$ とし、接続は[LORG4のLevi-Civita接続](../../../幾何系/LORG/LORG4/index.md#thm-lorg4-lorentz-levi-civita)を用います。

流体の四元速度 $u$ は未来向きで $C^1$ 級とし、規格化条件を課します。

$$
g_{\mu\nu}u^\mu u^\nu=-c^2.
$$

エネルギー密度と圧力も $C^1$ 級とします。添字 $\mu,\nu$ は $0,1,2,3$ を走り、上下の反復添字は総和を表します。座標は $x^0=ct$ を用います。このとき $T^{00}$ はエネルギー密度、$cT^{0i}$ はエネルギー流束と同じ単位を持ちます。

## 1. 静止観測者が測るエネルギー密度と圧力

流体と一緒に動く観測者は、[GR4の局所直交枠](../GR4/index.md#def-gr4-observer-frame)でその点の時間軸を $e_{(0)}=u/c$、空間軸を $e_{(i)}$ に取れます。静止系ではエネルギーの時間成分を $\varepsilon\ge0$（単位 J/m³）、互いに直交する三方向への運動量流束を同じ圧力 $p$（単位 Pa = J/m³）で表します。**完全流体**とは、この静止系で熱の流れがなく、応力が方向によらないという理想化です。ここで $p$ は符号を含む実数としても式を作れますが、通常の流体の例では $p\ge0$ を考えます。

静止系における反変成分は

$$
(T^{(a)(b)})=\operatorname{diag}(\varepsilon,p,p,p)
$$

です。この対角行列は任意の座標系の成分ではありません。時間軸 $u/c$ と三本の正規直交空間軸から作った枠での**測定成分**です。この条件をテンソルに言い換えれば、曲線座標でも同じ物質を記述できます。

[SREL7の流体直交射影](../../SREL/SREL7/index.md#def-srel7-orth-projector)は、符号 $(+,-,-,-)$ のMinkowski計量で $\Delta^\mu{}_\nu=\delta^\mu_\nu-u^\mu u_\nu/c^2$ と定めました。本章の計量は $(-,+,+,+)$ なので $g(u,u)=-c^2$ です。同じ「速度に平行な部分を引く」操作でも、係数の符号が変わります。

まず $u$ と直交する空間方向だけを取り出す道具を作ります。点 $q\in M$ で任意のベクトル $X$ の速度方向成分は、$u$ との内積から

$$
X_{\parallel}^\mu
=\frac{g(u,X)}{g(u,u)}u^\mu
=-\frac{u_\nu X^\nu}{c^2}u^\mu
$$

と定まります。これを $X$ から引くと、$u$ に平行な成分と直交する成分に分けられます。すなわち

$$
X^\mu=-\frac{u_\nu X^\nu}{c^2}u^\mu
+\left(X^\mu+\frac{u^\mu u_\nu X^\nu}{c^2}\right)
$$

と書きます。後ろの括弧を $u_\mu$ で縮約すると、$u_\mu u^\mu=-c^2$ によって零になります。

<a id="def-gr8-spatial-projector"></a>

<!-- formal-statement-start -->
> **定義（Lorentz時空の流体直交射影）**  
> 四次元Lorentz多様体の点において $g(u,u)=-c^2$ を満たす時間的ベクトル $u$ に対し、空間方向への射影を混合テンソル $h^\mu{}_\nu$ として、またその添字を上げた形を $h^{\mu\nu}$ として、次のように定める。

$$
h^\mu{}_\nu:=\delta^\mu_\nu+\frac{u^\mu u_\nu}{c^2},
\qquad
h^{\mu\nu}:=g^{\mu\nu}+\frac{u^\mu u^\nu}{c^2}.
$$

> $h^\mu{}_\nu X^\nu$ は $u$ に直交し、$u$ に直交するベクトルは変化させない。
<!-- formal-statement-end -->

<!-- definition-example-start: def-gr8-spatial-projector -->
**定義の確認**：Minkowski座標 $(ct,x,y,z)$ と $g_{\mu\nu}=\operatorname{diag}(-1,1,1,1)$ で、静止流体の $u^\mu=(c,0,0,0)$ を取ります。$u_\mu=(-c,0,0,0)$ となるのは計量で添字を下げるからです。このとき

$$
(h^\mu{}_\nu)=\operatorname{diag}(0,1,1,1),
\qquad
(h^{\mu\nu})=\operatorname{diag}(0,1,1,1).
$$

この行列の第0行が零なのは、速度方向 $(c,0,0,0)$ を消すためです。残る三つの対角成分が1なのは、$u$ に直交する空間ベクトル $X=(0,X^1,X^2,X^3)$ を保つためです。実際、

$$
\begin{aligned}
g(u,u)&=(-1)c^2=-c^2<0,\\
h^\mu{}_\nu u^\nu&=(0,0,0,0),\\
h^\mu{}_\nu X^\nu&=(0,X^1,X^2,X^3)=X^\mu.
\end{aligned}
$$

したがって時間方向の消去・空間方向の保持をそれぞれ確かめられます。また

$$
h^\mu{}_\alpha h^\alpha{}_\nu
=\delta^\mu_\nu+2\frac{u^\mu u_\nu}{c^2}
+\frac{u^\mu(u_\alpha u^\alpha)u_\nu}{c^4}
=h^\mu{}_\nu.
$$

したがって射影を二度かけても同じです。対角成分がこうなるのは静止直交枠を選んだためで、一般座標で $h^{00}=0$ としてよいわけではありません。
<!-- definition-example-end -->

## 2. 完全流体テンソルと圧力零の塵

流体とともに動く時計方向へ $\varepsilon$ を配し、直交する三方向へ等方的に $p$ を配ります。前節の射影により

$$
\varepsilon\frac{u^\mu u^\nu}{c^2}+p h^{\mu\nu}
=(\varepsilon+p)\frac{u^\mu u^\nu}{c^2}+p g^{\mu\nu}
$$

となります。右辺の $p g^{\mu\nu}$ だけを取ると静止系の時間成分が $-p$ になるため、$u^\mu u^\nu$ の係数に **$\varepsilon+p$** が必要です。

<a id="def-gr8-perfect-fluid-stress"></a>

<!-- formal-statement-start -->
> **定義（曲がった時空の完全流体エネルギー運動量テンソル）**  
> 時間向き付きLorentz多様体上で $g(u,u)=-c^2$ を満たす未来向き四元速度 $u$、固有エネルギー密度 $\varepsilon\ge0$、固有圧力 $p\in\mathbb R$ を持つ、静止系で熱流束と異方性応力を持たない完全流体のエネルギー運動量テンソルを

$$
\boxed{T^{\mu\nu}
=(\varepsilon+p)\frac{u^\mu u^\nu}{c^2}+p\,g^{\mu\nu}}
$$

> とする。これは対称な二階反変テンソルであり、任意の流体静止局所直交枠で $T^{(a)(b)}=\operatorname{diag}(\varepsilon,p,p,p)$ を満たす。
<!-- formal-statement-end -->

<!-- definition-example-start: def-gr8-perfect-fluid-stress -->
**定義の確認**：前節のMinkowski静止枠では $u^0=c$、$g^{00}=-1$、$g^{ij}=\delta^{ij}$ なので

$$
\begin{aligned}
T^{00}&=(\varepsilon+p)c^2/c^2+p(-1)=\varepsilon,\\
T^{0i}&=0,\\
T^{ij}&=p\delta^{ij}.
\end{aligned}
$$

エネルギー密度と三方向の圧力が指定どおりで、熱流束 $T^{0i}$ が零です。逆にここで時間成分を $\varepsilon+p$ のままにしてしまうと、圧力をエネルギーへ余分に数えたことになります。
<!-- definition-example-end -->

<a id="prop-gr8-rest-frame-equivalence"></a>

<!-- formal-statement-start -->
> **命題（完全流体テンソルの静止系との同値性）**  
> 符号 $(-,+,+,+)$ の四次元Lorentz多様体 $(M,g)$ の点 $q$ と、未来向き速度 $u\in T_qM$、固有エネルギー密度 $\varepsilon$、固有圧力 $p$ および二階反変テンソル $S$ を取る。これらには

$$
g(u,u)=-c^2,\qquad \varepsilon\ge0,\qquad p\in\mathbb R
$$

> を仮定する。時間軸を $e_{(0)}=u/c$ とする任意の局所直交枠で

$$
S^{(a)(b)}=\operatorname{diag}(\varepsilon,p,p,p)
$$

> と測定されることと、次のテンソル等式が成立することは同値である。

$$
S^{\mu\nu}
=(\varepsilon+p)\frac{u^\mu u^\nu}{c^2}+p\,g^{\mu\nu}.
$$
<!-- formal-statement-end -->

### 証明の見取り図

まず $u=c e_{(0)}$ と計量の正規直交成分を代入します。逆方向は局所直交枠が接空間の基底を成すので、その枠で全成分が一致する二つのテンソルは同じテンソルだという事実を使います。

<!-- proof-start -->
### 証明

任意の適合枠で $u^{(a)}=(c,0,0,0)$、$g^{(a)(b)}=\operatorname{diag}(-1,1,1,1)$ です。定義式へ成分を代入すると

$$
T^{(0)(0)}=(\varepsilon+p)-p=\varepsilon,\quad
T^{(0)(i)}=0,\quad
T^{(i)(j)}=p\delta^{ij}.
$$

逆に静止枠で指定の対角成分を持つテンソル $S$ があるとします。右辺のテンソルを

$$
Q^{\mu\nu}:=(\varepsilon+p)\frac{u^\mu u^\nu}{c^2}+p\,g^{\mu\nu}
$$

と置くと、上の直接計算から同じ基底で

$$
Q^{(a)(b)}=S^{(a)(b)}=\operatorname{diag}(\varepsilon,p,p,p)
$$

です。差 $S-Q$ は基底のすべての成分が零なので、基底変換後の座標成分も零です。従って $S=Q$ です。$\square$
<!-- proof-end -->

曲がった時空の式を平坦時空へ戻すとき、SREL7は $(+,-,-,-)$、本章は $(-,+,+,+)$ という違いがあります。[SREL7の定義](../../SREL/SREL7/index.md#def-srel7-perfect-fluid)を符号換算すると $-p\eta^{\mu\nu}_{(+---)}$ が $+p g^{\mu\nu}_{(-+++)}$ となり、観測値は変わりません。

<a id="def-gr8-dust"></a>

<!-- formal-statement-start -->
> **定義（圧力零の塵）**  
> 完全流体のうち固有圧力が $p=0$ で、固有静止質量密度 $\rho_0>0$ と固有エネルギー密度 $\varepsilon=\rho_0c^2$ を持つものを **塵** と呼ぶ。このとき

$$
T^{\mu\nu}=\rho_0u^\mu u^\nu.
$$

> 粒子一個の質量を一定の $m>0$ とし粒子数密度を $n>0$ で表す場合は $\rho_0=mn$ とする。
<!-- formal-statement-end -->

<!-- definition-example-start: def-gr8-dust -->
**定義の確認**：Minkowski静止系で $u=(c,0,0,0)$、$\rho_0=2\,\mathrm{kg/m^3}>0$ とします。規格化を満たすこの速度を塵の式へ代入すると

$$
\begin{aligned}
\varepsilon&=\rho_0c^2=2c^2\,\mathrm{J/m^3}>0,\\
T^{00}&=\rho_0(u^0)^2=2c^2\,\mathrm{J/m^3},\\
T^{0i}&=T^{ij}=0.
\end{aligned}
$$

静止系で空間応力がすべて零なので固有圧力 $p=0$ であり、質量密度とエネルギー密度の対応も確かめられました。動く座標系で $T^{ij}$ が非零でも、それは粒子の一方向の運動量流束であって静止系の**固有圧力**ではありません。
<!-- definition-example-end -->

## 3. 保存則を時間方向と空間方向へ分ける

流体要素に沿った微分と膨張率を、$C^1$ 級の場に対して次のように書きます。

$$
D f:=u^\mu\nabla_\mu f,\qquad
\theta:=\nabla_\mu u^\mu,\qquad
a^\nu:=u^\mu\nabla_\mu u^\nu.
$$

$Df$ はスカラー $f$ の流れに沿う変化、$\theta$ は四元速度の共変発散、$a$ は四元加速度です。[GR3の四元加速度](../GR3/index.md#def-gr3-four-acceleration)と同じ意味ですが、流体の各世界線へ適用しています。規格化 $u_\nu u^\nu=-c^2$ を微分すると

$$
0=D(u_\nu u^\nu)=2u_\nu a^\nu,
$$

ゆえに $a$ は $u$ に直交します。ここで計量両立性を使いました。

まず粒子数が生成・消滅しない場合の流れを整理します。SREL7の[粒子数四元流束](../../SREL/SREL7/index.md#def-srel7-particle-current)を各点の接空間へ延ばすと $N^\mu=nu^\mu$ です。共変微分で数えるのは、曲がった時空で座標体積が変わることも取り込むためです。

<a id="prop-gr8-curved-particle-continuity"></a>

<!-- formal-statement-start -->
> **命題（曲がった時空の粒子数連続の式）**  
> $C^1$ 級の $n>0$ と正規化された $C^1$ 級の $u$ を持つ流体について、粒子数生成がないという仮定 $\nabla_\mu(nu^\mu)=0$ は次と同値である。

$$
\boxed{Dn+n\theta=0.}
$$

> この粒子数保存の仮定は、エネルギー運動量保存だけからは一般に導かれない。
<!-- formal-statement-end -->

<!-- proof-start -->
### 証明

積の微分法則とスカラーの $\nabla_\mu n=\partial_\mu n$ から

$$
\nabla_\mu(nu^\mu)
=u^\mu\nabla_\mu n+n\nabla_\mu u^\mu
=Dn+n\theta.
$$

左右は同じ量なので零になる条件は同値です。$\square$
<!-- proof-end -->

次に**外力・外部場との交換がない物質のみ**について $\nabla_\mu T^{\mu\nu}=0$ を仮定します。右辺に四元力密度 $f^\nu$ がある場合は、以下の式の右辺にも射影された力が残ります。

<a id="thm-gr8-fluid-projections"></a>

<!-- formal-statement-start -->
> **定理（曲がった時空の完全流体のエネルギー方程式とEuler方程式）**  
> 四次元Lorentz時空上で $g(u,u)=-c^2$ を満たす $C^1$ 級の未来向き速度場 $u$、$C^1$ 級の $\varepsilon,p$ を取り、完全流体テンソル

$$
T^{\mu\nu}=(\varepsilon+p)\frac{u^\mu u^\nu}{c^2}
+p g^{\mu\nu}
$$

> に外部交換がなく $\nabla_\mu T^{\mu\nu}=0$ とする。この条件は、時間方向のエネルギー方程式と $u$ に直交するEuler方程式を同時に満たすことと同値である。

$$
\boxed{D\varepsilon+(\varepsilon+p)\theta=0,}
$$

$$
\boxed{\frac{\varepsilon+p}{c^2}a^\alpha
+h^{\alpha\nu}\nabla_\nu p=0.}
$$
<!-- formal-statement-end -->

### 証明の見取り図

積の微分を一度すべて展開します。$u_\nu$ を掛けるとエネルギー変化を、$h^\alpha{}_\nu$ を掛けると空間的な加速度と圧力勾配を取り出せます。二つを合わせると元の四成分に戻る点まで確かめます。

<!-- proof-start -->
### 証明

$w=\varepsilon+p$ と置きます。$\nabla_\mu g^{\mu\nu}=0$、積の微分法則と $a^\nu=D u^\nu$ より

$$
\begin{aligned}
\nabla_\mu T^{\mu\nu}
&=\nabla_\mu\left(\frac{w}{c^2}u^\mu u^\nu\right)
 +\nabla_\mu(pg^{\mu\nu})\\
&=\frac{u^\nu}{c^2}\bigl(Dw+w\theta\bigr)
 +\frac{w}{c^2}a^\nu+\nabla^\nu p.
\end{aligned}
$$

この式を $u_\nu$ で縮約します。$u_\nu u^\nu=-c^2$、$u_\nu a^\nu=0$、$u_\nu\nabla^\nu p=Dp$ なので

$$
\begin{aligned}
u_\nu\nabla_\mu T^{\mu\nu}
&=-(Dw+w\theta)+Dp\\
&=-D\varepsilon-(\varepsilon+p)\theta.
\end{aligned}
$$

したがって左辺が零なら第一式が得られます。次に $h^\alpha{}_\nu$ を掛けます。定義から $h^\alpha{}_\nu u^\nu=0$、$h^\alpha{}_\nu a^\nu=a^\alpha$、$h^\alpha{}_\nu\nabla^\nu p=h^{\alpha\nu}\nabla_\nu p$ なので

$$
h^\alpha{}_\nu\nabla_\mu T^{\mu\nu}
=\frac{\varepsilon+p}{c^2}a^\alpha
+h^{\alpha\nu}\nabla_\nu p.
$$

これが第二式です。逆向きには、任意のベクトル $V^\nu$ は

$$
V^\nu=-\frac{u_\alpha V^\alpha}{c^2}u^\nu
+h^\nu{}_\alpha V^\alpha
$$

へ分解できます。両射影が零なら $V^\nu=0$ です。$V^\nu=\nabla_\mu T^{\mu\nu}$ に適用すると二つの式から保存則が従い、同値性も示されました。$\square$
<!-- proof-end -->

$\varepsilon+p\ne0$ の場合は第二式を加速度について解けますが、$\varepsilon+p=0$ の場合には割ってはいけません。この場合、Euler式は $h^{\alpha\nu}\nabla_\nu p=0$ という制約を表すだけです。保存則だけでは $p$ を $n,\varepsilon$ から決定できません。物質ごとの**状態方程式**は別の入力です。

## 4. 塵の運動と粒子数保存の役割

圧力のない塵は「流体が各点で勝手な加速度を取れる」という模型ではありません。[GR3の測地線条件](../GR3/index.md#thm-gr3-stationary-action)によれば、適切な媒介変数として固有時を選んだ自由落下の世界線は $a^\nu=0$ を満たします。保存する塵が実際にこの条件へ帰着するのか調べます。

<a id="prop-gr8-dust-geodesic"></a>

<!-- formal-statement-start -->
> **命題（保存する塵の測地線運動）**  
> 開領域上で $\rho_0>0$ と正規化された $u$ が $C^1$ 級、$T^{\mu\nu}=\rho_0u^\mu u^\nu$ とする。$\nabla_\mu T^{\mu\nu}=0$ なら

$$
\boxed{\nabla_\mu(\rho_0u^\mu)=0,\qquad
u^\mu\nabla_\mu u^\nu=0}
$$

> が従う。逆にこの二式が成立すれば $\nabla_\mu T^{\mu\nu}=0$ である。塵が存在しない $\rho_0=0$ の点で速度の方程式を割り算から導くことはできない。
<!-- formal-statement-end -->

### 証明の見取り図

塵の保存則を、四元速度に平行な項と加速度項に展開します。規格化を微分して加速度の直交性を使い、まず密度保存を、続いて正の密度で割って測地線条件を出します。

<!-- proof-start -->
### 証明

$\rho_0$ と $u$ に積の微分を使って

$$
\nabla_\mu(\rho_0u^\mu u^\nu)
=u^\nu\nabla_\mu(\rho_0u^\mu)+\rho_0 a^\nu.
$$

両辺を $u_\nu$ で縮約すると $u_\nu a^\nu=0$ と $u_\nu u^\nu=-c^2$ より

$$
0=-c^2\nabla_\mu(\rho_0u^\mu).
$$

$c>0$ なので連続の式を得ます。これを最初の展開式へ戻すと $0=\rho_0a^\nu$ です。$\rho_0>0$ の仮定をここで初めて使い、$a^\nu=0$ となります。逆向きは二式を展開式へ代入して零になります。$\square$
<!-- proof-end -->

粒子一個の一定質量 $m$ を仮定すれば $\rho_0=mn$ なので、$\nabla_\mu(\rho_0u^\mu)=m\nabla_\mu(nu^\mu)$。従って塵については質量連続と粒子数連続が同値です。一方、一般の完全流体で粒子数保存を仮定しても、$\varepsilon$ には熱・内的エネルギーが含まれるため、一般に $\varepsilon=mn c^2$ とは限りません。

## 5. 動く観測者と静的重力場

### 5.1 一様に動く完全流体

Minkowski時空で流体が $x$ 方向に速さ $v$（$|v|<c$）で動くとき、$x^0=ct$ として

$$
\gamma=(1-v^2/c^2)^{-1/2},\qquad
u^\mu=\gamma(c,v,0,0)
$$

と置きます。この速度は

$$
g(u,u)=-\gamma^2c^2+\gamma^2v^2
=-\gamma^2(c^2-v^2)=-c^2
$$

と規格化されています。[完全流体テンソルの定義](#def-gr8-perfect-fluid-stress)に代入すると

$$
\begin{aligned}
T^{00}&=(\varepsilon+p)\gamma^2-p,\\
T^{01}&=(\varepsilon+p)\gamma^2 v/c,\\
T^{11}&=(\varepsilon+p)\gamma^2v^2/c^2+p,\\
T^{22}&=T^{33}=p.
\end{aligned}
$$

静止時の圧力 $p$ が、運動系のエネルギー流束 $cT^{01}$ にも寄与します。$v=0$ では前節の静止成分へ戻ります。$p=0$ でも運動系の $T^{11}$ は一般に零でないので、塵と「すべての座標で空間応力成分が零」は違います。

### 5.2 静止流体は重力場でなぜ圧力勾配を要するか

次に[GR6の静的lapse模型](../GR6/index.md#prop-gr6-static-lapse-ricci)と同じ形の滑らかな正関数 $N(\boldsymbol x)>0$ を取り、

$$
ds^2=-N(\boldsymbol x)^2(dx^0)^2
+dx^2+dy^2+dz^2,\qquad x^0=ct
$$

とします。計量行列は $\operatorname{diag}(-N^2,1,1,1)$ で、$N>0$ より非退化なLorentz計量です。座標的に静止する流体は $u^\mu=(c/N,0,0,0)$ で、

$$
g_{\mu\nu}u^\mu u^\nu=-N^2(c/N)^2=-c^2
$$

と規格化されています。$N$ と $\varepsilon,p$ は時間 $x^0$ に依らないと仮定します。

<a id="prop-gr8-hydrostatic-lapse"></a>

<!-- formal-statement-start -->
> **命題（静的lapse時空の完全流体の圧力平衡）**  
> 四次元時空の座標領域で $x^0=ct$、$N=N(x,y,z)>0$ を滑らかな時間に依らない関数とし、符号 $(-,+,+,+)$ の計量を

$$
ds^2=-N(x,y,z)^2(dx^0)^2+dx^2+dy^2+dz^2
$$

> とする。静止速度場 $u=(c/N)\partial_0$ と、時間に依らない $C^1$ 級の固有エネルギー密度 $\varepsilon\ge0$ および圧力 $p\in\mathbb R$ で、完全流体テンソル

$$
T^{\mu\nu}
=(\varepsilon+p)\frac{u^\mu u^\nu}{c^2}+p\,g^{\mu\nu}
$$

> を作る。このとき共変保存則 $\nabla_\mu T^{\mu\nu}=0$ は次の空間三式と同値である。

$$
\boxed{\partial_i p=-(\varepsilon+p)\,\partial_i\ln N
\quad(i=1,2,3).}
$$

> 時間方向のエネルギー方程式は自動的に成立する。$\varepsilon>0$ の静止塵 $p=0$ が保存則を満たすには $\nabla_{\boldsymbol x}N=0$ が必要である。
<!-- formal-statement-end -->

### 証明の見取り図

規格化済みの静止速度に対して接続から四元加速度を求めます。速度の膨張率と固有エネルギー密度の流れ方向微分は、時間独立性から零です。Euler式に加速度を入れれば平衡式になります。

<!-- proof-start -->
### 証明

計量成分の非零偏微分は $\partial_i g_{00}=-2NN_i$（$N_i=\partial_iN$）です。[LORG4のLevi-Civita接続公式](../../../幾何系/LORG/LORG4/index.md#thm-lorg4-lorentz-levi-civita)に代入すると

$$
\Gamma^0{}_{0i}=\frac{N_i}{N},
\qquad
\Gamma^i{}_{00}=NN_i
$$

（下二添字の交換も含む）以外の接続係数は零です。よって

$$
a^i=u^\mu(\partial_\mu u^i+\Gamma^i{}_{\mu\nu}u^\nu)
=\Gamma^i{}_{00}(u^0)^2
=NN_i(c/N)^2
=c^2\frac{N_i}{N}.
$$

時間成分は $u^i=0$ と $\partial_0 u^0=0$ から $a^0=0$。また

$$
\begin{aligned}
\theta&=\partial_\mu u^\mu+\Gamma^\mu{}_{\mu\nu}u^\nu=0,\\
D\varepsilon&=u^0\partial_0\varepsilon=0,
\end{aligned}
$$

です。最初の式では $\partial_0u^0=0$、$\Gamma^\mu{}_{\mu0}=0$ を使いました。$h^{ij}=\delta^{ij}$、$h^{i0}=0$ だから、[完全流体のEuler方程式](#thm-gr8-fluid-projections)の空間成分に代入して

$$
\frac{\varepsilon+p}{c^2}c^2\frac{N_i}{N}
+\delta^{ij}\partial_jp
=0,
$$

つまり $\partial_i p=-(\varepsilon+p)\partial_i\ln N$ です。時間方向は $a^0=0$、$h^{0\nu}=0$ なので自動的に成立し、[射影との同値性](#thm-gr8-fluid-projections)により元の保存則も満たします。

静止塵の $p=0$ と正密度 $\varepsilon>0$ を代入すれば

$$
0=-\varepsilon\frac{N_i}{N}.
$$

$N>0$ かつ $\varepsilon>0$ より各 $N_i=0$ です。$\square$
<!-- proof-end -->

この結果は、流体が「重力によって動かない」のではなく、静止するには圧力差が必要であることを示します。例えば $N(z)=1+gz/c^2>0$（ここで $g>0$ は加速度の大きさ）なら

$$
\frac{dp}{dz}=-\frac{\varepsilon+p}{c^2}\frac{g}{1+gz/c^2}.
$$

弱い場で $gz/c^2$ が小さく、$p\ll\varepsilon\approx\rho_0c^2$ なら $dp/dz\approx-\rho_0g$ となり、通常の静水圧式に戻ります。これは近似の**仮定**を使った帰結で、任意の高圧流体へ適用できるわけではありません。

## 6. 演習：物質模型・射影・重力場を接続する

### Level A

<a id="ex-gr8-a01"></a>
#### GR8-A01 射影の規格化と冪等性
- Level: A

$g(u,u)=-c^2$ のもとで $h^\mu{}_\nu u^\nu=0$ および $h^\mu{}_\alpha h^\alpha{}_\nu=h^\mu{}_\nu$ を示せ。

<!-- solution-start -->
**詳細解答。** [直交射影の定義](#def-gr8-spatial-projector)より

$$
h^\mu{}_\nu u^\nu=u^\mu+
u^\mu(u_\nu u^\nu)/c^2=u^\mu-u^\mu=0.
$$

また積を展開すると

$$
\begin{aligned}
h^\mu{}_\alpha h^\alpha{}_\nu
&=\delta^\mu_\nu+2u^\mu u_\nu/c^2
+u^\mu(u_\alpha u^\alpha)u_\nu/c^4\\
&=\delta^\mu_\nu+u^\mu u_\nu/c^2
=h^\mu{}_\nu.
\end{aligned}
$$

ここで $u_\alpha u^\alpha=-c^2$ を使います。従って零になる方向が $u$、保持される方向がその直交補空間です。
<!-- solution-end -->

<a id="ex-gr8-a02"></a>
#### GR8-A02 静止系での圧力の符号
- Level: A

$g=\operatorname{diag}(-1,1,1,1)$、$u=(c,0,0,0)$ のとき $T^{00},T^{11},T^{01}$ を求め、圧力項の符号を説明せよ。

<!-- solution-start -->
**詳細解答。** [完全流体テンソル](#def-gr8-perfect-fluid-stress)を代入して

$$
\begin{aligned}
T^{00}&=(\varepsilon+p)c^2/c^2+p(-1)=\varepsilon,\\
T^{11}&=0+p(1)=p,\\
T^{01}&=0.
\end{aligned}
$$

符号 $(-,+,+,+)$ のため $g^{00}=-1$ です。時間成分に圧力が余分に残らないのは二項が相殺するためです。
<!-- solution-end -->

<a id="ex-gr8-a03"></a>
#### GR8-A03 動く塵の運動量流束
- Level: A

Minkowski座標 $(ct,x,y,z)$ で $p=0$、$\varepsilon=\rho_0c^2$、$u=\gamma(c,v,0,0)$ とする。$T^{00},T^{01},T^{11}$ を求め、$v\ne0$ で $T^{11}$ が非零でも塵である理由を述べよ。

<!-- solution-start -->
**詳細解答。** $u_\mu u^\mu=\gamma^2(-c^2+v^2)=-c^2$ を確認し、[塵の定義](#def-gr8-dust)により

$$
T^{00}=\rho_0\gamma^2c^2,\quad
T^{01}=\rho_0\gamma^2cv,\quad
T^{11}=\rho_0\gamma^2v^2.
$$

$\rho_0>0$、$v\ne0$ なら $T^{11}>0$ です。しかし $p$ は流体静止系の等方的な空間応力であり、この $T^{11}$ は動く粒子群の運動量流束です。$u=(c,0,0,0)$ の枠へ戻せば空間応力は零です。
<!-- solution-end -->

<a id="ex-gr8-a04"></a>
#### GR8-A04 膨張する流れの粒子密度
- Level: A

ある流体の世界線に沿って $\theta=\theta_0$（定数）、$n>0$ で粒子数保存を満たすとする。固有時 $\tau$ での $n(\tau)$ を $n(0)=n_0$ から求めよ。

<!-- solution-start -->
**詳細解答。** [曲がった時空の粒子数連続の式](#prop-gr8-curved-particle-continuity)より $Dn+n\theta_0=0$。四元速度は $u^\mu=dx^\mu/d\tau$ なので $Dn=dn/d\tau$ です。$n>0$ だから両辺を $n$ で割り

$$
\frac{d}{d\tau}\ln n=-\theta_0,\quad
\ln n(\tau)-\ln n_0=-\theta_0\tau,\quad
n(\tau)=n_0e^{-\theta_0\tau}.
$$

膨張率が正なら密度は減少します。
<!-- solution-end -->

<a id="ex-gr8-a05"></a>
#### GR8-A05 密度零で割らない
- Level: A

塵に対し $\rho_0=0$ の領域で $\nabla_\mu T^{\mu\nu}=0$ から $a^\nu=0$ が導けるか判定せよ。

<!-- solution-start -->
**詳細解答。** [塵の保存則の展開](#prop-gr8-dust-geodesic)では

$$
0=u^\nu\nabla_\mu(\rho_0u^\mu)+\rho_0a^\nu
$$

です。$\rho_0$ が領域で恒等的に零なら両項とも零で、$u$ の加速度を制約しません。$\rho_0a^\nu=0$ から $a^\nu=0$ へ進むには $\rho_0>0$ が必要です。従って導けません。
<!-- solution-end -->

### Level B

<a id="ex-gr8-b01"></a>
#### GR8-B01 時間射影からエネルギー式を得る
- Level: B

$T^{\mu\nu}=(\varepsilon+p)u^\mu u^\nu/c^2+pg^{\mu\nu}$ と $u_\nu u^\nu=-c^2$、$\nabla_\mu T^{\mu\nu}=0$ を仮定し、$D\varepsilon+(\varepsilon+p)\theta=0$ を出発式から再導出せよ。

<!-- solution-start -->
**詳細解答。** $w=\varepsilon+p$ とし、[Levi-Civita接続の計量両立性](../../../幾何系/LORG/LORG4/index.md#thm-lorg4-lorentz-levi-civita)を使うと

$$
\nabla_\mu T^{\mu\nu}
=\frac{u^\nu}{c^2}(Dw+w\theta)
+\frac{w}{c^2}a^\nu+\nabla^\nu p.
$$

規格化を流れに沿って微分して $2u_\nu a^\nu=D(-c^2)=0$。この式を $u_\nu$ で縮約すると

$$
0=-(Dw+w\theta)+Dp
=-D(\varepsilon+p)-(\varepsilon+p)\theta+Dp.
$$

$-Dp$ と $+Dp$ が消えるので $D\varepsilon+(\varepsilon+p)\theta=0$ が従います。
<!-- solution-end -->

<a id="ex-gr8-b02"></a>
#### GR8-B02 速度に直交する運動方程式
- Level: B

$\nabla_\mu T^{\mu\nu}=0$ と $h^\alpha{}_\nu$ を用いて、圧力勾配と加速度の関係を示し、$\varepsilon+p=0$ の場合に割り算が許されない理由を説明せよ。

<!-- solution-start -->
**詳細解答。** [射影の定義](#def-gr8-spatial-projector)より $h^\alpha{}_\nu u^\nu=0$、$u_\nu a^\nu=0$ より $h^\alpha{}_\nu a^\nu=a^\alpha$ です。[保存則の展開](#thm-gr8-fluid-projections)に左から射影すると

$$
0=\frac{\varepsilon+p}{c^2}a^\alpha
+h^\alpha{}_\nu\nabla^\nu p
=\frac{\varepsilon+p}{c^2}a^\alpha+h^{\alpha\nu}\nabla_\nu p.
$$

$\varepsilon+p\ne0$ なら $a^\alpha=-c^2h^{\alpha\nu}\nabla_\nu p/(\varepsilon+p)$。零なら元の式は $h^{\alpha\nu}\nabla_\nu p=0$ のみを述べ、$a$ は決まりません。零除算によって存在しない運動方程式を作ってはいけません。
<!-- solution-end -->

<a id="ex-gr8-b03"></a>
#### GR8-B03 一次元静水圧の積分
- Level: B

静的lapse計量で $N(z)=1+\alpha z>0$、$\alpha\ne0$ とし、状態方程式 $\varepsilon=\kappa p$（定数 $\kappa\ge0$）と $p(z_0)=p_0>0$ を仮定する。局所平衡を満たす圧力を求めよ。

<!-- solution-start -->
**詳細解答。** [静的lapseの平衡式](#prop-gr8-hydrostatic-lapse)より

$$
\frac{dp}{dz}=-(\varepsilon+p)\frac{N'}{N}
=-(\kappa+1)p\frac{\alpha}{1+\alpha z}.
$$

$p>0$ の範囲で割り算して

$$
\frac{d}{dz}\ln p=-(\kappa+1)\frac{d}{dz}\ln N.
$$

$z_0$ から $z$ へ積分し

$$
\ln\frac{p(z)}{p_0}=-(\kappa+1)\ln\frac{N(z)}{N(z_0)},
\quad
p(z)=p_0\left(\frac{1+\alpha z}{1+\alpha z_0}\right)^{-(\kappa+1)}.
$$

$N>0$ の領域で圧力は正です。$\varepsilon=\kappa p$ は与えた状態方程式であり、保存則だけから導かれたものではありません。
<!-- solution-end -->

<a id="ex-gr8-b04"></a>
#### GR8-B04 塵の測地線はどこまで従うか
- Level: B

$\rho_0>0$、$T^{\mu\nu}=\rho_0u^\mu u^\nu$、$\nabla_\mu T^{\mu\nu}=0$ とする。$u_\nu a^\nu=0$ を示し、密度保存と測地線条件を順に導け。

<!-- solution-start -->
**詳細解答。** 正規化 $u_\nu u^\nu=-c^2$ と計量両立性により

$$
0=D(u_\nu u^\nu)=2u_\nu Du^\nu=2u_\nu a^\nu.
$$

質量流束の発散を $J:=\nabla_\mu(\rho_0u^\mu)$ と置きます。積の微分則から

$$
0=\nabla_\mu T^{\mu\nu}=u^\nu J+\rho_0a^\nu
$$

を得ます。$u_\nu$ で縮約し、直前に示した直交性を使うと

$$
0=u_\nu(u^\nu J+\rho_0a^\nu)
=-c^2J+0.
$$

$c>0$ より $J=0$ です。元の式へ戻すと $\rho_0a^\nu=0$ となり、正密度 $\rho_0>0$ を使って初めて $a^\nu=0$ と結論できます。
<!-- solution-end -->

### Level C

<a id="ex-gr8-c01"></a>
#### GR8-C01 静的な重力場で圧力と塵を比較する
- Level: C

$ds^2=-N(z)^2(dx^0)^2+dx^2+dy^2+dz^2$、$x^0=ct$、$N(z)=1+\alpha z>0$、$\alpha>0$ とする。静止する完全流体 $u=(c/N,0,0,0)$ を考える。

1. $u$ の規格化、$\Gamma^0{}_{0z}$、$\Gamma^z{}_{00}$、$a^z$ を求めよ。
2. $\nabla_\mu T^{\mu\nu}=0$ を仮定し、静止した完全流体が満たす圧力方程式を求めよ。
3. $\varepsilon=\varepsilon_0>0$ を定数とし、$p(z_0)=p_0>-\varepsilon_0$ から $p(z)$ を求めよ。
4. 同じ場で $\varepsilon=\varepsilon_0>0,p=0$ の静止塵を保存する模型にできるか説明せよ。

<!-- solution-start -->
**詳細解答。** (1) 計量は $g_{00}=-N^2$、$g^{00}=-N^{-2}$ です。$g(u,u)=(-N^2)(c/N)^2=-c^2$ なので規格化されます。[接続公式](../../../幾何系/LORG/LORG4/index.md#thm-lorg4-lorentz-levi-civita)に $\partial_z g_{00}=-2NN'$ を入れると

$$
\begin{aligned}
\Gamma^0{}_{0z}&=\tfrac12g^{00}\partial_zg_{00}
=\tfrac12(-N^{-2})(-2NN')=N'/N,\\
\Gamma^z{}_{00}&=-\tfrac12g^{zz}\partial_zg_{00}
=NN'.
\end{aligned}
$$

$u^z=0$、$\partial_0u^z=0$ なので

$$
a^z=u^\mu\nabla_\mu u^z
=\Gamma^z{}_{00}(u^0)^2
=NN'(c/N)^2=c^2N'/N.
$$

(2) 静止かつ時間に依らないため $\theta=0$、$D\varepsilon=0$ です。[流体のEuler方程式](#thm-gr8-fluid-projections)の $z$ 成分を取り $h^{zz}=1$ を代入すると

$$
0=(\varepsilon+p)a^z/c^2+\partial_zp
=(\varepsilon+p)\frac{\alpha}{1+\alpha z}+\frac{dp}{dz}.
$$

従って $dp/dz=-(\varepsilon+p)\alpha/(1+\alpha z)$ です。

(3) $\varepsilon=\varepsilon_0$ を代入し、$q(z):=\varepsilon_0+p(z)>0$ と置くと

$$
\frac{dq}{dz}=-q\frac{\alpha}{1+\alpha z},\qquad
\frac{d}{dz}\ln q=-\frac{d}{dz}\ln N.
$$

$z_0$ で $q_0=\varepsilon_0+p_0>0$ だから

$$
q(z)=q_0\frac{1+\alpha z_0}{1+\alpha z},\quad
p(z)=(\varepsilon_0+p_0)\frac{1+\alpha z_0}{1+\alpha z}-\varepsilon_0.
$$

$\varepsilon_0$ 一定は粒子数保存などを仮定して導いたものではなく、与えられた模型の条件です。

(4) 塵なら $p=0$ が全領域で成り立つので $\partial_z p=0$。平衡式は

$$
0=-\varepsilon_0\frac{\alpha}{1+\alpha z}
$$

を要求します。しかし $\varepsilon_0>0$、$\alpha>0$、$N>0$ なので右辺は負で矛盾します。静止した塵の世界線は $a^z=c^2\alpha/N\ne0$ であり、[保存する塵の測地線条件](#prop-gr8-dust-geodesic)にも反します。外力なしに静止は保てず、圧力による支持が必要です。
<!-- solution-end -->

## 7. 次章への接続

本章の $\nabla_\mu T^{\mu\nu}=0$ は、完全流体の運動を記述する局所的な方程式でした。物質が電磁場とエネルギー・運動量を交換すれば物質単独の発散は零とは限りません。また、**この保存則だけで計量がどう決まるかは分かりません**。次のGR9では物質作用を計量で変分し、流体とは異なる応力を持つ電磁場のエネルギー運動量テンソルへ進みます。
