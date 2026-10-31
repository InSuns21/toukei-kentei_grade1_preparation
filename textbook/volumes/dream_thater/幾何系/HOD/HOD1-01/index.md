# HOD1-01 実Hodge理論から複素形式の随伴へ

<!-- definition-example-audit: strict -->

## 1. 実形式の直交分解を複素型ごとに読み直す

[実Hodge理論](../../GA/GA6/index.md#thm-ga6-hodge-decomposition)は、向き付けられたコンパクト境界なしRiemann多様体の微分形式を調和・完全・余完全の成分に分ける。一方、[複素形式の型分解](../../CM/CM2-01/index.md#thm-cm2-01-type-decomposition)では、複素多様体の $k$ 形式を $(p,q)$ 型（$p+q=k$）へ分け、[型別外微分](../../CM/CM2-02/index.md#def-cm2-02-dolbeault-operators) $d=\partial+\bar\partial$ を得た。

ここで問題になるのは、**微分形式が型ごとに分かれることと、Laplacianの調和形式が型ごとに分かれることは別**だという点である。後者を調べるため、まず複素形式の内積を確定し、$\partial,\bar\partial$ を内積の反対側へ移す演算を作る。

以下、$X$ は複素次元 $n\ge1$ の滑らかな複素多様体で、[Hermite計量](../../CM/CM2-09/index.md#def-cm2-09-hermitian-metric)と対応する実Riemann計量 $g_{\mathbb R}$ を持つ。実次元は $m=2n$、向きは複素構造の定める向きとする。$\Omega^{p,q}(X)$ は滑らかな複素値 $(p,q)$ 形式、$\Omega_c^{p,q}(X)$ はコンパクト台を持つものとする。次数が負または $n$ より大きい型の形式空間は $0$ と約束する。この節から第4節までは **Kähler条件 $d\omega=0$ を仮定しない**。

[Hodge星作用素](../../GA/GA6/index.md#def-ga6-hodge-star) $*$ は実形式から複素係数へ **複素線形**に拡張する。つまり $*(i\alpha)=i*\alpha$ である。複素共役を伴う反線形な演算と混同しない。

<a id="def-hod1-01-complex-inner-product"></a>

<!-- formal-statement-start -->
> **定義（複素形式のHermite内積）**
> 向き付けられた実次元 $2n$ のHermite多様体 $(X,g_{\mathbb R})$ で、実正規直交余標構 $e^1,\ldots,e^{2n}$ と昇順多重添字 $I$ により、複素 $k$ 形式を $\alpha=\sum_I a_Ie^I$、$\beta=\sum_I b_Ie^I$ と書く。点ごとの内積を

$$
\langle\alpha,\beta\rangle_{\mathbb C}=\sum_I\overline{a_I}\,b_I
$$

> と定義する。両形式がコンパクト台を持つ場合、または $X$ がコンパクトな場合、$L^2$ 内積を次で定義する。

$$
(\alpha,\beta)_2=\int_X\langle\alpha,\beta\rangle_{\mathbb C}\,dV_g
=\int_X\overline\alpha\wedge *\beta.
$$

> どちらも **第1変数が共役線形、第2変数が複素線形**である。異なる次数の形式の内積は $0$ と定める。
<!-- formal-statement-end -->

基底を変えても内積が不変なのは、実正規直交変換が外積に誘導する変換も直交的だからである。等式右端については、[実Hodge星の定義](../../GA/GA6/index.md#def-ga6-hodge-star)を基底の組ごとに複素係数へ延長すると

$$
\overline\alpha\wedge*\beta
=\sum_{I,J}\overline{a_I}b_J\,e^I\wedge*e^J
=\sum_I\overline{a_I}b_I\,dV_g
$$

となる。最初の形式だけに共役を付ける順序が重要である。$\alpha\wedge*\overline\beta$ を用いる流儀は第1変数線形の内積に対応する。

<!-- definition-example-start: def-hod1-01-complex-inner-product -->
**定義の確認**。$\mathbb C$ に $z=x+iy$、実計量 $dx^2+dy^2$ と向き $dx\wedge dy$ を入れる。実正規直交余標構 $(dx,dy)$ から $dz=dx+i,dy$、$d\bar z=dx-i,dy$ なので

$$
\begin{aligned}
\langle dz,dz\rangle_{\mathbb C}&=1+\overline i\,i=2,\\
\langle dz,d\bar z\rangle_{\mathbb C}&=1+\overline i(-i)=0,\\
\langle d\bar z,d\bar z\rangle_{\mathbb C}&=2.
\end{aligned}
$$

零でない $a,b\in\mathbb C$ に対し $\langle a\,dz,a\,dz\rangle=2|a|^2>0$、$\langle a\,dz,b\,d\bar z\rangle=0$。正値性と型の直交性が同時に直接確認できた。ここでの計量は [Kähler基本形式の座標規約](../../KAH/KAH1-02/index.md#prop-kah1-02-matrix-criterion) により $\omega=\frac i2 dz\wedge d\bar z$ であり、$i\,dz\wedge d\bar z$ ではない。
<!-- definition-example-end -->

<a id="prop-hod1-01-type-orthogonality"></a>

<!-- formal-statement-start -->
> **命題（Hermite計量による複素型の直交性）**
> 複素次元 $n$ のHermite多様体 $X$ 上で、$(p,q)\ne(r,s)$ なら、任意の $\alpha\in\Omega^{p,q}(X)$、$\beta\in\Omega^{r,s}(X)$ は点ごとに直交する。したがって $p+q=k$ の型への射影 $P_{p,q}:\Omega^k(X;\mathbb C)\to\Omega^{p,q}(X)$ は点ごとの直交射影であり、コンパクト台の内積についても直交する。
<!-- formal-statement-end -->

### 証明の見取り図

実計量と両立する複素構造の下で、各実正規直交対 $(e^j,Je^j)$ に相当する $(1,0)$ と $(0,1)$ の余標構を作り、その内積を上の一次元例へ還元する。

<!-- proof-start -->
### 証明

点 $x$ で $g_{\mathbb R}$ に関する $J$ 適合正規直交基底 $(u_1,Ju_1,\ldots,u_n,Ju_n)$ をとる。双対な実余標構を $(e^1,f^1,\ldots,e^n,f^n)$ とし、$(1,0)$ 余標構 $\theta^j=(e^j+i f^j)/\sqrt2$ と、その共役 $\overline{\theta^j}$ を使う。[型別余接空間の直和](../../CM/CM2-01/index.md#prop-cm2-01-cotangent-splitting)により、これらは複素化余接空間の基底である。

一次元での計算を各 $j$ に適用すると、$\theta^j$ と $\overline{\theta^\ell}$ は相互直交し、$\langle\theta^j,\theta^\ell\rangle=\langle\overline{\theta^j},\overline{\theta^\ell}\rangle=\delta_{j\ell}$ である。これらの外積の昇順基底は誘導内積でも正規直交なので、$\theta^{I}\wedge\overline{\theta^{J}}$ と $\theta^{K}\wedge\overline{\theta^{L}}$ が内積で非零になるのは $I=K,J=L$ の場合だけである。異なる $(p,q)$ 型では添字の個数が違い、その場合は起こらない。点ごとの結論を積分すれば $L^2$ でも直交する。$\square$
<!-- proof-end -->

## 2. $\partial$ と $\bar\partial$ を内積の反対側へ移す

[Dolbeault作用素](../../CM/CM2-02/index.md#def-cm2-02-dolbeault-operators)は $\partial:\Omega^{p,q}\to\Omega^{p+1,q}$ と $\bar\partial:\Omega^{p,q}\to\Omega^{p,q+1}$ である。実Hodge理論の[余微分と随伴関係](../../GA/GA6/index.md#prop-ga6-adjoint)を型ごとに取り出すと、各作用素の次数を戻す演算が得られる。最初に滑らかなコンパクト台形式で部分積分を確定する。

<a id="def-hod1-01-dolbeault-adjoints"></a>

<!-- formal-statement-start -->
> **定義（型別外微分の形式的随伴）**
> 複素次元 $n$ のHermite多様体 $X$ 上のコンパクト台を持つ滑らかな形式について、$\partial$ の形式的随伴 $\partial^*:\Omega_c^{p+1,q}(X)\to\Omega_c^{p,q}(X)$ と、$\bar\partial$ の形式的随伴 $\bar\partial^*:\Omega_c^{p,q+1}(X)\to\Omega_c^{p,q}(X)$ は次の等式で特徴付けられる微分作用素とする。

$$
\begin{aligned}
(\partial u,v)_2&=(u,\partial^*v)_2,\\
(\bar\partial u,w)_2&=(u,\bar\partial^*w)_2.
\end{aligned}
$$

> ここで $u\in\Omega_c^{p,q}$、$v\in\Omega_c^{p+1,q}$、$w\in\Omega_c^{p,q+1}$ は任意である。$p<0$ または $q<0$ となる型への随伴は零とする。
<!-- formal-statement-end -->

定義の二つの等式を一方の変数だけ固定して見れば、$\partial^*$ は $p$ を1つ下げ、$\bar\partial^*$ は $q$ を1つ下げるはずである。**この型は記号から推測した約束ではなく、型の直交性により強制される。**

<a id="prop-hod1-01-adjoint-projections"></a>

<!-- formal-statement-start -->
> **命題（実余微分の型別射影）**
> 複素次元 $n$ のHermite多様体 $X$ で、実Hodge星から複素線形に延長した余微分を $d^*$ と書く。コンパクト台を持つ滑らかな $(p,q)$ 形式 $\eta$ に対し、次が成立する。

$$
\begin{aligned}
\partial^*\eta&=P_{p-1,q}(d^*\eta),\\
\bar\partial^*\eta&=P_{p,q-1}(d^*\eta),\\
d^*\eta&=\partial^*\eta+\bar\partial^*\eta.
\end{aligned}
$$

> とくに $\partial^*,\bar\partial^*$ は形式的随伴として存在し、型を指定すると一意である。
<!-- formal-statement-end -->

### 証明の見取り図

$d=\partial+\bar\partial$ の分解を使う前に、出力の $(p-1,q)$ 型と $(p,q-1)$ 型が、他の型と直交することを確認する。$d^*$ の随伴式にそれぞれの型の試験形式を代入する。

<!-- proof-start -->
### 証明

$\eta\in\Omega_c^{p,q}$ に対して $d^*\eta$ は次数 $p+q-1$ の形式であり、[余微分の局所式](../../GA/GA6/index.md#def-ga6-codifferential)から滑らかなコンパクト台形式になる。まず $u\in\Omega_c^{p-1,q}$ とする。[型別外微分の分解](../../CM/CM2-02/index.md#def-cm2-02-dolbeault-operators)により $du=\partial u+\bar\partial u$、後者は $(p-1,q+1)$ 型なので、[型の直交性](#prop-hod1-01-type-orthogonality)から

$$
\begin{aligned}
(\partial u,\eta)_2
&=(du,\eta)_2=(u,d^*\eta)_2\\
&=(u,P_{p-1,q}d^*\eta)_2.
\end{aligned}
$$

同様に $u\in\Omega_c^{p,q-1}$ に対しては $\partial u$ が $(p+1,q-1)$ 型で直交するため

$$
(\bar\partial u,\eta)_2=(u,P_{p,q-1}d^*\eta)_2.
$$

これで最初の二式と形式的随伴の存在が示された。一意性は $(u,v)_2=0$ がすべての同じ型のコンパクト台 $u$ について成り立つなら $v=0$ となることから従う。

最後に型 $(r,s)$ が $(p-1,q),(p,q-1)$ のいずれでもない場合、$u\in\Omega_c^{r,s}$ をとると $du$ のどの型成分も $(p,q)$ にならない。よって $(u,d^*\eta)_2=(du,\eta)_2=0$。型直交性と試験形式の非退化性から $d^*\eta$ のその型成分は零となり、二式の和が $d^*\eta$ である。$\square$
<!-- proof-end -->

<!-- definition-example-start: def-hod1-01-dolbeault-adjoints -->
**定義の確認**。平坦な $\mathbb C$ 上で $u$ をコンパクト台の滑らかな関数、$a$ をコンパクト台の滑らかな複素関数とする。$\partial u=(\partial_z u)dz$、$\langle dz,dz\rangle=2$ を使うと

$$
\begin{aligned}
(\partial u,a,dz)_2
&=2\int_{\mathbb C}\overline{\partial_z u}\,a\,dx\,dy\\
&=2\int_{\mathbb C}(\partial_{\bar z}\bar u)a\,dx\,dy\\
&=-2\int_{\mathbb C}\bar u(\partial_{\bar z}a)\,dx\,dy.
\end{aligned}
$$

境界項が零なのは二つの関数がコンパクト台を持つからである。従ってこの計量で $\partial^*(a,dz)=-2\partial_{\bar z}a$ が得られる。同じ計算で $\bar\partial^*(b,d\bar z)=-2\partial_z b$。**偏微分の添字が複素共役側へ移ること、係数が2となること**を定義そのものから確認できた。
<!-- definition-example-end -->

## 3. Hodge星による公式と作用素の定義域

前節では射影によって随伴を構成した。具体的な局所計算では、[Hodge星の二乗公式](../../GA/GA6/index.md#def-ga6-hodge-star)と、実次元 $m=2n$ で $d^*=-*d*$ となる式も便利である。星作用素が複素形式の型をどう入れ替えるかを先に調べる。

<a id="prop-hod1-01-star-formulas"></a>

<!-- formal-statement-start -->
> **命題（複素Hodge星の型と型別随伴の公式）**
> 複素次元 $n$ のHermite多様体 $(X,g_{\mathbb R})$ に複素線形に延長した実Hodge星を用いる。すべての $0\le p,q\le n$ について

$$
*:\Omega^{p,q}(X)\longrightarrow\Omega^{n-q,n-p}(X)
$$

> が成立する。滑らかなコンパクト台形式上の形式的随伴は次で表される。

$$
\partial^*=-*\bar\partial*,\qquad
\bar\partial^*=-*\partial*.
$$
<!-- formal-statement-end -->

### 証明の見取り図

点ごとの直交分解の下で、星はある外積基底をその直交補の外積へ移す。$(1,0)$ が何個、$(0,1)$ が何個あるかを補集合で数える。$d^*=-*d*$ を二つの型へ射影すれば公式が出る。

<!-- proof-start -->
### 証明

点 $x$ で前節の正規直交複素余標構 $\theta^j,\overline{\theta^j}$ をとる。星は、実正規直交基底の $k$ 次外積の各項を向き付き直交補 $(2n-k)$ 次外積へ写す。型の直交性により $\gamma\in\Lambda^{p,q}$ と $\beta\in\Lambda^{r,s}$ が異なる型なら $\bar\beta\wedge*\gamma=0$ である。一方 $\bar\beta$ は $(s,r)$ 型で、これを $*\gamma$ の $(a,b)$ 型成分と外積して最上次数 $(n,n)$ を得るには $s+a=n$、$r+b=n$ が必要である。$\beta$ の型を $\gamma$ と同じ $(p,q)$ に選んで内積が非退化となる成分を検出すれば $a=n-q,b=n-p$ に限られる。したがって星の型の式が従う。

実次元 $m=2n$ なので、[余微分の星による公式](../../GA/GA6/index.md#def-ga6-codifferential)の符号 $(-1)^{m(k+1)+1}$ は任意の次数 $k$ で $-1$ であり、$d^*=-*d*$。$(p,q)$ 型の $\eta$ に対し $*\eta$ は $(n-q,n-p)$ 型だから

$$
\begin{aligned}
-*\bar\partial(*\eta)&\in\Omega^{p-1,q},\\
-*\partial(*\eta)&\in\Omega^{p,q-1}.
\end{aligned}
$$

$-*d*\eta$ をこの二つに分け、[型別射影の命題](#prop-hod1-01-adjoint-projections)と比較すれば結論を得る。$\square$
<!-- proof-end -->

**一次元の符号検算**。$\mathbb C$ の向き $dx\wedge dy$ では $*dx=dy, *dy=-dx$ なので

$$
*dz=-i\,dz,\qquad *d\bar z=i\,d\bar z,\qquad *^2dz=-dz.
$$

これは上の型の式 $(1,0)\mapsto(1,0)$、$(0,1)\mapsto(0,1)$ と両立する。一般のHermite計量でこの随伴公式は成立するが、**Kähler恒等式や $\Delta_d=2\Delta_{\bar\partial}$ はまだ示していない**。

有限次元や有界な作用素について既習の[Hilbert随伴の定義](../../../解析系/F0/F0-02C3A/index.md#def-f0-02c3a-hilbert-adjoint)では、すべてのベクトルに作用素を適用できた。微分作用素は一般には $L^2$ 全体に作用できないため、内積の等式がどの試験形式で成立するかを指定して随伴を定め直す。

<a id="def-hod1-01-hilbert-domain"></a>

<!-- formal-statement-start -->
> **定義（型別作用素のHilbert随伴）**
> Hermite多様体 $X$ 上の $L^2\Omega^{p,q}(X)$ を、コンパクト台の滑らかな形式を上記内積で完備化して得るHilbert空間とする。$\partial$ の初期定義域を、$L^2$ で稠密な $\Omega_c^{p,q}(X)$ とする。そのHilbert随伴 $\partial^\dagger$ の定義域は、$v\in L^2\Omega^{p+1,q}(X)$ のうち、ある $w\in L^2\Omega^{p,q}(X)$ が存在してすべての $u\in\Omega_c^{p,q}(X)$ に対し

$$
(\partial u,v)_2=(u,w)_2
$$

> が成立するもの全体であり、$\partial^\dagger v=w$ とする。$\bar\partial^\dagger$ も $\bar\partial$ に同様に定義する。
<!-- formal-statement-end -->

ここで $\partial^*$ は **滑らかな形式についての局所微分公式**、$\partial^\dagger$ は **$L^2$ の定義域まで含む作用素** を指す。$v$ が滑らかなコンパクト台形式なら前節の部分積分式により $\partial^\dagger v=\partial^*v$ であり、$w$ の一意性は試験形式が稠密なことから従う。一般の $L^2$ 形式では、分布の意味で微分した結果が $L^2$ に入るかなどの条件が必要である。境界を持つ領域では境界条件も重要になる。形式的随伴の式だけで、任意の $L^2$ 形式へ無制限に作用できると考えてはならない。

<!-- definition-example-start: def-hod1-01-hilbert-domain -->
**定義の確認**。コンパクトな平坦トーラス $T$ で $v=e^{ix}dz$ をとる。$\|v\|_2^2=2(2\pi)^2<\infty$ であり、局所随伴式から $w=\partial^*v=-i e^{ix}$、$\|w\|_2^2=(2\pi)^2<\infty$ である。任意の滑らかな周期関数 $u$ に対して周期境界項が相殺され、$(\partial u,v)_2=(u,w)_2$。定義の「$v,w\in L^2$」「すべての試験形式での等式」を両方確認したので $v\in D(\partial^\dagger)$、$\partial^\dagger v=w$ となる。
<!-- definition-example-end -->

次章以降で使う型別の非負Laplacianも、まず滑らかな形式上で次のように定義する。

<a id="def-hod1-01-type-laplacians"></a>

<!-- formal-statement-start -->
> **定義（型別Laplacian）**
> Hermite多様体 $X$ 上の滑らかな複素形式に対し、形式的随伴を用いて

$$
\begin{aligned}
\Delta_\partial&=\partial\partial^*+\partial^*\partial,\\
\Delta_{\bar\partial}&=\bar\partial\bar\partial^*+\bar\partial^*\bar\partial
\end{aligned}
$$

> と定義する。$\Delta_d=dd^*+d^*d$ は [GA6のHodge Laplacian](../../GA/GA6/index.md#def-ga6-hodge-laplacian) の複素係数への延長とする。
<!-- formal-statement-end -->

<!-- definition-example-start: def-hod1-01-type-laplacians -->
**定義の確認**。平坦複素トーラスで $f=e^{ix}$ とする。関数の次数では $\partial^*f=0$ だから、定義の第一項 $\partial\partial^*f$ は零となる。$\partial f=(i/2)f,dz$ と $\partial^*(a,dz)=-2\partial_{\bar z}a$ より、第二項は $\partial^*\partial f=\frac12 f$。したがって $\Delta_\partial f=\frac12 f$。同様に $\Delta_{\bar\partial}f=\frac12 f$ であり、実作用素 $\Delta_df=f$ と係数が二倍異なる。各項の作用型は $(0,0)$ へ戻り、非負性も $(\Delta_\partial f,f)_2=\frac12\|f\|_2^2>0$ と確認できる。
<!-- definition-example-end -->

コンパクト境界なしの $X$ では部分積分により

$$
(\Delta_\partial\alpha,\alpha)_2
=\|\partial\alpha\|_2^2+\|\partial^*\alpha\|_2^2\ge0
$$

が滑らかな形式について成立する。$\bar\partial$ でも同じである。これは[実Hodgeのエネルギー恒等式](../../GA/GA6/index.md#thm-ga6-energy)と同型の計算であり、**三つのLaplacianが等しいという主張ではない**。この比較にKähler条件がどう効くかは後続で調べる。

## 4. 平坦複素トーラスのFourierモードで符号と係数を確かめる

[複素トーラスの平坦模型](../../KAH/KAH1-05/index.md#prop-kah1-05-torus)の一次元の場合を使う。$T=\mathbb C/(2\pi\mathbb Z+2\pi i\mathbb Z)$ に実計量 $dx^2+dy^2$ を入れると、$x,y$ は周期 $2\pi$ の座標であり、$dz,d\bar z$ は商へ降りる。$\partial_z=\tfrac12(\partial_x-i\partial_y)$、$\partial_{\bar z}=\tfrac12(\partial_x+i\partial_y)$ は [Wirtinger微分](../../CM/CM2-02/index.md#def-cm2-02-wirtinger-operators) である。

<a id="prop-hod1-01-flat-torus-adjoints"></a>

<!-- formal-statement-start -->
> **命題（平坦複素トーラスの随伴と関数の固有値）**
> 周期 $2\pi$ の平坦複素トーラス $T=\mathbb C/(2\pi\mathbb Z+2\pi i\mathbb Z)$ に計量 $dx^2+dy^2$ を入れる。滑らかな周期関数 $a,b$ と、整数 $r,s\in\mathbb Z$ に対する $f_{r,s}(x,y)=e^{i(rx+sy)}$ について、以下が成立する。

$$
\begin{aligned}
\partial^*(a\,dz)&=-2\partial_{\bar z}a,&
\bar\partial^*(b\,d\bar z)&=-2\partial_z b,\\
\Delta_\partial f_{r,s}&=\frac{r^2+s^2}{2}f_{r,s},&
\Delta_{\bar\partial}f_{r,s}&=\frac{r^2+s^2}{2}f_{r,s},\\
\Delta_d f_{r,s}&=(r^2+s^2)f_{r,s}.
\end{aligned}
$$
<!-- formal-statement-end -->

### 証明の見取り図

周期関数の積分では向かい合う境界の寄与が相殺される。随伴の二つの式を部分積分で得た後、$f_{r,s}$ の $x,y$ 微分を代入する。係数2がどこから来たかを明示する。

<!-- proof-start -->
### 証明

$\langle dz,dz\rangle=\langle d\bar z,d\bar z\rangle=2$ であり、[型別随伴の直接例](#def-hod1-01-dolbeault-adjoints)と同じ部分積分が、トーラスの周期積分でも成り立つ。したがって最初の二式が従う。

Fourierモードでは

$$
\partial_z f_{r,s}=\frac{ir+s}{2}f_{r,s},\qquad
\partial_{\bar z} f_{r,s}=\frac{ir-s}{2}f_{r,s}.
$$

関数に対して $\partial^*f=\bar\partial^*f=0$ なので、前節の[型別Laplacianの定義](#def-hod1-01-type-laplacians)から

$$
\begin{aligned}
\Delta_\partial f_{r,s}
&=\partial^*((\partial_zf_{r,s})dz)
=-2\partial_{\bar z}\partial_zf_{r,s}\\
&=-2\frac{(ir-s)(ir+s)}4 f_{r,s}
=\frac{r^2+s^2}{2}f_{r,s}.
\end{aligned}
$$

$\Delta_{\bar\partial}f=-2\partial_z\partial_{\bar z}f$ も同様に一変数ずつ微分して同じ固有値になる。[実Hodgeの0形式上の符号](../../GA/GA6/index.md#thm-ga6-energy)から、$\Delta_df=-(\partial_x^2+\partial_y^2)f$ であり、$\partial_x^2f_{r,s}=-r^2f_{r,s}$、$\partial_y^2f_{r,s}=-s^2f_{r,s}$ を代入して最後の式を得る。$\square$
<!-- proof-end -->

ここで $\Delta_d=2\Delta_\partial=2\Delta_{\bar\partial}$ を**関数の平坦模型上**で確かめた。一般の $(p,q)$ 形式に対する大域的な恒等式の証明ではない。任意のHermite計量で誤用しないよう注意したい。

## 5. 演習：内積・形式的随伴・定義域・固有値を自分でつなぐ

### Level A：型と符号を一つずつ確かめる

<a id="ex-hod1-01-a01"></a>
#### HOD1-01-A01 複素1形式の内積
- Level: A

$\mathbb C$ の実Euclid計量で $\alpha=(1+i)dz+2d\bar z$ とする。$\langle\alpha,\alpha\rangle_{\mathbb C}$ を求め、$(1,0)$ と $(0,1)$ の交差項が消えることを確かめよ。

<!-- solution-start -->
**詳細解答**

[内積の定義](#def-hod1-01-complex-inner-product)と $\langle dz,dz\rangle=\langle d\bar z,d\bar z\rangle=2$、$\langle dz,d\bar z\rangle=0$ から

$$
\langle\alpha,\alpha\rangle
=2|1+i|^2+2|2|^2+0+0=4+8=12.
$$

交差項は $\overline{1+i}\,2\langle dz,d\bar z\rangle$ とその共役の二つであり、それぞれ零。係数を無視して単に $|1+i|^2+4$ としない。
<!-- solution-end -->

<a id="ex-hod1-01-a02"></a>
#### HOD1-01-A02 Hodge星の複素線形拡張
- Level: A

向き $dx\wedge dy$ の平面で $*dz$、$*d\bar z$、$*(*dz)$ を求め、複素線形性を確認せよ。

<!-- solution-start -->
**詳細解答**

[Hodge星作用素](../../GA/GA6/index.md#def-ga6-hodge-star)について $*dx=dy,*dy=-dx$ なので

$$
*dz=dy+i(-dx)=-i(dx+i,dy)=-i,dz,
$$

$$
*d\bar z=dy-i(-dx)=i(dx-i,dy)=i,d\bar z.
$$

複素線形性から $*(*dz)=*(-i\,dz)=(-i)(-i)dz=-dz$。係数 $-i$ を共役して $+i$ に変えない。
<!-- solution-end -->

<a id="ex-hod1-01-a03"></a>
#### HOD1-01-A03 形式的随伴の座標計算
- Level: A

平坦 $\mathbb C$ 上で $a(x,y)=x^2+i y$、$b(x,y)=x+i y^2$ とする。形式的随伴 $\partial^*(a\,dz)$ と $\bar\partial^*(b\,d\bar z)$ を局所式で求めよ。関数が $L^2(\mathbb C)$ に属するとは仮定しない。

<!-- solution-start -->
**詳細解答**

[形式的随伴の局所式](#prop-hod1-01-flat-torus-adjoints)は同じEuclid計量の $\mathbb C$ にも局所的に成り立つ。$\partial_{\bar z}=\tfrac12(\partial_x+i\partial_y)$ より

$$
\partial^*(a\,dz)=-(\partial_x+i\partial_y)(x^2+i y)
=-(2x+i^2)=1-2x.
$$

また

$$
\bar\partial^*(b\,d\bar z)
=-(\partial_x-i\partial_y)(x+i y^2)
=-(1-i\cdot2iy)=-1-2y.
$$

これらは滑らかな係数に対する局所的な**形式的**計算である。非コンパクト $\mathbb C$ 上で多項式係数が $L^2$ に属するとはいえず、Hilbert随伴として計算したわけではない。
<!-- solution-end -->

<a id="ex-hod1-01-a04"></a>
#### HOD1-01-A04 一つのFourierモード
- Level: A

平坦複素トーラスで $f(x,y)=e^{i(x+2y)}$ とする。$\partial f$、$\partial^*\partial f$、$\Delta_df$ を求めよ。

<!-- solution-start -->
**詳細解答**

整数 $r=1,s=2$ なので [Fourierモードの計算](#prop-hod1-01-flat-torus-adjoints) により

$$
\partial f=\frac{i+2}{2}f\,dz,
$$

$$
\partial^*\partial f
=\frac{i+2}{2}(-i+2)f
=\frac{(2+i)(2-i)}2 f=\frac52f.
$$

実Laplacianについては $\Delta_df=(1^2+2^2)f=5f$。$\partial^*\partial$ に係数2を忘れると二つの固有値が一致せず、正しい半分の関係を失う。
<!-- solution-end -->

### Level B：部分積分と型分解の接続

<a id="ex-hod1-01-b01"></a>
#### HOD1-01-B01 随伴関係を積分で照合する
- Level: B

平坦複素トーラスで $u=e^{ix}$、$v=e^{ix}dz$ とする。$A=\int_Tdx\,dy=(2\pi)^2$ として $(\partial u,v)_2$ と $(u,\partial^*v)_2$ を別々に計算せよ。

<!-- solution-start -->
**詳細解答**

$\partial_z u=(i/2)u$、$\partial u=(i/2)u\,dz$。第1変数共役線形なので

$$
(\partial u,v)_2
=\int_T\overline{(i/2)u}\,u\,\langle dz,dz\rangle\,dx\,dy
=(-i/2)\cdot2 A=-iA.
$$

一方、$\partial_{\bar z}u=(i/2)u$ より $\partial^*v=-2\partial_{\bar z}u=-iu$ である。よって

$$
(u,\partial^*v)_2=\int_T\bar u(-iu)\,dx\,dy=-iA.
$$

左右が一致し、共役の付け忘れによる符号反転も検出できる。
<!-- solution-end -->

<a id="ex-hod1-01-b02"></a>
#### HOD1-01-B02 実余微分は型別随伴の和
- Level: B

平坦複素トーラスの実1形式 $\eta=\sin x\,dx+\cos y\,dy$ を $a\,dz+b\,d\bar z$ と書き、$\partial^*(a,dz)+\bar\partial^*(b,d\bar z)$ を求めよ。実形式の余微分との一致も確認せよ。

<!-- solution-start -->
**詳細解答**

$dx=(dz+d\bar z)/2$、$dy=(dz-d\bar z)/(2i)$ から

$$
a=\frac{\sin x-i\cos y}{2},\qquad
b=\frac{\sin x+i\cos y}{2}.
$$

各偏微分は $\partial_xa=\partial_xb=\cos x/2$、$\partial_ya=i\sin y/2$、$\partial_yb=-i\sin y/2$。従って

$$
\partial^*(a,dz)=-(\partial_x+i\partial_y)a
=\frac{-\cos x+\sin y}{2},
$$

$$
\bar\partial^*(b,d\bar z)=-(\partial_x-i\partial_y)b
=\frac{-\cos x+\sin y}{2}.
$$

和は $-\cos x+\sin y$。他方、GA6の[余微分の定義](../../GA/GA6/index.md#def-ga6-codifferential)を平坦座標で展開すると $d^*\eta=-(\partial_x\sin x+\partial_y\cos y)=-\cos x+\sin y$。型別射影を使う[分解公式](#prop-hod1-01-adjoint-projections)と一致した。
<!-- solution-end -->

<a id="ex-hod1-01-b03"></a>
#### HOD1-01-B03 境界のある領域と形式的随伴
- Level: B

正方形 $Q=[0,1]^2\subset\mathbb C$ に平坦計量を入れ、$u=1$、$a=x$ とする。境界条件を課さないまま $\partial^*(a,dz)=-2\partial_{\bar z}a$ を積分の随伴関係に代入した場合、左右がどうなるか求め、差の理由を述べよ。

<!-- solution-start -->
**詳細解答**

$\partial u=0$ だから $(\partial u,a,dz)_{L^2(Q)}=0$。局所公式は $\partial^*(x,dz)=-(\partial_x+i\partial_y)x=-1$ を与えるため

$$
(u,\partial^*(a,dz))_{L^2(Q)}
=\int_Q1\cdot(-1)\,dx\,dy=-1.
$$

両辺は一致しない。実際、部分積分の $x$ 方向から $\int_0^1[x]_0^1\,dy=1$ という境界項が生じ、右辺 $-1$ と相殺して左辺 $0$ となる。[Hilbert随伴の定義域](#def-hod1-01-hilbert-domain)では試験形式をコンパクト台に制限して境界項を消した。境界に達する任意の形式へ同じ随伴式を適用するには、どの境界条件を課すか決める必要がある。
<!-- solution-end -->

<a id="ex-hod1-01-b04"></a>
#### HOD1-01-B04 非負性と零モード
- Level: B

平坦複素トーラスの関数 $f=e^{i(rx+sy)}$（$r,s\in\mathbb Z$）について、$\|\partial f\|_2^2$ と $(\Delta_\partial f,f)_2$ を求めよ。どのモードで零となるか、実Laplacianとの係数の違いも述べよ。

<!-- solution-start -->
**詳細解答**

$\partial f=((ir+s)/2)f,dz$ なので、$|f|=1$、$\langle dz,dz\rangle=2$ と面積 $A=(2\pi)^2$ により

$$
\|\partial f\|_2^2
=2\frac{|ir+s|^2}{4}A
=\frac{r^2+s^2}{2}A.
$$

定義から $\Delta_\partial f=((r^2+s^2)/2)f$ であり、$(\Delta_\partial f,f)_2=((r^2+s^2)/2)A$。零となるのは $r=s=0$、すなわち定数モードだけである。実Hodge Laplacianの固有値は $r^2+s^2$ と二倍だが、**ここで確認したのは関数の平坦模型**である。
<!-- solution-end -->

### Level C：型・随伴・二つの部分を総合する

<a id="ex-hod1-01-c01"></a>
#### HOD1-01-C01 $(1,0)$ Fourier形式の全Hodge Laplacian
- Level: C

平坦複素トーラス $T$ と $r,s\in\mathbb Z$ に対し、$f=e^{i(rx+sy)}$、$\eta=f,dz$ とおく。次の順に実Hodge Laplacianを再構成せよ。(i) $\partial\eta,\bar\partial\eta,\partial^*\eta,\bar\partial^*\eta$ を求める。(ii) $d(d^*\eta)$ と $d^*(d\eta)$ を $(1,0),(0,1)$ 型成分に分けて求める。(iii) 和が $(r^2+s^2)\eta$ になることを確認し、$(0,1)$ 成分が消える理由と一般Hermite多様体への外挿の限界を説明せよ。

<!-- solution-start -->
**詳細解答**

計算を短く追うため $A=(ir+s)/2$、$B=(ir-s)/2$、$C=s-ir$ と置く。このとき $\partial_z f=Af$、$\partial_{\bar z}f=Bf$ である。

(i) $dz$ は閉じており、$dz\wedge dz=0$ なので

$$
\partial\eta=Af,dz\wedge dz=0,
\qquad \bar\partial\eta=Bf,d\bar z\wedge dz=-Bf,dz\wedge d\bar z.
$$

[型別随伴の公式](#prop-hod1-01-flat-torus-adjoints)から

$$
\partial^*\eta=-2Bf=Cf,\qquad \bar\partial^*\eta=0
$$

である。後者は $(1,-1)$ 型の形式空間が零だからである。

(ii) $d^*\eta=Cf$ なので、[Wirtinger微分](../../CM/CM2-02/index.md#def-cm2-02-wirtinger-operators)から

$$
d(d^*\eta)=CAf,dz+CBf,d\bar z.
$$

他方、$dz\wedge d\bar z=-2i,dx\wedge dy$ より

$$
d\eta=-Bf\,dz\wedge d\bar z=2iBf\,dx\wedge dy.
$$

[GA6の2形式の余微分](../../GA/GA6/index.md#def-ga6-codifferential)を用いると、$q=2iBf$ に対して

$$
\begin{aligned}
d^*(d\eta)
&=(\partial_yq)dx-(\partial_xq)dy\\
&=2iB(isf\,dx-irf\,dy)\\
&=-2B(sf\,dx-rf\,dy).
\end{aligned}
$$

$dx=(dz+d\bar z)/2$、$dy=(dz-d\bar z)/(2i)$ を代入すると

$$
d^*(d\eta)=-B(s+ir)f,dz-B(s-ir)f,d\bar z.
$$

(iii) $(0,1)$ 型の係数は $CB-B(s-ir)=0$。$(1,0)$ 型は

$$
CA-B(s+ir)
=\frac{(s-ir)(s+ir)}2-\frac{(ir-s)(s+ir)}2
=s^2+r^2.
$$

したがって $\Delta_d\eta=dd^*\eta+d^*d\eta=(r^2+s^2)\eta$。$(0,1)$ 成分の消去はこの平坦計量での二つの項の厳密な相殺である。一般のHermite計量では計量係数の微分が入り、型保存や三つのLaplacianの比例はここからは結論できない。Kähler恒等式を証明する必要がある。
<!-- solution-end -->

## 6. 次へ：随伴の準備からLefschetz作用へ

本章で確定したのは、複素型の直交性、型別随伴の存在と符号、形式的なLaplacian、そして平坦模型の検算である。次の HOD1-02 ではKähler形式との外積とその随伴を点ごとの線形代数として調べる。続く局所Kähler恒等式を経て、初めて一般のKähler多様体で実・複素Laplacianがどう関係するかを証明する。
