# CELE8 太陽系の長期力学

<!-- definition-example-audit: strict -->

> **使う結果**：[二体問題の作用変数](../CELE1/index.md#prop-cele1-kepler-actions)、[円制限三体問題のLagrange点](../CELE4/index.md#thm-cele4-five-lagrange-points)、[正三角形点の線形安定条件](../CELE4/index.md#thm-cele4-triangular-stability)、[共鳴角](../CELE7/index.md#def-cele7-resonant-angle)、[共鳴島の幅](../CELE7/index.md#prop-cele7-island-area)、[KAM定理](../../../幾何系/INT/INT8/index.md#thm-int8-kam)を使用します。

## 1. 惑星の位置は予測できても、軌道要素は永久に一定なのか

二体Kepler運動では長半径と離心率が一定で、楕円は同じ向きを保ちます。しかし惑星が複数あれば、弱い重力摂動が長い時間にわたり蓄積します。短い公転周期の変化と、近日点方向がゆっくり回る変化を同じものとして扱うと、太陽系の「長期安定性」を正しく問えません。

これまでに、共鳴帯内の島と分離曲線、共鳴から離れて存続する[KAMトーラス](../../../幾何系/INT/INT8/index.md#thm-int8-kam)を学びました。本章では、実際の天体力学へ戻り、**速い角度を平均して遅い変化を取り出す操作**を自分で計算します。そのうえで、公転周期の整数比に近い運動、Trojan運動、自転と公転の同期、数値計算による長時間予測の限界を区別します。

本章の式は主として平面・非衝突・小質量摂動の局所模型です。これらの式を太陽系の全惑星に無条件で同時適用したり、有限時間の数値軌道を全時間の安定性証明と呼んだりはしません。

## 2. 摂動関数を取り出し、速い角度を平均する

質量 $M$ の中心天体の重力定数を $\mu=\mathcal G M>0$ と書き、質量を無視できる試験粒子の平面位置を $r\in\mathbb R^2$、その運動量を $p$ とします。摂動天体の質量は $m'>0$、円軌道半径は $a'>0$、位置は

$$
r'(t)=a'(\cos\lambda'(t),\sin\lambda'(t)),\qquad
\lambda'(t)=n't+\lambda'_0
$$

です。中心天体を原点に置く加速度座標系で、試験粒子の単位質量当たりHamiltonianは

$$
H(r,p,t)=\frac{|p|^2}{2}-\frac{\mu}{|r|}
-\mathcal Gm'\left(\frac1{|r-r'|}-\frac{r\cdot r'}{a'^3}\right).
$$

