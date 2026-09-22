# GEO15 幾何学 XV

<!-- definition-example-audit: strict -->

[GEO14](../GEO14/index.md) では、測地線・指数写像・正規座標・凸正規近傍を構成し、測地線が局所的には距離を実現することを示しました。

本章の主題は、その局所理論がいつ多様体全体へ延びるかです。

Riemann 多様体には、少なくとも二つの「最後まで行ける」があります。

- Riemann 距離について Cauchy 列が極限を持つ。
- 測地線が有限時間で途切れず、任意の時刻まで延長できる。

一見すると別の条件ですが、Hopf--Rinow の定理は、有限次元 Riemann 幾何ではこれらが同値であることを示します。さらに、同値な完備性が成り立つと、任意の二点を結ぶ最短測地線が存在し、閉有界集合はコンパクトになります。

本章では

$$
\text{局所正規近傍}
\longrightarrow
\text{有限時刻での測地線延長}
\longrightarrow
\text{指数写像の大域定義}
\longrightarrow
\text{最短測地線の存在}
\longrightarrow
\text{閉球のコンパクト性}
$$

という証明の流れを一つずつ閉じます。

なお、本章では Riemann 距離を通常の有限値距離として扱うため、特に断らない限り Riemann 多様体は連結とします。非連結の場合は各連結成分へ同じ議論を適用します。

---

## 1. 二つの完備性

まず、距離空間としての完備性を Riemann 距離へ適用します。

<a id="def-geo15-metric-complete"></a>
<!-- formal-statement-start -->
> **定義（距離完備な Riemann 多様体）**  
> Riemann 多様体 $(M,g)$ と、その Riemann 距離 $d$ を考える。
>
> 距離空間 $(M,d)$ が完備、すなわち任意の Cauchy 列 $(p_n)$ がある $p\in M$ へ収束するとき、$(M,g)$ を **距離完備**という。
<!-- formal-statement-end -->

<!-- definition-example-start: def-geo15-metric-complete -->
**定義の確認**

Euclid 空間 $\mathbb R^n$ の標準計量では Riemann 距離は通常の Euclid 距離です。

$\mathbb R^n$ は完備距離空間なので、標準 Euclid 空間は距離完備です。

一方、開区間

$$
M=(0,1)
$$

に標準計量

$$
ds^2=dx^2
$$

を入れると、

$$
x_n=\frac1n
$$

は Cauchy 列ですが、$M$ 内に極限を持ちません。

従って $(0,1)$ は距離完備ではありません。
<!-- definition-example-end -->

次に、測地線そのものがどこまで延びるかを見ます。

<a id="def-geo15-geodesic-complete"></a>
<!-- formal-statement-start -->
> **定義（測地完備な Riemann 多様体）**  
> Riemann 多様体 $(M,g)$ が **測地完備**であるとは、任意の
>
$$
p\in M,
\qquad
v\in T_pM
$$
>
> に対し、初期条件
>
$$
\gamma(0)=p,
\qquad
\dot\gamma(0)=v
$$
>
> を持つ最大測地線が全実数上
>
$$
\gamma:\mathbb R\to M
$$
>
> で定義されることをいう。
<!-- formal-statement-end -->

<!-- definition-example-start: def-geo15-geodesic-complete -->
**定義の確認**

$\mathbb R^n$ では

$$
\gamma(t)=p+tv
$$

が全ての $t\in\mathbb R$ で定義されるので測地完備です。

一方、

$$
M=(0,1)
$$

では

$$
\gamma(t)=\frac12+t
$$

は

$$
-\frac12<t<\frac12
$$

でしか $M$ 内に存在できません。

方程式そのものが壊れたのではなく、有限時間で多様体の外へ出てしまいます。したがって $(0,1)$ は測地完備ではありません。
<!-- definition-example-end -->

GEO14 の指数写像を使えば、測地完備性は次の形にも言い換えられます。

<a id="prop-geo15-exp-domain-geodesic-complete"></a>
<!-- formal-statement-start -->
> **命題（測地完備性と指数写像の定義域）**  
> Riemann 多様体 $(M,g)$ が測地完備であることと、任意の $p\in M$ について
>
$$
\boxed{
\mathcal D_p=T_pM
}
$$
>
> すなわち
>
$$
\boxed{
\exp_p:T_pM\to M
}
$$
>
> が全接空間上で定義されることは同値である。
<!-- formal-statement-end -->

<!-- proof-start -->
### 証明

測地完備なら、任意の初期速度 $v\in T_pM$ に対する測地線 $\gamma_v$ は少なくとも時刻1まで存在するので

$$
v\in\mathcal D_p.
$$

従って

$$
\mathcal D_p=T_pM.
$$

逆に、任意の $p$ で $\mathcal D_p=T_pM$ とします。

初期条件 $(p,v)$ と任意の $T>0$ を取ります。

$
Tv\in T_pM=\mathcal D_p
$

なので、初期速度 $Tv$ を持つ測地線

$
\eta:[0,1]\to M,
\qquad
\eta(0)=p,
\qquad
\dot\eta(0)=Tv
$

が存在します。

ここで

$
\widetilde\gamma(s)
=
\eta\left(\frac{s}{T}\right),
\qquad
0\le s\le T
$

と置きます。

