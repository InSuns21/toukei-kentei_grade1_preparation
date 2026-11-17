# FLUID41 圧縮性流れでは質量・運動量・エネルギーをどう閉じるか

[FLUID6 の非粘性流](../FLUID6/index.md#thm-fluid6-euler-equation)では一定密度で流速と圧力を求めた。しかし気体を強く押したり急に膨張させたりすると、**密度自身が変わり、圧力の仕事が内部エネルギーを変える**。質量と運動量だけでは、圧力がいくらになるか決まらない。そこでエネルギー収支と気体の[状態方程式](../../TH/TH1/index.md#def-th1-equation-of-state)を組み合わせる。

この講義の中心問いは二つである。第一に、質量・各方向の運動量・全エネルギーを同じ「蓄積＋外への流束＝0」に書けるか。第二に、わずかな圧力変化がなぜ**有限の速さ**で伝わるか。衝撃波など不連続な解は後の講義（FLUID43）で扱い、ここでは**滑らかな流れと小振幅の音**に限定する。

## 0. 対象・前提と記号

三次元領域 $\Omega\subset\mathbb R^3$ と時間区間 $I$ で、質量密度 $\rho(\boldsymbol x,t)>0$ [kg/m$^3$]、速度 $\boldsymbol u=(u_1,u_2,u_3)$ [m/s]、圧力 $p>0$ [Pa]、単位質量当たりの内部エネルギー $e$ [J/kg]、絶対温度 $T>0$ [K] を考える。場は以下の微分が意味を持つ $C^2$ 級程度とし、局所収支を積分へ移す領域は区分的 $C^1$ 境界を持つとする。圧縮を許すので $\operatorname{div}\boldsymbol u=0$ は仮定しない。

ここでは古典的な**非粘性**・**非熱伝導**・**外力なし**の流体を対象とする。Cauchy応力は $\sigma=-pI$（$I$ は $3\times3$ 単位行列）、熱流束 $\boldsymbol q=0$、体積熱供給 $r=0$、体積力 $\boldsymbol b=0$ である。これは**断熱・摩擦なし**という模型であり、どんな実在気体も必ずこの条件を満たすという主張ではない。後で追加する理想気体模型はさらに分子内部の自由度を定数比熱へ押し込める近似である。

偏微分 $\partial_t$ は位置を固定し、$\partial_j=\partial/\partial x_j$ は時刻を固定する。繰り返し添字 $i,j\in\{1,2,3\}$ は総和を取る。物質微分は $D_t=\partial_t+\boldsymbol u\cdot\nabla$。外向き単位法線を $\boldsymbol n$、$dV$ と $dS$ を体積・面積要素とする。[CTM5 の質量保存](../../CTM/CTM5/index.md#thm-ctm5-mass-equivalence)、[CTM7 の運動量収支](../../CTM/CTM7/index.md#thm-ctm7-material-momentum)、[CTM9 のエネルギー収支](../../CTM/CTM9/index.md#thm-ctm9-internal-energy)を必要に応じ使用する。

## 1. 保存形はなぜ必要か

速度だけを未知とすると、密度が変わる流れの質量を数えられない。さらに衝撃波があると微分形の速度方程式だけでは跳躍を正しく数えにくい。まず**単位体積当たりの量**を一つの列にまとめる。比内部エネルギーと運動エネルギーを加えてから密度を掛けるのは、体積の中に蓄えられた全エネルギーを数えるためである。以下の上付き $T$ は転置を表し、五つの成分を縦に並べる。

<a id="def-fluid41-conserved-state"></a>

<!-- formal-statement-start -->
> **定義（圧縮性流れの保存変数と全エネルギー）**  
> $\rho>0$、$\boldsymbol u\in\mathbb R^3$、$e\in\mathbb R$ に対し、単位体積当たりの全エネルギー $E$ と五成分の保存変数 $U$ を

$$
E=\rho e+\frac12\rho|\boldsymbol u|^2,\qquad
U=(\rho,\rho u_1,\rho u_2,\rho u_3,E)^T
$$

> とする。$E$ は J/m$^3$、運動量密度 $\rho\boldsymbol u$ は kg/(m$^2$s)。圧力 $p$ は保存変数の一成分ではなく、別途状態関係から復元する。
<!-- formal-statement-end -->

<!-- definition-example-start: def-fluid41-conserved-state -->
**定義の確認**：$\rho=1.2$ kg/m$^3$、$u_1=30$ m/s、$u_2=u_3=0$、$e=2.5\times10^5$ J/kg とすると、運動エネルギー密度は $1.2\times30^2/2=540$ J/m$^3$、内部エネルギー密度は $300000$ J/m$^3$。よって $E=300540$ J/m$^3$、$U=(1.2,36,0,0,300540)^T$。全エネルギーから速度の寄与を引けば $e=(E-|\rho\boldsymbol u|^2/(2\rho))/\rho$ を復元でき、$\rho>0$ を使う位置も明確である。
<!-- definition-example-end -->

保存変数は何が蓄えられたかを表す。**フラックス**は、固定した面を横切って単位時間に運ばれる同じ量である。例えば質量は $\rho\boldsymbol u$、運動量は移流分 $\rho u_i u_j$ に圧力の押す分 $p\delta_{ij}$ が加わる。$\delta_{ij}$ は $i=j$ のとき1、それ以外0である。圧力の仕事はエネルギーに $p\boldsymbol u$ という流束を追加する。

<a id="thm-fluid41-euler-conservative"></a>

<!-- formal-statement-start -->
> **定理（圧縮性Euler方程式の保存形）**  
> 第0節の滑らかな三次元流体が質量・運動量・全エネルギー保存を満たすとする。圧力 $p$ は状態によって決まり、$\rho>0$ とする。このとき、各点で

$$
\partial_t\rho+\partial_j(\rho u_j)=0,
$$

$$
\partial_t(\rho u_i)+\partial_j(\rho u_i u_j+p\delta_{ij})=0
\quad(i=1,2,3),
$$

$$
\partial_tE+\partial_j((E+p)u_j)=0
$$

> が成立する。同じ式は $\partial_tU+\sum_{j=1}^3\partial_jF_j(U)=0$ と書ける。方向 $j$ の五成分フラックスは

$$
F_j(U)=
(\rho u_j,\,
\rho u_1u_j+p\delta_{1j},\,
\rho u_2u_j+p\delta_{2j},\,
\rho u_3u_j+p\delta_{3j},\,
(E+p)u_j)^T.
$$

> 任意の固定された有界・滑らかな検査体積 $V$ では、各保存成分について

$$
\frac{d}{dt}\int_VU\,dV+
\int_{\partial V}\sum_j F_j(U)n_j\,dS=0
$$

> が成立する。式だけでは $p$ を $U$ から復元できず、まだ閉鎖していない。
<!-- formal-statement-end -->

### 証明の見取り図

[CTM5 の連続の式](../../CTM/CTM5/index.md#thm-ctm5-mass-equivalence)で積の微分の余分な項を消す。[CTM7 の運動量収支](../../CTM/CTM7/index.md#thm-ctm7-material-momentum)の応力へ $-pI$ を代入する。最後に[CTM9 の内部エネルギー式](../../CTM/CTM9/index.md#thm-ctm9-internal-energy)と運動エネルギーを加える。圧力の仕事を見失わないことが核心である。

<!-- proof-start -->
### 証明

[連続の式](../../CTM/CTM5/index.md#thm-ctm5-mass-equivalence)は

$$
D_t\rho=-\rho\,\partial_j u_j,\qquad
\partial_t\rho+\partial_j(\rho u_j)=0
$$

である。任意の滑らかなスカラーまたは各ベクトル成分 $f$ に積の微分を行うと

$$
\begin{aligned}
\partial_t(\rho f)+\partial_j(\rho f u_j)
&=\rho(\partial_tf+u_j\partial_jf)
+f\{\partial_t\rho+\partial_j(\rho u_j)\}\\
&=\rho D_tf.
\end{aligned}
$$

[CTM7 の局所運動量式](../../CTM/CTM7/index.md#thm-ctm7-material-momentum)で $\sigma_{ij}=-p\delta_{ij}$、$\boldsymbol b=0$ とすると

$$
\rho D_tu_i=\partial_j(-p\delta_{ij})=-\partial_i p.
$$

上の積の恒等式へ $f=u_i$ を代入すれば

$$
\partial_t(\rho u_i)+\partial_j(\rho u_i u_j)
=-\partial_i p,
$$

すなわち運動量の保存形を得る。

[CTM9 の内部エネルギー式](../../CTM/CTM9/index.md#thm-ctm9-internal-energy)で $\sigma=-pI$、$\boldsymbol q=\boldsymbol0$、$r=0$ とすれば、変形速度の跡が $\operatorname{div}\boldsymbol u$ なので

$$
\rho D_te=-p\,\operatorname{div}\boldsymbol u.
$$

一方、運動量式に $\boldsymbol u$ を内積すると

$$
\rho D_t\left(\frac12|\boldsymbol u|^2\right)
=-\boldsymbol u\cdot\nabla p.
$$

二式を足して、積の微分を一度明記すると

$$
\begin{aligned}
\rho D_t(e+|\boldsymbol u|^2/2)
&=-p\,\partial_ju_j-u_j\partial_jp\\
&=-\partial_j(pu_j).
\end{aligned}
$$

再び質量保存を使う上の恒等式で $f=e+|\boldsymbol u|^2/2$ と取れば左辺は $\partial_tE+\partial_j(Eu_j)$。圧力仕事を移項して第三の保存形を得る。最後に各成分を固定領域 $V$ 上で積分し、[Gauss の発散定理](../../../幾何系/VC/VC4/index.md#thm-vc4-gauss-divergence)をフラックスの各列へ適用すると境界積分形になる。
<!-- proof-end -->

**一次元の具体計算**：$u=(v,0,0)$ なら

$$
U=(\rho,\rho v,E)^T,\qquad
F(U)=(\rho v,\rho v^2+p,(E+p)v)^T.
$$

$\rho=1.2$、$v=30$、$p=101325$、後述の $\gamma=1.4$ で理想気体とすれば $E=p/(\gamma-1)+\rho v^2/2=253852.5$ J/m$^3$。質量流束は $36$ kg/(m$^2$s)、運動量流束は $102405$ Pa、全エネルギー流束は $(253852.5+101325)\times30=10655325$ W/m$^2$ となる。**これは一様状態のフラックス値**であり、これだけでノズルの定常解や衝撃波を求めたことにはならない。

## 2. 圧力を決めるには何を仮定するか

保存式は五本あるが、未知量 $\rho,\boldsymbol u,e,p$ は合計六個のスカラーである。気体が温度でどう圧力を変えるか（**熱的状態方程式**）と、内部エネルギーが温度でどう変わるか（**熱量的状態方程式**）を組み合わせる必要がある。

<a id="def-fluid41-ideal-gas"></a>

<!-- formal-statement-start -->
> **定義（理想気体の熱的・熱量的閉鎖）**  
> 定数の質量当たり気体定数 $R>0$ [J/(kg K)]、定積比熱 $c_v>0$ [J/(kg K)] を持つ理想気体模型では

$$
p=\rho RT,\qquad e=c_vT,\qquad
\gamma=\frac{c_v+R}{c_v}=1+\frac R{c_v}>1
$$

> を課す。ここで $T>0$、$\rho>0$ とする。従って

$$
p=(\gamma-1)\left(E-\frac{|\rho\boldsymbol u|^2}{2\rho}\right)
$$

> と保存変数から圧力を復元できる。物理的な状態領域は $\rho>0$、$E-|\rho\boldsymbol u|^2/(2\rho)>0$ である。
<!-- formal-statement-end -->

<!-- definition-example-start: def-fluid41-ideal-gas -->
**定義の確認**：$R=287$ J/(kg K)、$c_v=717.5$ J/(kg K)、$\rho=1.2$ kg/m$^3$、$T=300$ K なら $\gamma=1.4$、$p=1.2\times287\times300=103320$ Pa、$e=215250$ J/kg。静止時は $E=\rho e=258300$ J/m$^3$ で、$(\gamma-1)E=0.4\times258300=103320$ Pa と元の状態方程式に戻る。温度・密度・圧力はすべて正、単位も $[\rho RT]={\rm kg/m^3}\cdot{\rm J/kg}={\rm Pa}$ である。
<!-- definition-example-end -->

この閉鎖は**熱平衡**を仮定した局所模型であり、粘性・熱伝導・化学反応、比熱の温度依存、極端な低温・高温などを無視する。単に $p=\rho RT$ だけを追加して温度と内部エネルギーの関係を決めなければ、全エネルギーを圧力へ換算できない。

## 3. 断熱・等エントロピーと音速の関係

[CTM10 のエントロピー原理](../../CTM/CTM10/index.md#principle-ctm10-entropy)は不可逆な過程の内部生成を非負とする。**断熱**は熱の出入りがないという条件で、**等エントロピー**は同じ物質粒子の比エントロピー $s$ が一定という、より強い条件である。今回の滑らかな非粘性・非熱伝導模型では両者を結び付けられるが、衝撃波を含む弱解には無条件で延長できない。

ここで使う **Gibbs 関係** は、局所熱平衡における比内部エネルギー $e$、比体積 $1/\rho$、比エントロピー $s$ の微小な状態変化を結ぶ追加の熱力学的関係である。

$
T\,ds=de+p\,d(1/\rho).
$

$d$ は状態量の全微分であり、時間微分 $D_t$ とは異なる。これを流体粒子の軌道に沿って評価すると、連鎖律により $T D_ts=D_te+pD_t(1/\rho)$ となる。$s$ の意味とエントロピー収支の原理は [CTM10](../../CTM/CTM10/index.md#principle-ctm10-entropy) で導入されている。

<a id="prop-fluid41-isentropic"></a>

<!-- formal-statement-start -->
> **命題（滑らかな理想気体の等エントロピー関係）**  
> 第0節の滑らかな圧縮性Euler流が[理想気体の閉鎖](#def-fluid41-ideal-gas)を満たし、$R,c_v,\gamma$ が一定とする。正の温度のもと、各流体粒子に沿って

$$
D_t(p\rho^{-\gamma})=0
$$

> が成立する。さらに局所平衡での Gibbs 関係 $T\,ds=de+p\,d(1/\rho)$ を満たす比エントロピー $s$ を用いるなら $D_ts=0$ である。従って、同じエントロピーを持つ状態を比較する際に限り $p=K\rho^\gamma$（$K>0$ はその等エントロピー曲線で一定）となる。
<!-- formal-statement-end -->

### 証明の見取り図

圧縮により密度が増えると内部エネルギーも増える。質量と内部エネルギーの二式から温度と密度の対数微分を求め、$\gamma$ を使って圧力へ戻す。エントロピーの結論には熱力学の Gibbs 関係を追加で用いる。

<!-- proof-start -->
### 証明

[質量保存](../../CTM/CTM5/index.md#thm-ctm5-mass-equivalence)から

$$
D_t\rho=-\rho\,\operatorname{div}\boldsymbol u,\qquad
D_t\ln\rho=-\operatorname{div}\boldsymbol u.
$$

[内部エネルギー式](../../CTM/CTM9/index.md#thm-ctm9-internal-energy)に非粘性・熱流ゼロを代入し、$e=c_vT$、$p=\rho RT$ を使うと

$$
\begin{aligned}
\rho c_vD_tT&=-p\,\operatorname{div}\boldsymbol u\\
&=-\rho RT\,\operatorname{div}\boldsymbol u.
\end{aligned}
$$

$\rho,c_v,T>0$ より割り算でき、

$$
D_t\ln T=-\frac R{c_v}\operatorname{div}\boldsymbol u.
$$

$p=\rho RT$ と $R$ 一定を微分すると

$$
\begin{aligned}
D_t\ln p
&=D_t\ln\rho+D_t\ln T\\
&=-\left(1+\frac R{c_v}\right)\operatorname{div}\boldsymbol u\\
&=-\gamma\,\operatorname{div}\boldsymbol u
=\gamma D_t\ln\rho.
\end{aligned}
$$

従って $D_t(\ln p-\gamma\ln\rho)=0$、指数を戻して $D_t(p\rho^{-\gamma})=0$ を得る。一方 $D_t(1/\rho)=-(D_t\rho)/\rho^2=(\operatorname{div}\boldsymbol u)/\rho$。Gibbs 関係へ代入すると

$$
T D_ts=D_te+pD_t(1/\rho)
=-\frac p\rho\operatorname{div}\boldsymbol u
+\frac p\rho\operatorname{div}\boldsymbol u=0.
$$

$T>0$ だから $D_ts=0$ である。$\gamma$ 定数の理想気体では同じ $s$ の曲線上で $p\rho^{-\gamma}$ は一定である。
<!-- proof-end -->

**直接例**：同じ等エントロピー曲線上で $\rho_2=2\rho_1$ なら $p_2/p_1=2^\gamma$、$T_2/T_1=(p_2/\rho_2)/(p_1/\rho_1)=2^{\gamma-1}$。$\gamma=1.4$ ではそれぞれ約 $2.639$ と $1.320$ となる。「密度が二倍なら圧力も二倍」は**等温**なら言えるが、今回の断熱可逆変化では違う。

音速を「圧力の大きさ」そのものではなく、**密度を微小に変えたとき圧力がどれだけ増えるか**で定める。一般にはどの熱的過程で変化させるかを指定しなければ値が決まらない。

<a id="def-fluid41-sound-speed"></a>

<!-- formal-statement-start -->
> **定義（等エントロピー音速）**  
> 密度 $\rho>0$、圧力 $p>0$ の局所平衡流体で、圧力を $(\rho,s)$ の滑らかな関数 $p(\rho,s)$ とみなせ、固定した比エントロピー $s$ で $\partial p/\partial\rho>0$ とする。このとき等エントロピー音速 $c>0$ を

$$
c^2=\left(\frac{\partial p}{\partial\rho}\right)_s
$$

> と定める。定数比熱理想気体の等エントロピー曲線上では

$$
c^2=\gamma\frac p\rho=\gamma RT.
$$

<!-- formal-statement-end -->

既出の[Mach 数](../FLUID7/index.md#def-fluid7-mach)は、流体のある参照系での流速 $|\boldsymbol u|$ と音速 $c$ に対する比 $M=|\boldsymbol u|/c$ である。本講では音速 $c$ の熱力学的根拠を導き、同じ無次元比の意味を精密化した。

<!-- definition-example-start: def-fluid41-sound-speed -->
**定義の確認**：$\gamma=1.4$、$p_0=101325$ Pa、$\rho_0=1.2$ kg/m$^3$ なら $c_0^2=1.4(101325/1.2)=118212.5$ m$^2$/s$^2$、$c_0\simeq343.82$ m/s。導出は $p=K\rho^\gamma$ を $s$ 固定で微分して $\partial_\rho p=\gamma K\rho^{\gamma-1}=\gamma p/\rho$。$|\boldsymbol u|=68.8$ m/s なら $M\simeq0.200$。$\gamma>1$ と $p,\rho>0$ が $c^2>0$ を保証する。Pa/(kg/m$^3$)=m$^2$/s$^2$ も成立する。
<!-- definition-example-end -->

一方、温度を固定して $p=\rho RT$ を微分すれば $(\partial p/\partial\rho)_T=RT=p/\rho$ であり、$\gamma$ 倍ではない。**同じ状態方程式でも熱的制約によって音速候補は異なる**。本講の音波は、熱が出入りする余地がない速い微小変化を等エントロピーとして扱う。

## 4. 微小な音が伝わる式を導く

平衡を $\rho_0>0,p_0>0,\boldsymbol u_0=0$、エントロピー $s_0$ 一定の**一様静止気体**とする。音圧 $p'$、密度変動 $\rho'$、速度変動 $\boldsymbol v'$ は平衡からの微小な偏差であり、統計平均からの乱流変動ではない。正値を守るため $|\rho'|\ll\rho_0$、$|p'|\ll p_0$、$|\boldsymbol v'|\ll c_0$ とし、二次以上の摂動の積を捨てる。同じ $s_0$ の曲線上で密度を $\rho_0+\rho'$ に変えると、圧力 $p(\rho_0+\rho',s_0)$ の一次の変化は $(\partial p/\partial\rho)_{s_0}\rho'=c_0^2\rho'$ である。二次以上の項を捨てる線形化では $p'=c_0^2\rho'$ とおく。

<a id="def-fluid41-acoustic-variables"></a>

<!-- formal-statement-start -->
> **定義（線形音響摂動と音響エネルギー）**  
> 上記の一様平衡 $\rho_0,p_0,s_0$ と $c_0^2=(\partial p/\partial\rho)_{s_0}>0$ に対し、等エントロピー微小偏差を

$$
\rho=\rho_0+\rho',\qquad
p=p_0+p',\qquad
\boldsymbol u=\boldsymbol v',\qquad
p'=c_0^2\rho'
$$

> と書く。一次音響系の二次量として、単位体積当たりの音響エネルギー $\mathcal E_a$ と流束 $\boldsymbol J_a$ を

$$
\mathcal E_a=
\frac{(p')^2}{2\rho_0c_0^2}
+\frac{\rho_0|\boldsymbol v'|^2}{2},
\qquad
\boldsymbol J_a=p'\boldsymbol v'
$$

> と定める。$\mathcal E_a$ は J/m$^3$、$\boldsymbol J_a$ は W/m$^2$。$\mathcal E_a$ は平衡全エネルギー $E$ そのものではなく微小音に対する正の二次量である。
<!-- formal-statement-end -->

<!-- definition-example-start: def-fluid41-acoustic-variables -->
**定義の確認**：$\rho_0=1.2$ kg/m$^3$、$c_0=340$ m/s、$\gamma=1.4$、ある時空点の小さな音圧偏差 $p'=100$ Pa と速度偏差 $v'=0.20$ m/s を選ぶ。この段階では右向き波とは仮定しない。定義の等エントロピー条件を $\rho'=p'/c_0^2$ に戻すと

$
\rho'=\frac{100}{340^2}\simeq8.6505\times10^{-4}\ {\rm kg/m^3}.
$

平衡圧力は $p_0=\rho_0c_0^2/\gamma\simeq9.91\times10^4$ Pa で正、$|\rho'|/\rho_0<10^{-3}$、$|p'|/p_0<0.002$、$|v'|/c_0<10^{-3}$ なので微小偏差の条件にも適合する。圧力・運動エネルギー密度を**別々に**代入すると

$
\begin{aligned}
\mathcal E_a
&=\frac{100^2}{2(1.2)(340)^2}+\frac{1.2(0.20)^2}{2}\\
&\simeq0.03604+0.02400=0.06004\ {\rm J/m^3},\\
J_{a,x}&=p'v'=100(0.20)=20.0\ {\rm W/m^2}.
\end{aligned}
$

この数値は定義の代入を検証するもので、右進行波かどうかの判定には第5節の特性量を使う。
<!-- definition-example-end -->

<a id="thm-fluid41-acoustic-wave"></a>

<!-- formal-statement-start -->
> **定理（一様静止気体の線形音波方程式）**  
> 第0–3節の一定比熱理想気体の滑らかな圧縮性Euler系を、一様静止・等エントロピー平衡 $(\rho_0,\boldsymbol0,p_0)$ のまわりで一次まで線形化する。上記の微小偏差は

$$
\partial_t\rho'+\rho_0\operatorname{div}\boldsymbol v'=0,
\qquad
\rho_0\partial_t\boldsymbol v'+\nabla p'=0,
\qquad p'=c_0^2\rho'
$$

> を満たす。従って音圧は波動方程式

$$
\partial_t^2p'-c_0^2\Delta p'=0
$$

> を満たす。ここで $\Delta=\sum_{j=1}^3\partial_j^2$。これは一次近似の結果であり、有限振幅のEuler方程式の厳密な一般解ではない。
<!-- formal-statement-end -->

### 証明の見取り図

質量の移流項 $\operatorname{div}(\rho\boldsymbol u)$ で一次だけ残し、運動量の流束では速度の二乗を捨てる。圧力と密度の比例関係を代入して時間・空間微分を一回ずつ取り、速度を消去する。

<!-- proof-start -->
### 証明

$\rho=\rho_0+\rho'$、$\boldsymbol u=\boldsymbol v'$ を[質量の保存形](#thm-fluid41-euler-conservative)へ代入すると

$$
\partial_t(\rho_0+\rho')
+\operatorname{div}((\rho_0+\rho')\boldsymbol v')=0.
$$

$\rho_0$ は一定であり $\rho'\boldsymbol v'$ は二次なので捨てて第一式を得る。運動量については

$$
\partial_t((\rho_0+\rho')\boldsymbol v')
+\operatorname{div}((\rho_0+\rho')\boldsymbol v'\otimes\boldsymbol v')
+\nabla(p_0+p')=0.
$$

$\rho'\boldsymbol v'$ と $\boldsymbol v'\otimes\boldsymbol v'$ は二次以上、$\nabla p_0=0$ なので第二式になる。[等エントロピー音速](#def-fluid41-sound-speed)の固定 $s_0$ での微分係数から $\rho'=p'/c_0^2$。質量式を時間微分ではなく、まず $c_0^2$ 倍して

$$
\partial_tp'+\rho_0c_0^2\operatorname{div}\boldsymbol v'=0
$$

を得る。これを時間微分し、

$$
\partial_t^2p'
+\rho_0c_0^2\operatorname{div}(\partial_t\boldsymbol v')=0.
$$

運動量式から $\partial_t\boldsymbol v'=-(1/\rho_0)\nabla p'$ なので

$$
\partial_t^2p'
-\rho_0c_0^2\operatorname{div}\left(\frac1{\rho_0}\nabla p'\right)
=\partial_t^2p'-c_0^2\Delta p'=0.
$$

$\rho_0,c_0$ は定数であり、時間・空間微分交換が可能な滑らかさを用いた。
<!-- proof-end -->

速度 $c_0$ は**静止した気体に対する波の速さ**である。平均流が存在する場合には移流と組み合わさって進行方向の特性速度は $u_n\pm c$ となるが、この先のノズル・衝撃波の議論で詳しく扱う。

## 5. 右向きと左向きの波を見分ける

波動方程式だけでは、圧力と速度が同じ向きに動くか判断できない。一次元 $x$ 軸に沿い $v'=v'(x,t)$、$p'=p'(x,t)$ とすると、一次系は

$$
\partial_tv'+\frac1{\rho_0}\partial_xp'=0,\qquad
\partial_tp'+\rho_0c_0^2\partial_xv'=0.
$$

音圧を $\rho_0c_0$ で割ると速度の単位になり、二つの伝播方向を切り分けられる。

<a id="prop-fluid41-characteristics"></a>

<!-- formal-statement-start -->
> **命題（線形音波の左右の特性量）**  
> 第4節の一次元・一様静止気体について

$$
w_+=v'+\frac{p'}{\rho_0c_0},\qquad
w_-=v'-\frac{p'}{\rho_0c_0}
$$

> とおくと

$$
(\partial_t+c_0\partial_x)w_+=0,\qquad
(\partial_t-c_0\partial_x)w_-=0.
$$

> 従って $w_+(x,t)=w_+(x-c_0t,0)$ は右へ、$w_-(x,t)=w_-(x+c_0t,0)$ は左へ運ばれる。右向きだけの波では $w_-=0$、すなわち $v'=p'/(\rho_0c_0)$ となる。
<!-- formal-statement-end -->

### 証明の見取り図

二つの一次方程式を足し引きして微分の行列を対角化する。右進行の条件は単なる波動方程式でなく、速度と音圧の**符号を含む対応**から決まる。

<!-- proof-start -->
### 証明

[線形音響の一次式](#thm-fluid41-acoustic-wave)を使うと

$$
\begin{aligned}
\partial_tw_+&=-\frac1{\rho_0}\partial_xp'
-\frac1{\rho_0c_0}\rho_0c_0^2\partial_xv'
=-\frac1{\rho_0}\partial_xp'-c_0\partial_xv',\\
c_0\partial_xw_+&=c_0\partial_xv'+\frac1{\rho_0}\partial_xp'.
\end{aligned}
$$

加えればゼロ。同じく

$$
\partial_tw_-=-\frac1{\rho_0}\partial_xp'+c_0\partial_xv',
\qquad
-c_0\partial_xw_-=-c_0\partial_xv'+\frac1{\rho_0}\partial_xp'
$$

を足してゼロ。固定された初期位置 $\xi$ に対して $x(t)=\xi\pm c_0t$ と取ると、連鎖律で

$$
\frac d{dt}w_\pm(x(t),t)
=\partial_tw_\pm\pm c_0\partial_xw_\pm=0.
$$

初期値から二つの輸送表示を得る。$w_-=0$ を解けば $v'=p'/(\rho_0c_0)$ である。
<!-- proof-end -->

第4節の定義例では $v'=0.20$ m/s と $p'/(\rho_0c_0)=100/(1.2\times340)\simeq0.2451$ m/s が異なる。そのため $w_-\simeq-0.0451$ m/s はゼロでなく、**この局所状態を右進行波のみと判断することはできない**。

**直接例**：波長 $L$、$k=2\pi/L$、振幅 $P>0$ [Pa] とし、

$$
p'=P\cos(k(x-c_0t)),\quad
v'=\frac P{\rho_0c_0}\cos(k(x-c_0t)),\quad
\rho'=\frac P{c_0^2}\cos(k(x-c_0t)).
$$

このとき $w_-=0$、$w_+=2P\cos(k(x-c_0t))/(\rho_0c_0)$。圧力の山が右へ動くとき速度変動も右向きである。$v'$ の符号を逆にすると左向き波の条件へ変わる。

## 6. 音のエネルギーはどこへ運ばれるか

音圧が場所ごとに増減しても、熱や外力を入れない模型では、音響エネルギーは勝手には生まれない。第4節の**線形一次方程式**を掛け合わせれば、局所保存が得られる。ただし $\mathcal E_a$ は二次量であるから、この式は線形模型に対して厳密であり、有限振幅の非線形エネルギーまで証明するものではない。

<a id="prop-fluid41-acoustic-energy"></a>

<!-- formal-statement-start -->
> **命題（線形音響エネルギーの局所保存）**  
> 一様静止・等エントロピー平衡の線形音響系を滑らかな $p',\boldsymbol v'$ が満たすとする。[音響エネルギーと流束](#def-fluid41-acoustic-variables)について

$$
\partial_t\mathcal E_a+\operatorname{div}\boldsymbol J_a=0.
$$

> 周期領域、または境界全体で $\boldsymbol J_a\cdot\boldsymbol n=0$ なら、領域内の $\int\mathcal E_a\,dV$ は時間によらない。
<!-- formal-statement-end -->

### 証明の見取り図

圧力の一次式に $p'/(\rho_0c_0^2)$、運動量の一次式に $\boldsymbol v'$ を掛ける。時間微分はそれぞれ二乗の微分になり、空間微分は積 $\operatorname{div}(p'\boldsymbol v')$ になる。

<!-- proof-start -->
### 証明

[線形音波の一次式](#thm-fluid41-acoustic-wave)から

$$
\partial_tp'+\rho_0c_0^2\operatorname{div}\boldsymbol v'=0,\qquad
\rho_0\partial_t\boldsymbol v'+\nabla p'=0.
$$

第1式へ $p'/(\rho_0c_0^2)$、第2式へ $\boldsymbol v'$ を内積すると

$$
\frac{p'}{\rho_0c_0^2}\partial_tp'
+p'\operatorname{div}\boldsymbol v'=0,
$$

$$
\rho_0\boldsymbol v'\cdot\partial_t\boldsymbol v'
+\boldsymbol v'\cdot\nabla p'=0.
$$

足して、$p'\operatorname{div}\boldsymbol v'+\boldsymbol v'\cdot\nabla p'=\operatorname{div}(p'\boldsymbol v')$ と二乗の微分を使えば

$$
\partial_t\left(\frac{(p')^2}{2\rho_0c_0^2}
+\frac{\rho_0|\boldsymbol v'|^2}{2}\right)
+\operatorname{div}(p'\boldsymbol v')=0.
$$

固定領域に積分して[Gauss の発散定理](../../../幾何系/VC/VC4/index.md#thm-vc4-gauss-divergence)を用いると、境界フラックスがゼロなら積分値は一定になる。
<!-- proof-end -->

右向きだけの波では $v'=p'/(\rho_0c_0)$ だから $\boldsymbol J_a=c_0\mathcal E_a\boldsymbol e_x$。二つの進行波を重ねると音圧と速度の位相が異なり、局所のエネルギーは運ばれたり滞留したりするが、周期全体のエネルギーは一定である。

### ブラウザPython：進行波と二方向波を検算する

以下は**非線形Euler方程式の数値解ではない**。第4節の定数係数・一次元・周期長 $L$ の線形音響方程式について、右進行波と、初期速度ゼロの二方向波の**解析解を格子上で標本化**する。$p_0,\rho_0,\gamma,P,L,t$ を指定し、$c_0=\sqrt{\gamma p_0/\rho_0}$、$k=2\pi/L$ を計算する。

差分検算では $\Delta x=L/N$、$\Delta t=\Delta x/(4c_0)$ とし、解析解への中心差分から、圧力式・運動量式それぞれの**無次元化した最大残差**を報告する。$N$ と $2N$ の残差の比がおおむね4へ向かうのは中心差分の二次精度の検査であり、Eulerの数値ソルバーが収束したという意味ではない。周期平均エネルギーと解析値も別々に表示する。

<!-- python-file-lab -->
# lab-id: FLUID41-LINEAR-ACOUSTICS
# lab-title: 等エントロピー線形音波・特性速度・エネルギーの解析解検算
# lab-file: textbook/volumes/dream_thater/物理系/FLUID/FLUID41/linear_acoustics_lab.py
# timeout-ms: 30000
# lab-preset: 右向き進行波：N=256 | --mode right --grid 256
# lab-preset: 静止初期速度の二方向波 | --mode standing --grid 256
# lab-preset: 格子を細かくする：N=1024 | --mode right --grid 1024
# lab-preset: 音圧を半分にする | --mode right --amplitude 50
# lab-preset: 早い時刻で二方向波を見る | --mode standing --time 0.001 --grid 512
<!-- python-file-lab-end -->

公開 [Pythonソース](linear_acoustics_lab.py) は標準ライブラリのみを用いる。通常はこのページから実行し、ローカルでの追加検証だけ Python 3 の --self-test を用いる。ブラウザ実行環境の初回取得には通信が必要なことがある。実行できない場合でも、第5節の正弦波を一度微分すれば二つの線形方程式を満たすこと、$c_0$ が圧力と密度から決まることは紙上で確認できる。

**観察の焦点**：進行波では圧力と速度が同位相、二方向波では初期速度がゼロでも後から正負の速度が現れる。$N$ を増やした際、残差だけでなく周期平均エネルギーと理論値を突き合わせる。これは**音の局所線形模型**の検算であり、衝撃波・粘性散逸・高振幅音波を再現したものではない。

## 7. 成立範囲：何を変えると閉鎖は変わるか

- **等温変化**：熱を外と交換して $T$ を保つなら $p\propto\rho$、微分係数は $RT$。第3節の $c^2=\gamma RT$ を流用できない。
- **有限振幅**：$|\rho'|/\rho_0$ が小さくないと、捨てた積 $\rho'\boldsymbol v'$ や速度の二乗が無視できず、第4–6節の線形波・エネルギーの証明が破れる。
- **衝撃波**：場が不連続なら第3節の古典的微分操作が使えず、断熱でもエントロピーが増加しうる。第1節の**保存形**に基づき跳躍を扱う必要がある（FLUID43で導入）。
- **粘性・熱伝導・外力**：第0節の仮定を失う。例えば単位質量当たりの体積力 $\boldsymbol b$ を加えると運動量の右辺は $\rho\boldsymbol b$、全エネルギーの右辺は $\rho\boldsymbol b\cdot\boldsymbol u$ に変わる。質量保存自体は変わらない。粘性と熱流の式は[CTM15 の圧縮性Newton流体](../../CTM/CTM15/index.md#thm-ctm15-compressible-momentum)と[CTM9 のエネルギー収支](../../CTM/CTM9/index.md#thm-ctm9-internal-energy)で確認できる。

## 8. 演習：閉鎖・符号・伝播速度を手計算する

### Level A

#### A1. 保存変数とフラックスの単位
- Level: A

一次元理想気体で $\gamma=1.4,\rho=1.2$ kg/m$^3$, $v=30$ m/s, $p=101325$ Pa とする。$E$、$U=(\rho,\rho v,E)^T$、$F(U)$ を計算し、各単位を述べよ。

<!-- solution-start -->
#### 詳細解答

[理想気体の閉鎖](#def-fluid41-ideal-gas)から内部エネルギー密度は $p/(\gamma-1)=101325/0.4=253312.5$ J/m$^3$。運動エネルギー密度は $\rho v^2/2=1.2(30)^2/2=540$ J/m$^3$。従って

$$
E=253852.5\ {\rm J/m^3},\quad U=(1.2,36,253852.5)^T.
$$

[保存フラックス](#thm-fluid41-euler-conservative)は

$$
\begin{aligned}
F_1&=\rho v=36\ {\rm kg/(m^2\,s)},\\
F_2&=\rho v^2+p=1080+101325=102405\ {\rm Pa},\\
F_3&=(E+p)v=(253852.5+101325)30\\
&=10655325\ {\rm W/m^2}.
\end{aligned}
$$

$F_2$ は質量流束ではなく運動量流束で、単位 Pa = kg/(m s$^2$)。$F_3$ は単位面積・時間当たりのエネルギーである。
<!-- solution-end -->

#### A2. 等エントロピー圧縮
- Level: A

一定 $\gamma=1.4$ の理想気体が同じエントロピーのまま $\rho_2=2\rho_1$ になった。$p_2/p_1$、$T_2/T_1$ を求め、等温との違いを述べよ。

<!-- solution-start -->
#### 詳細解答

[等エントロピー関係](#prop-fluid41-isentropic)は $p\rho^{-\gamma}=K$ なので

$$
\frac{p_2}{p_1}=\left(\frac{\rho_2}{\rho_1}\right)^\gamma
=2^{1.4}\simeq2.639.
$$

熱的状態方程式 $T=p/(\rho R)$ で $R$ 一定だから

$$
\frac{T_2}{T_1}
=\frac{p_2}{p_1}\frac{\rho_1}{\rho_2}
=2^{1.4-1}=2^{0.4}\simeq1.320.
$$

等温なら温度比は1、圧力比は密度比2となり、同じ変化ではない。
<!-- solution-end -->

#### A3. 音速とMach数
- Level: A

$p_0=101325$ Pa、$\rho_0=1.2$ kg/m$^3$、$\gamma=1.4$ の気体で $c_0$ を求めよ。流速が $100$ m/s の Mach 数を計算し、音速の単位を確かめよ。

<!-- solution-start -->
#### 詳細解答

[等エントロピー音速](#def-fluid41-sound-speed)を用いると

$$
c_0^2=\frac{1.4(101325)}{1.2}=118212.5\ {\rm m^2/s^2},\qquad
c_0\simeq343.82\ {\rm m/s}.
$$

圧力 Pa を密度 kg/m$^3$ で割ると m$^2$/s$^2$。従って $M=100/343.82\simeq0.291$ であり無次元である。
<!-- solution-end -->

#### A4. 波の向きと密度変動
- Level: A

一様静止気体 $\rho_0=1.2$ kg/m$^3$、$c_0=340$ m/s で、$p'(x,t)=100\cos(k(x-c_0t))$ Pa の右向き波を考える。対応する $v'$ と $\rho'$ の振幅と符号を求めよ。

<!-- solution-start -->
#### 詳細解答

[右向き特性量](#prop-fluid41-characteristics)は $w_-=v'-p'/(\rho_0c_0)=0$ なので

$$
v'=\frac{p'}{\rho_0c_0}
=\frac{100}{1.2(340)}\cos(k(x-340t))
\simeq0.2451\cos(k(x-340t))\ {\rm m/s}.
$$

[等エントロピー線形関係](#def-fluid41-acoustic-variables)から

$$
\rho'=\frac{p'}{c_0^2}
=\frac{100}{340^2}\cos(k(x-340t))
\simeq8.6505\times10^{-4}\cos(k(x-340t))\ {\rm kg/m^3}.
$$

山では $p',v',\rho'$ がともに正。左向きなら速度の符号が逆になる。
<!-- solution-end -->

#### A5. 外力を加えたら何が変わるか
- Level: A

単位質量当たりの体積力 $\boldsymbol b$ [m/s$^2$] を与え、熱流・粘性はなおゼロとする。保存形の質量、運動量、全エネルギーの右辺をそれぞれ答え、その次元を確認せよ。

<!-- solution-start -->
#### 詳細解答

[質量収支](../../CTM/CTM5/index.md#thm-ctm5-mass-equivalence)には外力源は入らないので右辺は0。[CTM7 の運動量収支](../../CTM/CTM7/index.md#thm-ctm7-material-momentum)では $\rho\boldsymbol b$、[CTM9 の全エネルギー収支](../../CTM/CTM9/index.md#principle-ctm9-total-energy)では体積力の仕事率 $\rho\boldsymbol b\cdot\boldsymbol u$ を加える。

$$
S(U)=(0,\rho b_1,\rho b_2,\rho b_3,\rho\boldsymbol b\cdot\boldsymbol u)^T.
$$

運動量源の単位は $(\mathrm{kg/m^3})(\mathrm{m/s^2})=\mathrm{N/m^3}$、エネルギー源はこれに m/s を掛けた W/m$^3$。外力によるエネルギー増を無視すると運動量との整合が崩れる。
<!-- solution-end -->

### Level B

#### B1. 非保存形から保存形へ
- Level: B

$\partial_t\rho+\partial_x(\rho v)=0$ と $\rho(\partial_tv+v\partial_xv)=-\partial_xp$ が成立するとする。これらから $\partial_t(\rho v)+\partial_x(\rho v^2+p)=0$ を積の微分ですべて示せ。

<!-- solution-start -->
#### 詳細解答

積の微分を各項に適用すると

$$
\begin{aligned}
\partial_t(\rho v)+\partial_x(\rho v^2)
&=\rho\partial_tv+v\partial_t\rho
+\rho v\partial_xv+v\partial_x(\rho v)\\
&=\rho(\partial_tv+v\partial_xv)
+v\{\partial_t\rho+\partial_x(\rho v)\}.
\end{aligned}
$$

最後の波括弧は[連続の式](../../CTM/CTM5/index.md#thm-ctm5-mass-equivalence)でゼロ。残る項は仮定の運動量式から $-\partial_xp$ なので、$\partial_t(\rho v)+\partial_x(\rho v^2)=-\partial_xp$。圧力の項を左に移して結論を得る。質量の式がないと $v$ 倍された余分な項は消せない。
<!-- solution-end -->

#### B2. 断熱と等温の音速の比
- Level: B

理想気体の同一状態 $p,\rho,T>0$ について、等エントロピー音速 $c_s$ と等温微分で作った速度尺度 $c_T$ の比を導き、$\gamma=1.4$ で数値を求めよ。なぜ温度一定の微分を第4節の波動方程式へ代入できないか。

<!-- solution-start -->
#### 詳細解答

等エントロピーでは[命題](#prop-fluid41-isentropic)より $p=K\rho^\gamma$ として

$$
c_s^2=\left(\frac{\partial p}{\partial\rho}\right)_s
=\gamma K\rho^{\gamma-1}
=\gamma p/\rho.
$$

等温では $p=\rho RT$、$T$ 一定から $c_T^2=(\partial p/\partial\rho)_T=RT=p/\rho$。従って

$$
\frac{c_s}{c_T}=\sqrt{\gamma}=\sqrt{1.4}\simeq1.1832.
$$

[線形音波の導出](#thm-fluid41-acoustic-wave)では熱流ゼロ・滑らかさにより $D_ts=0$ を用いて $p'=c_s^2\rho'$ と置いた。温度を固定するには一般に熱の出入りを追加し、その熱収支と閉鎖条件を改めなければならない。
<!-- solution-end -->

#### B3. 音響エネルギー保存を再現する
- Level: B

一次元の線形音響系で $\partial_tp'+\rho_0c_0^2\partial_xv'=0$、$\rho_0\partial_tv'+\partial_xp'=0$ とする。局所エネルギー保存を導き、周期長 $L$ に対し $p'=P\cos(k(x-c_0t))$、$v'=p'/(\rho_0c_0)$、$k=2\pi/L$ の周期平均音響エネルギーを求めよ。

<!-- solution-start -->
#### 詳細解答

第1式を $p'/(\rho_0c_0^2)$ 倍し第2式を $v'$ 倍して足すと

$$
\frac1{\rho_0c_0^2}p'\partial_tp'
+\rho_0 v'\partial_tv'
+p'\partial_xv'+v'\partial_xp'=0.
$$

二乗と積の微分から

$$
\partial_t\left(\frac{(p')^2}{2\rho_0c_0^2}
+\frac{\rho_0(v')^2}{2}\right)+\partial_x(p'v')=0.
$$

[右向き波の特性関係](#prop-fluid41-characteristics)により二つのエネルギー項は等しく、$\mathcal E_a=(p')^2/(\rho_0c_0^2)$。周期積分で $\frac1L\int_0^L\cos^2(k(x-c_0t))\,dx=1/2$ だから

$$
\langle\mathcal E_a\rangle=\frac{P^2}{2\rho_0c_0^2}.
$$

境界 $x=0,L$ の流束は周期性により相殺するので、これは時間に依存しない。
<!-- solution-end -->

#### B4. 密度だけの摂動は音波か
- Level: B

線形化した一次元の**一般の**理想気体Euler系で、初期値 $p'=0,\ v'=0,\ \rho'=A\cos(kx)$ とする（$|A|\ll\rho_0$）。エントロピー摂動を許した場合、この初期値が静止した線形解になることを示せ。一方、等エントロピー音波の仮定とは両立しないことを確認せよ。

<!-- solution-start -->
#### 詳細解答

質量・運動量の線形式は $\partial_t\rho'+\rho_0\partial_xv'=0$、$\rho_0\partial_tv'+\partial_xp'=0$ である。ここで等エントロピーを**仮定しない**場合の圧力式も、内部エネルギー式から導いておく。[理想気体の閉鎖](#def-fluid41-ideal-gas) $p=(\gamma-1)\rho e$ を物質微分し、[質量保存](../../CTM/CTM5/index.md#thm-ctm5-mass-equivalence) $D_t\rho=-\rho\partial_xv$ と [内部エネルギー式](../../CTM/CTM9/index.md#thm-ctm9-internal-energy) $\rho D_te=-p\partial_xv$ を代入すると

$
\begin{aligned}
D_tp&=(\gamma-1)(\rho D_te+eD_t\rho)\\
&=-(\gamma-1)(p+\rho e)\partial_xv\\
&=-\gamma p\,\partial_xv.
\end{aligned}
$

一様静止平衡のまわりで一次まで残すと $D_tp=\partial_tp'$、$\gamma p\partial_xv=\gamma p_0\partial_xv'$ である。$\gamma p_0=\rho_0c_0^2$ を使い

$
\partial_tp'+\rho_0c_0^2\partial_xv'=0
$

を得る。この式はエントロピーが**空間的に一様であることを要しない**。三つの線形式へ $v'=p'=0$、$\rho'=A\cos(kx)$ を代入すると、すべての時間微分と速度・圧力勾配がゼロで成立する。

実際、前節で導入した Gibbs 関係と $p=\rho RT$ を合わせれば

$
ds=c_v\frac{dT}{T}-R\frac{d\rho}{\rho}
=c_v\frac{dp}{p}-\gamma c_v\frac{d\rho}{\rho}.
$

したがって一次の比エントロピー偏差は $s'=c_v(p'/p_0-\gamma\rho'/\rho_0)=-\gamma c_v A\cos(kx)/\rho_0$ で、$A\ne0$ なら空間的に変化する。圧力一定でも温度が逆向きに変化するため、これは静止した**エントロピー／接触モード**である。

ただし[等エントロピー音響摂動の定義](#def-fluid41-acoustic-variables)は $p'=c_0^2\rho'$ を要求する。$c_0^2>0$、$A\ne0$ なら $p'=0$ と $\rho'\ne0$ は同時に満たせない。したがって等エントロピーの波動方程式で密度だけの摂動を伝播させてはいけない。熱的な状態の揺らぎを含む場合に、音響二モードだけでは不十分なことを示す例である。
<!-- solution-end -->

### Level C

#### C1. 静止から始まる二方向波を構成する
- Level: C

$\rho_0,c_0>0$、周期長 $L$、$k=2\pi/L$ とする。一次元・等エントロピー線形音響系に、$p'(x,0)=P\cos(kx)$、$v'(x,0)=0$、$\rho'(x,0)=P\cos(kx)/c_0^2$ を与える。ただし $0<P\ll\min(p_0,\rho_0c_0^2)$。両方向の特性量から $p',v',\rho'$ を構成し、初期値、一次方程式、周期平均音響エネルギーの時間不変性をすべて検算せよ。

<!-- solution-start -->
#### 詳細解答

[特性量](#prop-fluid41-characteristics)を初期状態に適用すると

$$
w_+(x,0)=\frac P{\rho_0c_0}\cos(kx),\qquad
w_-(x,0)=-\frac P{\rho_0c_0}\cos(kx).
$$

それぞれの輸送方程式により

$$
w_+(x,t)=\frac P{\rho_0c_0}\cos(k(x-c_0t)),\qquad
w_-(x,t)=-\frac P{\rho_0c_0}\cos(k(x+c_0t)).
$$

連立して $v'=(w_++w_-)/2$、$p'=\rho_0c_0(w_+-w_-)/2$ を使うと

$$
\begin{aligned}
p'(x,t)&=\frac P2[\cos(k(x-c_0t))+\cos(k(x+c_0t))]\\
&=P\cos(kx)\cos(kc_0t),\\
v'(x,t)&=\frac P{2\rho_0c_0}[\cos(k(x-c_0t))-\cos(k(x+c_0t))]\\
&=\frac P{\rho_0c_0}\sin(kx)\sin(kc_0t),\\
\rho'(x,t)&=\frac P{c_0^2}\cos(kx)\cos(kc_0t).
\end{aligned}
$$

時刻 $t=0$ では $\sin(0)=0,\cos(0)=1$ なので三つの初期値を再現する。微分で

$$
\partial_tp'=-Pkc_0\cos(kx)\sin(kc_0t),\qquad
\partial_xv'=\frac{Pk}{\rho_0c_0}\cos(kx)\sin(kc_0t)
$$

となるため $\partial_tp'+\rho_0c_0^2\partial_xv'=0$。同様に

$$
\rho_0\partial_tv'=Pk\sin(kx)\cos(kc_0t),\qquad
\partial_xp'=-Pk\sin(kx)\cos(kc_0t)
$$

なので運動量式も成立し、$\rho'=p'/c_0^2$ は常に成り立つ。次に[音響エネルギーの定義](#def-fluid41-acoustic-variables)へ代入すると

$$
\mathcal E_a=\frac{P^2}{2\rho_0c_0^2}
\left[\cos^2(kx)\cos^2(kc_0t)
+\sin^2(kx)\sin^2(kc_0t)\right].
$$

周期区間で $\cos^2(kx)$ と $\sin^2(kx)$ の平均はいずれも $1/2$、従って

$$
\langle\mathcal E_a\rangle
=\frac{P^2}{4\rho_0c_0^2}
[\cos^2(kc_0t)+\sin^2(kc_0t)]
=\frac{P^2}{4\rho_0c_0^2}.
$$

この時刻不変性は[局所音響エネルギー保存](#prop-fluid41-acoustic-energy)とも一致する。$P$ が十分小さいという仮定は、線形化を正当化し、$\rho_0+\rho'$ と $p_0+p'$ を正に保つために用いた。
<!-- solution-end -->