最後の内積項は中心天体自体が摂動天体に引かれて加速することに対応する**間接項**です。これを落とすと、双極子項が不当に残ります。異なる座標・質量比による展開を扱った[CELE5の摂動関数](../CELE5/index.md#def-cele5-disturbing-function)とは、符号と座標原点を先に区別してください。

単位質量当たりの正の摂動関数を

$$
\mathcal R(r,r')=\mathcal Gm'\left(\frac1{|r-r'|}-\frac{r\cdot r'}{a'^3}\right),
\qquad H=H_{\rm Kep}-\mathcal R
$$

とします。ここで試験軌道の長半径を $a$、離心率を $0\le e<1$ とし、最大距離 $a(1+e)<a'$ を仮定します。従って軌道全体で $|r|/a'<1$ となり、重力ポテンシャルの距離比展開が使えます。

平均は何を消すのでしょうか。試験粒子の平均近点角を $\ell$、摂動天体の平均経度を $\lambda'$ とします。平均近点角はKepler楕円上の時間一様な角度で、真近点角とは違います。

<a id="def-cele8-double-average"></a>

<!-- formal-statement-start -->
> **定義（二重平均と永年摂動）**  
> $\ell,\lambda'\in\mathbb T$ に関して $2\pi$ 周期的で積分可能な摂動関数 $\mathcal R(\ell,\lambda';L,D,g)$ の二重平均を
>
$$
\overline{\mathcal R}(L,D,g)=
\frac1{(2\pi)^2}\int_0^{2\pi}\int_0^{2\pi}
\mathcal R(\ell,\lambda';L,D,g)\,d\ell\,d\lambda'
$$
>
> と定義する。速い二角に依存しない平均Hamiltonian $H_{\rm sec}=H_{\rm Kep}-\overline{\mathcal R}$ を永年（secular）模型という。ここで $(\ell,L),(g,D)$ は平面束縛Kepler運動の作用角対であり、$L=\sqrt{\mu a}$、$D=L\sqrt{1-e^2}$、$g$ は近日点方向である。
<!-- formal-statement-end -->

<!-- definition-example-start: def-cele8-double-average -->

**定義の確認**。$\mathcal R(\ell,\lambda')=A+B\cos(\ell-\lambda')+C\cos(2\ell+\lambda')$ とする。固定した $\ell$ で $\lambda'$ を一周積分すると、整数倍角の余弦項はそれぞれ零になります。従って二重平均は $A$ です。ただし、$\dot\ell-\dot\lambda'\simeq0$ の場合は差角が遅く、**二角を独立な速い角として平均する近似の有効性が損なわれる**可能性があります。共鳴近傍は第4節で別扱いします。

<!-- definition-example-end -->

<a id="prop-cele8-quadrupole"></a>

<!-- formal-statement-start -->
> **命題（円軌道外部摂動天体の四重極永年項）**  
> 上の平面試験粒子模型で $a(1+e)<a'$ とし、外側の摂動天体は半径 $a'$ の円運動を行うものとする。$|r|/a'$ の展開の二次項を残して二角平均すると
>
$$
\overline{\mathcal R}_2
=\frac{\mathcal Gm'a^2}{4a'^3}
\left(1+\frac32e^2\right).
$$
>
> 従って四重極次数の永年Hamiltonianは
>
$$
H_{{\rm sec},2}=-\frac{\mu^2}{2L^2}
-\frac{\mathcal Gm'a^2}{4a'^3}\left(1+\frac32e^2\right).
$$
>
> これは質量 $m'$ に一次、距離比に二次の**切断模型**であり、真の全系との誤差が任意の長時間で小さいことまでは主張しない。
<!-- formal-statement-end -->

### 証明の見取り図

外側の円運動を先に平均すると、二次角度多項式の二次項が円周対称なポテンシャルになります。残る試験粒子の平均では、幾何的な角度でなく平均近点角 $d\ell=(1-e\cos E)dE$ を積分します。重みを落とすと離心率の係数が変わるため、そこを確認します。

<!-- proof-start -->
### 証明

$\alpha=|r|/a'<1$、$c=(r\cdot r')/(|r|a')=\cos(\arg r-\lambda')$ とします。重力ポテンシャルの距離比展開の二次までを書くと

$$
\frac1{|r-r'|}
=\frac1{a'}\left[
1+\alpha c+\alpha^2\frac{3c^2-1}{2}
+O(\alpha^3)\right].
$$

双極子項は $\alpha c/a'=(r\cdot r')/a'^3$ なので間接項と相殺します。外側円軌道では固定した $r\ne0$ に対して

$$
\frac1{2\pi}\int_0^{2\pi}c^2\,d\lambda'=\frac12,\qquad
\frac1{2\pi}\int_0^{2\pi}\frac{3c^2-1}{2}\,d\lambda'=\frac14.
$$

従って外側平均の二次項は $\mathcal Gm'|r|^2/(4a'^3)$ です。試験粒子の離心近点角 $E$ を用いれば

$$
|r|=a(1-e\cos E),\quad
\ell=E-e\sin E,\quad
d\ell=(1-e\cos E)\,dE.
$$

この変数変換を積分へ代入すると

$$
\begin{aligned}
\langle |r|^2\rangle_\ell
&=\frac{a^2}{2\pi}\int_0^{2\pi}(1-e\cos E)^3\,dE\\
&=\frac{a^2}{2\pi}\int_0^{2\pi}
(1-3e\cos E+3e^2\cos^2E-e^3\cos^3E)\,dE\\
&=a^2\left(1+\frac32e^2\right).
\end{aligned}
$$

最後の等式では余弦の奇数冪積分が零、$\int_0^{2\pi}\cos^2E\,dE=\pi$ を使いました。以上より二重平均の四重極項を得ます。Kepler Hamiltonianを[二体問題の作用](../CELE1/index.md#prop-cele1-kepler-actions)で書くと $-\mu^2/(2L^2)$ であり、$H=H_{\rm Kep}-\mathcal R$ の符号に従って二つ目の式が得られます。
<!-- proof-end -->

**どの近似をしたか**。展開は内側の軌道全体が外側円軌道の内側にあるという幾何学的条件に依存します。また二重平均から真の軌道への長時間近似には、小質量比に加え平均化の誤差評価や共鳴回避が必要です。数式の導出が正しくても、無限時間の誤差保証にはなりません。

## 3. 近日点方向はどのくらい回るのか

四重極模型は $g$ に依存しません。したがって $D$ が保存され、$L$ も保存されます。一方で、近日点の**方向**を表す $g$ は動き得ます。これは「楕円の形が固定だから運動が変化しない」という直感への最小の反例です。

<a id="prop-cele8-apsidal-rate"></a>

<!-- formal-statement-start -->
> **命題（平面円外部摂動の永年近日点歳差）**  
> $0<e<1$、$a(1+e)<a'$、$m'>0$ とする。[四重極永年Hamiltonian](#prop-cele8-quadrupole)を正準対 $(\ell,L),(g,D)$ で解くと
>
$$
\dot L=0,\qquad \dot D=0,\qquad
\dot g=\frac34\,n\,\frac{m'}{M}
\left(\frac a{a'}\right)^3\sqrt{1-e^2},
\quad n=\sqrt{\frac{\mu}{a^3}}.
$$
>
> ここで $g$ は平均化された楕円の近日点方向であり、真の三体運動の瞬間的な近日点角ではない。
<!-- formal-statement-end -->

### 証明の見取り図

離心率を独立変数のまま微分するのではなく、正準作用 $D$ で表し、$L$ を固定して微分します。$D=L\sqrt{1-e^2}$ による変数の置き換えが核心です。

<!-- proof-start -->
### 証明

$a=L^2/\mu$ を用いて $C(L)=\mathcal Gm'a^2/(4a'^3)$ とおきます。$e^2=1-D^2/L^2$ だから

$$
\begin{aligned}
H_{{\rm sec},2}(L,D)
&=-\frac{\mu^2}{2L^2}
-C(L)\left[1+\frac32\left(1-\frac{D^2}{L^2}\right)\right]\\
&=-\frac{\mu^2}{2L^2}-\frac52 C(L)
+\frac{3C(L)D^2}{2L^2}.
\end{aligned}
$$

角度 $\ell,g$ が右辺にないので、Hamilton方程式より $\dot L=-\partial_\ell H=0$、$\dot D=-\partial_gH=0$。また

$$
\dot g=\left.\frac{\partial H}{\partial D}\right|_L
=\frac{3C(L)D}{L^2}
=\frac{3\mathcal Gm'a^2}{4a'^3L}\sqrt{1-e^2}.
$$

最後に $L=\sqrt{\mu a}$、$\mu=\mathcal GM$ を代入して

$$
\frac{\mathcal Gm'a^2}{a'^3L}
=\frac{\mathcal Gm'}{\sqrt{\mu a}}\frac{a^2}{a'^3}
=n\frac{m'}M\left(\frac a{a'}\right)^3
$$

を得ます。これが指定された歳差速度です。
<!-- proof-end -->

例えば $m'/M=10^{-3}$、$a/a'=1/2$、$e=0.1$ とおくと、無次元速度比は

$$
\frac{\dot g}{n}
=\frac34\cdot10^{-3}\cdot\frac18\sqrt{0.99}
\simeq9.33\times10^{-5}.
$$

これは**切断した永年模型の値**です。離心率 $e=0$ では近日点方向 $g$ 自体を定義できないので、公式の極限値を円軌道の測定可能な近日点速度と呼んではいけません。また外側天体が離心軌道を描く場合や複数惑星を含む場合には、同じ次数でも平均化Hamiltonianが追加の角度に依存し、$e$ の長期変化が生じ得ます。

## 4. 平均すると消してはいけない角度：平均運動共鳴

二天体の平均経度の変化率を $n=\dot\lambda,n'=\dot\lambda'$ と書きます（Kepler極限では $n=\sqrt{\mu/a^3}$ です）。比 $n/n'$ が小さい整数比に近いときは、特定の角度の時間変化が遅くなります。すると第2節のようにすべての角度項を消してしまう近似は、その遅い変化を捨てることになります。

<a id="def-cele8-mean-motion"></a>

<!-- formal-statement-start -->
> **定義（平均運動共鳴）**  
> 内側試験粒子の平均経度 $\lambda$ と近日点経度 $\varpi$、外側円軌道天体の平均経度 $\lambda'$ を考える。整数 $p,q\ge1$ に対し
>
$$
\phi=(p+q)\lambda'-p\lambda-q\varpi
$$
>
> を共鳴角の一つとする。これが遅く変化する、すなわち
>
$$
\dot\phi=(p+q)n'-pn-q\dot\varpi\simeq0
$$
>
> となる領域を、対応する平均運動共鳴の近傍という。$\dot\varpi$ を無視した先頭近似は $n/n'\simeq(p+q)/p$ である。
<!-- formal-statement-end -->

<!-- definition-example-start: def-cele8-mean-motion -->

**定義の確認**。$p=q=1$ なら $\phi=2\lambda'-\lambda-\varpi$ で、$n\simeq2n'$ は内側天体の2:1共鳴です。外側天体の平均運動を $n'=1$、内側を $n=2$、$\dot\varpi=0$ とすれば $\dot\phi=2-2=0$。ところが $n=2.1$ なら $\dot\phi=-0.1$ で、共鳴角は時間とともに回転します。共鳴角がある瞬間に零という条件ではなく、**その時間微分が小さいか**を調べます。

<!-- definition-example-end -->

Keplerの第三法則は $n\propto a^{-3/2}$ なので、先頭近似 $n/n'=(p+q)/p$ から

$$
\frac a{a'}=\left(\frac{p}{p+q}\right)^{2/3}
$$

が得られます。例えば外側円軌道の長半径 $a'=5.2\,{\rm AU}$、内側に3:1共鳴を置くなら $p=1,q=2$ で、$a=5.2\cdot3^{-2/3}\,{\rm AU}\simeq2.50\,{\rm AU}$ です。これはKirkwood空隙に関連する共鳴位置を求める**Kepler模型による目安**です。実際の空隙形成には離心率励起、他の共鳴、散逸・衝突、長時間輸送等を調べる必要があり、整数比だけで小惑星が必ず消えるとは言えません。

共鳴の近くで差角を残すと、[CELE7の共鳴還元](../CELE7/index.md#prop-cele7-resonant-reduction)と同じ振り子型の局所Hamiltonianが現れます。係数を単なる飾りでなく、作用幅に結びつけます。

<a id="prop-cele8-resonance-width"></a>

<!-- formal-statement-start -->
> **命題（共鳴正規形の島幅）**  
> 正準角作用対 $(\phi,J)\in\mathbb T\times\mathbb R$ のHamiltonianが
>
$$
K_{\rm res}(\phi,J)=\frac A2(J-J_*)^2-B\cos\phi,\qquad A>0,\ B>0
$$
>
> であるとする。$(0,J_*)$ は楕円型、$(\pi,J_*)$ は双曲型であり、分離曲線が $\phi=0$ を通る点での最大作用差と全幅は
>
$$
|J-J_*|_{\max}=2\sqrt{\frac BA},
\qquad \Delta J=4\sqrt{\frac BA}.
$$
<!-- formal-statement-end -->

### 証明の見取り図

幅は絵から推測せず、鞍点エネルギー $+B$ と、角度 $\phi=0$ でのエネルギー保存を使って計算します。実際の天体共鳴で $A,B$ を求めるには、摂動関数のFourier係数と正準変換が必要です。

<!-- proof-start -->
### 証明

Hamilton方程式は

$$
\dot\phi=A(J-J_*),\qquad \dot J=-B\sin\phi.
$$

$(0,J_*)$ の周りで $\phi=u,J=J_*+v$ とすると $\dot u=Av,\dot v=-Bu+O(u^3)$ から $\ddot u=-ABu+O(u^3)$。従って線形固有値は $\pm i\sqrt{AB}$ です。$\phi=\pi+u$ では $\sin(\pi+u)=-u+O(u^3)$ となり $\ddot u=ABu+O(u^3)$、固有値は $\pm\sqrt{AB}$ です。

鞍点 $(\pi,J_*)$ のエネルギーは $K_{\rm res}=+B$。分離曲線上の $\phi=0$ で

$$
\frac A2(J-J_*)^2-B=B
\quad\Longrightarrow\quad
(J-J_*)^2=\frac{4B}{A}.
$$

左右二点の差を取れば全幅は $4\sqrt{B/A}$ です。
<!-- proof-end -->

**空隙をどう読むか**。$B$ は共鳴を励起するFourier係数で、一般に離心率等の軌道要素に依存します。振り子模型では島内に周期的な秤動があり、必ずしも不安定ではありません。一方、複数の共鳴が重なると複雑な輸送が起こり得ますが、[共鳴島の幅の式](../CELE7/index.md#prop-cele7-island-area)を用いた重なりの経験的判定だけで、横断ホモクリニック交差を厳密に証明したことにはなりません。

## 5. 1:1共鳴は空隙だけを作るのか：Trojan運動

小惑星帯の平均運動共鳴はしばしば空隙と結びつきます。しかし、1:1共鳴には他の運動形態もあります。外側主天体と同じ平均運動を保ちながら、その進行方向に対する角度がある範囲で揺れ動くことが可能です。この幾何を、[円制限三体問題の三角形Lagrange点](../CELE4/index.md#thm-cele4-five-lagrange-points)から考えます。

<a id="def-cele8-trojan"></a>

<!-- formal-statement-start -->
> **定義（Trojan型の共軌道運動）**  
> 平面円制限三体問題で、二つの主天体の平均運動と試験粒子の平均運動がほぼ1:1であり、回転座標系で試験粒子が三角形平衡点 $L_4$ または $L_5$ の近傍を秤動する運動をTrojan型共軌道運動という。単に公転周期が近いという条件だけでは定義を満たさない。
<!-- formal-statement-end -->

<!-- definition-example-start: def-cele8-trojan -->

**定義の確認**。主天体間距離を $1$ とする回転系で、二主天体と試験粒子が正三角形を作る場合、試験粒子は回転座標上の $L_4$ または $L_5$ に位置します。慣性系では同じ角速度で一周し、二主天体との角度差は一定です。小振幅の近傍運動ではその差角が振動します。対して角度差が全円周を単調に巡る運動は、この近傍秤動という条件に該当しません。

<!-- definition-example-end -->

[CELE4の正三角形点の線形安定条件](../CELE4/index.md#thm-cele4-triangular-stability)は、主天体の無次元質量比 $\nu\in(0,1/2]$ に対して

$$
27\nu(1-\nu)<1
$$

なら平面線形化の固有値が純虚数となることを与えます。例えば $\nu=0.01$ なら $27\nu(1-\nu)=0.2673<1$、$\nu=0.05$ なら $27\nu(1-\nu)=1.2825>1$。この計算は1:1共鳴の線形安定領域の例ですが、**純虚数の固有値だけで全ての非線形近傍軌道の永久安定を証明したわけではありません**。共鳴、非線形項、他の惑星による摂動は別途扱う必要があります。

## 6. 惑星の公転だけでなく、自転も共鳴する

公転と自転の二つの時計も共鳴します。自転角 $\theta$、慣性モーメント $I>0$、自転角運動量 $p=I\dot\theta$ を用います。中心天体のまわりの半径 $a$ の円公転で平均運動を $n=\sqrt{\mu/a^3}$ とし、天体に $B_{\rm body}>A_{\rm body}$ の赤道面慣性モーメント差があるとき、最も簡単な四重極模型は

$$
H(\theta,p,t)=\frac{p^2}{2I}-K\cos 2(\theta-nt),
\qquad
K=\frac{3\mu(B_{\rm body}-A_{\rm body})}{4a^3}>0.
$$

自転と公転の同期は、$\theta$ そのものが止まることではなく、相対角 $\phi=\theta-nt$ がほぼ一定になることです。

<a id="def-cele8-spin-orbit"></a>

<!-- formal-statement-start -->
> **定義（1対1自転・公転共鳴）**  
> 上の円公転・剛体四重極模型で、相対角 $\phi=\theta-nt\pmod{\pi}$ が一定または平衡角の周囲で秤動する状態を1対1自転・公転共鳴という。$\phi$ の周期を $\pi$ とするのは、模型のポテンシャルが $\cos2\phi$ に依存するためである。
<!-- formal-statement-end -->

<!-- definition-example-start: def-cele8-spin-orbit -->

**定義の確認**。$\theta(t)=nt$ なら $\phi=0$ で、長軸が中心天体方向に向き続けます。一方 $\theta(t)=(n+\delta)t$、$\delta\ne0$ なら $\phi=\delta t$ が回転し続け、一定角の同期状態ではありません。楕円公転や高次の自転共鳴では、この円軌道1:1模型をそのまま使わず対応する角度とトルクを取り直します。

<!-- definition-example-end -->

<a id="prop-cele8-spin-pendulum"></a>

<!-- formal-statement-start -->
> **命題（自転・公転同期の振り子模型）**  
> $I,K,n>0$ とする上の時間周期Hamiltonianに対し、相対角 $\phi=\theta-nt$ と相対作用 $J=p-In$ を用いると、定数項を除いた自律Hamiltonianは
>
$$
H_{\rm rot}(\phi,J)=\frac{J^2}{2I}-K\cos2\phi.
$$
>
> $\phi=0\pmod\pi,\ J=0$ は楕円型、$\phi=\pi/2\pmod\pi,\ J=0$ は双曲型であり、小振幅秤動角周波数と分離曲線上の最大自転速度差は
>
$$
\omega_{\rm lib}=2\sqrt{\frac KI},\qquad
|\dot\theta-n|_{\max}=2\sqrt{\frac KI}.
$$
<!-- formal-statement-end -->

### 証明の見取り図

時間依存の正準変換には、運動量の平行移動だけでなく、回転座標へ移る際の $-np$ 項が必要です。次に $\cos2\phi$ の微分の係数 $2$ を落とさず、線形化と鞍点エネルギーを比較します。

<!-- proof-start -->
### 証明

生成関数 $F_2(\theta,P,t)=(\theta-nt)P$ を使うと、新角は $\phi=\theta-nt$、旧運動量は $p=P$ で、新Hamiltonianは

$$
H'=\frac{P^2}{2I}-K\cos2\phi-nP.
$$

$P=J+In$ と平行移動すれば

$$
\frac{(J+In)^2}{2I}-n(J+In)
=\frac{J^2}{2I}-\frac{In^2}{2}.
$$

時間に依存しない定数項を除くと表示式です。Hamilton方程式は

$$
\dot\phi=\frac JI,\qquad
\dot J=-2K\sin2\phi.
$$

$\phi=u$ が小さいとき $\sin2u=2u+O(u^3)$ なので

$$
\ddot u=\frac{\dot J}{I}
=-\frac{4K}{I}u+O(u^3).
$$

従って小振幅角周波数は $2\sqrt{K/I}$ です。$\phi=\pi/2+u$ では $\sin(\pi+2u)=-2u+O(u^3)$ となるので $\ddot u=(4K/I)u+O(u^3)$、双曲型です。

双曲点のエネルギーは $+K$。$\phi=0$ 上の分離曲線で

$$
\frac{J^2}{2I}-K=K
\quad\Longrightarrow\quad
|J|=2\sqrt{IK}.
$$

$J=I(\dot\theta-n)$ で割れば示す速度幅です。
<!-- proof-end -->

この模型が示すのは、円軌道での1:1同期の力学です。例えば水星の3:2共鳴を議論するなら、離心軌道の真近点角 $f(t)$ とトルクの高調波を入れ、$3n-2\dot\theta$ に対応する遅い角度を残す必要があります。「どの共鳴も同じ振り子」ではなく、**何を平均し何を残すか**が共通手順なのです。

## 7. 数値実験は何を示し、何を示さないか

小さい摂動が長時間作用する系では、厳密解を閉形式で書くより数値積分から具体例を調べる場面が増えます。ただし通常の積分器がエネルギーを少しずつ増減させると、人工的な離脱や人工的な捕獲を長期現象と誤認し得ます。まず本章の自転振り子を数値実験用の最小模型とします。

時間刻み $h>0$ で、力を先に、角度を後に更新する方法を考えます。

<a id="prop-cele8-symplectic-step"></a>

<!-- formal-statement-start -->
> **命題（振り子の一段数値写像の面積保存）**  
> $I,K>0$ とし、$(\phi,J)$ 上で
>
$$
J_{k+1}=J_k-2hK\sin2\phi_k,\qquad
\phi_{k+1}=\phi_k+\frac hI J_{k+1}
$$
>
> と更新する写像は、任意の $h>0$ でJacobian行列式が $1$ であり、正準面積 $d\phi\,dJ$ を保存する。ただし有限刻みで元の連続Hamiltonianエネルギーを厳密に保存するとは限らない。
<!-- formal-statement-end -->

### 証明の見取り図

更新は二つのせん断写像の合成です。一段写像が面積保存である事実と、数値軌道が元の方程式に正しいかという精度の問題は分けて考えます。

<!-- proof-start -->
### 証明

$J^+=J-2hK\sin2\phi$ とおき、第一更新の微分を求めます。

$$
D(\phi,J)\mapsto(\phi,J^+)
=\begin{pmatrix}1&0\\-4hK\cos2\phi&1\end{pmatrix}.
$$

第二更新 $(\phi,J^+)\mapsto(\phi+hJ^+/I,J^+)$ の微分は

$$
\begin{pmatrix}1&h/I\\0&1\end{pmatrix}.
$$

各行列の行列式は $1$ なので、連鎖律から合成の行列式も $1$ です。一方、例えば $\phi_0=\pi/4,\ J_0=0$ とすれば $J_1=-2hK$、$\phi_1=\pi/4-2h^2K/I$ です。元のエネルギー差は

$$
H_{\rm rot}(\phi_1,J_1)-H_{\rm rot}(\phi_0,J_0)
=\frac{2h^2K^2}{I}-K\sin\left(\frac{4h^2K}{I}\right),
$$

であり、一般には零ではありません（小さい $h$ では $-2h^2K^2/I+O(h^6)$）。従って面積保存とエネルギーの厳密保存は別の性質です。
<!-- proof-end -->

**数値実験の最小設計**。例えば $I=K=1$ とし、初期条件を $(\phi_0,J_0)=(0.1,0)$ と $(1.55,0)$ に変えます。後者は双曲点 $\phi=\pi/2$ に近く、初期値誤差の増幅が見えやすいはずです。$h=0.05$、$0.025$ の二通りで同じ物理時間まで積分し、位相図、元のエネルギーの偏差、時間刻みによる差を比較します。時間刻みを半分にしただけで「正確さを証明した」とは言えないので、より小さい刻みや誤差評価を追加し、必要に応じて区間演算・検証付き積分を使います。

長期力学の主張を三つに分けましょう。[KAM定理](../../../幾何系/INT/INT8/index.md#thm-int8-kam)は条件の合う近可積分模型で特定の不変トーラスの存続を証明します。[ホモクリニック機構](../CELE6/index.md#ref-cele6-smale-birkhoff)は必要な双曲性と横断交差のもとで複雑な不変集合を与えます。数値積分は選んだ初期値と有限時間での具体的な振る舞いを示します。これらは互いに補完しますが、どれも単独で「太陽系のすべての天体が永久に安定／不安定」と結論する道具ではありません。

## 8. 演習と詳細解答

### Level A

<a id="ex-cele8-a01"></a>

**A1：二重平均の直接計算**
- Level: A

$\mathcal R=A+B\cos(\ell-\lambda')+C\sin(2\ell+\lambda')$ とする。二角 $\ell,\lambda'$ の二重平均を定義から計算せよ。

<!-- solution-start -->
**詳細解答**。$\lambda'$ について先に積分します。$2\pi$ 周期の整数周波数の三角関数なので

$$
\int_0^{2\pi}\cos(\ell-\lambda')\,d\lambda'=0,\qquad
\int_0^{2\pi}\sin(2\ell+\lambda')\,d\lambda'=0.
$$

従って内側積分は $2\pi A$ です。残る $\ell$ 積分は $(2\pi)^{-2}\int_0^{2\pi}2\pi A\,d\ell=A$。ただし共鳴近傍でこの平均を長時間軌道近似に使うには、別途有効性の検査が必要です。
<!-- solution-end -->

<a id="ex-cele8-a02"></a>

**A2：円周平均の係数**
- Level: A

$P_2(x)=(3x^2-1)/2$ とする。$r$ を固定して $r'$ が外側の円を一周したとき、$P_2(\cos(\arg r-\lambda'))$ の平均を求めよ。

<!-- solution-start -->
**詳細解答**。$u=\arg r-\lambda'$ と変数を取り、周期性により

$$
\frac1{2\pi}\int_0^{2\pi}\cos^2u\,du=\frac12.
$$

従って

$$
\frac1{2\pi}\int_0^{2\pi}P_2(\cos u)\,du
=\frac12\left(3\cdot\frac12-1\right)=\frac14.
$$

これは三次元の全方向の平均とは違い、**同一平面の円周平均**であることに注意します。
<!-- solution-end -->

<a id="ex-cele8-a03"></a>

**A3：Kepler楕円の平均半径二乗**
- Level: A

$r=a(1-e\cos E)$、$d\ell=(1-e\cos E)dE$、$0\le e<1$ とする。$\langle r^2\rangle_\ell$ を計算せよ。

<!-- solution-start -->
**詳細解答**。平均近点角の測度を使うので

$$
\langle r^2\rangle_\ell
=\frac{a^2}{2\pi}\int_0^{2\pi}(1-e\cos E)^3\,dE.
$$

三乗を展開したうち $\cos E,\cos^3E$ の積分は零、$\cos^2E$ の積分は $\pi$ です。よって

$$
\langle r^2\rangle_\ell
=\frac{a^2}{2\pi}(2\pi+3e^2\pi)
=a^2(1+3e^2/2).
$$

単純な $E$ の一様平均で $r^2$ を積分すると誤答になるので、$d\ell$ を忘れません。
<!-- solution-end -->

<a id="ex-cele8-a04"></a>

**A4：共鳴位置**
- Level: A

内側の試験粒子が外側の円軌道天体（$a'=5.2\,{\rm AU}$）と、先頭Kepler近似で2:1共鳴にあるとする。長半径 $a$ を式と近似値で求めよ。

<!-- solution-start -->
**詳細解答**。Keplerの第三法則 $n/n'=(a'/a)^{3/2}$ を $n/n'=2$ に代入します。

$$
2=\left(\frac{a'}a\right)^{3/2}
\quad\Longrightarrow\quad
2^{2/3}=\frac{a'}a
\quad\Longrightarrow\quad
a=5.2\,2^{-2/3}\,{\rm AU}\simeq3.28\,{\rm AU}.
$$

歳差と摂動による共鳴中心の補正はこの先頭近似には含まれません。
<!-- solution-end -->

<a id="ex-cele8-a05"></a>

**A5：三角形点の線形安定条件**
- Level: A

平面円制限三体問題の無次元質量比 $\nu=0.02$ に対し、$27\nu(1-\nu)<1$ を判定せよ。この計算から導けない安定性主張も一つ挙げよ。

<!-- solution-start -->
**詳細解答**。代入して

$$
27(0.02)(0.98)=0.5292<1
$$

です。[三角形点の線形安定条件](../CELE4/index.md#thm-cele4-triangular-stability)を適用でき、平面線形化の固有値は純虚数です。しかし有限振幅のすべての非線形軌道が全時間でその近傍に留まる、あるいは他の惑星を追加しても同じ結論が成り立つ、とは証明されていません。
<!-- solution-end -->

### Level B

<a id="ex-cele8-b01"></a>

**B1：歳差速度の再導出**
- Level: B

$L=\sqrt{\mu a},\ D=L\sqrt{1-e^2}$、$C(L)=\mathcal Gm'a^2/(4a'^3)$ とし、$H=-\mu^2/(2L^2)-C(L)(1+3e^2/2)$ を考える。$\dot D,\dot g$ をHamilton方程式から求め、$\dot g/n$ を質量比と長半径比で表せ。

<!-- solution-start -->
**詳細解答**。$e^2=1-D^2/L^2$ を代入すると

$$
H=-\frac{\mu^2}{2L^2}-\frac52 C(L)
+\frac{3C(L)D^2}{2L^2}.
$$

$g$ が含まれないので $\dot D=-\partial_gH=0$。$L$ 固定で微分し

$$
\dot g=\frac{\partial H}{\partial D}
=\frac{3C(L)D}{L^2}
=\frac{3\mathcal Gm'a^2}{4a'^3L}\sqrt{1-e^2}.
$$

$\mu=\mathcal GM$、$n=\sqrt{\mu/a^3}$ を用いて

$$
\frac{\dot g}{n}=\frac34\frac{m'}M
\left(\frac a{a'}\right)^3\sqrt{1-e^2}.
$$

$D$ を固定せず $e$ を独立とみなして微分すると、正準微分ではなくなる点が誤りです。
<!-- solution-end -->

<a id="ex-cele8-b02"></a>

**B2：共鳴島の作用幅**
- Level: B

$K_{\rm res}=\tfrac A2(J-J_*)^2-B\cos\phi$、$A=2,B=1/8$ とする。楕円点、鞍点、分離曲線が $\phi=0$ を通る二つの作用値および全幅を求めよ。

<!-- solution-start -->
**詳細解答**。停留条件は $A(J-J_*)=0$、$B\sin\phi=0$ なので、$(0,J_*)$ が楕円点、$(\pi,J_*)$ が鞍点です。鞍点エネルギーは $B=1/8$ です。$\phi=0$ の分離曲線で

$$
\frac22(J-J_*)^2-\frac18=\frac18
\quad\Longrightarrow\quad
(J-J_*)^2=\frac14.
$$

従って二作用値は $J_*-1/2,\ J_*+1/2$、全幅は $1$。一般式 $4\sqrt{B/A}=4\sqrt{1/16}=1$ とも一致します。
<!-- solution-end -->

<a id="ex-cele8-b03"></a>

**B3：自転共鳴の幅と線形化**
- Level: B

$I=4,K=1$ の自転・公転模型 $H_{\rm rot}=J^2/(2I)-K\cos2\phi$ を考える。$\phi=0$ と $\phi=\pi/2$ の線形固有値、および分離曲線上の最大 $|\dot\theta-n|$ を求めよ。

<!-- solution-start -->
**詳細解答**。Hamilton方程式は $\dot\phi=J/4$、$\dot J=-2\sin2\phi$ です。$\phi=0+u$ なら $\ddot u=\dot J/4=-u+O(u^3)$、固有値は $\pm i$ です。$\phi=\pi/2+u$ なら $\ddot u=u+O(u^3)$、固有値は $\pm1$ です。

鞍点エネルギーは $1$。$\phi=0$ の分離曲線では $J^2/8-1=1$、従って $|J|=4$。$\dot\theta-n=J/I=J/4$ より最大差は $1$ です。一般式 $2\sqrt{K/I}=1$ と一致します。
<!-- solution-end -->

<a id="ex-cele8-b04"></a>

**B4：数値写像の面積とエネルギー**
- Level: B

$J^+=J-2hK\sin2\phi$、$\phi^+=\phi+hJ^+/I$ の数値写像についてJacobian行列を計算し、行列式が $1$ になることを示せ。またこれだけで真の長時間解の精度を保証しない理由を述べよ。

<!-- solution-start -->
**詳細解答**。$\partial_\phi J^+=-4hK\cos2\phi$、$\partial_JJ^+=1$ です。よって

$$
D(\phi^+,J^+)=
\begin{pmatrix}
1-4h^2K\cos2\phi/I&h/I\\
-4hK\cos2\phi&1
\end{pmatrix}.
$$

行列式は

$$
1-\frac{4h^2K}{I}\cos2\phi
+\frac{4h^2K}{I}\cos2\phi=1.
$$

これは数値写像の正準面積保存を示すだけです。打切り誤差は残り、時間刻みが大きければ真の軌道やエネルギー値からずれ得ます。長期精度には刻み収束、誤差上界、場合によっては検証付き積分を別途用います。
<!-- solution-end -->

### Level C

<a id="ex-cele8-c01"></a>

**C1：太陽系長期力学の三種類の主張を分離する**
- Level: C

平面・非衝突の内側試験粒子と、半径 $a'$ で円運動する外側摂動天体を考える。$a(1+e)<a'$、$0<e<1$ とする。

1. 間接項を含む摂動関数を立て、外側円周平均の二次項を求めよ。
2. 平均近点角でさらに平均し、四重極永年Hamiltonianと近日点歳差速度を得よ。
3. 先頭平均運動比が3:1の共鳴の長半径比を求め、なぜその近傍で二重平均模型だけでは不十分となるか示せ。
4. 1:1共軌道の安定性、3:1共鳴による空隙、KAMトーラスの存続について、各々の模型から**証明されたこと**と**追加検証が要ること**を区別せよ。
5. 数値計算で100万公転分の軌道が閉じ込められたという観測から何が言え、何が言えないか述べよ。

<!-- solution-start -->
**詳細解答**。

1. 中心天体加速度系では $\mathcal R=\mathcal Gm'(|r-r'|^{-1}-r\cdot r'/a'^3)$ です。$\alpha=|r|/a'<1$ と角差 $u$ を用い
   
$$
|r-r'|^{-1}=\frac1{a'}\left[1+\alpha\cos u+
\frac{\alpha^2}{2}(3\cos^2u-1)+O(\alpha^3)\right].
$$

   $\alpha\cos u/a'=r\cdot r'/a'^3$ は間接項と消えます。$\langle\cos^2u\rangle_{\lambda'}=1/2$ を代入すると、位置に依存する先頭の外側平均は $\mathcal Gm'|r|^2/(4a'^3)$ です。定数項 $\mathcal Gm'/a'$ は運動方程式に寄与しません。

2. $\ell=E-e\sin E$ なので $d\ell=(1-e\cos E)dE$、$|r|=a(1-e\cos E)$ です。従って
   
$$
\langle r^2\rangle_\ell=\frac{a^2}{2\pi}\int_0^{2\pi}
(1-e\cos E)^3dE=a^2(1+3e^2/2).
$$

   $L=\sqrt{\mu a},D=L\sqrt{1-e^2}$ を用いて

$$
H_{{\rm sec},2}=-\frac{\mu^2}{2L^2}
-\frac{\mathcal Gm'a^2}{4a'^3}
\left(1+\frac32(1-D^2/L^2)\right).
$$

   $L$ 固定で $D$ 微分を行い、$\dot g=(3/4)n(m'/M)(a/a')^3\sqrt{1-e^2}$ を得ます。また $\dot L=\dot D=0$ です。

3. $n/n'=(a'/a)^{3/2}$ を $3$ に等置し $a/a'=3^{-2/3}$。例えば $p=1,q=2$ なら共鳴角は $\phi=3\lambda'-\lambda-2\varpi$ で、$\dot\phi=3n'-n-2\dot\varpi$ が小さくなり得ます。この遅い角度は長時間一定に近いので、**速い独立角として消す操作**は正当化が必要です。

4. 1:1では[三角形点の線形安定条件](../CELE4/index.md#thm-cele4-triangular-stability)が $\nu$ の範囲を与えますが、全非線形近傍軌道の永久安定までは保証しません。3:1について整数比は共鳴**位置の先頭近似**を与えますが、空隙生成には力学的輸送・他摂動・時間尺度の確認が必要です。[KAM定理](../../../幾何系/INT/INT8/index.md#thm-int8-kam)は解析性、非退化性、Diophantine条件と十分小さな摂動を満たす領域で不変トーラスを与えますが、全軌道の安定性定理ではありません。

5. 指定した初期条件、積分法、丸め・刻み誤差に関して**有限時間内で閉じ込められる軌道が数値的に観測された**と報告できます。しかし誤差検証がなければその有限時間での厳密軌道への近さも保証されず、まして無限時間の安定性や全初期条件への主張はできません。刻み収束、保存量診断、必要なら区間演算等を追加します。
<!-- solution-end -->

## 9. この系列で答えられるようになった問い

二体問題の楕円軌道を出発点として、追加天体の重力を摂動関数へ、速い角度の平均を永年Hamiltonianへ、共鳴角を局所振り子へと変換しました。これによって「楕円がゆっくり回る」「共鳴の中で保護された運動がある」「別の共鳴で輸送が起こり得る」を、ひとまとめの「安定・不安定」に還元せず説明できます。

長期力学に必要なのは、どのモデル・パラメータ・時間尺度・初期値について、保存量、KAM、双曲性、摂動論、数値誤差のどの根拠を持っているかを答えることです。**決定論的な方程式であることと、任意の未来まで個別軌道を予測できることは別**なのです。
