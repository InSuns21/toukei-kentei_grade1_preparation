# SYZ1-06 McLean理論II――無障害性と変形空間

<!-- definition-example-audit: strict -->

## 1. 一次解を、実際の曲がったSLagへ持ち上げる

[前講の線形化定理](../SYZ1-05/index.md#thm-syz1-05-linearization)では、法線速度に対応する1形式 $\alpha$ が

$$
d\alpha=0,\qquad d^*\alpha=0
$$

を満たすことが、特殊Lagrange（SLag）方程式を**一次まで**保つ条件だった。しかし、非線形方程式では一次項が消えても二次・三次項は残る。前講の $f=xyz$ のグラフがまさにその注意例である。

今回は $L$ を**連結・コンパクト・境界なし**とする。このとき、単に未知数と方程式の数を数えるのではなく、非線形方程式の値が取り得る空間を先に狭める。値域の「完全形式」という制約を使うと、線形化の見かけの余核が消え、陰関数定理を適用できる。結果として、調和1形式はすべて真の局所変形へ延長できる。

証明に使う解析的な道具は、[GA6のHodge分解](../../GA/GA6/index.md#thm-ga6-hodge-decomposition)とGreen作用素、楕円型正則性、Banach空間の陰関数定理である。有限次元の[陰関数定理](../../../基礎科目/RA/RA6A/index.md#thm-ra6a-implicit-function)と同じ「補空間の未知数を解く」仕組みを、微分形式の空間に適用する。

## 2. 固定位相の非線形方程式を作る

$(X,J,g,\omega,\Omega)$ を複素次元 $n\ge1$ の滑らかなKähler多様体とし、$\omega$ は閉形式、$\Omega$ は閉じた零でない正則 $n$ 形式とする。$\Omega$ は[規格化したSLag条件](../SYZ1-04/index.md#prop-syz1-04-slag-conditions)の点ごとの規格化を満たすものとする。$L\subset X$ は、位相 $\theta$、指定した向きに対して

$$
\omega|_L=0,\quad
\operatorname{Im}(e^{-i\theta}\Omega)|_L=0,\quad
\operatorname{Re}(e^{-i\theta}\Omega)|_L=\operatorname{vol}_L
$$

を満たす、連結・コンパクト・境界なしの滑らかな埋め込み $n$ 次元部分多様体とする。

[法線場と1形式の同定](../SYZ1-05/index.md#prop-syz1-05-hodge-identification) $V=J\alpha^\sharp$ を用いる。$\sharp$ は $L$ の誘導計量で添字を上げる操作である。法線指数写像の管状近傍で、十分小さい1形式 $\alpha$ から

$$
F_\alpha(p)=\exp^{g}_{p}\!\bigl(J\alpha^\sharp_p\bigr),
\qquad F_0(p)=p
$$

を作る。$\exp^g$ は $X$ のRiemann計量の測地線指数写像である。$L$ のコンパクト性により、$\alpha$ の $C^1$ ノルムを十分小さくすれば $F_\alpha$ は埋め込みであり、任意の十分近い埋め込み像を再パラメータ化したものは、このような法線グラフとして一意に表せる。以後、同じ部分多様体のパラメータの付け替えは数えない。

$$
\Psi=\operatorname{Im}(e^{-i\theta}\Omega)
$$

と置く。$L$ 上の2形式と $n$ 形式を値に取る写像

$$
\mathcal F(\alpha)=\bigl(F_\alpha^*\omega,\;F_\alpha^*\Psi\bigr)
$$

を考える。$\mathcal F(0)=(0,0)$ である。微小な $\alpha$ では実部 $F_\alpha^*\operatorname{Re}(e^{-i\theta}\Omega)$ が正の向きの体積形式として正なので、[前講までのSLag判定](../SYZ1-04/index.md#prop-syz1-04-slag-conditions)から

$$
\mathcal F(\alpha)=0
\quad\Longleftrightarrow\quad
F_\alpha(L)\text{ は位相 }\theta\text{ のSLag}
$$

となる。ここでの同値は、**正の分枝を保つ十分小さい近傍**でのみ述べている。

## 3. 値域を完全形式に限定する

一般の2形式と最高次形式を値域にすると、$d\alpha$ は任意の2形式を作れない。たとえば $d\alpha$ は必ず完全形式である。さらに重要なのは、**非線形な** $\mathcal F(\alpha)$ 自体にも同じ制約があることだ。

形式 $\eta$ がある一つ低い次数の形式 $\zeta$ の外微分 $\eta=d\zeta$ と書けるとき、$\eta$ は[完全形式](../../GEO/GEO9/index.md#def-geo9-closed-exact)である。以後、完全な $k$ 形式の集合を $d\Omega^{k-1}(L)$ と表す。$n=1$ なら2形式の成分は常に0と約束する。

<a id="def-syz1-06-exact-target"></a>

<!-- formal-statement-start -->
> **定義（SLag変形の完全形式値域）**  
> $L$ を連結・コンパクト・境界なしの向き付き $n$ 次元滑らかな多様体とする。SLag変形写像の値域として、2形式と最高次形式の次の直積空間を取る。

$$
\mathcal E=d\Omega^1(L)\oplus d\Omega^{n-1}(L).
$$

> $n=1$ では第1因子を $\{0\}$ とする。いずれの因子も、外微分として得られる形式だけを含む。
<!-- formal-statement-end -->

<!-- definition-example-start: def-syz1-06-exact-target -->
### 直接例：二次元トーラスで値域の条件を判定する

**定義の確認**

標準向きの $T^2=\mathbb R^2/\mathbb Z^2$ で、$\eta=\sin(2\pi x)\,dx\wedge dy$ とする。1形式 $\zeta=-\cos(2\pi x)\,dy/(2\pi)$ は大域的に周期的であり、

$$
d\zeta=\sin(2\pi x)\,dx\wedge dy=\eta
$$

なので $\eta$ は完全な2形式である。一方、$dx\wedge dy$ が完全なら[一般Stokesの定理](../../GEO/GEO8/index.md#thm-geo8-general-stokes)から積分は0のはずだが、$\int_{T^2}dx\wedge dy=1$。従ってこちらは完全ではない。最高次形式の「積分が0」という条件には意味がある。
<!-- definition-example-end -->

<a id="lem-syz1-06-exact-image"></a>

<!-- formal-statement-start -->
> **補題（非線形SLag変形写像の完全性）**  
> 第2節のコンパクト境界なしSLag $L$ と、包含写像に十分近い法線グラフ $F_\alpha$ を取る。このとき

$$
F_\alpha^*\omega\in d\Omega^1(L),\qquad
F_\alpha^*\Psi\in d\Omega^{n-1}(L).
$$

> 従って $\mathcal F$ の値は、第3節の $\mathcal E$ に属する。
<!-- formal-statement-end -->

### 証明の見取り図

$F_{t\alpha}$ は包含写像から $F_\alpha$ へのホモトピーである。閉形式の引き戻しの時間微分は、[Cartanの公式](../../GEO/GEO7/index.md#thm-geo7-cartan-formula)により完全形式になる。その時間積分も完全である。

<!-- proof-start -->
### 証明

$F_t=F_{t\alpha}$（$0\le t\le1$）と置き、速度場を $W_t=\partial_tF_t$ とする。$\eta$ を $X$ 上の任意の閉じた $k$ 形式とすると、引き戻しの微分公式と $d\eta=0$ から

$$
\frac{d}{dt}F_t^*\eta
=d\bigl(F_t^*(\iota_{\widetilde W_t}\eta)\bigr)
$$

となる。$\widetilde W_t$ は $F_t(L)$ の近傍への速度場の延長であり、右辺は延長に依存しない。$t$ について0から1まで積分し、$d$ と積分の交換を行うと

$$
F_\alpha^*\eta-F_0^*\eta
=d\left(\int_0^1F_t^*(\iota_{\widetilde W_t}\eta)\,dt\right).
$$

$\eta=\omega$ と $\eta=\Psi$ はともに閉形式で、$F_0^*\omega=F_0^*\Psi=0$ なので、それぞれ完全な2形式・完全な $n$ 形式が得られる。$n=1$ の場合、2形式は次元により0であり、同じ結論になる。
<!-- proof-end -->

この補題が無障害性の鍵である。任意の2形式や任意の $n$ 形式を解ける必要はない。**非線形方程式が実際に入る完全形式の範囲**で線形化が全射ならよい。

## 4. 線形化の核と像をHodge理論で決める

[前講の線形化](../SYZ1-05/index.md#thm-syz1-05-linearization)を $F_\alpha$ に適用すると、$0$ における微分は

$$
D=D\mathcal F|_0,\qquad
D\alpha=(-d\alpha,\;d*\alpha)
$$

である。第二成分は $d^*\alpha=-*d*\alpha$ により $-(d^*\alpha)\operatorname{vol}_L$ と等しい。従って $D\alpha=0$ は閉かつ余閉であること、すなわち調和1形式であることに等しい。

$L$ の誘導計量で $\delta=d^*$、$\Delta_H=d\delta+\delta d$ と置く。[エネルギー恒等式と調和性の判定](../../GA/GA6/index.md#thm-ga6-energy)により、コンパクト境界なしの $L$ 上では $\Delta_Hh=0$ と $dh=\delta h=0$ は同値である。調和1形式の有限次元空間を $\mathcal H^1(L)$ とする。

[GA6のHodge直交分解](../../GA/GA6/index.md#thm-ga6-hodge-decomposition)を1形式へ適用すると

$$
\Omega^1(L)=\mathcal H^1(L)
\oplus d\Omega^0(L)\oplus\delta\Omega^2(L)
$$

という互いに直交する分解がある（各成分は一意で、原始形式は一意とは限らない）。後ろの二成分をまとめて $\mathcal K$ と書く。調和成分 $h$ は $D$ の核なので、$D$ を $\mathcal K$ に制限して可逆にできることを示そう。

[Hodge Green作用素](../../GA/GA6/index.md#def-ga6-green-operator)から、次数 $k$ の作用素 $G_k$ は

$$
\Delta_HG_k\eta=\eta-P_k\eta
$$

を満たす。$P_k$ は調和 $k$ 形式への直交射影である。ここでのGreen作用素は調和成分を除いた部分の逆であり、全形式に対して $\Delta_HG_k=I$ と誤って使ってはいけない。

<a id="lem-syz1-06-right-inverse"></a>

<!-- formal-statement-start -->
> **補題（完全形式値域への線形化の全射性）**  
> $L$ を連結・コンパクト・境界なしの向き付きRiemann $n$ 次元多様体とする。$D:\Omega^1(L)\to\mathcal E$ を

$$
D\alpha=(-d\alpha,\;d*\alpha)
$$

> と定める。すると $\ker D=\mathcal H^1(L)$ であり、$D|_{\mathcal K}:\mathcal K\to\mathcal E$ は線形同型である。$n\ge2$ で $\eta=d\zeta$ が完全な2形式、$\xi=f\operatorname{vol}_L$ が完全な $n$ 形式なら、平均値0の解 $u$ を

$$
\Delta_Hu=-f,\qquad\int_Lu\,\operatorname{vol}_L=0
$$

> として、次の1形式が $D\alpha=(\eta,\xi)$ を満たす。

$$
\alpha=-\delta G_2\eta+du.
$$

> $n=1$ では2形式成分と $G_2$ の項を省き、$\alpha=du$ とする。
<!-- formal-statement-end -->

### 証明の見取り図

完全な2形式 $\eta$ に対しては $-\delta G_2\eta$ を選び、$-d$ を作用させる。最高次形式 $\xi=f\operatorname{vol}_L$ には $du$ を選ぶ。$u$ のPoisson方程式が解ける条件は $\int_Lf=0$ であり、**最高次形式の完全性がちょうどその条件を保証する**。二つの解は $d^2=\delta^2=0$ により互いの方程式を乱さない。

<!-- proof-start -->
### 証明

**核。** $D\alpha=0$ は $d\alpha=0$ と $d*\alpha=0$ に等しい。前講の[余微分の符号](../SYZ1-05/index.md#def-syz1-05-hodge-star-codifferential)により $d*\alpha=0$ は $\delta\alpha=0$ と同値で、[調和性の判定](../../GA/GA6/index.md#thm-ga6-energy)から $\ker D=\mathcal H^1(L)$ である。

**2形式側。** $\eta$ は完全なので $d\eta=0$ である。調和2形式 $h$ と任意の $\zeta$ に対し、[余微分との随伴関係](../../GA/GA6/index.md#prop-ga6-adjoint)から

$$
(\eta,h)_{L^2}=(d\zeta,h)_{L^2}
=(\zeta,\delta h)_{L^2}=0
$$

となる。従って $P_2\eta=0$。さらに $dG_2\eta$ は調和な完全3形式である。実際、$d$ と $\Delta_H$ の可換性から

$$
\Delta_H(dG_2\eta)
=d\Delta_HG_2\eta=d\eta=0
$$

であり、[調和な完全形式は零](../../GA/GA6/index.md#thm-ga6-hodge-de-rham)だから $dG_2\eta=0$。ここで $d\Delta_H=\Delta_Hd$ は $\Delta_H=d\delta+\delta d$ と $d^2=0$ を展開すれば

$$
d\Delta_H=d\delta d,\qquad
\Delta_Hd=d\delta d
$$

から確かめられる。そこで

$$
d\delta G_2\eta
=(d\delta+\delta d)G_2\eta-\delta dG_2\eta
=\eta-0=\eta.
$$

従って $\alpha_2=-\delta G_2\eta$ は $-d\alpha_2=\eta$、また $\delta\alpha_2=-\delta^2G_2\eta=0$ を満たす。

**最高次形式側。** $\xi=d\gamma$ なので[一般Stokesの定理](../../GEO/GEO8/index.md#thm-geo8-general-stokes)から $\int_L\xi=0$、すなわち $\int_Lf\,\operatorname{vol}_L=0$。逆に向き付きの連結閉多様体では積分0の最高次形式は完全である。これは[Hodge–de Rham同型](../../GA/GA6/index.md#thm-ga6-hodge-de-rham)と最高次の調和形式が定数倍の体積形式であることから従う。連結性を使うため、積分0は各連結成分で必要とする。

平均値0の $f$ は定数調和関数に直交するので、[Hodge Green作用素](../../GA/GA6/index.md#def-ga6-green-operator)で $u=-G_0f$ と置くと

$$
\Delta_Hu=-f,\qquad\int_Lu\,\operatorname{vol}_L=0
$$

となる。$\alpha_n=du$ は $d\alpha_n=d^2u=0$ を満たし、$\delta du=\Delta_Hu=-f$、$d*du=-(\delta du)\operatorname{vol}_L=f\operatorname{vol}_L=\xi$ である。

**合わせる。** $\alpha=\alpha_2+\alpha_n$ とすると

$$
-d\alpha=\eta+0=\eta,\qquad
d*\alpha=0+\xi=\xi.
$$

$\alpha_2$ は余完全、$\alpha_n$ は完全なので $\alpha\in\mathcal K$ である。$D|_{\mathcal K}$ の核に属する1形式は調和であると同時に $\mathcal K\perp\mathcal H^1(L)$ なので0。よって全射かつ単射、従って線形同型となる。$n=1$ の場合は2形式成分が消え、最高次形式側の証明だけで足りる。
<!-- proof-end -->

ここで**全射性は「完全形式値域への全射性」**である。値域を $\Omega^2(L)\oplus\Omega^n(L)$ に広げると、たとえば積分が正の体積形式は $d*\alpha$ では作れず、陰関数定理の仮定は失敗する。

## 5. Banach空間の陰関数定理を使う

上では滑らかな形式で議論した。しかし、微分を含む写像へ[有限次元陰関数定理](../../../基礎科目/RA/RA6A/index.md#thm-ra6a-implicit-function)のBanach空間版を適用するには、完備なノルム空間が必要である。そこで $k\ge2$ と $0<\gamma<1$ を固定する。

局所座標で $k$ 階まで導関数が連続であり、任意の最高階導関数 $D^k a$ が、座標近傍の点 $x,y$ について次の有界な差分比を持つ形式の空間を $C^{k,\gamma}$ と書く。

$$
[D^k a]_{\gamma}
=\sup_{x\ne y}
\frac{|D^k a(x)-D^k a(y)|}{|x-y|^\gamma}
<\infty.
$$

$\sup$ は異なる2点についての上限である。この条件は、近い2点の最高階導関数の差が距離の $\gamma$ 乗で抑えられることを表す。通常の導関数の上限ノルムとこの差分比を足したノルムを用いると、$C^{k,\gamma}$ はBanach空間になる。有限個の座標で作るノルムはコンパクトな $L$ 上で同値である。

未知数には $C^{k+1,\gamma}\Omega^1(L)$ を使い、値には $C^{k,\gamma}$ の完全な2形式と最高次形式の対からなる空間 $\mathcal E^{k,\gamma}$ を使う。調和成分を除いた1形式の閉補空間を $\mathcal K^{k+1,\gamma}$ と書く。

前節で作った逆公式を連続な逆として使うため、以下の**楕円型作用素の $C^{k,\gamma}$ ノルム評価**を解析的入力とする。$j$ 次の形式 $\rho$ が調和成分に直交すれば、滑らかな係数を持つ閉多様体のHodge Laplacianに対するGreen作用素は

$$
P_j\rho=0
\quad\Longrightarrow\quad
\|G_j\rho\|_{C^{k+2,\gamma}}
\le C\|\rho\|_{C^{k,\gamma}}
$$

を満たす。$C$ は計量、次数、$k,\gamma$ に依存する。この評価は一般に**Schauder評価**と呼ばれる解析的結果の適用例である。$\delta G_2\eta$ と $du$ はそれぞれ1階微分なので、右逆の出力を $C^{k+1,\gamma}$ で評価できる。

次に、Banach空間版の陰関数定理を次の形で入力する。有限次元空間 $H$ とBanach空間 $K,Y$、原点付近の滑らかな写像 $F:H\times K\to Y$ を考える。

$$
F(0,0)=0,\qquad D_KF(0,0):K\to Y
$$

が有界逆を持つとする。このとき原点の近くの方程式 $F(h,x)=0$ は、唯一の滑らかな関数 $x=\varphi(h)$ として解ける。これは[既習の有限次元陰関数定理](../../../基礎科目/RA/RA6A/index.md#thm-ra6a-implicit-function)のBanach空間版という追加の解析的入力であり、有限次元の定理だけで自動的に証明できるという意味ではない。

<a id="thm-syz1-06-mclean-unobstructed"></a>

<!-- formal-statement-start -->
> **定理（McLeanの局所無障害性）**  
> $n\ge1$ とし、$(X,J,g,\omega,\Omega)$ は第2節の滑らかな規格化されたKähler・正則体積構造を持つとする。$L\subset X$ を非空、連結、コンパクト、境界なし、向き付き、埋め込まれた位相 $\theta$ の特殊Lagrange $n$ 次元部分多様体とする。$L$ に十分 $C^{k+1,\gamma}$-近い特殊Lagrange埋め込み像を再パラメータ化の同一視で考えると、その局所変形空間は滑らかな有限次元多様体であり、$L$ における接空間は

$$
T_L\mathcal M_{\mathrm{SLag}}\cong\mathcal H^1(L)
\cong H_{\mathrm{dR}}^1(L;\mathbb R)
$$

> と自然に同型である。従ってその局所次元は第1Betti数

$$
\dim\mathcal M_{\mathrm{SLag}}=b_1(L)
$$

> に等しい。特に任意の調和1形式は、$L$ を初期値とする実際の滑らかなSLag変形族の初速度として実現できる。
<!-- formal-statement-end -->

### 証明の見取り図

非線形写像 $\mathcal F$ は[完全形式値域の補題](#lem-syz1-06-exact-image)によって $\mathcal E^{k,\gamma}$ に値を持つ。入力を調和方向 $h$ と補方向 $x$ に分解すると、$x$ 方向の微分は[線形同型の補題](#lem-syz1-06-right-inverse)によって可逆である。陰関数定理は $x=\varphi(h)$ を与える。従って調和方向には制約が残らない。

<!-- proof-start -->
### 証明

**(1) 写像と値域。** 管状近傍の法線グラフによって $\alpha\in C^{k+1,\gamma}\Omega^1(L)$ を埋め込み $F_\alpha$ に対応させる。$\mathcal F(\alpha)$ は $\alpha$ とその1階導関数の滑らかな局所式で与えられ、$C^{k+1,\gamma}\to C^{k,\gamma}$ の滑らかな写像となる。[非線形完全性](#lem-syz1-06-exact-image)より、各 $\mathcal F(\alpha)$ は完全形式対に属する。

**(2) 入力の分解。** [Hodge分解](../../GA/GA6/index.md#thm-ga6-hodge-decomposition)と楕円型の連続射影により

$$
C^{k+1,\gamma}\Omega^1(L)
=\mathcal H^1(L)\oplus\mathcal K^{k+1,\gamma}.
$$

$h\in\mathcal H^1(L)$、$x\in\mathcal K^{k+1,\gamma}$ と書く。$\mathcal F(h+x)$ の $x$ 方向の微分は、[前講の一次化](../SYZ1-05/index.md#thm-syz1-05-linearization)から $D|_{\mathcal K}$ である。

**(3) 可逆性。** [右逆の公式](#lem-syz1-06-right-inverse)で $D|_{\mathcal K}$ の全単射を得ている。Hodge Green作用素のSchauder評価により逆は $\mathcal E^{k,\gamma}\to\mathcal K^{k+1,\gamma}$ として有界である。従ってBanach空間版陰関数定理の「補方向の線形化が有界可逆」という仮定を満たす。

**(4) 真の変形を構成する。** [陰関数定理](../../../基礎科目/RA/RA6A/index.md#thm-ra6a-implicit-function)のBanach空間版（第5節の解析的入力）から、原点付近の $h$ ごとに唯一の小さな $x=\varphi(h)$ が存在し、

$$
\mathcal F(h+\varphi(h))=0,\qquad \varphi(0)=0
$$

となる。実部の正値性も近傍を縮小して保つので、第2節の同値から各 $F_{h+\varphi(h)}(L)$ は真のSLagである。局所のすべての零点はこの形に限る。

**(5) 接空間。** 任意の $v\in\mathcal H^1(L)$ を取り、$h=tv$ に沿って方程式を $t=0$ で微分する。連鎖律により

$$
0=\left.\frac d{dt}\right|_{t=0}\mathcal F(tv+\varphi(tv))
=D\bigl(v+\mathrm d\varphi_0(v)\bigr)
$$

である。$Dv=0$、$\mathrm d\varphi_0(v)\in\mathcal K$ なので

$$
D|_{\mathcal K}\bigl(\mathrm d\varphi_0(v)\bigr)=0.
$$

$D|_{\mathcal K}$ は単射だから $\mathrm d\varphi_0(v)=0$。$v$ は任意であり、$\mathrm d\varphi_0=0$ を得る。よって $h\mapsto h+\varphi(h)$ の原点での微分は $v\mapsto v$ で、接空間が $\mathcal H^1(L)$ になる。

**(6) 次元と滑らかさ。** [Hodge–de Rham同型](../../GA/GA6/index.md#thm-ga6-hodge-de-rham)で $\dim\mathcal H^1(L)=b_1(L)$。$h$ は滑らかな調和形式であり、$\mathcal F=0$ は補方向で楕円型の方程式になる。上述のSchauder型楕円型正則性を繰り返すことで得た解の正則性を任意次数まで上げ、滑らかな埋め込みを得る。法線グラフは近傍の埋め込み像の局所座標なので、この $b_1(L)$ 次元の零点集合が再パラメータ化で割った局所moduliそのものである。
<!-- proof-end -->

ここでの「無障害」とは、*一次の調和方向に対応する小さな非線形解が局所的にすべて存在する*ことをいう。$\varphi(h)$ は一般には0でなく、**直線グラフ $t h$ がそのまま解であるとは主張しない**。また、ここから大域的なSLagトーラス束の存在は導けない。

## 6. 位相、具体例、失敗する仮定

### 平坦複素トーラスで全条件を検算する

$$
X=\mathbb C^n/(\mathbb Z^n+i\mathbb Z^n),\qquad
L=\mathbb R^n/\mathbb Z^n\subset X
$$

を標準Kähler構造、$\Omega=dz^1\wedge\cdots\wedge dz^n$、向き $dx^1\wedge\cdots\wedge dx^n$、位相0で考える。$L$ は連結・コンパクト・境界なしで、前講の[水平トーラスのSLag条件](../SYZ1-05/index.md#thm-syz1-05-linearization)を満たす。$h=\sum c_jdx^j$ は閉・余閉であり、平坦トーラスの調和1形式は全てこの形である。実際、$\alpha=\sum_j a_j(x)dx^j$ が調和なら平坦座標で各係数は $\sum_k\partial_k^2a_j=0$ となる。周期境界で部分積分すれば

$$
0=\int_{T^n}a_j\sum_k\partial_k^2a_j\,dx
=-\sum_k\int_{T^n}|\partial_ka_j|^2\,dx
$$

なので全ての $\partial_ka_j$ が0、従って $a_j$ は定数である。従って $b_1(L)=n$。

$$
F_c(x)=x+i c\quad(\bmod\ \mathbb Z^n+i\mathbb Z^n)
$$

は十分小さい $c\in\mathbb R^n$ に対し埋め込みで、

$$
F_c^*\omega=0,\quad F_c^*\Omega=dx^1\wedge\cdots\wedge dx^n
$$

だから真の位相0のSLagである。法線速度 $V=\sum c_j\partial_{y^j}$ は $h=\sum c_jdx^j$ に対応する。つまりこのモデルでは補正 $\varphi(h)=0$ のまま全 $n$ 方向が積分できる。

### 位相を自由にしても、近傍では増えない

コンパクトな $L$ の変形 $F_t$ は包含写像とホモトピックであり、$d\Omega=0$ なので

$$
Z=\int_LF_t^*\Omega
$$

は $t$ に依存しない。位相 $\theta(t)$ のSLagなら規格化と正の向きにより

$$
Z=e^{i\theta(t)}\operatorname{Vol}(F_t(L)).
$$

$Z$ は初期時刻で $e^{i\theta}\operatorname{Vol}(L)\ne0$。従って $e^{i\theta(t)}=Z/|Z|$ は一定で、連続な位相の分枝も局所的に一定となる。これは[前講の一次位相固定](../SYZ1-05/index.md#prop-syz1-05-phase-rigidity)を有限変形に強めた議論である。コンパクト性がなければ周期積分をこのまま使えない。

### 接空間が0なら何が言えるか

仮にこの定理の仮定を満たす $L$ で $b_1(L)=0$ なら、局所moduliは0次元、すなわちその点の近くでは孤立する。ただし「すべてのCalabi–Yauにそのような埋め込みがある」という存在主張ではない。境界あり・非コンパクトならStokesの境界項、Hodge理論の関数空間、重み付き評価、位相の扱いが変わるため、この定理を無修正では使えない。

## 7. 演習――値域、右逆、無障害性を手で再現する

### Level A：定義・符号・コンパクト性

<a id="ex-syz1-06-a01"></a>

#### SYZ1-06-A01 最高次形式の積分条件

- Level: A

標準 $T^2=\mathbb R^2/\mathbb Z^2$ 上の $\xi=\cos(2\pi x)\,dx\wedge dy$ が完全な2形式であることを、周期的な原始1形式を一つ示して確認せよ。また $dx\wedge dy$ が完全でない理由を述べよ。

<!-- solution-start -->
### 詳細解答

$u(x)=\sin(2\pi x)/(2\pi)$ は1周期なので $u(x)dy$ は大域的な1形式である。外微分を取ると

$$
d(u\,dy)=u'(x)\,dx\wedge dy
=\cos(2\pi x)\,dx\wedge dy=\xi.
$$

よって $\xi$ は完全である。$dx\wedge dy=d\beta$ と仮定すると、閉多様体の[一般Stokesの定理](../../GEO/GEO8/index.md#thm-geo8-general-stokes)により $\int_{T^2}dx\wedge dy=\int_{T^2}d\beta=0$ となるはずだが、左辺は1。矛盾する。
<!-- solution-end -->

<a id="ex-syz1-06-a02"></a>

#### SYZ1-06-A02 一次元の線形化

- Level: A

平坦な複素楕円曲線 $\mathbb C/(\mathbb Z+i\mathbb Z)$ の水平円 $L=\mathbb R/\mathbb Z$ を法線グラフ $F_a(x)=x+i a(x)$（$a$ は周期的で十分小さい）で動かす。$\mathcal F(a\,dx)$ の2成分と、SLagとなる条件を求めよ。

<!-- solution-start -->
### 詳細解答

$dz=d(x+ia(x))=(1+ia'(x))dx$ であり、$\omega=dx\wedge dy$ の円への引き戻しは次数により0である。位相0として

$$
\mathcal F(a\,dx)=(0,a'(x)dx).
$$

従ってSLagなら $a'=0$。逆に $a$ が定数なら虚部0で、実部は $dx>0$ だから確かにSLagである。この例ではHodge調和1形式 $c\,dx$ のみが真の変形を与え、局所次元は $b_1(S^1)=1$ である。
<!-- solution-end -->

<a id="ex-syz1-06-a03"></a>

#### SYZ1-06-A03 Poisson方程式の符号

- Level: A

平坦な $T^2$ で $u(x,y)=\sin(2\pi x)/(4\pi^2)$ とする。$\Delta_Hu=\delta du$ と $d*du$ をそれぞれ求め、二つが同じ符号でない理由を説明せよ。

<!-- solution-start -->
### 詳細解答

関数のHodge Laplacianは非負の符号規約で $\Delta_Hu=-(u_{xx}+u_{yy})$。$u_{xx}=-\sin(2\pi x)$、$u_{yy}=0$ より

$$
\Delta_Hu=\sin(2\pi x).
$$

一方 $\delta du=-*d*du$ だから、$\operatorname{vol}=dx\wedge dy$ を使うと

$$
d*du=-(\delta du)\operatorname{vol}
=-\sin(2\pi x)\,dx\wedge dy.
$$

最高次形式へ変換するときにマイナスが入る。補題の $\Delta_Hu=-f$ は、この符号を吸収するための選び方である。
<!-- solution-end -->

<a id="ex-syz1-06-a04"></a>

#### SYZ1-06-A04 調和方向と完全方向

- Level: A

連結コンパクト境界なし $L$ 上で $\alpha=df$ が $d\alpha=\delta\alpha=0$ を満たすなら、$\alpha=0$ を証明せよ。なぜ $df$ の方向をmoduliの独立パラメータとして数えないのか述べよ。

<!-- solution-start -->
### 詳細解答

$d\alpha=d^2f=0$ は自動的に成り立つ。$\delta\alpha=\delta df=0$ の両辺に $f$ を掛けて積分し、[随伴性](../../GA/GA6/index.md#prop-ga6-adjoint)から

$$
0=(f,\delta df)_{L^2}=(df,df)_{L^2}
=\int_L|df|^2\operatorname{vol}_L.
$$

被積分関数は非負かつ連続なので $df=0$。連結性から $f$ は定数である。従って調和1形式と完全1形式の共通部分は0であり、$df$ は $\mathcal K$ の補正方向であって接空間の新たな自由度ではない。
<!-- solution-end -->

<a id="ex-syz1-06-a05"></a>

#### SYZ1-06-A05 定数位相の周期

- Level: A

コンパクトな位相 $\theta(t)$ のSLag埋め込み $F_t:L\to X$ が滑らかに変化し、$d\Omega=0$、$\operatorname{Re}(e^{-i\theta(t)}\Omega)|_{F_t(L)}=\operatorname{vol}_{F_t(L)}$ を満たす。$\theta(t)$ が局所的に定数であることを、積分から示せ。

<!-- solution-start -->
### 詳細解答

閉じた $\Omega$ と $F_t$ のホモトピーに[Cartanの公式](../../GEO/GEO7/index.md#thm-geo7-cartan-formula)を使えば $\frac d{dt}\int_LF_t^*\Omega=\int_Ld(\cdots)=0$。従って $Z=\int_LF_t^*\Omega$ は一定。SLagの虚部零・実部正から $Z=e^{i\theta(t)}\operatorname{Vol}(F_t(L))$ である。正の体積により $Z\ne0$、絶対値を取ると $\operatorname{Vol}(F_t(L))=|Z|$。ゆえに $e^{i\theta(t)}=Z/|Z|$ は一定で、連続な $\theta(t)$ の分枝は局所的に一定となる。
<!-- solution-end -->

### Level B：右逆の計算と局所パラメータ

<a id="ex-syz1-06-b01"></a>

#### SYZ1-06-B01 右逆をトーラスで直接構成

- Level: B

平坦な $T^2$ 上で $D\alpha=(-d\alpha,d*\alpha)$ とする。

$$
\eta=\sin(2\pi x)\,dx\wedge dy,\qquad
\xi=\cos(2\pi x)\,dx\wedge dy.
$$

$D\alpha=(\eta,\xi)$ を満たす周期1形式 $\alpha$ を一つ構成し、両成分を別々に検算せよ。

<!-- solution-start -->
### 詳細解答

$\alpha=b(x)dx+a(x)dy$ とおけば

$$
-d\alpha=-a'(x)\,dx\wedge dy,\qquad
*\alpha=b(x)dy-a(x)dx,\quad
d*\alpha=b'(x)\,dx\wedge dy.
$$

従って $-a'=\sin(2\pi x)$、$b'=\cos(2\pi x)$ とすればよい。周期関数として

$$
a(x)=\frac{\cos(2\pi x)}{2\pi},\qquad
b(x)=\frac{\sin(2\pi x)}{2\pi}
$$

を選ぶ。これを代入すると $a'=-\sin(2\pi x)$、$b'=\cos(2\pi x)$ なので、確かに $D\alpha=(\eta,\xi)$ である。定数倍 $dx,dy$ を加えても出力は変わらないが、それらは $\ker D=\mathcal H^1(T^2)$ に属する。$\alpha$ 自身の調和部分を0とすれば一意性が回復する。
<!-- solution-end -->

<a id="ex-syz1-06-b02"></a>

#### SYZ1-06-B02 値域を広げた場合の失敗

- Level: B

$L=T^2$ として $\xi=dx\wedge dy$ を指定する。周期1形式 $\alpha$ に $d*\alpha=\xi$ を満たすものがないことを示し、なぜ非線形写像 $\mathcal F$ の局所可解性にはこの不可能性が障害にならないか説明せよ。

<!-- solution-start -->
### 詳細解答

もし $d*\alpha=dx\wedge dy$ なら、[一般Stokesの定理](../../GEO/GEO8/index.md#thm-geo8-general-stokes)から

$$
0=\int_{T^2}d*\alpha=\int_{T^2}dx\wedge dy=1,
$$

となり矛盾する。従って $D$ は全ての2形式を値域にした場合には全射でない。しかし[非線形完全性の補題](#lem-syz1-06-exact-image)で $\mathcal F(\alpha)$ の最高次成分は最初から完全形式に制限される。$\xi$ は完全でないため本来の値域に入らず、必要な全射性を妨げない。
<!-- solution-end -->

<a id="ex-syz1-06-b03"></a>

#### SYZ1-06-B03 陰関数定理の補正の一次項

- Level: B

$\mathcal F(h+\varphi(h))=0$、$\varphi(0)=0$、$\varphi(h)\in\mathcal K$、$D\mathcal F|_0=D$、$\ker D=\mathcal H^1$、$D|_{\mathcal K}$ が単射とする。$\mathrm d\varphi_0=0$ を導き、$h$ がmoduliの接座標になる理由を述べよ。

<!-- solution-start -->
### 詳細解答

任意の $v\in\mathcal H^1$ を取り、$h=tv$ として $t=0$ で微分する。連鎖律から

$$
0=\left.\frac d{dt}\right|_0\mathcal F(tv+\varphi(tv))
=D\bigl(v+\mathrm d\varphi_0(v)\bigr).
$$

$Dv=0$ なので $D(\mathrm d\varphi_0(v))=0$。$\mathrm d\varphi_0(v)\in\mathcal K$ で $D|_{\mathcal K}$ は単射だから $\mathrm d\varphi_0(v)=0$。$v$ は任意なので $\mathrm d\varphi_0=0$。従って $h+\varphi(h)$ の原点での微分は恒等であり、調和方向がちょうど真の変形族の初速度になる。
<!-- solution-end -->

<a id="ex-syz1-06-b04"></a>

#### SYZ1-06-B04 次元が0の意味と仮定

- Level: B

定理の全仮定を満たす $L$ で $H_{\mathrm{dR}}^1(L;\mathbb R)=0$ とする。局所変形空間について何が言えるか。また $L$ を非コンパクトに替えた場合、今回の証明のどの二箇所が無条件で使えなくなるか説明せよ。

<!-- solution-start -->
### 詳細解答

[Hodge–de Rham同型](../../GA/GA6/index.md#thm-ga6-hodge-de-rham)により $\mathcal H^1(L)=0$。従って[McLeanの局所無障害性定理](#thm-syz1-06-mclean-unobstructed)の座標 $h$ は0だけで、局所moduliは1点、すなわち $L$ は局所的に孤立する。非コンパクトな場合は、第一に完全な最高次形式の積分0をStokesで保証するための収束・無限遠境界条件がない。第二にコンパクト閉多様体用のHodge分解・Green作用素の有界逆と有限次元調和空間が、そのままでは保証されない。従って値域と関数空間の解析を作り直さずに同じ陰関数定理を使えない。
<!-- solution-end -->

### Level C：全手順の再構成

<a id="ex-syz1-06-c01"></a>

#### SYZ1-06-C01 McLeanの無障害性の核心を復元する

- Level: C

第2節のコンパクト境界なしSLag $L$ と $\mathcal F$ について以下を証明せよ。

1. $F_t$ の[ホモトピー公式](../../GEO/GEO9/index.md#thm-geo9-homotopy-formula)から $\mathcal F(\alpha)$ の二つの成分が完全であることを示せ。
2. 線形化を計算し、核が調和1形式であることを示せ。
3. $D$ が完全形式値域へ全射であることを、$G_2$ とPoisson方程式を用いて構成的に示せ（$n=1$ では2形式を省く）。
4. 楕円型Schauder評価とBanach空間陰関数定理を解析的入力として、局所moduliの接空間と次元を結論せよ。
5. この結論が大域SLagトーラス束の存在を示さない理由を述べよ。

<!-- solution-start -->
### 詳細解答

**1.** $\eta$ を $\omega$ または $\Psi$ とし、$F_t=F_{t\alpha}$ と置くと $d\eta=0$。Cartan公式によって

$$
F_\alpha^*\eta-F_0^*\eta
=d\int_0^1F_t^*(\iota_{\widetilde W_t}\eta)\,dt.
$$

初期引き戻しは0なので、終端の両形式は完全である。

**2.** [線形化定理](../SYZ1-05/index.md#thm-syz1-05-linearization)で $D\alpha=(-d\alpha,d*\alpha)$。従って $D\alpha=0$ は $d\alpha=\delta\alpha=0$、すなわち $\alpha\in\mathcal H^1(L)$ と同値である。

**3.** 完全2形式 $\eta$ は調和2形式に直交し、$P_2\eta=0$。さらに $\Delta_HdG_2\eta=d\eta=0$ かつ $dG_2\eta$ は完全なので0。従って $d\delta G_2\eta=\eta$。完全最高次形式 $\xi=f\operatorname{vol}_L$ は閉多様体上で $\int_L f\operatorname{vol}_L=0$ を満たす。平均値0の解 $u=-G_0f$ に対し $\Delta_Hu=-f$、従って

$$
\alpha=-\delta G_2\eta+du,\quad
-d\alpha=\eta,\quad
d*\alpha=f\operatorname{vol}_L=\xi.
$$

$\delta^2=0$、$d^2=0$ により二つの項は相手の方程式を乱さない。$n=1$ なら $\alpha=du$ のみでよい。

**4.** 1形式の空間を調和部分とその直交補に分解する。

$$
C^{k+1,\gamma}\Omega^1(L)
=\mathcal H^1(L)\oplus\mathcal K^{k+1,\gamma}.
$$

値域は完全形式の $C^{k,\gamma}$ 空間に限定する。Schauder評価から、線形化 $D|_{\mathcal K}$ は有界逆を持つ。

[陰関数定理](../../../基礎科目/RA/RA6A/index.md#thm-ra6a-implicit-function)のBanach空間版によって、小さい調和1形式 $h$ の各々に、補正 $x=\varphi(h)$ が一意に対応し、

$$
\mathcal F(h+\varphi(h))=0
$$

が成立する。連鎖律で $h=tv$ に沿って微分すると、$Dv=0$ から

$$
D|_{\mathcal K}\bigl(\mathrm d\varphi_0(v)\bigr)=0.
$$

補方向の単射性により $\mathrm d\varphi_0(v)=0$。従って接空間は $\mathcal H^1(L)$ であり、[Hodge–de Rham同型](../../GA/GA6/index.md#thm-ga6-hodge-de-rham)により次元は $b_1(L)$ である。

**5.** ここで作ったのは**固定した一つのコンパクトSLagの近傍**での変形空間である。$X$ 全体がこのSLagたちで互いに交わらず覆われること、変形族が大域的に貼り合わさって滑らかな射影 $\pi:X\to B$ を作ること、すべてのファイバーがトーラスになることは、いずれも陰関数定理の結論に含まれない。次講ではそれを別途仮定する。
<!-- solution-end -->

## 8. 次の問い――局所moduliからトーラス束は出るか

今回の結論は、$L$ の近くに $b_1(L)$ 次元の滑らかな変形空間がある、という**局所**定理である。特にSLagトーラスなら $b_1(T^n)=n$ なので、局所的な変形パラメータの数は $n$ 個になる。しかし、変形したトーラスが互いに交わらないか、全体を覆うか、特異ファイバーがないかは別問題である。

次の **SYZ1-07「局所トーラス・ファイブレーションと作用・角変数」** では、滑らかなSLagトーラス束 $\pi:X\to B$ を**追加仮定**として宣言し、その下で周期格子と作用・角変数を構成する。
