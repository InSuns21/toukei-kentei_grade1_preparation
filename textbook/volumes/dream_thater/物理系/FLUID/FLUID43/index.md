# FLUID43 衝撃波を跨ぐと何が不連続になるか

[FLUID42 のノズル理論](../FLUID42/index.md#thm-fluid42-area-mach)では密度・圧力・速度が滑らかに変わり、等エントロピー関係を使って亜音速・超音速の分枝を求めた。しかし、超音速流がごく薄い領域で突然減速することがある。厚さを縮めた模型では、流れの状態が**一つの面で不連続**になる。

不連続点に微分方程式をそのまま代入することはできない。それでも[FLUID41 の圧縮性Euler保存形](../FLUID41/index.md#thm-fluid41-euler-conservative)を使えば、面を跨ぐ質量・運動量・全エネルギーを比較できる。本講は、保存則による跳躍、物理的に許される分枝、エントロピー生成と全圧損失を一続きに導く。

## 0. 前後状態と波面の向きを定める

右向きを正とする一次元座標 $x$ [m] をとり、波面を $x=0$ に静止させる。左が上流（添字 $1$）、右が下流（添字 $2$）である。

各側の気体を一様な状態とみなし、密度を $\rho_i$ [kg/m$^3$]、波面に対して右向きの流速を $u_i$ [m/s] とする。静圧 $p_i$ [Pa] と絶対温度 $T_i$ [K] も用い、これら四量に正値を仮定する（$i=1,2$）。

$$
\rho_i>0,\qquad u_i>0,\qquad p_i>0,\qquad T_i>0.
$$

波面の外側は定常、非粘性、非熱伝導で、外力・軸仕事・熱供給・断面変化を無視する。波面内部には散逸があってよいが、厚さを零にした極限の保存流束を扱う。

気体は[FLUID41 の定数比熱理想気体](../FLUID41/index.md#def-fluid41-ideal-gas)で、$p=\rho RT$、$e=c_vT$、$c_p=c_v+R$、$\gamma=c_p/c_v=1+R/c_v>1$ とする。$R,c_v$ は正の定数である。局所[音速](../FLUID41/index.md#def-fluid41-sound-speed)は $c_i=\sqrt{\gamma RT_i}>0$、波面静止系の Mach 数は $M_i=u_i/c_i$ である。

<a id="def-fluid43-jump-traces"></a>

<!-- formal-statement-start -->
> **定義（波面の前後状態と跳び）**  
> 波面の左右に片側極限がある量 $f$ を考える。下流の値から上流の値を引いたものを、その量の**跳び**とする。

$$
f_1=\lim_{x\uparrow0}f(x),\qquad
f_2=\lim_{x\downarrow0}f(x),\qquad
[f]=f_2-f_1.
$$

> $[f]=0$ はその量が波面で連続であることを意味する。$1$ と $2$ の向きを逆にすれば跳びの符号も変わる。
<!-- formal-statement-end -->

<!-- definition-example-start: def-fluid43-jump-traces -->
**定義の確認**：上流 $p_1=100$ kPa、下流 $p_2=450$ kPa なら、下流から上流を引いて $[p]=450-100=350$ kPa となる。また $\rho_1=1$ kg/m$^3$、$u_1=800$ m/s、$\rho_2=2$ kg/m$^3$、$u_2=400$ m/s を仮に選べば、

$$
[\rho u]=\rho_2u_2-\rho_1u_1=2\cdot400-1\cdot800=0
\quad {\rm kg/(m^2s)}.
$$

したがって**状態が跳んでも質量流束は連続**となり得る。これは $f_1,f_2$ と $[f]$ の計算法の確認であり、運動量・エネルギーを含むすべての保存則を満たす例だとはまだ主張していない。
<!-- definition-example-end -->

速度が波面に垂直な定常波面を**正面波面**といい、下流で密度が増す $\rho_2>\rho_1$ の場合を**圧縮型**という。第2節では、上流が $M_1>1$ なら非自明な圧縮型の下流は $M_2<1$ になることを導き、これを正面衝撃波として扱う。本講は両側の流速 $u_i>0$ に限定する。両側で等しい質量流束 $j>0$ は第1節で保存則から導く。斜めに入る場合は FLUID44 で扱う。

## 1. 保存形から跳躍条件を導く

静止波面を跨ぐ薄い検査区間を考える。[保存変数とフラックス](../FLUID41/index.md#thm-fluid41-euler-conservative)を一次元で書くと

$$
U=(\rho,\rho u,E)^T,\qquad
F=(\rho u,\rho u^2+p,(E+p)u)^T,
\qquad
E=\rho e+\frac12\rho u^2.
$$

圧力 $p$ は運動量流束に加わり、圧力仕事 $pu$ はエネルギー流束に加わる。「移流分だけ保存」とする計算は正しくない。

不連続面では $\partial_xF$ を普通の導関数として評価できない。ここでいう**保存的な弱い意味**とは、面の各側で古典的な保存則が成り立つだけでなく、面を跨ぐ区間で質量・運動量・全エネルギーの流束も釣り合うという意味である。以下では、区間に支持を持つ滑らかな試験関数を使って、その条件を明示的に確認する。

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

両側が一様なので、波面の左では $F(x)=F_1$、右では $F(x)=F_2$ である。任意の $\varepsilon>0$ に対し、$(-\varepsilon,\varepsilon)$ の内部だけで非零となる滑らかな試験関数 $\varphi(x)$ を取る。$\varphi'(x)=d\varphi/dx$ は空間変数 $x$ による通常の導関数である。「弱い意味で $\partial_xF=0$」とは、各保存成分について $-\int F\varphi'(x)\,dx=0$ が成り立つことである。通常の微分が存在しない $x=0$ を避けて両側で積分すると、

$$
\begin{aligned}
0&=-\int_{-\varepsilon}^{\varepsilon}F(x)\varphi'(x)\,dx\\
&=-F_1\bigl(\varphi(0)-\varphi(-\varepsilon)\bigr)
   -F_2\bigl(\varphi(\varepsilon)-\varphi(0)\bigr)\\
&=(F_2-F_1)\varphi(0).
\end{aligned}
$$

試験関数は端で零であり、$\varphi(0)$ は任意に選べる。したがって $F_2-F_1=0$。この計算は波面で $F$ を微分したのではなく、左右の滑らかな区間で積分して境界値を突き合わせたものである。三成分に分けて最初の三つの跳躍条件を得る。

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

**波面が動く場合**：実験室系で波面が $x=St$ と動く場合は、波面速度を $S$、両側の実験室系速度を $v_i$ とする。移動する小区間 $[St-\varepsilon,St+\varepsilon]$ から見た流束は、境界自体が運ぶ分 $SU$ を差し引いた $F-SU$ である。区間内の質量・運動量・全エネルギーの増減を、両端の相対流束で釣り合わせ、区間幅を零にすると

$$
[F-SU]=0,\qquad S[U]=[F]
$$

を得る（ここで $U,F$ は**実験室系**での保存変数とフラックス）。これを Rankine–Hugoniot 条件と呼ぶ。本講の正面衝撃波へは、波面静止系の相対速度 $u_i=v_i-S$ を使って質量・運動量・エネルギーの流束を書き直す。$S=0$ なら上の三条件に戻る。一般の弱解については[発展的な証明](../../../解析系/NPDE/NPDE1/index.md#thm-npde1-rankine-hugoniot)も参照できるが、その定理を本講の前提にはしない。

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

[FLUID41 の Gibbs 関係](../FLUID41/index.md#prop-fluid41-isentropic) $T\,ds=de+p\,d(1/\rho)$ と $e=c_vT$、$p=\rho RT$ より、同じ気体の正の平衡状態を動かすと

$$
\begin{aligned}
ds&=c_v\,d\ln T-R\,d\ln\rho\\
&=c_v\,d\ln p-(c_v+R)\,d\ln\rho.
\end{aligned}
$$

ここで $T=p/(\rho R)$ を代入し、$R,c_v$ は一定とした。この状態差を両側で積分すれば

$$
s_2-s_1
=c_v\ln\frac{p_2}{p_1}
-c_p\ln\frac{\rho_2}{\rho_1}
=c_v(\ln P-\gamma\ln r)
$$

となる。微分 $d$ は熱力学的状態の変化を表すもので、波面を横切る空間微分 $\partial_x$ とは区別する。

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

$r$ から $M_1^2$ を解き、圧力比を $P(r)$ として表す。$\gamma$ を固定し、密度比 $r$ を変数とする $G(r)=\ln P(r)-\gamma\ln r$ の導関数が正で、$G(1)=0$ であることを直接示す。

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
&=\frac{(\gamma+1)rD+(\gamma-1)rA-\gamma AD}{rAD}\\
&=\frac{\gamma(\gamma^2-1)(r-1)^2}{rAD}>0
\qquad(r>1).
\end{aligned}
$$

通分では、$\ln A$ と $-\ln D$ の微分にそれぞれ $A'=\gamma+1$、$D'=-(\gamma-1)$ を使った。すでに定めた $A,D$ を分子へ代入して展開・因数分解すると、上記の $(r-1)^2$ を含む式になる。

$r=1$ では $A=D=2$ なので $G(1)=0$ である。導関数が正であることから、圧縮型 $r>1$ では $G(r)>0$、従って $c_v>0$ より $\Delta s>0$。また $M_1\downarrow1$ なら $r\downarrow1$ となり、連続性から $\Delta s\downarrow0$ である。

この符号は熱力学の条件とも一致する。[CTM10 のエントロピー収支](../../CTM/CTM10/index.md#principle-ctm10-entropy)を波面内部の薄い定常散逸層へ適用する。外部熱供給がなく、層の両端で熱流束が零なら、単位面積・単位時間当たりのエントロピーの正味流出は非負で、

$$
[\rho u s]=(\rho_2u_2)s_2-(\rho_1u_1)s_1
=j(s_2-s_1)=j\Delta s\ge0
$$

となる。質量流束 $j>0$ と上で証明した $\Delta s>0$ から、非自明な圧縮型では厳密に正となる。

一方、非自明な膨張分枝 $0<r<1$ で $P>0$ を満たす範囲では $A,D>0$ である。同じ導関数の式はこの範囲でも $G'(r)>0$ を示すため、$G(1)=0$ と合わせて $G(r)<0$。よって $\Delta s<0$ となり、断熱衝撃波としては許されない。
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


## 4. 上流 Mach 数 2 の状態を保存則に戻す

$\gamma=1.4$、$R=287$ J/(kg K)、$p_1=100000$ Pa、$T_1=300$ K、$M_1=2$ の理想気体を考える。第2節の $r=8/3$、$P=9/2$、$T_2/T_1=27/16$ を使うが、結論を信じるだけでなく各流束に代入する。

$$
\rho_1=\frac{100000}{287\cdot300}\simeq1.16144\ {\rm kg/m^3},\qquad
u_1=2\sqrt{1.4\cdot287\cdot300}\simeq694.38\ {\rm m/s}.
$$

$$
\rho_2=\frac83\rho_1\simeq3.09717\ {\rm kg/m^3},\quad
u_2=\frac38u_1\simeq260.39\ {\rm m/s},\quad
p_2=450000\ {\rm Pa},\quad T_2=506.25\ {\rm K}.
$$

**質量**：両側で $j=\rho_1u_1=\rho_2u_2\simeq806.48$ kg/(m$^2$s) である。

**運動量**：$u_1^2=M_1^2\gamma RT_1$ なので

$$
p_1+\rho_1u_1^2=100000+560000=660000\ {\rm Pa},
$$

$$
p_2+\rho_2u_2^2=450000+210000=660000\ {\rm Pa}.
$$

**全エネルギー**：$c_p=\gamma R/(\gamma-1)=1004.5$ J/(kg K) より

$$
c_pT_1+\frac{u_1^2}{2}
=301350+241080=542430\ {\rm J/kg},
$$

$$
c_pT_2+\frac{u_2^2}{2}
=508516.125+33913.875=542430\ {\rm J/kg}.
$$

**不可逆性**：同じ二状態で

$$
\frac{\Delta s}{R}
=\frac{\ln(9/2)-1.4\ln(8/3)}{0.4}
\simeq0.327291>0,\qquad
\frac{p_{02}}{p_{01}}\simeq0.720874.
$$

温度上昇は外部からの熱供給を意味しない。速度の運動エネルギーが比エンタルピーへ移り、全エネルギー流束は保存したままエントロピーが増える。

## 5. Python で跳び・保存残差・エントロピーを検算する

次のブラウザ Python は[閉じた形の正面衝撃波の公式](#thm-fluid43-normal-shock-ratios)を評価する。**衝撃波内部の厚さや位置、非定常 Euler 方程式そのものを離散化するものではない**。上流 Mach 数を変えると、圧力比・密度比・下流 Mach 数・エントロピー生成と全圧比を一つの計算正本から図示する。選択された $M_1$ について質量・運動量・比全エンタルピーの相対残差も表示する。

<!-- python-file-lab -->
# lab-id: FLUID43-NORMAL-SHOCK
# lab-title: 正面衝撃波の状態比・三保存残差・エントロピー生成
# lab-file: textbook/volumes/dream_thater/物理系/FLUID/FLUID43/normal_shock_lab.py
# timeout-ms: 30000
# lab-preset: 基準：上流M=2 | --mach 2 --grid 128
# lab-preset: 弱い衝撃波：M=1.1 | --mach 1.1 --grid 128
# lab-preset: 強い衝撃波：M=5 | --mach 5 --grid 256
# lab-preset: 比熱比を変更：gamma=1.3 | --mach 2 --gamma 1.3 --grid 128
# lab-preset: 上流温度と圧力を変更 | --mach 3 --p1 100000 --t1 250 --grid 256
<!-- python-file-lab-end -->

[公開 Python ソース](normal_shock_lab.py)は標準ライブラリのみで実行できる。ローカルでは Python 3 で実行すると JSON を表示し、引数に --self-test を与えると基準値・三保存残差・入力範囲を検査する。ブラウザ実行環境は初回に通信を必要とする場合がある。

**図の読み方**：横軸は上流 Mach 数。第1図の $p_2/p_1$ と $\rho_2/\rho_1$ は異なる物理量で、同じ縦軸の無次元比として並べる。第2図の $M_2$ と $p_{02}/p_{01}$ はともに 1 未満でも意味は異なる。第3図は $(s_2-s_1)/R>0$ を検査する。残差が小さいことは解析式と保存則の**代数的整合**を示すが、解離・化学反応・有限厚さを含む実在気体模型の検証ではない。

## 6. 演習：連続でない量と保存される流束を区別する

### Level A

#### A1. 跳びの符号と質量流束
- Level: A

波面の左右で $\rho_1=1.2$、$\rho_2=2.4$ kg/m$^3$、$u_1=400$、$u_2=200$ m/s、$p_1=100$、$p_2=250$ kPa とする。$[\rho]$、$[u]$、$[p]$、$[\rho u]$ を求めよ。この結果だけで三保存則すべてを満たすと言えるか。

<!-- solution-start -->
#### 詳細解答

[跳びの定義](#def-fluid43-jump-traces)に $f_2-f_1$ を適用すると

$$
[\rho]=2.4-1.2=1.2\ {\rm kg/m^3},\quad
[u]=200-400=-200\ {\rm m/s},\quad
[p]=250-100=150\ {\rm kPa}.
$$

質量流束は $\rho_1u_1=1.2\cdot400=480$、$\rho_2u_2=2.4\cdot200=480$ kg/(m$^2$s) より $[\rho u]=0$。これは[質量跳躍条件](#thm-fluid43-jump-balance)の確認にすぎない。実際、運動量流束を Pa に直して比較すると、

$$
\rho_1u_1^2+p_1=1.2\cdot400^2+100000=292000\ {\rm Pa},
$$

$$
\rho_2u_2^2+p_2=2.4\cdot200^2+250000=346000\ {\rm Pa}
$$

で一致しない。したがって、この数値例は**質量だけは釣り合うが、運動量保存には反する**。エネルギー流束を確認するまでもなく、三保存則すべては満たさない。
<!-- solution-end -->

#### A2. 上流 M=2 の三つの状態比
- Level: A

$\gamma=1.4$、$M_1=2$ で $\rho_2/\rho_1$、$p_2/p_1$、$T_2/T_1$、$u_2/u_1$、$M_2$ を求めよ。

<!-- solution-start -->
#### 詳細解答

[正面衝撃波関係](#thm-fluid43-normal-shock-ratios)に $M_1^2=4$ を代入する。

$$
r=\frac{2.4\cdot4}{0.4\cdot4+2}=\frac83,\qquad
P=1+\frac{2.8}{2.4}(4-1)=\frac92.
$$

理想気体式より $T_2/T_1=P/r=(9/2)(3/8)=27/16$。質量保存より $u_2/u_1=1/r=3/8$。Mach 数は

$$
M_2^2=\frac{1+0.2\cdot4}{1.4\cdot4-0.2}
=\frac{1.8}{5.4}=\frac13,\quad
M_2=\frac1{\sqrt3}<1.
$$

静圧比と温度比は同じではなく、後者には密度比で割る操作が必要である。
<!-- solution-end -->

#### A3. 運動量流束が同じときの圧力上昇
- Level: A

$j=500$ kg/(m$^2$s)、$u_1=300$、$u_2=150$ m/s の定常波面で、静圧差 $p_2-p_1$ を求めよ。

<!-- solution-start -->
#### 詳細解答

[運動量の跳躍条件](#thm-fluid43-jump-balance)は $p_1+ju_1=p_2+ju_2$。移項すると

$$
p_2-p_1=j(u_1-u_2)
=500(300-150)=75000\ {\rm Pa}=75\ {\rm kPa}.
$$

$u_1>u_2$ と $j>0$ によって下流の静圧が高い。単位は kg/(m$^2$s)$\times$m/s=kg/(m s$^2$)=Pa である。
<!-- solution-end -->

#### A4. 静温上昇と断熱
- Level: A

$c_p=1000$ J/(kg K)、$T_1=300$ K、$u_1=400$、$u_2=200$ m/s で比全エンタルピーが保存するとき $T_2$ を求めよ。熱を外部から加えたと結論できるか。

<!-- solution-start -->
#### 詳細解答

[全エンタルピー保存](#thm-fluid43-jump-balance)から

$$
c_pT_2=c_pT_1+\frac{u_1^2-u_2^2}{2}
=300000+\frac{160000-40000}{2}
=360000\ {\rm J/kg}.
$$

よって $T_2=360000/1000=360$ K。速度の二乗が減った分だけ比エンタルピーが増えるので、外部熱供給は必要ない。ただしこの入力だけでは他の二保存式・気体状態方程式を確認したことにならない。
<!-- solution-end -->

#### A5. 全圧の低下を数値化する
- Level: A

$\Delta s/R=0.20$ の理想気体正面衝撃波について $p_{02}/p_{01}$、$T_{02}/T_{01}$ を求めよ。

<!-- solution-start -->
#### 詳細解答

第3節で[エントロピー増大](#thm-fluid43-entropy-selection)から導いた関係を使い

$$
\frac{p_{02}}{p_{01}}=e^{-\Delta s/R}=e^{-0.20}\simeq0.81873.
$$

一方[全エンタルピーの跳躍](#thm-fluid43-jump-balance)から $c_pT_{02}=c_pT_{01}$、$c_p>0$ なので $T_{02}/T_{01}=1$。全温は一定だが全圧は低下する。
<!-- solution-end -->

### Level B

#### B1. 密度比の二分枝を再構成する
- Level: B

$\gamma>1,M_1>1,j>0$ として、三保存則から $r=1$ または $r=(\gamma+1)M_1^2/(2+(\gamma-1)M_1^2)$ を導け。

<!-- solution-start -->
#### 詳細解答

質量保存は $u_2=u_1/r$。運動量保存と $u_1^2=\gamma(p_1/\rho_1)M_1^2$ から

$$
P=1+\gamma M_1^2(1-1/r).
$$

エネルギー保存へ $c_pT_i=\gamma p_i/((\gamma-1)\rho_i)$ を入れ、

$$
\frac{\gamma}{\gamma-1}\frac{p_1}{\rho_1}(P/r-1)
=\frac{\gamma p_1M_1^2}{2\rho_1}(1-1/r^2).
$$

正の $\gamma p_1/\rho_1$ を消し、両辺へ $2(\gamma-1)r^2$ を掛けると $2r(P-r)=(\gamma-1)M_1^2(r^2-1)$。$P$ を代入して

$$
(r-1)[(\gamma+1)M_1^2-(2+(\gamma-1)M_1^2)r]=0.
$$

ゆえに $r=1$ または設問の値である。非自明な根は $r-1=2(M_1^2-1)/(2+(\gamma-1)M_1^2)>0$ なので圧縮型となる。
<!-- solution-end -->

#### B2. 形式的な膨張不連続はなぜ解でないか
- Level: B

$\gamma=1.4,M_1=0.5$ を非自明な代数分枝に形式的に代入し、$r,P,\Delta s/R$ を求めよ。なぜ断熱の物理的正面衝撃波ではないか説明せよ。

<!-- solution-start -->
#### 詳細解答

$M_1^2=1/4$ を[跳躍の代数公式](#thm-fluid43-normal-shock-ratios)に入れると

$$
r=\frac{2.4/4}{0.4/4+2}=\frac{0.6}{2.1}=\frac27,
\quad
P=1+\frac{7}{6}(1/4-1)=\frac18.
$$

[FLUID41 の Gibbs 関係](../FLUID41/index.md#prop-fluid41-isentropic)から導いた、正の二状態に適用できるエントロピーの状態差は

$$
\frac{\Delta s}{R}
=\frac{\ln(1/8)-1.4\ln(2/7)}{0.4}
\simeq-0.81393.
$$

これは圧力・密度が減る膨張型跳躍で、[CTM10 のエントロピー生成非負](../../CTM/CTM10/index.md#principle-ctm10-entropy)に反する。三保存式だけなら代数的に存在しても、断熱の物理解として採用できない。$M_1>1$ という[正面衝撃波定理](#thm-fluid43-normal-shock-ratios)の仮定を外して**形式代入**したことに注意する。
<!-- solution-end -->

#### B3. 停滞圧が保存しない理由を導く
- Level: B

定数比熱理想気体の正面衝撃波で、$T_{02}=T_{01}$ と $p_{02}/p_{01}=\exp(-\Delta s/R)$ を保存則とエントロピーの式から導け。

<!-- solution-start -->
#### 詳細解答

[FLUID42 の停滞状態](../FLUID42/index.md#def-fluid42-stagnation)により $c_pT_{0i}=c_pT_i+u_i^2/2$。[全エンタルピー跳躍](#thm-fluid43-jump-balance)で左右は等しいから $T_{02}=T_{01}$。

各側で状態を**別々に可逆停止**させた停滞圧について、理想気体のエントロピー差を

$$
\Delta s=c_p\ln\frac{T_{02}}{T_{01}}
-R\ln\frac{p_{02}}{p_{01}}
$$

と書く。第一項が零なので $\Delta s=-R\ln(p_{02}/p_{01})$。指数を取り $p_{02}/p_{01}=e^{-\Delta s/R}$。[エントロピー増大](#thm-fluid43-entropy-selection)によりこの比は 1 より小さい。
<!-- solution-end -->

#### B4. 強い衝撃波の密度比と Mach 数の限界
- Level: B

$\gamma>1$ 固定で $M_1\to\infty$ の極限を取り、$\rho_2/\rho_1$ と $M_2$ の極限を求めよ。$p_2/p_1$ の極限とも比較せよ。

<!-- solution-start -->
#### 詳細解答

[正面衝撃波関係](#thm-fluid43-normal-shock-ratios)の分子・分母を $M_1^2$ で割ると

$$
r=\frac{\gamma+1}{\gamma-1+2/M_1^2}
\longrightarrow\frac{\gamma+1}{\gamma-1}.
$$

下流 Mach 数は

$$
M_2^2=\frac{M_1^{-2}+(\gamma-1)/2}
{\gamma-(\gamma-1)/(2M_1^2)}
\longrightarrow\frac{\gamma-1}{2\gamma}.
$$

正の根を取って $M_2\to\sqrt{(\gamma-1)/(2\gamma)}<1$。一方

$$
P=1+\frac{2\gamma}{\gamma+1}(M_1^2-1)\longrightarrow\infty.
$$

圧力は密度だけでなく温度にも比例するため、密度比が有限でも圧力比は発散し得る。高温で比熱一定という仮定が崩れる現実の気体に、この形式的極限を無条件に当てはめてはならない。
<!-- solution-end -->

### Level C

#### C1. 上流 M=3 の正面衝撃波を一貫して計算する
- Level: C

$\gamma=1.4,R=287$ J/(kg K)、$p_1=100$ kPa、$T_1=300$ K、$M_1=3$ とする。(i) $r,P,T_2/T_1,M_2$、(ii) 前後の $\rho,u,p,T$、(iii) 三保存流束の一致、(iv) $\Delta s/R$ と $p_{02}/p_{01}$ を計算せよ。ノズル内の背圧がこの計算だけで決まらない理由も述べよ。

<!-- solution-start -->
#### 詳細解答

(i) [跳躍関係](#thm-fluid43-normal-shock-ratios)に $M_1^2=9$ を代入すると

$$
r=\frac{2.4\cdot9}{0.4\cdot9+2}=\frac{27}{7}\simeq3.85714,\quad
P=1+\frac76(9-1)=\frac{31}{3}\simeq10.33333,
$$

$$
\frac{T_2}{T_1}=\frac{P}{r}
=\frac{217}{81}\simeq2.67901,\quad
M_2^2=\frac{1+0.2\cdot9}{1.4\cdot9-0.2}=\frac7{31},
\quad M_2\simeq0.47519.
$$

(ii) 上流の音速は $\sqrt{1.4\cdot287\cdot300}\simeq347.19$ m/s なので

$$
\rho_1=\frac{100000}{287\cdot300}\simeq1.16144\ {\rm kg/m^3},
\qquad u_1=3\sqrt{1.4\cdot287\cdot300}\simeq1041.57\ {\rm m/s}.
$$

$$
\rho_2=\frac{27}{7}\rho_1\simeq4.47984\ {\rm kg/m^3},
\quad u_2=\frac7{27}u_1\simeq270.04\ {\rm m/s},
$$

$$
p_2=\frac{31}{3}\cdot100000\simeq1.03333\times10^6\ {\rm Pa},
\qquad T_2=\frac{217}{81}\cdot300\simeq803.70\ {\rm K}.
$$

(iii) 質量流束は $\rho_2u_2=(r\rho_1)(u_1/r)=\rho_1u_1\simeq1209.72$ kg/(m$^2$s) で一致する。運動量は

$$
j(u_1-u_2)=\rho_1u_1^2(1-1/r)
=\gamma p_1M_1^2\left(1-\frac7{27}\right)
=1.4\cdot100000\cdot9\cdot\frac{20}{27}
=\frac{28}{3}\cdot100000\ {\rm Pa},
$$

$$
p_2-p_1=\left(\frac{31}{3}-1\right)100000
=\frac{28}{3}\cdot100000\ {\rm Pa}
$$

と一致する。エネルギーについて $c_p=1004.5$ J/(kg K) より

$$
H_1=c_pT_1+\frac{u_1^2}{2}
=301350+\frac{9\cdot1.4\cdot287\cdot300}{2}
=843780\ {\rm J/kg},
$$

$$
H_2=c_pT_1\frac{217}{81}+\frac{u_1^2}{2}\left(\frac7{27}\right)^2
=807320.37+36459.63=843780\ {\rm J/kg}.
$$

$j>0$ で $H_1=H_2$ なので全エネルギー流束 $jH$ も一致する。

(iv) [圧縮型正面衝撃波のエントロピー増大](#thm-fluid43-entropy-selection)から

$$
\frac{\Delta s}{R}
=\frac{\ln(31/3)-1.4\ln(27/7)}{0.4}
\simeq1.11369>0,\quad
\frac{p_{02}}{p_{01}}=e^{-1.11369}\simeq0.32834.
$$

ここで与えたのは**衝撃波直前の局所上流状態**であって、ノズルの面積・衝撃波位置・出口背圧を指定していない。ノズルの境界条件と、波面の前後それぞれで[FLUID42 の滑らかな面積–Mach関係](../FLUID42/index.md#thm-fluid42-area-mach)をどのように接続するかを追加で解く必要がある。
<!-- solution-end -->

## 7. 接触不連続や滑らかな流れとどう違うか

圧縮型正面衝撃波では $u,\rho,p,T,M,s$ が一般に不連続で、$\rho,p,T,s$ は増え $u,M$ は減る。それでも[質量・運動量・全エネルギーの流束](#thm-fluid43-jump-balance)は連続、全温は一定である。[停滞圧](../FLUID42/index.md#def-fluid42-stagnation)は低下する。

これに対し、波面静止系で $j=0$ の**接触不連続**では、両側の速度が零なら運動量保存は $[p]=0$ を要求するが、密度・温度は互いに異なってよい。接触面を跨ぐ質量輸送はなく、$j$ で割って全エンタルピーを等しいとする本講の導出は使えない。衝撃波と接触不連続は、ただ「何かが飛ぶ」だけで同一視できない。

本章は一次元・定常・正面・定数 $\gamma,R$ の模型であり、波面内部の構造、気体の解離・電離、斜め衝撃波や膨張扇（FLUID44）、保存形数値法による衝撃捕捉（FLUID45・48）は扱わない。特に波面を跨いで同じ $K$ を使う $p=K\rho^\gamma$ はエントロピー増大と矛盾する。
