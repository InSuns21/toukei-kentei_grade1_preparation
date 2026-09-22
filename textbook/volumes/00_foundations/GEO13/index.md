# GEO13 幾何学 XIII

<!-- definition-example-audit: strict -->

[GEO12](../GEO12/index.md) では、各接空間 $T_pM$ に内積を入れることで、長さ・距離・体積を多様体の内部だけから構成しました。しかし、まだ一つ大きな問題が残っています。

点 $p$ のベクトル

$$
v\in T_pM
$$

と、別の点 $q$ のベクトル

$$
w\in T_qM
$$

は異なるベクトル空間に属します。従って

$$
w-v
$$

とは、そのままでは書けません。

Euclid 空間では、全ての接空間を同じ $\mathbb R^n$ と自然に同一視しているため、この問題が見えにくくなっています。一般の多様体では、**ベクトルをどのように比較して微分するか**を追加で指定する必要があります。

本章の流れは

$$
\text{アフィン接続}
\longrightarrow
\text{Christoffel 係数・捩率}
\longrightarrow
\text{曲線に沿う共変微分}
\longrightarrow
\text{平行移動}
\longrightarrow
\text{計量両立性}
\longrightarrow
\text{Levi-Civita 接続}
$$

です。

最後に共変微分を一般のテンソル場へ拡張します。測地線はまだ定義しません。GEO14 で「速度ベクトル自身を平行に運ぶ曲線」として測地線へ進みます。

---

## 1. なぜ成分を普通に微分するだけでは足りないか

局所座標 $(x^1,\dots,x^n)$ 上でベクトル場を

$$
Y
=
Y^j\partial_j
$$

と書きます。

別のベクトル場

$$
X=X^i\partial_i
$$

の方向へ $Y$ を微分したくなると、最初の候補は

$$
X(Y^j)\partial_j
$$

です。

ところが、これは座標に依存します。

別の座標 $(y^1,\dots,y^n)$ では

$$
\frac{\partial}{\partial y^a}
=
\frac{\partial x^i}{\partial y^a}
\frac{\partial}{\partial x^i}.
$$

基底そのものが点によって変わるため、成分を微分すると座標変換の Jacobi 行列の微分まで現れます。つまり

$$
\text{成分の変化}
$$

だけでなく

$$
\text{基底の変化}
$$

も補正しなければ、座標に依らない微分にはなりません。

その補正を担うのが接続です。

---

## 2. アフィン接続

$M$ 上の滑らかなベクトル場全体を

$$
\mathfrak X(M)
$$

と書きます。

<a id="def-geo13-affine-connection"></a>
<!-- formal-statement-start -->
> **定義（アフィン接続）**  
> 滑らかな多様体 $M$ 上の **アフィン接続**とは、写像
>
$$
\nabla:
\mathfrak X(M)\times\mathfrak X(M)
\to
\mathfrak X(M),
\qquad
(X,Y)\longmapsto\nabla_XY
$$
>
> であって、任意の
>
$$
X,Y,Z\in\mathfrak X(M),
\qquad
f,g\in C^\infty(M),
\qquad
a,b\in\mathbb R
$$
>
> に対して
>
$$
\nabla_{fX+gY}Z
=
f\nabla_XZ+g\nabla_YZ,
$$
>
$$
\nabla_X(aY+bZ)
=
a\nabla_XY+b\nabla_XZ,
$$
>
> および
>
$$
\boxed{
\nabla_X(fY)
=
X(f)Y+f\nabla_XY
}
$$
>
> を満たすものをいう。
>
> $\nabla_XY$ を $Y$ の $X$ 方向への **共変微分**という。
<!-- formal-statement-end -->

第一変数 $X$ については $C^\infty(M)$-線形です。一方、第二変数 $Y$ については関数倍を微分すると $X(f)Y$ が出ます。

この非対称性は重要です。

- $X$ は「どの方向へ微分するか」
- $Y$ は「何を微分するか」

を表しています。

<!-- definition-example-start: def-geo13-affine-connection -->
**定義の確認：Euclid 空間の標準接続**

$\mathbb R^n$ の標準座標で

$$
X=X^i\partial_i,
\qquad
Y=Y^j\partial_j
$$

とし、

$$
D_XY
:=
X^i\partial_iY^j\,\partial_j
$$

と置きます。

$f\in C^\infty(\mathbb R^n)$ に対して

$$
D_{fX}Y
=
fX^i\partial_iY^j\,\partial_j
=
fD_XY
$$

です。

また

$$
\begin{aligned}
D_X(fY)
&=
X^i\partial_i(fY^j)\,\partial_j
\\
&=
X^i
\left[
(\partial_i f)Y^j
+
f\partial_iY^j
\right]\partial_j
\\
&=
X(f)Y+fD_XY.
\end{aligned}
$$

従って $D$ はアフィン接続です。
<!-- definition-example-end -->

Euclid 空間ではこの $D$ が「普通のベクトル値関数の微分」に対応します。

---

## 3. Christoffel 係数は基底の変化を記録する

局所座標

$$
(x^1,\dots,x^n)
$$

を取り、座標基底を

$$
\partial_i=\frac{\partial}{\partial x^i}
$$

と書きます。

<a id="def-geo13-christoffel"></a>
<!-- formal-statement-start -->
> **定義（Christoffel 係数）**  
> アフィン接続 $\nabla$ と局所座標 $(x^1,\dots,x^n)$ に対し、
>
$$
\boxed{
\nabla_{\partial_i}\partial_j
=
\Gamma^k_{ij}\partial_k
}
$$
>
> によって定まる滑らかな関数 $\Gamma^k_{ij}$ を、この座標における **Christoffel 係数**という。
<!-- formal-statement-end -->

<!-- definition-example-start: def-geo13-christoffel -->
**定義の確認**

$\mathbb R^n$ の標準接続 $D$ を Cartesian 座標で見ると

$$
D_{\partial_i}\partial_j=0.
$$

従って

$$
\Gamma^k_{ij}=0
$$

です。

ただし、同じ標準接続でも曲線座標へ移れば Christoffel 係数は一般に0ではありません。後で極座標で直接確認します。
<!-- definition-example-end -->

<a id="prop-geo13-coordinate-formula"></a>
<!-- formal-statement-start -->
> **命題（共変微分の座標公式）**  
> 局所座標で
>
$$
X=X^i\partial_i,
\qquad
Y=Y^j\partial_j
$$
>
> とする。このとき
>
$$
\boxed{
\nabla_XY
=
X^i
\left(
\partial_iY^k+\Gamma^k_{ij}Y^j
\right)
\partial_k
}
$$
>
> である。
<!-- formal-statement-end -->

<!-- proof-start -->
### 証明

接続の第一変数に関する $C^\infty$-線形性から

$$
\nabla_XY
=
X^i\nabla_{\partial_i}(Y^j\partial_j).
$$

第二変数の Leibniz 則を使うと

$$
\nabla_{\partial_i}(Y^j\partial_j)
=
(\partial_iY^j)\partial_j
+
Y^j\nabla_{\partial_i}\partial_j.
$$

Christoffel 係数の定義を代入して

$$
\nabla_{\partial_i}(Y^j\partial_j)
=
(\partial_iY^k)\partial_k
+
Y^j\Gamma^k_{ij}\partial_k.
$$

従って

$$
\nabla_XY
=
X^i
\left(
\partial_iY^k+\Gamma^k_{ij}Y^j
\right)\partial_k.
$$

$\square$
<!-- proof-end -->

### Christoffel 係数そのものはテンソル成分ではない

座標を $x$ から $y$ へ変え、

$$
A^i{}_a
=
\frac{\partial x^i}{\partial y^a}
$$

とします。

接続の公理を使って変換則を導きます。まず

$$
\frac{\partial}{\partial y^a}
=
A^i{}_a\partial_i,
\qquad
A^i{}_a
=
\frac{\partial x^i}{\partial y^a}.
$$

従って

$$
\begin{aligned}
\nabla_{\partial/\partial y^a}
\frac{\partial}{\partial y^b}
&=
A^i{}_a
\nabla_{\partial_i}
\left(
A^j{}_b\partial_j
\right)
\\
&=
A^i{}_a
\left[
(\partial_iA^k{}_b)\partial_k
+
A^j{}_b\Gamma^k_{ij}\partial_k
\right].
\end{aligned}
$$

ここで

$$
A^i{}_a\partial_iA^k{}_b
=
\frac{\partial^2x^k}
{\partial y^a\partial y^b},
$$

かつ

$$
\partial_k
=
\frac{\partial y^c}{\partial x^k}
\frac{\partial}{\partial y^c}.
$$

従って新しい Christoffel 係数は

$$
\boxed{
\widetilde\Gamma^c_{ab}
=
\frac{\partial y^c}{\partial x^k}
\left[
\frac{\partial x^i}{\partial y^a}
\frac{\partial x^j}{\partial y^b}
\Gamma^k_{ij}
+
\frac{\partial^2x^k}
{\partial y^a\partial y^b}
\right]
}.
$$

右辺には二階微分

