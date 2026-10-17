# KAH1-13 Kähler classと正値性

<!-- definition-example-audit: strict -->

## 1. 局所計量から大域的な類へ

前章では[Ricci形式と第一Chern類の対応](../KAH1-12/index.md#thm-kah1-12-ricci-chern)を調べた。曲率から得た閉2形式をde Rham類に送ると、局所座標に依存しない情報が残った。今度は曲率ではなく、計量自身の基本2形式に同じ操作を施す。

[Kähler条件](../KAH1-02/index.md#thm-kah1-02-local-closedness)は、正値な実 $(1,1)$ 形式 $\omega$ が閉じていることだった。一方、[de Rhamコホモロジー](../../GEO/GEO9/index.md#def-geo9-de-rham-cohomology)では、閉2形式が完全2形式だけ異なるとき、同じ類を定める。ここには一つの疑問がある。**コホモロジー類には正負がないように見えるのに、どうして「正の形式から来る類」という幾何的な条件を課せるのだろうか。**

答えは、類そのものを点ごとに評価するのではなく、**その類に正の閉 $(1,1)$ 形式の代表が存在するか**を問うことにある。そのような代表が一つでもあれば、計量の細かな変更から独立した大域的情報を得られる。

以下、$X$ は複素次元 $n\ge1$ の滑らかな複素多様体で、複素構造 $J$ を**固定**する。境界を持たないコンパクト多様体を扱う箇所では、その仮定を明記する。$X$ 上の形式はすべて滑らかであり、実係数de Rhamコホモロジーを使う。正則座標では

$$
\omega=i\sum_{j,k=1}^n g_{j\bar k}\,dz^j\wedge d\bar z^k,\qquad
-i\omega(v,\bar v)=\sum_{j,k}g_{j\bar k}v^j\overline{v^k}
$$

と約束する。なぜこの係数行列で正値性を判定できるかを、基底展開から確かめる。局所ベクトルを

$$
v=\sum_jv^j\frac{\partial}{\partial z^j}
$$

と書くと、正則座標の双対基底について

$$
dz^j(v)=v^j,\qquad
d\bar z^k(\bar v)=\overline{v^k}
$$

が成立し、交差する評価は零である。従って外積を $(v,\bar v)$ に作用させると、第1式の二次形式になる。

[正値Hermite行列との対応](../KAH1-02/index.md#prop-kah1-02-matrix-criterion)により、すべての非零ベクトルに対してその値が正であることと、係数行列 $G=(g_{j\bar k})$ が正値であることは同値である。これが[正の実 $(1,1)$ 形式](../KAH1-02/index.md#def-kah1-02-positive-form)の判定法であり、閉性 $d\omega=0$ は別に確認する。

## 2. Kähler類を定義する

de Rham類の等号 $[\omega_0]=[\omega_1]$ は、二つの**閉形式**について、ある実1形式 $\alpha$ が存在して $\omega_1-\omega_0=d\alpha$ と書けることを意味する。代表を変える差 $d\alpha$ 自体に正値性は要求しない。そのため、同じ類のすべての代表が正であるわけではない。

<a id="def-kah1-13-class"></a>

<!-- formal-statement-start -->
> **定義（Kähler類）**  
> 複素多様体 $(X,J)$ 上の実de Rham類 $c\in H^2_{\mathrm{dR}}(X;\mathbb R)$ について、滑らかな実閉 $(1,1)$ 形式 $\omega$ が存在して

$$
[\omega]=c,\qquad
-i\omega_p(v,\bar v)>0
\quad(p\in X,\;0\ne v\in T^{1,0}_pX)
$$

> を満たすとき、$c$ を **Kähler類** という。そのような類の集合を $\mathcal K_X$ と書く。特に $\omega$ がKähler形式であるとき、その類 $[\omega]$ を **$\omega$ のKähler類** と呼ぶ。
<!-- formal-statement-end -->

<!-- definition-example-start: def-kah1-13-class -->
**定義の確認**（複素平面）。$X=\mathbb C$ の $z=x+iy$ について

$$
\omega_0=i\,dz\wedge d\bar z=2\,dx\wedge dy
$$

と置く。$dz\wedge d\bar z$ は $(1,1)$ 型であり、複素共役を取ると

$$
\overline{i\,dz\wedge d\bar z}
=-i\,d\bar z\wedge dz
=i\,dz\wedge d\bar z
$$

なので実形式である。また $v=v^z\partial_z\ne0$ に対して

$$
-i\omega_0(v,\bar v)=|v^z|^2>0.
$$

実2次元上の3形式は零なので $d\omega_0=0$。こうして型・実性・正値性・閉性の全条件を満たすKähler形式である。ただし

$$
\alpha=x\,dy-y\,dx,\qquad
d\alpha=2\,dx\wedge dy=\omega_0
$$

なので、[完全形式とde Rham類](../../GEO/GEO9/index.md#def-geo9-closed-exact)から $[\omega_0]=0$ である。したがって**非コンパクトな $\mathbb C$ では零類もKähler類になり得る**。この段階で「Kähler類は常に零ではない」と一般化してはいけない。
<!-- definition-example-end -->

## 3. Kähler cone とその凸性

異なるKähler形式を足すと、同じ正則座標での係数行列も足される。$\omega_r=i\sum_{j,k}(G_r)_{j\bar k}\,dz^j\wedge d\bar z^k$ ($r=1,2$) なら、外積を $(v,\bar v)$ に評価する第1節の計算から

$$
-i(a\omega_1+b\omega_2)(v,\bar v)
=v^{\mathsf T}(aG_1+bG_2)\bar v
=a\,v^{\mathsf T}G_1\bar v+b\,v^{\mathsf T}G_2\bar v>0
\qquad(a,b>0,\;v\ne0)
$$

となる。係数行列による[正値判定](../KAH1-02/index.md#prop-kah1-02-matrix-criterion)と、元の形式の定義が対応している。閉性は別に外微分の線形性から従う。

<a id="def-kah1-13-cone"></a>

<!-- formal-statement-start -->
> **定義（Kähler cone）**  
> 複素構造 $J$ を固定した複素多様体 $(X,J)$ に対し、Kähler類全体の集合

$$
\mathcal K_X
=\left\{[\omega]\in H^2_{\mathrm{dR}}(X;\mathbb R):
\omega\ \text{は正の実閉 $(1,1)$ 形式}\right\}
$$

> を **Kähler cone（Kähler錐）** と呼ぶ。$X$ がKähler形式を持たなければ、この集合は空とする。
<!-- formal-statement-end -->

<!-- definition-example-start: def-kah1-13-cone -->
**定義の確認**（射影直線）。 [Fubini–Study形式の貼り合わせ](../KAH1-07/index.md#thm-kah1-07-global-fs)による $\omega_{\mathrm{FS}}$ は正の実閉 $(1,1)$ 形式であり、[規格化された面積積分](../KAH1-07/index.md#thm-kah1-07-area)は

$$
\int_{\mathbb{CP}^1}\omega_{\mathrm{FS}}=2\pi
$$

である。任意の $a>0$ に対し $a\omega_{\mathrm{FS}}$ も正・実・閉・$(1,1)$ 型で、$\int a\omega_{\mathrm{FS}}=2\pi a$。よって $a[\omega_{\mathrm{FS}}]$ はKähler類である。$a\ne b$ なら積分が異なるので類も異なる。
<!-- definition-example-end -->

<a id="prop-kah1-13-convex"></a>

<!-- formal-statement-start -->
> **命題（Kähler cone の凸錐性）**  
> 固定した複素構造を持つ複素多様体 $(X,J)$ について、$c_1,c_2\in\mathcal K_X$ および $a,b>0$ なら

$$
ac_1+bc_2\in\mathcal K_X.
$$

> 特に $\mathcal K_X$ は正のスカラー倍と係数の和が1となる正の線形結合でも閉じている。ただし零類を含むとは限らず、空集合であることもある。
<!-- formal-statement-end -->

### 証明の見取り図

類 $c_j$ を正の実閉 $(1,1)$ 形式 $\omega_j$ で代表し、$a\omega_1+b\omega_2$ の型、実性、閉性、正値性を別々に調べる。

<!-- proof-start -->
### 証明

[Kähler類の定義](#def-kah1-13-class)から、$j=1,2$ について $[\omega_j]=c_j$ である正の実閉 $(1,1)$ 形式を選べる。$\omega=a\omega_1+b\omega_2$ と置く。型分解と複素共役は実線形だから $\omega$ は実 $(1,1)$ 型である。また

$$
d\omega=a\,d\omega_1+b\,d\omega_2=0.
$$

各点 $p$ と $0\ne v\in T^{1,0}_pX$ について

$$
-i\omega_p(v,\bar v)
=a\{-i(\omega_1)_p(v,\bar v)\}
+b\{-i(\omega_2)_p(v,\bar v)\}>0
$$

となる。従って $\omega$ はKähler形式で、[de Rham類の線形性](../../GEO/GEO9/index.md#def-geo9-de-rham-cohomology)から $[\omega]=a[\omega_1]+b[\omega_2]=ac_1+bc_2$。係数の和を1とするには $a=t,b=1-t$ ($0<t<1$) を選ぶ。端点も元の類なので含まれる。$\square$
<!-- proof-end -->

**意味。** 凸性は一つの固定した複素構造に対する主張である。異なる複素構造にそれぞれ正値な形式を足しても、同じ $(1,1)$ 型になる保証はない。

## 4. 代表を少し動かしても正であるか

凸性は「正の形式を二つ持っている」場合に限る。では、Kähler類 $[\omega]$ に小さな閉実 $(1,1)$ 形式を足したときも正か。各点で小さければ正値Hermite行列は正値のままだが、**全点で一様に小さい**ことが必要になる。ここでコンパクト性が効く。

まず使用するコホモロジーの範囲を限定する。実閉 $(1,1)$ 形式全体の実ベクトル空間を $Z^{1,1}_{\mathbb R}(X)$ とし、写像 $\eta\mapsto[\eta]$ の像を

$$
V_J:=\{[\eta]\in H^2_{\mathrm{dR}}(X;\mathbb R):
\eta\in Z^{1,1}_{\mathbb R}(X)\}
$$

と置く。これは、線形写像の像なので実ベクトル部分空間である。ここではHodge分解も大域 $\partial\bar\partial$ 補題も使わない。$V_J$ が $H^2_{\mathrm{dR}}$ 全体と等しいとは主張しない。

<a id="def-kah1-13-representable-subspace"></a>

<!-- formal-statement-start -->
> **定義（実閉(1,1)形式で表せる部分空間）**  
> 複素多様体 $(X,J)$ に対し、上式の $V_J$ を、実閉 $(1,1)$ 形式で代表できるde Rham類の部分空間とする。$V_J$ が有限次元の場合、「$\mathcal K_X$ が $V_J$ に相対的に開」とは、その通常の実有限次元ベクトル空間位相で $\mathcal K_X\subset V_J$ が開集合であることをいう。有限次元性をまだ仮定しない場合は、次の定理のように有限次元方向ごとに述べる。
<!-- formal-statement-end -->

<!-- definition-example-start: def-kah1-13-representable-subspace -->
**定義の確認**。上の $\mathbb{CP}^1$ では $[\omega_{\mathrm{FS}}]\in V_J$ である。二つの閉実 $(1,1)$ 形式 $\eta_1,\eta_2$ と実数 $s,t$ を取ると、その実線形結合も同じ型・実性・閉性を満たす。従って

$$
s[\eta_1]+t[\eta_2]=[s\eta_1+t\eta_2]\in V_J.
$$

一方 $-\omega_{\mathrm{FS}}$ も実閉 $(1,1)$ 形式なので $-[\omega_{\mathrm{FS}}]\in V_J$ だが、この類はKähler類ではない。

仮に正の代表 $\theta$ があれば、$\mathbb{CP}^1$ の正の面積形式だから $\int_{\mathbb{CP}^1}\theta>0$。しかし同じde Rham類なら $\theta+\omega_{\mathrm{FS}}=d\gamma$ と書け、[一般Stokesの定理](../../GEO/GEO8/index.md#thm-geo8-general-stokes)から

$$
\int_{\mathbb{CP}^1}\theta
=-\int_{\mathbb{CP}^1}\omega_{\mathrm{FS}}
=-2\pi<0
$$

となって矛盾する。型で代表できることと、**正の代表が存在すること**は別条件である。
<!-- definition-example-end -->

正値性の開性は次の形で証明できる。有限次元性の前提を明示するため、まず任意の有限次元部分空間に対して述べる。

<a id="thm-kah1-13-relative-open"></a>

<!-- formal-statement-start -->
> **定理（Kähler cone の有限次元方向での開性）**  
> $X$ をコンパクトで境界のない複素多様体、$J$ を固定した複素構造とし、$[\omega]\in\mathcal K_X$ とする。$W\subset V_J$ を任意の有限次元実部分空間とする。このとき、$V_J$ 内のアフィン部分空間 $[\omega]+W$ に相対的に、$\mathcal K_X\cap([\omega]+W)$ は $[\omega]$ の近傍を含む。
>
> 特に $V_J$ が有限次元なら、$\mathcal K_X$ は $V_J$ 内で開である。
<!-- formal-statement-end -->

### 証明の見取り図

$W$ の基底類を閉実 $(1,1)$ 形式 $\eta_j$ で代表する。$\omega$ 自身の正値Hermite計量で $\eta_j$ を測ると、コンパクト性により点によらない上界 $M_j$ がある。係数 $t_j$ を十分小さくすれば、$\omega+\sum t_j\eta_j$ の正値性が失われない。

<!-- proof-start -->
### 証明

$W$ の基底 $[\eta_1],\ldots,[\eta_m]$ を選ぶ。$W\subset V_J$ なので、各基底類を滑らかな実閉 $(1,1)$ 形式 $\eta_j$ で代表できる。$m=0$ のときは $W=\{0\}$ であり自明なので、$m\ge1$ とする。

$\omega$ の正値係数行列 $G(p)$ で $T_p^{1,0}X$ にHermiteノルムを入れる。各 $j$ について

$$
M_j=\max_{\substack{p\in X,\;v\in T_p^{1,0}X\\
-i\omega_p(v,\bar v)=1}}
\left|-i(\eta_j)_p(v,\bar v)\right|
$$

と置く。正値性のため単位ベクトル条件は意味を持つ。各ファイバーの単位球面はコンパクトで、$X$ もコンパクトなので、その単位球面束は有限個の局所枠で覆ってコンパクトと確かめられる。評価関数は連続だから $M_j<\infty$ である。

任意の非零 $v$ を $(-i\omega_p(v,\bar v))^{1/2}$ で割って単位化すると

$$
\left|-i(\eta_j)_p(v,\bar v)\right|
\le M_j\{-i\omega_p(v,\bar v)\}.
$$

$\sum_{j=1}^m|t_j|M_j<1$ を満たす実係数に対し $\omega_t=\omega+\sum_jt_j\eta_j$ と置けば、

$$
\begin{aligned}
-i(\omega_t)_p(v,\bar v)
&=-i\omega_p(v,\bar v)
 +\sum_jt_j\{-i(\eta_j)_p(v,\bar v)\}\\
&\ge\left(1-\sum_j|t_j|M_j\right)
\{-i\omega_p(v,\bar v)\}>0.
\end{aligned}
$$

各 $\eta_j$ は実閉 $(1,1)$ 型なので、$\omega_t$ も実閉 $(1,1)$ 型である。よって $[\omega_t]=[\omega]+\sum_jt_j[\eta_j]\in\mathcal K_X$。条件 $\sum|t_j|M_j<1$ は原点を含む $\mathbb R^m$ の開近傍なので、基底によって同一視した $[\omega]+W$ 上の開近傍を与える。

最後に $V_J$ が有限次元なら $W=V_J$ と選べるため、その通常の有限次元位相に関して $\mathcal K_X$ は各点で近傍を含む。$\square$
<!-- proof-end -->

**「どこで開なのか」に注意。** この章で証明したのは $V_J$ に相対的な開性である。$V_J$ が $H^2_{\mathrm{dR}}(X;\mathbb R)$ の真部分空間なら、その中で開でもコホモロジー全体で開とは限らない。コンパクト多様体のde Rhamコホモロジーの有限次元性は一般に成立するが、その大域的証明はこの章の前提に含めず、上の定理では有限次元性を必要な箇所に明記した。

**具体的な揺らぎ。** $T=\mathbb C/(\mathbb Z+i\mathbb Z)$ に $z=x+iy$ と $\omega_0=i\,dz\wedge d\bar z$ を入れる。[複素トーラスへの降下](../KAH1-05/index.md#prop-kah1-05-torus)により、平行移動で不変な $\omega_0$ は大域形式である。周期関数

$$
\varphi(x,y)=\varepsilon\cos(2\pi x)
$$

を使うと、[Wirtinger微分](../../CM/CM2-02/index.md#def-cm2-02-wirtinger-operators)から

$$
\frac{\partial^2\varphi}{\partial z\partial\bar z}
=\frac14(\partial_x^2+\partial_y^2)\varphi
=-\pi^2\varepsilon\cos(2\pi x)
$$

となる。よって

$$
\omega_\varepsilon
=\omega_0+i\partial\bar\partial\varphi
=i\{1-\pi^2\varepsilon\cos(2\pi x)\}\,dz\wedge d\bar z.
$$

$|\varepsilon|<1/\pi^2$ なら中括弧内は全点で正、$|\varepsilon|\ge1/\pi^2$ では等号・負値となる点があり、正値ではない。**同じde Rham類を表すことは、選んだ代表の正値性を保証しない**。この例の二つの形式が同じ類である理由は次節で計算する。

## 5. 大域ポテンシャルと完全形式の差

[局所Kählerポテンシャルの存在](../KAH1-04/index.md#thm-kah1-04-local-existence)により、どの点の近くでも $\omega=i\partial\bar\partial\varphi$ と書ける。しかし、局所関数がすべて一つの大域関数になるとは限らない。

実数値の滑らかな関数 $\varphi$ に対して、実1形式

$$
\alpha_\varphi
=\frac{i}{2}(\bar\partial\varphi-\partial\varphi)
$$

を作る。複素共役では $\overline{\alpha_\varphi}=\alpha_\varphi$ となるので、本当に実形式である。[型別外微分の公式](../../CM/CM2-02/index.md#thm-cm2-02-local-formula)の $d=\partial+\bar\partial$、$\partial^2=\bar\partial^2=0$、$\bar\partial\partial=-\partial\bar\partial$ を使うと、

$$
\begin{aligned}
d\alpha_\varphi
&=\frac i2(\partial\bar\partial\varphi
+\bar\partial^2\varphi-\partial^2\varphi
-\bar\partial\partial\varphi)\\
&=\frac i2(\partial\bar\partial\varphi
+\partial\bar\partial\varphi)
=i\partial\bar\partial\varphi.
\end{aligned}
$$

これが「大域ポテンシャルから得たKähler形式は完全形式になる」という機構である。

<a id="prop-kah1-13-global-potential-exact"></a>

<!-- formal-statement-start -->
> **命題（大域ポテンシャルによる類の不変性）**  
> 複素多様体 $X$ 上の滑らかな実閉 $(1,1)$ 形式 $\omega$ と、大域的な滑らかな実関数 $\varphi$ に対し、

$$
[\omega+i\partial\bar\partial\varphi]=[\omega]
\quad\text{in }H^2_{\mathrm{dR}}(X;\mathbb R).
$$

> さらに **$\omega$ と $\omega+i\partial\bar\partial\varphi$ の両方が正値**なら、両者は同じKähler類のKähler代表となる（形式として一致することもある）。後者だけが正値でも、元の $\omega$ をKähler代表とは呼べない。
<!-- formal-statement-end -->

### 証明の見取り図

差を上で構成した実1形式の外微分として書けば、de Rham類が等しいことが直ちに分かる。正値性は別に調べる。

<!-- proof-start -->
### 証明

$\alpha_\varphi=(i/2)(\bar\partial\varphi-\partial\varphi)$ は大域的な実1形式であり、上の計算から

$$
(\omega+i\partial\bar\partial\varphi)-\omega
=i\partial\bar\partial\varphi=d\alpha_\varphi.
$$

[de Rham コホモロジー](../../GEO/GEO9/index.md#def-geo9-de-rham-cohomology)により両者の類は一致する。$d(\omega+i\partial\bar\partial\varphi)=d\omega+d^2\alpha_\varphi=0$ で、型と実性も保たれる。さらに両者が正値なら、それぞれ[Kähler類の定義](#def-kah1-13-class)を満たし、同じ類のKähler代表である。$\square$
<!-- proof-end -->

トーラスの $\omega_\varepsilon$ はこの命題の適用例である。代表の係数は $x$ により変化しても、類は $[\omega_0]$ のままである。

例えば $|\varepsilon|\ge1/\pi^2$ では $\omega_\varepsilon$ は正値でない。一方、大域関数 $\varphi=-\varepsilon\cos(2\pi x)$ を足すと

$$
\omega_\varepsilon+i\partial\bar\partial\varphi=\omega_0
$$

は正値となる。この例は、同じ類のすべての代表をKähler形式とみなせないことを示す。

なお、同じ類の二つのKähler形式の差が常に大域的な $i\partial\bar\partial\varphi$ と書けるという逆向きの主張は本章では行わない。後続の大域 $\partial\bar\partial$ 補題の問題である。

## 6. コンパクト多様体で類が消えない理由

[一般Stokesの定理](../../GEO/GEO8/index.md#thm-geo8-general-stokes)を使うと、境界のないコンパクト多様体上では、完全な最高次数形式の積分は零となる。一方、Kähler形式の最高外冪は正の体積形式となる。この二つは両立しない。

局所正則座標での係数行列 $G=(g_{j\bar k})$ を考える。$n$ 回の外積を展開すると、同じ $dz^j$ または $d\bar z^k$ を二度選んだ項は交代性により零になる。残る項の二組の添字はそれぞれ $1,\ldots,n$ の置換であり、符号を整理すると係数は

$$
\sum_{\sigma\in S_n}\operatorname{sgn}(\sigma)
\prod_{j=1}^n g_{j\overline{\sigma(j)}}=\det(G)
$$

となる。各2形式は互いに可換で、同じ項が $n!$ 回現れるから、

$$
\frac{\omega^n}{n!}
=i^n\det(G)\,
dz^1\wedge d\bar z^1\wedge\cdots\wedge
dz^n\wedge d\bar z^n
$$

となる。$i\,dz^j\wedge d\bar z^j=2\,dx^j\wedge dy^j$ であり、複素構造による向きで

$$
\frac{\omega^n}{n!}
=2^n\det(G)\,dx^1\wedge dy^1\wedge\cdots
\wedge dx^n\wedge dy^n.
$$

$\det(G)>0$ なので、これは各点で正の体積形式である。ここで正値性を行列式に移したのは、[正値Hermite行列との対応](../KAH1-02/index.md#prop-kah1-02-matrix-criterion)による。

この後の $[\omega]^k$ は $[\omega^k]$ を意味する。この記号が代表の選び方に依存しないことも確かめる。$\omega$ と $\omega'=\omega+d\alpha$ が閉2形式なら、2形式同士の外積は可換だから、差の積の因数分解ができる。

$$
\omega'^k-\omega^k
=d\alpha\wedge\sum_{j=0}^{k-1}
\omega'^j\wedge\omega^{k-1-j}.
$$

和の各項は閉形式なので、[外微分のLeibniz則](../../GEO/GEO7/index.md#thm-geo7-graded-leibniz)から

$$
\omega'^k-\omega^k
=d\left(\alpha\wedge\sum_{j=0}^{k-1}
\omega'^j\wedge\omega^{k-1-j}\right).
$$

従って $[\omega'^k]=[\omega^k]$ である。これは一般のコホモロジー環の理論を前提にしない、この章で必要な代表の独立性の確認である。

<a id="thm-kah1-13-compact-nonzero"></a>

<!-- formal-statement-start -->
> **定理（コンパクトKähler多様体のKähler類は非零）**  
> $X$ を空でない、境界のないコンパクトKähler多様体とし、複素次元を $n\ge1$、Kähler形式を $\omega$ とする。このとき

$$
\int_X\omega^n>0,\qquad
[\omega]\ne0
\quad\text{in }H^2_{\mathrm{dR}}(X;\mathbb R).
$$

> さらに各 $1\le k\le n$ に対して $[\omega]^k\ne0$ である。ここで $[\omega]^k=[\omega^k]$ は外積によるde Rhamコホモロジーの積である。
<!-- formal-statement-end -->

### 証明の見取り図

正値性から最高外冪の積分は正である。もし $[\omega]^k=0$ なら $\omega^k$ が完全であり、閉性 $d\omega=0$ を使って $\omega^n$ も完全と書ける。Stokesの定理と矛盾する。

<!-- proof-start -->
### 証明

$X$ はコンパクトで空でなく、上の座標計算から $\omega^n/n!$ はいたるところ正の体積形式である。局所座標の正の密度を有限個のチャートと従属分割で積分すれば、少なくとも一つの開集合で正の寄与があり、他の寄与は非負となるので $\int_X\omega^n>0$。

$1\le k\le n$ とし、$[\omega]^k=0$ と仮定する。これは[de Rhamコホモロジーの定義](../../GEO/GEO9/index.md#def-geo9-de-rham-cohomology)により、実 $(2k-1)$ 形式 $\beta$ があって $\omega^k=d\beta$ となることを意味する。$d\omega=0$ と[外微分のLeibniz則](../../GEO/GEO7/index.md#thm-geo7-graded-leibniz)から $d(\omega^{n-k})=0$。ゆえに

$$
\begin{aligned}
d(\beta\wedge\omega^{n-k})
&=d\beta\wedge\omega^{n-k}
+(-1)^{2k-1}\beta\wedge d(\omega^{n-k})\\
&=\omega^k\wedge\omega^{n-k}
=\omega^n.
\end{aligned}
$$

$\beta\wedge\omega^{n-k}$ は $(2n-1)$ 形式である。境界のないコンパクト $X$ に[一般Stokesの定理](../../GEO/GEO8/index.md#thm-geo8-general-stokes)を適用すると

$$
\int_X\omega^n
=\int_Xd(\beta\wedge\omega^{n-k})
=\int_{\partial X}\beta\wedge\omega^{n-k}
=0.
$$

これは正の積分と矛盾する。従ってすべての $k$ で $[\omega]^k\ne0$。特に $k=1$ が $[\omega]\ne0$ を与える。$\square$
<!-- proof-end -->

<a id="cor-kah1-13-no-global-potential"></a>

<!-- formal-statement-start -->
> **系（コンパクト正次元では大域単一Kählerポテンシャルはない）**  
> 空でない、境界のないコンパクトKähler多様体 $(X,\omega)$ の複素次元が $n\ge1$ なら、$X$ 全体で定義された滑らかな実関数 $\varphi$ により

$$
\omega=i\partial\bar\partial\varphi
$$

> と表すことはできない。
<!-- formal-statement-end -->

### 証明の見取り図

大域関数なら前節の実1形式を使って $\omega$ が完全になり、非零Kähler類の定理と衝突する。

<!-- proof-start -->
### 証明

もし大域関数 $\varphi$ があれば、[大域ポテンシャルによる類の不変性](#prop-kah1-13-global-potential-exact)において $\omega=0+i\partial\bar\partial\varphi$ と置き、$[\omega]=[0]=0$ を得る。しかし[コンパクトKähler類の非零性](#thm-kah1-13-compact-nonzero)は $[\omega]\ne0$ と言うので矛盾する。$\square$
<!-- proof-end -->

ここで**局所**ポテンシャルと**大域**ポテンシャルを取り違えない。[局所存在定理](../KAH1-04/index.md#thm-kah1-04-local-existence)にはコンパクト性による障害が現れない。対して大域で一つの関数へ貼り合わせられるなら類が零になり、体積積分と衝突する。非コンパクトな $\mathbb C^n$ では $\sum_j|z^j|^2$ が実際に大域ポテンシャルを与えるため、結論を無条件に拡張できない。

## 7. 演習：代表・類・正値性を区別する

### Level A

<a id="ex-kah1-13-a01"></a>
#### KAH1-13-A01 複素平面の大域ポテンシャル
- Level: A

$\mathbb C$ で $\varphi=|z|^2$ とする。$i\partial\bar\partial\varphi$ の実座標式を求め、正値性、閉性、完全性をそれぞれ確認せよ。

<!-- solution-start -->
**詳細解答。** [Wirtinger微分](../../CM/CM2-02/index.md#def-cm2-02-wirtinger-operators)を $z=x+iy$ に適用すると $\partial_z\varphi=\bar z$、$\partial_{\bar z}\varphi=z$ である。よって $\partial_z\partial_{\bar z}\varphi=1$ であり、

$$
i\partial\bar\partial\varphi
=i\,dz\wedge d\bar z
=2\,dx\wedge dy.
$$

複素接ベクトル $v=v^z\partial_z$ に対して $-i\omega(v,\bar v)=|v^z|^2>0$。$\mathbb C$ は実2次元だから $d\omega$ は3形式で零。さらに $\alpha=(i/2)(z\,d\bar z-\bar z\,dz)=x\,dy-y\,dx$ を計算し、

$$
d\alpha=d(x\,dy-y\,dx)=dx\wedge dy-dy\wedge dx
=2\,dx\wedge dy=\omega.
$$

ゆえに完全であり、類は零。非コンパクトな空間では矛盾しない。
<!-- solution-end -->

<a id="ex-kah1-13-a02"></a>
#### KAH1-13-A02 トーラスの面積と非完全性
- Level: A

$T=\mathbb C/(\mathbb Z+i\mathbb Z)$ に $\omega_0=i\,dz\wedge d\bar z$ を入れる。正の実閉 $(1,1)$ 形式であること、$\int_T\omega_0=2$、$[\omega_0]\ne0$ を示せ。

<!-- solution-start -->
**詳細解答。** [複素トーラスへの降下](../KAH1-05/index.md#prop-kah1-05-torus)のとおり、格子平行移動は $dz$ を変えないので $\omega_0$ は商に降りる。共役をとると実形式で、$(1,1)$ 型、$-i\omega_0(v,\bar v)=|v|^2>0$。複素一次元では外微分は3形式で零となる。基本領域 $0\le x,y\le1$ で

$$
\int_T\omega_0=\int_0^1\!\int_0^1 2\,dx\,dy=2.
$$

もし $\omega_0=d\alpha$ なら[一般Stokesの定理](../../GEO/GEO8/index.md#thm-geo8-general-stokes)で左辺は零になる。従って完全でなく $[\omega_0]\ne0$。
<!-- solution-end -->

<a id="ex-kah1-13-a03"></a>
#### KAH1-13-A03 射影直線の二つの類を足す
- Level: A

$\mathbb{CP}^1$ の $\omega_{\mathrm{FS}}$ を使い、$\omega_1=2\omega_{\mathrm{FS}}$、$\omega_2=3\omega_{\mathrm{FS}}$、$\tau=\frac14\omega_1+\frac34\omega_2$ とする。$\tau$ がKähler形式であることと面積積分を示せ。

<!-- solution-start -->
**詳細解答。** 係数は $2/4+9/4=11/4$ だから $\tau=(11/4)\omega_{\mathrm{FS}}$。係数 $11/4>0$ なので正値であり、元の実性・型・閉性が保たれる。[面積積分](../KAH1-07/index.md#thm-kah1-07-area)を使って

$$
\int_{\mathbb{CP}^1}\tau
=\frac{11}{4}\int_{\mathbb{CP}^1}\omega_{\mathrm{FS}}
=\frac{11\pi}{2}.
$$

類も $[\tau]=\frac14[\omega_1]+\frac34[\omega_2]$ で、[Kähler cone の凸性](#prop-kah1-13-convex)を具体化している。
<!-- solution-end -->

<a id="ex-kah1-13-a04"></a>
#### KAH1-13-A04 周期ポテンシャルで代表を動かす
- Level: A

$T=\mathbb C/(\mathbb Z+i\mathbb Z)$ で $\omega_\varepsilon=\omega_0+i\partial\bar\partial(\varepsilon\cos2\pi x)$ を考える。正値性の必要十分条件とde Rham類を求めよ。

<!-- solution-start -->
**詳細解答。** [Wirtinger微分](../../CM/CM2-02/index.md#def-cm2-02-wirtinger-operators)の定義から $\partial_z\partial_{\bar z}=\frac14(\partial_x^2+\partial_y^2)$ なので

$$
\partial_z\partial_{\bar z}(\varepsilon\cos2\pi x)
=-\pi^2\varepsilon\cos2\pi x.
$$

従って $\omega_\varepsilon=i(1-\pi^2\varepsilon\cos2\pi x)\,dz\wedge d\bar z$。余弦が $[-1,1]$ を取るため係数の最小値は $1-\pi^2|\varepsilon|$。正値の必要十分条件は $|\varepsilon|<1/\pi^2$ である。一方、周期関数は大域関数で、[大域ポテンシャルによる類の不変性](#prop-kah1-13-global-potential-exact)により $\omega_\varepsilon-\omega_0=d\alpha_\varphi$。ゆえに**正値でない $\varepsilon$ でも** $[\omega_\varepsilon]=[\omega_0]$ である。
<!-- solution-end -->

### Level B

<a id="ex-kah1-13-b01"></a>
#### KAH1-13-B01 中間次数の類も消えない
- Level: B

コンパクトで境界のない複素次元3のKähler多様体 $(X,\omega)$ について、$[\omega]^2=0$ と仮定して矛盾を導け。使う微分形式の次数とStokesの適用条件を明示せよ。

<!-- solution-start -->
**詳細解答。** $[\omega]^2=0$ なら、[de Rham コホモロジーの定義](../../GEO/GEO9/index.md#def-geo9-de-rham-cohomology)から実3形式 $\beta$ が存在して $\omega^2=d\beta$。$\omega$ は閉2形式で、[外微分のLeibniz則](../../GEO/GEO7/index.md#thm-geo7-graded-leibniz)より

$$
d(\beta\wedge\omega)
=d\beta\wedge\omega+(-1)^3\beta\wedge d\omega
=\omega^2\wedge\omega=\omega^3.
$$

$\beta\wedge\omega$ は実5形式なので、実6次元の $X$ に[一般Stokesの定理](../../GEO/GEO8/index.md#thm-geo8-general-stokes)を適用できる。境界なし・コンパクトだから

$$
\int_X\omega^3=\int_Xd(\beta\wedge\omega)
=\int_{\partial X}\beta\wedge\omega=0.
$$

一方 $\omega^3/3!$ は複素向きで正の体積形式だから積分は正となり矛盾する。よって $[\omega]^2\ne0$。
<!-- solution-end -->

<a id="ex-kah1-13-b02"></a>
#### KAH1-13-B02 開性を数値の不等式にする
- Level: B

$T=\mathbb C/(\mathbb Z+i\mathbb Z)$ で $\omega_0=i\,dz\wedge d\bar z$、$\eta=i(1+\cos2\pi x)\,dz\wedge d\bar z$ と置く。$\omega_t=\omega_0+t\eta$ の正値性が成り立つ $t\in\mathbb R$ の範囲を厳密に求めよ。$t=0$ が開区間の内部にあることを確かめよ。

<!-- solution-start -->
**詳細解答。** $\eta$ は実 $(1,1)$ 型で、複素一次元だから閉じており、周期的なので商に降りる。係数を計算すると

$$
\omega_t=i\{1+t(1+\cos2\pi x)\}\,dz\wedge d\bar z.
$$

$1+\cos2\pi x$ の値域は $[0,2]$。$t\ge0$ では係数の最小値は $1$。$t<0$ では最小値は $1+2t$ なので、正値の必要十分条件は $t>-1/2$。したがって集合 $(-1/2,\infty)$ は実数直線で開き、$0$ を含む。なお $\int_T\eta=2$ であり、$t$ を変えると一般に類も変化する。この点がA04の完全形式による変形との違いである。
<!-- solution-end -->

<a id="ex-kah1-13-b03"></a>
#### KAH1-13-B03 積多様体の正値性と体積
- Level: B

$X=\mathbb{CP}^1\times T$、$T=\mathbb C/(\mathbb Z+i\mathbb Z)$ とし、$\alpha=\pi_1^*\omega_{\mathrm{FS}}$、$\beta=\pi_2^*(i\,dz\wedge d\bar z)$ と置く。実数 $a,b$ に対する $\omega_{a,b}=a\alpha+b\beta$ がKähler形式となる必要十分条件を求め、正値の場合 $\int_X\omega_{a,b}^2$ を計算せよ。

<!-- solution-start -->
**詳細解答。** 各形式は実閉 $(1,1)$ 型である。接空間は二因子の直和なので、$v=(v_1,v_2)$ に対して

$$
-i\omega_{a,b}(v,\bar v)
=a\{-i\omega_{\mathrm{FS}}(v_1,\bar v_1)\}
+b\{-i\omega_0(v_2,\bar v_2)\}.
$$

$v_2=0$ と $v_1=0$ を別々に選ぶと $a>0,b>0$ が必要。両方正なら任意の非零 $v$ に対して和は正で十分である。また複素一次元の因子から引き戻した2形式は自分自身との外積が零、すなわち $\alpha^2=\beta^2=0$。2形式の外積は可換なので

$$
\omega_{a,b}^2=a^2\alpha^2+2ab\,\alpha\wedge\beta+b^2\beta^2
=2ab\,\alpha\wedge\beta.
$$

[射影直線の面積](../KAH1-07/index.md#thm-kah1-07-area)と[A02のトーラス積分](#ex-kah1-13-a02)を使えば

$$
\int_X\omega_{a,b}^2
=2ab\left(\int_{\mathbb{CP}^1}\omega_{\mathrm{FS}}\right)
\left(\int_T\omega_0\right)
=2ab(2\pi)(2)=8\pi ab.
$$

これが正となるのは $ab>0$ の場合だが、**体積積分が正という必要条件だけでは正値性は判定できない**。$a,b<0$ でも積分は正だが、各複素方向で負となりKähler形式ではない。
<!-- solution-end -->

### Level C

<a id="ex-kah1-13-c01"></a>
#### KAH1-13-C01 積空間で代表の変更と大域障害を同時に調べる
- Level: C

$X=\mathbb{CP}^1\times T$、$T=\mathbb C/(\mathbb Z+i\mathbb Z)$ とし、$\alpha,\beta$ はB03と同じ形式とする。$T$ の実座標 $z=x+iy$ に対し、実数 $a,b,\varepsilon$ で

$$
\Omega_{a,b,\varepsilon}
=a\alpha+b\beta
+i\partial\bar\partial\bigl(\varepsilon\cos(2\pi x)\circ\pi_2\bigr)
$$

を考える。

1. $\Omega_{a,b,\varepsilon}$ がKähler形式であるための必要十分条件を求めよ。
2. Kähler形式になる場合、$[\Omega_{a,b,\varepsilon}]$ と $\int_X\Omega_{a,b,\varepsilon}^2$ を計算せよ。
3. この形式を $X$ 全体の一つの実関数 $\Phi$ で $i\partial\bar\partial\Phi$ と書けるか。コンパクト性を使って論証せよ。
4. $ab>0$ という積分の正値条件だけではKähler性を導けない具体的な組を挙げよ。

<!-- solution-start -->
**詳細解答。** 第1問。$\varphi_T=\varepsilon\cos2\pi x$ なら、[Wirtinger微分](../../CM/CM2-02/index.md#def-cm2-02-wirtinger-operators)と[A04の計算](#ex-kah1-13-a04)から

$$
i\partial\bar\partial(\varphi_T\circ\pi_2)
=-\pi^2\varepsilon\cos(2\pi x)\,\beta.
$$

従って

$$
\Omega_{a,b,\varepsilon}
=a\alpha+\{b-\pi^2\varepsilon\cos(2\pi x)\}\beta.
$$

実性・$(1,1)$ 型・閉性は各項に共通している。積接空間の第1因子方向のみのベクトルで測れば $a>0$ が必要であり、第2因子方向のみで測れば全点で $b-\pi^2\varepsilon\cos2\pi x>0$ が必要である。余弦の値域が $[-1,1]$ なので後者は $b>\pi^2|\varepsilon|$ と同値。二つの係数が正なら、一般の $(v_1,v_2)\ne0$ に対して正の項の和となる。ゆえに必要十分条件は

$$
\boxed{a>0,\qquad b>\pi^2|\varepsilon|.}
$$

第2問。$\varphi_T\circ\pi_2$ は大域的な実関数なので、[大域ポテンシャルによる類の不変性](#prop-kah1-13-global-potential-exact)によって

$$
[\Omega_{a,b,\varepsilon}]=a[\alpha]+b[\beta].
$$

なお非正値のときもこのde Rham類の等号だけは成立する。$X$ はコンパクトで閉形式を積分するので、完全形式との交差項はStokesで消える。直接式を使っても

$$
\begin{aligned}
\Omega_{a,b,\varepsilon}^2
&=2a\{b-\pi^2\varepsilon\cos2\pi x\}\alpha\wedge\beta,\\
\int_X\Omega_{a,b,\varepsilon}^2
&=2a\left(\int_{\mathbb{CP}^1}\omega_{\mathrm{FS}}\right)
\left(2\int_0^1\!\int_0^1(b-\pi^2\varepsilon\cos2\pi x)\,dx\,dy\right)\\
&=2a(2\pi)(2b)=8\pi ab.
\end{aligned}
$$

ここでは $\int_0^1\cos2\pi x\,dx=0$ を使った。体積積分は $\varepsilon$ に依存しない。

第3問。第1問の条件下で $X$ は複素次元2の空でないコンパクトKähler多様体であり、$\int_X\Omega^2=8\pi ab>0$。もし $\Omega=i\partial\bar\partial\Phi$ なら、実1形式 $\alpha_\Phi=(i/2)(\bar\partial\Phi-\partial\Phi)$ により $\Omega=d\alpha_\Phi$。閉性を使って $\Omega^2=d(\alpha_\Phi\wedge\Omega)$ となり、[一般Stokesの定理](../../GEO/GEO8/index.md#thm-geo8-general-stokes)が積分を零にする。正の値と矛盾するので、大域単一ポテンシャルはない。

第4問。$\varepsilon=0$、$a=b=-1$ とすると $ab=1>0$ で $\int_X\Omega^2=8\pi>0$ だが、$\Omega=-\alpha-\beta$ は任意の非零接ベクトルで $-i\Omega(v,\bar v)<0$ となる。したがってKähler形式ではない。積分の符号と正値Hermite計量の条件は同じではない。
<!-- solution-end -->

## 8. 次章へ

局所ポテンシャルは点の近くの構成であり、Kähler類は大域の正値代表の**存在**を記録する。コンパクト性の下でこの類は消えず、正値性は類の正の結合と小さな実閉 $(1,1)$ 摂動に対して安定する。ただし「実閉 $(1,1)$ 形式で代表できる」と「整数係数の類である」は別条件である。次章では[第一Chern類の整数と実の区別](../KAH1-12/index.md#def-kah1-12-integral-first-chern)を踏まえ、射影的な幾何で整数Kähler類が果たす役割へ進む。
