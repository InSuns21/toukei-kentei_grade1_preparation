# QCURV15 Hadamard差引きと局所観測量・エネルギー流束

<!-- definition-example-audit: strict -->

[QCURV14のTolman則](../QCURV14/index.md#thm-qcurv14-tolman)は、熱平衡状態の**検出器が読む温度**を時計の規格化と結び付けました。しかし温度や粒子数だけでは、局所的なエネルギー密度やブラックホールの蒸発を支えるエネルギー流を計算したことにはなりません。古典場ならエネルギーを表す応力テンソルを使えますが、量子場の二点分布は同じ点でそのまま掛け算できない、という新しい障害があります。

本章は「**何を引けば有限な量になり、その有限な量を誰の時計と空間枠で読むか**」をつなぎます。[MICA14のHadamard差引き](../../../解析系/MICA/MICA14/index.md#def-mica14-subtracted-remainder)と[MICA15の保存的応力テンソル](../../../解析系/MICA/MICA15/index.md#def-mica15-renormalized-stress)を数学的な正本として使い、ここでは熱状態の積分、観測者への射影、Schwarzschildの遠方光度を実計算します。

舞台は滑らかで時間向きのある4次元大域双曲Lorentz時空 $(M,g)$、計量符号 $(-,+,+,+)$、境界なし、自然単位 $\hbar=c=k_B=G=1$ です。実自由スカラー場に対し

$$
P=-\Box_g+m^2+\xi R,\qquad P\phi=0,\qquad m\ge0
$$

を固定します。状態 $\omega$ はHadamard状態とし、二点分布を $W_\omega(x,y)=\omega(\phi(x)\phi(y))$ と記します。**二点分布は一般には通常の二変数関数ではありません。** 平坦熱状態の明示計算では $m=0$、$\xi=0$ と指定し、Schwarzschildの外部では必要に応じて場・状態・対称性を別途指定します。

本章の道筋は次の通りです。

1. 特異な二点分布を直接対角へ代入できない理由と、二状態の差なら何が計算できるかを確認する。
2. Minkowskiの質量零熱状態で、$\langle\phi^2\rangle$ の有限差とエネルギー密度の有限差を積分する。
3. 応力テンソルから実際の観測者のエネルギー密度・圧力・流束を取り出す。
4. Schwarzschildの保存Killing流から、遠方光度と局所流束を区別する。
5. 状態の違い、くりこみ規約、地平線での正則性がそれぞれ何を保証するかを整理する。

## 1. 引き算の順番：まず二点の分布として引く

[MICA14の生の対角引き戻しの障害](../../../解析系/MICA/MICA14/index.md#prop-mica14-diagonal-obstruction)によれば、Hadamard二点分布を「$W_\omega(x,x)$」と直接評価する操作は一般に定義されません。局所Hadamard式 $H_{\ell,\infty}(x,y)$ も個別には同じ特異性を持ちます。正しい順番は、**二変数の分布のまま引き、滑らかな余りだけを対角へ制限する**ことです。

同じ背景・同じ作用素・同じくりこみ規約に置かれた二つのHadamard状態 $\omega,\omega_0$ を比較しましょう。[MICA13の滑らかな差の結果](../../../解析系/MICA/MICA13/index.md#prop-mica13-smooth-difference)により

$$
D(x,y):=W_\omega(x,y)-W_{\omega_0}(x,y)
\in C^\infty(M\times M)
$$

です。$D$ は場の方程式を各変数について満たす滑らかな**双解**でもあります。ここでは共通の交換子をもつ自由場の状態を比べるので、$D(x,y)=D(y,x)$ として扱えます。

<a id="def-qcurv15-observable-difference"></a>

<!-- formal-statement-start -->
> **定義（二状態の局所観測量差）**
> 上記の同一4次元自由Klein–Gordon理論の二つのHadamard状態 $\omega,\omega_0$ に、同一の保存的・局所共変なくりこみ規約を適用する。[滑らかな二点分布差](../../../解析系/MICA/MICA14/index.md#prop-mica14-state-difference) $D=W_\omega-W_{\omega_0}$ に対し、Wick平方の差と応力テンソル期待値の差を

$$
\begin{aligned}
\Delta_\omega\langle\phi^2\rangle(x)
&:=\langle:\!\phi^2\!:\rangle_\omega
  -\langle:\!\phi^2\!:\rangle_{\omega_0}=D(x,x),\\
\Delta_\omega T_{ab}(x)
&:=\langle T_{ab}\rangle_{\omega}^{\rm ren}
  -\langle T_{ab}\rangle_{\omega_0}^{\rm ren}
  =\mathcal D_{ab}D(x)
\end{aligned}
$$

> と記す。$\mathcal D_{ab}$ は[MICA15の点分離双微分作用素](../../../解析系/MICA/MICA15/index.md#def-mica15-bidifferential)で、微分は**対角制限の前**に行う。両差は滑らかであり、$\nabla^a\Delta_\omega T_{ab}=0$ である。各状態の単独の値が規約抜きで一意になるという意味ではない。
<!-- formal-statement-end -->

<!-- definition-example-start: def-qcurv15-observable-difference -->
### 直接例：揺らぎが変わってもエネルギーは変わらない

質量零・最小結合のMinkowski場で $D(x,y)=\lambda$（$\lambda\ge0$）という滑らかな対称双解を考えます。定数関数は各変数の波動方程式を満たし、$D(x,x)=\lambda$ です。また $D$ のすべての微分は零なので、平坦・質量零の[MICA15の双微分作用](../../../解析系/MICA/MICA15/index.md#def-mica15-bidifferential)は $\mathcal D_{ab}D=0$ を与えます。

$$
\Delta_\omega\langle\phi^2\rangle=\lambda,\qquad
\Delta_\omega T_{ab}=0.
$$

これは滑らかな古典解 $1$ の正値二点項を加える状態変更として[MICA11](../../../解析系/MICA/MICA11/index.md#prop-mica11-smooth-shift)で実現できる例です。**定義の確認**：同じ $P$、同じHadamard特異部、滑らかな双解、対角値、微分後のテンソル、保存を順に確かめました。Wick平方はエネルギー密度そのものではありません。
<!-- definition-example-end -->

一状態の局所値は、[MICA14のWick平方期待値](../../../解析系/MICA/MICA14/index.md#def-mica14-wick-square)や[MICA15の保存的処方](../../../解析系/MICA/MICA15/index.md#def-mica15-renormalized-stress)で、共通の幾何学的Hadamard特異部、局所保存補正、有限なくりこみ条件を指定して初めて定まります。**状態差が有限**という事実は、**すべての単独期待値が零**という意味でも、基準状態を各時空で恣意的に選んでよいという意味でもありません。

## 2. 平坦時空の熱状態：$T^2$ と $T^4$ がどこから出るか

ここではMinkowskiの慣性座標 $x=(t,\boldsymbol x)$、質量零・最小結合の場、逆温度 $\beta>0$ の空間並進不変な自由場の熱平衡状態 $\omega_\beta$ を取ります。$\omega_0$ は同じ慣性時間に対する真空です。波数ベクトル $\boldsymbol k\in\mathbb R^3$、$\omega=|\boldsymbol k|>0$、Bose占有数

$$
n_\beta(\omega)=\frac{1}{e^{\beta\omega}-1}
$$

を使います。二点分布のモード表示で熱状態には真空の正振動数項に加えて、$\omega>0$ の占有数に比例する正負両向きの項が現れます。真空分を**分布として差し引く**と

$$
D_\beta(x,y)=\int_{\mathbb R^3}\frac{d^3k}{(2\pi)^3}
\frac{n_\beta(\omega)}{\omega}
\cos\!\left[\omega(t_x-t_y)-\boldsymbol k\cdot
(\boldsymbol x-\boldsymbol y)\right].
$$

$\omega\downarrow0$ では $n_\beta(\omega)\sim1/(\beta\omega)$ ですが、$d^3k=4\pi\omega^2d\omega$ の体積要素が補うので対角でも積分可能です。$\omega\to\infty$ では指数減衰するため、任意の有限階の座標微分を積分内へ移せます。従ってこの $D_\beta$ は滑らかで、質量零波動方程式の双解です。

まず対角で

$$
D_\beta(x,x)
=\frac{1}{2\pi^2}\int_0^\infty
\frac{\omega\,d\omega}{e^{\beta\omega}-1}
$$

を得ます。ここにあるのは**有限な状態差**であり、発散する真空二点分布を別々に代入したものではありません。

<a id="thm-qcurv15-thermal-observables"></a>

<!-- formal-statement-start -->
> **定理（質量零Minkowski熱状態の有限な観測量差）**
> 4次元Minkowski時空の質量零・最小結合実自由スカラー場について、慣性時間 $t$ に関する逆温度 $\beta>0$ の並進・回転不変な熱的Hadamard状態 $\omega_\beta$ と同じ慣性真空 $\omega_0$ を比較する。同じ保存的なくりこみ規約を用いると

$$
\boxed{\Delta_\beta\langle\phi^2\rangle
=\frac{1}{12\beta^2}}
$$

> であり、慣性直交座標での応力テンソル差は

$$
\boxed{\Delta_\beta T_{ab}
=\operatorname{diag}(\rho,p,p,p),\quad
\rho=\frac{\pi^2}{30\beta^4},\quad
p=\frac{\rho}{3}.}
$$

> 非対角成分は零であり、$\partial^a\Delta_\beta T_{ab}=0$、$\eta^{ab}\Delta_\beta T_{ab}=0$。これらは熱状態**と真空の差**であり、任意の曲がった背景の単独のくりこみ期待値を決める式ではない。
<!-- formal-statement-end -->

### 証明の見取り図

分布の差が滑らかであることを先に確かめたので、対角での積分と微分後の積分を計算できます。$\phi^2$ は波数1乗のBose積分、エネルギーは波数3乗のBose積分です。エネルギーでは時間微分と空間微分を**両方**加える点が係数の検算になります。

<!-- proof-start -->
### 証明

$q=e^{-\beta\omega}\in(0,1)$ に対して $n_\beta(\omega)=\sum_{j=1}^\infty e^{-j\beta\omega}$ です。各項は非負であり、単調収束で積分と和を交換できます。$s>0$ について部分積分から

$$
\int_0^\infty \omega e^{-s\omega}\,d\omega=s^{-2},
\qquad
\int_0^\infty \omega^3e^{-s\omega}\,d\omega=6s^{-4}.
$$

ゆえに

$$
\begin{aligned}
\int_0^\infty\omega n_\beta(\omega)\,d\omega
&=\beta^{-2}\sum_{j\ge1}j^{-2}
=\frac{\pi^2}{6\beta^2},\\
\int_0^\infty\omega^3 n_\beta(\omega)\,d\omega
&=6\beta^{-4}\sum_{j\ge1}j^{-4}
=\frac{\pi^4}{15\beta^4}.
\end{aligned}
$$

ここで $\sum j^{-2}=\pi^2/6$、$\sum j^{-4}=\pi^4/90$ です。数値係数を確かめるには、$[-\pi,\pi]$ 上の $x^2$ のFourier級数

$$
x^2=\frac{\pi^2}{3}
+4\sum_{j\ge1}\frac{(-1)^j}{j^2}\cos(jx)
$$

を $x=\pi$ で評価すると前者を得ます。また同じ級数のParseval等式から

$$
\frac1{2\pi}\int_{-\pi}^{\pi}x^4dx
=\frac{\pi^4}{9}+8\sum_{j\ge1}j^{-4},
\qquad
\frac{\pi^4}{5}-\frac{\pi^4}{9}
=8\sum_{j\ge1}j^{-4}
$$

となり後者も得ます。従ってWick平方の差は

$$
\Delta_\beta\langle\phi^2\rangle
=\frac1{2\pi^2}\frac{\pi^2}{6\beta^2}
=\frac1{12\beta^2}.
$$

応力テンソルについて、平坦・質量零・最小結合では

$$
T_{00}=\frac12\left[(\partial_t\phi)^2+
\sum_{i=1}^3(\partial_i\phi)^2\right].
$$

二点関数の微分を対角で評価すると、位相
$\theta=\omega(t_x-t_y)-\boldsymbol k\cdot(\boldsymbol x-\boldsymbol y)$
に対して

$$
\left.\partial_{t_x}\partial_{t_y}\cos\theta\right|_{x=y}
=\omega^2,\qquad
\left.\partial_{x^i}\partial_{y^j}\cos\theta\right|_{x=y}
=k_i k_j.
$$

従って

$$
\begin{aligned}
\Delta_\beta T_{00}
&=\frac12\int\frac{d^3k}{(2\pi)^3}
\frac{n_\beta(\omega)}{\omega}
\left(\omega^2+|\boldsymbol k|^2\right)\\
&=\frac1{2\pi^2}\int_0^\infty\omega^3n_\beta(\omega)\,d\omega
=\frac{\pi^2}{30\beta^4}.
\end{aligned}
$$

空間成分は

$$
\Delta_\beta T_{ij}=\int\frac{d^3k}{(2\pi)^3}
\frac{n_\beta(\omega)}{\omega}k_i k_j
$$

です。角度積分の回転対称性から
$\int d\Omega\,k_i k_j=(4\pi/3)\omega^2\delta_{ij}$、
したがって $\Delta_\beta T_{ij}=(\rho/3)\delta_{ij}$ です。奇関数である $k_i$ の積分が零なので $\Delta_\beta T_{0i}=0$。成分は定数ゆえ保存し、トレースは $-\rho+3p=0$ となります。$\square$
<!-- proof-end -->

### 直接計算：同じ熱状態でも測る量の温度次数が違う

$\beta=2\pi$（単位を固定した数値例）とすると

$$
\Delta_\beta\langle\phi^2\rangle=\frac1{48\pi^2},
\quad
\rho=\frac1{480\pi^2},
\quad
p=\frac1{1440\pi^2}.
$$

Wick平方は工学次元2、応力テンソルは次元4です。どちらも有限で正ですが、**二つを同じ「温度計の値」や「粒子数」と読んではいけません**。熱状態では温度との関係が明瞭でも、非平衡状態で同じ一変数の関係が一般に成り立つわけではありません。

## 3. 誰が測るか：応力テンソルを観測者の枠へ分解する

二点分布から $\langle T_{ab}\rangle^{\rm ren}$ を得ても、成分 $T_{00}$ は任意座標で「局所的エネルギー密度」ではありません。観測者には未来向き単位時間的四元速度 $u^a$（$g_{ab}u^a u^b=-1$）があり、その瞬間の空間は $u^a$ に直交する3次元部分空間です。射影

$$
h^a{}_b=\delta^a{}_b+u^au_b,\qquad
h^{ab}=g^{ab}+u^au^b
$$

は $h^a{}_b u^b=0$ を満たします。ここからエネルギーの時間成分と空間成分を取り出します。

<a id="def-qcurv15-observer-measurements"></a>

<!-- formal-statement-start -->
> **定義（観測者のエネルギー密度と流束）**
> 4次元Lorentz時空の点 $x$ で、未来向き単位時間的 $u^a$ と、同じくりこみ規約で決めた実対称応力テンソル期待値 $T_{ab}=\langle T_{ab}\rangle^{\rm ren}_\omega(x)$ を与える。この観測者のエネルギー密度 $\rho_u$、平均等方圧 $p_u$、空間エネルギー流ベクトル $q_u^a$ を

$$
\boxed{
\rho_u=T_{ab}u^a u^b,\qquad
p_u=\frac13h^{ab}T_{ab},\qquad
q_u^a=-h^a{}_c T^{cd}u_d
}
$$

> と定める。$q_u^a u_a=0$ であり、観測者の正規直交枠で $q_u^{\hat i}=T^{\hat0\hat i}=-T_{\hat0\hat i}$。これらは指定した状態・くりこみ規約・観測者に関する値であり、すべての状態で非負とは仮定しない。
<!-- formal-statement-end -->

<!-- definition-example-start: def-qcurv15-observer-measurements -->
### 直接例：熱状態の静止系と移動系

**定義の確認**として、観測者の規格化・空間射影・各測定量を順番に調べます。

[前節の熱状態差](#thm-qcurv15-thermal-observables)をMinkowski慣性枠で
$T_{ab}=\operatorname{diag}(\rho,p,p,p)$、$\rho=3p>0$ とします。$u^a=(1,0,0,0)$ は単位時間的で、$h^{00}=0$、$h^{ij}=\delta^{ij}$ です。よって $\rho_u=\rho$、$p_u=(T_{11}+T_{22}+T_{33})/3=p$、$q_u^i=-T^{i0}u_0=T^{i0}=0$ と**各条件を実際に確認**できます。

次に速度 $0<v<1$ で $z$ 方向へ移動する観測者を
$u'^a=\gamma(1,0,0,v)$、$\gamma=(1-v^2)^{-1/2}$ とします。$g(u',u')=-\gamma^2+\gamma^2v^2=-1$。その観測者の $z$ 方向の単位空間軸を $e_{\hat z}^a=\gamma(v,0,0,1)$ とすれば、$g(u',e_{\hat z})=0$、$g(e_{\hat z},e_{\hat z})=1$ です。従って

$$
\rho_{u'}=\gamma^2(\rho+v^2p),\qquad
q_{u'}^{\hat z}
=-T_{ab}u'^a e_{\hat z}^b
=-\gamma^2v(\rho+p).
$$

温度 $T=\beta^{-1}$ が指定されても、観測者の運動により局所エネルギー密度と流束は変わります。これは状態を変更したのではなく**同じテンソルの観測枠を変更した**例です。
<!-- definition-example-end -->

<a id="prop-qcurv15-observer-difference"></a>

<!-- formal-statement-start -->
> **命題（二状態差を測る観測者の変換）**
> 同じ4次元自由場・背景・くりこみ規約の二つのHadamard状態 $\omega,\omega_0$ と、共通の単位時間的観測者 $u$ を取る。[二状態の応力テンソル差](#def-qcurv15-observable-difference) $\Delta T_{ab}=\mathcal D_{ab}(W_\omega-W_{\omega_0})$ に対して

$$
\begin{aligned}
\rho_u(\omega)-\rho_u(\omega_0)&=u^au^b\Delta T_{ab},\\
q_u^a(\omega)-q_u^a(\omega_0)
&=-h^a{}_c\,\Delta T^{cd}u_d
\end{aligned}
$$

> が成り立つ。どちらも滑らかで、**共通の状態非依存局所補正や有限なくりこみ項には依存しない**。ただし異なる観測者 $u,u'$ の値を左辺で直接引くと、この単純な式にはならない。
<!-- formal-statement-end -->

### 証明の見取り図

同じ $u$ と同じ射影 $h$ を二つの状態で使えば、テンソルへの縮約は線形です。くりこみ補正の相殺は[MICA15の状態間差](../../../解析系/MICA/MICA15/index.md#thm-mica15-state-difference)が保証します。

<!-- proof-start -->
### 証明

$T_{ab}(\omega)-T_{ab}(\omega_0)=\Delta T_{ab}$ を、それぞれ[観測量の定義](#def-qcurv15-observer-measurements)に代入します。$u,h$ は固定なので

$$
T_{ab}(\omega)u^au^b-T_{ab}(\omega_0)u^au^b
=\bigl[T_{ab}(\omega)-T_{ab}(\omega_0)\bigr]u^au^b
$$

です。流束も

$$
\begin{aligned}
q_u^a(\omega)-q_u^a(\omega_0)
&=-h^a{}_c T^{cd}(\omega)u_d
   +h^a{}_c T^{cd}(\omega_0)u_d\\
&=-h^a{}_c\Delta T^{cd}u_d.
\end{aligned}
$$

$D$ が滑らかで $\mathcal D$ が有限階微分作用素なので $\Delta T$ は滑らかです。状態に依存しない局所補正は両者に同じテンソルを加え、差では相殺します。$\square$
<!-- proof-end -->

**物理的な注意**：Hadamard状態の局所エネルギー密度が点ごとに正という定理はありません。古典場の正エネルギー性をそのままくりこみ期待値へ移して、負の局所密度を計算ミスと即断しないでください。逆に、個々の数値には規約の選択が残るので、有限というだけで普遍的な観測値とも言えません。

## 4. Schwarzschild外部：どのエネルギーが半径によらず保存するか

[QCURV9のSchwarzschild外部](../QCURV9/index.md#prop-qcurv9-kappa)に戻ります。質量 $M>0$、$r>2M$ で

$$
ds^2=-f(r)\,dt^2+\frac{dr^2}{f(r)}
 +r^2d\Omega^2,\qquad f(r)=1-\frac{2M}{r},
\qquad \xi^a=(\partial_t)^a
$$

です。$\xi$ は無限遠で単位時間並進になる時間的Killingベクトルで、$r>2M$ では静止観測者 $u_{\rm stat}^a=\xi^a/\sqrt f$ が存在します。

応力テンソルが保存的な規約で定義され、$\nabla_aT^{ab}=0$ とします。$\xi$ がKillingベクトルなので $\nabla_{(a}\xi_{b)}=0$ です。量子場の状態が時間並進と球対称性を保てば、テンソルの半径方向のエネルギー流を考えられます。

<a id="def-qcurv15-killing-luminosity"></a>

<!-- formal-statement-start -->
> **定義（SchwarzschildのKilling光度）**
> $r>2M$ のSchwarzschild外部で、静的かつ球対称な実対称保存テンソル $T_{ab}$（例えば、同じ規約で定義された定常球対称Hadamard状態の応力テンソル期待値）を取る。遠方規格化したKilling場 $\xi=\partial_t$ に対して

$$
J^a:=-T^a{}_b\xi^b,\qquad
L_K(r):=\int_{S^2_r}r^2J^r\,d\Omega
=-4\pi r^2 T^r{}_t
$$

> と定める。$J$ はKilling時間に対応したエネルギー流、$L_K$ は外向きを正とする単位Killing時間当たりの球面エネルギー流（Killing光度）である。$L_K$ を観測者の**固有時間**当たりの局所エネルギー流と最初から同一視しない。
<!-- formal-statement-end -->

<!-- definition-example-start: def-qcurv15-killing-luminosity -->
### 直接例：平衡状態の正味流束

**定義の確認**として、Killing場の規格化、状態の対称性、球面積と流束の向きを照合します。

永遠のSchwarzschild外部の[Hartle–Hawking状態](../QCURV13/index.md#def-qcurv13-three-states)は静的・球対称で、入射と出射が釣り合った熱平衡状態です。[QCURV13の遠方流束比較](../QCURV13/index.md#thm-qcurv13-state-flux)では正味の球面流束が零です。時間反転対称な平衡の応力テンソルでは $T^r{}_t=0$、従って $J^r=0$ で

$$
L_K(r)=-4\pi r^2\cdot0=0.
$$

Killing場の無限遠規格化、状態の定常・球対称性、外向き符号、球面積、正味流束が零であることを確認しました。個々の入射・出射モードが零個だとは言っていません。
<!-- definition-example-end -->

<a id="thm-qcurv15-luminosity-conservation"></a>

<!-- formal-statement-start -->
> **定理（定常球対称なKilling光度の半径独立性）**
> 質量 $M>0$ のSchwarzschild外部 $r>2M$ で、滑らかな実対称テンソル $T_{ab}$ が $\nabla_aT^{ab}=0$ を満たし、$t$ の並進と球面回転について不変であるとする。このとき[上記のKilling流](#def-qcurv15-killing-luminosity)は

$$
\nabla_aJ^a=0,\qquad
\partial_r\bigl(r^2J^r\bigr)=0,\qquad
\boxed{L_K(r)=L_K(r_0)}
$$

> を任意の $r,r_0>2M$ について満たす。これは**定常な外部領域のKillingエネルギーの保存**であり、非定常な蒸発過程の全時刻の光度が一定であるという結論ではない。
<!-- formal-statement-end -->

### 証明の見取り図

応力テンソルの保存とKilling方程式を組み合わせると、ベクトル流 $J$ の発散が零です。Schwarzschild座標の体積要素は $\sqrt{|g|}=r^2\sin\theta$ なので、時間・角度への依存が消えれば半径微分だけが残ります。

<!-- proof-start -->
### 証明

積の共変微分と $J^a=-T^{ab}\xi_b$ を用い

$$
\begin{aligned}
\nabla_aJ^a
&=-(\nabla_aT^{ab})\xi_b-T^{ab}\nabla_a\xi_b\\
&=-\frac12 T^{ab}(\nabla_a\xi_b+\nabla_b\xi_a)=0.
\end{aligned}
$$

第1項は仮定 $\nabla_aT^{ab}=0$、第2項は $T^{ab}=T^{ba}$ とKilling方程式で零です。座標での発散の公式に $\sqrt{|g|}=r^2\sin\theta$ を代入すると

$$
\nabla_aJ^a=\frac{1}{r^2\sin\theta}
\partial_a\bigl(r^2\sin\theta\,J^a\bigr).
$$

$J$ は時間並進・球対称に不変なので、$t,\theta,\varphi$ 方向の発散項は零です（球面上での滑らかな球対称接ベクトル成分も零）。従って

$$
0=\frac{1}{r^2}\frac{d}{dr}(r^2J^r),
\quad\Rightarrow\quad r^2J^r=C
$$

となり、$L_K(r)=4\pi C$ は半径に依存しません。$\square$
<!-- proof-end -->

<a id="prop-qcurv15-local-flux"></a>

<!-- formal-statement-start -->
> **命題（静止局所流束と遠方光度の関係）**
> [前定理](#thm-qcurv15-luminosity-conservation)の条件で、$r>2M$ に静止する単位時間的観測者と外向き単位空間方向

$$
u_{\rm stat}=f^{-1/2}\partial_t,\qquad
e_{\hat r}=\sqrt f\,\partial_r
$$

> による外向き局所エネルギー流密度を次で定める。

$$
F_{\rm loc}:=q_u^a(e_{\hat r})_a
=-T_{ab}u_{\rm stat}^a e_{\hat r}^b.
$$

> このとき

$$
\boxed{J^r=f(r)F_{\rm loc}(r),\qquad
L_K=4\pi r^2 f(r)F_{\rm loc}(r).}
$$

> 特に定常な非零Killing光度について $F_{\rm loc}=L_K/(4\pi r^2f)$。この式は**静止枠**についてのもので、地平線上の静止観測者や自由落下観測者への代入は認められない。
<!-- formal-statement-end -->

### 証明の見取り図

静止正規直交枠では、局所流束は応力テンソルの時間・半径の混合成分です。これを座標成分へ戻すと二つの時計・距離変換因子が現れ、$J^r$ との差が $f$ になります。

<!-- proof-start -->
### 証明

$u_{\rm stat}^t=f^{-1/2}$、$e_{\hat r}^r=f^{1/2}$ なので、規格化は $g(u,u)=-f\cdot f^{-1}=-1$、$g(e,e)=f^{-1}\cdot f=1$、$g(u,e)=0$ です。[観測者の流束](#def-qcurv15-observer-measurements)を使うと

$$
F_{\rm loc}=-T_{tr}\,f^{-1/2}f^{1/2}=-T_{tr}.
$$

他方 $\xi^t=1$、$T^r{}_t=g^{rr}T_{rt}=fT_{tr}$ より

$$
J^r=-T^r{}_t=-fT_{tr}=fF_{\rm loc}.
$$

これを[Killing光度の定義](#def-qcurv15-killing-luminosity)へ代入すれば $L_K=4\pi r^2fF_{\rm loc}$ です。$\square$
<!-- proof-end -->

**読み方**：$F_{\rm loc}$ は静止観測者の**固有エネルギー・固有時間・局所面積**で測る量、$L_K$ は無限遠で規格化した**Killingエネルギー・Killing時間**で測る量です。$f$ はエネルギーと時間の赤方偏移がそれぞれ $\sqrt f$ を与える結果でもあります。[QCURV14のTolman則](../QCURV14/index.md#thm-qcurv14-tolman)の温度の赤方偏移と混同せず、今回は**応力テンソルの流束成分**を計算しています。

同じ外部で定常な[Unruh状態の遠方流束](../QCURV13/index.md#thm-qcurv13-state-flux)は、質量零スカラーについて[QCURV12の灰色体因子付き結果](../QCURV12/index.md#thm-qcurv12-greybody-flux)と一致する条件では

$$
L_\infty=\frac{1}{2\pi}\sum_{\ell=0}^{\infty}(2\ell+1)
\int_0^\infty
\frac{\omega\,\Gamma_\ell(\omega)}
{e^{\omega/T_H}-1}\,d\omega,\qquad T_H=\frac1{8\pi M}
$$

で表されます。$\Gamma_\ell$ は無限遠へ到達する透過確率です。近地平線の局所熱因子だけからこの遠方光度が出るわけではありません。定常外部の光度保存は、この式の**値そのもの**や状態選択を代わりに導出する定理ではありません。

## 5. 保存・Hadamard性・くりこみの「保証すること」を分ける

### 5.1 局所値には規約、状態差には相殺がある

[MICA15の保存的点分離構成](../../../解析系/MICA/MICA15/index.md#def-mica15-renormalized-stress)は、単に $W_\omega-H_{\ell,\infty}$ を微分して終わりではありません。Hadamard parametrix は一般に正確な双解ではないため、状態非依存の**保存用局所補正**が要ります。さらに4次元で適切な局所共変性・スケーリング等を課しても、[有限なくりこみ自由度](../../../解析系/MICA/MICA15/index.md#thm-mica15-finite-freedom)

$$
\Delta_{\rm scheme}T_{ab}
=\alpha_1m^4g_{ab}+\alpha_2m^2G_{ab}
+\alpha_3I_{ab}+\alpha_4J_{ab}^{\rm(curv)}
$$

が残ります。最後の $J_{ab}^{\rm(curv)}$ は曲率二乗作用からの保存テンソルで、前節の**エネルギー流 $J^a$ とは別記号**です。この四項の分類は記載した公理を置いた4次元での結果であり、何でも好きな関数を加えてよい意味ではありません。

同じ背景・同じ規約で二状態を引けば、こうした状態非依存項は消えます。しかし**異なる背景の数値を引く**場合には幾何学的条件が違うため、この相殺をそのまま主張してはいけません。

### 5.2 Ricci平坦でも「量子補正全体が零」ではない

Schwarzschild外部では $R_{ab}=0$、$R=0$ なので $G_{ab}=0$ です。質量零なら上の $m$ を含む二項も零、Ricci曲率二乗の一次変分からできる $I_{ab},J_{ab}^{\rm(curv)}$ もこの背景では零になります。従って記載した公理の下での**有限な処方間の差**は零ですが、これは

$$
\langle T_{ab}\rangle^{\rm ren}_\omega=0
$$

を意味しません。状態に依存する放射流束は残り得ますし、曲率がある背景では量子トレース異常もあり得ます。その具体的な二次元モデルは次のQCURV16で扱う予定の論点です。

### 5.3 三状態を別の検査で比較する

| 状態 | 地平線付近での条件 | 遠方の正味光度 | 注意点 |
| --- | --- | --- | --- |
| Boulware | 永遠のSchwarzschild地平線に対して一般に特異 | 静的で正味零 | 無限遠の真空らしさから地平線正則性は出ない |
| Unruh | 崩壊後期の未来地平線での正則性に対応 | 外向き正のHawking光度 | 外部全体がKMS熱平衡とは限らない |
| Hartle–Hawking | 永遠のブラックホールの両地平線で正則 | 入射と出射が釣り合い正味零 | 局所温度があっても正味光度は零 |

これは[QCURV13の三状態の定義と流束比較](../QCURV13/index.md#thm-qcurv13-state-flux)の整理です。ある開領域でHadamard状態であること、**地平線へ正則に延長できること**、**静止検出器がKMS条件を満たすこと**、**遠方で正味放射があること**は別々の検査です。特に $r\downarrow2M$ で[静止局所流束の式](#prop-qcurv15-local-flux)が大きくなっても、そこでの静止四元速度そのものが定義できなくなるため、自由落下観測者が無限大を測るとは結論できません。

以上で、量子状態の選択から局所観測量、遠方への正味エネルギー流への橋を作りました。半古典的な背景の変化へ進むには、さらに時間依存のエネルギー収支と重力方程式の仮定が必要です。

## 6. 演習――特異部・状態差・観測枠・保存流を再計算する

### Level A：まず有限性・符号・次元を確かめる

<a id="ex-qcurv15-a01"></a>
#### QCURV15-A01 引く順序と定数双解
- Level: A
- 問題: 4次元質量零Minkowski場の二状態で $D(x,y)=\lambda$、$\lambda>0$ とする。$D$ が双解で滑らかであること、Wick平方と応力テンソルの差を求めよ。また生の $W_\omega(x,x)$ を先に評価できない理由を述べよ。

<!-- solution-start -->
**詳細解答**：定数だから $\Box_xD=\Box_yD=0$、すべての偏導関数は連続で $D\in C^\infty$ です。[二状態差の定義](#def-qcurv15-observable-difference)で $D(x,x)=\lambda$。質量・曲率が零で微分はすべて零なので $\mathcal D_{ab}D=0$。従って

$$
\Delta\langle\phi^2\rangle=\lambda,\qquad\Delta T_{ab}=0.
$$

一方、生の真空二点分布は等時刻・空間距離 $r>0$ で $1/(4\pi^2r^2)$ となり、$r\downarrow0$ で発散します。[生の対角引き戻しの障害](../../../解析系/MICA/MICA14/index.md#prop-mica14-diagonal-obstruction)もあります。個々を対角で評価してから差を取る式は成立せず、**分布の差を先に取る**のが正しい手順です。
<!-- solution-end -->

<a id="ex-qcurv15-a02"></a>
#### QCURV15-A02 熱的Wick平方の係数
- Level: A
- 問題: $\beta>0$、$n_\beta(\omega)=(e^{\beta\omega}-1)^{-1}$ とする。$\int_0^\infty\omega n_\beta(\omega)d\omega$ を幾何級数から計算し、$\Delta_\beta\langle\phi^2\rangle$ とその長さ次元を求めよ。$\sum_{j\ge1}j^{-2}=\pi^2/6$ は用いてよい。

<!-- solution-start -->
**詳細解答**：$\omega>0$ で $n_\beta=\sum_{j\ge1}e^{-j\beta\omega}$。非負項なので和と積分を交換し

$$
\begin{aligned}
\int_0^\infty\omega n_\beta\,d\omega
&=\sum_{j\ge1}\int_0^\infty\omega e^{-j\beta\omega}\,d\omega\\
&=\sum_{j\ge1}(j\beta)^{-2}
=\frac{\pi^2}{6\beta^2}.
\end{aligned}
$$

3次元の角度積分による係数 $1/(2\pi^2)$ を掛け、
$\Delta_\beta\langle\phi^2\rangle=1/(12\beta^2)$。$\beta$ は逆エネルギー、自然単位で長さの次元 $L$ なので結果は $L^{-2}$。発散する零点項を含んだ値ではありません。
<!-- solution-end -->

<a id="ex-qcurv15-a03"></a>
#### QCURV15-A03 空間流束の符号
- Level: A
- 問題: Minkowski慣性座標で $u^a=(1,0,0,0)$、対称テンソル $T_{ab}$ の時間・空間混合成分が $T_{0z}=-F$、$F>0$ とする。$u$ が単位時間的であることを確認し、[観測者の定義](#def-qcurv15-observer-measurements)から $q^{z}$ を計算せよ。

<!-- solution-start -->
**詳細解答**：計量符号 $(-,+,+,+)$ なので $u_au^a=-1$、$u_a=(-1,0,0,0)$ です。空間射影は $h^z{}_z=1$、$h^z{}_0=0$。$T^{z0}=\eta^{zz}\eta^{00}T_{z0}=-T_{z0}=F$ です。よって

$$
q^z=-h^z{}_cT^{cd}u_d
=-T^{z0}(-1)=F>0.
$$

上付き混合成分と下付き混合成分の符号を取り違えると、外向き流束が負になってしまいます。
<!-- solution-end -->

<a id="ex-qcurv15-a04"></a>
#### QCURV15-A04 Killing流の球面積因子
- Level: A
- 問題: Schwarzschild外部で定常・球対称な保存エネルギー流が $J^r=C/r^2$（$C$ は実定数）を持つとする。$\nabla_aJ^a=0$ を直接確かめ、$L_K$ を求めよ。$C>0$ はどちら向きの流れか。

<!-- solution-start -->
**詳細解答**：$\sqrt{|g|}=r^2\sin\theta$ で、時間と角度への依存がないので

$$
\nabla_aJ^a
=\frac1{r^2}\partial_r(r^2J^r)
=\frac1{r^2}\partial_r C=0.
$$

球面積分は $L_K=\int r^2(C/r^2)d\Omega=4\pi C$。$C>0$ なら $J^r>0$ なので外向きのKillingエネルギー流です。この計算は**保存流の条件確認**であり、任意の $C$ の流れを実現する量子状態が存在するという主張ではありません。
<!-- solution-end -->

### Level B：熱状態を実際の測定値に換える

<a id="ex-qcurv15-b01"></a>
#### QCURV15-B01 熱的応力テンソルの三つの検算
- Level: B
- 問題: 質量零Minkowski熱状態の $D_\beta$ を本文から用い、$\partial_{t_x}\partial_{t_y}D_\beta|_{x=y}$、$\sum_i\partial_{x^i}\partial_{y^i}D_\beta|_{x=y}$ を別々に計算せよ。$\rho$、$p$、トレース、保存則を確認せよ。$\sum_{j\ge1}j^{-4}=\pi^4/90$ は用いてよい。

<!-- solution-start -->
**詳細解答**：位相 $\theta=\omega\Delta t-\boldsymbol k\cdot\Delta\boldsymbol x$ の混合微分は時間で $\omega^2\cos\theta$、各空間成分で $k_i^2\cos\theta$ です。対角では $\cos0=1$ だから

$$
\begin{aligned}
K_t&=\int\frac{d^3k}{(2\pi)^3}\omega n_\beta(\omega)
=\frac1{2\pi^2}\int_0^\infty\omega^3n_\beta\,d\omega,\\
K_s&=\int\frac{d^3k}{(2\pi)^3}
\frac{n_\beta}{\omega}\sum_i k_i^2
=K_t
\end{aligned}
$$

となります。$\sum_j e^{-j\beta\omega}$ と
$\int_0^\infty\omega^3e^{-s\omega}d\omega=6/s^4$ より

$$
K_t=\frac{6}{2\pi^2\beta^4}\cdot\frac{\pi^4}{90}
=\frac{\pi^2}{30\beta^4}.
$$

$T_{00}$ は $(K_t+K_s)/2=K_t$。空間成分では回転対称性から $T_{ij}=\delta_{ij}K_s/3$、従って $p=\rho/3$。非対角成分は角度積分で零です。$\eta^{ab}T_{ab}=-\rho+3p=0$、各成分は座標に依存しないので $\partial^aT_{ab}=0$ です。
<!-- solution-end -->

<a id="ex-qcurv15-b02"></a>
#### QCURV15-B02 動く観測者は何を読むか
- Level: B
- 問題: $\eta_{ab}=\operatorname{diag}(-1,1,1,1)$、熱状態差 $T_{ab}=\operatorname{diag}(\rho,\rho/3,\rho/3,\rho/3)$ とする。速度 $v=3/5$ で $+z$ へ動く観測者に対し $\rho_{u'}$ と正規直交枠の $q^{\hat z}_{u'}$ を $\rho$ で求めよ。状態が変わったのかも述べよ。

<!-- solution-start -->
**詳細解答**：$\gamma=(1-9/25)^{-1/2}=5/4$、$u'^a=(5/4,0,0,3/4)$ です。空間軸 $e_{\hat z}^a=(3/4,0,0,5/4)$ は内積 $g(u',e)=-(5/4)(3/4)+(3/4)(5/4)=0$、$g(e,e)=-(3/4)^2+(5/4)^2=1$。従って

$$
\begin{aligned}
\rho_{u'}&=\gamma^2(\rho+v^2\rho/3)
=\frac{25}{16}\left(1+\frac3{25}\right)\rho
=\frac74\rho,\\
q^{\hat z}_{u'}&=-\gamma^2v(\rho+\rho/3)
=-\frac{25}{16}\cdot\frac35\cdot\frac43\rho
=-\frac54\rho.
\end{aligned}
$$

流れは観測者から見て $-z$ 方向です。テンソルと状態は同じであり、観測者の四元速度と正規直交枠だけを変更しました。
<!-- solution-end -->

<a id="ex-qcurv15-b03"></a>
#### QCURV15-B03 Schwarzschildの局所流束の半径依存
- Level: B
- 問題: 定常球対称な正のKilling光度 $L_0$ が $r>2M$ で一定だとする。$r_1=4M$ と $r_2=8M$ の静止局所流束の比 $F_{\rm loc}(4M)/F_{\rm loc}(8M)$ を求め、$r\downarrow2M$ の極限の意味を述べよ。

<!-- solution-start -->
**詳細解答**：[静止局所流束の命題](#prop-qcurv15-local-flux)で $F_{\rm loc}(r)=L_0/(4\pi r^2f(r))$。$f(4M)=1/2$、$f(8M)=3/4$ なので

$$
\frac{F_{\rm loc}(4M)}{F_{\rm loc}(8M)}
=\frac{(8M)^2f(8M)}{(4M)^2f(4M)}
=\frac{64M^2(3/4)}{16M^2(1/2)}=6.
$$

正の固定 $L_0$ に対して $r\downarrow2M$ では $1/f$ が増大します。しかし $u_{\rm stat}=\partial_t/\sqrt f$ 自体が地平線で単位時間的に定義されません。この発散を、地平線横断の自由落下枠の応力テンソル特異性と同一視してはいけません。
<!-- solution-end -->

<a id="ex-qcurv15-b04"></a>
#### QCURV15-B04 くりこみ自由度と状態差
- Level: B
- 問題: [MICA15の有限自由度](../../../解析系/MICA/MICA15/index.md#thm-mica15-finite-freedom)を前提に、(i) 同じ曲がった背景・同じ規約で二状態を引いた場合、(ii) 質量零Schwarzschild外部で二つの許容処方を比較した場合、(iii) 一つのSchwarzschild状態の期待値が零かを問う場合を区別して答えよ。

<!-- solution-start -->
**詳細解答**：(i) 両状態へ共通の $\alpha_1m^4g_{ab}+\alpha_2m^2G_{ab}+\alpha_3I_{ab}+\alpha_4J_{ab}^{\rm(curv)}$ を加えても、差では同一項が相殺します。[状態差の命題](#prop-qcurv15-observer-difference)もその射影について不変です。

(ii) $m=0$ で質量項は零。Schwarzschildは $R_{ab}=R=0$ だから $G_{ab}=0$、Ricci曲率二乗作用の一次変分からできる $I,J^{\rm(curv)}$ も零です。従って**挙げられた公理の下での処方間の有限な差**は零です。

(iii) (ii) は異なる処方の**差**が零という主張であり、ある状態の $\langle T_{ab}\rangle^{\rm ren}$ が零という結論を含みません。Unruh状態では実際に遠方への正味光度があり得ます。またHadamard性だけでは地平線への延長正則性を保証しません。
<!-- solution-end -->

### Level C：状態・温度・局所エネルギー・遠方光度を一本につなぐ

<a id="ex-qcurv15-c01"></a>
#### QCURV15-C01 定常放射と平衡を混同しない総合問題
- Level: C
- 問題: 質量零スカラー場のSchwarzschild外部 $r>2M$、$T_H=1/(8\pi M)$ とする。次の問いに答えよ。

  1. 4次元Minkowskiの真の熱平衡状態では $\Delta\langle\phi^2\rangle$、$\rho$ は温度の何乗かを示し、二つの係数も書け。
  2. Schwarzschildで静的な単位四元速度・半径軸を定義し、定常球対称な保存テンソルの $J^r$ と局所流束の関係を導け。
  3. Unruh状態の遠方正味光度に灰色体因子が入る理由をQCURV12の散乱から説明せよ。
  4. Hartle–Hawking状態のTolman温度が正でも正味光度が零の理由、およびこの結果から一般の蒸発時空の局所応力が分かるかを論じよ。

<!-- solution-start -->
**詳細解答**：

(1) [熱状態の定理](#thm-qcurv15-thermal-observables)で $\beta=T^{-1}$ とおくと

$$
\Delta\langle\phi^2\rangle=\frac{T^2}{12},
\qquad \rho=\frac{\pi^2T^4}{30},\quad p=\rho/3.
$$

$T^2$ と $T^4$ の違いは、二点分布の対角値に対して応力テンソルが二階の双微分を含み、モード積分の被積分関数に $\omega^2$ が増えるためです。真空の発散項を個別に対角評価したわけではありません。

(2) $f=1-2M/r>0$ で $u=f^{-1/2}\partial_t$、$e_{\hat r}=f^{1/2}\partial_r$。$g(u,u)=-1$、$g(e,e)=1$、$g(u,e)=0$ が成り立ちます。$F_{\rm loc}=-T_{tr}$ で、$T^r{}_t=fT_{rt}$ から

$$
J^r=-T^r{}_t=fF_{\rm loc},
\qquad L_K=4\pi r^2fF_{\rm loc}.
$$

保存とKilling方程式により $\nabla_aJ^a=0$。時間・球対称のもと $\partial_r(r^2J^r)=0$ なので $L_K$ は半径一定です。保存則の証明で状態が本当に定常である仮定を使用しました。

(3) 地平線近傍で得られるHawking占有数は、そのまま全周波数が無損失で無限遠に達することを意味しません。[QCURV12の散乱障壁](../QCURV12/index.md#thm-qcurv12-greybody-flux)で各 $(\ell,\omega)$ の透過率 $\Gamma_\ell(\omega)\in[0,1]$ を掛け、

$$
L_\infty=\frac1{2\pi}\sum_{\ell=0}^\infty(2\ell+1)
\int_0^\infty\frac{\omega\,\Gamma_\ell(\omega)}
{e^{\omega/T_H}-1}\,d\omega
$$

を得ます。これは固定背景・指定場・後期定常近似の無限遠光度です。

(4) [QCURV14のTolman則](../QCURV14/index.md#thm-qcurv14-tolman)によれば、Hartle–Hawking状態の静止時計は $T_H/\sqrt f$ の局所KMS温度を持ちます。しかし熱平衡では入射と出射が釣り合い、正味 $J^r$ は零です。Unruh状態の外向き流束とは異なります。さらにKMS温度、正味Killing光度、局所の $T_{ab}$ は異なる情報であり、[MICA15の局所保存補正](../../../解析系/MICA/MICA15/index.md#def-mica15-renormalized-stress)と状態の詳細が必要です。定常外部の式だけから時間依存の蒸発全体や量子重力的終期の期待値は導けません。
<!-- solution-end -->

## 7. 次へ進むためのチェック

- 二点分布の生の対角値と、**先に減算した滑らかな状態差**の対角値は違う操作である。
- Minkowski熱状態で $\Delta\langle\phi^2\rangle=T^2/12$、$\rho=\pi^2T^4/30$ を独立に計算できる。
- $\rho_u$ と $q_u^a$ は同じテンソルでも観測者によって変わり、$q^{\hat i}=-T_{\hat0\hat i}$ の符号を落とさない。
- 保存的な $T_{ab}$ とKilling場から $L_K=4\pi r^2 fF_{\rm loc}$ を導ける。$r=2M$ に静止単位時計は存在しない。
- Hadamard性・くりこみ規約・地平線正則性・KMS性・遠方の正味流束を、それぞれ別の仮定として判定できる。

次はQCURV16で、$1+1$次元の共形null座標模型を通じて**Schwarzian微分と流束**を計算します。今回の4次元熱状態や灰色体因子付き遠方光度との違いを、状態と次元を指定して比較します。

## 参考文献

- R. M. Wald, *Quantum Field Theory in Curved Spacetime and Black Hole Thermodynamics* (1994), University of Chicago Press（局所観測量と保存則）。
- S. Hollands and R. M. Wald, [*Local Wick Polynomials and Time Ordered Products of Quantum Fields in Curved Spacetime*](https://arxiv.org/abs/gr-qc/0103074)（局所共変なくりこみと自由度）。
- V. Moretti, [*Comments on the Stress-Energy Tensor Operator in Curved Spacetime*](https://doi.org/10.1007/s00220-002-0702-7)（保存的点分離構成）。
- N. D. Birrell and P. C. W. Davies, *Quantum Fields in Curved Space* (1982), Cambridge University Press（状態と応力テンソルの物理）。
