# GEO6 幾何学 VI

<!-- definition-example-audit: strict -->

[GEO5](../GEO5/index.md) では、一本の非零な滑らかなベクトル場なら局所座標を選んで座標方向へ直せることを示しました。本章では「各点で k 次元の接方向を指定したとき、その方向全体が実際の k 次元部分多様体の接空間になるのはいつか」を扱います。

答えは Lie 括弧です。指定した方向に沿う二つの滑らかなベクトル場を順に動かしたとき、その交換差が指定方向の外へ飛び出さないこと、すなわち分布が Lie 括弧で閉じていることが、局所的に部分多様体へ積分できることと同値になります。この同値を後半で主要定理として証明します。

証明では [GEO5 のベクトル場の直線化定理](../GEO5/index.md#thm-geo5-flow-box) と [流れによる Lie 括弧の解釈](../GEO5/index.md#thm-geo5-bracket-flow) を使います。一本の方向を流れで直線化し、その流れが残りの分布を保つことを示し、横断面上の階数 k-1 の問題へ帰着します。

---

## 1. 各点で許される接方向をまとめる

<a id="def-geo6-linear-subspaces"></a>
<!-- formal-statement-start -->
> **定義（滑らかな線形分布）**  
> $M$ を $n$ 次元滑らかな多様体、$0\le k\le n$ とする。各 $p\in M$ に $k$ 次元線形部分空間
>
$$
D_p\subset T_pM
$$
>
> を対応させる族 $D$ を階数 $k$ の **滑らかな線形分布**という。ただし各 $p\in M$ に対して、$p$ のある近傍 $U$ と $U$ 上の滑らかなベクトル場
>
$$
X_1,\dots,X_k
$$
>
> が存在し、任意の $q\in U$ で
>
$$
D_q
=
\operatorname{span}
\{(X_1)_q,\dots,(X_k)_q\}
$$
>
> となることを要求する。このような $X_1,\dots,X_k$ を $D$ の **局所枠**という。
<!-- formal-statement-end -->

「各点で k 次元部分空間を選ぶ」だけでは滑らかさは保証されません。局所枠が存在するという条件が、点を動かしたとき許される方向も滑らかに動くことを表します。

<!-- definition-example-start: def-geo6-linear-subspaces -->
**定義の確認**

$\mathbb R^3$ 上で

$$
D_{(x,y,z)}
=
\operatorname{span}
\left\{
\frac{\partial}{\partial x},
\frac{\partial}{\partial y}
\right\}
$$

とします。

$$
X_1=\partial_x,
\qquad
X_2=\partial_y
$$

は全空間で滑らかで、どの点でも一次独立です。従って D は階数2の滑らかな線形分布です。

各点で許される方向は $xy$ 平面に平行で、$z$ 方向は許されません。後で、この方向を接空間にもつ曲面が

$$
z=c
$$

という平面になることが分かります。
<!-- definition-example-end -->

<a id="def-geo6-section"></a>
<!-- formal-statement-start -->
> **定義（分布の局所切断）**  
> $D$ を $M$ 上の滑らかな線形分布、$U\subset M$ を開集合とする。$U$ 上の滑らかなベクトル場 $X$ が
>
$$
X_q\in D_q
\qquad(q\in U)
$$
>
> を満たすとき、$X$ を $U$ 上の $D$ の **局所切断**という。
<!-- formal-statement-end -->

<!-- definition-example-start: def-geo6-section -->
**定義の確認**

上の定分布 $D=\operatorname{span}\{\partial_x,\partial_y\}$ に対して

$$
X
=
(x+y)\partial_x
+
e^z\partial_y
$$

は $D$ の局所切断です。各点で $\partial_x,\partial_y$ の線形結合だからです。一方

$$
Y=\partial_x+\partial_z
$$

は $\partial_z$ 成分を持つので $D$ の局所切断ではありません。
<!-- definition-example-end -->

局所枠 X_1,\dots,X_k が与えられると、D の任意の局所切断 X は

$$
X=\sum_{i=1}^k a^iX_i
$$

と滑らかな係数 a^i で一意に書けます。実際、各点で X_i は一次独立なので係数は一意です。座標表示した係数行列から非零な k 次小行列を一つ選べば、その逆行列の成分は滑らかなので a^i も滑らかです。

---

## 2. 分布が部分多様体の接空間になるとはどういうことか

<a id="def-geo6-integral-manifold"></a>
<!-- formal-statement-start -->
> **定義（積分多様体・可積分性）**  
> $D$ を $M$ 上の階数 $k$ の滑らかな線形分布とする。
>
> $k$ 次元滑らかな多様体 $N$ と滑らかなはめ込み
>
$$
i:N\to M
$$
>
> が、全ての $q\in N$ で
>
$$
di_q(T_qN)=D_{i(q)}
$$
>
> を満たすとき、$i(N)$ を $D$ の **積分多様体**という。
>
> また、任意の $p\in M$ に対して $p$ を通る積分多様体が局所的に存在するとき、$D$ は **可積分**であるという。
<!-- formal-statement-end -->

<!-- definition-example-start: def-geo6-integral-manifold -->
**定義の確認**

先ほどの

$$
D=\operatorname{span}\{\partial_x,\partial_y\}
$$

に対して、各 $c\in\mathbb R$ の平面

$$
S_c=\{(x,y,z):z=c\}
$$

を考えます。

包含写像 $i_c:S_c\hookrightarrow\mathbb R^3$ の微分の像は

$$
di_c(T_{(x,y,c)}S_c)
=
\operatorname{span}\{\partial_x,\partial_y\}
=
D_{(x,y,c)}.
$$

従って各 S_c は積分多様体です。任意の点 (x,y,z) は S_z 上にあるので D は可積分です。
<!-- definition-example-end -->

より一般に、沈め込み

$$
F:U\to\mathbb R^{n-k}
$$

があるとき

$$
D_q=\ker dF_q
$$

と置けば、[GEO3 の正則レベル集合の接空間](../GEO3/index.md#thm-geo3-level-tangent-kernel)から各ファイバー F^{-1}(c) は局所的な積分多様体です。つまり「独立な n-k 個の保存量がある」なら、その共通の逆像 $F^{-1}(c)$ が葉になります。

---

## 3. Lie 括弧で閉じているかを調べる

<a id="def-geo6-involutive"></a>
<!-- formal-statement-start -->
> **定義（対合的な分布）**  
> $D$ を滑らかな線形分布とする。任意の開集合 $U$ と $U$ 上の $D$ の局所切断 $X,Y$ に対して
>
$$
[X,Y]_q\in D_q
\qquad(q\in U)
$$
>
> が成り立つとき、$D$ は **対合的**であるという。
<!-- formal-statement-end -->

<!-- definition-example-start: def-geo6-involutive -->
**定義の確認**

\mathbb R^3 上で

$$
D
=
\operatorname{span}\{\partial_x,e^x\partial_y\}
$$

とします。局所枠を

$$
X_1=\partial_x,
\qquad
X_2=e^x\partial_y
$$

と取ると

$$
[X_1,X_2]
=
e^x\partial_y
=
X_2.
$$

したがって局所枠どうしの Lie 括弧は D の中に残ります。次の命題により D は対合的です。実際 D は

$$
D=\operatorname{span}\{\partial_x,\partial_y\}
$$

と同じ分布なので、積分多様体は z=\text{const.} です。
<!-- definition-example-end -->

<a id="prop-geo6-frame-criterion"></a>
<!-- formal-statement-start -->
> **命題（局所枠での対合性判定）**  
> $D$ を階数 $k$ の滑らかな線形分布とし、$U$ 上で
>
$$
D=\operatorname{span}\{X_1,\dots,X_k\}
$$
>
> とする。
>
> $D$ が $U$ 上で対合的であることと、全ての $i,j$ について滑らかな関数 $c_{ij}^{\ell}$ が存在して
>
$$
[X_i,X_j]
=
\sum_{\ell=1}^k c_{ij}^{\ell}X_\ell
$$
>
> と書けることは同値である。
<!-- formal-statement-end -->

<!-- proof-start -->
### 証明

D が対合的なら各 X_i,X_j は D の局所切断なので [X_i,X_j] も D の局所切断です。局所枠による一意表示から係数 c_{ij}^{\ell} は滑らかです。

逆に局所枠どうしの括弧が D に入るとします。任意の局所切断は

$$
X=\sum_i a^iX_i,
\qquad
Y=\sum_j b^jX_j
$$

と書けます。[GEO5 の関数倍に対する Lie 括弧の積の法則](../GEO5/index.md#thm-geo5-bracket-identities)を繰り返すと

$$
[X,Y]
=
\sum_{i,j}a^ib^j[X_i,X_j]
+
\sum_{i,j}a^iX_i(b^j)X_j
-
\sum_{i,j}b^jX_j(a^i)X_i.
$$

右辺の各項は X_1,\dots,X_k の滑らかな関数係数の線形結合です。従って [X,Y] も D の局所切断です。$\square$
<!-- proof-end -->

この命題のおかげで、対合性を確かめるとき全ての局所切断を調べる必要はありません。局所枠の有限個の括弧だけで判定できます。

---

## 4. 可積分なら Lie 括弧は接方向の外へ出ない

<a id="prop-geo6-integrable-implies-involutive"></a>
<!-- formal-statement-start -->
> **命題（可積分なら対合的）**  
> $D$ が可積分な滑らかな線形分布なら、$D$ は対合的である。
<!-- formal-statement-end -->

<!-- proof-start -->
### 証明

$p\in M$ を固定し、$X,Y$ を $p$ の近傍で定義された $D$ の局所切断とします。可積分性から $p$ を通る $k$ 次元積分多様体 $S$ が取れます。

はめ込みは各点の近くで埋め込みとして見られるので、p の近くへ縮めて [GEO3 の部分多様体の局所方程式表示](../GEO3/index.md#cor-geo3-submanifold-local-equations)を使います。局所座標

$$
(x^1,\dots,x^k,y^1,\dots,y^{n-k})
$$

を選び、

$$
S=\{y^1=\cdots=y^{n-k}=0\}
$$

とできます。

S 上では D_q=T_qS なので X,Y は S に接します。従って各 a=1,\dots,n-k について S 上で

$$
X(y^a)=0,
\qquad
Y(y^a)=0.
$$

ここで Y(y^a) は S 上で恒等的に0です。X は S に接するため、その S に沿った方向微分も0で、

$$
X(Y(y^a))=0
$$

です。同様に

$$
Y(X(y^a))=0.
$$

したがって p で

$$
\bigl[X,Y\bigr](y^a)
=
X(Y(y^a))-Y(X(y^a))
=
0.
$$

全ての a について成り立つので、[GEO3 の接空間の核表示](../GEO3/index.md#thm-geo3-level-tangent-kernel)から

$$
[X,Y]_p\in T_pS=D_p.
$$

p は任意だったので D は対合的です。$\square$
<!-- proof-end -->

この向きは幾何的に自然です。実際の部分多様体の上だけを動く二つの方向を交換しても、突然その部分多様体から垂直方向へ飛び出すことはありません。

---

## 5. 非可積分な分布では交換差が外へ飛び出す

\mathbb R^3 上で

$$
X=\partial_x,
\qquad
Y=\partial_y+x\partial_z
$$

とし、

$$
D=\operatorname{span}\{X,Y\}
$$

とします。X,Y はどの点でも一次独立なので D は階数2の滑らかな線形分布です。

Lie 括弧は

$$
[X,Y]
=
[\partial_x,\partial_y+x\partial_z]
=
\partial_z.
$$

一方、もし

$$
\partial_z=aX+bY
$$

と書けるなら x 成分から a=0、y 成分から b=0 となり、z 成分が1になれません。従って

$$
\partial_z\notin D.
$$

よって $D$ は対合的ではありません。[可積分なら対合的](#prop-geo6-integrable-implies-involutive) の対偶から $D$ は可積分ではありません。

ここで失われている機構は明確です。X 方向へ少し進むと Y の z 成分 x が変化します。したがって X と Y の微小な交換運動は z 方向のずれを生み、その方向が D の外に出ます。もし D に接する曲面が存在すれば、その曲面に接する滑らかなベクトル場の Lie 括弧も接していなければならないので矛盾します。

---

## 6. 対合性は流れに沿って分布を保存する

Frobenius の難しい向きは

$$
\text{対合的}
\Longrightarrow
\text{局所可積分}
$$

です。その鍵は、$D$ に沿う滑らかなベクトル場の流れが $D$ 自身を保つことです。

<a id="lem-geo6-flow-invariance"></a>
<!-- formal-statement-start -->
> **補題（対合的分布はその局所切断の流れで保存される）**  
> $D$ を対合的な階数 $k$ の滑らかな線形分布、$X$ を $D$ の局所切断、$\Phi_t$ を $X$ の局所流とする。
>
> $q$ と $\Phi_t(q)$ が共通の局所枠の定義域に入る十分小さい $t$ に対して
>
$$
d(\Phi_t)_q(D_q)
=
D_{\Phi_t(q)}
$$
>
> が成り立つ。
<!-- formal-statement-end -->

### 証明の見取り図

局所枠 E_1,\dots,E_k を X の流れで q まで引き戻します。対合性により

$$
[X,E_j]
=
\sum_\ell a_j^\ell E_\ell
$$

と書けます。[GEO5 の流れによる Lie 括弧の公式](../GEO5/index.md#thm-geo5-bracket-flow)を使うと、引き戻された $k$ 本のベクトルは時間変数に関する有限次元線形系を満たします。従って初期時刻で張っていた $k$ 次元部分空間から外へ出ません。

<!-- proof-start -->
### 証明

q の近傍で D の局所枠 E_1,\dots,E_k を取ります。対合性から滑らかな関数 a_j^\ell が存在して

$$
[X,E_j]
=
\sum_{\ell=1}^k a_j^\ell E_\ell
$$

と書けます。

p_t=\Phi_t(q) とし、

$$
Z_j(t)
=
d(\Phi_{-t})_{p_t}(E_j(p_t))
\in T_qM
$$

と置きます。[GEO5 の流れによる Lie 括弧の解釈](../GEO5/index.md#thm-geo5-bracket-flow)を点 q で評価すると

$$
\frac{d}{dt}Z_j(t)
=
d(\Phi_{-t})_{p_t}([X,E_j]_{p_t}).
$$

括弧の表示を代入して

$$
\frac{d}{dt}Z_j(t)
=
\sum_{\ell=1}^k
a_j^\ell(p_t)Z_\ell(t).
$$

これは $T_qM$ の中の $k$ 本のベクトルに対する時間変数の線形系です。ここで「右辺が現在の $Z_\ell(t)$ の線形結合だから $D_q$ に留まる」とだけ済ませず、線形方程式の一意性を使います。

係数行列を

$$
A(t)
=
\bigl(a_j^\ell(p_t)\bigr)_{\ell j}
$$

とし、$k\times k$ 行列 $C(t)$ を

$$
C'(t)=C(t)A(t),
\qquad
C(0)=I_k
$$

の解とします。$E(q)$ を列ベクトル

$$
E(q)
=
\bigl(E_1(q),\dots,E_k(q)\bigr)
$$

とみなし、

$$
W(t)=E(q)C(t)
$$

と置くと、$W(t)$ は $Z(t)=(Z_1(t),\dots,Z_k(t))$ と同じ線形系と同じ初期条件を満たします。この線形系の解の一意性から

$$
Z(t)=W(t)=E(q)C(t).
$$

従って全ての $Z_j(t)$ は

$$
D_q=\operatorname{span}\{E_1(q),\dots,E_k(q)\}
$$

の中に留まります。

また $\det C(0)=1$ であり、$\det C(t)$ は連続なので、十分小さい $t$ では $\det C(t)\neq0$ です。従って $C(t)$ は可逆で、$Z_1(t),\dots,Z_k(t)$ は一次独立のままです。よって

$$
\operatorname{span}\{Z_1(t),\dots,Z_k(t)\}
=
D_q.
$$

両辺を d(\Phi_t)_q で押し出せば

$$
\operatorname{span}\{E_1(p_t),\dots,E_k(p_t)\}
=
d(\Phi_t)_q(D_q).
$$

左辺は D_{p_t} なので

$$
d(\Phi_t)_q(D_q)
=
D_{\Phi_t(q)}.
$$

$\square$
<!-- proof-end -->

ここで対合性は「流れに沿って D の基底を微分しても D の線形結合にしかならない」という形で使われました。Frobenius の核心はこの不変性です。

---

## 7. 座標に適応した分布

<a id="def-geo6-frobenius-coordinates"></a>
<!-- formal-statement-start -->
> **定義（分布に適応した局所座標）**  
> D を M 上の階数 k の滑らかな線形分布とする。局所座標
>
$$
(u^1,\dots,u^n)
$$
>
> が $D$ に **適応している**とは、その座標近傍上で
>
$$
D
=
\operatorname{span}
\left\{
\frac{\partial}{\partial u^1},
\dots,
\frac{\partial}{\partial u^k}
\right\}
$$
>
> となることをいう。
<!-- formal-statement-end -->

<!-- definition-example-start: def-geo6-frobenius-coordinates -->
**定義の確認**

$\mathbb R^3$ で

$$
D
=
\operatorname{span}
\left\{
\partial_x+y\partial_z,
\partial_y+x\partial_z
\right\}
$$

を考えます。

新しい座標を

$$
u=x,
\qquad
v=y,
\qquad
w=z-xy
$$

と置きます。逆写像は

$$
x=u,
\qquad
y=v,
\qquad
z=w+uv
$$

なので、これは滑らかな座標です。

X=\partial_x+y\partial_z に対して

$$
X(u)=1,\qquad X(v)=0,\qquad X(w)=0,
$$

Y=\partial_y+x\partial_z に対して

$$
Y(u)=0,\qquad Y(v)=1,\qquad Y(w)=0.
$$

従って

$$
X=\partial_u,
\qquad
Y=\partial_v,
$$

すなわち

$$
D=\operatorname{span}\{\partial_u,\partial_v\}.
$$

この座標では積分多様体は w=\text{const.} です。
<!-- definition-example-end -->

適応座標があれば可積分性は一目で分かります。u^{k+1},\dots,u^n を定数に固定した座標平面が積分多様体だからです。また座標方向 $\partial_{u^1},\dots,\partial_{u^k}$ は互いに可換なので、対合性も直ちに従います。

---

## 8. 可積分性と Lie 括弧閉性の同値

<a id="thm-geo6-frobenius"></a>
<!-- formal-statement-start -->
> **定理（Frobenius の定理）**  
> $M$ を $n$ 次元滑らかな多様体、$D$ を階数 $k$ の滑らかな線形分布とする。次は同値である。
>
> 1. $D$ は可積分である。
> 2. $D$ は対合的である。
> 3. 任意の $p\in M$ の近傍に $D$ に適応した局所座標
>
$$
(u^1,\dots,u^n)
$$
>
> が存在し、
>
$$
D
=
\operatorname{span}
\left\{
\partial_{u^1},\dots,\partial_{u^k}
\right\}
$$
>
> となる。
<!-- formal-statement-end -->

### 証明の見取り図

3 \Rightarrow 1 は座標平面を取ればよく、1 \Rightarrow 2 はすでに証明しました。

核心は 2 \Rightarrow 3 です。階数 k に関する帰納法を使います。

1. D の局所枠から非零な X_1 を一本取る。
2. GEO5 の直線化定理で $X_1=\partial_t$ とする。
3. t=0 の横断面 S を取る。
4. [対合的分布はその局所切断の流れで保存される補題](#lem-geo6-flow-invariance)により、$D$ は $X_1$ の流れで保たれる。
5. S 上では
   $$
   E=D\cap TS
   $$
   が階数 k-1 の対合的分布になる。
6. 帰納法で E に適応した座標を S 上に作る。
7. その座標を X_1 の流れに沿って一定に延長する。

これで一本の方向を分離し、残りを一段低い問題へ落とします。

<!-- proof-start -->
### 証明

#### 3 \Rightarrow 1

p の近傍に適応座標

$$
(u^1,\dots,u^n)
$$

があるとします。定数

$$
c^{k+1},\dots,c^n
$$

を固定して

$$
S_c
=
\{
u^{k+1}=c^{k+1},\dots,u^n=c^n
\}
$$

と置きます。これは k 次元埋め込み部分多様体で、

$$
T_qS_c
=
\operatorname{span}
\{\partial_{u^1},\dots,\partial_{u^k}\}_q
=
D_q.
$$

従って各点を通る局所積分多様体が存在し、D は可積分です。

#### 1 \Rightarrow 2

これは [可積分なら対合的](#prop-geo6-integrable-implies-involutive) で証明済みです。

#### 2 \Rightarrow 3

D が対合的とします。階数 k について帰納法を行います。

k=0 なら D_q=\{0\} なので任意の局所座標が適応座標です。

k\ge1 とし、p の近傍 U で局所枠

$$
X_1,\dots,X_k
$$

を取ります。X_1 は各点で非零です。U を縮め、[GEO5 のベクトル場の直線化定理](../GEO5/index.md#thm-geo5-flow-box)により座標

$$
(t,z^2,\dots,z^n)
$$

を取り

$$
X_1=\partial_t
$$

とします。

横断面

$$
S=\{t=0\}
$$

を考えます。各 $q\in S$ で $X_1(q)=\partial_t$ は $T_qS$ に属さないため

$$
D_q
=
\operatorname{span}\{X_1(q)\}
\oplus
E_q,
\qquad
E_q:=D_q\cap T_qS
$$

となり、E_q の次元は k-1 です。

E が S 上の滑らかな分布であることを確認します。j=2,\dots,k について

$$
Y_j
=
X_j-dt(X_j)X_1
$$

と置きます。dt(X_1)=1 なので

$$
dt(Y_j)=0.
$$

従って Y_j は t=\text{const.} の各超曲面に接し、特に S 上で T S に接します。また X_1,\dots,X_k が一次独立なので、S 上の

$$
Y_2,\dots,Y_k
$$

は E の局所枠になります。

次に E が S 上で対合的であることを示します。E の局所切断 A,B を取ります。X_1 の局所流を \Phi_t とし、A,B を流れで延長して

$$
\widetilde A_{\Phi_t(q)}
=
d(\Phi_t)_q(A_q),
\qquad
\widetilde B_{\Phi_t(q)}
=
d(\Phi_t)_q(B_q)
$$

と定めます。

[対合的分布はその局所切断の流れで保存される補題](#lem-geo6-flow-invariance)から

$$
\widetilde A,\widetilde B\in D.
$$

直線化座標では \Phi_t は

$$
(t_0,z)\longmapsto(t_0+t,z)
$$

なので、S の接方向は各 t=\text{const.} の接方向へ送られます。従って

$$
dt(\widetilde A)=dt(\widetilde B)=0.
$$

D の対合性から

$$
[\widetilde A,\widetilde B]\in D.
$$

また $t$ 成分が0の二つの滑らかなベクトル場の Lie 括弧も $t$ 成分が0なので

$$
[\widetilde A,\widetilde B]\in\ker dt.
$$

$t=0$ に制限すると

$$
[\widetilde A,\widetilde B]|_S
\in
D\cap TS
=
E.
$$

直線化座標では $\widetilde A,\widetilde B$ は $\partial_t$ 成分を持たないため、$t=0$ 上で計算した 周囲多様体上の Lie 括弧は、$S$ 上の滑らかなベクトル場 $A,B$ の Lie 括弧と一致します。したがって

$$
[A,B]\in E.
$$

よって $E$ は $S$ 上で対合的です。

E の階数は k-1 なので帰納法の仮定を適用できます。p の S 内の近傍で座標

$$
(z^2,\dots,z^n)
$$

を選び、

$$
E
=
\operatorname{span}
\{\partial_{z^2},\dots,\partial_{z^k}\}
$$

とできます。

最後に、これらの座標を X_1 の流れに沿って一定に延長します。すなわち

$$
u^1(\Phi_t(q))=t,
$$

$$
u^a(\Phi_t(q))=z^a(q)
\qquad(a=2,\dots,n)
$$

と置きます。[GEO5 のベクトル場の直線化定理](../GEO5/index.md#thm-geo5-flow-box)で用いた写像

$$
(t,q)\longmapsto\Phi_t(q)
$$

は局所微分同相なので、これは p の近傍の局所座標です。

この座標で

$$
X_1=\partial_{u^1}.
$$

また $a=2,\dots,k$ に対し、$\partial_{z^a}$ を $X_1$ の流れで押し出したベクトルは

$$
\partial_{u^a}
$$

です。[対合的分布はその局所切断の流れで保存される補題](#lem-geo6-flow-invariance)から

$$
\partial_{u^a}\in D
\qquad(a=2,\dots,k).
$$

従って

$$
\operatorname{span}
\{\partial_{u^1},\dots,\partial_{u^k}\}
\subset D.
$$

両辺の次元は k なので等号です。

よって D に適応した局所座標が存在します。$\square$
<!-- proof-end -->

### どの仮定がどこで効いたか

- **階数が一定**：横断面上の E=D\cap TS の次元を k-1 に保ち、帰納法で滑らかな分布として扱うために必要です。
- **滑らかさ**：局所枠と局所流を作り、[GEO5 のベクトル場の直線化定理](../GEO5/index.md#thm-geo5-flow-box)を適用するために必要です。
- **対合性**：D が X_1 の流れで保存されることと、横断面上の E が Lie 括弧で閉じることに使います。
- **$X_1$ が非零**：[GEO5 のベクトル場の直線化定理](../GEO5/index.md#thm-geo5-flow-box)で第一方向を $\partial_t$ に直すために必要です。局所枠の一員なので自動的に非零です。

---

## 9. Frobenius は局所的な保存量の存在定理でもある

<a id="prop-geo6-first-integrals"></a>
<!-- formal-statement-start -->
> **命題（適応座標と局所第一積分）**  
> $D$ を階数 $k$ の滑らかな線形分布とする。$p$ の近傍 $U$ について次は同値である。
>
> 1. $U$ に $D$ の適応座標が存在する。
> 2. 沈め込み
>
$$
F=(f^{k+1},\dots,f^n):U\to\mathbb R^{n-k}
$$
>
> が存在して
>
$$
D_q=\ker dF_q
$$
>
> が全ての $q\in U$ で成り立つ。
<!-- formal-statement-end -->

<!-- proof-start -->
### 証明

1 を仮定し、適応座標を

$$
(u^1,\dots,u^n)
$$

とします。

$$
F=(u^{k+1},\dots,u^n)
$$

と置けば、座標関数の微分は独立なので F は沈め込みです。また

$$
dF(\partial_{u^i})=0
\qquad(i=1,\dots,k),
$$

したがって

$$
D\subset\ker dF.
$$

両辺の次元は k なので等号です。

逆に 2 を仮定します。F は沈め込みなので [GEO3 の沈め込みの局所標準形](../GEO3/index.md#cor-geo3-submersion-normal-form)から p の近くで座標

$$
(u^1,\dots,u^n)
$$

を選び、

$$
F(u)
=
(u^{k+1},\dots,u^n)
$$

とできます。従って

$$
\ker dF
=
\operatorname{span}
\{\partial_{u^1},\dots,\partial_{u^k}\}
=
D.
$$

よってこの座標は D に適応しています。$\square$
<!-- proof-end -->

従って [Frobenius の定理](#thm-geo6-frobenius)は、対合的な階数 k 分布に対して局所的に n-k 個の独立な関数が存在し、その共通の逆像 $F^{-1}(c)$ が積分多様体になることも述べています。

---

## 10. 定階数条件を外すと同じ定理ではなくなる

例えば $\mathbb R^2$ 上で

$$
D_{(x,y)}
=
\operatorname{span}\{x\partial_x\}
$$

と書きたくなる状況を考えます。x\ne0 では一次元ですが、x=0 では零次元になります。

これは本章の意味での一定階数の滑らかな線形分布ではありません。したがって [Frobenius の定理](#thm-geo6-frobenius)をそのまま適用できません。

壊れるのは単なる定義上の都合ではありません。証明では局所枠の本数を一定に保ち、

$$
D_q
=
\operatorname{span}\{X_1(q),\dots,X_k(q)\}
$$

として一本を flow-box で直し、残りを階数 k-1 の分布へ落としました。階数が変わるとこの帰納構造自体が崩れます。

階数が変化する「特異分布」には Stefan--Sussmann 型の理論がありますが、本章では扱いません。

---

## 11. 演習

### GEO6-A01 定分布の積分多様体

$\mathbb R^4$ 上で

$$
D
=
\operatorname{span}
\{\partial_{x_1},\partial_{x_2}\}
$$

とする。

1. D が滑らかな階数2分布であることを確認せよ。
2. D が対合的であることを示せ。
3. D の積分多様体を明示せよ。
4. 適応座標を一つ与えよ。

- Level: A
- 狙い: 分布・対合性・積分多様体・適応座標を最小例で結びつける

<!-- solution-start -->
**詳細解答**

$X_1=\partial_{x_1}$、$X_2=\partial_{x_2}$ は全空間で滑らかかつ一次独立なので、$D$ は階数2の滑らかな線形分布です。

座標方向 $\partial_{x_1},\partial_{x_2}$ は互いに可換なので

$$
[X_1,X_2]=0\in D.
$$

局所枠判定から D は対合的です。

x_3=c_3, x_4=c_4 を固定した平面

$$
S_{c_3,c_4}
=
\{(x_1,x_2,c_3,c_4)\}
$$

では

$$
T_pS_{c_3,c_4}
=
\operatorname{span}
\{\partial_{x_1},\partial_{x_2}\}
=
D_p.
$$

従ってこれらが積分多様体です。

元の座標

$$
(x_1,x_2,x_3,x_4)
$$

自体が D に適応しています。
<!-- solution-end -->

### GEO6-A02 接触型分布の非可積分性

\mathbb R^3 上で

$$
X=\partial_x,
\qquad
Y=\partial_y+x\partial_z,
\qquad
D=\operatorname{span}\{X,Y\}
$$

とする。

1. X,Y がどの点でも一次独立であることを示せ。
2. [X,Y] を計算せよ。
3. [X,Y]\notin D を示せ。
4. [Frobenius の定理](#thm-geo6-frobenius)から $D$ が可積分でないことを結論せよ。

- Level: A
- 狙い: Lie 括弧が分布の外へ出ることから非可積分性を判定する

<!-- solution-start -->
**詳細解答**

X と Y の x,y 成分はそれぞれ

$$
(1,0),
\qquad
(0,1)
$$

なので一次独立です。従って D は階数2です。

座標公式から

$$
[X,Y]
=
[\partial_x,\partial_y+x\partial_z]
=
\partial_z.
$$

もし \partial_z=aX+bY と書けるなら

$$
\partial_z
=
a\partial_x+b\partial_y+bx\partial_z.
$$

x 成分から a=0、y 成分から b=0 です。しかしそのとき右辺の z 成分も0で、左辺の z 成分1と矛盾します。

従って

$$
[X,Y]=\partial_z\notin D.
$$

よって $D$ は対合的ではありません。[Frobenius の定理](#thm-geo6-frobenius)より $D$ は可積分ではありません。
<!-- solution-end -->

### GEO6-A03 正則レベル集合から作る分布

\mathbb R^3 上で

$$
f(x,y,z)=z-xy
$$

とし、

$$
D_p=\ker df_p
$$

とする。

1. df がどの点でも0でないことを示し、D が階数2の滑らかな分布になることを説明せよ。
2. D の局所枠として
   $$
   X=\partial_x+y\partial_z,
   \qquad
   Y=\partial_y+x\partial_z
   $$
   を取れることを示せ。
3. [X,Y] を計算せよ。
4. 積分多様体を求めよ。

- Level: A
- 狙い: 核分布・Lie 括弧・正則レベル集合を直接計算で接続する

<!-- solution-start -->
**詳細解答**

微分は

$$
df=-y\,dx-x\,dy+dz.
$$

dz の係数が常に1なので df_p\ne0 です。従って f は沈め込みで、\ker df_p は常に2次元です。

X に対して

$$
df(X)
=
-y\cdot1-x\cdot0+1\cdot y
=
0.
$$

Y に対して

$$
df(Y)
=
-y\cdot0-x\cdot1+1\cdot x
=
0.
$$

また X,Y の x,y 成分は (1,0),(0,1) なので一次独立です。従って

$$
D=\operatorname{span}\{X,Y\}.
$$

Lie 括弧の z 成分は

$$
X(x)-Y(y)=1-1=0
$$

で、他の成分も0なので

$$
[X,Y]=0.
$$

積分多様体は $f$ の正則レベル集合

$$
z-xy=c
$$

です。[GEO3 の正則レベル集合の接空間](../GEO3/index.md#thm-geo3-level-tangent-kernel)から、その接空間は $\ker df=D$ です。
<!-- solution-end -->

### GEO6-A04 局所枠だけで対合性を判定する

\mathbb R^3 上で

$$
X_1=\partial_x,
\qquad
X_2=e^x\partial_y,
\qquad
D=\operatorname{span}\{X_1,X_2\}
$$

とする。

1. [X_1,X_2] を計算せよ。
2. D が対合的であることを示せ。
3. $D$ と $\operatorname{span}\{\partial_x,\partial_y\}$ が同じ分布であることを示せ。
4. 積分多様体を求めよ。

- Level: A
- 狙い: 局所枠が可換でなくても括弧が分布内に残ればよいことを確認する

<!-- solution-start -->
**詳細解答**

$$
[X_1,X_2]
=
[\partial_x,e^x\partial_y]
=
e^x\partial_y
=
X_2.
$$

従って局所枠どうしの括弧は D に入ります。局所枠判定から D は対合的です。

e^x はどこでも0でないので

$$
\operatorname{span}\{\partial_x,e^x\partial_y\}
=
\operatorname{span}\{\partial_x,\partial_y\}.
$$

したがって積分多様体は

$$
z=c
$$

です。

この例では局所枠 X_1,X_2 自体は可換ではありませんが、分布としては座標平面分布と同じです。Frobenius が要求するのは「選んだ局所枠が可換」ではなく「括弧が分布から出ない」ことです。
<!-- solution-end -->

### GEO6-B01 非自明な適応座標を作る

\mathbb R^3 上で

$$
X=\partial_x+y\partial_z,
\qquad
Y=\partial_y+x\partial_z,
\qquad
D=\operatorname{span}\{X,Y\}
$$

とする。

1. [X,Y]=0 を示せ。
2.
   $$
   u=x,\qquad v=y,\qquad w=z-xy
   $$
   が大域座標になることを示せ。
3. $X=\partial_u$、$Y=\partial_v$ を示せ。
4. D の積分多様体を新座標と元の座標の両方で記述せよ。

- Level: B
- 狙い: Frobenius の適応座標を具体的に構成し、第一積分を読み取る

<!-- solution-start -->
**詳細解答**

座標公式から

$$
[X,Y]^z
=
X(x)-Y(y)
=
1-1
=
0
$$

で、x,y 成分も0なので

$$
[X,Y]=0.
$$

写像

$$
(x,y,z)\longmapsto(u,v,w)=(x,y,z-xy)
$$

の逆は

$$
x=u,\qquad y=v,\qquad z=w+uv
$$

です。両方向とも多項式なので滑らかで、大域微分同相です。

X を新座標へ作用させると

$$
X(u)=1,\qquad X(v)=0,
$$

$$
X(w)
=
X(z-xy)
=
y-y
=
0.
$$

従って $X=\partial_u$ です。

同様に

$$
Y(u)=0,\qquad Y(v)=1,
$$

$$
Y(w)
=
Y(z-xy)
=
x-x
=
0,
$$

なので $Y=\partial_v$ です。

従って

$$
D=\operatorname{span}\{\partial_u,\partial_v\}.
$$

積分多様体は新座標では

$$
w=c,
$$

元の座標では

$$
z-xy=c
$$

です。
<!-- solution-end -->

### GEO6-B02 核分布はなぜ対合的か

$U\subset\mathbb R^n$ を開集合、$F:U\to\mathbb R^{n-k}$ を滑らかな沈め込みとし、

$$
D=\ker dF
$$

とする。D の局所切断 X,Y に対し [X,Y] も D の局所切断であることを、F の各成分関数を用いて直接証明せよ。

- Level: B
- 狙い: 「共通の正則逆像へ接する方向は Lie 括弧で閉じる」を関数への作用から証明する

<!-- solution-start -->
**詳細解答**

F の成分を

$$
F=(F^1,\dots,F^{n-k})
$$

と書きます。

$X,Y\in D$ なので、各 $a$ について

$$
dF^a(X)=X(F^a)=0,
$$

$$
dF^a(Y)=Y(F^a)=0.
$$

従って

$$
\begin{aligned}
\bigl[X,Y\bigr](F^a)
&=
X(Y(F^a))-Y(X(F^a))\\
&=
X(0)-Y(0)\\
&=
0.
\end{aligned}
$$

よって全ての a について

$$
dF^a([X,Y])=0.
$$

すなわち

$$
[X,Y]\in
\bigcap_{a=1}^{n-k}\ker dF^a
=
\ker dF
=
D.
$$

従って D は対合的です。

この証明では正則逆像そのものを先に作らなくても、保存量 F^a を X,Y が変化させないことから対合性が直接出ています。
<!-- solution-end -->

### GEO6-B03 流れ保存補題の線形 ODE を追う

D を対合的な階数 k 分布、X を D の局所切断とする。局所枠 E_1,\dots,E_k が

$$
[X,E_j]
=
\sum_{\ell=1}^k a_j^\ell E_\ell
$$

を満たすとする。

X の流れを \Phi_t とし、

$$
Z_j(t)
=
d(\Phi_{-t})_{\Phi_t(q)}E_j(\Phi_t(q))
$$

と置く。

1. Z_j'(t) が Z_1(t),\dots,Z_k(t) の線形結合になることを示せ。
2. 行列 Z(t)=(Z_1(t),\dots,Z_k(t)) が
   $$
   Z'(t)=Z(t)A(t)
   $$
   型の線形方程式を満たすことを説明せよ。
3. Z_1(t),\dots,Z_k(t) が十分小さい t で一次独立のままである理由を述べよ。
4. 以上から d\Phi_t(D_q)=D_{\Phi_t(q)} を導け。

- Level: B
- 狙い: Frobenius 証明の核心である「対合性 \Rightarrow 流れ不変性」を自力再現する

<!-- solution-start -->
**詳細解答**

[GEO5 の流れによる Lie 括弧の公式](../GEO5/index.md#thm-geo5-bracket-flow)から

$$
Z_j'(t)
=
d(\Phi_{-t})_{\Phi_t(q)}
[X,E_j]_{\Phi_t(q)}.
$$

括弧の表示を代入すると

$$
Z_j'(t)
=
\sum_{\ell=1}^k
a_j^\ell(\Phi_t(q))
Z_\ell(t).
$$

従って各 Z_j' は Z_\ell の線形結合です。

列ベクトルを並べた行列記法を使えば、係数

$$
A(t)
=
(a_j^\ell(\Phi_t(q)))_{\ell j}
$$

により

$$
Z'(t)=Z(t)A(t)
$$

と書けます。

初期時刻では

$$
Z_j(0)=E_j(q)
$$

であり、E_1(q),\dots,E_k(q) は一次独立です。線形方程式の基本行列 C(t) を

$$
C'(t)=C(t)A(t),
\qquad
C(0)=I
$$

で定めると

$$
Z(t)=Z(0)C(t).
$$

det C(0)=1 で、det C(t) は連続なので十分小さい t で0になりません。従って C(t) は可逆で、Z_j(t) は一次独立のままです。

よって

$$
\operatorname{span}\{Z_1(t),\dots,Z_k(t)\}
=
D_q.
$$

d\Phi_t を作用させると

$$
D_{\Phi_t(q)}
=
d(\Phi_t)_q(D_q).
$$

これが[対合的分布はその局所切断の流れで保存される補題](#lem-geo6-flow-invariance)です。
<!-- solution-end -->

### GEO6-C01 対合性・適応座標・第一積分の同値

M 上の階数 k の滑らかな線形分布 D について、p の十分小さい近傍で次が同値であることを示せ。

1. D は対合的である。
2. D に適応した局所座標が存在する。
3. 独立な n-k 個の滑らかな関数
   $$
   f^{k+1},\dots,f^n
   $$
   が存在し、
   $$
   D
   =
   \bigcap_{a=k+1}^n\ker df^a
   $$
   となる。
4. p の近傍が k 次元積分多様体の局所族
   $$
   f^{k+1}=c^{k+1},\dots,f^n=c^n
   $$
   で埋め尽くされる。

各含意で、[Frobenius の定理](#thm-geo6-frobenius)、[GEO3 の沈め込みの局所標準形](../GEO3/index.md#cor-geo3-submersion-normal-form)、[GEO3 の正則レベル集合の接空間](../GEO3/index.md#thm-geo3-level-tangent-kernel)のどれを使うか明示せよ。

- Level: C
- 狙い: [Frobenius の定理](#thm-geo6-frobenius)を「Lie 括弧」「座標」「保存量」「葉」の四つの姿で統合する

<!-- solution-start -->
**詳細解答**

まず $1\Rightarrow2$ は [Frobenius の定理](#thm-geo6-frobenius)そのものです。D が対合的なら、p の近傍で

$$
D
=
\operatorname{span}
\{\partial_{u^1},\dots,\partial_{u^k}\}
$$

となる適応座標

$$
(u^1,\dots,u^n)
$$

が存在します。

次に 2 \Rightarrow 3 を示します。

$$
f^a=u^a
\qquad(a=k+1,\dots,n)
$$

と置きます。座標関数の微分

$$
du^{k+1},\dots,du^n
$$

は一次独立です。また $i\le k$ なら

$$
du^a(\partial_{u^i})=0.
$$

したがって

$$
D
\subset
\bigcap_{a=k+1}^n\ker du^a.
$$

右辺の次元も k なので

$$
D
=
\bigcap_{a=k+1}^n\ker df^a.
$$

3 \Rightarrow 4 を示します。写像

$$
F=(f^{k+1},\dots,f^n)
$$

を考えます。df^{k+1},\dots,df^n が独立なので dF は全射、すなわち F は沈め込みです。

従って各 $c$ に対する局所的な正則逆像

$$
F^{-1}(c)
$$

は [GEO3 の正則値定理](../GEO3/index.md#thm-geo3-regular-value) により k 次元埋め込み部分多様体です。その接空間は

$$
T_qF^{-1}(c)
=
\ker dF_q
=
D_q.
$$

よって各正則逆像は積分多様体です。また各 $q$ は $c=F(q)$ の逆像上にあるので、近傍はこれらの局所積分多様体で埋め尽くされます。

最後に $4\Rightarrow1$ を示します。4 から各点を通る積分多様体が存在するので D は可積分です。[可積分なら対合的](#prop-geo6-integrable-implies-involutive) により D は対合的です。

従って

$$
1\Longleftrightarrow2\Longleftrightarrow3\Longleftrightarrow4.
$$

この同値は Frobenius の内容を四つの見方へ翻訳しています。

- Lie 括弧：許された方向が交換操作で閉じる。
- 適応座標：許された方向を最初の k 本の座標方向へ直せる。
- 第一積分：n-k 個の独立な量が許された方向に沿って一定。
- 積分多様体：その保存量の共通の正則逆像が $k$ 次元の葉になる。
<!-- solution-end -->

---

## 12. まとめ

階数 k の滑らかな線形分布は、各点で

$$
D_p\subset T_pM
$$

という k 次元の許容方向を滑らかに指定するものです。

その方向が実際の k 次元部分多様体の接空間になるには、二つの局所切断を Lie 括弧しても外へ出ないこと、

$$
X,Y\in D
\Longrightarrow
[X,Y]\in D
$$

が必要です。

[Frobenius の定理](#thm-geo6-frobenius)は、この必要条件が局所的には十分でもあることを述べます。

$$
\boxed{
\text{可積分}
\Longleftrightarrow
\text{対合的}
\Longleftrightarrow
\text{適応座標が存在}
}
$$

難しい向きでは、一本の非零な滑らかなベクトル場を[GEO5 のベクトル場の直線化定理](../GEO5/index.md#thm-geo5-flow-box)で直線化し、対合性からその流れが分布を保存することを示しました。そのうえで横断面上の階数 k-1 の分布へ帰着し、帰納法で適応座標を構成しました。

さらに適応座標の残り n-k 個の座標関数をまとめると沈め込み

$$
F:U\to\mathbb R^{n-k}
$$

が得られ、

$$
D=\ker dF
$$

となります。したがって積分多様体は $F$ の局所的な正則逆像です。

次の GEO7 では、接方向そのものから、その上で多重線形に値を測るテンソル場・微分形式へ進みます。そこで外微分を導入すると、Frobenius の対合性は余接側からも表現できるようになります。