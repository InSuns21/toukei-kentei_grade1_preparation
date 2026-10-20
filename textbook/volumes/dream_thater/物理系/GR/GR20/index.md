# GR20 Shapiro時間遅延

<!-- definition-example-audit: strict -->

[GR16のSchwarzschild真空解](../GR16/index.md#thm-gr16-schwarzschild)を使うと、光が曲がることだけでなく、信号が届くまでの時間も求められます。[GR18の光線軌道](../GR18/index.md#prop-gr18-null-radial)では、光的条件と保存量から進行方向を決めました。しかし、軌道の形だけでは「何秒後に反射信号が戻るか」は分かりません。惑星や太陽の近くを通るレーダー信号について、平坦時空の予測より伝播に時間がかかる現象が、Shapiro時間遅延として知られています。本章では比較の規約を整えてから数式で定義します。

時間を比べるには注意が要ります。座標時刻 $t$ は時計の固有時そのものではありません。また、「平坦時空なら何秒か」という比較には、端点や距離を何で固定するかの約束が必要です。本章ではまず光的測地線に沿う **座標時間の厳密な積分式** を導き、次に無限遠の時間と整合する等方座標で、**固定端点間の弱場一次補正** を求めます。最後に静止観測者の時計で測る往復時間へ戻します。

以下、4次元、計量の符号 $(-,+,+,+)$、$G,c>0$、中心質量 $M>0$、Schwarzschild半径 $r_s=2GM/c^2$ とし、宇宙定数と外部物質の応力テンソルは零です。時空領域は $r>r_s$ の静的外部で、反射器・送信器は指定する座標上で静止していると仮定します。重力場は時間に依存せず、信号の反作用は無視します。

## 1. 光の軌道から伝播時間を取り出す

[Schwarzschild計量](../GR16/index.md#thm-gr16-schwarzschild)を面積半径 $r$ と無限遠で規格化した $x^0=ct$ を用いて

$$
ds^2=-f(r)c^2dt^2+\frac{dr^2}{f(r)}
+r^2(d\theta^2+\sin^2\theta\,d\phi^2),
\qquad f(r)=1-\frac{r_s}{r}>0
$$

と書きます。球対称性により光線を赤道面 $\theta=\pi/2$ に取ります。[GR18で確認した赤道面保存とKilling保存量](../GR18/index.md#prop-gr18-null-radial)を再利用し、アフィンパラメータを $\lambda$、その微分を点で表すと

$$
\mathcal E=f(r)\dot x^0>0,\qquad
\mathcal L=r^2\dot\phi,\qquad
b=\frac{|\mathcal L|}{\mathcal E}\geq0
$$

が成り立ちます。$\mathcal E$ は $x^0$ の長さ単位を用いた保存量で、$b$ は長さの次元を持つ衝突パラメータです。$\mathcal L$ の符号は光線の向きに依存しますが、半径方向の式には $b^2$ だけが現れます。

静的時空で伝播時間を比較するには、同じ規格化の $t$ を両端で用いる必要があります。そこで、今の座標の下での時間差を明示しておきます。

<a id="def-gr20-coordinate-flight-time"></a>

<!-- formal-statement-start -->
> **定義（Schwarzschild座標伝播時間）**  
> $r>r_s$ 内の未来向き光的測地線の送信事象 $A$ と受信事象 $B$ に対し、無限遠で規格化されたSchwarzschild時間座標の差

$$
T_{AB}:=t(B)-t(A)>0
$$

> を、この座標系での座標伝播時間とする。一般に $T_{AB}$ は両端の静止時計が直接表示する固有時間差と同一ではない。
<!-- formal-statement-end -->

<!-- definition-example-start: def-gr20-coordinate-flight-time -->
**定義の確認**。 $r=r_A>r_s$ に静止する時計では $dr=d\theta=d\phi=0$ です。[GR17の静止時計の固有時換算](../GR17/index.md#prop-gr17-static-clock)と同じように計量を代入すると $ds^2=-f(r_A)c^2dt^2=-c^2d\tau_A^2$ なので $d\tau_A=\sqrt{f(r_A)}\,dt$。例えば $r_A=4r_s$ なら同じ座標時間 $T$ に対して時計の経過は $\sqrt{3/4}\,T$ です。

定義で要求した光的測地線についても確かめます。半径方向に外向きに進む光では $d\theta=d\phi=0$、$ds^2=0$ なので、$r_2>r_1>r_s$ の二事象を結ぶとき

$$
0=-fc^2dt^2+\frac{dr^2}{f},
\qquad
dt=\frac{dr}{cf}>0,
\qquad
T_{12}=\frac1c\int_{r_1}^{r_2}\frac{dr}{f(r)}>0.
$$

この $T_{12}$ が同じ規格化された座標 $t$ の送受信時刻の差です。一方、静止時計の固有時率は位置によって $\sqrt{f}$ 倍されるため、両者を取り違えてはいけません。
<!-- definition-example-end -->

光的条件に保存量を代入すると、[GR18の一階積分](../GR18/index.md#prop-gr18-null-radial)より

$$
0=-f\dot x^{0\,2}+\frac{\dot r^2}{f}+r^2\dot\phi^2,
\qquad
\dot r^2=\mathcal E^2\left(1-\frac{f(r)b^2}{r^2}\right).
$$

$\dot x^0=\mathcal E/f$ を使い、折返し点ではない区間で $\dot r$ を割ると、進行方向の符号付きで $dt/dr$ が決まります。

<a id="prop-gr20-null-time-integral"></a>

<!-- formal-statement-start -->
> **命題（Schwarzschild光線の座標時間積分）**  
> $r>r_s$ の未来向き赤道面光的測地線で $\mathcal E>0$、衝突パラメータ $b\geq0$ が一定であるとする。半径が単調に変わり、

$$
1-\frac{f(r)b^2}{r^2}>0
$$

> を満たす区間では、増加する半径方向について

$$
\frac{dt}{dr}
=\frac{1}{c f(r)\sqrt{1-f(r)b^2/r^2}}.
$$

> 半径が減少する区間では右辺に負号を付ける。折返し半径 $r_0>r_s$ が存在する場合は $1-f(r_0)b^2/r_0^2=0$ を課し、時間積分を $r_0$ の両側に分ける。
<!-- formal-statement-end -->

### 証明の見取り図

光的条件で半径速度を求め、時間方向の保存量で割ります。折返し点で $dr/d\lambda=0$ になることと、光線がそこで止まることを区別します。

<!-- proof-start -->
### 証明

$dt/d\lambda=\dot x^0/c=\mathcal E/(cf)$ です。一方、上の光的一階積分から

$$
\dot r=\pm\mathcal E\sqrt{1-fb^2/r^2}.
$$

従って $\dot r\ne0$ の区間で連鎖律を使うと

$$
\frac{dt}{dr}
=\frac{dt/d\lambda}{dr/d\lambda}
=\pm\frac{1}{cf\sqrt{1-fb^2/r^2}}.
$$

$\mathcal E$ は正で、$f>0$ ですから、未来向きの $t$ は増加します。折返し点では分母の平方根が零となり $t$ を $r$ の滑らかな関数として表すことはできませんが、単純な折返しなら被積分関数は $(r-r_0)^{-1/2}$ 型で片側積分が収束します。臨界円光子軌道に近づく場合はこの単純根の議論は使えず、無条件の有限性を主張しません。$\square$
<!-- proof-end -->

**直接例（半径方向）。** $b=0$ では $dt/dr=1/(cf)$ です。$r_2>r_1>r_s$ を外向きに進む光について

$$
\begin{aligned}
T_{12}
&=\frac1c\int_{r_1}^{r_2}\frac{dr}{1-r_s/r}\\
&=\frac1c\int_{r_1}^{r_2}
\left(1+\frac{r_s}{r-r_s}\right)dr\\
&=\frac{r_2-r_1}{c}
+\frac{r_s}{c}\log\frac{r_2-r_s}{r_1-r_s}.
\end{aligned}
$$

この式の第一項を平坦な面積半径座標での時間と比較すれば、第二項は正です。しかし $r$ を固定した比較と、次節で用いる等方座標 $\rho$ の端点を固定した比較は異なります。**座標の選択を無言で切り替えて「時間遅延」を同一視してはいけません。**

## 2. 平坦な直線と比較しやすい等方座標

光が太陽などの中心天体の近くをかすめるとき、送受信点を結ぶ平坦な直線を基準に使いたいところです。Schwarzschildの面積半径 $r$ は、球面の面積が $4\pi r^2$ となる半径で、空間の線素は $dr^2/f+r^2d\Omega^2$。この空間部分は通常のEuclid距離の定数倍にはなっていません。そこで空間方向を一つの係数で揃える **等方半径** $\rho$ を導入します。

$r_s>0$ として $\rho>r_s/4$ の範囲で、$a:=r_s/(4\rho)$ と置きます。次の変換を使うと静的外部の空間部分がEuclid計量の共通因子倍になります。

<a id="prop-gr20-isotropic-coordinates"></a>

<!-- formal-statement-start -->
> **命題（Schwarzschild静的外部の等方表示）**  
> $M>0$、$r>r_s$ のSchwarzschild静的外部で

$$
r=\rho\left(1+\frac{r_s}{4\rho}\right)^2,
\qquad \rho>\frac{r_s}{4}
$$

> と座標変換する。$a=r_s/(4\rho)$ とすれば、外部計量は

$$
ds^2=-\left(\frac{1-a}{1+a}\right)^2c^2dt^2
+(1+a)^4\left(d\rho^2+\rho^2d\Omega^2\right).
$$

> $\rho\gg r_s$ の領域で、直交座標のEuclid線素 $d\ell^2=d\rho^2+\rho^2d\Omega^2$ を使うと、未来向き光線には局所的に

$$
c\,dt=\frac{(1+a)^3}{1-a}\,d\ell
=\left(1+\frac{r_s}{\rho}
+O\left(\frac{r_s^2}{\rho^2}\right)\right)d\ell
$$

> が成り立つ。$d\ell$ は光路に沿う正の空間長さ要素とする。
<!-- formal-statement-end -->

### 証明の見取り図

変換の微分、$f(r)$ の書換え、空間二項の共通因子を順に確認します。最後に光的条件を解き、弱場の一次係数が $1$ になることを検算します。

<!-- proof-start -->
### 証明

$r=\rho(1+a)^2$ で $da/d\rho=-a/\rho$ です。積の微分から

$$
\frac{dr}{d\rho}
=(1+a)^2-2a(1+a)
=(1+a)(1-a)=1-a^2.
$$

また $r_s/r=4a/(1+a)^2$ を使うと

$$
f(r)=1-\frac{4a}{(1+a)^2}
=\frac{(1-a)^2}{(1+a)^2}.
$$

したがって

$$
\frac{dr^2}{f(r)}
=\frac{(1-a^2)^2}{(1-a)^2/(1+a)^2}\,d\rho^2
=(1+a)^4d\rho^2,
\quad r^2d\Omega^2=\rho^2(1+a)^4d\Omega^2.
$$

元の計量へ代入して等方表示を得ます。光的条件 $ds^2=0$ を未来向きで解くと $c\,dt=(1+a)^3(1-a)^{-1}d\ell$。$a\to0$ では

$$
\frac{(1+a)^3}{1-a}
=(1+3a+O(a^2))(1+a+O(a^2))
=1+4a+O(a^2)
$$

です。$4a=r_s/\rho$ を代入して表示を得ます。$\rho>r_s/4$ により $1-a>0$ で、平方根の符号選択も正当です。$\square$
<!-- proof-end -->

**光の遅さを二つの係数に分ける。** 等方座標では時間係数の平方根が $(1-a)/(1+a)=1-2a+O(a^2)$、空間係数の平方根が $(1+a)^2=1+2a+O(a^2)$ です。光的条件を解くと空間係数を時間係数で割るため

$$
\frac{1+2a+O(a^2)}{1-2a+O(a^2)}
=1+4a+O(a^2)=1+\frac{r_s}{\rho}
+O\left(\frac{r_s^2}{\rho^2}\right)
$$

となります。弱場一次の伝播補正には、時計を遅くする時間成分だけでなく、空間の長さを変える成分も同じ次数で寄与します。$g_{00}$ だけを残して平坦な空間長さを使うと、一般相対論の一次係数を半分にしてしまいます。

**定義から計算への橋渡し。** $\rho$ は面積半径ではありません。式 $r=\rho(1+a)^2$ によって計量の空間成分が共通係数を持つことを確かめたからこそ、弱場の伝播時間を **Euclid直線の線積分** で近似できます。一方で面積半径 $r$ と等方半径 $\rho$ は $r=\rho+r_s/2+O(r_s^2/\rho)$ だけずれます。

## 3. Shapiro時間遅延の弱場一次式

等方座標の空間部分を $(x,y,z)$ と表し、送信点 $A$、受信点 $B$ の空間座標を **重力場の強さを変えても固定** します。端点を結ぶEuclid直線が原点を通らず、その原点からの最短距離を $b_0>0$ とします。ここでの $b_0$ は *基準直線のEuclid衝突距離* であって、[GR18の保存量比としての衝突パラメータ](../GR18/index.md#def-gr18-impact-parameter) $b$ と同じものだと厳密に主張しているわけではありません。一次計算には両者の零次の一致で十分です。

直線に沿って最接近点を $z=0$、$A$ 側を $z_A<0$、$B$ 側を $z_B>0$ とし、

$$
\rho(z)=\sqrt{b_0^2+z^2},\quad
R_A=\sqrt{b_0^2+z_A^2},\quad
R_B=\sqrt{b_0^2+z_B^2},\quad D=z_B-z_A
$$

とします。$R_A,R_B$ は等方座標での原点からのEuclid距離、$D$ は端点間のEuclid距離であり、$D>0$ です。基準線の最短距離が $b_0\gg r_s$ なら光路全体で弱場展開ができます。強い重力場の多重像・光子球に近い軌道は扱いません。端点を固定する境界値問題なので、比較する重力場を変化させると光線の出発角度も変わり得ます。出発角度を固定する別の問題とは区別します。

まず比較対象を定義します。

<a id="def-gr20-shapiro-excess"></a>

<!-- formal-statement-start -->
> **定義（固定等方座標端点のShapiro座標時間超過）**  
> 静的Schwarzschild外部で等方座標の空間端点 $A,B$ を固定し、対応する弱場の直進光路に連続する一つの光的測地線を選ぶ。その無限遠で規格化した時間座標での伝播時間を $T_{AB}$ とし、同じ端点を平坦時空のEuclid直線で結んだ時間 $D/c$ を基準に取る。差

$$
\Delta T_{\mathrm{Sh}}:=T_{AB}-\frac{D}{c}
$$

> を、この比較規約の下でのShapiro座標時間超過とする。この定義は「どんな座標であっても $T-D/c$ が不変」という主張ではない。
<!-- formal-statement-end -->

<!-- definition-example-start: def-gr20-shapiro-excess -->
**定義の確認**（平坦極限）。 $M\to0^+$ なら $r_s\to0$ で、等方計量は $ds^2=-c^2dt^2+d\ell^2$ へ収束します。固定端点を結ぶ直線では $c\,dt=d\ell$、$T_{AB}=D/c$。ゆえに $\Delta T_{\mathrm{Sh}}=0$ です。比較する端点と時計の規格化を同時に指定したことが重要です。
<!-- definition-example-end -->

<a id="thm-gr20-shapiro-first-order"></a>

<!-- formal-statement-start -->
> **定理（Shapiro時間遅延の弱場一次式）**  
> 上の定義に従い、中心質量 $M>0$、等方座標の固定端点 $A,B$、そのEuclid基準直線の最接近距離 $b_0>0$ を取る。$z_A<0<z_B$ とし、$r_s/b_0\to0^+$ で無次元比 $R_A/b_0,R_B/b_0$ を固定する。光線が基準直線から滑らかに摂動され、同じ端点を結ぶ弱場の唯一の直接光路を選べるとする。このとき一次の座標伝播時間超過は

$$
\boxed{
\Delta T_{\mathrm{Sh}}
=\frac{r_s}{c}
\log\frac{R_A+R_B+D}{R_A+R_B-D}
+O\left(\frac{r_s^2}{c b_0}\right).
}
$$

> 特に $R_A,R_B\gg b_0$ なら、先頭の対数は $\log(4R_AR_B/b_0^2)$ に近づく。係数は $r_s/c=2GM/c^3$ であり、上式は片道の結果である。
<!-- formal-statement-end -->

### 証明の見取り図

等方表示から $dt$ の一次式を作ります。光路は重力で曲がりますが、**固定端点間のEuclid直線は長さを停留させる**ので、光路そのものの一次変形は所要時間に一次寄与しません。したがって $1/\rho$ を基準直線上で積分すれば足ります。

<!-- proof-start -->
### 証明

[等方表示](#prop-gr20-isotropic-coordinates)から、実際の光路 $\gamma$ 上では

$$
T_{AB}[\gamma]
=\frac1c\int_\gamma
\left(1+\frac{r_s}{\rho}
+O\left(\frac{r_s^2}{\rho^2}\right)\right)d\ell.
$$

固定端点を結ぶ直線を $\gamma_0(z)=(b_0,0,z)$（$z_A\le z\le z_B$）とします。実際の光路を $\gamma=\gamma_0+\eta$、$\eta=O(r_s)$ とし、端点では $\eta(z_A)=\eta(z_B)=0$ です。直線の接ベクトルは一定なので、Euclid長さの一次変分は

$$
\delta\int_{\gamma_0}d\ell
=\int_{z_A}^{z_B}\frac{d\gamma_0}{dz}\cdot\frac{d\eta}{dz}\,dz
=\left[\frac{d\gamma_0}{dz}\cdot\eta\right]_{z_A}^{z_B}=0.
$$

重力項の経路変化も次数を確かめます。$I[\gamma]=\int |\gamma'(z)|/|\gamma(z)|\,dz$ と置き、$\rho_0=|\gamma_0|=\sqrt{b_0^2+z^2}$、$e_z=\gamma_0'=(0,0,1)$ とすれば、その一次変分は

$$
\delta I[\gamma_0;\eta]
=\int_{z_A}^{z_B}
\left(
\frac{e_z\cdot\eta'}{\rho_0}
-\frac{\gamma_0\cdot\eta}{\rho_0^3}
\right)dz.
$$

これは $|\gamma'|$ と $1/|\gamma|$ をそれぞれ微分した結果です。端点比を固定し、$\eta=O(r_s)$ かつ $\eta'=O(r_s/b_0)$ と滑らかに摂動するなら、$\rho_0\ge b_0$ と積分区間長 $D=O(b_0)$ から $\delta I=O(r_s/b_0)$。したがって $r_s I[\gamma]$ の光路変形による差は $O(r_s^2/b_0)$ です。Euclid長さの一次変分が零であることと合わせ、残余を $O(r_s^2/(cb_0))$ にまとめられます。従って

$$
T_{AB}
=\frac{D}{c}+\frac{r_s}{c}
\int_{z_A}^{z_B}\frac{dz}{\sqrt{b_0^2+z^2}}
+O\left(\frac{r_s^2}{c b_0}\right).
$$

積分には $\frac{d}{dz}\log(z+\sqrt{b_0^2+z^2})=1/\sqrt{b_0^2+z^2}$ を使います。$b_0>0$ なので対数の中身は両端で正であり、

$$
\begin{aligned}
\int_{z_A}^{z_B}\frac{dz}{\sqrt{b_0^2+z^2}}
&=\log\frac{z_B+R_B}{z_A+R_A}\\
&=\log\frac{(R_A-z_A)(R_B+z_B)}{b_0^2}.
\end{aligned}
$$

最後の等号では $(R_A+z_A)(R_A-z_A)=b_0^2$ を使いました。この対数は

$$
\log\frac{R_A+R_B+D}{R_A+R_B-D}
$$

とも一致します。実際、$D=z_B-z_A$ を分子・分母に代入すると

$$
\frac{R_A+R_B+D}{R_A+R_B-D}
=\frac{(R_A-z_A)+(R_B+z_B)}
{(R_A+z_A)+(R_B-z_B)}
$$

と書けます。ここで $P=R_A-z_A>0$、$Q=R_B+z_B>0$ とすると、$R_A+z_A=b_0^2/P$、$R_B-z_B=b_0^2/Q$ です。したがって

$$
\frac{R_A+R_B+D}{R_A+R_B-D}
=\frac{P+Q}{b_0^2/P+b_0^2/Q}
=\frac{PQ}{b_0^2}
=\frac{(R_A-z_A)(R_B+z_B)}{b_0^2}.
$$

分母が正であることも $P,Q,b_0>0$ から分かります。

$R_i\gg b_0$ なら $|z_i|=\sqrt{R_i^2-b_0^2}=R_i[1+O(b_0^2/R_i^2)]$ なので、対数の真数は $4R_AR_B/b_0^2$ に近づきます。以上で主張を得ます。$\square$
<!-- proof-end -->

**具体例（太陽をかすめる往復信号の前段階）。** 片道の基準直線の両端が原点から $R_A=R_B=10b_0$ にあり、$b_0=100r_s$ とします。すると $D=2\sqrt{R_A^2-b_0^2}=2\sqrt{99}\,b_0$。一次の片道遅延は

$$
\Delta T_{\mathrm{Sh}}\simeq\frac{r_s}{c}
\log\frac{20+2\sqrt{99}}{20-2\sqrt{99}}
=\frac{2r_s}{c}\log(10+\sqrt{99})>0.
$$

この場合 $\rho\ge b_0$ なので $r_s/\rho\le0.01$ で、対数の正符号を確認できます。大きな対数が現れても、近接する光子球の強場発散を計算したわけではありません。

## 4. 受信時計の読みへ変換する

座標時間はモデルを通じて計算するのに便利ですが、実際のレーダー観測者が読むのは送信とエコー受信という **同一時計上の二事象の固有時間差** です。静的な装置 $A$ から光を出し、別の静止装置 $B$ で直ちに反射させ、元の光路を戻るとします。静的計量の時間反転対称性から往路と復路の座標時間は等しく、合計は $2T_{AB}$ です。

<a id="prop-gr20-radar-echo"></a>

<!-- formal-statement-start -->
> **命題（静止時計での往復エコー時間）**  
> Schwarzschild静的外部の等方座標 $\rho_A>r_s/4$ に静止する時計 $A$ が光を送信し、静止した反射器 $B$ で遅滞なく反射して同じ経路を戻す。時間座標 $t$ は無限遠で規格化され、往路の座標伝播時間が $T_{AB}$ なら、時計 $A$ の往復固有時間は厳密に

$$
\Delta\tau_A
=2\frac{1-r_s/(4\rho_A)}{1+r_s/(4\rho_A)}T_{AB}.
$$

> さらに前定理の弱場・固定等方端点の条件の下では、$R_A=\rho_A$、$D=|B-A|_{\mathrm{Euclid}}$ として

$$
\boxed{
\Delta\tau_A-\frac{2D}{c}
=\frac{2r_s}{c}
\left[
\log\frac{R_A+R_B+D}{R_A+R_B-D}
-\frac{D}{2R_A}
\right]
+O\left(\frac{r_s^2}{c b_0}\right).
}
$$

> 右辺には光の伝播補正だけでなく、送信時計の重力による進み方の補正も含まれる。
<!-- formal-statement-end -->

### 証明の見取り図

座標上で静止した時計の規格化係数を等方計量から取り出して $2T_{AB}$ に掛けます。一次展開では、この係数と平坦伝播時間の積が追加項になります。

<!-- proof-start -->
### 証明

[等方表示](#prop-gr20-isotropic-coordinates)で $A$ を固定して $d\rho=d\theta=d\phi=0$ とすると

$$
-c^2d\tau_A^2=-\left(\frac{1-a_A}{1+a_A}\right)^2c^2dt^2,
\qquad a_A=\frac{r_s}{4\rho_A}<1.
$$

未来向きの時計なので $d\tau_A=(1-a_A)(1+a_A)^{-1}dt$。往復の座標時間は $2T_{AB}$ であり、第一式が得られます。

弱場では

$$
\frac{1-a_A}{1+a_A}
=1-2a_A+O(a_A^2)
=1-\frac{r_s}{2R_A}+O\left(\frac{r_s^2}{R_A^2}\right).
$$

また[Shapiro時間遅延の弱場一次式](#thm-gr20-shapiro-first-order)から $T_{AB}=D/c+(r_s/c)\log[(R_A+R_B+D)/(R_A+R_B-D)]+O(r_s^2/(cb_0))$。両式を掛け、一次項を表示すると

$$
\begin{aligned}
\Delta\tau_A
&=2\left(1-\frac{r_s}{2R_A}+O(r_s^2/R_A^2)\right)
\left(\frac{D}{c}+\frac{r_s}{c}\log\frac{R_A+R_B+D}{R_A+R_B-D}
+O\left(\frac{r_s^2}{c b_0}\right)\right)\\
&=\frac{2D}{c}+\frac{2r_s}{c}
\left[\log\frac{R_A+R_B+D}{R_A+R_B-D}
-\frac{D}{2R_A}\right]
+O\left(\frac{r_s^2}{c b_0}\right).
\end{aligned}
$$

端点比を固定しているので交差項や時計係数の高次項も示した残余に収まります。$\square$
<!-- proof-end -->

**検算。** $r_s\to0$ なら時計係数は $1$、往復所要時間は $2D/c$ です。遠方の $A$ では $r_s/R_A\ll1$ ですが、**有限半径では座標の片道遅延を単純に2倍した値と、エコー固有時間の超過は一般に一致しません**。測定可能な時間は一つの世界線上の固有時間ですが、「平坦時空との超過」を定義するには距離・時計較正の基準をなお指定する必要があります。

**適用範囲。** 地球と探査機は実際には運動し、中心天体の多極子、プラズマ、媒体の屈折、機器遅延などもあります。ここで導いたのは静止したSchwarzschild外部にある理想化した信号の一次効果です。強場の光子球近傍や地平線付近に、$r_s/b_0\ll1$ の式を外挿しません。

## 5. 演習：座標、光路、時計を分けて計算する

### Level A

<a id="ex-gr20-a01"></a>
#### GR20-A01 保存量から時間微分を導く
- Level: A

$r>r_s$ の赤道面光的測地線で $\mathcal E=f\dot x^0>0$、$\mathcal L=r^2\dot\phi$、$b=|\mathcal L|/\mathcal E$ とする。$dt/dr$ を導き、符号が変わる理由を示せ。

<!-- solution-start -->
**詳細解答。** 光的条件は $-f\dot x^{0\,2}+\dot r^2/f+r^2\dot\phi^2=0$。[GR18の半径積分](../GR18/index.md#prop-gr18-null-radial)と同じく、$\dot x^0=\mathcal E/f$、$\dot\phi=\mathcal L/r^2$ を入れると $\dot r^2=\mathcal E^2(1-fb^2/r^2)$。従って $\dot r=\pm\mathcal E\sqrt{1-fb^2/r^2}$、$dt/d\lambda=\mathcal E/(cf)$。両者を割れば $dt/dr=\pm[cf\sqrt{1-fb^2/r^2}]^{-1}$。外向きは正、内向きは負です。一方で $dt/d\lambda>0$ はどちらの場合も変わりません。
<!-- solution-end -->

<a id="ex-gr20-a02"></a>
#### GR20-A02 折返し半径での衝突パラメータ
- Level: A

光線が $r_0=4r_s$ で単純に折り返すとする。衝突パラメータの二乗 $b^2/r_s^2$ を求め、折返し条件を確認せよ。

<!-- solution-start -->
**詳細解答。** [時間積分命題](#prop-gr20-null-time-integral)で $1-f(r_0)b^2/r_0^2=0$。$f(4r_s)=1-1/4=3/4$ なので $b^2=r_0^2/f(r_0)=16r_s^2/(3/4)=(64/3)r_s^2$。単純根かどうかも確認します。$F(r)=1-b^2f(r)/r^2$ とすると

$$
F'(r)=\frac{b^2(2r-3r_s)}{r^4},
\qquad
F'(4r_s)=\frac{5}{12r_s}>0.
$$

よって $F(r_0)=0$ は単純根であり、$r_0=4r_s>3r_s/2$ は[光子球](../GR18/index.md#prop-gr18-photon-sphere)の外側です。折返し点で $dt/dr$ が発散しても、光線のアフィン時間発展が止まるわけではありません。
<!-- solution-end -->

<a id="ex-gr20-a03"></a>
#### GR20-A03 等方座標の計量係数
- Level: A

$r=\rho(1+a)^2$、$a=r_s/(4\rho)$ とする。$dr/d\rho$ と $f(r)$ を求め、$dr^2/f=(1+a)^4d\rho^2$ を証明せよ。

<!-- solution-start -->
**詳細解答。** $da/d\rho=-a/\rho$ だから $dr/d\rho=(1+a)^2-2a(1+a)=1-a^2$。次に $r_s/r=4a/(1+a)^2$ より $f=[(1+a)^2-4a]/(1+a)^2=(1-a)^2/(1+a)^2$。従って $dr^2/f=[(1-a)^2(1+a)^2]/[(1-a)^2/(1+a)^2]\,d\rho^2=(1+a)^4d\rho^2$。$\rho>r_s/4$ では $a<1$ なので除算できます。
<!-- solution-end -->

<a id="ex-gr20-a04"></a>
#### GR20-A04 対数積分の原始関数
- Level: A

$b_0>0$ とする。$\int dz/\sqrt{b_0^2+z^2}$ の原始関数を微分で確かめ、$z_A=-3b_0$、$z_B=4b_0$ の積分値を書け。

<!-- solution-start -->
**詳細解答。** $F(z)=\log(z+\sqrt{b_0^2+z^2})$ と置けば

$$
F'(z)=\frac{1+z/\sqrt{b_0^2+z^2}}{z+\sqrt{b_0^2+z^2}}
=\frac1{\sqrt{b_0^2+z^2}}.
$$

$z+\sqrt{b_0^2+z^2}>0$ は $b_0>0$ で保証されます。$R_A=\sqrt{10}b_0$、$R_B=\sqrt{17}b_0$ より積分は $\log[(4+\sqrt{17})/(-3+\sqrt{10})]$ です。分母は正で、全体は正です。
<!-- solution-end -->

<a id="ex-gr20-a05"></a>
#### GR20-A05 半径方向の厳密な伝播時間
- Level: A

Schwarzschild静的外部で $b=0$、$r_2>r_1>r_s$ とする。外向き光線の所要座標時間を厳密に積分し、$r_s\to0$ を確認せよ。

<!-- solution-start -->
**詳細解答。** [時間積分](#prop-gr20-null-time-integral)へ $b=0$ を入れると $dt/dr=1/[c(1-r_s/r)]$。$r/(r-r_s)=1+r_s/(r-r_s)$ と分解すると

$$
T=\frac1c\int_{r_1}^{r_2}\left(1+\frac{r_s}{r-r_s}\right)dr
=\frac{r_2-r_1}{c}+\frac{r_s}{c}\log\frac{r_2-r_s}{r_1-r_s}.
$$

$r_2>r_1>r_s$ なので対数の真数は $1$ より大きいです。$r_s\to0$ で第二項が消え、$(r_2-r_1)/c$ に戻ります。
<!-- solution-end -->

### Level B

<a id="ex-gr20-b01"></a>
#### GR20-B01 両端対称な光路の対数
- Level: B

等方座標で基準光路を $z=-L$ から $z=L$ とし、最短距離を $b_0>0$ とする。一次の片道Shapiro超過を積分から導け。$L/b_0\gg1$ の極限も求めよ。

<!-- solution-start -->
**詳細解答。** $\rho(z)=\sqrt{b_0^2+z^2}$、$D=2L$ です。[等方光的条件](#prop-gr20-isotropic-coordinates)と直線の一次停留性を使うと

$$
\Delta T_{\mathrm{Sh}}
=\frac{r_s}{c}\int_{-L}^{L}\frac{dz}{\sqrt{b_0^2+z^2}}
+O(r_s^2/(cb_0)).
$$

ここで $F(z)=\operatorname{arsinh}(z/b_0)$ とおくと $F'(z)=1/\sqrt{b_0^2+z^2}$ であり、

$$
F(L)-F(-L)
=\operatorname{arsinh}(L/b_0)-\operatorname{arsinh}(-L/b_0)
=2\operatorname{arsinh}(L/b_0).
$$

よって $\Delta T_{\mathrm{Sh}}=(2r_s/c)\operatorname{arsinh}(L/b_0)+O(r_s^2/(cb_0))$。$\operatorname{arsinh}x=\log(x+\sqrt{1+x^2})$ なので $L/b_0\gg1$ では $\operatorname{arsinh}(L/b_0)=\log(2L/b_0)+O(b_0^2/L^2)$ です。従って先頭項は $(2r_s/c)\log(2L/b_0)$ です。$r_s/b_0$ の弱場極限と $L/b_0$ の遠方極限を混同しません。
<!-- solution-end -->

<a id="ex-gr20-b02"></a>
#### GR20-B02 座標の直線距離と面積半径
- Level: B

等方半径 $\rho$ と面積半径 $r$ の関係を二次まで展開せよ。$\rho=100r_s$ の点で $r-\rho$ の正値と一次の大きさを求め、固定 $r$ と固定 $\rho$ の比較が同じではない理由を説明せよ。

<!-- solution-start -->
**詳細解答。** $r=\rho(1+r_s/(4\rho))^2=\rho+r_s/2+r_s^2/(16\rho)$ はこの変換では厳密な等式です。$\rho=100r_s$ では $r-\rho=r_s/2+r_s/1600>0$。一次では $r-\rho\simeq r_s/2$ です。例えば半径の二端点を固定するとき、固定 $\rho$ での $r$ の値は質量 $M$ と共に変化します。反対に固定 $r$ のとき $\rho$ が変化します。従って[固定等方端点の定義](#def-gr20-shapiro-excess)に、面積半径を固定して求めた平坦基準をそのまま代入するのは別の比較規約への変更です。
<!-- solution-end -->

<a id="ex-gr20-b03"></a>
#### GR20-B03 エコー時計の一次項
- Level: B

$\rho_A=R_A$ に静止する時計から $B$ へ信号を出し、即時反射で戻す。片道座標時間を $T=D/c+(r_s/c)L_g+O(r_s^2/(cb_0))$ とする。ただし $L_g$ は無次元の対数である。往復固有時間を一次まで求めよ。

<!-- solution-start -->
**詳細解答。** [静止時計での往復エコー時間](#prop-gr20-radar-echo)から $\Delta\tau_A=2(1-a_A)/(1+a_A)\,T$、$a_A=r_s/(4R_A)$。$(1-a_A)/(1+a_A)=1-2a_A+O(a_A^2)=1-r_s/(2R_A)+O(r_s^2/R_A^2)$ を代入して

$$
\begin{aligned}
\Delta\tau_A
&=2\left(1-\frac{r_s}{2R_A}+\cdots\right)
\left(\frac Dc+\frac{r_s}{c}L_g+\cdots\right)\\
&=\frac{2D}{c}+\frac{2r_s}{c}
\left(L_g-\frac{D}{2R_A}\right)
+O\left(\frac{r_s^2}{cb_0}\right).
\end{aligned}
$$

$-D/(2R_A)$ が時計の重力による換算から現れます。座標時間の往復補正だけを固有時間と誤認しないようにします。
<!-- solution-end -->

<a id="ex-gr20-b04"></a>
#### GR20-B04 光路の曲がりが一次時間に寄与しない理由
- Level: B

二点固定のEuclid直線 $\gamma_0(z)=(b_0,0,z)$ に、端点で零となる微小変位 $\eta(z)$ を加えた光路を考える。$\eta$ の一次でのEuclid長さの変化が零であることを直接示せ。それでも光線の屈曲そのものが零とはいえない理由を述べよ。

<!-- solution-start -->
**詳細解答。** $d\gamma_0/dz=(0,0,1)$ は定数なので、長さ汎関数の一次変分は

$$
\delta L=\int_{z_A}^{z_B}\frac{d\gamma_0}{dz}\cdot\eta'(z)\,dz
=\left[(0,0,1)\cdot\eta(z)\right]_{z_A}^{z_B}=0.
$$

光路変位が $\eta=O(r_s)$ なら、光路の変形によるEuclid長さの変化は二次から始まります。一方、[GR18の弱場光線屈曲](../GR18/index.md#thm-gr18-weak-bending)は角度の一次変化を与えます。**経路の形の一次変化** と **固定端点間の長さ汎関数の一次変化** は異なる量なので矛盾しません。光学時間の一次差は [等方表示](#prop-gr20-isotropic-coordinates) の $r_s/\rho$ の積分から生じます。
<!-- solution-end -->

### Level C

<a id="ex-gr20-c01"></a>
#### GR20-C01 光的条件から時計の読みまで
- Level: C

$M>0$、$r_s=2GM/c^2$ のSchwarzschild静的外部で、無限遠で規格化した $t$ を取る。

1. 赤道面を進む光的測地線のKilling保存量 $\mathcal E,\mathcal L$ と衝突パラメータ $b$ から、単調な半径区間の $dt/dr$ を出せ。
2. 等方半径 $\rho$ へ変換し、弱場の光的条件を一次まで示せ。
3. 固定端点の基準直線を $(b_0,0,z)$、$z_A<0<z_B$、$b_0\gg r_s$ としたとき、片道Shapiro超過を積分し、$R_A,R_B,D$ を用いて対数形にせよ。
4. $A$ に静止する時計の往復エコー固有時間を一次まで出し、どの項が時計の較正に対応するか説明せよ。近似を使えない状況も一つ述べよ。

<!-- solution-start -->
**詳細解答。** **（1）** [Killing保存量](../GR18/index.md#prop-gr18-null-radial)から $\mathcal E=f\dot x^0$、$\mathcal L=r^2\dot\phi$、$b=|\mathcal L|/\mathcal E$。光的条件へ代入して

$$
\dot r^2=\mathcal E^2(1-fb^2/r^2),\qquad
\frac{dt}{dr}=\pm\frac1{cf\sqrt{1-fb^2/r^2}}.
$$

外向きが正、内向きが負です。折返し点では半径を媒介変数にできず区間を分けます。

**（2）** $a=r_s/(4\rho)$ として $r=\rho(1+a)^2$、$dr/d\rho=(1-a)(1+a)$、$f=(1-a)^2/(1+a)^2$。空間計量は $(1+a)^4d\ell^2$、時間計量は $-[(1-a)/(1+a)]^2c^2dt^2$ です。[等方表示](#prop-gr20-isotropic-coordinates)から

$$
c\,dt=\frac{(1+a)^3}{1-a}\,d\ell
=\left(1+\frac{r_s}{\rho}+O(r_s^2/\rho^2)\right)d\ell.
$$

**（3）** 固定端点で直線のEuclid長さの一次変分は端点項だけで零です。そのため実光路に一次の屈曲があっても、一次の伝播補正は基準直線上の積分に等しく、

$$
\begin{aligned}
T_{AB}-\frac Dc
&=\frac{r_s}{c}\int_{z_A}^{z_B}
\frac{dz}{\sqrt{b_0^2+z^2}}+O(r_s^2/(cb_0))\\
&=\frac{r_s}{c}\log\frac{z_B+R_B}{z_A+R_A}
+O(r_s^2/(cb_0))\\
&=\frac{r_s}{c}\log\frac{R_A+R_B+D}{R_A+R_B-D}
+O(r_s^2/(cb_0)).
\end{aligned}
$$

$R_i^2=b_0^2+z_i^2$、$D=z_B-z_A$ を用いました。

**（4）** 静止時計は $d\tau_A=[(1-a_A)/(1+a_A)]dt$、$a_A=r_s/(4R_A)$。[エコー命題](#prop-gr20-radar-echo)を使い

$$
\Delta\tau_A=\frac{2D}{c}+
\frac{2r_s}{c}\left[
\log\frac{R_A+R_B+D}{R_A+R_B-D}-\frac{D}{2R_A}
\right]+O(r_s^2/(cb_0)).
$$

$-D/(2R_A)$ が座標時間から送信時計の固有時間へ直す一次項です。例えば $b_0\sim r_s$ では弱場展開と滑らかな直接光路の仮定が破れ得るため、上式を使用できません。
<!-- solution-end -->

---

光の屈曲を求めた[GR18](../GR18/index.md#thm-gr18-weak-bending)から、光が届くまでの時間へ進みました。Shapiro遅延を計算する際の核心は **端点を固定した比較、光学時間の一次展開、局所時計への変換** の三つを分けることです。次のGR21では、こうした弱場補正を計量摂動とゲージ変換という一般的な言葉で整理します。
