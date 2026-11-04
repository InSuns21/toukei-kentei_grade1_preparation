# GEOD14 等角緯度と複素座標

[GEOD13の等角判定](../GEOD13/index.md#thm-geod13-preservation-tests)から、地表の微小な角を保存する投影では、二つの接方向を同じ倍率で伸ばさなければならないと分かりました。ところが測地緯度 $\phi$ を1ラジアン動かす長さと、経度 $\lambda$ を1ラジアン動かす長さは異なります。そのまま複素平面の二軸と見なしても、角は保存されません。

そこでまず**緯度方向の目盛りを変え**、経度方向と同じ長さの倍率を持つ座標を作ります。次にその座標へ[CA1のCauchy–Riemann方程式](../../../解析系/CA/CA1/index.md#thm-ca1-cr-sufficient)を適用し、等角な投影を複素関数の問題に変えます。

この章では次のことを自分で導けるようにします。

1. 楕円体計量から緯度目盛りの常微分方程式を作り、積分して解く。
2. 球面上の緯度角と、無限大まで伸びる子午方向の座標を区別して計算する。
3. 地心緯度・求長緯度・正積緯度がそれぞれ別の量を合わせることを説明する。
4. 正則関数が局所的な等角投影を与える条件と縮尺を計算する。
5. 球面極限、極、経度の切れ目、複素微分が0になる点で何が壊れるかを判定する。

楕円体の長半径を $a$、短半径を $b$ とし、$a\ge b>0$、第一離心率 $e=\sqrt{1-b^2/a^2}\in[0,1)$ とします。測地緯度は $-\pi/2<\phi<\pi/2$、東向きを正とする経度は、一つの切れ目を選んだ開区間の実数 $\lambda$ で表します。角度の微分はラジアンです。

---

## 1. 南北と東西の微小距離をそろえる

### 1.1 楕円体の長さは二つの係数を持つ

[GEOD4の回転楕円体計量](../GEOD4/index.md#thm-geod4-ellipsoid-metric)は、非極点では

$$
ds^2=M(\phi)^2\,d\phi^2+r(\phi)^2\,d\lambda^2,
\qquad r(\phi)=N(\phi)\cos\phi
$$

でした。[二つの曲率半径](../GEOD4/index.md#def-geod4-curvature-radii)の式を代入すると

$$
M(\phi)=\frac{a(1-e^2)}{(1-e^2\sin^2\phi)^{3/2}},
\qquad
N(\phi)=\frac{a}{\sqrt{1-e^2\sin^2\phi}}.
$$

ここで $M\,d\phi$ は北向き、$r\,d\lambda$ は東向きの符号付き微小長さです。例えば赤道で $a=5,b=4$ なら $M(0)=16/5$、$r(0)=5$。同じ $0.01$ ラジアンの増分でも南北の長さは $0.032$、東西は $0.05$ です。この二軸を等しい目盛りに直す必要があります。

緯度だけの単調増加する新座標 $t=t(\phi)$ を使い、平面の直交座標 $(\lambda,t)$ に対して

$$
ds^2=\rho(\phi)^2\bigl(dt^2+d\lambda^2\bigr)
$$

と表したいとします。右辺は二軸を同じ正の係数 $\rho^2$ で伸ばすので、角度を計算する際にはその係数が打ち消されます。これは[GEOD13の等角条件](../GEOD13/index.md#thm-geod13-preservation-tests)を満たす座標の作り方です。

元の計量と係数を比較します。$dt=t'(\phi)d\phi$ を代入して

$$
\rho^2t'(\phi)^2=M^2,\qquad \rho^2=r^2.
$$

$r>0$、$t'>0$ と選んだから、求める方程式は

$$
t'(\phi)=\frac{M(\phi)}{r(\phi)}
=\frac{1-e^2}{\cos\phi(1-e^2\sin^2\phi)}.
$$

これが等角な緯度目盛りの出発点です。無次元の角度に対する微分なので、長さの単位である $a$ は消えています。

### 1.2 赤道で0となる等角座標

この方程式の、赤道を原点とする解を $\psi$ と書きます。$\psi$ は角度を保つ球面緯度角に結びつく**等角座標**（isometric latitude）であって、まだ通常の範囲の緯度角ではありません。

<a id="def-geod14-isometric-coordinate"></a>
<!-- formal-statement-start -->
> **定義（等角な子午座標と等角座標）**
> $a\ge b>0$ の回転楕円体の非極点で、$M(\phi)$ を子午線曲率半径、$r(\phi)=N(\phi)\cos\phi>0$ を緯線半径とする。赤道を原点とし、増加する子午座標 $\psi$ を

$$
\psi(\phi)=\int_0^\phi\frac{M(t)}{r(t)}\,dt
$$

> で定め、**等角座標**という。局所的に経度を実数へほどいた $(\lambda,\psi)$ を等角な直交座標として用いる。
<!-- formal-statement-end -->

<!-- definition-example-start: def-geod14-isometric-coordinate -->
**定義の確認**（球面）。$a=b=R$ とすると $M=R$、$r=R\cos\phi$ です。したがって

$$
\psi(\phi)=\int_0^\phi\frac{dt}{\cos t},\qquad
\psi(0)=0,\qquad \psi'(\phi)=\frac1{\cos\phi}>0.
$$

さらに $d\phi=\cos\phi\,d\psi$ を元の計量へ代入すると

$$
R^2d\phi^2+R^2\cos^2\phi\,d\lambda^2
=R^2\cos^2\phi\,(d\psi^2+d\lambda^2).
$$

定義の積分条件、原点、増加性と、二軸が共通倍率を持つ条件をそれぞれ確かめました。
<!-- definition-example-end -->

<a id="thm-geod14-isometric-integral"></a>
<!-- formal-statement-start -->
> **定理（等角座標の方程式・一意性・積分公式）**
> $a\ge b>0$ の回転楕円体で $e=\sqrt{1-b^2/a^2}\in[0,1)$ とする。$-\pi/2<\phi<\pi/2$ において、$\psi(0)=0$ かつ $\psi'(\phi)>0$ を満たし、計量が

$$
ds^2=r(\phi)^2(d\psi^2+d\lambda^2)
$$

> と書ける緯度座標は一意であり、次の式で与えられる。

$$
\boxed{\displaystyle
\psi(\phi)=\operatorname{atanh}(\sin\phi)
-e\,\operatorname{atanh}(e\sin\phi)}
$$

> ここで $\operatorname{atanh}x=\tfrac12\log\frac{1+x}{1-x}$（$|x|<1$）であり、$e=0$ では第2項は0とする。$\psi$ は奇関数で、導関数が正である。
<!-- formal-statement-end -->

**証明の見取り図。** 等角性は二つの係数の比較から一階の方程式になります。積分式がその方程式を満たすことを微分で確かめれば、原点の条件による一意性も出ます。

<!-- proof-start -->
### 証明

求める表示の係数比較から $\rho^2=r^2$、$\rho^2(\psi')^2=M^2$ です。$r,M,\psi'>0$ なので

$$
\psi'(\phi)=\frac{M}{r}
=\frac{1-e^2}{\cos\phi(1-e^2\sin^2\phi)}.
$$

一方、$|x|<1$ で $(\operatorname{atanh}x)'=1/(1-x^2)$ です。$\cos\phi>0$ を使い、

$$
\begin{aligned}
\frac{d}{d\phi}\operatorname{atanh}(\sin\phi)
&=\frac{\cos\phi}{1-\sin^2\phi}
=\frac1{\cos\phi},\\
\frac{d}{d\phi}\bigl[e\operatorname{atanh}(e\sin\phi)\bigr]
&=\frac{e^2\cos\phi}{1-e^2\sin^2\phi}.
\end{aligned}
$$

差を共通分母にすると

$$
\begin{aligned}
\frac1{\cos\phi}
-\frac{e^2\cos\phi}{1-e^2\sin^2\phi}
&=\frac{1-e^2\sin^2\phi-e^2\cos^2\phi}
{\cos\phi(1-e^2\sin^2\phi)}\\
&=\frac{1-e^2}{\cos\phi(1-e^2\sin^2\phi)}
=\frac Mr.
\end{aligned}
$$

右辺は正、候補式は $\phi=0$ で0です。同じ方程式を満たす任意の二つの解の差は導関数0で定数になり、原点での値が一致するので差は恒等的に0です。$\sin(-\phi)=-\sin\phi$ と $\operatorname{atanh}$ の奇性から $\psi$ も奇関数です。

最後に $d\phi=(r/M)d\psi$ を[楕円体の計量](../GEOD4/index.md#thm-geod4-ellipsoid-metric)へ戻すと

$$
M^2\left(\frac rM\right)^2d\psi^2+r^2d\lambda^2
=r^2(d\psi^2+d\lambda^2).
$$

これが必要な等角表示です。
<!-- proof-end -->

**数値例。** $a=5,b=4$ では $e=3/5$ です。$\phi=30^\circ$ なら $\sin\phi=1/2$ なので

$$
\psi=\operatorname{atanh}(1/2)
-\frac35\operatorname{atanh}(3/10)
\simeq0.36359438.
$$

$\psi$ はラジアンそのものではない無次元の座標値です。積分を用いるなら $\psi'=M/r\simeq0.81209708$ であり、閉じた式の微分とも一致します。$M$ と $r$ の両方を計算してから比を取っても同じ値になることを検算してください。

---

## 2. 等角座標を球面の緯度角へ戻す

### 2.1 無限に伸びる $\psi$ と、角としての $\chi$

球面の緯度を $\chi$ とすると、球面でも $\operatorname{atanh}(\sin\chi)$ が等角座標になります。そこで**楕円体の $\psi$ と同じ等角座標を持つ球面緯度**を定めます。$\psi$ は全実数を動く一方、$\chi$ は $(-\pi/2,\pi/2)$ の角です。

<a id="def-geod14-conformal-latitude"></a>
<!-- formal-statement-start -->
> **定義（等角緯度）**
> $a\ge b>0$ の回転楕円体で、前定理の等角座標 $\psi(\phi)$ を用いる。測地緯度 $\phi\in(-\pi/2,\pi/2)$ に対応する**等角緯度**（conformal latitude）とは、唯一の角 $\chi\in(-\pi/2,\pi/2)$ で

$$
\operatorname{atanh}(\sin\chi)=\psi(\phi)
$$

> を満たすものをいう。同値な計算式は

$$
\boxed{\sin\chi=\tanh\psi,\qquad
\tan\left(\frac\pi4+\frac\chi2\right)=e^\psi}
$$

> である。経度は同じ $\lambda$ とし、球面側の緯度・経度を $(\chi,\lambda)$ と表す。
<!-- formal-statement-end -->

<!-- definition-example-start: def-geod14-conformal-latitude -->
**定義の確認**（球面と楕円体）。球面 $e=0$ では前定理から $\psi=\operatorname{atanh}(\sin\phi)$ なので、$\operatorname{atanh}$ の単調性により $\chi=\phi$ です。

楕円体 $a=5,b=4$ で $\phi=30^\circ$ なら $\psi\simeq0.36359438$ であり、

$$
\chi=\arcsin(\tanh0.36359438)
\simeq20.3880^\circ.
$$

この値は指定範囲 $(-90^\circ,90^\circ)$ にあり、代入すれば $\operatorname{atanh}(\sin\chi)=\psi$ が成立します。同じ点の[地心緯度](../GEOD3/index.md#prop-geod3-latitude-relation)は $\arctan((1-e^2)\tan30^\circ)\simeq20.2795^\circ$ で、等角緯度とは異なります。
<!-- definition-example-end -->

<a id="thm-geod14-conformal-sphere-metric"></a>
<!-- formal-statement-start -->
> **定理（等角球面を用いた計量表示）**
> $a\ge b>0$ の回転楕円体の非極点で、$\psi$ と $\chi$ を上記の定義とする。$\chi$ は測地緯度 $\phi$ の滑らかで厳密増加する関数で、楕円体の計量は

$$
\boxed{\displaystyle
ds^2=h(\phi)^2
\bigl(d\chi^2+\cos^2\chi\,d\lambda^2\bigr),
\qquad
h(\phi)=\frac{N(\phi)\cos\phi}{\cos\chi}>0}
$$

> と書ける。特に、$(\chi,\lambda)$ は単位球面の緯度・経度と同じ角度を持つ。$h$ は長さの次元を持ち、楕円体から半径1の球面への対応の局所倍率を定める。
<!-- formal-statement-end -->

**証明の見取り図。** $\chi$ の定義を微分して $d\psi$ と $d\chi$ を結び、等角座標の計量へ代入します。

<!-- proof-start -->
### 証明

$\operatorname{atanh}(\sin\chi)=\psi$ の両辺を $\phi$ で微分し、$-\pi/2<\chi<\pi/2$ で $\cos\chi>0$ となることを使うと

$$
\frac1{\cos\chi}\frac{d\chi}{d\phi}
=\frac{d\psi}{d\phi}
=\frac M{N\cos\phi}.
$$

したがって

$$
\frac{d\chi}{d\phi}
=\frac{M\cos\chi}{N\cos\phi}>0,
\qquad
d\psi=\frac{d\chi}{\cos\chi}.
$$

[等角座標の計量表示](#thm-geod14-isometric-integral)へ代入すると

$$
\begin{aligned}
ds^2
&=N^2\cos^2\phi(d\psi^2+d\lambda^2)\\
&=N^2\cos^2\phi
\left(\frac{d\chi^2}{\cos^2\chi}+d\lambda^2\right)\\
&=\left(\frac{N\cos\phi}{\cos\chi}\right)^2
(d\chi^2+\cos^2\chi\,d\lambda^2).
\end{aligned}
$$

係数が正であるため、$g$ と単位球面計量で測る接ベクトル間の角度は一致します。なお球面上の弧長まで同じという意味ではありません。
<!-- proof-end -->

### 2.2 「緯度」の名が付いても、保存したい量が違う

楕円体では測地緯度以外にも、目的に応じた緯度があります。各名称の**決め方**を一度見比べます。

| 名称 | 座標を決める問い | 具体的な条件 |
| --- | --- | --- |
| 測地緯度 $\phi$ | 楕円体の外向き法線は赤道面となす角がいくつか | [GEOD3の法線の定義](../GEOD3/index.md#def-geod3-geodetic-latitude) |
| 地心緯度 $\theta$ | 地心から表面点への方向は何度か | $\tan\theta=(1-e^2)\tan\phi$（[GEOD3の関係式](../GEOD3/index.md#prop-geod3-latitude-relation)） |
| 求長緯度 $\mu$ | 赤道からの子午線弧長を極までの長さで正規化すると何度か | $\mu=(\pi/2)s(\phi)/s(\pi/2)$、$s(\phi)$ は[GEOD11の弧長](../GEOD11/index.md#def-geod11-meridian-arc) |
| 正積緯度 $\beta$ | 赤道からその緯度までの帯の面積比を単位球面と合わせるには | $\sin\beta=I(\phi)/I(\pi/2)$、$I(\phi)=\int_0^\phi M(t)N(t)\cos t\,dt$ |
| 等角緯度 $\chi$ | 経緯線の作る微小角度を球面の角度と合わせるには | $\operatorname{atanh}(\sin\chi)=\psi(\phi)$ |

正積緯度の式では、楕円体の面積要素 $MN\cos\phi\,d\phi\,d\lambda$ を赤道から積分しています。積分を $\sin\beta$ と比較する理由は、単位球面の同じ帯の面積が経度幅を掛けて $\sin\beta$ に比例するためです。これで何を保存する緯度かが分かります。正積緯度の具体的な投影への応用は後で扱います。

球面 $e=0$ では $M=N=a$、$s(\phi)=a\phi$、$I(\phi)=a^2\sin\phi$ となり、**五種類の緯度角はすべて $\phi$ に一致**します。しかし非球面では、一般に一致しません。特に $\psi$ は緯度角ではないので、この五つの角度に含めて数値の大小を比較してはいけません。

---

## 3. 等角座標を複素数として使う

### 3.1 経度を実部、等角座標を虚部にする

地理情報の緯度・経度は通常 $(\phi,\lambda)$ と記録しますが、ここでは**東に進む実軸、北に進む虚軸**を選びます。座標を並べ替えた理由は、複素平面の正の向き（実軸から虚軸への回転）を地表の東・北の向きと対応させるためです。

<a id="def-geod14-complex-coordinate"></a>
<!-- formal-statement-start -->
> **定義（楕円体の局所複素座標）**
> $a\ge b>0$ の回転楕円体の非極点で、経度 $\lambda$ を実数値の開区間へ制限し、等角座標 $\psi(\phi)$ を用いる。複素数

$$
w=x+iy=\lambda+i\psi(\phi),
\qquad x=\lambda,\quad y=\psi
$$

> を**局所複素座標**と呼ぶ。この座標では

$$
ds^2=\rho(y)^2|dw|^2,
\qquad
\rho(y)=N(\phi(y))\cos\phi(y)>0,
\quad |dw|^2=dx^2+dy^2.
$$

> $\phi(y)$ は $\psi$ の逆関数である。
<!-- formal-statement-end -->

<!-- definition-example-start: def-geod14-complex-coordinate -->
**定義の確認**。$a=b=R$ の赤道 $(\phi,\lambda)=(0,0)$ では $\psi=0$、$\rho=R$ で、$w=0$ です。東向きの小変化 $d\lambda=\varepsilon$ は $dw=\varepsilon$、北向きの変化 $d\psi=\varepsilon$ は $dw=i\varepsilon$ で、どちらも地表での一次長さは $R|\varepsilon|$ です。異なる向きでも内積は $R^2\operatorname{Re}(dw_1\overline{dw_2})$ だから、実軸と虚軸は直交します。実部・虚部、正の係数、元の計量との対応を直接確認できました。
<!-- definition-example-end -->

### 3.2 正則関数なら角を保存できる

地図平面の東・北座標をそれぞれ $E,N_p$ とし、複素数 $z=E+iN_p$ へまとめます。$z=f(w)$ が滑らかな複素写像なら、$f'(w)\ne0$ のところでは微小変位は一つの複素数による掛け算になり、回転と一様な伸縮だけが残ります。

<a id="thm-geod14-holomorphic-conformal"></a>
<!-- formal-statement-start -->
> **定理（正則写像と向きを保つ局所等角投影）**
> $a\ge b>0$ の回転楕円体の非極点の開領域 $U$ を局所複素座標 $w=\lambda+i\psi(\phi)$ で表し、地図投影 $F:U\to\mathbb R^2$ が $C^1$ 級かつJacobian正則とする。$f(w)=E(x,y)+iN_p(x,y)$、$x=\lambda$、$y=\psi$ とする。
>
> $F$ が角度と東・北の向きを保存する必要十分条件は、$f$ が $w(U)$ 上で正則かつ $f'(w)\ne0$ であることである。このとき、[Cauchy–Riemann方程式](../../../解析系/CA/CA1/index.md#thm-ca1-cr-necessary)は

$$
E_x=(N_p)_y,\qquad E_y=-(N_p)_x
$$

> であり、局所縮尺 $k$ と面積縮尺 $A_p$ は

$$
\boxed{k=\frac{|f'(w)|}{N(\phi)\cos\phi},
\qquad A_p=k^2}
$$

> となる。向きの保存を要求しない等角投影には、局所的に反正則な写像も含まれる。
<!-- formal-statement-end -->

**証明の見取り図。** 地表計量は $\rho^2I$ なので、[GEOD13の等角判定](../GEOD13/index.md#thm-geod13-preservation-tests)をそのまま複素座標のJacobianへ使えます。その行列が正の行列式を持つ場合、直交かつ等長の列の条件がCauchy–Riemann方程式と一致します。

<!-- proof-start -->
### 証明

$u=E$、$v=N_p$ と置き、$w=x+iy$ に関する実Jacobianを

$$
B=\begin{pmatrix}u_x&u_y\\v_x&v_y\end{pmatrix}
$$

とします。地表計量が $\rho^2I$ なので[等角の行列判定](../GEOD13/index.md#thm-geod13-preservation-tests)により、等角であることは

$$
B^\mathsf TB=c^2I\qquad(c>0)
$$

と同値です。$B$ の第1列を $(p,q)^\mathsf T$ と置くと、その長さは $c$ です。第2列はこれと直交して長さも $c$ なので、$( -q,p)^\mathsf T$ または $(q,-p)^\mathsf T$ になります。$\det B>0$ の向き保存の場合は前者だけが可能で、

$$
B=\begin{pmatrix}p&-q\\q&p\end{pmatrix}.
$$

従って $u_x=v_y=p$、$u_y=-v_x=-q$。逆向きにも、この二式が成り立ち、$B$ が正則なら

$$
B^\mathsf TB=(p^2+q^2)I,\qquad
\det B=p^2+q^2>0.
$$

$u,v$ は $C^1$ 級なので、[CA1のCauchy–Riemann十分条件](../../../解析系/CA/CA1/index.md#thm-ca1-cr-sufficient)により $f$ は正則で、$f'=p+iq$ です。逆に正則なら[必要条件](../../../解析系/CA/CA1/index.md#thm-ca1-cr-necessary)が成り立ちます。よって向き保存と正則性は同値です。

微小変位を $dw=dx+i\,dy$ と書くと、上の行列式から

$$
\begin{aligned}
dz&=(p\,dx-q\,dy)+i(q\,dx+p\,dy)\\
&=(p+iq)(dx+i\,dy)=f'(w)\,dw.
\end{aligned}
$$

平面の微小長さの二乗は $|dz|^2=|f'|^2|dw|^2$、地表では $ds^2=\rho^2|dw|^2$ です。ゆえに $k=|f'|/\rho$。面積縮尺は[GEOD13の式](../GEOD13/index.md#thm-geod13-preservation-tests)を使って $|\det B|/\rho^2=|f'|^2/\rho^2=k^2$ です。

向き反転の場合は第2列が $(q,-p)^\mathsf T$ なので、$u_x=-v_y$、$u_y=v_x$ です。これは $\overline f$ に対する通常のCauchy–Riemann方程式であり、反正則写像に対応します。
<!-- proof-end -->

**一次写像で検算。** $f(w)=Lw$（$L>0$ は長さ）なら $E=L\lambda$、$N_p=L\psi$ で、$B=LI$、$f'=L$。したがって

$$
k(\phi)=\frac{L}{N(\phi)\cos\phi},\qquad
A_p=\frac{L^2}{N(\phi)^2\cos^2\phi}.
$$

角度はどこでも保存されますが、長さや面積は一般に保存されません。$\lambda$ と $\psi$ を直接平面の座標に使うことで、等角性を数式で判定できたわけです。

**二次写像の注意。** $f(w)=Lw^2$ なら $f'=2Lw$。$w\ne0$ の近くでは等角ですが、$w=0$ ではJacobianが0になり、[GEOD13の局所逆を持つ投影](../GEOD13/index.md#def-geod13-projection-jacobian)の条件が壊れます。正則性だけでは足りず、**導関数が0でないこと**も必要です。

---

## 4. 球面・極・経度の切れ目

「$\phi=90^\circ$ の数値を式に代入すればよい」と考えてはいけません。そこで経度は一点に収束し、座標として退化します。一方、等角座標は無限大へ伸びます。これらは投影式の計算ミスではなく、異なる幾何学的な現象です。

<a id="prop-geod14-limit-poles"></a>
<!-- formal-statement-start -->
> **命題（球面極限と極における等角座標の挙動）**
> $a\ge b>0$、$e=\sqrt{1-b^2/a^2}\in[0,1)$ とする。非極点で上記の $\psi(\phi),\chi(\phi)$ を用いる。
>
> **（1）球面極限。** $e\to0$ で $\psi(\phi)\to\operatorname{atanh}(\sin\phi)$、$\chi(\phi)\to\phi$。この収束は極を除いた任意の閉緯度区間で一様である。
>
> **（2）極への極限。** 固定した $e<1$ に対して、$\phi\to\pm\pi/2$ なら $\psi(\phi)\to\pm\infty$、$\chi(\phi)\to\pm\pi/2$。したがって $(\lambda,\psi)$ は極を有限の複素座標点として含まない。
>
> **（3）経度の局所性。** $\lambda$ と $\lambda+2\pi$ は同じ地表上の経線を表すが、対応する $w$ は $2\pi$ だけ異なる。任意の正則関数 $f(w)$ がそのまま全球で一価な地図を与えるわけではない。
<!-- formal-statement-end -->

**証明の見取り図。** 積分公式の第2項は $e\to0$ で消えます。極に近づくと第1項だけが発散し、第2項は $e<1$ なら有限値にとどまります。経度の周期は座標そのものの問題です。

<!-- proof-start -->
### 証明

$|\phi|\le\phi_0<\pi/2$ の範囲では $|\sin\phi|\le\sin\phi_0<1$ です。また $|e\sin\phi|<1$ で、$e\operatorname{atanh}(e\sin\phi)\to0$ は $\phi$ について一様です。ゆえに

$$
\psi=\operatorname{atanh}(\sin\phi)
-e\operatorname{atanh}(e\sin\phi)
\longrightarrow\operatorname{atanh}(\sin\phi).
$$

$\arcsin(\tanh x)$ は連続だから

$$
\chi=\arcsin(\tanh\psi)\longrightarrow
\arcsin(\sin\phi)=\phi.
$$

北極への極限では $\sin\phi\to1$ なので $\operatorname{atanh}(\sin\phi)\to+\infty$ ですが、$e\operatorname{atanh}(e\sin\phi)\to e\operatorname{atanh}e$ は有限です。従って $\psi\to+\infty$、$\tanh\psi\to1$ から $\chi\to\pi/2$ です。南極側は奇性によって同様に反対符号になります。

最後に、経度は周期 $2\pi$ で同じ点を表す一方、

$$
w(\lambda+2\pi,\phi)=w(\lambda,\phi)+2\pi.
$$

例えば $f(w)=Lw$ は両者に異なる平面座標を与えます。一つの開いた経度区間では矛盾しませんが、全球に同じ式を継ぎ合わせるなら切れ目や周期条件の検討が必要です。
<!-- proof-end -->

局所的に正則な関数でも、複素対数などを使うときは選んだ領域での**枝**（一価になる値の取り方）が必要な場合があります。ここでの $\operatorname{atanh}$ は $(-1,1)$ 内の実数関数として一意ですが、経度の周期、複素関数の枝、極の座標退化は別々に検査します。

---

## 5. 演習

### Level A：座標を定義から確かめる

<a id="ex-geod14-a01"></a>
**A1　等角座標の方程式**（Level A）
- Level: A

$M(\phi)>0$、$r(\phi)>0$ に対し、$ds^2=M^2d\phi^2+r^2d\lambda^2$ を $r^2(dt^2+d\lambda^2)$ と書く。$t'>0$ という条件で $t'$ を求め、$t(0)=0$ の意味を説明せよ。

<!-- solution-start -->
**詳細解答。** $dt=t'd\phi$ を右辺へ代入し、$d\phi^2$ の係数について $r^2(t')^2=M^2$、$d\lambda^2$ の係数について $r^2=r^2$ です。$r>0$、$t'>0$ から $t'=M/r$ になります。積分定数は角度・距離の係数を変えませんが、$t(0)=0$ により赤道を基準の0に固定します。
<!-- solution-end -->

<a id="ex-geod14-a02"></a>
**A2　同じ緯度を三つの値で測る**（Level A）
- Level: A

$a=5,b=4$ の楕円体上の測地緯度 $\phi=30^\circ$ について、等角座標 $\psi$、等角緯度 $\chi$、地心緯度 $\theta$ を求めよ。$\psi$ を角度の「度」として解釈してはならない。

<!-- solution-start -->
**詳細解答。** $e^2=1-16/25=9/25$、$e=3/5$ です。[等角座標公式](#thm-geod14-isometric-integral)に $\sin30^\circ=1/2$ を入れて

$$
\psi=\frac12\log3-\frac3{10}\log\frac{13}{7}
\simeq0.36359438.
$$

次に[等角緯度の定義](#def-geod14-conformal-latitude)から

$$
\chi=\arcsin(\tanh\psi)\simeq20.3880^\circ.
$$

[地心緯度の関係](../GEOD3/index.md#prop-geod3-latitude-relation)から

$$
\theta=\arctan\left(\frac{16}{25}\frac1{\sqrt3}\right)
\simeq20.2795^\circ.
$$

$\phi=30^\circ$ とも異なり、$\chi$ と $\theta$ も一致しません。
<!-- solution-end -->

<a id="ex-geod14-a03"></a>
**A3　球面の等角計量**（Level A）
- Level: A

半径 $R>0$ の球面で $\psi=\operatorname{atanh}(\sin\phi)$ とするとき、$ds^2=R^2\cos^2\phi(d\psi^2+d\lambda^2)$ を直接確認せよ。

<!-- solution-start -->
**詳細解答。** 微分すると $d\psi/d\phi=1/\cos\phi$ なので $d\phi=\cos\phi\,d\psi$ です。球面の計量 $ds^2=R^2d\phi^2+R^2\cos^2\phi\,d\lambda^2$ に代入して

$$
ds^2=R^2\cos^2\phi\,d\psi^2+
R^2\cos^2\phi\,d\lambda^2
=R^2\cos^2\phi(d\psi^2+d\lambda^2).
$$

共通の正係数を持つので、微小角は平面座標と同じです。
<!-- solution-end -->

<a id="ex-geod14-a04"></a>
**A4　複素一次写像の縮尺**（Level A）
- Level: A

楕円体の局所複素座標 $w=\lambda+i\psi$ 上で、$L>0$ と実数定数 $c,d$ に対して $f(w)=Lw+(c+id)$ と置く。$f'$、Jacobian、局所縮尺を求めよ。

<!-- solution-start -->
**詳細解答。** $E=L\lambda+c$、$N_p=L\psi+d$ なので $(x,y)=(\lambda,\psi)$ に関するJacobianは $B=\operatorname{diag}(L,L)$、行列式は $L^2>0$ です。$f'=L$ でもあります。[正則写像の縮尺式](#thm-geod14-holomorphic-conformal)を適用し

$$
k=\frac L{N(\phi)\cos\phi}.
$$

定数 $c,d$ は平行移動なのでJacobianと縮尺へ現れません。
<!-- solution-end -->

<a id="ex-geod14-a05"></a>
**A5　極と経度の切れ目**（Level A）
- Level: A

固定した $0<e<1$ について、$\phi\to\pi/2$ で $\psi\to+\infty$ となる理由を述べよ。また $w=\lambda+i\psi$ において $\lambda$ を $2\pi$ 増やすと何が起きるか。

<!-- solution-start -->
**詳細解答。** $\operatorname{atanh}(\sin\phi)\to+\infty$ ですが、$e\operatorname{atanh}(e\sin\phi)\to e\operatorname{atanh}e<\infty$ です。その差である $\psi$ は $+\infty$ へ発散します。[極限の命題](#prop-geod14-limit-poles)の条件 $e<1$ が効きます。経度を $2\pi$ 増やすと同じ地点を示すのに $w$ は $w+2\pi$ へ変わります。任意の $f(w)$ が周期的とは限らないため、全球で一価な座標になる保証はありません。
<!-- solution-end -->

### Level B：導出・判定をつなぐ

<a id="ex-geod14-b01"></a>
**B1　常微分方程式の一意性と球面極限**（Level B）
- Level: B

$a\ge b>0$、$e^2=1-b^2/a^2$ とする。$t'=M/(N\cos\phi)$、$t(0)=0$ の解が $\operatorname{atanh}(\sin\phi)-e\operatorname{atanh}(e\sin\phi)$ で一意であると示せ。$e\to0$ の極限も求めよ。

<!-- solution-start -->
**詳細解答。** [曲率半径の式](../GEOD4/index.md#def-geod4-curvature-radii)から

$$
\frac{M}{N\cos\phi}
=\frac{1-e^2}{\cos\phi(1-e^2\sin^2\phi)}.
$$

候補を微分して

$$
\frac1{\cos\phi}
-\frac{e^2\cos\phi}{1-e^2\sin^2\phi}
=\frac{1-e^2}{\cos\phi(1-e^2\sin^2\phi)}
$$

が得られます。$\phi=0$ では両方の $\operatorname{atanh}$ が0です。二解の差は導関数0で定数だから、初期値を同じにすると恒等的に一致します。$e\to0$ では第2項は0へ収束し、$\operatorname{atanh}(\sin\phi)$ になります。極を含まない閉区間ではその収束は一様です。
<!-- solution-end -->

<a id="ex-geod14-b02"></a>
**B2　二次関数のCauchy–Riemann判定**（Level B）
- Level: B

$L>0$、$f(w)=Lw^2$ とする。$w=x+iy$ で実部・虚部を求めてCauchy–Riemann方程式を検算し、$w\ne0$ の局所縮尺 $k$、面積縮尺 $A_p$、および $w=0$ で失われる条件を求めよ。地表の $\rho=N(\phi)\cos\phi$ を使用してよい。

<!-- solution-start -->
**詳細解答。** 展開して $u=L(x^2-y^2)$、$v=2Lxy$ です。偏微分は

$$
u_x=2Lx=v_y,\qquad
u_y=-2Ly=-v_x.
$$

したがって[CA1の十分条件](../../../解析系/CA/CA1/index.md#thm-ca1-cr-sufficient)を満たす正則関数で、$f'(w)=2Lw$ です。$w\ne0$ では

$$
k=\frac{2L|w|}{\rho},\qquad
A_p=\frac{4L^2|w|^2}{\rho^2}.
$$

$w=0$ では実Jacobianの全成分が0で行列式も0となり、[局所逆の仮定](../GEOD13/index.md#def-geod13-projection-jacobian)が失われます。正則だというだけで全点で等角投影とは言えません。
<!-- solution-end -->

<a id="ex-geod14-b03"></a>
**B3　角度保存と向きの保存は別**（Level B）
- Level: B

$f(w)=\overline w=x-iy$ と置く。$w$ 平面から地図平面へのJacobianを求め、角度を保存するが正則ではないことを示せ。向きが反転することも判定せよ。

<!-- solution-start -->
**詳細解答。** $u=x$、$v=-y$ なので

$$
B=\begin{pmatrix}1&0\\0&-1\end{pmatrix},
\qquad B^\mathsf TB=I,\quad\det B=-1.
$$

従って[等角の行列判定](../GEOD13/index.md#thm-geod13-preservation-tests)から角度は保存されます。しかし $u_x=1$ と $v_y=-1$ が異なりCauchy–Riemann方程式を満たしません。$B$ の行列式が負なので向きは反転します。$f$ の共役は $w$ で正則となるため、これは反正則な例です。
<!-- solution-end -->

<a id="ex-geod14-b04"></a>
**B4　求長緯度・正積緯度・等角緯度の区別**（Level B）
- Level: B

$a\ge b>0$ の楕円体において、子午線弧長を $s(\phi)=\int_0^\phi M(t)\,dt$、面積積分を $I(\phi)=\int_0^\phi M(t)N(t)\cos t\,dt$ とする。求長緯度 $\mu=(\pi/2)s(\phi)/s(\pi/2)$、正積緯度 $\beta$ を $\sin\beta=I(\phi)/I(\pi/2)$ として、$d\mu/d\phi$ と $d\beta/d\phi$ を求め、等角緯度の導関数 $d\chi/d\phi$ と比較せよ。球面 $a=b=R$ でも確認せよ。

<!-- solution-start -->
**詳細解答。** $s'(\phi)=M(\phi)$ より

$$
\frac{d\mu}{d\phi}
=\frac{\pi M(\phi)}{2s(\pi/2)}.
$$

$I'(\phi)=M(\phi)N(\phi)\cos\phi$ を用いて $\sin\beta=I/I(\pi/2)$ を微分すると

$$
\cos\beta\,\frac{d\beta}{d\phi}
=\frac{M N\cos\phi}{I(\pi/2)},\qquad
\frac{d\beta}{d\phi}
=\frac{M N\cos\phi}{I(\pi/2)\cos\beta}.
$$

一方、[等角球面の計量表示](#thm-geod14-conformal-sphere-metric)の証明で得た式は

$$
\frac{d\chi}{d\phi}
=\frac{M\cos\chi}{N\cos\phi}.
$$

三式はそれぞれ子午線長、帯面積、局所角度に合わせて係数を選んでいるため、一般には異なります。球面では $M=N=R$、$s(\pi/2)=R\pi/2$、$I(\pi/2)=R^2$、$\mu=\beta=\chi=\phi$ なので三導関数はすべて1です。
<!-- solution-end -->

### Level C：楕円体上の局所投影を自分で構成する

<a id="ex-geod14-c01"></a>
**C1　非線形の局所等角投影と縮尺・失敗点**（Level C）
- Level: C

$a=5,b=4$ の楕円体の非極点で $w=\lambda+i\psi(\phi)$ とし、長さの単位を $a$ と同じに取って

$$
f(w)=5\bigl(w+\tfrac1{10}w^2\bigr),\qquad
z=E+iN_p=f(w)
$$

と定める。$|w|<1$ かつ経度を一つの開区間にほどいた領域で考える。

1. $\psi$ の式から計量が $\rho^2|dw|^2$ になるまで導け。
2. $E,N_p$ とJacobianを求め、向きを保って等角であることを示せ。
3. $\phi=30^\circ$、$\lambda=0.2$ ラジアンで $E,N_p,k,A_p$ を計算せよ。
4. 同じ式を領域外へ延長して $w=-5$ へ到達すると、何が壊れるか説明せよ。

<!-- solution-start -->
**詳細解答。**

**1．計量。** $e=3/5$ なので、[等角座標の積分公式](#thm-geod14-isometric-integral)は

$$
\psi(\phi)=\operatorname{atanh}(\sin\phi)
-\frac35\operatorname{atanh}\left(\frac35\sin\phi\right),
\quad
\psi'=\frac{16/25}{\cos\phi(1-\tfrac9{25}\sin^2\phi)}.
$$

$r=N\cos\phi$、$M/r=\psi'$ から $d\phi=(r/M)d\psi$。よって[GEOD4の計量](../GEOD4/index.md#thm-geod4-ellipsoid-metric)は

$$
ds^2=M^2\left(\frac rM\right)^2d\psi^2+r^2d\lambda^2
=r^2(d\lambda^2+d\psi^2)=\rho^2|dw|^2.
$$

**2．等角性。** $w=x+iy$ と展開すると

$$
E=5\left(x+\frac{x^2-y^2}{10}\right),
\qquad
N_p=5\left(y+\frac{xy}{5}\right).
$$

従って

$$
B=\begin{pmatrix}
5(1+x/5)&-y\\
y&5(1+x/5)
\end{pmatrix},\quad
f'(w)=5(1+w/5).
$$

$(E_x,(N_p)_x)^\mathsf T=(5+x,y)^\mathsf T$、$(E_y,(N_p)_y)^\mathsf T=(-y,5+x)^\mathsf T$ なので、二列は直交し、同じ長さです。$|w|<1$ なら $|w/5|<1/5$ から $f'\ne0$。ゆえに

$$
\det B=(5+x)^2+y^2=|f'|^2>0,\qquad
k=\frac{\sqrt{(5+x)^2+y^2}}{\rho}.
$$

向きも保っています。

**3．数値。** $\phi=30^\circ$ では

$$
\psi\simeq0.3635943818,\quad
\rho=N\cos\phi
=\frac{5\cos30^\circ}{\sqrt{1-\tfrac9{25}\sin^230^\circ}}
\simeq4.539206495.
$$

$x=0.2,y=\psi$ を代入し、値を変える箇所を追うと

$$
\begin{aligned}
E&=5\left(0.2+\frac{0.2^2-\psi^2}{10}\right),\\
N_p&=5\left(\psi+\frac{0.2\psi}{5}\right)
=5.2\psi,\\
|f'|^2&=(5.2)^2+\psi^2.
\end{aligned}
$$

従って $E\simeq0.95390$、$N_p\simeq1.89069$、$k\simeq1.1484$、$A_p=k^2\simeq1.319$ です。$A_p$ をJacobianから独立に計算すると、地表面積要素 $\rho^2dx\,dy$ と平面面積要素 $\det B\,dx\,dy$ の比も同じです。

**4．失敗点。** $f'(w)=5+w$ は $w=-5$ で0です。そこでJacobianの両列は0になり、局所逆を失います。$f$ が正則であることは変わりませんが、[等角投影の正則条件](#thm-geod14-holomorphic-conformal)の $f'\ne0$ が成立しません。また、そもそも $|w|<1$ の領域の主張をその外へ無条件に拡張することはできません。
<!-- solution-end -->

---

## 6. 次の構成へ

楕円体の計量を

$$
ds^2=N^2\cos^2\phi\,(d\lambda^2+d\psi^2)
=h^2(d\chi^2+\cos^2\chi\,d\lambda^2)
$$

と二通りの等角形式に変えました。前者は正則関数の微分、後者は球面上の角度計算に便利です。ここで保証したのは**局所的な角度保存**であり、全地球を切れ目なく平面へ写すことや、どこでも距離を保存することではありません。これを踏まえて次は、球面上の具体的な地図投影を構成します。
