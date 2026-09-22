# GEO16 幾何学 XVI

<!-- definition-example-audit: strict -->

[GEO13](../GEO13/index.md) では Levi-Civita 接続を構成しました。[GEO11](../GEO11/index.md) では Euclid 空間内の超曲面について Christoffel 係数から

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

という量が現れ、Gauss 方程式を満たすことを見ました。

本章では、この量の正体を一般の Riemann 多様体上で明らかにします。

曲率は「曲線が曲がって見えるか」ではありません。円柱は空間内では曲がっていますが内在的には平坦です。Riemann 曲率が測るのは、Levi-Civita 接続による微分を二つの方向へ行ったとき、その順序がどれだけ交換しないかです。

本章の流れは

$$
\text{共変微分の交換子}
\longrightarrow
\text{Riemann 曲率テンソル}
\longrightarrow
\text{対称性・Bianchi 恒等式}
\longrightarrow
\text{断面曲率}
\longrightarrow
\text{Ricci 曲率・スカラー曲率}
$$

です。

さらに GEO11 の Gauss 方程式へ戻り、

$$
\text{外在的な形作用素}
\longrightarrow
\text{内在的な Riemann 曲率}
$$

の接続を確認します。

---

## 1. 符号規約を最初に固定する

曲率には文献によって符号規約の違いがあります。本章では GEO11 の座標式と一致するよう、

$$
\boxed{
R(X,Y)Z
=
\nabla_X\nabla_Y Z
-
\nabla_Y\nabla_X Z
-
\nabla_{[X,Y]}Z
}
$$

を採用します。

この規約では半径 $a$ の標準球面で2次元接平面に割り当てる曲率は

$$
+\frac1{a^2},
$$

上半平面模型で同じ方法により得る曲率は

$$
-\frac1{a^2}
$$

になります。

符号規約を途中で変えると球面と双曲空間の符号が逆転するため、本章では全てこの式を基準にします。

<a id="def-geo16-curvature"></a>
<!-- formal-statement-start -->
> **定義（曲率作用素・Riemann 曲率テンソル）**  
> Riemann 多様体 $(M,g)$ の Levi-Civita 接続を $\nabla$ とする。
>
> ベクトル場 $X,Y,Z$ に対して
>
$$
\boxed{
R(X,Y)Z
=
\nabla_X\nabla_Y Z
-
\nabla_Y\nabla_X Z
-
\nabla_{[X,Y]}Z
}
$$
>
> と定め、$R$ を **Riemann 曲率作用素**という。
>
> さらに
>
$$
\boxed{
\operatorname{Rm}(X,Y,Z,W)
=
g(R(X,Y)Z,W)
}
$$
>
> と定め、$\operatorname{Rm}$ を **Riemann 曲率テンソル**という。
<!-- formal-statement-end -->

<!-- definition-example-start: def-geo16-curvature -->
**定義の確認**

例：Euclid 空間

$\mathbb R^n$ の Cartesian 座標では標準 Levi-Civita 接続について

$$
\nabla_{\partial_i}\partial_j=0
$$

です。

したがって座標ベクトル場について

$$
R(\partial_i,\partial_j)\partial_k=0.
$$

後で示すテンソル性から、任意の接ベクトル $X,Y,Z$ に対して

$$
R(X,Y)Z=0.
$$

従って Euclid 空間では

$$
\operatorname{Rm}=0.
$$

これは「直交座標で Christoffel 係数が0」という座標依存の事実ではなく、曲率テンソルそのものが0という座標不変な事実です。
<!-- definition-example-end -->

---

## 2. なぜ交換子だけでは足りないのか

一見すると

$$
\nabla_X\nabla_YZ-\nabla_Y\nabla_XZ
$$

だけでよさそうです。

しかし $X,Y$ 自身が可換とは限りません。関数 $f$ に対して

$$
[X,Y]f
=
X(Yf)-Y(Xf)
$$

なので、座標に由来しないベクトル場では $[X,Y]$ が一般に残ります。

そこで

$$
-\nabla_{[X,Y]}Z
$$

を引くことで、ベクトル場の延長方法に依存しない点ごとの量になります。

<a id="prop-geo16-tensoriality-coordinate"></a>
<!-- formal-statement-start -->
> **命題（曲率作用素のテンソル性と座標表示）**  
> Riemann 曲率作用素 $R$ は $X,Y,Z$ の各変数について $C^\infty(M)$ 線形である。従って $R_p(X_p,Y_p)Z_p$ は点 $p$ における接ベクトルだけで決まる。
>
> 局所座標 $(x^1,\dots,x^n)$ で
>
$$
\nabla_{\partial_i}\partial_j
=
\Gamma^k_{ij}\partial_k
$$
>
> と書けば、
>
$$
\boxed{
R(\partial_i,\partial_j)\partial_k
=
R^\ell{}_{kij}\partial_\ell
}
$$
>
> ただし
>
$$
\boxed{
R^\ell{}_{kij}
=
\partial_i\Gamma^\ell_{jk}
-
\partial_j\Gamma^\ell_{ik}
+
\Gamma^m_{jk}\Gamma^\ell_{im}
-
\Gamma^m_{ik}\Gamma^\ell_{jm}
}
$$
>
> である。
<!-- formal-statement-end -->

### 証明の見取り図

テンソル性で最も重要なのは、関数の微分項が本当に消えることです。

例えば第一変数に $fX$ を入れると、

$$
[fX,Y]
=
f[X,Y]-Y(f)X
$$

の $-Y(f)X$ が、二重共変微分から出る $Y(f)$ の項をちょうど打ち消します。

<!-- proof-start -->
### 証明

まず第一変数を調べます。

$$
\begin{aligned}
R(fX,Y)Z
&=
\nabla_{fX}\nabla_YZ
-
\nabla_Y\nabla_{fX}Z
-
\nabla_{[fX,Y]}Z
\\
&=
f\nabla_X\nabla_YZ
-
\nabla_Y(f\nabla_XZ)
-
\nabla_{f[X,Y]-Y(f)X}Z.
\end{aligned}
$$

Leibniz 則を使うと

$$
\nabla_Y(f\nabla_XZ)
=
Y(f)\nabla_XZ
+
f\nabla_Y\nabla_XZ,
$$

また

$$
\nabla_{f[X,Y]-Y(f)X}Z
=
f\nabla_{[X,Y]}Z
-
Y(f)\nabla_XZ.
$$

従って $Y(f)\nabla_XZ$ が相殺し、

$$
R(fX,Y)Z
=
fR(X,Y)Z.
$$

第二変数についても

$$
[X,fY]
=
f[X,Y]+X(f)Y
$$

を用いると同じ相殺が起こり、

$$
R(X,fY)Z
=
fR(X,Y)Z.
$$

第三変数については

$$
\nabla_Y(fZ)
=
Y(f)Z+f\nabla_YZ
$$

を二回用います。

展開すると

$$
\begin{aligned}
\nabla_X\nabla_Y(fZ)
&=
X(Yf)Z
+
Y(f)\nabla_XZ
+
X(f)\nabla_YZ
+
f\nabla_X\nabla_YZ,
\\
\nabla_Y\nabla_X(fZ)
&=
Y(Xf)Z
+
X(f)\nabla_YZ
+
Y(f)\nabla_XZ
+
f\nabla_Y\nabla_XZ,
\\
\nabla_{[X,Y]}(fZ)
&=
[X,Y](f)Z
+
f\nabla_{[X,Y]}Z.
\end{aligned}
$$

ここで

$$
[X,Y](f)
=
X(Yf)-Y(Xf)
$$

なので、関数の一階・二階微分を含む項は全て消えます。従って

$$
R(X,Y)(fZ)
=
fR(X,Y)Z.
$$

これで三変数全てについて $C^\infty(M)$ 線形であることが分かりました。

次に座標表示を求めます。座標ベクトル場は

$$
[\partial_i,\partial_j]=0
$$

なので、

$$
R(\partial_i,\partial_j)\partial_k
=
\nabla_{\partial_i}
(\Gamma^m_{jk}\partial_m)
-
\nabla_{\partial_j}
(\Gamma^m_{ik}\partial_m).
$$

第一項は

$$
\begin{aligned}
\nabla_{\partial_i}
(\Gamma^m_{jk}\partial_m)
&=
(\partial_i\Gamma^m_{jk})\partial_m
+
\Gamma^m_{jk}\nabla_{\partial_i}\partial_m
\\
&=
(\partial_i\Gamma^\ell_{jk})\partial_\ell
+
\Gamma^m_{jk}\Gamma^\ell_{im}\partial_\ell.
\end{aligned}
$$

第二項も同様に

