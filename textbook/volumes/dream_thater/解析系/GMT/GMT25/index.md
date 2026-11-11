# GMT25 縮約境界と測度論的外向き法線

<!-- definition-example-audit: strict -->

## 1. 境界のどの点に外向き法線を置けるか

前講の[Gauss--Green測度](../GMT24/index.md#def-gmt24-gauss-green)は、有限周長集合 $E$ に対して、境界の向きと大きさをベクトル値測度として記録しました。しかしその測度の単位方向を表す法線は**周長測度に関してほとんど至る所**で決まるものであり、特定の点 $x$ に値を指定する操作とは違います。例えば正方形の角には二つの面から異なる法線が近づきます。ここで「法線が一方向に揃っている境界点」を、測度の球平均から取り出します。

以下、$d\ge1$、$\Omega\subset\mathbb R^d$ は開集合、$E\subset\mathbb R^d$ はLebesgue可測集合とします。$B_r(x)$ は中心 $x$・半径 $r>0$ の開球、$\omega_d=\mathcal L^d(B_1(0))$ は単位球の体積です。$E$ は $\Omega$ で**局所有限周長**を持つと仮定します。これは各 $U\Subset\Omega$ で $P(E;U)<\infty$ という意味です。[前講の測度表示](../GMT24/index.md#thm-gmt24-gauss-green)を局所的に適用して

$$
\mathcal G_E=-D\chi_E=\nu_E\,\mu_E,\qquad
\mu_E=|D\chi_E|=|\mathcal G_E|,\qquad |\nu_E|=1\ \mu_E\text{-a.e.}
$$

と書きます。$\mu_E$ は非負Radon測度、$\nu_E$ は $\mu_E$-ほとんど至る所で定義された外向き単位ベクトルです。$\mathcal G_E(B_r(x))$ は球の中の**ベクトルの和**、$\mu_E(B_r(x))$ は球の中の**周長の総量**です。相殺の有無を比較することが今回の着眼点です。

## 2. 体積で見える境界と、向きで見える境界

境界の別の見方として、$E$ が小球の体積の何割を占めるかを調べます。球における割合は $0$ と $1$ の間にあるので、端点とその中間を区別できます。ここで使うのは[GMT1の一般測度の球密度](../GMT1/index.md#def-gmt1-upper-lower-density)とは分母の違う、**Lebesgue体積比**です。

<a id="def-gmt25-essential-boundary"></a>

<!-- formal-statement-start -->
> **定義（体積密度と本質的境界）**
> $E\subset\mathbb R^d$ をLebesgue可測集合とする。点 $x\in\mathbb R^d$ における体積密度を、極限が存在する場合に

$$
\theta_E(x)=\lim_{r\downarrow0}
\frac{\mathcal L^d(E\cap B_r(x))}{\omega_d r^d}
$$

> で定める。$E^{(0)}=\{x:\theta_E(x)=0\}$ を測度論的外部、$E^{(1)}=\{x:\theta_E(x)=1\}$ を測度論的内部とし、**本質的境界**を

$$
\partial^eE=\mathbb R^d\setminus(E^{(0)}\cup E^{(1)})
$$

> とする。極限が存在せず、$0$ と $1$ のどちらとも判定できない点も $\partial^eE$ に含める。
<!-- formal-statement-end -->

<!-- definition-example-start: def-gmt25-essential-boundary -->
**定義の確認**（半空間）。$E=\{x\in\mathbb R^d:x_d<0\}$ とします。$x_d<0$ なら $r<-x_d$ の球は $E$ に含まれ体積比1、$x_d>0$ なら小球は $E$ と交わらず比0です。$x_d=0$ なら反射 $(x',t)\mapsto(x',-t)$ が球の上下半分を交換するため、すべての $r>0$ で体積比は $1/2$ です。よって $E^{(1)}=\{x_d<0\}$、$E^{(0)}=\{x_d>0\}$、$\partial^eE=\{x_d=0\}$ です。定義の可測性・分母・極限の三点を直接確かめました。
<!-- definition-example-end -->

位相的境界 $\partial E$ は点を一つ抜いた操作にさえ反応しますが、$\theta_E$ はLebesgue零集合の追加・削除で変わりません。体積比が $1/2$ なら二側が同じ量だけ見えるものの、**法線が一方向へ揃うかどうかはまだ分かりません**。

次に球の周長測度が正である点を考えます。正測度 $\mu_E$ の台 $\operatorname{supp}\mu_E$ とは、任意の $r>0$ で $\mu_E(B_r(x))>0$ となる点の集合です（$\Omega$ 内では球を $\Omega$ に収めて考える）。この条件を入れるのは、分母が0で法線平均が定義できない内部点を除くためです。

<a id="def-gmt25-reduced-boundary"></a>

<!-- formal-statement-start -->
> **定義（縮約境界と測度論的外向き法線）**
> $E\subset\mathbb R^d$ は開集合 $\Omega$ で局所有限周長を持つとし、$\mathcal G_E=-D\chi_E$、$\mu_E=|D\chi_E|$ とする。$x\in\operatorname{supp}\mu_E\cap\Omega$ に対し、十分小さい $r>0$ では $\mu_E(B_r(x))>0$ なので、球平均ベクトル

$$
N_r(E,x)=\frac{\mathcal G_E(B_r(x))}{\mu_E(B_r(x))}
=\frac{\int_{B_r(x)}\nu_E(y)\,d\mu_E(y)}{\mu_E(B_r(x))}
$$

> を考える。極限 $N(E,x)=\lim_{r\downarrow0}N_r(E,x)$ が存在し、$|N(E,x)|=1$ となる点全体を、$E$ の $\Omega$ における**縮約境界** $\partial^*E\cap\Omega$ とする。その点の**測度論的外向き法線**は $\nu_E^*(x)=N(E,x)$ と定める。
<!-- formal-statement-end -->

<!-- definition-example-start: def-gmt25-reduced-boundary -->
**定義の確認**（同じ半空間）。$E=\{x_d<0\}$ で $x_d=0$ とすると、[滑らかな境界のGauss--Green表示](../GMT24/index.md#prop-gmt24-smooth-boundary)から、超平面上の面積測度を $\sigma$ として $\mathcal G_E=e_d\sigma$、$\mu_E=\sigma$ です。任意の $r>0$ について $\mu_E(B_r(x))=\omega_{d-1}r^{d-1}>0$（$d=1$ では一点の計数測度で値1）であり、$\mathcal G_E(B_r(x))=e_d\mu_E(B_r(x))$ です。よって $N_r(E,x)=e_d$、$\nu_E^*(x)=e_d$ で $|\nu_E^*(x)|=1$。超平面以外では小球の周長測度が0になるため台の条件を満たしません。従って $\partial^*E=\{x_d=0\}$ です。
<!-- definition-example-end -->

三角不等式から $|N_r(E,x)|\le1$ です。極限が存在するだけでは足りず、長さが**ちょうど1**であることが大切です。長さが小さくなるのは、球内の異なる法線が相殺し合うためです。

## 3. ほとんどの周長は、単一方向の法線を持つ

点ごとの定義が空疎でないことを示しましょう。前講の $\nu_E$ は測度に関してほとんど至る所で与えられていました。これを[Radon測度の球に関するLebesgue微分定理](../GMT1/index.md#thm-gmt1-function-differentiation)で点ごとに復元できます。また、平均が単位ベクトルになる条件は、法線の二乗平均振動が消える条件と同値です。

<a id="thm-gmt25-normal-mean"></a>

<!-- formal-statement-start -->
> **定理（縮約境界上の法線の平均振動と周長測度ほとんど至る所での存在）**
> $E\subset\mathbb R^d$ が開集合 $\Omega$ で局所有限周長を持ち、$\mu_E=|D\chi_E|$、$\mathcal G_E=\nu_E\mu_E$ とする。$x\in\operatorname{supp}\mu_E\cap\Omega$、$n\in\mathbb R^d$、$|n|=1$ に対して、次は同値である。
>
> 1. $\lim_{r\downarrow0}N_r(E,x)=n$。
> 2. 次の法線の二乗平均振動が0へ収束する。

$$
\lim_{r\downarrow0}\frac{1}{\mu_E(B_r(x))}
\int_{B_r(x)}|\nu_E(y)-n|^2\,d\mu_E(y)=0.
$$

> さらに $\mu_E(\Omega\setminus\partial^*E)=0$ が成立し、$\mu_E$-ほとんどすべての $x$ で $\nu_E^*(x)=\nu_E(x)$（右辺は適切な代表元）である。
<!-- formal-statement-end -->

### 証明の見取り図

法線が単位長なので、二乗を展開すると平均振動は $2-2n\cdot N_r$ となります。$mu_E$ に関して $\nu_E$ を球平均すれば、微分定理により元の値へ戻り、法線はほとんど至る所で単位長です。

<!-- proof-start -->
### 証明

$B_r=B_r(x)\Subset\Omega$ と略記します。$|\nu_E|=|n|=1$ が $\mu_E$-a.e.で成り立つので、内積を展開して

$$
\begin{aligned}
\frac{1}{\mu_E(B_r)}\int_{B_r}|\nu_E-n|^2\,d\mu_E
&=\frac{1}{\mu_E(B_r)}\int_{B_r}
(|\nu_E|^2+|n|^2-2n\cdot\nu_E)\,d\mu_E\\
&=2-2n\cdot N_r(E,x).
\end{aligned}
$$

もし $N_r\to n$ なら右辺は $2-2|n|^2=0$ です。逆に左辺が0なら、Cauchy--Schwarzの不等式を有限測度空間 $(B_r,\mu_E)$ に用い

$$
|N_r(E,x)-n|
=\left|\frac{1}{\mu_E(B_r)}\int_{B_r}(\nu_E-n)\,d\mu_E\right|
\le\left(\frac{1}{\mu_E(B_r)}\int_{B_r}|\nu_E-n|^2\,d\mu_E\right)^{1/2}\to0.
$$

これで同値性を得ます。後半では $\Omega$ の閉包が $\Omega$ に収まる有界開集合で可算被覆します。その各集合上で $|\nu_E|\le1$ なので $\nu_E$ は局所 $L^1(\mu_E)$ です。[Radon測度の球に関するLebesgue微分定理](../GMT1/index.md#thm-gmt1-function-differentiation)を $\nu_E$ の各座標と $\mu_E$ に適用すると、$\mu_E$-a.e. の $x$ で

$$
\lim_{r\downarrow0}\frac{\int_{B_r(x)}\nu_E(y)\,d\mu_E(y)}{\mu_E(B_r(x))}
=\nu_E(x).
$$

また正Radon測度はその台の外で0なので $x\in\operatorname{supp}\mu_E$ が $\mu_E$-a.e.で成立します。[Gauss--Green測度の単位方向表示](../GMT24/index.md#def-gmt24-gauss-green)より $|\nu_E(x)|=1$ も $\mu_E$-a.e.です。従ってこれらの点はすべて $\partial^*E$ に属し、定義による $\nu_E^*$ はその代表元の $\nu_E$ に等しいです。$\square$
<!-- proof-end -->

**何が証明されたか。** 周長測度から見れば、縮約境界以外は零集合です。しかし、これはまだ「縮約境界が滑らかな面の可算和で覆える」とも「$\mu_E$ がその面積測度に一致する」とも主張しません。それらの幾何的な結論には、球内での集合そのものの形を制御する必要があります。

## 4. 滑らかな境界なら、球を拡大すると半空間になる

境界付近を拡大して見る操作を定義しておきます。点 $x$ と尺度 $r>0$ について $E_{x,r}=(E-x)/r=\{z:x+rz\in E\}$ と置きます。$\chi_{E_{x,r}}\to\chi_H$ が $L^1_{\mathrm{loc}}(\mathbb R^d)$ で成り立つとは、任意の $R>0$ に対して $\int_{B_R(0)}|\chi_{E_{x,r}}-\chi_H|\,dz\to0$ となることです。今回は**集合を表す指示関数の収束**に注目します。

まず自分で証明できる $C^1$ 境界から考えます。曲面の傾きを一次近似したとき、極限では接平面を境に内外が分かれるはずです。

<a id="prop-gmt25-smooth-boundary"></a>

<!-- formal-statement-start -->
> **命題（滑らかな境界の縮約境界・半空間近似）**
> $d\ge2$、$E\subset\mathbb R^d$ は開集合で、$x\in\partial E$ の近傍では $\partial E$ が $C^1$ グラフとなり、$E$ はその一方側を占めるとする。$n(x)$ を幾何学的外向き単位法線とする。このとき $x\in\partial^*E$ で $\nu_E^*(x)=n(x)$ である。さらに $H_x=\{z\in\mathbb R^d:z\cdot n(x)<0\}$ と置くと

$$
\chi_{(E-x)/r}\longrightarrow\chi_{H_x}
\quad\text{in }L^1_{\mathrm{loc}}(\mathbb R^d),
\qquad \theta_E(x)=\tfrac12.
$$
<!-- formal-statement-end -->

### 証明の見取り図

グラフ面積公式によって $\mathcal G_E$ は曲面上の法線の積分です。法線の連続性でその平均が $n(x)$ へ近づきます。集合のblow-upは、グラフ関数を微分係数で近似し、残る細い帯の体積が0になることから示します。

<!-- proof-start -->
### 証明

平行移動・直交回転で $x=0$、$n(x)=e_d$ としてよいです。$x=(y,t)$、$y\in\mathbb R^{d-1}$ と書けば、ある近傍で $E=\{t<g(y)\}$、$g(0)=0$、$\nabla g(0)=0$、$g\in C^1$ です。[GMT24の滑らかな境界の表示](../GMT24/index.md#prop-gmt24-smooth-boundary)から、局所的に $\mathcal G_E=n(y)\,\sigma$、$\mu_E=\sigma$、$\sigma=\widehat{\mathcal H}^{\,d-1}\llcorner\partial E$ です。$|n(y)|=1$ で $n(y)\to e_d$。十分小さい $r$ では球と境界が交わり $\mu_E(B_r)>0$ なので

$$
|N_r(E,0)-e_d|
\le\frac{1}{\mu_E(B_r)}\int_{B_r}|n(y)-e_d|\,d\mu_E
\le\sup_{\partial E\cap B_r}|n(y)-e_d|\to0.
$$

ゆえに $0\in\partial^*E$ で法線は $e_d$ です。次に $\nabla g(0)=0$ は、任意の固定 $R>0$ に対し

$$
\sup_{|z'|\le R}\left|\frac{g(rz')}{r}\right|
\le R\sup_{|y|\le rR}|\nabla g(y)|\longrightarrow0
$$

を意味します（$g(rz')-g(0)$ を線分上で積分した）。$E_{0,r}$ は $B_R$ 内で $z_d<g(rz')/r$、半空間は $z_d<0$ です。二つの指示関数が違うのは $|z_d|\le\sup|g(rz')/r|$ という帯の中だけなので、そのLebesgue測度は

$$
\mathcal L^d\bigl((E_{0,r}\mathbin{\triangle}H_0)\cap B_R\bigr)
\le2\omega_{d-1}R^{d-1}\sup_{|z'|\le R}|g(rz')/r|\to0.
$$

最後に $R=1$ として変数変換 $z=(y-x)/r$ を使うと

$$
\frac{|E\cap B_r(x)|}{\omega_dr^d}
=\frac{|E_{x,r}\cap B_1(0)|}{\omega_d}
\to\frac{|H_x\cap B_1(0)|}{\omega_d}=\tfrac12.
$$

回転を戻して結論を得ます。$\square$
<!-- proof-end -->

**計算できる例。** 傾いた半平面 $E=\{(s,t):t<ms+b\}$ では $n=(-m,1)/\sqrt{1+m^2}$ が一定です。境界上のどの点でも球平均がその $n$ と一致し、拡大した集合は初めから $\{z:z\cdot n<0\}$ なので、密度も常に $1/2$ です。曲がった $C^1$ 境界では、球を縮める極限で同じ姿になります。

一般の縮約境界点についても半空間近似を結論するには、単に法線の球平均を取るだけでなく、[BVコンパクト性](../GMT23/index.md#thm-gmt23-compactness)と周長密度・相対等周評価を組み合わせる必要があります。この議論が次講の中心です。**ここで証明した半空間近似は $C^1$ 境界に対するもの**であり、一般の縮約境界への適用を先取りしていません。

## 5. 相殺のある角点と、消えてしまう穴

### 正方形の角点では平均法線の長さが足りない

$E=(0,1)^2\subset\mathbb R^2$ を取り、左下角 $x=(0,0)$ を考えます。十分小さい $r<1$ なら $B_r(0)$ 内にある境界は正の $x$ 軸・正の $y$ 軸上の長さ $r$ の二線分です。[GMT24の長方形のGauss--Green計算](../GMT24/index.md#prop-gmt24-smooth-boundary)を各直線片へ適用すると、法線は順に $-e_2$ と $-e_1$ なので

$$
\mathcal G_E(B_r(0))=-r(e_1+e_2),\qquad
\mu_E(B_r(0))=2r,\qquad
N_r(E,0)=-\tfrac12(e_1+e_2).
$$

極限の長さは $1/\sqrt2<1$ です。角は $\operatorname{supp}\mu_E$ に入りますが、$\partial^*E$ には入りません。一方、球の四分の一が $E$ なので $\theta_E(0)=1/4$。辺の内点では小球内の法線が一定で、$\nu_E^*$ は通常の外向き法線となり、$\theta_E=1/2$ です。角の有無は周長の総量を変えません。角点自身は $\mu_E$-零集合だからです。

### 密度が二分の一でも法線がない例

$F=\{(s,t)\in\mathbb R^2:st>0\}$、すなわち第1・第3象限の合併を取ります。原点中心の球のちょうど半分が $F$ なので $\theta_F(0)=1/2$ です。しかし四つの半軸に沿う境界法線が対向して打ち消すため、$\mathcal G_F(B_r(0))=0$、$\mu_F(B_r(0))=4r$。従って $N_r(F,0)=0$、原点は縮約境界ではありません。**体積密度の値だけを条件にしてはいけない**理由です。

### 零測度の穴は境界を増やさない

$B=B_1(0)$、$E=B\setminus\mathbb Q^d$ とします。$\mathbb Q^d$ はLebesgue零集合なので $\chi_E=\chi_B$ がa.e.で成り立ち、$\mathcal G_E=\mathcal G_B$、$\mu_E=\mu_B$ です。球の内部の有理点は位相的には境界点になり得ても、そこでは十分小さい球で $\mu_E=0$、$\theta_E=1$ です。縮約境界は球面 $\partial B$ と一致し、法線は $x/|x|$ です。点の取り去り方に左右されないことが、測度論的な境界の利点です。

この振る舞いを変換の下でも確かめておきます。

<a id="prop-gmt25-invariance"></a>

<!-- formal-statement-start -->
> **命題（零集合変更・補集合・相似変換との両立）**
> $E,F\subset\mathbb R^d$ が開集合 $\Omega$ で局所有限周長を持ち、$\mathcal L^d((E\mathbin{\triangle}F)\cap\Omega)=0$ とする。このとき $\partial^*E\cap\Omega=\partial^*F\cap\Omega$ で、法線も一致する。補集合について

$$
\partial^*(E^c)\cap\Omega=\partial^*E\cap\Omega,
\qquad \nu_{E^c}^*(x)=-\nu_E^*(x)
$$

> が各縮約境界点で成り立つ。さらに $Q$ を直交行列、$a\in\mathbb R^d$、$\lambda>0$、$T(y)=a+\lambda Qy$ とすると、$T(E)$ は $T(\Omega)$ で局所有限周長であり

$$
\partial^*T(E)\cap T(\Omega)=T(\partial^*E\cap\Omega),\qquad
\nu_{T(E)}^*(T(x))=Q\nu_E^*(x)\quad(x\in\partial^*E\cap\Omega)
$$

> が成り立つ。
<!-- formal-statement-end -->

### 証明の見取り図

零集合変更では分布微分が不変です。補集合ではベクトル測度だけ符号が反転します。直交回転と拡大では球が球へ移り、周長測度の倍率が平均の分子・分母で消えます。

<!-- proof-start -->
### 証明

零集合変更では、任意のテスト場 $\varphi$ に対して $\int_E\operatorname{div}\varphi=\int_F\operatorname{div}\varphi$ です。[Gauss--Green測度の一意性](../GMT24/index.md#thm-gmt24-gauss-green)から $\mathcal G_E=\mathcal G_F$、従って $\mu_E=\mu_F$ です。分子・分母・台が等しいので定義から縮約境界と法線も等しくなります。

[GMT24の補集合の恒等式](../GMT24/index.md#prop-gmt24-set-operations)では $\mathcal G_{E^c}=-\mathcal G_E$、$\mu_{E^c}=\mu_E$ です。よってすべての許容球で $N_r(E^c,x)=-N_r(E,x)$ となり、極限の長さは変わりません。

変換の場合、$y=T(z)$ と変数変換して $\operatorname{div}_z(Q^T\varphi(Tz))=\lambda\operatorname{div}_y\varphi(Tz)$ を使うと

$$
\mathcal G_{T(E)}=\lambda^{d-1}Q\,T_\#\mathcal G_E,
\qquad \mu_{T(E)}=\lambda^{d-1}T_\#\mu_E.
$$

ここで $T_\#$ は写像 $T$ による像測度であり、ベクトル測度の方向は $Q$ で回転させています。$B_{\lambda r}(T(x))=T(B_r(x))$ を代入すると

$$
N_{\lambda r}(T(E),T(x))
=\frac{\lambda^{d-1}Q\mathcal G_E(B_r(x))}{\lambda^{d-1}\mu_E(B_r(x))}
=QN_r(E,x).
$$

台も $T$ で移るため、$r\downarrow0$ として結論を得ます。$\square$
<!-- proof-end -->

## 6. 半空間近似から密度を読む――含意の向きに注意

前の滑らかな場合には、半空間への $L^1$ 近似を示してから密度 $1/2$ を導きました。この最後の一段は滑らかさを使わず、任意の可測集合で成立します。

<a id="prop-gmt25-halfspace-density"></a>

<!-- formal-statement-start -->
> **命題（半空間近似から体積密度二分の一への含意）**
> $E\subset\mathbb R^d$ はLebesgue可測、$x\in\mathbb R^d$、$n\in\mathbb R^d$ は単位ベクトルとする。$H_n^-=\{z\in\mathbb R^d:z\cdot n<0\}$ とし、

$$
\lim_{r\downarrow0}\int_{B_1(0)}
|\chi_{(E-x)/r}(z)-\chi_{H_n^-}(z)|\,dz=0
$$

> を仮定する。このとき $\theta_E(x)=1/2$ であり $x\in\partial^eE$ である。
<!-- formal-statement-end -->

### 証明の見取り図

指示関数の $L^1$ 距離は対称差の体積です。半空間は球を二等分するので、体積比はその差以下の誤差で $1/2$ に近づきます。

<!-- proof-start -->
### 証明

変数変換 $y=x+rz$ により

$$
\frac{|E\cap B_r(x)|}{\omega_dr^d}
=\frac{1}{\omega_d}\int_{B_1}\chi_{(E-x)/r}(z)\,dz.
$$

$|\int f-\int g|\le\int|f-g|$ を用いると、この式と $\omega_d^{-1}\int_{B_1}\chi_{H_n^-}=1/2$ の差の絶対値は、仮定の $L^1$ 距離を $\omega_d$ で割った量以下です。極限が0なので $\theta_E(x)=1/2$、従って[本質的境界の定義](#def-gmt25-essential-boundary)より $x\in\partial^eE$ です。$\square$
<!-- proof-end -->

**逆向きは成り立ちません。** 第5節の対頂象限集合は原点で密度 $1/2$ ですが、縮約境界の法線すら持たず、拡大後も同じ二つの象限のままで半空間にはなりません。また、ここで $x\in\partial^*E$ から半空間近似を導いたわけではありません。その深い方向を次講で証明し、続く講義で縮約境界の整流可能性と周長測度の面積表示へ進みます。

## 7. 演習：点ごとの条件を球で検算する

### Level A：定義と具体例

<a id="ex-gmt25-a01"></a>
### GMT25-A01 区間の両端

- Level: A

$E=(a,b)\subset\mathbb R$、$a<b$ とする。$\mathcal G_E$、$\mu_E$ を求め、$\partial^*E$、各点の $\nu_E^*$、$\theta_E(a)$、$\theta_E(b)$ を定義から求めよ。

<!-- solution-start -->
#### 詳細解答

任意の $\varphi\in C_c^1(\mathbb R)$ に対して $\int_E\varphi'=\varphi(b)-\varphi(a)$ なので $\mathcal G_E=\delta_b-\delta_a$、$\mu_E=\delta_a+\delta_b$ です。$0<r<(b-a)/2$ なら $B_r(a)$ にある原子は $a$ だけで、$N_r(E,a)=-1/1=-1$。同様に $N_r(E,b)=1$ です。台は $\{a,b\}$ だから $\partial^*E=\{a,b\}$、法線は $\nu_E^*(a)=-1$、$\nu_E^*(b)=1$ です。どちらの点でも十分小さい区間 $(x-r,x+r)$ の半分が $E$ なので $\theta_E(a)=\theta_E(b)=1/2$ です。
<!-- solution-end -->

<a id="ex-gmt25-a02"></a>
### GMT25-A02 半空間の平均ベクトル

- Level: A

$d=2$、$E=\{(s,t):t<0\}$ とする。原点中心の球 $B_r$ について $\mathcal G_E(B_r)$、$\mu_E(B_r)$、$N_r(E,0)$ と $\theta_E(0)$ を求めよ。

<!-- solution-start -->
#### 詳細解答

境界は長さ $2r$ の水平線分で、その外向き法線は常に $e_2=(0,1)$ です。[滑らかな境界の測度表示](../GMT24/index.md#prop-gmt24-smooth-boundary)から $\mathcal G_E(B_r)=2r e_2$、$\mu_E(B_r)=2r$、従って $N_r=e_2$ です。$r$ に依存せず長さ1なので原点は縮約境界に属します。上半円盤と下半円盤は反射で同じ面積 $\pi r^2/2$ だから $\theta_E(0)=(\pi r^2/2)/(\pi r^2)=1/2$ です。
<!-- solution-end -->

<a id="ex-gmt25-a03"></a>
### GMT25-A03 正方形の角と辺の違い

- Level: A

$E=(0,2)^2$ に対して $x=(0,0)$ と $y=(1,0)$ を調べる。各点で十分小さい球内の $\mu_E$、$\mathcal G_E$ の質量・ベクトル値を求め、縮約境界への所属と体積密度を判定せよ。

<!-- solution-start -->
#### 詳細解答

$0<r<1$ とします。$x$ では長さ $r$ の二線分に外向き法線 $-e_1$、$-e_2$ が付き、$\mu_E(B_r(x))=2r$、$\mathcal G_E(B_r(x))=-r(e_1+e_2)$ です。$N_r=-(e_1+e_2)/2$ の長さは $1/\sqrt2$ なので $x\notin\partial^*E$、体積比は四分円で $\theta_E(x)=1/4$ です。$y$ では下辺の長さ $2r$ だけが入り、$\mu_E(B_r(y))=2r$、$\mathcal G_E(B_r(y))=-2r e_2$。従って $N_r=-e_2$、$y\in\partial^*E$、体積比は半円で $\theta_E(y)=1/2$ です。
<!-- solution-end -->

<a id="ex-gmt25-a04"></a>
### GMT25-A04 有理点の穴

- Level: A

$B=B_1(0)\subset\mathbb R^2$、$E=B\setminus\mathbb Q^2$ とする。$x\in B\cap\mathbb Q^2$ に対する $\theta_E(x)$ と $\mu_E(B_r(x))$（十分小さい $r$）を求め、$x$ が位相的境界と縮約境界のどちらに属するか答えよ。

<!-- solution-start -->
#### 詳細解答

有理点集合のLebesgue測度は0だから $E$ と $B$ の指示関数はa.e.で一致します。$x$ は球の内点なので $r<1-|x|$ では $|E\cap B_r(x)|=|B_r(x)|$、ゆえに $\theta_E(x)=1$ です。前講の[球面のGauss--Green測度](../GMT24/index.md#prop-gmt24-smooth-boundary)は球面にのみ集中するので、同じ $r$ で $\mu_E(B_r(x))=0$。よって $x$ は縮約境界に属しません。一方 $x\notin E$ であり、有理点・無理点がともに $B$ 内で稠密なので、どの近傍も $E$ と $E^c$ に交わり $x\in\partial E$ です。
<!-- solution-end -->

<a id="ex-gmt25-a05"></a>
### GMT25-A05 補集合での法線反転

- Level: A

$E=(0,\infty)\subset\mathbb R$ と $F=E^c$ を比べる。原点での $\mathcal G$、$\mu$、$\nu^*$ をそれぞれ計算せよ。原点の体積密度は変わるか。

<!-- solution-start -->
#### 詳細解答

$\int_E\varphi'=-\varphi(0)$ より $\mathcal G_E=-\delta_0$、$\mu_E=\delta_0$、$\nu_E^*(0)=-1$ です。$\chi_F=1-\chi_E$ なので $\mathcal G_F=+\delta_0$、$\mu_F=\delta_0$、$\nu_F^*(0)=+1$ です。いずれも $\operatorname{supp}\mu=\{0\}$、平均法線の長さ1の条件を満たします。原点中心の区間の半分がそれぞれの集合に入るので、両方の体積密度は $1/2$ で変わりません。
<!-- solution-end -->

### Level B：平均・極限・反例を再構成する

<a id="ex-gmt25-b01"></a>
### GMT25-B01 平均振動の同値性を逆向きから

- Level: B

$\mu$ を正Radon測度、$v$ を $|v|=1$ が $\mu$-a.e.である $\mathbb R^d$ 値関数とする。$x\in\operatorname{supp}\mu$、$|n|=1$ で、$\mu(B_r)^{-1}\int_{B_r}|v-n|^2d\mu\to0$ を仮定する。平均 $m_r=\mu(B_r)^{-1}\int_{B_r}v\,d\mu$ が $n$ へ収束することと、$|m_r|\le1$ を示せ。

<!-- solution-start -->
#### 詳細解答

まず $|m_r|\le\mu(B_r)^{-1}\int_{B_r}|v|\,d\mu=1$ です。次に有限測度空間 $B_r$ 上のCauchy--Schwarzから

$$
\begin{aligned}
|m_r-n|^2
&=\left|\frac{1}{\mu(B_r)}\int_{B_r}(v-n)\,d\mu\right|^2\\
&\le\frac{1}{\mu(B_r)^2}\mu(B_r)
\int_{B_r}|v-n|^2\,d\mu\\
&=\frac{1}{\mu(B_r)}\int_{B_r}|v-n|^2\,d\mu\to0.
\end{aligned}
$$

したがって $m_r\to n$ です。分母が正なのは $x\in\operatorname{supp}\mu$ としたためです。極限の長さ1は、単に各平均の長さが1以下という事実だけでは出ず、振動消失の仮定によって初めて保証されます。
<!-- solution-end -->

<a id="ex-gmt25-b02"></a>
### GMT25-B02 傾斜グラフの拡大

- Level: B

$E=\{(s,t)\in\mathbb R^2:t<s+s^2\}$、$x=(0,0)$ とする。$x$ での外向き法線を求め、$E_{x,r}$ を不等式で表すことによって $\chi_{E_{x,r}}\to\chi_{\{(u,v):v<u\}}$ が $L^1(B_R)$ で成り立つことを全ての固定 $R>0$ について示せ。

<!-- solution-start -->
#### 詳細解答

$g(s)=s+s^2$、$g'(0)=1$ なので[滑らかな境界のGauss--Green表示](../GMT24/index.md#prop-gmt24-smooth-boundary)より $n=(-1,1)/\sqrt2$ です。$s=ru$、$t=rv$ を代入すると $rv<ru+r^2u^2$、すなわち $v<u+ru^2$ が $E_{0,r}$ の条件です。極限半空間は $H=\{v<u\}$。$B_R$ 内で両者が異なるなら $u\le v<u+ru^2$ なので、各 $u\in[-R,R]$ に対する縦の差の長さは高々 $ru^2$ です。Fubiniで

$$
\int_{B_R}|\chi_{E_{0,r}}-\chi_H|\,du\,dv
\le\int_{-R}^R ru^2\,du=\frac{2}{3}rR^3\to0.
$$

極限半空間は $(-1,1)\cdot(u,v)<0$ と一致し、外向き法線 $n$ と整合しています。$R=1$ の体積比で $\theta_E(0)=1/2$ も従います。
<!-- solution-end -->

<a id="ex-gmt25-b03"></a>
### GMT25-B03 体積半分でも縮約境界ではない

- Level: B

$F=\{(s,t):st>0\}\subset\mathbb R^2$ とする。原点における体積密度を計算し、各座標軸の四つの半線の外向き法線を使って $\mathcal G_F(B_r(0))$ と $\mu_F(B_r(0))$ を求めよ。半空間への $L^1(B_1)$ blow-upが成立しない理由を示せ。

<!-- solution-start -->
#### 詳細解答

原点での球は四つの等面積象限に分かれ、そのうち第1・第3象限が $F$ なので $\theta_F(0)=1/2$ です。正の $s$ 軸上の外向き法線は $-e_2$、負の $s$ 軸上は $+e_2$、正の $t$ 軸上は $-e_1$、負の $t$ 軸上は $+e_1$ です。各半線の球内長さは $r$ なので、ベクトル測度は $r(-e_2+e_2-e_1+e_1)=0$、全変動は $4r$。したがって $N_r=0$ で原点は縮約境界でありません。さらに $F_{0,r}=F$ がすべての $r>0$ で成り立ちます。仮に半空間 $H_n^-$ へ $L^1(B_1)$ 収束するなら $\mathcal L^2((F\mathbin{\triangle}H_n^-)\cap B_1)=0$ のはずですが、$F$ の四象限交互の配置はどんな一つの半空間ともa.e.一致しません（境界以外に異なる開領域が残る）。よって半空間近似も失敗します。
<!-- solution-end -->

<a id="ex-gmt25-b04"></a>
### GMT25-B04 折れたグラフの法線相殺

- Level: B

$E=\{(s,t):t<|s|\}$ とする。原点での $\mathcal G_E(B_r)$、$\mu_E(B_r)$、平均法線の長さ、体積密度を求め、縮約境界か判定せよ。

<!-- solution-start -->
#### 詳細解答

境界は原点から右上方向・左上方向への二本の半直線です。グラフの下側の外向き法線は、$s>0$ 側では $n_+=(-1,1)/\sqrt2$、$s<0$ 側では $n_-=(1,1)/\sqrt2$ です。各半直線の $B_r$ 内長さは $r$ で、原点自身に周長測度の原子はないため、

$$
\mathcal G_E(B_r)=r(n_++n_-)=r(0,\sqrt2),\qquad
\mu_E(B_r)=2r.
$$

従って $N_r=(0,1/\sqrt2)$ で、その長さは $1/\sqrt2<1$。原点は縮約境界ではありません。$E$ の外は上向きに開いた角度 $\pi/2$ の扇形なので、$E$ が占める球面角度は $2\pi-\pi/2=3\pi/2$。面積比は $\theta_E(0)=(3\pi/2)/(2\pi)=3/4$ です。法線の二方向のずれが平均の長さを減らしています。
<!-- solution-end -->

### Level C：複数の境界概念を結び付ける

<a id="ex-gmt25-c01"></a>
### GMT25-C01 長方形の三種類の境界

- Level: C

$E=(0,a)\times(0,b)\subset\mathbb R^2$、$a,b>0$ とする。(1) $\operatorname{supp}\mu_E$、$\partial^eE$、$\partial^*E$ を各々確定する。(2) 辺の法線と角の平均法線を計算する。(3) $\mu_E(\mathbb R^2\setminus\partial^*E)=0$ および $P(E)=2(a+b)$ を直接確かめよ。

<!-- solution-start -->
#### 詳細解答

[長方形のGauss--Green測度](../GMT24/index.md#prop-gmt24-smooth-boundary)の面ごとの表示から、$\mu_E$ は四つの閉辺を台とし、角には質量を置きません。従って $\operatorname{supp}\mu_E=\partial E$（四辺と四角）です。内部では密度1、外部では0、各開辺では半円で密度 $1/2$、四角では四分円で密度 $1/4$。いずれも0・1でない境界点なので $\partial^eE=\partial E$ です。

開いた下辺は $-e_2$、上辺は $+e_2$、左辺は $-e_1$、右辺は $+e_1$ の一定法線を持ちます。各開辺の点 $x$ では十分小さい $B_r(x)$ にその辺だけが入り、$N_r$ は該当の単位ベクトルです。一方、左下角では二辺の球内長さがそれぞれ $r$ なので $N_r=-(e_1+e_2)/2$ で長さ $1/\sqrt2$。他の角も二つの符号を変えた単位ベクトルの平均で同じ長さです。従って $\partial^*E$ は**四つの開辺の合併**です。

$\mu_E$ は各辺の1次元長さ測度の和なので四角の合併は $\mu_E$-零集合です。よって $\mu_E(\mathbb R^2\setminus\partial^*E)=0$ です。さらに各辺の長さを足すと $P(E)=\mu_E(\mathbb R^2)=a+a+b+b=2(a+b)$ となります。台・本質的境界・縮約境界は集合として同じではなくても、周長測度から見た差は0です。
<!-- solution-end -->

<a id="ex-gmt25-c02"></a>
### GMT25-C02 一般測度の微分から法線の点値を取り出す

- Level: C

$E\subset\mathbb R^d$ が開集合 $\Omega$ で局所有限周長を持つ。$\mathcal G_E=\nu_E\mu_E$ の単位方向表示だけを仮定し、[Radon測度の球に関するLebesgue微分定理](../GMT1/index.md#thm-gmt1-function-differentiation)を使って $\mu_E(\Omega\setminus\partial^*E)=0$ を導け。次に、これだけでは $\partial^*E$ の全点で $\theta_E=1/2$ を**証明したことにならない**理由を、推論の入力と出力の違いで説明せよ。

<!-- solution-start -->
#### 詳細解答

$\mu_E$ は正Radon測度で、$|\nu_E|=1$ が $\mu_E$-a.e.なので $\nu_E$ の各座標は局所 $L^1(\mu_E)$ です。$\Omega$ を閉包が $\Omega$ に収まる有界開集合で可算被覆し、各座標に[Radon測度の球に関するLebesgue微分定理](../GMT1/index.md#thm-gmt1-function-differentiation)を適用すると、共通の $\mu_E$-全測度集合上で

$$
\lim_{r\downarrow0}N_r(E,x)=\nu_E(x),\qquad |\nu_E(x)|=1.
$$

また台の外の $\mu_E$-質量は0なので、その全測度集合の点は分母が正です。従って定義の全条件を満たし $x\in\partial^*E$、すなわち $\mu_E(\Omega\setminus\partial^*E)=0$ です。

ただしこの議論で制御したのは**周長測度で重み付けした法線の平均**であって、$\mathcal L^d(E\cap B_r(x))/\omega_dr^d$ という**体積比**ではありません。$\nu_E$ の微分定理だけでは後者へ接続する不等式も集合の半空間近似も得られません。例えば第5節の計算から、単なる体積密度 $1/2$ を条件として法線を復元する逆向きの議論も失敗します。一般の縮約境界点で体積密度 $1/2$ を導くためには、GMT26で使う周長密度の評価と集合のblow-upの議論が追加で必要です。
<!-- solution-end -->

## 8. 次の講義へ

縮約境界は、周長測度の法線が小球の中でほぼ同じ向きを向く点を選びます。滑らかな境界ではその点で集合が半空間へ近づき、体積密度は $1/2$ です。一般の有限周長集合について、**法線の平均が単位長である**という情報から**集合そのものが半空間に近づく**ことを引き出せるでしょうか。次の **GMT26「De Giorgi構造定理 I：半空間blow-up」**で、BVコンパクト性と周長密度の評価からこの橋を架けます。
