# GR19 近日点移動と有効ポテンシャル

<!-- definition-example-audit: strict -->

[GR16のSchwarzschild計量](../GR16/index.md#thm-gr16-schwarzschild)を得たことで、質量の周囲にある時計と光の運動を計算できるようになりました。光線の屈曲は光的測地線で調べましたが、惑星のような質量を持つ物体では、軌道上を進む時計の**固有時**が存在します。同じ計量から、Newton力学の楕円軌道がなぜ少しずつ回るのかを説明できるでしょうか。

Newtonの逆二乗中心力では、束縛された楕円の近日点は軌道を一周しても同じ方向を向きます。Schwarzschild時空での自由落下は似た楕円を描きますが、一般には同じ角度で閉じません。ここではまず四元速度の規格化と保存量から半径運動を一変数へ還元し、安定円軌道の限界を調べます。その後、弱場の軌道方程式から近日点方向のずれを導きます。

以後、中心質量 $M>0$、$G>0$、$c>0$、宇宙項 $\Lambda=0$ とし、試験質点の自己重力・自転・摩擦を無視します。外部真空の静的座標域 $r>r_s$ で、符号 $(-,+,+,+)$ と $x^0=ct$ を用い、

$$
ds^2=-f(r)(dx^0)^2+\frac{dr^2}{f(r)}
+r^2(d\theta^2+\sin^2\theta\,d\phi^2),
\qquad f(r)=1-\frac{r_s}{r},\quad r_s=\frac{2GM}{c^2}.
$$

$r$ は球面積 $4\pi r^2$ を与える面積半径です。試験質点は未来向きの時間的測地線を固有時 $\tau$ で媒介し、$u=dx/d\tau$ と $g(u,u)=-c^2$ を満たします。点は $d/d\tau$ を表します。

## 1. 保存量を利用して半径運動を切り出す

球対称性を使って初期の軌道面を $\theta=\pi/2$ とします。この制限が一貫していることを確かめます。[GR3の固有時測地線方程式](../GR3/index.md#thm-gr3-stationary-action)を角度方向に適用すると、Euler–Lagrange方程式は

$$
\frac{d}{d\tau}(r^2\dot\theta)=r^2\sin\theta\cos\theta\,\dot\phi^2.
$$

初期値 $\theta=\pi/2,\dot\theta=0$ なら右辺は零であり、この定数解と初期値を共有します。$r>r_s$ の滑らかな測地線方程式の局所一意性により、軌道は赤道面にとどまります。以後、軸角運動量の向きを選び $\ell=r^2\dot\phi>0$ とします。$\ell=0$ の径方向自由落下は近日点の方向が定まらないので別扱いです。

計量成分は $x^0,\phi$ に依存しません。[GR14のKilling場の座標判定](../GR14/index.md#prop-gr14-killing-coordinate-test)と[測地線保存定理](../GR14/index.md#thm-gr14-killing-charge)を $\partial_{x^0}$ と $\partial_\phi$ に適用すると、単位質量あたりの保存量

$$
\mathcal E:=-g(u,\partial_{x^0})=f\dot x^0>0,\qquad
\ell:=g(u,\partial_\phi)=r^2\dot\phi>0
$$

が得られます。$\mathcal E$ は速度の次元、$\ell$ は長さの二乗を時間で割った次元です。遠方での静止粒子は $\mathcal E=c$ となり、$c\mathcal E$ が単位質量あたりの時間並進エネルギーの次元を持ちます。$\mathcal E$ を無条件にNewtonの比エネルギーと同一視しません。

時間的条件へ $\dot x^0=\mathcal E/f$、$\dot\phi=\ell/r^2$ を代入すると

$$
-c^2=-\frac{\mathcal E^2}{f}+\frac{\dot r^2}{f}
+\frac{\ell^2}{r^2},
\qquad
\dot r^2=\mathcal E^2-f\left(c^2+\frac{\ell^2}{r^2}\right).
$$

これは半径方向の運動を、一定のエネルギーと半径で変化する関数との差で表しています。Newtonの中心力問題と比較するため、上の式の両辺を2で割り、静止エネルギーに対応する $c^2/2$ を差し引きます。この書き換えに現れる半径だけの関数が**有効ポテンシャル**です。

<a id="def-gr19-effective-potential"></a>

<!-- formal-statement-start -->
> **定義（時間的測地線の有効ポテンシャル）**  
> 正質量Schwarzschild外部 $r>r_s$ における赤道面内の時間的測地線で、$\ell>0$ を固定する。**半径運動用の有効ポテンシャル**と**換算エネルギー**を

$$
V_{\mathrm{eff}}(r;\ell):=
\frac12\left(1-\frac{r_s}{r}\right)
\left(c^2+\frac{\ell^2}{r^2}\right)-\frac{c^2}{2},
\qquad
\varepsilon:=\frac{\mathcal E^2-c^2}{2}
$$

> で定める。$V_{\mathrm{eff}}$ と $\varepsilon$ は速度の二乗の次元を持つ。粒子の固有時について $\dot r^2/2+V_{\mathrm{eff}}=\varepsilon$ である。
<!-- formal-statement-end -->

<!-- definition-example-start: def-gr19-effective-potential -->
**定義の確認**（平坦極限と次元）。 $M\to0$ すなわち $r_s\to0$ とすると、$V_{\mathrm{eff}}=\ell^2/(2r^2)$ です。これは平坦空間で同じ角運動量を保つときの半径方向の遠心項と一致します。また $[\ell^2/r^2]=\mathrm{m}^2/\mathrm{s}^2=[c^2]$ なので二項は加算可能です。さらに $\ell=0$ を形式的に代入すれば $V_{\mathrm{eff}}=-GM/r$ ですが、その運動には近日点の角度がないことに注意します。
<!-- definition-example-end -->

<a id="prop-gr19-radial-energy"></a>

<!-- formal-statement-start -->
> **命題（半径方向の一階積分とNewton極限）**  
> 上記の正質量外部、未来向き時間的測地線、$\ell>0$ の下で

$$
\boxed{\frac{\dot r^2}{2}+V_{\mathrm{eff}}(r;\ell)=\varepsilon,\qquad
V_{\mathrm{eff}}=-\frac{GM}{r}
+\frac{\ell^2}{2r^2}-\frac{GM\ell^2}{c^2r^3}.}
$$

> 右辺の最初の二項がNewton中心力の有効ポテンシャルであり、三番目がSchwarzschildの補正項である。この表示式は $r>r_s$ で厳密で、弱場近似ではない。
<!-- formal-statement-end -->

### 証明の見取り図

計量の時間・角度成分をKilling保存量で消去します。$r_s=2GM/c^2$ を展開したときの $r^{-3}$ 項が、後で軌道の位相をずらします。

<!-- proof-start -->
### 証明

前述の規格化条件から $\dot r^2=\mathcal E^2-f(c^2+\ell^2/r^2)$ です。両辺を2で割り、$c^2/2$ を加減すると

$$
\frac{\dot r^2}{2}
+\frac12 f\left(c^2+\frac{\ell^2}{r^2}\right)-\frac{c^2}{2}
=\frac{\mathcal E^2-c^2}{2}=\varepsilon.
$$

$f=1-r_s/r$ を積に分配すれば

$$
\begin{aligned}
V_{\mathrm{eff}}
&=\frac{c^2}{2}-\frac{c^2r_s}{2r}
+\frac{\ell^2}{2r^2}-\frac{r_s\ell^2}{2r^3}-\frac{c^2}{2}\\
&=-\frac{GM}{r}+\frac{\ell^2}{2r^2}
-\frac{GM\ell^2}{c^2r^3},
\end{aligned}
$$

となります。最後に $c^2r_s/2=GM$、$r_s/2=GM/c^2$ を使いました。$\square$
<!-- proof-end -->

$r^{-3}$ 項は負なので、同じ $\ell$ のNewton有効ポテンシャルより内側への引力に対応する補正が増えます。ただし「強い引力だから楕円が何度回るか」はまだ決まりません。位相を求めるには、半径 $r$ を角度 $\phi$ の関数として解く必要があります。

## 2. 逆半径の軌道方程式

$\ell=r^2\dot\phi>0$ なので $\phi$ を媒介変数にできます。以下では四元速度に使った記号 $u$ を改めて逆半径 $u(\phi)=1/r(\phi)$ に使い、プライムを $d/d\phi$ とします。連鎖律は

$$
u'=-\frac1{r^2}\frac{\dot r}{\dot\phi}
=-\frac{\dot r}{\ell},
\qquad
(u')^2=\frac{\mathcal E^2-c^2}{\ell^2}
+\frac{r_sc^2}{\ell^2}u-u^2+r_su^3.
$$

<a id="prop-gr19-orbit-equation"></a>

<!-- formal-statement-start -->
> **命題（Schwarzschild時間的測地線の軌道方程式）**  
> $M>0$、$r>r_s$、$\ell>0$ を満たす非径方向の時間的測地線では、$u=1/r$ が

$$
\boxed{u''+u=\frac{GM}{\ell^2}+\frac{3GM}{c^2}u^2}
$$

> を満たす。右辺第二項は相対論的な補正である。半径が一定の解も含めるには半径方向の測地線方程式を使用する。
<!-- formal-statement-end -->

### 証明の見取り図

一階式を角度で微分して $u''$ を求めます。ただし近日点・遠日点では $u'=0$ なので、そこで $u'$ によって割らないことが重要です。

<!-- proof-start -->
### 証明

上の一階式を $\phi$ で微分すると

$$
2u'u''=\left(\frac{r_sc^2}{\ell^2}-2u+3r_su^2\right)u'.
$$

$u'\ne0$ の区間では

$$
u''+u=\frac{r_sc^2}{2\ell^2}+\frac{3r_s}{2}u^2
=\frac{GM}{\ell^2}+\frac{3GM}{c^2}u^2.
$$

非円軌道の孤立した折返し点では滑らかな測地線の連続性によって同じ式が成立します。定数 $u$ の場合、一階式を微分しても $0=0$ しか出ないので、定数解が実際に測地線となる条件は次節で半径方程式から確認します。$\square$
<!-- proof-end -->

Newton力学では最後の $u^2$ 項が消え、$u''+u=GM/\ell^2$ です。次の近似で使う**半通径**は、このNewton方程式の定数解の逆数を基準として作る長さです。

<a id="def-gr19-newtonian-orbit-data"></a>

<!-- formal-statement-start -->
> **定義（Newton基準の半通径と離心率）**  
> 質量 $M>0$、非零の比角運動量 $\ell>0$ に対して $p:=\ell^2/(GM)>0$ を **Newton基準の半通径**とする。補正項を零とした方程式において、$0\leq e<1$、$\phi_0\in\mathbb R$ を用いた

$$
u_{\mathrm N}(\phi)=\frac1p\{1+e\cos(\phi-\phi_0)\}
$$

> を **Newton基準楕円**とし、$e$ をその **離心率** と呼ぶ。$e=0$ は円、$0<e<1$ は二つの異なる折返し半径を持つ。これは相対論的軌道の厳密な楕円表示ではない。
<!-- formal-statement-end -->

<!-- definition-example-start: def-gr19-newtonian-orbit-data -->
**定義の確認**。$e=1/4$、$\phi_0=0$ とすれば $1+e\cos\phi\geq 3/4>0$ なので $u_{\mathrm N}>0$ は全角度で成立します。逆半径は $\phi=0$ で最大、$\phi=\pi$ で最小です。そこで

$$
\begin{aligned}
r_{\min}&=\frac{p}{1+e}=\frac{4p}{5},&
r_{\max}&=\frac{p}{1-e}=\frac{4p}{3},\\
\frac{2}{r_{\min}^{-1}+r_{\max}^{-1}}
&=\frac{2}{(5/4+3/4)/p}=p.
\end{aligned}
$$

さらに $u_{\mathrm N}'=-e\sin\phi/p$、$u_{\mathrm N}''=-e\cos\phi/p$ だから

$$
u_{\mathrm N}''+u_{\mathrm N}
=-\frac{e\cos\phi}{p}+\frac{1+e\cos\phi}{p}
=\frac1p=\frac{GM}{\ell^2}.
$$

すなわち半径が正、折返し半径が二つ、Newtonの軌道方程式を満たすという各条件を確認できます。
<!-- definition-example-end -->

## 3. 円軌道と安定性の境界

有効ポテンシャルを見れば、相対論の補正が強場で何を変えるか分かります。半径一定の運動では、まず $\dot r=0$ だけでなく $\ddot r=0$ も必要です。[GR3の固有時測地線方程式](../GR3/index.md#thm-gr3-stationary-action)の半径成分を保存量で整理すると

$$
\ddot r=-\frac{dV_{\mathrm{eff}}}{dr};
$$

実際、$\Gamma^r_{00}=ff'/2$、$\Gamma^r_{rr}=-f'/(2f)$、$\Gamma^r_{\phi\phi}=-fr$ を用いて

$$
\begin{aligned}
\ddot r&=-\frac{ff'}2\dot x^{0\,2}
+\frac{f'}{2f}\dot r^2+fr\dot\phi^2\\
&=-\frac{f'}2\left(c^2+\frac{\ell^2}{r^2}\right)
+\frac{f\ell^2}{r^3}=-V_{\mathrm{eff}}'(r).
\end{aligned}
$$

ここでは[半径方向の一階積分](#prop-gr19-radial-energy)を第二行への代入に使いました。従って円軌道には $V_{\mathrm{eff}}'=0$ を課します。さらに局所的な安定性は極小・極大の違いで判定できます。

<a id="prop-gr19-circular-orbits"></a>

<!-- formal-statement-start -->
> **命題（円軌道と最内安定円軌道）**  
> 正質量Schwarzschild外部の赤道面における非径方向の時間的円測地線は、半径 $r_0>3r_s/2$ でのみ存在し、保存量は

$$
\boxed{\ell^2=\frac{c^2r_sr_0^2}{2r_0-3r_s},\qquad
\mathcal E^2=\frac{c^2(1-r_s/r_0)^2}{1-3r_s/(2r_0)}.}
$$

> 半径方向の微小変動に対し $r_0>3r_s$ で安定、$3r_s/2<r_0<3r_s$ で不安定、$r_0=3r_s=6GM/c^2$ では二階の判定が零となる。$r_0=3r_s$ を **最内安定円軌道の限界半径**とする。
<!-- formal-statement-end -->

### 証明の見取り図

$V_{\mathrm{eff}}'(r_0)=0$ から $\ell^2$ を求め、それをエネルギー式へ戻します。安定性の符号は、角運動量を固定して有効ポテンシャルを二階微分した結果で確かめます。

<!-- proof-start -->
### 証明

[有効ポテンシャルの展開式](#prop-gr19-radial-energy)から

$$
V_{\mathrm{eff}}'(r)=\frac{GM}{r^2}
-\frac{\ell^2}{r^3}+\frac{3GM\ell^2}{c^2r^4}.
$$

$r=r_0$ で零とすると、$GM r_0^2=\ell^2(r_0-3GM/c^2)$。$\ell^2>0$ なので $r_0>3GM/c^2=3r_s/2$ が必要で、

$$
\ell^2=\frac{GM r_0^2}{r_0-3GM/c^2}
=\frac{c^2r_s r_0^2}{2r_0-3r_s}.
$$

この式を $\dot r=0$ の半径積分 $\mathcal E^2=f(c^2+\ell^2/r_0^2)$ に代入すると、

$$
\frac{\mathcal E^2}{c^2}
=\left(1-\frac{r_s}{r_0}\right)
\left(1+\frac{r_s}{2r_0-3r_s}\right)
=\frac{(1-r_s/r_0)^2}{1-3r_s/(2r_0)}.
$$

二階微分は

$$
V_{\mathrm{eff}}''(r)
=-\frac{2GM}{r^3}+\frac{3\ell^2}{r^4}
-\frac{12GM\ell^2}{c^2r^5}.
$$

円軌道の $\ell^2=GM r_0^2/(r_0-3GM/c^2)$ を代入して共通分母へ集めると

$$
V_{\mathrm{eff}}''(r_0)
=\frac{GM(r_0-6GM/c^2)}
{r_0^3(r_0-3GM/c^2)}.
$$

分母は存在条件により正です。従って $r_0>6GM/c^2=3r_s$ で極小、$3GM/c^2<r_0<6GM/c^2$ で極大になります。限界半径では二階微分が零なので、二階の線形安定性の境界であり、正の曲率による安定円軌道には含めません。$\square$
<!-- proof-end -->

**具体例。** $r_0=4r_s$ なら $\ell^2=(16/5)c^2r_s^2$、$\mathcal E^2=(9/10)c^2$。$4r_s>3r_s$ なので安定です。一方 $r_0=2r_s$ では円軌道そのものは存在しますが、$2r_s<3r_s$ なので不安定です。「円軌道が存在する」と「少しずれても元へ戻ろうとする」は別の条件です。

## 4. 近日点移動を角度で測る

束縛された非円軌道で $r$ が極小となる点を**近日点**、極大となる点を**遠日点**とします。$r$ の極小値と極大値が繰り返される場合、隣り合う二つの近日点を結ぶ向きの変化を考えます。軌道が閉じたNewton楕円なら、次の近日点に達するまでの $\phi$ の増分はちょうど $2\pi$ です。相対論ではこの増分が変わります。

<a id="def-gr19-perihelion-shift"></a>

<!-- formal-statement-start -->
> **定義（近日点移動角）**  
> $r>r_s$ の赤道面内を進む束縛された非円時間的測地線で、隣り合う半径極小点を $\tau_1<\tau_2$ とし、$\ell>0$ とする。これらの間の角度増分を $\Phi_r:=\phi(\tau_2)-\phi(\tau_1)$ として、**一回の径方向周期あたりの近日点移動角**を

$$
\Delta\varpi:=\Phi_r-2\pi
$$

> で定める。ここで角度 $\phi$ はSchwarzschild計量の無限遠で規格化した軸回転座標である。
<!-- formal-statement-end -->

<!-- definition-example-start: def-gr19-perihelion-shift -->
**定義の確認**（Newton極限）。 [Newton基準楕円](#def-gr19-newtonian-orbit-data)は $e>0$ なら $\phi=\phi_0+2\pi n$ で連続する半径極小を持ちます。その差は $\Phi_r=2\pi$ であるため $\Delta\varpi=0$ です。$e=0$ の円では全点が同じ半径なので近日点を一意に定められず、この定義を直接適用しません。
<!-- definition-example-end -->

軌道方程式の補正項は小さくても、同じ方向を何回通るかという**位相**には一周ごとに効果が積み重なります。単に補正項の大きさを見積もるのでなく、$\cos\phi$ に共鳴する項を求めるのが鍵です。

<a id="thm-gr19-perihelion-advance"></a>

<!-- formal-statement-start -->
> **定理（Schwarzschild近日点移動の弱場一次式）**  
> $M>0$ のSchwarzschild外部を運動する、離心率が固定された弱場の束縛・非円時間的測地線を考える。Newton基準の半通径 $p=\ell^2/(GM)$、離心率 $0<e<1$ を固定して $r_s/p\to0^+$ とし、軌道が強場の不安定円軌道領域から十分離れているとする。このとき一回の径方向周期あたりの近日点移動角は

$$
\boxed{\Delta\varpi
=\frac{6\pi GM}{c^2p}
+O\left(\frac{r_s^2}{p^2}\right)
=\frac{6\pi GM}{c^2a(1-e^2)}
+O\left(\frac{r_s^2}{p^2}\right),}
$$

> となる。第二表示の $a:=p/(1-e^2)$ は対応するNewton基準楕円の長半径である。$O$ 項は $e$ を固定した極限での角度（ラジアン）の誤差を表す。
<!-- formal-statement-end -->

### 証明の見取り図

[軌道方程式](#prop-gr19-orbit-equation)の右辺にNewton基準楕円を代入して一次の補正を求めます。$\cos\phi$ と同じ振動数の強制項は $\phi\sin\phi$ を生みます。これを角度の振動数の小さな変化と読み替え、次の近日点までの角度を求めます。

<!-- proof-start -->
### 証明

$\alpha:=GM/c^2=r_s/2$ と書き、$\eta:=\alpha/p\ll1$ を小パラメータとします。方程式は

$$
u''+u=\frac1p+3\alpha u^2.
$$

[Newton基準楕円](#def-gr19-newtonian-orbit-data)の近日点を零次の角度原点に置き、$u=u_0+u_1+\cdots$、$u_0=(1+e\cos\phi)/p$、$u_1=O(\alpha/p^2)$ と展開します。零次は $u_0''+u_0=1/p$、一次は

$$
u_1''+u_1=\frac{3\alpha}{p^2}(1+2e\cos\phi+e^2\cos^2\phi).
$$

$\cos^2\phi=(1+\cos2\phi)/2$ を使って振動数ごとに分けると

$$
u_1''+u_1
=\frac{3\alpha}{p^2}
\left(1+\frac{e^2}{2}+2e\cos\phi
+\frac{e^2}{2}\cos2\phi\right).
$$

定数項には $y=1$、$\cos2\phi$ 項には $(d^2/d\phi^2+1)\cos2\phi=-3\cos2\phi$ を使います。共鳴項では

$$
\left(\frac{d^2}{d\phi^2}+1\right)(\phi\sin\phi)
=2\cos\phi,
$$

なので特解は

$$
u_1(\phi)=\frac{3\alpha}{p^2}
\left(1+\frac{e^2}{2}-\frac{e^2}{6}\cos2\phi
+e\phi\sin\phi\right)
+A\cos\phi+B\sin\phi.
$$

$A,B$ は初期条件によって決まり、一定の位相・振幅の補正を与えます。角度原点を実際の近日点に取れば $u'(0)=0$ により $B=0$ です。重要なのは $A$ が $\phi\sin\phi$ の係数を変更しない点です。

ここで

$$
\cos\{(1-\delta)\phi\}
=\cos\phi+\delta\phi\sin\phi+O(\delta^2\phi^2)
$$

を固定された有限角度区間で適用します。$u_0$ の振動部分 $(e/p)\cos\phi$ と $u_1$ の共鳴部分 $(3\alpha e/p^2)\phi\sin\phi$ を比較すると

$$
\frac{e}{p}\delta=\frac{3\alpha e}{p^2},
\qquad \delta=\frac{3\alpha}{p}=\frac{3GM}{c^2p}.
$$

$e>0$ のため、この係数比較で $e$ を割れます。周期的な補正項が近日点間の角度差を変えないことも、**近日点の条件 $u'=0$ を直接解いて**確認しましょう。角度原点を最初の近日点に置けば $u'(0)=B=0$ です。零次解は $u_0'(2\pi)=0$ かつ $u_0''(2\pi)=-e/p<0$ という単純な極大を持ちます。一次補正が $O(\eta/p)$ なので、近傍の極大の角度のずれは $O(\eta)$ です。次の近日点を $\phi=2\pi+h$ と書くと、$h=O(\eta)$ であり、零次解の導関数は

$$
u_0'(2\pi+h)=-\frac{e}{p}\sin h
=-\frac{e}{p}h+O\left(\frac{h^3}{p}\right)
$$

となります。一方、一次解で $\phi=2\pi$ における導関数を求めると、定数項、$\cos2\phi$ 項、$A\cos\phi$ 項はすべて零になり、共鳴項だけが残ります。

$$
u_1'(2\pi)
=\frac{3\alpha e}{p^2}
\left[\sin\phi+\phi\cos\phi\right]_{\phi=2\pi}
=\frac{6\pi\alpha e}{p^2}.
$$

$h=O(\eta)$ のとき $u_1'(2\pi+h)-u_1'(2\pi)$ は二次の寄与であり、固定した $0<e<1$ の有限角度区間では摂動展開の残差も二次です。よって次の近日点の条件は

$$
0=u'(2\pi+h)
=-\frac{e}{p}h+\frac{6\pi\alpha e}{p^2}
+O\left(\frac{\eta^2}{p}\right),
\qquad
h=\frac{6\pi\alpha}{p}+O(\eta^2).
$$

この $h$ は最初の近日点から次の近日点までの角度 $\Phi_r=2\pi+h$ の余剰そのものです。したがって[近日点移動角の定義](#def-gr19-perihelion-shift)から

$$
\Delta\varpi=h
=\frac{6\pi GM}{c^2p}
+O\left(\frac{r_s^2}{p^2}\right).
$$

同様に振動数 $1-\delta$ の表示では $h=2\pi\delta+O(\delta^2)$ と一致します。[Newton基準楕円](#def-gr19-newtonian-orbit-data)の二つの半径から、長半径は

$$
a=\frac{r_{\min}+r_{\max}}2
=\frac12\left(\frac{p}{1+e}+\frac{p}{1-e}\right)
=\frac{p}{1-e^2}
$$

なので $p=a(1-e^2)$ を代入して第二表示を得ます。$\square$
<!-- proof-end -->

**弱場の直接例。** $p=100r_s$、$e=1/4$ のNewton基準楕円を考えると、近日点と遠日点の基準半径はそれぞれ $80r_s$、$400r_s/3$ です。どちらも $r_s$ より十分大きく、$r_s/p=0.01$ です。一次の近日点移動角は

$$
\Delta\varpi\simeq\frac{3\pi r_s}{p}
=\frac{3\pi}{100}\ \mathrm{rad}\simeq0.09425\ \mathrm{rad}
$$

で、正方向へ移動します。これは弱場展開の**一次近似**であって、誤差の係数が小さいと保証するものではありません。

**近似の射程。** $p$ は本章では $\ell$ から作ったNewton基準量です。強場では厳密な二つの折返し半径から作る軌道要素と、必ずしも一致しません。また離心率を零にすると近日点の場所自体が不定です。上の式を円軌道の近日点移動として直接解釈したり、最内安定円軌道の近くまで外挿したりしません。試験質点の有限質量、他天体からの摂動、中心天体の自転はこの導出に含めていません。

## 5. 演習：保存量、安定性、位相の三つをつなぐ

### Level A

<a id="ex-gr19-a01"></a>
#### GR19-A01 固有時と保存量から径方向積分を復元する
- Level: A

赤道面の時間的測地線で $\mathcal E=f\dot x^0$、$\ell=r^2\dot\phi>0$ とする。$g(u,u)=-c^2$ から $\dot r^2$ を導け。$r>r_s$ が必要な箇所を示せ。

<!-- solution-start -->
**詳細解答。** 規格化条件と保存量は

$$
-f\dot x^{0\,2}+\frac{\dot r^2}{f}
+r^2\dot\phi^2=-c^2,\qquad
\mathcal E=f\dot x^0,\quad \ell=r^2\dot\phi.
$$

$r>r_s$ では $f=1-r_s/r>0$ ですから、$\dot x^0=\mathcal E/f$、$\dot\phi=\ell/r^2$ を代入できます。すると

$$
-\frac{\mathcal E^2}{f}+\frac{\dot r^2}{f}
+\frac{\ell^2}{r^2}=-c^2
\quad\Longrightarrow\quad
\dot r^2=\mathcal E^2-f\left(c^2+\frac{\ell^2}{r^2}\right).
$$

静的表示の時間保存量を $f$ で割る段階に $f\ne0$ が必要です。[半径方向の一階積分](#prop-gr19-radial-energy)を規格化から独立に復元しました。
<!-- solution-end -->

<a id="ex-gr19-a02"></a>
#### GR19-A02 有効ポテンシャルの三項と単位
- Level: A

$V_{\mathrm{eff}}=[(1-r_s/r)(c^2+\ell^2/r^2)-c^2]/2$ を展開し、補正項の符号と単位を調べよ。

<!-- solution-start -->
**詳細解答。** まず $1-r_s/r$ を積に分配し、$c^2/2$ を相殺します。

$$
\begin{aligned}
V_{\mathrm{eff}}
&=-\frac{c^2r_s}{2r}+\frac{\ell^2}{2r^2}
-\frac{r_s\ell^2}{2r^3}\\
&=-\frac{GM}{r}+\frac{\ell^2}{2r^2}
-\frac{GM\ell^2}{c^2r^3}.
\end{aligned}
$$

最後の項は負です。$[\ell]=\mathrm{m}^2/\mathrm{s}$ を用いれば、この項の次元は

$$
\left[\frac{GM\ell^2}{c^2r^3}\right]
=\frac{(\mathrm{m}^3/\mathrm{s}^2)(\mathrm{m}^4/\mathrm{s}^2)}
{(\mathrm{m}^2/\mathrm{s}^2)\mathrm{m}^3}
=\mathrm{m}^2/\mathrm{s}^2
$$

となり、ほかの二項とも一致します。
<!-- solution-end -->

<a id="ex-gr19-a03"></a>
#### GR19-A03 逆半径への連鎖律
- Level: A

$\dot\phi=\ell/r^2>0$、$u=1/r$ とする。$u'$ と $\dot r$ の関係、および $u''+u$ を示せ。

<!-- solution-start -->
**詳細解答。** $\dot\phi=\ell/r^2$ は正なので、連鎖律から

$$
u'=-\frac1{r^2}\frac{dr}{d\phi}
=-\frac1{r^2}\frac{\dot r}{\dot\phi}
=-\frac{\dot r}{\ell}.
$$

[半径方向の一階積分](#prop-gr19-radial-energy)を展開し、$r=1/u$ を代入すると

$$
(u')^2=\frac{\mathcal E^2-c^2}{\ell^2}
+\frac{r_sc^2}{\ell^2}u-u^2+r_su^3.
$$

$u'\ne0$ の区間で角度微分して $2u'$ で割れば

$$
u''+u=\frac{r_sc^2}{2\ell^2}+\frac{3r_s}{2}u^2
=\frac{GM}{\ell^2}+\frac{3GM}{c^2}u^2.
$$

非円軌道の折返し点には滑らかさで延長しますが、円軌道は別途半径測地線方程式による判定が必要です。
<!-- solution-end -->

<a id="ex-gr19-a04"></a>
#### GR19-A04 離心率から二つの半径へ
- Level: A

$p=100r_s$、$e=1/4$ のNewton基準楕円について、近日点・遠日点の半径と一次の近日点移動角を求めよ。

<!-- solution-start -->
**詳細解答。** [Newton基準楕円](#def-gr19-newtonian-orbit-data)の $r=p/(1+e\cos\phi)$ に $e=1/4$、$p=100r_s$ を代入します。

$$
r_{\min}=\frac{100r_s}{1+1/4}=80r_s,
\qquad
r_{\max}=\frac{100r_s}{1-1/4}=\frac{400r_s}{3}.
$$

[Schwarzschild近日点移動の弱場一次式](#thm-gr19-perihelion-advance)により

$$
\Delta\varpi\simeq\frac{3\pi r_s}{p}
=\frac{3\pi}{100}\ \mathrm{rad}.
$$

両半径は外部領域にありますが、一次近似の誤差係数が小さいことまで示したわけではありません。
<!-- solution-end -->

<a id="ex-gr19-a05"></a>
#### GR19-A05 円軌道の存在と安定
- Level: A

半径 $r_0=4r_s$ の円軌道で $\ell^2$ と $\mathcal E^2$ を求め、安定か判定せよ。

<!-- solution-start -->
**詳細解答。** [円軌道の保存量と安定条件](#prop-gr19-circular-orbits)に $r_0=4r_s$ を代入します。

$$
\begin{aligned}
\ell^2
&=\frac{c^2r_s(4r_s)^2}{8r_s-3r_s}
=\frac{16}{5}c^2r_s^2,\\
\frac{\mathcal E^2}{c^2}
&=\frac{(1-1/4)^2}{1-3/8}
=\frac{9/16}{5/8}=\frac9{10}.
\end{aligned}
$$

さらに $4r_s>3r_s$ なので、固定 $\ell$ で $V_{\mathrm{eff}}''(r_0)>0$ となり半径方向に線形安定です。
<!-- solution-end -->

### Level B

<a id="ex-gr19-b01"></a>
#### GR19-B01 有効ポテンシャルの停留点と限界
- Level: B

$V_{\mathrm{eff}}'=GM/r^2-\ell^2/r^3+3GM\ell^2/(c^2r^4)$ の正の零点が二つある条件を求めよ。両零点が重なるときの半径を計算せよ。

<!-- solution-start -->
**詳細解答。** $r>0$ で $r^4>0$ なので、停留点は次の二次式の根です。

$$
GM r^2-\ell^2r+\frac{3GM\ell^2}{c^2}=0,
\qquad
D=\ell^4-\frac{12(GM)^2\ell^2}{c^2}
=\ell^2\left(\ell^2-\frac{12(GM)^2}{c^2}\right).
$$

$\ell>0$ のもとで二つの異なる実根があるのは $D>0$、すなわち

$$
\ell^2>\frac{12(GM)^2}{c^2}=3c^2r_s^2
$$

のときです。二次式の根の和は $\ell^2/(GM)>0$、積は $3\ell^2/c^2>0$ なので、両方とも正です。二つの根

$$
r_\pm=\frac{\ell^2\pm\sqrt D}{2GM}
$$

の前後では $V_{\mathrm{eff}}'$ の符号が正・負・正と変わるため、内側の $r_-$ は極大、外側の $r_+$ は極小です。$D=0$ で

$$
r_-=r_+=\frac{\ell^2}{2GM}
=\frac{6GM}{c^2}=3r_s.
$$

さらに停留条件 $GM r^2=\ell^2(r-3GM/c^2)$ と $GM,\ell^2>0$ から、二つの根はともに $r>3r_s/2>r_s$ にあります。重根では停留点が重なり、二階微分による正の安定条件は成立しません。
<!-- solution-end -->

<a id="ex-gr19-b02"></a>
#### GR19-B02 共鳴項が角度を変える
- Level: B

$u_0=(1+e\cos\phi)/p$ を $u''+u=1/p+3GMu^2/c^2$ に代入し、一次補正の共鳴項の特解と振動数のずれ $\delta$ を求めよ。$0<e<1$ とする。

<!-- solution-start -->
**詳細解答。** $\alpha=GM/c^2$ と置き、零次解を一次方程式の強制項へ代入します。

$$
\begin{aligned}
u_1''+u_1
&=\frac{3\alpha}{p^2}(1+2e\cos\phi+e^2\cos^2\phi)\\
&=\frac{3\alpha}{p^2}
\left(1+\frac{e^2}2+2e\cos\phi+\frac{e^2}2\cos2\phi\right).
\end{aligned}
$$

振動数1の強制項は $6\alpha e\cos\phi/p^2$ です。作用素 $L=d^2/d\phi^2+1$ には

$$
L(\phi\sin\phi)=2\cos\phi
$$

が成り立つので、その共鳴特解は $3\alpha e\phi\sin\phi/p^2$ です。振動数を $1-\delta$ にずらして固定角度で一次展開すると

$$
\frac ep\cos[(1-\delta)\phi]
=\frac ep\cos\phi+\frac ep\delta\phi\sin\phi+O(\delta^2/p).
$$

$0<e<1$ なので係数を比較して $e$ を消去でき、

$$
\delta=\frac{3\alpha}{p}=\frac{3GM}{c^2p}
$$

を得ます。
<!-- solution-end -->

<a id="ex-gr19-b03"></a>
#### GR19-B03 近日点を速度零だけで判定しない
- Level: B

半径の折返し点と円軌道について、必要な条件を有効ポテンシャルで比較せよ。なぜ折返し点の $u'=0$ から二階軌道式を直接導けないか。

<!-- solution-start -->
**詳細解答。** 一般の折返し点 $r=r_0$ では $\dot r=0$ が必要で、[半径方向の一階積分](#prop-gr19-radial-energy)から

$$
\varepsilon=V_{\mathrm{eff}}(r_0)
$$

が成立します。しかし $\ddot r=-V_{\mathrm{eff}}'(r_0)$ は一般には零でありません。円軌道であればさらに $\ddot r=0$ が必要ですから

$$
\varepsilon=V_{\mathrm{eff}}(r_0),
\qquad V_{\mathrm{eff}}'(r_0)=0
$$

の両方を要求します。$u'=-\dot r/\ell$ なので折返し点では $u'=0$ です。一階式を微分した $2u'u''=(\cdots)u'$ をその点で $2u'$ により割れません。[軌道方程式](#prop-gr19-orbit-equation)は非円軌道の折返し点へ連続延長し、円の存在は[GR3の自由落下方程式](../GR3/index.md#thm-gr3-stationary-action)の半径成分から確認します。
<!-- solution-end -->

<a id="ex-gr19-b04"></a>
#### GR19-B04 限界円軌道でエネルギーと角運動量を検算
- Level: B

$r_0=3r_s$ で $\ell^2/(c^2r_s^2)$ と $\mathcal E^2/c^2$ を求め、$V_{\mathrm{eff}}''$ の符号がどうなるか説明せよ。

<!-- solution-start -->
**詳細解答。** [円軌道公式](#prop-gr19-circular-orbits)へ $r_0=3r_s$ を代入すると

$$
\begin{aligned}
\frac{\ell^2}{c^2r_s^2}
&=\frac{3^2}{2\cdot3-3}=3,\\
\frac{\mathcal E^2}{c^2}
&=\frac{(1-1/3)^2}{1-3/(2\cdot3)}
=\frac{4/9}{1/2}=\frac89.
\end{aligned}
$$

同じ命題の二階微分式は分子に $GM(r_0-3r_s)$ を持つため、この半径では $V_{\mathrm{eff}}''(r_0)=0$ です。零は正を意味しません。安定な極小と不安定な極大が重なる限界であり、二階微分が正となる安定円軌道の条件から外れます。
<!-- solution-end -->

### Level C

<a id="ex-gr19-c01"></a>
#### GR19-C01 Schwarzschild外部の軌道から近日点移動まで
- Level: C

$r>r_s$ にある未来向き時間的試験質点が赤道面で $\ell>0$ を保ち運動する。計量と四元速度規格化から有効ポテンシャルを導き、逆半径の軌道方程式を作れ。$0<e<1$、$p=\ell^2/(GM)\gg r_s$ を用いて一次の近日点移動角を導出し、近似が成立しない条件を二つ述べよ。

<!-- solution-start -->
**詳細解答。** [GR14のKilling場の座標判定](../GR14/index.md#prop-gr14-killing-coordinate-test)と[測地線保存量](../GR14/index.md#thm-gr14-killing-charge)を $\partial_{x^0}$、$\partial_\phi$ に適用すると

$$
\mathcal E=f\dot x^0,\qquad \ell=r^2\dot\phi
$$

が定数です。規格化条件に代入すると

$$
-\frac{\mathcal E^2}{f}+\frac{\dot r^2}{f}
+\frac{\ell^2}{r^2}=-c^2,
\qquad
\dot r^2=\mathcal E^2-f\left(c^2+\frac{\ell^2}{r^2}\right).
$$

$r_s=2GM/c^2$ を用いて積を展開すれば

$$
\frac{\dot r^2}{2}-\frac{GM}{r}
+\frac{\ell^2}{2r^2}-\frac{GM\ell^2}{c^2r^3}
=\frac{\mathcal E^2-c^2}{2}.
$$

$u=1/r$、$u'=-r^{-2}\dot r/\dot\phi=-\dot r/\ell$ であり、[軌道方程式](#prop-gr19-orbit-equation)の導出と同じく非円軌道の $u'\ne0$ の区間で微分・除算して

$$
u''+u=\frac{GM}{\ell^2}+\frac{3GM}{c^2}u^2
=\frac1p+3\alpha u^2,
\quad \alpha=\frac{GM}{c^2}.
$$

折返し点では滑らかさによりこの式を延長します。[Newton基準楕円](#def-gr19-newtonian-orbit-data)から $u_0=(1+e\cos\phi)/p$ と置き、強制項を角振動数ごとに分けると

$$
u_1''+u_1=\frac{3\alpha}{p^2}
\left(1+\frac{e^2}2+2e\cos\phi
+\frac{e^2}2\cos2\phi\right).
$$

共鳴項は $6\alpha e\cos\phi/p^2$ です。$(d^2/d\phi^2+1)(\phi\sin\phi)=2\cos\phi$ より特解の共鳴成分は $3\alpha e\phi\sin\phi/p^2$。零次の $e\cos\phi/p$ を $e\cos[(1-\delta)\phi]/p$ と書き換えて比較すれば

$$
\frac{e\delta}{p}=\frac{3\alpha e}{p^2},
\qquad \delta=\frac{3\alpha}{p}.
$$

周期項が角度差に寄与しないことは、最初の近日点を $\phi=0$ として $u'(0)=0$ を課し、次の近日点を $\phi=2\pi+h$ として確かめられます。共鳴項以外の一次項の導関数は $\phi=2\pi$ で零になり、

$$
0=u'(2\pi+h)
=-\frac{e}{p}h+\frac{6\pi\alpha e}{p^2}
+O\left(\frac{\alpha^2}{p^3}\right),
\qquad
h=\frac{6\pi\alpha}{p}+O\left(\frac{r_s^2}{p^2}\right).
$$

したがって[近日点移動角の定義](#def-gr19-perihelion-shift)から

$$
\boxed{\Delta\varpi=h
=\frac{6\pi GM}{c^2p}+O\left(\frac{r_s^2}{p^2}\right).}
$$

近似が成立しない例は、(i) $p$ が $r_s$ と同程度で二次以上の摂動を捨てられない場合、(ii) $e=0$ の円で近日点が一意に定義できない場合です。中心天体の回転や試験質点の自己重力もこの模型の外です。
<!-- solution-end -->

---

本章で求めた近日点移動は、Schwarzschild真空計量・時間的測地線・角度の比較から生まれます。次のGR20では、同じ外部幾何を光の到達時間に適用し、座標時刻と観測者の時計の読みを区別してShapiro時間遅延を調べます。
