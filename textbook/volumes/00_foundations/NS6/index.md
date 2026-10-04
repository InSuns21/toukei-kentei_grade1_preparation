# NS6 スケーリング・臨界性・どのノルムを見るべきか

NS5 では、三次元 Navier--Stokes 方程式でも短時間なら強解を作れ、最大存在時間が有限なら $H^1$ 制御が破綻することを示しました。一方、NS3 の Leray--Hopf 弱解では $L^2$ エネルギーを全時間で制御できています。

ここで自然な疑問が生まれます。

> $L^2$ エネルギーが全時間で有限なのに、なぜ三次元の大域正則性はそれだけで決まらないのでしょうか。

答えを与える最初の道具は、**空間・時間・速度の大きさを同時に伸縮して方程式を見比べること**です。Navier--Stokes 方程式には、空間を細かく見るとき速度と時間も同時に変える自然な変換があります。その変換の下でノルムが

- 大きくなるのか、
- 変わらないのか、
- 小さくなるのか

を見ると、そのノルムが小スケールの集中をどれだけ捉えるかが分かります。

本章の流れは

$$
\boxed{
\text{方程式の scaling}
\longrightarrow
L^p\text{ scaling}
\longrightarrow
\text{criticality}
\longrightarrow
L_t^qL_x^p
\longrightarrow
\dot H^s
}
$$

です。

最後に

$$
L^2,\qquad
L^3,\qquad
\dot H^{1/2},\qquad
\dot H^1
$$

を同じ尺度表の上へ置き、NS5 の $H^1$ 延長判定と NS7 の正則性判定がどこで接続するかを整理します。

---

## 1. なぜここで周期領域から $\mathbb R^3$ へ移るのか

NS1--NS5 の主な舞台は $\mathbb T^3$ でした。境界を気にせず Fourier 級数を使えるため、局所解・弱解・エネルギー評価を学ぶには非常に都合がよい設定です。

しかし連続な伸縮

$
x\mapsto \lambda x
$

は、一般の $\lambda>0$ に対して同じ周期を保ちません。そこで本章では、この伸縮を正確に扱うために全空間

$$
\mathbb R^3
$$

へ移ります。

考えるのは無外力の非圧縮 Navier--Stokes 方程式

$$
\partial_tu+(u\cdot\nabla)u
=
-\nabla p+\nu\Delta u,
\qquad
\nabla\cdot u=0,
\qquad
\nu>0
$$

です。

外力をいったん外すのは、方程式自身が持つ尺度を最初に純粋な形で見るためです。外力を入れる場合は、外力にも対応する尺度則が必要になります。

---

## 2. Navier--Stokes の尺度変換

空間を $\lambda$ 倍細かく見るとき、時間は拡散方程式と同じく $\lambda^2$ 倍速く見る必要があります。速度と圧力の振幅も同時に変えます。

<a id="def-ns6-scaling"></a>

<!-- formal-statement-start -->
> **定義（Navier--Stokes の尺度変換）**  
> $\lambda>0$ とし、速度 $u$ と圧力 $p$ に対して

$$
u_\lambda(x,t)
:=
\lambda u(\lambda x,\lambda^2t),
$$

$$
p_\lambda(x,t)
:=
\lambda^2p(\lambda x,\lambda^2t)
$$

> と定める。この変換を三次元 Navier--Stokes の尺度変換という。
<!-- formal-statement-end -->

まず初期データだけで、空間集中の形を見ておきます。

<!-- definition-example-start: def-ns6-scaling -->
**定義の確認**

$$
u_0(x)
=
(-2x_2,\,2x_1,\,0)e^{-|x|^2}
$$

とします。各成分を微分すると

$$
\partial_1u_{0,1}
=
4x_1x_2e^{-|x|^2},
$$

$$
\partial_2u_{0,2}
=
-4x_1x_2e^{-|x|^2},
$$

なので

$$
\nabla\cdot u_0=0.
$$

尺度変換した初期値

$$
u_{0,\lambda}(x)
=
\lambda u_0(\lambda x)
$$

では

$$
\nabla\cdot u_{0,\lambda}(x)
=
\lambda^2
(\nabla\cdot u_0)(\lambda x)
=
0.
$$

$\lambda$ が大きいほど、同じ形が空間幅およそ $\lambda^{-1}$ に集中し、速度振幅は $\lambda$ 倍になります。
<!-- definition-example-end -->

この「幅は $\lambda^{-1}$、振幅は $\lambda$」という組合せが、後のノルム指数を決めます。

---

## 3. 全項へ代入して尺度不変性を確認する

