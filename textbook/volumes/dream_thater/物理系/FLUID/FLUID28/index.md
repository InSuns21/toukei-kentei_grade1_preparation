# FLUID28 群速度はエネルギーの輸送とどう関係するか

## この講義で解決すること

[FLUID27 の分散関係](../FLUID27/index.md#thm-fluid27-dispersion)は、波数ごとに山の進む速度が変わることを示した。しかし、山の進む速さと、局所的に作った波の揺れが遠くへ届く速さは同じだろうか。近い二つの波を重ねると速い振動の上に緩やかな強弱が現れる。この強弱の移動を調べ、その速さが**波のエネルギー流束を平均エネルギーで割った速さ**と一致する理由を、線形自由表面の保存則から求める。

**結論の成立域を先に区別する。** 本講の模型は一定水深の水平底面、一定密度・非圧縮・非粘性・無渦の二次元液体、一定気圧の気体、一様な表面張力、弱い振幅の線形波である。波束の包絡の移動を一つの速度で近似するときは、さらに波数の広がりが中心波数より十分小さいとする。非線形波、砕波、風によるエネルギー入力、粘性散逸、水深が変化する伝播はここでの等式からは直接結論できない。

## 0. 何を輸送と呼ぶのか

水平座標を $x$、鉛直上向き座標を $z$、時刻を $t$ とする。平均水面は $z=0$、底面は $z=-h$（$h>0$）である。

密度 $\rho>0$、重力加速度の大きさ $g>0$、表面張力 $\gamma\ge0$ は定数とする。水面変位を $\eta(x,t)$、速度ポテンシャルを $\phi(x,z,t)$、速度を $(u,w)=(\phi_x,\phi_z)$ と置く。

下付きの $x,z,t$ は、残りの変数を固定して偏微分する変数を表す。例えば $\eta_t=\partial\eta/\partial t$、$\phi_z=\partial\phi/\partial z$ である。

[線形自由表面条件](../FLUID27/index.md#prop-fluid27-linear-boundary)によって、内部 $-h<z<0$ では $\phi_{xx}+\phi_{zz}=0$、底面では $\phi_z=0$、水面では

$$
\eta_t=\phi_z,\qquad
\phi_t+g\eta-\frac{\gamma}{\rho}\eta_{xx}=0
\quad(z=0)
$$

が成り立つものとする。代表振幅 $a>0$、波数 $k>0$ について $ka\ll1$ と $a/h\ll1$ を課す。以下のエネルギーは一次の速度・変位を**二次まで**使って計算するため、保存式は線形模型に付随する二次の厳密な恒等式である。元の非線形模型の全エネルギーを高次まで表しているわけではない。

[波数・周期](../FLUID27/index.md#def-fluid27-wavenumber)と[位相速度](../FLUID27/index.md#def-fluid27-phase-speed)は、右向き単色波 $\eta=a\cos(kx-\omega t)$ に対して $k=2\pi/\lambda$、$T=2\pi/\omega$、$c_p=\omega/k$ であった。これは一定の山を追う速度であり、単独ではエネルギーが進む速度を決めない。

## 1. 近い二つの波から包絡の速さを読む

異なる波数に対する角周波数は、水深と物性を固定した分散関係

$$
\omega(k)=\sqrt{\left(gk+\frac{\gamma}{\rho}k^3\right)\tanh(kh)}
\qquad(k>0)
$$

で決まる。[前講の分散関係](../FLUID27/index.md#thm-fluid27-dispersion)の正の枝を選んでいる。

中心波数 $k_0>0$ の前後に $k_\pm=k_0\pm\delta k/2$ を取り、$0<\delta k<2k_0$、$\omega_\pm=\omega(k_\pm)$ とする。各成分の振幅を $a/2$ にする。ここで余弦の和を積へ直す恒等式

$$
\cos A+\cos B=2\cos\left(\frac{A+B}{2}\right)\cos\left(\frac{A-B}{2}\right)
$$

に $A=k_+x-\omega_+t$、$B=k_-x-\omega_-t$ を代入すると

$$
\begin{aligned}
\eta(x,t)
&=\frac a2\cos(k_+x-\omega_+t)
+\frac a2\cos(k_-x-\omega_-t)\\
&=a\cos\left(\frac{\delta k\,x-\delta\omega\,t}{2}\right)
\cos\left(k_0x-\overline\omega\,t\right),
\end{aligned}
$$

ただし $\delta\omega=\omega_+-\omega_-$、$\overline\omega=(\omega_++\omega_-)/2$ である。速い振動を**搬送波**、その振幅を変えるゆっくりした因子を**包絡**と見れば、包絡の同じ位相が動く速度は $\delta\omega/\delta k$ である。二波の合成は空間全体に繰り返すうなりであり、まだ有限区間に閉じ込めた波束ではない。多くの近接波数を重ねて局在した包絡も、十分狭帯域なら同じ一次の近似で追える。

ここで、波数を連続的に変えたとき角周波数の変化率を新しい速度として導入する。

<a id="def-fluid28-group-velocity"></a>

<!-- formal-statement-start -->
> **定義（群速度）**  
> 空間的に一様な線形媒質の右進行波において、正の波数 $k$ に対する実数値の分散関係 $\omega(k)>0$ が微分可能なら、群速度を

$$
c_g(k)=\frac{d\omega}{dk}(k)
$$

> と定める。$[\omega]={\rm s^{-1}}$、$[k]={\rm m^{-1}}$ より単位は m/s。$c_g$ は一般には[位相速度](../FLUID27/index.md#def-fluid27-phase-speed) $\omega/k$ と異なる。
<!-- formal-statement-end -->

<!-- definition-example-start: def-fluid28-group-velocity -->
**定義の確認**：深水・表面張力なしの[分散式](../FLUID27/index.md#prop-fluid27-depth-limits) $\omega(k)=\sqrt{gk}$（$g>0$、$k>0$）なら、微分を実行して

$$
c_g(k)=\frac{g}{2\sqrt{gk}}
=\frac12\sqrt{\frac gk},\qquad
c_p(k)=\frac{\sqrt{gk}}{k}=\sqrt{\frac gk}.
$$

従って $c_g=c_p/2>0$。同じ波でも**山は包絡より2倍速く進む**。$\omega(k)$ は $k>0$ で微分可能であり、定義の条件も満たしている。
<!-- definition-example-end -->

<a id="prop-fluid28-beat-envelope"></a>

<!-- formal-statement-start -->
> **命題（近接二波の包絡速度）**  
> $k_0>0$ の近傍で分散関係 $\omega(k)$ が二階連続微分可能とし、$0<\delta k<2k_0$ とする。二つの右進行波 $k_\pm=k_0\pm\delta k/2$ を等振幅で重ねると、符号付き包絡の位相は $\delta k\,x-\delta\omega\,t$ であり、その速度は

$$
v_{\rm beat}=\frac{\omega(k_+)-\omega(k_-)}{\delta k}.
$$

> $\delta k\to0^+$ で $v_{\rm beat}\to c_g(k_0)$。さらに波数が $k_0$ の近くへ集中する狭帯域の線形波束では、分散関係の一次近似が有効な時間・距離で、包絡は速度 $c_g(k_0)$ で移動する。
<!-- formal-statement-end -->

### 証明の見取り図

三角関数の積表示から、包絡の位相を固定した式 $\delta k\,x-\delta\omega\,t=\text{定数}$ を微分する。差商を微分係数へ近づければ群速度になる。波束では各成分の周波数を中心で一次展開し、共通の位相因子の外に同じ移動座標を取り出す。

<!-- proof-start -->
### 証明

二波の合成式は節頭で導いた。包絡の符号付き因子の一定位相を追うと

$$
0=\frac{d}{dt}\{\delta k\,x(t)-\delta\omega\,t\}
=\delta k\,\frac{dx}{dt}-\delta\omega,
$$

ここで $x(t)$ は包絡の位相を一定に保つ点であり、$\delta k,\delta\omega$ は固定した二波の定数である。$\delta k>0$ で割って $dx/dt=\delta\omega/\delta k$ を得る。

以下、$\omega'(k_0)$ は $\omega$ を波数 $k$ で常微分して $k_0$ で評価した値、すなわち $(d\omega/dk)(k_0)$ を表す。$\omega$ の微分可能性から

$$
\lim_{\delta k\to0}
\frac{\omega(k_0+\delta k/2)-\omega(k_0-\delta k/2)}{\delta k}
=\omega'(k_0).
$$

波束を有限個の近接成分の和 $\sum_j a_j\cos(k_jx-\omega(k_j)t)$ で近似する。各波数を $k_j=k_0+q_j$ と書き、$|q_j|\ll k_0$ とする。

すべての $k_0,k_j$ を含む閉区間 $I\subset(0,\infty)$ を選び、$M=\sup_{s\in I}|\omega''(s)|<\infty$ と置く。

[群速度の定義](#def-fluid28-group-velocity)より $\omega'(k_0)=c_g(k_0)$ である。差を二度積分すると、$q_j$ の正負どちらでも

$$
\begin{aligned}
R_j&:=\omega(k_0+q_j)-\omega(k_0)-\omega'(k_0)q_j\\
&=\int_0^{q_j}\{\omega'(k_0+s)-\omega'(k_0)\}\,ds\\
&=\int_0^{q_j}(q_j-s)\omega''(k_0+s)\,ds.
\end{aligned}
$$

従って $|R_j|\le Mq_j^2/2$ であり、$\omega(k_0+q_j)=\omega(k_0)+c_g(k_0)q_j+R_j$ を各成分に代入すると、位相は

$$
k_jx-\omega(k_j)t
=k_0x-\omega(k_0)t
+q_j\{x-c_g(k_0)t\}
-R_jt,\qquad |R_jt|\le\frac{M}{2}q_j^2|t|.
$$

すべての成分について $Mq_j^2|t|\ll1$ で二次の位相差が小さい時間範囲では、ゆっくりした振幅の和が $x-c_g(k_0)t$ の関数になる。従って**この近似の範囲内で**包絡が群速度で移動する。時間が長く $q_j^2t$ の寄与が無視できなくなれば、包絡は変形・拡散し、単なる平行移動ではなくなる。
<!-- proof-end -->

**注意**：位相速度は搬送波の進み方、群速度は近接波数の干渉による包絡の進み方である。二波のうなりの山を見ただけで「必ず物質や情報がその速さで運ばれる」と主張はできない。次に**実際のエネルギー保存式**を調べる。

## 2. 有限水深の群速度を計算する

$q=kh>0$ と $r=\gamma k^2/(\rho g)\ge0$ を置く。$q$ は底の影響を、$r$ は毛管項と重力項の比を表す。ここで $\omega'(k)=d\omega/dk$ は $k$ についての常微分であり、$h,\rho,g,\gamma$ は固定する。$\omega^2=(gk+\gamma k^3/\rho)\tanh q$ の両辺を $k$ で微分すると

$$
2\omega\omega'
=\left(g+3\frac{\gamma}{\rho}k^2\right)\tanh q
+\left(gk+\frac{\gamma}{\rho}k^3\right)h\,\operatorname{sech}^2q.
$$

右辺を $2\omega$ で割った後、$\omega^2=k(g+\gamma k^2/\rho)\tanh q$ を代入して $c_p=\omega/k$ でくくる。$\operatorname{sech}^2q/\tanh q=2/\sinh(2q)$ なので以下を得る。

<a id="thm-fluid28-finite-depth-group"></a>

<!-- formal-statement-start -->
> **定理（有限水深の重力・毛管波の群速度）**  
> 密度 $\rho>0$、水深 $h>0$、重力 $g>0$、表面張力 $\gamma\ge0$ が一定の線形自由表面波で、波数 $k>0$ に対して正の分散枝

$$
\omega^2=\left(gk+\frac{\gamma}{\rho}k^3\right)\tanh(kh)
$$

> を取る。$q=kh$、$r=\gamma k^2/(\rho g)$、$c_p=\omega/k$ とすると

$$
\boxed{\frac{c_g}{c_p}
=\frac12\left(\frac{1+3r}{1+r}+\frac{2q}{\sinh(2q)}\right).}
$$

> 右辺は正である。深水重力波では $c_g/c_p\to1/2$、深水毛管波が支配的な極限では $c_g/c_p\to3/2$、表面張力のない浅水長波では $c_g/c_p\to1$ となる。
<!-- formal-statement-end -->

### 証明の見取り図

$\omega^2$ を直接微分してから元の分散式で分母の $\omega$ を整理する。深水では底面に由来する $2q/\sinh(2q)$ が消え、浅水ではこの比が1へ近づく。

<!-- proof-start -->
### 証明

$q>0$、$r\ge0$ より $\omega>0$。上の微分式を $\omega$ で割り、$c_g/c_p=k\omega'/\omega$ を使うと

$$
\begin{aligned}
\frac{c_g}{c_p}
&=\frac{k}{2\omega^2}
\left\{\left(g+3\frac{\gamma k^2}{\rho}\right)\tanh q
+k\left(g+\frac{\gamma k^2}{\rho}\right)h\operatorname{sech}^2q\right\}\\
&=\frac12\left\{\frac{g+3\gamma k^2/\rho}{g+\gamma k^2/\rho}
+kh\frac{\operatorname{sech}^2q}{\tanh q}\right\}\\
&=\frac12\left\{\frac{1+3r}{1+r}+\frac{2q}{\sinh(2q)}\right\}.
\end{aligned}
$$

全項が正なので $c_g>0$。$q\to\infty$ では $2q/\sinh(2q)\to0$、そのとき $r=0$ なら比は $1/2$、$r\to\infty$ なら $3/2$ である。$\gamma=0$ のまま $q\to0$ では $\sinh(2q)/(2q)\to1$ から $c_g/c_p\to1$。これらはそれぞれの**指定した極限**であり、一般の有限水深波すべてに同じ値を使えない。
<!-- proof-end -->

**直接例**：水深が十分大きい毛管優勢の短波では、$c_g\simeq3c_p/2$ となり、包絡が山より速い。群速度が位相速度より小さいことは一般則ではない。

## 3. 波のエネルギーを深さ方向に積分する

波のエネルギーには、速度に対応する運動エネルギー、水面を持ち上げる重力による水面のエネルギー、水面を傾けて面積を増やす表面エネルギーがある。平面内の $x$ 方向へ進む二次元波を**波峰方向の単位幅当たり**で考える。次の各量は水平面積当たり J/m$^2$ である（この二次元断面では水平長さと奥行き1 m当たりの量）。

まず、線形模型の水平位置 $x$ における二次の運動エネルギーと重力・表面エネルギーを

$$
K=\frac{\rho}{2}\int_{-h}^0(\phi_x^2+\phi_z^2)\,dz,\qquad
U_g=\frac{\rho g}{2}\eta^2,\qquad
U_\gamma=\frac{\gamma}{2}\eta_x^2
$$

と置く。$U_g$ は $\rho g\int_0^\eta z\,dz=\rho g\eta^2/2$ から得られる。表面張力の項は、単位水平長さに対する表面面積 $\sqrt{1+\eta_x^2}$ の増分から

$$
\gamma(\sqrt{1+\eta_x^2}-1)
=\frac{\gamma}{2}\eta_x^2+O(\eta_x^4)
$$

を用いた（一定の基準面積分を除く）。

<a id="prop-fluid28-wave-energy"></a>

<!-- formal-statement-start -->
> **命題（線形重力・毛管波の平均エネルギー）**  
> $h,\rho,g,k,a,\omega>0$、$\gamma\ge0$ とし、[有限水深分散関係](../FLUID27/index.md#thm-fluid27-dispersion)を満たす水面変位とポテンシャル

$$
\eta=a\cos(kx-\omega t),\qquad
\phi=\frac{a\omega\cosh(k(z+h))}{k\sinh(kh)}
\sin(kx-\omega t)
$$

> に対し、$K,U_g,U_\gamma$ を上の二次エネルギーとする。固定した $x$ で一周期 $T=2\pi/\omega$ の平均 $\langle f\rangle=T^{-1}\int_0^T f\,dt$ を取ると

$$
\boxed{\langle K\rangle
=\langle U_g+U_\gamma\rangle
=\frac{a^2}{4}(\rho g+\gamma k^2),}
$$

$$
\boxed{\mathcal E:=\langle K+U_g+U_\gamma\rangle
=\frac{a^2}{2}(\rho g+\gamma k^2)>0.}
$$

> エネルギー密度 $\mathcal E$ の単位は J/m$^2$ であり、無散逸の線形模型で時間平均した値である。
<!-- formal-statement-end -->

### 証明の見取り図

既習の[単色波ポテンシャル](../FLUID27/index.md#thm-fluid27-dispersion)を二回微分し、水平・鉛直速度を二乗して足す。位相平均はどちらも $1/2$ になり、深さ積分を分散式で置き換えると、運動エネルギーは重力・表面エネルギーの和と一致する。

<!-- proof-start -->
### 証明

$\theta=kx-\omega t$、$q=kh$ とすると

$$
u=\frac{a\omega\cosh(k(z+h))}{\sinh q}\cos\theta,\qquad
w=\frac{a\omega\sinh(k(z+h))}{\sinh q}\sin\theta.
$$

一周期で $\langle\cos^2\theta\rangle=\langle\sin^2\theta\rangle=1/2$ より

$$
\begin{aligned}
\langle K\rangle
&=\frac{\rho a^2\omega^2}{4\sinh^2q}
\int_{-h}^0\left[\cosh^2(k(z+h))+\sinh^2(k(z+h))\right]dz\\
&=\frac{\rho a^2\omega^2}{4\sinh^2q}
\left[\frac{\sinh(2k(z+h))}{2k}\right]_{-h}^0\\
&=\frac{\rho a^2\omega^2}{4k}\coth q
=\frac{\rho a^2}{4k}\frac{\omega^2}{\tanh q}.
\end{aligned}
$$

[分散関係](../FLUID27/index.md#thm-fluid27-dispersion)によって $\omega^2/\tanh q=k(g+\gamma k^2/\rho)$ なので

$$
\langle K\rangle=\frac{a^2}{4}(\rho g+\gamma k^2).
$$

一方、$\eta=a\cos\theta$、$\eta_x=-ak\sin\theta$ を重力・表面エネルギーへ代入すると

$$
\langle U_g\rangle=\frac{\rho ga^2}{4},\qquad
\langle U_\gamma\rangle=\frac{\gamma k^2a^2}{4}.
$$

従って $\langle K\rangle=\langle U_g+U_\gamma\rangle$、合計は両者の二倍である。
<!-- proof-end -->

**重要な区別**：等分配されるのは運動エネルギーと「重力＋表面張力」の**水面の復元力に対応するエネルギー全体**である。毛管波で重力による水面のエネルギーだけを数えると $\mathcal E$ を過小評価する。

## 4. エネルギー保存式から流束を求める

エネルギーがどこへ流れるかを求めるには、平均エネルギーだけでは足りない。[線形化した Euler 方程式](../FLUID27/index.md#prop-fluid27-linear-boundary)の背景で、静水圧 $p_0(z)=p_a-\rho gz$ からの圧力摂動を $p'(x,z,t)$ と置く。

$p'$ のプライムは「静水圧との差」を表し、前節の $\omega'(k)=d\omega/dk$ のような微分記号ではない。一次の運動方程式は

$$
\rho u_t=-p'_x,\qquad \rho w_t=-p'_z.
$$

速度ポテンシャルで積分し、時間だけの基準を固定すると

$$
p'=-\rho\phi_t,\qquad
p'(x,0,t)=\rho g\eta-\gamma\eta_{xx}.
$$

水平方向の圧力仕事に加え、表面張力が傾斜した水面へする仕事も水平に運ばれる。流束の式を覚える前に、局所保存を導こう。

<a id="thm-fluid28-local-energy"></a>

<!-- formal-statement-start -->
> **定理（線形自由表面波の二次エネルギー保存則）**  
> 平坦な底面 $z=-h$（$h>0$）、一定密度 $\rho>0$・重力 $g>0$・一様表面張力 $\gamma\ge0$ の非圧縮・非粘性・無渦の二次元液体を考える。滑らかな速度ポテンシャル $\phi$ と水面変位 $\eta$ が[線形自由表面条件](../FLUID27/index.md#prop-fluid27-linear-boundary)を満たし、$p'=-\rho\phi_t$ とする。二次エネルギー密度と水平流束を

$$
\mathscr E=\frac{\rho}{2}\int_{-h}^0|\nabla\phi|^2\,dz
+\frac{\rho g}{2}\eta^2+\frac{\gamma}{2}\eta_x^2,
$$

$$
\mathscr J=\int_{-h}^0p'\phi_x\,dz-\gamma\eta_x\eta_t
$$

> と置くと、線形模型において次の局所保存則が成り立つ。

$$
\boxed{\partial_t\mathscr E+\partial_x\mathscr J=0.}
$$

> $\mathscr J$ の単位は W/m（波峰方向の単位幅当たりの仕事率）であり、第2項は毛管界面による流束である。
<!-- formal-statement-end -->

### 証明の見取り図

速度場の二乗を微分し、$\Delta\phi=0$ を用いて発散形へ変える。深さ積分すると水面には $p'(0)\eta_t$ が残る。この項の重力部分は $\partial_t(\rho g\eta^2/2)$、毛管部分は部分積分によって表面エネルギーの時間変化と界面流束へ分かれる。

<!-- proof-start -->
### 証明

内部で $\Delta\phi=0$ だから、積の微分により

$$
\begin{aligned}
\partial_t\left(\frac{\rho}{2}|\nabla\phi|^2\right)
&=\rho\nabla\phi\cdot\nabla\phi_t\\
&=\nabla\cdot(\rho\phi_t\nabla\phi)-\rho\phi_t\Delta\phi\\
&=-\partial_x(p'\phi_x)-\partial_z(p'\phi_z).
\end{aligned}
$$

固定区間 $-h\le z\le0$ で積分し、底面条件 $\phi_z(-h)=0$ と水面の運動学条件 $\phi_z(0)=\eta_t$ を入れると

$$
\partial_tK+\partial_x\int_{-h}^0p'\phi_x\,dz
+p'(0)\eta_t=0.
$$

水面の動力学条件から $p'(0)=\rho g\eta-\gamma\eta_{xx}$。そこで

$$
\rho g\eta\eta_t=\partial_tU_g
$$

であり、さらに積の微分を使って

$$
\begin{aligned}
-\gamma\eta_{xx}\eta_t
&=-\gamma\partial_x(\eta_x\eta_t)+\gamma\eta_x\eta_{xt}\\
&=-\partial_x(\gamma\eta_x\eta_t)+\partial_tU_\gamma.
\end{aligned}
$$

この二式を上の深さ積分式に戻すと

$$
\partial_t(K+U_g+U_\gamma)
+\partial_x\left(\int_{-h}^0p'\phi_x\,dz-\gamma\eta_x\eta_t\right)=0.
$$

すべては線形境界値問題と滑らかさから導いた恒等式である。
<!-- proof-end -->

**反例となる計算法**：毛管波で $\int p'u\,dz$ だけをエネルギー流束と定めてしまうと、保存則の導出に現れる $\partial_x(\gamma\eta_x\eta_t)$ を取り逃す。波のエネルギーは正でも、比 $\langle\mathscr J\rangle/\mathcal E$ が群速度とずれる。これは分散関係の問題ではなく、**界面の仕事を落としたエネルギー収支の欠落**である。

## 5. 平均エネルギーが群速度で運ばれることを証明する

$q=kh>0$、$r=\gamma k^2/(\rho g)$、$S(q)=2q/\sinh(2q)$ とする。単色波の正の平均流束を、圧力部分 $J_p$ と界面張力部分 $J_\gamma$ に分ける。

<a id="thm-fluid28-energy-transport"></a>

<!-- formal-statement-start -->
> **定理（平均波エネルギー流束と群速度）**  
> $h,\rho,g,k,a,\omega>0$、$\gamma\ge0$ が一定で、[有限水深分散式](../FLUID27/index.md#thm-fluid27-dispersion)と線形境界条件を満たす右向き単色重力・毛管波を考える。[平均エネルギー](#prop-fluid28-wave-energy)を $\mathcal E=a^2(\rho g+\gamma k^2)/2$ とし、[保存則の流束](#thm-fluid28-local-energy)を一周期平均する。このとき

$$
\begin{aligned}
J_p&:=\left\langle\int_{-h}^0p'\phi_x\,dz\right\rangle
=\mathcal E\,\frac{c_p}{2}\left(1+\frac{2kh}{\sinh(2kh)}\right),\\
J_\gamma&:=-\gamma\langle\eta_x\eta_t\rangle
=\mathcal E\,c_p\frac{r}{1+r},
\end{aligned}
$$

> であり、総平均流束 $J=J_p+J_\gamma$ は

$$
\boxed{J=\mathcal E\,c_g,\qquad
\frac{J}{\mathcal E}
=\frac{c_p}{2}\left(\frac{1+3r}{1+r}
+\frac{2kh}{\sinh(2kh)}\right).}
$$

> $J>0$、$\mathcal E>0$。従ってこの**一様・線形・無散逸模型の単色波**では、エネルギー輸送速度 $J/\mathcal E$ は群速度に等しい。
<!-- formal-statement-end -->

### 証明の見取り図

動圧と水平速度はいずれも $\cos\theta$ に比例し、その積の時間平均は振幅積の半分になる。深さ方向の $\cosh^2$ を積分して $J_p$ を出し、水面の $\eta_x\eta_t$ から $J_\gamma$ を出す。最後に[群速度の式](#thm-fluid28-finite-depth-group)と項別に比較する。

<!-- proof-start -->
### 証明

[単色波ポテンシャル](../FLUID27/index.md#thm-fluid27-dispersion)から

$$
p'=-\rho\phi_t=
\frac{\rho a\omega^2}{k\sinh q}\cosh(k(z+h))\cos\theta,
$$

$$
u=\phi_x=\frac{a\omega}{\sinh q}\cosh(k(z+h))\cos\theta.
$$

ゆえに $\langle\cos^2\theta\rangle=1/2$ から

$$
\begin{aligned}
J_p
&=\frac{\rho a^2\omega^3}{2k\sinh^2q}
\int_{-h}^0\cosh^2(k(z+h))\,dz\\
&=\frac{\rho a^2\omega^3}{2k\sinh^2q}
\left(\frac h2+\frac{\sinh(2q)}{4k}\right)\\
&=\frac{\rho a^2\omega^3}{4k^2}\coth q
\left(1+\frac{2q}{\sinh(2q)}\right).
\end{aligned}
$$

[分散式](../FLUID27/index.md#thm-fluid27-dispersion)から $\omega^2\coth q=k(g+\gamma k^2/\rho)$ なので

$$
J_p=\frac{a^2\omega}{4k}(\rho g+\gamma k^2)(1+S)
=\mathcal E\,\frac{c_p}{2}(1+S).
$$

一方 $\eta_x=-ak\sin\theta$、$\eta_t=a\omega\sin\theta$ だから

$$
J_\gamma=-\gamma\langle\eta_x\eta_t\rangle
=\frac{\gamma a^2k\omega}{2}
=\mathcal E\,c_p\frac{\gamma k^2}{\rho g+\gamma k^2}
=\mathcal E\,c_p\frac{r}{1+r}.
$$

合計を $\mathcal E c_p$ で割ると

$$
\frac J{\mathcal E c_p}
=\frac12(1+S)+\frac{r}{1+r}
=\frac12\left(\frac{1+3r}{1+r}+S\right)
=\frac{c_g}{c_p}
$$

となる。最後の等号は[有限水深群速度](#thm-fluid28-finite-depth-group)による。
<!-- proof-end -->

**検算1（深水重力波）**：$q\gg1$、$\gamma=0$ では $S\to0$、$J_\gamma=0$。従って $J/\mathcal E=c_p/2=c_g$。

**検算2（深水毛管波）**：$q\gg1$、$r\gg1$ では $J_p\simeq\mathcal E c_p/2$、$J_\gamma\simeq\mathcal E c_p$。合計は $\simeq3\mathcal E c_p/2$。張力仕事の寄与を省略した場合だけ、群速度との一致が破れる。

局在した狭帯域波束では、二次エネルギーを搬送波の数周期にわたって平均して包絡のエネルギー密度と見る。中心波数 $k_0$ に近い成分の $c_g$ がほぼ同じなら、包絡の移動とエネルギーの移動は一次近似で一致する。**広帯域の波束**では成分ごとの群速度が異なるので、全体を一つの一定速度で運べるとは限らない。

## 6. ブラウザで位相速度・群速度・流束を検算する

この Python ラボは一つの分散式から $\omega,c_p,c_g$ を求め、独立した対称差分による $d\omega/dk$ と比較する。同じ入力で $J_p$、$J_\gamma$、$\mathcal E$ を出し、$J/\mathcal E-c_g$ の残差も調べる。二波の線形うなりの二時刻の水面形状と、波数を変えた $c_p,c_g$ のグラフを同じ実行欄に示す。**これは線形波の解析式の標本化であり、非線形自由表面の数値時間発展ではない。**

```python-file-lab
# lab-id: FLUID28-ENERGY-GROUP
# lab-title: 重力・毛管波の群速度とエネルギー流束
# lab-file: textbook/volumes/dream_thater/物理系/FLUID/FLUID28/group_energy_lab.py
# timeout-ms: 15000
# lab-preset: 水深40cm・重力優勢 | --depth 0.4 --wavelength 1 --samples 240
# lab-preset: 浅水・長波 | --depth 0.05 --wavelength 1 --amplitude 0.001 --samples 240
# lab-preset: 深水・毛管優勢 | --depth 0.4 --wavelength 0.01 --amplitude 0.0001 --samples 240
# lab-preset: 表面張力なし | --depth 0.4 --wavelength 1 --gamma 0 --samples 240
# lab-preset: 波数差を縮める | --depth 0.4 --wavelength 1 --spread 0.04 --samples 480
```

[Pythonソースを閲覧](group_energy_lab.py)。表示した二つの波形は $x/\lambda$、$\eta/a$ を軸に取る。波数差を縮めると差商の群速度は微分で定めた群速度へ近づくが、うなりの空間周期は長くなる。描画点数を増やして線が滑らかになっても、線形模型の物理的精度が上がるわけではない。

## 7. 演習

特記しなければ、全問で $\rho,g,h,k,a,\omega>0$、$\gamma\ge0$ を一定とし、非圧縮・非粘性・無渦の線形自由表面波の正の分散枝を用いる。右向きを正、$c_p=\omega/k$、$c_g=d\omega/dk$、$q=kh$、$r=\gamma k^2/(\rho g)$、$S=2q/\sinh(2q)$ とする。二次平均エネルギー・流束は節3〜5の規約で測る。

### Level A

### A1. 深水重力波で二つの速さを比較する

$\gamma=0$、$kh\gg1$ の極限で $\omega=\sqrt{gk}$ とする。$c_p,c_g$ を求め、どちらが速いか示せ。

- Level: A

<!-- solution-start -->
#### 詳細解答

[群速度の定義](#def-fluid28-group-velocity)と[位相速度の定義](../FLUID27/index.md#def-fluid27-phase-speed)を順に使う。$g$ を固定して

$$
\omega'(k)=\frac12(gk)^{-1/2}g=\frac12\sqrt{\frac gk},
\qquad c_p=\frac{\sqrt{gk}}{k}=\sqrt{\frac gk}.
$$

従って $c_g=c_p/2$。$k,g>0$ より両者は正で、山が包絡より速い。
<!-- solution-end -->

### A2. 有限水深の重力波で底の効果を求める

$\gamma=0$、$q=kh>0$ に対して $c_g/c_p$ を求め、$q\to0^+$ と $q\to\infty$ の値を検算せよ。

- Level: A

<!-- solution-start -->
#### 詳細解答

[有限水深群速度](#thm-fluid28-finite-depth-group)に $r=0$ を代入して

$$
\frac{c_g}{c_p}=\frac12\left(1+\frac{2q}{\sinh(2q)}\right).
$$

$q\to0^+$ では $\sinh(2q)=2q+O(q^3)$ なので $2q/\sinh(2q)\to1$、比は1。一方 $q\to\infty$ では指数関数の成長が $q$ より速いから $2q/\sinh(2q)\to0$、比は $1/2$ となる。
<!-- solution-end -->

### A3. 深水の毛管優勢波

$kh\gg1$、$\gamma>0$、$\gamma k^2/(\rho g)\gg1$ とする。主項 $\omega\simeq\sqrt{\gamma/\rho}\,k^{3/2}$ から $c_g/c_p$ を求めよ。

- Level: A

<!-- solution-start -->
#### 詳細解答

$\sqrt{\gamma/\rho}$ は定数。$k>0$ で微分して

$$
c_g\simeq\frac32\sqrt{\frac{\gamma}{\rho}}\,k^{1/2},\qquad
c_p\simeq\sqrt{\frac{\gamma}{\rho}}\,k^{1/2}.
$$

従って $c_g/c_p\simeq3/2$。[有限水深群速度](#thm-fluid28-finite-depth-group)の $q,r\to\infty$ の結果とも合う。ここでは群速度が位相速度より大きい。
<!-- solution-end -->

### A4. エネルギーの三つの部分

$a>0$ の線形単色波について、$\langle U_g\rangle,\langle U_\gamma\rangle,\langle K\rangle$ を示し、$r=1$ のとき三つの比を求めよ。

- Level: A

<!-- solution-start -->
#### 詳細解答

[線形重力・毛管波の平均エネルギー](#prop-fluid28-wave-energy)から

$$
\langle U_g\rangle=\frac{\rho ga^2}{4},\quad
\langle U_\gamma\rangle=\frac{\gamma k^2a^2}{4},\quad
\langle K\rangle=\frac{(\rho g+\gamma k^2)a^2}{4}.
$$

$r=1$ は $\gamma k^2=\rho g$ の意味なので、同じ正の量 $X=\rho ga^2/4$ を用いて $\langle U_g\rangle=X$、$\langle U_\gamma\rangle=X$、$\langle K\rangle=2X$。従って比は $1:1:2$ である。**三つが等しいのではない**。
<!-- solution-end -->

### A5. 二つの波の包絡を追う

$\eta=(a/2)\cos(k_+x-\omega_+t)+(a/2)\cos(k_-x-\omega_-t)$、$k_+>k_->0$ とする。包絡を積に分け、符号付き包絡の同位相点の速さを求めよ。

- Level: A

<!-- solution-start -->
#### 詳細解答

$\delta k=k_+-k_-$、$\delta\omega=\omega_+-\omega_-$ とすれば、加法公式 $\cos A+\cos B=2\cos((A-B)/2)\cos((A+B)/2)$ を直接適用して

$$
\eta=a\cos\left(\frac{\delta k x-\delta\omega t}{2}\right)
\cos\left(\frac{k_++k_-}{2}x-\frac{\omega_++\omega_-}{2}t\right).
$$

第1因子の位相を固定して位置 $x=x(t)$ を追う。$\delta k,\delta\omega$ は定数なので、連鎖律から

$$
0=\frac{d}{dt}\{\delta k\,x(t)-\delta\omega\,t\}
=\delta k\,\frac{dx}{dt}-\delta\omega
$$

を得る。$\delta k>0$ で割ると

$$
v_{\rm beat}=\frac{dx}{dt}=\frac{\delta\omega}{\delta k}.
$$

二波の差を零へ近づけた極限で[群速度の定義](#def-fluid28-group-velocity)と一致する。
<!-- solution-end -->

### Level B

### B1. 局所保存則に表面張力が必要な理由

線形模型で $K=\rho\int_{-h}^0|\nabla\phi|^2dz/2$、$p'=-\rho\phi_t$、$p'(0)=\rho g\eta-\gamma\eta_{xx}$、$\phi_z(-h)=0$、$\phi_z(0)=\eta_t$ とする。$\partial_tK$ を発散形にし、$\mathscr E$ と $\mathscr J$ の局所保存則を再導出せよ。

- Level: B

<!-- solution-start -->
#### 詳細解答

内部の $\phi_{xx}+\phi_{zz}=0$ を用い、積の微分により

$$
\rho\nabla\phi\cdot\nabla\phi_t
=\rho\nabla\cdot(\phi_t\nabla\phi)
=-\partial_x(p'\phi_x)-\partial_z(p'\phi_z).
$$

深さ積分して両端を評価すると

$$
\partial_tK+\partial_x\int_{-h}^0p'\phi_x\,dz
+p'(0)\eta_t=0
$$

を得る。水面の圧力を代入して、重力項は $\rho g\eta\eta_t=\partial_t(\rho g\eta^2/2)$。毛管項は

$$
-\gamma\eta_{xx}\eta_t
=-\partial_x(\gamma\eta_x\eta_t)
+\partial_t(\gamma\eta_x^2/2).
$$

従って[保存則](#thm-fluid28-local-energy)の通り

$$
\partial_t\left(K+\frac{\rho g\eta^2}{2}
+\frac{\gamma\eta_x^2}{2}\right)
+\partial_x\left(\int_{-h}^0p'\phi_x\,dz-\gamma\eta_x\eta_t\right)=0.
$$

底面で $\phi_z=0$ を使わないと、底面を通る仕事率が残り、同じ式にはならない。
<!-- solution-end -->

### B2. 流束を分けて群速度に一致させる

$q=kh>0$、$r=\gamma k^2/(\rho g)\ge0$ の単色波について、$J_p/(\mathcal E c_p)$、$J_\gamma/(\mathcal E c_p)$ を求め、合計を群速度と比較せよ。

- Level: B

<!-- solution-start -->
#### 詳細解答

[流束の定理](#thm-fluid28-energy-transport)の積分式を用いると、$\langle\cos^2\theta\rangle=\langle\sin^2\theta\rangle=1/2$ なので

$$
J_p=\frac{\rho a^2\omega^3}{4k^2}\coth q(1+S),\qquad
J_\gamma=\frac{\gamma a^2k\omega}{2}.
$$

分散式 $\omega^2\coth q=k(g+\gamma k^2/\rho)$ と $\mathcal E=a^2(\rho g+\gamma k^2)/2$ を使い

$$
\frac{J_p}{\mathcal E c_p}=\frac{1+S}{2},
\qquad \frac{J_\gamma}{\mathcal E c_p}=\frac{r}{1+r}.
$$

したがって

$$
\frac{J_p+J_\gamma}{\mathcal E c_p}
=\frac{1+S}{2}+\frac{r}{1+r}
=\frac12\left(\frac{1+3r}{1+r}+S\right).
$$

右辺は[有限水深の重力・毛管波の群速度](#thm-fluid28-finite-depth-group)の $c_g/c_p$ なので、$J=\mathcal E c_g$。$\gamma>0$ で張力仕事を消すと比は $r/(1+r)$ だけ不足する。
<!-- solution-end -->

### B3. 狭帯域の誤差を評価する

$k_0>0$ の近傍で $\omega\in C^2$ とし、$k_\pm=k_0\pm\delta k/2>0$ とする。差商 $v_{\rm beat}=(\omega(k_+)-\omega(k_-))/\delta k$ と $c_g(k_0)$ の差に、区間 $[k_-,k_+]$ の $\sup|\omega''|$ を使った上界を与えよ。

- Level: B

<!-- solution-start -->
#### 詳細解答

微積分の基本定理を $[k_-,k_+]$ へ適用すると

$$
v_{\rm beat}
=\frac1{\delta k}\int_{k_-}^{k_+}\omega'(s)\,ds.
$$

従って $M=\sup_{s\in[k_-,k_+]}|\omega''(s)|<\infty$ とおけば

$$
\begin{aligned}
|v_{\rm beat}-\omega'(k_0)|
&\le\frac1{\delta k}\int_{k_-}^{k_+}
|\omega'(s)-\omega'(k_0)|\,ds\\
&\le\frac M{\delta k}\int_{-\delta k/2}^{\delta k/2}|q|\,dq
=\frac{M\delta k}{4}.
\end{aligned}
$$

ここで $\omega'$ に平均値の定理を適用して $|\omega'(s)-\omega'(k_0)|\le M|s-k_0|$ とした。$\delta k\to0$ で差は零となる。ただし固定した有限の $\delta k$ で必ず等しいとはいえない。
<!-- solution-end -->

### B4. 深水で圧力流束だけを採用した場合のずれ

$kh\gg1$ の深水極限を取り、$r=\gamma k^2/(\rho g)$ は有限で非負とする。$J_p/\mathcal E$ と $c_g$ を比較し、$r=0$、$r=1$、$r\gg1$ で不足分を示せ。

- Level: B

<!-- solution-start -->
#### 詳細解答

$q\to\infty$ では $S\to0$。従って[平均波エネルギー流束と群速度](#thm-fluid28-energy-transport)から

$$
\frac{J_p}{\mathcal E}\to\frac{c_p}{2},
\qquad
c_g\to c_p\left(\frac12+\frac{r}{1+r}\right).
$$

差は $\Delta=c_g-J_p/\mathcal E=c_pr/(1+r)$。$r=0$ で $\Delta=0$、$r=1$ で $\Delta=c_p/2$、$r\gg1$ では $\Delta\simeq c_p$。この不足は[界面流束](#thm-fluid28-local-energy) $J_\gamma/\mathcal E$ と等しく、張力を含む模型で圧力だけの仕事率を使ったことが原因である。
<!-- solution-end -->

### Level C

### C1. 毛管と重力が同程度の有限水深波

$\rho,g,\gamma>0$ とし、$k=\sqrt{\rho g/\gamma}$、$h=1/k$、$a>0$ は $ka\ll1$ とする。以下を一つの模型として計算せよ。

1. $q,r,\omega,c_p,c_g/c_p$ を求める。
2. $\mathcal E$ とその運動・重力・毛管の各成分を求める。
3. $J_p$ と $J_\gamma$ のそれぞれを $\mathcal E c_p$ で割り、$J/\mathcal E=c_g$ を確認する。
4. $k_\pm=k(1\pm\varepsilon/2)$、$0<\varepsilon\ll1$ の近接波で包絡の速度がどこへ収束するか説明する。
5. 表面張力による流束だけを捨てると、どの比がどれだけ誤るか示す。

- Level: C

<!-- solution-start -->
#### 詳細解答

1. $kh=1$、$\gamma k^2=\rho g$ より $q=r=1$。分散式へ代入すると

$$
\omega^2=(gk+gk)\tanh1=2gk\tanh1,
\qquad c_p=\sqrt{\frac{2g\tanh1}{k}}.
$$

[有限水深の重力・毛管波の群速度](#thm-fluid28-finite-depth-group)で $(1+3r)/(1+r)=4/2=2$ だから

$$
\frac{c_g}{c_p}
=\frac12\left(2+\frac{2}{\sinh2}\right)
=1+\frac1{\sinh2}.
$$

2. [平均エネルギー](#prop-fluid28-wave-energy)に $\gamma k^2=\rho g$ を入れて

$$
\mathcal E=\frac{a^2}{2}(2\rho g)=\rho ga^2.
$$

平均重力エネルギーは $\rho ga^2/4$、平均毛管エネルギーも $\rho ga^2/4$、運動エネルギーは $\rho ga^2/2$。合計は $\rho ga^2$ になる。

3. $S=2/\sinh2$ を[平均波エネルギー流束と群速度](#thm-fluid28-energy-transport)に代入する。

$$
\frac{J_p}{\mathcal E c_p}
=\frac12\left(1+\frac2{\sinh2}\right)
=\frac12+\frac1{\sinh2},
\qquad
\frac{J_\gamma}{\mathcal E c_p}=\frac12.
$$

従って

$$
\frac{J}{\mathcal E c_p}
=\left(\frac12+\frac1{\sinh2}\right)+\frac12
=1+\frac1{\sinh2}
=\frac{c_g}{c_p}.
$$

4. $\delta k=k_+-k_-=k\varepsilon$、$k_\pm>0$ である。二波の積表示から $v_{\rm beat}=(\omega(k_+)-\omega(k_-))/(k\varepsilon)$。$\omega$ は $k>0$ で滑らかなので $\varepsilon\to0^+$ では[包絡速度命題](#prop-fluid28-beat-envelope)により $v_{\rm beat}\to c_g(k)$。これは有限の $\varepsilon$ で速度が厳密一致するという主張ではない。

5. $J_\gamma$ を捨てれば $J_p/\mathcal E c_p=1/2+1/\sinh2$ だけが残り、正しい $c_g/c_p=1+1/\sinh2$ から**ちょうど $1/2$**（速度では $c_p/2$）不足する。毛管エネルギーの寄与と界面仕事の流束を同時に考えることが重要である。
<!-- solution-end -->

## まとめ

[分散関係](../FLUID27/index.md#thm-fluid27-dispersion)の傾き $d\omega/dk$ は、狭帯域の包絡が移動する群速度である。さらにこの線形自由表面模型では、運動・重力・毛管の二次エネルギーと、圧力仕事・界面張力仕事の**両方**を含む流束を導けば $J=\mathcal E c_g$ が厳密に成り立つ。山の速度 $c_p$、包絡の速度 $c_g$、水粒子の速度はそれぞれ異なる量である。