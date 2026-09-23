# LIE4 群が多様体を動かすとき

<!-- definition-example-audit: strict -->

[LIE3](../LIE3/index.md) までで、Lie 群そのものを微分し、部分群と古典群の接 Lie 環を計算できるようになりました。本章では視点を変え、Lie 群が別の多様体を滑らかに動かすとき、その運動を単位元近くの線形データへ落とします。

[GRP3](../GRP3/index.md) の集合上の群作用・軌道・安定化群は既知とします。ここではそれらを再定義せず、滑らかさ、多様体構造、接空間を追加します。[GEO7](../GEO7/index.md) の微分形式と外微分も既知とし、最後に Lie 括弧が1形式の微分方程式として現れるところまで進みます。

主線は

$$
\text{滑らかな作用}
\longrightarrow
\text{軌道写像と安定化群}
\longrightarrow
\text{接ベクトルによる作用}
\longrightarrow
\text{剰余類の多様体}
\longrightarrow
\text{単位元へ戻す1形式}
\longrightarrow
\text{Lie 括弧の構造方程式}
$$

です。

> **この章の停止線**
>
> 一般表現論、半単純 Lie 環、ルート系、主束、接続形式、ゲージ理論 は扱いません。本章では有限次元 Lie 群の滑らかな作用と、その作用から自然に現れる商空間・1形式までを閉じます。

---

## 1. 集合上の作用に滑らかさを加える

