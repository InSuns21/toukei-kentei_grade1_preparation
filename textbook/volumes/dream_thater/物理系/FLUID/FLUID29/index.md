# FLUID29 浅水近似はどの保存則を残すか

## この講義で解決すること

[FLUID27 の自由表面波の分散式](../FLUID27/index.md#thm-fluid27-dispersion)は、波長に対して水深が十分小さいと、表面張力を無視した長波の位相速度がほぼ $\sqrt{gH}$ になることを示した。しかし波が大きくなっても、水面の高さと流量を一つずつの変数で予測できるだろうか。水深方向の速度分布を全部解く代わりに、**水柱一本を一つの物体として扱う**と、保存則はどこまで残るのかを問う。

本講は、一定密度・非圧縮・非粘性の液体を一方向の水平運動に限り、底面は固定され、水深が水平スケールより小さく、鉛直加速度が重力に比べて小さい場合を考える。自由表面には一様な気圧が働き、表面張力、底面摩擦、雨や流入出は無視する。水深は正とし、乾燥・砕波・跳水の内部構造はまだ扱わない。先に[質量の検査体積収支](../FLUID5/index.md#thm-fluid5-moving-mass)と[一定密度 Euler 方程式](../FLUID6/index.md#thm-fluid6-euler-equation)を学んだことを使うが、鉛直積分を省略せず追う。

## 0. 水柱・地形・流量をどう測るか

水平位置を $x$ [m]、鉛直上向きを $z$ [m]、時刻を $t$ [s] とする。固定底面の標高を $b(x)$ [m]、自由表面の標高を $\eta(x,t)$ [m] とし、水深を $h=\eta-b>0$ [m] とする。液体領域は $b(x)<z<\eta(x,t)$。重力加速度の大きさは $g>0$ [m/s$^2$]、一定密度は $\rho>0$ [kg/m$^3$] で、重力は鉛直下向きに作用する。

二次元断面の水平・鉛直速度をそれぞれ $v(x,z,t)$、$w(x,z,t)$ [m/s] とする。断面は紙面に垂直な方向へ一様とし、以下の質量やエネルギーの積分は**その方向の単位幅当たり**で表す。底面は十分滑らかで、考える時間区間で水面は単一値の滑らかなグラフを保つ。$b$ は時間に依存しない。

深さで平均した水平速度 $\bar u$ と、単位幅当たりの水平体積流量 $q$ を導入する。$q$ は速度ではなく、幅1 mの断面を毎秒通る体積をその幅で割った量である。

<a id="def-fluid29-depth-discharge"></a>

<!-- formal-statement-start -->
> **定義（水深平均速度と単位幅流量）**  
> $b(x)<\eta(x,t)$ で $h=\eta-b>0$、水平速度 $v$ が深さ方向に可積分なとき、水深平均速度 $\bar u$ [m/s] と単位幅流量 $q$ [m$^2$/s] を

$$
\bar u(x,t)=\frac{1}{h(x,t)}\int_{b(x)}^{\eta(x,t)}v(x,z,t)\,dz,
\qquad q(x,t)=h(x,t)\bar u(x,t)
$$

> と定める。$q>0$ は $+x$ 向きの正味の流量、$q<0$ は $-x$ 向きの流量である。
<!-- formal-statement-end -->

<!-- definition-example-start: def-fluid29-depth-discharge -->
**定義の確認**：平らな底 $b=0$、表面 $\eta=2$ m、水平速度が $v(z)=1+z$ m/s（$z$ を m 単位の数値として代入）なら、$h=2$ m は正で、速度は深さ方向に積分可能である。

$$
q=\int_0^2(1+z)\,dz
=\left[z+\frac{z^2}{2}\right]_0^2
=4\ {\rm m^2/s},
\qquad \bar u=\frac{q}{h}=2\ {\rm m/s}.
$$

速度を上端値 $3$ m/s で代用すると $q=6$ m$^2$/s となり、定義を満たさない。浅水近似を使う前から $q=h\bar u$ は**定義による厳密な恒等式**である。
<!-- definition-example-end -->

ここで「浅い」とは水深そのものが数 cm という意味ではない。代表水深 $H>0$、水平変化長 $L>0$、代表水平速度 $U>0$ に対して $\varepsilon=H/L\ll1$ とし、代表流速と重力の比を $Fr=U/\sqrt{gH}=O(1)$ とする。底と水面の典型的勾配も $O(\varepsilon)$、鉛直速度は $w=O(\varepsilon U)$、速度の鉛直方向の変化は主要な水平運動を変えないほど小さいと仮定する。これは**長波・静水圧近似**の使用範囲であり、鉛直循環・境界層・波数に依存する波速差・表面張力・砕波を再現するものではない。

## 1. 自由表面と底で流体を通さないと何が残るか

まず深さ平均速度を使わず、元の流速で正確な質量収支を導く。以後、$f_x=\partial f/\partial x$、$f_t=\partial f/\partial t$、$f_z=\partial f/\partial z$ は**ほかの独立変数を固定した偏微分**であり、$\partial_x f$ などと同じ意味で用いる。非圧縮条件は $\partial_xv+\partial_zw=0$。水面の運動学条件は $w_s=\eta_t+v_s\eta_x$、固定底面の非貫通条件は $w_b=v_b b_x$ である。添字 $s,b$ は、それぞれ $z=\eta$ と $z=b$ における値を示す。底面で $w=0$ とするのは、$b_x=0$ の場合に限られる。

<a id="thm-fluid29-depth-mass"></a>

<!-- formal-statement-start -->
> **定理（鉛直積分による水深の質量保存）**  
> 固定した滑らかな底 $b(x)$ と単一値の滑らかな水面 $\eta(x,t)$ の間で、$C^1$ 級の非圧縮速度 $(v,w)$ が $\partial_xv+\partial_zw=0$、$w_s=\eta_t+v_s\eta_x$、$w_b=v_b b_x$ を満たし、$h=\eta-b>0$ とする。[水深平均速度と流量](#def-fluid29-depth-discharge)を用いると

$$
\boxed{h_t+q_x=0,\qquad q=\int_b^\eta v\,dz.}
$$

> この等式は静水圧近似に先立って成り立ち、$q$ の単位は m$^2$/s、各項の単位は m/s である。
<!-- formal-statement-end -->

### 証明の見取り図

可変積分端点で微分すると、内部の速度勾配に加えて両端の速度と底・水面の傾きが現れる。それを表面条件と照合することで相殺する。

<!-- proof-start -->
### 証明

積分の上下端が $x$ に依存する。ある位置の近くで両端の間に固定した高さ $z_0$ を取り、$G(x,z)=\int_{z_0}^{z}v(x,\zeta,t)\,d\zeta$ と置く（この微分では $t$ は固定する）。$G_z=v$、$G_x=\int_{z_0}^{z}v_x\,d\zeta$ である。$q=G(x,\eta(x,t))-G(x,b(x))$ に連鎖律を使うと

$$
q_x=\int_b^\eta v_x\,dz+v_s\eta_x-v_bb_x.
$$

非圧縮条件 $v_x=-w_z$ を積分すると

$$
\int_b^\eta v_x\,dz=-\int_b^\eta w_z\,dz=-w_s+w_b.
$$

したがって

$$
\begin{aligned}
q_x&=-w_s+w_b+v_s\eta_x-v_bb_x\\
&=-(\eta_t+v_s\eta_x)+v_bb_x+v_s\eta_x-v_bb_x\\
&=-\eta_t.
\end{aligned}
$$

$b_t=0$ だから $h_t=\eta_t$。よって $h_t+q_x=0$。
<!-- proof-end -->

**具体例**：幅方向に一様な水路で、左断面から $q_{\rm in}=3$ m$^2$/s、右断面から $q_{\rm out}=2$ m$^2$/s が流れると、長さ $10$ m の区間の単位幅当たり貯水断面積の増加率は $3-2=1$ m$^2$/s である。これは区間積分 $d\int h\,dx/dt=q_{\rm in}-q_{\rm out}$ と一致する。上式は水柱の量が増減しても密度を別に解かなくてよい理由を示す。

## 2. 鉛直加速度を捨てると圧力はどうなるか

[一定密度 Euler 方程式](../FLUID6/index.md#thm-fluid6-euler-equation)の鉛直成分は、気圧を一定値 $p_a$ として

$$
w_t+v w_x+w w_z=-\frac{p_z}{\rho}-g.
$$

$w=O(\varepsilon U)$、時間尺度 $L/U$、水平微分尺度 $1/L$、鉛直微分尺度 $1/H$ を代入すると、左辺の各項は $O(\varepsilon U^2/L)$。これを $g$ と比べると $\varepsilon U^2/(Lg)=\varepsilon^2 Fr^2$ である。$\varepsilon\ll1$、$Fr=O(1)$ の長波模型では、先頭次数で $p_z=-\rho g$ と置ける。

<a id="prop-fluid29-hydrostatic"></a>

<!-- formal-statement-start -->
> **命題（浅水長波の静水圧近似）**  
> 密度 $\rho>0$ が一定で、固定底 $b$、単一値自由表面 $\eta$、$p(x,\eta,t)=p_a$ を持つ液体を考える。水深比 $\varepsilon=H/L\ll1$、$Fr=O(1)$、鉛直加速度と重力の比が $O(\varepsilon^2Fr^2)$ であるとき、鉛直運動方程式の先頭次数は

$$
p_z=-\rho g,\qquad p(x,z,t)=p_a+\rho g\bigl(\eta(x,t)-z\bigr).
$$

> 水平方向の圧力勾配は、$z$ を固定して $p_x=\rho g\eta_x$ となる。
<!-- formal-statement-end -->

### 証明の見取り図

鉛直成分の小さい加速度を落としたあと、$z$ について一回積分する。積分定数を水面の気圧条件から定める。

<!-- proof-start -->
### 証明

$0=-p_z/\rho-g$ から $p_z=-\rho g$。固定した $(x,t)$ で $z$ から $\eta$ まで積分すると

$$
p(x,\eta,t)-p(x,z,t)=\int_z^\eta(-\rho g)\,d\zeta=-\rho g(\eta-z).
$$

$p(x,\eta,t)=p_a$ を代入すれば主張の圧力式となる。$p_a,\rho,g$ は一定なので、位置 $z$ を固定して微分すると $p_x=\rho g\eta_x$ を得る。
<!-- proof-end -->

例えば $\eta=3$ m、$z=1$ m、$\rho=1000$ kg/m$^3$、$g=9.8$ m/s$^2$ なら $p-p_a=19600$ Pa。地形の標高 $b$ は、ここでは圧力の式に直接は現れず、**水面標高 $\eta=h+b$** を通じて効く。

## 3. 水柱の水平運動を保存形へ直す

静水圧だけではまだ鉛直方向の平均流速が決まらない。浅水の追加仮定として、水平速度の鉛直変化を先頭次数では無視し、$v\simeq u(x,t):=\bar u$ と置く。一般に $\int v^2dz\ne h\bar u^2$ なので、深さ平均速度の定義だけからこの近似は出ない。鉛直速度分布が強く偏る流れでは、運動量補正が必要である。

水平 Euler 方程式 $v_t+v v_x+w v_z=-p_x/\rho$ はこの近似と[静水圧式](#prop-fluid29-hydrostatic)によって

$$
u_t+u u_x=-g\eta_x=-g(h_x+b_x)
$$

となる。ここでは $h>0$ で、$u=q/h$ と書ける。

<a id="thm-fluid29-shallow-water"></a>

<!-- formal-statement-start -->
> **定理（一次元非粘性浅水方程式）**  
> 滑らかな時間に依存しない底面 $b(x)$ の上で、水深 $h(x,t)>0$ と水深平均速度 $u(x,t)$ が十分滑らかであり、一定密度・非圧縮・非粘性、静水圧、鉛直方向に一様な先頭次数の水平速度を仮定する。$g>0$ を定数、単位幅流量を $q=hu$ とすると、先頭次数の質量と水平運動量は

$$
\boxed{\begin{aligned}
h_t+q_x&=0,\\
q_t+\partial_x\left(\frac{q^2}{h}+\frac12 gh^2\right)&=-ghb_x.
\end{aligned}}
$$

> 第2式の左辺の括弧は運動量の**移流＋静水圧**流束であり、右辺は底面の傾きが水柱に及ぼす水平力である（いずれも密度で割った単位幅当たりの量）。平底 $b_x=0$ の場合は両式が保存形となる。
<!-- formal-statement-end -->

### 証明の見取り図

速度の方程式に $h$ を掛ける。質量式を使うと、積の微分で出る余分な $u(h_t+(hu)_x)$ が消える。水面の傾きを $h_x+b_x$ に分け、$ghh_x$ を水圧流束として左へ移す。

<!-- proof-start -->
### 証明

水深の[質量保存](#thm-fluid29-depth-mass)に $q=hu$ を入れると $h_t+(hu)_x=0$。積の微分から

$$
\begin{aligned}
(hu)_t+(hu^2)_x
&=h u_t+u h_t+h_xu^2+2huu_x\\
&=h(u_t+uu_x)+u\bigl(h_t+u h_x+h u_x\bigr)\\
&=h(u_t+uu_x)+u\bigl(h_t+(hu)_x\bigr)\\
&=h(u_t+uu_x).
\end{aligned}
$$

水平加速度 $u_t+uu_x=-g(h_x+b_x)$ を代入して

$$
(hu)_t+(hu^2)_x=-ghh_x-ghb_x.
$$

$ghh_x=\partial_x(gh^2/2)$ を左辺に移し、$q=hu$、$hu^2=q^2/h$ を代入して結論を得る。
<!-- proof-end -->

**平底の定常例**：$b$ が一定、$h=h_0>0$ と $u=u_0$ がともに一定なら、$q=h_0u_0$、流束 $q^2/h+gh^2/2$ は空間定数なので両式が成り立つ。**起伏のある底では $h$ を定数にした静水は一般には解にならない**。この差を後で確かめる。

## 4. 波が伝わる速さはどこから出るか

平らな底で、水深 $h>0$ と流量 $q$ を列ベクトル $V=(h,q)^{\mathsf T}$ の二成分として並べる。[浅水方程式](#thm-fluid29-shallow-water)の保存形は $V_t+F(V)_x=0$、流束は $F(V)=(q,q^2/h+gh^2/2)^{\mathsf T}$ である。$DF(V)$ は、この二成分の流束を変数 $(h,q)$ でそれぞれ偏微分した $2\times2$ 行列（Jacobian）を表す。滑らかな状態では連鎖律から $F(V)_x=DF(V)V_x$ となる。

なぜこの行列の固有値が波の速さを表すのか。一定状態 $V_0=(h_0,q_0)^{\mathsf T}$（$h_0>0$）の近くで $V=V_0+\delta V$ とし、擾乱の一次項だけを残す。$A_0=DF(V_0)$ と置けば、$V_0$ は一定なので

$$
\delta V_t+A_0\delta V_x=0
$$

となる。一定の形を保って速度 $\lambda$ で進む微小波を $\delta V=r\,\psi(x-\lambda t)$ と仮定する。ここで $r\ne0$ は二成分の定数ベクトル、$\psi$ は微分可能な1変数関数で、$\psi'$ は引数 $s=x-\lambda t$ に関する常微分 $d\psi(s)/ds$ を表す。$V_t$ や $V_x$ の偏微分とは区別し、$\psi'$ が恒等的に零ではない波形を考える。連鎖律で $\delta V_t=-\lambda r\psi'$、$\delta V_x=r\psi'$ だから、

$$
(A_0-\lambda I)r\,\psi'=0
\quad\Longrightarrow\quad
(A_0-\lambda I)r=0.
$$

非零の $r$ が存在するには $\det(A_0-\lambda I)=0$ が必要である。このため固有値を微小波の**特性速度**として判定できる。以下では各滑らかな局所状態で同じ行列を計算する。

<a id="thm-fluid29-characteristics"></a>

<!-- formal-statement-start -->
> **定理（浅水方程式の特性速度）**  
> 平底上の一次元非粘性浅水方程式で $g>0$、$h>0$、$q=hu$ とする。滑らかな状態の流束 Jacobian は

$$
A(h,q)=DF(h,q)=
\begin{pmatrix}
0&1\\
gh-q^2/h^2&2q/h
\end{pmatrix}.
$$

> その固有値は二つの異なる実数であり、特性速度は

$$
\boxed{\lambda_-=u-\sqrt{gh},\qquad
\lambda_+=u+\sqrt{gh}.}
$$

> 静止水 $u=0$ の微小長波の速さは両向きに $\sqrt{gh}$。$h\to0^+$ で二つの速度が近づくため、乾燥境界をこの $h>0$ の導出だけで扱ってはならない。
<!-- formal-statement-end -->

### 証明の見取り図

流束の二つの成分を偏微分して行列を作り、二次の特性方程式を平方完成する。正の水深が、二つの実固有値を保証する。

<!-- proof-start -->
### 証明

$\partial_h(q^2/h+gh^2/2)=-q^2/h^2+gh$、$\partial_q(q^2/h+gh^2/2)=2q/h$。$u=q/h$ と書くと

$$
\begin{aligned}
\det(A-\lambda I)
&=(-\lambda)(2u-\lambda)-(gh-u^2)\\
&=\lambda^2-2u\lambda+u^2-gh\\
&=(\lambda-u)^2-gh.
\end{aligned}
$$

これが零になるのは $\lambda=u\pm\sqrt{gh}$ である。$g,h>0$ なら $\sqrt{gh}>0$ で二根は異なり実数である。
<!-- proof-end -->

**線形波との接続**：平底の静水 $(h,u)=(H,0)$（$H>0$）へ $h=H+\zeta$、$u=v$（$|\zeta|/H, |v|/\sqrt{gH}\ll1$）を入れる。ここでの $v=v(x,t)$ は**水深平均速度の微小擾乱**であり、第0節の深さ依存速度 $v(x,z,t)$ とは異なる局所記号である。一次項だけ取ると

$$
\zeta_t+Hv_x=0,\qquad v_t+g\zeta_x=0.
$$

前式を時間微分し、後式を $x$ で微分して代入すると

$$
\zeta_{tt}+H(v_t)_x
=\zeta_{tt}-gH\zeta_{xx}=0.
$$

これは伝播速度 $c_0=\sqrt{gH}$ の波動方程式であり、[FLUID27 の重力波の浅水極限](../FLUID27/index.md#prop-fluid27-depth-limits)と一致する。表面張力や有限水深による波速の波数依存性を残した先行模型と違い、浅水模型の**先頭次数では波速が波数に依存しない**。局所速度 $|u|/\sqrt{gh}$ を Froude 数と見ると、$|u|<\sqrt{gh}$ で二特性は逆向き、$u>\sqrt{gh}$ なら二つとも右向きになる。

## 5. 起伏のある底でも静止していられるか

$H$ を一定の**湖面標高**とし、$b(x)<H$ の範囲で $h(x)=H-b(x)$、$u=q=0$ と置く。ここで水面標高は $h+b=H$ で水平だが、水深は起伏に合わせて変わる。

<a id="prop-fluid29-lake-rest"></a>

<!-- formal-statement-start -->
> **命題（湖面静止の釣合解）**  
> $b$ が $C^1$ 級、定数 $H$ が各点で $H>b(x)$ を満たし、$g>0$ とする。このとき

$$
h(x,t)=H-b(x)>0,\quad q(x,t)=0,\quad
\eta(x,t)=h(x,t)+b(x)=H
$$

> は[浅水方程式](#thm-fluid29-shallow-water)の静止解である。質量の蓄積と流束はともに零であり、運動量流束の空間勾配は底面力と相殺する。
<!-- formal-statement-end -->

### 証明の見取り図

水面を水平に保てば $h_x=-b_x$。静水圧の水平勾配は底の斜面による圧力の水平成分に打ち消される。

<!-- proof-start -->
### 証明

$h_t=0$、$q_x=0$ なので質量式は満たされる。運動量式の左辺は $q_t=0$ および

$$
\partial_x\left(\frac{q^2}{h}+\frac12gh^2\right)
=\partial_x\left(\frac12gh^2\right)
=ghh_x=-ghb_x.
$$

これは右辺と等しい。$H>b$ が全点で成り立つので、水深による割り算にも問題はない。
<!-- proof-end -->

**定義・釣合の具体例**：$b(x)=0.2\exp(-x^2)$ m、$H=1$ m、$x$ は m 単位なら $0\le b\le0.2$ m、$h=1-b\ge0.8$ m。中央では水深が $0.8$ m、遠方で $1$ m に近づくが、**自由表面は全点で $1$ m** であり流量 $q$ は零である。水深一定 $h=1$ とする誤った設定では $\eta_x=b_x$ が残り、式 $u_t=-g\eta_x$ により斜面で動き始めてしまう。

## 6. エネルギーは消えずに残るのか

平底に限らず、[FLUID6 の位置水頭](../FLUID6/index.md#def-fluid6-head)に現れる高さ $z$ の重力ポテンシャル $gz$ を水柱の全高さで積分する。さらに[浅水模型の鉛直一様速度の仮定](#thm-fluid29-shallow-water)により $v\simeq u=q/h$ だから、密度 $\rho$ で割った単位幅当たりの運動エネルギーは

$$
\int_b^{b+h}\frac{v^2}{2}\,dz
\simeq\int_b^{b+h}\frac{u^2}{2}\,dz
=\frac{hu^2}{2}=\frac{q^2}{2h}.
$$

一方、重力ポテンシャルの寄与は、底面を積分の下端にして

$$
\int_b^{b+h}gz\,dz
=\frac g2\bigl((b+h)^2-b^2\bigr)
=ghb+\frac12gh^2.
$$

よって運動と位置の寄与を足した量を次のように定義する。$ghb$ を落とすと起伏上のエネルギー収支が閉じない。

<a id="def-fluid29-column-energy"></a>

<!-- formal-statement-start -->
> **定義（水柱の力学的エネルギー）**  
> $h>0$、$q=hu$、固定底面 $b$、一定 $g>0$ の浅水模型で、密度 $\rho$ で割った単位幅当たりの力学的エネルギーを

$$
E(h,q,b)=\frac{q^2}{2h}+\frac12gh^2+ghb
$$

> とする。第1項が水平運動、第2・3項が重力ポテンシャルの寄与で、$[E]={\rm m^3/s^2}$。質量密度を掛けた $\rho E$ は水平単位面積当たりのエネルギー [J/m$^2$] であり、区間で $\int\rho E\,dx$ と積分すると単位幅当たり [J/m] になる。重力ポテンシャルの基準値は $z=0$ の選び方で変わる。
<!-- formal-statement-end -->

<!-- definition-example-start: def-fluid29-column-energy -->
**定義の確認**：水平な底 $b=0$、水深 $h=2$ m、平均速度 $u=3$ m/s、$g=9.8$ m/s$^2$ なら $q=6$ m$^2$/s で

$$
E=\frac{6^2}{2\cdot2}+\frac{9.8}{2}\cdot2^2
=9+19.6=28.6\ {\rm m^3/s^2}.
$$

運動の寄与は $hu^2/2=9$、重力の寄与は $gh^2/2=19.6$ である。底面標高の効果も直接確かめるため、水深と流速は変えず $b=1$ m とする。このとき $\eta=b+h=3$ m で、水深の正値と $q=hu=6$ m$^2$/s は保たれ、

$$
E=\underbrace{9}_{hu^2/2}
+\underbrace{19.6}_{gh^2/2}
+\underbrace{9.8\cdot2\cdot1}_{ghb}
=48.2\ {\rm m^3/s^2}.
$$

底を1 m高くした分だけ $ghb=19.6$ m$^3$/s$^2$ 増える。三項と各項の単位を確かめたので、平底の場合だけでなく定義の全ての寄与を確認できる。
<!-- definition-example-end -->

<a id="thm-fluid29-energy"></a>

<!-- formal-statement-start -->
> **定理（滑らかな浅水流のエネルギー保存）**  
> $g>0$、時間に依存しない $C^1$ 級の底面 $b$ の上で、$h>0$、$u$ が滑らかな[浅水方程式](#thm-fluid29-shallow-water)の解なら、[水柱エネルギー](#def-fluid29-column-energy)は

$$
\boxed{E_t+\partial_x\left[u\left(E+\frac12gh^2\right)\right]=0}
$$

> を満たす。固定区間 $[a,c]$ では、全エネルギーの時間変化は端点からのエネルギー流束差で決まる。この等式は滑らかな解についての主張であり、不連続な跳水にそのまま適用しない。
<!-- formal-statement-end -->

### 証明の見取り図

速度式へ $hu$ を掛けると運動エネルギーの収支になり、質量式へ $g(h+b)$ を掛けると重力の項になる。地形源項は重力ポテンシャルの寄与へ取り込まれる。

<!-- proof-start -->
### 証明

質量式 $h_t+(hu)_x=0$、速度式 $u_t+uu_x+g(h+b)_x=0$ を使う。積の微分より

$$
\begin{aligned}
\partial_t\left(\frac12hu^2\right)+
\partial_x\left(\frac12hu^3\right)
&=hu(u_t+uu_x)+\frac12u^2\left(h_t+(hu)_x\right)\\
&=-ghu(h+b)_x.
\end{aligned}
$$

また $b_t=0$ より

$$
\partial_t\left(\frac12gh^2+ghb\right)
=g(h+b)h_t=-g(h+b)(hu)_x.
$$

両式を足すと

$$
\begin{aligned}
E_t+\partial_x\left(\frac12hu^3\right)
&=-g\{hu(h+b)_x+(h+b)(hu)_x\}\\
&=-\partial_x\{g(h+b)hu\}.
\end{aligned}
$$

右辺の積を左へ移すと流束は

$$
\frac12hu^3+g(h+b)hu
=u\left(\frac12hu^2+\frac12gh^2+ghb+\frac12gh^2\right)
=u(E+gh^2/2).
$$

これで結論を得る。
<!-- proof-end -->

粘性や底面摩擦は最初から模型に含めていない。滑らかな流れでは力学的エネルギーは保存されるが、跳水を含む弱い解で**エネルギーも常に等号で保存される**とは限らない。流速の不連続を挟む収支と散逸は次講で調べる。

## 7. 保存を壊さず数値実験するには

平底なら[浅水方程式](#thm-fluid29-shallow-water)の質量と運動量はともに保存形である。幅 $\Delta x>0$ のセル $i$ における平均 $V_i=(h_i,q_i)^{\mathsf T}$ を取り、セルの両端で隣接セルと共有する数値流束 $\widehat F$ を用いると

$$
V_i^{n+1}=V_i^n-\frac{\Delta t}{\Delta x}
\left(\widehat F_{i+1/2}-\widehat F_{i-1/2}\right)
$$

と更新できる。隣接セルの共通面で流束が逆符号で打ち消し合うため、総水量 $\sum_i h_i\Delta x$ は**境界流束以外で増減しない**。非線形波の先端では流れが滑らかなままである保証はなく、滑らかな状態の局所微分行列 $DF(V)$ だけで不連続をまたぐ流量を表すより、この有限体積形式が適する。

本講のラボでは $h>0$ の湿潤状態に限る。平底のダム決壊には $|u|+\sqrt{gh}$ を最大波速に選んだ局所 Lax–Friedrichs（Rusanov）流束を使い、反射壁を置いて総水量と最小水深を測る。さらに**起伏上の湖面静止**を保つには、斜面源項を運動量フラックスと釣り合わせる必要がある。各面で水面標高を変えずに水深だけ再構成する、静水圧再構成の基礎を別の設定で検査する。

セル $i$ と $i+1$ の境界で $b_*=\max(b_i,b_{i+1})$ とし、左右の再構成水深 $h_L^*=\max(0,h_i+b_i-b_*)$、$h_R^*=\max(0,h_{i+1}+b_{i+1}-b_*)$、流量は各側の速度を掛けて $q_{L,R}^*=h_{L,R}^*u_{L,R}$ とする。流束への各セル側の水圧補正を $\frac12g(h_i^2-(h_L^*)^2)$、$\frac12g(h_{i+1}^2-(h_R^*)^2)$ とすると、湖面が一定で静止するとき両側の補正後の圧力流束がそれぞれ $\frac12gh_i^2$、$\frac12gh_{i+1}^2$ となり各セル内の流束差が消える。**質量流束は共通の値**を用い、水深再構成と源項補正を混同しない。

計算で水深が負になったり、質量が保存されなかったりした場合は失敗として扱う。時間刻みは $\max(|u|+\sqrt{gh})\Delta t/\Delta x$ が設定した安全率以下になるよう縮める。有限体積法はこの講義では浅水方程式の検算手段であり、詳細な安定性・収束理論は後の数値流体力学講義で扱う。

```python-file-lab
# lab-id: FLUID29-SHALLOW-WATER
# lab-title: ダム決壊と湖面静止の保存・正値検算
# lab-file: textbook/volumes/dream_thater/物理系/FLUID/FLUID29/shallow_water_lab.py
# timeout-ms: 18000
# lab-preset: 平底ダム決壊 | --mode dam --cells 160 --left 2 --right 1 --final-time 0.5
# lab-preset: 微小擾乱と長波線形近似 | --mode dam --cells 240 --left 1.02 --right 0.98 --final-time 0.5
# lab-preset: 起伏上の湖面静止 | --mode lake --cells 160 --surface 1 --bump 0.25 --final-time 0.5
# lab-preset: 湖面静止・格子を倍にする | --mode lake --cells 320 --surface 1 --bump 0.25 --final-time 0.5
```

[Pythonソースを閲覧](shallow_water_lab.py)。出力の水面標高、底面・水深、速度を比較する。平底のダム決壊は非線形浅水方程式の**数値解**で、真の三次元流体を直接解くわけではない。湖面静止は解析的な正確解があるため、最大水面誤差・最大流速を独立に判定できる。反射壁まで波が到達しない短い時間を使い、格子を増やすことと模型近似の改善を混同しない。

## 8. 演習

特記しなければ $g>0$ は一定、底面 $b=b(x)$ は固定で滑らか、水深 $h>0$、流速 $u=q/h$、単位幅流量は $q=hu$ とし、一定密度・非粘性・静水圧の一次元浅水模型を使う。すべての量は単位幅当たりとする。各問では、引用した結果の適用条件にも注意する。

### Level A

### A1. 静水圧近似の尺度を判定する

代表水深 $H=2$ m、水平長 $L=200$ m、速度 $U=\sqrt{gH}$ m/s の流れで $\varepsilon$、$Fr$、鉛直加速度と重力の比の次数を求めよ。$g>0$ を固定する。

- Level: A

<!-- solution-start -->
#### 詳細解答

定義から $\varepsilon=H/L=2/200=0.01$、$Fr=U/\sqrt{gH}=1$。鉛直加速度と重力の比は導出した尺度 $\varepsilon^2Fr^2$ を使い、$(0.01)^2(1)^2=10^{-4}$ の次数。したがって静水圧先頭項の使用には整合的だが、速度が深さ方向に一様であることや摩擦が小さいことまでは、この数値だけで保証されない。
<!-- solution-end -->

### A2. 水深平均速度を実際に積分する

$b=0$、$\eta=2$ m、$v(z)=1+z$ m/s（$z$ は m 単位の数値）とする。水深・流量・平均速度を定義から計算し、上端速度を用いた誤差を述べよ。

- Level: A

<!-- solution-start -->
#### 詳細解答

$h=\eta-b=2$ m で正。流量は $q=\int_0^2(1+z)\,dz=[z+z^2/2]_0^2=4$ m$^2$/s。平均速度は $\bar u=q/h=2$ m/s。上端速度 $v(2)=3$ m/s を用いると $q_{\rm top}=h v(2)=6$ m$^2$/s で、誤差は $+2$ m$^2$/s（正しい値の $50$%）。深さ平均は定義通り積分する必要がある。
<!-- solution-end -->

### A3. 起伏上の静水を確かめる

底面 $b(x)=B\cos(kx)$（$B>0,k>0$）、湖面標高 $H>B$ とする。$q=0$、$h=H-b$ が運動量方程式を満たすことを微分で示せ。

- Level: A

<!-- solution-start -->
#### 詳細解答

$H>B$ から $h(x)=H-B\cos(kx)\ge H-B>0$。$b_x=-Bk\sin(kx)$、$h_x=+Bk\sin(kx)=-b_x$。質量式は $h_t=q_x=0$。運動量左辺は $q_t=0$ と $\partial_x(gh^2/2)=ghh_x=g h Bk\sin(kx)$。右辺は $-ghb_x=+g h Bk\sin(kx)$ なので一致する。
<!-- solution-end -->

### A4. 特性速度と流れの向きを比較する

平底で $h=4$ m、$u=1$ m/s、$g=9$ m/s$^2$ の一様状態を考える。二つの特性速度と Froude 数を求め、波が左右どちらに進むか述べよ。

- Level: A

<!-- solution-start -->
#### 詳細解答

$h,g>0$ なので[特性速度](#thm-fluid29-characteristics)を使える。$\sqrt{gh}=\sqrt{9\cdot4}=6$ m/s、$\lambda_-=1-6=-5$ m/s、$\lambda_+=1+6=7$ m/s。$Fr=|u|/\sqrt{gh}=1/6<1$。一つの情報は左向き、もう一つは右向きに伝わる。
<!-- solution-end -->

### A5. 流束の単位と値を検算する

平底で $h=2$ m、$u=3$ m/s、$g=9.8$ m/s$^2$ とする。$q$ と運動量流束 $q^2/h+gh^2/2$ の値・単位を求めよ。

- Level: A

<!-- solution-start -->
#### 詳細解答

$q=hu=2\cdot3=6$ m$^2$/s。移流部分は $q^2/h=36/2=18$ m$^3$/s$^2$、静水圧部分は $gh^2/2=9.8\cdot4/2=19.6$ m$^3$/s$^2$、合計 $37.6$ m$^3$/s$^2$。両項の単位が一致し、質量保存式の $q_x$ の単位は m/s と確認できる。
<!-- solution-end -->

### Level B

### B1. 動く二つの端点から質量を導く

$\partial_xv+\partial_zw=0$、$w_s=\eta_t+v_s\eta_x$、$w_b=v_bb_x$、$b_t=0$ を仮定する。$q=\int_b^\eta v\,dz$ の $x$ 微分を端点項まで書き、$h_t+q_x=0$ を導け。

- Level: B

<!-- solution-start -->
#### 詳細解答

$h=\eta-b$、$b_t=0$ だから $h_t=\eta_t$。積分の上下端が $x$ に依存するので、端点を含む微分を行うと

$$
q_x=\int_b^\eta v_x\,dz+v_s\eta_x-v_bb_x.
$$

非圧縮条件から $v_x=-w_z$ なので

$$
\int_b^\eta v_x\,dz=-\int_b^\eta w_z\,dz=-w_s+w_b.
$$

[水面・底面の運動学条件を使った質量保存の証明](#thm-fluid29-depth-mass)と同じく、ここに $w_s=\eta_t+v_s\eta_x$、$w_b=v_bb_x$ を代入すると

$$
\begin{aligned}
q_x&=-w_s+w_b+v_s\eta_x-v_bb_x\\
&=-\eta_t-v_s\eta_x+v_bb_x+v_s\eta_x-v_bb_x\\
&=-\eta_t=-h_t.
\end{aligned}
$$

斜面では $w_b=v_bb_x$ を省略できない。
<!-- solution-end -->

### B2. 線形水面波を浅水式から再導出する

平底静水 $h=H>0,u=0$ に $h=H+\zeta$、$u=v(x,t)$ の小擾乱を加える。ここで $v$ は水深平均速度の微小擾乱である。一次方程式を求め、$\zeta$ が満たす波動方程式と波速を求めよ。

- Level: B

<!-- solution-start -->
#### 詳細解答

[浅水方程式](#thm-fluid29-shallow-water)の質量式に $h=H+\zeta$、$u=v$ を代入すると

$$
(H+\zeta)_t+\partial_x\bigl((H+\zeta)v\bigr)
=\zeta_t+Hv_x+(\zeta v)_x=0.
$$

$\zeta v$ は擾乱の二次なので捨て、$\zeta_t+Hv_x=0$ を得る。一方、速度式への代入は

$$
v_t+vv_x+g\zeta_x=0
\quad\Longrightarrow\quad v_t+g\zeta_x=0
$$

であり、$vv_x$ を二次項として落とした。前式を $t$ で、後式を $x$ で微分し、混合微分を交換できる滑らかさを用いると

$$
\zeta_{tt}+H v_{xt}=0,\qquad
v_{tx}+g\zeta_{xx}=0
\quad\Longrightarrow\quad
\zeta_{tt}-gH\zeta_{xx}=0.
$$

$g,H>0$ より両方向へ進む波の速さは $\sqrt{gH}$ である。
<!-- solution-end -->

### B3. 力学的エネルギー流束を組み立てる

滑らかな浅水解で $h_t+(hu)_x=0$、$u_t+uu_x+g(h+b)_x=0$、$b_t=0$ とする。$E=hu^2/2+gh^2/2+ghb$ の時間微分から、エネルギー流束を導出せよ。

- Level: B

<!-- solution-start -->
#### 詳細解答

[水柱の力学的エネルギー](#def-fluid29-column-energy)を使い、運動エネルギー部分を質量式と速度式で微分すると

$$
\begin{aligned}
\partial_t\left(\frac12hu^2\right)
+\partial_x\left(\frac12hu^3\right)
&=hu(u_t+uu_x)+\frac12u^2\left(h_t+(hu)_x\right)\\
&=-ghu(h+b)_x.
\end{aligned}
$$

固定底 $b_t=0$ だから、重力部分は

$$
\partial_t\left(\frac12gh^2+ghb\right)
=g(h+b)h_t=-g(h+b)(hu)_x.
$$

両方を加え、積の微分を逆に使うと

$$
\begin{aligned}
E_t+\partial_x\left(\frac12hu^3\right)
&=-g\left[hu(h+b)_x+(h+b)(hu)_x\right]\\
&=-\partial_x\left[g(h+b)hu\right].
\end{aligned}
$$

よって流束は

$$
\frac12hu^3+g(h+b)hu
=u\left(E+\frac12gh^2\right)
$$

である。滑らかさを仮定して積の微分を行ったため、不連続解にはこの等式をそのまま適用しない。
<!-- solution-end -->

### B4. 有限体積の質量収支を確認する

$N$ 個の平底セルで $h_i^{n+1}=h_i^n-r(\widehat f_{i+1/2}-\widehat f_{i-1/2})$、$r=\Delta t/\Delta x$ とする。$\Delta x>0$ は等間隔で、左右壁の質量流束は零とする。総水量保存を示し、セルごとの正値水深がこの等式だけで保証されない理由も述べよ。

- Level: B

<!-- solution-start -->
#### 詳細解答

$\Delta x$ を掛けて $i=1,\dots,N$ で和を取ると

$$
\sum_i h_i^{n+1}\Delta x-\sum_i h_i^n\Delta x
=-\Delta t\sum_i(\widehat f_{i+1/2}-\widehat f_{i-1/2})
=-\Delta t(\widehat f_{N+1/2}-\widehat f_{1/2})=0.
$$

内部界面は各セルに同じ流束を使うため相殺する。しかし水量が保存されても、あるセルで負、水深が他で増える更新は代数的に排除されない。流束の単調性や時間刻みの条件、湿潤・乾燥処理が別に必要となる。本講の数値実験は湿潤状態の正値を毎ステップ検査する。
<!-- solution-end -->

### Level C

### C1. 湖面を保つ界面再構成とダム決壊をつなぐ

$g=9.8$ m/s$^2$、一定の湖面標高 $H=1$ m、隣接する底面標高 $b_L=0$ m、$b_R=0.2$ m とする。両セルで $u_L=u_R=0$ であり、$h_L=H-b_L$、$h_R=H-b_R$ である。(i) $h_L,h_R$ を出し、共通の界面高さ $b_*=\max(b_L,b_R)$ と $h^*_{L,R}=\max(0,h_{L,R}+b_{L,R}-b_*)$ を計算せよ。(ii) 再構成した静水圧数値流束 $gh_*^2/2$ に、左右のセル向け補正 $g(h_{L,R}^2-(h_{L,R}^*)^2)/2$ を加えた各値を求めよ。(iii) なぜ地形源項を捨てて通常の平底流束だけで更新すると湖面静止が壊れるか説明せよ。

- Level: C

<!-- solution-start -->
#### 詳細解答

(i) $h_L=1-0=1$ m、$h_R=1-0.2=0.8$ m。共通地形 $b_*=0.2$ m より

$$
h_L^*=\max(0,1+0-0.2)=0.8\ {\rm m},\qquad
h_R^*=\max(0,0.8+0.2-0.2)=0.8\ {\rm m}.
$$

双方の再構成流量は $h^*u=0$。したがって共通面の質量数値流束は零で、圧力数値流束は $gh_*^2/2=9.8\cdot0.64/2=3.136$ m$^3$/s$^2$ である。

(ii) 左セルへ向けた補正は $g(h_L^2-(h_L^*)^2)/2=4.9(1-0.64)=1.764$ m$^3$/s$^2$。右セルへの補正は $4.9(0.64-0.64)=0$。補正後の二つの値はそれぞれ $3.136+1.764=4.9=gh_L^2/2$ と $3.136+0=3.136=gh_R^2/2$ になる。全ての界面で同じ構成を行えば、各湖面静止セルから見た左右の圧力流束は同じ $gh_i^2/2$ となり、更新差が零となる。共通にする必要があるのは**質量流束**で、運動量流束の左右差が地形による力を表す。

(iii) 平底用の保存形では運動量更新を流束差だけで計算する。ところが静水状態の水深は $h_x=-b_x$ なので、圧力流束の勾配は $\partial_x(gh^2/2)=-ghb_x$ で一般には零でない。本来の式でこれを相殺する地形源項を落とすと $q_t$ が零にならず、見かけの流れが発生する。保存的な数値式だけを使えば地形との釣合も自動的に保存される、という推論は誤りである。
<!-- solution-end -->

## 9. 振り返り

- 質量保存 $h_t+q_x=0$ は非圧縮式と自由表面・底面の非貫通から**鉛直積分で正確**に得られる。
- 静水圧・鉛直一様速度の**長波近似**を置くと、水平運動量は圧力流束と地形源項を持つ浅水方程式になる。
- 平底の特性速度は $u\pm\sqrt{gh}$。静止した微小長波では $\sqrt{gH}$ となり、前講までの浅水極限と整合する。
- 湖面静止は $h+b=H$、$q=0$ であり、斜面上でも圧力勾配と底面力が釣り合う。
- 滑らかな流れでは底面標高に由来する重力ポテンシャルの寄与を含めた力学的エネルギーが保存されるが、跳水での散逸は別問題である。