$$
(\partial_j\Gamma^\ell_{ik})\partial_\ell
+
\Gamma^m_{ik}\Gamma^\ell_{jm}\partial_\ell
$$

です。

差を取れば

$$
R(\partial_i,\partial_j)\partial_k
=
\left(
\partial_i\Gamma^\ell_{jk}
-
\partial_j\Gamma^\ell_{ik}
+
\Gamma^m_{jk}\Gamma^\ell_{im}
-
\Gamma^m_{ik}\Gamma^\ell_{jm}
\right)
\partial_\ell.
$$

これが主張の式です。$\square$
<!-- proof-end -->

ここで得た $R^\ell{}_{kij}$ は、[GEO11 の Gauss--Codazzi 方程式](../GEO11/index.md#thm-geo11-gauss-codazzi)で先に現れた量と完全に同じです。

GEO11 では Euclid 空間内の超曲面の座標計算から出発しました。本章では、それが実は Levi-Civita 接続だけから決まる内在的なテンソルだったと分かります。

---

## 3. 一点で Christoffel 係数を消して「二階微分だけ」を読む

GEO16 の direct prerequisite は GEO13 と GEO11 です。ここでは Levi-Civita 接続の捩率0だけから、一点で Christoffel 係数を消す局所座標を直接作ります。必要なのは一点での局所的な標準化だけであり、後続章の曲線論を証明へ逆輸入しません。

<a id="prop-geo16-normal-coordinate-second-derivatives"></a>
<!-- formal-statement-start -->
> **命題（一点での接続係数消去と計量の二階微分）**  
> 任意の $p\in M$ に対し、$p$ の局所座標 $(y^1,\dots,y^n)$ を
>
$$
g_{ij}(p)=\delta_{ij},
\qquad
\Gamma^k_{ij}(p)=0,
\qquad
\partial_\ell g_{ij}(p)=0
$$
>
> となるように取れる。
>
> この座標で
>
$$
R_{\ell kij}
:=
g_{\ell m}R^m{}_{kij}
$$
>
> とすると、
>
$$
\boxed{
R_{\ell kij}(p)
=
\frac12
\left(
\partial_i\partial_k g_{j\ell}
-
\partial_i\partial_\ell g_{jk}
-
\partial_j\partial_k g_{i\ell}
+
\partial_j\partial_\ell g_{ik}
\right)(p)
}
$$
>
> が成り立つ。
<!-- formal-statement-end -->

<!-- proof-start -->
### 証明

任意の局所座標 $x^1,\dots,x^n$ を $x(p)=0$ となるように取り、最初に線形座標変換を行って

$$
g_{ij}(p)=\delta_{ij}
$$

としておきます。

この座標での Christoffel 係数を $\Gamma^k_{ij}(p)$ とします。Levi-Civita 接続は捩率0なので

$$
\Gamma^k_{ij}(p)=\Gamma^k_{ji}(p).
$$

そこで逆向きの座標変換を

$$
x^k
=
y^k
-
\frac12
\Gamma^k_{ij}(p)y^iy^j
$$

と定めます。

$y=0$ で Jacobian は恒等行列なので、[逆関数定理](../RA6A/index.md#thm-ra6a-inverse-function)により十分小さい近傍では $y$ は局所座標です。

$p$ では

$$
\frac{\partial x^a}{\partial y^i}
=
\delta_i^a,
\qquad
\frac{\partial^2x^k}{\partial y^i\partial y^j}
=
-\Gamma^k_{ij}(p).
$$

従って

$$
\left.
\nabla_{\partial/\partial y^i}
\frac{\partial}{\partial y^j}
\right|_p
=
\left(
\Gamma^k_{ij}(p)
+
\frac{\partial^2x^k}{\partial y^i\partial y^j}(p)
\right)
\left.
\frac{\partial}{\partial x^k}
\right|_p
=
0.
$$

よって新しい座標では

$$
\Gamma^k_{ij}(p)=0.
$$

また計量両立性から座標表示で

$$
\partial_\ell g_{ij}
=
\Gamma^m_{\ell i}g_{mj}
+
\Gamma^m_{\ell j}g_{im}.
$$

したがって

$$
\partial_\ell g_{ij}(p)=0.
$$

これで必要な一点正規化を GEO13 の範囲だけで構成できました。

次に曲率を計算します。$p$ では Christoffel 係数が0なので、曲率の座標公式の二次項は消え、

$$
R^\ell{}_{kij}(p)
=
\partial_i\Gamma^\ell_{jk}(p)
-
\partial_j\Gamma^\ell_{ik}(p).
$$

添字を下げた Christoffel 係数を

$$
\Gamma_{\ell jk}
=
g_{\ell m}\Gamma^m_{jk}
$$

と書くと、[Levi-Civita 接続の Christoffel 係数公式](../GEO13/index.md#prop-geo13-levi-civita-christoffel)から

$$
\Gamma_{\ell jk}
=
\frac12
\left(
\partial_jg_{k\ell}
+
\partial_kg_{j\ell}
-
\partial_\ell g_{jk}
\right).
$$

$p$ では $\Gamma=0$ なので、$g_{\ell m}$ を微分したときに掛かる $\Gamma$ の項も0です。従って

$$
R_{\ell kij}(p)
=
\partial_i\Gamma_{\ell jk}(p)
-
\partial_j\Gamma_{\ell ik}(p).
$$

右辺を展開すると

$$
\begin{aligned}
R_{\ell kij}(p)
=
\frac12\bigl(
&
\partial_i\partial_jg_{k\ell}
+
\partial_i\partial_kg_{j\ell}
-
\partial_i\partial_\ell g_{jk}
\\
&
-
\partial_j\partial_ig_{k\ell}
-
\partial_j\partial_kg_{i\ell}
+
\partial_j\partial_\ell g_{ik}
\bigr).
\end{aligned}
$$

混合偏微分の可換性から最初と四番目が相殺し、主張の式を得ます。$\square$
<!-- proof-end -->

この式が曲率の本質をよく表しています。

一点では計量の一階微分を消せますが、二階微分までは一般に消せません。Riemann 曲率は、その消せない二階情報を座標不変な形にまとめたものです。

---

## 4. 曲率テンソルが満たす代数的恒等式

4階テンソルなら何でも曲率になれるわけではありません。Levi-Civita 接続が

- 計量両立
- 捩率0

であることから強い対称性が出ます。

<a id="thm-geo16-curvature-symmetries"></a>
<!-- formal-statement-start -->
> **定理（Riemann 曲率テンソルの対称性と第一 Bianchi 恒等式）**  
> Riemann 多様体 $(M,g)$ の Riemann 曲率テンソルに対して、任意のベクトル $X,Y,Z,W$ について
>
$$
\boxed{
\operatorname{Rm}(X,Y,Z,W)
=
-\operatorname{Rm}(Y,X,Z,W)
}
$$
>
$$
\boxed{
\operatorname{Rm}(X,Y,Z,W)
=
-\operatorname{Rm}(X,Y,W,Z)
}
$$
>
$$
\boxed{
\operatorname{Rm}(X,Y,Z,W)
=
\operatorname{Rm}(Z,W,X,Y)
}
$$
>
> が成り立つ。
>
> また曲率作用素は
>
$$
\boxed{
R(X,Y)Z
+
R(Y,Z)X
+
R(Z,X)Y
=
0
}
$$
>
> を満たす。これを **第一 Bianchi 恒等式**という。
<!-- formal-statement-end -->

### 証明の見取り図

最初の反対称性は定義から直接出ます。

第二の反対称性は「計量を二方向へ微分した交換子は0」という事実を計量両立性で展開すると得られます。

第一 Bianchi 恒等式では捩率0、

$$
[X,Y]
=
\nabla_XY-\nabla_YX
$$

が決定的です。

最後の対交換対称性は、前節の計量の二階微分表示から確認できます。

<!-- proof-start -->
### 証明

まず定義から

$$
R(Y,X)Z
=
-R(X,Y)Z
$$

なので、

$$
\operatorname{Rm}(Y,X,Z,W)
=
-\operatorname{Rm}(X,Y,Z,W).
$$

次に計量両立性を使います。スカラー関数 $g(Z,W)$ に対して

$$
X(Yg(Z,W))
-
Y(Xg(Z,W))
-
[X,Y]g(Z,W)
=
0.
$$

計量両立性

$$
Xg(U,V)
=
g(\nabla_XU,V)+g(U,\nabla_XV)
$$

を各項へ二回適用します。交差項は相殺し、残る項は

$$
g(R(X,Y)Z,W)
+
g(Z,R(X,Y)W)
=
0.
$$

従って

$$
\operatorname{Rm}(X,Y,Z,W)
=
-\operatorname{Rm}(X,Y,W,Z).
$$

次に第一 Bianchi 恒等式を示します。

巡回和を展開すると

$$
\begin{aligned}
&
R(X,Y)Z+R(Y,Z)X+R(Z,X)Y
\\
={}&
\nabla_X\nabla_YZ-\nabla_Y\nabla_XZ-\nabla_{[X,Y]}Z
\\
&+
\nabla_Y\nabla_ZX-\nabla_Z\nabla_YX-\nabla_{[Y,Z]}X
\\
&+
\nabla_Z\nabla_XY-\nabla_X\nabla_ZY-\nabla_{[Z,X]}Y.
\end{aligned}
$$

Levi-Civita 接続は捩率0なので

$$
\nabla_YZ-\nabla_ZY=[Y,Z]
$$

です。

二重共変微分を外側の微分ごとにまとめると、巡回和は

$$
\begin{aligned}
&
\nabla_X(\nabla_YZ-\nabla_ZY)
+
\nabla_Y(\nabla_ZX-\nabla_XZ)
+
\nabla_Z(\nabla_XY-\nabla_YX)
\\
&\quad
-
\nabla_{[X,Y]}Z
-
\nabla_{[Y,Z]}X
-
\nabla_{[Z,X]}Y
\\
={}&
\nabla_X[Y,Z]
+
\nabla_Y[Z,X]
+
\nabla_Z[X,Y]
\\
&\quad
-
\nabla_{[Y,Z]}X
-
\nabla_{[Z,X]}Y
-
\nabla_{[X,Y]}Z.
\end{aligned}
$$

もう一度

$$
\nabla_AB-\nabla_BA=[A,B]
$$

を各組へ使うと、

$$
[X,[Y,Z]]
+
[Y,[Z,X]]
+
[Z,[X,Y]]
$$

になります。

これは [Lie 括弧の Jacobi 恒等式](../GEO5/index.md#thm-geo5-bracket-identities)により0です。従って

$$
R(X,Y)Z+R(Y,Z)X+R(Z,X)Y=0.
$$

最後に対交換対称性を示します。

これは点ごとのテンソル恒等式なので、任意の点 $p$ で前節で構成した座標を取れば十分です。

前節の式から

$$
\begin{aligned}
\operatorname{Rm}(\partial_i,\partial_j,\partial_k,\partial_\ell)
&=
R_{\ell kij}
\\
&=
\frac12
\left(
\partial_i\partial_k g_{j\ell}
-
\partial_i\partial_\ell g_{jk}
-
\partial_j\partial_k g_{i\ell}
+
\partial_j\partial_\ell g_{ik}
\right)
\end{aligned}
$$

です。

ここで $(i,j)$ と $(k,\ell)$ を同時に交換すると、

$$
R_{ji k\ell}
=
\frac12
\left(
\partial_k\partial_i g_{\ell j}
-
\partial_k\partial_j g_{\ell i}
-
\partial_\ell\partial_i g_{kj}
+
\partial_\ell\partial_j g_{ki}
\right).
$$

計量の対称性 $g_{ab}=g_{ba}$ と混合偏微分の可換性を使えば、右辺は先ほどの $R_{\ell kij}$ と同じです。

従って基底ベクトルについて

$$
\operatorname{Rm}(\partial_i,\partial_j,\partial_k,\partial_\ell)
=
\operatorname{Rm}(\partial_k,\partial_\ell,\partial_i,\partial_j).
$$

多重線形性から任意の $X,Y,Z,W$ でも成立します。$\square$
<!-- proof-end -->

### 仮定はどこで使ったか

- 最初の反対称性は曲率作用素の定義だけで出ます。
- 後ろ二変数の反対称性には計量両立性を使いました。
- 第一 Bianchi 恒等式には捩率0を使いました。
- 対交換対称性は Levi-Civita 接続だけから一点で Christoffel 係数を消し、そこで得た計量の二階微分表示を使いました。

一般のアフィン接続では、これらを全てそのまま使えるわけではありません。

---

## 5. 曲率の微分的整合条件

第一 Bianchi 恒等式は一つの点での代数的制約でした。

曲率が点から点へどう変化するかにも制約があります。

曲率作用素の共変微分を

$$
\begin{aligned}
(\nabla_XR)(Y,Z)W
:={}&
\nabla_X(R(Y,Z)W)
\\
&-
R(\nabla_XY,Z)W
-
R(Y,\nabla_XZ)W
-
R(Y,Z)\nabla_XW
\end{aligned}
$$

と定めます。

これは GEO13 で構成したテンソル場の共変微分そのものです。

<a id="thm-geo16-second-bianchi"></a>
<!-- formal-statement-start -->
> **定理（第二 Bianchi 恒等式）**  
> Riemann 多様体の Levi-Civita 接続と Riemann 曲率作用素に対して
>
$$
\boxed{
(\nabla_XR)(Y,Z)
+
(\nabla_YR)(Z,X)
+
(\nabla_ZR)(X,Y)
=
0
}
$$
>
> が成り立つ。
<!-- formal-statement-end -->

### 証明の見取り図

これはテンソル恒等式なので、一点で前節に構成した座標を使えます。

その点では $\Gamma=0$ です。そのため曲率の共変微分は通常の偏微分へ落ち、曲率自身も

$$
\partial\Gamma-\partial\Gamma
$$

だけになります。

巡回和を取ると、Christoffel 係数の二階偏微分が全て二個ずつ逆符号で現れて消えます。

<!-- proof-start -->
### 証明

点 $p$ を固定し、前節で構成した Christoffel 係数を消す座標を取ります。

$p$ では

$$
\Gamma^\ell_{ij}=0.
$$

従って $p$ では

$$
R^\ell{}_{kij}
=
\partial_i\Gamma^\ell_{jk}
-
\partial_j\Gamma^\ell_{ik}.
$$

曲率公式の $\Gamma\Gamma$ 項を偏微分した項も、$p$ では各積に少なくとも一つ $\Gamma(p)=0$ が残るため0です。

さらに $p$ では曲率成分の共変微分に現れる Christoffel 係数も0なので、

$$
\nabla_m R^\ell{}_{kij}
=
\partial_m R^\ell{}_{kij}.
$$

第二 Bianchi 恒等式の成分表示は

$$
\nabla_mR^\ell{}_{kij}
+
\nabla_iR^\ell{}_{kjm}
+
\nabla_jR^\ell{}_{kmi}.
$$

$p$ で偏微分へ置き換えると

$$
\begin{aligned}
&
\partial_m
\left(
\partial_i\Gamma^\ell_{jk}
-
\partial_j\Gamma^\ell_{ik}
\right)
\\
&+
\partial_i
\left(
\partial_j\Gamma^\ell_{mk}
-
\partial_m\Gamma^\ell_{jk}
\right)
\\
&+
\partial_j
\left(
\partial_m\Gamma^\ell_{ik}
-
\partial_i\Gamma^\ell_{mk}
\right).
\end{aligned}
$$

展開すれば

$$
\partial_m\partial_i\Gamma^\ell_{jk}
-
\partial_i\partial_m\Gamma^\ell_{jk},
$$

$$
-\partial_m\partial_j\Gamma^\ell_{ik}
+
\partial_j\partial_m\Gamma^\ell_{ik},
$$

$$
\partial_i\partial_j\Gamma^\ell_{mk}
-
\partial_j\partial_i\Gamma^\ell_{mk}
$$

の三組に分かれます。

混合偏微分は交換するので、各組は0です。

従って $p$ で第二 Bianchi 恒等式が成立します。

$p$ は任意で、両辺はテンソルなので、多様体全体で成立します。$\square$
<!-- proof-end -->

第二 Bianchi 恒等式は後の幾何解析や一般相対論で極めて重要ですが、本章ではまず「曲率の変化にも微分的な整合条件がある」ことを押さえます。

---

## 6. 4階テンソルを2次元平面の数へ圧縮する

Riemann 曲率テンソルは成分が多く、そのままでは幾何的意味を読み取りにくい量です。

そこで各点の2次元接平面ごとに一つの数へ圧縮します。

<a id="def-geo16-sectional-curvature"></a>
<!-- formal-statement-start -->
> **定義（断面曲率）**  
> $p\in M$ とし、$\sigma\subset T_pM$ を2次元部分空間とする。
>
> $\sigma$ の一次独立な基底 $u,v$ を取るとき、
>
$$
\boxed{
K(\sigma)
=
\frac{
\operatorname{Rm}(u,v,v,u)
}{
g(u,u)g(v,v)-g(u,v)^2
}
}
$$
>
> を $\sigma$ の **断面曲率**という。
<!-- formal-statement-end -->

<!-- definition-example-start: def-geo16-sectional-curvature -->
**定義の確認**

例：Euclid 空間

Euclid 空間では $\operatorname{Rm}=0$ です。

従って任意の2平面 $\sigma$ に対して分子は0で、

$$
K(\sigma)=0.
$$

分母は $u,v$ が一次独立なので Gram 行列の行列式として正です。

したがって Euclid 空間の全ての断面曲率は0です。
<!-- definition-example-end -->

分母

$$
g(u,u)g(v,v)-g(u,v)^2
$$

は $u,v$ が張る平行四辺形の面積の二乗です。

特に $u,v$ が正規直交なら

$$
\boxed{
K(\sigma)
=
\operatorname{Rm}(u,v,v,u)
}
$$

です。

<a id="prop-geo16-sectional-basis-invariance"></a>
<!-- formal-statement-start -->
> **命題（断面曲率の基底不変性）**  
> 断面曲率 $K(\sigma)$ は、2次元部分空間 $\sigma$ の基底 $u,v$ の選び方に依存しない。
<!-- formal-statement-end -->

<!-- proof-start -->
### 証明

同じ平面の別の基底を

$$
u'=au+bv,
\qquad
v'=cu+dv
$$

とし、

$$
\Delta=ad-bc\ne0
$$

とします。

Riemann 曲率テンソルは最初の二変数と後ろ二変数で交代的なので、多重線形性から

$$
\operatorname{Rm}(u',v',v',u')
=
\Delta^2
\operatorname{Rm}(u,v,v,u).
$$

一方、Gram 行列は基底変換行列

$$
A=
\begin{pmatrix}
a&b\\
c&d
\end{pmatrix}
$$

により

$$
G'
=
AGA^{\mathsf T}
$$

と変換されます。

従って

$$
\det G'
=
(\det A)^2\det G
=
\Delta^2\det G.
$$

分子と分母が同じ $\Delta^2$ 倍になるので、その比は変わりません。$\square$
<!-- proof-end -->

---

## 7. 断面曲率だけで全曲率が分かる

断面曲率は各2平面に一つの数しか与えません。

それでも、全ての2平面の断面曲率を知れば Riemann 曲率テンソル全体を復元できます。

<a id="thm-geo16-sectional-determines-riemann"></a>
<!-- formal-statement-start -->
> **定理（断面曲率による Riemann 曲率テンソルの決定）**  
> 一つの内積空間上の二つの4階テンソル $A,B$ が、Riemann 曲率テンソルと同じ反対称性・対交換対称性・第一 Bianchi 恒等式を満たし、全ての2次元部分空間で同じ断面曲率を与えるとする。
>
> このとき
>
$$
\boxed{
A=B
}
$$
>
> である。
>
> 従って Riemann 多様体では、各点の全ての断面曲率を知れば、その点の Riemann 曲率テンソル全体が一意に決まる。
<!-- formal-statement-end -->

### 証明の見取り図

差 $C=A-B$ を取れば、

$$
C(x,y,y,x)=0
$$

を全ての $x,y$ について示せばよい状況になります。

まず $x,z$ に関する偏極で

$$
C(x,y,y,z)=0
$$

を得ます。

次に $y$ を $y+w$ へ置き換える偏極から

$$
C(x,y,w,z)
=
-C(x,w,y,z)
$$

を得ます。

最後に[第一 Bianchi 恒等式](#thm-geo16-curvature-symmetries)を使うと同じ量が3回足されて0になるため、その量自身が0になります。

<!-- proof-start -->
### 証明

$C=A-B$ と置きます。

$A,B$ は同じ断面曲率を持つので、一次独立な $x,y$ に対して

$$
C(x,y,y,x)=0.
$$

$x,y$ が従属な場合も交代性から同じ式は0です。従って全ての $x,y$ について

$$
C(x,y,y,x)=0.
$$

$y$ を固定し、

$$
B_y(x,z)
:=
C(x,y,y,z)
$$

と置きます。

曲率テンソルの対称性から

$$
\begin{aligned}
B_y(z,x)
&=
C(z,y,y,x)
\\
&=
C(y,x,z,y)
\\
&=
-C(x,y,z,y)
\\
&=
C(x,y,y,z)
\\
&=
B_y(x,z).
\end{aligned}
$$

従って $B_y$ は対称双線形形式です。

しかも

$$
B_y(x,x)
=
C(x,y,y,x)
=
0
$$

が全ての $x$ で成り立ちます。

対称双線形性を直接使います。任意の $x,z$ に対して

$$
0
=
B_y(x+z,x+z)
=
B_y(x,x)+2B_y(x,z)+B_y(z,z)
=
2B_y(x,z).
$$

従って

$$
B_y(x,z)=0.
$$

すなわち

$$
\boxed{
C(x,y,y,z)=0
}
$$

が全ての $x,y,z$ で成立します。

次にこの式で $y$ を $y+w$ に置き換えます。

$$
0
=
C(x,y+w,y+w,z).
$$

展開すると

$$
0
=
C(x,y,y,z)
+
C(x,y,w,z)
+
C(x,w,y,z)
+
C(x,w,w,z).
$$

対角二項は既に0なので、

$$
\boxed{
C(x,y,w,z)
=
-C(x,w,y,z)
}
$$

を得ます。

ここで

$$
T=C(x,y,w,z)
$$

と置きます。

[第一 Bianchi 恒等式](#thm-geo16-curvature-symmetries)から

$$
C(x,y,w,z)
+
C(y,w,x,z)
+
C(w,x,y,z)
=
0.
$$

先ほどの新しい反対称性と最初の二変数の反対称性を使うと

$$
C(y,w,x,z)
=
-C(y,x,w,z)
=
T,
$$

また

$$
C(w,x,y,z)
=
-C(w,y,x,z)
=
C(y,w,x,z)
=
T.
$$

従って

$$
3T=0.
$$

実数体上なので

$$
T=0.
$$

$x,y,w,z$ は任意だったから $C=0$、従って $A=B$ です。$\square$
<!-- proof-end -->

この定理は、後で比較幾何を学ぶときの基本的な視点になります。

曲率テンソル全体を直接比較する代わりに、各2平面の断面曲率を比較すればよい場面が多くあります。

---

## 8. 曲率を方向ごと・全方向へ平均化する

ここまでの2次元接平面ごとの曲率情報を、まず一つの方向の周囲で足し合わせ、さらに全方向で足し合わせる量を定義します。

<a id="def-geo16-ricci-scalar"></a>
<!-- formal-statement-start -->
> **定義（Ricci 曲率・スカラー曲率）**  
> $p\in M$ とし、$e_1,\dots,e_n$ を $T_pM$ の正規直交基底とする。
>
> $Y,Z\in T_pM$ に対して
>
$$
\boxed{
\operatorname{Ric}(Y,Z)
=
\sum_{i=1}^n
\operatorname{Rm}(e_i,Y,Z,e_i)
}
$$
>
> と定め、$\operatorname{Ric}$ を **Ricci 曲率**という。
>
> さらに
>
$$
\boxed{
\operatorname{Scal}
=
\sum_{i=1}^n
\operatorname{Ric}(e_i,e_i)
}
$$
>
> を **スカラー曲率**という。
<!-- formal-statement-end -->

<!-- definition-example-start: def-geo16-ricci-scalar -->
**定義の確認**

例：Euclid 空間

Euclid 空間では

$$
\operatorname{Rm}=0.
$$

従って任意の $Y,Z$ について

$$
\operatorname{Ric}(Y,Z)=0,
$$

さらに

$$
\operatorname{Scal}=0.
$$

定義どおり正規直交基底に沿って足し合わせても、0でない量が新しく生じるわけではありません。
<!-- definition-example-end -->

<a id="prop-geo16-ricci-symmetric"></a>
<!-- formal-statement-start -->
> **命題（Ricci 曲率の対称性）**  
> Ricci 曲率は対称2階テンソルであり、
>
$$
\boxed{
\operatorname{Ric}(Y,Z)
=
\operatorname{Ric}(Z,Y)
}
$$
>
> が成り立つ。
<!-- formal-statement-end -->

<!-- proof-start -->
### 証明

正規直交基底 $e_i$ を用いると

$$
\operatorname{Ric}(Z,Y)
=
\sum_i
\operatorname{Rm}(e_i,Z,Y,e_i).
$$

対交換対称性から

$$
\operatorname{Rm}(e_i,Z,Y,e_i)
=
\operatorname{Rm}(Y,e_i,e_i,Z).
$$

最初の二変数の反対称性と、後ろ二変数の反対称性を順に使うと

$$
\operatorname{Rm}(Y,e_i,e_i,Z)
=
\operatorname{Rm}(e_i,Y,Z,e_i).
$$

従って各項が一致し、

$$
\operatorname{Ric}(Z,Y)
=
\operatorname{Ric}(Y,Z).
$$

$\square$
<!-- proof-end -->

正規直交基底で $Y=e_j$ とすると、

$$
\operatorname{Ric}(e_j,e_j)
=
\sum_{i\ne j}
K(\operatorname{span}\{e_i,e_j\}).
$$

$i=j$ の項は反対称性により0です。

従って Ricci 曲率は「一つの方向 $e_j$ を含む全ての直交2平面の断面曲率の和」と読めます。

また

$$
\operatorname{Scal}
=
2
\sum_{1\le i<j\le n}
K(\operatorname{span}\{e_i,e_j\})
$$

です。

各2平面が $(i,j)$ と $(j,i)$ の二回数えられるため係数2が付きます。

---

## 9. 全ての2平面が同じ曲率を持つ場合

<a id="def-geo16-constant-sectional-curvature"></a>
<!-- formal-statement-start -->
> **定義（定断面曲率）**  
> 連結 Riemann 多様体 $(M,g)$ について、ある定数 $c\in\mathbb R$ が存在し、任意の点 $p\in M$ と任意の2次元部分空間 $\sigma\subset T_pM$ に対して
>
$$
\boxed{
K(\sigma)=c
}
$$
>
> が成り立つとき、$(M,g)$ は **定断面曲率 $c$** を持つという。
<!-- formal-statement-end -->

<!-- definition-example-start: def-geo16-constant-sectional-curvature -->
**定義の確認**

例：Euclid 空間

Euclid 空間では全ての断面曲率が0でした。

したがって

$$
c=0
$$

として定断面曲率を持ちます。
<!-- definition-example-end -->

<a id="prop-geo16-constant-curvature-tensor"></a>
<!-- formal-statement-start -->
> **命題（定断面曲率の曲率テンソル）**  
> Riemann 多様体が定断面曲率 $c$ を持つことと、
>
$$
\boxed{
R(X,Y)Z
=
c\left(
g(Y,Z)X-g(X,Z)Y
\right)
}
$$
>
> が任意の $X,Y,Z$ について成り立つことは同値である。
>
> 同値に、
>
$$
\boxed{
\operatorname{Rm}(X,Y,Z,W)
=
c\left(
g(Y,Z)g(X,W)
-
g(X,Z)g(Y,W)
\right)
}
$$
>
> である。
<!-- formal-statement-end -->

<!-- proof-start -->
### 証明

まず表示式が成り立つとします。

一次独立な $u,v$ に対して

$$
\operatorname{Rm}(u,v,v,u)
=
c\left(
g(v,v)g(u,u)-g(u,v)^2
\right).
$$

断面曲率の定義で割れば

$$
K(\operatorname{span}\{u,v\})=c.
$$

逆に全ての断面曲率が $c$ とします。

各点で4階テンソル

$$
A(X,Y,Z,W)
=
c\left(
g(Y,Z)g(X,W)
-
g(X,Z)g(Y,W)
\right)
$$

を考えます。

直接確認すると $A$ は Riemann 曲率テンソルと同じ反対称性・対交換対称性・第一 Bianchi 恒等式を満たします。

また

$$
A(u,v,v,u)
=
c\left(
g(u,u)g(v,v)-g(u,v)^2
\right)
$$

なので、$A$ の断面曲率は全て $c$ です。

実際の $\operatorname{Rm}$ も全ての断面曲率が $c$ です。

[断面曲率による Riemann 曲率テンソルの決定](#thm-geo16-sectional-determines-riemann)から

$$
\operatorname{Rm}=A.
$$

計量が非退化なので、最後の変数との内積が全て一致することから曲率作用素の表示式も従います。$\square$
<!-- proof-end -->

<a id="cor-geo16-constant-curvature-contractions"></a>
<!-- formal-statement-start -->
> **系（定断面曲率空間の Ricci 曲率とスカラー曲率）**  
> $n$ 次元 Riemann 多様体が定断面曲率 $c$ を持つなら、
>
$$
\boxed{
\operatorname{Ric}
=
(n-1)c\,g
}
$$
>
> および
>
$$
\boxed{
\operatorname{Scal}
=
n(n-1)c
}
$$
>
> が成り立つ。
<!-- formal-statement-end -->

<!-- proof-start -->
### 証明

正規直交基底 $e_1,\dots,e_n$ を取ります。

[定断面曲率の曲率テンソル](#prop-geo16-constant-curvature-tensor)から

$$
\begin{aligned}
\operatorname{Ric}(Y,Z)
&=
\sum_i
\operatorname{Rm}(e_i,Y,Z,e_i)
\\
&=
c
\sum_i
\left(
g(Y,Z)g(e_i,e_i)
-
g(e_i,Z)g(Y,e_i)
\right).
\end{aligned}
$$

第一項は

$$
nc\,g(Y,Z).
$$

第二項は正規直交基底による成分展開から

$$
c\sum_i g(Z,e_i)g(Y,e_i)
=
c\,g(Y,Z).
$$

従って

$$
\operatorname{Ric}(Y,Z)
=
(n-1)c\,g(Y,Z).
$$

さらに

$$
\operatorname{Scal}
=
\sum_i\operatorname{Ric}(e_i,e_i)
=
\sum_i(n-1)c
=
n(n-1)c.
$$

$\square$
<!-- proof-end -->

---

## 10. Gauss 方程式：外在曲率から内在曲率へ

GEO11 では Euclid 空間内の超曲面に対して Gauss 方程式

$$
R_{\ell kij}
=
b_{jk}b_{i\ell}
-
b_{ik}b_{j\ell}
$$

を得ました。

[曲率作用素のテンソル性と座標表示](#prop-geo16-tensoriality-coordinate)により、左辺はまさに Riemann 曲率テンソルの成分です。

<a id="prop-geo16-gauss-intrinsic"></a>
<!-- formal-statement-start -->
> **命題（Gauss 方程式の内在表示）**  
> Euclid 空間 $\mathbb R^{n+1}$ 内の超曲面 $M^n$ に誘導計量を入れ、第二基本形式を $\operatorname{II}$ とする。
>
> このとき $M$ の Riemann 曲率テンソルは
>
$$
\boxed{
\operatorname{Rm}(X,Y,Z,W)
=
\operatorname{II}(Y,Z)\operatorname{II}(X,W)
-
\operatorname{II}(X,Z)\operatorname{II}(Y,W)
}
$$
>
> を満たす。
<!-- formal-statement-end -->

<!-- proof-start -->
### 証明

局所座標基底

$$
X_i=\partial_i
$$

について、GEO11 の Gauss 方程式は

$$
R_{\ell kij}
=
b_{jk}b_{i\ell}
-
b_{ik}b_{j\ell}
$$

でした。

[曲率作用素のテンソル性と座標表示](#prop-geo16-tensoriality-coordinate)から

$$
R_{\ell kij}
=
\operatorname{Rm}(X_i,X_j,X_k,X_\ell).
$$

また

$$
b_{jk}
=
\operatorname{II}(X_j,X_k).
$$

従って座標基底上で

$$
\operatorname{Rm}(X_i,X_j,X_k,X_\ell)
=
\operatorname{II}(X_j,X_k)\operatorname{II}(X_i,X_\ell)
-
\operatorname{II}(X_i,X_k)\operatorname{II}(X_j,X_\ell).
$$

両辺は4変数について多重線形なので、任意の $X,Y,Z,W$ に拡張できます。$\square$
<!-- proof-end -->

この式は、超曲面では内在曲率が第二基本形式から計算できることを示します。

一方、左辺は誘導計量だけから決まります。

この二面性が Gauss の驚異の定理の中身です。

<a id="cor-geo16-surface-gauss-sectional"></a>
<!-- formal-statement-start -->
> **系（二次元の Gauss 曲率と断面曲率の一致）**  
> Euclid 3空間内の二次元曲面では、各点で唯一の2次元接平面の断面曲率は Gauss 曲率 $K_G$ に等しい。
>
> より具体的に、第一基本形式の行列を $G=(g_{ij})$ とすると
>
$$
\boxed{
K(\,T_pM\,)
=
\frac{R_{1212}}{\det G}
=
K_G
}
$$
>
> である。
<!-- formal-statement-end -->

<!-- proof-start -->
### 証明

座標基底 $X_1,X_2$ を使うと、断面曲率は

$$
K(T_pM)
=
\frac{
\operatorname{Rm}(X_1,X_2,X_2,X_1)
}{
g_{11}g_{22}-g_{12}^2
}.
$$

分子は

$$
R_{1212},
$$

分母は

$$
\det G.
$$

従って

$$
K(T_pM)
=
\frac{R_{1212}}{\det G}.
$$

[GEO11 の Gauss の驚異の定理](../GEO11/index.md#thm-geo11-egregium)で

$$
K_G
=
\frac{R_{1212}}{\det G}
$$

を既に示しているので、

$$
K(T_pM)=K_G.
$$

$\square$
<!-- proof-end -->

### 主方向で読む

正規直交な主方向 $e_i,e_j$ を取り、対応する主曲率を $\kappa_i,\kappa_j$ とします。

すると

$$
\operatorname{II}(e_i,e_j)=0,
$$

$$
\operatorname{II}(e_i,e_i)=\kappa_i,
\qquad
\operatorname{II}(e_j,e_j)=\kappa_j.
$$

[Gauss 方程式](../GEO11/index.md#thm-geo11-gauss-codazzi)から

$$
K(\operatorname{span}\{e_i,e_j\})
=
\kappa_i\kappa_j.
$$

つまり Euclid 超曲面では、各主方向平面の内在的断面曲率は二つの主曲率の積です。

---

## 11. 三つの標準模型

### 11.1 Euclid 空間

既に見たように

$$
\operatorname{Rm}=0.
$$

従って

$$
K=0,
\qquad
\operatorname{Ric}=0,
\qquad
\operatorname{Scal}=0.
$$

### 11.2 半径 $a$ の球面

半径 $a$ の球面

$$
S^n_a
\subset
\mathbb R^{n+1}
$$

に誘導計量を入れます。

外向き単位法線に対して形作用素は

$$
S=-\frac1a I.
$$

従って第二基本形式は

$$
\operatorname{II}(X,Y)
=
-\frac1a g(X,Y).
$$

Gauss 方程式へ代入すると

$$
\begin{aligned}
\operatorname{Rm}(X,Y,Z,W)
&=
\frac1{a^2}
\left(
g(Y,Z)g(X,W)
-
g(X,Z)g(Y,W)
\right).
\end{aligned}
$$

したがって

$$
\boxed{
K=\frac1{a^2}
}
$$

です。

さらに次元を $n$ とすると

$$
\operatorname{Ric}
=
\frac{n-1}{a^2}g,
$$

$$
\operatorname{Scal}
=
\frac{n(n-1)}{a^2}.
$$

球面が正曲率であることが、形作用素の符号に依存せず主曲率の積から出ています。

外向き法線では各主曲率が $-1/a$ ですが、その積は $+1/a^2$ です。

### 11.3 上半平面模型

上半平面

$$
H
=
\{(x,y)\in\mathbb R^2:y>0\}
$$

に

$$
\boxed{
g
=
\frac{a^2}{y^2}
(dx^2+dy^2)
}
$$

を入れます。

非零な Christoffel 係数は

$$
\Gamma^x_{xy}
=
\Gamma^x_{yx}
=
-\frac1y,
$$

$$
\Gamma^y_{xx}
=
\frac1y,
\qquad
\Gamma^y_{yy}
=
-\frac1y.
$$

断面曲率を求めるには、二次元なので

$$
R^x{}_{yxy}
$$

だけ計算すれば十分です。

座標公式から

$$
\begin{aligned}
R^x{}_{yxy}
&=
\partial_x\Gamma^x_{yy}
-
\partial_y\Gamma^x_{xy}
+
\Gamma^m_{yy}\Gamma^x_{xm}
-
\Gamma^m_{xy}\Gamma^x_{ym}
\\
&=
0
-
\frac1{y^2}
+
\frac1{y^2}
-
\frac1{y^2}
\\
&=
-\frac1{y^2}.
\end{aligned}
$$

従って

$$
\operatorname{Rm}(\partial_x,\partial_y,\partial_y,\partial_x)
=
g_{xx}R^x{}_{yxy}
=
-\frac{a^2}{y^4}.
$$

一方、Gram 行列式は

$$
g_{xx}g_{yy}-g_{xy}^2
=
\frac{a^4}{y^4}.
$$

したがって

$$
\boxed{
K
=
-\frac1{a^2}
}
$$

です。

この計量は全ての点で同じ負の断面曲率を持ちます。

ここまでで三つの基本模型

$$
\boxed{
\begin{array}{c|c}
\text{模型}&\text{断面曲率}\\
\hline
\mathbb R^n&0\\
S^n_a&+1/a^2\\
H^2_a&-1/a^2
\end{array}
}
$$

が揃いました。

---

## 12. 曲率が「測地線のずれ」へ変わる手前

本章では曲率を

$$
R(X,Y)Z
$$

という共変微分の非可換性として定義しました。

しかし、まだ「正曲率なら測地線が寄りやすい」「負曲率なら離れやすい」という幾何的現象を証明してはいません。

その橋になるのが次の GEO17 の Jacobi 場です。

変分の中で測地線を少し動かすと、その変位ベクトル $J$ は

$$
\frac{D^2J}{dt^2}
+
R(J,\dot\gamma)\dot\gamma
=
0
$$

という Jacobi 方程式を満たします。

つまり本章で定義した曲率が、次章では測地線同士の相対加速度として直接現れます。

---

## 13. 演習

### Level A

<a id="ex-geo16-a01"></a>
#### GEO16-A01 Euclid 空間の曲率を座標表示から確認する
- Level: A

$\mathbb R^n$ の Cartesian 座標で標準計量を考える。

1. 全ての Christoffel 係数が0であることを示せ。
2. 曲率成分 $R^\ell{}_{kij}$ が全て0であることを示せ。
3. 断面曲率、Ricci 曲率、スカラー曲率を求めよ。

<!-- solution-start -->
**解答**

1. 標準計量では

   $$
   g_{ij}=\delta_{ij}
   $$

   が定数です。

   Levi-Civita 接続の公式

   $$
   \Gamma^k_{ij}
   =
   \frac12g^{k\ell}
   \left(
   \partial_i g_{j\ell}
   +
   \partial_j g_{i\ell}
   -
   \partial_\ell g_{ij}
   \right)
   $$

   で計量係数の偏微分は全て0なので

   $$
   \Gamma^k_{ij}=0.
   $$

2. 曲率公式の各項は $\Gamma$ またはその偏微分を含みます。

   $\Gamma=0$ が恒等的に成り立つので

   $$
   R^\ell{}_{kij}=0.
   $$

3. 従って

   $$
   \operatorname{Rm}=0.
   $$

   任意の2平面で

   $$
   K=0.
   $$

   また定義どおり成分を足し合わせても0なので

   $$
   \operatorname{Ric}=0,
   \qquad
   \operatorname{Scal}=0.
   $$
<!-- solution-end -->

<a id="ex-geo16-a02"></a>
#### GEO16-A02 正規直交基底で断面曲率を読む
- Level: A

$p\in M$ で $u,v\in T_pM$ が正規直交しているとする。

1. $\sigma=\operatorname{span}\{u,v\}$ に対して
   $$
   K(\sigma)
   =
   \operatorname{Rm}(u,v,v,u)
   $$
   を示せ。
2. 曲率テンソルの対称性から
   $$
   \operatorname{Rm}(v,u,u,v)
   =
   \operatorname{Rm}(u,v,v,u)
   $$
   を示せ。
3. $u$ を $-u$ に変えても断面曲率が変わらないことを示せ。

<!-- solution-start -->
**解答**

1. 正規直交性から

   $$
   g(u,u)=g(v,v)=1,
   \qquad
   g(u,v)=0.
   $$

   従って断面曲率の分母は

   $$
   1\cdot1-0^2=1.
   $$

   よって

   $$
   K(\sigma)
   =
   \operatorname{Rm}(u,v,v,u).
   $$

2. 対交換対称性から

   $$
   \operatorname{Rm}(v,u,u,v)
   =
   \operatorname{Rm}(u,v,v,u).
   $$

3. 多重線形性より

   $$
   \operatorname{Rm}(-u,v,v,-u)
   =
   (-1)^2
   \operatorname{Rm}(u,v,v,u).
   $$

   分母も $u$ の符号変更では変化しません。

   従って断面曲率は変わりません。
<!-- solution-end -->

<a id="ex-geo16-a03"></a>
#### GEO16-A03 定断面曲率から Ricci 曲率を求める
- Level: A

$n$ 次元 Riemann 多様体が定断面曲率 $c$ を持つとする。

1. 単位ベクトル $v$ を含む正規直交基底
   $$
   e_1=v,e_2,\dots,e_n
   $$
   を取る。
2.
   $$
   \operatorname{Ric}(v,v)
   =
   (n-1)c
   $$
   を断面曲率の和として示せ。
3. スカラー曲率を求めよ。

<!-- solution-start -->
**解答**

1. 有限次元内積空間なので Gram--Schmidt 法により、単位ベクトル $v$ を正規直交基底へ延長できます。

2. 定義から

   $$
   \operatorname{Ric}(v,v)
   =
   \sum_{i=1}^n
   \operatorname{Rm}(e_i,v,v,e_i).
   $$

   $i=1$ では $e_1=v$ なので最初の二変数が同じになり、

   $$
   \operatorname{Rm}(v,v,v,v)=0.
   $$

   $i\ge2$ では $e_i,v$ は正規直交なので

   $$
   \operatorname{Rm}(e_i,v,v,e_i)
   =
   K(\operatorname{span}\{e_i,v\})
   =
   c.
   $$

   項は $n-1$ 個あるため

   $$
   \operatorname{Ric}(v,v)
   =
   (n-1)c.
   $$

3. 正規直交基底の各 $e_j$ について同じ計算が成り立つので

   $$
   \operatorname{Ric}(e_j,e_j)
   =
   (n-1)c.
   $$

   従って

   $$
   \operatorname{Scal}
   =
   \sum_{j=1}^n
   \operatorname{Ric}(e_j,e_j)
   =
   n(n-1)c.
   $$
<!-- solution-end -->

<a id="ex-geo16-a04"></a>
#### GEO16-A04 球面の曲率を Gauss 方程式から求める
- Level: A

半径 $a$ の球面 $S^n_a\subset\mathbb R^{n+1}$ を考える。

外向き単位法線に対して

$$
S=-\frac1aI
$$

であることを使ってよい。

1. 第二基本形式を求めよ。
2. [Gauss 方程式](../GEO11/index.md#thm-geo11-gauss-codazzi)から Riemann 曲率テンソルを求めよ。
3. 断面曲率を求めよ。

<!-- solution-start -->
**解答**

1. 第二基本形式は

   $$
   \operatorname{II}(X,Y)
   =
   g(SX,Y)
   $$

   なので

   $$
   \operatorname{II}(X,Y)
   =
   -\frac1a g(X,Y).
   $$

2. Gauss 方程式

   $$
   \operatorname{Rm}(X,Y,Z,W)
   =
   \operatorname{II}(Y,Z)\operatorname{II}(X,W)
   -
   \operatorname{II}(X,Z)\operatorname{II}(Y,W)
   $$

   に代入すると

   $$
   \operatorname{Rm}(X,Y,Z,W)
   =
   \frac1{a^2}
   \left(
   g(Y,Z)g(X,W)
   -
   g(X,Z)g(Y,W)
   \right).
   $$

3. 一次独立な $u,v$ に対して

   $$
   \operatorname{Rm}(u,v,v,u)
   =
   \frac1{a^2}
   \left(
   g(u,u)g(v,v)-g(u,v)^2
   \right).
   $$

   分母で割れば

   $$
   \boxed{
   K=\frac1{a^2}
   }.
   $$
<!-- solution-end -->

### Level B

<a id="ex-geo16-b01"></a>
#### GEO16-B01 Ricci 曲率の対称性を再構成する
- Level: B

正規直交基底 $e_1,\dots,e_n$ を用いて

$$
\operatorname{Ric}(Y,Z)
=
\sum_i\operatorname{Rm}(e_i,Y,Z,e_i)
$$

とする。

Riemann 曲率テンソルの対称性だけを使い、

$$
\operatorname{Ric}(Y,Z)
=
\operatorname{Ric}(Z,Y)
$$

を一行ずつ変形して示せ。

<!-- solution-start -->
**解答**

まず

$$
\operatorname{Ric}(Z,Y)
=
\sum_i
\operatorname{Rm}(e_i,Z,Y,e_i).
$$

対交換対称性から

$$
\operatorname{Rm}(e_i,Z,Y,e_i)
=
\operatorname{Rm}(Y,e_i,e_i,Z).
$$

最初の二変数を交換すると

$$
\operatorname{Rm}(Y,e_i,e_i,Z)
=
-\operatorname{Rm}(e_i,Y,e_i,Z).
$$

さらに後ろ二変数を交換すると

$$
-\operatorname{Rm}(e_i,Y,e_i,Z)
=
\operatorname{Rm}(e_i,Y,Z,e_i).
$$

従って各 $i$ で

$$
\operatorname{Rm}(e_i,Z,Y,e_i)
=
\operatorname{Rm}(e_i,Y,Z,e_i).
$$

総和を取って

$$
\operatorname{Ric}(Z,Y)
=
\operatorname{Ric}(Y,Z).
$$
<!-- solution-end -->

<a id="ex-geo16-b02"></a>
#### GEO16-B02 共形平面計量の Gauss 曲率
- Level: B

平面領域に

$$
g
=
e^{2u(x,y)}
(dx^2+dy^2)
$$

という Riemann 計量を入れる。

1. 非零な Christoffel 係数が
   $$
   \Gamma^x_{xx}=u_x,
   \qquad
   \Gamma^x_{xy}=\Gamma^x_{yx}=u_y,
   \qquad
   \Gamma^x_{yy}=-u_x,
   $$
   $$
   \Gamma^y_{xx}=-u_y,
   \qquad
   \Gamma^y_{xy}=\Gamma^y_{yx}=u_x,
   \qquad
   \Gamma^y_{yy}=u_y
   $$
   であることを示せ。
2.
   $$
   R^x{}_{yxy}
   =
   -(u_{xx}+u_{yy})
   $$
   を示せ。
3. Gauss 曲率が
   $$
   \boxed{
   K
   =
   -e^{-2u}(u_{xx}+u_{yy})
   }
   $$
   となることを示せ。

<!-- solution-start -->
**解答**

1. 計量係数は

   $$
   g_{xx}=g_{yy}=e^{2u},
   \qquad
   g_{xy}=0.
   $$

   逆行列は

   $$
   g^{xx}=g^{yy}=e^{-2u}.
   $$

   例えば

   $$
   \Gamma^x_{xx}
   =
   \frac12e^{-2u}\partial_x(e^{2u})
   =
   u_x.
   $$

   また

   $$
   \Gamma^x_{xy}
   =
   \frac12e^{-2u}\partial_y(e^{2u})
   =
   u_y,
   $$

   $$
   \Gamma^x_{yy}
   =
   -\frac12e^{-2u}\partial_x(e^{2u})
   =
   -u_x.
   $$

   $x,y$ を交換して同様に計算すると

   $$
   \Gamma^y_{xx}=-u_y,
   \qquad
   \Gamma^y_{xy}=u_x,
   \qquad
   \Gamma^y_{yy}=u_y.
   $$

2. 曲率公式から

   $$
   R^x{}_{yxy}
   =
   \partial_x\Gamma^x_{yy}
   -
   \partial_y\Gamma^x_{xy}
   +
   \Gamma^m_{yy}\Gamma^x_{xm}
   -
   \Gamma^m_{xy}\Gamma^x_{ym}.
   $$

   微分項は

   $$
   \partial_x(-u_x)-\partial_y(u_y)
   =
   -u_{xx}-u_{yy}.
   $$

   最初の積の和は

   $$
   \Gamma^x_{yy}\Gamma^x_{xx}
   +
   \Gamma^y_{yy}\Gamma^x_{xy}
   =
   (-u_x)u_x+u_y^2
   =
   -u_x^2+u_y^2.
   $$

   二番目の積の和は

   $$
   \Gamma^x_{xy}\Gamma^x_{yx}
   +
   \Gamma^y_{xy}\Gamma^x_{yy}
   =
   u_y^2-u_x^2.
   $$

   差を取ると二次項は0です。

   従って

   $$
   R^x{}_{yxy}
   =
   -(u_{xx}+u_{yy}).
   $$

3. 分子は

   $$
   \operatorname{Rm}(\partial_x,\partial_y,\partial_y,\partial_x)
   =
   g_{xx}R^x{}_{yxy}
   =
   -e^{2u}(u_{xx}+u_{yy}).
   $$

   分母は

   $$
   g_{xx}g_{yy}-g_{xy}^2
   =
   e^{4u}.
   $$

   よって

   $$
   K
   =
   \frac{-e^{2u}(u_{xx}+u_{yy})}{e^{4u}}
   =
   \boxed{
   -e^{-2u}(u_{xx}+u_{yy})
   }.
   $$
<!-- solution-end -->

<a id="ex-geo16-b03"></a>
#### GEO16-B03 主曲率と断面曲率
- Level: B

Euclid 空間内の超曲面で、点 $p$ における形作用素の正規直交固有基底を

$$
e_1,\dots,e_n
$$

とし、

$$
Se_i=\kappa_i e_i
$$

とする。

1.
   $$
   \operatorname{II}(e_i,e_j)
   =
   \kappa_i\delta_{ij}
   $$
   を示せ。
2. $i\ne j$ に対し
   $$
   \boxed{
   K(\operatorname{span}\{e_i,e_j\})
   =
   \kappa_i\kappa_j
   }
   $$
   を示せ。
3. 円柱では一方の主曲率が0なので内在的 Gauss 曲率が0になることを説明せよ。

<!-- solution-start -->
**解答**

1. 第二基本形式は

   $$
   \operatorname{II}(X,Y)=g(SX,Y)
   $$

   です。

   従って

   $$
   \operatorname{II}(e_i,e_j)
   =
   g(\kappa_i e_i,e_j)
   =
   \kappa_i\delta_{ij}.
   $$

2. $e_i,e_j$ は正規直交なので、断面曲率の分母は1です。

   [Gauss 方程式](../GEO11/index.md#thm-geo11-gauss-codazzi)から

   $$
   \begin{aligned}
   K(\operatorname{span}\{e_i,e_j\})
   &=
   \operatorname{Rm}(e_i,e_j,e_j,e_i)
   \\
   &=
   \operatorname{II}(e_j,e_j)\operatorname{II}(e_i,e_i)
   -
   \operatorname{II}(e_i,e_j)\operatorname{II}(e_j,e_i).
   \end{aligned}
   $$

   $i\ne j$ なので交差項は0で、

   $$
   K
   =
   \kappa_j\kappa_i.
   $$

3. 半径 $a$ の円柱では主曲率は符号規約によって

   $$
   -\frac1a,\qquad0
   $$

   のように一方が0です。

   従って積は

   $$
   K=0.
   $$

   円柱は $\mathbb R^3$ 内では外在的に曲がっていますが、誘導計量の内在曲率は0です。
<!-- solution-end -->

### Level C

<a id="ex-geo16-c01"></a>
#### GEO16-C01 回転対称計量の曲率を一式で求める
- Level: C

二次元計量

$$
g
=
dr^2+f(r)^2d\theta^2,
\qquad
f(r)>0
$$

を考える。

1. 非零な Christoffel 係数が
   $$
   \Gamma^r_{\theta\theta}
   =
   -ff',
   \qquad
   \Gamma^\theta_{r\theta}
   =
   \Gamma^\theta_{\theta r}
   =
   \frac{f'}f
   $$
   であることを示せ。
2.
   $$
   R^r{}_{\theta r\theta}
   =
   -ff''
   $$
   を示せ。
3. Gauss 曲率が
   $$
   \boxed{
   K=-\frac{f''}{f}
   }
   $$
   となることを示せ。
4. 次の三つを代入して曲率を求めよ。
   $$
   f(r)=r,
   $$
   $$
   f(r)=a\sin\frac ra,
   $$
   $$
   f(r)=a\sinh\frac ra.
   $$
5. 4の三つが、それぞれ平坦・正定曲率・負定曲率の模型に対応することを説明せよ。

<!-- solution-start -->
**解答**

1. 計量係数は

   $$
   g_{rr}=1,
   \qquad
   g_{\theta\theta}=f^2,
   \qquad
   g_{r\theta}=0.
   $$

   $r$ に関する唯一の非零微分は

   $$
   \partial_r g_{\theta\theta}
   =
   2ff'.
   $$

   従って

   $$
   \Gamma^r_{\theta\theta}
   =
   -\frac12\partial_r g_{\theta\theta}
   =
   -ff',
   $$

   $$
   \Gamma^\theta_{r\theta}
   =
   \Gamma^\theta_{\theta r}
   =
   \frac12g^{\theta\theta}\partial_r g_{\theta\theta}
   =
   \frac12\frac1{f^2}(2ff')
   =
   \frac{f'}f.
   $$

2. 曲率公式で

   $$
   \ell=r,
   \quad
   k=\theta,
   \quad
   i=r,
   \quad
   j=\theta
   $$

   とすると

   $$
   R^r{}_{\theta r\theta}
   =
   \partial_r\Gamma^r_{\theta\theta}
   -
   \partial_\theta\Gamma^r_{r\theta}
   +
   \Gamma^m_{\theta\theta}\Gamma^r_{rm}
   -
   \Gamma^m_{r\theta}\Gamma^r_{\theta m}.
   $$

   第一項は

   $$
   \partial_r(-ff')
   =
   -(f')^2-ff''.
   $$

   第二項は0です。

   第三項も0です。

   第四項では $m=\theta$ だけが残り、

   $$
   -
   \Gamma^\theta_{r\theta}
   \Gamma^r_{\theta\theta}
   =
   -
   \frac{f'}f(-ff')
   =
   +(f')^2.
   $$

   従って

   $$
   R^r{}_{\theta r\theta}
   =
   -ff''.
   $$

3. 分子は

   $$
   \operatorname{Rm}(\partial_r,\partial_\theta,\partial_\theta,\partial_r)
   =
   g_{rr}R^r{}_{\theta r\theta}
   =
   -ff''.
   $$

   分母は

   $$
   g_{rr}g_{\theta\theta}-g_{r\theta}^2
   =
   f^2.
   $$

   よって

   $$
   \boxed{
   K=-\frac{f''}{f}
   }.
   $$

4. まず

   $$
   f(r)=r
   $$

   なら

   $$
   f''(r)=0
   $$

   なので

   $$
   K=0.
   $$

   次に

   $$
   f(r)=a\sin\frac ra
   $$

   なら

   $$
   f''(r)
   =
   -\frac1a\sin\frac ra
   =
   -\frac1{a^2}f(r).
   $$

   従って

   $$
   K
   =
   \frac1{a^2}.
   $$

   最後に

   $$
   f(r)=a\sinh\frac ra
   $$

   なら

   $$
   f''(r)
   =
   \frac1a\sinh\frac ra
   =
   \frac1{a^2}f(r).
   $$

   従って

   $$
   K
   =
   -\frac1{a^2}.
   $$

5. $dr^2+r^2d\theta^2$ は Euclid 平面の極座標計量です。

   $$
   dr^2
   +
   a^2\sin^2(r/a)d\theta^2
   $$

   は半径 $a$ の球面の測地極座標に対応します。

   $$
   dr^2
   +
   a^2\sinh^2(r/a)d\theta^2
   $$

   は曲率 $-1/a^2$ の双曲平面の測地極座標です。

   一つの公式

   $$
   K=-\frac{f''}{f}
   $$

   が平坦・正曲率・負曲率の三模型を同時に区別しています。
<!-- solution-end -->

---

## 14. 章末チェック

この章を終えた時点で、次を自力で再構成できることを確認してください。

1. なぜ
   $$
   \nabla_X\nabla_YZ-\nabla_Y\nabla_XZ
   $$
   だけではテンソルにならず、$-\nabla_{[X,Y]}Z$ が必要なのか。
2. 本章の曲率符号規約が GEO11 の
   $$
   R^\ell{}_{kij}
   $$
   と一致していること。
3. 一点で $\Gamma(p)=0$ とできても曲率が一般に0でない理由。
4. Riemann 曲率テンソルの三つの対称性と第一 Bianchi 恒等式。
5. 第二 Bianchi 恒等式が一点で $\Gamma=0$ とする座標により混合偏微分の相殺へ帰着すること。
6. 断面曲率の分母が Gram 行列式であり、基底変更で分子と同じ倍率を受けること。
7. 断面曲率が全て分かれば Riemann 曲率テンソル全体が決まる偏極論証。
8. Ricci 曲率とスカラー曲率が Riemann 曲率テンソルからどのような和で得られるか。
9. 定断面曲率 $c$ なら
   $$
   \operatorname{Ric}=(n-1)cg,
   \qquad
   \operatorname{Scal}=n(n-1)c
   $$
   となること。
10. [Gauss 方程式](../GEO11/index.md#thm-geo11-gauss-codazzi)により、Euclid 超曲面の主方向平面では
    $$
    K_{ij}=\kappa_i\kappa_j
    $$
    となること。
11. Euclid・球面・双曲平面の曲率がそれぞれ
    $$
    0,\qquad +1/a^2,\qquad -1/a^2
    $$
    になること。

---

## 15. 次に進む

本章では

$$
R(X,Y)Z
$$

を導入し、Riemann 曲率を接続の非可換性として定義しました。

さらに

$$
\operatorname{Rm}
\longrightarrow
K
\longrightarrow
\operatorname{Ric}
\longrightarrow
\operatorname{Scal}
$$

という曲率情報の圧縮を構成しました。

次の **GEO17「変分公式・Jacobi 場・共役点」** では、曲率が測地線の変分へ直接現れます。

第一変分公式から測地線がエネルギーの臨界点であることを示し、第二変分から Jacobi 方程式

$$
\frac{D^2J}{dt^2}
+
R(J,\dot\gamma)\dot\gamma
=
0
$$

を導きます。

これにより、本章で構成した曲率が「共役点」という機構を通じて曲線の局所的な最短性と結び付くことが見えてきます。