$$
\frac{\partial^2x^k}{\partial y^a\partial y^b}
$$

があります。

テンソルの座標変換則には、このような非斉次項は現れません。従って Christoffel 係数だけを見て「テンソルの成分」と考えてはいけません。

一方、二つの接続の差を取ると、この非斉次項は消えます。

<a id="prop-geo13-connection-difference"></a>
<!-- formal-statement-start -->
> **命題（二つの接続の差はテンソル場）**  
> $\nabla$ と $\widetilde\nabla$ を $M$ 上の二つのアフィン接続とする。
>
$$
A(X,Y)
:=
\widetilde\nabla_XY-\nabla_XY
$$
>
> と置くと、$A$ は $X,Y$ の両方について $C^\infty(M)$-線形である。
>
> 従って $A$ は型 $(1,2)$ のテンソル場である。
<!-- formal-statement-end -->

<!-- proof-start -->
### 証明

第一変数について

$$
\begin{aligned}
A(fX,Y)
&=
\widetilde\nabla_{fX}Y-\nabla_{fX}Y
\\
&=
f\widetilde\nabla_XY-f\nabla_XY
\\
&=
fA(X,Y).
\end{aligned}
$$

第二変数については二つの Leibniz 項が打ち消し合います。

$$
\begin{aligned}
A(X,fY)
&=
\widetilde\nabla_X(fY)-\nabla_X(fY)
\\
&=
\{X(f)Y+f\widetilde\nabla_XY\}
-
\{X(f)Y+f\nabla_XY\}
\\
&=
fA(X,Y).
\end{aligned}
$$

加法性も接続の線形性から従います。従って $A$ は各点で $X_p,Y_p$ だけに依存する双線形写像

$$
T_pM\times T_pM\to T_pM
$$

を定め、型 $(1,2)$ のテンソル場です。$\square$
<!-- proof-end -->

この命題は、「接続自体はテンソルではないが、二つの接続のずれはテンソルである」という基本構造を表します。

---

## 4. 捩率は方向を入れ替えたときのずれを測る

