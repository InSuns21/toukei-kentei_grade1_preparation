# NS2 非線形項・三重線形形式・エネルギー評価

NS1 では、三次元トーラス

$$
\mathbb T^3=(-\pi,\pi]^3
$$

上で平均零・発散零の速度場を扱う空間 $H$ を作り、Leray 射影 $P$ と Stokes 作用素 $A$ によって Navier--Stokes 方程式を

$$
\partial_tu+\nu Au+B(u,u)=Pf
$$

という速度だけの式へ書き直しました。

ここで本当に難しいのは

$$
B(u,u)=P((u\cdot\nabla)u)
$$

です。$u$ が2回現れるので、線形方程式のように「大きさをそのまま右辺から読める」わけではありません。

それでも Navier--Stokes には、非線形項が基本 $L^2$ エネルギーを直接増やさないという特別な構造があります。本章の中心は、この相殺を

$$
\boxed{
\nabla\cdot u=0
\quad+\quad
\text{周期部分積分}
\quad\Longrightarrow\quad
\int_{\mathbb T^3}(u\cdot\nabla)u\cdot u\,dx=0
}
$$

として、途中を飛ばさずに証明することです。

この相殺から

$$
\frac12\frac{d}{dt}\|u(t)\|_2^2
+
\nu\|\nabla u(t)\|_2^2
=
(f(t),u(t))
$$

が得られます。

この一行が NS3 の Leray--Hopf 弱解構成の出発点になります。一方で、この評価だけでは三次元の大域正則性までは届きません。何が制御でき、何がまだ不足しているのかまで切り分けます。

---

## 1. まず、エネルギーを測る空間を決める

NS1 の $H$ は平均零・発散零の $L^2$ ベクトル場の空間でした。

エネルギー計算ではさらに

$$
\nabla u
$$

が現れます。したがって、空間微分を一階まで $L^2$ で持つ発散零場を使います。

<a id="def-ns2-energy-space-v"></a>

<!-- formal-statement-start -->
> **定義（発散零エネルギー空間 V）**  
> NS1 の平均零・発散零空間を $H$ とする。三次元トーラス上で

$$
V
:=
H^1(\mathbb T^3;\mathbb R^3)\cap H
$$

> と定める。
>
> すなわち $u\in V$ は、$u\in H^1(\mathbb T^3;\mathbb R^3)$ であり、さらに

$$
\int_{\mathbb T^3}u(x)\,dx=0,
\qquad
\nabla\cdot u=0
$$

> を満たすベクトル場である。
<!-- formal-statement-end -->

<!-- definition-example-start: def-ns2-energy-space-v -->
**定義の確認**

$$
u(x_1,x_2,x_3)
=
(\sin x_2,0,0)
$$

とします。

各成分は滑らかな周期関数なので

$$
u\in H^1(\mathbb T^3;\mathbb R^3).
$$

また $\sin x_2$ の周期平均は0なので

$$
\int_{\mathbb T^3}u\,dx=0.
$$

さらに

$$
\nabla\cdot u
=
\partial_1(\sin x_2)
=0.
$$

したがって

$$
u\in V.
$$
<!-- definition-example-end -->

まだ

$$
\|\nabla u\|_2
$$

だけを $V$ のノルムと呼んではいません。

一般の $H^1$ では定数関数の勾配が0になるからです。しかし $V$ では平均零条件が定数方向を消します。

---

## 2. 平均零なら $L^2$ ノルムは勾配で制御できる

$u\in V$ の Fourier 係数を $\widehat u(k)$ とします。

NS1 で平均零条件は

$$
\widehat u(0)=0
$$

に対応しました。

したがって非零モードしか残りません。非零の整数ベクトル $k\in\mathbb Z^3\setminus\{0\}$ では

$$
|k|\ge1
$$

です。

この単純な事実が周期版の Poincaré 評価を与えます。

<a id="prop-ns2-periodic-poincare"></a>

<!-- formal-statement-start -->
> **命題（周期平均零場の Poincaré 型評価）**  
> 任意の $u\in V$ に対して

$$
\boxed{
\|u\|_{L^2(\mathbb T^3)}
\le
\|\nabla u\|_{L^2(\mathbb T^3)}
}
$$

> が成り立つ。
>
> したがって $V$ 上では

$$
\|u\|_V:=\|\nabla u\|_2
$$

> はノルムであり、通常の $H^1$ ノルムと同値である。
<!-- formal-statement-end -->

### 証明の見取り図

平均零なので $k=0$ を除いて Fourier 展開できます。

各非零モードでは $1\le |k|^2$ なので、

$$
|\widehat u(k)|^2
\le
|k|^2|\widehat u(k)|^2
$$

を全モードで足せば終わります。

<!-- proof-start -->
### 証明

