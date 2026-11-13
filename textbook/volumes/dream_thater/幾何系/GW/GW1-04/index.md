# GW1-04 正則性・横断性と多重被覆

<!-- definition-example-audit: strict -->

## 1. 指数と、実際に動かせる方向は違う

[前講のFredholm定理](../GW1-03/index.md#thm-gw1-03-fredholm)は、固定した閉Riemann面からの擬正則写像 $u$ の線形化 $D_{u,J}$ の核と余核が有限次元であることを示した。[実指数公式](../GW1-03/index.md#thm-gw1-03-index)はその**差**を計算する。しかし差が分かっても、余核が消えるとは限らない。

有限次元の例として $F:\mathbb R^2\to\mathbb R$、$F(a,b)=a^2$ を見る。$(0,0)$ は零点だが $dF_{(0,0)}=0$ であり、核は二次元、余核は一次元で指数は1。一方、実際の零点集合 $\{a=0\}$ は一次元だが、線形化だけから滑らかさを導いたのではない。この偶然の一致を一般には信用できない。**零点で微分が値域へ全射である**ことを、指数とは別に確認する必要がある。

本講では $(X^{2m},\omega)$ をコンパクトで境界のないシンプレクティック多様体、$(\Sigma,j)$ をコンパクト・連結・境界なしRiemann面とする。$J$ は $\omega$ に馴らされた滑らかな概複素構造で、$u:\Sigma\to X$ は非定数の滑らかな $J$-正則写像とする。

馴らされるとは、零でない $v$ に対し $\omega(v,Jv)>0$ が成り立つことをいう（[適合構造との違い](../../SYM/SYM8/index.md#def-sym8-tame)）。写像は当面、**パラメータ付きで定義域の複素構造も固定**する。

本講で調べるのは、解が滑らかな関数になるかどうかではなく、線形化が全射になり解集合の局所構造を決められるかどうかである。

## 2. どの空間で横断性を測るか

方程式の値は[非線形Cauchy–Riemann作用素](../GW1-02/index.md#def-gw1-02-cr-operator)によって与えられる。$k\ge2$、$p>2$ を固定し、$W^{k,p}(\Sigma,X)$ の写像空間を使う。二次元で $kp>2$ なので写像は連続であり、指数写像を使って近傍をBanach座標にできる。

標的に沿う束を $E=u^*TX$、値域束を $F=\Lambda^{0,1}_{j,J}T^*\Sigma\otimes E$ と置く。写像方向の接空間を $W^{k,p}(E)$、値域を $W^{k-1,p}(F)$ と識別する。異なる写像の値域束は局所的に接続で自明化する。

<a id="def-gw1-04-regular"></a>

<!-- formal-statement-start -->
> **定義（正則な擬正則写像）**  
> 閉Riemann面 $(\Sigma,j)$ と滑らかな概複素構造 $J$ を固定し、滑らかな $J$-正則写像 $u:\Sigma\to X$ の線形化

$$
D_{u,J}:W^{k,p}(u^*TX)\longrightarrow
W^{k-1,p}(\Lambda^{0,1}_{j,J}T^*\Sigma\otimes u^*TX)
$$

> が全射であるとき、$u$ は**固定した $(j,J)$ に関して正則**であるという。全射性は $\operatorname{coker}D_{u,J}=0$ と同値である。
<!-- formal-statement-end -->

<!-- definition-example-start: def-gw1-04-regular -->
**定義の確認**。標準複素構造の $\mathbb{CP}^1$ から自身への $u(z)=z^d$（$d\ge1$、無限遠点まで延長）を考える。引戻し接束は $u^*T\mathbb{CP}^1\simeq\mathcal O(2d)$。可積分標的での線形化はDolbeault作用素であり、[射影直線の線束コホモロジー](../../../代数系/AG/AG3-08/index.md#thm-ag3-08-p1-cohomology)を $n=2d\ge0$ に適用すると $H^1(\mathbb{CP}^1,\mathcal O(2d))=0$。楕円型正則性によりSobolev余核も零だから、**この例は $d\ge2$ で一般の点に複数の逆像があっても正則**である。全射性は写像が一対一かどうかとは独立に判定する。
<!-- definition-example-end -->

ここで「横断性」の対象は、無限次元の写像空間上の切断 $\bar\partial_J$ の**零切断との交わり**である。各零点で線形化が全射なら、その局所解集合に[陰関数定理の発想](../../../基礎科目/RA/RA6A/index.md#thm-ra6a-implicit-function)を使える。有限次元版と異なり、Banach版では全射な線形化の核が補空間を持つ必要があるが、[Fredholm性](../GW1-03/index.md#thm-gw1-03-fredholm)から有限次元の核を選び閉補空間へ分解できる。

<a id="prop-gw1-04-local-moduli"></a>

<!-- formal-statement-start -->
> **命題（正則な零点の局所解空間）**  
> $(\Sigma,j)$、$(X,J)$ を固定し、$u:\Sigma\to X$ を滑らかな $J$-正則写像とする。$D_{u,J}$ が全射なら、パラメータ付きの $J$-正則写像全体は $u$ の近傍で有限次元の滑らかな多様体となり、接空間は $\ker D_{u,J}$、実次元は

$$
\operatorname{ind}_{\mathbb R}D_{u,J}
=m(2-2g)+2\langle c_1(TX),u_*[\Sigma]\rangle.
$$

> これは標点、定義域の自己同型による商、定義域の複素構造の変形をまだ数えていない。
<!-- formal-statement-end -->

### 証明の見取り図

像の方向と核の方向を分けると、方程式を像の方向について解ける。全射性によって余核方向の追加方程式が残らない。

<!-- proof-start -->
### 証明

$B=W^{k,p}(E)$、$C=W^{k-1,p}(F)$ とする。[Fredholm性](../GW1-03/index.md#thm-gw1-03-fredholm)と全射性より $K=\ker D_{u,J}$ は有限次元で、閉補空間 $B'$ を選んで $B=K\oplus B'$ とできる。$D_{u,J}|_{B'}:B'\to C$ は有界な全単射であり、有界逆写像定理で逆は有界。

指数座標での非線形方程式を $G(a,b)=0$（$a\in K,\ b\in B'$）と書く。$G(0,0)=0$ で、$d_bG(0,0)=D_{u,J}|_{B'}$ は同型である。

Banach陰関数定理の収縮写像による証明では、次の写像を用いる。

$$
T_a(b)=b-(d_bG(0,0))^{-1}G(a,b).
$$

十分小さい球で $\|d_bT_a\|<1$ とできるので、各小さい $a$ に滑らかな解 $b=b(a)$ がただ一つ対応する。解集合はグラフ $\{(a,b(a))\}$ となり、その接空間は $K$ である。

全射性によって余核は零だから、$\dim K=\operatorname{ind}_{\mathbb R}D_{u,J}$。この指数に[擬正則写像の線形化の実指数公式](../GW1-03/index.md#thm-gw1-03-index)を適用して命題の次元を得る。
<!-- proof-end -->

## 3. 単純曲線と、分岐を伴う多重被覆

パラメータを付け替えて同じ像を通る点が複数できることと、写像全体が高次の被覆を通って因数分解することは異なる。まず点での条件を直接調べる。

<a id="def-gw1-04-injective-point"></a>

<!-- formal-statement-start -->
> **定義（単射な正則点と単純曲線）**  
> 非定数の $J$-正則写像 $u:\Sigma\to X$ の点 $z\in\Sigma$ が、次の二条件を満たすとき、その点を**単射な正則点**という。

$$
du_z\ne0,\qquad u^{-1}(u(z))=\{z\}.
$$

> 単射な正則点が稠密、すなわち任意の空でない開集合に存在する写像を**単純曲線**という。
<!-- formal-statement-end -->

<!-- definition-example-start: def-gw1-04-injective-point -->
**定義の確認**。$u:\mathbb{CP}^1\to\mathbb{CP}^1$ を恒等写像とする。各有限点で $du=1\ne0$、無限遠点近くでも座標 $w=1/z$ で恒等写像の微分は1。各点の逆像はその点一つだけなので、単射な正則点集合は球面全体で稠密である。

一方 $u(z)=z^d$（$d\ge2$）では、$z\ne0,\infty$ は微分 $dz^{d-1}$ が零でないが、$d$ 個の異なる $d$ 乗根が同じ値を取る。$0,\infty$ では逆像は一つでも微分が零。したがって単射な正則点は**一つもなく**、単純ではない。二条件を片方だけ調べてはならない。
<!-- definition-example-end -->

<a id="def-gw1-04-multiple-cover"></a>

<!-- formal-statement-start -->
> **定義（多重被覆）**  
> 閉じたRiemann面からの非定数 $J$-正則写像 $u:\Sigma\to X$ が、次数 $d\ge2$ の正則な分岐被覆 $\varphi:\Sigma\to\Sigma'$ と非定数 $J$-正則写像 $v:\Sigma'\to X$ を用いて $u=v\circ\varphi$ と書けるとき、$u$ を多重被覆という。分岐点とは $\varphi$ の微分が零になる点である。
<!-- formal-statement-end -->

<!-- definition-example-start: def-gw1-04-multiple-cover -->
**定義の確認**。$\Sigma=\Sigma'=\mathbb{CP}^1$、$\varphi(z)=z^3$、$v(z)=z$ とすれば $u(z)=z^3$。一般の $a\ne0,\infty$ について $\varphi(z)=a$ は三つの相異なる解を持つので次数は3、$\varphi'(z)=3z^2$ は $z=0$ で零、無限遠点でも座標 $w=1/z$ で同じ三次の分岐がある。$v$ は恒等写像で正則。分岐と次数をともに確認した。
<!-- definition-example-end -->

一般の閉曲線で「多重被覆ではない」と「単射な正則点が稠密」が同値になることには、$J$-正則方程式の一意接続、局所的な分岐解析、コンパクトな定義域上の貼り合わせが必要である。**定義の似た形だけで同値と断定しない**。ここでは一般位置定理に必要な単射な正則点の稠密性を明示して用いる。射影直線の正則関数の例では、分岐被覆と単純性を座標で直接判定できる。

## 4. $J$ を動かすと欠けた方向を作れる

固定した $J$ で全射性を証明できない場合、許された概複素構造 $J$ 自身を少し動かす。$\mathcal J^\ell_\omega$ を $\omega$ に馴らされた $C^\ell$ 級概複素構造の空間とし、$\ell$ を十分大きく取る。$\omega$-tame 条件は開条件なので、局所的に $J$ の変分が可能である。$J^2=-I$ を微分すると、許される変分 $Y\in T_J\mathcal J^\ell_\omega$ には

$$
YJ+JY=0
$$

が必要である。逆にこの等式を満たす滑らかな束準同型 $Y$ は、$J$ の局所座標を通じて接方向として実現できる。例えば $A=-YJ/2$ とすると $J_\varepsilon=(I+\varepsilon A)J(I+\varepsilon A)^{-1}$ は一次微分 $Y$ を持つ（$AJ-JA=Y$）。小さい $\varepsilon$ でtame性も保たれる。

<a id="def-gw1-04-universal-section"></a>

<!-- formal-statement-start -->
> **定義（普遍Cauchy–Riemann切断）**  
> 上の閉曲面 $\Sigma$、シンプレクティック標的 $(X,\omega)$、$k\ge2$、$p>2$、十分大きい整数 $\ell$ を固定する。写像と概複素構造の組 $(u,J)$ に対し、値域束を局所自明化した方程式

$$
\mathcal F(u,J)=\bar\partial_Ju
$$

> を**普遍Cauchy–Riemann切断**という。その零点は $u$ が $J$-正則である組であり、その微分は $(\xi,Y)$ に作用する。
<!-- formal-statement-end -->

<!-- definition-example-start: def-gw1-04-universal-section -->
**定義の確認**。$X=\mathbb{CP}^1$ に標準 $J_0$ を取り、$u(z)=z^2$ とする。各局所正則座標で $u_s+J_0u_t=0$ なので $\mathcal F(u,J_0)=0$。$Y=0$、$\xi=\bar z$ という局所変分では[前講の局所線形化公式](../GW1-03/index.md#prop-gw1-03-local-linearization)から $\delta\mathcal F(\xi,0)(\partial_s)=1$、零にはならない。したがって普遍零点と、その任意の接変分を取り違えない。
<!-- definition-example-end -->

<a id="prop-gw1-04-universal-linearization"></a>

<!-- formal-statement-start -->
> **命題（普遍線形化）**  
> 滑らかな $J$-正則写像 $u$ において、$YJ+JY=0$ を満たす $J$ の変分と $u$ の変分 $\xi$ に対し、普遍切断の微分は

$$
D\mathcal F_{(u,J)}(\xi,Y)
=D_{u,J}\xi+\tfrac12Y(u)\circ du\circ j.
$$

> 右辺の第2項は反複素線形な1形式で、$J$ を固定した線形化に対する**零階のパラメータ項**である。
<!-- formal-statement-end -->

### 証明の見取り図

線形化には二種類の入力がある。$u$ を動かす項は前講の $D_{u,J}$、$J$ のみを動かす項は式の $J$ を一回微分する。

<!-- proof-start -->
### 証明

$\mathcal F(u,J)=\frac12(du+J(u)\,du\,j)$ を使う。$u$ の変分については[既出の線形化公式](../GW1-03/index.md#prop-gw1-03-local-linearization)がその全寄与を与える。$u$ を固定して $J_\varepsilon$ のみ変分すれば

$$
\left.\frac{d}{d\varepsilon}\right|_0
\tfrac12\{du+J_\varepsilon(u)du\,j\}
=\tfrac12Y(u)\,du\,j.
$$

$u$ が $J$-正則なので $du\,j=Jdu$。したがって $A=\frac12Ydu\,j$ に対して

$$
A(jv)=\tfrac12Ydu(j^2v)=-\tfrac12Ydu(v)
=-JA(v),
$$

最後の等号は $JY=-YJ$ と $du\,j=Jdu$ を順に代入した結果である。よって第2項も正しい値域束に属する。
<!-- proof-end -->

最も重要なのは、変分 $Y$ を標的の小球の内部に台を持つよう選べることだ。単射な正則点 $z$ の近くでは $u$ が局所埋め込みであり、さらに $u^{-1}(u(z))=\{z\}$ と定義域のコンパクト性から、十分小さい標的小球 $V$ について $u^{-1}(V)$ を $z$ の近傍 $U$ に収められる。このことが「曲線の別の枝を同時に動かしてしまう」問題を避ける。

<a id="thm-gw1-04-universal-surjective"></a>

<!-- formal-statement-start -->
> **定理（単純曲線における普遍横断性）**  
> $(X^{2m},\omega)$ を閉シンプレクティック多様体、$(\Sigma,j)$ を閉連結Riemann面とする。$J$ が $\omega$ に馴らされ、$u:\Sigma\to X$ が滑らかな非定数 $J$-正則**単純曲線**なら、普遍切断の線形化

$$
(\xi,Y)\longmapsto
D_{u,J}\xi+\tfrac12Y(u)\,du\,j
$$

> は上記Sobolev値域へ全射である。したがって単純曲線上の普遍零点集合は、適切なBanach完備化のもとで局所的に滑らかなBanach多様体となる。
<!-- formal-statement-end -->

### 証明の見取り図

余核の元を一つ仮定する。写像方向の変分に直交するなら楕円型随伴方程式を満たすので滑らかである。非零になる単射な正則点で $Y$ を局所的に選ぶと、$Y$ 方向との内積が非零になって矛盾する。

<!-- proof-start -->
### 証明

$D_{u,J}$ は[閉曲面Fredholm定理](../GW1-03/index.md#thm-gw1-03-fredholm)により閉像・有限次元余核を持つ。従って普遍微分の像は $D_{u,J}$ の閉像に有限次元商の部分空間を追加したものなので閉じる。全射でないと仮定すると、双対値域の非零元 $\eta$ が全ての $(\xi,Y)$ に対して

$$
\int_\Sigma\langle\eta,D_{u,J}\xi\rangle=0,\qquad
\int_\Sigma\left\langle\eta,\tfrac12Y(u)du\,j\right\rangle=0
$$

を満たす（体積形式と双対束の計量を固定した）。第1式は弱い意味で $D_{u,J}^*\eta=0$ を表す。[楕円型正則性](../GW1-03/index.md#thm-gw1-03-elliptic-estimate)を随伴へ適用すると $\eta$ は滑らかになる。

単純曲線の定義から単射な正則点集合は稠密である。$\eta$ は連続で零ではないから $\eta(z)\ne0$ の開集合があり、そこから単射な正則点 $z$ を取れる。正則座標 $s+it$ の $\partial_s$ で値域を識別し、$v=du_z(\partial_s)\ne0$、$\eta_s=\eta(z)(\partial_s)\ne0$ とする。点 $x=u(z)$ で、$J_x$ と反可換な線形写像 $Y_x$ を $Y_xv$ が任意の指定ベクトル $b$ になるよう選べる。実際、$J$-複素直線 $\operatorname{span}_{\mathbb R}(v,Jv)$ 上で $Y_xv=b$、$Y_x(Jv)=-Jb$ と置き、$J$-不変補空間では零と置けば $Y_xJ+JY_x=0$ である。

$du_z(j\partial_s)=Jv$ なので、普遍線形化の第2項の $\partial_s$ 成分は $\frac12Y_xJv=-\frac12Jb$。$b$ を $\langle\eta_s,-Jb\rangle>0$ となるよう取る。$Y_x$ を近傍へ滑らかに延長し小球 $V$ に台を持たせ、$u^{-1}(V)\subset U$ とする。$\eta$、$du$、$Y$ の連続性から $U$ を縮めて内積を正に保ち、非負の切断関数を掛ければ

$$
\int_\Sigma\left\langle\eta,\tfrac12Y(u)du\,j\right\rangle>0.
$$

これは第2の直交式と矛盾する。ゆえに普遍微分は全射である。Fredholm核の補空間と$J$-方向の有限個の変分を使って右逆を構成できるので、Banach陰関数定理が適用できる。
<!-- proof-end -->

この証明の**単射な正則点**という条件は飾りではない。多重被覆では同じ標的点へ複数の定義域点が集まり、$Y$ を標的に局在化させてもそれらの点の寄与を独立に制御できない。したがって同じ全射性の証明を移せない。ただし、これは「多重被覆は必ず非正則」と言ったことにはならない。

## 5. なぜ一般の $J$ では正則になるか

普遍切断の零点を組 $(u,J)$ で集めた空間から $J$ だけを取り出す射影を考える。$J$ を固定すると、射影のファイバーがその $J$ に関する擬正則写像集合になる。

「一般の $J$」は「一つ選べば必ず正則」ではない。$\mathcal J^\ell_\omega$ の可算個の開稠密集合の共通部分に属する $J$ を指す。この集合が稠密であることは完備距離空間の[Baireのカテゴリー定理](../../../基礎科目/TOP/TOP6/index.md#thm-top6-baire-category)から分かる。実際、任意の開球の内部で、順に各開稠密集合と交わる閉球を半径 $2^{-n}$ 以下になるよう選んで入れ子にすれば、完備性による共通の点がすべての集合に入る。Banach多様体では局所座標による同じ議論を可算被覆へ適用する。

<a id="lem-gw1-04-sard-smale"></a>

<!-- formal-statement-start -->
> **補題（Fredholm写像の一般位置原理）**  
> $M,N$ を可分Banach多様体、$f:M\to N$ を $C^r$ のFredholm写像とし、Fredholm指数を一定の整数 $q$ とする。$r>\max(q,0)$ なら、$df_x$ が全射でない点の値 $f(x)$ の集合は第1類（可算個の閉疎集合の和に含まれる）であり、正則値の集合は残留集合を含む。これはSard–Smaleの定理の本講で使う形である。
<!-- formal-statement-end -->

### 証明の見取り図

無限次元の微分を直接数える代わりに、Fredholm性で有限次元の核と余核を分離する。残った有限次元の関数に通常のSard定理を適用し、可分性で局所結論を数え上げる。

<!-- proof-start -->
### 証明

$x\in M$ を一つ固定する。$df_x$ の核 $K$（実次元 $a$）、余核 $C$（実次元 $b$）を選び、閉補空間を使って $T_xM=K\oplus B'$、$T_{f(x)}N=\operatorname{im}df_x\oplus C$ と分解する。像成分で[陰関数定理](../../../基礎科目/RA/RA6A/index.md#thm-ra6a-implicit-function)を適用すれば局所座標を替えて

$$
f(k,z)=(z,h(k,z)),\qquad
k\in\mathbb R^a,\quad z\in B',\quad h(k,z)\in\mathbb R^b
$$

と書ける。微分は $(\delta k,\delta z)\mapsto(\delta z,\partial_kh\,\delta k+\partial_zh\,\delta z)$。したがって $df$ の全射性は、**有限次元写像 $h_z:\mathbb R^a\to\mathbb R^b$ の微分 $\partial_kh$ の全射性と同値**である。

ここでは有限次元Sard定理を使う。この定理は、$C^r$ 写像 $\mathbb R^a\to\mathbb R^b$ の臨界値の測度が零となる十分条件を $r>\max(a-b,0)$ とする。いま $a-b=q$ だから、各固定 $z$ で $h_z$ の臨界値集合には内点がない。

$k$ の座標領域を可算個のコンパクト集合 $K_n$ で尽くす。臨界点の $(k,z)$ を $K_n$ に制限して $f$ で写した集合は、相対的に閉じている。実際、$(z_i,h(k_i,z_i))\to(z,c)$ なら、$K_n$ のコンパクト性によって $k_i$ の収束部分列を取れる。その極限でも微分の非全射性は階数条件として保たれる。

各固定 $z$ のスライスは内点を持たないため、上の閉集合全体にも内点はない。したがって局所的な臨界値集合は可算個の閉疎集合に含まれる。

$M$ と $N$ の可分性により第二可算な座標近傍を選んで上の議論を可算回繰り返せる。このような可算個の閉疎集合の和の補集合が残留集合であることは、残留の定義と直前に示した完備性の議論から従う。ここで用いた外部の有限次元入力はSard定理だけであり、無限次元での結論が成立する理由は**核と余核の有限次元性**と**可算被覆**にある。
<!-- proof-end -->

<a id="thm-gw1-04-generic-regularity"></a>

<!-- formal-statement-start -->
> **定理（単純曲線に対する一般のJの正則性）**  
> $(X^{2m},\omega)$ を閉シンプレクティック多様体、$(\Sigma,j)$ を固定した閉連結Riemann面、$\beta\in H_2(X;\mathbb Z)$ を固定する。十分大きい $\ell$ に対し、$\omega$ に馴らされた $C^\ell$ 概複素構造の空間には残留集合 $\mathcal J_{\mathrm{reg}}$ が存在し、任意の $J\in\mathcal J_{\mathrm{reg}}$ と、$u_*[\Sigma]=\beta$ を満たす非定数の滑らかな単純 $J$-正則写像 $u$ について $D_{u,J}$ は全射である。これは**固定した定義域 $(\Sigma,j)$ のパラメータ付き単純曲線**についての主張である。
<!-- formal-statement-end -->

### 証明の見取り図

前定理で普遍零点集合が滑らかになった。そこから $J$ を取り出す射影がFredholmであることと、射影の正則値では固定$J$の線形化が全射になることを調べ、[Fredholm写像の一般位置原理](#lem-gw1-04-sard-smale)を適用する。

<!-- proof-start -->
### 証明

$\mathcal M^*=\{(u,J):\mathcal F(u,J)=0,\ u\text{ は単純},\ u_*[\Sigma]=\beta\}$ とする。単純性はここでの局所議論に適した開条件として扱う。[単純曲線における普遍横断性](#thm-gw1-04-universal-surjective)から $\mathcal M^*$ はBanach多様体で、接空間は

$$
T_{(u,J)}\mathcal M^*
=\{(\xi,Y):D_{u,J}\xi+K_uY=0\},\qquad
K_uY=\tfrac12Y(u)\,du\,j.
$$

射影 $\pi(u,J)=J$ の微分は $(\xi,Y)\mapsto Y$ である。$\ker d\pi=\{(\xi,0):D_{u,J}\xi=0\}$ は有限次元。$Y$ が $d\pi$ の像にあることは $K_uY\in\operatorname{im}D_{u,J}$ と同値であり、その余核を有限次元空間 $\operatorname{coker}D_{u,J}$ へ写す

$$
\Theta:T_J\mathcal J^\ell_\omega\longrightarrow\operatorname{coker}D_{u,J},
\qquad \Theta(Y)=[K_uY]
$$

の核が $\operatorname{im}d\pi$ になる。普遍線形化の全射性から $\Theta$ は全射だから、$\operatorname{coker}d\pi\simeq\operatorname{coker}D_{u,J}$。よって $\pi$ はFredholmで、指数は $\dim\ker D-\dim\operatorname{coker}D=\operatorname{ind}D$。

[一般位置補題](#lem-gw1-04-sard-smale)を、$r>\max(\operatorname{ind}D,0)$ となるよう $\ell$ を十分大きくした射影 $\pi$ へ適用すると、正則値 $J$ は残留集合を含む。正則値とは全ての $(u,J)$ で $d\pi$ が全射という意味であり、上の余核同型から各 $D_{u,J}$ の全射性を得る。$J$ の $C^\infty$ 版では適切な可算段階の交差を取る。$\beta$ と種数を可算個同時に課す場合にも可算交差を使えるが、ここでは固定した $(\Sigma,j,\beta)$ に限った。
<!-- proof-end -->

「一般の $J$」を選んでも、ここで証明したのは**単純曲線に沿う**線形化の全射性だけである。多重被覆の正則性、定義域の複素構造も動かす問題、Gromovコンパクト性、評価写像の横断性、閉じたモジュライの基本類構成は別の論点である。

## 6. 多重被覆は何を壊し、何を壊さないか

まず「多重被覆は必ず非正則」という誤解を捨てる。第2節の $z^d:\mathbb{CP}^1\to\mathbb{CP}^1$ は多重被覆でも余核が零だった。問題は、**一般位置証明に使う単射な正則点が存在しない**ことであり、特定の多重被覆が全射であることは排除しない。

一方、余核が実際に現れるモデルも計算できる。$\mathbb{CP}^1$ 上の二つの負の線束の直和

$$
N=\mathcal O(-1)\oplus\mathcal O(-1)
$$

の全空間を複素三次元多様体 $X=\operatorname{Tot}(N)$ とする。零切断 $C\simeq\mathbb{CP}^1$ に沿って接束は $TC\oplus N$ に分裂する。これは全空間の零切断上では垂直接空間が $N$、零切断の微分が水平の $TC$ を与えることによる。$u_d:\mathbb{CP}^1\to C\subset X$、$u_d(z)=z^d$ とすると

$$
u_d^*TX\simeq\mathcal O(2d)\oplus
\mathcal O(-d)\oplus\mathcal O(-d).
$$

このモデルの標的は**非コンパクト**であり、一般の閉標的のGW不変量をそのまま定義する例ではない。局所的な変形・障害の差を計算するために使う。

<a id="prop-gw1-04-multiple-obstruction"></a>

<!-- formal-statement-start -->
> **命題（負の法束を持つ球面の多重被覆）**  
> 上記の標準可積分複素構造を持つ $X=\operatorname{Tot}(\mathcal O(-1)\oplus\mathcal O(-1))$ と次数 $d\ge1$ の $u_d$ に対し

$$
\begin{aligned}
\dim_{\mathbb R}\ker D_{u_d}&=4d+2,\\
\dim_{\mathbb R}\operatorname{coker}D_{u_d}&=4\max(d-1,0),\\
\operatorname{ind}_{\mathbb R}D_{u_d}&=6.
\end{aligned}
$$

> 特に $d=1$ は正則だが、$d\ge2$ の多重被覆は非正則である。
<!-- formal-statement-end -->

### 証明の見取り図

射影直線上の $\mathcal O(n)$ の $H^0,H^1$ を、正の接方向と負の二つの法方向へそれぞれ適用する。指数は個別の核・余核と異なり $d$ に依存しない。

<!-- proof-start -->
### 証明

標準可積分複素構造のため $D_{u_d}$ は引戻し正則束のDolbeault作用素である。[射影直線の線束コホモロジー](../../../代数系/AG/AG3-08/index.md#thm-ag3-08-p1-cohomology)によると、$n\ge0$ では $h^0(\mathcal O(n))=n+1,\ h^1=0$、$n\le-2$ では $h^0=0,\ h^1=-n-1$、$n=-1$ では両方0である。

従って $d\ge1$ なら

$$
\begin{aligned}
h^0(u_d^*TX)&=(2d+1)+0+0=2d+1,\\
h^1(u_d^*TX)&=0+2\max(d-1,0).
\end{aligned}
$$

複素次元を二倍すると核は $4d+2$、余核は $4\max(d-1,0)$ となり、$d\ge1$ について差は $(4d+2)-4(d-1)=6$。あるいは引戻し束の次数は $2d-d-d=0$、複素階数は3、$g=0$ なので[擬正則写像の線形化の実指数公式](../GW1-03/index.md#thm-gw1-03-index)から $2\cdot3+2\cdot0=6$ と独立に検算できる。
<!-- proof-end -->

零切断への次数 $d$ の正則写像は、共通零点のない次数 $d$ の斉次多項式二本 $(P,Q)$ で表される。各多項式には $d+1$ 個の複素係数があり、組全体の共通スケールを除くと複素次元は $2d+1$ になる。

球面のMöbius変換全体を表す $PSL(2,\mathbb C)$ は実次元6、複素次元3である。再パラメータ化で商を取ると複素次元 $2d-2$、実次元 $4d-4$ の被覆族が残る。

一方、種数0の**無標点・商後**の期待実次元は $6-6=0$。$d\ge2$ の線形化には実次元 $4d-4$ の余核があり、その過剰次元をちょうど説明する。有限個の自己同型（例えば $z^d$ の $d$ 乗根による回転）は局所次元を変えないが、後の計数では重みの問題を生む。

## 7. 自己同型を商に取る際の次元と限界

$\Sigma=\mathbb{CP}^1$ の複素自己同型はMöbius変換群 $PSL(2,\mathbb C)$ で実次元6である（[三点で自己同型を固定する議論](../GW1-01/index.md#prop-gw1-01-three-marks)）。

単純曲線 $u$ について $u\circ\gamma=u$ となる球面自己同型 $\gamma$ を考える。単射な正則点 $z$ では $u(\gamma(z))=u(z)$ から $\gamma(z)=z$ である。単射な正則点は稠密なので、$\gamma$ は少なくとも三つの異なる点を固定する。[球面の三点で自己同型が決まる性質](../GW1-01/index.md#prop-gw1-01-three-marks)から $\gamma$ は恒等写像だけである。

これに対し $u(z)=z^d$（$d\ge2$）では、$d$ 乗して1になる複素数 $\zeta$ による変換 $\gamma(z)=\zeta z$ が $u\circ\gamma=u$ を満たす。したがって単純曲線と被覆写像では、商に残る自己同型が異なる。

標点 $z_1,\ldots,z_k$ を相異なる点として動かすと、各標点で実2次元を加える。種数0、固定した球面の複素構造で、単純曲線が正則であり再パラメータ化群作用を局所的に商に取れる場合、実次元は

$$
\operatorname{ind}_{\mathbb R}D_{u,J}+2k-6
=2\bigl(m-3+\langle c_1(TX),\beta\rangle+k\bigr).
$$

**何を引き何を足したか**を区別する。指数はパラメータ付き写像から、$-6$ は球面の自己同型から、$+2k$ は標点位置から来る。負の期待次元なら正則な解は存在し得ないが、非正則な多重被覆はこの推論の対象外である。一般の種数、節点、泡立ち、安定写像、虚次元への拡張は以後の講義で行う。

## 8. 演習：横断性を仮定と計算で見極める

### Level A

<a id="ex-gw1-04-a01"></a>
#### GW1-04-A01 指数と全射性を区別する
- Level: A

$A:\mathbb R^3\to\mathbb R^2$ を $A(x,y,z)=(x,0)$ とする。核・余核・指数を求め、全射性を判定せよ。

<!-- solution-start -->
**詳細解答**。$A(x,y,z)=0$ は $x=0$ で、$y,z$ が自由なので $\dim\ker A=2$。像は $\{(a,0):a\in\mathbb R\}$、余核は第2成分を代表とする一次元空間。よって[指数の定義](../GW1-03/index.md#def-gw1-03-fredholm)から $\operatorname{ind}A=2-1=1$。余核が零でないので全射ではない。指数1という情報だけで全射性を結論できない。
<!-- solution-end -->

<a id="ex-gw1-04-a02"></a>
#### GW1-04-A02 被覆の単射な正則点
- Level: A

$\varphi(z)=z^2:\mathbb{CP}^1\to\mathbb{CP}^1$ の単射な正則点が存在するか、$z=0$、$z=1$、$z=\infty$ に分けて判定せよ。

<!-- solution-start -->
**詳細解答**。$z=0$ は $\varphi^{-1}(0)=\{0\}$ だが $\varphi'(0)=0$ なので不適格。$z=1$ は $\varphi'(1)=2\ne0$ だが逆像は $\{1,-1\}$ なので不適格。無限遠で $w=1/z$ とすれば写像は $w\mapsto w^2$ で微分が0。その他の $z\ne0,\infty$ では微分は非零でも、$z$ と $-z$ が同じ値に写る。ゆえに[単射な正則点の定義](#def-gw1-04-injective-point)を満たす点はない。
<!-- solution-end -->

<a id="ex-gw1-04-a03"></a>
#### GW1-04-A03 概複素構造の変分
- Level: A

$J^2=-I$ を微分して $YJ+JY=0$ を導け。また $v\ne0$ に対して $Yv=b$ と $Y(Jv)=-Jb$ が矛盾しない理由を示せ。

<!-- solution-start -->
**詳細解答**。$J_\varepsilon^2=-I$ から $\frac d{d\varepsilon}|_0J_\varepsilon^2=YJ+JY=0$。$v,Jv$ が実線形独立であることは、$Jv=av$ だと $J^2v=a^2v=-v$ となり実数 $a$ で不可能なため分かる。したがって二つの基底ベクトルの像をそれぞれ $b,-Jb$ と指定して実線形写像を定められ、$YJ(v)=-JY(v)$ と $YJ(Jv)=Y(-v)=-b=-JY(Jv)$ の両方が成り立つ。
<!-- solution-end -->

<a id="ex-gw1-04-a04"></a>
#### GW1-04-A04 普遍線形化の符号
- Level: A

$u$ が $J$-正則で $v=du(\partial_s)$ のとき、$\tfrac12Yduj$ の $\partial_s$ 成分を $Yv$ で表せ。

<!-- solution-start -->
**詳細解答**。[普遍線形化公式](#prop-gw1-04-universal-linearization)の第2項に $j\partial_s=\partial_t$ を代入する。擬正則性 $duj=Jdu$ より $du(\partial_t)=Jv$。ゆえに $\tfrac12Ydu(j\partial_s)=\tfrac12YJv=-\tfrac12JYv$。最後の負号は $YJ+JY=0$ に由来する。
<!-- solution-end -->

<a id="ex-gw1-04-a05"></a>
#### GW1-04-A05 商と標点の次元
- Level: A

$X=\mathbb{CP}^2$、$\Sigma=\mathbb{CP}^1$、次数1の正則な単純写像について、$c_1(TX)\cdot\beta=3$ とする。標点2個の商後の期待実次元を求めよ。

<!-- solution-start -->
**詳細解答**。$m=2,g=0$、与えられたChern数は3。[指数公式](../GW1-03/index.md#thm-gw1-03-index)からパラメータ付き指数は $2m+2c_1\cdot\beta=4+6=10$。標点二つで $+4$、球面自己同型の商で $-6$ だから $10+4-6=8$。複素次元なら4であり、実次元8との混同に注意する。
<!-- solution-end -->

### Level B

<a id="ex-gw1-04-b01"></a>
#### GW1-04-B01 多重被覆でも全射になる理由
- Level: B

標準複素構造での $u(z)=z^3:\mathbb{CP}^1\to\mathbb{CP}^1$ の引戻し接束、核と余核の実次元を求め、単純性・正則性を別々に判定せよ。

<!-- solution-start -->
**詳細解答**。$T\mathbb{CP}^1\simeq\mathcal O(2)$ で次数3の引戻しは $\mathcal O(6)$。[線束コホモロジー](../../../代数系/AG/AG3-08/index.md#thm-ag3-08-p1-cohomology)を $n=6$ に代入すると $h^0=7$、$h^1=0$。従って $\dim_{\mathbb R}\ker D=14$、余核実次元0。全射なので[正則性の定義](#def-gw1-04-regular)を満たす。一方 $z^3$ は次数3の分岐被覆を通るので[多重被覆の定義](#def-gw1-04-multiple-cover)を満たし、単純ではない。正則性と単純性は別の条件である。
<!-- solution-end -->

<a id="ex-gw1-04-b02"></a>
#### GW1-04-B02 普遍射影の余核
- Level: B

Fredholm作用素 $D:B\to C$ と線形作用素 $K:P\to C$ があり $(\xi,Y)\mapsto D\xi+KY$ が全射だとする。$T=\{(\xi,Y):D\xi+KY=0\}$、$\pi:T\to P$、$\pi(\xi,Y)=Y$ と置く。$\ker\pi$ と $\operatorname{coker}\pi$ を $D$ で表せ。

<!-- solution-start -->
**詳細解答**。$\pi(\xi,Y)=0$ は $Y=0$ を意味し、$D\xi=0$ なので $\ker\pi\simeq\ker D$。$Y$ が $\operatorname{im}\pi$ に属する条件は、ある $\xi$ に対して $D\xi=-KY$ が解けること、すなわち $[KY]=0$ in $C/\operatorname{im}D$。$\Theta(Y)=[KY]$ と置けば $\ker\Theta=\operatorname{im}\pi$。普遍写像の全射性により任意の $[c]$ は $D\xi+KY=c$ と表せるため $\Theta$ は全射。従って $P/\operatorname{im}\pi\simeq C/\operatorname{im}D$、すなわち余核は同型であり、指数も等しい。
<!-- solution-end -->

<a id="ex-gw1-04-b03"></a>
#### GW1-04-B03 負の法束と二つの余核成分
- Level: B

$X=\operatorname{Tot}(\mathcal O(-1)\oplus\mathcal O(-1))$ の零切断を次数2で被覆する $u_2$ について、束の分裂、核と余核の複素次元、実指数を計算せよ。

<!-- solution-start -->
**詳細解答**。零切断上の接方向は $\mathcal O(2)$、法方向は $\mathcal O(-1)$ が二つ。次数2の引戻しにより $u_2^*TX=\mathcal O(4)\oplus\mathcal O(-2)\oplus\mathcal O(-2)$。[線束コホモロジー](../../../代数系/AG/AG3-08/index.md#thm-ag3-08-p1-cohomology)で $h^0(\mathcal O(4))=5$、$h^1(\mathcal O(4))=0$、各 $\mathcal O(-2)$ は $h^0=0,h^1=1$。核の複素次元5、余核の複素次元2、実指数は $2(5-2)=6$。余核が正なので非正則である。
<!-- solution-end -->

<a id="ex-gw1-04-b04"></a>
#### GW1-04-B04 一般位置定理の適用条件
- Level: B

Fredholm写像 $f:M\to N$ の指数が $q=4$ とする。Sard–Smaleの一般位置原理で要求される最低の整数微分階数 $r$ と、これだけで**多重被覆**の正則性を結論できない理由を述べよ。

<!-- solution-start -->
**詳細解答**。[一般位置補題](#lem-gw1-04-sard-smale)の条件は $r>\max(4,0)=4$ だから最低整数は $r=5$。同補題を適用するためには、まず対象の普遍零点集合がBanach多様体であり射影がFredholm写像となる必要がある。[単純曲線の普遍横断性](#thm-gw1-04-universal-surjective)では単射な正則点を使ってそれを示したが、多重被覆にはその局在化が使えない。微分階数を大きくするだけでは前提の全射性が回復しない。
<!-- solution-end -->

### Level C

<a id="ex-gw1-04-c01"></a>
#### GW1-04-C01 期待次元零と被覆族の過剰次元
- Level: C

$X=\operatorname{Tot}(\mathcal O(-1)\oplus\mathcal O(-1))$ の零切断にある $u_d(z)=z^d$（$d\ge2$）を考える。

1. $u_d^*TX$ の分裂と核・余核の実次元を求めよ。
2. 無標点の球面再パラメータ化で商を取った指数を求めよ。
3. 零切断の中の次数$d$の正則写像族を係数で数え、商後の実次元と(2)を比較せよ。
4. $d=1$ と $d\ge2$ の相違、一般の $J$ の横断性証明がこの例でそのまま適用できない理由を述べよ。

<!-- solution-start -->
**詳細解答**。

(1) 零切断に沿う接束の分裂は $TC\oplus N=\mathcal O(2)\oplus\mathcal O(-1)^{\oplus2}$。次数$d$で引き戻すと $\mathcal O(2d)\oplus\mathcal O(-d)^{\oplus2}$。[射影直線の線束コホモロジー](../../../代数系/AG/AG3-08/index.md#thm-ag3-08-p1-cohomology)から $h^0=2d+1$、$h^1=2(d-1)$（$d\ge2$）。従って核の実次元 $4d+2$、余核の実次元 $4d-4$。

(2) パラメータ付きの実指数は $(4d+2)-(4d-4)=6$。[球面の三点固定](../GW1-01/index.md#prop-gw1-01-three-marks)に対応する再パラメータ化群 $PSL(2,\mathbb C)$ の実次元6を引くと $6-6=0$。ここでは**期待次元**を計算したのであり、零次元の滑らかな商が存在すると結論していない。

(3) 次数$d$の正則写像は次数高々$d$の斉次多項式 $P(Z_0,Z_1),Q(Z_0,Z_1)$ の組で、共通零点なし、少なくとも一方の次数$d$係数を持つものとして表す。係数数は $(d+1)+(d+1)=2d+2$、共通の非零複素スケールで割って複素次元 $2d+1$。共通因子なしという条件は開条件で次元を減らさない。$PSL(2,\mathbb C)$ の複素次元3で商を取ると $2d+1-3=2d-2$、実次元 $4d-4$ である。この族は法方向への動きではなく、同じ零切断への多重被覆の変形だけで存在する。

(4) $d=1$ の場合は負の法束が $\mathcal O(-1)^{\oplus2}$ で $H^1=0$、正則で商後の局所次元は零。$d\ge2$ なら $H^1(\mathcal O(-d))$ の二成分が非零で、余核実次元 $4d-4$ に一致する過剰な被覆族が残る。さらに同じ標的点に複数の定義域点が写るため、[普遍横断性の証明](#thm-gw1-04-universal-surjective)で用いた $u^{-1}(V)\subset U$ の局在化はできない。これは一般位置定理の**仮定が失われる機構**であって、全ての多重被覆が非正則という主張ではない。
<!-- solution-end -->

## 9. 次講への橋

固定した定義域に関して、全射性が局所解空間を滑らかにし、$J$ を動かす普遍方程式と一般位置原理が**単純曲線**の全射性を保証する仕組みを示した。同時に、被覆は単射な正則点を欠くため一般位置証明の射程外に出ること、実際に負の法束では余核が現れることを検算した。

しかし正則な解だけを集めても、写像の列が収束するとは限らない。エネルギーを固定しても勾配が一点に集中する場合がある。次講 GW1-05「泡立ちの機構」では、その局所的な拡大と非定数球面の出現を調べる。
