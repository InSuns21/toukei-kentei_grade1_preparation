# GBG26 第二Chern数は純ゲージ場と非自明な場をどう区別するか

[GBG25のクラッチング束](../GBG25/index.md#def-gbg25-clutching)は、北と南のどちらでも自明だが、赤道上の写像 $f:S^3\to SU(2)$ の次数によって大域的な違いが現れた。では接続を入れたとき、その違いは曲率から測れるのだろうか。

一つのパッチで $A=g^{-1}dg$ と書ける接続は、そこで曲率が零である。しかしその式が**一つの大域的なゲージ**で成立するかは別問題である。本講では[第二Chern形式の正規化](../GBG23/index.md#prop-gbg23-low-chern)を出発点に、4次元の積分を赤道 $S^3$ の積分へ変え、前講の次数と**符号を含めて**照合する。その結果、非自明な束の曲率をどこかに生じさせなければならないことが分かる。

**規約**。$S^4=\{(y,t)\in\mathbb R^4\times\mathbb R:|y|^2+t^2=1\}$ には $\mathbb R^5$ の標準向きからの境界向きを入れる。北閉半球 $D_N=\{t\ge0\}$ は $y$ 座標の標準向き、南閉半球 $D_S=\{t\le0\}$ はその逆向きである。赤道 $E=S^3$ には $\partial D_N$ の向き、すなわち $\mathbb R^4$ の単位球の外向き境界の向きを入れる。主作用は右作用、$s_S=s_N f$、構造群は $SU(2)$、$\operatorname{tr}$ は**基本2次元複素表現の通常の行列跡**とする。接続行列 $A$ と曲率 $F=dA+A\wedge A$ は反Hermite・跡零であり、積は行列積と微分形式の外積を合わせたものを表す。

## 1. 何を第二Chern数として積分するか

[GBG23の全Chern形式](../GBG23/index.md#def-gbg23-total-chern)は $C=iF/(2\pi)$ に対する $\det(I+C)$ から構成された。$SU(2)$ の基本表現では $\operatorname{tr}F=0$ なので、[低次の跡公式](../GBG23/index.md#prop-gbg23-low-chern)に代入すると

$$
c_2(A)=\frac12\left(\frac{i}{2\pi}\right)^2
\bigl((\operatorname{tr}F)^2-\operatorname{tr}(F\wedge F)\bigr)
=\frac{1}{8\pi^2}\operatorname{tr}(F\wedge F).
$$

右辺は4形式であり、特に4次元で積分できる。曲率を局所sectionで書いても $F_S=f^{-1}F_Nf$ だから跡の循環性で両側の4形式が一致する。ここで $c_2$ はまず実係数の閉4形式であり、**任意の4多様体で積分が常に整数になるとこの局所式だけから推論することはできない**。

<a id="def-gbg26-chern-number"></a>

<!-- formal-statement-start -->
> **定義（SU(2)束の第二Chern数）**  
> 向き付き閉4次元滑らかな多様体 $M$、滑らかな右主 $SU(2)$ 束 $P\to M$ とその接続 $A$ に対し、基本表現での第二Chern数を

$$
k(P,A)=\frac{1}{8\pi^2}\int_M\operatorname{tr}(F_A\wedge F_A)
$$

> と定める。積分の向き、曲率 $F_A=dA+A\wedge A$、および行列跡は上の規約で固定する。
<!-- formal-statement-end -->

<!-- definition-example-start: def-gbg26-chern-number -->
**定義の確認**。積束 $M\times SU(2)$ で大域的に $A=0$ を選べば $F_A=0$ だから $k=0$。$A$ を任意の局所ゲージで書き直しても、[曲率のゲージ変換則](../GBG10/index.md#thm-gbg10-gauge-transform) $F^g=g^{-1}Fg$ から

$$
\operatorname{tr}(F^g\wedge F^g)
=\operatorname{tr}(g^{-1}(F\wedge F)g)
=\operatorname{tr}(F\wedge F)
$$

となり、局所表示によらないことを直接確認できる。後で $P_Q$ に対して $k=1$ を計算する。
<!-- definition-example-end -->

[GBG22の接続非依存性](../GBG22/index.md#cor-gbg22-class-independence)は同じ束の二接続について $c_2(A_1)-c_2(A_0)=dT$ を保証する。閉多様体では [Stokesの定理](../../GEO/GEO8/index.md#thm-geo8-general-stokes)によって $\int_MdT=0$ だから $k(P,A)$ は接続に依存せず、以後 $k(P)$ と書く。ただし境界のある多様体では $\int_MdT=\int_{\partial M}T$ が残るので、この結論をそのまま流用しない。

## 2. 局所的な純ゲージとその曲率

局所sectionを $s$ から $sg$ に替えると、[GBG8の変換則](../GBG8/index.md#thm-gbg8-local-transform)から $A^g=g^{-1}Ag+g^{-1}dg$ となる。とくに $A=0$ をゲージ変更したものは $g^{-1}dg$ である。この局所的な形だけを見ても、基底全体に同じ $g$ があるとは限らない。

<a id="def-gbg26-pure-gauge"></a>

<!-- formal-statement-start -->
> **定義（局所純ゲージ接続）**  
> 開集合 $U\subset M$ 上の自明な $SU(2)$ 主束の接続行列 $A$ が、滑らかな $g:U\to SU(2)$ を用いて

$$
A=g^{-1}dg
$$

> と書けるとき、$A$ は $U$ 上で純ゲージであるという。これは特定の自明化での表示に関する記述であり、任意の非自明束に対する大域的な行列 $A$ の存在を前提としない。
<!-- formal-statement-end -->

<!-- definition-example-start: def-gbg26-pure-gauge -->
**定義の確認**。実数値の滑らかな関数 $\phi:U\to\mathbb R$ について

$$
g=\begin{pmatrix}e^{i\phi}&0\\0&e^{-i\phi}\end{pmatrix},
\qquad
g^{-1}dg=
\begin{pmatrix}i&0\\0&-i\end{pmatrix}d\phi.
$$

$g^\dagger g=I_2$、$\det g=1$ なので $g$ は確かに $SU(2)$ 値である。$\phi$ が非定数なら $A$ 自体は零ではないが、$d^2\phi=0$ と $d\phi\wedge d\phi=0$ により $F=0$ になる。
<!-- definition-example-end -->

一般の行列 $g$ に対しても $\theta=g^{-1}dg$ と置き、$d(g^{-1})=-g^{-1}(dg)g^{-1}$ を微分すると

$$
d\theta=d(g^{-1})\wedge dg
=-g^{-1}dg\wedge g^{-1}dg
=-\theta\wedge\theta.
$$

これは[Lie群上のMaurer–Cartan方程式](../GBG7/index.md#prop-gbg7-maurer-cartan-fibre)を行列で確認したものである。したがって $F_\theta=d\theta+\theta\wedge\theta=0$。この含意は「純ゲージなら平坦」であって、「どの平坦接続も任意の領域で単一の大域ゲージを持つ」という主張ではない。

## 3. 曲率の4形式を境界の3形式へ

4形式の原始形式（外微分を取ると元の形式になる3形式）を使えば、球面を二つの半球に分けて Stokes を適用できる。[GBG22の局所Chern–Simons形式](../GBG22/index.md#def-gbg22-local-chern-simons)の跡多項式の場合を、ここでは正規化係数を外して扱う。

二次の多項式 $p(X,Y)=\operatorname{tr}(XY)$ を、[GBG22の局所 Chern–Simons 形式](../GBG22/index.md#def-gbg22-local-chern-simons)に入力する。補間 $A_t=tA$、曲率 $F_t=t\,dA+t^2A^2$ を代入すると

$$
\begin{aligned}
\operatorname{CS}_3(A)
&=2\int_0^1\operatorname{tr}(A\wedge F_t)\,dt\\
&=2\int_0^1\left(t\operatorname{tr}(A\wedge dA)
+t^2\operatorname{tr}(A^3)\right)dt\\
&=\operatorname{tr}\left(A\wedge dA+\frac23A^3\right).
\end{aligned}
$$

これは局所自明化上の3形式であり、一般には基底全体に貼り合わされない。[GBG22の原始形式命題](../GBG22/index.md#prop-gbg22-local-cs-primitive)は、いま代入した $p$ と $k=2$ に対して

$$
d\,\operatorname{CS}_3(A)=\operatorname{tr}(F\wedge F)
$$

を与える。ここで係数・式の展開を自分で確かめよう。$A$ は次数1、$dA$ は次数2なので、[次数付きLeibniz則](../../GEO/GEO7/index.md#thm-geo7-graded-leibniz)と跡の次数付き巡回性から

$$
d\,\operatorname{tr}(A\wedge dA)=\operatorname{tr}((dA)^2),
\qquad
d\,\operatorname{tr}(A^3)=3\operatorname{tr}(dA\,A^2)
$$

となる。途中では $\operatorname{tr}(A\,dA\,A)=-\operatorname{tr}(dA\,A^2)$ を用いる。また $\operatorname{tr}(A^4)=0$ は、最初の次数1の因子を末尾へ巡回させると $(-1)^{1\cdot3}=-1$ を得るためである。従って

$$
\begin{aligned}
d\,\operatorname{CS}_3(A)
&=\operatorname{tr}((dA)^2+2dA\,A^2)\\
&=\operatorname{tr}((dA)^2+dA\,A^2+A^2dA+A^4)
=\operatorname{tr}(F^2).
\end{aligned}
$$

<a id="calc-gbg26-pure-cs"></a>

**純ゲージでの境界計算**。$A=\theta=g^{-1}dg$ なら $d\theta=-\theta^2$ を代入して

$$
\operatorname{CS}_3(\theta)
=\operatorname{tr}\left(-\theta^3+\frac23\theta^3\right)
=-\frac13\operatorname{tr}(\theta^3).
$$

$A=0$ なら $\operatorname{CS}_3(0)=0$。一方で純ゲージの $\theta$ は曲率が零でも、$\operatorname{CS}_3(\theta)$ は非零になり得る。ここが4次元積分と3次元境界写像をつなぐ鍵である。

## 4. 赤道の3形式はGBG25の次数と一致するか

[GBG25の標準同一視](../GBG25/index.md#def-gbg25-su2-s3)を $Q:S^3\to SU(2)$ とする。$SU(2)$ 上の $\Theta=U^{-1}dU$ は行列値1形式であり、$Q$ に引き戻せば $Q^{-1}dQ$ になる。これから作る3形式の定数を定めたい。

<a id="def-gbg26-boundary-form"></a>

<!-- formal-statement-start -->
> **定義（正規化されたSU(2)境界3形式）**  
> $SU(2)$ 上のMaurer–Cartan形式 $\Theta=U^{-1}dU$ に対して

$$
\eta=\frac{1}{24\pi^2}\operatorname{tr}(\Theta^3)
$$

> と置く。$SU(2)$ の向きは [GBG25の $Q$](../GBG25/index.md#def-gbg25-su2-s3) から移したものとする。
<!-- formal-statement-end -->

<!-- definition-example-start: def-gbg26-boundary-form -->
**定義の確認**。$Q(1,0)=I_2$ の接空間で、$S^3\subset\mathbb R^4$ の正の接ベクトルを $e_2,e_3,e_4$ とする。$Q$ の微分から

$$
X_2=\begin{pmatrix}i&0\\0&-i\end{pmatrix},\quad
X_3=\begin{pmatrix}0&-1\\1&0\end{pmatrix},\quad
X_4=\begin{pmatrix}0&i\\i&0\end{pmatrix}
$$

を得る。$X_2X_3X_4=I_2$、$X_iX_j=-X_jX_i$（$i\ne j$）なので

$$
(Q^*\operatorname{tr}(\Theta^3))(e_2,e_3,e_4)
=6\operatorname{tr}(X_2X_3X_4)=12.
$$

Maurer–Cartan形式の三次跡は左移動で不変であり、$Q$ を介する左移動は $\mathbb C^2$ 上の $SU(2)$ のユニタリ作用なので、標準球面の向きと体積を保つ。ゆえにこの一点で比較した係数12は全 $S^3$ 上で同じである。[GBG25の正規化体積形式 $\nu$](../GBG25/index.md#def-gbg25-degree)について

$$
Q^*\operatorname{tr}(\Theta^3)=12\,d\operatorname{vol}_{S^3}
=24\pi^2\nu,\qquad \int_{S^3}Q^*\eta=1.
$$

$24\pi^2$ の係数と正符号が、後で出てくる第二Chern数の符号を決める。
<!-- definition-example-end -->

<a id="lem-gbg26-boundary-degree"></a>

<!-- formal-statement-start -->
> **補題（境界3形式とクラッチング次数）**  
> 滑らかな $f:S^3\to SU(2)$ と $\theta=f^{-1}df$ について、GBG25で定義した積分次数と

$$
\frac{1}{24\pi^2}\int_{S^3}\operatorname{tr}(\theta^3)=\deg(f)
$$

> が一致する。$S^3$ の向きは北半球の境界向きである。
<!-- formal-statement-end -->

**証明の見取り図**。$h=Q^{-1}\circ f$ と書き、$Q^*\eta=\nu$ を引き戻す。

<!-- proof-start -->
### 証明

$f=Q\circ h$、$\theta=f^*\Theta$ なので、引戻しの合成規則から

$$
\frac1{24\pi^2}\operatorname{tr}(\theta^3)
=f^*\eta=h^*(Q^*\eta)=h^*\nu.
$$

両辺を同じ向きの $S^3$ で積分する。[積分次数の定義](../GBG25/index.md#def-gbg25-degree)は $\deg f=\int_{S^3}h^*\nu$ であるため、主張を得る。
<!-- proof-end -->

具体的には $f=I_2$（定数）なら $\theta=0$ で積分0、$f=Q$ なら1、$f(q)=Q(q)^{-1}$ なら[逆元写像の次数](../GBG25/index.md#def-gbg25-degree)から $-1$ になる。

## 5. 二つの半球の積分を接続する

ここまでの三つの式を組み合わせる。

$$
\operatorname{tr}(F^2)=d\operatorname{CS}_3(A),\qquad
\operatorname{CS}_3(f^{-1}df)=-\frac13\operatorname{tr}((f^{-1}df)^3),\qquad
\int_{S^3}\operatorname{tr}((f^{-1}df)^3)=24\pi^2\deg f.
$$

各閉半球上では接続の局所表示を選べる。ここで使う接続を具体的に作っておく。北側で $A_N=0$ とし、赤道近傍の南側では、遷移関数 $s_S=s_Nf$ に対する[局所ゲージ変換](../GBG8/index.md#thm-gbg8-local-transform)に合わせて $A_S=f^{-1}df=\theta$ とする。南半球内部の極に向かう方向では、$f(y/|y|)$ が極まで延びる必要はない。その代わり、赤道から少し離れたところで滑らかに零へ変形する。

正確には南半球の $y$ 座標の半径を $r=|y|$ とし、$r$ が1に近いところで $\chi(r)=1$、$r$ が0に近いところで $\chi(r)=0$ とする滑らかな関数を取り、

$$
A_N=0\quad\text{on }D_N,\qquad
A_S=\chi(r)\,\theta,\quad
\theta=f(y/r)^{-1}d\bigl(f(y/r)\bigr)\quad\text{on }D_S
$$

と置く。$r$ が小さいところでは $A_S=0$ として延長する。赤道の両側の襟領域で $A_S=\theta=f^{-1}A_Nf+f^{-1}df$ が成り立つので、これらの局所表示は[GBG25のクラッチング束](../GBG25/index.md#prop-gbg25-principal)上の滑らかな一つの接続に貼り合わされる。

<a id="thm-gbg26-clutching-number"></a>

<!-- formal-statement-start -->
> **定理（S⁴上のクラッチング次数と第二Chern数）**  
> $f:S^3\to SU(2)$ を滑らかとし、[GBG25の右主クラッチング束](../GBG25/index.md#def-gbg25-clutching) $P_f\to S^4$ を考える。上記の向き、右作用、$s_S=s_Nf$、基本2次元跡と $c_2=(8\pi^2)^{-1}\operatorname{tr}(F^2)$ の規約では、任意の滑らかな接続 $A$ に対して

$$
k(P_f)=\frac{1}{8\pi^2}\int_{S^4}\operatorname{tr}(F_A\wedge F_A)
=\frac{1}{24\pi^2}\int_{S^3}\operatorname{tr}((f^{-1}df)^3)
=\deg(f).
$$

> 特に $k(P_Q)=+1$、定数クラッチングの束では $k=0$、逆元クラッチングでは $k=-1$ である。
<!-- formal-statement-end -->

**証明の見取り図**。先に構成した接続で計算すればよい。北半球では $A_N=0$。南半球では曲率の4形式を Chern–Simons 3形式の外微分に変え、南半球の境界が赤道の**逆向き**であることを使う。最後に接続非依存性で一般の $A$ へ戻す。

<!-- proof-start -->
### 証明

先に構成した接続を $A_*$ とする。北半球で $A_N=0$ だから $F_N=0$。南半球には[CS原始形式の命題](../GBG22/index.md#prop-gbg22-local-cs-primitive)と[Stokesの定理](../../GEO/GEO8/index.md#thm-geo8-general-stokes)を適用する。

$$
\begin{aligned}
\int_{S^4}\operatorname{tr}(F_{A_*}^2)
&=\int_{D_N}d\operatorname{CS}_3(A_N)+\int_{D_S}d\operatorname{CS}_3(A_S)\\
&=\int_{\partial D_N}\operatorname{CS}_3(A_N)
  +\int_{\partial D_S}\operatorname{CS}_3(A_S)\\
&=0-\int_E\operatorname{CS}_3(A_S|_E).
\end{aligned}
$$

向きは $\partial D_N=+E$、$\partial D_S=-E$ である。赤道では $\chi=1$ なので $A_S|_E=\theta=f^{-1}df$。よって[純ゲージのCS計算](#calc-gbg26-pure-cs)を代入すると

$$
-\int_E\operatorname{CS}_3(\theta)
=+\frac13\int_E\operatorname{tr}(\theta^3).
$$

$8\pi^2$ で割れば $1/(24\pi^2)$ が現れ、[境界次数補題](#lem-gbg26-boundary-degree)から $\deg f$ に等しい。[GBG22のtransgressionによる接続非依存性](../GBG22/index.md#cor-gbg22-class-independence)により閉多様体 $S^4$ 上の他の接続でも積分値は同じである。定数・$Q$・逆元写像の次数は[GBG25での計算](../GBG25/index.md#def-gbg25-degree)によりそれぞれ $0,+1,-1$ となる。
<!-- proof-end -->

**内部計算でも確かめる**。南半球の $A_S=\chi\theta$ に対して、$d\theta=-\theta^2$ より

$$
F_S=d\chi\wedge\theta+(\chi^2-\chi)\theta^2.
$$

$\theta$ は赤道方向の3変数にしか依存しないため $\theta^4=0$、また $(d\chi\wedge\theta)^2=0$。2形式どうしの積を展開すると

$$
\operatorname{tr}(F_S^2)
=2(\chi^2-\chi)\,d\chi\wedge\operatorname{tr}(\theta^3).
$$

南半球の向きは半径 $r$ を先頭にした $dr\wedge d\operatorname{vol}_{S^3}$ の**逆**だから、半径方向の積分は

$$
-2\int_0^1(\chi^2-\chi)\,d\chi
=-2\left[\frac{\chi^3}{3}-\frac{\chi^2}{2}\right]_{\chi=0}^{\chi=1}
=\frac13.
$$

従って直接計算でも $\int_{S^4}\operatorname{tr}(F^2)=(1/3)\int_E\operatorname{tr}(\theta^3)$ が再現される。$F_S$ は一般に $\chi$ が0と1の間を動く帯で非零となる。**赤道近くで純ゲージに見えても、束全体が平坦になるわけではない。**

## 6. どの結論がどこまで言えるか

<a id="cor-gbg26-no-flat"></a>

<!-- formal-statement-start -->
> **系（非零第二Chern数は平坦接続を排除する）**  
> 向き付き閉4多様体 $M$ の右主 $SU(2)$ 束 $P$ で $k(P)\ne0$ なら、$P$ 上には $F_A=0$ を満たす滑らかな接続は存在しない。特に $P_Q\to S^4$ は平坦接続を持たない。
<!-- formal-statement-end -->

**証明の見取り図**。もし全域で $F_A=0$ なら第二Chern形式そのものが零である。これは積分値が非零という事実と直接矛盾する。

<!-- proof-start -->
### 証明

仮に $F_A=0$ の接続があるとする。[第二Chern数の定義](#def-gbg26-chern-number)より

$$
k(P)=\frac1{8\pi^2}\int_M\operatorname{tr}(0\wedge0)=0.
$$

$k(P)\ne0$ に矛盾する。$P_Q$ では[クラッチング定理](#thm-gbg26-clutching-number)が $k=1$ を与える。
<!-- proof-end -->

逆向きは成立しない。すなわち $k=0$ だからといって、**与えられた接続の** $F$ が零とは限らない。例えば自明束の一つの座標球内で、跡零・反Hermite行列 $T=\operatorname{diag}(i,-i)$、コンパクト台の滑らかな実関数 $b(x)$ を選んで

$$
A=T\,x_1b(x)\,dx_2
$$

と置き、球外では $A=0$ と滑らかに延長する。$T$ が定数行列で $dx_2\wedge dx_2=0$ だから

$$
F=T\,d(x_1b)\wedge dx_2,\qquad
F\wedge F=T^2\bigl(d(x_1b)\wedge dx_2\bigr)^2=0.
$$

$b=1$ となる小領域では $F=T\,dx_1\wedge dx_2\ne0$ だが、第二Chern形式は零である。$k=0$ と局所曲率零は異なる条件だと分かる。

もう一つの境界は**表現と向き**である。ここで $\operatorname{tr}$ を別の表現の跡へ交換すると係数は一般に変わる。また $S^4$ の向きを反転すると4形式の積分は負になる。物理で使う電荷 $-\frac1{8\pi^2}\int\operatorname{tr}(F^2)$ を選べば、本講の $k$ とは符号が逆になる。さらに境界のある4次元領域での積分は、境界条件を固定せずに閉多様体と同じ不変量だとはいえない。

**整数性について**。本講で計算した $P_f$ の値は[赤道写像の次数](../GBG25/index.md#def-gbg25-degree)に一致する。一般写像の次数が整数である事実はGBG25で別途必要な位相幾何の定理として範囲を区切った。任意の基底4多様体・任意の束の整数Chern類の一般構成までは、この半球計算だけでは得られない。

## 7. 演習と詳細解答

### Level A：正規化・外微分・向きを確かめる

<a id="ex-gbg26-a01"></a>
#### GBG26-A01 第二Chern形式の符号
- Level: A

$C=iF/(2\pi)$ とし、$2\times2$ 行列値2形式の $F$ が $\operatorname{tr}F=0$ を満たすとき、$\frac12((\operatorname{tr}C)^2-\operatorname{tr}(C^2))$ を展開して $c_2(F)$ を求めよ。

<!-- solution-start -->
**詳細解答**。$C$ は次数2なので行列成分の積で追加の符号は生じない。$\operatorname{tr}C=(i/(2\pi))\operatorname{tr}F=0$、$C^2=i^2(F\wedge F)/(4\pi^2)=-(F\wedge F)/(4\pi^2)$。従って

$$
c_2(F)=-\frac12\operatorname{tr}(C^2)
=-\frac12\left(-\frac{\operatorname{tr}(F\wedge F)}{4\pi^2}\right)
=\frac1{8\pi^2}\operatorname{tr}(F\wedge F).
$$

$+1/(8\pi^2)$ という符号は反Hermite規約と $i^2=-1$ の両方を用いた結果である。
<!-- solution-end -->

<a id="ex-gbg26-a02"></a>
#### GBG26-A02 純ゲージの曲率
- Level: A

$g:U\to SU(2)$ が滑らかで $A=g^{-1}dg$ とする。$d(g^{-1})$ を積の微分から求め、$F=dA+A^2=0$ を導け。

<!-- solution-start -->
**詳細解答**。$gg^{-1}=I_2$ を微分すると $dg\,g^{-1}+g\,d(g^{-1})=0$、左から $g^{-1}$ を掛けて $d(g^{-1})=-g^{-1}dg\,g^{-1}$。したがって

$$
dA=-g^{-1}dg\,g^{-1}\wedge dg
=-(g^{-1}dg)^2=-A^2.
$$

定義 $F=dA+A^2$ へ戻すと $F=0$。この計算は $U$ 上で $g$ が定義されることを仮定しており、大域的な $g$ は要求しない。
<!-- solution-end -->

<a id="ex-gbg26-a03"></a>
#### GBG26-A03 3形式の係数12
- Level: A

$X_2,X_3,X_4$ を[境界3形式の定義例](#def-gbg26-boundary-form)の行列とする。$X_2X_3X_4$ と $\operatorname{tr}(\Theta^3)(X_2,X_3,X_4)$ を計算せよ。

<!-- solution-start -->
**詳細解答**。まず

$$
X_2X_3=\begin{pmatrix}0&-i\\-i&0\end{pmatrix},
\qquad
X_2X_3X_4=\begin{pmatrix}1&0\\0&1\end{pmatrix}.
$$

互いに異なる $X_i$ は反交換し、三つの外積の反対称和では6通りの順列の符号と行列積を交換するときの符号が打ち消し合う。そのため

$$
\operatorname{tr}(\Theta^3)(X_2,X_3,X_4)
=6\,\operatorname{tr}(I_2)=12.
$$

従って $\int_{S^3}\operatorname{tr}(\Theta^3)=12\operatorname{vol}(S^3)=24\pi^2$ となる。
<!-- solution-end -->

<a id="ex-gbg26-a04"></a>
#### GBG26-A04 南半球の境界符号
- Level: A

$S^4=D_N\cup D_S$ を本講の向きで分割するとき、$\partial D_N$ と $\partial D_S$ の赤道上の向きを示し、$\int_{D_S}d\beta$ を $E$ の積分で表せ。ただし $\beta$ は $D_S$ 上の滑らかな3形式とする。

<!-- solution-start -->
**詳細解答**。$D_N$ は $y$ 座標で標準向きなので、その外向き境界は $E$ の規約と一致する。$D_S$ は $y$ 座標と逆向きであり、同じ赤道の外向き境界向きも逆になる。すなわち

$$
\partial D_N=E,\qquad \partial D_S=-E,\qquad
\int_{D_S}d\beta=\int_{\partial D_S}\beta=-\int_E\beta.
$$

最後の等式は、$\beta$ を南側から $E$ へ制限したものである。
<!-- solution-end -->

### Level B：境界積分と局所・大域の違い

<a id="ex-gbg26-b01"></a>
#### GBG26-B01 カットオフ接続を直接積分する
- Level: B

南半球上で $A=\chi(r)\theta$、$\theta=f^{-1}df$、$\chi(0)=0$、$\chi(1)=1$ とし、$\chi$ は端点付近で定数とする。$F$ と $\operatorname{tr}(F^2)$ を求め、南半球の向きに注意して $\int_{D_S}\operatorname{tr}(F^2)$ を境界の3形式で表せ。

<!-- solution-start -->
**詳細解答**。$d\theta=-\theta^2$ を用いると

$$
dA=d\chi\wedge\theta-\chi\theta^2,\qquad
A^2=\chi^2\theta^2,\qquad
F=d\chi\wedge\theta+(\chi^2-\chi)\theta^2.
$$

$d\chi\wedge\theta$ の平方は0、$\theta^4=0$ は $\theta$ が3次元赤道方向だけを持つためである。残る混合項は次数2どうしなので符号が正になり、

$$
\operatorname{tr}(F^2)=2(\chi^2-\chi)d\chi\wedge\operatorname{tr}(\theta^3).
$$

南半球は半径方向を先頭にする座標向きと逆だから、$d\chi=\chi'(r)dr$ と置いて

$$
\begin{aligned}
\int_{D_S}\operatorname{tr}(F^2)
&=-2\int_0^1(\chi^2-\chi)\chi'(r)\,dr
  \int_E\operatorname{tr}(\theta^3)\\
&=-2\left[\frac{\chi^3}{3}-\frac{\chi^2}{2}\right]_{0}^{1}
  \int_E\operatorname{tr}(\theta^3)
=\frac13\int_E\operatorname{tr}(\theta^3).
\end{aligned}
$$

$8\pi^2$ で割ると $1/(24\pi^2)$ が得られる。カットオフの具体形に依存しない。
<!-- solution-end -->

<a id="ex-gbg26-b02"></a>
#### GBG26-B02 ゲージ変更はChern数を動かすか
- Level: B

局所ゲージ変更によって $F^h=h^{-1}Fh$ となるとき、$\operatorname{tr}(F^h\wedge F^h)=\operatorname{tr}(F\wedge F)$ を行列の積順も含めて証明せよ。別の表現の跡を勝手に混ぜてはいけない理由も述べよ。

<!-- solution-start -->
**詳細解答**。$h$ は次数0の行列値関数なので、外積内で $h h^{-1}=I_2$ を消去できる。

$$
F^h\wedge F^h
=(h^{-1}Fh)\wedge(h^{-1}Fh)
=h^{-1}(F\wedge F)h.
$$

基本表現の通常の跡の巡回性より $\operatorname{tr}(h^{-1}(F\wedge F)h)=\operatorname{tr}(F\wedge F)$。表現を変えると $h,F$ の行列と跡自体が変わり、通常の跡の正規化は同じとは限らない。ここで示した不変性は一つの固定した表現内での共役不変性である。
<!-- solution-end -->

<a id="ex-gbg26-b03"></a>
#### GBG26-B03 三つのクラッチング束の第二Chern数
- Level: B

$f_0(q)=I_2$、$f_+(q)=Q(q)$、$f_-(q)=Q(q)^{-1}$ に対して $k(P_{f_0})$、$k(P_{f_+})$、$k(P_{f_-})$ を求めよ。$f_-$ で符号が変わる理由を説明せよ。

<!-- solution-start -->
**詳細解答**。[GBG25の次数](../GBG25/index.md#def-gbg25-degree)は定数、恒等、逆元の順に $0,+1,-1$ である。[クラッチング定理](#thm-gbg26-clutching-number)は固定した向きと跡で $k(P_f)=\deg f$ を与えるので

$$
k(P_{f_0})=0,\qquad k(P_{f_+})=1,\qquad k(P_{f_-})=-1.
$$

逆元写像は $S^3$ を表す実座標で $(x_1,x_2,x_3,x_4)\mapsto(x_1,-x_2,-x_3,-x_4)$ となり、向きの反転を表す行列式 $(-1)^3=-1$ を持つ。曲率の符号を単に反転したからではない。
<!-- solution-end -->

<a id="ex-gbg26-b04"></a>
#### GBG26-B04 $k=0$ でも曲率が非零の例
- Level: B

自明 $SU(2)$ 束上で $T=\operatorname{diag}(i,-i)$、滑らかなコンパクト台関数 $b(x)$ に対し $A=T x_1b(x)\,dx_2$ と置く。$b=1$ の小さい開集合があるとする。$F$ が零でない一方、$\operatorname{tr}(F^2)=0$ を示せ。

<!-- solution-start -->
**詳細解答**。$A\wedge A=T^2(x_1b)^2dx_2\wedge dx_2=0$ なので

$$
F=dA=T\,d(x_1b)\wedge dx_2.
$$

$b=1$ かつ $db=0$ の小領域では $F=T\,dx_1\wedge dx_2\ne0$ である。他方、$\alpha=d(x_1b)\wedge dx_2$ は一つの分解可能な2形式であり $\alpha\wedge\alpha=0$（$dx_2$ が二回現れる）。ゆえに $F^2=T^2\alpha^2=0$、したがって $\operatorname{tr}(F^2)=0$。カットオフにより大域的な滑らかな接続へ延長できる。純ゲージなら $F=0$ なので、この例は純ゲージではない。
<!-- solution-end -->

### Level C：貼り合わせから大域的障害を証明する

<a id="ex-gbg26-c01"></a>
#### GBG26-C01 非自明な束に平坦接続を仮定すると
- Level: C

$S^4$ を北・南半球に分け、赤道で $s_S=s_NQ$ と貼る $SU(2)$ 主束 $P_Q$ を考える。

1. 上の規約で $Q^*\operatorname{tr}(\Theta^3)$ が $24\pi^2\nu$ となる理由を、単位元の行列計算と移動不変性で説明せよ。
2. 北側 $A_N=0$、南側 $A_S=\chi Q^{-1}dQ$ を使い、$\int_{S^4}\operatorname{tr}(F^2)$ と $k(P_Q)$ を求めよ。
3. 任意の接続がすべての点で $F=0$ となることは可能か。また、$k=0$ の束に曲率が非零の接続を置くことは可能か。
4. 基底の向きだけを反転した場合、積分値はどう変わるか。

<!-- solution-start -->
**詳細解答**。

**(1)** $Q(1,0)=I_2$ で正の接ベクトル $e_2,e_3,e_4$ を選ぶと、[境界3形式の定義例](#def-gbg26-boundary-form)の三行列が得られ、その積は $I_2$ である。外積の6項は反交換性によりすべて同じ正の跡を与えるため $6\operatorname{tr}I_2=12$。$Q^*\operatorname{tr}(\Theta^3)$ は左移動不変で、標準球面の体積形式も左移動で不変なので、この係数は全点で12。$\nu=d\operatorname{vol}_{S^3}/(2\pi^2)$ から $Q^*\operatorname{tr}(\Theta^3)=24\pi^2\nu$ となる。

**(2)** $A_N=0$ だから北の曲率は零。南では $A_S=\chi\theta$、$\theta=Q^{-1}dQ$ とおき、[Chern–Simonsの原始形式](../GBG22/index.md#prop-gbg22-local-cs-primitive)にStokesを適用すると

$$
\int_{S^4}\operatorname{tr}(F^2)
=-\int_E\operatorname{CS}_3(\theta)
=\frac13\int_E\operatorname{tr}(\theta^3)
=\frac13(24\pi^2)=8\pi^2.
$$

従って $k(P_Q)=(8\pi^2)^{-1}(8\pi^2)=1$。南半球の境界が $-E$ となる負号と $\operatorname{CS}_3(\theta)=-\operatorname{tr}(\theta^3)/3$ の負号を両方使った。

**(3)** 全域で $F=0$ なら定義から $k=0$ だが、(2) と[接続非依存性](../GBG22/index.md#cor-gbg22-class-independence)に矛盾するので不可能。一方、積束の $A=T x_1b(x)\,dx_2$ なら[前問の計算](#ex-gbg26-b04)より非零曲率で $k=0$ は可能である。「$k=0$」と「ある接続の曲率零」は同値ではない。

**(4)** 4形式 $\operatorname{tr}(F^2)$ と接続を変えずに積分向きだけ反転すれば、積分は $-8\pi^2$、第二Chern数は $-1$ となる。元の定理の $+1$ を符号規約なしに持ち越すことはできない。
<!-- solution-end -->

## 8. まとめと次講

- 第二Chern数は固定した向き・基本2次元跡で $k=(8\pi^2)^{-1}\int_{S^4}\operatorname{tr}(F\wedge F)$ と定まる。
- Chern–Simons 3形式を使うと、その積分は南北の境界の差へ変換される。純ゲージの境界値は $-\operatorname{tr}((f^{-1}df)^3)/3$ である。
- GBG25と同じ赤道の向き・$s_S=s_Nf$ の規約では $k(P_f)=\deg(f)$。恒等クラッチング $Q$ では $k=+1$ となる。
- $k\ne0$ は平坦接続を排除する。一方 $k=0$ は与えられた接続の平坦性を保証しない。局所純ゲージと大域的に自明であることも異なる。

**次講GBG27**では向き付きRiemann 4多様体の Hodge 星を用い、$F=+*F$ または $F=-*F$ という自己双対条件と Yang–Mills 作用の下界をつなぐ。
