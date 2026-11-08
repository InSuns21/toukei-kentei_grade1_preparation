# IG10 一般化 Pythagoras と情報射影

<!-- definition-example-audit: strict -->

[IG9 の Bregman 三点恒等式](../IG9/index.md#thm-ig9-three-point)は、三点の divergence を二つの divergence と座標差の内積へ分けました。この内積が零なら、Euclid 幾何の直角三角形と同じように二つの隔たりの和になります。ただし divergence は普通、対称でも距離でもありません。また「曲線に垂直に交わった」という局所情報だけで「その点が最短」とは限りません。

本講では、**何が直角なのか、射影はどちらの KL を最小化するのか、最小点は存在するのか**を順に解きます。最初に双対測地線の接ベクトルを同じ点で比較し、次に凸性を用いて大域的な最小性を証明します。最後に3点の正確率分布で、二つの向きを成分計算します。

## 0. 仮定・記号と前提講座（直接）

- [IG8 の双対平坦性](../IG8/index.md#def-ig8-dually-flat)、[Hessian 構成](../IG8/index.md#thm-ig8-hessian-dual-flat)、[e/m 測地線](../IG8/index.md#def-ig8-em-geodesic)
- [IG9 の Bregman divergence](../IG9/index.md#def-ig9-bregman)、[正準 divergence の双対表示](../IG9/index.md#thm-ig9-canonical-dual)、[三点恒等式](../IG9/index.md#thm-ig9-three-point)、[指数型族における KL との対応](../IG9/index.md#thm-ig9-exponential-kl)
- [IG5 の Legendre 双対](../IG5/index.md#thm-ig5-legendre-hessian)

基本設定は空でない開凸集合 $U\subset\mathbb R^d$ と、各点で正定値 Hessian を持つ $\psi\in C^4(U)$ です。自然側の座標を $\theta\in U$ とし、

$$
\eta=\nabla\psi(\theta),\quad
g(\theta)=\nabla^2\psi(\theta),\quad
V=\nabla\psi(U),\quad
\varphi(\eta)=\theta(\eta)\cdot\eta-\psi(\theta(\eta))
$$

と置きます。[Hessian ポテンシャルからの双対平坦性](../IG8/index.md#thm-ig8-hessian-dual-flat)から $\eta:U\to V$ は滑らかな一対一対応で、$g$ は正定値、$\nabla^2\varphi=g^{-1}$ です。$\theta$ を e-アファイン、$\eta$ を m-アファイン座標と呼びます。$V$ は開集合ですが、**一般には凸とは限らない**ため、m-線分を使うときはその線分が $V$ に入ることも確認します。

点 $P,Q,R$ の座標を $\theta_P,\eta_P$ などと表し、divergence の向きは

$$
\mathcal D(P:Q)=D_\psi(\theta_P:\theta_Q)
=D_\varphi(\eta_Q:\eta_P)
$$

に固定します。**第1引数を動かす Bregman 最小化**が基本形です。正則な全指数型分布族に限れば、[全指数型分布族の正準 divergence と KL](../IG9/index.md#thm-ig9-exponential-kl)より

$$
\mathcal D(P:Q)=D_{\mathrm{KL}}(p_Q\Vert p_P).
$$

## 1. 二種類の接ベクトルがなす直角

Euclid の内積は二つの座標差から直ちに計算できます。しかしここでは e-直線と m-直線の座標が違います。直角を測るには、**両者の速度を同じ点 $Q$ の接空間で表す**必要があります。

接ベクトルを $\theta$ 座標の成分列 $u,v$ で表すと、[IG8 の Hessian 計量](../IG8/index.md#thm-ig8-hessian-dual-flat)による内積は $g_Q(u,v)=u^{\mathsf T}g_Qv$ です。ここで右辺の $g_Q=\nabla^2\psi(\theta_Q)$ は行列、左辺はその行列で定まる双線形形式です。

$Q$ から $P$ へ向かう e-線分の $\theta$ 座標は $\theta_e(t)=\theta_Q+t(\theta_P-\theta_Q)$ です。一方 $Q$ から $R$ へ向かう m-線分は $\eta_m(t)=\eta_Q+t(\eta_R-\eta_Q)$ です（$0\le t\le1$）。以下、座標関数 $x(t)$ の上の点 $\dot x=dx/dt$ は $t$ による通常微分を、$\partial\eta_i/\partial\theta^j$ は他の $\theta$ 成分を固定する偏微分を表します。

m-線分を $\theta$ 座標で測った速度を $\dot\theta_m$ とすると、[IG5 の座標微分公式](../IG5/index.md#thm-ig5-legendre-hessian)と連鎖律から $t=0$ において

$$
\dot\eta_{m,i}(0)
=\sum_{j=1}^d\frac{\partial\eta_i}{\partial\theta^j}(\theta_Q)
 \dot\theta_m^j(0)
=\sum_{j=1}^d(g_Q)_{ij}\dot\theta_m^j(0).
$$

左辺は $\eta_{R,i}-\eta_{Q,i}$ です。正定値な $g_Q$ は可逆なので、二つの測地線の $Q$ での速度は

$$
v_e=\dot\theta_e(0)=\theta_P-\theta_Q,\qquad
v_m=\dot\theta_m(0)=g_Q^{-1}(\eta_R-\eta_Q)
$$

です。こうして初めて、異なる座標で指定した速度を同じ接空間の計量で比較できます。

<a id="def-ig10-dual-orthogonality"></a>

<!-- formal-statement-start -->
> **定義（双対測地線の直交）**  
> 空でない開凸集合 $U\subset\mathbb R^d$ 上の $\psi\in C^4(U)$ が正定値 Hessian を持つとする。双対座標と計量を次のように置く。

$$
\eta=\nabla\psi(\theta),\qquad
V=\eta(U),\qquad
g_Q=\nabla^2\psi(\theta_Q).
$$

> 点 $P,Q,R$ の $\theta$ 座標をそれぞれ $\theta_P,\theta_Q,\theta_R\in U$ とし、$\eta_Q$ から $\eta_R$ への線分は $V$ に含まれるとする。
>
> [IG8 の e/m 測地線](../IG8/index.md#def-ig8-em-geodesic)として、$Q\to P$ の e-測地線と $Q\to R$ の m-測地線が **$Q$ で直交**するとは、二つの接ベクトルの Hessian 計量による内積が零となること、すなわち次の等式を満たすことをいう。

$$
g_Q\bigl(\theta_P-\theta_Q,\ g_Q^{-1}(\eta_R-\eta_Q)\bigr)
=(\theta_P-\theta_Q)\cdot(\eta_R-\eta_Q)=0.
$$
<!-- formal-statement-end -->

<!-- definition-example-start: def-ig10-dual-orthogonality -->
**定義の確認**。$\psi(\theta)=((\theta^1)^2+2(\theta^2)^2)/2$、$U=\mathbb R^2$ とし、$Q=(0,0)$、$P=(2,0)$、$R=(0,3)$ を $\theta$ 座標で指定します。

座標 $\theta^1,\theta^2$ で二階偏微分すると $g_{ij}=\partial_i\partial_j\psi$ の行列は $g=\operatorname{diag}(1,2)$ です。任意の非零 $u=(u_1,u_2)$ に対して $g(u,u)=u_1^2+2u_2^2>0$ なので正定値です。

また $\eta=\nabla\psi=(\theta^1,2\theta^2)$ は逆写像 $\theta=(\eta_1,\eta_2/2)$ を持ち、全域は $V=\mathbb R^2$ です。

よって二種類の線分はいずれも定義域に入り、$Q$ での e-速度は $(2,0)$、m-速度は $g^{-1}(\eta_R-\eta_Q)=\operatorname{diag}(1,1/2)(0,6)=(0,3)$ です。計量による内積は

$$
g_Q(v_e,v_m)
=(2,0)\operatorname{diag}(1,2)(0,3)^{\mathsf T}=0
$$

です。直線を眺めて直角と呼ぶだけでなく、**座標表示の根拠・線分の存在・二つの速度・計量の直交**をすべて確認しました。
<!-- definition-example-end -->

## 2. 一般化 Pythagoras：等式が成立する条件

[IG9 の三点恒等式](../IG9/index.md#thm-ig9-three-point)の補正項を、直前の計量内積へ置き換えます。三角形の辺の向きを取り替えると、一般の非対称 divergence では別の式になるので注意します。

<a id="thm-ig10-pythagoras"></a>

<!-- formal-statement-start -->
> **定理（一般化 Pythagoras の等式）**  
> 開凸集合 $U\subset\mathbb R^d$ 上の $\psi\in C^4(U)$ の Hessian が正定値であるとする。$\eta=\nabla\psi$、$V=\eta(U)$、$g_Q=\nabla^2\psi(\theta_Q)$、$\mathcal D(P:Q)=D_\psi(\theta_P:\theta_Q)$ と定める。点 $P,Q,R$ の $\theta$ 座標は $\theta_P,\theta_Q,\theta_R\in U$ とする。$Q\to P$ の e-線分と $Q\to R$ の m-線分が定義され、[直交の定義](#def-ig10-dual-orthogonality)の意味で直交するとき、

$$
\mathcal D(P:R)=\mathcal D(P:Q)+\mathcal D(Q:R).
$$

> また、任意の三点には直交の有無によらず、次の符号付き補正を含む恒等式が成り立つ。

$$
\mathcal D(P:R)
=\mathcal D(P:Q)+\mathcal D(Q:R)
-g_Q\bigl(v_e(Q\to P),v_m(Q\to R)\bigr).
$$

> ここで $v_e=\theta_P-\theta_Q$、$v_m=g_Q^{-1}(\eta_R-\eta_Q)$ は $Q$ における $\theta$ 成分として代数的に定める。$\eta_Q$ から $\eta_R$ への線分が $V$ に含まれない場合、$v_m$ を両端点を結ぶ大域的な m-測地線の速度と解釈してはならない。
<!-- formal-statement-end -->

### 証明の見取り図

[三点恒等式](../IG9/index.md#thm-ig9-three-point)に $x=\theta_P,y=\theta_Q,z=\theta_R$ を代入します。補正は $(\theta_P-\theta_Q)\cdot(\eta_Q-\eta_R)$ なので、[直交の定義](#def-ig10-dual-orthogonality)の内積の**負号**です。

<!-- proof-start -->
### 証明

$U$ が凸なので三点の Bregman divergence はすべて定義されます。[IG9 の三点恒等式](../IG9/index.md#thm-ig9-three-point)へ指定した三点を代入すると

$$
\begin{aligned}
D_\psi(\theta_P:\theta_R)
&=D_\psi(\theta_P:\theta_Q)+D_\psi(\theta_Q:\theta_R)\\
&\quad+(\theta_P-\theta_Q)\cdot
(\nabla\psi(\theta_Q)-\nabla\psi(\theta_R))\\
&=\mathcal D(P:Q)+\mathcal D(Q:R)
-(\theta_P-\theta_Q)\cdot(\eta_R-\eta_Q).
\end{aligned}
$$

一方、$\eta$ の微分は $d\eta=g_Q\,d\theta$ だから、$Q$ の m-速度 $v_m$ は $g_Q^{-1}(\eta_R-\eta_Q)$ です。従って

$$
g_Q(v_e,v_m)
=v_e^\mathsf Tg_Qg_Q^{-1}(\eta_R-\eta_Q)
=(\theta_P-\theta_Q)\cdot(\eta_R-\eta_Q).
$$

補正が内積の負号であることが示せました。これが零なら主張の和の等式となります。
<!-- proof-end -->

**二次関数での検算**。直前の $P=(2,0),Q=(0,0),R=(0,3)$ では

$$
\mathcal D(P:R)=\frac{2^2+2(-3)^2}{2}=11,\quad
\mathcal D(P:Q)=2,\quad \mathcal D(Q:R)=9,
$$

なので $11=2+9$ です。逆向きでも常に同じだとは主張していません。この例で逆向きも等しいのは、二次ポテンシャルの divergence が対称だからです。

## 3. 情報射影とは、どちらの向きの最小化か

射影先の集合を一つ固定しても、$\mathcal D(Q:Z)$ と $\mathcal D(Z:Q)$ は別の最適化です。アファイン制約への射影が相対内点にあり、対応する測地線が定義できるとき、**射影点と元の点を結ぶ直交測地線の種類**によって、m-アファイン集合への e-射影と e-アファイン集合への m-射影を区別します。一般の凸集合へもこの名称を拡張しますが、境界では直交等式ではなく第4節の一階不等式になるので、「射影なら必ず直交」とは言えません。

ここで **e-アファイン集合**とは $\theta$ 座標でアファイン部分空間と $U$ の共通部分、**m-アファイン集合**とは $\eta$ 座標でアファイン部分空間と $V$ の共通部分を指します。[IG8 のアファイン座標](../IG8/index.md#def-ig8-affine-coordinate)を集合に用いた言い方です。

また **$\theta$-凸**（**$\eta$-凸**）とは、二点の $\theta$ 座標（$\eta$ 座標）を結ぶ全線分がその集合内にあることをいいます。$U$ は凸なので $\theta$-線分は少なくとも座標領域内にありますが、任意の部分集合が $\theta$-凸とは限りません。$\eta$ 側では $V$ 自身も一般には非凸であり、線分が $V$ と候補集合の両方に入るかを確認します。

**相対内点**とは、その集合のアファイン包に沿う方向で小さく正負両側へ動いても集合に残る点です。アファイン集合の開部分で「アファイン」と言うとき、座標領域外の線分まで含むとは限らないことにも注意します。

<a id="def-ig10-information-projections"></a>

<!-- formal-statement-start -->
> **定義（e/m 情報射影）**  
> 空でない開凸集合 $U\subset\mathbb R^d$ 上の $\psi\in C^4(U)$ の Hessian が正定値であるとする。双対座標・ポテンシャルと divergence を

$$
\begin{aligned}
\eta&=\nabla\psi(\theta),& V&=\eta(U),\\
\varphi(\eta)&=\theta(\eta)\cdot\eta-\psi(\theta(\eta)),
&\mathcal D(P:Z)&=D_\psi(\theta_P:\theta_Z)
\end{aligned}
$$

> と置き、点 $P,Q,Z$ をそれぞれの $\theta$ 座標で $U$ の元と同一視する。$Z\in U$ を固定し、$\theta$-凸集合 $C_e\subset U$ に対して $Q\in C_e$ が

$$
Q=\operatorname*{arg\,min}_{P\in C_e}\mathcal D(P:Z)
$$

> を満たすとき、$Q$ を $Z$ の **m-射影** と呼ぶ。$\eta$-凸集合 $C_m\subset V$ に対して、$Q$ の $\eta$ 座標が

$$
\eta_Q=\operatorname*{arg\,min}_{\eta_P\in C_m}
D_\varphi(\eta_P:\eta_Z)
$$

> を満たすとき、$Q$ を $Z$ の **e-射影** と呼ぶ。いずれも最小点が存在するときだけ定義する。e/m は射影先の名前ではなく、**アファイン制約の相対内点で、対応する線分が座標領域内にある場合**に直交する測地線の種類に由来する名称である。一般の凸制約では直交を定義の条件とはしない。
<!-- formal-statement-end -->

<!-- definition-example-start: def-ig10-information-projections -->
**定義の確認**（Euclid の直線）。$\psi(\theta)=\|\theta\|^2/2$、$Z=(2,3)$、$C_e=\{(t,1-t):t\in\mathbb R\}$ とします。$U=V=\mathbb R^2$、$\eta=\theta$ なので $C_e$ は非空・凸・閉な e-アファイン集合です。目的関数は

$$
\mathcal D((t,1-t):Z)
=\tfrac12\{(t-2)^2+(1-t-3)^2\}
=t^2+4
$$

で、$t=0$ に唯一の最小点 $Q=(0,1)$ を持ちます。$Z-Q=(2,2)$ は直線の接ベクトル $(1,-1)$ に直交します。さらに $\eta=\theta$、$\varphi(\eta)=\|\eta\|^2/2$ なので同じ直線を $C_m$ と見たときも

$$
D_\varphi((t,1-t):Z)=t^2+4
$$

となり、e-射影も $Q=(0,1)$ です。両方の定義で目的関数・許容集合・達成点を確認しました。二次関数なので逆向きでも同じ射影になりますが、一般の KL ではこの結論を移してはいけません。
<!-- definition-example-end -->

指数型分布族で [IG9 の KL 対応](../IG9/index.md#thm-ig9-exponential-kl)を使うと、命名と向きは次の通りです。

| 射影 | 射影先 | 最小化する量（$q$ が変数、$z$ が固定） | KL の慣用的呼称 |
|---|---|---|---|
| e-射影 | m-凸集合（特に m-平坦） | $D_\varphi(\eta_q:\eta_z)=D_{\mathrm{KL}}(q\Vert z)$ | forward KL（前向き） |
| m-射影 | e-凸集合（特に e-平坦） | $D_\psi(\theta_q:\theta_z)=D_{\mathrm{KL}}(z\Vert q)$ | reverse KL（逆向き） |

forward/reverse という呼称は文献により固定する基準が異なり得ます。本講では**常に上の引数式を定義**として使い、名称だけで最小化方向を判断しません。

## 4. 最小化の一階条件から不等式を証明する

微分が零というだけでは、非凸集合上の大域最小性は分かりません。これに対して **変数となる第1引数の凸性**があれば、一階条件は集合全体で最小であるための必要十分条件になります。

<a id="thm-ig10-convex-projection"></a>

<!-- formal-statement-start -->
> **定理（Bregman 凸射影の一階条件と Pythagoras 不等式）**  
> $W\subset\mathbb R^d$ を開凸、$F\in C^2(W)$ を正定値 Hessian を持つ関数、$z\in W$、$C\subset W$ を非空凸集合とする。$q\in C$ が $D_F(\,\cdot\, :z)$ の $C$ 上の最小点であるための必要十分条件は、すべての $p\in C$ に対する次の一階不等式である。

$$
(p-q)\cdot(\nabla F(q)-\nabla F(z))\ge0.
$$

> このとき、任意の $p\in C$ について

$$
D_F(p:z)\ge D_F(p:q)+D_F(q:z).
$$

> $C=W\cap(q+L)$ がアファイン部分空間 $q+L$ の開部分で $q$ が相対内点なら、一階不等式は各 $v\in L$ に対する等式となり、Pythagoras **等式**が全 $p\in C$ に成り立つ。
<!-- formal-statement-end -->

### 証明の見取り図

$q+t(p-q)$ は $C$ に入ります。$t=0$ から右微分した最小性が一階不等式です。逆向きは [IG9 の Bregman 非負性](../IG9/index.md#thm-ig9-bregman-positive)と[三点恒等式](../IG9/index.md#thm-ig9-three-point)で確認できます。アファイン集合の相対内点では両側の微小変化が許され、一階の差が零になります。

<!-- proof-start -->
### 証明

$q$ が最小なら、任意の $p\in C$ と $0\le t\le1$ について $f(t)=D_F(q+t(p-q):z)$ は $f(t)\ge f(0)$ です。よって

$$
0\le f'_+(0)
=(p-q)\cdot(\nabla F(q)-\nabla F(z)).
$$

逆にこの不等式を仮定します。[三点恒等式](../IG9/index.md#thm-ig9-three-point)で $x=p,y=q,z=z$ とすると

$$
D_F(p:z)-D_F(q:z)
=D_F(p:q)+(p-q)\cdot(\nabla F(q)-\nabla F(z)).
$$

[Bregman 非負性](../IG9/index.md#thm-ig9-bregman-positive)で第1項は非負、第2項も仮定で非負なので $q$ は大域最小です。右辺の $D_F(p:q)$ を残せば Pythagoras 不等式になります。

最後に $C=W\cap(q+L)$ とし、$q$ が相対内点とします。任意の $v\in L$ に対して十分小さい正負の $t$ で $q+tv\in C$ です。一階条件を $p=q+tv$ に用い、正負の $t$ で割れば $v\cdot(\nabla F(q)-\nabla F(z))=0$ です。$p-q\in L$ なので補正項は零となり、等式が成立します。
<!-- proof-end -->

**適用方向**。m-射影では $(W,F,C)=(U,\psi,C_e)$、e-射影では $(W,F,C)=(V,\varphi,C_m)$ と置きます。後者で**この定理をそのまま使うには**、$V$ が凸であるか、$z$ と射影先を含む凸な開部分領域に問題を制限できることが必要です。これは e-射影の定義自体に追加する条件ではありません。単に $\eta$ が座標であるだけでは $V$ の大域凸性を結論できません。アファイン射影先の相対内点では一階条件が等式になります。さらに射影点から元の点への対応する双対線分が座標領域内にあれば、[直交の定義](#def-ig10-dual-orthogonality)が適用でき、[一般化 Pythagoras の等式](#thm-ig10-pythagoras)も得られます。境界を含む一般凸集合では不等式のままです。

### 解の存在と一意性は別の問題

正定値 Hessian から得られるのは、**最小点があれば一意**という主張です。存在には、最小化列が領域の境界へ逃げないことが必要です。

<a id="thm-ig10-existence"></a>

<!-- formal-statement-start -->
> **定理（情報射影の存在と一意性の十分条件）**  
> $W\subset\mathbb R^d$ を開凸、$F\in C^2(W)$ を正定値 Hessian を持つ関数、$z\in W$、$C\subset W$ を非空凸集合とする。次のいずれかを仮定する。
>
> 1. $C$ は $\mathbb R^d$ 内でコンパクトである。
> 2. $W=\mathbb R^d$、$C$ は $\mathbb R^d$ 内で閉じた集合であり、$p\in C$、$\|p\|\to\infty$ なら $D_F(p:z)\to\infty$ となる。
>
> このとき $D_F(p:z)$ は $C$ 上で一意の最小点を持つ。m-射影には $F=\psi$、e-射影には $F=\varphi$ の対応する座標領域でこの条件を適用できる。
<!-- formal-statement-end -->

### 証明の見取り図

存在には連続関数の最小値と、非有界な集合では「関数値がある値以下となる点の集合」が有界になる条件を使います。一意性には二点間の線分上で Hessian が正定値であることを使います。

<!-- proof-start -->
### 証明

$F\in C^2(W)$ だから $D_F(\,\cdot\, :z)$ は連続です。1ではコンパクト集合上の連続関数の最小値定理により解が存在します。2では任意の $p_0\in C$ を一つ取り、$D_F(p:z)\le D_F(p_0:z)$ を満たす点全体の集合を考えます。仮定の無限遠での発散から、この集合は有界です。$C$ が閉じ、目的関数が連続なので集合も閉じており、非空コンパクトです。従ってその上に最小点があります。集合の外は $p_0$ より値が大きいため、これは $C$ 全体の最小点です。

一意性について、異なる $p,q\in C$ と $0<t<1$ に対し $r(t)=(1-t)p+tq$ は $C$ に入ります。$h(t)=D_F(r(t):z)$ とすると

$$
h''(t)=(q-p)^\mathsf T\nabla^2F(r(t))(q-p)>0.
$$

従って $D_F(\,\cdot\, :z)$ は $C$ 上で厳密凸です。もし異なる二つの最小点があれば、その中点で最小値より小さくなって矛盾します。
<!-- proof-end -->

**非存在の例**。$\psi(t)=t^2/2$、$W=\mathbb R$、$z=1$、$C=(-\infty,0)$ なら $\inf_{q\in C}D_\psi(q:1)=1/2$ ですが $q=0$ は $C$ に含まれないので最小点はありません。「凸」であるだけでは不十分です。

**局所直交の落とし穴**。同じ二次ポテンシャルを $\mathbb R^2$ で用い、$C=\{q:\|q\|=1\}$、$z=(2,0)$ とします。$q=(1,0)$ と $q=(-1,0)$ の両方で、$z-q$ は円の接線に直交します。しかし目的関数はそれぞれ $1/2$ と $9/2$ で、後者は最小ではありません。円周は凸でなく、[凸射影の定理](#thm-ig10-convex-projection)の大域結論は使えません。

## 5. 正確率単体：線形制約へ e-射影する

$r=(r_1,r_2,r_3)$ をすべて正で総和1の分布とします。制約 $q_1+q_2=a$（$0<a<1$）は確率を足す m-座標で線形です。[IG8 の正確率単体の e/m 座標](../IG8/index.md#thm-ig8-simplex-geodesics)では $\eta=(q_1,q_2)$ が m-アファイン座標、$q_3=1-q_1-q_2$ は従属成分です。負エントロピー $H(q)=\sum_{i=1}^3q_i\log q_i$ をこの二つの独立座標の関数と見ると

$$
\frac{\partial H}{\partial q_i}=\log\frac{q_i}{q_3}=\theta^i
\quad(i=1,2),\qquad
\nabla^2_{\eta}H
=\begin{pmatrix}
1/q_1+1/q_3 & 1/q_3\\
1/q_3 & 1/q_2+1/q_3
\end{pmatrix}.
$$

任意の非零 $v=(v_1,v_2)$ に対し Hessian の二次形式は $v_1^2/q_1+v_2^2/q_2+(v_1+v_2)^2/q_3>0$ なので、これが正定値な双対ポテンシャルであることも分かります。[IG9 の正準 divergence の双対表示](../IG9/index.md#thm-ig9-canonical-dual)と[指数型族での KL 対応](../IG9/index.md#thm-ig9-exponential-kl)をこの座標系へ適用すると $D_H(q:r)=D_{\mathrm{KL}}(q\Vert r)$ です。

この最小化は $q_3=1-a$ を固定し、最初の二成分の相対比を保存する操作です。

<a id="thm-ig10-categorical-e-projection"></a>

<!-- formal-statement-start -->
> **定理（有限カテゴリカル分布の m-平坦制約への e-射影）**  
> $r_i>0$、$\sum_{i=1}^3r_i=1$、$0<a<1$ とする。正の確率分布の集合

$$
C_a=\{q_i>0:\ q_1+q_2=a,\ q_3=1-a\}
$$

> 上で $D_{\mathrm{KL}}(q\Vert r)$ を最小化する唯一の分布 $q^*$ は

$$
q^*=\left(\frac{ar_1}{r_1+r_2},\,
\frac{ar_2}{r_1+r_2},\,1-a\right).
$$

> さらに任意の $p\in C_a$ について

$$
D_{\mathrm{KL}}(p\Vert r)
=D_{\mathrm{KL}}(p\Vert q^*)+D_{\mathrm{KL}}(q^*\Vert r).
$$
<!-- formal-statement-end -->

### 証明の見取り図

群 $\{1,2\}$ の中での確率比だけを最適化します。最小点が正の内部にあることを明示的な解で確かめ、その後[凸射影の変分条件](#thm-ig10-convex-projection)を直接確認します。恒等式は対数比が各群内で一定になることから証明できます。

<!-- proof-start -->
### 証明

$s=r_1+r_2>0$、$b_i=r_i/s$（$i=1,2$）と置くと $b_1+b_2=1$ です。$q_1=at,q_2=a(1-t)$（$0<t<1$）と書けるので

$$
\begin{aligned}
D_{\mathrm{KL}}(q\Vert r)
&=at\log\frac{at}{r_1}
+a(1-t)\log\frac{a(1-t)}{r_2}
+(1-a)\log\frac{1-a}{r_3}\\
&=a\left[t\log\frac{t}{b_1}
+(1-t)\log\frac{1-t}{b_2}\right]
+a\log\frac{a}{s}+(1-a)\log\frac{1-a}{r_3}.
\end{aligned}
$$

角括弧内は [IG9 の Bregman 非負性](../IG9/index.md#thm-ig9-bregman-positive)を正単体の負エントロピーに適用した $D_{\mathrm{KL}}((t,1-t)\Vert(b_1,b_2))$ で、唯一の零点は $t=b_1$ です。従って $q^*_1=ar_1/s,q^*_2=ar_2/s$、$q^*_3=1-a$ が唯一の最小点です。$r_i>0$ と $0<a<1$ から全成分は正なので、最適点は許容集合の内部にあります。

最後に $p\in C_a$ に対し三つの KL を展開すると

$$
\begin{aligned}
&D_{\mathrm{KL}}(p\Vert r)
-D_{\mathrm{KL}}(p\Vert q^*)
-D_{\mathrm{KL}}(q^*\Vert r)\\
&\qquad=\sum_{i=1}^3(p_i-q_i^*)\log\frac{q_i^*}{r_i}.
\end{aligned}
$$

$i=1,2$ では $q_i^*/r_i=a/s$、$i=3$ では $q_3^*/r_3=(1-a)/r_3$ です。$p_1+p_2=q_1^*+q_2^*=a$ および $p_3=q_3^*=1-a$ なので、右辺は

$$
\log(a/s)\sum_{i=1}^2(p_i-q_i^*)
+\log((1-a)/r_3)(p_3-q_3^*)=0.
$$

この相殺は $H$ を $\eta$ 座標で微分したときの一階条件 $(p-q^*)\cdot(\nabla H(q^*)-\nabla H(r))=0$ そのものでもあります。したがって[凸射影の一階条件](#thm-ig10-convex-projection)と整合し、Pythagoras 等式が成り立ちます。
<!-- proof-end -->

**数値例**。$r=(1/2,1/3,1/6)$、$a=1/2$ とすると $s=5/6$、

$$
q^*=(3/10,1/5,1/2).
$$

例えば $p=(1/4,1/4,1/2)$ は同じ制約を満たし、上の計算では $\sum_{i=1}^2(p_i-q_i^*)=0$、$p_3-q_3^*=0$ なので三点の KL 差が確かに零になります。**最小性と直交性を別々に検証**できる例です。

## 6. 対数比制約では逆向き KL を最小にする

一方、$q_1/q_2=c>0$ は [IG8 の正確率単体の自然座標](../IG8/index.md#thm-ig8-simplex-geodesics) $\theta^i=\log(q_i/q_3)$（$i=1,2$）で表すと

$$
\theta^1-\theta^2
=\log\frac{q_1}{q_3}-\log\frac{q_2}{q_3}
=\log\frac{q_1}{q_2}=\log c
$$

となり、e-アファイン制約です。分母 $q_3$ を共通にした座標差なので、比の制約を一次式で判定できます。この集合への m-射影は **$D_{\mathrm{KL}}(r\Vert q)$** を最小化します。第5節と KL の向きが逆です。

<a id="prop-ig10-categorical-m-projection"></a>

<!-- formal-statement-start -->
> **命題（対数比制約への m-射影）**  
> $r_i>0$、$\sum_i r_i=1$、$c>0$ とする。正の確率分布で $q_1/q_2=c$ を満たす集合への $D_{\mathrm{KL}}(r\Vert q)$ の唯一の最小点は

$$
q^*=\left(\frac{c(r_1+r_2)}{1+c},\,
\frac{r_1+r_2}{1+c},\,r_3\right).
$$

> 同じ制約を満たす任意の正分布 $p$ に対し、

$$
D_{\mathrm{KL}}(r\Vert p)
=D_{\mathrm{KL}}(r\Vert q^*)+D_{\mathrm{KL}}(q^*\Vert p).
$$
<!-- formal-statement-end -->

### 証明の見取り図

$q=(ct,t,1-(1+c)t)$ と置き、開区間での一変数関数を微分します。正の内部解を直接求めた後、対数比制約から Pythagoras の補正が零であることを確かめます。

<!-- proof-start -->
### 証明

$0<t<1/(1+c)$ と置くと、$ct,t,1-(1+c)t$ はすべて正です。以下のプライム $f'(t),f''(t)$ はこの $t$ に関する通常微分 $d/dt,d^2/dt^2$ を表します。

$$
f(t)=D_{\mathrm{KL}}(r\Vert(ct,t,1-(1+c)t))
=\sum_i r_i\log r_i-r_1\log(ct)-r_2\log t-r_3\log(1-(1+c)t).
$$

微分すると

$$
f'(t)=-\frac{r_1+r_2}{t}
+\frac{(1+c)r_3}{1-(1+c)t},\qquad
f''(t)=\frac{r_1+r_2}{t^2}
+\frac{(1+c)^2r_3}{(1-(1+c)t)^2}>0.
$$

$f'(t)=0$ に $s=r_1+r_2=1-r_3$ を代入して整理すると

$$
s(1-(1+c)t)=(1+c)r_3t
\quad\Longrightarrow\quad t=\frac{s}{1+c}.
$$

$0<s<1$ なのでこれは許容区間の内部にあり、正の二階微分により唯一の大域最小点です。任意の同制約の $p$ について

$$
\begin{aligned}
&D_{\mathrm{KL}}(r\Vert p)
-D_{\mathrm{KL}}(r\Vert q^*)
-D_{\mathrm{KL}}(q^*\Vert p)\\
&\qquad=\sum_i(r_i-q_i^*)\log\frac{q_i^*}{p_i}.
\end{aligned}
$$

$q^*_3=r_3$ で第3項は零です。$p_1/p_2=q_1^*/q_2^*=c$ なので $\log(q_1^*/p_1)=\log(q_2^*/p_2)$、また $\sum_{i=1}^2(r_i-q_i^*)=0$ です。よって右辺は零となります。
<!-- proof-end -->

同じ $r=(1/2,1/3,1/6)$ に $c=1$ を課すと $q^*=(5/12,5/12,1/6)$ です。第5節の $q^*=(3/10,1/5,1/2)$ とは別の集合、別の KL の向き、別の射影であることが目で分かります。

## 7. 演習：直交・存在・二種類の KL

### IG10-A01 計量で測る直角

$\psi(x_1,x_2)=(x_1^2+3x_2^2)/2$、$P=(3,0)$、$Q=(0,0)$、$R=(0,2)$（すべて $\theta$ 座標）とする。e/m 接ベクトルと計量の内積を求め、三つの divergence の Pythagoras 等式を数値で確かめよ。

- Level: A
- 狙い: $\eta$ 差を $g^{-1}$ で接速度へ変換する

<!-- solution-start -->
**詳細解答**

$g=\operatorname{diag}(1,3)>0$、$\eta=(x_1,3x_2)$ だから $\eta_R-\eta_Q=(0,6)$ です。$v_e=P-Q=(3,0)$、$v_m=g^{-1}(0,6)=(0,2)$ となり、$g_Q(v_e,v_m)=0$ です。[Pythagoras 定理](#thm-ig10-pythagoras)の条件が揃います。ポテンシャルの明示式を Bregman divergence に代入して

$$
\mathcal D(P:R)=\tfrac12(3^2+3(-2)^2)=\tfrac{21}{2},\quad
\mathcal D(P:Q)=\tfrac92,\quad \mathcal D(Q:R)=6,
$$

よって $21/2=9/2+6$ です。
<!-- solution-end -->

### IG10-A02 Euclid 直線への最小化

$F(x)=\|x\|^2/2$、$z=(2,3)$、$C=\{(t,1-t):t\in\mathbb R\}$ とする。$D_F(q:z)$ の最小点を微分で求め、$p=(1,0)$ について Pythagoras 等式を確かめよ。

- Level: A
- 狙い: 局所一階条件と大域最小性を切り分ける

<!-- solution-start -->
**詳細解答**

$q=(t,1-t)$ と置くと

$$
D_F(q:z)=\tfrac12[(t-2)^2+(t+2)^2]=t^2+4.
$$

導関数は $2t$、二階微分は $2>0$ だから一意の最小点は $t=0$、$q=(0,1)$ です。$p=(1,0)$ は $C$ にあり、

$$
D_F(p:z)=\tfrac12(1+9)=5,\quad
D_F(p:q)=\tfrac12(1+1)=1,\quad
D_F(q:z)=\tfrac12(4+4)=4.
$$

よって $5=1+4$ です。線分を両方向に動かせるアファイン集合なので [凸射影定理](#thm-ig10-convex-projection)でも等式を得ます。
<!-- solution-end -->

### IG10-A03 前向き KL の群内比

$r=(2/5,1/5,2/5)$、$a=3/4$ とする。$q_1+q_2=a$ の制約へ前向き KL で e-射影した分布を求めよ。正で総和1であることを確かめよ。

- Level: A
- 狙い: m-アファイン制約における比の保存

<!-- solution-start -->
**詳細解答**

$s=r_1+r_2=3/5$ です。[カテゴリカル e-射影定理](#thm-ig10-categorical-e-projection)へ $a=3/4$、$r_1/s=2/3$、$r_2/s=1/3$ を代入すると

$$
q^*=(\tfrac34\cdot\tfrac23,\tfrac34\cdot\tfrac13,\tfrac14)
=(\tfrac12,\tfrac14,\tfrac14).
$$

各成分は正で、総和は $1/2+1/4+1/4=1$、最初の二成分和は $3/4$ です。$q_1^*/q_2^*=2=r_1/r_2$ も確認できます。
<!-- solution-end -->

### IG10-A04 逆向き KL の対数比

$r=(1/2,1/4,1/4)$、$c=1$ とする。$q_1/q_2=c$ の制約へ逆向き KL で m-射影した分布を求め、制約を直接確認せよ。

- Level: A
- 狙い: e-アファイン制約では逆向き KL を使う

<!-- solution-start -->
**詳細解答**

$s=r_1+r_2=3/4$ なので[対数比制約の命題](#prop-ig10-categorical-m-projection)から

$$
q^*=(\tfrac{3/4}2,\tfrac{3/4}2,\tfrac14)
=(\tfrac38,\tfrac38,\tfrac14).
$$

全成分が正で総和は $3/8+3/8+1/4=1$、比は $q_1^*/q_2^*=1$ です。自然座標では $\theta^1-\theta^2=\log1=0$ なので e-アファイン制約です。元の $r$ は $r_1/r_2=2$ で制約に入らず、[Bregman 非負性](../IG9/index.md#thm-ig9-bregman-positive)から射影の最小値は厳密に正です。
<!-- solution-end -->

### IG10-A05 凸性がない場合の直交

$F(x)=\|x\|^2/2$、$z=(2,0)$ とし、射影先を単位円周 $C=\{q:\|q\|=1\}$ とする。$q_\pm=(\pm1,0)$ の両点が局所的な直交条件を満たすことを示し、どちらが最小か調べよ。

- Level: A
- 狙い: 直交と大域最小性の混同を防ぐ

<!-- solution-start -->
**詳細解答**

円周の $q_\pm$ における接方向は $(0,t)$ です。$z-q_+=(1,0)$、$z-q_-=(3,0)$ はどちらも $(0,t)$ に垂直です。しかし

$$
D_F(q_+:z)=\tfrac12\|(1,0)-(2,0)\|^2=\tfrac12,
\qquad
D_F(q_-:z)=\tfrac12\|(-1,0)-(2,0)\|^2=\tfrac92.
$$

したがって $q_-$ は最短点ではありません。円周は凸でないため、[凸射影の一階条件の定理](#thm-ig10-convex-projection)の全 $p$ に対する条件を接方向の直交だけからは得られません。
<!-- solution-end -->

### IG10-B01 凸集合における等式と不等式

$F(x)=\|x\|^2/2$、$z=(-1,2)$、$C=\{(x,y):x\ge0,\ y\ge0\}$ とする。最小点 $q$ を求め、$p=(1,0)$ について Pythagoras 不等式の両辺を計算せよ。等式でない理由を説明せよ。

- Level: B
- 狙い: 境界の法線方向が残差を正にする

<!-- solution-start -->
**詳細解答**

目的関数は $\tfrac12[(x+1)^2+(y-2)^2]$ です。$x\ge0$ では $(x+1)^2$ は $x=0$ で最小、$y\ge0$ では $(y-2)^2$ は $y=2$ で最小なので $q=(0,2)$ です。$p=(1,0)$ に対して

$$
D_F(p:z)=\tfrac12(2^2+(-2)^2)=4,\quad
D_F(p:q)=\tfrac12(1^2+(-2)^2)=\tfrac52,\quad
D_F(q:z)=\tfrac12.
$$

差は $4-(5/2+1/2)=1$ です。実際、[三点恒等式](../IG9/index.md#thm-ig9-three-point)の補正 $(p-q)\cdot(q-z)=(1,-2)\cdot(1,0)=1>0$ に等しく、$q$ は集合 $C$ の境界であるため $x$ を負方向へ動かせず、内積を零にする必要はありません。
<!-- solution-end -->

### IG10-B02 双対側の Pythagoras の向き

$\varphi(\eta)=(\eta_1^2+\eta_2^2)/2$、$z=(2,3)$、$C_m=\{(\eta_1,\eta_2):\eta_1+\eta_2=1\}$ とする。$D_\varphi(\eta_q:\eta_z)$ の最小点を求め、任意の $\eta_p\in C_m$ に対する三点恒等式を記せ。指数型族の KL の記号ではどちらが forward かを答えよ。

- Level: B
- 狙い: $\eta$ 側の Bregman と $\theta$ 側の引数反転

<!-- solution-start -->
**詳細解答**

$q=(t,1-t)$ で

$$
D_\varphi(q:z)=\tfrac12[(t-2)^2+(1-t-3)^2]=t^2+4
$$

となるので $q=(0,1)$ が唯一の最小点です。$\eta_p-\eta_q$ は $(s,-s)$、$\nabla\varphi(q)-\nabla\varphi(z)=q-z=(-2,-2)$ だから補正は $0$ で、

$$
D_\varphi(\eta_p:\eta_z)
=D_\varphi(\eta_p:\eta_q)+D_\varphi(\eta_q:\eta_z).
$$

[双対表示](../IG9/index.md#thm-ig9-canonical-dual)によって $D_\varphi(\eta_q:\eta_z)=D_\psi(\theta_z:\theta_q)$ です。指数型族では[KL 対応](../IG9/index.md#thm-ig9-exponential-kl)からこれは $D_{\mathrm{KL}}(q\Vert z)$、すなわち本章の forward KL です。二次モデル自体が必ず確率モデルであると主張してはいません。
<!-- solution-end -->

### IG10-B03 射影の存在条件

$F(t)=t^2/2$、$z=2$ を考える。$C_1=(-\infty,1)$、$C_2=(-\infty,1]$ 上の $D_F(q:z)$ の最小値と達成の有無をそれぞれ求めよ。また $C_2$ が[存在定理](#thm-ig10-existence)のどの仮定を満たすか説明せよ。

- Level: B
- 狙い: 最小化列が境界に逃げる場合と閉集合の場合の差

<!-- solution-start -->
**詳細解答**

$D_F(q:2)=(q-2)^2/2$、導関数は $q-2<0$（$q\le1$）なので $q$ が増すほど値が減ります。$C_1$ では $q\uparrow1$ により下限 $1/2$ に近づきますが $1\notin C_1$ なので達成されません。$C_2$ では $q=1$ が唯一の最小点で値は $1/2$ です。

$W=\mathbb R$、$C_2$ は非空・閉・凸で、$q\to-\infty$ なら $(q-2)^2/2\to\infty$ です。[存在・一意性定理](#thm-ig10-existence)の第2条件に当てはまります。$C_1$ は閉性を欠きます。
<!-- solution-end -->

### IG10-B04 3点分布の三点補正

$r=(1/2,1/3,1/6)$、$a=1/2$、$q=(3/10,1/5,1/2)$、$p=(1/4,1/4,1/2)$ とする。$\sum_i(p_i-q_i)\log(q_i/r_i)$ をすべての項を書いて計算し、KL の Pythagoras 等式を確認せよ。

- Level: B
- 狙い: 直交が成分和の相殺から生じることを見る

<!-- solution-start -->
**詳細解答**

$q_1/r_1=(3/10)/(1/2)=3/5$、$q_2/r_2=(1/5)/(1/3)=3/5$、$q_3/r_3=(1/2)/(1/6)=3$ です。$p-q=(-1/20,1/20,0)$ だから

$$
\begin{aligned}
\sum_i(p_i-q_i)\log(q_i/r_i)
&=(-1/20)\log(3/5)+(1/20)\log(3/5)+0\log3\\
&=0.
\end{aligned}
$$

3つの KL を定義から展開した差はこの補正そのものです（[カテゴリカル e-射影定理](#thm-ig10-categorical-e-projection)の証明）。従って

$$
D_{\mathrm{KL}}(p\Vert r)
=D_{\mathrm{KL}}(p\Vert q)+D_{\mathrm{KL}}(q\Vert r).
$$

$p,q,r$ の成分はすべて正なので対数も有限です。
<!-- solution-end -->

### IG10-C01 二つの射影の向きと Pythagoras を統合する

$r=(1/2,1/3,1/6)$ を固定する。

1. $C_m=\{q_i>0:\sum_iq_i=1,\ q_1+q_2=1/2\}$ への forward KL 射影を求めよ。$p=(1/4,1/4,1/2)$ との Pythagoras 等式を成分で示せ。
2. $C_e=\{q_i>0:\sum_iq_i=1,\ q_1=q_2\}$ への reverse KL 射影を求めよ。$u=(1/3,1/3,1/3)$ との Pythagoras 等式を成分で示せ。
3. それぞれの制約が m-/e-アファインである理由、射影を結ぶ測地線の種類、解が境界にない理由を説明せよ。

- Level: C
- 狙い: 制約の座標、KL の引数、最小化、直交、存在を同時に再構成する

<!-- solution-start -->
**詳細解答**

以下の $q_m$ は **m-アファインな制約先 $C_m$ への e-射影**、$q_e$ は **e-アファインな制約先 $C_e$ への m-射影**を表します。添字は射影先の座標種別であり、射影を結ぶ測地線の種類とは逆です。

1. $s=r_1+r_2=5/6$ なので、[m-平坦集合への e-射影定理](#thm-ig10-categorical-e-projection)を $a=1/2$ で適用すると

   $$
   q_m=(\tfrac12\cdot\tfrac{1/2}{5/6},
         \tfrac12\cdot\tfrac{1/3}{5/6},\tfrac12)
       =(3/10,1/5,1/2).
   $$

   $q_{m,1}/r_1=q_{m,2}/r_2=3/5$、$q_{m,3}/r_3=3$ です。$p-q_m=(-1/20,1/20,0)$ だから

   $$
   \sum_i(p_i-q_{m,i})\log(q_{m,i}/r_i)
   =-\tfrac1{20}\log(3/5)+\tfrac1{20}\log(3/5)=0.
   $$

   従って3つの KL を展開すると

   $$
   D_{\mathrm{KL}}(p\Vert r)
   =D_{\mathrm{KL}}(p\Vert q_m)+D_{\mathrm{KL}}(q_m\Vert r).
   $$

2. $c=1$、$s=5/6$ なので、[対数比制約への m-射影](#prop-ig10-categorical-m-projection)から

   $$
   q_e=(s/2,s/2,r_3)=(5/12,5/12,1/6).
   $$

   $u_1/u_2=q_{e,1}/q_{e,2}=1$、$r_3=q_{e,3}$ であり、

   $$
   \begin{aligned}
   &\sum_i(r_i-q_{e,i})\log(q_{e,i}/u_i)\\
   &=(\tfrac12-\tfrac5{12})\log(5/4)
    +(\tfrac13-\tfrac5{12})\log(5/4)
    +(\tfrac16-\tfrac16)\log(1/2)\\
   &=\tfrac1{12}\log(5/4)-\tfrac1{12}\log(5/4)=0.
   \end{aligned}
   $$

   よって

   $$
   D_{\mathrm{KL}}(r\Vert u)
   =D_{\mathrm{KL}}(r\Vert q_e)+D_{\mathrm{KL}}(q_e\Vert u).
   $$

3. [IG8 の単体の m-座標](../IG8/index.md#thm-ig8-simplex-geodesics)は $\eta=(q_1,q_2)$ です。制約

   $$
   q_1+q_2=\frac12
   $$

   はこの座標で線形なので、$C_m$ は m-アファインです。一方、自然座標 $\theta^i=\log(q_i/q_3)$（$i=1,2$）では

   $$
   q_1=q_2
   \quad\Longleftrightarrow\quad
   \theta^1-\theta^2=0.
   $$

   従って $C_e$ は e-アファインです。前者への射影は e-測地線、後者への射影は m-測地線で直交します。

   すべての基準分布の成分が正で、群和の指定値は $0<a<1$、比率の指定値は $c>0$ なので、両公式の $q_m,q_e$ は全成分正です。制約上の内部点に解を構成したことと厳密凸性が、存在・一意性の根拠です。境界の分布は暗黙に含めていません。
<!-- solution-end -->

---

## 8. 何が分かったか

- **一般化 Pythagoras は条件付きの等式**です。二種類の測地線の接ベクトルが Fisher/Hessian 計量で直交するとき、三点恒等式の補正が消えます。
- **凸集合への射影では、まず不等式**が成り立ちます。アファイン集合の相対内点なら一階不等式が等式となりますが、境界や非凸集合では注意が必要です。
- 正則な全指数型分布族では、m-平坦集合への **e-射影が $D_{\mathrm{KL}}(q\Vert z)$**、e-平坦集合への **m-射影が $D_{\mathrm{KL}}(z\Vert q)$** を最小化します。名前ではなく引数順を確かめます。
- 正定値 Hessian は一意性を支えますが、存在には境界へ逃げない条件が別途必要です。次の IG11 ではこの射影を最尤推定・最大エントロピーへつなぎます。
