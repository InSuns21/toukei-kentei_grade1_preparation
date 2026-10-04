# NS3 Leray--Hopf 弱解と大域存在

NS2 では、三次元トーラス $\mathbb T^3=(-\pi,\pi]^3$ 上の平均零・発散零速度場について、非線形項が基本 $L^2$ エネルギーを直接増やさないことを証明しました。滑らかな解なら

$$
\frac12\frac{d}{dt}\|u(t)\|_2^2
+\nu\|\nabla u(t)\|_2^2
=
\langle f(t),u(t)\rangle
$$

です。

ここで次の問いが生じます。

> 滑らかさは保証できなくても、有限エネルギーの解を全時間で作れるだろうか。

答えは yes です。ただし Galerkin 解を弱収束させるだけでは足りません。非線形項には $u_m\otimes u_m$ が現れ、弱収束は一般に積と両立しないからです。

本章の存在証明は

$$
\boxed{
\text{Galerkin}
\to
\text{一様エネルギー評価}
\to
\partial_tu_m\text{ の }V^*\text{ 評価}
\to
\text{時間空間コンパクト性}
\to
L^2_{t,x}\text{ 強収束}
\to
\text{非線形項の極限}
}
$$

という一本の流れで進みます。最終的に三次元でも

$$
u\in L^\infty_{\mathrm{loc}}([0,\infty);H)
\cap
L^2_{\mathrm{loc}}([0,\infty);V)
$$

を満たす Leray--Hopf 弱解を構成します。

ここで得るのは **大域弱解の存在** です。三次元弱解の一意性や大域正則性は、まだ得られません。

---

## 1. 三つの空間で時間発展を測る

NS1 の $H$ は平均零・発散零 $L^2$ ベクトル場の空間、NS2 の

$$
V=H^1(\mathbb T^3;\mathbb R^3)\cap H
$$