[GEO14 のアフィン再パラメータ化](../GEO14/index.md#prop-geo14-affine-reparam)により $\widetilde\gamma$ は測地線で、

$
\widetilde\gamma(0)=p,
\qquad
\dot{\widetilde\gamma}(0)=v
$

です。

測地線の初期値一意性により、異なる $T$ から作ったこれらの測地線は重なる区間で一致します。

従って初期条件 $(p,v)$ の測地線を正方向へ任意の有限時刻まで延長できます。

負方向は初期速度 $-v$ に同じ議論を適用します。

よって最大測地線は $\mathbb R$ 全体で定義されます。$\square$
<!-- proof-end -->

---

## 2. 最短測地線は「測地線」より強い

<a id="def-geo15-minimizing-geodesic"></a>
<!-- formal-statement-start -->
> **定義（最短測地線）**  
> 点 $p,q\in M$ を結ぶ区分的 $C^1$ 曲線
>
$$
\gamma:[a,b]\to M
$$
>
> が測地線であり、さらに
>
$$
\boxed{
L(\gamma)=d(p,q)
}
$$
>
> を満たすとき、$\gamma$ を $p$ と $q$ を結ぶ **最短測地線**という。
<!-- formal-statement-end -->

<!-- definition-example-start: def-geo15-minimizing-geodesic -->
**定義の確認**

Euclid 空間で

$$
\gamma(t)=(1-t)p+tq,
\qquad
0\le t\le1
$$

とすると、$\gamma$ は直線なので測地線です。

長さは

$$
L(\gamma)=|q-p|.
$$

Euclid 距離も

$$
d(p,q)=|q-p|
$$

なので、この線分は最短測地線です。

ただし測地線なら常に最短とは限りません。たとえば円周上を一周以上進む一定速曲線は測地線ですが、二点間の短い弧より長くなります。
<!-- definition-example-end -->

ここで重要な注意があります。

「任意の二点が最短測地線で結べる」だけでは、完備性は従いません。

開 Euclid 球

$$
B_1(0)\subset\mathbb R^n
$$

では任意の二点を線分で結べ、その線分は球の凸性により球内に留まり最短です。

しかし境界へ向かう Cauchy 列は球内に極限を持たず、放射測地線も有限時間で境界へ到達します。

したがって、最短測地線の存在は Hopf--Rinow の **結論**ですが、それ単独を完備性と同値条件に加えてはいけません。

---

## 3. 距離完備なら有限時刻で測地線は途切れない

まず二つの完備性のうち、比較的直接な向きを証明します。

<a id="thm-geo15-metric-implies-geodesic"></a>
<!-- formal-statement-start -->
> **定理（距離完備なら測地完備）**  
> 連結 Riemann 多様体 $(M,g)$ が Riemann 距離 $d$ に関して完備なら、$(M,g)$ は測地完備である。
<!-- formal-statement-end -->

### 証明の見取り図

最大測地線が有限時刻 $b$ で終わると仮定します。

測地線は一定速なので、

$$
d(\gamma(s),\gamma(t))
\le
L(\gamma|_{[s,t]})
=
c|t-s|
$$

です。

したがって $t\uparrow b$ で $\gamma(t)$ は Cauchy になり、距離完備性から点 $p\in M$ へ収束します。

残る問題は速度です。

位置だけでなく速度も有限極限を持つことを局所座標で確認すれば、測地線方程式の初期値問題を時刻 $b$ から再開できます。

<!-- proof-start -->
### 証明

反対に、ある最大測地線

$$
\gamma:(a,b)\to M
$$

の右端が有限

$$
b<\infty
$$

であるとします。

[GEO14 の測地線の一定速性](../GEO14/index.md#prop-geo14-constant-speed)から、ある $c\ge0$ が存在して

$$
|\dot\gamma(t)|_g=c
$$

です。

$s<t<b$ に対し、

$$
d(\gamma(s),\gamma(t))
\le
L(\gamma|_{[s,t]})
=
c(t-s).
$$

従って $t\uparrow b$ で $\gamma(t)$ は Cauchy です。

距離完備性から、ある $p\in M$ が存在して

$$
\gamma(t)\to p
\qquad
(t\uparrow b).
$$

$p$ を含む座標近傍を取り、その内部に閉包が座標近傍へ含まれる小さい座標球 $K$ を取ります。

$\gamma(t)\to p$ なので、ある $t_0<b$ が存在して

$$
\gamma([t_0,b))\subset K
$$

です。

座標を

$$
x(t)=\bigl(x^1(t),\dots,x^n(t)\bigr)
$$

と書きます。

$K$ はコンパクトで、計量係数は連続な正定値行列です。したがってある定数 $m>0$ が存在して、$K$ 上の任意の座標ベクトル $\xi$ に対して

$$
g_x(\xi,\xi)
\ge
m|\xi|_{\mathrm E}^2
$$

が成り立ちます。

よって

$$
c^2
=
g_{\gamma(t)}(\dot\gamma,\dot\gamma)
\ge
m|\dot x(t)|_{\mathrm E}^2,
$$

したがって

$$
|\dot x(t)|_{\mathrm E}
\le
\frac{c}{\sqrt m}.
$$

また Christoffel 係数は $K$ 上で有界です。

測地線方程式

$$
\ddot x^k
=
-\Gamma^k_{ij}(x)\dot x^i\dot x^j
$$

へ $\dot x$ の有界性を代入すると、ある $C>0$ が存在して

$$
|\ddot x(t)|_{\mathrm E}\le C
$$

が $t_0\le t<b$ で成り立ちます。

従って

$$
|\dot x(t)-\dot x(s)|
\le
C|t-s|.
$$

つまり $\dot x(t)$ も $t\uparrow b$ で Cauchy になり、ある $v\in\mathbb R^n$ へ収束します。

したがって状態

$$
(x(t),\dot x(t))
$$

は

$$
(x(p),v)
$$

へ収束します。

測地線方程式は滑らかな一次自律系へ書き換えられるので、[測地線の局所存在・一意性](../GEO14/index.md#thm-geo14-geodesic-existence)を時刻 $b$、初期状態 $(p,v)$ に適用できます。

これにより $b$ の後まで測地線を延長できます。

$t<b$ 側では元の測地線と同じ極限状態を持ち、局所一意性から重なる区間で一致するので、最大性に反します。

従って有限な右端 $b$ は存在しません。

左端についても時間を反転して同じ議論を適用できます。

よって任意の最大測地線は全実数上で定義され、$(M,g)$ は測地完備です。$\square$
<!-- proof-end -->

### 仮定はどこで使ったか

距離完備性は

$$
\gamma(t)\to p\in M
$$

を保証する一点に使いました。

その後の速度極限は、

- 有限次元の局所座標
- 計量の正定値性
- Christoffel 係数の局所有界性

から得ています。

つまり「Cauchy だから位置に極限がある」だけでは ODE を再開できません。状態 $(x,\dot x)$ まで有限極限を持つことを確認して初めて延長できます。

---

## 4. 小さい球面上に「距離をちょうど減らす点」がある

逆向きの証明では、局所正規近傍から大域的な最短測地線を組み立てます。

そのための局所補題を先に証明します。

<a id="lem-geo15-distance-drop"></a>
<!-- formal-statement-start -->
> **補題（小さい正規球面上の距離減少点）**  
> $x,q\in M$、$x\ne q$ とし、
>
$$
R=d(x,q)>0
$$
>
> とする。
>
> $x$ を中心とする正規球
>
$$
U=\exp_x(B_\rho(0))
$$
>
> を取り、
>
$$
0<\delta<\min\{\rho,R\}
$$
>
> とする。
>
> このとき、ある $y\in M$ が存在して
>
$$
\boxed{
d(x,y)=\delta,
\qquad
d(y,q)=R-\delta
}
$$
>
> を満たす。
<!-- formal-statement-end -->

<!-- proof-start -->
### 証明

Riemann 距離の定義から、各 $n$ について $x$ から $q$ へ至る区分的 $C^1$ 曲線 $\alpha_n$ を

$$
L(\alpha_n)<R+\frac1n
$$

となるように取れます。

$\alpha_n$ は $x$ から出発し、終点 $q$ は $d(x,q)=R>\delta$ を満たします。

距離関数

$$
t\longmapsto d(x,\alpha_n(t))
$$

は連続なので、$\alpha_n$ は最初に距離 $\delta$ の球面へ到達します。

その最初の点を $y_n$ とします。

正規球では [GEO14 の距離公式](../GEO14/index.md#cor-geo14-normal-distance)により

$$
\{z:d(x,z)=\delta\}
=
\exp_x\{v\in T_xM:|v|=\delta\}.
$$

右辺の接空間の球面は有限次元 Euclid 空間でコンパクトです。

指数写像は連続なので、この正規球面もコンパクトです。

したがって部分列を取り直して

$$
y_n\to y
$$

とできます。

各 $\alpha_n$ について、$x$ から $y_n$ までの部分曲線の長さは少なくとも $\delta$ です。

残りの部分の長さは少なくとも $d(y_n,q)$ です。

従って

$$
R+\frac1n
>
L(\alpha_n)
\ge
\delta+d(y_n,q).
$$

$n\to\infty$ とすると距離の連続性から

$$
d(y,q)\le R-\delta.
$$

一方、三角不等式より

$$
R=d(x,q)
\le
d(x,y)+d(y,q)
=
\delta+d(y,q).
$$

したがって

$$
d(y,q)\ge R-\delta.
$$

両方を合わせて

$$
d(y,q)=R-\delta.
$$

また $y$ は距離 $\delta$ の球面上にあるので

$$
d(x,y)=\delta.
$$

$\square$
<!-- proof-end -->

この補題ではまだ「$x$ から $q$ への最短曲線」を仮定していません。

距離の定義にある「下限へいくらでも近い曲線」と、正規球面のコンパクト性だけを使っています。

---

## 5. 最短曲線は角を持てない

次の補題が、局所的に選んだ方向を一つの測地線へつなぎます。

<a id="lem-geo15-no-corner"></a>
<!-- formal-statement-start -->
> **補題（最短な区分的測地線に角はない）**  
> 区分的 $C^1$ 曲線 $\sigma$ が、ある点 $x$ の前後で二本の測地線片からなり、全体として両端間の距離を実現しているとする。
>
> このとき $x$ における左速度と右速度は、向きをそろえた同一直線上にある。
>
> 特に両側を単位速に取れば
>
$$
\dot\sigma(x-)=\dot\sigma(x+).
$$
<!-- formal-statement-end -->

<!-- proof-start -->
### 証明

左速度と右速度の向きが異なると仮定します。

$x$ の凸正規近傍 $U$ を [GEO14](../GEO14/index.md#thm-geo14-convex-normal-existence)から取ります。

$x$ の直前と直後に、十分近い二点 $a,b\in U$ を選びます。

元の曲線の $a$ から $b$ までの部分は

$$
a\longrightarrow x\longrightarrow b
$$

という二本の測地線片です。

一方、凸正規近傍の定義から $a,b$ は $U$ 内の一意な最短測地線 $\eta$ で結ばれます。

もし元の折れ線も $a,b$ 間で最短なら、一意性によりその像は $\eta$ と一致しなければなりません。

しかし $\eta$ は滑らかな一本の測地線なので、$x$ で異なる左右方向を持つことはできません。

従って折れ線は $a,b$ 間で最短ではなく、

$$
d(a,b)
<
d(a,x)+d(x,b)
$$

です。

元の曲線の $a$ から $b$ の部分を $\eta$ へ置き換えると全体の長さが短くなり、全体が距離を実現するという仮定に反します。

よって角は存在しません。$\square$
<!-- proof-end -->

---

## 6. 一点から指数写像が全域で定義されれば最短測地線が届く

ここが Hopf--Rinow の核心です。

<a id="thm-geo15-total-exp-minimizer"></a>
<!-- formal-statement-start -->
> **定理（全域指数写像から最短測地線を得る）**  
> 連結 Riemann 多様体 $(M,g)$ と点 $p\in M$ を取る。
>
> 指数写像が
>
$$
\exp_p:T_pM\to M
$$
>
> の全域で定義されているとする。
>
> このとき任意の $q\in M$ に対して、ある $v\in T_pM$ が存在して
>
$$
\boxed{
|v|=d(p,q),
\qquad
\exp_p(v)=q
}
$$
>
> を満たす。
>
> 従って
>
$$
\gamma(t)=\exp_p(tv),
\qquad
0\le t\le1
$$
>
> は $p$ と $q$ を結ぶ最短測地線である。
<!-- formal-statement-end -->

### 証明の見取り図

$q\ne p$ とし、

$$
r=d(p,q)
$$

とします。

まず $p$ の小さい正規球面上で、$q$ までの残り距離がちょうどその半径だけ減る点を前節の補題で取ります。

その点への放射方向を $v$ とし、測地線

$$
\gamma(t)=\exp_p(tv)
$$

を全時間へ延長します。

あとは

$$
d(\gamma(t),q)=r-t
$$

という等式が、局所的に次の時刻へ伝播することを示します。

伝播の際、別方向へ折れれば「最短曲線に角はない」補題がその折れを排除します。

<!-- proof-start -->
### 証明

$q=p$ なら $v=0$ でよいので、以下 $q\ne p$ とします。

$$
r=d(p,q)>0
$$

と置きます。

$p$ を中心とする正規球を一つ取り、その半径より小さい

$$
0<\rho<r
$$

を選びます。

[小さい正規球面上の距離減少点](#lem-geo15-distance-drop)を $x=p$、$\delta=\rho$ に適用すると、ある $y$ が存在して

$$
d(p,y)=\rho,
$$

$$
d(y,q)=r-\rho
$$

を満たします。

正規球内では $y$ は一意に

$$
y=\exp_p(\rho u)
$$

と書けます。ただし

$$
u\in T_pM,
\qquad
|u|=1.
$$

仮定により $\exp_p$ は全接空間上で定義されるので

$$
\gamma(t)=\exp_p(tu),
\qquad
t\ge0
$$

を考えられます。

集合

$$
A
=
\left\{
t\in[\rho,r]:
d(\gamma(t),q)=r-t
\right\}
$$

を定めます。

上の $y=\gamma(\rho)$ により

$$
\rho\in A.
$$

距離関数と $\gamma$ は連続なので $A$ は閉です。

次に $t\in A$、$t<r$ とします。

$$
x=\gamma(t),
\qquad
R=d(x,q)=r-t
$$

と置きます。

まず

$$
d(p,x)=t
$$

を確認します。

実際、$\gamma|_{[0,t]}$ は単位速なので

$$
d(p,x)\le t.
$$

一方、

$$
r=d(p,q)
\le
d(p,x)+d(x,q)
\le
t+(r-t)
=
r.
$$

従って全て等号で、

$$
d(p,x)=t.
$$

つまり $\gamma|_{[0,t]}$ は $p$ から $x$ への最短測地線です。

$x$ の正規球の半径より小さく、かつ $R$ より小さい $\delta>0$ を取ります。

再び [小さい正規球面上の距離減少点](#lem-geo15-distance-drop)を $x,q$ に適用すると、ある $z$ が存在して

$$
d(x,z)=\delta,
$$

$$
d(z,q)=R-\delta
$$

を満たします。

$x$ から $z$ への正規球内の放射測地線を $\eta$ とします。

その長さは $\delta$ です。

したがって、$\gamma|_{[0,t]}$ と $\eta$ をつないだ区分的測地線の長さは

$$
t+\delta.
$$

一方、三角不等式から

$$
r
=
d(p,q)
\le
d(p,z)+d(z,q)
\le
(t+\delta)+(R-\delta)
=
t+R
=
r.
$$

従って全て等号で

$$
d(p,z)=t+\delta.
$$

よって

$$
p
\longrightarrow
x
\longrightarrow
z
$$

という区分的測地線は $p$ と $z$ の距離を実現します。

[最短な区分的測地線に角はない](#lem-geo15-no-corner)ので、$\eta$ の初速度は $\gamma$ の前向き速度と一致します。

測地線の初期値一意性から

$$
z=\gamma(t+\delta).
$$

したがって

$$
d(\gamma(t+\delta),q)
=
R-\delta
=
r-(t+\delta).
$$

さらに $0\le s\le\delta$ とします。

単位速測地線より

$$
d(\gamma(t+s),z)\le\delta-s.
$$

したがって

$$
d(\gamma(t+s),q)
\le
d(\gamma(t+s),z)+d(z,q)
\le
(\delta-s)+(R-\delta)
=
R-s.
$$

逆向きは

$$
R=d(x,q)
\le
d(x,\gamma(t+s))
+
d(\gamma(t+s),q)
\le
s+d(\gamma(t+s),q)
$$

から

$$
d(\gamma(t+s),q)\ge R-s.
$$

従って

$$
d(\gamma(t+s),q)=R-s
=
r-(t+s).
$$

よって

$$
[t,t+\delta]\cap[\rho,r]
\subset A.
$$

つまり $A$ は各点から右へ局所的に延長できます。

$A$ は非空閉集合なので

$$
T=\sup A
$$

を取れます。

もし $T<r$ なら、閉性から $T\in A$ であり、上の局所延長により $T$ より大きい点も $A$ に入ります。これは上限性に反します。

従って

$$
T=r.
$$

閉性から

$$
r\in A.
$$

よって

$$
d(\gamma(r),q)=0,
$$

すなわち

$$
\gamma(r)=q.
$$

ここで

$$
v=ru
$$

と置けば

$$
|v|=r=d(p,q),
$$

$$
\exp_p(v)=q.
$$

また $\gamma|_{[0,r]}$ は単位速で長さ $r$ なので最短です。$\square$
<!-- proof-end -->

この証明で大域性を与えた仮定はただ一つ、

$$
\exp_p
$$

が全ての長さの初期速度に対して定義できることです。

一方、方向の選択と延長には、GEO14 の正規球・凸正規近傍という局所理論しか使っていません。

---

## 7. 全域指数写像から閉球のコンパクト性へ

前節で最短測地線が存在すると、閉距離球は接空間の閉球そのものから得られます。

<a id="prop-geo15-closed-ball-exp-image"></a>
<!-- formal-statement-start -->
> **命題（閉距離球は接空間の閉球の指数像）**  
> 点 $p\in M$ で
>
$$
\exp_p:T_pM\to M
$$
>
> が全域定義されているとする。
>
> このとき任意の $R\ge0$ について
>
$$
\boxed{
\overline B_R(p)
=
\exp_p
\left(
\{v\in T_pM:|v|\le R\}
\right)
}
$$
>
> が成り立つ。
>
> 特に $\overline B_R(p)$ はコンパクトである。
<!-- formal-statement-end -->

<!-- proof-start -->
### 証明

まず

$$
|v|\le R
$$

とします。

放射測地線

$$
t\longmapsto\exp_p(tv),
\qquad
0\le t\le1
$$

の長さは $|v|$ なので

$$
d(p,\exp_p(v))
\le
|v|
\le
R.
$$

従って

$$
\exp_p
\left(
\{|v|\le R\}
\right)
\subset
\overline B_R(p).
$$

逆に

$$
q\in\overline B_R(p)
$$

とします。

[全域指数写像から最短測地線を得る定理](#thm-geo15-total-exp-minimizer)から、ある $v\in T_pM$ が存在して

$$
q=\exp_p(v),
$$

$$
|v|=d(p,q)\le R.
$$

従って逆包含も成立します。

以上から

$$
\overline B_R(p)
=
\exp_p
\left(
\{|v|\le R\}
\right).
$$

$T_pM$ は有限次元 Euclid 空間と線形同型です。

従って閉球

$$
\{v:|v|\le R\}
$$

は Heine--Borel によりコンパクトです。

指数写像は連続なので、その連続像である $\overline B_R(p)$ もコンパクトです。$\square$
<!-- proof-end -->

有限次元性はここで本質的です。

無限次元 Hilbert 空間では閉有界球は一般にコンパクトではありません。Hopf--Rinow が有限次元 Riemann 多様体の定理である理由の一つが、まさにこの段階に現れます。

---

## 8. 閉球のコンパクト性から距離完備性へ戻る

<a id="prop-geo15-closed-bounded-compact-complete"></a>
<!-- formal-statement-start -->
> **命題（閉有界集合がコンパクトなら距離完備）**  
> Riemann 距離 $d$ について、全ての閉有界集合がコンパクトであるとする。
>
> このとき $(M,d)$ は完備である。
<!-- formal-statement-end -->

<!-- proof-start -->
### 証明

$(p_n)$ を Cauchy 列とします。

Cauchy 列は有界なので、ある $p\in M$ と $R>0$ が存在して

$$
p_n\in\overline B_R(p)
$$

が全ての $n$ で成り立ちます。

仮定から $\overline B_R(p)$ はコンパクトです。

距離空間ではコンパクト性と点列コンパクト性が同値なので、部分列

$$
p_{n_k}\to q
$$

を取れます。

元の列が Cauchy であることから、任意の $\varepsilon>0$ に対し十分大きい $N$ で

$$
d(p_n,p_m)<\frac\varepsilon2
\qquad
(n,m\ge N)
$$

です。

さらに $k$ を十分大きく取って

$$
n_k\ge N,
\qquad
d(p_{n_k},q)<\frac\varepsilon2
$$

とします。

$n\ge N$ なら

$$
d(p_n,q)
\le
d(p_n,p_{n_k})
+
d(p_{n_k},q)
<
\varepsilon.
$$

従って

$$
p_n\to q.
$$

任意の Cauchy 列が収束するので $(M,d)$ は完備です。$\square$
<!-- proof-end -->

---

## 9. Hopf--Rinow の定理

以上をまとめます。

<a id="thm-geo15-hopf-rinow"></a>
<!-- formal-statement-start -->
> **定理（Hopf--Rinow の定理）**  
> $(M,g)$ を連結な有限次元 Riemann 多様体、$d$ をその Riemann 距離とする。
>
> 次の条件は同値である。
>
> 1. $(M,d)$ は完備である。
> 2. $(M,g)$ は測地完備である。
> 3. 任意の $p\in M$ について指数写像
>    $$
>    \exp_p:T_pM\to M
>    $$
>    が全接空間上で定義される。
> 4. ある一点 $p\in M$ について指数写像
>    $$
>    \exp_p:T_pM\to M
>    $$
>    が全接空間上で定義される。
> 5. $M$ の全ての閉有界部分集合はコンパクトである。
>
> これらが成り立つとき、任意の二点 $p,q\in M$ は最短測地線で結ばれる。
<!-- formal-statement-end -->

<!-- proof-start -->
### 証明

各向きを、これまでの結果へ対応させます。

#### 1 ⇒ 2

[距離完備なら測地完備](#thm-geo15-metric-implies-geodesic)で証明済みです。

#### 2 ⇒ 3

測地完備なら全ての初期条件の測地線が時刻1まで存在します。

従って [測地完備性と指数写像の定義域](#prop-geo15-exp-domain-geodesic-complete)から、任意の $p$ で

$$
\mathcal D_p=T_pM.
$$

#### 3 ⇒ 4

任意の点で成り立つなら、もちろんある一点でも成り立ちます。

#### 4 ⇒ 5

ある $p$ で $\exp_p$ が全域定義されているとします。

[閉距離球は接空間の閉球の指数像](#prop-geo15-closed-ball-exp-image)から、任意の $R$ について

$$
\overline B_R(p)
$$

はコンパクトです。

任意の閉有界集合 $A\subset M$ を取ります。

有界性から、ある $R$ が存在して

$$
A\subset\overline B_R(p).
$$

$A$ は $M$ で閉なので、コンパクト空間 $\overline B_R(p)$ の閉部分集合です。

従って $A$ はコンパクトです。

#### 5 ⇒ 1

[閉有界集合がコンパクトなら距離完備](#prop-geo15-closed-bounded-compact-complete)で証明済みです。

以上で 1--5 は全て同値です。

最後に任意の $p,q\in M$ を取ります。

条件3から $\exp_p$ は全接空間上で定義されています。

[全域指数写像から最短測地線を得る定理](#thm-geo15-total-exp-minimizer)により、$p$ と $q$ を結ぶ最短測地線が存在します。$\square$
<!-- proof-end -->

### 同値条件の役割

証明を一本の輪として書くと

$$
\boxed{
\text{距離完備}
\Rightarrow
\text{測地完備}
\Rightarrow
\exp_p\text{ の全域定義}
\Rightarrow
\text{閉有界集合のコンパクト性}
\Rightarrow
\text{距離完備}
}
$$

です。

このうち最短測地線の存在は、

$$
\exp_p\text{ の全域定義}
\Rightarrow
\text{最短測地線の存在}
$$

という枝として証明されました。

先ほどの開球の例が示すように、

$$
\text{任意の二点間に最短測地線が存在}
$$

だけを逆向きへ使うことはできません。

---

## 10. 「閉有界ならコンパクト」は Riemann 幾何では定理になる

一般の距離空間では、閉有界集合がコンパクトとは限りません。

たとえば無限次元 Hilbert 空間の閉単位球は閉かつ有界ですが、ノルム位相でコンパクトではありません。

一方、Hopf--Rinow の仮定を満たす有限次元 Riemann 多様体では、閉有界集合は全てコンパクトです。

<a id="cor-geo15-closed-bounded-compact"></a>
<!-- formal-statement-start -->
> **系（完備 Riemann 多様体の閉有界集合はコンパクト）**  
> 連結な有限次元 Riemann 多様体 $(M,g)$ が距離完備、または同値に測地完備なら、任意の閉有界集合はコンパクトである。
>
> 特に任意の $p\in M$ と $R<\infty$ に対して
>
$$
\overline B_R(p)
$$
>
> はコンパクトである。
<!-- formal-statement-end -->

<!-- proof-start -->
### 証明

Hopf--Rinow の定理の条件1と条件5の同値そのものです。$\square$
<!-- proof-end -->

この性質により、完備 Riemann 多様体では「距離が発散しない点列」をコンパクト性で制御できます。

後続の変分法や比較幾何では、この大域コンパクト性が極限を取るための重要な道具になります。

---

## 11. 典型例と反例

### 11.1 Euclid 空間

$\mathbb R^n$ では

$$
\exp_p(v)=p+v
$$

が全ての $v$ に対して定義されます。

したがって Hopf--Rinow により

- 距離完備
- 測地完備
- 閉有界集合はコンパクト
- 任意の二点は線分で結ばれる

が一度に従います。

もちろん最後の「閉有界ならコンパクト」は Euclid 空間では Heine--Borel そのものです。

### 11.2 球面

半径 $R$ の標準球面 $S^n_R$ はコンパクトです。

Riemann 距離が誘導する位相は多様体位相と一致するので、$S^n_R$ はコンパクト距離空間です。

コンパクト距離空間は完備なので、Hopf--Rinow から球面は測地完備です。

大円は任意の時間まで進められます。

ただし二点間の最短測地線は常に一意とは限りません。

対蹠点では無数の半大円が同じ最短長

$$
\pi R
$$

を持ちます。

### 11.3 開 Euclid 球

$$
B_1(0)\subset\mathbb R^n
$$

に Euclid 計量を制限します。

任意の二点は球内の線分で結ばれ、その線分が最短です。

しかし

$$
p_k=\left(1-\frac1k,0,\dots,0\right)
$$

は Cauchy なのに球内で収束しません。

また

$$
\gamma(t)=tv,
\qquad
|v|=1
$$

は $0\le t<1$ でしか球内にいられません。

従って距離完備でも測地完備でもありません。

この例は「二点間の最短測地線の存在」と「Hopf--Rinow の完備性」を区別するための標準反例です。

### 11.4 穴を一つ開けた平面

$$
M=\mathbb R^2\setminus\{0\}
$$

に Euclid 計量を制限します。

$$
p_k=\left(\frac1k,0\right)
$$

は Cauchy ですが、極限 $0$ は $M$ にありません。

負の $x$ 軸から原点へ向かう直線測地線も有限時間で欠損点へ到達します。

したがって $M$ は不完備です。

「無限遠へ逃げる」だけが不完備性ではありません。有限距離の場所に欠損点がある場合も不完備になります。

---

## 12. 切断点と切断点集合の入口

完備なら、任意の初期速度の測地線は永遠に存在します。

しかし、永遠に **最短**であるとは限りません。

そこで「放射測地線がどこまで距離を実現するか」を測ります。

<a id="def-geo15-cut-time"></a>
<!-- formal-statement-start -->
> **定義（切断時刻 / cut time）**  
> 完備 Riemann 多様体 $(M,g)$、点 $p\in M$、単位ベクトル
>
$$
u\in T_pM,
\qquad
|u|=1
$$
>
> を取る。
>
> 放射測地線
>
$$
\gamma_u(t)=\exp_p(tu),
\qquad
t\ge0
$$
>
> に対し、
>
$$
\boxed{
c_p(u)
=
\sup
\left\{
t>0:
d(p,\gamma_u(s))=s
\text{ for all }0\le s\le t
\right\}
}
$$
>
> を $u$ 方向の **切断時刻（cut time）**という。
>
> 値は $+\infty$ を許す。
<!-- formal-statement-end -->

<!-- definition-example-start: def-geo15-cut-time -->
**定義の確認**

Euclid 空間では

$$
d(p,p+tu)=t
$$

が全ての $t\ge0$ で成立します。

従って

$$
c_p(u)=+\infty.
$$

一方、半径 $R$ の円周 $S^1_R$ では、一方向へ進む弧は対蹠点までの長さ

$$
\pi R
$$

までは最短ですが、その先では逆向きの弧の方が短くなります。

従って

$$
c_p(u)=\pi R.
$$
<!-- definition-example-end -->

<a id="def-geo15-cut-point-locus"></a>
<!-- formal-statement-start -->
> **定義（切断点・切断点集合）**  
> $c_p(u)<\infty$ のとき
>
$$
\exp_p(c_p(u)u)
$$
>
> を $p$ から方向 $u$ に見た **切断点（cut point）**という。
>
> 全ての単位方向について得られる cut point の集合を
>
$$
\operatorname{Cut}(p)
$$
>
> と書き、$p$ の **切断点集合（cut locus）**という。
<!-- formal-statement-end -->

<!-- definition-example-start: def-geo15-cut-point-locus -->
**定義の確認**

半径 $R$ の円周 $S^1_R$ で点 $p$ を固定します。

二つの単位方向のどちらへ進んでも、最初に最短性を失う点は $p$ の対蹠点 $q$ です。

したがって

$$
\operatorname{Cut}(p)=\{q\}.
$$

対蹠点 $q$ へは時計回り・反時計回りの二本の最短測地線があります。

つまり 切断点は「測地線が存在しなくなる点」ではなく、「その放射測地線がそれ以上は大域的最短でなくなる境界」です。
<!-- definition-example-end -->

### 切断点と共役点は同じではない

GEO17 では Jacobi 場と共役点を扱います。

切断点が生じる機構には少なくとも

1. 同じ終点へ複数の最短測地線が到達する。
2. 指数写像の微分が退化し、局所最小性の構造が変わる。

という二つがあります。

円周の対蹠点は第一の機構を最も単純に示します。

本章では切断点集合を「最短性が壊れる場所」として定義するところまでに留め、指数写像の特異性や共役点との精密な関係は GEO17 へ送ります。

---

## 13. Hopf--Rinow が何を保証し、何を保証しないか

完備性から得られるものを整理します。

$$
\begin{array}{c|c}
\text{主張} & \text{完備ならどうなるか}\\ \hline
\text{測地線の存在時間} & \text{全実数まで延長できる}\\
\text{指数写像の定義域} & T_pM\text{ 全体}\\
\text{二点間の最短測地線} & \text{少なくとも1本存在する}\\
\text{閉有界集合} & \text{コンパクト}\\
\text{最短測地線の一意性} & \text{一般には保証しない}\\
\text{指数写像の大域単射性} & \text{一般には保証しない}\\
\text{一本の測地線が永遠に最短} & \text{一般には保証しない}
\end{array}
$$

球面の対蹠点は最後の三つが全て失敗する例です。

Hopf--Rinow は「大域的に行ける」ことを保証しますが、「大域的に一意で平坦な座標が取れる」ことまでは言いません。

---

## 14. 演習

### Level A

<a id="ex-geo15-a01"></a>
#### GEO15-A01 開区間の二つの不完備性
- Level: A

$$
M=(0,1),
\qquad
ds^2=dx^2
$$

を考える。

1. $(1/n)$ が Cauchy 列であることを示せ。
2. $M$ が距離完備でないことを示せ。
3. $\gamma(t)=1/2+t$ が有限時間で $M$ の外へ出ることを示し、測地完備でないことを確認せよ。

<!-- solution-start -->
**解答**

1. Euclid 距離なので
   $$
   d(1/n,1/m)=\left|\frac1n-\frac1m\right|.
   $$
   $n,m\to\infty$ で右辺は0へ行くので $(1/n)$ は Cauchy 列です。

2. $\mathbb R$ では
   $$
   \frac1n\to0
   $$
   ですが、$0\notin(0,1)$ です。
   従って $M$ 内に極限を持たず、距離完備ではありません。

3. Euclid 計量では測地線は直線です。
   $$
   \gamma(t)=\frac12+t
   $$
   は
   $$
   -\frac12<t<\frac12
   $$
   でのみ $(0,1)$ に入ります。
   特に右向きには時刻 $1/2$ で境界へ到達し、その先へ $M$ 内の測地線として延長できません。
   よって測地完備ではありません。
<!-- solution-end -->

<a id="ex-geo15-a02"></a>
#### GEO15-A02 有限時刻へ近づく測地線は Cauchy
- Level: A

$\gamma:[0,b)\to M$ を速さ $c$ の測地線とし、$b<\infty$ とする。

$$
d(\gamma(s),\gamma(t))
\le
c|t-s|
$$

を示し、$t\uparrow b$ で $\gamma(t)$ が Cauchy になることを証明せよ。

<!-- solution-start -->
**解答**

$s<t<b$ とします。

距離は曲線の長さの下限なので

$$
d(\gamma(s),\gamma(t))
\le
L(\gamma|_{[s,t]}).
$$

$\gamma$ の速さは一定で $c$ だから

$$
L(\gamma|_{[s,t]})
=
\int_s^t c\,du
=
c(t-s).
$$

よって

$$
d(\gamma(s),\gamma(t))
\le
c|t-s|.
$$

任意の $\varepsilon>0$ に対し、$s,t$ を十分 $b$ に近づけて

$$
|t-s|<\frac{\varepsilon}{c}
$$

とすれば、$c>0$ の場合

$$
d(\gamma(s),\gamma(t))<\varepsilon.
$$

$c=0$ なら $\gamma$ は定数なので自明です。

従って $\gamma(t)$ は $t\uparrow b$ で Cauchy です。
<!-- solution-end -->

<a id="ex-geo15-a03"></a>
#### GEO15-A03 球面の完備性
- Level: A

半径 $R$ の標準球面 $S^n_R$ が距離完備であることを、コンパクト性から示せ。

その後 Hopf--Rinow を用いて測地完備性を結論せよ。

<!-- solution-start -->
**解答**

$S^n_R$ は $\mathbb R^{n+1}$ の閉有界集合なので Heine--Borel によりコンパクトです。

GEO12 で示したように Riemann 距離は元の多様体位相を誘導するので、$S^n_R$ は Riemann 距離についてもコンパクト距離空間です。

コンパクト距離空間は完備なので、任意の Cauchy 列は球面上で収束します。

従って $S^n_R$ は距離完備です。

Hopf--Rinow の定理から距離完備性と測地完備性は同値なので、$S^n_R$ は測地完備でもあります。
<!-- solution-end -->

<a id="ex-geo15-a04"></a>
#### GEO15-A04 最短測地線の存在だけでは不十分
- Level: A

開 Euclid 球

$$
B_1(0)\subset\mathbb R^n
$$

について、

1. 任意の二点が最短測地線で結ばれることを示せ。
2. それでも距離完備でないことを示せ。
3. なぜ「任意の二点間に最短測地線がある」を Hopf--Rinow の同値条件へ単独で追加できないか説明せよ。

<!-- solution-start -->
**解答**

1. $p,q\in B_1(0)$ とします。
   開球は Euclid 的に凸なので
   $$
   \gamma(t)=(1-t)p+tq
   $$
   は全て $B_1(0)$ 内に入ります。
   これは Euclid 直線だから測地線で、長さは
   $$
   |q-p|=d(p,q).
   $$
   従って最短測地線です。

2. 例えば
   $$
   p_k=\left(1-\frac1k,0,\dots,0\right)
   $$
   は Cauchy 列ですが、$\mathbb R^n$ での極限
   $$
   (1,0,\dots,0)
   $$
   は開球に属しません。
   よって距離完備ではありません。

3. この空間では「任意の二点に最短測地線が存在」は真なのに「距離完備」は偽です。
   従って最短測地線の存在だけから完備性は導けません。
<!-- solution-end -->

### Level B

<a id="ex-geo15-b01"></a>
#### GEO15-B01 距離完備から測地線延長へ
- Level: B

距離完備な Riemann 多様体で、最大測地線

$$
\gamma:[0,b)\to M,
\qquad
b<\infty
$$

が存在すると仮定する。

1. $\gamma(t)$ がある $p\in M$ へ収束することを示せ。
2. $p$ の近くの座標で $\dot x(t)$ が有界であることを示せ。
3. Christoffel 係数の局所有界性から $\ddot x(t)$ が有界であることを示せ。
4. $\dot x(t)$ が極限を持ち、測地線方程式を $t=b$ から再開できることを説明せよ。

<!-- solution-start -->
**解答**

1. GEO15-A02 より
   $$
   d(\gamma(s),\gamma(t))
   \le
   c|t-s|
   $$
   です。
   従って $t\uparrow b$ で $\gamma(t)$ は Cauchy です。
   距離完備性から
   $$
   \gamma(t)\to p\in M.
   $$

2. $p$ の座標近傍内にコンパクトな小領域 $K$ を取り、十分後の $\gamma(t)$ が $K$ 内に入るようにします。
   計量行列の最小固有値は $K$ 上で正の下界 $m$ を持つので
   $$
   g_x(\xi,\xi)\ge m|\xi|_{\mathrm E}^2.
   $$
   測地線の速さを $c$ とすれば
   $$
   c^2
   =
   g(\dot\gamma,\dot\gamma)
   \ge
   m|\dot x|_{\mathrm E}^2.
   $$
   よって
   $$
   |\dot x|_{\mathrm E}\le c/\sqrt m.
   $$

3. $K$ 上で Christoffel 係数は有界です。
   測地線方程式
   $$
   \ddot x^k=-\Gamma^k_{ij}(x)\dot x^i\dot x^j
   $$
   と $\dot x$ の有界性から
   $$
   |\ddot x|_{\mathrm E}\le C
   $$
   となる定数 $C$ が取れます。

4. $\ddot x$ が有界なので
   $$
   |\dot x(t)-\dot x(s)|
   \le C|t-s|.
   $$
   従って $\dot x(t)$ は $t\uparrow b$ で Cauchy となり、ある $v$ へ収束します。
   したがって状態
   $$
   (x(t),\dot x(t))
   \to
   (x(p),v)
   $$
   です。
   測地線方程式の局所存在一意性を初期状態 $(p,v)$ へ適用すれば、$b$ より後まで解を延長できます。
   これは最大性に反します。
<!-- solution-end -->

<a id="ex-geo15-b02"></a>
#### GEO15-B02 閉球を指数写像で表す
- Level: B

ある $p\in M$ について $\exp_p$ が $T_pM$ 全体で定義されているとする。

1. 任意の $v\in T_pM$ に対して
   $$
   d(p,\exp_p(v))\le|v|
   $$
   を示せ。
2. GEO15 の最短測地線存在定理を用いて
   $$
   \overline B_R(p)
   =
   \exp_p\{v:|v|\le R\}
   $$
   を示せ。
3. $\overline B_R(p)$ がコンパクトであることを示せ。

<!-- solution-start -->
**解答**

1. 放射測地線
   $$
   \gamma(t)=\exp_p(tv),
   \qquad
   0\le t\le1
   $$
   は速さ $|v|$ なので
   $$
   L(\gamma)=|v|.
   $$
   距離は曲線の長さの下限だから
   $$
   d(p,\exp_p(v))\le|v|.
   $$

2. 1から
   $$
   \exp_p\{v:|v|\le R\}
   \subset\overline B_R(p).
   $$
   逆に $q\in\overline B_R(p)$ なら、全域指数写像から最短測地線を得る定理より
   $$
   q=\exp_p(v),
   \qquad
   |v|=d(p,q)\le R
   $$
   となる $v$ が存在します。
   よって逆包含も成立します。

3. $T_pM$ は有限次元なので閉球
   $$
   \{v:|v|\le R\}
   $$
   はコンパクトです。
   $\exp_p$ は連続だから、その像 $\overline B_R(p)$ もコンパクトです。
<!-- solution-end -->

<a id="ex-geo15-b03"></a>
#### GEO15-B03 円周の切断点集合
- Level: B

半径 $R$ の円周 $S^1_R$ と点 $p$ を考える。

1. $p$ から単位速で一方向へ進む測地線 $\gamma$ について、
   $$
   d(p,\gamma(t))=t
   $$
   が $0\le t\le\pi R$ で成り立つことを示せ。
2. $t>\pi R$ では同じ弧が最短でなくなることを示せ。
3. $c_p(u)=\pi R$ と $\operatorname{Cut}(p)$ を求めよ。

<!-- solution-start -->
**解答**

1. 円周上の二点間距離は、二つの弧のうち短い方の長さです。
   $0\le t\le\pi R$ では進んだ弧の長さ $t$ は反対向きの弧の長さ
   $$
   2\pi R-t
   $$
   以下です。
   従って
   $$
   d(p,\gamma(t))=t.
   $$

2. $t>\pi R$ なら
   $$
   2\pi R-t<t.
   $$
   したがって反対向きの弧の方が短く、$\gamma|_{[0,t]}$ は最短ではありません。

3. 最短性がちょうど失われ始める時刻は
   $$
   c_p(u)=\pi R.
   $$
   その時刻の点は $p$ の対蹠点 $q$ です。
   二つの単位方向のどちらでも同じ $q$ に到達するので
   $$
   \operatorname{Cut}(p)=\{q\}.
   $$
<!-- solution-end -->

### Level C

<a id="ex-geo15-c01"></a>
#### GEO15-C01 全域指数写像から最短測地線を再構成する
- Level: C

$p\in M$ について

$$
\exp_p:T_pM\to M
$$

が全域定義されているとする。

$q\in M$、$q\ne p$ とし

$$
r=d(p,q)
$$

と置く。

次の手順で $p$ から $q$ への最短測地線の存在を証明せよ。

1. 小さい $\rho>0$ に対して、$d(p,y)=\rho$、$d(y,q)=r-\rho$ を満たす $y$ が存在することを、距離の下限へ近づく曲線列と正規球面のコンパクト性から示せ。
2. $y=\exp_p(\rho u)$、$|u|=1$ と書き、
   $$
   \gamma(t)=\exp_p(tu)
   $$
   と置く。
3.
   $$
   A=\{t\in[\rho,r]:d(\gamma(t),q)=r-t\}
   $$
   が閉で非空であることを示せ。
4. $t\in A$、$t<r$ なら、$t$ より少し先まで $A$ に入ることを、「小さい正規球面上の距離減少点」と「最短な区分的測地線に角はない」ことから示せ。
5. $\sup A=r$ を示し、$\gamma(r)=q$ を結論せよ。

<!-- solution-start -->
**解答**

1. $p$ から $q$ への曲線 $\alpha_n$ を
   $$
   L(\alpha_n)<r+\frac1n
   $$
   と取ります。
   $\alpha_n$ が最初に距離 $\rho$ の正規球面へ到達する点を $y_n$ とします。
   正規球面は接空間の半径 $\rho$ の球面の指数像なのでコンパクトです。
   部分列を取り
   $$
   y_n\to y.
   $$
   初めの部分の長さは少なくとも $\rho$、残りは少なくとも $d(y_n,q)$ だから
   $$
   r+\frac1n
   >
   \rho+d(y_n,q).
   $$
   極限を取ると
   $$
   d(y,q)\le r-\rho.
   $$
   三角不等式
   $$
   r\le d(p,y)+d(y,q)=\rho+d(y,q)
   $$
   と合わせて
   $$
   d(y,q)=r-\rho.
   $$

2. 正規球内の距離公式から
   $$
   y=\exp_p(\rho u),
   \qquad
   |u|=1.
   $$
   仮定により $\exp_p$ は全域定義なので
   $$
   \gamma(t)=\exp_p(tu)
   $$
   は全ての $t\ge0$ で定義できます。

3. 1より
   $$
   d(\gamma(\rho),q)=r-\rho,
   $$
   したがって $\rho\in A$ です。
   また $t\mapsto d(\gamma(t),q)$ は連続なので、等式の成立集合 $A$ は閉です。

4. $t\in A$ とします。
   $x=\gamma(t)$ と置くと
   $$
   d(x,q)=r-t.
   $$
   さらに
   $$
   r
   \le
   d(p,x)+d(x,q)
   \le
   t+(r-t)=r
   $$
   なので
   $$
   d(p,x)=t.
   $$
   従って $\gamma|_{[0,t]}$ は最短です。

   $x$ の小さい正規球面上で
   $$
   d(x,z)=\delta,
   \qquad
   d(z,q)=r-t-\delta
   $$
   を満たす $z$ を1と同じ議論で取ります。

   $x$ から $z$ への短い放射測地線をつなぐと全長は $t+\delta$ です。
   一方
   $$
   r
   \le
   d(p,z)+d(z,q)
   \le
   t+\delta+r-t-\delta
   =
   r.
   $$
   従って折れ線全体が $p$ と $z$ の距離を実現します。

   最短な区分的測地線は角を持てないので、$x$ から $z$ への方向は $\gamma$ の前向き方向と一致します。
   よって
   $$
   z=\gamma(t+\delta).
   $$
   したがって
   $$
   d(\gamma(t+\delta),q)
   =
   r-(t+\delta).
   $$
   同様の三角不等式を途中時刻へ適用すれば、$[t,t+\delta]$ 全体が $A$ に入ります。

5. $T=\sup A$ とします。
   $A$ は閉なので $T\in A$ です。
   もし $T<r$ なら4により $T$ より大きい点も $A$ に入り、上限性に反します。
   従って
   $$
   T=r.
   $$
   したがって
   $$
   r\in A,
   $$
   すなわち
   $$
   d(\gamma(r),q)=0.
   $$
   よって
   $$
   \gamma(r)=q.
   $$
   $\gamma$ は単位速なので長さは $r=d(p,q)$ であり、最短測地線です。
<!-- solution-end -->

---

## 15. 章末チェック

この章を終えた時点で、次を自力で再構成できることを確認してください。

1. 距離完備性と測地完備性が、定義上は全く別の量化を持つこと。
2. 距離完備性から有限端点の測地線を延長するとき、位置だけでなく速度の極限まで必要なこと。
3. 全域指数写像から最短測地線を作る証明で、局所正規球面のコンパクト性がどこに使われるか。
4. 最短な区分的測地線に角がないことが、局所方向を一つの大域測地線へ接続する役割を持つこと。
5. 閉距離球を
   $$
   \exp_p\{v:|v|\le R\}
   $$
   と書くために、最短測地線の存在が必要なこと。
6. Hopf--Rinow の同値条件に「最短測地線の存在だけ」を加えられない理由。
7. 切断点が「測地線の存在終了点」ではなく「大域的最短性の終了点」であること。

---

## 16. 次に進む

Hopf--Rinow により、完備 Riemann 多様体では

$$
\text{局所的な測地線}
\longrightarrow
\text{大域的に延長可能な測地線}
$$

となり、任意の二点間に最短測地線が存在することまで分かりました。

しかし、距離や最短性が大域的にどう歪むかは、まだ計量の二階情報を使っていません。

次の GEO16 では Levi-Civita 接続の交換子から Riemann 曲率を定義し、

- Riemann 曲率テンソル
- その対称性
- Bianchi 恒等式
- 断面曲率
- Ricci 曲率
- スカラー曲率

へ進みます。

その後 GEO17 で変分公式・Jacobi 場・共役点を導入すると、本章で入口だけ定義した切断点集合 と「なぜ測地線が最短でなくなるのか」を、変分の立場からさらに精密に解析できます。