[Parseval 内積等式](../FOU4/index.md#thm-fou4-parseval)から

$$
\|u\|_2^2
=
(2\pi)^3
\sum_{k\in\mathbb Z^3}
|\widehat u(k)|^2.
$$

平均零なので

$$
\widehat u(0)=0.
$$

従って

$$
\|u\|_2^2
=
(2\pi)^3
\sum_{k\ne0}
|\widehat u(k)|^2.
$$

$k\ne0$ なら $|k|^2\ge1$ だから

$$
|\widehat u(k)|^2
\le
|k|^2|\widehat u(k)|^2.
$$

よって

$$
\|u\|_2^2
\le
(2\pi)^3
\sum_{k\ne0}
|k|^2|\widehat u(k)|^2.
$$

右辺は Fourier 表示による $\|\nabla u\|_2^2$ なので

$$
\|u\|_2^2
\le
\|\nabla u\|_2^2.
$$

平方根を取ると

$$
\|u\|_2
\le
\|\nabla u\|_2.
$$

また

$$
\|u\|_{H^1}^2
=
\|u\|_2^2+\|\nabla u\|_2^2
\le
2\|\nabla u\|_2^2,
$$

一方

$$
\|\nabla u\|_2
\le
\|u\|_{H^1}.
$$

従って $\|\nabla u\|_2$ と $H^1$ ノルムは $V$ 上で同値です。
<!-- proof-end -->

この評価は、周期領域で平均を0に固定したことが効いています。

平均零を外すと定数ベクトル場 $u\equiv c$ に対し

$$
\|\nabla u\|_2=0,
\qquad
\|u\|_2>0
$$

となり、評価は壊れます。

---

## 3. 三次元では $L^4$ をどう作るか

三重線形形式では

$$
\int |u|\,|\nabla v|\,|w|
$$

を評価したくなります。

$\nabla v\in L^2$ は $v\in V$ から得られます。残る $u,w$ を $L^4$ に置けば

$$
\frac14+\frac12+\frac14=1
$$

なので [Hölder の不等式](../F0_00D2D_Lp_Holder_Minkowski/index.md#thm-f0-00d2d-01)がちょうど使えます。

したがって欲しいのは

$$
V\hookrightarrow L^4.
$$

これを既知の補間評価として一言で済ませず、$L^6$ Sobolev 評価と Hölder をつないで導きます。

<a id="prop-ns2-periodic-l4"></a>

<!-- formal-statement-start -->
> **命題（三次元周期場の L6・L4 評価）**  
> 定数 $C>0$ が存在し、任意の $u\in V$ に対して

$$
\|u\|_{L^6(\mathbb T^3)}
\le
C\|\nabla u\|_2
$$

> および

$$
\boxed{
\|u\|_{L^4(\mathbb T^3)}
\le
C
\|u\|_2^{1/4}
\|\nabla u\|_2^{3/4}
}
$$

> が成り立つ。
<!-- formal-statement-end -->

### 証明の見取り図

最初の $L^6$ 評価は、周期関数を有限個の周期セルだけ含むコンパクト台へ切り出して、GPDE5 の $\mathbb R^3$ 上の Sobolev 不等式へ移します。

次に

$$
\|u\|_4^4
=
\int |u|\,|u|^3
$$

へ [Hölder の不等式](../F0_00D2D_Lp_Holder_Minkowski/index.md#thm-f0-00d2d-01)を使うと、$L^2$ と $L^6$ がちょうど現れます。

<!-- proof-start -->
### 証明

まず $u\in V$ を $\mathbb R^3$ へ周期的に延長して $\widetilde u$ と書きます。

滑らかなカットオフ関数 $\chi\in C_c^\infty(\mathbb R^3)$ を、

$$
\chi=1
\quad\text{on }[-\pi,\pi]^3
$$

かつ

$$
\operatorname{supp}\chi
\subset
(-2\pi,2\pi)^3
$$

となるように一つ固定します。

すると

$$
\chi\widetilde u\in H^1(\mathbb R^3).
$$

積の微分から

$$
\nabla(\chi\widetilde u)
=
(\nabla\chi)\widetilde u
+
\chi\nabla\widetilde u.
$$

$\chi$ と $\nabla\chi$ は固定された有界関数であり、その台は有限個の周期セルに入ります。したがってある定数 $C_1$ が存在して

$$
\|\nabla(\chi\widetilde u)\|_{L^2(\mathbb R^3)}
\le
C_1
\left(
\|u\|_{L^2(\mathbb T^3)}
+
\|\nabla u\|_{L^2(\mathbb T^3)}
\right).
$$

GPDE5 の [$\mathbb R^3$ 上の Sobolev 不等式](../GPDE5/index.md#thm-gpde5-sobolev-rd)を $p=2$ で使うと

$$
\|\chi\widetilde u\|_{L^6(\mathbb R^3)}
\le
C_2
\|\nabla(\chi\widetilde u)\|_2.
$$

$\chi=1$ on $[-\pi,\pi]^3$ なので

$$
\|u\|_{L^6(\mathbb T^3)}
\le
\|\chi\widetilde u\|_{L^6(\mathbb R^3)}.
$$

従って

$$
\|u\|_6
\le
C_1C_2
\left(
\|u\|_2+\|\nabla u\|_2
\right).
$$

[周期平均零場の Poincaré 型評価](#prop-ns2-periodic-poincare)から

$$
\|u\|_2
\le
\|\nabla u\|_2.
$$

よって定数をまとめて

$$
\|u\|_6
\le
C\|\nabla u\|_2.
$$

次に $L^4$ を評価します。

$$
\|u\|_4^4
=
\int_{\mathbb T^3}
|u|^4\,dx
=
\int_{\mathbb T^3}
|u|\,|u|^3\,dx.
$$

[Hölder の不等式](../F0_00D2D_Lp_Holder_Minkowski/index.md#thm-f0-00d2d-01)を指数 $2,2$ で使うと

$$
\|u\|_4^4
\le
\left(
\int|u|^2
\right)^{1/2}
\left(
\int|u|^6
\right)^{1/2}.
$$

右辺をノルムで書けば

$$
\|u\|_4^4
\le
\|u\|_2
\|u\|_6^3.
$$

先ほどの $L^6$ 評価を代入して

$$
\|u\|_4^4
\le
C^3
\|u\|_2
\|\nabla u\|_2^3.
$$

4乗根を取ると

$$
\|u\|_4
\le
C^{3/4}
\|u\|_2^{1/4}
\|\nabla u\|_2^{3/4}.
$$

定数を再び $C$ と書けば結論です。
<!-- proof-end -->

この評価は NS3 以降で非線形項を制御するとき何度も使います。

---

## 4. 非線形項を三つの入力に分ける

移流項

$$
(u\cdot\nabla)v
$$

は $u$ と $v$ の二つに依存します。

これを第三のベクトル場 $w$ と $L^2$ 内積に入れると

$$
\int_{\mathbb T^3}
(u\cdot\nabla)v\cdot w\,dx
$$

が現れます。

三つの入力を分けておくと、どの引数に微分が付くか、どこで発散零条件が働くかを見失いません。

<a id="def-ns2-trilinear-form"></a>

<!-- formal-statement-start -->
> **定義（Navier--Stokes 三重線形形式）**  
> $u,v,w\in V$ に対して

$$
\boxed{
b(u,v,w)
:=
\int_{\mathbb T^3}
(u\cdot\nabla)v\cdot w\,dx
}
$$

> と定める。
>
> 成分表示では

$$
b(u,v,w)
=
\sum_{i=1}^3
\sum_{j=1}^3
\int_{\mathbb T^3}
u_j
(\partial_jv_i)
w_i\,dx.
$$
<!-- formal-statement-end -->

この積分が本当に有限であることも確認します。

$u,w\in V$ なら前節から $u,w\in L^4$、また $\nabla v\in L^2$ です。

したがって [Hölder の不等式](../F0_00D2D_Lp_Holder_Minkowski/index.md#thm-f0-00d2d-01)により

$$
\int
|u|\,|\nabla v|\,|w|
\le
\|u\|_4
\|\nabla v\|_2
\|w\|_4
<\infty.
$$

<!-- definition-example-start: def-ns2-trilinear-form -->
**定義の確認**

$$
u=(\sin x_2,0,0),
\qquad
v=(0,\sin x_1,0)
$$

とします。どちらも $V$ に属します。

$(u\cdot\nabla)v$ を成分ごとに計算すると

$$
u\cdot\nabla
=
\sin x_2\,\partial_1,
$$

したがって

$$
(u\cdot\nabla)v
=
(0,\sin x_2\cos x_1,0).
$$

$w=v$ とすると

$$
(u\cdot\nabla)v\cdot v
=
\sin x_2\cos x_1\sin x_1.
$$

よって

$$
b(u,v,v)
=
\left(
\int_{-\pi}^{\pi}\sin x_2\,dx_2
\right)
\left(
\int_{-\pi}^{\pi}\cos x_1\sin x_1\,dx_1
\right)
(2\pi)
=0.
$$

この例では相殺を直接積分で確認できました。次節では、全ての発散零場で同じ相殺が起きる理由を証明します。
<!-- definition-example-end -->

---

## 5. 発散零条件が「微分の移し替え」を可能にする

$b(u,v,w)$ と $b(u,w,v)$ を足してみます。

滑らかな場合には

$$
\begin{aligned}
b(u,v,w)+b(u,w,v)
&=
\sum_{i,j}
\int
u_j
\left[
(\partial_jv_i)w_i
+
(\partial_jw_i)v_i
\right]dx
\\
&=
\sum_{i,j}
\int
u_j
\partial_j(v_iw_i)\,dx.
\end{aligned}
$$

角括弧の中は積の微分です。

ここから周期部分積分をすると、微分は $u_j$ 側へ移ります。

<a id="thm-ns2-trilinear-skew"></a>

<!-- formal-statement-start -->
> **定理（三重線形形式の反対称性とエネルギー相殺）**  
> 任意の $u,v,w\in V$ に対して

$$
\boxed{
b(u,v,w)
=
-b(u,w,v)
}
$$

> が成り立つ。
>
> 特に $w=v$ とすれば

$$
\boxed{
b(u,v,v)=0
}
$$

> である。
<!-- formal-statement-end -->

### 証明の見取り図

まず滑らかな発散零周期場で計算します。

積の微分を使って

$$
b(u,v,w)+b(u,w,v)
=
\int u\cdot\nabla(v\cdot w)\,dx
$$

とまとめます。

周期部分積分すると

$$
-\int(\nabla\cdot u)(v\cdot w)\,dx
$$

になり、$\nabla\cdot u=0$ で消えます。

一般の $V$ の元へは、発散零 Fourier 切断で $H^1$ 近似して極限を取ります。

<!-- proof-start -->
### 証明

まず $u,v,w$ が滑らかな周期ベクトル場で、$\nabla\cdot u=0$ とします。

成分表示から

$$
b(u,v,w)
=
\sum_{i,j}
\int
u_j(\partial_jv_i)w_i\,dx,
$$

$$
b(u,w,v)
=
\sum_{i,j}
\int
u_j(\partial_jw_i)v_i\,dx.
$$

二式を足すと

$$
\begin{aligned}
b(u,v,w)+b(u,w,v)
&=
\sum_{i,j}
\int
u_j
\left[
(\partial_jv_i)w_i
+
v_i(\partial_jw_i)
\right]dx
\\
&=
\sum_{i,j}
\int
u_j
\partial_j(v_iw_i)\,dx.
\end{aligned}
$$

$j$ ごとに周期部分積分すると境界項は打ち消し合い、

$$
\int_{\mathbb T^3}
u_j\partial_j(v_iw_i)\,dx
=
-
\int_{\mathbb T^3}
(\partial_ju_j)v_iw_i\,dx.
$$

したがって

$$
b(u,v,w)+b(u,w,v)
=
-
\int_{\mathbb T^3}
(\nabla\cdot u)(v\cdot w)\,dx.
$$

$\nabla\cdot u=0$ なので

$$
b(u,v,w)+b(u,w,v)=0.
$$

よって

$$
b(u,v,w)=-b(u,w,v).
$$

特に $w=v$ と置けば

$$
b(u,v,v)
=
-b(u,v,v),
$$

したがって

$$
2b(u,v,v)=0
$$

であり

$$
b(u,v,v)=0.
$$

次に一般の $u,v,w\in V$ を考えます。

Fourier 切断を

$$
u_N(x)
=
\sum_{0<|k|\le N}
\widehat u(k)e^{ik\cdot x}
$$

と定めます。$u\in H^1$ なので

$$
\|u-u_N\|_{H^1}^2
=
(2\pi)^3
\sum_{|k|>N}
(1+|k|^2)|\widehat u(k)|^2
\longrightarrow0.
$$

NS1 の発散零 Fourier 条件

$$
k\cdot\widehat u(k)=0
$$

は切断後も保たれるので、$u_N$ は滑らかな平均零発散零場です。

$v,w$ についても同様に $v_N,w_N$ を取れます。

[三次元周期場の $L^4$ 評価](#prop-ns2-periodic-l4)と [Hölder の不等式](../F0_00D2D_Lp_Holder_Minkowski/index.md#thm-f0-00d2d-01)から $b$ は $V^3$ 上で連続です。したがって

$$
b(u_N,v_N,w_N)\to b(u,v,w),
$$

$$
b(u_N,w_N,v_N)\to b(u,w,v).
$$

各 $N$ では滑らかな場合の反対称性が成り立つので

$$
b(u_N,v_N,w_N)
=
-b(u_N,w_N,v_N).
$$

$N\to\infty$ として

$$
b(u,v,w)
=
-b(u,w,v).
$$

これで一般の $V$ でも成立します。
<!-- proof-end -->

### 発散零を失うと何が壊れるか

上の証明の途中では、実は

$$
b(u,v,v)
=
-\frac12
\int_{\mathbb T^3}
(\nabla\cdot u)|v|^2\,dx
$$

が得られています。

したがって $\nabla\cdot u=0$ は飾りではありません。

たとえば

$$
u=(\sin x_1,0,0),
\qquad
v=(1+\cos x_1,0,0)
$$

とすると

$$
\nabla\cdot u=\cos x_1\ne0.
$$

また

$$
(u\cdot\nabla)v
=
(-\sin^2x_1,0,0),
$$

したがって

$$
(u\cdot\nabla)v\cdot v
=
-\sin^2x_1(1+\cos x_1).
$$

$x_1$ について積分すると

$$
\int_{-\pi}^{\pi}
-\sin^2x_1(1+\cos x_1)\,dx_1
=
-\pi,
$$

なので

$$
b(u,v,v)
=
-\pi(2\pi)^2
=
-4\pi^3
\ne0.
$$

失った仮定は $\nabla\cdot u=0$ であり、壊れた証明機構は

$$
-\frac12\int(\nabla\cdot u)|v|^2
$$

を0にする最後の一手です。

---

## 6. 三重線形形式はどれくらい大きくなり得るか

NS3 で Galerkin 近似を極限へ送るには、相殺だけでなく

$$
b(u,v,w)
$$

の大きさも制御する必要があります。

<a id="prop-ns2-trilinear-continuity"></a>

<!-- formal-statement-start -->
> **命題（三重線形形式の連続評価）**  
> 定数 $C>0$ が存在し、任意の $u,v,w\in V$ に対して

$$
\boxed{
|b(u,v,w)|
\le
C
\|u\|_2^{1/4}
\|\nabla u\|_2^{3/4}
\|\nabla v\|_2
\|w\|_2^{1/4}
\|\nabla w\|_2^{3/4}
}
$$

> が成り立つ。
>
> 特に周期 Poincaré 評価を使えば

$$
|b(u,v,w)|
\le
C
\|\nabla u\|_2
\|\nabla v\|_2
\|\nabla w\|_2.
$$
<!-- formal-statement-end -->

### 証明の見取り図

積分の三因子を $L^4$、$L^2$、$L^4$ に分けます。

あとは前節の $L^4$ 補間評価を $u,w$ に一回ずつ代入します。

<!-- proof-start -->
### 証明

定義から

$$
|b(u,v,w)|
\le
\int_{\mathbb T^3}
|u|\,|\nabla v|\,|w|\,dx.
$$

[Hölder の不等式](../F0_00D2D_Lp_Holder_Minkowski/index.md#thm-f0-00d2d-01)を指数 $4,2,4$ で使うと

$$
|b(u,v,w)|
\le
\|u\|_4
\|\nabla v\|_2
\|w\|_4.
$$

[三次元周期場の $L^4$ 評価](#prop-ns2-periodic-l4)を $u,w$ に適用して

$$
\|u\|_4
\le
C
\|u\|_2^{1/4}
\|\nabla u\|_2^{3/4},
$$

$$
\|w\|_4
\le
C
\|w\|_2^{1/4}
\|\nabla w\|_2^{3/4}.
$$

したがって

$$
|b(u,v,w)|
\le
C
\|u\|_2^{1/4}
\|\nabla u\|_2^{3/4}
\|\nabla v\|_2
\|w\|_2^{1/4}
\|\nabla w\|_2^{3/4}.
$$

さらに Poincaré 型評価

$$
\|u\|_2\le\|\nabla u\|_2,
\qquad
\|w\|_2\le\|\nabla w\|_2
$$

を使えば

$$
|b(u,v,w)|
\le
C
\|\nabla u\|_2
\|\nabla v\|_2
\|\nabla w\|_2.
$$
<!-- proof-end -->

この評価により $b$ は $V\times V\times V$ 上の連続三重線形形式として扱えます。

---

## 7. $B(u,v)$ と $b(u,v,w)$ はどうつながるか

NS1 では

$$
B(u,v)
=
P((u\cdot\nabla)v)
$$

と定義しました。

十分滑らかな $u,v,w$ で $w\in H$ とします。

Leray 射影 $P$ は $H$ への直交射影なので、

$$
(u\cdot\nabla)v
=
P((u\cdot\nabla)v)
+
\text{勾配成分}
$$

と直交分解できます。

$w\in H$ は勾配成分と直交するので

$$
(B(u,v),w)_{L^2}
=
((u\cdot\nabla)v,w)_{L^2}.
$$

右辺は三重線形形式そのものです。

したがって

$$
\boxed{
(B(u,v),w)=b(u,v,w)
}
$$

です。

特に $u=v=w$ なら

$$
(B(u,u),u)
=
b(u,u,u)
=
0.
$$

ここで、射影 $P$ が相殺を作っているわけではありません。

相殺の本体は

$$
\nabla\cdot u=0
$$

と周期部分積分です。$P$ は非線形項を発散零空間 $H$ へ戻す役割を担っています。

---

## 8. 滑らかな解では運動エネルギー恒等式が成り立つ

いよいよ Navier--Stokes 方程式へ戻ります。

NS1 の射影後の式

$$
\partial_tu+\nu Au+B(u,u)=Pf
$$

を考えます。

速度 $u$ と $L^2$ 内積を取ると

$$
(\partial_tu,u)
+
\nu(Au,u)
+
(B(u,u),u)
=
(Pf,u).
$$

四項を一つずつ処理します。

<a id="thm-ns2-energy-identity"></a>

<!-- formal-statement-start -->
> **定理（滑らかな Navier--Stokes 解のエネルギー恒等式）**  
> $T>0$、$\nu>0$ とする。平均零の十分滑らかな周期速度場 $u:[0,T]\times\mathbb T^3\to\mathbb R^3$ と十分滑らかな周期外力 $f$ が

$$
\partial_tu+\nu Au+B(u,u)=Pf,
\qquad
u(t)\in V
$$

> を満たすとする。
>
> このとき任意の $t\in[0,T]$ で

$$
\boxed{
\frac12\frac{d}{dt}\|u(t)\|_2^2
+
\nu\|\nabla u(t)\|_2^2
=
(f(t),u(t))_{L^2}
}
$$

> が成り立つ。
<!-- formal-statement-end -->

### 証明の見取り図

- 時間微分項は積の微分で $\frac12\frac d{dt}\|u\|_2^2$。
- Stokes 項は NS1 の正値性で $\|\nabla u\|_2^2$。
- 非線形項は本章の相殺で0。
- 外力の勾配成分は $u\in H$ と直交するので $(Pf,u)=(f,u)$。

四項を独立に確認すれば完成します。

<!-- proof-start -->
### 証明

射影後方程式と $u$ の $L^2$ 内積を取ると

$$
(\partial_tu,u)
+
\nu(Au,u)
+
(B(u,u),u)
=
(Pf,u).
$$

まず時間微分項です。$u$ は十分滑らかなので積分と時間微分を交換でき、

$$
\begin{aligned}
\frac{d}{dt}\|u(t)\|_2^2
&=
\frac{d}{dt}
\int_{\mathbb T^3}
u(t,x)\cdot u(t,x)\,dx
\\
&=
2
\int_{\mathbb T^3}
\partial_tu(t,x)\cdot u(t,x)\,dx.
\end{aligned}
$$

従って

$$
(\partial_tu,u)
=
\frac12
\frac{d}{dt}
\|u\|_2^2.
$$

次に NS1 の [Stokes 作用素の正値性](../NS1/index.md#prop-ns1-stokes-fourier)から

$$
(Au,u)
=
\|\nabla u\|_2^2.
$$

非線形項は

$$
(B(u,u),u)
=
b(u,u,u)
$$

であり、[三重線形形式のエネルギー相殺](#thm-ns2-trilinear-skew)から

$$
b(u,u,u)=0.
$$

最後に外力項を処理します。

NS1 で構成した $P$ は $L^2$ から $H$ への直交射影です。したがって任意の $g\in L^2$ と任意の $h\in H$ に対して

$$
(Pg,h)=(g,h)
$$

が成り立ちます。

ここで

$$
g=f,
\qquad
h=u
$$

と取ります。$u\in H$ なので

$$
(Pf,u)=(f,u).
$$

この議論は $f$ の空間平均が0でなくても成り立ちます。$P$ が取り除く定数成分も、平均零の $u$ とは直交するからです。

以上を元の内積式へ代入して

$$
\frac12\frac{d}{dt}\|u\|_2^2
+
\nu\|\nabla u\|_2^2
=
(f,u).
$$
<!-- proof-end -->

無外力 $f=0$ なら

$$
\frac12\frac{d}{dt}\|u\|_2^2
+
\nu\|\nabla u\|_2^2
=
0.
$$

つまり非線形項は運動エネルギーを作らず、粘性だけが散逸を担います。

---

## 9. 外力があってもエネルギーは有限時間で制御できる

外力項

$$
(f,u)
$$

は0にはなりません。

しかし Cauchy--Schwarz、周期 Poincaré、[Young の不等式](../F0_00D2D_Lp_Holder_Minkowski/index.md#lem-f0-00d2d-01)を順に使うと、粘性散逸の半分へ吸収できます。

<a id="prop-ns2-forced-energy"></a>

<!-- formal-statement-start -->
> **命題（外力付きエネルギー評価）**  
> 前節の滑らかな解について、さらに

$$
f\in L^2(0,T;L^2(\mathbb T^3;\mathbb R^3))
$$

> とする。
>
> 任意の $t\in[0,T]$ に対して

$$
\boxed{
\|u(t)\|_2^2
+
\nu
\int_0^t
\|\nabla u(s)\|_2^2\,ds
\le
\|u(0)\|_2^2
+
\frac1\nu
\int_0^t
\|f(s)\|_2^2\,ds
}
$$

> が成り立つ。
<!-- formal-statement-end -->

### 証明の見取り図

[滑らかな Navier--Stokes 解のエネルギー恒等式](#thm-ns2-energy-identity)の右辺へ

$$
(f,u)
\le
\|f\|_2\|u\|_2
\le
\|f\|_2\|\nabla u\|_2
$$

を入れます。

そこへ [Young の不等式](../F0_00D2D_Lp_Holder_Minkowski/index.md#lem-f0-00d2d-01)を

$$
a=\|f\|_2,
\qquad
b=\|\nabla u\|_2
$$

として使い、$\nu\|\nabla u\|_2^2$ の半分を左辺へ戻します。

<!-- proof-start -->
### 証明

[滑らかな Navier--Stokes 解のエネルギー恒等式](#thm-ns2-energy-identity)から

$$
\frac12\frac{d}{dt}\|u\|_2^2
+
\nu\|\nabla u\|_2^2
=
(f,u).
$$

Cauchy--Schwarz により

$$
(f,u)
\le
\|f\|_2\|u\|_2.
$$

周期 Poincaré 評価から

$$
\|u\|_2
\le
\|\nabla u\|_2.
$$

従って

$$
(f,u)
\le
\|f\|_2\|\nabla u\|_2.
$$

[Young の不等式](../F0_00D2D_Lp_Holder_Minkowski/index.md#lem-f0-00d2d-01)を

$$
a=\|f\|_2,
\qquad
b=\|\nabla u\|_2
$$

へ適用し、係数を $\nu$ に合わせると

$$
ab
\le
\frac1{2\nu}a^2
+
\frac\nu2b^2.
$$

したがって

$$
(f,u)
\le
\frac1{2\nu}\|f\|_2^2
+
\frac\nu2\|\nabla u\|_2^2.
$$

[滑らかな Navier--Stokes 解のエネルギー恒等式](#thm-ns2-energy-identity)へ代入して

$$
\frac12\frac{d}{dt}\|u\|_2^2
+
\frac\nu2\|\nabla u\|_2^2
\le
\frac1{2\nu}\|f\|_2^2.
$$

2倍すると

$$
\frac{d}{dt}\|u\|_2^2
+
\nu\|\nabla u\|_2^2
\le
\frac1\nu\|f\|_2^2.
$$

$0$ から $t$ まで積分して

$$
\|u(t)\|_2^2
-
\|u(0)\|_2^2
+
\nu
\int_0^t
\|\nabla u(s)\|_2^2\,ds
\le
\frac1\nu
\int_0^t
\|f(s)\|_2^2\,ds.
$$

移項すれば主張です。
<!-- proof-end -->

この評価の重要な点は、右辺に高階微分が現れないことです。

---

## 10. 「有限エネルギー」とはどの時空間にいることか

前節の評価から

$$
\sup_{0\le t\le T}\|u(t)\|_2^2
<\infty
$$

と

$$
\int_0^T
\|\nabla u(t)\|_2^2\,dt
<\infty
$$

が同時に得られます。

この二つを一つの記号でまとめます。

<a id="def-ns2-energy-class"></a>

<!-- formal-statement-start -->
> **定義（有限時間エネルギー階級）**  
> $T>0$ とする。発散零速度場 $u$ が

$$
u\in
L^\infty(0,T;H)
\cap
L^2(0,T;V)
$$

> を満たすとき、$u$ は区間 $[0,T]$ 上の **エネルギー階級**に属するという。
<!-- formal-statement-end -->

<!-- definition-example-start: def-ns2-energy-class -->
**定義の確認**

前節の仮定の下で

$$
\|u(t)\|_2^2
\le
\|u(0)\|_2^2
+
\frac1\nu
\int_0^T
\|f(s)\|_2^2\,ds
$$

なので

$$
u\in L^\infty(0,T;H).
$$

また

$$
\nu
\int_0^T
\|\nabla u(s)\|_2^2\,ds
\le
\|u(0)\|_2^2
+
\frac1\nu
\int_0^T
\|f(s)\|_2^2\,ds
$$

なので

$$
u\in L^2(0,T;V).
$$

したがって、滑らかな解に対するエネルギー評価はその解を自動的にエネルギー階級へ入れます。
<!-- definition-example-end -->

NS3 では、有限次元 Galerkin 解に同じ評価を与え、次元に依らない一様有界性から極限を取ります。

---

## 11. 無外力では平均零速度が指数的に減衰する

$f=0$ なら[滑らかな Navier--Stokes 解のエネルギー恒等式](#thm-ns2-energy-identity)は

$$
\frac{d}{dt}\|u\|_2^2
+
2\nu\|\nabla u\|_2^2
=
0.
$$

周期 Poincaré 評価から

$$
\|\nabla u\|_2^2
\ge
\|u\|_2^2.
$$

したがって $L^2$ エネルギー自身で閉じた微分不等式が得られます。

<a id="cor-ns2-unforced-decay"></a>

<!-- formal-statement-start -->
> **系（無外力での指数減衰）**  
> 前節の滑らかな解で $f=0$ とする。
>
> このとき任意の $t\in[0,T]$ に対して

$$
\boxed{
\|u(t)\|_2^2
\le
e^{-2\nu t}
\|u(0)\|_2^2
}
$$

> が成り立つ。
<!-- formal-statement-end -->

<!-- proof-start -->
### 証明

$f=0$ の[滑らかな Navier--Stokes 解のエネルギー恒等式](#thm-ns2-energy-identity)から

$$
\frac{d}{dt}\|u\|_2^2
+
2\nu\|\nabla u\|_2^2
=
0.
$$

Poincaré 型評価より

$$
\|\nabla u\|_2^2
\ge
\|u\|_2^2.
$$

したがって

$$
\frac{d}{dt}\|u\|_2^2
+
2\nu\|u\|_2^2
\le
0.
$$

$$
y(t):=\|u(t)\|_2^2
$$

と置くと

$$
y'(t)+2\nu y(t)\le0.
$$

両辺へ $e^{2\nu t}$ を掛けると

$$
\frac{d}{dt}
\left(
e^{2\nu t}y(t)
\right)
\le0.
$$

したがって

$$
e^{2\nu t}y(t)
\le
y(0),
$$

すなわち

$$
y(t)
\le
e^{-2\nu t}y(0).
$$

元の記号へ戻して

$$
\|u(t)\|_2^2
\le
e^{-2\nu t}
\|u(0)\|_2^2.
$$
<!-- proof-end -->

非線形項があるにもかかわらず、平均零の無外力周期流では $L^2$ エネルギーは粘性によって減衰します。

---

## 12. では、なぜこれで三次元大域正則性は解けないのか

ここまでで

$$
u\in
L^\infty(0,T;L^2)
\cap
L^2(0,T;H^1)
$$

を制御できました。

これは非常に強い情報ですが、意味を分解すると

- 各時刻の $L^2$ 大きさは一様に有限。
- 一階微分 $\nabla u$ は時間について二乗可積分。

という情報です。

一方、三次元で滑らかさを保ち続けるには、典型的には

$$
\sup_{0\le t\le T}
\|\nabla u(t)\|_2
$$

や、尺度に合ったより強い時空間ノルムを制御する必要が出ます。

基本エネルギー評価は

$$
\int_0^T\|\nabla u\|_2^2\,dt
$$

までは与えますが、

$$
\sup_t\|\nabla u(t)\|_2
$$

は与えません。

この差を曖昧にしないことが重要です。

本章で得た評価は

$$
\boxed{
\text{大域弱解を作るためには十分強い}
}
$$

一方で

$$
\boxed{
\text{三次元の大域正則性を直接閉じるには不足する}
}
$$

という位置にあります。

NS3 では、この有限エネルギー評価を Galerkin 近似へ適用し、弱収束だけでは通らない非線形項を強収束で処理して、Leray--Hopf 弱解を構成します。

---

## 13. 演習

### Level A

<a id="ex-ns2-a01"></a>
#### NS2-A01 三重線形形式を成分で書く
- Level: A

$u,v,w\in V$ とする。

1. $(u\cdot\nabla)v$ の第 $i$ 成分を書け。
2. $b(u,v,w)$ を二重和で書け。
3. Hölder の指数 $4,2,4$ が使える理由を確認せよ。

<!-- solution-start -->
#### 詳細解答

まず

$$
u\cdot\nabla
=
\sum_{j=1}^3u_j\partial_j.
$$

したがって第 $i$ 成分は

$$
((u\cdot\nabla)v)_i
=
\sum_{j=1}^3
u_j\partial_jv_i.
$$

よって

$$
\begin{aligned}
b(u,v,w)
&=
\int
(u\cdot\nabla)v\cdot w\,dx
\\
&=
\sum_{i=1}^3
\int
\left(
\sum_{j=1}^3u_j\partial_jv_i
\right)w_i\,dx
\\
&=
\sum_{i,j}
\int
u_j(\partial_jv_i)w_i\,dx.
\end{aligned}
$$

また

$$
\frac14+\frac12+\frac14=1.
$$

$u,w\in V$ なら本章の $L^4$ 評価から $u,w\in L^4$、$v\in V$ なら $\nabla v\in L^2$ です。

したがって [Hölder の不等式](../F0_00D2D_Lp_Holder_Minkowski/index.md#thm-f0-00d2d-01)から

$$
|b(u,v,w)|
\le
\|u\|_4\|\nabla v\|_2\|w\|_4.
$$

これにより積分は有限です。
<!-- solution-end -->

<a id="ex-ns2-a02"></a>
#### NS2-A02 滑らかな場で反対称性を再現する
- Level: A

滑らかな周期ベクトル場 $u,v,w$ を考え、$\nabla\cdot u=0$ とする。

$$
b(u,v,w)+b(u,w,v)=0
$$

を成分表示と周期部分積分から示せ。

<!-- solution-start -->
#### 詳細解答

成分表示から

$$
b(u,v,w)+b(u,w,v)
=
\sum_{i,j}
\int
u_j
\left[
(\partial_jv_i)w_i
+
(\partial_jw_i)v_i
\right]dx.
$$

角括弧は積の微分なので

$$
(\partial_jv_i)w_i
+
v_i(\partial_jw_i)
=
\partial_j(v_iw_i).
$$

したがって

$$
b(u,v,w)+b(u,w,v)
=
\sum_{i,j}
\int
u_j\partial_j(v_iw_i)\,dx.
$$

周期部分積分により

$$
\int
u_j\partial_j(v_iw_i)\,dx
=
-\int
(\partial_ju_j)v_iw_i\,dx.
$$

全ての $i,j$ を足すと

$$
b(u,v,w)+b(u,w,v)
=
-\int
(\nabla\cdot u)(v\cdot w)\,dx.
$$

$\nabla\cdot u=0$ なので右辺は0です。

従って

$$
b(u,v,w)=-b(u,w,v).
$$
<!-- solution-end -->

<a id="ex-ns2-a03"></a>
#### NS2-A03 発散零仮定を外すと相殺が壊れる
- Level: A

$$
u=(\sin x_1,0,0),
\qquad
v=(1+\cos x_1,0,0)
$$

とする。

1. $\nabla\cdot u$ を求めよ。
2. $(u\cdot\nabla)v$ を求めよ。
3. $b(u,v,v)$ を計算し、0でないことを示せ。

<!-- solution-start -->
#### 詳細解答

まず

$$
\nabla\cdot u
=
\partial_1(\sin x_1)
=
\cos x_1.
$$

従って $u$ は発散零ではありません。

次に

$$
u\cdot\nabla
=
\sin x_1\,\partial_1.
$$

$v_1=1+\cos x_1$ なので

$$
\partial_1v_1=-\sin x_1.
$$

したがって

$$
(u\cdot\nabla)v
=
(-\sin^2x_1,0,0).
$$

$v$ と内積を取ると

$$
(u\cdot\nabla)v\cdot v
=
-\sin^2x_1(1+\cos x_1).
$$

よって

$$
b(u,v,v)
=
(2\pi)^2
\int_{-\pi}^{\pi}
-\sin^2x_1(1+\cos x_1)\,dx_1.
$$

ここで

$$
\int_{-\pi}^{\pi}\sin^2x_1\,dx_1=\pi
$$

であり、

$$
\int_{-\pi}^{\pi}\sin^2x_1\cos x_1\,dx_1=0
$$

です。後者は

$$
\sin^2x_1\cos x_1
=
\frac13\frac{d}{dx_1}\sin^3x_1
$$

の周期積分だからです。

従って

$$
b(u,v,v)
=
-(2\pi)^2\pi
=
-4\pi^3
\ne0.
$$

相殺に必要だった $\nabla\cdot u=0$ を失ったためです。
<!-- solution-end -->

<a id="ex-ns2-a04"></a>
#### NS2-A04 周期 Poincaré 評価を Fourier 級数から出す
- Level: A

平均零の $u\in H^1(\mathbb T^3;\mathbb R^3)$ に対して

$$
\|u\|_2
\le
\|\nabla u\|_2
$$

を Fourier 係数から示せ。

<!-- solution-start -->
#### 詳細解答

平均零なので

$$
\widehat u(0)=0.
$$

Parseval から

$$
\|u\|_2^2
=
(2\pi)^3
\sum_{k\ne0}
|\widehat u(k)|^2.
$$

一方

$$
\|\nabla u\|_2^2
=
(2\pi)^3
\sum_{k\ne0}
|k|^2|\widehat u(k)|^2.
$$

$k\in\mathbb Z^3\setminus\{0\}$ なら

$$
|k|^2\ge1.
$$

したがって各項について

$$
|\widehat u(k)|^2
\le
|k|^2|\widehat u(k)|^2.
$$

全て足して

$$
\|u\|_2^2
\le
\|\nabla u\|_2^2.
$$

平方根を取れば

$$
\|u\|_2
\le
\|\nabla u\|_2.
$$
<!-- solution-end -->

<a id="ex-ns2-a05"></a>
#### NS2-A05 非線形項を含むエネルギー恒等式
- Level: A

滑らかな解が

$$
\partial_tu+\nu Au+B(u,u)=Pf
$$

を満たすとする。

$u$ と $L^2$ 内積を取り、

$$
\frac12\frac{d}{dt}\|u\|_2^2
+
\nu\|\nabla u\|_2^2
=
(f,u)
$$

を導け。

<!-- solution-start -->
#### 詳細解答

方程式と $u$ の内積を取ると

$$
(\partial_tu,u)
+
\nu(Au,u)
+
(B(u,u),u)
=
(Pf,u).
$$

各項を処理します。

まず

$$
(\partial_tu,u)
=
\frac12\frac{d}{dt}\|u\|_2^2.
$$

NS1 の Stokes 作用素の正値性から

$$
(Au,u)=\|\nabla u\|_2^2.
$$

また

$$
(B(u,u),u)
=
b(u,u,u)
=
0.
$$

最後に $f=Pf+\nabla\phi$ と Helmholtz 分解すると、$u\in H$ は勾配場と直交するので

$$
(Pf,u)=(f,u).
$$

したがって

$$
\frac12\frac{d}{dt}\|u\|_2^2
+
\nu\|\nabla u\|_2^2
=
(f,u).
$$
<!-- solution-end -->

### Level B

<a id="ex-ns2-b01"></a>
#### NS2-B01 $L^4$ 補間評価を一から導く
- Level: B

$u\in V$ とし、周期 $L^6$ 評価

$$
\|u\|_6
\le
C\|\nabla u\|_2
$$

を使ってよいとする。

[Hölder の不等式](../F0_00D2D_Lp_Holder_Minkowski/index.md#thm-f0-00d2d-01)だけから

$$
\|u\|_4
\le
C
\|u\|_2^{1/4}
\|\nabla u\|_2^{3/4}
$$

を導け。

<!-- solution-start -->
#### 詳細解答

出発点は

$$
\|u\|_4^4
=
\int|u|^4.
$$

指数 $4$ を

$$
4=1+3
$$

と分けて

$$
\int|u|^4
=
\int|u|\,|u|^3.
$$

[Hölder の不等式](../F0_00D2D_Lp_Holder_Minkowski/index.md#thm-f0-00d2d-01)を指数 $2,2$ で使うと

$$
\int|u|\,|u|^3
\le
\left(\int|u|^2\right)^{1/2}
\left(\int|u|^6\right)^{1/2}.
$$

従って

$$
\|u\|_4^4
\le
\|u\|_2\|u\|_6^3.
$$

周期 $L^6$ 評価を代入して

$$
\|u\|_4^4
\le
C^3
\|u\|_2
\|\nabla u\|_2^3.
$$

4乗根を取れば

$$
\|u\|_4
\le
C^{3/4}
\|u\|_2^{1/4}
\|\nabla u\|_2^{3/4}.
$$

定数を改めて $C$ と書けば結論です。
<!-- solution-end -->

<a id="ex-ns2-b02"></a>
#### NS2-B02 三重線形形式の連続評価
- Level: B

$u,v,w\in V$ とする。

$$
|b(u,v,w)|
\le
C
\|u\|_2^{1/4}
\|\nabla u\|_2^{3/4}
\|\nabla v\|_2
\|w\|_2^{1/4}
\|\nabla w\|_2^{3/4}
$$

を示せ。

<!-- solution-start -->
#### 詳細解答

定義から

$$
|b(u,v,w)|
\le
\int
|u|\,|\nabla v|\,|w|\,dx.
$$

[Hölder の不等式](../F0_00D2D_Lp_Holder_Minkowski/index.md#thm-f0-00d2d-01)を指数

$$
4,\quad2,\quad4
$$

で使います。

実際

$$
\frac14+\frac12+\frac14=1.
$$

従って

$$
|b(u,v,w)|
\le
\|u\|_4
\|\nabla v\|_2
\|w\|_4.
$$

本章の $L^4$ 評価から

$$
\|u\|_4
\le
C
\|u\|_2^{1/4}
\|\nabla u\|_2^{3/4},
$$

$$
\|w\|_4
\le
C
\|w\|_2^{1/4}
\|\nabla w\|_2^{3/4}.
$$

二式を代入すると

$$
|b(u,v,w)|
\le
C
\|u\|_2^{1/4}
\|\nabla u\|_2^{3/4}
\|\nabla v\|_2
\|w\|_2^{1/4}
\|\nabla w\|_2^{3/4}.
$$

これが求める評価です。
<!-- solution-end -->

<a id="ex-ns2-b03"></a>
#### NS2-B03 外力付きエネルギー評価
- Level: B

滑らかな解について

$$
\frac12\frac{d}{dt}\|u\|_2^2
+
\nu\|\nabla u\|_2^2
=
(f,u)
$$

が成り立つとする。

Cauchy--Schwarz、周期 Poincaré、[Young の不等式](../F0_00D2D_Lp_Holder_Minkowski/index.md#lem-f0-00d2d-01)を使い、

$$
\|u(t)\|_2^2
+
\nu\int_0^t\|\nabla u\|_2^2\,ds
\le
\|u(0)\|_2^2
+
\frac1\nu
\int_0^t\|f\|_2^2\,ds
$$

を示せ。

<!-- solution-start -->
#### 詳細解答

Cauchy--Schwarz から

$$
(f,u)
\le
\|f\|_2\|u\|_2.
$$

周期 Poincaré 評価を使うと

$$
\|u\|_2
\le
\|\nabla u\|_2,
$$

したがって

$$
(f,u)
\le
\|f\|_2\|\nabla u\|_2.
$$

[Young の不等式](../F0_00D2D_Lp_Holder_Minkowski/index.md#lem-f0-00d2d-01)

$$
ab
\le
\frac1{2\nu}a^2
+
\frac\nu2b^2
$$

へ

$$
a=\|f\|_2,
\qquad
b=\|\nabla u\|_2
$$

を代入すると

$$
(f,u)
\le
\frac1{2\nu}\|f\|_2^2
+
\frac\nu2\|\nabla u\|_2^2.
$$

よって

$$
\frac12\frac{d}{dt}\|u\|_2^2
+
\frac\nu2\|\nabla u\|_2^2
\le
\frac1{2\nu}\|f\|_2^2.
$$

2倍して

$$
\frac{d}{dt}\|u\|_2^2
+
\nu\|\nabla u\|_2^2
\le
\frac1\nu\|f\|_2^2.
$$

$0$ から $t$ まで積分すれば

$$
\|u(t)\|_2^2
+
\nu\int_0^t\|\nabla u\|_2^2\,ds
\le
\|u(0)\|_2^2
+
\frac1\nu
\int_0^t\|f\|_2^2\,ds.
$$
<!-- solution-end -->

<a id="ex-ns2-b04"></a>
#### NS2-B04 無外力での指数減衰
- Level: B

$f=0$ とする。

1. [滑らかな Navier--Stokes 解のエネルギー恒等式](#thm-ns2-energy-identity)と[周期平均零場の Poincaré 型評価](#prop-ns2-periodic-poincare)から

$$
\frac{d}{dt}\|u\|_2^2
+
2\nu\|u\|_2^2
\le0
$$

を導け。

2. そこから

$$
\|u(t)\|_2
\le
e^{-\nu t}\|u(0)\|_2
$$

を示せ。

<!-- solution-start -->
#### 詳細解答

$f=0$ なら

$$
\frac12\frac{d}{dt}\|u\|_2^2
+
\nu\|\nabla u\|_2^2
=
0.
$$

2倍して

$$
\frac{d}{dt}\|u\|_2^2
+
2\nu\|\nabla u\|_2^2
=
0.
$$

周期 Poincaré 評価から

$$
\|\nabla u\|_2^2
\ge
\|u\|_2^2.
$$

したがって

$$
\frac{d}{dt}\|u\|_2^2
+
2\nu\|u\|_2^2
\le0.
$$

$$
y(t)=\|u(t)\|_2^2
$$

と置けば

$$
y'+2\nu y\le0.
$$

積分因子 $e^{2\nu t}$ を掛けると

$$
\frac{d}{dt}(e^{2\nu t}y(t))\le0.
$$

よって

$$
e^{2\nu t}y(t)\le y(0),
$$

したがって

$$
\|u(t)\|_2^2
\le
e^{-2\nu t}\|u(0)\|_2^2.
$$

両辺の平方根を取ると

$$
\|u(t)\|_2
\le
e^{-\nu t}\|u(0)\|_2.
$$
<!-- solution-end -->

### Level C

<a id="ex-ns2-c01"></a>
#### NS2-C01 Galerkin 近似で必要な一様エネルギー評価
- Level: C

$V_m\subset V$ を有限次元部分空間とし、$u_m:[0,T]\to V_m$ が任意の $v_m\in V_m$ に対して

$$
(\partial_tu_m,v_m)
+
\nu(\nabla u_m,\nabla v_m)
+
b(u_m,u_m,v_m)
=
(f,v_m)
$$

を満たすとする。

初期値を $u_m(0)=u_{0m}$ とする。

1. $v_m=u_m(t)$ を選び、非線形項が消えることを示せ。
2. $m$ に依存しない評価

$$
\sup_{0\le t\le T}
\|u_m(t)\|_2^2
+
\nu
\int_0^T
\|\nabla u_m(t)\|_2^2\,dt
\le
\|u_{0m}\|_2^2
+
\frac1\nu
\int_0^T
\|f(t)\|_2^2\,dt
$$

を導け。
3. $\sup_m\|u_{0m}\|_2<\infty$ なら、$(u_m)$ がどの二つの時空間で一様有界になるか答えよ。
4. この評価だけでは $b(u_m,u_m,v)$ の極限通過が自動でない理由を説明せよ。

<!-- solution-start -->
#### 詳細解答

### 1. 非線形項の相殺

$v_m=u_m(t)$ を選ぶと

$$
(\partial_tu_m,u_m)
+
\nu\|\nabla u_m\|_2^2
+
b(u_m,u_m,u_m)
=
(f,u_m).
$$

$u_m\in V$ なので三重線形形式の相殺から

$$
b(u_m,u_m,u_m)=0.
$$

また有限次元の滑らかな時間依存なので

$$
(\partial_tu_m,u_m)
=
\frac12\frac{d}{dt}\|u_m\|_2^2.
$$

従って

$$
\frac12\frac{d}{dt}\|u_m\|_2^2
+
\nu\|\nabla u_m\|_2^2
=
(f,u_m).
$$

### 2. 次元に依らない評価

Cauchy--Schwarz と周期 Poincaré から

$$
(f,u_m)
\le
\|f\|_2\|u_m\|_2
\le
\|f\|_2\|\nabla u_m\|_2.
$$

[Young の不等式](../F0_00D2D_Lp_Holder_Minkowski/index.md#lem-f0-00d2d-01)より

$$
(f,u_m)
\le
\frac1{2\nu}\|f\|_2^2
+
\frac\nu2\|\nabla u_m\|_2^2.
$$

したがって

$$
\frac{d}{dt}\|u_m\|_2^2
+
\nu\|\nabla u_m\|_2^2
\le
\frac1\nu\|f\|_2^2.
$$

$0$ から $t$ まで積分すると

$$
\|u_m(t)\|_2^2
+
\nu
\int_0^t
\|\nabla u_m(s)\|_2^2\,ds
\le
\|u_{0m}\|_2^2
+
\frac1\nu
\int_0^t
\|f(s)\|_2^2\,ds.
$$

右辺は $t\le T$ で

$$
\|u_{0m}\|_2^2
+
\frac1\nu
\int_0^T
\|f(s)\|_2^2\,ds
$$

以下です。

したがって

$$
\sup_{0\le t\le T}
\|u_m(t)\|_2^2
+
\nu
\int_0^T
\|\nabla u_m\|_2^2\,dt
\le
\|u_{0m}\|_2^2
+
\frac1\nu
\int_0^T
\|f\|_2^2\,dt.
$$

定数に $\dim V_m$ は現れていません。

### 3. 得られる一様有界性

もし

$$
\sup_m\|u_{0m}\|_2<\infty
$$

なら右辺は $m$ に依らず一様有界です。

従って

$$
(u_m)
\quad\text{is bounded in}\quad
L^\infty(0,T;H)
$$

かつ

$$
(u_m)
\quad\text{is bounded in}\quad
L^2(0,T;V).
$$

これがエネルギー階級の一様評価です。

### 4. なぜ非線形極限はまだ自動でないか

上の評価から弱収束部分列は期待できます。

しかし一般に

$$
u_m\rightharpoonup u
$$

だけでは

$$
u_m\otimes u_m
\rightharpoonup
u\otimes u
$$

は従いません。

三重線形形式には $u_m$ が二回現れ、

$$
b(u_m,u_m,v)
$$

は $u_m$ に関して非線形です。

したがって線形項のように弱収束だけで極限を通せません。

NS3 では時間微分の評価と Aubin--Lions 型コンパクト性を使い、

$$
u_m\to u
$$

の強収束を回収して、この非線形項を処理します。
<!-- solution-end -->
