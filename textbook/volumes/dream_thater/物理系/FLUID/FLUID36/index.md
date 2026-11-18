# FLUID36 平行剪断流の擾乱はなぜ増幅するか

## 0. 滑らかな剪断流でも不安定になるか

[FLUID34 の二層 Kelvin–Helmholtz 分散式](../FLUID34/index.md#thm-fluid34-dispersion)は鋭い界面と速度差を仮定した。一方、実際の壁面流や管路流では流速は鉛直方向に滑らかに変化する。そこで今回は、界面を取り去った平行流の小さな擾乱が、どの条件で指数成長するかを考える。

非粘性には **Rayleigh 方程式**、粘性を含めると **Orr–Sommerfeld 方程式**が現れる。両者では微分方程式の次数だけでなく壁条件も異なる。また、有限時間に擾乱エネルギーが増すことと、指数増幅する固有モードが存在することは同値ではない。

実際の流路半幅 $h>0$ と速度尺度 $U_*>0$ を採用し、長さを $h$、速度を $U_*$、時間を $h/U_*$、圧力を $\rho U_*^2$ で割る。以後は特に断らなければ無次元量を用い、壁は $y=\pm1$、擾乱速度・擾乱圧力の $x$ 依存は周期的とする。定常の駆動圧力には一定の $x$ 方向勾配を許すため、基底圧力そのものの周期性は仮定しない。密度 $\rho>0$ は定数、動粘度 $\nu>0$ とし、

$$
\mathrm{Re}=\frac{U_*h}{\nu}>0
$$

を Reynolds 数とする。出発点は [CTM15 の非圧縮 Navier–Stokes 方程式](../../CTM/CTM15/index.md#thm-ctm15-incompressible-navier-stokes)である。非粘性の場合は $\mathrm{Re}^{-1}=0$ と置く。

## 1. 正規モードの成長率と壁条件を先に確定する

基底流を $\boldsymbol V_0=(U(y),0)$、その圧力を $P_0$ とする。$U$ は実数値の滑らかな関数で、以後プライムは無次元鉛直座標 $y$ による常微分（$U'=dU/dy$、$U''=d^2U/dy^2$ など）を表す。時間偏微分 $\partial_t$ は $x,y$ を固定して取る。基底流の発散は零である。粘性があって $U''\ne0$ なら、定常状態を保つために圧力勾配または外力が必要になる。これらの**基底駆動は固定**し、その変動を擾乱に加えない。

速度と圧力を基底値と微小量 $\varepsilon(u,v,p)$ に分ける。[FLUID34 の正規モード](../FLUID34/index.md#def-fluid34-normal-mode)を滑らかな剪断流の擾乱へ移して、水平波数 $\alpha>0$、複素位相速度 $c=c_r+ic_i$ に対し

$$
(u,v,p)=\operatorname{Re}\{(\widehat u,\widehat v,\widehat p)(y)e^{i\alpha(x-ct)}\}
$$

と置く。波長 $2\pi/\alpha$ を $x$ 方向の一周期とすれば、周期境界とも整合する。時間因子は $e^{-i\alpha c_rt}e^{\alpha c_it}$ である。ここで $c_r$ は位相速度、$\alpha c_i$ が時間成長率なので、虚部の符号の読み違いを防ぐ。

<a id="def-fluid36-mode"></a>

<!-- formal-statement-start -->
> **定義（平行剪断流の正規モードと時間成長率）**  
> 二次元・非圧縮の定常基底流 $(U(y),0)$、$\alpha>0$ に対し、非零の線形擾乱が振幅は $y$ のみの関数で、$x,t$ 依存性が $e^{i\alpha(x-ct)}$ であるとき、正規モードと呼ぶ。ここで $c\in\mathbb C$ は複素位相速度であり、
>
$$
\boxed{\sigma=\alpha\operatorname{Im}c}
$$
>
> を時間成長率と定義する。$\sigma>0$ は指数増幅、$\sigma<0$ は指数減衰、$\sigma=0$ は中立の時間指数因子である。
<!-- formal-statement-end -->

<!-- definition-example-start: def-fluid36-mode -->
**定義の確認**：$U=1-y^2$ は実数値で滑らかであり、$(U,0)$ は発散零、$U(\pm1)=0$。定常方程式には $\partial_xP_0=\mathrm{Re}^{-1}U''=-2/\mathrm{Re}$ の基底圧力勾配が必要である。$\alpha=2$、$c=0.3+0.04i$ と仮に置けば時間因子から $\sigma=0.08$、振幅比は $e^{0.08t}$ となる。ただし**この計算だけでは線形化方程式の非零解を構成しておらず**、この $c$ が固有値であるとは言えない。

実際に正規モードの全条件を確認するため、別の**非粘性一様流** $U(y)=U_0$（$U_0\in\mathbb R$）を取る。$\alpha=2$、$c=U_0$ とし、非零の振幅を

$$
\widehat u=-2y,\qquad
\widehat v=-2i(1-y^2),\qquad
\widehat p=0
$$

と置く。$i\alpha\widehat u+\widehat v'=-4iy+4iy=0$ で非圧縮、$\widehat v(\pm1)=0$ で壁非貫通を満たす。さらに $U'=0$、$(\partial_t+U_0\partial_x)e^{2i(x-U_0t)}=0$ なので、二つの線形化 Euler 運動量式も圧力擾乱零で満たす。振幅は $y$ のみの関数で非零、$\sigma=2\operatorname{Im}U_0=0$ の**中立正規モード**である。無滑りを仮定しない非粘性壁の例であることにも注意する。
<!-- definition-example-end -->

二次元の非圧縮条件を自動的に満たすため、[FLUID11 の流れ関数](../FLUID11/index.md#prop-fluid11-local-stream)を使う。向きを $(u,v)=(\partial_y\psi,-\partial_x\psi)$ と固定して

$$
\psi=\phi(y)e^{i\alpha(x-ct)},\qquad
\widehat u=\phi'(y),\quad \widehat v=-i\alpha\phi(y)
$$

と置けば $\partial_xu+\partial_yv=i\alpha\phi'-i\alpha\phi'=0$。プライムは**無次元座標 $y$ での常微分**である。

壁非貫通 $v(\pm1)=0$ は $\alpha>0$ より $\phi(\pm1)=0$ と同値。粘性流で静止壁に [CTM15 の無滑り条件](../../CTM/CTM15/index.md#def-ctm15-no-slip)も課すなら、$u(\pm1)=0$、従って $\phi'(\pm1)=0$ も必要になる。非粘性の壁に無滑りを無条件で課してはいけない。

## 2. 線形化から Rayleigh 方程式まで

[非圧縮 Navier–Stokes 方程式](../../CTM/CTM15/index.md#thm-ctm15-incompressible-navier-stokes)に基底流と $\varepsilon$ 倍の擾乱を代入する。$\varepsilon^2$ 項を捨て、基底の定常式を引くと

$$
\begin{aligned}
u_t+Uu_x+vU'&=-p_x+\mathrm{Re}^{-1}\Delta u,\\
v_t+Uv_x&=-p_y+\mathrm{Re}^{-1}\Delta v,\\
u_x+v_y&=0,\qquad \Delta=\partial_x^2+\partial_y^2.
\end{aligned}
$$

せん断から生じる $vU'$ が重要である。圧力を消すため鉛直運動量式を $x$ 微分し、水平式を $y$ 微分して引く。[FLUID10 の二次元渦度輸送式](../FLUID10/index.md#prop-fluid10-planar-transport)とも整合する計算を、ここでは途中式まで示す。

$\zeta=v_x-u_y$ とすると

$$
\begin{aligned}
\zeta_t+U(v_{xx}-u_{xy})-U'u_x-(vU')_y
&=\mathrm{Re}^{-1}\Delta\zeta,\\
-U'u_x-(vU')_y&=-U'(u_x+v_y)-U''v=-U''v.
\end{aligned}
$$

従って $\zeta_t+U\zeta_x-U''v=\mathrm{Re}^{-1}\Delta\zeta$。流れ関数により $\zeta=-\Delta\psi$、$v=-\psi_x$ だから

$$
\boxed{(\partial_t+U\partial_x)\Delta\psi
-U''\partial_x\psi=\mathrm{Re}^{-1}\Delta^2\psi.}
$$

以後 $D=d/dy$、$L_\alpha=D^2-\alpha^2$ と記す。$\Delta\psi=L_\alpha\phi\,e^{i\alpha(x-ct)}$ である。

<a id="thm-fluid36-rayleigh"></a>

<!-- formal-statement-start -->
> **定理（非粘性 Rayleigh 方程式）**  
> $U\in C^2([-1,1];\mathbb R)$、$\alpha>0$。二次元・非圧縮・非粘性流 $(U(y),0)$ に対する非零正規モードで、壁非貫通を満たす $\phi\in C^2([-1,1];\mathbb C)$ は
>
$$
\boxed{(U-c)(\phi''-\alpha^2\phi)-U''\phi=0,\qquad
\phi(-1)=\phi(1)=0}
$$
>
> を満たす。逆にこの条件を満たす非零 $\phi,c$ から、線形化 Euler 方程式の非圧縮速度と圧力の正規モードを復元できる。
<!-- formal-statement-end -->

### 証明の見取り図

粘性を捨てた流れ関数式に正規モードを代入し、共通因子 $i\alpha e^{i\alpha(x-ct)}$ を消す。非貫通条件は $\widehat v=-i\alpha\phi$ から直ちに出る。逆方向では圧力を水平運動量式から復元する。

<!-- proof-start -->
### 証明

$\partial_t\Delta\psi=-i\alpha cL_\alpha\phi\,e^{i\alpha(x-ct)}$、$U\partial_x\Delta\psi=i\alpha UL_\alpha\phi\,e^{i\alpha(x-ct)}$、$U''\partial_x\psi=i\alpha U''\phi\,e^{i\alpha(x-ct)}$。よって非粘性の式は

$$
i\alpha\{(U-c)L_\alpha\phi-U''\phi\}e^{i\alpha(x-ct)}=0.
$$

$\alpha>0$ と指数関数が非零であることから式を得る。壁の $v=0$ は $\phi(\pm1)=0$ に等しい。

逆向きには $\widehat u=\phi'$、$\widehat v=-i\alpha\phi$ と置き、水平式に合わせて

$$
\widehat p=-(U-c)\phi'+U'\phi
$$

と選ぶ。微分すると $\widehat p'=-(U-c)\phi''+U''\phi$。Rayleigh 方程式から $(U-c)\phi''-U''\phi=\alpha^2(U-c)\phi$、従って $\widehat p'=-\alpha^2(U-c)\phi=-i\alpha(U-c)\widehat v$。鉛直式も満たす。
<!-- proof-end -->

**直接例**：$U=y$ で $\operatorname{Im}c>0$ を仮定すると、$U-c\ne0$ なので $L_\alpha\phi=0$。$\phi(\pm1)=0$ のもとで部分積分すれば $\int(|\phi'|^2+\alpha^2|\phi|^2)=0$、従って $\phi\equiv0$。非零の指数増幅モードは存在しない。$\operatorname{Im}c=0$ では $U=c$ となる内部位置（臨界層）があり得るため、同じ割り算には注意が要る。

## 3. 変曲点は必要、ただし十分ではない

<a id="thm-fluid36-inflection"></a>

<!-- formal-statement-start -->
> **定理（Rayleigh の変曲点必要条件）**  
> [非粘性 Rayleigh 方程式](#thm-fluid36-rayleigh)の仮定で、$\operatorname{Im}c>0$ の非零固有関数が存在するなら、$U''$ は $(-1,1)$ 内で正と負の両値を取る。特に $U''$ が符号一定（恒等零も含む）の場合、そのような指数増幅モードはない。変曲点の存在だけでは指数増幅の**十分条件にならない**。
<!-- formal-statement-end -->

### 証明の見取り図

$c_i>0$ なら $U-c$ はどこでも非零である。Rayleigh 方程式を割り、$\overline\phi$ を掛けて積分すると虚部が $U''$ の符号付き積分になる。

<!-- proof-start -->
### 証明

$c=c_r+ic_i$、$c_i>0$ とする。$|U-c|^2=(U-c_r)^2+c_i^2>0$ により

$$
\phi''-\alpha^2\phi-\frac{U''}{U-c}\phi=0.
$$

$\overline\phi$ を掛けて積分し、境界条件 $\phi(\pm1)=0$ から部分積分すると

$$
-\int_{-1}^1(|\phi'|^2+\alpha^2|\phi|^2)\,dy
-\int_{-1}^1\frac{U''}{U-c}|\phi|^2\,dy=0.
$$

$\frac1{U-c}=\frac{U-c_r+ic_i}{(U-c_r)^2+c_i^2}$ を用いて虚部を取れば

$$
\boxed{\int_{-1}^1\frac{U''|\phi|^2}{(U-c_r)^2+c_i^2}\,dy=0.}
$$

分母は正。$U''\ge0$ である点で厳密に正なら連続性から正の開区間がある。この区間で $\phi$ が恒等零なら、内部点 $y_0$ で $\phi(y_0)=\phi'(y_0)=0$ となる。しかし $\phi''=q(y)\phi$、$q(y)=\alpha^2+U''/(U-c)$ は $[-1,1]$ で連続・有界であり、二度積分した

$$
\phi(y)=\int_{y_0}^{y}(y-s)q(s)\phi(s)\,ds
$$

から、$y_0$ を端点とする長さ $\delta>0$ の小区間で $M=\sup|\phi|$ と置けば $M\le\frac12\|q\|_\infty\delta^2M$ となる。$\frac12\|q\|_\infty\delta^2<1$ となる $\delta$ を選べば $M=0$、同じ幅の区間へ有限回繰り返せば全区間で $\phi=0$ となり、非零性に反する。従って正の開区間で $|\phi|^2$ が正になる点があり、積分は正となって矛盾する。$U''\le0$ も同様。$U''\equiv0$ なら $(U-c)L_\alpha\phi=0$ であり $L_\alpha\phi=0$、部分積分して $\phi\equiv0$。よって非零モードには $U''$ の正負両値が必要である。
<!-- proof-end -->

$U=y$ は $U''=0$、$U=1-y^2$ は $U''=-2$ なのでいずれも**非粘性二次元の指数増幅モードがない**。$U=y-y^3$ は $U''=-6y$ が符号を変えるが、これは増幅モードの存在を保証しない。

## 4. 粘性を保つ Orr–Sommerfeld 方程式

粘性がある場合は流れ関数式の $\mathrm{Re}^{-1}\Delta^2\psi$ が消えず、四階方程式になる。壁の無滑り条件が二つ追加されるので、非粘性極限は単純な係数の極限ではない。

<a id="thm-fluid36-orr-sommerfeld"></a>

<!-- formal-statement-start -->
> **定理（Orr–Sommerfeld 固有値問題）**  
> $U\in C^4([-1,1];\mathbb R)$ は必要な定常駆動により保持される平行流とする。[二次元・非圧縮 Newton 流体](../../CTM/CTM15/index.md#def-ctm15-incompressible-newtonian)、$\alpha>0$、$0<\mathrm{Re}<\infty$、二枚の**静止・非貫通・無滑り**壁の仮定の下、非零の正規モード流れ関数 $\phi\in C^4([-1,1];\mathbb C)$ は
>
$$
\boxed{(U-c)L_\alpha\phi-U''\phi
=\frac{1}{i\alpha\mathrm{Re}}L_\alpha^2\phi}
$$
>
> および
>
$$
\boxed{\phi(-1)=\phi(1)=\phi'(-1)=\phi'(1)=0}
$$
>
> を満たす。逆にこの条件を満たす固有対から速度・圧力の線形正規モードを復元できる。
<!-- formal-statement-end -->

### 証明の見取り図

$L_\alpha\phi$ と $L_\alpha^2\phi$ がそれぞれ $\Delta\psi$ と $\Delta^2\psi$ の振幅に対応する。壁条件は $v=-i\alpha\phi$、$u=\phi'$ から別々に読む。

<!-- proof-start -->
### 証明

$\Delta\psi=L_\alpha\phi\,e^{i\alpha(x-ct)}$、$\Delta^2\psi=L_\alpha^2\phi\,e^{i\alpha(x-ct)}$ を流れ関数式へ入れると

$$
i\alpha\{(U-c)L_\alpha\phi-U''\phi\}
=\mathrm{Re}^{-1}L_\alpha^2\phi.
$$

$\alpha>0$ なので $i\alpha$ で割り表示式を得る。壁非貫通は $\phi(\pm1)=0$、壁無滑りは $\phi'(\pm1)=0$ である。[CTM15 の無滑り条件](../../CTM/CTM15/index.md#def-ctm15-no-slip)を用いた。

逆向きには $\widehat u=\phi'$、$\widehat v=-i\alpha\phi$ を置く。水平式から

$$
\widehat p=-(U-c)\phi'+U'\phi
+\frac{\mathrm{Re}^{-1}}{i\alpha}L_\alpha\phi'
$$

と選ぶ。微分すると

$$
\widehat p'=-(U-c)\phi''+U''\phi
+\frac{\mathrm{Re}^{-1}}{i\alpha}L_\alpha\phi''.
$$

Orr–Sommerfeld 方程式で $(U-c)L_\alpha\phi-U''\phi=\mathrm{Re}^{-1}L_\alpha^2\phi/(i\alpha)$ を用いれば

$$
\widehat p'=-\alpha^2(U-c)\phi
+\frac{\mathrm{Re}^{-1}}{i\alpha}
\{L_\alpha\phi''-L_\alpha^2\phi\}
=-\alpha^2(U-c)\phi
+\frac{\mathrm{Re}^{-1}}{i\alpha}\alpha^2 L_\alpha\phi.
$$

これは鉛直式 $\widehat p'=-i\alpha(U-c)\widehat v+\mathrm{Re}^{-1}L_\alpha\widehat v$ と一致する。
<!-- proof-end -->

**壁の直接例**：$\phi=(1-y^2)^2=1-2y^2+y^4$ は $\phi(\pm1)=0$、$\phi'=-4y+4y^3$ により $\phi'(\pm1)=0$。ただしこれは**壁条件を満たす候補**であり、固有関数とは限らない。$\alpha=1$ なら $L_1\phi(0)=-5$、$L_1^2\phi(0)=24-2(-4)+1=33$。四階項は壁から離れていても零ではない。

### 4.1 擾乱のエネルギーはどこから来るか

指数増幅以外にも剪断からエネルギーが移る機構がある。$x$ の一周期と $-1<y<1$ の領域 $\Omega$ で実数の速度擾乱を考え、周期境界と静止・無滑り壁を課す。

<a id="prop-fluid36-energy"></a>

<!-- formal-statement-start -->
> **命題（線形擾乱のエネルギー収支）**  
> $U\in C^1([-1,1];\mathbb R)$、$\mathrm{Re}>0$。滑らかな実数値の線形擾乱が、$x$ 周期境界、$y=\pm1$ で $u=v=0$、$u_x+v_y=0$ を満たすとする。このとき $E=\frac12\int_\Omega(u^2+v^2)\,dx\,dy$ に対し
>
$$
\boxed{\frac{dE}{dt}=
-\int_\Omega U'uv\,dx\,dy
-\frac1{\mathrm{Re}}\int_\Omega
(|\nabla u|^2+|\nabla v|^2)\,dx\,dy.}
$$
>
> 第一項は剪断からのエネルギー移送、第二項は非負の散逸率を引く項である。
<!-- formal-statement-end -->

### 証明の見取り図

線形水平式に $u$、鉛直式に $v$ を掛け、全領域で積分する。圧力仕事は発散零で消え、$x$ 輸送は周期性で消える。

<!-- proof-start -->
### 証明

時間項は $\int(u u_t+v v_t)=dE/dt$。移流は

$$
\int_\Omega U(u u_x+v v_x)
=\int_\Omega U\partial_x\frac{u^2+v^2}{2}=0.
$$

圧力は部分積分で

$$
-\int_\Omega(up_x+vp_y)
=-\int_{\partial\Omega}p(u,v)\cdot n
+\int_\Omega p(u_x+v_y)=0
$$

となる。壁速度零と周期境界により境界積分が消え、体積項は非圧縮条件で零。粘性項も壁速度零・周期性から

$$
\int_\Omega(u\Delta u+v\Delta v)
=-\int_\Omega(|\nabla u|^2+|\nabla v|^2).
$$

残った $uvU'$ を右辺へ移せば主張を得る。
<!-- proof-end -->

$\int U'uv<0$ なら剪断からの移送は正だが、散逸がより大きければエネルギーは減る。逆に、一時的なエネルギー増加から成長固有値の存在は直ちに導けない。非粘性の変曲点必要条件は、**粘性流の線形不安定や非線形遷移を判定する定理ではない**。

## 5. 壁条件を保った固有値の近似と収束確認

四階の Orr–Sommerfeld 問題では、最初から壁条件を満たす多項式を使うと境界の数値誤差を切り分けやすい。$T_0(y)=1$、$T_1(y)=y$、$T_{j+1}(y)=2yT_j(y)-T_{j-1}(y)$ で定まる Chebyshev 多項式を使い、$N\ge2$ として

$$
b_j(y)=(1-y^2)^2T_j(y),\qquad
\phi_N(y)=\sum_{j=0}^{N-1}a_jb_j(y)
$$

と置く。各 $b_j$ は $\pm1$ で零であり、微分の各項にも $(1-y^2)$ 因子があるから $b_j'(\pm1)=0$。従って**どんな**係数列 $a$ でも四つの壁条件を満たす。

残差を各 $b_i$ に直交させる Galerkin 近似を採用する。これは四階方程式の残差を直接零と仮定するのでなく、各 $i=0,\ldots,N-1$ について

$$
0=\int_{-1}^1 b_i\left\{(U-c)L_\alpha\phi_N-U''\phi_N
+\frac{i}{\alpha\mathrm{Re}}L_\alpha^2\phi_N\right\}\,dy
$$

を課す方法である。$\phi_N=\sum_j a_jb_j$ を代入して $c$ の付く項と付かない項に分ける。$L_\alpha=D^2-\alpha^2$ であり、$b_i(\pm1)=b_i'(\pm1)=0$ を使って部分積分すると

$$
\int_{-1}^1 b_iL_\alpha b_j\,dy
=-\int_{-1}^1(b_i'b_j'+\alpha^2b_ib_j)\,dy,
$$

$$
\int_{-1}^1 b_iL_\alpha^2b_j\,dy
=\int_{-1}^1(L_\alpha b_i)(L_\alpha b_j)\,dy.
$$

第一式は一度、第二式は二度の部分積分で、それぞれ端点項が消える。従って

$$
\begin{aligned}
B_{ij}
&=\int_{-1}^1 b_iL_\alpha b_j\,dy
=-\int_{-1}^1(b_i'b_j'+\alpha^2b_ib_j)\,dy,\\
A_{ij}
&=\int_{-1}^1 b_i(UL_\alpha b_j-U''b_j)\,dy
+\frac{i}{\alpha\mathrm{Re}}\int_{-1}^1
(L_\alpha b_i)(L_\alpha b_j)\,dy
\end{aligned}
$$

を得る。右辺の符号に注意：$-1/(i\alpha\mathrm{Re})=+i/(\alpha\mathrm{Re})$ である。求める離散固有対は

$$
\boxed{Aa=cBa,\qquad a\in\mathbb C^N\setminus\{0\}.}
$$

<a id="prop-fluid36-galerkin"></a>

<!-- formal-statement-start -->
> **命題（Galerkin 行列の負定値と可逆性）**  
> $\alpha>0$、$N\ge2$ とし、上の試験関数から行列を定める。
>
$$
B_{ij}=\int_{-1}^1 b_iL_\alpha b_j\,dy.
$$
>
> このとき $b_j$ は線形独立で、$B$ は実対称負定値、従って可逆である。ただし有限次元の固有値残差が小さくても、連続の Orr–Sommerfeld 固有値への収束は保証されない。
<!-- formal-statement-end -->

### 証明の見取り図

共通因子 $(1-y^2)^2$ を割れば次数の異なる多項式 $T_j$ が残る。$B$ の二次形式は速度勾配の二乗和の負になる。

<!-- proof-start -->
### 証明

$\sum_j a_jb_j=0$ が区間内で成り立てば、正の $(1-y^2)^2$ で割ると $\sum_j a_jT_j=0$。次数 $j$ の多項式 $T_j$ の最高次係数は非零なので、係数比較で全 $a_j=0$。従って基底は線形独立。

$a\ne0$、$\phi_N=\sum_j a_jb_j$ とすると、$b_j$ は実数値であり、部分積分により

$$
a^*Ba=\int_{-1}^1\overline{\phi_N}L_\alpha\phi_N\,dy
=-\int_{-1}^1(|\phi_N'|^2+\alpha^2|\phi_N|^2)\,dy<0.
$$

$\phi_N$ は恒等零でないので厳密な不等号が成立する。従って $B$ は核を持たず可逆である。
<!-- proof-end -->

**積分の直接検算**：$\alpha=1$、$b_0=(1-y^2)^2$ では

$$
\int_{-1}^1(b_0')^2\,dy=\frac{256}{105},\qquad
\int_{-1}^1 b_0^2\,dy=\frac{256}{315},\qquad
B_{00}=-\frac{1024}{315}.
$$

数値模型として $U=1-y^2$（平板 Poiseuille 流）、$\alpha=1$、$\mathrm{Re}=10000$ を選ぶ。Reynolds 数は**中心速度と半流路幅**に基づく。Galerkin 次数を上げた時の、虚部最大の離散固有値の典型的な結果は次の通り。

| $N$ | $c$（数値近似） |
| --- | --- |
| 20 | $0.2366+0.0015i$ |
| 24 | $0.2374+0.0037i$ |
| 28 | $0.2375+0.0038i$ |
| 32 | $0.2375+0.0037i$ |

この値は**有限次元近似**であり、特に $N=20$ だけを見て成長率を確定してはいけない。代数残差と次数間差、基底の条件数をそれぞれ調べる。非粘性では同じ $U$ は変曲点を持たず指数増幅モードがないが、粘性では四階方程式と境界条件が異なるので、結論の相違は矛盾でない。

### 5.1 ブラウザ Python：同じコードで固有値と図を確認する

公開した Python ファイルは NumPy で Chebyshev 基底の微分、Gauss–Legendre 積分、行列の固有値を一か所で計算する。出力する「成長率 $=\alpha\operatorname{Im}c$」の図と数値残差は同じ離散固有対から作る。**非線形 Navier–Stokes の時間発展計算ではない**。Re や近似次数を変えて、見かけの増幅がいつ収束するかを確認する。

```python-file-lab
# lab-id: FLUID36-ORR-SOMMERFELD-GALERKIN
# lab-title: 平行剪断流のOrr–Sommerfeld固有値と収束
# lab-file: textbook/volumes/dream_thater/物理系/FLUID/FLUID36/orr_sommerfeld_lab.py
# timeout-ms: 30000
# lab-preset: Poiseuille Re=10000 | --profile poiseuille --re 10000 --alpha 1 --n 28
# lab-preset: Poiseuille Re=6000 | --profile poiseuille --re 6000 --alpha 1 --n 28
# lab-preset: Couette Re=10000 | --profile couette --re 10000 --alpha 1 --n 28
# lab-preset: 低次数の数値誤差 | --profile poiseuille --re 10000 --alpha 1 --n 20
```

## 6. 演習：符号・境界・固有値を紙上で再現する

### Level A

#### A1. Poiseuille 基底流の定常条件
- Level: A

$U=1-y^2$、$\mathrm{Re}>0$ とする。壁速度、発散、対流項、定常に必要な $\partial_xP_0$ を計算せよ。

<!-- solution-start -->
#### 詳細解答

$U(\pm1)=0$、$\partial_xU+\partial_y0=0$。対流は $(U,0)\cdot\nabla U=U\partial_xU=0$。一方 $U'=-2y$、$U''=-2$ なので、水平運動量の定常式 $0=-\partial_xP_0+\mathrm{Re}^{-1}U''$ に代入して $\partial_xP_0=-2/\mathrm{Re}$。圧力勾配なしではこの放物線は粘性流の定常解とならない。
<!-- solution-end -->

#### A2. 複素位相速度の符号
- Level: A

$\alpha=2$、$c=0.3-0.04i$ とする。$e^{i\alpha(x-ct)}$ の時間増幅率、$t=5$ での振幅比、位相速度を求めよ。

<!-- solution-start -->
#### 詳細解答

時間因子を $e^{-i\alpha ct}=e^{-0.6it}e^{-0.08t}$ と分ける。$\sigma=2(-0.04)=-0.08$ で減衰し、$t=5$ の振幅比は $e^{-0.4}\simeq0.6703$、位相速度は $c_r=0.3$。負の虚部を正の成長と取り違えてはいけない。
<!-- solution-end -->

#### A3. 二種類の壁条件
- Level: A

$\psi=\phi e^{i\alpha(x-ct)}$、$u=\psi_y$、$v=-\psi_x$ とする。壁で非貫通のみの場合、さらに無滑りを課す場合の $\phi$ に対する条件を求めよ。

<!-- solution-start -->
#### 詳細解答

$u=\phi'e^{i\alpha(x-ct)}$、$v=-i\alpha\phi e^{i\alpha(x-ct)}$。指数因子は非零、$\alpha>0$ なので $v(\pm1)=0$ は $\phi(\pm1)=0$ と同値。さらに $u(\pm1)=0$ は $\phi'(\pm1)=0$ と同値。[非粘性 Rayleigh 問題](#thm-fluid36-rayleigh)では前者、静止壁の [Orr–Sommerfeld 問題](#thm-fluid36-orr-sommerfeld)では両方である。
<!-- solution-end -->

#### A4. 変曲点の必要性を使う
- Level: A

非粘性の平行流 $U_1=y$、$U_2=1-y^2$、$U_3=y-y^3$ のどれに [Rayleigh の変曲点必要条件](#thm-fluid36-inflection)から指数増幅モードの不存在を結論できるか。

<!-- solution-start -->
#### 詳細解答

$U_1''=0$、$U_2''=-2$、$U_3''=-6y$。[Rayleigh の変曲点必要条件](#thm-fluid36-inflection)により、$U''$ の正負両値を持たない $U_1$ と $U_2$ には非粘性二次元の成長固有モードがない。$U_3''$ は $y=0$ で符号を変えるが、それは必要条件を満たすだけで、実際の増幅は固有値問題を解かなければ判定できない。
<!-- solution-end -->

#### A5. 四階項は本当に残るか
- Level: A

$\phi=(1-y^2)^2$、$\alpha=1$ について四つの壁条件と $L_1\phi(0)$、$L_1^2\phi(0)$ を計算せよ。

<!-- solution-start -->
#### 詳細解答

$\phi=1-2y^2+y^4$、$\phi'=-4y+4y^3$ より $\phi(\pm1)=\phi'(\pm1)=0$。$\phi''=-4+12y^2$、$\phi''''=24$ なので

$$
L_1\phi(0)=\phi''(0)-\phi(0)=-4-1=-5,
$$

$$
L_1^2\phi(0)=\phi''''(0)-2\phi''(0)+\phi(0)=24+8+1=33.
$$

壁条件を満たすことだけで固有方程式まで満たすとは限らない。
<!-- solution-end -->

### Level B

#### B1. Rayleigh 変曲点条件の積分証明
- Level: B

$c_i>0$ の [Rayleigh 方程式](#thm-fluid36-rayleigh)を $U-c$ で割り $\overline\phi$ を掛けて積分し、$U''$ に関する必要条件を導け。

<!-- solution-start -->
#### 詳細解答

実数 $U$ に対し $|U-c|^2=(U-c_r)^2+c_i^2>0$。よって割り算でき、

$$
\phi''-\alpha^2\phi-\frac{U''}{U-c}\phi=0.
$$

$\overline\phi$ を掛けて $[-1,1]$ で積分する。境界値 $\phi(\pm1)=0$ を使うと $\int\overline\phi\phi''=-\int|\phi'|^2$。従って

$$
-\int(|\phi'|^2+\alpha^2|\phi|^2)
-\int\frac{U''}{U-c}|\phi|^2=0.
$$

$1/(U-c)=(U-c_r+ic_i)/((U-c_r)^2+c_i^2)$ を代入し虚部を取ると

$$
c_i\int_{-1}^1\frac{U''|\phi|^2}{(U-c_r)^2+c_i^2}\,dy=0.
$$

$c_i>0$、分母正なので、非零固有関数に対し $U''$ が正負の値を取らなければ積分は零にならない。恒等零の場合は $L_\alpha\phi=0$ と Dirichlet 条件から $\phi=0$ となり矛盾する。
<!-- solution-end -->

#### B2. 擾乱エネルギーの供給と消費
- Level: B

線形化水平・鉛直運動量式で、$x$ 周期、$y=\pm1$ に無滑りを課す。$\dot E$ を導出し、$\int U'uv<0$ だけで正の固有値が存在すると断定できない理由を述べよ。

<!-- solution-start -->
#### 詳細解答

水平式に $u$、鉛直式に $v$ を掛けて積分すると時間項は $\dot E$。移流項は $\int U\partial_x(u^2+v^2)/2=0$。圧力項は発散零と境界の速度零・周期性により零。粘性項は部分積分で $-\mathrm{Re}^{-1}\int(|\nabla u|^2+|\nabla v|^2)$。残る $uvU'$ を移項して

$$
\dot E=-\int U'uv-\mathrm{Re}^{-1}\int(|\nabla u|^2+|\nabla v|^2).
$$

$\int U'uv<0$ なら剪断からの供給は正だが、散逸が上回れば $\dot E<0$。一時的に $\dot E>0$ でも長時間の指数増幅固有モードを意味しない。
<!-- solution-end -->

#### B3. Galerkin 行列の負定値と具体成分
- Level: B

$\alpha=1$、$b_0=(1-y^2)^2$ とする。$B_{00}=\int b_0(D^2-1)b_0$ を計算し、任意の非零 $\phi_N=\sum a_jb_j$ に対する $a^*Ba$ の符号を示せ。

<!-- solution-start -->
#### 詳細解答

$b_0'=4y(y^2-1)$ だから

$$
\int_{-1}^1(b_0')^2\,dy
=32\left(\frac13-\frac25+\frac17\right)=\frac{256}{105}.
$$

$b_0^2=(1-y^2)^4$ を展開すると

$$
\int_{-1}^1b_0^2\,dy
=2\left(1-\frac43+\frac65-\frac47+\frac19\right)=\frac{256}{315}.
$$

部分積分して $B_{00}=-256/105-256/315=-1024/315$。一般に

$$
a^*Ba=-\int_{-1}^1(|\phi_N'|^2+\alpha^2|\phi_N|^2)\,dy<0.
$$

多項式基底の独立性より $a\ne0$ は $\phi_N\not\equiv0$ を保証するので、$B$ は可逆。
<!-- solution-end -->

#### B4. 粘性極限はなぜ特異か
- Level: B

$U=1-y^2$ における非粘性 Rayleigh 問題と、有限 $\mathrm{Re}$ の無滑り Orr–Sommerfeld 問題の微分次数・壁条件を比較し、Rayleigh の変曲点必要条件を粘性流に転用できない理由を述べよ。

<!-- solution-start -->
#### 詳細解答

非粘性は二階 $(U-c)L_\alpha\phi-U''\phi=0$、壁条件 $\phi(\pm1)=0$。粘性は四階 $(U-c)L_\alpha\phi-U''\phi=L_\alpha^2\phi/(i\alpha\mathrm{Re})$、壁条件 $\phi(\pm1)=\phi'(\pm1)=0$。$U''=-2$ だから[変曲点必要条件](#thm-fluid36-inflection)は**非粘性**の増幅を除外するが、粘性問題は異なる微分方程式と壁条件を持ち、定理の仮定に該当しない。有限 $\mathrm{Re}$ から極限を取ると最高階微分の係数が零になり、壁条件の数も変化する。
<!-- solution-end -->

### Level C

#### C1. 固有値・境界・エネルギーを統合する
- Level: C

静止壁間の $U=1-y^2$、$\alpha=1$、$\mathrm{Re}=10000$ の二次元擾乱を考える。$b_j=(1-y^2)^2T_j$、離散問題 $Aa=cBa$ とし、最大虚部の固有値が $N=20,24,28,32$ でそれぞれ $0.2366+0.0015i$、$0.2374+0.0037i$、$0.2375+0.0038i$、$0.2375+0.0037i$ と報告されたとする。

1. なぜ基底のどんな線形結合も四壁条件を満たし、$B$ は可逆か。
2. 各時間成長率を求め、$N=20$ だけでは精度を保証できない理由を述べよ。
3. この計算と非粘性 Rayleigh の変曲点必要条件は矛盾するか。
4. 真の増幅固有モードを表しているなら、エネルギー収支の剪断供給は散逸とどんな関係にあるか。

<!-- solution-start -->
#### 詳細解答

1. $b_j$ とその微分の全項に $1-y^2$ の因子が残るので、$\phi_N(\pm1)=\phi_N'(\pm1)=0$。また [Galerkin 行列の負定値](#prop-fluid36-galerkin)の証明の通り、$a^*Ba=-\int(|\phi_N'|^2+\alpha^2|\phi_N|^2)<0$ が非零係数に対して成立し $B$ は可逆である。
2. $\sigma=\alpha\operatorname{Im}c$、$\alpha=1$ より順に $0.0015,0.0037,0.0038,0.0037$。$N=20$ と $N=28$ は大きく異なり、$N=24$ 以降の近接は収束の手掛かりでしかない。代数残差、条件数、複数 $N$、枝の取り違えを検査する必要がある。
3. $U''=-2$ は符号一定であり、[Rayleigh の変曲点必要条件](#thm-fluid36-inflection)から**非粘性**の増幅はない。しかし数値例は無滑りで四階の [Orr–Sommerfeld 固有値問題](#thm-fluid36-orr-sommerfeld)を近似している。仮定が異なるから矛盾しない。
4. 成長率 $\sigma>0$ の単一モードなら、周期全体で $E(t)=E(0)e^{2\sigma t}$、従って $\dot E=2\sigma E>0$。[エネルギー収支](#prop-fluid36-energy)へ代入すれば

$$
-\int_\Omega U'uv\,dx\,dy
=2\sigma E+\frac1{\mathrm{Re}}
\int_\Omega(|\nabla u|^2+|\nabla v|^2)\,dx\,dy>0.
$$

よって基底剪断による供給が粘性散逸より大きい必要がある。ただし離散的に得た正の $\sigma$ の物理的信頼性は別途収束検査が必要である。
<!-- solution-end -->

## 7. まとめと次講

Rayleigh 方程式は非粘性模型の二階方程式で壁の非貫通条件を用い、Orr–Sommerfeld 方程式は粘性模型の四階方程式で壁の無滑り条件を用いる。変曲点必要条件の適用範囲を厳守し、固有モードの指数成長、有限時間のエネルギー増加、非線形遷移を区別する。数値固有値は次数を変えて検算する。次の FLUID37 では単一モードの解析から離れて、流速変動を平均・相関・スペクトルという統計量で記述する。
