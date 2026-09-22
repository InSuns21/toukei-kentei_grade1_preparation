# GEO18 幾何学 XVIII

<!-- definition-example-audit: strict -->

[GEO15](../GEO15/index.md) では Hopf--Rinow の定理により、完備性と最短測地線の存在を大域的に結びました。[GEO17](../GEO17/index.md) では Jacobi 場と指数形式を使い、曲率が共役点と測地線の最短性へ現れる仕組みを構成しました。

本章では、曲率を「計算する量」から「大域幾何を制約する量」へ進めます。

中心となる流れは

$$
\text{曲率の上下評価}
\longrightarrow
\text{Jacobi 場の比較}
\longrightarrow
\text{共役点・指数写像の制御}
\longrightarrow
\text{直径・コンパクト性・大域位相}
$$

です。

正曲率側では測地線が集まり、非正曲率側では測地線が広がります。その直感を、模型空間と Jacobi 方程式の比較によって定理へ変えます。

---

## 1. 比較の基準となる定曲率模型

<a id="def-geo18-model-space"></a>
<!-- formal-statement-start -->
> **定義（定曲率模型空間・比較関数）**  
> 実数 $\kappa$ に対し、断面曲率が恒等的に $\kappa$ である標準的な完備単連結 Riemann 多様体を **定曲率模型空間**と呼ぶ。
>
> 本章では、その法 Jacobi 場の長さを記述する関数
>
$$
s_\kappa(t)
=
\begin{cases}
\dfrac{\sin(\sqrt{\kappa}\,t)}{\sqrt{\kappa}},
& \kappa>0,
\\[1.2ex]
t,
& \kappa=0,
\\[1.2ex]
\dfrac{\sinh(\sqrt{-\kappa}\,t)}{\sqrt{-\kappa}},
& \kappa<0
\end{cases}
$$
>
> を **比較関数**と呼ぶ。
>
> これは
>
$$
\boxed{
s_\kappa''+\kappa s_\kappa=0,
\qquad
s_\kappa(0)=0,
\qquad
s_\kappa'(0)=1
}
$$
>
> を満たす。
<!-- formal-statement-end -->

<!-- definition-example-start: def-geo18-model-space -->
**定義の確認**

$\kappa=0$ なら

$$
s_0(t)=t
$$

で、Euclid 空間の Jacobi 方程式 $J''=0$ に対応します。

半径 $a$ の球面では

$$
\kappa=\frac1{a^2}
$$

なので

$$
s_\kappa(t)
=
a\sin\frac{t}{a}.
$$

