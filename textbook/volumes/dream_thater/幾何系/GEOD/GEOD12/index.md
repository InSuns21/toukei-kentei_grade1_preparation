# GEOD12 楕円体の測地線と順・逆問題

[GEOD11の子午線弧長](../GEOD11/index.md#def-geod11-meridian-arc)なら、緯度の差を積分すれば距離が出ました。しかし二点の経度も異なるとき、子午線に沿ってから緯線を進む経路は一般に最短ではありません。衛星測位で得た二点を、楕円体**表面上の**距離と方位で結ぶには、経路自体を求める必要があります。

この章では[GEOD4の第一基本形式](../GEOD4/index.md#thm-geod4-ellipsoid-metric)から、曲面上の「できるだけ直進する曲線」を微分方程式に落とし、始点と方向から終点を求める計算、二点から方向と距離を求める計算へ進みます。一般の[測地線の定義](../../GEO/GEO14/index.md#def-geo14-geodesic)は既習として、楕円体固有の係数をすべて導きます。

到達目標は、(1) 方位角と計量から測地線ODEを構成する、(2) Clairautの保存量から転向・極の制約を読む、(3) 順・逆問題を定式化して球面の厳密式と照合する、(4) 極・近接・ほぼ対蹠点で何が不安定になるか判断する、の四つです。

ここでの距離は**楕円体面上の曲線長**です。地形上の観測斜距離、楕円体高を含む距離、投影平面上の距離は[GEOD11の還元](../GEOD11/index.md#prop-geod11-distance-chain)を経なければ置き換えられません。以下、角度は計算式内ではラジアン、距離パラメータ $s$ は長さの単位で扱います。

<!-- definition-example-audit: strict -->

---

## 1. 「北から時計回り」の方向を接ベクトルにする

長半径 $a>0$、短半径 $0<b\le a$ の回転楕円体を固定し、第一離心率の二乗を $e^2=1-b^2/a^2$ とします。測地緯度 $\phi\in(-\pi/2,\pi/2)$、経度 $\lambda$ の非極点では、[GEOD4の曲率半径](../GEOD4/index.md#def-geod4-curvature-radii)

$$
M(\phi)=\frac{a(1-e^2)}{(1-e^2\sin^2\phi)^{3/2}},\qquad
N(\phi)=\frac{a}{\sqrt{1-e^2\sin^2\phi}}
$$

は正です。緯線の半径を $r(\phi)=N(\phi)\cos\phi>0$ と置くと、[楕円体の計量](../GEOD4/index.md#thm-geod4-ellipsoid-metric)は

$$
ds^2=M(\phi)^2d\phi^2+r(\phi)^2d\lambda^2.
$$

接平面の単位ベクトルは北向き $\boldsymbol e_{\mathrm N}$、東向き $\boldsymbol e_{\mathrm E}$ です。[GEOD4の接ベクトル表示](../GEOD4/index.md#prop-geod4-tangent-vectors)により、曲線 $\gamma(s)=(\phi(s),\lambda(s))$ の実際の速度ベクトルは

$$
\frac{d\boldsymbol X}{ds}
=M\dot\phi\,\boldsymbol e_{\mathrm N}
+r\dot\lambda\,\boldsymbol e_{\mathrm E}.
$$

ここで点は $s$ 微分を意味します。したがって方向を決めるには、緯度・経度の微分値そのものではなく、**長さに換算した北成分・東成分**を使います。方位角は北から東へ正に回る角とし、北0°・東90°・南180°・西270°です。

<a id="def-geod12-azimuth"></a>
<!-- formal-statement-start -->
> **定義（測地線の方位角）**  
> $0<b\le a$ の回転楕円体の非極点にある $C^1$ 級正則曲線を、長さ $s$ の増加方向へ単位速さでパラメータ化する。接方向が北・東の直交単位基底に対して

$$
\dot{\boldsymbol X}
=\cos\alpha\,\boldsymbol e_{\mathrm N}
+\sin\alpha\,\boldsymbol e_{\mathrm E}
$$

> と表されるとき、$\alpha$（$2\pi$ を法とする角）をその進行方向の**測地方位角**とする。従って

$$
M\dot\phi=\cos\alpha,\qquad
r\dot\lambda=\sin\alpha,\qquad
M^2\dot\phi^2+r^2\dot\lambda^2=1.
$$

> 極では経度と東・北基底のこの座標表示が退化するため、極を通過する方位角は別の局所座標系を指定して扱う。
<!-- formal-statement-end -->

<!-- definition-example-start: def-geod12-azimuth -->
**定義の直接確認。** 球面 $M=N=R$ の赤道 $\phi=0$ から北東へ向かう単位接ベクトル

$$
\boldsymbol v=\frac{\sqrt3}{2}\boldsymbol e_{\mathrm N}
+\frac12\boldsymbol e_{\mathrm E}
$$

を取ります。北東成分は直交し、長さは $\|\boldsymbol v\|^2=3/4+1/4=1$。角は $\alpha=\pi/6$ なので、式から $\dot\phi=\sqrt3/(2R)$、$\dot\lambda=1/(2R)$ です。これらを計量へ戻すと $R^2(3/(4R^2)+1/(4R^2))=1$。**経度微分と緯度微分の比から角を直接求めたのではなく、まず双方を距離の成分へ換算**したことを確かめました。
<!-- definition-example-end -->

---

## 2. 楕円体の測地線は二階のODEを満たす

自由な表面曲線は曲がったり止まったりできます。測地線には[一般の座標測地線方程式](../../GEO/GEO14/index.md#prop-geo14-geodesic-equation)があり、初期点と初期速度が局所的に解を決めます。この章では計量の係数からその方程式を自分で構成します。

計量の係数を行列に並べると、緯度方向の長さは $M(\phi)$ 倍、経度方向の長さは $r(\phi)$ 倍です。いずれも経度 $\lambda$ には依存しません。この回転対称性により、後で「東西方向の運動量」に相当する量が保存されます。まず、[Levi-Civita接続](../../GEO/GEO13/index.md#def-geo13-levi-civita)の座標係数をこの具体的な計量から求めましょう。

<a id="thm-geod12-equations"></a>
<!-- formal-statement-start -->
> **定理（楕円体測地線の座標方程式）**  
> $0<b\le a$ の回転楕円体で、$|\phi|<\pi/2$ とする。$M(\phi)>0$、$r(\phi)=N(\phi)\cos\phi>0$ のもと、弧長 $s$ で単位速さにした $C^2$ 級曲線が測地線であるための局所座標方程式は

$$
\ddot\phi+\frac{M'}{M}\dot\phi^2
-\frac{rr'}{M^2}\dot\lambda^2=0,
\qquad
\ddot\lambda+2\frac{r'}r\dot\phi\dot\lambda=0.
$$

> プライムは緯度 $\phi$ による微分を表す。これに初期値 $M^2\dot\phi^2+r^2\dot\lambda^2=1$ を課すと、解の速さは1のまま保存される。
<!-- formal-statement-end -->

**証明の見取り図。** 計量の対角成分だけを[Levi-Civita接続のChristoffel公式](../../GEO/GEO13/index.md#prop-geo13-levi-civita-christoffel)へ入れます。緯度方向は $M'$ と $r'$ の項を持ち、経度方向には $\lambda$ 自身に依存する係数がないため保存則が現れます。[一般の測地線方程式](../../GEO/GEO14/index.md#prop-geo14-geodesic-equation)を具体化する計算です。

<!-- proof-start -->
### 証明

座標を $x^1=\phi,x^2=\lambda$ とし、計量成分と逆行列成分を

$$
g_{11}=M^2,\quad g_{22}=r^2,\quad g_{12}=0,\qquad
g^{11}=M^{-2},\quad g^{22}=r^{-2}
$$

と置きます。$M,r>0$ なので逆成分が定まります。非零の計量微分は $\partial_1g_{11}=2MM'$、$\partial_1g_{22}=2rr'$ だけです。[Christoffel公式](../../GEO/GEO13/index.md#prop-geo13-levi-civita-christoffel)

$$
\Gamma^k_{ij}=\frac12g^{k\ell}
\left(\partial_i g_{j\ell}+\partial_j g_{i\ell}-\partial_\ell g_{ij}\right)
$$

へ、例えば $k=1,i=j=2$ を代入すると、$\ell=1$ だけが残り

$$
\Gamma^1_{22}
=-\frac12g^{11}\partial_1g_{22}
=-\frac{rr'}{M^2}.
$$

同じように添字を入れると

$$
\Gamma^1_{11}=\frac{M'}M,\qquad
\Gamma^2_{12}=\Gamma^2_{21}=\frac{r'}r
$$

で、その他の成分は0です。[GEO14の測地線座標式](../../GEO/GEO14/index.md#prop-geo14-geodesic-equation)へこれを代入すると

$$
\ddot\phi+\Gamma^1_{11}\dot\phi^2+\Gamma^1_{22}\dot\lambda^2
=\ddot\phi+\frac{M'}M\dot\phi^2-\frac{rr'}{M^2}\dot\lambda^2=0,
$$

また

$$
\ddot\lambda+\Gamma^2_{12}\dot\phi\dot\lambda
+\Gamma^2_{21}\dot\lambda\dot\phi
=\ddot\lambda+2\frac{r'}r\dot\phi\dot\lambda=0
$$

を得ます。一般の座標式は測地線との必要十分条件です。速度の二乗 $V^2=M^2\dot\phi^2+r^2\dot\lambda^2$ を微分し、

$$
\frac{dV^2}{ds}
=2M^2\dot\phi\!\left(\ddot\phi+\frac{M'}M\dot\phi^2-\frac{rr'}{M^2}\dot\lambda^2\right)
+2r^2\dot\lambda\!\left(\ddot\lambda+2\frac{r'}r\dot\phi\dot\lambda\right)=0
$$

を得ます（$M',r'$ の項を展開して再整理した式です）。初期値が1なら常に $V^2=1$ です。
<!-- proof-end -->

同じ計算を[GEOD4の実際の曲面計量](../GEOD4/index.md#thm-geod4-ellipsoid-metric)へ適用したため、平面の直線方程式 $\ddot\phi=\ddot\lambda=0$ をこの座標に持ち込むことはできません。

---

## 3. 回転対称性から Clairaut 関係が出る

東西に回転しても楕円体の形は同じです。第2節の経度方向の式を積分すると、経度そのものでなく、緯線半径と向きの積が保存されます。方向を角度で読むと、測地線がどこまで北へ近づけるかまで分かります。

まず $r=N\cos\phi$ を微分します。$q=e^2$ と略記すれば

$$
N'=\frac{aq\sin\phi\cos\phi}{(1-q\sin^2\phi)^{3/2}},
$$

$$
\begin{aligned}
r'&=N'\cos\phi-N\sin\phi\\
&=\frac{a\sin\phi}{(1-q\sin^2\phi)^{3/2}}
\left(q\cos^2\phi-(1-q\sin^2\phi)\right)\\
&=-\frac{a(1-q)\sin\phi}{(1-q\sin^2\phi)^{3/2}}
=-M\sin\phi.
\end{aligned}
$$

つまり赤道から離れるほど緯線半径 $r$ は減少します。これは単なる球面の公式ではなく、楕円体の $M,N$ から導いた恒等式です。

<a id="thm-geod12-clairaut"></a>
<!-- formal-statement-start -->
> **定理（Clairaut関係と方位角の微分方程式）**  
> $0<b\le a$ の回転楕円体の非極点領域に、弧長 $s$ で単位速さの測地線 $\gamma(s)$ と、その連続な方位角の枝 $\alpha(s)$ を取る。この区間には定数 $C$ があり

$$
C=r(\phi)^2\dot\lambda
=r(\phi)\sin\alpha
$$

> が保たれる（Clairaut関係）。さらに

$$
\dot\phi=\frac{\cos\alpha}{M},\qquad
\dot\lambda=\frac{\sin\alpha}{r},\qquad
\dot\alpha=\frac{\sin\phi\sin\alpha}{r}
$$

> が成立する。特に $|C|\le r(\phi)$ であり、$C\ne0$ の測地線は $r(\phi)<|C|$ の緯度帯へ入れない。$\dot\phi=0$ の瞬間には $|\sin\alpha|=1$ である。
<!-- formal-statement-end -->

**証明の見取り図。** 第2節の経度方程式を $d(r^2\dot\lambda)/ds=0$ と読めば保存量が出ます。方位角の定義と $r'=-M\sin\phi$ を代入すれば角度のODEが得られ、保存量の絶対値の評価から極へ近づけない条件が直ちに出ます。

<!-- proof-start -->
### 証明

[楕円体測地線の方程式](#thm-geod12-equations)の第二式に $r^2$ を掛けると

$$
\frac d{ds}(r^2\dot\lambda)
=r^2\ddot\lambda+2rr'\dot\phi\dot\lambda=0.
$$

よって $r^2\dot\lambda=C$ は定数です。[方位角の定義](#def-geod12-azimuth)の $r\dot\lambda=\sin\alpha$ を代入して $C=r\sin\alpha$ を得ます。

微分すると

$$
0=\frac d{ds}(r\sin\alpha)
=r'\dot\phi\sin\alpha+r\cos\alpha\,\dot\alpha.
$$

$\dot\phi=\cos\alpha/M$ を入れた点で $\cos\alpha\ne0$ なら

$$
\dot\alpha=-\frac{r'}{Mr}\sin\alpha
=\frac{\sin\phi\sin\alpha}{r}.
$$

$\cos\alpha=0$ の点でも式が成立することは、第2節の**緯度方向**の方程式から分かります。実際、$\dot\phi=\cos\alpha/M$ の微分と緯度方程式を組み合わせると

$$
-\sin\alpha\,\dot\alpha
=M'\dot\phi^2+M\ddot\phi
=\frac{rr'}M\dot\lambda^2
=\frac{r'}{Mr}\sin^2\alpha.
$$

$\sin\alpha=\pm1$ なのでこの点でも同じ方位角式です。$\sin\alpha=0$ の点では前者の計算で $\cos\alpha=\pm1$ となり $\dot\alpha=0$、やはり一致します。最後に $|\sin\alpha|\le1$ から $|C|\le r$、$\dot\phi=0$ なら $\cos\alpha=0$ を得ます。
<!-- proof-end -->

**保存量を数値で確認する例。** $a=5$、$b=4$ の楕円体なら $e^2=9/25$ です。赤道 $\phi_0=0$ から $\alpha_0=30^\circ$ へ進めば $r(0)=a=5$ より $C=5\sin30^\circ=5/2$。北側で緯度が折り返す点では $\sin\alpha=1$、したがって $r=5/2$。$t=\sin^2\phi$ と置いて

$$
\frac{25(1-t)}{1-(9/25)t}=\frac{25}{4}
\quad\Longrightarrow\quad
4(1-t)=1-\frac9{25}t
\quad\Longrightarrow\quad
t=\frac{75}{91}.
$$

よって北側の転向緯度は $\phi_{\max}=\arcsin\sqrt{75/91}$ です（球面 $b=a$ なら $\arcsin\sqrt{3/4}=60^\circ$）。緯度をさらに増やすと $r<|C|$ となり、実数の $\sin\alpha$ が存在しません。

### 3.1 どの緯線が測地線なのか

[GEOD11の緯線距離](../GEOD11/index.md#prop-geod11-parallel-length)は緯度固定の曲線を積分した値です。それが測地線の距離と等しいとは限りません。

<a id="prop-geod12-special-curves"></a>
<!-- formal-statement-start -->
> **命題（子午線・赤道・緯線の測地線判定）**  
> $0<b\le a$ の回転楕円体で、経度一定の子午線は極以外の座標区間で測地線であり、極を越えて滑らかに延長できる。赤道 $\phi=0$ は測地線である。一方、$0<|\phi_0|<\pi/2$ の一定緯度 $\phi_0$ の緯線は、どちらの向きに進んでも測地線ではない。
<!-- formal-statement-end -->

<!-- proof-start -->
### 証明

子午線で $\dot\lambda=0$ とすると経度方程式は満たされ、緯度方程式は $\ddot\phi+(M'/M)\dot\phi^2=0$ です。単位速さで北進なら $\dot\phi=1/M$、その微分は $\ddot\phi=-M'/M^3$。代入すると $-M'/M^3+(M'/M)(1/M^2)=0$ です。南進も符号二乗が同じなので成立します。極の経度退化は座標の問題で、子午断面と楕円体の交線は滑らかです。

赤道では $\phi=0$、$r'(0)=0$ であり、$\dot\phi=0$、$\dot\lambda=\pm1/a$ は両方の方程式を満たします。

一般緯線では $\dot\phi=\ddot\phi=0$、$\dot\lambda=\pm1/r(\phi_0)\ne0$ です。緯度方程式は $-r(\phi_0)r'(\phi_0)\dot\lambda^2/M(\phi_0)^2=0$ を要求します。しかし $r>0$ かつ $r'=-M\sin\phi_0\ne0$ なので矛盾します。
<!-- proof-end -->

北緯45°の地点から真東（$\alpha=90^\circ$）に発進すると、最初は $\dot\phi=0$ でも[方位角のODE](#thm-geod12-clairaut)から $\dot\alpha=\sin45^\circ/r>0$。方位角が90°を超えて南成分を持つため、**一般緯線に乗り続けない**のです。

---

## 4. 測地線の順問題と逆問題

同じ曲線方程式でも、与えるデータによって二種類の問いになります。測地測量・GISでよく使う「順方向」は方位角と距離を入力し、「逆方向」は二点を入力します。どちらでも楕円体の $a,b$ と緯度・経度の基準が一致していなければ比較できません。

<a id="def-geod12-direct-inverse"></a>
<!-- formal-statement-start -->
> **定義（楕円体測地線の順問題と逆問題）**  
> 回転楕円体 $0<b\le a$ を固定する。順問題は、非極点の始点 $(\phi_1,\lambda_1)$、始点の測地方位角 $\alpha_1$、表面上の非負弧長 $S$ を与え、その初期条件を持つ単位速さの測地線の終点 $(\phi_2,\lambda_2)$ と到着時方位角 $\alpha_2$ を求める問題である。逆問題は二点の測地緯度・経度を与え、両点を結ぶ測地線の弧長 $S$ と始点・終点の進行方位角を求める問題である。
>
> 逆問題では、どの測地線の枝を選ぶかを指定しない限り解が複数ある場合がある。**最短測地線の逆問題**はそのうち最小の非負弧長を実現する枝を選ぶ問題である。一致する二点では最短距離0だが、そのとき初期方位角は一意でない。
<!-- formal-statement-end -->

<!-- definition-example-start: def-geod12-direct-inverse -->
**定義の直接確認。** 赤道を東向きへ進む場合は[赤道の測地線判定](#prop-geod12-special-curves)で $\phi(s)=0$、$\dot\lambda=1/a$、$\alpha(s)=90^\circ$ とできます。始点 $(0,0)$、$S=a\pi/2$ の順問題は $(0,\pi/2)$ に達します。逆にこの二点は赤道の90°弧で結べ、その候補距離は $a\pi/2$、両端方位角は90°です。これは枝を一つ実際に構成した確認であって、一般の二点間最短性をこの例だけで証明したものではありません。
<!-- definition-example-end -->

### 4.1 順問題：距離を独立変数にして積分する

非極点で初期値 $(\phi_1,\lambda_1,\alpha_1)$ を置き、[Clairaut定理](#thm-geod12-clairaut)の一階系を

$$
\frac{d}{ds}
\begin{pmatrix}\phi\\\lambda\\\alpha\end{pmatrix}
=
\begin{pmatrix}
\cos\alpha/M(\phi)\\
\sin\alpha/r(\phi)\\
\sin\phi\sin\alpha/r(\phi)
\end{pmatrix},
\qquad 0\le s\le S
$$

として数値積分します。右辺は極以外で滑らかなので[測地線初期値の局所一意性](../../GEO/GEO14/index.md#thm-geo14-geodesic-existence)が適用できます。例えば古典的4段Runge–Kutta法では、$y=(\phi,\lambda,\alpha)$、刻み $h=S/m$ として

$$
\begin{aligned}
k_1&=F(y_j),&
k_2&=F(y_j+\tfrac h2k_1),\\
k_3&=F(y_j+\tfrac h2k_2),&
k_4&=F(y_j+hk_3),\\
y_{j+1}&=y_j+\frac h6(k_1+2k_2+2k_3+k_4).
\end{aligned}
$$

終点を $y_m$ とし、途中では**経度を連続値として保持**し、最後にのみ $\lambda$ を表示用の区間へ折り返します。途中で180°/-180°を切り替えると連続な解に人工的な飛びが生じます。

検算は少なくとも (i) 初期・終端で $M^2\dot\phi^2+r^2\dot\lambda^2=1$、(ii) $r\sin\alpha=C$、(iii) 刻み $h$ と $h/2$ の終端比較、(iv) 子午線・赤道・球面極限での解析式との比較、を分けて行います。保存量と単位速さは正しい式の確認に役立ちますが、**それだけで誤った枝や積分誤差がないと証明できるわけではありません**。固定した滑らかな区間でのRK4の大域誤差は通常 $O(h^4)$ ですが、極を横切るこの座標系には適用できません。

**数値例と別式による照合。** 長半径5・短半径4（同じ長さ単位）の楕円体で、始点 $\phi_1=\lambda_1=0$、$\alpha_1=30^\circ$、距離 $S=1$ とします。上の一階ODEをRK4で積分し、各段の $M,r$ は移動後の緯度で再評価します。

| 等分数 $m$ | 終点緯度 | 終点経度 | 到着方位角 |
| ---: | ---: | ---: | ---: |
| 10 | $15.269089197^\circ$ | $5.820038427^\circ$ | $30.782788959^\circ$ |
| 20 | $15.269089185^\circ$ | $5.820038431^\circ$ | $30.782788970^\circ$ |
| 40 | $15.269089185^\circ$ | $5.820038432^\circ$ | $30.782788971^\circ$ |

この値は同じRK4を細かくしただけでも収束しますが、同じコードを二度実行しただけでは独立検算になりません。そこで[Clairaut保存量](#thm-geod12-clairaut)を用い、北進中（$\dot\phi>0$）には

$$
\dot\phi=\frac{\sqrt{1-C^2/r(\phi)^2}}{M(\phi)},\qquad
\frac{d\lambda}{d\phi}
=\frac{C M(\phi)}{r(\phi)^2\sqrt{1-C^2/r(\phi)^2}}
$$

と変形します。ここでは $C=5/2$、距離1では転向緯度に達しないので平方根の正の枝を取れます。$\phi_2$ を未知とする**一変数の積分**

$$
1=\int_0^{\phi_2}
\frac{M(t)}{\sqrt{1-C^2/r(t)^2}}\,dt
$$

を複合Simpson則（1024等分）と二分法で解き、次いで上の $d\lambda/d\phi$ を同じ区間で積分すると

$$
\phi_2\simeq15.269089184738^\circ,\quad
\lambda_2\simeq5.820038431760^\circ,\quad
\alpha_2=\arcsin(C/r(\phi_2))
\simeq30.782788970799^\circ
$$

です。これは**三変数ODEのRK4とは異なる一次元の積分表現**による計算です。さらに球面 $a=b=5$ へ替えれば[球面の解析式](#prop-geod12-sphere-formulas)から同じ $S=1$ の終点は $\phi_2\simeq9.907188135^\circ$、$\lambda_2\simeq5.787450897^\circ$ となり、楕円体値と混同していないことを確かめられます。

### 4.2 逆問題：終点を合わせる境界値問題

始点 $P$ から、試しの初期方位角 $\theta$ と距離 $S\ge0$ による順問題の終点を $G(\theta,S)=(\phi_G,\lambda_G)$ と書きます。目標点 $Q=(\phi_Q,\lambda_Q)$ の非極点近傍で、経度の同じ連続な枝を選び、長さ単位の残差を

$$
\boldsymbol F(\theta,S)=
\begin{pmatrix}
M(\phi_Q)(\phi_G-\phi_Q)\\
r(\phi_Q)(\lambda_G-\lambda_Q)
\end{pmatrix}
$$

と定めます。二つの角度差はラジアンです。係数 $M(\phi_Q),r(\phi_Q)>0$ は固定した目標点での局所換算係数なので、$F=0$ と終点の一致は同値です。任意の経度枝を勝手に引き算すると日付変更線で偽の大残差になります。

<a id="prop-geod12-inverse-linearization"></a>
<!-- formal-statement-start -->
> **命題（局所逆問題のNewton型線形化）**  
> 終点写像 $G(\theta,S)$ が指定した非極点の滑らかな座標枝上で $C^1$ 級とする。$\boldsymbol F(\theta,S)=0$ の近くで Jacobian $J=D_{(\theta,S)}\boldsymbol F$ が可逆なら、

$$
J(\theta_k,S_k)
\begin{pmatrix}\delta\theta\\\delta S\end{pmatrix}
=-\boldsymbol F(\theta_k,S_k)
$$

> を解いて $(\theta_{k+1},S_{k+1})=(\theta_k+\delta\theta,S_k+\delta S)$ とするNewton型反復が定義できる。近傍での局所収束には滑らかさ・初期値の近さなどの条件が必要であり、Jacobianが特異な場合に一意な補正を保証しない。複数の根があるときは、これだけで最短枝を選べない。
<!-- formal-statement-end -->

**証明の見取り図。** [NA3の非線形連立方程式のNewton法](../../../計算系/NA/NA3/index.md#def-na3-system-newton)を、未知数二つ $(\theta,S)$ と残差二つ $(F_1,F_2)$ に適用するだけです。逆行列を直接作らず線形方程式を解く形にします。

<!-- proof-start -->
### 証明

固定した現在値 $x_k=(\theta_k,S_k)^{\mathsf T}$ に対し微小補正 $d=(\delta\theta,\delta S)^{\mathsf T}$ を入れます。$C^1$ 性から

$$
\boldsymbol F(x_k+d)
=\boldsymbol F(x_k)+J(x_k)d+o(\|d\|).
$$

右辺の一次近似を0と置けば $J(x_k)d=-F(x_k)$ です。$J$ 可逆なら補正が一意に存在します。[NA3の局所収束定理](../../../計算系/NA/NA3/index.md#thm-na3-local-newton)はさらにJacobianの条件と初期点の近さを要求します。根の多さ・可逆性の破綻は一次近似から排除できません。
<!-- proof-end -->

実装時には $J$ を二つの初期値方向の変分方程式または中央差分で推定し、刻み・残差・条件数を監視し、更新後 $S\ge0$ を保つ減衰を考えます。一本のNewton反復が失敗したことと**測地線が存在しないこと**は別です。複数の初期方向や経度の枝を試す必要があり、ほぼ対蹠点の堅牢な求解には専用の楕円体測地線アルゴリズムが有用です。

---

## 5. 球面なら順・逆問題を別の方法で検算できる

扁平率が0、つまり $a=b=R$ のとき、測地線は大円弧です。球面の厳密式は楕円体アルゴリズムの**独立した極限検算**になります。$\Delta\lambda=\lambda_2-\lambda_1$ は符号付き経度差、$\sigma=S/R$ は球面上の中心角です。$\operatorname{atan2}(y,x)$ は座標 $(x,y)$ の向きを全象限で判定する関数です。

<a id="prop-geod12-sphere-formulas"></a>
<!-- formal-statement-start -->
> **命題（球面上の順・逆問題の解析式）**  
> 半径 $R>0$ の球面で、非極点の始点 $(\phi_1,\lambda_1)$、方位角 $\alpha_1$、弧長 $S\ge0$ に対し、$\sigma=S/R$ と置く。終点の緯度と経度差は

$$
\sin\phi_2=\sin\phi_1\cos\sigma
+\cos\phi_1\sin\sigma\cos\alpha_1,
$$

$$
\Delta\lambda=
\operatorname{atan2}
\left(
\sin\alpha_1\sin\sigma\cos\phi_1,\,
\cos\sigma-\sin\phi_1\sin\phi_2
\right)
$$

> で与えられる。ただし経度式は両引数が同時に0とならない非極点の経路で使い、$\phi_2$ は $[-\pi/2,\pi/2]$ に取る。逆問題では

$$
\begin{aligned}
u&=\cos\phi_2\sin\Delta\lambda,\\
v&=\cos\phi_1\sin\phi_2-
\sin\phi_1\cos\phi_2\cos\Delta\lambda,\\
w&=\sin\phi_1\sin\phi_2+
\cos\phi_1\cos\phi_2\cos\Delta\lambda
\end{aligned}
$$

> によって、$0<\sigma<\pi$ の非対蹠・非一致の二点について

$$
\sigma=\operatorname{atan2}(\sqrt{u^2+v^2},w),\quad
S=R\sigma,\quad
\alpha_1=\operatorname{atan2}(u,v).
$$

> 同じ経路を終点で前進する到着方位角は、非極点で

$$
\alpha_2=\operatorname{atan2}
\left(
\cos\phi_1\sin\Delta\lambda,\,
-\sin\phi_1\cos\phi_2+
\cos\phi_1\sin\phi_2\cos\Delta\lambda
\right).
$$

> 一致点では最短方位角は不定、対蹠点では最短大円弧が一意でないため、これらの方位角式を一意解として使わない。
<!-- formal-statement-end -->

**証明の見取り図。** 単位球の始点ベクトル $\boldsymbol p$、北単位接ベクトル $\boldsymbol n$、東単位接ベクトル $\boldsymbol e$ を用いると、大円は $\cos\sigma\,\boldsymbol p+\sin\sigma(\cos\alpha_1\,\boldsymbol n+\sin\alpha_1\,\boldsymbol e)$ です。三次元の $z$ 成分を取れば緯度、$x,y$ 成分から経度、内積・外積から中心角と方位角が出ます。

<!-- proof-start -->
### 証明

三次元の単位位置ベクトルを

$$
\boldsymbol p=(\cos\phi_1\cos\lambda_1,\cos\phi_1\sin\lambda_1,\sin\phi_1)
$$

とし、局所北と東を

$$
\boldsymbol n=(-\sin\phi_1\cos\lambda_1,-\sin\phi_1\sin\lambda_1,\cos\phi_1),\qquad
\boldsymbol e=(-\sin\lambda_1,\cos\lambda_1,0)
$$

とします。内積を取ればこの三本は互いに直交し各長さ1。初期単位接線は $\boldsymbol t=\cos\alpha_1\boldsymbol n+\sin\alpha_1\boldsymbol e$ なので、球面大円の単位位置は

$$
\boldsymbol q=\cos\sigma\,\boldsymbol p+\sin\sigma\,\boldsymbol t.
$$

$\boldsymbol q$ の $z$ 成分は最初の緯度式です。$x,y$ 成分を始点経度 $\lambda_1$ だけ逆回転すると

$$
(q_x',q_y')=
(\cos\phi_1\cos\sigma-\sin\phi_1\cos\alpha_1\sin\sigma,\,
\sin\alpha_1\sin\sigma).
$$

$\cos\phi_1 q_x'=\cos\sigma-\sin\phi_1\sin\phi_2$ は最初の緯度式を変形した結果です。よって $\operatorname{atan2}(q_y',q_x')$ の両引数へ正の $\cos\phi_1$ を掛けた経度差式を得ます。

逆向きには、終点ベクトル $\boldsymbol q$ と始点 $\boldsymbol p$ の内積が $w=\cos\sigma$ です。初期接線への北・東方向射影はそれぞれ

$$
\boldsymbol q\cdot\boldsymbol n=v,\qquad
\boldsymbol q\cdot\boldsymbol e=u.
$$

大円表示から $u=\sin\sigma\sin\alpha_1$、$v=\sin\sigma\cos\alpha_1$ なので $\sqrt{u^2+v^2}=\sin\sigma$（$0<\sigma<\pi$）。よって中心角と初期方位角の式が得られます。到着接線は $\boldsymbol t_2=-\sin\sigma\,\boldsymbol p+\cos\sigma\,\boldsymbol t$ です。終点の北・東基底への射影を計算するか、終点から始点への方位角へ $\pi$ を加えると、表示した $\alpha_2$ を得ます。
<!-- proof-end -->

**独立した往復確認。** 始点 $(0^\circ,0^\circ)$、$\alpha_1=60^\circ$、$S=\pi R/2$ なら、順問題で

$$
\sin\phi_2=\cos60^\circ=\tfrac12,\qquad
\Delta\lambda=\operatorname{atan2}(\tfrac{\sqrt3}{2},0)=90^\circ.
$$

従って終点は $(30^\circ,90^\circ)$。この二点から逆式を使うと $u=\sqrt3/2$、$v=1/2$、$w=0$、従って $\sigma=90^\circ$、$\alpha_1=60^\circ$ が戻ります。終端方位も $\alpha_2=90^\circ$ です。端点緯度・経度・距離・進行方位角を**異なる計算経路**で照合しました。

---

## 6. 距離が近い・極に近い・ほぼ対蹠の違い

以下はそれぞれ別の失敗機構です。

| 配置 | 数学的に何が起こるか | 計算上の対処 |
| --- | --- | --- |
| 極の近く | $r=N\cos\phi\to0$ で $\lambda$ と東西基底が退化する | ECEFの接ベクトルや別の局所chartへ切り替える。経度を物理量として極で一意に要求しない |
| ほぼ同じ二点 | $S\to0$ で最短方位角は不安定になり、一致点では方位が不定 | 距離の絶対誤差で判定する。$\arccos$ による小角の差引きを避け、球面式では $\operatorname{atan2}$ を使う |
| ほぼ対蹠点 | 複数の測地線が競合し、初期方位角から終点への写像の逆が悪条件になることがある | 複数枝と距離を調べ、専用の安定な楕円体測地線逆解法を使う。反復一回の収束を保証としない |
| 日付変更線の前後 | $\lambda$ の表現が $\pm\pi$ で飛ぶだけで曲面上の点は連続 | 反復中は経度を連続な枝に持ち、最終表示時だけ正規化する |

[GEO14の凸正規近傍](../../GEO/GEO14/index.md#thm-geo14-convex-normal-existence)内の近接二点には一意な局所最短測地線があります。しかし「近い二点」すべてに数値的に安定な方位角がつくわけではありません。$S=0$ では向きを求める問い自体が定まりません。

**一意性の反例。** 球面の赤道上 $(0^\circ,0^\circ)$ と $(0^\circ,180^\circ)$ は対蹠点です。両点間の長さ $\pi R$ の大円半周は、北極を通るもの、南極を通るもの、赤道を通るものなど無数にあります。始点方位角は一意でありません。楕円体に扁平率があると最短解の構造は変わりますが、球面の一意性をそのまま引き継ぐことも、任意の楕円体逆問題に大域的一意解があると主張することもできません。

計算アルゴリズムは、単に終点残差が小さいかだけでなく、**実際の弧長が指定した曲面上の距離であるか**と**最短枝を選択したか**を別々に確認する必要があります。高精度・対蹠点付近の実務的な逆解法の例は C. F. F. Karney, *Algorithms for geodesics* (2013), [DOI:10.1007/s00190-012-0578-z](https://doi.org/10.1007/s00190-012-0578-z) を参照してください。これは数学的な証明の代わりではなく、数値計算の比較先です。

---

## 7. 演習：曲面上で「方向」と「距離」を両方求める

角度は計算時にラジアンへ変換し、方位は北0°・東90°・南180°・西270°とします。指定のない $S$ は楕円体**表面上**の弧長です。すべての解答で、用いた式の前提（球面か楕円体か、非極点か、どの枝か）を確認してください。

### Level A：方向・保存量・単位

#### A1. 北東の単位速度を読めるか

球面半径 $R=10$ km、赤道上の点で $\alpha=30^\circ$ の初期単位接線を取る。北・東の速度成分と、緯度・経度の $s$ 微分を求め、計量の単位速さを確認せよ。

- Level: A
- ID: GEOD12-A1

<!-- solution-start -->
**詳細解答。** [方位角の定義](#def-geod12-azimuth)で北成分 $\cos30^\circ=\sqrt3/2$、東成分 $\sin30^\circ=1/2$ です。球面・赤道だから $M=r=R=10$ kmで

$$
\dot\phi=\frac{\sqrt3}{20}\ \mathrm{rad/km},\qquad
\dot\lambda=\frac1{20}\ \mathrm{rad/km}.
$$

長さ二乗は $M^2\dot\phi^2+r^2\dot\lambda^2=100(3/400+1/400)=1$。ここで $1/20$ は角度毎キロメートルであり東向きの実速度 $1/2$ とは異なります。
<!-- solution-end -->

#### A2. 赤道を東へ四分の一周

長半径 $a=6{,}000$ km、短半径 $0<b\le a$ の楕円体で、赤道の始点 $(0^\circ,20^\circ)$ から真東へ $S=3{,}000\pi$ km進む順問題を解け。終点の方位角も求めよ。

- Level: A
- ID: GEOD12-A2

<!-- solution-start -->
**詳細解答。** [赤道の測地線](#prop-geod12-special-curves)は $r(0)=a$、$\phi(s)=0$、$\dot\lambda=1/a$、$\alpha=90^\circ$ です。従って

$$
\Delta\lambda=\int_0^{3000\pi}\frac{ds}{6000}=\frac\pi2=90^\circ.
$$

終点は $(0^\circ,110^\circ)$、到着方位角90°です。$b$ が変わっても赤道半径は $a$ なので結果は変わりません。
<!-- solution-end -->

#### A3. 子午線の南進と符号

半径 $R=8$ km の球面で、経度40°の北緯30°から真南へ、南緯15°まで進む。表面上の距離、到着経度、方位角を求めよ。

- Level: A
- ID: GEOD12-A3

<!-- solution-start -->
**詳細解答。** 球面の[子午線弧長](../GEOD11/index.md#prop-geod11-meridian-difference)は $R|\Delta\phi|$。緯度差は $-15^\circ-30^\circ=-45^\circ=-\pi/4$ で

$$
S=8\left|-\frac\pi4\right|=2\pi\ \mathrm{km}.
$$

極に達しない区間なので経度40°は変わらず、$\dot\phi=-1/R$ より北成分 $R\dot\phi=-1$、東成分0。始終とも方位角は180°です。符号付き緯度差 $-45^\circ$ を負の弧長として報告してはいけません。
<!-- solution-end -->

#### A4. Clairaut保存量による通行可能緯度

単位を揃えた楕円体の一点で $r_1=10$、$\alpha_1=30^\circ$ とする。同じ測地線上で $r_2=8$ になったときの $\sin\alpha_2$ を求めよ。方位角そのものは一意か。$r=4$ の場所を通れるか。

- Level: A
- ID: GEOD12-A4

<!-- solution-start -->
**詳細解答。** [Clairaut関係](#thm-geod12-clairaut)で $C=10\sin30^\circ=5$。従って $8\sin\alpha_2=5$ なので $\sin\alpha_2=5/8$。$\alpha_2=\arcsin(5/8)$ または $\pi-\arcsin(5/8)$（$2\pi$ を法とする）で、北進と南進の枝が残ります。$r=4$ では $|\sin\alpha|=|C|/r=5/4>1$ となり不可能です。方位角の余弦の符号を保存量だけから確定できない点が重要です。
<!-- solution-end -->

#### A5. 北半球で真東に出た直後

楕円体の非極点、北緯45°で初期方位 $\alpha=90^\circ$ とする。$r(45^\circ)>0$ として、発進瞬間の $\dot\phi,\dot\alpha$ の符号、および十分小さな正の距離の後の南北進行方向を判断せよ。

- Level: A
- ID: GEOD12-A5

<!-- solution-start -->
**詳細解答。** [方位角のODE](#thm-geod12-clairaut)から

$$
\dot\phi(0)=\frac{\cos90^\circ}{M}=0,\qquad
\dot\alpha(0)=\frac{\sin45^\circ\sin90^\circ}{r}
=\frac{\sqrt2}{2r}>0.
$$

従って小さな $s>0$ で $\alpha(s)>90^\circ$、$\cos\alpha(s)<0$ となり、$\dot\phi(s)<0$、すなわち南へ向かいます。これが北緯45°の緯線を測地線と同一視できない理由です。
<!-- solution-end -->

### Level B：方程式・厳密解・一意性・数値反復

#### B1. 回転楕円体の方程式を自分で作る

$ds^2=M(\phi)^2d\phi^2+r(\phi)^2d\lambda^2$、$M,r>0$ とする。(1) $L=(M^2\phi_t^2+r^2\lambda_t^2)/2$ のEuler–Lagrange方程式を計算せよ。(2) $r^2\lambda_t$ の保存を示せ。(3) $r=N\cos\phi$ と[GEOD4の曲率半径](../GEOD4/index.md#def-geod4-curvature-radii)を使って $r'=-M\sin\phi$ を確かめよ。

- Level: B
- ID: GEOD12-B1

<!-- solution-start -->
**詳細解答。** (1) まず

$$
\partial_{\phi_t}L=M^2\phi_t,\quad
\frac d{dt}\partial_{\phi_t}L=2MM'\phi_t^2+M^2\phi_{tt},\quad
\partial_\phi L=MM'\phi_t^2+rr'\lambda_t^2.
$$

従って差を0とし $M^2$ で割って

$$
\phi_{tt}+\frac{M'}M\phi_t^2-\frac{rr'}{M^2}\lambda_t^2=0.
$$

(2) $\partial_\lambda L=0$ で、$\partial_{\lambda_t}L=r^2\lambda_t$ なので $d(r^2\lambda_t)/dt=0$。展開すれば

$$
\lambda_{tt}+2\frac{r'}r\phi_t\lambda_t=0.
$$

(3) $q=e^2$ とし $N=a(1-q\sin^2\phi)^{-1/2}$ を微分すると

$$
N'=aq\sin\phi\cos\phi(1-q\sin^2\phi)^{-3/2}.
$$

積の微分法で

$$
\begin{aligned}
r'&=N'\cos\phi-N\sin\phi\\
&=\frac{a\sin\phi[q\cos^2\phi-(1-q\sin^2\phi)]}{(1-q\sin^2\phi)^{3/2}}\\
&=-\frac{a(1-q)\sin\phi}{(1-q\sin^2\phi)^{3/2}}
=-M\sin\phi.
\end{aligned}
$$

これは[測地線の座標定理](#thm-geod12-equations)の導出を別の媒介変数から再現したもので、分母 $M^2,r^2$ が正なのは非極点の仮定によります。
<!-- solution-end -->

#### B2. 球面順問題を逆問題から検算

半径 $R$ の球面の始点 $(0^\circ,0^\circ)$ で $\alpha_1=60^\circ$、距離 $S=\pi R/2$ の順問題を解く。その終点を逆問題に入力し、最短距離、出発・到着方位角を求めよ。

- Level: B
- ID: GEOD12-B2

<!-- solution-start -->
**詳細解答。** $\sigma=\pi/2$ だから[球面順問題式](#prop-geod12-sphere-formulas)の第一式に $\sin\phi_1=0,\cos\phi_1=1$ を入れて

$$
\sin\phi_2=\cos60^\circ\sin90^\circ=\frac12
\quad\Longrightarrow\quad\phi_2=30^\circ.
$$

経度差は $\operatorname{atan2}(\sin60^\circ,0)=90^\circ$。終点は $(30^\circ,90^\circ)$ です。逆問題では

$$
u=\cos30^\circ\sin90^\circ=\frac{\sqrt3}{2},\quad
v=\sin30^\circ=\frac12,\quad
w=\cos30^\circ\cos90^\circ=0.
$$

従って $\sigma=\operatorname{atan2}(1,0)=90^\circ$、最短距離 $R\pi/2$、始点方位 $\operatorname{atan2}(\sqrt3/2,1/2)=60^\circ$。到着方位式へ代入すると

$$
\alpha_2=\operatorname{atan2}(\sin90^\circ,\sin30^\circ\cos90^\circ)=90^\circ.
$$

両点は対蹠でなく、中心角90°の短い大円弧を選んだので、距離は最短です。
<!-- solution-end -->

#### B3. 対蹠点を一意に結べるという誤り

半径 $R$ の球面で $A=(0^\circ,0^\circ)$、$B=(0^\circ,180^\circ)$ を与える。始点で真北・真南・真東へ進む、長さ $\pi R$ の三つの経路を構成し、どれも測地線であること、および逆問題で初期方位角が一意でない理由を述べよ。

- Level: B
- ID: GEOD12-B3

<!-- solution-start -->
**詳細解答。** $A$ を地球儀の正面赤道点とします。真北へ大円を進めば北極を通り反対経度の赤道 $B$ に達します。真南なら南極を通って $B$ へ達します。真東なら赤道に沿って半周します。いずれも球の中心を含む平面と球面の交線（大円）です。球面の任意の大円弧は測地線であり、半周の長さは $\pi R$。方位角はそれぞれ $0^\circ,180^\circ,90^\circ$ で相異なります。

別の曲線がこれらより短くない理由は、中心角が $\pi$ である球面距離の公式 $d=R\sigma$ によります。最短距離 $\pi R$ は一つでも方位角が複数あるので、逆問題の一意性が失われます。極を通る経路は途中で経度座標が退化しますが、三次元の大円曲線そのものは滑らかです。
<!-- solution-end -->

#### B4. 逆問題のJacobianが悪条件になる場面

目標点 $Q$ が非極点にあり、終点写像の残差を $\boldsymbol F(\theta,S)=(M_Q\Delta\phi,r_Q\Delta\lambda)^{\mathsf T}$ とする。(1) Newton反復の二元一次方程式を書け。(2) 完全に同一点 $P=Q$ の最短解 $S=0$ で $\theta$ が未定となる理由を、Jacobianの列から説明せよ。(3) ほぼ対蹠の配置で一回の局所反復だけに頼れない理由を述べよ。

- Level: B
- ID: GEOD12-B4

<!-- solution-start -->
**詳細解答。** (1) 現在の組 $(\theta_k,S_k)$ で

$$
\begin{pmatrix}
\partial_\theta F_1&\partial_S F_1\\
\partial_\theta F_2&\partial_S F_2
\end{pmatrix}_{(\theta_k,S_k)}
\begin{pmatrix}\delta\theta\\\delta S\end{pmatrix}
=-\begin{pmatrix}F_1\\F_2\end{pmatrix}_{(\theta_k,S_k)}
$$

を解き、$(\theta_k+\delta\theta,S_k+\delta S)$ に更新します。これは[局所逆問題の線形化](#prop-geod12-inverse-linearization)の成分表示です。

(2) $S=0$ ならどの $\theta$ も同じ始点 $P$ へ戻り、終点は初期方向に依存しません。従って $\partial_\theta\boldsymbol F(\theta,0)=\boldsymbol0$ でJacobianの第1列が零となり、行列式も0です。方向の非一意性が線形代数上の特異性に現れます。

(3) 対蹠点近くでは始点方位角のわずかな変化で到着枝が入れ替わったり、複数の測地線の長さが競合します。$J$ の悪条件性や複数の根は[NA3のNewton法の局所条件](../../../計算系/NA/NA3/index.md#thm-na3-local-newton)から消せません。複数初期値・枝の比較と、球面極限や専用楕円体逆解法による検算が必要です。
<!-- solution-end -->

### Level C：扁平な楕円体を一つの計算で追う

#### C1. Clairautの転向緯度と二点間経路を評価する

長半径 $a=5$、短半径 $b=4$ の回転楕円体で次を調べよ。

1. $e^2$、$M(\phi)$、$r(\phi)$ を与えよ。赤道から方位角30°で北東へ進む単位速さ測地線のClairaut定数を求めよ。
2. この測地線の北側転向緯度 $\phi_{\max}$ を正確な式で求め、そこでの方位角を答えよ。極を通れないことを定数から説明せよ。
3. 赤道上で経度差180°の二点を結ぶ「赤道を半周する経路」と「北極を通る子午線経路」を構成する。それぞれの長さを式で与え、後者が前者より短いことを**厳密な不等式**で示せ。ただし楕円断面を $(X,Z)=(a\cos t,b\sin t)$ とパラメータ化してよい。
4. この二点の逆問題で、赤道半周を最短として報告することがなぜ誤りか、またどのような検証が必要か述べよ。

- Level: C
- ID: GEOD12-C1

<!-- solution-start -->
**詳細解答。** (1) [GEOD3の楕円体パラメータ](../GEOD3/index.md#def-geod3-shape-parameters)から

$$
e^2=1-\frac{b^2}{a^2}=1-\frac{16}{25}=\frac9{25}.
$$

[曲率半径](../GEOD4/index.md#def-geod4-curvature-radii)より

$$
M(\phi)=\frac{5(16/25)}{(1-(9/25)\sin^2\phi)^{3/2}},\qquad
r(\phi)=\frac{5\cos\phi}{\sqrt{1-(9/25)\sin^2\phi}}.
$$

赤道では $r(0)=5$ なので、[Clairaut関係](#thm-geod12-clairaut)の保存量は $C=5\sin30^\circ=5/2$ です。

(2) 北東発進なので $\dot\phi(0)>0$、北側で最初に $\dot\phi=0$ となる点は $\alpha=90^\circ$ です。$C=r\sin\alpha=r$ より

$$
\frac{5\cos\phi_{\max}}{\sqrt{1-(9/25)\sin^2\phi_{\max}}}
=\frac52.
$$

両辺正なので二乗し $t=\sin^2\phi_{\max}$ と置いて

$$
\frac{25(1-t)}{1-(9/25)t}=\frac{25}{4},\qquad
4-4t=1-\frac9{25}t,\qquad
t=\frac{75}{91}.
$$

従って $\phi_{\max}=\arcsin\sqrt{75/91}$。$C=5/2>0$ に対して極では $r=0$ なので $|C|\le r$ に反し、この測地線は極を通れません。

(3) 赤道は[測地線](#prop-geod12-special-curves)なので半周の長さは

$$
L_{\mathrm{eq}}=a\pi=5\pi.
$$

北極を経由する経路も両側が子午線上の測地線であり、二点を結ぶ滑らかな子午断面の半楕円です（極で経度表示は切り替わります）。子午断面のパラメータ表示 $(a\cos t,b\sin t)$ を $t=0$ から $\pi$ へ動かすと、速度の長さは

$$
\sqrt{(-a\sin t)^2+(b\cos t)^2}
=\sqrt{25\sin^2t+16\cos^2t}.
$$

従って北側経路の長さは

$$
L_{\mathrm{north}}=2\int_0^{\pi/2}
\sqrt{25\sin^2t+16\cos^2t}\,dt.
$$

区間 $0\le t<\pi/2$ では $16\cos^2t<25\cos^2t$ だから被積分関数は5より真に小さく、

$$
L_{\mathrm{north}}
<2\int_0^{\pi/2}5\,dt=5\pi=L_{\mathrm{eq}}.
$$

南極経由も回転・赤道反射対称性から同じ長さです。**赤道半周は測地線であっても最短ではない**ことが、数値近似に頼らず分かりました。

(4) 逆問題の候補として赤道半周を見つけて残差0だったとしても、(3) で明示したさらに短い二点間経路があるので最短とは報告できません。残差と保存量の確認に加え、候補枝の距離比較、座標特異点の扱い、数値積分の刻み収束と独立アルゴリズムとの照合が必要です。この不等式が証明するのは「北側経路が赤道半周より短い」ことであって、北側経路の大域最短性までは主張していません。
<!-- solution-end -->

---

## 8. 次章へ：距離と図上の長さは同じではない

この章で楕円体面上の曲線長、初期・到着方位角、測地線の枝の違いを求められるようになりました。次のGEOD13では、これらの曲線を平面へ写すと局所長さと角度がどう変わるかを、投影のJacobianと楕円体計量で判定します。測地線の距離をそのまま地図上の定規で測った値とみなさないことが、地図投影の入口です。
