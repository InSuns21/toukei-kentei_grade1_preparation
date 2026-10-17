# GR2 Lorentz計量・固有時・光円錐

<!-- definition-example-audit: strict -->

[GR1の局所自由落下実験室](../GR1/index.md#def-gr1-freefall-lab)と[Rindler計量](../GR1/index.md#prop-gr1-rindler-metric)から、重力のように見える座標効果を学びました。しかし計量を与えられたとき、時計はいくら進み、光はどの方向に進めるのでしょうか。必要なのは**計量の二次形式から測定量を読み取る手順**です。

[LORG2のLorentz計量](../../../幾何系/LORG/LORG2/index.md#def-lorg2-lorentz-metric)と[LORG1の因果型](../../../幾何系/LORG/LORG1/index.md#def-lorg1-causal-type)、[LORG3の因果曲線とLorentz長さ](../../../幾何系/LORG/LORG3/index.md#def-lorg3-lorentz-length)は数学的に既習です。本章では定義を重複させず、時計・光の物理的な解釈と具体計算を行います。

$c>0$ は光速、$\tau$ は固有時です。GR全体で時空四次元、符号は $(-,+,+,+)$ とし、$t$ は時間の単位で測ります。$x^0=ct$ とすれば四座標は長さの単位で揃います。計量 $g$ の座標基底 $\partial_\mu$ での成分を $g_{\mu\nu}=g(\partial_\mu,\partial_\nu)$ と書き、線素は $ds^2=g_{\mu\nu}dx^\mu dx^\nu$ と表します。

## 1. SRELとGRの符号はどうつながるか

[SREL2のMinkowski計量](../../SREL/SREL2/index.md#def-srel2-minkowski-metric)は符号 $(+,-,-,-)$ により

$$
ds_{\mathrm{SREL}}^2=c^2dt^2-dx^2-dy^2-dz^2
$$

と書かれます。GRとLORGの符号を使うと同じ物理的な慣性系は

$$
ds_{\mathrm{GR}}^2=-c^2dt^2+dx^2+dy^2+dz^2=-ds_{\mathrm{SREL}}^2
$$

です。これは**計量全体をマイナス倍する符号規約の変更**であって、座標変換ではありません。したがって自己二乗の正負も読み替えます。

例えば成分を $(ct,x,y,z)$ で表した $u=(2,1,0,0)$ の自己二乗はSRELで $4-1=3>0$、GRで $-4+1=-3<0$ ですが、どちらも**時間的**です。$v=(1,1,0,0)$ は両規約で自己二乗が零の非零ベクトルなので**光的**です。固有時の増分は

$$
d\tau=\frac{\sqrt{ds_{\mathrm{SREL}}^2}}{c}
=\frac{\sqrt{-ds_{\mathrm{GR}}^2}}{c}
$$

として一致します（時間的な未来向き世界線上の正の根）。一方、異なる符号規約の式をマイナス符号の調整なしに混在させると、誤った結論になります。

## 2. Lorentz計量かどうかを行列から調べる

座標基底 $e_\mu$ で二つの接ベクトルを $u=u^\mu e_\mu$、$v=v^\nu e_\nu$ と展開すると、双線形性から

$$
g(u,v)=\sum_{\mu,\nu}u^\mu v^\nu g(e_\mu,e_\nu)
$$

です。つまり係数行列 $G=(g_{\mu\nu})$ は基底上の内積を完全に記述します。その行列が可逆なら内積は非退化です。しかし非退化だけで負方向の本数は分かりません。可逆座標変換でも負・正の本数が不変であることは[Sylvesterの慣性法則](../../../基礎科目/LA/LA6/index.md#thm-la6-inertia)によります。

例えば長さの逆数の定数 $\lambda,\beta>0$ を用い、開領域 $x>-1/\max(\lambda,\beta)$ において

$$
ds^2=-c^2(1+\lambda x)^2dt^2+
(1+\beta x)^2dx^2+dy^2+dz^2
$$

とします。基底 $(\partial_t,\partial_x,\partial_y,\partial_z)$ での行列は

$$
G=\operatorname{diag}(-c^2(1+\lambda x)^2,\,
(1+\beta x)^2,1,1).
$$

すべての係数は滑らかで $G$ は対称です。領域条件から $1+\lambda x>0$、$1+\beta x>0$ なので、固有値は負一本・正三本で

$$
\det G=-c^2(1+\lambda x)^2(1+\beta x)^2<0
$$

です。従って非退化性と[Lorentz計量の慣性指数の条件](../../../幾何系/LORG/LORG2/index.md#def-lorg2-lorentz-metric)をともに満たします。$g(\partial_t,\partial_t)<0$ だから $\partial_t$ は時間的であり、$t$ 増加方向を未来と選べます。**一般の対称4次行列では行列式の符号だけから慣性指数は判定できません**。この例は対角成分の符号まで調べています。

## 3. 静的直交座標の時計係数

ここではまず、時間方向と空間方向の交差項のない計量を考えます。座標時刻の刻みを実際の時計で何秒と数えるかを表すため、時間係数から正の関数 $N$ を取り出します。また同じ座標時刻に測る空間の微小距離には、正定値な行列 $H$ を用います。どちらも**座標の物理的換算に使う係数**です。

<a id="def-gr2-static-clock-model"></a>

<!-- formal-statement-start -->
> **定義（静的直交座標模型の時計係数）**  
> $I\subset\mathbb R$ を時間の開区間、$U\subset\mathbb R^3$ を空間の開集合とする。滑らかなLorentz計量 $g$ が $I\times U$ 上の座標 $(t,x^1,x^2,x^3)$ で
>
$$
ds^2=-N(\mathbf x)^2c^2dt^2+
\sum_{i,j=1}^{3}h_{ij}(\mathbf x)dx^idx^j
$$
>
> と表されるとする。$N:U\to(0,\infty)$ は滑らか、$H=(h_{ij})$ は各点で対称正定値かつ滑らかで、$N,H$ は $t$ に依存しないものとする。この表示を本章では**静的直交座標模型**、$N$ を**時計係数**と呼ぶ。未来は $\partial_t$ が向く方向とする。座標静止観測者は $\mathbf x=\mathbf x_*$ 一定の世界線を動く。
<!-- formal-statement-end -->

<!-- definition-example-start: def-gr2-static-clock-model -->
**定義の確認**。前節の模型では $N=1+\lambda x$、$H=\operatorname{diag}((1+\beta x)^2,1,1)$ です。指定した領域で $N>0$、$H$ の固有値は全て正であり、全ての係数は滑らかで時間に依存しません。時間と空間の交差成分 $g_{ti}$ は全て零です。前節で非退化性と慣性指数も直接確認しました。静止世界線の接ベクトル $\partial_t$ の自己二乗は $-N^2c^2<0$ なので、実際に時間的な観測者を定めます。
<!-- definition-example-end -->

これは扱いやすい局所模型の定義であり、**全てのLorentz計量がこの形で全域に書けるとは主張しません**。とくに交差項 $dt\,dx$ がある座標には、後述の対角形専用の公式をそのまま当てはめられません。

## 4. 静止時計と移動時計の固有時

固有時の基本式 $-c^2d\tau^2=ds^2$ は、[LORG3のLorentz長さ](../../../幾何系/LORG/LORG3/index.md#def-lorg3-lorentz-length)に時間の単位を復元したものです。世界線を $\gamma(t)=(t,\mathbf x(t))$ と置き、$\dot x^i=dx^i/dt$ と書きます。

<a id="prop-gr2-clock-rate"></a>

<!-- formal-statement-start -->
> **命題（静的直交座標における固有時率）**  
> 静的直交座標模型で、$t\in[t_0,t_1]\subset I$ の $C^1$ 未来向き時間的世界線 $\gamma(t)=(t,\mathbf x(t))$ を考える。各点で
>
$$
h_{ij}(\mathbf x(t))\dot x^i\dot x^j<N(\mathbf x(t))^2c^2
$$
>
> を仮定すると、その時計の固有時は
>
$$
\Delta\tau=\int_{t_0}^{t_1}
\sqrt{N(\mathbf x(t))^2-
\frac{h_{ij}(\mathbf x(t))\dot x^i\dot x^j}{c^2}}\,dt
$$
>
> である。特に座標静止時計 $\mathbf x(t)=\mathbf x_*$ では
>
$$
\Delta\tau=N(\mathbf x_*)(t_1-t_0).
$$
<!-- formal-statement-end -->

### 証明の見取り図

時間成分と空間成分を別々に計算し、時間的条件から平方根が実数かつ正になることを確認します。

<!-- proof-start -->
### 証明

世界線の接ベクトルは $\dot\gamma=\partial_t+\dot x^i\partial_i$ です。計量の双線形性と $g_{ti}=0$ から

$$
\begin{aligned}
g(\dot\gamma,\dot\gamma)
&=g_{tt}+2g_{ti}\dot x^i+g_{ij}\dot x^i\dot x^j\\
&=-N^2c^2+h_{ij}\dot x^i\dot x^j<0.
\end{aligned}
$$

従って $-c^2d\tau^2=ds^2$ に $dx^i=\dot x^i dt$ を代入すると

$$
c^2\left(\frac{d\tau}{dt}\right)^2
=N^2c^2-h_{ij}\dot x^i\dot x^j.
$$

未来向きの時間増加に対して $d\tau/dt>0$ の根を選び、

$$
\frac{d\tau}{dt}=
\sqrt{N^2-\frac{h_{ij}\dot x^i\dot x^j}{c^2}}
$$

とします。連続な被積分関数を $[t_0,t_1]$ で積分すると主張の積分式です。静止の場合 $\dot x^i=0$ であり、$N>0$ は固定位置で一定なので、積分値は $N(\mathbf x_*)(t_1-t_0)$ となります。
<!-- proof-end -->

先ほどの模型で $x=0$ と $x=L>0$ にある二つの静止時計は、同じ座標時間 $\Delta t$ でそれぞれ $\Delta t$、$(1+\lambda L)\Delta t$ を刻みます。これらの位置はいずれも定義域内です。移動する時計なら $h_{ij}\dot x^i\dot x^j>0$ なので、同じ場所で静止する時計より瞬間的な固有時率が小さくなります。ただし位置も異なる時計を比べる場合は $N$ の違いもあり、常に一方が遅いとは言えません。

## 5. 光円錐と局所的な光速

[LORG1の光的接ベクトル](../../../幾何系/LORG/LORG1/index.md#def-lorg1-causal-type)は非零かつ自己二乗が零です。光が進みうる微小方向を、この条件から求めます。座標上の速度と、その場の静止時計・空間物差しで測る速度は区別しなければなりません。

<a id="prop-gr2-null-cone"></a>

<!-- formal-statement-start -->
> **命題（静的直交座標の光円錐と局所光速）**  
> 静的直交座標模型の任意の点で、未来向きの非零接ベクトル $v=\partial_t+w^i\partial_i$ が光的である必要十分条件は
>
$$
h_{ij}w^iw^j=N^2c^2
$$
>
> である。$x$ 方向だけに進み $h_{xx}=B(x)^2$、$N,B>0$ とすれば、光的な座標速度は
>
$$
\frac{dx}{dt}=\pm c\frac{N(x)}{B(x)}
$$
>
> となる。一方、同じ点に静止する時計の時間 $d\tau_{\rm stat}=Ndt$ と同時刻の空間物差し $d\ell=\sqrt{h_{ij}dx^idx^j}$ で測った局所速度は $d\ell/d\tau_{\rm stat}=c$ である。
<!-- formal-statement-end -->

### 証明の見取り図

まず二次形式を零と置き、座標速度の制限を出します。次に時計と物差しを両方換算し、係数が打ち消し合うことを確かめます。

<!-- proof-start -->
### 証明

計量を接ベクトルへ適用すると

$$
g(v,v)=-N^2c^2+h_{ij}w^iw^j.
$$

$v$ は $\partial_t$ 成分が1だから非零であり、自己二乗が零になることと第一式は同値です。$x$ 成分だけなら $B^2(dx/dt)^2=N^2c^2$ です。$N,B,c$ は正なので平方根を取ると二つの座標速度を得ます。

空間計量 $H$ は正定値で、静止時計については[前命題](#prop-gr2-clock-rate)から $d\tau_{\rm stat}=Ndt$ です。光的条件を使うと

$$
\left(\frac{d\ell}{d\tau_{\rm stat}}\right)^2
=\frac{h_{ij}dx^idx^j}{N^2dt^2}
=\frac{N^2c^2dt^2}{N^2dt^2}=c^2.
$$

長さと未来向きの時間はともに正として測るので、局所速度は $c$ です。
<!-- proof-end -->

直接例として $N=1+\lambda x$、$B=1+\beta x$ の座標光速は $\pm c(1+\lambda x)/(1+\beta x)$ です。例えば $\lambda>\beta$、$x>0$ ではその絶対値が $c$ より大きくなります。しかし局所時計は $Ndt$、物差しは $B|dx|$ なので局所光速は常に $c$。**座標速度が $c$ を超えたことは局所的な超光速を意味しません。**

## 6. 座標変換で何が不変なのか

座標を変えれば計量係数も変わります。本当に測定される固有時は、**世界線と計量を同時に変換**しても一致するはずです。

<a id="prop-gr2-coordinate-invariance"></a>

<!-- formal-statement-start -->
> **命題（座標変換に対する線素・固有時・因果型の不変性）**  
> Lorentz計量 $g$ の開領域で滑らかな可逆座標変換 $x^\mu=x^\mu(y^a)$ を考え、Jacobi行列 $J^\mu{}_a=\partial x^\mu/\partial y^a$ が可逆とする。新座標で
>
$$
g'_{ab}=J^\mu{}_a g_{\mu\nu}J^\nu{}_b
$$
>
> と定めれば、同一接ベクトルの自己二乗は両座標で一致し、時間的・光的・空間的の分類も不変である。同じ未来向き時間的曲線の固有時も両座標で一致する。
<!-- formal-statement-end -->

### 証明の見取り図

ベクトルの座標成分に連鎖律を適用し、二次形式の各係数を順にまとめます。固有時の積分ではその同じ二次形式を使います。

<!-- proof-start -->
### 証明

同一の接ベクトルの新成分を $v'^a$ とすれば、連鎖律により $v^\mu=J^\mu{}_a v'^a$ です。よって

$$
\begin{aligned}
g_{\mu\nu}v^\mu v^\nu
&=g_{\mu\nu}(J^\mu{}_a v'^a)(J^\nu{}_b v'^b)\\
&=(J^\mu{}_a g_{\mu\nu}J^\nu{}_b)v'^av'^b\\
&=g'_{ab}v'^av'^b.
\end{aligned}
$$

自己二乗の値と符号は不変です。未来向きの選択は時間向きも同じ物理的向きへ移すので保持されます。時間的世界線を共通の媒介変数 $s$ で表せば、固有時の被積分関数 $c^{-1}\sqrt{-g(\dot\gamma,\dot\gamma)}$ が点ごとに一致します。これを同じ区間で積分すれば固有時も一致します。[LORG3の再パラメータ化不変性](../../../幾何系/LORG/LORG3/index.md#thm-lorg3-reparam-invariance)とも整合します。
<!-- proof-end -->

### 直接例1：時刻の目盛りを倍にする

Minkowskiの $ds^2=-c^2dt^2+dx^2$ を $t'=2t$ で表すと

$$
ds^2=-\frac{c^2}{4}dt'^2+dx^2.
$$

静止時計の読みは古い座標で $\Delta\tau=\Delta t$、新しい座標で $\Delta\tau=\Delta t'/2$ です。$\Delta t'=2\Delta t$ だから一致します。右向き光の座標速度は古い座標で $c$、新しい座標で $c/2$ ですが、局所速度は $c$ のままです。

### 直接例2：時間・空間の交差項

さらに $1+1$ 次元Minkowskiで $t'=t+\varepsilon x/c$、$|\varepsilon|<1$ とします。逆変換は $dt=dt'-\varepsilon dx/c$ だから

$$
\begin{aligned}
ds^2&=-c^2(dt'-\varepsilon dx/c)^2+dx^2\\
&=-c^2dt'^2+2\varepsilon c\,dt'dx+(1-\varepsilon^2)dx^2.
\end{aligned}
$$

成分行列は

$$
G'=\begin{pmatrix}
-c^2&\varepsilon c\\
\varepsilon c&1-\varepsilon^2
\end{pmatrix},\qquad
\det G'=-c^2.
$$

二次形式が零となる非零接方向 $w=dx/dt'$ を求めると

$$
-c^2+2\varepsilon cw+(1-\varepsilon^2)w^2=0
$$

であり、

$$
w_+=\frac{c}{1+\varepsilon},\qquad
w_-=-\frac{c}{1-\varepsilon}
$$

を得ます。$|\varepsilon|<1$ なので分母は零ではありません。もとの右・左向き光に $dt'=dt+\varepsilon dx/c$ を直接代入しても同じ式です。**時間と空間の交差項は消えていないため、対角形の光速の式をここに当てはめることはできません。** 変わるのは座標速度であって光的条件そのものではありません。

## 7. 計量を読む際に確認すること

計量の座標領域、非退化性と慣性指数、時間向きを確定してから、時計の世界線に $-c^2d\tau^2=ds^2$、光の非零接方向に $ds^2=0$ を代入します。固有時や局所光速を述べるときは座標時刻・座標距離と混同していないかを必ず調べます。

ここで得た光的条件は光が進める**接方向**を決めますが、光線がどの軌道を進むかの運動方程式はまだ与えていません。それはGR3の測地線で扱います。また[GR1の平坦Rindler計量](../GR1/index.md#prop-gr1-rindler-metric)のように時計係数が位置依存でも曲率は零になり得ます。したがってこの章の式だけからEinstein場の方程式や時空の曲率を導いてはいけません。

---

## 演習

### Level A

### A1. 符号規約の読み替え

$1+1$ 次元で $\eta_+=\operatorname{diag}(1,-1)$、$\eta_-=-\eta_+$ とする。$(ct,x)$ 成分の $u=(3,2)$、$v=(1,1)$、$w=(1,2)$ について自己二乗を両規約で計算し、因果型を判定せよ。

- Level: A

<!-- solution-start -->
#### 詳細解答

各ベクトル $(a,b)$ に対し $\eta_+(v,v)=a^2-b^2$、$\eta_-(v,v)=-a^2+b^2$ です。代入すると

$$
\begin{array}{c|rrr}
&u&v&w\\ \hline
\eta_+&9-4=5&1-1=0&1-4=-3\\
\eta_-&-9+4=-5&-1+1=0&-1+4=3
\end{array}
$$

となります。$u$ は時間的、零でない $v$ は光的、$w$ は空間的です。GR規約では時間的が負なので符号を取り違えません。
<!-- solution-end -->

### A2. 異なる位置の静止時計

$ds^2=-c^2(1+\kappa x)^2dt^2+dx^2$、$\kappa,c,L,T>0$、$0\le x\le L$ とする。$x=0$ と $x=L$ の静止時計が共通の座標時間 $T$ に刻む固有時と、その比を求めよ。

- Level: A

<!-- solution-start -->
#### 詳細解答

静止時計では $dx=0$、従って $-c^2d\tau^2=-c^2(1+\kappa x)^2dt^2$ です。$x\ge0$ なので正の根を取って $d\tau=(1+\kappa x)dt$。位置は固定だから積分すると

$$
\Delta\tau_0=T,\qquad
\Delta\tau_L=(1+\kappa L)T,\qquad
\frac{\Delta\tau_L}{\Delta\tau_0}=1+\kappa L.
$$

これは共通の座標区間に対する計算であり、直接一地点へ時計を運んだ比較とは別です。
<!-- solution-end -->

### A3. 移動時計の判定

静的直交座標模型の一点で $N=2$、$h_{xx}=9$、他方向の速度は零とする。$dx/dt=c/2$ の時計は時間的か。また $d\tau/dt$ を求めよ。

- Level: A

<!-- solution-start -->
#### 詳細解答

自己二乗は $-N^2c^2+h_{xx}(dx/dt)^2=-4c^2+9c^2/4=-7c^2/4<0$ なので時間的です。[固有時率](#prop-gr2-clock-rate)から

$$
\frac{d\tau}{dt}=\sqrt{4-\frac{9(c/2)^2}{c^2}}
=\sqrt{\frac74}=\frac{\sqrt7}{2}.
$$

局所速度は $3(c/2)/2=3c/4<c$ で、時間的判定と一致します。
<!-- solution-end -->

### A4. 二方向の光

$N(x)=1+\kappa x$、$h_{xx}=4$、$\kappa>0$、$x\ge0$ とする。$x$ 方向の二つの光的座標速度と静止観測者が測る局所速度を求めよ。

- Level: A

<!-- solution-start -->
#### 詳細解答

[光円錐の命題](#prop-gr2-null-cone)を $B=\sqrt{h_{xx}}=2$ に適用すると、$4(dx/dt)^2=c^2(1+\kappa x)^2$ です。正負の根から

$$
\frac{dx}{dt}=\pm\frac{c(1+\kappa x)}2.
$$

空間物差しは $d\ell=2|dx|$、静止時計は $d\tau_{\rm stat}=(1+\kappa x)dt$ です。両方向ともその比は $c$ になります。
<!-- solution-end -->

### A5. 時刻の再目盛り

$ds^2=-4c^2dt^2+dx^2$ を $t'=4t$ で表した計量の $g_{t't'}$ と静止時計の固有時を求め、元の時刻との一致を確認せよ。

- Level: A

<!-- solution-start -->
#### 詳細解答

$dt=dt'/4$ なので $g_{t't'}=-4c^2/16=-c^2/4$。新時刻では $d\tau=\sqrt{-g_{t't'}/c^2}\,dt'=dt'/2$ です。元の時計では $d\tau=2dt$、$dt'=4dt$ により $dt'/2=2dt$ なので一致します。
<!-- solution-end -->

### Level B

### B1. 光の到達時間

$ds^2=-c^2(1+\kappa x)^2dt^2+dx^2$、$\kappa,c,L>0$ とする。$t=0$、$x=0$ から右向きの光を送ったとき $x=L$ へ達する座標時間と、同じ時間に $x=0$ の静止時計が刻む時間を求めよ。

- Level: B

<!-- solution-start -->
#### 詳細解答

$N=1+\kappa x>0$、$B=1$ なので[光的条件](#prop-gr2-null-cone)は $dx/dt=c(1+\kappa x)$ です。従って

$$
\begin{aligned}
t_L&=\int_0^L\frac{dx}{c(1+\kappa x)}
=\frac1{c\kappa}[\log(1+\kappa x)]_0^L\\
&=\frac{\log(1+\kappa L)}{c\kappa}.
\end{aligned}
$$

$x=0$ の時計係数は $N(0)=1$ なので $\Delta\tau_0=t_L$ です。光自身のLorentz長さは零であり、送信者の時計の読みとは別です。
<!-- solution-end -->

### B2. 交差項を含む光円錐

$ds^2=-c^2dt^2+dx^2$ と $t'=t+\varepsilon x/c$、$|\varepsilon|<1$ を考える。新しい $g_{t't'}$、$g_{t'x}$、$g_{xx}$ と光の二つの $w=dx/dt'$ を導け。

- Level: B

<!-- solution-start -->
#### 詳細解答

$dt=dt'-\varepsilon dx/c$ を代入して

$$
ds^2=-c^2dt'^2+2\varepsilon c\,dt'dx
+(1-\varepsilon^2)dx^2
$$

です。よって $g_{t't'}=-c^2$、$g_{t'x}=\varepsilon c$、$g_{xx}=1-\varepsilon^2$。光的条件は

$$
(1-\varepsilon^2)w^2+2\varepsilon cw-c^2=0.
$$

判別式は $(2\varepsilon c)^2+4(1-\varepsilon^2)c^2=4c^2$ なので、二次方程式を解いて

$$
w=\frac{-2\varepsilon c\pm2c}{2(1-\varepsilon^2)}
=\begin{cases}c/(1+\varepsilon),\\-c/(1-\varepsilon).\end{cases}
$$

です。$|\varepsilon|<1$ により分母は零ではありません。交差項を落とすと一次項が消え、誤った左右対称な解になります。
<!-- solution-end -->

### B3. 空間係数のある光の飛行時間

$ds^2=-c^2(1+\kappa x)^2dt^2+(1+\beta x)^2dx^2$、$\kappa,\beta,c,L>0$。$x=0$ から $L$ へ右向き光が飛ぶ座標時間を求め、$\beta=\kappa$ の場合を検算せよ。

- Level: B

<!-- solution-start -->
#### 詳細解答

$N=1+\kappa x$ と $B=1+\beta x$ は $[0,L]$ で正です。[光的条件](#prop-gr2-null-cone)から

$$
dt=\frac{1+\beta x}{c(1+\kappa x)}dx.
$$

分子を $(\beta/\kappa)(1+\kappa x)+(1-\beta/\kappa)$ と分けて積分すると

$$
\begin{aligned}
t_L&=\frac1c\int_0^L\left(
\frac{\beta}{\kappa}+\frac{1-\beta/\kappa}{1+\kappa x}\right)dx\\
&=\frac{\beta L}{c\kappa}
+\frac{1-\beta/\kappa}{c\kappa}\log(1+\kappa L).
\end{aligned}
$$

$\beta=\kappa$ で対数項の係数は零となり $t_L=L/c$。この場合は $N=B$ で座標光速が $c$ だから整合します。
<!-- solution-end -->

### B4. 移動時計の座標不変性

$ds^2=-N(x)^2c^2dt^2+B(x)^2dx^2$、$N,B>0$、$x=x(t)$ は未来向き時間的曲線とする。$q>0$ と $t'=qt$ で時刻を変更し、固有時率の式が同じ固有時増分を与えることを示せ。

- Level: B

<!-- solution-start -->
#### 詳細解答

$dt=dt'/q$、$dx/dt'=q^{-1}dx/dt$ なので新しい時計係数は $N'=N/q>0$。新座標に[固有時率](#prop-gr2-clock-rate)を適用して

$$
\begin{aligned}
\frac{d\tau}{dt'}
&=\sqrt{\frac{N^2}{q^2}
-\frac{B^2}{c^2q^2}\left(\frac{dx}{dt}\right)^2}\\
&=\frac1q\sqrt{N^2-\frac{B^2}{c^2}(dx/dt)^2}.
\end{aligned}
$$

$q>0$ なので平方根の外へ $q^{-1}$ を取り出せます。$dt'=qdt$ を掛ければ

$$
\frac{d\tau}{dt'}dt'
=\sqrt{N^2-\frac{B^2}{c^2}(dx/dt)^2}\,dt
=\frac{d\tau}{dt}dt.
$$

同じ経路の積分値も等しく、[座標変換の不変性](#prop-gr2-coordinate-invariance)と整合します。
<!-- solution-end -->

### Level C

### C1. Rindler模型で時計と光をつなぐ

$k=a/c^2>0$ と置き、$x\ge0$ を含む右Rindler領域で

$$
ds^2=-c^2(1+kx)^2dt^2+dx^2+dy^2+dz^2
$$

とする。$x=0$ に静止時計A、$x=L>0$ に静止時計Bを置き、$t=0$ にAから右向き光を送る。

1. 計量のLorentz型とA・Bの固有時率を確認せよ。
2. $x(0)=0$ の光の座標位置 $x(t)$、Bへの到達時間 $t_L$ を導け。
3. 光の局所速度と光自身のLorentz長さを求め、$[0,t_L]$ の間に静止したA・Bの時計の読みを比較せよ。
4. $t'=2t$ で $t'_L$ とBの固有時率を求め、Bが刻む時間が同じことを確認せよ。

- Level: C

<!-- solution-start -->
#### 詳細解答

座標基底の行列は $\operatorname{diag}(-c^2(1+kx)^2,1,1,1)$ です。$k,c>0$、$x\ge0$ だから負の固有値一本・正の固有値三本で、行列式 $-c^2(1+kx)^2<0$ です。係数は滑らかなのでLorentz計量を定めます。[固有時率](#prop-gr2-clock-rate)を静止世界線へ使うと

$$
\frac{d\tau_A}{dt}=1,\qquad
\frac{d\tau_B}{dt}=1+kL.
$$

右向きの光的条件は[光円錐の命題](#prop-gr2-null-cone)から $dx/dt=c(1+kx)$。変数分離して初期条件を代入すると

$$
\frac{dx}{1+kx}=c\,dt,\qquad
\int_0^{x(t)}\frac{d\xi}{1+k\xi}
=\int_0^t c\,ds,
$$

従って $\log(1+kx(t))/k=ct$。指数を取れば

$$
x(t)=\frac{e^{ckt}-1}{k},\qquad
t_L=\frac{\log(1+kL)}{ck}
=\frac ca\log\left(1+\frac{aL}{c^2}\right).
$$

空間物差しでは $d\ell=|dx|$、位置 $x$ の静止時計では $d\tau_{\rm stat}=(1+kx)dt$ なので

$$
\frac{d\ell}{d\tau_{\rm stat}}
=\frac{c(1+kx)dt}{(1+kx)dt}=c.
$$

光は各点で光的なので[LORG3のLorentz長さ](../../../幾何系/LORG/LORG3/index.md#def-lorg3-lorentz-length)は零です。他方、静止時計の読みは

$$
\Delta\tau_A=t_L,\qquad
\Delta\tau_B=(1+kL)t_L.
$$

時刻を $t'=2t$ と取り替えると $t'_L=2t_L$、Bの時間係数は $-c^2(1+kL)^2/4$ となり、固有時率は $d\tau_B/dt'=(1+kL)/2$ です。従って

$$
\Delta\tau'_B=\frac{1+kL}{2}\,t'_L
=(1+kL)t_L=\Delta\tau_B.
$$

これは[座標変換の不変性](#prop-gr2-coordinate-invariance)を検算したものです。[GR1のRindler計量](../GR1/index.md#prop-gr1-rindler-metric)はMinkowski時空の座標表示なので、時計係数の位置依存性だけで曲率の非零を主張することはできません。
<!-- solution-end -->
