# VAR7 曲面の面積の第一変分と極小曲面

[VAR3の曲線の長さの第一変分](../VAR3/index.md#prop-var3-length-first)では、曲線を法線方向へ動かすと曲率が現れました。[VAR6](../VAR6/index.md)では、最短という条件と停留という条件が別物であることを見ました。曲線を面に置き換えると何が起こるでしょうか。石鹸膜は張られた針金の間に曲面を作りますが、「面積を変化させても一次の増減がない」ことを、面を曲げる量で記述したいのです。

その役を担うのが **平均曲率** です。ただし面には接方向が二つあり、さらに境界も曲線として動き得ます。曲線の長さの変分と同じく、**内側の曲率項と境界項を区別**しなければなりません。本章では曲面の面積の第一変分を導き、固定境界で平均曲率 $H=0$ が停留条件となることを証明します。次にグラフ方程式を座標から導出し、平面・懸垂面・螺旋面で直接検算します。

## 1. 面積を動かすための設定

[VC3の正則パラメータ曲面と面積要素](../../../幾何系/VC/VC3/index.md#def-vc3-area-element)では、$X=X(u^1,u^2)$ に対し $g_{ij}=\langle X_i,X_j\rangle$、面積要素 $dA=\sqrt{\det g}\,du^1du^2$ を学びました。[GEO10の形作用素と第二基本形式](../../../幾何系/GEO/GEO10/index.md#def-geo10-shape-operator)では、選んだ単位法線 $N$ に対し $S=-dN$、$b_{ij}=\langle X_{ij},N\rangle$ と置きました。本章でもこの符号を保持します。

境界をもつコンパクトな向き付け可能 $C^3$ 曲面 $\Sigma$（必要なら閉曲面）を $\mathbb R^3$ に $C^3$ 級で埋め込み、その像を $X(\Sigma)$ と書きます。境界は区分的 $C^2$ とします。局所計算は座標 $(u^1,u^2)$ で行います。曲面全体の面積は誘導計量の面積要素 $dA$ を積分して定め、$\sqrt{\det g}\,du^1du^2$ は各座標近傍での表示です。閉曲面を含む一般の曲面に、一つの座標表示を全域で使えるとは仮定しません。$\varepsilon$ に関し $C^1$、空間変数に関し $C^2$ の正則な曲面族 $X_\varepsilon$ を $X_0=X$ として用意し、その速度を $V=\partial_\varepsilon X_\varepsilon|_0$ とします。面積の一次変化を $\delta A[X;V]=\left.\frac{d}{d\varepsilon}A[X_\varepsilon]\right|_0$ と書きます。

変分を考える際には、$V$ は接線方向 $W$ と法線方向 $fN$ に一意に分かれます。**固定境界**なら $V=0$ を境界に課し、**境界自由**ならこの制約を課しません。境界上で曲面の接平面に属し、境界接ベクトルに直交して外を向く単位ベクトルを外向き余法線 $\mu$ と書きます。

<a id="def-var7-surface-variation"></a>
<!-- formal-statement-start -->
> **定義（曲面変分と面積の第一変分）**  
> 上記の正則曲面 $X_\varepsilon$ に対し $V=\partial_\varepsilon X_\varepsilon|_0=fN+W$（$W$ は接線方向）を **変分場** とする。面積の第一変分は
>
$$
\delta A[X;V]
=\left.\frac{d}{d\varepsilon}
\int_\Sigma dA_\varepsilon\right|_{\varepsilon=0}
$$
>
> と定義する。$dA_\varepsilon$ は $X_\varepsilon$ が誘導する面積要素であり、局所座標では $dA_\varepsilon=\sqrt{\det g_\varepsilon}\,du^1du^2$、$g_{\varepsilon,ij}=\langle\partial_iX_\varepsilon,\partial_jX_\varepsilon\rangle$ である。
<!-- formal-statement-end -->

<!-- definition-example-start: def-var7-surface-variation -->
**定義の確認**。 平面円板 $X(x,y)=(x,y,0)$ を $X_\varepsilon=(x,y,\varepsilon\phi(x,y))$ へ変形します。$N=(0,0,1)$ で、変分場は $V=(0,0,\phi)=\phi N$ なので $f=\phi,W=0$ です。計量は $g_\varepsilon=I+\varepsilon^2\nabla\phi\otimes\nabla\phi$、したがって
$$
\sqrt{\det g_\varepsilon}
=\sqrt{1+\varepsilon^2|\nabla\phi|^2}
$$
であり、第一変分は確かに0です。二次の増加はVAR8で扱います。
<!-- definition-example-end -->

平均曲率の符号は法線の取り方で反転します。[GEO10の主曲率と平均曲率](../../../幾何系/GEO/GEO10/index.md#def-geo10-principal-curvature)に従って
$$
2H=\operatorname{tr}S=g^{ij}b_{ij},\qquad S=-dN
$$
とします。法線を $-N$ にすれば $H$ も $-H$ になりますが、$H=0$ は不変です。

## 2. 面積の第一変分：内部項と境界項

曲面の面積倍率は曲面に沿う二方向の伸びで決まります。そこで変形した計量をまず微分し、その変化を接方向の発散と法線方向の平均曲率に分離します。

<a id="thm-var7-first-variation"></a>
<!-- formal-statement-start -->
> **定理（曲面積の第一変分）**  
> $\Sigma\subset\mathbb R^3$ を上記のコンパクトで向き付け可能な正則曲面とし、$V=fN+W$ を許容される滑らかな変分場とする。このとき
>
$$
\delta A[X;V]
=-2\int_\Sigma H f\,dA
+\int_{\partial\Sigma}V\cdot\mu\,ds.
$$
>
> 境界が空なら第二項は0である。$V|_{\partial\Sigma}=0$ の固定境界変分でも第二項は0である。
<!-- formal-statement-end -->

### 証明の見取り図

$g_{ij}$ を微分し、行列式の微分で面積倍率を求めます。法線方向には $S=-dN$ の跡が、接方向には曲面上の発散が現れます。後者は曲面の発散定理で境界積分になります。[GEO10の形作用素の座標表示](../../../幾何系/GEO/GEO10/index.md#prop-geo10-coordinate-forms)が符号を確定させます。

<!-- proof-start -->
### 証明

局所座標で $X_i=\partial_iX$、$V_i=\partial_iV$ と書きます。積の微分から
$$
\dot g_{ij}=\langle V_i,X_j\rangle+\langle X_i,V_j\rangle.
$$
正定値対称行列 $g$ に対し、行列式の微分を使うと
$$
\left.\frac{d}{d\varepsilon}\sqrt{\det g_\varepsilon}\right|_0
=\frac12\sqrt{\det g}\,g^{ij}\dot g_{ij}
=\sqrt{\det g}\,g^{ij}\langle V_i,X_j\rangle.
$$
$V=fN+W$ を代入すると、$\langle N,X_j\rangle=0$ なので
$$
\langle\partial_i(fN),X_j\rangle
=f\langle\partial_iN,X_j\rangle
=-f b_{ij}.
$$
従って法線成分の寄与は $-f g^{ij}b_{ij}=-2Hf$ です。接線成分は座標で
$$
g^{ij}\langle\partial_iW,X_j\rangle
=\operatorname{div}_\Sigma W
$$
となります。これは、点で正規直交な接基底 $e_1,e_2$ を選べば右辺と左辺がともに $\sum_{\alpha=1}^2\langle D_{e_\alpha}W,e_\alpha\rangle$ となることから確認できます。

よって面積要素の変化は
$$
\delta(dA)=\bigl(\operatorname{div}_\Sigma W-2Hf\bigr)dA.
$$
コンパクト性と正則性から微分と積分を交換でき、局所公式を座標領域で足せます。

接線場の成分を $W=W^kX_k$ と書けば、上の発散も局所座標で計算できます。
$$
\operatorname{div}_\Sigma W
=\partial_iW^i+W^k g^{ij}\langle X_{ik},X_j\rangle.
$$
一方、$\partial_k g_{ij}=\langle X_{ik},X_j\rangle+\langle X_i,X_{jk}\rangle$ なので、添字の対称性と行列式微分から
$$
\partial_k\log\sqrt{\det g}
=\frac12 g^{ij}\partial_k g_{ij}
=g^{ij}\langle X_{ik},X_j\rangle.
$$
これを直前の式に代入すると
$$
\sqrt{\det g}\,\operatorname{div}_\Sigma W
=\partial_i\bigl(\sqrt{\det g}\,W^i\bigr)
$$
です。

積分に使う平面の発散公式を、[VC4のGauss--Ostrogradskyの発散定理](../../../幾何系/VC/VC4/index.md#thm-vc4-gauss-divergence)から確認します。VC4の定理は **3次元領域** に関するものです。そこで区分的 $C^1$ 境界を持つ有界平面領域 $U$ と $C^1$ ベクトル場 $(P,Q)$ に対し、$\Omega=U\times(0,1)$、$F(u,v,t)=(P(u,v),Q(u,v),0)$ と置きます。$\operatorname{div}_{\mathbb R^3}F=P_u+Q_v$ であり、立体の上下の面では $F$ の法線成分が0です。側面 $\partial U\times(0,1)$ の外向き法線は $(\nu_U,0)$、面積要素は $ds_U\,dt$ なので、3次元の公式の両辺はそれぞれ次の平面積分になります。

<a id="eq-var7-planar-divergence"></a>
$$
\int_U(P_u+Q_v)\,du\,dv
=\int_{\partial U}(P,Q)\cdot\nu_U\,ds_U.
$$

曲面を、区分的に滑らかな境界を持ち各片が一つの局所座標で記述できる有限個の小片へ分けてこの公式を適用します。重複する座標近傍をそのまま二重に足すのではありません。接線場 $W$ から得られる流束は座標に依存しない幾何学的量なので、隣接小片の共有境界では余法線が逆向きとなり寄与が相殺され、曲面の実際の境界だけが残ります。

実際、境界近くで $v=0$ を境界、$v>0$ を内側とする座標 $(u,v)$ を取ります。$E=\langle X_u,X_u\rangle$、$F=\langle X_u,X_v\rangle$、$G=\langle X_v,X_v\rangle$ と置くと、境界の外向き余法線と線素は
$$
\mu=-\frac{X_v-(F/E)X_u}{\sqrt{G-F^2/E}},\qquad ds=\sqrt E\,du
$$
です。$W=W^uX_u+W^vX_v$ を代入すれば
$$
W\cdot\mu\,ds
=-\sqrt{EG-F^2}\,W^v\,du
=-\sqrt{\det g}\,W^v\,du.
$$
右辺はパラメータ領域の境界 $v=0$ から外へ出る発散積分の流束です。他の境界片でも座標を取り直せば同じ確認ができ、残る積分は $\int_{\partial\Sigma}W\cdot\mu\,ds$ です。

従って
$$
\int_\Sigma\operatorname{div}_\Sigma W\,dA
=\int_{\partial\Sigma}W\cdot\mu\,ds.
$$
$\mu$ は接ベクトルなので $N\cdot\mu=0$、従って $W\cdot\mu=V\cdot\mu$ です。この等式を前式へ代入して所要の公式を得ます。$\square$
<!-- proof-end -->

**符号検査：球面。** 半径 $R$ の球面で外向き $N=X/R$ を選ぶと $dN=(1/R)dX$ なので $S=-I/R$、$H=-1/R$ です。$X_\varepsilon=(1+\varepsilon c/R)X$ という外向き速度 $V=cN$ の変形に対し、面積は $4\pi(R+\varepsilon c)^2$ です。一方第一変分公式は
$$
-2\int Hc\,dA=-2(-1/R)c\,4\pi R^2=8\pi Rc,
$$
直接微分 $d[4\pi(R+\varepsilon c)^2]/d\varepsilon|_0$ と一致します。**外向きの球面では $H$ が負**であることが、符号の重要な検査です。

## 3. 平均曲率ゼロとは何か

固定境界なら境界項が消えます。内部の小領域だけに台を持つ任意の滑らかな関数 $f$ を使い、$V=fN$ と選べるため、停留性から $H$ が点ごとに0であることが導かれます。これは「面積が最小」という主張より弱く、一次の変化が消えることだけを述べています。

<a id="def-var7-minimal-surface"></a>
<!-- formal-statement-start -->
> **定義（極小曲面）**  
> $C^2$ 級の向き付け可能な正則曲面がすべての内点で平均曲率 $H=0$ を満たすとき、**極小曲面**という。向きを反転してもこの条件は変わらない。
<!-- formal-statement-end -->

<!-- definition-example-start: def-var7-minimal-surface -->
**定義の確認**。 平面 $X(x,y)=(x,y,0)$ では一定法線 $N=(0,0,1)$ に対して $dN=0$、形作用素 $S=0$、二つの主曲率はともに0、従って $H=0$ です。平面は極小曲面です。一方、外向き法線をもつ半径 $R$ の球面では上で計算した $H=-1/R\ne0$ なので極小曲面ではありません。
<!-- definition-example-end -->

<a id="thm-var7-stationary-minimal"></a>
<!-- formal-statement-start -->
> **定理（固定境界での面積停留条件）**  
> $C^3$ 級のコンパクトな向き付け可能埋め込み曲面 $\Sigma$ について、境界を点ごとに固定した全ての滑らかな正則変分で $\delta A=0$ であることと、内部で $H=0$ であることは同値である。
<!-- formal-statement-end -->

### 証明の見取り図

必要条件は、内点近くの小領域だけを $fN$ 方向に動かし、第一変分が常に0という積分等式から読み取ります。逆方向は第一変分へ代入して確認します。境界が固定されていることを外すと、$H=0$ だけでは停留性を言えません。

<!-- proof-start -->
### 証明

全ての固定境界変分で停留するとします。内部コンパクト台を持つ $C^\infty$ 関数 $f$ について、十分小さな $\varepsilon$ で $X_\varepsilon=X+\varepsilon fN$ は正則な固定境界変分です。[第一変分定理](#thm-var7-first-variation)から
$$
0=\delta A[X;fN]=-2\int_\Sigma Hf\,dA.
$$
$H$ は連続です。ある内点で $H>0$ ならその近傍で $H>0$ の非負の滑らかな $f$ を台付きで選び積分を正にでき、矛盾します。$H<0$ でも同様です。従って $H=0$。

逆に $H=0$ のとき、任意の固定境界変分では $V=0$ が境界で成立し、第一変分式の両項が0です。よって停留します。$\square$
<!-- proof-end -->

**境界が自由なら別条件。** $H=0$ の平面円板でも、半径 $R$ の境界を固定せず $X_\varepsilon=(1+\varepsilon)X$ と拡大すれば $A(\varepsilon)=\pi R^2(1+\varepsilon)^2$ で、$\delta A=2\pi R^2\ne0$ です。定理の境界条件を消せません。

<a id="prop-var7-free-boundary"></a>
<!-- formal-statement-start -->
> **命題（支持面上で自由な境界の必要条件）**  
> 滑らかな支持面 $B\subset\mathbb R^3$ 上に $\partial\Sigma$ を置き、境界点を $B$ の中で任意に動かせる滑らかな変分を許す。内部と境界の変分を独立に実現できるなら、面積が停留するための必要条件は、内部で $H=0$、境界で $\mu\perp T B$ となることである。逆にこれらの条件の下では全許容変分に対する第一変分が0になる。
<!-- formal-statement-end -->

<!-- proof-start -->
### 証明

内部コンパクト台の法線変分を採用すると前定理と同じ議論で $H=0$ を得ます。この条件で第一変分に残るのは
$$
\delta A=\int_{\partial\Sigma}V\cdot\mu\,ds.
$$
境界で許される $V$ は $T B$ に属します。各境界点の短い弧に局在する $V$ を任意の $T B$ 方向に選べるという仮定から、積分が常に0になるには $\mu$ が $T B$ のすべての方向に直交しなければなりません。逆向きは $H=0$ および $V\cdot\mu=0$ を第一変分へ代入すれば従います。$\square$
<!-- proof-end -->

これは支持面と極小曲面が直交して交わる条件です。「境界自由」も「境界固定」も同じ変分問題だと思ってはいけません。境界に外力・線張力などを課す別のエネルギーなら、境界条件も変わります。

## 4. グラフを動かすと非線形 PDE が現れる

面が一本のグラフ $z=u(x,y)$ で書ける領域では、面積を二変数関数の汎関数にできます。$D\subset\mathbb R^2$ を滑らかな境界をもつ有界領域、$u\in C^2(\overline D)$ とし、
$$
X(x,y)=(x,y,u(x,y))
$$
を考えます。[グラフ曲面の面積・上向き流束](../../../幾何系/VC/VC3/index.md#prop-vc3-graph-formulas)から $w=\sqrt{1+u_x^2+u_y^2}$ と置けば
$$
A[u]=\int_D w\,dx\,dy.
$$
$u_\varepsilon=u+\varepsilon\varphi$ の高さ方向変分を考えます。$\varphi|_{\partial D}=0$ が固定 Dirichlet 境界です。

<a id="thm-var7-minimal-graph-equation"></a>
<!-- formal-statement-start -->
> **定理（極小曲面のグラフ方程式）**  
> $u\in C^2(\overline D)$ は、任意の $\varphi\in C_c^\infty(D)$ に対するグラフ面積の第一変分が0であることと、次の方程式を $D$ で満たすことが同値である。
>
$$
\operatorname{div}\left(\frac{\nabla u}{\sqrt{1+|\nabla u|^2}}\right)=0.
$$
>
> 同じ条件は次の非発散形にも等しい。
>
$$
(1+u_y^2)u_{xx}-2u_xu_yu_{xy}+(1+u_x^2)u_{yy}=0.
$$
>
> 上向きの単位法線 $N=(-u_x,-u_y,1)/w$ に関して、左辺の発散は $2H$ に等しい。
<!-- formal-statement-end -->

### 証明の見取り図

まず $w_\varepsilon$ の微分で $\nabla u\cdot\nabla\varphi/w$ を得ます。部分積分すると内部の微分方程式と境界流束が分離します。最後に $g^{-1}b$ の跡から、PDE の左辺が本当に平均曲率 $2H$ であることを検証します。

<!-- proof-start -->
### 証明

$w_\varepsilon=\sqrt{1+|\nabla u+\varepsilon\nabla\varphi|^2}$ なので
$$
\left.\frac{d}{d\varepsilon}w_\varepsilon\right|_0
=\frac{\nabla u\cdot\nabla\varphi}{w}.
$$
$w\ge1$ と領域の有界性により微分と積分を交換して
$$
\delta A[u;\varphi]=\int_D\frac{\nabla u}{w}\cdot\nabla\varphi\,dx\,dy.
$$
積を各座標で微分すると
$$
\operatorname{div}\left(\varphi\frac{\nabla u}{w}\right)
=\frac{\nabla u}{w}\cdot\nabla\varphi
+\varphi\operatorname{div}\left(\frac{\nabla u}{w}\right).
$$
これを積分し、第2節で導いた[平面の発散公式](#eq-var7-planar-divergence)を $D$ に適用します。$\varphi$ が内部コンパクト台なら境界積分は0です。従って
$$
\delta A[u;\varphi]
=-\int_D\varphi\operatorname{div}\left(\frac{\nabla u}{w}\right)\,dx\,dy.
$$
ここで $q=\operatorname{div}(\nabla u/w)$ と置きます。[AMECH3の変分法の基本補題](../../../物理系/AMECH/AMECH3/index.md#lem-amech3-fundamental-variation)は **1次元の区間** に対する結果なので、$D\subset\mathbb R^2$ へ直接適用するのではなく、二度用います。任意の長方形 $I\times J\Subset D$ を取り、$\eta\in C_c^\infty(I)$、$\zeta\in C_c^\infty(J)$ に対し $\varphi(x,y)=\eta(x)\zeta(y)$ と選ぶと
$$
0=\int_I\eta(x)\left(\int_J q(x,y)\zeta(y)\,dy\right)dx.
$$
固定した $\zeta$ について内側の積分は $x$ の連続関数です。まず $I$ 上で[AMECH3の変分法の基本補題](../../../物理系/AMECH/AMECH3/index.md#lem-amech3-fundamental-variation)を適用して $\int_J q(x,y)\zeta(y)\,dy=0$ をすべての $x\in I$ について得ます。次に各 $x$ を固定し、任意の $\zeta$ に対して $J$ 上でも[AMECH3の変分法の基本補題](../../../物理系/AMECH/AMECH3/index.md#lem-amech3-fundamental-variation)を適用すると $q(x,y)=0$ が $I\times J$ で成立します。このような長方形が $D$ のすべての点を覆うため $q=0$ が $D$ 全体で成り立ちます。逆に $q=0$ なら先の積分式から第一変分はすべて0になります。

発散を展開するため $w_x=(u_xu_{xx}+u_yu_{xy})/w$、$w_y=(u_xu_{xy}+u_yu_{yy})/w$ を計算します。従って
$$
\begin{aligned}
\operatorname{div}(\nabla u/w)
&=\frac{u_{xx}+u_{yy}}w
-\frac{u_x^2u_{xx}+2u_xu_yu_{xy}+u_y^2u_{yy}}{w^3}\\
&=\frac{(1+u_y^2)u_{xx}-2u_xu_yu_{xy}+(1+u_x^2)u_{yy}}{w^3}.
\end{aligned}
$$
$w>0$ なので、分子を0とする非発散形が得られます。

平均曲率との同一性も計算します。グラフの基本形式は $g_{ij}=\delta_{ij}+u_i u_j$ で、直接乗算すれば
$$
g^{ij}=\delta_{ij}-\frac{u_i u_j}{w^2}
$$
です。$X_{ij}=(0,0,u_{ij})$ と上向き法線から $b_{ij}=u_{ij}/w$。よって
$$
2H=g^{ij}b_{ij}
=\frac{\Delta u}{w}-\frac{u_i u_j u_{ij}}{w^3}
=\operatorname{div}(\nabla u/w).
$$
ここでも [GEO10の基本形式の座標表示](../../../幾何系/GEO/GEO10/index.md#prop-geo10-coordinate-forms)と整合しています。$\square$
<!-- proof-end -->

**境界流束。** $\varphi$ を境界でも自由に動かすと部分積分から
$$
\delta A[u;\varphi]
=-\int_D\varphi\,\operatorname{div}(\nabla u/w)\,dx\,dy
+\int_{\partial D}\varphi\,\frac{\nabla u}{w}\cdot\nu_D\,ds
$$
が残ります。$\nu_D$ は平面領域の外向き単位法線です。Dirichlet 変分なら $\varphi=0$ で消え、境界の高さも自由なら $\nabla u\cdot\nu_D/w=0$ が追加の自然境界条件となります。どの向きの境界移動を許すかを明示しないまま自然境界条件だけを暗記するのは危険です。

**平面と $\Delta u=0$ の相違。** $u=px+qy+c$ は全二階導関数が0なので極小グラフです。一方 $u=xy$ は $\Delta u=0$ ですが非発散形の分子は $-2xy$ です。従って $xy\ne0$ では極小グラフではありません。極小曲面方程式を単純な Laplace 方程式と同一視できるのは、勾配が十分小さいときの**近似**に限られます。

## 5. 具体的に曲がった極小曲面を作る

### 5.1 懸垂面（catenoid）：回転面のまま直接検査

懸垂線 $r(z)=a\cosh(z/a)$（$a>0$）を $z$ 軸の周りに回転した面
$$
X(z,\theta)=\bigl(a\cosh(z/a)\cos\theta,\ a\cosh(z/a)\sin\theta,\ z\bigr)
$$
を考えます。$z$ は任意の有限閉区間、$\theta$ は円周変数とし、有限区間に切り取ればコンパクトな曲面になります。

<a id="prop-var7-catenoid"></a>
<!-- formal-statement-start -->
> **命題（懸垂面は極小曲面）**  
> 上の $X$ は任意の $z$ で正則であり、主曲率は符号を除いて
>
$$
\kappa_1=-\frac{1}{a\cosh^2(z/a)},
\qquad
\kappa_2=\frac{1}{a\cosh^2(z/a)}
$$
>
> となる。従って $H=0$ で、固定境界の面積に対して停留する。
<!-- formal-statement-end -->

**証明の見取り図。** 回転面の二つの接方向は直交します。第一基本形式が対角になることを使い、第二基本形式の対角係数を計算すれば平均曲率は打ち消し合います。

<!-- proof-start -->
### 証明

$t=z/a$、$c=\cosh t$、$s=\sinh t$ と書きます。偏微分は
$$
X_z=(s\cos\theta,s\sin\theta,1),\qquad
X_\theta=(-ac\sin\theta,ac\cos\theta,0).
$$
従って
$$
g_{zz}=s^2+1=c^2,\quad g_{z\theta}=0,\quad
g_{\theta\theta}=a^2c^2,\quad \det g=a^2c^4>0.
$$
選ぶ単位法線を
$$
N=(-\cos\theta/c,-\sin\theta/c,s/c)
$$
とすれば $N\cdot X_z=N\cdot X_\theta=0$ かつ $|N|=1$ です。二階微分から
$$
X_{zz}=(c\cos\theta/a,c\sin\theta/a,0),\quad
X_{\theta\theta}=(-ac\cos\theta,-ac\sin\theta,0)
$$
なので
$$
b_{zz}=X_{zz}\cdot N=-1/a,\qquad
b_{\theta\theta}=X_{\theta\theta}\cdot N=a.
$$
また $X_{z\theta}=(-s\sin\theta,s\cos\theta,0)$ は $N$ に直交し、$b_{z\theta}=0$。よって $S=g^{-1}b$ の対角成分は
$$
-\frac1{ac^2},\qquad \frac1{ac^2}
$$
となり、その和 $2H$ は0です。[固定境界での停留条件](#thm-var7-stationary-minimal)より結論が従います。$\square$
<!-- proof-end -->

**回転グラフとしての検算。** $r=r(z)>0$ で回転面を表すと面積は
$$
A[r]=2\pi\int r\sqrt{1+(r')^2}\,dz
$$
です。$F(r,r')=r\sqrt{1+(r')^2}$ に[VAR1のEuler–Lagrange方程式](../VAR1/index.md#prop-var1-first-variation-boundary)を適用すると
$$
\frac{d}{dz}\left(\frac{rr'}{\sqrt{1+(r')^2}}\right)
-\sqrt{1+(r')^2}=0.
$$
$w=\sqrt{1+(r')^2}$ と置いて左辺を微分・通分すると
$$
\frac{(r')^2}{w}+\frac{rr''}{w^3}-w
=\frac{rr''-w^2}{w^3}=0.
$$
$w>0$ なので
$$
rr''=w^2=1+(r')^2.
$$
$r=a\cosh(z/a)$ では $r'=\sinh(z/a)$、$r''=\cosh(z/a)/a$ なので左右とも $\cosh^2(z/a)$ です。ただし回転対称変分での停留だけから一般変分での停留は直ちには言えません。その不足を上の平均曲率の直接計算が埋めています。また停留は面積の**大域最小性を保証しません**。

### 5.2 螺旋面（helicoid）：回転面ではない極小曲面

$a\ne0$ とし
$$
Y(r,\theta)=(r\cos\theta,r\sin\theta,a\theta)
$$
を考えます。$\theta$ を区間に制限すれば正則な埋め込み局所片が得られます。

<a id="prop-var7-helicoid"></a>
<!-- formal-statement-start -->
> **命題（螺旋面は極小曲面）**  
> 上の螺旋面は $a\ne0$ のとき全ての $(r,\theta)$ で正則で、平均曲率は $H=0$ である。
<!-- formal-statement-end -->

<!-- proof-start -->
### 証明

接ベクトルと基本形式は
$$
Y_r=(\cos\theta,\sin\theta,0),\quad
Y_\theta=(-r\sin\theta,r\cos\theta,a),
$$
$$
g_{rr}=1,\quad g_{r\theta}=0,\quad g_{\theta\theta}=r^2+a^2>0.
$$
単位法線として
$$
N=\frac{(a\sin\theta,-a\cos\theta,r)}{\sqrt{r^2+a^2}}
$$
を選びます。二階微分は $Y_{rr}=0$、$Y_{\theta\theta}=(-r\cos\theta,-r\sin\theta,0)$、$Y_{r\theta}=(-\sin\theta,\cos\theta,0)$ なので
$$
b_{rr}=0,\quad b_{\theta\theta}=0,\quad
b_{r\theta}=-\frac a{\sqrt{r^2+a^2}}.
$$
$g^{-1}$ は対角行列であるため
$$
2H=g^{rr}b_{rr}+g^{\theta\theta}b_{\theta\theta}=0.
$$
第二基本形式に混合項はありますが、そのことは平均曲率がゼロであることと矛盾しません。$\square$
<!-- proof-end -->

螺旋面は、グラフ表示を一枚で全体に貼り付けられない場所があるため、グラフPDEだけで曲面を定義するのは不適切です。一方、平均曲率と第一変分の公式は局所座標を変えても同じ意味を持ちます。

### 5.3 非平面的なグラフ：Scherk型の例

$|x|<\pi/2$、$|y|<\pi/2$ の長方形で
$$
u(x,y)=\log(\cos y)-\log(\cos x)
$$
を考えます。$u_x=\tan x$、$u_y=-\tan y$、$u_{xx}=\sec^2x$、$u_{yy}=-\sec^2y$、$u_{xy}=0$ です。従って[グラフ方程式](#thm-var7-minimal-graph-equation)の非発散形は
$$
(1+\tan^2y)\sec^2x-(1+\tan^2x)\sec^2y=0
$$
となります。非平面的な極小曲面が、非線形 PDE の解として具体的に得られました。境界へ近づくと高さが発散する箇所があるので、この例をそのままコンパクトな滑らかな境界を持つ全長方形へ延長したとは主張しません。

## 6. 演習：符号、境界、具体面、非線形性を区別する

### Level A

<a id="ex-var7-a01"></a>
#### VAR7-A01 平面グラフの法線と停留
- Level: A

$u(x,y)=3x-2y+1$ を有界な円板上で考える。$w$、上向き単位法線、$2H$ を求め、固定境界面積の停留を確認せよ。

<!-- solution-start -->
### 詳細解答

$\nabla u=(3,-2)$ なので $w=\sqrt{1+9+4}=\sqrt{14}$、
$$
N=\frac{(-3,2,1)}{\sqrt{14}}.
$$
$N$ は一定で $dN=0$、従って $S=0$、$2H=0$ です。別に[グラフ方程式](#thm-var7-minimal-graph-equation)へ代入しても $u_{xx}=u_{xy}=u_{yy}=0$ より分子は0です。[固定境界停留条件](#thm-var7-stationary-minimal)により全固定境界変分で第一変分は0です。
<!-- solution-end -->

<a id="ex-var7-a02"></a>
#### VAR7-A02 外向き球面の符号
- Level: A

半径 $R$ の球面を外向き速度 $V=cN$（$c$ は定数）で動かしたとき、$H$ と面積の第一変分を公式と直接計算の両方で求めよ。

<!-- solution-start -->
### 詳細解答

$N=X/R$、$S=-dN=-I/R$ だから $H=-1/R$。[第一変分公式](#thm-var7-first-variation)で境界は空なので
$$
\delta A=-2\int Hc\,dA
=\frac{2c}{R}4\pi R^2=8\pi Rc.
$$
変形半径は $R+\varepsilon c$ なので
$$
\left.\frac d{d\varepsilon}4\pi(R+\varepsilon c)^2\right|_0
=8\pi Rc.
$$
一致します。法線だけを逆にして $f$ を元のままにするのは誤りで、同じ変分場なら $N$ と $f$ の両方の符号が反転します。
<!-- solution-end -->

<a id="ex-var7-a03"></a>
#### VAR7-A03 $\Delta u=0$ でも極小グラフとは限らない
- Level: A

$u(x,y)=xy$ が $\Delta u=0$ を満たすことを示し、極小曲面方程式を満たす点集合を求めよ。

<!-- solution-start -->
### 詳細解答

$u_x=y,u_y=x,u_{xx}=0,u_{yy}=0,u_{xy}=1$ だから $\Delta u=0$ です。しかし[非発散形の方程式](#thm-var7-minimal-graph-equation)の左辺は
$$
(1+x^2)0-2xy(1)+(1+y^2)0=-2xy
$$
です。従って方程式を満たすのは $xy=0$ の点だけです。開集合全体では等式が成立しないため、非自明な二次元領域上の極小グラフではありません。
<!-- solution-end -->

<a id="ex-var7-a04"></a>
#### VAR7-A04 平面円板と動く境界
- Level: A

半径 $R$ の平面円板を $X_\varepsilon=(1+\varepsilon)X$ で拡大する。第一変分を面積の直接計算と境界積分からそれぞれ求め、固定境界でないことを説明せよ。

<!-- solution-start -->
### 詳細解答

$A(\varepsilon)=\pi R^2(1+\varepsilon)^2$ なので $\delta A=2\pi R^2$。平面では $H=0$ です。円周上では $V=X=R\mu$、$ds=R\,d\theta$、従って
$$
\int_{\partial\Sigma}V\cdot\mu\,ds
=\int_0^{2\pi}R\cdot R\,d\theta=2\pi R^2.
$$
[第一変分公式](#thm-var7-first-variation)と一致します。境界上の $V$ は0でないため、[固定境界での停留条件](#thm-var7-stationary-minimal)の許容変分ではありません。
<!-- solution-end -->

### Level B

<a id="ex-var7-b01"></a>
#### VAR7-B01 グラフの自然境界条件
- Level: B

$A[u]=\int_D\sqrt{1+|\nabla u|^2}$ について、$C^2$ の $u$ と任意の $C^1$ の境界値をもつ $\varphi$ に対して第一変分の内部項・境界項を求めよ。境界高さを自由に動かせるときの条件は何か。

<!-- solution-start -->
### 詳細解答

$w=\sqrt{1+|\nabla u|^2}$ と置き、$w_\varepsilon^2=1+|\nabla u+\varepsilon\nabla\varphi|^2$ を微分すると
$$
\delta A=\int_D\frac{\nabla u}{w}\cdot\nabla\varphi\,dx\,dy.
$$
積の発散を展開して第2節の[平面の発散公式](#eq-var7-planar-divergence)を用い、
$$
\delta A=
-\int_D\varphi\,\operatorname{div}(\nabla u/w)\,dx\,dy+
\int_{\partial D}\varphi\,\frac{\nabla u}{w}\cdot\nu_D\,ds.
$$
内部コンパクト台の $\varphi$ から発散=0が必要です。このもとで境界値 $\varphi$ を任意に選べるなら、その係数も0、すなわち
$$
\frac{\nabla u}{\sqrt{1+|\nabla u|^2}}\cdot\nu_D=0
$$
が必要です。固定 Dirichlet 境界のときは $\varphi|_{\partial D}=0$ なので、この自然境界条件は要求されません。
<!-- solution-end -->

<a id="ex-var7-b02"></a>
#### VAR7-B02 懸垂面の平均曲率を計算する
- Level: B

$X(z,\theta)=(a\cosh(z/a)\cos\theta,a\cosh(z/a)\sin\theta,z)$（$a>0$）について $g_{zz}$、$g_{\theta\theta}$、$b_{zz}$、$b_{\theta\theta}$ と $H$ を求めよ。法線は本文と同じものを使う。

<!-- solution-start -->
### 詳細解答

$t=z/a$ と置きます。$\partial_zX=(\sinh t\cos\theta,\sinh t\sin\theta,1)$ なので
$$
g_{zz}=\sinh^2t+1=\cosh^2t,\quad
g_{\theta\theta}=a^2\cosh^2t,\quad g_{z\theta}=0.
$$
$N=(-\cos\theta/\cosh t,-\sin\theta/\cosh t,\tanh t)$ と置けば
$$
\partial_{zz}X=\frac{\cosh t}{a}(\cos\theta,\sin\theta,0),\quad
\partial_{\theta\theta}X=-a\cosh t(\cos\theta,\sin\theta,0).
$$
よって $b_{zz}=-1/a,b_{\theta\theta}=a$ です。計量逆行列は対角であり、
$$
2H=g^{zz}b_{zz}+g^{\theta\theta}b_{\theta\theta}
=-\frac1{a\cosh^2t}+\frac1{a\cosh^2t}=0.
$$
[平均曲率の停留条件](#thm-var7-stationary-minimal)から固定境界で停留します。
<!-- solution-end -->

<a id="ex-var7-b03"></a>
#### VAR7-B03 螺旋面では混合第二基本形式が残る
- Level: B

$Y(r,\theta)=(r\cos\theta,r\sin\theta,a\theta)$、$a\ne0$ について $g$ と $b$ を求め、$b_{r\theta}\ne0$ でも $H=0$ である理由を述べよ。

<!-- solution-start -->
### 詳細解答

$Y_r=(\cos\theta,\sin\theta,0)$、$Y_\theta=(-r\sin\theta,r\cos\theta,a)$ より
$$
g=\begin{pmatrix}1&0\\0&r^2+a^2\end{pmatrix}.
$$
本文と同じ $N=(a\sin\theta,-a\cos\theta,r)/\sqrt{r^2+a^2}$ を選び、$Y_{rr}=0$、$Y_{r\theta}=(-\sin\theta,\cos\theta,0)$、$Y_{\theta\theta}=(-r\cos\theta,-r\sin\theta,0)$ から
$$
b=\begin{pmatrix}0&-a/\sqrt{r^2+a^2}\\-a/\sqrt{r^2+a^2}&0\end{pmatrix}.
$$
[形作用素の座標表示](../../../幾何系/GEO/GEO10/index.md#prop-geo10-coordinate-forms)より $2H=\operatorname{tr}(g^{-1}b)$ です。$g^{-1}$ が対角なのでその跡は0であり、混合成分がゼロでなくても $H=0$ です。
<!-- solution-end -->

<a id="ex-var7-b04"></a>
#### VAR7-B04 Scherk型グラフの領域と検算
- Level: B

$u=\log(\cos y)-\log(\cos x)$ を $|x|,|y|<\pi/2$ で考える。グラフ極小曲面方程式を計算し、全閉長方形まで滑らかに延長できない理由を述べよ。

<!-- solution-start -->
### 詳細解答

$u_x=\tan x,u_y=-\tan y,u_{xx}=\sec^2x,u_{yy}=-\sec^2y,u_{xy}=0$ を[極小グラフ方程式](#thm-var7-minimal-graph-equation)に代入すると
$$
(1+\tan^2y)\sec^2x-(1+\tan^2x)\sec^2y
=\sec^2y\sec^2x-\sec^2x\sec^2y=0.
$$
ところが例えば $y=0$ を固定して $x\uparrow\pi/2$ とすると
$$
u(x,0)=-\log(\cos x)\longrightarrow+\infty.
$$
値が無限大へ発散するので、閉長方形全体の実数値連続関数、まして $C^2$ 関数には延長できません。任意の内部のコンパクトな長方形上では滑らかな極小グラフです。
<!-- solution-end -->

### Level C

<a id="ex-var7-c01"></a>
#### VAR7-C01 回転面の停留方程式と一般変分の検証
- Level: C

$r(z)>0$ の $C^2$ 関数から $X(z,\theta)=(r(z)\cos\theta,r(z)\sin\theta,z)$ を作り、有限区間で両端の円周を固定する。

1. 回転対称変分に関する面積 $A[r]$ と Euler–Lagrange 方程式 $rr''=1+(r')^2$ を導け。
2. $r=a\cosh(z/a)$ が方程式を満たすことを直接計算せよ。
3. 回転対称変分で停留することだけを一般の全変分での停留と同一視してよいか述べ、平均曲率を直接計算して判定せよ。

<!-- solution-start -->
### 詳細解答

**1.** $X_z=(r'\cos\theta,r'\sin\theta,1)$、$X_\theta=(-r\sin\theta,r\cos\theta,0)$ なので $g_{zz}=1+(r')^2$、$g_{\theta\theta}=r^2$、$g_{z\theta}=0$ です。従って
$$
A[r]=2\pi\int r\sqrt{1+(r')^2}\,dz.
$$
$F(r,p)=r\sqrt{1+p^2}$ に対し $F_r=\sqrt{1+p^2}$、$F_p=rp/\sqrt{1+p^2}$ です。[VAR1のEuler–Lagrange方程式](../VAR1/index.md#prop-var1-first-variation-boundary)へ代入すると
$$
\frac{d}{dz}\left(\frac{rr'}{\sqrt{1+(r')^2}}\right)-\sqrt{1+(r')^2}=0.
$$
分子を微分すれば
$$
\frac{(r')^2}{w}+\frac{rr''}{w^3}-w=0,\qquad
w=\sqrt{1+(r')^2}.
$$
$w^2-(r')^2=1$ なので $rr''=w^2=1+(r')^2$ です。

**2.** $r=a\cosh(z/a)$ なら $r'=\sinh(z/a)$、$r''=\cosh(z/a)/a$。従って
$$
rr''=\cosh^2(z/a)=1+\sinh^2(z/a)=1+(r')^2.
$$

**3.** 回転対称な関数 $r$ だけを変えることは許容変分の一部分しか調べていないので、それだけから全方向の停留は論理的には従いません。実際に $t=z/a$、$N=(-\cos\theta/\cosh t,-\sin\theta/\cosh t,\tanh t)$ と取ると
$$
g_{zz}=\cosh^2t,\quad g_{\theta\theta}=a^2\cosh^2t,
\qquad b_{zz}=-1/a,\quad b_{\theta\theta}=a.
$$
従って
$$
2H=-\frac{1}{a\cosh^2t}+\frac{1}{a\cosh^2t}=0.
$$
この**独立した平均曲率の検算**があるため、[固定境界での面積停留条件](#thm-var7-stationary-minimal)を適用して全変分での停留を結論できます。大域的な面積最小性まで証明したわけではありません。
<!-- solution-end -->

---

## 7. ここで言えたことと次章の課題

固定境界の面積停留を特徴づける条件は $H=0$ でした。そこから極小曲面のグラフ方程式が得られ、懸垂面と螺旋面のように曲がった面でも二つの主曲率の和が0になることを検査できました。球面は平均曲率が0でないので停留せず、平面円板も境界を動かせば面積が一次で変わります。

ただし、**停留＝安定＝大域最小ではありません**。特に懸垂面は固定境界で停留しても、どの変形に対して面積が増えるかは第一変分から分かりません。次の VAR8 では第二変分・Jacobi作用素を計算して、安定な極小曲面と不安定な極小曲面を区別します。
