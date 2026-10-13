# LORG5 凸正規近傍と局所最大化

<!-- definition-example-audit: strict -->

## 1. 近い二点を結ぶ直線は、時計を最も進めるか

[LORG4の指数写像](../LORG4/index.md#prop-lorg4-lorentz-exponential)によって、一点から初速度を指定した測地線を作れるようになりました。しかし、一般の時空で二点を結ぶ測地線が一意に決まる範囲や、その測地線がなぜ固有時を最大にするのかは、まだ調べていません。

[Riemann幾何の凸正規近傍](../../GEO/GEO14/index.md#thm-geo14-convex-normal-existence)では測地線が距離を**最小**にします。ここで扱うLorentz計量は不定符号なので、距離の最短性をそのまま転用することはできません。代わりに未来向き因果曲線の[Lorentz長さ](../LORG3/index.md#def-lorg3-lorentz-length)を比較します。

本章の問いは二つです。

1. 近い**任意の二点**を同じ小さな領域内で一意な測地線で結べるか。
2. 未来向き**時間的**測地線の短い部分は、近くの未来向き因果曲線の中で固有時を最大にするか。

まず指数写像で近傍を構成し、次に測地線に沿って「時計の時刻」を座標に選びます。光的な場合と大域的な最大化は同じ結論に混ぜず、条件の違いを確認します。

以下、$(M,g)$ は滑らかな連結・Hausdorff・第二可算・境界なしの時間向き付きLorentz多様体で、次元は $n+1$（$n\ge1$）、符号は $(-,+,\ldots,+)$ とします。未来向き因果曲線は[LORG3の定義](../LORG3/index.md#def-lorg3-causal-curve)に従う区分的 $C^1$ 曲線で、零速度を許します。測地線のパラメータはアフィンとします。

## 2. 正規座標を作る：局所的な光円錐

Minkowski空間の原点では、ベクトル $v=(t,\mathbf x)$ の因果型は $-t^2+|\mathbf x|^2$ の符号で判定できました。曲がった時空でも、基点 $p$ の接空間では全く同じ線形代数を使えます。そこで、指数写像で接ベクトルを近傍の点へ写し、接空間の錐を実際の曲線へ対応させます。

<a id="def-lorg5-normal-coordinates"></a>

<!-- formal-statement-start -->
> **定義（Lorentz正規座標と放射測地線）**  
> 点 $p\in M$ と $T_pM$ のLorentz正規直交基底 $(e_0,e_1,\ldots,e_n)$ を取り、$e_0$ を未来向き時間的単位ベクトルとする。[指数写像の局所可逆性](../LORG4/index.md#prop-lorg4-lorentz-exponential)により、$0$ を含む星形開集合 $V\subset T_pM$ 上で $\exp_p|_V$ が微分同相となるようにする。この像 $U_p$ を $p$ の**正規近傍**といい、

$$
q=\exp_p\left(x^0e_0+\sum_{i=1}^n x^ie_i\right)
$$

> で定まる $(x^0,\ldots,x^n)$ を **Lorentz正規座標**と呼ぶ。$v\in V$ に対する $\gamma_v(s)=\exp_p(sv)$（$0\le s\le1$）を $p$ からの**放射測地線**という。
<!-- formal-statement-end -->

<!-- definition-example-start: def-lorg5-normal-coordinates -->
**定義の確認**。$(\mathbb R^{1+1},-dt^2+dx^2)$ で $p=(0,0)$、$e_0=\partial_t$、$e_1=\partial_x$ とすると、接続係数は零で $\exp_p(v)=p+v$ です。$V=(-2,2)^2$ は星形で、$U_p=(-2,2)^2$ に写ります。放射曲線は $(st,sx)$、速度の自己内積は $-t^2+x^2$ です。$t>|x|$ なら未来時間的、$t=|x|>0$ なら未来光的、$|x|>t$ なら空間的です。星形という条件は $v\in V$ なら $sv\in V$（$0\le s\le1$）であり、放射曲線が像の中に留まることを保証します。
<!-- definition-example-end -->

<a id="prop-lorg5-normal-coordinate-cone"></a>

<!-- formal-statement-start -->
> **命題（正規座標の基点と放射光円錐）**  
> 上の正規座標で

$$
g_{\mu\nu}(p)=\operatorname{diag}(-1,1,\ldots,1),
\qquad
\Gamma^\mu_{\alpha\beta}(p)=0
$$

> が成り立つ。また $q=\exp_p(v)$ への放射測地線は、$g_p(v,v)<0$、$=0$、$>0$ に応じて、それぞれ時間的、光的、空間的であり、非零因果 $v$ の未来向きも放射曲線上で保たれる。
<!-- formal-statement-end -->

### 証明の見取り図

測地線を正規座標で表すと $x^\mu(s)=sv^\mu$ です。この恒等式を測地線方程式へ代入すると原点のChristoffel係数の対称部分が零になり、Levi-Civita接続は捩率零なので全係数が消えます。因果型は測地線に沿った自己内積保存で判定します。

<!-- proof-start -->
### 証明

基底の正規直交性から $g_{\mu\nu}(p)$ は表示した対角行列です。正規座標で $\gamma_v$ は $x^\mu(s)=sv^\mu$ だから $\ddot x^\mu=0$ です。[LORG4の測地線方程式](../LORG4/index.md#prop-lorg4-geodesic-causal-type)を $s=0$ で使うと

$$
0=\Gamma^\mu_{\alpha\beta}(p)v^\alpha v^\beta
$$

が任意の十分小さい $v$ に成立します。多項式としてすべての二次係数の対称部分が零です。[Levi-Civita接続の捩率零](../LORG4/index.md#thm-lorg4-lorentz-levi-civita)より $\Gamma^\mu_{\alpha\beta}=\Gamma^\mu_{\beta\alpha}$ なので全係数が零です。

さらに $\dot\gamma_v(0)=v$、[測地線の自己内積保存](../LORG4/index.md#prop-lorg4-geodesic-causal-type)から

$$
g_{\gamma_v(s)}(\dot\gamma_v(s),\dot\gamma_v(s))
=g_p(v,v)
=-(v^0)^2+\sum_{i=1}^n(v^i)^2.
$$

未来向き非零因果速度は、連続性と[LORG2の未来判定](../LORG2/index.md#lem-lorg2-timelike-sign)によって未来向きのままです。$\square$
<!-- proof-end -->

この結果は**放射測地線の分類**です。「正規座標の全点で $g_{\mu\nu}=\eta_{\mu\nu}$」とは主張していません。一般には基点から離れると計量係数が変化します。また、接空間で未来光的な方向全体を $\exp_p$ で写した面は**放射光円錐**ですが、この段階でその外側の任意の二点の大域因果関係を判定したわけではありません。

## 3. 「基点から」ではなく「任意の二点」を結ぶ

正規近傍は $p$ からの放射測地線を一意に表すだけです。二点 $x,y$ を両方動かせる近傍が必要です。ここでの「凸」は接続の測地線に関する凸性であり、時空の計量で測った長さの大小を**定義に含めません**。

<a id="def-lorg5-convex-normal"></a>

<!-- formal-statement-start -->
> **定義（Lorentz凸正規近傍）**  
> 開集合 $U\subset M$ が **凸正規近傍**であるとは、任意の二点 $x,y\in U$ に対して、全像が $U$ 内に入るアフィン測地線がちょうど一つ存在し、次の端点条件を満たすものをいう。

$$
\gamma:[0,1]\to U,\qquad \gamma(0)=x,\quad \gamma(1)=y.
$$

> さらに、各 $x\in U$ について $\exp_x$ の零ベクトル近傍における逆写像が $U$ 上で定義できるものとする。曲線の長さの最小性・最大性は仮定しない。
<!-- formal-statement-end -->

<!-- definition-example-start: def-lorg5-convex-normal -->
**定義の確認**。Minkowski空間の開Euclid球 $B_r(p)$ では任意の $x,y$ の間の測地線が

$$
\gamma(s)=(1-s)x+sy
$$

で、球のEuclid凸性により全区間で球内にあります。測地線方程式は $\ddot\gamma=0$ なので、同じアフィン端点条件の別の解は存在しません。$\exp_x(v)=x+v$ は全接空間で可逆です。従って $B_r(p)$ はLorentz凸正規近傍です。球のEuclid凸性を使っても、**固有時が最小**だと言っているわけではありません。
<!-- definition-example-end -->

<a id="thm-lorg5-convex-normal-existence"></a>

<!-- formal-statement-start -->
> **定理（Lorentz凸正規近傍の局所存在）**  
> 滑らかなLorentz多様体 $(M,g)$ の任意の点 $p$ に対して、$p$ を含む任意に小さい凸正規近傍が存在する。近傍を十分小さく取ると、その中の端点 $(x,y)$ に対応するアフィン測地線は端点に滑らかに依存する。
<!-- formal-statement-end -->

### 証明の見取り図

[GEO14の凸正規近傍の構成](../../GEO/GEO14/index.md#thm-geo14-convex-normal-existence)で用いた「端点指数写像の逆」と「座標上の二乗半径の凸性」は**接続の滑らかさ**しか必要としません。正定値計量による最短性の段階だけを除き、この二段階を実際に確認します。小球内に留まる別の測地線も、小さい初速度しか持てないことを評価して一意性を閉じます。

<!-- proof-start -->
### 証明

[LORG4の局所指数写像](../LORG4/index.md#prop-lorg4-lorentz-exponential)を用い、零切断近傍で

$$
E:TM\longrightarrow M\times M,\qquad
E(x,v)=(x,\exp_xv)
$$

を考えます。$v=0_p$ で、接束の局所座標による分解を使うと

$$
dE_{(p,0)}(\xi,\eta)=(\xi,\xi+\eta).
$$

実際、第1成分は基点の変化 $\xi$、第2成分は基点の変化 $\xi$ と [原点での指数写像の微分](../LORG4/index.md#prop-lorg4-lorentz-exponential)による $\eta$ の和です。逆線形写像は $(a,b)\mapsto(a,b-a)$。よって逆写像定理から、$(p,0)$ 周辺の $\mathcal W\subset TM$ と $(p,p)$ 周辺の $\mathcal O\subset M\times M$ の間で $E$ は微分同相になります。

端点 $(x,y)\in\mathcal O$ に対する逆像の繊維成分を $V(x,y)$ とすれば

$$
\gamma_{x,y}(s)=\exp_x(sV(x,y)),
\qquad
\gamma_{x,y}(0)=x,\quad
\gamma_{x,y}(1)=y
$$

です。$V(x,x)=0$ で、$(x,y,s)\mapsto\gamma_{x,y}(s)$ は $(p,p,[0,1])$ 近くで滑らかです。そこで座標を $p$ 中心の正規座標 $z=(z^\mu)$ に取り、通常の**補助的なEuclidノルム** $|z|_{\mathrm E}$ を用います。これはLorentz長さではありません。

十分小さい座標球 $B_R$ の中の任意の測地線 $z(s)$ について

$$
\frac{d^2}{ds^2}|z(s)|_{\mathrm E}^2
=2|\dot z|_{\mathrm E}^2
-2z^\mu\Gamma^\mu_{\alpha\beta}(z)\dot z^\alpha\dot z^\beta.
$$

前節で $\Gamma^\mu_{\alpha\beta}(p)=0$ を証明しました。有限個の滑らかな係数に対し、$B_R$ を縮めて

$$
\left|2z^\mu\Gamma^\mu_{\alpha\beta}(z)
\dot z^\alpha\dot z^\beta\right|
\le|\dot z|_{\mathrm E}^2
$$

とできます。例えば係数の最大絶対値を $K(R)$ とすると、左辺は次元依存定数 $C$ により $CRK(R)|\dot z|_{\mathrm E}^2$ 以下で、$R\downarrow0$ とすると $RK(R)\to0$ です。従って

$$
\frac{d^2}{ds^2}|z(s)|_{\mathrm E}^2
\ge|\dot z(s)|_{\mathrm E}^2\ge0.
$$

$E^{-1}$ の連続性と $[0,1]$ のコンパクト性から、$0<r<R$ を十分小さく取れば $x,y\in B_r$ に対する上の短い測地線は $B_R$ 内に留まります。二乗半径の凸性と両端 $|z(x)|,|z(y)|<r$ から

$$
|z(\gamma_{x,y}(s))|^2
\le (1-s)|z(x)|^2+s|z(y)|^2<r^2
$$

であり、実際には $B_r$ 内に留まります。

ここで「小さい解以外の測地線はないか」を検査します。$\beta:[0,1]\to B_r$ を任意のアフィン測地線とし、$z(s)$ をその座標とします。球をさらに縮めれば、中心を $z(0)$ または $z(1)$ に取り直しても、同じ計算で

$$
f_0(s)=|z(s)-z(0)|^2,\quad
f_1(s)=|z(s)-z(1)|^2,\qquad
f_i''(s)\ge|\dot z(s)|^2
$$

とできます。$f_0(0)=f_0'(0)=0$ と $f_1(1)=f_1'(1)=0$ だから

$$
\begin{aligned}
|z(1)-z(0)|^2
&\ge\int_0^1(1-s)|\dot z(s)|^2\,ds,\\
|z(1)-z(0)|^2
&\ge\int_0^1s|\dot z(s)|^2\,ds.
\end{aligned}
$$

足して、$|z(1)-z(0)|<2r$ から

$$
\int_0^1|\dot z(s)|^2\,ds<8r^2.
$$

また $\ddot z^\mu=-\Gamma^\mu_{\alpha\beta}(z)\dot z^\alpha\dot z^\beta$ と座標球上での $\Gamma$ の有界性を使うと、ある定数 $C_R$ で

$$
\begin{aligned}
|\dot z(0)|
&\le|z(1)-z(0)|+\int_0^1|\ddot z(s)|\,ds\\
&\le2r+C_R\int_0^1|\dot z(s)|^2\,ds
<2r+8C_Rr^2.
\end{aligned}
$$

$r$ をさらに小さくすれば、この初速度は全て $\mathcal W$ の繊維近傍に入り、$E$ の逆写像の一意性から $\dot\beta(0)=V(x,y)$ です。測地線初期値問題の一意性により $\beta=\gamma_{x,y}$。任意に小さい $r$ を取れるので結論を得ます。$\square$
<!-- proof-end -->

**注意**：この証明は補助Euclidノルムでの閉じ込めと初速度評価です。[GEO14のRiemann距離の最短性](../../GEO/GEO14/index.md#thm-geo14-radial-minimizing)を使っていません。これで局所**一意性**と滑らかな端点依存を作ったのであり、固有時の最大性は次節以降で別に証明します。

## 4. 放射方向と横方向の直交関係

指数写像で放射方向を動かすとき、横方向との内積には簡単な保存則があります。Riemannの場合と似た式ですが、使うのは計量両立性と捩率零だけです。

<a id="thm-lorg5-gauss-lemma"></a>

<!-- formal-statement-start -->
> **定理（Lorentz指数写像のGaussの補題）**  
> $p\in M$ と、$\exp_p$ が定義され微分可能な星形開集合 $V\subset T_pM$ を取る。任意の $v\in V$ と $w\in T_pM$ について

$$
g_{\exp_p(v)}\bigl((d\exp_p)_v v,(d\exp_p)_v w\bigr)
=g_p(v,w)
$$

> が成り立つ。
<!-- formal-statement-end -->

### 証明の見取り図

$v$ を $v+uw$ へ少しずらした測地線族を考えます。変分ベクトル $J$ と放射測地線の速度 $T$ に対し、捩率零から $D_tJ=D_uT$ が成り立ちます。$g(T,T)$ が各測地線で一定であることを $u$ で微分すると、$g(T,J)$ の $t$ 微分が定数になるため、両端で値を照合できます。

<!-- proof-start -->
### 証明

まず $v,w$ を固定し、小さい $u$ と $0\le t\le1$ について

$$
F(t,u)=\exp_p(t(v+uw))
$$

を定めます。$u$ を十分小さくすれば星形性と開性から定義できます。$T=\partial_tF$、$J=\partial_uF$ とすると、各 $u$ について $D_tT=0$ であり、初期速度は $v+uw$ です。捩率零から $D_tJ=D_uT$。計量両立性によって

$$
\begin{aligned}
\frac{d}{dt}g(T,J)
&=g(D_tT,J)+g(T,D_tJ)\\
&=g(T,D_uT)
=\frac12\,\partial_u g(T,T).
\end{aligned}
$$

測地線の因果型保存から $g(T,T)=g_p(v+uw,v+uw)$ なので

$$
\left.\frac12\partial_u g(T,T)\right|_{u=0}
=g_p(v,w).
$$

$t=0$ では $F(0,u)=p$ が一定なので $J(0,0)=0$、従って $g(T,J)(0,0)=0$。$t=1$ では

$$
T(1,0)=(d\exp_p)_v v,\qquad
J(1,0)=(d\exp_p)_v w.
$$

$0$ から $1$ まで積分すると $g(T,J)(1,0)=g_p(v,w)$ となり、示す式を得ます。$\square$
<!-- proof-end -->

たとえば $g_p(v,v)=-4$ の未来時間的 $v$ について、横方向の $w$ が $g_p(v,w)=0$ を満たせば、終点で $(d\exp_p)_v v$ と $(d\exp_p)_v w$ も直交します。**直交性は保存されますが、横方向の長さまで一定とは述べていません**。

## 5. 時間的測地線に沿う時計を座標にする

時間的測地線を含むごく小さな領域で、時計の時刻 $t$ と空間座標 $y$ を作ります。これができれば、未来向き因果曲線に対して

$$
-g(\dot\alpha,\dot\alpha)
=(\dot t)^2-h_t(\dot y,\dot y)
\le(\dot t)^2
$$

となり、曲線に沿った固有時が経過座標時刻を超えないことを直接示せます。

<a id="lem-lorg5-gaussian-time"></a>

<!-- formal-statement-start -->
> **補題（時間的測地線に沿うGaussian正規座標）**  
> $(M,g)$ を時間向き付きLorentz多様体とし、$\gamma:(-\varepsilon,\varepsilon)\to M$ を未来向き、単位速度 $g(\dot\gamma,\dot\gamma)=-1$ の測地線とする。$\gamma(0)=p$ とする。$\varepsilon$ を必要なら縮めれば、$\gamma$ の短い部分を含む座標近傍に $(t,y^1,\ldots,y^n)$ を選べて、

$$
\gamma(t)=(t,0,\ldots,0),\qquad
g=-dt^2+h_{ij}(t,y)\,dy^i\,dy^j
$$

> と書ける。各 $t,y$ に対し $(h_{ij})$ は正定値であり、$\partial_t$ は未来向き単位時間的である。
<!-- formal-statement-end -->

### 証明の見取り図

$p$ で $\dot\gamma(0)$ に直交する空間的超平面を取り、その接空間を持つ小さい空間的超曲面 $S$ を作ります。$S$ の未来単位法線 $N$ から測地線を出して $F(t,y)=\exp_{\sigma(y)}(tN_y)$ と置きます。$g(\partial_t,\partial_t)=-1$ は測地線上での保存、$g(\partial_t,\partial_i)=0$ は変分の交換と微分から示します。

<!-- proof-start -->
### 証明

$p$ の局所座標を選び、[時間的ベクトルの直交補空間の正定値性](../LORG1/index.md#lem-lorg1-timelike-orthogonal)から $H=\dot\gamma(0)^\perp\subset T_pM$ が $n$ 次元の空間的部分空間であることを使います。$H$ を接空間に持つ座標超曲面 $S$ を $p$ の近くで取れます。$g|_{TS}$ は $p$ で正定値なので、$S$ を縮めれば全点で正定値です。

$S$ 上には、$\dot\gamma(0)$ と同じ未来向きの滑らかな単位時間的法線場 $N_y$ が存在します。法線は $g(N,N)=-1,\ g(N,\partial_i\sigma)=0$ を解くことで局所的に滑らかに選べます。$S$ の座標表示を $\sigma(y)$、$\sigma(0)=p$ として

$$
F(t,y)=\exp_{\sigma(y)}(tN_y)
$$

と置きます。$F(0,y)=\sigma(y)$、$dF_{(0,0)}$ は $t$ 方向を $\dot\gamma(0)$、$y$ 方向を $H$ の基底に写すため線形同型です。逆写像定理から $F$ は小さい直積座標領域で微分同相になります。$\gamma$ と $t\mapsto F(t,0)$ は位置・初速度が同じ測地線なので、ODEの一意性から一致します。

$T=\partial_tF$、$Y_i=\partial_{y^i}F$ と書くと各 $y$ で $D_tT=0$ です。よって

$$
\partial_tg(T,T)=2g(D_tT,T)=0,\qquad
g(T,T)|_{t=0}=g(N_y,N_y)=-1.
$$

捩率零と座標変分の交換から $D_tY_i=D_iT$ です。従って

$$
\partial_tg(T,Y_i)
=g(D_tT,Y_i)+g(T,D_tY_i)
=g(T,D_iT)
=\frac12\partial_i g(T,T)=0.
$$

$t=0$ では $g(T,Y_i)=g(N_y,\partial_i\sigma)=0$ ですから、任意の $t$ でも $g(T,Y_i)=0$ です。残る $h_{ij}=g(Y_i,Y_j)$ は $t=0$ で正定値であり、連続性から近傍をさらに縮めれば正定値のままです。$T$ の未来向きは初期値と連続性から保存されます。$\square$
<!-- proof-end -->

この座標は、任意の時空全体を一つの $t$ で覆えると主張しません。**一本の短い時間的測地線の近く**で作ったものです。後続の大域双曲性・Cauchy時間関数は、局所時計を大域化するために別の仮定と構成を必要とします。

## 6. 時間的測地線は局所的に固有時を最大化する

測地線は距離を最小にする、と一般のLorentz時空で言うのは誤りです。一方、**短い未来時間的測地線は、十分近くに留まる因果曲線のうちで固有時を最大にする**ことを証明できます。

<a id="thm-lorg5-local-maximization"></a>

<!-- formal-statement-start -->
> **定理（時間的測地線の局所Lorentz長さ最大化）**  
> $(M,g)$ を時間向き付き滑らかなLorentz多様体とし、$\gamma$ を未来向き時間的アフィン測地線とする。任意のパラメータ値 $s_0$ に対し、$s_0$ を含む十分短い閉区間 $[a,b]$ と、その測地線片 $\gamma([a,b])$ を含む開近傍 $W$ を取れる。このとき、端点 $p=\gamma(a)$、$q=\gamma(b)$ を共有し、全像が $W$ に含まれる**任意の**区分的 $C^1$ 未来向き因果曲線 $\alpha$ に対して

$$
L_g(\alpha)\le L_g(\gamma|_{[a,b]})
$$

> が成り立つ。等号なら、$\alpha$ は停止や向き保存再パラメータ化を除いて $\gamma|_{[a,b]}$ と同じ曲線をたどる。
<!-- formal-statement-end -->

### 証明の見取り図

時間的測地線は自己内積が負の定数なので、正の係数を持つ一次式でパラメータを付け直し、固有時の単位速度へ直せます。[Gaussian正規座標](#lem-lorg5-gaussian-time)を使うと、未来向き因果曲線の座標時刻は減らず、固有時の被積分関数は $\dot t$ 以下です。これを積分すれば端点の時刻差が上限です。

<!-- proof-start -->
### 証明

[LORG4の因果型保存](../LORG4/index.md#prop-lorg4-geodesic-causal-type)から $g(\dot\gamma,\dot\gamma)=-c^2$（$c>0$）は一定です。$t=c(s-s_0)$ と単位化すれば速度の自己内積は $-1$。[Lorentz長さの再パラメータ化不変性](../LORG3/index.md#thm-lorg3-reparam-invariance)から固有時による比較へ移ってよいので、端点の座標時刻を $t=0$ と $t=T>0$ とします。

$T$ を十分小さくし、[前節のGaussian正規座標](#lem-lorg5-gaussian-time)が測地線片を含む小領域 $W$ 上で成立するようにします。そこでは

$$
g=-dt^2+h_{ij}(t,y)\,dy^i\,dy^j,\qquad
h_{ij}(t,y)\xi^i\xi^j>0\quad(\xi\ne0).
$$

$\alpha:[u_0,u_1]\to W$ を許された因果曲線とします。各滑らかな部分で $\alpha(u)=(t(u),y(u))$ と置きます。未来向きであることを確認するには、未来単位時間的な $\partial_t$ と[LORG2の未来判定](../LORG2/index.md#lem-lorg2-timelike-sign)を用います。

$$
g(\partial_t,\dot\alpha)=-\dot t.
$$

従って非零未来因果速度では $\dot t>0$、零速度では $\dot t=0$ です。また

$$
g(\dot\alpha,\dot\alpha)
=-(\dot t)^2+h_{ij}\dot y^i\dot y^j\le0
$$

から

$$
0\le\sqrt{(\dot t)^2-h_{ij}\dot y^i\dot y^j}
\le\dot t
$$

です。各滑らかな区間で積分し、区分端点で $t$ が連続であることを用いると

$$
\begin{aligned}
L_g(\alpha)
&=\sum_k\int_{u_{k-1}}^{u_k}
\sqrt{(\dot t)^2-h_{ij}\dot y^i\dot y^j}\,du\\
&\le\sum_k\int_{u_{k-1}}^{u_k}\dot t\,du
=t(u_1)-t(u_0)=T.
\end{aligned}
$$

一方、$\gamma(t)=(t,0)$ だから $g(\dot\gamma,\dot\gamma)=-1$ で

$$
L_g(\gamma|_{[0,T]})
=\int_0^T\sqrt{-(-1)}\,dt=T.
$$

等号なら各連続な非負関数

$$
\dot t-\sqrt{(\dot t)^2-h_{ij}\dot y^i\dot y^j}
$$

の積分が零です。従って各滑らかな区間でこの差が零になり、$h_{ij}\dot y^i\dot y^j=0$。$h$ の正定値性から $\dot y=0$ です。曲線の連続性と始点の $y=0$ から全区間で $y=0$ です。$t$ は単調非減少で端点が $0,T$ なので、像は同じ時間的放射測地線片に一致します。$\square$
<!-- proof-end -->

ここでの $W$ は**測地線片に対して選んだ近傍**です。全時空の任意の競合因果曲線を比べたのではありません。長い区間や $W$ から大きく離れる迂回路に対して同じ不等式を主張するには、大域的な因果条件が必要です。

### 6.1 光的端点を同じ証明で扱えない理由

光的測地線では $g(\dot\gamma,\dot\gamma)=0$ なので、単位時間的法線 $N=\dot\gamma$ を作れず、第5節のGaussian座標をそのまま使えません。また「長さが零」であることだけから任意の因果曲線より**大きい**長さを与えるとは言えません。一般の光的測地線の局所的な因果性・極大性を示すには、局所光円錐を境界として扱う議論が別に要ります。

一方、Minkowski空間では端点差が未来光的なら[「Minkowski時空における端点とLorentz長さ」の定理](../LORG3/index.md#thm-lorg3-minkowski-length-bound)から、両端を結ぶ未来因果曲線の長さはすべて零で、光的直線も長さ零の最大曲線です。この具体例と、上の**時間的**定理の仮定を区別しましょう。

## 7. なぜ大域最大化へ拡張できないか

局所最大化の証明には、短い測地線を含むGaussian座標の**一つの領域**が必要でした。測地線が長くなり、近傍外へ出る曲線との比較が必要になると、同じ座標時計による上界は使えません。

<a id="prop-lorg5-cylinder-nonglobal"></a>

<!-- formal-statement-start -->
> **命題（平坦Lorentz円筒での非最大時間的測地線）**  
> 平坦Lorentz円筒 $M$ に次の計量を与え、未来を $t$ 増加方向に取る。

$$
M=\mathbb R_t\times S^1_\theta,\qquad g=-dt^2+d\theta^2.
$$

> $T>2\pi$ とし、端点を次のように定める。

$$
p=(0,[0]),\qquad q=(T,[0]).
$$

> この二点を結ぶ未来時間的測地線は複数あり、長さを最大にしない時間的測地線が存在する。
<!-- formal-statement-end -->

### 証明の見取り図

時間方向は直進し、空間円周を一周して同じ点へ戻る測地線を考えます。時間的ではありますが、動いた空間方向の分だけ固有時は小さくなります。空間方向に動かない別の時間的測地線と比較すれば反例です。

<!-- proof-start -->
### 証明

$0\le s\le1$ に対し

$$
\gamma_0(s)=(Ts,[0]),\qquad
\gamma_1(s)=(Ts,[2\pi s])
$$

と置きます。局所座標で計量係数は定数なのでChristoffel係数は零、両者は $\ddot t=\ddot\theta=0$ を満たすアフィン測地線です。いずれも始点 $p$ と終点 $q$ を持ちます。$\dot\gamma_0=(T,0)$、$\dot\gamma_1=(T,2\pi)$ に対し

$$
\begin{aligned}
g(\dot\gamma_0,\dot\gamma_0)&=-T^2<0,\\
g(\dot\gamma_1,\dot\gamma_1)&=-T^2+4\pi^2<0
\end{aligned}
$$

で、$T>2\pi$ により両者は未来時間的です。長さは一定速度の[Lorentz長さの積分](../LORG3/index.md#def-lorg3-lorentz-length)から

$$
L_g(\gamma_0)=T,\qquad
L_g(\gamma_1)=\sqrt{T^2-4\pi^2}<T.
$$

従って $\gamma_1$ は時間的測地線でありながら両端間の全因果曲線の中で最大ではありません。$\square$
<!-- proof-end -->

失敗したのは「短い測地線片が一つのGaussian近傍内にある」という条件を外し、円周を一周する長い曲線を比較に加えたことです。曲率が零でも、**時空の大域的な形**だけでこの失敗が起こります。

なおこの例の $\gamma_0$ が最大であることは、空間円周へ投影した曲線の任意の持ち上げについて $|\dot\theta|\ge0$、$\sqrt{\dot t^2-\dot\theta^2}\le\dot t$ を積分して確認できます。反例に必要なのは $\gamma_1$ がそれより短いという事実です。

## 8. 演習：座標・指数写像・局所時計の使い分け

全問題で未来向きの判定は $\partial_t$ に従い、断りがなければ曲線は区分的 $C^1$ です。問題ごとに「局所の比較か、全時空での比較か」を明記してください。

### Level A

<a id="ex-lorg5-a01"></a>
#### LORG5-A01 正規光円錐の分類
- Level: A

Minkowski時空 $\mathbb R^{1+2}$ の $p=0$ から初速度 $v=(3,1,2)$、$w=(2,0,2)$、$u=(1,2,0)$ で出る放射測地線の因果型と未来向きを判定し、$\exp_p(v)$ を求めよ。

<!-- solution-start -->
**詳細解答**。[放射測地線の因果型](#prop-lorg5-normal-coordinate-cone)から、自己内積は

$$
\begin{aligned}
\eta(v,v)&=-3^2+1^2+2^2=-4<0,\\
\eta(w,w)&=-2^2+0^2+2^2=0,\\
\eta(u,u)&=-1^2+2^2+0^2=3>0.
\end{aligned}
$$

$v,w$ は時間成分が正なので未来向きで、それぞれ時間的・光的です。$u$ は空間的なので未来因果とは呼びません。平坦な正規座標では $\exp_p(v)=p+v=(3,1,2)$、放射測地線は $s\mapsto(3s,s,2s)$ です。
<!-- solution-end -->

<a id="ex-lorg5-a02"></a>
#### LORG5-A02 円筒の凸正規近傍でない領域
- Level: A

$M=\mathbb R_t\times S^1_\theta$、$g=-dt^2+d\theta^2$ とする。$U=(-1,1)\times S^1$ が凸正規近傍で**ない**ことを二本の測地線で示せ。

<!-- solution-start -->
**詳細解答**。始点 $x=(0,[0])$、終点 $y=(0,[\pi])$ を取ります。二つの曲線

$$
\gamma_\pm(s)=(0,[\pm\pi s]),\qquad 0\le s\le1
$$

は $g$ のChristoffel係数が局所座標で零なので測地線です。どちらも $U$ 内に留まり、$\gamma_\pm(0)=x$、$\gamma_\pm(1)=y$ ですが、内部では $\gamma_+(1/2)=(0,[\pi/2])$、$\gamma_-(1/2)=(0,[-\pi/2])$ と異なります。[凸正規近傍の定義](#def-lorg5-convex-normal)の一意性が破綻するため $U$ は該当しません。測地線は空間的でも、この一意性の反例として有効です。
<!-- solution-end -->

<a id="ex-lorg5-a03"></a>
#### LORG5-A03 Gaussian時計の最大化
- Level: A

$\mathbb R^{1+1}$ の領域 $0\le t\le3$ で $g=-dt^2+4dx^2$ を考える。$\alpha(t)=(t,t/4)$（$0\le t\le3$）と $\gamma(t)=(t,0)$ の長さを求め、なぜこのままでは二曲線の端点を固定した最大化比較ではないかを答えよ。

<!-- solution-start -->
**詳細解答**。$\alpha'=(1,1/4)$ の自己内積は $-1+4/16=-3/4$、$\gamma'=(1,0)$ は $-1$ です。いずれも未来時間的で

$$
L_g(\alpha)=\int_0^3\sqrt{3/4}\,dt=\frac{3\sqrt3}{2},\qquad
L_g(\gamma)=\int_0^3 1\,dt=3.
$$

ただし終点は $\alpha(3)=(3,3/4)$、$\gamma(3)=(3,0)$ と異なります。[局所最大化の定理](#thm-lorg5-local-maximization)は**端点が同じ**曲線を比較するもので、単に長さが小さいことはその適用例ではありません。
<!-- solution-end -->

<a id="ex-lorg5-a04"></a>
#### LORG5-A04 Gaussの補題の直交性
- Level: A

Minkowski平面で $v=(2,0)$、$w=(0,5)$ を取り、$\exp_p(v)=p+v$ とする。[Gaussの補題](#thm-lorg5-gauss-lemma)の両辺を具体的に計算せよ。

<!-- solution-start -->
**詳細解答**。平坦時空では $(d\exp_p)_v$ は恒等写像です。左辺は

$$
\eta((2,0),(0,5))=-(2)(0)+(0)(5)=0.
$$

右辺も $\eta(v,w)=0$ で一致します。時間的 $v$ に直交する $w$ は空間的であり、指数写像の放射方向と横方向が終点でも直交することの最小例です。
<!-- solution-end -->

<a id="ex-lorg5-a05"></a>
#### LORG5-A05 固有時最大の等号条件
- Level: A

$g=-dt^2+dx^2$ の小領域で、$\alpha(t)=(t,x(t))$ が $0\le t\le T$ に未来因果的で、$x(0)=x(T)=0$ とする。$L_g(\alpha)=T$ なら $x$ が恒等的に零であることを示せ。

<!-- solution-start -->
**詳細解答**。因果性から $1-(x')^2\ge0$、長さは

$$
L_g(\alpha)=\int_0^T\sqrt{1-(x'(t))^2}\,dt\le\int_0^T1\,dt=T.
$$

等号なら非負連続関数 $1-\sqrt{1-(x')^2}$ は区分ごとに積分が零となり、各滑らかな区間で $x'(t)=0$。従って各区間の $x$ は定数で、曲線の連続性から全体で一つの定数です。始点条件 $x(0)=0$ より $x(t)\equiv0$ です。これは[局所最大化の等号条件](#thm-lorg5-local-maximization)を座標で確かめたものです。
<!-- solution-end -->

### Level B

<a id="ex-lorg5-b01"></a>
#### LORG5-B01 時間依存空間計量と固有時の上界
- Level: B

$M=\mathbb R^2$ に $g=-dt^2+e^{2t}dx^2$ を与える。$p=(0,0)$、$q=(2,0)$ とし、$0\le t\le2$ で $(t,x(t))$ と書ける任意の未来因果曲線の長さが $2$ 以下であることを示し、等号の場合を決定せよ。

<!-- solution-start -->
**詳細解答**。$\partial_t$ は未来単位時間的なので、未来因果曲線で $t$ は非減少です。時間座標で表した滑らかな区間について

$$
g((1,x'),(1,x'))=-1+e^{2t}(x')^2\le0
$$

です。従って $e^{2t}(x')^2\le1$ であり、

$$
L_g(\alpha)=\int_0^2\sqrt{1-e^{2t}(x')^2}\,dt\le\int_0^2 1\,dt=2.
$$

一般の区分的 $C^1$ 未来因果曲線でも、$t$ をパラメータとした区間ごとに同じ評価を適用し、停止区間は長さ零です。等号なら全区間で $e^{2t}(x')^2=0$、従って $x'=0$。始点 $x(0)=0$ により $x=0$ です。この縦線はChristoffel係数 $\Gamma^x_{tt}=\Gamma^t_{tt}=0$ により測地線で、長さ $2$ を実現します。
<!-- solution-end -->

<a id="ex-lorg5-b02"></a>
#### LORG5-B02 Gaussian座標の直交条件を導く
- Level: B

$F(t,y)=\exp_{\sigma(y)}(tN_y)$ で各 $t$ 曲線はアフィン測地線、$g(N,N)=-1$、$g(N,\partial_y\sigma)=0$ とする。$T=\partial_tF$、$Y=\partial_yF$ に対し、$g(T,T)=-1$、$g(T,Y)=0$ を、使用する微分則と初期値を明示して導け。

<!-- solution-start -->
**詳細解答**。各 $y$ における測地線方程式 $D_tT=0$ と計量両立性より

$$
\partial_tg(T,T)=g(D_tT,T)+g(T,D_tT)=0.
$$

$t=0$ では $T=N$ なので $g(T,T)|_{t=0}=-1$、よって全 $t$ で $g(T,T)=-1$ です。さらに接続の捩率零と $\partial_t,\partial_y$ の可換性から $D_tY=D_yT$。従って

$$
\partial_tg(T,Y)
=g(D_tT,Y)+g(T,D_tY)
=g(T,D_yT)
=\frac12\partial_y g(T,T)=0.
$$

$t=0$ で $g(T,Y)=g(N,\partial_y\sigma)=0$ なので全 $t$ で零です。これが[時間的測地線に沿うGaussian正規座標](#lem-lorg5-gaussian-time)の交差項 $g_{ty}=0$ を保証します。
<!-- solution-end -->

<a id="ex-lorg5-b03"></a>
#### LORG5-B03 端点指数写像の微分
- Level: B

$E(x,v)=(x,\exp_xv)$ が接束の零切断で持つ微分が $(\xi,\eta)\mapsto(\xi,\xi+\eta)$ であることを示し、逆写像を求めよ。これだけでは近傍の測地線凸性が確定しない理由も述べよ。

<!-- solution-start -->
**詳細解答**。第一成分の微分は $\xi$ です。第二成分は $v=0$ で $\exp_x0=x$ より基点方向の微分が $\xi$、[LORG4の原点微分](../LORG4/index.md#prop-lorg4-lorentz-exponential)より繊維方向の微分が $\eta$ です。従って

$$
dE_{(p,0)}(\xi,\eta)=(\xi,\xi+\eta).
$$

$(a,b)$ が与えられれば $\xi=a$、$\eta=b-a$ と復元でき、逆写像は $(a,b)\mapsto(a,b-a)$ です。逆写像定理で保証されるのは近い端点に対する**短い測地線の一意な初速度**です。その測地線が同じ小近傍内に留まり、別の大きな速度でその近傍内を結ぶ測地線がないことまでは自動的には出ません。[凸正規近傍の存在証明](#thm-lorg5-convex-normal-existence)では二乗半径の凸性と速度評価が必要です。
<!-- solution-end -->

<a id="ex-lorg5-b04"></a>
#### LORG5-B04 円筒で複数の時間的測地線を比較
- Level: B

$M=\mathbb R\times S^1$、$g=-dt^2+d\theta^2$、端点 $(0,[0])$ と $(8,[0])$ を考える。$k\in\mathbb Z$ に対して $\gamma_k(s)=(8s,[2\pi ks])$ と置く。未来時間的となる $k$ の範囲と、その長さを求めて比較せよ。

<!-- solution-start -->
**詳細解答**。定数速度の直線を商に写したので、各 $\gamma_k$ はアフィン測地線で同じ端点を持ちます。速度は $(8,2\pi k)$ で自己内積は

$$
g(\dot\gamma_k,\dot\gamma_k)=-64+4\pi^2k^2.
$$

未来時間的である必要十分条件は $8>0$ と $64>4\pi^2k^2$、すなわち $|k|<4/\pi$ です。整数では $k=-1,0,1$ です。長さは

$$
L_g(\gamma_k)=\sqrt{64-4\pi^2k^2}.
$$

従って $L_g(\gamma_0)=8$、$L_g(\gamma_{\pm1})=\sqrt{64-4\pi^2}<8$。曲率が零でも、巻き付き測地線は最大化しません。[平坦円筒の反例](#prop-lorg5-cylinder-nonglobal)の数値版です。
<!-- solution-end -->

### Level C

<a id="ex-lorg5-c01"></a>
#### LORG5-C01 局所最大と大域非最大を両立させる
- Level: C

$M=\mathbb R_t\times S^1_\theta$、$g=-dt^2+d\theta^2$ とし、$T=3\pi$、$\gamma(s)=(3\pi s,[2\pi s])$（$0\le s\le1$）を考える。

1. $\gamma$ が未来時間的アフィン測地線で、長さが $\pi\sqrt5$ であることを示せ。
2. 同じ端点を結ぶ、これより長い時間的測地線を示せ。
3. それでも $\gamma$ の各点の周りの十分短い測地線片が局所最大化する理由を、適用する補題・その仮定・上界積分まで記して説明せよ。

<!-- solution-start -->
**詳細解答**。局所座標で $g$ の係数は定数だから $\Gamma^\mu_{\alpha\beta}=0$ です。$\gamma$ の加速度は $(0,0)$ なので測地線方程式を満たします。速度は $(3\pi,2\pi)$ で

$$
g(\dot\gamma,\dot\gamma)=-9\pi^2+4\pi^2=-5\pi^2<0,\qquad
\dot t=3\pi>0.
$$

よって未来時間的で、$s\in[0,1]$ でのLorentz長さは

$$
L_g(\gamma)=\int_0^1\sqrt{5\pi^2}\,ds=\pi\sqrt5.
$$

同じ端点を持つ $\beta(s)=(3\pi s,[0])$ もアフィン測地線です。速度は $(3\pi,0)$、長さは

$$
L_g(\beta)=\int_0^1 3\pi\,ds=3\pi>\pi\sqrt5.
$$

従って $\gamma$ は大域最大ではありません。

一方、$\gamma$ は任意の $s_0$ の近くで単位速度の未来時間的測地線へアフィン再パラメータ化できます。$c=\pi\sqrt5$ とおいて、固有時パラメータを

$$
\tau=c(s-s_0)
$$

と定めます。連鎖律と自己内積の計算から

$$
g\left(\frac{d\gamma}{d\tau},\frac{d\gamma}{d\tau}\right)
=\frac{g(d\gamma/ds,d\gamma/ds)}{c^2}
=\frac{-5\pi^2}{5\pi^2}=-1.
$$

[時間的測地線に沿うGaussian正規座標](#lem-lorg5-gaussian-time)を適用すると、十分短い区間 $[a,b]$ を含む近傍で計量は

$$
g=-d\tau^2+h_{\tau,ij}\,dy^i\,dy^j
$$

と表せます。ここで $h_\tau$ は正定値で、測地線は $y=0$ です。端点を固定して**この近傍内を通る**未来因果曲線 $\alpha(u)=(\tau(u),y(u))$ に対し

$$
\sqrt{-g(\dot\alpha,\dot\alpha)}
=\sqrt{(\dot\tau)^2-h_{\tau,ij}\dot y^i\dot y^j}
\le\dot\tau
$$

です。各区間で積分して $L_g(\alpha)\le\tau(b)-\tau(a)=L_g(\gamma|_{[a,b]})$。$\beta$ は長い測地線全体に対する比較であって、この十分小さい局所近傍内で固定した短い端点の比較ではありません。従って局所最大性と大域非最大性は矛盾しません。
<!-- solution-end -->

## 9. まとめ：この局所理論の使い道

- [正規座標の命題](#prop-lorg5-normal-coordinate-cone)は基点での計量と接続係数、放射測地線の因果型を与えます。
- [凸正規近傍の存在](#thm-lorg5-convex-normal-existence)は近い二点の間で**測地線を一意に作る**ための幾何です。最短・最大という評価はその定義には含まれません。
- [Gaussの補題](#thm-lorg5-gauss-lemma)は放射方向と横方向を計量両立性から結びます。
- [Gaussian時計の構成](#lem-lorg5-gaussian-time)と[時間的測地線の局所最大化](#thm-lorg5-local-maximization)は、近傍の中で時間的測地線が最大固有時を持つ理由を積分で説明します。
- [Lorentz円筒の例](#prop-lorg5-cylinder-nonglobal)は、それを大域化するには新しい因果条件が必要なことを示します。

次のLORG6では点の因果的未来・過去を**曲線の存在による集合**として定義します。放射光円錐の方程式だけを、いきなり大域の $I^\pm,J^\pm$ の定義へ置き換えないことが重要です。
