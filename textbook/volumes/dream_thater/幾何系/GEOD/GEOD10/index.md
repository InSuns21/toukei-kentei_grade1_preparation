# GEOD10 重力測地学と高さ系の基礎計算

[GEOD6の鉛直線と正標高](../GEOD6/index.md#def-geod6-orthometric-height)では、重力が定める「上」を幾何学的な楕円体法線と区別しました。[GEOD9のGNSS測位](../GEOD9/index.md#def-geod9-pseudorange)で得る高さは楕円体高です。しかし、水が流れる方向や高低差を管理するには、重力ポテンシャルで定まる鉛直基準が必要です。

地上の二点が同じ高さの数値を持っていても、重力が異なれば同じポテンシャル面とは限りません。逆に同じポテンシャル面上の点でも、そこまでの距離として測った高さは異なり得ます。そこで、**先にポテンシャル差を求め、それを目的に合う高さへ変換する**順に学びます。

この章でできるようになることは次の6点です。

1. 実重力ポテンシャルと正常ポテンシャルを、勾配の向きと単位まで区別する。
2. 重力に沿う積分から基準面とのポテンシャル差を計算する。
3. 正標高・正常高・動的高を、分母に入る重力の意味から導く。
4. ジオイド高と高度異常（準ジオイド）を区別し、近似の精度を考える。
5. 重力観測付き水準測量とGNSS楕円体高を一つの高さ系へ接続する。
6. 誤差とモデル・基準面・座標時点の違いを混同せず検査する。

以下の数値は原理を追うための架空のSI単位の模型です。実務の標高成果には地域の鉛直基準、ジオイド／準ジオイドモデル、重力補正、座標時点が必要です。

<!-- definition-example-audit: strict -->

---

## 1. 重力が決める基準面と、楕円体が決める基準面

地上の一点 $P$ の位置を、[GEOD5の測地座標](../GEOD5/index.md#def-geod5-geodetic-coordinates)の緯度・経度・楕円体高 $h$ で表すことはできます。しかし、同じ点の「海面からの高さ」を知るには、重力で定まる基準面を別に選びます。

空間の点 $P=(x,y,z)$ で滑らかな実重力ポテンシャルを $W(P)$（単位 $\mathrm{m^2/s^2}$）とし、その勾配 $\nabla W$ を下向きの重力加速度ベクトルとする符号規約を使います。[GEOD6の物理的鉛直](../GEOD6/index.md#def-geod6-plumb-line)では、重力の大きさ $g=\|\nabla W\|>0$、上向き単位接線 $-\nabla W/g$ と定めました。遠心力を含む地球自転系の実重力を考えるので、重力と万有引力だけを同一視しません。

実際の地球の $W$ は地形・密度分布に左右され、全地点で直接わかるわけではありません。計算の比較相手として、参照楕円体と整合する滑らかな仮想ポテンシャル $U$ を用意します。$U$ の基準面が楕円体で、実際の $W$ の基準面がジオイドに対応します。

<a id="def-geod10-normal-potential"></a>
<!-- formal-statement-start -->
> **定義（正常ポテンシャルと正常重力）**  
> 同一の地球固定座標系で、参照楕円体 $E$ と滑らかな正常ポテンシャル $U$ を取り、$E$ 上で $U=U_0$、対象近傍で $\nabla U\ne0$ とする。さらに $E$ 上の外向き単位法線 $\boldsymbol n_E$ に対して $\nabla U(Q)\cdot\boldsymbol n_E(Q)<0$（$Q\in E$）とし、正常重力が楕円体の内向きであることを指定する。正常重力ベクトルを $\boldsymbol\gamma=\nabla U$、その大きさを $\gamma=\|\nabla U\|>0$ とする。実ポテンシャル $W$ と同じ点で評価した差

$$
T(P)=W(P)-U(P)
$$

> を**擾乱ポテンシャル**という。$T$ の比較には同じ座標系とポテンシャル定数規約を用いる。$g=\|\nabla W\|$ は実重力、$\gamma$ は正常重力であり、一般には等しくない。
<!-- formal-statement-end -->

<!-- definition-example-start: def-geod10-normal-potential -->
**定義の確認**。局所直交座標 $(x,y,z)$ で $z$ を上向きとし、楕円体を平面 $E=\{z=0\}$、その外向き単位法線を $\boldsymbol n_E=(0,0,1)$ で近似します。SI単位で

$$
U(x,y,z)=U_0-9.81z,\qquad W(x,y,z)=W_0-9.80z+2.0
$$

と置きます。$U$ は $E$ 上で一定です。両ポテンシャルは $x,y$ に依存しないため、例えば $\partial U/\partial x=\partial U/\partial y=0$、$\partial U/\partial z=-9.81$ です。したがって各座標の偏微分を並べた勾配は

$$
\nabla U=(0,0,-9.81),\qquad \nabla W=(0,0,-9.80)
$$

となります。どちらも非零で下向き、特に $\nabla U\cdot\boldsymbol n_E=-9.81<0$ です。大きさを取ると $\gamma=9.81$、$g=9.80\ \mathrm{m/s^2}$ となり、

$$
T(z)=(W_0-U_0)+2.0+0.01z
$$

です。$U_0=W_0$ を選んだ場合に限り、$T(0)=2.0\ \mathrm{m^2/s^2}$ と単純化できます。$g$ と $\gamma$ の差 $0.01\ \mathrm{m/s^2}$ はポテンシャル差 $T$ と単位が異なります。
<!-- definition-example-end -->

この後の高さ比較では **$U_0=W_0$** とそろえる模型を基本にします。基準値をそろえず、ある地点だけのポテンシャルを差し引いて「絶対標高」を作ることはできません。[GEOD6のジオイド](../GEOD6/index.md#def-geod6-geoid-undulation)は選んだ $W_0$ の等ポテンシャル面であり、正常ポテンシャル面 $E$ と同じとは限りません。

---

## 2. 重力の積分を共通の物差しにする

距離だけでは重力の強さを反映できません。そこで、ジオイド上の基準ポテンシャル $W_0$ と点 $P$ の差を先に測ります。正負の向きは、ジオイドから上へ進むと $W$ が減るため、上側の点で正になるように選びます。

<a id="def-geod10-geopotential-number"></a>
<!-- formal-statement-start -->
> **定義（ジオポテンシャル数）**  
> 実重力ポテンシャル $W$ が定義された領域で、採用した鉛直基準の定数を $W_0$ とする。点 $P$ のジオポテンシャル数を

$$
C(P)=W_0-W(P)
$$

> と定める。単位は $\mathrm{m^2/s^2}$ であり、長さではない。$C$ の数値には採用した $W_0$ と基準時点が必要である。
<!-- formal-statement-end -->

<!-- definition-example-start: def-geod10-geopotential-number -->
**定義の確認**。$W(z)=W_0-9.8z$ の一様重力模型で、基準面を $z=0$ とします。$z=5$ m の点は $W(5)=W_0-49$ なので、$C=+49\ \mathrm{m^2/s^2}$ です。$z=-2$ m では $C=-19.6\ \mathrm{m^2/s^2}$ です。基準面上なら $W=W_0$ で $C=0$ となり、符号・基準面の三条件を確かめました。
<!-- definition-example-end -->

<a id="prop-geod10-potential-integral"></a>
<!-- formal-statement-start -->
> **命題（鉛直方向のジオポテンシャル数の積分）**  
> $W$ は $C^1$ 級、対象の鉛直線上で $g=\|\nabla W\|>0$ とし、基準面上の点 $Q$（$W(Q)=W_0$）から点 $P$ までを上向き符号付き弧長 $s$ で $\boldsymbol c(s)$、$\boldsymbol c(0)=Q$、$\boldsymbol c(H^O)=P$ と表す。接線を $\boldsymbol c'(s)=-\nabla W(\boldsymbol c(s))/g(s)$ とすると、

$$
C(P)=\int_0^{H^O}g(s)\,ds.
$$

> さらに、同じ連結領域内で滑らかな経路 $\boldsymbol r:[a,b]\to\mathbb R^3$ が $A$ から $B$ を結ぶなら、

$$
C(B)-C(A)=-\int_a^b\nabla W(\boldsymbol r(t))\cdot\boldsymbol r'(t)\,dt
=W(A)-W(B).
$$

> この積分は保守的な重力ポテンシャル模型で経路によらない。
<!-- formal-statement-end -->

**証明の見取り図。** 鉛直線の接線は重力と反対向きです。$W$ の連鎖律による微分は $-g$ になるため、端点差は加速度と距離の積分で表せます。一般経路でも勾配の線積分は端点だけで決まります。

<!-- proof-start -->
### 証明

$W\circ\boldsymbol c$ に連鎖律を適用し、鉛直線上の $\nabla W\ne0$ を使うと

$$
\frac{d}{ds}W(\boldsymbol c(s))
=\nabla W(\boldsymbol c(s))\cdot\boldsymbol c'(s)
=-\frac{\|\nabla W(\boldsymbol c(s))\|^2}{g(s)}=-g(s).
$$

$0$ から符号付き終端 $H^O$ まで積分して

$$
W(P)-W(Q)=-\int_0^{H^O}g(s)\,ds.
$$

$W(Q)=W_0$ を代入し、両辺へ負号を掛ければ第1式です。一般経路についても

$$
\frac{d}{dt}W(\boldsymbol r(t))
=\nabla W(\boldsymbol r(t))\cdot\boldsymbol r'(t)
$$

を $a$ から $b$ へ積分すると $W(B)-W(A)$ を得ます。経路が変わっても端点の $W$ は同じなので第2式は不変です。この鉛直線の結果は[GEOD6のポテンシャル差の式](../GEOD6/index.md#prop-geod6-potential-height)をジオポテンシャル数として再解釈したものです。
<!-- proof-end -->

**変化する重力の例。** 鉛直線上の $0\le s\le100$ mで、$g(s)=9.8-0.001s\ \mathrm{m/s^2}$ とします。終端でも $g(100)=9.7>0$ なので命題が使えます。

$$
C=\int_0^{100}(9.8-0.001s)\,ds
=\left[9.8s-\frac{0.001}{2}s^2\right]_0^{100}
=980-5=975\ \mathrm{m^2/s^2}.
$$

先頭の値だけで $9.8\times100=980$ と計算すると、5 $\mathrm{m^2/s^2}$ の差を見落とします。**重力を測る意味は、単なる高さの換算係数を固定しないこと**にあります。

---

## 3. ポテンシャル差から三種類の高さを作る

同じ $C$ を長さとして表すには、単位が加速度の量で割ります。しかし、何の加速度で割るかによって結果の意味が異なります。

まずジオイドから地表点までの[正標高](../GEOD6/index.md#def-geod6-orthometric-height) $H^O$ は実際の鉛直線に沿う符号付き長さです。$H^O\ne0$ なら、その経路上の実重力の平均を $\bar g=C/H^O$ と書けます。地中の重力場を必要とするので、地表の1回の重力測定だけから $\bar g$ を正確に得たことにはなりません。

一方、正常高では実重力でなく正常ポテンシャル $U$ を使います。楕円体上の点 $Q_0$ の外向き単位法線を $\boldsymbol n$ とし、固定したその法線上の点 $Q_0+u\boldsymbol n$ を考えます。この線上では

$$
\gamma_\perp(u)=-\frac{d}{du}U(Q_0+u\boldsymbol n)
=-\nabla U(Q_0+u\boldsymbol n)\cdot\boldsymbol n
$$

を**正常重力の法線方向成分**とします。なぜ法線成分が定義の条件を表すのでしょうか。$E$ 上の点 $Q_0$ を通る任意の滑らかな表面曲線 $\boldsymbol q(t)$ を $\boldsymbol q(0)=Q_0$ として取ります。$U(\boldsymbol q(t))=U_0$ は一定なので、[GEOD6の等ポテンシャル面と鉛直の直交命題](../GEOD6/index.md#prop-geod6-level-normal)によって

$$
0=\left.\frac{d}{dt}U(\boldsymbol q(t))\right|_{t=0}
=\nabla U(Q_0)\cdot\boldsymbol q'(0)
$$

となります。楕円体上の曲線の速度は表面の二つの独立な方向を張るので、$\nabla U(Q_0)$ は表面に垂直です。[正常重力の内向き条件](#def-geod10-normal-potential)から

$$
\nabla U(Q_0)=-\|\nabla U(Q_0)\|\boldsymbol n,\qquad
\gamma_\perp(0)=-\nabla U(Q_0)\cdot\boldsymbol n
=\|\nabla U(Q_0)\|
$$

となります。しかし楕円体から離れた点で、勾配の大きさ $\|\nabla U\|$ と固定法線方向の成分 $\gamma_\perp$ を無条件に同一視しません。以下の厳密な一次元換算では $\gamma_\perp(u)>0$ を仮定し、区間平均を $\bar\gamma$ と略記します。

[GEOD5の楕円体高の定義](../GEOD5/index.md#def-geod5-geodetic-coordinates)に従い、地表点 $P$ を表す楕円体上の足元 $Q_0$ と外向き法線 $\boldsymbol n$ を固定します。今は正常ポテンシャルの基準を次のようにそろえます。

$$
P=Q_0+h\boldsymbol n,\qquad U(Q_0)=U_0=W_0.
$$

地表点のジオポテンシャル数 $C(P)$ に対応する点 $Q_t$ は、**同じ法線上**で

$$
U(Q_t)=U_0-C(P)
$$

を満たす点です。これを**テルロイド上の対応点**と見ます。$\gamma_\perp>0$ なら法線方向に $U$ が厳密に減少するため、対応点が存在する範囲では一意です。

<a id="def-geod10-height-systems"></a>
<!-- formal-statement-start -->
> **定義（正標高・正常高・動的高の計算モデル）**  
> 基準ポテンシャルは $W_0=U_0$ にそろえる。参照楕円体 $E$ 上の点 $Q_0$ と外向き単位法線 $\boldsymbol n$ による地表点 $P$ の表示、および対象区間での正値条件を

$$
P=Q_0+h\boldsymbol n,\qquad
g=\|\nabla W\|>0,\qquad \gamma_\perp>0
$$

> とする。$P$ を通る実鉛直線は指定したジオイド $W=W_0$ と一意に交わり、$g$ と $\gamma_\perp$ はこの実鉛直線と楕円体法線の各対象区間で連続とする。$P$ のジオポテンシャル数を $C$ とし、同じ楕円体法線上に対応点 $Q_t$ が存在して

$$
U(Q_t)=U_0-C
$$

> を満たすとする。
>
> - 正標高 $H^O$ は、ジオイドから $P$ までの実鉛直線の符号付き長さとする。
> - 正常高 $H^N$ は、正常ポテンシャルが $U_0-C$ になる対応点 $Q_t$ までの楕円体法線の符号付き長さとする。
> - 動的高 $H^D$ は、あらかじめ全地点で共通に固定した参照正常重力 $\gamma_0>0$ に対して $C/\gamma_0$ とする。
>
> 非零の高さに対し、実鉛直線の平均重力を $\bar g$、楕円体法線の法線方向成分 $\gamma_\perp$ の平均を $\bar\gamma$ と書く。高さ0の場合にはそれぞれ始点での値を平均の連続的な拡張として使う。
<!-- formal-statement-end -->

<!-- definition-example-start: def-geod10-height-systems -->
**定義の確認**。すべての基準面が $z=0$ に一致する局所平行模型で、実ポテンシャル $W=W_0-9.8z$、正常ポテンシャル $U=U_0-9.81z$、共通基準重力 $\gamma_0=9.80665\ \mathrm{m/s^2}$ とします。点 $P$ の実高さを $z=100$ mとすると $C=980$、$\bar g=9.8$、$H^O=100$ mです。法線上の座標を $z_t$ とすれば、正常高の対応点は定義により

$$
U_0-9.81z_t=U_0-980,\qquad
z_t=\frac{980}{9.81}\simeq99.8981\ \mathrm m
$$

を満たし、$\gamma_\perp=9.81>0$ のため一意です。したがって $H^N=z_t$ は $H^O=100$ mとは異なります。動的高も $H^D=980/9.80665\simeq99.9322$ mとなり、三つとも長さの単位です。
<!-- definition-example-end -->

<a id="thm-geod10-height-formulas"></a>
<!-- formal-statement-start -->
> **定理（正標高・正常高・動的高の換算式）**  
> [三種類の高さの定義](#def-geod10-height-systems)の条件が成り立ち、上向き弧長 $s$ と楕円体法線上の上向き長さ $u$ に対して $dW/ds=-g(s)$、$dU/du=-\gamma_\perp(u)$ とする。$\bar g$ と $\bar\gamma$ を各長さ区間の向き付き平均とすれば、

$$
C=\bar g H^O=\bar\gamma H^N=\gamma_0 H^D,
$$

> したがって、正の平均重力を用いて

$$
H^O=\frac{C}{\bar g},\qquad
H^N=\frac{C}{\bar\gamma},\qquad
H^D=\frac{C}{\gamma_0}.
$$

> 特に $\gamma_0$ を全地点で共通にする限り、$H^D$ が等しい二点は $C$ が等しく、同一ポテンシャル面に属する。
<!-- formal-statement-end -->

**証明の見取り図。** $C$ を実重力で積分すれば正標高へ、正常重力で積分すれば正常高へ換算できます。動的高だけは参照定数で割るので、重力が変わっても等ポテンシャル性を保ちます。

<!-- proof-start -->
### 証明

実鉛直線上の積分は[ジオポテンシャル数の積分](#prop-geod10-potential-integral)により

$$
C=\int_0^{H^O}g(s)\,ds,\qquad
\bar g=\frac1{H^O}\int_0^{H^O}g(s)\,ds\quad(H^O\ne0).
$$

正常ポテンシャルについて $U(Q_0)=U_0$、$U(Q_t)=U_0-C$ とし、$Q_0$ から $Q_t$ までの法線を $u\in[0,H^N]$ で取ると、連鎖律から

$$
-C=U(Q_t)-U(Q_0)
=\int_0^{H^N}\frac{dU}{du}\,du
=-\int_0^{H^N}\gamma_\perp(u)\,du.
$$

従って $C=\int_0^{H^N}\gamma_\perp(u)\,du=\bar\gamma H^N$。$g,\gamma_\perp>0$ により平均はいずれも正で、除算できます（符号付き長さが負でも積分と長さは同符号）。高さ0では $C=0$ です。動的高については定義から $C=\gamma_0H^D$。最後に $H^D(A)=H^D(B)$ なら正の共通 $\gamma_0$ を掛けて $C(A)=C(B)$、定義から $W(A)=W(B)$ です。
<!-- proof-end -->

例えば $C=980\ \mathrm{m^2/s^2}$、$\bar g=9.80$、$\bar\gamma=9.81$、$\gamma_0=9.80665$（加速度の単位はすべて $\mathrm{m/s^2}$）なら

$$
H^O=100.0000\ \mathrm m,\quad
H^N\simeq99.8981\ \mathrm m,\quad
H^D\simeq99.9322\ \mathrm m.
$$

同じポテンシャル差でも、三つの長さは一致しません。水の流れに対応する等ポテンシャル面の番号付けには動的高が自然ですが、地形面までの幾何学的な距離そのものではありません。正常高は参照正常重力の模型に依存し、正標高は観測できない地中の平均実重力に依存します。

---

## 4. ジオイド高と高度異常は同じではない

GNSSからの楕円体高 $h$ と、[ジオイド高](../GEOD6/index.md#def-geod6-geoid-undulation) $N_g$ を使う有名な式は $h\simeq H^O+N_g$ です。しかし、高さの成果が正常高 $H^N$ なら、減ずるべき量は通常のジオイド高でなく**高度異常**です。

<a id="def-geod10-height-anomaly"></a>
<!-- formal-statement-start -->
> **定義（高度異常と準ジオイド）**  
> 同じ楕円体・座標時点・基準ポテンシャル $W_0=U_0$ に対し、地表点 $P$ の楕円体法線上で楕円体からの長さを $h$、[正常高](#def-geod10-height-systems)を $H^N$ とする。テルロイド対応点 $Q_t$ から $P$ への法線方向の符号付き差

$$
\zeta(P)=h(P)-H^N(P)
$$

> を**高度異常**とする。各場所で $\zeta$ を楕円体上に表した高さの基準面を準ジオイドという。これに対しジオイド高 $N_g$ は実ポテンシャル面 $W=W_0$ の楕円体からの離れを表す。両者は一般に異なる。
<!-- formal-statement-end -->

<!-- definition-example-start: def-geod10-height-anomaly -->
**定義の確認**。同じ基準の地上点で $h=150$ m、$H^N=100$ mとすれば、楕円体からテルロイド対応点までの長さは100 m、そこから地上点までは50 mです。

$$
\zeta=h-H^N=150-100=+50\ \mathrm m.
$$

$h=H^N+\zeta$ へ戻して $150=100+50$ mを検算できます。この例からジオイド高 $N_g=50$ mとは結論できません。$N_g$ を得るには実重力による正標高か重力場の情報がさらに必要です。
<!-- definition-example-end -->

平行な局所模型では、[GEOD6の高さ換算](../GEOD6/index.md#prop-geod6-height-relation)を正標高へ適用して $h\simeq H^O+N_g$ と書けます。一方、高度異常は上の構成上 $h=H^N+\zeta$ です。同じ地点で二式を照合すると

$$
N_g-\zeta\simeq H^N-H^O
=C\left(\frac1{\bar\gamma}-\frac1{\bar g}\right).
$$

ここで最後の等号は[三種類の高さの換算定理](#thm-geod10-height-formulas)を代入したものです。局所換算の近似を厳密な一般恒等式へ格上げしてはいけません。高さを区別せず $N_g$ を $\zeta$ に置き換えると、その差が系統誤差になります。

### 4.1 擾乱ポテンシャルからジオイド高を一次近似する

ジオイド高を重力場から見積もる最も単純な手掛かりは、基準楕円体上の実ポテンシャルと正常ポテンシャルの差です。楕円体法線の上向き方向を $\boldsymbol n$、その上の点を $Q$ とし、ジオイドとの交点を $Q+N_g\boldsymbol n$ で近似します。

<a id="prop-geod10-bruns"></a>
<!-- formal-statement-start -->
> **命題（Brunsの一次近似）**  
> 楕円体上の点 $Q$ で $U(Q)=U_0=W_0$、$\gamma(Q)>0$ とする。$W=U+T$ は近傍で微分可能とし、実ジオイド $W=W_0$ が $Q$ の法線上の小さい距離 $N_g$ に交わるとする。$T$ の法線方向変化と二次以上の変化を、$T(Q)$ および $\gamma(Q)N_g$ に比べ小さいとして無視する一次近似では

$$
N_g\simeq \frac{T(Q)}{\gamma(Q)}.
$$

> これはジオイド高の局所一次近似であり、地球重力場の全球復元式でも、正常高の高度異常を無条件に求める式でもない。
<!-- formal-statement-end -->

**証明の見取り図。** 楕円体から上へ行くと正常ポテンシャルは減ります。楕円体上で $T>0$ なら、その余分なポテンシャルを正常ポテンシャルの減少で打ち消すため、ジオイド交点は上側へ移ります。

<!-- proof-start -->
### 証明

$Q$ の楕円体法線に沿う関数を $F(t)=W(Q+t\boldsymbol n)$ とします。$t$ は上向き符号付き距離です。関数 $V=U,T$ に対し、$\partial_nV(Q)$ は他の方向を固定して法線方向へ進む方向微分を表すものとし、連鎖律から

$$
\partial_nV(Q):=\nabla V(Q)\cdot\boldsymbol n,\qquad
F'(0)=\nabla W(Q)\cdot\boldsymbol n
$$

となります。次の $o(|N_g|)$ は $N_g\to0$ で $|N_g|$ で割ると0になる剰余を表します。微分可能性から

$$
\begin{aligned}
F(N_g)
&=U(Q)+T(Q)
  +N_g\{\nabla U(Q)\cdot\boldsymbol n+\nabla T(Q)\cdot\boldsymbol n\}
  +o(|N_g|)\\
&=W_0+T(Q)-\gamma(Q)N_g
  +N_g\partial_nT(Q)+o(|N_g|).
\end{aligned}
$$

$\nabla U\cdot\boldsymbol n=-\gamma$ は正常重力の向きから従います。ジオイド交点で $F(N_g)=W_0$ と置くと

$$
0=T(Q)-\gamma(Q)N_g
  +N_g\partial_nT(Q)+o(|N_g|).
$$

仮定した一次近似で後ろの二項を無視し、$\gamma(Q)>0$ で割れば $N_g\simeq T(Q)/\gamma(Q)$ です。$T$ の変化が無視できないほど大きい場合や楕円体法線との交点が局所的に取れない場合は、この導出を適用できません。
<!-- proof-end -->

**符号の例。** $T(Q)=-19.6\ \mathrm{m^2/s^2}$、$\gamma(Q)=9.8\ \mathrm{m/s^2}$ で一次近似が妥当なら $N_g\simeq-2.0$ mです。ジオイドは楕円体より内側にあり、符号は[GEOD6のジオイド高の定義](../GEOD6/index.md#def-geod6-geoid-undulation)に一致します。

---

## 5. 水準測量・重力測定・GNSSをつなぐ

[GEOD7の水準測量](../GEOD7/index.md#def-geod7-leveling-sights)は局所の上向き高低差を観測します。複数区間を結ぶとき、各区間の重力が異なるなら、単なる高さの和とポテンシャル差の和を区別します。

<a id="prop-geod10-gravity-leveling"></a>
<!-- formal-statement-start -->
> **命題（重力を付した水準差とポテンシャル差）**  
> 重力ポテンシャル $W$ が $C^1$ 級で、経路上で $g=\|\nabla W\|>0$ とする。点列 $P_0=A,\ldots,P_n=B$ を結ぶ区分的 $C^1$ 級経路 $\boldsymbol r(t)$ に沿い、上向き単位ベクトルとその方向の符号付き微小変位を

$$
\boldsymbol e_u(\boldsymbol r(t))=-\frac{\nabla W(\boldsymbol r(t))}{g(\boldsymbol r(t))},
\qquad dn=\boldsymbol e_u(\boldsymbol r(t))\cdot\boldsymbol r'(t)\,dt
$$

> と定める。各短区間で $dn$ は符号を変えないとする。区間の符号付き変位と厳密な重力加重平均を

$$
\Delta n_i=\int_i dn,\qquad
g_i^\ast=\frac{\int_i g\,dn}{\Delta n_i}>0\quad(\Delta n_i\ne0)
$$

> と定める。$\Delta n_i=0$ の区間では符号一定の仮定から $\int_i g\,dn=0$ なので、積を0とするため $g_i^\ast=g(P_{i-1})>0$ と定めてよい。このとき

$$
C(B)-C(A)=\sum_{i=1}^n g_i^\ast\Delta n_i.
$$

> 実測で区間代表値 $g_i$ と水準差 $\Delta n_i$ を使うと右辺は近似値であり、観測誤差・重力の空間変化・水準補正を評価する必要がある。仮定の下で $\Delta n_i=0$ の区間は $dn=0$ なので積分項も0とする。
<!-- formal-statement-end -->

**証明の見取り図。** ポテンシャル差は経路で足し合わされるので、各区間の鉛直変位に重力を掛けた量を合計すればよい、という考えです。勾配の保存性を用いるので経路を変えても同じ $C(B)-C(A)$ に戻ります。

<!-- proof-start -->
### 証明

任意の短区間の経路を $\boldsymbol r_i(t)$ とし、上向きの重力単位ベクトルを $\boldsymbol e_u=-\nabla W/g$ とします。接線の鉛直成分による微小変位を $dn=\boldsymbol e_u\cdot d\boldsymbol r$ と定義すると

$$
-dW=-\nabla W\cdot d\boldsymbol r
=g\boldsymbol e_u\cdot d\boldsymbol r=g\,dn.
$$

区間ごとに積分して $W(P_{i-1})-W(P_i)=\int_i g\,dn$ です。$\Delta n_i=\int_i dn\ne0$ の場合は $g_i^\ast=(\int_i g\,dn)/\Delta n_i$ と置き、区間を足すと

$$
\sum_i g_i^\ast\Delta n_i
=\sum_i\{W(P_{i-1})-W(P_i)\}
=W(A)-W(B)=C(B)-C(A).
$$

各区間で $dn$ の符号が一定という仮定により、$\Delta n_i\ne0$ では $g_i^\ast$ は正で、区間内の重力の最小・最大の間にあります。上下動を含む経路では区間を単調な部分へ分割してから適用します。$\Delta n_i=0$ の区間では仮定から $dn=0$ が従い、積分も0です。
<!-- proof-end -->

**小水準路線の計算。** 理想化した二つの上向き区間で $\Delta n_1=0.4$ m、$\Delta n_2=0.3$ m、対応する区間平均重力を $g_1^\ast=9.8$、$g_2^\ast=9.7\ \mathrm{m/s^2}$ とします。

$$
C(B)-C(A)=9.8(0.4)+9.7(0.3)
=3.92+2.91=6.83\ \mathrm{m^2/s^2}.
$$

ただし $0.4+0.3=0.7$ m を一律に9.8倍した値は6.86で、異なる重力場の加重を落としています。実測では重力異常や水準測量の系統誤差を併せて扱います。

<a id="prop-geod10-gnss-height"></a>
<!-- formal-statement-start -->
> **命題（GNSS高と高さ系の結合・共分散）**  
> 同一の楕円体・測地基準・座標時点で楕円体高 $h$ と高度異常 $\zeta$ が与えられ、[正常高と高度異常の定義](#def-geod10-height-anomaly)が成り立つなら、

$$
H^N=h-\zeta.
$$

> また、同じ局所平行模型で正標高 $H^O\simeq h-N_g$ を用い、推定誤差 $(\delta h,\delta N_g)$ が平均0で有限の二次モーメントを持つ場合、その線形換算誤差の分散は

$$
\operatorname{Var}(\delta H^O)
=\operatorname{Var}(\delta h)+\operatorname{Var}(\delta N_g)
-2\operatorname{Cov}(\delta h,\delta N_g).
$$

> ここに鉛直線と楕円体法線の不一致、鉛直基準の版違い等の模型偏りは含まれない。
<!-- formal-statement-end -->

**証明の見取り図。** 高さは二つの量の差です。差の分散には二乗の交差項があるため、誤差の相関を無視してよいとは限りません。

<!-- proof-start -->
### 証明

第1式は高度異常の[定義](#def-geod10-height-anomaly)を移項したものです。第2式で換算模型の誤差を $\delta H^O=\delta h-\delta N_g$ と置くと、平均0の仮定のもとで

$$
\begin{aligned}
\operatorname{Var}(\delta H^O)
&=E[(\delta h-\delta N_g)^2]\\
&=E[(\delta h)^2]+E[(\delta N_g)^2]
  -2E[\delta h\,\delta N_g].
\end{aligned}
$$

各期待値を分散と共分散へ戻せば結論です。平均0を仮定しない場合も、中心化した二変量の差について同じ分散恒等式が成り立ちます。
<!-- proof-end -->

GNSSからの $h=123.40$ m と、同じ基準・時点の準ジオイドモデルからの $\zeta=34.20$ m なら、$H^N=89.20$ mです。代わりにジオイド高 $N_g=34.20$ mを使った正標高換算と**同じ種類の高さだとは言えません**。観測の[調整計算と共分散](../GEOD8/index.md#prop-geod8-adjustment-covariance)を使う場合も、入力の単位、相関、モデルの系統偏りを別に管理します。

---

## 6. 実際の標高成果へ使うときの境界

重力の空間分布は地球内部の密度、海洋、地形、潮汐、地球自転にも左右されます。水準測量で得た上向き差をジオポテンシャル数へ直すには重力値と補正模型が必要で、正標高の地中平均重力は直接一括観測できません。一方、正常高なら正常重力の模型によって平均値を計算できますが、実際の鉛直線の距離そのものではありません。

重力異常の全球分布からジオイドを精密に復元するには、重力場の境界データに関する理論、Stokes積分、球面調和解析などの追加理論が必要です。ここでは、そうした重力場モデルを利用するときに何を入力・出力としているかを理解できれば十分です。

例えば日本の公的な標高成果を使うときは、[GEOD6で説明した標高成果の改定](../GEOD6/index.md#prop-geod6-height-relation)と同様に、採用年度、鉛直基準、モデルの版、必要な補正値を確認します。座標の時点やモデルの版が異なる値を単純に引いても、地殻の鉛直変動だけを検出したことにはなりません。実務の最新条件は[国土地理院「全国の標高成果の改定」](https://www.gsi.go.jp/sokuchikijun/hyoko2024rev.html)などの一次資料を参照してください。

---

## 7. 演習：同じポテンシャル差を異なる高さへ換算する

### Level A：符号・基準・単位

#### A1. 重力の向きとポテンシャル差

上向き $z$ m、SI単位で $W(z)=W_0-9.8z$ とする。$z=5$ m の実重力ベクトル、重力の大きさ、ジオポテンシャル数を求めよ。

- Level: A
- ID: GEOD10-A1

<!-- solution-start -->
**詳細解答。** $W$ を $z$ で微分すると

$$
\nabla W=(0,0,-9.8)\ \mathrm{m/s^2},
\qquad g=\sqrt{(-9.8)^2}=9.8\ \mathrm{m/s^2}.
$$

ベクトルは下向きです。[ジオポテンシャル数の定義](#def-geod10-geopotential-number)から $W(5)=W_0-49$ を代入して

$$
C(5)=W_0-(W_0-49)=49\ \mathrm{m^2/s^2}.
$$

5 m は長さ、49 $\mathrm{m^2/s^2}$ はポテンシャル差なので混同しません。
<!-- solution-end -->

#### A2. 三種類の高さ

同じ鉛直基準で $C=980\ \mathrm{m^2/s^2}$、平均実重力 $\bar g=9.80$、平均正常重力 $\bar\gamma=9.81$、共通参照正常重力 $\gamma_0=9.80665$（加速度の単位はすべて $\mathrm{m/s^2}$）とする。正標高・正常高・動的高を小数第4位まで計算せよ。

- Level: A
- ID: GEOD10-A2

<!-- solution-start -->
**詳細解答。** 正の分母を確認してから[高さ換算定理](#thm-geod10-height-formulas)を使います。

$$
\begin{aligned}
H^O&=\frac{980}{9.80}=100.0000\ \mathrm m,\\
H^N&=\frac{980}{9.81}\simeq99.8981\ \mathrm m,\\
H^D&=\frac{980}{9.80665}\simeq99.9322\ \mathrm m.
\end{aligned}
$$

それぞれに使った加速度を掛け直せば $C=980\ \mathrm{m^2/s^2}$ に戻ります。同じ $C$ でも高さの種類を表記しなければ再現できません。
<!-- solution-end -->

#### A3. 高度異常

同じ楕円体と座標時点に対し、GNSS楕円体高 $h=152$ m、正常高 $H^N=101$ mを得た。高度異常 $\zeta$ を求めよ。この値からジオイド高 $N_g$ も確定できるか。

- Level: A
- ID: GEOD10-A3

<!-- solution-start -->
**詳細解答。** [高度異常の定義](#def-geod10-height-anomaly)により

$$
\zeta=h-H^N=152-101=51\ \mathrm m.
$$

$H^N+\zeta=101+51=152$ m で元の楕円体高を復元できます。ジオイド高は実ポテンシャル面の位置に依存します。正標高や重力模型の情報がないため $N_g=51$ mとは断言できません。
<!-- solution-end -->

#### A4. 擾乱ポテンシャルの符号

楕円体上の点 $Q$ で $U(Q)=W_0$、擾乱ポテンシャル $T(Q)=-19.6\ \mathrm{m^2/s^2}$、正常重力 $\gamma(Q)=9.8\ \mathrm{m/s^2}$ とする。一次近似に必要な小変化条件が成立すると仮定し、ジオイド高の近似値と向きを答えよ。

- Level: A
- ID: GEOD10-A4

<!-- solution-start -->
**詳細解答。** [Brunsの一次近似](#prop-geod10-bruns)は同じ点・同じポテンシャル基準の $T$ と $\gamma$ を使います。

$$
N_g\simeq\frac{T(Q)}{\gamma(Q)}
=\frac{-19.6}{9.8}=-2.0\ \mathrm m.
$$

正常重力は正で、$T$ が負なので $N_g$ も負です。ジオイドはこの局所模型で楕円体法線の内側にあります。これは一次近似であって、世界の全地点で厳密に2 m低いという意味ではありません。
<!-- solution-end -->

#### A5. 水準差に重力を掛ける

同じ高さ基準で、二つの短い上向き単調区間を $\Delta n_1=0.4$ m、$\Delta n_2=0.3$ m 進む。区間の厳密平均重力はそれぞれ $g_1^\ast=9.8$、$g_2^\ast=9.7\ \mathrm{m/s^2}$ とする。ポテンシャル差と高低差の単純和を求め、単位を比較せよ。

- Level: A
- ID: GEOD10-A5

<!-- solution-start -->
**詳細解答。** [重力付き水準差の命題](#prop-geod10-gravity-leveling)へ各区間の値を代入します。

$$
\Delta C=9.8(0.4)+9.7(0.3)
=3.92+2.91=6.83\ \mathrm{m^2/s^2}.
$$

一方、上向き変位の合計は $0.4+0.3=0.7$ mです。前者は重力で加重されたポテンシャル差、後者は幾何学的変位なので、数字だけ比較したり一方を他方の単位で記録したりしません。
<!-- solution-end -->

### Level B：導出・反例・不確かさ

#### B1. 高さとともに実重力が減る模型

ジオイドから地表までの上向き弧長を $H^O=100$ mとし、$0\le s\le100$ mで実重力が $g(s)=9.8-0.002s$（SI単位）に従う。ジオポテンシャル数と平均実重力を積分から求めよ。さらに $\bar\gamma=9.81$、$\gamma_0=9.80665\ \mathrm{m/s^2}$ の模型を与えたときの正常高・動的高を小数第3位まで求めよ。

- Level: B
- ID: GEOD10-B1

<!-- solution-start -->
**詳細解答。** $g(0)=9.8$、$g(100)=9.6$ で区間全体で正なので、[鉛直積分命題](#prop-geod10-potential-integral)の条件を満たします。

$$
\begin{aligned}
C&=\int_0^{100}(9.8-0.002s)\,ds\\
&=\left[9.8s-\frac{0.002}{2}s^2\right]_0^{100}\\
&=980-10=970\ \mathrm{m^2/s^2}.
\end{aligned}
$$

平均実重力は $\bar g=C/H^O=970/100=9.7\ \mathrm{m/s^2}$。与えられた平均正常重力を用いて[高さ換算定理](#thm-geod10-height-formulas)から

$$
H^N=\frac{970}{9.81}\simeq98.879\ \mathrm m,\qquad
H^D=\frac{970}{9.80665}\simeq98.912\ \mathrm m.
$$

固定値9.8を全区間に掛けると $C$ を10だけ過大評価します。正標高は与件の100 mのままですが、同じ $C$ を正常高や動的高へ換算した値は異なります。
<!-- solution-end -->

#### B2. 等ポテンシャル面上でも正標高は同じか

二地点 $A,B$ は同一基準の等ポテンシャル面上にあり $C(A)=C(B)=980\ \mathrm{m^2/s^2}$ である。各点への鉛直線平均重力を $\bar g_A=9.8$、$\bar g_B=9.7\ \mathrm{m/s^2}$ とする。正標高差を計算し、共通 $\gamma_0$ を用いた動的高差との違いを説明せよ。

- Level: B
- ID: GEOD10-B2

<!-- solution-start -->
**詳細解答。** [高さ換算定理](#thm-geod10-height-formulas)を各点に適用すると

$$
H^O_A=\frac{980}{9.8}=100\ \mathrm m,\qquad
H^O_B=\frac{980}{9.7}\simeq101.030928\ \mathrm m.
$$

したがって

$$
H^O_B-H^O_A\simeq1.030928\ \mathrm m.
$$

一方、動的高は両点とも $980/\gamma_0$ なので $H^D_B-H^D_A=0$。同じ等ポテンシャル面という仮定が固定するのは $C$ で、平均実重力ではありません。この差が、正標高を等ポテンシャル面の番号としてそのまま使えない理由です。
<!-- solution-end -->

#### B3. Bruns近似の導出と破綻条件

楕円体上の点 $Q$ で $U(Q)=W_0$、$\nabla U(Q)\cdot\boldsymbol n=-\gamma(Q)<0$ とし、$W=U+T$ が法線方向で微分可能である。ジオイド交点 $Q+N_g\boldsymbol n$ の条件 $W=W_0$ を一次展開し、$N_g\simeq T(Q)/\gamma(Q)$ を導け。また $\partial_nT$ が $\gamma$ と同程度の場合に、その近似が失う仮定を答えよ。

- Level: B
- ID: GEOD10-B3

<!-- solution-start -->
**詳細解答。** [Bruns近似の命題](#prop-geod10-bruns)と同じく $N_g$ を小さい符号付き法線距離とします。$U(Q)=W_0$ だから

$$
\begin{aligned}
W(Q+N_g\boldsymbol n)
&=U(Q)+T(Q)
  +N_g\partial_nU(Q)+N_g\partial_nT(Q)+o(|N_g|)\\
&=W_0+T(Q)-\gamma(Q)N_g
  +N_g\partial_nT(Q)+o(|N_g|).
\end{aligned}
$$

ジオイド上で左辺は $W_0$。差し引いて

$$
0=T(Q)-\gamma(Q)N_g+N_g\partial_nT(Q)+o(|N_g|).
$$

擾乱ポテンシャルの法線方向変化と高次項が小さいとき、$\gamma(Q)>0$ で割って $N_g\simeq T(Q)/\gamma(Q)$ です。もし $\partial_nT$ が $\gamma$ と同程度なら、落とした $N_g\partial_nT$ は保持した $\gamma N_g$ と同程度です。**一次近似で捨ててよいという仮定が壊れる**ため、法線方向の正しい重力変化を含めて交点を求め直す必要があります。
<!-- solution-end -->

#### B4. 相関のある高さ換算誤差

局所換算模型 $H^O=h-N_g$ を用いる。推定誤差 $\delta h$ と $\delta N_g$ の平均は0、標準偏差はそれぞれ0.04 m、0.06 m、共分散は $0.001\ \mathrm{m^2}$ とする。換算値の分散と標準偏差を計算せよ。独立と誤って扱った場合とも比べよ。

- Level: B
- ID: GEOD10-B4

<!-- solution-start -->
**詳細解答。** まず共分散 $0.001\ \mathrm{m^2}$ は標準偏差の積 $0.04\times0.06=0.0024\ \mathrm{m^2}$ より小さく、与件として整合しています。[GNSS高と高さ系の結合・共分散](#prop-geod10-gnss-height)から

$$
\begin{aligned}
\operatorname{Var}(\delta H^O)
&=0.04^2+0.06^2-2(0.001)\\
&=0.0016+0.0036-0.0020\\
&=0.0032\ \mathrm{m^2},
\qquad \sigma_H=\sqrt{0.0032}\simeq0.05657\ \mathrm m.
\end{aligned}
$$

独立と仮定して共分散を0に置けば、分散は $0.0052\ \mathrm{m^2}$、標準偏差は $\sqrt{0.0052}\simeq0.07211$ mです。今回の正の相関では差の変動が小さくなります。ただし共通モデルの偏りや基準面の不一致はこの分散だけでは表せません。
<!-- solution-end -->

### Level C：観測を結合した高さの計算

#### C1. 水準・重力・GNSSの統合

同じ鉛直基準・楕円体・座標時点にそろえた架空の観測を考える。既知点 $A$ のジオポテンシャル数は $C_A=490.00\ \mathrm{m^2/s^2}$。点 $A$ から点 $B$ まで、単調上向きの二つの短い水準区間について、上向き高低差は順に0.4 mと0.3 m、区間平均実重力は順に9.8、9.7 $\mathrm{m/s^2}$ とする。

点 $B$ について、地中を含む鉛直線平均実重力 $\bar g_B=9.75\ \mathrm{m/s^2}$、対応する平均正常重力 $\bar\gamma_B=9.81\ \mathrm{m/s^2}$、共通参照正常重力 $\gamma_0=9.80665\ \mathrm{m/s^2}$ が模型から与えられている。GNSS楕円体高は $h_B=86.000$ mである。

1. $C_B$ と $H^O_B,H^N_B,H^D_B$ を求めよ。
2. 高度異常 $\zeta_B$ を求め、局所平行模型に限ったジオイド高の近似値 $N_g(B)$ と比較せよ。
3. $A$ で $\bar g_A=9.8\ \mathrm{m/s^2}$ のとき、$B$ の正標高から $A$ の正標高を引いた値は水準差合計0.7 mかを確かめ、理由を述べよ。

- Level: C
- ID: GEOD10-C1

<!-- solution-start -->
**詳細解答。** （1）各短区間の重力付き水準差を[ポテンシャル差の命題](#prop-geod10-gravity-leveling)で加えます。

$$
\Delta C=9.8(0.4)+9.7(0.3)=3.92+2.91=6.83\ \mathrm{m^2/s^2},
$$

$$
C_B=C_A+\Delta C=490.00+6.83=496.83\ \mathrm{m^2/s^2}.
$$

三つの平均・基準重力はいずれも正なので、[換算定理](#thm-geod10-height-formulas)を直接適用できます。

$$
\begin{aligned}
H^O_B&=\frac{496.83}{9.75}\simeq50.9569\ \mathrm m,\\
H^N_B&=\frac{496.83}{9.81}\simeq50.6453\ \mathrm m,\\
H^D_B&=\frac{496.83}{9.80665}\simeq50.6626\ \mathrm m.
\end{aligned}
$$

（2）[高度異常の定義](#def-geod10-height-anomaly)では正常高を引きます。

$$
\zeta_B=h_B-H^N_B
=86.000-50.6453\simeq35.3547\ \mathrm m.
$$

正標高については、平行模型という追加仮定の下でのみ[GEOD6の換算](../GEOD6/index.md#prop-geod6-height-relation)を使えます。

$$
N_g(B)\simeq h_B-H^O_B
=86.000-50.9569\simeq35.0431\ \mathrm m.
$$

したがって $N_g(B)-\zeta_B\simeq-0.3116$ mです。この差は $H^N_B-H^O_B$ と一致し、二種類の高さを取り違えなかったことを検算できます。一般の曲がる鉛直線でジオイド高が厳密にこの値だとは主張しません。

（3）点 $A$ の正標高は

$$
H^O_A=\frac{490.00}{9.8}=50.0000\ \mathrm m.
$$

ゆえに

$$
H^O_B-H^O_A\simeq50.9569-50.0000=0.9569\ \mathrm m.
$$

これは0.7 mとは異なります。水準差の単純和が測る局所鉛直の変位と、**各点のジオイドからの平均重力で定義される正標高**は別です。高低差観測に重力を掛けた $C$ の差と、それを地点ごとに割り戻す正標高を分けて計算することで矛盾がなくなります。
<!-- solution-end -->

---

## 8. 次の測地計算への接続

本章で揃えたのは、どの面を基準に高さを測っているかという規則です。次のGEOD11では、楕円体上の距離（子午線弧長）を緯度から積分して求めます。そのとき地表距離・楕円体距離・投影上の距離を混ぜないよう、[GEOD6の距離還元](../GEOD6/index.md#prop-geod6-height-reduction)とここで扱った高さの基準が働きます。

