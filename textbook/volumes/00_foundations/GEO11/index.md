# GEO11 幾何学 XI

[GEO10](../GEO10/index.md) では、Euclid 空間内の超曲面に第一基本形式・形作用素・第二基本形式を入れ、主曲率と Gauss 曲率を外在的に定義しました。本章では、そのデータが互いに独立ではないことを調べます。

超曲面を局所パラメータ表示すると、位置ベクトルの二階微分は「接方向」と「法線方向」に分かれます。接方向の係数は第一基本形式だけから決まり、法線方向の係数は第二基本形式です。さらに、同じベクトルを二つの順序で微分した結果が一致しなければならないため、第一・第二基本形式には **Gauss 方程式**と **Codazzi 方程式**という整合条件が現れます。

本章の流れは

$$
\text{Gauss 公式・Weingarten 公式}
\longrightarrow
\text{Gauss--Codazzi}
\longrightarrow
\text{構造方程式}
\longrightarrow
\text{Gauss の驚異の定理}
\longrightarrow
\text{超曲面の基本定理}
$$

です。

最後の基本定理では、逆に「整合条件を満たす第一・第二基本形式を与えれば、局所的には本当に超曲面が作れる」ことまで示します。その存在証明では [GEO6 の Frobenius の定理](../GEO6/index.md#thm-geo6-frobenius) を、位置ベクトルの復元では [GEO9 の Poincaré の補題](../GEO9/index.md#thm-geo9-poincare-lemma) を使います。

---

## 1. 二階微分を接成分と法線成分へ分ける

$U\subset\mathbb R^n$ を開集合とし、

$$
X:U\to\mathbb R^{n+1}
$$

を超曲面の局所パラメータ表示とします。座標を

$$
u^1,\dots,u^n
$$

とし、

$$
X_i:=\frac{\partial X}{\partial u^i},
\qquad
X_{ij}:=\frac{\partial^2 X}{\partial u^i\partial u^j}
$$

と書きます。

単位法線場を $N$ とし、第一・第二基本形式の係数を

$$
g_{ij}:=X_i\cdot X_j,
\qquad
b_{ij}:=N\cdot X_{ij}
$$

と置きます。[GEO10](../GEO10/index.md#prop-geo10-coordinate-forms) で見たように、

$$
G=(g_{ij})
$$

は正定値で、

$$
B=(b_{ij})
$$

は対称です。

各点で

$$
X_1,\dots,X_n,N
$$

は $\mathbb R^{n+1}$ の基底です。従って $X_{ij}$ はこの基底で一意に分解できます。

<a id="prop-geo11-gauss-formula"></a>
<!-- formal-statement-start -->
> **命題（Gauss 公式と Christoffel 係数）**  
> 超曲面の局所パラメータ表示 $X$ に対して、一意な滑らかな係数
>
> $$
> \Gamma^k_{ij}
> $$
>
> が存在し、
>
> $$
> \boxed{
> X_{ij}
> =
> \sum_{k=1}^n\Gamma^k_{ij}X_k
> +
> b_{ij}N
> }
> $$
>
> と書ける。
>
> さらに $G^{-1}=(g^{ij})$ とすると
>
> $$
> \boxed{
> \Gamma^k_{ij}
> =
> \frac12
> \sum_{\ell=1}^n
> g^{k\ell}
> \left(
> \partial_i g_{j\ell}
> +
> \partial_j g_{i\ell}
> -
> \partial_\ell g_{ij}
> \right)
> }
> $$
>
> である。従って接成分の係数 $\Gamma^k_{ij}$ は第一基本形式だけから決まる。
<!-- formal-statement-end -->

<!-- proof-start -->
### 証明

$X_1,\dots,X_n,N$ が基底なので、

$$
X_{ij}
=
\sum_k\Gamma^k_{ij}X_k
+
c_{ij}N
$$

と一意に書けます。

両辺と $N$ の内積を取ると

$$
N\cdot X_k=0,
\qquad
N\cdot N=1
$$

より

$$
c_{ij}
=
N\cdot X_{ij}
=
b_{ij}.
$$

従って

$$
X_{ij}
=
\sum_k\Gamma^k_{ij}X_k
+
b_{ij}N.
$$

ここから $\Gamma^k_{ij}$ を第一基本形式で求めます。

まず

$$
g_{j\ell}=X_j\cdot X_\ell
$$

を $u^i$ で微分すると

$$
\partial_i g_{j\ell}
=
X_{ij}\cdot X_\ell
+
X_j\cdot X_{i\ell}.
$$

Gauss 公式を代入し、$N\perp X_\ell,X_j$ を使うと

$$
\partial_i g_{j\ell}
=
\sum_m\Gamma^m_{ij}g_{m\ell}
+
\sum_m\Gamma^m_{i\ell}g_{jm}.
$$

ここで

$$
\Gamma_{ij\ell}
:=
\sum_m g_{\ell m}\Gamma^m_{ij}
$$

と置きます。混合偏微分の可換性から

$$
X_{ij}=X_{ji},
$$

従って

$$
\Gamma^k_{ij}=\Gamma^k_{ji}.
$$

よって

$$
\partial_i g_{j\ell}
=
\Gamma_{ij\ell}
+
\Gamma_{i\ell j},
$$

$$
\partial_j g_{i\ell}
=
\Gamma_{ji\ell}
+
\Gamma_{j\ell i},
$$

$$
\partial_\ell g_{ij}
=
\Gamma_{\ell ij}
+
\Gamma_{\ell ji}.
$$

最初の二式を足し、三式を引きます。下二つの添字に関する対称性を使うと

$$
\partial_i g_{j\ell}
+
\partial_j g_{i\ell}
-
\partial_\ell g_{ij}
=
2\Gamma_{ij\ell}.
$$

従って

$$
\Gamma_{ij\ell}
=
\frac12
\left(
\partial_i g_{j\ell}
+
\partial_j g_{i\ell}
-
\partial_\ell g_{ij}
\right).
$$

最後に $G^{-1}$ で添字を上げれば

$$
\Gamma^k_{ij}
=
\sum_\ell g^{k\ell}\Gamma_{ij\ell},
$$

すなわち

$$
\Gamma^k_{ij}
=
\frac12
\sum_\ell
g^{k\ell}
\left(
\partial_i g_{j\ell}
+
\partial_j g_{i\ell}
-
\partial_\ell g_{ij}
\right).
$$

$\square$
<!-- proof-end -->

この式から同時に

$$
\partial_i g_{j\ell}
=
\sum_m\Gamma^m_{ij}g_{m\ell}
+
\sum_m\Gamma^m_{i\ell}g_{jm}
$$

が分かります。後で使う言葉では、これは「第一基本形式がこの接方向の微分と両立している」ことを表します。

### 例：球面

半径 $R$ の球面を

$$
X(u,v)
=
R(
\sin u\cos v,
\sin u\sin v,
\cos u
),
\qquad
0<u<\pi
$$

とします。

第一基本形式は

$$
G
=
\begin{pmatrix}
R^2&0\\
0&R^2\sin^2u
\end{pmatrix}.
$$

従って公式から

$$
\Gamma^1_{22}
=
-\sin u\cos u,
$$

$$
\Gamma^2_{12}
=
\Gamma^2_{21}
=
\cot u
$$

で、それ以外の非自明な係数は0です。

外向き単位法線は

$$
N=\frac XR
$$

です。[GEO10 の球面計算](../GEO10/index.md#def-geo10-shape-operator) より

$$
S=-\frac1R I,
\qquad
B=-\frac1R G.
$$

従って

$$
b_{11}=-R,
\qquad
b_{22}=-R\sin^2u.
$$

たとえば

$$
X_{uu}=-X=-RN
$$

なので、

$$
X_{uu}
=
0\cdot X_u
+
0\cdot X_v
-
R N
$$

となり、Gauss 公式を直接確認できます。

---

## 2. 法線の微分を接基底で書く

[GEO10 の形作用素](../GEO10/index.md#def-geo10-shape-operator) は

$$
S=-dN
$$

でした。

座標方向では

$$
N_i
:=
\partial_iN
$$

なので、

$$
S(X_i)=-N_i.
$$

<a id="prop-geo11-weingarten"></a>
<!-- formal-statement-start -->
> **命題（Weingarten 公式）**  
> $G^{-1}=(g^{ij})$ とし、
>
> $$
> h_i{}^k
> :=
> \sum_{\ell=1}^n g^{k\ell}b_{i\ell}
> $$
>
> と置く。このとき
>
> $$
> \boxed{
> N_i
> =
> -
> \sum_{k=1}^n
> h_i{}^k X_k
> }
> $$
>
> が成り立つ。
>
> 行列 $H=(h_i{}^k)$ は、座標基底に関する形作用素の行列である。
<!-- formal-statement-end -->

<!-- proof-start -->
### 証明

単位法線なので

$$
N\cdot N=1.
$$

微分すると

$$
N_i\cdot N=0.
$$

従って $N_i$ は接空間に入り、

$$
N_i
=
\sum_k c_i{}^kX_k
$$

と書けます。

一方、形作用素の定義から

$$
S(X_i)=-N_i.
$$

[GEO10 の座標表示](../GEO10/index.md#prop-geo10-coordinate-forms) では形作用素の行列は

$$
G^{-1}B
$$

でした。従って

$$
S(X_i)
=
\sum_k h_i{}^kX_k,
$$

したがって

$$
N_i
=
-
\sum_k h_i{}^kX_k.
$$

$\square$
<!-- proof-end -->

Gauss 公式と Weingarten 公式を並べると、

$$
\boxed{
\begin{aligned}
X_{ij}
&=
\Gamma^k_{ij}X_k+b_{ij}N,
\\
N_i
&=
-h_i{}^kX_k
\end{aligned}
}
$$

です。以下、同じ添字が上下に現れる箇所では総和を取る記法も使います。

---

## 3. 二回微分する順序は交換できなければならない

位置ベクトル $X$ は滑らかなので、

$$
\partial_i\partial_jX_k
=
\partial_j\partial_iX_k
$$

です。

この単純な事実を Gauss--Weingarten 公式へ代入すると、第一・第二基本形式の間に強い制約が出ます。

まず第一基本形式から作られる量

$$
R^\ell{}_{kij}
:=
\partial_i\Gamma^\ell_{jk}
-
\partial_j\Gamma^\ell_{ik}
+
\Gamma^m_{jk}\Gamma^\ell_{im}
-
\Gamma^m_{ik}\Gamma^\ell_{jm}
$$

を定めます。また

$$
R_{\ell kij}
:=
g_{\ell r}R^r{}_{kij}
$$

とします。

第二基本形式については

$$
\nabla_i b_{jk}
:=
\partial_i b_{jk}
-
\Gamma^m_{ij}b_{mk}
-
\Gamma^m_{ik}b_{jm}
$$

と書きます。

この $\nabla_i b_{jk}$ は本章では座標計算の略記です。一般の接続としての共変微分は GEO13 で改めて構成します。

<a id="thm-geo11-gauss-codazzi"></a>
<!-- formal-statement-start -->
> **定理（Gauss--Codazzi 方程式）**  
> Euclid 空間内の超曲面では、全ての添字について
>
> $$
> \boxed{
> R^\ell{}_{kij}
> =
> b_{jk}h_i{}^\ell
> -
> b_{ik}h_j{}^\ell
> }
> $$
>
> が成り立つ。添字を下げると
>
> $$
> \boxed{
> R_{\ell kij}
> =
> b_{jk}b_{i\ell}
> -
> b_{ik}b_{j\ell}
> }
> $$
>
> である。これを **Gauss 方程式**という。
>
> また
>
> $$
> \boxed{
> \nabla_i b_{jk}
> =
> \nabla_j b_{ik}
> }
> $$
>
> が成り立つ。これを **Codazzi 方程式**という。
<!-- formal-statement-end -->

<!-- proof-start -->
### 証明

Gauss 公式

$$
X_{jk}
=
\Gamma^m_{jk}X_m+b_{jk}N
$$

を $u^i$ で微分します。

まず

$$
\partial_iX_{jk}
=
(\partial_i\Gamma^m_{jk})X_m
+
\Gamma^m_{jk}X_{im}
+
(\partial_i b_{jk})N
+
b_{jk}N_i.
$$

ここへ再び Gauss 公式

$$
X_{im}
=
\Gamma^\ell_{im}X_\ell+b_{im}N
$$

と Weingarten 公式

$$
N_i=-h_i{}^\ell X_\ell
$$

を代入します。

接成分は

$$
\left(
\partial_i\Gamma^\ell_{jk}
+
\Gamma^m_{jk}\Gamma^\ell_{im}
-
b_{jk}h_i{}^\ell
\right)X_\ell,
$$

法線成分は

$$
\left(
\partial_i b_{jk}
+
\Gamma^m_{jk}b_{im}
\right)N
$$

です。

同様に $i$ と $j$ を交換すると、

接成分は

$$
\left(
\partial_j\Gamma^\ell_{ik}
+
\Gamma^m_{ik}\Gamma^\ell_{jm}
-
b_{ik}h_j{}^\ell
\right)X_\ell,
$$

法線成分は

$$
\left(
\partial_j b_{ik}
+
\Gamma^m_{ik}b_{jm}
\right)N
$$

です。

混合偏微分は交換するので、接成分同士を等置すると

$$
\partial_i\Gamma^\ell_{jk}
-
\partial_j\Gamma^\ell_{ik}
+
\Gamma^m_{jk}\Gamma^\ell_{im}
-
\Gamma^m_{ik}\Gamma^\ell_{jm}
=
b_{jk}h_i{}^\ell
-
b_{ik}h_j{}^\ell.
$$

左辺は $R^\ell{}_{kij}$ なので

$$
R^\ell{}_{kij}
=
b_{jk}h_i{}^\ell
-
b_{ik}h_j{}^\ell.
$$

さらに $g_{\ell r}h_i{}^r=b_{i\ell}$ だから

$$
R_{\ell kij}
=
b_{jk}b_{i\ell}
-
b_{ik}b_{j\ell}.
$$

これが Gauss 方程式です。

次に法線成分を等置すると

$$
\partial_i b_{jk}
+
\Gamma^m_{jk}b_{im}
=
\partial_j b_{ik}
+
\Gamma^m_{ik}b_{jm}.
$$

移項して

$$
\partial_i b_{jk}
-
\partial_j b_{ik}
-
\Gamma^m_{ik}b_{jm}
+
\Gamma^m_{jk}b_{im}
=
0.
$$

一方、

$$
\nabla_i b_{jk}
-
\nabla_j b_{ik}
$$

を定義どおり展開すると

$$
\begin{aligned}
&
\partial_i b_{jk}
-
\Gamma^m_{ij}b_{mk}
-
\Gamma^m_{ik}b_{jm}
\\
&\quad-
\partial_j b_{ik}
+
\Gamma^m_{ji}b_{mk}
+
\Gamma^m_{jk}b_{im}.
\end{aligned}
$$

$\Gamma^m_{ij}=\Gamma^m_{ji}$ なので中央の二項が打ち消し合い、先ほどの式と一致します。従って

$$
\nabla_i b_{jk}
=
\nabla_j b_{ik}.
$$

これが Codazzi 方程式です。$\square$
<!-- proof-end -->

Gauss 方程式は「接方向の二回微分の不整合」を第二基本形式がちょうど補う式です。Codazzi 方程式は「法線方向の不整合」が消えるための式です。

### 例：円柱

半径 $R$ の円柱を弧長座標

$$
X(s,z)
=
\left(
R\cos\frac{s}{R},
R\sin\frac{s}{R},
z
\right)
$$

で書きます。

このとき

$$
G=
\begin{pmatrix}
1&0\\
0&1
\end{pmatrix},
$$

従って全ての $\Gamma^k_{ij}$ は0で、

$$
R_{\ell kij}=0.
$$

外向き法線では主曲率が

$$
-\frac1R,\qquad0
$$

なので

$$
B=
\begin{pmatrix}
-\frac1R&0\\
0&0
\end{pmatrix}.
$$

Gauss 方程式の二次元成分は

$$
R_{1212}
=
b_{22}b_{11}-b_{12}^2
=
0.
$$

円柱は空間内では曲がっていますが、第一基本形式から見た内在曲率は0です。

---

## 4. 構造方程式としてまとめる

Gauss 公式と Weingarten 公式は、一つの一次方程式系としてまとめられます。

列ベクトルを並べた行列

$$
F
:=
\begin{pmatrix}
X_1&\cdots&X_n&N
\end{pmatrix}
$$

を考えます。$F$ は各点で可逆です。

各 $i$ について

$$
A_i
=
\begin{pmatrix}
(\Gamma^k_{ij})_{k,j=1}^n
&
(-h_i{}^k)_{k=1}^n
\\
(b_{ij})_{j=1}^n
&
0
\end{pmatrix}
$$

と置くと、Gauss--Weingarten 公式は

$$
\boxed{
\partial_iF=FA_i
}
$$

です。

さらに行列値1形式

$$
\Omega
:=
\sum_iA_i\,du^i
$$

を使えば

$$
dF=F\Omega
$$

と一行で書けます。

<a id="prop-geo11-structure-equations"></a>
<!-- formal-statement-start -->
> **命題（Gauss--Weingarten 構造方程式）**  
> 上の $F,\Omega$ に対して
>
> $$
> \boxed{
> dF=F\Omega
> }
> $$
>
> であり、その可積分条件は
>
> $$
> \boxed{
> d\Omega+\Omega\wedge\Omega=0
> }
> $$
>
> である。
>
> $du^i\wedge du^j$ の係数で書けば
>
> $$
> \boxed{
> \partial_iA_j-\partial_jA_i+[A_i,A_j]=0
> }
> $$
>
> となり、このブロック成分は Gauss 方程式と Codazzi 方程式に一致する。
<!-- formal-statement-end -->

<!-- proof-start -->
### 証明

$F$ の第 $j$ 列は $X_j$、最後の列は $N$ です。

Gauss 公式は

$$
\partial_iX_j
=
\Gamma^k_{ij}X_k+b_{ij}N,
$$

Weingarten 公式は

$$
\partial_iN
=
-h_i{}^kX_k.
$$

従って各列の係数をまとめると

$$
\partial_iF=FA_i.
$$

これを1形式で書けば

$$
dF=F\Omega.
$$

外微分をもう一度取ります。[GEO7 の $d^2=0$](../GEO7/index.md#thm-geo7-d-square-zero) から

$$
0=d^2F.
$$

一方、

$$
d(F\Omega)
=
dF\wedge\Omega
+
F\,d\Omega.
$$

$dF=F\Omega$ を代入すると

$$
0
=
F\Omega\wedge\Omega
+
F\,d\Omega
=
F(d\Omega+\Omega\wedge\Omega).
$$

$F$ は可逆なので

$$
d\Omega+\Omega\wedge\Omega=0.
$$

$du^i\wedge du^j$ の係数を取り出すと

$$
\partial_iA_j-\partial_jA_i+A_iA_j-A_jA_i=0,
$$

すなわち

$$
\partial_iA_j-\partial_jA_i+[A_i,A_j]=0.
$$

左上ブロックを展開すると Gauss 方程式、左下ブロックを展開すると Codazzi 方程式です。右上ブロックは Codazzi 方程式の添字を第一基本形式で上げた式で、右下成分は $B G^{-1}B$ の対称性から0になります。

従って構造方程式は Gauss--Codazzi を一つの行列方程式へまとめたものです。$\square$
<!-- proof-end -->

この形は基本定理の存在証明にそのまま使えます。必要な条件は「ある超曲面から出発したから成り立つ条件」ではなく、「逆に超曲面を作るための可積分条件」でもあります。

---

## 5. Gauss 曲率は第一基本形式だけから決まる

二次元曲面では、Gauss 方程式の一つの成分が決定的です。

座標を $(u^1,u^2)$ とすると、

$$
R_{1212}
=
b_{22}b_{11}-b_{12}b_{21}.
$$

$B$ は対称なので

$$
R_{1212}
=
b_{11}b_{22}-b_{12}^2
=
\det B.
$$

一方、[GEO10](../GEO10/index.md#prop-geo10-coordinate-forms) より形作用素の行列は

$$
S\sim G^{-1}B.
$$

従って

$$
K
=
\det S
=
\frac{\det B}{\det G}.
$$

よって

$$
\boxed{
K
=
\frac{R_{1212}}{\det G}
}
$$

です。

<a id="thm-geo11-egregium"></a>
<!-- formal-statement-start -->
> **定理（Gauss の驚異の定理）**  
> Euclid 空間内の二次元曲面の Gauss 曲率 $K$ は、第一基本形式 $G=(g_{ij})$ とその座標微分だけから決まる。
>
> 具体的には
>
> $$
> \boxed{
> K
> =
> \frac{R_{1212}}{\det G}
> }
> $$
>
> であり、$R_{1212}$ は
>
> $$
> \Gamma^k_{ij}
> =
> \frac12
> g^{k\ell}
> \left(
> \partial_i g_{j\ell}
> +
> \partial_j g_{i\ell}
> -
> \partial_\ell g_{ij}
> \right)
> $$
>
> とその一階微分から計算される。
>
> 従って局所等長な二つの曲面は同じ Gauss 曲率を持つ。
<!-- formal-statement-end -->

<!-- proof-start -->
### 証明

Gauss 方程式で

$$
\ell=1,\quad k=2,\quad i=1,\quad j=2
$$

と置くと

$$
R_{1212}
=
b_{22}b_{11}
-
b_{12}b_{21}.
$$

第二基本形式は対称なので

$$
b_{21}=b_{12},
$$

従って

$$
R_{1212}
=
b_{11}b_{22}-b_{12}^2
=
\det B.
$$

一方、形作用素の座標行列は

$$
G^{-1}B
$$

なので

$$
K
=
\det(G^{-1}B)
=
\det(G^{-1})\det B
=
\frac{\det B}{\det G}.
$$

従って

$$
K
=
\frac{R_{1212}}{\det G}.
$$

ここで $\det G$ は第一基本形式だけから決まります。

また $R_{1212}$ は、まず第一基本形式から Christoffel 係数

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

を作り、

$$
R^\ell{}_{kij}
=
\partial_i\Gamma^\ell_{jk}
-
\partial_j\Gamma^\ell_{ik}
+
\Gamma^m_{jk}\Gamma^\ell_{im}
-
\Gamma^m_{ik}\Gamma^\ell_{jm}
$$

から計算できます。従って $K$ は第一基本形式とその一階・二階微分だけから決まります。

局所等長写像は第一基本形式を保つので、この式から Gauss 曲率も保たれます。$\square$
<!-- proof-end -->

これは「曲面が $\mathbb R^3$ の中でどう曲がって見えるか」と「曲面の上で測った長さ・角度から分かる曲がり」を分離します。

円柱は空間内で曲がっています。しかし弧長座標 $(s,z)$ では

$$
ds^2+dz^2
$$

となり、平面と同じ第一基本形式を持ちます。従って Gauss 曲率は0です。

逆に球面は、どのような座標を選んでも

$$
K=\frac1{R^2}
$$

を消せません。球面の小片を平面へ長さを完全に保ったまま押し広げることはできません。

---

## 6. Gauss--Codazzi は存在条件でもある

ここまでの議論は、実際の超曲面から出発して Gauss--Codazzi を導きました。

今度は逆向きを考えます。

開集合 $U\subset\mathbb R^n$ 上に、滑らかな正定値対称行列場

$$
G=(g_{ij})
$$

と滑らかな対称行列場

$$
B=(b_{ij})
$$

が与えられたとします。

$G$ から Christoffel 係数を作り、

$$
H=G^{-1}B
$$

とします。もし Gauss--Codazzi を満たすなら、これらは本当にある超曲面の第一・第二基本形式になるのでしょうか。

答えは局所的には「はい」です。

<a id="thm-geo11-fundamental-hypersurface"></a>
<!-- formal-statement-start -->
> **定理（超曲面の基本定理・局所版）**  
> $U\subset\mathbb R^n$ を開集合、$u_0\in U$ とする。
>
> $G=(g_{ij})$ を滑らかな正定値対称行列場、$B=(b_{ij})$ を滑らかな対称行列場とする。
>
> $G$ から
>
> $$
> \Gamma^k_{ij}
> =
> \frac12
> g^{k\ell}
> \left(
> \partial_i g_{j\ell}
> +
> \partial_j g_{i\ell}
> -
> \partial_\ell g_{ij}
> \right)
> $$
>
> を定め、$h_i{}^k=g^{k\ell}b_{i\ell}$ とする。
>
> これらが Gauss 方程式
>
> $$
> R^\ell{}_{kij}
> =
> b_{jk}h_i{}^\ell
> -
> b_{ik}h_j{}^\ell
> $$
>
> と Codazzi 方程式
>
> $$
> \nabla_i b_{jk}
> =
> \nabla_j b_{ik}
> $$
>
> を満たすとする。
>
> このとき $u_0$ のある近傍 $V\subset U$ と滑らかなはめ込み
>
> $$
> X:V\to\mathbb R^{n+1}
> $$
>
> および単位法線場 $N$ が存在し、その第一基本形式と第二基本形式はそれぞれ $G$ と $B$ である。
>
> さらに二つの実現が同じ $G,B$ を持つなら、十分小さい連結近傍上で一方は他方に Euclid 空間の剛体運動を施したものになる。
<!-- formal-statement-end -->

### 証明の見取り図

Gauss--Weingarten 方程式を未知の標構

$$
F=(E_1,\dots,E_n,N)
$$

に対する一次偏微分方程式

$$
\partial_iF=FA_i
$$

とみなします。

Gauss--Codazzi はこの方程式系の可積分条件です。[Frobenius の定理](../GEO6/index.md#thm-geo6-frobenius) で標構を作り、その後

$$
\partial_iX=E_i
$$

を [Poincaré の補題](../GEO9/index.md#thm-geo9-poincare-lemma) で積分します。

<!-- proof-start -->
### 証明

#### 1. 標構方程式を作る

各 $i$ に対して

$$
A_i
=
\begin{pmatrix}
(\Gamma^k_{ij})_{k,j=1}^n
&
(-h_i{}^k)_{k=1}^n
\\
(b_{ij})_{j=1}^n
&
0
\end{pmatrix}
$$

と置きます。

Gauss--Codazzi 方程式をブロックごとに展開すると、前節の構造方程式と同じく

$$
\partial_iA_j-\partial_jA_i+[A_i,A_j]=0
$$

が成り立ちます。

#### 2. Frobenius の定理で $F$ を作る

$U\times GL(n+1,\mathbb R)$ 上で、行列座標を $F$ と書き、

$$
Z_i
:=
\frac{\partial}{\partial u^i}
+
\sum_{\alpha,\beta}
(FA_i)_{\alpha\beta}
\frac{\partial}{\partial F_{\alpha\beta}}
$$

と定めます。

直接交換子を計算すると

$$
[Z_i,Z_j]
=
\sum_{\alpha,\beta}
\left[
F
\left(
\partial_iA_j-\partial_jA_i+[A_i,A_j]
\right)
\right]_{\alpha\beta}
\frac{\partial}{\partial F_{\alpha\beta}}.
$$

可積分条件により括弧内は0なので

$$
[Z_i,Z_j]=0.
$$

従って $Z_1,\dots,Z_n$ が張る分布は対合的です。[GEO6 の Frobenius の定理](../GEO6/index.md#thm-geo6-frobenius) により、任意の初期点 $(u_0,F_0)$ を通る局所積分多様体が存在します。

射影

$$
\pi:U\times GL(n+1,\mathbb R)\to U
$$

に対して

$$
d\pi(Z_i)=\frac{\partial}{\partial u^i}
$$

なので、この積分多様体は $u_0$ の十分小さい近傍 $V$ 上でグラフ

$$
F=F(u)
$$

として書けます。そして接ベクトルが $Z_i$ であることから

$$
\partial_iF=FA_i
$$

を満たします。

#### 3. 初期標構を第一基本形式に合わせる

$G(u_0)$ は正定値です。従って $\mathbb R^{n+1}$ にベクトル

$$
E_1(u_0),\dots,E_n(u_0),N(u_0)
$$

を選び、

$$
E_i(u_0)\cdot E_j(u_0)=g_{ij}(u_0),
$$

$$
E_i(u_0)\cdot N(u_0)=0,
\qquad
N(u_0)\cdot N(u_0)=1
$$

とできます。

これらを列に持つ $F_0$ を初期値に取ります。

$$
\widehat G
:=
\begin{pmatrix}
G&0\\
0&1
\end{pmatrix}
$$

と置きます。

Christoffel 係数の公式と $h_i{}^k=g^{k\ell}b_{i\ell}$ から、直接行列計算すると

$$
\partial_i\widehat G
=
A_i^{\mathsf T}\widehat G
+
\widehat G A_i.
$$

一方、

$$
\partial_i(F^{\mathsf T}F)
=
A_i^{\mathsf T}F^{\mathsf T}F
+
F^{\mathsf T}F A_i.
$$

差

$$
Q:=F^{\mathsf T}F-\widehat G
$$

は

$$
\partial_iQ
=
A_i^{\mathsf T}Q+QA_i
$$

を満たし、

$$
Q(u_0)=0.
$$

任意の滑らかな曲線に沿ってこの式を制限すると、$Q$ は初期値0の線形常微分方程式を満たします。常微分方程式の一意性から

$$
Q=0
$$

です。

従って $V$ 上で

$$
E_i\cdot E_j=g_{ij},
$$

$$
E_i\cdot N=0,
\qquad
N\cdot N=1
$$

が保たれます。

#### 4. $E_i$ を位置ベクトルへ積分する

$\partial_iF=FA_i$ の最初の $n$ 列は

$$
\partial_iE_j
=
\Gamma^k_{ij}E_k+b_{ij}N.
$$

$\Gamma^k_{ij}=\Gamma^k_{ji}$ と $b_{ij}=b_{ji}$ なので

$$
\partial_iE_j
=
\partial_jE_i.
$$

$\mathbb R^{n+1}$ 値1形式

$$
\alpha
:=
\sum_iE_i\,du^i
$$

を考えます。この等式は

$$
d\alpha=0
$$

を意味します。

$V$ をさらに小さくして星型に取ります。[GEO9 の Poincaré の補題](../GEO9/index.md#thm-geo9-poincare-lemma) を各成分へ適用すると、滑らかな写像

$$
X:V\to\mathbb R^{n+1}
$$

が存在して

$$
dX=\alpha,
$$

すなわち

$$
\partial_iX=E_i
$$

となります。

$G$ は正定値なので $E_1,\dots,E_n$ は一次独立です。従って $X$ ははめ込みです。

さらに

$$
\partial_iX\cdot\partial_jX
=
E_i\cdot E_j
=
g_{ij},
$$

よって第一基本形式は $G$ です。

また

$$
N\cdot X_{ij}
=
N\cdot\partial_iE_j
=
b_{ij},
$$

なので第二基本形式は $B$ です。

#### 5. 一意性

$X$ と $\widetilde X$ が同じ $G,B$ を実現するとします。

基点 $u_0$ で、二つの標構

$$
(E_1,\dots,E_n,N),
\qquad
(\widetilde E_1,\dots,\widetilde E_n,\widetilde N)
$$

は同じ Gram 行列 $\widehat G(u_0)$ を持ちます。従ってある直交変換 $Q\in O(n+1)$ が一方の標構を他方へ移します。

さらに平行移動を加えれば、剛体運動によって

$$
X(u_0)=\widetilde X(u_0),
$$

$$
F(u_0)=\widetilde F(u_0)
$$

とできます。

両者の標構は同じ係数 $A_i$ に対して

$$
\partial_iF=FA_i
$$

を満たします。Frobenius の積分多様体の局所一意性、または各曲線に沿う線形常微分方程式の一意性から

$$
F=\widetilde F
$$

です。

従って

$$
dX=d\widetilde X.
$$

基点で値も一致しているので

$$
X=\widetilde X.
$$

元の二つの実現は剛体運動を除いて同じです。$\square$
<!-- proof-end -->

この定理で重要なのは、Gauss--Codazzi が単なる必要条件ではなく、**局所存在の十分条件でもある**ことです。

第一基本形式 $G$ だけでは埋め込み方は決まりません。第二基本形式 $B$ まで与え、Gauss--Codazzi で整合性を要求すると、局所形状が剛体運動を除いて決まります。

---

## 7. 全方向が同じだけ曲がる超曲面

<a id="def-geo11-totally-umbilic"></a>
<!-- formal-statement-start -->
> **定義（全臍的超曲面）**  
> 連結な超曲面 $M^n\subset\mathbb R^{n+1}$ が **全臍的**であるとは、各点 $p\in M$ である実数 $\lambda(p)$ が存在し、
>
> $$
> S_p=\lambda(p)I
> $$
>
> となることをいう。
>
> 同値に、第二基本形式は
>
> $$
> II_p=\lambda(p)I_p
> $$
>
> を満たす。
<!-- formal-statement-end -->

<!-- definition-example-start: def-geo11-totally-umbilic -->
**定義の確認**

平面では単位法線が一定なので

$$
dN=0,
$$

従って

$$
S=0.
$$

よって $\lambda=0$ として全臍的です。

半径 $R$ の球面で外向き法線を取ると [GEO10](../GEO10/index.md#def-geo10-shape-operator) より

$$
S=-\frac1R I.
$$

従って

$$
\lambda=-\frac1R
$$

として全臍的です。

どちらも、点ごとに全ての主曲率が一致しています。
<!-- definition-example-end -->

Codazzi 方程式は、この条件に強い剛性を与えます。

<a id="thm-geo11-umbilic-rigidity"></a>
<!-- formal-statement-start -->
> **定理（全臍的超曲面の剛性）**  
> $n\ge2$ とし、連結な超曲面
>
> $$
> M^n\subset\mathbb R^{n+1}
> $$
>
> が全臍的であるとする。
>
> このとき $S=\lambda I$ の係数 $\lambda$ は定数である。
>
> さらに
>
> - $\lambda=0$ なら、$M$ は局所的にあるアフィン超平面の開部分である。
> - $\lambda\ne0$ なら、$M$ は局所的に半径 $1/|\lambda|$ の球面の開部分である。
<!-- formal-statement-end -->

<!-- proof-start -->
### 証明

局所座標で

$$
S=\lambda I
$$

なので

$$
b_{ij}
=
\lambda g_{ij}.
$$

前節で得た Christoffel 係数は第一基本形式と両立するため、

$$
\nabla_k g_{ij}=0.
$$

従って

$$
\nabla_i b_{jk}
=
\nabla_i(\lambda g_{jk})
=
(\partial_i\lambda)g_{jk}.
$$

Codazzi 方程式から

$$
(\partial_i\lambda)g_{jk}
=
(\partial_j\lambda)g_{ik}.
$$

両辺を $g^{jk}$ で縮約します。

左辺は

$$
(\partial_i\lambda)g_{jk}g^{jk}
=
n\,\partial_i\lambda.
$$

右辺は

$$
(\partial_j\lambda)g_{ik}g^{jk}
=
(\partial_j\lambda)\delta_i^j
=
\partial_i\lambda.
$$

従って

$$
(n-1)\partial_i\lambda=0.
$$

$n\ge2$ なので

$$
\partial_i\lambda=0
$$

が全ての $i$ で成り立ちます。$M$ は連結だから $\lambda$ は定数です。

次に Weingarten 公式を座標に依らず

$$
dN=-S\,dX
$$

と書くと、

$$
dN=-\lambda\,dX.
$$

まず $\lambda=0$ なら

$$
dN=0,
$$

従って $N$ は局所的に一定です。

さらに

$$
d(N\cdot X)
=
dN\cdot X+N\cdot dX
=
0+0
=
0
$$

なので

$$
N\cdot X=c
$$

は一定です。従って像はアフィン超平面

$$
\{x\in\mathbb R^{n+1}:N\cdot x=c\}
$$

に含まれます。はめ込みの次元が $n$ なので、局所的にはその開部分です。

次に $\lambda\ne0$ なら $\lambda$ は定数なので

$$
d(N+\lambda X)
=
dN+\lambda\,dX
=
-\lambda\,dX+\lambda\,dX
=
0.
$$

従ってある定ベクトル $c$ が存在して

$$
N+\lambda X=c.
$$

整理すると

$$
X-\frac c\lambda
=
-\frac1\lambda N.
$$

$|N|=1$ なので

$$
\left|
X-\frac c\lambda
\right|
=
\frac1{|\lambda|}.
$$

従って像は中心 $c/\lambda$、半径 $1/|\lambda|$ の球面に含まれます。次元が同じなので局所的には球面の開部分です。$\square$
<!-- proof-end -->

平面と球面が「全方向で同じだけ曲がる」超曲面の唯一の局所モデルであることが分かりました。

注意として、二次元曲面で **Gauss 曲率が一定**という条件だけでは全臍性は従いません。全臍性は

$$
\kappa_1=\kappa_2
$$

という形作用素そのものへの条件で、単に積

$$
K=\kappa_1\kappa_2
$$

が一定という条件より強いものです。

---

## 8. 何が内在的で、何が外在的か

GEO10 と GEO11 で、曲面の曲率には二つの見方が現れました。

第一基本形式

$$
G=(g_{ij})
$$

は曲面上で測れる長さ・角度を記録します。

第二基本形式

$$
B=(b_{ij})
$$

は法線方向への曲がり、すなわち周囲の Euclid 空間にどう埋め込まれているかを記録します。

しかし Gauss 方程式により、二次元では

$$
\frac{\det B}{\det G}
=
\frac{R_{1212}}{\det G}
$$

です。

左辺は外在的に定義した

$$
K=\det S
$$

で、右辺は第一基本形式だけから計算できます。

つまり Gauss 曲率は、定義の出発点では法線と形作用素を使うにもかかわらず、最終的には曲面内部の距離測定だけで決まります。

この発見が、次の Riemann 幾何への入口です。

GEO12 では、もはや Euclid 空間への埋め込みを前提にせず、抽象多様体上に正定値内積

$$
g_p:T_pM\times T_pM\to\mathbb R
$$

を直接与えます。

---

## 9. 演習

### Level A

<a id="ex-geo11-a01"></a>
#### GEO11-A01 球面の Gauss--Weingarten 公式
- Level: A

半径 $R$ の球面

$$
X(u,v)
=
R(
\sin u\cos v,
\sin u\sin v,
\cos u
)
$$

に外向き法線 $N=X/R$ を取る。

1. $G$ と $B$ を求めよ。
2. 非零な Christoffel 係数を求めよ。
3. $X_{uu}$ と $X_{uv}$ について Gauss 公式を直接確認せよ。
4. Weingarten 公式を確認せよ。

<!-- solution-start -->
**解答**

1. まず

   $$
   X_u
   =
   R(
   \cos u\cos v,
   \cos u\sin v,
   -\sin u
   ),
   $$

   $$
   X_v
   =
   R(
   -\sin u\sin v,
   \sin u\cos v,
   0
   ).
   $$

   従って

   $$
   g_{11}=R^2,
   \qquad
   g_{12}=0,
   \qquad
   g_{22}=R^2\sin^2u.
   $$

   よって

   $$
   G
   =
   \begin{pmatrix}
   R^2&0\\
   0&R^2\sin^2u
   \end{pmatrix}.
   $$

   外向き法線では

   $$
   S=-\frac1R I
   $$

   なので

   $$
   B=-\frac1R G
   =
   \begin{pmatrix}
   -R&0\\
   0&-R\sin^2u
   \end{pmatrix}.
   $$

2. 逆行列は

   $$
   G^{-1}
   =
   \begin{pmatrix}
   R^{-2}&0\\
   0&(R^2\sin^2u)^{-1}
   \end{pmatrix}.
   $$

   $g_{22}$ だけが $u$ に依存し、

   $$
   \partial_u g_{22}
   =
   2R^2\sin u\cos u.
   $$

   従って

   $$
   \Gamma^1_{22}
   =
   -\frac12g^{11}\partial_u g_{22}
   =
   -\sin u\cos u,
   $$

   $$
   \Gamma^2_{12}
   =
   \Gamma^2_{21}
   =
   \frac12g^{22}\partial_u g_{22}
   =
   \cot u.
   $$

   その他は0です。

3. 二階微分は

   $$
   X_{uu}
   =
   -R(
   \sin u\cos v,
   \sin u\sin v,
   \cos u
   )
   =
   -RN.
   $$

   したがって

   $$
   X_{uu}
   =
   \Gamma^1_{11}X_u
   +
   \Gamma^2_{11}X_v
   +
   b_{11}N
   =
   -RN.
   $$

   また

   $$
   X_{uv}
   =
   R(
   -\cos u\sin v,
   \cos u\cos v,
   0
   ).
   $$

   一方

   $$
   \cot u\,X_v
   =
   R(
   -\cos u\sin v,
   \cos u\cos v,
   0
   ),
   $$

   かつ $b_{12}=0$ なので

   $$
   X_{uv}
   =
   \Gamma^2_{12}X_v
   =
   \cot u\,X_v.
   $$

4. $N=X/R$ なので

   $$
   N_u=\frac1R X_u,
   \qquad
   N_v=\frac1R X_v.
   $$

   一方 $H=G^{-1}B=-(1/R)I$ だから

   $$
   -h_1{}^1X_u=\frac1RX_u,
   $$

   $$
   -h_2{}^2X_v=\frac1RX_v.
   $$

   よって Weingarten 公式も一致します。
<!-- solution-end -->

<a id="ex-geo11-a02"></a>
#### GEO11-A02 円柱の Gauss 方程式
- Level: A

弧長座標で表した円柱

$$
X(s,z)
=
\left(
R\cos\frac sR,
R\sin\frac sR,
z
\right)
$$

を考える。

1. 第一基本形式が $G=I$ であることを示せ。
2. 外向き法線に対する $B$ を求めよ。
3. Gauss 方程式から $R_{1212}=0$ を確認せよ。

<!-- solution-start -->
**解答**

1. 接ベクトルは

   $$
   X_s
   =
   \left(
   -\sin\frac sR,
   \cos\frac sR,
   0
   \right),
   $$

   $$
   X_z=(0,0,1).
   $$

   従って

   $$
   X_s\cdot X_s=1,
   \qquad
   X_s\cdot X_z=0,
   \qquad
   X_z\cdot X_z=1.
   $$

   よって

   $$
   G=I.
   $$

2. 外向き法線は

   $$
   N
   =
   \left(
   \cos\frac sR,
   \sin\frac sR,
   0
   \right).
   $$

   $$
   N_s
   =
   \frac1R X_s,
   \qquad
   N_z=0.
   $$

   従って

   $$
   S(X_s)=-\frac1R X_s,
   \qquad
   S(X_z)=0.
   $$

   $G=I$ なので

   $$
   B
   =
   \begin{pmatrix}
   -1/R&0\\
   0&0
   \end{pmatrix}.
   $$

3. $G$ は定数行列なので全ての Christoffel 係数は0です。従って

   $$
   R_{1212}=0.
   $$

   Gauss 方程式の右辺も

   $$
   b_{11}b_{22}-b_{12}^2
   =
   \left(-\frac1R\right)0-0
   =
   0.
   $$

   両辺は一致します。
<!-- solution-end -->

<a id="ex-geo11-a03"></a>
#### GEO11-A03 対角計量の Christoffel 係数
- Level: A

$$
G
=
\begin{pmatrix}
1&0\\
0&f(u)^2
\end{pmatrix},
\qquad
f(u)>0
$$

とする。非零な Christoffel 係数を求めよ。

<!-- solution-start -->
**解答**

座標を

$$
u^1=u,
\qquad
u^2=v
$$

とします。

計量係数は

$$
g_{11}=1,
\qquad
g_{12}=0,
\qquad
g_{22}=f^2.
$$

逆行列は

$$
g^{11}=1,
\qquad
g^{12}=0,
\qquad
g^{22}=\frac1{f^2}.
$$

$u$ に依存するのは $g_{22}$ だけで、

$$
\partial_1g_{22}=2ff'.
$$

従って

$$
\Gamma^1_{22}
=
-\frac12\partial_1g_{22}
=
-ff'.
$$

また

$$
\Gamma^2_{12}
=
\Gamma^2_{21}
=
\frac12g^{22}\partial_1g_{22}
=
\frac12\frac1{f^2}(2ff')
=
\frac{f'}f.
$$

その他は0です。
<!-- solution-end -->

<a id="ex-geo11-a04"></a>
#### GEO11-A04 放物面の原点での Gauss 曲率
- Level: A

$$
X(x,y)
=
\left(
x,y,\frac12(ax^2+by^2)
\right)
$$

を考える。上向き法線を取り、原点での $G,B,K$ を求め、Gauss 方程式

$$
R_{1212}=\det B
$$

から $R_{1212}(0,0)$ も求めよ。

<!-- solution-start -->
**解答**

接ベクトルは

$$
X_x=(1,0,ax),
$$

$$
X_y=(0,1,by).
$$

原点では

$$
X_x(0,0)=(1,0,0),
\qquad
X_y(0,0)=(0,1,0),
$$

従って

$$
G(0,0)=I.
$$

上向き単位法線は

$$
N
=
\frac{(-ax,-by,1)}
{\sqrt{1+a^2x^2+b^2y^2}},
$$

なので

$$
N(0,0)=(0,0,1).
$$

二階微分は

$$
X_{xx}=(0,0,a),
$$

$$
X_{xy}=(0,0,0),
$$

$$
X_{yy}=(0,0,b).
$$

従って原点で

$$
B
=
\begin{pmatrix}
a&0\\
0&b
\end{pmatrix}.
$$

$G=I$ なので形作用素もこの行列で、

$$
K(0,0)=ab.
$$

Gauss 方程式から

$$
R_{1212}(0,0)
=
\det B
=
ab.
$$

原点では第一基本形式自体は $I$ ですが、その周囲での変化が二階微分を通じて $R_{1212}=ab$ を記録しています。
<!-- solution-end -->

### Level B

<a id="ex-geo11-b01"></a>
#### GEO11-B01 共形計量の Gauss 曲率
- Level: B

二次元計量

$$
G
=
e^{2\phi(u,v)}
\begin{pmatrix}
1&0\\
0&1
\end{pmatrix}
$$

について、

$$
\boxed{
K
=
-e^{-2\phi}
(\phi_{uu}+\phi_{vv})
}
$$

を導け。

<!-- solution-start -->
**解答**

まず

$$
g_{11}=g_{22}=e^{2\phi},
\qquad
g_{12}=0,
$$

$$
g^{11}=g^{22}=e^{-2\phi}.
$$

Christoffel 係数を計算します。

$$
\Gamma^1_{11}=\phi_u,
\qquad
\Gamma^1_{12}=\Gamma^1_{21}=\phi_v,
$$

$$
\Gamma^1_{22}=-\phi_u,
$$

$$
\Gamma^2_{11}=-\phi_v,
\qquad
\Gamma^2_{12}=\Gamma^2_{21}=\phi_u,
$$

$$
\Gamma^2_{22}=\phi_v.
$$

本章の規約では

$$
R^\ell{}_{kij}
=
\partial_i\Gamma^\ell_{jk}
-
\partial_j\Gamma^\ell_{ik}
+
\Gamma^m_{jk}\Gamma^\ell_{im}
-
\Gamma^m_{ik}\Gamma^\ell_{jm}.
$$

$R^1{}_{212}$ を計算します。

$$
\partial_1\Gamma^1_{22}
=
-\phi_{uu},
$$

$$
-\partial_2\Gamma^1_{12}
=
-\phi_{vv}.
$$

積の項は

$$
\Gamma^m_{22}\Gamma^1_{1m}
=
\Gamma^1_{22}\Gamma^1_{11}
+
\Gamma^2_{22}\Gamma^1_{12}
=
-\phi_u^2+\phi_v^2,
$$

$$
\Gamma^m_{12}\Gamma^1_{2m}
=
\Gamma^1_{12}\Gamma^1_{21}
+
\Gamma^2_{12}\Gamma^1_{22}
=
\phi_v^2-\phi_u^2.
$$

従って積の二つの項は打ち消し合い、

$$
R^1{}_{212}
=
-(\phi_{uu}+\phi_{vv}).
$$

添字を下げると

$$
R_{1212}
=
g_{11}R^1{}_{212}
=
-e^{2\phi}
(\phi_{uu}+\phi_{vv}).
$$

また

$$
\det G=e^{4\phi}.
$$

Gauss の驚異の定理から

$$
K
=
\frac{R_{1212}}{\det G}
=
-e^{-2\phi}
(\phi_{uu}+\phi_{vv}).
$$
<!-- solution-end -->

<a id="ex-geo11-b02"></a>
#### GEO11-B02 全臍性から主曲率一定を導く
- Level: B

$n\ge2$ の超曲面で

$$
b_{ij}=\lambda g_{ij}
$$

とする。

Codazzi 方程式と

$$
\nabla_k g_{ij}=0
$$

だけを使って $\lambda$ が局所定数であることを示せ。

<!-- solution-start -->
**解答**

$$
b_{jk}=\lambda g_{jk}
$$

なので

$$
\nabla_i b_{jk}
=
\nabla_i(\lambda g_{jk})
=
(\partial_i\lambda)g_{jk}
+
\lambda\nabla_i g_{jk}.
$$

計量両立性

$$
\nabla_i g_{jk}=0
$$

より

$$
\nabla_i b_{jk}
=
(\partial_i\lambda)g_{jk}.
$$

Codazzi 方程式は

$$
\nabla_i b_{jk}
=
\nabla_j b_{ik}
$$

だから

$$
(\partial_i\lambda)g_{jk}
=
(\partial_j\lambda)g_{ik}.
$$

両辺を $g^{jk}$ で縮約すると

$$
n\,\partial_i\lambda
=
\partial_i\lambda.
$$

従って

$$
(n-1)\partial_i\lambda=0.
$$

$n\ge2$ より

$$
\partial_i\lambda=0
$$

です。全ての座標方向で微分が0なので、$\lambda$ は局所定数です。
<!-- solution-end -->

<a id="ex-geo11-b03"></a>
#### GEO11-B03 円柱データの再構成
- Level: B

$U\subset\mathbb R^2$ 上で

$$
G=
\begin{pmatrix}
1&0\\
0&1
\end{pmatrix},
\qquad
B=
\begin{pmatrix}
-1/R&0\\
0&0
\end{pmatrix}
$$

を考える。

1. Gauss--Codazzi を満たすことを確認せよ。
2. この $G,B$ を実現するはめ込みを一つ構成せよ。
3. 超曲面の基本定理から、他の局所実現について何が言えるか。

<!-- solution-start -->
**解答**

1. $G$ は定数なので

   $$
   \Gamma^k_{ij}=0.
   $$

   従って

   $$
   R^\ell{}_{kij}=0.
   $$

   二次元の Gauss 方程式で必要な量は

   $$
   b_{11}b_{22}-b_{12}^2
   =
   \left(-\frac1R\right)0-0
   =
   0.
   $$

   よって Gauss 方程式を満たします。

   また $B$ も定数で Christoffel 係数も0なので

   $$
   \nabla_i b_{jk}=0.
   $$

   従って Codazzi 方程式も満たします。

2. 座標を $(s,z)$ として

   $$
   X(s,z)
   =
   \left(
   R\cos\frac sR,
   R\sin\frac sR,
   z
   \right)
   $$

   と置きます。

   接ベクトルは

   $$
   X_s
   =
   \left(
   -\sin\frac sR,
   \cos\frac sR,
   0
   \right),
   $$

   $$
   X_z=(0,0,1),
   $$

   なので第一基本形式は $G=I$ です。

   外向き法線

   $$
   N
   =
   \left(
   \cos\frac sR,
   \sin\frac sR,
   0
   \right)
   $$

   に対して

   $$
   N_s=\frac1R X_s,
   \qquad
   N_z=0.
   $$

   従って

   $$
   S(X_s)=-\frac1R X_s,
   \qquad
   S(X_z)=0,
   $$

   なので第二基本形式は指定された $B$ です。

3. 超曲面の基本定理により、同じ $G,B$ を持つ任意の局所実現は、十分小さい連結近傍上でこの円柱に剛体運動を施したものです。
<!-- solution-end -->

### Level C

<a id="ex-geo11-c01"></a>
#### GEO11-C01 回転対称型計量の内在曲率
- Level: C

二次元計量

$$
ds^2
=
du^2+f(u)^2\,dv^2,
\qquad
f(u)>0
$$

を考える。

1. 非零な Christoffel 係数を求めよ。
2. 本章の曲率規約で
   $$
   R^1{}_{212}
   =
   -f f''
   $$
   を示せ。
3. Gauss 曲率が
   $$
   \boxed{
   K=-\frac{f''}{f}
   }
   $$
   となることを示せ。
4. 球面の測地極座標
   $$
   f(u)=R\sin\frac uR
   $$
   と円柱の弧長座標
   $$
   f(u)=R
   $$
   に適用して、それぞれの $K$ を求めよ。

<!-- solution-start -->
**解答**

1. [GEO11-A03](#ex-geo11-a03) と同じ計算から

   $$
   \Gamma^1_{22}=-ff',
   $$

   $$
   \Gamma^2_{12}
   =
   \Gamma^2_{21}
   =
   \frac{f'}f
   $$

   だけが非零です。

2. 定義から

   $$
   R^1{}_{212}
   =
   \partial_1\Gamma^1_{22}
   -
   \partial_2\Gamma^1_{12}
   +
   \Gamma^m_{22}\Gamma^1_{1m}
   -
   \Gamma^m_{12}\Gamma^1_{2m}.
   $$

   第一項は

   $$
   \partial_1\Gamma^1_{22}
   =
   \partial_u(-ff')
   =
   -(f'^2+ff'').
   $$

   $\Gamma^1_{12}=0$ なので第二項は0です。

   第三項も0です。実際、

   $$
   \Gamma^1_{11}=0,
   \qquad
   \Gamma^2_{22}=0.
   $$

   第四項では $m=2$ の項だけが残り、

   $$
   -\Gamma^2_{12}\Gamma^1_{22}
   =
   -
   \frac{f'}f(-ff')
   =
   f'^2.
   $$

   従って

   $$
   R^1{}_{212}
   =
   -(f'^2+ff'')+f'^2
   =
   -ff''.
   $$

3. $g_{11}=1$ なので

   $$
   R_{1212}
   =
   g_{11}R^1{}_{212}
   =
   -ff''.
   $$

   また

   $$
   \det G=f^2.
   $$

   Gauss の驚異の定理から

   $$
   K
   =
   \frac{R_{1212}}{\det G}
   =
   -\frac{ff''}{f^2}
   =
   -\frac{f''}{f}.
   $$

4. 球面では

   $$
   f(u)=R\sin\frac uR.
   $$

   一階・二階微分は

   $$
   f'(u)=\cos\frac uR,
   $$

   $$
   f''(u)
   =
   -\frac1R\sin\frac uR
   =
   -\frac1{R^2}f(u).
   $$

   従って

   $$
   K
   =
   -\frac{f''}{f}
   =
   \frac1{R^2}.
   $$

   円柱では

   $$
   f(u)=R
   $$

   は定数なので

   $$
   f''=0,
   $$

   よって

   $$
   K=0.
   $$

   同じ「回転対称に見える」計量でも、$f$ の二階微分が内在曲率を区別しています。
<!-- solution-end -->

---

## 10. 次に進む

本章では

$$
X_{ij}
=
\Gamma^k_{ij}X_k+b_{ij}N,
$$

$$
N_i=-h_i{}^kX_k
$$

から出発し、混合偏微分の可換性を使って

$$
\text{Gauss 方程式}
\qquad\text{と}\qquad
\text{Codazzi 方程式}
$$

を導きました。

さらに、それらを

$$
dF=F\Omega,
\qquad
d\Omega+\Omega\wedge\Omega=0
$$

という構造方程式へまとめ、可積分条件から超曲面を逆に再構成しました。

二次元では

$$
K
=
\frac{R_{1212}}{\det G}
$$

となり、外在的に定義した Gauss 曲率が第一基本形式だけから決まります。

次の GEO12 では、この事実を出発点に「そもそも周囲の Euclid 空間を用意しない」立場へ進みます。抽象多様体上に Riemann 計量を直接与え、長さ・距離・体積を構成します。
