# PDE11 曲線座標での変数分離と特殊関数

<!-- definition-example-audit: strict -->

ODE6 で Bessel 方程式と Legendre 方程式を級数解として学びました。本章では「なぜその方程式が重要なのか」を PDE 側から回収します。

- 円板・円筒の半径方向 $\longrightarrow$ Bessel 方程式
- 球の極角方向 $\longrightarrow$ Legendre 方程式
- 球面上の固有関数 $\longrightarrow$ 角度固有モード

という対応が中心です。座標公式は [VC6 の円柱・球座標](../VC6/index.md#prop-vc6-spherical)を正本として使います。

## 1. 円板の Helmholtz 固有値問題

単位円板で

$$
-\Delta u=\lambda u,
\qquad
u|_{r=1}=0
$$

を考えます。非零の Dirichlet 固有関数に対しては、[Green の第一恒等式](../PDE6/index.md#thm-pde6-green-first)を $u$ 自身へ適用すると

$$
\lambda\int_D |u|^2\,dx
=
\int_D |\nabla u|^2\,dx.
$$

右辺が0なら $u$ は定数で、境界値0から $u\equiv0$ となってしまいます。従って非零固有関数では

$$
\boxed{\lambda>0}.
$$

このため以下で $\sqrt\lambda$ を実数として使えます。複素表示 $e^{im\theta}$ は実際には $\cos m\theta,\sin m\theta$ の二つをまとめた記法です。

極座標では

$$
\Delta u
=
u_{rr}+\frac1r u_r+\frac1{r^2}u_{\theta\theta}.
$$

$u(r,\theta)=R(r)\Theta(\theta)$ と置くと

$$
-\frac{r^2R''+rR'}{R}
-
\lambda r^2
=
\frac{\Theta''}{\Theta}.
$$

左辺は $r$ だけ、右辺は $\theta$ だけの関数です。等式が全ての $(r,\theta)$ で成り立つには、両辺が同じ定数でなければなりません。角方向を

$$
\Theta''+\mu\Theta=0
$$

と書きます。

$2\pi$ 周期の非零解が存在する条件を確認すると、$\mu<0$ では指数関数型、$\mu=0$ では一次関数型になり、非定数な周期解を持ちません。$\mu>0$ では

$$
\Theta(\theta)
=
A\cos(\sqrt\mu\,\theta)
+
B\sin(\sqrt\mu\,\theta)
$$

であり、$2\pi$ 周期性から

$$
\sqrt\mu=|m|,
\qquad
m\in\mathbb Z
$$

が必要です。複素表示では

$$
\Theta(\theta)=e^{im\theta}
$$

と書けます。従って分離定数は $\mu=m^2$ です。

<a id="prop-pde11-bessel-separation"></a>
<!-- formal-statement-start -->
> **命題（円板の変数分離と Bessel 方程式）**  
> $\lambda>0$ とし、$u=R(r)e^{im\theta}$ $(m\in\mathbb Z)$ を

$$
-\Delta u=\lambda u
$$

> へ代入すると、$R$ は

$$
r^2R''+rR'+(\lambda r^2-m^2)R=0
$$

> を満たす。$\rho=\sqrt\lambda\,r$ と置けば

$$
\rho^2R_{\rho\rho}
+\rho R_\rho
+(\rho^2-m^2)R=0,
$$

> すなわち次数 $|m|$ の Bessel 方程式になる。
<!-- formal-statement-end -->

<!-- proof-start -->
### 証明

$u_{\theta\theta}=-m^2u$ なので

$$
-\left(
R''+\frac1rR'-\frac{m^2}{r^2}R
\right)
=
\lambda R.
$$

$r^2$ を掛ければ最初の式を得ます。$\rho=\sqrt\lambda r$ では

$$
\frac d{dr}=\sqrt\lambda\frac d{d\rho},
\qquad
\frac{d^2}{dr^2}=\lambda\frac{d^2}{d\rho^2},
$$

を代入して標準形になります。
<!-- proof-end -->

## 2. 原点の正則性が $J_m$ を選ぶ

半径方程式を $\rho=\sqrt\lambda\,r$ で書けば

$$
\rho^2R''+\rho R'+(\rho^2-m^2)R=0.
$$

$\rho=0$ は正則特異点です。[ODE6 の Frobenius 解析](../ODE6/index.md#thm-ode6-frobenius-recurrence)を適用すると、指標方程式は

$$
s(s-1)+s-m^2
=
s^2-m^2
=
0
$$

なので指標根は

$$
s=\pm |m|.
$$

原点で有限な枝は $s=|m|$ の方です。標準正規化を施したものを Bessel 関数 $J_{|m|}$ と呼びます。整数 $m\ge0$ なら

$$
J_m(\rho)
=
\sum_{k=0}^{\infty}
\frac{(-1)^k}{k!(m+k)!}
\left(\frac{\rho}{2}\right)^{2k+m}.
$$

実際、$R=\rho^m\sum_{k\ge0}a_k\rho^{2k}$ を代入すると

$$
a_{k+1}
=
-\frac{a_k}{4(k+1)(m+k+1)}
$$

となり、$a_0=1/(2^m m!)$ から上の級数が得られます。もう一つの独立解は $m>0$ では $\rho^{-m}$ 型、$m=0$ では対数型の特異性を持ち得るため、円板中心まで滑らかに延ばす固有モードには $J_{|m|}$ の枝を選びます。

<a id="lem-pde11-bessel-zeros"></a>
<!-- formal-statement-start -->
> **補題（整数次数 Bessel 関数の正零点）**  
> 非負整数 $m$ に対し、$J_m$ は正の実軸上に無限個の零点を持つ。各零点は孤立しているため、
>
> $$
> 0<j_{m,1}<j_{m,2}<\cdots,
> \qquad
> j_{m,k}\to\infty
> $$
>
> と順に並べられる。
<!-- formal-statement-end -->

### 証明の見取り図

Bessel 方程式の一階微分項を消すため

$$
v(r)=\sqrt r\,J_m(r)
$$

と置きます。すると十分大きい $r$ では

$$
v''+q(r)v=0,
\qquad
q(r)\ge\frac12.
$$

位相平面 $(v,v')$ の偏角を $\theta$ とすると $\theta'$ が正の定数以上になり、偏角が無限に回転します。$\theta=k\pi$ を通るたびに $v=0$、従って $J_m=0$ です。

<!-- proof-start -->
### 証明

$R(r)=J_m(r)$ は

$$
R''+\frac1rR'
+
\left(1-\frac{m^2}{r^2}\right)R
=
0
$$

を満たします。

$$
v(r)=r^{1/2}R(r)
$$

と置いて直接微分すると、一階微分項が消えて

$$
v''
+
\left(
1-\frac{m^2-\frac14}{r^2}
\right)v
=
0.
$$

すなわち

$$
v''+q(r)v=0,
\qquad
q(r)
=
1-\frac{m^2-\frac14}{r^2}.
$$

十分大きい $R_0>0$ を取れば

$$
q(r)\ge\frac12
\qquad(r\ge R_0)
$$

です。

$J_m$ は先頭項

$$
J_m(r)
=
\frac1{m!}\left(\frac r2\right)^m+\cdots
$$

を持つ非零解なので、$v$ も非零解です。もしある点で

$$
v(r)=v'(r)=0
$$

なら二階 ODE の一意性から $v\equiv0$ となってしまうため、

$$
v(r)^2+v'(r)^2>0
$$

が全ての $r>0$ で成り立ちます。

従って $r\ge R_0$ で連続な角度 $\theta(r)$ を選び、

$$
v(r)=\rho(r)\sin\theta(r),
\qquad
v'(r)=\rho(r)\cos\theta(r),
$$

$$
\rho(r)=\sqrt{v(r)^2+v'(r)^2}>0
$$

と書けます。偏角の微分公式から

$$
\theta'
=
\frac{v'^2-vv''}{v^2+v'^2}.
$$

方程式 $v''=-qv$ を代入すると

$$
\theta'
=
\frac{v'^2+qv^2}{v^2+v'^2}
=
\cos^2\theta+q\sin^2\theta.
$$

$r\ge R_0$ では $q\ge1/2$ なので

$$
\theta'(r)
\ge
\frac12.
$$

従って

$$
\theta(r)
\ge
\theta(R_0)+\frac{r-R_0}{2}
\to\infty.
$$

連続な $\theta$ は無限個の整数倍 $k\pi$ を通過します。その各点で

$$
v(r)=\rho(r)\sin(k\pi)=0.
$$

$r>0$ では $v=\sqrt r\,J_m$ なので、同じ点で $J_m(r)=0$ です。従って正零点は無限個あります。

最後に、零点 $r_0$ で $J_m'(r_0)=0$ まで成り立てば初期値

$$
J_m(r_0)=J_m'(r_0)=0
$$

から一意性により $J_m\equiv0$ となり矛盾します。よって零点は単純、特に孤立しています。従って正零点を増加順に $j_{m,k}$ と番号付けでき、無限列なので $j_{m,k}\to\infty$ です。
<!-- proof-end -->

<a id="def-pde11-bessel-mode"></a>
<!-- formal-statement-start -->
> **定義（円板の Bessel モード）**  
> $m\in\mathbb Z$ とし、$j_{|m|,k}$ を $J_{|m|}$ の第 $k$ 正零点とする。単位円板の Dirichlet 条件に対し

$$
u_{m,k}(r,\theta)
=
J_{|m|}(j_{|m|,k}r)e^{im\theta}
$$

> を円板の Bessel モードと呼ぶ。対応する固有値は

$$
\lambda_{m,k}=j_{|m|,k}^2
$$

> である。
<!-- formal-statement-end -->

<!-- definition-example-start: def-pde11-bessel-mode -->
**定義の確認**：以下で定義の条件を直接確認します。

$m=0$ なら角度に依存しない放射対称モードで、

$$
u_{0,k}(r)=J_0(j_{0,k}r).
$$

$r=1$ で $J_0(j_{0,k})=0$ なので Dirichlet 条件を直接満たします。
<!-- definition-example-end -->

一般の $m$ について原点の滑らかさも確認できます。$m\ge0$ なら級数の各項は

$$
r^{m+2j}e^{im\theta}
=
(x+iy)^m(x^2+y^2)^j,
$$

$m<0$ なら

$$
r^{|m|+2j}e^{im\theta}
=
(x-iy)^{|m|}(x^2+y^2)^j.
$$

従って $J_{|m|}(j_{|m|,k}r)e^{im\theta}$ は原点を含めて滑らかに延びます。半径方程式と $J_{|m|}(j_{|m|,k})=0$ から

$$
-\Delta u_{m,k}
=
j_{|m|,k}^2u_{m,k},
\qquad
u_{m,k}|_{r=1}=0
$$

が成り立つので、確かに円板の Dirichlet 固有モードです。

円板半径が $a$ なら $j_{|m|,k}r/a$ へ尺度変換し、固有値は $(j_{|m|,k}/a)^2$ です。

## 3. 円筒・膜・熱方程式へ戻る

円板上の熱方程式

$$
u_t=\kappa\Delta u
$$

では一つの Bessel モードは

$$
e^{-\kappa j_{|m|,k}^2t}
J_{|m|}(j_{|m|,k}r)e^{im\theta}
$$

と指数減衰します。波動方程式では同じ空間モードが角振動数 $cj_{|m|,k}$ で振動します。PDE7 の「固有値が時間応答を決める」が、長方形の正弦関数から円板の Bessel 関数へ置き換わっただけです。

## 4. 球座標では角方向が球面上の固有値問題になる

三次元球座標で

$$
\Delta
=
\frac1{r^2}\partial_r(r^2\partial_r)
+
\frac1{r^2}\Delta_{S^2},
$$

ここで

$$
\Delta_{S^2}
=
\frac1{\sin\theta}
\partial_\theta
(\sin\theta\,\partial_\theta)
+
\frac1{\sin^2\theta}\partial_{\phi\phi}
$$

です。

<a id="def-pde11-spherical-harmonic"></a>
<!-- formal-statement-start -->
> **定義（球面調和関数）**  
> 球面 $S^2$ 上の滑らかな関数 $Y$ が

$$
-\Delta_{S^2}Y
=
\ell(\ell+1)Y,
\qquad
\ell=0,1,2,\ldots
$$

> を満たすとき、次数 $\ell$ の球面調和関数という。
<!-- formal-statement-end -->

<!-- definition-example-start: def-pde11-spherical-harmonic -->
**定義の確認**：以下で定義の条件を直接確認します。

### 最初の低次数モード

$\ell=0$ では定数関数。$\ell=1$ では球面上の座標関数

$$
x/r,\qquad y/r,\qquad z/r
$$

が代表例です。
<!-- definition-example-end -->

## 5. Legendre 方程式は軸対称な球面調和関数

$\phi$ に依存しない $Y(\theta)=\Theta(\theta)$ を考えると

$$
-\frac1{\sin\theta}
\frac d{d\theta}
\left(
\sin\theta\frac{d\Theta}{d\theta}
\right)
=
\ell(\ell+1)\Theta.
$$

$x=\cos\theta$ と置きます。

<a id="prop-pde11-legendre"></a>
<!-- formal-statement-start -->
> **命題（球面固有値問題と Legendre 方程式）**  
> 軸対称な球面調和関数 $Y(\theta)=P(\cos\theta)$ は

$$
(1-x^2)P''-2xP'
+\ell(\ell+1)P=0
$$

> を満たす。両極で有限な多項式解が Legendre 多項式 $P_\ell$ である。
<!-- formal-statement-end -->

<!-- proof-start -->
### 証明

$x=\cos\theta$ なので

$$
\frac d{d\theta}
=
-\sin\theta\frac d{dx}.
$$

従って

$$
\sin\theta\frac{d\Theta}{d\theta}
=
-(1-x^2)P'(x).
$$

さらに $\theta$ 微分を取り $-1/\sin\theta$ を掛けると

$$
-\frac1{\sin\theta}
\frac d{d\theta}
\left(
\sin\theta\Theta'
\right)
=
-\frac d{dx}
\left(
(1-x^2)P'
\right).
$$

これが $\ell(\ell+1)P$ に等しいので展開して

$$
(1-x^2)P''-2xP'+\ell(\ell+1)P=0
$$

を得ます。

多項式解の存在もここで確認します。

$$
P(x)=\sum_{n=0}^{\infty}a_nx^n
$$

と置いて係数を比較すると

$$
(n+2)(n+1)a_{n+2}
+
\{\ell(\ell+1)-n(n+1)\}a_n
=
0,
$$

従って

$$
\boxed{
a_{n+2}
=
\frac{(n-\ell)(n+\ell+1)}
{(n+2)(n+1)}
a_n
}.
$$

偶数係数と奇数係数は独立に進みます。$\ell$ と同じ偶奇性の列を選ぶと $n=\ell$ で

$$
a_{\ell+2}=0
$$

となり、その後の同じ偶奇性の係数も全て0です。従って次数 $\ell$ の非零多項式解が得られます。有限和なので $x=\pm1$ でも有限です。

最後に

$$
P_\ell(1)=1
$$

となるよう定数倍を選んだものが Legendre 多項式 $P_\ell$ です。この係数漸化式は [ODE6 の Legendre 方程式](../ODE6/index.md) で得たものと一致します。
<!-- proof-end -->

## 6. 方位角を入れると associated Legendre 方程式になる

$Y(\theta,\phi)=\Theta(\theta)e^{im\phi}$ と置けば

$$
\partial_{\phi\phi}Y=-m^2Y.
$$

$x=\cos\theta$ へ移すと

$$
(1-x^2)\Theta_{xx}
-2x\Theta_x
+
\left[
\ell(\ell+1)
-
\frac{m^2}{1-x^2}
\right]\Theta
=
0.
$$

これは associated Legendre 方程式です。

ここで「正則解を選ぶ」とだけ言って済ませず、Legendre 多項式から実際に作ります。$0\le m\le\ell$ に対して

$$
P_\ell^m(x)
:=
(-1)^m
(1-x^2)^{m/2}
\frac{d^m}{dx^m}P_\ell(x)
$$

と定めます。

<a id="prop-pde11-spherical-eigenmode"></a>
<!-- formal-statement-start -->
> **命題（標準球面調和モード）**  
> $\ell=0,1,2,\ldots$、$|m|\le\ell$ とする。上の定義で得た associated Legendre 関数を用いれば

$$
Y_\ell^m(\theta,\phi)
=
C_{\ell m}
P_\ell^{|m|}(\cos\theta)e^{im\phi}
$$

> は球面上で滑らかで、

$$
-\Delta_{S^2}Y_\ell^m
=
\ell(\ell+1)Y_\ell^m
$$

> を満たす。定数 $C_{\ell m}$ は規格化により選べる。
<!-- formal-statement-end -->

### 証明の見取り図

Legendre 方程式を $m$ 回微分すると、$Q=d^mP_\ell/dx^m$ が満たす方程式が得られます。そこへ $(1-x^2)^{m/2}$ を掛けると、極 $x=\pm1$ に見える特異項がちょうど associated Legendre 方程式の $m^2/(1-x^2)$ 項へ組み替わります。

<!-- proof-start -->
### 証明

Legendre 方程式

$$
(1-x^2)P_\ell''
-
2xP_\ell'
+
\ell(\ell+1)P_\ell
=
0
$$

を $m$ 回微分し、

$$
Q(x)
=
\frac{d^m}{dx^m}P_\ell(x)
$$

と置きます。Leibniz 則を使うと

$$
(1-x^2)Q''
-
2(m+1)xQ'
+
\{\ell(\ell+1)-m(m+1)\}Q
=
0.
$$

次に

$$
A(x)=(1-x^2)^{m/2},
\qquad
\Theta(x)=A(x)Q(x)
$$

と置きます。直接微分すると

$$
\frac{A'}A
=
-\frac{mx}{1-x^2},
$$

$$
\frac{A''}A
=
-\frac{m}{1-x^2}
+
\frac{m(m-2)x^2}{(1-x^2)^2}.
$$

これを

$$
(1-x^2)\Theta''-2x\Theta'
$$

へ代入して $Q''$ を上の微分方程式で消去すると、$Q'$ の項は打ち消し合い、

$$
(1-x^2)\Theta''
-
2x\Theta'
+
\left[
\ell(\ell+1)
-
\frac{m^2}{1-x^2}
\right]\Theta
=
0.
$$

従って $\Theta=(-1)^mAQ=P_\ell^m$ は associated Legendre 方程式を満たします。

球面上の滑らかさも式から確認できます。$x=\cos\theta$ なら

$$
(1-x^2)^{m/2}
=
\sin^m\theta,
$$

なので

$$
P_\ell^m(\cos\theta)e^{im\phi}
=
(-1)^m
\left(\sin\theta\,e^{i\phi}\right)^m
Q(\cos\theta).
$$

単位球面上では

$$
\sin\theta\,e^{i\phi}=x+iy,
\qquad
\cos\theta=z,
$$

なので

$$
P_\ell^m(\cos\theta)e^{im\phi}
=
(-1)^m(x+iy)^m Q(z).
$$

右辺は球面座標の特異性を含まない多項式表示です。従って方位角 $\phi$ が定まらなくなる南北両極でも滑らかに延びます。$m<0$ の標準モードは複素共役を取ればよいので、$|m|\le\ell$ の全てを得ます。

最後に変数分離式へ戻せば

$$
-\Delta_{S^2}Y_\ell^m
=
\ell(\ell+1)Y_\ell^m.
$$

定数倍 $C_{\ell m}$ は固有値方程式を変えません。
<!-- proof-end -->

## 7. 球内部の調和関数

<a id="prop-pde11-solid-harmonic"></a>
<!-- formal-statement-start -->
> **命題（標準球面調和モードから得る solid harmonic）**  
> 標準球面調和モード $Y_\ell^m$ に対し

$$
u_{\ell m}(r,\omega)
=
r^\ell Y_\ell^m(\omega)
$$

> は原点を含む $\mathbb R^3$ 全体へ滑らかに延び、調和的である。また原点外では

$$
r^{-\ell-1}Y_\ell^m(\omega)
$$

> も調和的である。従って標準モードの有限線形結合についても同じ結論が成り立つ。
<!-- formal-statement-end -->

### 証明の見取り図

まず球座標 Laplacian から半径指数 $q=\ell,-\ell-1$ を得ます。ただし、それだけでは $r^\ell Y_\ell^m$ が **原点でも**滑らかとは言えません。原点の正則性は、前節で作った $P_\ell^m$ の具体式を使って $r^\ell Y_\ell^m$ が実際には同次多項式になることまで確認します。

<!-- proof-start -->
### 証明

原点外では

$$
\Delta(RY)
=
\left(
R''+\frac2rR'
\right)Y
+
\frac{R}{r^2}\Delta_{S^2}Y.
$$

$\Delta_{S^2}Y=-\ell(\ell+1)Y$ を使うと、調和性は

$$
r^2R''+2rR'-\ell(\ell+1)R=0
$$

と同値です。$R=r^q$ を代入すると

$$
q(q-1)+2q-\ell(\ell+1)=0,
$$

すなわち

$$
(q-\ell)(q+\ell+1)=0.
$$

従って $q=\ell$ または $q=-\ell-1$ です。これで二つの枝が $r>0$ で調和的なことは分かりました。

次に正則枝 $r^\ell Y_\ell^m$ の原点を調べます。$m\ge0$ とし、

$$
Q_{\ell m}(s)
=
\frac{d^m}{ds^m}P_\ell(s)
$$

と置きます。前節の式から、定数倍を除けば

$$
r^\ell
P_\ell^m(\cos\theta)e^{im\phi}
=
(-1)^m
(x+iy)^m
r^{\ell-m}
Q_{\ell m}\left(\frac zr\right).
$$

Legendre 多項式 $P_\ell$ は $\ell$ と同じ偶奇性を持つので、$Q_{\ell m}$ の各単項式は

$$
s^{\ell-m-2j}
$$

の形です。従って

$$
r^{\ell-m}
\left(\frac zr\right)^{\ell-m-2j}
=
z^{\ell-m-2j}r^{2j}.
$$

ここで

$$
r^2=x^2+y^2+z^2
$$

だから、右辺は $x,y,z$ の多項式です。したがって

$$
r^\ell Y_\ell^m
$$

は次数 $\ell$ の同次多項式として原点まで滑らかに延びます。

この多項式は $r>0$ で既に $\Delta u_{\ell m}=0$ を満たします。$\Delta u_{\ell m}$ 自身も多項式であり、原点外の開集合で0なので恒等的に0です。従って原点でも調和的です。

$m<0$ のモードは $m>0$ の複素共役なので同じ結論です。一方 $r^{-\ell-1}$ の枝は原点で特異ですが、最初の半径方程式の計算により $\mathbb R^3\setminus\{0\}$ では調和的です。
<!-- proof-end -->

## 8. 有限モードの球 Dirichlet 問題

境界データが有限和

$$
g(\omega)=\sum_{\ell=0}^L\sum_{m=-\ell}^{\ell}a_{\ell m}Y_\ell^m(\omega)
$$

なら単位球内部の調和延長は

$$
u(r,\omega)
=
\sum_{\ell=0}^L\sum_{m=-\ell}^{\ell}
a_{\ell m}r^\ell Y_\ell^m(\omega).
$$

有限和なので微分交換に問題はなく、各項は前節で調和的、$r=1$ で境界データへ一致します。

一般の $L^2(S^2)$ に対する球面調和関数の完全性は、コンパクト自己共役作用素を用いる一般の固有関数完全性理論と接続する結果なので、本章では意図的に有限モードで閉じます。

## 演習

### Level A

#### PDE11-A01 Bessel 方程式の導出
- Level: A

$u=R(r)e^{im\theta}$ を $-\Delta u=\lambda u$ へ代入し半径方程式を導け。

<!-- solution-start -->
##### 詳細解答
$u_{\theta\theta}=-m^2u$ を極座標 Laplacian へ代入すると
$$
-R''-\frac1rR'+\frac{m^2}{r^2}R=\lambda R.
$$
$r^2$ を掛けて本文の Bessel 型方程式を得ます。
<!-- solution-end -->

#### PDE11-A02 Dirichlet 境界
- Level: A

半径 $a$ の円板で $J_m(kr)e^{im\theta}$ が境界条件を満たす条件を求めよ。

<!-- solution-start -->
##### 詳細解答
$r=a$ で0なので $J_m(ka)=0$。従って $ka=j_{m,k}$、すなわち $k=j_{m,k}/a$ です。
<!-- solution-end -->

#### PDE11-A03 Legendre の最初の多項式
- Level: A

$P_0(x)=1$, $P_1(x)=x$ がそれぞれ $\ell=0,1$ の Legendre 方程式を満たすことを確認せよ。

<!-- solution-start -->
##### 詳細解答
$P_0'=P_0''=0$ なので $\ell=0$ の式は0。$P_1'=1,P_1''=0$ なので $-2x+2x=0$ です。
<!-- solution-end -->

#### PDE11-A04 solid harmonic
- Level: A

$\ell=1$ で $rY_1$ が一次調和多項式になることを $Y=x/r$ の例で確認せよ。

<!-- solution-start -->
##### 詳細解答
$r(x/r)=x$。$\Delta x=0$ なので確かに調和的です。
<!-- solution-end -->

### Level B

#### PDE11-B01 円板熱方程式
- Level: B

$u(0,r,\theta)=J_0(j_{0,1}r)$、零 Dirichlet 境界の熱方程式を解け。

<!-- solution-start -->
##### 詳細解答
空間モードの固有値は $j_{0,1}^2$ なので
$$
u(t,r)=e^{-\kappa j_{0,1}^2t}J_0(j_{0,1}r).
$$
<!-- solution-end -->

#### PDE11-B02 軸対称球面モード
- Level: B

$P_2(x)=(3x^2-1)/2$ が $\ell=2$ の Legendre 方程式を満たすことを確認せよ。

<!-- solution-start -->
##### 詳細解答
$P_2'=3x$, $P_2''=3$。代入すると
$$
3(1-x^2)-6x^2+6\frac{3x^2-1}{2}=0.
$$
<!-- solution-end -->

#### PDE11-B03 球内部の境界延長
- Level: B

単位球の境界データ $g(\theta)=P_2(\cos\theta)$ の調和延長を求めよ。

<!-- solution-start -->
##### 詳細解答
次数2の球面調和モードなので
$$
u(r,\theta)=r^2P_2(\cos\theta)
$$
です。各項は solid harmonic で、$r=1$ で境界値に一致します。
<!-- solution-end -->

### Level C

#### PDE11-C01 長方形から円板・球へ
- Level: C

PDE7 の長方形の正弦固有モードと、本章の円板 Bessel モード・球面調和モードを比較し、「変数分離で特殊関数が生まれる理由」を説明せよ。

<!-- solution-start -->
##### 詳細解答
直交座標では Laplacian が各座標の二階微分の和で、境界条件から正弦・余弦が固有関数になります。極座標では尺度因子 $1/r,1/r^2$ が入り、半径方程式が Bessel 方程式になります。球座標では角度部分が球面 Laplacian の固有値問題となり Legendre / associated Legendre が現れます。特殊関数は「変な公式」ではなく、座標幾何と境界条件に適合した Laplacian の固有関数です。
<!-- solution-end -->

## 9. 章末チェック

- 円板の変数分離から Bessel 方程式を導ける。
- Bessel 零点と Dirichlet 固有値を結び付けられる。
- 球面 Laplacian から Legendre 方程式を導ける。
- 球面調和関数と solid harmonic を説明できる。
- Bessel / Legendre を熱・波動・Laplace の固有モードへ戻せる。
