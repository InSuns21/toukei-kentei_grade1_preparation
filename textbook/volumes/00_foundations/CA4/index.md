# CA4 Laurent展開・孤立特異点・留数・偏角原理・Rouché

> **標準複素解析コア IV**。本章では CA3 の Cauchy 積分公式と Taylor 展開を、穴のある領域へ拡張する。環状領域で Cauchy 核を内側・外側に分けて Laurent 展開を構成し、負べき係数から孤立特異点を分類する。その後に留数定理を証明し、偏角原理と Rouché の定理を順に導く。winding number を前提にはしない。

## 0. この章で何が新しくなるか

CA3 の Taylor 展開は、中心 $a$ の近傍で正則な関数を

$$
\sum_{n=0}^{\infty}c_n(z-a)^n
$$

と非負べきだけで表した。ところが $a$ 自身が領域から抜けていると、$1/(z-a)$ のような負べきが自然に現れる。本章の出発点は、環状領域

$$
A(a;r,R)=\{z\in\mathbb C:r<|z-a|<R\},
\qquad 0\le r<R\le\infty
$$

で正則な関数を、正負両方のべきで表すことである。

重要なのは「幾何級数を形式的に書けば Laurent 展開になる」ではない。内外二本の円周から Cauchy 型表示を作り、それぞれの円周で級数が一様収束することを確認してから積分と和を交換する。

---

## 1. 穴のある領域での境界積分

Laurent 展開と留数定理の両方で、外側境界と内側境界の向きを正確に追う必要がある。

<a id="lem-ca4-multiply-connected-boundary"></a>
<!-- formal-statement-start -->
### 補題（有限個の穴を持つ領域の境界相殺）

$G$ を有界な Jordan 領域とし、その境界を反時計回りの区分的 $C^1$ 単純閉曲線 $\Gamma_0$ とする。互いに素な閉 Jordan 領域 $K_1,\dots,K_m$ が $G$ にコンパクトに含まれ、それぞれの境界を反時計回りの区分的 $C^1$ 単純閉曲線 $\Gamma_j$ とする。

$f$ が

$$
\overline G\setminus\bigcup_{j=1}^m\operatorname{int}K_j
$$

を含む開集合上で正則なら

$$
\int_{\Gamma_0}f(z)\,dz
-
\sum_{j=1}^m\int_{\Gamma_j}f(z)\,dz
=0.
$$

すなわち、穴を除いた領域から見た内側境界は時計回りになる。
<!-- formal-statement-end -->

<!-- proof-start -->
### 証明

