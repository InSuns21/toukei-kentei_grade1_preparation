# GMECH4 運動量レベル集合・群作用・正則性

[GMECH3の幾何学的Noetherの定理](../GMECH3/index.md#thm-gmech3-geometric-noether)は、対称なHamiltonianの軌道では運動量写像の値が一定になると教えます。保存値を $\mu$ とすれば、運動は $J^{-1}(\mu)$ の中に閉じ込められます。しかし、保存値を固定しただけで自由度を数えてよいのでしょうか。また、もとの対称群 $G$ のすべての元が、この集合を保つのでしょうか。

この二つの問いには異なる条件が必要です。第一に、$J^{-1}(\mu)$ が滑らかな多様体であるには **正則値** が重要です。第二に、値が零でなければ通常は $G$ 全体でなく、$\mu$ を保つ **その値を保つ部分群** が働きます。さらに群軌道を滑らかに同一視するには **自由性・固有性** を調べます。本章はこれらを個別に証明し、次章のシンプレクティック簡約でどこに使うかを準備します。

## 1. 運動量の値を固定すると何が残るか

$M$ を次元 $2n$ の有限次元シンプレクティック多様体、$G$ を次元 $r$ の有限次元実Lie群とします。$G$ は $M$ に滑らかに左Hamilton作用し、$J:M\to\mathfrak g^*$ は[GMECH2の運動量写像](../GMECH2/index.md#def-gmech2-hamiltonian-action)です。Lie代数を $\mathfrak g$ とし、各 $\xi\in\mathfrak g$ について次の符号を使います。

$$
J_\xi=\langle J,\xi\rangle,\qquad
dJ_\xi=\iota_{\xi_M}\omega.
$$

例えば自由粒子の並進作用では $J(q,p)=p$ です。$p=\mu$ の平面は滑らかですが、一般の写像の逆像がいつでも滑らかとは限りません。ある点で微分が必要な方向をすべて捉えているかを確認します。

<a id="def-gmech4-level-regular"></a>

<!-- formal-statement-start -->
> **定義（運動量レベル集合と正則値）**  
> 有限次元の滑らかな写像 $J:M\to\mathfrak g^*$ と $\mu\in\mathfrak g^*$ に対して、運動量レベル集合を

$$
L_\mu=J^{-1}(\mu)=\{m\in M:J(m)=\mu\}
$$

> とする。$\mu$ が **正則値** であるとは、すべての $m\in L_\mu$ について線形写像

$$
dJ_m:T_mM\longrightarrow T_\mu\mathfrak g^*\simeq\mathfrak g^*
$$

> が全射であることをいう。全射でない点は臨界点、その像は臨界値と呼ぶ。空の逆像では条件は空虚に成立する。
<!-- formal-statement-end -->

<!-- definition-example-start: def-gmech4-level-regular -->
### 直接例：直線の並進

**定義の確認**：微分が任意の目標値を取れることを接ベクトルで構成し、レベル集合の次元を照合します。

$M=T^*\mathbb R$、$\omega=dq\wedge dp$、$G=(\mathbb R,+)$ が $a\cdot(q,p)=(q+a,p)$ と作用します。[余接持ち上げの標準運動量写像](../GMECH2/index.md#thm-gmech2-cotangent-momentum)は $J(q,p)=p$ です。任意の接ベクトル $(u,v)$ に対し

$$
dJ_{(q,p)}(u,v)=v.
$$

値域は $\mathbb R$ であり、$(u,v)=(0,c)$ を選べば任意の $c$ が得られます。したがってすべての $\mu\in\mathbb R$ は正則値で、

$$
L_\mu=\{(q,\mu):q\in\mathbb R\},\qquad
T_{(q,\mu)}L_\mu=\operatorname{span}\{\partial_q\}
$$

となります。この例で「方程式一つが次元を一つ減らす」が成立するのは、実際に微分の階数が $1$ だからです。
<!-- definition-example-end -->

<a id="prop-gmech4-tangent-regular"></a>

<!-- formal-statement-start -->
> **命題（正則レベル集合の接空間と次元）**  
> $M$ が次元 $2n$、$G$ が次元 $r$ の有限次元多様体・Lie群で、$J:M\to\mathfrak g^*$ が滑らかであるとする。$\mu$ を正則値とし、$L_\mu\ne\varnothing$ とする。このとき $L_\mu$ は $M$ の埋め込み部分多様体であり、各 $m\in L_\mu$ において

$$
T_mL_\mu=\ker dJ_m,\qquad \dim L_\mu=2n-r
$$

> が成立する。
<!-- formal-statement-end -->

### 証明の見取り図

全射性により、適切な局所座標で $J$ の成分を最初の $r$ 座標にできます。レベル集合はその $r$ 座標を固定することで得られ、残りが接方向になります。

<!-- proof-start -->
### 証明

点 $m\in L_\mu$ を一つ固定します。$\mathfrak g^*$ の基底を選んで $J=(J^1,\ldots,J^r)$ と書きます。$dJ_m$ の階数は $r$ ですから、$M$ の $m$ の近傍で座標 $(x^1,\ldots,x^{2n})$ を選び直し、写像

$$
x\longmapsto(J^1(x),\ldots,J^r(x),x^{r+1},\ldots,x^{2n})
$$

のJacobi行列が $m$ で可逆になるようにできます。具体的には、$dJ_m$ のある $r$ 列から可逆な $r$ 次小行列を選び、必要なら座標の順序を入れ替えます。逆写像定理によって、上式は $m$ の近傍で局所座標 $y$ を与えます。

その座標で $J=\mu$ は $y^1=\mu^1,\ldots,y^r=\mu^r$ と等価です。残る $2n-r$ 座標は自由に動けるので埋め込み部分多様体になり、接ベクトル $v$ が接する条件は $dJ_m(v)=0$ です。$m$ は任意なので結論が全点で成立します。
<!-- proof-end -->

**正則値でないと何が壊れるか。** 例えば実数値関数 $f(x,y)=xy$ の零レベルは二つの座標軸の交差です。原点で $df_0=0$ となり、交差点の近くでは一本の滑らかな曲線ではありません。運動量写像でもこの現象が起こることを第5節で確かめます。

## 2. 微分の階数を群軌道から判定する

$J$ のすべての成分を微分して階数を計算するのは高次元では大変です。しかし運動量写像の定義は、その微分を群の無限小生成子で表します。[LIE4の基本ベクトル場](../../../代数系/LIE/LIE4/index.md#def-lie4-fundamental-vector-field)を用いると、正則性が点の固定対称性に関係することが分かります。

各点 $m$ での軌道方向を

$$
T_m(G\cdot m)=\{\xi_M(m):\xi\in\mathfrak g\}
$$

と書きます。部分空間 $W\subseteq T_mM$ の $\omega$ 直交補空間を $W^\omega=\{v:\omega_m(w,v)=0\ (\forall w\in W)\}$ と表します。

<a id="prop-gmech4-kernel-stabilizer"></a>

<!-- formal-statement-start -->
> **命題（運動量写像の微分・軌道方向・正則性）**  
> 有限次元シンプレクティック多様体 $(M,\omega)$ 上の滑らかな左Hamilton作用と運動量写像 $J$ を考える。各点 $m\in M$ について

$$
\ker dJ_m=\bigl(T_m(G\cdot m)\bigr)^\omega
$$

> が成り立つ。また

$$
dJ_m\text{ が全射}\quad\Longleftrightarrow\quad
\mathfrak g_m:=\{\xi\in\mathfrak g:\xi_M(m)=0\}=\{0\}.
$$

> 特に $G$ の作用がその点で自由なら $dJ_m$ は全射である。逆向きに必要なのは等方Lie代数が零、すなわち局所自由性であり、有限の非自明な等方群が残っても全射性は成立しうる。
<!-- formal-statement-end -->

### 証明の見取り図

運動量写像を各 $\xi$ と対にして微分します。非退化な $\omega$ はベクトルと余接ベクトルを一対一に対応させるため、$dJ$ の転置の核は無限小的な固定方向と一致します。

<!-- proof-start -->
### 証明

任意の $v\in T_mM$ と $\xi\in\mathfrak g$ について[運動量写像の定義](../GMECH2/index.md#def-gmech2-hamiltonian-action)を点 $m$ で適用すると、

$$
\begin{aligned}
\langle dJ_m(v),\xi\rangle
&=d(J_\xi)_m(v)\\
&=(\iota_{\xi_M}\omega)_m(v)\\
&=\omega_m(\xi_M(m),v).
\end{aligned}
$$

左辺がすべての $\xi$ で零であることは $dJ_m(v)=0$ と同値です。右辺がすべての $\xi$ で零であることは $v\in(T_m(G\cdot m))^\omega$ と同値です。これで第一の等式を得ます。

次に有限次元線形写像 $dJ_m:T_mM\to\mathfrak g^*$ が全射となることは、転置

$$
(dJ_m)^*:\mathfrak g\longrightarrow T_m^*M,\qquad
(dJ_m)^*(\xi)(v)=\langle dJ_m(v),\xi\rangle
$$

が単射となることと同値です。上の計算より $(dJ_m)^*(\xi)=\omega_m(\xi_M(m),\cdot)$ です。[SYM4の非退化性によるHamiltonベクトル場の一意性](../../SYM/SYM4/index.md#thm-sym4-existence-coordinate)と同じ線形代数によって、この共変ベクトルが零であることは $\xi_M(m)=0$ と同値です。したがって転置の核は $\mathfrak g_m$ であり、主張が従います。

最後に[LIE4の安定化Lie環と軌道方向の定理](../../../代数系/LIE/LIE4/index.md#thm-lie4-stabilizer-kernel-orbit-rank)より $\mathfrak g_m$ は点の安定化部分群のLie代数です。自由作用なら安定化群は単位元だけなので、そのLie代数は零です。
<!-- proof-end -->

この命題は、正則性と自由性が**同じ条件ではない**ことも示します。例えば整数 $k\ge2$ に対し、$S^1$ が $Q=S^1$ に $g\cdot z=g^kz$ と作用し、$T^*S^1$ に余接持ち上げした場合、角座標 $\theta$ と共役運動量 $p$ を用いると、生成子は $k\partial_\theta$ で、運動量写像は $J(\theta,p)=kp$ です。実際、$dJ=k\,dp$ は全射ですが、各点を固定する群元は $g^k=1$ を満たす $k$ 個あり、作用は自由ではありません。つまり局所自由性だけでは通常の滑らかな商を得るための自由性を代用できません。

## 3. 零でない運動量を保つのはどの群か

ここからは $J$ が余随伴同変であると仮定します。[GMECH2の余随伴作用・同変性の定義](../GMECH2/index.md#def-gmech2-coadjoint-equivariance)を再確認すると、左余随伴作用は

$$
\langle\operatorname{Ad}_g^*\mu,\xi\rangle
=\langle\mu,\operatorname{Ad}_{g^{-1}}\xi\rangle
$$

と定め、同変性とは $J(g\cdot m)=\operatorname{Ad}_g^*J(m)$ です。運動量写像が存在するだけでは同変性は保証されないため、ここで仮定を追加しています。

$J(m)=\mu$ の点に群元 $g$ を作用させると運動量は $\operatorname{Ad}_g^*\mu$ へ動きます。したがって **$J^{-1}(\mu)$ 自身に作用する部分群** を選ぶ必要があります。

<a id="def-gmech4-coadjoint-stabilizer"></a>

<!-- formal-statement-start -->
> **定義（余随伴安定化群）**  
> 有限次元Lie群 $G$ と $\mu\in\mathfrak g^*$ に対し、余随伴安定化群とそのLie代数を

$$
G_\mu=\{g\in G:\operatorname{Ad}_g^*\mu=\mu\},\qquad
\mathfrak g_\mu=T_eG_\mu
$$

> とする。$G_\mu$ は $G$ の閉Lie部分群である。
<!-- formal-statement-end -->

<!-- definition-example-start: def-gmech4-coadjoint-stabilizer -->
### 直接例：空間回転と角運動量

**定義の確認**：余随伴作用を具体的な回転に直し、保存値を固定する群元をすべて求めます。

$G=SO(3)$ のLie代数・双対を標準内積で $\mathbb R^3$ と同一視します。[GMECH2の回転の運動量写像](../GMECH2/index.md#thm-gmech2-cotangent-momentum)は $T^*\mathbb R^3$ 上で $J(q,p)=q\times p$ です。余随伴作用は通常の回転 $\mu\mapsto R\mu$ になります。

$\mu=(0,0,\ell)$、$\ell\ne0$ とすると、$R\mu=\mu$ である回転は $z$ 軸の周りの回転に限られ、

$$
G_\mu=\{R_z(\theta):\theta\in\mathbb R\}\simeq SO(2).
$$

実際、$R\mu=\mu$ から $Re_3=e_3$ が従い、直交性と $\det R=1$ により $e_3^\perp$ 上への制限は2次元回転です。一方 $\mu=0$ ならすべての回転が零を固定するので $G_0=SO(3)$ です。非零の保存値では安定化群が小さくなることが分かります。
<!-- definition-example-end -->

<a id="prop-gmech4-level-action"></a>

<!-- formal-statement-start -->
> **命題（運動量レベル集合への制限作用）**  
> 有限次元Lie群 $G$ が $M$ に左Hamilton作用し、同変な運動量写像 $J:M\to\mathfrak g^*$ を持つとする。任意の $\mu\in\mathfrak g^*$、$g\in G$ に対して

$$
g\cdot L_\mu=L_{\operatorname{Ad}_g^*\mu}.
$$

> 特に $G_\mu$ は $L_\mu$ に作用する。さらに $\xi\in\mathfrak g_\mu$ と $m\in L_\mu$ に対して $\xi_M(m)\in\ker dJ_m$ が成り立つ。
<!-- formal-statement-end -->

### 証明の見取り図

レベル集合の一点を動かし、同変性の式に代入するだけで集合の包含が出ます。逆包含には $g^{-1}$ を使い、接方向は一パラメータ部分群で微分します。

<!-- proof-start -->
### 証明

$m\in L_\mu$ なら $J(m)=\mu$ なので、[運動量写像の同変性](../GMECH2/index.md#def-gmech2-coadjoint-equivariance)を使って

$$
J(g\cdot m)=\operatorname{Ad}_g^*J(m)
=\operatorname{Ad}_g^*\mu.
$$

従って $gL_\mu\subseteq L_{\operatorname{Ad}_g^*\mu}$ です。逆に $m'\in L_{\operatorname{Ad}_g^*\mu}$ に $g^{-1}$ を作用させると

$$
J(g^{-1}\cdot m')=\operatorname{Ad}_{g^{-1}}^*
(\operatorname{Ad}_g^*\mu)=\mu.
$$

したがって $g^{-1}\cdot m'\in L_\mu$ であり、逆包含も成立します。$g\in G_\mu$ なら像のレベルは $\mu$ のままです。

$\xi\in\mathfrak g_\mu$ については $\exp(t\xi)\in G_\mu$ ですから、$J(\exp(t\xi)\cdot m)=\mu$ を $t=0$ で微分すると

$$
dJ_m(\xi_M(m))=0.
$$

正則値の場合は[接空間の命題](#prop-gmech4-tangent-regular)により、この方向は $T_mL_\mu$ に属します。
<!-- proof-end -->

$G_\mu$ が閉Lie部分群であることは、[LIE4の安定化群の定理](../../../代数系/LIE/LIE4/index.md#prop-lie4-stabilizer-lie-subgroup)を、滑らかな余随伴作用の点 $\mu$ に適用して確かめられます。$\mu=0$ はいつでも余随伴作用の固定点ですが、**$\mu\ne0$ でも群が可換なら $G_\mu=G$** です。非零という数値だけで安定化群の次元は決まりません。

同変でない運動量写像では $G_\mu$ によるレベル保存をこのまま結論できません。[GMECH2の非同変例](../GMECH2/index.md#ex-gmech2-b02)を思い出してください。この章の以後の商構成は同変性を明示的に仮定します。

## 4. いつ群軌道を滑らかに割れるか

レベル集合が滑らかでも、そこにできる群軌道を潰した空間が滑らかとは限りません。固定点では軌道の次元が突然変わります。また、群軌道同士が好ましくない形で近付くと、商の位相も壊れます。この二つの障害を区別しておきます。

<a id="def-gmech4-free-proper"></a>

<!-- formal-statement-start -->
> **定義（自由作用と固有作用）**  
> Lie群 $H$ が多様体 $N$ に滑らかに作用するとき、すべての $x\in N$ の安定化群 $H_x$ が単位元のみなら **自由** であるという。また写像

$$
\Psi:H\times N\longrightarrow N\times N,\qquad
\Psi(h,x)=(x,h\cdot x)
$$

> が固有写像（コンパクト集合の逆像がコンパクト）なら作用を **固有** という。
<!-- formal-statement-end -->

<!-- definition-example-start: def-gmech4-free-proper -->
### 直接例：並進作用と原点の回転

**定義の確認**：安定化群が自明か、作用写像のコンパクト逆像がコンパクトかを別々に判定します。

$\mathbb R$ が $T^*\mathbb R$ に $a(q,p)=(q+a,p)$ と作用すると、$(q+a,p)=(q,p)$ から $a=0$ なので自由です。また $(q,a)$ を $(q,q+a)$ に送る写像は逆写像 $(q,q')\mapsto(q,q'-q)$ を持ちます。$p$ も含む $\Psi$ の逆像で、二点がともにコンパクト範囲にあれば $q$ と $q+a$ が有界だから $a$ も有界で、閉性と合わせコンパクトになります。従って固有です。

対して $SO(2)$ の $T^*\mathbb R^2$ への同時回転作用は、群自体がコンパクトなので固有ですが、原点 $(q,p)=(0,0)$ は全 $SO(2)$ に固定され、自由ではありません。固有性だけで自由性は得られません。
<!-- definition-example-end -->

<a id="prop-gmech4-free-proper-restriction"></a>

<!-- formal-statement-start -->
> **命題（レベル集合に制限した作用の自由性・固有性）**  
> 同変な運動量写像 $J$ を持つ $G$ 作用について、$\mu$ を正則値、$L_\mu\ne\varnothing$ とする。$G_\mu$ の $L_\mu$ への作用は滑らかである。$G$ の $M$ への作用が自由なら制限作用も自由であり、$G$ の $M$ への作用が固有なら制限作用も固有である。$G$ がコンパクトな場合、$G_\mu$ のレベル集合への作用は自動的に固有だが、自由性は別途確認が必要である。
<!-- formal-statement-end -->

### 証明の見取り図

自由性は固定点を与える方程式が同じであることから従います。固有性では $G_\mu$ が閉部分群、$L_\mu$ が閉部分集合であることを使い、もとの固有写像のコンパクト逆像の閉部分集合に帰着します。

<!-- proof-start -->
### 証明

[レベル集合への制限作用](#prop-gmech4-level-action)が存在します。$G_\mu$ の元 $h$ が $m\in L_\mu$ を固定すれば、$h$ はもとの $G$ の作用でも $m$ を固定します。もとの作用が自由なら $h=e$ です。

固有性を示します。$K\subset L_\mu\times L_\mu$ をコンパクトとします。$L_\mu=J^{-1}(\{\mu\})$ は、連続写像 $J$ による閉集合の逆像なので $M$ の閉部分集合です。また[GMECH4の余随伴安定化群](#def-gmech4-coadjoint-stabilizer) $G_\mu$ は $G$ の閉部分群です。$G\times M$ から $M\times M$ への作用写像を $\Psi_G$ と書くと、$G$ の固有性により $\Psi_G^{-1}(K)$ はコンパクトです。制限作用の逆像は

$$
\Psi_{G_\mu}^{-1}(K)
=\Psi_G^{-1}(K)\cap(G_\mu\times L_\mu).
$$

右辺はコンパクト集合の閉部分集合なのでコンパクトです。従って制限作用は固有です。

$G$ がコンパクトならその閉部分群 $G_\mu$ もコンパクトであり、任意のコンパクト $K\subset L_\mu\times L_\mu$ に対して $\Psi_{G_\mu}^{-1}(K)$ は $G_\mu\times\operatorname{pr}_1(K)$ の閉部分集合です。この直積はコンパクトなので固有性が従います。
<!-- proof-end -->

<a id="thm-gmech4-smooth-quotient"></a>

<!-- formal-statement-start -->
> **定理（正則運動量レベルの滑らかな商）**  
> $(M,\omega)$ を次元 $2n$ の有限次元シンプレクティック多様体、$G$ を次元 $r$ のLie群とする。$G$ が $M$ に滑らかに左Hamilton作用し、同変な運動量写像 $J:M\to\mathfrak g^*$ を持つとする。$\mu$ が正則値で $L_\mu\ne\varnothing$ とし、さらに $G_\mu$ の $L_\mu$ への作用が自由かつ固有と仮定する。このとき軌道空間

$$
M_\mu=L_\mu/G_\mu
$$

> には、自然な射影 $\pi_\mu:L_\mu\to M_\mu$ が滑らかな全射劣沈写像となる一意な滑らかな多様体構造があり、

$$
\dim M_\mu=2n-\dim G-\dim G_\mu
$$

> となる。この定理は商が滑らかな多様体になることまでを主張する。商上のシンプレクティック形式の構成と非退化性は次章で証明する。
<!-- formal-statement-end -->

### 証明の見取り図

正則値条件がレベル集合の次元を決め、自由かつ固有な作用の局所的な軌道方向を切り離すと商の局所座標が得られます。自由作用の各軌道の次元は $\dim G_\mu$ なので、その数だけ減算します。

<!-- proof-start -->
### 証明

[正則レベル集合の接空間と次元](#prop-gmech4-tangent-regular)から $L_\mu$ は次元 $2n-r$ の多様体です。[レベル集合への制限作用](#prop-gmech4-level-action)から $G_\mu$ はそこに滑らかに作用します。

自由かつ固有なLie群作用の局所商構成を、この場合に適用します。点 $m$ において群軌道写像の微分

$$
\mathfrak g_\mu\longrightarrow T_mL_\mu,\qquad
\xi\longmapsto\xi_M(m)
$$

は自由性と[LIE4の軌道方向の定理](../../../代数系/LIE/LIE4/index.md#thm-lie4-stabilizer-kernel-orbit-rank)により単射です。したがって軌道に横断的な部分空間 $V_m$ を選べます。逆写像定理によって、単位元近傍 $U\subset G_\mu$ と、$V_m$ に接する $m$ の局所切片 $S$ を十分小さく選ぶと、作用写像

$$
U\times S\longrightarrow L_\mu,\qquad(h,s)\longmapsto h\cdot s
$$

は $(e,m)$ の近傍で微分同相になります。

**この局所表示だけでは、離れた群元が同じ切片の点を重ねる危険が残ります。** 固有性によって、もし $s_k,t_k\to m$、$h_k\cdot s_k=t_k$ となる群元の列があれば、$(s_k,t_k)$ がコンパクトな近傍へ入るよう選んだ部分列で $h_k$ の収束部分列が取れます。極限 $h$ は $m$ を固定するので、自由性から $h=e$ です。従って $S$ をさらに小さくすると、重ね合わせを起こす群元はすべて上記の局所表示に含まれ、その表示の一意性から $s=t$ が従います。これにより切片を使った商の局所座標ができ、座標間の遷移は滑らかです。商への射影はこれらの局所座標では切片成分を取り出す写像となり、滑らかな全射劣沈写像です。商のHausdorff性は固有性から（軌道同値関係が閉であり、局所切片によって軌道が分離されることから）得られ、可算基は $L_\mu$ の可算基の像を取って得られます。

自由性から各軌道の接空間は $\dim G_\mu$ 次元です。局所表示の横断切片の次元は

$$
\dim V_m=\dim L_\mu-\dim G_\mu
=(2n-r)-\dim G_\mu,
$$

よって主張する次元式が従います。射影が劣沈となる多様体構造の一意性も、局所切片が射影の局所右逆を与え、商上の滑らかな関数・座標を一意に決めることから従います。
<!-- proof-end -->

ここで $\dim M_\mu=2n-2r$ と短絡してはいけません。その式が出るのは $\dim G_\mu=r$、例えば $\mu=0$ や可換群の場合です。一般の非零 $\mu$ では、残っている群の次元を引く必要があります。

## 5. 二つの回転例で条件を検証する

### 5.1 SO(3)：非零運動量では全群で割らない

$M=T^*\mathbb R^3$、$\omega=\sum_{i=1}^3dq^i\wedge dp_i$、$G=SO(3)$ が $(q,p)\mapsto(Rq,Rp)$ と作用するとき、

$$
J(q,p)=q\times p\in\mathbb R^3.
$$

これは[標準運動量写像の同変性](../GMECH2/index.md#thm-gmech2-cotangent-equivariance)を満たします。$\mu=\ell e_3$、$\ell\ne0$ を固定します。$J(q,p)=\mu$ なら $q,p$ は線形独立です。両ベクトルを同時に固定する回転は恒等変換だけなので、作用はレベル集合上で自由です。[運動量写像の微分・軌道方向・正則性](#prop-gmech4-kernel-stabilizer)により $dJ$ は全点で全射、すなわち $\mu$ は正則値です。

数値点として $q=e_1$、$p=\ell e_2$ を選ぶと $J(q,p)=\ell e_3$ です。変位 $\delta q=(a,b,c)$、$\delta p=(d,e,f)$ に対し

$$
\begin{aligned}
dJ_{(q,p)}(\delta q,\delta p)
&=\delta q\times p+q\times\delta p\\
&=(-\ell c,\,-f,\,\ell a+e).
\end{aligned}
$$

$c,f,e$ を変えれば $\mathbb R^3$ の任意の成分が得られるので、この点でも階数 $3$ を直接確認できます。$G_\mu\simeq SO(2)$ は $z$ 軸回りの回転で、その次元は $1$ です。$SO(3)$ はコンパクトなので制限作用は固有です。[正則運動量レベルの滑らかな商](#thm-gmech4-smooth-quotient)を適用すると

$$
\dim L_\mu=6-3=3,\qquad
\dim(L_\mu/G_\mu)=3-1=2.
$$

例えば $x$ 軸回りに $90^\circ$ 回せば $\mu=\ell e_3$ は別方向へ移ります。この回転は元の $G$ には属しても $G_\mu$ には属しません。同じレベル集合の点同士を同一視する操作には使えません。

### 5.2 SO(2)：零レベルでは正則性と自由性が同時に破れる

$M=T^*\mathbb R^2$ に $SO(2)$ が位置と運動量を同時に回転させるとき、角運動量は

$$
J(x,y,p_x,p_y)=xp_y-yp_x.
$$

微分は

$$
dJ=p_y\,dx-p_x\,dy-y\,dp_x+x\,dp_y.
$$

これは $(x,y,p_x,p_y)=(0,0,0,0)$ で零となり、他の点では少なくとも一つの係数が非零です。従って $0$ は臨界値であり、非零の $\mu$ は正則値です。零レベルには全群に固定される原点も、群軌道が一次元となる非零点も含まれます。したがって軌道次元が一定せず、自由作用の仮定も満たしません。

一方 $\mu\ne0$ なら $(q,p)$ は原点ではなく、その点を固定する非自明な平面回転は存在しません。従ってレベル上で作用は自由であり、コンパクト群なので固有です。$SO(2)$ は可換ゆえ $G_\mu=G$ です。ここでは

$$
\dim L_\mu=4-1=3,\qquad
\dim(L_\mu/SO(2))=3-1=2.
$$

零レベルにも何らかの位相的商は作れます。しかし **正則値・自由性が破れたのに、滑らかな商の定理を機械的に適用して次元だけを決めることはできません**。特異な場合の商には別の扱いが必要です。

## 6. 演習：階数、安定化群、商の条件を自分で判定する

### Level A

<a id="ex-gmech4-a01"></a>
**A1. 並進のレベル集合。** $T^*\mathbb R$ の並進作用 $a(q,p)=(q+a,p)$ と $J=p$ を考える。(1) $dJ$ の階数を求めよ。(2) 任意の $\mu$ について $L_\mu$ の接空間と次元を求めよ。(3) $L_\mu/G_\mu$ の次元を求めよ。

- Level: A

<!-- solution-start -->
**詳細解答。** (1) 接方向 $(u,v)$ を取ると $dJ(u,v)=v$ です。任意の $c\in\mathbb R$ に対して $(0,c)$ を入れると値が $c$ になるので階数は $1$ です。(2) $L_\mu=\{(q,\mu):q\in\mathbb R\}$ で、接する条件は $v=0$ だから

$$
T_{(q,\mu)}L_\mu=\{(u,0):u\in\mathbb R\},\quad \dim L_\mu=1.
$$

(3) 可換群なので $G_\mu=G=\mathbb R$ です。群は $q$ を任意に動かせ、各レベル集合は一つの群軌道です。並進は自由・固有だから商は一点で、

$$
\dim(L_\mu/G_\mu)=2-1-1=0.
$$
<!-- solution-end -->

<a id="ex-gmech4-a02"></a>
**A2. 安定化群と正則性の区別。** $SO(2)$ が $T^*\mathbb R^2$ に同時回転で作用する。(1) $(q,p)=(0,0)$ の安定化群を求めよ。(2) $(q,p)=(e_1,0)$ の安定化群を求めよ。(3) それぞれで角運動量写像 $J=xp_y-yp_x$ の微分が全射か判定せよ。

- Level: A

<!-- solution-start -->
**詳細解答。** (1) 原点は任意の回転で不変なので安定化群は $SO(2)$ 全体です。(2) $Re_1=e_1$ を満たす平面の向きを保つ回転は恒等回転だけです。よって安定化群は $\{I\}$ です。(3) 微分を成分表示すると

$$
dJ=p_y\,dx-p_x\,dy-y\,dp_x+x\,dp_y.
$$

原点では全係数が零なので階数 $0$、全射ではありません。$(e_1,0)$ では $x=1,y=p_x=p_y=0$ なので $dJ=dp_y$、階数 $1$ で全射です。同じ $\mu=0$ のレベル上でも階数が一定ではないことに注意します。
<!-- solution-end -->

<a id="ex-gmech4-a03"></a>
**A3. 可換群の余随伴安定化群。** $G=(\mathbb R^2,+)$ とする。任意の $\mu\in\mathfrak g^*$ に対して $G_\mu$ を求めよ。また「$\mu\ne0$ なら $G_\mu$ は必ず真部分群」という主張の正誤を述べよ。

- Level: A

<!-- solution-start -->
**詳細解答。** 可換群では $ghg^{-1}=h$ なので $\operatorname{Ad}_g=\mathrm{id}_{\mathfrak g}$ です。余随伴作用の定義へ代入すると、すべての $\xi$ に対し

$$
\langle\operatorname{Ad}_g^*\mu,\xi\rangle
=\langle\mu,\operatorname{Ad}_{g^{-1}}\xi\rangle
=\langle\mu,\xi\rangle.
$$

従って $\operatorname{Ad}_g^*\mu=\mu$ がすべての $g,\mu$ で成り立ち、$G_\mu=G$ です。非零でも真部分群にはならないため、主張は偽です。
<!-- solution-end -->

<a id="ex-gmech4-a04"></a>
**A4. 零レベルの臨界点。** $SO(2)$ の標準回転運動量 $J=xp_y-yp_x$ について、$dJ=0$ となる点をすべて列挙し、臨界値を求めよ。

- Level: A

<!-- solution-start -->
**詳細解答。** 偏微分の係数は

$$
(J_x,J_y,J_{p_x},J_{p_y})=(p_y,-p_x,-y,x).
$$

四つが同時に零となる必要十分条件は $x=y=p_x=p_y=0$ です。原点の運動量値は $J(0,0,0,0)=0$ です。従って唯一の臨界点は原点、唯一の臨界値は $0$ です。原点以外の零レベルの点はそれぞれ正則点ですが、値 $0$ 全体は正則値ではありません。
<!-- solution-end -->

### Level B

<a id="ex-gmech4-b01"></a>
**B1. 微分の転置から正則性を証明する。** Hamilton作用と運動量写像 $J$ を考える。(1) $\langle dJ_m(v),\xi\rangle$ を $\omega$ で表せ。(2) $(dJ_m)^*$ の核を求めよ。(3) 等方群が有限なら $dJ_m$ は全射であることを示せ。

- Level: B

<!-- solution-start -->
**詳細解答。** (1) [運動量写像の定義](../GMECH2/index.md#def-gmech2-hamiltonian-action)で $J_\xi=\langle J,\xi\rangle$ として

$$
\langle dJ_m(v),\xi\rangle=d(J_\xi)_m(v)=\omega_m(\xi_M(m),v).
$$

(2) 転置の値は $(dJ_m)^*\xi=\omega_m(\xi_M(m),\cdot)$ です。$\omega_m$ が非退化なので、この共変ベクトルが零であることは $\xi_M(m)=0$ と同値です。従って

$$
\ker(dJ_m)^*=\mathfrak g_m.
$$

(3) [LIE4の安定化 Lie 環と軌道方向](../../../代数系/LIE/LIE4/index.md#thm-lie4-stabilizer-kernel-orbit-rank)から $\mathfrak g_m=T_eG_m$ です。有限群の単位元の接空間は零次元なので $\mathfrak g_m=0$ です。有限次元線形写像は転置が単射なら元が全射ですから $dJ_m$ は全射です。有限安定化群が自明とは限らず、作用が自由であることまでは結論しません。
<!-- solution-end -->

<a id="ex-gmech4-b02"></a>
**B2. SO(3) の非零値と次元。** $SO(3)$ が $T^*\mathbb R^3$ に同時回転で作用し、$J=q\times p$ とする。$\mu=\ell e_3$、$\ell>0$ について、(1) $\mu$ が正則値であること、(2) $G_\mu$、(3) 商の次元を確認せよ。

- Level: B

<!-- solution-start -->
**詳細解答。** (1) $q\times p=\ell e_3\ne0$ より $q,p$ は線形独立です。両方を固定する回転は恒等元だけなので各点で安定化Lie代数は零です。[運動量写像の微分・軌道方向・正則性](#prop-gmech4-kernel-stabilizer)より $dJ_m$ は全射です。$m$ は任意なので $\mu$ は正則値です。(2) 余随伴作用が $R\mu$ であるため、$\mu$ を固定する回転は $e_3$ 軸周りの $SO(2)$、次元 $1$ です。(3) レベル上の作用は自由で、$G_\mu$ はコンパクトなので固有です。[商の次元定理](#thm-gmech4-smooth-quotient)に $2n=6$、$r=3$、$\dim G_\mu=1$ を代入すると

$$
\dim(L_\mu/G_\mu)=(6-3)-1=2.
$$

ここで $6-2\cdot3=0$ としてはいけません。引くべき群の次元は $G_\mu$ の次元です。
<!-- solution-end -->

<a id="ex-gmech4-b03"></a>
**B3. 同変性が与えるレベル集合の移り方。** 同変運動量写像について、(1) $gL_\mu=L_{\operatorname{Ad}_g^*\mu}$ を両包含で示せ。(2) $G$ が可換なら各レベルに $G$ 全体が作用することを示せ。(3) $G$ が非可換でも $\mu=0$ では同じことが成り立つか答えよ。

- Level: B

<!-- solution-start -->
**詳細解答。** (1) $m\in L_\mu$ なら

$$
J(gm)=\operatorname{Ad}_g^*J(m)=\operatorname{Ad}_g^*\mu,
$$

なので $gL_\mu\subseteq L_{\operatorname{Ad}_g^*\mu}$ です。逆に $m'\in L_{\operatorname{Ad}_g^*\mu}$ なら

$$
J(g^{-1}m')=\operatorname{Ad}_{g^{-1}}^*
\operatorname{Ad}_g^*\mu=\mu
$$

ですから $m'\in gL_\mu$ です。(2) 可換群の $\operatorname{Ad}_g$ は恒等写像なので $G_\mu=G$、従って各レベルは $G$ 不変です。(3) 線形写像は零を零へ送るので、非可換でも $\operatorname{Ad}_g^*0=0$ です。従って $G_0=G$ で、零レベルに全群が作用します。ただし正則性や自由性は別条件です。
<!-- solution-end -->

<a id="ex-gmech4-b04"></a>
**B4. 固有性は自由性を保証しない。** コンパクト群 $SO(2)$ の $T^*\mathbb R^2$ への回転作用で、(1) 作用の固有性、(2) 零運動量レベル上で自由でないこと、(3) 非零運動量レベル上で自由であることを示せ。

- Level: B

<!-- solution-start -->
**詳細解答。** (1) $SO(2)$ はコンパクトです。コンパクトな $K\subset M\times M$ に対し、作用写像の $K$ の逆像は $SO(2)\times\operatorname{pr}_1(K)$ の閉部分集合であり、後者はコンパクトです。従って固有です。(2) 原点は $J=0$ で、すべての回転が原点を固定します。安定化群が $SO(2)$ 全体なので自由ではありません。(3) $J(q,p)\ne0$ なら $(q,p)$ の少なくとも一方は非零です。非零の平面ベクトルを固定する $SO(2)$ の回転は恒等元のみです。従って非零レベルでは自由です。固有性と自由性を混同しないことが結論です。
<!-- solution-end -->

### Level C

<a id="ex-gmech4-c01"></a>
**C1. 正則値・非零安定化群・特異値をまとめて判定する。** $M=T^*\mathbb R^3$、$G=SO(3)$ の同時回転作用と $J(q,p)=q\times p$ を考える。(1) $\mu=\ell e_3$、$\ell\ne0$ で $L_\mu$ が空でないことと正則性を示せ。(2) $G_\mu$ とレベル上の自由性・固有性を示し商の次元を求めよ。(3) $\mu=0$ の臨界点を記述し、零レベルに商の定理を使えない理由を説明せよ。(4) 同変性の式から非零レベルを $SO(3)$ 全体で割ることができない理由を示せ。

- Level: C

<!-- solution-start -->
**詳細解答。** (1) $\ell\ne0$ に対し $q=e_1,p=\ell e_2$ を取ると $q\times p=\ell e_3$ ですから空ではありません。$J(q,p)=\mu\ne0$ なら $q,p$ が独立なので、両方を固定する回転は恒等元です。[正則性の判定命題](#prop-gmech4-kernel-stabilizer)を各点に適用すると $\operatorname{rank}dJ_m=3$ となり正則値です。

(2) $R\mu=\mu$ となる回転は $e_3$ を保つので $G_\mu\simeq SO(2)$ です。レベル上では元の $SO(3)$ 作用の安定化群も自明で、特に $G_\mu$ 作用は自由です。$SO(2)$ がコンパクトなので固有です。従って

$$
\dim L_\mu=6-3=3,\qquad
\dim(L_\mu/G_\mu)=3-1=2.
$$

(3) [運動量写像の微分・軌道方向・正則性](#prop-gmech4-kernel-stabilizer)によれば、$dJ_m$ が全射でないことは、$q,p$ を同時に固定する非零の無限小回転が存在することと同値です。$q,p$ が線形従属なら、両者が沿う一本の軸（両方零なら任意の軸）の周りの回転が両方を固定します。逆に独立ならそのような回転は恒等元しかありません。従って臨界点は $q\times p=0$ を満たす点すべてで、その像は $\mu=0$ です。零レベル全体で正則値条件が破れ、さらに各点には非自明な安定化群があるので自由性も破れます。よって[正則運動量レベルの滑らかな商](#thm-gmech4-smooth-quotient)を適用できません。

(4) [同変性](../GMECH2/index.md#def-gmech2-coadjoint-equivariance)から

$$
J(Rq,Rp)=R(q\times p)=R\mu.
$$

例えば $R$ を $x$ 軸周りの半回転に取ると $Re_3=-e_3$ なので $R\mu=-\mu\ne\mu$ です。この $R$ は $L_\mu$ を $L_{-\mu}$ に移すため、同じ $L_\mu$ の上の作用としては使えません。商に使うのは $G_\mu$ です。
<!-- solution-end -->

本章では「保存値を固定する」「滑らかなレベル集合になる」「残る対称群で滑らかに割る」を別々の段階として確かめました。次のGMECH5では、ここで得られた $\pi_\mu:L_\mu\to L_\mu/G_\mu$ に沿って $\omega$ が降りる条件を確認し、降りた2形式の非退化性まで証明します。
