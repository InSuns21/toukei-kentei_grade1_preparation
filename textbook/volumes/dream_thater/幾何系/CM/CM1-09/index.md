# CM1-09 高次元複素トーラス

<!-- definition-example-audit: strict -->

## 1. 局所座標があっても、空間全体は一枚の座標にならない

[複素多様体の定義](../CM1-01/index.md#def-cm1-01-manifold)では、局所的な複素座標と正則な遷移写像を貼り合わせた。しかし、局所的に $\mathbb C^n$ と同じに見えることは、空間全体が $\mathbb C^n$ であることを意味しない。前章では局所的な構造に適合する座標を探したが、今度は反対に、**分かっている座標空間を同一視して新しい複素多様体を作る**。

[CA8で構成した一次元の複素トーラス](../../../解析系/CA/CA8/index.md#thm-ca8-complex-torus)は、平面上で二方向の周期を同一視した商だった。本章では $\mathbb C^n$ 上の実 $2n$ 方向の周期を扱う。重要なのは、周期の集合を選ぶだけで終わらず、商位相が Hausdorff・第二可算であり、正則座標が具体的に作れることを確かめる点にある。

これにより、コンパクトな複素多様体を構成できる。さらに、$\mathbb C^n$ 上の線形写像がいつ商へ降りるかを判定し、局所的に逆がある写像と大域的に一対一の写像の違いも調べる。

## 2. 全格子は、なぜ商を作るのに適しているか

$\mathbb C^n$ は実次元 $2n$ のベクトル空間である。周期を実方向に一つだけ入れても、残る方向は無限に伸び、コンパクトな商は得られない。全方向に周期を与えるため、実基底を整数係数で張った集合を選ぶ。

<a id="def-cm1-09-full-lattice"></a>
<!-- formal-statement-start -->
> **定義（高次元複素空間の全格子）**  
> $n\ge1$ とし、$\omega_1,\ldots,\omega_{2n}\in\mathbb C^n$ が **実線形独立**であるとする。これらの整数結合全体

$$
\Lambda=\left\{\sum_{j=1}^{2n}k_j\omega_j:
(k_1,\ldots,k_{2n})\in\mathbb Z^{2n}\right\}
$$

> を $\mathbb C^n$ の **全格子**という。生成元は複素線形独立である必要はなく（$2n>n$）、独立性は実数体上で要求する。
<!-- formal-statement-end -->

<!-- definition-example-start: def-cm1-09-full-lattice -->
**定義の確認**。$\mathbb C^2$ では次の四本を選べる。

$$
\omega_1=(1,0),\quad \omega_2=(i,0),
\quad\omega_3=(1/2,1),\quad\omega_4=(i/3,i).
$$

実係数 $a,b,c,d$ について $a\omega_1+b\omega_2+c\omega_3+d\omega_4=0$ とする。第二成分は $c+di=0$ だから $c=d=0$。第一成分は $a+bi=0$ となり $a=b=0$。従って実線形独立であり、これは全格子を定める。第三・第四の周期は両成分を同時に動かすので、与えられた座標に関しては単純な長方形周期だけではない。
<!-- definition-example-end -->

比較用の基本例は

$$
\Lambda_0=\mathbb Z^n+i\mathbb Z^n
=\{(a_1+ib_1,\ldots,a_n+ib_n):a_j,b_j\in\mathbb Z\}
$$

である。ここでの $i$ は各座標への複素数の掛け算であり、任意の全格子がこの形に複素線形変換で移せるとはまだ主張しない。

全格子の決定的な性質は、異なる格子点が任意に接近しないことである。生成元を並べた実線形写像

$$
A:\mathbb R^{2n}\longrightarrow\mathbb C^n,\qquad
A(t_1,\ldots,t_{2n})=\sum_{j=1}^{2n}t_j\omega_j
$$

は実線形同型である。ここから数値的な下界が出る。

<a id="lem-cm1-09-lattice-separation"></a>
<!-- formal-statement-start -->
> **補題（全格子の一様離散性と閉性）**  
> $\Lambda=A(\mathbb Z^{2n})$ を上の全格子とする。ある $\delta>0$ が存在し、相異なる任意の $\lambda,\mu\in\Lambda$ について

$$
\|\lambda-\mu\|\ge\delta
$$

> が成り立つ。さらに $\Lambda$ は $\mathbb C^n$ の閉集合であり、任意の有界集合と $\Lambda$ との共通部分は有限集合である。
<!-- formal-statement-end -->

### 証明の見取り図

実線形写像 $A$ の逆写像は連続であり、単位球面上で $\|At\|$ の正の最小値を取れる。整数ベクトルの非零の長さが $1$ 以上という事実と組み合わせる。

<!-- proof-start -->
### 証明

$\mathbb R^{2n}$ の単位球面 $S=\{t:\|t\|=1\}$ はコンパクトである。$A$ は単射だから $t\in S$ について $\|At\|>0$。連続関数 $t\mapsto\|At\|$ は $S$ 上で正の最小値 $c>0$ を取る。任意の $t\ne0$ について $t/\|t\|\in S$ なので、

$$
\|At\|=\|t\|\left\|A\left(\frac{t}{\|t\|}\right)\right\|
\ge c\|t\|
$$

であり、$t=0$ でも同じ不等式は成立する。

相異なる格子点は $\lambda=Ak,\mu=A\ell$ と書け、$k-\ell\in\mathbb Z^{2n}\setminus\{0\}$ だから $\|k-\ell\|\ge1$。従って

$$
\|\lambda-\mu\|=\|A(k-\ell)\|
\ge c\|k-\ell\|\ge c.
$$

$\delta=c$ と取ればよい。半径 $R$ の有界集合に入る格子点 $Ak$ は $c\|k\|\le\|Ak\|\le R$ を満たす。従って $\|k\|\le R/c$ に属する整数ベクトルだけが候補となり、候補は有限個である。中心が原点以外の場合も、全ての点を含む十分大きな原点中心球へ移せばよい。

最後に $\lambda_m\in\Lambda$ が $z$ に収束したとする。十分大きい $m,\ell$ では $\|\lambda_m-\lambda_\ell\|<\delta$ である。一様離散性により $\lambda_m=\lambda_\ell$ となり、列はやがて一定である。その値が極限 $z$ に等しいので $z\in\Lambda$。従って $\Lambda$ は閉である。$\square$
<!-- proof-end -->

**なぜ実線形独立性が必要か。** 例えば $\mathbb C$ の整数加法部分群 $\mathbb Z+\sqrt2\,\mathbb Z$ を考える。この群には、$0$ に任意に近い非零の元があることを確かめよう。整数 $N\ge1$ に対し、$N+1$ 個の小数部分 $\{k\sqrt2\}$（$k=0,1,\ldots,N$）を $[0,1)$ の長さ $1/N$ の $N$ 個の区間へ分ける。鳩ノ巣原理により二つが同じ区間に入るので、差を取れば整数 $p$ と $1\le q\le N$ が存在し、

$$
0<|q\sqrt2-p|<\frac1N
$$

となる。左辺が $0$ でないのは $\sqrt2$ が無理数だからである。$N$ を大きくすると非零の元 $q\sqrt2-p$ は $0$ に近づき、一様離散性が成り立たない。実一次元に二本の生成元を押し込むと、このように一様離散性を失い得る。上の補題の証明では、$A$ が単射であることが $\|At\|\ge c\|t\|$ を得る鍵だった。

## 3. 商位相から複素アトラスまでを構成する

格子差を同一視する関係を入れる。

$$
z\sim w\quad\Longleftrightarrow\quad z-w\in\Lambda.
$$

$\Lambda$ が加法部分群なので、反射性・対称性・推移性を満たす。剰余類を $[z]$ と記し、商写像を $q(z)=[z]$ とする。

<a id="def-cm1-09-complex-torus"></a>
<!-- formal-statement-start -->
> **定義（高次元複素トーラス）**  
> $n\ge1$、$\Lambda\subset\mathbb C^n$ を全格子とする。同値関係 $z\sim w\iff z-w\in\Lambda$ で定めた商集合に、商写像

$$
q:\mathbb C^n\longrightarrow T_\Lambda=\mathbb C^n/\Lambda
$$

> に関する商位相を入れる。以下の定理で構成する正則アトラスを備えた $T_\Lambda$ を **複素 $n$ 次元トーラス**という。
<!-- formal-statement-end -->

<!-- definition-example-start: def-cm1-09-complex-torus -->
**定義の確認**。$n=1$、$\Lambda=\mathbb Z+i\mathbb Z$ では $z$ と $z+m+in$（$m,n\in\mathbb Z$）が同じ点である。例えば $[1/4+i/3]=[5/4+i/3]$。この商が通常の一次元複素トーラスであることは[CA8の構成](../../../解析系/CA/CA8/index.md#thm-ca8-complex-torus)と一致する。$n=2$、$\Lambda=\Lambda_0$ なら四つの実周期を同一視する。
<!-- definition-example-end -->

任意の開集合 $O\subset\mathbb C^n$ について

$$
q^{-1}(q(O))=\bigcup_{\lambda\in\Lambda}(O+\lambda)
$$

は開集合だから、$q(O)$ は商位相で開である。つまり **$q$ は開集合を開集合へ写す**。この事実により小球の像が座標近傍になる。

<a id="thm-cm1-09-quotient-atlas"></a>
<!-- formal-statement-start -->
> **定理（全格子の商による複素多様体）**  
> $\Lambda\subset\mathbb C^n$ を全格子とし、$T_\Lambda=\mathbb C^n/\Lambda$ に商位相を入れる。すると $T_\Lambda$ は Hausdorff、第二可算、連結、コンパクトである。また、[一様離散性](#lem-cm1-09-lattice-separation)の定数 $\delta>0$ に対して $0<r<\delta/4$ を選ぶと、各 $a\in\mathbb C^n$ について

$$
U_a=q(B_r(a)),\qquad
\varphi_a:U_a\longrightarrow B_r(a),\quad
\varphi_a=(q|_{B_r(a)})^{-1}
$$

> は複素座標近傍を与え、その全体は正則アトラスとなる。したがって $T_\Lambda$ は複素 $n$ 次元多様体であり、$q$ は局所双正則な被覆写像である。
<!-- formal-statement-end -->

### 証明の見取り図

一様離散性から、十分小さな球の中では異なる点が格子差にならない。重なる二枚の座標は格子元による平行移動だけで結ばれる。位相公理は「局所座標があるから」と省略せず、別々に証明する。コンパクト性には閉基本平行多面体を使う。

<!-- proof-start -->
### 証明

**(1) 局所逆写像。** $x,y\in B_r(a)$ かつ $q(x)=q(y)$ なら $x-y\in\Lambda$。一方

$$
\|x-y\|\le\|x-a\|+\|y-a\|<2r<\delta.
$$

一様離散性より $x-y=0$ であり、$q|_{B_r(a)}$ は単射である。$q$ は連続で、開集合の像が開であることも上で確かめたから、この制限は開集合 $B_r(a)$ と $U_a=q(B_r(a))$ の間の同相写像である。

**(2) 遷移は平行移動。** $U_a\cap U_b\ne\varnothing$ とする。交点 $p$ の二つの代表元 $x\in B_r(a)$、$y\in B_r(b)$ は $x-y=\lambda\in\Lambda$ を満たす。ゆえに

$$
\|a-b-\lambda\|
\le\|a-x\|+\|x-y-\lambda\|+\|y-b\|<2r.
$$

同じ重なりの別の点の代表元 $x'\in B_r(a)$、$y'\in B_r(b)$ が $x'-y'=\mu\in\Lambda$ を満たしたとする。上と同じ評価で $\|(a-b)-\mu\|<2r$ を得る。従って

$$
\|\lambda-\mu\|
\le\|\lambda-(a-b)\|+\|(a-b)-\mu\|
<4r<\delta.
$$

一様離散性より $\lambda=\mu$ である。従って重なり全体で

$$
\varphi_b\circ\varphi_a^{-1}(x)=x-\lambda
$$

が成立する。これは逆も $y\mapsto y+\lambda$ の複素アフィン写像であり、複素微分は恒等行列 $I_n$。よって[正則アトラスの定義](../CM1-01/index.md#def-cm1-01-atlas)を満たす。

**(3) Hausdorff 性。** $[z]\ne[w]$ なら $z-w\notin\Lambda$。$\Lambda$ は閉なので

$$
d=\operatorname{dist}(z-w,\Lambda)>0
$$

である。$0<\varepsilon<d/3$ を取る。もし $q(B_\varepsilon(z))$ と $q(B_\varepsilon(w))$ が交われば、ある $x,y$ が $\|x-z\|<\varepsilon$、$\|y-w\|<\varepsilon$、$x-y\in\Lambda$ を満たす。ところが

$$
\operatorname{dist}(z-w,\Lambda)
\le\|(z-w)-(x-y)\|
\le\|z-x\|+\|y-w\|<2\varepsilon<d
$$

となって矛盾する。二つの像は互いに素な開近傍である。

**(4) 第二可算性。** $\mathbb C^n$ には有理数成分の中心と正の有理数半径を持つ球の可算基底 $\mathcal B$ がある。$q$ による開集合の像が開であることから $\{q(B):B\in\mathcal B\}$ は開集合の可算族である。任意の開集合 $V\subset T_\Lambda$ と $[z]\in V$ について、$q^{-1}(V)$ は $z$ を含む開集合なので、ある $B\in\mathcal B$ が $z\in B\subset q^{-1}(V)$ を満たす。従って $[z]\in q(B)\subset V$。ゆえに可算基底である。

**(5) コンパクト性。** 全格子の生成元から、閉基本平行多面体

$$
P=\left\{\sum_{j=1}^{2n}t_j\omega_j:0\le t_j\le1\right\}
$$

を取る。$P$ はコンパクトな立方体 $[0,1]^{2n}$ の連続像なのでコンパクトである。任意の $z=\sum_j s_j\omega_j$（$s_j\in\mathbb R$）に対し、$k_j=\lfloor s_j\rfloor$ とすれば

$$
z-\sum_jk_j\omega_j
=\sum_j(s_j-k_j)\omega_j\in P
$$

だから $q(P)=T_\Lambda$。商写像は連続なので $T_\Lambda$ はコンパクトである。

**(6) 連結性。** $\mathbb C^n$ の任意の二点 $z,w$ は線分 $t\mapsto(1-t)z+tw$ で結べる。この線分の $q$ による像は $[z]$ と $[w]$ を結ぶ連続経路となる。よって $T_\Lambda$ は道連結、従って連結である。

**(7) 被覆性。** 固定した $a$ と $r<\delta/4$ に対し

$$
q^{-1}(U_a)=\bigsqcup_{\lambda\in\Lambda}B_r(a+\lambda).
$$

各球は格子の分離性によって互いに交わらず、$q$ は各球を $U_a$ へ同相に写す。さらに、平行移動で与えられる各制限の局所表示は恒等写像または平行移動だから双正則である。これは[被覆写像の定義](../../../解析系/CA/CA8/index.md#def-ca8-covering-map)に相当する均等被覆近傍を与える。以上より全主張が成立する。$\square$
<!-- proof-end -->

この証明では商位相の危険を一つずつ取り除いた。特に全格子の**閉性を落とすと、異なる剰余類の Hausdorff 分離が保証できなくなる**。また「コンパクト」は局所の座標からではなく、$2n$ 個の実周期をすべて使って初めて得られた。

## 4. 格子の選び方と複素線形な同値

同じ格子を異なる実基底で記述しても、商空間は変わらない。基底変換は整数行列で行われる。実際、$\omega'_j=\sum_k m_{kj}\omega_k$ とし、$\omega'_j$ も同じ格子の整数基底なら、$M=(m_{kj})$ とその逆の係数行列はともに整数である。従って $M\in GL_{2n}(\mathbb Z)$、すなわち $\det M=\pm1$。逆にこの条件なら両方向に整数結合で表せる。

一方、格子そのものを変えても、**複素線形**な座標変換で対応づく場合は複素多様体として同型になる。

<a id="prop-cm1-09-linear-isomorphism"></a>
<!-- formal-statement-start -->
> **命題（複素線形な格子同型）**  
> $\Lambda,\Gamma\subset\mathbb C^n$ を全格子とし、$A\in GL_n(\mathbb C)$ が $A\Lambda=\Gamma$ を満たすとする。このとき

$$
\overline A:T_\Lambda\longrightarrow T_\Gamma,
\qquad [z]_\Lambda\longmapsto[Az]_\Gamma
$$

> は双正則写像である。
<!-- formal-statement-end -->

### 証明の見取り図

剰余類の代表元を替えても値が変わらないことをまず示す。逆写像は $A^{-1}$ から作り、両方向の局所正則性は商の平行移動座標へ戻して確かめる。

<!-- proof-start -->
### 証明

$[z]_\Lambda=[w]_\Lambda$ なら $z-w\in\Lambda$ なので $Az-Aw\in A\Lambda=\Gamma$。従って $\overline A$ は代表元によらない。$A$ は連続なので、商写像の普遍性、または $q_\Gamma\circ A=\overline A\circ q_\Lambda$ と $q_\Lambda$ の商位相から $\overline A$ は連続である。

$A\Lambda=\Gamma$ から $A^{-1}\Gamma=\Lambda$ も成り立つ。同じ議論で $\overline{A^{-1}}$ が定義でき、

$$
\overline{A^{-1}}\circ\overline A([z])=[A^{-1}Az]=[z],
\qquad
\overline A\circ\overline{A^{-1}}([w])=[w]
$$

となるので互いに逆である。点 $[z]$ の近傍で $q_\Lambda$ と $q_\Gamma$ の局所逆を選ぶと、局所座標表示は $x\mapsto Ax$ に格子平行移動を前後で合成した写像である。その複素微分は $A$ で、逆は $A^{-1}$。従って両方向とも正則である。$\square$
<!-- proof-end -->

例えば $A=\operatorname{diag}(2,1)$ に対し、$T_\Lambda$ と $T_{A\Lambda}$ は双正則である。しかし **格子を変えずに** $[z]\mapsto[Az]$ を定められるかは、別途 $A\Lambda\subset\Lambda$ を確かめなければならない。「実線形同型であること」と「複素線形同型であること」も区別する。

## 5. 商へ降りる写像と乗法写像

複素数の線形写像と定数の足し算は、$\mathbb C^n$ 上で正則である。ただし商上で一価の写像を作るには、代表元の変更に対して値の剰余類が変わらない条件が必要だ。

<a id="prop-cm1-09-affine-descent"></a>
<!-- formal-statement-start -->
> **命題（複素アフィン写像の降下条件）**  
> $\Lambda\subset\mathbb C^n$、$\Gamma\subset\mathbb C^m$ を全格子とし、$A:\mathbb C^n\to\mathbb C^m$ を複素線形、$b\in\mathbb C^m$ とする。写像

$$
F(z)=Az+b
$$

> が剰余類の写像

$$
f:T_\Lambda\longrightarrow T_\Gamma,\qquad
f([z]_\Lambda)=[Az+b]_\Gamma
$$

> を定めるための必要十分条件は $A\Lambda\subset\Gamma$ である。成立するとき $f$ は正則である。
<!-- formal-statement-end -->

### 証明の見取り図

代表元 $z$ と $z+\lambda$ を比べると、定数 $b$ は消え、差が $A\lambda$ になる。正則性は局所商座標で $Az+b$ を見るだけでよい。

<!-- proof-start -->
### 証明

まず $f$ が定義できるとする。任意の $\lambda\in\Lambda$ について $[\lambda]_\Lambda=[0]_\Lambda$ なので

$$
[A\lambda+b]_\Gamma=f([\lambda]_\Lambda)
=f([0]_\Lambda)=[b]_\Gamma.
$$

従って $A\lambda\in\Gamma$。$\lambda$ は任意なので $A\Lambda\subset\Gamma$。

逆に $A\Lambda\subset\Gamma$ とする。$z-w=\lambda\in\Lambda$ なら

$$
F(z)-F(w)=A(z-w)=A\lambda\in\Gamma
$$

だから $[F(z)]_\Gamma=[F(w)]_\Gamma$ であり、$f$ は一価である。$q_\Gamma\circ F=f\circ q_\Lambda$ だから $f$ は連続である。点 $[z]$ と $f([z])$ の十分小さい局所商座標を取ると、局所表示は複素アフィン写像 $x\mapsto Ax+b$ に格子平行移動を組み合わせたものとなり、その微分は複素線形 $A$ である。[複素線形微分による多変数正則写像](../CM1-01/index.md#def-cm1-01-holomorphic-map)より $f$ は正則である。$\square$
<!-- proof-end -->

整数 $m\ne0$ の掛け算は $m\Lambda\subset\Lambda$ を満たすので、自分自身への正則写像になる。

<a id="cor-cm1-09-multiplication-kernel"></a>
<!-- formal-statement-start -->
> **系（整数倍写像とその核）**  
> $\Lambda\subset\mathbb C^n$ を全格子、$m\ge2$ を整数とする。このとき

$$
[m]:T_\Lambda\longrightarrow T_\Lambda,\qquad
[z]\longmapsto[mz]
$$

> は全射な正則写像で、各点の逆像は $m^{2n}$ 点からなる。特に $\ker[m]$ は加法群として $(\mathbb Z/m\mathbb Z)^{2n}$ と同型であり、$[m]$ は局所双正則であるが、全体では単射でない。
<!-- formal-statement-end -->

### 証明の見取り図

原点に写る点は $mz\in\Lambda$ を満たすので、$z\in m^{-1}\Lambda$。格子基底で係数を整数の剰余へ還元すれば核の点数が数えられる。微分 $mI_n$ が可逆なのに大域単射でない点を確認する。

<!-- proof-start -->
### 証明

任意の $[w]\in T_\Lambda$ に対し $[w/m]$ は $[m]([w/m])=[w]$ を満たすので全射である。原点の逆像は

$$
\ker[m]
=\{[z]:mz\in\Lambda\}
=(m^{-1}\Lambda)/\Lambda.
$$

$z=\frac1m\sum_j k_j\omega_j$（$k_j\in\mathbb Z$）と書ける。$k_j$ を $k_j+m\ell_j$ に替えると $z$ は格子元 $\sum_j\ell_j\omega_j$ だけ変わり、同じ剰余類になる。逆に二つの表示が同じ剰余類なら、実基底 $\omega_j$ の一意性から各係数差 $k_j-k'_j$ は $m$ の倍数である。従って各 $k_j$ は独立に $0,1,\ldots,m-1$ の $m$ 通りの剰余を持ち、

$$
\ker[m]\cong(\mathbb Z/m\mathbb Z)^{2n},
\qquad|\ker[m]|=m^{2n}.
$$

一般の $[w]$ の逆像も、一つの解 $[w/m]$ に核の各点を足した集合であり、同じ $m^{2n}$ 点を持つ。局所商座標での微分は $mI_n$ で可逆、局所逆写像 $x\mapsto x/m$ があるため局所双正則である。しかし $m\ge2$ のとき核が二点以上あり、単射ではない。$\square$
<!-- proof-end -->

例えば複素次元 $2$ で二倍写像の核は $2^{4}=16$ 点となる。複素次元 $n$ から $2n$ 個の**実周期**が生じるため、$2^n$ ではないことに注意したい。

## 6. コンパクト性が正則関数を制限する

商を作るとコンパクトな空間になるが、局所正則座標は普通に存在する。それなら、座標の一成分をそのまま大域的な正則関数にできるだろうか。

答えは否である。$z\mapsto z_j$ は $z$ を $\lambda$ だけ替えると $\lambda_j$ だけ値が変わり、一般に商へ降りない。それどころか、トーラスから $\mathbb C$ への正則関数はすべて定数となる。

<a id="thm-cm1-09-holomorphic-rigidity"></a>
<!-- formal-statement-start -->
> **定理（複素トーラス上の大域正則関数の剛性）**  
> $\Lambda\subset\mathbb C^n$ を全格子とし、$T_\Lambda$ を上記の複素トーラスとする。正則写像 $f:T_\Lambda\to\mathbb C$ は定数である。
<!-- formal-statement-end -->

### 証明の見取り図

[コンパクト Riemann 面の剛性](../../../解析系/CA/CA8/index.md#thm-ca8-compact-holomorphic-constant)と同じ発想を使うが、複素次元 $n$ にその定理を直接適用してはいけない。最大点の周りで任意の複素直線に制限すると、一変数の[最大値原理](../../../解析系/CA/CA3/index.md#thm-ca3-maximum-modulus)を適用できる。

<!-- proof-start -->
### 証明

$T_\Lambda$ はコンパクトで $f$ は連続なので、$M=\max_{x\in T_\Lambda}|f(x)|$ を取る点が存在する。集合

$$
S=\{x\in T_\Lambda:|f(x)|=M\}
$$

は非空で閉である。$S$ が開でもあることを示す。

任意の $p\in S$ を取り、複素座標 $\varphi:U\to V\subset\mathbb C^n$ を $p$ の周りに選び、$a=\varphi(p)$ とする。$V$ が開だから、ある $\rho>0$ で $B_{2\rho}(a)\subset V$ とできる。$\|h\|<\rho$ の任意の $h\in\mathbb C^n$ に対し

$$
g_h(t)=f\bigl(\varphi^{-1}(a+th)\bigr)
\qquad(|t|<2)
$$

と置く。$g_h$ は一変数正則であり、任意の $|t|<2$ で $|g_h(t)|\le M$。しかも $|g_h(0)|=|f(p)|=M$ だから、一変数の[最大値原理](../../../解析系/CA/CA3/index.md#thm-ca3-maximum-modulus)を円板 $|t|<2$ の内点 $0$ へ適用すると $g_h$ は定数である。$t=1$ を代入して

$$
f(\varphi^{-1}(a+h))=g_h(1)=g_h(0)=f(p)
$$

を得る。従って $f$ は $p$ の近傍 $\varphi^{-1}(B_\rho(a))$ で一定であり、その近傍は $S$ に含まれる。$p$ は任意だから $S$ は開である。

$T_\Lambda$ は連結で、$S$ は空でない開かつ閉集合なので $S=T_\Lambda$。このとき各 $p\in T_\Lambda$ が最大点となるため、直前の議論により $f$ は**各点の近傍で一定**である。局所定数関数は連結空間上で定数なので、結論を得る。$\square$
<!-- proof-end -->

正則写像 $T_\Lambda\to T_\Lambda$ は非定数でもよい。[二倍写像](#cor-cm1-09-multiplication-kernel)がその例である。したがって「コンパクト空間からの正則写像はすべて定数」という主張は誤りであり、結論の行き先を $\mathbb C$ に限定することが重要である。

## 7. 演習

問題では特記なければ格子は全格子であり、$q$ は商写像とする。定義できるか、正則か、局所逆と大域逆のどちらがあるかを区別する。

### Level A

<a id="ex-cm1-09-a01"></a>
#### CM1-09-A01 四つの実周期の独立性
- Level: A

$\mathbb C^2$ の四元 $(1,0),(i,0),(\alpha,1),(\beta,i)$（$\alpha,\beta\in\mathbb C$）が任意の $\alpha,\beta$ について全格子の実基底になることを示せ。

<!-- solution-start -->
**詳細解答**。実係数 $a,b,c,d$ について

$$
a(1,0)+b(i,0)+c(\alpha,1)+d(\beta,i)=(0,0)
$$

とすると第二成分から $c+di=0$、すなわち $c=d=0$。第一成分は $a+bi=0$ となるので $a=b=0$。実線形独立な四元は $\mathbb C^2\cong\mathbb R^4$ の実基底となり、その整数結合は[全格子](#def-cm1-09-full-lattice)を定める。
<!-- solution-end -->

<a id="ex-cm1-09-a02"></a>
#### CM1-09-A02 格子点の距離と小球
- Level: A

$\Lambda_0=\mathbb Z^2+i\mathbb Z^2$ とする。非零 $\lambda\in\Lambda_0$ について $\|\lambda\|\ge1$ を示し、半径 $r=1/5$ の任意の球 $B_r(a)$ 上で $q$ が単射であることを確かめよ。

<!-- solution-start -->
**詳細解答**。格子点を $\lambda=(k_1+ik_2,k_3+ik_4)$、$k_j\in\mathbb Z$ と書けば

$$
\|\lambda\|^2=k_1^2+k_2^2+k_3^2+k_4^2.
$$

非零なら少なくとも一つの整数が絶対値 $1$ 以上なので $\|\lambda\|^2\ge1$。$x,y\in B_{1/5}(a)$ が同じ剰余類なら $x-y\in\Lambda_0$。一方 $\|x-y\|<2/5<1$ だから $x-y=0$。従って $q|_{B_{1/5}(a)}$ は単射である。
<!-- solution-end -->

<a id="ex-cm1-09-a03"></a>
#### CM1-09-A03 商上の座標遷移
- Level: A

$q(B_r(a))$ と $q(B_r(b))$ の重なりで $\varphi_a([x])=x$、$\varphi_b([y])=y$ とし、代表元が $x-y=\lambda\in\Lambda$ を満たすとする。遷移写像とその複素Jacobi行列を書け。

<!-- solution-start -->
**詳細解答**。$\varphi_a$ の値を $x$ とすると、同じ剰余類の $\varphi_b$ の代表元は $y=x-\lambda$。従って

$$
(\varphi_b\circ\varphi_a^{-1})(x)=x-\lambda,\qquad
D_{\mathbb C}(\varphi_b\circ\varphi_a^{-1})_x=I_n.
$$

$r<\delta/4$ なら[商アトラス定理](#thm-cm1-09-quotient-atlas)で $\lambda$ は重なり上で一意である。定数平行移動は正則であり、逆は $x\mapsto x+\lambda$ である。
<!-- solution-end -->

<a id="ex-cm1-09-a04"></a>
#### CM1-09-A04 座標成分は商へ降りるか
- Level: A

$\Lambda_0=\mathbb Z^2+i\mathbb Z^2$ とする。$F(z_1,z_2)=z_1$ は $T_{\Lambda_0}$ 上の複素数値関数を定めるか。また $G(z_1,z_2)=2z_1$ を剰余類 $[\,\cdot\,]_{\mathbb Z+i\mathbb Z}$ で読む場合はどうか。

<!-- solution-start -->
**詳細解答**。$F(0,0)=0$ と $F(1,0)=1$ は異なる複素数なのに、$(0,0)$ と $(1,0)$ は同じ剰余類なので、$F$ は複素数値関数へ降りない。一方、$G(z+(k_1+ik_2,k_3+ik_4))-G(z)=2k_1+2ik_2\in\mathbb Z+i\mathbb Z$ なので、剰余類へ写す場合は[降下条件](#prop-cm1-09-affine-descent)を満たす。行き先が $\mathbb C$ か一次元トーラスかで結論が変わる。
<!-- solution-end -->

<a id="ex-cm1-09-a05"></a>
#### CM1-09-A05 コンパクト性の代表元
- Level: A

$\Lambda_0=\mathbb Z^2+i\mathbb Z^2$、$z=(3.4-2.2i,-1.7+4.6i)$ とする。各実部・虚部が $[0,1]$ に入るような $z$ と同値な点を一つ求めよ。

<!-- solution-start -->
**詳細解答**。各実部・虚部から床関数で求めた整数を引く。$3.4-\lfloor3.4\rfloor=0.4$、$-2.2-\lfloor-2.2\rfloor=0.8$、$-1.7-\lfloor-1.7\rfloor=0.3$、$4.6-\lfloor4.6\rfloor=0.6$。従って

$$
z'=(0.4+0.8i,\ 0.3+0.6i).
$$

差は $(3-3i,-2+4i)\in\Lambda_0$ だから $[z]=[z']$。この操作が[商のコンパクト性の証明](#thm-cm1-09-quotient-atlas)で任意の点を基本平行多面体へ移す操作である。
<!-- solution-end -->

### Level B

<a id="ex-cm1-09-b01"></a>
#### CM1-09-B01 実格子基底の変換
- Level: B

$\omega_1,\ldots,\omega_{2n}$ が全格子 $\Lambda$ の実基底とする。$\omega'_1=\omega_1+\omega_2$、$\omega'_2=\omega_2$、$\omega'_j=\omega_j$（$j\ge3$）が同じ全格子の基底になることを、両方向の整数結合を示して証明せよ。

<!-- solution-start -->
**詳細解答**。新しい生成元はいずれも元の生成元の整数結合だから $\Lambda'\subset\Lambda$。逆に

$$
\omega_1=\omega'_1-\omega'_2,\qquad
\omega_2=\omega'_2,\qquad
\omega_j=\omega'_j\ (j\ge3)
$$

も整数結合なので $\Lambda\subset\Lambda'$。従って $\Lambda=\Lambda'$。さらに新しい元の実一次結合が零、すなわち $a\omega'_1+b\omega'_2+\sum_{j=3}^{2n}c_j\omega'_j=0$ なら、元の基底に戻して

$$
a\omega_1+(a+b)\omega_2+\sum_{j=3}^{2n}c_j\omega_j=0
$$

となる。元の実線形独立性より $a=0$、$a+b=0$、全ての $c_j=0$ であり、$b=0$ も従う。従って新しい元も実基底である。変換行列は整数の可逆な剪断行列で、行列式は $1$ である。
<!-- solution-end -->

<a id="ex-cm1-09-b02"></a>
#### CM1-09-B02 行列が商へ降りない場合
- Level: B

$\Lambda_0=\mathbb Z^2+i\mathbb Z^2$ とし、$A(z_1,z_2)=(z_1+\frac12z_2,z_2)$ とする。

1. $[z]\mapsto[Az]$ が $T_{\Lambda_0}\to T_{\Lambda_0}$ として定義できないことを示せ。
2. 行き先を $T_{A\Lambda_0}$ に替えると双正則写像になることを証明せよ。

<!-- solution-start -->
**詳細解答**。

**(1)** $\lambda=(0,1)\in\Lambda_0$ だが、

$$
A\lambda=(1/2,1)\notin\Lambda_0.
$$

従って $[0]_{\Lambda_0}=[\lambda]_{\Lambda_0}$ なのに $[A0]_{\Lambda_0}\ne[A\lambda]_{\Lambda_0}$。これは[アフィン写像の降下条件](#prop-cm1-09-affine-descent)に違反する。

**(2)** $A$ は複素線形で、逆行列は $A^{-1}(w_1,w_2)=(w_1-\frac12w_2,w_2)$。$\Gamma=A\Lambda_0$ を定義すると、当然 $A\Lambda_0=\Gamma$ である。$\Gamma$ は実線形同型 $A$ による全格子の像だから全格子であり、[格子同型の命題](#prop-cm1-09-linear-isomorphism)により

$$
[z]_{\Lambda_0}\longmapsto[Az]_\Gamma,\qquad
[w]_\Gamma\longmapsto[A^{-1}w]_{\Lambda_0}
$$

は互いに逆な正則写像となる。
<!-- solution-end -->

<a id="ex-cm1-09-b03"></a>
#### CM1-09-B03 三倍写像の逆像
- Level: B

複素次元 $2$ の任意の複素トーラス $T_\Lambda$ で $[3]$ の核を格子基底を使って表し、その点数と、任意の一点 $[w]$ の逆像の点数を示せ。

<!-- solution-start -->
**詳細解答**。$\Lambda=\sum_{j=1}^{4}\mathbb Z\omega_j$ と書く。[3] の核は $3z\in\Lambda$ を満たす $[z]$ 全体だから、

$$
\ker[3]
=\left\{\left[\frac{k_1\omega_1+\cdots+k_4\omega_4}{3}\right]:
k_j\in\{0,1,2\}\right\}.
$$

格子基底の実線形独立性により、表示の異なる剰余ベクトルは異なる商の点になる。従って点数は $3^4=81$ である。$[3]([w/3])=[w]$ であり、$[3]([z])=[w]$ の任意の解と $[w/3]$ との差は核に入る。ゆえに逆像は $[w/3]+\ker[3]$ で、やはり81点である。
<!-- solution-end -->

<a id="ex-cm1-09-b04"></a>
#### CM1-09-B04 剛性の仮定の効き方
- Level: B

複素トーラス上では $f:T_\Lambda\to\mathbb C$ が正則なら定数である。しかし $[z]\mapsto[2z]$ は非定数である。この二つが矛盾しない理由を、行き先と局所表示の両方から説明せよ。また $z_1$ が大域複素数値関数へ降りないことを示せ。

<!-- solution-start -->
**詳細解答**。[剛性定理](#thm-cm1-09-holomorphic-rigidity)が扱うのは複素数値写像である。それに対して整数倍写像の行き先はコンパクトな商 $T_\Lambda$ 自身であり、定理の仮定と異なる。

[二倍写像](#cor-cm1-09-multiplication-kernel)の局所座標表示は格子平行移動を除けば $x\mapsto2x$ である。その複素微分は

$$
D_{\mathbb C}[2]=2I_n\ne0
$$

だから局所的にも非定数である。

最後に座標成分 $z_1$ が複素数値関数として商へ降りるには、全ての $\lambda\in\Lambda$ について $\lambda_1=0$ が必要となる。しかし全格子は $\mathbb C^n$ を実線形に張るため、第一成分が非零の格子元 $\lambda$ が存在する。そのような元について

$$
[z]=[z+\lambda],\qquad z_1\ne z_1+\lambda_1
$$

となり、値が代表元に依存する。従って $z_1$ は商上で一価に定まらない。
<!-- solution-end -->

### Level C

<a id="ex-cm1-09-c01"></a>
#### CM1-09-C01 格子の剪断と倍写像の総合
- Level: C

$\Lambda_0=\mathbb Z^2+i\mathbb Z^2$ と $A(z_1,z_2)=(z_1+\frac12z_2,z_2)$ を取り、$\Gamma=A\Lambda_0$ とする。

1. $\Gamma$ が全格子であることと、$T_{\Lambda_0}$ と $T_\Gamma$ が双正則であることを証明せよ。
2. $T_\Gamma$ 上の $[2]$ が正則であり、その核が16点であることを証明せよ。
3. $T_{\Lambda_0}$ 上で $[2]$ を行い、$A$ で商を移した結果と、先に $A$ で商を移して $T_\Gamma$ 上で $[2]$ を行った結果が等しいことを証明せよ。
4. この可換性が $T_{\Lambda_0}\to\mathbb C$ の非定数正則関数の存在を意味しない理由を説明せよ。

<!-- solution-start -->
**詳細解答**。

**(1)** $A$ の複素行列は

$$
\begin{pmatrix}1&1/2\\0&1\end{pmatrix}
$$

で行列式 $1$、従って可逆である。$\Lambda_0$ の四つの実基底を $A$ で送った四元も実線形独立であり、その整数結合が $\Gamma$ である。[複素線形格子同型](#prop-cm1-09-linear-isomorphism)を適用すれば、$\overline A([z]_{\Lambda_0})=[Az]_\Gamma$ と $\overline{A^{-1}}$ が互いに逆な正則写像である。

**(2)** $2\Gamma\subset\Gamma$ なので[降下条件](#prop-cm1-09-affine-descent)により $[w]_\Gamma\mapsto[2w]_\Gamma$ は正則である。$\Gamma$ の実基底を $A\omega_j$（$j=1,\ldots,4$）と書くと、その核は

$$
\left[\frac12\sum_{j=1}^4 k_jA\omega_j\right]_\Gamma,
\qquad k_j\in\{0,1\}
$$

の16個である。二つの組が同じ剰余類なら、係数差が全て2の倍数となるため、その組は一致する。

**(3)** 任意の $[z]_{\Lambda_0}$ で、$A$ の複素線形性から $A(2z)=2Az$ が成立する。よって

$$
\overline A\bigl([2]_{\Lambda_0}([z])\bigr)
=[A(2z)]_\Gamma
=[2Az]_\Gamma
=[2]_\Gamma\bigl(\overline A([z])\bigr).
$$

いずれも代表元を替えても格子差は行き先の格子へ送られるため、この等式は商上で正しい。

**(4)** 左右の写像の行き先はいずれも複素トーラスであり、複素数平面ではない。従って[剛性定理](#thm-cm1-09-holomorphic-rigidity)の主張と矛盾しない。もし $T_{\Lambda_0}\to\mathbb C$ の正則関数があれば、コンパクト性と一変数の[最大値原理](../../../解析系/CA/CA3/index.md#thm-ca3-maximum-modulus)を用いた同定理により定数になる。$\square$
<!-- solution-end -->

## 8. 次章への接続

複素トーラスでは、平行移動という最も簡単な正則遷移からコンパクトな複素多様体ができた。一方、座標遷移が平行移動でない典型例も欲しい。次章では複素ベクトルの非零スカラー倍を同一視する**複素射影空間**を構成し、座標変換が分数式になることを確かめる。
