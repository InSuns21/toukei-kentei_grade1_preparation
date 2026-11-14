# FLUID17 壁が急に動くと運動量はどう広がるか

[FLUID16 の円管流・円筒 Couette 流](../FLUID16/index.md#thm-fluid16-couette-profile)では、時間が十分経過した定常速度分布を求めた。しかし**壁を突然動かした直後**、遠い流体まで同時に動くわけではない。壁で生まれた速度勾配が粘性を通して内部へ伝わる。その時間と距離を、厳密な非定常解から求めよう。

本講の二つの問いは異なる。**Stokes 第一問題**は静止流体を時刻 $0$ に突然駆動する初期値問題、**Stokes 第二問題**は壁を正弦振動させたときの周期応答を求める問題である。第二問題の周期解は、流体が時刻 $0$ まで静止していたことを意味しない。

## 0. 平面壁の上の一方向流：なぜ熱の拡散と同じ式になるか

壁を $y=0$、流体を半空間 $y>0$ に置く。$x$ は壁に平行、$y$ は流体内部へ向かう距離、$t$ は時間である。流体は密度 $\rho>0$ [kg/m³]、動的粘性係数 $\eta>0$ [Pa s] が一定の非圧縮 Newton 流体とし、体積力と圧力勾配は零とする。動粘度 $\nu=\eta/\rho>0$ の単位は m²/s である。

既習の[非圧縮 Navier–Stokes 方程式](../../CTM/CTM15/index.md#thm-ctm15-incompressible-navier-stokes)を、空間 $C^2$・時間 $C^1$ の一方向速度 $v=(u(y,t),0,0)$ に適用する。$\nabla\cdot v=\partial_xu=0$、$(v\cdot\nabla)v=u\partial_xv=0$、$\Delta v=(u_{yy},0,0)$ なので

$$
\rho\,u_t=\eta\,u_{yy},\qquad
u_t=\nu u_{yy}\quad(y>0).
$$

これは**一次元拡散方程式**である。$u_t$ は同じ場所での速度の時間変化、$u_{yy}$ は壁から離れる方向の速度勾配の変化率を表す。運動量の輸送係数が $\nu$ なので、時間 $t$ に影響が届く長さは次元だけから $\sqrt{\nu t}$ と予想できる。ただし拡散方程式の解は任意の $t>0$ に遠方でも厳密には非零であり、「鋭い伝播前線」を持つという意味ではない。

壁に流体が速度を合わせる[無滑り条件](../../CTM/CTM15/index.md#def-ctm15-no-slip)を用いる。ここでいう「壁の力」は流体領域の外向き法線 $n=-e_y$ に関する[traction](../../CTM/CTM6/index.md#def-ctm6-traction)である。Newton 応力の非対角成分は $\sigma_{xy}=\eta u_y$ だから、壁が流体へ及ぼす接線力密度は $t_x=-\eta u_y(0+,t)$ となる。**力の向きは壁面の法線を選んでから決める**。

## 1. Stokes 第一問題：停止していた壁が突然動く

流体は $t=0$ の直前まで静止している。時刻 $0$ から壁が $+x$ 方向に一定速度 $U>0$ で動く。この設定では壁面と初期面の交点 $(y,t)=(0,0)$ でデータが不連続であり、そこで滑らかな解を要求しない。

<a id="def-fluid17-first-problem"></a>

<!-- formal-statement-start -->
> **定義（Stokes 第一問題）**  
> $\nu>0$、$U>0$ を定数とし、$y>0,\ t>0$ で $u_t=\nu u_{yy}$ を解く。初期条件は各 $y>0$ に対して $u(y,0+)=0$、壁条件は各 $t>0$ に対して $u(0,t)=U$、遠方条件は $u(y,t)\to0$（$y\to\infty$、有界な時間区間で一様）とする。$u$ は内部で $C^{2,1}$、壁では $t>0$ に対して連続とする。
<!-- formal-statement-end -->

**条件を確かめる候補**として $u(y,t)=U F(y/\sqrt{\nu t})$ を考える。$F(0)=1$、$F(s)\to0$（$s\to\infty$）なら壁と遠方を満たす。任意の固定 $y>0$ で $t\downarrow0$ とすると引数は無限大になるので初期条件も満たす。ただし、これだけでは拡散方程式を満たすか未検証である。

<!-- definition-example-start: def-fluid17-first-problem -->
**定義の確認**：例えば $F(s)=e^{-s}$ は三つのデータ条件を満たすが、$u_t=\nu u_{yy}$ に代入すると一般には一致しない。**境界条件への適合と微分方程式の解であることは別**である。
<!-- definition-example-end -->

速度の形を決めるには、時間と距離を一つにまとめる**相似変数** $\xi=y/(2\sqrt{\nu t})$ を使う。正規化した Gauss 積分の尾部

$$
\operatorname{erfc}(s)=\frac{2}{\sqrt{\pi}}\int_s^\infty e^{-q^2}\,dq\qquad(s\ge0)
$$

を**相補誤差関数**という。積分での $q$ は無次元の積分変数であり、$\operatorname{erfc}(0)=1$、無限遠で $0$ に近づく。前者には $\int_{-\infty}^\infty e^{-q^2}dq=\sqrt{\pi}$ を用いる。これは積分の二乗を平面の極座標積分に変換して $\pi$ を得ることで確かめられる。

<a id="thm-fluid17-first-profile"></a>

<!-- formal-statement-start -->
> **定理（Stokes 第一問題の相似拡散解）**  
> $\rho,\eta,U>0$ は一定、$\nu=\eta/\rho$ とする。[Stokes 第一問題](#def-fluid17-first-problem)の有界で遠方で一様に零へ減衰する解は、$y\ge0,\ t>0$ で
>
> $$
> u(y,t)=U\,\operatorname{erfc}\!\left(\frac{y}{2\sqrt{\nu t}}\right).
> $$
>
> この解は初期・壁・遠方の条件を満たし、上記の有界解クラスで一意である（角点 $(0,0)$ の連続性は要求しない）。
<!-- formal-statement-end -->

### 証明の見取り図

相似変数を使うと偏微分方程式が $F''+2\xi F'=0$ になり、$F'$ は Gauss 関数に比例する。境界条件はその積分定数を決める。最後に元の偏微分方程式と一意性を確認する。

<!-- proof-start -->
### 証明

$\xi=y/(2\sqrt{\nu t})$、$u=UF(\xi)$ とおく。$t>0$ では $\xi_y=1/(2\sqrt{\nu t})$、$\xi_t=-\xi/(2t)$ だから、連鎖律により

$$
u_t=-\frac{U\xi}{2t}F'(\xi),\qquad
u_{yy}=\frac{U}{4\nu t}F''(\xi).
$$

$u_t=\nu u_{yy}$ に代入し、$U>0,t>0$ を用いて $F''+2\xi F'=0$ を得る。$G=F'$ とおけば $G'+2\xi G=0$ であり、$(e^{\xi^2}G)'=0$。従って $F'=C e^{-\xi^2}$、$F(\xi)=D+C\int_0^\xi e^{-q^2}\,dq$。壁で $F(0)=1$ より $D=1$、遠方で $F(\infty)=0$ より

$$
0=1+C\int_0^\infty e^{-q^2}dq
=1+C\frac{\sqrt\pi}{2},
\qquad C=-\frac2{\sqrt\pi}.
$$

ゆえに $F(\xi)=1-\frac2{\sqrt\pi}\int_0^\xi e^{-q^2}dq=\operatorname{erfc}(\xi)$。$\operatorname{erfc}'(\xi)=-2e^{-\xi^2}/\sqrt{\pi}$、$\operatorname{erfc}''(\xi)=4\xi e^{-\xi^2}/\sqrt{\pi}$ を代入すると元の拡散方程式も直接満たす。固定した $y>0$ に対し $t\downarrow0$ なら $\xi\to\infty$、$u\to0$。$y=0,t>0$ では $\xi=0$、$u=U$。さらに任意の $T>0$ について $0<t\le T$ なら $\xi\ge y/(2\sqrt{\nu T})$ だから、遠方減衰は時間区間で一様である。

一意性は二解の差 $w$ に対する拡散方程式の最大値原理から従う。実際、$0<t\le T$ の有限長長方形 $0\le y\le L$ 上で、差の初期面・左壁面は零、右壁面 $y=L$ の絶対値は $L\to\infty$ で一様に零へ近づく。内部の正の最大を排除するため $w-\varepsilon t$ を考えると、正の内部最大では時間微分が非負、空間二階微分は非正である一方、$(\partial_t-\nu\partial_{yy})(w-\varepsilon t)=-\varepsilon<0$ となり矛盾する。負の最小も $-w$ で同様。右壁の誤差と $\varepsilon T$ を零へ送れば $w=0$ となる。角点の不一致は $t=0$ の壁値を要求しないことで扱う。
<!-- proof-end -->

**具体的な読み方**：$t=1\,\mathrm{s}$、$\nu=10^{-6}\,\mathrm{m^2/s}$、$U=0.020\,\mathrm{m/s}$ とすると、$y=2.0\,\mathrm{mm}$ で $\xi=1$ だから $u/U=\operatorname{erfc}(1)\approx0.1573$、すなわち $u\approx3.15\,\mathrm{mm/s}$。壁速度に「すぐ全層が追従する」わけではない。

## 2. 影響の厚さと、壁から供給される運動量

相似変数が同じなら、壁速度に対する速度の比も同じになる。「境界層厚さ」は必ず数値的な閾値を選んで定義する必要がある。第一問題の速度は全ての有限距離で $t>0$ に正だから、数学的に厳密な影響端は存在しない。

<a id="def-fluid17-penetration-thickness"></a>

<!-- formal-statement-start -->
> **定義（第一問題の速度閾値厚さ）**  
> [第一問題の相似解](#thm-fluid17-first-profile)と $0<\alpha<1$ に対し、$u(\delta_\alpha(t),t)=\alpha U$ を満たす唯一の距離 $\delta_\alpha(t)>0$ を速度閾値厚さという。$\operatorname{erfc}$ が $[0,\infty)$ 上で狭義単調減少するため逆関数 $\operatorname{erfc}^{-1}:(0,1]\to[0,\infty)$ が存在し、
>
> $$
> \delta_\alpha(t)=2\operatorname{erfc}^{-1}(\alpha)\sqrt{\nu t}\qquad(t>0).
> $$
<!-- formal-statement-end -->

<!-- definition-example-start: def-fluid17-penetration-thickness -->
**定義の確認**：$\alpha=\operatorname{erfc}(1)\approx0.1573$ なら $\operatorname{erfc}^{-1}(\alpha)=1$。従って $\delta_\alpha(t)=2\sqrt{\nu t}$。壁での比は $1>\alpha$、この距離で $\alpha$、遠方で $0<\alpha$ だから定義した交点が確かに一つある。
<!-- definition-example-end -->

<a id="thm-fluid17-first-momentum"></a>

<!-- formal-statement-start -->
> **定理（第一問題の壁面せん断力と運動量収支）**  
> 一定 $\rho,\eta,U>0$ の[第一問題の解](#thm-fluid17-first-profile)について、$t>0$ の壁が流体へ加える $+x$ 方向の力密度 $f(t)$ と、単位壁面積当たりの流体の $x$ 方向運動量 $M(t)$ は
>
> $$
> f(t)=-\eta u_y(0+,t)=\frac{\eta U}{\sqrt{\pi\nu t}},
> \qquad
> M(t)=\rho\int_0^\infty u(y,t)\,dy=\frac{2\rho U\sqrt{\nu t}}{\sqrt\pi}.
> $$
>
> $dM/dt=f(t)$ である。$f(t)$ は $t\downarrow0$ で発散するが、有限時間に与える力積 $\int_0^t f(s)\,ds=M(t)$ は有限である。
<!-- formal-statement-end -->

### 証明の見取り図

速度の壁法線微分に $\operatorname{erfc}'$ を入れ、法線 $-e_y$ の向きを反映する。次に $y=2\sqrt{\nu t}\,\xi$ と置換した速度の面積分を計算し、壁からの力積と比べる。

<!-- proof-start -->
### 証明

連鎖律と $\operatorname{erfc}'(\xi)=-2e^{-\xi^2}/\sqrt\pi$ より

$$
u_y(y,t)=-\frac{U}{\sqrt{\pi\nu t}}\exp\!\left(-\frac{y^2}{4\nu t}\right).
$$

[Newton 応力](../../CTM/CTM15/index.md#def-ctm15-incompressible-newtonian)は $\sigma_{xy}=\eta u_y$ で、壁での外向き法線は $n=-e_y$。従って $f=-\eta u_y(0+,t)=\eta U/\sqrt{\pi\nu t}>0$。壁が受ける力は逆向きである。

運動量積分の置換 $y=2\sqrt{\nu t}\,\xi$ では $dy=2\sqrt{\nu t}\,d\xi$。さらに非負 integrand に対して積分順序を交換し、

$$
\begin{aligned}
\int_0^\infty\operatorname{erfc}(\xi)\,d\xi
&=\frac2{\sqrt\pi}\int_0^\infty\int_\xi^\infty e^{-q^2}\,dq\,d\xi\\
&=\frac2{\sqrt\pi}\int_0^\infty q e^{-q^2}\,dq
=\frac1{\sqrt\pi}.
\end{aligned}
$$

よって $M=\rho U\cdot2\sqrt{\nu t}/\sqrt\pi$。時間微分すれば $dM/dt=\rho U\sqrt\nu/(\sqrt\pi\sqrt t)=\eta U/\sqrt{\pi\nu t}$（$\eta=\rho\nu$）で一致する。特異性は $t^{-1/2}$ なので可積分で、$\int_0^t f(s)ds=2\eta U\sqrt t/\sqrt{\pi\nu}=M(t)$。
<!-- proof-end -->

**重要な限界**：時刻 $0$ に壁速度が不連続に跳ぶ理想模型だから瞬間の力が発散する。有限時間で加速する壁や壁の弾性を扱えば初期の特異性は変わる。これを無限の総運動量・力積と混同しない。

## 3. Stokes 第二問題：壁を繰り返し振動させる

次は壁速度が $U\cos(\omega t)$（$U>0$ は振幅、$\omega>0$ は角振動数 [s⁻¹]）となる。壁は正負に動き、流体内部では壁から遠いほど振幅が減り、位相が遅れる。ここでは**始動後の過渡応答を除いた、全時刻で周期的な解**を探す。周期は $T=2\pi/\omega$。

$a>0$ と $\phi$ が一定の $e^{-ay}\cos(\omega t-\phi y)$ は、距離とともに振幅が減り、位相も変わる。その減衰と位相の係数が拡散方程式によって決まる。

<a id="def-fluid17-second-problem"></a>

<!-- formal-statement-start -->
> **定義（Stokes 第二問題の周期応答）**  
> $\nu,U,\omega>0$ とし、$y>0,\ t\in\mathbb R$ において $u_t=\nu u_{yy}$、壁で $u(0,t)=U\cos(\omega t)$、遠方で $u(y,t)\to0$ を満たす実速度を考える。特に周期 $T=2\pi/\omega$ をもち、$u(y,t)=\operatorname{Re}\{A(y)e^{i\omega t}\}$ の形で $A(0)=U$、$A(y)\to0$ の複素振幅 $A$ を持つ解を、単一周波数の周期応答という。ここでは静止初期条件を課さない。
<!-- formal-statement-end -->

<!-- definition-example-start: def-fluid17-second-problem -->
**定義の確認**：$A(y)=Ue^{-\lambda y}$（$\operatorname{Re}\lambda>0$）なら、$A(0)=U$ と遠方減衰を満たし、$u=\operatorname{Re}(Ae^{i\omega t})$ は実数・周期 $T$ の速度である。ただし $\lambda$ はまだ拡散方程式の条件から決める必要がある。
<!-- definition-example-end -->

<a id="thm-fluid17-second-profile"></a>

<!-- formal-statement-start -->
> **定理（Stokes 第二問題の振動境界層）**  
> 一定 $\rho,\eta>0$、$\nu=\eta/\rho$、振幅 $U>0$、角振動数 $\omega>0$ とする。[第二問題の単一周波数周期応答](#def-fluid17-second-problem)は一意で、
>
> $$
> \delta=\sqrt{\frac{2\nu}{\omega}},\qquad
> u(y,t)=Ue^{-y/\delta}\cos\!\left(\omega t-\frac{y}{\delta}\right).
> $$
>
> $\delta$ は振幅が壁の $1/e$ になる距離（振動浸透深さ）であり、位相遅れは $y/\delta$ [rad] である。
<!-- formal-statement-end -->

### 証明の見取り図

複素数は物理的な速度ではなく計算上の表現である。$A(y)e^{i\omega t}$ を拡散方程式へ代入して $i\omega A=\nu A''$ を得る。減衰する解だけを選び、最後に実部を取る。

<!-- proof-start -->
### 証明

$u(y,t)=\operatorname{Re}\{A(y)e^{i\omega t}\}$ とおく。時間微分と距離の二階微分の実部は、各 $y$ で $\operatorname{Re}\{(i\omega A-\nu A'')e^{i\omega t}\}=0$ を満たす。これは全ての $t$ で成立するので、振幅の実部と虚部を変えて評価すれば $i\omega A=\nu A''$ である。

$\lambda^2=i\omega/\nu$ の二つの平方根は $\pm(1+i)\sqrt{\omega/(2\nu)}$。$\delta=\sqrt{2\nu/\omega}$ とおくと $\lambda=(1+i)/\delta$ を正の実部を持つ根として選べる。一般解は

$$
A(y)=C_+e^{(1+i)y/\delta}+C_-e^{-(1+i)y/\delta}.
$$

遠方減衰から $C_+=0$、壁 $A(0)=U$ から $C_-=U$。従って

$$
u(y,t)=\operatorname{Re}\{Ue^{i\omega t}e^{-(1+i)y/\delta}\}
=Ue^{-y/\delta}\cos(\omega t-y/\delta).
$$

この計算は解の存在と、定義した単一周波数・遠方減衰クラスでの一意性を示す。また $\nu(1+i)^2/\delta^2=\nu(2i)/(2\nu/\omega)=i\omega$ だから微分方程式を直接満たす。
<!-- proof-end -->

**数値の見方**：$\nu=10^{-6}\,\mathrm{m^2/s}$、$\omega=2\pi\,\mathrm{s^{-1}}$（1 Hz）なら $\delta=\sqrt{10^{-6}/\pi}\,\mathrm m\approx0.564\,\mathrm{mm}$。$y=\delta$ で振幅は $e^{-1}\approx0.368$ 倍、時間位相は壁より $1$ rad 遅れる。振幅とある瞬間の速度値を混同しない。

<a id="prop-fluid17-second-work"></a>

<!-- formal-statement-start -->
> **命題（振動壁のせん断力と一周期平均の散逸）**  
> [第二問題の周期解](#thm-fluid17-second-profile)において、壁が流体へ加える $x$ 方向の力密度は
>
> $$
> f(t)=\frac{\eta U}{\delta}\{\cos(\omega t)-\sin(\omega t)\}.
> $$
>
> 一周期平均を $\langle h\rangle=T^{-1}\int_{t_0}^{t_0+T}h(t)\,dt$ とすれば、壁の供給仕事率と流体の粘性散逸率（いずれも単位壁面積当たり）は
>
> $$
> \langle f(t)U\cos(\omega t)\rangle
> =\left\langle\int_0^\infty\eta u_y(y,t)^2\,dy\right\rangle
> =\frac{\eta U^2}{2\delta}>0.
> $$
<!-- formal-statement-end -->

### 証明の見取り図

壁に向かう外向き法線は $-e_y$。$u_y$ の二項の符号を確かめる。平均では $\langle\cos^2\rangle=\langle\sin^2\rangle=1/2$、$\langle\sin\cos\rangle=0$ を使う。散逸には [Newton 流体の粘性散逸](../../CTM/CTM15/index.md#thm-ctm15-viscous-dissipation)を一方向流に適用する。

<!-- proof-start -->
### 証明

$\theta=\omega t-y/\delta$ と書くと、指数と余弦の双方を $y$ 微分する必要があり、

$$
u_y(y,t)=\frac{Ue^{-y/\delta}}{\delta}[-\cos\theta+\sin\theta].
$$

$y=0$ で $f=-\eta u_y=\eta U(\cos\omega t-\sin\omega t)/\delta$。壁速度 $U\cos\omega t$ を掛けて一周期平均を取れば

$$
\langle fU\cos\omega t\rangle
=\frac{\eta U^2}{\delta}[\langle\cos^2\omega t\rangle-
\langle\sin\omega t\cos\omega t\rangle]
=\frac{\eta U^2}{2\delta}.
$$

一方向流では $D_{xy}=D_{yx}=u_y/2$ なので $2\eta D:D=\eta u_y^2$。各 $y$ で

$$
\langle u_y^2\rangle
=\frac{U^2e^{-2y/\delta}}{\delta^2}
\langle(-\cos\theta+\sin\theta)^2\rangle
=\frac{U^2e^{-2y/\delta}}{\delta^2}.
$$

従って $\int_0^\infty\eta\langle u_y^2\rangle\,dy
=(\eta U^2/\delta^2)(\delta/2)=\eta U^2/(2\delta)$。積分と周期平均は被積分関数が非負で可積分なので交換できる。
<!-- proof-end -->

**成立条件を取り違えない**：もし「$t=0$ まで静止、$t=0$ から振動開始」という別問題に上の周期解をそのまま代入すると、$u(y,0)=Ue^{-y/\delta}\cos(y/\delta)$ は $y>0$ で一般に零でなく、初期条件に反する。正しい始動解には過渡成分が必要で、時間が経つにつれて周期成分が支配的になるという説明は、ここで証明した「周期クラスの一意性」とは異なる主張である。

## 4. 解析解を数値拡散で検算する

二つの解はいずれも同じ $u_t=\nu u_{yy}$ に従う。格子点 $y_j=j\Delta y$、時刻 $t_n=n\Delta t$ で中心差分と前進 Euler 時間離散を使えば

$$
u_j^{n+1}=u_j^n+r(u_{j-1}^n-2u_j^n+u_{j+1}^n),
\qquad r=\frac{\nu\Delta t}{(\Delta y)^2}.
$$

$r\le1/2$ なら更新式は非負係数 $(r,1-2r,r)$ の重み付き平均となり、少なくとも最大値が増大しない。$r>1/2$ ではこの単調性を失い、振動格子モードの増幅率 $1-4r$ の絶対値が $1$ を超え得る（交互符号列に代入して検算できる）。したがって以下では $r\le0.45$ を採用する。

[数値検算用 Python ソース](stokes_diffusion_check.py)は上の更新則を使い、**別途導いた解析解**を各格子点で評価して最大速度誤差を比較する。第一問題は $t=0$ の静止場から始め、外側は十分遠い固定壁近似 $u(L,t)=0$ とする。第二問題は最初から解析的な周期場 $u(y,0)$ を初期条件として与え、切断端 $y=L$ では既知の周期解を境界値として与える。これは初期静止の第二問題を計算したという意味ではない。

- 共通：$\nu=10^{-6}\,\mathrm{m^2/s}$、$U=0.020\,\mathrm{m/s}$、計算時刻 1 s、等間隔格子、刻みは安定条件を満たすように決定する。
- 第一問題：$L=12\,\mathrm{mm}$、$u(0,t)=U$、$u(L,t)=0$。$L/(2\sqrt{\nu t})=6$ なので終時刻で切断端の厳密解は非常に小さい。
- 第二問題：$\omega=2\pi\,\mathrm{s^{-1}}$、$L=8\,\mathrm{mm}$、$u(0,t)=U\cos(\omega t)$、$u(L,t)$ は上の解析式から指定。周期解を数値的に維持できるかを測る。
- $N$ と $2N$ 分割の最大誤差 $E_\infty=\max_j|u_j-u(y_j,t)|/U$ を表示し、細分化で減少したか確認する。壁応力は三点片側差分と解析微分を突き合わせる。

下の実行欄では公開された同一ファイルをブラウザ内 Python で実行できる。実行環境の初回読込みには通信が必要で、実行できない環境でも上の解析式と数値例を追える。

~~~python-file-lab
# lab-id: FLUID17-STOKES-DIFFUSION
# lab-title: Stokes 第一・第二問題の格子収束と壁面応力
# lab-file: textbook/volumes/dream_thater/物理系/FLUID/FLUID17/stokes_diffusion_check.py
# timeout-ms: 30000
# lab-preset: 第一問題・壁の突然の始動 | --case first --n 120
# lab-preset: 第二問題・周期境界層 | --case second --n 160
# lab-preset: 両問題と格子細分化 | --case both --n 180
~~~

## 5. 二つの長さ尺度をどう比べるか

第一問題では時刻 $t$ に対応する浸透の目安が $\sqrt{\nu t}$、第二問題では角振動数 $\omega$ に対応する振幅減衰長が $\sqrt{2\nu/\omega}$ である。**速く振動するほど奥まで届かない**のは、流体が一方向に長く加速し続ける時間が短いからである。

第一問題の壁の力密度は $t^{-1/2}$ で減少し、第二問題の壁の力密度は時間的に振動するが、一周期平均の入力仕事は正である。壁応力の**符号**と壁速度の積の**平均**を分けて考えるのが重要である。

## 6. 演習

特記しない限り、$y>0$、$t>0$、$\rho,\eta,\nu=\eta/\rho>0$ は一定、圧力勾配・体積力は零、壁は $y=0$、速度は $v=(u(y,t),0,0)$ とする。記号 $\operatorname{erfc}$、$U$、$\omega$、$\delta$ は本文と同じ意味で用いる。

### Level A

### A1. 非線形項が消える理由

$u$ が $y,t$ のみの関数であるとき、非圧縮条件と Navier–Stokes の移流項を直交座標で求め、拡散方程式が出る理由を説明せよ。

- Level: A

<!-- solution-start -->
#### 詳細解答

$v=(u,0,0)$ なので $\nabla\cdot v=\partial_xu+\partial_y0+\partial_z0=0$。また $(v\cdot\nabla)v=(u\partial_x+0\partial_y+0\partial_z)(u,0,0)=(u\partial_xu,0,0)=0$。圧力勾配・体積力を零とすれば $\rho u_t=\eta(\partial_{xx}u+\partial_{yy}u+\partial_{zz}u)=\eta u_{yy}$。$\rho>0$ で割り $\nu=\eta/\rho$ とおいて $u_t=\nu u_{yy}$。
<!-- solution-end -->

### A2. 相補誤差関数の微分と初期値

$u=U\operatorname{erfc}(y/(2\sqrt{\nu t}))$ の $u_y,u_t$ を計算し、$y>0$ での初期値と $y=0$ での壁条件を確かめよ。

- Level: A

<!-- solution-start -->
#### 詳細解答

$\xi=y/(2\sqrt{\nu t})$ とすると、$\xi_y=1/(2\sqrt{\nu t})$、$\xi_t=-\xi/(2t)$。$\operatorname{erfc}'(\xi)=-2e^{-\xi^2}/\sqrt\pi$ より $u_y=-Ue^{-\xi^2}/\sqrt{\pi\nu t}$、$u_t=U\xi e^{-\xi^2}/(\sqrt\pi t)$。$y>0$ を固定し $t\downarrow0$ とすれば $\xi\to\infty$ なので $u\to0$。$y=0,t>0$ なら $\xi=0$ で $u=U$。$(0,0)$ には両方を同時に連続延長できない。
<!-- solution-end -->

### A3. 閾値厚さと次元

$\alpha=\operatorname{erfc}(1)$ の閾値厚さを求めよ。$\nu$ の単位が m²/s であることから厚さの次元を確認せよ。

- Level: A

<!-- solution-start -->
#### 詳細解答

$u(\delta_\alpha(t),t)/U=\operatorname{erfc}(\delta_\alpha/(2\sqrt{\nu t}))=\operatorname{erfc}(1)$。$\operatorname{erfc}$ は狭義単調減少なので引数は $1$、$\delta_\alpha=2\sqrt{\nu t}$。$[\nu t]=(\mathrm{m^2/s})\cdot\mathrm s=\mathrm{m^2}$ より $[\delta_\alpha]=\mathrm m$。
<!-- solution-end -->

### A4. 周期場の振幅と位相

第二問題の $\delta=\sqrt{2\nu/\omega}$ について、$y=\delta$ の速度振幅と壁に対する位相遅れ、単位を求めよ。

- Level: A

<!-- solution-start -->
#### 詳細解答

$u(y,t)=Ue^{-y/\delta}\cos(\omega t-y/\delta)$ だから、$y=\delta$ で振幅は $U/e$、壁の $\cos(\omega t)$ に対して位相遅れは $1\,\mathrm{rad}$。$\nu/\omega$ の次元は $(\mathrm{m^2/s})/(\mathrm{s^{-1}})=\mathrm{m^2}$ なので $\delta$ は m。位相は $y/\delta$ で無次元である。
<!-- solution-end -->

### A5. 壁面のせん断力の向き

第一問題の $u_y(0+,t)<0$ を使い、壁が流体へ与える $x$ 方向の力と流体が壁へ与える力の向きを、流体領域の外法線とともに述べよ。

- Level: A

<!-- solution-start -->
#### 詳細解答

[Newton 応力](../../CTM/CTM15/index.md#def-ctm15-incompressible-newtonian)で $\sigma_{xy}=\eta u_y<0$。壁での流体領域の外法線は $n=-e_y$、従って流体へ作用する traction の $x$ 成分は $(\sigma n)_x=-\eta u_y>0$ であり $+x$ 向き。作用反作用により流体が壁へ与える力は $-x$ 向きである。$\eta u_y$ をそのまま壁の流体への力と誤認すると符号が逆になる。
<!-- solution-end -->

### Level B

### B1. 相似変数から第一問題を再構成

$u(y,t)=UF(\xi)$、$\xi=y/(2\sqrt{\nu t})$ と置いて常微分方程式を導き、$F(0)=1$、$F(\infty)=0$ から $F$ を決定せよ。

- Level: B

<!-- solution-start -->
#### 詳細解答

$\xi_t=-\xi/(2t)$、$\xi_y=(2\sqrt{\nu t})^{-1}$ より $u_t=-U\xi F'/(2t)$、$u_{yy}=UF''/(4\nu t)$。$u_t=\nu u_{yy}$ は $F''+2\xi F'=0$ と同値。$(e^{\xi^2}F')'=0$ より $F'=Ce^{-\xi^2}$、$F=1+C\int_0^\xi e^{-q^2}dq$。$F(\infty)=0$、$\int_0^\infty e^{-q^2}dq=\sqrt\pi/2$ から $C=-2/\sqrt\pi$。従って $F=\operatorname{erfc}(\xi)$。$F'(\xi)<0$ なので壁から単調に減少する。
<!-- solution-end -->

### B2. 壁の力積と全運動量

第一問題で $M(t)=\rho\int_0^\infty u\,dy$ を直接計算し、$f(t)=-\eta u_y(0+,t)$ の積分と一致することを確認せよ。

- Level: B

<!-- solution-start -->
#### 詳細解答

$y=2\sqrt{\nu t}\,\xi$ と変数変換して $M=2\rho U\sqrt{\nu t}\int_0^\infty\operatorname{erfc}(\xi)d\xi$。非負の二重積分を順序交換すると

$$
\int_0^\infty\operatorname{erfc}(\xi)d\xi
=\frac2{\sqrt\pi}\int_0^\infty\int_\xi^\infty e^{-q^2}dq\,d\xi
=\frac2{\sqrt\pi}\int_0^\infty q e^{-q^2}dq
=\frac1{\sqrt\pi}.
$$

従って $M=2\rho U\sqrt{\nu t}/\sqrt\pi$。一方 $f(t)=\eta U/\sqrt{\pi\nu t}$ だから $\int_0^t f(s)ds=2\eta U\sqrt t/\sqrt{\pi\nu}=2\rho U\sqrt{\nu t}/\sqrt\pi=M(t)$。$t=0$ の力は無限大でも、積分した力積は有限である。
<!-- solution-end -->

### B3. 複素振幅から周期解を導く

第二問題を $u=\operatorname{Re}\{A(y)e^{i\omega t}\}$ として解け。指数関数のどちらの根を採用するか、壁条件と遠方条件から説明せよ。

- Level: B

<!-- solution-start -->
#### 詳細解答

全時刻の等式 $u_t=\nu u_{yy}$ から $i\omega A=\nu A''$。指数解 $A=e^{\lambda y}$ を代入すると $\lambda^2=i\omega/\nu$。$(1+i)^2=2i$ を使うと二根は $\pm(1+i)/\delta$、$\delta=\sqrt{2\nu/\omega}>0$。一般解 $A=C_+e^{(1+i)y/\delta}+C_-e^{-(1+i)y/\delta}$ の第一項は $y\to\infty$ で発散するため $C_+=0$。壁 $A(0)=U$ から $C_-=U$。実部をとり $u=Ue^{-y/\delta}\cos(\omega t-y/\delta)$。時間が $T=2\pi/\omega$ 増すと余弦の位相が $2\pi$ 増すため周期的である。
<!-- solution-end -->

### B4. 壁の平均仕事と内部散逸

第二問題の $u$ を $y$ で微分して壁が流体へ加える力 $f(t)$ を求め、一周期の壁仕事と $\int_0^\infty\eta u_y^2dy$ の周期平均が一致することを確かめよ。

- Level: B

<!-- solution-start -->
#### 詳細解答

$\theta=\omega t-y/\delta$ とすると $u_y=(U/\delta)e^{-y/\delta}(-\cos\theta+\sin\theta)$。$n=-e_y$ だから $f=-\eta u_y(0,t)=(\eta U/\delta)(\cos\omega t-\sin\omega t)$。壁仕事の平均は

$$
\langle f U\cos\omega t\rangle
=\frac{\eta U^2}{\delta}\left(\frac12-0\right)
=\frac{\eta U^2}{2\delta}.
$$

$D_{xy}=D_{yx}=u_y/2$ より単位体積当たり散逸は $\eta u_y^2$。周期平均で $\langle(-\cos\theta+\sin\theta)^2\rangle=1$ となり、

$$
\left\langle\int_0^\infty\eta u_y^2dy\right\rangle
=\frac{\eta U^2}{\delta^2}\int_0^\infty e^{-2y/\delta}dy
=\frac{\eta U^2}{\delta^2}\frac{\delta}{2}.
$$

供給仕事と散逸は一致して正である。ただし瞬間的な仕事率 $f(t)U\cos(\omega t)$ は常に正とは限らない。
<!-- solution-end -->

### Level C

### C1. 急発進と周期駆動の力・長さ尺度を比較する

同じ $\rho,\eta,U>0$ の半空間流体について、第一問題の閾値厚さを $\alpha=\operatorname{erfc}(1)$ で定め、第二問題の角振動数を $\omega>0$ とする。

1. 第一問題の閾値厚さと第二問題の振動浸透深さが等しくなる時刻 $t_*$ を求めよ。
2. この時刻の第一問題の壁面力密度 $f_1(t_*)$ と、第二問題の壁面力密度の時間振幅 $F_2$ の比を求めよ。
3. 第二問題の一周期の平均仕事率を求め、「二つの厚さが一致すること」が同一の速度分布や同一の力学的仕事を意味しない理由を述べよ。

- Level: C

<!-- solution-start -->
#### 詳細解答

**(1)** [閾値厚さ](#def-fluid17-penetration-thickness)は $\delta_\alpha(t)=2\sqrt{\nu t}$。[振動浸透深さ](#thm-fluid17-second-profile)は $\delta=\sqrt{2\nu/\omega}$。二乗して $4\nu t_*=2\nu/\omega$、$\nu>0$ で割り $t_*=1/(2\omega)>0$。

**(2)** [第一問題の壁面力](#thm-fluid17-first-momentum)に代入すると

$$
f_1(t_*)=\frac{\eta U}{\sqrt{\pi\nu/(2\omega)}}
=\eta U\sqrt{\frac{2\omega}{\pi\nu}}.
$$

第二問題では $f_2(t)=(\eta U/\delta)(\cos\omega t-\sin\omega t)$。直交する二つの正弦波の合成振幅は $F_2=\sqrt2\,\eta U/\delta=\eta U\sqrt{\omega/\nu}$。従って $f_1(t_*)/F_2=\sqrt{2/\pi}$。第二問題の振幅を $\eta U/\delta$ と誤って答えると係数 $\sqrt2$ を落とす。

**(3)** [周期平均仕事公式](#prop-fluid17-second-work)から $\langle P_2\rangle=\eta U^2/(2\delta)=\eta U^2\sqrt{\omega/(2\nu)}/2$。第一問題の速度は $\operatorname{erfc}(y/(2\sqrt{\nu t_*}))$ の単調な正の形、第二問題では $e^{-y/\delta}\cos(\omega t-y/\delta)$ で符号が位置と時刻に依存する。第一問題は静止初期値と一定壁速度、第二問題は既存の周期場と振動壁速度であり、同じ一つの距離尺度は同じ初期値問題を指定しない。第一問題の $f_1(t_*)U$ は瞬間の正の仕事、第二問題は一周期平均の仕事なので、比較する時間平均操作も異なる。
<!-- solution-end -->

## 7. 学習のまとめ

- 非定常の一方向 Newton 流では移流項は**形から厳密に零**となり、$u_t=\nu u_{yy}$ が現れる。
- 急発進の相似解は $\operatorname{erfc}$。拡散長は $\sqrt{\nu t}$、壁の力は $t^{-1/2}$ で減り、運動量は $\sqrt t$ で増える。
- 正弦振動壁の単一周波数周期解は振幅 $e^{-y/\delta}$、位相遅れ $y/\delta$、$\delta=\sqrt{2\nu/\omega}$。周期の平均仕事は散逸に等しい。
- 時刻 $0$ の静止場と全時刻の周期応答は別のデータであり、周期解を突然の振動開始の完全解と取り違えない。
