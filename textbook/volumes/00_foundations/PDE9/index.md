# PDE9 多次元波動方程式・Kirchhoff 公式・Huygens 原理

<!-- definition-example-audit: strict -->

一次元では d'Alembert 公式が波を左右へ運びました。多次元では「左右」の代わりに**球面平均**が主役になります。

本章の中心は

$$
u_{tt}-c^2\Delta u=0
$$

を三次元と二次元で明示的に解き、有限伝播速度に加えて

- 三次元では球面上だけが現在に効く。
- 二次元では球の内部全体が尾を引いて効く。

という次元依存を理解することです。

球座標の微分公式は [VC6](../VC6/index.md#prop-vc6-spherical) を正本として使います。

## 1. 球面平均

<a id="def-pde9-spherical-mean"></a>
<!-- formal-statement-start -->
> **定義（球面平均）**  
> $h:\mathbb R^3\to\mathbb R$ に対し、中心 $x$、半径 $r>0$ の球面平均を
>
> $$
> M_rh(x)
> :=
> \frac1{4\pi r^2}
> \int_{|y-x|=r}h(y)\,dS_y
> $$
>
> と定める。
<!-- formal-statement-end -->

<!-- definition-example-start: def-pde9-spherical-mean -->
### 具体例：一次関数の球面平均

$h(y)=a+b\cdot y$ なら、球面上の $y-x$ の平均が0なので

$$
M_rh(x)=a+b\cdot x=h(x).
$$

調和関数の平均値性質の最小例にもなっています。
<!-- definition-example-end -->

## 2. 球面平均は半径方向の波動方程式を満たす

<a id="lem-pde9-epd"></a>
<!-- formal-statement-start -->
> **補題（球面平均の Euler--Poisson--Darboux 関係）**  
> $h\in C^2(\mathbb R^3)$ とし $m(r,x)=M_rh(x)$ とする。このとき
>
> $$
> \frac{\partial^2}{\partial r^2}(r m(r,x))
> =
> r M_r(\Delta h)(x).
> $$
<!-- formal-statement-end -->

### 証明の見取り図

球面平均を単位球面上へ引き戻し、$r$ 微分を取ります。発散定理で法線微分の球面積分を体積積分へ変え、もう一度微分します。

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
\int_{S^2}\nabla h(x+r\omega)\cdot\omega,dS_\omega.
$$

半径 $r$ の球面へ戻すと

$$
4\pi r^2\partial_rm
=
\int_{|y-x|=r}\partial_n h(y)dS_y.
$$

発散定理より右辺は

$$
\int_{|y-x|<r}\Delta h(y)dy.
$$

従って

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

## 3. 三次元 Kirchhoff 公式

<a id="thm-pde9-kirchhoff"></a>
<!-- formal-statement-start -->
> **定理（Kirchhoff 公式）**  
> $f\in C^3(\mathbb R^3)$, $g\in C^2(\mathbb R^3)$ が十分な減衰を持つとする。三次元波動方程式
>
> $$
> u_{tt}-c^2\Delta u=0,
> \qquad
> u(0,x)=f(x),
> \qquad
> u_t(0,x)=g(x)
> $$
>
> の古典解は
>
> $$
> u(t,x)
> =
> \frac{\partial}{\partial t}
> \left[tM_{ct}f(x)\right]
> +
> tM_{ct}g(x)
> $$
>
> で与えられる。
<!-- formal-statement-end -->

### 証明の見取り図

球面平均補題により $rM_rh$ は半径変数について一次元波動方程式の空間部分と同じ二階微分を持ちます。$r=ct$ と置けば PDE4 の一次元構造へ帰着します。

<!-- proof-start -->
### 証明

$F(t,x)=tM_{ct}f(x)$ と置きます。$r=ct$ なので補題から

$$
F_{tt}
=
c^2tM_{ct}(\Delta f)
=
c^2\Delta_xF.
$$

同様に $G(t,x)=tM_{ct}g(x)$ も $G_{tt}=c^2\Delta G$ を満たします。従って $F_t+G$ も波動方程式を満たします。

$t\downarrow0$ で $M_{ct}f(x)\to f(x)$ なので

$$
F_t(0,x)=f(x).
$$

また $G(0,x)=0$。よって $u(0)=f$。

さらに球面平均は $r$ の偶関数として0近傍へ延長でき、$\partial_rM_rh|_{r=0}=0$ です。従って $F_{tt}(0)=0$、$G_t(0)=g$ なので $u_t(0)=g$ です。
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

<a id="cor-pde9-huygens"></a>
<!-- formal-statement-start -->
> **系（三次元 Huygens 原理）**  
> Kirchhoff 公式では $(t,x)$ の値は、初期時刻の球面
>
> $$
> |y-x|=ct
> $$
>
> 上のデータだけで決まり、球の内部の初期データは直接寄与しない。
<!-- formal-statement-end -->

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
> 二次元波動方程式の初期値 $f,g$ が十分滑らかなら
>
> $$
> u(t,x)
> =
> \frac{\partial}{\partial t}
> \left[
> \frac1{2\pi c}
> \int_{|y-x|<ct}
> \frac{f(y)}
> {\sqrt{c^2t^2-|y-x|^2}}
> dy
> \right]
> +
> \frac1{2\pi c}
> \int_{|y-x|<ct}
> \frac{g(y)}
> {\sqrt{c^2t^2-|y-x|^2}}
> dy.
> $$
<!-- formal-statement-end -->

### 証明の見取り図

Kirchhoff 公式を $x_3$ に依存しないデータへ適用し、球面の上半球・下半球を円板へ射影します。二枚分の面素が上の平方根重みになります。

<!-- proof-start -->
### 証明

半径 $R=ct$ の球面を

$$
(y,z),
\qquad
z=\pm\sqrt{R^2-|y-x|^2}
$$

と書きます。グラフ面の面素は

$$
dS
=
\frac{R}{\sqrt{R^2-|y-x|^2}}dy.
$$

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
球面上では $|y|^2=r^2$ が一定なので $M_rh(0)=r^2$ です。
<!-- solution-end -->

#### PDE9-A02 定数初速度
- Level: A

$f=0$, $g=1$ を Kirchhoff 公式へ入れよ。

<!-- solution-start -->
##### 詳細解答
$M_{ct}1=1$ なので $u=t$。実際 $u_{tt}=0=\Delta u$, $u_t(0)=1$ です。
<!-- solution-end -->

#### PDE9-A03 球面だけを見る
- Level: A

三次元で初期データが球 $|y-x|<ct$ の内部だけにあり、球面上では0なら、その初期データが時刻 $t$ の $u(t,x)$ に直接寄与しない理由を述べよ。

<!-- solution-start -->
##### 詳細解答
Kirchhoff 公式の積分領域は $|y-x|=ct$ の球面だけだからです。
<!-- solution-end -->

#### PDE9-A04 二次元の定数初速度
- Level: A

Poisson 公式で $f=0,g=1$ とし $u=t$ を確認せよ。

<!-- solution-start -->
##### 詳細解答
極座標で
$$
\int_{|y-x|<ct}\frac{dy}{\sqrt{c^2t^2-|y-x|^2}}
=
2\pi\int_0^{ct}\frac{rdr}{\sqrt{c^2t^2-r^2}}
=
2\pi ct.
$$
係数 $1/(2\pi c)$ を掛けて $u=t$ です。
<!-- solution-end -->

### Level B

#### PDE9-B01 放射対称三次元波
- Level: B

三次元で $u(t,x)=U(t,r)$, $r=|x|$ とする。$v(t,r)=rU(t,r)$ が一次元波動方程式を満たすことを示せ。

<!-- solution-start -->
##### 詳細解答
VC6 の球座標 Laplacian から
$$
\Delta U=U_{rr}+\frac2rU_r.
$$
$v=rU$ とすると $v_{rr}=2U_r+rU_{rr}=r\Delta U$、$v_{tt}=rU_{tt}$。従って $U_{tt}=c^2\Delta U$ は $v_{tt}=c^2v_{rr}$ になります。
<!-- solution-end -->

#### PDE9-B02 有限伝播
- Level: B

Kirchhoff 公式から、初期データが $B_R(0)$ に台を持つとき $u(t,x)=0$ となる十分条件を求めよ。

<!-- solution-start -->
##### 詳細解答
球面 $S_{ct}(x)$ が $B_R(0)$ と交わらなければ積分は0です。特に $|x|>R+ct$ なら全ての $y$ with $|y-x|=ct$ について $|y|\ge|x|-ct>R$ なので0です。
<!-- solution-end -->

#### PDE9-B03 Huygens と尾
- Level: B

三次元と二次元で、波面通過後の応答が異なる理由を積分領域から説明せよ。

<!-- solution-start -->
##### 詳細解答
三次元は球面積分なので半径 $ct$ の殻だけを見る。二次元は円板内部全体を重み付き積分するため、波面より内側の過去データも寄与し続け、尾が残ります。
<!-- solution-end -->

### Level C

#### PDE9-C01 次元による伝播構造
- Level: C

一次元 d'Alembert、二次元 Poisson、三次元 Kirchhoff の三公式について、時刻 $(t,x)$ が参照する初期データの集合を比較し、有限伝播速度と Huygens 原理を整理せよ。

<!-- solution-start -->
##### 詳細解答
一次元 d'Alembert では初期変位は二端点 $x\pm ct$、初速度は区間 $[x-ct,x+ct]$ に現れます。二次元 Poisson では円板 $|y-x|<ct$ 全体が寄与します。三次元 Kirchhoff では球面 $|y-x|=ct$ のみです。どの場合も半径 $ct$ より外側は影響しないため有限伝播速度を持ちますが、初期データが波面内部に残って直接寄与しないという鋭い Huygens 原理は三次元公式に現れます。
<!-- solution-end -->

## 7. 章末チェック

- 球面平均と Euler--Poisson--Darboux 関係を導ける。
- Kirchhoff 公式を検証できる。
- 三次元 Huygens 原理を積分領域から説明できる。
- descent method から二次元 Poisson 公式を導ける。
- 二次元の尾と三次元の鋭い伝播を区別できる。
