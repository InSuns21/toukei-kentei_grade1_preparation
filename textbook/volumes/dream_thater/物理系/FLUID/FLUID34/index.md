# FLUID34 せん断流はいつ界面を不安定にするか

## 0. 二つの流れの境界はなぜ波打ち始めるか

[FLUID27 の重力・毛管波の分散関係](../FLUID27/index.md#thm-fluid27-dispersion)では、静止した一つの液体と自由表面を調べた。一方、上下の流体が**異なる水平速度**で動くと、波に与えた小さな変位が時間とともに増える場合がある。これを判定するには、流速差だけでなく、界面を平らに戻す重力と表面張力も同じ式で比較する必要がある。

本講の中心問いは「微小な波が時間的に増幅するのは、どの波数・密度・速度差で起きるか」である。波が見えること、位相が流されること、振幅が成長することは互いに異なる。

**模型と範囲**：水平座標を $x$、鉛直上向き座標を $z$、下向き重力加速度の大きさを $g>0$ とする。

上層 $z>0$ は密度 $\rho_1>0$ と水平速度 $U_1$、下層 $z<0$ は密度 $\rho_2>0$ と水平速度 $U_2$ をもつ。背景圧力は静水圧で、界面 $z=0$ の両側で等しい。

両流体は各層で一定密度・非圧縮・非粘性とし、界面 $z=\eta(x,t)$ は物質面で、無限遠の擾乱は減衰する。二層は鉛直方向に半無限、回転・底壁・混合・蒸発を無視し、界面張力 $\sigma\ge0$ は一定とする。

本講では界面の最大勾配が十分小さい時刻に限り、一次の線形化を使う。増幅する波では、この小勾配条件が時間とともに破れ得る。定量的な条件は正規モードを導入した後に示す。

[FLUID31 の成層による復元力](../FLUID31/index.md#prop-fluid31-parcel)と比べると、ここでは連続密度分布でなく**密度の跳び**を考える。

## 1. 界面の波と時間成長率を先に定義する

小さな変位を、一つの水平波数 $k>0$ と複素角周波数 $\omega=\omega_r+i\gamma$ を使って

$$
\eta(x,t)=\operatorname{Re}\{\widehat\eta e^{i(kx-\omega t)}\},\qquad \widehat\eta\ne0
$$

で調べる。ここで $\widehat\eta$ は複素振幅、$\omega_r,\gamma\in\mathbb R$、$\operatorname{Re}$ は実部である。[波数・周波数の意味](../FLUID27/index.md#def-fluid27-wavenumber)に加えて、今回は周波数が複素数である点に注意する。

<a id="def-fluid34-normal-mode"></a>

<!-- formal-statement-start -->
> **定義（界面の正規モードと時間成長率）**  
> 上の形で表される微小擾乱を界面の正規モードとし、$\gamma=\operatorname{Im}\omega$ [s$^{-1}$] を時間成長率とする。$\gamma>0$ を線形不安定、$\gamma<0$ を線形減衰、$\gamma=0$ を（そのモードについて）中立と呼ぶ。本講の非粘性模型では正負の対の根が現れる場合がある。
<!-- formal-statement-end -->

指数を二つに分ければ $e^{i(kx-\omega t)}=e^{\gamma t}e^{i(kx-\omega_rt)}$ である。従って時刻 $t$ の最大振幅は $|\widehat\eta|e^{\gamma t}$、最大勾配は $k|\widehat\eta|e^{\gamma t}$ となる。正規モードの線形近似を適用するには、この時刻の量が $k|\widehat\eta|e^{\gamma t}\ll1$ を満たす必要がある。

<!-- definition-example-start: def-fluid34-normal-mode -->
**定義の確認**：$k=2$ m$^{-1}$、$\widehat\eta=10^{-3}$ m、$\omega=3+0.2i$ s$^{-1}$ を代入すると、実際の界面の変位は

$$
\eta(x,t)=10^{-3}e^{0.2t}\cos(2x-3t)\ {\rm m}.
$$

この式は波数が $k=2>0$ の単一正規モードの形を満たす。時刻 $t=0$ と $t=5$ s の最大絶対振幅を比較すると、それぞれ $10^{-3}$ m と $10^{-3}e$ m である。従って時間成長率は $\gamma=\operatorname{Im}\omega=0.2>0$ s$^{-1}$ で、定義通り線形不安定のモードである。

一方、山など同じ位相を追う点の位置を $x(t)$ と置く。この点は流体粒子そのものとは限らない。[FLUID27 の位相速度の定義](../FLUID27/index.md#def-fluid27-phase-speed)と連鎖律から

$$
0=\frac{d}{dt}\{2x(t)-3t\}
=2\frac{dx}{dt}-3,
\qquad \frac{dx}{dt}=\frac32\ {\rm m/s}.
$$

$dx/dt$ は位相を固定して動かす点の時間微分であり、局所的な振幅増大 $e^{0.2t}$ とは別の量である。比較して $\omega=3$ s$^{-1}$ の場合は $\gamma=0$ で、同じ位相速度でも振幅は一定になる。
<!-- definition-example-end -->

$\gamma=0$ は一般にすべての初期値の有界性を保証する意味での「完全安定」ではない。特に重根や非正規なモードの重ね合わせには別の検討が必要である。

速度差がある場所では、各層の背景速度に沿って動く点が波の位相を異なる速さで見る。$z$ を固定して $x(t)=x_0+U_jt$ と動く点で、任意の滑らかな関数 $f(x,z,t)$ に連鎖律を適用すると

$$
\frac{d}{dt}f(x_0+U_jt,z,t)
=\partial_t f+U_j\partial_x f.
$$

この右辺を各層の**対流微分** $D_j=\partial_t+U_j\partial_x$ と呼ぶ。$\partial_t$ は $x,z$ を固定した偏微分、$d/dt$ は上記の動く点に沿った全微分であり、同じものではない。正規モードに作用させれば

$$
D_j e^{i(kx-\omega t)}
=(-i\omega+ikU_j)e^{i(kx-\omega t)}
=-i(\omega-kU_j)e^{i(kx-\omega t)}.
$$

## 2. 各層の微小速度と界面条件をつなぐ

各層で背景速度は一様で渦度が零なので、一次の**無渦擾乱**だけを調べる。[速度ポテンシャル](../FLUID11/index.md#def-fluid11-velocity-potential)を用いて擾乱速度を $(u_j',w_j')=(\partial_x\phi_j,\partial_z\phi_j)$ と書く。[非圧縮条件](../FLUID27/index.md#prop-fluid27-linear-boundary)を使えば $\partial_x^2\phi_j+\partial_z^2\phi_j=0$ である。これは全てのせん断流が無渦という意味ではない。境界の速度の跳びは渦度が集中した渦層を表すが、**各層の内部**では無渦と仮定している。

波の水平依存を $e^{ikx}$ として $\phi_j=F_j(z)e^{i(kx-\omega t)}$ と代入すると、鉛直方向の振幅は $F_j''-k^2F_j=0$ を満たす。ここでプライムは $z$ による微分、すなわち $F_j''=d^2F_j/dz^2$ である。指数解 $e^{\pm kz}$ のうち無限遠で増える項は除くため、

$$
\phi_1=A_1e^{-kz}e^{i(kx-\omega t)},\quad z>0;\qquad
\phi_2=A_2e^{kz}e^{i(kx-\omega t)},\quad z<0.
$$

鉛直依存は $k>0$ のためどちらも遠方で減衰する。ここからの線形境界条件・証明では、計算を簡単にするため **$\eta,\phi_j$ を一時的に実部を取る前の複素表示として使う**。物理的な界面変位・速度は最後にそれぞれの実部を取る。方程式の係数は実数であり、$k>0$ なら全ての $x$ について実部が等しいことは、正弦・余弦の独立性により複素振幅の係数が等しいことと同値である。従って以下の $D_j\eta=-i(\omega-kU_j)\eta$ などは**複素表示の等式**であり、実数値の物理場へそのまま複素数を掛ける等式ではない。

界面上の粒子が界面から離れない条件は $D_j\eta=w'_j$ の一次近似である。二層の界面は同じ変位 $\eta$ を共有するが、**接線速度は一致する必要がない**。[FLUID27 の運動学的境界条件](../FLUID27/index.md#prop-fluid27-linear-boundary)を背景の $U_j$ に沿って書き換えたものである。

<a id="prop-fluid34-kinematic-amplitudes"></a>

<!-- formal-statement-start -->
> **命題（界面の運動学的条件とポテンシャル振幅）**  
> 前節の各層一定流速・半無限・非圧縮・無渦の一次正規モードに対し、$D_j\eta=\partial_z\phi_j|_{z=0}$ が成立する必要十分条件は、$\Delta_j=\omega-kU_j$ と置いて

$$
A_1=\frac{i\Delta_1}{k}\widehat\eta,\qquad
A_2=-\frac{i\Delta_2}{k}\widehat\eta
$$

> である。
<!-- formal-statement-end -->

### 証明の見取り図

上層と下層では、遠方へ減衰する指数関数の鉛直微分の符号が逆になる。それを界面の時間微分と一致させて二つの未知振幅を決める。

<!-- proof-start -->
### 証明

共通因子 $e^{i(kx-\omega t)}$ を取り除くと、左辺の振幅は $D_j\eta=-i\Delta_j\widehat\eta e^{i(kx-\omega t)}$。右辺は上層で $-kA_1e^{i(kx-\omega t)}$、下層で $kA_2e^{i(kx-\omega t)}$ だから

$$
-i\Delta_1\widehat\eta=-kA_1,\qquad
-i\Delta_2\widehat\eta=kA_2.
$$

$k>0$ で割れば命題の二式を得る。逆にこの二式を鉛直微分へ代入すると両層の運動学的条件を満たす。
<!-- proof-end -->

**条件の直接確認**：$U_1=U_2=0$ なら $\Delta_1=\Delta_2=\omega$、したがって $A_1=i\omega\widehat\eta/k$、$A_2=-i\omega\widehat\eta/k$。鉛直速度の二値は $-i\omega\widehat\eta$ に一致する。ポテンシャル振幅自体を上下で同じと置いてはいけない。

## 3. 圧力差を導く：重力・張力・速度差の競合

二つの流体の背景圧力 $p_{0j}(z)$ は $\partial_zp_{0j}=-\rho_jg$。Euler 方程式を背景一様流まわりで一次化して $D_j\nabla\phi_j=-\nabla p'_j/\rho_j$ とし、空間的な定数をポテンシャルへ吸収すれば $p'_j=-\rho_jD_j\phi_j$。界面 $z=\eta$ での圧力には、静水圧の位置変化 $-\rho_jg\eta$ も足す必要がある。

[FLUID26 の Young–Laplace 圧力跳躍](../FLUID26/index.md#thm-fluid26-young-laplace)は静止流体について導かれたが、本講の動く**非粘性流体**でも、両側の応力が $-p_jI$ で、界面自身の慣性・表面粘性がない場合、瞬間的な法線応力釣合は同じ形を持つ。$\sigma=0$ のときは通常の圧力連続条件となる。

下層から上層へ向かう単位法線を $n=(-\eta_x,1)/\sqrt{1+\eta_x^2}$ とすると、[向き付き全曲率](../FLUID26/index.md#def-fluid26-oriented-curvature)のグラフ表示は

$$
\kappa_\Sigma=\operatorname{div}_S n
=-\frac{\eta_{xx}}{(1+\eta_x^2)^{3/2}}
\simeq-\eta_{xx}
$$

となる（奥行き方向の曲率は零）。$|\eta_x|\ll1$ で二次以上の効果を捨てたので、圧力差「下側 $-$ 上側」は一次で $-\sigma\eta_{xx}$。山の頂点 $\eta_{xx}<0$ では下側が高圧になり、界面を戻そうとする符号である。従って圧力条件は

$$
-\rho_2(D_2\phi_2+g\eta)+\rho_1(D_1\phi_1+g\eta)=-\sigma\eta_{xx}.
$$

<a id="thm-fluid34-dispersion"></a>

<!-- formal-statement-start -->
> **定理（二層Kelvin–Helmholtz波の分散関係）**  
> $\rho_1,\rho_2,g,k>0$、$\sigma\ge0$、$U_1,U_2\in\mathbb R$ とし、半無限の二層・非圧縮・非粘性・内部無渦・小振幅・遠方減衰の正規モードを考える。界面の運動学的条件と上記の線形圧力跳躍条件を同時に満たす非零のモード振幅が存在する必要十分条件は

$$
\boxed{\rho_1(\omega-kU_1)^2+\rho_2(\omega-kU_2)^2
=(\rho_2-\rho_1)gk+\sigma k^3.}
$$

> この式は半無限層と鋭い界面についてのものであり、有限水深・有限厚の混合層へそのまま適用しない。
<!-- formal-statement-end -->

### 証明の見取り図

[運動学的条件](#prop-fluid34-kinematic-amplitudes)で $A_1,A_2$ を $\widehat\eta$ に置き換える。対流微分をもう一度作用させるため、両層の項は $(\omega-kU_j)^2$ になる。上下の指数関数の符号の違いで、その二項が**加算**されることを確認する。

<!-- proof-start -->
### 証明

$\theta=kx-\omega t$ とし、複素振幅の計算を行う。[命題](#prop-fluid34-kinematic-amplitudes)から

$$
D_1\phi_1|_0=(-i\Delta_1)A_1e^{i\theta}
=\frac{\Delta_1^2}{k}\widehat\eta e^{i\theta},
$$

$$
D_2\phi_2|_0=(-i\Delta_2)A_2e^{i\theta}
=-\frac{\Delta_2^2}{k}\widehat\eta e^{i\theta}.
$$

さらに $\eta_{xx}=-k^2\eta$。圧力条件へ代入して $\widehat\eta e^{i\theta}$ の係数を比較すると

$$
\frac{\rho_1\Delta_1^2+\rho_2\Delta_2^2}{k}
+(\rho_1-\rho_2)g=\sigma k^2.
$$

$k>0$ を掛けて整理すれば表示した式を得る。逆方向は、任意の非零 $\widehat\eta$ から命題の $A_j$ を構成し、Laplace 方程式・遠方条件・運動学的条件と圧力条件を同時に検証できる。したがって必要十分である。
<!-- proof-end -->

**既習模型への還元**：$U_1=U_2=0$、上層が十分軽い極限 $\rho_1\to0$ では $\omega^2=gk+\sigma k^3/\rho_2$。これは[FLUID27 の深水極限](../FLUID27/index.md#prop-fluid27-depth-limits)と一致し、重力・張力の二項の次元はともに s$^{-2}$ になる。ただし $\rho_1=0$ を本定理の二流体仮定へ直接代入した証明ではなく、物理的な極限である。

## 4. 分散式の二根を読めば不安定条件が決まる

$\rho_T=\rho_1+\rho_2$、密度加重平均流速 $U_c=(\rho_1U_1+\rho_2U_2)/\rho_T$、速度差 $\Delta U=U_1-U_2$ とおく。平方完成の中心を $kU_c$ に選ぶ理由は

$$
\rho_1(\omega-kU_1)^2+\rho_2(\omega-kU_2)^2
=\rho_T(\omega-kU_c)^2
+\frac{\rho_1\rho_2}{\rho_T}k^2(\Delta U)^2
$$

と交差項が消えるためである。右辺の第2項はゼロ以上で、速度差が大きいほど復元力を相殺する。

<a id="thm-fluid34-growth-criterion"></a>

<!-- formal-statement-start -->
> **定理（界面モードの成長率と線形不安定判定）**  
> [二層分散関係](#thm-fluid34-dispersion)の仮定の下、次の実数値関数を定める。

$$
R(k)=\frac{(\rho_2-\rho_1)gk+\sigma k^3}{\rho_T}
-\frac{\rho_1\rho_2}{\rho_T^2}k^2(\Delta U)^2.
$$

> 分散関係の二根は

$$
\boxed{\omega_\pm=kU_c\pm\sqrt{R(k)}.}
$$

> $R(k)<0$ の場合、一方の根は正の時間成長率

$$
\boxed{\gamma(k)=\sqrt{-R(k)}>0}
$$

> を持ち、その波数の正規モードは線形不安定である。$R(k)>0$ では両根が実数で両モードは中立、$R(k)=0$ では重根である（重根の場合の一般解の有界性はこの判定だけでは結論しない）。
<!-- formal-statement-end -->

### 証明の見取り図

平方完成して実数 $R$ の平方根を取る。負の $R$ では $\sqrt{R}=i\sqrt{-R}$ として、先に定義した $e^{\gamma t}$ の指数を取り出す。

<!-- proof-start -->
### 証明

[分散式](#thm-fluid34-dispersion)と上の平方完成から

$$
\rho_T(\omega-kU_c)^2
=(\rho_2-\rho_1)gk+\sigma k^3
-\frac{\rho_1\rho_2}{\rho_T}k^2(\Delta U)^2.
$$

$\rho_T>0$ で割り $(\omega-kU_c)^2=R(k)$。$R>0$ なら $\omega=kU_c\pm\sqrt R$ は実数。$R<0$ なら $\omega=kU_c\pm i\sqrt{-R}$ であり、正符号の根は $e^{\sqrt{-R}t}$ で増える。$R=0$ のとき平方根は零なので代数的重複を持つ一根となる。
<!-- proof-end -->

**直接例**：$\rho_1=\rho_2=\rho$、$\sigma=0$、$U_1\ne U_2$ なら $R=-k^2(\Delta U)^2/4<0$。したがって

$$
\omega=k\frac{U_1+U_2}{2}\pm i\frac{k|\Delta U|}{2},
\qquad \gamma=\frac{k|\Delta U|}{2}.
$$

平均速度は波の模様を運ぶだけで、時間成長を決めるのは速度差である。波数 $k$ が大きいほど際限なく増幅するこの理想的な不連続面モデルは、短波長で粘性・有限厚さの影響を無視できなくなることを示す。有限波数帯の計算を、現実界面が無限に高速成長する証拠にしてはいけない。

<a id="prop-fluid34-shear-band"></a>

<!-- formal-statement-start -->
> **命題（安定成層・正の表面張力での不安定波数帯）**  
> [成長率の定理](#thm-fluid34-growth-criterion)に加えて $\rho_2>\rho_1>0$、$\sigma>0$ とする。$A=\rho_1\rho_2(\Delta U)^2/\rho_T$、$B=(\rho_2-\rho_1)g>0$ と置く。この模型に不安定な $k>0$ が存在する必要十分条件は

$$
\boxed{A^2>4\sigma B.}
$$

> このとき不安定な波数の範囲は

$$
k_-<k<k_+,\qquad
k_\pm=\frac{A\pm\sqrt{A^2-4\sigma B}}{2\sigma}.
$$

> 等号 $A^2=4\sigma B$ では $R(k)=0$ となる波数が一つあるが、指数増大する波数はない。
<!-- formal-statement-end -->

### 証明の見取り図

$k>0$ を取り出すと、成長率の符号を $B-Ak+\sigma k^2$ という上向き二次式で判定できる。頂点の値と零点を明示する。

<!-- proof-start -->
### 証明

[定理](#thm-fluid34-growth-criterion)の $R$ を整理すると

$$
R(k)=\frac{k}{\rho_T}\{B-Ak+\sigma k^2\}.
$$

$k/\rho_T>0$ なので $R(k)<0$ と $q(k)=\sigma k^2-Ak+B<0$ は同値である。平方完成すると

$$
q(k)=\sigma\left(k-\frac{A}{2\sigma}\right)^2
+B-\frac{A^2}{4\sigma}.
$$

$A\ge0$、$B>0$、$\sigma>0$ である。$A^2>4\sigma B$ のとき二つの実根はともに正（和 $A/\sigma>0$、積 $B/\sigma>0$）で、その間だけ $q(k)<0$。判別式が零なら $q\ge0$ で接するのみ、負なら常に正である。逆もこれで証明された。
<!-- proof-end -->

重力は密度が下ほど大きいと長波長を戻し、表面張力は短波長ほど強く戻す。両方あれば、せん断による不安定性は**中間の波数帯**に限られる。$\sigma=0$ なら（$\Delta U\ne0$ の場合）$k>B/A$ で短波側が不安定となり、上限はこの模型からは出ない。$\rho_2<\rho_1$ では重力項自体が不安定化するので、この命題の安定成層条件を外して閾値を使ってはいけない。この違いは次のFLUID35で扱う。

## 5. 数値例：低波数と高波数の双方が安定になる

$\rho_1=1000$ kg/m$^3$、$\rho_2=1020$ kg/m$^3$、$U_1=0.2$ m/s、$U_2=0$、$g=9.81$ m/s$^2$、$\sigma=0.072$ N/m を考える。これらは二つの液体を想定した**模型用パラメータ**であり、実測の材料界面を指定した値ではない。

$$
\rho_T=2020,\quad
A=\frac{1000\cdot1020}{2020}(0.2)^2=20.1980\ldots,\quad
B=20\cdot9.81=196.2.
$$

$A^2-4\sigma B>0$ なので有限帯の不安定がある。$k=30$ m$^{-1}$ では

$$
q(30)=196.2-20.1980\ldots\cdot30+0.072\cdot900
=-344.94\ldots<0,
$$

$$
R(30)=\frac{30}{2020}q(30)\simeq-5.123,\quad
\gamma(30)\simeq2.263\ {\rm s^{-1}}.
$$

中心の位相速度は $U_c=200/2020\simeq0.09901$ m/s。$k=30$ の模様の実部周波数は $kU_c\simeq2.9703$ s$^{-1}$ だが、これを増幅率 $\gamma$ と取り違えない。$k=1$ では $q>0$、$k=500$ でも $\sigma k^2$ が優勢になって $q>0$。線形理論の使えるのは $|\eta|k\ll1$ の間だけであり、$e^{\gamma t}$ が大きくなった後の波の破砕・巻き上がり・混合は計算していない。

## 6. ブラウザ Python ラボ：分散根・成長率と線形変位

同一の解析式から分散根、安定帯、運動学的・力学的残差、波の断面を計算する。画面で $k$ と $\Delta U$ を変え、(i) 低波数で重力が勝つ、(ii) 中間波数で増幅する、(iii) 高波数で張力が勝つ、の三状態を比較する。増幅した波形は**線形正規モードの描画**であり、Navier–Stokes方程式や界面追跡法の数値解ではない。

```python-file-lab
# lab-id: FLUID34-KH-INTERFACE
# lab-title: 二層Kelvin–Helmholtz界面の分散根・成長率と線形波形
# lab-file: textbook/volumes/dream_thater/物理系/FLUID/FLUID34/kh_interface_lab.py
# timeout-ms: 15000
# lab-preset: 中間波数・指数増幅 | --k 30 --time 0.5
# lab-preset: 長波長・中立 | --k 1 --time 0.5
# lab-preset: 短波長・表面張力で中立 | --k 500 --time 0.5
# lab-preset: 速度差なし | --k 30 --u1 0 --u2 0 --time 0.5
# lab-preset: 張力なし・短波側不安定 | --k 500 --sigma 0 --amplitude 1e-5 --time 0.05
```

ラボの図は「時間成長率対波数」と「時刻別の線形界面変位」の数値曲線であり、軸・単位・モード名と安定/不安定を明示する。数値の発散を避けるため初期振幅と表示時刻に制限を置いている。JSONにある残差が小さくても、それは採用した**解析式への実装一致**を示すだけで、非線形時間発展の妥当性を検証するものではない。

## 7. 演習

本節では特記しない限り本講の二層・半無限・非粘性・無渦・線形模型を使い、$k>0$、上向き $z$ とする。結果の単位も確認する。

### Level A

### A1. 増幅と位相移動を分ける

$\eta=\operatorname{Re}\{0.001e^{i(5x-(4+0.3i)t)}\}$（SI単位）について $k,\omega_r,\gamma$、位相速度、2 s後の振幅を求めよ。

- Level: A

<!-- solution-start -->
#### 詳細解答

[正規モードの定義](#def-fluid34-normal-mode)と指数の分離により $k=5$ m$^{-1}$、$\omega_r=4$ s$^{-1}$、$\gamma=0.3$ s$^{-1}$。位相速度は $\omega_r/k=0.8$ m/s、振幅は $0.001e^{0.3\cdot2}=0.001e^{0.6}\simeq0.0018221$ m である。波が $0.8$ m/sで進むことと振幅が増えることを別に判定する。
<!-- solution-end -->

### A2. 上下で反対の指数関数

$k=2$ m$^{-1}$ で上層と下層の遠方減衰を満たす $\phi_j$ の $z$ 依存をそれぞれ書き、$z=0$ での鉛直微分の符号を求めよ。

- Level: A

<!-- solution-start -->
#### 詳細解答

第2節で非圧縮条件から導いた鉛直方程式 $F''-k^2F=0$ に $k=2$ を代入すると $F''-4F=0$ であり、解は $c_+e^{2z}+c_-e^{-2z}$。上側 $z\to+\infty$ では $e^{2z}$ を除くから $F_1=A_1e^{-2z}$、$\partial_zF_1(0)=-2A_1$。下側 $z\to-\infty$ では $e^{-2z}$ を除くから $F_2=A_2e^{2z}$、$\partial_zF_2(0)=2A_2$。上下で符号が逆になる。
<!-- solution-end -->

### A3. 速度差なしで深水波へ戻す

$U_1=U_2=0$、$\rho_1=\rho_2=\rho$、$\sigma>0$ とし、$\omega^2$ を求めよ。また $\rho_1\to0$、$\rho_2=\rho$ の別の極限ではどうなるか。

- Level: A

<!-- solution-start -->
#### 詳細解答

[二層分散式](#thm-fluid34-dispersion)に前者を代入すると $2\rho\omega^2=\sigma k^3$ だから $\omega^2=\sigma k^3/(2\rho)$。重力項は同密度なので消える。後者では左辺は $\rho\omega^2$、重力項は $\rho gk$ へ収束し、$\omega^2=gk+\sigma k^3/\rho$ となる。二つの極限では界面を挟む流体の慣性が異なる。
<!-- solution-end -->

### A4. 等密度の渦層

$\rho_1=\rho_2>0$、$\sigma=0$、$U_1=2$ m/s、$U_2=0$、$k=3$ m$^{-1}$ で分散根と増幅率を求めよ。

- Level: A

<!-- solution-start -->
#### 詳細解答

$U_c=(2+0)/2=1$ m/s、$\Delta U=2$ m/s。[成長率の定理](#thm-fluid34-growth-criterion)から $R=-k^2(\Delta U)^2/4=-9$ s$^{-2}$。従って $\omega_\pm=3\pm3i$ s$^{-1}$、$\gamma=3$ s$^{-1}$。重力項は密度差がないため増幅の抑制に寄与しない。
<!-- solution-end -->

### A5. 張力なしの臨界波数

$\rho_2>\rho_1>0$、$\sigma=0$、$\Delta U\ne0$ とする。不安定となる波数の条件を $A,B$ で書き、短波長側の意味を説明せよ。

- Level: A

<!-- solution-start -->
#### 詳細解答

$R=k(B-Ak)/\rho_T$、$A>0$、$B>0$ だから $R<0$ は $B-Ak<0$、すなわち $k>B/A$ と同値。$k=B/A$ は重根、中立の境目である。$k$ を大きくしてもこの理想模型では張力による $k^3$ の復元項が現れないので、短波側の上限を予言できない。これは現実の無限成長を意味しない。
<!-- solution-end -->

### Level B

### B1. 圧力条件の符号を完全に導く

上層 $\phi_1=A_1e^{-kz}e^{i(kx-\omega t)}$、下層 $\phi_2=A_2e^{kz}e^{i(kx-\omega t)}$ の界面条件から、運動学的条件で $A_j$ を消去し、二層分散式を導け。静水圧変化と表面張力の符号を示せ。

- Level: B

<!-- solution-start -->
#### 詳細解答

第2節と同様、実部を取る前の複素表示で $E=e^{i\theta}$（$\theta=kx-\omega t$）と置く。運動学的条件は、$D_j\eta=-i\Delta_j\widehat\eta E$ と上下の鉛直微分から

$$
-i\Delta_1\widehat\eta E=-kA_1E,\qquad
-i\Delta_2\widehat\eta E=kA_2E
$$

となる。$E\ne0$、$k>0$ なので、[運動学的条件](#prop-fluid34-kinematic-amplitudes)の振幅式 $A_1=i\Delta_1\widehat\eta/k$、$A_2=-i\Delta_2\widehat\eta/k$ を得る。各層の $D_j$ はモード因子 $E$ に作用すると $-i\Delta_j$ 倍するため、

$$
D_1\phi_1|_0=(-i\Delta_1)\frac{i\Delta_1\widehat\eta}{k}E
=\frac{\Delta_1^2}{k}\eta,\qquad
D_2\phi_2|_0=(-i\Delta_2)\frac{-i\Delta_2\widehat\eta}{k}E
=-\frac{\Delta_2^2}{k}\eta.
$$

静水圧は界面で $-\rho_jg\eta$ だけ変わる。[Young–Laplace の圧力跳躍](../FLUID26/index.md#thm-fluid26-young-laplace)は、本講の非粘性応力条件と小勾配の曲率表示により $p_2-p_1=-\sigma\eta_{xx}=\sigma k^2\eta$ となる。従って

$$
-\rho_2\left(-\frac{\Delta_2^2}{k}\eta+g\eta\right)
+\rho_1\left(\frac{\Delta_1^2}{k}\eta+g\eta\right)
=\sigma k^2\eta.
$$

非零の $\eta$ を消し、$k$ を掛けると $\rho_1\Delta_1^2+\rho_2\Delta_2^2=(\rho_2-\rho_1)gk+\sigma k^3$ となる。上層の $e^{-kz}$ の微分符号を見落とすと平方の二項が誤って差になる。
<!-- solution-end -->

### B2. 平方完成と移動基準系

$\rho_1=1$、$\rho_2=3$、$U_1=2$、$U_2=-2$（SI単位）として $U_c$ と $\rho_1\rho_2/\rho_T^2$ を求めよ。両速度に同じ $V$ を足しても $\gamma$ が変わらないことを式で証明せよ。

- Level: B

<!-- solution-start -->
#### 詳細解答

$\rho_T=4$、$U_c=(1\cdot2+3\cdot(-2))/4=-1$ m/s、$\rho_1\rho_2/\rho_T^2=3/16$。速度を $U_j'=U_j+V$ とすると $\Delta U'=U_1'-U_2'=\Delta U$、$U_c'=(\rho_1U_1+\rho_2U_2+\rho_TV)/\rho_T=U_c+V$。$R$ は $\Delta U$ の二乗だけで決まるため変わらず、$\omega_\pm'=k(U_c+V)\pm\sqrt R=\omega_\pm+kV$。$kV$ は実数だから $\operatorname{Im}\omega_\pm'=\operatorname{Im}\omega_\pm$、つまり成長率は不変。速度の一様な加算は波形の移流にしか効かない。
<!-- solution-end -->

### B3. 安定化の有限波数帯と等号

$\rho_2>\rho_1>0$、$\sigma>0$、$A^2>4\sigma B$ とする。不安定な波数帯の両端が正である理由を、判別式と根の和・積から示せ。$A^2=4\sigma B$ ならどうなるか。

- Level: B

<!-- solution-start -->
#### 詳細解答

$R(k)=kq(k)/\rho_T$、$q(k)=\sigma k^2-Ak+B$。判別式 $D=A^2-4\sigma B>0$ だから実根が二つある。根の和は $A/\sigma>0$、積は $B/\sigma>0$ なので両根は正である。上向き二次関数ゆえ根の間だけ $q<0$、つまり $R<0$。$D=0$ では $q(k)=\sigma(k-A/(2\sigma))^2\ge0$ となり、零点での指数成長率は零。重根での一般解まで常に有界と結論しない。
<!-- solution-end -->

### B4. 密度が逆転すると何が壊れるか

$U_1=U_2$、$\sigma=0$ で $\rho_1>\rho_2>0$ の場合の $R$ の符号を求めよ。また前節の有限帯命題を適用できない理由を説明せよ。

- Level: B

<!-- solution-start -->
#### 詳細解答

$\Delta U=0$ だから $R(k)=(\rho_2-\rho_1)gk/\rho_T<0$。よって $k>0$ の全モードで $\gamma=\sqrt{(\rho_1-\rho_2)gk/\rho_T}>0$。これはせん断がなくても重い層が上側にあることで起こる線形成長である。[有限波数帯命題](#prop-fluid34-shear-band)の仮定 $\rho_2>\rho_1$ を失うと $B>0$ が成り立たず、$q(0)=B$ から低波数が安定という証明の出発点が壊れる。この力学はFLUID35で詳しく調べる。
<!-- solution-end -->

### Level C

### C1. 流速差の閾値・増幅・可視化の限界

$\rho_1=1000$、$\rho_2=1020$ kg/m$^3$、$g=9.81$ m/s$^2$、$\sigma=0.072$ N/m、$U_2=0$ とする。次の問いに答えよ。

1. ある波数で指数増大が起こるために必要な $|U_1|$ の閾値を導け。
2. $U_1=0.2$ m/s とし、$k=30$ m$^{-1}$ での $\omega$ の二根と $\gamma$ を計算せよ。
3. 初期振幅 $10^{-4}$ m の成長枝について $t=0.5$ s 後の振幅を見積もり、時刻 $t$ の最大勾配による線形近似の条件を確認せよ。
4. この模型から界面の巻き上がりが予言できない理由を述べよ。

- Level: C

<!-- solution-start -->
#### 詳細解答

**（1）** $\rho_T=2020$、$A=(1000\cdot1020/2020)U_1^2$、$B=(1020-1000)g=196.2$。[不安定帯命題](#prop-fluid34-shear-band)から $A^2>4\sigma B$、$A\ge0$ より $A>2\sqrt{\sigma B}$。従って

$$
|U_1|>
\left(\frac{2\rho_T\sqrt{\sigma B}}{\rho_1\rho_2}\right)^{1/2}.
$$

$2\sqrt{0.072\cdot196.2}\simeq7.517$、$\rho_1\rho_2/\rho_T\simeq504.9505$ を入れると閾値は約 $0.1220$ m/s。

**（2）** $U_1=0.2$ なら $A=504.9505\cdot0.04\simeq20.1980$、$q(30)=B-30A+0.072\cdot900\simeq-344.94$。従って $R(30)=30q(30)/2020\simeq-5.123$ s$^{-2}$、$\gamma=\sqrt{-R}\simeq2.263$ s$^{-1}$。$U_c=200/2020\simeq0.09901$ m/s、よって

$$
\omega_\pm=30U_c\pm i\gamma
\simeq2.9703\pm2.263i\quad{\rm s^{-1}}.
$$

**（3）** 増幅枝の振幅は $a(0.5)=10^{-4}e^{2.263\cdot0.5}\simeq3.10\times10^{-4}$ m。$ka\simeq30\cdot3.10\times10^{-4}=9.3\times10^{-3}\ll1$ で、この時点では小勾配の近似と整合的。ただし時間が延び $ka$ が1に近づけば一次理論は破れる。

**（4）** 本章では $O(\eta^2)$ の非線形項、界面の大変形、粘性・混合・渦層厚さを捨てている。指数増大する一次の波形を表示しても、巻き上がりの形や長時間の飽和振幅を予測する方程式は解いていない。
<!-- solution-end -->

## 8. まとめ

- 各層のポテンシャルは界面から離れるほど $e^{-k|z|}$ で減衰する。上下の**鉛直微分符号**と背景流による対流微分を保持する。
- 運動学的条件と Young–Laplace の圧力跳躍をつなぐと、密度・速度差・重力・表面張力を含む二層分散関係が出る。
- $\operatorname{Im}\omega>0$ が振幅の時間増大を表す。安定成層と正の張力の下では、せん断が閾値を超えたときだけ中間波数帯が線形不安定になる。
- これは半無限・鋭い界面・小振幅の線形理論である。表面の巻き上がり、混合、粘性減衰や有限厚のせん断層は解いていない。
