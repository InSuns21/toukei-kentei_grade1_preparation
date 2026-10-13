# CM2-05 低次元Dolbeaultコホモロジーの計算

<!-- definition-example-audit: strict -->

## 1. 非零類を一つ見つけることと、全体を計算すること

前章では[複素トーラスの非零Dolbeault類](../CM2-04/index.md#prop-cm2-04-torus-class)を構成した。しかし、$[d\bar z]\ne0$ だけでは、ほかに独立な類が存在するかどうか分からない。今回欲しいのは、**任意の閉形式を標準代表元と完全形式の和に分解し、標準代表元が一意であることを証明する**ことである。

対照的な二つのコンパクト複素曲線を選ぶ。第一は格子で割ったトーラス $T=\mathbb C/(\mathbb Z+i\mathbb Z)$、第二は二つの正則座標平面で覆える複素射影直線 $\mathbb{CP}^1$ である。どちらも複素次元1だが、結果は異なる。使う道具は、トーラスでは周期関数のFourier級数、射影直線では局所 $\bar\partial$ 方程式とLaurent展開になる。

まず[Dolbeaultコホモロジーの定義](../CM2-04/index.md#def-cm2-04-dolbeault-cohomology)を確認する。複素次元1では $0\le p,q\le1$ だけを考えればよく、$q=1$ ではすべての $(p,1)$ 形式が $\bar\partial$ 閉となる。ただし閉であることと完全であることは異なる。

## 2. 平坦トーラスのFourier座標

$T=\mathbb C/(\mathbb Z+i\mathbb Z)$ では、$z=x+iy$ の $x,y$ をそれぞれ1だけ増やしても同じ点を表す。[格子商の正則アトラス](../CM1-09/index.md#thm-cm1-09-quotient-atlas)で、平行移動は $dz$ と $d\bar z$ を不変にする。そのため任意の滑らかな $(0,1)$ 形式は、一意的に $f(x,y)d\bar z$ と表せる。ここで $f$ は両変数について周期1の滑らかな関数である。

周波数 $(m,n)\in\mathbb Z^2$ に対して $e_{mn}(x,y)=e^{2\pi i(mx+ny)}$ と置く。[複素Fourier係数](../../../解析系/FOU/FOU1/index.md#thm-fou1-coefficient-extraction)に対応する二変数の係数を

$$
\widehat f(m,n)=\int_0^1\!\int_0^1 f(x,y)e^{-2\pi i(mx+ny)}\,dx\,dy
$$

と書く。特に $\widehat f(0,0)$ は基本正方形での平均値である。

<a id="lem-cm2-05-smooth-fourier"></a>

<!-- formal-statement-start -->
> **補題（滑らかな二重周期関数のFourier展開）**  
> $f\in C^\infty(\mathbb R^2)$ が各変数について周期1なら、係数 $\widehat f(m,n)$ は任意の整数 $N\ge0$ に対して定数 $C_N$ を適当に選ぶと

$$
|\widehat f(m,n)|\le C_N(1+m^2+n^2)^{-N}
$$

> を満たす。Fourier級数 $\sum_{m,n}\widehat f(m,n)e_{mn}$ は全ての階数の偏微分後も一様収束し、その和は $f$ である。
<!-- formal-statement-end -->

### 証明の見取り図

一回の部分積分ごとに周波数の因子を分母へ移す。十分な回数繰り返せば、項別微分しても絶対収束する。関数そのものと級数の一致には[三角多項式の稠密性](../../../解析系/FOU/FOU2/index.md#thm-fou2-trigonometric-density)を各変数で順に用いる。

<!-- proof-start -->
### 証明

$\Delta=\partial_x^2+\partial_y^2$ とする。周期性のため、$x=0,1$ および $y=0,1$ の境界項は消える。二回ずつ部分積分すると

$$
\widehat{(1-\Delta)^Nf}(m,n)
=(1+4\pi^2(m^2+n^2))^N\widehat f(m,n)
$$

を得る。左辺の絶対値は $(1-\Delta)^Nf$ の基本正方形上での絶対値の積分以下なので、主張した速い減衰が従う。偏微分 $\partial_x^a\partial_y^b$ を施した項は係数に $(2\pi im)^a(2\pi in)^b$ を乗じるだけである。$N$ を $(a+b+2)/2$ より大きく取れば、二重級数は絶対一様収束する。

この二重級数の和を $g$ とすると、$g$ は滑らかであり、項別積分によってそのFourier係数は $f$ と一致する。そこで差を $h=f-g$ と置く。$h$ の全Fourier係数は零である。

[三角多項式の一様稠密性](../../../解析系/FOU/FOU2/index.md#thm-fou2-trigonometric-density)を、まず $x$ 方向、次に $y$ 方向へ適用する。コンパクトな二次元トーラス上の連続関数は、この手順で二変数三角多項式によって一様近似できる。$h$ に対する近似列を $P_k$ と書くと、$h$ と各 $P_k$ の積分はFourier係数の消失により零となる。従って

$$
\int_{[0,1]^2}|h|^2
=\lim_{k\to\infty}\int_{[0,1]^2}h\,\overline{P_k}=0
$$

となる。$h$ は連続なので $h=0$。$ \square$
<!-- proof-end -->

ここで二変数版の近似は前提の一変数定理から組み立てたものであり、二変数のFourier完全性を無証明で仮定していない。

## 3. $\bar\partial$ を各周波数で割る

[局所公式と座標不変性](../CM2-02/index.md#thm-cm2-02-local-formula)から、周期関数に対して

$$
D=\frac{\partial}{\partial\bar z}
=\frac12(\partial_x+i\partial_y),\qquad
De_{mn}=\lambda_{mn}e_{mn},\qquad
\lambda_{mn}=\pi(im-n)
$$

である。$\lambda_{00}=0$ であり、それ以外では $|\lambda_{mn}|=\pi\sqrt{m^2+n^2}>0$。そこで $f$ の平均値を除いた成分について

$$
u(x,y)=\sum_{(m,n)\ne(0,0)}
\frac{\widehat f(m,n)}{\pi(im-n)}e_{mn}(x,y)
$$

を定める。先の補題で分子は任意の冪より速く減衰する。分母の絶対値は非零整数周波数で $\pi$ 以上なので、$u$ も滑らかな二重周期関数となる。項別微分から

$$
Du=\sum_{(m,n)\ne(0,0)}\widehat f(m,n)e_{mn}
=f-\widehat f(0,0).
$$

<a id="thm-cm2-05-torus-four-groups"></a>

<!-- formal-statement-start -->
> **定理（正方格子トーラスの全Dolbeault群）**  
> $T=\mathbb C/(\mathbb Z+i\mathbb Z)$ とする。$dz,d\bar z$ は格子商に降りた大域形式とする。任意の滑らかな係数 $f$ に対し $\langle f\rangle=\int_{[0,1]^2}f(x,y)\,dx\,dy$ と置く。このとき次の複素線形同型が成立する。

$$
\begin{aligned}
H_{\bar\partial}^{0,0}(T)&=\mathbb C[1],&
H_{\bar\partial}^{1,0}(T)&=\mathbb C[dz],\\
H_{\bar\partial}^{0,1}(T)&=\mathbb C[d\bar z],&
H_{\bar\partial}^{1,1}(T)&=\mathbb C[dz\wedge d\bar z].
\end{aligned}
$$

> 特に $[f\,d\bar z]=\langle f\rangle[d\bar z]$、$[f\,dz\wedge d\bar z]=\langle f\rangle[dz\wedge d\bar z]$ であり、いずれも平均値が零であることと完全性が同値である。
<!-- formal-statement-end -->

### 証明の見取り図

$(0,0)$ と $(1,0)$ では $\bar\partial$ の核を求める。$(0,1)$ と $(1,1)$ では平均値を消す原始形式をFourier級数で作り、平均値を持つ定数形式が完全にならないことを積分で確認する。

<!-- proof-start -->
### 証明

滑らかな周期関数 $f$ について $\bar\partial f=(Df)d\bar z$ である。$Df=0$ なら周波数展開の $\lambda_{mn}\widehat f(m,n)=0$ が全 $(m,n)$ で成立する。非零周波数では $\lambda_{mn}\ne0$ だから $f$ は定数である。$q=0$ には分母となる $(-1)$ 次形式がないため、$H^{0,0}=\mathbb C[1]$ が従う。

$(1,0)$ 形式は $f\,dz$ と書け、

$$
\bar\partial(f\,dz)=(Df)\,d\bar z\wedge dz
=-(Df)\,dz\wedge d\bar z.
$$

従って閉性は $Df=0$ に等しく、同じ理由で $f$ は定数である。よって $H^{1,0}=\mathbb C[dz]$。

複素次元1では $(0,2)$ 形式が零なので、任意の $f\,d\bar z$ は閉である。前節で構成した $u$ を用いると

$$
f\,d\bar z-\langle f\rangle d\bar z
=(Du)d\bar z=\bar\partial u.
$$

逆に $f\,d\bar z=\bar\partial v$ なら、$f=Dv$ なので周期性から

$$
\int_{[0,1]^2}f=\frac12\int_0^1(v(1,y)-v(0,y))\,dy
+\frac i2\int_0^1(v(x,1)-v(x,0))\,dx=0.
$$

したがって $[d\bar z]\ne0$ であり、$H^{0,1}=\mathbb C[d\bar z]$。

同じく $(1,2)$ 形式は零なので任意の $f\,dz\wedge d\bar z$ は閉である。先の $u$ に対し $\beta=-u\,dz$ とすると

$$
\bar\partial\beta=-(Du)d\bar z\wedge dz
=(f-\langle f\rangle)\,dz\wedge d\bar z.
$$

ここでも完全形式の係数は $-\!Dv$ の形で平均値が零となり、逆に平均値が零なら上の $\beta$ が原始形式となる。従って $[dz\wedge d\bar z]\ne0$ と $H^{1,1}=\mathbb C[dz\wedge d\bar z]$ を得る。$ \square$
<!-- proof-end -->

**直接計算**。$f=2+e^{2\pi ix}+e^{2\pi iy}$ なら $\langle f\rangle=2$。非零周波数に対応する原始関数は

$$
u=\frac{e^{2\pi ix}}{\pi i}-\frac{e^{2\pi iy}}{\pi},
\qquad Du=e^{2\pi ix}+e^{2\pi iy}.
$$

従って $[f\,d\bar z]=2[d\bar z]$。代表元を一つ示すだけでなく、任意の $f$ に対して同じ結論が成立するのが定理の強さである。

## 4. 射影直線では二つの局所解を比べる

[複素射影直線の正則アトラス](../CM1-10/index.md#thm-cm1-10-projective-atlas)から

$$
U_0=\mathbb{CP}^1\setminus\{\infty\}\cong\mathbb C_z,\qquad
U_\infty=\mathbb{CP}^1\setminus\{0\}\cong\mathbb C_w,\qquad
w=1/z
$$

で覆える。重なりは $\mathbb C^*$ である。ここで局所原始形式の差を使うには、**各チャート全体**で $\bar\partial$ 方程式を解ける必要がある。[局所補題](../CM2-03/index.md#thm-cm2-03-local-dbar-poincare)だけから、チャート全体の可解性を言ってはいけない。

<a id="lem-cm2-05-global-plane-dbar"></a>

<!-- formal-statement-start -->
> **補題（複素平面上の大域bar∂可解性）**  
> 任意の滑らかな関数 $f\in C^\infty(\mathbb C)$ に対して、滑らかな関数 $u\in C^\infty(\mathbb C)$ が存在して

$$
\frac{\partial u}{\partial\bar z}=f
$$

> を満たす。
<!-- formal-statement-end -->

### 証明の見取り図

コンパクト台の場合には[一変数Cauchy変換の右逆](../CM2-03/index.md#thm-cm2-03-one-variable-inverse)を使える。一般の $f$ は広がる円板上で切って解き、解の差が正則であることを利用して、多項式の補正を入れながら極限を取る。

<!-- proof-start -->
### 証明

整数 $j\ge2$ に対し、滑らかな切断関数 $\chi_j$ を、$|z|\le j$ で1、$|z|\ge j+1$ で0となるよう取る。前掲の[Cauchy変換の右逆](../CM2-03/index.md#thm-cm2-03-one-variable-inverse)を $g_j=\chi_jf$ に適用して $v_j\in C^\infty(\mathbb C)$、$\partial_{\bar z}v_j=g_j$ を得る。$|z|<j$ では $g_j=g_{j+1}=f$ なので

$$
\partial_{\bar z}(v_{j+1}-v_j)=0\qquad (|z|<j).
$$

[正則性判定](../CM2-02/index.md#prop-cm2-02-holomorphic-function)により $v_{j+1}-v_j$ は円板 $|z|<j$ で正則である。そのTaylor級数の部分和を十分長く取れば、多項式 $P_j$ を選んで、円板 $|z|\le j-1$ で全ての $a+b\le j$ に対し

$$
\sup_{|z|\le j-1}
|\partial_x^a\partial_y^b(v_{j+1}-v_j-P_j)|<2^{-j}
$$

とできる。これはTaylor級数の各階微分が真に内側の閉円板上で一様収束するためである。

$N\ge3$ に対して $u_N=v_N-\sum_{j=2}^{N-1}P_j$ と置く。多項式は正則だから $\partial_{\bar z}u_N=f$ が $|z|<N$ で成立する。また

$$
u_{N+1}-u_N=v_{N+1}-v_N-P_N.
$$

任意の固定円板 $|z|\le R$ と任意の微分階数 $k$ を固定すると、$N>R+1,k$ で上の全 $k$ 階以下の偏微分の差は $2^{-N}$ 以下となる。幾何級数 $\sum_N2^{-N}$ は収束するので $u_N$ はコンパクト集合上で全階微分とともに収束し、滑らかな極限 $u$ を持つ。各点を含む円板で $\partial_{\bar z}u_N=f$ を極限へ移して $\partial_{\bar z}u=f$。$ \square$
<!-- proof-end -->

続いて $p=0,1$ を固定する。$p=0$ なら局所原始形式は関数、$p=1$ なら局所原始形式は $(1,0)$ 形式である。上の補題を係数に使えば、射影直線上の任意の $(p,1)$ 形式 $\alpha$ には

$$
\bar\partial\beta_0=\alpha|_{U_0},\qquad
\bar\partial\beta_\infty=\alpha|_{U_\infty}
$$

を満たす局所原始形式が存在する。$p=1$ なら $\alpha=A(z)\,dz\wedge d\bar z$ に対し $\beta_0=g(z)dz$ として $\partial_{\bar z}g=-A$ を解けばよい。

<a id="lem-cm2-05-two-chart-quotient"></a>

<!-- formal-statement-start -->
> **補題（二つの座標領域による障害の商表示）**  
> $X=\mathbb{CP}^1$ を上の $U_0,U_\infty$ で覆い、$p=0$ または $1$ とする。$U_0\cap U_\infty=\mathbb C^*$ 上の正則 $p$ 形式の空間を $\Omega^p(\mathbb C^*)$、各領域上の正則 $p$ 形式の制限の差が作る部分空間を $\Omega^p(U_0)|_{\mathbb C^*}-\Omega^p(U_\infty)|_{\mathbb C^*}$ と書く。このとき

$$
H_{\bar\partial}^{p,1}(\mathbb{CP}^1)
\cong
\frac{\Omega^p(\mathbb C^*)}
{\Omega^p(U_0)|_{\mathbb C^*}-\Omega^p(U_\infty)|_{\mathbb C^*}}.
$$
<!-- formal-statement-end -->

### 証明の見取り図

前章の[局所原始関数の貼り合わせ判定](../CM2-04/index.md#thm-cm2-04-gluing-obstruction)を $p=1$ の形式にも同じ引き算で適用する。さらに逆向きには、重なり上の正則形式を切断関数で二つの滑らかな局所形式に分けて、そこから大域的な $\bar\partial$ 閉形式を作る。

<!-- proof-start -->
### 証明

任意の $\alpha\in\mathcal A^{p,1}(X)$ は閉である。上記の $\beta_0,\beta_\infty$ を取り、$c=\beta_0-\beta_\infty$ と置くと、$\bar\partial c=0$ だから $c$ は $\mathbb C^*$ 上の正則 $p$ 形式である。局所解を別に選んだ場合の差は各チャートの正則 $p$ 形式なので、$[c]$ の商類は変わらない。$\alpha=\bar\partial\beta$ が大域で成立すれば、$\beta_0-\beta$ と $\beta_\infty-\beta$ はそれぞれ正則で、その差は $c$。逆に $c=h_0-h_\infty$ と分解できれば $\beta_0-h_0$ と $\beta_\infty-h_\infty$ は重なりで一致し、大域原始形式 $\beta$ を与える。これで零類判定と単射が従う。

全射を示す。任意の正則 $p$ 形式 $c$ を $\mathbb C^*$ 上で取る。滑らかな実関数 $\rho=\rho(|z|)$ を $|z|\le1$ で0、$|z|\ge2$ で1とする。$\beta_0=\rho c$ は $U_0$ 上で、$\beta_\infty=-(1-\rho)c$ は $U_\infty$ 上で滑らかに延長できる（それぞれ除いた点の近くでは零）。重なりで $\beta_0-\beta_\infty=c$ だから

$$
\bar\partial\beta_0-\bar\partial\beta_\infty
=\bar\partial c=0.
$$

従って $\alpha|_{U_0}=\bar\partial\beta_0$、$\alpha|_{U_\infty}=\bar\partial\beta_\infty$ は一致して大域的な $(p,1)$ 形式 $\alpha$ を定め、その障害の類は $[c]$ である。$ \square$
<!-- proof-end -->

この商表示によって、微分方程式の問題は「Laurent級数のどの冪が、どちらかのチャートへ正則に延長できるか」という計算へ変わった。

## 5. Laurent級数から射影直線の全群を出す

$p=0$ では重なりの正則関数はLaurent級数 $c(z)=\sum_{k\in\mathbb Z}a_kz^k$ を持つ。ここで係数の正の側

$$
h_0(z)=\sum_{k\ge0}a_kz^k
$$

は $z$ 平面全体で正則、負の側

$$
h_\infty(w)=-\sum_{k\le-1}a_kw^{-k}
$$

は $w=1/z$ 平面全体で正則である。Laurent級数は $0<|z|<\infty$ の全環状域で収束するため、各側の級数も任意の有限半径で一様収束する。$c=h_0-h_\infty$ となり、商のすべての類は零である。

$p=1$ では、重なりの正則1形式を $c(z)=\sum_ka_kz^k\,dz$ と書く。$U_0$ の正則1形式 $h_0(z)dz$ は $k\ge0$ の冪を除ける。他方、$U_\infty$ で正則な $h_\infty(w)dw$ を $z$ で書けば

$$
h_\infty(1/z)\,d(1/z)
=-h_\infty(1/z)z^{-2}\,dz
$$

となり、こちらは $k\le-2$ の冪を除ける。**$z^{-1}dz$ だけはどちらの側からも生じない**。よってそのLaurent係数 $a_{-1}$ が全障害を測る。

<a id="thm-cm2-05-projective-line-four-groups"></a>

<!-- formal-statement-start -->
> **定理（複素射影直線の全Dolbeault群）**  
> $X=\mathbb{CP}^1$ に対して、$0\le p,q\le1$ のDolbeaultコホモロジーは

$$
H_{\bar\partial}^{0,0}(X)\cong\mathbb C,\qquad
H_{\bar\partial}^{1,0}(X)=0,\qquad
H_{\bar\partial}^{0,1}(X)=0,\qquad
H_{\bar\partial}^{1,1}(X)\cong\mathbb C
$$

> となる。最後の同型は、二つの座標領域の局所原始 $(1,0)$ 形式の差の、$z^{-1}dz$ のLaurent係数によって与えられる。
<!-- formal-statement-end -->

### 証明の見取り図

正則関数はコンパクトな射影直線上で定数となる。正則1形式は無限遠点での座標変換に耐えられず零になる。正の反正則次数については直前の商表示と、上のLaurent級数の分解を使う。

<!-- proof-start -->
### 証明

$H^{0,0}$ は[零次コホモロジーの正則形式との同定](../CM2-04/index.md#prop-cm2-04-zero-degree)で大域正則関数に一致する。$\mathbb{CP}^1$ は[射影直線のコンパクト性](../CM1-10/index.md#thm-cm1-10-projective-topology)を持つので、正則関数の絶対値は最大値を取り、[最大値原理](../../../解析系/CA/CA3/index.md#thm-ca3-maximum-modulus)により連結な $X$ 上で定数である。

大域正則1形式を $f(z)dz$ と書くと、無限遠点の近くでは

$$
f(z)dz=-f(1/w)w^{-2}dw.
$$

右辺の係数が $w=0$ まで正則なら、十分大きな $|z|$ に対して $|f(z)|\le C|z|^{-2}$ である。$f$ は $\mathbb C$ 全体で正則かつ有界なのでLiouvilleの定理で定数、さらに無限遠で零へ向かうから定数は零である。従って $H^{1,0}=0$。

$H^{0,1}$ については[二チャートの商表示](#lem-cm2-05-two-chart-quotient)を使う。直前のLaurent分解は任意の重なりの正則関数を両側からの制限の差に表すので、商は零。

$H^{1,1}$ についても同じ商表示を使う。任意のLaurent級数の $k\ge0$ と $k\le-2$ の成分は両チャートの正則1形式で除去できるので、商の各類は $a_{-1}[z^{-1}dz]$ の形である。反対に、チャート $U_0$ で正則な1形式のLaurent級数には $z^{-1}$ 項がなく、チャート $U_\infty$ で正則な1形式の座標表示にも上式から $z^{-1}$ 項がない。従って $a_{-1}$ は商で不変であり、$[z^{-1}dz]\ne0$。これで1次元の同型が成立する。$ \square$
<!-- proof-end -->

**具体的な非零代表**。先の滑らかな $\rho$ を用い、$U_0$ 上で $\beta_0=\rho(z)\,dz/z$、$U_\infty$ 上で $\beta_\infty=-(1-\rho(z))\,dz/z$ と置く。どちらもそのチャート全体で滑らかで、重なりの差は $dz/z$ である。よって大域形式

$$
\alpha=\bar\partial\beta_0=\bar\partial\beta_\infty
$$

が定義され、局所原始形式の差のLaurent係数は $a_{-1}=1$。この $\alpha$ は $H^{1,1}$ の非零類を具体的に表す。$dz/z$ 自体は射影直線上の大域正則1形式ではなく、**二つの局所原始形式の差**として登場している点に注意する。

## 6. 二つの曲線で何が異なったか

| 複素曲線 | $H^{0,0}$ | $H^{1,0}$ | $H^{0,1}$ | $H^{1,1}$ |
| --- | ---: | ---: | ---: | ---: |
| $T=\mathbb C/(\mathbb Z+i\mathbb Z)$ | $\mathbb C$ | $\mathbb C$ | $\mathbb C$ | $\mathbb C$ |
| $\mathbb{CP}^1$ | $\mathbb C$ | $0$ | $0$ | $\mathbb C$ |

トーラスでは周期関数の**零周波数**が大域的な障害となる。射影直線では二つのチャートで局所解を比較したときの**Laurent係数**が障害となる。どちらも「局所的な $\bar\partial$ 原始形式を大域へ貼り合わせられるか」を計算したものであり、実のde Rhamコホモロジーをそのまま名前だけ変えたものではない。

これらの計算は複素構造と $\bar\partial$ の具体的な理解を与える。続く正則線束の議論では、チャート間で正則なデータを照合する操作が、形式から局所座標を結ぶ正則な係数関数へ移る。

## 7. 演習：平均値、周期、Laurent係数を使い分ける

### Level A

<a id="ex-cm2-05-a01"></a>
#### CM2-05-A01 周波数の固有値
- Level: A

$e_{1,0}=e^{2\pi ix}$、$e_{0,1}=e^{2\pi iy}$、$e_{-1,1}=e^{2\pi i(-x+y)}$ について、$De_{mn}$ を計算せよ。

<!-- solution-start -->
**詳細解答**。$D=(\partial_x+i\partial_y)/2$ を用いる。$De_{mn}=(2\pi im+i2\pi in)e_{mn}/2=\pi(im-n)e_{mn}$。従って順に $\pi i e_{1,0}$、$-\pi e_{0,1}$、$(-\pi i-\pi)e_{-1,1}$。いずれも零でなく、零周波数 $(0,0)$ だけが核に残る。
<!-- solution-end -->

<a id="ex-cm2-05-a02"></a>
#### CM2-05-A02 正則周期関数
- Level: A

$T$ 上の滑らかな関数 $u$ で $\bar\partial u=0$ なら定数であることをFourier係数から示せ。

<!-- solution-start -->
**詳細解答**。$u=\sum_{m,n}\widehat u(m,n)e_{mn}$ を全階微分可能な級数として展開する。[滑らかな二重周期関数のFourier展開](#lem-cm2-05-smooth-fourier)より $Du=\sum\lambda_{mn}\widehat u(m,n)e_{mn}$。$Du=0$ なら係数の一意性により $\lambda_{mn}\widehat u(m,n)=0$。$(m,n)\ne(0,0)$ では $\lambda_{mn}\ne0$、従って $\widehat u(m,n)=0$。ゆえに $u=\widehat u(0,0)$ は定数。
<!-- solution-end -->

<a id="ex-cm2-05-a03"></a>
#### CM2-05-A03 明示的な完全形式
- Level: A

$T$ 上の $(0,1)$ 形式 $\alpha=(e^{2\pi ix}-2e^{2\pi iy})d\bar z$ の原始関数を一つ求めよ。

<!-- solution-start -->
**詳細解答**。$De^{2\pi ix}=\pi i e^{2\pi ix}$、$De^{2\pi iy}=-\pi e^{2\pi iy}$ なので、

$$
u=\frac{e^{2\pi ix}}{\pi i}+\frac{2e^{2\pi iy}}{\pi}
$$

と置けば $Du=e^{2\pi ix}-2e^{2\pi iy}$。よって $\bar\partial u=\alpha$。両指数関数は両変数で周期1なので $u$ は本当に $T$ 上の関数である。
<!-- solution-end -->

<a id="ex-cm2-05-a04"></a>
#### CM2-05-A04 無限遠での1形式
- Level: A

$\mathbb{CP}^1$ の $z$ チャートで $dz$ と $z^{-2}dz$ を $w=1/z$ で書き、いずれが各チャート全体で正則な1形式か判定せよ。

<!-- solution-start -->
**詳細解答**。$dz=-w^{-2}dw$ なので $dz$ は $z$ チャートで正則だが $w=0$ で極を持つ。他方 $z^{-2}dz=w^2(-w^{-2}dw)=-dw$ は $w$ チャートで正則だが、$z=0$ で極を持つ。従ってどちらも $\mathbb{CP}^1$ 全体の正則1形式にはならない。
<!-- solution-end -->

<a id="ex-cm2-05-a05"></a>
#### CM2-05-A05 関数のLaurent分解
- Level: A

$\mathbb C^*$ 上の正則関数 $c(z)=z^{-2}+3+2z$ を $c=h_0(z)-h_\infty(1/z)$ と分解せよ。ただし $h_0,h_\infty$ は各平面全体で正則とする。

<!-- solution-start -->
**詳細解答**。非負冪を $h_0(z)=3+2z$ と取る。残りの負冪は $z^{-2}$ なので、$h_\infty(w)=-w^2$ と取れば $h_0(z)-h_\infty(1/z)=3+2z+z^{-2}$。各関数は多項式で各チャート全体に延長され、$c$ は商で零となる。
<!-- solution-end -->

### Level B

<a id="ex-cm2-05-b01"></a>
#### CM2-05-B01 トーラス上の一般類
- Level: B

$T$ 上で $\alpha=(3+2e^{2\pi ix}-e^{2\pi iy})d\bar z$ とする。$\alpha$ のコホモロジー類と、その定数代表を除いた部分の原始関数を求めよ。

<!-- solution-start -->
**詳細解答**。定数項以外の周波数は $(1,0),(0,1)$ なので平均値は3。[正方格子トーラスの全Dolbeault群](#thm-cm2-05-torus-four-groups)より $[\alpha]=3[d\bar z]$。原始関数を

$$
u=\frac{2}{\pi i}e^{2\pi ix}+\frac{1}{\pi}e^{2\pi iy}
$$

と置くと $Du=2e^{2\pi ix}-e^{2\pi iy}$。従って $\alpha-3d\bar z=\bar\partial u$。平均値が3で零でないため、$\alpha$ 自身は完全ではない。
<!-- solution-end -->

<a id="ex-cm2-05-b02"></a>
#### CM2-05-B02 $(1,1)$ の符号
- Level: B

$T$ 上で $\gamma=(5+e^{2\pi ix})dz\wedge d\bar z$ とする。類を決定し、定数成分を除く原始 $(1,0)$ 形式を求めよ。

<!-- solution-start -->
**詳細解答**。平均値は5だから $[\gamma]=5[dz\wedge d\bar z]$。$De^{2\pi ix}=\pi i e^{2\pi ix}$ を用いて

$$
\beta=-\frac{e^{2\pi ix}}{\pi i}dz
$$

と置く。すると

$$
\bar\partial\beta
=-e^{2\pi ix}d\bar z\wedge dz
=e^{2\pi ix}dz\wedge d\bar z
=\gamma-5dz\wedge d\bar z.
$$

負号を一つ余分に見せたのは、$d\bar z\wedge dz=-dz\wedge d\bar z$ を忘れないためである。
<!-- solution-end -->

<a id="ex-cm2-05-b03"></a>
#### CM2-05-B03 正則1形式のLaurent障害
- Level: B

重なり $\mathbb C^*$ の正則1形式 $c=(z^{-3}+4z^{-1}+5z^2)dz$ が定める $H_{\bar\partial}^{1,1}(\mathbb{CP}^1)$ の類を求め、各チャートで除去する項を示せ。

<!-- solution-start -->
**詳細解答**。$5z^2dz$ は $U_0$ で正則な1形式である。$w=1/z$ とすると $dw=-z^{-2}dz$、従って $z^{-3}dz=-w\,dw$ は $U_\infty$ で正則である。商ではこの二項を引き去れる。一方 $z^{-1}dz=-w^{-1}dw$ は両側のどちらにも正則延長できない。[複素射影直線の全Dolbeault群](#thm-cm2-05-projective-line-four-groups)より類は標準生成元の4倍であり、零ではない。
<!-- solution-end -->

<a id="ex-cm2-05-b04"></a>
#### CM2-05-B04 局所原始関数の貼り合わせ
- Level: B

$\mathbb{CP}^1$ の二つのチャート上で、ある $(0,1)$ 形式 $\alpha$ の原始関数 $u_0,u_\infty$ があり、重なりで $u_0-u_\infty=z^2+z^{-3}$ となった。大域原始関数を貼り合わせる正則補正を明示せよ。

<!-- solution-start -->
**詳細解答**。$h_0(z)=z^2$、$h_\infty(w)=-w^3$ と置けば重なりで $h_0(z)-h_\infty(1/z)=z^2+z^{-3}=u_0-u_\infty$。従って $v_0=u_0-h_0$ と $v_\infty=u_\infty-h_\infty$ は重なりで一致する。正則補正の $\bar\partial$ は零だから、貼り合わせて得る滑らかな大域関数 $v$ は $\bar\partial v=\alpha$ を満たす。[零類判定](../CM2-04/index.md#prop-cm2-04-quotient)より $[\alpha]=0$。
<!-- solution-end -->

### Level C

<a id="ex-cm2-05-c01"></a>
#### CM2-05-C01 トーラスの自己写像と全コホモロジー
- Level: C

$T=\mathbb C/(\mathbb Z+i\mathbb Z)$、整数 $m\ge2$ に対し $F_m:T\to T$ を $[z]\mapsto[mz]$ とする。

1. この写像が良定義かつ正則であることを示せ。
2. $F_m^*$ が $H_{\bar\partial}^{p,q}(T)$ に誘導する作用を四つの次数 $(p,q)$ すべてについて計算せよ。
3. $m=2$ のとき、$[d\bar z]$ が非零であるにもかかわらず引き戻しで零にならないことを説明せよ。

<!-- solution-start -->
**詳細解答**。(1) $z'=z+a+ib$（$a,b\in\mathbb Z$）なら $mz'=mz+ma+i\,mb$ で差は格子に属する。従って商写像は良定義。被覆空間では複素線形写像 $z\mapsto mz$ であり、[正則座標の定義](../CM1-02/index.md#def-cm1-02-holomorphic-map)から正則である。

(2) 被覆空間上で $F_m^*1=1$、$F_m^*dz=d(mz)=m\,dz$、$F_m^*d\bar z=d(m\bar z)=m\,d\bar z$（$m$ は実整数）、外積の自然性により

$$
F_m^*(dz\wedge d\bar z)=m^2\,dz\wedge d\bar z.
$$

[コホモロジー引き戻し](../CM2-04/index.md#prop-cm2-04-functoriality)はこれらの式を商類へ降ろす。[トーラスの全群定理](#thm-cm2-05-torus-four-groups)の各生成元を使うと $H^{0,0}$ 上で1倍、$H^{1,0}$ と $H^{0,1}$ 上で $m$ 倍、$H^{1,1}$ 上で $m^2$ 倍である。

(3) $F_2^*[d\bar z]=2[d\bar z]$。$[d\bar z]$ は基本正方形での平均値1に対応し非零であり、複素数体上では2倍しても非零である。引き戻しが局所的に2を掛けるだけでなく、コホモロジー上にも明確な線形作用を誘導することが分かる。
<!-- solution-end -->
