# LIE1 滑らかな群と単位元の接空間

<!-- definition-example-audit: strict -->

<a id="def-lie1-lie-group"></a>
<!-- formal-statement-start -->
> **定義（Lie 群）**
>
> 群 $G$ が滑らかな多様体でもあり、群の乗法
>
$$
m:G\times G\to G,
\qquad
m(g,h)=gh
$$
>
> と逆元写像
>
$$
\iota:G\to G,
\qquad
\iota(g)=g^{-1}
$$
>
> がともに滑らかであるとき、$G$ を **Lie 群**という。
<!-- formal-statement-end -->

[GRP2](../GRP2/index.md) までで群・準同型・商群を、[GEO5](../GEO5/index.md) までで滑らかなベクトル場・流れ・Lie 括弧を扱いました。本章では、この二つを初めて同じ対象の上へ載せます。

群としては

$$
g,h\mapsto gh
$$

という離散的な代数構造を持ち、多様体としては各点に接空間

$$
T_gG
$$

があります。

この二つが滑らかに両立すると、単位元 $e$ の一つの接空間だけから群全体の左不変な滑らかなベクトル場を復元できます。さらに [GEO5 の Lie 括弧](../GEO5/index.md#def-geo5-lie-bracket)を単位元へ戻すと、$T_eG$ 自身に非可換性を記録する括弧が入ります。

本章の主線は

$$
\text{群の移動}
\longrightarrow
\text{不変ベクトル場}
\longrightarrow
T_eG
\longrightarrow
\text{括弧}
$$

です。

> **この章の停止線**
>
> 本章では群構造と接空間の対応までを閉じます。実数から Lie 群への滑らかな群準同型、単位元の接ベクトルからその曲線を作る対応、共役写像の微分は LIE2、Lie 部分群と古典群の体系的計算は LIE3、Lie 群による滑らかな変換・等質空間・Maurer--Cartan 形式は LIE4 へ送ります。一般表現論、半単純 Lie 環、root system、最高ウェイト理論はさらに後続の独立系列へ送ります。

---

## 1. まず具体例で群演算の滑らかさを確認する

<!-- definition-example-start: def-lie1-lie-group -->
**定義の確認**

### 1.1 加法群 $\mathbb R^n$

$\mathbb R^n$ に通常の加法を入れます。

乗法に相当する写像は

$$
m(x,y)=x+y,
$$

逆元写像は

$$
\iota(x)=-x.
$$

どちらも成分ごとに多項式なので滑らかです。

従って

$$
\boxed{(\mathbb R^n,+)\text{ は Lie 群}}
$$

です。

### 1.2 正の実数の乗法群

$$
G=\mathbb R_{>0}
$$

に通常の乗法を入れます。

$$
m(x,y)=xy,
\qquad
\iota(x)=\frac1x.
$$

$G$ は $\mathbb R$ の開集合で、$xy$ と $1/x$ は $x,y>0$ 上で滑らかです。

従って

$$
\boxed{(\mathbb R_{>0},\times)\text{ は Lie 群}}
$$

です。

この例は多様体としては一次元ですが、加法群 $\mathbb R$ とは群演算が異なります。後で単位元の接方向を群演算に沿って群全体へ運ぶと、この違いが座標係数に現れます。

### 1.3 二次元アフィン群

集合

$$
G_{\mathrm{aff}}
=
\{(a,b)\in\mathbb R^2:a>0\}
$$

に

$$
(a,b)(c,d)
=
(ac,b+ad)
$$

という積を入れます。

これは一次変換

$$
x\longmapsto ax+b
$$

の合成

$$
a(cx+d)+b
=
(ac)x+(ad+b)
$$

に対応します。

単位元は

$$
e=(1,0),
$$

逆元は

$$
(a,b)^{-1}
=
\left(
\frac1a,-\frac ba
\right).
$$

結合律は写像の合成から従いますが、直接計算しても

$$
((a,b)(c,d))(r,s)
=
(acr,b+ad+acs),
$$

$$
(a,b)((c,d)(r,s))
=
(acr,b+a(d+cs))
=
(acr,b+ad+acs)
$$

で一致します。

$G_{\mathrm{aff}}$ は $\mathbb R^2$ の開集合です。積と逆元の各成分は $a,c>0$ 上で滑らかなので

$$
\boxed{G_{\mathrm{aff}}\text{ は Lie 群}}
$$

です。

しかも一般には

$$
(a,b)(c,d)
\ne
(c,d)(a,b).
$$

例えば

$$
(2,0)(1,1)=(2,2),
$$

$$
(1,1)(2,0)=(2,1).
$$

従って、これは本章で最初に現れる非可換な具体例です。
<!-- definition-example-end -->

Lie 群の定義で「乗法だけ滑らか」として逆元の滑らかさを自動的に仮定しない点に注意してください。位相群では通常、乗法と逆元の両方の連続性を要求します。滑らかな場合も同様に、群構造と多様体構造の両立条件を明示します。

---

## 2. 群の各元は多様体上の移動写像を作る

<a id="def-lie1-translations"></a>
<!-- formal-statement-start -->
> **定義（左移動・右移動）**
>
> $G$ を Lie 群、$g\in G$ とする。
>
> 写像
>
$$
L_g:G\to G,
\qquad
L_g(h)=gh
$$
>
> を $g$ による **左移動**といい、
>
$$
R_g:G\to G,
\qquad
R_g(h)=hg
$$
>
> を $g$ による **右移動**という。
<!-- formal-statement-end -->

<!-- definition-example-start: def-lie1-translations -->
**定義の確認**

$G=\mathbb R_{>0}$ では

$$
L_a(x)=ax,
\qquad
R_a(x)=xa.
$$

この群は可換なので両者は同じです。

一方 $G_{\mathrm{aff}}$ では

$$
L_{(a,b)}(c,d)
=
(ac,b+ad),
$$

$$
R_{(a,b)}(c,d)
=
(ca,d+cb).
$$

第二成分が異なり、非可換性がそのまま左移動と右移動の違いとして見えます。
<!-- definition-example-end -->

<a id="prop-lie1-translations-diffeomorphisms"></a>
<!-- formal-statement-start -->
> **命題（左移動・右移動は微分同相写像）**
>
> Lie 群 $G$ の任意の $g\in G$ について、
>
$$
L_g,\ R_g:G\to G
$$
>
> は微分同相写像である。
>
> その逆写像は
>
$$
L_g^{-1}=L_{g^{-1}},
\qquad
R_g^{-1}=R_{g^{-1}}
$$
>
> である。
<!-- formal-statement-end -->

<!-- proof-start -->
### 証明

群の乗法

$$
m:G\times G\to G
$$

は滑らかです。

$g$ を固定すると

$$
L_g(h)=m(g,h)
$$

なので、定数写像 $h\mapsto g$ と恒等写像 $h\mapsto h$ を組み合わせた滑らかな写像

$$
h\longmapsto(g,h)
$$

と $m$ の合成として $L_g$ は滑らかです。

同様に

$$
R_g(h)=m(h,g)
$$

も滑らかです。

群の結合律から

$$
L_{g^{-1}}\circ L_g
=
L_{g^{-1}g}
=
L_e
=
\operatorname{id}_G,
$$

$$
L_g\circ L_{g^{-1}}
=
\operatorname{id}_G.
$$

従って

$$
L_g^{-1}=L_{g^{-1}}.
$$

右移動も同様です。

$L_{g^{-1}}$ と $R_{g^{-1}}$ も滑らかなので、$L_g,R_g$ は微分同相写像です。$\square$
<!-- proof-end -->

この命題により、各 $g$ は接空間の間の線形同型

$$
d(L_g)_h:T_hG\to T_{gh}G,
$$

$$
d(R_g)_h:T_hG\to T_{hg}G
$$

を作ります。

特に単位元 $e$ から見ると

$$
d(L_g)_e:T_eG\to T_gG
$$

は線形同型です。

つまり、Lie 群では **単位元の接方向を左移動だけで任意の点へ運べる**ことになります。

---

## 3. 群演算と相性のよい接方向の割当

<a id="def-lie1-invariant-vector-fields"></a>
<!-- formal-statement-start -->
> **定義（左不変ベクトル場・右不変ベクトル場）**
>
> $G$ を Lie 群、$X$ を $G$ 上の滑らかなベクトル場とする。
>
> 全ての $g\in G$ について
>
$$
(L_g)_*X=X
$$
>
> が成り立つとき、$X$ を **左不変ベクトル場**という。
>
> 同様に、全ての $g\in G$ について
>
$$
(R_g)_*X=X
$$
>
> が成り立つとき、$X$ を **右不変ベクトル場**という。
<!-- formal-statement-end -->

[GEO5 のベクトル場の押し出し](../GEO5/index.md#def-geo5-pushforward-vector-field)を点ごとに書けば、左不変性は

$$
d(L_g)_h(X_h)
=
X_{gh}
\qquad
(g,h\in G)
$$

と同値です。

特に $h=e$ と置くと

$$
X_g
=
d(L_g)_e(X_e).
$$

この式は、左不変ベクトル場が単位元での値だけで決まることをすでに示唆しています。

<!-- definition-example-start: def-lie1-invariant-vector-fields -->
**定義の確認**

### 3.1 $\mathbb R_{>0}$ 上の左不変ベクトル場

$G=\mathbb R_{>0}$ とします。

単位元は $1$ です。

$$
L_a(x)=ax
$$

なので

$$
d(L_a)_x(v)=av.
$$

単位元の接ベクトル

$$
v=c\frac{\partial}{\partial x}\bigg|_{x=1}
$$

を左移動すると

$$
d(L_x)_1(v)
=
cx\frac{\partial}{\partial x}\bigg|_x.
$$

従って

$$
X
=
cx\frac{\partial}{\partial x}
$$

が得られます。

実際、

$$
d(L_a)_x
\left(
cx\frac{\partial}{\partial x}
\right)
=
cax\frac{\partial}{\partial x}\bigg|_{ax}
=
X_{ax}.
$$

よって $X$ は左不変です。

加法群 $\mathbb R$ では左移動 $L_a(x)=a+x$ の微分は恒等写像なので、左不変ベクトル場は

$$
X=c\frac{\partial}{\partial x}
$$

という定係数場になります。

同じ一次元多様体でも、群演算の違いが

$$
c\partial_x
\qquad\text{と}\qquad
cx\partial_x
$$

という違いを生みます。
<!-- definition-example-end -->

---

## 4. 左不変ベクトル場は単位元の接ベクトルと同じ情報である

<a id="thm-lie1-left-invariant-evaluation"></a>
<!-- formal-statement-start -->
> **定理（単位元での値による左不変ベクトル場の特徴付け）**
>
> $G$ を Lie 群、$e$ をその単位元とする。
>
> 左不変ベクトル場全体を
>
$$
\mathfrak X_L(G)
$$
>
> と書く。
>
> 評価写像
>
$$
\operatorname{ev}_e:
\mathfrak X_L(G)\to T_eG,
\qquad
X\mapsto X_e
$$
>
> は実ベクトル空間の線形同型である。
>
> 逆写像は
>
$$
v\in T_eG
\longmapsto
X^v,
\qquad
X^v_g:=d(L_g)_e(v)
$$
>
> で与えられる。
<!-- formal-statement-end -->

### 証明の見取り図

- 左不変性に $h=e$ を代入すれば $X_g=d(L_g)_eX_e$ なので単射です。
- 逆に $v\in T_eG$ から上式で $X^v$ を作り、群の結合律
  $$
  L_a\circ L_g=L_{ag}
  $$
  を微分すれば左不変性が出ます。
- 滑らかさは、群の乗法の微分が座標で滑らかに変化することから確認できます。

<!-- proof-start -->
### 証明

まず $X\in\mathfrak X_L(G)$ とします。

左不変性から任意の $g\in G$ について

$$
d(L_g)_e(X_e)=X_{ge}=X_g.
$$

従って $X_e$ が分かれば全ての $X_g$ が決まります。

よって

$$
\operatorname{ev}_e(X)=0
$$

なら $X=0$ であり、$\operatorname{ev}_e$ は単射です。

次に任意の

$$
v\in T_eG
$$

を取ります。

各 $g\in G$ で

$$
X^v_g
=
d(L_g)_e(v)
$$

と定めます。

これが滑らかなベクトル場であることを確認します。

群の乗法を

$$
m(g,h)=gh
$$

とします。

$L_g(h)=m(g,h)$ なので、

$$
d(L_g)_e(v)
$$

は $m$ の第二変数方向の微分です。

局所座標で $m$ を成分表示すると、その Jacobi 行列の成分は $m$ の一階偏微分です。$m$ は滑らかなので、これらは $g$ に滑らかに依存します。

従って

$$
g\longmapsto d(L_g)_e(v)
$$

は滑らかなベクトル場です。

次に左不変性を示します。

任意の $a,g\in G$ について群の結合律から

$$
L_a\circ L_g=L_{ag}.
$$

[GEO2 の多様体上の連鎖律](../GEO2/index.md#thm-geo2-composition-differential)を使うと

$$
d(L_a)_g\circ d(L_g)_e
=
d(L_{ag})_e.
$$

従って

$$
d(L_a)_g(X^v_g)
=
d(L_a)_g(d(L_g)_e(v))
=
d(L_{ag})_e(v)
=
X^v_{ag}.
$$

これは $X^v$ が左不変であることを意味します。

また

$$
X^v_e
=
d(L_e)_e(v)
=
v
$$

なので、

$$
\operatorname{ev}_e(X^v)=v.
$$

従って $\operatorname{ev}_e$ は全射です。

線形性は各 $d(L_g)_e$ が線形であることから従います。

よって $\operatorname{ev}_e$ は線形同型で、その逆は

$$
v\mapsto X^v
$$

です。$\square$
<!-- proof-end -->

この定理により、有限次元の接空間 $T_eG$ と、見かけ上は無限個の点へ値を割り当てる左不変場の空間 $\mathfrak X_L(G)$ が同じ情報を持つと分かります。

群の移動が、局所データを群全体へ運んでいるからです。

---

## 5. 滑らかな写像に沿って Lie 括弧を運ぶ

LIE1 の核心は、左不変ベクトル場が [GEO5 の Lie 括弧](../GEO5/index.md#def-geo5-lie-bracket)で閉じることです。

その前に、より一般の事実を証明します。

<a id="lem-lie1-related-bracket"></a>
<!-- formal-statement-start -->
> **補題（F-関連性は Lie 括弧で保たれる）**
>
> $F:M\to N$ を滑らかな写像とする。
>
> $M$ 上の滑らかなベクトル場 $X_1,X_2$ と、$N$ 上の滑らかなベクトル場 $Y_1,Y_2$ がそれぞれ
>
$$
X_1\sim_FY_1,
\qquad
X_2\sim_FY_2
$$
>
> であるとする。
>
> このとき
>
$$
[X_1,X_2]
\sim_F
[Y_1,Y_2].
$$
<!-- formal-statement-end -->

ここで $X\sim_FY$ は [GEO5 の $F$-関連](../GEO5/index.md#def-geo5-related-vector-fields)を表します。

<!-- proof-start -->
### 証明

$X\sim_FY$ なら、任意の $f\in C^\infty(N)$ に対して

$$
X(f\circ F)
=
(Yf)\circ F
$$

が成り立ちます。

実際、$p\in M$ で

$$
X_p(f\circ F)
=
df_{F(p)}(dF_pX_p)
=
df_{F(p)}(Y_{F(p)})
=
(Yf)(F(p)).
$$

これを二組へ適用します。

任意の $f\in C^\infty(N)$ に対して

$$
\begin{aligned}
[X_1,X_2](f\circ F)
&=
X_1(X_2(f\circ F))
-
X_2(X_1(f\circ F))\\
&=
X_1((Y_2f)\circ F)
-
X_2((Y_1f)\circ F)\\
&=
(Y_1(Y_2f))\circ F
-
(Y_2(Y_1f))\circ F\\
&=
([Y_1,Y_2]f)\circ F.
\end{aligned}
$$

従って

$$
dF_p([X_1,X_2]_p)
=
[Y_1,Y_2]_{F(p)}
$$

であり、

$$
[X_1,X_2]\sim_F[Y_1,Y_2].
$$

$\square$
<!-- proof-end -->

特に $F$ が微分同相写像なら、

$$
F_*[X_1,X_2]
=
[F_*X_1,F_*X_2]
$$

が従います。

これは Lie 括弧が単なる座標公式ではなく、滑らかな写像と整合する幾何学的構造であることを示しています。

---

## 6. 左不変ベクトル場は括弧を取っても左不変である

<a id="prop-lie1-left-invariant-bracket"></a>
<!-- formal-statement-start -->
> **命題（左不変ベクトル場は Lie 括弧で閉じる）**
>
> $G$ を Lie 群とする。
>
> $X,Y$ が $G$ 上の左不変ベクトル場なら
>
$$
[X,Y]
$$
>
> も左不変ベクトル場である。
<!-- formal-statement-end -->

<!-- proof-start -->
### 証明

任意の $g\in G$ を固定します。

$X,Y$ は左不変なので

$$
(L_g)_*X=X,
\qquad
(L_g)_*Y=Y.
$$

$L_g$ は [左移動・右移動は微分同相写像](#prop-lie1-translations-diffeomorphisms) で示したように微分同相写像です。

[F-関連性は Lie 括弧で保たれる](#lem-lie1-related-bracket) を微分同相写像 $L_g$ に適用すると

$$
(L_g)_*[X,Y]
=
[(L_g)_*X,(L_g)_*Y].
$$

右辺へ左不変性を代入すると

$$
(L_g)_*[X,Y]
=
[X,Y].
$$

これは $[X,Y]$ が左不変であることを意味します。$\square$
<!-- proof-end -->

この閉性により、$\mathfrak X_L(G)$ の中だけで Lie 括弧を取れます。

さらに §4 の同型

$$
\mathfrak X_L(G)\cong T_eG
$$

を使えば、この括弧を単位元の接空間へ移せます。

---

## 7. 接空間へ移すべき代数構造を先に定義する

<a id="def-lie1-lie-algebra"></a>
<!-- formal-statement-start -->
> **定義（実 Lie 環）**
>
> 実ベクトル空間 $\mathfrak g$ に双線形写像
>
$$
[\ ,\ ]:
\mathfrak g\times\mathfrak g
\to
\mathfrak g
$$
>
> が与えられているとする。
>
> 全ての $X,Y,Z\in\mathfrak g$ に対して
>
> 1. 反対称性
>
$$
[X,Y]=-[Y,X],
$$
>
> 2. Jacobi 恒等式
>
$$
[X,[Y,Z]]
+
[Y,[Z,X]]
+
[Z,[X,Y]]
=
0
$$
>
> が成り立つとき、$(\mathfrak g,[\ ,\ ])$ を **実 Lie 環**という。
<!-- formal-statement-end -->

本系列では「Lie 代数」も同じ意味の語として扱いますが、本文主表記は計画正本に合わせて「Lie 環」とします。

<!-- definition-example-start: def-lie1-lie-algebra -->
**定義の確認**

### 7.1 零括弧を持つベクトル空間

任意の実ベクトル空間 $V$ に

$$
[u,v]=0
\qquad
(u,v\in V)
$$

と定めます。

双線形性は明らかで、

$$
[u,v]=0=-0=-[v,u].
$$

また

$$
[u,[v,w]]
+
[v,[w,u]]
+
[w,[u,v]]
=
0.
$$

従って

$$
\boxed{V\text{ は Lie 環}}
$$

です。

このように括弧が恒等的に0である Lie 環を可換な Lie 環と呼びます。

加法 Lie 群 $\mathbb R^n$ から後で得られる構造がちょうどこの例になります。
<!-- definition-example-end -->

[GEO5 の Lie 括弧の基本恒等式](../GEO5/index.md#thm-geo5-bracket-identities)では、滑らかなベクトル場の括弧が双線形・反対称で Jacobi 恒等式を満たすことをすでに証明しています。

したがって、左不変ベクトル場の空間 $\mathfrak X_L(G)$ はその括弧に関して実 Lie 環です。

---

## 8. Lie 群の無限小構造を単位元へ集約する

<a id="def-lie1-group-lie-algebra"></a>
<!-- formal-statement-start -->
> **定義（Lie 群の Lie 環）**
>
> $G$ を Lie 群、$e$ を単位元とする。
>
> $u,v\in T_eG$ に対して、対応する左不変ベクトル場を
>
$$
X^u_g=d(L_g)_e(u),
\qquad
X^v_g=d(L_g)_e(v)
$$
>
> とする。
>
> $T_eG$ 上の括弧を
>
$$
[u,v]_{\mathfrak g}
:=
[X^u,X^v]_e
$$
>
> で定める。
>
> この括弧を備えた
>
$$
\mathfrak g:=T_eG
$$
>
> を $G$ の **Lie 環**と書く。
<!-- formal-statement-end -->

<!-- definition-example-start: def-lie1-group-lie-algebra -->
**定義の確認**

### 8.1 加法 Lie 群 $\mathbb R^n$

$G=(\mathbb R^n,+)$ では

$$
L_a(x)=a+x
$$

なので

$$
d(L_a)_0=\operatorname{id}_{\mathbb R^n}.
$$

従って $u\in T_0\mathbb R^n\cong\mathbb R^n$ に対応する左不変ベクトル場は係数が定数の滑らかなベクトル場

$$
X^u_x=u.
$$

二つの係数が定数の滑らかなベクトル場の係数は全て定数なので、[GEO5 の座標公式](../GEO5/index.md#thm-geo5-bracket-coordinate)から

$$
[X^u,X^v]=0.
$$

従って

$$
[u,v]_{\mathfrak g}=0.
$$

よって加法 Lie 群 $\mathbb R^n$ の Lie 環は

$$
\boxed{\mathbb R^n\text{ に零括弧を入れたもの}}
$$

です。
<!-- definition-example-end -->

<a id="thm-lie1-tangent-lie-algebra"></a>
<!-- formal-statement-start -->
> **定理（単位元の接空間の Lie 環構造）**
>
> 上の括弧
>
$$
[u,v]_{\mathfrak g}
=
[X^u,X^v]_e
$$
>
> は $T_eG$ 上で双線形・反対称で Jacobi 恒等式を満たす。
>
> 従って $T_eG$ は実 Lie 環である。
>
> さらに評価同型
>
$$
\operatorname{ev}_e:
\mathfrak X_L(G)\to T_eG
$$
>
> は Lie 環同型である。
<!-- formal-statement-end -->

<!-- proof-start -->
### 証明

[単位元での値による左不変ベクトル場の特徴付け](#thm-lie1-left-invariant-evaluation)から

$$
u\longmapsto X^u
$$

は線形です。

従って

$$
\begin{aligned}
[au_1+bu_2,v]_{\mathfrak g}
&=
[X^{au_1+bu_2},X^v]_e\\
&=
[aX^{u_1}+bX^{u_2},X^v]_e\\
&=
a[u_1,v]_{\mathfrak g}
+
b[u_2,v]_{\mathfrak g}.
\end{aligned}
$$

第二変数についても同様なので双線形です。

反対称性は [GEO5 の Lie 括弧の基本恒等式](../GEO5/index.md#thm-geo5-bracket-identities)から

$$
[u,v]_{\mathfrak g}
=
[X^u,X^v]_e
=
-[X^v,X^u]_e
=
-[v,u]_{\mathfrak g}.
$$

Jacobi 恒等式も同じ定理を左不変ベクトル場

$$
X^u,\ X^v,\ X^w
$$

へ適用し、単位元で評価すれば

$$
[u,[v,w]_{\mathfrak g}]_{\mathfrak g}
+
[v,[w,u]_{\mathfrak g}]_{\mathfrak g}
+
[w,[u,v]_{\mathfrak g}]_{\mathfrak g}
=
0
$$

を得ます。

ここで [左不変ベクトル場は Lie 括弧で閉じる](#prop-lie1-left-invariant-bracket) ため、

$$
[X^v,X^w]
$$

も左不変で、その単位元での値は

$$
[v,w]_{\mathfrak g}.
$$

したがって上の Jacobi 式は確かに $T_eG$ の中で閉じています。

最後に定義そのものから

$$
\operatorname{ev}_e([X^u,X^v])
=
[X^u,X^v]_e
=
[u,v]_{\mathfrak g}.
$$

従って $\operatorname{ev}_e$ は括弧を保ちます。

§4 で線形同型であることはすでに示したので、Lie 環同型です。$\square$
<!-- proof-end -->

この定理が LIE1 の中心です。

Lie 群は一般には非線形な多様体ですが、その非可換性の一次近似は有限次元ベクトル空間

$$
T_eG
$$

上の双線形演算へ圧縮されます。

ただし、ここで「Lie 環が分かれば Lie 群が完全に分かる」とはまだ言えません。大域的な位相は接空間だけでは失われます。

LIE2 では実数から Lie 群への滑らかな群準同型と、単位元接ベクトルからその曲線を作る対応を通じて、この無限小構造から群の局所構造を読みます。

---

## 9. 非可換例：二次元アフィン群の括弧

$G_{\mathrm{aff}}$ を §1.3 の群とします。

$$
G_{\mathrm{aff}}
=
\{(a,b):a>0\},
$$

$$
(a,b)(c,d)
=
(ac,b+ad).
$$

単位元は

$$
e=(1,0).
$$

接空間は開集合の接空間なので

$$
T_eG_{\mathrm{aff}}
\cong
\mathbb R^2.
$$

基底

$$
H=(1,0),
\qquad
E=(0,1)
$$

を取ります。

左移動は

$$
L_{(a,b)}(c,d)
=
(ac,b+ad).
$$

$(c,d)=(1,0)$ で微分すると

$$
d(L_{(a,b)})_e(u,v)
=
(au,av).
$$

従って $H,E$ に対応する左不変ベクトル場は

$$
X^H
=
a\frac{\partial}{\partial a},
$$

$$
X^E
=
a\frac{\partial}{\partial b}.
$$

[GEO5 の Lie 括弧の座標公式](../GEO5/index.md#thm-geo5-bracket-coordinate)から

$$
\begin{aligned}
[X^H,X^E]
&=
\left[
a\frac{\partial}{\partial a},
a\frac{\partial}{\partial b}
\right]\\
&=
a\frac{\partial a}{\partial a}
\frac{\partial}{\partial b}
-
a\frac{\partial a}{\partial b}
\frac{\partial}{\partial a}\\
&=
a\frac{\partial}{\partial b}\\
&=
X^E.
\end{aligned}
$$

従って単位元で

$$
\boxed{
[H,E]_{\mathfrak g}
=
E
}.
$$

この括弧は0ではありません。

したがって

$$
\boxed{
\mathfrak g_{\mathrm{aff}}
\text{ は非可換な二次元 Lie 環}
}
$$

です。

群の非可換性

$$
(a,b)(c,d)\ne(c,d)(a,b)
$$

が、接空間では

$$
[H,E]=E
$$

という双線形な一次構造になりました。

---

## 10. 群準同型を微分すると括弧を保つ線形写像になる

<a id="def-lie1-homomorphisms"></a>
<!-- formal-statement-start -->
> **定義（Lie 群準同型・Lie 環準同型）**
>
> Lie 群 $G,H$ の間の写像
>
$$
\Phi:G\to H
$$
>
> が群準同型であり、かつ滑らかな写像であるとき、$\Phi$ を **Lie 群準同型**という。
>
> 実 Lie 環 $\mathfrak g,\mathfrak h$ の間の線形写像
>
$$
A:\mathfrak g\to\mathfrak h
$$
>
> が
>
$$
A([u,v]_{\mathfrak g})
=
[A(u),A(v)]_{\mathfrak h}
$$
>
> を全ての $u,v\in\mathfrak g$ について満たすとき、$A$ を **Lie 環準同型**という。
<!-- formal-statement-end -->

<!-- definition-example-start: def-lie1-homomorphisms -->
**定義の確認**

二次元アフィン群から正の実数の乗法群への写像

$$
\Phi:G_{\mathrm{aff}}\to\mathbb R_{>0},
\qquad
\Phi(a,b)=a
$$

を考えます。

$$
\Phi((a,b)(c,d))
=
\Phi(ac,b+ad)
=
ac
$$

であり、

$$
\Phi(a,b)\Phi(c,d)=ac
$$

なので群準同型です。

座標関数 $(a,b)\mapsto a$ は滑らかなので Lie 群準同型です。

単位元での微分は

$$
d\Phi_{(1,0)}(u,v)=u.
$$

アフィン群の基底 $H=(1,0),E=(0,1)$ では

$$
d\Phi_e(H)=1,
\qquad
d\Phi_e(E)=0.
$$

正の実数の乗法群は一次元なのでその Lie 環の括弧は0です。

一方

$$
[H,E]=E
$$

なので

$$
d\Phi_e([H,E])
=
d\Phi_e(E)
=
0
$$

であり、

$$
[d\Phi_e(H),d\Phi_e(E)]
=
[1,0]
=
0.
$$

この具体例では、微分が括弧を保存することを直接確認できます。
<!-- definition-example-end -->

<a id="thm-lie1-homomorphism-differential"></a>
<!-- formal-statement-start -->
> **定理（Lie 群準同型の微分は Lie 環準同型）**
>
> $\Phi:G\to H$ を Lie 群準同型とし、単位元をそれぞれ $e_G,e_H$ とする。
>
> このとき
>
$$
d\Phi_{e_G}:
T_{e_G}G
\to
T_{e_H}H
$$
>
> は Lie 環準同型である。
<!-- formal-statement-end -->

### 証明の見取り図

群準同型性から

$$
\Phi\circ L_g
=
L_{\Phi(g)}\circ\Phi
$$

です。

これを単位元で微分すると、$u\in T_{e_G}G$ に対応する左不変ベクトル場と、$d\Phi_eu$ に対応する左不変ベクトル場が $\Phi$-関連になります。

§5 の補題により、$\Phi$-関連性は Lie 括弧を取っても保たれます。

最後に単位元で評価すれば括弧保存性が出ます。

<!-- proof-start -->
### 証明

$\Phi$ は群準同型なので

$$
\Phi(e_G)=e_H.
$$

任意の $g\in G$ に対して

$$
\Phi(L_g(h))
=
\Phi(gh)
=
\Phi(g)\Phi(h)
=
L_{\Phi(g)}(\Phi(h)).
$$

従って写像として

$$
\Phi\circ L_g
=
L_{\Phi(g)}\circ\Phi.
$$

$h=e_G$ で微分し、[GEO2 の多様体上の連鎖律](../GEO2/index.md#thm-geo2-composition-differential)を使うと

$$
d\Phi_g\circ d(L_g)_{e_G}
=
d(L_{\Phi(g)})_{e_H}\circ d\Phi_{e_G}.
$$

$u\in T_{e_G}G$ を取り、その左不変ベクトル場を

$$
X^u_g=d(L_g)_{e_G}(u)
$$

とします。

また

$$
A=d\Phi_{e_G}
$$

と置き、

$$
Y^{Au}_h
=
d(L_h)_{e_H}(Au)
$$

を $H$ 上の対応する左不変ベクトル場とします。

上の微分関係から

$$
d\Phi_g(X^u_g)
=
Y^{Au}_{\Phi(g)}.
$$

従って

$$
X^u\sim_\Phi Y^{Au}.
$$

同様に $v\in T_{e_G}G$ に対して

$$
X^v\sim_\Phi Y^{Av}.
$$

[補題：F-関連性は Lie 括弧で保たれる](#lem-lie1-related-bracket)から

$$
[X^u,X^v]
\sim_\Phi
[Y^{Au},Y^{Av}].
$$

単位元 $e_G$ でこの関係を評価すると

$$
d\Phi_{e_G}
\left(
[X^u,X^v]_{e_G}
\right)
=
[Y^{Au},Y^{Av}]_{e_H}.
$$

Lie 群の Lie 環の定義から

$$
[X^u,X^v]_{e_G}
=
[u,v]_{\mathfrak g},
$$

$$
[Y^{Au},Y^{Av}]_{e_H}
=
[Au,Av]_{\mathfrak h}.
$$

従って

$$
A([u,v]_{\mathfrak g})
=
[Au,Av]_{\mathfrak h}.
$$

$A=d\Phi_{e_G}$ は微分なので線形です。

よって $A$ は Lie 環準同型です。$\square$
<!-- proof-end -->

この定理は「群の準同型を一次近似すると、Lie 環の準同型になる」という基本原理です。

LIE2 の Ad / ad、LIE3 の古典群の Lie 環計算でも繰り返し使います。

---

## 11. 一般線形群は最重要の具体例である

$n$ 次実正方行列全体を

$$
M_n(\mathbb R)
$$

と書きます。

これは成分を並べれば

$$
M_n(\mathbb R)
\cong
\mathbb R^{n^2}
$$

という実ベクトル空間です。

<a id="prop-lie1-general-linear-group"></a>
<!-- formal-statement-start -->
> **命題（一般線形群は Lie 群）**
>
> 可逆な $n$ 次実正方行列全体
>
$$
GL(n,\mathbb R)
=
\{A\in M_n(\mathbb R):\det A\ne0\}
$$
>
> は $M_n(\mathbb R)\cong\mathbb R^{n^2}$ の開部分多様体であり、行列積を群演算とする Lie 群である。
<!-- formal-statement-end -->

### 証明の見取り図

- 行列式は成分の多項式なので連続。
- $\mathbb R\setminus\{0\}$ は開集合なので、その逆像 $GL(n,\mathbb R)$ は開。
- 行列積の各成分は成分の多項式。
- 逆行列は
  $$
  A^{-1}=\frac{\operatorname{adj}(A)}{\det A}
  $$
  で、分母は $GL(n,\mathbb R)$ 上で0にならない。

<!-- proof-start -->
### 証明

行列式

$$
\det:M_n(\mathbb R)\to\mathbb R
$$

は行列成分の多項式です。従って連続です。

$$
GL(n,\mathbb R)
=
\det^{-1}(\mathbb R\setminus\{0\}).
$$

$\mathbb R\setminus\{0\}$ は開集合なので、$GL(n,\mathbb R)$ は $M_n(\mathbb R)$ の開集合です。

従って $GL(n,\mathbb R)$ は $n^2$ 次元の滑らかな多様体です。

行列積

$$
m(A,B)=AB
$$

の $(i,j)$ 成分は

$$
(AB)_{ij}
=
\sum_{k=1}^nA_{ik}B_{kj},
$$

したがって成分の多項式であり、$m$ は滑らかです。

逆行列については

$$
A^{-1}
=
\frac{\operatorname{adj}(A)}{\det A}.
$$

$\operatorname{adj}(A)$ の各成分は余因子、すなわち行列成分の多項式です。

また $GL(n,\mathbb R)$ 上では

$$
\det A\ne0.
$$

従って各成分は

$$
\frac{\text{多項式}}{\det A}
$$

という形の滑らかな関数です。

よって逆元写像

$$
A\mapsto A^{-1}
$$

は滑らかです。

以上から

$$
\boxed{GL(n,\mathbb R)\text{ は Lie 群}}
$$

です。$\square$
<!-- proof-end -->

単位元は単位行列

$$
I
$$

です。

$GL(n,\mathbb R)$ は $M_n(\mathbb R)$ の開集合なので

$$
T_IGL(n,\mathbb R)
\cong
M_n(\mathbb R).
$$

この接空間に入る括弧を次に計算します。

---

## 12. 一般線形群の Lie 環で括弧を計算する

慣例として

$$
\mathfrak{gl}(n,\mathbb R)
:=
T_IGL(n,\mathbb R)
\cong
M_n(\mathbb R)
$$

と書きます。

<a id="thm-lie1-gln-bracket"></a>
<!-- formal-statement-start -->
> **定理（全行列 Lie 環の Lie 括弧）**
>
> $A,B\in M_n(\mathbb R)\cong T_IGL(n,\mathbb R)$ とする。
>
> 一般線形群から誘導される Lie 括弧は
>
$$
[A,B]_{\mathfrak{gl}}
=
AB-BA
$$
>
> である。
<!-- formal-statement-end -->

<!-- proof-start -->
### 証明

$g\in GL(n,\mathbb R)$ による左移動は

$$
L_g(h)=gh.
$$

これは行列空間上で $h$ に関して線形なので、任意の接ベクトル $A\in M_n(\mathbb R)$ に対して

$$
d(L_g)_I(A)=gA.
$$

従って $A$ に対応する左不変ベクトル場は

$$
X^A_g=gA.
$$

同様に

$$
X^B_g=gB.
$$

$GL(n,\mathbb R)$ は行列空間の開集合なので、これらを通常の $\mathbb R^{n^2}$ 値の滑らかなベクトル場として微分できます。

写像

$$
X^B:g\mapsto gB
$$

の微分は

$$
d(X^B)_g(H)=HB.
$$

同様に

$$
d(X^A)_g(H)=HA.
$$

[GEO5 の Lie 括弧の座標公式](../GEO5/index.md#thm-geo5-bracket-coordinate)は開集合上では

$$
[X^A,X^B]_g
=
d(X^B)_g(X^A_g)
-
d(X^A)_g(X^B_g)
$$

と書けます。

従って

$$
\begin{aligned}
[X^A,X^B]_g
&=
d(X^B)_g(gA)
-
d(X^A)_g(gB)\\
&=
(gA)B-(gB)A\\
&=
g(AB-BA).
\end{aligned}
$$

単位元 $I$ で評価すると

$$
[A,B]_{\mathfrak{gl}}
=
[X^A,X^B]_I
=
AB-BA.
$$

よって

$$
\boxed{
[A,B]_{\mathfrak{gl}}
=
AB-BA
}.
$$

$\square$
<!-- proof-end -->

### 12.1 行列単位で非可換性を直接見る

$n=2$ とし、

$$
E_{12}
=
\begin{pmatrix}
0&1\\
0&0
\end{pmatrix},
\qquad
E_{21}
=
\begin{pmatrix}
0&0\\
1&0
\end{pmatrix}.
$$

すると

$$
E_{12}E_{21}
=
\begin{pmatrix}
1&0\\
0&0
\end{pmatrix},
$$

$$
E_{21}E_{12}
=
\begin{pmatrix}
0&0\\
0&1
\end{pmatrix}.
$$

従って

$$
[E_{12},E_{21}]
=
\begin{pmatrix}
1&0\\
0&-1
\end{pmatrix}.
$$

群 $GL(2,\mathbb R)$ の非可換性が、単位行列近傍では差 $AB-BA$として現れています。

---

## 13. 左不変と右不変を混同しない

左不変ベクトル場では

$$
X^A_g=gA
$$

となりました。

一方、同じ $A\in T_IGL(n,\mathbb R)$ から右移動で作る右不変ベクトル場は

$$
Y^A_g=Ag
$$

です。

右不変ベクトル場を単位元で同一視して括弧を計算すると

$$
[Y^A,Y^B]_g
=
(BA-AB)g.
$$

従って単位元では

$$
[Y^A,Y^B]_I
=
BA-AB
=
-(AB-BA).
$$

本系列では **左不変ベクトル場を用いる規約**を採用するので、

$$
[A,B]=AB-BA
$$

です。

この符号は約束の違いであり、数学的な矛盾ではありません。以後 LIE2--LIE4 でも左不変規約を固定します。

---

## 14. どこまでが局所情報で、どこからが大域情報か

本章で得た対応は

$$
T_eG
\cong
\mathfrak X_L(G)
$$

です。

これは非常に強力ですが、接空間は単位元近傍の一次情報です。

例えば、異なる大域的形状を持つ Lie 群が同じ Lie 環を持つことがあります。

したがって

$$
\text{Lie 群}
\longmapsto
\text{Lie 環}
$$

は大域情報を全て保持する操作ではありません。

それでも Lie 環が重要なのは、

- 群準同型は微分して Lie 環準同型になる。
- 左不変ベクトル場は単位元の接ベクトルだけで決まる。
- 群の非可換性が双線形な括弧へ圧縮される。
- LIE2 では実数から Lie 群への滑らかな群準同型と、単位元接ベクトルからその曲線を作る対応がこの接空間を群へ戻す。

からです。

離散群では「単位元のすぐ近く」という概念がありません。Lie 群では多様体構造があるため、群論を微分できることが本質です。

---

## 15. 演習

### Level A

#### LIE1-A01 加法群の左不変ベクトル場
- Level: A

$G=(\mathbb R^2,+)$ とする。

1. $L_a(x)=a+x$ の微分を求めよ。
2. $v=(p,q)\in T_0\mathbb R^2$ に対応する左不変ベクトル場 $X^v$ を求めよ。
3. 任意の $u,v\in T_0\mathbb R^2$ について
   $$
   [u,v]=0
   $$
   を示せ。

<!-- solution-start -->
##### 詳細解答

1. $L_a$ は加法群の移動写像です。

任意の $x$ と接ベクトル $w$ に対し

$$
d(L_a)_x(w)=w.
$$

従って

$$
\boxed{d(L_a)_x=\operatorname{id}_{\mathbb R^2}}.
$$

2. 定義から

$$
X^v_x
=
d(L_x)_0(v).
$$

1の結果より

$$
d(L_x)_0(v)=v.
$$

したがって

$$
\boxed{
X^v
=
p\frac{\partial}{\partial x}
+
q\frac{\partial}{\partial y}
}
$$

です。

これは係数が定数の滑らかなベクトル場です。

3. $u=(a,b)$ とし、

$$
X^u
=
a\partial_x+b\partial_y,
$$

$$
X^v
=
p\partial_x+q\partial_y.
$$

係数は全て定数なので [Lie 括弧の座標公式](../GEO5/index.md#thm-geo5-bracket-coordinate)から

$$
[X^u,X^v]=0.
$$

単位元0で評価して

$$
\boxed{[u,v]=0}.
$$

従って加法群の Lie 環は可換です。
<!-- solution-end -->

#### LIE1-A02 正の実数の乗法群
- Level: A

$G=\mathbb R_{>0}$ を乗法 Lie 群とする。

1. 単位元を求めよ。
2. $v=c\partial_x|_1\in T_1G$ に対応する左不変ベクトル場を求めよ。
3. 全ての左不変ベクトル場が
   $$
   cx\partial_x
   $$
   の形であることを示せ。
4. この Lie 環の括弧を求めよ。

<!-- solution-start -->
##### 詳細解答

1. 乗法の単位元は

$$
\boxed{1}.
$$

2.

$$
L_x(y)=xy.
$$

従って

$$
d(L_x)_1(c)=xc.
$$

よって

$$
\boxed{
X^v
=
cx\frac{\partial}{\partial x}
}.
$$

3. [単位元での値による左不変ベクトル場の特徴付け](#thm-lie1-left-invariant-evaluation)から、左不変ベクトル場は $T_1G$ の元で一意に決まります。

$T_1G$ は一次元なので、任意の元は

$$
c\partial_x|_1
$$

と書けます。

従って全ての左不変ベクトル場は

$$
\boxed{cx\partial_x}
$$

です。

4. 二つ取って

$$
X=cx\partial_x,
\qquad
Y=dx\partial_x
$$

とします。

一次元の座標公式から

$$
[X,Y]
=
\left(
cx\frac{d(dx)}{dx}
-
dx\frac{d(cx)}{dx}
\right)\partial_x.
$$

従って

$$
[X,Y]
=
(cdx-dcx)\partial_x
=
0.
$$

よって

$$
\boxed{\text{Lie 括弧は恒等的に0}}
$$

です。
<!-- solution-end -->

#### LIE1-A03 アフィン群の左不変基底
- Level: A

$$
G_{\mathrm{aff}}
=
\{(a,b):a>0\},
$$

$$
(a,b)(c,d)=(ac,b+ad)
$$

とする。

1. 単位元を求めよ。
2. 左移動 $L_{(a,b)}$ の単位元での微分を求めよ。
3.
   $$
   H=(1,0),
   \qquad
   E=(0,1)
   $$
   に対応する左不変ベクトル場を求めよ。
4.
   $$
   [H,E]=E
   $$
   を示せ。

<!-- solution-start -->
##### 詳細解答

1.

$$
(a,b)(1,0)
=
(a,b),
$$

$$
(1,0)(a,b)
=
(a,b)
$$

なので

$$
\boxed{e=(1,0)}.
$$

2.

$$
L_{(a,b)}(c,d)
=
(ac,b+ad).
$$

$(c,d)$ に関して微分すると

$$
d(L_{(a,b)})_{(c,d)}(u,v)
=
(au,av).
$$

特に単位元でも

$$
\boxed{
d(L_{(a,b)})_e(u,v)
=
(au,av)
}.
$$

3. $H=(1,0)$ について

$$
d(L_{(a,b)})_e(H)
=
(a,0),
$$

従って

$$
\boxed{
X^H
=
a\partial_a
}.
$$

$E=(0,1)$ について

$$
d(L_{(a,b)})_e(E)
=
(0,a),
$$

従って

$$
\boxed{
X^E
=
a\partial_b
}.
$$

4.

$$
[X^H,X^E]
=
[a\partial_a,a\partial_b].
$$

座標公式から

$$
[a\partial_a,a\partial_b]
=
a\frac{\partial a}{\partial a}\partial_b
-
a\frac{\partial a}{\partial b}\partial_a.
$$

従って

$$
[X^H,X^E]
=
a\partial_b
=
X^E.
$$

単位元で評価すると

$$
\boxed{[H,E]=E}.
$$
<!-- solution-end -->

#### LIE1-A04 $2\times2$ 行列の非可換な差
- Level: A

$$
A=
\begin{pmatrix}
0&1\\
0&0
\end{pmatrix},
\qquad
B=
\begin{pmatrix}
0&0\\
1&0
\end{pmatrix}
$$

とする。

1. $AB,BA$ を計算せよ。
2. $\mathfrak{gl}(2,\mathbb R)$ の括弧 $[A,B]$ を求めよ。
3. $A,B$ が生成する方向が可換でないことを説明せよ。

<!-- solution-start -->
##### 詳細解答

1.

$$
AB
=
\begin{pmatrix}
0&1\\
0&0
\end{pmatrix}
\begin{pmatrix}
0&0\\
1&0
\end{pmatrix}
=
\begin{pmatrix}
1&0\\
0&0
\end{pmatrix}.
$$

一方

$$
BA
=
\begin{pmatrix}
0&0\\
1&0
\end{pmatrix}
\begin{pmatrix}
0&1\\
0&0
\end{pmatrix}
=
\begin{pmatrix}
0&0\\
0&1
\end{pmatrix}.
$$

2. 一般線形群の Lie 環では

$$
[A,B]=AB-BA.
$$

従って

$$
\boxed{
[A,B]
=
\begin{pmatrix}
1&0\\
0&-1
\end{pmatrix}
}.
$$

3.

$$
[A,B]\ne0.
$$

したがって $A,B$ に対応する左不変ベクトル場は Lie 括弧で可換ではありません。

つまり、この二方向を順に作用させる順序の違いが一次の括弧として残ります。
<!-- solution-end -->

### Level B

#### LIE1-B01 直積 Lie 群の Lie 環
- Level: B

$G,H$ を Lie 群とする。

積多様体 $G\times H$ に成分ごとの積

$$
(g_1,h_1)(g_2,h_2)
=
(g_1g_2,h_1h_2)
$$

を入れる。

1. $G\times H$ が Lie 群であることを示せ。
2.
   $$
   T_{(e_G,e_H)}(G\times H)
   \cong
   T_{e_G}G\oplus T_{e_H}H
   $$
   のもとで、左不変ベクトル場が成分ごとに分解することを示せ。
3. Lie 括弧が
   $$
   [(u_1,v_1),(u_2,v_2)]
   =
   ([u_1,u_2],[v_1,v_2])
   $$
   となることを示せ。

<!-- solution-start -->
##### 詳細解答

1. 積多様体の滑らかな構造は [GEO1 の積多様体](../GEO1/index.md#thm-geo1-product-manifold)で構成済みです。

乗法は

$$
m_{G\times H}
((g_1,h_1),(g_2,h_2))
=
(m_G(g_1,g_2),m_H(h_1,h_2)).
$$

$m_G,m_H$ は滑らかなので、成分ごとの写像も滑らかです。

逆元写像は

$$
(g,h)^{-1}
=
(g^{-1},h^{-1}),
$$

であり、各成分の逆元写像が滑らかなので全体も滑らかです。

従って

$$
\boxed{G\times H\text{ は Lie 群}}
$$

です。

2. 単位元は

$$
(e_G,e_H).
$$

[GEO2 の積多様体の接空間](../GEO2/index.md#prop-geo2-product-tangent)から

$$
T_{(e_G,e_H)}(G\times H)
\cong
T_{e_G}G\oplus T_{e_H}H.
$$

左移動は

$$
L_{(g,h)}(x,y)
=
(gx,hy)
=
(L_gx,L_hy).
$$

従って微分も成分ごとに

$$
d(L_{(g,h)})_{(e_G,e_H)}(u,v)
=
(d(L_g)_{e_G}u,d(L_h)_{e_H}v).
$$

よって $(u,v)$ に対応する左不変ベクトル場は

$$
\boxed{
X^{(u,v)}_{(g,h)}
=
(X^u_g,X^v_h)
}.
$$

3. 積座標で Lie 括弧を計算すると、$G$ 方向の成分は $H$ 方向の座標へ依存せず、逆も同様です。

従って混合項は現れず

$$
[X^{(u_1,v_1)},X^{(u_2,v_2)}]
=
([X^{u_1},X^{u_2}],[X^{v_1},X^{v_2}]).
$$

単位元で評価すると

$$
\boxed{
[(u_1,v_1),(u_2,v_2)]
=
([u_1,u_2],[v_1,v_2])
}.
$$

したがって Lie 環は直和になります。
<!-- solution-end -->

#### LIE1-B02 アフィン群の射影準同型
- Level: B

$$
\Phi:G_{\mathrm{aff}}\to\mathbb R_{>0},
\qquad
\Phi(a,b)=a
$$

とする。

1. $\Phi$ が Lie 群準同型であることを示せ。
2. $d\Phi_e$ を求めよ。
3. アフィン群の Lie 環の基底 $H,E$ について
   $$
   [H,E]=E
   $$
   を使い、$d\Phi_e$ が Lie 環準同型であることを直接確認せよ。
4. $\ker d\Phi_e$ を求めよ。

<!-- solution-start -->
##### 詳細解答

1.

$$
\Phi((a,b)(c,d))
=
\Phi(ac,b+ad)
=
ac.
$$

一方

$$
\Phi(a,b)\Phi(c,d)
=
ac.
$$

従って群準同型です。

また $\Phi(a,b)=a$ は座標射影なので滑らかです。

よって

$$
\boxed{\Phi\text{ は Lie 群準同型}}
$$

です。

2. 単位元は $(1,0)$ です。

$$
\Phi(a,b)=a
$$

なので

$$
\boxed{
d\Phi_e(u,v)=u
}.
$$

3.

$$
d\Phi_e(H)=1,
\qquad
d\Phi_e(E)=0.
$$

$\mathbb R_{>0}$ の Lie 環は一次元なので括弧は0です。

従って

$$
[d\Phi_e(H),d\Phi_e(E)]
=
[1,0]
=
0.
$$

一方

$$
d\Phi_e([H,E])
=
d\Phi_e(E)
=
0.
$$

よって

$$
d\Phi_e([H,E])
=
[d\Phi_e(H),d\Phi_e(E)].
$$

基底上で確認できたので、双線形性から全ての元で括弧を保存します。

4.

$$
d\Phi_e(u,v)=u
$$

なので

$$
\boxed{
\ker d\Phi_e
=
\{(0,v):v\in\mathbb R\}
=
\mathbb R E
}.
$$
<!-- solution-end -->

#### LIE1-B03 左不変場と右不変場の符号
- Level: B

$G=GL(n,\mathbb R)$ とする。

$A\in M_n(\mathbb R)$ に対し、

$$
X^A_g=gA,
$$

$$
Y^A_g=Ag
$$

と置く。

1. $X^A$ が左不変、$Y^A$ が右不変であることを示せ。
2.
   $$
   [X^A,X^B]_g=g(AB-BA)
   $$
   を示せ。
3.
   $$
   [Y^A,Y^B]_g=(BA-AB)g
   $$
   を示せ。
4. 左不変規約と右不変規約で単位元の括弧の符号が逆になることを説明せよ。

<!-- solution-start -->
##### 詳細解答

1. 左移動について

$$
L_h(g)=hg.
$$

微分は

$$
d(L_h)_g(K)=hK.
$$

従って

$$
d(L_h)_g(X^A_g)
=
h(gA)
=
(hg)A
=
X^A_{hg}.
$$

よって $X^A$ は左不変です。

右移動について

$$
R_h(g)=gh,
$$

$$
d(R_h)_g(K)=Kh.
$$

従って

$$
d(R_h)_g(Y^A_g)
=
(Ag)h
=
A(gh)
=
Y^A_{gh}.
$$

よって $Y^A$ は右不変です。

2.

$$
dX^B_g(K)=KB,
\qquad
dX^A_g(K)=KA.
$$

従って

$$
\begin{aligned}
[X^A,X^B]_g
&=
dX^B_g(X^A_g)
-
dX^A_g(X^B_g)\\
&=
(gA)B-(gB)A\\
&=
\boxed{g(AB-BA)}.
\end{aligned}
$$

3.

$$
dY^B_g(K)=BK,
\qquad
dY^A_g(K)=AK.
$$

従って

$$
\begin{aligned}
[Y^A,Y^B]_g
&=
B(Ag)-A(Bg)\\
&=
(BA-AB)g.
\end{aligned}
$$

よって

$$
\boxed{
[Y^A,Y^B]_g=(BA-AB)g
}.
$$

4. 単位行列 $I$ で評価すると

$$
[X^A,X^B]_I=AB-BA,
$$

$$
[Y^A,Y^B]_I=BA-AB=-(AB-BA).
$$

従って右不変場を用いて $T_IG$ と同一視すると、左不変規約とは括弧の符号が逆になります。

本教材では左不変規約を採用します。
<!-- solution-end -->

### Level C

#### LIE1-C01 $AB-BA$ 型の差が張る空間
- Level: C

$n\ge2$ とする。

$M_n(\mathbb R)$ に

$$
[A,B]=AB-BA
$$

という Lie 括弧を入れる。

1. 任意の $A,B$ について
   $$
   \operatorname{tr}[A,B]=0
   $$
   を示せ。
2. $i\ne j$ に対する行列単位 $E_{ij}$ が$AB-BA$ の形で書けることを示せ。
3. 対角行列
   $$
   E_{ii}-E_{jj}
   $$
   も $AB-BA$ の形で書けることを示せ。
4. 対角成分の総和が0の任意の行列が有限個の $AB-BA$ 型の差の線形結合として書けることを示せ。
5. 従って、全ての $AB-BA$ 型の差で張られる部分空間が
   $$
   \{A\in M_n(\mathbb R):\operatorname{tr}A=0\}
   $$
   と一致することを示せ。

<!-- solution-start -->
##### 詳細解答

1. 行列積の対角成分の総和には

$$
\operatorname{tr}(AB)
=
\operatorname{tr}(BA)
$$

が成り立ちます。

実際、

$$
\operatorname{tr}(AB)
=
\sum_i(AB)_{ii}
=
\sum_{i,k}A_{ik}B_{ki}.
$$

添字 $i,k$ を交換すれば

$$
\sum_{k,i}B_{ki}A_{ik}
=
\operatorname{tr}(BA).
$$

従って

$$
\operatorname{tr}[A,B]
=
\operatorname{tr}(AB-BA)
=
0.
$$

よって全ての $AB-BA$ 型の差は対角成分の総和が0です。

2. $i\ne j$ とします。

$$
E_{ii}E_{ij}=E_{ij},
$$

一方

$$
E_{ij}E_{ii}=0
$$

です。

従って

$$
\boxed{
[E_{ii},E_{ij}]
=
E_{ij}
}.
$$

よって全ての非対角行列単位は $AB-BA$ 型の差です。

3.

$$
E_{ij}E_{ji}=E_{ii},
$$

$$
E_{ji}E_{ij}=E_{jj}.
$$

従って

$$
\boxed{
[E_{ij},E_{ji}]
=
E_{ii}-E_{jj}
}.
$$

4. 対角成分の総和が0の任意の行列 $A$ を

$$
A=D+N
$$

と分けます。

ここで $D$ は対角部分、$N$ は非対角部分です。

非対角部分は

$$
N
=
\sum_{i\ne j}a_{ij}E_{ij}
$$

であり、2より各 $E_{ij}$ は $AB-BA$ 型の差です。

従って $N$ は$AB-BA$ 型の差の線形結合です。

次に

$$
D
=
\operatorname{diag}(d_1,\ldots,d_n),
$$

$$
d_1+\cdots+d_n=0
$$

とします。

$d_n=-(d_1+\cdots+d_{n-1})$ なので

$$
D
=
\sum_{i=1}^{n-1}
d_i(E_{ii}-E_{nn}).
$$

3より各

$$
E_{ii}-E_{nn}
$$

も $AB-BA$ 型の差です。

従って $D$ も$AB-BA$ 型の差の線形結合です。

よって $A=D+N$ も$AB-BA$ 型の差の線形結合です。

5. 全ての $AB-BA$ 型の差が張る部分空間を $C$ とします。

1より

$$
C
\subset
\{A:\operatorname{tr}A=0\}.
$$

4より逆包含

$$
\{A:\operatorname{tr}A=0\}
\subset
C
$$

も成り立ちます。

従って

$$
\boxed{
C
=
\{A\in M_n(\mathbb R):
\operatorname{tr}A=0\}
}.
$$

この結果は、一般線形群の非可換性が接空間の中でどの方向へ現れるかを具体的に示しています。
<!-- solution-end -->

---

## 16. まとめ

本章では、群論と微分幾何の接続点を構成しました。

1. 群であり滑らかな多様体でもあって、乗法・逆元が滑らかな対象が Lie 群である。
2. 各群元による左移動・右移動は微分同相写像であり、接空間同士を線形同型で結ぶ。
3. 左不変ベクトル場は
   $$
   X_g=d(L_g)_e(X_e)
   $$
   を満たすため、単位元での値だけで完全に決まる。
4. 任意の $v\in T_eG$ は
   $$
   X^v_g=d(L_g)_e(v)
   $$
   により一意な左不変ベクトル場を作る。
5. $F$-関連なベクトル場は Lie 括弧を取っても $F$-関連であり、左不変ベクトル場は Lie 括弧で閉じる。
6. その括弧を単位元へ戻すと
   $$
   [u,v]=[X^u,X^v]_e
   $$
   により $T_eG$ が実 Lie 環になる。
7. Lie 群準同型を単位元で微分すると Lie 環準同型になる。
8. 一般線形群では
   $$
   \mathfrak{gl}(n,\mathbb R)
   =
   M_n(\mathbb R)
   $$
   であり、
   $$
   [A,B]=AB-BA
   $$
   が Lie 括弧になる。
9. 二次元アフィン群では
   $$
   [H,E]=E
   $$
   が成立し、群の非可換性が接空間の双線形構造へ圧縮される。

次章 LIE2 では、この単位元の接空間から実際の群の曲線を作ります。

主役は

$$
\mathbb R\to G
$$

という実数パラメータの群準同型と、それを単位元接ベクトルから作る対応です。さらに共役写像を微分し、群の内部対称性と Lie 環の括弧を結びます。
