# FLUID1 流体を連続体として扱える条件は何か

**前提講座（直接）**：[CTM16 無次元化で粘性と慣性のどちらが効くか](../../CTM/CTM16/index.md)

[CTM1の物質点](../../CTM/CTM1/index.md#def-ctm1-reference-material)を追うことで、流体の「部分」を区別して運動を記述できる。しかし水や空気は実際には分子で構成され、任意に小さな点で質量密度が滑らかに定義できるわけではない。本講の中心問いは、**微視的な変動を平均しながら巨視的な流れの変化を残せるのは、どのような条件か**である。

[CTM5の密度](../../CTM/CTM5/index.md#def-ctm5-mass-densities)、[CTM15のNewton粘性係数](../../CTM/CTM15/index.md#def-ctm15-newtonian-fluid)、[CTM16のReynolds数](../../CTM/CTM16/index.md#def-ctm16-reynolds)を既知として、連続体近似、Knudsen数、動粘度、表面張力を整理し、どの物理仮定が必要かを実際の計算で確かめる。

## 1. 三つの長さ：平均するには大きく、変化を残すには小さく

長さは m、時間は s、質量は kg とする。流体の微視的な構造（分子の衝突や相関）が重要となる長さを $a>0$、密度や速度が空間的に大きく変化する代表長さを $L>0$、小体積で物性を平均する長さを $\ell>0$ と書く。$L$ は容器全長とは限らず、狭い隙間や密度の急な変化があればその局所尺度を採る。

$\ell$ が $a$ に近すぎると採取した体積ごとの分子の揺らぎが目立つ。反対に $\ell$ が $L$ に近すぎると、流れの空間変化を平均で消してしまう。そこで中間の測定窓を要求する。

<a id="def-fluid1-scale-separation"></a>

<!-- formal-statement-start -->
### 定義（連続体近似の尺度分離）

微視的長さ $a>0$ と巨視的長さ $L>0$ に対して、中間尺度 $\ell>0$ が選べ、

$$
\frac a\ell\ll1,\qquad \frac\ell L\ll1
$$

が同時に成り立ち、その尺度で測定した密度・速度等の平均量が安定して変化するなら、対象現象を**連続体近似の候補**と呼ぶ。$\ll1$ は用いる模型の精度に応じて十分小さいという尺度比較であり、普遍的な数値閾値ではない。これだけでは時間方向の局所平衡、構成則、壁面条件、界面条件の正当性までは保証しない。
<!-- formal-statement-end -->

<!-- definition-example-start: def-fluid1-scale-separation -->
### **定義の確認**：平均化する箱を選ぶ

$a=4\times10^{-9}$ m、$L=10^{-3}$ m の模型で、$\ell=2\times10^{-6}$ m とすると

$$
\frac a\ell=\frac{4\times10^{-9}}{2\times10^{-6}}=2\times10^{-3},\qquad
\frac\ell L=\frac{2\times10^{-6}}{10^{-3}}=2\times10^{-3}.
$$

両比は $1$ より十分小さく、少なくとも尺度に関する条件を検査できる。ただし平均量の物理的安定性までは数字だけでは証明されない。$L$ が $10^{-8}$ m に縮むと同じ $\ell$ は $L$ より大きくなり、尺度の条件そのものを失う。
<!-- definition-example-end -->

どのように中間尺度を作ればよいだろう。正の二つの長さの幾何平均を取る方法がある。

<a id="prop-fluid1-geometric-window"></a>

<!-- formal-statement-start -->
### 命題（幾何平均による粗視化長さの構成）

$0<a<L$ とし $\ell=\sqrt{aL}$ と置くと

$$
a<\ell<L,\qquad
\frac a\ell=\frac\ell L=\sqrt{\frac aL}.
$$

特に模型の列に沿って $a/L\to0$ なら、両比は同時に $0$ へ近づく。この結論は**幾何学的な尺度分離**に限られ、流体方程式の成立定理ではない。
<!-- formal-statement-end -->

### 証明の見取り図

$a<L$ の各辺を二乗してから平方根を取ると中間尺度の大小関係が得られる。二つの無次元比は直接代入して比較する。

<!-- proof-start -->
### 証明

$a,L>0$ と $a<L$ から $a^2<aL<L^2$。平方根は正の範囲で単調増加なので $a<\sqrt{aL}<L$。さらに

$$
\frac a{\sqrt{aL}}
=\sqrt{\frac{a^2}{aL}}
=\sqrt{\frac aL},\qquad
\frac{\sqrt{aL}}L=\sqrt{\frac{aL}{L^2}}=\sqrt{\frac aL}.
$$

$a/L\to0$ のとき、平方根の連続性により両比も $0$ に近づく。$\square$
<!-- proof-end -->

図は、分子集団を代表する小箱の大きさが、分子的な構造より十分大きく、流れが変化する距離より十分小さいという**模式的な大小関係**を表している。分子の実寸を描いたものではない。

![微視的長さaより平均化長さellが十分大きく、さらに流れの長さLが十分大きいという三段階の模式図](assets/continuum-length-scales.svg)

[図を拡大して表示](assets/continuum-length-scales.svg)

## 2. 気体の Knudsen 数は何を判定するか

気体分子が衝突から次の衝突まで平均して進む距離を**平均自由行程** $\lambda>0$ と呼ぶ。希薄な気体ではこれを微視的な長さの候補にできるが、液体の相関長を無条件に気体の平均自由行程と同一視しない。

<a id="def-fluid1-knudsen"></a>

<!-- formal-statement-start -->
### 定義（気体の Knudsen 数）

対象となる**気体**に平均自由行程 $\lambda>0$ と代表長さ $L>0$ が与えられるとき、

$$
\boxed{\mathrm{Kn}=\frac{\lambda}{L}}
$$

を **Knudsen 数**と呼ぶ。代表長さには、流路の隙間や局所的な変化の長さなど、対象現象で意味のあるものを指定する。この比は無次元である。
<!-- formal-statement-end -->

<!-- definition-example-start: def-fluid1-knudsen -->
### **定義の確認**：同じ気体で流路だけを縮小する

$\lambda=7\times10^{-8}$ m とする例示的な気体模型で、$L_1=10^{-2}$ m と $L_2=10^{-6}$ m に対して

$$
\mathrm{Kn}_1=\frac{7\times10^{-8}}{10^{-2}}=7\times10^{-6},\qquad
\mathrm{Kn}_2=\frac{7\times10^{-8}}{10^{-6}}=0.07.
$$

どちらも正の長さ同士の比であり、代表長さを $10^4$ 分の $1$ にすると Knudsen 数が $10^4$ 倍になる。この段階では運動の速さ $U$ は使っていない。
<!-- definition-example-end -->

希薄気体の慣用的目安として $\mathrm{Kn}\lesssim0.01$ を連続体模型の出発域とすることがあるが、**全流れに共通する十分条件ではない**。気体の希薄性、壁に近い領域での滑りや温度跳躍、非平衡、分子的な構造などは別に確認する。液体にこの数値目安を機械的に当てはめない。

[CTM16のReynolds数](../../CTM/CTM16/index.md#def-ctm16-reynolds)は

$$
\mathrm{Re}=\frac{\rho UL}{\eta}
$$

であり、慣性と粘性の比を表す。ここで $U$ は代表速度、$\rho$ は密度、$\eta$ は動的粘性係数である。$\mathrm{Kn}$ は**連続体模型を選ぶ判断材料**、$\mathrm{Re}$ は**連続体模型内で慣性と粘性を比較する量**である。$\lambda,L,\rho,\eta$ を一定に保ち $U$ だけを変えれば $\mathrm{Kn}$ は変わらず $\mathrm{Re}$ は変わる。したがって「低Reだから連続体」という結論は出ない。

## 3. 密度・粘性係数・動粘度は別の量

既習の[現在密度](../../CTM/CTM5/index.md#def-ctm5-mass-densities)は、測定窓の体積 $V$ に含まれる質量 $m$ を使う体積密度であり、単位は $\mathrm{kg/m^3}$。値は温度、圧力、組成など測定条件に依存し得る。

二枚の平板の間で $y$ 方向に流速 $u_x(y)$ が変わる単純せん断では、[CTM15のNewton粘性構成則](../../CTM/CTM15/index.md#def-ctm15-newtonian-fluid)は

$$
\tau_{xy}=\eta\frac{\partial u_x}{\partial y}
$$

となる。$\tau_{xy}$ は面積当たりの接線力なので単位 Pa、速度勾配は $\mathrm{s^{-1}}$。よって**動的粘性係数** $\eta>0$ の単位は

$$
[\eta]=\mathrm{Pa\,s}=\frac{\mathrm{kg}}{\mathrm{m\,s}}.
$$

上側の平板の面積を $A$、上下の距離を $h$、上板速度を $U$ とする。速度が $u_x(y)=Uy/h$ という線形分布なら、接線力の大きさは

$$
F=\eta A\frac Uh,\qquad \eta=\frac{Fh}{AU}.
$$

これはNewton流体の仮定・速度分布・端効果や慣性を無視できる条件を置いて初めて成立する測定模型である。[CTM16のCouette流の結果](../../CTM/CTM16/index.md#thm-ctm16-couette-profile)で、この速度分布が方程式を満たす理由を確認できる。

粘性が速度の変化を広げる働きを密度で比較するため、動粘度を導入する。

<a id="def-fluid1-kinematic-viscosity"></a>

<!-- formal-statement-start -->
### 定義（動粘度）

密度 $\rho>0$、動的粘性係数 $\eta>0$ をもつNewton流体に対して

$$
\boxed{\nu=\frac{\eta}{\rho}}
$$

を**動粘度**と呼ぶ。単位は $\mathrm{m^2/s}$。非一様な場で局所的に $\nu(x,t)=\eta(x,t)/\rho(x,t)$ と書けても、一定係数の粘性拡散方程式を無条件に適用してよいわけではない。
<!-- formal-statement-end -->

<!-- definition-example-start: def-fluid1-kinematic-viscosity -->
### **定義の確認**：単位と数値を合わせる

$\rho=10^3\ {\rm kg/m^3}$、$\eta=10^{-3}\ {\rm Pa\,s}$ の均質なNewton流体を仮定すると

$$
[\nu]=\frac{\mathrm{kg/(m\,s)}}{\mathrm{kg/m^3}}=\mathrm{m^2/s},\qquad
\nu=\frac{10^{-3}}{10^3}=10^{-6}\ {\rm m^2/s}.
$$

動的粘性係数 $\eta$ と動粘度 $\nu$ を同じ名前・単位で扱ってはいけない。
<!-- definition-example-end -->

## 4. なぜ動粘度の単位は長さの二乗毎秒か

単位だけでは、粘性が何をするかは分からない。圧力勾配なし、体積力なしの平行な速度場を考えると、粘性の時間尺度が運動量方程式から直接現れる。

<a id="prop-fluid1-viscous-diffusion"></a>

<!-- formal-statement-start -->
### 命題（平行せん断の粘性拡散方程式と時間尺度）

定数 $\rho,\eta,L,U>0$ を与える。非圧縮Newton流体、空間一定の圧力、体積力 $0$ を仮定し、$I\subset\mathbb R$ を時間開区間とする。十分滑らかな速度場

$$
v(x,y,z,t)=(u(y,t),0,0),\qquad
u\in C^{1,2}(I\times(0,L))
$$

がNavier–Stokes方程式を満たすなら、

$$
\boxed{\partial_tu=\nu\,\partial_y^2u},\qquad \nu=\frac{\eta}{\rho}.
$$

無次元変数 $y^*=y/L$、$t^*=t/T$、$u^*=u/U$ では

$$
\frac{L^2}{\nu T}\partial_{t^*}u^*=\partial_{y^*}^2u^*.
$$

従って粘性変化の**代表時間尺度**は $T_\nu=L^2/\nu$ である。任意の境界条件での厳密な緩和時間が必ずこの値になるという主張ではない。
<!-- formal-statement-end -->

### 証明の見取り図

指定した速度は $x,z$ に依存しないため移流項が消え、一定圧力なので圧力勾配も消える。空間二階微分と時間一階微分の係数を無次元化して比べる。

<!-- proof-start -->
### 証明

[CTM15の非圧縮Navier–Stokes方程式](../../CTM/CTM15/index.md#thm-ctm15-incompressible-navier-stokes)は、この仮定の下で

$$
\rho\left(\partial_tv+(v\cdot\nabla)v\right)=-\nabla p+\eta\Delta v,\qquad \nabla\cdot v=0.
$$

指定の速度では

$$
\nabla\cdot v=\partial_xu(y,t)=0,\quad
(v\cdot\nabla)v=u(y,t)\partial_xv=0,\quad
\Delta v=(u_{yy},0,0),\quad \nabla p=0.
$$

従って $x$ 成分は $\rho u_t=\eta u_{yy}$、他の成分は $0=0$。$\rho>0$ で割ると第1式を得る。さらに $u(y,t)=Uu^*(y/L,t/T)$ と置いて連鎖律を二回用いると

$$
\partial_tu=\frac UT\partial_{t^*}u^*,\quad
\partial_yu=\frac UL\partial_{y^*}u^*,\quad
\partial_y^2u=\frac U{L^2}\partial_{y^*}^2u^*.
$$

元の式へ代入し $U>0$ で割れば $T^{-1}\partial_{t^*}u^*=\nu L^{-2}\partial_{y^*}^2u^*$。両辺へ $L^2/\nu$ を掛けて無次元式を得る。係数が同程度になる選択が $T_\nu=L^2/\nu$ である。$\square$
<!-- proof-end -->

例えば $\nu=10^{-6}\ {\rm m^2/s}$、$L=2\times10^{-3}$ m なら $T_\nu=(2\times10^{-3})^2/10^{-6}=4$ s。長さを半分にすると代表時間は $1$ s になる。これは粘性がより小さな速度変化をより速くならすという尺度上の意味を持つ。
