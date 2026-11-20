# SYZ1-08 基底の二種類の整数アフィン構造

<!-- definition-example-audit: strict -->

## 1. 作用座標だけでは「もう一方の周期」が見えない

[前講の局所作用・角座標定理](../SYZ1-07/index.md#thm-syz1-07-action-angle)は、滑らかなLagrangeトーラス束の基底に整数周期から作る座標を与えた。しかし特殊Lagrange（SLag）トーラスでは、シンプレクティック形式 $\omega$ 以外に正則体積形式 $\Omega$ も存在する。この二つから同じ変形の速度を測ると、一般には異なる周期が現れる。

例えば二次元トーラスを縦横別々の長さに伸ばすと、$\omega$ の周期は各方向の面積尺度を検出する一方、$\Omega$ の虚部の周期は体積尺度を検出する。両方とも局所座標になるが、「実数係数で変換できる」だけでは整数周期を保ったことにならない。

本講では **滑らかなSLagトーラス束が与えられていると仮定した場合** に、二つの周期を閉1形式として構成し、整数アフィン座標の遷移を証明する。大域SLag束の存在は結論しない。

## 2. 変形速度を二つのコホモロジー類へ送る

$(X,J,g,\omega,\Omega)$ を複素次元 $n\ge 1$ のKähler多様体とし、$\Omega$ は閉じた、零点のない規格化正則 $n$ 形式とする。連結な実 $n$ 次元多様体 $B_0$ の上に、[滑らかなSLagトーラス・ファイブレーション](../SYZ1-07/index.md#def-syz1-07-regular-fibration)

$$
\pi:X_0\longrightarrow B_0,\qquad L_b=\pi^{-1}(b)\cong T^n
$$

が**追加で与えられている**と仮定する。ファイバーはコンパクト、連結、境界なしで、向きを連続的に選び、位相 $\theta$ は考える連結局所近傍上で固定する。記号

$$
\chi=\operatorname{Im}(e^{-i\theta}\Omega)
$$

を用いると $d\omega=d\chi=0$、$\omega|_{L_b}=\chi|_{L_b}=0$ である。$\chi$ は **実 $n$ 形式**であり、$\omega$ は実2形式である。

各 $b\in B_0$ と速度 $v\in T_bB_0$ に対し、局所積表示によって $v$ を $L_b$ に沿う変形ベクトル場 $\widetilde v$ に持ち上げる。[法線変形に対応する形式の定義](../SYZ1-05/index.md#def-syz1-05-variation-forms)と同じ符号で

$$
\alpha_v=-\bigl(\iota_{\widetilde v}\omega\bigr)|_{L_b},
\qquad
\beta_v=\bigl(\iota_{\widetilde v}\chi\bigr)|_{L_b}
$$

と置く。持ち上げを変えても差はファイバー接ベクトルであり、$\omega|_{L_b}=\chi|_{L_b}=0$ なので、$\alpha_v,\beta_v$ は変わらない。

この二つはそれぞれ1形式、$(n-1)$ 形式である。[McLean線形化](../SYZ1-05/index.md#thm-syz1-05-linearization)により $d_{L_b}\alpha_v=0$、$d_{L_b}\beta_v=0$ である。したがって閉形式を完全形式の差まで同一視する de Rham コホモロジー類を取り、

$$
\mathcal A_b(v)=[\alpha_v]\in H^1(L_b;\mathbb R),
\qquad
\mathcal C_b(v)=[\beta_v]\in H^{n-1}(L_b;\mathbb R)
$$

が定まる。ここで $H^k(L;\mathbb R)$ は、閉 $k$ 形式を完全 $k$ 形式で割った実ベクトル空間である（$n=1$ では $H^0$ を用いる）。二つの群を同じ群とみなしてはいない。

[法線場とHodge星の同定](../SYZ1-05/index.md#prop-syz1-05-hodge-identification)から

$$
\beta_v=*_{L_b}\alpha_v
$$

である。これは**実線形の同定**だが、Hodge星が整数係数のコホモロジー格子を保存するとは限らない。

<a id="prop-syz1-08-two-cohomology-isomorphisms"></a>

<!-- formal-statement-start -->
> **命題（二つの変形・コホモロジー同型）**  
> 複素次元 $n\ge1$ の規格化されたKähler多様体 $(X,J,g,\omega,\Omega)$ と、実 $n$ 次元基底 $B_0$ 上に局所的に位相 $\theta$ を固定した連結・コンパクト・境界なしSLagトーラス $L_b\cong T^n$ をファイバーとして持つ滑らかな局所自明束 $\pi:X_0\to B_0$ を取る。$\chi=\operatorname{Im}(e^{-i\theta}\Omega)$ とし、$v\in T_bB_0$ のファイバー沿いの持ち上げを $\widetilde v$ とする。対応

$
\begin{aligned}
\mathcal A_b(v)&=[\alpha_v]\in H^1(L_b;\mathbb R),
&\alpha_v&=-\bigl(\iota_{\widetilde v}\omega\bigr)|_{L_b},\\
\mathcal C_b(v)&=[\beta_v]\in H^{n-1}(L_b;\mathbb R),
&\beta_v&=\bigl(\iota_{\widetilde v}\chi\bigr)|_{L_b}
\end{aligned}
$

> はいずれも実ベクトル空間の線形同型であり、$\mathcal C_b(v)=[*_{L_b}\alpha_v]$ である。
<!-- formal-statement-end -->

### 証明の見取り図

基底の速度はファイバーのSLag変形を与える。[McLeanの無障害性定理](../SYZ1-06/index.md#thm-syz1-06-mclean-unobstructed)で局所変形空間の接空間は調和1形式であり、前講では束からその空間への写像が局所微分同相と示した。Hodge星は調和1形式と調和 $(n-1)$ 形式を可逆に結ぶ。

<!-- proof-start -->
### 証明

[前講のSLag束から変形空間への命題](../SYZ1-07/index.md#prop-syz1-07-moduli-map)によって、$b$ の近傍の束のファイバーをMcLeanの局所変形空間の点とみなす写像の微分は同型である。その微分が $v\mapsto[\alpha_v]$ である。さらにMcLeanの局所変形空間の接空間は [McLeanの無障害性定理](../SYZ1-06/index.md#thm-syz1-06-mclean-unobstructed) により $H^1(L_b;\mathbb R)$ と同型だから、$\mathcal A_b$ は線形同型となる。

一方、規格化されたSLagにおける [Hodge星の同定](../SYZ1-05/index.md#prop-syz1-05-hodge-identification) によって $\beta_v=*\alpha_v$。調和形式に対して $d\alpha_v=d(*\alpha_v)=0$ が成立する。Hodge星の二回適用は1形式に対し $*^2=(-1)^{n-1}$ なので、$\alpha\mapsto *\alpha$ は調和1形式と調和 $(n-1)$ 形式の可逆な線形写像である。コンパクト・境界なしの場合、調和形式が各実コホモロジー類を一意に表す [Hodge–de Rham同型](../../GA/GA6/index.md#thm-ga6-hodge-de-rham) を通じ、$\mathcal C_b$ も同型となる。
<!-- proof-end -->

## 3. 整数アフィン座標に何が必要か

通常の滑らかな実座標は、座標間の遷移写像が滑らかであればよい。アフィン座標はその遷移が定数行列と平行移動に限られる。さらに **整数** アフィンであるためには行列とその逆がともに整数係数でなければならない。

<a id="def-syz1-08-integral-affine"></a>

<!-- formal-statement-start -->
> **定義（整数アフィン構造）**  
> 実 $n$ 次元滑らかな多様体 $B$ の局所座標族 $u_U:U\to\mathbb R^n$ が、各連結な重なり $U\cap V$ 上で

$$
u_V=A_{VU}u_U+c_{VU},
\qquad
A_{VU}\in GL(n,\mathbb Z),\quad c_{VU}\in\mathbb R^n
$$

> を満たすとき、この座標族の定める構造を整数アフィン構造と呼ぶ。$GL(n,\mathbb Z)$ は整数成分を持ち行列式が $+1$ または $-1$ の $n$ 次正方行列の群である。微分の整数格子は

$$
\Lambda_b^*=\bigoplus_{a=1}^n\mathbb Z\,du_U^a|_b
\ \subset T_b^*B
$$

> であり、座標の選び方によらない。
<!-- formal-statement-end -->

<!-- definition-example-start: def-syz1-08-integral-affine -->
### 直接例：座標にはなれても整数アフィンにはなれない

**定義の確認**

$B=(0,\infty)$ 上で $u=b$、$u'=u+3$ とすると $du'=du$ で、遷移行列は $A=(1)\in GL(1,\mathbb Z)$。生成格子はどちらも $\mathbb Z\,db$ となる。一方 $v=2u$ は滑らかな実座標であり、通常のアフィン変換でもあるが、遷移行列 $(2)$ の逆 $(1/2)$ は整数ではない。さらに $\mathbb Z\,dv=2\mathbb Z\,db\ne\mathbb Z\,db$ だから、**同じ整数アフィン構造の座標変更ではない**。
<!-- definition-example-end -->

## 4. 閉路を動かして周期1形式を作る

$T^n$ の整数一次ホモロジー $H_1(T^n;\mathbb Z)$ は、閉じた1次元の整数係数サイクルを境界の差まで同一視した自由アーベル群で、階数は $n$ である。同様に $(n-1)$ 次の $H_{n-1}(T^n;\mathbb Z)$ も階数 $n$ である。$n=1$ のときは $H_0(T^1;\mathbb Z)$ の生成元として点1個を用いる。

十分小さい単連結近傍 $U\subset B_0$ を取り、局所積表示で各ファイバーのサイクルを運ぶ。これにより整数閉路の基底 $\gamma_1,\ldots,\gamma_n$ と整数 $(n-1)$ サイクルの基底 $\delta_1,\ldots,\delta_n$ を滑らかに選ぶ。基底を運ぶ際、整数係数の組合せは連続的に変えられないので、連結な重なりでの基底変更は**定数の整数行列**になる。この平行移動がホモロジーのGauss–Manin平行移動の具体的な姿である。

各 $v\in T_bB_0$ について次の実数を定める。

<a id="def-syz1-08-two-period-covectors"></a>

<!-- formal-statement-start -->
> **定義（シンプレクティック周期と複素周期の余接格子）**  
> 第2節の滑らかな固定位相SLagトーラス束 $\pi:X_0\to B_0$ を取り、$b$ の近傍で整数サイクル $\gamma_a\in H_1(L_b;\mathbb Z)$ および $\delta_a\in H_{n-1}(L_b;\mathbb Z)$ をそれぞれ基底として平行移動する。速度 $v\in T_bB_0$ に対して

$$
p_{\gamma_a}(v)=\int_{\gamma_a}\alpha_v,
\qquad
q_{\delta_a}(v)=\int_{\delta_a}\beta_v
$$

> と定める。これらは $T_b^*B_0$ の元である。その整数係数で張る格子を

$$
\Lambda_{\omega,b}^*
 =\sum_{a=1}^n\mathbb Z\,p_{\gamma_a},
\qquad
\Lambda_{\Omega,b}^*
 =\sum_{a=1}^n\mathbb Z\,q_{\delta_a}
$$

> と呼ぶ。サイクル基底の取り替えは格子を変えない。
<!-- formal-statement-end -->

ここで $p$ の添字は**1次元閉路**、$q$ の添字は**$(n-1)$ 次元閉路**である。$\beta$ を1次元閉路へ積分することは、一般の $n$ では次数が合わない。

<!-- definition-example-start: def-syz1-08-two-period-covectors -->
### 直接例：標準二次元トーラスで次数と符号を確かめる

**定義の確認**

$X=(\mathbb C/(\mathbb Z+i\mathbb Z))^2$ とし、実座標 $x^j,y^j\pmod{\mathbb Z}$ を使って

$
z^j=x^j+i y^j,\qquad
\omega=dx^1\wedge dy^1+dx^2\wedge dy^2,
$

$
\Omega=dz^1\wedge dz^2,\qquad
\pi([x+iy])=[y]
$

と定める。ファイバーを $dx^1\wedge dx^2$ の向きに取ると、$dy^j|_{L_y}=0$ なので $\omega|_{L_y}=0$、$\Omega|_{L_y}=dx^1\wedge dx^2=\operatorname{vol}_{L_y}$。したがって位相0のSLagトーラスである。

法線方向 $V_j=\partial_{y^j}$ に対し

$$
\alpha_{V_1}=dx^1,\quad \alpha_{V_2}=dx^2,\qquad
\beta_{V_1}=dx^2,\quad \beta_{V_2}=-dx^1.
$$

実際、$\chi=dy^1\wedge dx^2+dx^1\wedge dy^2$ と展開して最初の引数へ $V_j$ を代入すればよい。$\gamma_1=[x^1]$、$\gamma_2=[x^2]$、$\delta_1=[x^2]$、$\delta_2=-[x^1]$ をそれぞれ周回数1の向き付き円周とすると

$$
(p_{\gamma_1},p_{\gamma_2})=(dy^1,dy^2),
\qquad
(q_{\delta_1},q_{\delta_2})=(dy^1,dy^2).
$$

両組とも2本が独立で整数基底になる。ここでは格子が一致するが、後の伸縮例では一致しない。
<!-- definition-example-end -->

### なぜ周期が閉じるか

$a$ 番目の閉路を固定したつもりで基底を動かすと、もとの全空間には「閉路が掃いた帯」ができる。帯に閉形式を積分して得られる量を、基底の方向へ微分すると周期1形式になる。

<a id="lem-syz1-08-period-closed"></a>

<!-- formal-statement-start -->
> **補題（閉形式から得る周期1形式の閉性）**  
> $\pi:X_0\to B_0$ を滑らかな局所自明束とし、$\eta$ を閉じた実 $k$ 形式（$1\le k$）とする。各ファイバーへの制限 $\eta|_{L_b}$ が零であると仮定する。局所的に平行移動した閉じた整数 $(k-1)$ サイクル $C_b$ に対し、

$$
r_C(v)=\int_{C_b}\bigl(\iota_{\widetilde v}\eta\bigr)|_{L_b}
$$

> で定める基底上の1形式は、持ち上げおよびサイクル代表元によらず、閉じている。特に上の $p_{\gamma}$ と $q_{\delta}$ は閉1形式である。
<!-- formal-statement-end -->

### 証明の見取り図

任意の二つの基底方向の差を、基底上の小さな閉曲線に沿う帯の積分の差に変える。帯を連ねた境界は閉じた $(k+1)$ 次元の掃引領域の境界であり、$d\eta=0$ とファイバー上の零制限で差は消える。

<!-- proof-start -->
### 証明

基底の小さな座標球 $U$ 上で束を $U\times T^n$ と同一視する。$C\subset T^n$ を固定した向き付きの閉 $(k-1)$ サイクルとし、$F:U\times T^n\to X_0$ を局所自明化とする。$b(s)$ を $U$ 内の滑らかな道とすると、掃いた $k$ 次元鎖を

$$
W(s,z)=F(b(s),z),\qquad (s,z)\in[0,1]\times C
$$

で表す。積分の変数を $s$ から先に取れば

$$
\int_{[0,1]\times C}W^*\eta
=\int_0^1\left\{\int_{C_{b(s)}}
   \iota_{\widetilde{\dot b(s)}}\eta\right\}\,ds
=\int_{b}r_C
$$

となる。右辺が $r_C$ の道積分に等しいことを示した。

道 $b_0,b_1$ を同じ端点を持つ二本の道とする。$U$ は球なので、それらは端点を固定した滑らかな二変数のホモトピー $h:[0,1]^2\to U$ で結ばれる。$[0,1]^2\times C$ 上で[Stokesの定理](../../VC/VC5/index.md#thm-vc5-stokes)を適用すると

$$
\int_{\partial([0,1]^2\times C)}(F\circ(h,\mathrm{id}))^*\eta
=\int_{[0,1]^2\times C}(F\circ(h,\mathrm{id}))^*d\eta=0.
$$

$\partial C=0$ なのでサイクルの側面からの寄与はなく、ホモトピーの両端の「基底の端点にある」面はファイバー内に入り $\eta|_{L_b}=0$ だから寄与しない。残る二つの辺が二本の道の掃引積分である。従って両者の積分は等しく、$r_C$ の道積分は端点だけで定まる。局所ポテンシャル $f_C$ を端点までの積分で定めれば $df_C=r_C$、したがって $dr_C=0$ である。

持ち上げを別のものに替えた差はファイバー接ベクトル $W$ である。$\eta$ のファイバーへの制限は零なので、$W$ と残りの垂直接ベクトルに $\eta$ を評価しても0になる。したがって収縮の制限と、その周期は持ち上げによらない。

サイクルの代表元を $C'=C+\partial D$ に替える。ここで $D$ はファイバー内の $k$ 次元鎖である。$D$ を基底の道 $b(s)$ に沿って動かす写像を $W_D(s,z)=F(b(s),z)$ と定め、[Stokesの定理](../../VC/VC5/index.md#thm-vc5-stokes)を掃引領域に適用する。

$$
\int_{[0,1]\times\partial D}W_D^*\eta
=\int_{D_{b(1)}}\eta-\int_{D_{b(0)}}\eta=0.
$$

両端の $D$ はファイバー内にあり、$\eta$ の制限が零だから最後の等号が成り立つ。従って、代表元の変更による道積分の差は0であり、同じ1形式 $r_C$ を得る。

$\eta=-\omega$ と $k=2$、$\eta=\chi$ と $k=n$ を代入すると、それぞれ $p_\gamma$ と $q_\delta$ について主張が得られる。
<!-- proof-end -->

## 5. 二つの整数アフィン構造を構成する

<a id="thm-syz1-08-two-integral-affine"></a>

<!-- formal-statement-start -->
> **定理（滑らかなSLag束の二重整数アフィン構造）**  
> 規格化された正則体積形式を持つKähler多様体 $(X,J,g,\omega,\Omega)$ と、その中の連結・コンパクト・境界なしの、局所的に位相 $\theta$ を固定したSLagトーラス $T^n$ をファイバーとする滑らかな局所自明束 $\pi:X_0\to B_0$ を仮定する。このとき第4節の二つの余接格子 $\Lambda_\omega^*$ と $\Lambda_\Omega^*$ はそれぞれ局所的に閉1形式の整数基底を持つ。各 $b_0\in B_0$ の十分小さい単連結近傍 $U$ において、実数値の局所座標

$$
u=(u^1,\ldots,u^n),\qquad t=(t^1,\ldots,t^n)
$$

> が存在し、ある整数サイクル基底 $\gamma_a,\delta_a$ について

$$
du^a=p_{\gamma_a},\qquad dt^a=q_{\delta_a}
$$

> が成り立つ。二つの座標族の各々について、重なりでの遷移は $GL(n,\mathbb Z)\ltimes\mathbb R^n$ に属する。ゆえに $B_0$ 上にはシンプレクティック周期からの構造と複素周期からの構造という、二種類の整数アフィン構造が定まる。両構造が一致することは一般には主張しない。
<!-- formal-statement-end -->

### 証明の見取り図

第4節で示した[掃引周期の閉性](#lem-syz1-08-period-closed)から座標関数を積分し、座標として必要なJacobianの可逆性を二つのMcLean同型から得る。閉路基底の交換は整数行列になり、積分すると定数だけが追加される。

<!-- proof-start -->
### 証明

まず第2節の [$\mathcal A_b,\mathcal C_b$ の同型](#prop-syz1-08-two-cohomology-isomorphisms) を使う。基底の実次元が $n$ なので、$H^1(L_b;\mathbb R)$ と $H^{n-1}(L_b;\mathbb R)$ はともに実次元 $n$ である。

ここでサイクルとの積分が各コホモロジー類を判定できる理由を、$L_b\cong T^n=(\mathbb R/\mathbb Z)^n$ の座標 $s^1,\ldots,s^n$ で確かめる。$\widehat{ds^j}$ はその因子を除くことを意味するとし、

$
\sigma_j=ds^j,\qquad
\rho_j=(-1)^{j-1}ds^1\wedge\cdots\wedge
\widehat{ds^j}\wedge\cdots\wedge ds^n
$

と置く。$\gamma_i^0$ を第 $i$ 座標の正向き円周、$\delta_i^0$ を第 $i$ 座標を固定した $(n-1)$ 次元トーラス（$\rho_i$ が正になる向き）とすれば、各座標の周期が1であるため

$
\int_{\gamma_i^0}\sigma_j=\delta_{ij},\qquad
\int_{\delta_i^0}\rho_j=\delta_{ij}
$

となる。$n=1$ では $\rho_1=1$、$\delta_1^0$ は正の点1個と解釈する。これらの閉形式のコホモロジー類は積分行列が単位行列なのでそれぞれ一次独立で、上の次元 $n$ と合わせると各群の基底である。従ってサイクルへの積分は両方の群で非退化であり、任意の整数サイクル基底へ替えても $GL(n,\mathbb Z)$ の可逆な基底変換を合成するだけである。

よって各 $b$ で

$$
v\longmapsto
\left(\int_{\gamma_1}\alpha_v,\ldots,
\int_{\gamma_n}\alpha_v\right)
$$

および

$$
v\longmapsto
\left(\int_{\delta_1}\beta_v,\ldots,
\int_{\delta_n}\beta_v\right)
$$

は $T_bB_0$ から $\mathbb R^n$ への線形同型である。特に $p_{\gamma_a}$ と $q_{\delta_a}$ はそれぞれ $T_b^*B_0$ の実基底で、整数和はどちらも全格子を作る。

[周期閉性の補題](#lem-syz1-08-period-closed)から各 $p_{\gamma_a}$ と $q_{\delta_a}$ は閉じた1形式である。小さな星形近傍に縮め、基点 $b_*$ を取って

$$
u^a(b)=\int_{b_*}^{b}p_{\gamma_a},
\qquad
t^a(b)=\int_{b_*}^{b}q_{\delta_a}
$$

と定める。道によらないことは閉性と単連結性から従う。微分すれば $du^a=p_{\gamma_a}$、$dt^a=q_{\delta_a}$。上で示した実基底性により各Jacobianは可逆なので、[逆関数定理](../../../基礎科目/RA/RA6A/index.md#thm-ra6a-inverse-function)から $u,t$ はともに局所座標である。

重なりが連結な二つの近傍で、別のホモロジー整数基底を選ぶと、整数係数の可逆な基底変更

$$
\gamma'_a=\sum_j A_{aj}\gamma_j,\quad
\delta'_a=\sum_j B_{aj}\delta_j,\qquad
A,B\in GL(n,\mathbb Z)
$$

が成り立つ。係数が点 $b$ に依存して連続的かつ整数値なので、連結な重なりでは定数である。積分の線形性から

$$
du'=A\,du,\qquad dt'=B\,dt.
$$

従って $d(u'-Au)=0$ と $d(t'-Bt)=0$。連結性により

$$
u'=Au+c,\qquad t'=Bt+d
$$

となり、$c,d\in\mathbb R^n$ は定数である。[整数アフィン構造の定義](#def-syz1-08-integral-affine)を両方が満たす。
<!-- proof-end -->

## 6. 第7講の作用座標との関係を確かめる

二種類のうち $\omega$ から作ったものは、前講の周期余接格子と別物ではない。局所的な [作用・角座標](../SYZ1-07/index.md#thm-syz1-07-action-angle) で

$$
\omega=\sum_{a=1}^n dI_a\wedge d\psi_a,\qquad
\psi_a\in\mathbb R/\mathbb Z
$$

と書けるとき、正向きの角周回 $\gamma_a:\psi_a\mapsto\psi_a+1$ を選ぶ。$\partial_{I_j}$ を基底方向に持ち上げると

$$
\alpha_{\partial_{I_j}}
=-\iota_{\partial_{I_j}}\omega|_L
=-d\psi_j.
$$

従って $p_{\gamma_a}(\partial_{I_j})=-\delta_{aj}$、すなわち

$$
p_{\gamma_a}=-dI_a,\qquad u^a=-I_a+\text{定数}.
$$

$-I$ への変換行列は $-\mathrm{Id}\in GL(n,\mathbb Z)$ なので、**シンプレクティック周期の整数アフィン構造は前講の作用座標の構造と同一**である。符号を合わせようとして実数倍を任意に挿入してはならない。

他方、$dt^a$ は $*_{L_b}\alpha_v$ を $(n-1)$ サイクルへ積分した値である。Hodge星は計量に依存するので、一般には $dt^a$ を $dI_a$ の整数係数の和では書けない。この点は、次講で調べるHessian計量への入口となる。

## 7. 長方形の平坦トーラスで二つの格子を比較する

二次元の複素トーラス $X=(\mathbb C/(\mathbb Z+i\mathbb Z))^2$ で、正数 $a_1,a_2>0$ を固定し

$$
g=\sum_{j=1}^2 a_j\bigl((dx^j)^2+(dy^j)^2\bigr),
\quad
\omega=\sum_{j=1}^2a_j\,dx^j\wedge dy^j,
\quad
\Omega=\sqrt{a_1a_2}\,dz^1\wedge dz^2
$$

と置く。$z^j=x^j+i y^j$、$\pi([x+iy])=[y]$、$L_y=\{y=\text{一定}\}$ である。Kähler形式は上記の $g,J$ に対応し、$\omega$ は閉じて非退化である。さらに

$$
\omega|_{L_y}=0,\qquad
\Omega|_{L_y}=\sqrt{a_1a_2}\,dx^1\wedge dx^2
=\operatorname{vol}_{L_y}>0
$$

なので、すべてのファイバーは規格化された位相0のSLagトーラスである。

任意の基底速度 $v=v^1\partial_{y^1}+v^2\partial_{y^2}$ を持ち上げると

$
\alpha_v=a_1v^1dx^1+a_2v^2dx^2,
\quad
\beta_v=\sqrt{a_1a_2}
\bigl(v^1dx^2-v^2dx^1\bigr).
$

後者は $\chi=\sqrt{a_1a_2}(dy^1\wedge dx^2+dx^1\wedge dy^2)$ の縮約から得られる。計量側からも対応を確かめる。$L_y$ 上の正向き正規直交余接基底は $e^j=\sqrt{a_j}\,dx^j$ なので、$*e^1=e^2$、$*e^2=-e^1$ により

$
*dx^1=\sqrt{\frac{a_2}{a_1}}\,dx^2,\qquad
*dx^2=-\sqrt{\frac{a_1}{a_2}}\,dx^1,
$

$
*\alpha_v=\sqrt{a_1a_2}
\bigl(v^1dx^2-v^2dx^1\bigr)=\beta_v.
$

ここで星はファイバーの誘導計量と向きに対するHodge星であり、外側の基底速度 $v^j$ は固定して形式に作用している。

第4節と同じ整数サイクル基底 $\gamma_1=[x^1],\gamma_2=[x^2]$ および $\delta_1=[x^2],\delta_2=-[x^1]$ で積分すれば、

$$
du^1=a_1dy^1,\quad du^2=a_2dy^2,
\qquad
dt^1=\sqrt{a_1a_2}\,dy^1,\quad
dt^2=\sqrt{a_1a_2}\,dy^2.
$$

従って局所座標は

$$
u=(a_1y^1,a_2y^2),\qquad
t=(\sqrt{a_1a_2}\,y^1,\sqrt{a_1a_2}\,y^2).
$$

両Jacobianの行列式はそれぞれ $a_1a_2>0$ で、二種類とも本当に座標である。しかし $(a_1,a_2)=(2,3)$ とすると

$$
\frac{\partial t}{\partial u}
=\begin{pmatrix}\sqrt6/2&0\\0&\sqrt6/3\end{pmatrix}
$$

であり、これは $GL(2,\mathbb Z)$ の行列ではない。二つの余接格子は

$$
\Lambda_\omega^*=\mathbb Z(2dy^1)\oplus\mathbb Z(3dy^2),
\qquad
\Lambda_\Omega^*=\mathbb Z(\sqrt6\,dy^1)\oplus\mathbb Z(\sqrt6\,dy^2).
$$

したがって **同じ滑らかな基底上に二種類の異なる整数アフィン構造がある**。どちらの座標も局所的にはアフィンであることと、相互の変換が整数アフィンであることは違う。

## 8. 演習：サイクルの次数から二重格子の判定まで

### Level A：符号・次数・整数性を確認する

<a id="ex-syz1-08-a01"></a>

#### SYZ1-08-A01 法線変形の二つの形式

- Level: A

位相0の標準 $\mathbb C^2$ の実平面 $L=\{y^1=y^2=0\}$ で、$\omega=\sum_jdx^j\wedge dy^j$、$\Omega=dz^1\wedge dz^2$ とする。$V=3\partial_{y^1}-2\partial_{y^2}$ に対し、$\alpha_V$、$\beta_V$ を定義から求めよ。

<!-- solution-start -->
### 詳細解答

$-\iota_{\partial_{y^j}}(dx^j\wedge dy^j)=dx^j$ より $\alpha_V=3dx^1-2dx^2$。また

$$
\operatorname{Im}\Omega=dy^1\wedge dx^2+dx^1\wedge dy^2
$$

だから $\iota_{\partial_{y^1}}\operatorname{Im}\Omega=dx^2$、$\iota_{\partial_{y^2}}\operatorname{Im}\Omega=-dx^1$。従って $\beta_V=3dx^2+2dx^1$。この場合はいずれも1形式であるが、一般の $n$ で $\beta$ は $(n-1)$ 形式になる。
<!-- solution-end -->

<a id="ex-syz1-08-a02"></a>

#### SYZ1-08-A02 サイクルの次数

- Level: A

$L=T^3$ とする。$\alpha$ が1形式、$\beta$ が2形式であるとき、$\alpha,\beta$ の周期を積分すべきサイクルの次元と、対応する整数ホモロジーの階数を答えよ。

<!-- solution-start -->
### 詳細解答

1形式は1次元の閉路に、2形式は2次元の閉サイクルに積分する。$T^3=S^1\times S^1\times S^1$ の三つの座標円周を $\gamma_i$ とすれば $H_1(T^3;\mathbb Z)\cong\mathbb Z^3$。各座標を一つ固定した向き付き座標2トーラスを $\delta_i$ とすれば $H_2(T^3;\mathbb Z)\cong\mathbb Z^3$。どちらの整数群も階数3だが、サイクルの次数は異なる。
<!-- solution-end -->

<a id="ex-syz1-08-a03"></a>

#### SYZ1-08-A03 整数基底の交換

- Level: A

二次元整数アフィン座標 $u=(u^1,u^2)$ で $v^1=u^1+2u^2+1$、$v^2=u^2-3$ とする。これは同じ整数アフィン構造の座標か。$w=(2u^1,u^2)$ についても判定せよ。

<!-- solution-start -->
### 詳細解答

$v=Au+c$ の行列は

$$
A=\begin{pmatrix}1&2\\0&1\end{pmatrix},\qquad
A^{-1}=\begin{pmatrix}1&-2\\0&1\end{pmatrix}.
$$

両方整数成分なので $A\in GL(2,\mathbb Z)$。定数平行移動は許される。$w$ の行列は $\operatorname{diag}(2,1)$ で行列式2、逆の第1対角成分は $1/2$。従って $w$ は滑らかな実座標でも、同じ整数アフィン座標ではない。
<!-- solution-end -->

<a id="ex-syz1-08-a04"></a>

#### SYZ1-08-A04 一次元ファイバーと0形式

- Level: A

$X=\mathbb C/(\mathbb Z+i\mathbb Z)$、$\omega=dx\wedge dy$、$\Omega=dx+i\,dy$、$L_y=\{y=\text{一定}\}$ とする。$V=\partial_y$ に対する $\alpha_V,\beta_V$、$H_1(L_y;\mathbb Z)$ と $H_0(L_y;\mathbb Z)$ の生成元への周期を求めよ。

<!-- solution-start -->
### 詳細解答

$-\iota_{\partial_y}(dx\wedge dy)=dx$、$\iota_{\partial_y}\operatorname{Im}\Omega=\iota_{\partial_y}dy=1$ なので $\alpha_V=dx$、$\beta_V=1$（0形式）である。$H_1$ の正向き一周 $\gamma$ に沿う周期は $\int_\gamma dx=1$。$H_0$ の生成元を点1個 $\delta=[x_0]$ とすれば、0形式の0サイクルへの積分は評価であるから $\int_\delta 1=1$。従って二つの周期余接格子はともに $\mathbb Z\,dy$ になる。
<!-- solution-end -->

<a id="ex-syz1-08-a05"></a>

#### SYZ1-08-A05 作用座標との符号関係

- Level: A

$\omega=dI\wedge d\psi$、$\psi\in\mathbb R/\mathbb Z$ のLagrange円周束で $\gamma$ を正の $\psi$ 周回とする。$v=\partial_I$ に対し $p_\gamma(v)$ と $u$ の微分を求めよ。

<!-- solution-start -->
### 詳細解答

$\iota_{\partial_I}(dI\wedge d\psi)=d\psi$ より $\alpha_v=-d\psi$。正の周回で $\int_\gamma d\psi=1$ なので $p_\gamma(\partial_I)=-1$。これは基底1形式として $p_\gamma=-dI$、したがって $du=-dI$、$u=-I+\text{定数}$ を意味する。$-1\in GL(1,\mathbb Z)$ なので前講の作用座標と同じ整数アフィン構造である。
<!-- solution-end -->

### Level B：閉性・格子・遷移をつなぐ

<a id="ex-syz1-08-b01"></a>

#### SYZ1-08-B01 閉形式と帯の積分

- Level: B

局所積束 $U\times T^2$ 上の閉2形式 $\eta$ が各トーラスファイバーに零制限を持つとする。$T^2$ の整数1サイクル $\gamma$ を固定し、基底の道 $c$ が掃く帯への $\eta$ の積分が道のホモトピーで変わらないことを、[Stokesの定理](../../VC/VC5/index.md#thm-vc5-stokes)を使って証明せよ。

<!-- solution-start -->
### 詳細解答

道 $c_0,c_1$ が端点を共有し、$h:[0,1]^2\to U$ が端点固定ホモトピーとする。$K=[0,1]^2\times\gamma$ を全空間へ写した3次元鎖を考える。$d\eta=0$ だから

$$
0=\int_K d\eta=\int_{\partial K}\eta.
$$

$\partial K$ のうち $\partial\gamma$ に対応する部分は $\gamma$ がサイクルなので消える。端点固定の二つの面はそれぞれファイバー内にあり、$\eta|_{T^2}=0$ で消える。残る二面は $c_0$ と $c_1$ の帯（向きは逆）なので、$\int_{c_0\times\gamma}\eta-\int_{c_1\times\gamma}\eta=0$。従って帯の積分は局所ポテンシャルを与え、その微分は周期1形式になる。
<!-- solution-end -->

<a id="ex-syz1-08-b02"></a>

#### SYZ1-08-B02 非整数行列が格子を壊す

- Level: B

二次元余接空間の格子 $\Lambda=\mathbb Z\,du^1\oplus\mathbb Z\,du^2$ とする。$du=(du^1,du^2)^{\mathsf T}$ を列ベクトルとして

$
A=\begin{pmatrix}1&1\\1&2\end{pmatrix},\qquad
B=\begin{pmatrix}1&1/2\\0&1\end{pmatrix}
$

を考える。$Adu$ と $Bdu$ の各成分の整数係数の線形結合で張る格子が、それぞれ $\Lambda$ と一致するか、生成元の逆変換まで示して判定せよ。

<!-- solution-start -->
### 詳細解答

$\det A=1$ で

$$
A^{-1}=\begin{pmatrix}2&-1\\-1&1\end{pmatrix}
$$

も整数なので、$Adu$ の各成分は $\Lambda$ に属し、逆に $du=A^{-1}(Adu)$ も新生成元の整数和である。従って格子は一致する。$Bdu$ の第1成分は $du^1+\frac12du^2$ であり、これ自体が $\Lambda$ に属さない。$Bdu$ の成分の整数係数の線形結合で張る格子は、元の格子とは異なる。$\det B=1$ という条件だけでは、整数格子を保つ十分条件にならない。
<!-- solution-end -->

<a id="ex-syz1-08-b03"></a>

#### SYZ1-08-B03 異方的トーラスの周期

- Level: B

第7節の模型で $(a_1,a_2)=(4,9)$ とする。$u,t$ の座標、二つの余接格子、$t$ の $u$ に対するJacobianを求めよ。両整数アフィン構造が同じか判定せよ。

<!-- solution-start -->
### 詳細解答

$\sqrt{a_1a_2}=\sqrt{36}=6$ なので、周期を各整数サイクルへ積分すると

$$
u=(4y^1,9y^2),\qquad t=(6y^1,6y^2).
$$

二つの余接格子は

$
\Lambda_\omega^*=\mathbb Z(4dy^1)\oplus\mathbb Z(9dy^2),\qquad
\Lambda_\Omega^*=\mathbb Z(6dy^1)\oplus\mathbb Z(6dy^2)
$

である。$y^1=u^1/4$、$y^2=u^2/9$ を代入すると

$$
t=(\tfrac32u^1,\tfrac23u^2),\qquad
\frac{\partial t}{\partial u}
=\begin{pmatrix}3/2&0\\0&2/3\end{pmatrix}.
$$

$3/2,2/3$ は整数でないので、この変換は $GL(2,\mathbb Z)$ に属さず、二つの整数アフィン構造は一致しない。
<!-- solution-end -->

<a id="ex-syz1-08-b04"></a>

#### SYZ1-08-B04 Hodge星は整数周期を保つか

- Level: B

正の向き $dx^1\wedge dx^2$ と計量 $g_L=4(dx^1)^2+9(dx^2)^2$ を持つ $T^2$ 上で $*dx^1$ と $*dx^2$ を求め、$H^1(T^2;\mathbb Z)$ の整数基底をHodge星で移したものが、いつも $H^1(T^2;\mathbb Z)$ の整数基底になるという主張を検討せよ。

<!-- solution-start -->
### 詳細解答

正規直交余接基底は $e^1=2dx^1$、$e^2=3dx^2$ で、向きは $e^1\wedge e^2>0$。二次元のHodge星は $*e^1=e^2$、$*e^2=-e^1$ なので、

$$
*dx^1=\frac32dx^2,\qquad
*dx^2=-\frac23dx^1.
$$

整数周期を持つ $dx^1,dx^2$ の像の係数は一般には非整数であり、この例では $\frac32$ と $-\frac23$ である。したがってHodge星は調和形式の実ベクトル空間を同型にするが、整数コホモロジー格子を保存しない。これこそ二つのアフィン格子が一致しなくても矛盾しない理由である。
<!-- solution-end -->

### Level C：定義、閉性、座標遷移、反例を一つにまとめる

<a id="ex-syz1-08-c01"></a>

#### SYZ1-08-C01 二重整数アフィン構造の完全構成

- Level: C

二次元の平坦複素トーラス上で $a_1=2,a_2=3$ とした第7節の模型を取る。第4問で使うサイクル基底の変更を

$$
\gamma'_1=\gamma_1+\gamma_2,\quad \gamma'_2=\gamma_2,
\qquad
\delta'_1=\delta_1,\quad \delta'_2=-\delta_1+\delta_2
$$

と指定する。次の事項を順に示せ。

1. SLagの全条件を確認する。
2. $\alpha,\beta$ と二種類の周期を求める。
3. 各周期1形式の閉性と座標可逆性を示す。
4. 上記のサイクル基底変更後の二組の座標を求める。
5. 二構造が一般には同じでない理由を述べる。

<!-- solution-start -->
### 詳細解答

**(1) SLag条件。** $g=2((dx^1)^2+(dy^1)^2)+3((dx^2)^2+(dy^2)^2)$、$\omega=2dx^1\wedge dy^1+3dx^2\wedge dy^2$、$\Omega=\sqrt6(dx^1+i\,dy^1)\wedge(dx^2+i\,dy^2)$ とする。$L_y$ は $dy^1=dy^2=0$ で実次元2、コンパクトで向き付きの $T^2$。従って $\omega|_{L_y}=0$、$\operatorname{Im}\Omega|_{L_y}=0$ であり、$\operatorname{Re}\Omega|_{L_y}=\sqrt6\,dx^1\wedge dx^2=\operatorname{vol}_{L_y}>0$。束は $y$ の局所座標で積になり、局所自明である。

**(2) 二つの形式と周期。** $v=v^1\partial_{y^1}+v^2\partial_{y^2}$ とすると、縮約を順に行って

$$
\alpha_v=2v^1dx^1+3v^2dx^2,\quad
\beta_v=\sqrt6(v^1dx^2-v^2dx^1).
$$

$\gamma_1=[x^1],\gamma_2=[x^2]$ と $\delta_1=[x^2],\delta_2=-[x^1]$ で積分すれば

$$
p_{\gamma_1}=2dy^1,\quad p_{\gamma_2}=3dy^2,\qquad
q_{\delta_1}=\sqrt6\,dy^1,\quad
q_{\delta_2}=\sqrt6\,dy^2.
$$

**(3) 閉性と独立性。** 係数は定数なので、いずれも外微分は0。局所ポテンシャルを積分して

$$
u=(2y^1,3y^2),\qquad t=(\sqrt6\,y^1,\sqrt6\,y^2)
$$

とできる。Jacobianの行列式は両方とも6で非零だから、それぞれ有効な局所座標になる。

**(4) 基底変更。** 指定されたサイクル交換の行列は

$$
A=\begin{pmatrix}1&1\\0&1\end{pmatrix},
\qquad
B=\begin{pmatrix}1&0\\-1&1\end{pmatrix};
\quad \det A=\det B=1.
$$

従って $du'=Adu$、$dt'=Bdt$。同じ積分基点で定数を0に選べば、

$$
u'=(2y^1+3y^2,\ 3y^2),\qquad
t'=(\sqrt6\,y^1,\ -\sqrt6\,y^1+\sqrt6\,y^2).
$$

基点やポテンシャルの原点を変えれば、それぞれの組へ定数平行移動が追加される。

**(5) 二構造の非同一性。** 元の二組を比較すると

$$
\frac{\partial t}{\partial u}
=\begin{pmatrix}\sqrt6/2&0\\0&\sqrt6/3\end{pmatrix}.
$$

この行列の成分は整数でないため、二つの整数アフィン構造は一致しない。それでも各構造の**内部**で行う (4) の変更は $A,B\in GL(2,\mathbb Z)$ だから許される。この平坦模型では射影 $\pi:X\to(\mathbb R/\mathbb Z)^2$ が実際に大域SLagトーラス束を与えるが、その事実から一般のCalabi–Yau多様体にも同様の大域束が存在するとは結論できない。
<!-- solution-end -->

## 9. 何が得られ、次に何を求めるか

基底の速度を $H^1(L_b;\mathbb R)$ へ送るとシンプレクティック周期の格子、$H^{n-1}(L_b;\mathbb R)$ へ送ると複素周期の格子が現れる。いずれも整数サイクルの積分から閉1形式が得られ、局所座標への積分と $GL(n,\mathbb Z)$ の遷移を実際に証明できた。

**二つの実ベクトル空間はHodge星で結ばれるが、その写像は整数格子を保存するとは限らない。** では二つのアフィン座標を結ぶ計量はどのように現れ、なぜHessian・Legendre変換が自然なのか。これが次講「Hessian計量とLegendre双対」の問いである。
