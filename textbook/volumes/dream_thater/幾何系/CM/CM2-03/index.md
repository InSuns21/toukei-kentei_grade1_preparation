# CM2-03 局所bar∂-Poincaré補題と解析的準備

<!-- definition-example-audit: strict -->

## 1. 閉じているだけでは足りない

[型別外微分の三つの恒等式](../CM2-02/index.md#thm-cm2-02-double-complex-identities)で $\bar\partial^2=0$ を証明した。したがって、もし $(p,q)$ 形式 $\alpha$ が $\alpha=\bar\partial u$ と書けるなら、必ず $\bar\partial\alpha=0$ となる。しかし、逆は恒等式だけからは出ない。逆を示すには、未知の係数関数を実際に求める解析が必要になる。

まず $\mathbb C$ 上の $\alpha=z\,d\bar z$ は $\bar\partial\alpha=0$ を満たす。これは複素次元1では $(0,2)$ 形式が零になるからである。しかも $u=z\bar z$ と置けば $\bar\partial u=z\,d\bar z=\alpha$ となる。では、任意の滑らかな閉形式にも、少なくとも各点の近くで同じことができるだろうか。

この章では、正則座標で小さな多重円板を選び、**一変数の積分作用素から多変数の局所解を組み立てる**。主張するのは $q\ge1$ における局所可解性であって、複素多様体全体での可解性ではない。

## 2. どの条件で方程式を解くか

$X$ を複素次元 $n\ge1$ の複素多様体、$U\subset X$ を正則座標領域とする。$\alpha\in\mathcal A^{p,q}(U)$ に対し、未知の $u\in\mathcal A^{p,q-1}(V)$ を

$$
\bar\partial u=\alpha|_V
$$

となるよう、必要なら小さな開集合 $V\subset U$ 上で探す。$\bar\partial$ は $(p,q-1)$ 型から $(p,q)$ 型へ移るため、**$q\ge1$** が必要である。$\bar\partial\alpha=0$ が必要なのは $\bar\partial^2u=0$ から分かる。

<a id="def-cm2-03-local-solution"></a>

<!-- formal-statement-start -->
> **定義（局所bar∂原始形式）**  
> $X$ を複素多様体、$x\in X$、$q\ge1$ とする。滑らかな $(p,q)$ 形式 $\alpha$ に対し、$x$ の開近傍 $V$ 上の滑らかな $(p,q-1)$ 形式 $u$ が $\bar\partial u=\alpha|_V$ を満たすとき、$u$ を点 $x$ の近くでの $\alpha$ の局所 $\bar\partial$ 原始形式という。
<!-- formal-statement-end -->

<!-- definition-example-start: def-cm2-03-local-solution -->
**定義の確認**。$\mathbb C^2$ で $\alpha=\bar z^1\,dz^2\wedge d\bar z^1$ とする。$u=\frac12(\bar z^1)^2 dz^2$ を選ぶと、[局所公式](../CM2-02/index.md#thm-cm2-02-local-formula)から

$$
\bar\partial u
=\bar z^1\,d\bar z^1\wedge dz^2
=-\bar z^1\,dz^2\wedge d\bar z^1=-\alpha.
$$

> したがって正しい原始形式は $-\frac12(\bar z^1)^2dz^2$ である。係数の積分だけでは外積の順序による負号を落とすので、必ず型を確認する。
<!-- definition-example-end -->

局所可解性は必ずしも解の一意性を意味しない。例えば $\mathbb C$ 上で $\bar\partial u=d\bar z$ の解は $u=\bar z$ だけでなく、任意の正則関数 $h$ を用いた $u=\bar z+h(z)$ も解である。

## 3. 一変数の基本解

$\zeta=\xi+i\eta$ とし、$dA(\zeta)=d\xi\,d\eta$ を通常の面積測度とする。$g\in C_c^\infty(\mathbb C)$ は、滑らかで台がコンパクトな複素数値関数である。次の積分は $\zeta=z$ で特異に見えるが、$|\zeta-z|^{-1}$ は二次元では原点を含む円板上でも絶対積分が有限となる。実際、

$$
\int_{|\zeta-z|<r}\frac{dA(\zeta)}{|\zeta-z|}
=\int_0^{2\pi}\int_0^r \frac1\rho\,\rho\,d\rho\,d\theta=2\pi r.
$$

<a id="def-cm2-03-cauchy-transform"></a>

<!-- formal-statement-start -->
> **定義（一変数のCauchy変換）**  
> $g\in C_c^\infty(\mathbb C)$ に対して

$$
(Tg)(z)=\frac1\pi\int_{\mathbb C}\frac{g(\zeta)}{z-\zeta}\,dA(\zeta)
$$

> と定める。これは各 $z\in\mathbb C$ で絶対収束する積分である。
<!-- formal-statement-end -->

<!-- definition-example-start: def-cm2-03-cauchy-transform -->
**定義の確認**。$g$ の台が半径 $R$ の円板に含まれるとする。$z$ の近くの積分を半径1以内と外側に分けると、前者の絶対値は $2\|g\|_\infty$ 以下、後者は $\int_{\operatorname{supp}g}|g(\zeta)|\,dA(\zeta)/\pi$ 以下になる。従って $Tg$ の定義に主値は必要ない。
<!-- definition-example-end -->

<a id="lem-cm2-03-fundamental-kernel"></a>

<!-- formal-statement-start -->
> **補題（bar∂の基本解）**  
> $\mathbb C$ 上で近傍ごとに絶対積分が有限な関数 $K(z)=1/(\pi z)$ は、分布の意味で $\partial_{\bar z}K=\delta_0$ を満たす。すなわち任意の $\varphi\in C_c^\infty(\mathbb C)$ に対し

$$
-\frac1\pi\int_{\mathbb C}\frac{\partial_{\bar z}\varphi(z)}{z}\,dA(z)=\varphi(0)
$$

> が成り立つ。
<!-- formal-statement-end -->

### 証明の見取り図

原点の小円板を除くと $1/z$ は正則なので、内部の微分は消える。穴の内周だけが残り、その向きが負になることから原点の値を取り出せる。

<!-- proof-start -->
### 証明

$\varphi$ の台を含む大きな円板から半径 $\varepsilon$ の閉円板を除いた領域を $D_\varepsilon$ とする。$z\ne0$ では $\partial_{\bar z}(1/z)=0$ だから

$$
\partial_{\bar z}\!\left(\frac{\varphi}{z}\right)
=\frac{\partial_{\bar z}\varphi}{z}.
$$

ここでは Stokes の定理を前提にせず、極座標で積分を直接求める。$z=\rho e^{i\theta}$（$\rho>0$）に対し、連鎖律から

$
\partial_{\bar z}
=\frac{e^{i\theta}}2\left(\partial_\rho+\frac i\rho\partial_\theta\right),
\qquad dA=\rho\,d\rho\,d\theta
$

が成り立つ。$\varphi$ の台を半径 $R$ の円板の内部に取ると、$\theta$ に関する偏導関数の積分は周期性から零になるので、

$
\begin{aligned}
\int_{D_\varepsilon}\frac{\partial_{\bar z}\varphi(z)}z\,dA(z)
&=\frac12\int_\varepsilon^R\int_0^{2\pi}
\left(\partial_\rho\varphi(\rho e^{i\theta})
+\frac i\rho\partial_\theta\varphi(\rho e^{i\theta})\right)
\,d\theta\,d\rho\\
&=\frac12\int_0^{2\pi}
\bigl(\varphi(Re^{i\theta})-\varphi(\varepsilon e^{i\theta})\bigr)\,d\theta\\
&=-\frac12\int_0^{2\pi}\varphi(\varepsilon e^{i\theta})\,d\theta.
\end{aligned}
$

$\varepsilon\downarrow0$ で最後の積分は $-\pi\varphi(0)$ に収束する。左辺も $|\partial_{\bar z}\varphi(z)|/|z|$ の特異核の積分可能性により元の積分へ収束する。両辺に $-1/\pi$ を掛ければ結論となる。$\square$
<!-- proof-end -->

<a id="thm-cm2-03-one-variable-inverse"></a>

<!-- formal-statement-start -->
> **定理（一変数でのbar∂右逆）**  
> 任意の $g\in C_c^\infty(\mathbb C)$ に対し、$Tg\in C^\infty(\mathbb C)$ かつ

$$
\frac{\partial(Tg)}{\partial\bar z}=g
$$

> が成り立つ。さらに別の実または複素パラメータ $t$ に滑らかに依存する $g(t,\zeta)$ に対し、$\zeta$ 方向の台が $t$ の局所範囲で一様にコンパクトなら、$Tg$ は $t$ に滑らかに依存し、パラメータ微分は積分作用素 $T$ と可換である。
<!-- formal-statement-end -->

### 証明の見取り図

積分核 $K(z)=1/(\pi z)$ を用いると $Tg=K*g$ である。基本解の補題を畳み込みへ適用すれば $\bar\partial(Tg)=g$。滑らかさは、特異核を直接微分せず、変数を平行移動して $g$ の方を微分することで確かめる。

<!-- proof-start -->
### 証明

積分変数を $w=z-\zeta$ に置き換える。面積要素の絶対Jacobi行列式は1なので

$$
(Tg)(z)=\frac1\pi\int_{\mathbb C}\frac{g(z-w)}{w}\,dA(w).
$$

$z$ がコンパクト集合内を動くとき $g(z-w)$ の台は $w$ に関して共通のコンパクト集合に含まれる。任意の非負整数 $a,b$ について $g$ の実偏導関数 $\partial_x^a\partial_y^b g$ は有界であり、積分の被積分関数は共通の可積分優関数 $C|w|^{-1}1_{\{|w|\le R\}}$ で押さえられる。よって差商に平均値の定理と優収束を適用して

$$
\partial_x^a\partial_y^b(Tg)
=K*(\partial_x^a\partial_y^b g)
$$

を順に得る。特に $Tg$ は $C^\infty$ 級である。

[基本解の補題](#lem-cm2-03-fundamental-kernel)を分布の畳み込みに適用すると

$$
\partial_{\bar z}(Tg)
=(\partial_{\bar z}K)*g
=\delta_0*g=g.
$$

左辺も右辺も滑らかな関数なので、分布としての等号は各点での等号である。パラメータ $t$ に関しても上と同じ局所一様優関数が使え、$\partial_t(Tg)=T(\partial_tg)$ を得る。高階微分はこれを反復する。$\square$
<!-- proof-end -->

この定理は $g$ が台がコンパクトな場合の全平面上の右逆である。一般の局所関数 $f$ へ適用するには、切断関数を掛ける。円板 $D\subset\mathbb C$ とその内部の小円板 $E$ を取り、$\chi\in C_c^\infty(D)$、$\chi|_E=1$ とすれば

$$
T(\chi f)(z)=\frac1\pi\int_D\frac{\chi(\zeta)f(\zeta)}{z-\zeta}\,dA(\zeta),
\qquad
\partial_{\bar z}T(\chi f)=f\quad(z\in E).
$$

この**小さい領域では方程式が成立する**という性質を、多変数でも使う。

## 4. パラメータ付き積分と多重円板

多重円板 $D=D_1\times\cdots\times D_n\subset\mathbb C^n$ と、各円板に閉包が大きい円板内にある小円板 $E_j\Subset D_j$ を選ぶ。$\chi_j\in C_c^\infty(D_j)$ は $E_j$ 上で1とする。滑らかな係数 $f$ に対し、$j$ 番目の変数だけ積分する作用素を

$$
(T_j f)(z)
=\frac1\pi\int_{D_j}
\frac{\chi_j(\zeta)f(z^1,\ldots,z^{j-1},\zeta,z^{j+1},\ldots,z^n)}
{z^j-\zeta}\,dA(\zeta)
$$

と置く。全ての変数を同時に積分しているわけではない。前節のパラメータ付き右逆から

$$
\partial_{\bar z^j}(T_jf)=f\quad(z^j\in E_j),\qquad
\partial_{\bar z^k}(T_jf)=T_j(\partial_{\bar z^k}f)\quad(k\ne j)
$$

が従う。第二式では $\chi_j$ が別の座標に依存しないことが大切である。

<a id="lem-cm2-03-parametric-inverse"></a>

<!-- formal-statement-start -->
> **補題（多重円板の座標別右逆）**  
> $D$ を複素 $n$ 次元空間内の多重円板とする。各座標の小円板 $E_j$ は大きい円板 $D_j$ に閉包ごと含まれるものとする。切断関数は以下を満たすように選ぶ。

$$
D=\prod_{j=1}^n D_j,\qquad
\chi_j\in C_c^\infty(D_j),\qquad
\chi_j|_{E_j}=1.
$$

> 任意の滑らかな関数 $f$ について、座標別積分 $T_jf$ は $D$ 上滑らかであり、次を満たす。

$$
\partial_{\bar z^j}T_jf=f\quad(z^j\in E_j),
\qquad
\partial_{\bar z^k}T_jf=T_j\partial_{\bar z^k}f\quad(k\ne j).
$$

> また $f$ が他の変数 $z^k$ に正則なら $T_jf$ もその変数に正則である。
<!-- formal-statement-end -->

### 証明の見取り図

先の一変数定理を、他の $n-1$ 変数をパラメータとして適用する。最後の主張には [正則関数の判定](../CM2-02/index.md#prop-cm2-02-holomorphic-function)を用いる。

<!-- proof-start -->
### 証明

固定した $z^1,\dots,\widehat{z^j},\dots,z^n$ に対し、$\zeta\mapsto\chi_j(\zeta)f(\dots,\zeta,\dots)$ は $C_c^\infty(\mathbb C)$ へ零延長できる。支持は固定集合 $\operatorname{supp}\chi_j$ に含まれるので、[一変数の右逆](#thm-cm2-03-one-variable-inverse)がすべてのパラメータで適用できる。従って

$$
\partial_{\bar z^j}(T_jf)=\chi_j(z^j)f(z)=f(z)\quad(z^j\in E_j).
$$

$k\ne j$ の微分は、パラメータ微分と積分が可換なことから第二式を得る。もし $\partial_{\bar z^k}f=0$ なら $\partial_{\bar z^k}(T_jf)=0$ であり、[正則関数の判定](../CM2-02/index.md#prop-cm2-02-holomorphic-function)をその変数に適用して結論を得る。$\square$
<!-- proof-end -->

## 5. 閉形式を座標ごとに消す

ここが多変数化の核心である。$\alpha$ のうち $d\bar z^n$ を含む項を、**必ず $d\bar z^n$ が左端に来る順**に移して

$$
\alpha=\beta+d\bar z^n\wedge\gamma
$$

と書く。$\beta$ は $d\bar z^n$ を含まない $(p,q)$ 形式、$\gamma$ は $d\bar z^n$ を含まない $(p,q-1)$ 形式である。係数の符号は、この順序変更を含めて $\gamma$ に吸収する。$\bar\partial'=\sum_{j<n}d\bar z^j\wedge\partial_{\bar z^j}$、$D_n=d\bar z^n\wedge\partial_{\bar z^n}$ とすると、

$$
\begin{aligned}
0=\bar\partial\alpha
&=\bar\partial'\beta+D_n\beta
+\bar\partial'(d\bar z^n\wedge\gamma)\\
&=\bar\partial'\beta+
d\bar z^n\wedge\bigl(\partial_{\bar z^n}\beta-\bar\partial'\gamma\bigr).
\end{aligned}
$$

したがって $d\bar z^n$ を含まない部分と含む部分を比較して

$$
\bar\partial'\beta=0,\qquad
\partial_{\bar z^n}\beta=\bar\partial'\gamma.
$$

$u_n=T_n\gamma$ とする（$T_n$ は $\gamma$ の各係数へ作用）。$z^n\in E_n$ では

$$
\begin{aligned}
\bar\partial u_n&=\bar\partial' u_n+d\bar z^n\wedge\gamma,\\
\alpha-\bar\partial u_n&=\beta-\bar\partial' u_n=:\beta_1,\\
\partial_{\bar z^n}\beta_1
&=\bar\partial'\gamma-\bar\partial'(\partial_{\bar z^n}u_n)
=\bar\partial'\gamma-\bar\partial'\gamma=0.
\end{aligned}
$$

よって $\beta_1$ は $d\bar z^n$ を持たず、しかも係数が $z^n$ に正則である。一方、$\bar\partial\beta_1=\bar\partial\alpha-\bar\partial^2u_n=0$ だから、残った $n-1$ 個の反正則方向について閉じている。

この操作を $n-1,n-2,\ldots,1$ の順に繰り返す。$T_j$ は他の変数での正則性を保つため、すでに消した方向が復活しない。$q\ge1$ なら反正則方向をすべて消した後の $(p,q)$ 形式は零である。

<a id="thm-cm2-03-local-dbar-poincare"></a>

<!-- formal-statement-start -->
> **定理（局所bar∂-Poincaré補題）**  
> $X$ を複素次元 $n\ge1$ の複素多様体、$x\in X$ とする。整数 $0\le p\le n$、$1\le q\le n$ に対し、$x$ の開近傍 $U$ 上の滑らかな $(p,q)$ 形式 $\alpha$ が $\bar\partial\alpha=0$ を満たすなら、$x$ のより小さな開近傍 $V\subset U$ と、滑らかな $(p,q-1)$ 形式 $u$ が存在して

$$
\bar\partial u=\alpha|_V
$$

> を満たす。従って $\bar\partial$ 閉形式が局所 $\bar\partial$ 完全となることは、正の反正則次数 $q$ において成り立つ。
<!-- formal-statement-end -->

### 証明の見取り図

正則座標の多重円板上で、座標別Cauchy変換を使い反正則成分を一方向ずつ除去する。局所性は切断関数を1とする小円板の選択に現れる。最後に $\bar\partial^2=0$ が必要条件を与える。

<!-- proof-start -->
### 証明

$x$ を含み、閉包が正則座標領域に含まれる多重円板 $D=\prod_jD_j\subset U$ を選ぶ。$x$ の座標を各中心とし、$E_j\Subset D_j$ を選び、$\chi_j|_{E_j}=1$ とする。$V=\prod_j E_j$ と置く。

$\alpha_0=\alpha$ とし、$r=n,n-1,\dots,1$ について帰納的に、既に $z^{r+1},\ldots,z^n$ に正則でそれらの $d\bar z$ を持たない $\bar\partial$ 閉形式 $\alpha_{n-r}$ を扱う。その定義域は、まだ処理していない座標では $D_j$、処理済みの座標では $E_j$ とする。

$r$ 番目の反正則微分を左端に出して $\alpha_{n-r}=\beta+d\bar z^r\wedge\gamma$ と分解する。処理済みの方向では係数の反正則微分が零である。また $\bar\partial_{<r}(d\bar z^r\wedge\gamma)=-d\bar z^r\wedge\bar\partial_{<r}\gamma$ なので、$\bar\partial\alpha_{n-r}=0$ の $d\bar z^r$ を含む係数を比較すると、$\partial_{\bar z^r}\beta=\bar\partial_{<r}\gamma$ が成立する。$u_r=T_r\gamma$ と置けば [座標別右逆](#lem-cm2-03-parametric-inverse)より、$z^r\in E_r$ で $\partial_{\bar z^r}u_r=\gamma$。したがって

$$
\alpha_{n-r}-\bar\partial u_r
=\beta-\bar\partial_{<r}u_r=:\alpha_{n-r+1}
$$

は $d\bar z^r$ を含まない。さらに、$\bar\partial_{<r}$ と $\partial_{\bar z^r}$ は滑らかな係数上で交換するから、

$
\begin{aligned}
\partial_{\bar z^r}\alpha_{n-r+1}
&=\partial_{\bar z^r}\beta
-\bar\partial_{<r}(\partial_{\bar z^r}u_r)\\
&=\bar\partial_{<r}\gamma-\bar\partial_{<r}\gamma=0.
\end{aligned}
$

従って残差の係数は $z^r$ に正則である。$T_r$ は処理済みの $z^{r+1},\ldots,z^n$ に関する正則性も保つので、帰納法の仮定を維持する。また [型別外微分の二乗零](../CM2-02/index.md#thm-cm2-02-double-complex-identities) より $\bar\partial\alpha_{n-r+1}=0$。

$r=1$ まで進むと $\alpha_n$ は $d\bar z^1,\dots,d\bar z^n$ を一切含まない $(p,q)$ 形式である。$q\ge1$ なので $\alpha_n=0$。従って $V$ 上で

$$
\alpha=\bar\partial(u_n+u_{n-1}+\cdots+u_1)
$$

となる。各 $u_r$ は最終的に $V$ に制限して足し合わせる。係数の滑らかさは各 $T_r$ のパラメータ付き正則性定理により保証される。$\square$
<!-- proof-end -->

この証明では、一般の形式をそのまま全平面で積分せず、一変数ごとに切断関数を掛けている。各変数で切断関数を使い、方程式を主張する領域を少し縮めた点が不可欠である。

## 6. 解けることと解けないことの境界

**$q=0$** では「$\bar\partial$ 閉」は正則関数（あるいは正則 $(p,0)$ 形式）を特徴づける。$q=-1$ の微分形式は存在しないため、その関数をさらに $\bar\partial$ の像と見なすことはできない。例えば $f(z)=1$ は $\bar\partial f=0$ だが、$f=\bar\partial u$ となる $(-1)$ 次の形式 $u$ はない。

**大域では成立しない場合がある**。$\mathbb C$ から格子 $\Lambda=\mathbb Z+i\mathbb Z$ で割った[複素トーラス](../CM1-09/index.md#def-cm1-09-complex-torus) $X=\mathbb C/\Lambda$ 上で、$d\bar z$ は平行移動で不変だから大域的な $(0,1)$ 形式 $\alpha$ に降りる。$\bar\partial\alpha=0$ だが、$\bar\partial u=\alpha$ を満たす大域的な滑らかな関数 $u$ は存在しない。

その理由を見ておく。存在したと仮定し、周期関数 $\widetilde u$ へ持ち上げると $\partial_{\bar z}\widetilde u=1$ となる。基本正方形 $Q=[0,1]\times[0,1]$ 上で Wirtinger 微分の定義を使えば

$$
\begin{aligned}
\int_Q\partial_{\bar z}\widetilde u\,dx\,dy
&=\frac12\int_0^1\!\bigl[\widetilde u(1,y)-\widetilde u(0,y)\bigr]\,dy\\
&\quad+\frac i2\int_0^1\!\bigl[\widetilde u(x,1)-\widetilde u(x,0)\bigr]\,dx=0.
\end{aligned}
$$

$\widetilde u$ の周期性から両方の境界差が零となる。一方 $\partial_{\bar z}\widetilde u=1$ なら左辺は $Q$ の面積1である。これは矛盾する。局所で作れる原始形式がトーラス全体でつながらないことが分かる。

<a id="prop-cm2-03-local-kernel"></a>

<!-- formal-statement-start -->
> **命題（零次の核と正の次数の局所完全性）**  
> 複素多様体 $X$ の任意の点 $x$ と $0\le p\le n$ について、点 $x$ の近くで $\bar\partial\alpha=0$ を満たす滑らかな $(p,0)$ 形式は、正則座標で正則係数をもつ形式に一致する。一方 $1\le q\le n$ の滑らかな $(p,q)$ 形式は、$\bar\partial$ 閉なら $x$ の近くで $\bar\partial$ 完全である。
<!-- formal-statement-end -->

### 証明の見取り図

零次では係数ごとのCauchy–Riemann条件を使い、正の次数では先ほどの局所補題を適用する。

<!-- proof-start -->
### 証明

局所的に $\alpha=\sum_{|I|=p}a_I dz^I$ と書く。$d\bar z^j\wedge dz^I$ は $(p,1)$ 形式の独立な基底をなすので、[局所公式](../CM2-02/index.md#thm-cm2-02-local-formula)から $\bar\partial\alpha=0$ と $\partial_{\bar z^j}a_I=0$（すべての $I,j$）が同値となる。各係数は滑らかなので [正則関数の判定](../CM2-02/index.md#prop-cm2-02-holomorphic-function)により正則である。逆は係数の Wirtinger 微分が零だから成立する。正の次数については [局所bar∂-Poincaré補題](#thm-cm2-03-local-dbar-poincare)が直接与える。$\square$
<!-- proof-end -->

この局所的な結果が、次章でDolbeault複体とコホモロジーを考える際の解析的土台になる。局所的に閉形式を消せることと、大域的にも消せることとの差を測るのが後者の役目である。

## 7. 演習：積分核、外積符号、局所性

### Level A

<a id="ex-cm2-03-a01"></a>
#### CM2-03-A01 一変数の原始関数
- Level: A

$\mathbb C$ 上の $(0,1)$ 形式 $\alpha=z^2\,d\bar z$ に対し、滑らかな関数 $u$ で $\bar\partial u=\alpha$ となるものを一つ求めよ。

<!-- solution-start -->
**詳細解答**。$z$ は $\bar z$ に関するWirtinger微分では定数として振る舞い、$\partial_{\bar z}\bar z=1$ である。よって $u=z^2\bar z$ と置けば

$$
\bar\partial u
=\partial_{\bar z}(z^2\bar z)\,d\bar z
=z^2\,d\bar z=\alpha.
$$

$u+h(z)$（$h$ は正則）も同じ微分を持ち、一意性はない。
<!-- solution-end -->

<a id="ex-cm2-03-a02"></a>
#### CM2-03-A02 外積の負号
- Level: A

$\mathbb C^2$ 上で $\alpha=z^2\,dz^1\wedge d\bar z^2$ を与える。$(1,0)$ 形式 $u$ を求め、外積の符号を明示して $\bar\partial u=\alpha$ を検算せよ。

<!-- solution-start -->
**詳細解答**。$u=-z^2\bar z^2\,dz^1$ とする。[局所公式](../CM2-02/index.md#thm-cm2-02-local-formula)により

$$
\bar\partial u
=-z^2\,d\bar z^2\wedge dz^1
=z^2\,dz^1\wedge d\bar z^2=\alpha.
$$

$d\bar z^2\wedge dz^1=-dz^1\wedge d\bar z^2$ なので負号が必要となる。
<!-- solution-end -->

<a id="ex-cm2-03-a03"></a>
#### CM2-03-A03 必要条件
- Level: A

$\mathbb C^2$ 上の $(0,1)$ 形式 $\alpha=\bar z^1\,d\bar z^2$ は点 $(0,0)$ の近くで $\bar\partial u=\alpha$ と書けるか。計算して判定せよ。

<!-- solution-start -->
**詳細解答**。[局所公式](../CM2-02/index.md#thm-cm2-02-local-formula)から

$$
\bar\partial\alpha
=d\bar z^1\wedge d\bar z^2\ne0.
$$

仮に $\alpha=\bar\partial u$ なら $\bar\partial\alpha=\bar\partial^2u=0$ でなければならず、[二乗零](../CM2-02/index.md#thm-cm2-02-double-complex-identities)に反する。従って原点のどの開近傍でも解けない。
<!-- solution-end -->

<a id="ex-cm2-03-a04"></a>
#### CM2-03-A04 核の零次
- Level: A

$\mathbb C$ 上の滑らかな関数 $f=z^3+2$ と $g=\bar z$ について、$\bar\partial f$ と $\bar\partial g$ を求めよ。また $f$ が $\bar\partial$ 閉でも $(-1)$ 次形式の像ではない理由を述べよ。

<!-- solution-start -->
**詳細解答**。Wirtinger微分は $f_{\bar z}=0$、$g_{\bar z}=1$ なので

$$
\bar\partial f=0,\qquad \bar\partial g=d\bar z.
$$

$f$ は閉であるが、$(0,-1)$ 形式は定義されない。したがって正の次数の局所完全性を $q=0$ へ延長してはならない。
<!-- solution-end -->

<a id="ex-cm2-03-a05"></a>
#### CM2-03-A05 特異核の積分可能性
- Level: A

$r>0$ に対して $I(r)=\int_{|\zeta|<r}|\zeta|^{-1}\,dA(\zeta)$ を計算せよ。これが $1/z$ を通常の局所可積分関数と扱える理由を説明せよ。

<!-- solution-start -->
**詳細解答**。極座標 $\zeta=\rho e^{i\theta}$、$dA=\rho\,d\rho\,d\theta$ を用いると

$$
I(r)=\int_0^{2\pi}\int_0^r\frac{\rho}{\rho}\,d\rho\,d\theta=2\pi r<\infty.
$$

原点の近傍でも絶対積分が有限であるため、$1/z$ は局所可積分関数として分布を定める。$1/|z|^2$ なら $\int_0^r \rho^{-1}\,d\rho$ が発散する点と対比できる。
<!-- solution-end -->

### Level B

<a id="ex-cm2-03-b01"></a>
#### CM2-03-B01 閉条件と明示的原始形式
- Level: B

$\mathbb C^2$ 上の $(0,1)$ 形式

$$
\alpha=\bar z^2\,d\bar z^1+\bar z^1\,d\bar z^2
$$

について $\bar\partial\alpha=0$ を直接確認し、$\bar\partial u=\alpha$ を満たす関数 $u$ を求めよ。

<!-- solution-start -->
**詳細解答**。係数微分を順に行うと

$$
\begin{aligned}
\bar\partial\alpha
&=d\bar z^2\wedge d\bar z^1+d\bar z^1\wedge d\bar z^2\\
&=-d\bar z^1\wedge d\bar z^2+d\bar z^1\wedge d\bar z^2=0.
\end{aligned}
$$

$u=\bar z^1\bar z^2$ と置くと $\partial_{\bar z^1}u=\bar z^2$、$\partial_{\bar z^2}u=\bar z^1$ なので

$$
\bar\partial u=\bar z^2\,d\bar z^1+\bar z^1\,d\bar z^2=\alpha.
$$

必要条件と解の直接構成の両方が確認できる。
<!-- solution-end -->

<a id="ex-cm2-03-b02"></a>
#### CM2-03-B02 二方向消去
- Level: B

$\mathbb C^2$ 上の $\alpha=\bar z^2\,d\bar z^1+\bar z^1\,d\bar z^2$ を考える。第2変数の成分を先に消すために $u_2=\bar z^1\bar z^2$ を選び、残る $\alpha-\bar\partial u_2$ を求めよ。なぜ第1変数の処理が不要か説明せよ。

<!-- solution-start -->
**詳細解答**。$u_2$ は $\partial_{\bar z^2}u_2=\bar z^1$ を満たす。さらに $\partial_{\bar z^1}u_2=\bar z^2$ なので

$$
\bar\partial u_2
=\bar z^2\,d\bar z^1+\bar z^1\,d\bar z^2.
$$

従って $\alpha-\bar\partial u_2=0$ である。第2方向を除去する操作が偶然第1方向も同時に消したため、追加の原始形式 $u_1$ は0でよい。この例では明示的原始形式を選んだが、一般の積分作用素 $T_2$ では残差が零とは限らず、第1方向の処理が必要となる。
<!-- solution-end -->

<a id="ex-cm2-03-b03"></a>
#### CM2-03-B03 高次型での符号
- Level: B

$\mathbb C^2$ 上の $(1,2)$ 形式 $\alpha=z^1\,dz^2\wedge d\bar z^1\wedge d\bar z^2$ の $\bar\partial$ 原始形式を一つ構成せよ。$\bar\partial\alpha=0$ が型から従うことも述べよ。

<!-- solution-start -->
**詳細解答**。$u=z^1\bar z^2\,dz^2\wedge d\bar z^1$ と置く。$u$ の係数で反正則に依存するのは $\bar z^2$ のみなので

$$
\begin{aligned}
\bar\partial u
&=z^1\,d\bar z^2\wedge dz^2\wedge d\bar z^1\\
&=-z^1\,dz^2\wedge d\bar z^2\wedge d\bar z^1\\
&=z^1\,dz^2\wedge d\bar z^1\wedge d\bar z^2=\alpha.
\end{aligned}
$$

二回の交換で正号になる。$\bar\partial\alpha$ は $(1,3)$ 型だが複素次元2ではこの型の形式は零である。
<!-- solution-end -->

<a id="ex-cm2-03-b04"></a>
#### CM2-03-B04 切断関数と解の成立域
- Level: B

円板 $D=\{|z|<2\}$ と $E=\{|z|<1\}$ を取り、$\chi\in C_c^\infty(D)$、$\chi=1$ on $E$ とする。$f(z)=\bar z^2$ を用いて

$$
u(z)=\frac1\pi\int_D\frac{\chi(\zeta)\bar\zeta^2}{z-\zeta}\,dA(\zeta)
$$

を定める。$E$ 上の $\bar\partial u$ を求め、$D$ 全体で $\bar\partial u=\bar z^2$ と断言できない理由を説明せよ。

<!-- solution-start -->
**詳細解答**。$g(\zeta)=\chi(\zeta)\bar\zeta^2$ は $D$ から零延長すると $C_c^\infty(\mathbb C)$ となる。よって [一変数の右逆](#thm-cm2-03-one-variable-inverse)から $u_{\bar z}=g(z)=\chi(z)\bar z^2$ が全平面で成り立つ。$E$ 上では $\chi=1$ だから

$$
\bar\partial u=\bar z^2\,d\bar z\quad(z\in E).
$$

$D\setminus E$ では $\chi$ が1とは限らず、$\bar\partial u=\chi(z)\bar z^2\,d\bar z$ が正しい。切断関数を掛けた後の恒等式と、元の $f$ に対する恒等式を混同してはならない。
<!-- solution-end -->

### Level C

<a id="ex-cm2-03-c01"></a>
#### CM2-03-C01 局所完全性と大域障害の総合
- Level: C

$\Lambda=\mathbb Z+i\mathbb Z$、$X=\mathbb C/\Lambda$ とし、$\mathbb C$ 上の $d\bar z$ が $X$ に降ろす $(0,1)$ 形式を $\alpha$ とする。

1. $\alpha$ が $\bar\partial$ 閉であることを示せ。
2. $X$ の任意の点で局所 $\bar\partial$ 原始形式を明示的に構成せよ。
3. $\bar\partial u=\alpha$ を満たす大域的な滑らかな関数 $u$ は存在しないことを、基本正方形における周期関数の偏導関数の積分を用いて示せ。

<!-- solution-start -->
**詳細解答**。

**(1)** $\Lambda$ の平行移動 $z\mapsto z+\lambda$ に対して $d\overline{(z+\lambda)}=d\bar z$ なので、$\alpha$ は商へ降りる。複素次元1では $(0,2)$ 形式が零であり、$\bar\partial\alpha=0$。

**(2)** $X$ の点 $x$ の持ち上げ $z_0\in\mathbb C$ を選び、非零格子点同士の距離より十分小さい円板 $B(z_0,\varepsilon)$ を取る。商写像はその円板上で単射なので、円板の座標 $w=z-z_0$ は $x$ の近傍の正則座標となる。そこで $u_{\mathrm{loc}}=\bar w$ と置けば

$$
\bar\partial u_{\mathrm{loc}}=d\bar w=d\bar z=\alpha.
$$

**(3)** 大域解があれば持ち上げ $\widetilde u:\mathbb C\to\mathbb C$ は $\widetilde u(z+1)=\widetilde u(z)$、$\widetilde u(z+i)=\widetilde u(z)$ を満たし、$\partial_{\bar z}\widetilde u=1$ である。$z=x+iy$、$Q=[0,1]^2$ とすると

$$
\begin{aligned}
1&=\int_Q1\,dx\,dy
=\int_Q\partial_{\bar z}\widetilde u\,dx\,dy\\
&=\frac12\int_0^1\bigl(\widetilde u(1,y)-\widetilde u(0,y)\bigr)\,dy
+\frac i2\int_0^1\bigl(\widetilde u(x,1)-\widetilde u(x,0)\bigr)\,dx\\
&=0.
\end{aligned}
$$

二つの境界差が零になるのは周期性からであり、各積分変形は一変数の微積分の基本定理である。$1=0$ は矛盾するため大域解は存在しない。局所可解性は大域可解性を意味しない。
<!-- solution-end -->
