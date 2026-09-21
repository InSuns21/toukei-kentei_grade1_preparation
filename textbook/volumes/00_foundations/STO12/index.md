# STO12：Brownian martingale representation — Brown 運動の情報を stochastic integral で尽くす

<!-- definition-example-audit: strict -->

STO6 では Brown 運動に関する stochastic integral を

$$
H\longmapsto \int_0^T H_t\cdot dB_t
$$

という写像として構成しました。

しかし、ここまでの向きは

$$
\boxed{
H\text{ を与える}
\Longrightarrow
\text{martingale を作る}
}
$$

でした。

本章では逆向きを問います。

> Brown 運動の標本路だけから得られる square-integrable な未来の不確実性は、すべて Brownian stochastic integral として書けるのか。

答えは yes です。ただし **filtration が Brown 運動自身の情報だけから作られていること**が本質です。

有限時間 $T>0$ を固定し、$B=(B^1,\ldots,B^d)$ を $d$ 次元 standard Brownian motion とします。$\mathcal N$ を $P$-null sets の全部分集合からなる族とし、本章では

$$
\mathcal F_t^B
=
\sigma(B_s:0\le s\le t)\vee\mathcal N,
\qquad
0\le t\le T
$$

を使います。これは [STO4 の Brownian natural filtration](../STO4/index.md#def-sto4-brownian-filtration) を null completion した filtration です。本章の稠密性証明では、右連続化を追加した版を暗黙には使いません。

本章の中心線は

$$
\boxed{
\text{Itô isometry}
\to
\text{closed range}
\to
\text{exponential martingale の totality}
\to
\text{terminal variable representation}
\to
\text{martingale representation / predictable representation property}
}
$$

です。

Clark--Ocone formula は Malliavin calculus を必要とするため、本章には逆輸入しません。本章で証明するのは、integrand の **存在と一意性**です。一般の terminal variable から integrand を微分公式で直接計算する理論は別問題です。

---

## 1. Brownian stochastic integral の入力空間

STO6 の $L^2$ stochastic integral を Brown 運動へ特殊化します。

<a id="def-sto12-brownian-h2"></a>

<!-- formal-statement-start -->
> **定義（Brownian square-integrable integrand space）**  
> $[0,T]\times\Omega$ 上の $\mathbb R^d$-値 predictable process $H$ で
>
$$
E\int_0^T |H_t|^2dt<\infty
$$
>
> を満たすものを、$dt\otimes dP$ についてほとんど至る所（almost everywhere; a.e.）一致するものを同一視した空間を
>
$$
\mathcal H_B^2([0,T])
$$
>
> と書く。norm は
>
$$
\|H\|_{\mathcal H_B^2}^2
=
E\int_0^T|H_t|^2dt
$$
>
> とする。
<!-- formal-statement-end -->

Brown 運動では $[B^i,B^j]_t=\delta_{ij}t$ なので、STO6 の一般の $L^2(M)$ norm が時間積分へ簡約されています。

<!-- definition-example-start: def-sto12-brownian-h2 -->
### 直接例：$H_t=B_t$ は $\mathcal H_B^2$ に入る

**定義の確認**

$B_t$ は continuous adapted process なので predictable です。

さらに

$$
E|B_t|^2=dt
$$

より

$$
\begin{aligned}
E\int_0^T|B_t|^2dt
&=
\int_0^T E|B_t|^2dt\\
&=
d\int_0^T t\,dt\\
&=
\frac{dT^2}{2}
<\infty.
\end{aligned}
$$

従って

$$
B\in\mathcal H_B^2([0,T]).
$$

特に Itô formula から

$$
|B_T|^2-dT
=
2\int_0^T B_t\cdot dB_t
$$

という非自明な terminal variable が stochastic integral の値域に入ります。
<!-- definition-example-end -->

[STO6 の $L^2$ construction](../STO6/index.md#thm-sto6-l2-construction) により、各 $H\in\mathcal H_B^2$ について

$$
I_T(H)
:=
\int_0^T H_t\cdot dB_t
$$

が定義され、

$$
\boxed{
E[I_T(H)]=0,
\qquad
E[I_T(H)^2]
=
E\int_0^T|H_t|^2dt
}
$$

が成り立ちます。

つまり $I_T$ は $\mathcal H_B^2$ から centered $L^2$ 空間への isometry です。

---

## 2. representation とは何を要求するのか

<a id="def-sto12-prp"></a>

<!-- formal-statement-start -->
> **定義（predictable representation property）**  
> filtered probability space 上の $d$ 次元 Brown 運動 $B$ が filtration $(\mathcal F_t)$ に関して **predictable representation property** を持つとは、任意の square-integrable $(\mathcal F_t)$-martingale $M$ に対し、predictable process $H$ が存在して
>
$$
E\int_0^T|H_t|^2dt<\infty
$$
>
> かつ
>
$$
M_t
=
M_0
+
\int_0^t H_s\cdot dB_s,
\qquad
0\le t\le T
$$
>
> が indistinguishability の意味で成り立つことをいう。
>
> integrand は $dt\otimes dP$-a.e. の意味で一意であることも要求する。
<!-- formal-statement-end -->

以下では predictable representation property を **PRP** と略記します。

<!-- definition-example-start: def-sto12-prp -->
### 直接例：$|B_t|^2-dt$ はすでに representation を持つ

**定義の確認**

Itô formula により

$$
d|B_t|^2
=
2B_t\cdot dB_t+d\,dt.
$$

従って

$$
M_t:=|B_t|^2-dt
$$

は

$$
M_t
=
\int_0^t2B_s\cdot dB_s
$$

と書けます。

前節で

$$
E\int_0^T|2B_s|^2ds
=
2dT^2<\infty
$$

を確認できるため、$H_s=2B_s$ は admissible な integrand です。

本章の定理は、このように Itô formula から目で見える martingale だけでなく、**任意の** $L^2(\mathcal F_T^B)$ terminal variable について同じことができると主張します。
<!-- definition-example-end -->

---

## 3. 最初の鍵：terminal stochastic integral の値域は閉じている

まず

$$
\mathcal K_T
:=
\left\{
\int_0^T H_t\cdot dB_t:
H\in\mathcal H_B^2([0,T])
\right\}
$$

と置きます。

<a id="lem-sto12-closed-range"></a>

<!-- formal-statement-start -->
> **補題（Brownian terminal stochastic integral の値域は closed）**  
> $\mathcal K_T$ は centered space
>
$$
L_0^2(\mathcal F_T^B)
:=
\{Y\in L^2(\mathcal F_T^B):E[Y]=0\}
$$
>
> の closed linear subspace である。
<!-- formal-statement-end -->

### 証明の見取り図

[Itô isometry](../STO6/index.md#thm-sto6-ito-isometry-simple) が

$$
\|I_T(H)-I_T(K)\|_2
=
\|H-K\|_{\mathcal H_B^2}
$$

を与えます。

したがって terminal integrals が $L^2$ で Cauchy なら、integrands 自体も $\mathcal H_B^2$ で Cauchy です。

<!-- proof-start -->
### 証明

線形性は stochastic integral の線形性から従います。また各 $I_T(H)$ は square-integrable martingale の終値で初期値 0 なので

$$
E[I_T(H)]=0.
$$

従って

$$
\mathcal K_T\subseteq L_0^2(\mathcal F_T^B).
$$

次に $Y_n=I_T(H^{(n)})\in\mathcal K_T$ が $L^2$ で Cauchy とします。

[Itô isometry](../STO6/index.md#thm-sto6-ito-isometry-simple) より

$$
\begin{aligned}
\|H^{(n)}-H^{(m)}\|_{\mathcal H_B^2}^2
&=
E\int_0^T
|H_t^{(n)}-H_t^{(m)}|^2dt\\
&=
E|Y_n-Y_m|^2.
\end{aligned}
$$

よって $(H^{(n)})$ は $\mathcal H_B^2$ で Cauchy です。

predictable $\mathbb R^d$-値 functions の $L^2(dt\otimes dP)$ 空間は complete なので、ある predictable $H\in\mathcal H_B^2$ が存在して

$$
H^{(n)}\to H
\qquad
\text{in }\mathcal H_B^2.
$$

再び [Itô isometry](../STO6/index.md#thm-sto6-ito-isometry-simple) から

$$
I_T(H^{(n)})\to I_T(H)
\qquad
\text{in }L^2.
$$

$Y_n$ の $L^2$ 極限は一意なので、その極限は $I_T(H)\in\mathcal K_T$ です。

従って $\mathcal K_T$ は closed です。
<!-- proof-end -->

この補題により、あとは $\mathcal K_T$ の中に **稠密な test family** が入ることを示せば十分です。

---

## 4. deterministic integrand から exponential vector を作る

deterministic

$$
h\in L^2([0,T];\mathbb R^d)
$$

を固定し、

$$
M_t^h
=
\int_0^t h_s\cdot dB_s,
\qquad
q_t
=
\int_0^t|h_s|^2ds
$$

と置きます。

STO6 の deterministic Brownian integral の Gaussian 性を各成分へ適用すると

$$
M_t^h\sim N(0,q_t).
$$

<a id="lem-sto12-exponential-vector"></a>

<!-- formal-statement-start -->
> **補題（deterministic integrand の exponential martingale）**  
> deterministic $h\in L^2([0,T];\mathbb R^d)$ に対し
>
$$
Z_t^h
:=
\exp\left(
\int_0^t h_s\cdot dB_s
-\frac12\int_0^t|h_s|^2ds
\right)
$$
>
> と置く。このとき $(Z_t^h)_{0\le t\le T}$ は square-integrable martingale で
>
$$
E[(Z_t^h)^2]=e^{q_t},
$$
>
> かつ
>
$$
Z_t^h
=
1+
\int_0^t Z_s^h h_s\cdot dB_s.
$$
>
> 特に
>
$$
Z_T^h-1\in\mathcal K_T.
$$
<!-- formal-statement-end -->

### 証明の見取り図

$M^h$ の bracket は $q_t$ です。

従って $Z^h$ は STO7 の stochastic exponential そのものであり、stochastic differential は

$$
dZ_t^h=Z_t^h h_t\cdot dB_t.
$$

残る問題は local martingale で終わらず、本当に $L^2$ martingale であることです。これは deterministic $h$ なら Gaussian 計算で直接閉じます。

<!-- proof-start -->
### 証明

[STO7 の stochastic exponential identity](../STO7/index.md#prop-sto7-stochastic-exponential-identity) を

$$
M_t=M_t^h
$$

へ適用します。

Brownian integral の bracket は

$$
[M^h]_t
=
\int_0^t|h_s|^2ds
=
q_t
$$

なので

$$
Z_t^h
=
\mathcal E(M^h)_t
$$

であり、

$$
Z_t^h
=
1+\int_0^t Z_s^h\,dM_s^h
=
1+\int_0^tZ_s^hh_s\cdot dB_s
$$

を得ます。

次に $M_t^h\sim N(0,q_t)$ だから Gaussian のモーメント母関数より

$$
E[Z_t^h]
=
e^{-q_t/2}
E[e^{M_t^h}]
=
e^{-q_t/2}e^{q_t/2}
=
1.
$$

同様に

$$
\begin{aligned}
E[(Z_t^h)^2]
&=
e^{-q_t}
E[e^{2M_t^h}]\\
&=
e^{-q_t}e^{2q_t}\\
&=
e^{q_t}.
\end{aligned}
$$

従って

$$
\sup_{t\le T}E[(Z_t^h)^2]
\le
e^{q_T}<\infty.
$$

stochastic exponential は nonnegative local martingale なので supermartingale です。一方、全ての $t$ で期待値が $1=E[Z_0^h]$ のままです。

$0\le s<t\le T$ に対して

$$
E[Z_t^h\mid\mathcal F_s^B]\le Z_s^h
$$

で両辺の期待値が等しいため、非負な差の期待値は 0 です。従って

$$
E[Z_t^h\mid\mathcal F_s^B]=Z_s^h
$$

a.s. で、$Z^h$ は真の martingale です。

さらに

$$
\begin{aligned}
E\int_0^T|Z_s^hh_s|^2ds
&=
\int_0^T|h_s|^2e^{q_s}ds\\
&=
e^{q_T}-1
<\infty.
\end{aligned}
$$

最後の等号は $dq_s=|h_s|^2ds$ と

$$
d(e^{q_s})=e^{q_s}dq_s
$$

から従います。

従って積分は $\mathcal H_B^2$ integrand による terminal stochastic integral であり、

$$
Z_T^h-1
=
\int_0^T Z_s^hh_s\cdot dB_s
\in\mathcal K_T.
$$
<!-- proof-end -->

以下では $Z_T^h$ を **Gaussian exponential vector** と略記します。これは新しい確率過程ではなく、稠密性証明で使う test family の記号です。

---

## 5. 一次元 Gaussian で exponential がなぜ十分なのか

Brownian 標本路全体へ進む前に、有限次元の核心を切り出します。

$G\sim N(0,v)$、$v>0$ とし

$$
e_\theta(G)
=
\exp\left(
\theta G-\frac12v\theta^2
\right),
\qquad
\theta\in\mathbb R
$$

を考えます。

もし $g(G)\in L^2$ が全ての $e_\theta(G)$ と直交するなら、

$$
E[g(G)e^{\theta G}]=0
\qquad
(\forall\theta\in\mathbb R)
$$

です。

ここから $g=0$ を示します。

### 5.1 signed measure へ変換する

Gaussian law を $\gamma_v$ とし、

$$
\nu(A)
=
\int_A g(x)\gamma_v(dx)
$$

と置きます。

Cauchy--Schwarz により任意の $a>0$ について

$$
\begin{aligned}
\int e^{a|x|}\,|\nu|(dx)
&\le
\|g\|_{L^2(\gamma_v)}
\left(
\int e^{2a|x|}\gamma_v(dx)
\right)^{1/2}\\
&<\infty.
\end{aligned}
$$

Gaussian は全ての線形 exponential moment を持つからです。

仮定は

$$
\int e^{\theta x}\nu(dx)=0
\qquad
(\forall\theta\in\mathbb R)
$$

です。

### 5.2 全モーメントが 0 になる

指数可積分性があるため、$\theta=0$ の近くで積分記号下微分を任意回行えます。

従って各 $k\ge0$ に対し

$$
\int x^k\nu(dx)=0.
$$

### 5.3 特性関数も 0 になる

固定した $t\in\mathbb R$ に対して

$$
e^{itx}
=
\sum_{k=0}^\infty
\frac{(itx)^k}{k!}.
$$

絶対値の級数は $e^{|t||x|}$ で支配され、これは $|\nu|$ に関して可積分です。

よって和と積分を交換でき、

$$
\begin{aligned}
\int e^{itx}\nu(dx)
&=
\sum_{k=0}^\infty
\frac{(it)^k}{k!}
\int x^k\nu(dx)\\
&=0.
\end{aligned}
$$

$g_+(x)=\max\{g(x),0\}$、$g_-(x)=\max\{-g(x),0\}$ とし、$\nu_\pm(A)=\int_A g_\pm(x)\gamma_v(dx)$ と置きます。すると $\nu=\nu^+-\nu^-$ です。

$t=0$ から

$$
\nu^+(\mathbb R)=\nu^-(\mathbb R)
$$

です。共通値が 0 なら $\nu=0$ です。正なら両者をその共通質量で割って確率測度にすると、二つの確率測度は同じ特性関数を持ちます。

[F0-00P6 の特性関数の一意性](../F0_00P6_特性関数_中心極限定理/index.md#thm-f0-00p6-uniqueness) により両確率測度は一致し、

$$
\nu=0.
$$

従って $g=0$ $\gamma_v$-a.e. です。

つまり

$$
\boxed{
\operatorname{span}\{e_\theta:\theta\in\mathbb R\}
\text{ は }L^2(N(0,v))\text{ で dense}
}
$$

です。

---

## 6. 独立 Gaussian vector へ積み上げる

Brownian increments を有限個だけ観測すると、独立な一次元 Gaussian の直積になります。

一次元で dense な family が分かれば、有限直積でも product family

$$
\prod_{j=1}^m e_{\theta_j}(G_j)
$$

の線形 span は dense です。

理由を $m=2$ で確認します。

$f\in L^2(\gamma_1\otimes\gamma_2)$ が全ての product

$$
u(x_1)v(x_2)
$$

に直交し、$u,v$ がそれぞれ一次元 exponential span に属するとします。

固定した $v$ に対し

$$
g_v(x_1)
=
\int f(x_1,x_2)v(x_2)\gamma_2(dx_2)
$$

と置くと、[Fubini の定理](../F0_00D2C_積測度_Tonelli_Fubini/index.md#thm-f0-00d2c-02) と Cauchy--Schwarz により $g_v\in L^2(\gamma_1)$ です。

全ての $u$ について

$$
\int g_v(x_1)u(x_1)\gamma_1(dx_1)=0
$$

なので、一次元の totality から

$$
g_v=0
\qquad
\gamma_1\text{-a.e.}
$$

です。

第二変数について countable dense subset を一つ選べば、共通の full-measure set 上で

$$
\int f(x_1,x_2)v(x_2)\gamma_2(dx_2)=0
$$

が dense subset の全ての $v$ に対して成り立ちます。

従って一次元 totality をもう一度使うと

$$
f(x_1,\cdot)=0
\qquad
\gamma_2\text{-a.e.}
$$

です。

よって $f=0$ a.e.

有限個の独立 Gaussian についてはこの議論を帰納的に繰り返せます。

---

## 7. Brownian 標本路全体へ：dyadic information を増やす

<a id="lem-sto12-exponential-totality"></a>

<!-- formal-statement-start -->
> **補題（Gaussian exponential vectors の totality）**  
> $B$ を $d$ 次元 Brown 運動とし、
>
$$
\mathcal F_t^B
=
\sigma(B_s:0\le s\le t)\vee\mathcal N
$$
>
> をその completed natural filtration とする。
>
> deterministic
>
$$
h\in L^2([0,T];\mathbb R^d)
$$
>
> に対する
>
$$
Z_T^h
=
\exp\left(
\int_0^T h_s\cdot dB_s
-\frac12\int_0^T|h_s|^2ds
\right)
$$
>
> の線形 span は
>
$$
L^2(\mathcal F_T^B)
$$
>
> で dense である。
<!-- formal-statement-end -->

### 証明の見取り図

時間を dyadic partition で細かくします。

有限段階では情報は独立 Gaussian increments の有限個の vector です。前二節の有限次元 totality が使えます。

最後に [Lévy 上昇定理](../F0_00P3C_Levy上昇定理_情報の増加/index.md#thm-f0-00p3c-levy-upward) で有限段階の情報を Brownian 標本路全体へ増やします。

<!-- proof-start -->
### 証明

$Z\in L^2(\mathcal F_T^B)$ が全ての $Z_T^h$ と直交すると仮定します。

すなわち

$$
E[ZZ_T^h]=0
\qquad
\text{for every deterministic }h\in L^2([0,T];\mathbb R^d).
$$

$n\ge1$ に対して dyadic times

$$
t_k^{(n)}
=
\frac{kT}{2^n},
\qquad
k=0,\ldots,2^n
$$

を取り、

$$
\mathcal G_n
=
\sigma\left(
B_{t_k^{(n)}}:
k=0,\ldots,2^n
\right)
$$

と置きます。

$\mathcal G_n$ は増加列です。

各区間の各成分の increment

$$
\Delta_{k,j}^{(n)}
=
B_{t_k^{(n)}}^j-B_{t_{k-1}^{(n)}}^j
$$

は互いに独立で

$$
\Delta_{k,j}^{(n)}
\sim
N\left(0,\frac{T}{2^n}\right).
$$

従って $\mathcal G_n$ は有限個の独立 Gaussian variables が生成する $\sigma$ 代数です。

次に区間ごとに定数な deterministic $h$ を取ります。

$$
h_t^j
=
\theta_{k,j}
\qquad
t\in(t_{k-1}^{(n)},t_k^{(n)}].
$$

このとき

$$
\int_0^T h_t\cdot dB_t
=
\sum_{k,j}
\theta_{k,j}\Delta_{k,j}^{(n)}
$$

かつ

$$
\frac12\int_0^T|h_t|^2dt
=
\frac12
\sum_{k,j}
\theta_{k,j}^2\frac{T}{2^n}.
$$

従って $Z_T^h$ は前節で扱った一次元 Gaussian exponential の有限 product そのものです。

条件付き期待値

$$
Y_n
=
E[Z\mid\mathcal G_n]
$$

を取ります。

任意の $\mathcal G_n$-measurable exponential product $V$ は、上の形のある $Z_T^h$ と一致するので

$$
\begin{aligned}
E[Y_nV]
&=
E[E[Z\mid\mathcal G_n]V]\\
&=
E[ZV]\\
&=
0.
\end{aligned}
$$

有限独立 Gaussian における product exponential family の totality から

$$
Y_n=0
\qquad\text{a.s.}
$$

です。

Brownian 標本路は continuous なので、dyadic times の値全体から全時刻の値が復元できます。

従って augmentation 前には

$$
\sigma\left(\bigcup_{n=1}^\infty\mathcal G_n\right)
=
\sigma(B_t:0\le t\le T).
$$

null completion で追加されるのは null sets とその部分集合なので、$L^1$ random variables を almost surely 同じものとして扱う限り結果は変わりません。

$Z\in L^2$ なので $Z\in L^1$ でもあります。

[Lévy 上昇定理](../F0_00P3C_Levy上昇定理_情報の増加/index.md#thm-f0-00p3c-levy-upward) より

$$
E[Z\mid\mathcal G_n]
\to
E[Z\mid\mathcal F_T^B]
=
Z
\qquad
\text{in }L^1.
$$

左辺は全て 0 なので

$$
Z=0
\qquad\text{a.s.}
$$

です。

従って exponential vectors の直交補は $\{0\}$ であり、その線形 span は $L^2(\mathcal F_T^B)$ で dense です。
<!-- proof-end -->

ここが本章で最も長い論証です。

重要なのは、「Brownian filtration だから有限段階が独立 Gaussian increments で記述でき、その finite information が dyadic refinement で全情報へ増える」という構造です。

---

## 8. terminal variable を stochastic integral へ戻す

準備が全部そろいました。

<a id="thm-sto12-martingale-representation"></a>

<!-- formal-statement-start -->
> **定理（Brownian martingale representation theorem）**  
> $B$ を $d$ 次元 standard Brownian motion、$(\mathcal F_t^B)_{0\le t\le T}$ をその completed natural filtration とする。
>
> 任意の
>
$$
\xi\in L^2(\mathcal F_T^B)
$$
>
> に対し、一意な
>
$$
H\in\mathcal H_B^2([0,T])
$$
>
> が存在して
>
$$
\boxed{
\xi
=
E[\xi]
+
\int_0^T H_t\cdot dB_t
}
$$
>
> が成り立つ。
>
> 一意性は $dt\otimes dP$-a.e. の意味である。
<!-- formal-statement-end -->

### 証明の見取り図

1. terminal stochastic integrals の値域 $\mathcal K_T$ は closed。
2. exponential vectors の span は $L^2$ で dense。
3. 各 exponential vector について
   $$
   Z_T^h-1\in\mathcal K_T.
   $$
4. centered variable を exponential vectors で近似し、各近似から平均を引けば $\mathcal K_T$ 内の近似になる。
5. closedness で極限を $\mathcal K_T$ に戻す。
6. 一意性は [Itô isometry](../STO6/index.md#thm-sto6-ito-isometry-simple)。

<!-- proof-start -->
### 証明

$\xi\in L^2(\mathcal F_T^B)$ を固定し、

$$
\xi_0
=
\xi-E[\xi]
$$

と置きます。

[Gaussian exponential vectors の totality](#lem-sto12-exponential-totality) により、各 $n$ について有限個の deterministic integrands $h_{n,1},\ldots,h_{n,m_n}$ と実数係数 $a_{n,1},\ldots,a_{n,m_n}$ を選んで

$$
Y_n
=
\sum_{j=1}^{m_n}
a_{n,j}Z_T^{h_{n,j}}
$$

が

$$
Y_n\to\xi_0
\qquad
\text{in }L^2
$$

となるようにできます。

各 $Z_T^h$ は期待値 1 なので

$$
E[Y_n]
=
\sum_{j=1}^{m_n}a_{n,j}.
$$

$L^2$ 収束は $L^1$ 収束を含むため

$$
E[Y_n]\to E[\xi_0]=0.
$$

ここで

$$
\widetilde Y_n
=
Y_n-E[Y_n]
$$

と置きます。

すると

$$
\begin{aligned}
\widetilde Y_n
&=
\sum_{j=1}^{m_n}
a_{n,j}
\left(
Z_T^{h_{n,j}}-1
\right).
\end{aligned}
$$

[第4節の補題](#lem-sto12-exponential-vector) から各

$$
Z_T^{h_{n,j}}-1
$$

は $\mathcal K_T$ に属します。

従って線形性により

$$
\widetilde Y_n\in\mathcal K_T.
$$

また

$$
\begin{aligned}
\|\widetilde Y_n-\xi_0\|_2
&\le
\|Y_n-\xi_0\|_2
+
|E[Y_n]|\\
&\to0.
\end{aligned}
$$

[closed range lemma](#lem-sto12-closed-range) により $\mathcal K_T$ は closed なので

$$
\xi_0\in\mathcal K_T.
$$

従ってある $H\in\mathcal H_B^2$ が存在して

$$
\xi-E[\xi]
=
\int_0^T H_t\cdot dB_t.
$$

これで存在が示されました。

一意性を示します。

$H,K\in\mathcal H_B^2$ がともに同じ representation を与えるなら

$$
\int_0^T(H_t-K_t)\cdot dB_t=0
\qquad\text{a.s.}
$$

です。

[Itô isometry](../STO6/index.md#thm-sto6-ito-isometry-simple) から

$$
E\int_0^T|H_t-K_t|^2dt
=
E\left|
\int_0^T(H_t-K_t)\cdot dB_t
\right|^2
=
0.
$$

従って

$$
H=K
\qquad
dt\otimes dP\text{-a.e.}
$$

です。
<!-- proof-end -->

この証明では「integrand を直接発見する公式」を使っていません。

代わりに

$$
\text{closed range}
+
\text{explicit dense family}
$$

で存在を出しています。

これは functional analysis 的ですが、必要な部分は [Itô isometry](../STO6/index.md#thm-sto6-ito-isometry-simple) と Gaussian exponential の稠密性まで章内で展開しました。

---

## 9. terminal representation から process representation へ

<a id="cor-sto12-conditional-representation"></a>

<!-- formal-statement-start -->
> **系（conditional expectation process の representation）**  
> $\xi\in L^2(\mathcal F_T^B)$ とし、[Brownian martingale representation theorem](#thm-sto12-martingale-representation) の integrand を $H$ とする。
>
> このとき全ての $0\le t\le T$ について
>
$$
\boxed{
E[\xi\mid\mathcal F_t^B]
=
E[\xi]
+
\int_0^t H_s\cdot dB_s
}
$$
>
> a.s. である。右辺は continuous version を与える。
<!-- formal-statement-end -->

### 証明の見取り図

terminal equality

$$
\xi=E[\xi]+\int_0^T H_s\cdot dB_s
$$

へ $\mathcal F_t^B$ 条件付き期待値を取ります。

$t$ より後ろの stochastic integral の条件付き平均が 0 になるだけです。

<!-- proof-start -->
### 証明

terminal representation を

$$
\xi
=
E[\xi]
+
\int_0^tH_s\cdot dB_s
+
\int_t^TH_s\cdot dB_s
$$

と分けます。

前半は $\mathcal F_t^B$-measurable です。

また stochastic integral process

$$
N_u=\int_0^uH_s\cdot dB_s
$$

は [STO6 の $L^2$ construction](../STO6/index.md#thm-sto6-l2-construction) により square-integrable martingale なので

$$
E[N_T-N_t\mid\mathcal F_t^B]=0.
$$

従って

$$
E[\xi\mid\mathcal F_t^B]
=
E[\xi]
+
\int_0^tH_s\cdot dB_s.
$$

右辺は continuous stochastic integral なので、conditional expectation process の continuous version になっています。
<!-- proof-end -->

Brownian filtration 上では「terminal payoff の条件付き期待値」という抽象的な martingale が、実際に Brownian noise の逐次積分へ変換されます。

---

## 10. Brownian filtration は PRP を持つ

<a id="cor-sto12-brownian-prp"></a>

<!-- formal-statement-start -->
> **系（Brownian filtration の predictable representation property）**  
> $B$ の completed natural filtration $(\mathcal F_t^B)$ は、$B$ に関する predictable representation property を持つ。
>
> すなわち任意の square-integrable $(\mathcal F_t^B)$-martingale $M$ に対し、一意な $H\in\mathcal H_B^2([0,T])$ が存在して
>
$$
\boxed{
M_t
=
M_0
+
\int_0^t H_s\cdot dB_s
}
$$
>
> が $0\le t\le T$ で成り立つ。
<!-- formal-statement-end -->

<!-- proof-start -->
### 証明

$\xi=M_T$ と置きます。

martingale property と [tower property](../F0_00P3A_条件付き期待値_Radon_Nikodym/index.md#thm-f0-00p3a-tower) から

$$
M_t
=
E[M_T\mid\mathcal F_t^B]
=
E[\xi\mid\mathcal F_t^B].
$$

[conditional expectation process の representation](#cor-sto12-conditional-representation) より

$$
M_t
=
E[\xi]
+
\int_0^tH_s\cdot dB_s.
$$

completed Brownian natural filtration の $\mathcal F_0^B$ は trivial modulo null sets なので $M_0$ は a.s. 定数です。

さらに

$$
M_0
=
E[M_T]
=
E[\xi].
$$

従って

$$
M_t
=
M_0+\int_0^tH_s\cdot dB_s.
$$

integrand の一意性は terminal time $T$ での [Itô isometry](../STO6/index.md#thm-sto6-ito-isometry-simple) から従います。
<!-- proof-end -->

---

## 11. 具体例：exponential payoff は integrand まで見える

1 次元 Brown 運動と $\lambda\in\mathbb R$ に対し

$$
\xi
=
\exp\left(
\lambda B_T-\frac12\lambda^2T
\right)
$$

とします。

第4節の補題で

$$
Z_t
=
\exp\left(
\lambda B_t-\frac12\lambda^2t
\right)
$$

は martingale で

$$
dZ_t
=
\lambda Z_t\,dB_t.
$$

したがって

$$
\boxed{
E[\xi\mid\mathcal F_t^B]
=
Z_t
=
1+\int_0^t\lambda Z_s\,dB_s
}
$$

です。

この例では representation theorem が保証する integrand を明示でき、

$$
H_t
=
\lambda
\exp\left(
\lambda B_t-\frac12\lambda^2t
\right)
$$

です。

---

## 12. 具体例：digital payoff の integrand

1 次元 Brown 運動で

$$
\xi=1_{\{B_T>a\}}
$$

を考えます。

$0\le t<T$ では future increment が independent なので

$$
\begin{aligned}
M_t
&=
P(B_T>a\mid\mathcal F_t^B)\\
&=
P(B_T-B_t>a-B_t\mid\mathcal F_t^B)\\
&=
\Phi\left(
\frac{B_t-a}{\sqrt{T-t}}
\right),
\end{aligned}
$$

ただし $\Phi$ は標準正規分布関数です。

$$
u(t,x)
=
\Phi\left(
\frac{x-a}{\sqrt{T-t}}
\right)
$$

と置くと $u$ は $t<T$ で次の cancellation identity

$$
\partial_tu+\frac12\partial_{xx}u=0
$$

を満たし、

$$
\partial_xu(t,x)
=
\frac{1}{\sqrt{T-t}}
\varphi\left(
\frac{x-a}{\sqrt{T-t}}
\right)
$$

です。$\varphi$ は standard normal density です。

任意の $\varepsilon>0$ に対し $[0,T-\varepsilon]$ 上で Itô formula を使うと

$$
M_t
=
M_0
+
\int_0^t
\frac{1}{\sqrt{T-s}}
\varphi\left(
\frac{B_s-a}{\sqrt{T-s}}
\right)dB_s.
$$

$t\uparrow T$ では

$$
M_t\to1_{\{B_T>a\}}
$$

a.s. かつ $L^2$ です。$P(B_T=a)=0$ と $0\le M_t\le1$ を使えばよいです。

従って representation integrand は

$$
\boxed{
H_t
=
\frac{1}{\sqrt{T-t}}
\varphi\left(
\frac{B_t-a}{\sqrt{T-t}}
\right),
\qquad
t<T.
}
$$

です。

$t=T$ 近傍で見かけ上 $(T-t)^{-1/2}$ が現れますが、[Itô isometry](../STO6/index.md#thm-sto6-ito-isometry-simple) と

$$
\xi-M_0=\int_0^T H_t\,dB_t
$$

から

$$
E\int_0^T H_t^2dt
=
\operatorname{Var}(\xi)
<\infty.
$$

したがって pointwise な係数の発散だけを見て integrability を否定してはいけません。

---

## 13. filtration を広げると theorem は壊れる

Brownian martingale representation は「確率空間上に Brown 運動がある」だけでは成立しません。

Brown 運動 $B$ と、それと独立な Brown 運動 $C$ を取り、

$$
\mathcal F_t
=
\sigma(B_s,C_s:0\le s\le t)\vee\mathcal N
$$

とします。

$C$ はこの filtration に関する square-integrable martingale です。

もし $B$ がこの filtration でも PRP を持つなら、ある predictable $H$ が存在して

$$
C_t
=
\int_0^tH_s\,dB_s
$$

と書けるはずです。

しかし独立 Brownian motions なので

$$
[C,B]_t=0.
$$

一方、[STO7 の stochastic integral covariation formula](../STO7/index.md#lem-sto7-vector-brownian-integral-covariation) から representation が正しければ

$$
[C,B]_t
=
\int_0^tH_s\,ds.
$$

従って

$$
\int_0^tH_sds=0
\qquad
(\forall t)
$$

となり、

$$
H=0
\qquad
dt\otimes dP\text{-a.e.}
$$

です。

すると $C_t=0$ となって

$$
[C]_t=t
$$

に矛盾します。

つまり壊れた仮定は

$$
\boxed{
\mathcal F_t
=
\mathcal F_t^B
\text{ modulo null completion}
}
$$

です。

追加 noise $C$ が持つ情報は、$B$ だけの stochastic integral では作れません。

---

## 14. strong SDE の terminal payoff への橋

[STO9 の global Lipschitz SDE](../STO9/index.md#thm-sto9-global-existence-uniqueness) を Brownian natural filtration 上で解き、

$$
dX_t=b(X_t)dt+\sigma(X_t)dB_t
$$

とします。

terminal payoff

$$
\xi=g(X_T)
$$

が $L^2$ なら、$X_T$ は Brownian 標本路の measurable functional なので

$$
\xi\in L^2(\mathcal F_T^B).
$$

従って representation theorem から

$$
g(X_T)
=
E[g(X_T)]
+
\int_0^T H_t\cdot dB_t
$$

となる一意な $H$ が存在します。

ここで theorem が与えるのは **存在と一意性**です。

$H$ を

- smooth Markov representation の gradient で書く
- Malliavin derivative の条件付き期待値で書く
- control / hedge ratio として解釈する

には追加構造が必要です。

例えば Markov diffusion で十分滑らかな

$$
u(t,x)=E[g(X_T^{t,x})]
$$

が存在すれば Itô formula から形式的には

$$
H_t
=
\sigma(X_t)^\top\nabla u(t,X_t)
$$

が現れます。

このように追加正則性から integrand を同定する route は、本章の存在・一意性定理とは別の層です。STO12 の representation theorem 自体には後続・並行理論を逆輸入していません。

---

## 15. stochastic control / mathematical finance への橋

representation theorem は「Brownian noise で生じる $L^2$ uncertainty は Brownian integral で全部生成できる」という completeness statement です。

### stochastic control

value process や adjoint process が Brownian filtration の martingale part を持つとき、その martingale part は

$$
\int H_t\cdot dB_t
$$

と書けます。

後続の backward SDE や stochastic maximum principle では、この $H$ に相当する process が unknown の一つになります。

### mathematical finance

discounted terminal claim $\xi$ が Brownian filtration で $L^2$ なら

$$
E[\xi\mid\mathcal F_t^B]
=
E[\xi]
+
\int_0^tH_s\cdot dB_s.
$$

市場価格 process の martingale part が Brownian noise を十分な rank で張るなら、$H$ を portfolio exposure へ変換できます。

逆に noise の次元に対して traded risk factors が足りなければ、representation が存在しても portfolio で再現できるとは限りません。

したがって

$$
\boxed{
\text{Brownian PRP}
\neq
\text{任意の市場の complete market}
}
$$

です。後者には価格 dynamics の係数行列の rank 条件が別途必要です。

---

## 16. 仮定を外すとどこが壊れるか

### 16.1 $L^2$ を外すと closed-range proof をそのまま使えない

本章では [Itô isometry](../STO6/index.md#thm-sto6-ito-isometry-simple)

$$
E\left|
\int H\,dB
\right|^2
=
E\int|H|^2dt
$$

が証明の骨格です。

$\xi\in L^1$ だけなら同じ Hilbert / isometry argument は使えません。

local martingale representation などへ拡張するには localization が必要です。

### 16.2 filtration を拡大すると hidden noise が残る

前節の独立 Brownian motion $C$ が具体的な反例です。

exponential vectors $Z_T^h$ は $B$ の情報しか見ないので、$C_T$ のような追加情報を dense に近似できません。

壊れる箇所は totality lemma です。

### 16.3 null completion は theorem を壊さない

null completion は $P$-null sets とその部分集合を追加します。

$L^2$ random variables は almost surely 同じもので扱うので、raw Brownian filtration と completed natural filtration の違いは representation の a.s. statement を変えません。

### 16.4 Clark--Ocone は存在定理より強い

representation theorem は

$$
\exists! H
$$

を与えます。

Clark--Ocone 型 formula は適切な Malliavin differentiability の下で

$$
H_t
=
E[D_t\xi\mid\mathcal F_t]
$$

のように integrand を同定します。

これは本章の theorem より強い追加理論であり、本章へ前倒ししません。

---

## 17. 演習

#### STO12-A01 二次 martingale の representation
- Level: A
- 目安時間: 15分

1 次元 Brown 運動 $B$ について次を行え。

1. $B_T$ の terminal representation を書け。
2. Itô formula から $B_T^2-T$ の terminal representation を求めよ。
3. 2 の integrand が $\mathcal H_B^2([0,T])$ に入ることを確認せよ。

<!-- solution-start -->
### 詳細解答

1.

$$
B_T
=
0+\int_0^T1\,dB_t.
$$

従って

$$
\boxed{H_t=1}.
$$

2. $f(x)=x^2$ に Itô formula を適用すると

$$
d(B_t^2)=2B_t\,dB_t+dt.
$$

$0$ から $T$ まで積分して

$$
B_T^2-T
=
2\int_0^T B_t\,dB_t.
$$

従って

$$
\boxed{H_t=2B_t}.
$$

3.

$$
\begin{aligned}
E\int_0^T|2B_t|^2dt
&=
4\int_0^T E[B_t^2]dt\\
&=
4\int_0^T t\,dt\\
&=
2T^2<\infty.
\end{aligned}
$$

よって $2B\in\mathcal H_B^2([0,T])$ です。
<!-- solution-end -->

#### STO12-A02 exponential martingale の integrand
- Level: A
- 目安時間: 18分

1 次元 Brown 運動 $B$、$\lambda\in\mathbb R$ に対し

$$
\xi
=
\exp\left(
\lambda B_T-\frac12\lambda^2T
\right)
$$

とする。

1. $E[\xi]$ を求めよ。
2. conditional expectation process $M_t=E[\xi\mid\mathcal F_t^B]$ を求めよ。
3. $M_t=M_0+\int_0^tH_s\,dB_s$ の $H$ を求めよ。
4. $E\int_0^T H_s^2ds<\infty$ を確認せよ。

<!-- solution-start -->
### 詳細解答

1. $B_T\sim N(0,T)$ なので

$$
E[e^{\lambda B_T}]
=
e^{\lambda^2T/2}.
$$

従って

$$
E[\xi]
=
e^{-\lambda^2T/2}e^{\lambda^2T/2}
=
\boxed{1}.
$$

2. Brownian increment $B_T-B_t$ は $\mathcal F_t^B$ と独立で $N(0,T-t)$ に従います。

$$
\begin{aligned}
E[\xi\mid\mathcal F_t^B]
&=
e^{\lambda B_t-\lambda^2T/2}
E[e^{\lambda(B_T-B_t)}]\\
&=
e^{\lambda B_t-\lambda^2T/2}
e^{\lambda^2(T-t)/2}\\
&=
\boxed{
e^{\lambda B_t-\lambda^2t/2}
}.
\end{aligned}
$$

3. $M_t=e^{\lambda B_t-\lambda^2t/2}$ へ Itô formula を適用すると drift が相殺され、

$$
dM_t=\lambda M_t\,dB_t.
$$

従って

$$
\boxed{
H_t=\lambda e^{\lambda B_t-\lambda^2t/2}.
}
$$

4.

$$
E[M_t^2]
=
e^{\lambda^2t}.
$$

よって

$$
\begin{aligned}
E\int_0^T H_t^2dt
&=
\lambda^2\int_0^Te^{\lambda^2t}dt\\
&=
e^{\lambda^2T}-1
<\infty.
\end{aligned}
$$

$\lambda=0$ のときも左辺は 0 で同じ結論です。
<!-- solution-end -->

#### STO12-A03 terminal representation から途中時刻へ
- Level: A
- 目安時間: 15分

$\xi\in L^2(\mathcal F_T^B)$ が

$$
\xi
=
E[\xi]+\int_0^T H_s\cdot dB_s
$$

と表されているとする。

1. $N_t=\int_0^tH_s\cdot dB_s$ が square-integrable martingale である理由を述べよ。
2. $E[\xi\mid\mathcal F_t^B]$ を求めよ。
3. terminal variable が同じなら conditional expectation process も一意であることを説明せよ。

<!-- solution-start -->
### 詳細解答

1. $H\in\mathcal H_B^2$ なので

$$
E\int_0^T|H_s|^2ds<\infty.
$$

[STO6 の $L^2$ stochastic integral construction](../STO6/index.md#thm-sto6-l2-construction) により

$$
N_t=\int_0^tH_s\cdot dB_s
$$

は square-integrable martingale です。

2.

$$
\xi
=
E[\xi]+N_t+(N_T-N_t).
$$

martingale property から

$$
E[N_T-N_t\mid\mathcal F_t^B]=0.
$$

従って

$$
\boxed{
E[\xi\mid\mathcal F_t^B]
=
E[\xi]+\int_0^tH_s\cdot dB_s.
}
$$

3. 条件付き期待値は a.s. 一意です。従って同じ terminal variable $\xi$ から作る process

$$
E[\xi\mid\mathcal F_t^B]
$$

は各 $t$ で a.s. 一意です。

さらに右辺は continuous version なので、有理時刻上の a.s. 一致と 標本路の連続性 から全時刻で indistinguishable です。
<!-- solution-end -->

#### STO12-A04 integrand の一意性
- Level: A
- 目安時間: 15分

$H,K\in\mathcal H_B^2([0,T])$ が

$$
\int_0^T H_t\cdot dB_t
=
\int_0^T K_t\cdot dB_t
\qquad\text{a.s.}
$$

を満たすとする。

[Itô isometry](../STO6/index.md#thm-sto6-ito-isometry-simple) を使って

$$
H=K
\qquad
dt\otimes dP\text{-a.e.}
$$

を示せ。

<!-- solution-start -->
### 詳細解答

両辺を引くと

$$
\int_0^T(H_t-K_t)\cdot dB_t=0
\qquad\text{a.s.}
$$

です。

二乗して期待値を取り、[Itô isometry](../STO6/index.md#thm-sto6-ito-isometry-simple) を使うと

$$
\begin{aligned}
0
&=
E\left|
\int_0^T(H_t-K_t)\cdot dB_t
\right|^2\\
&=
E\int_0^T|H_t-K_t|^2dt.
\end{aligned}
$$

非負関数の積分が 0 なので

$$
|H_t-K_t|^2=0
$$

が $dt\otimes dP$-a.e. 成り立ちます。

従って

$$
\boxed{
H=K
\quad
dt\otimes dP\text{-a.e.}
}
$$

です。
<!-- solution-end -->

#### STO12-B01 digital payoff の representation
- Level: B
- 目安時間: 30分

1 次元 Brown 運動 $B$ と $a\in\mathbb R$ に対し

$$
\xi=1_{\{B_T>a\}}
$$

とする。

1. $M_t=E[\xi\mid\mathcal F_t^B]$ を $t<T$ で求めよ。
2. $M_t=u(t,B_t)$ と書き、$u$ が 前節と同じ cancellation identity を満たすことを確認せよ。
3. Itô formula から representation integrand を求めよ。
4. integrand は $t\uparrow T$ で singular に見えるのに、$\mathcal H_B^2$ に属する理由を説明せよ。

<!-- solution-start -->
### 詳細解答

1. $B_T-B_t\sim N(0,T-t)$ で $\mathcal F_t^B$ と独立なので

$$
\begin{aligned}
M_t
&=
P(B_T>a\mid\mathcal F_t^B)\\
&=
P(B_T-B_t>a-B_t\mid\mathcal F_t^B)\\
&=
\boxed{
\Phi\left(
\frac{B_t-a}{\sqrt{T-t}}
\right)
}.
\end{aligned}
$$

2.

$$
u(t,x)
=
\Phi\left(
\frac{x-a}{\sqrt{T-t}}
\right).
$$

$z=(x-a)/\sqrt{T-t}$ と置くと

$$
u_x
=
\frac{\varphi(z)}{\sqrt{T-t}},
$$

$$
u_{xx}
=
-\frac{z\varphi(z)}{T-t}.
$$

また

$$
\partial_t z
=
\frac{x-a}{2(T-t)^{3/2}}
=
\frac{z}{2(T-t)},
$$

なので

$$
u_t
=
\frac{z\varphi(z)}{2(T-t)}.
$$

従って

$$
u_t+\frac12u_{xx}=0.
$$

3. 任意の $\varepsilon>0$ に対し $t\le T-\varepsilon$ で Itô formula を使うと

$$
dM_t
=
u_x(t,B_t)dB_t.
$$

従って

$$
\boxed{
H_t
=
\frac{1}{\sqrt{T-t}}
\varphi\left(
\frac{B_t-a}{\sqrt{T-t}}
\right),
\quad t<T.
}
$$

4. $M_t\to\xi$ a.s. かつ $L^2$ です。実際 $0\le M_t\le1$ で、$B_t\to B_T$、$P(B_T=a)=0$ です。

従って

$$
\xi-M_0
=
\int_0^T H_t\,dB_t
$$

in $L^2$ であり、[Itô isometry](../STO6/index.md#thm-sto6-ito-isometry-simple) から

$$
E\int_0^T H_t^2dt
=
E[(\xi-M_0)^2]
=
\operatorname{Var}(\xi)
<\infty.
$$

pointwise な $(T-t)^{-1/2}$ だけでは $L^2(dt\otimes dP)$ integrability は判定できません。
<!-- solution-end -->

#### STO12-B02 Gaussian exponential totality の有限次元核心
- Level: B
- 目安時間: 35分

$G\sim N(0,v)$、$v>0$ とし、$g(G)\in L^2$ が全ての $\theta\in\mathbb R$ に対し

$$
E\left[
g(G)e^{\theta G-v\theta^2/2}
\right]
=
0
$$

を満たすとする。

1. signed measure $\nu(dx)=g(x)\gamma_v(dx)$ が任意の $a>0$ について
   $$
   \int e^{a|x|}|\nu|(dx)<\infty
   $$
   を満たすことを示せ。
2. 全ての moment $\int x^k\nu(dx)$ が 0 であることを示せ。
3. $\int e^{itx}\nu(dx)=0$ を示せ。
4. [特性関数の一意性](../F0_00P6_特性関数_中心極限定理/index.md#thm-f0-00p6-uniqueness) から $g=0$ a.e. を導け。
5. この結果から独立 Gaussian variables の有限直積でも product exponential family が total になる理由を説明せよ。

<!-- solution-start -->
### 詳細解答

1. Cauchy--Schwarz により

$$
\int e^{a|x|}|g(x)|\gamma_v(dx)
\le
\|g\|_{L^2(\gamma_v)}
\left(
E[e^{2a|G|}]
\right)^{1/2}.
$$

Gaussian は両側の exponential moment を持ち、

$$
e^{2a|G|}
\le
e^{2aG}+e^{-2aG},
$$

なので右辺は有限です。

2. 仮定から

$$
L(\theta)
:=
\int e^{\theta x}\nu(dx)
=
0
$$

が全実数 $\theta$ で成り立ちます。

1 の exponential integrability により $\theta=0$ の近くで任意回の積分記号下微分が正当化され、

$$
L^{(k)}(0)
=
\int x^k\nu(dx)
=
0.
$$

3. Taylor 展開

$$
e^{itx}
=
\sum_{k=0}^\infty\frac{(itx)^k}{k!}
$$

を使います。

絶対値級数は $e^{|t||x|}$ で支配され、1 により可積分です。

従って

$$
\begin{aligned}
\int e^{itx}\nu(dx)
&=
\sum_{k=0}^\infty
\frac{(it)^k}{k!}
\int x^k\nu(dx)\\
&=0.
\end{aligned}
$$

4. $g_+=\max\{g,0\}$、$g_-=\max\{-g,0\}$ から $\nu_\pm(A)=\int_Ag_\pm\,d\gamma_v$ と置き、$\nu=\nu^+-\nu^-$ と分けます。

$t=0$ で両者の total mass は等しいです。共通質量が正なら正規化して二つの確率測度を得ます。

3 から両確率測度の特性関数は一致するので、[特性関数の一意性](../F0_00P6_特性関数_中心極限定理/index.md#thm-f0-00p6-uniqueness) により測度は一致します。

従って $\nu=0$、したがって

$$
\boxed{g=0\quad\gamma_v\text{-a.e.}}
$$

です。

5. 二変数では、product family 全体に直交する $f(x_1,x_2)$ を仮定します。

第二変数の exponential $v(x_2)$ を一つ固定して

$$
g_v(x_1)
=
\int f(x_1,x_2)v(x_2)\gamma_2(dx_2)
$$

と置きます。

第一変数の全 exponential と直交するので 4 から $g_v=0$ です。

第二変数側で countable dense subset を取り、[Fubini の定理](../F0_00D2C_積測度_Tonelli_Fubini/index.md#thm-f0-00d2c-02) を使えば、a.e. $x_1$ に対し $f(x_1,\cdot)$ が第二変数の dense family 全体に直交すると分かります。

再び 4 により $f=0$ a.e.

有限個の場合はこれを帰納します。
<!-- solution-end -->

#### STO12-B03 enlarged filtration では PRP が壊れる
- Level: B
- 目安時間: 25分

独立な 1 次元 Brown 運動 $B,C$ を取り、

$$
\mathcal F_t
=
\sigma(B_s,C_s:0\le s\le t)^{\mathrm{aug}}
$$

とする。

$B$ がこの filtration に関して PRP を持たないことを、martingale $C$ を使って証明せよ。

<!-- solution-start -->
### 詳細解答

$C$ は $(\mathcal F_t)$-adapted で、未来 increment は $B,C$ の過去全体と独立です。

従って $C$ は square-integrable $(\mathcal F_t)$-martingale です。

もし $B$ が PRP を持つなら、ある predictable $H$ が存在して

$$
C_t=\int_0^tH_s\,dB_s.
$$

独立 Brownian motions の cross variation は

$$
[C,B]_t=0.
$$

一方、representation と [stochastic integral covariation formula](../STO7/index.md#lem-sto7-vector-brownian-integral-covariation) から

$$
[C,B]_t
=
\int_0^tH_sds.
$$

従って全ての $t$ で

$$
\int_0^tH_sds=0.
$$

各標本路について $t\mapsto\int_0^tH_sds$ は恒等的に 0 です。したがって、この indefinite Lebesgue integral の integrand の一意性から

$$
H_s=0
\qquad
dt\otimes dP\text{-a.e.}
$$

です。

すると

$$
C_t=\int_0^t0\,dB_s=0
$$

となりますが、実際には

$$
[C]_t=t.
$$

矛盾です。

従って

$$
\boxed{
B\text{ は joint filtration }(\mathcal F_t)\text{ では PRP を持たない}.
}
$$

Brownian natural filtration という仮定が、追加 noise を排除していました。
<!-- solution-end -->

#### STO12-C01 Ornstein--Uhlenbeck terminal square payoff
- Level: C
- 目安時間: 45分

$\alpha>0$、$\sigma\ne0$、$x\in\mathbb R$ を固定し、

$$
dX_t=-\alpha X_tdt+\sigma dB_t,
\qquad
X_0=x
$$

とする。

1. explicit solution
   $$
   X_t=e^{-\alpha t}x+\sigma\int_0^te^{-\alpha(t-s)}dB_s
   $$
   を導け。
2. $0\le t\le T$ に対し
   $$
   M_t=E[X_T^2\mid\mathcal F_t^B]
   $$
   を $X_t$ の関数として求めよ。
3. Itô formula を使って
   $$
   M_t=M_0+\int_0^tH_s\,dB_s
   $$
   の $H$ を求めよ。
4. $H\in\mathcal H_B^2([0,T])$ を確認せよ。
5. [Itô isometry](../STO6/index.md#thm-sto6-ito-isometry-simple) から
   $$
   \operatorname{Var}(X_T^2)
   =
   E\int_0^T H_s^2ds
   $$
   を説明せよ。

<!-- solution-start -->
### 詳細解答

1. integrating factor $e^{\alpha t}$ を使います。

finite variation process との product rule により

$$
d(e^{\alpha t}X_t)
=
\alpha e^{\alpha t}X_tdt
+
e^{\alpha t}dX_t.
$$

SDE を代入すると drift が相殺され、

$$
d(e^{\alpha t}X_t)
=
\sigma e^{\alpha t}dB_t.
$$

$0$ から $t$ まで積分して

$$
e^{\alpha t}X_t
=
x+\sigma\int_0^te^{\alpha s}dB_s.
$$

従って

$$
\boxed{
X_t
=
e^{-\alpha t}x
+
\sigma\int_0^te^{-\alpha(t-s)}dB_s.
}
$$

2. $t\le T$ で solution を分割すると

$$
X_T
=
e^{-\alpha(T-t)}X_t
+
\sigma\int_t^T e^{-\alpha(T-s)}dB_s.
$$

後半は $\mathcal F_t^B$ と独立で平均 0 です。

その variance は [Itô isometry](../STO6/index.md#thm-sto6-ito-isometry-simple) により

$$
\begin{aligned}
v_{T-t}
&=
\sigma^2\int_t^Te^{-2\alpha(T-s)}ds\\
&=
\frac{\sigma^2}{2\alpha}
\left(
1-e^{-2\alpha(T-t)}
\right).
\end{aligned}
$$

従って

$$
\boxed{
M_t
=
e^{-2\alpha(T-t)}X_t^2
+
\frac{\sigma^2}{2\alpha}
\left(
1-e^{-2\alpha(T-t)}
\right).
}
$$

3.

$$
A_t=e^{-2\alpha(T-t)}
$$

と置くと

$$
dA_t=2\alpha A_tdt.
$$

また Itô formula から

$$
d(X_t^2)
=
(-2\alpha X_t^2+\sigma^2)dt
+
2\sigma X_tdB_t.
$$

従って

$$
\begin{aligned}
d(A_tX_t^2)
&=
A_td(X_t^2)+X_t^2dA_t\\
&=
A_t\sigma^2dt
+
2\sigma A_tX_tdB_t.
\end{aligned}
$$

一方

$$
C_t
=
\frac{\sigma^2}{2\alpha}(1-A_t)
$$

なら

$$
dC_t
=
-\sigma^2A_tdt.
$$

drift が打ち消し合うので

$$
dM_t
=
2\sigma A_tX_tdB_t.
$$

従って

$$
\boxed{
H_t
=
2\sigma
e^{-2\alpha(T-t)}
X_t.
}
$$

4. $A_t\le1$ なので

$$
H_t^2
\le
4\sigma^2X_t^2.
$$

explicit solution または STO9 の moment estimate から

$$
\sup_{t\le T}E[X_t^2]<\infty.
$$

従って

$$
E\int_0^T H_t^2dt
\le
4\sigma^2T
\sup_{t\le T}E[X_t^2]
<\infty.
$$

よって $H\in\mathcal H_B^2$ です。

5. $M_T=X_T^2$、$M_0=E[X_T^2]$ なので

$$
X_T^2-E[X_T^2]
=
\int_0^T H_s\,dB_s.
$$

[Itô isometry](../STO6/index.md#thm-sto6-ito-isometry-simple) より

$$
\begin{aligned}
\operatorname{Var}(X_T^2)
&=
E\left[
(X_T^2-E[X_T^2])^2
\right]\\
&=
E\left|
\int_0^T H_s\,dB_s
\right|^2\\
&=
\boxed{
E\int_0^T H_s^2ds
}.
\end{aligned}
$$

この問題では abstract existence theorem の integrand が、Markov structure と Itô formula により explicit に同定できました。
<!-- solution-end -->

---

## 18. 本章で閉じたこと

本章では Brownian natural filtration 上で

$$
\boxed{
L^2(\mathcal F_T^B)
=
\mathbb R
\oplus
\left\{
\int_0^T H_t\cdot dB_t:
H\in\mathcal H_B^2
\right\}
}
$$

を証明しました。

核心は

1. [Itô isometry](../STO6/index.md#thm-sto6-ito-isometry-simple) による stochastic integral の closed range
2. deterministic exponential martingale
3. 一次元 Gaussian exponential の totality
4. 独立 Gaussian product への拡張
5. dyadic Brownian information と Lévy 上昇定理
6. closedness による極限回収

です。

これにより

$$
\xi
\longleftrightarrow
E[\xi\mid\mathcal F_t^B]
\longleftrightarrow
\int_0^tH_s\cdot dB_s
$$

が一本につながりました。

次の STO13 では continuous 標本路の世界から離れ、Poisson process・random measure を導入して jump noise の側へ進みます。
