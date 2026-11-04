# GEOD11 子午線弧長・緯線・地表測距の還元

[GEOD4 の回転楕円体の計量](../GEOD4/index.md#thm-geod4-ellipsoid-metric)から、緯度を少し変えたときの距離は子午線曲率半径 $M$、経度を少し変えたときの距離は卯酉線曲率半径 $N$ で求められると分かりました。しかし、現場で扱うのは有限の緯度差や観測距離です。例えば「北緯45°から46°へ1°移動」は、緯度45°の $M$ に単に1°を掛けた値と完全には一致しません。

この章では、**経緯度の差を楕円体上の弧長へ変換し、地表で観測した距離と区別する**ことを目指します。次の順に、積分での厳密な定義、計算しやすい級数、独立の数値積分、距離還元を結びます。

1. 子午線の二点間の弧長を積分し、赤道を原点とする符号付き弧長を定める。
2. 第一離心率のべき級数を導き、打切り誤差を評価する。
3. 緯線弧長と東西の方位角を求め、曲面上の最短経路との違いを理解する。
4. 斜距離、地表の弧長、楕円体弧長、投影平面距離を混同せずに扱う。
5. 数値積分を級数と独立に実行し、桁・単位・仮定を検算する。

角度を式へ代入するときは常にラジアンを使います。長半径 $a\ge b>0$、第一離心率の二乗 $q=e^2=1-b^2/a^2\in[0,1)$ とし、測地緯度を $\phi\in[-\pi/2,\pi/2]$、経度を $\lambda$ とします。[GEOD3 の楕円体と形状パラメータ](../GEOD3/index.md#def-geod3-shape-parameters)および[GEOD4 の曲率半径](../GEOD4/index.md#def-geod4-curvature-radii)から

$$
M(\phi)=\frac{a(1-q)}{(1-q\sin^2\phi)^{3/2}},\qquad
N(\phi)=\frac{a}{\sqrt{1-q\sin^2\phi}}
$$

です。$M,N$ は長さの単位を持ち、$1-q\sin^2\phi\ge1-q>0$ だから全緯度で有限かつ正です。これらを「地球半径」という一つの定数へ置き換えてしまうと、楕円体による緯度依存性が失われます。

<!-- definition-example-audit: strict -->

---

## 1. 子午線弧長は曲率半径の積分になる

[GEOD3 の子午線と緯線](../GEOD3/index.md#def-geod3-meridian-parallel)のうち、経度を固定して南北へ進む曲線を考えます。[GEOD4 の弧長積分式](../GEOD4/index.md#prop-geod4-curve-length)では、$\lambda'=0$ のとき速度の長さは $M(\phi)|\phi'|$ です。緯度が増える向きを正とした距離座標を、赤道から積み上げましょう。

<a id="def-geod11-meridian-arc"></a>
<!-- formal-statement-start -->
> **定義（符号付き子午線弧長）**
> $a\ge b>0$ の回転楕円体について、赤道を $0$ とする測地緯度 $\phi\in[-\pi/2,\pi/2]$ の符号付き子午線弧長を

$$
s(\phi)=\int_0^\phi M(t)\,dt
$$

> と定める。$M(t)=a(1-e^2)(1-e^2\sin^2t)^{-3/2}$ は子午線曲率半径である。
<!-- formal-statement-end -->

<!-- definition-example-start: def-geod11-meridian-arc -->
**定義の確認**　球面 $a=b=R$ なら $q=0$ で $M(t)=R$ です。したがって $s(\pi/6)=R\pi/6$、$s(-\pi/6)=-R\pi/6$ となります。赤道の北側は正、南側は負、両点の距離は $R\pi/3$ です。これで積分の向きと長さの単位を直接確かめられます。
<!-- definition-example-end -->

<a id="prop-geod11-meridian-difference"></a>
<!-- formal-statement-start -->
> **命題（同一子午線上の区間弧長）**
> $a\ge b>0$ の回転楕円体で経度を一つ固定し、測地緯度 $\phi_0,\phi_1\in[-\pi/2,\pi/2]$ の二点を、緯度について単調な子午線弧に沿って結ぶ。その弧長 $L$ と北向き符号付き弧長 $\Delta s$ は

$$
\Delta s=s(\phi_1)-s(\phi_0)=\int_{\phi_0}^{\phi_1}M(t)\,dt,
\qquad L=|\Delta s|.
$$

> $s$ は厳密に増加するので、$L=0$ と $\phi_0=\phi_1$ は同値である。
<!-- formal-statement-end -->

**証明の見取り図。** [GEOD4 の弧長積分式](../GEOD4/index.md#prop-geod4-curve-length)に経度一定を代入してから、積分の加法性と $M>0$ を使います。

<!-- proof-start -->
### 証明

緯度を $\phi(t)=\phi_0+t(\phi_1-\phi_0)$（$0\le t\le1$）、経度を $\lambda(t)=\lambda_0$ と置きます。$\lambda'=0$、$\phi'=\phi_1-\phi_0$ を[GEOD4 の長さ公式](../GEOD4/index.md#prop-geod4-curve-length)へ代入すると

$$
L=\int_0^1 M(\phi(t))|\phi_1-\phi_0|\,dt
=\left|\int_{\phi_0}^{\phi_1}M(u)\,du\right|.
$$

最後は $u=\phi_0+t(\phi_1-\phi_0)$ という変数変換です。$M$ は連続で正だから、任意の $\phi_0<\phi_1$ では $\int_{\phi_0}^{\phi_1}M(u)\,du>0$ です。また

$$
\int_{\phi_0}^{\phi_1}M(u)\,du
=\int_0^{\phi_1}M(u)\,du-\int_0^{\phi_0}M(u)\,du
=s(\phi_1)-s(\phi_0).
$$

極を端点に含む場合も、積分関数は連続なので端点まで極限を取れます。極では経度座標自体は退化しますが、この子午線の長さの極限は存在します。
<!-- proof-end -->

**緯度45°付近の1°。** GRS80 の模型として $a=6,378,137$ m、$f=1/298.257222101$、$q=2f-f^2$ を用いると、積分値は $s(46^\circ)-s(45^\circ)\simeq111,141.548$ m です。一方、45°の一点で係数を固定した $M(45^\circ)\pi/180\simeq111,131.777$ m は約9.771 m小さくなります。有限区間では $M$ が変化することが原因です。

---

## 2. 子午線弧長を級数で手計算する

積分は正確な定義ですが、数値計算や変換の初期近似には多項式と三角関数の和が便利です。展開するのは緯度 $\phi$ ではなく、**離心率の二乗 $q$** です。$0\le q<1$ なら $|q\sin^2t|<1$ が全緯度で成り立ちます。

$g(x)=(1-x)^{-3/2}$ を $x=0$ で微分すると

$$
g(0)=1,\quad g'(0)=\frac32,\quad
\frac{g''(0)}{2!}=\frac{15}{8},\quad
\frac{g'''(0)}{3!}=\frac{35}{16}.
$$

したがって $x=q\sin^2t$ として3次まで展開し、外側の $1-q$ を掛けます。$q^4$ 以上を除いた式は

$$
\begin{aligned}
\frac{M(t)}a
&=(1-q)\left(1+\frac32q\sin^2t+\frac{15}{8}q^2\sin^4t
  +\frac{35}{16}q^3\sin^6t+\cdots\right)\\
&=1+q\left(\frac32\sin^2t-1\right)
 +q^2\left(\frac{15}{8}\sin^4t-\frac32\sin^2t\right)\\
&\quad+q^3\left(\frac{35}{16}\sin^6t-\frac{15}{8}\sin^4t\right)+O(q^4).
\end{aligned}
$$

ここで $O(q^4)$ は $q\to0$ のとき全緯度に一様な剰余の次数を表します。三角恒等式

$$
\begin{aligned}
\sin^2t&=\frac{1-\cos2t}{2},\\
\sin^4t&=\frac{3-4\cos2t+\cos4t}{8},\\
\sin^6t&=\frac{10-15\cos2t+6\cos4t-\cos6t}{32}
\end{aligned}
$$

を代入します。例えば $q^2$ の係数は

$$
\frac{15}{8}\frac{3-4\cos2t+\cos4t}{8}
-\frac32\frac{1-\cos2t}{2}
=-\frac{3}{64}-\frac{3}{16}\cos2t+\frac{15}{64}\cos4t
$$

となります。$q^3$ の係数も展開すると $-5/256-45\cos2t/512+45\cos4t/256-35\cos6t/512$ です。$\int_0^\phi\cos(2jt)dt=\sin(2j\phi)/(2j)$ を使えば、積分を初等関数に直せます。

<a id="thm-geod11-meridian-series"></a>
<!-- formal-statement-start -->
> **定理（子午線弧長の離心率6次級数と誤差上界）**
> $a\ge b>0$、$q=e^2=1-b^2/a^2\in[0,1)$、$|\phi|\le\pi/2$ とする。符号付き[子午線弧長](#def-geod11-meridian-arc) $s(\phi)$ を $q^3=e^6$ まで近似する式 $s_3(\phi)$ は

$$
\boxed{\begin{aligned}
s_3(\phi)=a\bigg[&\left(1-\frac q4-\frac{3q^2}{64}-\frac{5q^3}{256}\right)\phi\\
&-\left(\frac{3q}{8}+\frac{3q^2}{32}+\frac{45q^3}{1024}\right)\sin2\phi\\
&+\left(\frac{15q^2}{256}+\frac{45q^3}{1024}\right)\sin4\phi
-\frac{35q^3}{3072}\sin6\phi\bigg].
\end{aligned}}
$$

> さらに、任意の $\phi_0,\phi_1\in[-\pi/2,\pi/2]$ について、区間差の打切り誤差は

$$
\left|\{s(\phi_1)-s(\phi_0)\}
-\{s_3(\phi_1)-s_3(\phi_0)\}\right|
\le a|\phi_1-\phi_0|q^4\left\{\frac{315}{128(1-q)^{11/2}}+\frac{35}{16}\right\}.
$$
<!-- formal-statement-end -->

**証明の見取り図。** 上の三角恒等式で $M$ の3次多項式を積分します。誤差は、$g(x)$ の4階微分から Taylor の剰余を点ごとに押さえ、その上界を緯度区間で積分します。

<!-- proof-start -->
### 証明

前段で求めた $q^0,q^1,q^2,q^3$ の各係数を $0$ から $\phi$ まで積分します。定数項の積分は $\phi$、$\cos2t,\cos4t,\cos6t$ の積分は順に $\sin2\phi/2,\sin4\phi/4,\sin6\phi/6$ です。したがって上記の $s_3$ を得ます。

剰余を明示するため、$x=q\sin^2t\in[0,q]$ として、$g^{(4)}(x)=(945/16)(1-x)^{-11/2}$ を用います。Taylor の剰余の絶対値は

$$
|g(x)-\{1+3x/2+15x^2/8+35x^3/16\}|
\le\frac{315}{128}\frac{x^4}{(1-q)^{11/2}}.
$$

これに $a(1-q)$ を掛けると、$M$ と $a(1-q)$ 倍の3次 Taylor 多項式との差が得られます。一方、その積を $q^3$ までに切る際には、$-a(35/16)q^4\sin^6t$ も落としています。$1-q\le1$、$\sin^2t\le1$ から

$$
|M(t)-s_3'(t)|\le aq^4\left\{\frac{315}{128(1-q)^{11/2}}+\frac{35}{16}\right\}.
$$

区間 $[\phi_0,\phi_1]$ 上でこれを積分し、積分の絶対値を絶対値の積分で押さえると所望の誤差境界です。$q=0$ では $s_3=a\phi=s$ となり、剰余も厳密に0です。
<!-- proof-end -->

**何が保証されるか。** この上界は $q$ を固定したときの最悪値なので、実際の誤差よりかなり大きい場合があります。$q<1$ の全範囲で展開は収束しますが、$q$ が1に近い極端に細長い楕円体では少数項の近似は有用とは限りません。地球程度の扁平率では $q$ が約0.0067なので、$q^4$ は約 $2.0\times10^{-9}$ です。

---

## 3. 緯線の距離と東西の方位

次に緯度を固定して経度だけを変えます。$N(\phi)\cos\phi$ が東西の長さ換算係数ですが、これは単なる「地球の半径」ではなく、緯線の円の半径です。[GEOD3 の楕円体表示](../GEOD3/index.md#prop-geod3-surface-parameterization)では、高さ0で緯線の点は、平面座標 $(X,Y)=(N(\phi)\cos\phi\cos\lambda,N(\phi)\cos\phi\sin\lambda)$ と表されます。

<a id="def-geod11-parallel-arc"></a>
<!-- formal-statement-start -->
> **定義（有向緯線弧）**
> $a\ge b>0$ の回転楕円体の非極点で測地緯度を一定に保ち、始点経度から終点経度まで連続的にたどる曲線を**有向緯線弧**という。経度の連続表示を選んで周回数も定め、その差を

$$
\Delta\lambda=\lambda_1-\lambda_0
$$

> と書く。正の差は東向き、負の差は西向きを表す。
<!-- formal-statement-end -->

<!-- definition-example-start: def-geod11-parallel-arc -->
**定義の確認**　球面 $R=10$ m、$\phi=\pi/3$、$\lambda_0=0$、$\lambda_1=\pi/2$ なら、緯線半径は $R\cos(\pi/3)=5$ m です。経度増分は正の $\pi/2$、したがって半径5 mの円の4分の1を東向きにたどります。極 $\phi=\pi/2$ では半径が0となり、経度は点を識別しないので定義域から除外した理由も分かります。
<!-- definition-example-end -->

<a id="prop-geod11-parallel-length"></a>
<!-- formal-statement-start -->
> **命題（緯線の弧長・周長・方位角）**
> $a\ge b>0$ の回転楕円体の非極点 $|\phi|<\pi/2$ で、有向[緯線弧](#def-geod11-parallel-arc)の経度増分をラジアン単位の $\Delta\lambda$ とする。弧長 $L_{\parallel}$ と緯線の全周長 $C_{\parallel}$ は

$$
L_{\parallel}=N(\phi)\cos\phi\,|\Delta\lambda|,
\qquad C_{\parallel}=2\pi N(\phi)\cos\phi.
$$

> 局所水平面上で北から東回りに測る方位角は、$\Delta\lambda>0$ の向きが $90^\circ$、$\Delta\lambda<0$ の向きが $270^\circ$ である。$\Delta\lambda=0$ なら進行方向の方位角は定まらない。
<!-- formal-statement-end -->

**証明の見取り図。** $\phi'=0$ を[GEOD4 の弧長積分式](../GEOD4/index.md#prop-geod4-curve-length)へ代入します。方位角は[GEOD4 の東・北方向の偏微分式](../GEOD4/index.md#prop-geod4-tangent-vectors)と経度増加の向きを対応させます。

<!-- proof-start -->
### 証明

$\lambda(t)=\lambda_0+t\Delta\lambda$、$\phi(t)=\phi$ と置くと、$\phi'=0$、$\lambda'=\Delta\lambda$ です。従って[楕円体上の曲線の長さ](../GEOD4/index.md#prop-geod4-curve-length)から

$$
L_{\parallel}=\int_0^1\sqrt{N(\phi)^2\cos^2\phi\,(\Delta\lambda)^2}\,dt
=N(\phi)\cos\phi\,|\Delta\lambda|.
$$

一周では $\Delta\lambda=2\pi$ を代入します。また[GEOD4 の座標偏微分式](../GEOD4/index.md#prop-geod4-tangent-vectors)により、経度を増やす速度は $\boldsymbol r_\lambda=N\cos\phi\,\boldsymbol e_{\mathrm E}$ です。係数は非極点で正なので、増加方向は東、減少方向は西です。北を0°とする方位角の約束に従い、それぞれ90°、270°となります。
<!-- proof-end -->

**最短経路との区別。** 緯線は緯度を一定に保って歩く経路であり、二地点を結ぶ最短経路とは一般に一致しません。例えば球面の北緯60°の二点を経度180°違いで結ぶと、緯線の半周は $\pi R/2$ ですが、北極を通る大円弧は $\pi R/3$ です。したがって緯線長をそのまま二点間の最短距離と呼ぶことはできません。最短経路を支える測地線の正式な定義と方程式、および局所性と大域的最短性の違いは次章で扱います。

---

## 4. 地表・楕円体・投影平面の距離を分ける

実測の測距儀が得る斜距離と、楕円体計量の弧長は違う対象です。まず局所的な平面近似で傾斜を取り除き、次に観測点の**楕円体高**を使って楕円体面へ戻し、最後に投影座標の局所縮尺で平面へ移します。地表が起伏すれば、途中の式は経路全体で積分する必要があります。

<a id="prop-geod11-distance-chain"></a>
<!-- formal-statement-start -->
> **命題（局所斜距離の水平成分と曲面還元の境界）**
> 局所直交座標で二点間の直線斜距離を $D>0$、その座標の鉛直成分差を $\Delta u$ とし、$|\Delta u|\le D$ とする。この座標での水平投影直線長は

$$
D_H=\sqrt{D^2-(\Delta u)^2}.
$$

> ただし、この直線長は曲面上の弧長とは異なるので、一般に一定楕円体高の面の弧長と同一視できない。鉛直線の偏差、有限長の弦と弧、屈折、器械高、起伏、測地基準の違いは、必要精度に応じて別に処理する。
<!-- formal-statement-end -->

**証明の見取り図。** 三次元の直交成分の Pythagoras の定理です。曲面の弧長は[GEOD6 の局所距離還元](../GEOD6/index.md#prop-geod6-height-reduction)で別に求めるので、直線の分解だけでは曲面還元は終わりません。

<!-- proof-start -->
### 証明

直線変位を局所鉛直成分 $\Delta u$ と、それに直交する水平変位ベクトル $\boldsymbol v_H$ に分けます。内積の交差項が0なので

$$
D^2=\|\boldsymbol v_H+\Delta u\,\boldsymbol e_u\|^2
=\|\boldsymbol v_H\|^2+(\Delta u)^2,
\qquad D_H=\|\boldsymbol v_H\|.
$$

正の平方根を取ると式を得ます。水平直線は曲面上の弧ではないため、この長さだけから楕円体の弧長は確定しません。
<!-- proof-end -->

一定楕円体高での局所弧長の扱いは、新しく定理を作る必要はありません。[GEOD6 の距離還元命題](../GEOD6/index.md#prop-geod6-height-reduction)がすでに、同じ角度変化に対する高さ面と楕円体面の関係を導いています。具体的に

$$
\begin{aligned}
ds_{h,\mathrm{NS}}&=(M+h)|d\phi|,&ds_{0,\mathrm{NS}}&=M|d\phi|,\\
ds_{h,\mathrm{EW}}&=(N+h)\cos\phi|d\lambda|,&ds_{0,\mathrm{EW}}&=N\cos\phi|d\lambda|.
\end{aligned}
$$

であるから、分母が正で $\cos\phi>0$ のとき、南北方向の還元係数は $M/(M+h)$、東西方向は $N/(N+h)$ です。ただし水平直線 $D_H$ にこの比を直接掛けられるのは、弦と弧を同一視できる精度の**局所近似**に限ります。

**有限弦と弧の補正の大きさ。** 半径 $R$ の円で中心角 $\theta>0$ の弧長は $R\theta$、両端の弦長は $2R\sin(\theta/2)$。$\sin x=x-x^3/6+O(x^5)$ を代入すると

$$
R\theta-2R\sin(\theta/2)
=\frac{R\theta^3}{24}+O(R\theta^5)
=\frac{L_{\mathrm{arc}}^3}{24R^2}+O(L_{\mathrm{arc}}^5/R^4).
$$

したがって曲率半径が十分大きく基線が短い場合に限って弦と弧を近似的に同一視できます。これは円での検算であり、起伏のある地形や長距離の楕円体測地線にそのまま適用する式ではありません。

例えば緯度45°、GRS80、一定楕円体高150 mで、**すでに高さ面上の子午線方向弧長として**1,000 m が得られた場合、$M(45^\circ)\simeq6,367,381.816$ m を点の近くで固定すれば、対応する楕円体の局所弧長は $1000M/(M+150)\simeq999.97644$ mです。地表で観測した斜距離が1,000 mというだけではこの計算はできません。また正標高を $h$ と見なさず、必要なら[GEOD6 の高さ関係](../GEOD6/index.md#prop-geod6-height-relation)で基準を合わせます。

投影平面の距離にはさらに投影の局所縮尺が加わります。例えば測地線方向の微小楕円体長を $ds_0$、その方向の投影上の微小長を $d\ell_p$ とし、局所縮尺を $k=d\ell_p/ds_0$ と定義すれば $d\ell_p=k\,ds_0$ です。投影上の有限直線距離と投影された曲線の長さも区別します。$k$ の緯度・経度・方向依存性は GEOD13 以降で調べます。

---

## 5. 級数から独立した数値積分で検算する

級数の式を別の級数へ代入しても独立の検算にはなりません。ここでは元の $M(t)$ を直接評価して積分します。初等的な方法の一つは、偶数 $m$ 個の等幅小区間を取る**複合 Simpson 則**です。$[0,\phi]$（$\phi>0$）に対し $h=\phi/m$、$t_j=jh$ と置いて

$$
S_m=\frac h3\left\{M(t_0)+M(t_m)
+4\sum_{\substack{1\le j<m\\j\ \mathrm{odd}}}M(t_j)
+2\sum_{\substack{2\le j<m\\j\ \mathrm{even}}}M(t_j)\right\}.
$$

重み $1,4,1$ は幅 $2h$ の一区間で3点を通る二次補間多項式を積分して得られます。左右対称な三点 $-h,0,h$ に対し $p(t)=At^2+Bt+C$ とすると、$p(0)=y_0$、$p(\pm h)=y_{\pm}$ から $A=(y_- -2y_0+y_+)/(2h^2)$、$C=y_0$ です。積分すれば

$$
\int_{-h}^h p(t)dt
=\frac{2h^3}{3}A+2hC
=\frac h3(y_-+4y_0+y_+).
$$

隣接する区間の端点を合算すると上の複合式です。これは数値近似なので $m$ を増やした際の収束も調べます。

**GRS80 による赤道から北緯45°までの比較。** $a=6,378,137$ m、$f=1/298.257222101$、$q=2f-f^2\simeq0.0066943800229008$、$\phi=\pi/4$ を使用し、下表はメートル単位です。

| 方法 | $s(45^\circ)$ の計算値 |
| --- | ---: |
| 複合 Simpson（$m=16$） | 4,984,944.369572 |
| 複合 Simpson（$m=64$） | 4,984,944.377826 |
| 複合 Simpson（$m=128$） | 4,984,944.377856 |
| 元の被積分関数の高精度数値積分 | 4,984,944.377858 |
| $e^6$ 級数 $s_3$ | 4,984,944.378112 |

級数と数値積分の差は約 $0.000254$ m（0.254 mm）です。[級数定理](#thm-geod11-meridian-series)の一様誤差上界を同じ $a,q,\phi$ に代入すると約0.048 mで、実際の差が確かに上界より小さいことを確認できます。なお高精度数値積分は、級数式でなく $M$ 自体を積分した数値です。

球面極限 $q=0$ では $M=a$ が一定になり、Simpson 則も級数も厳密に $s(\phi)=a\phi$ を返します。これは実装時に最初に試すべき単位テストです。

---

## 6. 演習：角度から弧長を作り、距離の基準をそろえる

### Level A：定義・単位・方向

#### A1. 球面の子午線弧長

半径 $R=6,000$ km の球面で、同じ子午線の測地緯度 $-30^\circ$ から $45^\circ$ へ北上する。符号付き弧長差と実際の弧長を求めよ。

- Level: A
- ID: GEOD11-A1

<!-- solution-start -->
**詳細解答。** 球面なら[子午線弧長の定義](#def-geod11-meridian-arc)に $M=R$ を入れ、$s(\phi)=R\phi$ です。角度差は $45^\circ-(-30^\circ)=75^\circ=5\pi/12$ rad なので

$$
\Delta s=6000\frac{5\pi}{12}=2500\pi\ \mathrm{km},
\qquad L=|\Delta s|=2500\pi\ \mathrm{km}.
$$

向きが北なので $\Delta s$ は正です。逆向きなら同じ長さで符号だけ反転します。
<!-- solution-end -->

#### A2. 緯線一周と極限

半径 $R=10$ km の球面で緯度 $60^\circ$ の緯線の全周長と、同緯線を経度差90°だけ東へ進む弧長を求めよ。極へ近づけたときの周長も述べよ。

- Level: A
- ID: GEOD11-A2

<!-- solution-start -->
**詳細解答。** 球面の $N=R$ であり、$\cos60^\circ=1/2$ です。[緯線長の命題](#prop-geod11-parallel-length)から

$$
C_{\parallel}=2\pi(10)\frac12=10\pi\ \mathrm{km},
\qquad L_{\parallel}=10\frac12\frac\pi2=\frac{5\pi}{2}\ \mathrm{km}.
$$

極限 $\phi\to\pi/2$ では $\cos\phi\to0$、$N=10$ は有限なので周長は0へ近づきます。極そのものでは経度は一意でありません。
<!-- solution-end -->

#### A3. 緯線の方位角

非極点の緯度 $20^\circ$ の緯線上を、経度120°から119°へ経度の小さい向きに歩く。局所北基準で東回りの方位角を求め、進行方向が子午線と直交する理由を述べよ。

- Level: A
- ID: GEOD11-A3

<!-- solution-start -->
**詳細解答。** 経度差は $\Delta\lambda=-1^\circ=-\pi/180<0$ rad です。[緯線の弧長・周長・方位角](#prop-geod11-parallel-length)より西向きの270°です。[GEOD4 の座標偏微分式](../GEOD4/index.md#prop-geod4-tangent-vectors)では緯度方向が北の $\boldsymbol e_{\mathrm N}$、経度方向が東の $\boldsymbol e_{\mathrm E}$ で、その内積は0です。西向きは $-\boldsymbol e_{\mathrm E}$ なので、同様に北と直交します。
<!-- solution-end -->

#### A4. 斜距離の水平成分

一つの局所直交座標で測った直線斜距離が $D=500$ m、鉛直成分差が $\Delta u=300$ m である。水平直線成分を求め、それが自動的に楕円体弧長になるか答えよ。

- Level: A
- ID: GEOD11-A4

<!-- solution-start -->
**詳細解答。** $|\Delta u|\le D$ が成立します。[局所斜距離の命題](#prop-geod11-distance-chain)の直交分解から

$$
D_H=\sqrt{500^2-300^2}=\sqrt{250000-90000}
=\sqrt{160000}=400\ \mathrm m.
$$

これは接平面に水平投影した**直線**の長さであり、曲面の有限弧長ではありません。高さ、曲率、経路、観測補正なしに楕円体弧長400 mとは言えません。
<!-- solution-end -->

### Level B：導出・誤差・反例

#### B1. $e^4$ までの級数を再導出

$q=e^2\in[0,1)$ を持つ回転楕円体で $M(t)=a(1-q)(1-q\sin^2t)^{-3/2}$ とする。$q^2=e^4$ までの $s(\phi)$ の近似を、積分の出発点から導け。

- Level: B
- ID: GEOD11-B1

<!-- solution-start -->
**詳細解答。** $g(x)=(1-x)^{-3/2}$ の Taylor 展開 $g(x)=1+3x/2+15x^2/8+O(x^3)$ に $x=q\sin^2t$ を代入します。さらに $1-q$ を掛けて $q^2$ まで整理すると

$$
\frac{M(t)}a=1+q\left(\frac32\sin^2t-1\right)
+q^2\left(\frac{15}{8}\sin^4t-\frac32\sin^2t\right)+O(q^3).
$$

$\sin^2t=(1-\cos2t)/2$ と $\sin^4t=(3-4\cos2t+\cos4t)/8$ を代入したあと、$0$ から $\phi$ まで項別に積分すれば

$$
s_2(\phi)=a\left[\left(1-\frac q4-\frac{3q^2}{64}\right)\phi
-\left(\frac{3q}{8}+\frac{3q^2}{32}\right)\sin2\phi
+\frac{15q^2}{256}\sin4\phi\right].
$$

これは[級数定理](#thm-geod11-meridian-series)の $q^3$ 項を削った式と一致します。
<!-- solution-end -->

#### B2. 球面で緯線が最短ではない例

半径 $R>0$ の球面の北緯60°で経度0°と180°の点を考える。緯線の半周と北極を経由する二本の子午線弧の合計を比べ、緯線弧長を両点間の最短路と同一視できないことを示せ。

- Level: B
- ID: GEOD11-B2

<!-- solution-start -->
**詳細解答。** 緯線の半径は $R\cos(\pi/3)=R/2$ です。[緯線弧長](#prop-geod11-parallel-length)から半周は

$$
L_{\parallel}=\frac R2\pi=\frac{\pi R}{2}.
$$

一方、両点から北極までの緯度差は各30°、すなわち $\pi/6$ rad です。球の[子午線区間弧長](#prop-geod11-meridian-difference)は各 $R\pi/6$、合計は $L_{\mathrm{pole}}=\pi R/3$。$\pi R/3<\pi R/2$ なので、少なくともより短い別経路が存在します。最短路の一般論を先取りせず、これだけで緯線が最短とは言えないことを証明できます。
<!-- solution-end -->

#### B3. 高さ還元の方向差

楕円体のある非極点で子午線曲率半径 $M=6,360,000$ m、卯酉線曲率半径 $N=6,390,000$ m、一定楕円体高 $h=120$ m とする。同一の微小角度変位に対応する高さ面弧長が南北・東西とも1,000 mのとき、それぞれに対応する楕円体面弧長を求めよ。両方向の係数を同じとしない理由も述べよ。

- Level: B
- ID: GEOD11-B3

<!-- solution-start -->
**詳細解答。** すでに高さ面の弧長が与えられており、斜距離の変換は不要です。[方向別還元](#prop-geod11-distance-chain)へ代入すると

$$
\begin{aligned}
L_{0,\mathrm{NS}}&=1000\frac{6,360,000}{6,360,120}
=1000\left(1-\frac{120}{6,360,120}\right)\simeq999.9811324\ \mathrm m,\\
L_{0,\mathrm{EW}}&=1000\frac{6,390,000}{6,390,120}
=1000\left(1-\frac{120}{6,390,120}\right)\simeq999.9812210\ \mathrm m.
\end{aligned}
$$

緯度・経度で同じ角度を動かした際の高さ面と楕円体面の長さ比は、南北方向では $M$、東西方向では $N$ に依存します。一般の楕円体では $M\ne N$ なので係数は一致しません。
<!-- solution-end -->

#### B4. 近似誤差と丸め精度

GRS80 の $a=6,378,137$ m、$q=0.0066943800229008$ において、赤道から北緯45°までの $e^6$ 級数の誤差上界を[級数定理](#thm-geod11-meridian-series)から評価せよ。数値積分との差が0.3 mm未満だった場合、それは定理と矛盾するか。

- Level: B
- ID: GEOD11-B4

<!-- solution-start -->
**詳細解答。** $\phi_0=0$、$\phi_1=\pi/4$ を[級数の誤差境界](#thm-geod11-meridian-series)へ代入します。$q^4\simeq2.008\times10^{-9}$、$(1-q)^{-11/2}\simeq1.0377$ なので

$$
\begin{aligned}
E&\le(6,378,137)\frac\pi4\,q^4
\left\{\frac{315}{128(1-q)^{11/2}}+\frac{35}{16}\right\}\\
&\simeq0.0477\ \mathrm m\simeq47.7\ \mathrm{mm}.
\end{aligned}
$$

上界は全緯度での最悪値を積分したもので、実誤差そのものではありません。実際の差 $0.254$ mm は47.7 mmより小さいので矛盾しません。上界を「精度は必ず47.7 mm悪い」と誤読しないことが重要です。
<!-- solution-end -->

### Level C：赤道から観測点までの総合測地計算

#### C1. 子午線・緯線・高さ還元を一度に検算

GRS80 の $a=6,378,137$ m、$f=1/298.257222101$ を用いる。北緯45°、経度135°の非極点を起点とし、次を行え。角度は計算時にラジアンへ変換すること。

1. $q=e^2$ を $f$ から導き、$M(45^\circ)$、$N(45^\circ)$ を求めよ。
2. 赤道から同じ子午線上の45°までの弧長を $e^6$ 級数で計算し、独立の複合 Simpson 則（$m=128$）による積分値との差を求めよ。数値積分の定義式を書け。
3. 北緯45°上を経度135°から136°へ進む緯線の弧長と進行方位角を求めよ。この長さが測地線の最短距離であるとは限らない理由を述べよ。
4. この点の楕円体高が一定150 mの面で、南北方向の**弧長**1,000 mが得られた。局所的に $M$ を固定する近似の下で対応する楕円体面の弧長を求め、これを投影平面の1,000 mと同一視できない理由を述べよ。

- Level: C
- ID: GEOD11-C1

<!-- solution-start -->
**詳細解答。** （1）$b=a(1-f)$ なので $q=1-(b/a)^2=1-(1-f)^2=2f-f^2\simeq0.0066943800229008$ です。$\sin^2(\pi/4)=1/2$ を[GEOD4 の曲率半径式](../GEOD4/index.md#def-geod4-curvature-radii)へ代入して

$$
\begin{aligned}
N(45^\circ)&=\frac{6378137}{\sqrt{1-q/2}}\simeq6,388,838.290\ \mathrm m,\\
M(45^\circ)&=\frac{6378137(1-q)}{(1-q/2)^{3/2}}
\simeq6,367,381.816\ \mathrm m.
\end{aligned}
$$

（2）[級数定理](#thm-geod11-meridian-series)へ $\phi=\pi/4$ を代入します。この点では $\sin(2\phi)=1$、$\sin(4\phi)=0$、$\sin(6\phi)=-1$ であるから

$$
\begin{aligned}
s_3(\pi/4)=a\bigg[&\left(1-\frac q4-\frac{3q^2}{64}-\frac{5q^3}{256}\right)\frac\pi4\\
&-\left(\frac{3q}{8}+\frac{3q^2}{32}+\frac{45q^3}{1024}\right)
+\frac{35q^3}{3072}\bigg]
\simeq4,984,944.378112\ \mathrm m.
\end{aligned}
$$

数値積分には $M(t)=a(1-q)(1-q\sin^2t)^{-3/2}$ を**直接**使います。$h=(\pi/4)/128$、$t_j=jh$ とし、本章第5節の複合 Simpson 則から

$$
S_{128}=\frac h3\left\{M(0)+M(\pi/4)
+4\sum_{j=1,3,\ldots,127}M(jh)
+2\sum_{j=2,4,\ldots,126}M(jh)\right\}
\simeq4,984,944.377856\ \mathrm m
$$

を得ます。$s_3$ との差は約 $0.000256$ m、すなわち0.256 mmです。さらに刻みを細かくすれば数値積分が約4,984,944.377858 mへ収束することも確認できます。

（3）[緯線弧長](#prop-geod11-parallel-length)へ $\Delta\lambda=\pi/180$ を入れると

$$
L_{\parallel}=6,388,838.290\cdot\frac{1}{\sqrt2}\cdot\frac\pi{180}
\simeq78,846.835\ \mathrm m.
$$

経度は増えるので方位角は90°です。緯度一定という経路拘束を置いた長さであり、一般には楕円体の最短測地線距離とは一致しません。

（4）一定楕円体高 $h=150$ m と南北方向の弧長という仮定を[GEOD6 の還元](../GEOD6/index.md#prop-geod6-height-reduction)に適用します。

$$
L_{0,\mathrm{NS}}\simeq1000\frac{6,367,381.816}{6,367,381.816+150}
\simeq999.976443\ \mathrm m.
$$

ここでは1 km程度の小区間で $M$ を一定と近似しました。投影平面上の長さはさらに投影の縮尺・進行方向・座標帯に依存するので、この数値を平面距離1,000 mと同一視しません。
<!-- solution-end -->

---

## 7. 次章へ：最短経路には別の方程式が要る

本章で計算したのは、経度一定の子午線弧、緯度一定の緯線弧、および局所方向別の距離還元です。任意の二地点について、地表の弧長と平面上の直線長を一つの数字へ直すには「どの経路か」を指定する必要があります。GEOD12 では楕円体の計量に基づいて測地線の方程式を立て、始点・方位角・距離から終点を求める順問題と、二点から距離・方位角を求める逆問題へ進みます。