これは [GEO17](../GEO17/index.md#prop-geo17-sphere-conjugate) で得た球面の法 Jacobi 場の係数そのものです。

曲率 $-1/a^2$ の双曲模型では

$$
s_\kappa(t)
=
a\sinh\frac{t}{a},
$$

となり、Euclid の $t$ より速く増加します。

三つの模型は

$$
\sin
\quad\longleftrightarrow\quad
t
\quad\longleftrightarrow\quad
\sinh
$$

という一つの比較関数で統一されます。
<!-- definition-example-end -->

定曲率模型で、単位速測地線 $\gamma$ に直交する平行単位ベクトル場 $E$ を取ると

$$
J(t)=s_\kappa(t)E(t)
$$

は Jacobi 場です。

実際、

$$
\frac{D^2J}{dt^2}
=
s_\kappa''E,
$$

定断面曲率より

$$
R(E,\dot\gamma)\dot\gamma
=
\kappa E,
$$

なので

$$
\frac{D^2J}{dt^2}
+
R(J,\dot\gamma)\dot\gamma
=
(s_\kappa''+\kappa s_\kappa)E
=
0.
$$

したがって比較幾何では、一般の Jacobi 場の長さを $s_\kappa$ と比べればよいことになります。

---

## 2. 法 Jacobi 場の長さが満たす微分不等式

Rauch の比較定理の核心は、ベクトル値 Jacobi 方程式を長さのスカラー不等式へ落とすことです。

<a id="lem-geo18-jacobi-length"></a>
<!-- formal-statement-start -->
> **補題（法 Jacobi 場の長さに対する微分不等式）**  
> $\gamma:[0,T]\to M$ を単位速測地線とし、$J$ を
>
$$
J(0)=0,
\qquad
\frac{DJ}{dt}(0)\perp\dot\gamma(0)
$$
>
> を満たす非零 Jacobi 場とする。
>
> $J(t)\ne0$ である区間で
>
$$
f(t)=|J(t)|
$$
>
> と置く。
>
> その区間で
>
$$
K\bigl(\operatorname{span}\{\dot\gamma,J\}\bigr)
\le
\kappa
$$
>
> なら
>
$$
\boxed{
f''+\kappa f\ge0
}
$$
>
> が成り立つ。
<!-- formal-statement-end -->

<!-- proof-start -->
### 証明

まず

$$
h(t)=g(J,\dot\gamma)
$$

と置きます。

$\gamma$ は測地線なので $D\dot\gamma/dt=0$ です。従って

$$
h'
=
g\left(
\frac{DJ}{dt},
\dot\gamma
\right).
$$

もう一度微分し、Jacobi 方程式を使うと

$$
h''
=
g\left(
\frac{D^2J}{dt^2},
\dot\gamma
\right)
=
-g(R(J,\dot\gamma)\dot\gamma,\dot\gamma).
$$

Riemann 曲率テンソルの反対称性から右辺は0です。したがって $h$ は一次関数です。

初期条件より

$$
h(0)=0,
\qquad
h'(0)=0,
$$

なので

$$
g(J,\dot\gamma)=0
$$

が全区間で成り立ちます。

次に

$$
f^2=g(J,J)
$$

を微分します。

$$
ff'
=
g\left(
J,\frac{DJ}{dt}
\right).
$$

さらに微分すると

$$
(f')^2+ff''
=
\left|
\frac{DJ}{dt}
\right|^2
+
g\left(
J,\frac{D^2J}{dt^2}
\right).
$$

Jacobi 方程式から

$$
\frac{D^2J}{dt^2}
=
-R(J,\dot\gamma)\dot\gamma
$$

なので

$$
ff''
=
\left|
\frac{DJ}{dt}
\right|^2
-
(f')^2
-
g(R(J,\dot\gamma)\dot\gamma,J).
$$

Cauchy--Schwarz の不等式より

$$
\left|
\frac{DJ}{dt}
\right|^2
-
(f')^2
=
\left|
\frac{DJ}{dt}
\right|^2
-
\frac{
g(J,DJ/dt)^2
}{|J|^2}
\ge0.
$$

また $J\perp\dot\gamma$、$|\dot\gamma|=1$ なので

$$
g(R(J,\dot\gamma)\dot\gamma,J)
=
K\bigl(\operatorname{span}\{\dot\gamma,J\}\bigr)f^2
\le
\kappa f^2.
$$

従って

$$
ff''
\ge
-\kappa f^2.
$$

$f>0$ で割れば

$$
f''+\kappa f\ge0.
$$

$\square$
<!-- proof-end -->

ここで曲率上界

$$
K\le\kappa
$$

が、Jacobi 場の長さに対する微分不等式へ直接入りました。

---

## 3. Rauch の比較定理：定曲率模型との比較

<a id="thm-geo18-rauch"></a>
<!-- formal-statement-start -->
> **定理（Rauch の比較定理：定曲率模型・上曲率版）**  
> $\gamma:[0,T]\to M$ を単位速測地線とし、$J$ を
>
$$
J(0)=0,
\qquad
\frac{DJ}{dt}(0)\perp\dot\gamma(0)
$$
>
> を満たす Jacobi 場とする。
>
> 初期微分の長さを
>
$$
\alpha
=
\left|
\frac{DJ}{dt}(0)
\right|
$$
>
> とする。
>
> $\alpha>0$ とし、$J(t)\ne0$ の点で
>
$$
K\bigl(\operatorname{span}\{\dot\gamma(t),J(t)\}\bigr)
\le
\kappa
$$
>
> が成り立つと仮定する。
>
> さらに
>
$$
s_\kappa(t)>0
\qquad
(0<t\le T)
$$
>
> とする。
>
> このとき
>
$$
\boxed{
|J(t)|
\ge
\alpha s_\kappa(t)
\qquad
0\le t\le T
}
$$
>
> が成り立つ。
>
> さらに
>
$$
\boxed{
\frac{|J(t)|}{s_\kappa(t)}
}
$$
>
> は $0<t\le T$ で単調非減少である。
<!-- formal-statement-end -->

<!-- proof-start -->
### 証明

まず $\alpha=1$ の場合を示します。一般の場合は $J/\alpha$ に適用すればよいです。

$$
f(t)=|J(t)|
$$

と置きます。

$t=0$ で $J(0)=0$、$|DJ/dt(0)|=1$ なので

$$
f(t)=t+o(t)
$$

です。

同様に

$$
s_\kappa(t)=t+o(t).
$$

したがって

$$
\lim_{t\downarrow0}
\frac{f(t)}{s_\kappa(t)}
=
1.
$$

まず $J$ に正の最初の零点 $\tau\le T$ があると仮定し、矛盾を導きます。

$0<t<\tau$ では $f>0$ なので、前補題から

$$
f''+\kappa f\ge0.
$$

一方

$$
s_\kappa''+\kappa s_\kappa=0.
$$

Wronskian 型の量

$$
W(t)
=
f'(t)s_\kappa(t)
-
f(t)s_\kappa'(t)
$$

を考えると

$$
\begin{aligned}
W'
&=
f''s_\kappa
-
fs_\kappa''
\\
&=
(f''+\kappa f)s_\kappa.
\end{aligned}
$$

仮定より $s_\kappa>0$ なので

$$
W'\ge0.
$$

$t\downarrow0$ で $W(t)\to0$ だから

$$
W(t)\ge0.
$$

従って

$$
\left(
\frac{f}{s_\kappa}
\right)'
=
\frac{W}{s_\kappa^2}
\ge0.
$$

よって

$$
\frac{f(t)}{s_\kappa(t)}
\ge1
$$

であり、

$$
f(t)\ge s_\kappa(t)>0.
$$

$t\uparrow\tau$ とすると

$$
f(\tau)
\ge
s_\kappa(\tau)>0,
$$

となり $J(\tau)=0$ に矛盾します。

したがって $J$ は $(0,T]$ で消えません。

以上の計算は全区間で使え、

$$
\frac{f}{s_\kappa}
$$

は単調非減少、

$$
f(t)\ge s_\kappa(t)
$$

です。

一般の $\alpha>0$ では $\widetilde J=J/\alpha$ に適用して

$$
|J(t)|
\ge
\alpha s_\kappa(t)
$$

を得ます。$\square$
<!-- proof-end -->

この版は「曲率が模型より小さいほど、同じ初期角速度で出た測地線が模型以上に離れる」と読めます。

一般の Rauch の比較定理は二つの多様体上の Jacobi 場を直接比較します。本章では、その機構が最も見える定曲率模型との比較を canonical な形として証明しました。

---

## 4. 共役点は曲率上界より早く現れない

<a id="cor-geo18-conjugate-radius"></a>
<!-- formal-statement-start -->
> **系（断面曲率上界による共役半径の評価）**  
> 単位速測地線 $\gamma:[0,T]\to M$ に沿う断面曲率が
>
$$
K\le\kappa
$$
>
> を満たすとする。
>
> $\kappa>0$ なら、
>
$$
0<t<\frac{\pi}{\sqrt{\kappa}}
$$
>
> に $\gamma(0)$ と共役な点は存在しない。
>
> $\kappa\le0$ なら、正の時刻に $\gamma(0)$ と共役な点は存在しない。
<!-- formal-statement-end -->

<!-- proof-start -->
### 証明

共役点が時刻 $t_0>0$ に存在すると仮定します。

すると

$$
J(0)=J(t_0)=0
$$

を満たす非零 Jacobi 場 $J$ が存在します。

$J(0)=0$ なら

$$
g(J,\dot\gamma)
$$

は一次関数です。さらに $J(t_0)=0$ なので両端で0となり、

$$
g(J,\dot\gamma)\equiv0.
$$

したがって $J$ は法 Jacobi 場です。

$\kappa>0$ のとき

$$
s_\kappa(t)
=
\frac{\sin(\sqrt{\kappa}t)}{\sqrt{\kappa}}
>0
$$

は

$$
0<t<\frac{\pi}{\sqrt{\kappa}}
$$

で成り立ちます。

Rauch の比較定理から、その区間では非零 Jacobi 場は再び0になれません。

$\kappa=0$ なら

$$
s_0(t)=t>0
$$

が全ての $t>0$ で成り立ちます。

$\kappa<0$ なら

$$
s_\kappa(t)
=
\frac{\sinh(\sqrt{-\kappa}t)}{\sqrt{-\kappa}}
>0
$$

が全ての $t>0$ で成り立ちます。

よって $\kappa\le0$ では正の時刻に共役点はありません。$\square$
<!-- proof-end -->

球面では

$$
K=\frac1{a^2}
$$

で最初の共役点は

$$
\pi a
=
\frac{\pi}{\sqrt K}
$$

ですから、この評価は鋭いです。

---

## 5. 非正曲率では指数写像が長さを縮めない

Rauch 比較を指数写像の微分へ翻訳します。

<a id="prop-geo18-exp-expansion"></a>
<!-- formal-statement-start -->
> **命題（非正曲率での指数写像の微分の拡大性）**  
> $p\in M$ とし、$p$ から出る全ての放射測地線に沿って断面曲率が
>
$$
K\le0
$$
>
> を満たすとする。
>
> 指数写像が定義される任意の $v\in T_pM$ と $w\in T_pM$ に対して
>
$$
\boxed{
\left|
(d\exp_p)_v(w)
\right|
\ge
|w|
}
$$
>
> が成り立つ。
>
> 特に
>
$$
(d\exp_p)_v
$$
>
> は全ての $v$ で単射である。
<!-- formal-statement-end -->

<!-- proof-start -->
### 証明

$v=0$ では

$$
(d\exp_p)_0=\operatorname{id}_{T_pM}
$$

なので明らかです。

$v\ne0$ とし、

$$
v=tu,
\qquad
t=|v|,
\qquad
|u|=1
$$

と書きます。

$w$ を

$$
w=au+w_\perp,
\qquad
w_\perp\perp u
$$

と分解します。

放射方向については

$$
\exp_p((t+s a)u)
=
\gamma(t+sa)
$$

なので

$$
(d\exp_p)_{tu}(au)
=
a\dot\gamma(t)
$$

であり、

$$
\left|
(d\exp_p)_{tu}(au)
\right|
=
|a|.
$$

次に角方向 $w_\perp$ を考えます。

GEO17 の指数写像と Jacobi 場の対応

$$
J_z(T)
=
(d\exp_p)_{Tu}(Tz)
$$

へ

$$
T=t,
\qquad
z=\frac{w_\perp}{t}
$$

を代入します。

すると

$$
J_z(t)
=
(d\exp_p)_{tu}(w_\perp)
$$

であり、その初期条件は

$$
J(0)=0,
\qquad
\left|
\frac{DJ}{dr}(0)
\right|
=
\frac{|w_\perp|}{t}.
$$

断面曲率は $K\le0$ なので、Rauch の比較定理を $\kappa=0$ に適用すると

$$
|J(t)|
\ge
t\frac{|w_\perp|}{t}
=
|w_\perp|.
$$

さらに [Gauss の補題](../GEO14/index.md#thm-geo14-gauss-lemma)から、指数写像の微分は放射方向と角方向を直交させます。

従って

$$
\begin{aligned}
\left|
(d\exp_p)_v(w)
\right|^2
&=
\left|
(d\exp_p)_v(au)
\right|^2
+
\left|
(d\exp_p)_v(w_\perp)
\right|^2
\\
&\ge
a^2+|w_\perp|^2
\\
&=
|w|^2.
\end{aligned}
$$

平方根を取れば

$$
\left|
(d\exp_p)_v(w)
\right|
\ge
|w|.
$$

$\square$
<!-- proof-end -->

非正曲率では指数写像は局所的に「縮めない」ので、局所逆写像は長さを増やしません。

これが Cartan--Hadamard の大域化で重要になります。

---

## 6. 正の Ricci 曲率は直径を押し縮める

Rauch 比較では断面曲率を使いました。

一方、Bonnet--Myers の定理では全ての法方向の曲率を足した

$$
\operatorname{Ric}(\dot\gamma,\dot\gamma)
$$

が現れます。

<a id="thm-geo18-bonnet-myers"></a>
<!-- formal-statement-start -->
> **定理（Bonnet--Myers の定理）**  
> $(M,g)$ を連結な $n$ 次元完備 Riemann 多様体とし、
>
$$
n\ge2
$$
>
> とする。さらに、ある定数
>
$$
\kappa>0
$$
>
> に対して
>
$$
\boxed{
\operatorname{Ric}
\ge
(n-1)\kappa g
}
$$
>
> が成り立つとする。
>
> このとき
>
$$
\boxed{
\operatorname{diam}(M)
\le
\frac{\pi}{\sqrt{\kappa}}
}
$$
>
> である。
>
> 特に $M$ はコンパクトである。
<!-- formal-statement-end -->

<!-- proof-start -->
### 証明

任意の二点 $p,q\in M$ を取ります。

完備性と Hopf--Rinow の定理から、$p$ と $q$ を結ぶ単位速最短測地線

$$
\gamma:[0,L]\to M
$$

が存在し、

$$
L=d(p,q)
$$

です。

$$
L>\frac{\pi}{\sqrt{\kappa}}
$$

と仮定して矛盾を導きます。

$\dot\gamma$ に直交する平行正規直交標構

$$
E_1,\dots,E_{n-1}
$$

を取ります。

各 $i$ について

$$
V_i(t)
=
\sin\frac{\pi t}{L}\,E_i(t)
$$

と置きます。

端点では

$$
V_i(0)=V_i(L)=0.
$$

平行性から

$$
\frac{DV_i}{dt}
=
\frac{\pi}{L}
\cos\frac{\pi t}{L}\,E_i.
$$

従って指数形式は

$$
I(V_i,V_i)
=
\int_0^L
\left[
\left(\frac{\pi}{L}\right)^2
\cos^2\frac{\pi t}{L}
-
K(\dot\gamma,E_i)
\sin^2\frac{\pi t}{L}
\right]dt.
$$

$i=1,\dots,n-1$ で足します。

$$
\sum_{i=1}^{n-1}
K(\dot\gamma,E_i)
=
\operatorname{Ric}(\dot\gamma,\dot\gamma).
$$

仮定より $|\dot\gamma|=1$ なので

$$
\operatorname{Ric}(\dot\gamma,\dot\gamma)
\ge
(n-1)\kappa.
$$

したがって

$$
\begin{aligned}
\sum_{i=1}^{n-1}I(V_i,V_i)
&\le
(n-1)
\int_0^L
\left[
\left(\frac{\pi}{L}\right)^2
\cos^2\frac{\pi t}{L}
-
\kappa
\sin^2\frac{\pi t}{L}
\right]dt
\\
&=
\frac{(n-1)L}{2}
\left[
\left(\frac{\pi}{L}\right)^2
-
\kappa
\right].
\end{aligned}
$$

仮定

$$
L>\frac{\pi}{\sqrt{\kappa}}
$$

から

$$
\left(\frac{\pi}{L}\right)^2-\kappa<0.
$$

従って

$$
\sum_{i=1}^{n-1}I(V_i,V_i)<0.
$$

よって少なくとも一つの $i$ について

$$
I(V_i,V_i)<0.
$$

しかし $\gamma$ は最短測地線です。

固定端点変分 $F(s,t)$ を取り、各変分曲線を同じ区間 $[0,L]$ でパラメータ付けします。

Cauchy--Schwarz の不等式から

$$
E(F(s,\cdot))
\ge
\frac{L(F(s,\cdot))^2}{2L}.
$$

端点が $p,q$ なので

$$
L(F(s,\cdot))
\ge
d(p,q)=L.
$$

したがって

$$
E(F(s,\cdot))
\ge
\frac L2
=
E(\gamma).
$$

よって $s=0$ はエネルギーの局所最小点であり、

$$
E''(0)\ge0.
$$

GEO17 の第二変分公式より

$$
I(V,V)\ge0
$$

が全ての端点0の変分ベクトル場 $V$ に対して必要です。

これは $I(V_i,V_i)<0$ に矛盾します。

従って

$$
L\le
\frac{\pi}{\sqrt{\kappa}}.
$$

$p,q$ は任意なので

$$
\operatorname{diam}(M)
\le
\frac{\pi}{\sqrt{\kappa}}.
$$

最後に一点 $p\in M$ を固定すると

$$
M
=
\overline B
\left(
p,\frac{\pi}{\sqrt{\kappa}}
\right).
$$

完備 Riemann 多様体では Hopf--Rinow により閉有界集合はコンパクトです。

従って $M$ はコンパクトです。$\square$
<!-- proof-end -->

ここで重要なのは、Bonnet--Myers が **断面曲率の各方向の下界**を要求せず、

$$
\operatorname{Ric}
$$

という法方向の平均的な曲率下界で直径を制御していることです。

---

## 7. 球面で Bonnet--Myers の評価を確認する

半径 $a$ の標準球面 $S^n_a$ では

$$
K=\frac1{a^2}.
$$

GEO16 より

$$
\operatorname{Ric}
=
\frac{n-1}{a^2}g.
$$

したがって Bonnet--Myers で

$$
\kappa=\frac1{a^2}
$$

と置けます。

すると

$$
\operatorname{diam}(S^n_a)
\le
\pi a.
$$

実際、対蹠点間距離は

$$
\pi a
$$

なので

$$
\boxed{
\operatorname{diam}(S^n_a)=\pi a
}
$$

であり、評価は等号を達成します。

Rauch の共役点評価でも

$$
\frac{\pi}{\sqrt\kappa}
=
\pi a
$$

が現れました。

球面では「最初の共役点」と「直径の上限」が同じ尺度にそろっています。

---

## 8. Cartan--Hadamard のための位相条件

<a id="def-geo18-simply-connected"></a>
<!-- formal-statement-start -->
> **定義（単連結）**  
> 位相空間 $X$ が **単連結**であるとは、
>
> 1. $X$ が弧状連結であり、
> 2. 任意の閉曲線
>
$$
\alpha:[0,1]\to X,
\qquad
\alpha(0)=\alpha(1)=p
$$
>
> が、端点 $p$ を保ったまま定値曲線へホモトピーで縮められる
>
> ことをいう。
<!-- formal-statement-end -->

<!-- definition-example-start: def-geo18-simply-connected -->
**定義の確認**

Euclid 空間 $\mathbb R^n$ は単連結です。

$p\in\mathbb R^n$ を基点とする閉曲線 $\alpha$ に対し

$$
H(s,t)
=
(1-s)\alpha(t)+sp
$$

と置きます。

$s=0$ では

$$
H(0,t)=\alpha(t),
$$

$s=1$ では

$$
H(1,t)=p.
$$

また

$$
H(s,0)=H(s,1)=p
$$

なので端点は固定されています。

従って全ての閉曲線を定値曲線へ縮められます。
<!-- definition-example-end -->

非正曲率だけでは、多様体自身が Euclid 空間と同じ位相になるとは限りません。

例えば格子 $\Lambda\subset\mathbb R^n$ による平坦トーラス

$$
\mathbb T^n
=
\mathbb R^n/\Lambda
$$

は完備で断面曲率0ですが、単連結ではありません。

原点の像を $p=[0]$ とすると指数写像は

$$
\exp_p(v)=[v].
$$

したがって任意の非零 $\lambda\in\Lambda$ に対して

$$
\exp_p(v+\lambda)
=
\exp_p(v)
$$

となり、指数写像は単射ではありません。

ここで失われた仮定は単連結性です。後の Cartan--Hadamard の証明は「指数写像が被覆写像である」ところまではそのまま進みますが、**被覆が一枚だけである**という最後の結論だけが壊れます。

つまり平坦トーラスは、単連結性が何のために必要かをそのまま見せる反例です。

---

## 9. 拡大する局所微分同相は被覆になる

次の補題は Cartan--Hadamard の大域化に必要な位相・距離の橋です。

<a id="lem-geo18-covering"></a>
<!-- formal-statement-start -->
> **補題（拡大局所微分同相の被覆補題）**  
> $(N,h)$ を完備 Riemann 多様体、$(M,g)$ を連結 Riemann 多様体とする。
>
> 滑らかな全射
>
$$
F:N\to M
$$
>
> が局所微分同相で、全ての $x\in N$ と $\xi\in T_xN$ に対し
>
$$
\boxed{
|dF_x(\xi)|_g
\ge
|\xi|_h
}
$$
>
> を満たすとする。
>
> このとき $F$ は被覆写像である。
<!-- formal-statement-end -->

<!-- proof-start -->
### 証明

局所微分同相なので、各 $x\in N$ の近くでは逆写像が存在します。

逆写像を $\Phi$ とすると

$$
d\Phi
=
(dF)^{-1}.
$$

仮定

$$
|dF(\xi)|\ge|\xi|
$$

から

$$
|d\Phi(\eta)|
\le
|\eta|.
$$

したがって局所逆写像は曲線長を増やしません。

任意の $y\in M$ を固定します。

十分小さい正規球

$$
U=B(y,r)
$$

を取り、任意の $z\in U$ が $y$ からの一意な放射測地線で結ばれるようにします。

$x\in F^{-1}(y)$ を一つ取ります。

$y$ から $z$ への放射測地線を局所逆写像で $x$ から持ち上げます。

局所逆写像は長さを増やさないので、持ち上げ曲線の任意の初期部分の長さは高々 $r$ です。

したがって持ち上げが有限時刻で局所逆写像の定義域から逃げそうになっても、その点列は $N$ で Cauchy 列になります。

$N$ は完備なので極限点を持ちます。

その極限点でも $F$ は局所微分同相ですから、局所逆写像をさらに延長できます。

従って放射測地線は $z$ まで全て持ち上がります。

これにより $x$ を通る逆写像の枝

$$
\Phi_x:U\to N
$$

が構成できます。

異なる $x_1,x_2\in F^{-1}(y)$ に対応する枝の像が交わったとします。

交点から $y$ へ向かう放射測地線を逆向きに持ち上げると、局所逆写像の一意性により二つの枝は同じ持ち上げになります。

すると $y$ 上の始点も一致して

$$
x_1=x_2
$$

です。

したがって異なる枝の像は互いに素です。

また任意の $z'\in F^{-1}(U)$ から $F(z')$ と $y$ を結ぶ放射測地線を逆向きに持ち上げれば、その終点はある $x\in F^{-1}(y)$ となり、$z'$ は $\Phi_x(U)$ に属します。

従って

$$
F^{-1}(U)
=
\bigsqcup_{x\in F^{-1}(y)}
\Phi_x(U)
$$

であり、各 $\Phi_x(U)$ 上で $F$ は $U$ への微分同相です。

よって $F$ は被覆写像です。$\square$
<!-- proof-end -->

この補題では、**完備性が局所逆写像を途中で失速させない**ために使われています。

---

## 10. Cartan--Hadamard の定理

<a id="thm-geo18-cartan-hadamard"></a>
<!-- formal-statement-start -->
> **定理（Cartan--Hadamard の定理）**  
> $(M,g)$ を連結な完備 Riemann 多様体とし、
>
$$
K\le0
$$
>
> と仮定する。
>
> 任意の $p\in M$ に対して指数写像
>
$$
\exp_p:T_pM\to M
$$
>
> は被覆写像である。
>
> 特に $M$ が単連結なら
>
$$
\boxed{
\exp_p:T_pM\longrightarrow M
}
$$
>
> は大域微分同相である。
>
> 従って $n=\dim M$ とすると
>
$$
\boxed{
M\cong\mathbb R^n
}
$$
>
> である。
<!-- formal-statement-end -->

<!-- proof-start -->
### 証明

完備性と Hopf--Rinow の定理から、任意の初期速度 $v\in T_pM$ に対する測地線は時刻1まで定義されます。

従って

$$
\exp_p
$$

は $T_pM$ 全体で定義されます。

また任意の $q\in M$ に対し、Hopf--Rinow により $p$ と $q$ を結ぶ最短測地線が存在します。

その初速度を適切に取れば

$$
q=\exp_p(v)
$$

となるので $\exp_p$ は全射です。

前節の命題から

$$
|(d\exp_p)_v(w)|
\ge
|w|
$$

が全ての $v,w$ で成り立ちます。

特に $(d\exp_p)_v$ は単射です。

定義域・値域の次元は同じなので

$$
(d\exp_p)_v
$$

は線形同型です。

逆関数定理により $\exp_p$ は局所微分同相です。

$T_pM$ は Euclid 内積を入れれば完備です。

従って前節の被覆補題から

$$
\exp_p:T_pM\to M
$$

は被覆写像です。

ここから $M$ が単連結であると仮定します。

被覆写像について、同じ始点を持つ二つの持ち上げは局所的な一意性から一致します。

また、基点を固定した二つの曲線がホモトピーなら、そのホモトピーの正方形を十分細かく分割し、各小長方形の像が一つの evenly covered な近傍へ入るようにできます。各小長方形で局所逆写像を順に選ぶことで、ホモトピー全体を一意に持ち上げられます。

したがって、基点を固定してホモトピックな二つの曲線の持ち上げは、同じ始点から出れば終点も同じです。

いま

$$
v_0,v_1\in T_pM
$$

が

$$
\exp_p(v_0)=\exp_p(v_1)=q
$$

を満たすとします。

$T_pM$ は弧状連結なので $v_0$ と $v_1$ を結ぶ曲線 $\widetilde\alpha$ を取れます。

その像

$$
\alpha=\exp_p\circ\widetilde\alpha
$$

は $q$ を基点とする閉曲線です。

$M$ は単連結なので $\alpha$ は定値曲線へ基点を固定してホモトピーです。

$\widetilde\alpha$ は $\alpha$ の $v_0$ から始まる持ち上げです。

一方、定値曲線の $v_0$ から始まる持ち上げは定値曲線です。

ホモトピー持ち上げの終点一致から

$$
v_1=v_0.
$$

したがって $\exp_p$ は単射です。

全射かつ局所微分同相で単射なので、$\exp_p$ は大域微分同相です。

最後に

$$
T_pM\cong\mathbb R^n
$$

だから

$$
M\cong\mathbb R^n.
$$

$\square$
<!-- proof-end -->

Cartan--Hadamard は、局所条件

$$
K\le0
$$

から、完備性と単連結性を介して大域的な位相まで決めます。

---

## 11. 三つの比較結果を混同しない

ここまでの定理は似た言葉を使いますが、仮定と結論は違います。

| 結果 | 主な曲率仮定 | 追加仮定 | 主な結論 |
|---|---|---|---|
| Rauch 比較 | 断面曲率の上界 | Jacobi 場の初期条件 | 測地線の広がり・共役点時刻 |
| Bonnet--Myers | 正の Ricci 曲率下界 | 完備 | 直径上限・コンパクト性 |
| Cartan--Hadamard | 非正断面曲率 | 完備、単連結なら強化 | 指数写像が被覆、単連結なら $\mathbb R^n$ と微分同相 |

特に

$$
K\le0
$$

と

$$
\operatorname{Ric}\ge(n-1)\kappa g
$$

は向きが逆です。

「曲率が大きいほど良い」「小さいほど良い」という一つの順位ではなく、何を比較したいかで必要な符号が変わります。

---

## 12. 演習

### Level A

<a id="ex-geo18-a01"></a>
#### GEO18-A01 比較関数を直接確認する
- Level: A

次の三つについて

$$
s_\kappa''+\kappa s_\kappa=0,
\qquad
s_\kappa(0)=0,
\qquad
s_\kappa'(0)=1
$$

を確認せよ。

1.
   $$
   \kappa=\frac1{a^2},
   \qquad
   s_\kappa(t)=a\sin\frac ta.
   $$
2.
   $$
   \kappa=0,
   \qquad
   s_0(t)=t.
   $$
3.
   $$
   \kappa=-\frac1{a^2},
   \qquad
   s_\kappa(t)=a\sinh\frac ta.
   $$

<!-- solution-start -->
**解答**

1. 微分すると

   $$
   s_\kappa'(t)
   =
   \cos\frac ta,
   $$

   $$
   s_\kappa''(t)
   =
   -\frac1a\sin\frac ta
   =
   -\frac1{a^2}s_\kappa(t).
   $$

   よって

   $$
   s_\kappa''+\frac1{a^2}s_\kappa=0.
   $$

   また

   $$
   s_\kappa(0)=0,
   \qquad
   s_\kappa'(0)=1.
   $$

2. $s_0(t)=t$ なので

   $$
   s_0''=0
   $$

   かつ

   $$
   s_0(0)=0,
   \qquad
   s_0'(0)=1.
   $$

3. 微分すると

   $$
   s_\kappa'(t)
   =
   \cosh\frac ta,
   $$

   $$
   s_\kappa''(t)
   =
   \frac1a\sinh\frac ta
   =
   \frac1{a^2}s_\kappa(t).
   $$

   $\kappa=-1/a^2$ だから

   $$
   s_\kappa''+\kappa s_\kappa
   =
   \frac1{a^2}s_\kappa
   -
   \frac1{a^2}s_\kappa
   =
   0.
   $$

   初期条件も

   $$
   s_\kappa(0)=0,
   \qquad
   s_\kappa'(0)=1
   $$

   です。
<!-- solution-end -->

<a id="ex-geo18-a02"></a>
#### GEO18-A02 非正曲率で Jacobi 場が Euclid 以上に広がる
- Level: A

単位速測地線 $\gamma$ に沿って $K\le0$ とする。

$$
J(0)=0,
\qquad
\left|
\frac{DJ}{dt}(0)
\right|=c
$$

を満たす法 Jacobi 場 $J$ について

$$
|J(t)|\ge ct
$$

を示せ。

<!-- solution-start -->
**解答**

Rauch の比較定理で

$$
\kappa=0
$$

を選びます。

比較関数は

$$
s_0(t)=t.
$$

したがって

$$
|J(t)|
\ge
c\,s_0(t)
=
ct.
$$

特に $c>0$ なら $t>0$ で右辺は正なので、$J$ は再び0になれません。
<!-- solution-end -->

<a id="ex-geo18-a03"></a>
#### GEO18-A03 正の曲率上界と最初の共役点
- Level: A

単位速測地線に沿って

$$
K\le\frac4{a^2}
$$

とする。

基点と共役な点が現れ得る最初の時刻について、Rauch 比較から下限を求めよ。

<!-- solution-start -->
**解答**

$$
\kappa=\frac4{a^2}
$$

なので

$$
\sqrt\kappa=\frac2a.
$$

比較関数

$$
s_\kappa(t)
=
\frac{\sin(2t/a)}{2/a}
=
\frac a2\sin\frac{2t}{a}
$$

の最初の正の零点は

$$
\frac{2t}{a}=\pi
$$

より

$$
t=\frac{\pi a}{2}.
$$

Rauch の比較定理から、それより前では非零 Jacobi 場は0へ戻れません。

従って共役点は

$$
\boxed{
t\ge\frac{\pi a}{2}
}
$$

でなければ現れません。
<!-- solution-end -->

<a id="ex-geo18-a04"></a>
#### GEO18-A04 Bonnet--Myers の試験場
- Level: A

長さ $L$ の単位速測地線 $\gamma$ に沿う平行単位法ベクトル場 $E$ を取り、

$$
V(t)
=
\sin\frac{\pi t}{L}E(t)
$$

とする。

1. $V(0)=V(L)=0$ を示せ。
2.
   $$
   \left|
   \frac{DV}{dt}
   \right|^2
   =
   \left(\frac{\pi}{L}\right)^2
   \cos^2\frac{\pi t}{L}
   $$
   を示せ。
3. $K(\dot\gamma,E)\ge\kappa$ なら
   $$
   I(V,V)
   \le
   \frac L2
   \left[
   \left(\frac{\pi}{L}\right)^2-\kappa
   \right]
   $$
   を示せ。

<!-- solution-start -->
**解答**

1. $\sin0=0$、$\sin\pi=0$ なので

   $$
   V(0)=0,
   \qquad
   V(L)=0.
   $$

2. $E$ は平行なので $DE/dt=0$ です。

   従って

   $$
   \frac{DV}{dt}
   =
   \frac{\pi}{L}
   \cos\frac{\pi t}{L}E.
   $$

   $|E|=1$ より

   $$
   \left|
   \frac{DV}{dt}
   \right|^2
   =
   \left(\frac{\pi}{L}\right)^2
   \cos^2\frac{\pi t}{L}.
   $$

3. 指数形式は

   $$
   I(V,V)
   =
   \int_0^L
   \left[
   \left(\frac{\pi}{L}\right)^2
   \cos^2\frac{\pi t}{L}
   -
   K(\dot\gamma,E)
   \sin^2\frac{\pi t}{L}
   \right]dt.
   $$

   $K(\dot\gamma,E)\ge\kappa$ なので

   $$
   I(V,V)
   \le
   \int_0^L
   \left[
   \left(\frac{\pi}{L}\right)^2
   \cos^2\frac{\pi t}{L}
   -
   \kappa
   \sin^2\frac{\pi t}{L}
   \right]dt.
   $$

   ここで

   $$
   \int_0^L
   \sin^2\frac{\pi t}{L}\,dt
   =
   \int_0^L
   \cos^2\frac{\pi t}{L}\,dt
   =
   \frac L2.
   $$

   よって

   $$
   I(V,V)
   \le
   \boxed{
   \frac L2
   \left[
   \left(\frac{\pi}{L}\right)^2-\kappa
   \right]
   }.
   $$
<!-- solution-end -->

### Level B

<a id="ex-geo18-b01"></a>
#### GEO18-B01 指数写像の微分が縮めないことを再構成する
- Level: B

完備 Riemann 多様体で $K\le0$ とする。

$p\in M$、$v=tu\in T_pM$、$|u|=1$ とし、

$$
w=au+w_\perp,
\qquad
w_\perp\perp u
$$

と分解する。

1. 放射方向について
   $$
   |(d\exp_p)_v(au)|=|a|
   $$
   を示せ。
2. Rauch 比較を使って
   $$
   |(d\exp_p)_v(w_\perp)|
   \ge
   |w_\perp|
   $$
   を示せ。
3. Gauss の補題から
   $$
   |(d\exp_p)_v(w)|
   \ge
   |w|
   $$
   を示せ。

<!-- solution-start -->
**解答**

1. $\gamma(r)=\exp_p(ru)$ と置くと

   $$
   \exp_p((t+sa)u)
   =
   \gamma(t+sa).
   $$

   $s=0$ で微分して

   $$
   (d\exp_p)_{tu}(au)
   =
   a\dot\gamma(t).
   $$

   $\gamma$ は単位速なので

   $$
   |(d\exp_p)_v(au)|=|a|.
   $$

2. $w_\perp$ に対応する Jacobi 場 $J$ を取ると

   $$
   J(0)=0,
   \qquad
   \left|
   \frac{DJ}{dr}(0)
   \right|
   =
   \frac{|w_\perp|}{t},
   $$

   $$
   J(t)
   =
   (d\exp_p)_{tu}(w_\perp).
   $$

   $K\le0$ なので Rauch 比較より

   $$
   |J(t)|
   \ge
   t\frac{|w_\perp|}{t}
   =
   |w_\perp|.
   $$

3. Gauss の補題により、放射方向の像と角方向の像は直交します。

   従って

   $$
   \begin{aligned}
   |(d\exp_p)_v(w)|^2
   &=
   |(d\exp_p)_v(au)|^2
   +
   |(d\exp_p)_v(w_\perp)|^2
   \\
   &\ge
   a^2+|w_\perp|^2
   \\
   &=
   |w|^2.
   \end{aligned}
   $$

   よって

   $$
   \boxed{
   |(d\exp_p)_v(w)|
   \ge
   |w|
   }.
   $$
<!-- solution-end -->

<a id="ex-geo18-b02"></a>
#### GEO18-B02 Bonnet--Myers を球面で校正する
- Level: B

半径 $a$ の標準球面 $S^n_a$ について、GEO16 の定曲率公式を用いて次を示せ。

1.
   $$
   \operatorname{Ric}
   =
   \frac{n-1}{a^2}g.
   $$
2. Bonnet--Myers から
   $$
   \operatorname{diam}(S^n_a)\le\pi a
   $$
   を得よ。
3. 対蹠点を用いて等号が成り立つことを示せ。
4. GEO17 の最初の共役点の時刻と比較せよ。

<!-- solution-start -->
**解答**

1. 定断面曲率 $c$ の $n$ 次元空間では

   $$
   \operatorname{Ric}
   =
   (n-1)c\,g.
   $$

   球面では

   $$
   c=\frac1{a^2}
   $$

   なので

   $$
   \boxed{
   \operatorname{Ric}
   =
   \frac{n-1}{a^2}g
   }.
   $$

2. Bonnet--Myers で

   $$
   \kappa=\frac1{a^2}
   $$

   と置くと

   $$
   \operatorname{diam}(S^n_a)
   \le
   \frac{\pi}{\sqrt{1/a^2}}
   =
   \pi a.
   $$

3. 北極と南極の距離は大円半周の長さ

   $$
   \pi a
   $$

   です。

   よって

   $$
   \operatorname{diam}(S^n_a)
   \ge
   \pi a.
   $$

   2と合わせて

   $$
   \boxed{
   \operatorname{diam}(S^n_a)=\pi a
   }.
   $$

4. GEO17 では北極から出る法 Jacobi 場

   $$
   J(t)
   =
   a\sin\frac ta\,E(t)
   $$

   の最初の正の零点が

   $$
   t=\pi a
   $$

   でした。

   したがって球面では

   $$
   \text{最初の共役点までの距離}
   =
   \text{直径}
   =
   \pi a.
   $$
<!-- solution-end -->

<a id="ex-geo18-b03"></a>
#### GEO18-B03 Cartan--Hadamard の三段階
- Level: B

$(M,g)$ を連結完備、$K\le0$ とし、$p\in M$ を固定する。

次の三段階が Cartan--Hadamard の証明を構成することを説明せよ。

1. $\exp_p$ は全域で定義され全射である。
2. $\exp_p$ は局所微分同相で、局所逆写像は長さを増やさない。
3. $M$ が単連結なら $\exp_p$ は一対一である。

<!-- solution-start -->
**解答**

1. 完備性から Hopf--Rinow により全ての測地線は全時刻へ延長できるので

   $$
   \exp_p:T_pM\to M
   $$

   は全域で定義されます。

   また任意の $q\in M$ に対して $p$ と $q$ を結ぶ最短測地線が存在するため、その初速度 $v$ を用いて

   $$
   q=\exp_p(v)
   $$

   と書けます。

   よって全射です。

2. $K\le0$ なら Rauch 比較と Gauss の補題から

   $$
   |(d\exp_p)_v(w)|
   \ge
   |w|.
   $$

   従って微分は単射で、同次元なので同型です。

   逆関数定理から局所微分同相です。

   局所逆写像 $\Phi$ については

   $$
   |d\Phi(\eta)|
   \le
   |\eta|
   $$

   なので長さを増やしません。

   接空間 $T_pM$ は完備だから、この局所逆写像は短い正規球上の放射曲線に沿って途中で逃げずに延長でき、$\exp_p$ は被覆写像になります。

3. $M$ が単連結なら全ての閉曲線は定値曲線へ縮められます。

   同じ点 $q$ に二つの前像 $v_0,v_1$ があるとすると、接空間内で $v_0$ と $v_1$ を結ぶ曲線の像は $q$ を基点とする閉曲線になります。

   その閉曲線を定値曲線へ縮め、被覆のホモトピー持ち上げの一意性を使うと、持ち上げの終点は始点と一致しなければなりません。

   従って

   $$
   v_0=v_1.
   $$

   よって $\exp_p$ は一対一です。

   全射な局所微分同相でもあるため大域微分同相です。
<!-- solution-end -->

### Level C

<a id="ex-geo18-c01"></a>
#### GEO18-C01 回転対称計量で比較幾何を一式つなぐ
- Level: C

二次元 Riemann 計量

$$
g
=
dr^2+f(r)^2d\theta^2,
\qquad
r>0,
$$

を考える。

原点で滑らかにつながる条件として

$$
f(0)=0,
\qquad
f'(0)=1
$$

を仮定する。

GEO16 で得た公式

$$
K(r)
=
-\frac{f''(r)}{f(r)}
$$

を使う。

1. $K\le0$ なら
   $$
   f''\ge0
   $$
   を示せ。
2. 1から
   $$
   f'(r)\ge1,
   \qquad
   f(r)\ge r
   $$
   を示せ。
3. 円 $r=R$ の長さが
   $$
   L(R)=2\pi f(R)
   $$
   であることを示し、
   $$
   L(R)\ge2\pi R
   $$
   を導け。
4. 動径測地線に沿う角方向 Jacobi 場の長さが $f(r)$ に比例することを説明し、$f(r)\ge r$ を Rauch 比較の $\kappa=0$ 版として読み直せ。
5. さらにこの計量が完備かつ単連結であると仮定する。Cartan--Hadamard から大域位相について何が言えるか。

<!-- solution-start -->
**解答**

1. $r>0$ では $f(r)>0$ です。

   $K\le0$ と

   $$
   K=-\frac{f''}{f}
   $$

   から

   $$
   -\frac{f''}{f}\le0.
   $$

   $f>0$ を掛けると

   $$
   -f''\le0,
   $$

   したがって

   $$
   \boxed{
   f''\ge0
   }.
   $$

2. $f''\ge0$ なので $f'$ は単調非減少です。

   初期条件 $f'(0)=1$ から

   $$
   f'(r)\ge1.
   $$

   これを0から $r$ まで積分すると

   $$
   f(r)-f(0)
   =
   \int_0^r f'(s)\,ds
   \ge
   \int_0^r1\,ds
   =
   r.
   $$

   $f(0)=0$ より

   $$
   \boxed{
   f(r)\ge r
   }.
   $$

3. $r=R$ 上では $dr=0$ なので線素は

   $$
   ds^2
   =
   f(R)^2d\theta^2.
   $$

   よって

   $$
   ds=f(R)\,d\theta
   $$

   であり、

   $$
   L(R)
   =
   \int_0^{2\pi}
   f(R)\,d\theta
   =
   2\pi f(R).
   $$

   2より $f(R)\ge R$ なので

   $$
   \boxed{
   L(R)\ge2\pi R
   }.
   $$

   非正曲率では、同じ半径の測地円が Euclid 平面以上に広がることが見えます。

4. 動径測地線 $\gamma(r)$ を固定し、初期角度を少し変える測地線変分を考えると、その変分ベクトル場は角方向です。

   座標ベクトル $\partial_\theta$ の長さは

   $$
   |\partial_\theta|
   =
   f(r).
   $$

   従って角方向 Jacobi 場の長さは、初期角速度の定数倍を除けば $f(r)$ です。

   Euclid 平面では対応する比較関数は

   $$
   s_0(r)=r.
   $$

   したがって

   $$
   f(r)\ge r
   $$

   はまさに

   $$
   |J(r)|
   \ge
   |J'(0)|\,s_0(r)
   $$

   という Rauch 比較の具体形です。

5. 完備・単連結で $K\le0$ なので Cartan--Hadamard の定理を適用できます。

   任意の点 $p$ からの指数写像

   $$
   \exp_p:T_pM\to M
   $$

   は大域微分同相です。

   二次元なので

   $$
   T_pM\cong\mathbb R^2.
   $$

   従って

   $$
   \boxed{
   M\cong\mathbb R^2
   }
   $$

   です。

   局所的な不等式 $K\le0$ が、Jacobi 場の広がりを経て大域位相まで到達しています。
<!-- solution-end -->

---

## 13. 章末チェック

この章を終えた時点で、次を自力で再構成できることを確認してください。

1. 比較関数
   $$
   s_\kappa(t)
   $$
   の三つの形と、それらが一つの初期値問題
   $$
   s_\kappa''+\kappa s_\kappa=0
   $$
   を解くこと。
2. 法 Jacobi 場の長さ $f=|J|$ に対して
   $$
   ff''
   =
   |DJ/dt|^2-(f')^2-g(R(J,\dot\gamma)\dot\gamma,J)
   $$
   が成り立つこと。
3. 曲率上界 $K\le\kappa$ が
   $$
   f''+\kappa f\ge0
   $$
   を与える箇所。
4. Wronskian 型の量
   $$
   f's_\kappa-fs_\kappa'
   $$
   から $f/s_\kappa$ の単調性を導くこと。
5. $K\le0$ なら Jacobi 場が Euclid 模型以上に広がり、共役点がないこと。
6. $K\le0$ と Gauss の補題から
   $$
   |d\exp_p(w)|\ge|w|
   $$
   を導くこと。
7. Bonnet--Myers の証明で
   $$
   V_i(t)=\sin(\pi t/L)E_i(t)
   $$
   を選ぶ理由。
8. 法方向の断面曲率の和が Ricci 曲率になるため、Bonnet--Myers では Ricci 下界で十分なこと。
9. 直径上限と Hopf--Rinow からコンパクト性が出ること。
10. Cartan--Hadamard で完備性が指数写像の全域定義・全射性・局所逆写像の延長に使われること。
11. 単連結性が被覆の多重シートを一枚にする箇所。
12. Rauch、Bonnet--Myers、Cartan--Hadamard の曲率仮定と結論を混同しないこと。

---

## 14. 次に進む

本章では、曲率の符号と上下評価から

$$
\text{Jacobi 場}
\longrightarrow
\text{共役点}
\longrightarrow
\text{指数写像}
\longrightarrow
\text{直径・コンパクト性・位相}
$$

まで進みました。

次の **GEO19「Gauss--Bonnet と二次元大域幾何」** では、別の大域化が現れます。

そこでは点ごとの Gauss 曲率 $K$ を面積形式で積分し、

$$
\int_M K\,dA
$$

という解析量を、Euler 標数

$$
\chi(M)
$$

という位相不変量へ結びます。

比較幾何が「曲率の不等式から大域幾何を制約する」理論なら、Gauss--Bonnet は「曲率の総和が位相そのものを数える」定理です。
