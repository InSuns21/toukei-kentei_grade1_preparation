# GBG27 自己双対性はYang–Mills作用に何を与えるか

[GBG26の第二Chern数](../GBG26/index.md#def-gbg26-chern-number)は、4次元の $SU(2)$ 主束と接続から得られる量だった。一方、物理では曲率の大きさを積分した **Yang–Mills作用** を小さくしたい。曲率の二乗の積分と、符号を持つ $\operatorname{tr}(F\wedge F)$ の積分には、どんな関係があるだろうか。

この講では、**向きと正定値Riemann計量を入れた4次元**で2形式を二つに分ける Hodge 星作用素をまず座標から構成する。分解によって作用を平方完成すると、第二Chern数で決まる下界が現れる。さらに下界を達成する曲率が、二階の Yang–Mills 方程式を一階の自己双対方程式によって解くことを示す。次講ではこの方程式の具体解を作る。

**全講を通じた規約**。$M$ は向き付き滑らかな4次元Riemann多様体、$P\to M$ は右主 $SU(2)$ 束、$A$ は滑らかな接続とする。$F=F_A=dA+A\wedge A$ は局所表示である。係数は基本2次元複素表現の反Hermite・跡零行列で、$\operatorname{tr}$ はその通常の行列跡とする。計量と向きは固定し、星作用素は基底の形式成分だけに作用させる。積分を使う節では、特記しない限り **$M$ はコンパクトで境界を持たない** と仮定する。

## 1. 2形式を二つに分ける道具

[GEO8の向き](../../GEO/GEO8/index.md#def-geo8-vector-space-orientation)は正の基底を区別する。一方、Riemann計量は各接空間に正定値内積を与えるので、各点で**正の正規直交余接基底** $e^1,e^2,e^3,e^4$ を選べる。この基底の外積

$$
\operatorname{vol}_g=e^1\wedge e^2\wedge e^3\wedge e^4
$$

を計量の体積4形式という。この記号は正の正規直交基底の変更では変わらない。

2形式の点ごとの内積は、$i<j$ で並べた基底 $e^{ij}=e^i\wedge e^j$ を正規直交にするものとする。つまり $\alpha=\sum_{i<j}a_{ij}e^{ij}$、$\beta=\sum_{i<j}b_{ij}e^{ij}$ なら $\langle\alpha,\beta\rangle_g=\sum_{i<j}a_{ij}b_{ij}$ である。$\alpha\wedge\beta$ は4形式だから、必ず $\operatorname{vol}_g$ の実数倍になる。そこで「$\alpha$ と $\beta$ の内積」を外積で読めるようにしたい。

<a id="def-gbg27-hodge-star"></a>

<!-- formal-statement-start -->
> **定義（4次元の2形式に作用するHodge星）**  
> 向き付き4次元実内積空間 $(V,g)$ の2形式 $\beta\in\Lambda^2V^*$ に対し、$\alpha\in\Lambda^2V^*$ のすべてについて

$$
\alpha\wedge *\beta=\langle\alpha,\beta\rangle_g\,\operatorname{vol}_g
$$

> を満たす一意な2形式 $*\beta$ を Hodge 星と呼ぶ。多様体では各余接空間でこの操作を滑らかに行う。
<!-- formal-statement-end -->

「一意」の意味も座標で確認できる。$e^{12}\wedge e^{34}=\operatorname{vol}_g$ なので $*e^{12}=e^{34}$ とすべきである。同様に、符号を含めて

$$
\begin{aligned}
*e^{12}&=e^{34}, & *e^{13}&=-e^{24}, & *e^{14}&=e^{23},\\
*e^{34}&=e^{12}, & *e^{24}&=-e^{13}, & *e^{23}&=e^{14}.
\end{aligned}
$$

右辺の各係数は $\alpha=e^{ij}$ を順に代入すれば一意に定まり、この表が定義式を実際に満たすので存在も従う。任意の正の正規直交基底への変更でも外積・内積・体積形式が保存されるから、* は選んだ基底に依存しない。

<!-- definition-example-start: def-gbg27-hodge-star -->
**定義の直接例**。標準向き・Euclid計量の $\mathbb R^4$ で $\beta=dx^1\wedge dx^2$ とする。上の表から $*\beta=dx^3\wedge dx^4$ である。$\alpha=\sum a_{ij}dx^i\wedge dx^j$ を代入すると、$dx^{ij}\wedge dx^{34}$ は $(i,j)=(1,2)$ のときだけ非零なので

$$
\alpha\wedge *\beta=a_{12}\,dx^{1234}
=\langle\alpha,\beta\rangle_g\,\operatorname{vol}_g.
$$

これは定義の「すべての $\alpha$」という条件まで検証している。
<!-- definition-example-end -->

<a id="prop-gbg27-star-involution"></a>

<!-- formal-statement-start -->
> **命題（4次元の星の二乗）**  
> 上の向きと正定値計量の下で、任意の実2形式 $\alpha$ に対して

$$
*^2\alpha=\alpha,\qquad
\langle*\alpha,*\beta\rangle_g=\langle\alpha,\beta\rangle_g.
$$

> これらの式は $\mathfrak{su}(2)$ 値2形式にも係数ごとに成立する。
<!-- formal-statement-end -->

**証明の見取り図**。6個の基底2形式について上の表を二回適用する。星は符号付きでその基底を入れ替えるだけなので、内積も保たれる。

<!-- proof-start -->
### 証明

$e^{12}$ と $e^{34}$ は互いに交換し、$e^{13}$ と $e^{24}$ は両方向とも負号を付けて交換し、$e^{14}$ と $e^{23}$ は正号を付けて交換する。従って6個の基底のすべてで $*^2e^{ij}=e^{ij}$ である。また各基底が同じ長さ1の別の基底へ写り、異なる基底同士の直交性も保存されるため、$\langle*e^{ij},*e^{kl}\rangle_g=\delta_{(ij),(kl)}$。線形性で任意の $\alpha,\beta$ へ拡張する。行列係数は変化させないので係数ごとにも成り立つ。
<!-- proof-end -->

**注意**。この $*^2=+1$ は「正定値計量の4次元・2形式」での式である。Lorentz計量では符号が異なり、以下の実自己双対・反自己双対の分解をそのまま使えない。

## 2. 自己双対な曲率を取り出す

$*^2=1$ なので、任意の2形式 $\alpha$ の成分を

$$
\alpha^+=\frac12(\alpha+*\alpha),\qquad
\alpha^-=\frac12(\alpha-*\alpha)
$$

と置けば、$\alpha=\alpha^++\alpha^-$ で、$*\alpha^+=\alpha^+$、$*\alpha^-=-\alpha^-$ である。加えて $\alpha^+$ と $\alpha^-$ は直交する。実際、星が内積を保存するため

$$
\langle\alpha^+,\alpha^-\rangle_g
=\langle*\alpha^+,*\alpha^-\rangle_g
=-\langle\alpha^+,\alpha^-\rangle_g=0.
$$

<a id="def-gbg27-self-duality"></a>

<!-- formal-statement-start -->
> **定義（自己双対・反自己双対曲率）**  
> 向き付きRiemann 4多様体上の $SU(2)$ 接続 $A$ の曲率 $F_A$ に対し、

$$
F_A^+=\frac12(F_A+*F_A),\qquad
F_A^-=\frac12(F_A-*F_A)
$$

> と置く。$F_A=*F_A$（同値に $F_A^-=0$）を **自己双対**、$F_A=-*F_A$（同値に $F_A^+=0$）を **反自己双対** と呼ぶ。
<!-- formal-statement-end -->

<!-- definition-example-start: def-gbg27-self-duality -->
**定義の直接例**。$\mathbb R^4$ の標準計量・向きで $T=\operatorname{diag}(i,-i)\in\mathfrak{su}(2)$ とし、自明束の大域接続を

$$
A=\frac T2\left(x^1dx^2-x^2dx^1+x^3dx^4-x^4dx^3\right)
$$

とする。$A$ のすべての成分は $T$ の倍数なので $A\wedge A=0$ であり、各対の微分から

$$
F_A=T(dx^{12}+dx^{34}),\qquad
*F_A=T(dx^{34}+dx^{12})=F_A.
$$

従って $F_A^-=0$、$F_A^+=F_A$。反対に $x^3dx^4-x^4dx^3$ の前だけ負号を付ければ、$F_A=T(dx^{12}-dx^{34})$ で反自己双対となる。どちらも曲率の定義と星の定義の**両方**を確認した例である。ただしこの接続は $\mathbb R^4$ 全体では曲率が定数で、作用積分は無限大である。局所的な自己双対性と有限作用性を混同しない。
<!-- definition-example-end -->

<a id="prop-gbg27-orthogonal-splitting"></a>

<!-- formal-statement-start -->
> **命題（曲率の直交分解）**  
> 上の仮定の下で $\mathfrak{su}(2)$ 値曲率は $F_A=F_A^++F_A^-$ と一意に分解され、点ごとに

$$
\lvert F_A\rvert^2=\lvert F_A^+\rvert^2+\lvert F_A^-\rvert^2
$$

> を満たす。ただし係数の内積は $\langle X,Y\rangle_{\mathfrak{su}(2)}=-\operatorname{tr}(XY)$ とする。
<!-- formal-statement-end -->

**証明の見取り図**。反Hermite行列の $-\operatorname{tr}(X^2)$ が非負になることをまず確かめ、形式部分の直交性と合わせる。

<!-- proof-start -->
### 証明

$X\in\mathfrak{su}(2)$ なら $X^\dagger=-X$ なので

$$
-\operatorname{tr}(X^2)=\operatorname{tr}(X^\dagger X)
=\sum_{i,j}|X_{ij}|^2\ge0,
$$

かつ等号は $X=0$ の場合だけである。ゆえに $-\operatorname{tr}(XY)$ は対称・正定値な実内積を与える。正の正規直交余接基底で $F=\sum_{i<j}F_{ij}e^{ij}$ と書くと、形式部分の星は係数を変えない。[星の二乗](#prop-gbg27-star-involution)と直交性から各行列成分について $\langle F^+,F^-\rangle=0$。従って

$$
|F|^2=|F^++F^-|^2=|F^+|^2+2\langle F^+,F^-\rangle+|F^-|^2
=|F^+|^2+|F^-|^2.
$$

射影 $(1\pm*)/2$ で決まるため分解は一意である。
<!-- proof-end -->

[GBG10の曲率ゲージ変換則](../GBG10/index.md#thm-gbg10-gauge-transform)は $F^g=g^{-1}Fg$ を与える。$g$ は0形式なので $*(g^{-1}Fg)=g^{-1}(*F)g$ であり、$F^\pm$ も共役で変換する。自己双対性は局所ゲージの選び方によらない。一方、向きを反転すると $*$ の符号が変わるので、自己双対と反自己双対は入れ替わる。

## 3. 作用を平方完成する

$\operatorname{tr}$ の符号を確認しておく。反Hermite行列 $X$ について $-\operatorname{tr}(X^2)>0$（$X\ne0$）だから、作用に正の符号を得るには $-\operatorname{tr}$ を使う。

<a id="def-gbg27-yang-mills-action"></a>

<!-- formal-statement-start -->
> **定義（4次元Riemann計量によるYang–Mills作用）**  
> 向き付きコンパクト閉Riemann 4多様体上の滑らかな右主 $SU(2)$ 束と接続 $A$ に対して、基本表現の跡を使い

$$
\operatorname{YM}(A)=-\int_M\operatorname{tr}(F_A\wedge *F_A)
=\int_M|F_A|^2\,\operatorname{vol}_g
$$

> を Yang–Mills作用と定める。ここでは係数 $1/2$ や結合定数は前に付けない。
<!-- formal-statement-end -->

<!-- definition-example-start: def-gbg27-yang-mills-action -->
**定義の直接例**。一点の正規直交基底で $F=T\,e^{12}$、$T=\operatorname{diag}(i,-i)$ なら $*F=T\,e^{34}$、$T^2=-I_2$ なので

$$
-\operatorname{tr}(F\wedge *F)
=-\operatorname{tr}(T^2)e^{1234}
=2\,\operatorname{vol}_g.
$$

一方 $|F|^2=-\operatorname{tr}(T^2)|e^{12}|^2=2$ で、定義の二つの表示が一致する。この計算は点ごとの密度の確認であり、接続として大域的に実現できるか、積分が有限かは別途確認する。
<!-- definition-example-end -->

第二Chern数は[GBG26の規約](../GBG26/index.md#def-gbg26-chern-number)のまま

$$
k(P)=\frac1{8\pi^2}\int_M\operatorname{tr}(F_A\wedge F_A)
$$

である。閉多様体での[接続非依存性](../GBG22/index.md#cor-gbg22-class-independence)により、右辺は同じ $P$ 上のどの滑らかな接続でも同じ値である。一般の $M$ について整数性をこの式だけから仮定する必要はない。特に $S^4$ のクラッチング束では[GBG26の定理](../GBG26/index.md#thm-gbg26-clutching-number)から $k=\deg f\in\mathbb Z$ と分かる。

ここで $F^\pm$ に対して $*F^+=F^+$、$*F^-=-F^-$、かつ直交することを使う。各点で

$$
\begin{aligned}
-\operatorname{tr}(F\wedge *F)
&=(|F^+|^2+|F^-|^2)\operatorname{vol}_g,\\
\operatorname{tr}(F\wedge F)
&=(-|F^+|^2+|F^-|^2)\operatorname{vol}_g.
\end{aligned}
$$

二行目は $\operatorname{tr}(F^\pm\wedge F^\pm)
=\mp|F^\pm|^2\operatorname{vol}_g$ から得る。例えば $F^+=*F^+$ のとき $F^+\wedge F^+=F^+\wedge *F^+$ だから、跡は**負**になる。

<a id="thm-gbg27-yang-mills-bound"></a>

<!-- formal-statement-start -->
> **定理（Yang–Mills作用の位相的下界）**  
> $M$ を向き付きコンパクト境界なしRiemann 4多様体、$P\to M$ を滑らかな右主 $SU(2)$ 束、$A$ をその滑らかな接続とする。上の跡・向き・係数規約では

$$
\begin{aligned}
\operatorname{YM}(A)-8\pi^2k(P)&=2\|F_A^+\|_{L^2}^2,\\
\operatorname{YM}(A)+8\pi^2k(P)&=2\|F_A^-\|_{L^2}^2,\\
\operatorname{YM}(A)&\ge8\pi^2|k(P)|.
\end{aligned}
$$

> $k(P)>0$ で下界を達成するための必要十分条件は $F_A=-*F_A$、$k(P)<0$ では $F_A=*F_A$ である。$k(P)=0$ のとき等号成立は $F_A=0$ と同値である。
<!-- formal-statement-end -->

**証明の見取り図**。形式部分は正負に直交分解でき、作用は二つのノルムの和、第二Chern数はその差である。和と差を足し引きするだけで正の平方が残る。

<!-- proof-start -->
### 証明

$u=\int_M|F^+|^2\operatorname{vol}_g$、$v=\int_M|F^-|^2\operatorname{vol}_g$ と置く。$u,v\ge0$ であり、前節の点ごとの計算を積分すると

$$
\operatorname{YM}(A)=u+v,\qquad 8\pi^2k(P)=-u+v.
$$

従って

$$
\operatorname{YM}(A)-8\pi^2k(P)
=(u+v)-(-u+v)=2u
$$

および

$$
\operatorname{YM}(A)+8\pi^2k(P)
=(u+v)+(-u+v)=2v.
$$

両方が非負なので $\operatorname{YM}(A)\ge\max\{8\pi^2k,-8\pi^2k\}=8\pi^2|k|$。$k>0$ の場合、下界での等号は $u=0$、すなわち $F^+=0$。滑らかな非負関数 $|F^+|^2$ の積分が零なら各点で零なので、$F=-*F$ に等しい。逆向きは代入すれば分かる。$k<0$ は $v=0$、$k=0$ は $u=v=0$ が必要十分である。
<!-- proof-end -->

**例：符号と束の関係**。$S^4$ 上で前講の $P_Q$ は $k(P_Q)=+1$ なので

$$
\operatorname{YM}(A)\ge8\pi^2,
\qquad
\operatorname{YM}(A)=8\pi^2\ \Longleftrightarrow\ F_A=-*F_A.
$$

反対に $P_{Q^{-1}}$ なら $k=-1$ で、等号条件は $F_A=*F_A$ となる。**この講で「等号を実現する接続が存在する」と証明したわけではない**。具体的な実現はGBG28の課題である。

## 4. 一階条件が二階のYang–Mills方程式を解く理由

最小化したい作用の停留条件も確認する。接続を動かすとき、異なる主束同士を差し引くのではなく、固定した $P$ の接続空間の中で動かす。[GBG12の接続の差](../GBG12/index.md#thm-gbg12-connections-affine)により、滑らかな $\operatorname{ad}(P)$ 値1形式 $a$ から $A_t=A+ta$ を作れる。

局所表示で $F_{A_t}=d(A+ta)+(A+ta)\wedge(A+ta)$ を展開すると

$$
F_{A_t}=F_A+t(d a+A\wedge a+a\wedge A)+t^2a\wedge a
=F_A+t\,d_Aa+t^2a\wedge a.
$$

ここで $d_Aa=da+A\wedge a+a\wedge A$ は次数1の[共変外微分](../GBG11/index.md#def-gbg11-local-covariant-exterior)である。従って $\dot F_{A_t}|_{t=0}=d_Aa$。計量は動かさないので $\dot{(*F)}=*\dot F$ である。

<a id="thm-gbg27-yang-mills-equation"></a>

<!-- formal-statement-start -->
> **定理（Yang–Mills作用の第一変分と方程式）**  
> $M$ を向き付きコンパクト境界なしRiemann 4多様体、$A$ を滑らかな $SU(2)$ 接続とする。任意の滑らかな $\operatorname{ad}(P)$ 値1形式 $a$ について

$$
\left.\frac{d}{dt}\operatorname{YM}(A+ta)\right|_{t=0}
=-2\int_M\operatorname{tr}(a\wedge d_A*F_A).
$$

> したがって $A$ がすべてのそのような変分について停留するための必要十分条件は

$$
d_A*F_A=0.
$$

> これを Yang–Mills 方程式と呼ぶ。境界付きまたは非コンパクトの場合は、境界項が消える変分（例えば内部にコンパクト台を持つもの）についての式として扱う。
<!-- formal-statement-end -->

**証明の見取り図**。曲率の一次変化は $d_Aa$。外微分の積の法則を $a\wedge *F$ に使い、閉多様体のStokesで微分を移す。最後の必要性には変分 $a$ の任意性を使う。

<!-- proof-start -->
### 証明

対称な跡の内積と $*F$ の線形性から

$$
\left.\frac d{dt}\operatorname{YM}(A_t)\right|_{0}
=-2\int_M\operatorname{tr}(d_Aa\wedge*F_A).
$$

次数1の $a$ に対して、[次数付きLeibniz則](../../GEO/GEO7/index.md#thm-geo7-graded-leibniz)と跡の巡回性から

$$
d\,\operatorname{tr}(a\wedge *F)
=\operatorname{tr}(d_Aa\wedge*F)
-\operatorname{tr}(a\wedge d_A*F).
$$

接続の補正項は $\operatorname{tr}$ の中で交換子として相殺される。[一般Stokes定理](../../GEO/GEO8/index.md#thm-geo8-general-stokes)を閉 $M$ に適用すると左辺の積分は零だから、主張の第一変分式を得る。

十分性は $d_A*F=0$ を代入すれば直ちに分かる。必要性については、各点の局所正規直交基底で $d_A*F$ の3形式成分を取る。もし成分が一点で零でなければ、正定値の $-\operatorname{tr}$ と星を使い、その成分に対応する $a$ を小さい近傍に台を持つ形で選べば $\int\operatorname{tr}(a\wedge d_A*F)\ne0$ となる（具体的には $a=*(d_A*F)$ に非負のカットオフを掛ければ、$a\wedge d_A*F$ はその成分の符号付き二乗に等しい）。これは停留性に矛盾する。従って全点で $d_A*F=0$。
<!-- proof-end -->

<a id="thm-gbg27-self-dual-solves-ym"></a>

<!-- formal-statement-start -->
> **定理（自己双対・反自己双対接続はYang–Mills接続）**  
> 向き付きRiemann 4多様体上の任意の滑らかな $SU(2)$ 接続 $A$ が $F_A=*F_A$ または $F_A=-*F_A$ を満たすなら、

$$
d_A*F_A=0.
$$

> 特にコンパクト閉多様体上ではYang–Mills作用の停留点であり、同じ束の接続すべての中で前節の下界を達成する。
<!-- formal-statement-end -->

**証明の見取り図**。[Bianchi恒等式](../GBG11/index.md#thm-gbg11-bianchi-local)は接続の曲率なら $d_AF_A=0$ と保証する。自己双対条件は星を取った曲率を $\pm F_A$ に変えるから、これを代入する。

<!-- proof-start -->
### 証明

[GBG11のBianchi恒等式](../GBG11/index.md#thm-gbg11-bianchi-local)を現在の接続 $A$ と曲率 $F_A$ に適用すると $d_AF_A=0$ である。$*F_A=\varepsilon F_A$、$\varepsilon\in\{+1,-1\}$ と置けば、$d_A$ の線形性で

$$
d_A*F_A=d_A(\varepsilon F_A)
=\varepsilon\,d_AF_A=0.
$$

閉多様体での停留性は[第一変分定理](#thm-gbg27-yang-mills-equation)で従い、絶対最小性は[作用の位相的下界](#thm-gbg27-yang-mills-bound)の等号条件から従う。
<!-- proof-end -->

**逆は一般に成立しない**。Yang–Mills方程式は停留条件であり、$F=\pm*F$ はさらに強い条件である。たとえば閉多様体が平坦接続以外を許す場合の他の停留点については、平方完成だけでは存在・分類を主張できない。$k=0$ での絶対最小は平坦接続に限られるが、それと任意の停留点が平坦であることは別である。

## 5. 向き・境界・正規化で何が変わるか

同じRiemann計量で向きを反転すると $\operatorname{vol}_g$ と $*$ はともに負号を受ける。積分も向きに応じて負号が付くため、$\operatorname{YM}$ 自体は不変だが $k$ は $-k$ になる。したがって「正の $k$ に対応するのは反自己双対」という先の結論は、**その向きでの正の $k$** に対するものと読み直す。

境界付き領域 $U$ では $\int_U\operatorname{tr}(F^2)$ と $\int_U|F|^2$ を同じ形で分解でき、代数的な不等式

$$
\operatorname{YM}_U(A)\ge
\left|\int_U\operatorname{tr}(F_A\wedge F_A)\right|
$$

も成り立つ。しかし境界で接続が変わると $\int_U\operatorname{tr}(F^2)$ に境界項が生じるので、それを「束のみの位相的数」とは無条件に呼べない。非コンパクト領域でも作用の有限性、積分の収束、無限遠での境界条件を別途確認する。

さらに、作用へ結合定数 $g>0$ を入れて $S_g(A)=\operatorname{YM}(A)/g^2$ とすれば下界も $8\pi^2|k|/g^2$ となる。一方、もし作用の定義へ $1/2$ を付ければ、下界にも $1/2$ が付く。係数の違う文献の数値だけを比較しない。

## 6. 演習と詳細解答

### Level A：星・曲率・係数を計算する

<a id="ex-gbg27-a01"></a>
#### GBG27-A01 星作用素の符号
- Level: A

標準向きの $\mathbb R^4$ で $*dx^{13}$ と $*dx^{24}$ を求め、$*^2dx^{13}=dx^{13}$ を定義式から確認せよ。

<!-- solution-start -->
**詳細解答**。$dx^{13}\wedge dx^{24}=dx^1\wedge dx^3\wedge dx^2\wedge dx^4=-dx^{1234}$ なので、$*dx^{13}=-dx^{24}$ とすると $dx^{13}\wedge*dx^{13}=+\operatorname{vol}$。また $dx^{24}\wedge dx^{13}=-dx^{1234}$ なので $*dx^{24}=-dx^{13}$。従って

$$
*^2dx^{13}=*(-dx^{24})=-(-dx^{13})=dx^{13}.
$$

他の基底との外積は零なので、定義式の全基底成分についても正しい。
<!-- solution-end -->

<a id="ex-gbg27-a02"></a>
#### GBG27-A02 射影の式
- Level: A

$F=T(2dx^{12}+dx^{34})$、$T=\operatorname{diag}(i,-i)$ とする。$F^\pm$ を計算し、$F^\pm$ がそれぞれ星の固有値 $\pm1$ を持つことを確認せよ。

<!-- solution-start -->
**詳細解答**。$*dx^{12}=dx^{34}$、$*dx^{34}=dx^{12}$ だから

$$
*F=T(dx^{12}+2dx^{34}).
$$

従って

$$
F^+=\frac{3T}{2}(dx^{12}+dx^{34}),\qquad
F^-=\frac{T}{2}(dx^{12}-dx^{34}).
$$

星を作用させると括弧の和は不変、差は負号を得るので $*F^+=F^+$、$*F^-=-F^-$ となる。和も $F^++F^-=T(2dx^{12}+dx^{34})=F$ に戻る。
<!-- solution-end -->

<a id="ex-gbg27-a03"></a>
#### GBG27-A03 作用密度の符号
- Level: A

$F=Tdx^{12}$、$T=\operatorname{diag}(i,-i)$ の点で $-\operatorname{tr}(F\wedge*F)$ と $|F|^2\operatorname{vol}$ を求めて一致を確認せよ。

<!-- solution-start -->
**詳細解答**。$T^2=\operatorname{diag}(-1,-1)=-I_2$、$\operatorname{tr}(T^2)=-2$、$*F=Tdx^{34}$ なので

$$
-\operatorname{tr}(F\wedge*F)
=-\operatorname{tr}(T^2)\,dx^{1234}
=2\,\operatorname{vol}.
$$

形式 $dx^{12}$ のノルムは1、行列 $T$ のノルム二乗は $-\operatorname{tr}(T^2)=2$ である。従って $|F|^2\operatorname{vol}=2\operatorname{vol}$ となる。
<!-- solution-end -->

<a id="ex-gbg27-a04"></a>
#### GBG27-A04 向き反転
- Level: A

$\mathbb R^4$ の標準計量を固定したまま向きだけ反転する。$*dx^{12}$ がどう変わるかを示し、標準向きで自己双対な $dx^{12}+dx^{34}$ が新しい向きではどう分類されるか求めよ。

<!-- solution-start -->
**詳細解答**。新しい体積形式は $-\operatorname{vol}$ になる。$dx^{12}\wedge *'dx^{12}=\langle dx^{12},dx^{12}\rangle(-\operatorname{vol})$ を満たすには $*'dx^{12}=-dx^{34}$ とすればよい。同様に $*'dx^{34}=-dx^{12}$。従って

$$
*'(dx^{12}+dx^{34})=-(dx^{12}+dx^{34}).
$$

元の自己双対形式は、向き反転後には反自己双対となる。
<!-- solution-end -->

### Level B：作用の下界と変分を導く

<a id="ex-gbg27-b01"></a>
#### GBG27-B01 形式の平方完成
- Level: B

$u=\|F^+\|_{L^2}^2$、$v=\|F^-\|_{L^2}^2$ と置く。$\operatorname{YM}=u+v$、$8\pi^2 k=-u+v$ から二つの平方完成を求め、$k=2$ の場合にどちらの成分が零なら下界の等号となるか述べよ。

<!-- solution-start -->
**詳細解答**。二式の差を取ると

$$
\operatorname{YM}-8\pi^2k=(u+v)-(-u+v)=2u,
$$

和を取ると

$$
\operatorname{YM}+8\pi^2k=(u+v)+(-u+v)=2v.
$$

$k=2$ なら $\operatorname{YM}\ge16\pi^2$、等号は $u=0$ である。滑らかな $F^+$ のノルム二乗の積分が零なら $F^+\equiv0$、つまり $F=-*F$。$F^-=0$ と取り違えると負の $k$ に対応してしまう。
<!-- solution-end -->

<a id="ex-gbg27-b02"></a>
#### GBG27-B02 曲率の一次変化
- Level: B

$A_t=A+ta$（$a$ は随伴束値1形式）としたとき、$F_{A_t}$ を $t^2$ まで展開し、$d_Aa$ の $A\wedge a$ と $a\wedge A$ の符号を説明せよ。

<!-- solution-start -->
**詳細解答**。局所表示を展開すると

$$
\begin{aligned}
F_{A_t}
&=dA+t\,da+A\wedge A
+t(A\wedge a+a\wedge A)+t^2a\wedge a\\
&=F_A+t\{da+A\wedge a+a\wedge A\}+t^2a\wedge a.
\end{aligned}
$$

[共変外微分の次数規約](../GBG11/index.md#def-gbg11-local-covariant-exterior)は $d_Aa=da+A\wedge a-(-1)^1a\wedge A$ なので、最後の補正項は正になる。従って $\left.\frac{dF_{A_t}}{dt}\right|_0=d_Aa$ である。ここで $A$ と $a$ は行列値で、一般に $A\wedge a=-a\wedge A$ とはできない。
<!-- solution-end -->

<a id="ex-gbg27-b03"></a>
#### GBG27-B03 接続の変分における境界項
- Level: B

境界付きコンパクト4多様体 $U$ 上で $A_t=A+ta$ とする。$a$ が境界で必ずしも零でない場合の $\left.\frac d{dt}\operatorname{YM}_U(A_t)\right|_0$ を、内部と境界の二つの積分で表せ。停留性を得るために必要な境界側の条件を一つ挙げよ。

<!-- solution-start -->
**詳細解答**。曲率の微分は $d_Aa$ なので $\delta\operatorname{YM}_U=-2\int_U\operatorname{tr}(d_Aa\wedge*F)$。次数付き積の法則

$$
d\operatorname{tr}(a\wedge*F)
=\operatorname{tr}(d_Aa\wedge*F)-\operatorname{tr}(a\wedge d_A*F)
$$

と[Stokes定理](../../GEO/GEO8/index.md#thm-geo8-general-stokes)から

$$
\delta\operatorname{YM}_U
=-2\int_U\operatorname{tr}(a\wedge d_A*F)
-2\int_{\partial U}\operatorname{tr}(a\wedge*F).
$$

例えば $a$ の境界への引戻しが零（境界の接続を固定する変分）なら境界積分は消える。内部で $d_A*F=0$ だけでは、自由な境界変分に対する停留性は保証されない。
<!-- solution-end -->

<a id="ex-gbg27-b04"></a>
#### GBG27-B04 $k=0$ の曲率が非零でもよいか
- Level: B

閉4多様体上の自明 $SU(2)$ 束について $k=0$ を用い、$F\ne0$ の接続の作用が零になれないことを示せ。一方、$k=0$ から $F=0$ とは言えない理由を論証せよ。

<!-- solution-start -->
**詳細解答**。自明束には大域接続 $A=0$ があり、[第二Chern数の接続非依存性](../GBG22/index.md#cor-gbg22-class-independence)から任意の接続で $k=0$。平方完成と $k=0$ から **二つのノルムが等しい** $u=v$、従って $\operatorname{YM}=2u=2v$ となる。$F\ne0$ が滑らかならどこかで $|F|^2>0$ だから $\operatorname{YM}=\int|F|^2\operatorname{vol}>0$。$k=0$ は二つの非負量の差が零というだけで、個々の量が零とは限らない。[GBG26の自明束上の非平坦接続例](../GBG26/index.md#ex-gbg26-b04)も、この区別を示している。
<!-- solution-end -->

### Level C：曲率・位相・作用・方程式を統合する

<a id="ex-gbg27-c01"></a>
#### GBG27-C01 クラッチング束上の最小作用と方程式
- Level: C

$S^4$ に標準向き・任意の滑らかな正定値Riemann計量を与える。$f:S^3\to SU(2)$ を滑らかなクラッチング写像、$P_f$ をGBG25の右主束とし、$k(P_f)=\deg f=m$ を使ってよい。

1. $\operatorname{YM}(A)\ge8\pi^2|m|$ を示し、$m=1$、$m=-1$、$m=0$ のそれぞれについて等号条件を明示せよ。
2. 等号を達成する接続があると仮定して、その接続が $d_A*F_A=0$ を満たすことを、Bianchi恒等式と星の符号から導け。
3. $\deg f=0$ で与えられた接続が必ず平坦という主張が誤りである理由と、境界付き4球へ同じ位相的議論を無条件に移せない理由を説明せよ。

<!-- solution-start -->
**詳細解答**。

**(1)** [クラッチング次数の定理](../GBG26/index.md#thm-gbg26-clutching-number)は固定向きで $k(P_f)=m$ を与える。$u=\|F_A^+\|_{L^2}^2$、$v=\|F_A^-\|_{L^2}^2$ と置くと、局所的な星分解から $\operatorname{YM}=u+v$、$8\pi^2m=-u+v$。従って

$$
\operatorname{YM}-8\pi^2m=2u\ge0,\qquad
\operatorname{YM}+8\pi^2m=2v\ge0.
$$

$m=1$ なら $\operatorname{YM}\ge8\pi^2$ で $u=0$、すなわち $F=-*F$ が等号成立の条件。$m=-1$ なら $\operatorname{YM}\ge8\pi^2$ で $v=0$、すなわち $F=*F$。$m=0$ なら $\operatorname{YM}\ge0$ で等号は $u=v=0$、つまり $F=0$。どの場合も**等号を達成するための条件**を導いたのであって、その条件を実現する接続の存在は別に証明する必要がある。

**(2)** 例えば $m=1$ の等号接続では $*F=-F$ である。[曲率の共変外微分が零になる恒等式](../GBG11/index.md#thm-gbg11-bianchi-local)より $d_AF=0$。従って

$$
d_A*F=d_A(-F)=-d_AF=0.
$$

$m=-1$ なら $*F=F$ なので $d_A*F=d_AF=0$。$m=0$ の等号接続は $F=0$ だから同式が成り立つ。いずれも[第一変分定理](#thm-gbg27-yang-mills-equation)の停留条件に一致する。

**(3)** $m=0$ は積分 $-\|F^+\|^2+\|F^-\|^2=0$ を意味し、二項がともに零とは限らない。自明束上の局所台を持つ非平坦接続は存在し、$k=0$ のまま曲率を非零にできる。境界付き4球 $D^4$ では $-\int\operatorname{tr}(F\wedge*F)$ の代数的な不等式は使えても、[Chern–Simons境界計算](../GBG26/index.md#calc-gbg26-pure-cs)のように $\int_{D^4}\operatorname{tr}(F^2)$ は境界接続で変化し得る。従ってそれを閉多様体の $m$ と同一視するには、境界条件や貼り合わせ先を指定しなければならない。
<!-- solution-end -->

## 7. この講で得たこと

2形式の Hodge 星が $*^2=1$ を満たすため、曲率を正負の成分に分けられた。反Hermiteの基本表現で正の作用は $-\operatorname{tr}(F\wedge*F)$ と定め、前講の第二Chern数との関係を平方完成すると

$$
\operatorname{YM}(A)\ge8\pi^2|k(P)|
$$

が得られる。**前講の向きで $k>0$ で等号が成立するのは反自己双対、$k<0$ は自己双対**である。[曲率の共変外微分が零になる恒等式](../GBG11/index.md#thm-gbg11-bianchi-local)から両方ともYang–Mills方程式を満たす。

**次講GBG28**では具体的な BPST 接続を構成し、曲率の双対性、有限作用、第二Chern数の絶対値1を実際に検算する。
