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

球対称性を使って初期の軌道面を $\theta=\pi/2$ とします。この制限が一貫していることを確かめます。測地線の角度方向のEuler–Lagrange方程式は

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

$\ell=r^2\dot\phi>0$ なので $\phi$ を媒介変数にできます。$u(\phi)=1/r(\phi)$ と置き、プライムを $d/d\phi$ とすると、連鎖律は

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
**定義の確認**。 $e=1/4$ と $\phi_0=0$ に対し、$u_{\mathrm N}>0$ は全角度で成立します。$\phi=0$ で $u=(5/4)/p$、$\phi=\pi$ で $u=(3/4)/p$ なので、半径の最小値は $r_{\min}=4p/5$、最大値は $r_{\max}=4p/3$。二つの半径の逆数から $2/(r_{\min}^{-1}+r_{\max}^{-1})=p$ も確認できます。$u_{\mathrm N}''+u_{\mathrm N}=1/p=GM/\ell^2$ なのでNewtonの軌道方程式を満たします。
<!-- definition-example-end -->

## 3. 円軌道と安定性の境界

有効ポテンシャルを見れば、相対論の補正が強場で何を変えるか分かります。半径一定の運動では、まず $\dot r=0$ だけでなく $\ddot r=0$ も必要です。$u^\mu$ の半径方向の測地線方程式を保存量で整理すると

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

角度原点を零次の近日点に置き、$u=u_0+u_1+\cdots$、$u_0=(1+e\cos\phi)/p$、$u_1=O(\alpha/p^2)$ と展開します。零次は $u_0''+u_0=1/p$、一次は

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

$e>0$ のため、この係数比較で $e$ を割れます。残りの補正項は定数、$\cos\phi$、$\cos2\phi$ の有限周期成分です。これらは一次では軌道の形と振幅を変えるだけで、連続する極小点の角度差に一次の追加を与えません。実際、振動数 $1-\delta$ の近傍では二次高調波などの導関数は周期を通じて同じ位相へ戻るので、近日点条件 $u'=0$ の一次の周期差は $2\pi/(1-\delta)$ で定まります。

したがって径方向周期の角度は

$$
\Phi_r=\frac{2\pi}{1-\delta}
=2\pi(1+\delta)+O(\delta^2),
\qquad
\Delta\varpi=2\pi\delta+O(\delta^2)
=\frac{6\pi GM}{c^2p}+O(r_s^2/p^2).
$$

Newton基準楕円の幾何から $p=a(1-e^2)$ を代入して第二表示を得ます。$\square$
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
**詳細解答。** 規格化条件は $-f\dot x^{0\,2}+\dot r^2/f+r^2\dot\phi^2=-c^2$。$f>0$ の座標域で $\dot x^0=\mathcal E/f$ とし、$\dot\phi=\ell/r^2$ を代入すると $-\mathcal E^2/f+\dot r^2/f+\ell^2/r^2=-c^2$。両辺を $f$ 倍して $\dot r^2=\mathcal E^2-f(c^2+\ell^2/r^2)$ です。時間座標の割算とこの静的表示に $f\ne0$ が必要です。[半径積分](#prop-gr19-radial-energy)を独立に復元しました。
<!-- solution-end -->

<a id="ex-gr19-a02"></a>
#### GR19-A02 有効ポテンシャルの三項と単位
- Level: A

$V_{\mathrm{eff}}=[(1-r_s/r)(c^2+\ell^2/r^2)-c^2]/2$ を展開し、補正項の符号と単位を調べよ。

<!-- solution-start -->
**詳細解答。** 積を分配すると $V_{\mathrm{eff}}=-c^2r_s/(2r)+\ell^2/(2r^2)-r_s\ell^2/(2r^3)$ です。$r_s=2GM/c^2$ を代入して $-GM/r+\ell^2/(2r^2)-GM\ell^2/(c^2r^3)$。三番目は負です。$[\ell]=\mathrm{m}^2/\mathrm{s}$ より $[GM\ell^2/(c^2r^3)]=(\mathrm{m}^3/\mathrm{s}^2)(\mathrm{m}^4/\mathrm{s}^2)/[(\mathrm{m}^2/\mathrm{s}^2)\mathrm{m}^3]=\mathrm{m}^2/\mathrm{s}^2$ で揃います。
<!-- solution-end -->

<a id="ex-gr19-a03"></a>
#### GR19-A03 逆半径への連鎖律
- Level: A

$\dot\phi=\ell/r^2>0$、$u=1/r$ とする。$u'$ と $\dot r$ の関係、および $u''+u$ を示せ。

<!-- solution-start -->
**詳細解答。** $u'=(-r^{-2})(dr/d\phi)=(-r^{-2})(\dot r/\dot\phi)=-\dot r/\ell$ です。[径方向積分](#prop-gr19-radial-energy)に代入すると $(u')^2=(\mathcal E^2-c^2)/\ell^2+(r_sc^2/\ell^2)u-u^2+r_su^3$。$u'\ne0$ で微分・除算して $u''+u=r_sc^2/(2\ell^2)+(3r_s/2)u^2=GM/\ell^2+3GMu^2/c^2$ です。折返し点は滑らかさで延長し、円は別判定が必要です。
<!-- solution-end -->

