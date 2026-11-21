# GBG2 主G束とは何か――自由・推移的な右作用

[GBG1の貼り合わせ定理](../GBG1/index.md#thm-gbg1-gluing)では、局所積 $U_i\times G$ を遷移関数で貼り合わせ、各点の上に $G$ のコピーを持つ滑らかな空間を作った。しかし、初めから大域的な空間 $P$ が与えられたとき、何を確認すれば同じ構造と判断できるだろうか。

必要なのは、基底への射影、群の右作用、そして**基底の小さな開集合の上では積に見える**という条件である。自由な作用は余分な固定元を排除し、各ファイバーでの推移性はどの二点も群元で結べることを保証する。局所積表示は、これらを滑らかにまとめる役割を持つ。

前提は[GBG1のcocycle構成](../GBG1/index.md#def-gbg1-glued-space)、[Lie群の定義](../../../代数系/LIE/LIE1/index.md#def-lie1-lie-group)と、枠束に用いる[接空間](../../GEO/GEO2/index.md#def-geo2-tangent-derivation)である。$M$ は Hausdorff・第二可算な有限次元滑らかな多様体、$G$ は有限次元 Lie 群とし、作用は右から $p\cdot g$ と書く。群は可換とは仮定しない。

<!-- definition-example-audit: strict -->

---

## 1. 群の右作用でファイバーの中を動く

まず積空間 $P=M\times G$ を考え、$\pi(x,h)=x$ とする。同じ $x$ の上には $(x,h)$ が $h\in G$ の数だけ並ぶ。右から $g$ を作用させると $(x,hg)$ となる。これは基底の点を動かさない。

右作用が持つ二つの性質を言葉で確認する。**自由**とは、点を固定する群元が単位元だけであること。**推移的**とは、同じファイバーの二点を結ぶ群元が存在することである。積空間なら、$(x,h)$ から $(x,k)$ へ動かす群元は $h^{-1}k$ と**一意に**決まる。

ここでいうファイバーとは $\pi^{-1}(x)$、すなわち一つの基底点の上に載った点全体を指す。局所自明化とは、ファイバーごとの群座標を、基底点に沿って滑らかに選ぶ写像である。

<a id="def-gbg2-principal-bundle"></a>

<!-- formal-statement-start -->
> **定義（滑らかな主G束）**  
> $M$ を有限次元滑らかな多様体、$G$ を有限次元 Lie 群とする。**主 $G$ 束**とは、有限次元滑らかな多様体 $P$、滑らかな全射 $\pi:P\to M$ および滑らかな右作用 $P\times G\to P$ の組で、次を満たすものをいう。
>
> **（P1）射影の保存**：任意の $p\in P$、$g\in G$ について $\pi(pg)=\pi(p)$。
>
> **（P2）ファイバーでの自由・推移性**：各 $x\in M$ について、$pg=p$ なら $g=e$ であり、$p,q\in\pi^{-1}(x)$ なら一意な $g\in G$ があって $pg=q$。
>
> **（P3）同変な局所自明化**：$M$ の開被覆 $\{U_i\}$ と微分同相
>
$$
\Phi_i:\pi^{-1}(U_i)\longrightarrow U_i\times G
$$
>
> が存在し、$\Phi_i(p)=(x,h)$ のとき
>
$$
\Phi_i(pg)=(x,hg),\qquad
\operatorname{pr}_1\Phi_i=\pi
$$
>
> を満たす。ここで $\operatorname{pr}_1$ は積の第一成分への射影である。
<!-- formal-statement-end -->

<!-- definition-example-start: def-gbg2-principal-bundle -->
**定義の確認**：積主束。$P=M\times G$ に
$$
\pi(x,h)=x,\qquad (x,h)\cdot g=(x,hg)
$$
を入れる。射影は滑らかな全射で、右作用も Lie 群の積の滑らかさから滑らかである。$\pi((x,h)g)=x$ なので（P1）。$hg=h$ から $g=e$、$h(h^{-1}k)=k$ なので（P2）。$U=M$ と $\Phi=\operatorname{id}_{M\times G}$ を選ぶと、射影と右作用がそのまま保たれるので（P3）も成立する。
<!-- definition-example-end -->

（P3）があれば（P2）は実は自動的に従う。ただし三条件を明示すると、具体例で何を確認したかを見失わずに済む。

<a id="prop-gbg2-free-transitive"></a>

<!-- formal-statement-start -->
> **命題（局所自明化から自由・推移性が従う）**  
> $P,M,G,\pi$ が主束の定義にある滑らかな右作用、滑らかな全射、射影保存（P1）と同変な局所自明化（P3）を満たすなら、各ファイバーで右作用は自由かつ推移的である。さらに、$p,q$ が同じファイバーにあるとき $pg=q$ を満たす $g$ は一意である。
<!-- formal-statement-end -->

### 証明の見取り図

同じファイバー内では局所自明化を一つ選べば十分である。そこでは作用が単なる群の右乗法となり、群の消去律を使える。

<!-- proof-start -->
### 証明

$x=\pi(p)=\pi(q)$ を固定し、$x\in U_i$ を選ぶ。$\Phi_i(p)=(x,h)$、$\Phi_i(q)=(x,k)$ と書く。$\Phi_i$ の同変性から
$$
\Phi_i(pg)=(x,hg).
$$
$p g=q$ なら $hg=k$ なので左から $h^{-1}$ を掛けて $g=h^{-1}k$ が必要である。逆にこの $g$ を用いると $hg=k$ だから、$\Phi_i$ の単射性より $pg=q$ である。特に $q=p$ とすれば $g=h^{-1}h=e$ であり自由性も従う。
<!-- proof-end -->

この一意な群元は、二点の「相対的な位置」を測る。局所座標を変えても群元そのものは変わらない。

## 2. 局所積の貼り合わせと主束の公理は一致する

既習の[貼り合わせ定理](../GBG1/index.md#thm-gbg1-gluing)は（P1）〜（P3）をすべて与える。逆に局所自明化があれば、[局所積表示とcocycleの逆向きの対応](../GBG1/index.md#thm-gbg1-converse)を使い、基底を覆う開集合上の群座標から $g_{ij}$ を得る。ここでは主束の定義が「前講の構成の結果を特徴付ける」ことを確認する。

<a id="prop-gbg2-transition"></a>

<!-- formal-statement-start -->
> **命題（局所自明化の間の変換）**  
> $\pi:P\to M$ を滑らかな主 $G$ 束、$\Phi_i,\Phi_j$ をその同変な局所自明化とする。$U_{ij}=U_i\cap U_j$ 上には滑らかな写像 $g_{ij}:U_{ij}\to G$ が一意に存在し、
$$
\Phi_j\Phi_i^{-1}(x,h)
=(x,g_{ij}(x)^{-1}h)
$$
> を満たす。三重重なりでは $g_{ij}g_{jk}=g_{ik}$ が成立する。
<!-- formal-statement-end -->

### 証明の見取り図

各表示で群座標が $e$ となる点を基準点として取る。右作用が自由かつ推移的であるため基準点同士を結ぶ群元が一意に定まり、それを用いて変換式を求める。

<!-- proof-start -->
### 証明

$s_i(x)=\Phi_i^{-1}(x,e)$ と置くと、$s_i$ は滑らかで $\pi(s_i(x))=x$。同じファイバーにある $s_i(x),s_j(x)$ に対し、[自由・推移性](#prop-gbg2-free-transitive)から
$$
s_j(x)=s_i(x)g_{ij}(x)
$$
を満たす群元が一意に定まる。$\Phi_i(s_j(x))=(x,g_{ij}(x))$ だから $g_{ij}$ は滑らかである。任意の $h\in G$ について
$$
\Phi_i^{-1}(x,h)=s_i(x)h
=s_j(x)g_{ij}(x)^{-1}h
$$
となり、$\Phi_j$ を施せば所望の局所座標変換を得る。三重重なりでは
$$
s_k=s_jg_{jk}
=s_i(g_{ij}g_{jk}),\qquad
s_k=s_ig_{ik}.
$$
同一ファイバーで群元が一意であることから $g_{ij}g_{jk}=g_{ik}$ を得る。
<!-- proof-end -->

## 3. 主束の同型と自明性

同じ形のファイバーを持つだけでは二つの主束が同じとは限らない。比較する写像は基底点と右作用の両方を保存しなければならない。

<a id="def-gbg2-bundle-isomorphism"></a>

<!-- formal-statement-start -->
> **定義（基底を固定した主束同型）**  
> 同じ多様体 $M$ と同じ Lie 群 $G$ に対する主束 $\pi:P\to M$、$\pi':Q\to M$ の**同型**とは、滑らかな逆写像を持つ滑らかな写像 $F:P\to Q$ で、任意の $p\in P$、$g\in G$ に対し
$$
\pi'\circ F=\pi,\qquad
F(pg)=F(p)g
$$
> を満たすものをいう。
<!-- formal-statement-end -->

<!-- definition-example-start: def-gbg2-bundle-isomorphism -->
**定義の確認**。$a:M\to G$ を滑らかとし、積主束で
$$
F_a(x,h)=(x,a(x)h)
$$
とする。$F_a((x,h)g)=(x,a(x)hg)=F_a(x,h)g$ で右作用を保つ。逆写像は $(x,k)\mapsto(x,a(x)^{-1}k)$ であり、群の逆元が滑らかなため両写像は滑らかである。非可換群では $(x,h)\mapsto(x,ha(x))$ は一般に右作用と可換ではない。
<!-- definition-example-end -->

定義では逆写像まで要求した。しかし同じ基底・同じ群で右作用を保つ滑らかな写像なら、逆写像は必ず作れる。

<a id="thm-gbg2-equivariant-isomorphism"></a>

<!-- formal-statement-start -->
> **定理（同じ基底の同変写像は同型）**  
> $P,Q$ を同じ滑らかな多様体 $M$ 上の、同じ Lie 群 $G$ を構造群とする主束とする。
> 滑らかな写像 $F:P\to Q$ が任意の $p\in P$、$g\in G$ に対して

$$
\pi_Q\circ F=\pi_P,\qquad F(pg)=F(p)g
$$

> を満たすなら、$F$ は主束同型である。
<!-- formal-statement-end -->

### 証明の見取り図

一つの局所自明化で $p=s_P(x)h$ と表せば、同変性から $F(p)=s_Q(x)a(x)h$ の形に限られる。左からの $a(x)$ の乗法は逆元を持つため、ファイバーごとに逆を作り、その滑らかさを調べる。

<!-- proof-start -->
### 証明

$x\in M$ の周りで、$P$ と $Q$ の局所自明化がともに使える開集合 $U$ を選ぶ。両方の基準点を $s_P(x),s_Q(x)$ と書く。$F$ は射影を保つから $F(s_P(x))\in\pi_Q^{-1}(x)$。$Q$ の局所自明化により
$$
F(s_P(x))=s_Q(x)a(x)
$$
を満たす $a(x)\in G$ が唯一存在する。右辺での $a$ は $\Phi_Q(F(s_P(x)))$ の第二成分なので、滑らかな写像である。

任意の $p=s_P(x)h$ について同変性から
$$
F(p)=F(s_P(x)h)
=F(s_P(x))h
=s_Q(x)a(x)h.
$$
したがって局所積座標での $F$ は $(x,h)\mapsto(x,a(x)h)$ であり、逆写像は
$$
(x,k)\longmapsto(x,a(x)^{-1}k)
$$
である。群の乗法・逆元は滑らかなので局所逆写像も滑らかである。各ファイバー上では左乗法が全単射だから $F$ は大域的にも全単射となる。重なる局所領域で得た逆写像は同じ集合論的逆写像であるため一致し、全体として滑らかな $F^{-1}$ を定める。$F$ は定義の条件を満たす主束同型である。
<!-- proof-end -->

<a id="def-gbg2-trivial-bundle"></a>

<!-- formal-statement-start -->
> **定義（自明な主束）**  
> $M$ 上の主 $G$ 束 $P$ が**自明**であるとは、積主束 $M\times G$ との主束同型が存在することをいう。存在しなければ**非自明**という。
<!-- formal-statement-end -->

<!-- definition-example-start: def-gbg2-trivial-bundle -->
**定義の確認**。[GBG1の非恒等なcocycleの例](../GBG1/index.md#thm-gbg1-gluing)で $g_{ij}=a_i^{-1}a_j$ とすると、貼り合わせ商の点を
$$
[i,x,h]\longmapsto(x,a_i(x)h)
$$
へ送れる。代表元を $[j,x,g_{ij}^{-1}h]$ に替えても
$$
a_jg_{ij}^{-1}h
=a_j(a_i^{-1}a_j)^{-1}h
=a_ih
$$
で変わらず、局所表示での逆写像は $(x,k)\mapsto[i,x,a_i^{-1}k]$。右作用・射影・滑らかさも保存する。ゆえに遷移関数が恒等でなくても束は自明であり得る。
<!-- definition-example-end -->

## 4. Hopf写像は $U(1)$ 主束を与える

積束以外の例では、円周の位相 $U(1)=\{\lambda\in\mathbb C:|\lambda|=1\}$ を二つの複素座標に同時に掛ける。$U(1)$ は複素数の積を群演算とする Lie 群である。三次元球面を
$$
S^3=\{(z,w)\in\mathbb C^2:|z|^2+|w|^2=1\}
$$
とし、二次元球面を
$$
S^2=\{(X,Y,Z)\in\mathbb R^3:X^2+Y^2+Z^2=1\}
$$
とする。

共通の位相 $\lambda$ を掛けても変わらない量を集めれば、基底 $S^2$ への写像を作れる。これが **Hopf写像**である。

<a id="def-gbg2-hopf-map"></a>

<!-- formal-statement-start -->
> **定義（Hopf写像と右位相作用）**  
> $S^3\subset\mathbb C^2$ 上に右 $U(1)$ 作用 $(z,w)\cdot\lambda=(z\lambda,w\lambda)$ を置く。$S^2\subset\mathbb R^3$ への写像 $H$ を
$$
H(z,w)
=\bigl(2\operatorname{Re}(z\overline w),
2\operatorname{Im}(z\overline w),
|z|^2-|w|^2\bigr)
$$
> で定める。これを Hopf写像という。
<!-- formal-statement-end -->

<!-- definition-example-start: def-gbg2-hopf-map -->
**定義の確認**。$|z|^2+|w|^2=1$ から
$$
4|z\overline w|^2+(|z|^2-|w|^2)^2
=(|z|^2+|w|^2)^2=1
$$
なので $H(z,w)\in S^2$。また
$$
(z\lambda)\overline{(w\lambda)}
=z\lambda\overline w\,\overline\lambda
=z\overline w
$$
であり、$\lambda\overline\lambda=1$ を用いた。したがって $H((z,w)\lambda)=H(z,w)$、すなわち射影が右作用を保存する。作用の滑らかさと結合律・単位元則は複素数の積から従う。
<!-- definition-example-end -->

局所自明化を具体的に作ろう。$S^2$ の北極 $(0,0,1)$ を除いた領域を $U_w$、南極 $(0,0,-1)$ を除いた領域を $U_z$ とする。それぞれの点 $(X,Y,Z)$ に複素座標
$$
t=\frac{X+iY}{1-Z}\quad (U_w),\qquad
u=\frac{X-iY}{1+Z}\quad (U_z)
$$
を対応させる。分母は領域内で正なので式は滑らかである。これらは球面上の点を表す座標である。一方、$H(z,w)=(X,Y,Z)$ のとき、$H$ の定義から
$$
X+iY=2z\overline w,\qquad
X-iY=2\overline z w,\qquad
1-Z=2|w|^2,\quad 1+Z=2|z|^2
$$
となる。したがって、$w\ne0$ と $z\ne0$ の各領域ではそれぞれ
$$
t=\frac{2z\overline w}{2w\overline w}=\frac zw,\qquad
u=\frac{2\overline z w}{2z\overline z}=\frac wz.
$$
つまり $t,u$ は、同じ位相を両座標に掛けても変わらない**複素座標の比**である。局所自明化ではこの比を基底側の座標とし、残る位相 $w/|w|$ または $z/|z|$ を群座標にする。

<a id="thm-gbg2-hopf-principal"></a>

<!-- formal-statement-start -->
> **定理（Hopf主U(1)束）**  
> 上の $H:S^3\to S^2$ は滑らかな全射であり、$(z,w)\cdot\lambda=(z\lambda,w\lambda)$ とともに滑らかな主 $U(1)$ 束をなす。$U_w,U_z$ 上の基準点はそれぞれ
$$
s_w(t)=\frac{(t,1)}{\sqrt{1+|t|^2}},
\qquad
s_z(u)=\frac{(1,u)}{\sqrt{1+|u|^2}}
$$
> と取れる。両者は $H(s_w(t))=(X,Y,Z)$、$H(s_z(u))=(X,Y,Z)$ を満たし、各領域上の局所自明化を与える。
<!-- formal-statement-end -->

### 証明の見取り図

$w\ne0$ の領域では比 $t=z/w$ が位相回転で変わらない。比を固定すると、残る自由度は $w/|w|\in U(1)$ のみである。同じことを $z\ne0$ の領域で行えば球面全体を覆える。

<!-- proof-start -->
### 証明

$H$ の値が $S^2$ にあることと右作用の不変性は定義例で確かめた。$S^3$ は $\mathbb R^4$ 内の滑らかな球面であり、$H$ は実座標の多項式で与えられるため滑らかである。右作用も複素積なので滑らかである。

$U_w$ 上で $t=(X+iY)/(1-Z)$ と置く。$X^2+Y^2=1-Z^2$ から
$$
|t|^2=\frac{1+Z}{1-Z},\qquad
1+|t|^2=\frac{2}{1-Z}.
$$
$H(s_w(t))$ の第一・第二成分を合わせた複素数は $2t/(1+|t|^2)=X+iY$、第三成分は
$$
\frac{|t|^2-1}{1+|t|^2}=Z.
$$
よって $H(s_w(t))=(X,Y,Z)$。$U_z$ でも
$$
|u|^2=\frac{1-Z}{1+Z},\qquad
\frac{2\overline u}{1+|u|^2}=X+iY,
\qquad
\frac{1-|u|^2}{1+|u|^2}=Z
$$
より $H(s_z(u))=(X,Y,Z)$ を得る。二領域が球面を覆うので $H$ は全射である。

$w\ne0$ の点 $(z,w)\in S^3$ に対し $t=z/w$ とおくと、$|w|=(1+|t|^2)^{-1/2}$ なので
$$
(z,w)=s_w(t)\cdot\frac{w}{|w|}.
$$
よって次の写像は互いに逆である。
$$
\Phi_w(z,w)=\left(H(z,w),\frac{w}{|w|}\right),
\qquad
\Phi_w^{-1}(x,\lambda)=s_w(t(x))\lambda.
$$
$w\ne0$ で割り算は滑らかであり、$t(x)$ と $s_w$ も滑らかなので、$\Phi_w$ と逆写像はともに滑らか。$H$ は第一成分への射影となり、$\Phi_w((z,w)\mu)=(x,(w/|w|)\mu)$ で同変性もある。

同じ議論を $z\ne0$ に適用し、
$$
\Phi_z(z,w)=\left(H(z,w),\frac{z}{|z|}\right),
\qquad
\Phi_z^{-1}(x,\lambda)=s_z(u(x))\lambda
$$
を得る。これで（P1）と（P3）を証明した。[局所自明化による自由・推移性](#prop-gbg2-free-transitive)から（P2）が従う。直接にも、$(z,w)\lambda=(z,w)$ なら非零成分を消去して $\lambda=1$ である。
<!-- proof-end -->

二つの局所基準点を比較する。重なりでは $u=1/t$ なので
$$
s_z(1/t)=s_w(t)\,\frac{|t|}{t},
\qquad
g_{wz}(t)=\frac{|t|}{t}.
$$
例えば $t=e^{i\theta}$ では $g_{wz}=e^{-i\theta}$ となる。**局所積表示が二つ存在することと、大域的な積表示が一つ存在することは別の問題**である。この遷移関数が大域的な積表示を妨げることは、後の GBG18 で巻き数を使って証明する。

## 5. 枠束は $GL(n,\mathbb R)$ 主束になる

Hopf束は複素位相の例だった。もう一つ、任意の $n$ 次元滑らかな多様体から機械的に作れる主束がある。各点 $x$ の[接空間](../../GEO/GEO2/index.md#def-geo2-tangent-derivation) $T_xM$ に**順序付き基底** $(v_1,\ldots,v_n)$ を選ぶ。[接ベクトルの座標表示](../../GEO/GEO2/index.md#thm-geo2-coordinate-expression)により、局所座標の基底 $E=(E_1,\ldots,E_n)$ に関し、各 $v_j$ は $v_j=\sum_i E_i A^i{}_j$ と一意に書ける。この係数を**第 $j$ 列**に並べた $n\times n$ 行列 $A$ が、枠を座標で表す行列である。

$(v_1,\ldots,v_n)$ が基底であることは、$A$ の列が一次独立であること、すなわち $\det A\ne0$ と同値である。この条件を満たす行列全体が[一般線形群](../../../代数系/LIE/LIE1/index.md#prop-lie1-general-linear-group) $GL(n,\mathbb R)$ であり、枠の取り替えを右からの行列積として記述できる。

<a id="def-gbg2-frame-bundle"></a>

<!-- formal-statement-start -->
> **定義（接束の枠束）**  
> $n$ 次元滑らかな多様体 $M$ の枠束 $\operatorname{Fr}(M)$ は、各 $x\in M$ における $T_xM$ の順序付き基底
$$
(v_1,\ldots,v_n)
$$
> 全体からなる集合である。射影は基底の属する点 $x$ を返し、$A=(A^i{}_j)\in GL(n,\mathbb R)$ の右作用を
$$
(v_1,\ldots,v_n)\cdot A
=\left(\sum_i v_iA^i{}_1,\ldots,\sum_i v_iA^i{}_n\right)
$$
> とする。局所座標が定める接ベクトル基底の成分を枠の局所座標として、$\operatorname{Fr}(M)$ に滑らかな多様体構造を入れる。
<!-- formal-statement-end -->

<!-- definition-example-start: def-gbg2-frame-bundle -->
**定義の確認**：$M=\mathbb R^2$ の枠束。各点 $x$ で標準座標基底 $E(x)=(e_1,e_2)$ を取る。上の列表示により、$x$ 上の枠は $E(x)\cdot A$ と唯一表せ、$A\in GL(2,\mathbb R)$ であることが枠の条件に一致する。例えば
$$
A=\begin{pmatrix}1&1\\0&1\end{pmatrix},\qquad
\det A=1,\qquad
E(x)\cdot A=(e_1,e_1+e_2).
$$
射影を $\pi(E(x)A)=x$ と定めれば全射であり、$\pi((E(x)A)B)=x$ だから（P1）が成立する。$AB=A$ なら $B=I$、二つの枠 $E(x)A,E(x)C$ の間の群元は唯一 $B=A^{-1}C$ なので（P2）も成立する。さらに
$$
\Phi:\operatorname{Fr}(\mathbb R^2)\longrightarrow
\mathbb R^2\times GL(2,\mathbb R),\qquad
\Phi(E(x)A)=(x,A)
$$
は、逆 $(x,A)\mapsto E(x)A$ を持つ。いずれも標準座標の成分で表されて滑らかであり、$\Phi((E(x)A)B)=(x,AB)$ だから（P3）も成立する。右作用の結合律も、$j$ 番目のベクトルが
$$
\sum_k\left(\sum_i e_i A^i{}_k\right)B^k{}_j
=\sum_i e_i\left(\sum_k A^i{}_kB^k{}_j\right)
$$
となることから、行列積 $(AB)^i{}_j$ と一致すると確認できる。
<!-- definition-example-end -->

<a id="thm-gbg2-frame-principal"></a>

<!-- formal-statement-start -->
> **定理（枠束の主束構造）**  
> $M$ を $n$ 次元滑らかな多様体とする。枠束 $\operatorname{Fr}(M)\to M$ は、上の右作用により滑らかな主 $GL(n,\mathbb R)$ 束をなす。局所座標 $x^1,\ldots,x^n$ において、座標基底
$$
\left(\frac{\partial}{\partial x^1},\ldots,
\frac{\partial}{\partial x^n}\right)
$$
> に関する係数行列が局所自明化の群座標となる。
<!-- formal-statement-end -->

### 証明の見取り図

既習の[接ベクトルの座標表示](../../GEO/GEO2/index.md#thm-geo2-coordinate-expression)で、枠の各ベクトルを列に並べる。基底条件は係数行列の可逆性に一致する。座標変換時のJacobi行列は可逆で滑らかなので、局所積表示も滑らかにつながる。

<!-- proof-start -->
### 証明

座標近傍 $U$ 上で $E_i(x)=\partial/\partial x^i|_x$ とする。任意の枠 $v=(v_1,\ldots,v_n)$ は一意に
$$
v_j=\sum_{i=1}^n E_i(x) A^i{}_j
$$
と表せる。$E_i(x)$ が基底なので、$v_1,\ldots,v_n$ が基底である条件は $A\in GL(n,\mathbb R)$ と同値である。そこで $\Phi_U(v)=(x,A)$ とすれば、逆は $(x,A)\mapsto(E_1(x),\ldots,E_n(x))\cdot A$ となる。

[接束の滑らかな構造](../../GEO/GEO2/index.md#thm-geo2-tangent-bundle-smooth)では各接ベクトルの座標係数は滑らかな座標をなす。枠の条件 $\det A\ne0$ は行列空間の開条件である。したがって $\Phi_U$ と逆写像は滑らかである。

別の座標 $y^1,\ldots,y^n$ を使った座標基底を $E'_j$ とすれば、[微分の座標表示](../../GEO/GEO2/index.md#thm-geo2-differential-coordinate)より
$$
E'_j=\sum_i E_i\frac{\partial x^i}{\partial y^j}.
$$
よって $E'=EJ$、$J=(\partial x^i/\partial y^j)$ である。ここで $\partial x^i/\partial y^j$ は他の $y$ 座標を固定して $y^j$ を変化させる偏導関数である。$J$ は座標変換の微分として可逆かつ滑らかなので、$v=EA=E'(J^{-1}A)$ の成分変換も滑らかである。

作用 $v\cdot B$ は局所積で $(x,A)\mapsto(x,AB)$ となり、射影を保存し、滑らかである。$AB=A$ なら $B=I$。任意の枠 $EA,EC$ の間には唯一 $B=A^{-1}C$ があり、$(EA)B=EC$。従って自由・推移性も成立し、主束の全条件を満たす。
<!-- proof-end -->

枠束の群は「どの基底も別の基底へ可逆な線形変換で移せる」という事実を幾何化したものである。$M$ に接ベクトルの大域基底があるかどうかとは、別に考える必要がある。

## 6. 自由・推移的であるだけでは不足する

主束の定義から局所自明化（P3）を除くと、射影が滑らかでも逆に局所座標へ戻れない例が出る。

$G=\{e\}$ を一元の離散 Lie 群とし、$P=M=\mathbb R$、$\pi(t)=t^3$ とする。作用は自明で各ファイバーは一つの点だから、自由・推移的であり（P1）も満たす。射影は滑らかな全射だが、$0$ の近傍で主束の局所自明化があれば、$G$ が一元群なのでその逆写像は $\pi^{-1}(x)=\sqrt[3]{x}$ になる。これは $x=0$ で微分可能ではない。

したがって **滑らかな全射 + 各ファイバーで自由・推移的な作用**だけでは主束にならない。局所自明化の滑らかさは不可欠である。

---

## 7. 演習と詳細解答

### Level A：公理と局所表示

<a id="ex-gbg2-a01"></a>
#### GBG2-A01 積束の右作用
- Level: A

$G=GL(2,\mathbb R)$、$P=\mathbb R\times G$ とし、$(x,A)\cdot B=(x,AB)$ とする。作用の結合律・単位元則、自由性・推移性を確認し、$(x,A)$ を $(x,C)$ へ動かす行列を求めよ。

<!-- solution-start -->
**詳細解答**。行列積の結合律により $((x,A)B)D=(x,(AB)D)=(x,A(BD))$、単位元 $I$ について $(x,A)I=(x,A)$。$AB=A$ なら左から $A^{-1}$ を掛けて $B=I$。$AB=C$ の唯一解は $B=A^{-1}C$ であり、この $B$ は可逆行列の積なので $G$ に属する。射影 $\pi(x,A)=x$ を変えず、恒等自明化が滑らかなことから主束の条件も満たす。
<!-- solution-end -->

<a id="ex-gbg2-a02"></a>
#### GBG2-A02 同変性と乗法の向き
- Level: A

$G=GL(2,\mathbb R)$、$a=\left(\begin{smallmatrix}1&1\\0&1\end{smallmatrix}\right)$ とし、$F(h)=ah$、$K(h)=ha$ を $G$ 上で考える。右乗法 $h\cdot b=hb$ と同変なのはどちらか。$K$ の不一致を具体的な $b$ で示せ。

<!-- solution-start -->
**詳細解答**。$F(hb)=a(hb)=(ah)b=F(h)b$ だから $F$ は同変である。$b=\left(\begin{smallmatrix}1&0\\1&1\end{smallmatrix}\right)$、$h=I$ とすると
$$
K(Ib)=ba=\begin{pmatrix}1&1\\1&2\end{pmatrix},
\qquad
K(I)b=ab=\begin{pmatrix}2&1\\1&1\end{pmatrix}.
$$
両者は異なるので $K$ は同変でない。非可換群で右から固定元 $a$ を掛ける写像は、通常は主束同型にならない。
<!-- solution-end -->

<a id="ex-gbg2-a03"></a>
#### GBG2-A03 Hopf作用の不変量
- Level: A

$(z,w)=(1/\sqrt2,i/\sqrt2)\in S^3$ に対して $H(z,w)$ を計算し、$\lambda=i$ を右から掛けても同じ値であることを確かめよ。

<!-- solution-start -->
**詳細解答**。$z\overline w=(1/\sqrt2)(-i/\sqrt2)=-i/2$、$|z|^2-|w|^2=0$ なので
$$
H(z,w)=(0,-1,0).
$$
位相回転後は $(zi,wi)=(i/\sqrt2,-1/\sqrt2)$ だから
$$
(zi)\overline{(wi)}
=(i/\sqrt2)(-1/\sqrt2)=-i/2.
$$
絶対値も変わらないため $H(zi,wi)=(0,-1,0)$。一般には $\lambda\overline\lambda=1$ という不変性の理由が働いている。
<!-- solution-end -->

<a id="ex-gbg2-a04"></a>
#### GBG2-A04 枠を運ぶ行列
- Level: A

$\mathbb R^2$ の標準枠 $E=(e_1,e_2)$ に対し $v=(e_1+e_2,e_2)$ と $w=(2e_1+2e_2,e_1+2e_2)$ を考える。$v=EA$、$w=EC$ の行列を求め、$v\cdot B=w$ を満たす $B$ を計算せよ。

<!-- solution-start -->
**詳細解答**。列を成分とするので
$$
A=\begin{pmatrix}1&0\\1&1\end{pmatrix},
\qquad
C=\begin{pmatrix}2&1\\2&2\end{pmatrix}.
$$
行列式はそれぞれ $1,2$ で、二組とも枠である。$A^{-1}=\left(\begin{smallmatrix}1&0\\-1&1\end{smallmatrix}\right)$ から
$$
B=A^{-1}C
=\begin{pmatrix}2&1\\0&1\end{pmatrix}.
$$
$AB=C$ を実際に掛けて確認でき、$B$ の行列式は $2$ なので $GL(2,\mathbb R)$ に属する。
<!-- solution-end -->

### Level B：局所表示と束の同型

<a id="ex-gbg2-b01"></a>
#### GBG2-B01 自明束だが非恒等なcocycle
- Level: B

$M=\mathbb R$、$G=GL(2,\mathbb R)$ とし、二枚の被覆 $U_0=U_1=M$ に対して $a_0=I$、$a_1(x)=\left(\begin{smallmatrix}1&x\\0&1\end{smallmatrix}\right)$、$g_{ij}=a_i^{-1}a_j$ とする。貼り合わせ商から $M\times G$ への明示的な主束同型を作り、代表元によらないことを証明せよ。

<!-- solution-start -->
**詳細解答**。[cocycleの構成](../GBG1/index.md#def-gbg1-cocycle)で $g_{01}=a_1$、$g_{10}=a_1^{-1}$、$g_{ii}=I$ であり、三重重なり条件は $a_i^{-1}a_ja_j^{-1}a_k=a_i^{-1}a_k$ による。$F([i,x,h])=(x,a_i(x)h)$ と定めると、$j$ 表示の代表元は $[j,x,g_{ij}^{-1}h]$ なので
$$
F([j,x,g_{ij}^{-1}h])
=(x,a_j(a_i^{-1}a_j)^{-1}h)
=(x,a_j a_j^{-1}a_i h)
=(x,a_i h).
$$
よって well-defined。逆写像は $x\in U_i$ を選び $(x,k)\mapsto[i,x,a_i^{-1}k]$ とする。上式と同じ計算で $i$ の選択に依存せず、局所的に群の積と逆元で書けるため両写像は滑らか。$F([i,x,h]b)=(x,a_ihb)=F([i,x,h])b$ で同変、第一成分も保存する。$a_1(x)\ne I$ となる $x\ne0$ があっても自明である。
<!-- solution-end -->

<a id="ex-gbg2-b02"></a>
#### GBG2-B02 ファイバーでの同変写像
- Level: B

$G$ を非可換 Lie 群とする。滑らかな $F:G\to G$ が $F(hg)=F(h)g$ を満たすとき $F(h)=ah$（$a=F(e)$）を証明し、$F$ が微分同相であることを示せ。

<!-- solution-start -->
**詳細解答**。同変性に $h=e$、$g=k$ を代入すると
$$
F(k)=F(ek)=F(e)k=ak.
$$
これで任意の $k$ に対する式を得た。$a\in G$ なので左乗法 $L_a(k)=ak$ は、逆写像 $L_{a^{-1}}(k)=a^{-1}k$ を持つ。Lie 群の乗法は滑らかであるから、$L_a$ と $L_{a^{-1}}$ はともに滑らか。従って $F$ は微分同相である。$a$ を中央元と仮定する必要はない。
<!-- solution-end -->

<a id="ex-gbg2-b03"></a>
#### GBG2-B03 Hopf束の遷移関数
- Level: B

$H:S^3\to S^2$ の二つの局所基準点 $s_w(t)$、$s_z(u)$ を使用する。重なりで $u=1/t$ を示し、$s_z(1/t)=s_w(t)g_{wz}(t)$ の $g_{wz}$ を求めよ。さらに $|t|=1$ の上で具体式を書け。

<!-- solution-start -->
**詳細解答**。両領域の重なりでは $X^2+Y^2=1-Z^2$ かつ $X+iY\ne0$ だから
$$
tu=\frac{(X+iY)(X-iY)}{(1-Z)(1+Z)}
=\frac{X^2+Y^2}{1-Z^2}=1.
$$
従って $u=1/t$。分母の正の平方根を丁寧に計算すると
$$
\sqrt{1+|1/t|^2}
=\frac{\sqrt{1+|t|^2}}{|t|}.
$$
これを代入して
$$
s_z(1/t)
=\frac{(1,1/t)|t|}{\sqrt{1+|t|^2}}
=s_w(t)\frac{|t|}{t}.
$$
よって $g_{wz}=|t|/t\in U(1)$。$t=e^{i\theta}$ なら $g_{wz}=e^{-i\theta}$。$g_{zw}=g_{wz}^{-1}=t/|t|$ である。位相の正負は局所基準点を比較する順序に依存する。
<!-- solution-end -->

<a id="ex-gbg2-b04"></a>
#### GBG2-B04 座標変換と枠束
- Level: B

$M=(0,\infty)$ で座標 $x$ と $y=\log x$ を使う。座標枠 $E_x=\partial/\partial x$、$E_y=\partial/\partial y$ の間の変換行列を計算し、同じ接ベクトル $v=3\partial/\partial x$ の枠係数が両座標でどう変わるか示せ。

<!-- solution-start -->
**詳細解答**。$x=e^y$ なので、滑らかな試験関数 $f$ に対する一変数の連鎖律は
$$
\frac{d}{dy}f(e^y)=\frac{df}{dx}(x)\frac{dx}{dy}
=x\frac{df}{dx}(x)
$$
である。座標方向の接ベクトル $\partial/\partial y$、$\partial/\partial x$ は関数に作用する微分作用素を表すので、この恒等式を両作用素に読み替えて
$$
\frac{\partial}{\partial y}
=\frac{dx}{dy}\frac{\partial}{\partial x}
=x\frac{\partial}{\partial x}
$$
を得る。
従って $E_y=E_x\cdot x$ であり、構造群 $GL(1,\mathbb R)=\mathbb R^\times$ の遷移行列は $x>0$。$v=E_x\cdot3=E_y\cdot(3/x)$ である。枠係数の変換は $A_y=x^{-1}A_x$。乗法の順は一般次元では $J^{-1}A_x$ となる。
<!-- solution-end -->

### Level C：三つの観点を統合する

<a id="ex-gbg2-c01"></a>
#### GBG2-C01 Hopf主束を局所表示で再構成する
- Level: C

$S^3$、$S^2$、$U(1)$、$H$ は[Hopf写像の定義](#def-gbg2-hopf-map)のとおりとする。

1. $H(S^3)\subset S^2$ および $H(p\lambda)=H(p)$ を示す。
2. $U_w=S^2\setminus\{(0,0,1)\}$ 上の $t=(X+iY)/(1-Z)$ と $s_w(t)$ を用い、$\Phi_w(p)=(H(p),w/|w|)$ の逆を構成し、右作用との同変性を検証する。
3. $U_z$ にも同じ構成を行い、自由・推移性を説明する。
4. 二つの基準点の遷移関数 $g_{wz}$ を求め、「遷移関数が恒等でない」ことから直ちに非自明性を結論できるか検討する。

<!-- solution-start -->
**詳細解答**。

**（1）** $p=(z,w)\in S^3$ とし、$a=|z|^2,b=|w|^2$ と置くと $a+b=1$。$H(p)$ の成分の平方和は
$$
4ab+(a-b)^2=a^2+2ab+b^2=(a+b)^2=1.
$$
また $\lambda\in U(1)$ なら $(z\lambda)\overline{(w\lambda)}=z\overline w$、$|z\lambda|=|z|$、$|w\lambda|=|w|$。従って $H(p\lambda)=H(p)$。

**（2）** $x=(X,Y,Z)\in U_w$ とすると $1-Z>0$ であり、$t$ は滑らか。球面の方程式から
$$
|t|^2=\frac{X^2+Y^2}{(1-Z)^2}
=\frac{1+Z}{1-Z}.
$$
よって $\sqrt{1+|t|^2}=\sqrt{2/(1-Z)}$。$s_w(t)=(t,1)/\sqrt{1+|t|^2}$ は $S^3$ に入り、$H(s_w(t))=x$ である。$H(p)=x$ の点は $w\ne0$ で、その比 $z/w$ は $t$ に等しい。$\lambda=w/|w|\in U(1)$ とすると
$$
s_w(t)\lambda
=\frac{(z/w,1)}{\sqrt{1+|z/w|^2}}\frac{w}{|w|}
=(z,w).
$$
従って逆写像は $(x,\lambda)\mapsto s_w(t(x))\lambda$ である。両写像は分母非零の領域で滑らかで、$\Phi_w(p\mu)=(H(p),(w/|w|)\mu)=\Phi_w(p)\cdot\mu$。

**（3）** $U_z=S^2\setminus\{(0,0,-1)\}$ では $u=(X-iY)/(1+Z)$、$s_z(u)=(1,u)/\sqrt{1+|u|^2}$ を用いる。$H(s_z(u))=x$ は $|u|^2=(1-Z)/(1+Z)$ および $2\overline u/(1+|u|^2)=X+iY$ から従う。逆写像は $(x,\lambda)\mapsto s_z(u(x))\lambda$、局所群座標は $z/|z|$ である。$U_w,U_z$ は $S^2$ を覆うから同変な局所自明化が揃い、[自由・推移性の命題](#prop-gbg2-free-transitive)を各ファイバーに適用できる。$H$ が滑らかな全射であることも局所基準点から確かめられる。

**（4）** 重なりでは
$$
tu=\frac{(X+iY)(X-iY)}{1-Z^2}=1.
$$
よって
$$
s_z(1/t)
=\frac{(1,1/t)}{\sqrt{1+|t|^{-2}}}
=s_w(t)\frac{|t|}{t}.
$$
つまり $g_{wz}=|t|/t$。この関数は一般に $1$ ではないが、非恒等な遷移関数を持っていても[自明束の例](#def-gbg2-trivial-bundle)があるため、これだけから非自明性は結論できない。大域的な積表示が存在しないことを別途示す必要があり、Hopf束の場合は後に巻き数で判定する。
<!-- solution-end -->

## 8. 次章へ

今回の三つの主役は、主束の**局所積 + 自由・推移的な右作用**、右作用と射影を保つ**主束同型**、そして Hopf束と枠束という**二種類の具体例**である。次の GBG3 では局所基準点 $s_i(x)$ の選び方そのものを研究し、局所sectionを取り替えたときに遷移関数がどう変わるかを導く。
