# FLUID6 Bernoulli積分はどこで成立するか

**前提講座（直接）**：[FLUID5 検査体積と質量収支](../FLUID5/index.md#thm-fluid5-moving-mass)、[CTM7 局所運動量方程式](../../CTM/CTM7/index.md#thm-ctm7-material-momentum)。**FLUID5 を通じた既習定義**：[FLUID4 の流線](../FLUID4/index.md#def-fluid4-streamline)

[FLUID5 の運動量収支](../FLUID5/index.md#thm-fluid5-moving-momentum)は検査面を通る力や運動量を計算できた。しかし、管の途中の**二点の圧力と速さ**を知りたいだけなら、検査体積全体の面力を毎回求めるのは遠回りである。「速いところほど圧力が低い」という言い回しが使えるのは、どの流れの、どの二点なのだろうか。

本講では[CTM7 の物質加速度を含む運動方程式](../../CTM/CTM7/index.md#thm-ctm7-material-momentum)から、圧力・速さ・高さを一つにまとめる *Bernoulli 積分*を導く。流線に沿う保存と領域全体の保存を区別し、渦・時間変化・粘性で何が壊れるかを追う。数式だけの結論を流体すべてへ拡張してはいけない。

## 0. 先に決める模型・単位と速度の意味

位置 $x=(x,y,z)$ [m] の開領域 $\Omega\subset\mathbb R^3$ と時間区間 $I$ を考える。速度 $u(x,t)$ [m/s]、密度 $\rho>0$ [kg/m$^3$]、圧力 $p(x,t)$ [Pa] とし、以下の主要な積分では $\rho$ は**空間・時間とも一定の正定数**とする。$u$ は空間 $C^2$ 級かつ時間 $C^1$ 級、$p$ と後述の $\Phi$ は空間 $C^1$ 級とし、必要な式が各点で成立すると仮定する。境界面のある応用ではその近くまで場が連続に延長できるものとする。直交座標の各正方向の単位ベクトルを $e_x,e_y,e_z$ と記す。

[CTM7 で使った物質微分](../../CTM/CTM7/index.md#thm-ctm7-material-momentum)は

$$
D_tu=\partial_tu+(u\cdot\nabla)u
$$

である。$\partial_t$ は位置を固定して測る時間変化、$(u\cdot\nabla)u$ は流れに沿って場所が変わる効果であり、別々の項である。流れが**定常**とは $\partial_tu=\partial_tp=0$（本講の一定密度・時間に依存しない外力の場合）をいう。定常でも $(u\cdot\nabla)u$ が零とは限らない。

[FLUID5 の連続の式](../FLUID5/index.md#thm-fluid5-moving-mass)は $\partial_t\rho+\nabla\cdot(\rho u)=0$ だから、一定密度では $\nabla\cdot u=0$ も要求する。運動量式だけが合えば現実の流体解になった、とは判定しない。

### 0.1 どの力を消しているのか

理想流体の「非粘性」は、[Cauchy の応力定理](../../CTM/CTM6/index.md#thm-ctm6-cauchy-stress)で表す接触面の単位面積当たりの力 $t(n)=\sigma n$ が、任意の単位法線 $n$ に対し **$t(n)=-pn$** となる模型である。三次元単位行列 $I_3$ を使えば $(-pI_3)n=-pn$ がすべての $n$ で成立するため、応力テンソルの表現は $\sigma=-pI_3$ となる。つまり力は法線方向だけで、接線方向の粘性せん断力を模型に含めない。

もう一つ、単位質量当たり体積力 $b$ [m/s$^2$] を、位置だけに依存するスカラー場 $\Phi$ [m$^2$/s$^2$] で表す場合を考える。関係式が

$$
b=-\nabla\Phi
$$

となる力を**保存体積力**と呼ぶ。この符号では、重力 $b=-ge_z$（$z$ 上向き、$g>0$）のポテンシャルは $\Phi=gz$ である。

まずこの二条件を直接確かめられる模型として固定する。

<a id="def-fluid6-ideal-potential-force"></a>

<!-- formal-statement-start -->
### 定義（非粘性・保存体積力の模型）

$\Omega\subset\mathbb R^3$ を開集合、$I$ を時間区間とする。$\rho>0$ は定数、$u,p$ は上記の正則性を持ち、応力と単位質量当たりの体積力が

$$
\sigma(x,t)=-p(x,t)I_3,\qquad
b(x,t)=-\nabla\Phi(x)
$$

（$\Phi\in C^1(\Omega)$）で与えられるとき、本講では**非粘性・保存体積力の模型**という。流体がこの模型の運動量式と質量保存を満たすかどうかは、別途確かめる。
<!-- formal-statement-end -->

<!-- definition-example-start: def-fluid6-ideal-potential-force -->
### **定義の確認**：水平な一様流

$\Omega=\mathbb R^3$、$u=Ue_x$（$U>0$ は定数）、$\rho=\rho_0>0$、$p=p_0$、$\Phi=0$ とする。任意の単位法線 $n$ に対して $\sigma n=(-p_0I_3)n=-p_0n$ だから、接触力に接線成分はない。$\nabla\Phi=0$ より $b=0$。さらに $\nabla\cdot u=0$、$\partial_tu=0$、$(u\cdot\nabla)u=0$、$\nabla p=0$ なので質量保存・運動量式の双方が成立する。$\sigma=-pI_3$ と書けるだけで運動方程式を確かめたことにはならない、という区別にも注意する。
<!-- definition-example-end -->

## 1. Euler 運動方程式：圧力勾配と加速度を結ぶ

[CTM7 の局所運動量方程式](../../CTM/CTM7/index.md#thm-ctm7-material-momentum)は $\rho D_tu=\nabla\cdot\sigma+\rho b$ である。応力が $-pI_3$ なら $\nabla\cdot\sigma=-\nabla p$。ここに保存力を入れると、速度を直接未知関数とする方程式が得られる。

<a id="thm-fluid6-euler-equation"></a>

<!-- formal-statement-start -->
### 定理（一定密度・非粘性流体の Euler 運動方程式）

開領域 $\Omega\subset\mathbb R^3$、時間区間 $I$ で $\rho>0$ を一定とし、$u,p,\Phi$ は第0節の正則性を持つとする。古典的 Cauchy 連続体の局所運動量収支を満たし、応力が $\sigma=-pI_3$、単位質量当たりの体積力が $b=-\nabla\Phi$ なら、各 $(x,t)\in\Omega\times I$ で

$$
\boxed{\partial_tu+(u\cdot\nabla)u
=-\frac1\rho\nabla p-\nabla\Phi}
$$

が成立する。質量保存も仮定する場合はさらに $\nabla\cdot u=0$ である。
<!-- formal-statement-end -->

### 証明の見取り図

物質微分の二項を開き、応力の発散を各座標成分で計算してから、$\rho>0$ で割る。定常性は**まだ使わない**。

<!-- proof-start -->
### 証明

[CTM7 の局所運動量式](../../CTM/CTM7/index.md#thm-ctm7-material-momentum)に第 $i$ 成分で $\sigma_{ij}=-p\delta_{ij}$ を代入する。$\delta_{ij}$ は $i=j$ なら $1$、それ以外は $0$ の Kronecker 記号である。以下の $\sum_j$ は $j=1,2,3$ についての明示的な和を表す。

$$
\begin{aligned}
\rho\left(\partial_tu_i+\sum_j u_j\partial_ju_i\right)
&=\sum_j\partial_j(-p\delta_{ij})+\rho b_i\\
&=-\sum_j\delta_{ij}\partial_jp-\rho\partial_i\Phi\\
&=-\partial_ip-\rho\partial_i\Phi.
\end{aligned}
$$

$\rho>0$ で割り、$i=1,2,3$ を束ねると結論を得る。質量保存には[連続の式](../FLUID5/index.md#thm-fluid5-moving-mass)を使い、$\partial_t\rho=0$、$\nabla\rho=0$ から $\rho\nabla\cdot u=0$、従って $\nabla\cdot u=0$ である。
<!-- proof-end -->

この段階では**非定常でも**方程式が成立する。ところが「圧力と速さの和が一定」と結論するには、移流加速度を速度の二乗の勾配へ読み替える必要がある。

## 2. 速度の二乗と渦度：何が勾配に残るか

速度の空間的な回転を表す**渦度**を $\omega=\nabla\times u$ と書く。ここで $\nabla\times$ は直交座標での回転演算子であり、例えば平面流 $u=(u_x,u_y,0)$ なら $\omega=(0,0,\partial_xu_y-\partial_yu_x)$ である。$\omega=0$ を**渦なし**と呼ぶ（より広い渦度理論は FLUID8 で扱う）。成分計算では[VC7 の Levi–Civita 記号](../../../幾何系/VC/VC7/index.md#def-vc7-epsilon) $\varepsilon_{ijk}$（添字が $1,2,3$ の偶置換なら $1$、奇置換なら $-1$、重複すれば $0$）を使い、$\omega_k=\sum_{\ell,m}\varepsilon_{k\ell m}\partial_\ell u_m$ と表す。本講ではこの定義で計算できる滑らかな場に限る。

まず移流加速度と速度の二乗の勾配を成分ごとに微分すると

$$
\left((u\cdot\nabla)u\right)_i
=\sum_j u_j\partial_ju_i,\qquad
\partial_i\frac{|u|^2}{2}
=\sum_j u_j\partial_iu_j.
$$

次に[VC7 の Levi–Civita 記号の縮約公式](../../../幾何系/VC/VC7/index.md#prop-vc7-epsilon-contraction)を使う。$\varepsilon_{ijk}=\varepsilon_{kij}$（循環置換）だから、和を取る添字 $k$ について

$$
\sum_k\varepsilon_{ijk}\varepsilon_{k\ell m}
=\delta_{i\ell}\delta_{jm}-\delta_{im}\delta_{j\ell}.
$$

従って外積の第 $i$ 成分は

$$
\begin{aligned}
(u\times\omega)_i
&=\sum_{j,k}\varepsilon_{ijk}u_j\omega_k\\
&=\sum_{j,k,\ell,m}\varepsilon_{ijk}\varepsilon_{k\ell m}u_j\partial_\ell u_m\\
&=\sum_j u_j(\partial_i u_j-\partial_j u_i).
\end{aligned}
$$

最後の等号では、例えば $\sum_{\ell,m}\delta_{i\ell}\delta_{jm}\partial_\ell u_m=\partial_i u_j$ として Kronecker 記号が成分を選ぶことを使った。速度二乗の勾配からこの外積を引くと $\sum_j u_j\partial_ju_i$ だけが残り、

$$
\boxed{(u\cdot\nabla)u
=\nabla\left(\frac{|u|^2}{2}\right)-u\times\omega}
$$

を得る。$\omega$ を零と**決めつけず**残すことが、流線上と領域全体の区別につながる。

### 2.1 三つの量を一つにまとめる

圧力を密度で割ると m$^2$/s$^2$、速さの二乗も m$^2$/s$^2$、位置ポテンシャル $\Phi$ も同じ単位である。そこでこの三つをまとめる。これは**単位質量当たり**の量であり、熱力学的な全エネルギー保存式そのものではない。

<a id="def-fluid6-bernoulli-function"></a>

<!-- formal-statement-start -->
### 定義（一定密度の Bernoulli 関数）

$\rho>0$ が定数である開領域 $\Omega$ の流速 $u$、圧力 $p$、保存体積力ポテンシャル $\Phi$ に対して

$$
\boxed{B(x,t)=\frac{p(x,t)}{\rho}
+\frac{|u(x,t)|^2}{2}+\Phi(x)}
$$

を**Bernoulli 関数**と呼ぶ。その単位は J/kg = m$^2$/s$^2$ である。この定義だけで $B$ が保存されるわけではない。
<!-- formal-statement-end -->

<!-- definition-example-start: def-fluid6-bernoulli-function -->
### **定義の確認**：数値と単位を確かめる

水の近似として $\rho=1000$ kg/m$^3$、$p=2.00\times10^5$ Pa、$|u|=4$ m/s、$\Phi=gz=9.8\times3=29.4$ m$^2$/s$^2$ を取る。各項は

$$
\frac p\rho=200,\qquad
\frac{|u|^2}{2}=8,\qquad
\Phi=29.4
$$

（いずれも m$^2$/s$^2$）で、$B=237.4$ m$^2$/s$^2$。$200$ Pa や $8$ m/s と足したのではなく、三項を同じ**単位質量当たりのエネルギー次元**に直したことを確認した。
<!-- definition-example-end -->

[Euler 運動方程式](#thm-fluid6-euler-equation)に前節のベクトル恒等式を代入する。$\rho$ が定数であるため $(1/\rho)\nabla p=\nabla(p/\rho)$、そして $\Phi$ は位置のみの関数である。よって

$$
\partial_tu+\nabla\left(\frac{|u|^2}{2}\right)-u\times\omega
=-\nabla\left(\frac p\rho+\Phi\right),
$$

$$
\boxed{\partial_tu+\nabla B=u\times\omega.}
$$

この式こそ、Bernoulli 積分の仮定と例外を見分けるための中心式である。

## 3. 定常なら流線上で一定、渦なしなら領域で一定

定常な速度場では[FLUID4 の流線](../FLUID4/index.md#def-fluid4-streamline)は $\gamma'(s)=u(\gamma(s))$ で与えられる（$s$ は秒の次元を持つ曲線の補助パラメータで、物理時刻 $t$ とは別である）。$\gamma$ に沿った $B$ の変化は連鎖律で $\frac{d}{ds}B(\gamma(s))=\nabla B(\gamma(s))\cdot\gamma'(s)$ である。速度 $u$ とベクトル $u\times\omega$ は直交するので、渦が存在しても流線に沿う変化は消える。

<a id="thm-fluid6-streamline-bernoulli"></a>

<!-- formal-statement-start -->
### 定理（定常 Bernoulli 積分：一つの流線上）

開領域 $\Omega\subset\mathbb R^3$ の時間に依存しない $C^2$ 級速度場 $u$、$C^1$ 級圧力場 $p$、$C^1$ 級ポテンシャル $\Phi$ と一定の $\rho>0$ が、$\sigma=-pI_3$、$b=-\nabla\Phi$ のもとで[定常 Euler 運動方程式](#thm-fluid6-euler-equation)を満たすとする。流線 $\gamma:J\to\Omega$ が $\gamma'(s)=u(\gamma(s))$ を満たすなら、**各連結なパラメータ区間 $J$** で

$$
\boxed{B(\gamma(s))
=\frac{p(\gamma(s))}{\rho}
+\frac{|u(\gamma(s))|^2}{2}
+\Phi(\gamma(s))=C_\gamma}
$$

となる。定数 $C_\gamma$ は流線によって異なってよい。渦なしは仮定しない。
<!-- formal-statement-end -->

### 証明の見取り図

[中心式](#def-fluid6-bernoulli-function)で定常項 $\partial_tu$ を消し、流線に沿う連鎖律を使う。**$(u\times\omega)\cdot u=0$** という直交性が、渦を残したまま流線方向の変化を消す。

<!-- proof-start -->
### 証明

[Euler 方程式](#thm-fluid6-euler-equation)の移流加速度に第2節で成分を計算した式を代入する。定常では $\partial_tu=0$ だから

$$
\nabla B=u\times\omega.
$$

[流線の定義](../FLUID4/index.md#def-fluid4-streamline)で $\gamma'(s)=u(\gamma(s))$ である。$B\in C^1$ と $\gamma$ の微分可能性から、各 $s\in J$ について

$$
\begin{aligned}
\frac{d}{ds}B(\gamma(s))
&=\nabla B(\gamma(s))\cdot\gamma'(s)\\
&=(u(\gamma(s))\times\omega(\gamma(s)))\cdot u(\gamma(s))\\
&=0.
\end{aligned}
$$

実数値 $C^1$ 関数が連結な区間上で導関数零なら一定だから、$B\circ\gamma=C_\gamma$ となる。よどみ点 $u=0$ の定数流線でも上の等式は成立するが、その点を経由して異なる流線間の定数が一致するとは、この議論だけでは言えない。
<!-- proof-end -->

### 反例：異なる流線間で定数を共有できない

$\Omega=\mathbb R\times(-1,1)\times\mathbb R$ とし、$U_0>1$ [m/s] の定数を用いて $u=(U_0+y\,{\rm s}^{-1},0,0)$ とする。単位が混ざらないよう、以降は座標 $y$ を m で測り、数値例として $u=(2+y,0,0)$ m/s（$y$ の数値は m 単位）と書く。厳密には $u_x=2\,{\rm m/s}+(1\,{\rm s}^{-1})y$ である。$p=p_0$ 一定、$\Phi=0$、$\rho>0$ 一定とする。

$$
\nabla\cdot u=0,\quad
\partial_tu=0,\quad
(u\cdot\nabla)u=(2+y)\partial_xu=0,\quad
\nabla p=0.
$$

よって[Euler 方程式](#thm-fluid6-euler-equation)と質量保存をともに満たす。流線は $y=y_0,z=z_0$ の直線であり、$B=p_0/\rho+(2+y_0)^2/2$ はその直線上では一定。しかし $\omega=(0,0,-1)$（数値は s$^{-1}$）、$\nabla B=(0,2+y,0)\ne0$ なので、$y_0$ の異なる流線で $C_\gamma$ は異なる。**定常であるだけでは、二本の流線の Bernoulli 定数を等置できない。**

### 3.1 渦がない場合にだけ何が強まるか

流線ごとの積分値を一つにまとめたい。上の中心式を見れば、その十分条件が $\omega=0$ だと分かる。ただし「渦なし」は力学的な式ではなく速度場の空間微分についての追加条件であり、領域の連結性も必要である。

<a id="cor-fluid6-global-bernoulli"></a>

<!-- formal-statement-start -->
### 系（渦なし定常流の領域全体の Bernoulli 定数）

連結な開領域 $\Omega\subset\mathbb R^3$ で、$\rho>0$ は定数、$u\in C^2(\Omega;\mathbb R^3)$、$p,\Phi\in C^1(\Omega)$ が定常・非粘性・保存体積力の Euler 方程式を満たし、さらに $\nabla\times u=0$ であるとする。このとき**同じ連結領域の全点**で

$$
\boxed{\frac p\rho+\frac{|u|^2}{2}+\Phi=C}
$$

が成立する。$C$ は位置によらない定数である。単連結性はこの結論の必要条件ではない。
<!-- formal-statement-end -->

### 証明の見取り図

流線だけでなく空間の全方向に $B$ の勾配が零になる。連結な開領域の二点を区分的 $C^1$ 曲線で結び、その曲線に沿って積分する。

<!-- proof-start -->
### 証明

[定常 Euler 方程式](#thm-fluid6-euler-equation)から得た $\nabla B=u\times(\nabla\times u)$ に $\nabla\times u=0$ を代入すると、$\nabla B=0$。$\Omega$ は $\mathbb R^3$ の連結な開集合なので任意の二点 $a,b\in\Omega$ を結ぶ区分的 $C^1$ 曲線 $\eta:[0,1]\to\Omega$ を選べる。各滑らかな区間で連鎖律を使うと

$$
B(b)-B(a)
=\int_0^1\nabla B(\eta(s))\cdot\eta'(s)\,ds=0.
$$

従って $B$ は $\Omega$ の全点で一つの定数に等しい。この証明は速度ポテンシャルの大域的存在を要求せず、単連結性を仮定する必要もない。
<!-- proof-end -->

**逆は一般に成り立たない。** 領域全体で $B=C$ でも $\nabla B=u\times\omega=0$ から分かるのは $u\times\omega=0$ という条件であり、$\omega=0$ までは導けない。十分条件を必要条件に読み替えてはいけない。

## 4. 重力下の水頭：管の二点へ適用する

重力が $b=-ge_z$、$\Phi=gz$（$g>0$）なら $B$ を $g$ で割ることで、三項をすべて**長さ** [m] として表せる。圧力水頭は圧力の値そのものではなく $p/(\rho g)$、速度水頭は $|u|^2/(2g)$、位置水頭は上向きの $z$ である。

<a id="def-fluid6-head"></a>

<!-- formal-statement-start -->
### 定義（圧力・速度・位置水頭と全水頭）

重力 $b=-ge_z$（$z$ は上向き、$g>0$）、一定密度 $\rho>0$ の場で、**圧力水頭** $h_p$、**速度水頭** $h_v$、**位置水頭** $h_z$、**全水頭** $H$ を

$$
h_p=\frac{p}{\rho g},\qquad
h_v=\frac{|u|^2}{2g},\qquad
h_z=z,\qquad H=h_p+h_v+h_z
$$

とする。$H=B/g$ は長さの単位 [m] を持つ。保存性の主張には第3節の条件が別途必要である。
<!-- formal-statement-end -->

<!-- definition-example-start: def-fluid6-head -->
### **定義の確認**：三種の水頭を同じ長さで足す

$\rho=1000$ kg/m$^3$、$g=10$ m/s$^2$、$p=30000$ Pa、$|u|=4$ m/s、$z=2$ m なら

$$
h_p=\frac{30000}{1000\cdot10}=3\ {\rm m},\quad
h_v=\frac{16}{20}=0.8\ {\rm m},\quad
h_z=2\ {\rm m},\quad H=5.8\ {\rm m}.
$$

$p/(\rho g)$ の次元は $(\mathrm{kg\,m^{-1}s^{-2}})/(\mathrm{kg\,m^{-2}s^{-2}})=\mathrm m$ で、他の二項も m である。[Bernoulli 関数](#def-fluid6-bernoulli-function)の $B=gH=58$ m$^2$/s$^2$ に戻るので換算も検算できる。
<!-- definition-example-end -->

[流線上の Bernoulli 積分](#thm-fluid6-streamline-bernoulli)が適用できる**同じ流線上の二点** $1,2$ なら

$$
\boxed{\frac{p_1}{\rho g}+\frac{U_1^2}{2g}+z_1
=\frac{p_2}{\rho g}+\frac{U_2^2}{2g}+z_2.}
$$

$U_i=|u(x_i)|$。両断面で速度と圧力が一様な、損失のない直管・ノズルの近似模型では、この式を断面代表値に適用する。管が細いから自動的に成立するのではなく、**二点を結ぶ流線が存在し、その流線上で定常・非粘性・保存力の仮定が成り立つ**ことが要る。断面代表値は断面内の一様性（または別途根拠付けた代表点）の仮定も要る。

<a id="prop-fluid6-nozzle"></a>

<!-- formal-statement-start -->
### 命題（水平な損失なしノズルの圧力差）

一定密度 $\rho>0$ の流体が、水平な固定ノズルを定常に流れる。壁を横切る質量流束は零、入口・出口の断面積は $A_1,A_2>0$、速度はそれぞれ法線に沿って一様で $U_1,U_2>0$、圧力はそれぞれ $p_1,p_2$ とする。さらに二断面の代表点が同じ流線上にあり、その間で非粘性・保存体積力の Euler 方程式が成立し、$z_1=z_2$、$\Phi=gz$ とする。このとき

$$
U_2=\frac{A_1}{A_2}U_1,\qquad
\boxed{p_2-p_1=\frac{\rho U_1^2}{2}\left[1-\left(\frac{A_1}{A_2}\right)^2\right].}
$$
<!-- formal-statement-end -->

### 証明の見取り図

まず[FLUID5 の質量収支](../FLUID5/index.md#thm-fluid5-moving-mass)で流量を等しくし、次に[流線上の積分](#thm-fluid6-streamline-bernoulli)で圧力差を解く。**連続の式だけで圧力差は決まらない**。

<!-- proof-start -->
### 証明

固定検査体積では境界速度 $w=0$、定常なので[質量収支](../FLUID5/index.md#thm-fluid5-moving-mass)の蓄積率も零。入口外法線は流速と逆向き、出口は同じ向き、壁は非貫通だから

$$
-\rho A_1U_1+\rho A_2U_2=0.
$$

$\rho A_2>0$ で割って $U_2=(A_1/A_2)U_1$ を得る。一方、二点を結ぶ流線に[定常 Bernoulli 積分](#thm-fluid6-streamline-bernoulli)を適用する。$z_1=z_2$、$\rho$ 一定だから

$$
\frac{p_1}{\rho}+\frac{U_1^2}{2}
=\frac{p_2}{\rho}+\frac{U_2^2}{2}.
$$

移項して $p_2-p_1=\rho(U_1^2-U_2^2)/2$、上の $U_2$ を代入すれば結論となる。
<!-- proof-end -->

例えば $\rho=1000$ kg/m$^3$、$A_1=0.020$ m$^2$、$A_2=0.010$ m$^2$、$U_1=2$ m/s なら $U_2=4$ m/s、$p_2-p_1=(1000/2)(4-16)=-6000$ Pa。縮流して速くなる際、**その同じ流線上の二点**では静圧が 6 kPa 低くなる。

### 4.1 水頭を比較するときの三つの注意

1. 静圧を単に「エネルギー」と同一視しない。$p/\rho$ は圧力仕事に由来する量で、速度項との交換は定常・非粘性などの条件のもとで述べる。
2. ゲージ圧 $p^g=p-p_a$（一定の基準圧 $p_a$）を両点で使えば、両側の全水頭は同じ定数 $p_a/(\rho g)$ だけずれる。**差の式**は変わらない。一方、異なる基準圧を二点で混ぜない。
3. 実在の粘性管路で損失水頭 $h_L>0$ を加えた $H_1=H_2+h_L$ は**別のモデル・別の収支**である。本講の Euler 方程式から $h_L$ の大きさを導けるわけではない。損失を勝手に零と置かない。

## 5. どの仮定を失ったか：失敗機構を式で特定する

### 5.1 非定常では流線方向の変化が残る

定常でないと、中心式の時間項が消えない。$u$ を両辺に内積して

$$
u\cdot\nabla B=-u\cdot\partial_tu
$$

となる（$u\cdot(u\times\omega)=0$）。その時刻の[流線](../FLUID4/index.md#def-fluid4-streamline)に沿う $\frac{dB}{ds}$ は右辺であり、一般に零とは限らない。

例えば $\rho>0$ 一定、$a>0$ 定数、$u(x,t)=at\,e_x$、$p(x,t)=p_0-\rho a x$、$\Phi=0$（$\Omega=\mathbb R^3$, $t>0$）とする。$\partial_tu=ae_x$、$(u\cdot\nabla)u=0$、$\nabla p=-\rho a e_x$ なので[Euler 方程式](#thm-fluid6-euler-equation)が成立し、$\nabla\cdot u=0$ でもある。しかし

$$
B(x,t)=\frac{p_0}{\rho}-ax+\frac{a^2t^2}{2},\qquad
u\cdot\nabla B=-a^2t\ne0.
$$

この時刻の流線は $x$ 方向の直線で、$B$ はその上で位置に依存する。**失った仮定は定常性**で、証明中の $\partial_tu=0$ の操作ができなくなったのである。なお $a$ の単位は m/s$^2$。

### 5.2 渦があると流線間の等値性は失われる

第3節のせん断流は定常・非粘性でも $\omega\ne0$ で、$\nabla B=u\times\omega\ne0$。そこでは流線上保存は成立し、**領域全体で一つの定数**という強い主張だけが壊れる。すべての渦あり流れで大域的定数が不可能なわけではなく、$u\times\omega=0$ なら大域的に一定となり得る。

### 5.3 粘性があれば Euler の出発式が変わる

ここでは後続の粘性流体論を前提にせず、必要な模型を成分で作る。一定の粘性係数 $\eta>0$ [Pa s] と、速度の**対称な変形速度成分**

$$
D_{ij}=\frac12(\partial_i u_j+\partial_j u_i)
$$

を定める。この $D_{ij}$ は速度勾配の対称部分であり、剛体回転のような反対称部分と区別する。非圧縮な Newton 型模型では、応力が $\sigma_{ij}=-p\delta_{ij}+2\eta D_{ij}$ と表せるものと**追加仮定**する。これは第0節の $\sigma=-pI_3$ とは異なる構成則である。

[CTM7 の局所運動量式](../../CTM/CTM7/index.md#thm-ctm7-material-momentum)に入る応力発散を、$\eta$ が空間一定、$u\in C^2$、$\nabla\cdot u=0$ の条件で計算する。偏微分の順序を交換できるので

$$
\begin{aligned}
\sum_j\partial_j\sigma_{ij}
&=-\partial_i p+\eta\sum_j
  (\partial_j\partial_i u_j+\partial_j\partial_j u_i)\\
&=-\partial_i p+\eta\partial_i(\nabla\cdot u)+\eta\Delta u_i\\
&=-\partial_i p+\eta\Delta u_i.
\end{aligned}
$$

ここで $\Delta u_i=\sum_j\partial_j^2u_i$ は速度成分の Laplace 作用素である。$\rho>0$ 一定、$b=-\nabla\Phi$ を仮定して局所運動量式を $\rho$ で割れば

$$
\partial_tu+(u\cdot\nabla)u
=-\frac1\rho\nabla p-\nabla\Phi+\frac\eta\rho\Delta u.
$$

第2節のベクトル恒等式と [Bernoulli 関数の定義](#def-fluid6-bernoulli-function)を代入すると、**定常の場合に限り**

$$
\nabla B=u\times\omega+\frac{\eta}{\rho}\Delta u
$$

となる。流線方向には $u\cdot\nabla B=(\eta/\rho)u\cdot\Delta u$ が残り、一般には零でない。第3節の証明から消えていたのは、この粘性応力の発散項である。より一般の Newton 流体の構成則は後続の [CTM15](../../CTM/CTM15/index.md#thm-ctm15-incompressible-navier-stokes) で学ぶが、ここでの計算にはそれを前提としない。実管路の摩擦、熱、ポンプなどを含む系を第4節の理想模型と取り違えてはいけない。

## 6. 発展：密度が変わる場合は何を積分するか

一定密度なら $(1/\rho)\nabla p=\nabla(p/\rho)$ だった。密度が位置に依存すると

$$
\nabla\left(\frac p\rho\right)
=\frac{\nabla p}{\rho}-\frac{p}{\rho^2}\nabla\rho
$$

となり、単純に $p/\rho$ を積分項へ移せない。ここでは密度と圧力の関係を追加して、圧力勾配を別の勾配として表す。

**圧力が密度の一価関数** $p=P(\rho)$（$P\in C^1(J)$、$J\subset(0,\infty)$ は区間）で与えられる状態を、この節では barotropic（順圧）と呼ぶ。これは任意の圧縮性流体で自動的に成立する条件ではない。

<a id="def-fluid6-barotropic-enthalpy"></a>

<!-- formal-statement-start -->
### 定義（順圧の圧力ポテンシャル）

区間 $J\subset(0,\infty)$ 上の $P\in C^1(J)$ と基準密度 $\rho_*\in J$ に対し

$$
h(r)=\int_{\rho_*}^{r}\frac{P'(s)}{s}\,ds
\qquad(r\in J)
$$

を**圧力ポテンシャル**（単位質量当たりのエンタルピーに相当する関数）とする。積分の下限を変えると加法定数だけが変わる。
<!-- formal-statement-end -->

<!-- definition-example-start: def-fluid6-barotropic-enthalpy -->
### **定義の確認**：$P(r)=c^2r$ の模型

$c>0$ は一定の速度 [m/s] とし、$P(r)=c^2r$（密度 $r>0$）とすると、$P'(r)=c^2$ である。従って

$$
h(r)=c^2\int_{\rho_*}^r\frac{ds}{s}
=c^2\log\frac r{\rho_*},\qquad
h'(r)=\frac{c^2}{r}=\frac{P'(r)}r.
$$

$r,\rho_*>0$ なので対数の引数は無次元かつ正、$h$ は m$^2$/s$^2$ の次元を持つ。$h(\rho_*)=0$ で基準値も直接確認できる。
<!-- definition-example-end -->

<a id="prop-fluid6-barotropic-bernoulli"></a>

<!-- formal-statement-start -->
### 命題（順圧流の流線上 Bernoulli 積分）

$\Omega\subset\mathbb R^3$ を開集合とし、定常な $\rho\in C^1(\Omega;J)$（$\rho>0$）、$u\in C^2(\Omega)$、$p=P(\rho)\in C^1(\Omega)$ が非粘性 Euler 方程式

$$
(u\cdot\nabla)u=-\frac1\rho\nabla p-\nabla\Phi
$$

（$\Phi\in C^1(\Omega)$）を満たすとする。このとき各連結な流線上で

$$
\boxed{\frac{|u|^2}{2}+h(\rho)+\Phi=C_\gamma}
$$

が成り立つ。さらに $\Omega$ が連結で $\nabla\times u=0$ なら定数は領域全体で共通である。
<!-- formal-statement-end -->

### 証明の見取り図

連鎖律によって $(1/\rho)\nabla p$ を $\nabla h(\rho)$ に変え、移流加速度を $\nabla(|u|^2/2)-u\times\omega$ に分解する。これは**一定密度で圧力が空間変化する非圧縮流**に $h(\rho)$ を代入するという意味ではない。

<!-- proof-start -->
### 証明

$h'(r)=P'(r)/r$ と $p=P(\rho)$ なので、各成分 $i$ について

$$
\partial_i h(\rho(x))
=\frac{P'(\rho(x))}{\rho(x)}\partial_i\rho(x)
=\frac1{\rho(x)}\partial_i p(x).
$$

これを仮定した Euler 方程式へ代入し、$(u\cdot\nabla)u=\nabla(|u|^2/2)-u\times(\nabla\times u)$ と成分表示を戻すと

$$
\nabla\left(\frac{|u|^2}{2}+h(\rho)+\Phi\right)
=u\times(\nabla\times u).
$$

[流線の定義](../FLUID4/index.md#def-fluid4-streamline)に沿い内積を取れば右辺は $0$。連鎖律から流線上で左辺の関数の微分は零になる。渦なし・連結なら右辺のベクトル自体が零となり、第3節の[連結領域の証明](#cor-fluid6-global-bernoulli)と同じ曲線積分で全点の値が一致する。
<!-- proof-end -->

$h$ を導くためには順圧関係が必要だった。一般の密度変化に対して $p/\rho+|u|^2/2+\Phi$ が位置に依存しないと考えるのは誤りである。本講のノズル計算は一貫して**密度一定**の模型で行う。

## 7. 演習：どの二点へ適用できるかも解答する

### Level A

### A1. Euler 方程式の符号と単位

$\rho=2$ kg/m$^3$、$\nabla p=(6,0,0)$ Pa/m、$\nabla\Phi=(0,0,10)$ m/s$^2$ とする。非粘性・保存体積力模型での $D_tu$ を計算し、各項の単位を述べよ。

- Level: A

<!-- solution-start -->
#### 詳細解答

[Euler 運動方程式](#thm-fluid6-euler-equation)で $D_tu=-(1/\rho)\nabla p-\nabla\Phi$。第一項は $-(6/2,0,0)=(-3,0,0)$ m/s$^2$、第二項は $(0,0,-10)$ m/s$^2$。従って $D_tu=(-3,0,-10)$ m/s$^2$。$(\mathrm{Pa/m})/(\mathrm{kg/m^3})=(\mathrm{kg/(m^2s^2)})/(\mathrm{kg/m^3})=\mathrm{m/s^2}$。この点の加速度を求めただけで、ある速度場が質量保存も満たすと確定したわけではない。
<!-- solution-end -->

### A2. Bernoulli 関数を三項に分ける

$\rho=1000$ kg/m$^3$、$p=50000$ Pa、$|u|=6$ m/s、$g=10$ m/s$^2$、$z=4$ m とする。$B$ と三つの水頭、$H$ を求めよ。

- Level: A

<!-- solution-start -->
#### 詳細解答

[定義](#def-fluid6-bernoulli-function)より $p/\rho=50$、$|u|^2/2=18$、$gz=40$、したがって $B=108$ m$^2$/s$^2$。[水頭の定義](#def-fluid6-head)でそれぞれ $h_p=50/10=5$ m、$h_v=18/10=1.8$ m、$h_z=4$ m。和は $H=10.8$ m で、$gH=108$ m$^2$/s$^2$ と一致する。
<!-- solution-end -->

### A3. 定常せん断流の流線別定数

$\Omega=\mathbb R\times(0,2)\times\mathbb R$、$u=(1+y,0,0)$（m/s、$y$ は m 単位の数値）、$\rho=1$、$p=0$、$\Phi=0$ とする。$y=0.5$ と $y=1.5$ の流線で $B$ を計算し、全域で等しいか答えよ。

- Level: A

<!-- solution-start -->
#### 詳細解答

速度は $x$ に依存せず、鉛直成分も零だから

$$
\nabla\cdot u=0,\qquad
(u\cdot\nabla)u=(1+y)\partial_xu=0,\qquad
\nabla p=0.
$$

従って[定常 Euler 方程式](#thm-fluid6-euler-equation)を満たす。流線は $y$ が一定の直線である。

[Bernoulli 関数](#def-fluid6-bernoulli-function)を各流線で評価すると、

$$
\begin{aligned}
B|_{y=0.5}&=\frac{1.5^2}{2}=1.125,\\
B|_{y=1.5}&=\frac{2.5^2}{2}=3.125
\end{aligned}
$$

となる（単位はいずれも m$^2$/s$^2$）。各流線上では一定だが、二つの値は異なる。さらに $\omega_z=-\partial_yu_x=-1$ s$^{-1}$ であり、[渦なしの系](#cor-fluid6-global-bernoulli)の条件を満たさない。
<!-- solution-end -->

### A4. ノズルの質量流量と出口速度

一定密度 $\rho=800$ kg/m$^3$、定常、漏出なしで、入口 $A_1=0.030$ m$^2$、$U_1=3$ m/s、出口 $A_2=0.015$ m$^2$ とする。$\dot m$ [kg/s]、$U_2$ を求めよ。圧力差をこの情報だけで決められるかも述べよ。

- Level: A

<!-- solution-start -->
#### 詳細解答

[質量収支](../FLUID5/index.md#thm-fluid5-moving-mass)で $\rho A_1U_1=\rho A_2U_2$。$\dot m=800(0.030)(3)=72$ kg/s、$U_2=72/(800\cdot0.015)=6$ m/s。ここでは非粘性や保存力、二点を結ぶ流線を仮定していないので、[Bernoulli 積分](#thm-fluid6-streamline-bernoulli)の適用条件を満たすとは限らない。質量収支**だけ**から圧力差は決められない。
<!-- solution-end -->

### A5. 基準圧を変えても圧力差は変わるか

一定の大気圧 $p_a$ とし、二点の絶対圧が $p_1,p_2$ のときゲージ圧 $p_i^g=p_i-p_a$ を用いる。$\Delta p^g$ と $\Delta H^g$ が絶対圧で計算した差と同じであることを示せ。ただし $\rho,g$ は一定で正、速度・高さは同じ定義で比較する。

- Level: A

<!-- solution-start -->
#### 詳細解答

$p_2^g-p_1^g=(p_2-p_a)-(p_1-p_a)=p_2-p_1$ である。[水頭](#def-fluid6-head)のゲージ圧表示は $H_i^g=H_i-p_a/(\rho g)$。従って $H_2^g-H_1^g=(H_2-p_a/(\rho g))-(H_1-p_a/(\rho g))=H_2-H_1$。一方各点の $H_i^g$ 自体は基準の変更でずれる。基準圧が二点で同じ定数であることを使った。
<!-- solution-end -->

### Level B

### B1. 高低差のある細管で圧力を求める

一定密度 $\rho=1000$ kg/m$^3$、$g=10$ m/s$^2$。同じ流線上の点1と点2で定常・非粘性・保存重力、$U_1=2$ m/s、$U_2=6$ m/s、$z_1=1$ m、$z_2=3$ m、$p_1=100$ kPa とする。$p_2$ を求め、静圧低下を速度項と位置項に分離せよ。

- Level: B

<!-- solution-start -->
#### 詳細解答

[流線上の積分](#thm-fluid6-streamline-bernoulli)を両点へ適用する。

$$
p_2-p_1=\frac{\rho}{2}(U_1^2-U_2^2)+\rho g(z_1-z_2).
$$

速度による差は $(1000/2)(4-36)=-16000$ Pa、位置による差は $1000\cdot10(1-3)=-20000$ Pa。合計 $-36000$ Pa なので $p_2=100000-36000=64000$ Pa = $64$ kPa。検算すると $H_1=10+0.2+1=11.2$ m、$H_2=6.4+1.8+3=11.2$ m。
<!-- solution-end -->

### B2. ベクトル恒等式の成分検算

$u=(ay,0,0)$（$a$ は s$^{-1}$、$y$ は m）について $(u\cdot\nabla)u$、$\nabla(|u|^2/2)$、$u\times(\nabla\times u)$ をそれぞれ求めて差が一致することを示せ。

- Level: B

<!-- solution-start -->
#### 詳細解答

$u_x=ay$ は $x$ に依存せず、$u_y=u_z=0$ なので $(u\cdot\nabla)u=ay\,\partial_xu=0$。$|u|^2/2=a^2y^2/2$ から $\nabla(|u|^2/2)=(0,a^2y,0)$。回転は $\omega=(0,0,\partial_xu_y-\partial_yu_x)=(0,0,-a)$。$u\times\omega$ を成分で計算すると $(ay,0,0)\times(0,0,-a)=(0,a^2y,0)$。従って $\nabla(|u|^2/2)-u\times\omega=(0,a^2y,0)-(0,a^2y,0)=0$。渦ありでも移流加速度を速度二乗の勾配だけで置いてはいけない。
<!-- solution-end -->

### B3. 非定常の反例を自分で検算する

$\rho=\rho_0>0$、$u=at\,e_x$、$p=p_0-\rho_0ax$、$\Phi=0$（$a>0,t>0$）について、(i) Euler 方程式と質量保存、(ii) 瞬時流線上の $B$ の変化率、(iii) なぜ定常 Bernoulli 積分を適用できないかを示せ。

- Level: B

<!-- solution-start -->
#### 詳細解答

(i) 速度場は位置に依存しないから、

$$
\nabla\cdot u=0,\qquad
\partial_tu=ae_x,\qquad
(u\cdot\nabla)u=at\,\partial_x(at e_x)=0.
$$

他方、圧力と体積力は

$$
-\frac{\nabla p}{\rho_0}=ae_x,\qquad -\nabla\Phi=0
$$

である。従って左右とも $ae_x$ となり、[Euler 方程式](#thm-fluid6-euler-equation)と連続の式が成立する。

(ii) [Bernoulli 関数](#def-fluid6-bernoulli-function)は

$$
B(x,t)=\frac{p_0}{\rho_0}-ax+\frac{a^2t^2}{2}.
$$

時刻 $t$ を固定した[流線](../FLUID4/index.md#def-fluid4-streamline)を $\gamma(s)=(x_0+at s,y_0,z_0)$ と取る。実際、$\gamma'=at e_x=u$ である。これを代入して曲線パラメータで微分すると

$$
\frac{d}{ds}B(\gamma(s),t)=(-a)(at)=-a^2t\ne0.
$$

(iii) 今回は $\partial_tu=ae_x\ne0$ であり、中心式 $\nabla B=u\times\omega-\partial_tu$ の最後の項が残る。非粘性であっても、[定常積分](#thm-fluid6-streamline-bernoulli)に必要な定常仮定を欠いている。
<!-- solution-end -->

### B4. 順圧の積分を作り直す

$\rho>0$、$p=K\rho^\gamma$（$K>0,\ \gamma>1$ は定数）という順圧関係を持つ流体の圧力ポテンシャル $h(\rho)$ を、基準値 $h(\rho_*)=0$ で求めよ。また $\nabla h=(1/\rho)\nabla p$ を検算せよ。

- Level: B

<!-- solution-start -->
#### 詳細解答

[圧力ポテンシャル](#def-fluid6-barotropic-enthalpy)は $P'(r)=K\gamma r^{\gamma-1}$ を用いて

$$
h(\rho)=\int_{\rho_*}^{\rho}\frac{K\gamma s^{\gamma-1}}s\,ds
=K\gamma\int_{\rho_*}^{\rho}s^{\gamma-2}\,ds
=\frac{K\gamma}{\gamma-1}
(\rho^{\gamma-1}-\rho_*^{\gamma-1}).
$$

$\gamma>1$ なので分母は非零、$\rho,\rho_*>0$ なので積分は定義される。$\nabla h=K\gamma\rho^{\gamma-2}\nabla\rho$、一方 $\nabla p=K\gamma\rho^{\gamma-1}\nabla\rho$ だから $(1/\rho)\nabla p=K\gamma\rho^{\gamma-2}\nabla\rho$ と一致する。
<!-- solution-end -->

### Level C

### C1. ノズル・圧力測定・反例判定を結ぶ

一定密度 $\rho=1000$ kg/m$^3$、$g=10$ m/s$^2$、水平な管の入口 $A_1=0.040$ m$^2$、$U_1=2$ m/s、$p_1^g=40$ kPa、出口 $A_2=0.020$ m$^2$ とする。流量は定常、壁で漏出なし、断面で速度と圧力は一様とする。

(i) $\dot m,U_2$ を求めよ。(ii) 入口と出口の代表点が同一流線にあり、その間が非粘性・保存重力の Euler 流であると仮定して $p_2^g$ と $H_1^g,H_2^g$ を求めよ。(iii) 同じ流量データだけが与えられ、壁面の粘性や外部仕事が不明なとき、(ii) の圧力予測が必然と言えない理由を、出発方程式の項で説明せよ。

- Level: C

<!-- solution-start -->
#### 詳細解答

(i) [定常質量収支](../FLUID5/index.md#thm-fluid5-moving-mass)により $\dot m=\rho A_1U_1=1000\cdot0.040\cdot2=80$ kg/s、$\rho A_2U_2=80$ だから $U_2=80/(1000\cdot0.020)=4$ m/s。

(ii) 水平なので $\Delta z=0$、[ノズル命題](#prop-fluid6-nozzle)の前提を明記して $p_2^g-p_1^g=\rho(U_1^2-U_2^2)/2=(1000/2)(4-16)=-6000$ Pa。従って $p_2^g=34$ kPa。基準高度を $z=0$ と置く。[全水頭の定義](#def-fluid6-head)から $H_1^g=40000/(1000\cdot10)+4/20=4+0.2=4.2$ m、$H_2^g=34000/(1000\cdot10)+16/20=3.4+0.8=4.2$ m。管の共通高度が $z=z_0$ なら両辺に $z_0$ を足して一致する。

(iii) (i) は流束の釣合だけで、力学模型を決めない。第5.3節で [CTM7 の局所運動量式](../../CTM/CTM7/index.md#thm-ctm7-material-momentum)から導いた一定粘性係数の Newton 型模型では、運動量式に $\eta\Delta u$ が加わり、中心式は $\nabla B=u\times\omega+(\eta/\rho)\Delta u$（定常）となる。これを $u$ と内積しても一般に零ではない。ポンプなどの非保存外力があれば $b=-\nabla\Phi$ の仮定も破れる。そのため (ii) の $-6$ kPa は**理想模型での予測**であって、(i) のデータから無条件に定まる実測値ではない。
<!-- solution-end -->

### C2. 保存が成り立つ範囲を完全に分類する

三次元の連結開領域 $\Omega=\mathbb R\times(0,2)\times\mathbb R$、$\rho=\rho_0>0$、$\Phi=0$ を考える。次の二つの場について、それぞれ (i) $\nabla\cdot u$ と Euler 方程式の成立、(ii) $\omega$ と $\nabla B$、(iii) 各流線・領域全体での Bernoulli 定数を判定せよ。

場A：$u=(2+y,0,0)$、$p=p_0$（$x,y,z$ は m、速度の数値は m/s）。

場B：$u=(U,0,0)$（$U>0$ 定数）、$p=p_0$。

- Level: C

<!-- solution-start -->
#### 詳細解答

場Aでは $\partial_xu_x=0$、$u_y=u_z=0$ だから $\nabla\cdot u=0$。$\partial_tu=0$、$(u\cdot\nabla)u=(2+y)\partial_xu=0$、$\nabla p=0$ なので[Euler 方程式](#thm-fluid6-euler-equation)が成立する。$\omega=(0,0,-1)$（s$^{-1}$）で、$B=p_0/\rho_0+(2+y)^2/2$、$\nabla B=(0,2+y,0)$（加速度の単位）である。流線 $y=y_0,z=z_0$ 上で定数 $p_0/\rho_0+(2+y_0)^2/2$ を持つが、$0<y_0<2$ で値が変わるから領域全体で一定ではない。この事実は[流線上の積分](#thm-fluid6-streamline-bernoulli)と矛盾しない。

場Bでも $\nabla\cdot u=0$、$\partial_tu=(u\cdot\nabla)u=0$、$\nabla p=0$ で Euler 方程式を満たす。一方 $\omega=\nabla\times u=0$、$\nabla B=0$、$B=p_0/\rho_0+U^2/2$。$\Omega$ は連結なので[渦なしの系](#cor-fluid6-global-bernoulli)により同一の定数が全領域で成立する。二場の違いは定常性ではなく、速度勾配から生じる渦度とそれが作る横方向の $\nabla B$ である。
<!-- solution-end -->

## 8. 要点：Bernoulli を使う前の判定

流速と圧力の二点値をつなぎたいときは、次の順序で確認する。

- **モデル**：運動量方程式は非粘性の Euler 型か。体積力は保存力か。密度一定か、順圧の $h(\rho)$ へ置換すべきか。
- **時間**：定常か。そうでなければ $\partial_tu$ を無視できない。
- **空間**：同じ流線の二点か。異なる流線へ同じ定数を使いたければ、例えば渦なし・領域連結という追加の十分条件が必要。
- **測定**：同じ圧力基準・高さ方向・密度を用いているか。損失やポンプを理想模型へ紛れ込ませていないか。

**「速いほど圧力が低い」には少なくとも同じ流線・同じ高さ・一定密度・定常・非粘性・保存力の条件が必要**であり、高さが変われば圧力は速度項だけでは決まらない。次講 FLUID7 では、これらの模型の力の相対的重要性を無次元量で見分ける。
