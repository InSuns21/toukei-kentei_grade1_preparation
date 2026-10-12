# GMECH3 幾何学的Noetherの定理

[GMECH2の運動量写像](../GMECH2/index.md#def-gmech2-hamiltonian-action)は、群作用の無限小生成子 $\xi_M$ と関数 $J_\xi=\langle J,\xi\rangle$ を結び付けました。並進に対して線形運動量、回転に対して角運動量が現れます。しかし「運動量写像が存在する」というだけで、これらが**時間発展で保存される**わけではありません。何が追加で必要なのでしょうか。

鍵は、運動を決めるHamiltonian $H$ が、その群作用によって変わらないことです。[SYM4の観測量の時間発展式](../../SYM/SYM4/index.md#prop-sym4-observable-evolution)と運動量写像を組み合わせると、運動方程式を解かずに保存量を読み取れます。ここでは対称性から保存量が得られる仕組みを、符号、時間の定義域、群の連結性を区別しながら証明します。

## 1. 対称性をHamiltonianの条件へ翻訳する

有限次元シンプレクティック多様体 $(M,\omega)$ に有限次元実Lie群 $G$ が滑らかに左Hamilton作用し、その運動量写像を $J:M\to\mathfrak g^*$ とします。Lie代数を $\mathfrak g=T_eG$、作用を $\Phi_g(m)=g\cdot m$ と記し、基本ベクトル場は

$$
\xi_M(m)=\left.\frac{d}{ds}\right|_{s=0}\exp(s\xi)\cdot m
$$

です。$H\in C^\infty(M)$ を時間に陽に依存しないHamiltonianとします。ここでの $s$ は**群の一パラメータ部分群のパラメータ**であり、後に運動を追う時刻 $t$ とは別です。

対称性を保存量へ変えるには、まずHamiltonianを群で変換しても値が変わらない、という条件が必要です。群の全元による不変性と、単位元付近での微分による不変性を区別して定式化します。

<a id="def-gmech3-hamiltonian-invariance"></a>

<!-- formal-statement-start -->
> **定義（Hamiltonianの群不変性と無限小不変性）**  
> $(M,\omega)$ 上の滑らかな左Hamilton作用 $\Phi:G\times M\to M$ と $H\in C^\infty(M)$ に対し、任意の $g\in G,m\in M$ で

$$
H(g\cdot m)=H(m)
$$

> となるとき、$H$ は **$G$ 不変** であるという。また、任意の $\xi\in\mathfrak g,m\in M$ で

$$
dH_m(\xi_M(m))=0
$$

> となるとき、$H$ は **無限小不変** であるという。
<!-- formal-statement-end -->

<!-- definition-example-start: def-gmech3-hamiltonian-invariance -->
### 直接例：平行移動と自由粒子

**定義の確認**：群の有限変換と無限小変換の双方で $H$ の変化を計算します。

$M=T^*\mathbb R$、$\omega=dq\wedge dp$、$G=(\mathbb R,+)$ の作用を $a\cdot(q,p)=(q+a,p)$ とし、質量 $m_0>0$ の自由粒子を $H=p^2/(2m_0)$ で表します。任意の $a,q,p$ に対して

$$
H(q+a,p)=\frac{p^2}{2m_0}=H(q,p).
$$

Lie代数の元 $\xi$ の生成子は $\xi_M=\xi\partial_q$ ですから、

$$
dH=\frac{p}{m_0}\,dp,\qquad
dH(\xi_M)=\frac{p}{m_0}\,dp(\xi\partial_q)=0.
$$

有限変換についても無限小変換についても、不変性が直接確認できました。
<!-- definition-example-end -->

群の全元についての不変性は、各 $\xi$ で微分した不変性を含意します。逆方向は **連結成分** を意識する必要があります。

<a id="prop-gmech3-infinitesimal-invariance"></a>

<!-- formal-statement-start -->
> **命題（無限小不変性と単位連結成分）**  
> 有限次元実Lie群 $G$ が滑らかな多様体 $M$ に左作用し、$H\in C^\infty(M)$ とする。$H$ が $G$ 不変なら無限小不変である。
>
> 逆に無限小不変なら、単位元を含む連結成分 $G^\circ$ のすべての $g\in G^\circ$ と $m\in M$ に対して

$
H(g\cdot m)=H(m)
$

> が成り立つ。特に $G$ が連結なら両条件は同値である。
<!-- formal-statement-end -->

### 証明の見取り図

有限変換の式は $g=\exp(s\xi)$ で微分します。逆は、無限小条件から各指数曲線に沿った微分が零になることを確かめ、指数写像が単位元近傍を覆う事実と群の連結性で広げます。

<!-- proof-start -->
### 証明

$H$ が $G$ 不変なら、各固定した $\xi,m$ に対し

$$
H(\exp(s\xi)\cdot m)=H(m)
$$

がすべての $s$ で成立します。両辺を $s=0$ で微分し、[多様体上の連鎖律](../../GEO/GEO2/index.md#thm-geo2-composition-differential)を使うと、

$$
\left.\frac{d}{ds}\right|_{0}H(\exp(s\xi)\cdot m)
=dH_m(\xi_M(m))=0.
$$

逆に無限小不変とします。任意の $s$ について $m_s=\exp(s\xi)\cdot m$ と置きます。群の作用則から

$$
m_{s+h}=\exp(h\xi)\cdot m_s
$$

なので、$h=0$ で微分すると $\dot m_s=\xi_M(m_s)$ です。従って

$$
\frac{d}{ds}H(m_s)
=dH_{m_s}(\dot m_s)
=dH_{m_s}(\xi_M(m_s))=0.
$$

ゆえに $H(\exp(s\xi)\cdot m)=H(m)$ が任意の $s,\xi,m$ で成立します。

ここから群全体へ移ります。[LIE2の指数写像の局所微分同相定理](../../../代数系/LIE/LIE2/index.md#thm-lie2-exponential-local-diffeomorphism)により、単位元のある開近傍 $U$ は指数写像の像に含まれます。$H$ を保つ群元の集合を

$$
K=\{g\in G:\ H(g\cdot m)=H(m)\ \text{が全ての }m\in M\text{ で成立}\}
$$

と置くと、作用則により $K$ は部分群です。すでに指数像の元がすべて $K$ に入るので $U\subseteq K$ です。したがって $K$ は開部分群です。実際、任意の $k\in K$ について $kU\subseteq K$ が $k$ の開近傍になります。各左剰余類 $gK$ も開なので、その補集合は他の剰余類の和で開、すなわち $K$ は閉集合でもあります。連結集合 $G^\circ$ では $K\cap G^\circ$ が空でない開閉集合となるため、$G^\circ\subseteq K$ です。$G$ が連結なら $G^\circ=G$ で結論が従います。
<!-- proof-end -->

**連結性が必要な理由。** 例えば $G=O(2)$ が $T^*\mathbb R^2$ に $(q,p)\mapsto(Rq,Rp)$ と作用するとき、$H(q,p)=xp_y-yp_x$ は回転部分群 $SO(2)$ で不変です。実際、$H$ は回転の運動量写像の成分そのものです。しかし $R=\operatorname{diag}(1,-1)$ では

$$
H(Rq,Rp)=x(-p_y)-(-y)p_x=-H(q,p).
$$

$O(2)$ は二つの連結成分を持ち、無限小不変性は反射に対する不変性まで保証しません。この例は、次の保存則が**離散的な群元の不変性を必要としない**ことも示します。

## 2. 幾何学的Noetherの定理

[運動量写像の定義](../GMECH2/index.md#def-gmech2-hamiltonian-action)から、各 $\xi\in\mathfrak g$ に対し

$$
dJ_\xi=\iota_{\xi_M}\omega,\qquad
J_\xi=\langle J,\xi\rangle.
$$

従って [SYM4のHamiltonベクトル場の一意性](../../SYM/SYM4/index.md#thm-sym4-existence-coordinate)により $X_{J_\xi}=\xi_M$ です。ここへ $H$ が不変という条件を加えると、[Poisson括弧](../../SYM/SYM4/index.md#def-sym4-poisson-bracket)が消えることを証明できます。

<a id="thm-gmech3-geometric-noether"></a>

<!-- formal-statement-start -->
> **定理（幾何学的Noetherの定理）**  
> $(M,\omega)$ を有限次元シンプレクティック多様体とし、有限次元実Lie群 $G$ が $M$ に滑らかに左Hamilton作用し、その運動量写像を $J:M\to\mathfrak g^*$ とする。$H\in C^\infty(M)$ が $G$ 不変とする。このとき任意の $\xi\in\mathfrak g$ について

$$
\{J_\xi,H\}=0,\qquad J_\xi(m)=\langle J(m),\xi\rangle.
$$

> さらに、任意の開時間区間 $I$ 上で $\dot m(t)=X_H(m(t))$ を満たす $C^1$ 級軌道 $m:I\to M$ に対し、$J_\xi(m(t))$ は $t\in I$ で一定である。同値に、任意の $t,t_0\in I$ で

$$
J(m(t))=J(m(t_0))\quad\text{in }\mathfrak g^*.
$$

> なお、$J$ の余随伴同変性も $G$ の連結性も仮定しない。$H$ が無限小不変であるだけでも同じ結論が成立する。
<!-- formal-statement-end -->

### 証明の見取り図

$\xi$ に沿って $H$ を微分し、その値が $0$ であることを使います。Poisson括弧の符号を固定するため、$\{J_\xi,H\}=dJ_\xi(X_H)$ から出発します。最後に軌道の時刻微分を取り、$\mathfrak g$ の全方向で保存されることを双対空間値の等式に戻します。

<!-- proof-start -->
### 証明

$\xi\in\mathfrak g$、$m\in M$ を任意に固定します。[運動量写像の定義](../GMECH2/index.md#def-gmech2-hamiltonian-action)から

$$
dJ_\xi=\iota_{\xi_M}\omega
$$

であり、[SYM4のHamiltonベクトル場の定義](../../SYM/SYM4/index.md#def-sym4-hamiltonian-vector-field)と非退化性より $\xi_M=X_{J_\xi}$ です。従って[SYM4のPoisson括弧の定義](../../SYM/SYM4/index.md#def-sym4-poisson-bracket)を関数 $J_\xi,H$ に適用すると、

$$
\begin{aligned}
\{J_\xi,H\}(m)
&=d(J_\xi)_m(X_H(m))\\
&=\omega_m(\xi_M(m),X_H(m))\\
&=-\omega_m(X_H(m),\xi_M(m))\\
&=-dH_m(\xi_M(m)).
\end{aligned}
$$

三行目は2形式の交代性、四行目は $\iota_{X_H}\omega=dH$ の規約によります。[上の無限小不変性の命題](#prop-gmech3-infinitesimal-invariance)により $G$ 不変な $H$ は $dH_m(\xi_M(m))=0$ を満たすので、すべての $\xi,m$ で $\{J_\xi,H\}(m)=0$ です。

次に軌道 $m(t)$ を固定します。[SYM4の観測量の時間発展式](../../SYM/SYM4/index.md#prop-sym4-observable-evolution)を $f=J_\xi$ に適用すると、

$$
\begin{aligned}
\frac{d}{dt}J_\xi(m(t))
&=d(J_\xi)_{m(t)}(\dot m(t))\\
&=d(J_\xi)_{m(t)}(X_H(m(t)))\\
&=\{J_\xi,H\}(m(t))=0.
\end{aligned}
$$

従って $J_\xi(m(t))=J_\xi(m(t_0))$ が区間 $I$ 上で成立します。この等式はすべての $\xi\in\mathfrak g$ について成り立ちます。任意の $t,t_0$ で差を取れば

$$
\langle J(m(t))-J(m(t_0)),\xi\rangle=0
\quad(\forall\xi\in\mathfrak g).
$$

有限次元線形空間とその双対の評価が全方向で零であることから $J(m(t))-J(m(t_0))=0$ です。以上で証明できました。無限小不変性だけを仮定した場合も、最初の微分が零になる箇所から以降は同じ計算です。
<!-- proof-end -->

**時刻の範囲。** 非コンパクトな $M$ ではHamiltonベクトル場の解が全時刻で存在するとは限りません。定理はそれを必要とせず、**軌道が実際に存在する時間区間**での保存を主張します。

**同変性は不要。** [GMECH2の非同変な運動量写像の例](../GMECH2/index.md#ex-gmech2-b02)でも、その作用に対して $H$ が不変なら同じ証明が動きます。一方、[GMECH2の同変性定義](../GMECH2/index.md#def-gmech2-coadjoint-equivariance)は $J(g\cdot m)$ と $J(m)$ を比較する条件であり、今証明した $J(m(t))$ の時間保存とは論理的に異なります。

## 3. 保存則から対称性をどこまで復元できるか

上の証明には、単なる一方向の含意以上の情報が含まれます。すべての運動量関数がHamilton流に沿って不変なら、Hamiltonianは少なくとも群の単位連結成分に対して不変でなければなりません。

<a id="prop-gmech3-converse"></a>

<!-- formal-statement-start -->
> **命題（運動量関数の保存と無限小対称性の同値）**  
> 有限次元シンプレクティック多様体 $(M,\omega)$ 上の滑らかな左Hamilton作用と運動量写像 $J:M\to\mathfrak g^*$、$H\in C^\infty(M)$ を固定する。次の条件は同値である。
>
> (i) 任意の $\xi\in\mathfrak g$ に対し、$\{J_\xi,H\}=0$ が $M$ 全体で成立する。
>
> (ii) 任意の $\xi\in\mathfrak g$ に対し、$dH(\xi_M)=0$ が $M$ 全体で成立する。
>
> (iii) $H$ は $G^\circ$ 不変である。
>
> また、(i) はすべての局所Hamilton軌道で $J$ が一定であることとも同値である。$G$ が連結なら (iii) を $G$ 不変に置き換えられる。
<!-- formal-statement-end -->

### 証明の見取り図

Noetherの証明に現れた等式は、負号こそありますが**等号**なので逆にも読めます。流れでの保存から括弧が零である逆向きには、任意の初期点で時刻0を微分します。

<!-- proof-start -->
### 証明

[幾何学的Noetherの定理](#thm-gmech3-geometric-noether)の証明で得た点ごとの等式を、仮定なしで用いると

$$
\{J_\xi,H\}(m)=-dH_m(\xi_M(m))
$$

です。従って (i) と (ii) は同値です。(ii) と (iii) の同値性は[無限小不変性の命題](#prop-gmech3-infinitesimal-invariance)から従います。

(i) なら、[SYM4の時間発展公式](../../SYM/SYM4/index.md#prop-sym4-observable-evolution)によって各 $J_\xi$ の時間微分が零であり、前定理と同じ双対評価により $J$ は軌道で一定です。逆に、各初期点 $m_0\in M$ に対する $X_H$ の局所解 $m(t)$ に沿って $J$ が一定なら、任意の $\xi$ に対して $t=0$ で微分し、

$$
0=\left.\frac{d}{dt}\right|_{0}J_\xi(m(t))
=\{J_\xi,H\}(m_0).
$$

$m_0$ と $\xi$ は任意なので (i) が成立します。
<!-- proof-end -->

条件を「一つの軌道で保存される」と弱めると逆向きは偽です。例えば $H=p^2/(2m_0)+q^2/2$ と並進の運動量 $J=p$ を考えると、平衡解 $(q,p)=(0,0)$ では $p$ は一定ですが、

$$
\{p,H\}=-q
$$

は位相空間の全点で零ではありません。**一軌道上の偶然の保存**と、**任意の初期条件に通用する対称性**は区別します。

## 4. 並進対称性は運動量保存を与える

$M=T^*\mathbb R^n$、$\omega=\sum_i dq^i\wedge dp_i$ とし、$\mathbb R^n$ が $q$ を平行移動します。[GMECH2の余接持ち上げの運動量写像](../GMECH2/index.md#thm-gmech2-cotangent-momentum)によれば、

$$
J(q,p)=p,\qquad J_\xi(q,p)=p^{\mathsf T}\xi.
$$

自由粒子 $H(q,p)=|p|^2/(2m_0)$ は $q$ に依存しないので全並進に不変です。[幾何学的Noetherの定理](#thm-gmech3-geometric-noether)によって $p$ のすべての成分が保存します。正準座標でも

$$
\dot q^i=\frac{\partial H}{\partial p_i}=\frac{p_i}{m_0},
\qquad
\dot p_i=-\frac{\partial H}{\partial q^i}=0
$$

と検算できます。

ここで $H=|p|^2/(2m_0)+V(q)$ に変えます。$V$ が $q^1$ のみに依存しないなら、その方向の平行移動だけは残ります。例えば $n=2$ で $V(x,y)=y^2/2$ とすると $x$ 方向の運動量 $p_x$ は保存しますが、$y$ 方向は

$$
\{p_y,H\}=-\frac{\partial H}{\partial y}=-y
$$

であり、一般には保存しません。**群の部分対称性には、その方向の運動量関数だけが対応**します。

逆に、$V(q)=\kappa q$（$\kappa\ne0$）の一次元系は並進に不変ではありません。$J=p$ に対して

$$
\{p,H\}=-\frac{\partial H}{\partial q}=-\kappa,
\qquad
p(t)=p(t_0)-\kappa(t-t_0).
$$

運動量写像は存在していても、$H$ の不変性を失うと保存の証明の最後に $-dH(\partial_q)=-\kappa$ が残ります。これが仮定を外したときの壊れ方です。

## 5. 回転対称性は角運動量保存を与える

$M=T^*\mathbb R^2$ に $SO(2)$ が $(q,p)\mapsto(R_\theta q,R_\theta p)$ と作用する場合、[GMECH2の回転運動量](../GMECH2/index.md#thm-gmech2-cotangent-momentum)は

$$
L=xp_y-yp_x.
$$

質量 $m_0>0$、滑らかな $V:[0,\infty)\to\mathbb R$ を使い、

$$
H=\frac{p_x^2+p_y^2}{2m_0}+V(x^2+y^2)
$$

とします。$R_\theta$ は長さを保つので、$\lvert R_\theta q\rvert^2=\lvert q\rvert^2$ と $\lvert R_\theta p\rvert^2=\lvert p\rvert^2$ が成立し、$H$ は回転不変です。従って [幾何学的Noetherの定理](#thm-gmech3-geometric-noether)により $L$ は保存します。

正準座標でも符号を検証しましょう。[SYM4の正準座標の括弧公式](../../SYM/SYM4/index.md#prop-sym4-coordinate-bracket)へ $f=L,g=H$ を代入します。まず

$$
\begin{aligned}
&L_x=p_y,\quad L_y=-p_x,\quad
L_{p_x}=-y,\quad L_{p_y}=x,\\
&H_x=2xV'(x^2+y^2),\quad
H_y=2yV'(x^2+y^2),\\
&H_{p_x}=p_x/m_0,\quad H_{p_y}=p_y/m_0.
\end{aligned}
$$

従って

$$
\begin{aligned}
\{L,H\}
&=L_xH_{p_x}+L_yH_{p_y}
-L_{p_x}H_x-L_{p_y}H_y\\
&=\frac{p_yp_x-p_xp_y}{m_0}
+2xyV'(x^2+y^2)-2xyV'(x^2+y^2)\\
&=0.
\end{aligned}
$$

$SO(3)$ が $T^*\mathbb R^3$ に同様に作用するときには、[GMECH2の標準公式](../GMECH2/index.md#thm-gmech2-cotangent-momentum)から $J=q\times p$ です。$H=|p|^2/(2m_0)+V(|q|^2)$ は全回転に不変だから、各 $\xi\in\mathbb R^3$ の $\xi\cdot(q\times p)$ が保存し、**角運動量ベクトル全体**が一定になります。

ただし、座標軸に依存するポテンシャルを加えると結論が変わります。例えば平面で $H=p^2/(2m_0)+\alpha x^2/2+\beta y^2/2$ とすると、

$$
\{L,H\}=(\alpha-\beta)xy.
$$

$\alpha\ne\beta$ なら回転不変性が失われ、一般の軌道で $L$ は保存しません。$\alpha=\beta$ なら括弧が消えます。なお上の式では $-L_{p_x}H_x-L_{p_y}H_y=y\alpha x-x\beta y$ と逐項計算しています。

## 6. 非同変な運動量写像でもNoetherが成立する

群の変換に関する同変性をNoetherの仮定に紛れ込ませないため、あえて非同変の例を使います。[GMECH2の全平行移動作用](../GMECH2/index.md#ex-gmech2-b02)では、$M=\mathbb R^2_{q,p}$、$\omega=dq\wedge dp$ に $G=\mathbb R^2$ が

$$
(u,v)\cdot(q,p)=(q+u,p+v)
$$

と作用し、$J(q,p)=(p,-q)$ です。可換群の余随伴作用は恒等なのに、

$$
J((u,v)\cdot(q,p))-J(q,p)=(v,-u)
$$

なので $J$ は同変ではありません。

それでも定数関数 $H=E_0$ は全群に不変です。$dH=0$ なので [SYM4のHamiltonベクトル場の一意性](../../SYM/SYM4/index.md#thm-sym4-existence-coordinate)から $X_H=0$ です。すべての運動軌道は定数で、Noetherの結論 $J(q(t),p(t))=J(q(t_0),p(t_0))$ が成立します。

この例では「同変でなくても保存する」は正しいものの、全位相平面の並進に不変な滑らかな $H$ は**定数しかありません**。任意の2点はある $(u,v)$ で移し合えるので、$H$ が全並進に不変なら二点で値が等しいからです。つまり非同変性はNoetherの論理的障害ではない一方、この例から非自明な全並進不変Hamiltonianを期待してはいけません。

もう一つの注意は **Hamilton作用という仮定** です。例えば $M=T^*S^1$ で、$\theta$ を局所的な角度座標、$p$ を余接方向の大域座標とします。円周上で $\theta$ は単一の実数値座標になりませんが、1形式 $d\theta$ は局所表示が重なりで一致する大域1形式です。$\omega=d\theta\wedge dp$ とし、$\mathbb R$ が $p$ の平行移動で作用すると、生成子 $\partial_p$ に対して

$$
\iota_{\partial_p}\omega=-d\theta
$$

です。$S^1$ の周回積分は $\int_{S^1}d\theta=2\pi$ なので $d\theta$ は大域的な実数値関数の完全微分ではありません。従ってこのシンプレクティック作用には大域的な運動量写像がなく、前定理の $J_\xi$ を定義できません。**作用がシンプレクティック**というだけでは保存量を構成する段階が欠けます。

## 7. 演習：保存則を自分で判定する

### Level A

<a id="ex-gmech3-a01"></a>
**A1. 一次元自由粒子。** $T^*\mathbb R$ に $\omega=dq\wedge dp$、平行移動 $a\cdot(q,p)=(q+a,p)$、$H=p^2/(2m_0)$（$m_0>0$）を与える。(1) 一般の $\xi\in\mathbb R$ に対する $J_\xi$、(2) $dH(\xi_M)$、(3) $\{J_\xi,H\}$ を求めよ。

- Level: A

<!-- solution-start -->
**詳細解答。** (1) 生成子は $\xi_M=\xi\partial_q$ です。[GMECH2の標準運動量写像](../GMECH2/index.md#thm-gmech2-cotangent-momentum)から $J_\xi=\xi p$ となります。(2) $dH=(p/m_0)\,dp$ だから

$$
dH(\xi_M)=\frac{p}{m_0}\,dp(\xi\partial_q)=0.
$$

(3) [SYM4の正準括弧](../../SYM/SYM4/index.md#prop-sym4-coordinate-bracket)に $f=\xi p,g=p^2/(2m_0)$ を代入すると $f_q=0$、$g_q=0$ より

$$
\{J_\xi,H\}=f_qg_p-f_pg_q=0-\xi\cdot0=0.
$$

よって全 $\xi$ の運動量関数が保存されます。
<!-- solution-end -->

<a id="ex-gmech3-a02"></a>
**A2. 部分対称性。** $T^*\mathbb R^2$ に $H=(p_x^2+p_y^2)/(2m_0)+y^2/2$ を入れる。(1) $x$ 方向の平行移動による $J$ を求めよ。(2) $\{p_x,H\}$ と $\{p_y,H\}$ を求め、何が保存されるか述べよ。

- Level: A

<!-- solution-start -->
**詳細解答。** (1) $x\mapsto x+a$ の位置生成子は $\partial_x$ なので、[余接持ち上げの標準運動量写像](../GMECH2/index.md#thm-gmech2-cotangent-momentum)は $J=p_x$ です。(2) [正準括弧](../../SYM/SYM4/index.md#prop-sym4-coordinate-bracket)を使えば

$$
\{p_x,H\}=-H_x=0,\qquad
\{p_y,H\}=-H_y=-y.
$$

従って $p_x$ は全軌道で保存されますが $p_y$ は一般には保存されません。$y=0,p_y=0$ の特別な平衡軌道だけを見て全域の保存と誤認してはいけません。
<!-- solution-end -->

<a id="ex-gmech3-a03"></a>
**A3. Noetherの符号。** $G=\mathbb R$ が $q$ を並進する余接持ち上げで、$H=p^2/2+\kappa q$、$\kappa\in\mathbb R$ とする。$\{p,H\}$ と $p(t)$ を求め、$\kappa\ne0$ のとき失われる仮定を説明せよ。

- Level: A

<!-- solution-start -->
**詳細解答。** $J_1=p$ です。[SYM4の括弧規約](../../SYM/SYM4/index.md#prop-sym4-coordinate-bracket)に従い、

$$
\{p,H\}=p_qH_p-p_pH_q
=0\cdot p-1\cdot\kappa=-\kappa.
$$

時間発展式は $\dot p=-\kappa$ で、時刻 $t_0$ から積分して $p(t)=p(t_0)-\kappa(t-t_0)$ です。$H(q+a,p)-H(q,p)=\kappa a$ なので、$\kappa\ne0$ ではHamiltonianの並進不変性が欠けています。
<!-- solution-end -->

<a id="ex-gmech3-a04"></a>
**A4. 回転と角運動量。** $T^*\mathbb R^2$ 上で $H=(p_x^2+p_y^2+x^2+y^2)/2$ とする。回転生成子の運動量関数 $L$ を書き、$H$ の有限回転不変性と $\{L,H\}=0$ を確認せよ。

- Level: A

<!-- solution-start -->
**詳細解答。** [GMECH2の運動量公式](../GMECH2/index.md#thm-gmech2-cotangent-momentum)より $L=xp_y-yp_x$ です。直交な $R$ により $|Rq|^2=|q|^2$、$|Rp|^2=|p|^2$ だから $H(Rq,Rp)=H(q,p)$ です。[正準括弧](../../SYM/SYM4/index.md#prop-sym4-coordinate-bracket)で

$$
\begin{aligned}
\{L,H\}
&=L_xH_{p_x}+L_yH_{p_y}-L_{p_x}H_x-L_{p_y}H_y\\
&=p_yp_x-p_xp_y+y x-x y=0.
\end{aligned}
$$

従って [幾何学的Noetherの定理](#thm-gmech3-geometric-noether)により $L$ は保存されます。
<!-- solution-end -->

### Level B

<a id="ex-gmech3-b01"></a>
**B1. 部分空間への並進。** $T^*\mathbb R^3$ で $H=(p_1^2+p_2^2+p_3^2)/(2m_0)+V(q^3)$ とする。$G=(\mathbb R^2,+)$ が $q^1,q^2$ を並進する作用の運動量写像を求め、全 $\xi$ で保存されることを示せ。また $p_3$ の時間微分を計算せよ。

- Level: B

<!-- solution-start -->
**詳細解答。** $\xi=(a,b)$ の位置生成子は $a\partial_{q^1}+b\partial_{q^2}$ です。[GMECH2の標準運動量写像](../GMECH2/index.md#thm-gmech2-cotangent-momentum)を使うと

$$
J_\xi=ap_1+bp_2,\qquad J=(p_1,p_2).
$$

$H$ は $q^1,q^2$ を含まず、すべての $(u,v)$ で $H(q^1+u,q^2+v,q^3,p)=H(q,p)$ です。[幾何学的Noetherの定理](#thm-gmech3-geometric-noether)から $J$ 全体が保存されます。別に[正準括弧](../../SYM/SYM4/index.md#prop-sym4-coordinate-bracket)で

$$
\{J_\xi,H\}=-aH_{q^1}-bH_{q^2}=0
$$

を確かめられます。一方、$\dot p_3=-H_{q^3}=-V'(q^3)$ なので、$V'$ が一般に非零なら $p_3$ は保存しません。
<!-- solution-end -->

<a id="ex-gmech3-b02"></a>
**B2. 非等方振動子の角運動量。** $T^*\mathbb R^2$ に $H=(p_x^2+p_y^2)/(2m_0)+(\alpha x^2+\beta y^2)/2$ と $L=xp_y-yp_x$ を与える。(1) $\{L,H\}$ を導け。(2) $\alpha=\beta$ の場合と $\alpha\ne\beta$ の場合を区別し、後者で $L$ が全軌道に沿って保存されないことを示せ。

- Level: B

<!-- solution-start -->
**詳細解答。** 偏微分は $L_x=p_y,L_y=-p_x,L_{p_x}=-y,L_{p_y}=x$、$H_x=\alpha x,H_y=\beta y,H_{p_x}=p_x/m_0,H_{p_y}=p_y/m_0$ です。[正準括弧の公式](../../SYM/SYM4/index.md#prop-sym4-coordinate-bracket)に入れると

$$
\begin{aligned}
\{L,H\}
&=p_y\frac{p_x}{m_0}-p_x\frac{p_y}{m_0}
-(-y)(\alpha x)-x(\beta y)\\
&=(\alpha-\beta)xy.
\end{aligned}
$$

$\alpha=\beta$ なら零です。$\alpha\ne\beta$ なら初期点 $x=y=1,p_x=p_y=0$ を取れば、局所軌道の時刻0の時間微分は

$$
\left.\frac{d}{dt}\right|_{0}L=(\alpha-\beta)\ne0.
$$

従って全軌道保存は成立しません。失った条件はHamiltonianの全回転不変性です。
<!-- solution-end -->

<a id="ex-gmech3-b03"></a>
**B3. 逆命題を証明する。** 連結な有限次元Lie群 $G$ のHamilton作用と $H\in C^\infty(M)$ に対し、すべての $\xi$ で $\{J_\xi,H\}=0$ と仮定する。指数曲線と群の連結性を使って $H$ の $G$ 不変性を証明せよ。

- Level: B

<!-- solution-start -->
**詳細解答。** [運動量写像の定義](../GMECH2/index.md#def-gmech2-hamiltonian-action)と[SYM4の括弧](../../SYM/SYM4/index.md#def-sym4-poisson-bracket)により

$$
0=\{J_\xi,H\}
=\omega(\xi_M,X_H)=-dH(\xi_M).
$$

任意の $\xi$ で $s\mapsto\exp(s\xi)\cdot m$ を微分すると、その速度は $\xi_M(\exp(s\xi)\cdot m)$ だから、$H$ の微分は常に零となり、指数曲線全体で $H$ は一定です。[指数写像の局所微分同相](../../../代数系/LIE/LIE2/index.md#thm-lie2-exponential-local-diffeomorphism)から単位元近傍の元は $H$ を保ちます。そのような元全体は開部分群 $K$ をなし、左剰余類がすべて開なので $K$ の補集合も開です。$G$ が連結で $K$ は空でない開閉部分集合のため $K=G$ です。従って $H$ は全 $G$ で不変です。
<!-- solution-end -->

<a id="ex-gmech3-b04"></a>
**B4. 非同変性と保存の論理。** $M=\mathbb R^2$、$\omega=dq\wedge dp$ に $G=\mathbb R^2$ が $(u,v)\cdot(q,p)=(q+u,p+v)$ と作用する。(1) $J=(p,-q)$ が運動量写像で非同変なことを確かめよ。(2) $G$ 不変な滑らかな $H$ が定数しかないことを示せ。(3) それでもNoetherの定理が適用できる理由を述べよ。

- Level: B

<!-- solution-start -->
**詳細解答。** (1) $\xi=(a,b)$ に対し生成子は $a\partial_q+b\partial_p$ なので、

$$
\iota_{\xi_M}(dq\wedge dp)=a\,dp-b\,dq=d(ap-bq)
=d\langle(p,-q),\xi\rangle.
$$

従って運動量写像です。一方、可換群の余随伴作用は恒等なのに

$$
J(q+u,p+v)-J(q,p)=(v,-u)
$$

であり非同変です。(2) 任意の二点 $(q,p),(q',p')$ は $(u,v)=(q'-q,p'-p)$ で結ばれます。不変性をこの群元へ適用すると $H(q',p')=H(q,p)$ だから $H$ は定数です。(3) $H=E_0$ なら $dH=0$、[SYM4のベクトル場の一意性](../../SYM/SYM4/index.md#thm-sym4-existence-coordinate)から $X_H=0$ です。[幾何学的Noetherの定理](#thm-gmech3-geometric-noether)は $J$ の同変性を要請しないので適用でき、$J$ はどの定数軌道でも保存されます。
<!-- solution-end -->

### Level C

<a id="ex-gmech3-c01"></a>
**C1. 回転対称Hamiltonianの判定と破れ方。** $M=T^*\mathbb R^2$、$\omega=dx\wedge dp_x+dy\wedge dp_y$ に $SO(2)$ が位置・運動量を同時回転させる。$m_0>0$、$\alpha,\beta,\gamma\in\mathbb R$ に対して

$$
H_{\alpha,\beta,\gamma}
=\frac{p_x^2+p_y^2}{2m_0}
+\frac{\alpha x^2+\beta y^2}{2}+\gamma xp_x+\gamma yp_y
$$

とする。(1) 運動量写像 $J=L$ を生成子から求めよ。(2) $\{L,H_{\alpha,\beta,\gamma}\}$ を偏微分で計算せよ。(3) $H$ が全回転に不変であるための必要十分条件を示せ。(4) $\alpha\ne\beta$ では $L$ が保存されない初期値を一つ選び、時間微分を評価せよ。(5) $G$ を反射も含む $O(2)$ に拡大したとき、$\alpha=\beta$ なら保存量と群不変性の結論がどうなるか説明せよ。

- Level: C

<!-- solution-start -->
**詳細解答。**

(1) $SO(2)$ の一パラメータ回転 $R_s$ の位置生成子は $-y\partial_x+x\partial_y$ です。[GMECH2の標準運動量写像](../GMECH2/index.md#thm-gmech2-cotangent-momentum)を $p_xdx+p_ydy$ で評価すると

$$
J_1=p_x(-y)+p_yx=xp_y-yp_x=:L.
$$

一般の $\xi\in\mathbb R$ では $J_\xi=\xi L$ です。

(2) [SYM4の正準括弧](../../SYM/SYM4/index.md#prop-sym4-coordinate-bracket)に代入します。$L$ の偏微分と $H$ の偏微分を順に列挙すると

$$
\begin{aligned}
&L_x=p_y,\ L_y=-p_x,\ L_{p_x}=-y,\ L_{p_y}=x,\\
&H_x=\alpha x+\gamma p_x,\quad H_y=\beta y+\gamma p_y,\\
&H_{p_x}=p_x/m_0+\gamma x,\quad
H_{p_y}=p_y/m_0+\gamma y.
\end{aligned}
$$

これをすべて入れると

$$
\begin{aligned}
\{L,H\}
&=p_y(p_x/m_0+\gamma x)
-p_x(p_y/m_0+\gamma y)\\
&\quad+y(\alpha x+\gamma p_x)-x(\beta y+\gamma p_y)\\
&=(p_yp_x-p_xp_y)/m_0
+\gamma(xp_y-yp_x+yp_x-xp_y)\\
&\quad+(\alpha-\beta)xy\\
&=(\alpha-\beta)xy.
\end{aligned}
$$

特に混合項 $\gamma(q\cdot p)$ から生じる四項は相殺します。

(3) $\alpha=\beta$ なら $|q|^2$、$|p|^2$、$q\cdot p$ の三つはいずれも直交変換で不変なので $H$ は全 $SO(2)$ で不変です。逆に全回転に不変なら $\{L,H\}=0$ が全位相空間で成立します。[保存と無限小対称性の同値命題](#prop-gmech3-converse)と (2) より $(\alpha-\beta)xy=0$ が全 $x,y$ で成り立ちます。$x=y=1$ を入れて $\alpha=\beta$ です。

(4) $\alpha\ne\beta$ で $(x,y,p_x,p_y)=(1,1,0,0)$ を初期条件とすると、局所解が存在し、

$$
\left.\frac{dL}{dt}\right|_{t=0}
=\{L,H\}(1,1,0,0)=\alpha-\beta\ne0.
$$

従ってこの軌道で $L$ は一定ではありません。

(5) $\alpha=\beta$ なら $H$ は $O(2)$ 全体でも不変です。$O(2)$ のLie代数は $\mathfrak{so}(2)$ なので、[幾何学的Noetherの定理](#thm-gmech3-geometric-noether)の結論として $L$ は各Hamilton軌道に沿って保存します。一方、反射 $R$ は $\det R=-1$ なので

$$
L(Rq,Rp)=\det(R)\,L(q,p)=-L(q,p).
$$

これは群作用で**別の初期点へ写した場合**の値の変化であり、**一つの初期点から出る時間軌道での保存**と矛盾しません。この区別は運動量写像の余随伴変換とNoether保存の違いそのものです。
<!-- solution-end -->

本章の結論は、Hamilton作用の運動量写像 $J$ を、**群の対称性があるHamiltonianの保存量**として読み直すことです。次章では一定となった $J$ の値を固定して得られる集合を調べ、その上で群作用を割り引くための正則性と安定化群へ進みます。
