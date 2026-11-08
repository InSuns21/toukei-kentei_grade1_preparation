# DEF1-01 変形族からKodaira–Spencer写像をどう作るか

<!-- definition-example-audit: strict -->

## 1. 一次方向は、実際の族のどこに現れるのか

[一次複素構造変形の分類](../../CYG/CYG1-12/index.md#thm-cyg1-12-first-order-classification)では、接束値の $\bar\partial$-閉な $(0,1)$ 形式を $\bar\partial$-完全形式で割ると、一次変形の同値類が得られた。しかし、形式を一つ書けたことと、複素多様体を実際に動かす**正則な族**が与えられたことは同じではない。

例えば楕円曲線は格子 $\mathbb Z+\tau\mathbb Z$ の $\tau$ を動かすと複素構造が変わる。一方、同じ曲線の座標名を変えただけの族は変形していない。両者を判別するには、パラメータ方向を各局所座標へ持ち上げ、その持ち上げが重なりでどれだけずれるかを測ればよい。

まず何を「族」と呼ぶかを定める。複素多様体 $\mathcal X,B$ と正則写像 $\pi:\mathcal X\to B$ を考える。点 $b\in B$ に対応する空間 $X_b=\pi^{-1}(b)$ を**ファイバー**という。

[正則写像の座標表示](../../CM/CM1-02/index.md#def-cm1-02-holomorphic-map)と[複素接束](../../CM/CM1-05/index.md#def-cm1-05-holomorphic-tangent-section)を使い、以下では $d\pi$ がどの点でも全射である（**沈め込み**）とする。さらに $\pi$ が**固有**とは、任意のコンパクト集合 $K\subset B$ に対して $\pi^{-1}(K)$ がコンパクトであることをいう。

<a id="def-def1-01-family"></a>

<!-- formal-statement-start -->
> **定義（コンパクト複素多様体の正則変形族）**
>
> $\mathcal X,B$ を複素多様体、$\pi:\mathcal X\to B$ を固有で全射な正則沈め込みとする。$\pi$ を正則変形族と呼ぶ。点 $b\in B$ のファイバーを次で定める。

$$
X_b=\pi^{-1}(b).
$$

> 特定の $b_0\in B$ に対する $X_{b_0}$ を中心ファイバーという。各ファイバーはコンパクトな複素多様体である。
<!-- formal-statement-end -->

<!-- definition-example-start: def-def1-01-family -->
**定義の確認**（積の族）。コンパクト複素多様体 $X$ と円板 $D\subset\mathbb C$ に対し、$\mathcal X=X\times D$、$\pi(x,t)=t$ とする。積の正則座標では $d\pi$ は $t$ 成分への射影だから全射である。コンパクト集合 $K\subset D$ に対し $\pi^{-1}(K)=X\times K$ はコンパクトで、固有性も満たす。どの $X_t$ も $X$ と正則同型なので、これは**自明な族**である。
<!-- definition-example-end -->

固有性は後で微分可能な局所自明化を作るために使う。しかし微分可能に同じ形であっても、正則同型とは限らない。そこが複素構造を動かす余地になる。

## 2. Ehresmann局所自明化：滑らかな形は変わらない

正則沈め込みの局所座標では、$d\pi$ は複素線形な全射である。全空間と基底の複素次元をそれぞれ $n+m,m$ とすると、全空間の正則座標からファイバー方向の $n$ 成分 $z=(z^1,\ldots,z^n)$ を選び、次の写像の複素Jacobi行列を可逆にできる。

$$
(z,\pi):\mathcal X\supset V\longrightarrow\mathbb C^n\times\mathbb C^m,
\qquad p\longmapsto(z(p),\pi(p)).
$$

ここでの $V$ は着目点の座標近傍である。[実逆関数定理](../../../基礎科目/RA/RA6A/index.md#thm-ra6a-inverse-function)から十分小さい近傍で実 $C^1$ 級の逆が存在し、[正則写像の逆の正則性](../../CM/CM1-01/index.md#prop-cm1-01-composition)からその逆も正則になる。従って $t=\pi(p)$ と置けば $(z,t)$ が正則座標となり、$\pi(z,t)=t$ である。つまり**局所的な積座標**とはこの射影表示であり、ファイバー全体の正則積表示までは保証しない。

これに対して、基底を少し縮めればファイバー全体を**微分可能**には同時に同一視できる。必要な区別を次に明記する。

<a id="thm-def1-01-ehresmann"></a>

<!-- formal-statement-start -->
> **定理（固有沈め込みの滑らかな局所自明化）**
>
> $\pi:\mathcal X\to B$ を滑らかな多様体間の固有な全射沈め込みとし、$b_0\in B$ とする。このとき $b_0$ の十分小さい開近傍 $U$ と微分同相

$$
F:X_{b_0}\times U\xrightarrow{\ \simeq\ }\pi^{-1}(U)
$$

> が存在し、$\pi(F(x,b))=b$ である。正則な変形族にも、基礎にある実多様体についてこの結論を適用できる。$F$ が各ファイバーで正則同型になるとは主張しない。
<!-- formal-statement-end -->

### 証明の見取り図

沈め込みなので、基底の座標方向へ向かうベクトル場を全空間側で滑らかに持ち上げられる。コンパクトな中心ファイバーの周りでその流れを一様な短時間だけ動かせば、全ファイバーの点を運べる。固有性は点が無限遠へ逃げて、近くのファイバーに別の成分が出現することを防ぐ。

<!-- proof-start -->
### 証明

$b_0$ の実座標を $t^1,\ldots,t^m$ とし、$X=X_{b_0}$ と置く。沈め込みの仮定から各 $p\in\pi^{-1}(U)$ で $d\pi_p:T_p\mathcal X\to T_{\pi(p)}B$ は全射である。局所座標では $\partial_{t^a}$ を持ち上げるベクトル場が存在する。滑らかな分割1で貼れば、各 $a$ に対し $d\pi(H_a)=\partial_{t^a}$ を満たす滑らかな $H_a$ を得る。

$X$ はコンパクトなので、その上の全点について $H_1,\ldots,H_m$ の流れが存在する共通の小時間幅を取れる。基底で $b_0$ から $b$ へ各座標方向に順に進むよう流れを合成し、$F_b:X\to X_b$ を作る。$d\pi(H_a)=\partial_{t^a}$ だから $\pi(F_b(x))=b$ であり、$F_{b_0}$ は恒等写像である。流れを逆向きに辿れば、像の近くで滑らかな逆がある。

ここで $U$ をさらに縮める。固有性より、小さい閉座標球 $\overline U$ の逆像はコンパクトである。もし $U$ をどれだけ縮めても $F_b$ の像から漏れる点 $p_b\in X_b$ があれば、$b\to b_0$ の列を選び、コンパクト性で $p_b$ の収束部分列を $X$ 内へ取れる。

その極限点には流れによる逆写像が定義されているので、十分近い $p_b$ も像に入り矛盾する。従って縮小後は $F_b$ がファイバー全体への微分同相となり、$b$ についても滑らかな $F$ が得られる。$\square$
<!-- proof-end -->

**固有性がないと壊れる例。** $\mathcal Y=\{(t,z)\in\mathbb C^2:tz\ne1\}$ から $t$ への射影は正則沈め込みだが固有でない。$t=0$ のファイバーは $\mathbb C$、$t\ne0$ のファイバーは $\mathbb C\setminus\{1/t\}$ で、後者には穴が一つあり基本群が異なる。近くのファイバーが微分同相であるという結論さえ成立しない。

## 3. 局所的な持ち上げの差からČech類を得る

以下、$\pi:\mathcal X\to B$ は[正則変形族](#def-def1-01-family)、$b_0\in B$、$X=X_{b_0}$ とする。基底の複素接方向 $\xi$ を一つ固定する。第2節で流れを構成したときの座標は実座標だったが、ここからの $t=(t^1,\ldots,t^m)$ は**複素**基底座標である。局所的に次のように書く。

$$
\xi=\sum_a\xi^a\partial_{t^a}|_{b_0},
\qquad
\widetilde\xi=\sum_a\xi^a\partial_{t^a}.
$$

右辺の $\widetilde\xi$ は、基底の近傍で係数を一定とした正則ベクトル場であり、中心点で $\xi$ に一致する。

$X$ を覆う小さな開集合 $U_i$ を取り、その上方の局所的な正則積座標 $(z_i,t)$ を選ぶ。$\partial_{t^a}|_{z_i}$ は $z_i$ を固定して複素パラメータ $t^a$ だけを微分する記号である。第5節では逆に $t$ を固定して $\partial_z,\partial_{\bar z}$ を取る。この違いを踏まえて、局所正則ベクトル場を

$$
s_i=\sum_a\xi^a\left.\frac{\partial}{\partial t^a}\right|_{z_i}
$$

と置く。これは $d\pi(s_i)=\widetilde\xi$ を満たすので、**局所正則持ち上げ**と呼ぶ。重なりでは $s_j-s_i$ が $d\pi$ の核に入り、ファイバー上の正則接ベクトル場になる。[正則接束](../../CM/CM1-05/index.md#def-cm1-05-holomorphic-tangent-section)を $T_X$ と書く。

[Čech複体の交代微分](../../../代数系/AG/AG3-07/index.md#def-ag3-07-cech-complex)と同じ規約で、一次コチェインの閉条件を $\kappa_{jk}-\kappa_{ik}+\kappa_{ij}=0$、零次の境界を $(\delta v)_{ij}=v_j-v_i$ とする。ここでは**複素多様体上の正則接ベクトル場の層**にこの操作を適用する。

<a id="def-def1-01-kodaira-spencer"></a>

<!-- formal-statement-start -->
> **定義（Kodaira–Spencer写像）**
>
> $\pi:\mathcal X\to B$ を固有正則沈め込み、$b_0\in B$、$X=\pi^{-1}(b_0)$ とする。$\xi\in T_{b_0}^{1,0}B$ に対して、$X$ の局所正則持ち上げ $s_i$ の差

$$
\kappa_{ij}(\xi)=(s_j-s_i)|_{U_i\cap U_j}\in\Gamma(U_i\cap U_j,T_X)
$$

> から定まる一次Čechコホモロジー類を $\operatorname{KS}_{\pi,b_0}(\xi)$ と書く。被覆の細分と局所持ち上げの変更によらない対応

$$
\operatorname{KS}_{\pi,b_0}:T_{b_0}^{1,0}B\longrightarrow H^1(X,T_X)
$$

> をKodaira–Spencer写像という。右辺は正則接束の層コホモロジーであり、後述のDolbeault表示と同一視する。
<!-- formal-statement-end -->

<!-- definition-example-start: def-def1-01-kodaira-spencer -->
**定義の確認**（遷移座標での符号）。一変数の基底 $t$ で局所的に $z_j=z_i+t z_i^2$ とし、$t=0$ に制限する。$s_i=\partial_t|_{z_i}$ と $s_j=\partial_t|_{z_j}$ はどちらも $\partial_t$ を持ち上げる。連鎖律を $z_j$ へ適用すると

$$
s_i=\left.\partial_t\right|_{z_j}+z_i^2\partial_{z_j},
\qquad
\kappa_{ij}=s_j-s_i=-z_i^2\partial_{z_j}\quad(t=0).
$$

$t=0$ では $z_i=z_j$ だから、$\kappa_{ij}=-z_j^2\partial_{z_j}$ として正則接ベクトル場になる。二つの持ち上げがともに基底の $\partial_t$ に写ること、差が垂直であること、**差の順序を $s_j-s_i$ とすること**を全て直接確認できた。
<!-- definition-example-end -->

<a id="prop-def1-01-cocycle"></a>

<!-- formal-statement-start -->
> **命題（Čech類の閉性・選択独立性）**
>
> 固有正則沈め込み $\pi:\mathcal X\to B$ の点 $b_0$ における中心ファイバーを $X$ とする。任意の $\xi\in T_{b_0}^{1,0}B$ の局所正則持ち上げ $s_i$ について、差を次で定める。

$$
\kappa_{ij}=s_j-s_i.
$$

> この差は一次Čechコサイクルであり、持ち上げを取り替えてもそのČech類は変わらない。さらに $\operatorname{KS}_{\pi,b_0}$ は複素線形である。
<!-- formal-statement-end -->

### 証明の見取り図

三重交叉では持ち上げの差を三つ足すと相殺する。持ち上げを取り替えた差は局所正則接ベクトル場のČech境界そのものになる。$\xi$ への複素線形性は、持ち上げを線形結合しても基底への射影が保たれることから従う。

<!-- proof-start -->
### 証明

任意の三重交叉で

$$
\begin{aligned}
(\delta\kappa)_{ijk}
&=\kappa_{jk}-\kappa_{ik}+\kappa_{ij}\\
&=(s_k-s_j)-(s_k-s_i)+(s_j-s_i)=0.
\end{aligned}
$$

別の持ち上げ $s'_i$ との差 $a_i=s'_i-s_i$ は $d\pi(a_i)=0$ を満たす正則な垂直接ベクトル場である。従って $\kappa'_{ij}=s'_j-s'_i=\kappa_{ij}+a_j-a_i=\kappa_{ij}+(\delta a)_{ij}$。Čech群では境界を割るから同じ類を表す。被覆を細分した場合には同じ差を小さな交叉へ制限するだけで類が一致する。$\xi,\eta$ の局所持ち上げの線形結合は $c\xi+d\eta$ の持ち上げであり、差も $c\kappa(\xi)+d\kappa(\eta)$ となる。よって複素線形である。$\square$
<!-- proof-end -->

実際の局所座標が $z_j=f_{ji}(z_i,t)$ と重なる場合、微分する変数を固定して明示すれば

$$
\left.\partial_t\right|_{z_i}
=\left.\partial_t\right|_{z_j}
+\frac{\partial f_{ji}}{\partial t}(z_i,t)\partial_{z_j},
\qquad
\kappa_{ij}=-\left.\frac{\partial f_{ji}}{\partial t}\right|_{t=0}\partial_{z_j}
$$

となる（基底が一次元の場合）。**座標の変化率**を測っているのであって、単に新旧座標を引いたものではない。

## 4. 同じ類をDolbeault形式で書く

Čech表示は「重なりの差」だった。[接束値Dolbeault複体](../../CYG/CYG1-12/index.md#thm-cyg1-12-bundle-dolbeault)では、滑らかな接束値 $(0,1)$ 形式の閉性を調べられる。この二つを、分割1で実際につなぐ。

コンパクトな $X$ の有限被覆 $\{U_i\}$ を十分細かい正則座標近傍から取り、これに従属する滑らかな分割1 $\{\rho_i\}$ を選ぶ。$\rho_i\ge0$、$\operatorname{supp}\rho_i\subset U_i$、$\sum_i\rho_i=1$ である。各 $U_i$ 上の滑らかな垂直接ベクトル場を

$$
u_i=\sum_j\rho_j\kappa_{ji}
$$

と置く。各項は $U_i\cap U_j$ 上で定義され、$\rho_j$ がその外で零なので零延長して和を取れる。三重交叉の閉条件 $\kappa_{ji}-\kappa_{jk}=\kappa_{ki}$ を使うと

$$
\begin{aligned}
u_j-u_i
&=\sum_k\rho_k(\kappa_{kj}-\kappa_{ki})\\
&=\sum_k\rho_k\kappa_{ij}=\kappa_{ij}.
\end{aligned}
$$

最後の等号は $\sum_k\rho_k=1$ による。ここで $\kappa_{ij}$ は正則だから $\bar\partial_T\kappa_{ij}=0$ である。従って $\bar\partial_Tu_j=\bar\partial_Tu_i$ が重なりで成立する。

<a id="thm-def1-01-cech-dolbeault"></a>

<!-- formal-statement-start -->
> **定理（Kodaira–Spencer類のČech–Dolbeault対応）**
>
> $\pi:\mathcal X\to B$ を固有正則沈め込み、$b_0\in B$、$X=\pi^{-1}(b_0)$ とする。$\xi\in T_{b_0}^{1,0}B$ の局所正則持ち上げが作るČechコサイクル $\kappa_{ij}=s_j-s_i$ と、従属する滑らかな分割1 $\rho_j$ から $u_i=\sum_j\rho_j\kappa_{ji}$ を作る。このとき局所形式 $\bar\partial_Tu_i$ は大域的な閉形式

$$
\alpha_\xi\in\mathcal A^{0,1}(X,T_X),
\qquad \bar\partial_T\alpha_\xi=0
$$

> に貼り合わさる。類 $[\alpha_\xi]\in H_{\bar\partial}^{0,1}(X,T_X)$ は持ち上げ、分割1、被覆の選択によらず、正則接束版Dolbeault同型の下で $\operatorname{KS}_{\pi,b_0}(\xi)$ に対応する。
<!-- formal-statement-end -->

### 証明の見取り図

$u_j-u_i=\kappa_{ij}$ と、その右辺が正則であることが核心である。$\bar\partial$ を作用させると差が消え、局所形式は一枚に貼れる。滑らかな持ち上げの取り替えは $\bar\partial$-完全形式しか加えない。

<!-- proof-start -->
### 証明

直前で示した $u_j-u_i=\kappa_{ij}$ と $\bar\partial_T\kappa_{ij}=0$ より、$\bar\partial_Tu_i$ は一致して大域形式 $\alpha_\xi$ になる。[Dolbeault微分の二乗零](../../CM/CM2-04/index.md#def-cm2-04-dolbeault-complex)を局所的に適用すれば $\bar\partial_T\alpha_\xi=\bar\partial_T^2u_i=0$ である。

他の滑らかな補正 $u'_i$ が同じ差 $u'_j-u'_i=\kappa_{ij}$ を満たすなら、$v_i=u'_i-u_i$ は重なりで一致して大域的な滑らかな接ベクトル場 $v$ になる。従って $\alpha'_\xi-\alpha_\xi=\bar\partial_Tv$ である。正則持ち上げを変更した場合は[Čech類の選択独立性](#prop-def1-01-cocycle)で $\kappa'_{ij}=\kappa_{ij}+a_j-a_i$。$u'_i=u_i+a_i-\sum_j\rho_ja_j$ と選べば $\alpha'_\xi-\alpha_\xi=-\bar\partial_T(\sum_j\rho_ja_j)$ となり、やはり完全形式である。被覆を細分した後も同じ計算を適用できる。

逆に $[\alpha_\xi]=0$ と仮定する。大域的な滑らかな接ベクトル場 $v$ があり、$\alpha_\xi=\bar\partial_Tv$ となる。すると $h_i=u_i-v$ は $\bar\partial_Th_i=0$ を満たすので局所正則接ベクトル場であり、$h_j-h_i=\kappa_{ij}$ である。従ってČech類も零である。

一般のČech一次類について同じ分割1の構成を行えば、局所 $\bar\partial$-Poincaré補題によって閉Dolbeault形式から逆向きの局所原始関数を作れる（[局所補題](../../CM/CM2-03/index.md#thm-cm2-03-local-dbar-poincare)）。ゆえにこの対応は、[正則ベクトル束版Dolbeaultの定理](../../CYG/CYG1-12/index.md#thm-cyg1-12-bundle-dolbeault)の一次の場合の具体的な実現である。$\square$
<!-- proof-end -->

**滑らかな自明化での読み方。** [Ehresmann局所自明化](#thm-def1-01-ehresmann)から得る滑らかな水平持ち上げを複素化し、その $(1,0)$ 成分を $S$ とする。$d\pi$ は複素線形なので $d\pi(S)=\widetilde\xi$ となり、$S$ は上の $s_i$ と同じ方向を持ち上げる。$u_i=s_i-S$ は垂直で $u_j-u_i=\kappa_{ij}$ だから、

$$
\alpha_\xi=\bar\partial_T(s_i-S)=-\bar\partial S|_X.
$$

右辺は局所座標で $s_i$ が正則であることから得られ、値は垂直接束に入る。滑らかな自明化がどれほど複素構造を保存し損ねているかを測る形式が、重なりの差で作ったČech類と同じになる。

## 5. 楕円曲線の族で非零の類を計算する

$D$ を $i$ の近くの小円板で、全ての $\tau\in D$ が $\operatorname{Im}\tau>0$ を満たすものとし、

$$
E_\tau=\mathbb C/(\mathbb Z+\tau\mathbb Z)
$$

と置く。全空間は $(w,\tau)\in\mathbb C\times D$ を $(w,\tau)\sim(w+m+n\tau,\tau)$（$m,n\in\mathbb Z$）で割って得る。格子の作用は自由かつ適切に不連続な正則変換だから、商は複素多様体で、$\pi([w,\tau])=\tau$ は正則沈め込みとなる。各ファイバーは実二次元トーラスであり、基底のコンパクト集合上でも実座標 $(x,y)\bmod\mathbb Z^2$ によって全空間をコンパクトなトーラスとその集合の積として表せるので、$\pi$ は固有である。

中心を $\tau_0=i$、基底の小パラメータを $t=\tau-i$ とする。滑らかな実トーラスの座標を $z=x+iy$（$x,y\bmod1$）とすれば、ファイバー $E_\tau$ の正則座標への持ち上げは

$$
w=x+\tau y=z+t y,
\qquad y=\frac{z-\bar z}{2i}.
$$

$t$ を固定して $z$ で微分すると

$$
\partial_z w=1+\frac{t}{2i},
\qquad\partial_{\bar z}w=-\frac{t}{2i}.
$$

$w$ に関して反正則方向となる接ベクトルを、滑らかな $z$ 座標で $\partial_{\bar z}+\mu(t)\partial_z$ と書く。これが正則座標 $w$ を消すという条件を解くと

$$
0=\partial_{\bar z}w+\mu(t)\partial_z w,
\qquad\mu(t)=\frac{t}{2i+t}.
$$

従って $t=0$ での一次係数は

$$
\left.\frac{d\mu}{dt}\right|_{t=0}
=\frac1{2i},
\qquad
\alpha_{\partial_t}=\frac1{2i}\,d\bar z\otimes\partial_z.
$$

この符号は前節の $\alpha=-\bar\partial S$ と一致する。実際、滑らかな持ち上げは $S=\partial_t|_w+y\partial_w$、局所正則持ち上げは $s=\partial_t|_w$ なので、$u=s-S=-y\partial_w$、$-\bar\partial y=1/(2i)\,d\bar z$ となる。

非零性も確認しよう。[楕円曲線の非完全な定数形式](../../CYG/CYG1-12/index.md#prop-cyg1-12-torus-directions)と同様、仮に $\alpha_{\partial_t}=\bar\partial_T(v\partial_z)$ なら周期的な滑らかな $v(x,y)$ が $\partial_{\bar z}v=1/(2i)$ を満たす。しかし基本領域 $[0,1]^2$ で積分すると

$$
\begin{aligned}
\int_{[0,1]^2}\partial_{\bar z}v\,dx\,dy
&=\frac12\int_0^1\bigl(v(1,y)-v(0,y)\bigr)\,dy\\
&\quad+\frac{i}{2}\int_0^1\bigl(v(x,1)-v(x,0)\bigr)\,dx=0,
\end{aligned}
$$

一方、定数右辺の積分は $1/(2i)\ne0$。矛盾するので $\operatorname{KS}_{\pi,i}(\partial_t)$ は非零である。**実際に動く正則な族**が、抽象的な一次類を生んだ。

これに対し積の族 $X\times D\to D$ なら全ての局所正則持ち上げを $\partial_t$ に取れて $\kappa_{ij}=0$、従ってKodaira–Spencer写像も零である。

## 6. 基底を取り替えると一次方向はどう変わるか

<a id="prop-def1-01-base-change"></a>

<!-- formal-statement-start -->
> **命題（Kodaira–Spencer写像の基底変更）**
>
> $\pi:\mathcal X\to B$ を固有正則沈め込み、$g:C\to B$ を正則写像、$c_0\in C$、$b_0=g(c_0)$ とする。引き戻し族 $\pi':\mathcal X\times_BC\to C$ を考え、共通の中心ファイバーを $X$ と同一視する。このとき $\eta\in T_{c_0}^{1,0}C$ について

$$
\operatorname{KS}_{\pi',c_0}(\eta)
=\operatorname{KS}_{\pi,b_0}(dg_{c_0}(\eta))
\quad\text{in }H^1(X,T_X).
$$
<!-- formal-statement-end -->

### 証明の見取り図

引き戻し族の遷移関数は、元の遷移関数の基底座標へ $g$ を代入したものになる。一次の座標変更率には連鎖律で $dg$ が掛かり、差のČech類にも同じ係数が現れる。

<!-- proof-start -->
### 証明

元の族の局所正則座標を $(z_i,t)$、その遷移を $z_j=f_{ji}(z_i,t)$ とする。引き戻し族では $z_j=f_{ji}(z_i,g(c))$ である。$\eta\in T_{c_0}^{1,0}C$ で微分し、値 $t=b_0$ を代入すると

$$
d_c\bigl(f_{ji}(z_i,g(c))\bigr)_{c_0}(\eta)
=d_t f_{ji}(z_i,b_0)\bigl(dg_{c_0}(\eta)\bigr).
$$

この式を接ベクトル場へ変換する際の添字を明示する。ファイバーの複素次元を $n$、基底の複素次元を $m$ とし、$z_j^\nu=f_{ji}^\nu(z_i,t)$、$\eta=\sum_r\eta^r\partial_{c^r}$ と書く。$z_i$ を固定して微分すると

$$
\begin{aligned}
\kappa'_{ij}(\eta)
&=-\sum_{\nu=1}^n\left(\sum_{a=1}^m
\frac{\partial f_{ji}^\nu}{\partial t^a}(z_i,b_0)
\sum_r\frac{\partial g^a}{\partial c^r}(c_0)\eta^r\right)
\partial_{z_j^\nu}\\
&=\kappa_{ij}\bigl(dg_{c_0}(\eta)\bigr).
\end{aligned}
$$

最初の負号は第3節で定めた $s_j-s_i$ の順序から来る。各成分の複素連鎖律を適用したのであり、$c$ を微分するとき $z_i$ は固定している。したがって二つのČechコサイクルが一致し、類を取れば結論を得る。$\square$
<!-- proof-end -->

例えば第5節の楕円曲線族を $\tau=i+s^2$ で引き戻す。$s=0$ では $d\tau/ds=0$ なので、引き戻した族のKodaira–Spencer写像は零である。しかし $s\ne0$ では $\tau$ が動く。**写像が零であることは、その一点での一次変化が零という意味であり、族全体が自明であることの証明ではない。**

## 7. 演習――持ち上げ、符号、Čech類、実際の族

<a id="ex-def1-01-a01"></a>
#### DEF1-01-A01 遷移座標から差を計算する
- Level: A

基底を一次元とし、二つの局所正則積座標の遷移を $z_j=e^t z_i$ とする。$t=0$ で $s_i=\partial_t|_{z_i}$、$s_j=\partial_t|_{z_j}$ の差を $z_j$ 座標で求めよ。

<!-- solution-start -->
**詳細解答。** $s_i(z_j)=\partial_t(e^t z_i)|_{z_i}=e^t z_i=z_j$ であり、$s_j(z_j)=0$ である。両者は基底の $\partial_t$ に写るから、差は垂直である。[持ち上げの差の定義](#def-def1-01-kodaira-spencer)では $s_j-s_i$ とするので、$t=0$ で

$$
\kappa_{ij}=-(s_i(z_j))\partial_{z_j}=-z_j\partial_{z_j}.
$$

符号を反対にするのは、差の順序を逆に取った場合だけである。
<!-- solution-end -->

<a id="ex-def1-01-a02"></a>
#### DEF1-01-A02 三重交叉でČech閉条件を検算する
- Level: A

同じ局所正則接枠で書ける三重交叉に、正則ベクトル場 $A,B$ がある。$\kappa_{01}=A$、$\kappa_{12}=B$、$\kappa_{02}=A+B$ が一次コサイクルの条件を満たすことを示せ。

<!-- solution-start -->
**詳細解答。** [Čech差の閉条件](#prop-def1-01-cocycle)は三重交叉で $\kappa_{12}-\kappa_{02}+\kappa_{01}=0$ である。与えられた値を代入すれば

$$
B-(A+B)+A=0.
$$

これは $A,B$ が互いに等しい必要はなく、三つの差が合計で相殺される条件である。
<!-- solution-end -->

<a id="ex-def1-01-a03"></a>
#### DEF1-01-A03 持ち上げの変更で何が変わるか
- Level: A

局所正則持ち上げ $s_i$ を $s'_i=s_i+a_i$ に替える。ただし $a_i$ は垂直な正則ベクトル場とする。新しい $\kappa'_{ij}$ を求め、同じコホモロジー類になることを示せ。

<!-- solution-start -->
**詳細解答。** $d\pi(a_i)=0$ なので $d\pi(s'_i)=d\pi(s_i)=\widetilde\xi$ であり、依然として持ち上げである。差を取ると

$$
\kappa'_{ij}=s'_j-s'_i
=s_j+a_j-s_i-a_i=\kappa_{ij}+(a_j-a_i).
$$

$a_j-a_i=(\delta a)_{ij}$ は零次コチェインのČech境界である。[選択独立性](#prop-def1-01-cocycle)により $[\kappa']=[\kappa]$ となる。
<!-- solution-end -->

<a id="ex-def1-01-a04"></a>
#### DEF1-01-A04 楕円曲線のBeltrami係数
- Level: A

$w=z+t(z-\bar z)/(2i)$ とし、$t$ を固定する。$\partial_{\bar z}+\mu(t)\partial_z$ が $w$ を消すように $\mu(t)$ を決め、$t=0$ の一次係数を求めよ。

<!-- solution-start -->
**詳細解答。** $\partial_z(z-\bar z)=1$、$\partial_{\bar z}(z-\bar z)=-1$ より

$$
\partial_z w=1+\frac{t}{2i},\qquad
\partial_{\bar z}w=-\frac{t}{2i}.
$$

$0=\partial_{\bar z}w+\mu\partial_z w$ を解くと $\mu(t)=(t/(2i))/(1+t/(2i))=t/(2i+t)$ である。$\mu(0)=0$、$\mu'(0)=(2i)/(2i)^2=1/(2i)$。したがって一次形式は $(1/(2i))d\bar z\otimes\partial_z$ となる。
<!-- solution-end -->

<a id="ex-def1-01-a05"></a>
#### DEF1-01-A05 自明な族の写像
- Level: A

任意のコンパクト複素多様体 $X$ と円板 $D$ について、積の族 $X\times D\to D$ のKodaira–Spencer写像が全方向で零であることを示せ。

<!-- solution-start -->
**詳細解答。** 基底の正則接方向 $\xi$ を定数係数で延長し、全空間の各積チャートで $s_i=(0,\widetilde\xi)$ と取れる。これは同じ大域的な正則ベクトル場の制限なので、重なりで $s_j-s_i=0$。従ってČechコサイクルが零であり、[写像の定義](#def-def1-01-kodaira-spencer)によって $\operatorname{KS}(\xi)=[0]=0$ となる。$\xi$ は任意だから写像全体が零である。
<!-- solution-end -->

<a id="ex-def1-01-b01"></a>
#### DEF1-01-B01 なぜ固有性が必要か
- Level: B

$\mathcal Y=\{(t,z)\in\mathbb C^2:tz\ne1\}$ とし $\pi(t,z)=t$ とする。$\pi$ が正則沈め込みであること、固有でないこと、$0$ の近くで滑らかなファイバー束にならないことを示せ。

<!-- solution-start -->
**詳細解答。** $\mathcal Y$ は正則関数 $tz-1$ の非零集合なので開な複素多様体である。$d\pi(\partial_t)=1$ により全点で沈め込みとなる。$\{0\}\subset\mathbb C$ はコンパクトだが逆像 $\{0\}\times\mathbb C$ は非コンパクトなので、$\pi$ は固有でない。

$t=0$ のファイバーは $\mathbb C$ で単連結である。$t\ne0$ のファイバーでは $z=1/t$ が一つ取り除かれ、$\mathbb C\setminus\{1/t\}$ は円へ変形収縮して基本群 $\mathbb Z$ を持つ。微分同相は基本群を保存するため両者を同一視できず、[Ehresmann定理](#thm-def1-01-ehresmann)の結論を固有性なしには導けない。
<!-- solution-end -->

<a id="ex-def1-01-b02"></a>
#### DEF1-01-B02 Čech類を閉Dolbeault形式へ移す
- Level: B

$\kappa_{ij}$ を正則接束の一次Čechコサイクルとし、分割1 $\rho_j$ を取る。$u_i=\sum_j\rho_j\kappa_{ji}$ が $u_j-u_i=\kappa_{ij}$ を満たすこと、$\alpha|_{U_i}=\bar\partial_Tu_i$ が大域的かつ閉であることを計算せよ。

<!-- solution-start -->
**詳細解答。** 三重交叉の閉条件は $\kappa_{kj}-\kappa_{ki}=\kappa_{ij}$ と書ける。よって

$$
u_j-u_i=\sum_k\rho_k(\kappa_{kj}-\kappa_{ki})
=\kappa_{ij}\sum_k\rho_k=\kappa_{ij}.
$$

$\kappa_{ij}$ は正則なので $\bar\partial_T(u_j-u_i)=\bar\partial_T\kappa_{ij}=0$。従って局所形式は重なりで一致する。また $\bar\partial_T\alpha|_{U_i}=\bar\partial_T^2u_i=0$ であり、大域的に閉じる。これは[Čech–Dolbeault対応](#thm-def1-01-cech-dolbeault)の構成を、差と微分の二段に分けて確認したものである。
<!-- solution-end -->

<a id="ex-def1-01-b03"></a>
#### DEF1-01-B03 一次が零でも族は変わりうる
- Level: B

楕円曲線の族 $E_\tau$ を $\tau=i+s^2$ で引き戻す。$s=0$ でのKodaira–Spencer類を求め、$s$ が非零のときに同じ計算から何が言えるか説明せよ。

<!-- solution-start -->
**詳細解答。** 基底写像 $g(s)=i+s^2$ の微分は、各 $s$ で

$$
dg_s(\partial_s)=2s\,\partial_\tau|_{\tau=i+s^2}
$$

である。従って $dg_0(\partial_s)=0$ で、[基底変更の命題](#prop-def1-01-base-change)から $\operatorname{KS}_{g^*\pi,0}(\partial_s)=\operatorname{KS}_{\pi,i}(0)=0$ となる。

一方、$s\ne0$ での非零性も、中心を $\tau_0=i+s^2$ として直接確かめる。$\tau_0$ を固定して滑らかな基準座標 $z=x+\tau_0y$ を選ぶと、

$$
y=\frac{z-\bar z}{\tau_0-\bar\tau_0},
\qquad u=\tau-\tau_0,
\qquad w=z+uy
$$

である。$u$ を固定して $z,\bar z$ に関する偏微分を取り、$w$ を消す $(0,1)$ 方向を解くと

$$
\mu(u)=\frac{u}{\tau_0-\bar\tau_0+u},
\qquad
\left.\frac{d\mu}{du}\right|_{u=0}
=\frac{1}{\tau_0-\bar\tau_0}\ne0.
$$

この定数係数形式は、第5節と同じ周期積分により $\bar\partial_T$-完全ではない。よって $\operatorname{KS}_{\pi,\tau_0}(\partial_\tau)\ne0$ であり、$2s\ne0$ と基底変更公式から引き戻しの一次類も非零である。$s=0$ で零なのは一階微分が消えたためであり、全パラメータで自明という主張にはならない。
<!-- solution-end -->

<a id="ex-def1-01-c01"></a>
#### DEF1-01-C01 正則な族から非自明な一次変形までを再構成する
- Level: C

$D$ を $i$ の近くの $\operatorname{Im}\tau>0$ に含まれる円板とし、$E_\tau=\mathbb C/(\mathbb Z+\tau\mathbb Z)$ の族を考える。実トーラスの座標 $z=x+iy$、$\tau=i+t$ に対して $w=x+\tau y$ とする。

1. $w$ が格子商の正則座標を与え、全空間が固有正則沈め込みの族となる理由を説明せよ。
2. 滑らかな $z$ 座標で一次Beltrami形式を計算せよ。
3. 得られた形式のDolbeault類が非零であることを周期積分で示し、これがKodaira–Spencer類と一致する根拠を述べよ。
4. $t=s^2$ の引き戻し族では、$s=0$ の一次類がどうなるか判定せよ。

<!-- solution-start -->
**詳細解答。** (1) 格子の二つの生成元は $w\mapsto w+1$、$w\mapsto w+\tau$ で、$(w,\tau)$ の正則変換である。$\operatorname{Im}\tau>0$ のもとで自由かつ適切に不連続に作用するから商は複素多様体になる。射影 $[w,\tau]\mapsto\tau$ は局所的に基底への正則射影であり、微分が全射である。$x,y$ を各々 $\bmod1$ とした滑らかな表示で、コンパクトな基底集合の逆像は実トーラスとの積としてコンパクトだから固有である。

(2) $y=(z-\bar z)/(2i)$ なので $w=z+t(z-\bar z)/(2i)$。$\partial_z w=1+t/(2i)$、$\partial_{\bar z}w=-t/(2i)$。$\partial_{\bar z}+\mu(t)\partial_z$ が $w$ を消す条件から $\mu(t)=t/(2i+t)$、従って $\mu'(0)=1/(2i)$。一次Beltrami形式は $\alpha=(1/(2i))d\bar z\otimes\partial_z$ である。

(3) 複素一次元では $(0,2)$ 形式がないため $\bar\partial_T\alpha=0$ である。$\alpha=\bar\partial_T(v\partial_z)$ なら $\partial_{\bar z}v=1/(2i)$ を満たす格子周期的な $v$ が必要である。

$\partial_{\bar z}=\tfrac12(\partial_x+i\partial_y)$ を基本領域 $[0,1]^2$ で積分すると、左辺は周期境界の差の積分なので $0$、右辺は $1/(2i)$ で矛盾する。従って $[\alpha]\ne0$。

滑らかな水平持ち上げ $S=\partial_t|_w+y\partial_w$ と局所正則持ち上げ $s=\partial_t|_w$ の差 $s-S=-y\partial_w$ に $\bar\partial_T$ を作用させると同じ $\alpha$ を得る。このため、[Čech–Dolbeault対応](#thm-def1-01-cech-dolbeault)によりこの非零類がKodaira–Spencer類である。

(4) $t=s^2$ の微分は $s=0$ で零である。[基底変更](#prop-def1-01-base-change)から、引き戻した族の $s=0$ のKodaira–Spencer類は零となる。一階が消えても二階で族が動くことはあり、元の族の非零性と矛盾しない。
<!-- solution-end -->

## 8. 次に何を検査するのか

実際の正則変形族から、局所正則持ち上げの差をČechコサイクルにし、それを大域的な閉Dolbeault形式へ移せた。写像は選択に依存せず、基底変更に自然である。ここで得たのは**与えられた族の一次変化**であり、任意の $H^1(X,T_X)$ の類が実際の族へ延びるか、族を尽くす基底が存在するかはまだ分からない。次はBeltrami微分そのものの座標独立性と、変形を高次へ延長するために必要な方程式を調べる。
