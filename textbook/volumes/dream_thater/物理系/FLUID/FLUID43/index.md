# FLUID43 衝撃波を跨ぐと何が不連続になるか

[FLUID42 のノズル理論](../FLUID42/index.md#thm-fluid42-area-mach)では密度・圧力・速度が滑らかに変わり、等エントロピー関係を使って亜音速・超音速の分枝を求めた。しかし、超音速流がごく薄い領域で突然減速することがある。厚さを縮めた模型では、流れの状態が**一つの面で不連続**になる。

不連続点に微分方程式をそのまま代入することはできない。それでも[FLUID41 の圧縮性Euler保存形](../FLUID41/index.md#thm-fluid41-euler-conservative)を使えば、面を跨ぐ質量・運動量・全エネルギーを比較できる。本講は、保存則による跳躍、物理的に許される分枝、エントロピー生成と全圧損失を一続きに導く。

## 0. 前後状態と波面の向きを定める

右向きを正とする一次元座標 $x$ [m] をとる。衝撃波は $x=0$ に静止させ、左を上流 $1$、右を下流 $2$ とする。波面に対して右向きの速度 $u_i>0$ [m/s]、密度 $\rho_i>0$ [kg/m$^3$]、静圧 $p_i>0$ [Pa]、絶対温度 $T_i>0$ [K] が各側で有限かつ一様とする（$i=1,2$）。波面の外側は定常、非粘性、非熱伝導で、外力・軸仕事・熱供給・断面変化を無視する。波面内部には散逸があってよいが、厚さを零にした極限の保存流束を扱う。

気体は[FLUID41 の定数比熱理想気体](../FLUID41/index.md#def-fluid41-ideal-gas)で、$p=\rho RT$、$e=c_vT$、$c_p=c_v+R$、$\gamma=c_p/c_v=1+R/c_v>1$ とする。$R,c_v$ は正の定数である。局所[音速](../FLUID41/index.md#def-fluid41-sound-speed)は $c_i=\sqrt{\gamma RT_i}>0$、波面静止系の Mach 数は $M_i=u_i/c_i$ である。

<a id="def-fluid43-jump-traces"></a>

<!-- formal-statement-start -->
> **定義（波面の前後状態と跳び）**  
> 片側極限 $f_1=\lim_{x\uparrow0}f(x)$、$f_2=\lim_{x\downarrow0}f(x)$ が存在する量 $f$ の**跳び**を $[f]=f_2-f_1$ と定める。$[f]=0$ は、その量が波面で連続であることを意味する。$1$ と $2$ の向きを逆にすれば跳びの符号も変わる。
<!-- formal-statement-end -->

<!-- definition-example-start: def-fluid43-jump-traces -->
**直接例**：静圧が上流 $100$ kPa、下流 $450$ kPa なら $[p]=350$ kPa。質量流束が両側で $800$ kg/(m$^2$s) なら $[\rho u]=0$ であり、**状態は跳んでも流束は連続**ということがあり得る。この値は記法の確認であり、他の保存則が満たされたとまだ主張していない。
<!-- definition-example-end -->

「正面衝撃波」とは、上流速度が波面に垂直に流入し、圧縮を伴って $M_1>1$ から $M_2<1$ へ移る定常波面をいう。本講では流体が波面を跨ぐ $j>0$ の場合に限定する。斜めに入る場合は FLUID44 で扱う。

## 1. 保存形から跳躍条件を導く

静止波面を跨ぐ薄い検査区間を考える。[保存変数とフラックス](../FLUID41/index.md#thm-fluid41-euler-conservative)を一次元で書くと

$$
U=(\rho,\rho u,E)^T,\qquad
F=(\rho u,\rho u^2+p,(E+p)u)^T,
\qquad
E=\rho e+\frac12\rho u^2.
$$

圧力 $p$ は運動量流束に加わり、圧力仕事 $pu$ はエネルギー流束に加わる。「移流分だけ保存」とする計算は正しくない。

<a id="thm-fluid43-jump-balance"></a>

<!-- formal-statement-start -->
> **定理（正面定常波面の質量・運動量・エネルギー跳躍条件）**  
> 第0節の一様な両側状態が定常の[圧縮性Euler保存則](../FLUID41/index.md#thm-fluid41-euler-conservative)を保存的な弱い意味で満たすなら、波面を跨いで

$$
[\rho u]=0,\qquad [\rho u^2+p]=0,\qquad [(E+p)u]=0
$$

> が必要である。質量流束 $j:=\rho_1u_1=\rho_2u_2>0$ と比エンタルピー $h=e+p/\rho=c_pT$ を使うと、これらは

$$
j=\rho_1u_1=\rho_2u_2,
\qquad p_1+ju_1=p_2+ju_2,
$$

$$
c_pT_1+\frac{u_1^2}{2}
=c_pT_2+\frac{u_2^2}{2}
$$

> と同値である。静圧や温度が保存するという主張ではなく、最後の式は**単位質量当たりの全エンタルピー**が波面で等しいことを表す。
<!-- formal-statement-end -->

### 証明の見取り図

[FLUID41 の一次元フラックス](../FLUID41/index.md#thm-fluid41-euler-conservative)を波面にかかる幅 $2\varepsilon$ の区間で積分し、$\varepsilon\downarrow0$ を取る。エネルギー式を質量で割るには $j>0$ が必要である。

<!-- proof-start -->
### 証明

定常の保存形 $\partial_xF=0$ を $(-\varepsilon,\varepsilon)$ で積分すると

$$
0=\int_{-\varepsilon}^{\varepsilon}\partial_xF\,dx
=F(\varepsilon)-F(-\varepsilon).
$$

区間に含まれる波面を滑らかな点と仮定せず、積分保存則の両側の極限を使う。流束の片側極限が有限なら $\varepsilon\downarrow0$ で $F_2-F_1=0$。三成分に分けると最初の三つの条件を得る。

質量保存から $j=\rho_1u_1=\rho_2u_2$。各速度と密度は正なので $j>0$。運動量式 $\rho_1u_1^2+p_1=\rho_2u_2^2+p_2$ の二次項を $ju_i$ へ置き換えると第二式になる。

エネルギー流束の各側は、$e_i=c_vT_i$ と $p_i/\rho_i=RT_i$ を用いて

$$
\begin{aligned}
(E_i+p_i)u_i
&=\rho_iu_i\left(e_i+\frac{p_i}{\rho_i}+\frac{u_i^2}{2}\right)\\
&=j\left((c_v+R)T_i+\frac{u_i^2}{2}\right)\\
&=j\left(c_pT_i+\frac{u_i^2}{2}\right).
\end{aligned}
$$

両側でこれが等しいから、正の $j$ で割って第三式を得る。
<!-- proof-end -->

**最初の帰結**：$u_1>u_2$ と仮定すると、運動量式を移項して

$$
p_2-p_1=j(u_1-u_2)>0.
$$

流速が減っても運動量流束全体は保存する。圧力による寄与が増えるためである。

**波面が動く場合**：実験室系の波面速度を $S$、両側速度を $v_i$ とすれば、波面を跨ぐ移動検査体積の保存則は $S[U]=[F]$ となる。これを[Rankine–Hugoniot 条件](../../../../解析系/NPDE/NPDE1/index.md)という。ここでの公式は相対速度 $u_i=v_i-S$ を使って得る。$S=0$ で本講の静止波面へ戻る。

## 2. 圧力・密度・速度の跳びを Mach 数から決める

無次元量 $r=\rho_2/\rho_1>0$（密度比）、$P=p_2/p_1>0$（静圧比）を導入する。質量保存から $u_2=u_1/r$ である。上流状態の[音速](../FLUID41/index.md#def-fluid41-sound-speed)を使うと $u_1^2=\gamma(p_1/\rho_1)M_1^2$ が成り立つ。

<a id="thm-fluid43-normal-shock-ratios"></a>

<!-- formal-statement-start -->
> **定理（定数比熱理想気体の正面衝撃波関係）**  
> $\gamma>1$、$M_1>1$ で、[三つの跳躍条件](#thm-fluid43-jump-balance)を満たす非自明な圧縮型波面を考える。このとき

$$
r=\frac{\rho_2}{\rho_1}
=\frac{(\gamma+1)M_1^2}{(\gamma-1)M_1^2+2},
\qquad
P=\frac{p_2}{p_1}
=1+\frac{2\gamma}{\gamma+1}(M_1^2-1),
$$

$$
\frac{T_2}{T_1}=\frac{P}{r},
\qquad
M_2^2=\frac{1+(\gamma-1)M_1^2/2}
{\gamma M_1^2-(\gamma-1)/2}
$$

> である。$r>1,P>1,T_2>T_1,0<u_2<u_1,0<M_2<1$ となる。一方、$r=1$ は同じ状態が続く自明な分枝である。
<!-- formal-statement-end -->

### 証明の見取り図

質量保存で $u_2=u_1/r$ にし、運動量から $P$ を $r$ で表してエネルギーへ代入する。非自明な解を求める前に、同じ状態が続く $r=1$ も保持して因数分解する。

<!-- proof-start -->
### 証明

[運動量跳躍条件](#thm-fluid43-jump-balance)で $\rho_2u_2^2=\rho_1u_1^2/r$ と置けば

$$
p_2-p_1=\rho_1u_1^2\left(1-\frac1r\right),
\qquad
P=1+\gamma M_1^2\left(1-\frac1r\right).
$$

[全エンタルピーの跳躍条件](#thm-fluid43-jump-balance)に $c_p=\gamma R/(\gamma-1)$、$RT_i=p_i/\rho_i$、$u_2=u_1/r$ を代入すると

$$
\frac{\gamma}{\gamma-1}\frac{p_1}{\rho_1}
\left(\frac Pr-1\right)
=\frac{u_1^2}{2}\left(1-\frac1{r^2}\right).
$$

$u_1^2=\gamma(p_1/\rho_1)M_1^2$ を入れ、正の $\gamma p_1/\rho_1$ を消して整理すると

$$
2r(P-r)=(\gamma-1)M_1^2(r^2-1).
$$

先の $P$ を代入した左辺から右辺を引き、

$$
\begin{aligned}
0
&=2r(1-r)+2\gamma M_1^2(r-1)
-(\gamma-1)M_1^2(r-1)(r+1)\\
&=(r-1)\bigl[(\gamma+1)M_1^2-
(2+(\gamma-1)M_1^2)r\bigr].
\end{aligned}
$$

従って $r=1$ または提示した $r$ を得る。非自明な根について

$$
r-1=\frac{2(M_1^2-1)}{2+(\gamma-1)M_1^2}>0.
$$

運動量から

$$
1-\frac1r=\frac{2(M_1^2-1)}{(\gamma+1)M_1^2},
\qquad
P=1+\frac{2\gamma}{\gamma+1}(M_1^2-1)>1.
$$

状態方程式より $T_2/T_1=P/r$。先のエネルギー中間式を使えば

$$
P-r=\frac{(\gamma-1)M_1^2(r^2-1)}{2r}>0
$$

なので $T_2>T_1$。局所音速 $c_2^2=\gamma p_2/\rho_2$ を用い、

$$
M_2^2=\frac{u_1^2/r^2}{\gamma p_1P/(\rho_1r)}
=\frac{M_1^2}{rP}
=\frac{2+(\gamma-1)M_1^2}{2\gamma M_1^2-(\gamma-1)}.
$$

分母から分子を引くと $(\gamma+1)(M_1^2-1)>0$。ゆえに $0<M_2^2<1$、$M_2>0$ より $0<M_2<1$。
<!-- proof-end -->

**直接計算**：$\gamma=1.4,M_1=2$ なら

$$
r=\frac{2.4\cdot4}{0.4\cdot4+2}=\frac83,\qquad
P=1+\frac{2.8}{2.4}(4-1)=\frac92,
$$

$$
\frac{T_2}{T_1}=\frac{9/2}{8/3}=\frac{27}{16},
\qquad
M_2^2=\frac{1+0.2\cdot4}{1.4\cdot4-0.2}=\frac13.
$$

下流 $M_2=1/\sqrt3\simeq0.57735$。速度は $u_2/u_1=3/8$。静圧・密度は増えるが、流速と Mach 数は減る。

## 3. 断熱でもエントロピーが増えることを証明する

滑らかな流れで得た[等エントロピー関係](../FLUID41/index.md#prop-fluid41-isentropic)を波面の前後にそのまま接続してはならない。衝撃波の薄い内部では散逸があり、外から熱を受けなくても比エントロピー $s$ [J/(kg K)] が生成される。[CTM10 のエントロピー原理](../../CTM/CTM10/index.md#principle-ctm10-entropy)では、断熱の不可逆な過程のエントロピー生成が負にならない。

[FLUID41 の Gibbs 関係](../FLUID41/index.md#prop-fluid41-isentropic)から、正の状態間では

$$
s_2-s_1
=c_v\ln\frac{p_2}{p_1}
-c_p\ln\frac{\rho_2}{\rho_1}
=c_v(\ln P-\gamma\ln r).
$$

<a id="thm-fluid43-entropy-selection"></a>

<!-- formal-statement-start -->
> **定理（圧縮型正面衝撃波のエントロピー増大）**  
> $\gamma>1$、$M_1>1$ に対する非自明な[正面衝撃波関係](#thm-fluid43-normal-shock-ratios)のもと、比エントロピーの差は

$$
\Delta s=s_2-s_1
=c_v(\ln P-\gamma\ln r)>0.
$$

> 定常断熱波面のエントロピー流束の増加は $j\Delta s>0$ である。$M_1\downarrow1$ では $\Delta s\downarrow0$ となる。膨張型の非自明な代数的跳躍は、この非負条件によって排除される。
<!-- formal-statement-end -->

### 証明の見取り図

$r$ から $M_1^2$ を解き、圧力比を $P(r)$ として表す。$G(r)=\ln P(r)-\gamma\ln r$ の導関数が正で、$G(1)=0$ であることを直接示す。

<!-- proof-start -->
### 証明

[密度比の公式](#thm-fluid43-normal-shock-ratios)から

$$
1<r<\frac{\gamma+1}{\gamma-1},\qquad
M_1^2=\frac{2r}{D},\qquad D=(\gamma+1)-(\gamma-1)r>0.
$$

圧力比へ代入すると

$$
\begin{aligned}
P
&=1+\frac{2\gamma}{\gamma+1}
\left(\frac{2r}{D}-1\right)\\
&=1+\frac{2\gamma(r-1)}D
=\frac{A}{D},
\qquad A=(\gamma+1)r-(\gamma-1)>0.
\end{aligned}
$$

従って $G(r)=\ln A-\ln D-\gamma\ln r$。$A,D,r$ が正なので微分でき、

$$
\begin{aligned}
G'(r)
&=\frac{\gamma+1}{A}
+\frac{\gamma-1}{D}-\frac{\gamma}{r}\\
&=\frac{\gamma(\gamma^2-1)(r-1)^2}{rAD}>0
\qquad(r>1).
\end{aligned}
$$

二行目は正の共通分母 $rAD$ で通分して分子を展開した結果である。$r=1$ なら $A=D=2$ で $G(1)=0$。それゆえ $r>1$ で $G(r)>0$。$c_v>0$ を掛ければ $\Delta s>0$。$M_1\downarrow1$ なら $r\downarrow1$ で $G(r)\downarrow0$ となる。
<!-- proof-end -->

### 全圧は保存するか

[FLUID42 の停滞状態](../FLUID42/index.md#def-fluid42-stagnation)を、**衝撃波の各側で別々に**可逆に速度零へ落とす仮想状態として定める。$c_pT_{0i}=c_pT_i+u_i^2/2$、$p_{0i}$ はその停止操作での圧力である。実際に衝撃波を可逆に通過させるという意味ではない。

[全エンタルピー保存](#thm-fluid43-jump-balance)から $T_{02}=T_{01}$。理想気体の比エントロピー差は $c_p\ln(T_{02}/T_{01})-R\ln(p_{02}/p_{01})$ でも表せるので

$$
\Delta s=-R\ln\frac{p_{02}}{p_{01}},
\qquad
\frac{p_{02}}{p_{01}}=\exp(-\Delta s/R)<1.
$$

つまり**全温は等しいが全圧は低下する**。波面を跨いで同じ全圧を仮定して[等エントロピーの面積–Mach関係](../FLUID42/index.md#thm-fluid42-area-mach)を適用することはできない。
