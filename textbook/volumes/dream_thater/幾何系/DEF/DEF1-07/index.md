# DEF1-07 Kuranishi構成II――解析的収束と有限次元基底

<!-- definition-example-audit: strict -->

## 1. 形式級数を本当の小変形にする

[前章の固定点構成](../DEF1-06/index.md#thm-def1-06-fixed-point)では、接束値形式の次数ごとの係数が一意に決まった。しかし形式級数には収束半径がないかもしれない。[形式的障害写像](../DEF1-06/index.md#def-def1-06-kuranishi-map)の零点を、実際の複素構造が並ぶ有限次元の場所として理解するには、少なくとも次を別々に示す必要がある。

1. 微分を含む括弧を評価できる関数空間で、固定点方程式が**収束**する。
2. 調和障害が零なら、収束解は本当にMaurer–Cartan方程式を満たす。
3. その零点集合が有限個の**収束する正則方程式**で定義され、解が滑らかな複素構造を与える。

この章では上の三点を扱う。「任意の小変形族をこの基底が捕捉する」という**局所完全性**は次章で証明する。したがって、ここで構成したパラメータを無条件に同型類の一意な座標とは呼ばない。

前章と同じく、$X$ は複素次元 $n\ge1$ のコンパクト・境界なし複素多様体とする。正則接束 $E=T_X$ には滑らかなHermite計量を入れる。Kähler性は仮定しない。

接束値形式を $C^q=\mathcal A^{0,q}(X,E)$、Dolbeault微分を $d=\bar\partial_E$ と書く。[接束値Hodge分解](../DEF1-06/index.md#thm-def1-06-tangent-hodge)の調和射影を $H_q$、Green作用素を $G_q$ とする。[ホモトピー作用素](../DEF1-06/index.md#def-def1-06-harmonic-gauge)は $h_q=d^*G_q$ である。

特に次数2形式へ作用するとき $h=h_2$ と略記し、$h:C^2\to C^1$ である。この次数の区別は後の曲率計算で重要になる。

## 2. 微分を一回失い、Green作用素で一回取り戻す

まず実次元は $2n$ である。[Sobolev空間と埋め込み](../../GA/GA2/index.md#thm-ga2-embedding)の局所座標・分割の方法をベクトル束の成分へ適用し、$H^s_q=H^s(X,\Lambda^{0,q}T^*X\otimes E)$ と書く。以下、**整数 $s>n+2$** を一つ固定する。この選択なら $H^{s-2}$ は積に関して安定で、$H^s$ は少なくとも $C^1$ に連続埋め込みされる。大きな $s$ を選ぶことは、新しい複素構造に解析的座標を初めから仮定することではない。

局所表示で[接束値形式の括弧](../DEF1-03/index.md#def-def1-03-bracket)は $u\,\partial_z v$ と $v\,\partial_z u$ の有限和である。微分によって $H^s\to H^{s-1}$ と次数が一つ下がり、積評価によって

$$
\|[u,v]\|_{H^{s-1}}\le C_{\mathrm b}\|u\|_{H^s}\|v\|_{H^s}.
$$

[有限次元の陰関数定理](../../../基礎科目/RA/RA6A/index.md#thm-ra6a-implicit-function)を思い出そう。ただし微分損失を放置したまま、そのBanach空間版を適用することはできない。そこで[楕円型評価](../../GA/GA6/index.md#lem-ga6-elliptic)を接束値Laplacianへ適用する。[前章の主記号計算](../DEF1-06/index.md#def-def1-06-tangent-laplacian)により、正の固有空間での逆 $G_q$ は二階分の正則性を回復し、$h=d^*G_2$ は一階分を回復する。

<a id="lem-def1-07-sobolev-estimate"></a>

<!-- formal-statement-start -->
> **補題（Sobolev空間上のKuranishi双線形評価）**
>
> 上記のコンパクトHermite多様体 $X$ と整数 $s>n+2$ について、$G_q:H^r_q\to H^{r+2}_q$、$h_q:H^r_q\to H^{r+1}_{q-1}$ は任意の非負整数 $r$ で有界に延長される。従って次数1の接束値形式 $u,v\in H^s_1$ に対し、双線形写像

$$
B(u,v)=h_2[u,v]\in H^s_1
$$

> は連続で、ある定数 $C>0$ に対して

$$
\|B(u,v)\|_{H^s}\le C\|u\|_{H^s}\|v\|_{H^s}
$$

> が成り立つ。さらに $F\in H^{s-1}_2$、$u\in H^s_1$ に対して、次数付き括弧の $h_3[F,u]$ は

$$
\|h_3[F,u]\|_{H^{s-1}}\le C'\|F\|_{H^{s-1}}\|u\|_{H^s}
$$

> を満たす。$n=1$ で $C^2=0$ の場合は、次数2以上の項を零と解する。
<!-- formal-statement-end -->

### 証明の見取り図

一階微分、積、二階楕円型逆、再び一階微分という順でSobolev指数を追う。最後の評価だけは $F$ が一階低い空間にあるので、$s-2>n$ という余裕を使う。

<!-- proof-start -->
### 証明

[Green作用素の定義とスペクトルギャップ](../../GA/GA6/index.md#def-ga6-green-operator)により $G_q$ は調和空間を消し、直交補上で $\Delta_qG_qf=(I-H_q)f$ を満たす。局所主記号は前章で確認した正定値スカラー倍の恒等写像であり、[楕円型評価](../../GA/GA6/index.md#lem-ga6-elliptic)は束の有限個の成分にも成立する。具体的に

$$
\|G_qf\|_{H^{r+2}}
\le A_r\bigl(\|(I-H_q)f\|_{H^r}+\|G_qf\|_{L^2}\bigr)
\le A'_r\|f\|_{H^r}.
$$

最後は正のスペクトルギャップにより $\|G_qf\|_{L^2}\le\lambda_1^{-1}\|f\|_{L^2}$ を使う。$d^*$ は滑らかな係数の一階作用素だから $\|d^*G_qf\|_{H^{r+1}}\le A''_r\|f\|_{H^r}$。

局所的な括弧は係数 $u^i_{\bar j}$ の積と一階正則方向微分の和であり、[括弧の座標定義](../DEF1-03/index.md#def-def1-03-bracket)に現れる各項へ積のLeibniz則と $H^{s-1}$ の積評価を適用すると

$$
\|[u,v]\|_{H^{s-1}}\le C_{\mathrm b}\|u\|_{H^s}\|v\|_{H^s}.
$$

有限座標被覆と分割で定数を統一し、$h_2:H^{s-1}_2\to H^s_1$ と合成すれば第一の評価を得る。$F$ に対しては、微分される $F$ は $H^{s-2}$、微分される $u$ は $H^{s-1}$ にある。$s-2>n=(2n)/2$ より $H^{s-2}$ が積に閉じるから

$$
\|[F,u]\|_{H^{s-2}}\le C_1\|F\|_{H^{s-1}}\|u\|_{H^s}.
$$

これに $h_3:H^{s-2}_3\to H^{s-1}_2$ を作用させる。次数 $3>n$ なら両側を零と見なして同じ式が成立する。$\square$
<!-- proof-end -->

ここで $h_2$ と $h_3$ は**入力の次数が違う**。後で曲率 $F$ を扱う際に $h_2[F,u]$ と書くと、出力次数が間違うことに注意しよう。

## 3. 固定点解の解析的収束

$m=\dim_{\mathbb C}\mathcal H_T^1$ とし、調和基底 $e_1,\ldots,e_m$ に対して $t(z)=\sum_{a=1}^m z_ae_a$ と置く。$t$ は有限次元複素パラメータ $z=(z_1,\ldots,z_m)$ の複素線形写像である。$m=0$ なら $t=0$ のみを考える。

<a id="thm-def1-07-convergent-fixed-point"></a>

<!-- formal-statement-start -->
> **定理（収束するKuranishi固定点解）**
>
> 上記の $X$、整数 $s>n+2$ と調和パラメータ $t(z)\in\mathcal H_T^1$ に対し、原点の十分小さい開球 $U\subset\mathbb C^m$ が存在し、$H^s_1$ 値の正則写像 $\phi:U\to H^s_1$ が一意に定まって

$$
\phi(z)=t(z)-\frac12h_2[\phi(z),\phi(z)],\qquad \phi(0)=0
$$

> を満たす（原点近くの小さいノルムの解として一意）。さらに $H_1\phi=t$、$d^*\phi=0$、$D\phi(0)[v]=\sum v_ae_a$ である。$\phi$ のTaylor係数は[前章の形式解](../DEF1-06/index.md#thm-def1-06-fixed-point)の係数と一致し、従ってその形式級数は正の収束半径を持つ。
<!-- formal-statement-end -->

### 証明の見取り図

微分を含む括弧を $B=h_2[\ ,\ ]$ と合成して、**同じ $H^s$ に戻る二次写像**にする。小球での縮小写像原理で存在・一意性が得られ、同じ写像を複素Banach空間の正則写像として見ればパラメータへの正則依存も得られる。

<!-- proof-start -->
### 証明

[双線形評価](#lem-def1-07-sobolev-estimate)の定数を $C$ とする。$T_t(u)=t-\frac12B(u,u)$ と置けば、半径 $R$ の閉球で

$$
\|T_t(u)\|\le\|t\|+\frac C2R^2,\qquad
\|T_t(u)-T_t(v)\|\le CR\|u-v\|.
$$

後者は $B(u,u)-B(v,v)=B(u-v,u)+B(v,u-v)$ を使った。$\delta=\|t\|$、$R=2\delta$ とし $2C\delta<1$ とすれば、第一の右辺は $\delta+2C\delta^2\le2\delta=R$、第二の係数は $2C\delta<1$ である。従って $T_t$ は閉球を自分に移す縮小写像。$u_0=0$、$u_{k+1}=T_t(u_k)$ はノルム収束して唯一の小解 $\phi$ を与える。

正則性を確かめるには、$P(t,u)=u-t+\frac12B(u,u)$ を考える。連続複素双線形写像 $B$ から $P$ は複素Banach空間上で正則であり、

$$
P(0,0)=0,\qquad D_uP(0,0)=I.
$$

これは複素Banach空間版の陰関数定理の仮定（正則性と $D_uP$ の可逆性）をすべて満たす。ここでは同定理を黒箱にせず、この場合の正則依存も確かめる。縮小係数を一様に $q<1$ とできる小さい $t$ の開球を取る。各反復 $u_k(t)$ は $t$ の有限次数多項式で正則であり、差は

$$
\|u_{k+1}(t)-u_k(t)\|\le q^k\|u_1(t)-u_0(t)\|\le q^k\|t\|.
$$

従って反復はその開球の閉じた小球上で一様収束する。任意の複素直線に制限したBanach値Cauchy積分公式を反復に適用し、一様極限と積分を交換すれば極限も正則である。これで陰関数定理がこの方程式へ与える結論を直接確認できた。$H_1h_2=0$、$d^*h_2=0$ は[連鎖ホモトピー補題](../DEF1-06/index.md#lem-def1-06-homotopy)から従い、$H_1\phi=t$、$d^*\phi=0$。$P$ を原点で微分すれば $D\phi(0)=Dt(0)$。

最後に $\phi$ を $z$ の全次数で展開する。一次は $t$、$r\ge2$ 次は

$$
\phi_r=-\frac12h_2\sum_{i=1}^{r-1}[\phi_i,\phi_{r-i}].
$$

右辺は低次数だけから決まり、[形式解の再帰式](../DEF1-06/index.md#thm-def1-06-fixed-point)と一致する。既に $\phi$ は正則なので、この一致したTaylor級数は十分小さい多重円板内で収束する。$\square$
<!-- proof-end -->

**収束半径を数で押さえる。** 一方向 $t=\varepsilon\alpha$ で $\|\alpha\|_{H^s}=M$ とし、係数ノルムの上界を $a_1=M$、$a_r=\frac C2\sum_{i=1}^{r-1}a_i a_{r-i}$ と取る。母関数 $A(w)=\sum_{r\ge1}a_rw^r$ は

$$
A=Mw+\frac C2A^2,\qquad
A(w)=\frac{1-\sqrt{1-2CMw}}{C}.
$$

従って $|\varepsilon|<(2CM)^{-1}$ なら係数が絶対収束する（$M=0$ なら $\phi=0$）。これは形式係数を直接支配する**優級数法**でもある。多方向では $w=\sum|z_a|\|e_a\|_{H^s}$ を同じ上界の入力に使う。

## 4. 有限次元の正則障害写像

[前章の形式的障害](../DEF1-06/index.md#def-def1-06-kuranishi-map)を収束する $\phi(z)$ へそのまま代入できるようになった。$H_2:H^{s-1}_2\to\mathcal H_T^2$ は有限階数の連続線形写像だから、括弧との合成も正則になる。

<a id="def-def1-07-analytic-kuranishi-map"></a>

<!-- formal-statement-start -->
> **定義（解析的Kuranishi障害写像）**
>
> [収束固定点解](#thm-def1-07-convergent-fixed-point) $\phi:U\to H^s_1$ に対して、有限次元複素ベクトル空間 $\mathcal H_T^2$ 値の正則写像を

$$
\kappa(z)=\frac12H_2[\phi(z),\phi(z)]
$$

> と定める。基底を選んで $\mathcal H_T^2\simeq\mathbb C^r$ と同一視し、$\kappa=(\kappa_1,\ldots,\kappa_r)$ と表す。$r=0$ の場合は零写像とする。$\kappa(0)=0$ かつ $D\kappa(0)=0$ である。
<!-- formal-statement-end -->

<!-- definition-example-start: def-def1-07-analytic-kuranishi-map -->
**定義の確認**（平坦な二次元複素トーラス）。$X=\mathbb C^2/(\mathbb Z+i\mathbb Z)^2$ 上の調和接束値 $(0,1)$ 形式は定数係数である。したがって $t(z)=\sum z_{ij}\,d\bar w^j\otimes\partial_{w^i}$ に正則方向微分はなく、括弧の各項は零となる。固定点式に $\phi=t$ を代入すると成立し、一意性からこれが解となる。定義式に入れると $\kappa(z)=0$。一方、$d\bar w^1\wedge d\bar w^2\otimes\partial_{w^1}$ は非零の調和次数2形式なので $r>0$。**値域が非零でも写像自身は恒等的に零**という条件を全部確認できた。
<!-- definition-example-end -->

<a id="def-def1-07-kuranishi-germ"></a>

<!-- formal-statement-start -->
> **定義（有限次元Kuranishi解析的基底）**
>
> 上記の $U\subset\mathbb C^m$ と $\kappa=(\kappa_1,\ldots,\kappa_r)$ に対し、原点での複素解析空間の芽 $K$ を、正則関数の局所環による方程式

$$
\mathcal O_{K,0}=
\mathcal O_{\mathbb C^m,0}/(\kappa_1,\ldots,\kappa_r)
$$

> で定める。台集合は $|\!K\!|=\{z\in U:\kappa(z)=0\}$ の原点近傍である。ここでイデアルを残すため、非被約な解析構造も区別する。$m=0$ または $r=0$ もこの定義に含める。
<!-- formal-statement-end -->

<!-- definition-example-start: def-def1-07-kuranishi-germ -->
**定義の確認**（有限次元の方程式模型）。$\kappa(z_1,z_2)=z_1z_2$ とすると、台集合は二つの座標軸の和で、原点の局所環は $\mathbb C\{z_1,z_2\}/(z_1z_2)$ となる。$\kappa(w)=w^2$ の場合は台集合が一点でも、局所環 $\mathbb C\{w\}/(w^2)$ に $w\ne0$ かつ $w^2=0$ が残る。二つとも**収束する正則式**から定義した例であり、実際の多様体の障害写像だと主張しているわけではない。
<!-- definition-example-end -->

<a id="thm-def1-07-analytic-base"></a>

<!-- formal-statement-start -->
> **定理（有限次元解析的零点集合と接空間）**
>
> 上記のコンパクトHermite複素多様体 $X$ について、解析的Kuranishi障害写像 $\kappa:U\to\mathcal H_T^2$ の零点は有限個の収束正則関数で定義される解析空間の芽 $K$ を与える。原点のZariski接空間は

$$
T_0K\simeq\mathcal H_T^1\simeq H^1(X,T_X)
$$

> である。ただし、この結論だけでは $K$ が滑らか、被約、あるいは同型類の局所一意なパラメータ空間とは言えない。
<!-- formal-statement-end -->

### 証明の見取り図

正則性はBanach値の固定点解から得た。接空間を切り出す**一次式**は $\kappa$ に存在しないので、全ての調和一次方向が残る。ただし二次以上の方程式が解析空間を特異にすることはある。

<!-- proof-start -->
### 証明

$\phi:U\to H^s_1$ は[収束定理](#thm-def1-07-convergent-fixed-point)により正則、$[\, ,\,]:H^s_1\times H^s_1\to H^{s-1}_2$ は[双線形評価](#lem-def1-07-sobolev-estimate)により連続である。よって $\kappa$ は正則で、$\mathcal H_T^2$ の基底を選べば $r$ 個の収束正則関数が得られる。これらが生成するイデアルを保持した商局所環により $K$ が定まる。

原点で $\phi(0)=0$ なので積の微分則により

$$
D\kappa(0)[v]
=\frac12H_2\bigl([D\phi(0)[v],\phi(0)]+[\phi(0),D\phi(0)[v]]\bigr)=0.
$$

したがって方程式の一次線形化の核は $\mathbb C^m$ 全体。基底 $e_a$ により $\mathbb C^m\simeq\mathcal H_T^1$、さらに[調和代表同型](../DEF1-06/index.md#thm-def1-06-tangent-hodge)で $H^1(X,T_X)$ と同定する。一方、一次式が零でも $w^2=0$ という非被約模型はあり、滑らかさは導けない。$\square$
<!-- proof-end -->

## 5. 零障害なら実際に可積分である

形式級数で使った「最初の非零次数」の議論は、固定した $z$ の収束解には使えない。代わりに、曲率に関する**線形の縮小評価**を使う。

<a id="thm-def1-07-convergent-mc"></a>

<!-- formal-statement-start -->
> **定理（収束障害の消滅とMaurer–Cartan可積分性）**
>
> [収束固定点解](#thm-def1-07-convergent-fixed-point)の定義域 $U$ を必要なら縮小する。各 $z\in U$ について、$H^{s-1}_2$ 値の曲率を

$$
F(z)=d\phi(z)+\frac12[\phi(z),\phi(z)]
$$

> と置くと、次が成り立つ。

$$
F(z)=0\quad\Longleftrightarrow\quad\kappa(z)=0.
$$

> さらに $F$ は正則関数のイデアル $(\kappa_1,\ldots,\kappa_r)$ に属する $H^{s-1}_2$ 値正則写像である。従って非被約な基底 $K$ の構造層で計算してもMaurer–Cartan曲率は零となる。
<!-- formal-statement-end -->

### 証明の見取り図

[Maurer–Cartan曲率のBianchi恒等式](../DEF1-05/index.md#lem-def1-05-bianchi)から $F=\kappa+h_3[F,\phi]$ が得られる。小さい $\phi$ に対し右辺の $F$ を含む作用素のノルムが1より小さいため、Neumann級数で解ける。これは形式的な次数の比較を、実際のBanach空間のノルム評価に置き換えたものだ。

<!-- proof-start -->
### 証明

$q=\frac12[\phi,\phi]\in H^{s-1}_2$ と置く。固定点式から $d\phi=-dh_2q$、[Green作用素の連鎖ホモトピー恒等式](../DEF1-06/index.md#lem-def1-06-homotopy)から $q=H_2q+dh_2q+h_3dq$。よって

$$
F=d\phi+q=H_2q+h_3dq=\kappa+h_3dq.
$$

[次数付き微分則とJacobi恒等式](../DEF1-05/index.md#lem-def1-05-graded-identities)で、$dq=[d\phi,\phi]$、$[\frac12[\phi,\phi],\phi]=0$。従って $dq=[F,\phi]$ となり

$$
F=\kappa+T_\phi F,\qquad T_\phi F:=h_3[F,\phi].
$$

これらの等式はまず滑らかな形式で成り立ち、$H^s$ の滑らかな近似列と[双線形評価](#lem-def1-07-sobolev-estimate)で極限を取って $H^{s-1}$ でも成立する。同補題より

$$
\|T_\phi F\|_{H^{s-1}}
\le C'\|\phi\|_{H^s}\|F\|_{H^{s-1}}.
$$

$\phi(0)=0$ と連続性から $U$ を縮小して $C'\|\phi(z)\|_{H^s}<\frac12$ とできる。すると $I-T_\phi$ は可逆で

$$
F=(I-T_\phi)^{-1}\kappa
=\sum_{k=0}^{\infty}T_\phi^k\kappa.
$$

各 $z$ で $\kappa=0$ なら $F=0$。逆に $F=0$ なら $H_2F=H_2d\phi+H_2q=\kappa$（調和形式は完全形式に直交）より $\kappa=0$。

最後に調和基底 $\eta_1,\ldots,\eta_r$ で $\kappa=\sum_j\kappa_j\eta_j$ と書けば

$$
F(z)=\sum_{j=1}^r\kappa_j(z)\,(I-T_{\phi(z)})^{-1}\eta_j.
$$

作用素のNeumann級数は $U$ をさらに小さくすれば一様に収束し、その各項は $z$ に正則である。従って括弧内の係数写像は正則。$F$ は正則関数イデアル $(\kappa_1,\ldots,\kappa_r)$ に属し、商局所環でも零となる。$\square$
<!-- proof-end -->

## 6. 滑らかな複素構造へ戻る

これまでの $\phi(z)$ は最初から滑らかな形式として構成したのではなく、$H^s$ の収束解である。$z\in|K|$ では $F=0$ なので、局所的に $d\phi+\frac12[\phi,\phi]=0$ と $d^*\phi=0$ の連立方程式を使って正則性を上げられる。

<a id="lem-def1-07-elliptic-bootstrap"></a>

<!-- formal-statement-start -->
> **補題（小さい可積分解の楕円型正則性）**
>
> 上記の $X$、整数 $s>n+2$ において、$\phi\in H^s_1$ が十分小さい $C^1$ ノルムを持ち、

$$
d\phi+\frac12[\phi,\phi]=0,\qquad d^*\phi=0
$$

> を弱い意味で満たすなら、$\phi$ は滑らかである。
<!-- formal-statement-end -->

### 証明の見取り図

$D=(d,d^*)$ の一階主記号は外積と内部積の組で、非零の共変ベクトルに対して単射である。括弧の一階微分項を左へ移すと $D$ の主記号に $\phi$ に比例する小さな行列が加わるだけなので、楕円性が保たれる。差分商と楕円型評価で微分階数を順に上げる。

<!-- proof-start -->
### 証明

局所ユニタリ枠で $D=(d,d^*)$ の主記号を $\sigma_D(\xi)u=(\xi^{0,1}\wedge u,\iota((\xi^{0,1})^\sharp)u)$ と書ける。[接束値Dolbeault Laplacianと調和射影](../DEF1-06/index.md#def-def1-06-tangent-laplacian)の直後で確認した外積・内部積の交代関係から

$$
\|\sigma_D(\xi)u\|^2=|\xi^{0,1}|^2\|u\|^2,
$$

従って $D$ は一階の過剰決定楕円型作用素である。局所括弧を $\frac12[\phi,\phi]=A(\phi)\partial\phi$ とまとめる。$A$ は $\phi$ に線形に依存する滑らかな係数で、方程式は

$$
\bigl(D+(A(\phi)\partial,0)\bigr)\phi=0.
$$

$\|\phi\|_{C^0}$ が小さければ $A(\phi)$ の主記号のノルムは $\sigma_D$ の単射性の下界より小さく、摂動後も単射型楕円性が成り立つ。より具体的に、コンパクトな座標小球で $D$ の[楕円型評価](../../GA/GA6/index.md#lem-ga6-elliptic)の一階版

$$
\|v\|_{H^{r+1}}\le C_r(\|Dv\|_{H^r}+\|v\|_{H^r})
$$

を使用する。$r=s-1$ から始め、微分の差分商 $\delta_h\phi$ を方程式へ作用させると、最高階の項は $A(\phi)\partial(\delta_h\phi)$、残りは $(\delta_h A(\phi))\partial\phi$ と低階の枠係数の差分である。前者は小さい $\|\phi\|_{C^0}$ により左辺へ吸収できる。後者は既知の $\phi\in H^s\hookrightarrow C^1$ と積評価から $H^{s-1}$ で制御できる。$h\to0$ として $\phi\in H^{s+1}$ を得る。

同じ操作を $r=s,s+1,\ldots$ と繰り返すと、各段階の既知の導関数が下位項の係数を制御し、新たな最高階の微分だけを再び小さい $A(\phi)$ で吸収できる。従って $\phi\in H^N$ がすべての整数 $N$ に対して成立し、[Sobolev埋め込み](../../GA/GA2/index.md#thm-ga2-embedding)により $\phi\in C^\infty$。$\square$
<!-- proof-end -->

<a id="thm-def1-07-integrable-family"></a>

<!-- formal-statement-start -->
> **定理（障害零点上の小複素構造）**
>
> [有限次元基底](#def-def1-07-kuranishi-germ) $K$ の十分小さい台集合の各点 $z$ に対し、$\phi(z)$ は滑らかなBeltrami微分である。そのグラフと複素共役は直和になり、可積分な複素構造を定める。$z=0$ で元の複素構造に一致し、調和成分は

$$
H_1\phi(z)=t(z)
$$

> を満たす。一般の変形族の局所完全性や、異なる $z$ の複素多様体が必ず非同型であることは主張しない。
<!-- formal-statement-end -->

### 証明の見取り図

障害が零なら[前節の定理](#thm-def1-07-convergent-mc)でMC方程式が成り立つ。楕円型正則性で滑らかにした後、グラフの直和性と[Newlander–Nirenberg定理](../../CM/CM1-07/index.md#thm-cm1-07-newlander-nirenberg)を適用する。

<!-- proof-start -->
### 証明

$z\in|K|$ なら $\kappa(z)=0$ であり、[収束障害の消滅とMaurer–Cartan可積分性](#thm-def1-07-convergent-mc)から $F(z)=0$。固定点のゲージ条件 $d^*\phi=0$ も成立するので、[小さい可積分解の楕円型正則性](#lem-def1-07-elliptic-bootstrap)から $\phi(z)$ は滑らかである。

さらに $\phi(0)=0$、$H^s\hookrightarrow C^0$ なので $U$ を縮小し、$\|\phi(z)\|_{C^0}<1$ とできる。局所的に反正則方向 $\bar v$ を $\bar v+\phi(\bar v)$ へ送るグラフと、その共役の交点を考える。両方に属するベクトルがあるなら、正則・反正則成分の比較から $(I-\bar\phi\phi)\bar v=0$ となる。$\|\bar\phi\phi\|<1$ なのでNeumann級数によって $I-\bar\phi\phi$ は可逆、従って $\bar v=0$ である。階数はそれぞれ $n$ であるからグラフと共役は直和になる。

[Maurer–Cartan可積分性定理](../DEF1-03/index.md#thm-def1-03-maurer-cartan)は、この直和条件と $F=0$ の下でグラフのLie括弧閉性を与える。ここへ[Newlander–Nirenberg定理](../../CM/CM1-07/index.md#thm-cm1-07-newlander-nirenberg)を適用すると局所正則座標が存在し、複素構造が得られる。$z=0$ では $\phi=0$、調和成分の等式は既に証明済みである。$\square$
<!-- proof-end -->

**どこまで構成したか。** $K$ は収束正則方程式で定まる（非被約構造を含む）有限次元解析空間の芽であり、台集合の各点は実際の滑らかな可積分複素構造を指定する。$H^s$ 値の解はパラメータに正則に依存する。一方、基底の全ての無限小方向を実際の小変形族がどう通るか、任意の族を引き戻せるか、また非被約基底上の相対複素空間をどう実現するかについては追加の相対的な議論を要する。次のDEF1-08で局所完全性と自己同型の問題を扱う。

## 7. 演習――形式解と解析的解をつなぐ

<a id="ex-def1-07-a01"></a>
#### DEF1-07-A01 微分損失と回復
- Level: A

$s>n+2$ について、$u,v\in H^s_1$ の括弧と $h_2[u,v]$ が属するSobolev空間を順に答えよ。$h_2$ の代わりに $d^*$ だけを使うと何が失敗するか。

<!-- solution-start -->
**詳細解答。** 括弧の局所式は $u\partial_zv+v\partial_zu$ 型であり、微分は $H^s$ を $H^{s-1}$ へ移す。$s-1>n$ の積評価で $[u,v]\in H^{s-1}_2$。Green作用素は $G_2:H^{s-1}_2\to H^{s+1}_2$、随伴は $d^*:H^{s+1}_2\to H^s_1$ なので $h_2[u,v]\in H^s_1$。$d^*$ だけなら $H^{s-1}\to H^{s-2}$ であり、固定点の出力が入力と同じ $H^s$ に戻らない。
<!-- solution-end -->

<a id="ex-def1-07-a02"></a>
#### DEF1-07-A02 縮小定数を出す
- Level: A

$\|B(u,v)\|\le C\|u\|\|v\|$、$\|t\|=\delta$ とする。半径 $R=2\delta$ の球で $T_t(u)=t-\frac12B(u,u)$ が自己写像かつ縮小となる $\delta$ の条件を導け。

<!-- solution-start -->
**詳細解答。** $\|T_t(u)\|\le\delta+\frac C2(2\delta)^2=\delta+2C\delta^2$。$2C\delta\le1$ なら右辺は $2\delta=R$ 以下となる。差は $B(u,u)-B(v,v)=B(u-v,u)+B(v,u-v)$ なので $\|T_t(u)-T_t(v)\|\le\frac C2(\|u\|+\|v\|)\|u-v\|\le2C\delta\|u-v\|$。厳密な縮小には $2C\delta<1$ を選べばよい。
<!-- solution-end -->

<a id="ex-def1-07-a03"></a>
#### DEF1-07-A03 二次Taylor係数
- Level: A

$t=\varepsilon\alpha$、$\alpha\in\mathcal H_T^1$ とする。収束固定点解の $\varepsilon$ の一次・二次係数を求め、$\kappa(\varepsilon)$ の二次係数を書け。

<!-- solution-start -->
**詳細解答。** $\phi=\varepsilon\phi_1+\varepsilon^2\phi_2+\cdots$ を代入し、一次は $\phi_1=\alpha$。二次では $\phi_2=-\frac12h_2[\phi_1,\phi_1]=-\frac12h_2[\alpha,\alpha]$。$\kappa=\frac12H_2[\phi,\phi]$ に代入すると括弧の最低次数は2なので、$\kappa(\varepsilon)=\frac{\varepsilon^2}{2}H_2[\alpha,\alpha]+O(\varepsilon^3)$。これは[二次障害](../DEF1-05/index.md#def-def1-05-primary-obstruction)の調和代表である。
<!-- solution-end -->

<a id="ex-def1-07-a04"></a>
#### DEF1-07-A04 一次接空間と障害
- Level: A

$\kappa(0)=D\kappa(0)=0$ のとき、$K=\kappa^{-1}(0)$ のZariski接空間を計算せよ。また $\kappa(w)=w^2$ の模型から、接空間の次元と台集合の次元は一致するとは限らないことを示せ。

<!-- solution-start -->
**詳細解答。** 接空間は方程式の一次微分の共通核 $\ker D\kappa(0)$ なので、$D\kappa(0)=0$ により $\mathbb C^m$ 全体である。$\kappa(w)=w^2$ では微分 $2w$ は原点で零で接空間は一次元。一方、零点の台集合は $\{0\}$ の一点で次元0である。商環 $\mathbb C\{w\}/(w^2)$ の $w$ が非零冪零元として残る点が、被約な一点との違いになる。
<!-- solution-end -->

<a id="ex-def1-07-b01"></a>
#### DEF1-07-B01 優級数の半径
- Level: B

$a_1=M>0$、$a_r=\frac C2\sum_{i=1}^{r-1}a_i a_{r-i}$ で $C>0$ とする。母関数の二次方程式を立て、$a_2,a_3$ と収束半径の下界を求めよ。

<!-- solution-start -->
**詳細解答。** $A=\sum_{r\ge1}a_rw^r$ と置くと、$r\ge2$ の畳み込みは $A^2$ の係数なので $A=Mw+\frac C2A^2$。原点で $A(0)=0$ の枝を選んで $A=(1-\sqrt{1-2CMw})/C$。直接の再帰で $a_2=\frac C2M^2$、$a_3=\frac C2(a_1a_2+a_2a_1)=\frac{C^2}{2}M^3$。平方根の級数は $|2CMw|<1$ で収束するので半径は少なくとも $(2CM)^{-1}$。もう一方の二次方程式の枝は定数項 $2/C$ となり、求める形式解には対応しない。
<!-- solution-end -->

<a id="ex-def1-07-b02"></a>
#### DEF1-07-B02 Bianchiからノルム判定へ
- Level: B

$F=\kappa+T_\phi F$、$\|T_\phi\|\le q<1$ とする。$\kappa=0$ なら $F=0$ を示し、一般の $\kappa$ に対して $\|F\|\le(1-q)^{-1}\|\kappa\|$ を導け。小ささの条件を外すと、なぜこの推論が成立しないか。

<!-- solution-start -->
**詳細解答。** $\kappa=0$ なら $\|F\|=\|T_\phi F\|\le q\|F\|$、従って $(1-q)\|F\|\le0$。$1-q>0$ なので $F=0$。一般には $\|F\|\le\|\kappa\|+q\|F\|$ を移項し、$(1-q)\|F\|\le\|\kappa\|$ より結論を得る。$q\ge1$ では移項後の係数は正とは限らない。例えば一次元で $T=I$、$\kappa=0$ とすれば $F=TF$ は全ての $F$ を許し、零とは結論できない。
<!-- solution-end -->

<a id="ex-def1-07-b03"></a>
#### DEF1-07-B03 非被約基底上での曲率
- Level: B

$\kappa(z)=\sum_{j=1}^r\kappa_j(z)\eta_j$、$\|T_{\phi(z)}\|<1$ とする。$F$ が正則関数イデアル $(\kappa_1,\ldots,\kappa_r)$ に属することを、Neumann級数の収束を明示して示せ。台集合だけで $F=0$ と言うのと何が異なるか。

<!-- solution-start -->
**詳細解答。** $\sum_{k\ge0}T_\phi^k$ は作用素ノルムで収束し、各項は正則写像 $\phi(z)$ と連続双線形写像から得られるので、局所的に一様な $q<1$ を選べば和も正則である。$\eta_j$ に作用させた $A_j(z)=\sum_{k\ge0}T_{\phi(z)}^k\eta_j$ は $H^{s-1}$ 値正則写像。従って $F(z)=\sum_j\kappa_j(z)A_j(z)$。商環 $\mathcal O_{\mathbb C^m,0}/(\kappa_1,\ldots,\kappa_r)$ へ写すと $F=0$ となる。台集合での点ごとの零性だけでは、例えば $w$ は $w^2=0$ の台集合上で零でも商環 $\mathbb C\{w\}/(w^2)$ の元として非零なので、非被約構造での零性を保証しない。
<!-- solution-end -->

<a id="ex-def1-07-b04"></a>
#### DEF1-07-B04 調和障害空間が非零でも無障害
- Level: B

平坦な二次元複素トーラスで、調和次数2形式が非零であること、任意の調和一次形式 $t$ に対し $\kappa(t)=0$ であることを検証せよ。基底の接空間と台集合の局所次元を求めよ。

<!-- solution-start -->
**詳細解答。** 大域定数枠により

$$
\eta=d\bar w^1\wedge d\bar w^2\otimes\partial_{w^1}
$$

は非零、閉かつ余閉である。ゆえに調和で、$H^2(X,T_X)\ne0$。

調和一次形式の係数も定数である。[括弧の局所式](../DEF1-03/index.md#def-def1-03-bracket)の正則方向微分は全て零なので $[t,t]=0$。固定点式へ $\phi=t$ を代入すると成立し、一意性から解は $t$。よって $\kappa=\frac12H_2[t,t]=0$。

一次調和空間は二つの $d\bar w^j$ と二つの $\partial_{w^i}$ の組で複素次元4。従って $K$ は原点近傍で $\mathbb C^4$ の開集合、接空間・局所次元とも4である。
<!-- solution-end -->

<a id="ex-def1-07-c01"></a>
#### DEF1-07-C01 解析的Kuranishi構成を一巡する
- Level: C

コンパクトHermite複素多様体 $X$、$s>n+2$、調和方向 $t(z)$ を仮定する。$B(u,v)=h_2[u,v]$ の評価から固定点解を構成し、$\kappa$ と $K$ を定義して $T_0K$ を求めよ。さらに $z\in|K|$ でMC方程式と滑らかな複素構造が得られることを、必要な小ささと正則性の条件を列挙して証明せよ。最後に本章から**まだ**言えないことを一つ挙げよ。

<!-- solution-start -->
**詳細解答。** 括弧の一階微分で $H^s\times H^s\to H^{s-1}$、Green作用素と随伴で $h_2:H^{s-1}\to H^s$。従って

$$
\|B(u,v)\|_{H^s}\le C\|u\|_{H^s}\|v\|_{H^s}.
$$

$R=2\|t\|$、$2C\|t\|<1$ を選べば、$T_t(u)=t-\frac12B(u,u)$ は半径 $R$ の球の縮小写像で、唯一の $\phi$ に収束する。

$P(t,\phi)=\phi-t+\frac12B(\phi,\phi)$ は複素Banach空間上正則で $D_\phi P(0,0)=I$。反復の一様収束から $\phi(z)$ は正則で、$H_1\phi=t$、$d^*\phi=0$。

$\kappa(z)=\frac12H_2[\phi,\phi]$ は有限次元正則写像であり、基底を選んだ成分 $\kappa_j$ により $K$ の局所環は $\mathcal O_{\mathbb C^m,0}/(\kappa_j)$。$\phi(0)=0$ だから $D\kappa(0)=0$ となり、$T_0K=\mathbb C^m\simeq H^1(X,T_X)$。

$q=\frac12[\phi,\phi]$、$F=d\phi+q$ と置く。[Green作用素の連鎖ホモトピー恒等式](../DEF1-06/index.md#lem-def1-06-homotopy)と[接束値Dolbeault複体の括弧恒等式](../DEF1-05/index.md#lem-def1-05-graded-identities)を順に使うと

$$
F=\kappa+h_3dq,\qquad dq=[F,\phi],\qquad F=\kappa+T_\phi F.
$$

$s>n+2$ の積評価から $\|T_\phi\|\le C'\|\phi\|_{H^s}$。原点近くを縮めてこの値を1未満にすれば、$\kappa(z)=0$ から $F=0$ が従う。

さらにゲージ条件 $d^*\phi=0$ と連立し、$D=(d,d^*)$ の単射楕円主記号への小さい一次摂動として差分商・楕円型評価を反復すると、$\phi$ は滑らかになる。

最後に $H^s\hookrightarrow C^0$ と $\phi(0)=0$ から $\|\phi\|_{C^0}<1$ とできる。このとき $I-\bar\phi\phi$ は可逆なのでグラフと共役は直和になる。[MC可積分性](../DEF1-03/index.md#thm-def1-03-maurer-cartan)と[Newlander–Nirenberg定理](../../CM/CM1-07/index.md#thm-cm1-07-newlander-nirenberg)を使えば、滑らかな可積分複素構造を得る。

ただし、この構成だけでは任意の小変形族が $K$ から引き戻せる局所完全性や、異なるパラメータの同型類の一意性は示されていない。
<!-- solution-end -->
