# VC5 曲面上の積分定理・curl・topology

VC4 までで、二次元の Green theorem と三次元の [Gauss--Ostrogradsky theorem](../VC4/index.md#thm-vc4-gauss-divergence) がそろいました。本章では残る古典的な **曲面上の境界積分定理** を証明し、

- 境界の循環
- 曲面上の curl の flux
- 曲面の向きと境界の向き
- 穴のある領域で global potential が壊れる理由

を一つの構造として結びます。

この曲面上の積分定理の核心は、曲面をパラメータ平面へ戻すと Green theorem になることです。一般の微分形式や多様体上の一般定理は使いません。

---

## 1. 曲面の向きは境界曲線の向きを決める

VC3 では曲面の向きを連続な単位法線場で表しました。本章の曲面上の積分定理では、その向きから境界曲線の向きを一意に決める必要があります。

<a id="def-vc5-boundary-orientation"></a>

<!-- formal-statement-start -->
> **定義（曲面から誘導される境界向き）**  
> 向き付けられた正則曲面 patch
>
$$
r:D\to\mathbb R^3
$$
>
> を考え、$D\subset\mathbb R^2$ の正向き境界を $\partial D$ の反時計回り向きとする。
>
> 曲面の向きが
>
$$
r_u\times r_v
$$
>
> と整合しているとき、$r(\partial D)$ に入る向きを **曲面から誘導される境界向き** とする。
>
> 有限個の patch からなる向き付けられた曲面では、各 patch 上のこの規則が共有境界で整合する向きを境界 $\partial S$ の向きとする。
<!-- formal-statement-end -->

<!-- definition-example-start: def-vc5-boundary-orientation -->
**定義の確認**

例：水平円板

$$
r(u,v)=(u,v,0),
\qquad
D=\{u^2+v^2\le1\}
$$

では

$$
r_u\times r_v=(0,0,1).
$$

したがって上向き法線を選ぶと、$D$ の反時計回り境界

$$
\gamma(t)=(\cos t,\sin t),
\qquad 0\le t\le2\pi
$$

がそのまま曲面境界の正向きです。つまり $+z$ 方向から見て反時計回りになります。

曲面の向きを下向きに反転すると、境界向きも反転します。
<!-- definition-example-end -->

右手の親指を法線方向へ向けたとき、残りの指が境界の正向きを示す、という右手則はこの定義の記憶法です。正本はあくまでパラメータ領域の正向きです。

---

## 2. 境界循環と曲面上の curl

<a id="thm-vc5-stokes"></a>

<!-- formal-statement-start -->
> **定理（Kelvin--Stokes theorem）**  
> $S\subset\mathbb R^3$ を向き付けられた曲面とし、有限個の $C^2$ 正則 surface patches に分割できるとする。共有 patch 境界は有限本の区分的 $C^1$ 曲線からなり、外部境界 $\partial S$ も区分的 $C^1$ とする。
>
> $F$ を $S$ の近傍で $C^1$ 級の vector field とする。
>
> $n$ を選んだ曲面向きに対応する単位法線、$\partial S$ を [誘導された境界向き](#def-vc5-boundary-orientation) で向き付けると、
>
$$
\boxed{
\int_{\partial S}F\cdot dr
=
\int_S(\nabla\times F)\cdot n\,dS
}
$$
>
> が成り立つ。
<!-- formal-statement-end -->

### 何が新しいのか

[Gauss--Ostrogradsky theorem](../VC4/index.md#thm-vc4-gauss-divergence) は

$$
\text{closed surface の flux}
\longleftrightarrow
\text{volume 内の divergence}
$$

を結びました。

[Stokes theorem](#thm-vc5-stokes) は

$$
\text{boundary curve の circulation}
\longleftrightarrow
\text{surface 上の curl flux}
$$

を結びます。

境界次元が一つ下がる、という意味で Green theorem と同じ型です。

### 証明の見取り図

一枚の surface patch

$$
r(u,v)
$$

上で

$$
P(u,v)=F(r(u,v))\cdot r_u,
\qquad
Q(u,v)=F(r(u,v))\cdot r_v
$$

を作ります。

すると境界線積分は

$$
\int_{\partial D}P\,du+Q\,dv
$$

へ戻ります。一方、Green theorem の integrand

$$
Q_u-P_v
$$

を 合成関数の微分則 で展開すると、ちょうど

$$
(\nabla\times F)(r(u,v))
\cdot
(r_u\times r_v)
$$

になります。

複数 patch の場合は全部足し、共有境界が逆向きに二度現れて消えることを使います。

<!-- proof-start -->
### 証明

まず $S=r(D)$ が一枚の $C^2$ 正則 patch で、

$$
r_u\times r_v
$$

が選んだ向きと整合している場合を考えます。

$D$ の境界を正向きに

$$
\eta(t)=(u(t),v(t))
$$

とパラメータ表示すると、曲面境界は

$$
\gamma(t)
=
r(u(t),v(t))
$$

です。

合成関数の微分則 から

$$
\gamma'(t)
=
r_u u'(t)+r_v v'(t).
$$

したがって

$$
\begin{aligned}
F(\gamma(t))\cdot\gamma'(t)
&=
F(r)\cdot r_u\,u'
+
F(r)\cdot r_v\,v'\\
&=
P(u,v)u'
+
Q(u,v)v'.
\end{aligned}
$$

よって

$$
\int_{\partial S}F\cdot dr
=
\int_{\partial D}P\,du+Q\,dv.
$$

VC4 の [Green theorem](../VC4/index.md#thm-vc4-green-circulation) により

$$
\int_{\partial D}P\,du+Q\,dv
=
\iint_D(Q_u-P_v)\,du\,dv.
$$

ここで

$$
P=F(r)\cdot r_u,
\qquad
Q=F(r)\cdot r_v
$$

を微分します。$DF(r)$ を $F$ の Jacobian 行列と書けば

$$
Q_u
=
(DF(r)r_u)\cdot r_v
+
F(r)\cdot r_{vu},
$$

$$
P_v
=
(DF(r)r_v)\cdot r_u
+
F(r)\cdot r_{uv}.
$$

$r$ は $C^2$ なので

$$
r_{uv}=r_{vu}.
$$

したがって混合微分項が消え、

$$
Q_u-P_v
=
(DF(r)r_u)\cdot r_v
-
(DF(r)r_v)\cdot r_u.
$$

任意の vector

$$
a=(a_1,a_2,a_3),
\qquad
b=(b_1,b_2,b_3)
$$

に対して、左辺を成分ごとに組にすると

$$
\begin{aligned}
(DF\,a)\cdot b-(DF\,b)\cdot a
&=
(\partial_2F_3-\partial_3F_2)
(a_2b_3-a_3b_2)\\
&\quad+
(\partial_3F_1-\partial_1F_3)
(a_3b_1-a_1b_3)\\
&\quad+
(\partial_1F_2-\partial_2F_1)
(a_1b_2-a_2b_1).
\end{aligned}
$$

右辺の三つの微分係数は $\nabla\times F$ の三成分、括弧は $a\times b$ の三成分です。したがって

$$
(DF\,a)\cdot b-(DF\,b)\cdot a
=
(\nabla\times F)\cdot(a\times b).
$$

よって

$$
Q_u-P_v
=
(\nabla\times F)(r)
\cdot
(r_u\times r_v).
$$

したがって

$$
\begin{aligned}
\int_{\partial S}F\cdot dr
&=
\iint_D
(\nabla\times F)(r)
\cdot
(r_u\times r_v)\,du\,dv\\
&=
\int_S
(\nabla\times F)\cdot n\,dS.
\end{aligned}
$$

これで一枚の patch について示されました。

一般の $S$ を有限個の向きの整合した patch

$$
S_1,\ldots,S_m
$$

に分割します。各 $S_j$ に上の公式を適用して足します。

二つの patch が共有する内部境界 $\Gamma$ では、一方の誘導向きと他方の誘導向きが逆になるので

$$
\int_\Gamma F\cdot dr
+
\int_{-\Gamma}F\cdot dr
=
0.
$$

したがって内部境界はすべて相殺し、外部境界 $\partial S$ だけが残ります。

曲面積分側は patch ごとの積分を足せば $S$ 全体の積分になるため、

$$
\int_{\partial S}F\cdot dr
=
\int_S(\nabla\times F)\cdot n\,dS.
$$
<!-- proof-end -->

ここでも VC4 と同じく **内部境界の相殺** が一般化の機構です。

---

## 3. graph surface では Green theorem がそのまま見える

曲面

$$
S=
\{(x,y,g(x,y)):(x,y)\in D\}
$$

を上向きに向けます。

パラメータ表示

$$
r(x,y)=(x,y,g(x,y))
$$

なら

$$
r_x=(1,0,g_x),
\qquad
r_y=(0,1,g_y),
$$

$$
r_x\times r_y=(-g_x,-g_y,1).
$$

[Stokes theorem](#thm-vc5-stokes) の右辺は

$$
\iint_D
(\nabla\times F)(x,y,g(x,y))
\cdot
(-g_x,-g_y,1)\,dx\,dy.
$$

左辺は $F(r)\cdot r_x\,dx+F(r)\cdot r_y\,dy$ なので、まさに二変数 Green theorem の形へ戻ります。

一般 [Stokes theorem](#thm-vc5-stokes) を抽象的な別物として覚える必要はありません。**曲面上の線積分をパラメータ平面へ引き戻した Green theorem** が古典的 [Stokes theorem](#thm-vc5-stokes) です。

---

## 4. 例：水平円板の循環

$$
F(x,y,z)
=
\left(
-\frac y2,\frac x2,0
\right)
$$

とすると

$$
\nabla\times F=(0,0,1).
$$

単位円板

$$
S=\{x^2+y^2\le1,\ z=0\}
$$

を上向きに向けると、境界は反時計回りです。

[Stokes theorem](#thm-vc5-stokes) から

$$
\int_{\partial S}F\cdot dr
=
\int_S1\,dS
=
\pi.
$$

直接

$$
r(t)=(\cos t,\sin t,0)
$$

と置けば

$$
F(r(t))
=
\left(
-\frac{\sin t}{2},
\frac{\cos t}{2},
0
\right),
$$

$$
r'(t)=(-\sin t,\cos t,0),
$$

したがって

$$
F(r(t))\cdot r'(t)=\frac12
$$

なので

$$
\int_0^{2\pi}\frac12\,dt
=
\pi
$$

と一致します。

---

## 5. curl は単位面積あたりの循環密度

VC1 では curl を成分公式で定義しました。[Stokes theorem](#thm-vc5-stokes) により、その幾何学的意味を極限として回収できます。

<a id="prop-vc5-curl-density"></a>

<!-- formal-statement-start -->
> **命題（curl は局所循環密度）**  
> $F$ を点 $p$ の近傍で $C^1$ 級とし、単位 vector $n$ を固定する。
>
> $p$ を中心とし法線 $n$ を持つ半径 $\varepsilon$ の平面円板を $S_\varepsilon$、その境界を誘導向きで $\partial S_\varepsilon$ とする。
>
> すると
>
$$
\boxed{
\lim_{\varepsilon\downarrow0}
\frac{1}{\operatorname{Area}(S_\varepsilon)}
\int_{\partial S_\varepsilon}F\cdot dr
=
(\nabla\times F)(p)\cdot n
}
$$
>
> が成り立つ。
<!-- formal-statement-end -->

### 証明の見取り図

[Stokes theorem](#thm-vc5-stokes) で分子を curl の面積分へ変えると、左辺は $(\nabla\times F)\cdot n$ の円板上平均になります。円板を一点へ縮めれば、連続性により平均値は点値へ収束します。

<!-- proof-start -->
### 証明

[Stokes theorem](#thm-vc5-stokes) より

$$
\int_{\partial S_\varepsilon}F\cdot dr
=
\int_{S_\varepsilon}
(\nabla\times F)\cdot n\,dS.
$$

したがって

$$
\frac{1}{\operatorname{Area}(S_\varepsilon)}
\int_{\partial S_\varepsilon}F\cdot dr
=
\frac{1}{\operatorname{Area}(S_\varepsilon)}
\int_{S_\varepsilon}g(x)\,dS,
$$

ただし

$$
g(x):=(\nabla\times F)(x)\cdot n.
$$

$F\in C^1$ なので $g$ は連続です。任意の $\delta>0$ に対して、十分小さい $\varepsilon$ では

$$
|g(x)-g(p)|<\delta
\qquad
(x\in S_\varepsilon)
$$

です。

よって

$$
\left|
\frac{1}{\operatorname{Area}(S_\varepsilon)}
\int_{S_\varepsilon}g\,dS
-
g(p)
\right|
\le
\frac{1}{\operatorname{Area}(S_\varepsilon)}
\int_{S_\varepsilon}|g-g(p)|\,dS
<
\delta.
$$

したがって極限は $g(p)$ です。
<!-- proof-end -->

curl は「回転して見えるか」という曖昧な図形的印象ではなく、**微小ループの循環を面積で割った極限**です。

---

## 6. curl grad = 0 と div curl = 0 の積分的意味

VC1 で

$$
\nabla\times\nabla\phi=0,
\qquad
\nabla\cdot(\nabla\times A)=0
$$

を成分計算で証明しました。積分定理を使うと、これらの意味が見えます。

### 6.1 curl grad = 0

$F=\nabla\phi$ とし、$\partial S$ が $S$ の境界なら

$$
\int_{\partial S}\nabla\phi\cdot dr
=
\int_S
(\nabla\times\nabla\phi)\cdot n\,dS
=
0.
$$

これは VC2 の線積分の基本定理が閉曲線上で 0 を与えることと同じです。

### 6.2 div curl = 0

$F=\nabla\times A$ とし、$\Omega$ が適切な三次元領域なら VC4 の [Gauss--Ostrogradsky theorem](../VC4/index.md#thm-vc4-gauss-divergence) から

$$
\int_{\partial\Omega}
(\nabla\times A)\cdot n\,dS
=
\iiint_\Omega
\nabla\cdot(\nabla\times A)\,dV
=
0.
$$

つまり curl field は閉曲面から正味の source を作りません。

---

## 7. irrotational と solenoidal は別の条件

<a id="def-vc5-irrotational-solenoidal"></a>

<!-- formal-statement-start -->
> **定義（irrotational・solenoidal）**  
> $C^1$ vector field $F$ に対して、
>
$$
\nabla\times F=0
$$
>
> が成り立つとき $F$ は **irrotational**、
>
$$
\nabla\cdot F=0
$$
>
> が成り立つとき $F$ は **solenoidal**
>
> とする。
<!-- formal-statement-end -->

<!-- definition-example-start: def-vc5-irrotational-solenoidal -->
**定義の確認**

$$
F(x,y,z)=(x,y,z)
$$

では

$$
\nabla\times F=0,
\qquad
\nabla\cdot F=3,
$$

なので irrotational ですが solenoidal ではありません。

一方

$$
G(x,y,z)=(-y,x,0)
$$

では

$$
\nabla\cdot G=0,
\qquad
\nabla\times G=(0,0,2),
$$

なので solenoidal ですが irrotational ではありません。
<!-- definition-example-end -->

二つを混同しないことが重要です。

- irrotational は scalar potential と関係する
- solenoidal は curl による場の表示と関係する

という役割分担があります。

---

## 8. 穴があると curl F = 0 だけでは global potential は出ない

三次元でも VC2 の punctured-plane 現象がそのまま残ります。

$$
U
=
\mathbb R^3
\setminus
\{(0,0,z):z\in\mathbb R\}
$$

とし、

$$
F(x,y,z)
=
\left(
-\frac{y}{x^2+y^2},
\frac{x}{x^2+y^2},
0
\right)
$$

を考えます。

$U$ 上では直接計算により

$$
\nabla\times F=0.
$$

しかし $z=0$ 平面の単位円

$$
\gamma(t)=(\cos t,\sin t,0)
$$

では

$$
F(\gamma(t))
=
(-\sin t,\cos t,0)
=
\gamma'(t),
$$

なので

$$
\int_\gamma F\cdot dr
=
\int_0^{2\pi}1\,dt
=
2\pi.
$$

したがって VC2 の [保存場・経路独立・閉曲線積分の同値](../VC2/index.md#thm-vc2-conservative-equivalence) により、$F$ は $U$ 上で global scalar potential を持ちません。

<a id="prop-vc5-hole-obstruction"></a>

<!-- formal-statement-start -->
> **命題（穴は global potential を壊し得る）**  
> 上の領域
>
$$
U=\mathbb R^3\setminus\{z\text{-axis}\}
$$
>
> 上の $F$ は
>
$$
\nabla\times F=0
$$
>
> を満たすが conservative ではない。
>
> このとき単位円 $\gamma$ を境界に持つ通常の円板は $z$ 軸と交わるため、$F$ が $C^1$ である $U$ の内部に spanning surface を取って [Stokes theorem](#thm-vc5-stokes) を適用することはできない。
<!-- formal-statement-end -->

### どの証明機構が壊れたか

「curl が 0 なら [Stokes theorem](#thm-vc5-stokes) で任意の閉曲線積分が 0」と言いたくなります。

しかしそのためには、閉曲線 $\gamma$ が **field の定義域の中で** 曲面 $S$ の境界になっていなければなりません。

この例では $\gamma$ が $z$ 軸を一周しているため、通常の円板は除外された軸を横切ります。

さらに、もし $U$ の内部に [Stokes theorem](#thm-vc5-stokes) の仮定を満たす oriented spanning surface $S$ が存在したなら、

$$
\int_\gamma F\cdot dr
=
\int_S(\nabla\times F)\cdot n\,dS
=
0
$$

となるはずですが、直接計算では左辺は $2\pi$ でした。したがって、そのような spanning surface は $U$ 内には存在しません。

失われたものは微分可能性ではなく、領域の topology です。

---

## 9. curl による場の表示とその非一意性

<a id="def-vc5-vector-potential"></a>

<!-- formal-statement-start -->
> **定義（vector potential）**  
> vector field $F$ に対して
>
$$
\nabla\times A=F
$$
>
> を満たす vector field $A$ を、$F$ の **vector potential** とする。
<!-- formal-statement-end -->

<!-- definition-example-start: def-vc5-vector-potential -->
**定義の確認**

例：一定場

定数 $B\in\mathbb R$ に対し

$$
F=(0,0,B)
$$

とします。

$$
A
=
\left(
-\frac{By}{2},
\frac{Bx}{2},
0
\right)
$$

なら

$$
\nabla\times A
=
\left(
0,0,
\frac{\partial}{\partial x}\frac{Bx}{2}
-
\frac{\partial}{\partial y}\left(-\frac{By}{2}\right)
\right)
=
(0,0,B)
=
F.
$$

したがって $A$ は $F$ の vector potential です。
<!-- definition-example-end -->

<a id="prop-vc5-vector-potential-solenoidal"></a>

<!-- formal-statement-start -->
> **命題（vector potential が存在すれば solenoidal）**  
> $A\in C^2$ とし
>
$$
F=\nabla\times A
$$
>
> なら
>
$$
\nabla\cdot F=0.
$$
<!-- formal-statement-end -->

<!-- proof-start -->
### 証明

VC1 の [div curl = 0](../VC1/index.md#thm-vc1-div-curl) から

$$
\nabla\cdot F
=
\nabla\cdot(\nabla\times A)
=
0.
$$
<!-- proof-end -->

逆に「solenoidal なら global vector potential が必ず存在する」とは、領域の topology と境界・減衰条件を無視しては言えません。この逆向きの存在論は後続の分解定理の章で正本化します。

<a id="prop-vc5-vector-potential-gauge"></a>

<!-- formal-statement-start -->
> **命題（vector potential の gauge freedom）**  
> $A$ が $F$ の vector potential で、$\phi\in C^2$ なら
>
$$
A^\ast
=
A+\nabla\phi
$$
>
> も $F$ の vector potential である。
<!-- formal-statement-end -->

<!-- proof-start -->
### 証明

$$
\nabla\times A^\ast
=
\nabla\times A
+
\nabla\times\nabla\phi.
$$

VC1 の [curl grad = 0](../VC1/index.md#thm-vc1-curl-grad) より第二項は 0 なので

$$
\nabla\times A^\ast
=
F.
$$
<!-- proof-end -->

つまり vector potential は一般に一意ではありません。物理で現れる gauge freedom の最初の形です。

---

## 10. 同じ境界を持つ二つの曲面

[Stokes theorem](#thm-vc5-stokes) の実用上重要な帰結があります。

$S_1,S_2$ が同じ境界曲線 $C$ を持ち、向きも $C$ 上で一致するように選ばれているなら、

$$
\int_{S_1}
(\nabla\times F)\cdot n_1\,dS
=
\int_C F\cdot dr
=
\int_{S_2}
(\nabla\times F)\cdot n_2\,dS.
$$

したがって curl の flux は、field が途中で特異にならない限り **どの spanning surface を選ぶかに依りません**。

例えば単位円 $C$ に対し、

- $z=0$ の円板
- 上半球

のどちらを使っても、compatible orientation を選べば同じ値になります。

これは磁場や渦度の計算で、積分しやすい面へ自由に取り替えるための基本技法です。

---

## 11. 演習

#### VC5-A01 境界向きの反転
- Level: A
- 目安時間: 15分

単位円板

$$
S=\{x^2+y^2\le1,\ z=0\}
$$

について、

1. 上向き法線 $n=(0,0,1)$ が誘導する境界向き
2. 下向き法線 $-n$ が誘導する境界向き

を答えよ。

<!-- solution-start -->
### 詳細解答

標準パラメータ表示

$$
r(u,v)=(u,v,0)
$$

では

$$
r_u\times r_v=(0,0,1).
$$

したがって上向き法線と整合するパラメータ領域の正向きは、$+z$ 方向から見て反時計回りです。

よって 1. は

$$
\gamma(t)=(\cos t,\sin t,0),
\qquad 0\le t\le2\pi
$$

です。

法線を下向きへ反転すると曲面 orientation が反転するため、誘導境界向きも反転します。したがって 2. は

$$
\gamma_-(t)=(\cos t,-\sin t,0)
$$

のような時計回りです。
<!-- solution-end -->

#### VC5-A02 Stokes theorem で円周積分
- Level: A
- 目安時間: 15分

$$
F=
\left(
-\frac y2,\frac x2,0
\right)
$$

とし、単位円 $C$ を $+z$ 方向から見て反時計回りに一周する。

$$
\int_CF\cdot dr
$$

を [Stokes theorem](#thm-vc5-stokes) で求めよ。

<!-- solution-start -->
### 詳細解答

$C$ を境界に持つ上向き単位円板 $S$ を取ります。

$$
\nabla\times F=(0,0,1).
$$

よって [Stokes theorem](#thm-vc5-stokes) から

$$
\int_CF\cdot dr
=
\int_S(\nabla\times F)\cdot n\,dS
=
\int_S1\,dS.
$$

単位円板の面積は $\pi$ なので

$$
\boxed{\int_CF\cdot dr=\pi}.
$$
<!-- solution-end -->

#### VC5-A03 curl の循環密度
- Level: A
- 目安時間: 18分

$$
F=(-y,x,0)
$$

とする。$z=0$ 平面内の任意の半径 $\varepsilon$ の円板 $S_\varepsilon$ について

$$
\frac{1}{\operatorname{Area}(S_\varepsilon)}
\int_{\partial S_\varepsilon}F\cdot dr
$$

を求めよ。

<!-- solution-start -->
### 詳細解答

$$
\nabla\times F=(0,0,2).
$$

円板を上向きに向けると [Stokes theorem](#thm-vc5-stokes) より

$$
\int_{\partial S_\varepsilon}F\cdot dr
=
\int_{S_\varepsilon}2\,dS
=
2\pi\varepsilon^2.
$$

面積は $\pi\varepsilon^2$ なので

$$
\frac{1}{\pi\varepsilon^2}
2\pi\varepsilon^2
=
\boxed{2}.
$$

半径に依存せず、$(\nabla\times F)\cdot e_z=2$ と一致します。
<!-- solution-end -->

#### VC5-A04 irrotational / solenoidal の判定
- Level: A
- 目安時間: 18分

次の場を irrotational / solenoidal の観点から分類せよ。

$$
F_1=(x,y,z),
\qquad
F_2=(-y,x,0),
\qquad
F_3=(y,z,x).
$$

<!-- solution-start -->
### 詳細解答

まず

$$
F_1=(x,y,z)
$$

では

$$
\nabla\times F_1=0,
\qquad
\nabla\cdot F_1=3.
$$

したがって irrotational ですが solenoidal ではありません。

次に

$$
F_2=(-y,x,0)
$$

では

$$
\nabla\times F_2=(0,0,2),
\qquad
\nabla\cdot F_2=0.
$$

したがって solenoidal ですが irrotational ではありません。

最後に

$$
F_3=(y,z,x)
$$

では

$$
\nabla\cdot F_3
=
0+0+0
=
0,
$$

一方

$$
\nabla\times F_3
=
\left(
\frac{\partial x}{\partial y}-\frac{\partial z}{\partial z},
\frac{\partial y}{\partial z}-\frac{\partial x}{\partial x},
\frac{\partial z}{\partial x}-\frac{\partial y}{\partial y}
\right)
=
(-1,-1,-1).
$$

したがって $F_3$ は solenoidal ですが irrotational ではありません。
<!-- solution-end -->

#### VC5-B01 paraboloid をまたぐ循環
- Level: B
- 目安時間: 25分

$$
S
=
\{(x,y,z):z=1-x^2-y^2,\ x^2+y^2\le1\}
$$

を上向きに向ける。境界 $C$ には誘導向きを入れる。

$$
F=(-y,x,0)
$$

について

$$
\int_CF\cdot dr
$$

を求めよ。

<!-- solution-start -->
### 詳細解答

$$
\nabla\times F=(0,0,2).
$$

graph

$$
z=g(x,y)=1-x^2-y^2
$$

を

$$
r(x,y)=(x,y,g(x,y))
$$

とパラメータ表示すると、

$$
r_x\times r_y=(-g_x,-g_y,1).
$$

したがって上向き oriented vector area element は

$$
n\,dS=(r_x\times r_y)\,dx\,dy
=
(-g_x,-g_y,1)\,dx\,dy
=
(2x,2y,1)\,dx\,dy.
$$

したがって

$$
(\nabla\times F)\cdot n\,dS
=
(0,0,2)\cdot(2x,2y,1)\,dx\,dy
=
2\,dx\,dy.
$$

射影領域は単位円板 $D$ なので

$$
\int_CF\cdot dr
=
\int_S(\nabla\times F)\cdot n\,dS
=
\iint_D2\,dx\,dy
=
\boxed{2\pi}.
$$

曲面自体の面積を計算する必要はありません。curl が $z$ 成分だけを持つため、oriented vector area の $z$ 成分だけが効きます。
<!-- solution-end -->

#### VC5-B02 穴あき領域で Stokes が使えない理由
- Level: B
- 目安時間: 28分

$$
U
=
\mathbb R^3\setminus\{z\text{-axis}\},
$$

$$
F(x,y,z)
=
\left(
-\frac{y}{x^2+y^2},
\frac{x}{x^2+y^2},
0
\right)
$$

とする。

1. $U$ 上で $\nabla\times F=0$ を確認せよ。
2. 単位円 $\gamma(t)=(\cos t,\sin t,0)$ の循環を求めよ。
3. 1. と 2. が [Stokes theorem](#thm-vc5-stokes) と矛盾しない理由を説明せよ。

<!-- solution-start -->
### 詳細解答

1. $F_3=0$ で $z$ 依存もないので curl の $x,y$ 成分は 0 です。$z$ 成分は

$$
\frac{\partial}{\partial x}
\frac{x}{x^2+y^2}
-
\frac{\partial}{\partial y}
\left(
-\frac{y}{x^2+y^2}
\right).
$$

それぞれ

$$
\frac{y^2-x^2}{(x^2+y^2)^2},
\qquad
\frac{x^2-y^2}{(x^2+y^2)^2}
$$

なので和は 0 です。したがって

$$
\nabla\times F=0
\qquad\text{on }U.
$$

2. 円周上では

$$
F(\gamma(t))
=
(-\sin t,\cos t,0)
=
\gamma'(t),
$$

よって

$$
\int_\gamma F\cdot dr
=
\int_0^{2\pi}1\,dt
=
\boxed{2\pi}.
$$

3. [Stokes theorem](#thm-vc5-stokes) を適用するには、$\gamma$ を境界に持つ曲面 $S$ 全体の近傍で $F$ が $C^1$ でなければなりません。

通常の spanning disk は $z$ 軸と交わりますが、$z$ 軸は $U$ から除かれ、そこで $F$ は未定義です。

したがって「$\nabla\times F=0$ だから spanning surface 上の curl flux が 0」という議論に必要な曲面が定義域内に存在しません。壊れているのは [Stokes theorem](#thm-vc5-stokes) ではなく、その適用仮定です。
<!-- solution-end -->

#### VC5-B03 vector potential と gauge
- Level: B
- 目安時間: 25分

$$
F=(0,0,B)
$$

に対して

$$
A=
\left(
-\frac{By}{2},
\frac{Bx}{2},
0
\right)
$$

とする。

1. $\nabla\times A=F$ を確認せよ。
2. $\phi(x,y,z)=xyz$ とし $A^\ast=A+\nabla\phi$ とする。$\nabla\times A^\ast=F$ を示せ。
3. $F$ が solenoidal であることを確認せよ。

<!-- solution-start -->
### 詳細解答

1.

$$
\nabla\times A
=
\left(
0,0,
\frac{\partial}{\partial x}\frac{Bx}{2}
-
\frac{\partial}{\partial y}\left(-\frac{By}{2}\right)
\right)
=
(0,0,B)
=
F.
$$

2.

$$
\nabla\phi=(yz,xz,xy).
$$

したがって

$$
A^\ast
=
\left(
-\frac{By}{2}+yz,
\frac{Bx}{2}+xz,
xy
\right).
$$

直接計算してもよいですが、VC1 の [curl grad = 0](../VC1/index.md#thm-vc1-curl-grad) を使うと

$$
\nabla\times A^\ast
=
\nabla\times A
+
\nabla\times\nabla\phi
=
F+0
=
\boxed{F}.
$$

3.

$$
\nabla\cdot F
=
\partial_x0+\partial_y0+\partial_zB
=
0.
$$

よって $F$ は solenoidal です。これは vector potential が存在する場は solenoidal という一般命題とも一致します。
<!-- solution-end -->

#### VC5-C01 spanning surface の取り替えと field の未定義点
- Level: C
- 目安時間: 40分

単位円

$$
C=\{x^2+y^2=1,\ z=0\}
$$

を $+z$ 方向から見て反時計回りに向ける。

$$
A=
\left(
-\frac y2,\frac x2,0
\right)
$$

とし、

- $S_1$: $z=0$ の単位円板
- $S_2$: 上半球 $x^2+y^2+z^2=1,\ z\ge0$

を、どちらも境界向きが $C$ と一致するように向き付ける。

1. $\int_{S_1}(\nabla\times A)\cdot n\,dS$ を求めよ。
2. [Stokes theorem](#thm-vc5-stokes) を使い、$S_2$ 上の同じ flux を曲面積分を直接計算せず求めよ。
3. 一般に二つの spanning surface $S_1,S_2$ が同じ境界 $C$ を持つとき、field が両曲面の近傍で $C^1$ なら curl flux が一致する理由を説明せよ。
4. field が両曲面の間のある点で未定義になる場合、この議論でどの仮定を再確認すべきか述べよ。

<!-- solution-start -->
### 詳細解答

まず

$$
\nabla\times A=(0,0,1).
$$

1. $S_1$ は上向きに取れば境界が $C$ と一致します。したがって

$$
\int_{S_1}(\nabla\times A)\cdot n\,dS
=
\int_{S_1}1\,dS
=
\boxed{\pi}.
$$

2. [Stokes theorem](#thm-vc5-stokes) を $S_1$ に使うと

$$
\int_C A\cdot dr
=
\int_{S_1}(\nabla\times A)\cdot n\,dS
=
\pi.
$$

同じ向きの $C$ を境界に持つ $S_2$ にも [Stokes theorem](#thm-vc5-stokes) を使えば

$$
\int_{S_2}(\nabla\times A)\cdot n\,dS
=
\int_C A\cdot dr
=
\boxed{\pi}.
$$

半球の面積分を直接計算する必要はありません。

3. 同じ議論で

$$
\int_{S_1}(\nabla\times F)\cdot n_1\,dS
=
\int_C F\cdot dr
=
\int_{S_2}(\nabla\times F)\cdot n_2\,dS.
$$

したがって両者は一致します。重要なのは、両曲面の境界向きが同じ $C$ になるよう orientation をそろえることです。

4. [Stokes theorem](#thm-vc5-stokes) は $F$ が各曲面の近傍で $C^1$ であることを要求します。したがって field が $S_1$ または $S_2$ 上の点で未定義になる、あるいは spanning surface を定義域内に取れない場合、定理をそのまま適用できません。

穴あき領域では「同じ境界ならどの面でもよい」と無条件に言ってはいけません。**選んだ曲面全体が field の定義域内にあり、必要な正則性を満たすか**を確認する必要があります。
<!-- solution-end -->
