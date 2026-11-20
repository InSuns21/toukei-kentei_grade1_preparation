# MIR1-10 quinticのPicard–Fuchs作用素

<!-- definition-example-audit: strict -->

## 1. 極次数低減を微分方程式にする

[前講の五重極の低減](../MIR1-09/index.md#prop-mir1-09-fifth-pole)では、周期の四階微分に現れる五重極を四重極へ下げた。しかし、これだけでは四階微分を低階の微分で表せない。四重極の分子も順に減らし、**同じ周期の四階・三階・二階・一階・零階微分を結ぶ**必要がある。

本講ではその係数をすべて計算し、$\psi$ から $z$ へ変数を移して周期の四階微分方程式を得る。次講で級数を求めるため、方程式の正則特異点と対象となる周期の範囲も確認する。

[滑らかなDwork族](../MIR1-06/index.md#prop-mir1-06-smooth-locus)と[その留数周期](../MIR1-07/index.md#def-mir1-07-period)に従い、

$$
F_\psi=\sum_{i=0}^4x_i^5-5\psi P,\qquad
P=x_0x_1x_2x_3x_4,\qquad
\Omega=\sum_{i=0}^4(-1)^ix_i\,dx_0\wedge\cdots\wedge\widehat{dx_i}\wedge\cdots\wedge dx_4
$$

とする。$\psi^5\ne1$ の小さい単連結領域で、各 $X_\psi=\{F_\psi=0\}\subset\mathbb P^4$ を避けるコンパクトな閉管状4サイクル $T$ を平行移動して

$$
\Pi(\psi)=\frac{1}{2\pi i}\int_T\frac{\Omega}{F_\psi}
$$

を考える。$\psi$ 微分ではサイクルを局所自明化して固定する。[周期の正則性](../MIR1-07/index.md#prop-mir1-07-period-holomorphic)により、分母が零にならないコンパクト集合上で微分を積分内へ移せる。

## 2. 周期系を消す微分方程式とは何か

一つの特殊なサイクルの周期だけを消す式と、局所的に平行移動する**対象となるサイクルすべて**の周期を消す式は別である。後者を目指す。

<a id="def-mir1-10-pf-operator"></a>

<!-- formal-statement-start -->
> **定義（周期系のPicard–Fuchs作用素）**
>
> 複素パラメータ $z$ の連結開集合 $V\subset\mathbb C^*$ と、その上で局所的に平行移動するサイクルの周期関数の族 $\{\omega_\gamma(z)\}$ を考える。$a_j(z)$ を $V$ 上の正則関数とし、$a_m$ が恒等的には零でないとする。
>
> 線形微分作用素

$$
\mathcal L=\sum_{j=0}^m a_j(z)\theta^j,\qquad
\theta=z\frac{d}{dz}
$$

> が各対象周期を消すこと、すなわち次の関係を満たすことを、この定義の条件とする。

$$
\mathcal L\omega_\gamma=0.
$$

> 最高の微分次数 $m$ を方程式の階数という。最小階数性は別途確認する。
<!-- formal-statement-end -->

<!-- definition-example-start: def-mir1-10-pf-operator -->

**定義の確認**（実際に二つの周期を同時に消す直接例）。固定した空間 $Y=(\mathbb C^*)^2$ の座標を $(u,v)$ とする。$z\in V$ に応じて変わる1形式と、$z$ に依存しない二つの閉1サイクルを

$$
\alpha_z=\frac{1}{2\pi i}\left(\frac{du}{u}+z\frac{dv}{v}\right),\qquad
\gamma_1(s)=(e^{2\pi i s},1),\qquad
\gamma_2(s)=(1,e^{2\pi i s})\quad(0\le s\le1)
$$

と定める。いずれも $u,v\ne0$ の領域で定義され、$\alpha_z$ の係数は $V$ 上で正則、サイクルは固定されている。各経路で $du/u$ または $dv/v$ が $2\pi i\,ds$ になることから

$$
\omega_{\gamma_1}(z)=\int_{\gamma_1}\alpha_z=1,\qquad
\omega_{\gamma_2}(z)=\int_{\gamma_2}\alpha_z=z
$$

を直接得る。したがって、この二つの積分値が定義でいう**周期関数の族** $\{1,z\}$ をなす。$\theta=z\,d/dz$ は $u,v$ とサイクルを固定して $z$ だけを微分するので、$\theta1=0$、$\theta z=z$ となり、

$$
\theta(\theta-1)1=0,\qquad
\theta(\theta-1)z=\theta(z-z)=0.
$$

よって二階作用素 $\theta(\theta-1)$ は両方の周期を消す。一階作用素 $a(z)\theta+b(z)$ が両方を消すなら、$1$ へ作用させて $b=0$、$z$ へ作用させて $az=0$、$z\ne0$ から $a=0$ となる。従って、非零の一階作用素は存在しない。零階作用素も、周期 $1$ を消すなら零作用素に限られる。この例は、対象周期の族を実際に構成したうえで「一つの解を消す」と「二つの独立な解を同時に消す」の差を示している。

<!-- definition-example-end -->

[前講で証明した全微分を除く極次数低減の等式](../MIR1-09/index.md#prop-mir1-09-pole-reduction)は、任意の閉4サイクルで積分して等しいという意味で使う。したがってこれから得られる微分方程式は、特定の周期級数だけを代入して発見した式ではない。

## 3. どの単項式も同じ手順で低減する

分子の指数を五つ並べて計算する。$a=(a_0,\ldots,a_4)$ を非負整数の組、$|a|=\sum_i a_i$ とし、$x^a=\prod_i x_i^{a_i}$ と置く。$e_i$ は第 $i$ 成分だけが1の組、$\boldsymbol1=(1,1,1,1,1)$ とする。

<a id="prop-mir1-10-monomial-reduction"></a>

<!-- formal-statement-start -->
> **命題（単項式の一段低減漸化式）**
>
> $\psi\in\mathbb C$ とし、$F_\psi=\sum_{i=0}^4x_i^5-5\psi P$ とする。$k\ge2$、$a\in\mathbb Z_{\ge0}^5$、$|a|=5(k-1)$ を満たすとき、$x^a\Omega/F_\psi^k$ の閉4サイクル積分を $J_k(a)$ と書く（全てに共通の係数 $1/(2\pi i)$ を含める）。$a_i\ge4$ なら

$$
J_k(a)=\psi J_k(a+\boldsymbol1-5e_i)
+\frac{a_i-4}{5(k-1)}J_{k-1}(a-5e_i)
$$

> が成り立つ。ただし $a_i=4$ のとき第二項を零とし、その場合には負の指数を持つ $J_{k-1}$ は定義しない。すべての積分は $X_\psi$ を避ける同一の閉4サイクル上で取る。
<!-- formal-statement-end -->

### 証明の見取り図

[Griffiths–Dworkの極次数低減公式](../MIR1-09/index.md#prop-mir1-09-pole-reduction)を、$B_i=x^{a-4e_i}/5$、ほかの $B_j=0$ に適用する。$x_i^4$ を $\psi\prod_{j\ne i}x_j$ に置換した余りが、一つ低い極の微分項になる。

<!-- proof-start -->
### 証明

$a_i\ge4$ だから $B_i=x^{a-4e_i}/5$ は多項式であり、

$$
\deg B_i=5(k-1)-4=5k-9
$$

である。[極次数低減公式](../MIR1-09/index.md#prop-mir1-09-pole-reduction)の仮定に一致する。偏微分

$$
\partial_iF_\psi=5x_i^4-5\psi\prod_{j\ne i}x_j
$$

を掛ければ

$$
B_i\partial_iF_\psi
=x^a-\psi x^{a+\boldsymbol1-5e_i},
\qquad
\partial_iB_i=\frac{a_i-4}{5}x^{a-5e_i}.
$$

$a_i=4$ のとき後者は零で、負の指数を持つ項を導入しない。$a_i>4$ のときは $a_i\ge5$ なので後者の指数は非負である。公式を代入して

$$
\frac{(x^a-\psi x^{a+\boldsymbol1-5e_i})\Omega}{F_\psi^k}
\equiv\frac{a_i-4}{5(k-1)}
\frac{x^{a-5e_i}\Omega}{F_\psi^{k-1}}\pmod d
$$

を得る。分子次数は右辺で $5(k-2)$、置換後の左辺で $5(k-1)$ のままであり、ともに射影形式として定義できる。[閉サイクルへのStokesの適用](../MIR1-09/index.md#prop-mir1-09-pole-reduction)で全微分を消して命題の等式を得る。$\square$
<!-- proof-end -->

**最初の一手を確認する。** $k=2$、$a=(5,0,0,0,0)$、$i=0$ では

$$
J_2(5,0,0,0,0)
=\psi J_2(1,1,1,1,1)+\frac15J_1(0,0,0,0,0).
$$

これは[前講の二重極の低減](../MIR1-09/index.md#prop-mir1-09-second-pole)と一致する。以下では五つの指数の順を、どの変数を先に置換するかに応じて入れ替えて**表示するだけ**で、一般の異なる単項式の周期が対称性だけで等しいとは仮定しない。置換の各式は、その表示に対応する各変数について個別に成り立つ。

## 4. 五重極をすべて低い極へ下げる

記号を短くするため、$j=0,1,2,3,4$ に対し

$$
I_j=J_{j+1}(j,j,j,j,j)
=\frac1{2\pi i}\int_T\frac{P^j\Omega}{F_\psi^{j+1}}
$$

と置く。たとえば $I_0$ は単純極の周期、$I_3$ は四重極の周期である。

まず前節の漸化式を五重極 $I_4$ に五回適用する。各回で指数4以上の変数を一つ選び、順に

$$
(4,4,4,4,4)\to(5,5,5,5,0)\to(6,6,6,1,1)
\to(7,7,2,2,2)\to(8,3,3,3,3)\to(4,4,4,4,4)
$$

と進む。これは[前講の五段階の置換](../MIR1-09/index.md#prop-mir1-09-fifth-pole)を積分に直したものである。$J_k(a)$ の引数はこの順で選んだ座標の指数を表示している。最初の一回は $a_i=4$ なので低い極の寄与が零である。その後の四回は係数が順に $1/20,2/20,3/20,4/20$ となる。$J_4$ の補助量を

$$
A=J_4(5,5,5,0,0),\quad
B=J_4(6,6,1,1,1),\quad
C=J_4(7,2,2,2,2)
$$

と表せば

$$
(1-\psi^5)I_4
=\frac{\psi}{20}A+\frac{\psi^2}{10}B
+\frac{3\psi^3}{20}C+\frac{\psi^4}{5}I_3.
$$

ここでの $A,B,C$ は単項式の座標を適宜並べ替えた代表的表示であり、置換中の各出現では[単項式の一段低減漸化式](#prop-mir1-10-monomial-reduction)を対応する変数に適用する。異なるサイクルを同一視してはいない。

次に、四重極から三重極へ下げる。その際に必要な二つの三重極と一つの二重極は、同じ漸化式から

$$
\begin{aligned}
J_2(5,0,0,0,0)&=\psi I_1+\frac15I_0,\\
J_3(6,1,1,1,1)&=\psi I_2+\frac15I_1,\\
J_3(5,5,0,0,0)&=\psi J_3(6,1,1,1,1)+\frac1{10}J_2(5,0,0,0,0)\\
&=\psi^2I_2+\frac{3\psi}{10}I_1+\frac1{50}I_0.
\end{aligned}
$$

四重極の $C$ から順番に処理すると、係数の出所まで追える。

$$
\begin{aligned}
C&=\psi I_3+\frac15I_2,\\
B&=\psi C+\frac2{15}J_3(6,1,1,1,1)
=\psi^2I_3+\frac{\psi}{3}I_2+\frac2{75}I_1,\\
A&=\psi B+\frac1{15}J_3(5,5,0,0,0)\\
&=\psi^3I_3+\frac{2\psi^2}{5}I_2
+\frac{7\psi}{150}I_1+\frac1{750}I_0.
\end{aligned}
$$

例えば $B$ の $I_2$ の係数は $\psi/5+2\psi/15=\psi/3$、$A$ の $I_1$ の係数は $2\psi/75+\psi/50=7\psi/150$ である。これらを五重極の関係に代入し、$I_j$ ごとに足すと

$$
\begin{aligned}
(1-\psi^5)I_4
={}&\psi^4\left(\frac1{20}+\frac1{10}+\frac3{20}+\frac15\right)I_3\\
&+\psi^3\left(\frac1{50}+\frac1{30}+\frac3{100}\right)I_2\\
&+\psi^2\left(\frac7{3000}+\frac2{750}\right)I_1
+\frac{\psi}{15000}I_0\\
={}&\frac{\psi^4}{2}I_3+\frac{\psi^3}{12}I_2
+\frac{\psi^2}{200}I_1+\frac{\psi}{15000}I_0.
\end{aligned}
$$

分母 $1-\psi^5$ で割る必要はない形にまとめた。$\psi^5=1$ を外すのは、これを滑らかな族の周期方程式として扱う条件であり、五重極の最終関係自体を特異ファイバー上の平坦な周期と読み替えてはならない。

## 5. 四階Picard–Fuchs作用素を導く

[高次周期微分公式](../MIR1-08/index.md#prop-mir1-08-pole-derivatives)は、$T$ を局所的に固定できる領域で

$$
\Pi^{(j)}(\psi)=5^j j! I_j,\qquad 0\le j\le4
$$

を与える。$j=2$ なら係数は $5^2\cdot2!=50$、$j=4$ なら $5^4\cdot4!=15000$ である。五重極の最終関係へ代入して得る $\psi$ 座標の方程式から、[既習の座標変換](../MIR1-08/index.md#prop-mir1-08-z-derivative)により $z$ 座標の作用素を作る。

<a id="thm-mir1-10-quintic-pf"></a>

<!-- formal-statement-start -->
> **定理（quinticのPicard–Fuchs作用素）**
>
> $F_\psi=\sum_{i=0}^4x_i^5-5\psi\prod_i x_i$ とし、$\psi\ne0$、$\psi^5\ne1$ の小さい単連結開集合で滑らかなファイバーの閉サイクルを平行移動する。留数の周期を $\Pi(\psi)=(2\pi i)^{-1}\int_T\Omega/F_\psi$ とする。
>
> $z=(5\psi)^{-5}$ の局所逆分枝を固定して $\omega(z)=\psi(z)\Pi(\psi(z))$ と再規格化し、$\theta=z\,d/dz$ と置く。このときすべての対象周期について

$$
\mathcal L\omega=0,\qquad
\boxed{\mathcal L=\theta^4-5z(5\theta+1)(5\theta+2)(5\theta+3)(5\theta+4)}
$$

> が成り立つ。同値な $\psi$ 座標の関係は

$$
(\psi^5-1)\Pi^{(4)}+10\psi^4\Pi^{(3)}
+25\psi^3\Pi''+15\psi^2\Pi'+\psi\Pi=0
$$

> である。微分は上式では $\psi$、作用素では $z$ に関する。ここで扱うのは[Greene–Plesser型の対角群](../MIR1-04/index.md#def-mir1-04-phase-group)に不変な周期部分であり、元の滑らかなquinticの $H^3$ 全体の階数を4と主張しない。
<!-- formal-statement-end -->

### 証明の見取り図

五重極の最終関係へ各 $I_j=\Pi^{(j)}/(5^jj!)$ を代入すれば $\psi$ 方程式が出る。$z$ への変換では、$\Pi$ をそのまま $z$ の関数にするのではなく、**$\omega=\psi\Pi$ の規格化**を使う。$\theta$ を $\psi$ 微分に直し、二つの作用素の差が $\psi$ 方程式の $1/625$ 倍になることを示す。

<!-- proof-start -->
### 証明

五重極の最終関係に微分公式を代入する。四階は $I_4=\Pi^{(4)}/15000$、三階は $I_3=\Pi^{(3)}/750$、二階は $I_2=\Pi''/50$、一階は $I_1=\Pi'/5$、零階は $I_0=\Pi$ である。両辺を15000倍すると

$$
(1-\psi^5)\Pi^{(4)}
=10\psi^4\Pi^{(3)}+25\psi^3\Pi''
+15\psi^2\Pi'+\psi\Pi.
$$

左辺を移せば定理の $\psi$ 方程式を得る。

次に $z=5^{-5}\psi^{-5}$ と $\psi\ne0$ から

$$
\frac{dz}{d\psi}=-\frac{5z}{\psi},\qquad
\theta=z\frac{d}{dz}=-\frac{\psi}{5}\frac{d}{d\psi}
$$

となる。[局所逆分枝の存在と微分](../MIR1-08/index.md#prop-mir1-08-z-derivative)を使っており、$z=0$ へ代入する計算ではない。$E_\psi=\psi\,d/d\psi$ と置くと、任意の $j$ について

$$
E_\psi(\psi\Pi)=\psi(E_\psi+1)\Pi,\qquad
\theta^j(\psi\Pi)=\frac{(-1)^j\psi}{5^j}(E_\psi+1)^j\Pi.
$$

特に、$E_\psi^2\Pi=\psi\Pi'+\psi^2\Pi''$ 等を展開すれば

$$
\theta^4(\psi\Pi)=\frac{\psi}{625}
\left(\Pi+15\psi\Pi'+25\psi^2\Pi''
+10\psi^3\Pi^{(3)}+\psi^4\Pi^{(4)}\right).
$$

もう一方では、$5\theta+j$ を $\psi\Pi$ に作用させると $\psi(j-1-E_\psi)\Pi$ になる。$j=1,2,3,4$ の積は

$$
\begin{aligned}
\prod_{j=1}^4(5\theta+j)(\psi\Pi)
&=\psi E_\psi(E_\psi-1)(E_\psi-2)(E_\psi-3)\Pi\\
&=\psi^5\Pi^{(4)}.
\end{aligned}
$$

最後の等号は $E_\psi(E_\psi-1)\cdots(E_\psi-3)=\psi^4d^4/d\psi^4$ を積の微分で順次確認して得る。$5z=1/(625\psi^5)$ なので、二つの式を引くと

$$
\mathcal L(\psi\Pi)=\frac1{625}
\left[(\psi^5-1)\Pi^{(4)}
+10\psi^4\Pi^{(3)}+25\psi^3\Pi''
+15\psi^2\Pi'+\psi\Pi\right]=0.
$$

五重極の最終関係は特別なサイクルの値ではなく、[極次数低減](../MIR1-09/index.md#prop-mir1-09-pole-reduction)から**有理微分形式の全微分を除いた恒等式**として得た。従って、コンパクトな閉サイクルを局所的に平行移動するどの周期にも同じ作用素が適用される。$\square$
<!-- proof-end -->

**規格化を間違えると何が壊れるか。** $\Pi$ 自身へ上記の $\mathcal L$ を作用させるのではなく $\omega=\psi\Pi$ に作用させる。前者では $\theta$ が $\Pi$ を微分する際、上記の $E_\psi+1$ の $+1$ が消えるため、四つの一次因子の定数項が変わってしまう。

## 6. 正則特異点と解の範囲

[線形微分方程式の常点・正則特異点](../../../解析系/ODE/ODE6/index.md#def-ode6-point-classification)は、最高階の係数で割った後の低階係数の極の強さで判定する。既習のODE6では二階方程式を扱った。四階方程式では、最高階係数を $p_4$、低階係数を $p_j$（$j=0,1,2,3$）としたとき、正則特異点の候補 $c$ の近傍で $(z-c)^{4-j}p_j/p_4$ が正則に延長できることを正則特異点の判定条件とする。無限遠では $w=1/z$ を局所変数として同じ条件を使う。

また[ODE6の指標方程式](../../../解析系/ODE/ODE6/index.md#def-ode6-indicial-equation)と同じ考えで、$z=c$ に $(z-c)^\rho$ を代入して最低次の係数を零とする式を指標を決める方程式と呼ぶ。以下では四階について係数を直接計算する。

作用素を $\theta$ の多項式として展開する。積の低次係数まで確認すると

$$
(5\theta+1)(5\theta+2)(5\theta+3)(5\theta+4)
=625\theta^4+1250\theta^3+875\theta^2+250\theta+24,
$$

よって

$$
\mathcal L=(1-3125z)\theta^4-6250z\theta^3
-4375z\theta^2-1250z\theta-120z.
$$

四階の最高微分係数は $z^4(1-3125z)$。これを零とする点は、$z=0$ と $z=1/3125$ である。$z=0$ は [Dwork族の境界](../MIR1-06/index.md#prop-mir1-06-boundary) $\psi=\infty$、$z=1/3125$ は [特異ファイバー](../MIR1-06/index.md#prop-mir1-06-z-discriminant) $\psi^5=1$ に対応する。$z=\infty$ は $\psi=0$ に対応する商座標の点である。

<a id="prop-mir1-10-regular-singular"></a>

<!-- formal-statement-start -->
> **命題（Picard–Fuchs方程式の正則特異点）**
>
> $\theta=z\,d/dz$ とし、次の作用素による四階方程式を考える。

$$
\mathcal L=\theta^4-5z\prod_{j=1}^4(5\theta+j).
$$

> Riemann球面上でこの方程式の正則特異点は次の3点に限られ、いずれも正則特異点である。

$$
z=0,\qquad z=\frac1{3125},\qquad z=\infty.
$$

> $z=0$ の指標多項式は $\rho^4$ である。$z=\infty$ では局所変数 $w=1/z$ の指標根が $1/5,2/5,3/5,4/5$ となる。
<!-- formal-statement-end -->

### 証明の見取り図

有限点では展開した作用素の最高微分係数を確認し、$z=0$ には $\theta$ 表示、$z=1/3125$ には最高係数の単純零点を使う。無限遠では $w=1/z$ に変換して $w$ を掛ければ、$w=0$ での指標方程式が読める。

<!-- proof-start -->
### 証明

$\theta^4=z^4d^4/dz^4+6z^3d^3/dz^3+7z^2d^2/dz^2+zd/dz$ なので、展開した作用素の四階係数は $p_4(z)=z^4(1-3125z)$。それ以外の有限点で $p_4\ne0$ だから通常点である。

$z=0$ では展開した作用素が $\sum_{j=0}^4b_j(z)\theta^j$ の形を持ち、係数 $b_j$ は正則、$b_4(0)=1$。$\omega=z^\rho$ を代入した最低次は $\rho^4z^\rho$ なので指標多項式は $\rho^4$。このEuler形は正則特異の条件を満たす。

$c=1/3125$ の近傍では、$p_4(z)$ は $z=c$ に一位の零点を持ち、ほかの係数 $p_j(z)$ は多項式である。方程式を $p_4$ で割ると、$p_j/p_4$ は高々一位の極を持つ。従って $(z-c)^{4-j}p_j/p_4$ は $j=0,1,2,3$ で正則となり、Fuchsの正則特異条件を満たす。

最後に $w=1/z$ とすると $\theta=-w\,d/dw$ である。方程式に $w$ を掛けて

$$
\left[w\left(-w\frac{d}{dw}\right)^4
-5\prod_{j=1}^4\left(j-5w\frac{d}{dw}\right)\right]\omega=0
$$

となる。括弧内は $w\,d/dw$ の多項式で、最高次数係数は $w=0$ で $-5(-5)^4\ne0$。従って正則特異であり、$\omega=w^\rho$ の最低次係数は $-5\prod_{j=1}^4(j-5\rho)$。根は $\rho=j/5$ である。$\square$
<!-- proof-end -->

**四階とは何の四次元か。** [鏡像のHodge数](../MIR1-05/index.md#prop-mir1-05-hodge-count)では、crepant解消したミラー側の $h^{2,1}=1$ から $b_3=2+2h^{2,1}=4$ となる。一方、元の滑らかなquinticでは $h^{2,1}=101$ なので $b_3=204$ である。本講の低減は、$P^j$ を含む**対角群不変の変動部分**を閉じる。全204次元へ四階方程式がそのまま基底を与えると解釈してはいけない。

ここで四つの独立な方向が現れる理由も検算できる。Fermat点 $\psi=0$ では[既習のJacobianイデアル](../MIR1-09/index.md#def-mir1-09-jacobian-ideal)が $(x_0^4,\ldots,x_4^4)$ である。商環の単項式基底は、各変数の指数 $a_i$ が $0,1,2,3$ のものから得る。

[Greene–Plesser型の位相群](../MIR1-04/index.md#def-mir1-04-phase-group)を五乗根 $\lambda_i$ による対角作用で表す。指数列 $a=(a_0,\ldots,a_4)$ の単項式への作用は

$$
x^a\longmapsto\left(\prod_{i=0}^4\lambda_i^{a_i}\right)x^a,
\qquad \prod_{i=0}^4\lambda_i=1
$$

である。次数が5の倍数なので、全座標の共通五乗根倍は単項式に自明に作用し、位相群の商と整合する。任意の $i\ne j$ について $\lambda_i=\zeta,\lambda_j=\zeta^{-1}$、他を1と置ける。不変であるための必要条件は

$$
\zeta^{a_i-a_j}=1,\qquad a_i\equiv a_j\pmod5
$$

となる。逆に全指数が $a_i\equiv r\pmod5$ なら、作用因子は $(\prod_i\lambda_i)^r=1$ なので十分でもある。各指数は0から3なので全て等しく、次数 $0,5,10,15$ での候補は

$$
1,\qquad P,\qquad P^2,\qquad P^3
$$

の各一つであり、いずれもJacobianイデアルに属さない。この四つの次数をそれぞれ $H^{3,0},H^{2,1},H^{1,2},H^{0,3}$ の原始コホモロジーの対応する次数へ同一視するのは**Griffithsの留数とJacobian環の比較定理**という標準的な外部入力を用いる部分である。その比較定理の完全な一般証明を本講で導いたとはしない。今回直接証明したのは、全ての対象周期に作用する四階の微分関係と四つの不変な単項式の計算である。

## 7. 次講の級数を検査するための係数関係

$z=0$ で指標根が四重の零になることから、まず正則な局所解を $\omega(z)=\sum_{d\ge0}a_dz^d$ と探すのが自然である。まだ一般の対数解を構成する段階ではない。

<a id="prop-mir1-10-coefficient-recurrence"></a>

<!-- formal-statement-start -->
> **命題（正則冪級数に対する係数漸化式）**
>
> $\mathcal L=\theta^4-5z\prod_{j=1}^4(5\theta+j)$ とする。$z=0$ の近傍で収束する冪級数 $\omega(z)=\sum_{d\ge0}a_dz^d$ が $\mathcal L\omega=0$ を満たすなら、各 $d\ge1$ について

$$
d^4a_d=5(5d-4)(5d-3)(5d-2)(5d-1)a_{d-1}
$$

> が成り立つ。逆に、数列 $(a_d)_{d\ge0}$ がこの漸化式を満たすなら、収束を仮定せず各次数の係数だけを比較したとき、$\mathcal L(\sum_{d\ge0}a_dz^d)$ の係数はすべて零になる。これは収束の証明ではない。
<!-- formal-statement-end -->

### 証明の見取り図

$\theta z^d=dz^d$ を四回使い、$z$ を掛けた項で次数が一つ上がることを確認する。

<!-- proof-start -->
### 証明

各 $d\ge0$ について $\theta^4(a_dz^d)=d^4a_dz^d$ であり、

$$
5z\prod_{j=1}^4(5\theta+j)(a_{d-1}z^{d-1})
=5\prod_{j=1}^4(5(d-1)+j)a_{d-1}z^d.
$$

$d=0$ の項は $0^4a_0=0$ なので制約がない。$d\ge1$ の係数を等置すると主張を得る。逆向きも各次数の係数が零になることから従う。収束をこの形式計算だけから仮定なしに断言してはいない。$\square$
<!-- proof-end -->

例えば $a_0=1$ とすれば、$a_1=5\cdot1\cdot2\cdot3\cdot4=120$、$a_2=5(6\cdot7\cdot8\cdot9)120/16=113400$ となる。全係数の閉じた式と収束半径は次講で自力導出する。

## 8. 演習：低減から正則特異点まで

### Level A：演算子と係数を正確に扱う

<a id="ex-mir1-10-a01"></a>
#### MIR1-10-A01 Euler作用素と規格化
- Level: A

$z=(5\psi)^{-5}$、$\psi\ne0$ とし、$\theta=z\,d/dz$ と置く。$\theta(\psi\Pi)$ と $\theta^2(\psi\Pi)$ を $\psi$ 微分で表せ。また $\theta z^d$ を求めよ。

<!-- solution-start -->
**詳細解答。** $dz/d\psi=-5z/\psi$ なので $\theta=-(\psi/5)d/d\psi$ である。積の微分から

$$
\theta(\psi\Pi)=-\frac{\psi}{5}(\Pi+\psi\Pi').
$$

さらに $\Pi'=d\Pi/d\psi$、$\Pi''=d^2\Pi/d\psi^2$ とし、サイクルを固定して $\psi$ だけを微分すると、積の微分から

$
\frac{d}{d\psi}\bigl[\psi(\Pi+\psi\Pi')\bigr]
=\Pi+3\psi\Pi'+\psi^2\Pi''
$

となる。したがって

$$
\theta^2(\psi\Pi)=\frac{\psi}{25}(\Pi+3\psi\Pi'+\psi^2\Pi'').
$$

$\theta z^d=z\cdot d z^{d-1}=d z^d$ である。
<!-- solution-end -->

<a id="ex-mir1-10-a02"></a>
#### MIR1-10-A02 二重極からの一段低減
- Level: A

$F_\psi=\sum_i x_i^5-5\psi P$、$P=\prod_i x_i$ とし、$J_k(a)$ は本文の閉4サイクル積分とする。$J_2(5,0,0,0,0)$ を $I_1$ と $I_0$ で表せ。用いる多項式 $B_0$ とその次数も示せ。

<!-- solution-start -->
**詳細解答。** $k=2$、$a=(5,0,0,0,0)$、$i=0$ で $B_0=x_0^{5-4}/5=x_0/5$ と置く。$\deg B_0=1=5k-9$、$\partial_0B_0=1/5$。$B_0\partial_0F_\psi=x_0^5-\psi P$ だから[極次数低減公式](../MIR1-09/index.md#prop-mir1-09-pole-reduction)の $k-1=1$ を使って

$$
J_2(5,0,0,0,0)-\psi J_2(1,1,1,1,1)
=\frac15J_1(0,0,0,0,0).
$$

従って $J_2(5,0,0,0,0)=\psi I_1+I_0/5$ となる。
<!-- solution-end -->

<a id="ex-mir1-10-a03"></a>
#### MIR1-10-A03 高次微分の係数
- Level: A

$\Pi=(2\pi i)^{-1}\int_T\Omega/F_\psi$ とし、$\partial_\psi F_\psi=-5P$、$T$ は滑らかな局所族を避けるコンパクトな閉サイクルとする。$I_2,I_3,I_4$ を $\Pi$ の導関数で表せ。

<!-- solution-start -->
**詳細解答。** コンパクトな $T$ 上で分母が一様に零から離れる小さいパラメータ領域を選ぶので、微分を積分へ移せる。[高次微分公式](../MIR1-08/index.md#prop-mir1-08-pole-derivatives)より $\Pi^{(j)}=5^jj! I_j$。具体的に

$$
\Pi''=2!\,5^2I_2=50I_2,\qquad
\Pi^{(3)}=3!\,5^3I_3=750I_3,\qquad
\Pi^{(4)}=4!\,5^4I_4=15000I_4.
$$

従って $I_2=\Pi''/50$、$I_3=\Pi^{(3)}/750$、$I_4=\Pi^{(4)}/15000$ である。
<!-- solution-end -->

<a id="ex-mir1-10-a04"></a>
#### MIR1-10-A04 係数と有限判別点
- Level: A

$\mathcal L=\theta^4-5z\prod_{j=1}^4(5\theta+j)$ の $\theta^4$、$\theta^3$、定数項の係数を展開し、最高階の $d^4/dz^4$ の係数が零になる有限点を求めよ。

<!-- solution-start -->
**詳細解答。** $\prod_{j=1}^4(5\theta+j)$ の四次係数は $5^4=625$、三次係数は $5^3(1+2+3+4)=1250$、定数項は $1\cdot2\cdot3\cdot4=24$。従って $\mathcal L$ の $\theta^4$ 係数は $1-5z\cdot625=1-3125z$、$\theta^3$ 係数は $-6250z$、定数項は $-120z$ である。$\theta^4$ の最高微分項は $z^4d^4/dz^4$ だから最高係数は $z^4(1-3125z)$。有限零点は $0$ と $1/3125$ である。
<!-- solution-end -->

### Level B：段階的な低減と幾何的範囲

<a id="ex-mir1-10-b01"></a>
#### MIR1-10-B01 三重極の二段低減
- Level: B

本文の記号で $D=J_3(6,1,1,1,1)$、$E=J_3(5,5,0,0,0)$ とする。単項式の一段低減漸化式を繰り返し、$D$ と $E$ を $I_2,I_1,I_0$ で表せ。

<!-- solution-start -->
**詳細解答。** $D$ は $k=3$、指数6の変数を選ぶ。次の指数は $(2,2,2,2,2)$、低い極は $(1,1,1,1,1)$、係数は $(6-4)/(5\cdot2)=1/5$。ゆえに

$$
D=\psi I_2+\frac15I_1.
$$

$E$ は指数5の変数を選ぶと、同じ極では $(6,1,1,1,1)$、低い極では $(5,0,0,0,0)$、係数は $1/10$ となる。従って

$$
\begin{aligned}
E&=\psi D+\frac1{10}J_2(5,0,0,0,0)\\
&=\psi\left(\psi I_2+\frac15I_1\right)
+\frac1{10}\left(\psi I_1+\frac15I_0\right)\\
&=\psi^2I_2+\frac{3\psi}{10}I_1+\frac1{50}I_0.
\end{aligned}
$$

いずれも低い極の項は [極次数低減公式](../MIR1-09/index.md#prop-mir1-09-pole-reduction)の $1/(k-1)$ から生じる。
<!-- solution-end -->

<a id="ex-mir1-10-b02"></a>
#### MIR1-10-B02 四重極の三つの補助量
- Level: B

$A=J_4(5,5,5,0,0)$、$B=J_4(6,6,1,1,1)$、$C=J_4(7,2,2,2,2)$ とする。$C$、$B$、$A$ の順で低減し、$A$ における $I_1$ の係数が $7\psi/150$ であることを途中式から示せ。

<!-- solution-start -->
**詳細解答。** $k=4$ では分母の係数は $5(k-1)=15$。$C$ の指数7を選ぶと $(7-4)/15=1/5$ なので $C=\psi I_3+I_2/5$。

$B$ の指数6を選ぶと $(6-4)/15=2/15$、同じ極の次状態が $C$、低い極は $J_3(6,1,1,1,1)$。よって

$$
B=\psi C+\frac2{15}(\psi I_2+I_1/5)
=\psi^2I_3+\left(\frac15+\frac2{15}\right)\psi I_2+\frac2{75}I_1.
$$

$A$ の指数5を選ぶと係数 $1/15$ で、低い極は $E=J_3(5,5,0,0,0)$ だから

$$
\begin{aligned}
A&=\psi B+\frac1{15}E\\
&=\psi^3I_3+\left(\frac13+\frac1{15}\right)\psi^2I_2
+\left(\frac2{75}+\frac1{50}\right)\psi I_1+\frac1{750}I_0.
\end{aligned}
$$

従って $2/75+1/50=4/150+3/150=7/150$ で、$A=\psi^3I_3+2\psi^2I_2/5+7\psi I_1/150+I_0/750$。
<!-- solution-end -->

<a id="ex-mir1-10-b03"></a>
#### MIR1-10-B03 変数変換と五つの係数
- Level: B

$z=(5\psi)^{-5}$、$\omega=\psi\Pi$、$\theta=z\,d/dz$ とする。$\prod_{j=1}^4(5\theta+j)\omega$ と $\theta^4\omega$ を $\psi$ 微分で展開し、$\mathcal L\omega$ が本文の $\psi$ 方程式の $1/625$ 倍となることを示せ。

<!-- solution-start -->
**詳細解答。** $\theta=-E_\psi/5$ かつ $\omega=\psi\Pi$ だから $(5\theta+j)(\psi\Pi)=\psi(j-1-E_\psi)\Pi$。四つを掛けると

$$
\prod_{j=1}^4(5\theta+j)(\psi\Pi)
=\psi E_\psi(E_\psi-1)(E_\psi-2)(E_\psi-3)\Pi
=\psi^5\Pi^{(4)}.
$$

一方、$\theta^4\omega=\psi(E_\psi+1)^4\Pi/625$ であり、$E_\psi^2\Pi=\psi\Pi'+\psi^2\Pi''$、$E_\psi^3\Pi=\psi\Pi'+3\psi^2\Pi''+\psi^3\Pi^{(3)}$、$E_\psi^4\Pi=\psi\Pi'+7\psi^2\Pi''+6\psi^3\Pi^{(3)}+\psi^4\Pi^{(4)}$ を代入して

$$
\theta^4\omega=\frac{\psi}{625}
(\Pi+15\psi\Pi'+25\psi^2\Pi''+10\psi^3\Pi^{(3)}+\psi^4\Pi^{(4)}).
$$

$5z=1/(625\psi^5)$ だから差は

$$
\mathcal L\omega=\frac1{625}
[(\psi^5-1)\Pi^{(4)}+10\psi^4\Pi^{(3)}
+25\psi^3\Pi''+15\psi^2\Pi'+\psi\Pi].
$$

[周期の微分公式](../MIR1-08/index.md#prop-mir1-08-pole-derivatives)と本文の低減により角括弧は零である。
<!-- solution-end -->

<a id="ex-mir1-10-b04"></a>
#### MIR1-10-B04 不変部分は204次元なのか
- Level: B

Fermat点 $F_0=\sum_i x_i^5$ のJacobian環 $\mathbb C[x_0,\ldots,x_4]/(x_0^4,\ldots,x_4^4)$ を考える。各 $x_i$ を五乗根 $\lambda_i$ で掛け、$\prod_i\lambda_i=1$ とする群に不変な、次数 $0,5,10,15$ の単項式をすべて求めよ。なぜこれだけで元のquinticの $b_3=204$ を否定しないか述べよ。

<!-- solution-start -->
**詳細解答。** Jacobian環の単項式基底は各指数が0から3の範囲である。任意の $i\ne j$ について $\lambda_i=\zeta$、$\lambda_j=\zeta^{-1}$、他を1と選べる。不変な $x^a$ は

$$
\zeta^{a_i-a_j}=1\quad\Longrightarrow\quad a_i\equiv a_j\pmod5
$$

を満たす。各指数は0から3なので、実際にすべて等しい。逆にすべて等しければ作用因子は $(\prod_i\lambda_i)^{a_0}=1$ なので不変である。

よって次数 $0,5,10,15$ の候補は順に $1,P,P^2,P^3$ の各一つである。これらは生成元 $x_i^4$ の倍数を含まず、商環で零ではない。

これは**群不変部分**の計算であり、他の群表現に属するJacobian環の単項式を零にしたのではない。[quinticと鏡像のHodge数](../MIR1-05/index.md#prop-mir1-05-hodge-count)では元のquinticは $h^{2,1}=101$、従って $b_3=204$。四次元の不変変動だけを今回の作用素で記述しても矛盾はない。Jacobian環をHodge成分へ移すには別途Griffithsの留数比較定理を用いる。
<!-- solution-end -->

### Level C：導出をひと続きに再構成する

<a id="ex-mir1-10-c01"></a>
#### MIR1-10-C01 五重極から四階作用素・正則特異点まで
- Level: C

$\psi^5\ne1$、$\psi\ne0$ とし、$F_\psi=\sum_i x_i^5-5\psi P$、$I_j=(2\pi i)^{-1}\int_TP^j\Omega/F_\psi^{j+1}$、$\Pi=I_0$ とする。$T$ は局所的に平行移動した閉4サイクルである。以下を示せ。

1. [単項式の一段低減漸化式](#prop-mir1-10-monomial-reduction)を使い、$A,B,C$ と $I_4$ の関係から $(1-\psi^5)I_4$ を $I_3,I_2,I_1,I_0$ で表せ。
2. $\Pi^{(j)}=5^jj!I_j$ に代入して $\psi$ の四階方程式を求めよ。
3. $\omega=\psi\Pi$、$z=(5\psi)^{-5}$ として $\mathcal L=\theta^4-5z\prod_{j=1}^4(5\theta+j)$ を得、有限の正則特異点と $z=0$ の指標多項式を調べよ。

<!-- solution-start -->
**詳細解答。**

1. ここで $(u^r,v^s)$ は指数 $u$ が $r$ 個、指数 $v$ が $s$ 個並ぶ列の略記で、べき乗を意味しない。五重極の五段の置換は $(4^5)\to(5^4,0)\to(6^3,1^2)\to(7^2,2^3)\to(8,3^4)\to(4^5)$ である。各段で $a_i-4=0,1,2,3,4$、$5(k-1)=20$ となり、低い極を集めれば

$$
(1-\psi^5)I_4=\frac{\psi}{20}A+\frac{\psi^2}{10}B+
\frac{3\psi^3}{20}C+\frac{\psi^4}{5}I_3.
$$

三重極の基礎式は $J_3(6,1^4)=\psi I_2+I_1/5$、$J_3(5^2,0^3)=\psi^2I_2+3\psi I_1/10+I_0/50$。従って四重極は

$$
\begin{aligned}
C&=\psi I_3+I_2/5,\\
B&=\psi C+\frac2{15}J_3(6,1^4)
=\psi^2I_3+\psi I_2/3+2I_1/75,\\
A&=\psi B+\frac1{15}J_3(5^2,0^3)
=\psi^3I_3+2\psi^2I_2/5+7\psi I_1/150+I_0/750.
\end{aligned}
$$

上式に代入して、$I_3$ の係数は $\psi^4(1/20+1/10+3/20+1/5)=\psi^4/2$、$I_2$ の係数は $\psi^3(1/50+1/30+3/100)=\psi^3/12$、$I_1$ は $\psi^2(7/3000+2/750)=\psi^2/200$、$I_0$ は $\psi/15000$。従って

$$
(1-\psi^5)I_4=\frac{\psi^4}2I_3+\frac{\psi^3}{12}I_2
+\frac{\psi^2}{200}I_1+\frac{\psi}{15000}I_0.
$$

2. $\Pi^{(4)}=15000I_4$、$\Pi^{(3)}=750I_3$、$\Pi''=50I_2$、$\Pi'=5I_1$ なので、15000倍して項を移せば

$$
(\psi^5-1)\Pi^{(4)}+10\psi^4\Pi^{(3)}
+25\psi^3\Pi''+15\psi^2\Pi'+\psi\Pi=0.
$$

3. $\theta=-(\psi/5)d/d\psi$ である。積の微分により $\theta^4(\psi\Pi)=\psi(\Pi+15\psi\Pi'+25\psi^2\Pi''+10\psi^3\Pi^{(3)}+\psi^4\Pi^{(4)})/625$。また $\prod_{j=1}^4(5\theta+j)(\psi\Pi)=\psi^5\Pi^{(4)}$、$5z=1/(625\psi^5)$ だから $\mathcal L(\psi\Pi)$ は2の方程式の左辺の $1/625$ 倍で零となる。

$\prod_{j=1}^4(5\theta+j)$ の四次係数は625なので、$\theta^4$ の係数は $1-3125z$。従って最高の $z$ 微分の係数は $z^4(1-3125z)$ であり、最高階係数が零という事実だけでは正則特異点とは判定できないので、低階係数も調べる。$D=d/dz$ とおくと、$\theta^2=z^2D^2+zD$、$\theta^3=z^3D^3+3z^2D^2+zD$、$\theta^4=z^4D^4+6z^3D^3+7z^2D^2+zD$ である。$\mathcal L=\sum_{j=0}^4p_j(z)D^j$ と書けば

$
\begin{aligned}
p_4&=z^4(1-3125z),&
p_3&=z^3(6-25000z),\\
p_2&=z^2(7-45000z),&
p_1&=z(1-15000z),&
p_0&=-120z.
\end{aligned}
$

$z=0$ では $p_j$ が $z^j$ で割り切れる（$j=1,2,3$）ので、$z^{4-j}p_j/p_4$ は正則に延長できる。$j=0$ も $z^4p_0/p_4=-120z/(1-3125z)$ で正則である。$c=1/3125$ では $p_4$ が一位の零点を持ち、各 $p_j$（$j<4$）は多項式だから、$(z-c)^{4-j}p_j/p_4$ は正則に延長できる。従って二点とも四階方程式の正則特異点である。

さらに $z=0$ で $\omega=z^\rho$ を代入すると最低次項は $\rho^4z^\rho$ で、指標多項式は $\rho^4$。いずれも次の局所周期の学習への入口になる。
<!-- solution-end -->

## 9. 次講へ：作用素から周期を組み立てる

ここまでで、**全微分を除く極次数低減 → 任意の対象閉サイクルの周期方程式 → 規格化した四階作用素 → 正則特異点と係数漸化式**を導いた。次の **MIR1-11** ではこの漸化式を解き、正則周期の超幾何級数と収束を求める。

**参考文献**：[Cox–Katz, *Mirror Symmetry and Algebraic Geometry*](https://doi.org/10.1090/surv/068)、[Horiほか, *Mirror Symmetry*](https://www.claymath.org/resource/mirror-symmetry/)、[Griffiths, *On the Periods of Certain Rational Integrals*](https://doi.org/10.2307/1970710)。本講の単項式低減と作用素の係数は本文中で導出した。