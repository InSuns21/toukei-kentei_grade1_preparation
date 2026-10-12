# GMECH8 相対平衡・安定性・可積分系への橋

前章の[Euler剛体の主軸回転](../GMECH7/index.md#thm-gmech7-axes)では、角運動量球面上の六つの点が平衡点になりました。一方、[中心力問題の簡約](../GMECH5/index.md#thm-gmech5-reduced-dynamics)では、商空間で静止して見える点が、元の空間では一定速度で回る円軌道になりました。「平衡点」という語をどちらの空間で使っているのか、ここで整理する必要があります。

回転角のような対称性に沿った運動は残し、それ以外の方向には動かない状態を捉えます。そのうえで、保存エネルギーが「対称性を除いたずれ」を抑える仕組みを証明します。最後に、安定性に使った保存量と、後に可積分性を考えるための可換な保存量とを区別します。

## 1. 相対平衡：動いているのに商では静止する

$(M,\omega)$ を有限次元シンプレクティック多様体とし、Lie群 $G$ が左からHamilton作用するとします。運動量写像は同変であり、次の符号規約を使います。

$$
\iota_{X_H}\omega=dH,\qquad
\iota_{\xi_M}\omega=dJ_\xi,\qquad
J_\xi(m)=\langle J(m),\xi\rangle.
$$

これは[Hamilton作用と運動量写像の定義](../GMECH2/index.md#def-gmech2-hamiltonian-action)および[Hamiltonベクトル場の定義](../../SYM/SYM4/index.md#thm-sym4-existence-coordinate)と同じです。$H$ は $G$ 不変とし、$g\cdot m$ を作用と書きます。

普通の平衡では $X_H(m)=0$ が必要です。しかし円軌道上では $X_H(m)\ne0$ であっても、その速度が群軌道の接方向だけを向いています。群軌道を一つの点と見れば、これは静止した状態です。

<a id="def-gmech8-relative-equilibrium"></a>

<!-- formal-statement-start -->
> **定義（相対平衡）**  
> $G$ 不変な滑らかなHamiltonian $H$ と $m\in M$ に対し、ある $\xi\in\mathfrak g$ が存在して

$$
X_H(m)=\xi_M(m)
$$

> が成り立つとき、$m$ を相対平衡点と呼ぶ。このとき $\xi$ を相対平衡の生成元と呼ぶ。生成元は点の等方Lie代数に属する元を加えても同じ無限小速度を与えるため、一般には一意とは限らない。
<!-- formal-statement-end -->

<!-- definition-example-start: def-gmech8-relative-equilibrium -->
### 直接例：平面回転と円運動

位置 $q=r(\cos\theta,\sin\theta)$、運動量 $p$ に $SO(2)$ が同時回転として作用する場合を考えます。正準座標 $(r,\theta,p_r,\ell)$ では $\ell=xp_y-yp_x$ が運動量写像です。$\theta$ を角度とし、$\xi\in\mathbb R\simeq\mathfrak{so}(2)$ が作る群速度は

$$
\xi_M=\xi\,\frac{\partial}{\partial\theta}
$$

です。$r=r_0$、$p_r=0$、$\ell=\mu$ が時間によらず、$\dot\theta=\Omega$ なら

$$
X_H=\Omega\,\partial_\theta=\Omega_M.
$$

したがって円運動の各点は相対平衡です。$\Omega\ne0$ なら通常の平衡点ではありません。回転角だけを同一視する商では $(r_0,0)$ が一つの平衡点になります。
<!-- definition-example-end -->

### 群の速度とHamiltonianを比較する

運動量写像の条件は $\xi_M=X_{J_\xi}$ という意味でした。したがって「$X_H$ が群速度に一致する」とは「$H-J_\xi$ のHamiltonベクトル場が零になる」と同じです。この差を調べるために新しい関数を用意します。

<a id="def-gmech8-augmented-hamiltonian"></a>

<!-- formal-statement-start -->
> **定義（拡張Hamiltonian）**  
> Hamilton作用の運動量写像 $J:M\to\mathfrak g^*$、Hamiltonian $H:M\to\mathbb R$、$\xi\in\mathfrak g$ に対して

$$
H_\xi(m)=H(m)-\langle J(m),\xi\rangle
$$

> を生成元 $\xi$ に対応する拡張Hamiltonian（augmented Hamiltonian）と呼ぶ。
<!-- formal-statement-end -->

<!-- definition-example-start: def-gmech8-augmented-hamiltonian -->
### 直接例：回転する座標系のエネルギー

平面の中心力系で $J=\ell$、$\xi=\Omega$ なら $H_\Omega=H-\Omega\ell$ です。$H$ に $\theta$ が現れないとき、$\partial_\ell H=\dot\theta$ です。したがって

$$
\frac{\partial H_\Omega}{\partial\ell}
=\frac{\partial H}{\partial\ell}-\Omega
=\dot\theta-\Omega.
$$

拡張Hamiltonianの $\ell$ 微分を零にすることは、「回転座標系の角速度を零にする」ことに対応します。
<!-- definition-example-end -->

<a id="thm-gmech8-relative-critical"></a>

<!-- formal-statement-start -->
> **定理（相対平衡の臨界点判定）**  
> 有限次元シンプレクティック多様体 $(M,\omega)$ 上のHamiltonian $G$ 作用に対して $H$ を $G$ 不変、$J$ を運動量写像とする。$m\in M$ と $\xi\in\mathfrak g$ について、次の二条件は同値である。
>
> 1. $X_H(m)=\xi_M(m)$。
> 2. $dH_\xi(m)=0$。
>
> さらに $J$ が同変で $\mu=J(m)$ なら、これらの条件を満たす $\xi$ は $\mathfrak g_\mu$ に属し、$m$ からのHamilton軌道は

$$
m(t)=\exp(t\xi)\cdot m
$$

> で与えられる（時間発展が定義される範囲内）。この式の右辺は全実数 $t$ に対して定義されるため、この相対平衡軌道は全時刻へ延長できる。
<!-- formal-statement-end -->

### 証明の見取り図

運動量写像を定義する内部積の等式を差し引けば、拡張Hamiltonianの微分が $\omega(X_H-\xi_M,\cdot)$ になります。非退化性が臨界点と速度一致を同値にします。後半は流れの一意性と、同変な $J$ の値が保存されることを使います。

<!-- proof-start -->
### 証明

任意の $v\in T_mM$ に対して[運動量写像の定義](../GMECH2/index.md#def-gmech2-hamiltonian-action)を使い、

$$
\begin{aligned}
dH_\xi(m)(v)
&=dH(m)(v)-dJ_\xi(m)(v)\\
&=\omega_m(X_H(m),v)-\omega_m(\xi_M(m),v)\\
&=\omega_m(X_H(m)-\xi_M(m),v).
\end{aligned}
$$

$\omega_m$ が非退化なので、この式が全 $v$ で零であることと $X_H(m)-\xi_M(m)=0$ は同値です。

ここから $X_H(m)=\xi_M(m)$ と仮定します。$H$ が群不変で作用がシンプレクティックなので、[Hamilton流の群との可換性](../GMECH5/index.md#thm-gmech5-reduced-dynamics)の証明と同じ一意性の議論から

$$
X_H(g\cdot x)=dg_x(X_H(x)).
$$

一方、指数一パラメータ部分群では

$$
\frac{d}{dt}\bigl(\exp(t\xi)\cdot m\bigr)
=\xi_M(\exp(t\xi)\cdot m).
$$

$\exp(t\xi)$ と $\exp(s\xi)$ が可換であるため、この曲線上で $\xi_M$ も $\exp(t\xi)$ による $dg$ で運ばれます。初期点で二つの速度は等しいので、右辺の曲線は初期値 $m$ の $X_H$ 積分曲線です。局所解の一意性から提示した軌道式が従います。

[幾何学的Noetherの定理](../GMECH3/index.md#thm-gmech3-geometric-noether)により $J(m(t))=\mu$ です。一方、$J$ の同変性は

$$
J(\exp(t\xi)\cdot m)
=\operatorname{Ad}_{\exp(-t\xi)}^*\mu
$$

を意味するので、全 $t$ で右辺が $\mu$ です。この式を $t=0$ で微分すると $\operatorname{ad}_{\xi}^*\mu=0$（符号にかかわらず零）となり、$\xi\in\mathfrak g_\mu$ です。
<!-- proof-end -->

重要なのは、$H_\xi$ の臨界性を**位相空間全体で**判定することです。単に運動量レベル上の $H$ の臨界点であることとは、条件の書き方も適用先も異なります。

## 2. 簡約平衡とenergy–momentum法

対称性を除いた安定性を調べる前に、何を「近い」と測るか決めます。運動量を $\mu$ に固定し、そのレベル上で同じ $G_\mu$ 軌道に属する点を同一視します。[Marsden–Weinstein簡約](../GMECH5/index.md#thm-gmech5-marsden-weinstein)が使える場合、商空間

$$
M_\mu=J^{-1}(\mu)/G_\mu
$$

はシンプレクティック多様体となり、$G$ 不変な $H$ はその上の $H_\mu$ に降ります。

<a id="thm-gmech8-relative-reduced"></a>

<!-- formal-statement-start -->
> **定理（相対平衡と簡約平衡の対応）**  
> 有限次元Hamilton作用の同変な運動量写像 $J$ と $G$ 不変な $H$ を考える。$\mu$ は $J$ の正則値で、$G_\mu$ は $J^{-1}(\mu)$ に自由かつ固有に作用するとする。$m\in J^{-1}(\mu)$ と $y=[m]\in M_\mu$ に対して、$m$ が相対平衡であることと $y$ が簡約Hamiltonベクトル場 $X_{H_\mu}$ の平衡点であることは同値である。
<!-- formal-statement-end -->

### 証明の見取り図

商で速度が零ということは、元の速度が商写像の核、すなわち群軌道の接空間に入ることです。ただし、商で使う群は $G$ ではなく $G_\mu$ です。

<!-- proof-start -->
### 証明

包含 $i:J^{-1}(\mu)\hookrightarrow M$ と商写像 $\pi:J^{-1}(\mu)\to M_\mu$ を取ります。[簡約力学の定理](../GMECH5/index.md#thm-gmech5-reduced-dynamics)によって

$$
d\pi_m(X_H(m))=X_{H_\mu}(y).
$$

$y$ が平衡なら左辺は零です。自由かつ固有な作用の商写像は劣沈であり、

$$
\ker d\pi_m=T_m(G_\mu\cdot m)
=\{\xi_M(m):\xi\in\mathfrak g_\mu\}.
$$

従ってある $\xi\in\mathfrak g_\mu$ で $X_H(m)=\xi_M(m)$ となり、$m$ は相対平衡です。

逆に $m$ が相対平衡なら[臨界点判定](#thm-gmech8-relative-critical)の後半により生成元は $\mathfrak g_\mu$ に属します。だから $X_H(m)$ は $\ker d\pi_m$ に入り、$X_{H_\mu}(y)=0$ です。
<!-- proof-end -->

### 「安定」の対象を明示する

以下では、**運動量をちょうど $\mu$ に固定した摂動**を考えます。商の平衡点 $y$ のLyapunov安定性とは、任意の商空間の近傍 $U$ に対して小さい近傍 $V$ があり、$V$ から始まる簡約解が存在する限り $U$ にとどまることです。これは元のレベル集合上では、摂動後の軌道が $G_\mu$ の軌道を除いて元の相対平衡軌道に近いという意味です。

自由度を削った後のエネルギー $H_\mu$ に、平衡点で厳密な局所極小または局所極大があれば安定性を期待できます。ただし、単に「値が極値」だけでは十分ではありません。ここでは判定しやすい非退化な二次形式の条件を使います。

<a id="thm-gmech8-energy-momentum"></a>

<!-- formal-statement-start -->
> **定理（固定運動量面のenergy–momentum安定判定）**  
> 前定理の正則値・自由・固有作用の仮定の下、$m\in J^{-1}(\mu)$ を相対平衡とし、$y=[m]\in M_\mu$ とする。簡約Hamiltonian $H_\mu$ は $y$ で臨界点を持つ。そこでHessian

$$
d^2H_\mu(y):T_yM_\mu\times T_yM_\mu\to\mathbb R
$$

> が正定値または負定値なら、$y$ は簡約力学のLyapunov安定な平衡点である。従って元の運動は**固定レベル $J=\mu$ の摂動に関して**群軌道を除けば安定である。
>
> 同値な検査方法として、レベル集合上に制限した $H$ のHessianを群軌道方向で割った空間

$$
N_m=\ker dJ_m\,/\,T_m(G_\mu\cdot m)
$$

> 上で正定値または負定値と判定してもよい。さらに $dH_\xi(m)=0$ を満たす生成元 $\xi$ について、$H_\xi|_{J^{-1}(\mu)}=H|_{J^{-1}(\mu)}-\langle\mu,\xi\rangle$ なので、このHessianは拡張Hamiltonianのレベル方向制限から計算できる。
<!-- formal-statement-end -->

### 証明の見取り図

まず商空間の局所座標で臨界点にTaylor展開を適用し、エネルギー差が距離の二乗を下から抑えることを示します。保存量を用いて、小さい初期摂動が決めた小球から出られないことを証明します。次にレベル集合のHessianが群方向には零となることから、商上のHessianと一致する理由を確かめます。

<!-- proof-start -->
### 証明

正定値の場合を示します。$y$ を原点とする局所座標 $z\in\mathbb R^{2d}$ を取り、$K(z)=H_\mu(z)-H_\mu(0)$ と置きます。簡約平衡なので $DK(0)=0$ です。$A=D^2K(0)$ は対称正定値だから、単位球面での最小値

$$
\lambda=\min_{|u|=1}u^{\mathsf T}Au>0
$$

が存在します。$C^2$ 性と二次Taylor展開の剰余から、十分小さい $|z|$ に対して

$$
K(z)=\frac12z^{\mathsf T}Az+o(|z|^2),
\qquad
K(z)\ge\frac{\lambda}{4}|z|^2.
$$

小さい半径 $\varepsilon>0$ を選び、閉球が座標近傍に収まるようにします。球面 $|z|=\varepsilon$ 上では $K(z)\ge\lambda\varepsilon^2/4$ です。一方、連続性と $K(0)=0$ より、ある $0<\delta<\varepsilon$ について $|z_0|<\delta$ なら

$$
K(z_0)<\frac{\lambda\varepsilon^2}{4}.
$$

$H_\mu$ は簡約Hamilton流に沿って保存されます。従ってその軌道が最初に $|z|=\varepsilon$ へ達したとすると、その時刻のエネルギー差は下限以上なのに、初期値からの保存値は下限未満となり矛盾します。軌道は閉球内にとどまり、滑らかな有限次元ベクトル場の局所解延長定理により全時刻で存在します。これがLyapunov安定性です。負定値なら $-H_\mu$ に同じ議論を使います。

次にHessianの対応を示します。$F=H|_{J^{-1}(\mu)}$ とすると、[相対平衡と簡約平衡の対応](#thm-gmech8-relative-reduced)から $dF(m)=0$ です。$F=H_\mu\circ\pi$ であり、臨界点での連鎖律は

$$
d^2F(m)(v,w)
=d^2H_\mu(y)(d\pi_mv,d\pi_mw)
$$

となります。通常の二階連鎖律にある $dH_\mu(y)\,d^2\pi$ の項は $dH_\mu(y)=0$ で消えます。したがって $d\pi_m$ の核である $T_m(G_\mu\cdot m)$ はこの二次形式の核に含まれ、商 $N_m$ 上に降りたHessianが $d^2H_\mu(y)$ と一致します。

最後に $J=\mu$ 上では $\langle J,\xi\rangle=\langle\mu,\xi\rangle$ は定数なので、$H_\xi$ と $H$ のレベル制限は定数だけ異なり、Hessianも一致します。
<!-- proof-end -->

この定理はあくまで**固定運動量面**の安定判定です。$J$ そのものが少し変わる全位相空間の摂動について、同じ条件だけから無条件に軌道安定性を宣言してはいけません。運動量を動かしたときの近傍の相対平衡分枝や一様なエネルギー評価は別途調べます。また、Hessianが半正定値にとどまる場合は、この判定法から結論は出ません。

## 3. 計算例：回転対称振動子

$\kappa>0$、$r>0$ とし、平面の質量1の等方振動子を極座標で書きます。

$$
H(r,\theta,p_r,\ell)
=\frac12p_r^2+\frac{\ell^2}{2r^2}+\frac{\kappa r^2}{2},
\qquad
J=\ell.
$$

座標範囲を $r>0$ に限ったのは極座標の原点を避けるためです。$\mu\ne0$ を固定します。平面回転は $r>0$ の各位置で自由、$SO(2)$ はコンパクトなので固有作用です。また $dJ=d\ell\ne0$ なので $\mu$ は正則値です。よって[簡約定理](../GMECH5/index.md#thm-gmech5-marsden-weinstein)の仮定が満たされます。

商上では

$$
H_\mu(r,p_r)=\frac12p_r^2+U_\mu(r),
\qquad
U_\mu(r)=\frac{\mu^2}{2r^2}+\frac{\kappa r^2}{2}.
$$

平衡条件は $p_r=0$ と $U_\mu'(r)=0$ です。微分を明示すると

$$
U_\mu'(r)=-\frac{\mu^2}{r^3}+\kappa r,
\qquad
\kappa r_0^4=\mu^2,
\qquad
r_0=\left(\frac{\mu^2}{\kappa}\right)^{1/4}.
$$

元のHamilton方程式では $\dot\theta=\partial_\ell H=\ell/r^2$ なので、この点の角速度は

$$
\Omega=\frac{\mu}{r_0^2}.
$$

拡張Hamiltonian $H_\Omega=H-\Omega\ell$ を全変数で微分します。$\partial_\theta H_\Omega=0$、$\partial_{p_r}H_\Omega=p_r$、そして

$$
\partial_rH_\Omega=-\frac{\ell^2}{r^3}+\kappa r,
\qquad
\partial_\ell H_\Omega=\frac{\ell}{r^2}-\Omega.
$$

$(r,p_r,\ell)=(r_0,0,\mu)$ を代入すればすべて零です。[相対平衡の臨界点判定](#thm-gmech8-relative-critical)により、この円運動は相対平衡であると再確認できます。

Hessianは商の $(r,p_r)$ 順に

$$
D^2H_\mu(r_0,0)
=\begin{pmatrix}
3\mu^2/r_0^4+\kappa&0\\
0&1
\end{pmatrix}
=\begin{pmatrix}4\kappa&0\\0&1\end{pmatrix}.
$$

$\kappa>0$ なので正定値です。[energy–momentum安定判定](#thm-gmech8-energy-momentum)により、固定 $\ell=\mu$ での円運動は回転を除いて非線形Lyapunov安定です。線形化しても

$$
\dot\rho=\eta,\qquad
\dot\eta=-4\kappa\rho,\qquad
\ddot\rho+4\kappa\rho=0
$$

となり、角振動数 $2\sqrt\kappa$ を得ます。ただしこの線形化だけでは、一般の非線形系で安定性を証明したことにはならず、ここでは二次形式と保存エネルギーの議論が本体です。

### 極値判定が使えない場合

例えば通常の1自由度系 $H(q,p)=p^2/2+q^4$ の原点では、Hessianは $q$ 方向に零固有値を持つのに、$H$ は厳密な局所最小であり、保存エネルギーの等位集合が小さい近傍に閉じ込めるので安定です。一方、

$$
\widetilde H(q,p)=\frac12p^2-q^4
$$

の原点でもHessianは同じ半正定値型ですが、$q(0)>0,p(0)=0$ とすれば

$$
\dot q=p,\qquad \dot p=4q^3>0
$$

です。正の $q$ は増加し始め、任意に小さい正の初期点から有限時間で決めた正の距離へ抜けるため不安定です。非退化という仮定を失うと、Hessianの情報だけでは二つの例を区別できません。

## 4. 剛体の平衡と保存量の数え方

[Euler剛体](../GMECH7/index.md#thm-gmech7-euler)は物体角運動量 $M$ の空間で

$$
\dot M=M\times I^{-1}M,\qquad
H(M)=\frac12\sum_{i=1}^3\frac{M_i^2}{I_i}
$$

と書けます。これは三次元空間上の退化したLie–Poisson構造であり、[Casimirとシンプレクティック葉](../GMECH6/index.md#thm-gmech6-leaves)によって $|M|=r>0$ の球面上で二次元のHamilton系になります。

$0<I_1<I_2<I_3$ とします。球面上の平衡は $M=\pm re_i$ です。例えば $M=re_1$ 付近で $M_2=u,M_3=v$ とおけば $M_1^2=r^2-u^2-v^2$ なので

$$
H-\frac{r^2}{2I_1}
=\frac12\left[
\left(\frac1{I_2}-\frac1{I_1}\right)u^2+
\left(\frac1{I_3}-\frac1{I_1}\right)v^2
\right].
$$

二係数は負で、球面上の厳密な極大です。同じ計算で $M=\pm re_3$ は厳密な極小となり、角運動量の長さを固定した葉上ではエネルギー保存によって安定です。対して $M=\pm re_2$ では二係数の符号が逆なので鞍点となります。[中間軸の線形化](../GMECH7/index.md#thm-gmech7-phase-curves)で実固有値が出ることとも整合します。

ここで $C(M)=|M|^2$ と $H(M)$ は共に保存量ですが、**球面上では $C=r^2$ は定数**です。したがって二次元シンプレクティック葉の上で独立な保存量を二つ獲得したわけではありません。「保存量を数える」ときは、それらの微分が実際の相空間の接方向で一次独立かを確認しなければなりません。

## 5. Poisson可換性からINT系列へ

これまでの保存則は、ある関数 $F$ がHamilton軌道に沿って一定、つまり

$$
\frac{dF}{dt}=dF(X_H)=\{F,H\}=0
$$

という条件でした。ここでの括弧は[SYM4のPoisson括弧](../../SYM/SYM4/index.md#def-sym4-poisson-bracket)です。しかし複数の保存量 $F_1,F_2,\ldots$ があっても、それらの間の括弧 $\{F_i,F_j\}$ が零になるとは限りません。

<a id="prop-gmech8-involution-check"></a>

<!-- formal-statement-start -->
> **命題（可換な保存量の直接検査）**  
> 正準座標 $(q_1,q_2,p_1,p_2)$ を持つ四次元シンプレクティック空間で、$\omega_1,\omega_2>0$ として

$$
F_1=\frac12(p_1^2+\omega_1^2q_1^2),
\qquad
F_2=\frac12(p_2^2+\omega_2^2q_2^2),
\qquad
H=F_1+F_2
$$

> と置く。このとき $\{F_1,F_2\}=0$ で両方とも $H$ の第一積分である。さらに $dF_1,dF_2$ は $(q_1,p_1)\ne(0,0)$ かつ $(q_2,p_2)\ne(0,0)$ の領域で一次独立である。
<!-- formal-statement-end -->

### 証明の見取り図

二つの振動子は別の正準座標対だけに依存します。Poisson括弧を座標別に展開し、独立性はそれぞれの座標平面上の勾配から確かめます。

<!-- proof-start -->
### 証明

各 $i=1,2$ について

$$
\partial_{q_i}F_i=\omega_i^2q_i,\qquad
\partial_{p_i}F_i=p_i
$$

であり、$j\ne i$ なら $\partial_{q_j}F_i=\partial_{p_j}F_i=0$ です。[正準Poisson括弧の成分公式](../../SYM/SYM4/index.md#prop-sym4-coordinate-bracket)に代入すると

$$
\begin{aligned}
\{F_1,F_2\}
&=\sum_{i=1}^2
\left(\partial_{q_i}F_1\,\partial_{p_i}F_2
-\partial_{p_i}F_1\,\partial_{q_i}F_2\right)\\
&=0+0=0.
\end{aligned}
$$

また反対称性 $\{F_i,F_i\}=0$ から

$$
\{F_1,H\}=\{F_1,F_1\}+\{F_1,F_2\}=0,
$$

$$
\{F_2,H\}=\{F_2,F_1\}+\{F_2,F_2\}=0.
$$

最後に、$a\,dF_1+b\,dF_2=0$ とします。$dq_1,dp_1$ 成分は $a(\omega_1^2q_1,p_1)=0$ なので第一対が非零なら $a=0$ です。$dq_2,dp_2$ 成分は $b(\omega_2^2q_2,p_2)=0$ なので第二対が非零なら $b=0$ です。従って一次独立です。
<!-- proof-end -->

この例のように、四次元のシンプレクティック空間（二自由度）で二つの独立な可換第一積分があると、積分曲線を整理するための非常に強い構造が現れます。ただし原点や一方の振動子が静止した点では独立性が壊れます。一般の $2n$ 次元の場合に必要な個数、正則共通レベル、コンパクト性、そこに現れるトーラスと作用角変数は、後続のINT1以降で定理として扱います。

もう一つ、中心力問題の $H$ と角運動量 $J=\ell$ は[Noether保存則](../GMECH3/index.md#thm-gmech3-geometric-noether)で $\{J,H\}=0$ です。しかし円運動の相対平衡では

$$
dH(m)=\Omega\,dJ(m)
$$

です。これは[拡張Hamiltonianの臨界点判定](#thm-gmech8-relative-critical)を $H_\Omega$ に適用した式で、**二つの保存量の微分はこの点で独立ではありません**。可換性、保存性、独立性はそれぞれ違う検査項目だと分かります。

## 6. 演習

### Level A

<a id="ex-gmech8-a01"></a>
**A1. 並進運動の相対平衡。** $M=T^*\mathbb R$、$\omega=dq\wedge dp$、$H=p^2/2$ に $G=\mathbb R$ が $a\cdot(q,p)=(q+a,p)$ と作用する。運動量写像を求め、すべての初期点が相対平衡になることを拡張Hamiltonianと解の両方で示せ。

- Level: A

<!-- solution-start -->
**詳細解答。** 群生成子 $\xi$ に対するベクトル場は $\xi_M=\xi\partial_q$ です。正準形式に内部積を取ると $\iota_{\xi_M}\omega=\xi\,dp=d(\xi p)$ なので $J=p$ です。[相対平衡の臨界点判定](#thm-gmech8-relative-critical)に使う拡張Hamiltonianは

$$
H_\xi=\frac12p^2-\xi p,\qquad
dH_\xi=(p-\xi)\,dp.
$$

点 $(q_0,p_0)$ に対して $\xi=p_0$ を選べば $dH_\xi(q_0,p_0)=0$ であり相対平衡です。Hamilton方程式は $\dot q=p,\ \dot p=0$ なので解は $q(t)=q_0+p_0t,\ p(t)=p_0$ です。これは $\exp(t\xi)\cdot(q_0,p_0)$ と一致します。
<!-- solution-end -->

<a id="ex-gmech8-a02"></a>
**A2. 回転対称振動子の数値例。** 第3節の系で $\kappa=4,\mu=2$ とする。平衡半径、角速度、Hessianの二固有値、半径方向の小振動角振動数を求めよ。

- Level: A

<!-- solution-start -->
**詳細解答。** $r_0^4=\mu^2/\kappa=4/4=1$、$r_0>0$ なので $r_0=1$ です。$\Omega=\mu/r_0^2=2$ です。[固定運動量面の判定](#thm-gmech8-energy-momentum)で使うHessianは $\operatorname{diag}(4\kappa,1)=\operatorname{diag}(16,1)$ なので二固有値は16と1で正です。線形化 $\ddot\rho+4\kappa\rho=0$ に $\kappa=4$ を入れると $\ddot\rho+16\rho=0$、小振動角振動数は4です。
<!-- solution-end -->

<a id="ex-gmech8-a03"></a>
**A3. 保存量のPoisson可換性。** 四次元正準座標で $F_1=(p_1^2+4q_1^2)/2$、$F_2=(p_2^2+9q_2^2)/2$ とする。$\{F_1,F_2\}$ と $\{F_1,F_1+F_2\}$ を求め、$dF_1,dF_2$ が独立でない点を列挙せよ。

- Level: A

<!-- solution-start -->
**詳細解答。** $F_1$ は $(q_1,p_1)$ のみに、$F_2$ は $(q_2,p_2)$ のみに依存するため[可換保存量の命題](#prop-gmech8-involution-check)の成分公式の各項が零で、$\{F_1,F_2\}=0$ です。また $\{F_1,F_1\}=0$ なので $\{F_1,F_1+F_2\}=0$ です。$dF_1=4q_1\,dq_1+p_1\,dp_1$、$dF_2=9q_2\,dq_2+p_2\,dp_2$ なので、片方でも微分が零なら独立でありません。従って $(q_1,p_1)=(0,0)$ または $(q_2,p_2)=(0,0)$ が全ての例外点です。
<!-- solution-end -->

<a id="ex-gmech8-a04"></a>
**A4. Casimirは球面で何になるか。** $\mathbb R^3\simeq\mathfrak{so}(3)^*$ 上の $C(M)=M_1^2+M_2^2+M_3^2$ と $|M|=r>0$ の球面を考える。$d(C|_{S_r^2})$ を接ベクトルで評価せよ。球面上の独立な第一積分に $C$ を数えられるか。

- Level: A

<!-- solution-start -->
**詳細解答。** 球面の接空間は $T_MS_r^2=\{v:M\cdot v=0\}$ です。$dC_M(v)=2M\cdot v=0$ なので、制限 $C|_{S_r^2}=r^2$ の微分は全接方向で零です。[シンプレクティック葉の定理](../GMECH6/index.md#thm-gmech6-leaves)より実際の二次元相空間はこの球面なので、$C$ は葉上の独立な第一積分には数えられません。
<!-- solution-end -->

### Level B

<a id="ex-gmech8-b01"></a>
**B1. Kepler円軌道の安定性。** $H=p_r^2/2+\ell^2/(2r^2)-k/r$（$k>0,r>0$）と $J=\ell$ について、$\mu\ne0$ における円軌道の半径、角速度および商上のHessianを求め、固定 $\mu$ の軌道安定性を証明せよ。

- Level: B

<!-- solution-start -->
**詳細解答。** $U_\mu(r)=\mu^2/(2r^2)-k/r$ とすると

$$
U_\mu'(r)=-\frac{\mu^2}{r^3}+\frac{k}{r^2}
=\frac{-\mu^2+kr}{r^3}.
$$

従って $r_0=\mu^2/k$、$p_r=0$ です。Hamilton方程式から $\Omega=\partial_\ell H=\mu/r_0^2=k^2/\mu^3$ です。二階微分は

$$
U_\mu''(r)=\frac{3\mu^2}{r^4}-\frac{2k}{r^3},
\quad
U_\mu''(r_0)=\frac{3\mu^2-2kr_0}{r_0^4}
=\frac{\mu^2}{r_0^4}>0.
$$

従って $D^2H_\mu(r_0,0)=\operatorname{diag}(\mu^2/r_0^4,1)$ が正定値です。$\mu\ne0$ では回転作用が自由・固有、$dJ=d\ell$ は全射なので、[energy–momentum安定判定](#thm-gmech8-energy-momentum)から商の平衡はLyapunov安定です。元の円軌道は固定角運動量の摂動に対し、回転位相の差を除いて安定です。
<!-- solution-end -->

<a id="ex-gmech8-b02"></a>
**B2. 極値と鞍点を比べる。** 正準平面 $(q,p)$ 上の二つのHamiltonian $H_-=-(p^2+q^2)/2$ と $H_s=(p^2-q^2)/2$ について原点のHessianを求め、前者の安定性と後者の不安定性を各々示せ。

- Level: B

<!-- solution-start -->
**詳細解答。** 座標順を $(q,p)$ とすると

$$
D^2H_-(0)=\begin{pmatrix}-1&0\\0&-1\end{pmatrix},
\qquad
D^2H_s(0)=\begin{pmatrix}-1&0\\0&1\end{pmatrix}.
$$

$H_-$ は負定値なので $-H_-=(q^2+p^2)/2$ が保存され、半径 $\sqrt{q^2+p^2}$ は一定です。よって任意の小さい初期点は同じ距離にとどまり安定です。$H_s$ のHamilton方程式は $\dot q=p,\ \dot p=q$、従って $\ddot q=q$ です。初期条件 $(q(0),p(0))=(\delta,\delta)$ なら $q(t)=\delta e^t,\ p(t)=\delta e^t$ となり、任意に小さい $\delta>0$ から固定した正の距離へ達するので不安定です。後者のHessianは不定符号で、正負の固有方向のエネルギー変化が打ち消し合います。
<!-- solution-end -->

<a id="ex-gmech8-b03"></a>
**B3. 剛体の二つの安定主軸。** $0<I_1<I_2<I_3$、$|M|=r>0$ とする。球面の $M=\pm re_1$ と $M=\pm re_3$ の周囲で、残り二成分を局所座標として $H$ を二次式に直し、安定性の理由を述べよ。中間軸についても符号を確認せよ。

- Level: B

<!-- solution-start -->
**詳細解答。** $M=\pm re_1$ 付近では $u=M_2,v=M_3$ を取り $M_1^2=r^2-u^2-v^2$ なので

$$
H-\frac{r^2}{2I_1}
=\frac12\left[
(1/I_2-1/I_1)u^2+(1/I_3-1/I_1)v^2
\right].
$$

$I_1$ が最小なので二係数は負で、球面上の厳密な極大です。同様に $M=\pm re_3$ 付近では $u=M_1,v=M_2$ として

$$
H-\frac{r^2}{2I_3}
=\frac12\left[
(1/I_1-1/I_3)u^2+(1/I_2-1/I_3)v^2
\right],
$$

二係数は正で厳密な極小です。球面は[Casimirによる保存葉](../GMECH6/index.md#thm-gmech6-leaves)なので、エネルギー保存と局所の二次形式の符号から両軸はその葉上で安定です。$M=\pm re_2$ 付近では $(M_1,M_3)=(u,v)$ とすると係数 $1/I_1-1/I_2>0$ と $1/I_3-1/I_2<0$ が混在します。この鞍点では極値に基づく安定判定は使えず、[中間軸の線形化](../GMECH7/index.md#thm-gmech7-phase-curves)では不安定な実固有値が実際に生じます。
<!-- solution-end -->

<a id="ex-gmech8-b04"></a>
**B4. 可換でも独立でない点。** 第3節の等方振動子で $F_1=H,F_2=J=\ell$ とする。$\{F_1,F_2\}$ を計算し、$(r,p_r,\theta,\ell)$ における $dF_1,dF_2$ の一次独立性が失われる点を全て求めよ。

- Level: B

<!-- solution-start -->
**詳細解答。** $H$ は $\theta$ に依存しないので、正準座標対 $(\theta,\ell)$ について

$$
\{J,H\}
=\partial_\theta J\,\partial_\ell H
-\partial_\ell J\,\partial_\theta H
=0\cdot(\ell/r^2)-1\cdot0=0.
$$

一方、$dJ=d\ell$ で

$$
dH=\left(\kappa r-\frac{\ell^2}{r^3}\right)dr
+p_r\,dp_r+\frac{\ell}{r^2}d\ell.
$$

$dH$ と $dJ$ が従属するための必要十分条件は $dr,dp_r$ の係数がともに零となること、つまり

$$
p_r=0,\qquad \kappa r^4=\ell^2.
$$

です。$r>0,\kappa>0$ なのでこの集合では $\ell\ne0$ です。これらは各 $\ell$ の円軌道の相対平衡であり、そこで $dH=(\ell/r^2)dJ$ です。それ以外の点では $dH,dJ$ は独立です。可換性は全域で成立しても独立性は相対平衡で失われます。
<!-- solution-end -->

### Level C

<a id="ex-gmech8-c01"></a>
**C1. 相対平衡・安定性・可換保存量を一度に検算する。** $M=T^*(\mathbb R^2\setminus\{0\})$、$\kappa>0$ とし、極座標で

$$
\omega=dr\wedge dp_r+d\theta\wedge d\ell,\qquad
H=\frac12p_r^2+\frac{\ell^2}{2r^2}+\frac{\kappa r^2}{2},\qquad
J=\ell
$$

を考える。$\mu\ne0$ に固定し、(i) 自由・固有・正則値条件、(ii) 相対平衡と拡張Hamiltonianの臨界性、(iii) 商上の非線形Lyapunov安定性、(iv) $\{H,J\}=0$ と独立性が失われる集合をそれぞれ導け。

- Level: C

<!-- solution-start -->
**詳細解答。**

**(i) 簡約の条件。** $q\ne0$ なので位置 $q$ を固定する平面回転は恒等元だけであり、同時回転作用は自由です。$SO(2)$ はコンパクトなので作用は固有です。また $dJ=d\ell$ はどの点でも零でなく、一次元余接空間への全射です。$\mu\ne0$ のレベルは、任意の $r>0,\theta,p_r$ と $\ell=\mu$ により非空です。従って $\mu$ は正則値で、[Marsden–Weinstein簡約](../GMECH5/index.md#thm-gmech5-marsden-weinstein)が使えます。

**(ii) 相対平衡の計算。** 簡約系の有効ポテンシャルは $U_\mu(r)=\mu^2/(2r^2)+\kappa r^2/2$ です。

$$
U_\mu'(r)=-\frac{\mu^2}{r^3}+\kappa r=0
\quad\Longleftrightarrow\quad
r_0^4=\frac{\mu^2}{\kappa}.
$$

$r_0=(\mu^2/\kappa)^{1/4}>0$、$p_r=0$ が唯一の簡約平衡です。元の方程式から $\dot\theta=\partial_\ell H=\ell/r^2$ なので $\Omega=\mu/r_0^2$ です。拡張Hamiltonian $H_\Omega=H-\Omega J$ を使い、

$$
dH_\Omega=
\left(-\frac{\ell^2}{r^3}+\kappa r\right)dr
+p_r\,dp_r
+\left(\frac{\ell}{r^2}-\Omega\right)d\ell.
$$

この式を $(r,p_r,\ell)=(r_0,0,\mu)$ へ代入すると三係数がすべて零です。$\theta$ 微分も零なので $dH_\Omega=0$ です。[臨界点判定](#thm-gmech8-relative-critical)によって円軌道は相対平衡です。

**(iii) 固定運動量面での安定性。** $\ell=\mu$ で $\theta$ を除いた商のHessianは

$$
D^2H_\mu(r_0,0)
=\begin{pmatrix}
3\mu^2/r_0^4+\kappa&0\\
0&1
\end{pmatrix}.
$$

平衡条件 $\mu^2/r_0^4=\kappa$ を代入すれば対角成分は $4\kappa>0$ と $1>0$ です。[energy–momentum安定判定](#thm-gmech8-energy-momentum)の仮定が満たされるので、$J=\mu$ の摂動に対する商平衡は非線形Lyapunov安定です。これは位相角 $\theta$ が近い値に固定される主張ではなく、回転によって同一視した距離が小さいままという主張です。

**(iv) Poisson可換性と独立性。** 正準Poisson括弧から

$$
\{J,H\}=-\partial_\theta H=0,
\qquad
\{H,J\}=0.
$$

また $dJ=d\ell$、$dH=(-\ell^2/r^3+\kappa r)\,dr+p_r\,dp_r+(\ell/r^2)\,d\ell$ です。二つの微分が従属するのは

$$
p_r=0,\qquad \kappa r^4=\ell^2
$$

のとき、かつそのときに限ります。これは全 $\ell\ne0$ の相対平衡を集めた集合です。それ以外の領域では、四次元相空間上に独立な可換保存量が二つ存在します。相対平衡上では可換性と保存性は残りますが、独立性は失われます。
<!-- solution-end -->

## 7. 次に必要な理論

幾何学的力学では、対称性が保存量を生み、運動量値を固定すると自由度が減り、その商で見えた平衡の安定性をエネルギーから検査できました。ただし「いくつ保存量があるか」だけでは軌道全体が解けるとは限りません。微分の独立性、Poisson可換性、共通レベル集合の正則性を順に調べる必要があります。

次の可積分系の講義では、ここで実際に計算した条件を一般の $2n$ 次元Hamilton系へ広げ、共通レベル集合がいつトーラスになり、その上の運動がどのように直線化されるかを学びます。