<a id="def-lie4-smooth-action"></a>
<!-- formal-statement-start -->
> **定義（Lie 群作用）**
>
> Lie 群 $G$ と滑らかな多様体 $M$ に対し、[GRP3 の群作用](../GRP3/index.md#def-grp3-group-action)
>
$$
\Phi:G\times M\to M,
\qquad
(g,p)\mapsto g\cdot p
$$
>
> が滑らかな写像であるとき、これを $G$ の $M$ への **Lie 群作用**という。
<!-- formal-statement-end -->

<!-- definition-example-start: def-lie4-smooth-action -->
**定義の確認：$SO(2)$ が平面を回す作用**

[LIE3 の特殊直交群](../LIE3/index.md#def-lie3-orthogonal-groups)の元を

$$
R_\theta=
\begin{pmatrix}
\cos\theta&-\sin\theta\\
\sin\theta&\cos\theta
\end{pmatrix}
$$

と書き、

$$
R_\theta\cdot
\begin{pmatrix}
x\\y
\end{pmatrix}
=
\begin{pmatrix}
x\cos\theta-y\sin\theta\\
x\sin\theta+y\cos\theta
\end{pmatrix}
$$

と定めます。

単位元 $R_0=I$ は各点を固定し、

$$
R_\theta(R_\varphi p)=R_{\theta+\varphi}p
$$

なので作用の2公理を満たします。また右辺の各成分は $\theta,x,y$ の滑らかな関数です。従って作用写像

$$
SO(2)\times\mathbb R^2\to\mathbb R^2
$$

は滑らかで、これは Lie 群作用です。
<!-- definition-example-end -->

各 $g\in G$ を固定して

$$
\Phi_g:M\to M,
\qquad
\Phi_g(p)=g\cdot p
$$

と置きます。作用則から

$$
\Phi_g\circ\Phi_{g^{-1}}=\operatorname{id}_M
$$

なので、$\Phi_g$ は逆写像 $\Phi_{g^{-1}}$ を持つ微分同相写像です。

つまり Lie 群作用では、群の各元が多様体の滑らかな対称変換として働きます。

---

## 2. 一点を動かす写像と、一点を固定する部分群

$x\in M$ を固定します。[GRP3 の軌道・安定化群](../GRP3/index.md#def-grp3-orbit-stabilizer)を

$$
G\cdot x=\{g\cdot x:g\in G\},
\qquad
G_x=\{g\in G:g\cdot x=x\}
$$

と書きます。

また、作用写像の第2変数を $x$ に固定した写像を使います。

<a id="def-lie4-orbit-map"></a>
<!-- formal-statement-start -->
> **定義（軌道写像）**
>
> Lie 群作用 $\Phi:G\times M\to M$ と $x\in M$ に対し、
>
$$
\Phi_x:G\to M,
\qquad
\Phi_x(g)=g\cdot x
$$
>
> と定める。この滑らかな写像を $x$ における **軌道写像**という。
<!-- formal-statement-end -->

<a id="prop-lie4-stabilizer-lie-subgroup"></a>
<!-- formal-statement-start -->
> **命題（安定化群は閉 Lie 部分群）**
>
> Lie 群 $G$ が滑らかな多様体 $M$ に作用し、$x\in M$ とする。このとき安定化群 $G_x$ は $G$ の閉部分群であり、従って [LIE3 の閉部分群定理](../LIE3/index.md#thm-lie3-closed-subgroup)により Lie 部分群である。
<!-- formal-statement-end -->

### 証明の見取り図

群論として $G_x$ が部分群であることは GRP3 で証明済みです。新しい点は閉性です。$G_x$ は軌道写像で一点 $x$ を引き戻した集合なので、多様体の Hausdorff 性から閉集合になります。

<!-- proof-start -->
### 証明

[GRP3 の「安定化群は部分群」](../GRP3/index.md#prop-grp3-stabilizer-subgroup)により $G_x$ は部分群です。

多様体 $M$ は Hausdorff なので一点集合 $\{x\}$ は閉集合です。軌道写像 $\Phi_x$ は滑らか、従って連続なので

$$
G_x
=
\Phi_x^{-1}(\{x\})
$$

は $G$ の閉集合です。

従って $G_x$ は $G$ の閉部分群です。[LIE3 の閉部分群定理](../LIE3/index.md#thm-lie3-closed-subgroup)を適用すると、$G_x$ は一意な埋め込み Lie 部分群構造を持ちます。$\square$
<!-- proof-end -->

この命題が重要なのは、集合論的な「点を固定する群」が自動的に滑らかな部分群になることです。以後

$$
\mathfrak g_x:=T_eG_x
$$

を安定化群の Lie 環と書けます。

---

## 3. 群の接ベクトルを多様体上の滑らかな運動方向へ移す

$X\in\mathfrak g=T_eG$ を取ります。[LIE2 の Lie 群の指数写像](../LIE2/index.md#def-lie2-exponential-map)により

$$
t\longmapsto \exp(tX)
$$

は $G$ の1パラメータ部分群です。これを作用させれば、各点 $p\in M$ に曲線

$$
t\longmapsto \exp(tX)\cdot p
$$

が得られます。

<a id="def-lie4-fundamental-vector-field"></a>
<!-- formal-statement-start -->
> **定義（基本ベクトル場・無限小作用）**
>
> Lie 群作用 $\Phi:G\times M\to M$ と $X\in\mathfrak g$ に対し、
>
$$
(X_M)_p
:=
\left.
\frac{d}{dt}
\right|_{t=0}
\exp(tX)\cdot p
$$
>
> と定める。これにより得られる滑らかなベクトル場 $X_M$ を $X$ に対応する **基本ベクトル場** といい、線形写像
>
$$
\mathfrak g\to\mathfrak X(M),
\qquad
X\mapsto X_M
$$
>
> をこの作用の **無限小作用** という。
<!-- formal-statement-end -->

<!-- definition-example-start: def-lie4-fundamental-vector-field -->
**定義の確認：$SO(2)$ の基本ベクトル場**

§1 の $SO(2)$ 作用を考えます。[LIE3 の $\mathfrak{so}(2)$](../LIE3/index.md#thm-lie3-orthogonal)の生成元

$$
J=
\begin{pmatrix}
0&-1\\
1&0
\end{pmatrix}
$$

に対して

$$
e^{tJ}=R_t.
$$

従って

$$
(J_{\mathbb R^2})_{(x,y)}
=
\left.
\frac{d}{dt}
\right|_{0}
(x\cos t-y\sin t,\,
x\sin t+y\cos t)
=
(-y,x).
$$

つまり

$$
J_{\mathbb R^2}
=
-y\frac{\partial}{\partial x}
+
x\frac{\partial}{\partial y}.
$$

原点では0になり、原点以外では円周に接する方向を向きます。群の軌道が「円」であることが、接ベクトルの段階ではこの基本ベクトル場の値として見えています。
<!-- definition-example-end -->

<a id="thm-lie4-fundamental-flow-antihom"></a>
<!-- formal-statement-start -->
> **定理（基本ベクトル場の流れと括弧）**
>
> Lie 群 $G$ が $M$ に作用し、$X,Y\in\mathfrak g$ とする。
>
> 1. $X_M$ の大域流は
>
$$
\Psi_t(p)=\exp(tX)\cdot p
$$
>
> で与えられる。
>
> 2. 本章の定義
>
$$
(X_M)_p=\left.\frac{d}{dt}\right|_0\exp(tX)\cdot p
$$
>
> では
>
$$
[X_M,Y_M]
=
-[X,Y]_M
$$
>
> が成り立つ。従って無限小作用は Lie 環の反準同型である。
<!-- formal-statement-end -->

### 証明の見取り図

第1項は1パラメータ部分群の群則をそのまま作用へ移したものです。第2項の符号は重要です。左作用から作った基本ベクトル場は、$G$ 自身への左作用では右不変ベクトル場になるため、Lie 括弧にマイナスが出ます。

完全証明では、作用による押し出しが随伴表現 $\operatorname{Ad}$ を生み、[GEO5 の流れによる Lie 括弧の解釈](../GEO5/index.md#thm-geo5-bracket-flow)と [LIE2 の $\operatorname{ad}_X(Y)=[X,Y]$](../LIE2/index.md#thm-lie2-infinitesimal-adjoint-bracket)を接続します。

<!-- proof-start -->
### 証明

まず

$$
\Psi_t(p):=\exp(tX)\cdot p
$$

と置きます。1パラメータ部分群の群則から

$$
\Psi_{t+s}(p)
=
\exp((t+s)X)\cdot p
=
\exp(tX)\cdot(\exp(sX)\cdot p)
=
\Psi_t(\Psi_s(p)).
$$

また $t=0$ での速度は定義より $X_M$ です。従って $\Psi_t$ は $X_M$ の流れです。

次に $g\in G$ と $Y\in\mathfrak g$ について、$\Phi_g(p)=g\cdot p$ と書きます。$q=g\cdot p$ とすると

$$
\begin{aligned}
d(\Phi_g)_p((Y_M)_p)
&=
\left.
\frac{d}{dt}
\right|_0
g\cdot(\exp(tY)\cdot p)\\
&=
\left.
\frac{d}{dt}
\right|_0
(g\exp(tY)g^{-1})\cdot q.
\end{aligned}
$$

[LIE2 の共役と Lie 群の指数写像の可換性](../LIE2/index.md#thm-lie2-conjugation-exponential)を共役自己同型 $C_g$ に適用すると

$$
g\exp(tY)g^{-1}
=
\exp(t\,\operatorname{Ad}_gY).
$$

従って

$$
(\Phi_g)_*Y_M
=
(\operatorname{Ad}_gY)_M.
$$

$X_M$ の流れは $\Phi_{\exp(tX)}$ なので、

$$
(\Psi_{-t})_*Y_M
=
(\operatorname{Ad}_{\exp(-tX)}Y)_M.
$$

$t=0$ で微分します。[LIE2 の無限小随伴作用](../LIE2/index.md#thm-lie2-infinitesimal-adjoint-bracket)から

$$
\left.
\frac{d}{dt}
\right|_0
\operatorname{Ad}_{\exp(-tX)}Y
=
-[X,Y].
$$

$Z\mapsto Z_M$ は線形なので

$$
\left.
\frac{d}{dt}
\right|_0
(\Psi_{-t})_*Y_M
=
-[X,Y]_M.
$$

一方、[GEO5 の流れによる Lie 括弧の解釈](../GEO5/index.md#thm-geo5-bracket-flow)により左辺は $[X_M,Y_M]$ です。従って

$$
[X_M,Y_M]
=
-[X,Y]_M.
$$

$\square$
<!-- proof-end -->

### 3.1 軌道の接方向と安定化群の Lie 環

評価写像

$$
\alpha_x:\mathfrak g\to T_xM,
\qquad
\alpha_x(X)=(X_M)_x
$$

を考えます。定義から

$$
\alpha_x
=
d(\Phi_x)_e
$$

です。

<a id="thm-lie4-stabilizer-kernel-orbit-rank"></a>
<!-- formal-statement-start -->
> **定理（安定化 Lie 環と軌道方向）**
>
> Lie 群 $G$ が $M$ に作用し、$x\in M$ とする。このとき
>
$$
\ker d(\Phi_x)_e
=
\mathfrak g_x.
$$
>
> また軌道写像 $\Phi_x:G\to M$ の階数は $G$ 上で一定であり、
>
$$
\operatorname{rank}d(\Phi_x)
=
\dim G-\dim G_x.
$$
<!-- formal-statement-end -->

### 証明の見取り図

$\mathfrak g_x$ に属する接ベクトルは安定化群の中の曲線で表せるので、軌道写像で送れば速度0です。逆向きでは、$d(\Phi_x)_eX=0$ なら基本ベクトル場 $X_M$ が $x$ で0です。$X_M$ の流れの一意性から $x$ は全時刻で固定され、$\exp(tX)\in G_x$ になります。

階数一定性は、任意の $g$ での微分が左移動と作用の微分で単位元の微分へ移せることから出ます。

<!-- proof-start -->
### 証明

$X\in\mathfrak g_x=T_eG_x$ とします。$G_x$ 内の滑らかな曲線 $c(t)$ で

$$
c(0)=e,
\qquad
c'(0)=X
$$

を取れます。全ての $t$ で $c(t)\cdot x=x$ なので

$$
d(\Phi_x)_eX
=
\left.
\frac{d}{dt}
\right|_0
c(t)\cdot x
=
0.
$$

従って

$$
\mathfrak g_x\subset\ker d(\Phi_x)_e.
$$

逆に $d(\Phi_x)_eX=0$ とします。これは

$$
(X_M)_x=0
$$

を意味します。定理より $X_M$ の流れは

$$
t\mapsto\exp(tX)\cdot p
$$

です。点 $x$ では定数曲線 $t\mapsto x$ も $X_M$ の積分曲線です。積分曲線の一意性により

$$
\exp(tX)\cdot x=x
$$

が全ての $t$ で成り立ちます。従って $\exp(tX)\in G_x$ であり、$t=0$ で微分して

$$
X\in T_eG_x=\mathfrak g_x.
$$

よって

$$
\ker d(\Phi_x)_e=\mathfrak g_x.
$$

次に任意の $g\in G$ を取ります。$L_g:G\to G$ を左移動とすると

$$
\Phi_x\circ L_g
=
\Phi_g\circ\Phi_x
$$

です。$e$ で微分して

$$
d(\Phi_x)_g\circ d(L_g)_e
=
d(\Phi_g)_x\circ d(\Phi_x)_e.
$$

$d(L_g)_e$ と $d(\Phi_g)_x$ はどちらも線形同型なので

$$
\operatorname{rank}d(\Phi_x)_g
=
\operatorname{rank}d(\Phi_x)_e.
$$

従って階数は一定です。階数・退化次数の公式から

$$
\operatorname{rank}d(\Phi_x)
=
\dim\mathfrak g-\dim\ker d(\Phi_x)_e
=
\dim G-\dim G_x.
$$

$\square$
<!-- proof-end -->

この定理により、軌道の「自由に動ける方向の数」は、群の次元から点を固定してしまう方向の次元を引いたものになります。

§1 の $SO(2)$ 作用では、原点の安定化群は $SO(2)$ 全体なので軌道次元は0です。原点以外の点では安定化群は単位元だけなので軌道次元は1です。

---

## 4. 左剰余類に滑らかな構造を入れる

集合としての左剰余類 $G/H$ は GRP2 で既知です。ここでは $H$ が閉 Lie 部分群なら、その剰余類集合自体が自然な多様体になることを証明します。

<a id="thm-lie4-quotient-manifold"></a>
<!-- formal-statement-start -->
> **定理（閉 Lie 部分群による商多様体）**
>
> $G$ を有限次元 Lie 群、$H\subset G$ を閉 Lie 部分群とする。剰余類集合 $G/H$ に商位相を入れる。
>
> このとき $G/H$ には、商写像
>
$$
q:G\to G/H,
\qquad
q(g)=gH
$$
>
> が滑らかな沈め込みになる一意な滑らかな多様体構造が存在する。
>
> さらに
>
$$
\dim(G/H)=\dim G-\dim H,
$$
>
> 単位剰余類 $eH$ では
>
$$
T_{eH}(G/H)
\cong
\mathfrak g/\mathfrak h,
\qquad
\ker dq_e=\mathfrak h
$$
>
> が成り立つ。
<!-- formal-statement-end -->

### 証明の見取り図

$\mathfrak h=T_eH$ の線形補空間 $\mathfrak m$ を選び、

$$
\mathfrak g=\mathfrak m\oplus\mathfrak h
$$

とします。Lie 群の指数写像を使って

$$
F(X,Y)=\exp(X)\exp(Y)
$$

を考えると、$(0,0)$ での微分は $(X,Y)\mapsto X+Y$ です。これは線形同型なので逆関数定理により、単位元近くの $G$ は

$$
\text{横方向 }\exp(\mathfrak m)
\times
\text{部分群方向 }\exp(\mathfrak h)
$$

という局所積に分解できます。剰余類を取ると後者だけが消え、$\mathfrak m$ が $G/H$ の局所座標になります。

<!-- proof-start -->
### 証明

$\mathfrak h=T_eH$ の線形補空間 $\mathfrak m$ を選び、

$$
\mathfrak g
=
\mathfrak m\oplus\mathfrak h
$$

とします。写像

$$
F:\mathfrak m\times\mathfrak h\to G,
\qquad
F(X,Y)=\exp(X)\exp(Y)
$$

を考えます。

[LIE2 の Lie 群の指数写像の微分](../LIE2/index.md#thm-lie2-exponential-basic)から $d\exp_0=\operatorname{id}_{\mathfrak g}$ です。積写像の単位元での微分は和なので

$$
dF_{(0,0)}(X,Y)=X+Y.
$$

$\mathfrak g=\mathfrak m\oplus\mathfrak h$ よりこれは線形同型です。[逆関数定理](../RA6A/index.md#thm-ra6a-inverse-function)を適用すると、$0$ の近傍 $U_{\mathfrak m}\subset\mathfrak m$、$U_{\mathfrak h}\subset\mathfrak h$ を十分小さく取れば、

$$
F:
U_{\mathfrak m}\times U_{\mathfrak h}
\longrightarrow
W
$$

は $e$ のある開近傍 $W\subset G$ への微分同相写像になります。

[LIE3 の部分群における Lie 群の指数写像の制限則](../LIE3/index.md#thm-lie3-subgroup-exponential)により

$$
\exp(U_{\mathfrak h})\subset H.
$$

さらに近傍を縮めれば、$W$ の中の $H$ はちょうど $F(\{0\}\times U_{\mathfrak h})$ です。実際 $h\in H\cap W$ を

$$
h=\exp(X)\exp(Y)
$$

と一意に書くと、$\exp(Y)\in H$ なので $\exp(X)\in H$ です。Lie 群の指数写像は0の近くで局所微分同相であり、$H$ 上の Lie 群の指数写像はその制限なので、十分小さい範囲では $\exp(X)\in H$ なら $X\in\mathfrak h$ です。一方 $X\in\mathfrak m$ なので

$$
X\in\mathfrak m\cap\mathfrak h=\{0\}.
$$

従って $X=0$ です。

ここで

$$
S:=\exp(U_{\mathfrak m})
$$

と置きます。必要ならさらに $U_{\mathfrak m}$ を縮めて $S^{-1}S\subset W$ とします。

商写像 $q:G\to G/H$ は開集合を開集合へ送ります。実際、$O\subset G$ が開なら

$$
q^{-1}(q(O))
=
OH
=
\bigcup_{h\in H}Oh
$$

は開です。従って $q(W)$ は $eH$ の開近傍です。

$W$ の各元は一意に

$$
s h,
\qquad
s\in S,\quad h\in\exp(U_{\mathfrak h})
$$

と書けるので

$$
q(W)=q(S).
$$

また $s_1,s_2\in S$ について $q(s_1)=q(s_2)$ なら

$$
s_2^{-1}s_1\in H.
$$

$s_2^{-1}s_1\in S^{-1}S\subset W$ なので、上で示した $H\cap W$ の記述と $W$ での積分解の一意性から $s_1=s_2$ です。従って

$$
q|_S:S\to q(W)
$$

は全単射です。

この全単射を使い、$q(W)$ の座標を $U_{\mathfrak m}$ で定めます。一般の $gH$ の近くでは左移動した $gW$ を用います。二つの座標近傍の重なりでは、$g'^{-1}g$ を掛けた後に局所積分解 $F^{-1}$ の $\mathfrak m$ 成分を取れば座標変換が得られます。群積、逆元、$F^{-1}$ は滑らかなので座標変換は滑らかです。

従って $G/H$ に滑らかな多様体構造が入ります。この座標では $q$ は局所的に

$$
U_{\mathfrak m}\times U_{\mathfrak h}
\to
U_{\mathfrak m},
\qquad
(X,Y)\mapsto X
$$

という射影です。従って $q$ は沈め込みです。

局所座標の次元から

$$
\dim(G/H)=\dim\mathfrak m=\dim G-\dim H.
$$

また $e$ では

$$
\ker dq_e=\mathfrak h,
$$

従って第一同型定理により

$$
T_{eH}(G/H)
\cong
\mathfrak g/\mathfrak h.
$$

最後に、この「$q$ が沈め込みになる」という条件は局所座標を $q$ から復元するので、多様体構造は一意です。$\square$
<!-- proof-end -->

この証明で閉性を使った場所は、$H$ が LIE3 の意味で埋め込み Lie 部分群として扱えることです。閉でない部分群では、剰余類空間が Hausdorff 多様体にならないことがあります。

### 4.1 自然な作用

$H$ が閉 Lie 部分群なら

$$
g\cdot(aH):=(ga)H
$$

は well-defined です。上の局所座標では各剰余類から代表元を局所的かつ滑らかに選べるため、この作用は滑らかです。また任意の $aH,bH$ に対し

$$
(ba^{-1})\cdot(aH)=bH
$$

なので全ての点を互いに移せます。

---

## 5. 全ての点が同じ見え方をする空間

<a id="def-lie4-homogeneous-space"></a>
<!-- formal-statement-start -->
> **定義（等質空間）**
>
> Lie 群 $G$ の滑らかな多様体 $M$ への Lie 群作用が **推移的**、すなわち任意の $x,y\in M$ に対してある $g\in G$ が存在し
>
$$
g\cdot x=y
$$
>
> となるとき、$M$ を $G$ の **等質空間**という。
<!-- formal-statement-end -->

<!-- definition-example-start: def-lie4-homogeneous-space -->
**定義の確認：球面は $SO(n)$ の等質空間**

$n\ge2$ とし、$SO(n)$ を単位球面

$$
S^{n-1}
=
\{x\in\mathbb R^n:\|x\|=1\}
$$

へ行列積で作用させます。行列積は滑らかで、$SO(n)$ は内積を保つので球面を球面へ送ります。

任意の $x,y\in S^{n-1}$ に対し、$x$ を第1ベクトルとする向き付き正規直交基底と、$y$ を第1ベクトルとする向き付き正規直交基底を選べます。一方の基底を他方へ送る線形写像は $SO(n)$ に属し、$x$ を $y$ へ送ります。

従って作用は推移的で、$S^{n-1}$ は $SO(n)$ の等質空間です。
<!-- definition-example-end -->

基点

$$
e_1=(1,0,\ldots,0)
$$

の安定化群は

$$
(SO(n))_{e_1}
=
\left\{
\begin{pmatrix}
1&0\\
0&B
\end{pmatrix}
:
B\in SO(n-1)
\right\}
\cong SO(n-1).
$$

従って球面は直感的には

$$
SO(n)/SO(n-1)
$$

です。次の定理がこれを一般化します。

<a id="thm-lie4-homogeneous-quotient"></a>
<!-- formal-statement-start -->
> **定理（等質空間は安定化群による商）**
>
> Lie 群 $G$ が多様体 $M$ に推移的に作用し、$x\in M$ とする。安定化群 $G_x$ に対し
>
$$
\overline{\Phi}_x:G/G_x\to M,
\qquad
gG_x\mapsto g\cdot x
$$
>
> は well-defined な $G$-同変微分同相写像である。
<!-- formal-statement-end -->

### 証明の見取り図

GRP3 ですでに剰余類と軌道の全単射を作りました。ここでは、その全単射が滑らかな世界でも正しいことを示します。

$G_x$ は閉 Lie 部分群なので §4 により $G/G_x$ は多様体です。微分の核は $\mathfrak g_x$ なので、商で固定方向を潰すと $\overline{\Phi}_x$ の微分は単射になります。推移性により写像は全射です。最後に、低次元多様体から高次元多様体へ局所的にはめ込んだ像の可算和が開集合全体を覆うことはできない、という Euclid 空間の次元事実から両者の次元が一致し、局所微分同相になります。

<!-- proof-start -->
### 証明

まず $gG_x=g'G_x$ なら $g'=gh$ となる $h\in G_x$ が存在し、

$$
g'\cdot x
=
g\cdot(h\cdot x)
=
g\cdot x.
$$

従って $\overline{\Phi}_x$ は well-defined です。

[GRP3 の剰余類と軌道の自然な全単射](../GRP3/index.md#thm-grp3-coset-orbit-bijection)と推移性から、$\overline{\Phi}_x$ は全単射です。

商写像 $q:G\to G/G_x$ に対して

$$
\Phi_x
=
\overline{\Phi}_x\circ q.
$$

§4 の座標で剰余類から代表元を局所的かつ滑らかに選べるので $\overline{\Phi}_x$ は滑らかです。

単位剰余類での微分を考えます。連鎖律から

$$
d(\Phi_x)_e
=
d(\overline{\Phi}_x)_{eG_x}\circ dq_e.
$$

§3 より

$$
\ker d(\Phi_x)_e=\mathfrak g_x,
$$

§4 より

$$
\ker dq_e=\mathfrak g_x.
$$

従って $d(\overline{\Phi}_x)_{eG_x}$ は単射です。$G$-同変性と各群要素による作用が微分同相であることから、全ての点で微分は単射です。従って $\overline{\Phi}_x$ ははめ込みです。

ここで

$$
r=\dim(G/G_x),
\qquad
m=\dim M
$$

とします。はめ込みなので $r\le m$ です。

$r<m$ と仮定して矛盾を導きます。[GEO3 のはめ込みの局所標準形](../GEO3/index.md#cor-geo3-immersion-normal-form)により、$G/G_x$ の各点 $z$ には閉包がコンパクトになる座標近傍 $U_z$ を十分小さく取れて、$\overline{U_z}$ の像全体がある $M$ の座標近傍に入り、その座標では

$$
\overline{\Phi}_x(\overline{U_z})
\subset
\mathbb R^r\times\{0\}
\subset
\mathbb R^m
$$

となります。

$G/G_x$ は第2可算なので、このような $U_z$ から可算部分被覆

$$
U_1,U_2,\ldots
$$

を選べます。各 $\overline{U_j}$ はコンパクトで、$M$ は Hausdorff なので

$$
F_j:=\overline{\Phi}_x(\overline{U_j})
$$

は閉集合です。また $r<m$ なので、上の局所標準形から $F_j$ は $M$ の非空開集合を含みません。従って $F_j$ は閉かつ内部が空、すなわち nowhere dense です。

ここで、多様体が可算個の nowhere dense な閉集合で覆えないことを、この場合に必要な形で確認します。もし

$$
M=\bigcup_{j=1}^{\infty}F_j
$$

なら、任意の非空座標球 $B_0$ から始め、$F_1$ の内部が空であることを使って

$$
\overline{B_1}\subset B_0\setminus F_1
$$

となる非空座標球 $B_1$ を取れます。同様に帰納的に、半径も $1/j$ 未満へ縮めながら

$$
\overline{B_j}
\subset
B_{j-1}\setminus F_j
$$

となる非空座標球 $B_j$ を取ります。最初の球の閉包をコンパクトに取っているので、入れ子になったコンパクト集合

$$
\overline{B_1}\supset\overline{B_2}\supset\cdots
$$

の共通部分には点 $p$ が存在します。しかし $p\in\overline{B_j}$ なので $p\notin F_j$ が全ての $j$ で成り立ち、

$$
p\notin\bigcup_{j=1}^{\infty}F_j=M
$$

となって矛盾します。

一方、$\overline{\Phi}_x$ は全射なので

$$
M
=
\overline{\Phi}_x(G/G_x)
\subset
\bigcup_{j=1}^{\infty}F_j.
$$

従って $r<m$ は不可能で、

$$
r=m
$$

です。

よって $\overline{\Phi}_x$ は同次元多様体間のはめ込みであり、各点で微分は線形同型です。逆関数定理から局所微分同相です。さらに全単射なので、その逆写像は各局所逆写像を貼り合わせた滑らかな写像です。

従って $\overline{\Phi}_x$ は微分同相です。

最後に

$$
\overline{\Phi}_x(a\cdot gG_x)
=
ag\cdot x
=
a\cdot\overline{\Phi}_x(gG_x)
$$

なので $G$-同変です。$\square$
<!-- proof-end -->

球面の例では

$$
S^{n-1}
\cong
SO(n)/SO(n-1)
$$

が微分同相として確定します。次元も

$$
\frac{n(n-1)}2
-
\frac{(n-1)(n-2)}2
=
n-1
$$

と球面の次元に一致します。

---

## 6. 軌道はいつも埋め込み部分多様体とは限らない

一般の作用が推移的でなくても、各軌道は $G/G_x$ と全単射です。§4 の多様体構造を $G/G_x$ に入れ、軌道への写像

$$
\overline{\Phi}_x:G/G_x\to M
$$

を考えると、§5 の証明の途中と同じ議論で微分は単射です。従って各軌道には自然な **はめ込み多様体** の構造があります。

ただし、部分集合として常に埋め込み部分多様体になるとは限りません。

### 例：トーラス上の稠密な軌道

$$
\mathbb T^2=\mathbb R^2/\mathbb Z^2
$$

に $\mathbb R$ を

$$
t\cdot[x,y]
=
[x+t,\ y+\alpha t],
\qquad
\alpha\notin\mathbb Q
$$

で作用させます。

各軌道は1次元のはめ込み像ですが、$\alpha$ が無理数なので軌道はトーラス内で稠密になります。もしこの軌道が部分集合位相で埋め込み1次元部分多様体なら、各点の近くで1次元座標軸のように局所的に分離されるはずです。しかし稠密軌道は任意の小近傍へ何度も戻ってきます。

壊れているのは「軌道が存在すること」ではなく、「軌道の自然な多様体位相と $M$ から受ける部分集合位相が一致すること」です。

---

## 7. 接ベクトルを単位元へ戻す1形式

[GEO7](../GEO7/index.md) では実数値の微分形式を扱いました。ここでは有限次元 Lie 環 $\mathfrak g$ に値を取る1形式を一つだけ拡張して使います。

<a id="def-lie4-lie-algebra-valued-one-form"></a>
<!-- formal-statement-start -->
> **定義（Lie 環値1形式）**
>
> 多様体 $M$ と有限次元実 Lie 環 $\mathfrak g$ に対し、各 $p\in M$ で線形写像
>
$$
\omega_p:T_pM\to\mathfrak g
$$
>
> を与え、$\mathfrak g$ の任意の基底で成分表示した係数が通常の滑らかな1形式になるとき、$\omega$ を **$\mathfrak g$ 値1形式**という。
>
> 外微分 $d\omega$ は各成分へ [GEO7 の外微分](../GEO7/index.md#def-geo7-exterior-derivative)を施して定める。
<!-- formal-statement-end -->

基底を変えると係数は定数行列で線形変換されるので、成分ごとに外微分する定義は基底に依存しません。

<a id="def-lie4-maurer-cartan-form"></a>
<!-- formal-statement-start -->
> **定義（左 Maurer--Cartan 形式）**
>
> Lie 群 $G$ の Lie 環を $\mathfrak g=T_eG$ とする。各 $g\in G$ に対して
>
$$
\theta_g
:=
d(L_{g^{-1}})_g
:
T_gG\to T_eG=\mathfrak g
$$
>
> と定める。この $\mathfrak g$ 値1形式 $\theta$ を **左 Maurer--Cartan 形式**という。
<!-- formal-statement-end -->

<!-- definition-example-start: def-lie4-maurer-cartan-form -->
**定義の確認：一般線形群**

$G=GL(n,\mathbb R)$ では

$$
L_{A^{-1}}(B)=A^{-1}B.
$$

従って $V\in T_AGL(n,\mathbb R)\cong M_n(\mathbb R)$ に対して

$$
\theta_A(V)=A^{-1}V.
$$

つまり行列表示では

$$
\boxed{\theta=A^{-1}dA}
$$

です。

加法群 $G=(\mathbb R^n,+)$ なら $L_{-x}(y)=y-x$ の微分は恒等写像なので、

$$
\theta_x(v)=v.
$$

標準基底で見れば

$$
\theta=(dx^1,\ldots,dx^n)
$$

となります。
<!-- definition-example-end -->

この1形式は、群のどの点にいる接ベクトルでも左移動によって単位元の Lie 環へ戻す「移動座標」です。

<a id="prop-lie4-maurer-cartan-equivariance"></a>
<!-- formal-statement-start -->
> **命題（Maurer--Cartan 形式の左不変性と右移動則）**
>
> 左 Maurer--Cartan 形式 $\theta$ に対し、任意の $h\in G$ で
>
$$
L_h^*\theta=\theta
$$
>
> が成り立つ。
>
> また右移動に対して
>
$$
R_h^*\theta
=
\operatorname{Ad}_{h^{-1}}\circ\theta
$$
>
> が成り立つ。
<!-- formal-statement-end -->

### 証明の見取り図

左移動で $g$ を $hg$ へ送ってから $(hg)^{-1}$ を左から掛けると、結局 $g^{-1}$ を左から掛けるのと同じです。右移動では順序がずれるため、そのずれが共役 $h^{-1}(\cdot)h$、従って $\operatorname{Ad}_{h^{-1}}$ として残ります。

<!-- proof-start -->
### 証明

$V\in T_gG$ とします。まず

$$
(L_h^*\theta)_g(V)
=
\theta_{hg}(dL_h(V)).
$$

定義から

$$
\theta_{hg}
=
dL_{(hg)^{-1}}
=
dL_{g^{-1}h^{-1}}.
$$

従って連鎖律より

$$
\theta_{hg}\circ dL_h
=
d(L_{g^{-1}h^{-1}}\circ L_h)
=
dL_{g^{-1}}
=
\theta_g.
$$

よって

$$
L_h^*\theta=\theta.
$$

次に

$$
(R_h^*\theta)_g(V)
=
\theta_{gh}(dR_h(V))
=
dL_{h^{-1}g^{-1}}\,dR_h(V).
$$

写像として

$$
L_{h^{-1}g^{-1}}\circ R_h
=
C_{h^{-1}}\circ L_{g^{-1}},
$$

ここで $C_{h^{-1}}(a)=h^{-1}ah$ です。従って

$$
(R_h^*\theta)_g(V)
=
d(C_{h^{-1}})_e(\theta_g(V)).
$$

[LIE2 の随伴表現の定義](../LIE2/index.md#def-lie2-adjoint-representation)より

$$
d(C_{h^{-1}})_e
=
\operatorname{Ad}_{h^{-1}}.
$$

従って

$$
R_h^*\theta
=
\operatorname{Ad}_{h^{-1}}\circ\theta.
$$

$\square$
<!-- proof-end -->

---

## 8. Lie 括弧を2形式へ組み込む

<a id="def-lie4-bracket-wedge"></a>
<!-- formal-statement-start -->
> **定義（Lie 環値1形式の括弧付き外積）**
>
> $\mathfrak g$ 値1形式 $\omega$ に対し、$\mathfrak g$ 値2形式 $[\omega\wedge\omega]$ を
>
$$
[\omega\wedge\omega](U,V)
:=
[\omega(U),\omega(V)]
-
[\omega(V),\omega(U)]
$$
>
> で定める。
<!-- formal-statement-end -->

Lie 括弧の反対称性から

$$
[\omega\wedge\omega](U,V)
=
2[\omega(U),\omega(V)].
$$

従って

$$
\frac12[\omega\wedge\omega](U,V)
=
[\omega(U),\omega(V)].
$$

係数 $1/2$ は、同じ括弧を交代化したときに2回数えることを補正しています。

---

## 9. 構造方程式

<a id="thm-lie4-maurer-cartan-equation"></a>
<!-- formal-statement-start -->
> **定理（Maurer--Cartan 方程式）**
>
> Lie 群 $G$ の左 Maurer--Cartan 形式 $\theta$ は
>
$$
\boxed{
d\theta+\frac12[\theta\wedge\theta]=0
}
$$
>
> を満たす。
<!-- formal-statement-end -->

### 証明の見取り図

$\theta$ は左不変ベクトル場を「定数の Lie 環元」へ戻します。$X,Y\in\mathfrak g$ に対応する左不変ベクトル場を $X^L,Y^L$ とすると

$$
\theta(X^L)=X,
\qquad
\theta(Y^L)=Y.
$$

従って外微分の公式では最初の2項が消え、残る Lie 括弧だけが

$$
d\theta(X^L,Y^L)=-[X,Y]
$$

を与えます。一方、括弧付き外積は $+[X,Y]$ を与えるため、両者が正確に打ち消し合います。

<!-- proof-start -->
### 証明

$X,Y\in\mathfrak g$ を取り、それぞれに対応する左不変ベクトル場を $X^L,Y^L$ とします。Maurer--Cartan 形式の定義から任意の $g\in G$ で

$$
\theta_g(X^L_g)
=
d(L_{g^{-1}})_g(dL_g)_eX
=
X.
$$

従って関数として

$$
\theta(X^L)=X
$$

は定数です。同様に $\theta(Y^L)=Y$ です。

[GEO7 の外微分の座標に依らない表示](../GEO7/index.md#thm-geo7-exterior-invariant-formula)を $\theta$ の各成分へ適用すると

$$
d\theta(X^L,Y^L)
=
X^L(\theta(Y^L))
-
Y^L(\theta(X^L))
-
\theta([X^L,Y^L]).
$$

最初の2項は定数の微分なので0です。[LIE1 の左不変場の括弧](../LIE1/index.md#thm-lie1-tangent-lie-algebra)から

$$
[X^L,Y^L]=[X,Y]^L.
$$

よって

$$
d\theta(X^L,Y^L)
=
-\theta([X,Y]^L)
=
-[X,Y].
$$

一方、

$$
\frac12[\theta\wedge\theta](X^L,Y^L)
=
[\theta(X^L),\theta(Y^L)]
=
[X,Y].
$$

従って

$$
\left(
d\theta+\frac12[\theta\wedge\theta]
\right)(X^L,Y^L)
=
0.
$$

各点 $g$ で任意の接ベクトルはある $X^L_g$ の形に一意に書けます。従って上の等式は全ての接ベクトル対で成り立ち、

$$
d\theta+\frac12[\theta\wedge\theta]=0.
$$

$\square$
<!-- proof-end -->

この方程式は「Lie 群の非可換性」が外微分にどう現れるかを表しています。可換 Lie 群では Lie 括弧が0なので

$$
d\theta=0
$$

になります。

---

## 10. 構造定数で書く

<a id="def-lie4-structure-constants"></a>
<!-- formal-statement-start -->
> **定義（構造定数）**
>
> Lie 環 $\mathfrak g$ の基底 $E_1,\ldots,E_r$ を固定する。各 $i,j$ に対して
>
$$
[E_i,E_j]
=
\sum_{k=1}^r c_{ij}^{\,k}E_k
$$
>
> と一意に書いたときの係数 $c_{ij}^{\,k}$ を、この基底に関する **構造定数**という。
<!-- formal-statement-end -->

Maurer--Cartan 形式を

$$
\theta
=
\sum_{k=1}^r\theta^kE_k
$$

と成分表示すると、Maurer--Cartan 方程式の $E_k$ 成分は

$$
\boxed{
d\theta^k
=
-\frac12
\sum_{i,j}
c_{ij}^{\,k}
\theta^i\wedge\theta^j
}
$$

です。

### 例：2次元アフィン Lie 群

[LIE1 の2次元アフィン Lie 環](../LIE1/index.md)では基底 $H,E$ に対し

$$
[H,E]=E.
$$

双対成分を $\theta^H,\theta^E$ と書きます。

$H$ 成分を持つ括弧はないので

$$
d\theta^H=0.
$$

$E$ 成分では

$$
c_{HE}^{\,E}=1,
\qquad
c_{EH}^{\,E}=-1.
$$

従って

$$
\begin{aligned}
d\theta^E
&=
-\frac12
\left(
\theta^H\wedge\theta^E
-
\theta^E\wedge\theta^H
\right)\\
&=
-\theta^H\wedge\theta^E.
\end{aligned}
$$

非可換性 $[H,E]=E$ が、そのまま1形式の微分

$$
d\theta^E=-\theta^H\wedge\theta^E
$$

に翻訳されています。

---

## 11. 演習

### Level A

<a id="ex-lie4-a01"></a>
#### LIE4-A01 平面回転の軌道と安定化群
- Level: A

$SO(2)$ の $\mathbb R^2$ への標準作用を考える。

1. 原点の軌道と安定化群を求めよ。
2. $p=(r,0)$、$r>0$ の軌道と安定化群を求めよ。
3. 定理

$$
\dim(G\cdot p)=\dim G-\dim G_p
$$

と整合することを確認せよ。

<!-- solution-start -->
##### 詳細解答

原点については任意の $R_\theta\in SO(2)$ が

$$
R_\theta(0,0)=(0,0)
$$

を満たします。従って

$$
SO(2)\cdot(0,0)=\{(0,0)\},
\qquad
G_{(0,0)}=SO(2).
$$

$SO(2)$ の次元は1なので

$$
\dim G-\dim G_{(0,0)}=1-1=0,
$$

実際に軌道は0次元です。

次に $p=(r,0)$、$r>0$ とします。

$$
R_\theta p
=
(r\cos\theta,r\sin\theta)
$$

なので軌道は半径 $r$ の円

$$
G\cdot p
=
\{(x,y):x^2+y^2=r^2\}
$$

です。

$R_\theta p=p$ なら

$$
\cos\theta=1,
\qquad
\sin\theta=0,
$$

従って $R_\theta=I$ です。よって

$$
G_p=\{I\}.
$$

これは0次元 Lie 群なので

$$
\dim G-\dim G_p=1-0=1.
$$

半径 $r$ の円は1次元であり一致します。
<!-- solution-end -->

<a id="ex-lie4-a02"></a>
#### LIE4-A02 実数加法群の基本ベクトル場
- Level: A

$G=(\mathbb R,+)$ が $M=\mathbb R$ に

$$
t\cdot x=x+at
$$

で作用するとする。ただし $a\in\mathbb R$ は固定する。

1. Lie 群作用であることを確認せよ。
2. $1\in\mathfrak g\cong\mathbb R$ に対応する基本ベクトル場を求めよ。
3. $a=0$ と $a\ne0$ で軌道と安定化群がどう変わるか述べよ。

<!-- solution-start -->
##### 詳細解答

単位元は $0$ なので

$$
0\cdot x=x.
$$

また

$$
(s+t)\cdot x
=
x+a(s+t),
$$

一方

$$
s\cdot(t\cdot x)
=
s\cdot(x+at)
=
x+at+as.
$$

両者は一致します。写像 $(t,x)\mapsto x+at$ は多項式なので滑らかです。従って Lie 群作用です。

加法群では Lie 群の指数写像は恒等写像なので

$$
\exp(t\cdot1)=t.
$$

従って

$$
(1_M)_x
=
\left.
\frac{d}{dt}
\right|_0
(x+at)
=
a.
$$

よって

$$
1_M
=
a\frac{d}{dx}.
$$

$a=0$ なら全ての点が固定され、

$$
G\cdot x=\{x\},
\qquad
G_x=\mathbb R.
$$

$a\ne0$ なら任意の $y$ に対し

$$
t=\frac{y-x}{a}
$$

と取れば $t\cdot x=y$ なので軌道は $\mathbb R$ 全体です。また

$$
x+at=x
$$

なら $t=0$ なので

$$
G_x=\{0\}.
$$
<!-- solution-end -->

<a id="ex-lie4-a03"></a>
#### LIE4-A03 商の接空間
- Level: A

$H$ を Lie 群 $G$ の閉 Lie 部分群とし、$\mathfrak h=T_eH$ とする。商写像 $q:G\to G/H$ について

$$
\ker dq_e=\mathfrak h
$$

から

$$
T_{eH}(G/H)\cong\mathfrak g/\mathfrak h
$$

を導け。

<!-- solution-start -->
##### 詳細解答

§4 の定理より $q$ は沈め込みなので

$$
dq_e:\mathfrak g\to T_{eH}(G/H)
$$

は全射です。

また

$$
\ker dq_e=\mathfrak h.
$$

従って線形写像の第一同型定理により

$$
\mathfrak g/\ker dq_e
\cong
\operatorname{im}dq_e.
$$

左辺へ $\ker dq_e=\mathfrak h$、右辺へ全射性を代入すると

$$
\mathfrak g/\mathfrak h
\cong
T_{eH}(G/H).
$$

写像を明示すれば

$$
X+\mathfrak h
\longmapsto
dq_e(X)
$$

です。$X$ を $X+Y$、$Y\in\mathfrak h$ に変えても

$$
dq_e(X+Y)
=
dq_e(X)+dq_e(Y)
=
dq_e(X)
$$

なので well-defined です。
<!-- solution-end -->

<a id="ex-lie4-a04"></a>
#### LIE4-A04 可換群の Maurer--Cartan 方程式
- Level: A

$G=(\mathbb R^n,+)$ の左 Maurer--Cartan 形式を標準座標で求め、Maurer--Cartan 方程式が

$$
d\theta=0
$$

へ退化することを確認せよ。

<!-- solution-start -->
##### 詳細解答

加法群では

$$
L_{-x}(y)=y-x.
$$

その微分は恒等写像なので

$$
\theta_x(v)=v.
$$

標準基底 $e_1,\ldots,e_n$ で成分表示すると

$$
\theta
=
\sum_{i=1}^n dx^i\,e_i.
$$

各 $dx^i$ は座標1形式なので

$$
d(dx^i)=0.
$$

従って成分ごとに

$$
d\theta=0.
$$

また $\mathbb R^n$ の Lie 環は可換なので任意の $X,Y$ に対して

$$
[X,Y]=0.
$$

よって

$$
[\theta\wedge\theta]=0.
$$

従って

$$
d\theta+\frac12[\theta\wedge\theta]
=
0+0
=
0.
$$

Maurer--Cartan 方程式が直接確認できました。
<!-- solution-end -->

### Level B

<a id="ex-lie4-b01"></a>
#### LIE4-B01 球面を商として再構成する
- Level: B

$SO(3)$ の $S^2$ への標準作用を考える。

1. $e_3=(0,0,1)$ の安定化群が $SO(2)$ と同型であることを示せ。
2. $S^2\cong SO(3)/SO(2)$ を導け。
3. 次元を両辺から確認せよ。

<!-- solution-start -->
##### 詳細解答

$A\in SO(3)$ が $e_3$ を固定するとします。

$$
Ae_3=e_3
$$

なので $A$ の第3列は $e_3$ です。$A$ は直交行列なので第1列・第2列は $e_3$ に直交し、$xy$ 平面内の正規直交基底をなします。

従って

$$
A=
\begin{pmatrix}
B&0\\
0&1
\end{pmatrix}
$$

と書けます。$\det A=1$ なので $\det B=1$ で、

$$
B\in SO(2).
$$

逆に任意の $B\in SO(2)$ に対し上のブロック行列は $e_3$ を固定します。よって

$$
(SO(3))_{e_3}\cong SO(2).
$$

$SO(3)$ は任意の単位ベクトルを任意の単位ベクトルへ回転で送れるので、作用は推移的です。§5 の定理から

$$
S^2
\cong
SO(3)/(SO(3))_{e_3}
\cong
SO(3)/SO(2).
$$

[LIE3 の次元公式](../LIE3/index.md#thm-lie3-orthogonal)より

$$
\dim SO(3)=\frac{3\cdot2}{2}=3,
$$

$$
\dim SO(2)=\frac{2\cdot1}{2}=1.
$$

従って

$$
\dim SO(3)/SO(2)=3-1=2,
$$

確かに $\dim S^2=2$ と一致します。
<!-- solution-end -->

<a id="ex-lie4-b02"></a>
#### LIE4-B02 無限小作用の符号
- Level: B

$G$ が自分自身 $M=G$ に左乗法

$$
g\cdot p=gp
$$

で作用するとする。

1. $X\in\mathfrak g$ に対応する基本ベクトル場 $X_G$ が右不変ベクトル場であることを示せ。
2. 右不変ベクトル場の括弧が
   $$
   [X^R,Y^R]=-[X,Y]^R
   $$
   となることから、本章の無限小作用が反準同型であることを確認せよ。

<!-- solution-start -->
##### 詳細解答

定義から

$$
(X_G)_p
=
\left.
\frac{d}{dt}
\right|_0
\exp(tX)p.
$$

右移動 $R_p(g)=gp$ を使えば

$$
(X_G)_p
=
d(R_p)_eX.
$$

これはまさに $X$ から作る右不変ベクトル場 $X^R$ の定義です。従って

$$
X_G=X^R.
$$

次に右不変ベクトル場について

$$
[X^R,Y^R]
=
-[X,Y]^R
$$

です。左不変場では $X\mapsto X^L$ が Lie 環同型ですが、右不変場では群積の順序が反転してこのマイナスが現れます。

したがって

$$
[X_G,Y_G]
=
[X^R,Y^R]
=
-[X,Y]^R
=
-[X,Y]_G.
$$

これは本文の

$$
[X_M,Y_M]=-[X,Y]_M
$$

を $M=G$ の左作用で具体的に確認したものです。
<!-- solution-end -->

<a id="ex-lie4-b03"></a>
#### LIE4-B03 $GL(n,\mathbb R)$ の Maurer--Cartan 形式
- Level: B

$G=GL(n,\mathbb R)$ とする。

1. 左 Maurer--Cartan 形式が
   $$
   \theta_A(V)=A^{-1}V
   $$
   であることを定義から示せ。
2. 行列値1形式の記法で
   $$
   \theta=A^{-1}dA
   $$
   と書けることを説明せよ。
3. $d(A^{-1})=-A^{-1}(dA)A^{-1}$ を使い、
   $$
   d\theta+\theta\wedge\theta=0
   $$
   を直接確認せよ。ここで行列積を伴う外積を使う。

<!-- solution-start -->
##### 詳細解答

左移動は

$$
L_{A^{-1}}(B)=A^{-1}B
$$

です。$A^{-1}$ は固定されているので微分は

$$
d(L_{A^{-1}})_A(V)=A^{-1}V.
$$

従って定義から

$$
\theta_A(V)=A^{-1}V.
$$

行列の各成分を座標関数とみなせば $dA$ は行列値1形式で、$V$ へ作用させると

$$
(dA)_A(V)=V.
$$

従って

$$
(A^{-1}dA)_A(V)=A^{-1}V=\theta_A(V),
$$

すなわち

$$
\theta=A^{-1}dA.
$$

逆行列恒等式

$$
A^{-1}A=I
$$

を外微分すると

$$
d(A^{-1})A+A^{-1}dA=0.
$$

右から $A^{-1}$ を掛けて

$$
d(A^{-1})
=
-A^{-1}(dA)A^{-1}.
$$

次に次数付き Leibniz 則を使うと、$A^{-1}$ は0形式なので

$$
d\theta
=
d(A^{-1}dA)
=
d(A^{-1})\wedge dA
+
A^{-1}d^2A.
$$

[GEO7 の $d^2=0$](../GEO7/index.md#thm-geo7-d-square-zero)より第2項は0です。従って

$$
\begin{aligned}
d\theta
&=
-A^{-1}(dA)A^{-1}\wedge dA\\
&=
-(A^{-1}dA)\wedge(A^{-1}dA)\\
&=
-\theta\wedge\theta.
\end{aligned}
$$

よって

$$
d\theta+\theta\wedge\theta=0.
$$

$GL(n,\mathbb R)$ の Lie 環では $[A,B]=AB-BA$ なので

$
\frac12[\theta\wedge\theta]
=
\theta\wedge\theta
$$

なので、これは本文の Maurer--Cartan 方程式そのものです。
<!-- solution-end -->

### Level C

<a id="ex-lie4-c01"></a>
#### LIE4-C01 アフィン群で作用・商・構造方程式を接続する
- Level: C

正の向きを保つ1次元アフィン群

$$
G=
\{(a,b):a>0,\ b\in\mathbb R\},
$$

$$
(a,b)(a',b')
=
(aa',\,b+ab')
$$

が $\mathbb R$ に

$$
(a,b)\cdot x=ax+b
$$

で作用する。

1. この作用が推移的な Lie 群作用であることを示せ。
2. $0$ の安定化群 $H$ を求め、$G/H\cong\mathbb R$ を導け。
3. 単位元 $(1,0)$ で
   $$
   H_0=\left.\frac{d}{dt}\right|_0(e^t,0),
   \qquad
   E_0=\left.\frac{d}{dt}\right|_0(1,t)
   $$
   を基底とする。対応する基本ベクトル場を求め、
   $$
   [H_0,E_0]=E_0
   $$
   と
   $$
   [(H_0)_M,(E_0)_M]=-[H_0,E_0]_M
   $$
   を確認せよ。
4. 左 Maurer--Cartan 形式の双対成分を $\theta^H,\theta^E$ とし、
   $$
   d\theta^H=0,
   \qquad
   d\theta^E=-\theta^H\wedge\theta^E
   $$
   を導け。

<!-- solution-start -->
##### 詳細解答

作用公理を確認します。単位元は $(1,0)$ なので

$$
(1,0)\cdot x=x.
$$

また

$$
\begin{aligned}
((a,b)(a',b'))\cdot x
&=
(aa',b+ab')\cdot x\\
&=
aa'x+b+ab',
\end{aligned}
$$

一方

$$
\begin{aligned}
(a,b)\cdot((a',b')\cdot x)
&=
(a,b)\cdot(a'x+b')\\
&=
a(a'x+b')+b\\
&=
aa'x+ab'+b.
\end{aligned}
$$

両者は一致します。式は $a,b,x$ の滑らかな関数なので Lie 群作用です。

任意の $x,y\in\mathbb R$ に対し $(1,y-x)$ を取れば

$$
(1,y-x)\cdot x=y.
$$

従って作用は推移的です。

$0$ の安定化条件は

$$
(a,b)\cdot0=b=0.
$$

従って

$$
H=G_0=\{(a,0):a>0\}.
$$

§5 の定理から

$$
G/H\cong\mathbb R.
$$

次に基本ベクトル場を求めます。

$H_0$ に対応する1パラメータ部分群は $(e^t,0)$ なので

$$
\begin{aligned}
((H_0)_M)_x
&=
\left.
\frac{d}{dt}
\right|_0
e^t x\\
&=
x.
\end{aligned}
$$

従って

$$
(H_0)_M
=
x\frac{d}{dx}.
$$

$E_0$ に対応する1パラメータ部分群は $(1,t)$ なので

$$
((E_0)_M)_x
=
\left.
\frac{d}{dt}
\right|_0
(x+t)
=
1.
$$

従って

$$
(E_0)_M
=
\frac{d}{dx}.
$$

ベクトル場の Lie 括弧を関数へ作用させて計算すると

$$
\begin{aligned}
\left[
x\frac{d}{dx},
\frac{d}{dx}
\right]f
&=
x\frac{d}{dx}(f')
-
\frac{d}{dx}(xf')\\
&=
xf''-(f'+xf'')\\
&=
-f'.
\end{aligned}
$$

よって

$$
[(H_0)_M,(E_0)_M]
=
-\frac{d}{dx}
=
-(E_0)_M.
$$

一方 [LIE1 のアフィン Lie 環](../LIE1/index.md)では

$$
[H_0,E_0]=E_0.
$$

従って

$$
[(H_0)_M,(E_0)_M]
=
-[H_0,E_0]_M
$$

が直接確認できました。

最後に Maurer--Cartan 方程式を成分で書きます。構造定数は

$$
[H_0,E_0]=E_0,
\qquad
[E_0,H_0]=-E_0.
$$

$H_0$ 成分を持つ括弧はないので

$$
d\theta^H=0.
$$

$E_0$ 成分では

$$
c_{HE}^{\,E}=1,
\qquad
c_{EH}^{\,E}=-1.
$$

従って

$$
\begin{aligned}
d\theta^E
&=
-\frac12
\left(
\theta^H\wedge\theta^E
-
\theta^E\wedge\theta^H
\right)\\
&=
-\frac12
\left(
\theta^H\wedge\theta^E
+
\theta^H\wedge\theta^E
\right)\\
&=
-\theta^H\wedge\theta^E.
\end{aligned}
$$

これで一つの具体的 Lie 群について

$$
\text{推移的作用}
\longleftrightarrow
G/H
\longleftrightarrow
\text{無限小作用}
\longleftrightarrow
\text{構造方程式}
$$

が一続きに確認できました。
<!-- solution-end -->

---

## 12. まとめ

本章では、集合上の群作用へ滑らかさを加えることで、群論の軌道・安定化群が微分幾何の対象へ変わることを見ました。

一点 $x$ を固定すると

$$
\Phi_x:G\to M
$$

の微分は

$$
d(\Phi_x)_e(X)=(X_M)_x
$$

であり、

$$
\ker d(\Phi_x)_e=\mathfrak g_x.
$$

従って

$$
\dim(G\cdot x)
=
\dim G-\dim G_x
$$

という「軌道・安定化群公式の微分版」が得られます。

閉 Lie 部分群 $H$ に対しては

$$
G/H
$$

が自然な滑らかな多様体になり、

$$
T_{eH}(G/H)\cong\mathfrak g/\mathfrak h.
$$

推移的な作用では、基点 $x$ の安定化群を使って

$$
M\cong G/G_x
$$

と書けます。

最後に、左 Maurer--Cartan 形式

$$
\theta_g=d(L_{g^{-1}})_g
$$

は全ての接ベクトルを単位元の Lie 環へ戻し、その外微分は

$$
d\theta+\frac12[\theta\wedge\theta]=0
$$

を満たしました。

これは Lie 括弧という代数構造が、群上の微分形式の構造方程式として完全に回収されることを意味します。

LIE1--LIE4 で、Lie 群の基本系列はここまでで一区切りです。表現論、半単純 Lie 環、ルート系、主束・接続・ゲージ理論 は後続の独立系列へ送ります。
