# AFR2 Maass形式・双曲Laplace作用素

前講では、重さ0の保型性が上半平面上の関数の整数行列による不変性に対応することを学びました。今回は正則性の代わりに微分方程式を課します。平面の通常の二階微分は、点を反転させる一次分数変換の下で同じ値になるとは限りません。点の高さに応じて長さを測り直せば、群の作用と両立する微分方程式を作れます。

本講では重さ0、全モジュラー群の場合に限定し、符号を固定した作用素から周期方向の係数方程式まで導きます。

<!-- definition-example-audit: strict -->

## 1. 高さに応じて長さと面積を測る

[上半平面](../../MF/MF1/index.md#def-mf1-upper-half-plane)を $\mathbb H=\{x+iy:y>0\}$ とし、$G=SL_2(\mathbb R)$、[整数モジュラー群](../../MF/MF1/index.md#def-mf1-modular-group) $\Gamma=SL_2(\mathbb Z)$ とします。

[実特殊線形群の作用](../AFR1/index.md#def-afr1-real-group)では $g=\begin{pmatrix}a&b\\c&d\end{pmatrix}$ に対して $g\cdot z=(az+b)/(cz+d)$ です。

虚部は $y/|cz+d|^2$ に変わります。

したがって高さと小さな線分の長さを同じ比率で変えれば、長さの比を保存できそうです。

点 $(x,y)$ での速度 $(u,v)$ に対して、通常の内積を $y^2$ で割ったものを使います。内積によって各点での長さを定めることが計量の役割です。

接ベクトルは座標基底 $e_x=(1,0),e_y=(0,1)$ で表した速度とします。

線素 $ds^2$ は微小変位に対する計量の二次形式、面積要素 $d\mu$ は座標面積 $dx\,dy$ に計量による密度を掛けたものです。[Riemann 計量の定義](../../../幾何系/GEO/GEO12/index.md#def-geo12-riemannian-metric)をこの座標で具体化します。

<a id="def-afr2-metric"></a>
<!-- formal-statement-start -->
> **定義（上半平面の双曲計量）**  
> $\mathbb H$ の点 $z=x+iy$ で、実二次元の速度ベクトル $U=(u_1,u_2)$、$V=(v_1,v_2)$ の内積を
>
$$
g_z(U,V)=\frac{u_1v_1+u_2v_2}{y^2}
$$
>
> と定める。この計量の線素と面積要素は
>
$$
ds^2=\frac{dx^2+dy^2}{y^2},\qquad
d\mu=\frac{dx\,dy}{y^2}
$$
>
> である。
<!-- formal-statement-end -->

<!-- definition-example-start: def-afr2-metric -->
**定義の確認**： $z=2i$ で $U=(3,4)$、$V=(1,0)$ とします。定義に代入すると

$$
g_z(U,V)=\frac34,\qquad
g_z(U,U)=\frac{3^2+4^2}{2^2}=\frac{25}4.
$$

従って $U$ の計量ノルムは $5/2$ です。

一般に双線形性と対称性は分子から従い、$y>0$ なので非零の $U$ の二乗長さは正です。

座標基底で計量を表す行列の各成分は、基底ベクトル同士の内積です。定義に代入すると

$$
(g_z(e_i,e_j))_{i,j=x,y}
=\begin{pmatrix}y^{-2}&0\\0&y^{-2}\end{pmatrix}.
$$

実際、基底展開の双線形性により $g_z(U,V)=U^{\mathsf T}(g_z(e_i,e_j))V$ となります。ここでは $U,V$ を列ベクトルとみなします。全成分は $y>0$ で滑らかです。

座標 $(x,y)$ の順に向きを取ると、[体積形式の座標表示](../../../幾何系/GEO/GEO12/index.md#prop-geo12-volume-coordinate)を適用できます。計量行列の行列式は $y^{-2}y^{-2}=y^{-4}>0$ なので密度は $\sqrt{y^{-4}}=y^{-2}$ です。

各座標軸の単位速度の長さは $1/y$、二軸は直交するので微小面積は通常の面積の $1/y^2$ 倍です。

高さ2では密度は $1/4$ です。
<!-- definition-example-end -->

[曲線の計量による長さ](../../../幾何系/GEO/GEO12/index.md#def-geo12-length-energy)では速度の計量ノルムを積分します。縦に高さ1から2まで進む曲線の長さは $\int_1^2 dy/y=\log2$ です。高さ2から4まで進んでも長さは $\log2$ になります。通常の長さは異なりますが、比が同じならこの計量での縦方向の長さは同じです。

<a id="prop-afr2-metric-invariance"></a>
<!-- formal-statement-start -->
> **命題（双曲計量と面積要素の群不変性）**  
> 任意の $g\in SL_2(\mathbb R)$ の上半平面への一次分数変換は、双曲計量による速度の内積と面積要素を保存する。
<!-- formal-statement-end -->

### 証明の見取り図

複素微分で求めた長さの変化率と虚部の変化率が一致します。面積の変化率は長さの変化率の二乗です。

<!-- proof-start -->
### 証明

$w=g\cdot z=X+iY$ と置きます。$c\ne0$ なら分母の零点は実数 $-d/c$ です。$c=0$ なら $ad=1$ より $d\ne0$ です。従って上半平面では分母が非零です。

[実特殊線形群の上半平面への作用](../AFR1/index.md#def-afr1-real-group)で導いた虚部の式を用います。分母は非零なので、商の微分には[複素微分の微分法則](../../../解析系/CA/CA1/index.md#thm-ca1-derivative-rules)を適用します。

$$
Y=\frac{y}{|cz+d|^2},\qquad
w'(z)=\frac{a(cz+d)-c(az+b)}{(cz+d)^2}
=\frac1{(cz+d)^2}.
$$

ここで $Dg$ は行列 $g$ 自体ではなく、座標写像 $z\mapsto g\cdot z$ の実微分です。$w'$ は複素変数 $z$ での導関数です。

速度 $U=(u_1,u_2)$ を複素数 $u_1+iu_2$ とみなすと、変換後の速度は $w'(z)(u_1+iu_2)$ です。実二次元で複素数倍は回転と正の伸縮の合成です。

通常の実内積は複素表示で $\langle U,V\rangle=\operatorname{Re}(U\overline V)$ と書けるため、変換後は

$$
\operatorname{Re}((w'U)\overline{w'V})
=|w'|^2\operatorname{Re}(U\overline V).
$$

したがって内積は $|w'(z)|^2$ 倍されるので

$$
\frac{\langle Dg\,U,Dg\,V\rangle}{Y^2}
=\frac{|w'(z)|^2\langle U,V\rangle}{y^2/|cz+d|^4}
=g_z(U,V).
$$

実Jacobian行列とは座標写像の微分 $Dg$ を標準基底で表した行列です。$w'(z)=p+iq$ とすると複素数倍で $1$ は $p+iq$ に、$i$ は $-q+ip$ に移るので、二つの列を並べると

$$
Dg=\begin{pmatrix}p&-q\\q&p\end{pmatrix}.
$$

その行列式は $p^2+q^2=|cz+d|^{-4}>0$ であり、変数変換によって

$$
\frac{dX\,dY}{Y^2}
=\frac{|cz+d|^{-4}dx\,dy}{y^2|cz+d|^{-4}}
=\frac{dx\,dy}{y^2}.
$$

逆変換は $g^{-1}\in G$ の作用なので、これは全上半平面での保存則です。
<!-- proof-end -->

例えば反転 $z\mapsto-1/z$ は $2i$ を $i/2$ へ移します。そこでの複素微分は $1/(2i)^2=-1/4$ なので通常の速度の長さは $1/4$ 倍ですが、移動後の高さも $1/4$ 倍です。計量で測る速度の長さは変わりません。

## 2. 群の作用と両立する二階微分

通常の平面で二階微分の和を取ると、局所的な曲がり具合を測れます。

[Riemannian 勾配](../../../幾何系/GEO/GEO12/index.md#def-geo12-gradient)と[発散・Laplace--Beltrami の座標表示](../../../幾何系/GEO/GEO12/index.md#prop-geo12-div-laplacian-coordinate)を双曲計量に適用します。

双曲計量では面積密度が $y^{-2}$ です。

以後 $u(x+iy)$ を二変数関数 $u(x,y)$ とも書きます。下付き添字 $u_x=\partial u/\partial x$ は $y$ を固定した偏微分、$u_y$ は $x$ を固定した偏微分です。$u_{xx},u_{yy}$ は同じ変数で二度微分したものです。$\partial_x,\partial_y$ は対応する偏微分演算子です。

関数 $u$ の微分を内積で表す速度（勾配）は、任意の速度 $V$ について $g_z(\operatorname{grad}_g u,V)=u_x V_1+u_y V_2$ を満たす必要があります。

よってその座標は $(y^2u_x,y^2u_y)$ です。

複素数値の場合は実部と虚部に分けて作用させます。

面積密度 $\rho=y^{-2}$ に対し、速度場 $(A,B)$ の流出率を面積で割る式は $\rho^{-1}(\partial_x(\rho A)+\partial_y(\rho B))$ です。

これは微小長方形の左右・上下の流出量の差を面積 $\rho\,dx\,dy$ で割ることで得られます。

勾配の成分を代入すると

$$
\begin{aligned}
\operatorname{div}_g\operatorname{grad}_g u
&=\rho^{-1}\{\partial_x(\rho y^2u_x)
+\partial_y(\rho y^2u_y)\}\\
&=y^2(u_{xx}+u_{yy}).
\end{aligned}
$$

ここでは $\rho y^2=1$ を使いました。

GEO12 の作用素は正の発散と勾配の合成ですが、本系列ではその負号を取ります。

<a id="def-afr2-laplacian"></a>
<!-- formal-statement-start -->
> **定義（双曲Laplace作用素）**  
> $u:\mathbb H\to\mathbb C$ が二階連続偏微分可能であるとき、非負符号規約の双曲Laplace作用素を
>
$$
\Delta_{\mathbb H}u=-y^2(u_{xx}+u_{yy})
$$
>
> と定める。
<!-- formal-statement-end -->

<!-- definition-example-start: def-afr2-laplacian -->
**定義の確認**： $u(x+iy)=y^2$ は全 $y>0$ で滑らかで、$u_{xx}=0$、$u_{yy}=2$ です。したがって $\Delta_{\mathbb H}u=-2y^2$ です。「非負符号規約」は任意の関数値が非負になるという意味ではありません。
<!-- definition-example-end -->

実際、上半平面内にコンパクトな台を持つ滑らかな関数（上半平面内のあるコンパクト集合の外で0となる関数）なら、通常の部分積分を二方向に行って

$$
\begin{aligned}
\int_{\mathbb H}\overline u\,\Delta_{\mathbb H}u\,d\mu
&=-\int_{\mathbb H}\overline u(u_{xx}+u_{yy})\,dx\,dy\\
&=\int_{\mathbb H}(|u_x|^2+|u_y|^2)\,dx\,dy\ge0
\end{aligned}
$$

となります。境界項は台の外で $u$ とその微分が0なので消えます。非負性の意味はこの積分にあります。商空間上でどの関数を作用素の定義域とするかは次講で扱います。

<a id="thm-afr2-laplacian-equivariance"></a>
<!-- formal-statement-start -->
> **定理（双曲Laplace作用素の群作用との可換性）**  
> $u:\mathbb H\to\mathbb C$ を二階連続偏微分可能な関数、$g\in SL_2(\mathbb R)$ とする。このとき
>
$$
\Delta_{\mathbb H}(u\circ g)
=(\Delta_{\mathbb H}u)\circ g
$$
>
> が成立する。ここで合成は $(u\circ g)(z)=u(g\cdot z)$ を表す。
<!-- formal-statement-end -->

### 証明の見取り図

連鎖律による二階微分には、変換の一階微分の積と二階微分の二種類が現れます。一次分数変換の実部・虚部は調和的（通常の二階微分の和が0）なので後者は消え、前者の共通倍率を高さの二乗で相殺できます。

<!-- proof-start -->
### 証明

$w=X+iY=g\cdot z$ とし、$X,Y$ は $(x,y)$ の実数値関数とします。$u_X,u_Y,u_{XY}$ などは移動先の座標での偏微分で、$(X,Y)$ で評価します。例えば $u_{XY}=\partial_Y(\partial_Xu)$ であり、二階連続偏微分可能性から $u_{YX}$ と一致します。

一次分数変換は分母が非零の領域で正則なので、[Cauchy–Riemann必要条件](../../../解析系/CA/CA1/index.md#thm-ca1-cr-necessary)による関係 $X_x=Y_y$、$X_y=-Y_x$ が成立します。

実部と虚部は分母が非零の有理式なので滑らかです。混合微分の順序を交換でき、

$$
X_{xx}+X_{yy}=Y_{yx}-Y_{xy}=0,\qquad
Y_{xx}+Y_{yy}=-X_{yx}+X_{xy}=0.
$$

$v(x,y)=u(X(x,y),Y(x,y))$ と置きます。一階連鎖律は $v_x=u_X X_x+u_Y Y_x$ です。これをさらに微分すると

$$
v_{xx}=u_{XX}X_x^2+2u_{XY}X_xY_x+u_{YY}Y_x^2
+u_X X_{xx}+u_Y Y_{xx}.
$$

$y$ 方向では

$$
v_{yy}=u_{XX}X_y^2+2u_{XY}X_yY_y+u_{YY}Y_y^2
+u_X X_{yy}+u_Y Y_{yy}.
$$

和を取ると $u_X,u_Y$ の係数は0です。また Cauchy–Riemann の関係と $w'=X_x+iY_x$ から

$$
\begin{aligned}
X_xY_x+X_yY_y&=X_x(-X_y)+X_yX_x=0,\\
X_x^2+X_y^2&=Y_x^2+Y_y^2=|w'(z)|^2.
\end{aligned}
$$

従って $v_{xx}+v_{yy}=|w'(z)|^2(u_{XX}+u_{YY})$ です。[双曲計量の群不変性の証明](#prop-afr2-metric-invariance)で得た $y^2|w'(z)|^2=Y^2$ を使うと、

$$
-y^2(v_{xx}+v_{yy})=-Y^2(u_{XX}+u_{YY})
$$

となり、右辺は $(\Delta_{\mathbb H}u)(g\cdot z)$ です。
<!-- proof-end -->

従って $\Gamma$ 不変の $u$ にこの作用素を施しても $\Gamma$ 不変です。通常の二階微分の和にはなかった性質です。

## 3. Maass形式：不変性に固有方程式を課す

[重さ付き変換則と群上の持ち上げの対応](../AFR1/index.md#thm-afr1-lift)の $k=0$ では、$u(\gamma\cdot z)=u(z)$ が群上の左不変性と右回転不変性に対応します。この条件だけでは多くの関数が残ります。そこで、一つの微分作用素を施すと元の関数の定数倍になるという条件を追加します。さらに無限遠での大きさを制御します。

ここでは滑らかとは全ての次数の偏微分が連続であること、増大が高々多項式的とは高さのあるべき乗で一様に抑えられることを意味します。

また、二乗可積分性とは [基本領域](../../MF/MF1/index.md#def-mf1-standard-domain)（群作用による重複を境界を除いて整理した領域）での $|u|^2$ の双曲面積に関する積分が有限となる条件です。ここでは増大条件と区別します。

<a id="def-afr2-maass"></a>
<!-- formal-statement-start -->
> **定義（重さ0のMaass形式）**  
> 非零の滑らかな関数 $u:\mathbb H\to\mathbb C$ が $\Gamma=SL_2(\mathbb Z)$ に関する重さ0のMaass形式であるとは、次の三条件を満たすことをいう。
>
> **（1）不変性**：全ての $\gamma\in\Gamma$ と $z\in\mathbb H$ で $u(\gamma\cdot z)=u(z)$。
>
> **（2）固有方程式**：ある $\lambda\in\mathbb C$ に対し
>
$$
\Delta_{\mathbb H}u=\lambda u.
$$
>
> **（3）増大条件**：ある $C>0$、$M\ge0$ があり、全ての $x\in\mathbb R$、$y\ge1$ について
>
$$
|u(x+iy)|\le C y^M.
$$
>
> $\lambda$ をこの固有方程式の固有値とする。本講の定義には二乗可積分性を課さない。
<!-- formal-statement-end -->

<!-- definition-example-start: def-afr2-maass -->
**定義の確認**： $u(z)=1$ は非零で全階の偏微分が存在します。全ての整数行列で変換後も1であり、二階偏微分はともに0なので $\lambda=0$ の固有方程式を満たします。増大条件は $C=1,M=0$ で成立します。これは重さ0のMaass形式です。
<!-- definition-example-end -->

非定数の例は [演習C1](#ex-afr2-c1) で格子和から構成します。そこでは増大条件を満たす一方で固有値が $-2$ となります。文献によっては二乗可積分性を定義に加えることがあります。本系列では増大条件を採用し、二乗可積分な部分とそうでない部分を次講で区別します。

高さだけに依存する関数 $y^s=\exp(s\log y)$（$s\in\mathbb C$、実数の対数）は

$$
\partial_y y^s=sy^{s-1},\qquad
\partial_y^2y^s=s(s-1)y^{s-2}
$$

なので $\Delta_{\mathbb H}y^s=s(1-s)y^s$ を満たします。ただし $s=2$ なら $u(2i)=4$ に対して $u(-1/(2i))=1/4$ であり、固有方程式だけでは保型性を得られません。

逆に、[j不変量の群不変性](../../MF/MF2/index.md#thm-mf2-j-properties)から前講で作った有界な非定数不変関数は不変性と増大条件を満たしても、固有方程式を別に確認する必要があります。三条件は別の役割を持っています。

滑らかな正則関数 $f$ は [Cauchy–Riemann必要条件](../../../解析系/CA/CA1/index.md#thm-ca1-cr-necessary)の関係をもう一度微分することで $f_{xx}+f_{yy}=0$、すなわち $\Delta_{\mathbb H}f=0$ となります。しかし Maass形式の定義は正則性を要求せず、例えば非零の固有値を持つものは正則ではありません。また [古典的な重さ付き変換則](../AFR1/index.md#thm-afr1-lift)は一般に重さ0の不変性と異なります。重さのある正則形式へ本講の作用素をそのまま適用することが、重さのあるMaass形式の理論ではありません。

## 4. 一つの周期を切り出す

[整数モジュラー群](../../MF/MF1/index.md#def-mf1-modular-group)の行列 $T=\begin{pmatrix}1&1\\0&1\end{pmatrix}$ は $z$ を $z+1$ に移します。従って [Maass形式の不変条件](#def-afr2-maass)から横方向に周期1を持ちます。

ここで高さを固定すると通常の周期関数になり、[複素指数係数](../../../解析系/FOU/FOU1/index.md#def-fou1-complex-exponential-coefficient)を利用できます。

整数 $n$ は横方向の周波数の添字です。係数 $a_n$ は横方向を積分した後に高さ $y$ だけの関数となるため、常微分の記法を使います。

$$
a_n'=\frac{da_n}{dy},\qquad
a_n''=\frac{d^2a_n}{dy^2}.
$$

<a id="thm-afr2-fourier-equation"></a>
<!-- formal-statement-start -->
> **定理（周期方向のFourier展開と係数方程式）**  
> $u:\mathbb H\to\mathbb C$ を滑らかな周期1の関数（全ての $x,y$ で $u(x+1+iy)=u(x+iy)$）とし、$\Delta_{\mathbb H}u=\lambda u$ とする。整数 $n$ と $y>0$ に対し
>
$$
a_n(y)=\int_0^1 u(x+iy)e^{-2\pi inx}\,dx
$$
>
> と置く。このとき各高さで絶対かつ一様に
>
$$
u(x+iy)=\sum_{n\in\mathbb Z}a_n(y)e^{2\pi inx}
$$
>
> が成立し、各係数は
>
$$
a_n''(y)+\left(\frac{\lambda}{y^2}-4\pi^2 n^2\right)a_n(y)=0
$$
>
> を満たす。プライムは $y$ に関する常微分を表す。
<!-- formal-statement-end -->

### 証明の見取り図

横方向の二階微分は周期性により部分積分で指数関数側へ移せます。高さ方向の微分は有限区間積分の中に入れられるので、二変数の方程式が各整数に対応する一変数の方程式へ分かれます。

<!-- proof-start -->
### 証明

固定した $y$ で $t=2\pi x$ と変数を置きます。

関数 $u(t/(2\pi)+iy)$ は周期 $2\pi$ の滑らかな関数です。

[複素指数係数](../../../解析系/FOU/FOU1/index.md#def-fou1-complex-exponential-coefficient)の積分区間を周期性で $[0,2\pi]$ に移し、置換積分で $t=2\pi x$ の導関数 $2\pi>0$ を使うと

$$
\frac1{2\pi}\int_0^{2\pi}u(t/(2\pi)+iy)e^{-int}\,dt
=\int_0^1 u(x+iy)e^{-2\pi inx}\,dx
=a_n(y).
$$

[Dirichletの点ごとの極限定理](../../../解析系/FOU/FOU2/index.md#thm-fou2-dirichlet-convergence)を実部と虚部の両方に適用できます。

いずれも滑らかなので左右極限は元の値に等しく、対称有限和の極限は $u(x+iy)$ です。

$n\ne0$ に対し、周期性から $u$ と $u_x$ は $x=0,1$ で同じ値を取ります。指数関数も両端で1なので、部分積分を二度行うと

$$
\begin{aligned}
\int_0^1 u_{xx}e^{-2\pi inx}\,dx
&=2\pi in\int_0^1 u_x e^{-2\pi inx}\,dx\\
&=(2\pi in)^2\int_0^1 u e^{-2\pi inx}\,dx\\
&=-4\pi^2 n^2 a_n(y).
\end{aligned}
$$

$n=0$ でも左辺は $u_x(1+iy)-u_x(iy)=0$ なので同じ式です。固定高さで $n\ne0$ に対し $|a_n(y)|\le \max_{0\le x\le1}|u_{xx}(x+iy)|/(4\pi^2n^2)$ が従い、逆二乗和の収束によって級数は $x$ について絶対かつ一様に収束します。

任意の $y_0>0$ を取ると $u_y,u_{yy}$ は $[0,1]\times[y_0/2,3y_0/2]$ で連続です。$y=y_0$ とし、$0<|h|<y_0/2$ での差商を考えます。

線分を $y+\theta h$（$0\le\theta\le1$）と表すと、合成関数 $u(x+i(y+\theta h))$ の $\theta$ 微分は $h u_y(x+i(y+\theta h))$ です。連続な導関数を持つので、実部と虚部にそれぞれ[微積分学の基本定理II](../../../基礎科目/RA/RA4/index.md#thm-ra4-ftc2)を適用して端点の差を求め、非零の $h$ で割ります。

$$
\frac{u(x+i(y+h))-u(x+iy)}h
=\int_0^1 u_y(x+i(y+\theta h))\,d\theta
$$

と表せ、一様連続性によって固定した $y$ で $x$ に関して一様に $u_y$ へ近づきます。同じ議論を $u_y$ に適用することで

$$
a_n''(y)=\int_0^1 u_{yy}(x+iy)e^{-2\pi inx}\,dx
$$

を得ます。最初の微分も同じ理由で $a_n'(y)=\int_0^1 u_y(x+iy)e^{-2\pi inx}\,dx$ です。[双曲Laplace作用素](#def-afr2-laplacian)の固有方程式を $-y^2(u_{xx}+u_{yy})=\lambda u$ と書いて指数関数を掛け、一周期積分すると

$$
-y^2(-4\pi^2 n^2a_n+a_n'')=\lambda a_n.
$$

$y>0$ なので $-y^2$ で割って移項すれば所望の方程式です。無限級数を項別微分する必要はありません。
<!-- proof-end -->

例えば $u=e^{-2\pi y}e^{2\pi ix}$ では横方向の二階微分が $-4\pi^2u$、縦方向が $4\pi^2u$ なので固有値0です。

係数は $a_1=e^{-2\pi y}$、それ以外は0であり、方程式は $a_1''-4\pi^2a_1=0$ となります。

これは周期的な局所模型です。

実際、$u(2i)=e^{-4\pi}$ と $u(i/2)=e^{-\pi}$ は異なり、反転の下で不変ではありません。

### 有限区間の境界値問題との比較

係数方程式を次の形に直します。

$$
-a_n''+4\pi^2n^2a_n=\lambda y^{-2}a_n.
$$

仮に有限閉区間 $[\alpha,\beta]$（$0<\alpha<\beta$）で両端の値を0とする別の問題を考えます。[正則 Sturm--Liouville 問題](../../../解析系/ODE/ODE7/index.md#def-ode7-regular-sl)の係数は

$$
p=1,\qquad q=4\pi^2n^2,\qquad w=y^{-2}
$$

です。$p,w$ は正で、必要な連続性も満たします。非零解が両端条件を満たせば、[Dirichlet 問題の Rayleigh 商](../../../解析系/ODE/ODE7/index.md#thm-ode7-rayleigh)を適用できます。

$$
\lambda=
\frac{\int_\alpha^\beta (|a_n'|^2+4\pi^2n^2|a_n|^2)\,dy}
{\int_\alpha^\beta y^{-2}|a_n|^2\,dy}.
$$

分母は正、分子は非負です。従ってこの有限区間の問題では固有値は実数かつ非負です。しかし Maass 形式の係数にはこの両端条件を課していません。微分式が似ているだけでは同じ結論を移せないことに注意します。

## 5. 定数項は高さのべき乗になる

[周期方向の係数方程式](#thm-afr2-fourier-equation)で $n=0$ とすると横方向の振動が消えます。この係数は高さごとの平均値です。Maass形式の平均がどのような形を取り得るかを先に解いておくと、無限遠での振る舞いの分類に使えます。

<a id="prop-afr2-zero-mode"></a>
<!-- formal-statement-start -->
> **命題（定数項の一般解）**  
> $\lambda\in\mathbb C$、$s\in\mathbb C$ を $s(1-s)=\lambda$ とする。$y>0$ における方程式
>
$$
a_0''+\frac{\lambda}{y^2}a_0=0
$$
>
> の二階連続微分可能な一般解は、$A,B\in\mathbb C$ を任意定数として
>
$$
a_0(y)=
\begin{cases}
Ay^s+By^{1-s}&s\ne1/2,\\
y^{1/2}(A+B\log y)&s=1/2
\end{cases}
$$
>
> である。
<!-- formal-statement-end -->

### 証明の見取り図

高さの対数を新しい変数とすると係数が定数になります。二つの根が一致する場合には、べき乗を二つ並べても独立な解にならないため、対数を伴う解が現れます。

<!-- proof-start -->
### 証明

$t=\log y$、$b(t)=a_0(e^t)$ とします。ここでは $b'$ は新しい変数 $t$ による常微分、$a_0'$ は高さ $y$ による常微分です。$dy/dt=e^t=y>0$ なので、連鎖律と積の微分から

$$
b'=ya_0',\qquad b''=ya_0'+y^2a_0''.
$$

従って $b''-b'+\lambda b=0$ です。$b=e^{st}v(t)$ を代入します。$v'$ と $v''$ は $t$ による常微分です。積の微分から

$$
b'=e^{st}(sv+v'),\quad
b''=e^{st}(s^2v+2sv'+v'').
$$

$s^2-s+\lambda=0$ によって $v$ の項が消え、$v''+(2s-1)v'=0$ となります。$w(t)=v'(t)$ に対し

$$
\frac{d}{dt}\bigl(e^{(2s-1)t}w(t)\bigr)=0.
$$

指数因子は複素数の場合も零になりません。積が定数 $D\in\mathbb C$ なので

$$
v'=D e^{(1-2s)t}.
$$

$s\ne1/2$ の場合、積分して

$$
v=A+\frac{D}{1-2s}e^{(1-2s)t}.
$$

従って $B=D/(1-2s)$ と置けば

$$
b=e^{st}v=Ae^{st}+Be^{(1-s)t}.
$$

$s=1/2$ の場合は $v'=D$ なので、積分して $v=A+Dt$ となります。$B=D$ と置けば

$$
b=e^{t/2}(A+Bt).
$$

すべての変数変換は $y>0$ と $t\in\mathbb R$ の間で可逆であり、逆に各式を代入すると元の方程式を満たすので一般解です。
<!-- proof-end -->

例えば $\lambda=0$ では $s=1$ と取って $a_0=Ay+B$、$\lambda=1/4$ では $a_0=\sqrt y(A+B\log y)$ です。$s=1/2+ir$（$r\in\mathbb R$）なら $\lambda=1/4+r^2$ になります。ただし、このパラメータ表示から任意の $r$ に保型的な解があるとは結論できません。

定数項が全ての高さで0になる条件が次講のカスプ形式につながります。非零周波数については [係数方程式](#thm-afr2-fourier-equation)の $4\pi^2n^2$ が残ります。AFR4ではその解を特殊関数で表します。

## 6. 演習と詳細解答

<a id="ex-afr2-a1"></a>
#### AFR2-A1 縦方向の長さと面積

高さ $2$ から $6$ への縦線の双曲長さと、長方形 $0\le x\le1,\ 2\le y\le6$ の双曲面積を求めよ。

- Level: A
- ID: AFR2-A1

<!-- solution-start -->
**詳細解答。** 縦線の固定した横座標を $x_0$ とし、$y\mapsto (x_0,y)$ とパラメータ表示すると速度は $(0,1)$ です。[上半平面の双曲計量](#def-afr2-metric)と[曲線の長さ](../../../幾何系/GEO/GEO12/index.md#def-geo12-length-energy)から

$$
L=\int_2^6\sqrt{g_z((0,1),(0,1))}\,dy
=\int_2^6\frac{dy}{y}=\log3.
$$

面積は

$$
\int_0^1dx\int_2^6 y^{-2}dy=[-y^{-1}]_2^6
=\frac12-\frac16=\frac13.
$$

長さは高さの比、面積は高さの逆数の差に依存します。
<!-- solution-end -->

<a id="ex-afr2-a2"></a>
#### AFR2-A2 拡大と計量

$g=\operatorname{diag}(3,1/3)$（対角成分が $3,1/3$ の二次正方行列）を $z=1+i$ に作用させ、速度 $(2,1)$ の変換前後の双曲二乗長さを比較せよ。

- Level: A
- ID: AFR2-A2

<!-- solution-start -->
**詳細解答。** 行列式は1です。

[実特殊線形群の作用](../AFR1/index.md#def-afr1-real-group)で $g\cdot z=3z/(1/3)=9z=9+9i$。

座標写像は $(x,y)\mapsto(9x,9y)$ なので速度は $(18,9)$ です。

[双曲計量](#def-afr2-metric)で変換前は $(4+1)/1^2=5$、変換後は $(324+81)/9^2=5$ です。

倍率9で高さも速度も伸びるため一致します。
<!-- solution-end -->

<a id="ex-afr2-a3"></a>
#### AFR2-A3 固有方程式と保型性の区別

$u(z)=y^3$ の双曲Laplace作用素による固有値を求めよ。また $S\cdot z=-1/z$ を用いてMaass形式か判定せよ。

- Level: A
- ID: AFR2-A3

<!-- solution-start -->
**詳細解答。** $u_{xx}=0$、$u_y=3y^2$、$u_{yy}=6y$ です。

[双曲Laplace作用素](#def-afr2-laplacian)より $\Delta_{\mathbb H}u=-6y^3=-6u$ なので固有値は $-6$ です。

滑らかさと増大条件は $M=3,C=1$ で満たします。

しかし [整数モジュラー群](../../MF/MF1/index.md#def-mf1-modular-group)の元 $S=\begin{pmatrix}0&-1\\1&0\end{pmatrix}$ に対して $S\cdot(2i)=i/2$ なので $u(2i)=8$ と $u(i/2)=1/8$ は異なります。

[重さ0のMaass形式](#def-afr2-maass)の不変条件を失うためMaass形式ではありません。
<!-- solution-end -->

<a id="ex-afr2-a4"></a>
#### AFR2-A4 Fourier係数を取り出す

$u(x+iy)=2+y\cos(4\pi x)$ とする。周期1の複素指数係数 $a_n(y)$ を全て求めよ。

- Level: A
- ID: AFR2-A4

<!-- solution-start -->
**詳細解答。** $\cos(4\pi x)=(e^{4\pi ix}+e^{-4\pi ix})/2$ です。[複素指数係数](../../../解析系/FOU/FOU1/index.md#def-fou1-complex-exponential-coefficient)を周期1に直した積分では、整数 $k\ne0$ のとき

$$
\int_0^1 e^{2\pi ikx}dx
=\frac{e^{2\pi ik}-1}{2\pi ik}=0
$$

で、$k=0$ では1です。係数の定義に展開した式を代入すると

$$
a_n=2\int_0^1 e^{-2\pi inx}dx+
\frac y2\int_0^1(e^{2\pi i(2-n)x}+e^{2\pi i(-2-n)x})\,dx.
$$

各積分が1になる添字だけが残るので

$$
a_0=2,\qquad a_2=a_{-2}=y/2,
$$

その他の係数は0です。
<!-- solution-end -->

<a id="ex-afr2-b1"></a>
#### AFR2-B1 通常の二階微分と反転

$u(X+iY)=Y^2$、$S\cdot z=-1/z$ とする。$v(z)=u(S\cdot z)$ の通常の二階微分の和を $z=2i$ で計算し、双曲Laplace作用素の可換性を直接検算せよ。

- Level: B
- ID: AFR2-B1

<!-- solution-start -->
**詳細解答。** [上半平面への群作用と虚部公式](../../MF/MF1/index.md#thm-mf1-imaginary-action)を反転に適用すると $Y=y/(x^2+y^2)$ なので $v=y^2/(x^2+y^2)^2$。$x$ 方向は

$$
v_x=-4xy^2(x^2+y^2)^{-3},
$$

$$
v_{xx}=-4y^2(x^2+y^2)^{-3}
+24x^2y^2(x^2+y^2)^{-4}.
$$

従って $v_{xx}(0,y)=-4y^{-4}$。$x=0$ に固定すれば $v(0,y)=y^{-2}$ なので $v_{yy}(0,y)=6y^{-4}$。和は $2y^{-4}$、$y=2$ で $1/8$ です。一方 $u_{XX}+u_{YY}=2$ で、通常の二階微分の和はそのまま保存されません。

[双曲Laplace作用素](#def-afr2-laplacian)では $\Delta_{\mathbb H}v(2i)=-4(1/8)=-1/2$。

また $\Delta_{\mathbb H}u=-2Y^2$ で $S\cdot(2i)=i/2$ なので $-2(1/2)^2=-1/2$。

これは [群作用との可換性](#thm-afr2-laplacian-equivariance) と一致します。
<!-- solution-end -->

<a id="ex-afr2-b2"></a>
#### AFR2-B2 重根の場合の定数項

$\lambda=1/4$ の固有方程式を満たす滑らかな周期1の関数の定数項が $a_0(1)=2$、$a_0'(1)=3$ を満たすとする。$a_0(y)$ を求め、方程式へ直接代入せよ。

- Level: B
- ID: AFR2-B2

<!-- solution-start -->
**詳細解答。** [係数方程式](#thm-afr2-fourier-equation)に $n=0,\lambda=1/4$ を代入します。[定数項の一般解](#prop-afr2-zero-mode)で重根 $s=1/2$ の場合なので

$$
a_0=y^{1/2}(A+B\log y).
$$

$y=1$ で $A=2$ です。

$$
a_0'=y^{-1/2}\bigl((A+B\log y)/2+B\bigr)
$$

より $a_0'(1)=A/2+B=3$ なので $B=2$ です。さらに括弧を $H=(A+B\log y)/2+B$ と置くと $H'=B/(2y)$ で

$$
a_0''=y^{-3/2}(-H/2+B/2)
=-\tfrac14 y^{-3/2}(A+B\log y).
$$

これは $-a_0/(4y^2)$ に等しく、求めた $a_0=\sqrt y(2+2\log y)$ は初期条件と方程式を満たします。
<!-- solution-end -->

<a id="ex-afr2-b3"></a>
#### AFR2-B3 非零周波数と増大条件

整数 $n\ne0$ に対し $\Delta_{\mathbb H}u=0$ を満たす周期1の滑らかな関数 $u$ の係数 $a_n$ を考える。$|u(x+iy)|\le C y^M$ が $y\ge1$ の全 $x$ で成立するとき、$a_n$ の増加指数項の係数が0であることを証明せよ。

- Level: B
- ID: AFR2-B3

<!-- solution-start -->
**詳細解答。** [係数方程式](#thm-afr2-fourier-equation)で $\lambda=0$ と置き、$k=2\pi|n|>0$ とすると $a_n''-k^2a_n=0$ です。

$a_n=e^{ky}v(y)$ と置きます。ここでプライムは全て高さ $y$ による常微分です。積の微分から

$$
a_n'=e^{ky}(kv+v'),\qquad
a_n''=e^{ky}(k^2v+2kv'+v'').
$$

元の方程式に代入し、非零の $e^{ky}$ で割ると $v''+2kv'=0$ です。

$(e^{2ky}v')'=0$ から $v'=D e^{-2ky}$、積分して $v=A-D e^{-2ky}/(2k)$、よって

$$
a_n=Ae^{ky}+Be^{-ky}.
$$

一方 [係数の積分表示](#thm-afr2-fourier-equation)と $|e^{-2\pi inx}|=1$ から

$$
|a_n(y)|\le\int_0^1|u(x+iy)|\,dx\le C y^M.
$$

正の $e^{ky}$ で割ると

$$
|A+Be^{-2ky}|\le Cy^M e^{-ky}.
$$

$k>0$ で $M\log y-ky\to-\infty$（$\log y/y\to0$）なので右辺は0に収束します。

左辺は $|A|$ に収束するので $A=0$ です。

指数増加を排除するのは固有方程式だけでなく、増大条件です。
<!-- solution-end -->

<a id="ex-afr2-c1"></a>
#### AFR2-C1 不変な固有関数を構成する

$z=x+iy\in\mathbb H$ に対し

$$
F(z)=\sum_{(m,n)\in\mathbb Z^2\setminus\{(0,0)\}}
\frac{y^2}{|mz+n|^4}
$$

と置く。

(i) コンパクト集合上で全階の偏微分を含む級数が一様収束すること、(ii) $\Gamma=SL_2(\mathbb Z)$ の下で不変で固有値 $-2$ となること、(iii) ある $C>0$ が存在し、全ての $x\in\mathbb R$、$y\ge1$ で $|F(x+iy)|\le Cy^2$ となることを示し、非定数のMaass形式であると結論せよ。

- Level: C
- ID: AFR2-C1

<!-- solution-start -->
**詳細解答。** (i) $Q=(mx+n)^2+m^2y^2$ と置きます。

コンパクト集合 $K\subset\mathbb H$ では $|x|\le R$、$0<\delta\le y\le R$ とできます。まず $Q\ge m^2y^2\ge m^2\delta^2$ です。また $n=(mx+n)-mx$ と平方の不等式から

$$
\begin{aligned}
m^2&\le Q/\delta^2,\\
n^2&\le 2(mx+n)^2+2m^2x^2\\
&\le 2Q+2R^2Q/\delta^2.
\end{aligned}
$$

従って $Q\ge c_K(m^2+n^2)$ となる正の定数 $c_K$ が存在します。

ここで偏微分するのは $x,y$ で、整数 $m,n$ は固定します。

$$
Q_x=2m(mx+n),\quad Q_y=2m^2y,
\qquad Q_{xx}=Q_{yy}=2m^2,\quad Q_{xy}=0.
$$

$2|mn|\le m^2+n^2$ と $K$ 上の座標の有界性から、一階・二階偏微分は定数倍の $m^2+n^2$ に抑えられ、三階以上は0です。

$Q^{-2}$ の任意の偏微分は、連鎖律と積の微分を繰り返せば $Q^{-2-j}$ に $j$ 個の $Q$ の正次数偏微分を掛けた項の有限和です。

実際、分母を微分すると新たな偏微分因子が一つ加わり、分子を微分すれば因子数は変わりません。

各項は定数倍の

$$
(m^2+n^2)^{-2-j}(m^2+n^2)^j=(m^2+n^2)^{-2}
$$

に抑えられます。

$y^2$ とその微分も有界なので同じ評価が項全体に成立します。

整数点を $k=\max(|m|,|n|)\ge1$ で分けると各層は $(2k+1)^2-(2k-1)^2=8k$ 個あり、$m^2+n^2\ge k^2$ です。

従って上界の和は定数倍の $\sum_{k\ge1}8k/k^4$ で有限です。

各偏微分級数は局所一様絶対収束します。

各座標の閉線分を含む小長方形上で有限和の微分を積分し、一様収束で積分と極限を交換することを各階で繰り返せば、和は滑らかで項別微分できます。

(ii) $g=\begin{pmatrix}a&b\\c&d\end{pmatrix}\in\Gamma$ に対し、[上半平面への群作用と虚部公式](../../MF/MF1/index.md#thm-mf1-imaginary-action)を使うと

$$
\frac{(\operatorname{Im}(g\cdot z))^2}{|m(g\cdot z)+n|^4}
=\frac{y^2}{|(ma+nc)z+(mb+nd)|^4}.
$$

$(m,n)\mapsto(m,n)g$ は整数係数の逆行列を持つので非零整数対の全単射です。絶対収束により並べ替えが可能で $F(g\cdot z)=F(z)$ です。

各 $(m,n)\ne(0,0)$ について実数 $\alpha,\beta$ を $\alpha n-\beta m=1$ となるよう選べます。

例えば $\alpha=n/(m^2+n^2)$、$\beta=-m/(m^2+n^2)$ です。

$h=\begin{pmatrix}\alpha&\beta\\m&n\end{pmatrix}\in G$ であり、整数行列である必要はありません。[実特殊線形群の上半平面への作用](../AFR1/index.md#def-afr1-real-group)で導いた虚部の式に $h$ の成分を代入します。

$$
(\operatorname{Im}(h\cdot z))^2=\frac{y^2}{|mz+n|^4}.
$$

[双曲Laplace作用素の群作用との可換性](#thm-afr2-laplacian-equivariance)を $u=y^2$ と $h$ に適用します。

$\Delta_{\mathbb H}y^2=-2y^2$ なので各項に作用させた結果は元の項の $-2$ 倍です。

(i) の二階微分の局所一様収束から $\Delta_{\mathbb H}F=-2F$ です。

(iii) $m=0$ の項は $y^2\sum_{n\ne0}n^{-4}$ です。$m\ne0$ では $A=|m|y\ge1$ とし、整数 $n$ のうち $j\le|n+mx|<j+1$ に入るものは各整数 $j\ge0$ につき高々4個です。従って

$$
\sum_{n\in\mathbb Z}\frac1{((n+mx)^2+A^2)^2}
\le4\sum_{j\ge0}(j^2+A^2)^{-2}.
$$

右辺の被加数は $j\ge0$ で減少するため、和は

$$
4\left(A^{-4}+\int_0^\infty(t^2+A^2)^{-2}dt\right)
\le C_1 A^{-3}
$$

です。最後は $t=Av$ と置くと積分が $A^{-3}\int_0^\infty(1+v^2)^{-2}dv$ となり、この積分は $[0,1]$ で有界、$[1,\infty)$ で $v^{-4}$ 以下だからです。よって $m\ne0$ の寄与は

$$
C_1y^2\sum_{m\ne0}(|m|y)^{-3}
=C_1y^{-1}\sum_{m\ne0}|m|^{-3}.
$$

$y\ge1$ では $y^{-1}\le y^2$ です。二つの収束する逆べき級数を合わせると、$x$ に依存しない定数

$$
C=\sum_{n\ne0}n^{-4}+C_1\sum_{m\ne0}|m|^{-3}
$$

により $|F(x+iy)|\le Cy^2$ が成立します。

全項が正で、$m=0,n=1$ の項だけでも $F(iy)\ge y^2$。

従って非零かつ非定数です。

(i)〜(iii) は [重さ0のMaass形式](#def-afr2-maass)の全条件を検証しています。

固有値が負でも、本講の広い増大条件では矛盾しません。

この格子和の一般の複素パラメータへの拡張は後のEisenstein級数につながります。
<!-- solution-end -->

## 7. 次の講義へ

本講で得たのは、群と両立する微分作用素、保型性と固有方程式の区別、そして各周波数の方程式です。全モジュラー群の基本領域上でどの関数が二乗可積分で、どの定義域で作用素を扱えば固有値の実数性や非負性が得られるかは AFR3 の主題です。ここで得た広い意味でのMaass形式の条件と区別して進みます。