まず、すべての境界が多角形である場合を考える。外側多角形から内側多角形を除いたコンパクト領域を有限個の三角形へ分割する。各三角形とその少し外側で $f$ は正則なので、[三角形版 Cauchy–Goursat](../CA2/index.md#thm-ca2-goursat-triangle) により各三角形の境界積分は0である。

これらを向きをそろえて足すと、内部辺は必ず二つの三角形に逆向きで共有されるため相殺する。残るのは外側境界を反時計回りに一周する辺と、穴の境界を時計回りに一周する辺だけである。従って

$$
0
=
\int_{\Gamma_0}f\,dz
-
\sum_{j=1}^m\int_{\Gamma_j}f\,dz.
$$

一般の区分的 $C^1$ 境界では、多角形版へ無断で置き換えない。まず有限個の境界成分は互いに素なコンパクト集合であり、各境界は $f$ の正則領域の補集合とも交わらない。従って、異なる境界成分どうしの距離と正則領域の補集合までの距離のうち正のものの最小値を $\delta>0$ と取れる。各境界を幅 $\delta/10$ より小さい互いに交わらない近傍の中で扱う。

各境界曲線について [曲線の多角形化](../CA2/index.md#lem-ca2-polygonal-replacement) の分割をさらに細かくする。単純閉曲線の異なる離れたパラメータ区間の像はコンパクトで交わらないので正の距離を持ち、隣接する小弧はそれぞれ上の細い近傍内にある。この有限個の正の距離より小さく弦を取ることで、多角形近似は元の境界成分と同じ近傍内にあり、自己交差せず、異なる境界成分とも交わらないように選べる。各小弧と弦の直線補間も同じ局所円板内にあるため、境界ごとに積分値を保つホモトピーが得られる。

こうして得た外側の単純多角形と互いに素な内側単純多角形については、まず各穴から外側境界へ互いに交わらない有限本の多角形の切れ目を入れる。切れ目の両側は最終的な境界和では逆向きに二度現れて相殺する。切った後は有限個の単純多角形領域へ分かれるので、それぞれを有限三角形分割し、三角形版 Cauchy–Goursat を足す。内部辺と切れ目が相殺した後に残るのは外側境界と逆向きの内側境界だけである。[正則線積分のホモトピー不変性](../CA2/index.md#thm-ca2-homotopy-invariance) で元の曲線へ戻せば結論を得る。$\square$
<!-- proof-end -->

この補題は「円周も多角形境界と同じだろう」と済ませるためのものではない。曲線から多角形への移送と、その後の有限三角形化を分けている。

---

## 2. Laurent 展開

<a id="def-ca4-laurent-series"></a>
<!-- formal-statement-start -->
### 定義（Laurent級数）

点 $a$ を中心とする **Laurent 級数**とは

$$
\sum_{n=-\infty}^{\infty}c_n(z-a)^n
=
\sum_{n=0}^{\infty}c_n(z-a)^n
+
\sum_{m=1}^{\infty}c_{-m}(z-a)^{-m}
$$

の形の級数をいう。後半を **主部**という。
<!-- formal-statement-end -->

<!-- definition-example-start: def-ca4-laurent-series -->
**定義の確認**：$1/(z-a)$ は主部が一項だけ、$e^{1/(z-a)}$ は主部に無限個の項を持つ。Taylor 級数は主部が空の Laurent 級数である。
<!-- definition-example-end -->

<a id="thm-ca4-laurent"></a>
<!-- formal-statement-start -->
### 定理（Laurent展開）

$f$ が環状領域

$$
A(a;r,R)=\{z:r<|z-a|<R\}
$$

で正則とする。このとき一意な係数列 $(c_n)_{n\in\mathbb Z}$ が存在して

$$
f(z)=\sum_{n=-\infty}^{\infty}c_n(z-a)^n
$$

が $A(a;r,R)$ 上で成り立つ。任意の $\rho$ が

$$
r<\rho<R
$$

を満たすとき

$$
\boxed{
c_n=
\frac1{2\pi i}
\int_{|\zeta-a|=\rho}
\frac{f(\zeta)}{(\zeta-a)^{n+1}}\,d\zeta
}
\qquad(n\in\mathbb Z)
$$

であり、この積分値は許される $\rho$ の選び方に依存しない。級数は任意のコンパクト部分環上で一様収束する。
<!-- formal-statement-end -->

<!-- proof-start -->
### 証明

$z\in A(a;r,R)$ を固定し、

$$
r<\rho_-<|z-a|<\rho_+<R
$$

を選ぶ。$\rho_-<|\zeta-a|<\rho_+$ の閉環状領域に [有限個の穴を持つ領域の境界相殺](#lem-ca4-multiply-connected-boundary) を Cauchy 核

$$
\frac{f(\zeta)}{\zeta-z}
$$

へそのまま適用することはできない。$\zeta=z$ が特異点だからである。そこで $z$ のまわりの小円 $|\zeta-z|=\varepsilon$ も穴として除く。補題より、外円を反時計回りに、内円と小円を反時計回りに記したとき

$$
\int_{|\zeta-a|=\rho_+}\frac{f(\zeta)}{\zeta-z}\,d\zeta
-
\int_{|\zeta-a|=\rho_-}\frac{f(\zeta)}{\zeta-z}\,d\zeta
-
\int_{|\zeta-z|=\varepsilon}\frac{f(\zeta)}{\zeta-z}\,d\zeta
=0.
$$

最後の小円積分は CA3 の Cauchy 公式の小円極限と同じ計算で $2\pi i f(z)$ へ行く。実際

$$
\int_{|\zeta-z|=\varepsilon}
\frac{f(\zeta)-f(z)}{\zeta-z}\,d\zeta
$$

の絶対値は [ML評価](../CA2/index.md#thm-ca2-reparam-ml) により

$$
2\pi\max_{|\zeta-z|=\varepsilon}|f(\zeta)-f(z)|
\longrightarrow0
$$

であり、定数部分は $2\pi i f(z)$ である。従って

$$
f(z)
=
\frac1{2\pi i}
\int_{|\zeta-a|=\rho_+}
\frac{f(\zeta)}{\zeta-z}\,d\zeta
-
\frac1{2\pi i}
\int_{|\zeta-a|=\rho_-}
\frac{f(\zeta)}{\zeta-z}\,d\zeta.
$$

ここから外円と内円を別々に展開する。

外円では

$$
\left|\frac{z-a}{\zeta-a}\right|
=
\frac{|z-a|}{\rho_+}<1
$$

なので

$$
\frac1{\zeta-z}
=
\frac1{\zeta-a}
\frac1{1-(z-a)/(\zeta-a)}
=
\sum_{n=0}^{\infty}
\frac{(z-a)^n}{(\zeta-a)^{n+1}}.
$$

比 $|z-a|/\rho_+$ は円周上で一定して1未満なので、この幾何級数は円周上一様収束する。$f$ も円周上で有界だから、部分和との差を ML 評価で積分すると誤差は0へ行く。従って項別積分でき、外円の寄与は

$$
\sum_{n=0}^{\infty}
\left[
\frac1{2\pi i}
\int_{|\zeta-a|=\rho_+}
\frac{f(\zeta)}{(\zeta-a)^{n+1}}\,d\zeta
\right](z-a)^n.
$$

一方、内円では

$$
\left|\frac{\zeta-a}{z-a}\right|
=
\frac{\rho_-}{|z-a|}<1
$$

であり

$$
\begin{aligned}
\frac1{\zeta-z}
&=-\frac1{z-a}
\frac1{1-(\zeta-a)/(z-a)}\\
&=-\sum_{m=0}^{\infty}
\frac{(\zeta-a)^m}{(z-a)^{m+1}}.
\end{aligned}
$$

これも内円上一様収束する。Cauchy 型表示には内円積分の前にもう一つ負号があるので、内円の寄与は

$$
\sum_{m=0}^{\infty}
\left[
\frac1{2\pi i}
\int_{|\zeta-a|=\rho_-}
f(\zeta)(\zeta-a)^m\,d\zeta
\right](z-a)^{-m-1}.
$$

$n=-m-1$ と置けば正負両方をまとめて Laurent 級数になる。

次に係数積分が半径に依存しないことを示す。$r<\rho_1<\rho_2<R$ とし

$$
g_n(\zeta)=\frac{f(\zeta)}{(\zeta-a)^{n+1}}
$$

と置く。$n$ が負でも $(\zeta-a)^{-(n+1)}$ は環状領域上で正則である。二円の間に [有限個の穴を持つ領域の境界相殺](#lem-ca4-multiply-connected-boundary) を適用すれば

$$
\int_{|\zeta-a|=\rho_2}g_n(\zeta)\,d\zeta
=
\int_{|\zeta-a|=\rho_1}g_n(\zeta)\,d\zeta.
$$

従ってすべての係数を同じ任意半径 $\rho$ で表せる。

一意性を示す。もし同じ環状領域で

$$
f(z)=\sum_{n\in\mathbb Z}d_n(z-a)^n
$$

とも表せたとする。固定した円周 $|z-a|=\rho$ 上では正べき部・負べき部はとも一様収束するから、任意の整数 $k$ に対し $(z-a)^{-k-1}$ を掛けて項別積分できる。直接パラメータ表示 $z-a=\rho e^{it}$ を使えば

$$
\frac1{2\pi i}
\int_{|z-a|=\rho}(z-a)^{n-k-1}\,dz
=
\begin{cases}
1,&n=k,\\
0,&n\ne k.
\end{cases}
$$

よって積分は $d_k$ だけを抜き出す。一方、左辺は $f$ から決まるので $d_k=c_k$ である。

最後にコンパクト部分環

$$
r<r_0\le|z-a|\le R_0<R
$$

を固定する。$r<\rho_-<r_0\le R_0<\rho_+<R$ を選べば、上の二つの幾何級数の比はそれぞれ高々 $R_0/\rho_+<1$、$\rho_-/r_0<1$ で一様に抑えられる。従って Laurent 級数はこのコンパクト部分環上一様収束する。$\square$
<!-- proof-end -->

### 例：同じ関数でも環状領域で展開が変わる

$$
f(z)=\frac1{z(z-1)}
$$

を原点中心に考える。部分分数分解

$$
\frac1{z(z-1)}=-\frac1z+\frac1{z-1}
$$

を使う。

$0<|z|<1$ では

$$
\frac1{z-1}=-\frac1{1-z}=-\sum_{n=0}^{\infty}z^n,
$$

従って

$$
f(z)=-\frac1z-\sum_{n=0}^{\infty}z^n.
$$

一方 $|z|>1$ では

$$
\frac1{z-1}
=\frac1z\frac1{1-1/z}
=\sum_{n=1}^{\infty}z^{-n},
$$

よって $-1/z$ と最初の $1/z$ が消えて

$$
f(z)=\sum_{n=2}^{\infty}z^{-n}.
$$

Laurent 展開は「中心」だけでなく、どの環状領域で展開しているかまで指定して初めて一意になる。

---

## 3. 孤立特異点の分類

<a id="def-ca4-isolated-singularity"></a>
<!-- formal-statement-start -->
### 定義（孤立特異点）

$a$ のある穿孔円板

$$
0<|z-a|<R
$$

で $f$ が正則であるとき、$a$ を $f$ の **孤立特異点**という。
<!-- formal-statement-end -->

<!-- definition-example-start: def-ca4-isolated-singularity -->
**定義の確認**：$1/z$ の0、$e^{1/z}$ の0は孤立特異点である。一方、例えば特異点が $1/n$ に並ぶ関数を0の近くで考える場合、0のまわりのどの穿孔円板にも別の特異点が入るため0は孤立特異点ではない。
<!-- definition-example-end -->

<a id="def-ca4-meromorphic"></a>
<!-- formal-statement-start -->
### 定義（meromorphic関数）

領域 $\Omega$ 上の関数 $f$ が **meromorphic** であるとは、各点の近傍で正則であるか、有限位数の極だけを持つことをいう。
<!-- formal-statement-end -->

<!-- definition-example-start: def-ca4-meromorphic -->
**定義の確認**：有理関数は極以外で正則なので meromorphic である。$e^{1/z}$ は0に真性特異点を持つため、0を含む領域上では meromorphic ではない。
<!-- definition-example-end -->

<a id="thm-ca4-singularity-classification"></a>
<!-- formal-statement-start -->
### 定理（孤立特異点のLaurent分類）

$a$ を $f$ の孤立特異点とし、

$$
f(z)=\sum_{n=-\infty}^{\infty}c_n(z-a)^n
$$

を十分小さい穿孔円板上の Laurent 展開とする。

1. $a$ が **可除特異点**であることと、すべての負べき係数 $c_{-1},c_{-2},\dots$ が0であることは同値である。
2. $a$ が位数 $m\ge1$ の **極**であることと
   $$
   c_{-m}\ne0,
   \qquad
   c_{-m-1}=c_{-m-2}=\cdots=0
   $$
   は同値である。
3. 負べき係数が無限個非零なら $a$ は **真性特異点**である。

従って孤立特異点は可除・極・真性のちょうど三種類に分類される。
<!-- formal-statement-end -->

<!-- proof-start -->
### 証明

まず1。負べき係数がすべて0なら

$$
f(z)=\sum_{n=0}^{\infty}c_n(z-a)^n
$$

である。右辺は $z=a$ でも収束し、$F(a)=c_0$ と置けば穿孔円板を含む円板上のべき級数になる。CA3 のべき級数の議論から $F$ は正則で、$F=f$ が $z\ne a$ で成り立つ。従って $a$ は可除である。

逆に $a$ が可除なら、正則延長 $F$ は $a$ の近傍で [Taylor 展開](../CA3/index.md#thm-ca3-taylor) を持つ。これは負べきを含まない Laurent 展開であり、[Laurent 展開の一意性](#thm-ca4-laurent) から $f$ のすべての負べき係数は0である。

次に2。$c_{-m}\ne0$ でそれより低い指数の係数がすべて0なら

$$
\begin{aligned}
f(z)
&=c_{-m}(z-a)^{-m}+c_{-m+1}(z-a)^{-m+1}+\cdots\\
&=(z-a)^{-m}g(z),
\end{aligned}
$$

ここで

$$
g(z)=c_{-m}+c_{-m+1}(z-a)+c_{-m+2}(z-a)^2+\cdots
$$

は $a$ の近傍で正則で、$g(a)=c_{-m}\ne0$ である。従って

$$
(z-a)^m f(z)=g(z)
$$

は $a$ へ正則に延長し、その値は0でない。これが位数 $m$ の極の局所形である。

逆に $a$ が位数 $m$ の極なら、定義により

$$
f(z)=\frac{g(z)}{(z-a)^m},
\qquad
 g\text{ は }a\text{ の近傍で正則},
\qquad g(a)\ne0
$$

と書ける。$g$ を Taylor 展開して $(z-a)^{-m}$ を掛けると、最も低い指数は $-m$ でその係数は $g(a)\ne0$ である。Laurent 一意性から同じ結論が $f$ の Laurent 係数にも成り立つ。

最後に、負べき係数が有限個非零なら、0個なら1により可除、1個以上なら最小指数 $-m$ を取れて2により極である。したがって負べき係数が無限個非零の場合は可除でも極でもない。孤立特異点の残る型を真性特異点と呼ぶので3が従う。三分類は互いに排他的で尽くされる。$\square$
<!-- proof-end -->

<a id="cor-ca4-removable-bounded"></a>
<!-- formal-statement-start -->
### 系（有界な孤立特異点は可除）

$f$ が $0<|z-a|<R$ で正則で、ある $M>0$ により

$$
|f(z)|\le M
$$

が成り立つなら $a$ は可除特異点である。
<!-- formal-statement-end -->

<!-- proof-start -->
### 証明

Laurent 係数公式で $m\ge1$ に対し、$c_{-m}$ は任意の $0<\rho<R$ について

$$
c_{-m}
=
\frac1{2\pi i}
\int_{|\zeta-a|=\rho}
f(\zeta)(\zeta-a)^{m-1}\,d\zeta.
$$

[ML評価](../CA2/index.md#thm-ca2-reparam-ml) から

$$
|c_{-m}|
\le
\frac1{2\pi}(2\pi\rho)M\rho^{m-1}
=M\rho^m.
$$

左辺は $\rho$ に依存しない。$\rho\downarrow0$ とすると $c_{-m}=0$。すべての負べき係数が消えるので [孤立特異点の Laurent 分類](#thm-ca4-singularity-classification) から可除である。$\square$
<!-- proof-end -->

---

## 4. 留数

<a id="def-ca4-residue"></a>
<!-- formal-statement-start -->
### 定義（留数）

$a$ を $f$ の孤立特異点とする。$a$ のまわりの Laurent 展開

$$
f(z)=\sum_{n=-\infty}^{\infty}c_n(z-a)^n
$$

の係数 $c_{-1}$ を **留数**といい

$$
\operatorname{Res}(f,a)=c_{-1}
$$

と書く。
<!-- formal-statement-end -->

<!-- definition-example-start: def-ca4-residue -->
**定義の確認**：$f(z)=3/(z-a)^2+5/(z-a)+7+\cdots$ なら留数は5である。最も強い発散項の係数ではなく、ちょうど $(z-a)^{-1}$ の係数だけを見る。
<!-- definition-example-end -->

Laurent 係数公式で $n=-1$ と置くと、十分小さい任意の $\rho>0$ に対し

$$
\boxed{
\operatorname{Res}(f,a)
=
\frac1{2\pi i}
\int_{|z-a|=\rho}f(z)\,dz
}.
$$

従って小円積分が留数を抜き出す。

<a id="prop-ca4-residue-formulas"></a>
<!-- formal-statement-start -->
### 命題（極での留数公式）

1. $a$ が単純極で、$f(z)=g(z)/h(z)$、$g,h$ が $a$ の近傍で正則、$g(a)\ne0$、$h(a)=0$、$h'(a)\ne0$ なら
   $$
   \operatorname{Res}(f,a)=\frac{g(a)}{h'(a)}.
   $$
2. $a$ が位数 $m$ の極なら
   $$
   \operatorname{Res}(f,a)
   =
   \frac1{(m-1)!}
   \left.
   \frac{d^{m-1}}{dz^{m-1}}
   \bigl((z-a)^m f(z)\bigr)
   \right|_{z=a}.
   $$
<!-- formal-statement-end -->

<!-- proof-start -->
### 証明

1では $h(a)=0$ なので Taylor 展開から

$$
h(z)=(z-a)q(z),
\qquad q(a)=h'(a)\ne0.
$$

従って

$$
f(z)=\frac1{z-a}\frac{g(z)}{q(z)}.
$$

$g/q$ は $a$ の近傍で正則で、その定数項は $g(a)/q(a)=g(a)/h'(a)$ である。$(z-a)^{-1}$ を掛けたときその定数項が留数になる。

2では

$$
G(z)=(z-a)^m f(z)
$$

と置くと、[孤立特異点の Laurent 分類](#thm-ca4-singularity-classification) により $G$ は $a$ の近傍で正則である。Taylor 展開

$$
G(z)=\sum_{k=0}^{\infty}\frac{G^{(k)}(a)}{k!}(z-a)^k
$$

に $(z-a)^{-m}$ を掛ける。$(z-a)^{-1}$ が生じるのは $k=m-1$ だけなので

$$
\operatorname{Res}(f,a)
=
\frac{G^{(m-1)}(a)}{(m-1)!}.
$$

これが表示式である。$\square$
<!-- proof-end -->

---

## 5. 留数定理

<a id="thm-ca4-residue"></a>
<!-- formal-statement-start -->
### 定理（留数定理：単純閉曲線版）

$\Gamma$ を反時計回りの区分的 $C^1$ 単純閉曲線、その内部を $G$ とする。$f$ が $\Gamma$ 上では正則で、$G$ 内には有限個の孤立特異点

$$
a_1,\dots,a_m
$$

だけを持ち、$\overline G$ の近傍からこれらの点を除いたところで正則とする。このとき

$$
\boxed{
\int_\Gamma f(z)\,dz
=
2\pi i
\sum_{j=1}^m\operatorname{Res}(f,a_j)
}.
$$
<!-- formal-statement-end -->

<!-- proof-start -->
### 証明

特異点は有限個で互いに異なり、すべて $G$ の内部にある。従って十分小さい半径 $\rho_j>0$ を選んで閉円板

$$
\overline{D(a_j,\rho_j)}
$$

を互いに素にし、すべて $G$ にコンパクトに含められる。各小円を反時計回りに

$$
C_j:|z-a_j|=\rho_j
$$

とする。

穴を除いた領域では $f$ は正則なので [有限個の穴を持つ領域の境界相殺](#lem-ca4-multiply-connected-boundary) を適用できる。外側境界 $\Gamma$ は反時計回り、穴を除いた領域から見た各内側境界は時計回りであるため

$$
0
=
\int_\Gamma f(z)\,dz
-
\sum_{j=1}^m\int_{C_j}f(z)\,dz.
$$

ここで向きを逆に書き換えたのではなく、補題の符号そのものが内側境界の時計回りを表している。

一方、[留数の係数積分公式](#def-ca4-residue) から

$$
\int_{C_j}f(z)\,dz
=
2\pi i\operatorname{Res}(f,a_j).
$$

これを有限和に代入すれば

$$
\int_\Gamma f(z)\,dz
=
2\pi i
\sum_{j=1}^m\operatorname{Res}(f,a_j).
$$

以上で証明された。$\square$
<!-- proof-end -->

### 例：実積分 $\int_{-\infty}^{\infty}(1+x^2)^{-1}dx$

$R>1$ とし、上半平面の半円輪郭 $\Gamma_R$ を実軸上の $[-R,R]$ と上半円弧 $C_R$ から作る。$f(z)=1/(1+z^2)$ の上半平面内の極は $i$ だけで、

$$
\operatorname{Res}(f,i)
=
\frac1{2i}.
$$

[留数定理](#thm-ca4-residue) から

$$
\int_{-R}^{R}\frac{dx}{1+x^2}
+
\int_{C_R}\frac{dz}{1+z^2}
=
\pi.
$$

円弧上 $|z|=R$ では

$$
|1+z^2|
\ge R^2-1,
$$

円弧長は $\pi R$ なので [ML評価](../CA2/index.md#thm-ca2-reparam-ml) により

$$
\left|
\int_{C_R}\frac{dz}{1+z^2}
\right|
\le
\frac{\pi R}{R^2-1}
\longrightarrow0.
$$

従って

$$
\boxed{
\int_{-\infty}^{\infty}\frac{dx}{1+x^2}=\pi
}.
$$

「大円弧は消える」とだけ書かず、上界と弧長の積が0へ行くことまで確認した。

---

## 6. 零点・極の位数と $f'/f$

偏角原理の前に、零点と極を $f'/f$ の留数へ変換する。

<a id="lem-ca4-log-derivative-residue"></a>
<!-- formal-statement-start -->
### 補題（対数微分の留数）

$f$ が $a$ の近傍で meromorphic で、恒等的に0ではないとする。

- $a$ が $f$ の位数 $m\ge1$ の零点なら
  $$
  \operatorname{Res}\left(\frac{f'}f,a\right)=m.
  $$
- $a$ が $f$ の位数 $m\ge1$ の極なら
  $$
  \operatorname{Res}\left(\frac{f'}f,a\right)=-m.
  $$
<!-- formal-statement-end -->

<!-- proof-start -->
### 証明

$a$ が位数 $m$ の零点なら CA3 の零点の局所因数分解から

$$
f(z)=(z-a)^m g(z),
\qquad g(a)\ne0,
$$

で $g$ は近傍で正則である。十分小さい円板では $g$ は零点を持たないので

$$
\frac{f'(z)}{f(z)}
=
\frac{m}{z-a}+
\frac{g'(z)}{g(z)}.
$$

第2項は $a$ で正則だから $(z-a)^{-1}$ 項を持たず、留数は $m$ である。

$a$ が位数 $m$ の極なら

$$
f(z)=(z-a)^{-m}g(z),
\qquad g(a)\ne0
$$

と書ける。同様に

$$
\frac{f'}f
=-\frac{m}{z-a}+
\frac{g'}g,
$$

なので留数は $-m$ である。$\square$
<!-- proof-end -->

---

## 7. 偏角原理

<a id="thm-ca4-argument-principle"></a>
<!-- formal-statement-start -->
### 定理（偏角原理：単純閉曲線版）

$\Gamma$ を反時計回りの区分的 $C^1$ 単純閉曲線、その内部を $G$ とする。$f$ が $\overline G$ の近傍で meromorphic で、$\Gamma$ 上に零点も極も持たないとする。

$G$ 内の零点の位数の総和を $N$、極の位数の総和を $P$ とすると

$$
\boxed{
\frac1{2\pi i}
\int_\Gamma\frac{f'(z)}{f(z)}\,dz
=N-P
}.
$$
<!-- formal-statement-end -->

<!-- proof-start -->
### 証明

$\overline G$ はコンパクトで、零点と極は孤立している。もし $G$ 内に無限個あればコンパクト性から集積点を持ち、その点が正則点なら零点の孤立性に、極なら極の孤立性に反する。従って $G$ 内の零点と極は有限個である。

$f'/f$ はそれらを除いて正則で、境界上では分母が0にならない。[対数微分の留数](#lem-ca4-log-derivative-residue) により、各零点はその位数だけ正の留数を、各極はその位数だけ負の留数を与える。[留数定理](#thm-ca4-residue) を $f'/f$ に適用すると

$$
\int_\Gamma\frac{f'}f\,dz
=
2\pi i(N-P).
$$

両辺を $2\pi i$ で割ればよい。$\square$
<!-- proof-end -->

この形では winding number を定義していない。積分が「像曲線 $f(\Gamma)$ が原点を何周するか」と一致する幾何学的解釈は後続で一般化できるが、本章の零点計数には上の留数計算だけで十分である。

---

## 8. Rouchéの定理

<a id="thm-ca4-rouche"></a>
<!-- formal-statement-start -->
### 定理（Rouchéの定理）

$\Gamma$ を反時計回りの区分的 $C^1$ 単純閉曲線、その内部を $G$ とする。$f,g$ が $\overline G$ の近傍で正則で、境界上で

$$
|g(z)|<|f(z)|
\qquad(z\in\Gamma)
$$

が成り立つとする。このとき $f$ と $f+g$ は $G$ 内に、重複度を込めて同じ個数の零点を持つ。
<!-- formal-statement-end -->

<!-- proof-start -->
### 証明

$0\le t\le1$ に対し

$$
f_t(z)=f(z)+t g(z)
$$

と置く。境界 $\Gamma$ 上では

$$
|f_t(z)|
\ge
|f(z)|-t|g(z)|
\ge
|f(z)|-|g(z)|
>0.
$$

従ってどの $t$ でも $f_t$ は境界上に零点を持たない。[偏角原理](#thm-ca4-argument-principle) により内部零点数 $N(t)$ は

$$
N(t)
=
\frac1{2\pi i}
\int_\Gamma
\frac{f'(z)+t g'(z)}{f(z)+t g(z)}\,dz
$$

で与えられる。

ここで「整数値だから連続なら一定」を実際に確認する。コンパクトな $[0,1]\times\Gamma$ 上で分母 $f(z)+t g(z)$ は0にならず、絶対値は連続だから正の最小値を持つ。従って

$$
(t,z)\longmapsto
\frac{f'(z)+t g'(z)}{f(z)+t g(z)}
$$

は $[0,1]\times\Gamma$ 上で連続かつ一様連続である。したがって $t\to s$ なら integrand は $\Gamma$ 上一様に収束し、[ML評価](../CA2/index.md#thm-ca2-reparam-ml) から積分値も連続に変化する。よって $N(t)$ は $[0,1]$ 上の連続な整数値関数である。

連結区間から離散集合 $\mathbb Z$ への連続写像は定数なので

$$
N(0)=N(1).
$$

$N(0)$ は $f$ の零点数、$N(1)$ は $f+g$ の零点数である。$\square$
<!-- proof-end -->

### 例：$z^5+10z+1$ の単位円内の零点数

単位円 $|z|=1$ 上で

$$
|10z|=10,
\qquad
|z^5+1|\le2.
$$

$f(z)=10z$、$g(z)=z^5+1$ と取ると $|g|<|f|$。Rouché により $10z$ と $z^5+10z+1$ は単位円内に同じ個数の零点を持つ。$10z$ は0に単純零点を一つ持つので、求める零点数も重複度込みで1である。

---

## 9. 演習

### Level A

<a id="ex-ca4-a01"></a>
#### CA4-A01 環状領域ごとの Laurent 展開
- Level: A

$$
f(z)=\frac1{z(z-1)}
$$

を原点中心に、(i) $0<|z|<1$、(ii) $|z|>1$ のそれぞれで Laurent 展開せよ。

<!-- solution-start -->
**解答**：部分分数分解すると

$$
\frac1{z(z-1)}=-\frac1z+\frac1{z-1}.
$$

(i) $|z|<1$ では

$$
\frac1{z-1}=-\frac1{1-z}=-\sum_{n=0}^{\infty}z^n,
$$

よって

$$
\boxed{
f(z)=-z^{-1}-1-z-z^2-\cdots
}.
$$

(ii) $|z|>1$ では

$$
\frac1{z-1}=\frac1z\frac1{1-z^{-1}}
=\sum_{n=1}^{\infty}z^{-n}.
$$

最初の $z^{-1}$ が $-z^{-1}$ と相殺するため

$$
\boxed{
f(z)=z^{-2}+z^{-3}+z^{-4}+\cdots
}.
$$

同じ式でも収束比を $|z|<1$ と $|z|>1$ で逆に取るため展開が変わる。
<!-- solution-end -->

<a id="ex-ca4-a02"></a>
#### CA4-A02 特異点の分類
- Level: A

$$
f(z)=\frac{e^z-1-z}{z^3}
$$

の $z=0$ における特異点の型と留数を求めよ。

<!-- solution-start -->
**解答**：CA3 の Taylor 展開から

$$
e^z-1-z
=\frac{z^2}{2}+\frac{z^3}{6}+\frac{z^4}{24}+\cdots.
$$

従って

$$
f(z)
=\frac1{2z}+\frac16+\frac{z}{24}+\cdots.
$$

主部は $1/(2z)$ の一項だけなので [孤立特異点の Laurent 分類](#thm-ca4-singularity-classification) から0は単純極であり

$$
\boxed{\operatorname{Res}(f,0)=\frac12}.
$$
<!-- solution-end -->

<a id="ex-ca4-a03"></a>
#### CA4-A03 単純極の留数
- Level: A

$$
f(z)=\frac{e^z}{z^2+1}
$$

の $z=i$ における留数を求めよ。

<!-- solution-start -->
**解答**：$g(z)=e^z$、$h(z)=z^2+1$ と置くと

$$
h(i)=0,
\qquad
h'(i)=2i\ne0.
$$

[極での留数公式](#prop-ca4-residue-formulas) より

$$
\boxed{
\operatorname{Res}(f,i)=\frac{e^i}{2i}
}.
$$

分母を $(z-i)(z+i)$ と因数分解し、$(z-i)f(z)$ の極限を取っても同じ値になる。
<!-- solution-end -->

<a id="ex-ca4-a04"></a>
#### CA4-A04 係数積分が半径に依らないこと
- Level: A

$f$ が $r<|z-a|<R$ で正則とする。整数 $n$ と $r<\rho_1<\rho_2<R$ に対し

$$
\int_{|z-a|=\rho_1}
\frac{f(z)}{(z-a)^{n+1}}\,dz
=
\int_{|z-a|=\rho_2}
\frac{f(z)}{(z-a)^{n+1}}\,dz
$$

を示せ。

<!-- solution-start -->
**解答**：

$$
g(z)=\frac{f(z)}{(z-a)^{n+1}}
$$

と置く。$n<0$ の場合も $(z-a)^{-(n+1)}$ は $z\ne a$ で正則だから、$g$ は閉環状領域

$$
\rho_1\le|z-a|\le\rho_2
$$

の近傍で正則である。[有限個の穴を持つ領域の境界相殺](#lem-ca4-multiply-connected-boundary) を外円と内円に適用すると

$$
0=
\int_{|z-a|=\rho_2}g(z)\,dz
-
\int_{|z-a|=\rho_1}g(z)\,dz.
$$

従って二積分は等しい。係数公式の半径独立性は「係数だから当然」ではなく、二円間で被積分関数が正則であることと境界向きの相殺から出ている。
<!-- solution-end -->

### Level B

<a id="ex-ca4-b01"></a>
#### CA4-B01 高位極の留数公式
- Level: B

$a$ が $f$ の位数3の極であるとする。

$$
G(z)=(z-a)^3f(z)
$$

と置き、

$$
\operatorname{Res}(f,a)=\frac{G''(a)}{2}
$$

を [Laurent展開](#thm-ca4-laurent) から導け。

<!-- solution-start -->
**解答**：位数3の極なので $G$ は $a$ の近傍で正則で $G(a)\ne0$。Taylor 展開すると

$$
G(z)
=G(a)+G'(a)(z-a)+\frac{G''(a)}{2}(z-a)^2+\cdots.
$$

$(z-a)^{-3}$ を掛けて

$$
f(z)
=G(a)(z-a)^{-3}
+G'(a)(z-a)^{-2}
+\frac{G''(a)}2(z-a)^{-1}+\cdots.
$$

留数は $(z-a)^{-1}$ の係数だから

$$
\boxed{\operatorname{Res}(f,a)=\frac{G''(a)}2}.
$$
<!-- solution-end -->

<a id="ex-ca4-b02"></a>
#### CA4-B02 留数定理と境界の向き
- Level: B

正向き円 $|z|=3$ に対して

$$
I=\int_{|z|=3}\frac{z+2}{z(z-1)(z+2)}\,dz
$$

を留数定理で求めよ。可除点と極を区別せよ。

<!-- solution-start -->
**解答**：まず $z=-2$ では分子と分母の因子が相殺し、穿孔近傍で

$$
\frac{z+2}{z(z-1)(z+2)}=\frac1{z(z-1)}
$$

だから可除特異点で留数0である。実際の極は $z=0,1$ の二つ。

$$
\operatorname{Res}(f,0)
=\lim_{z\to0}\frac1{z-1}=-1,
$$

$$
\operatorname{Res}(f,1)
=\lim_{z\to1}\frac1z=1.
$$

和は0なので [留数定理](#thm-ca4-residue) から

$$
\boxed{I=2\pi i(-1+1)=0}.
$$

円が反時計回りだから $+2\pi i$ である。時計回りなら全体の符号が反転する。
<!-- solution-end -->

<a id="ex-ca4-b03"></a>
#### CA4-B03 実積分と大円弧評価
- Level: B

[留数定理](#thm-ca4-residue) を使って

$$
\int_{-\infty}^{\infty}\frac{dx}{x^2+4}
$$

を求めよ。上半円弧の積分が0へ行くことを ML 評価で示せ。

<!-- solution-start -->
**解答**：

$$
f(z)=\frac1{z^2+4}=\frac1{(z-2i)(z+2i)}
$$

を上半平面の半円輪郭で積分する。内部の極は $2i$ だけで

$$
\operatorname{Res}(f,2i)
=\frac1{4i}.
$$

従って半円輪郭全体の積分は

$$
2\pi i\frac1{4i}=\frac\pi2.
$$

半径 $R>2$ の上半円弧 $C_R$ 上で

$$
|z^2+4|
\ge R^2-4,
$$

かつ弧長は $\pi R$。よって

$$
\left|\int_{C_R}\frac{dz}{z^2+4}\right|
\le
\frac{\pi R}{R^2-4}
\longrightarrow0.
$$

実軸部分を極限へ送って

$$
\boxed{
\int_{-\infty}^{\infty}\frac{dx}{x^2+4}=\frac\pi2
}.
$$
<!-- solution-end -->

### Level C

<a id="ex-ca4-c01"></a>
#### CA4-C01 Rouché による零点計数
- Level: C

多項式

$$
p(z)=z^7+4z^3+1
$$

が単位円 $|z|<1$ 内に持つ零点の個数を、重複度込みで求めよ。

<!-- solution-start -->
**解答**：単位円上で主役を

$$
f(z)=4z^3
$$

と取り、残りを

$$
g(z)=z^7+1
$$

とする。$|z|=1$ なら

$$
|f(z)|=4,
$$

一方三角不等式から

$$
|g(z)|
=|z^7+1|
\le |z|^7+1
=2.
$$

従って境界上で厳密に

$$
|g(z)|<|f(z)|.
$$

[Rouchéの定理](#thm-ca4-rouche) により $f$ と $p=f+g$ は単位円内に同じ個数の零点を持つ。$4z^3$ は $z=0$ に位数3の零点を持つので

$$
\boxed{p\text{ は }|z|<1\text{ に重複度込みで3個の零点を持つ}}.
$$

境界上に零点がないことも、上の厳密不等式から同時に保証される。ここで比較項を $z^7$ にすると $|4z^3+1|$ を1未満にできず、定理を適用できない。どの項を主役に選ぶかが零点計数の実務上の要点である。
<!-- solution-end -->

---

## 10. 章末チェック

- Laurent 展開は、外円と内円の Cauchy 核を別々の幾何級数にし、一様収束を確認してから項別積分する。
- Laurent 係数の半径独立性は、二円の間で係数用の被積分関数が正則であることから出る。
- 可除・極・真性の分類は Laurent 主部の形と双方向に対応する。
- 留数は $(z-a)^{-1}$ の係数であり、小円積分がその係数だけを抽出する。
- 留数定理では、外側境界は反時計回り、穴から見た内側境界は時計回りである。
- 偏角原理は $f'/f$ の留数が零点位数なら正、極位数なら負になることから導く。
- [Rouchéの定理](#thm-ca4-rouche) は偏角原理の後に置き、$f+t g$ が境界で0にならないことと零点数の連続整数値性から証明する。
