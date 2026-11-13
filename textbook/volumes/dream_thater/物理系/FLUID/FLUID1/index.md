# FLUID1 流体を連続体として扱える条件は何か

**前提講座（直接）**：[CTM16 無次元化で粘性と慣性のどちらが効くか](../../CTM/CTM16/index.md)

[CTM1の物質点](../../CTM/CTM1/index.md#def-ctm1-reference-material)を追うことで、流体の「部分」を区別して運動を記述できる。しかし水や空気は実際には分子で構成され、任意に小さな点で質量密度が滑らかに定義できるわけではない。本講の中心問いは、**微視的な変動を平均しながら巨視的な流れの変化を残せるのは、どのような条件か**である。

[CTM5の密度](../../CTM/CTM5/index.md#def-ctm5-mass-densities)、[CTM15のNewton粘性係数](../../CTM/CTM15/index.md#def-ctm15-newtonian-fluid)、[CTM16のReynolds数](../../CTM/CTM16/index.md#def-ctm16-reynolds)を既知として、微視的尺度と流路長の比、粘性の物性を密度で規格化した量、界面の性質を順に導入し、どの物理仮定が必要かを実際の計算で確かめる。

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

両比は $1$ より十分小さく、尺度に関する条件を満たす。ただし、長さの比だけでは**平均量の安定性**を確認していない。そこで、平均化が実際に何を残すかを人工的な観測場で検査する。

空間座標を $s$ とし、$|s|\le L/4$ で、正の定数 $\rho_0,U_0$ を用いて密度と $x$ 方向速度の観測値を

$$
\rho_{\mathrm{obs}}(s)=\rho_0\left(1+\frac{s}{10L}+0.01\sin\frac{2\pi s}{a}\right),
\qquad
u_{\mathrm{obs}}(s)=U_0\left(1+\frac{s}{5L}+0.01\cos\frac{2\pi s}{a}\right)
$$

とする。微視的な振動の周期は $a$、ゆっくり変わる部分の長さ尺度は $L$ である。この範囲では $\rho_{\mathrm{obs}}>0$ である。中心 $x$ の幅 $h$ の観測窓による平均を、$q=\rho,u$ について

$$
\overline q_h(x)=\frac1h\int_{x-h/2}^{x+h/2}q_{\mathrm{obs}}(s)\,ds
$$

と定める（窓が $|s|\le L/4$ に収まる $x$ を選ぶ）。$h=\ell=2\times10^{-6}$ m と $h=\ell/2=10^{-6}$ m は、それぞれ $a$ の $500$ 倍と $250$ 倍である。したがって、窓の端で位相が違っていても、正弦・余弦の積分は整数周期分だけ打ち消し合う。一方、

$$
\frac1h\int_{x-h/2}^{x+h/2}s\,ds
=\frac{(x+h/2)^2-(x-h/2)^2}{2h}=x.
$$

よって両方の幅 $h$ について

$$
\overline\rho_h(x)=\rho_0\left(1+\frac{x}{10L}\right),
\qquad
\overline u_h(x)=U_0\left(1+\frac{x}{5L}\right).
$$

幅を半分にしても平均密度・平均速度は同じで、巨視的な位置 $x$ による変化は残る。半分の窓でも $a/h=4\times10^{-3}$、$h/L=10^{-3}$ なので尺度分離は維持される。これで**この人工模型については**二つの尺度比と平均量の安定性をともに直接確認できた。実在の流体の局所平衡や構成則を証明したわけではない。例えば $L$ が $10^{-8}$ m に縮むと元の $\ell$ は $L$ より大きくなり、尺度の条件そのものを失う。
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

上側の平板の面積を $A$、上下の距離を $h$、上板速度を $U$ とする。速度が $u_x(y)=Uy/h$ という一次関数で表せるなら、接線力の大きさは

$$
F=\eta A\frac Uh,\qquad \eta=\frac{Fh}{AU}.
$$

これはNewton流体の仮定・速度分布・端効果や慣性を無視できる条件を置いて初めて成立する測定模型である。[CTM16のCouette流の結果](../../CTM/CTM16/index.md#thm-ctm16-couette-profile)で、この速度分布が方程式を満たす理由を確認できる。

粘性が速度の変化を広げる働きを密度で比較するため、次の比を導入する。

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

単位だけでは、粘性が何をするかは分からない。第3節の $u_x(y)$ は $x$ 方向速度を表した。ここでは同じ速度成分が時間にも依存することを明示し、$u(y,t)$ と略記する。$\partial_tu$ は空間座標 $y$ を固定した時間 $t$ による偏微分、$\partial_yu$ と $\partial_y^2u$ は時間 $t$ を固定した $y$ による一階・二階偏微分であり、証明中の $u_t,u_{yy}$ はそれぞれ同じ量の省略表記である。

圧力勾配なし、体積力なしの平行な速度場を考えると、粘性の時間尺度が運動量方程式から直接現れる。

<a id="prop-fluid1-viscous-diffusion"></a>

<!-- formal-statement-start -->
### 命題（平行せん断の粘性拡散方程式と時間尺度）

定数 $\rho,\eta,L,U>0$ を与える。非圧縮Newton流体、空間一定の圧力、体積力 $0$ を仮定し、$I\subset\mathbb R$ を時間開区間とする。十分滑らかな速度場

$$
v(x,y,z,t)=(u(y,t),0,0),\qquad
u\in C^{1,2}(I\times(0,L))
$$

とする。ここで $C^{1,2}$ は、時間変数 $t$ について一階まで、空間変数 $y$ について二階までの偏導関数（必要な混合偏導関数も含む）が連続であることを表す。この速度場が[CTM15の一定粘性係数の非圧縮Navier–Stokes方程式](../../CTM/CTM15/index.md#thm-ctm15-incompressible-navier-stokes)を満たすなら、

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

## 5. 界面の張力は粘性と同じではない

二種類の流体の接する境界を**界面**と呼ぶ。水と空気の境目を広げる際には仕事が必要である。ここで界面自由エネルギー $F_{\rm surface}$ は、温度・組成などの指定条件を固定して界面を可逆に広げるときの仕事に対応するエネルギー（単位 J）を表す。後で用いる力 $F$（単位 N）とは異なる量である。界面の面積を増やすための仕事から定める物性が表面張力であり、流速の勾配に対する摩擦抵抗を表す粘性係数とは全く違う。

<a id="def-fluid1-surface-tension"></a>

<!-- formal-statement-start -->
### 定義（界面の表面張力）

温度・組成を固定した可逆な準静的変化において、**均一・等方で一枚の流体界面**の面積を $dA$ 増やす際の界面自由エネルギー増分が

$$
dF_{\rm surface}=\gamma\,dA
$$

で表されるとき、係数 $\gamma\ge0$ を**表面張力**と呼ぶ。単位は

$$
[\gamma]=\mathrm{J/m^2}=\mathrm{N/m}=\mathrm{kg/s^2}.
$$

直線状の可動縁の長さが $\ell_b>0$ で、縁を面積が増える方向へ $dx>0$ だけ動かすとき $dA=\ell_b\,dx$ とする。準静的な外力 $F_{\rm ext}$ の仕事を自由エネルギーの増分に等しく置くと、

$$
F_{\rm ext}\,dx=dF_{\rm surface}=\gamma\ell_b\,dx,
\qquad F_{\rm ext}=\gamma\ell_b.
$$

ここで $dx>0$ で割った。これは界面が可動縁を反対方向へ引く力の**大きさ**である。同じ面積増加が**表裏の二界面**で起こる膜では全増分が $2\gamma\ell_b\,dx$ となり、力の大きさは $2\gamma\ell_b$ となる。
<!-- formal-statement-end -->

<!-- definition-example-start: def-fluid1-surface-tension -->
### **定義の確認**：一面と二面を数え分ける

$\gamma=0.06$ N/m、可動縁の長さ $\ell_b=0.5$ m とする。単一界面では $dA=\ell_b\,dx$ なので

$$
\frac{dF_{\rm surface}}{dx}=\gamma\ell_b=0.06\cdot0.5=0.03\ {\rm N}.
$$

薄膜の表裏に同じ $\gamma$ の界面が二つあるなら、全増加面積は $2\ell_b\,dx$、力は $0.06$ N。二倍の理由は物性が変わるからでなく、増える界面面積が二倍になるからである。
<!-- definition-example-end -->

$\eta$ は $\mathrm{Pa\,s}$ で、単位面積のせん断力と速度勾配を結び付ける。$\gamma$ は $\mathrm{N/m}$ で、界面面積を増やす仕事や境界線の引張力を結び付ける。どちらも力と関係していても、同じ物性として換算することはできない。曲がった界面での圧力差は後のFLUID26で導く。ここではその式をまだ使わない。

## 6. ブラウザで物性と尺度を検算する

以下のPythonラボは、**入力した物性と代表尺度を代入して計算する検算器**である。分子動力学を解くものでも流体方程式を証明するものでもない。気体については平均自由行程を入力し、液体については微視的相関尺度と巨視尺度の単なる比を出す。液体の比を気体のKnudsen数とは呼ばない。

一つ目のプリセットは例示的な気体とセンチメートル流路、二つ目は同じ気体とマイクロ流路である。二つの間で代表長さだけを変えると $\mathrm{Kn}$ と $\mathrm{Re}$ は異なる向きに変わる。三つ目は液体の例で、連続体としての成立を保証するわけではない。いずれも温度・圧力・界面・壁面の情報を外から補う必要がある。完成したPythonファイルをページ内で実行でき、プリセットの引数は編集して試せる。

```python-file-lab
# lab-id: FLUID1-MATERIAL-SCALE-FILE
# lab-title: 流体の尺度分離と粘性の検算
# lab-file: textbook/volumes/dream_thater/物理系/FLUID/FLUID1/viscosity_scale_lab.py
# timeout-ms: 10000
# lab-preset: 気体・センチメートル流路 | --kind gas --micro-m 7e-8 --length-m 1e-2 --rho 1.2 --eta 1.8e-5 --speed 0.02
# lab-preset: 気体・マイクロ流路 | --kind gas --micro-m 7e-8 --length-m 1e-6 --rho 1.2 --eta 1.8e-5 --speed 0.02
# lab-preset: 液体・相関尺度の比較 | --kind liquid --micro-m 1e-9 --length-m 1e-3 --rho 1000 --eta 1e-3 --speed 0.02
```

結果中の micro_ratio は気体なら $\lambda/L$、液体なら $a/L$ を表す。[動粘度](#def-fluid1-kinematic-viscosity) $\eta/\rho$、[Reynolds数](../../CTM/CTM16/index.md#def-ctm16-reynolds) $\rho UL/\eta$、[粘性時間](#prop-fluid1-viscous-diffusion) $L^2/\nu$ を筆算と比較しよう。入力値が正で有限であることはコードで検査できても、**実験と合うことや採用した境界条件が適切であることは、数値の出力だけでは保証できない**。

## 7. 演習

正の物性値・長さは各問題の条件で与える。気体の微視的長さが平均自由行程と指定された場合のみ $\mathrm{Kn}=\lambda/L$ と呼ぶ。求めた数値が何を保証し、何を保証しないかも説明すること。

### Level A

### A1. 粗視化する箱を選ぶ

微視的長さ $a=4\times10^{-9}$ m、巨視的長さ $L=10^{-3}$ m とする。$\ell=\sqrt{aL}$ とそのときの $a/\ell$、$\ell/L$ を計算し、これらの値だけで流体方程式の正しさを断言できるか答えよ。

- Level: A

<!-- solution-start -->
#### 詳細解答

[幾何平均による構成](#prop-fluid1-geometric-window)を用いて

$$
\ell=\sqrt{4\times10^{-9}\cdot10^{-3}}
=\sqrt{4\times10^{-12}}=2\times10^{-6}\ {\rm m}.
$$

二つの比は

$$
\frac a\ell=\frac{4\times10^{-9}}{2\times10^{-6}}=2\times10^{-3},\qquad
\frac\ell L=\frac{2\times10^{-6}}{10^{-3}}=2\times10^{-3}.
$$

両者は小さく、幾何学的な平均化の余地がある。しかし[尺度分離の定義](#def-fluid1-scale-separation)は平均量の安定性も要求しており、時間尺度・物性・壁面条件はまだ確かめていない。方程式の正しさは断言できない。
<!-- solution-end -->

### A2. 気体の流路と Knudsen 数

気体の平均自由行程 $\lambda=7\times10^{-8}$ m とする。代表長さ $L=10^{-2}$ m と $L=10^{-6}$ m の流路で $\mathrm{Kn}$ をそれぞれ求め、分子効果に注意すべき方を説明せよ。

- Level: A

<!-- solution-start -->
#### 詳細解答

[気体のKnudsen数](#def-fluid1-knudsen)に各長さを代入すると

$$
\mathrm{Kn}_{10^{-2}}=\frac{7\times10^{-8}}{10^{-2}}=7\times10^{-6},\qquad
\mathrm{Kn}_{10^{-6}}=\frac{7\times10^{-8}}{10^{-6}}=0.07.
$$

後者の方が平均自由行程を無視しにくく、境界滑りや分子的非平衡の検討が重要になる。ただし両方の比較には、同じ気体条件で $\lambda$ が変わらず、選んだ $L$ がその現象の局所的な変化尺度であるという仮定を使っている。
<!-- solution-end -->

### A3. せん断力から二種類の粘度を求める

面積 $A=0.03\ {\rm m^2}$、板間距離 $h=0.002$ m、上板の速度 $U=0.06$ m/s の平行平板流を考える。下板は静止し、流速は線形で、端効果・慣性は無視できるNewton流体とする。上板の接線方向の力 $F=0.009$ N、密度 $\rho=1000\ {\rm kg/m^3}$ から $\eta$ と $\nu$ を求めよ。

- Level: A

<!-- solution-start -->
#### 詳細解答

[Newton粘性構成則](../../CTM/CTM15/index.md#def-ctm15-newtonian-fluid)の単純せん断では $F/A=\eta U/h$。速度勾配と応力を別々に計算する。

$$
\frac Uh=\frac{0.06}{0.002}=30\ {\rm s^{-1}},\qquad
\frac FA=\frac{0.009}{0.03}=0.3\ {\rm Pa}.
$$

従って

$$
\eta=\frac{0.3}{30}=0.01\ {\rm Pa\,s},\qquad
\nu=\frac{\eta}{\rho}=\frac{0.01}{1000}=10^{-5}\ {\rm m^2/s}.
$$

後者は[動粘度の定義](#def-fluid1-kinematic-viscosity)で密度で割った値であり、二量の単位は異なる。
<!-- solution-end -->

### A4. 表面張力と二つの界面

均一な界面で $\gamma=0.06$ N/m、可動縁の長さは $\ell_b=0.5$ m とする。単一界面と同じ $\gamma$ の表裏二面を持つ薄膜について、縁を準静的に引く力の大きさと、縁を $0.01$ m ずらしたときの界面自由エネルギー増分をそれぞれ求めよ。

- Level: A

<!-- solution-start -->
#### 詳細解答

[表面張力の定義](#def-fluid1-surface-tension)から、一面は $\Delta A_1=\ell_b\Delta x=0.5\cdot0.01=0.005\ {\rm m^2}$。従って

$$
F_1=\gamma\ell_b=0.06\cdot0.5=0.03\ {\rm N},\qquad
\Delta F_{\mathrm{surface},1}=\gamma\Delta A_1
=0.06\cdot0.005=3\times10^{-4}\ {\rm J}.
$$

二面なら増加面積は $2\Delta A_1=0.01\ {\rm m^2}$。よって $F_2=2\gamma\ell_b=0.06$ N、$\Delta F_{\mathrm{surface},2}=6\times10^{-4}$ J。ここで $F_1,F_2$ は力であり、$F_{\mathrm{surface}}$ は自由エネルギーの記号である。
<!-- solution-end -->

### Level B

### B1. Knudsen 数と Reynolds 数の独立性

$\lambda=7\times10^{-8}$ m、$L=10^{-3}$ m、$\rho=1.2\ {\rm kg/m^3}$、$\eta=1.8\times10^{-5}$ Pa s の気体模型を考える。物性を固定したまま $U_1=0.01$ m/s と $U_2=0.4$ m/s で $\mathrm{Kn}$ と $\mathrm{Re}$ を求め、それぞれが問う物理的意味を区別せよ。

- Level: B

<!-- solution-start -->
#### 詳細解答

[Knudsen数の定義](#def-fluid1-knudsen)では速度が現れないので

$$
\mathrm{Kn}_1=\mathrm{Kn}_2=\frac{7\times10^{-8}}{10^{-3}}=7\times10^{-5}.
$$

[Reynolds数](../../CTM/CTM16/index.md#def-ctm16-reynolds)では速度を代入し分母を揃える。

$$
\mathrm{Re}_1=\frac{1.2(0.01)(10^{-3})}{1.8\times10^{-5}}
=\frac{1.2\times10^{-5}}{1.8\times10^{-5}}=\frac23,
$$

$$
\mathrm{Re}_2=\frac{1.2(0.4)(10^{-3})}{1.8\times10^{-5}}
=\frac{4.8\times10^{-4}}{1.8\times10^{-5}}=\frac{80}{3}\approx26.7.
$$

$\mathrm{Re}$ は40倍になっても $\mathrm{Kn}$ は同じ。前者は採用したNewton連続体模型での慣性と粘性の比較、後者は希薄気体の微視的長さと流れの尺度の比較である。いずれの数値だけからも壁の無滑り条件や実験的正しさは保証されない。
<!-- solution-end -->

### B2. 粘性時間の二乗則を導出する

一定密度 $\rho=1000\ {\rm kg/m^3}$、粘性係数 $\eta=10^{-3}$ Pa s、体積力なし・空間一定圧力の非圧縮Newton流体で $v=(u(y,t),0,0)$ を仮定する。Navier–Stokes方程式から $u_t=\nu u_{yy}$ を導き、$L=2\times10^{-3}$ m の粘性時間を求めよ。$L$ を半分にした場合も答えよ。

- Level: B

<!-- solution-start -->
#### 詳細解答

[非圧縮Navier–Stokes方程式](../../CTM/CTM15/index.md#thm-ctm15-incompressible-navier-stokes)に指定された速度場を代入する。$u$ は $y,t$ だけの関数なので、発散と移流項は

$$
\nabla\cdot v=\partial_xu(y,t)=0,\qquad
(v\cdot\nabla)v=u(y,t)\partial_xv=0.
$$

さらに空間一定圧力と二階空間微分から

$$
\nabla p=0,\qquad \Delta v=(\partial_y^2u,0,0).
$$

よって $x$ 成分は $\rho\,\partial_tu=\eta\,\partial_y^2u$、他の成分は $0=0$ である。$\rho>0$ で割り、[動粘度の定義](#def-fluid1-kinematic-viscosity)を適用すると

$$
\partial_tu=\frac{\eta}{\rho}\partial_y^2u
=\nu\,\partial_y^2u.
$$

[動粘度](#def-fluid1-kinematic-viscosity)は $\nu=10^{-3}/10^3=10^{-6}\ {\rm m^2/s}$。[粘性時間の命題](#prop-fluid1-viscous-diffusion)より

$$
T_\nu=\frac{(2\times10^{-3})^2}{10^{-6}}=4\ {\rm s}.
$$

$L'=L/2$ では $T'_\nu=(L/2)^2/\nu=T_\nu/4=1$ s。これは尺度評価で、個別の境界条件によって定まる厳密な緩和率とは区別する。
<!-- solution-end -->

### B3. 粘性の力と表面張力の力

$\eta=0.02$ Pa s、板面積 $A=0.01\ {\rm m^2}$、間隙 $h=0.001$ m、速度差 $U=0.1$ m/s とし、Newton流体の速度分布は線形で端効果を無視する。別の単一界面が $\gamma=0.04$ N/m、可動縁 $\ell_b=0.02$ m を持つ。それぞれの力の大きさと比を求め、同じ力の単位でも成り立つ機構が違う理由を述べよ。

- Level: B

<!-- solution-start -->
#### 詳細解答

[単純せん断のNewton構成則](../../CTM/CTM15/index.md#def-ctm15-newtonian-fluid)から速度勾配 $U/h=100\ {\rm s^{-1}}$、せん断応力 $\eta U/h=2$ Pa。平板の力は

$$
F_{\eta}=\eta A\frac Uh=2\cdot0.01=0.02\ {\rm N}.
$$

[単一界面の表面張力](#def-fluid1-surface-tension)による力は

$$
F_{\gamma}=\gamma\ell_b=0.04\cdot0.02
=8\times10^{-4}\ {\rm N},\quad
\frac{F_\eta}{F_\gamma}=\frac{0.02}{0.0008}=25.
$$

前者は単位面積の応力と速度勾配から、後者は界面の面積自由エネルギーと境界長から計算した。二つの装置は別なので、ここから両力が同じ場所で釣り合うという結論は出せない。
<!-- solution-end -->

### Level C

### C1. 微細気体流路の模型を採用してよいか

代表長さ $L=10^{-5}$ m の気体流路について、平均自由行程 $\lambda=7\times10^{-8}$ m、密度 $\rho=1.2\ {\rm kg/m^3}$、粘性係数 $\eta=1.8\times10^{-5}$ Pa s、代表速度 $U=0.02$ m/s を、同じ熱力学的条件下の固定した模型入力とする。

1. $\mathrm{Kn}$、中間長さ $\ell=\sqrt{\lambda L}$、$\lambda/\ell$ と $\ell/L$ を求めよ。
2. 動粘度 $\nu$、$\mathrm{Re}$、粘性時間 $T_\nu=L^2/\nu$ を単位付きで求めよ。
3. 「$\mathrm{Re}$ が小さいから無滑りの連続体Newton模型は正しい」と断言できるか。別に確かめるべき物理条件を二つ以上挙げよ。

- Level: C

<!-- solution-start -->
#### 詳細解答

[気体のKnudsen数](#def-fluid1-knudsen)から

$$
\mathrm{Kn}=\frac{7\times10^{-8}}{10^{-5}}=7\times10^{-3}=0.007.
$$

[幾何平均の構成](#prop-fluid1-geometric-window)へ $a=\lambda$ を代入すると

$$
\ell=\sqrt{7\times10^{-8}\cdot10^{-5}}
=\sqrt{7\times10^{-13}}\approx8.37\times10^{-7}\ {\rm m}.
$$

二つの比は

$$
\frac{\lambda}{\ell}=\frac{7\times10^{-8}}{8.37\times10^{-7}}\approx0.0837,\qquad
\frac\ell L=\frac{8.37\times10^{-7}}{10^{-5}}\approx0.0837.
$$

数値が一致するのは幾何平均の選び方による。これだけで十分強い物理的尺度分離と断言はできない。

[動粘度](#def-fluid1-kinematic-viscosity)と[Reynolds数](../../CTM/CTM16/index.md#def-ctm16-reynolds)について

$$
\nu=\frac{1.8\times10^{-5}}{1.2}=1.5\times10^{-5}\ {\rm m^2/s},
$$

$$
\mathrm{Re}=\frac{1.2\cdot0.02\cdot10^{-5}}{1.8\times10^{-5}}
=\frac{2.4\times10^{-7}}{1.8\times10^{-5}}
=\frac1{75}\approx0.0133.
$$

[粘性時間](#prop-fluid1-viscous-diffusion)は

$$
T_\nu=\frac{10^{-10}}{1.5\times10^{-5}}
\approx6.67\times10^{-6}\ {\rm s}.
$$

$\mathrm{Re}$ は慣性対粘性の尺度であり、壁の滑りを排除する条件でも、分子的非平衡を否定する条件でもない。少なくとも (i) $L$ が実際の最小変化尺度か、(ii) 壁で無滑りか滑り条件を使うべきか、(iii) 入力物性が温度・圧力に適合するか、(iv) 代表時間に対して局所平衡が保たれるかを確認する。従って採用すべきモデルの正しさは数値だけでは証明できない。
<!-- solution-end -->

## 8. 次の講義へ

流体の密度や速度を場として扱う前には、微視的長さと流れの変化長さの間に平均化の余地が必要である。気体のKnudsen数と流体模型内のReynolds数は異なる問いに答える。また粘性係数・動粘度・表面張力は、何を測定するかと単位まで異なる。粘性時間 $L^2/\nu$ はNewton応力と運動量式から具体的に導けた。

FLUID2では、この連続体の静止状態で圧力と重力の力の釣合を考え、静水圧を導く。
