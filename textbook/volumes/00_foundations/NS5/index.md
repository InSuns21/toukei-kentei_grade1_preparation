# NS5 三次元局所強解・一意性・有限時間発散判定

NS3 では、三次元周期 Navier--Stokes 方程式に対して Leray--Hopf 弱解を全時間で構成しました。NS4 では二次元へ移ると渦度の $L^2$ エネルギーが閉じ、速度の $H^1$ ノルムを全時間で制御できることを見ました。

三次元へ戻ると、同じ大域評価は得られません。ただし「三次元では何も分からない」わけでもありません。初期速度が一階微分まで有限なら、短い時間では

$$
u\in C([0,T];V)\cap L^2(0,T;D(A))
$$

という強い解を作れ、その解は一意です。

問題は、その短時間解を任意の時刻まで延長できるかです。本章では

$$
\boxed{
\text{局所強解}
\longrightarrow
H^1\text{ エネルギー}
\longrightarrow
y'\le C y^3
\longrightarrow
\text{最大存在時間}
\longrightarrow
\text{有限時間発散選択肢}
}
$$

という一本の流れを追います。

中心となる量は

$$
y(t)=\|\nabla u(t)\|_2^2.
$$

三次元では、この量に対して三次の微分不等式までしか得られません。これは短時間制御には十分ですが、有限時間発散を排除する大域一様上界にはなりません。

さらに、強解が存在している時間区間では Leray--Hopf 弱解もその強解と一致することを示します。三次元の難しさが「局所的な存在・一意性」ではなく、「強い制御を全時間で維持できるか」にあることを式で確認します。

---

## 1. 三次元で強解とは何か

舞台は

$$
\mathbb T^3=(-\pi,\pi]^3
$$

です。NS1 の平均零・発散零空間を $H$、NS2 の

$$
V=H^1(\mathbb T^3;\mathbb R^3)\cap H
$$

を使います。

NS1 の Stokes 作用素は周期発散零場上で

$$
Au=-\Delta u
$$

です。Fourier 表示から

$$
D(A)=H^2(\mathbb T^3;\mathbb R^3)\cap H
$$

とみなせ、

$$
\|Au\|_2^2
=
(2\pi)^3\sum_{k\ne0}|k|^4|\widehat u(k)|^2
$$

です。

弱解では $u$ と一階微分までしか時間積分可能とは限りませんでした。強解ではもう一階上げて、$Au$ まで $L^2$ で持つことを要求します。

<a id="def-ns5-strong-solution"></a>

<!-- formal-statement-start -->
> **定義（三次元周期 Navier--Stokes の強解）**  
> $T>0$、$\nu>0$、
>
$$
u_0\in V,
\qquad
f\in L^2(0,T;H)
$$
>
> とする。関数 $u:[0,T]\to V$ が強解であるとは、
>
$$
u\in C([0,T];V)\cap L^2(0,T;D(A)),
$$
>
$$
\partial_tu\in L^2(0,T;H)
$$
>
> を満たし、ほとんどすべての $t\in(0,T)$ で
>
$$
\boxed{
\partial_tu+\nu Au+B(u,u)=f
\quad\text{in }H
}
$$
>
> が成り立ち、さらに
>
$$
u(0)=u_0
\quad\text{in }V
$$
>
> を満たすことをいう。
<!-- formal-statement-end -->

<!-- definition-example-start: def-ns5-strong-solution -->
**定義の確認**

無外力 $f=0$ とし、

$$
u_0(x)=(\sin x_2,0,0),
\qquad
u(t,x)=e^{-\nu t}(\sin x_2,0,0)
$$

とします。

この場は平均零かつ発散零です。また

$$
(u\cdot\nabla)u
=
e^{-\nu t}\sin x_2\,\partial_1u
=
0.
$$

さらに

$$
Au=-\Delta u=u.
$$

したがって

$$
\partial_tu+\nu Au
=
-\nu u+\nu u
=
0.
$$

各時刻で $u(t)$ は滑らかなので $D(A)$ に属し、

$$
\int_0^T\|Au(t)\|_2^2\,dt
=
\|u_0\|_2^2
\int_0^T e^{-2\nu t}\,dt
<\infty.
$$

同様に $\partial_tu=-\nu u\in L^2(0,T;H)$ です。よってこの解は任意の有限 $T$ で強解です。
<!-- definition-example-end -->

この例では非線形項が0なので大域的に滑らかです。一般の三次元速度場では、非線形項を $H^1$ 階級で制御する必要があります。

---

## 2. 一階微分エネルギーを取る

射影後の方程式

$$
\partial_tu+\nu Au+B(u,u)=f
$$

を考えます。

$L^2$ エネルギーでは $u$ と内積を取りました。$H^1$ エネルギーでは一階微分の大きさを測るため、$Au$ と内積を取ります。

周期 Fourier 表示では

$$
(Au,u)=\|\nabla u\|_2^2.
$$

従って十分滑らかな解では

$$
(\partial_tu,Au)
=
\frac12\frac{d}{dt}\|\nabla u\|_2^2
$$

です。粘性項は

$$
\nu(Au,Au)=\nu\|Au\|_2^2.
$$

よって

$$
\boxed{
\frac12\frac{d}{dt}\|\nabla u\|_2^2
+
\nu\|Au\|_2^2
=
-b(u,u,Au)
+
(f,Au)
}
$$

を得ます。

二次元では渦度方程式に移ると、同じ階級の対流項がエネルギーから消えました。三次元では

$$
b(u,u,Au)
$$

が残ります。ここが最初の分岐です。

---

## 3. 非線形項を $L^6$-$L^3$-$L^2$ へ分ける