<a id="ex-gr19-a04"></a>
#### GR19-A04 離心率から二つの半径へ
- Level: A

$p=100r_s$、$e=1/4$ のNewton基準楕円について、近日点・遠日点の半径と一次の近日点移動角を求めよ。

<!-- solution-start -->
**詳細解答。** [Newton基準楕円](#def-gr19-newtonian-orbit-data)は $r=p/(1+e\cos\phi)$。$\cos\phi=1$ で $r_{\min}=100r_s/(5/4)=80r_s$、$\cos\phi=-1$ で $r_{\max}=100r_s/(3/4)=400r_s/3$ です。[Schwarzschild近日点移動の弱場一次式](#thm-gr19-perihelion-advance)により $\Delta\varpi\simeq3\pi r_s/p=3\pi/100$ ラジアン。いずれの半径も $r_s$ より大きいものの、誤差の係数は別に評価が必要です。
<!-- solution-end -->

<a id="ex-gr19-a05"></a>
#### GR19-A05 円軌道の存在と安定
- Level: A

半径 $r_0=4r_s$ の円軌道で $\ell^2$ と $\mathcal E^2$ を求め、安定か判定せよ。

<!-- solution-start -->
**詳細解答。** [円軌道の命題](#prop-gr19-circular-orbits)に $r_0=4r_s$ を代入すると $\ell^2=c^2r_s(16r_s^2)/(8r_s-3r_s)=(16/5)c^2r_s^2$。$\mathcal E^2/c^2=(1-1/4)^2/(1-3/8)=(9/16)/(5/8)=9/10$ です。$r_0=4r_s>3r_s$ で $V_{\mathrm{eff}}''>0$ なので半径方向に安定です。
<!-- solution-end -->

### Level B

<a id="ex-gr19-b01"></a>
#### GR19-B01 有効ポテンシャルの停留点と限界
- Level: B

$V_{\mathrm{eff}}'=GM/r^2-\ell^2/r^3+3GM\ell^2/(c^2r^4)$ の正の零点が二つある条件を求めよ。両零点が重なるときの半径を計算せよ。

<!-- solution-start -->
**詳細解答。** $r^4V_{\mathrm{eff}}'=GM r^2-\ell^2r+3GM\ell^2/c^2$ は上に凸の二次式です。判別式は $D=\ell^4-12(GM)^2\ell^2/c^2=\ell^2[\ell^2-12(GM)^2/c^2]$。$\ell>0$ なので二つの異なる正の根には $\ell^2>12(GM)^2/c^2=3c^2r_s^2$ が必要十分です。根は $r_\pm=[\ell^2\pm\sqrt D]/(2GM)$ で、符号の変化は正、負、正となるため、内側 $r_-$ は極大、外側 $r_+$ は極小です。$D=0$ では $\ell^2=12(GM)^2/c^2$、重根は $r=\ell^2/(2GM)=6GM/c^2=3r_s$。この限界点は二次の極小ではありません。
<!-- solution-end -->

<a id="ex-gr19-b02"></a>
#### GR19-B02 共鳴項が角度を変える
- Level: B

$u_0=(1+e\cos\phi)/p$ を $u''+u=1/p+3GMu^2/c^2$ に代入し、一次補正の共鳴項の特解と振動数のずれ $\delta$ を求めよ。$0<e<1$ とする。

<!-- solution-start -->
**詳細解答。** $\alpha=GM/c^2$ とすると一次の強制項は $3\alpha p^{-2}(1+2e\cos\phi+e^2\cos^2\phi)$。$\cos^2\phi=(1+\cos2\phi)/2$ なので、振動数1の項だけ抜き出すと $6\alpha e p^{-2}\cos\phi$ です。$(d^2/d\phi^2+1)(\phi\sin\phi)=2\cos\phi$ より特解は $(3\alpha e/p^2)\phi\sin\phi$。一方 $(e/p)\cos[(1-\delta)\phi]=(e/p)(\cos\phi+\delta\phi\sin\phi)+O(\delta^2)$ なので $(e/p)\delta=3\alpha e/p^2$、$\delta=3\alpha/p$ です。$e>0$ の条件は係数比較で $e$ を割るためにも必要です。
<!-- solution-end -->

<a id="ex-gr19-b03"></a>
#### GR19-B03 近日点を速度零だけで判定しない
- Level: B

半径の折返し点と円軌道について、必要な条件を有効ポテンシャルで比較せよ。なぜ折返し点の $u'=0$ から二階軌道式を直接導けないか。

<!-- solution-start -->
**詳細解答。** 一般の折返し点では $\dot r=0$ なので $\varepsilon=V_{\mathrm{eff}}(r_0)$ が必要ですが、$\ddot r=-V_{\mathrm{eff}}'(r_0)$ は一般に零でありません。円軌道では $\dot r=\ddot r=0$ の両方が必要で、$\varepsilon=V_{\mathrm{eff}}(r_0)$ かつ $V_{\mathrm{eff}}'(r_0)=0$ です。$u'=-\dot r/\ell$ なので折返し点では $u'=0$。一階式の微分 $2u'u''=(-2u+\cdots)u'$ を $2u'$ で割る手順はその点では無効です。[軌道方程式](#prop-gr19-orbit-equation)は非円軌道の周囲からの連続延長で扱い、円は別途半径方程式で確認します。
<!-- solution-end -->

<a id="ex-gr19-b04"></a>
#### GR19-B04 限界円軌道でエネルギーと角運動量を検算
- Level: B

$r_0=3r_s$ で $\ell^2/(c^2r_s^2)$ と $\mathcal E^2/c^2$ を求め、$V_{\mathrm{eff}}''$ の符号がどうなるか説明せよ。

<!-- solution-start -->
**詳細解答。** [円軌道公式](#prop-gr19-circular-orbits)から $\ell^2/(c^2r_s^2)=9/(6-3)=3$。また $\mathcal E^2/c^2=(1-1/3)^2/(1-3/6)=(4/9)/(1/2)=8/9$ です。二階微分の分子は $GM(r_0-3r_s)$ なので零となります。ここで「二階微分が零だから安定」と判断するのは誤りです。安定側の極小が消える境界であり、二階の正値条件は満たしません。
<!-- solution-end -->

### Level C

<a id="ex-gr19-c01"></a>
#### GR19-C01 Schwarzschild外部の軌道から近日点移動まで
- Level: C

$r>r_s$ にある未来向き時間的試験質点が赤道面で $\ell>0$ を保ち運動する。計量と四元速度規格化から有効ポテンシャルを導き、逆半径の軌道方程式を作れ。$0<e<1$、$p=\ell^2/(GM)\gg r_s$ を用いて一次の近日点移動角を導出し、近似が成立しない条件を二つ述べよ。

<!-- solution-start -->
**詳細解答。** [GR14の測地線保存量](../GR14/index.md#thm-gr14-killing-charge)を計量の $\partial_{x^0}$ と $\partial_\phi$ に適用すると $\mathcal E=f\dot x^0$ と $\ell=r^2\dot\phi$ が定数です。規格化条件 $-f\dot x^{0\,2}+\dot r^2/f+r^2\dot\phi^2=-c^2$ へ代入し、$\dot r^2=\mathcal E^2-f(c^2+\ell^2/r^2)$ を得ます。$c^2/2$ を両辺から整理して

$$
\frac{\dot r^2}{2}-\frac{GM}{r}
+\frac{\ell^2}{2r^2}-\frac{GM\ell^2}{c^2r^3}
=\frac{\mathcal E^2-c^2}{2}.
$$

$u=1/r$、$u'=-(1/r^2)(\dot r/\dot\phi)=-\dot r/\ell$。径方向の一階式を二階へ変換すると、非円軌道上で $u''+u=GM/\ell^2+3GMu^2/c^2=1/p+3\alpha u^2$、$\alpha=GM/c^2$ です。

零次の楕円 $u_0=(1+e\cos\phi)/p$ を入れれば一次の強制項は $3\alpha p^{-2}[1+e^2/2+2e\cos\phi+(e^2/2)\cos2\phi]$。$\cos\phi$ の係数は $6\alpha e/p^2$ で、$(D^2+1)(\phi\sin\phi)=2\cos\phi$ なので共鳴補正は $3\alpha e\phi\sin\phi/p^2$ です。$(e/p)\cos[(1-\delta)\phi]=(e/p)[\cos\phi+\delta\phi\sin\phi+\cdots]$ と比較して $\delta=3\alpha/p$。従って

$$
\Delta\varpi=\frac{2\pi}{1-\delta}-2\pi
=\frac{6\pi GM}{c^2p}+O(r_s^2/p^2).
$$

誤適用例の第一は $p\sim r_s$ として二次以降を無視すること、第二は $e=0$ の円に近日点という特別な方向があるとみなすことです。さらに中心天体の回転や試験質点自身の重力を無視した模型にも注意が必要です。
<!-- solution-end -->

---

本章で求めた近日点移動は、Schwarzschild真空計量・時間的測地線・角度の比較から生まれます。次のGR20では、同じ外部幾何を光の到達時間に適用し、座標時刻と観測者の時計の読みを区別してShapiro時間遅延を調べます。
