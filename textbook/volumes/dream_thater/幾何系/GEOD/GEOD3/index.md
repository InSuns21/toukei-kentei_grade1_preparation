# GEOD3 回転楕円体の幾何と測地緯度

緯度が $45^\circ$ と記された点で、地球の中心からその点へ向かう線も、楕円体の表面に垂直な線も、赤道面と $45^\circ$ をなすのでしょうか。球面なら一致しますが、極方向につぶれた楕円体では一般に一致しません。

[GEOD1 の三種類の緯度](../GEOD1/index.md#def-geod1-three-latitudes)では角度を測る**方向**を区別しました。[GEOD2 の座標参照系](../GEOD2/index.md#def-geod2-crs)では、その方向と数値を特定の基準に結び付ける必要がありました。本章では一つの楕円体がすでに選ばれ、その中心・回転軸・赤道面が与えられているとして、表面上の法線を計算します。

目標は次の五つです。

1. 長半径・短半径から扁平率、第一離心率の二乗、第三扁平率を計算し、許される値域を確かめる。
2. 楕円体の方程式を微分して外向き法線を求め、測地緯度を定義から判定する。
3. 測地緯度と地心緯度の関係を、角度の象限・極での例外まで含めて導く。
4. 回転軸を含む断面と一定の高さで切った円を具体的に表し、赤道・極・球面極限を検算する。
5. GRS80 のような実用楕円体で、二種類の緯度の差の大きさと、その数値を扱う条件を見積もる。

必要なのは楕円・三角関数・初等微分、およびベクトルの[内積](../../../基礎科目/F0/F0-00E1/index.md#def-f0-00e1-inner-product)です。楕円体上の曲率半径や曲面計量を既知とはしません。

<!-- definition-example-audit: strict -->

---

## 1. 地球の形を二つの長さから記述する

球の式は三方向を同じ半径で割ります。これに対し、南北方向だけ短くして地球の大まかな扁平さを取り込んだものが、[GEOD1 の準拠楕円体](../GEOD1/index.md#def-geod1-reference-ellipsoid)の幾何学的な模型です。まず長さを揃え、どの軸を回転軸にするかを確定します。

中心を原点 $O$、赤道面を $XY$ 平面、北極方向を $+Z$ 軸とします。赤道半径 $a$ と極半径 $b$ は長さであり、以下では $a\ge b>0$ と仮定します。$a>b$ では極方向が短く、$a=b$ では球面です。楕円体の内部ではなく**等号が成り立つ面**だけを扱います。

<a id="def-geod3-ellipsoid"></a>
<!-- formal-statement-start -->
> **定義（扁平な回転楕円体）**
> $a\ge b>0$ を固定したとき、次の方程式を満たす点 $(X,Y,Z)\in\mathbb R^3$ 全体を、赤道半径 $a$・極半径 $b$ の回転楕円体 $E_{a,b}$ とする。

$$
E_{a,b}=\left\{(X,Y,Z):\frac{X^2+Y^2}{a^2}+\frac{Z^2}{b^2}=1\right\}.
$$
<!-- formal-statement-end -->

<!-- definition-example-start: def-geod3-ellipsoid -->
**定義の確認**　$a=5$、$b=4$ とすると $P=(3,0,16/5)$ は $9/25+(16/5)^2/16=9/25+16/25=1$ を満たして面上にあります。一方 $(5,0,1)$ は $25/25+1/16>1$ なので面上にありません。赤道上の $(5,0,0)$ と北極 $(0,0,4)$ は面上にあり、それぞれの中心からの距離は $5$ と $4$ です。
<!-- definition-example-end -->

三つの無次元量を使うと、異なる単位や大きさの楕円体を形だけで比較できます。**扁平率**は赤道半径に対する極半径の減少分、**第一離心率の二乗**は両半径の平方の比から得る量、**第三扁平率**は半径の差と和の比です。第一離心率そのものは、ここで定める $e^2$ の非負平方根 $e$ とします。

<a id="def-geod3-shape-parameters"></a>
<!-- formal-statement-start -->
> **定義（扁平率・第一離心率・第三扁平率）**
> $a\ge b>0$ を満たす回転楕円体 $E_{a,b}$ について、扁平率 $f$、第一離心率の二乗 $e^2$、第三扁平率 $n$ を次で定める。

$$
f=\frac{a-b}{a},\qquad
e^2=1-\frac{b^2}{a^2},\qquad
n=\frac{a-b}{a+b},\qquad e=\sqrt{e^2}\ge0.
$$
<!-- formal-statement-end -->

<!-- definition-example-start: def-geod3-shape-parameters -->
**定義の確認**　$a=5,b=4$ なら $f=(5-4)/5=1/5$、$e^2=1-16/25=9/25$、$e=3/5$、$n=(5-4)/(5+4)=1/9$ です。$a\ge b>0$ より $0\le f<1$、$0\le e^2<1$、$0\le n<1$ で、球 $a=b$ なら三量は $0$ です。
<!-- definition-example-end -->

計算では $a,b,f,e^2,n$ が独立の入力値だと誤解しないことが重要です。$b=a(1-f)$ を代入すれば

$$
e^2=1-(1-f)^2=2f-f^2,
\qquad
n=\frac{f}{2-f},
\qquad
f=\frac{2n}{1+n}.
$$

例えば $f=1/5$ のとき $2f-f^2=2/5-1/25=9/25$ で、上の直接計算と一致します。これらは形のパラメータの**代数的な換算**であり、異なる測地基準間の[座標変換](../GEOD2/index.md#def-geod2-coordinate-transformation)ではありません。

---

## 2. 子午断面・緯線と表面に垂直な方向

任意の表面点について、回転軸からの距離を $p=\sqrt{X^2+Y^2}$ とおきます。$p\ge0$ です。北極側と南極側は $Z$ の符号で区別します。以下、$\operatorname{atan2}(v,u)$ は $u^2+v^2>0$ のとき平面ベクトル $(u,v)$ の向きを符号付きで返す角（値域 $(-\pi,\pi]$）です。$p>0$ の点では、$XY$ 面で $+X$ 軸から $+Y$ 軸へ測る角 $\lambda=\operatorname{atan2}(Y,X)$ を経度として使います。

回転軸を含む平面で面を切った**子午断面**は、$p$ と $Z$ の平面で見ると $p^2/a^2+Z^2/b^2=1$ の右半分です。一方、一定の高さ $Z=z_0$ で水平に切った**緯線の円**は、半径 $p=a\sqrt{1-z_0^2/b^2}$ を持ちます（$|z_0|<b$）。端の $z_0=\pm b$ では半径が $0$ となり、円は一点に縮みます。

<a id="def-geod3-meridian-parallel"></a>
<!-- formal-statement-start -->
> **定義（子午断面と緯線）**
> 回転楕円体 $E_{a,b}$ と、回転軸を含む一つの平面との交わりを子午断面とする。$-b\le z_0\le b$ に対して $E_{a,b}$ と平面 $Z=z_0$ との交わりをその高さの緯線とし、$z_0=\pm b$ では各極の一点とする。
<!-- formal-statement-end -->

<!-- definition-example-start: def-geod3-meridian-parallel -->
**定義の確認**　$a=5,b=4$ で $Z=12/5$ の平面をとると、$p^2/25=1-(12/5)^2/16=16/25$ なので緯線半径は $p=4$ です。子午断面として $Y=0$ の平面を選び、そこでの**符号付き**横座標を $u=X$ とすれば、楕円の式は $u^2/25+Z^2/16=1$ です。その左右対称な点は $(u,Z)=(4,12/5)$ と $(-4,12/5)$ で、いずれも回転軸からの距離は $p=|u|=4$ です。$p$ 自体には負値を使いません。
<!-- definition-example-end -->

その点に立てた法線の向きを、図から推測する必要はありません。面の式の左辺から $1$ を引いた関数

$$
F(X,Y,Z)=\frac{X^2+Y^2}{a^2}+\frac{Z^2}{b^2}-1
$$

を使います。$\nabla F$ は三つの座標での偏導関数を並べた**勾配** $(\partial F/\partial X,\partial F/\partial Y,\partial F/\partial Z)$ です。面上を動く微分可能な曲線を $r(t)=(X(t),Y(t),Z(t))$ と書き、$t$ を曲線のパラメータとすると $F(r(t))=0$ です。$a,b$ は固定したまま $t$ で微分し、連鎖律を成分ごとに展開すると

$$
\begin{aligned}
0=\frac{d}{dt}F(r(t))
&=\frac{2X}{a^2}\frac{dX}{dt}+\frac{2Y}{a^2}\frac{dY}{dt}+\frac{2Z}{b^2}\frac{dZ}{dt}\\
&=\nabla F(r(t))\cdot r'(t).
\end{aligned}
$$

右辺は[内積](../../../基礎科目/F0/F0-00E1/index.md#def-f0-00e1-inner-product)ですから、$\nabla F$ は表面に接する任意の曲線の接線方向 $r'(t)$ と直交します。面の外側へ動くと $F$ が増えるので、これは外向きです。ここでの $d/dt$ は曲線に沿う一変数微分、$\partial F/\partial X$ などは他の座標を固定する偏微分であり、連鎖律が両者を結んでいます。

$$
\nabla F=\left(\frac{2X}{a^2},\frac{2Y}{a^2},\frac{2Z}{b^2}\right),
\qquad
\boldsymbol\nu=\frac{(X/a^2,Y/a^2,Z/b^2)}{\sqrt{(X^2+Y^2)/a^4+Z^2/b^4}}.
$$

分母は面上で $0$ になりません。もし $X=Y=Z=0$ なら左辺が $-1$ となり面上にないからです。このため単位外向き法線 $\boldsymbol\nu$ が全表面点で定まります。

例えば前節の $P=(3,0,16/5)$ では未正規化の外向き法線は $(3/25,0,1/5)=(3,0,5)/25$ です。地心方向 $OP=(3,0,16/5)$ とは成分の比が異なります。両者を同じ「上」と呼べば角度の定義を取り違えます。

---

## 3. 外向き法線で測る緯度

[GEOD1 で区別した測地緯度](../GEOD1/index.md#def-geod1-three-latitudes)を、この楕円体の各点で計算できるようにします。緯度は赤道面からの**符号付き角**であり、北向きを正とします。点の北側・南側を法線の $Z$ 成分で区別すれば、正負の向きが一意になります。

<a id="def-geod3-geodetic-latitude"></a>
<!-- formal-statement-start -->
> **定義（表面上の測地緯度）**
> $a\ge b>0$ の楕円体 $E_{a,b}$ 上の点 $P=(X,Y,Z)$ で、上記の単位外向き法線 $\boldsymbol\nu$ と赤道面の符号付き角 $\phi\in[-\pi/2,\pi/2]$ を測地緯度とする。$p=\sqrt{X^2+Y^2}>0$ なら次の値であり、極 $p=0$ では $Z$ の符号に従って $\phi=\pm\pi/2$ とする。

$$
\phi=\operatorname{atan2}\!\left(\frac{Z}{b^2},\frac{p}{a^2}\right).
$$
<!-- formal-statement-end -->

<!-- definition-example-start: def-geod3-geodetic-latitude -->
**定義の確認**　$a=5,b=4$、$P=(3,0,16/5)$ の法線は $(3,0,5)/\sqrt{34}$ です。水平成分の大きさは $3/\sqrt{34}$、鉛直成分は $5/\sqrt{34}$ なので $\tan\phi=5/3$、つまり $\phi=\arctan(5/3)$ です。外向き法線の長さは $(3^2+5^2)/34=1$ により確かめられます。
<!-- definition-example-end -->

上で導入した $\operatorname{atan2}$ は両成分の符号を使います。特に $p>0$ で $Z<0$ のとき $\phi<0$、$Z=0$ のとき $\phi=0$ です。比の逆正接だけでは象限や $p=0$ を安全に扱えません。

他方、地球中心 $O$ から点 $P$ へ引いたベクトル $OP$ の赤道面からの符号付き角が、同じ点の**地心緯度**です。測地緯度と同じ点の角度ですが、測る線が違います。

<a id="def-geod3-geocentric-latitude"></a>
<!-- formal-statement-start -->
> **定義（表面上の地心緯度）**
> $a\ge b>0$ の楕円体 $E_{a,b}$ 上の点 $P=(X,Y,Z)$ について、中心から点へ向かう $OP$ と赤道面の符号付き角 $\psi\in[-\pi/2,\pi/2]$ を地心緯度とする。$p>0$ では次の値であり、極では $\psi=\pm\pi/2$ とする。

$$
\psi=\operatorname{atan2}(Z,p).
$$
<!-- formal-statement-end -->

<!-- definition-example-start: def-geod3-geocentric-latitude -->
**定義の確認**　同じ $P=(3,0,16/5)$ では、$OP$ の水平長は $3$、鉛直成分は $16/5$ なので $\tan\psi=(16/5)/3=16/15$ です。$\tan\phi=5/3$ と異なります。ここで比べたのは同一点の二方向であって、二つの異なる地点の緯度ではありません。
<!-- definition-example-end -->

### 法線方向と地心方向の換算

角度の変換を公式の暗記で済ませず、両定義から導きます。$p>0$ の点では法線方向の水平成分が $p/a^2$、鉛直成分が $Z/b^2$ です。ゆえに

$$
\tan\phi=\frac{Z/b^2}{p/a^2}=\frac{a^2}{b^2}\frac Zp,
\qquad
\tan\psi=\frac Zp.
$$

ここに $b^2/a^2=1-e^2$ を入れれば関係が得られます。

<a id="prop-geod3-latitude-relation"></a>
<!-- formal-statement-start -->
> **命題（楕円体表面の測地緯度と地心緯度）**
> $a\ge b>0$ の楕円体 $E_{a,b}$ の表面点 $P$ が極でないとする。その測地緯度 $\phi$ と地心緯度 $\psi$ は次を満たす。

$$
\tan\psi=(1-e^2)\tan\phi=\frac{b^2}{a^2}\tan\phi.
$$

> 両角は $[-\pi/2,\pi/2]$ の中にある。極では両角が同じ $\pm\pi/2$ になり、上式は無限大の正接を用いる式として適用しない。
<!-- formal-statement-end -->

**証明の見取り図。** 点への線と法線を別々に成分表示し、水平成分と鉛直成分の比を比べるだけです。比が変わる唯一の原因は、法線を作る際に $a^2$ と $b^2$ という**異なる分母**が現れることにあります。

<!-- proof-start -->
### 証明

$P=(X,Y,Z)\in E_{a,b}$ とし、$p=\sqrt{X^2+Y^2}>0$ とする。中心から点へ向かうベクトルは $(X,Y,Z)$ で、その水平長は $p$、鉛直成分は $Z$ である。従って $\tan\psi=Z/p$ となる。

楕円体の面を定める $F$ を前節のとおり微分すれば、外向き法線は正の定数倍を無視して $(X/a^2,Y/a^2,Z/b^2)$ である。その水平長は $p/a^2>0$、鉛直成分は $Z/b^2$ なので

$$
\tan\phi=\frac{Z/b^2}{p/a^2}
=\frac{a^2}{b^2}\frac Zp
=\frac{a^2}{b^2}\tan\psi.
$$

$a,b>0$ より $b^2/a^2>0$ で両辺を換算でき、$b^2/a^2=1-e^2$ を代入して主張を得る。$p>0$ なのでどちらの角も開区間 $(-\pi/2,\pi/2)$ にあり、両角の象限は $Z$ の符号で同じである。極では面の式から $Z=\pm b$、法線も地心方向も $Z$ 軸方向になるため両角は一致する。
<!-- proof-end -->

赤道では $Z=0$ なので $\psi=\phi=0$ です。北半球で $a>b$、$0<\phi<\pi/2$ なら $0<1-e^2<1$ なので $0<\psi<\phi$ です。南半球なら $\phi<\psi<0$ です。球 $a=b$ では $e^2=0$、全表面で $\psi=\phi$ となります。

数値の緯度を相互に換算するときは、極を含めて次の形で計算できます。$k=1-e^2=b^2/a^2$ とおき、$\phi,\psi$ を規定の角度区間で扱えば

$$
\psi=\operatorname{atan2}(k\sin\phi,\cos\phi),
\qquad
\phi=\operatorname{atan2}(\sin\psi,k\cos\psi).
$$

たとえば $\phi=45^\circ$ なら $\psi=\arctan(k)$ です。逆に $\psi=45^\circ$ なら $\phi=\arctan(1/k)$ となり、変換方向を取り違えると結果が逆側にずれます。

---

## 4. 緯度と経度から楕円体表面点を構成する

ここまでは既知の点から角度を読んできました。逆に緯度と経度を与えたら、表面上の点を一つ作れるでしょうか。外向き法線が緯度 $\phi$ の方向を向く条件から導けます。これは**楕円体高が $0$ の表面点**を作る式です。高さを伴う一般の測地座標変換は GEOD5 で扱います。

極でない点の経度 $\lambda$ を固定します。法線の向きが $(\cos\phi\cos\lambda,\cos\phi\sin\lambda,\sin\phi)$ となるには、正数 $t$ を使って

$$
\frac X{a^2}=t\cos\phi\cos\lambda,\quad
\frac Y{a^2}=t\cos\phi\sin\lambda,\quad
\frac Z{b^2}=t\sin\phi
$$

と書ける必要があります。これを面の式に代入すると

$$
t^2(a^2\cos^2\phi+b^2\sin^2\phi)=1.
$$

$t>0$ で $a^2\cos^2\phi+b^2\sin^2\phi=a^2(1-e^2\sin^2\phi)$ ですから、$D(\phi)=\sqrt{1-e^2\sin^2\phi}>0$ とおいて $t=1/(aD(\phi))$ と決まります。$D$ は無次元であり、$a$ を掛けると長さになります。

<a id="prop-geod3-surface-parameterization"></a>
<!-- formal-statement-start -->
> **命題（測地緯度・経度による楕円体表面表示）**
> $a\ge b>0$、$e^2=1-b^2/a^2$、$-\pi/2\le\phi\le\pi/2$、$\lambda\in(-\pi,\pi]$ とし、$D(\phi)=\sqrt{1-e^2\sin^2\phi}$ とする。次の点は $E_{a,b}$ 上にあり、その測地緯度は $\phi$、極以外の経度は $\lambda$ である。

$$
\begin{aligned}
X&=\frac{a\cos\phi\cos\lambda}{D(\phi)},\\
Y&=\frac{a\cos\phi\sin\lambda}{D(\phi)},\\
Z&=\frac{a(1-e^2)\sin\phi}{D(\phi)}.
\end{aligned}
$$

> 極以外ではこの条件を満たす表面点は一意である。極 $\phi=\pm\pi/2$ では任意の $\lambda$ が同じ点 $(0,0,\pm b)$ を与え、経度は位置を識別しない。
<!-- formal-statement-end -->

**証明の見取り図。** 法線の向きを指定し、面の等式で正の比例係数 $t$ を一つに定めます。さらに得た点を面の式へ戻し、法線が指定方向を向くことを確かめます。

<!-- proof-start -->
### 証明

$0\le e^2<1$ なので $D(\phi)^2=1-e^2\sin^2\phi\ge1-e^2>0$ である。与えられた式により

$$
\frac{X^2+Y^2}{a^2}
=\frac{\cos^2\phi(\cos^2\lambda+\sin^2\lambda)}{D^2}
=\frac{\cos^2\phi}{D^2},
$$

$$
\frac{Z^2}{b^2}
=\frac{a^2(1-e^2)^2\sin^2\phi}{b^2D^2}
=\frac{(1-e^2)\sin^2\phi}{D^2},
$$

ここでは $b^2=a^2(1-e^2)$ を使った。二式を加えると分子は $\cos^2\phi+(1-e^2)\sin^2\phi=1-e^2\sin^2\phi=D^2$ だから、点は面上にある。

次に、その点での未正規化法線は

$$
\left(\frac X{a^2},\frac Y{a^2},\frac Z{b^2}\right)
=\frac1{aD}(\cos\phi\cos\lambda,\cos\phi\sin\lambda,\sin\phi).
$$

右辺の括弧の長さは $\cos^2\phi(\cos^2\lambda+\sin^2\lambda)+\sin^2\phi=1$ なので、外向き法線の角は確かに $\phi$ となる。$|\phi|<\pi/2$ では $X^2+Y^2>0$ で、水平成分の向きは $\lambda$ である。

一意性も、外向き法線が指定方向なら比例係数 $t>0$ を持つ上記三式を満たし、面の方程式から $t^2=1/(a^2\cos^2\phi+b^2\sin^2\phi)$ と定まることから従う。両極では $\cos\phi=0$ で $X=Y=0$、$Z=\pm a(1-e^2)/\sqrt{1-e^2}=\pm b$ であり、$\lambda$ に依存しない。
<!-- proof-end -->

### 子午断面と緯線を再確認する

この表示では、同じ $\lambda$ で $\phi$ を動かすと回転軸を含む平面内の楕円をたどり、同じ $\phi$ で $\lambda$ を動かすと

$$
p(\phi)=\sqrt{X^2+Y^2}=\frac{a\cos\phi}{D(\phi)},
\qquad
Z(\phi)=\frac{b^2\sin\phi}{aD(\phi)}
$$

が一定の円をたどります。つまり、$\phi$ は緯線の円を**どの高さに置くか**も決めます。ただし緯線の半径と子午線に沿う弧長の変化率は同じではありません。これらの局所的な長さを GEOD4 で導きます。

赤道では $D(0)=1$ で $(X,Y,Z)=(a\cos\lambda,a\sin\lambda,0)$、北極では $(0,0,b)$、南極では $(0,0,-b)$ です。球 $a=b=R$ なら $e^2=0$、$D=1$ で通常の球面座標の位置ベクトル $R(\cos\phi\cos\lambda,\cos\phi\sin\lambda,\sin\phi)$ に戻ります。

---

## 5. GRS80 でどのくらいずれるか

日本の測地基準に用いられる GRS80 楕円体について、国土地理院公表の赤道半径 $a=6\,378\,137$ m、逆扁平率 $1/f=298.257222101$ を採用します。これらから算出した値を**式の検算用**に使い、地点・CRS・座標時点を指定しない緯度数値を現実の位置そのものとはみなしません。

$$
\begin{aligned}
f&\simeq0.003352810681,\\
b=a(1-f)&\simeq6\,356\,752.314140\ \mathrm m,\\
e^2=2f-f^2&\simeq0.006694380023,\\
k=1-e^2&\simeq0.993305619977.
\end{aligned}
$$

測地緯度を $\phi=45^\circ$ とすると、[緯度関係の命題](#prop-geod3-latitude-relation)に $\tan45^\circ=1$ を代入して

$$
\psi=\arctan(k)\simeq44.80757678^\circ,
\qquad
\phi-\psi\simeq0.19242322^\circ\simeq692.72''.
$$

約 $11$ 分 $33$ 秒角の差です。これは「緯度の小数桁を丸める誤差」ではなく、どの方向の角度を緯度として定義したかによる差です。

さらに、この差は中緯度付近で大きく、赤道と両極では $0$ に戻ります。どこで最大になるかも導出できます。北半球 $0\le\phi\le\pi/2$ と $k=b^2/a^2$ を取り、[緯度関係の命題](#prop-geod3-latitude-relation)の後で導いた極にも使える換算式により

$$
\psi(\phi)=\operatorname{atan2}(k\sin\phi,\cos\phi),
\qquad \delta(\phi)=\phi-\psi(\phi)
$$

と定めます。これは極を含む閉区間で定義され、$\delta(0)=\delta(\pi/2)=0$ です。内部 $0<\phi<\pi/2$ だけでは $\psi(\phi)=\arctan(k\tan\phi)$ とも書けます。$k$ を固定し、$\delta'(\phi)=d\delta/d\phi$ として連鎖律で微分すると

$$
\delta'(\phi)=1-\frac{k}{\cos^2\phi+k^2\sin^2\phi}.
$$

$0<k<1$ のとき $\delta'(\phi)=0$ は $\cos^2\phi+k^2\sin^2\phi=k$、すなわち $\tan^2\phi=1/k$ です。このとき $\tan\psi=k\tan\phi=\sqrt{k}$ なので

$$
\phi_*=\arctan\frac1{\sqrt{k}},\qquad
\psi_*=\arctan\sqrt{k},\qquad
\delta_{\max}=\frac\pi2-2\arctan\sqrt{k}.
$$

両端では $\delta=0$、内部では $\delta>0$ で、停留点は一つですからこれが最大値です。GRS80 では $\phi_*\simeq45.0962^\circ$、$\delta_{\max}\simeq692.73''$ です。南半球では符号を反転した同じ大きさになります。球 $k=1$ では全緯度で差が $0$ であり、最大点は特定されません。

実用上、**測地緯度と地心緯度をそのまま入れ替えるのは不可**です。ただし以上の変換は $P\in E_{a,b}$ という仮定で導いたものです。楕円体から離れた測点について同じ $\tan\psi=k\tan\phi$ を機械的に適用する根拠はありません。楕円体高を定めて表面点と測点を結ぶ導出は GEOD5 で行います。

一次資料：国土地理院「[日本の測地系](https://www.gsi.go.jp/sokuchikijun/datum-main.html)」（GRS80 の長半径・扁平率）。

---

## 6. 演習：定義の適用から統合判定まで

### Level A：面・角度・端点を一つずつ確かめる

#### A1. 楕円体の形の三量

$a=10$、$b=8$ の回転楕円体について $f,e^2,n$ を定義から求め、$e^2=2f-f^2$ を検算せよ。

- Level: A
- ID: GEOD3-A1

<!-- solution-start -->
**詳細解答。** [形の三量の定義](#def-geod3-shape-parameters)に代入すると $f=(10-8)/10=1/5$、$e^2=1-8^2/10^2=1-64/100=9/25$、$n=(10-8)/(10+8)=1/9$ です。$2f-f^2=2/5-1/25=(10-1)/25=9/25=e^2$ で一致します。いずれも長さの単位に依存しない値です。
<!-- solution-end -->

#### A2. 点が面上か、法線はどちらか

$a=5,b=4$ とする。$P=(3,0,16/5)$ が面上にあることを確かめ、$P$ における未正規化の外向き法線と単位外向き法線を求めよ。

- Level: A
- ID: GEOD3-A2

<!-- solution-start -->
**詳細解答。** [楕円体の定義](#def-geod3-ellipsoid)に代入すると $3^2/5^2+(16/5)^2/4^2=9/25+16/25=1$ です。$F$ の偏微分から $\nabla F/2=(X/a^2,Y/a^2,Z/b^2)=(3/25,0,1/5)=(3,0,5)/25$ となり、その長さは $\sqrt{3^2+5^2}/25=\sqrt{34}/25$ です。従って単位法線は $(3,0,5)/\sqrt{34}$ です。$F$ が外側へ増える向きなので符号は正です。
<!-- solution-end -->

#### A3. 二種類の緯度を直接計算する

A2 と同じ楕円体・同じ点で、測地緯度 $\phi$ と地心緯度 $\psi$ の正接を求め、どちらが大きいか判定せよ。

- Level: A
- ID: GEOD3-A3

<!-- solution-start -->
**詳細解答。** 法線の水平・鉛直成分の比から[測地緯度](#def-geod3-geodetic-latitude)、中心からの方向の比から[地心緯度](#def-geod3-geocentric-latitude)を求めます。

$$
\tan\phi=\frac{1/5}{3/25}=\frac53,
\qquad
\tan\psi=\frac{16/5}{3}=\frac{16}{15}.
$$

いずれも北半球の $0$ と $\pi/2$ の間で正接が単調増加し、$5/3=25/15>16/15$ なので $\phi>\psi$ です。
<!-- solution-end -->

#### A4. 赤道・極と経度

$a=5,b=4$ の楕円体上の $P=(5,0,0)$ と $Q=(0,0,-4)$ について、それぞれの測地緯度・地心緯度を求め、$Q$ の経度は一意に定まるか述べよ。

- Level: A
- ID: GEOD3-A4

<!-- solution-start -->
**詳細解答。** $P$ では $Z=0,p=5>0$ なので両角は $0$ です。$Q$ では $p=0,Z=-4$、地心方向も法線 $(0,0,-1)$ も南極方向なので両角は $-\pi/2$ です。[表面表示の命題](#prop-geod3-surface-parameterization)では $\cos(-\pi/2)=0$ により、どの $\lambda$ を入れても $X=Y=0$ となります。従って $Q$ の経度は一意ではありません。
<!-- solution-end -->

#### A5. 球面極限を確かめる

$a=b=R>0$ に対し、形の三量、法線方向、緯度関係、表面表示がどうなるか求めよ。

- Level: A
- ID: GEOD3-A5

<!-- solution-start -->
**詳細解答。** $f=(R-R)/R=0$、$e^2=1-R^2/R^2=0$、$n=0$ です。面上では $X^2+Y^2+Z^2=R^2$、未正規化法線 $(X/R^2,Y/R^2,Z/R^2)$ は地心方向 $(X,Y,Z)$ の正の定数倍なので $\phi=\psi$ です。[表面表示](#prop-geod3-surface-parameterization)で $D=1$ とおくと $(X,Y,Z)=R(\cos\phi\cos\lambda,\cos\phi\sin\lambda,\sin\phi)$ です。極だけは経度が重複します。
<!-- solution-end -->

### Level B：導出を再構成し、誤用を検出する

#### B1. 南半球で逆正接の枝を確かめる

$a=5,b=4$ とし、$P=(-3,0,-16/5)$ とする。面上判定、経度 $\lambda\in(-\pi,\pi]$、測地緯度 $\phi$、地心緯度 $\psi$ を求めよ。$\arctan$ の値だけで符号を落とさないこと。

- Level: B
- ID: GEOD3-B1

<!-- solution-start -->
**詳細解答。** $X^2/a^2+Z^2/b^2=9/25+16/25=1$ なので面上です。$p=3$、$X<0,Y=0$ より、経度は $\lambda=\operatorname{atan2}(0,-3)=\pi$ です。

未正規化法線は $(-3/25,0,-1/5)$ で、その水平長は $3/25$、鉛直成分は $-1/5$ です。中心から点への方向の水平長と鉛直成分は $3,-16/5$ なので、それぞれの角度は

$$
\phi=-\arctan\frac53,
\qquad \psi=-\arctan\frac{16}{15}.
$$

従って $\phi<\psi<0$ です。[緯度関係](#prop-geod3-latitude-relation)にも $k=16/25$ を入れると $\tan\psi=(16/25)(-5/3)=-16/15$ となり、符号まで一致します。
<!-- solution-end -->

#### B2. 法線の向きから表面点を自力で復元する

$a>b>0$、$0<\phi<\pi/2$、$\lambda=0$ とする。外向き法線が $(\cos\phi,0,\sin\phi)$ を向くという条件と楕円体方程式のみから、点の $X,Z$ とその一意性を導け。

- Level: B
- ID: GEOD3-B2

<!-- solution-start -->
**詳細解答。** 未正規化法線が $(X/a^2,0,Z/b^2)$ なので、指定された法線方向へ向くための正の比例係数 $t$ を使って

$$
\frac X{a^2}=t\cos\phi,\qquad
\frac Z{b^2}=t\sin\phi
$$

とおきます。これより $X=a^2t\cos\phi$、$Z=b^2t\sin\phi$ です。楕円体方程式に代入すると

$$
t^2(a^2\cos^2\phi+b^2\sin^2\phi)=1,
\qquad
t=\frac1{\sqrt{a^2\cos^2\phi+b^2\sin^2\phi}}>0.
$$

$b^2=a^2(1-e^2)$ を用いれば、分母は $aD$（$D=\sqrt{1-e^2\sin^2\phi}>0$）なので

$$
X=\frac{a\cos\phi}{D},\qquad
Z=\frac{a(1-e^2)\sin\phi}{D}.
$$

これは[表面表示](#prop-geod3-surface-parameterization)の $\lambda=0$ に一致します。正の $t$ が一意に定まり、$X,Z$ もそれにより決まるので、指定された法線方向の表面点は一意です。
<!-- solution-end -->

#### B3. 緯度差が最大になる条件

$a>b>0$、$k=b^2/a^2$ とする。北半球の表面点で $\delta=\phi-\psi$ が最大となる $\tan\phi$ を求め、最大緯度差が $\pi/2-2\arctan\sqrt{k}$ であることを証明せよ。

- Level: B
- ID: GEOD3-B3

<!-- solution-start -->
**詳細解答。** $0<k<1$ です。[緯度関係](#prop-geod3-latitude-relation)から、閉区間 $0\le\phi\le\pi/2$ では $\psi=\operatorname{atan2}(k\sin\phi,\cos\phi)$ と定められ、端点での差 $\delta=\phi-\psi$ はともに $0$ です。内部 $0<\phi<\pi/2$ では $\psi=\arctan(k\tan\phi)$ なので、$k$ を固定して $\phi$ で微分します。連鎖律により

$$
\frac{d\psi}{d\phi}
=\frac{k(1+\tan^2\phi)}{1+k^2\tan^2\phi}
=\frac{k}{\cos^2\phi+k^2\sin^2\phi}.
$$

$t=\tan\phi>0$ とおくと、$\delta'=0$ の条件は

$$
\frac{1+k^2t^2}{1+t^2}=k
\quad\Longleftrightarrow\quad
1-k=k(1-k)t^2
\quad\Longleftrightarrow\quad t^2=\frac1k.
$$

$0<k<1$ なので $1-k$ で割ることができ、内部の停留点は $\tan\phi=1/\sqrt{k}$ の一点です。その点で $\tan\psi=\sqrt{k}$ となります。$\arctan(1/\sqrt{k})=\pi/2-\arctan\sqrt{k}$ より、差は $\pi/2-2\arctan\sqrt{k}$ です。両端で差は $0$、内部では $k<1$ と正接の単調増加性から $0<\psi<\phi$ なので、これが最大です。
<!-- solution-end -->

#### B4. 二つの入力緯度を逆向きに換算する

$e^2=1/4$ の扁平な回転楕円体表面上で (i) 測地緯度 $\phi=45^\circ$、(ii) 地心緯度 $\psi=45^\circ$ とした場合、もう一方の緯度をそれぞれ正接の形と逆正接で求めよ。二つの地点が同一かも判定せよ。

- Level: B
- ID: GEOD3-B4

<!-- solution-start -->
**詳細解答。** $k=1-e^2=3/4$ です。[緯度関係](#prop-geod3-latitude-relation)を二方向に使います。

$$
\begin{aligned}
\text{(i)}\quad &\tan\psi=k\tan45^\circ=\frac34,
&&\psi=\arctan\frac34<45^\circ,\\
\text{(ii)}\quad &\tan\phi=\frac{\tan45^\circ}{k}=\frac43,
&&\phi=\arctan\frac43>45^\circ.
\end{aligned}
$$

(i) の測地緯度は $45^\circ$、(ii) の測地緯度はそれより大きいので、経度を等しく選んでも同じ表面点ではありません。「45度」がどちらの定義かは省略できません。
<!-- solution-end -->

### Level C：GISデータを統合する前の緯度監査

#### C1. 同じ楕円体であっても緯度の種類が異なる

ある GIS データセット $A$ は GRS80 表面上の測地緯度 $\phi_A=45^\circ$、経度 $\lambda_A=0^\circ$ を持ち、別のデータセット $B$ は同じ中心・軸・GRS80 表面上の**地心緯度** $\psi_B=45^\circ$、経度 $\lambda_B=0^\circ$ を持つものとする。模型の定数として $a=6\,378\,137$ m、$1/f=298.257222101$ を与える。ここでは同一の楕円体と経度起点が指定されており、datum 間のずれや座標時点差は考えない。

1. $f,e^2,k=b^2/a^2$ を計算せよ。
2. $A$ の地心緯度、$B$ の測地緯度を式から求め、二点が同じか判定せよ。
3. $A$ の表面点の座標を $D=\sqrt{1-e^2\sin^2(45^\circ)}$ を使って表し、外向き法線の角が $45^\circ$ であることを代入で確かめよ。
4. 上の模型で二種類の緯度を換算できることから、別の現実の CRS・座標時点のデータを無条件に統合できるといえるか。必要な確認事項を列挙せよ。

- Level: C
- ID: GEOD3-C1

<!-- solution-start -->
**詳細解答**

1. 扁平率は $f=1/298.257222101\simeq0.003352810681$、$e^2=2f-f^2\simeq0.006694380023$、$k=1-e^2\simeq0.993305619977$ です。$a$ と $f$ から $b=a(1-f)\simeq6\,356\,752.314140$ m が従います。
2. $A$ は測地緯度を与えたので、[緯度関係](#prop-geod3-latitude-relation)から $\tan\psi_A=k\tan45^\circ=k$、すなわち $\psi_A=\arctan k\simeq44.80757678^\circ$ です。$B$ は地心緯度を与えたので、$\tan\phi_B=\tan45^\circ/k=1/k$、$\phi_B=\arctan(1/k)\simeq45.19242322^\circ$ です。測地緯度が異なるため、同じ経度でも表面上の同じ点ではありません。
3. [表面表示の命題](#prop-geod3-surface-parameterization)に $\phi=45^\circ,\lambda=0$ を代入し、$\cos45^\circ=\sin45^\circ=1/\sqrt2$ とすると

   $$
   (X_A,Y_A,Z_A)=\left(\frac a{\sqrt2D},0,\frac{ak}{\sqrt2D}\right),
   \quad D^2=1-\frac{e^2}{2}=\frac{1+k}{2}.
   $$

   面の左辺は $X_A^2/a^2+Z_A^2/b^2=(1+k)/(2D^2)=1$。法線は $(X_A/a^2,0,Z_A/b^2)=(1,0,1)/(a\sqrt2D)$ となり、水平・鉛直成分が等しく正なので測地緯度は $45^\circ$ です。対して地心方向の比は $Z_A/X_A=k$ です。
4. いいえ。ここでの換算は**同一楕円体の表面上**という仮定を使いました。実データでは少なくとも[CRS](../GEOD2/index.md#def-geod2-crs)の名称・軸順・角度単位、準拠楕円体の $a,b$、測地緯度か地心緯度か、経度起点、datum とその実現、座標時点、楕円体表面上か高さを含む地点かを確認します。異なる datum や時点の値には別の操作が必要な場合があります。表面外の点へ $\tan\psi=k\tan\phi$ を無条件には使えません。
<!-- solution-end -->

---

## 7. 次の章へ

楕円体の形を $a,b$ と無次元パラメータで指定し、方程式の勾配から法線を求めることで、測地緯度と地心緯度を厳密に区別できました。さらに法線の方向から表面点を復元し、緯線半径・極の退化・球面極限まで検証しました。

GEOD4 ではこの表面表示を緯度・経度で微分し、南北・東西の微小距離と曲率半径を導きます。GEOD5 では表面から法線方向へ離れた点、すなわち高さを含む測地座標へ進みます。