[GEO5 の Lie 括弧](../GEO5/index.md#def-geo5-lie-bracket)は、二つのベクトル場を方向微分として作用させたときの非可換性を測りました。

接続にも

$$
\nabla_XY-\nabla_YX
$$

という反対称部分があります。

ただし、これだけでは座標に依存するので Lie 括弧を差し引きます。

<a id="def-geo13-torsion"></a>
<!-- formal-statement-start -->
> **定義（接続の捩率）**  
> アフィン接続 $\nabla$ に対し、
>
$$
\boxed{
T(X,Y)
:=
\nabla_XY-\nabla_YX-[X,Y]
}
$$
>
> を $\nabla$ の **捩率**という。
>
> 全てのベクトル場 $X,Y$ に対して
>
$$
T(X,Y)=0
$$
>
> となるとき、$\nabla$ は **捩率0**であるという。
<!-- formal-statement-end -->

<!-- definition-example-start: def-geo13-torsion -->
**定義の確認：標準接続の捩率**

$\mathbb R^n$ の標準接続 $D$ では

$$
D_XY-D_YX
=
[X,Y]
$$

が座標公式から成り立ちます。

従って

$$
T(X,Y)=0.
$$

つまり標準接続は捩率0です。
<!-- definition-example-end -->

<a id="prop-geo13-torsion-tensor"></a>
<!-- formal-statement-start -->
> **命題（捩率のテンソル性と座標表示）**  
> 接続の捩率 $T$ は $X,Y$ の両方について $C^\infty(M)$-線形であり、型 $(1,2)$ のテンソル場である。
>
> 座標基底では
>
$$
\boxed{
T^k{}_{ij}
=
\Gamma^k_{ij}-\Gamma^k_{ji}
}
$$
>
> が成り立つ。
>
> 特に、座標基底で
>
$$
T=0
$$
>
> であることと
>
$$
\Gamma^k_{ij}=\Gamma^k_{ji}
$$
>
> であることは同値である。
<!-- formal-statement-end -->

<!-- proof-start -->
### 証明

$f\in C^\infty(M)$ とします。

[GEO5](../GEO5/index.md#def-geo5-lie-bracket) の Lie 括弧について

$$
[fX,Y]
=
f[X,Y]-Y(f)X
$$

です。

従って

$$
\begin{aligned}
T(fX,Y)
&=
\nabla_{fX}Y-\nabla_Y(fX)-[fX,Y]
\\
&=
f\nabla_XY
-
\{Y(f)X+f\nabla_YX\}
-
\{f[X,Y]-Y(f)X\}
\\
&=
fT(X,Y).
\end{aligned}
$$

同様に

$$
T(X,fY)=fT(X,Y)
$$

です。従って $T$ はテンソル場です。

座標基底では

$$
[\partial_i,\partial_j]=0.
$$

従って

$$
\begin{aligned}
T(\partial_i,\partial_j)
&=
\nabla_{\partial_i}\partial_j
-
\nabla_{\partial_j}\partial_i
\\
&=
(\Gamma^k_{ij}-\Gamma^k_{ji})\partial_k.
\end{aligned}
$$

よって

$$
T^k{}_{ij}
=
\Gamma^k_{ij}-\Gamma^k_{ji}.
$$

$\square$
<!-- proof-end -->

曲線の Frenet 理論で使った「捩率」と、ここでの「接続の捩率」は別の対象です。本章では後者を扱います。

---

## 5. 曲線に沿ってベクトルを微分する

滑らかな曲線

$$
\gamma:I\to M
$$

を考えます。

各時刻 $t$ に

$$
V(t)\in T_{\gamma(t)}M
$$

を滑らかに選んだものを考えます。

局所座標で

$$
\gamma(t)
=
(\gamma^1(t),\dots,\gamma^n(t))
$$

かつ

$$
V(t)
=
V^j(t)\partial_j|_{\gamma(t)}
$$

と書きます。

<a id="def-geo13-curve-covariant-derivative"></a>
<!-- formal-statement-start -->
> **定義（曲線に沿う共変微分）**  
> アフィン接続 $\nabla$、滑らかな曲線 $\gamma:I\to M$、および
>
$$
V(t)\in T_{\gamma(t)}M
$$
>
> を滑らかに選んだ $V$ に対し、局所座標上で
>
$$
\boxed{
\frac{DV}{dt}
=
\left[
\frac{dV^k}{dt}
+
\Gamma^k_{ij}(\gamma(t))
\dot\gamma^i(t)V^j(t)
\right]
\partial_k|_{\gamma(t)}
}
$$
>
> と置く。
>
> これを $V$ の $\gamma$ に沿う **共変微分**という。
<!-- formal-statement-end -->

### 座標に依らないこと

この式には Christoffel 係数が現れますが、全体は座標不変です。

座標変換 $x=x(y)$ の下では

$$
V^k
=
\frac{\partial x^k}{\partial y^b}\widetilde V^b,
\qquad
\dot x^i
=
\frac{\partial x^i}{\partial y^a}\dot y^a.
$$

時間微分を取ると

$$
\frac{dV^k}{dt}
=
\frac{\partial x^k}{\partial y^c}
\frac{d\widetilde V^c}{dt}
+
\frac{\partial^2x^k}
{\partial y^a\partial y^b}
\dot y^a\widetilde V^b.
$$

一方、先ほど導いた Christoffel 係数の変換則を整理すると

$$
\Gamma^k_{ij}\dot x^iV^j
=
\frac{\partial x^k}{\partial y^c}
\widetilde\Gamma^c_{ab}
\dot y^a\widetilde V^b
-
\frac{\partial^2x^k}
{\partial y^a\partial y^b}
\dot y^a\widetilde V^b.
$$

二式を足すと二階微分項が打ち消し合い、

$$
\boxed{
\frac{dV^k}{dt}
+
\Gamma^k_{ij}\dot x^iV^j
=
\frac{\partial x^k}{\partial y^c}
\left(
\frac{d\widetilde V^c}{dt}
+
\widetilde\Gamma^c_{ab}\dot y^a\widetilde V^b
\right)
}
$$

となります。

右辺は接ベクトルの通常の変換則そのものです。従って $DV/dt$ は座標に依らず定まり、Christoffel 係数の非テンソル的な二階微分項が成分微分の座標依存をちょうど補正しています。

<!-- definition-example-start: def-geo13-curve-covariant-derivative -->
**定義の確認：Euclid 空間**

Cartesian 座標の標準接続では

$$
\Gamma^k_{ij}=0.
$$

従って

$$
\frac{DV}{dt}
=
\frac{dV^k}{dt}\partial_k.
$$

これは通常のベクトル値関数の微分です。
<!-- definition-example-end -->

<a id="def-geo13-parallel-transport"></a>
<!-- formal-statement-start -->
> **定義（平行ベクトル場・平行移動）**  
> 曲線 $\gamma:I\to M$ に沿う $V$ が
>
$$
\boxed{
\frac{DV}{dt}=0
}
$$
>
> を満たすとき、$V$ を $\gamma$ に沿う **平行ベクトル場**という。
>
> $a,b\in I$ と $v\in T_{\gamma(a)}M$ に対し、
>
$$
V(a)=v
$$
>
> を満たす平行ベクトル場 $V$ の終値 $V(b)$ を
>
$$
P^\gamma_{a\to b}(v)
$$
>
> と書く。
>
> この写像
>
$$
P^\gamma_{a\to b}:
T_{\gamma(a)}M
\to
T_{\gamma(b)}M
$$
>
> を $\gamma$ に沿う **平行移動**という。
<!-- formal-statement-end -->

<!-- definition-example-start: def-geo13-parallel-transport -->
**定義の確認：Cartesian 座標**

標準 Euclid 接続では平行条件は

$$
\frac{dV^k}{dt}=0
$$

です。

従って各成分は定数で、

$$
V(t)
=
v^k\partial_k
$$

となります。

つまり Euclid 空間での「同じ向き・同じ大きさのベクトルをそのまま運ぶ」という直感を回収します。
<!-- definition-example-end -->

<a id="thm-geo13-parallel-existence"></a>
<!-- formal-statement-start -->
> **定理（曲線に沿う共変微分と平行移動の存在一意性）**  
> $M$ 上にアフィン接続 $\nabla$ があり、
>
$$
\gamma:[a,b]\to M
$$
>
> が滑らかな曲線であるとする。
>
> 任意の
>
$$
v\in T_{\gamma(a)}M
$$
>
> に対して
>
$$
V(a)=v,
\qquad
\frac{DV}{dt}=0
$$
>
> を満たす平行ベクトル場 $V$ が $[a,b]$ 上に一意に存在する。
>
> さらに
>
$$
P^\gamma_{a\to b}
$$
>
> は線形同型であり、逆写像は逆向きの平行移動である。
<!-- formal-statement-end -->

### 証明の見取り図

局所座標では平行条件が

$$
\frac{dV^k}{dt}
=
-
\Gamma^k_{ij}(\gamma(t))
\dot\gamma^i(t)V^j
$$

という線形 ODE になります。

[GEO5 の積分曲線の局所存在・一意性](../GEO5/index.md#thm-geo5-local-integral-curve)で使った ODE の存在一意性と同じ仕組みを使い、曲線像を有限個の座標近傍で覆って解を貼り合わせます。

<!-- proof-start -->
### 証明

まず $\gamma([a,b])$ が一つの座標近傍に入る場合を考えます。

平行条件は

$$
\frac{dV^k}{dt}
+
\Gamma^k_{ij}(\gamma(t))
\dot\gamma^i(t)V^j(t)
=
0.
$$

行列

$$
A^k{}_j(t)
:=
\Gamma^k_{ij}(\gamma(t))
\dot\gamma^i(t)
$$

を使えば

$$
V'(t)=-A(t)V(t)
$$

です。

$A(t)$ は連続、実際には滑らかです。有限区間上では有界なので、ある $C>0$ が存在して

$$
\|A(t)\|\le C
$$

となります。

$h>0$ を

$$
Ch<1
$$

となるように取ります。長さが $h$ 以下の部分区間 $[t_0,t_1]$ 上で、初期値 $V(t_0)=v_0$ に対する積分方程式

$$
V(t)
=
v_0-\int_{t_0}^tA(s)V(s)\,ds
$$

を考えます。

連続関数空間に上限ノルムを入れ、

$$
(\Phi W)(t)
=
v_0-\int_{t_0}^tA(s)W(s)\,ds
$$

と置くと

$$
\|\Phi W_1-\Phi W_2\|_\infty
\le
Ch\,
\|W_1-W_2\|_\infty.
$$

従って $\Phi$ は縮小写像です。[GEO5 の積分曲線の存在証明](../GEO5/index.md#thm-geo5-local-integral-curve)で使った Picard の議論と同様に、この部分区間で一意解が得られます。

$[a,b]$ を長さ $h$ 以下の有限個の区間へ分け、前の区間の終値を次の初期値として繰り返せば、一つの座標近傍に入る全区間で一意解が得られます。

一般の場合、コンパクト集合 $\gamma([a,b])$ を有限個の座標近傍で覆います。Lebesgue 数を用いるか区間のコンパクト性を使って

$$
a=t_0<t_1<\cdots<t_N=b
$$

を取り、各部分曲線

$$
\gamma([t_{r-1},t_r])
$$

が一つの座標近傍に入るようにします。

最初の区間で初期値 $v$ から一意解を作り、その終値を次の区間の初期値として続けます。一意性により重なりで解は一致するので、全区間 $[a,b]$ に一意な平行ベクトル場が得られます。

方程式は $V$ について線形なので、初期値 $v,w$ と定数 $\alpha,\beta$ に対して

$$
P^\gamma_{a\to b}(\alpha v+\beta w)
=
\alpha P^\gamma_{a\to b}(v)
+
\beta P^\gamma_{a\to b}(w).
$$

曲線を逆向きにたどれば、終値から元の初期値へ戻る同じ線形 ODE が得られます。従って

$$
P^\gamma_{b\to a}
\circ
P^\gamma_{a\to b}
=
\operatorname{id},
$$

$$
P^\gamma_{a\to b}
\circ
P^\gamma_{b\to a}
=
\operatorname{id}.
$$

よって平行移動は線形同型です。$\square$
<!-- proof-end -->

ここで初めて、接空間

$$
T_{\gamma(a)}M
\quad\text{と}\quad
T_{\gamma(b)}M
$$

のベクトルを、選んだ曲線と接続を通して比較できるようになりました。

---

## 6. 計量と接続を両立させる

GEO12 で Riemann 計量 $g$ を入れました。

接続でベクトルを平行移動したとき、長さや角度まで変わってしまう接続も一般には作れます。

Riemann 幾何では、計量を保存する接続が特に重要です。

<a id="def-geo13-metric-compatibility"></a>
<!-- formal-statement-start -->
> **定義（計量両立性）**  
> Riemann 多様体 $(M,g)$ 上のアフィン接続 $\nabla$ が、任意の
>
$$
X,Y,Z\in\mathfrak X(M)
$$
>
> に対して
>
$$
\boxed{
X\bigl(g(Y,Z)\bigr)
=
g(\nabla_XY,Z)
+
g(Y,\nabla_XZ)
}
$$
>
> を満たすとき、$\nabla$ は $g$ と **両立する**、または **計量両立**であるという。
<!-- formal-statement-end -->

<!-- definition-example-start: def-geo13-metric-compatibility -->
**定義の確認：Euclid 計量と標準接続**

標準 Euclid 計量では

$$
g(Y,Z)=\sum_jY^jZ^j.
$$

従って

$$
X(g(Y,Z))
=
\sum_j
\{X(Y^j)Z^j+Y^jX(Z^j)\}.
$$

一方、標準接続では

$$
D_XY=X(Y^j)\partial_j,
\qquad
D_XZ=X(Z^j)\partial_j.
$$

従って

$$
g(D_XY,Z)+g(Y,D_XZ)
$$

は上の式と一致します。よって標準接続は Euclid 計量と両立します。
<!-- definition-example-end -->

<a id="prop-geo13-parallel-isometry"></a>
<!-- formal-statement-start -->
> **命題（計量両立接続の平行移動は内積を保存する）**  
> $(M,g)$ 上の接続 $\nabla$ が $g$ と両立するとする。
>
> 曲線 $\gamma$ に沿う二つのベクトル場 $V,W$ に対して
>
$$
\boxed{
\frac{d}{dt}g(V,W)
=
g\left(\frac{DV}{dt},W\right)
+
g\left(V,\frac{DW}{dt}\right)
}
$$
>
> が成り立つ。
>
> 特に $V,W$ が平行なら
>
$$
g(V(t),W(t))
$$
>
> は一定である。
>
> 従って平行移動
>
$$
P^\gamma_{a\to b}
$$
>
> は接空間の内積を保存する線形同型である。
<!-- formal-statement-end -->

<!-- proof-start -->
### 証明

局所座標で

$$
V=V^i\partial_i,
\qquad
W=W^j\partial_j
$$

と書きます。まず左辺を直接微分すると

$$
\frac{d}{dt}g(V,W)
=
\frac{d}{dt}
\left(
g_{ij}(\gamma(t))V^iW^j
\right).
$$

従って

$$
\begin{aligned}
\frac{d}{dt}g(V,W)
={}&
\dot\gamma^k(\partial_kg_{ij})V^iW^j
+
g_{ij}\frac{dV^i}{dt}W^j
+
g_{ij}V^i\frac{dW^j}{dt}.
\end{aligned}
$$

計量両立性を座標基底へ適用すると

$$
\partial_kg_{ij}
=
g_{\ell j}\Gamma^\ell_{ki}
+
g_{i\ell}\Gamma^\ell_{kj}.
$$

これを代入して項をまとめれば

$$
\begin{aligned}
\frac{d}{dt}g(V,W)
={}&
g_{ij}
\left(
\frac{dV^i}{dt}
+
\Gamma^i_{k\ell}\dot\gamma^kV^\ell
\right)W^j
\\
&+
g_{ij}V^i
\left(
\frac{dW^j}{dt}
+
\Gamma^j_{k\ell}\dot\gamma^kW^\ell
\right).
\end{aligned}
$$

括弧内は曲線に沿う共変微分の成分なので

$$
\frac{d}{dt}g(V,W)
=
g\left(\frac{DV}{dt},W\right)
+
g\left(V,\frac{DW}{dt}\right).
$$

$V,W$ が平行なら右辺は0です。従って

$$
g(V(t),W(t))
$$

は一定です。

初期ベクトル $v,w$ の平行移動を $V,W$ とすれば

$$
g_{\gamma(b)}
\left(
P^\gamma_{a\to b}v,
P^\gamma_{a\to b}w
\right)
=
g_{\gamma(a)}(v,w).
$$

$\square$
<!-- proof-end -->

特に

$$
|P^\gamma_{a\to b}v|_g=|v|_g
$$

です。

---

## 7. Levi-Civita 接続は計量から一意に決まる

Riemann 計量 $g$ だけを与えたとき、計量と両立する接続は一つとは限りません。

そこで、もう一つ自然な条件

$$
T=0
$$

を課します。

<a id="def-geo13-levi-civita"></a>
<!-- formal-statement-start -->
> **定義（Levi-Civita 接続）**  
> Riemann 多様体 $(M,g)$ 上のアフィン接続 $\nabla$ が
>
> 1. $g$ と計量両立であり、
> 2. 捩率が0である
>
> とき、$\nabla$ を $g$ の **Levi-Civita 接続**という。
<!-- formal-statement-end -->

<!-- definition-example-start: def-geo13-levi-civita -->
**定義の確認：Euclid 空間**

標準 Euclid 接続 $D$ は、すでに

$$
T=0
$$

かつ Euclid 計量と両立することを確認しました。

従って $D$ は Euclid 計量の Levi-Civita 接続です。
<!-- definition-example-end -->

二つの条件だけで接続が本当に一意に決まることは、最初は意外に見えます。

その鍵が Koszul の公式です。

<a id="thm-geo13-koszul"></a>
<!-- formal-statement-start -->
> **定理（Koszul の公式）**  
> $(M,g)$ 上の Levi-Civita 接続 $\nabla$ は、任意のベクトル場 $X,Y,Z$ に対して
>
$$
\boxed{
\begin{aligned}
2g(\nabla_XY,Z)
={}&
Xg(Y,Z)
+
Yg(Z,X)
-
Zg(X,Y)
\\
&+
g([X,Y],Z)
-
g([Y,Z],X)
+
g([Z,X],Y)
\end{aligned}
}
$$
>
> を満たす。
>
> 特に右辺は $g$ と Lie 括弧だけで決まるため、Levi-Civita 接続が存在するなら一意である。
<!-- formal-statement-end -->

### 証明の見取り図

計量両立性を

$$
(X;Y,Z),\qquad
(Y;Z,X),\qquad
(Z;X,Y)
$$

の三通りに書き、

$$
1+2-3
$$

を取ります。

その後、捩率0

$$
\nabla_XY-\nabla_YX=[X,Y]
$$

を使うと不要な共変微分が全て Lie 括弧へ置き換わり、最後に

$$
2g(\nabla_XY,Z)
$$

だけが残ります。

<!-- proof-start -->
### 証明

計量両立性から

$$
Xg(Y,Z)
=
g(\nabla_XY,Z)
+
g(Y,\nabla_XZ),
$$

$$
Yg(Z,X)
=
g(\nabla_YZ,X)
+
g(Z,\nabla_YX),
$$

$$
Zg(X,Y)
=
g(\nabla_ZX,Y)
+
g(X,\nabla_ZY).
$$

最初の二式を足し、第三式を引きます。

$$
\begin{aligned}
&
Xg(Y,Z)
+
Yg(Z,X)
-
Zg(X,Y)
\\
={}&
g(\nabla_XY,Z)
+
g(Y,\nabla_XZ)
\\
&+
g(\nabla_YZ,X)
+
g(Z,\nabla_YX)
\\
&-
g(\nabla_ZX,Y)
-
g(X,\nabla_ZY).
\end{aligned}
$$

計量の対称性で内積の順序をそろえます。

捩率0より

$$
\nabla_XZ-\nabla_ZX=[X,Z],
$$

$$
\nabla_YX-\nabla_XY=[Y,X]=-[X,Y],
$$

$$
\nabla_YZ-\nabla_ZY=[Y,Z].
$$

これらを整理すると

$$
\begin{aligned}
&
Xg(Y,Z)
+
Yg(Z,X)
-
Zg(X,Y)
\\
={}&
2g(\nabla_XY,Z)
-
g([X,Y],Z)
+
g([Y,Z],X)
-
g([Z,X],Y).
\end{aligned}
$$

従って

$$
\begin{aligned}
2g(\nabla_XY,Z)
={}&
Xg(Y,Z)
+
Yg(Z,X)
-
Zg(X,Y)
\\
&+
g([X,Y],Z)
-
g([Y,Z],X)
+
g([Z,X],Y).
\end{aligned}
$$

これが Koszul の公式です。

右辺は $g,X,Y,Z$ と Lie 括弧だけから定まります。$g$ は各点で非退化なので、全ての $Z$ に対する

$$
g(\nabla_XY,Z)
$$

が決まれば $\nabla_XY$ は一意です。$\square$
<!-- proof-end -->

ここまでで一意性は得られました。

残る問題は、Koszul の公式の右辺が本当に接続を作るかです。

<a id="thm-geo13-levi-civita-existence"></a>
<!-- formal-statement-start -->
> **定理（Levi-Civita 接続の存在一意性）**  
> 任意の Riemann 多様体 $(M,g)$ には、一意な Levi-Civita 接続が存在する。
>
> その接続は Koszul の公式によって特徴付けられる。
<!-- formal-statement-end -->

### 証明の見取り図

Koszul の公式の右辺を

$$
K(X,Y,Z)
$$

と書きます。

核心は、$K$ が第三変数 $Z$ について $C^\infty(M)$-線形になることです。すると各点で

$$
Z_p\longmapsto\frac12K(X,Y,Z)(p)
$$

は余ベクトルになります。

[GEO12 の flat・sharp 同型](../GEO12/index.md#def-geo12-musical)で、この余ベクトルに対応する唯一のベクトルを $\nabla_XY$ とすれば接続候補が作れます。

その後、

- 第一変数では $C^\infty$-線形
- 第二変数では Leibniz 則
- $K(X,Y,Z)-K(Y,X,Z)$ から捩率0
- $K(X,Y,Z)+K(X,Z,Y)$ から計量両立性

を順に確認します。

<!-- proof-start -->
### 証明

Koszul の右辺を

$$
\begin{aligned}
K(X,Y,Z)
:={}&
Xg(Y,Z)
+
Yg(Z,X)
-
Zg(X,Y)
\\
&+
g([X,Y],Z)
-
g([Y,Z],X)
+
g([Z,X],Y)
\end{aligned}
$$

と置きます。

#### 1. 第三変数について $C^\infty$-線形

$f\in C^\infty(M)$ とします。

まず

$$
Xg(Y,fZ)
=
X(f)g(Y,Z)
+
fXg(Y,Z),
$$

$$
Yg(fZ,X)
=
Y(f)g(Z,X)
+
fYg(Z,X).
$$

Lie 括弧の積の法則から

$$
[Y,fZ]
=
Y(f)Z+f[Y,Z],
$$

$$
[fZ,X]
=
f[Z,X]-X(f)Z.
$$

従って $K(X,Y,fZ)$ を展開すると、

$$
X(f)g(Y,Z)
$$

は最後の Lie 括弧項から出る

$$
-X(f)g(Z,Y)
$$

と打ち消し合います。

同様に

$$
Y(f)g(Z,X)
$$

は

$$
-Y(f)g(Z,X)
$$

と打ち消し合います。

残る項は全て $f$ を因子に持つので

$$
\boxed{
K(X,Y,fZ)=fK(X,Y,Z)
}
$$

です。

従って各点 $p$ で

$$
Z_p\longmapsto
\frac12K(X,Y,Z)(p)
$$

は $T_pM$ 上の線形形式です。

$g_p$ は内積なので [flat・sharp 同型](../GEO12/index.md#def-geo12-musical) により、この線形形式に対応する唯一のベクトル

$$
(\nabla_XY)_p\in T_pM
$$

が存在し、

$$
g(\nabla_XY,Z)
=
\frac12K(X,Y,Z)
$$

を満たします。

局所座標基底 $\partial_\ell$ に対して右辺は滑らかな関数です。また $G^{-1}=(g^{k\ell})$ も滑らかなので、$\nabla_XY$ の成分も滑らかです。

#### 2. 接続の公理

同じ展開を第一変数について行うと

$$
K(fX,Y,Z)
=
fK(X,Y,Z).
$$

従って

$$
\nabla_{fX}Y
=
f\nabla_XY.
$$

第二変数については、関数微分の項が二つ残り、

$$
K(X,fY,Z)
=
fK(X,Y,Z)
+
2X(f)g(Y,Z).
$$

従って

$$
\begin{aligned}
g(\nabla_X(fY),Z)
&=
\frac12K(X,fY,Z)
\\
&=
f\,g(\nabla_XY,Z)
+
X(f)g(Y,Z)
\\
&=
g(f\nabla_XY+X(f)Y,Z).
\end{aligned}
$$

全ての $Z$ に対して成り立ち、$g$ は非退化なので

$$
\nabla_X(fY)
=
f\nabla_XY+X(f)Y.
$$

実線形性と加法性は $K$ の式から直接従います。従って $\nabla$ はアフィン接続です。

#### 3. 捩率0

$K(X,Y,Z)$ と $K(Y,X,Z)$ の差を取ります。

項を対応させると

$$
K(X,Y,Z)-K(Y,X,Z)
=
2g([X,Y],Z).
$$

従って

$$
\begin{aligned}
2g(\nabla_XY-\nabla_YX,Z)
&=
2g([X,Y],Z).
\end{aligned}
$$

全ての $Z$ に対して成り立つので

$$
\nabla_XY-\nabla_YX=[X,Y].
$$

よって捩率は0です。

#### 4. 計量両立性

今度は第二・第三変数を入れ替えて足します。

直接整理すると

$$
K(X,Y,Z)+K(X,Z,Y)
=
2Xg(Y,Z).
$$

従って

$$
\begin{aligned}
2g(\nabla_XY,Z)
+
2g(\nabla_XZ,Y)
=
2Xg(Y,Z).
\end{aligned}
$$

計量の対称性から

$$
Xg(Y,Z)
=
g(\nabla_XY,Z)
+
g(Y,\nabla_XZ).
$$

従って $\nabla$ は $g$ と両立します。

以上で Koszul の公式から Levi-Civita 接続が存在することを示しました。

一意性は Koszul の公式の定理ですでに示したので、Levi-Civita 接続は一意です。$\square$
<!-- proof-end -->

この定理の重要点は、**計量 $g$ を選ぶと、自然な接続をさらに選ぶ自由は残らない**ことです。

---

## 8. Levi-Civita 接続の Christoffel 係数

Koszul の公式へ座標基底を入れると、実際の計算に使う公式が得られます。

座標基底では

$$
[\partial_i,\partial_j]=0.
$$

<a id="prop-geo13-levi-civita-christoffel"></a>
<!-- formal-statement-start -->
> **命題（Levi-Civita 接続の Christoffel 係数公式）**  
> Riemann 計量
>
$$
g=g_{ij}\,dx^i\otimes dx^j
$$
>
> の Levi-Civita 接続を考える。
>
> $G^{-1}=(g^{ij})$ とすると、
>
$$
\boxed{
\Gamma^k_{ij}
=
\frac12
g^{k\ell}
\left(
\partial_i g_{j\ell}
+
\partial_j g_{i\ell}
-
\partial_\ell g_{ij}
\right)
}
$$
>
> である。
<!-- formal-statement-end -->

<!-- proof-start -->
### 証明

Koszul の公式へ

$$
X=\partial_i,
\qquad
Y=\partial_j,
\qquad
Z=\partial_\ell
$$

を代入します。

座標基底の Lie 括弧は0なので

$$
2g(\nabla_{\partial_i}\partial_j,\partial_\ell)
=
\partial_i g_{j\ell}
+
\partial_j g_{\ell i}
-
\partial_\ell g_{ij}.
$$

一方

$$
\nabla_{\partial_i}\partial_j
=
\Gamma^m_{ij}\partial_m
$$

だから

$$
g(\nabla_{\partial_i}\partial_j,\partial_\ell)
=
g_{m\ell}\Gamma^m_{ij}.
$$

従って

$$
2g_{m\ell}\Gamma^m_{ij}
=
\partial_i g_{j\ell}
+
\partial_j g_{i\ell}
-
\partial_\ell g_{ij}.
$$

両辺へ $g^{k\ell}$ を掛け、$\ell$ について和を取ると

$$
2\Gamma^k_{ij}
=
g^{k\ell}
\left(
\partial_i g_{j\ell}
+
\partial_j g_{i\ell}
-
\partial_\ell g_{ij}
\right).
$$

よって主張が従います。$\square$
<!-- proof-end -->

式から直ちに

$$
\Gamma^k_{ij}
=
\Gamma^k_{ji}
$$

です。これは Levi-Civita 接続の捩率が0であることの座標表示です。

### 例：Euclid 平面の極座標

GEO12 で

$$
g=dr^2+r^2d\theta^2
$$

でした。

計量行列と逆行列は

$$
G=
\begin{pmatrix}
1&0\\
0&r^2
\end{pmatrix},
\qquad
G^{-1}
=
\begin{pmatrix}
1&0\\
0&r^{-2}
\end{pmatrix}.
$$

非零の微分は

$$
\partial_r g_{\theta\theta}=2r
$$

だけです。

従って

$$
\Gamma^r_{\theta\theta}
=
-\frac12\partial_r(r^2)
=
-r,
$$

$$
\Gamma^\theta_{r\theta}
=
\Gamma^\theta_{\theta r}
=
\frac12r^{-2}\partial_r(r^2)
=
\frac1r.
$$

他は0です。

つまり平面は同じ Euclid 平面でも、極座標では

$$
\Gamma^k_{ij}\ne0
$$

になります。

これは Christoffel 係数が「空間そのものの曲がり」ではなく、接続と座標の組に依存する係数であることを端的に示します。

### 例：一次元計量

実直線上で

$$
g=e^{2\phi(x)}dx^2
$$

とします。

$$
g_{11}=e^{2\phi},
\qquad
g^{11}=e^{-2\phi}.
$$

従って

$$
\Gamma^1_{11}
=
\frac12
e^{-2\phi}
\partial_x(e^{2\phi})
=
\phi'(x).
$$

曲線 $\gamma(t)=t$ に沿って

$$
V(t)=v(t)\partial_x
$$

が平行である条件は

$$
v'(t)+\phi'(t)v(t)=0.
$$

従って

$$
v(t)=Ce^{-\phi(t)}.
$$

計量ノルムは

$$
|V(t)|_g^2
=
e^{2\phi(t)}C^2e^{-2\phi(t)}
=
C^2
$$

で一定です。

平行移動が長さを保存することを直接確認できました。

---

## 9. 共変微分をテンソル場へ拡張する

接続は最初、ベクトル場を微分する演算として導入しました。

しかし後続の曲率・Hessian・微分形式の計算では、余ベクトル場や一般テンソル場も微分したくなります。

まず1形式 $\alpha$ に対して、スカラー関数 $\alpha(Y)$ の Leibniz 則が保たれるようにします。

<a id="def-geo13-tensor-covariant-derivative"></a>
<!-- formal-statement-start -->
> **定義（テンソル場の共変微分）**  
> アフィン接続 $\nabla$ を固定する。
>
> 滑らかな関数 $f$ には
>
$$
\nabla_Xf:=X(f)
$$
>
> とする。
>
> 1形式 $\alpha$ には
>
$$
\boxed{
(\nabla_X\alpha)(Y)
=
X(\alpha(Y))
-
\alpha(\nabla_XY)
}
$$
>
> とする。
>
> 一般のテンソル場には、
>
> - テンソル積に対する Leibniz 則
> - ベクトルと余ベクトルの自然な評価を微分の前後で保つこと
>
> を満たすよう一意に拡張する。
>
> この演算を **テンソル場の共変微分**という。
<!-- formal-statement-end -->

<!-- definition-example-start: def-geo13-tensor-covariant-derivative -->
**定義の確認：1形式**

座標1形式

$$
\alpha=\alpha_jdx^j
$$

に対して

$$
(\nabla_i\alpha)_j
:=
(\nabla_{\partial_i}\alpha)(\partial_j)
$$

と置きます。

定義から

$$
\begin{aligned}
(\nabla_i\alpha)_j
&=
\partial_i(\alpha(\partial_j))
-
\alpha(\nabla_{\partial_i}\partial_j)
\\
&=
\partial_i\alpha_j
-
\alpha(\Gamma^k_{ij}\partial_k)
\\
&=
\partial_i\alpha_j
-
\Gamma^k_{ij}\alpha_k.
\end{aligned}
$$

上付き添字には $+\Gamma$、下付き添字には $-\Gamma$ が現れるという基本形が見えます。
<!-- definition-example-end -->

<a id="prop-geo13-tensor-coordinate"></a>
<!-- formal-statement-start -->
> **命題（テンソル場の共変微分の座標表示）**  
> 型 $(r,s)$ テンソル場
>
$$
T
=
T^{a_1\cdots a_r}{}_{b_1\cdots b_s}
\,
\partial_{a_1}\otimes\cdots\otimes\partial_{a_r}
\otimes
dx^{b_1}\otimes\cdots\otimes dx^{b_s}
$$
>
> に対して
>
$$
\boxed{
\begin{aligned}
(\nabla_iT)^{a_1\cdots a_r}{}_{b_1\cdots b_s}
={}&
\partial_i
T^{a_1\cdots a_r}{}_{b_1\cdots b_s}
\\
&+
\sum_{\mu=1}^r
\Gamma^{a_\mu}_{ic}
T^{a_1\cdots c\cdots a_r}{}_{b_1\cdots b_s}
\\
&-
\sum_{\nu=1}^s
\Gamma^c_{ib_\nu}
T^{a_1\cdots a_r}{}_{b_1\cdots c\cdots b_s}.
\end{aligned}
}
$$
<!-- formal-statement-end -->

<!-- proof-start -->
### 証明

まず双対基底の共変微分を求めます。

$$
dx^b(\partial_a)=\delta^b_a
$$

は定数なので

$$
0
=
\nabla_i\bigl(dx^b(\partial_a)\bigr).
$$

1形式の共変微分の定義から

$$
0
=
(\nabla_i dx^b)(\partial_a)
+
dx^b(\nabla_i\partial_a).
$$

ここで

$$
\nabla_i\partial_a
=
\Gamma^c_{ia}\partial_c
$$

だから

$$
(\nabla_i dx^b)(\partial_a)
=
-\Gamma^b_{ia}.
$$

従って

$$
\boxed{
\nabla_i dx^b
=
-\Gamma^b_{ic}dx^c
}.
$$

次に $T$ の座標表示へ Leibniz 則を繰り返し適用します。

成分関数を微分する項から

$$
\partial_iT^{a_1\cdots a_r}{}_{b_1\cdots b_s}
$$

が出ます。

各ベクトル基底 $\partial_{a_\mu}$ を微分するたびに

$$
\nabla_i\partial_{a_\mu}
=
\Gamma^c_{ia_\mu}\partial_c
$$

が入るので、上付き添字ごとに $+\Gamma$ の項が一つずつ現れます。

各余ベクトル基底 $dx^{b_\nu}$ を微分するたびに

$$
\nabla_i dx^{b_\nu}
=
-\Gamma^{b_\nu}_{ic}dx^c
$$

が入るので、下付き添字ごとに $-\Gamma$ の項が一つずつ現れます。

全ての項を同じテンソル基底で読み直すと

$$
\begin{aligned}
(\nabla_iT)^{a_1\cdots a_r}{}_{b_1\cdots b_s}
={}&
\partial_i
T^{a_1\cdots a_r}{}_{b_1\cdots b_s}
\\
&+
\sum_{\mu=1}^r
\Gamma^{a_\mu}_{ic}
T^{a_1\cdots c\cdots a_r}{}_{b_1\cdots b_s}
\\
&-
\sum_{\nu=1}^s
\Gamma^c_{ib_\nu}
T^{a_1\cdots a_r}{}_{b_1\cdots c\cdots b_s}.
\end{aligned}
$$

これが主張の公式です。$\square$
<!-- proof-end -->

### Levi-Civita 接続では計量そのものが平行

計量両立性はテンソル場の共変微分の言葉では

$$
\boxed{
\nabla g=0
}
$$

です。

座標では

$$
\nabla_i g_{jk}
=
\partial_i g_{jk}
-
\Gamma^\ell_{ij}g_{\ell k}
-
\Gamma^\ell_{ik}g_{j\ell}
=
0.
$$

つまり Levi-Civita 接続は、計量を微分して0にする捩率0接続です。

---

## 10. 何が「自然」なのか

ここまでに二種類の自由が現れました。

まず、滑らかな多様体だけでは接続は一意に決まりません。実際、一つの接続 $\nabla$ と任意の型 $(1,2)$ テンソル場 $A$ から

$$
\widetilde\nabla_XY
=
\nabla_XY+A(X,Y)
$$

と置けば、再びアフィン接続になります。

一方、Riemann 計量 $g$ を固定し、

$$
\text{計量両立}
\qquad\text{かつ}\qquad
T=0
$$

を要求すると、Koszul の公式が全ての成分を決めます。

従って

$$
\boxed{
g
\longmapsto
\nabla^{\mathrm{LC}}
}
$$

という標準的な選択が得られます。

GEO14 では、この Levi-Civita 接続を使って

$$
\frac{D\dot\gamma}{dt}=0
$$

という条件を調べます。これが測地線方程式と指数写像へつながります。

---

## 11. 演習

### Level A

<a id="ex-geo13-a01"></a>
#### GEO13-A01 Euclid 標準接続の共変微分
- Level: A

$\mathbb R^2$ の標準接続 $D$ で

$$
X=x\partial_x+y\partial_y,
\qquad
Y=y\partial_x+x\partial_y
$$

とする。

1. $D_XY$ を求めよ。
2. $D_YX$ を求めよ。
3. $[X,Y]$ を求め、捩率が0であることをこの $X,Y$ について確認せよ。

<!-- solution-start -->
**解答**

1. $Y$ の成分は

   $$
   Y^x=y,
   \qquad
   Y^y=x.
   $$

   標準接続では成分を方向微分するので

   $$
   D_XY
   =
   X(y)\partial_x+X(x)\partial_y.
   $$

   ここで

   $$
   X(y)=y,
   \qquad
   X(x)=x.
   $$

   従って

   $$
   \boxed{
   D_XY
   =
   y\partial_x+x\partial_y
   =
   Y
   }.
   $$

2. $X$ の成分は $(x,y)$ なので

   $$
   D_YX
   =
   Y(x)\partial_x+Y(y)\partial_y.
   $$

   $Y(x)=y$、$Y(y)=x$ だから

   $$
   \boxed{
   D_YX
   =
   y\partial_x+x\partial_y
   =
   Y
   }.
   $$

3. 標準座標では

   $$
   [X,Y]
   =
   D_XY-D_YX.
   $$

   上の計算から

   $$
   [X,Y]=0.
   $$

   従って

   $$
   T(X,Y)
   =
   D_XY-D_YX-[X,Y]
   =
   Y-Y-0
   =
   0.
   $$

   標準接続が捩率0であることを具体的に確認できました。
<!-- solution-end -->

<a id="ex-geo13-a02"></a>
#### GEO13-A02 極座標の Christoffel 係数
- Level: A

平面の極座標で

$$
g=dr^2+r^2d\theta^2
$$

とする。

1. $G^{-1}$ を求めよ。
2. Levi-Civita 接続の非零 Christoffel 係数を全て求めよ。
3. $\nabla_{\partial_\theta}\partial_\theta$ と $\nabla_{\partial_r}\partial_\theta$ を求めよ。

<!-- solution-start -->
**解答**

1. 計量行列は

   $$
   G
   =
   \begin{pmatrix}
   1&0\\
   0&r^2
   \end{pmatrix}.
   $$

   従って

   $$
   \boxed{
   G^{-1}
   =
   \begin{pmatrix}
   1&0\\
   0&r^{-2}
   \end{pmatrix}
   }.
   $$

2. 非零の計量係数の微分は

   $$
   \partial_rg_{\theta\theta}=2r
   $$

   だけです。

   まず

   $$
   \Gamma^r_{\theta\theta}
   =
   \frac12g^{rr}
   \left(
   0+0-\partial_rg_{\theta\theta}
   \right)
   =
   -r.
   $$

   次に

   $$
   \Gamma^\theta_{r\theta}
   =
   \frac12g^{\theta\theta}
   \partial_rg_{\theta\theta}
   =
   \frac12r^{-2}(2r)
   =
   \frac1r.
   $$

   捩率0なので

   $$
   \Gamma^\theta_{\theta r}
   =
   \Gamma^\theta_{r\theta}
   =
   \frac1r.
   $$

   従って非零成分は

   $$
   \boxed{
   \Gamma^r_{\theta\theta}=-r,
   \qquad
   \Gamma^\theta_{r\theta}
   =
   \Gamma^\theta_{\theta r}
   =
   \frac1r
   }.
   $$

3. 定義から

   $$
   \boxed{
   \nabla_{\partial_\theta}\partial_\theta
   =
   -r\partial_r
   }
   $$

   であり、

   $$
   \boxed{
   \nabla_{\partial_r}\partial_\theta
   =
   \frac1r\partial_\theta
   }.
   $$
<!-- solution-end -->

<a id="ex-geo13-a03"></a>
#### GEO13-A03 一次元計量の平行移動
- Level: A

実直線上で

$$
g=e^{2\phi(x)}dx^2
$$

とし、曲線

$$
\gamma(t)=t,
\qquad
a\le t\le b
$$

を考える。

1. Levi-Civita 接続の $\Gamma^1_{11}$ を求めよ。
2.
   $$
   V(t)=v(t)\partial_x
   $$
   が平行であるための ODE を求めよ。
3. 初期値 $V(a)=v_0\partial_x$ から $V(t)$ を求めよ。
4. $|V(t)|_g$ が一定であることを直接確認せよ。

<!-- solution-start -->
**解答**

1.

   $$
   g_{11}=e^{2\phi},
   \qquad
   g^{11}=e^{-2\phi}.
   $$

   一次元なので

   $$
   \Gamma^1_{11}
   =
   \frac12g^{11}\partial_xg_{11}.
   $$

   従って

   $$
   \Gamma^1_{11}
   =
   \frac12e^{-2\phi}
   (2\phi'e^{2\phi})
   =
   \boxed{\phi'}.
   $$

2. $\dot\gamma=1$ なので

   $$
   \frac{DV}{dt}
   =
   \left(
   v'(t)+\phi'(t)v(t)
   \right)\partial_x.
   $$

   平行条件は

   $$
   \boxed{
   v'+\phi'v=0
   }.
   $$

3.

   方程式へ $e^{\phi(t)}$ を掛けると

   $
   e^\phi v'
   +
   \phi'e^\phi v
   =
   \frac{d}{dt}
   \left(
   e^\phi v
   \right)
   =
   0.
   $

   従って

   $
   v(t)
   =
   C e^{-\phi(t)}.
   $

   初期条件

   $$
   v(a)=v_0
   $$

   から

   $$
   C=v_0e^{\phi(a)}.
   $$

   よって

   $$
   \boxed{
   V(t)
   =
   v_0e^{\phi(a)-\phi(t)}
   \partial_x
   }.
   $$

4. 計量ノルムの二乗は

   $$
   |V(t)|_g^2
   =
   e^{2\phi(t)}
   v_0^2
   e^{2\phi(a)-2\phi(t)}
   =
   v_0^2e^{2\phi(a)}.
   $$

   これは $t$ に依存しません。

   従って Levi-Civita 接続による平行移動が長さを保存することを直接確認できました。
<!-- solution-end -->

<a id="ex-geo13-a04"></a>
#### GEO13-A04 1形式の共変微分
- Level: A

極座標平面

$$
g=dr^2+r^2d\theta^2
$$

で

$$
\alpha=r^2d\theta
$$

とする。

$(\nabla_i\alpha)_j$ を全て求め、$\nabla\alpha$ を

$$
dr\otimes dr,\quad
dr\otimes d\theta,\quad
d\theta\otimes dr,\quad
d\theta\otimes d\theta
$$

で表示せよ。

<!-- solution-start -->
**解答**

Christoffel 係数は

$$
\Gamma^r_{\theta\theta}=-r,
\qquad
\Gamma^\theta_{r\theta}
=
\Gamma^\theta_{\theta r}
=
\frac1r
$$

で、他は0です。

$\alpha$ の成分は

$$
\alpha_r=0,
\qquad
\alpha_\theta=r^2.
$$

1形式の公式

$$
(\nabla_i\alpha)_j
=
\partial_i\alpha_j
-
\Gamma^k_{ij}\alpha_k
$$

を使います。

まず

$$
(\nabla_r\alpha)_r
=
0.
$$

次に

$$
\begin{aligned}
(\nabla_r\alpha)_\theta
&=
\partial_r(r^2)
-
\Gamma^\theta_{r\theta}r^2
\\
&=
2r-\frac1r r^2
\\
&=
r.
\end{aligned}
$$

また

$$
\begin{aligned}
(\nabla_\theta\alpha)_r
&=
0
-
\Gamma^\theta_{\theta r}r^2
\\
&=
-r.
\end{aligned}
$$

最後に

$$
(\nabla_\theta\alpha)_\theta
=
0
-
\Gamma^r_{\theta\theta}\alpha_r
=
0.
$$

従って

$$
\boxed{
\nabla\alpha
=
r\,dr\otimes d\theta
-
r\,d\theta\otimes dr
}.
$$
<!-- solution-end -->

### Level B

<a id="ex-geo13-b01"></a>
#### GEO13-B01 接続全体はアフィン空間になる
- Level: B

$\nabla$ をアフィン接続、$A$ を型 $(1,2)$ テンソル場とする。

$$
\widetilde\nabla_XY
=
\nabla_XY+A(X,Y)
$$

と置く。

1. $\widetilde\nabla$ がアフィン接続であることを接続の公理から示せ。
2. $\widetilde\nabla$ の捩率 $\widetilde T$ と $\nabla$ の捩率 $T$ の関係を求めよ。
3. $A(X,Y)=A(Y,X)$ なら、$\nabla$ と $\widetilde\nabla$ の捩率が一致することを示せ。

<!-- solution-start -->
**解答**

1. 第一変数について、$A$ はテンソルなので

   $$
   A(fX,Y)=fA(X,Y).
   $$

   従って

   $$
   \begin{aligned}
   \widetilde\nabla_{fX}Y
   &=
   \nabla_{fX}Y+A(fX,Y)
   \\
   &=
   f\nabla_XY+fA(X,Y)
   \\
   &=
   f\widetilde\nabla_XY.
   \end{aligned}
   $$

   第二変数について

   $$
   A(X,fY)=fA(X,Y)
   $$

   だから

   $$
   \begin{aligned}
   \widetilde\nabla_X(fY)
   &=
   \nabla_X(fY)+A(X,fY)
   \\
   &=
   X(f)Y+f\nabla_XY+fA(X,Y)
   \\
   &=
   X(f)Y+f\widetilde\nabla_XY.
   \end{aligned}
   $$

   実線形性・加法性も $\nabla$ と $A$ の線形性から従います。よって $\widetilde\nabla$ は接続です。

2. 定義から

   $$
   \begin{aligned}
   \widetilde T(X,Y)
   &=
   \widetilde\nabla_XY
   -
   \widetilde\nabla_YX
   -
   [X,Y]
   \\
   &=
   \nabla_XY+A(X,Y)
   -
   \nabla_YX-A(Y,X)
   -
   [X,Y]
   \\
   &=
   T(X,Y)+A(X,Y)-A(Y,X).
   \end{aligned}
   $$

   従って

   $$
   \boxed{
   \widetilde T
   =
   T+A-A^{\mathrm{op}}
   }.
   $$

3. $A$ が対称なら

   $$
   A(X,Y)-A(Y,X)=0.
   $$

   よって

   $$
   \boxed{
   \widetilde T=T
   }.
   $$

   接続を対称な $(1,2)$ テンソルだけずらしても捩率は変わりません。
<!-- solution-end -->

<a id="ex-geo13-b02"></a>
#### GEO13-B02 平行移動が角度まで保存する理由
- Level: B

$(M,g)$ 上の計量両立接続 $\nabla$ と曲線 $\gamma:[a,b]\to M$ を考える。

初期ベクトル

$$
v,w\in T_{\gamma(a)}M
$$

の平行移動を

$$
V(t),
\qquad
W(t)
$$

とする。

1. $g(V,W)$ が一定であることを示せ。
2. $|V|_g$ と $|W|_g$ が一定であることを示せ。
3. $v,w\ne0$ のとき、両者のなす角が平行移動で保存されることを示せ。

<!-- solution-start -->
**解答**

1. 計量両立性の曲線版から

   $$
   \frac{d}{dt}g(V,W)
   =
   g\left(\frac{DV}{dt},W\right)
   +
   g\left(V,\frac{DW}{dt}\right).
   $$

   $V,W$ は平行なので

   $$
   \frac{DV}{dt}
   =
   \frac{DW}{dt}
   =
   0.
   $$

   従って

   $$
   \frac{d}{dt}g(V,W)=0.
   $$

   よって

   $$
   \boxed{
   g(V(t),W(t))
   =
   g(v,w)
   }.
   $$

2. $W=V$ とすれば

   $$
   g(V,V)
   $$

   が一定です。

   正の平方根を取って

   $$
   \boxed{
   |V(t)|_g=|v|_g
   }.
   $$

   同様に

   $$
   |W(t)|_g=|w|_g.
   $$

3. 角 $\theta(t)$ は

   $$
   \cos\theta(t)
   =
   \frac{g(V(t),W(t))}
   {|V(t)|_g|W(t)|_g}
   $$

   で決まります。

   分子も分母も一定なので

   $$
   \cos\theta(t)
   $$

   は一定です。

   従って

   $$
   \boxed{
   \theta(t)=\theta(a)
   }.
   $$

   平行移動は長さだけでなく内積と角度も保存します。
<!-- solution-end -->

<a id="ex-geo13-b03"></a>
#### GEO13-B03 二次元共形計量の Levi-Civita 接続
- Level: B

$$
g
=
e^{2\phi(x,y)}
(dx^2+dy^2)
$$

とする。

$\phi_x=\partial_x\phi$、$\phi_y=\partial_y\phi$ と書く。

1. 一般公式から
   $$
   \Gamma^k_{ij}
   =
   \delta^k_j\phi_i
   +
   \delta^k_i\phi_j
   -
   \delta_{ij}\phi^k
   $$
   を導け。
2. 二次元で非零になり得る Christoffel 係数を具体的に列挙せよ。
3. $\phi$ が定数なら全て0になることを確認せよ。

<!-- solution-start -->
**解答**

1. 計量成分は

   $$
   g_{ij}
   =
   e^{2\phi}\delta_{ij},
   $$

   逆行列は

   $$
   g^{k\ell}
   =
   e^{-2\phi}\delta^{k\ell}.
   $$

   微分すると

   $$
   \partial_i g_{j\ell}
   =
   2e^{2\phi}\phi_i\delta_{j\ell}.
   $$

   Levi-Civita 公式へ代入します。

   $$
   \begin{aligned}
   \Gamma^k_{ij}
   &=
   \frac12
   e^{-2\phi}\delta^{k\ell}
   \left[
   2e^{2\phi}\phi_i\delta_{j\ell}
   +
   2e^{2\phi}\phi_j\delta_{i\ell}
   -
   2e^{2\phi}\phi_\ell\delta_{ij}
   \right]
   \\
   &=
   \delta^{k\ell}
   \left[
   \phi_i\delta_{j\ell}
   +
   \phi_j\delta_{i\ell}
   -
   \phi_\ell\delta_{ij}
   \right].
   \end{aligned}
   $$

   従って

   $$
   \boxed{
   \Gamma^k_{ij}
   =
   \delta^k_j\phi_i
   +
   \delta^k_i\phi_j
   -
   \delta_{ij}\phi^k
   }.
   $$

2. $1=x,\ 2=y$ とします。

   $$
   \Gamma^x_{xx}
   =
   \phi_x,
   $$

   $$
   \Gamma^x_{xy}
   =
   \Gamma^x_{yx}
   =
   \phi_y,
   $$

   $$
   \Gamma^x_{yy}
   =
   -\phi_x.
   $$

   また

   $$
   \Gamma^y_{xx}
   =
   -\phi_y,
   $$

   $$
   \Gamma^y_{xy}
   =
   \Gamma^y_{yx}
   =
   \phi_x,
   $$

   $$
   \Gamma^y_{yy}
   =
   \phi_y.
   $$

3. $\phi$ が定数なら

   $$
   \phi_x=\phi_y=0.
   $$

   従って全ての Christoffel 係数が0になります。

   この場合 $g$ は Euclid 計量の定数倍なので、Cartesian 座標での Levi-Civita 接続は標準接続と同じです。
<!-- solution-end -->

### Level C

<a id="ex-geo13-c01"></a>
#### GEO13-C01 warped 型計量と平行移動
- Level: C

二次元多様体の局所座標 $(u,v)$ で

$$
g
=
du^2+f(u)^2dv^2,
\qquad
f(u)>0
$$

とする。

1. Levi-Civita 接続の非零 Christoffel 係数を全て求めよ。
2.
   $$
   \nabla_{\partial_u}\partial_u,\quad
   \nabla_{\partial_u}\partial_v,\quad
   \nabla_{\partial_v}\partial_u,\quad
   \nabla_{\partial_v}\partial_v
   $$
   を求めよ。
3. 曲線
   $$
   \gamma(t)=(t,v_0),
   \qquad
   u_0\le t\le u_1
   $$
   に沿って
   $$
   V(t)=A(t)\partial_u+B(t)\partial_v
   $$
   が平行であるための連立 ODE を導け。
4. 初期値
   $$
   V(u_0)=A_0\partial_u+B_0\partial_v
   $$
   に対する $V(t)$ を求めよ。
5. 得られた平行移動が計量ノルムを保存することを直接確認せよ。
6. $f(u)=u$ としたとき、結果を極座標平面と照合せよ。

<!-- solution-start -->
**解答**

1. 計量行列と逆行列は

   $$
   G
   =
   \begin{pmatrix}
   1&0\\
   0&f^2
   \end{pmatrix},
   \qquad
   G^{-1}
   =
   \begin{pmatrix}
   1&0\\
   0&f^{-2}
   \end{pmatrix}.
   $$

   非零の計量微分は

   $$
   \partial_u g_{vv}
   =
   2ff'
   $$

   だけです。

   まず

   $$
   \Gamma^u_{vv}
   =
   -\frac12\partial_u(f^2)
   =
   -ff'.
   $$

   次に

   $$
   \Gamma^v_{uv}
   =
   \frac12
   g^{vv}\partial_u g_{vv}
   =
   \frac12
   f^{-2}(2ff')
   =
   \frac{f'}f.
   $$

   捩率0なので

   $$
   \Gamma^v_{vu}
   =
   \frac{f'}f.
   $$

   従って

   $$
   \boxed{
   \Gamma^u_{vv}=-ff',
   \qquad
   \Gamma^v_{uv}
   =
   \Gamma^v_{vu}
   =
   \frac{f'}f
   }.
   $$

2. Christoffel 係数をそのまま読むと

   $$
   \boxed{
   \nabla_{\partial_u}\partial_u=0
   },
   $$

   $$
   \boxed{
   \nabla_{\partial_u}\partial_v
   =
   \frac{f'}f\partial_v
   },
   $$

   $$
   \boxed{
   \nabla_{\partial_v}\partial_u
   =
   \frac{f'}f\partial_v
   },
   $$

   $$
   \boxed{
   \nabla_{\partial_v}\partial_v
   =
   -ff'\partial_u
   }.
   $$

3. 曲線は

   $$
   \gamma(t)=(t,v_0)
   $$

   なので

   $$
   \dot u=1,
   \qquad
   \dot v=0.
   $$

   曲線に沿う共変微分公式から

   $$
   \frac{DV}{dt}
   =
   \left(
   A'
   +
   \Gamma^u_{uj}V^j
   \right)\partial_u
   +
   \left(
   B'
   +
   \Gamma^v_{uj}V^j
   \right)\partial_v.
   $$

   $u$ を第一下付き添字に持つ非零係数は

   $$
   \Gamma^v_{uv}=\frac{f'}f
   $$

   だけです。

   従って

   $$
   \frac{DV}{dt}
   =
   A'\partial_u
   +
   \left(
   B'+\frac{f'}fB
   \right)\partial_v.
   $$

   平行条件は

   $$
   \boxed{
   A'=0,
   \qquad
   B'+\frac{f'}fB=0
   }.
   $$

4. 第一式から

   $$
   A(t)=A_0.
   $$

   第二式へ $f$ を掛けると

   $
   fB'+f'B
   =
   (fB)'
   =
   0.
   $

   従って

   $
   f(t)B(t)=\text{定数}.
   $

   初期値から

   $$
   f(t)B(t)
   =
   f(u_0)B_0.
   $$

   従って

   $$
   \boxed{
   V(t)
   =
   A_0\partial_u
   +
   B_0\frac{f(u_0)}{f(t)}
   \partial_v
   }.
   $$

5. 計量ノルムの二乗は

   $$
   |V(t)|_g^2
   =
   A(t)^2
   +
   f(t)^2B(t)^2.
   $$

   上の解を代入すると

   $$
   \begin{aligned}
   |V(t)|_g^2
   &=
   A_0^2
   +
   f(t)^2
   B_0^2
   \frac{f(u_0)^2}{f(t)^2}
   \\
   &=
   A_0^2+f(u_0)^2B_0^2.
   \end{aligned}
   $$

   これは初期ノルム

   $$
   |V(u_0)|_g^2
   $$

   と一致します。

6. $f(u)=u$ とすれば

   $$
   g=du^2+u^2dv^2
   $$

   で、$u=r,\ v=\theta$ と読めば極座標の Euclid 計量です。

   Christoffel 係数は

   $$
   \Gamma^r_{\theta\theta}=-r,
   \qquad
   \Gamma^\theta_{r\theta}
   =
   \Gamma^\theta_{\theta r}
   =
   \frac1r
   $$

   となり、A02 と一致します。

   また半径方向の平行移動では

   $$
   B(r)=B_0\frac{r_0}{r}.
   $$

   座標基底 $\partial_\theta$ の長さ自体が $r$ なので、係数が $1/r$ に縮むことで実際のベクトル長が一定に保たれます。
<!-- solution-end -->

---

## 12. 何を得たか

本章では、異なる点の接空間を比較するための規則としてアフィン接続を導入しました。

局所座標では

$$
\nabla_XY
=
X^i
\left(
\partial_iY^k+\Gamma^k_{ij}Y^j
\right)\partial_k
$$

となり、Christoffel 係数が座標基底の変化を補正します。

曲線上では

$$
\frac{DV}{dt}
=
0
$$

を解くことで平行移動

$$
P^\gamma_{a\to b}
:
T_{\gamma(a)}M
\to
T_{\gamma(b)}M
$$

が得られました。

さらに Riemann 計量 $g$ を固定すると、

$$
\text{計量両立}
+
\text{捩率0}
$$

という二条件から Koszul の公式が導かれ、

$$
\boxed{
\text{Riemann 計量}
\quad\Longrightarrow\quad
\text{一意な Levi-Civita 接続}
}
$$

が得られました。

そして座標では

$$
\Gamma^k_{ij}
=
\frac12
g^{k\ell}
\left(
\partial_i g_{j\ell}
+
\partial_j g_{i\ell}
-
\partial_\ell g_{ij}
\right)
$$

と、計量だけから接続係数を計算できます。

次の GEO14 では、この Levi-Civita 接続を使い、速度ベクトルを自身に沿って平行に保つ曲線を測地線として構成します。測地線方程式、指数写像、Gauss の補題、正規座標へ進みます。
