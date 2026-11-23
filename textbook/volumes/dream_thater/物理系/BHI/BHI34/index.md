# BHI34 代替二次元模型との比較

## 1. JTから模型を替えると何を確かめ直すか

[BHI27の蒸発JT境界模型](../BHI27/index.md#def-bhi27-evaporating-jt)では、AdS$_2$に近い重力領域と非重力浴を接合し、境界時計から放射を求めました。[BHI30の条件付きisland則](../BHI30/index.md#prop-bhi30-conditional-island)は、指定した模型のレプリカ鞍点と極限操作の条件付きで精細エントロピーを評価します。それでは、負の曲率を持つJT時空をやめ、漸近平坦な二次元重力へ替えてもislandは見つかるのでしょうか。

ここではCGHS（Callan–Giddings–Harvey–Strominger）重力と、その量子補正を解析的に扱えるRST（Russo–Susskind–Thorlacius）重力を取り上げます。RSTには実際に蒸発する解とislandを使ったPage曲線の研究があります。ただし、重力作用・量子状態・入射境界条件・正則化が違えば、同じ形の図から同じ物理を結論することはできません。

本講の計算は三段階です。まずCGHSの時空とRSTの役割を識別します。次に放射の熱力学から**Page転移の主項**を導きます。最後に局所的な二変数の一般化エントロピーを自力で極値化し、実際のRST端点計算に追加して必要な情報を明確にします。

自然単位 $\hbar=k_B=1$、物質の中心電荷 $c>0$、温度 $T>0$ を使います。エントロピーの対数は自然対数です。放射を採取する遅延時刻 $u$ は漸近領域の時計で測り、$u=0$ からの有限な蒸発区間に限定します。

## 2. 曲率とdilatonの役割が違う二つの重力

JTではdilatonの変分が負の一定曲率を指定します。[JT作用の変分](../BHI19/index.md#prop-bhi19-curvature-eom)と[JTの重力エントロピー](../BHI20/index.md#prop-bhi20-entropy)を前提とします。一方CGHSでは、曲率、dilatonの勾配、ポテンシャルが連動します。ここでdilaton $\phi$ とは二次元の計量 $g_{\mu\nu}$ に加わる実スカラー場で、$e^{-2\phi}$ が幾何学的な大きさと重力エントロピーの寄与を担います。

<a id="def-bhi34-cghs-geometry"></a>

<!-- formal-statement-start -->
> **定義（CGHSの古典二次元幾何）**
>
> 二次元Lorentz計量 $g$、実スカラー場 $\phi$、$N\ge1$ 個の実質量零スカラー場 $f_i$、逆長さ $\lambda>0$ をとる。境界項を別途指定することとして、次のbulk作用で定めた古典理論をCGHS模型と呼ぶ。
>
> $$
> I_{\rm CGHS}=\frac{1}{2\pi}\int_{\mathcal M}d^2x\sqrt{-g}\left[
> e^{-2\phi}\bigl(R+4g^{\mu\nu}\partial_\mu\phi\partial_\nu\phi+4\lambda^2\bigr)
> -\frac12\sum_{i=1}^N g^{\mu\nu}\partial_\mu f_i\partial_\nu f_i
> \right].
> $$
>
> $R$ は二次元スカラー曲率である。以下の真空古典解では $f_i=0$ とし、光円錐座標 $(x^+,x^-)$ により $ds^2=-e^{2\rho}dx^+dx^-$ と書く。
<!-- formal-statement-end -->

この作用は、曲率だけを固定するJT作用と異なり、$4(\nabla\phi)^2$ と $4\lambda^2e^{-2\phi}$ を含みます。$x^\pm$ は長さの次元を持ち、$\lambda^2x^+x^-$ は無次元、以下の $A>0$ も無次元とします。

<!-- definition-example-start: def-bhi34-cghs-geometry -->
**定義の確認：古典静的解**。古典真空解の一つを
$$
F(x^+,x^-):=A-\lambda^2x^+x^-,\qquad
e^{-2\phi}=e^{-2\rho}=F,\qquad F>0
$$
と置きます。$F>0$ の領域では $\rho=-\tfrac12\log F$ と $\phi=-\tfrac12\log F$ が実数で、計量は非退化です。例えば $x^-=0$ で $F=A>0$ となり、この適切な外部パッチのヌル地平線上では $e^{-2\phi}=A$ が一定です。特異な $F=0$ と混同しません。下の命題で曲率が一定ではないことも確認します。
<!-- definition-example-end -->

<a id="prop-bhi34-cghs-curvature"></a>

<!-- formal-statement-start -->
> **命題（CGHS静的解の非一定曲率）**
>
> 上の $F=A-\lambda^2x^+x^->0$ において、計量の符号を $ds^2=-e^{2\rho}dx^+dx^-$、曲率の規約を $R=8e^{-2\rho}\partial_+\partial_-\rho$ とすると、
> $$
> R=\frac{4\lambda^2A}{F}.
> $$
> 特に $A>0$ のとき $R$ は一般には定数でなく、$F\to\infty$ の領域では $R\to0$ となる。
<!-- formal-statement-end -->

**証明の見取り図**：共形因子を二回微分し、その後で $e^{-2\rho}=F$ を掛けます。

<!-- proof-start -->
### 証明

$F_+=-\lambda^2x^-$、$F_-=-\lambda^2x^+$、$F_{+-}=-\lambda^2$ なので
$$
\partial_+\rho=-\frac{F_+}{2F}=\frac{\lambda^2x^-}{2F}.
$$
したがって商の微分を実行すると
$$
\begin{aligned}
\partial_+\partial_-\rho
&=\frac{\lambda^2}{2F}-\frac{\lambda^2x^-F_-}{2F^2}\\
&=\frac{\lambda^2}{2F}+\frac{\lambda^4x^+x^-}{2F^2}
=\frac{\lambda^2(F+\lambda^2x^+x^-)}{2F^2}\\
&=\frac{\lambda^2A}{2F^2}.
\end{aligned}
$$
これを規約式へ代入して $R=8F\cdot\lambda^2A/(2F^2)=4\lambda^2A/F$。$F$ が座標で変わるため一定曲率とは限りません。$\square$
<!-- proof-end -->

**RSTへ進む理由**：古典CGHSに $N$ 個の共形物質場の量子効果を加えると、共形異常による有効作用（Polyakov項）が現れます。RSTはそれに特定の**局所的なdilatonと曲率の対項**を加えて方程式を可解にした半古典模型です。対項の係数・$\phi$ の再定義・量子状態を固定せずに「CGHSとRSTは同じ解」とは言えません。

<a id="def-bhi34-rst-setting"></a>

<!-- formal-statement-start -->
> **定義（RSTとの比較に用いる条件台帳）**
>
> 比較の対象を、(i) $N$ 個の共形物質場をもつCGHS型dilaton重力にPolyakov有効作用とRSTの局所対項を加えた半古典方程式、(ii) 崩壊で形成されるブラックホール、(iii) 漸近的に平坦な放射採取領域、(iv) 入射エネルギー流を零とする蒸発期の境界条件、(v) 同じ量子状態・同じcutoff規約のもとで定義した放射領域 $R(u)$、の組として定める。RSTの終期に課す境界継続条件は別の追加データとする。
<!-- formal-statement-end -->

<!-- definition-example-start: def-bhi34-rst-setting -->
**定義の確認**：一定の入射流束 $F_{\rm in}=0$、出射流束 $F_{\rm out}>0$ の時間区間なら外部への正味流出は $F_{\rm net}=F_{\rm out}>0$ です。入射を出射と同じ $F_{\rm in}=F_{\rm out}$ に替えると $F_{\rm net}=0$ となり、[入射流を零とした蒸発期の設定](#def-bhi34-rst-setting)を満たしません。同じRST作用でも境界条件が異なる具体例です。
<!-- definition-example-end -->

RSTの実際のislandを論じるには、修正されたdilatonの関数、崩壊波の位置、非重力領域での放射端点、共形写像、レプリカの解析接続と終期境界をすべて指定します。この計算を行った研究として、[Gautason–Schneiderbauer–Sybesma–Thorlacius（2020）](https://doi.org/10.1007/JHEP05(2020)091) と [Hartman–Shaghoulian–Strominger（2020）](https://doi.org/10.1007/JHEP07(2020)022) があります。この節のCGHS曲率計算自体は、RSTの量子補正込みの場の方程式を解いたことを意味しません。

## 3. 一方向の熱放射からPage曲線の主項を導く

JTの時間依存境界でも、[BHI27の準静的なエントロピー収支](../BHI27/index.md#prop-bhi27-entropy-budget)では粗視化放射の増加率とブラックホール熱力学エントロピーの減少率に係数差がありました。CGHS/RST側では漸近的な外部へ**片方向**に伝播する二次元CFTの出射流を調べます。

中心電荷 $c>0$ の左右対称な非相互作用の熱的CFTで、温度 $T$ における長い一次元空間のエネルギー密度と圧力は $e=p=\pi cT^2/6$、エントロピー密度は $s=(e+p)/T=\pi cT/3$ です。左右方向が等しく寄与する熱平衡状態から出射側だけを取り出すと、流束はそれぞれ半分です。ここでの $J_S$ は**熱的放射の粗視化エントロピー流**で、放射全体の精細エントロピーそのものではありません。

<a id="prop-bhi34-flux-ratio"></a>

<!-- formal-statement-start -->
> **命題（二次元CFTの出射流と二倍則）**
>
> $c,T>0$、完全透過・反射なし・入射真空を仮定し、出射側が各瞬間に熱的な二次元CFTとみなせるとする。その出射エネルギー流束 $F_E$ と粗視化エントロピー流束 $J_S$ は
> $$
> F_E=\frac{\pi c}{12}T^2,\qquad
> J_S=\frac{\pi c}{6}T=\frac{2F_E}{T}.
> $$
> ブラックホール側の物理的エネルギー $E_{\rm BH}$ と熱力学エントロピー $S_{\rm BH}$ が同じ温度で第一法則 $dE_{\rm BH}=T\,dS_{\rm BH}$ を満たし、$\dot E_{\rm BH}=-F_E$ なら
> $$
> \dot S_{\rm BH}=-\frac{\pi c}{12}T,\qquad
> J_S=-2\dot S_{\rm BH}.
> $$
<!-- formal-statement-end -->

### 証明の見取り図

全CFTの熱力学密度を左右二方向に分けます。片側のエネルギー流束をブラックホールの第一法則へ代入し、二つのエントロピーの**異なる定義**に注意して比較します。

<!-- proof-start -->
### 証明

左右方向が対称な熱的CFTで、右向きのエネルギー輸送とエントロピー輸送はそれぞれ全密度の半分です。従って
$$
F_E=\frac e2=\frac{\pi cT^2}{12},\qquad
J_S=\frac s2=\frac{\pi cT}{6}.
$$
最初の式を $T>0$ で割ると $2F_E/T=\pi cT/6=J_S$。第一法則を時間微分して
$$
T\dot S_{\rm BH}=\dot E_{\rm BH}=-F_E
\quad\Longrightarrow\quad
\dot S_{\rm BH}=-\frac{F_E}{T}=-\frac{\pi cT}{12}.
$$
よって $J_S=-2\dot S_{\rm BH}$。$\square$
<!-- proof-end -->

この二倍則は、量子状態の精細エントロピーが二倍になると証明したものではありません。実際の精細エントロピーを得るには[レプリカとislandの許容条件](../BHI30/index.md#def-bhi30-admissible-continuation)が必要です。

<a id="def-bhi34-leading-branches"></a>

<!-- formal-statement-start -->
> **定義（蒸発の二枝を比較する先頭近似）**
>
> $S_0,a>0$、$0\le u\le u_{\rm end}$ とし、温度と中心電荷 $c$ がほぼ一定の蒸発期を考える。$K$ は同じcutoffで決まる有限の差と端点のずれをまとめた定数とする。次の時間尺度と二枝を仮定する。
>
> $$
> a:=\frac{\pi cT}{12},\quad u_{\rm end}:=\frac{S_0}{a},\quad
> S_\varnothing(u):=2au,\quad S_I(u):=S_0-au+K.
> $$
>
> $S_I$ は端点を極値化したisland枝の主項である。二枝が共に存在し比較可能なときに限り、
> $$
> S_{\rm lead}(u):=\min\{S_\varnothing(u),S_I(u)\}
> $$
> をPage型の**主項近似**と呼ぶ。
<!-- formal-statement-end -->

<!-- definition-example-start: def-bhi34-leading-branches -->
**定義の確認**：$S_0=120$、$a=2$、$K=0$ なら $u_{\rm end}=60$、二枝は $4u$ と $120-2u$ です。$u=10$ では $(40,100)$ で空枝が小さく、$u=40$ では $(160,40)$ でisland枝が小さいです。交点は $u=20$ で両者とも80となります。$K=0$ は主項の計算例であり、RSTの全ての有限補正が零という意味ではありません。
<!-- definition-example-end -->

<a id="prop-bhi34-page-crossing"></a>

<!-- formal-statement-start -->
> **命題（一定流束のPage時刻と境界条件）**
>
> 上の二枝が共に存在し、$0<S_0+K<3S_0$ とする。この近似の交点は
> $$
> u_{\rm Page}=\frac{S_0+K}{3a},\qquad
> \frac{u_{\rm Page}}{u_{\rm end}}=\frac{1+K/S_0}{3}.
> $$
> 特に $|K|/S_0\to0$ の主項極限で寿命比は $1/3$ となる。$K$ が大きすぎると交点は蒸発区間内にない。
<!-- formal-statement-end -->

<!-- proof-start -->
### 証明

両枝を等置すると $2au=S_0-au+K$、従って $3au=S_0+K$ です。$a>0$ で割り、$u_{\rm end}=S_0/a$ でさらに割ると示した比を得ます。区間内の条件 $0<u_{\rm Page}<u_{\rm end}$ は $0<S_0+K<3S_0$ と同値です。交点の前後で二枝の差は
$$
S_\varnothing-S_I=3a(u-u_{\rm Page})
$$
なので、前では空枝、後ではisland枝が小さくなります。$\square$
<!-- proof-end -->

この $1/3$ はRSTの蒸発解に関する主要な解析結果と整合します（[Gautasonら](https://doi.org/10.1007/JHEP05(2020)091)）。ここで再導出したのは**定温・断熱・二枝の先頭近似**であり、RSTの場の方程式から端点と量子補正を完全に再導出したわけではありません。JTの冷却模型や別の境界条件にも寿命比 $1/3$ を強制してはいけません。

## 4. RSTの実際のQES端点を大質量で求める

二枝の主項だけでなく、今度はRSTの場の解を使って得られた**実際の端点停留方程式**を確認します。[Hartman–Shaghoulian–Strominger (2020), §3.2, 式(3.8)–(3.9)](https://doi.org/10.1007/JHEP07(2020)022) では、崩壊衝撃波の後のRST時空について、質量を無次元化し、漸近放射を採取する点 $O$ とQES端点 $Q$ をKruskal光円錐座標で指定します。この論文の規格化（逆長さスケールを1とする）を使い、$M\gg1$ は正の無次元初期質量、$u$ は出射側の遅延時刻、$x_Q^\pm$ は端点 $Q$ の光円錐座標とします。ここからの $M$ は第2節の古典解の定数 $A$ と別です。

同論文の物質状態（崩壊衝撃波を伴う入射真空）、反射境界、QESのisland側における許容領域を固定し、大きい $M$ で、採取時刻 $u$ が蒸発過程の内部にあり $e^{-u}/M\ll1$ とします。極値化に必要な物質エントロピーの式には紫外cutoffが含まれますが、$Q$ に依存しない項はこの停留条件では微分に寄与しません。

<a id="prop-bhi34-rst-large-m-qes"></a>

<!-- formal-statement-start -->
> **命題（RST蒸発QESの大質量端点）**
>
> 上のRST状態、境界、座標と近似条件の下で、[文献の二変数QES停留方程式](https://doi.org/10.1007/JHEP07(2020)022) を
>
> $$
> x_Q^+(x_Q^-+M)=\frac14,\qquad
> x_O^-=x_Q^-\exp\left(\frac{4(x_Q^-+M)}{M}\right)
> $$
>
> とする。採取点の漸近座標を $x_O^-=-M-e^{-u}$ と固定する。$0<x_Q^-+M\ll M$ の解は
>
> $$
> x_Q^-+M=\frac{e^{-u}}3+O\left(\frac{e^{-2u}}M\right),\qquad
> x_Q^+=\frac34e^u\left[1+O\left(\frac{e^{-u}}M\right)\right]
> $$
>
> を満たす。
<!-- formal-statement-end -->

### 証明の見取り図

未知の端点を $x_Q^-=-M+\delta$ と置き、二つ目の停留条件を $\delta/M$ で展開します。得た $\delta$ を一つ目の条件に戻して $x_Q^+$ を決めます。

<!-- proof-start -->
### 証明

$\delta:=x_Q^-+M$ とすると、二つ目の停留条件と $x_O^-=-M-e^{-u}$ は
$
-M-e^{-u}=(-M+\delta)e^{4\delta/M}.
$
$0<\delta\ll M$ で指数関数のTaylor展開を適用し、
$
\begin{aligned}
(-M+\delta)e^{4\delta/M}
&=(-M+\delta)\left(1+\frac{4\delta}{M}
+O\left(\frac{\delta^2}{M^2}\right)\right)\\
&=-M+\delta-4\delta
+O\left(\frac{\delta^2}{M}\right)\\
&=-M-3\delta+O\left(\frac{\delta^2}{M}\right).
\end{aligned}
$
両辺から $-M$ を消すと
$
e^{-u}=3\delta+O\left(\frac{\delta^2}{M}\right).
$
$e^{-u}/M\ll1$ により小さい枝で $\delta=O(e^{-u})$ と自己無撞着に評価できるので、代入し直して
$
\delta=\frac{e^{-u}}3+O\left(\frac{e^{-2u}}M\right)
$
を得ます。第一の停留条件から $x_Q^+=1/(4\delta)$。$\delta=(e^{-u}/3)[1+O(e^{-u}/M)]$ と括れば、逆数の展開で
$
x_Q^+=\frac{3e^u}{4}
\left[1+O\left(\frac{e^{-u}}M\right)\right].
$
最後に $\delta>0$ なので第一式の $x_Q^+>0$ も満たします。$\square$
<!-- proof-end -->

**数値検算**：$M=100$、$u=\log10$ なら $e^{-u}=1/10$、先頭解 $\delta\approx1/30$、$x_Q^+\approx15/2$ です。第一の停留方程式の左辺は $(15/2)(1/30)=1/4$。第二の右辺は
$
\left(-100+\frac1{30}\right)e^{4/(3000)}
=-100-\frac1{10}+O(10^{-5})
$
で、観測点 $x_O^-=-100.1$ と先頭精度で一致します。端点の積の符号が正になる点は、見かけの地平線の方程式とは区別してください。

この計算は、文献で導出された**RST固有の端点方程式を解く手順**を示したものです。元の重力・Polyakov作用から場の解と二変数一般化エントロピーをすべて再導出したものではありません。文献では、このQESを一般化エントロピーに戻してから、$M\gg1$、蒸発終期 $u_{\rm end}\simeq4M$、$u$ が $M$ のオーダーの区間において、$u$ に依存しないcutoff項を除く主項として

$
S_{\rm island\ rule}(u)=\frac{N}{24}\min\{2u,\,4M-u\}+O(N\log M)
$

を得ます（同論文 §3.3）。$2u=4M-u$ から $u_{\rm Page}\simeq4M/3$ です。無次元量の比例係数は第3節の $2a$ と $a$ に相当します。ここでの $O(N\log M)$ は時間に依存する精密な誤差上界を本講で証明したものではなく、原論文が大質量の主項計算で省く項の次数を表します。端点が特異境界にぶつかる蒸発終期の近傍では、同じ近似を一様に延長できません。

このRST固有の結果は、単なる二枝の直線の想定と違って、崩壊状態と重力側端点の停留条件を持っています。一方で、**量子補正込みのRST理論そのものの観測可能な放射がこのisland則で測定できること**は、追加の同定問題として残ります。これが[JHEP論文の§3.1](https://doi.org/10.1007/JHEP07(2020)022)で強調された射程です。

## 5. island端点を二変数で求めるための補助模型

Page型の二つの直線を比較するには、island枝の値が**先に極値化されている**必要があります。[BHI25の端点停留条件](../BHI25/index.md#prop-bhi25-two-endpoint-equations)では空間・時間の両成分を検査しました。RSTにおいても、一般化エントロピーは重力側端点の幾何学的寄与と、採取した放射 $R(u)$ とislandの和集合の物質エントロピーとから作ります。

以下は、実際のRSTの非局所な相関関数を使う前に、**存在域・端点の移動・定数補正を手で検算するための局所補助模型**です。関数形をRST作用から導いたと主張するものではありません。

<a id="def-bhi34-qes-proxy"></a>

<!-- formal-statement-start -->
> **定義（端点の二変数局所補助模型）**
>
> 固定した採取時刻 $u$ に対し、空間座標 $x\in(0,L)$、端点時間 $v\in\mathbb R$ とし、$\alpha,\eta,\epsilon,\zeta,L>0$、$\tau\in\mathbb R$、$C\in\mathbb R$ を固定する。$\alpha$ は長さの逆数、$\eta$ は無次元、$\epsilon,L$ は長さ、$\zeta$ は時間の逆二乗を持つ。$S_{\rm BH}(u)$ を所与として
> $$
> S_{\rm gen}^{\rm toy}(x,v;u)
> :=S_{\rm BH}(u)+C+\alpha x
> -\eta\log\left(1+\frac{x}{\epsilon}\right)
> +\frac{\zeta}{2}(v-u+\tau)^2
> $$
> と定める。補助模型の候補端点とは、内部領域で次の停留条件を満たす組 $(x_*,v_*)$ を指す。
>
> $$
> \partial_x S_{\rm gen}^{\rm toy}(x_*,v_*;u)
> =\partial_v S_{\rm gen}^{\rm toy}(x_*,v_*;u)=0.
> $$
<!-- formal-statement-end -->

この模型では $\alpha x$ が端点の重力寄与の局所展開、対数が正則化された物質寄与、時間の二次式が停留点の時間位置を表す設定です。$\zeta>0$ による局所極小は計算上の選択であり、Lorentz幾何の全QESが二方向の極小となるという仮定はしていません。

<!-- definition-example-start: def-bhi34-qes-proxy -->
**定義の確認**：$\alpha=2$、$\eta=6$、$\epsilon=1$、$L=5$、$\zeta=2$、$\tau=1$（単位を固定）なら $(x_*,v_*)=(2,u-1)$ は $0<2<5$ を満たします。実際、
$$
\partial_x S_{\rm gen}^{\rm toy}=2-\frac6{1+x},\qquad
\partial_v S_{\rm gen}^{\rm toy}=2(v-u+1)
$$
であり $(2,u-1)$ で両方零です。以下で一般の存在条件と極値を証明します。
<!-- definition-example-end -->

<a id="prop-bhi34-proxy-extremum"></a>

<!-- formal-statement-start -->
> **命題（補助模型の端点と極値）**
>
> 上の補助模型において内部の停留点が存在する必要十分条件は
> $$
> \alpha\epsilon<\eta<\alpha(L+\epsilon)
> $$
> である。この場合、停留点は一意で
> $$
> x_*=\frac{\eta}{\alpha}-\epsilon,\qquad v_*=u-\tau,
> $$
> その極値は
> $$
> S_I^{\rm toy}(u)=S_{\rm BH}(u)+K_{\rm toy},\quad
> K_{\rm toy}=C+\eta-\alpha\epsilon
> -\eta\log\frac{\eta}{\alpha\epsilon}
> $$
> となる。
<!-- formal-statement-end -->

### 証明の見取り図

二つの偏微分を零にして端点を解き、領域の不等式を代入します。停留点の存在と、それを物理的なレプリカ鞍点として採用できることは別の検査です。

<!-- proof-start -->
### 証明

$x>0$ と $\epsilon>0$ より $x+\epsilon>0$ です。対数の微分を使うと
$$
\partial_x S_{\rm gen}^{\rm toy}
=\alpha-\frac{\eta}{x+\epsilon},\qquad
\partial_v S_{\rm gen}^{\rm toy}
=\zeta(v-u+\tau).
$$
$\alpha,\zeta>0$ のため停留条件は $x+\epsilon=\eta/\alpha$、$v-u+\tau=0$ と同値です。$0<x_*<L$ は
$$
0<\frac{\eta}{\alpha}-\epsilon<L
\quad\Longleftrightarrow\quad
\alpha\epsilon<\eta<\alpha(L+\epsilon)
$$
です。Hessianの対角成分は
$$
\partial_x^2S_{\rm gen}^{\rm toy}=\frac{\eta}{(x+\epsilon)^2}>0,\qquad
\partial_v^2S_{\rm gen}^{\rm toy}=\zeta>0,
$$
混合成分は零なので、補助模型では唯一の局所極小です。停留値の計算では
$$
\alpha x_*=\eta-\alpha\epsilon,\quad
1+\frac{x_*}{\epsilon}=\frac{\eta}{\alpha\epsilon},\quad
v_*-u+\tau=0
$$
を元の関数へ代入し、表示式を得ます。$\square$
<!-- proof-end -->

存在条件が破れると**内部の候補が存在しません**。例えば $\eta\le\alpha\epsilon$ のとき $x_*\le0$ です。この場合に $x=0$ の値を機械的に「islandの極値」と呼ぶのは誤りです。実際のRSTでは境界条件と許される端点の領域を別途調べます。

## 6. 境界と温度を変えると何が変わるか

前節の模型では $K_{\rm toy}$ が $u$ に依存しない場合に限り、時間依存性は $S_{\rm BH}(u)$ に集約されます。実際のRSTでは端点が動き、正則化・初期状態・境界継続が定数項だけで済むとは限りません。

入射側にも熱流を与えると、完全透過・独立な二つの熱的CFT流という条件のもとで、正味エネルギー流は
$$
F_{\rm net}
=\frac{\pi c}{12}\bigl(T_{\rm out}^2-T_{\rm in}^2\bigr).
$$
$T_{\rm in}=T_{\rm out}$ ならエネルギーの正味流出は零で、定常な熱浴模型です。この場合、出射の粗視化エントロピー流だけを積分して「蒸発で失われた精細エントロピー」と扱うことはできません。入射・出射の量子相関を含む放射領域と状態を改めて固定します。

<a id="prop-bhi34-variable-temperature"></a>

<!-- formal-statement-start -->
> **命題（時間依存温度での交点の条件）**
>
> $u\in[0,U]$、$T(u)>0$ が連続とし、上の二倍則が準静的に各時刻で成立する。$a(u):=\pi cT(u)/12>0$、
> $A(u):=\int_0^u a(s)\,ds$ と置く。$K$ が時刻に依存せず、極値化済みの二枝が
> $$
> S_\varnothing(u)=2A(u),\qquad S_I(u)=S_0-A(u)+K
> $$
> で近似できるなら、交点は
> $$
> A(u_{\rm Page})=\frac{S_0+K}{3}
> $$
> を満たす。$A$ は狭義単調なので、その値が $A([0,U])$ の内部にあれば交点は一意である。時間比 $u_{\rm Page}/u_{\rm end}$ が $1/3$ とは一般には限らない。
<!-- formal-statement-end -->

<!-- proof-start -->
### 証明

$T>0$ から $A'(u)=a(u)>0$ で、$A$ は連続かつ狭義単調です。二枝の等式は
$$
2A(u)=S_0-A(u)+K
\quad\Longleftrightarrow\quad
3A(u)=S_0+K
$$
です。単調性より存在する場合は一意です。蒸発終期を $A(u_{\rm end})=S_0$ と置けても、非線形の $A$ について
$A^{-1}(S_0/3)=A^{-1}(S_0)/3$ は一般に成立しません。$\square$
<!-- proof-end -->

**比較表**：模型名だけでなく、何を計算できたかで比較します。

| 比較点 | JT＋非重力浴 | CGHS/RST＋漸近放射 |
|---|---|---|
| 重力作用の中心 | 負の定曲率とdilaton、Schwarzian境界 | dilatonの勾配・ポテンシャル、RSTの量子補正 |
| 背景と境界 | AdS$_2$に近い領域と浴との接合 | 漸近平坦な二次元崩壊・放射採取領域 |
| 蒸発 | 浴とのエネルギー収支で温度が変わる | RSTの可解な半古典蒸発解 |
| island端点 | dilaton＋CFTエントロピーの停留点 | 修正dilatonとCFT相関、境界条件を含む停留点 |
| Page形状 | 状態・接合・鞍点に依存 | 指定した蒸発設定ではPage転移の解析例がある |
| 終期の課題 | 低エネルギー・接合近似の制御 | 特異境界への到達と継続条件の指定 |

JTの実際の端点は[BHI25の計算](../BHI25/index.md#prop-bhi25-two-endpoint-equations)に、二枝の選択は[BHI26のPage交差](../BHI26/index.md#prop-bhi26-page-crossing)に戻って確認できます。RSTの文献値を比較する場合も、同じ放射領域・終期の定義・cutoff・初期状態を揃えてください。数式の枝が存在するだけでは、[BHI33の操作的な復号](../BHI33/index.md#def-bhi33-operational-access)が与えられたわけではありません。

## 7. 演習と詳細解答

各問で別記しない限り $c,T,\alpha,\eta,\epsilon,L,\zeta>0$、対数は自然対数、$u\ge0$ とします。式は該当節の定義された近似の内部で扱います。

### Level A：幾何・流束・端点の計算

<a id="ex-bhi34-a01"></a>

#### BHI34-A01 静的CGHSの共形因子

- Level: A
- 問題: $F=A-\lambda^2x^+x^->0$、$\rho=-\frac12\log F$ とする。$\partial_+\rho$、$\partial_+\partial_-\rho$、$R$ を計算し、$F\to\infty$ の極限を示せ。

<!-- solution-start -->
**詳細解答**：$F_+=-\lambda^2x^-$ なので $\partial_+\rho=\lambda^2x^-/(2F)$。さらに
$$
\partial_+\partial_-\rho
=\frac{\lambda^2}{2F}+\frac{\lambda^4x^+x^-}{2F^2}
=\frac{\lambda^2A}{2F^2}.
$$
規約 $R=8F\partial_+\partial_-\rho$ を使って $R=4\lambda^2A/F$。$A,\lambda$ を固定すれば $F\to\infty$ で $R\to0$ です。
<!-- solution-end -->

<a id="ex-bhi34-a02"></a>

#### BHI34-A02 エネルギー流とエントロピー流の係数

- Level: A
- 問題: $c=12$、$T=1/(2\pi)$ の出射側CFTについて $F_E$、$J_S$、$\dot S_{\rm BH}$ を求めよ。入射真空・第一法則を仮定する。

<!-- solution-start -->
**詳細解答**：
$$
F_E=\frac{\pi(12)}{12}\frac1{4\pi^2}=\frac1{4\pi},\qquad
J_S=\frac{\pi(12)}6\frac1{2\pi}=1.
$$
第一法則と流出保存から $\dot S_{\rm BH}=-F_E/T=-(1/(4\pi))/(1/(2\pi))=-1/2$。したがって $J_S=-2\dot S_{\rm BH}$ です。
<!-- solution-end -->

<a id="ex-bhi34-a03"></a>

#### BHI34-A03 一定温度での二枝

- Level: A
- 問題: $S_0=120$、$a=2$、$K=0$ の場合の $u_{\rm end}$、$u_{\rm Page}$、交点のエントロピーと両側の傾きを求めよ。

<!-- solution-start -->
**詳細解答**：$u_{\rm end}=S_0/a=60$。二枝は $S_\varnothing=4u$、$S_I=120-2u$ です。$4u=120-2u$ から $u_{\rm Page}=20$、その値は80。包絡線は交点前で傾き4、後で傾き $-2$ です。
<!-- solution-end -->

<a id="ex-bhi34-a04"></a>

#### BHI34-A04 二変数の停留点を求める

- Level: A
- 問題: $\alpha=2,\eta=6,\epsilon=1,L=5,\zeta=2,\tau=1$ とする。停留点、領域の確認、$K_{\rm toy}-C$ を計算せよ。

<!-- solution-start -->
**詳細解答**：$\partial_xS=2-6/(x+1)=0$ から $x_*=2$、$\partial_vS=2(v-u+1)=0$ から $v_*=u-1$。$0<2<5$ です。$K_{\rm toy}-C=\alpha x_*-\eta\log(1+x_*/\epsilon)=4-6\log3$。一般式に代入しても $6-2-6\log(6/2)=4-6\log3$ と一致します。
<!-- solution-end -->

<a id="ex-bhi34-a05"></a>

#### BHI34-A05 入射熱浴の有無

- Level: A
- 問題: $c=12$、$T_{\rm out}=2$、$T_{\rm in}=1$ の正味エネルギー流を求め、$T_{\rm in}=2$ に変更した場合と比較せよ。

<!-- solution-start -->
**詳細解答**：
$$
F_{\rm net}=\frac{\pi(12)}{12}(2^2-1^2)=3\pi.
$$
入射を $T_{\rm in}=2$ に変更すれば同じ式で $F_{\rm net}=\pi(4-4)=0$。出射流単独はなお $4\pi$ ですが、正味の蒸発はありません。
<!-- solution-end -->

### Level B：条件と近似の有効域を判定する

<a id="ex-bhi34-b01"></a>

#### BHI34-B01 補助模型で端点が存在しない例

- Level: B
- 問題: $\alpha=3$、$\epsilon=1$、$\eta=2$、$L=5$ とする。$\partial_xS_{\rm gen}^{\rm toy}$ の符号を内部領域で判定し、物理的な内部QESと呼べない理由を述べよ。

<!-- solution-start -->
**詳細解答**：任意の $x\in(0,5)$ で
$$
\partial_xS_{\rm gen}^{\rm toy}=3-\frac2{x+1}>3-2=1>0.
$$
従って空間方向に停留しません。形式解は $x_*=2/3-1=-1/3<0$ で許容域外です。端点 $x=0$ は開領域に含まれず、境界の最小値を内部の極値と呼んではいけません。実際のRSTでも端点の許容領域を確認する必要があります。
<!-- solution-end -->

<a id="ex-bhi34-b02"></a>

#### BHI34-B02 有限補正と交点の存在

- Level: B
- 問題: $S_\varnothing=2au$、$S_I=S_0-au+K$、$a,S_0>0$ とする。$K=-S_0/2$ と $K=3S_0$ の二例で、交点が開区間 $(0,S_0/a)$ にあるか調べよ。

<!-- solution-start -->
**詳細解答**：一般交点は $u_{\rm Page}=(S_0+K)/(3a)$。$K=-S_0/2$ なら $u_{\rm Page}=S_0/(6a)$ で $0<u_{\rm Page}<S_0/a$。$K=3S_0$ なら $u_{\rm Page}=4S_0/(3a)>S_0/a$ となり蒸発区間外です。従って二枝の形式的な交差をいつでも物理的なPage転移と呼ぶことはできません。
<!-- solution-end -->

<a id="ex-bhi34-b03"></a>

#### BHI34-B03 変動温度の積分台帳

- Level: B
- 問題: $a(u)=a_0e^{-ku}$ ($a_0,k>0$) とする。$A(u)$ を計算し、$K=0$ におけるPage交点の存在条件とその時刻を示せ。

<!-- solution-start -->
**詳細解答**：積分して
$$
A(u)=\int_0^u a_0e^{-ks}ds=\frac{a_0}{k}(1-e^{-ku}).
$$
$A$ は0から $a_0/k$ へ狭義単調に近づきます。$K=0$ の交点は $A(u)=S_0/3$ なので、有限の正の解が存在する必要十分条件は $0<S_0/3<a_0/k$。このとき
$$
e^{-ku_{\rm Page}}=1-\frac{kS_0}{3a_0}>0,\quad
u_{\rm Page}=-\frac1k\log\left(1-\frac{kS_0}{3a_0}\right).
$$
$a_0/k=S_0/3$ の等号では交点は有限時刻に達しません。
<!-- solution-end -->

<a id="ex-bhi34-b04"></a>

#### BHI34-B04 JTとRSTの比較で許されない推論

- Level: B
- 問題: 「RSTで寿命比が $1/3$ だから、冷却するJTでの寿命比も必ず $1/3$」「補助模型で $(x_*,v_*)$ が求まったからRSTにislandが存在する」「Page曲線が得られれば復号回路も与えられる」の三つについて、それぞれ不足する仮定・計算を述べよ。

<!-- solution-start -->
**詳細解答**：(1) $1/3$ は主項で $a$ が一定、二倍の放射流、$K/S_0$ が無視でき、同じ終期規約で測れるときに出ます。JTの温度変動では $A(u)$ の逆関数を使う必要があります。(2) 第5節の対数と二次式はRSTの修正dilaton・CFT四点関数から導出していないので、RST自身の場の解と量子状態、端点の許容域、時間方向の極値、レプリカ鞍点の確認が足りません。(3) [BHI33の保持チャネルと回復](../BHI33/index.md#thm-bhi33-keyed-petz)には符号空間、可視放射のチャネル、参照系付き誤差と回復回路が必要で、エントロピーの一つの値からは決まりません。
<!-- solution-end -->

<a id="ex-bhi34-b05"></a>

#### BHI34-B05 RSTの実際の端点の誤差と単調性

- Level: B
- 問題: 第4節のRST端点方程式に対し、$f(\delta):=(-M+\delta)e^{4\delta/M}$ とする。(1) $0<\delta<M/4$ で $f$ が単調減少すること、(2) $\delta/M\ll1$ の二次項までの展開を導き、$e^{-u}/M\ll1$ での先頭解 $\delta\simeq e^{-u}/3$ が許容域にあることを説明せよ。

<!-- solution-start -->
**詳細解答**：(1) 積と指数関数の微分から
$
f'(\delta)=e^{4\delta/M}\left(1+\frac4M(-M+\delta)\right)
=e^{4\delta/M}\left(-3+\frac{4\delta}{M}\right).
$
$0<\delta<M/4$ では括弧は $-3+1=-2$ より小さいので $f'<0$ です。従ってこの区間に根があれば一意です。

(2) $z=\delta/M$ と置くと $e^{4z}=1+4z+8z^2+O(z^3)$ なので
$
\begin{aligned}
f(\delta)&=(-M+\delta)\left(1+\frac{4\delta}{M}+\frac{8\delta^2}{M^2}
+O\left(\frac{\delta^3}{M^3}\right)\right)\\
&=-M-3\delta-\frac{4\delta^2}{M}
+O\left(\frac{\delta^3}{M^2}\right).
\end{aligned}
$
従って $f(\delta)=-M-e^{-u}$ の先頭方程式は $3\delta=e^{-u}$ です。$e^{-u}/M\ll1$ なら $\delta/M\simeq e^{-u}/(3M)\ll1$ であり $0<\delta<M/4$ にも入ります。誤差は $O(e^{-2u}/M)$ と小さく、停留方程式を満たす局所的な根を近似しています。
<!-- solution-end -->

### Level C：変動する流束のPage時刻を再構成する

<a id="ex-bhi34-c01"></a>

#### BHI34-C01 寿命比が三分の一でなくなる具体模型

- Level: C
- 問題: $S_0>0,k>0$ とし、$a(u)=a_0e^{-ku}$、$a_0/k=3S_0/2$、$K=0$ とする。(i) $A(u)$ と二枝、(ii) $S_{\rm BH}=0$ になる模型上の終期 $u_{\rm end}$、(iii) Page交点 $u_{\rm Page}$、(iv) 両者の比を求め、一定温度の場合の $1/3$ と異なる理由を示せ。終期までの近似が物理的に有効かどうかは別の問いである。

<!-- solution-start -->
**詳細解答**：

**(i)** $a_0/k=3S_0/2$ より
$$
A(u)=\frac{3S_0}{2}(1-e^{-ku}),\quad
S_\varnothing(u)=3S_0(1-e^{-ku}),\quad
S_I(u)=S_0-\frac{3S_0}{2}(1-e^{-ku}).
$$

**(ii)** 終期の台帳条件は $S_I(u_{\rm end})=0$、すなわち $A(u_{\rm end})=S_0$ です。代入して
$$
\frac32(1-e^{-ku_{\rm end}})=1
\Longrightarrow e^{-ku_{\rm end}}=\frac13
\Longrightarrow u_{\rm end}=\frac{\log3}{k}.
$$

**(iii)** Page交点では $3A(u_{\rm Page})=S_0$ だから
$$
\frac{9}{2}(1-e^{-ku_{\rm Page}})=1
\Longrightarrow e^{-ku_{\rm Page}}=\frac79
\Longrightarrow u_{\rm Page}=\frac{\log(9/7)}{k}.
$$
$0<\log(9/7)<\log3$ なので両時刻は正で順序も正しいです。

**(iv)** よって
$$
\frac{u_{\rm Page}}{u_{\rm end}}
=\frac{\log(9/7)}{\log3}\ne\frac13.
$$
瞬間ごとの増加率 $S_\varnothing'=2a(u)$ と減少率 $S_I'=-a(u)$ は依然として二倍の関係です。しかし $A(u)$ は線形でないため、**積分された放射エントロピーが $S_0/3$ に達する時刻**は全蒸発時間の三分の一とは一致しません。さらに終期の近似が破れるなら、ここでの $u_{\rm end}$ は台帳上の値であって実在ブラックホールの寿命の予言ではありません。
<!-- solution-end -->

---

## 8. 参考文献と次講への接続

- C. Callan, S. Giddings, J. Harvey, A. Strominger, [*Evanescent Black Holes*](https://doi.org/10.1103/PhysRevD.45.R1005) (1992)：CGHS重力の原典。
- J. Russo, L. Susskind, L. Thorlacius, [*The Endpoint of Hawking Radiation*](https://arxiv.org/abs/hep-th/9206070) (1992)：RSTの可解性と蒸発終期の境界問題。
- F. F. Gautason, L. Schneiderbauer, W. Sybesma, L. Thorlacius, [*Page Curve for an Evaporating Black Hole*](https://doi.org/10.1007/JHEP05(2020)091) (2020)：漸近平坦な二次元蒸発解におけるislandとPage時刻。
- T. Hartman, E. Shaghoulian, A. Strominger, [*Islands in Asymptotically Flat 2D Gravity*](https://doi.org/10.1007/JHEP07(2020)022) (2020)：RSTのisland計算。
- X. Wang, R. Li, J. Wang, [*Page Curves for a Family of Exactly Solvable Evaporating Black Holes*](https://doi.org/10.1103/PhysRevD.103.126026) (2021)：模型族と異なる境界接合での比較。

JTとRSTで共通するのは、**同じ放射領域に対し一般化エントロピーの候補を求め、端点の停留を検査したうえで、許容される枝を比較する**という計算の筋道です。異なるのは時空の境界、dilatonの方程式、温度の推移、量子状態と終期条件です。BHI35ではこの違いを踏まえて、四次元の灰色体因子、角運動量モード、重力の揺らぎ、蒸発終期へ外挿する条件を調べます。
