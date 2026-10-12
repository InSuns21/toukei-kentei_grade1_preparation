# SREL8 Rindler座標と因果構造

<!-- definition-example-audit: strict -->

[SREL2の光円錐と因果順序](../SREL2/index.md#def-srel2-light-cone)は、慣性観測者が使う座標では見通しよく表せました。しかし、ロケットが加速を続ける観測者に、遠方から送った光がいつでも届くとは限りません。**時空は平坦なままなのに、一人の観測者にとって到達できない事象が現れるのはなぜか**を、座標変換と光線の式だけから解き明かします。

本章では四次元Minkowski時空の一つの慣性座標 $(ct,x,y,z)$、光速 $c>0$、計量 $\operatorname{diag}(1,-1,-1,-1)$ を固定します。計算の中心は $y,z$ が一定の $(ct,x)$ 平面です。$a>0$ は加速度の次元を持つ定数で、個々の観測者の固有加速度が必ず $a$ とは限りません。世界線・光信号は未来向きとし、必要な関数は各開領域で滑らかとします。[固有時の定義](../SREL2/index.md#def-srel2-proper-time)と[四元加速度・固有加速度](../SREL3/index.md#def-srel3-four-acceleration)を用います。

## 1. 加速する観測者に適した座標

一つのロケットを慣性座標で追うだけなら、その世界線を直接与えれば十分です。しかし、ロケットの近くに並ぶ複数の時計と、その時計の目盛りを一つの座標系で記述したいときには、各時計が空間座標を一定に保つ新しい座標が便利です。

$s_0=c^2/a>0$ と置き、$s=s_0+\xi$、$A=a\eta/c$ とします。$\xi$ は長さ、$\eta$ は時間の単位を持ちます。$s>0$ の範囲で次の変換を使います。

<a id="def-srel8-rindler-chart"></a>

<!-- formal-statement-start -->
> **定義（右Rindler座標）**  
> 定数 $c,a>0$、$s_0=c^2/a$ に対し、実数 $\eta$ と $\xi>-s_0$ から、Minkowski座標を

$$
ct=(s_0+\xi)\sinh(a\eta/c),\qquad
x=(s_0+\xi)\cosh(a\eta/c)
$$

> によって与え、$y,z$ は変えない。この $(\eta,\xi,y,z)$ を右Rindler座標という。その座標領域は $W_R=\{(ct,x,y,z):x>|ct|\}$ である。
<!-- formal-statement-end -->

<!-- definition-example-start: def-srel8-rindler-chart -->
### 直接例：右Rindler座標の定義域

**定義の確認**：$\eta=0,\xi=0$ では $(ct,x)=(0,s_0)$、$\eta=0,\xi=s_0$ では $(ct,x)=(0,2s_0)$ です。いずれも $x>|ct|$ を満たします。反対に $(ct,x)=(0,-s_0)$ は $x>|ct|$ を満たさず、この座標変換で表せません。定義域の不等式は飾りではなく、どの事象を記述できるかを決めています。
<!-- definition-example-end -->

$s>0$ なら $x=s\cosh A>0$ で、$x^2-(ct)^2=s^2(\cosh^2A-\sinh^2A)=s^2>0$。逆に $x>|ct|$ なら $x-ct>0$、$x+ct>0$ なので

$$
s=\sqrt{x^2-c^2t^2},\qquad
\xi=\sqrt{x^2-c^2t^2}-s_0,\qquad
\eta=\frac{c}{2a}\log\frac{x+ct}{x-ct}
$$

を一意に取れます。ここで $\log$ の引数は正です。$\sinh A=(e^A-e^{-A})/2$ と $\cosh A=(e^A+e^{-A})/2$ から、逆式を元の変換に代入すれば $ct,x$ を回復します。従って変換は指定した開領域と $W_R$ の間の滑らかな一対一対応です。

座標 $\eta$ は、ロケットの時計が示す固有時と一般には一致しません。これを計量から検査します。

<a id="thm-srel8-metric"></a>

<!-- formal-statement-start -->
> **定理（Rindler座標におけるMinkowski計量）**  
> $c,a>0$、$s_0=c^2/a$、$\eta\in\mathbb R$、$\xi>-s_0$ とする。右Rindler変換 $ct=(s_0+\xi)\sinh(a\eta/c)$、$x=(s_0+\xi)\cosh(a\eta/c)$ の下で、Minkowskiの線素は

$$
ds^2=c^2\left(1+\frac{a\xi}{c^2}\right)^2d\eta^2-d\xi^2-dy^2-dz^2
$$

> となる。計量は $W_R$ 内で非退化であり、座標表示に $\xi$ が現れても時空の曲率が発生したことを意味しない。
<!-- formal-statement-end -->

### 証明の見取り図

$ct,x$ を $\eta,\xi$ で別々に微分すると交差項が相殺します。これは新しい重力場を仮定した結果ではなく、[Minkowski計量](../SREL2/index.md#def-srel2-minkowski-metric)の座標表示を書き直しただけです。

<!-- proof-start -->
### 証明

$s=s_0+\xi$、$A=a\eta/c$ と置けば $ds=d\xi$、$dA=(a/c)d\eta$ です。積と連鎖律で

$$
\begin{aligned}
d(ct)&=\sinh A\,d\xi+\frac{as}{c}\cosh A\,d\eta,\\
dx&=\cosh A\,d\xi+\frac{as}{c}\sinh A\,d\eta.
\end{aligned}
$$

従って二乗の差は

$$
\begin{aligned}
d(ct)^2-dx^2
&=(\sinh^2A-\cosh^2A)d\xi^2\\
&\quad+2\frac{as}{c}(\sinh A\cosh A-\cosh A\sinh A)d\xi\,d\eta\\
&\quad+\frac{a^2s^2}{c^2}(\cosh^2A-\sinh^2A)d\eta^2\\
&=-d\xi^2+\frac{a^2s^2}{c^2}d\eta^2.
\end{aligned}
$$

$s=s_0+\xi=(c^2/a)(1+a\xi/c^2)$ を代入すると $a^2s^2/c^2=c^2(1+a\xi/c^2)^2$ です。$dy,dz$ は不変なので示した式を得ます。$1+a\xi/c^2>0$ だから座標内で行列式は $-c^2(1+a\xi/c^2)^2\ne0$ です（時間座標は $\eta$）。曲率に関する主張は、同じ領域で滑らかな逆変換によりもとの平坦なMinkowski計量へ戻せることによります。
<!-- proof-end -->

ここで $h(\xi)=1+a\xi/c^2=s/s_0>0$ と書くと、$\xi$ 一定の時計について $dy=dz=d\xi=0$ なので $d\tau=h(\xi)d\eta$ です。$\eta$ が同じ幅だけ進んでも、異なる位置の時計の固有時は異なります。

## 2. 一様固有加速度の世界線

$W_R$ 内で $\xi,y,z$ を固定した曲線は、Rindler座標では静止しています。しかし慣性座標では、その $x$ 座標は時間とともに変わります。「静止」という言葉を使うときには、**どの座標で一定なのか**が必要です。

<a id="def-srel8-static-observer"></a>

<!-- formal-statement-start -->
> **定義（Rindler静止観測者）**  
> $c,a>0$、$s_0=c^2/a$ とし、$\xi=\xi_*>-s_0$ と $y=y_*$、$z=z_*$ を固定する。
> $\eta\in\mathbb R$ を動かす未来向き時間的世界線をRindler静止観測者という。
> $s_*=s_0+\xi_*>0$ とする。
> この世界線の固有時の原点を $\eta=0$ に取ると、

$$
h_*=1+\frac{a\xi_*}{c^2},\qquad \tau=h_*\eta
$$

> が成立する。
<!-- formal-statement-end -->

<!-- definition-example-start: def-srel8-static-observer -->
### 直接例：二つの静止時計の条件確認

**定義の確認**：$\xi_*=0$ なら $h_*=1$ です。従って $\tau=\eta$ で、世界線は $x^2-c^2t^2=s_0^2$ を満たします。$\xi_*=s_0$ なら $h_*=2$、$\tau=2\eta$、双曲線の半径は $2s_0$ になります。座標の違う二つの時計を「ともに加速度 $a$」と呼んではいけません。
<!-- definition-example-end -->

<a id="prop-srel8-proper-accel"></a>

<!-- formal-statement-start -->
> **命題（Rindler静止観測者の固有加速度）**  
> $c,a>0$、$s_0=c^2/a$、$\xi_*>-s_0$、$s_*=s_0+\xi_*$ とする。$ct=s_*\sinh(a\eta/c)$、$x=s_*\cosh(a\eta/c)$、$y,z$ 一定の世界線の固有時を $\tau=(as_*/c^2)\eta$ とすると、四元速度 $u^\mu=d x^\mu/d\tau$ と四元加速度 $b^\mu=du^\mu/d\tau$ は

$$
u^\mu=(c\cosh(c\tau/s_*),c\sinh(c\tau/s_*),0,0),
\quad
b^\mu=\frac{c^2}{s_*}(\sinh(c\tau/s_*),\cosh(c\tau/s_*),0,0)
$$

> となる。その大きさ $\alpha=\sqrt{-b_\mu b^\mu}$ は一定で $\alpha=c^2/s_*=a/(1+a\xi_*/c^2)$ である。
<!-- formal-statement-end -->

### 証明の見取り図

まず固有時で双曲線をパラメータ化し直します。[四元加速度と固有加速度](../SREL3/index.md#def-srel3-four-acceleration)を使うのはその後です。加速度が一定とは、慣性系の座標加速度 $d^2x/dt^2$ が一定という意味ではありません。

<!-- proof-start -->
### 証明

[固有時の線素](../SREL2/index.md#def-srel2-proper-time)から、$\xi=\xi_*$ の世界線では $c^2d\tau^2=c^2h_*^2d\eta^2$。未来向きなので $d\tau=h_*d\eta$ です。$a\eta/c=(c/s_*)\tau$ と置き換えると

$$
x^0=ct=s_*\sinh(c\tau/s_*),\qquad x^1=s_*\cosh(c\tau/s_*).
$$

それぞれを $\tau$ で微分すると $u^0=c\cosh(c\tau/s_*)$、$u^1=c\sinh(c\tau/s_*)$、さらに微分すると命題の $b^0,b^1$ を得ます。計量の符号を入れて

$$
u_\mu u^\mu=c^2(\cosh^2-\sinh^2)=c^2,\qquad
b_\mu b^\mu=\frac{c^4}{s_*^2}(\sinh^2-\cosh^2)=-\frac{c^4}{s_*^2}.
$$

$s_*>0$ より $\alpha=c^2/s_*>0$、これは $\tau$ に依存しません。最後に $s_*=s_0h_*=c^2h_*/a$ とすれば $\alpha=a/h_*$ です。
<!-- proof-end -->

$\xi_*=0$ の観測者だけが固有加速度 $a$ を持ちます。$\xi_*$ を $-s_0$ へ近づけるほど、同じ座標位置を保つために必要な固有加速度は発散します。したがって「地平線上で静止する有限加速度の観測者」は構成できません。

## 3. 地平線は時空の端ではない

加速するロケットが通信できる相手を調べるため、慣性座標に次の二つの長さ次元の量を導入します。

$$
U=x-ct,\qquad V=x+ct.
$$

右Rindler領域は $U>0,V>0$ と同値です。変換式から

$$
U=s(\cosh A-\sinh A)=se^{-A},\qquad
V=s(\cosh A+\sinh A)=se^A.
$$

これなら光線の向きと境界をそれぞれ一つの不等式で調べられます。

<a id="def-srel8-horizon"></a>

<!-- formal-statement-start -->
> **定義（右Rindler領域の地平線）**  
> Minkowski時空で $U=x-ct$、$V=x+ct$ とする。
> 右くさび $W_R$ は $U>0,V>0$ である。
> その境界をなす二つの零超曲面の枝を

$$
H_U=\{U=0,\ V>0\},\qquad
H_V=\{V=0,\ U>0\}
$$

> とし、右Rindler地平線と呼ぶ。$y,z$ は任意である。
> これらは $W_R$ 内の座標点ではない。
<!-- formal-statement-end -->

<!-- definition-example-start: def-srel8-horizon -->
### 直接例：二つの零境界の判定

**定義の確認**：$(ct,x)=(s_0,s_0)$ は $U=0,V=2s_0>0$ なので $H_U$ 上です。一方 $(ct,x)=(-s_0,s_0)$ は $V=0,U=2s_0>0$ なので $H_V$ 上です。両者を同じ「光が止まる線」とまとめると通信の向きを取り違えます。
<!-- definition-example-end -->

未来向きの因果的（時間的または光的）曲線では、慣性座標の微小変化は $c\,dt\ge\sqrt{dx^2+dy^2+dz^2}$ を満たします。とくに $-c\,dt\le dx\le c\,dt$ なので

$$
dU=dx-c\,dt\le0,\qquad dV=dx+c\,dt\ge0.
$$

つまり未来へ進む信号に沿い $U$ は増加せず、$V$ は減少しません。この簡単な単調性が因果的到達可能性の鍵です。

<a id="thm-srel8-causal-domain"></a>

<!-- formal-statement-start -->
> **定理（永遠に一様加速する観測者の通信可能領域）**  
> $c,a>0$、$s_0=c^2/a$ とし、Minkowski時空を考える。
> 観測者 $O$ は全固有時 $\tau\in\mathbb R$ にわたり、$y=z=0$ として次の世界線を進む。

$$
ct=s_0\sinh(a\tau/c),\qquad x=s_0\cosh(a\tau/c).
$$

> 有限座標を持つ事象 $P=(ct_P,x_P,y_P,z_P)$ を任意に取る。
> $P$ から $O$ のある未来の事象へ因果信号を送れる必要十分条件は

$$
U_P=x_P-ct_P>0
$$

> である。また $O$ のある過去の事象から $P$ へ因果信号を送れる必要十分条件は

$$
V_P=x_P+ct_P>0
$$

> である。信号はいずれも未来向きとする。
<!-- formal-statement-end -->

### 証明の見取り図

必要性は $U,V$ の単調性、十分性は双曲線上の受信・送信時刻を十分未来または過去へ動かして、光円錐の内側に入れることから示します。地平線上は等号ですが、有限な固有時でそこへ届くわけではありません。

<!-- proof-start -->
### 証明

$O$ の世界線を $A=a\tau/c$ で表すと

$$
U_O(A)=s_0e^{-A}>0,\qquad V_O(A)=s_0e^A>0.
$$

$P$ から $O$ へ未来向き因果曲線があれば $U_O\le U_P$、$V_O\ge V_P$ が必要です。$U_O>0$ なので $U_P>0$ が必要です。逆向きについても $V_P\ge V_O>0$ から $V_P>0$ が必要です。

十分性も示します。二事象の差について

$$
c^2(\Delta t)^2-(\Delta x)^2-(\Delta y)^2-(\Delta z)^2
=\Delta V\,(-\Delta U)-(\Delta y)^2-(\Delta z)^2
$$

が成り立ちます（未来側の事象から過去側を引き、$\Delta U=U_{\mathrm{future}}-U_{\mathrm{past}}$、$\Delta V=V_{\mathrm{future}}-V_{\mathrm{past}}$ とする）。$U_P>0$ なら $A\to+\infty$ にして $U_O(A)\to0$、$V_O(A)\to+\infty$ とでき、やがて $U_O(A)<U_P$、$V_O(A)>V_P$ かつ

$$
(V_O-V_P)(U_P-U_O)>(y_P)^2+(z_P)^2
$$

となります。このとき $P$ と $O(A)$ の差は未来向き時間的であり、[光円錐による因果分類](../SREL2/index.md#def-srel2-light-cone)から因果的な経路が存在します。同じく $V_P>0$ なら $A\to-\infty$ にして $U_O(A)\to+\infty$、$V_O(A)\to0$ とでき、やがて

$$
(V_P-V_O)(U_O-U_P)>(y_P)^2+(z_P)^2
$$

を満たします。このとき $O(A)$ は $P$ の時間的過去にあり、$O$ から $P$ へ信号を送れます。
<!-- proof-end -->

従って $H_U$ のある $U=0$ は観測者の**因果的過去の境界**、$H_V$ のある $V=0$ は観測者の**因果的未来の境界**です。ここで「過去・未来」は観測者に対する通信の向きです。例えば $(ct,x)=(2s_0,s_0)$ は $U=-s_0<0$ なので、そこから永遠に加速し続ける $O$ へ光を送っても届きません。一方、$P=(-2s_0,s_0)$ は $U=3s_0>0$ なので $O$ へ送れますが、$V=-s_0<0$ のため $O$ からその $P$ へ信号を送ることはできません。

境界 $U=0$ や $V=0$ の事象自体は通常のMinkowski時空に存在します。有限 $\eta$ で $\xi\downarrow-s_0$ とした極限は $(ct,x)\to(0,0)$ のみですが、$\eta$ も発散させれば境界上の別の点へ近づけます。**座標が覆わない領域**と**物理的な時空の特異点**は区別しなければなりません。

## 4. 光線が描く指数曲線

Minkowski時空で $y,z$ が一定の光線は $d(ct)=\pm dx$ を満たします。[Rindler計量](#thm-srel8-metric)に移すと $0=c^2h(\xi)^2d\eta^2-d\xi^2$ です。$h(\xi)>0$ なので、未来向きの光線を $\eta$ で追うと

$$
\frac{d\xi}{d\eta}=\pm c\,h(\xi)
=\pm c\left(1+\frac{a\xi}{c^2}\right).
$$

<a id="prop-srel8-null-rays"></a>

<!-- formal-statement-start -->
> **命題（Rindler座標における光線）**  
> $c,a>0$、$\xi_0>-c^2/a$、$\eta_0\in\mathbb R$ とする。$y,z$ 一定の未来向き光線で $(\eta_0,\xi_0)$ を通り、$\xi$ の増加方向または減少方向へ進むものは、$h(\xi)=1+a\xi/c^2$ を用いて、それぞれ

$$
h(\xi(\eta))=h(\xi_0)\exp\left(\frac{a}{c}(\eta-\eta_0)\right),\qquad
h(\xi(\eta))=h(\xi_0)\exp\left(-\frac{a}{c}(\eta-\eta_0)\right)
$$

> で与えられる。いずれも任意の有限 $\eta$ で $h>0$ を保つ。
<!-- formal-statement-end -->

### 証明の見取り図

$h$ を未知関数とみなすと、光線の微分方程式が定係数一次式になります。慣性座標の直線のままの光線が、加速座標では指数曲線として現れます。

<!-- proof-start -->
### 証明

$dh/d\xi=a/c^2$ なので、連鎖律で

$$
\frac{dh}{d\eta}=\frac{a}{c^2}\frac{d\xi}{d\eta}
=\pm\frac ac h.
$$

$h>0$ の区間では $h^{-1}dh/d\eta=\pm a/c$。$\eta_0$ から $\eta$ まで積分すると

$$
\log h(\eta)-\log h(\eta_0)=\pm\frac ac(\eta-\eta_0).
$$

指数を取って命題の二式を得ます。右辺は $h(\xi_0)>0$ と指数関数の積なので有限 $\eta$ では決して零になりません。符号 $+$ は $U=se^{-A}$ 一定、符号 $-$ は $V=se^A$ 一定と一致します。
<!-- proof-end -->

例として $\eta_0=0,\xi_0=0$ から左向きへ放った光は

$$
\xi(\eta)=\frac{c^2}{a}\left(e^{-a\eta/c}-1\right).
$$

$\eta\to+\infty$ で $\xi\to-c^2/a$ ですが、どんな有限 $\eta$ でも境界に達しません。これを「光速が物理的に零になった」と解釈してはいけません。座標速度 $d\xi/d\eta=-ch$ が零へ近づく一方、どの局所慣性観測者も光を速さ $c$ と測ります。

## 5. 往復光通信と時計の周波数

座標 $\xi$ の差は、あるRindler同時刻 $\eta$ で測る空間距離に等しくても、往復光通信で定義した距離とは異なります。$\eta$ 一定での線素は $d\ell=|d\xi|$ だから、$\xi=0$ と $\xi=L>0$ の同時刻距離は $L$ です。一方、ロケットが光を往復させれば、その間にも座標系の加速が効きます。

<a id="prop-srel8-radar"></a>

<!-- formal-statement-start -->
> **命題（Rindler静止鏡までの往復光距離）**  
> $c,a,L>0$ とする。$\xi=0$ のRindler静止観測者が $\eta=0$ に右向きの光を放ち、$\xi=L$ のRindler静止鏡で瞬時に反射させ、$\xi=0$ で受信するとする。反射時刻を $\eta_1$、受信時刻を $\eta_2$ とすると

$$
\eta_1=\frac ca\log\left(1+\frac{aL}{c^2}\right),\qquad
\eta_2=2\eta_1,
$$

> である。送受信者の固有時で定義するレーダー距離は

$$
D_{\rm radar}=\frac{c(\tau_2-\tau_0)}2
=\frac{c^2}{a}\log\left(1+\frac{aL}{c^2}\right)
$$

> となる。
<!-- formal-statement-end -->

### 証明の見取り図

往路は指数が増える光線、復路は指数が減る光線です。反射で $\xi$ の向きだけを逆転させ、同じ $h(L)$ を両方の積分に使います。

<!-- proof-start -->
### 証明

[光線の式](#prop-srel8-null-rays)で $h(0)=1$ とすると、往路は $h(\xi)=e^{a\eta/c}$。反射点の $h(L)=1+aL/c^2$ において $e^{a\eta_1/c}=h(L)$ なので $\eta_1=(c/a)\log h(L)$ です。復路は $\eta_1$ から始まる左向き光線で

$$
h(\xi)=h(L)\exp[-a(\eta-\eta_1)/c].
$$

受信者の $h(0)=1$ を代入して $0=\log h(L)-a(\eta_2-\eta_1)/c$。従って $\eta_2-\eta_1=(c/a)\log h(L)=\eta_1$、すなわち $\eta_2=2\eta_1$。送受信者は $\xi=0$ なので[固有時の関係](#def-srel8-static-observer)から $\tau=\eta$。$\tau_0=0$ として式へ代入すれば $D_{\rm radar}=(c/2)\eta_2=(c^2/a)\log h(L)$ となります。
<!-- proof-end -->

$L>0$ なら $\log(1+aL/c^2)<aL/c^2$ なので $D_{\rm radar}<L$。これは同時刻での物差しの距離と、光が往復する時間で定義した距離が異なることを示します。

次に、二つの静止時計が等しい座標時間間隔で発した光パルスを考えます。同じ向きに進む光線について $h$ の比が一定であるため、出発・到着の座標時間の差は同じです。しかし、各位置の固有時の刻みは $h$ 倍されています。

<a id="prop-srel8-frequency"></a>

<!-- formal-statement-start -->
> **命題（Rindler静止時計間の周波数比）**  
> $c,a>0$、$\xi_A,\xi_B>-c^2/a$ とし、$h_A=1+a\xi_A/c^2$、$h_B=1+a\xi_B/c^2$ とする。二つのRindler静止観測者間を、$y,z$ 一定の同じ向きの光路で連続して伝わる近接したパルスの局所受信周波数 $\nu_B$ と局所送信周波数 $\nu_A$ は

$$
\frac{\nu_B}{\nu_A}=\frac{h_A}{h_B}
$$

> を満たす。ただし周波数は各観測者の固有時で測るパルス数毎秒とする。
<!-- formal-statement-end -->

### 証明の見取り図

光路の座標時間差と、時計が刻む固有時間差を混同しないことが核心です。ここでの周波数比は平坦時空の加速観測者だけで生じます。

<!-- proof-start -->
### 証明

[光線の積分式](#prop-srel8-null-rays)により $A$ から $B$ への伝播に必要な $\eta$ の差は、向きを固定すれば $\Delta\eta_{\rm travel}=\pm(c/a)\log(h_B/h_A)$ であり、送信開始時刻には依存しません。従って隣り合う送信パルス間の座標時間差と受信パルス間の座標時間差は、どちらも同じ正数 $\delta\eta$ です。

[静止観測者の固有時間](#def-srel8-static-observer)を使うと、各位置で測るパルス間隔は $\delta\tau_A=h_A\delta\eta$、$\delta\tau_B=h_B\delta\eta$。周波数はその逆数なので

$$
\frac{\nu_B}{\nu_A}
=\frac{1/(h_B\delta\eta)}{1/(h_A\delta\eta)}
=\frac{h_A}{h_B}.
$$

光路が存在し、受信が指定された静止世界線で起こるという仮定を用いました。光の伝わる向き自体で周波数比の式は変わりません。
<!-- proof-end -->

例えば $\xi_A=0$、$\xi_B=s_0$ なら $h_A=1,h_B=2$ なので $B$ は $A$ の発したパルスを半分の周波数で受信します。これはしばしば加速系の重力赤方偏移にたとえられますが、曲がった時空を仮定した結果ではありません。

ここまでの結論は、右Rindlerくさびの内部に限られ、静止位置を保つ観測者が**全固有時にわたり一様固有加速する理想化**に依存します。有限時間だけ加速するロケットには、その全時刻の通信可能領域を同じ地平線で切ることはできません。一般相対論の曲率や接続の運動方程式は、単なるRindler座標の導入からは得られません。

---

## 演習

### Level A

### A1. Rindler座標への逆変換

$c,a>0$、$s_0=c^2/a$ とする。Minkowski事象 $(ct,x)=(0,2s_0)$ の右Rindler座標 $(\eta,\xi)$ を求め、定義域を検査せよ。

- Level: A

<!-- solution-start -->
#### 詳細解答

$U=x-ct=2s_0>0$、$V=x+ct=2s_0>0$ なので右くさび内です。[右Rindler座標](#def-srel8-rindler-chart)の逆座標式から

$$
s=\sqrt{x^2-c^2t^2}=2s_0,\qquad
\xi=s-s_0=s_0,\qquad
\eta=\frac{c}{2a}\log(V/U)=0.
$$

$\xi=s_0>-s_0$ を満たし、順変換でも $ct=2s_0\sinh0=0$、$x=2s_0\cosh0=2s_0$ と一致します。
<!-- solution-end -->

### A2. 二つの静止時計と固有加速度

$c,a>0$、$s_0=c^2/a$ とする。$\xi=0$ および $\xi=s_0$ のRindler静止時計について、$\eta$ が $\Delta\eta>0$ 進む際の固有時増分と各固有加速度を求めよ。

- Level: A

<!-- solution-start -->
#### 詳細解答

$h(0)=1$、$h(s_0)=1+as_0/c^2=2$ です。[静止時計](#def-srel8-static-observer)では $\Delta\tau=h\Delta\eta$ なので、それぞれ $\Delta\tau_0=\Delta\eta$、$\Delta\tau_{s_0}=2\Delta\eta$。[固有加速度](#prop-srel8-proper-accel)は $\alpha=a/h$ なので、順に $\alpha_0=a$、$\alpha_{s_0}=a/2$ です。時計の進み方と固有加速度の比を逆にしないことが重要です。
<!-- solution-end -->

### A3. 地平線の二つの枝と信号の向き

$c,a>0$、$s_0=c^2/a$ とする。事象 $P=(ct,x)=(s_0,s_0)$、$Q=(-s_0,s_0)$ の $U=x-ct$、$V=x+ct$ を計算し、右Rindler領域とどの境界に属するかを判定せよ。

- Level: A

<!-- solution-start -->
#### 詳細解答

$P$ では $U_P=s_0-s_0=0$、$V_P=s_0+s_0=2s_0>0$ なので [地平線の定義](#def-srel8-horizon)により $H_U$ 上です。$Q$ では $U_Q=s_0-(-s_0)=2s_0>0$、$V_Q=s_0+(-s_0)=0$ なので $H_V$ 上です。どちらも $U,V$ が**ともに正**ではないため、開領域 $W_R$ には属しません。$H_U$ は加速観測者が受信できる事象の境界、$H_V$ は送信が到達できる事象の境界です。
<!-- solution-end -->

### A4. 左向き光の座標速度

$c,a>0$、$s_0=c^2/a$ とする。$\eta=0,\xi=0$ から $\xi$ の減少方向へ光を発した。$\eta=(c/a)\log2$ での $\xi$ と $d\xi/d\eta$ を求め、有限 $\eta$ で $\xi=-s_0$ に達しないことを示せ。

- Level: A

<!-- solution-start -->
#### 詳細解答

[左向き光線](#prop-srel8-null-rays)の式は $h(\xi)=e^{-a\eta/c}$ です。指定時刻では $h=1/2$、よって

$$
1+\frac{a\xi}{c^2}=\frac12,\qquad
\xi=-\frac{c^2}{2a}=-\frac{s_0}{2}.
$$

微分方程式から $d\xi/d\eta=-ch=-c/2$。任意の有限 $\eta$ で指数 $e^{-a\eta/c}>0$ ですから、$h=0$ に相当する $\xi=-s_0$ へは到達しません。これは慣性座標での光速 $c$ の変化を表すものではありません。
<!-- solution-end -->

### A5. 双曲線の慣性座標表示

$c,a>0$、$s_0=c^2/a$ とする。$\xi=s_0$ に固定されたRindler静止観測者について、慣性座標での軌跡 $x^2-c^2t^2$ と $t=0$ の位置を求めよ。加速度 $a$ の観測者と同じ双曲線かも判定せよ。

- Level: A

<!-- solution-start -->
#### 詳細解答

$s=s_0+\xi=2s_0$ を[座標変換](#def-srel8-rindler-chart)へ入れると $ct=2s_0\sinh(a\eta/c)$、$x=2s_0\cosh(a\eta/c)$。したがって

$$
x^2-c^2t^2=(2s_0)^2(\cosh^2-\sinh^2)=4s_0^2.
$$

$t=0$ では $\sinh(a\eta/c)=0$ より $\eta=0$、$x=2s_0$。加速度 $a$ の基準観測者 $\xi=0$ の軌跡は $x^2-c^2t^2=s_0^2$ なので別の双曲線です。[固有加速度](#prop-srel8-proper-accel)も $a/2$ となります。
<!-- solution-end -->

### Level B

### B1. 固有時から四元加速度を再計算する

$c,a>0$、$s_0=c^2/a$ とする。世界線 $ct=s_0\sinh(a\tau/c)$、$x=s_0\cosh(a\tau/c)$、$y=z=0$ を固有時 $\tau$ で微分し、$u_\mu u^\mu=c^2$、$u_\mu b^\mu=0$、$-b_\mu b^\mu=a^2$ を示せ。

- Level: B

<!-- solution-start -->
#### 詳細解答

$A=a\tau/c$ と置きます。[四元速度・加速度](../SREL3/index.md#def-srel3-four-acceleration)の定義通り微分すると

$$
u^\mu=\left(s_0\frac ac\cosh A,\ s_0\frac ac\sinh A,0,0\right)
=(c\cosh A,c\sinh A,0,0),
$$

さらに

$$
b^\mu=\left(a\sinh A,a\cosh A,0,0\right).
$$

計量 $(+---)$ なので

$$
u_\mu u^\mu=c^2(\cosh^2A-\sinh^2A)=c^2,
$$

$$
u_\mu b^\mu=ac(\cosh A\sinh A-\sinh A\cosh A)=0,
$$

$$
-b_\mu b^\mu=-a^2(\sinh^2A-\cosh^2A)=a^2.
$$

ここでは $s_0a/c=c$ を使いました。加速度の空間成分 $b^1=a\cosh A$ は慣性座標で変化しますが、ノルムによる固有加速度は一定です。
<!-- solution-end -->

### B2. 光円錐から加速観測者の可視性を判定する

$c,a>0$、$s_0=c^2/a$、$\xi=0$ を全固有時にわたり進む観測者 $O$ を考える。$P=(ct,x)=(2s_0,s_0)$、$Q=(-2s_0,s_0)$ はそれぞれ $O$ へ因果信号を送れるか、また $O$ からの信号を受け取れるか。$y=z=0$ とする。

- Level: B

<!-- solution-start -->
#### 詳細解答

[永遠に一様加速する観測者の通信可能領域](#thm-srel8-causal-domain)で、$O$ への送信条件は $U>0$、$O$ からの受信条件は $V>0$ です。$P$ では

$$
U_P=s_0-2s_0=-s_0<0,\qquad V_P=s_0+2s_0=3s_0>0.
$$

従って $P\to O$ は不可能、$O\to P$ は可能です。$Q$ では

$$
U_Q=s_0-(-2s_0)=3s_0>0,\qquad V_Q=s_0+(-2s_0)=-s_0<0.
$$

従って $Q\to O$ は可能、$O\to Q$ は不可能です。時間向きを逆転した同じ判断をしてはいけません。$U$ の非増加・$V$ の非減少が各条件の理由です。
<!-- solution-end -->

### B3. 二つの加速時計の赤方偏移

$c,a>0$、$s_0=c^2/a$ とし、$\xi_A=0$ の静止観測者から $\xi_B=s_0$ の静止観測者へ連続する光パルスを送る。送信者の固有時間でパルス間隔 $\delta\tau_A=T>0$ とする。受信者の間隔 $\delta\tau_B$ と周波数比 $\nu_B/\nu_A$ を求め、双方の座標時間差を示せ。

- Level: B

<!-- solution-start -->
#### 詳細解答

$h_A=1$、$h_B=2$ です。[静止時計の定義](#def-srel8-static-observer)から送信側の座標時間差は $\delta\eta=\delta\tau_A/h_A=T$。光の伝播所要座標時間はパルスごとに一定なので、受信側でも $\delta\eta=T$ です。受信側の固有時間は

$$
\delta\tau_B=h_B\delta\eta=2T.
$$

[周波数比の命題](#prop-srel8-frequency)により、あるいは間隔の逆数を取って

$$
\frac{\nu_B}{\nu_A}=\frac{1/(2T)}{1/T}=\frac12.
$$

光が進む時間が二倍になったのではなく、観測者の位置による固有時間の刻みが異なるためです。
<!-- solution-end -->

### Level C

### C1. 加速鏡による光の往復・地平線・周波数

$c,a>0$、$s_0=c^2/a$ とする。観測者 $A$ は $\xi=0$、鏡を操作する観測者 $B$ は $\xi=s_0$ に静止し、ともに $y=z=0$ とする。$A$ は $\eta=0$ に右向きの光を送り、$B$ は受信直後に左向きへ反射させる。

1. 反射時刻 $\eta_1$ と $A$ への帰還時刻 $\eta_2$ を求める。
2. 反射事象の慣性座標 $(ct_1,x_1)$ を求め、$A$ のレーダー距離と同時刻空間距離を比較せよ。
3. $A$ が送る近接パルスの周波数を $\nu$ とし、$B$ が受けた周波数のまま反射するときの $B$ 受信周波数と $A$ 帰還周波数を求めよ。
4. $P=(ct,x)=(2s_0,s_0)$ から $A$ に将来信号を送れるか判定し、今回の反射事象と矛盾しない理由を述べよ。

- Level: C

<!-- solution-start -->
#### 詳細解答

(1) $h_A=1$、$h_B=2$。往路の[光線方程式](#prop-srel8-null-rays)は $h=e^{a\eta/c}$ なので、$2=e^{a\eta_1/c}$、すなわち

$$
\eta_1=\frac ca\log2.
$$

反射後は $h=2e^{-a(\eta-\eta_1)/c}$。$A$ の $h=1$ に戻るためには $e^{a(\eta_2-\eta_1)/c}=2$ が必要で、

$$
\eta_2-\eta_1=\frac ca\log2,\qquad
\eta_2=\frac{2c}{a}\log2.
$$

(2) 反射点は $s=s_0+\xi_B=2s_0$、$a\eta_1/c=\log2$ です。指数の定義から $\sinh(\log2)=(2-1/2)/2=3/4$、$\cosh(\log2)=(2+1/2)/2=5/4$。座標変換に代入して

$$
ct_1=2s_0\frac34=\frac32s_0,\qquad
x_1=2s_0\frac54=\frac52s_0.
$$

$A$ の固有時は $\tau=\eta$ だから、レーダー距離は

$$
D_{\rm radar}=\frac c2(\eta_2-0)=\frac{c^2}{a}\log2=s_0\log2<s_0.
$$

一方 $\eta$ 一定の空間距離は $\int_0^{s_0}d\xi=s_0$ です。二つは同じ測定操作ではありません。

(3) [周波数比](#prop-srel8-frequency)より $A$ から $B$ では $\nu_B=\nu(h_A/h_B)=\nu/2$。$B$ は自分の静止時計で測った $\nu/2$ のまま折り返すので、帰路は $B$ から $A$ への比 $h_B/h_A=2$ を使います。

$$
\nu_{A,\mathrm{return}}=\frac{\nu}{2}\frac{h_B}{h_A}
=\frac{\nu}{2}\cdot2=\nu.
$$

反射時の周波数条件を明示しなければ、鏡や光源の操作による周波数変化まで断定できません。

(4) $P$ では $U_P=x-ct=s_0-2s_0=-s_0<0$。従って[永遠に一様加速する観測者の通信可能領域](#thm-srel8-causal-domain)から $P$ は $A$ へ信号を送れません。反射事象では

$$
U_1=x_1-ct_1=\frac52s_0-\frac32s_0=s_0>0,\quad
V_1=x_1+ct_1=4s_0>0.
$$

反射は $W_R$ の内部で起こり、$P$ とは異なる事象です。$U_1>0$ の反射点から $A$ に帰還できても、$U_P<0$ の外部事象から $A$ に帰還できないことと矛盾しません。
<!-- solution-end -->