は発散零エネルギー空間でした。NS2 の [周期平均零場の Poincaré 型評価](../NS2/index.md#prop-ns2-periodic-poincare)により

$$
\|v\|_V:=\|\nabla v\|_2
$$

は $V$ 上のノルムです。

GPDE10 の [Gelfand 三つ組](../GPDE10/index.md#def-gpde10-gelfand-triple)と同じく

$$
V\hookrightarrow H\hookrightarrow V^*
$$

と見ます。実際、$h\in H$ は $v\mapsto(h,v)_H$ という $V$ 上の線形汎関数を定め、

$$
|(h,v)_H|
\le
\|h\|_H\|v\|_H
\le
\|h\|_H\|v\|_V
$$

なので $H\hookrightarrow V^*$ は連続です。

この三段階を使う理由は、極限解では空間微分を $L^2$ で持っても、時間微分まで $H$ に入るとは限らないからです。時間微分は $V^*$ まで弱めます。

---

## 2. 最終的に作る解を先に定める

滑らかな解で成り立つ「方程式・初期値・エネルギー散逸」を有限エネルギーの範囲で残したものが Leray--Hopf 弱解です。

<a id="def-ns3-leray-hopf"></a>

<!-- formal-statement-start -->
> **定義（周期 Leray--Hopf 弱解）**  
> $\nu>0$、$u_0\in H$、
>
$$
f\in L^2_{\mathrm{loc}}([0,\infty);V^*)
$$
>
> とする。関数 $u:[0,\infty)\to H$ が Leray--Hopf 弱解であるとは、任意の $T>0$ に対して
>
$$
u\in L^\infty(0,T;H)\cap L^2(0,T;V),
$$
>
$$
\partial_tu\in L^{4/3}(0,T;V^*),
\qquad
u\in C_w([0,T];H),
$$
>
> を満たし、任意の $v\in V$ に対してほとんどすべての $t\in(0,T)$ で
>
$$
\boxed{
\langle\partial_tu(t),v\rangle
+\nu(\nabla u(t),\nabla v)
+b(u(t),u(t),v)
=
\langle f(t),v\rangle
}
$$
>
> が成り立ち、さらに
>
$$
u(0)=u_0
\quad\text{in }H
$$
>
> および任意の $t\in[0,T]$ で
>
$$
\boxed{
\frac12\|u(t)\|_H^2
+\nu\int_0^t\|u(s)\|_V^2\,ds
\le
\frac12\|u_0\|_H^2
+\int_0^t\langle f(s),u(s)\rangle\,ds
}
$$
>
> を満たすことをいう。
<!-- formal-statement-end -->

ここで $C_w([0,T];H)$ は、任意の $h\in H$ に対して $t\mapsto(u(t),h)_H$ が連続であることを意味します。

<!-- definition-example-start: def-ns3-leray-hopf -->
**定義の確認**

無外力 $f=0$ とし、

$$
u_0(x)=(\sin x_2,0,0),
\qquad
u(t,x)=e^{-\nu t}(\sin x_2,0,0)
$$

とします。

$u\cdot\nabla=e^{-\nu t}\sin x_2\,\partial_1$ ですが $u$ は $x_1$ に依存しないため

$$
(u\cdot\nabla)u=0.
$$

また $-\Delta u=u$ なので、発散零空間上では $Au=u$ です。従って

$$
\partial_tu+\nu Au=-\nu u+\nu u=0.
$$

さらにこの単一 Fourier モードでは $\|u(t)\|_V=\|u(t)\|_H$ なので

$$
\frac12\|u(t)\|_H^2
+\nu\int_0^t\|u(s)\|_V^2\,ds
=
\frac12\|u_0\|_H^2.
$$

したがって、この滑らかな解は Leray--Hopf の条件をエネルギー等号つきで満たします。
<!-- definition-example-end -->

---

## 3. Fourier--Galerkin 近似を有限次元 ODE にする

$H$ の実 Fourier 基底を $w_1,w_2,\ldots$ とし、$H$ 正規直交かつ

$$
Aw_j=\lambda_jw_j,
\qquad
0<\lambda_1\le\lambda_2\le\cdots
$$

となるように選びます。

$$
H_m=\operatorname{span}\{w_1,\ldots,w_m\}
$$

とし、$P_m:H\to H_m$ を直交射影とします。

$$
u_m(t)=\sum_{j=1}^m d_j^{(m)}(t)w_j
$$

と置き、各 $i=1,\ldots,m$ に対して

$$
(\partial_tu_m,w_i)
+\nu(\nabla u_m,\nabla w_i)
+b(u_m,u_m,w_i)
=
\langle f,w_i\rangle,
$$

$$
u_m(0)=P_mu_0
$$

を課します。

これは係数 $d^{(m)}(t)$ に関する有限次元 ODE 系です。非線形項は係数について二次式なので局所 Lipschitz、外力係数 $t\mapsto\langle f(t),w_i\rangle$ は $L^2(0,T)$、従って有限区間で $L^1$ です。有限次元の Carathéodory 型 ODE の存在定理により絶対連続な局所解を作れます。次に、エネルギー評価が有限時刻発散を防ぐことを示します。

---

## 4. 次元に依らないエネルギー評価

Galerkin 方程式に係数 $d_i^{(m)}$ を掛けて足すと、試験関数として $u_m$ 自身を入れた式

$$
(\partial_tu_m,u_m)
+\nu\|u_m\|_V^2
+b(u_m,u_m,u_m)
=
\langle f,u_m\rangle
$$

を得ます。

NS2 の [三重線形形式のエネルギー相殺](../NS2/index.md#thm-ns2-trilinear-skew)から

$$
b(u_m,u_m,u_m)=0.
$$

従って

$$
\frac12\frac{d}{dt}\|u_m\|_H^2
+\nu\|u_m\|_V^2
=
\langle f,u_m\rangle.
$$

双対性と Young の不等式から

$$
|\langle f,u_m\rangle|
\le
\|f\|_{V^*}\|u_m\|_V
\le
\frac1{2\nu}\|f\|_{V^*}^2
+\frac\nu2\|u_m\|_V^2.
$$

<a id="prop-ns3-galerkin-energy"></a>

<!-- formal-statement-start -->
> **命題（Navier--Stokes Galerkin 解の一様エネルギー評価）**  
> 任意の $T>0$ に対して Galerkin 解は $[0,T]$ 全体へ延長でき、任意の $t\in[0,T]$ で
>
$$
\boxed{
\|u_m(t)\|_H^2
+\nu\int_0^t\|u_m(s)\|_V^2\,ds
\le
\|u_0\|_H^2
+\frac1\nu\int_0^t\|f(s)\|_{V^*}^2\,ds
}
$$
>
> を満たす。特に右辺から得られる上界は $m$ に依存しない。
<!-- formal-statement-end -->

### 証明の見取り図

上の微分不等式を積分します。さらに $H$ 正規直交基底では

$$
\|u_m(t)\|_H^2
=
\sum_{j=1}^m|d_j^{(m)}(t)|^2
$$

なので、エネルギー上界は有限次元 ODE の係数ベクトルの有限時刻発散を防ぎます。

<!-- proof-start -->
### 証明

上の評価を2倍して整理すると

$$
\frac{d}{dt}\|u_m\|_H^2
+\nu\|u_m\|_V^2
\le
\frac1\nu\|f\|_{V^*}^2.
$$

$0$ から $t$ まで積分し、$\|P_mu_0\|_H\le\|u_0\|_H$ を使えば

$$
\|u_m(t)\|_H^2
+\nu\int_0^t\|u_m(s)\|_V^2\,ds
\le
\|u_0\|_H^2
+\frac1\nu\int_0^t\|f(s)\|_{V^*}^2\,ds.
$$

従って任意の有限 $T$ で係数ベクトル $d^{(m)}(t)$ は有界です。有限次元 ODE の局所解は係数が有界な限り延長できるため、$u_m$ は $[0,T]$ 全体に存在します。$T$ は任意なので Galerkin 解は全時間で存在します。
<!-- proof-end -->

従って任意の固定 $T$ で

$$
\sup_m\|u_m\|_{L^\infty(0,T;H)}<\infty,
\qquad
\sup_m\|u_m\|_{L^2(0,T;V)}<\infty.
$$

---

## 5. なぜ弱収束だけでは足りないのか

$L^2(0,T;V)$ は Hilbert 空間なので、GPDE5 の [有界列から弱収束部分列](../GPDE5/index.md#thm-gpde5-hilbert-weak-subsequence)により

$$
u_m\rightharpoonup u
\quad\text{in }L^2(0,T;V)
$$

となる部分列を取れます。

線形項にはこれで十分です。しかし二次項には足りません。

例えば

$$
g_n(x)=\sin(nx)
$$

は $L^2(0,2\pi)$ で弱く0へ収束します。一方、

$$
g_n(x)^2
=
\frac12-\frac12\cos(2nx)
$$

は弱く $1/2$ へ収束します。

つまり

$$
g_n\rightharpoonup0
$$

でも

$$
g_n^2\rightharpoonup0
$$

とは限りません。

Navier--Stokes でも同じ問題が $u_m\otimes u_m$ に起こります。そこで $L^2_{t,x}$ の **強収束** を作ります。

---

## 6. 方程式から時間微分を $V^*$ で抑える

$u_m'(t)\in H_m$ なので、任意の $v\in V$ に対して

$
(u_m',v)_H=(u_m',P_mv)_H.
$

Fourier 射影は各モードを捨てるだけなので

$
\|P_mv\|_V\le\|v\|_V.
$

従って Galerkin 方程式へ $P_mv$ を入れれば、$u_m'$ を $V^*$ 上の汎関数として評価できます。

NS2 の反対称性を使うと

$$
b(u_m,u_m,v)
=
-b(u_m,v,u_m).
$$

従って Hölder の不等式から

$$
|b(u_m,u_m,v)|
\le
\|u_m\|_4^2\|\nabla v\|_2.
$$

NS2 の [三次元周期場の $L^4$ 評価](../NS2/index.md#prop-ns2-periodic-l4)を代入すると

$$
|b(u_m,u_m,v)|
\le
C
\|u_m\|_H^{1/2}
\|u_m\|_V^{3/2}
\|v\|_V.
$$

したがって

$$
\|B(u_m,u_m)\|_{V^*}
\le
C
\|u_m\|_H^{1/2}
\|u_m\|_V^{3/2}.
$$

ここで $4/3$ 乗すると

$$
\left(
\|u_m\|_H^{1/2}
\|u_m\|_V^{3/2}
\right)^{4/3}
=
\|u_m\|_H^{2/3}
\|u_m\|_V^2.
$$

右辺はエネルギー評価で時間積分できます。

<a id="prop-ns3-time-derivative"></a>

<!-- formal-statement-start -->
> **命題（Galerkin 時間微分の $V^*$ 評価）**  
> 任意の $T>0$ に対して $m$ に依らない定数 $C_T$ が存在し、
>
$$
\boxed{
\|\partial_tu_m\|_{L^{4/3}(0,T;V^*)}
\le C_T
}
$$
>
> が成り立つ。
<!-- formal-statement-end -->

### 証明の見取り図

粘性項は $L^2_tV^*$、外力も $L^2_tV^*$、非線形項は上の指数計算から $L^{4/3}_tV^*$ に入ります。有限区間では $L^2_t\hookrightarrow L^{4/3}_t$ なので三項を足せます。

<!-- proof-start -->
### 証明

まず

$$
|(\nabla u_m,\nabla v)|
\le
\|u_m\|_V\|v\|_V
$$

より

$$
\|Au_m\|_{V^*}\le\|u_m\|_V.
$$

次に

$$
\begin{aligned}
\int_0^T
\|B(u_m,u_m)\|_{V^*}^{4/3}\,dt
&\le
C\int_0^T
\|u_m\|_H^{2/3}\|u_m\|_V^2\,dt
\\
&\le
C\|u_m\|_{L^\infty(0,T;H)}^{2/3}
\|u_m\|_{L^2(0,T;V)}^2.
\end{aligned}
$$

右辺は $m$ に依らず有界です。

また $f\in L^2(0,T;V^*)$ であり、有限区間上では Hölder の不等式から

$$
\|g\|_{L^{4/3}(0,T)}
\le
T^{1/4}\|g\|_{L^2(0,T)}.
$$

任意の $v\in V$ に対して Galerkin 方程式を $P_mv$ で試すと

$
\begin{aligned}
|\langle\partial_tu_m,v\rangle|
&=
|(\partial_tu_m,P_mv)_H|
\\
&\le
\nu\|u_m\|_V\|P_mv\|_V
+
|b(u_m,u_m,P_mv)|
+
\|f\|_{V^*}\|P_mv\|_V.
\end{aligned}
$

ここで $\|P_mv\|_V\le\|v\|_V$ と、上で得た非線形項の評価を使います。$\|v\|_V=1$ 上で上限を取り、各項の時間ノルムを合わせれば結論です。
<!-- proof-end -->

空間方向の $L^2_tV$ 評価と、この時間方向の $L^{4/3}_tV^*$ 評価を組み合わせます。

---

## 7. 周期版 Aubin--Lions 型コンパクト性

一般の Aubin--Lions の定理は、強い空間の有界性と弱い空間での時間微分評価から、中間空間での強コンパクト性を取り出します。

本章では三次元トーラスの Fourier 構造を使い、必要な形を直接証明します。「コンパクト性により強収束する」の一言では済ませません。

$Q_K$ を $0<|k|\le K$ の発散零 Fourier モードだけを残す射影とします。$Q_KH$ は有限次元です。

高周波側では Parseval から

$$
\|(I-Q_K)v\|_H^2
\le
\frac1{K^2}\|v\|_V^2.
$$

<a id="thm-ns3-periodic-aubin-lions"></a>

<!-- formal-statement-start -->
> **定理（周期版 Aubin--Lions 型コンパクト性）**  
> $T>0$、$q>1$ とする。列 $\{z_n\}$ が
>
$$
\sup_n\|z_n\|_{L^2(0,T;V)}<\infty,
$$
>
$$
\sup_n\|\partial_tz_n\|_{L^q(0,T;V^*)}<\infty
$$
>
> を満たすなら、$\{z_n\}$ は $L^2(0,T;H)$ で相対コンパクトである。すなわち部分列を取れば
>
$$
\boxed{
z_n\to z
\quad\text{strongly in }L^2(0,T;H)
}
$$
>
> となる。
<!-- formal-statement-end -->

### 証明の見取り図

高周波は $V$ ノルムから一様に小さくできます。低周波は有限次元で、各 Fourier 係数の時間微分が $V^*$ 評価から制御されるので一様等連続です。

したがって低周波には Arzelà--Ascoli を使えます。

$$
\boxed{
\text{低周波：有限次元＋時間等連続}
\quad+\quad
\text{高周波：エネルギーで小さい}
}
$$

が証明の核心です。

<!-- proof-start -->
### 証明

一様上界を

$$
M_1=\sup_n\|z_n\|_{L^2(0,T;V)},
\qquad
M_2=\sup_n\|\partial_tz_n\|_{L^q(0,T;V^*)}
$$

とします。

まず高周波について

$$
\|(I-Q_K)z_n\|_{L^2(0,T;H)}
\le
\frac{M_1}{K}.
$$

従って $K$ を大きくすれば、全ての $n$ に対して高周波尾部を同時に小さくできます。

次に $K$ を固定します。有限次元空間 $Q_KH$ の $H$ 正規直交基底を $e_1,\ldots,e_N$ とし、

$$
Q_Kz_n(t)=\sum_{j=1}^Na_{n,j}(t)e_j,
\qquad
a_{n,j}(t)=(z_n(t),e_j)_H
$$

と書きます。

$e_j\in V$ なので

$$
a_{n,j}'(t)
=
\langle\partial_tz_n(t),e_j\rangle
$$

です。$q$ の Hölder 共役指数を $q'=q/(q-1)$ とすると、$0\le s<t\le T$ に対して

$$
\begin{aligned}
|a_{n,j}(t)-a_{n,j}(s)|
&\le
\|e_j\|_V
\int_s^t
\|\partial_tz_n(\tau)\|_{V^*}\,d\tau
\\
&\le
M_2\|e_j\|_V
|t-s|^{1/q'}.
\end{aligned}
$$

従って各係数列は一様等連続です。

一様有界性も示します。$V\hookrightarrow H$ は連続なので $z_n$ は $L^2(0,T;H)$ でも一様有界です。従って $a_{n,j}$ は $L^2(0,T)$ で一様有界であり、ある $\tau_{n,j}\in[0,T]$ を取って

$$
|a_{n,j}(\tau_{n,j})|
\le
T^{-1/2}\|a_{n,j}\|_{L^2(0,T)}
$$

とできます。上の等連続評価を $\tau_{n,j}$ と任意の $t$ に適用すれば

$$
\sup_n\|a_{n,j}\|_{L^\infty(0,T)}<\infty.
$$

ここで「一様有界かつ一様等連続なら一様収束部分列を持つ」という事実も、この場合は直接確認できます。$[0,T]$ の可算稠密集合 $D=\{r_1,r_2,\ldots\}$ を取ります。$r_1$ で値が収束する部分列、その中から $r_2$ でも収束する部分列、という入れ子の抽出を繰り返し、対角部分列を取れば $D$ 上の全点で収束します。

さらに $\varepsilon>0$ に対し、一様等連続性から

$
|t-s|<\delta
\quad\Longrightarrow\quad
|a_{n,j}(t)-a_{n,j}(s)|<\frac{\varepsilon}{3}
$

となる $\delta>0$ を $n$ に依らず選べます。$D$ から有限個の点 $r_{\ell_1},\ldots,r_{\ell_M}$ を選んで $[0,T]$ を $\delta$ 近傍で覆います。これら有限個の点では対角部分列は Cauchy なので、十分大きい $n,m$ と任意の $t$ に対し、$|t-r_{\ell_s}|<\delta$ となる点を選べば

$
\begin{aligned}
|a_{n,j}(t)-a_{m,j}(t)|
&\le
|a_{n,j}(t)-a_{n,j}(r_{\ell_s})|
\\
&\quad+
|a_{n,j}(r_{\ell_s})-a_{m,j}(r_{\ell_s})|
\\
&\quad+
|a_{m,j}(r_{\ell_s})-a_{m,j}(t)|
<\varepsilon.
\end{aligned}
$

従って各係数は一様収束部分列を持ちます。$j=1,\ldots,N$ は有限個なので同じ部分列を選べ、

$
Q_Kz_n
$

は $C([0,T];Q_KH)$、従って $L^2(0,T;H)$ で強収束します。

ここまでは固定した $K$ ごとの部分列です。一つの部分列で全ての周波数切断を扱うため、$K=1$ で部分列を取り、その中から $K=2$ の部分列を取り、以下同様に入れ子に抽出します。その対角部分列を改めて $z_n$ と書けば、任意の固定 $K$ について $Q_Kz_n$ が $L^2(0,T;H)$ で強収束します。

最後に $\varepsilon>0$ を取ります。まず

$
\frac{2M_1}{K}<\frac{\varepsilon}{2}
$

となる $K$ を固定します。上で選んだ共通の対角部分列では、この $K$ の低周波部分が Cauchy なので、十分大きい $n,m$ で

$$
\|Q_K(z_n-z_m)\|_{L^2H}<\frac{\varepsilon}{2}
$$

なら

$$
\begin{aligned}
\|z_n-z_m\|_{L^2H}
&\le
\|Q_K(z_n-z_m)\|_{L^2H}
\\
&\quad+
\|(I-Q_K)z_n\|_{L^2H}
+
\|(I-Q_K)z_m\|_{L^2H}
\\
&<
\varepsilon.
\end{aligned}
$$

従って部分列は $L^2(0,T;H)$ で Cauchy であり、完備性から強収束します。
<!-- proof-end -->

NS3 では $q=4/3$ としてこの定理を使います。

---

## 8. Galerkin 列から強 $L^2$ 収束を得る

第4節と第6節から

$$
u_m
\text{ は }L^2(0,T;V)\text{ で一様有界},
$$

$$
\partial_tu_m
\text{ は }L^{4/3}(0,T;V^*)\text{ で一様有界}
$$

です。

従って [周期版 Aubin--Lions 型コンパクト性](#thm-ns3-periodic-aubin-lions)により、部分列を取って

$$
\boxed{
u_m\to u
\quad\text{strongly in }L^2(0,T;H)
}
$$

とできます。

同じ部分列について

$$
u_m\rightharpoonup u
\quad\text{in }L^2(0,T;V)
$$

も成り立つように取れます。

強 $L^2_tH$ 収束からさらに部分列を取れば

$$
u_m(t)\to u(t)
\quad\text{in }H
$$

がほとんどすべての $t$ で成り立ちます。Galerkin 列の $L^\infty_tH$ 一様上界をこの点ごとの極限へ渡せるので

$$
u\in L^\infty(0,T;H).
$$

なおこの強収束と一様 $L^\infty_tH$ 上界から、$u_m\rightharpoonup^*u$ in $L^\infty(0,T;H)$ も従います。実際、$L^1_tH$ の試験関数を $L^2_tH$ 関数で近似し、近似部分には強 $L^2$ 収束、残差には一様 $L^\infty$ 上界を使えばよいです。

---

## 9. 強収束なら二次非線形項を通せる

差を一項ずつ $u$ に置き換えると

$$
u_m\otimes u_m-u\otimes u
=
(u_m-u)\otimes u_m
+
u\otimes(u_m-u).
$$

Cauchy--Schwarz により

$$
\begin{aligned}
\|u_m\otimes u_m-u\otimes u\|_{L^1_{t,x}}
&\le
\|u_m-u\|_{L^2_{t,x}}
\\
&\quad\times
\left(
\|u_m\|_{L^2_{t,x}}+\|u\|_{L^2_{t,x}}
\right),
\end{aligned}
$$

なので右辺は0へ収束します。

<a id="prop-ns3-nonlinear-limit"></a>

<!-- formal-statement-start -->
> **命題（強 $L^2$ 収束による対流項の極限）**  
> $u_m\to u$ strongly in $L^2(0,T;H)$ とする。このとき
>
$$
\boxed{
u_m\otimes u_m
\to
u\otimes u
\quad
\text{strongly in }L^1((0,T)\times\mathbb T^3)
}
$$
>
> である。特に任意の滑らかな発散零周期ベクトル場 $\varphi(t,x)$ に対して
>
$$
\int_0^T b(u_m,u_m,\varphi)\,dt
\to
\int_0^T b(u,u,\varphi)\,dt.
$$
<!-- formal-statement-end -->

### 証明

発散零条件と周期部分積分により

$$
b(u_m,u_m,\varphi)
=
-\int_{\mathbb T^3}
(u_m\otimes u_m):\nabla\varphi\,dx.
$$

従って

$$
\begin{aligned}
&
\left|
\int_0^T
b(u_m,u_m,\varphi)\,dt
-
\int_0^T
b(u,u,\varphi)\,dt
\right|
\\
&\le
\|\nabla\varphi\|_{L^\infty_{t,x}}
\|u_m\otimes u_m-u\otimes u\|_{L^1_{t,x}}
\to0.
\end{aligned}
$$

これが強収束を必要とした理由です。

---

## 10. 時間積分した弱形式で初期値も回収する

$v\in V$、$\eta\in C_c^\infty([0,T))$ を取ります。Galerkin 方程式には $P_mv\in H_m$ を入れ、さらに $\eta(t)$ を掛けて時間積分します。

時間微分項を部分積分すると

$$
\begin{aligned}
&
-\int_0^T(u_m,P_mv)\eta'\,dt
+
\nu\int_0^T(\nabla u_m,\nabla P_mv)\eta\,dt
\\
&\quad+
\int_0^Tb(u_m,u_m,P_mv)\eta\,dt
\\
&=
\int_0^T\langle f,P_mv\rangle\eta\,dt
+
(P_mu_0,P_mv)\eta(0).
\end{aligned}
$$

まず $v$ を滑らかな平均零・発散零周期場とします。Fourier 射影なので $P_mv\to v$ strongly in $V$ であり、滑らかさから $\nabla v\in L^\infty$ です。

- 時間項は $u_m\to u$ strongly in $L^2H$。
- 粘性項は $u_m\rightharpoonup u$ weakly in $L^2V$。
- 非線形項では、まず第9節を $v$ に使い、さらに
$
\int_0^T
|b(u_m,u_m,P_mv-v)|\,dt
\le
\|P_mv-v\|_V
\int_0^T
\|u_m\|_4^2\,dt
$
と評価します。NS2 の $L^4$ 評価と一様エネルギー評価により右辺第2因子は $m$ によらず有界なので、$P_mv\to v$ in $V$ からこの誤差は0へ収束します。
- 外力項は $P_mv\to v$ in $V$。
- 初期項は $P_mu_0\to u_0$ in $H$。

を使って極限を取れます。

従って

$$
\begin{aligned}
&
-\int_0^T(u,v)\eta'\,dt
+
\nu\int_0^T(\nabla u,\nabla v)\eta\,dt
+
\int_0^Tb(u,u,v)\eta\,dt
\\
&=
\int_0^T\langle f,v\rangle\eta\,dt
+
(u_0,v)\eta(0).
\end{aligned}
$$

この式はまず滑らかな発散零 $v$ について得られます。これらは $V$ に稠密です。また NS2 の三重線形形式の連続評価により、固定した $u(t)\in V$ に対する各項は $v$ について連続です。従って密度で任意の $v\in V$ へ延長でき、分布微分の意味で

$
\partial_tu+\nu Au+B(u,u)=f
\quad\text{in }V^*
$

と初期値 $u(0)=u_0$ を同時に読み取れます。

さらに極限方程式と第6節と同じ評価から

$$
\partial_tu\in L^{4/3}(0,T;V^*).
$$

固定した $v\in V$ に対して $t\mapsto(u(t),v)_H$ の微分は $\langle\partial_tu,v\rangle\in L^{4/3}(0,T)$ なので、このスカラー関数は絶対連続です。

$V$ は $H$ に稠密で、$u$ は $L^\infty_tH$ で有界なので、$v\in V$ から任意の $h\in H$ へ近似して

$$
u\in C_w([0,T];H)
$$

を得ます。

---

## 11. なぜエネルギー恒等式が不等式になるのか

Galerkin 解では正確なエネルギー恒等式

$$
\frac12\|u_m(t)\|_H^2
+\nu\int_0^t\|u_m(s)\|_V^2\,ds
=
\frac12\|P_mu_0\|_H^2
+\int_0^t\langle f(s),u_m(s)\rangle\,ds
$$

が成り立ちます。

しかし極限では $V$ について弱収束しか分かりません。ノルムの弱下半連続性から

$$
\int_0^t\|u(s)\|_V^2\,ds
\le
\liminf_{m\to\infty}
\int_0^t\|u_m(s)\|_V^2\,ds.
$$

一方、強 $L^2_tH$ 収束から部分列を取れば $u_m(t)\to u(t)$ in $H$ がほとんどすべての $t$ で成り立ち、外力項も弱 $L^2_tV$ 収束で極限を取れます。

従ってまずほとんどすべての $t$ で

$$
\frac12\|u(t)\|_H^2
+\nu\int_0^t\|u(s)\|_V^2\,ds
\le
\frac12\|u_0\|_H^2
+\int_0^t\langle f(s),u(s)\rangle\,ds.
$$

任意の時刻 $t$ には、上の不等式が成り立つ時刻 $t_n\downarrow t$ を取ります。弱連続性から

$$
u(t_n)\rightharpoonup u(t)
\quad\text{in }H
$$

なので

$$
\|u(t)\|_H^2
\le
\liminf_{n\to\infty}\|u(t_n)\|_H^2.
$$

積分項は $t_n\downarrow t$ で通常の積分連続性を持つため、同じエネルギー不等式が全ての $t\in[0,T]$ へ延長されます。

「恒等式が不等式へ落ちる」原因は、散逸項の $V$ ノルムについて強収束を持たず、弱下半連続性しか使えないことです。

---

## 12. 三次元周期 Navier--Stokes の大域弱解

<a id="thm-ns3-leray-hopf-existence"></a>

<!-- formal-statement-start -->
> **定理（三次元周期 Navier--Stokes の Leray--Hopf 大域弱解）**  
> $\nu>0$、
>
$$
u_0\in H,
\qquad
f\in L^2_{\mathrm{loc}}([0,\infty);V^*)
$$
>
> とする。このとき三次元トーラス上の非圧縮 Navier--Stokes 方程式
>
$$
\partial_tu+\nu Au+B(u,u)=f
$$
>
> には少なくとも一つの Leray--Hopf 弱解が存在する。
<!-- formal-statement-end -->

### 証明の見取り図

証明は

$$
\boxed{
\begin{array}{c}
\text{有限次元 Galerkin ODE}
\\
\downarrow
\\
L^\infty_tH\cap L^2_tV\text{ 一様評価}
\\
\downarrow
\\
\partial_tu_m\text{ の }L^{4/3}_tV^*\text{ 一様評価}
\\
\downarrow
\\
\text{周期版 Aubin--Lions}
\\
\downarrow
\\
u_m\to u\text{ strongly in }L^2_tH
\\
\downarrow
\\
u_m\otimes u_m\to u\otimes u
\\
\downarrow
\\
\text{弱形式・初期値・エネルギー不等式}
\end{array}
}
$$

です。

<!-- proof-start -->
### 証明

任意の $T>0$ を固定します。

[Galerkin 解の一様エネルギー評価](#prop-ns3-galerkin-energy)から

$$
\{u_m\}
\text{ は }
L^\infty(0,T;H)\cap L^2(0,T;V)
\text{ で一様有界}
$$

です。

[時間微分の $V^*$ 評価](#prop-ns3-time-derivative)から

$$
\{\partial_tu_m\}
\text{ は }
L^{4/3}(0,T;V^*)
\text{ で一様有界}
$$

です。

[周期版 Aubin--Lions 型コンパクト性](#thm-ns3-periodic-aubin-lions)を $q=4/3$ で適用し、部分列を取れば

$$
u_m\to u
\quad\text{strongly in }L^2(0,T;H),
$$

かつ

$$
u_m\rightharpoonup u
\quad\text{weakly in }L^2(0,T;V)
$$

となります。

[強 $L^2$ 収束による対流項の極限](#prop-ns3-nonlinear-limit)により、二次非線形項を時間積分弱形式で極限へ送れます。第10節の議論で弱形式と初期値を回収し、

$$
\partial_tu\in L^{4/3}(0,T;V^*),
\qquad
u\in C_w([0,T];H)
$$

を得ます。

第11節の弱下半連続性から、全ての $t\in[0,T]$ でエネルギー不等式が成り立ちます。従って $[0,T]$ 上の Leray--Hopf 弱解が得られました。

最後に $T=1,2,3,\ldots$ とします。Galerkin 解自身は全時間で存在します。$[0,1]$ で収束部分列を取り、その部分列から $[0,2]$ でさらに部分列を取り、これを繰り返します。対角部分列は任意の $[0,N]$ で上の収束性を持つので、一つの

$$
u:[0,\infty)\to H
$$

が全ての有限時間区間で Leray--Hopf 条件を満たします。これが大域弱解です。
<!-- proof-end -->

---

## 13. 何が解けて、何が残ったか

この章で

$$
u\in L^\infty_tL^2_x\cap L^2_tH^1_x
$$

という有限エネルギー解を全時間で作れました。

しかしこれは

$$
\int_0^T\|\nabla u(t)\|_2^2\,dt<\infty
$$

を与えるだけで、

$$
\sup_{0\le t\le T}\|\nabla u(t)\|_2<\infty
$$

を与えません。

また存在証明は少なくとも一つの弱解を作りますが、三次元でその弱解が一意であるとは示していません。

従って

$$
\boxed{
\text{大域弱解の存在}
\ne
\text{弱解の一意性}
\ne
\text{大域正則性}
}
$$

です。

NS4 では二次元へ移り、渦度の追加エネルギー評価が閉じることで、なぜ大域正則性まで進めるのかを調べます。

---

## 14. 演習

### Level A

<a id="ex-ns3-a01"></a>
#### NS3-A01 Galerkin エネルギー評価
- Level: A

Galerkin 方程式へ $u_m$ 自身を入れ、

$$
\frac12\frac{d}{dt}\|u_m\|_H^2
+\nu\|u_m\|_V^2
=
\langle f,u_m\rangle
$$

を導け。

<!-- solution-start -->
#### 詳細解答

$u_m=\sum_i d_iw_i$ なので第 $i$ 方程式へ $d_i$ を掛けて足します。

$$
\sum_i d_i(\partial_tu_m,w_i)
=
(\partial_tu_m,u_m)
=
\frac12\frac{d}{dt}\|u_m\|_H^2.
$$

同様に

$$
\sum_i d_i\nu(\nabla u_m,\nabla w_i)
=
\nu\|u_m\|_V^2.
$$

非線形項は

$$
\sum_i d_i b(u_m,u_m,w_i)
=
b(u_m,u_m,u_m)=0
$$

です。最後の等号は NS2 の反対称性によります。右辺は $\langle f,u_m\rangle$ なので結論を得ます。
<!-- solution-end -->

<a id="ex-ns3-a02"></a>
#### NS3-A02 非線形項の $V^*$ 評価
- Level: A

$$
\|B(u,u)\|_{V^*}
\le
C\|u\|_H^{1/2}\|u\|_V^{3/2}
$$

を導け。

<!-- solution-start -->
#### 詳細解答

$\|v\|_V=1$ とします。反対称性から

$$
|b(u,u,v)|
=
|b(u,v,u)|.
$$

Hölder の不等式で

$$
|b(u,v,u)|
\le
\|u\|_4^2\|\nabla v\|_2
=
\|u\|_4^2.
$$

NS2 の $L^4$ 評価

$$
\|u\|_4
\le
C\|u\|_H^{1/4}\|u\|_V^{3/4}
$$

を二乗して

$$
|b(u,u,v)|
\le
C\|u\|_H^{1/2}\|u\|_V^{3/2}.
$$

$\|v\|_V=1$ 上で上限を取れば求める $V^*$ 評価です。
<!-- solution-end -->

<a id="ex-ns3-a03"></a>
#### NS3-A03 $4/3$ の指数を確認する
- Level: A

$u\in L^\infty(0,T;H)\cap L^2(0,T;V)$ のとき

$$
g(t)=\|u(t)\|_H^{1/2}\|u(t)\|_V^{3/2}
$$

が $L^{4/3}(0,T)$ に属することを示せ。

<!-- solution-start -->
#### 詳細解答

$4/3$ 乗すると

$$
g(t)^{4/3}
=
\|u(t)\|_H^{2/3}\|u(t)\|_V^2.
$$

従って

$$
\int_0^Tg(t)^{4/3}\,dt
\le
\|u\|_{L^\infty(0,T;H)}^{2/3}
\int_0^T\|u(t)\|_V^2\,dt
<\infty.
$$

よって $g\in L^{4/3}(0,T)$ です。
<!-- solution-end -->

<a id="ex-ns3-a04"></a>
#### NS3-A04 Fourier 高周波尾部
- Level: A

$Q_K$ を $0<|k|\le K$ の Fourier モードだけを残す射影とする。$z\in V$ に対し

$$
\|(I-Q_K)z\|_H
\le
\frac1K\|z\|_V
$$

を示せ。

<!-- solution-start -->
#### 詳細解答

Parseval から

$$
\|(I-Q_K)z\|_H^2
=
(2\pi)^3\sum_{|k|>K}|\widehat z(k)|^2.
$$

$|k|>K$ では

$$
|\widehat z(k)|^2
\le
\frac1{K^2}|k|^2|\widehat z(k)|^2.
$$

従って

$$
\|(I-Q_K)z\|_H^2
\le
\frac1{K^2}
(2\pi)^3
\sum_{|k|>K}
|k|^2|\widehat z(k)|^2
\le
\frac1{K^2}\|z\|_V^2.
$$

平方根を取れば結論です。
<!-- solution-end -->

### Level B

<a id="ex-ns3-b01"></a>
#### NS3-B01 低周波係数の時間等連続性
- Level: B

$\partial_tz_n$ が $L^q(0,T;V^*)$ で一様有界、$q>1$ とする。固定した $e\in V$ について

$$
a_n(t)=(z_n(t),e)_H
$$

と置き、

$$
|a_n(t)-a_n(s)|
\le
C_e|t-s|^{1-1/q}
$$

を示せ。

<!-- solution-start -->
#### 詳細解答

分布微分の意味で

$$
a_n'(t)
=
\langle\partial_tz_n(t),e\rangle.
$$

従って

$$
|a_n(t)-a_n(s)|
\le
\|e\|_V
\int_s^t
\|\partial_tz_n(\tau)\|_{V^*}\,d\tau.
$$

$q'=q/(q-1)$ とすると Hölder の不等式から

$$
\int_s^t
\|\partial_tz_n\|_{V^*}
\le
\|\partial_tz_n\|_{L^q(s,t;V^*)}
|t-s|^{1/q'}.
$$

一様上界を $M$ とすれば

$$
|a_n(t)-a_n(s)|
\le
M\|e\|_V|t-s|^{1/q'}.
$$

$1/q'=1-1/q$ なので結論です。
<!-- solution-end -->

<a id="ex-ns3-b02"></a>
#### NS3-B02 二次項を強収束で通す
- Level: B

$$
u_m\to u
\quad
\text{strongly in }L^2_{t,x}
$$

とし、$\{u_m\}$ が同じ空間で有界とする。

$$
u_m\otimes u_m\to u\otimes u
\quad
\text{strongly in }L^1_{t,x}
$$

を示し、滑らかな試験関数に対して対流項を極限へ送れ。

<!-- solution-start -->
#### 詳細解答

恒等式

$$
u_m\otimes u_m-u\otimes u
=
(u_m-u)\otimes u_m
+
u\otimes(u_m-u)
$$

を使います。

Cauchy--Schwarz により

$$
\begin{aligned}
\|u_m\otimes u_m-u\otimes u\|_{L^1}
&\le
\|u_m-u\|_{L^2}
\left(
\|u_m\|_{L^2}+\|u\|_{L^2}
\right)
\\
&\to0.
\end{aligned}
$$

発散零条件から

$$
b(u_m,u_m,\varphi)
=
-\int
(u_m\otimes u_m):\nabla\varphi\,dx.
$$

従って

$$
\left|
\int_0^T
[b(u_m,u_m,\varphi)-b(u,u,\varphi)]\,dt
\right|
\le
\|\nabla\varphi\|_\infty
\|u_m\otimes u_m-u\otimes u\|_{L^1}
\to0.
$$
<!-- solution-end -->

<a id="ex-ns3-b03"></a>
#### NS3-B03 初期値とエネルギー不等式
- Level: B

時間積分弱形式の境界項が $(u_0,v)\eta(0)$ になることから初期値を回収し、Galerkin のエネルギー恒等式が極限で不等式になる理由を説明せよ。

<!-- solution-start -->
#### 詳細解答

極限弱形式では

$$
-\int_0^T(u,v)\eta'\,dt
=
\int_0^T
\langle\partial_tu,v\rangle\eta\,dt
+
(u(0),v)\eta(0)
$$

です。一方 Galerkin 初期値 $P_mu_0\to u_0$ の極限から境界項は

$$
(u_0,v)\eta(0)
$$

です。従って全ての $v\in V$ について

$$
(u(0),v)=(u_0,v).
$$

$V$ は $H$ に稠密なので $u(0)=u_0$ in $H$ です。

次に散逸項では

$$
u_m\rightharpoonup u
\quad\text{in }L^2(0,T;V)
$$

しか分かりません。弱下半連続性から

$$
\int_0^t\|u\|_V^2
\le
\liminf_m
\int_0^t\|u_m\|_V^2.
$$

従って Galerkin 左辺の極限より極限解の左辺は大きくならず、等号ではなく

$$
\frac12\|u(t)\|_H^2
+\nu\int_0^t\|u\|_V^2
\le
\frac12\|u_0\|_H^2
+\int_0^t\langle f,u\rangle
$$

が残ります。
<!-- solution-end -->

### Level C

<a id="ex-ns3-c01"></a>
#### NS3-C01 Leray--Hopf 存在証明を再構成する
- Level: C

$u_0\in H$、$f\in L^2(0,T;V^*)$ とする。次の順に Leray--Hopf 弱解の存在証明を再構成せよ。

1. Galerkin 解の $L^\infty_tH\cap L^2_tV$ 一様評価。
2. $\partial_tu_m$ の $L^{4/3}_tV^*$ 一様評価。
3. $L^2_tH$ 強収束部分列の抽出。
4. 二次非線形項の極限。
5. 初期値とエネルギー不等式の回収。

<!-- solution-start -->
#### 詳細解答

**Step 1：エネルギー。**  
$u_m$ を試験関数にすると $b(u_m,u_m,u_m)=0$ なので

$$
\frac12\frac{d}{dt}\|u_m\|_H^2
+\nu\|u_m\|_V^2
=
\langle f,u_m\rangle.
$$

双対性と Young の不等式で右辺を処理し、

$$
\|u_m\|_{L^\infty_tH}
+
\|u_m\|_{L^2_tV}
\le C_T
$$

を得ます。

**Step 2：時間微分。**  
反対称性と $L^4$ 補間評価から

$$
\|B(u_m,u_m)\|_{V^*}
\le
C\|u_m\|_H^{1/2}\|u_m\|_V^{3/2}.
$$

$4/3$ 乗すると右辺は $\|u_m\|_H^{2/3}\|u_m\|_V^2$ になるので時間積分可能です。粘性項と外力も合わせ、

$$
\|\partial_tu_m\|_{L^{4/3}_tV^*}\le C_T.
$$

**Step 3：強コンパクト性。**  
周期版 Aubin--Lions 型定理へ Step 1 と Step 2 を入れ、部分列を取って

$$
u_m\to u
\quad\text{strongly in }L^2_tH,
$$

$$
u_m\rightharpoonup u
\quad\text{weakly in }L^2_tV
$$

を得ます。

**Step 4：非線形項。**  
差を

$$
u_m\otimes u_m-u\otimes u
=
(u_m-u)\otimes u_m
+
u\otimes(u_m-u)
$$

と分ければ Cauchy--Schwarz から $L^1_{t,x}$ 強収束します。発散零条件で対流項を

$$
b(u_m,u_m,\varphi)
=
-\int(u_m\otimes u_m):\nabla\varphi
$$

と書けば極限を通せます。

**Step 5：初期値とエネルギー。**  
時間積分弱形式の初期境界項

$$
(P_mu_0,P_mv)\eta(0)
$$

は $(u_0,v)\eta(0)$ へ収束するので $u(0)=u_0$ を回収します。

Galerkin のエネルギー恒等式では散逸項が $L^2_tV$ の弱収束しか持たないため、弱下半連続性を使って

$$
\frac12\|u(t)\|_H^2
+\nu\int_0^t\|u\|_V^2
\le
\frac12\|u_0\|_H^2
+\int_0^t\langle f,u\rangle
$$

を得ます。

以上で $[0,T]$ 上の Leray--Hopf 弱解が存在します。任意の整数 $T=N$ について同じ Galerkin 列から部分列を入れ子に選び、対角部分列を取れば $[0,\infty)$ 上の大域弱解が得られます。
<!-- solution-end -->
