# HOD1-07 Hodge数の対称性と位相的制約

<!-- definition-example-audit: strict -->

## 1. 型ごとの次元から多様体の位相を読む

前章の[コンパクトKähler多様体のHodge分解](../HOD1-06/index.md#thm-hod1-06-hodge-decomposition)によって、複素係数のde Rhamコホモロジーは$(p,q)$型の調和形式から得られる部分空間へ分かれた。それぞれの空間の**次元**を数えれば、複素構造が実多様体の位相に課す制約を数値で表せる。

ただし、形式の複素共役は$(p,q)$型を$(q,p)$型に移すのに対し、[複素線形Hodge星の型の公式](../HOD1-01/index.md#prop-hod1-01-star-formulas)は$(p,q)$型を$(n-q,n-p)$型へ移す。この二つを混同すると対称性の添字を取り違える。まず次元を定義し、次に二つの操作が**調和性も保つ**ことを確認する。

以下、特に断らなければ$X$は複素次元$n\ge1$の滑らか・コンパクト・境界なしのKähler多様体とし、連結性は仮定しない。実次元は$2n$で、複素構造が与える向きを使う。複素形式の$L^2$内積は第一変数が共役線形、Hodge星$*$は実形式から**複素線形**に延長したものとする。$(p,q)$の添字は$0\le p,q\le n$、範囲外の空間の次元は$0$とする。

[型別調和形式](../HOD1-05/index.md#def-hod1-05-harmonic-pq)を$\mathcal H^{p,q}(X)$、[Dolbeault群の調和代表](../HOD1-06/index.md#thm-hod1-06-dolbeault-harmonic)を$H_{\bar\partial}^{p,q}(X)\cong\mathcal H^{p,q}(X)$と書く。[Hodge型部分空間](../HOD1-06/index.md#def-hod1-06-hodge-summand)は$H_{\mathrm{Hdg}}^{p,q}(X)$である。

### 次元を数えるための定義

<a id="def-hod1-07-hodge-numbers"></a>

<!-- formal-statement-start -->
> **定義（Hodge数）**
> 上記のコンパクトKähler多様体$X$について、型$(p,q)$の**Hodge数**を

$$
h^{p,q}(X):=\dim_{\mathbb C}H_{\bar\partial}^{p,q}(X)
=\dim_{\mathbb C}\mathcal H^{p,q}(X)
$$

> と定める。比較に使う次数$0\le k\le2n$の**Betti数**はde Rhamコホモロジーの次元であり、

$$
b_k(X):=\dim_{\mathbb R}H_{\mathrm{dR}}^k(X;\mathbb R)
=\dim_{\mathbb C}H_{\mathrm{dR}}^k(X;\mathbb C)
$$

> である。Betti数の実・複素の二つの次元が等しいのは、実de Rham複体を複素化すると複素de Rham複体になり、閉形式と完全形式の実部・虚部を別々に取れるためである。
<!-- formal-statement-end -->

<!-- definition-example-start: def-hod1-07-hodge-numbers -->
**定義の確認**（平坦な楕円曲線）。$T=\mathbb C/(2\pi\mathbb Z+2\pi i\mathbb Z)$に平坦計量を入れる。[平坦トーラスのFourier計算](../HOD1-01/index.md#prop-hod1-01-flat-torus-adjoints)は、関数の非零Fourierモードに正のLaplacian固有値を与える。形式にもこの判定を使えることを確かめよう。$f_x=\partial f/\partial x$、$f_{xy}=\partial^2f/\partial x\partial y$などと書く。平坦計量の星と余微分の公式から

$$
\begin{aligned}
d(f\,dx)&=-f_y\,dx\wedge dy,&d^*(f\,dx)&=-f_x,\\
d^*d(f\,dx)&=-f_{yy}\,dx+f_{xy}\,dy,&
dd^*(f\,dx)&=-f_{xx}\,dx-f_{xy}\,dy.
\end{aligned}
$$

よって混合微分が打ち消され、$\Delta_d(f\,dx)=-(f_{xx}+f_{yy})\,dx=(\Delta_df)\,dx$となる。$f\,dy$も同じ計算であり、2形式については$d(f\,dx\wedge dy)=0$、$d^*(f\,dx\wedge dy)=f_y\,dx-f_x\,dy$から$\Delta_d(f\,dx\wedge dy)=(\Delta_df)\,dx\wedge dy$を得る。したがって各係数の非零Fourierモードは正の固有値を持ち、調和形式は定数係数形式に限られる。次数ごとにそれらの基底は

$$
\mathcal H^{0,0}=\mathbb C\cdot1,\quad
\mathcal H^{1,0}=\mathbb C\cdot dz,\quad
\mathcal H^{0,1}=\mathbb C\cdot d\bar z,\quad
\mathcal H^{1,1}=\mathbb C\cdot(dz\wedge d\bar z).
$$

従って四つのHodge数はすべて$1$である。二つの一次形式は[実際の閉路積分](../HOD1-06/index.md#def-hod1-06-hodge-summand)でも独立と分かる。よって$b_0=1$、$b_1=2$、$b_2=1$となり、複素・実の次元を混同していない。
<!-- definition-example-end -->

## 2. 複素共役は$(p,q)$と$(q,p)$を結ぶ

複素共役$C\alpha=\overline\alpha$は係数を共役にし、$dz^j$と$d\bar z^j$を入れ替える。ゆえに$C:\Omega^{p,q}\to\Omega^{q,p}$で、$C(a\alpha)=\bar a\,C\alpha$という**反線形**写像である。この段階では微分形式の型しか分からない。調和形式でも使うにはLaplacianとの可換性が必要となる。

<a id="lem-hod1-07-conjugation-harmonic"></a>

<!-- formal-statement-start -->
> **補題（複素共役による調和形式の型交換）**
> 複素次元$n$の滑らか・コンパクト・境界なしのKähler多様体$X$で、任意の$0\le p,q\le n$について、複素共役は反線形同型

$$
C:\mathcal H^{p,q}(X)\longrightarrow\mathcal H^{q,p}(X),
\qquad C\alpha=\overline\alpha
$$

> を与える。逆写像も$C$である。
<!-- formal-statement-end -->

### 証明の見取り図

実計量から作られた$d$、$*$、$d^*$は実形式を実形式へ写す。従って$\Delta_d$も共役と交換する。[Kähler上の調和形式の型保存](../HOD1-05/index.md#thm-hod1-05-harmonic-types)により、型を入れ替えた共役も同じLaplacianの核に入る。

<!-- proof-start -->
### 証明

実係数形式の複素化として$\Omega^k(X;\mathbb C)$を考える。$d$は実線形な微分であるから$d\overline\alpha=\overline{d\alpha}$である。[実Hodge星の定義](../../GA/GA6/index.md#def-ga6-hodge-star)は実計量と向きだけで作られるため$*\overline\alpha=\overline{*\alpha}$となる。実次元$2n$の[余微分公式](../../GA/GA6/index.md#def-ga6-codifferential)は$d^*=-*d*$なので

$$
d^*\overline\alpha
=-*d(*\overline\alpha)
=-*d(\overline{*\alpha})
=\overline{-*d(*\alpha)}
=\overline{d^*\alpha}.
$$

従って$\Delta_d=dd^*+d^*d$について

$$
\Delta_d\overline\alpha
=\overline{dd^*\alpha}+\overline{d^*d\alpha}
=\overline{\Delta_d\alpha}.
$$

$\alpha\in\mathcal H^{p,q}$なら$\Delta_d\alpha=0$であり、上式から$\Delta_d\overline\alpha=0$。複素共役は型$(p,q)$を$(q,p)$へ移すので$\overline\alpha\in\mathcal H^{q,p}$である。$C^2=I$だから単射・全射であり、係数の共役を伴うため反線形である。$\square$
<!-- proof-end -->

<a id="thm-hod1-07-hodge-conjugation"></a>

<!-- formal-statement-start -->
> **定理（Hodge数の共役対称性）**
> 複素次元$n$の滑らか・コンパクト・境界なしのKähler多様体$X$では、全ての$0\le p,q\le n$について

$$
\boxed{h^{p,q}(X)=h^{q,p}(X)}
$$

> が成り立つ。
<!-- formal-statement-end -->

### 証明の見取り図

反線形な同型も複素次元を保つ。元の基底の共役が相手側の基底になることを直接示す。

<!-- proof-start -->
### 証明

$\mathcal H^{p,q}$の複素基底を$\alpha_1,\ldots,\alpha_r$とする。[共役同型](#lem-hod1-07-conjugation-harmonic)で得た$\overline{\alpha_1},\ldots,\overline{\alpha_r}$は$\mathcal H^{q,p}$を張る。実際、任意の$\beta\in\mathcal H^{q,p}$について$\bar\beta=\sum_j a_j\alpha_j$と書けるので$\beta=\sum_j\bar a_j\,\bar\alpha_j$。また$\sum_jc_j\bar\alpha_j=0$の共役を取れば$\sum_j\bar c_j\alpha_j=0$となり、全$c_j=0$である。従って両空間の複素次元は$r$で等しい。$\square$
<!-- proof-end -->

ここで**複素共役はDolbeault複体の$\bar\partial$を$\partial$へ写す**。Kähler条件によるLaplacian一致なしには、一般の複素多様体でこの証明をDolbeault群へそのまま使えない。

## 3. Hodge星が補次数を作る

Hodge星は複素線形であり、[既習の型の公式](../HOD1-01/index.md#prop-hod1-01-star-formulas)から

$$
*:\Omega^{p,q}\longrightarrow\Omega^{n-q,n-p}
$$

となる。一方、星は形式の次数を$k$から$2n-k$へ変える。**調和形式が星の下でも調和である**ことを、符号込みで示す。

<a id="lem-hod1-07-star-harmonic"></a>

<!-- formal-statement-start -->
> **補題（Hodge星とHodge Laplacianの可換性）**
> 向き付けられた滑らかな実$2n$次元Riemann多様体$M$で、複素線形に延長したHodge星$*$と微分作用素$\Delta_d=dd^*+d^*d$は、滑らかな複素$k$形式に対して

$$
\Delta_d(*\alpha)=*(\Delta_d\alpha)
$$

> を満たす。$M$がコンパクト・境界なしなら、星は各次数の調和形式を逆向きの次数へ複素線形同型に写す。
<!-- formal-statement-end -->

### 証明の見取り図

実次元が偶数のとき$*^2=(-1)^k$（$k$形式上）、$d^*=-*d*$である。そこから$d*$と$d^**$を入れ替える二つの式を求め、$\Delta_d*$を展開する。

<!-- proof-start -->
### 証明

[Hodge星の二乗公式](../../GA/GA6/index.md#def-ga6-hodge-star)で、$k(2n-k)\equiv k\pmod{2}$だから$*^2\alpha=(-1)^k\alpha$。実次元$2n$の余微分は[既習公式](../../GA/GA6/index.md#def-ga6-codifferential) $d^*=-*d*$である。$\alpha$を$k$形式として計算すると

$$
d^*(*\alpha)=-*d(*(*\alpha))
=(-1)^{k+1}*d\alpha.
$$

また$d^*\alpha=-*d(*\alpha)$の両辺に星を掛け、$d(*\alpha)$が$(2n-k+1)$形式であることから

$$
*(d^*\alpha)
=-*(*d(*\alpha))
=-(-1)^{2n-k+1}d(*\alpha)
=(-1)^k d(*\alpha).
$$

従って$d(*\alpha)=(-1)^k*(d^*\alpha)$である。最初の式を$\alpha$の次数$k-1$の形式$d^*\alpha$へ適用し、二番目を次数$k+1$の$d\alpha$へ適用すれば

$$
\begin{aligned}
d^*d(*\alpha)
&=(-1)^k d^*(*(d^*\alpha))
=(-1)^k(-1)^k*d(d^*\alpha)=*dd^*\alpha,\\
dd^*(*\alpha)
&=(-1)^{k+1}d(*(d\alpha))
=(-1)^{k+1}(-1)^{k+1}*d^*(d\alpha)=*d^*d\alpha.
\end{aligned}
$$

和を取って可換性を得る。コンパクト境界なしの場合に$\alpha$が調和なら$\Delta_d(*\alpha)=0$であり、$*$は$*^2=(-1)^kI$から可逆なので調和空間の同型となる。$\square$
<!-- proof-end -->

<a id="thm-hod1-07-hodge-duality"></a>

<!-- formal-statement-start -->
> **定理（Hodge数の補次数対称性）**
> 複素次元$n$の滑らか・コンパクト・境界なしのKähler多様体$X$について、Hodge星は複素線形同型

$$
*:\mathcal H^{p,q}(X)\xrightarrow{\ \sim\ }
\mathcal H^{n-q,n-p}(X)
$$

> を与える。また共役と星を合成すると反線形同型

$$
*\circ C:\mathcal H^{p,q}(X)\xrightarrow{\ \sim\ }
\mathcal H^{n-p,n-q}(X)
$$

> を与える。従って

$$
\boxed{h^{p,q}=h^{n-q,n-p}=h^{n-p,n-q}}.
$$
<!-- formal-statement-end -->

### 証明の見取り図

星だけでは$(p,q)\mapsto(n-q,n-p)$。共役を先に取れば$(p,q)\mapsto(q,p)\mapsto(n-p,n-q)$となる。調和性・可逆性は直前の補題と共役補題で確保済みである。

<!-- proof-start -->
### 証明

$\alpha\in\mathcal H^{p,q}$とする。[星の型公式](../HOD1-01/index.md#prop-hod1-01-star-formulas)によれば$*\alpha$は$(n-q,n-p)$型である。[星とLaplacianの可換性](#lem-hod1-07-star-harmonic)を$\alpha$に適用すると

$$
\Delta_d(*\alpha)=*(\Delta_d\alpha)=0.
$$

星の逆は補次数上でも$*$の符号倍だから、調和形式上で最初の複素線形同型を得る。

次に[共役同型](#lem-hod1-07-conjugation-harmonic)により$\bar\alpha$は$(q,p)$型の調和形式となる。従って$*\bar\alpha$は$(n-p,n-q)$型の調和形式である。星は複素線形、共役は反線形で、合成は反線形の全単射になる。各複素次元を比較して三つの等式を得る。$\square$
<!-- proof-end -->

**一次元の符号検算。** 平坦トーラスでは$*dz=-i\,dz$、$*d\bar z=i\,d\bar z$である。$dz$は$(1,0)$のまま星で移り、$*\overline{dz}=i\,d\bar z$は$(0,1)$へ移る。$n=1,p=1,q=0$を代入すると前者は$(n-q,n-p)=(1,0)$、後者は$(n-p,n-q)=(0,1)$で一致する。

## 4. 補次数の対称性を積分でも確かめる

星と共役の合成が作った相手$*\bar\alpha$は、単に次元を等しくするだけではない。元の調和形式と楔積して積分すると、**ノルムの正値性**が現れる。これは後続の交叉形式を学ぶ入口になる。

<a id="def-hod1-07-complementary-pairing"></a>

<!-- formal-statement-start -->
> **定義（相補Hodge型の積分対）**
> $X$を複素次元$n$の滑らか・コンパクト・境界なしのKähler多様体とし、$0\le p,q\le n$とする。調和代表を経由して、相補Hodge型のDolbeault群の元$[\alpha]\in H_{\bar\partial}^{p,q}(X)$、$[\beta]\in H_{\bar\partial}^{n-p,n-q}(X)$に対し

$$
Q_{p,q}([\alpha],[\beta]):=\int_X\alpha_{\mathrm{harm}}\wedge\beta_{\mathrm{harm}}\in\mathbb C
$$

> を定める。ここで$\alpha_{\mathrm{harm}},\beta_{\mathrm{harm}}$は[一意な調和代表](../HOD1-06/index.md#thm-hod1-06-dolbeault-harmonic)である。積分される形式は$(n,n)$型、実次数$2n$である。
<!-- formal-statement-end -->

<!-- definition-example-start: def-hod1-07-complementary-pairing -->
**定義の確認**（楕円曲線）。先ほどの平坦トーラス$T$の二つの調和形式$\alpha=dz$、$\beta=d\bar z$について

$$
dz\wedge d\bar z=-2i\,dx\wedge dy,\qquad
Q_{1,0}([dz],[d\bar z])=-2i(2\pi)^2=-8\pi^2i\ne0.
$$

$\alpha$は$(1,0)$、$\beta$は相補型$(0,1)$であり、楔積の型・次数・積分の値を直接確かめた。さらに$*\bar\alpha=i\,d\bar z$だから

$$
\int_Tdz\wedge(*\bar\alpha)
=i(-8\pi^2i)=8\pi^2
=\int_T|dz|^2\,dV_g>0.
$$
<!-- definition-example-end -->

有限次元複素ベクトル空間$V$の**複素線形双対**を$V^\vee=\operatorname{Hom}_{\mathbb C}(V,\mathbb C)$と書く。積分対の一方の変数を固定して、他方の空間上の複素線形汎関数が得られるかを調べる。

<a id="thm-hod1-07-perfect-pairing"></a>

<!-- formal-statement-start -->
> **定理（相補Hodge型の非退化積分対）**
> 上記のコンパクト境界なしKähler多様体$X$において$Q_{p,q}$は複素双線形であり、左右のどちらにも零でない類を検出する。すなわち

$$
H_{\bar\partial}^{n-p,n-q}(X)
\xrightarrow{\ \sim\ }
\bigl(H_{\bar\partial}^{p,q}(X)\bigr)^{\vee},
\qquad
[\beta]\longmapsto\bigl([\alpha]\mapsto Q_{p,q}([\alpha],[\beta])\bigr)
$$

> は複素線形同型である。右辺は複素線形汎関数の双対空間である。
<!-- formal-statement-end -->

### 証明の見取り図

どちらのDolbeault類も調和代表を一意に持つ。非零調和$\alpha$に対し、相補型調和形式$\beta=*\bar\alpha$を選ぶと、積分は$\|\alpha\|_2^2>0$になる。有限次元性が全単射を保証する。

<!-- proof-start -->
### 証明

[Dolbeaultコホモロジーの調和代表](../HOD1-06/index.md#thm-hod1-06-dolbeault-harmonic)は、各類に一意の代表$\alpha_{\mathrm{harm}},\beta_{\mathrm{harm}}$を対応させる。その対応は複素線形である。楔積と積分も各変数で複素線形なので$Q_{p,q}$は複素双線形である。

$\alpha_{\mathrm{harm}}\ne0$とする。[共役と星の相補型同型](#thm-hod1-07-hodge-duality)より$\beta_{\mathrm{harm}}=*\overline{\alpha_{\mathrm{harm}}}$は$(n-p,n-q)$型の調和形式である。[複素形式の内積](../HOD1-01/index.md#def-hod1-01-complex-inner-product)を第一変数$\overline{\alpha_{\mathrm{harm}}}$、第二変数$\overline{\alpha_{\mathrm{harm}}}$に適用すると、点ごとに

$$
\alpha_{\mathrm{harm}}\wedge(*\overline{\alpha_{\mathrm{harm}}})
=|\alpha_{\mathrm{harm}}|^2dV_g.
$$

したがって

$$
Q_{p,q}([\alpha],[*\overline{\alpha_{\mathrm{harm}}}])
=\int_X|\alpha_{\mathrm{harm}}|^2dV_g
=\|\alpha_{\mathrm{harm}}\|_2^2>0.
$$

これは左側の非退化性である。右側について、非零の$\beta_{\mathrm{harm}}\in\mathcal H^{n-p,n-q}$に対して$\alpha_{\mathrm{harm}}=*\overline{\beta_{\mathrm{harm}}}\in\mathcal H^{p,q}$を選ぶ。$k=p+q$とおくと両形式の次数は$k$と$2n-k$で、楔積の交換符号は$(-1)^{k(2n-k)}=(-1)^k$である。従って

$$
\begin{aligned}
Q_{p,q}([*\overline{\beta_{\mathrm{harm}}}],[\beta])
&=\int_X(*\overline{\beta_{\mathrm{harm}}})\wedge\beta_{\mathrm{harm}}\\
&=(-1)^k\int_X\beta_{\mathrm{harm}}\wedge(*\overline{\beta_{\mathrm{harm}}})\\
&=(-1)^k\|\beta_{\mathrm{harm}}\|_2^2\ne0.
\end{aligned}
$$

よって右側も非退化である。

写像$[\beta]\mapsto Q_{p,q}(-,[\beta])$は右側の非退化性で単射である。二つの空間の複素次元は[補次数対称性](#thm-hod1-07-hodge-duality)により同じ有限値だから全射でもあり、双対空間への同型である。$\square$
<!-- proof-end -->

**代表の選択に関する補足。** この章では調和代表を使って$Q_{p,q}$を定義した。実は、任意の$\bar\partial$閉の純型代表を使っても値は同じである。例えば$\alpha$を$\alpha+\bar\partial\eta$に変えると、$\bar\partial\beta=0$だから

$$
\bar\partial(\eta\wedge\beta)
=(\bar\partial\eta)\wedge\beta+(-1)^{p+q-1}\eta\wedge\bar\partial\beta
=(\bar\partial\eta)\wedge\beta.
$$

$\eta\wedge\beta$は型$(n,n-1)$なので$\partial(\eta\wedge\beta)=0$（型が範囲外）。[Stokesの定理](../../GEO/GEO8/index.md#thm-geo8-general-stokes)でこの差の積分は零となる。$\beta$を変える場合も楔積の符号に注意して同様に従う。従って上の積分対は、[Hodge--de Rham同型](../../GA/GA6/index.md#thm-ga6-hodge-de-rham)によって調和形式をde Rham類と同定し、その楔積を積分する対を複素型別に見たものである。一般のコンパクト複素多様体で成立するSerre双対性の全定理は、ここでのKähler仮定付きの解析的証明とは区別する。

## 5. Betti数の等式と偶数性

Betti数は実多様体の位相で決まるのに、Hodge数は複素構造に依存する。[Hodge分解](../HOD1-06/index.md#thm-hod1-06-hodge-decomposition)と二つの対称性を使うと、位相的な数値がどのような和でなければならないか分かる。

<a id="thm-hod1-07-betti-constraints"></a>

<!-- formal-statement-start -->
> **定理（Betti数に対するKähler制約）**
> $X$を複素次元$n$の滑らか・コンパクト・境界なしのKähler多様体とする。全ての$0\le k\le2n$について

$$
\boxed{b_k=\sum_{\substack{p+q=k\\0\le p,q\le n}}h^{p,q}},
\qquad
\boxed{b_{2n-k}=b_k}.
$$

> 特に、$0\le 2r+1\le2n$を満たす整数$r\ge0$について

$$
\boxed{b_{2r+1}\ \text{は偶数}}
$$

> である。連結な場合には$b_0=b_{2n}=h^{0,0}=h^{n,n}=1$である。
<!-- formal-statement-end -->

### 証明の見取り図

第一式はHodge分解の直和で次元を数える。第二式は$(p,q)\mapsto(n-p,n-q)$で添字集合を全単射に写す。奇数次では$p=q$が不可能なので、共役対称性により和の各項を二つずつ組にできる。最後の端点は調和関数が連結成分ごとに定数であることから従う。

<!-- proof-start -->
### 証明

[Hodge分解の内部直和](../HOD1-06/index.md#thm-hod1-06-hodge-decomposition)と[各Hodge型の次元](#def-hod1-07-hodge-numbers)から

$$
\begin{aligned}
b_k
&=\dim_{\mathbb C}H_{\mathrm{dR}}^k(X;\mathbb C)\\
&=\sum_{p+q=k}\dim_{\mathbb C}H_{\mathrm{Hdg}}^{p,q}(X)
=\sum_{p+q=k}h^{p,q}.
\end{aligned}
$$

次に$p+q=k$なら$(n-p)+(n-q)=2n-k$であり、写像$(p,q)\mapsto(n-p,n-q)$は$0\le p,q\le n$の添字集合を全単射に写す。[補次数対称性](#thm-hod1-07-hodge-duality)を一項ずつ代入すると

$$
b_{2n-k}
=\sum_{a+b=2n-k}h^{a,b}
=\sum_{p+q=k}h^{n-p,n-q}
=\sum_{p+q=k}h^{p,q}
=b_k.
$$

$k=2r+1$が奇数なら$p+q=k$を満たす整数で$p=q$はあり得ない。添字を$(p,q)$と$(q,p)$の二元組に分け、[共役対称性](#thm-hod1-07-hodge-conjugation)を使えば

$$
b_{2r+1}
=\sum_{\substack{p+q=2r+1\\p<q}}\bigl(h^{p,q}+h^{q,p}\bigr)
=2\sum_{\substack{p+q=2r+1\\p<q}}h^{p,q}\in2\mathbb Z.
$$

最後に$X$を連結とする。調和な複素$0$形式$f$は[エネルギー恒等式と調和性の判定](../../GA/GA6/index.md#thm-ga6-energy)から$0=(f,\Delta_df)_2=\|df\|_2^2$を満たす。従って$df=0$、連結性から$f$は定数であり、$h^{0,0}=1$。[星と共役の補次数同型](#thm-hod1-07-hodge-duality)で$h^{n,n}=h^{0,0}=1$、第一式で$b_0=b_{2n}=1$も得られる。連結でない場合は各値が連結成分数となる。$\square$
<!-- proof-end -->

### Euler標数への帰結

Euler標数を各Betti数の交代和$\chi(X)=\sum_{k=0}^{2n}(-1)^kb_k(X)$とすれば、有限和の順序を入れ替えて

$$
\chi(X)=\sum_{p=0}^n\sum_{q=0}^n(-1)^{p+q}h^{p,q}(X).
$$

この式だけからEuler標数の符号は一般には決まらない。奇数次Betti数が偶数という条件と、すべての奇数次Betti数が零という条件も別物である。

## 6. 複素曲面の数字を組み立てる

複素次元$n=2$で連結な場合、$h^{0,0}=h^{2,2}=1$、残りの対称性から、非負整数

$$
a=h^{1,0}=h^{0,1},\quad
b=h^{2,0}=h^{0,2},\quad
c=h^{1,1}
$$

だけでHodge数が決まる。補次数対称性は$h^{1,2}=h^{2,1}=a$も与える。次数別の和は

| 次数 | Hodge型の次元 | Betti数 |
| --- | --- | --- |
| 0 | $h^{0,0}=1$ | $b_0=1$ |
| 1 | $h^{1,0}=h^{0,1}=a$ | $b_1=2a$ |
| 2 | $h^{2,0}=h^{0,2}=b,\ h^{1,1}=c$ | $b_2=2b+c$ |
| 3 | $h^{2,1}=h^{1,2}=a$ | $b_3=2a$ |
| 4 | $h^{2,2}=1$ | $b_4=1$ |

これがHodgeダイヤモンドの数値的骨格であり、個々の$a,b,c$を対称性だけから一意に計算するわけではない。

**非Kählerとの境界。** 一般のコンパクト複素多様体でも$(p,q)$形式とDolbeault群を定義できるが、[KählerのLaplacian一致](../HOD1-05/index.md#thm-hod1-05-laplacian-equality)やde RhamのHodge分解を仮定なしに使えない。Kähler計量が存在すれば奇数次Betti数は必ず偶数になる。しかし奇数次Betti数が偶数だという情報だけで、逆にKähler計量の存在が保証されるわけではない。一方、相補次数のHodge数の等式自体は一般のコンパクト複素多様体にもSerre双対性による拡張がある。ここで証明した星とde Rham調和形式による議論の適用範囲と、定理そのもののより広い成立範囲を混同しない。


## 7. 演習：型・双対性・位相を独力で結ぶ

### Level A：型と次元の基本計算

<a id="ex-hod1-07-a01"></a>
#### HOD1-07-A01 楕円曲線の星と共役
- Level: A

$T=\mathbb C/(2\pi\mathbb Z+2\pi i\mathbb Z)$に実計量$dx^2+dy^2$と向き$dx\wedge dy$を入れる。$\alpha=dz=dx+i\,dy$について、$C\alpha$、$*\alpha$、$*C\alpha$を求め、三者の型を答えよ。

<!-- solution-start -->
### 詳細解答

実Hodge星は[定義と低次元計算](../../GA/GA6/index.md#def-ga6-hodge-star)から$*dx=dy$、$*dy=-dx$であり、複素線形に延長する。よって

$$
\begin{aligned}
C\alpha&=dx-i\,dy=d\bar z&&\in\Omega^{0,1},\\
*\alpha&=dy+i(-dx)=-i(dx+i\,dy)=-i\,dz&&\in\Omega^{1,0},\\
*C\alpha&=dy-i(-dx)=i(dx-i\,dy)=i\,d\bar z&&\in\Omega^{0,1}.
\end{aligned}
$$

$n=1,p=1,q=0$を[星の型公式](../HOD1-01/index.md#prop-hod1-01-star-formulas)に代入すると$(n-q,n-p)=(1,0)$、共役してから星を取ると$(n-p,n-q)=(0,1)$となり、直接計算と一致する。$C$は反線形、$*$は複素線形である。
<!-- solution-end -->

<a id="ex-hod1-07-a02"></a>
#### HOD1-07-A02 反線形同型でも次元は同じ
- Level: A

複素ベクトル空間$V,W$と反線形全単射$C:V\to W$がある。$V$の複素基底$v_1,\ldots,v_r$から$W$の基底を構成し、係数変換を明示せよ。

<!-- solution-start -->
### 詳細解答

候補は$Cv_1,\ldots,Cv_r$である。任意の$w\in W$は全射性から$w=Cv$と書け、$v=\sum_j a_jv_j$と展開すれば

$$
w=C\Bigl(\sum_j a_jv_j\Bigr)
=\sum_j\overline{a_j}\,Cv_j.
$$

従って候補は$W$を張る。$\sum_jc_jCv_j=0$なら、反線形性より

$$
C\Bigl(\sum_j\overline{c_j}v_j\Bigr)=0.
$$

単射性から$\sum_j\overline{c_j}v_j=0$、基底の一次独立性から$c_j=0$。よって$\dim_{\mathbb C}W=r=\dim_{\mathbb C}V$である。反線形を複素線形と誤記せずとも次元は一致する。
<!-- solution-end -->

<a id="ex-hod1-07-a03"></a>
#### HOD1-07-A03 複素三次元の第五Betti数
- Level: A

複素次元$3$の滑らか・コンパクト・境界なしのKähler多様体$X$で、$h^{2,3}=4$とする。$b_5$と$h^{3,2}$を求めよ。

<!-- solution-start -->
### 詳細解答

次数$5$の型は$0\le p,q\le3$かつ$p+q=5$により$(2,3)$と$(3,2)$だけである。[共役対称性](#thm-hod1-07-hodge-conjugation)から$h^{3,2}=h^{2,3}=4$。[Betti数の和](#thm-hod1-07-betti-constraints)を添字集合に適用して

$$
b_5=h^{2,3}+h^{3,2}=4+4=8.
$$

$p=q$の型が存在しないことが偶数性の理由である。
<!-- solution-end -->

<a id="ex-hod1-07-a04"></a>
#### HOD1-07-A04 相補型の積分の符号
- Level: A

A01と同じ$T$で$\alpha=dz$と$\beta=*\bar\alpha$を考える。$\beta$の型を確かめ、$\int_T\alpha\wedge\beta$を計算せよ。基本領域は$0\le x,y<2\pi$である。

<!-- solution-start -->
### 詳細解答

A01の計算で$\beta=i\,d\bar z$であり型は$(0,1)$。楔積の順序を固定して

$$
\begin{aligned}
dz\wedge d\bar z
&=(dx+i\,dy)\wedge(dx-i\,dy)\\
&=-i\,dx\wedge dy+i\,dy\wedge dx
=-2i\,dx\wedge dy.
\end{aligned}
$$

従って

$$
\int_Tdz\wedge(i\,d\bar z)
=i(-2i)\int_0^{2\pi}\int_0^{2\pi}dx\,dy
=2(2\pi)^2=8\pi^2>0.
$$

これは[複素形式の内積](../HOD1-01/index.md#def-hod1-01-complex-inner-product)で$\|dz\|_2^2$に等しい。
<!-- solution-end -->

### Level B：証明のしくみと条件の境界

<a id="ex-hod1-07-b01"></a>
#### HOD1-07-B01 星とLaplacianの符号を追う
- Level: B

実次元$2n$の向き付けられた滑らかなRiemann多様体で、$k$形式$\alpha$に対し$*^2\alpha=(-1)^k\alpha$、$d^*=-*d*$とする。$d^*(*\alpha)$と$d(*\alpha)$を$d\alpha,d^*\alpha$で表し、$\Delta_d(*\alpha)=*(\Delta_d\alpha)$の主要計算を示せ。

<!-- solution-start -->
### 詳細解答

最初の恒等式に星を代入すると

$$
d^*(*\alpha)=-*d(**\alpha)
=-*d((-1)^k\alpha)=(-1)^{k+1}*d\alpha.
$$

一方$d^*\alpha=-*d(*\alpha)$へ星を作用させる。$d(*\alpha)$は$2n-k+1$形式で、星の二乗符号は$(-1)^{2n-k+1}=(-1)^{k+1}$なので

$$
*d^*\alpha=-**d(*\alpha)=(-1)^k d(*\alpha),
\qquad d(*\alpha)=(-1)^k*d^*\alpha.
$$

後者の右辺に$d^*$を作用させると、$d^*\alpha$の次数は$k-1$だから

$$
d^*d(*\alpha)=(-1)^k d^*(*d^*\alpha)
=(-1)^k(-1)^k*d(d^*\alpha)=*dd^*\alpha.
$$

最初の式に$d$を作用させると、$d\alpha$の次数は$k+1$だから

$$
dd^*(*\alpha)=(-1)^{k+1}d(*d\alpha)
=(-1)^{k+1}(-1)^{k+1}*d^*(d\alpha)=*d^*d\alpha.
$$

二式を足して$\Delta_d(*\alpha)=*(dd^*+d^*d)\alpha$となる。ここではKähler条件を用いず、星と外微分の一般公式だけを使った。
<!-- solution-end -->

<a id="ex-hod1-07-b02"></a>
#### HOD1-07-B02 複素曲面の未確定なHodge数
- Level: B

連結な複素次元$2$のコンパクト境界なしKähler多様体$X$で$b_1=6$、$b_2=11$である。$h^{1,0}$と$h^{1,1}$を$h^{2,0}$で表せ。対称性だけから$h^{2,0}$が一意に定まるかも答えよ。

<!-- solution-start -->
### 詳細解答

[共役対称性](#thm-hod1-07-hodge-conjugation)で$h^{1,0}=h^{0,1}=a$、$h^{2,0}=h^{0,2}=b$と置く。次数別の[Betti数の和](#thm-hod1-07-betti-constraints)から

$$
b_1=2a=6,\qquad b_2=2b+h^{1,1}=11.
$$

従って$a=3$で、

$$
h^{1,0}=3,\qquad h^{1,1}=11-2h^{2,0}.
$$

Hodge数は非負整数だから$0\le b\le5$でなければならない。しかしこの連立式だけでは$b$の値を定められず、実際に全ての候補が何らかのKähler曲面で実現するとも主張できない。次元の制約から実例の存在までは導けない。
<!-- solution-end -->

<a id="ex-hod1-07-b03"></a>
#### HOD1-07-B03 奇数の第一Betti数は何を否定するか
- Level: B

コンパクト・境界なし・連結の複素多様体$Y$の第一Betti数が$b_1(Y)=3$と計算されたとする。$Y$にKähler計量は存在し得るか。さらに$b_1(Y)=4$ならKähler計量の存在が従うか。二つの論理を区別せよ。

<!-- solution-start -->
### 詳細解答

仮に$Y$にKähler計量があれば、その計量で[共役対称性とHodge分解](#thm-hod1-07-betti-constraints)を適用でき、$b_1=2h^{1,0}$となる。右辺は偶数なので$3$に等しくならない。従って$b_1=3$はKähler計量の存在を**否定する障害**である。

$b_1=4$の場合は$4=2\cdot2$と書けるので、奇数次Betti数の偶数性とは矛盾しない。しかしこれだけでKähler計量の存在を結論することはできない。ほかの幾何学的障害がないことは示していないからである。どちらの議論も$Y$が単に複素多様体であるというだけでHodge分解を使用するものではない。
<!-- solution-end -->

<a id="ex-hod1-07-b04"></a>
#### HOD1-07-B04 積分対が代表に依存しない理由
- Level: B

$X$を複素次元$n$のコンパクト境界なしKähler多様体、$\alpha$を$\bar\partial$閉の$(p,q)$形式、$\beta$を$\bar\partial$閉の$(n-p,n-q)$形式とする。$\alpha$を$\alpha+\bar\partial\eta$に変えても$\int_X\alpha\wedge\beta$が不変であることを示せ。ただし$q\ge1$、$\eta$は$(p,q-1)$型とする。

<!-- solution-start -->
### 詳細解答

差は$\int_X(\bar\partial\eta)\wedge\beta$である。[型別外微分のLeibniz則](../../CM/CM2-02/index.md#thm-cm2-02-double-complex-identities)で、$\eta$の全次数$p+q-1$を符号に用いると

$$
\bar\partial(\eta\wedge\beta)
=(\bar\partial\eta)\wedge\beta+
(-1)^{p+q-1}\eta\wedge\bar\partial\beta
=(\bar\partial\eta)\wedge\beta.
$$

$\eta\wedge\beta$の型は$(n,n-1)$だから、$\partial(\eta\wedge\beta)$の型$(n+1,n-1)$は零である。従って

$$
d(\eta\wedge\beta)=\partial(\eta\wedge\beta)+\bar\partial(\eta\wedge\beta)
=(\bar\partial\eta)\wedge\beta.
$$

[Stokesの定理](../../GEO/GEO8/index.md#thm-geo8-general-stokes)を実次元$2n$の境界なし$X$に適用すれば$\int_Xd(\eta\wedge\beta)=0$。従って差は零である。$q=0$では変更に使う型$(p,-1)$の形式は零であり、同じ結論は自明に成立する。
<!-- solution-end -->

### Level C：対称性を組み合わせる

<a id="ex-hod1-07-c01"></a>
#### HOD1-07-C01 複素三次元の全Betti数を復元する
- Level: C

連結で滑らか・コンパクト・境界なしの複素三次元Kähler多様体$X$について

$$
h^{1,0}=2,\quad h^{2,0}=1,\quad h^{3,0}=1,\quad
h^{1,1}=3,\quad h^{2,1}=4
$$

とする。Hodge数の共役・補次数対称性だけを使い、$b_0,\ldots,b_6$とEuler標数$\chi(X)$を求めよ。どの与件がどの型へ移るかも明記せよ。

<!-- solution-start -->
### 詳細解答

連結性と[端点の制約](#thm-hod1-07-betti-constraints)から$h^{0,0}=h^{3,3}=1$である。[共役対称性](#thm-hod1-07-hodge-conjugation)で

$$
h^{0,1}=2,\quad h^{0,2}=1,\quad h^{0,3}=1,\quad
h^{1,2}=h^{2,1}=4.
$$

[補次数対称性](#thm-hod1-07-hodge-duality)で$(p,q)\mapsto(3-p,3-q)$を用いると

$$
\begin{aligned}
h^{2,3}=h^{1,0}=2,\quad &h^{3,2}=h^{0,1}=2,\\
h^{1,3}=h^{2,0}=1,\quad &h^{3,1}=h^{0,2}=1,\\
h^{2,2}=h^{1,1}=3,\quad &h^{3,0}=h^{0,3}=1.
\end{aligned}
$$

全次数について[Hodge数を足す公式](#thm-hod1-07-betti-constraints)を実際に適用する。

$$
\begin{aligned}
b_0&=h^{0,0}=1,\\
b_1&=h^{1,0}+h^{0,1}=2+2=4,\\
b_2&=h^{2,0}+h^{1,1}+h^{0,2}=1+3+1=5,\\
b_3&=h^{3,0}+h^{2,1}+h^{1,2}+h^{0,3}=1+4+4+1=10,\\
b_4&=h^{3,1}+h^{2,2}+h^{1,3}=1+3+1=5,\\
b_5&=h^{3,2}+h^{2,3}=2+2=4,\qquad b_6=h^{3,3}=1.
\end{aligned}
$$

$b_{6-k}=b_k$と奇数次の偶数性も直接確認できる。交代和は

$$
\chi(X)=1-4+5-10+5-4+1=-6.
$$

ここで得た数値は与えられたHodge数と対称性が含意する結果であり、この組が実在するKähler三次元多様体に実現されることまで証明したものではない。
<!-- solution-end -->

<a id="ex-hod1-07-c02"></a>
#### HOD1-07-C02 対称性と非退化対を一から再構成する
- Level: C

$X$を複素次元$n$の滑らか・コンパクト・境界なしのKähler多様体とし、以下を既知としてよい。

1. $H_{\mathrm{dR}}^k(X;\mathbb C)=\bigoplus_{p+q=k}H_{\mathrm{Hdg}}^{p,q}(X)$であり、各型の次元は$h^{p,q}$に等しい。
2. $\Delta_d$は実係数の作用素で、$*$と交換する。$*$は複素線形で$*:\Omega^{p,q}\to\Omega^{n-q,n-p}$、また$*^2|_{\Omega^k}=(-1)^kI$である。
3. 各Dolbeault類は唯一の調和代表を持つ。

これらから (i) $h^{p,q}=h^{q,p}=h^{n-p,n-q}$、(ii) 任意の奇数次$b_k$の偶数性、(iii) 相補型の積分対$Q_{p,q}$が非退化であることを、用いた写像の複素線形性・反線形性に言及して導け。

<!-- solution-start -->
### 詳細解答

**(i) 共役と星。** $\Delta_d$が実係数なので$\Delta_d\bar\alpha=\overline{\Delta_d\alpha}$。従って複素共役$C$は調和$(p,q)$形式を調和$(q,p)$形式へ写す。$C^2=I$で**反線形同型**だから、その基底の共役を取って$h^{p,q}=h^{q,p}$を得る。

次に$*$は$\Delta_d$と交換し、$*^2=(-1)^kI$なので可逆な**複素線形**写像である。型を追えば

$$
\mathcal H^{p,q}\xrightarrow{C}\mathcal H^{q,p}
\xrightarrow{*}\mathcal H^{n-p,n-q}.
$$

二つの矢印はそれぞれ反線形、複素線形で、合成は反線形同型となり$h^{p,q}=h^{n-p,n-q}$である。

**(ii) 奇数次。** 与件1の直和で複素次元を数えれば$b_k=\sum_{p+q=k}h^{p,q}$。$k$が奇数のとき$p=q$の解はなく、$(p,q)$と$(q,p)$の二元組を作る。(i)で同じ次元だから

$$
b_k=\sum_{\substack{p+q=k\\p<q}}(h^{p,q}+h^{q,p})
=2\sum_{\substack{p+q=k\\p<q}}h^{p,q},
$$

ゆえに偶数である。

**(iii) 積分対。** 非零の$[\alpha]\in H_{\bar\partial}^{p,q}$に対し、与件3で一意な非零調和代表$\alpha_h$を選ぶ。(i)で$*\bar\alpha_h$は相補$(n-p,n-q)$型の調和形式であり、対応するDolbeault類を$[\beta]$とする。[複素$L^2$内積](../HOD1-01/index.md#def-hod1-01-complex-inner-product)から

$$
Q_{p,q}([\alpha],[\beta])
=\int_X\alpha_h\wedge(*\bar\alpha_h)
=\int_X|\alpha_h|^2dV_g>0.
$$

従って左側非退化。右側も$[\beta]\ne0$の調和代表$\beta_h$から$\alpha_h=*\bar\beta_h$を選ぶ。$k=p+q$とおけば、積分の楔積の順序を入れ替えて

$$
\int_X\alpha_h\wedge\beta_h
=(-1)^{k(2n-k)}\int_X\beta_h\wedge(*\bar\beta_h)
=(-1)^k\|\beta_h\|_2^2\ne0
$$

となる。与件3の調和代表は複素線形に選べ、楔積・積分も双線形なので$Q_{p,q}$は**複素双線形**である。最終的に両空間は有限次元かつ(i)で次元が等しく、$[\beta]\mapsto Q_{p,q}(-,[\beta])$が双対空間への同型になる。$\square$
<!-- solution-end -->

## 8. 何が分かり、次に何を問うか

- Hodge数はDolbeault群（あるいは型別調和形式）の**複素次元**であり、Betti数は実de Rham群の**実次元**である。
- 共役$C$は反線形で$(p,q)\mapsto(q,p)$、星$*$は複素線形で$(p,q)\mapsto(n-q,n-p)$、合成$*C$は反線形で$(p,q)\mapsto(n-p,n-q)$となる。
- コンパクトKähler条件の下では、これらが**調和形式の同型**となり、奇数次Betti数の偶数性や相補型の非退化積分対を導く。

次に、$d$で完全な純型形式がいつ$\partial\bar\partial$で書けるかを調べる。そこでは前章の[型別Green作用素](../HOD1-06/index.md#def-hod1-06-dolbeault-green)とKähler恒等式を別の仕方で組み合わせる。
