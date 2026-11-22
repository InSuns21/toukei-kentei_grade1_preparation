# BHI25 island端点の極値化

<!-- definition-example-audit: strict -->

## 1. 候補の値から、端点の方程式へ

[BHI24の一般化エントロピー](../BHI24/index.md#def-bhi24-jt-island-ledger)は、重力側にisland候補を置いたときの値を与えました。ところが候補の端点を勝手に固定すると、場所を少し動かしただけで一般化エントロピーが変わるかもしれません。そのような領域は、重力を含む放射エントロピーの鞍点をまだ表していません。

この講ではまず **二つの端点それぞれに対する空間変分**を導きます。さらに、時間方向の変分も必要だという問題を、**二つの浴を持つ熱平衡JTブラックホール**の具体例で解決します。そこでは空間位置と端点時刻を同時に極値化でき、近地平線解・存在域・二次変分を計算できます。二浴の例はBHI24の「片側の有限浴区間」とは異なる観測領域です。後者の結果を、前者の式へ無断で代入することはしません。

[HOLO24の量子極値曲面の定義](../../HOLO/HOLO24/index.md#def-holo24-qes)では、許される**独立な法線方向すべて**の一次変分を零にします。二次元時空の端点では、空間方向と時間方向の両方が対象です。極値を取る操作と、複数の極値候補のどれが放射エントロピーを与えるかを選ぶ操作は別であり、後者はBHI26で扱います。

## 2. BHI24の四端点を一つずつ動かす

[BHI24の二端点island](../BHI24/index.md#def-bhi24-island-candidate)を同じ断面 $\tau=\tau_*$ に置きます。重力側の $y_1<y_2<0$ を動かし、浴の $b<L$、状態、物理cutoff $a$、重力有効結合を固定します。区間の長さを $\ell_I=y_2-y_1>0$、交差比を

$$
x=\frac{(y_2-y_1)(L-b)}{(b-y_1)(L-y_2)},\qquad 0<x<1
$$

とします。端点の共形因子を $\omega(y_j)$、dilatonを $\Phi(y_j)$ と記します。[四端点の物質エントロピー](../BHI24/index.md#prop-bhi24-four-endpoint-entropy)と[共通cutoffのJT台帳](../BHI24/index.md#prop-bhi24-assembled-ledger)から、端点に依存する部分は

$$
S_{\rm gen}(y_1,y_2)
=\frac{\Phi(y_1)+\Phi(y_2)}{4G_2}
+\frac c3\ln\ell_I
+\frac c6\{\omega(y_1)+\omega(y_2)\}
-\mathcal I(x)+C.
$$

$C$ は固定された浴端点、$S_0$、cutoffと端点定数からの、$y_1,y_2$ に依存しない項です。局所反項の形状依存は有効結合に吸収済みとし、そうでなければその偏導関数も加えます。物質状態のレプリカ相関が定める $\mathcal I(x)$ は微分可能と仮定します。

交差比を直接微分する前に対数を取ると、分母の微分の符号を取り違えにくくなります。

$$
\begin{aligned}
\ln x&=\ln(y_2-y_1)+\ln(L-b)
-\ln(b-y_1)-\ln(L-y_2),\\
\partial_{y_1}\ln x&=-\frac1{\ell_I}+\frac1{b-y_1},\\
\partial_{y_2}\ln x&=\frac1{\ell_I}+\frac1{L-y_2}.
\end{aligned}
$$

<a id="prop-bhi25-two-endpoint-equations"></a>

<!-- formal-statement-start -->
> **命題（二端点の等時刻停留方程式）**
>
> $y_1<y_2<0<b<L$、$G_2>0$、$c>0$ とし、共通断面上で $\Phi,\omega$ は各端点の近傍で微分可能、$\mathcal I$ は $0<x<1$ で微分可能とする。浴の端点、物質状態・cutoff、有効結合を固定して、上の一般化エントロピーを二つの重力端点について独立に変分すると、等時刻の停留条件は
>
$$
\boxed{\begin{aligned}
0=E_1&=\frac{\Phi'(y_1)}{4G_2}
+\frac c6\omega'(y_1)-\frac c{3\ell_I}
-x\mathcal I'(x)\left(-\frac1{\ell_I}+\frac1{b-y_1}\right),\\
0=E_2&=\frac{\Phi'(y_2)}{4G_2}
+\frac c6\omega'(y_2)+\frac c{3\ell_I}
-x\mathcal I'(x)\left(\frac1{\ell_I}+\frac1{L-y_2}\right).
\end{aligned}}$$
>
> この二式だけでは、時刻方向も停留する量子極値曲面とはまだ結論できない。
<!-- formal-statement-end -->

### 証明の見取り図

幾何項と各端点のWeyl項を一つずつ微分します。区間長の対数は左端と右端で符号が逆です。相互情報量には連鎖律を使い、上で計算した $\partial_{y_j}\ln x$ を代入します。

<!-- proof-start -->
### 証明

$y_2$ を固定して $y_1$ を動かすと $\partial_{y_1}\ell_I=-1$ です。従って

$$
\partial_{y_1}\left(\frac c3\ln\ell_I\right)
=-\frac c{3\ell_I}.
$$

相互情報量の項は $\partial_{y_1}[-\mathcal I(x)]=-\mathcal I'(x)\partial_{y_1}x$ であり、$\partial_{y_1}x=x\partial_{y_1}\ln x$ から第一式になります。一方 $\partial_{y_2}\ell_I=1$、$\partial_{y_2}x=x\partial_{y_2}\ln x$ なので第二式を得ます。両偏導関数を零とするのは**固定した空間断面の内部での必要条件**です。時刻を変えると四点のLorentz間隔と共形因子が変わるため、上の等時刻公式をそのまま時間微分しても全法線変分にはなりません。$\square$
<!-- proof-end -->

**直接例**：$y_1=-4,y_2=-2,b=1,L=5$ なら $\ell_I=2$、$x=8/35$ です。このとき

$$
\partial_{y_1}\ln x=-\frac12+\frac15=-\frac3{10},
\qquad
\partial_{y_2}\ln x=\frac12+\frac17=\frac9{14}.
$$

質量零自由Dirac真空に限定すれば、[BHI24の自由場相互情報量](../BHI24/index.md#prop-bhi24-four-endpoint-entropy)の後の具体式から $\mathcal I'(x)=1/[3(1-x)]$ なので、$x\mathcal I'(x)=8/81$ です。相関項の寄与は左端で $+4/135$、右端で $-4/63$ となります。これらとdilaton・Weylの微分を**同じ背景から**計算して初めて停留かどうかを判定できます。数値の位置を選ぶだけではQESはできません。

## 3. 時間方向も検算できる定常JT＋二浴の模型

時刻を変分するには、等時刻の真空四点関数ではなく、Lorentz時空の四端点相関を指定する必要があります。ここからは**二つの外部領域を持つ永遠JTブラックホール**に、それぞれ平坦な透過浴を付けた模型を使用します。左右の浴の放射半直線を同じ浴時刻 $t$ で集めます。観測領域が $R=R_L\cup R_R$ であり、islandの境界は左右一つずつです。

重力側の各外部座標 $\sigma<0$ で、$\kappa=2\pi T>0$、AdS半径 $\ell>0$ とし、

$$
ds_g^2=\frac{(\kappa\ell)^2}{\sinh^2(\kappa\sigma)}
(-dt^2+d\sigma^2),\qquad
ds_b^2=-dt^2+d\sigma^2\quad(\sigma>0).
$$

両側の境界は適切なcutoffで[BHI22の透過的接合](../BHI22/index.md#def-bhi22-cutoff-gluing)に従うものとします。物質は同じ透過的な質量零自由Dirac場 $c=N$（$N$ は正整数のコピー数）で、状態はKruskal座標に関する真空、すなわち平衡Hartle–Hawking状態です。浴へ出る流束と入る流束が釣り合うので、これは蒸発模型ではありません。

各浴の観測端点を $\sigma=b>0$、islandの両端点を $\sigma=-a<0$、両重力端点の時刻を $t_a$ にそろえます。対称にそろえる前の四つの端点は独立ですが、この左右対称な部分空間での変分を調べます。対称な状態のもとで、対称変位に関する停留性と、反対称変位に関する一次変分の零を合わせると全端点の一次停留性が得られます。ただし反対称方向の二次変分についてはこの計算だけでは判定しません。

dilatonの幾何エントロピーは各端点で

$$
S_g(-a)=S_0+S_h\coth(\kappa a),
\qquad S_h=\frac{\Phi_h}{4G_2}>0
$$

です。これは[JTのdilaton地平線エントロピー](../BHI20/index.md#prop-bhi20-entropy)を、静的外部座標の $r/r_h=\coth(\kappa a)$ で評価した表示です。$S_h$ はすでにエントロピー単位なので、もう一度 $4G_2$ で割りません。

計算に使う無次元変数は

$$
A=\kappa a,\quad B=\kappa b,\quad
U=\kappa t_a,\quad V=\kappa t,\quad X=A+B
$$

です。物質の実際の端点固有cutoffを $\epsilon_g,\epsilon_b>0$ とし、$S_0$ には同じ局所繰り込み処方を含めます。

<a id="def-bhi25-equilibrium-model"></a>

<!-- formal-statement-start -->
> **定義（二浴JTの対称island端点模型）**
>
> 上記の二側永遠JT幾何、左右で同一の透過的自由Dirac場とKruskal真空、浴半直線 $R_L,R_R$ の端点 $(t,b)$、対称な重力端点 $(t_a,-a)$、$a,b,\kappa,\ell,S_h,\epsilon_g,\epsilon_b>0$ を固定する。$A,B,U,V,X$ は上で定め、二つの区間の端点が空間的に分離する条件
>
$$
F:=\cosh X-\cosh(U-V)>0
$$
>
> を課す。この状態・領域・幾何の組を **二浴JTの対称island端点模型**とする。$S_0$ は二重に数えず、各重力端点に一度ずつ加える。
<!-- formal-statement-end -->

<!-- definition-example-start: def-bhi25-equilibrium-model -->
**定義の確認**：$\kappa=\ell=1$、$a=2$、$b=1$、$t=t_a=0$、$S_h=3$、$\epsilon_g=\epsilon_b=10^{-2}$、$c=1$ とします。$A=2,B=1,X=3,U=V=0$ なので $F=\cosh3-1>0$。重力端点は左右それぞれ $\sigma=-2$、浴端点はそれぞれ $\sigma=1$ です。両方のcutoffは正で、$\epsilon_{g,b}\ll a+b$。幾何項は $2S_0+6\coth2$ と、二端点分になります。この例は**領域と定義条件**を確認したもので、まだ停留解ではありません。
<!-- definition-example-end -->

### 四端点の物質エントロピー

二浴の純粋な全物質状態では、$I\cup R$ の補集合は左右の $(\sigma=-a)\to(\sigma=b)$ を結ぶ二つの区間です。[BHI24の二区間Dirac真空](../BHI24/index.md#prop-bhi24-four-endpoint-entropy)の相互情報量に対応する四点相関を、今回はKruskal座標へ写して評価します。例えば右外部の光円錐座標は

$$
w^+=e^{\kappa(\sigma+t)},\qquad
w^-=-e^{\kappa(\sigma-t)}
$$

と選べます。左外部は符号と未来向きの時間を反転して指定します。同じ側の浴点と重力点の二つの光円錐差の積は

$$
\begin{aligned}
D_{\rm same}
&=(e^{B+V}-e^{-A+U})
  (e^{B-V}-e^{-A-U})\\
&=e^{2B}+e^{-2A}-2e^{B-A}\cosh(U-V)\\
&=2e^{B-A}\{\cosh X-\cosh(U-V)\}
=2e^{B-A}F.
\end{aligned}
$$

左右をまたぐ距離では $w^\pm$ の符号が逆になるため、同じ計算の引き算が足し算へ変わり、両端点に対する光円錐差の積は

$
D_{\rm cross}
=2e^{B-A}\{\cosh X+\cosh(U+V)\}
=4e^{B-A}C_-C_+
$

となります。一方、左右の**重力端点どうし**の差の積は $D_{gg}=4e^{-2A}\cosh^2U$、左右の**浴端点どうし**は $D_{bb}=4e^{2B}\cosh^2V$ です。これら四種の距離を自由Dirac場の二区間公式へ代入します。

$
\frac{D_{\rm same}^2D_{gg}D_{bb}}{D_{\rm cross}^2}
=\left(\frac{2e^{B-A}F\cosh U\cosh V}{C_-C_+}\right)^2.
$

Kruskal座標へのJacobian（各点で $\kappa e^{\kappa\sigma}$）と端点Weyl因子（重力側 $\kappa\ell/\sinh A$、浴側 $1$）を固有cutoffに対応付けます。二端点ごとの局所長の積を差し引くと、指数因子 $e^{B-A}$ は打ち消し合い、次の $C_\pm$ が分母に残ります。

$$
C_\pm=\cosh\frac{X\pm(U+V)}2,\qquad C_\pm>0.
$$

<a id="prop-bhi25-thermal-functional"></a>

<!-- formal-statement-start -->
> **命題（二浴JTの一般化エントロピーと二つの停留方程式）**
>
> [二浴JTの対称island端点模型](#def-bhi25-equilibrium-model)において、自由Dirac場の四点相関にレプリカの $n\to1$ 接続を適用でき、端点の繰り込み処方が一致すると仮定する。$F>0$ で、対称な二重力端点の一般化エントロピーは
>
$$
\boxed{\displaystyle
S_I(A,U;V)=2S_0+2S_h\coth A
+\frac c3\ln\frac{2\ell\cosh U\cosh V\,F}
{\kappa\epsilon_g\epsilon_b\sinh A\,C_-C_+}.
}
$$
>
> $T_\pm=\tanh[(X\pm(U+V))/2]$ とおくと、端点の半径方向と時間方向の必要十分な**対称変分での一次停留条件**は、次の連立方程式である。
>
$$
\boxed{\begin{aligned}
0&=-2S_h\operatorname{csch}^2 A
+\frac c3\left\{\frac{\sinh X}{F}-\coth A-\frac{T_-+T_+}{2}\right\},\\
0&=\frac c3\left\{\tanh U-\frac{\sinh(U-V)}{F}+\frac{T_--T_+}{2}\right\}.
\end{aligned}}$$
>
> 対称性と場の解が反対称端点変位の一次変分にも不変なら、この解は四つの法線自由度について一次停留する。時間・空間の二次変分がともに正であるとは主張しない。
<!-- formal-statement-end -->

### 証明の見取り図

二区間の物質エントロピーを光円錐差・Weyl・cutoffから作ります。式の微分では $\ln F$、$\ln\sinh A$、$\ln C_\pm$ に分けると、時間微分の符号を追いやすくなります。

<!-- proof-start -->
### 証明

自由Dirac真空では同一cutoffでの二区間エントロピーを各単一区間の和から交差比の相互情報量を引いて得ます。[BHI24で確定した端点と相互情報量の処方](../BHI24/index.md#prop-bhi24-four-endpoint-entropy)をKruskal真空で使います。二つの単一区間の距離積は $D_{\rm same}^2$、二区間の交差相関は $D_{gg}D_{bb}/D_{\rm cross}^2$ を与えます。直前で個別に計算した四種の距離を入れると上の平方の式になります。Kruskal座標での各端点の座標cutoffは、$\sigma$ の座標cutoffへ $|dw^\pm/d\sigma|=\kappa e^{\kappa\sigma}$ を掛けたものです。さらに固有cutoffへの変換には $e^{\omega_g}=\kappa\ell/\sinh A$、浴側には $e^{\omega_b}=1$ を使います。従って $e^{B-A}$ が相殺され、残った端点因子は

$$
\frac{2\ell\cosh U\cosh V\,F}
{\kappa\epsilon_g\epsilon_b\sinh A\,C_-C_+}
$$

で、対数の係数は左右二組を含む $c/3$ です。幾何項 $2S_0+2S_h\coth A$ を足すと第一式を得ます。

次に $V$ を固定し、$X=A+B$ より $\partial_A X=1$ を使います。

$$
\begin{aligned}
\partial_A F&=\sinh X,&
\partial_U F&=-\sinh(U-V),\\
\partial_A\ln(C_-C_+)&=\tfrac12(T_-+T_+),&
\partial_U\ln(C_-C_+)&=\tfrac12(-T_-+T_+).
\end{aligned}
$$

また $\partial_A\coth A=-\operatorname{csch}^2A$、$\partial_A\ln\sinh A=\coth A$、$\partial_U\ln\cosh U=\tanh U$ です。これらを $\partial_A S_I$ と $\partial_U S_I$ にそれぞれ代入すると表示した二式になります。$a,t_a$ で微分したときはそれぞれ $\kappa$ 倍であり、$\kappa>0$ なので零点は同じです。$\square$
<!-- proof-end -->

この関数は**自由Dirac場に特有の計算可能な例**です。任意のCFTへ中心電荷 $c$ だけを入れ替えて普遍公式として使うことはできません。

**有限時刻でも二式を同時に解けるか**：$c=\kappa=\ell=1$、$S_h=12$、$B=\ln2$、$V=8$ とします。$\partial_A S_I=\partial_U S_I=0$ を二変数で解くと

$
A\simeq5.68740679323,\qquad U-V\simeq0.01910155075.
$

この点で $F\simeq294.128>0$、両停留式の残差の絶対値は、表示桁数で $10^{-9}$ 未満です。二次微分は $\partial_A^2S_I\simeq0.00106455$、$\partial_U^2S_I\simeq-0.00115508$、混合微分は $\partial_A\partial_U S_I\simeq0.00004344$ で、Hessianの行列式は約 $-1.23\times10^{-6}$。有限時刻で $U-V$ は小さいものの、**零ではありません**。この例は対称部分空間の局所的な実数鞍点の検算であり、すべての対称・非対称・複素鞍点を列挙した結果ではありません。

## 4. 後期極限を取り、近地平線解を求める

二つの浴時刻・端点時刻が十分遅く、$U,V\to+\infty$、$U-V$ が有界、$U+V\gg A+B$ である領域を考えます。この極限では

$$
C_-C_+=\frac{\cosh X+\cosh(U+V)}2,
\qquad
\frac{\cosh U\cosh V}{C_-C_+}\longrightarrow1.
$$

時間微分の方程式もこの極限で

$$
0=-\frac c3\frac{\sinh(U-V)}
{\cosh(A+B)-\cosh(U-V)}
$$

となるので、$F>0$ の実数解では $U=V$ です。**有限時刻に $U=V$ を先に代入してはいけません。** $T_\pm$ の残りが有限時刻のずれを作るからです。

後期の半径方向の式を $U=V$ に評価すると

$$
0=-2S_h\operatorname{csch}^2 A
+\frac c3\left\{\coth\frac{A+B}2-\coth A\right\}.
$$

ここで $q=e^{-A}$、$y=e^{-B}$ と置きます。$B>0$ なので $0<y<1$。双曲線関数を指数で展開すれば、

$$
\operatorname{csch}^2 A=\frac{4q^2}{(1-q^2)^2},
\qquad
\coth\frac{A+B}2-\coth A
=\frac{2q(y-q)}{(1-qy)(1-q^2)}.
$$

<a id="prop-bhi25-near-horizon-root"></a>

<!-- formal-statement-start -->
> **命題（後期対称枝の一意な外部極値と近地平線距離）**
>
> 上の二浴JT模型で $S_h,c>0$、$B>0$ を固定し、後期極限が正当化されるとする。$0<q<y=e^{-B}$ における半径方向の停留方程式は
>
$$
\boxed{12S_hq(1-qy)=c(y-q)(1-q^2)}
$$
>
> と同値で、この区間に解 $q_*$ がちょうど一つ存在する。$S_h/c\to\infty$、$B$ 固定なら
>
$$
q_*=\frac{cy}{12S_h}+O\left(\frac{c^2}{S_h^2}\right),\qquad
A_*=-\ln q_*>B.
$$
>
> その位置から分岐地平線（$\sigma\to-\infty$）までの定時刻固有距離は
>
$$
d_{\rm hor}=2\ell\,\operatorname{artanh}(q_*)
=\frac{c\ell y}{6S_h}
+O\left(\frac{c^2}{S_h^2}\right).
$$
>
> したがって大きな地平線エントロピーの領域で、解は**外部側から**地平線に固有距離の意味で近づく。
<!-- formal-statement-end -->

### 証明の見取り図

指数変数に直すと停留式は有理式の等式になります。存在・一意性は $0<q<y$ の範囲で左右の比の単調性を調べます。最後にJT計量を使って固有距離を積分します。

<!-- proof-start -->
### 証明

双曲線関数の二式を後期停留式へ代入し、正の因子 $2q/[(1-qy)(1-q^2)]$ で両辺を割ると

$$
12S_hq(1-qy)=c(y-q)(1-q^2)
$$

を得ます。$0<q<y<1$ なら分母は正です。$g(q)=q(1-qy)/[(y-q)(1-q^2)]$ と定めると、停留式は $g(q)=c/(12S_h)$ です。$g(q)\to0$（$q\downarrow0$）、$g(q)\to+\infty$（$q\uparrow y$）であり、連続です。

正の $g$ について対数微分すると、

$$
\frac{g'(q)}{g(q)}
=\frac1q-\frac y{1-qy}
+\frac1{y-q}+\frac{2q}{1-q^2}.
$$

ここで

$$
q(y-q)<1-qy
\quad\Longleftrightarrow\quad
q(2y-q)<1
$$

です。実際 $q(2y-q)=y^2-(y-q)^2<y^2<1$。従って

$$
\frac1q+\frac1{y-q}
=\frac y{q(y-q)}
>\frac y{1-qy},
$$

残りの $2q/(1-q^2)$ も正です。よって $g'(q)>0$、中間値の定理と合わせて根は一意です。

$S_h/c\gg1$ なら $g(q_*)=c/(12S_h)\ll1$ なので $q_*\ll y$。$g(q)=q/y+O(q^2)$ を代入して

$$
q_*=\frac{cy}{12S_h}+O((c/S_h)^2)
$$

と得ます。$q_*<y$ は $A_*>B$ と同値です。重力側の空間計量から、$\sigma=-a$ と $\sigma\to-\infty$ の間の固有距離は

$$
\begin{aligned}
d_{\rm hor}
&=\int_a^\infty\frac{\kappa\ell}{\sinh(\kappa s)}\,ds\\
&=\ell\ln\coth\frac A2
=\ell\ln\frac{1+e^{-A}}{1-e^{-A}}
=2\ell\,\operatorname{artanh}(q).
\end{aligned}
$$

$\operatorname{artanh}q=q+O(q^3)$ を使えば最後の展開が出ます。$\square$
<!-- proof-end -->

**数値での定義・方程式の確認**：$\kappa=\ell=c=1$、$S_h=12$、$B=\ln2$ とします。$y=1/2$、根を上の**一変数方程式**から求めると

$$
q_*\simeq0.003454159471,\quad
A_*\simeq5.6681761304,\quad
d_{\rm hor}/\ell\simeq0.00690834642.
$$

丸めた $q_*$ を代入した方程式の左右差は $3\times10^{-11}$ 未満です。単純な一次近似 $cy/(12S_h)=1/288\simeq0.00347222$ は、位置の大きさをよく説明します。座標 $a=A/\kappa$ が**大きい**一方、地平線までの**固有距離は小さい**ことに注意してください。

## 5. 極値の存在と二次変分：時間方向は最小とは限らない

時間を含むQESは停留点であり、Lorentz時空のすべての座標について最小値を与えるという意味ではありません。後期の $U=V$ で、二次微分の主要項を別々に計算します。

<a id="prop-bhi25-hessian-and-early-check"></a>

<!-- formal-statement-start -->
> **命題（後期枝の二次変分と初期の失敗例）**
>
> [後期対称枝の根](#prop-bhi25-near-horizon-root)を持つ二浴JT模型で、$S_h/c\gg1$、$U+V\gg A+B$ とする。後期の停留点で
>
$$
\begin{aligned}
\partial_A^2 S_I
&=4S_h\coth A\,\operatorname{csch}^2 A
+\frac c3\left\{-\frac12\operatorname{csch}^2\frac{A+B}2
+\operatorname{csch}^2 A\right\}+o(1),\\
\partial_U^2 S_I
&=-\frac c{3(\cosh(A+B)-1)}+o(1).
\end{aligned}
$$
>
> とくに十分大きな $S_h/c$ では半径方向の二次変分は正、時間方向は負となる。一方、$B=1$、$V=U=0$ に限った初期の時間反転対称断面では、任意の $A>0$ で $\partial_A S_I<0$ となり、対称な実数停留解は存在しない。
<!-- formal-statement-end -->

### 証明の見取り図

前半は後期の半径方程式をもう一度微分します。時間方向は $\ln F$ の二階微分を取ると負号が残ります。後半は初期時刻に**有限時刻の元の式**を使い、半径微分が全域で負だと示します。

<!-- proof-start -->
### 証明

後期の半径微分は第4節で導いた式です。$\partial_A\operatorname{csch}^2A=-2\coth A\,\operatorname{csch}^2A$、$\partial_A\coth[(A+B)/2]=-\tfrac12\operatorname{csch}^2[(A+B)/2]$ から第一式を得ます。停留解の $q\sim cy/(12S_h)$ を用いると、第一式の主項は

$$
16S_hq^2-\frac{2c}{3}qy+O(cq^2)
=\frac{c^2y^2}{18S_h}+O\left(\frac{c^3}{S_h^2}\right)>0
$$

です。時間方向では、後期に $\cosh U\cosh V/(C_-C_+)\to1$ なので $U$ 依存は $\ln[\cosh X-\cosh(U-V)]$ に残ります。

$$
\left.\partial_U^2\ln F\right|_{U=V}
=-\frac1{\cosh X-1},
$$

ゆえに第二式は負です。誤差項は後期極限を固定パラメータで取り、必要な一階・二階微分にも一様な制御がある場合に限って小さいものとします。**すべての端点自由度に対する正定値Hessianは結論できません**。

初期の $U=V=0$ では元の式を直接簡約すると

$$
S_I(A,0;0)=2S_0+2S_h\coth A
+\frac c3\ln\frac{4\ell\,\tanh^2[(A+B)/2]}
{\kappa\epsilon_g\epsilon_b\sinh A}.
$$

この式を微分し、$B=1$ とすると

$$
\partial_A S_I
=-2S_h\operatorname{csch}^2A
+\frac c3\left\{\frac2{\sinh(A+1)}-\coth A\right\}.
$$

$\sinh(A+1)/\tanh A=\cosh A\cosh1+(\sinh A+1/\sinh A)\sinh1$ です。$A>0$ では $\cosh A\ge1$、$\sinh A+1/\sinh A\ge2$ なので右辺は $2$ より大きく、

$$
\frac2{\sinh(A+1)}<\coth A.
$$

二つの項がともに負であるため $\partial_A S_I<0$ です。この断面に対称な実数停留解はありません。ここから任意の非対称鞍点の不存在までは結論できません。$\square$
<!-- proof-end -->

**反例の機構**：初期時刻にも後期の式 $U=V$ と近地平線根を代入してしまうと、実際には零でない $T_\pm$ の変分を捨てます。$\partial_A S_I$ が常に負である模型では、端点を数値的に移動して停留位置を探索してもcutoff境界へ押し付けるだけでQESになりません。失われた仮定は**後期の相関因子の因数分解**です。

本講は **停留点の構成**までです。$S_I$ と空候補のエントロピーのどちらを選ぶか、複数のレプリカ鞍点の寄与をどう扱うかは[BHI24の区別](../BHI24/index.md#prop-bhi24-assembled-ledger)を維持してBHI26で比較します。

## 6. 演習：端点条件を自力で再構成する

すべて自然対数を使います。特記しない限り第3節以降の二浴JT・自由Dirac模型を用い、端点cutoffと有効重力結合を変分中は固定します。

### Level A：一方向ずつ計算する

<a id="ex-bhi25-a01"></a>

#### BHI25-A01 交差比の微分

- Level: A
- 問題: $y_1=-5,y_2=-3,b=1,L=4$ の交差比 $x$ と $\partial_{y_1}\ln x,\partial_{y_2}\ln x$ を求めよ。

<!-- solution-start -->
**詳細解答。** [BHI24の交差比](../BHI24/index.md#def-bhi24-cross-ratio)へ $\ell_I=2,L-b=3,b-y_1=6,L-y_2=7$ を代入すると $x=6/(6\cdot7)=1/7$ です。[本講の微分式](#prop-bhi25-two-endpoint-equations)を使い、

$$
\partial_{y_1}\ln x=-\frac12+\frac16=-\frac13,\qquad
\partial_{y_2}\ln x=\frac12+\frac17=\frac9{14}.
$$

左端を右へ動かすと島の長さは縮み、右端を右へ動かすと長さと近接相関が増えることに符号が対応します。
<!-- solution-end -->

<a id="ex-bhi25-a02"></a>

#### BHI25-A02 Dirac相関の連鎖律

- Level: A
- 問題: 自由Dirac真空で $\mathcal I(x)=-\tfrac13\ln(1-x)$ とする。$x=1/7$ かつA01の端点について、$-\partial_{y_1}\mathcal I(x)$ と $-\partial_{y_2}\mathcal I(x)$ を求めよ。

<!-- solution-start -->
**詳細解答。** $\mathcal I'(x)=1/[3(1-x)]$ です。$x\mathcal I'(x)=(1/7)/[3(6/7)]=1/18$。連鎖律から

$$
-\partial_{y_1}\mathcal I=-\frac1{18}\left(-\frac13\right)=\frac1{54},
\quad
-\partial_{y_2}\mathcal I=-\frac1{18}\frac9{14}=-\frac1{28}.
$$

$-\mathcal I$ の微分を $\mathcal I'$ だけで終わらせず、$\partial x=x\partial\ln x$ を掛けました。
<!-- solution-end -->

<a id="ex-bhi25-a03"></a>

#### BHI25-A03 固有cutoffとWeyl因子

- Level: A
- 問題: $A=2,\kappa=\ell=1$ の重力端点で計量が第3節の形を持ち、固有cutoffが $\epsilon_g=0.01$ のとき、重力側の座標cutoffを求めよ。浴のcutoffは $\epsilon_b=0.01$、Weyl因子は $1$ とする。

<!-- solution-start -->
**詳細解答。** 重力側では $e^{\omega_g}=\kappa\ell/\sinh A=1/\sinh2$ です。固有長 $\epsilon_g$ と座標長 $\delta_g$ は $\epsilon_g=e^{\omega_g}\delta_g$ で結ばれるので、

$$
\delta_g=\epsilon_ge^{-\omega_g}=0.01\sinh2.
$$

浴では $\delta_b=0.01$ です。異なる端点で同じ**固有**cutoffを置くことは、同じ座標cutoffを置くこととは異なります。
<!-- solution-end -->

<a id="ex-bhi25-a04"></a>

#### BHI25-A04 空間的分離と時間差

- Level: A
- 問題: $A=2,B=1,U-V=2$ と $U-V=4$ の二組について $F>0$ を判定せよ。

<!-- solution-start -->
**詳細解答。** $X=A+B=3$、$F=\cosh3-\cosh(U-V)$ です。$\cosh s$ は $s\ge0$ で厳密増加なので、$|U-V|=2<3$ の前者は $F>0$、$|U-V|=4>3$ の後者は $F<0$。後者は指定した空間的分離の実数領域から外れます。$\ln F$ を実数の物質エントロピーとしてそのまま続けてはいけません。
<!-- solution-end -->

<a id="ex-bhi25-a05"></a>

#### BHI25-A05 幾何項の微分

- Level: A
- 問題: $S_g(A)=S_0+S_h\coth A$ の一次・二次微分を求め、$S_h>0,A>0$ での符号を説明せよ。

<!-- solution-start -->
**詳細解答。** $\coth A=\cosh A/\sinh A$ なので商の微分より

$$
\frac{d}{dA}\coth A
=\frac{\sinh^2 A-\cosh^2 A}{\sinh^2 A}
=-\operatorname{csch}^2 A.
$$

さらに $\frac{d}{dA}(\sinh^{-2}A)=-2\cosh A/\sinh^3A$ だから

$$
S_g'=-S_h\operatorname{csch}^2A<0,\qquad
S_g''=2S_h\coth A\,\operatorname{csch}^2A>0.
$$

二端点の対称変分なら両式に係数 $2$ が掛かります。
<!-- solution-end -->

### Level B：物質と重力の微分を結ぶ

<a id="ex-bhi25-b01"></a>

#### BHI25-B01 時間偏導関数を復元する

- Level: B
- 問題: 第3節の $F,C_\pm$ を用い、$V$ 固定で $\partial_U\ln[\cosh U F/(C_-C_+)]$ を計算せよ。$U=V$ が**有限時刻**の一般解とは限らないことを示せ。

<!-- solution-start -->
**詳細解答。** $\partial_U\ln\cosh U=\tanh U$、$\partial_U\ln F=-\sinh(U-V)/F$ です。$C_-=\cosh[(X-U-V)/2]$ なので $\partial_U\ln C_-=-T_-/2$、$C_+$ は $+T_+/2$。したがって

$$
\partial_U\ln\frac{\cosh U F}{C_-C_+}
=\tanh U-\frac{\sinh(U-V)}F+\frac{T_--T_+}{2}.
$$

$U=V$ を代入した値は $\tanh V+[T_-(X,2V)-T_+(X,2V)]/2$ であり、一般に零でありません。$U,V\to+\infty$、$U-V$ 有界の**後期極限**では $T_-\to-1,T_+\to1,\tanh U\to1$ が相殺し、残る時間差の式から $U=V$ が導かれます。[時間停留方程式](#prop-bhi25-thermal-functional)の適用域を区別しました。
<!-- solution-end -->

<a id="ex-bhi25-b02"></a>

#### BHI25-B02 後期の有理方程式

- Level: B
- 問題: $\partial_A S_I=0$ の後期式から $q=e^{-A},y=e^{-B}$ による三次方程式を、双曲線関数を指数表示して導け。

<!-- solution-start -->
**詳細解答。** [後期の停留式](#prop-bhi25-near-horizon-root)の証明に沿い、

$$
\operatorname{csch}^2 A=\frac{4q^2}{(1-q^2)^2},
\quad
\coth\frac{A+B}2-\coth A
=\frac{2q(y-q)}{(1-qy)(1-q^2)}
$$

を得ます。元の等式

$$
2S_h\frac{4q^2}{(1-q^2)^2}
=\frac c3\frac{2q(y-q)}{(1-qy)(1-q^2)}
$$

で $q>0$、$q<y<1$ を使って正の分母を払うと

$$
12S_hq(1-qy)=c(y-q)(1-q^2)
$$

です。$q=0$ は除した因子が零になる境界であって、有限な外部端点の解に追加しません。
<!-- solution-end -->

<a id="ex-bhi25-b03"></a>

#### BHI25-B03 解の一意性と近地平線距離

- Level: B
- 問題: $0<q<y<1$ で $g(q)=q(1-qy)/[(y-q)(1-q^2)]$ が単調増加することを示し、$S_h/c\gg1$ の根から固有距離を一次まで展開せよ。

<!-- solution-start -->
**詳細解答。** [後期根の命題](#prop-bhi25-near-horizon-root)に対し、

$$
\frac{g'}g=\frac1q+\frac1{y-q}
-\frac y{1-qy}+\frac{2q}{1-q^2}.
$$

$q(2y-q)=y^2-(y-q)^2<1$ より $q(y-q)<1-qy$。従って $1/q+1/(y-q)=y/[q(y-q)]>y/(1-qy)$ で、さらに最後の項も正です。従って $g'>0$。$g(0+)=0,g(y-)=\infty$ から根は一つです。小さい根では $g(q)=q/y+O(q^2)$ なので $q_*=cy/(12S_h)+O((c/S_h)^2)$。距離積分の結果 $2\ell\operatorname{artanh}q_*$ を使い、$\operatorname{artanh}q=q+O(q^3)$ を代入して

$$
d_{\rm hor}=\frac{c\ell y}{6S_h}+O\left(\frac{c^2}{S_h^2}\right)
$$

です。ここでは $y$ は固定して極限を取りました。
<!-- solution-end -->

<a id="ex-bhi25-b04"></a>

#### BHI25-B04 初期に偽の停留解を作らない

- Level: B
- 問題: $B=1,U=V=0$ における半径偏導関数の符号を全 $A>0$ で示し、後期解を初期時刻へ代入できない理由を述べよ。

<!-- solution-start -->
**詳細解答。** [初期時刻の命題](#prop-bhi25-hessian-and-early-check)の有限時刻関数から

$$
\partial_A S_I=-2S_h\operatorname{csch}^2A
+\frac c3\left(\frac2{\sinh(A+1)}-\coth A\right).
$$

$\sinh(A+1)/\tanh A
=\cosh A\cosh1+(\sinh A+1/\sinh A)\sinh1$ であり、$\cosh A\ge1$ と $\sinh A+1/\sinh A\ge2$ から右辺は $2$ より大きいです。よって $2/\sinh(A+1)<\coth A$。$S_h,c>0$ なら両項とも負なので停留解はありません。後期の近地平線根は $\cosh U\cosh V/(C_-C_+)\to1$ を微分まで使った近似から得たもので、$U=V=0$ ではその近似が成立しないことが失敗の原因です。
<!-- solution-end -->

### Level C：模型・二方向の停留・適用限界を統合する

<a id="ex-bhi25-c01"></a>

#### BHI25-C01 二浴JTの端点を自力で決める

- Level: C
- 問題: 第3節の二浴JT模型で $c=\kappa=\ell=1$、$S_h=12$、$B=\ln2$ とする。後期近似のもとで（1）$A,U$ の停留条件を書き、（2）外部に根が存在することと数値的な $A_*$ を求め、（3）地平線までの固有距離とHessianの二方向の符号を調べ、（4）この計算だけではPage転移と復号が証明されない理由を述べよ。

<!-- solution-start -->
**詳細解答。** まず $U,V$ が大きく差が有界なら、[二つの停留方程式](#prop-bhi25-thermal-functional)の後期形は

$$
0=-2S_h\operatorname{csch}^2 A
+\frac13\left(\coth\frac{A+B}2-\coth A\right),
\qquad
0=-\frac13\frac{\sinh(U-V)}{\cosh(A+B)-\cosh(U-V)}.
$$

$F>0$ の実数領域では後式より $U=V$。$y=e^{-B}=1/2$、$q=e^{-A}$ とすると第一式は

$$
144q(1-\tfrac12q)=(\tfrac12-q)(1-q^2).
$$

$0<q<1/2$ に対して左辺と右辺の比が厳密増加することは[一意性の命題](#prop-bhi25-near-horizon-root)から分かり、根は一つです。代入して二分法やNewton法で求めると

$$
q_*\simeq0.003454159471,\qquad
A_*=-\ln q_*\simeq5.6681761304.
$$

根は $q_*<y$ なので $A_*>B$ を満たし、外部側です。固有距離は

$$
d_{\rm hor}=2\ell\operatorname{artanh}q_*
\simeq0.00690834642
$$

です。後期Hessianの第4・5節の式を代入すると

$$
\partial_A^2 S_I\simeq0.00115144>0,\qquad
\partial_U^2 S_I\simeq-0.00115537<0
$$

となります（**後期近似を施した式**についての数値です）。時間方向は最大型であり、全座標の数値最小化を意味しません。最後に、この計算は**island枝の停留位置**を定めただけです。空枝とのエントロピー比較、レプリカ鞍点の支配性、放射の状態から情報を抽出する回復写像は計算していません。それぞれBHI26以降の別の条件です。
<!-- solution-end -->

## 7. どこまで分かったか

- **一般の四端点候補**：$\partial_{y_1}S_{\rm gen}=\partial_{y_2}S_{\rm gen}=0$ は式で書けました。ただし等時刻の二式だけで完全なQESは判定しません。
- **二浴の定常JT＋自由Dirac模型**：共通状態とcutoffから時間・空間の停留方程式を作りました。左右対称な後期枝は一意な外部解を持ち、大きな地平線エントロピーでは固有距離が小さくなります。
- **存在域と安定性**：$F>0$ と $0<q<y<1$ を確認し、時間方向の二次変分は負となること、初期時刻には後期枝を機械的に延長できないことを示しました。
- **次に残る問題**：対称枝の存在や正の半径方向Hessianだけでは支配鞍点は決まりません。BHI26で**極値を求めた後に**空枝との交点とPage転移を比較します。

参考： [Almheiri–Mahajan–Maldacena–Zhao, *The Page curve of Hawking radiation from semiclassical geometry*](https://arxiv.org/abs/1908.10996)、[Almheiriほか, *The Entropy of Hawking Radiation*](https://doi.org/10.1103/RevModPhys.93.035002)、[JT平衡浴と端点計算の講義ノート](https://msguima.github.io/wiki/courses/ads-cft-course/notes/lecture-25-jt-and-bath)。
