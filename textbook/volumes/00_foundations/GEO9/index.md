# GEO9 幾何学 IX

[GEO7](../GEO7/index.md) では微分形式と外微分を構成し、[外微分の二乗は0](../GEO7/index.md#thm-geo7-d-square-zero) を証明しました。[GEO8](../GEO8/index.md) では微分形式を積分し、[一般 Stokes の定理](../GEO8/index.md#thm-geo8-general-stokes) まで進みました。

ここから初めて、微分形式に **大域的な穴の情報** が現れます。

局所的には、外微分が0の形式はしばしばポテンシャルを持ちます。しかし多様体全体では、閉じた曲線を一周したときの積分が消えないためにポテンシャルを持てないことがあります。本章ではこの差を

$$
\text{閉形式}
\quad\text{と}\quad
\text{完全形式}
$$

の差として捉え、その差を商空間として記録する方法を導入します。

主役は次の三段です。

1. パラメータ積分で次数を1下げる作用素を作り、外微分が0の形式から局所ポテンシャルを構成する。
2. 外微分でつながる列から商空間を定義し、滑らかな変形でその商が不変であることを証明する。
3. $S^1$ と穴あき平面を直接計算し、「局所的にはポテンシャルがあるが大域的にはない」を数式で確認する。

de Rham の定理、特異ホモロジー、Mayer--Vietoris 完全系列は本章では使いません。したがって本章だけで、微分形式側から見える最初の位相的不変量まで到達できます。

---

## 1. 外微分が消える形式とポテンシャルから生じる形式

$M$ を滑らかな多様体とします。

<a id="def-geo9-closed-exact"></a>
<!-- formal-statement-start -->
> **定義（閉形式・完全形式）**  
> $\omega\in\Omega^k(M)$ とする。
>
> $d\omega=0$
>
> を満たすとき、$\omega$ を **閉形式**という。
>
> ある $\eta\in\Omega^{k-1}(M)$ が存在して
>
> $\omega=d\eta$
>
> と書けるとき、$\omega$ を **完全形式**という。
>
> $k=0$ では完全形式は定義せず、閉0形式とは $df=0$ を満たす滑らかな関数 $f$ をいう。
<!-- formal-statement-end -->

<!-- definition-example-start: def-geo9-closed-exact -->
**定義の確認**

$\mathbb R^2$ 上で

$$
f(x,y)=x^2y+x+y^2
$$

と置きます。このとき

$$
df
=
(2xy+1)\,dx
+
(x^2+2y)\,dy.
$$

したがって

$$
\omega
=
(2xy+1)\,dx
+
(x^2+2y)\,dy
$$

は完全形式です。

さらに [GEO7 の $d^2=0$](../GEO7/index.md#thm-geo7-d-square-zero) から

$$
d\omega=d(df)=0
$$

なので閉形式でもあります。
<!-- definition-example-end -->

<a id="prop-geo9-exact-closed"></a>
<!-- formal-statement-start -->
> **命題（完全なら閉）**  
> 任意の滑らかな多様体 $M$ と $k\ge1$ に対して、完全 $k$ 形式は閉形式である。
<!-- formal-statement-end -->

<!-- proof-start -->
### 証明

$\omega=d\eta$ と書けるとします。[外微分の二乗は0](../GEO7/index.md#thm-geo7-d-square-zero) より

$$
d\omega
=
d(d\eta)
=
0.
$$

従って $\omega$ は閉形式です。$\square$
<!-- proof-end -->

逆は一般には成り立ちません。本章の中心問題はまさに、

> **閉形式がいつ完全形式になるか。**

です。

---

## 2. 穴あき平面では閉形式が完全とは限らない

まず、局所的な完全性を与える定理を証明する前に「逆が失敗する」具体例を見ます。

$$
X
=
\mathbb R^2\setminus\{(0,0)\}
$$

上の1形式

$$
\alpha
=
\frac{-y\,dx+x\,dy}{x^2+y^2}
$$

を考えます。

分母は $X$ 上で正なので、$\alpha$ は $X$ 上の滑らかな1形式です。

外微分を計算します。係数を

$$
P(x,y)=-\frac{y}{x^2+y^2},
\qquad
Q(x,y)=\frac{x}{x^2+y^2}
$$

とすると

$$
d\alpha
=
\left(
\frac{\partial Q}{\partial x}
-
\frac{\partial P}{\partial y}
\right)
dx\wedge dy.
$$

ここで

$$
\frac{\partial Q}{\partial x}
=
\frac{y^2-x^2}{(x^2+y^2)^2},
$$

$$
\frac{\partial P}{\partial y}
=
\frac{y^2-x^2}{(x^2+y^2)^2},
$$

なので

$$
d\alpha=0.
$$

従って $\alpha$ は閉形式です。

一方、反時計回りの単位円

$$
\gamma(t)=(\cos t,\sin t),
\qquad
0\le t\le2\pi
$$

へ引き戻すと

$$
\gamma^*\alpha
=
dt.
$$

したがって

$$
\int_{S^1}\alpha
=
\int_0^{2\pi}dt
=
2\pi.
$$

もし $\alpha=df$ なら、閉曲線上の積分は

$$
\int_{S^1}df=0
$$

でなければなりません。実際、$f\circ\gamma$ は $2\pi$ 周期なので

$$
\int_0^{2\pi}
\frac{d}{dt}(f\circ\gamma)(t)\,dt
=
f(\gamma(2\pi))-f(\gamma(0))
=
0.
$$

従って $\alpha$ は完全ではありません。

ここで壊れているのは微分計算ではありません。原点という「穴」を回る閉曲線が縮められないことが、大域的ポテンシャルを妨げています。

---

## 3. 写像の滑らかな変形と次数を1下げる作用素

二つの滑らかな写像を連続的に変形するとき、引き戻された微分形式の差がどのように見えるかを調べます。

<a id="def-geo9-smooth-homotopy"></a>
<!-- formal-statement-start -->
> **定義（滑らかなホモトピー）**  
> 滑らかな多様体 $M,N$ と滑らかな写像
>
> $f_0,f_1:M\to N$
>
> に対し、滑らかな写像
>
> $H:[0,1]\times M\to N$
>
> が
>
> $H(0,p)=f_0(p), \qquad H(1,p)=f_1(p)$
>
> を満たすとき、$H$ を $f_0$ と $f_1$ の **滑らかなホモトピー**という。
<!-- formal-statement-end -->

<!-- definition-example-start: def-geo9-smooth-homotopy -->
**定義の確認**

$\mathbb R^n$ 上で恒等写像と定値写像 $c_0(x)=0$ を考えます。

$$
H(t,x)=tx
$$

と置けば、

$$
H(0,x)=0=c_0(x),
\qquad
H(1,x)=x
$$

です。$H$ は多項式写像なので滑らかです。従って恒等写像は定値写像へ滑らかにホモトープです。
<!-- definition-example-end -->

$[0,1]\times M$ 上の $t$ 方向ベクトル場を $\partial_t$ と書き、

$$
j_t:M\to[0,1]\times M,
\qquad
j_t(p)=(t,p)
$$

とします。

<a id="def-geo9-homotopy-operator"></a>
<!-- formal-statement-start -->
> **定義（ホモトピー作用素）**  
> 滑らかなホモトピー
>
> $H:[0,1]\times M\to N$
>
> に対して、$k\ge1$ と $\omega\in\Omega^k(N)$ に
>
> $K_H\omega := \int_0^1 j_t^* \left( \iota_{\partial_t}H^*\omega \right) dt$
>
> と定める。
>
> 右辺は $M$ 上の $(k-1)$ 形式であり、局所座標では各係数関数を $t$ について積分することで定義する。
<!-- formal-statement-end -->

<!-- definition-example-start: def-geo9-homotopy-operator -->
**定義の確認**

$M=N=\mathbb R^2$、$H(t,x,y)=(tx,ty)$ とし、

$$
\omega
=
y\,dx+x\,dy
$$

を考えます。

$k=1$ なので $K_H\omega$ は0形式、すなわち関数です。後で導く星型開集合の公式をこの例に直接使うと

$$
(K_H\omega)(x,y)
=
\int_0^1
\omega_{(tx,ty)}((x,y))
dt.
$$

ここで

$$
\omega_{(tx,ty)}((x,y))
=
ty\,x+tx\,y
=
2txy.
$$

従って

$$
K_H\omega
=
\int_0^1 2txy\,dt
=
xy.
$$

実際

$$
d(K_H\omega)
=
d(xy)
=
y\,dx+x\,dy
=
\omega.
$$
<!-- definition-example-end -->

---

## 4. 変形の両端を外微分で比較する

<a id="thm-geo9-homotopy-formula"></a>
<!-- formal-statement-start -->
> **定理（ホモトピー公式）**  
> $H:[0,1]\times M\to N$ を滑らかなホモトピーとし、
>
> $H_t(p):=H(t,p)$
>
> と書く。任意の $\omega\in\Omega^k(N)$ に対して
>
> $\boxed{ H_1^*\omega-H_0^*\omega = d(K_H\omega)+K_H(d\omega) }$
>
> が成り立つ。
>
> $k=0$ では $K_H\omega=0$ と解釈する。
<!-- formal-statement-end -->

### 証明の見取り図

$H^*\omega$ を $[0,1]\times M$ 上の形式として見ます。

$t$ を動かしたときの変化率は、$\partial_t$ に沿う Lie 微分です。[GEO7 の Cartan の公式](../GEO7/index.md#thm-geo7-cartan-formula)

$$
\mathcal L_{\partial_t}
=
d\iota_{\partial_t}
+
\iota_{\partial_t}d
$$

を使い、$t=0$ から $1$ まで積分します。

<!-- proof-start -->
### 証明

$$
\beta:=H^*\omega
$$

と置きます。

まず

$$
H_t^*\omega
=
j_t^*\beta
$$

です。

局所座標で $\beta$ の係数を書けば、$t$ に関する微分は係数の偏微分です。従って

$$
\frac{d}{dt}j_t^*\beta
=
j_t^*(\mathcal L_{\partial_t}\beta).
$$

[GEO7 の Cartan の公式](../GEO7/index.md#thm-geo7-cartan-formula)から

$$
\mathcal L_{\partial_t}\beta
=
d(\iota_{\partial_t}\beta)
+
\iota_{\partial_t}(d\beta).
$$

よって

$$
\frac{d}{dt}H_t^*\omega
=
d\left(
j_t^*\iota_{\partial_t}H^*\omega
\right)
+
j_t^*\iota_{\partial_t}d(H^*\omega).
$$

外微分の自然性

$$
d(H^*\omega)=H^*(d\omega)
$$

を使うと

$$
\frac{d}{dt}H_t^*\omega
=
d\left(
j_t^*\iota_{\partial_t}H^*\omega
\right)
+
j_t^*\iota_{\partial_t}H^*(d\omega).
$$

$t$ について $0$ から $1$ まで積分します。係数は $[0,1]$ 上で滑らかなので、外微分は係数の $t$ 積分と交換できます。従って

$$
H_1^*\omega-H_0^*\omega
=
d
\left(
\int_0^1
j_t^*\iota_{\partial_t}H^*\omega
dt
\right)
+
\int_0^1
j_t^*\iota_{\partial_t}H^*(d\omega)
dt.
$$

定義から右辺は

$$
d(K_H\omega)+K_H(d\omega).
$$

従って

$$
H_1^*\omega-H_0^*\omega
=
d(K_H\omega)+K_H(d\omega).
$$

$\square$
<!-- proof-end -->

この式は、後の全結果を生む「微分形式版の基本公式」です。

---

## 5. 星型開集合では局所障害が消える

Euclid 空間の開集合 $U\subset\mathbb R^n$ が点 $a\in U$ に関して **星型**であるとは、任意の $x\in U$ と $0\le t\le1$ に対して

$$
a+t(x-a)\in U
$$

となることです。

<a id="thm-geo9-poincare-lemma"></a>
<!-- formal-statement-start -->
> **定理（微分形式の Poincaré の補題）**  
> $U\subset\mathbb R^n$ を星型開集合とし、$k\ge1$ とする。
>
> $\omega\in\Omega^k(U), \qquad d\omega=0$
>
> ならば、ある
>
> $\eta\in\Omega^{k-1}(U)$
>
> が存在して
>
> $\omega=d\eta$
>
> となる。
>
> すなわち星型開集合では、正次数の閉形式は全て完全である。
<!-- formal-statement-end -->

### 証明の見取り図

星型性は

$$
H(t,x)=a+t(x-a)
$$

が常に $U$ の中に留まることを保証します。

$H_1=\operatorname{id}_U$、$H_0=c_a$ は点 $a$ への定値写像です。正次数の形式は定値写像で引き戻すと0になるため、[ホモトピー公式](#thm-geo9-homotopy-formula)は

$$
\omega=d(K_H\omega)
$$

へ縮みます。

<!-- proof-start -->
### 証明

$$
H:[0,1]\times U\to U,
\qquad
H(t,x)=a+t(x-a)
$$

と置きます。$U$ が $a$ に関して星型なので $H$ は確かに $U$ に値を取ります。

また

$$
H_1=\operatorname{id}_U,
\qquad
H_0=c_a
$$

です。

$k\ge1$ なので、定値写像の微分は0であり、

$$
c_a^*\omega=0.
$$

[ホモトピー公式](#thm-geo9-homotopy-formula)より

$$
H_1^*\omega-H_0^*\omega
=
d(K_H\omega)+K_H(d\omega).
$$

左辺は

$$
\omega-0=\omega,
$$

また仮定 $d\omega=0$ から

$$
K_H(d\omega)=0.
$$

従って

$$
\omega=d(K_H\omega).
$$

よって

$$
\eta:=K_H\omega
$$

と置けば $\omega=d\eta$ です。$\square$
<!-- proof-end -->

### 星型開集合での具体公式

原点 $a=0$ の場合、$H(t,x)=tx$ です。$k$ 形式 $\omega$ に対して

$$
(K_H\omega)_x(v_1,\dots,v_{k-1})
=
\int_0^1
t^{k-1}
\omega_{tx}
(x,v_1,\dots,v_{k-1})
dt.
$$

ここで $t^{k-1}$ は、$v_1,dots,v_{k-1}$ が $dH$ によってそれぞれ $t$ 倍されるために現れます。

[微分形式の Poincaré の補題](#thm-geo9-poincare-lemma)が言っているのは、

> **局所的な障害はない。障害があるなら、それは領域全体の形に由来する。**

ということです。

---

## 6. 外微分で微分形式をつなぐ

<a id="def-geo9-de-rham-complex"></a>
<!-- formal-statement-start -->
> **定義（de Rham 複体）**  
> 滑らかな $n$ 次元多様体 $M$ に対して
>
> $0 \longrightarrow \Omega^0(M) \xrightarrow{d} \Omega^1(M) \xrightarrow{d} \cdots \xrightarrow{d} \Omega^n(M) \longrightarrow 0$
>
> を **de Rham 複体**という。
>
> [外微分の二乗は0](../GEO7/index.md#thm-geo7-d-square-zero) により、連続する二つの矢印の合成は常に0である。
<!-- formal-statement-end -->

<!-- definition-example-start: def-geo9-de-rham-complex -->
**定義の確認**

$M=\mathbb R^2$ では

$$
0
\to
C^\infty(\mathbb R^2)
\xrightarrow{d}
\Omega^1(\mathbb R^2)
\xrightarrow{d}
\Omega^2(\mathbb R^2)
\to
0
$$

です。

関数 $f$ から1形式 $df$ を作り、さらに外微分すると

$$
d(df)=0.
$$

従って「前の段から来たもの」は必ず「次の段で0になるもの」の中に入ります。
<!-- definition-example-end -->

次数 $k$ で

$$
Z^k(M)
:=
\ker\left(
d:\Omega^k(M)\to\Omega^{k+1}(M)
\right)
$$

を閉 $k$ 形式全体、

$$
B^k(M)
:=
\operatorname{im}\left(
d:\Omega^{k-1}(M)\to\Omega^k(M)
\right)
$$

を完全 $k$ 形式全体と書きます。

完全なら閉なので

$$
B^k(M)\subset Z^k(M)
$$

です。

---

## 7. 閉じているが完全でない差を商で測る

<a id="def-geo9-de-rham-cohomology"></a>
<!-- formal-statement-start -->
> **定義（de Rham コホモロジー）**  
> 滑らかな多様体 $M$ の $k$ 次 **de Rham コホモロジー**を
>
> $H^k_{\mathrm{dR}}(M) := \frac{Z^k(M)}{B^k(M)}$
>
> と定める。
>
> 閉形式 $\omega$ の同値類を
>
> $[\omega]$
>
> と書く。二つの閉形式 $\omega,\omega'$ が同じ類を表すとは
>
> $\omega-\omega'=d\eta$
>
> となる $(k-1)$ 形式 $\eta$ が存在することをいう。
<!-- formal-statement-end -->

<!-- definition-example-start: def-geo9-de-rham-cohomology -->
**定義の確認**

$\mathbb R^2$ 上の

$$
\omega
=
(2xy+1)\,dx
+
(x^2+2y)\,dy
$$

は

$$
\omega=d(x^2y+x+y^2)
$$

でした。

従って $\omega$ は $B^1(\mathbb R^2)$ に属し、

$$
[\omega]=0
\in
H^1_{\mathrm{dR}}(\mathbb R^2).
$$

一方、穴あき平面の角度1形式 $\alpha$ は閉ですが完全でないので、

$$
[\alpha]\ne0
\in
H^1_{\mathrm{dR}}(\mathbb R^2\setminus\{0\}).
$$
<!-- definition-example-end -->

[微分形式の Poincaré の補題](#thm-geo9-poincare-lemma)から、星型開集合 $U$ では

$$
H^k_{\mathrm{dR}}(U)=0
\qquad(k\ge1)
$$

です。

---

## 8. 0次コホモロジーは連結成分を数える

0形式は滑らかな関数です。

<a id="thm-geo9-h0-connected"></a>
<!-- formal-statement-start -->
> **定理（連結多様体の0次 de Rham コホモロジー）**  
> $M$ が非空の連結滑らかな多様体なら
>
> $H^0_{\mathrm{dR}}(M) \cong \mathbb R.$
>
> 同型は定数関数 $c$ を実数 $c$ に対応させることで与えられる。
<!-- formal-statement-end -->

### 証明の見取り図

0次では

$$
B^0(M)=0
$$

なので、$H^0$ は閉0形式、すなわち $df=0$ の関数そのものです。

$df=0$ なら各座標近傍で全偏導関数が0なので局所定数です。連結空間上の局所定数関数は全体で定数です。

<!-- proof-start -->
### 証明

$f\in\Omega^0(M)=C^\infty(M)$ が閉であるとは

$$
df=0
$$

であることです。

任意の座標近傍 $(U,x^1,\dots,x^n)$ で

$$
df
=
\sum_{i=1}^n
\frac{\partial f}{\partial x^i}
dx^i.
$$

従って $df=0$ なら

$$
\frac{\partial f}{\partial x^i}=0
\qquad(i=1,\dots,n)
$$

です。よって $f$ は各連結な小座標近傍で定数、すなわち局所定数です。

実数 $c$ を一つ固定し、

$$
A_c:=f^{-1}(\{c\})
$$

と置きます。局所定数性から $A_c$ は開集合です。また $f$ の連続性から閉集合でもあります。

$f$ が少なくとも一点 $p$ で値 $c=f(p)$ を取るので $A_c$ は空でありません。[TOP3 の連結性と開閉集合の判定](../TOP3/index.md#prop-top3-clopen)より、非空で開かつ閉の部分集合は $M$ 全体しかないため

$$
A_c=M.
$$

従って $f$ は定数です。

0次には前段がないので $B^0(M)=0$ です。よって

$$
H^0_{\mathrm{dR}}(M)
=
Z^0(M)
\cong
\mathbb R.
$$

$\square$
<!-- proof-end -->

一般の多様体では、$H^0_{\mathrm{dR}}(M)$ は各連結成分ごとに独立な定数を選ぶ空間になります。

---

## 9. 滑らかなホモトピーでコホモロジーは変わらない

滑らかな写像

$$
f:M\to N
$$

は微分形式を引き戻すので、

$$
f^*:\Omega^k(N)\to\Omega^k(M)
$$

を与えます。

外微分の自然性

$$
d(f^*\omega)=f^*(d\omega)
$$

から、閉形式は閉形式へ、完全形式は完全形式へ写ります。従って

$$
f^*:H^k_{\mathrm{dR}}(N)\to H^k_{\mathrm{dR}}(M)
$$

が well-defined です。

<a id="thm-geo9-homotopy-invariance"></a>
<!-- formal-statement-start -->
> **定理（de Rham コホモロジーの滑らかなホモトピー不変性）**  
> 滑らかな写像
>
> $f_0,f_1:M\to N$
>
> が滑らかにホモトープなら、全ての $k\ge0$ について誘導写像は一致する。
>
> $f_0^* = f_1^* : H^k_{\mathrm{dR}}(N) \to H^k_{\mathrm{dR}}(M).$
<!-- formal-statement-end -->

### 証明の見取り図

閉形式 $\omega$ に[ホモトピー公式](#thm-geo9-homotopy-formula)を使うと

$$
f_1^*\omega-f_0^*\omega
=
d(K_H\omega)
$$

です。つまり二つの引き戻しは「完全形式だけ」違います。商空間 $Z^k/B^k$ では同じ元になります。

<!-- proof-start -->
### 証明

$H$ を $f_0$ と $f_1$ の滑らかなホモトピーとします。

$[\omega]\in H^k_{\mathrm{dR}}(N)$ を取り、代表元 $\omega$ を閉形式とします。従って

$$
d\omega=0.
$$

[ホモトピー公式](#thm-geo9-homotopy-formula)から

$$
f_1^*\omega-f_0^*\omega
=
d(K_H\omega)+K_H(d\omega).
$$

$d\omega=0$ なので

$$
f_1^*\omega-f_0^*\omega
=
d(K_H\omega).
$$

従って二つの閉形式 $f_1^*\omega$ と $f_0^*\omega$ の差は完全です。よって

$$
[f_1^*\omega]
=
[f_0^*\omega].
$$

したがってコホモロジー上で

$$
f_1^*=f_0^*.
$$

$\square$
<!-- proof-end -->

これにより、滑らかに変形して同じ形になる多様体は同じ de Rham コホモロジーを持つことが分かります。

---

## 10. (S^1) の1次 de Rham コホモロジー

反時計回りに向き付けた

$$
S^1
=
\{(x,y)\in\mathbb R^2:x^2+y^2=1\}
$$

を考えます。

$S^1$ は1次元なので、任意の1形式 $\omega$ について

$$
d\omega=0
$$

です。したがって全ての1形式が閉形式です。

ここで

$$
I:
H^1_{\mathrm{dR}}(S^1)
\to
\mathbb R,
\qquad
I([\omega])
=
\int_{S^1}\omega
$$

と置きます。

完全形式 $df$ の積分は0なので、この写像は代表元の取り方に依りません。

<a id="thm-geo9-h1-circle"></a>
<!-- formal-statement-start -->
> **定理（円周の1次 de Rham コホモロジー）**  
> 反時計回りに向き付けた円周 $S^1$ について
>
> $\boxed{ H^1_{\mathrm{dR}}(S^1) \cong \mathbb R }.$
>
> 具体的には
>
> $[\omega] \longmapsto \int_{S^1}\omega$
>
> が線形同型である。
>
> $\eta := x\,dy-y\,dx$
>
> の $S^1$ への制限は
>
> $\int_{S^1}\eta=2\pi$
>
> を満たし、$H^1_{\mathrm{dR}}(S^1)$ の生成元を与える。
<!-- formal-statement-end -->

### 証明の見取り図

全射性は $\eta$ の積分が $2\pi$ であることから分かります。

単射性の核心は「積分が0なら $df=\omega$ を満たす関数を作れる」です。周期写像

$$
p(t)=(\cos t,\sin t)
$$

で1形式を実数直線へ引き戻し、

$$
p^*\omega=a(t)dt
$$

と書きます。積分が0なら

$$
F(t)=\int_0^t a(s)ds
$$

が $2\pi$ 周期になり、円周上の関数へ降ります。

<!-- proof-start -->
### 証明

まず

$$
p:\mathbb R\to S^1,
\qquad
p(t)=(\cos t,\sin t)
$$

と置きます。

$$
\eta=x\,dy-y\,dx
$$

に対して

$$
p^*x=\cos t,
\qquad
p^*y=\sin t,
$$

$$
p^*dx=-\sin t\,dt,
\qquad
p^*dy=\cos t\,dt.
$$

従って

$$
p^*\eta
=
\cos^2t\,dt
+
\sin^2t\,dt
=
dt.
$$

よって

$$
\int_{S^1}\eta
=
\int_0^{2\pi}dt
=
2\pi.
$$

したがって任意の $c\in\mathbb R$ に対し

$$
\frac{c}{2\pi}\eta
$$

の積分は $c$ です。ゆえに $I$ は全射です。

次に $I([\omega])=0$ とします。$S^1$ は1次元なので $d\omega=0$ は自動的に成り立ちます。

$$
p^*\omega
=
a(t)dt
$$

と書きます。$p(t+2\pi)=p(t)$ なので

$$
a(t+2\pi)=a(t).
$$

また

$$
0
=
\int_{S^1}\omega
=
\int_0^{2\pi}a(t)dt.
$$

そこで

$$
F(t)
:=
\int_0^t a(s)ds
$$

と置きます。すると

$$
F'(t)=a(t).
$$

さらに

$$
F(t+2\pi)-F(t)
=
\int_t^{t+2\pi}a(s)ds
=
\int_0^{2\pi}a(s)ds
=
0
$$

なので

$$
F(t+2\pi)=F(t).
$$

従って $F$ は円周上の滑らかな関数 $f:S^1\to\mathbb R$ を

$$
f(p(t))=F(t)
$$

によって定めます。周期性があるのでこれは well-defined です。

両辺を微分すると

$$
p^*(df)
=
d(f\circ p)
=
dF
=
a(t)dt
=
p^*\omega.
$$

$p$ は各点の近くで局所微分同相であり全射なので、1形式の等式は円周上へ戻して

$$
df=\omega.
$$

従って $\omega$ は完全です。よって

$$
\ker I=0.
$$

$I$ は全射かつ単射なので線形同型です。$\square$
<!-- proof-end -->

ここでは de Rham の定理を使っていません。円周上の1形式を周期関数へ引き戻すだけで、$H^1$ を直接計算しました。

---

## 11. 穴あき平面は円周と同じ1次コホモロジーを持つ

$$
X
=
\mathbb R^2\setminus\{0\}
$$

とし、

$$
r:X\to S^1,
\qquad
r(x)=\frac{x}{\|x\|}
$$

を半径方向の射影、

$$
i:S^1\hookrightarrow X
$$

を包含写像とします。

明らかに

$$
r\circ i
=
\operatorname{id}_{S^1}.
$$

一方

$$
i\circ r
$$

は $X$ 上の恒等写像と滑らかにホモトープです。実際

$$
H(t,x)
=
\left(
(1-t)+\frac{t}{\|x\|}
\right)x
$$

と置くと、係数は常に正なので $H(t,x)\ne0$ です。また

$$
H(0,x)=x,
\qquad
H(1,x)=\frac{x}{\|x\|}.
$$

さらに $x\in S^1$ なら $\|x\|=1$ なので、全ての $t$ で

$$
H(t,x)=x.
$$

従って $S^1$ は $X$ の滑らかな変形レトラクトです。

<a id="cor-geo9-punctured-plane-h1"></a>
<!-- formal-statement-start -->
> **系（穴あき平面の1次 de Rham コホモロジー）**  
> $X=\mathbb R^2\setminus\{0\}$ とする。このとき
>
> $\boxed{ H^1_{\mathrm{dR}}(X) \cong \mathbb R }.$
>
> 生成元は
>
> $\alpha = \frac{-y\,dx+x\,dy}{x^2+y^2}$
>
> のコホモロジー類 $[\alpha]$ で与えられる。
<!-- formal-statement-end -->

<!-- proof-start -->
### 証明

包含 $i$ と半径方向射影 $r$ について

$$
r\circ i
=
\operatorname{id}_{S^1}.
$$

従って引き戻しでは順序が反転して

$$
i^*\circ r^*
=
(r\circ i)^*
=
\operatorname{id}
$$

です。

また $i\circ r$ は $\operatorname{id}_X$ と滑らかにホモトープなので、[滑らかなホモトピー不変性](#thm-geo9-homotopy-invariance)から

$$
r^*\circ i^*
=
(i\circ r)^*
=
\operatorname{id}
$$

がコホモロジー上で成り立ちます。

従って

$$
i^*:H^1_{\mathrm{dR}}(X)\to H^1_{\mathrm{dR}}(S^1)
$$

と

$$
r^*:H^1_{\mathrm{dR}}(S^1)\to H^1_{\mathrm{dR}}(X)
$$

は互いに逆の線形同型です。

前節より

$$
H^1_{\mathrm{dR}}(S^1)
\cong
\mathbb R
$$

なので

$$
H^1_{\mathrm{dR}}(X)
\cong
\mathbb R.
$$

最後に $S^1$ 上の

$$
\eta=x\,dy-y\,dx
$$

を半径方向射影で引き戻します。

$$
r(x,y)
=
\left(
\frac{x}{\rho},
\frac{y}{\rho}
\right),
\qquad
\rho=\sqrt{x^2+y^2}.
$$

直接計算すると

$$
r^*\eta
=
\frac{-y\,dx+x\,dy}{x^2+y^2}
=
\alpha.
$$

従って $[\alpha]=r^*[\eta]$ は $H^1_{\mathrm{dR}}(X)$ の生成元です。$\square$
<!-- proof-end -->

したがって任意の閉1形式 $\omega$ は、ある実数 $c$ と滑らかな関数 $f$ を使って

$$
\omega
=
c\alpha+df
$$

と書けます。

係数 $c$ は単位円周上の循環から

$$
c
=
\frac{1}{2\pi}
\int_{S^1}\omega
$$

と決まります。

これは [VC2](../VC2/index.md) や [VC5](../VC5/index.md) で現れた「局所的には保存場に見えるのに、大域ポテンシャルが存在しない」現象の正体です。

---

## 12. ここまでで見えた構造

本章の論理をまとめます。

$$
d^2=0
$$

から

$$
\text{完全}
\Longrightarrow
\text{閉}
$$

が分かります。

星型開集合では [微分形式の Poincaré の補題](#thm-geo9-poincare-lemma)により逆も成り立つので

$$
\text{閉}
\Longleftrightarrow
\text{完全}
\qquad(k\ge1)
$$

です。

しかし穴あき平面では

$$
\alpha
=
\frac{-y\,dx+x\,dy}{x^2+y^2}
$$

が

$$
d\alpha=0,
\qquad
\int_{S^1}\alpha=2\pi
$$

を満たし、閉だが完全ではありません。

この「閉形式のうち、完全形式では説明できない残り」を

$$
H^k_{\mathrm{dR}}(M)
=
Z^k(M)/B^k(M)
$$

が記録します。

さらに[ホモトピー公式](#thm-geo9-homotopy-formula)により、滑らかな変形でこの商空間は変わりません。

本章ではここで止めます。de Rham コホモロジーと特異コホモロジーを同一視する de Rham の定理、Mayer--Vietoris 完全系列、特性類は後続の代数的位相幾何系列の担当です。

---

## 13. 演習

### GEO9-A01 閉形式か、完全形式か

$\mathbb R^2$ 上の1形式

$$
\omega
=
(2xy+1)\,dx
+
(x^2+2y)\,dy
$$

を考える。

1. $d\omega$ を計算し、$\omega$ が閉形式であることを示せ。
2. $\omega=df$ を満たす関数 $f$ を一つ求めよ。
3. $[\omega]\in H^1_{\mathrm{dR}}(\mathbb R^2)$ を求めよ。

- Level: A
- 狙い: 閉形式・完全形式・コホモロジー類を同じ具体例でつなぐ

<!-- solution-start -->
**詳細解答**

$$
P=2xy+1,
\qquad
Q=x^2+2y
$$

と書くと

$$
\omega=P\,dx+Q\,dy.
$$

1形式の外微分は

$$
d\omega
=
\left(
\frac{\partial Q}{\partial x}
-
\frac{\partial P}{\partial y}
\right)
dx\wedge dy.
$$

各偏導関数は

$$
\frac{\partial Q}{\partial x}=2x,
\qquad
\frac{\partial P}{\partial y}=2x
$$

なので

$$
d\omega=0.
$$

従って $\omega$ は閉形式です。

次に

$$
\frac{\partial f}{\partial x}=2xy+1
$$

を $x$ について積分すると

$$
f(x,y)
=
x^2y+x+C(y)
$$

と書けます。

$y$ で微分して

$$
\frac{\partial f}{\partial y}
=
x^2+C'(y).
$$

これが $Q=x^2+2y$ に等しいため

$$
C'(y)=2y.
$$

従って

$$
C(y)=y^2+C_0.
$$

定数 $C_0$ は $df$ に影響しないので、例えば

$$
\boxed{
f(x,y)=x^2y+x+y^2
}
$$

と取れます。

よって

$$
\omega=df
$$

は完全形式です。従って de Rham コホモロジーでは

$$
\boxed{
[\omega]=0
}.
$$
<!-- solution-end -->

### GEO9-A02 角度1形式は閉だが完全でない

$$
X=\mathbb R^2\setminus\{0\}
$$

上で

$$
\alpha
=
\frac{-y\,dx+x\,dy}{x^2+y^2}
$$

とする。

1. $d\alpha=0$ を示せ。
2. 単位円 $\gamma(t)=(\cos t,\sin t)$ に対して $\gamma^*\alpha$ を求めよ。
3. $\alpha$ が完全でないことを示せ。

- Level: A
- 狙い: 閉と完全の差を循環積分で直接検出する

<!-- solution-start -->
**詳細解答**

$$
P=-\frac{y}{x^2+y^2},
\qquad
Q=\frac{x}{x^2+y^2}
$$

と置きます。

まず

$$
\frac{\partial Q}{\partial x}
=
\frac{(x^2+y^2)-2x^2}{(x^2+y^2)^2}
=
\frac{y^2-x^2}{(x^2+y^2)^2}.
$$

また

$$
\frac{\partial P}{\partial y}
=
\frac{-(x^2+y^2)+2y^2}{(x^2+y^2)^2}
=
\frac{y^2-x^2}{(x^2+y^2)^2}.
$$

従って

$$
d\alpha
=
\left(
\frac{\partial Q}{\partial x}
-
\frac{\partial P}{\partial y}
\right)
dx\wedge dy
=
0.
$$

次に

$$
x=\cos t,
\qquad
y=\sin t,
$$

$$
dx=-\sin t\,dt,
\qquad
dy=\cos t\,dt.
$$

単位円上では $x^2+y^2=1$ なので

$$
\gamma^*\alpha
=
-\sin t(-\sin t\,dt)
+
\cos t(\cos t\,dt)
=
dt.
$$

従って

$$
\int_{S^1}\alpha
=
\int_0^{2\pi}dt
=
2\pi.
$$

もし $\alpha=df$ なら

$$
\gamma^*\alpha
=
d(f\circ\gamma)
$$

なので

$$
\int_{S^1}\alpha
=
f(\gamma(2\pi))-f(\gamma(0))
=
0
$$

となるはずです。実際には $2\pi$ なので矛盾です。

従って

$$
\boxed{
\alpha\text{ は閉だが完全ではない}
}.
$$
<!-- solution-end -->

### GEO9-A03 de Rham 複体の包含

滑らかな多様体 $M$ と $k\ge1$ に対して

$$
B^k(M)
=
d\Omega^{k-1}(M),
\qquad
Z^k(M)
=
\ker(d:\Omega^k(M)\to\Omega^{k+1}(M))
$$

とする。

1. $B^k(M)\subset Z^k(M)$ を示せ。
2. この包含があるために商空間 $Z^k(M)/B^k(M)$ を定義できることを説明せよ。
3. $M=\mathbb R^n$ のとき $k\ge1$ ではこの商空間が0であることを [微分形式の Poincaré の補題](#thm-geo9-poincare-lemma)から説明せよ。

- Level: A
- 狙い: de Rham コホモロジーの定義が $d^2=0$ に支えられていることを確認する

<!-- solution-start -->
**詳細解答**

$\omega\in B^k(M)$ を取ります。定義から、ある

$$
\eta\in\Omega^{k-1}(M)
$$

が存在して

$$
\omega=d\eta.
$$

[GEO7 の $d^2=0$](../GEO7/index.md#thm-geo7-d-square-zero)より

$$
d\omega
=
d(d\eta)
=
0.
$$

従って

$$
\omega\in Z^k(M).
$$

よって

$$
\boxed{
B^k(M)\subset Z^k(M)
}.
$$

両者は実ベクトル空間であり、$B^k(M)$ は $Z^k(M)$ の線形部分空間です。従って商ベクトル空間

$$
Z^k(M)/B^k(M)
$$

を定義できます。これが $H^k_{\mathrm{dR}}(M)$ です。

最後に $\mathbb R^n$ は原点について星型です。従って [微分形式の Poincaré の補題](#thm-geo9-poincare-lemma)から、$k\ge1$ の閉 $k$ 形式は全て完全です。

すなわち

$$
Z^k(\mathbb R^n)
=
B^k(\mathbb R^n).
$$

従って

$$
\boxed{
H^k_{\mathrm{dR}}(\mathbb R^n)=0
\qquad(k\ge1)
}.
$$
<!-- solution-end -->

### GEO9-A04 ホモトピー作用素を実際に計算する

$\mathbb R^2$ 上で

$$
H(t,x,y)=(tx,ty)
$$

とし、

$$
\omega=y\,dx+x\,dy
$$

を考える。

1. $d\omega=0$ を確認せよ。
2. 星型開集合でのホモトピー作用素の公式から $K_H\omega$ を求めよ。
3. $d(K_H\omega)=\omega$ を確認せよ。

- Level: A
- 狙い: [微分形式の Poincaré の補題](#thm-geo9-poincare-lemma)の証明を抽象記号だけで終わらせず $df=\omega$ を満たす関数の構成として実行する

<!-- solution-start -->
**詳細解答**

まず

$$
d(y\,dx)
=
dy\wedge dx
=
-dx\wedge dy,
$$

$$
d(x\,dy)
=
dx\wedge dy.
$$

従って

$$
d\omega=0.
$$

$k=1$ なので

$$
(K_H\omega)(x,y)
=
\int_0^1
\omega_{(tx,ty)}((x,y))
dt.
$$

点 $(tx,ty)$ では

$$
\omega_{(tx,ty)}
=
ty\,dx+tx\,dy.
$$

これにベクトル $(x,y)$ を入れると

$$
\omega_{(tx,ty)}((x,y))
=
ty\,x+tx\,y
=
2txy.
$$

よって

$$
K_H\omega
=
\int_0^1 2txy\,dt
=
xy.
$$

最後に

$$
d(K_H\omega)
=
d(xy)
=
y\,dx+x\,dy
=
\omega.
$$

従って

$$
\boxed{
K_H\omega=xy
}
$$

が実際に $d(K_H\omega)=\omega$ を満たす関数を与えています。
<!-- solution-end -->

### GEO9-B01 閉2形式から原始1形式を構成する

$\mathbb R^3$ 上の2形式

$$
\omega
=
x\,dy\wedge dz
+
y\,dz\wedge dx
-
2z\,dx\wedge dy
$$

を考える。

1. $d\omega=0$ を示せ。
2. 原点中心のホモトピー $H(t,x)=tx$ に対する作用素 $K_H$ を使い、$\omega=d\eta$ を満たす1形式 $\eta$ を求めよ。
3. 求めた $\eta$ を直接外微分して $d\eta=\omega$ を確認せよ。

- Level: B
- 狙い: [微分形式の Poincaré の補題](#thm-geo9-poincare-lemma)を2形式に対して構成的に使う

<!-- solution-start -->
**詳細解答**

各項を外微分します。

$$
d(x\,dy\wedge dz)
=
dx\wedge dy\wedge dz.
$$

次に

$$
d(y\,dz\wedge dx)
=
dy\wedge dz\wedge dx.
$$

$(dy,dz,dx)$ は $(dx,dy,dz)$ の循環置換なので符号は正であり、

$$
dy\wedge dz\wedge dx
=
dx\wedge dy\wedge dz.
$$

最後に

$$
d(-2z\,dx\wedge dy)
=
-2dz\wedge dx\wedge dy
=
-2dx\wedge dy\wedge dz.
$$

従って

$$
d\omega
=
(1+1-2)
dx\wedge dy\wedge dz
=
0.
$$

次に動径ベクトル

$$
R
=
x\partial_x+y\partial_y+z\partial_z
$$

を用います。

星型開集合で $k=2$ のとき

$$
(K_H\omega)_x(v)
=
\int_0^1
t\,
\omega_{tx}(x,v)
dt.
$$

今回 $\omega$ の係数は1次同次なので

$$
\omega_{tx}=t\,\omega_x
$$

です。従って

$$
K_H\omega
=
\left(
\int_0^1 t^2dt
\right)
\iota_R\omega
=
\frac13\iota_R\omega.
$$

内部積を計算します。

$$
\iota_R(x\,dy\wedge dz)
=
x(y\,dz-z\,dy),
$$

$$
\iota_R(y\,dz\wedge dx)
=
y(z\,dx-x\,dz),
$$

$$
\iota_R(-2z\,dx\wedge dy)
=
-2z(x\,dy-y\,dx).
$$

足し合わせると $dz$ 項は相殺し、

$$
\iota_R\omega
=
3yz\,dx-3xz\,dy.
$$

従って

$$
\boxed{
\eta
=
K_H\omega
=
yz\,dx-xz\,dy
}.
$$

直接確認します。

$$
d(yz\,dx)
=
(z\,dy+y\,dz)\wedge dx
=
-z\,dx\wedge dy
+
y\,dz\wedge dx.
$$

また

$$
d(-xz\,dy)
=
-(z\,dx+x\,dz)\wedge dy
=
-z\,dx\wedge dy
+
x\,dy\wedge dz.
$$

従って

$$
d\eta
=
x\,dy\wedge dz
+
y\,dz\wedge dx
-
2z\,dx\wedge dy
=
\omega.
$$
<!-- solution-end -->

### GEO9-B02 ホモトープな写像は同じコホモロジー写像を誘導する

$H:[0,1]\times M\to N$ を $f_0,f_1:M\to N$ の滑らかなホモトピーとする。

1. 閉 $k$ 形式 $\omega$ に対して
   $$
   f_1^*\omega-f_0^*\omega
   $$
   が完全形式であることを示せ。
2. $f_0^*=f_1^*$ が $H^k_{\mathrm{dR}}(N)\to H^k_{\mathrm{dR}}(M)$ 上で成り立つことを説明せよ。
3. $f:M\to N$、$g:N\to M$ が
   $$
   g\circ f\simeq\operatorname{id}_M,
   \qquad
   f\circ g\simeq\operatorname{id}_N
   $$
   を満たすとき、$f^*$ と $g^*$ が互いに逆の同型になることを示せ。

- Level: B
- 狙い: [ホモトピー公式](#thm-geo9-homotopy-formula)からホモトピー不変性とホモトピー同値不変性を自力で再構成する

<!-- solution-start -->
**詳細解答**

$\omega$ が閉なので

$$
d\omega=0.
$$

[ホモトピー公式](#thm-geo9-homotopy-formula)から

$$
f_1^*\omega-f_0^*\omega
=
d(K_H\omega)+K_H(d\omega).
$$

第二項は0なので

$$
f_1^*\omega-f_0^*\omega
=
d(K_H\omega).
$$

従って差は完全形式です。

よってコホモロジー類では

$$
[f_1^*\omega]
=
[f_0^*\omega].
$$

任意の $[\omega]$ に対して成り立つため

$$
\boxed{
f_1^*=f_0^*
}.
$$

次に $f:M\to N$、$g:N\to M$ が問題の仮定を満たすとします。

引き戻しは合成の順序を反転するので

$$
(g\circ f)^*
=
f^*\circ g^*,
$$

$$
(f\circ g)^*
=
g^*\circ f^*.
$$

ホモトピー不変性から

$$
(g\circ f)^*
=
(\operatorname{id}_M)^*
=
\operatorname{id}_{H^k_{\mathrm{dR}}(M)},
$$

$$
(f\circ g)^*
=
(\operatorname{id}_N)^*
=
\operatorname{id}_{H^k_{\mathrm{dR}}(N)}.
$$

従って

$$
f^*\circ g^*
=
\operatorname{id},
\qquad
g^*\circ f^*
=
\operatorname{id}.
$$

よって $f^*$ と $g^*$ は互いに逆の線形同型です。
<!-- solution-end -->

### GEO9-B03 (H^1_{mathrm{dR}}(S^1)) を積分で計算する

$S^1$ を反時計回りに向き付け、

$$
p(t)=(\cos t,\sin t)
$$

とする。$\omega$ を $S^1$ 上の1形式とする。

1. $p^*\omega=a(t)dt$ と書いたとき、$a$ が $2\pi$ 周期であることを説明せよ。
2. $\int_{S^1}\omega=0$ なら
   $$
   F(t)=\int_0^t a(s)ds
   $$
   が $2\pi$ 周期であることを示せ。
3. $F$ が $S^1$ 上の滑らかな関数 $f$ へ降り、$df=\omega$ を満たすことを示せ。
4. $\eta=x\,dy-y\,dx$ を用いて
   $$
   H^1_{\mathrm{dR}}(S^1)\cong\mathbb R
   $$
   を結論せよ。

- Level: B
- 狙い: 円周の1次コホモロジーを一般定理へ丸投げせず周期積分から $df=\omega$ を満たす関数を構成して証明する

<!-- solution-start -->
**詳細解答**

$p(t+2\pi)=p(t)$ なので

$$
p^*\omega
=
a(t)dt
$$

を $t+2\pi$ で評価しても同じ1形式になります。従って

$$
a(t+2\pi)=a(t).
$$

次に

$$
F(t)=\int_0^t a(s)ds
$$

と置きます。

周期性から

$$
F(t+2\pi)-F(t)
=
\int_t^{t+2\pi}a(s)ds
=
\int_0^{2\pi}a(s)ds.
$$

仮定より

$$
\int_0^{2\pi}a(s)ds
=
\int_{S^1}\omega
=
0.
$$

従って

$$
F(t+2\pi)=F(t).
$$

よって

$$
f(p(t)):=F(t)
$$

は代表 $t$ の選び方に依らず well-defined です。$p$ は局所微分同相なので、$f$ は滑らかです。

さらに

$$
p^*(df)
=
d(f\circ p)
=
dF
=
a(t)dt
=
p^*\omega.
$$

$p$ は全射な局所微分同相なので

$$
df=\omega.
$$

従って積分が0のコホモロジー類は0です。

一方

$$
\eta=x\,dy-y\,dx
$$

では

$$
p^*\eta=dt
$$

なので

$$
\int_{S^1}\eta=2\pi.
$$

任意の $c\in\mathbb R$ は

$$
\frac{c}{2\pi}\eta
$$

の積分として得られます。よって

$$
[\omega]
\mapsto
\int_{S^1}\omega
$$

は単射かつ全射であり、

$$
\boxed{
H^1_{\mathrm{dR}}(S^1)\cong\mathbb R
}.
$$
<!-- solution-end -->

### GEO9-C01 穴あき平面の全ての閉1形式を分類する

$$
X=\mathbb R^2\setminus\{0\},
\qquad
\alpha
=
\frac{-y\,dx+x\,dy}{x^2+y^2}
$$

とする。

$\omega$ を $X$ 上の任意の閉1形式とする。

1. 半径方向射影
   $$
   r:X\to S^1,
   \qquad
   r(x)=x/\|x\|
   $$
   と包含
   $$
   i:S^1\hookrightarrow X
   $$
   がホモトピー同値を与えることを示せ。
2. $i^*:H^1_{\mathrm{dR}}(X)\to H^1_{\mathrm{dR}}(S^1)$ が同型であることを示せ。
3.
   $$
   c
   :=
   \frac1{2\pi}
   \int_{S^1}i^*\omega
   $$
   と置くと
   $$
   \omega-c\alpha
   $$
   が完全形式であることを示せ。
4. 従って任意の閉1形式が一意な実数 $c$ とある滑らかな関数 $f$ により
   $$
   \omega=c\alpha+df
   $$
   と書けることを示せ。ここで $f$ の加法定数の自由度は許す。

- Level: C
- 狙い: 局所的な閉性と大域的な循環障害を de Rham コホモロジーで完全に分類する

<!-- solution-start -->
**詳細解答**

まず

$$
r\circ i
=
\operatorname{id}_{S^1}
$$

です。

一方

$$
H(t,x)
=
\left(
(1-t)+\frac{t}{\|x\|}
\right)x
$$

と置きます。

$x\ne0$ なので $\|x\|>0$ です。$0\le t\le1$ に対して係数

$$
(1-t)+\frac{t}{\|x\|}
$$

は正です。従って

$$
H(t,x)\ne0
$$

であり、$H$ は $X$ に値を取ります。

また

$$
H(0,x)=x,
$$

$$
H(1,x)=\frac{x}{\|x\|}
=
(i\circ r)(x).
$$

従って

$$
i\circ r
\simeq
\operatorname{id}_X.
$$

よって $i$ と $r$ は滑らかなホモトピー同値を与えます。

引き戻しの合成則から

$$
i^*r^*
=
(r\circ i)^*
=
\operatorname{id}
$$

です。

またホモトピー不変性から

$$
r^*i^*
=
(i\circ r)^*
=
\operatorname{id}
$$

がコホモロジー上で成り立ちます。

従って

$$
i^*:H^1_{\mathrm{dR}}(X)
\to
H^1_{\mathrm{dR}}(S^1)
$$

は同型で、逆写像は $r^*$ です。

次に

$$
c
=
\frac1{2\pi}
\int_{S^1}i^*\omega
$$

と置きます。

$S^1$ 上で

$$
i^*\alpha
=
x\,dy-y\,dx
$$

であり、その積分は $2\pi$ です。従って

$$
\int_{S^1}
i^*(\omega-c\alpha)
=
\int_{S^1}i^*\omega
-
c\int_{S^1}i^*\alpha
=
2\pi c-2\pi c
=
0.
$$

円周の計算から、積分0の1形式は完全です。従って

$$
[i^*(\omega-c\alpha)]
=
0
\in
H^1_{\mathrm{dR}}(S^1).
$$

$i^*$ は単射なので

$$
[\omega-c\alpha]
=
0
\in
H^1_{\mathrm{dR}}(X).
$$

従ってある滑らかな関数 $f:X\to\mathbb R$ が存在して

$$
\omega-c\alpha
=
df.
$$

よって

$$
\boxed{
\omega
=
c\alpha+df
}.
$$

最後に $c$ の一意性を確認します。もし

$$
\omega=c\alpha+df=c'\alpha+dg
$$

なら

$$
(c-c')\alpha
=
d(g-f).
$$

単位円上で積分すると

$$
(c-c')2\pi=0
$$

なので

$$
c=c'.
$$

$f$ は $df$ だけで決まるので、$X$ が連結であることから加法定数を除いて一意です。
<!-- solution-end -->

---

## 14. 次に進むための確認

本章を終えた時点で、次を自力で再現できれば十分です。

- 閉形式と完全形式を定義し、完全なら閉を $d^2=0$ から示せる。
- 星型開集合の動径ホモトピーから [微分形式の Poincaré の補題](#thm-geo9-poincare-lemma)を証明できる。
- de Rham 複体と $H^k_{\mathrm{dR}}(M)$ の定義を説明できる。
- [ホモトピー公式](#thm-geo9-homotopy-formula)
  $$
  H_1^*-H_0^*=dK_H+K_Hd
  $$
  を [Cartan の公式](../GEO7/index.md#thm-geo7-cartan-formula)から導ける。
- 滑らかなホモトピーが同じコホモロジー写像を誘導することを示せる。
- $H^0_{\mathrm{dR}}(M)$ が連結成分と対応することを説明できる。
- $H^1_{\mathrm{dR}}(S^1)\cong\mathbb R$ を周期積分から直接証明できる。
- 穴あき平面で角度1形式が生成元となり、循環が大域ポテンシャルの障害を測ることを説明できる。

次章 GEO10 からは、Euclid 空間内の曲線・超曲面へ移り、第一・第二基本形式と形作用素を構成します。
