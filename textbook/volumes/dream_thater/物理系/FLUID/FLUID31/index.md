# FLUID31 密度成層内ではどんな波が生まれるか

[FLUID2 の静水圧方程式](../FLUID2/index.md#thm-fluid2-hydrostatic-balance)は、密度が高さで変わっても静止する流体の圧力を決める。[FLUID29 の浅水方程式](../FLUID29/index.md#thm-fluid29-shallow-water)では、自由表面の上下運動が波を生んだ。しかし湖や海の内部では、水面がほぼ動かなくても密度の異なる層が上下に変位する。**戻そうとする浮力が内部で伝わる波**を、質量保存と運動量保存から導きたい。

本講は非回転・非粘性・非拡散の流体を扱い、背景は静止、重力は一定とする。密度差の小さい連続成層に適した Boussinesq 近似を導入する。自由表面波、界面で密度が不連続な二層波、地球回転を伴う波とは仮定を分ける。

## 0. 上下の符号を固定する

水平座標を $x$、鉛直上向きを $z$、時刻を $t$ とし、重力加速度は $-g e_z$、$g>0$ [m/s$^2$] である。流速は $(u,w)$ [m/s]、密度は $\rho$ [kg/m$^3$]、圧力は $p$ [Pa]。背景の密度 $\bar\rho(z)>0$ と静水圧 $\bar p(z)$ は

$$
\frac{d\bar p}{dz}=-g\bar\rho(z)
$$

を満たす。これは[静水圧の局所釣合](../FLUID2/index.md#thm-fluid2-hydrostatic-balance)で水平一様な密度を選んだ結果である。密度勾配 $\bar\rho'(z)<0$ は**上ほど軽い**ことを意味する。

背景量の $\bar\rho'(z)$ は $d\bar\rho/dz$ と同じ $z$ による通常の微分で、後に使う擾乱 $\rho'$ とは異なる。

$\partial_t,\partial_x,\partial_z$ は他の独立変数を固定した偏微分である。例えば、$f_t=\partial_t f$ と $f_{xz}=\partial_z\partial_x f$ は同じ意味の略記である。粒子変位 $\xi(t)$ の $d/dt$ は、位置を固定した偏微分と区別する。

## 1. 密度の差をどこまで無視できるか

可変密度の非粘性流体では、[CTM7 の局所運動量方程式](../../CTM/CTM7/index.md#thm-ctm7-material-momentum)に流体の等方応力 $\sigma=-pI$ と下向き重力を代入する。各粒子の密度が保たれ、流れが非圧縮（$\partial_xu+\partial_zw=0$）であるとき、密度移流と Euler の運動方程式は

$$
\partial_t\rho+u\partial_x\rho+w\partial_z\rho=0,
\qquad
\rho\bigl(\partial_t\boldsymbol v+\boldsymbol v\cdot\nabla\boldsymbol v\bigr)
=-\nabla p-\rho g e_z
$$

となる。ただし $\boldsymbol v=(u,w)$、$\nabla=(\partial_x,\partial_z)$。密度が一定でなければ非圧縮ではない、という推論は誤りである。各粒子の密度は一定でも、別の粒子は別の密度を持ち得る。

ここで密度を $\rho=\bar\rho(z)+\rho'(x,z,t)$、圧力を $p=\bar p(z)+p'(x,z,t)$ と分ける。$\rho'$ は**背景との差**であって鉛直微分ではない（両者が紛らわしい箇所は $d\bar\rho/dz$ と書く）。背景の静水圧を差し引けば

$$
\rho\bigl(\partial_t\boldsymbol v+\boldsymbol v\cdot\nabla\boldsymbol v\bigr)
=-\nabla p'-\rho' g e_z
$$

となる。右辺の浮力には背景との差が残る。一方、左辺の慣性に入る密度は、密度差が小さいとき一定の参照密度 $\rho_0>0$ で近似できる。この**慣性と浮力を非対称に近似すること**が重要である。

<a id="def-fluid31-boussinesq"></a>

<!-- formal-statement-start -->
> **定義（本講の Boussinesq 近似）**  
> 代表長さ $L>0$、速度 $U>0$、参照密度 $\rho_0>0$ を定め、流体領域内の背景密度差と擾乱密度差が $\rho_0$ より十分小さいとする。流体は各粒子の密度を運び、非圧縮、非粘性・非拡散、重力は $-ge_z$ とする。慣性項および圧力の換算では $\rho$ を $\rho_0$ に置き換えるが、重力の擾乱には $-\rho'g$ を残す近似を本講の Boussinesq 近似と呼ぶ。密度差の比を $\varepsilon=\Delta\rho/\rho_0\ll1$ とすると、浮力を速度変化に対して無視しない尺度では

$$
\frac{g\varepsilon L}{U^2}=O(1)
$$

> と置く。この尺度選択は密度差の小ささだけから自動的には従わない。
<!-- formal-statement-end -->

<!-- definition-example-start: def-fluid31-boussinesq -->
**定義の確認**：$L=100$ m、$U=0.1$ m/s、密度差の比 $\varepsilon=10^{-5}$、$g=10$ m/s$^2$ とすれば、$\varepsilon\ll1$ かつ $g\varepsilon L/U^2=1$。慣性に使う密度の誤差は相対的に小さくても、浮力は速度変化と同じ尺度である。$\varepsilon$ だけを見て浮力まで捨てると、この釣合が失われる。
<!-- definition-example-end -->

密度が激しく変化する界面、音波、回転による Coriolis 力、分子拡散、背景流の剪断はこの模型の範囲外に置く。小さい密度差であっても音速・圧縮性が重要なら本近似は使えない。

## 2. 成層の強さを一つの数にする

高さ方向の小さな位置変化 $\xi$ [m] で粒子を上下させる。周囲の背景密度は $\bar\rho(z+\xi)=\bar\rho(z)+\xi\,d\bar\rho/dz+o(\xi)$。粒子は自分の密度を保つので、移動先の周囲との差は一次まで

$$
\rho'_{\rm parcel}
=\bar\rho(z)-\bar\rho(z+\xi)
\simeq-\xi\,\frac{d\bar\rho}{dz}.
$$

粒子が受ける密度差による鉛直加速度は $-g\rho'_{\rm parcel}/\rho_0$。この鉛直加速度を上向き正の量 $b$ [m/s$^2$] で表すと、上向き変位が復元されるかを符号で読める。以下でその量の名称と定義を固定する。

<a id="def-fluid31-buoyancy"></a>

<!-- formal-statement-start -->
> **定義（浮力加速度）**  
> 参照密度 $\rho_0>0$、重力 $g>0$ の Boussinesq 流体に対し、背景からの密度差 $\rho'$ [kg/m$^3$] を用い、

$$
b=-\frac{g\rho'}{\rho_0}
$$

> を鉛直上向きを正とする浮力加速度と定義する。軽い擾乱 $\rho'<0$ には $b>0$、重い擾乱には $b<0$ が対応する。
<!-- formal-statement-end -->

<!-- definition-example-start: def-fluid31-buoyancy -->
**定義の確認**：$\rho_0=1000$ kg/m$^3$、$g=10$ m/s$^2$、$\rho'=-0.2$ kg/m$^3$ なら $b=-10(-0.2)/1000=0.002$ m/s$^2$。密度差が参照密度の $2\times10^{-4}$ にすぎないこと、浮力の符号が上向きであること、単位が加速度であることを別々に確認した。
<!-- definition-example-end -->

密度勾配の符号は場所により変わり得る。どこで復元力が存在するかを示すため、勾配に重力を掛けて時間の二乗の逆数に直す。

<a id="def-fluid31-bv-frequency"></a>

<!-- formal-statement-start -->
> **定義（Brunt–Väisälä 周波数の二乗）**  
> 高さ区間で $\bar\rho\in C^1$、$\rho_0,g>0$ とするとき、成層強度を

$$
N^2(z)=-\frac{g}{\rho_0}\frac{d\bar\rho}{dz}(z)
$$

> と定義する。単位は s$^{-2}$ である。$N^2(z)>0$ の場合に限って正の平方根 $N(z)=\sqrt{N^2(z)}$ [s$^{-1}$] を **Brunt–Väisälä 周波数**（浮力振動数）と呼ぶ。$N^2<0$ のときは実数の振動数 $N$ を定義しない。
<!-- formal-statement-end -->

<!-- definition-example-start: def-fluid31-bv-frequency -->
**定義の確認**：狭い高さ区間 $|z|\le250$ m で

$$
\bar\rho(z)=\rho_0(1-\alpha z),\qquad
\alpha=4.0\times10^{-5}\ {\rm m}^{-1},\quad g=10\ {\rm m/s^2}
$$

とする。この区間では $1-\alpha z\ge0.99>0$、両端間の背景密度差は $\rho_0$ の $2\%$ である。勾配 $d\bar\rho/dz=-\rho_0\alpha$ を[成層強度の定義](#def-fluid31-bv-frequency)へ代入すると

$$
N^2=-\frac g{\rho_0}(-\rho_0\alpha)
=g\alpha=4.0\times10^{-4}\ {\rm s^{-2}},\qquad
N=\sqrt{N^2}=0.020\ {\rm s^{-1}}.
$$

逆に $\alpha<0$ にすると同じ式は $N^2<0$ を与え、安定成層とは呼べない。
<!-- definition-example-end -->

## 3. 水柱を揺らすとどうなるか

周囲の流れや圧力擾乱を無視できる**局所的な粒子の浮力試験**では、粒子を追う鉛直変位 $\xi(t)$ に対して $\xi_{tt}=d^2\xi/dt^2=b$ と置く。これは内部波を記述する完全な流体方程式ではなく、成層の符号を調べる試験である。

<a id="prop-fluid31-parcel"></a>

<!-- formal-statement-start -->
> **命題（局所浮力試験）**  
> 静止背景の高さ近傍で $g,\rho_0>0$ と $\bar\rho'(z_0)$ を一定とみなし、粒子は密度を保ち、圧力擾乱と周辺流れの力を無視する。十分小さい変位 $\xi$ は一次まで

$$
\frac{d^2\xi}{dt^2}+N^2(z_0)\xi=0
$$

> を満たす。$N^2>0$ なら角振動数 $N$ の有界振動、$N^2=0$ なら $\xi=\xi_0+v_0t$、$N^2<0$ なら成長する指数解が存在する。
<!-- formal-statement-end -->

### 証明の見取り図

移動先と元の密度の差を $-\xi\bar\rho'$ で近似し、浮力の定義へ入れる。符号の違いが微分方程式の解を分ける。

<!-- proof-start -->
### 証明

移動先の背景密度との差を一次まで取ると $\rho'_{\rm parcel}=-\xi\bar\rho'$ となる。この密度差を[浮力加速度の定義](#def-fluid31-buoyancy)に代入すると

$$
b=-\frac g{\rho_0}(-\xi\bar\rho')
=\frac g{\rho_0}\bar\rho'\xi
=-N^2\xi.
$$

加速度 $\xi_{tt}$ と等置して結論の方程式を得る。$N^2>0$ なら正の平方根 $N$ を用いた一般解は

$$
\xi(t)=C\cos Nt+D\sin Nt.
$$

$N^2=0$ なら $\xi_{tt}=0$ を二回積分して

$$
\xi(t)=\xi_0+v_0t.
$$

$N^2=-\sigma^2<0$（$\sigma>0$）なら特性方程式 $r^2-\sigma^2=0$ の根は $r=\pm\sigma$ なので

$$
\xi(t)=C e^{\sigma t}+D e^{-\sigma t}.
$$

$C\ne0$ の場合、増大する指数項が存在する。
<!-- proof-end -->

**圧力の役割**：この粒子試験から、空間中の波も必ず振動数 $N$ であるとは結論できない。流体は非圧縮条件を同時に満たす必要があり、圧力が水平方向・鉛直方向の速度を結び付ける。

## 4. 圧力と浮力を残して線形化する

背景は静止し、$N^2>0$ が一定となる**有限の高さ区間**をとる。2次元の局所模型として自由表面・底面境界の影響をいったん除き、後で境界のない平面波（または周期的な**擾乱**）を考える。背景密度勾配が一定で、区間内の密度差の相対値が小さいと仮定する。勾配が非零の線形背景密度を鉛直無限遠まで延長すると、どこかで密度が負になるため、無限領域の厳密な物理背景とは解釈しない。

密度移流式へ $\rho=\bar\rho+\rho'$ を入れると

$$
\partial_t\rho'+u\partial_x\rho'+w\partial_z\rho'
+w\frac{d\bar\rho}{dz}=0.
$$

$\pi=p'/\rho_0$ [m$^2$/s$^2$] と置く。背景状態からの小さな擾乱で速度・$\rho'$ を一次の微小量とみなすと、積 $u\partial_x\rho'$、$w\partial_z\rho'$ と速度の二次移流は二次の項として落ちる。

<a id="thm-fluid31-linear-system"></a>

<!-- formal-statement-start -->
> **定理（非回転 Boussinesq 成層流体の線形方程式）**  
> 2次元の非粘性・非拡散 Boussinesq 近似で、背景流速は零、$g,\rho_0>0$ は一定、$\bar\rho'(z)$ は一定で $N^2=-g\bar\rho'/\rho_0$ とする。小振幅の一次擾乱 $(u,w,\pi,b)$ は

$$
\boxed{\begin{aligned}
\partial_tu&=-\partial_x\pi,\\
\partial_tw&=-\partial_z\pi+b,\\
\partial_tb+N^2w&=0,\\
\partial_xu+\partial_zw&=0
\end{aligned}}
$$

> を満たす。ただし $\pi=p'/\rho_0$、$b=-g\rho'/\rho_0$ とする。
<!-- formal-statement-end -->

### 証明の見取り図

密度を背景と擾乱に分け、静水圧の釣合を引く。最後に、密度移流から $b_t$ と $w$ の関係を得る。

<!-- proof-start -->
### 証明

背景の[静水圧方程式](../FLUID2/index.md#thm-fluid2-hydrostatic-balance)を差し引いた運動方程式で、$\rho$ を $\rho_0$ と近似する。速度について二次の $\boldsymbol v\cdot\nabla\boldsymbol v$ を落とすと

$$
\rho_0\partial_t\boldsymbol v=-\nabla p'-\rho'g e_z.
$$

$\rho_0$ で割り、$\pi=p'/\rho_0$、[浮力](#def-fluid31-buoyancy) $b=-g\rho'/\rho_0$ を代入して水平・鉛直の第1、2式を得る。

密度移流の一次部分は $\rho'_t+w\bar\rho'=0$。両辺に $-g/\rho_0$ を掛けて

$$
-\frac g{\rho_0}\rho'_t-\frac g{\rho_0}\bar\rho' w=0
\quad\Longrightarrow\quad
b_t+N^2w=0.
$$

最後の式は仮定した非圧縮条件である。速度の小振幅性は対流項を落とすために使ったが、背景勾配と $w$ の積は一次なので落とさない。
<!-- proof-end -->

## 5. 空間を伝わる内部重力波を導く

波の形を一様な平面波として調べる前に、線形方程式から $w$ だけの式を取り出す。圧力を消去する操作は、非圧縮の拘束を使うため、単一粒子の振動にはなかった段階である。

<a id="thm-fluid31-dispersion"></a>

<!-- formal-statement-start -->
> **定理（2次元内部重力波の分散関係）**  
> [線形 Boussinesq 方程式](#thm-fluid31-linear-system)で一定 $N^2>0$、非回転・非粘性、水平・鉛直に平面波を置ける領域を仮定する。実波数 $k\ne0$ [m$^{-1}$]、$m$ [m$^{-1}$] に対して、零でない鉛直速度をもつ振動解

$$
w(x,z,t)=A\cos(kx+mz-\omega t),\qquad A\ne0
$$

> が存在するための分散関係は

$$
\boxed{\omega^2=N^2\frac{k^2}{k^2+m^2}.}
$$

> 正周波数では $0<\omega\le N$ であり、$m=0$ のとき等号が成立する。$k=0,m\ne0$ では非圧縮条件により波としての鉛直速度は零となる。
<!-- formal-statement-end -->

### 証明の見取り図

水平・鉛直の運動方程式を交差微分して圧力を消す。非圧縮条件で鉛直速度の Laplacian を作り、浮力の時間発展を代入する。

<!-- proof-start -->
### 証明

[線形方程式](#thm-fluid31-linear-system)で水平運動式を $z$ 微分し、鉛直運動式を $x$ 微分して差を取る。$\pi$ の混合偏微分は滑らかさにより交換可能なので、鉛直渦度に相当する量 $\zeta=w_x-u_z$ は

$$
\partial_t\zeta
=\partial_x(-\pi_z+b)-\partial_z(-\pi_x)
=\partial_x b
$$

を満たす。さらに $\partial_xu=-\partial_zw$ を $z$ 微分すれば $u_{xz}=-w_{zz}$。従って

$$
\partial_x\zeta=w_{xx}-u_{zx}
=w_{xx}+w_{zz}=\nabla^2w.
$$

最初の式をさらに $x$ 微分したうえで時間微分すると

$$
\partial_t^2\nabla^2w
=\partial_x^2\partial_t b
=-N^2\partial_x^2w.
$$

ここで $w=A\cos\theta$、$\theta=kx+mz-\omega t$ を代入する。$\nabla^2w=-(k^2+m^2)w$、$w_{tt}=-\omega^2w$、$w_{xx}=-k^2w$ だから

$$
\omega^2(k^2+m^2)w-N^2k^2w=0.
$$

$A\ne0$ で $w$ は恒等的に零でないため $\omega^2=N^2k^2/(k^2+m^2)$ を得る。逆に、$k\ne0$ とこの関係を満たせば次節で示す $u,b,\pi$ を作れて連立系を満たすため、存在の必要十分性も確認できる。$k\ne0$ では $0<k^2/(k^2+m^2)\le1$。$k=0,m\ne0$ の場合も同じ余弦形の平面波 $w=A\cos(mz-\omega t)$ を考える。これに対応する水平速度は $x$ に依存しないので、非圧縮条件は $0+\partial_z w=-mA\sin(mz-\omega t)=0$。$m\ne0$ より $A=0$ となり、本定理の非零鉛直波から外れる。
<!-- proof-end -->

**周波数の例**：$N=0.020$ s$^{-1}$、$k=0.003$ m$^{-1}$、$m=0.004$ m$^{-1}$ なら

$$
\sqrt{k^2+m^2}=0.005\ {\rm m^{-1}},\qquad
\omega=0.020\frac{0.003}{0.005}=0.012\ {\rm s^{-1}}.
$$

周期は $T=2\pi/\omega\simeq523.6$ s。鉛直波長は $2\pi/|m|\simeq1571$ m であり、周波数 $N$ をそのまま角振動数に選べない。上下に壁がある有限水深では、境界条件により許される $m$ が離散的になる。本講の任意実数 $m$ の式を、壁付きのすべてのモードの存在条件と混同しない。

## 6. 密度面は速度とどの位相で動くか

一つの $w$ が決まれば残りの成分も好きに選べるわけではない。非圧縮条件が水平速度を、浮力の移流が密度擾乱を決める。密度面の変位を位置 $(x,z)$ と時刻 $t$ の場 $\xi(x,z,t)$ で表す。粒子を追う変位の時間変化は鉛直速度であり、$\partial_t\xi+u\partial_x\xi+w\partial_z\xi=w$。小振幅では移流項は二次なので、一次まで $\xi_t=\partial_t\xi=w$ となる。先の単一粒子の $d\xi(t)/dt$ と異なり、$\xi_t$ は空間位置を固定した偏微分である。

<a id="prop-fluid31-polarization"></a>

<!-- formal-statement-start -->
> **命題（内部波の速度・浮力・圧力の位相関係）**  
> 一定 $N>0$、$k>0$、$m\in\mathbb R$、$A\in\mathbb R$ に対し、$\omega=Nk/\sqrt{k^2+m^2}>0$、$\theta=kx+mz-\omega t$ と置く。鉛直速度 $w=A\cos\theta$ に対応する線形系の実数解は

$$
\boxed{\begin{aligned}
u&=-\frac mk A\cos\theta,\\
b&=\frac{N^2}{\omega}A\sin\theta,\\
\pi&=-\frac{\omega m}{k^2}A\cos\theta,\\
\xi&=-\frac A\omega\sin\theta
\end{aligned}}
$$

> である。$\xi_t=w$、$b=-N^2\xi$ を満たし、任意の初期値に由来する定常成分はここでは加えない。
<!-- formal-statement-end -->

### 証明の見取り図

波数 $(k,m)$ と速度 $(u,w)$ の直交性から $u$ を決め、浮力方程式を時間積分する。水平運動式から圧力を求め、鉛直式も満たすか分散関係で確かめる。

<!-- proof-start -->
### 証明

$\partial_x u+\partial_z w=0$ で $\partial_z w=-mA\sin\theta$ なので、同じ $\cos\theta$ 型の水平速度は $u=-(m/k)A\cos\theta$ となる。$b_t=-N^2w$ と $\partial_t\sin\theta=-\omega\cos\theta$ より $b=(N^2/\omega)A\sin\theta$。変位は $\xi_t=w$ を積分し $\xi=-(A/\omega)\sin\theta$ と選ぶので $b=-N^2\xi$。

水平運動式で

$$
u_t=-\frac{m\omega}{k}A\sin\theta,
\qquad
-\pi_x=-\frac{m\omega}{k}A\sin\theta
$$

となる $\pi$ は表示式のとおり。鉛直運動式の左辺と右辺はそれぞれ

$$
w_t=\omega A\sin\theta,\qquad
-\pi_z+b=
\left(-\frac{\omega m^2}{k^2}+\frac{N^2}{\omega}\right)A\sin\theta.
$$

[分散関係](#thm-fluid31-dispersion)を $N^2/\omega=\omega(k^2+m^2)/k^2$ と書き直すと括弧は $\omega$。よって四式すべてを満たす。
<!-- proof-end -->

**例**：$k=3$、$m=4$（共通の逆長さ単位）なら速度振幅は $u/w=-4/3$。波数ベクトルと速度ベクトルの内積は $3(-4/3)+4=0$。密度面の変位は $w$ と四分の一周期ずれている。変位が最大の瞬間には鉛直速度が零になり、その後に戻り始める。

## 7. 波のエネルギーはどちらへ進むか

成層が安定なとき、浮力擾乱にも「ばね」に相当する正のエネルギーがある。これを含めないと、圧力がする仕事と浮力がする仕事の収支が閉じない。

<a id="thm-fluid31-energy"></a>

<!-- formal-statement-start -->
> **定理（線形内部波のエネルギー保存）**  
> 一定 $N^2>0$ の[線形方程式](#thm-fluid31-linear-system)を満たす十分滑らかな実数場 $(u,w,\pi,b)$ に対し、

$$
E=\frac12(u^2+w^2)+\frac{b^2}{2N^2},
\qquad
\boldsymbol F=\pi(u,w)
$$

> と置けば、単位質量当たりの局所的な保存則

$$
\boxed{\partial_t E+\partial_x(\pi u)+\partial_z(\pi w)=0}
$$

> が成立する。$E\ge0$、単位は m$^2$/s$^2$。密度 $\rho_0$ を掛ければ単位体積当たりのエネルギーとなる。
<!-- formal-statement-end -->

### 証明の見取り図

水平式に $u$、鉛直式に $w$ を掛けて足す。浮力式に $b/N^2$ を掛けると、浮力と速度の仕事が打ち消し合う。

<!-- proof-start -->
### 証明

運動方程式を速度と内積にすると

$$
\partial_t\frac{u^2+w^2}{2}
=-u\pi_x-w\pi_z+bw.
$$

非圧縮条件 $u_x+w_z=0$ により積の微分は

$$
u\pi_x+w\pi_z
=\partial_x(\pi u)+\partial_z(\pi w)-\pi(u_x+w_z)
=\nabla\cdot(\pi\boldsymbol v).
$$

一方、$b_t=-N^2w$ と $N^2>0$ の一定性から

$$
\partial_t\frac{b^2}{2N^2}
=\frac b{N^2}b_t=-bw.
$$

両式を足すと $+bw$ と $-bw$ が相殺し、主張の保存則を得る。$N^2>0$ が正値性の理由であり、$N^2<0$ へ同じ正エネルギーの議論を流用できない。
<!-- proof-end -->

位相と異なり、**波束のエネルギーの進む方向**は群速度で調べられる。[FLUID28 の群速度](../FLUID28/index.md#def-fluid28-group-velocity)は1次元で $d\omega/dk$ と定義された。2次元では、近い波数 $(k+\delta k,m+\delta m)$ を重ねた包絡の位相差が一次まで $\delta k\,x+\delta m\,z-(\partial_k\omega\,\delta k+\partial_m\omega\,\delta m)t$ となる。したがってその位相差は速度 $(\partial_k\omega,\partial_m\omega)$ で移動し、これを2次元の群速度とする。ここでは $k>0$ の正周波数枝を使い、各偏微分では他方の波数を固定する。

<a id="prop-fluid31-group"></a>

<!-- formal-statement-start -->
> **命題（内部重力波の群速度と波数の直交）**  
> 非回転・非粘性の一定 $N>0$ で、$k>0$、$m\in\mathbb R$、$\omega=Nk/\sqrt{k^2+m^2}$ とする。群速度 $\boldsymbol c_g=(\partial_k\omega,\partial_m\omega)$ は

$$
\boxed{
\boldsymbol c_g=\frac{N}{(k^2+m^2)^{3/2}}(m^2,-km),
\qquad
k c_{gx}+m c_{gz}=0.
}
$$

> さらに前節の平面波を一周期平均したエネルギー流束は $\langle\boldsymbol F\rangle=\boldsymbol c_g\langle E\rangle$ に等しい。
<!-- formal-statement-end -->

### 証明の見取り図

分散式を波数で微分して直交性を得る。平均輸送の主張は位相関係を代入し、$\langle\cos^2\theta\rangle=1/2$ で検算する。

<!-- proof-start -->
### 証明

$K=(k^2+m^2)^{1/2}$ とし、$K_k=k/K$、$K_m=m/K$ だから

$$
\partial_k\omega=N\left(\frac1K-\frac{k^2}{K^3}\right)
=\frac{Nm^2}{K^3},\qquad
\partial_m\omega=-\frac{Nkm}{K^3}.
$$

内積は $N(km^2-mkm)/K^3=0$。次に[位相関係](#prop-fluid31-polarization)から

$$
\langle E\rangle
=\frac{A^2}{4}\left(1+\frac{m^2}{k^2}+\frac{N^2}{\omega^2}\right)
=\frac{A^2K^2}{2k^2}
$$

を得る。最後の等号では $N^2/\omega^2=K^2/k^2$ を使った。圧力と速度はともに $\cos\theta$ を含むので

$$
\langle\boldsymbol F\rangle
=\left(\frac{\omega m^2 A^2}{2k^3},
-\frac{\omega m A^2}{2k^2}\right).
$$

これを $\langle E\rangle$ で割ると $(\omega m^2/(kK^2),-\omega m/K^2)$。$\omega=Nk/K$ を入れて示した $\boldsymbol c_g$ と一致する。
<!-- proof-end -->

先の $k=0.003$ m$^{-1}$、$m=0.004$ m$^{-1}$、$N=0.020$ s$^{-1}$ なら $\boldsymbol c_g=(2.56,-1.92)$ m/s であり、$kc_{gx}+mc_{gz}=0$。位相の等値面は波数に垂直だが、エネルギーは**波数と直交する方向**へ進む。$m>0$ ならこの正周波数枝の鉛直群速度は負である。位相の鉛直進行方向と一致させてはいけない。

## 8. 安定性と近似の境界

1. $N^2>0$：局所浮力試験は復元振動を持ち、平面波の $\omega^2>0$。一定 $N$ の平面波の理論が適用できる。
2. $N^2=0$：復元浮力がなく、上の正値エネルギーの $b^2/(2N^2)$ は使えない。内部重力波としての有限な振動数もない。
3. $N^2<0$：同じ形式の分散式から $k\ne0$ で $\omega^2<0$。成長率は $\sigma=\sqrt{-N^2}|k|/\sqrt{k^2+m^2}$。これは重い流体が上にある場合の線形不安定を示すが、非線形の成長停止や混合の形までは説明しない。

**破れる仮定の例**：$\bar\rho'(z)>0$ を「安定な成層」と誤解すると $N^2<0$ なのに正の実数周波数を選ぶことになる。[粒子試験](#prop-fluid31-parcel)では戻す浮力が逆向きに働き、[エネルギー定理](#thm-fluid31-energy)の正値性も失われる。また $N=N(z)$ の場では、一定係数の平面波を全域で代入した導出をそのまま適用できず、境界条件と空間変化を別に解く必要がある。$k=0$ の退化モードにも非零の鉛直波を捏造してはならない。

## 9. ブラウザ Python ラボ：波数・位相・残差

同じ解析解から波の空間パターン、水平断面の値、分散関係、連立方程式の残差を検算する。$N,k,m,A$ を変えると、周波数、波数と群速度の直交性、密度面の変位振幅が変化する。背景密度の代表高さ差 $500$ m を固定し、$\Delta\rho/\rho_0\simeq N^2(500)/g$ を表示して Boussinesq 近似の目安も確認する。

これは**線形平面波の再構成**であり、流体の非線形 PDE を時間積分する数値シミュレーションではない。標準ライブラリだけでもグラフデータと代数的残差を出力し、`--plot` を付けると同じ解析式による二次元の変位等値線図を Matplotlib で描画する。

```python-file-lab
# lab-id: FLUID31-INTERNAL-WAVE
# lab-title: 成層の内部重力波・位相と分散関係・残差
# lab-file: textbook/volumes/dream_thater/物理系/FLUID/FLUID31/internal_wave_lab.py
# timeout-ms: 15000
# lab-preset: 基準の内部重力波 | --n 0.02 --k 0.003 --m 0.004 --amplitude 0.001
# lab-preset: 鉛直波数を反転 | --n 0.02 --k 0.003 --m -0.004 --amplitude 0.001
# lab-preset: より強い成層 | --n 0.03 --k 0.003 --m 0.004 --amplitude 0.001
# lab-preset: 二次元の変位等値線 | --n 0.02 --k 0.003 --m 0.004 --amplitude 0.001 --plot
```

[Python ソースを閲覧](internal_wave_lab.py)。基準と $m$ の符号反転では $\omega$ は同じだが鉛直群速度の向きが変わる。より大きい $N$ は周期を短くする一方、背景密度差の小ささの条件を悪化させる。

## 10. 演習

特に断らなければ本講の2次元・無回転・非粘性・非拡散 Boussinesq 模型を用い、$z$ は上向き、$g>0$、$\rho_0>0$ とする。数値問題では単位と符号を明示せよ。

### Level A

### A1. 上ほど重い場合の符号

$\rho_0=1000$ kg/m$^3$、$g=10$ m/s$^2$、$d\bar\rho/dz=+0.01$ kg/m$^4$ とする。$N^2$ と局所粒子の運動形を判定せよ。

- Level: A

<!-- solution-start -->
#### 詳細解答

[浮力振動数の定義](#def-fluid31-bv-frequency)に代入して

$$
N^2=-\frac{10}{1000}(0.01)=-10^{-4}\ {\rm s^{-2}}.
$$

負なので実数の $N$ はない。[局所浮力試験](#prop-fluid31-parcel)は $\xi_{tt}-10^{-4}\xi=0$ となる。特性方程式の根は $\pm0.01$ s$^{-1}$ だから、一般解は $C e^{0.01t}+D e^{-0.01t}$。$C\ne0$ の擾乱は増幅する。「上ほど重い」ことが復元力でなく増幅力になる。
<!-- solution-end -->

### A2. 浮力の符号と密度

$g=9.8$ m/s$^2$、$\rho_0=1000$ kg/m$^3$、ある点で $b=-0.0049$ m/s$^2$ とする。密度擾乱 $\rho'$ を求め、粒子が周囲より重いか軽いか述べよ。

- Level: A

<!-- solution-start -->
#### 詳細解答

[浮力加速度](#def-fluid31-buoyancy)の定義 $b=-g\rho'/\rho_0$ で $\rho'=-\rho_0b/g$。従って

$$
\rho'=-\frac{1000(-0.0049)}{9.8}=+0.5\ {\rm kg/m^3}.
$$

符号が正なので背景より重く、$b<0$ は鉛直下向きの加速度である。相対差 $0.5/1000=5\times10^{-4}$ は小さい。
<!-- solution-end -->

### A3. 波数から周期を求める

一定 $N=0.01$ s$^{-1}$、$k=m=0.002$ m$^{-1}$ の内部重力波の正の角振動数、周期を求めよ。

- Level: A

<!-- solution-start -->
#### 詳細解答

[分散関係](#thm-fluid31-dispersion)を用い、$k\ne0$ を確認して

$$
\omega=N\frac{|k|}{\sqrt{k^2+m^2}}
=\frac{0.01}{\sqrt2}\ {\rm s^{-1}}.
$$

周期 $T=2\pi/\omega=200\pi\sqrt2$ s $\simeq888.6$ s。$N$ そのものを振動数に採用せず、鉛直波数の寄与を分母に残す。
<!-- solution-end -->

### A4. 速度の波数直交

$k=3\times10^{-3}$ m$^{-1}$、$m=-4\times10^{-3}$ m$^{-1}$ で鉛直速度の振幅 $A=0.003$ m/s とする。水平速度の振幅係数と、非圧縮条件を確かめよ。

- Level: A

<!-- solution-start -->
#### 詳細解答

[位相関係](#prop-fluid31-polarization)から $u=-(m/k)A\cos\theta=0.004\cos\theta$ m/s、$w=0.003\cos\theta$ m/s。よって

$$
u_x+w_z=-k(0.004)\sin\theta-m(0.003)\sin\theta
=(-0.000012+0.000012)\sin\theta=0\ {\rm s^{-1}}.
$$

水平成分の符号が正になるのは $m<0$ を代入したためである。
<!-- solution-end -->

### A5. 密度差尺度の判定

$g=10$ m/s$^2$、$N=0.04$ s$^{-1}$、背景を比較する鉛直距離が $H=100$ m のとき、一定勾配の背景密度差 $\Delta\rho/\rho_0$ を求めよ。$N=0.4$ s$^{-1}$ にしたら本講の近似はどうなるか。

- Level: A

<!-- solution-start -->
#### 詳細解答

[定義](#def-fluid31-bv-frequency)から $-d\bar\rho/dz\,/\,\rho_0=N^2/g$。距離 $H$ での相対差は $N^2H/g$ だから

$$
\frac{\Delta\rho}{\rho_0}
=\frac{0.04^2\cdot100}{10}=0.016.
$$

$N$ を10倍にすると二乗は100倍で相対差は $1.6$。これは「1より十分小さい」に反するため、この距離で Boussinesq 近似を正当化できない。内部波の数式に代入できることと物理近似が妥当なことは別である。
<!-- solution-end -->

### Level B

### B1. 圧力を消して $w$ の方程式を作る

$u_t=-\pi_x$、$w_t=-\pi_z+b$、$b_t=-N^2w$、$u_x+w_z=0$ を満たす十分滑らかな場について、$\pi$ を消去して $w_{ttxx}+w_{ttzz}+N^2w_{xx}=0$ を示せ。

- Level: B

<!-- solution-start -->
#### 詳細解答

$w_t$ を $x$ 微分、$u_t$ を $z$ 微分して引くと

$$
\partial_t(w_x-u_z)=(-\pi_{zx}+b_x)-(-\pi_{xz})=b_x.
$$

偏微分交換には滑らかさを使った。さらに $u_x=-w_z$ を $z$ 微分すると $u_{xz}=-w_{zz}$ なので

$$
\partial_x(w_x-u_z)=w_{xx}-u_{zx}=w_{xx}+w_{zz}.
$$

最初の等式を $x$ 微分、さらに $t$ 微分して $\partial_t^2(w_{xx}+w_{zz})=(b_t)_{xx}=-N^2w_{xx}$。右辺を左へ移せば結論になる。[分散定理](#thm-fluid31-dispersion)で使う圧力消去を独立に再構成した。
<!-- solution-end -->

### B2. 粒子試験と波の周波数の差

$N>0$、$k>0$、$m=\sqrt3\,k$ の平面波を考える。振動数、鉛直変位と速度の位相差、局所粒子試験の周波数との比を求めよ。

- Level: B

<!-- solution-start -->
#### 詳細解答

[分散関係](#thm-fluid31-dispersion)に $m=\sqrt3\,k$ を代入する。$k>0$ だから

$$
K=\sqrt{k^2+3k^2}=2k,\qquad \omega=N\frac{k}{K}=\frac N2.
$$

鉛直速度を $w=A\cos\theta$ とすれば、[位相関係](#prop-fluid31-polarization)より

$$
\xi=-\frac A\omega\sin\theta,\qquad \frac{\omega}{N}=\frac12.
$$

速度が最大となる位相 $\theta=0$ では変位は零である。速度と変位の極値は四分の一周期だけずれる。[局所粒子試験](#prop-fluid31-parcel)の振動数は $N$ だが、波では圧力と非圧縮条件が空間モードを拘束するので、振動数はその半分になる。
<!-- solution-end -->

### B3. 浮力エネルギーの必要性

一定 $N>0$ の線形方程式について、運動エネルギー密度 $K=(u^2+w^2)/2$ と浮力エネルギー $P=b^2/(2N^2)$ の時間微分をそれぞれ計算し、局所保存則を得よ。

- Level: B

<!-- solution-start -->
#### 詳細解答

[線形方程式](#thm-fluid31-linear-system)から $u_t=-\pi_x$、$w_t=-\pi_z+b$ を掛けて足し、

$$
K_t=uu_t+ww_t=-u\pi_x-w\pi_z+bw
=-\nabla\cdot(\pi\boldsymbol v)+bw.
$$

最後の等式は $\nabla\cdot\boldsymbol v=0$ と積の微分による。一方 $N^2$ は一定なので

$$
P_t=\frac b{N^2}b_t=\frac b{N^2}(-N^2 w)=-bw.
$$

合計して $E_t+\nabla\cdot(\pi\boldsymbol v)=0$。$P$ を忘れると $bw$ が残り、運動エネルギーだけの保存は成立しない。
<!-- solution-end -->

### B4. 群速度の符号と単位

$N=0.020$ s$^{-1}$、$k=0.003$ m$^{-1}$、$m=-0.004$ m$^{-1}$ の正周波数波について群速度を求め、波数との直交性を数値確認せよ。

- Level: B

<!-- solution-start -->
#### 詳細解答

$K=\sqrt{k^2+m^2}=0.005$ m$^{-1}$ であり、[群速度命題](#prop-fluid31-group)から

$$
c_{gx}=0.020\frac{(0.004)^2}{(0.005)^3}=2.56\ {\rm m/s},
\qquad
c_{gz}=-0.020\frac{(0.003)(-0.004)}{(0.005)^3}=1.92\ {\rm m/s}.
$$

負の $m$ により鉛直群速度は正になる。内積は

$$
k c_{gx}+m c_{gz}=0.003(2.56)-0.004(1.92)
=0.00768-0.00768=0\ {\rm s^{-1}}.
$$

これは群速度が波数方向でなく等位相面に沿う向きであることを意味する。
<!-- solution-end -->

### Level C

### C1. 成層模型から内部波とエネルギー輸送まで

有限区間 $|z|\le250$ m で $\bar\rho(z)=\rho_0(1-\alpha z)$、$\alpha=4.0\times10^{-5}$ m$^{-1}$、$g=10$ m/s$^2$ とする。$k=0.003$ m$^{-1}$、$m=0.004$ m$^{-1}$、鉛直速度 $w=A\cos(kx+mz-\omega t)$、$A=0.001$ m/s を置く。

1. 背景密度の正値性と小さい相対差を確認し、$N^2$、正の $\omega$、周期を求めよ。
2. 線形方程式を満たす $u,b,\pi$ と変位 $\xi$ を作り、鉛直運動式を代入で検証せよ。
3. 群速度、平均エネルギー $\langle E\rangle$ と平均流束 $\langle\boldsymbol F\rangle$ を求め、両者の関係を検証せよ。
4. $\alpha$ の符号を反転するとどの結論が破綻するか説明せよ。

- Level: C

<!-- solution-start -->
#### 詳細解答

**1. 背景・振動数**：$|\alpha z|\le0.01$ なので $\bar\rho/\rho_0\in[0.99,1.01]$ で正。高さ幅500 mの密度差は参照密度の $0.02$ であり小さい。[定義](#def-fluid31-bv-frequency)から

$$
N^2=g\alpha=4.0\times10^{-4}\ {\rm s^{-2}},
\quad N=0.020\ {\rm s^{-1}}.
$$

$K=\sqrt{k^2+m^2}=0.005$ m$^{-1}$、[分散関係](#thm-fluid31-dispersion)より $\omega=Nk/K=0.012$ s$^{-1}$、周期 $T=2\pi/0.012\simeq523.60$ s。

**2. 全場の再構成**：$\theta=kx+mz-\omega t$ と書き、[位相命題](#prop-fluid31-polarization)で各係数を求める。

$$
u=-\frac43A\cos\theta,\qquad
b=\frac{0.0004}{0.012}A\sin\theta,\qquad
\pi=-\frac{0.012(0.004)}{0.003^2}A\cos\theta,\qquad
\xi=-\frac A{0.012}\sin\theta.
$$

圧力の係数は $-5.333\ldots A$ [m/s]、浮力の係数は $0.03333\ldots A$ [s$^{-1}$] である。鉛直式を直接計算すると

$$
w_t=\omega A\sin\theta,\qquad
-\pi_z+b=\left(-\frac{\omega m^2}{k^2}+\frac{N^2}{\omega}\right)A\sin\theta.
$$

数値では括弧が $-0.012(16/9)+0.0004/0.012=-0.021333\ldots+0.033333\ldots=0.012$ s$^{-1}$ だから一致する。

**3. エネルギー輸送**：[群速度命題](#prop-fluid31-group)で

$$
\boldsymbol c_g=(2.56,-1.92)\ {\rm m/s},\qquad
\langle E\rangle=\frac{A^2K^2}{2k^2}
=\frac{25}{18}A^2\simeq1.38889\times10^{-6}\ {\rm m^2/s^2}.
$$

従って $\langle\boldsymbol F\rangle=\boldsymbol c_g\langle E\rangle$ は

$$
\langle\boldsymbol F\rangle
=(3.55556,-2.66667)\times10^{-6}\ {\rm m^3/s^3}.
$$

位相場を使って直接 $\langle \pi u\rangle=\omega m^2A^2/(2k^3)$、$\langle\pi w\rangle=-\omega mA^2/(2k^2)$ と計算しても同じ値になる。

**4. 仮定の反転**：$\alpha<0$ なら $N^2=g\alpha<0$。[局所浮力試験](#prop-fluid31-parcel)に復元力はなく、[分散関係](#thm-fluid31-dispersion)の $\omega^2$ は負となる。したがって正の実周波数の波を前提にした位相関係・群速度・正値の[エネルギー定理](#thm-fluid31-energy)を同じ形で使えず、成長モードを調べる問題へ変わる。
<!-- solution-end -->

## 11. まとめ

密度が上ほど小さいとき $N^2>0$ が復元浮力の符号を表す。Boussinesq 近似では密度差を慣性から外すが浮力からは外さず、非圧縮条件を保つ。その条件が圧力を通して粒子の運動を結び付けるため、内部波の振動数は単純に $N$ ではなく、波数の向きに応じた $\omega^2=N^2k^2/(k^2+m^2)$ となる。線形波では速度・浮力・密度面変位の位相が決まり、正のエネルギーの流れは群速度に従う。次は地球回転を加えると何が変わるかを調べる。
