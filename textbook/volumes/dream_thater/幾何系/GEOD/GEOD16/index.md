# GEOD16 楕円体横メルカトルの特徴づけと構成

[GEOD15の球面横メルカトル](../GEOD15/index.md#thm-geod15-transverse-inverse)は、中央子午線上の距離を保ち、ほかの場所でも角度を保ちます。ところが楕円体へ[GEOD14の等角緯度](../GEOD14/index.md#def-geod14-conformal-latitude)を代入するだけでは、角度は保っても中央子午線の距離が合いません。球面の北距離は半径と緯度角の積ですが、楕円体では子午線曲率半径を積分する必要があるからです。

ここで解きたい問題は、**等角性を失わずに、中央子午線上の目盛りだけを楕円体の真の弧長へ合わせること**です。まず中央子午線に沿う実数の補正を決め、その補正を複素正則関数へ一意に延ばします。これは楕円体横メルカトル（Gauss–Krüger 投影）の局所的な構成原理で、具体的な高次の Krüger 係数は次章で計算します。

この章の目標は次の4点です。

1. 等角球面の座標をそのまま使うと中央子午線で何がずれるか、式と数値で示す。
2. 真の子午線弧長から正則補正の局所存在と一意性を証明する。
3. 補正後の等角性、中央子午線の北距離、東西の向き、縮尺を微分して確かめる。
4. 球面極限と赤道近傍の展開を求め、局所構成と広域の実用級数を区別する。

長半径 $a$、短半径 $b$ は $a\ge b>0$ とし、第一離心率を $e=\sqrt{1-b^2/a^2}\in[0,1)$ とします。測地緯度は $-\pi/2<\phi<\pi/2$、中央子午線から東向きを正とする経度差を $\delta=\lambda-\lambda_0$ とします。角度はラジアンで測ります。以下の局所座標は非極点で $\delta$ が十分小さい領域に限ります。

---

## 1. 中央子午線の何を一致させるか

### 1.1 同じ「北への一歩」でも長さが違う

[GEOD4の楕円体計量](../GEOD4/index.md#thm-geod4-ellipsoid-metric)と[GEOD14の等角球面計量](../GEOD14/index.md#thm-geod14-conformal-sphere-metric)を並べます。

$$
\begin{aligned}
ds^2&=M(\phi)^2\,d\phi^2+
N(\phi)^2\cos^2\phi\,d\delta^2,\\
&=h(\phi)^2\bigl(d\chi^2+\cos^2\chi\,d\delta^2\bigr),\\
h(\phi)&=\frac{N(\phi)\cos\phi}{\cos\chi},\qquad
\frac{d\chi}{d\phi}=\frac{M(\phi)}{h(\phi)}>0.
\end{aligned}
$$

ここで $\chi=\chi(\phi)$ は等角緯度、$M$ は子午線曲率半径、$N$ は卯酉線曲率半径です。$h$ は単位球面での微小長さを楕円体の長さへ換算する局所係数で、長さの次元を持ちます。

[球面横メルカトルを楕円体へ直接代入した縮尺](../GEOD15/index.md#prop-geod15-ellipsoid-warning)は、仮の球面半径を $R$ とすると中央子午線で $R/h(\phi)$。したがって一般の非球面では、一つの定数 $R$ だけで全緯度の縮尺を1にできません。

実際、$a=5,b=4$、$\phi=30^\circ$ では $e=3/5$、$\chi\simeq0.35583814$、$h\simeq4.84257013$ となります。$R=a=5$ とすれば中央縮尺は $5/h\simeq1.03251$ で、約3.25%伸びます。角度保存だけでは、測量用の中央距離は保証されません。

### 1.2 実際の弧長を緯度目盛りとする

中央子午線では東西に動かないので $ds=M(\phi)|d\phi|$ です。[GEOD11の符号付き子午線弧長](../GEOD11/index.md#def-geod11-meridian-arc)を

$$
s(\phi)=\int_0^\phi M(t)\,dt,\qquad
M(t)=\frac{a(1-e^2)}{(1-e^2\sin^2t)^{3/2}}
$$

と書きます。$\phi>0$ のとき $s>0$、南半球では $s<0$ です。$\chi$ は単調増加だから逆関数 $\phi=\phi(\chi)$ を持ちます。赤道からの真の弧長を、等角緯度で読み替えた関数を導入しましょう。

<a id="def-geod16-meridian-normalization"></a>
<!-- formal-statement-start -->
> **定義（中央子午線の弧長規格化関数）**
> $a\ge b>0$ の回転楕円体で、非極点の等角緯度 $\chi(\phi)$、赤道からの符号付き子午線弧長 $s(\phi)$ を用いる。実数 $t\in(-\pi/2,\pi/2)$ に対し

$$
\boxed{G(t)=\frac{s(\phi(t))}{a}}
$$

> を**中央子午線の弧長規格化関数**とする。$\phi(t)$ は $\chi(\phi)$ の逆関数である。$G$ は無次元で、$G(0)=0$、$G'(t)>0$ を満たす。
<!-- formal-statement-end -->

<!-- definition-example-start: def-geod16-meridian-normalization -->
**定義の確認**（球面）。球面 $a=b=R$ では、[等角緯度の球面極限](../GEOD14/index.md#def-geod14-conformal-latitude)により $\chi=\phi$、$M=R$、$s(\phi)=R\phi$。したがって $G(t)=t$、$G(0)=0$、$G'(t)=1>0$ となり、実際の長さも $RG(t)=Rt$ です。

非球面 $a=5,b=4$ の $\phi=30^\circ$ では、上の $M$ を積分すると

$$
s(30^\circ)\simeq1.75959456,\qquad
G(\chi)\simeq0.35191891.
$$

一方、補正前の $a\chi\simeq1.77919072$ との差は約 $0.01959617$ です。$G$ が単なる $\chi$ の別名ではなく、必要な距離補正を担うことが分かります。
<!-- definition-example-end -->

ここで $s'(\phi)=ds/d\phi$ は $\phi$ による微分、$G'(\chi)=dG/d\chi$ は $\chi$ による微分を表します。逆関数の微分は、$d\chi/d\phi=M/h>0$ から $d\phi/d\chi=h/M$ です。これらを連鎖律へ順に代入すると

$$
\boxed{aG'(\chi)
=M(\phi)\frac{d\phi}{d\chi}
=h(\phi)>0.}
$$

これは単位が正しいことも示します。左辺は長さ、右辺の $h$ も長さです。以後の補正を選ぶ際の中心式になります。

---

## 2. 実数の弧長条件から複素数の補正を構成する

### 2.1 球面横メルカトルの複素座標

[GEOD15の回転球面座標](../GEOD15/index.md#def-geod15-transverse)では、緯度角として $\chi$、経度差として $\delta$ を使い、

$$
\begin{aligned}
D&=1-\cos^2\chi\sin^2\delta,\\
\eta&=\operatorname{atanh}(\cos\chi\sin\delta),\\
\beta&=\operatorname{atan2}(\sin\chi,\cos\chi\cos\delta)
\end{aligned}
$$

と置けます。ここでは $\cos\chi\cos\delta>0$ の半球を選び、$\beta\in(-\pi/2,\pi/2)$、$\eta\in\mathbb R$ です。$\beta$ は球面横メルカトルの北向き座標を無次元化したもの、$\eta$ は東向き座標を無次元化したものです。

両者を、**北を実部、東を虚部**とする複素数へまとめます。

$$
\zeta=\beta+i\eta.
$$

地図上で用いる複素数は、通常どおり東を実部、北を虚部とする $E+iN_p$ です。二つの複素数で軸の順が異なるので、最後に入れ替えます。特に中央子午線 $\delta=0$ では

$$
\eta=0,\qquad \beta=\chi,\qquad \zeta=\chi.
$$

ここが重要です。中央子午線で補正関数に入力されるのは**実数の $\chi$ そのもの**です。

### 2.2 中央の値が正則補正を決める

実数上で $G(\chi)$ と指定しただけで、中央から離れた点の値まで決められるでしょうか。等角写像に必要な正則性を課すと、局所的には決まります。実数上で Taylor 級数に展開し、同じ係数を複素変数へ適用することが出発点です。以下、$F'(\zeta)$ は複素変数 $\zeta$ による導関数です。また $\chi'(\phi)=d\chi/d\phi$ は実変数 $\phi$ による微分、局所的に複素変数 $z$ へ延長した後の $\chi'(z)$ はその複素導関数を表します。

<a id="thm-geod16-analytic-correction"></a>
<!-- formal-statement-start -->
> **定理（中央子午線条件による正則補正の局所存在と一意性）**
> $a\ge b>0$ の回転楕円体の非極点で、前定義の $G(t)=s(\phi(t))/a$ を考える。任意の $t_*\in(-\pi/2,\pi/2)$ の近傍に、複素変数 $\zeta$ の正則関数 $F$ が存在し、実数 $t$ に対して

$$
F(t)=G(t),\qquad
F'(t)=\frac{h(\phi(t))}{a}>0
$$

> を満たす。同じ実区間上でこの条件を満たす正則関数は、連結な共通定義域上で一意である。定義域を十分小さく取れば $F'(\zeta)\ne0$ であり、補正は局所等角である。
<!-- formal-statement-end -->

**証明の見取り図。** $M$ と $\chi$ の関係が実解析的で、$\chi'>0$ であるため、逆関数 $\phi(t)$ も局所的に実解析的です。よって $G$ の Taylor 級数が収束し、複素変数でも正則関数を定めます。二つの正則関数が実区間で一致すれば一致定理で一意です。

<!-- proof-start -->
### 証明

まず[楕円体の曲率半径](../GEOD4/index.md#def-geod4-curvature-radii)の分母 $1-e^2\sin^2\phi$ は実区間で正なので、$M(\phi)$ と $N(\phi)$ は各点の近傍で収束する冪級数を持ちます。$s'=M$ を項別積分すれば $s$ も実解析的です。

さらに[等角緯度の微分式](../GEOD14/index.md#thm-geod14-conformal-sphere-metric)は

$$
\chi'(\phi)=\frac{M(\phi)\cos\chi}{N(\phi)\cos\phi}>0.
$$

等角緯度の積分式も実解析関数の合成であり、$\chi$ は実解析的です。逆関数の解析性が必要なので、その理由も確かめます。実数 $\phi_*$ の近くで $\chi$ を収束冪級数によって複素変数 $z=u+iv$ へ延ばし、$c=\chi'(\phi_*)>0$ とします。$\chi(\phi_*+w)=\chi(\phi_*)+cw+O(w^2)$ だから、実部・虚部で見た一次変換は

$$
\begin{pmatrix}d\operatorname{Re}\chi\\d\operatorname{Im}\chi\end{pmatrix}
=\underbrace{\begin{pmatrix}c&0\\0&c\end{pmatrix}}_{J_\chi(\phi_*)}
\begin{pmatrix}du\\dv\end{pmatrix},\qquad
\det J_\chi(\phi_*)=c^2>0.
$$

よって[実二変数の逆関数定理](../../../基礎科目/RA/RA6A/index.md#thm-ra6a-inverse-function)を、複素数の実部・虚部に適用できます。$\chi$ は $\phi_*$ の十分小さい開近傍から $t_*=\chi(\phi_*)$ の開近傍への $C^1$ 級の逆写像 $z=\phi(t)$ を持ちます。さらに $t\to t_0=\chi(z_0)$ を**複素平面内で**近づけると、$z=\phi(t)\to z_0$ であり、

$$
\frac{\phi(t)-\phi(t_0)}{t-t_0}
=\frac{z-z_0}{\chi(z)-\chi(z_0)}
\longrightarrow\frac1{\chi'(z_0)}.
$$

従って逆写像は複素微分可能であり、$t_*$ の複素近傍で正則です。とくに実軸上で実解析的です。

したがって $G(t)=s(\phi(t))/a$ はある $r>0$ と実係数 $c_j$ を用いて

$$
G(t)=\sum_{j=0}^{\infty}c_j(t-t_*)^j
\qquad (|t-t_*|<r)
$$

と展開できます。実変数 $t$ を複素変数 $\zeta$ に置き換え、

$$
F(\zeta)=\sum_{j=0}^{\infty}c_j(\zeta-t_*)^j,
\qquad |\zeta-t_*|<r
$$

と定めると、冪級数の収束円内で正則で、実軸上の値は $G$ と一致します。複素微分を実軸へ制限すれば

$$
F'(t)=G'(t)
=\frac1a\,s'(\phi(t))\,\phi'(t)
=\frac{h(\phi(t))}{a}>0.
$$

共通の連結領域で正則な $F_1,F_2$ が実区間で $G$ に一致するとします。その差 $H=F_1-F_2$ の実軸に沿う任意階の導関数は、実区間上で0です。正則関数の複素導関数は実軸方向からも計算できるので、実区間内の点における複素 Taylor 係数もすべて0です。従ってその点の複素円板で $H=0$ です。

もし共通連結領域内に $H\ne0$ の点があれば、零点の境界点を中心とする Taylor 級数の最初の非零係数 $c_m$ により

$$
H(z)=(z-z_0)^m(c_m+O(z-z_0))
$$

と書け、近傍の零点の集積に矛盾します。よって共通領域全体で $H=0$ です。最後に $F'(t_*)>0$ と導関数の連続性から、$t_*$ の十分小さい複素近傍では $F'\ne0$ です。
<!-- proof-end -->

大切な限定があります。定理は**中央子午線の各点の周辺での局所存在**を主張しています。複素平面全体で一価・正則であること、特異点を越えて同じ式を使えること、実務上の広域変換で級数が十分速く収束することまでは主張しません。

また $G$ は奇関数です。$M(\phi)$ は偶関数、$s(\phi)$ は奇関数であり、$\chi(\phi)$ も奇関数なので $\phi(t)$ は奇関数です。よって赤道近くでは $F$ の Taylor 級数に偶数次項は現れません。

### 2.3 地図の東・北座標を定める

補正 $F$ が存在したところで、原点の測地緯度を $\phi_0\in(-\pi/2,\pi/2)$、中央子午線の縮尺定数を $k_0>0$ とします。東向きの平面座標を $E$、北向きを $N_p$ とします。添字 $p$ は[GEOD13の平面北座標](../GEOD13/index.md#def-geod13-projection-jacobian)と同じく、曲率半径 $N(\phi)$ との区別です。

<a id="def-geod16-ellipsoidal-transverse"></a>
<!-- formal-statement-start -->
> **定義（楕円体横メルカトルの局所構成）**
> 上記の楕円体、中央経度 $\lambda_0$、原点緯度 $\phi_0$、正の中央縮尺 $k_0$ を固定する。$\delta=\lambda-\lambda_0$ とし、$\chi=\chi(\phi)$ から $\zeta=\beta+i\eta$ を作る。中央子午線の実関数 $G=s\circ\phi/a$ を正則に延ばした $F$ が存在して $F'\ne0$ である局所領域において、投影を

$$
\boxed{\begin{aligned}
E&=k_0a\,\operatorname{Im}F(\zeta),\\
N_p&=k_0\bigl(a\,\operatorname{Re}F(\zeta)-s(\phi_0)\bigr)
\end{aligned}}
$$

> で定める。$E$ は東、$N_p$ は北を正とし、両者は長さの単位を持つ。原点 $(\phi,\lambda)=(\phi_0,\lambda_0)$ の像は $(0,0)$ である。
<!-- formal-statement-end -->

<!-- definition-example-start: def-geod16-ellipsoidal-transverse -->
**定義の確認**（球面）。$e=0$ のとき $a=b=R$、$\chi=\phi$、$G(t)=t$、従って $F(\zeta)=\zeta$、$F'(\zeta)=1\ne0$ です。半球の枝 $\cos\phi\cos\delta>0$ に限れば、定義に必要な正則性・非零条件を満たします。上の定義は

$$
E=k_0R\eta,\qquad
N_p=k_0R(\beta-\phi_0)
$$

となり、[GEOD15の球面横メルカトル](../GEOD15/index.md#thm-geod15-transverse-inverse)を原点移動・一様縮小拡大しただけです。中央子午線では $\eta=0,\beta=\phi$ なので $E=0$、$N_p=k_0R(\phi-\phi_0)$。原点で両座標は0、正の東西変位は $E$ を増やし、北への変位は $N_p$ を増やします。$k_0=1$ なら球面子午線弧長とも一致します。
<!-- definition-example-end -->

---

## 3. 角度と中央子午線の長さを同時に確かめる

ここまでで北距離が揃うように $F$ の実軸上の値を決めました。しかし中央の距離が合うだけでは、中央から離れた点の等角性は保証されません。$\zeta$ の微分と $F$ の正則性を組み合わせて計量を比較します。

<a id="thm-geod16-metric-scale"></a>
<!-- formal-statement-start -->
> **定理（楕円体横メルカトルの等角性・中央縮尺・一般点の縮尺）**
> 前定義の局所投影で $F'(\zeta)\ne0$、$\cos\chi\cos\delta>0$ とする。投影は向きを保つ局所等角写像で、点縮尺 $k$ と面積縮尺 $A_p$ は

$$
\boxed{\begin{aligned}
k(\phi,\delta)
&=\frac{k_0a\,|F'(\zeta)|}
{h(\phi)\sqrt{1-\cos^2\chi\sin^2\delta}},\\
A_p&=k^2.
\end{aligned}}
$$

> 中央子午線 $\delta=0$ では

$$
\boxed{E=0,\qquad
N_p=k_0\bigl(s(\phi)-s(\phi_0)\bigr),\qquad
k=k_0.}
$$

> 特に $k_0=1$ なら、中央子午線上の任意の二点間の北距離は符号付き子午線弧長の差に等しい。
<!-- formal-statement-end -->

**証明の見取り図。** 球面横メルカトルの座標変化 $(d\beta,d\eta)$ は、等角球面の計量を共通の係数 $1/D$ で伸ばします。次に正則関数 $F$ の微分は全方向を $|F'|$ 倍します。最後に楕円体計量の係数 $h^2$ で割れば縮尺が出ます。中央では $F'=h/a$ が効いて、余計な緯度依存が消えます。

<!-- proof-start -->
### 証明

まず[GEOD15の横メルカトルJacobian](../GEOD15/index.md#thm-geod15-transverse-distortion)の緯度 $\phi$ を $\chi$ に替え、半径1の球面で使うと

$$
d\beta^2+d\eta^2
=\frac{d\chi^2+\cos^2\chi\,d\delta^2}{D},
\qquad D=1-\cos^2\chi\sin^2\delta>0.
$$

したがって $|d\zeta|^2=d\beta^2+d\eta^2$ です。$F$ が正則なので微小変位は $dF=F'(\zeta)d\zeta$ となり、実部・虚部の交換と実定数の平行移動は長さを変えません。[投影の定義](#def-geod16-ellipsoidal-transverse)より

$$
\begin{aligned}
dE^2+dN_p^2
&=(k_0a)^2|F'(\zeta)|^2|d\zeta|^2\\
&=\frac{(k_0a)^2|F'(\zeta)|^2}{D}
(d\chi^2+\cos^2\chi\,d\delta^2).
\end{aligned}
$$

一方、[GEOD14の等角球面計量](../GEOD14/index.md#thm-geod14-conformal-sphere-metric)は

$$
ds^2=h(\phi)^2(d\chi^2+\cos^2\chi\,d\delta^2).
$$

二式の比から $k^2=(k_0a)^2|F'|^2/(h^2D)$。$k_0,a,h,D$ は正なので正の平方根を取って縮尺式が出ます。二軸の長さが同じ比になるので[GEOD13の等角判定](../GEOD13/index.md#thm-geod13-preservation-tests)を満たし、面積縮尺は $k^2$ です。

向きについては中央子午線で直接確かめます。$\delta=0$ なら $\zeta=\chi$、$F(\chi)=G(\chi)\in\mathbb R$ なので $E=0$、$N_p=k_0(s(\phi)-s(\phi_0))$。この点の一次微分は、[球面横メルカトルの偏導関数](../GEOD15/index.md#thm-geod15-transverse-distortion)から

$$
d\beta=d\chi,\qquad
d\eta=\cos\chi\,d\delta.
$$

$F'(\chi)=h/a$ は正の実数なので

$$
\begin{aligned}
dE&=k_0aF'(\chi)d\eta
=k_0h\cos\chi\,d\delta
=k_0N\cos\phi\,d\delta,\\
dN_p&=k_0aF'(\chi)d\beta
=k_0h\,d\chi
=k_0M\,d\phi.
\end{aligned}
$$

この行列表示の入力は、角度差 $(d\phi,d\delta)$ 自体ではありません。非極点で $M>0$、$N\cos\phi>0$ であり、$\lambda_0$ を固定すると $d\delta=d\lambda$ なので、地表の物理的な単位東・北方向の変位を $(du_E,du_N)=(N\cos\phi\,d\delta,M\,d\phi)$ と置けます。[GEOD13の局所縮尺とJacobianの正規化](../GEOD13/index.md#def-geod13-scales)に従い、この順の入力 $(u_E,u_N)$ から出力 $(E,N_p)$ へのJacobianを作ると

$$
\frac{\partial(E,N_p)}{\partial(u_E,u_N)}
=\begin{pmatrix}k_0&0\\0&k_0\end{pmatrix},
\qquad \det\frac{\partial(E,N_p)}{\partial(u_E,u_N)}=k_0^2>0.
$$

$F'\ne0$ の連結な局所領域ではJacobianの符号は変わらないから、向きも保たれます。また中央の $D=1$、$aF'=h$ を縮尺式へ代入すると $k=k_0$ です。

最後に $\phi_1<\phi_2$ に対して中央での北座標差は

$$
N_p(\phi_2,0)-N_p(\phi_1,0)
=k_0\int_{\phi_1}^{\phi_2}M(t)\,dt,
$$

となり、[GEOD11の子午線区間弧長](../GEOD11/index.md#prop-geod11-meridian-difference)に一致します。$k_0=1$ なら距離保存です。
<!-- proof-end -->

**正確に区別したいこと。** 中央の $k=k_0$ は局所的な微小距離の縮尺です。$k_0=1$ なら中央子午線の有限な区間長も一致しますが、**中央から外れた二点間の直線距離が楕円体の測地線長に等しい**とは言っていません。等角性は角度の性質であり、一般の曲面と平面を局所等長にはできません。

---

## 4. 球面極限・低次係数・どこまで使えるか

### 4.1 赤道付近では補正の最初の項を手で導ける

高次の Krüger 係数表を先取りしなくても、赤道近くで補正が恒等写像からどれだけずれるかは求められます。$q=1-e^2=b^2/a^2>0$ と置きます。

<a id="prop-geod16-equatorial-expansion"></a>
<!-- formal-statement-start -->
> **命題（球面極限と赤道近傍の低次補正）**
> $a\ge b>0$、$q=1-e^2$ とする。赤道の近傍で、前定理の正則補正は

$$
\boxed{F(\zeta)=\zeta-\frac{e^2}{6q}\zeta^3
+O(\zeta^5).}
$$

> 特に緯度 $\phi=0$、原点緯度 $\phi_0=0$ における経度差 $\delta\to0$ について

$$
\boxed{\begin{aligned}
E&=k_0a\left(\delta+\frac{\delta^3}{6q}
+O(\delta^5)\right),\\
N_p&=0,\qquad
k=k_0\left(1+\frac{\delta^2}{2q}
+O(\delta^4)\right).
\end{aligned}}
$$

> 球面 $e=0$ では $F(\zeta)=\zeta$ が正確に成り立ち、元の球面横メルカトルへ戻る。
<!-- formal-statement-end -->

**証明の見取り図。** $G'(\chi)=h/a$ を赤道で展開して積分すると補正の三次項が決まります。赤道上では $\zeta=i\operatorname{atanh}(\sin\delta)$ なので、その三次項が東距離を変えます。縮尺は赤道の実距離 $a\,d\delta$ で割って求めます。

<!-- proof-start -->
### 証明

$\chi$ は奇関数、$\chi'(0)=M(0)/N(0)=q$ だから

$$
\chi=q\phi+O(\phi^3),\qquad
\phi=\frac{\chi}{q}+O(\chi^3).
$$

ここで $N(\phi)=a(1-e^2\sin^2\phi)^{-1/2}$ に $\sin^2\phi=\phi^2+O(\phi^4)$ を代入し、

$$
\begin{aligned}
\frac{N(\phi)}a&=1+\frac{e^2}{2}\phi^2+O(\phi^4),\\
\cos\phi&=1-\frac12\phi^2+O(\phi^4),\\
\frac1{\cos\chi}&=1+\frac{q^2}{2}\phi^2+O(\phi^4).
\end{aligned}
$$

三つを掛け、$e^2-1+q^2=-e^2q$ を使うと

$$
\frac{h(\phi)}a
=\frac{N(\phi)\cos\phi}{a\cos\chi}
=1-\frac{e^2q}{2}\phi^2+O(\phi^4)
=1-\frac{e^2}{2q}\chi^2+O(\chi^4).
$$

[規格化関数の微分式](#def-geod16-meridian-normalization) $G'=h/a$ を $G(0)=0$ の条件で積分すると

$$
G(\chi)=\chi-\frac{e^2}{6q}\chi^3+O(\chi^5).
$$

正則拡張は実軸上の Taylor 係数をそのまま使うので、実変数 $\chi$ を $\zeta$ へ置き換えた式が $F$ の展開です。

赤道 $\chi=0$ では $\beta=0$、$\eta=\operatorname{atanh}(\sin\delta)$ なので、$\zeta=i\eta$ です。$\eta$ の三次展開は

$$
\sin\delta=\delta-\frac{\delta^3}{6}+O(\delta^5),
\qquad
\operatorname{atanh}u=u+\frac{u^3}{3}+O(u^5),
$$

から $\eta=\delta+\delta^3/6+O(\delta^5)$。また $(i\eta)^3=-i\eta^3$ なので

$$
\operatorname{Im}F(i\eta)
=\eta+\frac{e^2}{6q}\eta^3+O(\eta^5)
=\delta+\frac{1}{6q}\delta^3+O(\delta^5).
$$

赤道上の楕円体計量は $ds=a|d\delta|$ で、北座標は対称性から0です。よって東向きの局所縮尺は $(dE/d\delta)/a$。上式を微分して

$$
k=\frac1a\frac{dE}{d\delta}
=k_0\left(1+\frac{\delta^2}{2q}+O(\delta^4)\right).
$$

最後に $e=0$ なら $\chi=\phi$、$s=a\phi$ で、$G(t)=t$ が全実区間で成り立ちます。一致定理により $F(\zeta)=\zeta$ です。
<!-- proof-end -->

この展開で $q=1-e^2$ が分母に現れるのは、赤道付近の横方向の伸びが楕円体の形状に依存するためです。$\delta$ を固定したまま $q\to0$ とするような極端な扁平楕円体では、この低次近似の有効範囲に注意が必要です。

### 4.2 定義域と実務の級数は同じ話ではない

この章で選んだ $\cos\chi\cos\delta>0$ は球面横メルカトルで枝を一つに決めるための領域です。さらに正則補正 $F$ の収束領域と $F'\ne0$ の条件が必要です。$\phi=0,\delta\to\pi/2$ では $\eta=\operatorname{atanh}(\sin\delta)\to+\infty$ となるため、赤道近傍の Taylor 級数をそこまで使ってはいけません。

実用計算では通常、第三扁平率 $n=(a-b)/(a+b)$ を用いる Krüger の級数を導き、丸め、級数打切り、投影の適用範囲を別々に管理します。**この章の正則拡張は局所的な存在と構成原理**、次章の級数は計算可能な係数表示です。球面式を楕円体の最終公式と呼ぶことも、局所的な級数を無条件に全地球へ延長することも避けましょう。

---

## 5. 演習

### Level A：値と条件を一つずつ確かめる

<a id="ex-geod16-a01"></a>
**A1　球面では恒等補正になる**（Level A）
- Level: A

$a=b=R$、$\phi_0=0$、$k_0=1$ のとき $G,F,E,N_p$ を求め、中央子午線の値と原点条件を確認せよ。

<!-- solution-start -->
**詳細解答。** 球面では[等角緯度](../GEOD14/index.md#def-geod14-conformal-latitude) $\chi=\phi$、[弧長](../GEOD11/index.md#def-geod11-meridian-arc) $s=R\phi$ です。したがって $G(t)=s(t)/R=t$、その正則拡張は $F(\zeta)=\zeta$ です。[投影の定義](#def-geod16-ellipsoidal-transverse)から

$$
E=R\eta,\qquad N_p=R\beta.
$$

$\delta=0$ では $\eta=0,\beta=\phi$ だから $(E,N_p)=(0,R\phi)$ です。$\phi=0$ をさらに代入すれば $(0,0)$。中央子午線の北距離 $R(\phi_2-\phi_1)$ は球面弧長そのものです。
<!-- solution-end -->

<a id="ex-geod16-a02"></a>
**A2　原点緯度と中央縮尺**（Level A）
- Level: A

中央子午線に $\phi_1<\phi_2$ を取る。原点緯度 $\phi_0$ と $k_0>0$ を与えたとき、二点の $E,N_p$ の差を求め、原点緯度の変更が距離差へ影響するか判定せよ。

<!-- solution-start -->
**詳細解答。** [中央子午線での座標式](#thm-geod16-metric-scale)から各点で $E_j=0$、$N_{p,j}=k_0[s(\phi_j)-s(\phi_0)]$ です。差を取ると

$$
\Delta E=0,\qquad
\Delta N_p=k_0[s(\phi_2)-s(\phi_1)]
=k_0\int_{\phi_1}^{\phi_2}M(t)\,dt.
$$

$s(\phi_0)$ は相殺されるため、原点緯度を変更しても二点間の差は変わりません。$k_0$ を変えれば差は比例して変わります。
<!-- solution-end -->

<a id="ex-geod16-a03"></a>
**A3　等角球面の距離誤差**（Level A）
- Level: A

$a=5,b=4,\phi=30^\circ$ で $\chi\simeq0.35583814$、$s\simeq1.75959456$ とする。$a\chi$ と $s$ の差、球面式を代入した中央縮尺 $a/h$ を $h\simeq4.84257013$ から求め、二つが表す誤りを区別せよ。

<!-- solution-start -->
**詳細解答。** $a\chi\simeq5(0.35583814)=1.77919070$、したがって赤道からの北距離の差は $a\chi-s\simeq0.01959614$ です。中央の[局所縮尺](../GEOD15/index.md#prop-geod15-ellipsoid-warning)は

$$
\frac ah=\frac5{4.84257013}\simeq1.03251.
$$

前者は赤道から緯度30度まで積み重ねた**有限な座標差**、後者は緯度30度のその点での**微小距離比**です。数値が違うのは誤りではなく、局所伸びを積分して有限距離差が生じるためです。
<!-- solution-end -->

<a id="ex-geod16-a04"></a>
**A4　中央での東と北の符号**（Level A）
- Level: A

中央子午線上で $(d\delta,d\phi)=(\varepsilon,0)$ と $(0,\varepsilon)$ をそれぞれ与え、$\varepsilon>0$ の一次変位 $(dE,dN_p)$ を求めよ。

<!-- solution-start -->
**詳細解答。** [中央のJacobian](#thm-geod16-metric-scale)の証明で

$$
dE=k_0N(\phi)\cos\phi\,d\delta,\qquad
dN_p=k_0M(\phi)\,d\phi.
$$

従って東への一次変位は $(k_0N\cos\phi\,\varepsilon,0)$、北への一次変位は $(0,k_0M\varepsilon)$。非極点で $N\cos\phi>0,M>0,k_0>0$ なので、各座標は正しい向きに増加します。
<!-- solution-end -->

<a id="ex-geod16-a05"></a>
**A5　横メルカトルの枝の境界**（Level A）
- Level: A

赤道 $\phi=0$ に沿って $\delta\to(\pi/2)^-$ とすると $\beta,\eta$ はどうなるか。赤道近傍で導いた $F$ の Taylor 級数を使ってよいか述べよ。

<!-- solution-start -->
**詳細解答。** 赤道では $\chi=0$、$\beta=\operatorname{atan2}(0,\cos\delta)=0$（$|\delta|<\pi/2$）、$\eta=\operatorname{atanh}(\sin\delta)$。$\sin\delta\to1^-$ なので $\eta\to+\infty$、従って $\zeta=i\eta$ は赤道近傍の小さい複素円盤から出ます。局所冪級数の収束半径がその点まで及ぶ保証はありません。これは球面の枝境界・発散の議論と、楕円体補正の正則拡張の収束の議論を分けるべき場面です。
<!-- solution-end -->

### Level B：導出を組み合わせる

<a id="ex-geod16-b01"></a>
**B1　実数の条件から正則関数の一意性**（Level B）
- Level: B

実区間 $I$ の各点の近傍で実解析的な $G$ と、$I$ を含む共通の連結な複素開領域 $U$ 上の正則関数 $F_1,F_2$ があり、$F_j(t)=G(t)$（$t\in I$）を満たすとする。$t_*\in I$ として、一致する理由と $G'(t_*)\ne0$ から言えることを示せ。単なる滑らかな $G$ なら存在を保証できるかも答えよ。

<!-- solution-start -->
**詳細解答。** 共通の連結な複素開領域で $H=F_1-F_2$ と置くと、これは正則で、実区間 $I$ 上で0です。実軸に沿う任意階の微分も0なので、$I$ の内点を中心とする複素 Taylor 級数は全係数0です。従ってその点の複素円板で $H=0$ です。

領域内の零点の集積点で非零の最小次数 $m$ の Taylor 係数があれば

$$
H(z)=(z-z_0)^m(c+O(z-z_0)),\qquad c\ne0
$$

となり矛盾します。連結性から $H\equiv0$、従って $F_1=F_2$ です。$F_1'(t_*)=G'(t_*)\ne0$ だから、連続性により十分小さい複素近傍で導関数は0になりません。

一方、実解析性のない滑らかな関数（例えば原点で全導関数0だが正の側で非零となる関数）は、正則関数の実軸制限とは限りません。Taylor 級数が関数を再現しないからです。
<!-- solution-end -->

<a id="ex-geod16-b02"></a>
**B2　中央の単位接ベクトルで縮尺を確認**（Level B）
- Level: B

$\delta=0$ で $d\zeta$ と $dF$ を求め、地表の単位東・北を列とする $(E,N_p)$ のJacobianが $k_0I$ となることを導け。

<!-- solution-start -->
**詳細解答。** [球面横メルカトルJacobian](../GEOD15/index.md#thm-geod15-transverse-distortion)から中央で $d\beta=d\chi$、$d\eta=\cos\chi\,d\delta$、よって

$$
d\zeta=d\chi+i\cos\chi\,d\delta,\qquad
dF=F'(\chi)d\zeta=\frac ha(d\chi+i\cos\chi\,d\delta).
$$

定義で実部を北、虚部を東に読むので $dE=k_0h\cos\chi\,d\delta$、$dN_p=k_0h\,d\chi$。[等角球面計量](../GEOD14/index.md#thm-geod14-conformal-sphere-metric)より $h\cos\chi=N\cos\phi$、$h\,d\chi=M\,d\phi$。物理的な単位東・北の変位を $(N\cos\phi\,d\delta,M\,d\phi)$ として列に採ると

$$
B=\begin{pmatrix}k_0&0\\0&k_0\end{pmatrix},
\qquad B^\mathsf TB=k_0^2I,\qquad\det B=k_0^2>0.
$$

よって中央の線縮尺は $k_0$、面積縮尺は $k_0^2$ で、向きも保存します。
<!-- solution-end -->

<a id="ex-geod16-b03"></a>
**B3　赤道の三次項を自分で復元する**（Level B）
- Level: B

$q=1-e^2$、$F(\zeta)=\zeta-c\zeta^3+O(\zeta^5)$、$c=e^2/(6q)$ とする。赤道で $\zeta=i\operatorname{atanh}(\sin\delta)$ から $E$ の三次項と縮尺 $k$ の二次項を求めよ。

<!-- solution-start -->
**詳細解答。** $\sin\delta=\delta-\delta^3/6+O(\delta^5)$ を $\operatorname{atanh}u=u+u^3/3+O(u^5)$ に代入して

$$
\eta=\delta+\frac{\delta^3}{6}+O(\delta^5).
$$

$(i\eta)^3=-i\eta^3$ より $F(i\eta)=i(\eta+c\eta^3+O(\eta^5))$。従って

$$
\begin{aligned}
\frac{E}{k_0a}
&=\delta+\left(\frac16+c\right)\delta^3+O(\delta^5)\\
&=\delta+\frac{q+e^2}{6q}\delta^3+O(\delta^5)
=\delta+\frac{\delta^3}{6q}+O(\delta^5).
\end{aligned}
$$

赤道上では $ds=a|d\delta|$ なので $k=(dE/d\delta)/a$。微分して $k=k_0(1+\delta^2/(2q)+O(\delta^4))$ を得ます。
<!-- solution-end -->

<a id="ex-geod16-b04"></a>
**B4　補正を省いて中央縮尺を固定できるか**（Level B）
- Level: B

$e>0$ とする。$F(\zeta)=c\zeta$（$c>0$ は定数）だけを使って全中央子午線で $k=1$ としたい。赤道での条件と、赤道近傍の $h$ の展開を使って可否を判定せよ。

<!-- solution-start -->
**詳細解答。** $F'=c$ は全点で一定です。[一般縮尺式](#thm-geod16-metric-scale)を $\delta=0$ に制限すると $k=k_0ac/h(\phi)$。赤道では $h(0)=a$ なので $k(0,0)=k_0c$。これを1にするには $c=1/k_0$ が必要です。その値で赤道近傍の

$$
\frac{h(\phi)}a
=1-\frac12e^2(1-e^2)\phi^2+O(\phi^4)
$$

を使うと

$$
k(\phi,0)=\frac a{h(\phi)}
=1+\frac12e^2(1-e^2)\phi^2+O(\phi^4).
$$

$0<e<1$ で二次係数は正なので、非零の十分小さい $\phi$ では $k\ne1$ です。線形の定数補正では中央距離を全緯度で合わせられず、緯度によって導関数が変わる $F$ が必要です。
<!-- solution-end -->

### Level C：構成条件・数値・極限を一つにつなぐ

<a id="ex-geod16-c01"></a>
**C1　楕円体横メルカトルを中央弧長から作る**（Level C）
- Level: C

$a=5,b=4$ の回転楕円体、中央経度 $\lambda_0$、原点緯度 $\phi_0=0$、$k_0=1$ を考える。

1. $\chi(\phi)$、$s(\phi)$ を用い、中央で距離を保つ補正関数 $G$ を定義し、その導関数を求めよ。
2. $\phi=30^\circ$ で $\chi\simeq0.3558381446$、$s\simeq1.7595945578$、$h\simeq4.8425701313$ を用い、中央北距離と球面式との差、正しい中央の微小縮尺を求めよ。
3. $\zeta=\beta+i\eta$ と $F$ の局所正則拡張を用い、$E,N_p$ を構成せよ。中央の東西・南北のJacobianの符号、一般点の等角性を説明せよ。
4. $e\to0$ の球面極限と、赤道近傍の東距離の三次項を示し、なぜこの式だけで広域の数値投影が完成したとは言えないか述べよ。

<!-- solution-start -->
**詳細解答。**

**1．実数上の条件。** [GEOD14の等角緯度](../GEOD14/index.md#def-geod14-conformal-latitude)から

$$
\frac{d\chi}{d\phi}=\frac M{h}>0,
\qquad
s(\phi)=\int_0^\phi M(t)\,dt.
$$

$\phi=\phi(\chi)$ と逆に解いて、$G(\chi)=s(\phi(\chi))/a$ と置きます。連鎖律で

$$
G'(\chi)=\frac1a M(\phi)\frac{d\phi}{d\chi}
=\frac1aM(\phi)\frac hM=\frac ha>0,
$$

かつ $G(0)=0$ です。$G$ は実解析的なので[正則拡張の定理](#thm-geod16-analytic-correction)により局所的な正則 $F$ が一意に決まります。

**2．中央の数値。** 補正後の中央では $E=0$、$N_p=s(\phi)$ なので、緯度30度で $N_p\simeq1.7595945578$ です。球面半径 $R=a$ の式は $N_p^{\mathrm{naive}}=a\chi\simeq1.7791907231$ を与え、約 $0.0195961653$ 大きくなります。

修正前の局所縮尺は $a/h\simeq1.03250957$ ですが、正しい $F'(\chi)=h/a$ を代入すると

$$
k(30^\circ,0)=\frac{aF'(\chi)}h
=\frac{a(h/a)}h=1.
$$

有限な弧長差と局所縮尺を別々に確認しました。

**3．複素補正とJacobian。** $\delta=\lambda-\lambda_0$ として

$$
\eta=\operatorname{atanh}(\cos\chi\sin\delta),\quad
\beta=\operatorname{atan2}(\sin\chi,\cos\chi\cos\delta),\quad
\zeta=\beta+i\eta.
$$

局所的な $F$ を $F(t)=G(t)$（実軸）で選び、

$$
E=a\operatorname{Im}F(\zeta),\qquad
N_p=a\operatorname{Re}F(\zeta)-s(0).
$$

中央 $\delta=0$ では $d\zeta=d\chi+i\cos\chi\,d\delta$、$F'(\chi)=h/a$ だから

$$
dE=N\cos\phi\,d\delta,\qquad dN_p=M\,d\phi.
$$

地表の単位東・北に対するJacobianは $I$、行列式は正です。一般点でも[球面横メルカトルの等角計量](../GEOD15/index.md#thm-geod15-transverse-distortion)に正則関数の倍率 $|F'|^2$ を掛けるだけなので

$$
dE^2+dN_p^2
=\frac{a^2|F'(\zeta)|^2}{D}
(d\chi^2+\cos^2\chi\,d\delta^2)
=k^2ds^2
$$

で等角です。ただし $F'\ne0$ の局所領域を選びます。

**4．極限と適用範囲。** $e=0$ なら $\chi=\phi$、$s=a\phi$、$G(t)=t$、$F(\zeta)=\zeta$ で、球面横メルカトルへ一致します。今回の楕円体では $e=3/5$、$q=16/25$ なので[低次補正](#prop-geod16-equatorial-expansion)により、赤道では

$$
\frac Ea=\delta+\frac{25}{96}\delta^3+O(\delta^5),\qquad
k=1+\frac{25}{32}\delta^2+O(\delta^4).
$$

これは $\delta\to0$ の局所式です。極からの距離、枝の切れ目、$F$ の複素特異点と収束範囲、高次の打切り誤差を評価していないため、任意の経度差へそのまま使う実務アルゴリズムではありません。
<!-- solution-end -->

---

## 6. 次は計算できる級数へ

中央子午線の条件 $F(t)=s(\phi(t))/a$ と正則性から、局所的な楕円体横メルカトルは一意に構成できました。全中央緯度で距離が合い、中央を外れても角度が保存される理由を証明できたことが重要です。

一方、投影値を実際に求めるには $F$ を計算しやすい級数で表す必要があります。次の GEOD17 では第三扁平率 $n$ による Krüger 級数の係数を導出し、順変換の数値計算へ進みます。
