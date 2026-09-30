# PDE9 多次元波動方程式の明示公式と伝播

<!-- definition-example-audit: strict -->

一次元では d'Alembert 公式が波を左右へ運びました。多次元では「左右」の代わりに**球面上での平均**が主役になります。

本章の中心は

$$
u_{tt}-c^2\Delta u=0
$$

を三次元と二次元で明示的に解き、有限伝播速度に加えて

- 三次元では球面上だけが現在に効く。
- 二次元では球の内部全体が尾を引いて効く。

という次元依存を理解することです。

球座標での Laplacian の公式は [VC6](../VC6/index.md#prop-vc6-spherical) で学んだ結果を使います。

## 1. 球面上で値を平均する

一次元では、点 $x$ から距離 $ct$ だけ離れた左右の点を d'Alembert 公式で参照しました。三次元では同じ距離だけ離れた点が一つの球面を作ります。そこで、半径 $r$ の球面上にある値を一つの量へまとめ、半径方向の変化として追えるようにします。

<a id="def-pde9-spherical-mean"></a>
<!-- formal-statement-start -->
> **定義（球面平均）**  
> $h:\mathbb R^3\to\mathbb R$ に対し、中心 $x$、半径 $r>0$ の球面平均を

$$
M_rh(x)
:=
\frac1{4\pi r^2}
\int_{|y-x|=r}h(y)\,dS_y
$$

> と定める。
<!-- formal-statement-end -->

<!-- definition-example-start: def-pde9-spherical-mean -->
**定義の確認**：以下で定義の条件を直接確認します。

### 具体例：一次関数の球面平均

$h(y)=a+b\cdot y$ なら、球面上の $y-x$ の平均が0なので

$$
M_rh(x)=a+b\cdot x=h(x).
$$

後で現れる平均値性質の最小例にもなっています。
<!-- definition-example-end -->

## 2. 球面平均は半径方向の波動方程式を満たす

球面平均を導入しただけでは、元の Laplacian と半径 $r$ の微分がどう結び付くかはまだ分かりません。三次元の PDE を一次元の半径方向へ落とすには、$x$ に関する Laplacian を「球面平均の $r$ 微分」へ変える関係式が必要です。発散定理を使うと、その関係が $rM_rh$ という組合せに現れます。

<a id="lem-pde9-epd"></a>
<!-- formal-statement-start -->
> **補題（球面平均の Euler--Poisson--Darboux 関係）**  
> $h\in C^2(\mathbb R^3)$ とし $m(r,x)=M_rh(x)$ とする。このとき

$$
\frac{\partial^2}{\partial r^2}(r m(r,x))
=
r M_r(\Delta h)(x).
$$
<!-- formal-statement-end -->

### 証明の見取り図

球面平均を単位球面上へ引き戻し、$r$ 微分を取ります。[Gauss--Ostrogradsky の発散定理](../VC4/index.md#thm-vc4-gauss-divergence)で法線微分の球面積分を体積積分へ変え、もう一度微分します。

<!-- proof-start -->
### 証明

$\omega\in S^2$ を使うと

$$
m(r,x)
=
\frac1{4\pi}
\int_{S^2}h(x+r\omega)dS_\omega.
$$

従って

$$
\partial_rm
=
\frac1{4\pi}
\int_{S^2}\nabla h(x+r\omega)\cdot\omega\,dS_\omega.
$$

半径 $r$ の球面へ戻すと

$$
4\pi r^2\partial_rm
=
\int_{|y-x|=r}\partial_n h(y)dS_y.
$$

[Gauss--Ostrogradsky の発散定理](../VC4/index.md#thm-vc4-gauss-divergence)より

$$
4\pi r^2m_r
=
\int_{|y-x|<r}\Delta h(y)\,dy.
$$

ここで両辺を $r$ で微分します。右辺の微分を飛ばさないため、中心 $x$ の球座標で書くと

$$
\int_{|y-x|<r}\Delta h(y)\,dy
=
\int_0^r
\rho^2
\left[
\int_{S^2}
\Delta h(x+\rho\omega)\,dS_\omega
\right]d\rho.
$$

角括弧内は $\rho$ の連続関数なので、微積分学の基本定理を上端 $r$ に適用して

$$
\begin{aligned}
\frac d{dr}
\int_{|y-x|<r}\Delta h(y)\,dy
&=
r^2
\int_{S^2}
\Delta h(x+r\omega)\,dS_\omega\\
&=
\int_{|y-x|=r}\Delta h(y)\,dS_y.
\end{aligned}
$$

球面平均の定義を使えば

$$
\int_{|y-x|=r}\Delta h(y)\,dS_y
=
4\pi r^2M_r(\Delta h)(x).
$$

したがって

$$
4\pi\,\partial_r(r^2m_r)
=
4\pi r^2M_r(\Delta h),
$$

すなわち

$$
\partial_r(r^2m_r)
=
r^2M_r(\Delta h).
$$

一方

$$
\partial_r^2(rm)
=
2m_r+rm_{rr}
=
\frac1r\partial_r(r^2m_r),
$$

なので

$$
\partial_r^2(rm)
=
rM_r(\Delta h).
$$
<!-- proof-end -->

## 3. 三次元の明示解公式

前節で $q(r,x):=rM_rh(x)$ と置けば、半径 $r$ に関する二階微分が $x$ に関する Laplacian と同じ形になることが分かりました。そこで $r=ct$ と選べば、球面平均から三次元波動方程式の解を組み立てられるはずです。初期変位 $f$ と初速度 $g$ の二つをどの組合せで入れればよいかを、初期条件まで含めて確かめます。

<a id="thm-pde9-kirchhoff"></a>
<!-- formal-statement-start -->
> **定理（Kirchhoff 公式）**  
> $f\in C^3(\mathbb R^3)$, $g\in C^2(\mathbb R^3)$ とする。三次元波動方程式

$$
u_{tt}-c^2\Delta u=0,
\qquad
u(0,x)=f(x),
\qquad
u_t(0,x)=g(x)
$$

> に対し、次式は $t\ge0$ の古典解を与える。

$$
u(t,x)
=
\frac{\partial}{\partial t}
\left[tM_{ct}f(x)\right]
+
tM_{ct}g(x).
$$
<!-- formal-statement-end -->

### 証明の見取り図

球面平均補題により $rM_rh$ は半径変数について一次元波動方程式の空間部分と同じ二階微分を持ちます。$r=ct$ と置けば PDE4 の一次元構造へ帰着します。

<!-- proof-start -->
### 証明

まず球面平均を

$$
M_0h(x):=h(x)
$$

と定めて $r=0$ まで延長します。単位球面表示

$$
M_rh(x)
=
\frac1{4\pi}
\int_{S^2}h(x+r\omega)\,dS_\omega
$$

から、$h\in C^1$ なら

$$
\left.\partial_rM_rh(x)\right|_{r=0}
=
\frac1{4\pi}
\int_{S^2}\nabla h(x)\cdot\omega\,dS_\omega
=
0
$$

です。最後の等号では $\omega$ と $-\omega$ の対称性を使いました。

次に

$$
F(t,x)=tM_{ct}f(x),
\qquad
G(t,x)=tM_{ct}g(x)
$$

と置きます。まず $f$ 側を詳しく見ます。$q_f(r,x)=rM_rf(x)$ と書くと、前節の関係式から

$$
\partial_{rr}q_f(r,x)
=
rM_r(\Delta f)(x).
$$

一方、球面平均を単位球面上で書けば

$$
q_f(r,x)
=
\frac r{4\pi}
\int_{S^2}
f(x+r\omega)\,dS_\omega.
$$

$x$ について Laplacian を取り、積分と微分を交換すると

$$
\begin{aligned}
\Delta_xq_f(r,x)
&=
\frac r{4\pi}
\int_{S^2}
\Delta f(x+r\omega)\,dS_\omega\\
&=
rM_r(\Delta f)(x).
\end{aligned}
$$

従って

$$
\partial_{rr}q_f
=
\Delta_xq_f.
$$

ここで

$$
F(t,x)
=
\frac1c q_f(ct,x)
$$

です。$t$ 微分を一回ずつ行うと

$$
F_t(t,x)
=
\partial_rq_f(ct,x),
$$

$$
F_{tt}(t,x)
=
c\,\partial_{rr}q_f(ct,x).
$$

また

$$
\Delta_xF(t,x)
=
\frac1c\Delta_xq_f(ct,x)
$$

なので

$$
F_{tt}
=
c\,\partial_{rr}q_f
=
c\,\Delta_xq_f
=
c^2\Delta_xF.
$$

$g$ についても $q_g(r,x)=rM_rg(x)$ と置けば同じ関係
$\partial_{rr}q_g=\Delta_xq_g$ が成り立ち、

$$
G(t,x)=\frac1c q_g(ct,x)
$$

から

$$
G_{tt}=c^2\Delta_xG
$$

を得ます。

さらに波動作用素

$$
L:=\partial_{tt}-c^2\Delta_x
$$

は $t$ 微分と可換なので、$LF=0$ から

$$
L(F_t)
=
\partial_t(LF)
=
0.
$$

従って

$$
u=F_t+G
$$

も $Lu=0$ を満たします。

初期条件を一つずつ確認します。積の微分から

$$
F_t(t,x)
=
M_{ct}f(x)
+
ct\,\partial_rM_rf(x)\big|_{r=ct}.
$$

したがって $t\downarrow0$ で

$$
F_t(0,x)=f(x).
$$

また $G(0,x)=0$ なので

$$
u(0,x)=f(x).
$$

さらに $F_t=M_{ct}f+ct\,\partial_rM_rf|_{r=ct}$ をもう一度微分すると

$$
F_{tt}(0,x)
=
2c\,\partial_rM_rf(x)\big|_{r=0}
=
0.
$$

一方、

$$
G_t(t,x)
=
M_{ct}g(x)
+
ct\,\partial_rM_rg(x)\big|_{r=ct},
$$

なので

$$
G_t(0,x)=g(x).
$$

従って

$$
u_t(0,x)
=
F_{tt}(0,x)+G_t(0,x)
=
g(x).
$$

これで PDE と二つの初期条件を全て検証しました。
<!-- proof-end -->

同じ公式を球面積分で書けば

$$
u(t,x)
=
\frac{\partial}{\partial t}
\left[
\frac1{4\pi c^2t}
\int_{|y-x|=ct}f(y)dS_y
\right]
+
\frac1{4\pi c^2t}
\int_{|y-x|=ct}g(y)dS_y.
$$

## 4. 三次元の有限伝播と Huygens 原理

Kirchhoff 公式は、時刻 $t$ の点 $x$ が初期時刻のどこを参照するかもそのまま示しています。積分領域が球面 $|y-x|=ct$ に限られているので、まず「半径 $ct$ より外からは情報が届かない」という有限伝播が見えます。さらに三次元では、球の内部さえ直接は参照しないという、より強い性質が現れます。

<a id="cor-pde9-huygens"></a>
<!-- formal-statement-start -->
> **系（三次元 Huygens 原理）**  
> Kirchhoff 公式では $(t,x)$ の値は、初期時刻の球面

$$
|y-x|=ct
$$

> 上にある $f$ とその外向き法線方向微分 $\partial_n f$、および $g$ によって決まる。特に $f,g$ がこの球面のある近傍で 0 なら

$$
u(t,x)=0
$$

> であり、球面から正の距離だけ離れた球内部の初期擾乱は時刻 $t$ の $(t,x)$ へ直接寄与しない。
<!-- formal-statement-end -->

第1項には $t$ 微分が付いているので、そこも確認します。単位球面表示を使うと

$$
tM_{ct}f(x)
=
\frac t{4\pi}
\int_{S^2}f(x+ct\omega)\,dS_\omega.
$$

$t$ で微分すれば

$$
\frac{\partial}{\partial t}
[tM_{ct}f(x)]
=
\frac1{4\pi}
\int_{S^2}f(x+ct\omega)\,dS_\omega
+
\frac{ct}{4\pi}
\int_{S^2}
\nabla f(x+ct\omega)\cdot\omega\,dS_\omega.
$$

右辺に現れる点は全て $x+ct\omega$、すなわち半径 $ct$ の球面上です。第2積分の $\nabla f\cdot\omega$ は、その球面の外向き法線方向微分です。$g$ 項も $tM_{ct}g$ なので同じ球面しか参照しません。したがって球面近傍で $f,g$ が消えていれば、$f$ の法線微分も含めて全項が0になります。

これは一次元の d'Alembert 公式とも二次元公式とも異なる、三次元波動の鋭い伝播です。

## 5. 二次元は三次元から降ろせる

二次元データ $f(x_1,x_2)$ を第三変数 $x_3$ に依存しない三次元データとみなします。三次元球面を $x_3$ 方向へ積分すると、二次元円板内に重み

$$
\frac1{\sqrt{c^2t^2-|y-x|^2}}
$$

が現れます。

<a id="thm-pde9-poisson-wave"></a>
<!-- formal-statement-start -->
> **定理（二次元波動方程式の Poisson 公式）**  
> $f\in C^3(\mathbb R^2)$、$g\in C^2(\mathbb R^2)$ とする。二次元波動方程式の初期値を $f,g$ とすると

$$
u(t,x)
=
\frac{\partial}{\partial t}
\left[
\frac1{2\pi c}
\int_{|y-x|<ct}
\frac{f(y)}
{\sqrt{c^2t^2-|y-x|^2}}
dy
\right]
+
\frac1{2\pi c}
\int_{|y-x|<ct}
\frac{g(y)}
{\sqrt{c^2t^2-|y-x|^2}}
dy.
$$
<!-- formal-statement-end -->

### 証明の見取り図

ここで使う **次元降下法（method of descent）** は、高次元の解を一つの座標に依存しないデータへ制限して低次元公式を得る方法です。Kirchhoff 公式を $x_3$ に依存しないデータへ適用し、球面の上半球・下半球を円板へ射影します。二枚分の面素が上の平方根重みになります。

<!-- proof-start -->
### 証明

半径 $R=ct$ の球面を

$$
(y,z),
\qquad
z=\pm\sqrt{R^2-|y-x|^2}
$$

と書きます。上半球で

$$
z(y)
=
\sqrt{R^2-|y-x|^2}
$$

と置くと

$$
\nabla_y z
=
-\frac{y-x}{\sqrt{R^2-|y-x|^2}}.
$$

したがってグラフ面の面素は

$$
\begin{aligned}
dS
&=
\sqrt{1+|\nabla_yz|^2}\,dy\\
&=
\sqrt{
1+
\frac{|y-x|^2}{R^2-|y-x|^2}
}\,dy\\
&=
\frac{R}{\sqrt{R^2-|y-x|^2}}\,dy.
\end{aligned}
$$

下半球でも同じ面素になります。

上半球・下半球で二倍されるため、$x_3$ に依存しない関数 $h(y)$ に対し

$$
\int_{S_R(x,0)}h(y)dS
=
2R
\int_{|y-x|<R}
\frac{h(y)}
{\sqrt{R^2-|y-x|^2}}dy.
$$

これを Kirchhoff 公式の球面積分へ代入し $R=ct$ とすれば係数は

$$
\frac{2ct}{4\pi c^2t}
=
\frac1{2\pi c}
$$

となり、主張の式を得ます。

最後に「三次元公式を変形しただけで、なぜ二次元 PDE の解になっているのか」を確認します。二次元の $f,g$ を $x_3$ に依存しない三次元関数として延長すると、上の球面積分は鉛直方向の平行移動で変わらないため、Kirchhoff 公式で作った三次元解 $U(t,x_1,x_2,x_3)$ も $x_3$ に依存しません。従って

$$
U_{x_3x_3}=0
$$

であり、

$$
U_{tt}-c^2(U_{x_1x_1}+U_{x_2x_2})=0.
$$

$x_3=0$ に制限した $u(t,x_1,x_2)=U(t,x_1,x_2,0)$ は、同じ初期値 $f,g$ を持つ二次元波動方程式の古典解です。
<!-- proof-end -->

## 6. 二次元では波の尾が残る

Poisson 公式は円周だけでなく

$$
|y-x|<ct
$$

の円板内部全体を積分します。したがって初期擾乱の波面が通過した後も、その内部の寄与が残り得ます。三次元 Huygens 原理との違いです。

## 演習

### Level A

#### PDE9-A01 球面平均
- Level: A

$h(y)=|y|^2$ の中心0、半径 $r$ の球面平均を求めよ。

<!-- solution-start -->
##### 詳細解答

中心0、半径 $r$ の球面は

$$
|y|=r
$$

で与えられます。この球面上では

$$
h(y)=|y|^2=r^2
$$

が点 $y$ によらず一定です。

球面平均の定義から

$$
\begin{aligned}
M_rh(0)
&=
\frac1{4\pi r^2}
\int_{|y|=r}|y|^2\,dS_y\\
&=
\frac1{4\pi r^2}
\int_{|y|=r}r^2\,dS_y.
\end{aligned}
$$

半径 $r$ の球面積は $4\pi r^2$ なので

$$
M_rh(0)
=
\frac{r^2}{4\pi r^2}
(4\pi r^2)
=
\boxed{r^2}.
$$

「定数関数の平均はその定数」という最も基本的な平均計算になっています。
<!-- solution-end -->

#### PDE9-A02 定数初速度
- Level: A

$f=0$, $g=1$ を Kirchhoff 公式へ入れよ。

<!-- solution-start -->
##### 詳細解答

Kirchhoff 公式は

$$
u(t,x)
=
\frac{\partial}{\partial t}
[tM_{ct}f(x)]
+
tM_{ct}g(x)
$$

です。ここで $f=0$ なので第一項は0です。

また $g\equiv1$ は定数関数なので、どの球面でも平均は

$$
M_{ct}g(x)=1.
$$

従って

$$
\boxed{u(t,x)=t}.
$$

PDE を直接確認すると

$$
u_{tt}=0,
\qquad
\Delta u=0,
$$

なので $u_{tt}-c^2\Delta u=0$ です。初期条件も

$$
u(0,x)=0,
\qquad
u_t(0,x)=1=g(x)
$$

となります。
<!-- solution-end -->

#### PDE9-A03 球面近傍から離れた初期擾乱
- Level: A

三次元で初期変位 $f$ と初速度 $g$ が、球面 $|y-x|=ct$ のある近傍でともに0とする。このとき時刻 $t$ の $u(t,x)$ にそれらが寄与しない理由を Kirchhoff 公式から説明せよ。

<!-- solution-start -->
##### 詳細解答

Kirchhoff 公式は

$$
u(t,x)
=
\frac{\partial}{\partial t}[tM_{ct}f(x)]
+
tM_{ct}g(x)
$$

です。$g$ 項は半径 $ct$ の球面上の $g$ の平均なので、仮定から

$$
M_{ct}g(x)=0.
$$

$f$ 項は本文で計算したように

$$
\frac{\partial}{\partial t}[tM_{ct}f(x)]
=
\frac1{4\pi}
\int_{S^2}f(x+ct\omega)\,dS_\omega
+
\frac{ct}{4\pi}
\int_{S^2}
\nabla f(x+ct\omega)\cdot\omega\,dS_\omega.
$$

$f$ が球面の**近傍**で0なら、球面上で $f=0$ であるだけでなく

$$
\nabla f=0
$$

でもあります。したがって上の二つの積分も0です。

よって

$$
\boxed{u(t,x)=0}.
$$

「球面上で $f=0$」だけでは法線微分まで0とは限らないため、近傍で0という仮定が必要です。
<!-- solution-end -->

#### PDE9-A04 二次元の定数初速度
- Level: A

Poisson 公式で $f=0,g=1$ とし $u=t$ を確認せよ。

<!-- solution-start -->
##### 詳細解答

$f=0$ なので Poisson 公式の初期変位項は消えます。$g=1$ を代入すると

$$
u(t,x)
=
\frac1{2\pi c}
\int_{|y-x|<ct}
\frac{1}
{\sqrt{c^2t^2-|y-x|^2}}
\,dy.
$$

中心を $x$ に取った極座標

$$
y-x=(r\cos\theta,r\sin\theta),
\qquad
dy=r\,dr\,d\theta
$$

を使うと

$$
\begin{aligned}
u(t,x)
&=
\frac1{2\pi c}
\int_0^{2\pi}
\int_0^{ct}
\frac{r}
{\sqrt{c^2t^2-r^2}}
\,dr\,d\theta.
\end{aligned}
$$

内側では

$$
q=c^2t^2-r^2,
\qquad
dq=-2r\,dr
$$

と置けば

$$
\int_0^{ct}
\frac{r\,dr}{\sqrt{c^2t^2-r^2}}
=
\left[
-\sqrt{c^2t^2-r^2}
\right]_{0}^{ct}
=
ct.
$$

したがって二重積分は

$$
2\pi ct
$$

となり、

$$
u(t,x)
=
\frac{1}{2\pi c}(2\pi ct)
=
\boxed{t}.
$$

三次元の定数初速度の場合と同じ解になりますが、二次元では円板内部全体を積分して同じ結果が出ている点が異なります。
<!-- solution-end -->

### Level B

#### PDE9-B01 放射対称三次元波
- Level: B

三次元で $u(t,x)=U(t,r)$, $r=|x|$ とする。$v(t,r)=rU(t,r)$ が一次元波動方程式を満たすことを示せ。

<!-- solution-start -->
##### 詳細解答

放射対称なので [VC6 の球座標 Laplacian](../VC6/index.md#prop-vc6-spherical)から、$r>0$ で

$$
\Delta U
=
U_{rr}
+
\frac2rU_r.
$$

ここで

$$
v(t,r)=rU(t,r)
$$

と置きます。$r$ 微分を一回行うと

$$
v_r
=
U+rU_r,
$$

さらにもう一回微分して

$$
v_{rr}
=
U_r+U_r+rU_{rr}
=
2U_r+rU_{rr}.
$$

一方、

$$
r\Delta U
=
rU_{rr}+2U_r,
$$

なので

$$
v_{rr}
=
r\Delta U.
$$

時間については $r$ は定数なので

$$
v_{tt}
=
rU_{tt}.
$$

三次元波動方程式

$$
U_{tt}=c^2\Delta U
$$

の両辺に $r$ を掛けると

$$
rU_{tt}
=
c^2r\Delta U.
$$

上の二つの恒等式を代入して

$$
\boxed{
v_{tt}=c^2v_{rr}
}.
$$

したがって三次元の放射対称波は、$v=rU$ という重みを付けることで一次元波動方程式へ帰着します。
<!-- solution-end -->

#### PDE9-B02 有限伝播
- Level: B

[Kirchhoff 公式](#thm-pde9-kirchhoff)から、初期データが $B_R(0)$ に台を持つとき $u(t,x)=0$ となる十分条件を求めよ。

<!-- solution-start -->
##### 詳細解答

初期データの台が $B_R(0)$ に含まれるとは、$|y|>R$ の領域で $f$ と $g$ が0であることを意味します。Kirchhoff 公式が参照する球面

$$
S_{ct}(x)
=
\{y:|y-x|=ct\}
$$

がこの台と交わらなければ、$g$ の球面平均は0です。また $f$ も球面の近傍で0になるので、$f$ とその法線方向微分の寄与も0になります。

十分条件として

$$
|x|>R+ct
$$

を示します。$|y-x|=ct$ を満たす任意の $y$ に対し、逆三角不等式から

$$
|y|
\ge
|x|-|y-x|
=
|x|-ct
>
R.
$$

従って球面 $S_{ct}(x)$ 全体が $B_R(0)$ の外にあります。よって Kirchhoff 公式の全ての項が0となり、

$$
\boxed{
|x|>R+ct
\quad\Longrightarrow\quad
u(t,x)=0
}.
$$

これは初期擾乱が速度 $c$ より速く外側へ伝わらないことを表します。
<!-- solution-end -->

#### PDE9-B03 Huygens と尾
- Level: B

三次元と二次元で、波面通過後の応答が異なる理由を積分領域から説明せよ。

<!-- solution-start -->
##### 詳細解答

三次元の Kirchhoff 公式では、時刻 $(t,x)$ の値は半径 $ct$ の球面上の

$$
f,\qquad
\partial_nf,\qquad
g
$$

から作られます。したがって、初期擾乱の台がこの球面から離れれば、その擾乱はその時刻の $(t,x)$ へ直接寄与しません。これが三次元の鋭い Huygens 型の伝播です。

一方、二次元の Poisson 公式には

$$
\int_{|y-x|<ct}
\frac{g(y)}
{\sqrt{c^2t^2-|y-x|^2}}
\,dy
$$

のように、円板

$$
|y-x|<ct
$$

の**内部全体**が現れます。したがって波面 $|y-x|=ct$ が初期擾乱の位置を通過した後でも、その擾乱が円板内部に残っている間は積分へ入り続けます。

つまり

$$
\boxed{
\text{三次元：球面上の寄与}
\qquad
\text{二次元：円板内部全体の寄与}
}
$$

という積分領域の違いが、尾の有無を生みます。
<!-- solution-end -->

### Level C

#### PDE9-C01 次元による伝播構造
- Level: C

一次元 d'Alembert、二次元 Poisson、三次元 Kirchhoff の三公式について、時刻 $(t,x)$ が参照する初期データの集合を比較し、有限伝播速度と Huygens 原理を整理せよ。

<!-- solution-start -->
##### 詳細解答

まず各公式が参照する初期時刻の集合を分けます。

**一次元**の d'Alembert 公式は

$$
u(t,x)
=
\frac{f(x-ct)+f(x+ct)}2
+
\frac1{2c}
\int_{x-ct}^{x+ct}g(s)\,ds
$$

です。初期変位 $f$ は二点

$$
x-ct,\qquad x+ct
$$

だけを参照しますが、初速度 $g$ は区間全体

$$
[x-ct,x+ct]
$$

を参照します。

**二次元**の Poisson 公式では、$f$ 項・$g$ 項とも基本的に円板

$$
|y-x|<ct
$$

上の重み付き積分から作られます。したがって波面より内側のデータも寄与します。

**三次元**の Kirchhoff 公式では、$g$ は球面

$$
|y-x|=ct
$$

上で平均され、$f$ 項を微分した後も球面上の $f$ と法線方向微分 $\partial_nf$ だけが現れます。

以上から、三つの次元すべてで参照領域は距離 $ct$ を超えません。したがって

$$
\boxed{
\text{情報の伝播速度は }c\text{ を超えない}
}
$$

という有限伝播速度は共通です。

一方、波面が通過した後の振る舞いは異なります。

- 一次元では初速度項が区間積分なので内部の寄与が残る。
- 二次元では円板内部全体を積分するので尾が残る。
- 三次元では球面上の $f,\partial_nf,g$ だけを参照するため、球面から離れた内部擾乱は直接寄与しない。

従って、この章でいう鋭い Huygens 原理は三次元 Kirchhoff 公式に現れます。
<!-- solution-end -->

## 7. 章末チェック

- 球面平均と Euler--Poisson--Darboux 関係を導ける。
- Kirchhoff 公式を検証できる。
- 三次元 Huygens 原理を積分領域から説明できる。
- 次元降下法から二次元 Poisson 公式を導ける。
- 二次元の尾と三次元の鋭い伝播を区別できる。