「この scaling が自然です」と宣言するだけでは足りません。各項が本当に同じ係数で変わることを[連鎖律](../RA3/index.md#prop-ra3-chain-rule)から確認します。

時間微分は

$$
\begin{aligned}
\partial_tu_\lambda(x,t)
&=
\partial_t
\left[
\lambda u(\lambda x,\lambda^2t)
\right]
\\
&=
\lambda
\lambda^2
(\partial_tu)(\lambda x,\lambda^2t)
\\
&=
\lambda^3
(\partial_tu)(\lambda x,\lambda^2t).
\end{aligned}
$$

空間一階微分は

$$
\partial_j u_\lambda(x,t)
=
\lambda^2
(\partial_j u)(\lambda x,\lambda^2t).
$$

したがって対流項は

$$
\begin{aligned}
(u_\lambda\cdot\nabla)u_\lambda
&=
\sum_{j=1}^3
u_{\lambda,j}\partial_j u_\lambda
\\
&=
\sum_{j=1}^3
\left[
\lambda u_j(\lambda x,\lambda^2t)
\right]
\left[
\lambda^2
(\partial_j u)(\lambda x,\lambda^2t)
\right]
\\
&=
\lambda^3
\bigl((u\cdot\nabla)u\bigr)(\lambda x,\lambda^2t).
\end{aligned}
$$

圧力は

$$
\nabla p_\lambda(x,t)
=
\lambda^3
(\nabla p)(\lambda x,\lambda^2t).
$$

Laplacian は空間微分を2回取るので

$$
\Delta u_\lambda(x,t)
=
\lambda^3
(\Delta u)(\lambda x,\lambda^2t).
$$

発散条件も

$$
\nabla\cdot u_\lambda(x,t)
=
\lambda^2
(\nabla\cdot u)(\lambda x,\lambda^2t)
$$

です。

<a id="prop-ns6-scaling-invariance"></a>

<!-- formal-statement-start -->
> **命題（三次元 Navier--Stokes の尺度不変性）**  
> $(u,p)$ が時間区間 $[0,T]$ 上で無外力三次元非圧縮 Navier--Stokes 方程式の十分滑らかな解なら、任意の $\lambda>0$ に対して $(u_\lambda,p_\lambda)$ は時間区間

$$
0\le t\le \frac{T}{\lambda^2}
$$

> 上で同じ粘性係数 $\nu$ を持つ Navier--Stokes 方程式の解である。
<!-- formal-statement-end -->

### 証明の見取り図

時間微分、対流項、圧力勾配、粘性項のすべてが $\lambda^3$ を持ちます。発散条件は $\lambda^2$ 倍されるだけなので、0 は0のままです。

<!-- proof-start -->
### 証明

元の方程式を点

$$
(\lambda x,\lambda^2t)
$$

で評価すると

$$
(\partial_tu)
+
((u\cdot\nabla)u)
=
-\nabla p
+
\nu\Delta u
$$

です。前節の計算を使えば

$$
\begin{aligned}
&
\partial_tu_\lambda
+
(u_\lambda\cdot\nabla)u_\lambda
+
\nabla p_\lambda
-
\nu\Delta u_\lambda
\\
&=
\lambda^3
\left[
\partial_tu
+
(u\cdot\nabla)u
+
\nabla p
-
\nu\Delta u
\right](\lambda x,\lambda^2t)
\\
&=
0.
\end{aligned}
$$

また

$$
\nabla\cdot u_\lambda
=
\lambda^2
(\nabla\cdot u)(\lambda x,\lambda^2t)
=
0.
$$

元の解が $t\le T$ まで定義されているため

$$
\lambda^2t\le T
$$

すなわち

$$
t\le T/\lambda^2
$$

で尺度変換後の解が定義されます。
<!-- proof-end -->

ここで重要なのは、粘性係数 $\nu$ が変わっていないことです。方程式の主要4項がすべて同じ $\lambda^3$ で変換されるため、Navier--Stokes の非線形輸送と粘性拡散が同じ尺度で競合しています。

---

## 4. $L^p$ ノルムはどう変わるか

固定した時刻 $t$ で

$$
u_\lambda(x,t)
=
\lambda u(\lambda x,\lambda^2t)
$$

を $L^p(\mathbb R^3)$ で測ります。

$1\le p<\infty$ なら

$$
\begin{aligned}
\|u_\lambda(t)\|_p^p
&=
\int_{\mathbb R^3}
|\lambda u(\lambda x,\lambda^2t)|^p\,dx
\\
&=
\lambda^p
\int_{\mathbb R^3}
|u(\lambda x,\lambda^2t)|^p\,dx.
\end{aligned}
$$

ここで

$$
y=\lambda x
$$

と変数変換すると、三次元なので

$$
dy=\lambda^3dx,
\qquad
dx=\lambda^{-3}dy.
$$

したがって

$$
\begin{aligned}
\|u_\lambda(t)\|_p^p
&=
\lambda^{p-3}
\int_{\mathbb R^3}
|u(y,\lambda^2t)|^p\,dy
\\
&=
\lambda^{p-3}
\|u(\lambda^2t)\|_p^p.
\end{aligned}
$$

$p$ 乗根を取れば

$$
\|u_\lambda(t)\|_p
=
\lambda^{1-3/p}
\|u(\lambda^2t)\|_p.
$$

$p=\infty$ では直接

$$
\|u_\lambda(t)\|_\infty
=
\lambda
\|u(\lambda^2t)\|_\infty
$$

なので、同じ式を $3/\infty=0$ と読めます。

<a id="prop-ns6-lp-scaling"></a>

<!-- formal-statement-start -->
> **命題（Lp ノルムの尺度則）**  
> $1\le p\le\infty$ とする。Navier--Stokes の尺度変換に対し

$$
\boxed{
\|u_\lambda(t)\|_{L^p(\mathbb R^3)}
=
\lambda^{1-3/p}
\|u(\lambda^2t)\|_{L^p(\mathbb R^3)}
}
$$

> が成り立つ。
<!-- formal-statement-end -->

この指数

$$
1-\frac3p
$$

が最初の主役です。

---

## 5. 劣臨界・臨界・超臨界を定義する

ここからは $\lambda\to\infty$ を考えます。

これは

$$
u_{0,\lambda}(x)
=
\lambda u_0(\lambda x)
$$

の形で、固定した形を空間幅 $\lambda^{-1}$ へ押し込む高周波集中です。

ノルム $X$ が

$$
\|u_{0,\lambda}\|_X
=
\lambda^\alpha
\|u_0\|_X
$$

と変わるとします。

<a id="def-ns6-criticality"></a>

<!-- formal-statement-start -->
> **定義（尺度に関する劣臨界・臨界・超臨界）**  
> Navier--Stokes の高周波尺度変換 $\lambda\to\infty$ に対し

$$
\|u_{0,\lambda}\|_X
=
\lambda^\alpha
\|u_0\|_X
$$

> とする。
>
> - $\alpha>0$ のとき $X$ を **劣臨界（subcritical）** と呼ぶ。
> - $\alpha=0$ のとき $X$ を **臨界（critical）** と呼ぶ。
> - $\alpha<0$ のとき $X$ を **超臨界（supercritical）** と呼ぶ。
<!-- formal-statement-end -->

<!-- definition-example-start: def-ns6-criticality -->
**定義の確認**

$L^p$ では

$$
\alpha_p
=
1-\frac3p.
$$

したがって

$$
\begin{array}{c|c|c}
p & \alpha_p & \text{分類}\\
\hline
2 & -1/2 & \text{超臨界}\\
3 & 0 & \text{臨界}\\
6 & 1/2 & \text{劣臨界}\\
\infty & 1 & \text{劣臨界}
\end{array}
$$

です。

特に

$$
\boxed{L^3(\mathbb R^3)\text{ は尺度臨界}}
$$

です。
<!-- definition-example-end -->

「supercritical だからノルムが大きい」と考えると符号を取り違えます。本章の定義では、超臨界量は高周波集中に対して **むしろ小さくなる** 量です。

これが危険なのは、小さい空間尺度に速度場が集中しても、そのノルム上界が集中を強く罰しないからです。

---

## 6. なぜ $L^2$ エネルギーだけでは足りないのか

三次元で $p=2$ を代入すると

$$
\|u_\lambda(t)\|_2
=
\lambda^{-1/2}
\|u(\lambda^2t)\|_2.
$$

従って

$$
\|u_\lambda(t)\|_2^2
=
\lambda^{-1}
\|u(\lambda^2t)\|_2^2.
$$

高周波集中 $\lambda\to\infty$ では、$L^2$ エネルギーは小さくなります。

一方、勾配は

$$
\nabla u_\lambda
=
\lambda^2
(\nabla u)(\lambda x,\lambda^2t)
$$

なので

$$
\|\nabla u_\lambda(t)\|_2
=
\lambda^{1/2}
\|\nabla u(\lambda^2t)\|_2.
$$

時間積分まで含めると

$$
\begin{aligned}
\int_0^{T/\lambda^2}
\|\nabla u_\lambda(t)\|_2^2\,dt
&=
\int_0^{T/\lambda^2}
\lambda
\|\nabla u(\lambda^2t)\|_2^2\,dt.
\end{aligned}
$$

ここで

$$
s=\lambda^2t,
\qquad
dt=\lambda^{-2}ds
$$

とすると

$$
\boxed{
\int_0^{T/\lambda^2}
\|\nabla u_\lambda(t)\|_2^2\,dt
=
\lambda^{-1}
\int_0^T
\|\nabla u(s)\|_2^2\,ds.
}
$$

したがってエネルギー恒等式

$$
\frac12\|u(t)\|_2^2
+
\nu\int_0^t\|\nabla u(s)\|_2^2\,ds
=
\frac12\|u_0\|_2^2
$$

の3項はすべて同じ $\lambda^{-1}$ で変換されます。

これはエネルギー法が方程式と矛盾しているという意味ではありません。むしろ **エネルギー恒等式そのものは scaling と完全に整合しています**。

問題は別です。

> 三次元のエネルギー階級そのものが超臨界なので、$L^2$ エネルギーの大域上界だけでは小スケール集中を排除できない。

ここが「弱解は全時間で存在するのに、大域正則性がまだ残る」ことの尺度的な説明です。

---

## 7. 時空間ノルムでは臨界線が現れる

正則性判定では、空間ノルムだけでなく時間積分も使います。

$1\le p,q<\infty$ とし、

$$
\|u\|_{L^q(0,T;L^p)}
=
\left(
\int_0^T
\|u(t)\|_p^q\,dt
\right)^{1/q}
$$

を考えます。

前節の $L^p$ scaling を使うと

$$
\|u_\lambda(t)\|_p^q
=
\lambda^{q(1-3/p)}
\|u(\lambda^2t)\|_p^q.
$$

したがって

$$
\begin{aligned}
&
\|u_\lambda\|_{L^q(0,T/\lambda^2;L^p)}^q
\\
&=
\lambda^{q(1-3/p)}
\int_0^{T/\lambda^2}
\|u(\lambda^2t)\|_p^q\,dt.
\end{aligned}
$$

時間変数を

$$
s=\lambda^2t
$$

と変えると

$$
\begin{aligned}
&
\|u_\lambda\|_{L^q(0,T/\lambda^2;L^p)}^q
\\
&=
\lambda^{q(1-3/p)-2}
\int_0^T
\|u(s)\|_p^q\,ds.
\end{aligned}
$$

$q$ 乗根を取って

$$
\|u_\lambda\|_{L^q_tL^p_x}
=
\lambda^{1-3/p-2/q}
\|u\|_{L^q_tL^p_x}.
$$

<a id="prop-ns6-mixed-scaling"></a>

<!-- formal-statement-start -->
> **命題（時空間 Lq_t Lp_x ノルムの尺度則）**  
> $1\le p,q\le\infty$ とし、尺度変換後は時間区間を $[0,T/\lambda^2]$ とする。このとき

$$
\boxed{
\|u_\lambda\|_{L^q(0,T/\lambda^2;L^p(\mathbb R^3))}
=
\lambda^{1-3/p-2/q}
\|u\|_{L^q(0,T;L^p(\mathbb R^3))}
}
$$

> が成り立つ。
<!-- formal-statement-end -->

尺度不変になる条件は

$$
1-\frac3p-\frac2q=0.
$$

すなわち

$$
\boxed{
\frac2q+\frac3p=1
}
$$

です。

代表例は

$$
(p,q)
=
(3,\infty),
\qquad
(6,4),
\qquad
(\infty,2)
$$

です。

これが NS7 で扱う Prodi--Serrin 型条件の指数関係に現れます。ただし本章ではまだ

> そのノルムが有限なら正則

とは証明していません。ここで示したのは **その指数が方程式の尺度と一致している** という事実です。

---

## 8. Fourier 側で $\dot H^s$ を導入する

$L^p$ 以外にも、微分の量を Fourier 周波数で測ると臨界指数が見えます。

FOU4 と同じ Fourier 規約を三次元へ成分ごとに拡張し、

$$
\widehat u(\xi)
=
\int_{\mathbb R^3}
u(x)e^{-ix\cdot\xi}\,dx
$$

とします。

本章で必要なのは $s=0,1/2,1$ です。まず急減少する滑らかなベクトル値関数から定義します。

<a id="def-ns6-homogeneous-sobolev"></a>

<!-- formal-statement-start -->
> **定義（斉次 Sobolev ノルム）**  
> $0\le s<3/2$ とし、急減少する滑らかなベクトル値関数 $u$ に対して

$$
\boxed{
\|u\|_{\dot H^s(\mathbb R^3)}^2
:=
\frac1{(2\pi)^3}
\int_{\mathbb R^3}
|\xi|^{2s}
|\widehat u(\xi)|^2\,d\xi
}
$$

> と定める。このノルムによる完備化を本章では $\dot H^s(\mathbb R^3)$ と書く。
<!-- formal-statement-end -->

<!-- definition-example-start: def-ns6-homogeneous-sobolev -->
**定義の確認**

$s=0$ なら Plancherel の等式により

$$
\begin{aligned}
\|u\|_{\dot H^0}^2
&=
\frac1{(2\pi)^3}
\int
|\widehat u(\xi)|^2\,d\xi
\\
&=
\int
|u(x)|^2\,dx
\\
&=
\|u\|_2^2.
\end{aligned}
$$

したがって

$$
\dot H^0=L^2
$$

です。

$s=1$ では Fourier 変換の微分則から

$$
\widehat{\partial_j u}(\xi)
=
i\xi_j\widehat u(\xi)
$$

なので

$$
\|u\|_{\dot H^1}^2
=
\|\nabla u\|_2^2.
$$
<!-- definition-example-end -->

ここでは一般の斉次 Sobolev 空間の低周波理論を展開しません。Navier--Stokes の尺度指数を読むために必要な $s=0,1/2,1$ の範囲に集中します。

---

## 9. $\dot H^s$ の尺度指数を Fourier 変換から計算する

固定時刻で

$$
u_\lambda(x)
=
\lambda u(\lambda x)
$$

とします。

Fourier 変換は

$$
\begin{aligned}
\widehat{u_\lambda}(\xi)
&=
\int_{\mathbb R^3}
\lambda u(\lambda x)
e^{-ix\cdot\xi}\,dx.
\end{aligned}
$$

ここで

$$
y=\lambda x,
\qquad
dx=\lambda^{-3}dy
$$

とすると

$$
\begin{aligned}
\widehat{u_\lambda}(\xi)
&=
\lambda^{-2}
\int_{\mathbb R^3}
u(y)
e^{-iy\cdot(\xi/\lambda)}\,dy
\\
&=
\lambda^{-2}
\widehat u(\xi/\lambda).
\end{aligned}
$$

この式を斉次 Sobolev ノルムへ代入します。

$$
\begin{aligned}
\|u_\lambda\|_{\dot H^s}^2
&=
\frac1{(2\pi)^3}
\int
|\xi|^{2s}
\lambda^{-4}
|\widehat u(\xi/\lambda)|^2\,d\xi.
\end{aligned}
$$

さらに

$$
\eta=\xi/\lambda,
\qquad
d\xi=\lambda^3d\eta
$$

と変数変換すると

$$
\begin{aligned}
\|u_\lambda\|_{\dot H^s}^2
&=
\frac1{(2\pi)^3}
\lambda^{2s}
\lambda^{-4}
\lambda^3
\int
|\eta|^{2s}
|\widehat u(\eta)|^2\,d\eta
\\
&=
\lambda^{2s-1}
\|u\|_{\dot H^s}^2.
\end{aligned}
$$

平方根を取れば

$$
\|u_\lambda\|_{\dot H^s}
=
\lambda^{s-1/2}
\|u\|_{\dot H^s}.
$$

<a id="prop-ns6-homogeneous-sobolev-scaling"></a>

<!-- formal-statement-start -->
> **命題（斉次 Sobolev ノルムの尺度則）**  
> $0\le s<3/2$ とする。Navier--Stokes の尺度変換に対して

$$
\boxed{
\|u_\lambda(t)\|_{\dot H^s(\mathbb R^3)}
=
\lambda^{s-1/2}
\|u(\lambda^2t)\|_{\dot H^s(\mathbb R^3)}
}
$$

> が成り立つ。
<!-- formal-statement-end -->

したがって

$$
s=\frac12
$$

で指数が0になり、

$$
\boxed{
\dot H^{1/2}(\mathbb R^3)
\text{ は尺度臨界}
}
$$

です。

一方

$$
\dot H^0=L^2
$$

は指数 $-1/2$ で超臨界、

$$
\dot H^1
$$

は指数 $1/2$ で劣臨界です。

---

## 10. NS5 の $H^1$ はなぜ局所存在を作りやすいのか

NS5 では

$$
\|\nabla u\|_2
$$

を制御して局所強解を構成しました。

斉次 $H^1$ の尺度則は

$$
\|\nabla u_\lambda\|_2
=
\lambda^{1/2}
\|\nabla u\|_2.
$$

高周波集中 $\lambda\to\infty$ でノルムが増えるので、これは劣臨界量です。

劣臨界量は小スケール集中を強く罰します。したがって、その量を有限に保てる時間区間では局所解を制御しやすい、という方向性が見えます。

しかし NS5 で得た微分不等式は

$$
y'(t)
\le
C_\nu y(t)^3,
\qquad
y(t)=\|\nabla u(t)\|_2^2
$$

でした。

尺度の観点から「$H^1$ は強い量だ」と分かっても、その量を **全時間で有限に保つ事前評価** が自動的に得られるわけではありません。

尺度解析は証明の代わりではありません。

---

## 11. 重要な4つの量を同じ表に置く

ここまでの尺度指数をまとめます。

$$
\begin{array}{c|c|c}
\text{量} & \text{尺度指数} & \text{分類}\\
\hline
L^2 & -1/2 & \text{超臨界}\\
L^3 & 0 & \text{臨界}\\
\dot H^{1/2} & 0 & \text{臨界}\\
\dot H^1 & 1/2 & \text{劣臨界}
\end{array}
$$

この表から三次元 Navier--Stokes の構図がかなり見えるようになります。

### $L^2$

大域弱解で全時間制御できます。しかし超臨界なので、高周波集中を排除するには弱すぎる可能性があります。

### $L^3$

尺度臨界です。空間集中を拡大してもノルムが変わりません。正則性問題の自然な境界量の一つです。

### $\dot H^{1/2}$

微分量としての尺度臨界です。$L^3$ と同じ scaling を持ちますが、同じ空間ではありません。

### $\dot H^1$

劣臨界です。NS5 の局所強解ではこの階級を制御します。しかし大域制御が閉じることはまだ証明できていません。

---

## 12. 「臨界」は正則性定理そのものではない

尺度解析から分かるのは

> どの量が方程式の自然な小スケールと釣り合っているか

です。

一方、正則性定理に必要なのは

> その量が有限なら、非線形項を実際にどう評価して解の延長へつなげるか

という解析です。

たとえば

$$
u\in L^q(0,T;L^p(\mathbb R^3)),
\qquad
\frac2q+\frac3p=1
$$

は尺度臨界です。

しかし scaling の式だけから

$$
u\text{ は正則}
$$

とは言えません。

NS7 では、差分エネルギーや非線形項評価へこの時空間積分可能性を実際に代入し、

$$
\text{臨界な量が有限}
\Longrightarrow
\text{延長可能}
$$

という正則性判定の機構へ進みます。

本章の役割は、その前に

$$
\boxed{
\text{なぜその指数を見るのか}
}
$$

を自力で導けるようにすることです。

---

# 演習

## Level A

### A1. 方程式の各項の尺度

$u_\lambda(x,t)=\lambda u(\lambda x,\lambda^2t)$、$p_\lambda(x,t)=\lambda^2p(\lambda x,\lambda^2t)$ とする。次を直接計算せよ。

1. $\partial_tu_\lambda$
2. $(u_\lambda\cdot\nabla)u_\lambda$
3. $\nabla p_\lambda$
4. $\Delta u_\lambda$
5. $\nabla\cdot u_\lambda$

- Level: A

<!-- solution-start -->
### 詳細解答

時間微分では $t$ が $\lambda^2t$ に入っているので、[連鎖律](../RA3/index.md#prop-ra3-chain-rule)から

$$
\partial_tu_\lambda
=
\lambda
\lambda^2
(\partial_tu)(\lambda x,\lambda^2t)
=
\lambda^3
(\partial_tu)(\lambda x,\lambda^2t).
$$

空間微分は

$$
\partial_j u_\lambda
=
\lambda^2
(\partial_j u)(\lambda x,\lambda^2t).
$$

したがって

$$
\begin{aligned}
(u_\lambda\cdot\nabla)u_\lambda
&=
\sum_j
u_{\lambda,j}\partial_j u_\lambda
\\
&=
\sum_j
\lambda u_j
\lambda^2\partial_j u
\\
&=
\lambda^3
((u\cdot\nabla)u)(\lambda x,\lambda^2t).
\end{aligned}
$$

圧力は

$$
\nabla p_\lambda
=
\lambda^2\lambda
(\nabla p)(\lambda x,\lambda^2t)
=
\lambda^3
(\nabla p)(\lambda x,\lambda^2t).
$$

Laplacian は空間微分を2回取るので

$$
\Delta u_\lambda
=
\lambda^3
(\Delta u)(\lambda x,\lambda^2t).
$$

発散は一階微分なので

$$
\nabla\cdot u_\lambda
=
\lambda^2
(\nabla\cdot u)(\lambda x,\lambda^2t).
$$

従って方程式の主要4項はすべて $\lambda^3$、発散条件は $\lambda^2$ で変換されます。
<!-- solution-end -->

### A2. $L^2,L^3,L^6$ の分類

三次元で

$$
\|u_\lambda\|_p
=
\lambda^{1-3/p}\|u\|_p
$$

を使い、$p=2,3,6$ の尺度指数を求め、劣臨界・臨界・超臨界を判定せよ。

- Level: A

<!-- solution-start -->
### 詳細解答

$p=2$ では

$$
1-\frac32
=
-\frac12.
$$

指数が負なので $L^2$ は超臨界です。

$p=3$ では

$$
1-\frac33
=
0.
$$

したがって $L^3$ は臨界です。

$p=6$ では

$$
1-\frac36
=
\frac12.
$$

指数が正なので $L^6$ は劣臨界です。

従って

$$
\boxed{
L^2:\text{超臨界},
\quad
L^3:\text{臨界},
\quad
L^6:\text{劣臨界}
}
$$

です。
<!-- solution-end -->

### A3. 時空間ノルムの尺度指数

次の時空間ノルムの尺度指数

$$
1-\frac3p-\frac2q
$$

を求め、分類せよ。

1. $L_t^\infty L_x^3$
2. $L_t^4L_x^6$
3. $L_t^2L_x^\infty$
4. $L_t^4L_x^4$

- Level: A

<!-- solution-start -->
### 詳細解答

$L_t^\infty L_x^3$ では

$$
1-\frac33-\frac2\infty
=
1-1-0
=
0.
$$

よって臨界です。

$L_t^4L_x^6$ では

$$
1-\frac36-\frac24
=
1-\frac12-\frac12
=
0.
$$

これも臨界です。

$L_t^2L_x^\infty$ では

$$
1-\frac3\infty-\frac22
=
1-0-1
=
0.
$$

これも臨界です。

$L_t^4L_x^4$ では

$$
1-\frac34-\frac24
=
1-\frac34-\frac12
=
-\frac14.
$$

指数が負なので超臨界です。

したがって最初の3つは臨界線

$$
\frac2q+\frac3p=1
$$

上にあり、最後だけ超臨界です。
<!-- solution-end -->

### A4. エネルギーと散逸

尺度変換に対して

$$
\|u_\lambda(t)\|_2^2
$$

と

$$
\int_0^{T/\lambda^2}
\|\nabla u_\lambda(t)\|_2^2\,dt
$$

がともに $\lambda^{-1}$ 倍されることを示せ。

- Level: A

<!-- solution-start -->
### 詳細解答

$L^2$ scaling は

$$
\|u_\lambda(t)\|_2
=
\lambda^{-1/2}
\|u(\lambda^2t)\|_2.
$$

したがって

$$
\|u_\lambda(t)\|_2^2
=
\lambda^{-1}
\|u(\lambda^2t)\|_2^2.
$$

一方

$$
\nabla u_\lambda
=
\lambda^2
(\nabla u)(\lambda x,\lambda^2t)
$$

なので、三次元 $L^2$ ノルムでは

$$
\|\nabla u_\lambda(t)\|_2
=
\lambda^{2-3/2}
\|\nabla u(\lambda^2t)\|_2
=
\lambda^{1/2}
\|\nabla u(\lambda^2t)\|_2.
$$

従って

$$
\|\nabla u_\lambda(t)\|_2^2
=
\lambda
\|\nabla u(\lambda^2t)\|_2^2.
$$

時間積分すると

$$
\begin{aligned}
\int_0^{T/\lambda^2}
\|\nabla u_\lambda(t)\|_2^2\,dt
&=
\int_0^{T/\lambda^2}
\lambda
\|\nabla u(\lambda^2t)\|_2^2\,dt.
\end{aligned}
$$

$s=\lambda^2t$ と置けば $dt=\lambda^{-2}ds$ なので

$$
\begin{aligned}
\int_0^{T/\lambda^2}
\|\nabla u_\lambda(t)\|_2^2\,dt
&=
\lambda^{-1}
\int_0^T
\|\nabla u(s)\|_2^2\,ds.
\end{aligned}
$$

よって両方とも $\lambda^{-1}$ 倍です。
<!-- solution-end -->

### A5. $\dot H^s$ の3つの指数

$$
\|u_\lambda\|_{\dot H^s}
=
\lambda^{s-1/2}
\|u\|_{\dot H^s}
$$

を使い、$s=0,1/2,1$ の尺度指数と分類を求めよ。

- Level: A

<!-- solution-start -->
### 詳細解答

$s=0$ では

$$
s-\frac12
=
-\frac12,
$$

なので $\dot H^0=L^2$ は超臨界です。

$s=1/2$ では

$$
s-\frac12=0,
$$

なので $\dot H^{1/2}$ は臨界です。

$s=1$ では

$$
s-\frac12
=
\frac12,
$$

なので $\dot H^1$ は劣臨界です。

まとめると

$$
\boxed{
\dot H^0:\text{超臨界},
\quad
\dot H^{1/2}:\text{臨界},
\quad
\dot H^1:\text{劣臨界}
}
$$

です。
<!-- solution-end -->

## Level B

### B1. $d$ 次元での臨界指数

形式的に $d$ 次元 Navier--Stokes で同じ尺度変換

$$
u_\lambda(x,t)
=
\lambda u(\lambda x,\lambda^2t)
$$

を考える。

1. $L^p(\mathbb R^d)$ の尺度指数を求めよ。
2. 臨界 Lebesgue 指数を求めよ。
3. $\dot H^s(\mathbb R^d)$ の尺度指数を求めよ。
4. 臨界 Sobolev 指数を求めよ。

- Level: B

<!-- solution-start -->
### 詳細解答

$d$ 次元では変数変換 $y=\lambda x$ に対して

$$
dx=\lambda^{-d}dy
$$

です。

したがって

$$
\begin{aligned}
\|u_\lambda\|_p^p
&=
\int
|\lambda u(\lambda x)|^p\,dx
\\
&=
\lambda^p
\lambda^{-d}
\int|u(y)|^p\,dy
\\
&=
\lambda^{p-d}
\|u\|_p^p.
\end{aligned}
$$

よって

$$
\boxed{
\|u_\lambda\|_p
=
\lambda^{1-d/p}
\|u\|_p.
}
$$

臨界条件は指数0なので

$$
1-\frac dp=0.
$$

従って

$$
\boxed{p=d.}
$$

次に Fourier 変換は

$$
\widehat{u_\lambda}(\xi)
=
\lambda^{1-d}
\widehat u(\xi/\lambda)
$$

です。

斉次 Sobolev ノルムの平方は

$$
\int
|\xi|^{2s}
|\widehat{u_\lambda}(\xi)|^2\,d\xi.
$$

$\eta=\xi/\lambda$ と置くと

$$
d\xi=\lambda^d d\eta
$$

なので全体の係数は

$$
\lambda^{2s}
\lambda^{2(1-d)}
\lambda^d
=
\lambda^{2s+2-d}.
$$

従ってノルムでは

$$
\boxed{
\|u_\lambda\|_{\dot H^s}
=
\lambda^{s+1-d/2}
\|u\|_{\dot H^s}.
}
$$

臨界条件は

$$
s+1-\frac d2=0
$$

なので

$$
\boxed{
s=\frac d2-1.
}
$$

三次元 $d=3$ では

$$
p=3,
\qquad
s=\frac12
$$

が回収されます。
<!-- solution-end -->

### B2. 微分を含む $L^p$ 量

整数 $m\ge0$ について

$$
\|\nabla^m u_\lambda\|_{L^p}
$$

の尺度指数を求めよ。また、その量が臨界になる条件を $m,p$ で表せ。

- Level: B

<!-- solution-start -->
### 詳細解答

$u_\lambda$ 自体が振幅 $\lambda$ を持ち、空間微分を1回取るごとに[連鎖律](../RA3/index.md#prop-ra3-chain-rule)からさらに $\lambda$ が1個増えます。

従って

$$
\nabla^m u_\lambda(x)
=
\lambda^{m+1}
(\nabla^m u)(\lambda x).
$$

三次元 $L^p$ ノルムでは変数変換によって $\lambda^{-3/p}$ が加わるので

$$
\boxed{
\|\nabla^m u_\lambda\|_p
=
\lambda^{m+1-3/p}
\|\nabla^m u\|_p.
}
$$

臨界条件は指数0ですから

$$
m+1-\frac3p=0.
$$

よって

$$
\boxed{
\frac3p=m+1.
}
$$

例えば $m=0$ なら $p=3$ です。

$m=1$ なら

$$
\frac3p=2
$$

なので

$$
p=\frac32.
$$

従って $\|\nabla u\|_{3/2}$ は形式上の臨界量です。
<!-- solution-end -->

### B3. 集中列は $L^2$ を小さくできる

非零の滑らかな発散零初期値 $u_0$ を取り、

$$
u_0^{(n)}(x)
=
n u_0(nx)
$$

とする。

1. $\|u_0^{(n)}\|_2$ の極限を求めよ。
2. $\|u_0^{(n)}\|_3$ を求めよ。
3. $\|u_0^{(n)}\|_{\dot H^{1/2}}$ を求めよ。
4. $\|u_0^{(n)}\|_{\dot H^1}$ の挙動を求めよ。
5. この計算が $L^2$ エネルギーの超臨界性について何を示すか説明せよ。

- Level: B

<!-- solution-start -->
### 詳細解答

これは尺度変換で $\lambda=n$ としたものです。

$L^2$ では尺度指数が $-1/2$ なので

$$
\|u_0^{(n)}\|_2
=
n^{-1/2}\|u_0\|_2.
$$

したがって

$$
\boxed{
\|u_0^{(n)}\|_2\to0.
}
$$

$L^3$ は臨界なので

$$
\boxed{
\|u_0^{(n)}\|_3
=
\|u_0\|_3.
}
$$

$\dot H^{1/2}$ も臨界なので

$$
\boxed{
\|u_0^{(n)}\|_{\dot H^{1/2}}
=
\|u_0\|_{\dot H^{1/2}}.
}
$$

$\dot H^1$ の尺度指数は $1/2$ なので

$$
\|u_0^{(n)}\|_{\dot H^1}
=
n^{1/2}
\|u_0\|_{\dot H^1}.
$$

非零の $u_0$ なら

$$
\boxed{
\|u_0^{(n)}\|_{\dot H^1}\to\infty.
}
$$

この列は空間幅およそ $1/n$ へ集中しています。それにもかかわらず $L^2$ ノルムは0へ近づきます。

したがって、$L^2$ 上界だけを知っていても

$$
\text{小スケール集中が起きていない}
$$

とは言えません。

一方、臨界な $L^3$ と $\dot H^{1/2}$ は集中の前後で大きさを変えず、$\dot H^1$ は集中を強く検出して増大します。
<!-- solution-end -->

### B4. 臨界線上の $q$ を $p$ から求める

$$
\frac2q+\frac3p=1
$$

を満たす $q$ を $p$ で表せ。

1. $p>3$ の場合に $q$ を求めよ。
2. $p=3$ の端点を求めよ。
3. $p=4,6,\infty$ に対応する $q$ を求めよ。

- Level: B

<!-- solution-start -->
### 詳細解答

$p>3$ なら

$$
\frac2q
=
1-\frac3p
=
\frac{p-3}{p}.
$$

従って

$$
\boxed{
q
=
\frac{2p}{p-3}.
}
$$

$p=3$ では

$$
\frac2q+1=1
$$

なので

$$
\frac2q=0.
$$

従って

$$
\boxed{q=\infty.}
$$

$p=4$ では

$$
q
=
\frac{2\cdot4}{4-3}
=
8.
$$

$p=6$ では

$$
q
=
\frac{12}{3}
=
4.
$$

$p=\infty$ では直接

$$
\frac2q=1
$$

なので

$$
q=2.
$$

よって代表的な臨界組は

$$
(p,q)
=
(3,\infty),
(4,8),
(6,4),
(\infty,2)
$$

です。
<!-- solution-end -->

## Level C

### C1. エネルギーが小さい集中列と臨界量

非零の滑らかな発散零ベクトル場 $u_0$ に対し

$$
u_{0,\lambda}(x)
=
\lambda u_0(\lambda x),
\qquad
\lambda\ge1
$$

を考える。

1. $L^2$、$L^3$、$\dot H^{1/2}$、$\dot H^1$ の4つのノルムの尺度則を一つの表にまとめよ。
2. $\lambda\to\infty$ で、$L^2$ が0へ行く一方、2つの臨界量が一定、$\dot H^1$ が発散することを示せ。
3. 「Leray--Hopf 弱解で $L^2$ エネルギーが全時間制御される」という事実だけから、なぜこの種の小スケール集中を排除できないか説明せよ。
4. この計算だけでは有限時間特異点の存在も、$L^3$ や $\dot H^{1/2}$ の正則性判定も証明していない理由を説明せよ。

- Level: C

<!-- solution-start -->
### 詳細解答

まず各尺度則を書きます。

$L^2$ は

$$
\|u_{0,\lambda}\|_2
=
\lambda^{-1/2}
\|u_0\|_2.
$$

$L^3$ は

$$
\|u_{0,\lambda}\|_3
=
\|u_0\|_3.
$$

$\dot H^{1/2}$ は

$$
\|u_{0,\lambda}\|_{\dot H^{1/2}}
=
\|u_0\|_{\dot H^{1/2}}.
$$

$\dot H^1$ は

$$
\|u_{0,\lambda}\|_{\dot H^1}
=
\lambda^{1/2}
\|u_0\|_{\dot H^1}.
$$

従って表にすると

$$
\begin{array}{c|c|c}
\text{量}
&
\text{尺度因子}
&
\lambda\to\infty
\\
\hline
L^2
&
\lambda^{-1/2}
&
0
\\
L^3
&
1
&
\text{一定}
\\
\dot H^{1/2}
&
1
&
\text{一定}
\\
\dot H^1
&
\lambda^{1/2}
&
\infty
\end{array}
$$

です。

この family は

$$
u_{0,\lambda}(x)
=
\lambda u_0(\lambda x)
$$

なので、元の形を空間幅 $\lambda^{-1}$ に圧縮しています。$\lambda\to\infty$ は任意に小さい空間尺度への集中です。

それにもかかわらず

$$
\|u_{0,\lambda}\|_2\to0.
$$

したがって $L^2$ エネルギー上界は、この scaling family の集中を強く検出しません。

Leray--Hopf 弱解について

$$
\sup_t\|u(t)\|_2^2
+
2\nu
\int_0^T
\|\nabla u(t)\|_2^2dt
\le
\|u_0\|_2^2
$$

を持っていても、その事実だけから

$$
\text{速度場が小スケールへ集中しない}
$$

とは結論できません。尺度上、$L^2$ は超臨界だからです。

一方

$$
L^3,
\qquad
\dot H^{1/2}
$$

は集中前後で大きさが変わりません。したがって、方程式の小スケールと釣り合う自然な候補です。

しかしここで分かったのは **尺度だけ** です。

この計算は

$$
\text{実際の Navier--Stokes 解が有限時間に集中する}
$$

ことを示していません。任意の初期データを人工的に尺度変換した family を比較しただけです。

また

$$
\|u\|_{L^\infty_tL^3_x}<\infty
$$

や

$$
\|u\|_{L^\infty_t\dot H^{1/2}_x}<\infty
$$

から正則性が従うかどうかは、非線形項を具体的に評価し、延長定理へつなぐ別の解析を必要とします。

従って結論は

$$
\boxed{
\text{scaling は「見るべき量」を教えるが、正則性定理そのものではない}
}
$$

です。

この次の NS7 で、臨界な時空間条件を実際のエネルギー評価へ入れて正則性判定へ進みます。
<!-- solution-end -->
