# VC8 場を源と渦へ分ける：Helmholtz 分解

VC5 では、無回転場・無発散場とベクトルポテンシャルの入口まで進みました。本章ではその問いを三次元全空間で完成させます。

> ベクトル場の **発散** と **回転** が分かれば、その場をどこまで復元できるのか。

答えが **Helmholtz 分解**です。適切な正則性と無限遠での条件の下で、ベクトル場は

$$
F
=
-\nabla\phi
+
\nabla\times A
$$

と、無回転な成分と無発散な成分へ分かれます。

直接の前提は [VC5 の Kelvin--Stokes の定理・ベクトルポテンシャル](../VC5/index.md#def-vc5-vector-potential) と [PDE6 の基本解・Green 表現の考え方](../PDE6/index.md#def-pde6-fundamental-solution) です。PDE6 は二次元の Laplace・Poisson 方程式を扱うため、本章では三次元全空間に必要な Newton 核だけを直接構成します。Green 関数一般論は重複して作りません。

本章の主定理は、境界項を確実に消せるようまず

$$
F\in C_c^3(\mathbb R^3;\mathbb R^3)
$$

で証明します。その後、どの無限遠条件まで緩められるかを整理します。「十分速く減衰する」と一言で済ませず、証明のどこで無限遠境界項が消える必要があるかを確認します。

---

## 1. 三次元で一点源を表す Newton 核

<a id="def-vc8-newton-kernel"></a>

<!-- formal-statement-start -->
> **定義（Newton 核）**  
> $x\in\mathbb R^3\setminus\{0\}$ に対し
>
$$
G(x)
:=
\frac{1}{4\pi|x|}
$$
>
> と定める。この $G$ を本章の **Newton 核** と呼ぶ。
<!-- formal-statement-end -->

<!-- definition-example-start: def-vc8-newton-kernel -->
**定義の確認**

$x=e_1=(1,0,0)$ では

$$
G(e_1)=\frac{1}{4\pi}.
$$

また

$$
\nabla G(x)
=
-\frac{x}{4\pi|x|^3}
$$

なので

$$
-\nabla G(e_1)
=
\frac{1}{4\pi}e_1.
$$

Newton 核の負の勾配は原点から外向きの逆二乗場です。
<!-- definition-example-end -->

原点以外では $G$ は調和的です。しかし原点を除いた小球面を通る流束は消えません。

<a id="prop-vc8-newton-unit-source"></a>

<!-- formal-statement-start -->
> **命題（Newton 核の調和性と単位流束）**  
> $x\ne0$ で
>
$$
\Delta G(x)=0.
$$
>
> また半径 $\varepsilon>0$ の球面 $S_\varepsilon$ の外向き単位法線を $n$ とすると
>
$$
\boxed{
\int_{S_\varepsilon}
(-\nabla G)\cdot n\,dS
=
1
}
$$
>
> である。
<!-- formal-statement-end -->

<!-- proof-start -->
### 証明

$r=|x|$ とします。$G=(4\pi)^{-1}r^{-1}$ なので、$r>0$ で

$$
\nabla G
=
-\frac{x}{4\pi r^3}.
$$

球対称関数のラプラシアン公式を直接用いると

$$
\Delta\left(\frac1r\right)
=
\frac1{r^2}
\frac{d}{dr}
\left(
r^2\frac{d}{dr}\frac1r
\right).
$$

ここで

$$
r^2\frac{d}{dr}\frac1r=-1
$$

だから

$$
\Delta G=0
$$

です。

次に $S_\varepsilon$ 上では

$$
n=\frac{x}{|x|}
=
\frac{x}{\varepsilon},
$$

したがって

$$
-\nabla G
=
\frac{x}{4\pi\varepsilon^3}
=
\frac{1}{4\pi\varepsilon^2}n.
$$

よって

$$
\int_{S_\varepsilon}
(-\nabla G)\cdot n\,dS
=
\frac{1}{4\pi\varepsilon^2}
\operatorname{Area}(S_\varepsilon).
$$

球面積 $\operatorname{Area}(S_\varepsilon)=4\pi\varepsilon^2$ を代入して

$$
\int_{S_\varepsilon}
(-\nabla G)\cdot n\,dS
=
1.
$$
<!-- proof-end -->

この「原点以外では発散 0 なのに、原点を囲む球面から単位流束が出る」という構造が、三次元の点源を表しています。PDE6 の二次元基本解で小円をくり抜いたのと同じ機構です。

---

## 2. 源を Newton 核で広げる

<a id="def-vc8-newton-potential"></a>

<!-- formal-statement-start -->
> **定義（Newton ポテンシャル）**  
> $f:\mathbb R^3\to\mathbb R$ が有界かつコンパクトな台を持つとする。積分が定義できるとき
>
$$
(Nf)(x)
:=
\int_{\mathbb R^3}
G(x-y)f(y)\,dy
=
\frac1{4\pi}
\int_{\mathbb R^3}
\frac{f(y)}{|x-y|}\,dy
$$
>
> を $f$ の **Newton ポテンシャル** と呼ぶ。
<!-- formal-statement-end -->

特異性 $|x-y|^{-1}$ は三次元では、特異点を含む小球上でも積分が有限です。実際、$x$ のまわりの半径 $\varepsilon$ の球では

$$
\int_{|x-y|<\varepsilon}
\frac{dy}{|x-y|}
=
4\pi\int_0^\varepsilon r\,dr
=
2\pi\varepsilon^2
<
\infty.
$$

<!-- definition-example-start: def-vc8-newton-potential -->
**定義の確認**

$f=\mathbf 1_{B_1(0)}$ とします。$x=0$ では

$$
(Nf)(0)
=
\frac1{4\pi}
\int_{|y|<1}\frac{dy}{|y|}.
$$

球座標で

$$
(Nf)(0)
=
\frac1{4\pi}
4\pi\int_0^1 r\,dr
=
\boxed{\frac12}.
$$

核自身は原点で発散しますが、三次元体積要素の $r^2$ があるため積分は有限になります。
<!-- definition-example-end -->

<a id="thm-vc8-newton-poisson"></a>

<!-- formal-statement-start -->
> **定理（Newton ポテンシャルは Poisson 方程式を解く）**  
> $f\in C_c^2(\mathbb R^3)$ とし、
>
$$
u=Nf
$$
>
> とおく。このとき $u\in C^2(\mathbb R^3)$ で
>
$$
\boxed{
-\Delta u=f
}
$$
>
> が成り立つ。
<!-- formal-statement-end -->

### 証明の見取り図

特異核をそのまま二回微分する代わりに、$x$ を中心とする球面上の $f$ の平均を使います。Newton 核の $1/r$ と体積要素 $r^2dr\,d\omega$ が組み合わさり、一変数の積分に落ちます。

<!-- proof-start -->
### 証明

固定した $x$ に対し、半径 $r$ の球面上の平均を

$$
M_x(r)
:=
\frac1{4\pi}
\int_{S^2}
f(x+r\omega)\,d\omega
$$

とおきます。

球座標 $y=x+r\omega$ を使うと

$$
u(x)
=
\frac1{4\pi}
\int_0^\infty
\int_{S^2}
\frac{f(x+r\omega)}{r}
r^2\,d\omega\,dr.
$$

従って

$$
u(x)
=
\int_0^\infty rM_x(r)\,dr.
$$

$f$ はコンパクトな台を持つので、固定した $x$ では十分大きな $r$ に対して $M_x(r)=0$ です。

次に球面平均の基本関係を示します。$r>0$ で

$$
M_x'(r)
=
\frac1{4\pi}
\int_{S^2}
\nabla f(x+r\omega)\cdot\omega\,d\omega.
$$

両辺へ $4\pi r^2$ を掛けると

$$
4\pi r^2M_x'(r)
=
\int_{\partial B_r(x)}
\frac{\partial f}{\partial n}\,dS.
$$

[VC4 の Gauss--Ostrogradsky の発散定理](../VC4/index.md#thm-vc4-gauss-divergence)を $\nabla f$ へ適用して

$$
4\pi r^2M_x'(r)
=
\int_{B_r(x)}
\Delta f\,dy.
$$

$r$ で微分すると

$$
\frac{d}{dr}
\left(
r^2M_x'(r)
\right)
=
r^2
\frac1{4\pi}
\int_{S^2}
\Delta f(x+r\omega)\,d\omega.
$$

右辺の球面平均は $\Delta_xM_x(r)$ に等しいので

$$
\Delta_xM_x(r)
=
M_x''(r)
+
\frac2rM_x'(r).
$$

$f\in C_c^2$ なので、上の微分と積分の交換はコンパクトな $r$ 区間上で連続な二階偏微分により正当化されます。したがって

$$
\Delta u(x)
=
\int_0^\infty
r\Delta_xM_x(r)\,dr.
$$

球面平均の式を代入すると

$$
\Delta u(x)
=
\int_0^\infty
\left(
rM_x''(r)+2M_x'(r)
\right)dr.
$$

第一項を部分積分して

$$
\int_0^\infty rM_x''(r)\,dr
=
\left[rM_x'(r)\right]_0^\infty
-
\int_0^\infty M_x'(r)\,dr.
$$

$M_x$ は大きな $r$ で 0 であり、$rM_x'(r)\to0$ です。また $r\downarrow0$ でも $rM_x'(r)\to0$ です。従って

$$
\Delta u(x)
=
\int_0^\infty M_x'(r)\,dr
=
M_x(\infty)-M_x(0).
$$

ここで

$$
M_x(\infty)=0,
\qquad
M_x(0)=f(x)
$$

なので

$$
\Delta u(x)=-f(x).
$$

従って

$$
-\Delta u=f.
$$
<!-- proof-end -->

この定理が本章で必要な「三次元全空間の基本解」の仕事を引き受けます。一般領域の Green 関数へは進みません。

---

## 3. 発散と回転から二つのポテンシャルを作る

$F$ を十分滑らかなベクトル場とし

$$
\rho
:=
\operatorname{div}F,
\qquad
\omega
:=
\nabla\times F
$$

とおきます。

$\rho$ は源・吸い込みを、$\omega$ は局所的な回転を測る量です。

<a id="def-vc8-helmholtz-potentials"></a>

<!-- formal-statement-start -->
> **定義（Helmholtz のスカラーポテンシャル・ベクトルポテンシャル）**  
> $\rho$ と $\omega$ に Newton ポテンシャルを成分ごとに作用させ、
>
$$
\phi(x)
:=
\frac1{4\pi}
\int_{\mathbb R^3}
\frac{\rho(y)}{|x-y|}\,dy,
$$
>
$$
A(x)
:=
\frac1{4\pi}
\int_{\mathbb R^3}
\frac{\omega(y)}{|x-y|}\,dy
$$
>
> と定める。$\phi$ を **Helmholtz のスカラーポテンシャル**、$A$ を **Helmholtz のベクトルポテンシャル**と呼ぶ。
<!-- formal-statement-end -->

<!-- definition-example-start: def-vc8-helmholtz-potentials -->
**定義の確認**

$$
q(y)
=
\begin{cases}
(1-|y|^2)^4,&|y|<1,\\
0,&|y|\ge1
\end{cases}
$$

とし、

$$
\rho=q,
\qquad
\omega=qe_3
$$

を考えます。

$x=0$ では

$$
\phi(0)
=
\int_0^1 r(1-r^2)^4\,dr.
$$

$t=r^2$ とおくと

$$
\phi(0)
=
\frac12\int_0^1(1-t)^4\,dt
=
\frac1{10}.
$$

同様に

$$
A(0)=\frac1{10}e_3.
$$

スカラーの源とベクトルの渦を同じ Newton 核で広げることが確認できます。
<!-- definition-example-end -->

---

## 4. Helmholtz 分解

<a id="thm-vc8-helmholtz"></a>

<!-- formal-statement-start -->
> **定理（Helmholtz 分解：コンパクトな台を持つ場合）**  
> $F\in C_c^3(\mathbb R^3;\mathbb R^3)$ とし、
>
$$
\rho=\operatorname{div}F,
\qquad
\omega=\nabla\times F
$$
>
> とする。[Helmholtz のポテンシャル](#def-vc8-helmholtz-potentials) $\phi,A$ を用いると
>
$$
\boxed{
F
=
-\nabla\phi
+
\nabla\times A
}
$$
>
> が成り立つ。
>
> さらに、この積分表示で得られる $A$ は
>
$$
\boxed{
\operatorname{div}A=0
}
$$
>
> を満たす。
<!-- formal-statement-end -->

### 証明の見取り図

まずベクトル場そのものへ Newton ポテンシャルを成分ごとに作用させた

$$
C:=NF
$$

を作ります。[Newton ポテンシャルの定理](#thm-vc8-newton-poisson)により

$$
-\Delta C=F.
$$

次に、$C$ の発散が $\phi$、$C$ の回転が $A$ であることを部分積分で確認します。最後に

$$
-\Delta C
=
-\nabla(\operatorname{div}C)
+
\nabla\times(\nabla\times C)
$$

を成分計算から使います。

<!-- proof-start -->
### 証明

$C=(C_1,C_2,C_3)$ を

$$
C_i(x)
=
\int_{\mathbb R^3}
G(x-y)F_i(y)\,dy
$$

で定めます。

$F_i\in C_c^3$ なので [Newton ポテンシャルの定理](#thm-vc8-newton-poisson) を各成分へ適用でき、

$$
-\Delta C_i=F_i.
$$

従って

$$
-\Delta C=F.
$$

次に $\operatorname{div}C$ を計算します。

$$
\operatorname{div}C
=
\int_{\mathbb R^3}
\nabla_xG(x-y)\cdot F(y)\,dy.
$$

$$
\nabla_xG(x-y)
=
-\nabla_yG(x-y)
$$

なので

$$
\operatorname{div}C
=
-\int_{\mathbb R^3}
\nabla_yG(x-y)\cdot F(y)\,dy.
$$

$F$ はコンパクトな台を持つため、十分大きな球の境界では $F=0$ です。したがって発散定理による部分積分の境界項は 0 で、

$$
\operatorname{div}C
=
\int_{\mathbb R^3}
G(x-y)\operatorname{div}F(y)\,dy
=
\phi(x).
$$

同様に各成分で部分積分すると

$$
\nabla\times C
=
\int_{\mathbb R^3}
G(x-y)
\left(
\nabla_y\times F(y)
\right)dy
=
A(x).
$$

ここでベクトル・ラプラシアンの恒等式を成分から確認します。$C=(P,Q,R)$ とすると、例えば第1成分は

$$
[\nabla\times(\nabla\times C)]_1
=
\partial_y(P_y-Q_x)
-
\partial_z(R_x-P_z).
$$

混合偏微分を交換すると

$$
[\nabla\times(\nabla\times C)]_1
=
\partial_x(P_x+Q_y+R_z)
-
(P_{xx}+P_{yy}+P_{zz}).
$$

すなわち

$$
[\nabla\times(\nabla\times C)]_1
=
[\nabla(\operatorname{div}C)]_1
-
[\Delta C]_1.
$$

第2・第3成分も同じ計算なので

$$
\nabla\times(\nabla\times C)
=
\nabla(\operatorname{div}C)
-
\Delta C.
$$

従って

$$
-\Delta C
=
-\nabla(\operatorname{div}C)
+
\nabla\times(\nabla\times C).
$$

$\operatorname{div}C=\phi$、$\nabla\times C=A$ を代入すると

$$
F
=
-\nabla\phi
+
\nabla\times A.
$$

最後に

$$
A=\nabla\times C
$$

なので [VC1 の「回転の発散は 0」](../VC1/index.md#thm-vc1-div-curl) から

$$
\operatorname{div}A=0.
$$
<!-- proof-end -->

ここで重要なのは、$\phi$ と $A$ を「存在するはず」と置いたのではなく、Newton 核による積分表示から実際に構成したことです。

---

## 5. ゲージ自由度と Coulomb ゲージ

VC5 では、ベクトルポテンシャルに勾配を足しても回転が変わらないことを見ました。本章では Helmholtz 分解の積分表示と結びます。

<a id="def-vc8-gauge"></a>

<!-- formal-statement-start -->
> **定義（ゲージ同値と Coulomb ゲージ）**  
> 二つのベクトルポテンシャル $A,A'$ が、ある $C^2$ 級スカラー関数 $\chi$ を用いて
>
$$
A'
=
A+\nabla\chi
$$
>
> と書けるとき、$A$ と $A'$ は **ゲージ同値**であるという。
>
> また
>
$$
\operatorname{div}A=0
$$
>
> を満たすゲージを **Coulomb ゲージ**という。
<!-- formal-statement-end -->

<!-- definition-example-start: def-vc8-gauge -->
**定義の確認**

$$
A=(0,0,x),
\qquad
\chi=xy
$$

とします。

$$
\nabla\chi=(y,x,0)
$$

なので

$$
A'=(y,x,x).
$$

一方

$$
\nabla\times\nabla\chi=0
$$

だから

$$
\nabla\times A'
=
\nabla\times A.
$$

実際

$$
\nabla\times A
=
(0,-1,0)
$$

であり、$A'$ でも同じ回転を得ます。
<!-- definition-example-end -->

Helmholtz 定理で構成した $A$ は自動的に Coulomb ゲージに入っています。しかし、ベクトルポテンシャルそのものが物理的な場と同じ意味で一意ということではありません。

---

## 6. 縦成分と横成分

<a id="def-vc8-longitudinal-transverse"></a>

<!-- formal-statement-start -->
> **定義（縦成分・横成分）**  
> Helmholtz 分解
>
$$
F
=
-\nabla\phi+\nabla\times A
$$
>
> に対し
>
$$
F_{\mathrm L}
:=
-\nabla\phi,
\qquad
F_{\mathrm T}
:=
\nabla\times A
$$
>
> とおく。$F_{\mathrm L}$ を **縦成分（longitudinal component）**、$F_{\mathrm T}$ を **横成分（transverse component）** と呼ぶ。
<!-- formal-statement-end -->

[VC1 の「勾配の回転は 0」](../VC1/index.md#thm-vc1-curl-grad) と [「回転の発散は 0」](../VC1/index.md#thm-vc1-div-curl) から

$$
\nabla\times F_{\mathrm L}=0,
$$

$$
\operatorname{div}F_{\mathrm T}=0.
$$

<!-- definition-example-start: def-vc8-longitudinal-transverse -->
**定義の確認**

$$
\phi=x^2+y^2+z^2,
\qquad
A=(0,0,xy)
$$

とします。

縦成分は

$$
F_{\mathrm L}
=
-\nabla\phi
=
(-2x,-2y,-2z).
$$

横成分は

$$
F_{\mathrm T}
=
\nabla\times A
=
(x,-y,0).
$$

直接計算すると

$$
\nabla\times F_{\mathrm L}=0,
$$

$$
\operatorname{div}F_{\mathrm T}
=
1-1+0
=
0.
$$

この例は減衰しないので全空間の主定理の仮定には入りませんが、「縦は無回転、横は無発散」という定義上の役割を直接確認できます。
<!-- definition-example-end -->

---

## 7. 一意性を壊すもの：調和成分と境界条件

発散と回転だけでは、どんな領域でも場が一意に決まるわけではありません。

<a id="prop-vc8-harmonic-ambiguity"></a>

<!-- formal-statement-start -->
> **命題（調和ベクトル場による曖昧さ）**  
> 領域 $\Omega\subset\mathbb R^3$ 上で
>
$$
\operatorname{div}h=0,
\qquad
\nabla\times h=0
$$
>
> を満たす $C^1$ 級ベクトル場 $h$ があるとする。このとき任意の $F$ に対し、$F$ と $F+h$ は同じ発散と同じ回転を持つ。
<!-- formal-statement-end -->

<!-- proof-start -->
### 証明

線形性から

$$
\operatorname{div}(F+h)
=
\operatorname{div}F+\operatorname{div}h
=
\operatorname{div}F,
$$

また

$$
\nabla\times(F+h)
=
\nabla\times F+\nabla\times h
=
\nabla\times F.
$$
<!-- proof-end -->

例えば有界領域上の定数ベクトル場 $h=c$ は

$$
\operatorname{div}c=0,
\qquad
\nabla\times c=0
$$

なので、発散と回転だけでは $c$ を検出できません。

三次元全空間の Helmholtz 定理では

- コンパクトな台、または十分な無限遠減衰
- Newton 核による積分表示

がこの曖昧さを固定します。

一方、有界領域では法線成分・接線成分などの境界条件が必要です。また穴のある領域では、VC5 の [穴による大域ポテンシャルの障害](../VC5/index.md#prop-vc5-hole-obstruction) が加わります。

---

## 8. コンパクトな台を外すと、どこに境界項が出るか

主定理で $F$ をコンパクトな台に限定した理由は、部分積分

$$
-\int
\nabla_yG(x-y)\cdot F(y)\,dy
=
\int
G(x-y)\operatorname{div}F(y)\,dy
$$

で無限遠境界項を確実に 0 にするためでした。

半径 $R$ の球で切って計算すると、境界項は概ね

$$
\int_{|y|=R}
G(x-y)F(y)\cdot n\,dS
$$

です。固定した $x$ に対して $R\to\infty$ では

$$
G(x-y)=O(R^{-1}),
\qquad
dS=O(R^2),
$$

なので、例えば

$$
R\sup_{|y|=R}|F(y)|
\longrightarrow0
$$

ならこの境界項は消えます。

従ってコンパクトな台は十分条件の一つであり、本質は **積分の収束・微分交換・無限遠境界項の消失**です。

典型的には

$$
F(y)=O(|y|^{-2})
$$

程度の場でも、より詳細な源の可積分性と境界項評価を組み合わせれば Helmholtz 型の積分表示が使えます。ただし臨界的な減衰では条件を一括して「十分速い」と省略せず、各積分と境界項を個別に確認する必要があります。

---

## 9. 無発散場を渦度から戻す：Biot--Savart 形

特に

$$
\operatorname{div}u=0
$$

なら、Helmholtz 分解の縦成分は無限遠条件の下で消え、

$$
u=\nabla\times A
$$

となります。

渦度

$$
\omega=\nabla\times u
$$

に対し

$$
A(x)
=
\frac1{4\pi}
\int_{\mathbb R^3}
\frac{\omega(y)}{|x-y|}\,dy
$$

なので、$x$ について回転を取ると

<a id="cor-vc8-biot-savart"></a>

<!-- formal-statement-start -->
> **系（Biot--Savart 型の渦度再構成）**  
> $u\in C_c^3(\mathbb R^3;\mathbb R^3)$ が
>
$$
\operatorname{div}u=0
$$
>
> を満たし、$\omega=\nabla\times u$ とする。このとき
>
$$
\boxed{
u(x)
=
\frac1{4\pi}
\int_{\mathbb R^3}
\frac{
\omega(y)\times(x-y)
}{
|x-y|^3
}
\,dy
}
$$
>
> が成り立つ。
<!-- formal-statement-end -->

<!-- proof-start -->
### 証明

Helmholtz 分解で

$$
u
=
-\nabla\phi+\nabla\times A.
$$

ここで

$$
-\Delta\phi
=
\operatorname{div}u
=
0.
$$

主定理の構成では

$$
\phi
=
N(\operatorname{div}u)
=
0
$$

なので

$$
u=\nabla\times A.
$$

また

$$
A(x)
=
\frac1{4\pi}
\int
\frac{\omega(y)}{|x-y|}\,dy.
$$

$y$ は積分変数なので

$$
\nabla_x\times
\left(
\frac{\omega(y)}{|x-y|}
\right)
=
\nabla_x\left(\frac1{|x-y|}\right)
\times\omega(y).
$$

さらに

$$
\nabla_x\left(\frac1{|x-y|}\right)
=
-\frac{x-y}{|x-y|^3}.
$$

従って

$$
u(x)
=
-\frac1{4\pi}
\int
\frac{x-y}{|x-y|^3}
\times\omega(y)\,dy.
$$

外積の順序を入れ替えて

$$
u(x)
=
\frac1{4\pi}
\int
\frac{\omega(y)\times(x-y)}{|x-y|^3}\,dy.
$$
<!-- proof-end -->

これは VC9 で非圧縮流と渦度を結ぶときの基本式になります。

---

## 10. 物理で何が同じ構造を使っているのか

### 静電場・重力場

無回転場では

$$
\nabla\times F=0
$$

なので横成分が消え、

$$
F=-\nabla\phi.
$$

源密度が $\rho=\operatorname{div}F$ なら

$$
-\Delta\phi=\rho.
$$

符号や物理定数は各理論の規約で変わりますが、「源 $\to$ Poisson 方程式 $\to$ スカラーポテンシャル $\to$ 場」という構造は共通です。

### 静磁場

無発散場では

$$
\operatorname{div}B=0
$$

なので

$$
B=\nabla\times A
$$

というベクトルポテンシャル表示が自然です。$A$ にはゲージ自由度があります。

### 非圧縮流

非圧縮条件

$$
\operatorname{div}u=0
$$

の下では、速度場は渦度

$$
\omega=\nabla\times u
$$

から [Biot--Savart 型公式](#cor-vc8-biot-savart)で再構成できます。

ここでは物理法則そのものを導出しません。VC8 の役割は、**同じベクトル解析の分解構造が複数の物理分野に現れることを見抜けるようにすること**です。

---

## 11. 本章の停止線

本章では

- 三次元ユークリッド空間
- 古典的な偏微分
- Newton 核
- 全空間または境界条件を意識した Helmholtz 分解

までを扱いました。

次は VC9 で

- 保存則
- 非圧縮流と渦度
- 応力テンソルと運動量収支
- Maxwell 方程式の積分形・微分形

へ進みます。

Hodge 分解、微分形式、de Rham cohomology、一般 Riemann 多様体上のラプラシアンは本系列の外です。

---

## 12. 演習

#### VC8-A01 Newton 核の流束
- Level: A
- 目安時間: 15分

$$
G(x)=\frac1{4\pi|x|}
$$

とする。

1. $x\ne0$ で $-\nabla G$ を求めよ。
2. 半径 $R$ の球面 $S_R$ を通る $-\nabla G$ の外向き流束を求めよ。
3. $R$ に依存しない理由を説明せよ。

<!-- solution-start -->
### 詳細解答

1.

$$
\nabla |x|^{-1}
=
-\frac{x}{|x|^3}
$$

だから

$$
\boxed{
-\nabla G(x)
=
\frac{x}{4\pi|x|^3}
}.
$$

2. $S_R$ 上で $x=Rn$ なので

$$
-\nabla G
=
\frac{n}{4\pi R^2}.
$$

従って

$$
\int_{S_R}
(-\nabla G)\cdot n\,dS
=
\frac1{4\pi R^2}
\cdot4\pi R^2
=
\boxed{1}.
$$

3. 場の大きさは $R^{-2}$ で減少しますが、球面積は $R^2$ で増加します。両者が相殺するため、総流束は半径によらず 1 です。
<!-- solution-end -->

#### VC8-A02 Newton ポテンシャルの特異性
- Level: A
- 目安時間: 15分

$$
f=\mathbf 1_{B_a(0)}
$$

とする。

1. $(Nf)(0)$ を求めよ。
2. $|x-y|^{-1}$ が $y=x$ で発散しても積分が有限になる理由を、球座標の冪で説明せよ。

<!-- solution-start -->
### 詳細解答

1.

$$
(Nf)(0)
=
\frac1{4\pi}
\int_{|y|<a}
\frac{dy}{|y|}.
$$

球座標で

$$
dy=4\pi r^2dr
$$

とまとめれば

$$
(Nf)(0)
=
\int_0^a r\,dr
=
\boxed{\frac{a^2}{2}}.
$$

2. 核は $r^{-1}$ ですが、三次元体積要素は $r^2dr$ を含みます。従って原点近くの積分は

$$
\int_0^\varepsilon r^{-1}r^2\,dr
=
\int_0^\varepsilon r\,dr
<
\infty
$$

です。したがって特異点の近傍でもこの積分は有限です。
<!-- solution-end -->

#### VC8-A03 ゲージ自由度
- Level: A
- 目安時間: 18分

$$
A=(0,0,x^2+y^2),
\qquad
\chi=xz
$$

とし、

$$
A'=A+\nabla\chi
$$

とする。

1. $A'$ を求めよ。
2. $\nabla\times A$ と $\nabla\times A'$ を計算せよ。
3. 両者が一致する理由を一般式で説明せよ。

<!-- solution-start -->
### 詳細解答

1.

$$
\nabla\chi=(z,0,x)
$$

なので

$$
\boxed{
A'=(z,0,x^2+y^2+x)
}.
$$

2.

$$
\nabla\times A
=
(2y,-2x,0).
$$

一方

$$
\nabla\times A'
=
\left(
2y,\,
1-(2x+1),\,
0
\right)
=
(2y,-2x,0).
$$

従って一致します。

3. 一般に

$$
A'=A+\nabla\chi
$$

なら

$$
\nabla\times A'
=
\nabla\times A
+
\nabla\times\nabla\chi.
$$

[VC1 の「勾配の回転は 0」](../VC1/index.md#thm-vc1-curl-grad)から第二項は 0 なので

$$
\boxed{
\nabla\times A'=\nabla\times A
}.
$$
<!-- solution-end -->

#### VC8-A04 縦成分と横成分
- Level: A
- 目安時間: 20分

$$
\phi=xyz,
\qquad
A=(0,0,x^2y)
$$

とする。

$$
F_{\mathrm L}=-\nabla\phi,
\qquad
F_{\mathrm T}=\nabla\times A
$$

を求め、

$$
\nabla\times F_{\mathrm L}=0,
\qquad
\operatorname{div}F_{\mathrm T}=0
$$

を直接確認せよ。

<!-- solution-start -->
### 詳細解答

まず

$$
\nabla\phi=(yz,xz,xy)
$$

なので

$$
\boxed{
F_{\mathrm L}=(-yz,-xz,-xy)
}.
$$

次に

$$
A=(0,0,x^2y)
$$

だから

$$
F_{\mathrm T}
=
\left(
\partial_y(x^2y),
-\partial_x(x^2y),
0
\right)
=
\boxed{
(x^2,-2xy,0)
}.
$$

$F_{\mathrm L}$ の回転は

$$
\nabla\times F_{\mathrm L}
=
\left(
\partial_y(-xy)-\partial_z(-xz),\,
\partial_z(-yz)-\partial_x(-xy),\,
\partial_x(-xz)-\partial_y(-yz)
\right).
$$

各成分は

$$
(-x)-(-x)=0,
$$

$$
(-y)-(-y)=0,
$$

$$
(-z)-(-z)=0
$$

なので

$$
\boxed{
\nabla\times F_{\mathrm L}=0
}.
$$

また

$$
\operatorname{div}F_{\mathrm T}
=
\partial_x(x^2)+\partial_y(-2xy)
=
2x-2x
=
\boxed{0}.
$$
<!-- solution-end -->

#### VC8-B01 球対称源の中心ポテンシャル
- Level: B
- 目安時間: 25分

$$
\rho(y)
=
\begin{cases}
(1-|y|^2)^2,&|y|<1,\\
0,&|y|\ge1
\end{cases}
$$

とする。

1. Newton ポテンシャル
   $$
   \phi(x)=\frac1{4\pi}\int\frac{\rho(y)}{|x-y|}\,dy
   $$
   について $\phi(0)$ を求めよ。
2. 球対称性から $\nabla\phi(0)=0$ であることを説明せよ。
3. $\rho$ を一点へ集中させる極限で Newton 核が現れる直観を説明せよ。

<!-- solution-start -->
### 詳細解答

1. $x=0$ では

$$
\phi(0)
=
\frac1{4\pi}
\int_{|y|<1}
\frac{(1-|y|^2)^2}{|y|}\,dy.
$$

球座標から

$$
\phi(0)
=
\int_0^1
r(1-r^2)^2\,dr.
$$

$t=r^2$ と置けば $dt=2r\,dr$ なので

$$
\phi(0)
=
\frac12
\int_0^1(1-t)^2\,dt
=
\frac12\cdot\frac13
=
\boxed{\frac16}.
$$

2. $\rho$ は回転に対して不変です。従って $\phi$ も原点を中心とする球対称関数になり、$\phi(x)$ は $|x|$ だけに依存します。原点で特定の方向を選ぶことはできないため

$$
\boxed{
\nabla\phi(0)=0
}.
$$

滑らかな球対称関数 $g(|x|)$ について直接微分しても同じ結論です。

3. 源の総量を 1 に保ったまま支持半径を小さくすると、原点から離れた点では $|x-y|\approx|x|$ となり、

$$
\phi(x)
\approx
\frac1{4\pi|x|}
\int\rho(y)\,dy.
$$

総量が 1 なら右辺は Newton 核 $G(x)$ です。
<!-- solution-end -->

#### VC8-B02 Helmholtz 分解の証明を再構成する
- Level: B
- 目安時間: 35分

$F\in C_c^3(\mathbb R^3;\mathbb R^3)$ とし、

$$
C=NF
$$

を成分ごとの Newton ポテンシャルとする。

1. $-\Delta C=F$ を示せ。
2. $\operatorname{div}C=N(\operatorname{div}F)$ を、無限遠境界項に言及して示せ。
3. $\nabla\times C=N(\nabla\times F)$ を同様に示せ。
4. 以上から Helmholtz 分解を導け。

<!-- solution-start -->
### 詳細解答

1. 各成分

$$
C_i=N(F_i)
$$

に [Newton ポテンシャルの定理](#thm-vc8-newton-poisson) を適用すると

$$
-\Delta C_i=F_i.
$$

従って

$$
\boxed{
-\Delta C=F
}.
$$

2.

$$
\operatorname{div}C
=
\int
\nabla_xG(x-y)\cdot F(y)\,dy
$$

です。

$$
\nabla_xG(x-y)=-\nabla_yG(x-y)
$$

を使うと

$$
\operatorname{div}C
=
-\int
\nabla_yG(x-y)\cdot F(y)\,dy.
$$

$F$ はコンパクトな台を持つため、十分大きい球 $B_R$ では $\partial B_R$ 上で $F=0$ です。従って発散定理による部分積分の境界項

$$
\int_{\partial B_R}
G(x-y)F(y)\cdot n\,dS
$$

は 0 です。

よって

$$
\operatorname{div}C
=
\int
G(x-y)\operatorname{div}F(y)\,dy
=
\boxed{
N(\operatorname{div}F)
}.
$$

3. 回転も成分ごとに同じ部分積分を行います。$i$ 成分は

$$
[\nabla\times C]_i
=
\int
\varepsilon_{ijk}
\partial_{x_j}G(x-y)F_k(y)\,dy.
$$

$\partial_{x_j}G=-\partial_{y_j}G$ を使い、$y_j$ について部分積分します。境界項は $F=0$ により消え、

$$
[\nabla\times C]_i
=
\int
G(x-y)
\varepsilon_{ijk}\partial_{y_j}F_k(y)\,dy.
$$

従って

$$
\boxed{
\nabla\times C
=
N(\nabla\times F)
}.
$$

4.

$$
-\Delta C
=
-\nabla(\operatorname{div}C)
+
\nabla\times(\nabla\times C)
$$

なので、2・3 の結果を代入し

$$
F
=
-\nabla N(\operatorname{div}F)
+
\nabla\times N(\nabla\times F).
$$

すなわち

$$
\boxed{
F=-\nabla\phi+\nabla\times A
}
$$

です。
<!-- solution-end -->

#### VC8-B03 有界領域での調和成分
- Level: B
- 目安時間: 25分

単位球 $B_1(0)$ 上で

$$
F(x,y,z)=(-y,x,0)
$$

とし、定数ベクトル $c=(1,2,3)$ を加えた

$$
\widetilde F=F+c
$$

を考える。

1. $\operatorname{div}F$ と $\nabla\times F$ を求めよ。
2. $\widetilde F$ が同じ発散・回転を持つことを確認せよ。
3. なぜ発散と回転だけでは $F$ と $\widetilde F$ を区別できないのか説明せよ。
4. 全空間で「無限遠で 0」を課すと定数成分が排除されることを説明せよ。

<!-- solution-start -->
### 詳細解答

1.

$$
\operatorname{div}F
=
\partial_x(-y)+\partial_yx+\partial_z0
=
0.
$$

回転は

$$
\nabla\times F
=
(0,0,2).
$$

従って

$$
\boxed{
\operatorname{div}F=0,
\qquad
\nabla\times F=(0,0,2)
}.
$$

2. 定数ベクトル $c$ は

$$
\operatorname{div}c=0,
\qquad
\nabla\times c=0
$$

です。したがって線形性から

$$
\operatorname{div}\widetilde F
=
\operatorname{div}F,
$$

$$
\nabla\times\widetilde F
=
\nabla\times F.
$$

3. 差

$$
\widetilde F-F=c
$$

自身が発散 0・回転 0 だからです。この差は発散と回転のデータから見えない **調和成分**の最も簡単な例です。

4. 定数 $c\ne0$ は $|x|\to\infty$ でも 0 へ近づきません。従って全空間で

$$
F(x)\to0
$$

のような無限遠条件を課せば、非零の定数成分は許されません。境界条件・無限遠条件が一意性を固定する役割を持ちます。
<!-- solution-end -->

#### VC8-C01 渦度から速度を再構成する
- Level: C
- 目安時間: 45分

$u\in C_c^3(\mathbb R^3;\mathbb R^3)$ が

$$
\operatorname{div}u=0
$$

を満たすとし、

$$
\omega=\nabla\times u
$$

とする。

1. Helmholtz 分解からスカラーポテンシャルが 0 になることを示せ。
2.
   $$
   A(x)=\frac1{4\pi}\int\frac{\omega(y)}{|x-y|}\,dy
   $$
   とおくと $u=\nabla\times A$ となることを示せ。
3. $x$ 微分を積分内へ入れて
   $$
   u(x)
   =
   \frac1{4\pi}
   \int
   \frac{\omega(y)\times(x-y)}{|x-y|^3}\,dy
   $$
   を導け。
4. この導出で、コンパクトな台の仮定が使われた場所と、ベクトルポテンシャルのゲージ自由度が速度 $u$ を変えない理由を説明せよ。

<!-- solution-start -->
### 詳細解答

1. Helmholtz のスカラーポテンシャルは

$$
\phi
=
N(\operatorname{div}u).
$$

仮定 $\operatorname{div}u=0$ から

$$
\boxed{
\phi=0
}.
$$

2. [Helmholtz 分解](#thm-vc8-helmholtz)は

$$
u
=
-\nabla\phi
+
\nabla\times A.
$$

1 で $\phi=0$ なので

$$
\boxed{
u=\nabla\times A
}.
$$

3.

$$
A(x)
=
\frac1{4\pi}
\int
|x-y|^{-1}\omega(y)\,dy.
$$

$\omega(y)$ は $x$ に依存しないので

$$
\nabla_x\times A(x)
=
\frac1{4\pi}
\int
\nabla_x(|x-y|^{-1})
\times\omega(y)\,dy.
$$

ここで

$$
\nabla_x(|x-y|^{-1})
=
-\frac{x-y}{|x-y|^3}.
$$

従って

$$
u(x)
=
-\frac1{4\pi}
\int
\frac{x-y}{|x-y|^3}
\times\omega(y)\,dy.
$$

外積の反交換性

$$
a\times b=-b\times a
$$

を使えば

$$
\boxed{
u(x)
=
\frac1{4\pi}
\int
\frac{\omega(y)\times(x-y)}{|x-y|^3}\,dy
}.
$$

4. コンパクトな台は、Helmholtz 分解の証明で Newton 核との部分積分を行ったとき、十分大きい球面上で $u=0$ として境界項を消すために使われました。また積分の収束も保証します。

ゲージ変換

$$
A\mapsto A+\nabla\chi
$$

に対して

$$
\nabla\times(A+\nabla\chi)
=
\nabla\times A
+
\nabla\times\nabla\chi.
$$

第二項は 0 なので速度 $u$ は変わりません。従って

$$
\boxed{
\text{ベクトルポテンシャルは一意でなくても、回転として得る }u\text{ は不変}
}
$$

です。
<!-- solution-end -->

---

## 13. まとめ

本章で得た構造は

$$
\boxed{
F
=
-\nabla\phi
+
\nabla\times A
}
$$

です。

ただし式だけを覚えるのではなく、次の対応を追えることが重要です。

- $\operatorname{div}F$ を Newton 核で広げると $\phi$ が得られる。
- $\nabla\times F$ を Newton 核で広げると $A$ が得られる。
- Newton 核は $-\Delta$ の三次元全空間基本解として働く。
- コンパクトな台は、積分の収束と無限遠境界項の消失を保証する。
- $A$ にはゲージ自由度があり、Helmholtz の積分表示は Coulomb ゲージを選ぶ。
- 有界領域では発散・回転だけでなく境界条件と調和成分を管理する必要がある。
- 無発散場では渦度から Biot--Savart 型公式で場を再構成できる。

これで VC9 の保存則・非圧縮流・Maxwell 方程式を、単なる公式の寄せ集めではなく「発散・回転・積分定理・ポテンシャル」という共通構造から読める準備が整いました。