[Hölder の不等式](../F0_00D2D_Lp_Holder_Minkowski/index.md#thm-f0-00d2d-01)により

$$
|b(u,u,Au)|
\le
\|u\|_6
\|\nabla u\|_3
\|Au\|_2.
$$

NS2 の三次元周期 Sobolev 評価から

$$
\|u\|_6\le C\|\nabla u\|_2.
$$

残る $\|\nabla u\|_3$ を $L^2$ と $L^6$ の間で補間します。

$$
\|\nabla u\|_3^3
=
\int
|\nabla u|^{3/2}
|\nabla u|^{3/2}.
$$

[Hölder の不等式](../F0_00D2D_Lp_Holder_Minkowski/index.md#thm-f0-00d2d-01)を指数 $4/3$ と $4$ で使うと

$$
\begin{aligned}
\|\nabla u\|_3^3
&\le
\left(
\int |\nabla u|^2
\right)^{3/4}
\left(
\int |\nabla u|^6
\right)^{1/4}
\\
&=
\|\nabla u\|_2^{3/2}
\|\nabla u\|_6^{3/2}.
\end{aligned}
$$

三乗根を取れば

$$
\|\nabla u\|_3
\le
\|\nabla u\|_2^{1/2}
\|\nabla u\|_6^{1/2}.
$$

さらに $\nabla u$ の各成分は周期平均が0なので、NS2 と同じ周期 Sobolev 評価を適用でき、

$$
\|\nabla u\|_6
\le
C\|D^2u\|_2.
$$

Fourier 表示では

$$
\begin{aligned}
\|D^2u\|_2^2
&=
(2\pi)^3
\sum_{k\ne0}
\left(
\sum_{j,\ell=1}^3 k_j^2k_\ell^2
\right)
|\widehat u(k)|^2
\\
&=
(2\pi)^3
\sum_{k\ne0}|k|^4|\widehat u(k)|^2
=
\|Au\|_2^2.
\end{aligned}
$$

従って

$$
\|\nabla u\|_6
\le
C\|Au\|_2.
$$

以上をつなぐと

$$
\begin{aligned}
|b(u,u,Au)|
&\le
\|u\|_6\|\nabla u\|_3\|Au\|_2
\\
&\le
C\|\nabla u\|_2
\left(
\|\nabla u\|_2^{1/2}
\|Au\|_2^{1/2}
\right)
\|Au\|_2
\\
&=
C
\|\nabla u\|_2^{3/2}
\|Au\|_2^{3/2}.
\end{aligned}
$$

<a id="prop-ns5-h1-nonlinear"></a>

<!-- formal-statement-start -->
> **命題（三次元 H1 エネルギーでの非線形項評価）**  
> 定数 $C>0$ が存在し、任意の $u\in D(A)$ に対して
>
$$
\boxed{
|b(u,u,Au)|
\le
C
\|\nabla u\|_2^{3/2}
\|Au\|_2^{3/2}
}
$$
>
> が成り立つ。
<!-- formal-statement-end -->

この $3/2$ と $3/2$ が、次の三次微分不等式を生みます。

---

## 4. [Young の不等式](../F0_00D2D_Lp_Holder_Minkowski/index.md#lem-f0-00d2d-01)で $y'\le C y^3$ を作る

非線形評価で

$$
X=\|Au\|_2^{3/2},
\qquad
Y=C\|\nabla u\|_2^{3/2}
$$

と置きます。

共役指数を

$$
p=\frac43,
\qquad
q=4
$$

とすると

$$
X^p=\|Au\|_2^2,
\qquad
Y^q=C^4\|\nabla u\|_2^6.
$$

係数付き [Young の不等式](../F0_00D2D_Lp_Holder_Minkowski/index.md#lem-f0-00d2d-01)から

$$
|b(u,u,Au)|
\le
\frac{\nu}{4}\|Au\|_2^2
+
C_\nu\|\nabla u\|_2^6.
$$

外力項も

$$
|(f,Au)|
\le
\frac{\nu}{4}\|Au\|_2^2
+
\frac1\nu\|f\|_2^2.
$$

従って

$$
\frac12\frac{d}{dt}\|\nabla u\|_2^2
+
\frac{\nu}{2}\|Au\|_2^2
\le
C_\nu\|\nabla u\|_2^6
+
\frac1\nu\|f\|_2^2.
$$

$$
y(t)=\|\nabla u(t)\|_2^2
$$

と置き、定数をまとめれば

$$
\boxed{
y'(t)
+
\nu\|Au(t)\|_2^2
\le
C_\nu y(t)^3
+
\frac2\nu\|f(t)\|_2^2
}
$$

です。

無外力なら

$$
y'(t)\le C_\nu y(t)^3.
$$

比較方程式

$$
z'=C_\nu z^3,
\qquad
z(0)=y_0
$$

を解くと

$$
z(t)
=
\frac{y_0}{
\sqrt{1-2C_\nu y_0^2t}
}.
$$

この上界は

$$
t<
\frac1{2C_\nu y_0^2}
$$

の範囲で有限です。

重要なのは、比較方程式が発散する時刻を Navier--Stokes 解の発散時刻と取り違えないことです。ここから分かるのは

> この $H^1$ 評価だけでも短時間なら制御できる。しかし任意時間にわたる一様上界は得られない。

ということです。

---

## 5. Galerkin 解を短時間 $H^1$ で止める

NS3 の Fourier--Galerkin 近似

$$
u_m(t)
=
\sum_{j=1}^m d_j^{(m)}(t)w_j,
\qquad
u_m(0)=P_mu_0
$$

を使います。

有限次元なので $Au_m$ を試験関数にでき、前節と同じ計算から

$$
y_m'(t)
+
\nu\|Au_m(t)\|_2^2
\le
C_\nu y_m(t)^3
+
\frac2\nu\|f(t)\|_2^2,
$$

$$
y_m(t)=\|\nabla u_m(t)\|_2^2
$$

を得ます。

初期値は

$$
y_m(0)
=
\|\nabla P_mu_0\|_2^2
\le
\|\nabla u_0\|_2^2
=:y_0.
$$

$$
K=2(y_0+1)
$$

と置きます。

$f\in L^2_{\mathrm{loc}}([0,\infty);H)$ なので、十分小さい $T_*>0$ を選んで

$$
\frac2\nu
\int_0^{T_*}\|f(t)\|_2^2\,dt
\le
\frac{y_0+1}{4}
$$

かつ

$$
C_\nu T_*K^3
\le
\frac{y_0+1}{4}
$$

とできます。

もし $y_m$ が初めて $K$ に達する時刻 $\tau\le T_*$ を持つなら、それ以前では $y_m(t)\le K$ なので

$$
\begin{aligned}
K=y_m(\tau)
&\le
y_0
+
C_\nu\int_0^\tau y_m(t)^3\,dt
+
\frac2\nu\int_0^\tau\|f(t)\|_2^2\,dt
\\
&\le
y_0
+
C_\nu T_*K^3
+
\frac2\nu\int_0^{T_*}\|f(t)\|_2^2\,dt
\\
&\le
y_0+\frac{y_0+1}{2}
<
2(y_0+1)
=
K.
\end{aligned}
$$

矛盾です。

従って

$$
\boxed{
\sup_m\sup_{0\le t\le T_*}
\|\nabla u_m(t)\|_2^2
\le
K
}
$$

です。

さらに微分不等式を積分すれば

$$
\boxed{
\sup_m
\int_0^{T_*}
\|Au_m(t)\|_2^2\,dt
<\infty.
}
$$

この短時間一様評価が局所存在の土台です。

---

## 6. 時間微分も $L^2_tH$ で制御できる

Galerkin 方程式から

$$
\partial_tu_m
=
-\nu Au_m
-
P_mB(u_m,u_m)
+
P_mf.
$$

$Au_m$ と $f$ はすでに $L^2_tH$ です。

非線形項について

$$
\begin{aligned}
\|B(u,u)\|_2
&\le
\|(u\cdot\nabla)u\|_2
\\
&\le
\|u\|_6\|\nabla u\|_3
\\
&\le
C
\|\nabla u\|_2^{3/2}
\|Au\|_2^{1/2}.
\end{aligned}
$$

従って

$$
\|B(u,u)\|_2^2
\le
C
\|\nabla u\|_2^3
\|Au\|_2.
$$

$[0,T_*]$ では $\|\nabla u_m\|_2$ が一様有界なので

$$
\int_0^{T_*}
\|B(u_m,u_m)\|_2^2\,dt
\le
C_K
\int_0^{T_*}\|Au_m\|_2\,dt.
$$

Cauchy--Schwarz により

$$
\int_0^{T_*}\|Au_m\|_2\,dt
\le
T_*^{1/2}
\left(
\int_0^{T_*}\|Au_m\|_2^2\,dt
\right)^{1/2}.
$$

したがって

$$
\boxed{
\sup_m
\|\partial_tu_m\|_{L^2(0,T_*;H)}
<\infty.
}
$$

NS3 では時間微分が $V^*$ にしか入らなかったのに対し、今回は $H$ に入ります。

---

## 7. 一段上の Fourier コンパクト性で局所強解を作る

一様評価は

$$
u_m
\text{ bounded in }
L^\infty(0,T_*;V)\cap L^2(0,T_*;D(A)),
$$

$$
\partial_tu_m
\text{ bounded in }
L^2(0,T_*;H)
$$

です。

$Q_N$ を $|k|\le N$ の Fourier モードへの射影とします。高周波では

$$
\begin{aligned}
\|(I-Q_N)u_m\|_V^2
&=
(2\pi)^3
\sum_{|k|>N}
|k|^2|\widehat u_m(k)|^2
\\
&\le
\frac1{N^2}
(2\pi)^3
\sum_{|k|>N}
|k|^4|\widehat u_m(k)|^2
\\
&\le
\frac1{N^2}\|Au_m\|_2^2.
\end{aligned}
$$

従って

$$
\|(I-Q_N)u_m\|_{L^2(0,T_*;V)}
\le
\frac{C}{N}
$$

で、高周波尾部を $m$ に一様に小さくできます。

固定した $N$ では $Q_NH$ は有限次元です。基底を $e_1,\ldots,e_M$ として

$$
Q_Nu_m(t)
=
\sum_{j=1}^M a_{m,j}(t)e_j
$$

と書くと

$$
a_{m,j}'(t)
=
(\partial_tu_m(t),e_j)_H.
$$

従って

$$
|a_{m,j}(t)-a_{m,j}(s)|
\le
|t-s|^{1/2}
\|\partial_tu_m\|_{L^2(0,T_*;H)}
\|e_j\|_H.
$$

各係数列は一様等連続です。有限次元の Arzelà--Ascoli と対角部分列を使い、高周波評価と合わせると

$$
\boxed{
u_m\to u
\quad\text{strongly in }L^2(0,T_*;V)
}
$$

を得ます。

同じ部分列で

$$
u_m\rightharpoonup u
\quad\text{weakly in }L^2(0,T_*;D(A)),
$$

$$
\partial_tu_m\rightharpoonup\partial_tu
\quad\text{weakly in }L^2(0,T_*;H)
$$

と取れます。

非線形項もここで曖昧にしません。第6節の評価から

$$
\{B(u_m,u_m)\}
\text{ は }L^2(0,T_*;H)\text{ で一様有界}
$$

なので、さらに部分列を取れば、ある $G\in L^2(0,T_*;H)$ に弱収束します。

$G=B(u,u)$ であることを確認します。滑らかな発散零周期試験関数 $\varphi(t,x)$ に対して、周期部分積分により

$$
b(a,b,\varphi)
=
-\int_{\mathbb T^3}
(a\otimes b):\nabla\varphi\,dx
$$

です。従って

$$
\begin{aligned}
&
\left|
\int_0^{T_*}
\{b(u_m,u_m,\varphi)-b(u,u,\varphi)\}\,dt
\right|
\\
&\le
\|\nabla\varphi\|_{L^\infty_{t,x}}
\|u_m-u\|_{L^2_{t,x}}
\left(
\|u_m\|_{L^2_{t,x}}
+
\|u\|_{L^2_{t,x}}
\right)
\to0.
\end{aligned}
$$

ここでは強い $L^2_tV$ 収束から、特に強い $L^2_{t,x}$ 収束を使いました。したがって弱 $L^2_tH$ 極限 $G$ は分布の意味で $B(u,u)$ と一致し、

$$
B(u,u)\in L^2(0,T_*;H).
$$

線形項もそれぞれ弱収束するので

$$
\partial_tu+\nu Au+B(u,u)=f
\quad\text{in }H
$$

がほとんどすべての時刻で成り立ちます。

さらに

$$
u\in L^2(0,T_*;D(A)),
\qquad
\partial_tu\in L^2(0,T_*;H)
$$

から $u\in C([0,T_*];V)$ を確認します。ここは時間積分された $D(A)$ 上界だけから高周波を各時刻で一様に小さくしたことにしてはいけません。

$u(t_0)\in D(A)$ となる時刻 $t_0$ を一つ取ります。これは $u\in L^2(0,T_*;D(A))$ なので、ほとんどすべての $t_0$ で可能です。

$M>N$ とし、

$$
R_{N,M}=Q_M-Q_N
$$

と置きます。$R_{N,M}u$ は有限個の Fourier モードだけを持つので時間について絶対連続であり、

$$
\frac{d}{dt}
\|A^{1/2}R_{N,M}u(t)\|_2^2
=
2(\partial_tu(t),AR_{N,M}u(t))
$$

がほとんどすべての $t$ で成り立ちます。

$t_0$ から $t$ まで積分し、Cauchy--Schwarz を使うと

$$
\begin{aligned}
\|A^{1/2}R_{N,M}u(t)\|_2^2
&\le
\|A^{1/2}R_{N,M}u(t_0)\|_2^2
\\
&\quad+
2\|\partial_tu\|_{L^2(0,T_*;H)}
\|AR_{N,M}u\|_{L^2(0,T_*;H)}.
\end{aligned}
$$

右辺第1項は $u(t_0)\in V$ の Fourier 尾部なので $N\to\infty$ で0へ行きます。第2項も

$$
Au\in L^2(0,T_*;H)
$$

の Fourier 尾部なので、$N\to\infty$ で $M>N$ に一様に0へ行きます。

従って $(Q_Nu)$ は

$$
C([0,T_*];V)
$$

で一様 Cauchy です。各 $Q_Nu$ は有限次元で時間連続なので、その一様極限として

$$
u\in C([0,T_*];V)
$$

を得ます。

<a id="thm-ns5-local-strong"></a>

<!-- formal-statement-start -->
> **定理（三次元周期 Navier--Stokes の局所強解と一意性）**  
> $\nu>0$、
>
$$
u_0\in V,
\qquad
f\in L^2_{\mathrm{loc}}([0,\infty);H)
$$
>
> とする。このとき $T_*>0$ が存在し、三次元周期 Navier--Stokes 方程式は $[0,T_*]$ 上に強解を持つ。
>
> さらに同じ初期値・外力を持つ強解は、共通の存在時間上で一意である。
<!-- formal-statement-end -->

### 証明の見取り図

存在は

$$
\boxed{
\text{Galerkin}
\to
H^1\text{ 局所一様評価}
\to
L^2_tD(A)
\to
\partial_tu_m\in L^2_tH
\to
L^2_tV\text{ 強収束}
}
$$

です。

一意性は二つの強解の差に $L^2$ エネルギーを適用し、三次元 $L^4$ 評価で閉じます。

<!-- proof-start -->
### 証明

存在部分は第5節からここまでで構成しました。一意性を示します。

$u,v$ を同じ初期値・外力を持つ二つの強解とし、

$$
w=u-v
$$

と置きます。

差の方程式は

$$
\partial_tw+\nu Aw+B(u,u)-B(v,v)=0.
$$

$u=v+w$ を使うと

$$
B(u,u)-B(v,v)
=
B(w,u)+B(v,w).
$$

$w$ と内積を取ります。NS2 の反対称性から

$$
b(v,w,w)=0.
$$

従って

$$
\frac12\frac{d}{dt}\|w\|_2^2
+
\nu\|\nabla w\|_2^2
=
-b(w,u,w).
$$

[Hölder の不等式](../F0_00D2D_Lp_Holder_Minkowski/index.md#thm-f0-00d2d-01)と NS2 の三次元 $L^4$ 評価により

$$
\begin{aligned}
|b(w,u,w)|
&\le
\|w\|_4^2\|\nabla u\|_2
\\
&\le
C
\|w\|_2^{1/2}
\|\nabla w\|_2^{3/2}
\|\nabla u\|_2.
\end{aligned}
$$

[Young の不等式](../F0_00D2D_Lp_Holder_Minkowski/index.md#lem-f0-00d2d-01)を共役指数 $4/3,4$ で使えば

$$
|b(w,u,w)|
\le
\frac{\nu}{2}\|\nabla w\|_2^2
+
C_\nu
\|\nabla u\|_2^4
\|w\|_2^2.
$$

従って

$$
\frac{d}{dt}\|w\|_2^2
\le
C_\nu
\|\nabla u\|_2^4
\|w\|_2^2.
$$

強解は $C([0,T];V)$ なので

$$
\int_0^T\|\nabla u(t)\|_2^4\,dt<\infty.
$$

[Grönwall の不等式](../ODE8/index.md#lem-ode8-gronwall)から

$$
\|w(t)\|_2^2
\le
\|w(0)\|_2^2
\exp\left(
C_\nu\int_0^t\|\nabla u(s)\|_2^4\,ds
\right).
$$

$w(0)=0$ なので $w=0$ です。
<!-- proof-end -->

---

## 8. 最大存在時間

局所強解が一意なので、重なる時間区間上の局所解を貼り合わせられます。そこで「どこまで強解として延長できるか」を定義します。

<a id="def-ns5-maximal-time"></a>

<!-- formal-statement-start -->
> **定義（最大強解存在時間）**  
> $u_0\in V$ と
>
$$
f\in L^2_{\mathrm{loc}}([0,\infty);H)
$$
>
> に対し、初期値 $u_0$ から出発する一意な局所強解を考える。強解として存在する時間区間の上端の上限
>
$$
\boxed{
T_{\max}
:=
\sup\{
T>0:
[0,T]\text{ 上に強解が存在する}
\}
}
$$
>
> を最大強解存在時間という。
<!-- formal-statement-end -->

<!-- definition-example-start: def-ns5-maximal-time -->
**定義の確認**

第1節のせん断流

$$
u(t,x)=e^{-\nu t}(\sin x_2,0,0)
$$

は任意の $T>0$ 上で強解です。従って

$$
T_{\max}=\infty.
$$

有限時間発散が問題になるのは、ある初期値に対して $T_{\max}<\infty$ となる可能性を排除できるかどうかです。
<!-- definition-example-end -->

---

## 9. 有界なら再出発できる：延長判定

局所存在時間の作り方を見直します。

第5節で必要だったのは、再出発時刻の $V$ ノルム上界と、短い時間区間での外力の $L^2_tH$ 量だけでした。

従って、ある $M<\infty$ があって

$$
\|\nabla u(t_0)\|_2\le M
$$

なら、$t_0$ を新しい初期時刻として、$M$ だけに依存する大きさの bootstrap 上限を使えます。

もし有限最大時刻 $T_{\max}$ の直前まで

$$
\sup_{0\le t<T_{\max}}
\|\nabla u(t)\|_2
<\infty
$$

なら、$T_{\max}$ の直前からも一様な正の長さだけ解を再出発できるはずです。

<a id="thm-ns5-blowup-alternative"></a>

<!-- formal-statement-start -->
> **定理（三次元局所強解の延長判定と有限時間発散選択肢）**  
> $\nu>0$、
>
$$
u_0\in V,
\qquad
f\in L^2_{\mathrm{loc}}([0,\infty);H)
$$
>
> とし、$u$ を最大強解、$T_{\max}$ を最大存在時間とする。このとき
>
$$
\boxed{
T_{\max}=\infty
}
$$
>
> または
>
$$
\boxed{
T_{\max}<\infty
\quad\text{かつ}\quad
\sup_{0\le t<T_{\max}}
\|\nabla u(t)\|_2
=
\infty
}
$$
>
> のどちらかである。
<!-- formal-statement-end -->

### 証明の見取り図

有限の最大時刻で $V$ ノルムが有界なままなら、その時刻の直前を新しい初期時刻として同じ局所存在議論を再び走らせられます。それが最大時刻を越えれば矛盾です。

<!-- proof-start -->
### 証明

$T_{\max}<\infty$ と仮定し、反対に

$$
M
:=
\sup_{0\le t<T_{\max}}
\|\nabla u(t)\|_2
<\infty
$$

と仮定します。

局所存在証明の bootstrap 上限を

$$
K=2(M^2+1)
$$

と固定します。

外力は

$$
f\in L^2(0,T_{\max}+1;H)
$$

なので、[Lebesgue 積分の絶対連続性](../MT4/index.md#thm-mt4-integral-absolute-continuity)から、ある $\delta_1>0$ を取り、任意の長さ $\delta_1$ 以下の区間 $I\subset[0,T_{\max}+1]$ で

$$
\frac2\nu\int_I\|f(t)\|_2^2\,dt
\le
\frac{M^2+1}{4}
$$

とできます。

また

$$
C_\nu\delta_2K^3
\le
\frac{M^2+1}{4}
$$

となる $\delta_2>0$ を取ります。

$$
\delta=\min\{\delta_1,\delta_2,1\}
$$

とすれば、任意の $t_0<T_{\max}$ を初期時刻として、少なくとも $[t_0,t_0+\delta]$ 上で第5節と同じ bootstrap が成立します。

$$
t_0>T_{\max}-\frac{\delta}{2}
$$

を選ぶと

$$
t_0+\delta>T_{\max}.
$$

局所存在定理は $T_{\max}$ を越える強解を与えます。一意性により既存解と重なる区間で一致するので、最大強解を延長できてしまいます。

これは $T_{\max}$ の定義に矛盾します。

従って有限の最大存在時間なら

$$
\sup_{t<T_{\max}}\|\nabla u(t)\|_2=\infty
$$

です。
<!-- proof-end -->

この定理は有限時間特異点の存在を主張していません。「もし強解が有限時刻で止まるなら、$H^1$ 制御は必ず破綻する」と言っています。

---

## 10. 積分型の $H^1$ 延長判定

前節は点ごとの上界を使いました。微分不等式から積分型の判定も得られます。

$$
y'(t)
\le
C_\nu y(t)^3
+
g(t),
\qquad
g(t)=\frac2\nu\|f(t)\|_2^2.
$$

三次項を

$$
y^3=y^2y
$$

と書けば

$$
y'(t)
\le
a(t)y(t)+g(t),
\qquad
a(t)=C_\nu y(t)^2.
$$

もし $T<T_{\max}$ で

$$
\int_0^T y(t)^2\,dt
=
\int_0^T\|\nabla u(t)\|_2^4\,dt
<\infty
$$

なら、積分因子

$$
\mu(t)
=
\exp\left(
-\int_0^t a(s)\,ds
\right)
$$

を使って

$$
(\mu y)'\le \mu g.
$$

従って

$$
y(t)
\le
\exp\left(
\int_0^Ta(s)\,ds
\right)
\left[
y(0)+\int_0^Tg(s)\,ds
\right].
$$

右辺は有限です。

特に有限最大時刻 $T_{\max}$ について

$$
\int_0^{T_{\max}}
\|\nabla u(t)\|_2^4\,dt
<\infty
$$

なら $H^1$ ノルムは有界になり、第9節の延長判定に反します。

従って

$$
\boxed{
T_{\max}<\infty
\quad\Longrightarrow\quad
\int_0^{T_{\max}}
\|\nabla u(t)\|_2^4\,dt
=
\infty.
}
$$

これは後の NS7 で扱う尺度臨界な正則性判定ではありません。$H^1$ を直接使う、かなり強い条件です。しかし「どの量が有限なら延長できるか」を初めて具体的に示しています。

---

## 11. 強解がある間は弱解も同じ解になる

三次元では Leray--Hopf 弱解の大域存在を知っていますが、その一般的な一意性はまだ得ていません。

一方、同じ初期値から局所強解も作れます。

強解が存在する時間区間では、任意の Leray--Hopf 弱解はその強解と一致します。これが弱--強一意性です。

<a id="thm-ns5-weak-strong-uniqueness"></a>

<!-- formal-statement-start -->
> **定理（三次元周期 Navier--Stokes の弱--強一意性）**  
> $\nu>0$、
>
$$
u_0\in V,
\qquad
f\in L^2(0,T;H)
$$
>
> とする。$u$ を $[0,T]$ 上の強解、$v$ を同じ初期値 $u_0$ と同じ外力 $f$ を持つ Leray--Hopf 弱解とする。このとき
>
$$
\boxed{
u(t)=v(t)
\quad
(0\le t\le T)
}
$$
>
> が成り立つ。
<!-- formal-statement-end -->

### 証明の見取り図

強解はエネルギー等号、弱解はエネルギー不等式を満たします。さらに弱形式へ強解を試験関数として入れて交差項 $(v,u)$ を追うと、差

$$
w=v-u
$$

に対して

$$
\frac12\|w(t)\|_2^2
+
\nu\int_0^t\|\nabla w\|_2^2\,ds
\le
-\int_0^t b(w,u,w)\,ds
$$

という相対エネルギー不等式が得られます。

<!-- proof-start -->
### 証明

強解 $u$ は

$$
\frac12\|u(t)\|_2^2
+
\nu\int_0^t\|\nabla u\|_2^2\,ds
=
\frac12\|u_0\|_2^2
+
\int_0^t(f,u)\,ds
$$

を満たします。

弱解 $v$ は

$$
\frac12\|v(t)\|_2^2
+
\nu\int_0^t\|\nabla v\|_2^2\,ds
\le
\frac12\|u_0\|_2^2
+
\int_0^t(f,v)\,ds
$$

を満たします。

強解は

$$
u\in L^2(0,T;D(A)),
\qquad
\partial_tu\in L^2(0,T;H)
$$

なので、標準的な時間平滑化と Fourier 切断で弱形式の試験関数として近似できます。弱解の式を $u$ で試すと

$$
\begin{aligned}
(v(t),u(t))
&=
\|u_0\|_2^2
+
\int_0^t(v,\partial_su)\,ds
\\
&\quad
-\nu\int_0^t(\nabla v,\nabla u)\,ds
-\int_0^t b(v,v,u)\,ds
+\int_0^t(f,u)\,ds.
\end{aligned}
$$

強解の方程式から

$$
(v,\partial_su)
=
-\nu(\nabla v,\nabla u)
-b(u,u,v)
+(f,v).
$$

従って

$$
\begin{aligned}
(v(t),u(t))
&=
\|u_0\|_2^2
-
2\nu\int_0^t(\nabla v,\nabla u)\,ds
\\
&\quad
-\int_0^t
\{b(v,v,u)+b(u,u,v)\}\,ds
\\
&\quad
+\int_0^t(f,u+v)\,ds.
\end{aligned}
$$

$$
w=v-u
$$

と置きます。$v=u+w$ を代入して三重線形形式を展開すると

$$
b(v,v,u)+b(u,u,v)
=
-b(w,u,w).
$$

実際、

$$
b(u,u,v)=b(u,u,w),
$$

$$
b(v,v,u)
=
b(u,w,u)+b(w,w,u),
$$

また反対称性から

$$
b(u,w,u)=-b(u,u,w),
\qquad
b(w,w,u)=-b(w,u,w).
$$

従って交差項は

$$
\begin{aligned}
(v(t),u(t))
&=
\|u_0\|_2^2
-
2\nu\int_0^t(\nabla v,\nabla u)\,ds
\\
&\quad
+\int_0^tb(w,u,w)\,ds
+\int_0^t(f,u+v)\,ds.
\end{aligned}
$$

一方

$$
\|w(t)\|_2^2
=
\|v(t)\|_2^2
+
\|u(t)\|_2^2
-
2(v(t),u(t)).
$$

強解のエネルギー等号と弱解のエネルギー不等式を足し、交差項の式を引きます。初期値と外力項は打ち消し合い、散逸項は

$$
\|\nabla v\|_2^2
+
\|\nabla u\|_2^2
-
2(\nabla v,\nabla u)
=
\|\nabla w\|_2^2
$$

になります。従って

$$
\frac12\|w(t)\|_2^2
+
\nu\int_0^t\|\nabla w\|_2^2\,ds
\le
-\int_0^t b(w,u,w)\,ds.
$$

第7節の一意性証明と同じ評価で

$$
|b(w,u,w)|
\le
\frac{\nu}{2}\|\nabla w\|_2^2
+
C_\nu
\|\nabla u\|_2^4
\|w\|_2^2.
$$

従って

$$
\|w(t)\|_2^2
\le
C_\nu
\int_0^t
\|\nabla u\|_2^4
\|w\|_2^2\,ds.
$$

強解では $\|\nabla u\|_2^4\in L^1(0,T)$ で、$w(0)=0$ です。[Grönwall の不等式](../ODE8/index.md#lem-ode8-gronwall)から

$$
\|w(t)\|_2^2=0.
$$

よって $v=u$ です。
<!-- proof-end -->

NS3 で作った大域弱解は、NS5 の最大強解が存在する限り必ずその強解と一致します。

---

## 12. 二次元と三次元を同じ表で見る

| 観点 | 二次元 | 三次元 |
|---|---|---|
| 一段上の量 | スカラー渦度 $\omega$ | $\nabla u$ |
| 非線形項 | 渦度 $L^2$ エネルギーで消える | $b(u,u,Au)$ が残る |
| 代表評価 | 閉じた線形型 | $\|\nabla u\|^{3/2}\|Au\|^{3/2}$ |
| 微分不等式 | 大域制御へ進める | $y'\le Cy^3+g$ |
| 強解 | 大域 | 局所 |
| 弱解一意性 | 大域 | 強解がある間の弱--強一意性 |
| 有限時間特異点 | 排除できる | この評価だけでは排除できない |

三次元で不足しているのは、局所存在論そのものではありません。

不足しているのは

$$
\|\nabla u(t)\|_2
$$

またはそれに代わる、より本質的な量を全時間で制御する仕組みです。

次の NS6 では、どのノルムを見るべきかを方程式の尺度変換から調べます。

### 延長判定を一般の非線形PDEの言葉で見る

後から [NPDE6](../NPDE6/index.md) を読むと、半線形熱方程式にも、まず局所解を作り、最大存在時間 $T_{\max}$ を定め、有限時間で延長できなくなるなら局所存在論を閉じていたノルムが発散する、という似た論理構造が現れることが分かります。ここでは NPDE6 の結果を使っていません。NS5 側では、上で構成した局所強解と再出発可能性だけから延長判定を得ています。

NS5 も論理の骨格は同じです。局所強解を再出発させるために必要な $H^1$ 制御が $T_{\max}$ 直前まで一様なら、同じ局所存在論をもう一度適用できるので最大性に反します。したがって有限最大時刻では

$$
\|\nabla u(t)\|_2
$$

の制御が破綻しなければなりません。

ただし、半線形熱方程式の Fujita 指数や比較原理を Navier--Stokes に移しているわけではありません。共通なのは

$$
\text{局所存在}
\to
\text{再出発に必要な量を特定}
\to
\text{有限最大時刻ならその量が発散}
$$

という continuation argument です。何を制御すれば再出発できるか、また何が実際に blow-up を駆動するかは方程式固有です。

---

## 13. 演習

### Level A

<a id="ex-ns5-a01"></a>
#### NS5-A01 $L^3$ 補間から非線形評価まで
- Level: A

$u\in D(A)$ とする。

1. [Hölder の不等式](../F0_00D2D_Lp_Holder_Minkowski/index.md#thm-f0-00d2d-01)から
$$
\|\nabla u\|_3
\le
\|\nabla u\|_2^{1/2}
\|\nabla u\|_6^{1/2}
$$
を示せ。
2. 周期 Sobolev 評価と Fourier 表示を使い、
$$
\|\nabla u\|_6\le C\|Au\|_2
$$
を示せ。
3. 以上から
$$
|b(u,u,Au)|
\le
C
\|\nabla u\|_2^{3/2}
\|Au\|_2^{3/2}
$$
を導け。

<!-- solution-start -->
#### 詳細解答

まず

$$
\|\nabla u\|_3^3
=
\int|\nabla u|^{3/2}|\nabla u|^{3/2}.
$$

Hölder を指数 $4/3,4$ で使うと

$$
\|\nabla u\|_3^3
\le
\|\nabla u\|_2^{3/2}
\|\nabla u\|_6^{3/2}.
$$

三乗根を取り、

$$
\|\nabla u\|_3
\le
\|\nabla u\|_2^{1/2}
\|\nabla u\|_6^{1/2}.
$$

各周期微分の平均は0なので周期 Sobolev 評価から

$$
\|\nabla u\|_6\le C\|D^2u\|_2.
$$

Fourier 表示で

$$
\|D^2u\|_2^2
=
(2\pi)^3
\sum_{k\ne0}|k|^4|\widehat u(k)|^2
=
\|Au\|_2^2.
$$

従って

$$
\|\nabla u\|_6\le C\|Au\|_2.
$$

最後に

$$
|b(u,u,Au)|
\le
\|u\|_6\|\nabla u\|_3\|Au\|_2
$$

へ $\|u\|_6\le C\|\nabla u\|_2$ と上の二式を代入して

$$
|b(u,u,Au)|
\le
C\|\nabla u\|_2^{3/2}\|Au\|_2^{3/2}.
$$
<!-- solution-end -->

<a id="ex-ns5-a02"></a>
#### NS5-A02 Young の指数を選ぶ
- Level: A

$$
C\|\nabla u\|_2^{3/2}\|Au\|_2^{3/2}
$$

を

$$
\frac{\nu}{4}\|Au\|_2^2
+
C_\nu\|\nabla u\|_2^6
$$

で抑えよ。共役指数 $4/3,4$ を選ぶ理由も説明せよ。

<!-- solution-start -->
#### 詳細解答

$\|Au\|_2^{3/2}$ を二乗へ変えるには

$$
\frac32p=2
$$

が必要なので

$$
p=\frac43.
$$

その共役指数は $q=4$ です。

$$
X=\|Au\|_2^{3/2},
\qquad
Y=C\|\nabla u\|_2^{3/2}
$$

と置けば

$$
X^{4/3}=\|Au\|_2^2,
\qquad
Y^4=C^4\|\nabla u\|_2^6.
$$

係数付き [Young の不等式](../F0_00D2D_Lp_Holder_Minkowski/index.md#lem-f0-00d2d-01)で $\varepsilon=\nu/4$ と選べば結論を得ます。
<!-- solution-end -->

<a id="ex-ns5-a03"></a>
#### NS5-A03 比較方程式 $z'=Kz^3$
- Level: A

$K>0$、$z(0)=z_0>0$ として

$$
z'=Kz^3
$$

を解き、解が有限である時間区間を求めよ。

<!-- solution-start -->
#### 詳細解答

変数分離して

$$
z^{-3}dz=Kdt.
$$

積分すると

$$
-\frac1{2z(t)^2}
+
\frac1{2z_0^2}
=
Kt.
$$

従って

$$
z(t)
=
\frac{z_0}{
\sqrt{1-2Kz_0^2t}
}.
$$

正の解が有限であるのは

$$
0\le t<\frac1{2Kz_0^2}.
$$

この比較解の発散時刻を Navier--Stokes 解の発散時刻と同一視してはいけません。
<!-- solution-end -->

<a id="ex-ns5-a04"></a>
#### NS5-A04 強解一意性の差の評価
- Level: A

二つの強解 $u,v$ の差 $w=u-v$ について

$$
\frac12\frac{d}{dt}\|w\|_2^2
+
\nu\|\nabla w\|_2^2
=
-b(w,u,w)
$$

を導き、さらに

$$
|b(w,u,w)|
\le
\frac{\nu}{2}\|\nabla w\|_2^2
+
C_\nu\|\nabla u\|_2^4\|w\|_2^2
$$

を示せ。

<!-- solution-start -->
#### 詳細解答

非線形項の差は

$$
B(u,u)-B(v,v)
=
B(w,u)+B(v,w).
$$

差の方程式を $w$ で試すと

$$
\frac12\frac{d}{dt}\|w\|_2^2
+
\nu\|\nabla w\|_2^2
+
b(w,u,w)
+
b(v,w,w)
=
0.
$$

NS2 の相殺から $b(v,w,w)=0$ なので最初の式を得ます。

次に

$$
|b(w,u,w)|
\le
\|w\|_4^2\|\nabla u\|_2.
$$

NS2 の三次元 $L^4$ 評価から

$$
\|w\|_4^2
\le
C\|w\|_2^{1/2}\|\nabla w\|_2^{3/2}.
$$

従って

$$
|b(w,u,w)|
\le
C\|\nabla u\|_2
\|w\|_2^{1/2}
\|\nabla w\|_2^{3/2}.
$$

[Young の不等式](../F0_00D2D_Lp_Holder_Minkowski/index.md#lem-f0-00d2d-01)を $4/3,4$ で使えば結論です。
<!-- solution-end -->

<a id="ex-ns5-a05"></a>
#### NS5-A05 有界な $H^1$ ノルムと再出発
- Level: A

$T_{\max}<\infty$ とし、

$$
\sup_{t<T_{\max}}\|\nabla u(t)\|_2\le M
$$

と仮定する。局所存在定理を $T_{\max}$ の直前から一様な正の長さだけ再適用できる理由を説明せよ。

<!-- solution-start -->
#### 詳細解答

再出発時刻 $t_0$ で

$$
\|\nabla u(t_0)\|_2^2\le M^2.
$$

従って bootstrap 上限を

$$
K=2(M^2+1)
$$

と $t_0$ に依らず固定できます。

また

$$
f\in L^2(0,T_{\max}+1;H)
$$

なので、[Lebesgue 積分の絶対連続性](../MT4/index.md#thm-mt4-integral-absolute-continuity)から十分小さい $\delta>0$ を選べば、任意の長さ $\delta$ 以下の区間 $I$ で

$$
\frac2\nu\int_I\|f\|_2^2
$$

を必要なだけ小さくできます。

同時に $C_\nu\delta K^3$ も小さくできます。従って同じ $\delta$ で全ての $t_0<T_{\max}$ から局所存在を再開できます。

$t_0>T_{\max}-\delta/2$ と選べば $t_0+\delta>T_{\max}$ なので最大性に矛盾します。
<!-- solution-end -->

### Level B

<a id="ex-ns5-b01"></a>
#### NS5-B01 Galerkin $H^1$ bootstrap
- Level: B

$$
y_m'
+
\nu\|Au_m\|_2^2
\le
C_\nu y_m^3+g(t),
\qquad
y_m(0)\le y_0
$$

とする。

$$
K=2(y_0+1)
$$

と置き、

$$
\int_0^{T_*}g(t)\,dt
\le
\frac{y_0+1}{4},
\qquad
C_\nu T_*K^3
\le
\frac{y_0+1}{4}
$$

なら

$$
\sup_m\sup_{0\le t\le T_*}y_m(t)\le K
$$

を first-hitting-time 論法で示せ。

<!-- solution-start -->
#### 詳細解答

固定した $m$ で初めて $K$ に達する時刻を $\tau$ と仮定します。すると

$$
y_m(t)\le K
\quad
(0\le t\le\tau),
\qquad
y_m(\tau)=K.
$$

微分不等式を積分し、非負の散逸項を捨てると

$$
y_m(\tau)
\le
y_0
+
C_\nu\int_0^\tau y_m^3\,dt
+
\int_0^\tau g\,dt.
$$

従って

$$
y_m(\tau)
\le
y_0
+
C_\nu T_*K^3
+
\int_0^{T_*}g\,dt
\le
y_0+\frac{y_0+1}{2}.
$$

右辺は $2(y_0+1)=K$ より真に小さいため、$y_m(\tau)=K$ に矛盾します。よって到達時刻は存在しません。
<!-- solution-end -->

<a id="ex-ns5-b02"></a>
#### NS5-B02 一段上の Fourier コンパクト性
- Level: B

列 $z_n$ が

$$
\sup_n\|z_n\|_{L^2(0,T;D(A))}<\infty,
\qquad
\sup_n\|\partial_tz_n\|_{L^2(0,T;H)}<\infty
$$

を満たすとする。Fourier 射影 $Q_N$ を使い、部分列が

$$
z_n\to z
\quad\text{strongly in }L^2(0,T;V)
$$

と収束する理由を示せ。

<!-- solution-start -->
#### 詳細解答

高周波では

$$
\|(I-Q_N)z_n\|_V^2
\le
\frac1{N^2}\|Az_n\|_2^2.
$$

従って

$$
\|(I-Q_N)z_n\|_{L^2V}
\le
\frac{C}{N}
$$

で、一様に小さくできます。

固定した $N$ の低周波空間は有限次元です。係数 $a_{n,j}$ は

$$
a_{n,j}'=(\partial_tz_n,e_j)
$$

を満たすので

$$
|a_{n,j}(t)-a_{n,j}(s)|
\le
C|t-s|^{1/2}
$$

と一様等連続です。

Arzelà--Ascoli で固定 $N$ の低周波部分は強収束部分列を持ちます。$N=1,2,\ldots$ について対角部分列を取り、高周波の一様小ささと合わせれば $L^2_tV$ で Cauchy となり、強収束します。
<!-- solution-end -->

<a id="ex-ns5-b03"></a>
#### NS5-B03 有限最大時刻なら $L^4_tH^1_x$ も発散する
- Level: B

$$
y'(t)\le C_\nu y(t)^3+g(t),
\qquad
g\in L^1(0,T_{\max})
$$

とする。

もし

$$
\int_0^{T_{\max}}y(t)^2\,dt<\infty
$$

なら $y$ が有界になることを示し、有限 $T_{\max}$ と矛盾することを説明せよ。

<!-- solution-start -->
#### 詳細解答

$$
a(t)=C_\nu y(t)^2
$$

と置けば

$$
y'\le a(t)y+g(t).
$$

仮定から $a\in L^1(0,T_{\max})$ です。

積分因子

$$
\mu(t)
=
\exp\left(
-\int_0^ta(s)\,ds
\right)
$$

を掛けると

$$
(\mu y)'\le\mu g.
$$

従って

$$
y(t)
\le
\exp\left(
\int_0^{T_{\max}}a
\right)
\left(
y(0)+\|g\|_{L^1}
\right).
$$

右辺は有限です。よって $\sup_{t<T_{\max}}y(t)<\infty$ となり、有限最大時刻での発散選択肢に矛盾します。

従って

$$
T_{\max}<\infty
\Longrightarrow
\int_0^{T_{\max}}
\|\nabla u(t)\|_2^4\,dt
=\infty.
$$
<!-- solution-end -->

<a id="ex-ns5-b04"></a>
#### NS5-B04 弱--強一意性の相対エネルギー
- Level: B

同じ初期値・外力を持つ強解 $u$ と Leray--Hopf 弱解 $v$ を考え、$w=v-u$ とする。強解のエネルギー等号、弱解のエネルギー不等式、交差項 $(v,u)$ の式を組み合わせて

$$
\frac12\|w(t)\|_2^2
+
\nu\int_0^t\|\nabla w\|_2^2\,ds
\le
-\int_0^t b(w,u,w)\,ds
$$

を導け。

<!-- solution-start -->
#### 詳細解答

強解について

$$
\frac12\|u(t)\|_2^2
+\nu\int_0^t\|\nabla u\|_2^2
=
\frac12\|u_0\|_2^2+\int_0^t(f,u).
$$

弱解について

$$
\frac12\|v(t)\|_2^2
+\nu\int_0^t\|\nabla v\|_2^2
\le
\frac12\|u_0\|_2^2+\int_0^t(f,v).
$$

弱形式を $u$ で試し、強解の方程式を代入すると

$$
\begin{aligned}
(v(t),u(t))
&=
\|u_0\|_2^2
-2\nu\int_0^t(\nabla v,\nabla u)
\\
&\quad
+\int_0^tb(w,u,w)
+\int_0^t(f,u+v).
\end{aligned}
$$

また

$$
\frac12\|w\|_2^2
=
\frac12\|u\|_2^2
+
\frac12\|v\|_2^2
-
(u,v).
$$

三式を組み合わせると初期値と外力が消えます。散逸項は

$$
\|\nabla u\|_2^2+\|\nabla v\|_2^2
-2(\nabla u,\nabla v)
=
\|\nabla w\|_2^2
$$

となるので、求める相対エネルギー不等式を得ます。
<!-- solution-end -->

### Level C

<a id="ex-ns5-c01"></a>
#### NS5-C01 局所強解から発散選択肢までを再構成する
- Level: C

$\nu>0$、

$$
u_0\in V,
\qquad
f\in L^2_{\mathrm{loc}}([0,\infty);H)
$$

とする。Fourier--Galerkin 近似 $u_m$ から出発し、次を順に示せ。

1. $Au_m$ で試して
$$
y_m'
+
\nu\|Au_m\|_2^2
\le
C_\nu y_m^3+\frac2\nu\|f\|_2^2
$$
を得る。
2. 小さい $T_*>0$ では $u_m$ が $L^\infty(0,T_*;V)\cap L^2(0,T_*;D(A))$ で一様有界になる。
3. $\partial_tu_m$ が $L^2(0,T_*;H)$ で一様有界になる。
4. 部分列から局所強解を構成できる理由を説明する。
5. 強解一意性を示す。
6. 最大存在時間 $T_{\max}$ が有限なら
$$
\sup_{t<T_{\max}}\|\nabla u(t)\|_2=\infty
$$
であることを示す。
7. 同じ初期値・外力を持つ Leray--Hopf 弱解は、強解の存在時間ではこの強解と一致することを説明する。

<!-- solution-start -->
#### 詳細解答

### 1. $H^1$ エネルギー

Galerkin 方程式を $Au_m$ で試すと

$$
\frac12y_m'
+\nu\|Au_m\|_2^2
=
-b(u_m,u_m,Au_m)
+(f,Au_m).
$$

第3節の評価と [Young の不等式](../F0_00D2D_Lp_Holder_Minkowski/index.md#lem-f0-00d2d-01)から

$$
|b(u_m,u_m,Au_m)|
\le
\frac{\nu}{4}\|Au_m\|_2^2
+
C_\nu y_m^3,
$$

$$
|(f,Au_m)|
\le
\frac{\nu}{4}\|Au_m\|_2^2
+
\frac1\nu\|f\|_2^2.
$$

従って、2倍して定数をまとめれば

$$
y_m'
+
\nu\|Au_m\|_2^2
\le
C_\nu y_m^3+\frac2\nu\|f\|_2^2.
$$

### 2. 短時間一様評価

$$
y_m(0)\le y_0:=\|\nabla u_0\|_2^2,
\qquad
K=2(y_0+1)
$$

とします。

小さい $T_*$ を

$$
\frac2\nu\int_0^{T_*}\|f\|_2^2
\le\frac{y_0+1}{4},
\qquad
C_\nu T_*K^3\le\frac{y_0+1}{4}
$$

となるように選びます。

B01 の first-hitting-time 論法により

$$
\sup_m\|u_m\|_{L^\infty(0,T_*;V)}<\infty.
$$

微分不等式を積分すると

$$
\sup_m\|u_m\|_{L^2(0,T_*;D(A))}<\infty.
$$

### 3. 時間微分

方程式から

$$
\partial_tu_m
=
-\nu Au_m-P_mB(u_m,u_m)+P_mf.
$$

非線形項は

$$
\|B(u_m,u_m)\|_2
\le
C
\|\nabla u_m\|_2^{3/2}
\|Au_m\|_2^{1/2}.
$$

二乗して時間積分し、$L^\infty_tV$ 上界と Cauchy--Schwarz を使うと

$$
\sup_m
\|B(u_m,u_m)\|_{L^2(0,T_*;H)}
<\infty.
$$

従って

$$
\sup_m
\|\partial_tu_m\|_{L^2(0,T_*;H)}
<\infty.
$$

### 4. 極限

$D(A)$ の一様制御は高周波の $V$ 尾部を $N^{-1}$ で小さくし、時間微分の $H$ 制御は固定低周波の Fourier 係数を一様等連続にします。

従って B02 の高低周波分解から

$$
u_m\to u
\quad\text{strongly in }L^2(0,T_*;V)
$$

となる部分列を取れます。

さらに

$$
u_m\rightharpoonup u
\quad\text{in }L^2(0,T_*;D(A)),
$$

$$
\partial_tu_m\rightharpoonup\partial_tu
\quad\text{in }L^2(0,T_*;H).
$$

強い $L^2_tV$ 収束で非線形項を同定し、

$$
\partial_tu+\nu Au+B(u,u)=f
$$

を得ます。Fourier 係数の時間連続性と高周波制御から $u\in C([0,T_*];V)$ も得られ、強解です。

### 5. 一意性

差 $w$ について

$$
\frac12\frac{d}{dt}\|w\|_2^2
+
\nu\|\nabla w\|_2^2
=
-b(w,u,w).
$$

A04 の評価から

$$
\frac{d}{dt}\|w\|_2^2
\le
C_\nu\|\nabla u\|_2^4\|w\|_2^2.
$$

$u\in C([0,T_*];V)$ なので係数は積分可能です。$w(0)=0$ と [Grönwall の不等式](../ODE8/index.md#lem-ode8-gronwall)から $w=0$ です。

### 6. 有限時間発散選択肢

局所解を一意性で貼り合わせて最大存在時間 $T_{\max}$ を定めます。

もし $T_{\max}<\infty$ なのに

$$
\sup_{t<T_{\max}}\|\nabla u(t)\|_2\le M
$$

なら、$K=2(M^2+1)$ を使って、外力の短区間積分と $C_\nu\delta K^3$ がともに小さくなる一様な $\delta>0$ を選べます。

$T_{\max}$ の十分近くの $t_0$ から局所存在を再適用すると $t_0+\delta>T_{\max}$ まで強解を延長でき、最大性に矛盾します。

従って

$$
T_{\max}<\infty
\Longrightarrow
\sup_{t<T_{\max}}\|\nabla u(t)\|_2=\infty.
$$

### 7. 弱--強一意性

強解 $u$ と Leray--Hopf 弱解 $v$ の差 $w=v-u$ について、強解のエネルギー等号、弱解のエネルギー不等式、交差項の弱形式を組み合わせると

$$
\frac12\|w(t)\|_2^2
+
\nu\int_0^t\|\nabla w\|_2^2
\le
-\int_0^t b(w,u,w).
$$

A04 と同じ評価を使えば

$$
\|w(t)\|_2^2
\le
C_\nu\int_0^t
\|\nabla u\|_2^4
\|w\|_2^2.
$$

強解の存在時間では $\|\nabla u\|_2^4$ は積分可能で、$w(0)=0$ です。[Grönwall の不等式](../ODE8/index.md#lem-ode8-gronwall)から $w=0$ となり、弱解は強解と一致します。
<!-- solution-end -->
