# BHI20 JTブラックホール解・dilaton・エントロピー

<!-- definition-example-audit: strict -->

## 1. 一定負曲率から、温度とエントロピーを持つ解へ

[BHI19のdilaton方程式](../BHI19/index.md#prop-bhi19-curvature-eom)により、真空JT重力の時空曲率は $R=-2/\ell^2$ に固定されます。一方、[真空Hessian方程式](../BHI19/index.md#prop-bhi19-trace-hessian)は、同じ負曲率時空上でもdilaton $\Phi$ の分布を制限します。そこで本講では、静的な地平線を持つ解を作り、地平線における $\Phi$ の値が重力エントロピーになることを計算します。

前講の[JT作用の規約](../BHI19/index.md#def-bhi19-jt-action)をそのまま使用します。計量符号は $(-,+)$、$\ell>0$ は長さ、$G_2>0$ は無次元Newton結合、$\Phi,\Phi_0$ は無次元、$\hbar=k_{\mathrm B}=1$ です。真空 $T_{\mu\nu}=0$ とし、物質の量子補正を含めない**古典的な定常解**を扱います。空間座標 $r$ と時間座標 $t$ は長さの次元を持ちます。

本講で得る答えは、地平線半径 $r_h>0$ と正の定数 $a$ を使うと

$$
T_H=\frac{r_h}{2\pi\ell^2},\qquad
S_{\rm grav}=S_0+\frac{\Phi_h}{4G_2},\qquad
\Phi_h=\frac{a r_h}{\ell},\quad S_0=\frac{\Phi_0}{4G_2}
$$

です。以下ではこの結果を前提にせず、場の方程式、正則性、作用の曲率項から順に再構成します。最後に、将来のisland端点で評価する $\Phi/(4G_2)$ と、定常地平線で導く熱力学的エントロピーの関係を整理します。

## 2. 地平線のある静的計量を求める

本講では、時間の平行移動 $t\mapsto t+c$ で計量が変わらず、時間方向と空間方向を直交させる座標を選べる場合を静的形として扱います。時間に依存しないという条件だけで一般の静的性を定義するのではありません。外部領域の時間座標を $t$、それに直交する空間座標を $r$ とし、計量の候補を次の形に取ります。

$$
ds^2=-f(r)\,dt^2+\frac{dr^2}{f(r)},\qquad
\Phi(r)=\frac{a r}{\ell},\qquad a>0.
$$

ここで $f(r)>0$ の領域が静的外部です。以下では $f'(r)=df/dr$、$\Phi'(r)=d\Phi/dr$ と書き、プライムは空間座標 $r$ での常微分だけを表します。この形は**静的な解を探すための座標・dilatonの選択**であり、すべての大域的JT解がこの座標で覆われるという仮定ではありません。$a$ は境界側で指定するdilatonの傾きです。ここで計量成分の行列とは、座標基底 $(\partial_t,\partial_r)$ で二つの接ベクトルの内積を表す行列です。実際、$X=p\partial_t+q\partial_r$ に対して

$$
g(X,X)=-f(r)p^2+f(r)^{-1}q^2,
\qquad
(g_{\mu\nu})=\begin{pmatrix}-f&0\\0&f^{-1}\end{pmatrix}.
$$

$f>0$ なら、独立な時間・空間の基底方向で内積がそれぞれ負・正となり、計量符号は $(-,+)$ です。さらに $\det(g_{\mu\nu})=(-f)f^{-1}=-1\ne0$ なので逆計量も存在します。このように、行列の符号と行列式は[BHI19で指定したLorentz計量](../BHI19/index.md#def-bhi19-jt-action)の符号・非退化性を判定するために使います。

<a id="def-bhi20-static-patch"></a>

<!-- formal-statement-start -->
> **定義（JTの静的ブラックホール外部パッチ）**
>
> $\ell,G_2,a,r_h>0$ とし、領域 $M_{\rm ext}=\{(t,r)\mid t\in\mathbb R,\ r>r_h\}$ に
>
$$
f(r)=\frac{r^2-r_h^2}{\ell^2},\quad
ds^2=-f(r)dt^2+\frac{dr^2}{f(r)},\quad
\Phi(r)=\frac{ar}{\ell}
$$
>
> を与える。$r=r_h$ はこの静的座標の外部領域を区切る地平線候補であり、$\Phi_h:=\lim_{r\downarrow r_h}\Phi(r)=ar_h/\ell$ を地平線dilaton値とする。
<!-- formal-statement-end -->

<!-- definition-example-start: def-bhi20-static-patch -->
**定義の確認**： $\ell=2,\ a=3,\ r_h=1$ なら $r>1$ において $f=(r^2-1)/4>0$ です。$g_{tt}<0$、$g_{rr}>0$、$g_{tt}g_{rr}=-1$ でLorentz計量が非退化であり、$\Phi=3r/2$ は滑らかで無次元です。$r\downarrow1$ において $f\to0$、$\Phi_h=3/2$ となります。$r=1$ では静的座標の $g_{rr}$ が発散するため、この座標成分だけでは地平線の幾何学的正則性を判定できません。第5節で正則な座標へ移ります。
<!-- definition-example-end -->

この形がどこから出るかを、[BHI19の真空Hessian方程式](../BHI19/index.md#prop-bhi19-trace-hessian)に代入して確かめます。

<a id="prop-bhi20-metric-solution"></a>

<!-- formal-statement-start -->
> **命題（静的dilatonから定まるJTブラックホール解）**
>
> $\ell>0,\ a>0$ とする。$f>0$ の連結区間で上記の静的形と $\Phi=ar/\ell$ を仮定し、真空JT方程式
>
$$
R=-\frac2{\ell^2},\qquad
\nabla_\mu\nabla_\nu\Phi=\frac{\Phi}{\ell^2}g_{\mu\nu}
$$
>
> を満たすなら $f=r^2/\ell^2-c$（$c$ は定数）である。$c=r_h^2/\ell^2>0$ の枝では $r>r_h$ が静的外部となり、上の定義の計量とdilatonは両方のJT方程式を満たす。
<!-- formal-statement-end -->

### 証明の見取り図

計量に代入して得るChristoffel記号を使い、Hessianの $tt$ 成分から $f'(r)=2r/\ell^2$ を導きます。それを積分して $f$ を決め、$rr,tr$ 成分と曲率を別々に照合します。

<!-- proof-start -->
### 証明

計量の逆成分をこの座標基底で計算すると

$$
g^{tt}=-\frac1f,\qquad g^{rr}=f
$$

です。$\partial_r$ は $t$ を固定した偏微分、$\partial_t$ は $r$ を固定した偏微分を表します。先に宣言したプライムは空間座標に関する導関数であり、時間微分とは区別します。

$\Phi$ はスカラー場です。[Levi-Civita接続のChristoffel係数公式](../../../幾何系/GEO/GEO13/index.md#prop-geo13-levi-civita-christoffel)から係数を求め、[BHI19で用いたHessianの座標表示](../BHI19/index.md#prop-bhi19-trace-hessian)に代入すると

$$
\nabla_\mu\nabla_\nu\Phi
=\partial_\mu\partial_\nu\Phi
-\Gamma^\rho_{\mu\nu}\partial_\rho\Phi,
\qquad
\Gamma^r_{tt}=-\frac12g^{rr}\partial_rg_{tt}
=\frac{ff'}2.
$$

残りのChristoffel記号も同じ座標基底で求めると、非零成分は

$$
\Gamma^r_{tt}=\frac{ff'}2,\qquad
\Gamma^r_{rr}=-\frac{f'}{2f},\qquad
\Gamma^t_{tr}=\Gamma^t_{rt}=\frac{f'}{2f}.
$$

$\Phi'=a/\ell$、$\Phi''=\partial_t\Phi=0$ なので

$$
\nabla_t\nabla_t\Phi=-\frac{aff'}{2\ell},\qquad
\nabla_r\nabla_r\Phi=\frac{af'}{2\ell f},\qquad
\nabla_t\nabla_r\Phi=0.
$$

一方、Hessian方程式の右辺の $tt$ 成分は

$$
\frac{\Phi}{\ell^2}g_{tt}
=-\frac{arf}{\ell^3}.
$$

$f>0$ かつ $a>0$ なので $-af$ で割ることができ、$f'/2\ell=r/\ell^3$、すなわち $f'=2r/\ell^2$ を得ます。積分して $f=r^2/\ell^2-c$ です。

$rr$ 成分は左辺 $af'/(2\ell f)=ar/(\ell^3 f)$、右辺 $\Phi g_{rr}/\ell^2=ar/(\ell^3 f)$ となります。交差成分は左右とも0です。また、上のChristoffel記号から $R_{tt}=ff''/2$、$R_{rr}=-f''/(2f)$ であり、

$$
R=g^{tt}R_{tt}+g^{rr}R_{rr}
=-\frac{f''}2-\frac{f''}2=-f''
=-\frac2{\ell^2}.
$$

よって[BHI19の曲率方程式](../BHI19/index.md#prop-bhi19-curvature-eom)も成立します。$c>0$ なら $r_h=\ell\sqrt c>0$ と置け、$r>r_h$ で $f>0$ です。$\square$
<!-- proof-end -->

例えば $\ell=2,r_h=1$ のとき $f=(r^2-1)/4$ です。同じ $\ell$ でも地平線半径を変えると、局所曲率 $R=-1/2$ は一定のまま、地平線dilatonの値が変わります。この「曲率と状態のパラメータが異なる」という性質が、JT模型でエントロピーを計算できる理由です。

## 3. 境界で何を固定するか

AdS$_2$ の漸近境界 $r\to\infty$ では

$$
f(r)=\frac{r^2}{\ell^2}\left(1-\frac{r_h^2}{r^2}\right),\qquad
\Phi(r)=\frac{a}{\ell}r.
$$

したがってdilatonの漸近的傾き $a$ を固定し、異なる $r_h$ の解を比較します。有限cutoff $r=r_b>r_h$ を採用すると、境界誘導計量・dilaton値は

$$
h_{tt}=-f(r_b),\qquad
\Phi_b=\frac{ar_b}{\ell}.
$$

有限cutoff境界の静止観測者のLorentz固有時間を $s_b$ と書くと、$ds_b=\sqrt{f(r_b)}\,dt$ です（後のEuclid時間 $\tau$ とは別の記号です）。有限 $r_b$ の測定者の温度と、漸近時刻 $t$ で規格化した温度は異なります。この区別は、後の浴との接合で役立ちます。

境界 $r=r_b$ の接線は $\partial_t$ で、その誘導計量は $h_{tt}=g(\partial_t,\partial_t)=-f(r_b)<0$ です。従って境界の一次元体積密度は $\sqrt{-h}=\sqrt{f(r_b)}$ です。外向き法線は $n^r=\sqrt f$、$n^t=0$ であり、$g_{rr}(n^r)^2=f^{-1}f=1$ だから単位法線になっています。$\det g=-1$ により $\sqrt{-g}=1$ なので、[BHI19の外部曲率の規約](../BHI19/index.md#def-bhi19-jt-action)に従うと

$$
K=\nabla_\mu n^\mu=\partial_r\sqrt f
=\frac{f'}{2\sqrt f}
=\frac{r_b}{\ell\sqrt{r_b^2-r_h^2}}.
$$

$r_b\to\infty$ で $K\to1/\ell$ となり、前講の境界反項が発散を差し引くことが確認できます。固定した座標時間幅 $\Delta t$ について、dilaton GHY項と標準反項の和は

$$
\begin{aligned}
I_{\Phi K}+I_{\rm ct}
&=\frac{\Delta t}{8\pi G_2}\sqrt{f(r_b)}\,\Phi_b
\left(K-\frac1\ell\right)\\
&=\frac{a\,\Delta t}{8\pi G_2\ell^3}\,
r_b\left(r_b-\sqrt{r_b^2-r_h^2}\right).
\end{aligned}
$$

括弧を有理化すると

$$
r_b\left(r_b-\sqrt{r_b^2-r_h^2}\right)
=\frac{r_b r_h^2}{r_b+\sqrt{r_b^2-r_h^2}}
\longrightarrow\frac{r_h^2}{2}.
$$

これは**指定した境界項と反項の有限極限**です。熱力学的エネルギーを確定するには境界時刻の規格化も必要です。第7節では、同じ規格化の解の族について温度とエントロピーの変化を比較します。

## 4. 地平線とHawking温度を幾何から導く

静的ベクトル $\partial_t$ のノルムは $g_{tt}=-f$ です。$r=r_h$ で $f=0$ となるため、この曲面は$\partial_t$が零ノルムになる候補です。外部での二重零点ではなく、$f'(r_h)=2r_h/\ell^2>0$ の**単純零点**であることが重要です。

Euclid時間 $\tau$ は $t=-i\tau$ というWick回転で導入します。第3節のLorentz固有時間 $s_b$ とは異なる座標ですが、Euclid周期 $\beta$ に対する境界の固有円周長は同じ計量因子 $\sqrt{f(r_b)}$ で計算できます。地平線の外側で

$$
ds_E^2=f(r)\,d\tau^2+\frac{dr^2}{f(r)}
$$

を考えます。これが地平線近傍で平面極座標の原点のように滑らかになるよう、$\tau$ の周期を決めます。

<a id="prop-bhi20-temperature"></a>

<!-- formal-statement-start -->
> **命題（Euclid正則性とJTブラックホールの温度）**
>
> $\ell>0,r_h>0$ とし、第2節の $f=(r^2-r_h^2)/\ell^2$ を用いる。Euclid計量が $r=r_h$ に対応する点で円錐特異点を持たず滑らかに延長されるためには、Euclid時刻の周期は
>
$$
\beta=\frac{4\pi}{f'(r_h)}=\frac{2\pi\ell^2}{r_h}
$$
>
> である。漸近時刻 $t$ を基準にしたHawking温度は $T_H=\beta^{-1}=r_h/(2\pi\ell^2)$ となる。
<!-- formal-statement-end -->

### 証明の見取り図

地平線からの距離を新しい半径 $\rho$ で表すと、計量は $d\rho^2+\kappa^2\rho^2d\tau^2$ に近づきます。角 $\kappa\tau$ が $2\pi$ 周期なら原点が滑らかです。

<!-- proof-start -->
### 証明

$\delta r=r-r_h>0$ とすると

$$
f(r)=f'(r_h)\delta r+O(\delta r^2),\qquad
f'(r_h)=\frac{2r_h}{\ell^2}.
$$

$\kappa=f'(r_h)/2>0$、$\delta r=\kappa\rho^2/2$ と置きます。$dr=\kappa\rho\,d\rho$、$f= \kappa^2\rho^2+O(\rho^4)$ ですから

$$
\frac{dr^2}{f}=d\rho^2+O(\rho^2)d\rho^2,\qquad
f\,d\tau^2=\kappa^2\rho^2d\tau^2+O(\rho^4)d\tau^2.
$$

したがって原点付近の角座標は $\theta=\kappa\tau$ です。$\theta$ が $2\pi$ 周期となることが円錐角の欠損をなくす条件なので、$\kappa\beta=2\pi$、すなわち $\beta=2\pi/\kappa=4\pi/f'(r_h)$ です。$f'$ の値を代入して結論を得ます。$\square$
<!-- proof-end -->

例えば $\ell=2,r_h=1$ なら $\beta=8\pi$、$T_H=1/(8\pi)$ です。有限cutoff境界の固有周期は $\beta_b=\sqrt{f(r_b)}\,\beta$ で、局所温度は $T_b=T_H/\sqrt{f(r_b)}$ となります。これは同じEuclid円周の座標長と固有長を区別した結果です。

<a id="ref-bhi20-kruskal"></a>

## 5. 地平線を通る座標で正則性を調べる

第2節の $g_{rr}=1/f$ の発散は、静的座標が地平線に達すると使えなくなることを示します。実際に地平線近傍を越えて正則な座標へ変換しましょう。

$r>r_h$ で、$dr_*/dr=1/f$ を満たす**亀座標** $r_*$ を導入します。積分を部分分数に分けると

$$
\begin{aligned}
r_*(r)
&=\int\frac{\ell^2\,dr}{(r-r_h)(r+r_h)}\\
&=\frac{\ell^2}{2r_h}\log\left(\frac{r-r_h}{r+r_h}\right).
\end{aligned}
$$

積分定数は $r_*(\infty)=0$ となるよう選びました。さらに $u=t-r_*,v=t+r_*$ とすれば $ds^2=-f\,du\,dv$ です。$\kappa=r_h/\ell^2$ に対し

$$
U=-e^{-\kappa u},\qquad V=e^{\kappa v}
$$

と置くと、$UV=-(r-r_h)/(r+r_h)$ です。$U,V$ の微分と元の計量との関係を順に求めると

$$
\begin{aligned}
dU&=-\kappa U\,du,&dV&=\kappa V\,dv,\\
du\,dv&=-\frac{dU\,dV}{\kappa^2UV},&
\frac{f(r)}{\kappa^2UV}&=-\frac{(r+r_h)^2\ell^2}{r_h^2}.
\end{aligned}
$$

また $1+UV=2r_h/(r+r_h)$ だから、これらを $ds^2=-f\,du\,dv$ に代入して

$$
r=r_h\frac{1-UV}{1+UV},\qquad
ds^2=-\frac{4\ell^2}{(1+UV)^2}\,dU\,dV,
\qquad
\Phi=\frac{ar_h}{\ell}\frac{1-UV}{1+UV}.
$$

これは $UV>-1$ の範囲で正則です。外部 $r>r_h$ は $-1<UV<0$ に対応し、$U=0$ または $V=0$ は滑らかな零曲面（地平線）です。

時刻移動 $t\mapsto t+c$ は計量を保つ等長変換であり、その生成ベクトル $\partial_t$ を**Killingベクトル**と呼びます。$r$ を固定して $t$ で微分すると $\partial_tu=\partial_tv=1$ なので、連鎖律から

$$
\partial_tU=-\kappa U,\qquad
\partial_tV=\kappa V,\qquad
\partial_t=-\kappa U\partial_U+\kappa V\partial_V.
$$

したがって交点 $U=V=0$ ではKillingベクトルが零になります。このように未来・過去の二つの地平線が交わり、静的対称性の生成ベクトルが零になる点を**分岐点**と呼びます。そこでは $\Phi=\Phi_h$ です。

局所曲率は常に $-2/\ell^2$ で、$r=r_h$ に曲率発散はありません。地平線の位置や最大拡張を指定することと、浴に放射が流れる時間依存の蒸発模型を指定することは別の作業です。

## 6. dilaton値から重力エントロピーを出す

[BHI19の位相項](../BHI19/index.md#prop-bhi19-topology)は $S_0=\Phi_0/(4G_2)$ を与えました。今回の動的な項は、定常地平線の分岐点における $\Phi_h$ に比例します。曲率に結合した重力作用から求める定常地平線の幾何学的エントロピーをWaldエントロピーと呼びます。二次元では地平線断面が点なので、その局所的な寄与は分岐点で評価されます。今回はこの係数をEuclid円錐角の計算から直接求めます。

<a id="def-bhi20-horizon-dilaton"></a>

<!-- formal-statement-start -->
> **定義（地平線dilatonと重力エントロピーの幾何項）**
>
> $\ell,G_2,a,r_h>0$ とし、[静的ブラックホール外部パッチ](#def-bhi20-static-patch)を正則に分岐地平線まで延長する。分岐点のスカラー場の値を $\Phi_h=ar_h/\ell$ と書き、その点での重力エントロピーの**動的な幾何項**を
>
$$
S_{\rm dyn,h}:=\frac{\Phi_h}{4G_2}
$$
>
> とする。位相項の定数を含めた幾何学的地平線エントロピーを $S_{\rm grav,h}=S_0+S_{\rm dyn,h}$ と書く。
<!-- formal-statement-end -->

<!-- definition-example-start: def-bhi20-horizon-dilaton -->
**定義の確認**： $\ell=2,a=3,r_h=1,G_2=1/4,\Phi_0=2$ なら、[正則な座標](#ref-bhi20-kruskal)で $U=V=0$ に対応する点の $\Phi$ は $3/2$ です。$4G_2=1$ より $S_{\rm dyn,h}=3/2$、位相項は $S_0=2$、合計 $S_{\rm grav,h}=7/2$ です。単に $r$ を代入しただけでなく、評価点が正則な分岐地平線であること、$G_2>0$、それぞれの項の規格化を確認しました。
<!-- definition-example-end -->

<a id="prop-bhi20-entropy"></a>

<!-- formal-statement-start -->
> **命題（JT重力の定常地平線エントロピー）**
>
> [BHI19の作用](../BHI19/index.md#def-bhi19-jt-action)で、物質の量子エントロピーを除き、滑らかなEuclid円板として埋まる非極限の定常ブラックホール解を考える。分岐地平線のdilatonを $\Phi_h$ とし、地平線近傍の円錐角以外の境界条件・作用を固定した先頭の半古典近似では、地平線のWaldエントロピー（同じ係数をEuclid円錐法でも得る）は
>
$$
S_{\rm grav,h}=\frac{\Phi_0+\Phi_h}{4G_2}
=S_0+\frac{a r_h}{4G_2\ell}.
$$
<!-- formal-statement-end -->

### 証明の見取り図

作用の曲率項は $(\Phi_0+\Phi)R/(16\pi G_2)$ です。Euclid円板の原点で角の周期を通常の $2\pi$ から $2\pi n$ に変更し、$n=1$ が滑らかな場合となるようなパラメータ $n$ を導入します。このとき原点の円錐角欠損は $2\pi(1-n)$、曲率積分への寄与は $4\pi(1-n)$ です。Euclid作用の $n$ 微分からエントロピーを取り出すと $1/(4G_2)$ が生じます。

<!-- proof-start -->
### 証明

[JT作用](../BHI19/index.md#def-bhi19-jt-action)をEuclid化した曲率部分は

$$
I^E_{\rm curv}=-\frac1{16\pi G_2}
\int\sqrt g\,(\Phi_0+\Phi)R
$$

です。第4節の平面極座標 $(\rho,\theta)$ の角周期を $2\pi n$ に変形し、$n=1$ の滑らかな円板へ戻す近傍を調べます。[BHI19で用いた境界付きGauss–Bonnet関係](../BHI19/index.md#prop-bhi19-topology)を原点を囲む小円へ適用します。角周期を $2\pi$ から $2\pi n$ に変えた際の角欠損は $2\pi(1-n)$ で、二次元ではスカラー曲率がGauss曲率の2倍だから、先端に集中するスカラー曲率の積分は

$$
\int_{\rm tip}\sqrt g\,R=4\pi(1-n).
$$

円を縮めると滑らかな $\Phi$ は $\Phi_h$ に近づくので、原点の曲率寄与は

$$
I^E_n-nI^E_1
=-\frac{\Phi_0+\Phi_h}{16\pi G_2}\,4\pi(1-n)
+O((n-1)^2)
=-(1-n)\frac{\Phi_0+\Phi_h}{4G_2}
+O((n-1)^2).
$$

ここでは同じ漸近境界条件で鞍点を滑らかに変形でき、運動方程式に比例する滑らかな一次変分は消えるとしています。また円錐特異点を正則化したときの局所曲率結合のみを数え、物質のエンタングルメントは含めません。

$Z_n\simeq e^{-I^E_n}$ と置き、正規化した密度行列のレプリカ関係 $S=-\partial_n(\log Z_n-n\log Z_1)|_{n=1}$ を使います。上式から

$$
\log Z_n-n\log Z_1
=(1-n)\frac{\Phi_0+\Phi_h}{4G_2}+O((n-1)^2),
$$

従って $S=(\Phi_0+\Phi_h)/(4G_2)$ です。分岐点の $\Phi_h=ar_h/\ell$ を代入して結論を得ます。$\square$
<!-- proof-end -->

この導出は定常の滑らかな地平線についてです。一方、後のisland候補では地平線上とは限らない点 $x$ に $\Phi(x)/(4G_2)$ を評価し、物質エントロピーを合わせて端点を動かします。そこで極値化するための候補が**なぜ幾何項を持つか**は今回の曲率結合から理解できますが、island公式そのものの正当化はBHI24以降で扱います。

## 7. 温度・エントロピー・エネルギーを同時に検算する

$a$ と $\ell,G_2,\Phi_0$ を固定して $r_h$ だけを変える定常解の族を考えます。[Euclid正則性とJTブラックホールの温度](#prop-bhi20-temperature)および[JT重力の定常地平線エントロピー](#prop-bhi20-entropy)から

$$
T_H=\frac{r_h}{2\pi\ell^2},\qquad
S_{\rm grav,h}=S_0+\frac{a r_h}{4G_2\ell}.
$$

この族に対して、基準解 $r_h=0$ のエネルギーを $E(0)=0$ と定め、第一法則 $dE=T_H\,dS_{\rm grav,h}$ を積分します。これは**同じ境界傾き・時刻規格化の定常族についてのエネルギー差**を定義する操作です。

<a id="prop-bhi20-first-law"></a>

<!-- formal-statement-start -->
> **命題（JTブラックホール族の第一法則と比熱）**
>
> $\ell,G_2,a>0$ および $\Phi_0$ を固定し、$r_h>0$ の静的JT解を比較する。$T_H=r_h/(2\pi\ell^2)$ と $S_{\rm grav,h}=S_0+ar_h/(4G_2\ell)$ を用い、$dE=T_HdS_{\rm grav,h}$ および基準 $E(0)=0$ でエネルギーを正規化すると
>
$$
E=\frac{a r_h^2}{16\pi G_2\ell^3}
=\frac{\pi a\ell}{4G_2}T_H^2,\qquad
C=\frac{dE}{dT_H}=\frac{\pi a\ell}{2G_2}T_H>0.
$$
>
> さらに $S_{\rm grav,h}=S_0+(\pi a\ell/(2G_2))T_H$ である。
<!-- formal-statement-end -->

### 証明の見取り図

$dS/dr_h=a/(4G_2\ell)$ に $T_H$ を掛け、$r_h$ で積分します。$r_h$ と $T_H$ の関係を逆に解き、エネルギーの温度微分を求めます。

<!-- proof-start -->
### 証明

$S_0$ は固定なので $dS_0/dr_h=0$ です。従って

$$
\frac{dE}{dr_h}
=\frac{r_h}{2\pi\ell^2}\frac{a}{4G_2\ell}
=\frac{a r_h}{8\pi G_2\ell^3}.
$$

$r_h=0$ で $E=0$ として積分すると

$$
E(r_h)=\int_0^{r_h}\frac{a s}{8\pi G_2\ell^3}\,ds
=\frac{a r_h^2}{16\pi G_2\ell^3}.
$$

$T_H=r_h/(2\pi\ell^2)$ から $r_h=2\pi\ell^2T_H$。これを $E$ に代入して

$$
E=\frac{a(2\pi\ell^2T_H)^2}{16\pi G_2\ell^3}
=\frac{\pi a\ell}{4G_2}T_H^2
$$

を得ます。温度微分で $C=(\pi a\ell/(2G_2))T_H$、エントロピーへの代入で $S_{\rm grav,h}=S_0+(\pi a\ell/(2G_2))T_H$ です。$r_h>0$ と $a,\ell,G_2>0$ だから $C>0$ です。$\square$
<!-- proof-end -->

熱力学的エネルギーは前節の第一法則による**規格化を伴う定義**です。[BHI19の境界作用](../BHI19/index.md#def-bhi19-jt-action)を変分して境界応力からエネルギーを導く方法は、次講のSchwarzian境界力学と一緒に扱います。第一法則を使う際には固定する結合定数・境界傾きを明示しました。

## 8. 座標に依存しないdilatonの検算

外部領域で $r$ の値を取り換えると、$r_h$ を式から読み取る方法は座標依存になります。真空Hessian方程式から、代わりに共変な保存量を構成できます。

<a id="prop-bhi20-dilaton-invariant"></a>

<!-- formal-statement-start -->
> **命題（真空JTにおけるdilatonの保存量）**
>
> $\ell>0$ とし、連結な二次元領域で滑らかな実スカラー場 $\Phi$ が[真空Hessian方程式](../BHI19/index.md#prop-bhi19-trace-hessian)を満たすとする。このとき
>
$$
\mathcal C:=\Phi^2-\ell^2g^{\mu\nu}
(\nabla_\mu\Phi)(\nabla_\nu\Phi)
$$
>
> は一定である。第2節の静的解では $\mathcal C=a^2r_h^2/\ell^2=\Phi_h^2$ となる。
<!-- formal-statement-end -->

### 証明の見取り図

$\mathcal C$ を共変微分すると $\Phi^2$ の微分と勾配の二乗の微分が現れます。Hessian方程式を代入すると二項がちょうど相殺します。

<!-- proof-start -->
### 証明

計量の整合性 $\nabla_\mu g^{\alpha\beta}=0$ とスカラー場の共変微分の交換を用いると

$$
\begin{aligned}
\nabla_\mu\mathcal C
&=2\Phi\nabla_\mu\Phi
-2\ell^2(\nabla^\nu\Phi)(\nabla_\mu\nabla_\nu\Phi)\\
&=2\Phi\nabla_\mu\Phi
-2\ell^2(\nabla^\nu\Phi)\frac{\Phi}{\ell^2}g_{\mu\nu}\\
&=2\Phi\nabla_\mu\Phi-2\Phi\nabla_\mu\Phi=0.
\end{aligned}
$$

連結な領域では勾配が恒等的に零のスカラーは定数です。静的解について $\nabla_t\Phi=0,\nabla_r\Phi=a/\ell,\ g^{rr}=f$ より

$$
\mathcal C=\frac{a^2r^2}{\ell^2}
-\ell^2 f\frac{a^2}{\ell^2}
=\frac{a^2r^2}{\ell^2}-a^2\frac{r^2-r_h^2}{\ell^2}
=\frac{a^2r_h^2}{\ell^2}.
$$

$\Phi_h=ar_h/\ell$ とも一致します。$\square$
<!-- proof-end -->

この等式は地平線上で $(\nabla\Phi)^2=0$ となることと整合します。$\mathcal C$ の値だけで異なる大域的境界条件を同一視せず、同じ外部パッチの計算を座標変換して確認する用途に使います。

## 9. 後続のisland計算へ渡す量

| 対象 | 今回固定した式 | 評価場所・条件 |
|---|---|---|
| 負曲率 | $R=-2/\ell^2$ | 真空の外部と正則な延長 |
| 地平線 | $f(r_h)=0$、$\kappa=r_h/\ell^2$ | $r_h>0$ の単純零点 |
| dilaton | $\Phi=ar/\ell$ | $a$ は漸近境界の傾き |
| 地平線エントロピー | $S_0+\Phi_h/(4G_2)$ | 滑らかな定常分岐点 |
| 温度 | $T_H=\kappa/(2\pi)$ | 漸近時刻 $t$ の正規化 |
| 境界局所温度 | $T_b=T_H/\sqrt{f(r_b)}$ | 有限cutoff $r_b>r_h$ |
| 浴の物質エントロピー | [BHI18の区間公式](../BHI18/index.md#prop-bhi18-conformal-bath) | 浴の状態・端点・cutoffを別に指定 |

今後は、重力領域内の候補端点 $x$ における $\Phi(x)$ と、放射領域および候補islandに対する物質エントロピーを組み合わせます。BHI21では境界時間の力学、BHI22では非重力浴との接合を導入します。その後に重力エントロピーの評価位置自体を変数として扱います。

参考文献：[Maldacena–Stanford–Yang (2016)](https://doi.org/10.1093/ptep/ptw124)、[Mertens–Turiaci (2023)](https://doi.org/10.1007/s41114-023-00046-1)。文献によるdilatonの係数やNewton定数の取り方の違いを考慮し、本文では一貫して[BHI19の作用](../BHI19/index.md#def-bhi19-jt-action)から出発しました。

## 10. 演習：解・地平線・エントロピーの検算

指定がなければ $\ell,G_2,a>0$、$r_h>0$、真空JT、$S_0=\Phi_0/(4G_2)$、$f=(r^2-r_h^2)/\ell^2$、$\Phi=ar/\ell$ とします。各問で固定する結合定数と変化させる量を確かめ、式の評価位置を示してください。

### Level A：式の意味を個別に確認する

<a id="ex-bhi20-a01"></a>

#### BHI20-A01 地平線とdilaton

- Level: A
- 問題: $\ell=2,\ a=3,\ r_h=1,\ G_2=1/4,\ \Phi_0=2$ とする。外部領域、$\Phi_h$、$S_0$、$S_{\rm grav,h}$ を求めよ。

<!-- solution-start -->
**詳細解答。** $f=(r^2-1)/4$ なので $f>0$ は $r>1$ です。[JTの静的ブラックホール外部パッチ](#def-bhi20-static-patch)より $\Phi_h=ar_h/\ell=3/2$。$S_0=\Phi_0/(4G_2)=2/1=2$ であり、[JT重力の定常地平線エントロピー](#prop-bhi20-entropy)より $S_{\rm grav,h}=2+(3/2)/1=7/2$ です。$r=1$ は静的座標の境界であり、$\Phi_h$ は正則な延長上の値として評価します。
<!-- solution-end -->

<a id="ex-bhi20-a02"></a>

#### BHI20-A02 表面重力とEuclid周期

- Level: A
- 問題: $\ell=3,\ r_h=2$ のとき $f'(r_h)$、$\kappa=f'(r_h)/2$、Euclid周期 $\beta$ と $T_H$ を求めよ。

<!-- solution-start -->
**詳細解答。** $f'(r)=2r/\ell^2=2r/9$ に地平線半径 $r_h=2$ を代入します。[Euclid正則性の命題](#prop-bhi20-temperature)を適用すると

$$
f'(r_h)=\frac49,\qquad
\kappa=\frac{f'(r_h)}2=\frac29,
\qquad
\beta=\frac{2\pi}{\kappa}=9\pi,
\qquad
T_H=\beta^{-1}=\frac1{9\pi}.
$$

$\beta$ の次元は長さ、$T_H$ は長さの逆数です。
<!-- solution-end -->

<a id="ex-bhi20-a03"></a>

#### BHI20-A03 真空Hessian方程式の成分

- Level: A
- 問題: $\Phi=ar/\ell$ と静的計量 $ds^2=-fdt^2+f^{-1}dr^2$ を使い、$\nabla_r\nabla_r\Phi$ をChristoffel記号から計算し、$f'=2r/\ell^2$ のとき $\Phi g_{rr}/\ell^2$ と一致することを示せ。

<!-- solution-start -->
**詳細解答。** $\partial_r^2\Phi=0$、$\partial_r\Phi=a/\ell$ であり、$\Gamma^r_{rr}=-f'/(2f)$ です。[真空Hessian方程式](../BHI19/index.md#prop-bhi19-trace-hessian)の左辺を座標成分に直すと

$$
\nabla_r\nabla_r\Phi
=\partial_r^2\Phi-\Gamma^r_{rr}\partial_r\Phi
=0+\frac{f'}{2f}\frac a\ell
=\frac{af'}{2\ell f}.
$$

仮定 $f'=2r/\ell^2$ を代入した左辺と、$g_{rr}=1/f,\ \Phi=ar/\ell$ を代入した右辺は、それぞれ

$$
\nabla_r\nabla_r\Phi=\frac{ar}{\ell^3f},
\qquad
\frac{\Phi}{\ell^2}g_{rr}=\frac{ar}{\ell^3f}.
$$

従って $rr$ 成分が成立します。計算範囲は $f>0$ の静的外部です。
<!-- solution-end -->

<a id="ex-bhi20-a04"></a>

#### BHI20-A04 有限cutoffの時計

- Level: A
- 問題: $\ell=2,r_h=1,r_b=\sqrt{17}$ において、$\sqrt{f(r_b)}$、$\beta_b/\beta$ と $T_b/T_H$ を求めよ。

<!-- solution-start -->
**詳細解答。** $f(r_b)=(17-1)/4=4$ なので $\sqrt f=2$ です。第3節の固有時間関係 $ds_b=\sqrt f\,dt$ と第4節のEuclid固有周期 $\beta_b=\sqrt{f(r_b)}\,\beta$ から、$\beta_b/\beta=\sqrt f=2$ です。温度は固有周期の逆数なので $T_b/T_H=1/\sqrt f=1/2$。座標を変えた温度の比較ではなく、この境界で正規化した固有時計の比較です。
<!-- solution-end -->

<a id="ex-bhi20-a05"></a>

#### BHI20-A05 位相項を動かしたとき

- Level: A
- 問題: $r_h,a,\ell,G_2$ を固定し、$\Phi_0$ を $\Phi_0+\delta$ に替える。地平線温度、動的エントロピー項、全エントロピーの変化を求めよ。

<!-- solution-start -->
**詳細解答。** [温度式](#prop-bhi20-temperature)は $\Phi_0$ を含まないので $\Delta T_H=0$。[動的幾何項](#def-bhi20-horizon-dilaton)の $\Phi_h/(4G_2)$ も変化しません。一方、[BHI19の位相項](../BHI19/index.md#prop-bhi19-topology)より $\Delta S_0=\delta/(4G_2)$ なので $\Delta S_{\rm grav,h}=\delta/(4G_2)$ です。位相項の変更だけで場の局所方程式を変えたことにはなりません。
<!-- solution-end -->

### Level B：独立に式を再構成する

<a id="ex-bhi20-b01"></a>

#### BHI20-B01 曲率から静的関数を復元する

- Level: B
- 問題: 真空の静的計量 $ds^2=-fdt^2+dr^2/f$ と $\Phi=ar/\ell$ を仮定する。$R=-f''$ だけなら $f$ はどの形か。さらにHessian方程式を適用して一次項を制限し、地平線 $r_h>0$ を持つ $f$ を求めよ。

<!-- solution-start -->
**詳細解答。** まず[曲率方程式](../BHI19/index.md#prop-bhi19-curvature-eom)に $R=-f''$ を代入して、二度積分します。

$$
f''=\frac{2}{\ell^2}
\quad\Longrightarrow\quad
f(r)=\frac{r^2}{\ell^2}+br+c.
$$

ここで $b,c$ は積分定数です。次に $\Phi'=a/\ell$ と $\Gamma^r_{tt}=ff'/2$ を使うと、[Hessian方程式](../BHI19/index.md#prop-bhi19-trace-hessian)の $tt$ 成分は

$$
-\frac{aff'}{2\ell}
=\nabla_t\nabla_t\Phi
=\frac{\Phi}{\ell^2}g_{tt}
=-\frac{afr}{\ell^3}.
$$

静的外部では $f>0$、仮定より $a>0$ なので、両辺を $-af$ で割れます。したがって $f'=2r/\ell^2$。上の積分結果を微分した $f'=2r/\ell^2+b$ と比較し、$b=0$ を得ます。最後に地平線条件を代入すると

$$
0=f(r_h)=\frac{r_h^2}{\ell^2}+c
\quad\Longrightarrow\quad
f(r)=\frac{r^2-r_h^2}{\ell^2}.
$$

曲率条件だけでは決められなかった一次項が、Hessian方程式によって消えた点を確認してください。
<!-- solution-end -->

<a id="ex-bhi20-b02"></a>

#### BHI20-B02 亀座標から正則座標を作る

- Level: B
- 問題: $\kappa=r_h/\ell^2$ とし、$r_*=\int dr/f$、$u=t-r_*$、$v=t+r_*$、$U=-e^{-\kappa u}$、$V=e^{\kappa v}$ を用いる。$UV$ を $r$ で表し、計量が $U=0$ と $V=0$ で有限になることを計算せよ。

<!-- solution-start -->
**詳細解答。** $r>r_h>0$ の領域で部分分数分解を行います。

$$
\frac1{f(r)}=\frac{\ell^2}{2r_h}
\left(\frac1{r-r_h}-\frac1{r+r_h}\right).
$$

これを積分し、$r_*(\infty)=0$ と規格化すると

$$
r_*(r)=\frac{\ell^2}{2r_h}
\log\left(\frac{r-r_h}{r+r_h}\right),
\qquad
UV=-e^{\kappa(v-u)}=-e^{2\kappa r_*}
=-\frac{r-r_h}{r+r_h}.
$$

ここで $v-u=2r_*$ を使いました。次に $dU=-\kappa U\,du$ と $dV=\kappa V\,dv$ から $du\,dv=-dU\,dV/(\kappa^2UV)$ を得て、$ds^2=-f\,du\,dv$ に代入します。従って

$$
ds^2=-fdu\,dv=\frac{f}{\kappa^2UV}dU\,dV
=-\frac{4\ell^2}{(1+UV)^2}dU\,dV.
$$

分母は $UV=0$ で1なので係数は有限です。$\Phi=(ar_h/\ell)(1-UV)/(1+UV)$ も正則であり、$r=r_h$ の発散は元の静的座標の問題だと分かります。
<!-- solution-end -->

<a id="ex-bhi20-b03"></a>

#### BHI20-B03 境界項の有限極限

- Level: B
- 問題: 第3節の $r=r_b$ における $K$、$\sqrt{-h}$、$\Phi_b$ をそれぞれ導き、標準反項とGHY項の和の $r_b\to\infty$ 極限を求めよ。$r_h,\ell,a,G_2$ を固定する。

<!-- solution-start -->
**詳細解答。** 外向き単位法線は $n^r=\sqrt f$ で、$\sqrt{-g}=1$ から $K=\partial_r\sqrt f=f'/(2\sqrt f)$ です。境界の誘導計量は $h_{tt}=-f(r_b)$ ですから、必要な三つの量は

$$
K=\frac{r_b}{\ell\sqrt{r_b^2-r_h^2}},\qquad
\sqrt{-h}=\frac{\sqrt{r_b^2-r_h^2}}\ell,\qquad
\Phi_b=\frac{ar_b}\ell.
$$

いずれも $r_b>r_h$ の境界で評価します。[標準反項の定義](../BHI19/index.md#def-bhi19-jt-action)を使い

$$
I_{\Phi K}+I_{\rm ct}
=\frac{\Delta t}{8\pi G_2}\sqrt{-h}\,\Phi_b(K-1/\ell)
=\frac{a\Delta t}{8\pi G_2\ell^3}r_b(r_b-\sqrt{r_b^2-r_h^2}).
$$

有理化して括弧は $r_b r_h^2/[r_b+\sqrt{r_b^2-r_h^2}]\to r_h^2/2$。従って極限は $a\Delta t\,r_h^2/(16\pi G_2\ell^3)$ です。これは指定した二つの**境界作用項の差**であり、全ての境界条件での全Euclid作用を自動的に決めるものではありません。
<!-- solution-end -->

<a id="ex-bhi20-b04"></a>

#### BHI20-B04 保存量と第一法則

- Level: B
- 問題: 静的JT解について $\mathcal C=\Phi^2-\ell^2(\nabla\Phi)^2$ と $dE=T_HdS_{\rm grav,h}$ をそれぞれ計算し、$\mathcal C$ と $E$ の関係を求めよ。基準は $E(0)=0$ とする。

<!-- solution-start -->
**詳細解答。** 勾配は $\partial_r\Phi=a/\ell$ のみで $(\nabla\Phi)^2=f a^2/\ell^2$。従って[保存量命題](#prop-bhi20-dilaton-invariant)より

$$
\mathcal C=\frac{a^2r^2}{\ell^2}-a^2\frac{r^2-r_h^2}{\ell^2}
=\frac{a^2r_h^2}{\ell^2}.
$$

一方、[第一法則の命題](#prop-bhi20-first-law)より $E=ar_h^2/(16\pi G_2\ell^3)$。$r_h^2=\ell^2\mathcal C/a^2$ を代入すると

$$
E=\frac{a}{16\pi G_2\ell^3}\,
\frac{\ell^2\mathcal C}{a^2}
=\frac{\mathcal C}{16\pi G_2a\ell}.
$$

$a$ の固定が重要で、$\mathcal C$ と $E$ は同じ境界規格化の解の族について比例します。
<!-- solution-end -->

### Level C：場の方程式から熱力学まで通しで示す

<a id="ex-bhi20-c01"></a>

#### BHI20-C01 JTブラックホールの総合再構成

- Level: C
- 問題: 真空JTで $\ell,G_2,a>0$ と $\Phi_0$ を固定し、次の静的形を採用する。

$$
ds^2=-f(r)dt^2+\frac{dr^2}{f(r)},
\qquad \Phi(r)=\frac{ar}{\ell}.
$$

  (i) Hessian方程式から $f$ を求め、$f(r_h)=0$ を満たす $r_h>0$ を指定せよ。

  (ii) 曲率と地平線の正則性を検証せよ。

  (iii) Euclid原点の正則性から周期 $\beta$ と温度 $T_H$ を得よ。

  (iv) 曲率項の円錐角欠損から $S_{\rm grav,h}$ を導け。

  (v) 同じ境界傾き $a$ の解の族で $E(0)=0$ としたエネルギーおよび比熱を求め、第一法則を直接確認せよ。

  (vi) 浴の放射エントロピーが地平線エントロピーだけで決まらない理由を述べよ。

<!-- solution-start -->
**詳細解答。**

(i) $g^{tt}=-1/f$、$g^{rr}=f$、$\Gamma^r_{tt}=ff'/2$、$\Gamma^r_{rr}=-f'/(2f)$ です。$\Phi'=a/\ell$ より $\nabla_t\nabla_t\Phi=-aff'/(2\ell)$。[真空Hessian方程式](../BHI19/index.md#prop-bhi19-trace-hessian)の $tt$ 成分 $\nabla_t\nabla_t\Phi=-f\Phi/\ell^2$ に代入すると $f'=2r/\ell^2$。積分して $f=r^2/\ell^2-c$、$f(r_h)=0$ より $c=r_h^2/\ell^2$ です。

(ii) $\nabla_r\nabla_r\Phi=af'/(2\ell f)=ar/(\ell^3f)=g_{rr}\Phi/\ell^2$、$tr$ 成分も0。$R=-f''=-2/\ell^2$ なので[曲率方程式](../BHI19/index.md#prop-bhi19-curvature-eom)が成立します。$r=r_h$ で $f=0$ ですが、$r_*$ を積分して $U,V$ に移せば $ds^2=-4\ell^2dU\,dV/(1+UV)^2$ となり、分岐点近傍で正則です。

(iii) $f'(r_h)=2r_h/\ell^2$。Euclid化後、$r-r_h=\kappa\rho^2/2$、$\kappa=f'(r_h)/2$ と置くと $ds_E^2=d\rho^2+\kappa^2\rho^2d\tau^2+O(\rho^2)d\rho^2+O(\rho^4)d\tau^2$。角 $\kappa\tau$ の周期 $2\pi$ から $\beta=2\pi/\kappa=2\pi\ell^2/r_h$、$T_H=r_h/(2\pi\ell^2)$ です。

(iv) 円錐角 $2\pi n$ の先端では $\int_{\rm tip}\sqrt gR=4\pi(1-n)$、$\Phi$ は $\Phi_h=ar_h/\ell$ に近づきます。Euclid作用の曲率係数 $-(\Phi_0+\Phi)/(16\pi G_2)$ に代入すると $I^E_n-nI^E_1=-(1-n)(\Phi_0+\Phi_h)/(4G_2)+O((n-1)^2)$。$-\partial_n(\log Z_n-n\log Z_1)|_{n=1}$ を取ると

$$
S_{\rm grav,h}
=\frac{\Phi_0+\Phi_h}{4G_2}
=S_0+\frac{ar_h}{4G_2\ell}.
$$

(v) $dS_{\rm grav,h}/dr_h=a/(4G_2\ell)$ なので

$$
T_H\frac{dS_{\rm grav,h}}{dr_h}
=\frac{r_h}{2\pi\ell^2}\frac{a}{4G_2\ell}
=\frac{ar_h}{8\pi G_2\ell^3}.
$$

積分して $E=ar_h^2/(16\pi G_2\ell^3)$。$r_h=2\pi\ell^2T_H$ を代入し、$E=(\pi a\ell/(4G_2))T_H^2$、比熱は $C=(\pi a\ell/(2G_2))T_H>0$ です。$dE/dr_h$ は上式の $T_HdS/dr_h$ と一致します。

(vi) 求めたのは**定常地平線**の幾何学的寄与です。[BHI18の浴区間のエントロピー](../BHI18/index.md#prop-bhi18-conformal-bath)には浴の量子状態・区間端点・cutoffが必要です。重力側にisland候補を許す場合には、その位置でのdilatonと物質エントロピーの組をさらに比較するため、$S_{\rm grav,h}$ だけから放射の精細エントロピーは決まりません。
<!-- solution-end -->
