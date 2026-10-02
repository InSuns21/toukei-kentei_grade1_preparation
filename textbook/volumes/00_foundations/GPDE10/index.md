# GPDE10：Galerkin・時間発展 PDE の弱解 — 有限次元近似から解を作る

<!-- definition-example-audit: strict -->

GPDE6--GPDE9 では、時間に依存しない楕円型 PDE に対して

$$
\text{弱形式}
\to
\text{エネルギー評価}
\to
\text{存在・一意性}
\to
\text{正則性}
$$

という流れを作りました。

時間発展 PDE では未知関数が

$$
u=u(t,x)
$$

となり、空間方向だけでなく時間方向の微分も扱う必要があります。

ここで最初に起きる変化は、

$$
u(t)\in H_0^1(\Omega)
$$

を各時刻で要求するだけでは足りないことです。

熱方程式

$$
u_t-\Delta u=f
$$

では、空間微分を含む $u$ と時間微分 $u_t$ は自然には同じ空間に入りません。

典型的には

$$
u\in L^2(0,T;H_0^1(\Omega)),
\qquad
u_t\in L^2(0,T;H^{-1}(\Omega)).
$$

そこで本章では

$$
\boxed{
H_0^1(\Omega)
\subset
L^2(\Omega)
\subset
H^{-1}(\Omega)
}
$$

という三つの空間を同時に使います。

存在証明の主役は **Galerkin 法**です。

これは有限要素法（FEM）専用の数値計算法ではありません。

$$
\boxed{
\text{有限次元で解く}
\to
\text{次元に依らないエネルギー評価}
\to
\text{弱収束部分列}
\to
\text{極限が無限次元の弱解}
}
$$

という、PDE の存在証明そのものです。

Encore V の有限要素法（FEM）はこの考えを「計算可能な有限次元空間」に具体化します。本章では、その前段にある理論的な骨格を閉じます。

以下、**ほとんど至る所（almost everywhere; a.e.）**を a.e. と略記します。

---

## 1. 時間依存関数をどの空間に置くか

まず時間方向の $L^2$ を固定します。

<a id="def-gpde10-bochner-l2"></a>

<!-- formal-statement-start -->
> **定義（時間依存 L2 空間）**  
> $X$ を実完備内積空間、$T>0$ とする。本章では
>
$$
L^2(0,T;X)
$$
>
> を、強可測（$X$ 値単関数列のほとんど至る所での極限として表せる）な $X$ 値関数 $u(t)$ で
>
$$
\boxed{
\int_0^T
\|u(t)\|_X^2\,dt
<\infty
}
$$
>
> を満たすものの空間として用いる。等しいとは時刻についてほとんど至る所で等しいことをいう。
<!-- formal-statement-end -->

<!-- definition-example-start: def-gpde10-bochner-l2 -->
### 最小例：時間関数と空間関数を分離する

**定義の確認**

$w\in X$、$\phi\in L^2(0,T)$ として

$$
u(t)=\phi(t)w
$$

と置きます。$\phi$ を可測代表元で取れば、$u$ は実数値単関数による $\phi$ の点ごとの近似へ $w$ を掛けることで強可測です。また

$$
\|u(t)\|_X^2
=
|\phi(t)|^2\|w\|_X^2.
$$

従って

$$
\|u\|_{L^2(0,T;X)}^2
=
\|\phi\|_{L^2(0,T)}^2
\|w\|_X^2.
$$

時間と空間の二つの $L^2$ が積の形で現れます。
<!-- definition-example-end -->

以下、

$$
V:=H_0^1(\Omega),
\qquad
H:=L^2(\Omega),
\qquad
V^*:=H^{-1}(\Omega)
$$

と書きます。

$V$ のノルムは [Poincaré 不等式](../GPDE4/index.md#thm-gpde4-poincare)を使って

$$
\|v\|_V:=\|\nabla v\|_{L^2(\Omega)}
$$

と取ります。

---

## 2. 空間の強さを三段階に分ける

時間微分を $L^2$ に要求すると、弱解の存在範囲を不必要に狭めます。

一方で $u_t$ を任意の 超関数 にすると、エネルギー評価 と結び付けにくくなります。

そこで

$$
V\subset H\subset V^*
$$

を使います。

<a id="def-gpde10-gelfand-triple"></a>

<!-- formal-statement-start -->
> **定義（Gelfand 三つ組）**  
> 実完備内積空間 $V,H$ について、$V$ が $H$ に連続かつ稠密に埋め込まれているとする。Riesz 同型で $H$ と $H^*$ を同一視し、
>
$$
h\in H
$$
>
> を
>
$$
v\longmapsto (h,v)_H
$$
>
> という $V$ 上の連続線形汎関数とみなす。この連続埋め込み
>
$$
\boxed{
V\hookrightarrow H\hookrightarrow V^*
}
$$
>
> を本章では Gelfand 三つ組 と呼ぶ。
<!-- formal-statement-end -->

<!-- definition-example-start: def-gpde10-gelfand-triple -->
### 直接例：$H_0^1\subset L^2\subset H^{-1}$

**定義の確認**

$\Omega$ を GPDE4 の [Poincaré 不等式](../GPDE4/index.md#thm-gpde4-poincare)が成り立つ有界領域とします。

$v\in H_0^1(\Omega)$ に対して

$$
\|v\|_{L^2}
\le
C_P\|\nabla v\|_{L^2}
=
C_P\|v\|_V.
$$

従って $V\hookrightarrow H$ は連続です。

次に $h\in L^2(\Omega)$ に対して

$$
F_h(v)
=
\int_\Omega hv\,dx
$$

と置くと、Cauchy--Schwarz と Poincaré により

$$
|F_h(v)|
\le
\|h\|_2\|v\|_2
\le
C_P\|h\|_2\|v\|_V.
$$

よって

$$
\|F_h\|_{V^*}
\le
C_P\|h\|_H.
$$

したがって

$$
L^2(\Omega)\hookrightarrow H^{-1}(\Omega)
$$

も連続です。

残る「稠密性」も確認しておきます。$g\in L^2(\Omega)$ を $\mathbb R^d$ へ 0 延長し、コンパクト集合による増大列

$$
K_1\subset K_2\subset\cdots\Subset\Omega,
\qquad
\bigcup_nK_n=\Omega
$$

を取ります。まず

$$
g\mathbf{1}_{K_n}\to g
\quad\text{in }L^2(\Omega)
$$

であり、各 $n$ について十分小さい 平滑化核 で $g\mathbf{1}_{K_n}$ を平滑化すれば、台を $\Omega$ 内に保った

$$
\varphi_{n,\varepsilon}\in C_c^\infty(\Omega)
$$

で $L^2$ 近似できます。従って $C_c^\infty(\Omega)$ は $L^2(\Omega)$ に稠密です。

定義から

$$
C_c^\infty(\Omega)\subset H_0^1(\Omega),
$$

なので $H_0^1(\Omega)$ も $L^2(\Omega)$ に稠密です。これで Gelfand 三つ組の「連続かつ稠密な埋め込み」まで実際に確認できました。

この埋め込みでは $h\in L^2$ を「関数」から「$H_0^1$ 上の線形汎関数」へ読み替えています。
<!-- definition-example-end -->

ここで空間の向きに注意します。

$$
V
\subset
H
\subset
V^*
$$

は

$$
\text{左ほど強い 正則性},
\qquad
\text{右ほど弱い 正則性}
$$

です。

熱方程式では

$$
u(t)\in V
$$

を時間について二乗可積分に保ちつつ、

$$
u_t(t)\in V^*
$$

まで弱めることで、空間二階微分を直接要求せずに時間発展を記述できます。

---

## 3. 熱方程式で使う弱解のクラス

時間発展問題を抽象形

$$
u_t+Au=f
$$

として見ます。

双線形形式 $a:V\times V\to\mathbb R$ に対し

$$
\langle Au,v\rangle_{V^*,V}
=
a(u,v)
$$

と置けば、Poisson の場合は

$$
a(u,v)
=
\int_\Omega\nabla u\cdot\nabla v\,dx
$$

です。

古典解のように $u_t$ と $Au$ をともに $H$ の元として扱う必要はありません。$u$ は空間方向には $V$ に置き、時間微分は $V^*$ まで弱めれば、方程式全体を $V^*$ の等式として読めます。さらに初期値は中間空間 $H$ で与えます。この三つを一つの解概念にまとめます。

<a id="def-gpde10-energy-solution"></a>

<!-- formal-statement-start -->
> **定義（時間発展問題のエネルギー弱解）**  
> $V\hookrightarrow H\hookrightarrow V^*$ を Gelfand 三つ組、$a:V\times V\to\mathbb R$ を有界双線形形式、$f\in L^2(0,T;V^*)$、$u_0\in H$ とする。  
> $u$ が
>
$$
u\in L^2(0,T;V),
\qquad
u_t\in L^2(0,T;V^*),
\qquad
u\in C([0,T];H)
$$
>
> を満たし、
>
$$
\boxed{
\langle u_t(t),v\rangle
+
a(u(t),v)
=
\langle f(t),v\rangle
}
$$
>
> がすべての $v\in V$ についてほとんどすべての $t\in(0,T)$ で成り立ち、さらに
>
$$
u(0)=u_0
\quad\text{in }H
$$
>
> を満たすとき、$u$ をこの時間発展問題の **エネルギー弱解** と呼ぶ。
<!-- formal-statement-end -->

<!-- definition-example-start: def-gpde10-energy-solution -->
### 直接例：熱方程式の単一モード

**定義の確認**

$\Omega=(0,\pi)$ とし

$$
u(t,x)=e^{-t}\sin x.
$$

境界では

$$
u(t,0)=u(t,\pi)=0.
$$

また

$$
u_t=-e^{-t}\sin x,
\qquad
u_x=e^{-t}\cos x.
$$

任意の $v\in H_0^1(0,\pi)$ に対し、まず 滑らかな $v$ で部分積分すると

$$
\int_0^\pi
u_xv_x\,dx
=
\int_0^\pi
e^{-t}\sin x\,v\,dx.
$$

従って

$$
\int_0^\pi
u_tv\,dx
+
\int_0^\pi
u_xv_x\,dx
=
0.
$$

密度で任意の $v\in H_0^1$ へ延長できるので、

$$
u_t-u_{xx}=0
$$

の エネルギー弱形式 を満たします。

さらに

$$
u(0,x)=\sin x.
$$

古典解を知っている場合でも、この計算により「古典解が弱解の定義へ入る」ことを直接確認できます。
<!-- definition-example-end -->

---

## 4. 時間微分が $V^*$ にしかなくてもエネルギーを微分できる

有限次元 Galerkin 解なら

$$
\frac{d}{dt}
\frac12\|u_m(t)\|_H^2
=
(u_m'(t),u_m(t))_H
$$

は普通の微分です。

しかし極限解では

$$
u_t\in V^*
$$

しか分かりません。

それでも Gelfand 三つ組の組合せなら

$$
\langle u_t,u\rangle_{V^*,V}
$$

が意味を持ち、エネルギー恒等式 を回収できます。

<a id="lem-gpde10-energy-identity"></a>

<!-- formal-statement-start -->
> **補題（Gelfand 三つ組のエネルギー恒等式）**  
> $V\hookrightarrow H\hookrightarrow V^*$ を Gelfand 三つ組 とし、
>
$$
u\in L^2(0,T;V),
\qquad
u_t\in L^2(0,T;V^*)
$$
>
> とする。ここで $u_t$ は時間について 超関数 の意味の微分とする。  
> このとき $u$ は $H$ 値の連続代表元を持ち、任意の $0\le s\le t\le T$ に対して
>
$$
\boxed{
\frac12\|u(t)\|_H^2
-
\frac12\|u(s)\|_H^2
=
\int_s^t
\langle u_t(\tau),u(\tau)\rangle
\,d\tau
}
$$
>
> が成り立つ。
<!-- formal-statement-end -->

### 証明の見取り図

時間方向だけ mollify します。

平滑化した関数 $u_\varepsilon$ なら通常の chain rule が使えます。

その identity を

$$
u_\varepsilon\to u
\quad\text{in }L^2(0,T;V),
$$

$$
(u_t)_\varepsilon\to u_t
\quad\text{in }L^2(0,T;V^*)
$$

で極限へ戻します。

これにより エネルギー の絶対連続性が得られます。

さらに各 $v\in V$ に対する

$$
t\longmapsto (u(t),v)_H
$$

の弱い連続性とノルムの連続性を組み合わせて、$H$ での強連続性を得ます。

<!-- proof-start -->
### 証明

$g:=u_t\in L^2(0,T;V^*)$ と置きます。

まず $0<\delta<T/2$ を固定し、

$$
[\delta,T-\delta]
$$

の内部で時間 平滑化 を行います。

時間の標準 平滑化核 $\rho_\varepsilon$ を使って

$$
u_\varepsilon
=
\rho_\varepsilon*u,
\qquad
g_\varepsilon
=
\rho_\varepsilon*g
$$

とします。

$\varepsilon<\delta/2$ とすれば端点の影響を受けません。

超関数微分と畳み込みの交換から

$$
\frac{d}{dt}u_\varepsilon
=
g_\varepsilon
$$

が $V^*$ の意味で成り立ちます。

ここで $u_\varepsilon=\rho_\varepsilon*u$ は $V$ 値関数の時間畳み込みでもあるので、通常の微分として

$$
\frac{d}{dt}u_\varepsilon
=
\rho_\varepsilon' * u
\in V
$$

です。この $V$ 値微分を $V^*$ へ埋め込んだものと、上の $g_\varepsilon$ は同じ時間超関数を表すので一致します。従って $u_\varepsilon$ は時間について滑らかな $V$ 値関数であり、

$$
\frac{d}{dt}
\frac12\|u_\varepsilon(t)\|_H^2
=
\left(
\frac{d}{dt}u_\varepsilon(t),
u_\varepsilon(t)
\right)_H
$$

と通常の連鎖律を使えます。$H\hookrightarrow V^*$ の同一視を使えば右辺は

$$
\langle
g_\varepsilon(t),
u_\varepsilon(t)
\rangle_{V^*,V}.
$$

従って $\delta\le s\le t\le T-\delta$ に対して

$$
\frac12\|u_\varepsilon(t)\|_H^2
-
\frac12\|u_\varepsilon(s)\|_H^2
=
\int_s^t
\langle
g_\varepsilon(\tau),
u_\varepsilon(\tau)
\rangle
\,d\tau.
$$

平滑化 の近似性から

$$
u_\varepsilon\to u
\quad\text{in }L^2(\delta,T-\delta;V),
$$

$$
g_\varepsilon\to g
\quad\text{in }L^2(\delta,T-\delta;V^*).
$$

したがって双対積について

$$
\begin{aligned}
&
\int_\delta^{T-\delta}
\left|
\langle g_\varepsilon,u_\varepsilon\rangle
-
\langle g,u\rangle
\right|dt
\\
&\le
\|g_\varepsilon-g\|_{L^2(V^*)}
\|u_\varepsilon\|_{L^2(V)}
+
\|g\|_{L^2(V^*)}
\|u_\varepsilon-u\|_{L^2(V)}
\to0.
\end{aligned}
$$

また $V\hookrightarrow H$ は連続なので

$$
u_\varepsilon\to u
\quad\text{in }L^2(\delta,T-\delta;H),
$$

従って

$$
\|u_\varepsilon(\cdot)\|_H^2
\to
\|u(\cdot)\|_H^2
\quad\text{in }L^1(\delta,T-\delta).
$$

よって

$$
E(t):=\frac12\|u(t)\|_H^2
$$

は a.e. 同値な絶対連続代表元を持ち、その 超関数微分 は

$$
E'(t)
=
\langle g(t),u(t)\rangle
$$

です。

従って a.e. の $s,t$ について

$$
E(t)-E(s)
=
\int_s^t
\langle g(\tau),u(\tau)\rangle\,d\tau.
$$

次に $v\in V$ を固定します。

超関数 の定義から

$$
\frac{d}{dt}
(u(t),v)_H
=
\langle g(t),v\rangle.
$$

右辺は $L^2(0,T)$ に属するので、

$$
t\longmapsto (u(t),v)_H
$$

は絶対連続代表元を持ちます。

$V$ は $H$ に稠密であり、上で得た $E(t)$ の連続代表元から $\|u(t)\|_H$ は局所有界です。

任意の $h\in H$ を取り、$v_j\in V$ を

$$
v_j\to h
\quad\text{in }H
$$

となるように選びます。ある時間区間で $\|u(t)\|_H\le K$ とすれば

$$
\begin{aligned}
|(u(t)-u(s),h)_H|
&\le
|(u(t)-u(s),v_j)_H|
\\
&\qquad
+
\|u(t)-u(s)\|_H\,\|h-v_j\|_H
\\
&\le
|(u(t)-u(s),v_j)_H|
+
2K\|h-v_j\|_H.
\end{aligned}
$$

固定した $j$ では第一項は $t\to s$ で 0 へ行き、その後 $j\to\infty$ とすれば第二項も 0 になります。従って

$$
t\longmapsto (u(t),h)_H
$$

はすべての $h\in H$ に対して連続で、$u$ は $H$ で弱連続な代表元を持ちます。

さらに

$$
t\longmapsto \|u(t)\|_H
$$

は $E(t)$ の連続性から連続です。$t_n\to t$ とすると弱連続性から

$$
u(t_n)\rightharpoonup u(t)
$$

であり、ノルムも収束します。そこで内積空間の恒等式

$$
\|u(t_n)-u(t)\|_H^2
=
\|u(t_n)\|_H^2
+
\|u(t)\|_H^2
-
2(u(t_n),u(t))_H
$$

を使うと右辺は 0 へ収束します。従って

$$
u(t_n)\to u(t)
\quad\text{in }H,
$$

すなわち

$$
u\in C([0,T];H)
$$

です。

最後に、a.e. で得た エネルギー恒等式 の両辺はこの連続代表元ではすべての $s,t$ へ連続に延長できるので、任意の $0\le s\le t\le T$ で

$$
\frac12\|u(t)\|_H^2
-
\frac12\|u(s)\|_H^2
=
\int_s^t
\langle u_t,u\rangle\,d\tau.
$$

これで示されました。
<!-- proof-end -->

この補題があるため、

$$
u_t\in V^*
$$

でも「解自身を掛ける エネルギー法」を厳密に使えます。

---

## 5. 有限次元近似を組み立てる

無限次元空間 $V$ 上で直接解を探す代わりに、

$$
V_1\subset V_2\subset\cdots\subset V
$$

という有限次元空間で近似します。

<a id="def-gpde10-galerkin"></a>

<!-- formal-statement-start -->
> **定義（Galerkin 近似）**  
> $V\hookrightarrow H$ とし、有限次元部分空間
>
$$
V_1\subset V_2\subset\cdots\subset V
$$
>
> が
>
$$
\overline{\bigcup_{m=1}^{\infty}V_m}^{\,V}
=
V
$$
>
> を満たすとする。  
> 初期値近似 $u_{0m}\in V_m$ を
>
$$
u_{0m}\to u_0
\quad\text{in }H
$$
>
> となるように取る。$u_m:[0,T]\to V_m$ が
>
$$
\boxed{
(u_m'(t),v_m)_H
+
a(u_m(t),v_m)
=
\langle f(t),v_m\rangle
}
$$
>
> をすべての $v_m\in V_m$ についてほとんどすべての $t$ で満たし、
>
$$
u_m(0)=u_{0m}
$$
>
> を満たすとき、$u_m$ を第 $m$ Galerkin 近似 と呼ぶ。
<!-- formal-statement-end -->

<!-- definition-example-start: def-gpde10-galerkin -->
### 直接例：二つの正弦モード

**定義の確認**

$\Omega=(0,\pi)$ で

$$
V_2
=
\operatorname{span}\{\sin x,\sin2x\}
$$

とします。

$$
u_2(t,x)
=
d_1(t)\sin x
+
d_2(t)\sin2x
$$

と置きます。

熱方程式 $u_t-u_{xx}=f$ の弱形式を $\sin x,\sin2x$ に対して課すと

$$
M d'(t)+K d(t)=F(t)
$$

という二次元 ODE になります。

ここで

$$
M_{ij}
=
\int_0^\pi
\sin(ix)\sin(jx)\,dx,
$$

$$
K_{ij}
=
\int_0^\pi
i\cos(ix)\,j\cos(jx)\,dx.
$$

正弦関数の直交性から

$$
M
=
\frac{\pi}{2}
\begin{pmatrix}
1&0\\
0&1
\end{pmatrix},
$$

$$
K
=
\frac{\pi}{2}
\begin{pmatrix}
1&0\\
0&4
\end{pmatrix}.
$$

したがって PDE は有限次元では普通の連立 ODE になります。

Galerkin 法の本質は、この ODE を明示的に解くことではなく、$m$ に依らない評価 を作ることです。
<!-- definition-example-end -->

一般の有限次元基底 $w_1,\dots,w_m$ に対し

$$
u_m(t)=\sum_{j=1}^m d_j(t)w_j
$$

と置けば、

$$
M d'(t)+K d(t)=F(t),
$$

$$
M_{ij}=(w_j,w_i)_H,
\qquad
K_{ij}=a(w_j,w_i)
$$

です。

$M$ は Gram 行列なので正定値で可逆です。

従って有限次元線形 ODE の理論により Galerkin 解は存在します。

ここで必要なのは有限次元 ODE の存在であり、無限次元 PDE の存在はまだ使っていません。

---

## 6. 次元に依らないアプリオリエネルギー評価

Galerkin 解の方程式で

$$
v_m=u_m(t)
$$

を選びます。

すると

$$
(u_m',u_m)_H
+
a(u_m,u_m)
=
\langle f,u_m\rangle.
$$

<a id="prop-gpde10-galerkin-energy"></a>

<!-- formal-statement-start -->
> **命題（Galerkin 解の一様エネルギー評価）**  
> $a$ が
>
$$
|a(u,v)|
\le
M\|u\|_V\|v\|_V
$$
>
> を満たし、さらにある $\alpha>0$ に対して
>
$$
a(v,v)
\ge
\alpha\|v\|_V^2
$$
>
> を満たすとする。Galerkin 解 $u_m$ に対して
>
$$
\boxed{
\sup_{0\le t\le T}
\|u_m(t)\|_H^2
+
\alpha
\int_0^T
\|u_m(t)\|_V^2\,dt
\le
\|u_{0m}\|_H^2
+
\frac1\alpha
\int_0^T
\|f(t)\|_{V^*}^2\,dt
}
$$
>
> が成り立つ。
<!-- formal-statement-end -->

### 証明の見取り図

有限次元なので

$$
(u_m',u_m)_H
=
\frac12\frac{d}{dt}\|u_m\|_H^2.
$$

強圧条件で空間 エネルギー を下から支え、右辺は [Young の不等式](../F0_00D2D_Lp_Holder_Minkowski/index.md#lem-f0-00d2d-01)で半分を吸収します。

重要なのは、右辺の定数に

$$
\dim V_m
$$

が現れないことです。

<!-- proof-start -->
### 証明

$v_m=u_m$ を入れると

$$
\frac12
\frac{d}{dt}
\|u_m\|_H^2
+
a(u_m,u_m)
=
\langle f,u_m\rangle.
$$

強圧条件から

$$
a(u_m,u_m)
\ge
\alpha\|u_m\|_V^2.
$$

また [双対ノルムの基本評価](../F0_02C2_線形汎関数_双対空間_Riesz/index.md#prop-f0-02c2-dual-norm-basic-estimate)から

$$
|\langle f,u_m\rangle|
\le
\|f\|_{V^*}\|u_m\|_V.
$$

[Young の不等式](../F0_00D2D_Lp_Holder_Minkowski/index.md#lem-f0-00d2d-01)

$$
ab
\le
\frac{1}{2\alpha}a^2
+
\frac{\alpha}{2}b^2
$$

を使うと

$$
\langle f,u_m\rangle
\le
\frac1{2\alpha}
\|f\|_{V^*}^2
+
\frac\alpha2
\|u_m\|_V^2.
$$

従って

$$
\frac12
\frac{d}{dt}
\|u_m\|_H^2
+
\frac\alpha2
\|u_m\|_V^2
\le
\frac1{2\alpha}
\|f\|_{V^*}^2.
$$

$0$ から $t$ まで積分して 2 倍すると

$$
\|u_m(t)\|_H^2
+
\alpha
\int_0^t
\|u_m(s)\|_V^2\,ds
\le
\|u_{0m}\|_H^2
+
\frac1\alpha
\int_0^t
\|f(s)\|_{V^*}^2\,ds.
$$

右辺は $t\le T$ で増加するので

$$
\sup_{0\le t\le T}
\|u_m(t)\|_H^2
+
\alpha
\int_0^T
\|u_m\|_V^2
\le
\|u_{0m}\|_H^2
+
\frac1\alpha
\int_0^T
\|f\|_{V^*}^2.
$$

これで示されました。
<!-- proof-end -->

この評価が Galerkin 法の心臓部です。

もし右辺に $m$ が出て

$$
C_m\to\infty
$$

となるなら、有限次元解を無限次元へ送れません。

---

## 7. 弱コンパクト性で有限次元から抜ける

初期値近似を

$$
u_{0m}\to u_0
\quad\text{in }H
$$

と取っているので

$$
\sup_m\|u_{0m}\|_H<\infty.
$$

前節から

$$
\sup_m
\|u_m\|_{L^2(0,T;V)}
<\infty.
$$

$L^2(0,T;V)$ は 完備内積空間なので、GPDE5 の [完備内積空間の有界列から弱収束部分列](../GPDE5/index.md#thm-gpde5-hilbert-weak-subsequence)を使って部分列を取り

$$
u_m
\rightharpoonup
u
\quad\text{弱く in }L^2(0,T;V)
$$

とできます。

ここでまだ

$$
u_m(t)\to u(t)
$$

が各時刻で成り立つとは言っていません。

Galerkin 法では、まず **時間積分した弱形式**へ移してから極限を取ります。

---

## 8. 強圧的時間発展問題を Galerkin 法で解く

<a id="thm-gpde10-galerkin-existence"></a>

<!-- formal-statement-start -->
> **定理（Galerkin 法による強圧的時間発展問題の存在一意性）**  
> $V\hookrightarrow H\hookrightarrow V^*$ を Gelfand 三つ組 とする。$a:V\times V\to\mathbb R$ は、ある $M,\alpha>0$ に対して
>
$$
|a(u,v)|
\le
M\|u\|_V\|v\|_V,
$$
>
$$
a(v,v)
\ge
\alpha\|v\|_V^2
$$
>
> をすべての $u,v\in V$ について満たすとする。  
> さらに
>
$$
f\in L^2(0,T;V^*),
\qquad
u_0\in H
$$
>
> とする。  
> $V$ には、有限次元部分空間 $V_m$ で
>
$$
V_1\subset V_2\subset\cdots,
\qquad
\overline{\bigcup_mV_m}^{\,V}=V
$$
>
> となる Galerkin 近似空間族 があると仮定する。  
> このとき一意な
>
$$
u\in L^2(0,T;V)
\cap C([0,T];H),
\qquad
u_t\in L^2(0,T;V^*)
$$
>
> が存在し、
>
$$
\boxed{
\langle u_t(t),v\rangle
+
a(u(t),v)
=
\langle f(t),v\rangle
}
$$
>
> が任意の $v\in V$ について a.e. $t$ で成り立ち、
>
$$
u(0)=u_0
$$
>
> を満たす。さらに
>
$$
\boxed{
\sup_{0\le t\le T}
\|u(t)\|_H^2
+
\alpha
\int_0^T
\|u(t)\|_V^2\,dt
\le
\|u_0\|_H^2
+
\frac1\alpha
\int_0^T
\|f(t)\|_{V^*}^2\,dt
}
$$
>
> が成り立つ。
<!-- formal-statement-end -->

### 証明の見取り図

証明は六段階です。

$$
\boxed{
\begin{array}{c}
\text{有限次元 ODE を解く}
\\
\downarrow
\\
\text{一様 エネルギー評価}
\\
\downarrow
\\
u_m\rightharpoonup u
\text{ in }L^2(0,T;V)
\\
\downarrow
\\
\text{時間積分した弱形式で極限通過}
\\
\downarrow
\\
u_t=f-Au\in L^2(0,T;V^*)
\\
\downarrow
\\
\text{エネルギー恒等式 で初期値・一意性を閉じる}
\end{array}
}
$$

弱収束だけで十分なのは、方程式が $u$ に関して線形だからです。

<!-- proof-start -->
### 証明

#### Step 1：Galerkin 解を作る

$u_{0m}\in V_m$ を

$$
u_{0m}\to u_0
\quad\text{in }H
$$

となるように取ります。

$V_m$ の基底を $w_1,\dots,w_m$ とし

$$
u_m(t)
=
\sum_{j=1}^m
d_j^{(m)}(t)w_j
$$

と置きます。

Galerkin 方程式は各 $i=1,\dots,m$ に対し

$$
(u_m',w_i)_H
+
a(u_m,w_i)
=
\langle f,w_i\rangle.
$$

係数ベクトル $d^{(m)}$ について

$$
M d'(t)+K d(t)=F(t)
$$

となります。

$M$ は $H$ 内積の Gram 行列なので正定値で可逆です。

従って

$$
d'(t)
=
-M^{-1}Kd(t)
+
M^{-1}F(t)
$$

は有限次元線形 ODE です。

$f\in L^2(0,T;V^*)$ なので各 $F_i(t)=\langle f(t),w_i\rangle$ は $L^2(0,T)$ に属します。

有限次元線形 ODE の理論から、絶対連続な $d^{(m)}$、従って $u_m$ が存在します。

#### Step 2：次元に依らない評価

[Galerkin 解の一様エネルギー評価](#prop-gpde10-galerkin-energy)から

$$
\sup_t\|u_m(t)\|_H^2
+
\alpha
\int_0^T
\|u_m\|_V^2
\le
\|u_{0m}\|_H^2
+
\frac1\alpha
\int_0^T
\|f\|_{V^*}^2.
$$

$u_{0m}\to u_0$ in $H$ なので右辺は $m$ に一様に有界です。

従って

$$
(u_m)
$$

は $L^2(0,T;V)$ の有界列です。

#### Step 3：弱収束部分列

$L^2(0,T;V)$ は 完備内積空間なので、部分列を取り直して

$$
u_m
\rightharpoonup
u
\quad\text{弱く in }L^2(0,T;V)
$$

とできます。

連続埋め込み $V\hookrightarrow H$ により

$$
u_m
\rightharpoonup
u
\quad\text{弱く in }L^2(0,T;H)
$$

も成り立ちます。

#### Step 4：時間積分した Galerkin 方程式へ移る

$v$ を

$$
v\in\bigcup_{N=1}^{\infty}V_N
$$

から固定します。

ある $N$ が存在して $v\in V_N$ です。

したがって $m\ge N$ なら $v\in V_m$ なので

$$
(u_m',v)_H
+
a(u_m,v)
=
\langle f,v\rangle
$$

が成り立ちます。

$\eta\in C^\infty([0,T])$ を

$$
\eta(T)=0
$$

となるように取ります。

時間積分して第一項を部分積分すると

$$
\begin{aligned}
&
-\int_0^T
(u_m(t),v)_H\eta'(t)\,dt
+
\int_0^T
a(u_m(t),v)\eta(t)\,dt
\\
&=
\int_0^T
\langle f(t),v\rangle\eta(t)\,dt
+
(u_{0m},v)_H\eta(0).
\end{aligned}
$$

ここでは $u_m(0)=u_{0m}$ を使いました。

#### Step 5：弱収束で極限を通す

第一項は

$$
u_m\rightharpoonup u
\quad\text{in }L^2(0,T;H)
$$

より

$$
\int_0^T
(u_m,v)_H\eta'
\to
\int_0^T
(u,v)_H\eta'.
$$

第二項について、固定した $v\in V$ に対し

$$
w\longmapsto a(w,v)
$$

は $V$ 上の連続線形汎関数です。

従って

$$
\int_0^T
a(u_m,v)\eta
\to
\int_0^T
a(u,v)\eta.
$$

初期値項は

$$
u_{0m}\to u_0
\quad\text{in }H
$$

より

$$
(u_{0m},v)_H
\to
(u_0,v)_H.
$$

したがって

$$
\begin{aligned}
&
-\int_0^T
(u,v)_H\eta'\,dt
+
\int_0^T
a(u,v)\eta\,dt
\\
&=
\int_0^T
\langle f,v\rangle\eta\,dt
+
(u_0,v)_H\eta(0)
\end{aligned}
$$

を得ます。

今は $v$ を $\bigcup_mV_m$ から取っていますが、この和集合は $V$ で稠密です。

各項は $v$ に関して連続なので、任意の $v\in V$ へ延長できます。

#### Step 6：時間微分を同定する

$A:V\to V^*$ を

$$
\langle Au,v\rangle
=
a(u,v)
$$

で定めます。

有界性 から

$$
\|Au\|_{V^*}
\le
M\|u\|_V.
$$

従って

$$
Au\in L^2(0,T;V^*).
$$

また $f\in L^2(0,T;V^*)$ なので

$$
g:=f-Au
\in
L^2(0,T;V^*).
$$

$\eta(0)=\eta(T)=0$ の テスト関数 に限定すれば上の積分恒等式は

$$
-\int_0^T
(u,v)_H\eta'
=
\int_0^T
\langle g,v\rangle\eta
$$

です。

従って時間 超関数微分 は

$$
u_t=g=f-Au
\in L^2(0,T;V^*).
$$

[Gelfand 三つ組のエネルギー恒等式](#lem-gpde10-energy-identity)から

$$
u\in C([0,T];H).
$$

この連続代表元に対する時間部分積分は

$$
\begin{aligned}
-\int_0^T
(u,v)_H\eta'
&=
\int_0^T
\langle u_t,v\rangle\eta\,dt
+
(u(0),v)_H\eta(0)
\end{aligned}
$$

です。

一方、Galerkin 極限で得た式では境界項が

$$
(u_0,v)_H\eta(0)
$$

でした。

両者を比較して

$$
(u(0)-u_0,v)_H=0
\qquad
(\forall v\in V).
$$

$V$ は $H$ に稠密なので

$$
u(0)=u_0
\quad\text{in }H.
$$

これで存在が示されました。

#### Step 7：極限解の エネルギー評価

方程式へ $v=u(t)$ を入れることは、[Gelfand 三つ組のエネルギー恒等式](#lem-gpde10-energy-identity)により正当化できます。

$$
\frac12
\frac{d}{dt}
\|u\|_H^2
+
a(u,u)
=
\langle f,u\rangle.
$$

Galerkin 解と同じ 強圧条件と [Young の不等式](../F0_00D2D_Lp_Holder_Minkowski/index.md#lem-f0-00d2d-01)から

$$
\frac12
\frac{d}{dt}
\|u\|_H^2
+
\frac\alpha2
\|u\|_V^2
\le
\frac1{2\alpha}
\|f\|_{V^*}^2.
$$

積分して

$$
\sup_t\|u(t)\|_H^2
+
\alpha
\int_0^T
\|u\|_V^2
\le
\|u_0\|_H^2
+
\frac1\alpha
\int_0^T
\|f\|_{V^*}^2.
$$

#### Step 8：一意性

$u_1,u_2$ が同じ $f,u_0$ に対する二解とし

$$
w=u_1-u_2
$$

と置きます。

すると

$$
w_t+Aw=0,
\qquad
w(0)=0.
$$

[Gelfand 三つ組のエネルギー恒等式](#lem-gpde10-energy-identity)から

$$
\frac12
\frac{d}{dt}
\|w\|_H^2
+
a(w,w)
=
0.
$$

強圧条件により

$$
\frac12
\frac{d}{dt}
\|w\|_H^2
+
\alpha\|w\|_V^2
\le0.
$$

$0$ から $t$ まで積分すると

$$
\frac12\|w(t)\|_H^2
+
\alpha
\int_0^t
\|w\|_V^2
\le0.
$$

両項は非負なので

$$
w(t)=0
$$

です。

従って解は一意です。
<!-- proof-end -->

ここで使った「コンパクト性」は強収束を作る コンパクト埋め込み ではなく、完備内積空間の有界列から **弱収束部分列を取り出す弱 コンパクト性** です。

線形問題ではこれで極限通過できます。

---

## 9. 熱方程式へ適用する

<a id="cor-gpde10-heat-existence"></a>

<!-- formal-statement-start -->
> **系（零 Dirichlet 熱方程式のエネルギー弱解）**  
> $\Omega\subset\mathbb R^d$ を Poincaré 不等式が成り立つ有界領域とし、
>
$$
f\in L^2(0,T;H^{-1}(\Omega)),
\qquad
u_0\in L^2(\Omega)
$$
>
> とする。  
> このとき
>
$$
u_t-\Delta u=f,
\qquad
u|_{\partial\Omega}=0,
\qquad
u(0)=u_0
$$
>
> には一意な
>
$$
u\in L^2(0,T;H_0^1(\Omega))
\cap C([0,T];L^2(\Omega)),
$$
>
$$
u_t\in L^2(0,T;H^{-1}(\Omega))
$$
>
> の エネルギー弱解が存在する。
<!-- formal-statement-end -->

<!-- proof-start -->
### 証明

$$
V=H_0^1(\Omega),
\qquad
H=L^2(\Omega)
$$

とし

$$
a(u,v)
=
\int_\Omega
\nabla u\cdot\nabla v\,dx
$$

と置きます。

さらに、主定理で必要な可算個の Galerkin 近似空間も用意できます。その理由を確認します。

Lebesgue 測度を入れた $\Omega\subset\mathbb R^d$ では、係数を有理数に取り、端点が有理数の直方体の有限和の指示関数を使えば、$L^2(\Omega)$ に可算稠密集合を作れます。したがって

$$
L^2(\Omega)^{d+1}
$$

も可分です。

$H^1(\Omega)$ の元 $v$ を

$$
v
\longmapsto
(v,\partial_1v,\ldots,\partial_dv)
$$

で $L^2(\Omega)^{d+1}$ の部分空間とみなすと、$H^1$ ノルムはこの積空間のノルムです。よって $H^1(\Omega)$ は可分で、その部分空間 $H_0^1(\Omega)$ も可分です。

そこで $H_0^1(\Omega)$ に稠密な列 $(w_j)_{j\ge1}$ を取り、

$$
V_m
=
\operatorname{span}\{w_1,\ldots,w_m\}
$$

と置けば

$$
V_1\subset V_2\subset\cdots,
\qquad
\overline{\bigcup_mV_m}^{\,H_0^1}
=
H_0^1(\Omega)
$$

となります。これで主定理の Galerkin 近似空間族の仮定も確認できました。

Cauchy--Schwarz から

$$
|a(u,v)|
\le
\|u\|_V\|v\|_V.
$$

また

$$
a(v,v)
=
\|\nabla v\|_2^2
=
\|v\|_V^2.
$$

従って 有界性定数 $M=1$、強圧定数 $\alpha=1$ と取れます。

前節の主定理を適用すれば結論を得ます。
<!-- proof-end -->

この系は PDE3 の Fourier 級数解より弱い初期値

$$
u_0\in L^2
$$

でも意味を持ちます。

明示解を書けなくても、エネルギー評価 と弱 コンパクト性 だけで解を構成できる点が重要です。

---

## 10. 初期値・外力に対する連続依存

存在だけでなく、データを少し変えたとき解が少しだけ変わることも エネルギー評価 から出ます。

<a id="prop-gpde10-stability"></a>

<!-- formal-statement-start -->
> **命題（初期値・外力に対する連続依存）**  
> 主定理と同じ仮定の下で、$u_1,u_2$ をデータ
>
$$
(f_1,u_{01}),
\qquad
(f_2,u_{02})
$$
>
> に対応する エネルギー弱解とする。このとき
>
$$
\boxed{
\sup_{0\le t\le T}
\|u_1(t)-u_2(t)\|_H^2
+
\alpha
\int_0^T
\|u_1-u_2\|_V^2\,dt
\le
\|u_{01}-u_{02}\|_H^2
+
\frac1\alpha
\int_0^T
\|f_1-f_2\|_{V^*}^2\,dt
}
$$
>
> が成り立つ。
<!-- formal-statement-end -->

<!-- proof-start -->
### 証明

$$
w=u_1-u_2,
\qquad
g=f_1-f_2
$$

と置きます。

差を取ると

$$
w_t+Aw=g,
\qquad
w(0)=u_{01}-u_{02}.
$$

[Gelfand 三つ組のエネルギー恒等式](#lem-gpde10-energy-identity)から

$$
\frac12
\frac{d}{dt}
\|w\|_H^2
+
a(w,w)
=
\langle g,w\rangle.
$$

強圧条件と [Young の不等式](../F0_00D2D_Lp_Holder_Minkowski/index.md#lem-f0-00d2d-01)から

$$
\frac12
\frac{d}{dt}
\|w\|_H^2
+
\frac\alpha2
\|w\|_V^2
\le
\frac1{2\alpha}
\|g\|_{V^*}^2.
$$

積分すれば主張です。
<!-- proof-end -->

一意性はこの命題で同じデータを入れた場合です。

---

## 11. 弱収束で通せるもの・通せないもの

主定理では

$$
u_m\rightharpoonup u
$$

だけで極限を通しました。

なぜなら

$$
a(u_m,v)
$$

は $u_m$ に関して線形だからです。

一方、非線形項では事情が変わります。

### 失敗例：弱収束しても二乗は極限を保たない

$(0,2\pi)$ 上で

$$
z_n(x)=\sin(nx)
$$

とします。

実際、

$$
e_n(x)=\frac1{\sqrt\pi}\sin(nx)
$$

は正規直交系です。[Bessel 不等式](../F0_00E2_Cauchy_Schwarz_Bessel_Parseval/index.md#thm-f0-00e2-bessel-inequality)を任意の $\phi\in L^2(0,2\pi)$ と有限個の $e_n$ に適用すると

$$
\sum_{n=1}^{N}
|(\phi,e_n)_{L^2}|^2
\le
\|\phi\|_{L^2}^2
$$

なので、各係数は

$$
(\phi,e_n)_{L^2}\to0.
$$

従って

$$
z_n\rightharpoonup0
\quad\text{弱く in }L^2(0,2\pi).
$$

しかし

$$
z_n^2
=
\frac12
-
\frac12\cos(2nx).
$$

同じ Bessel の議論を正規直交系 $\cos(2nx)/\sqrt\pi$ に適用すると

$$
\cos(2nx)\rightharpoonup0
\quad\text{弱く in }L^2(0,2\pi).
$$

従って

$$
z_n^2
\rightharpoonup
\frac12
$$

であり、

$$
(\text{弱極限 of }z_n)^2
=
0
$$

とは一致しません。

つまり

$$
\boxed{
u_m\rightharpoonup u
\quad\not\Rightarrow\quad
N(u_m)\rightharpoonup N(u)
}
$$

が一般の非線形写像 $N$ では起こります。

この失敗で壊れているのは、Galerkin 主証明の Step 5 の **線形汎関数に対する弱収束の極限通過**です。

後続の非線形時間発展 PDE では、Aubin--Lions 型 コンパクト性 や monotonicity など、より強い機構が必要になります。

本章ではそこへ進みません。

---

## 12. 波動方程式では状態の持ち方が変わる

PDE4 の波動方程式

$$
u_{tt}-\Delta u=0
$$

では時間微分が二階です。

熱方程式では エネルギー が

$$
\|u(t)\|_{L^2}^2
$$

を中心に散逸しました。

波動方程式では自然な状態は

$$
(u,u_t)
$$

の組です。

<a id="def-gpde10-wave-energy-space"></a>

<!-- formal-statement-start -->
> **定義（波動方程式のエネルギー空間）**  
> 零 Dirichlet 波動方程式の自然な エネルギー空間 を
>
$$
\boxed{
\mathcal E
=
H_0^1(\Omega)\times L^2(\Omega)
}
$$
>
> とし、状態 $(u,v)$ の エネルギー を
>
$$
E(u,v)
=
\frac12
\|\nabla u\|_2^2
+
\frac12
\|v\|_2^2
$$
>
> とする。
<!-- formal-statement-end -->

<!-- definition-example-start: def-gpde10-wave-energy-space -->
### 単一モードで確認する

**定義の確認**

$\Omega=(0,\pi)$ で

$$
u(t,x)=\cos(t)\sin x
$$

とします。

すると

$$
u_t=-\sin(t)\sin x,
$$

$$
u_x=\cos(t)\cos x.
$$

従って

$$
\begin{aligned}
E(t)
&=
\frac12
\int_0^\pi
\left(
|u_t|^2+|u_x|^2
\right)dx
\\
&=
\frac12
\left[
\sin^2t\frac\pi2
+
\cos^2t\frac\pi2
\right]
\\
&=
\frac\pi4.
\end{aligned}
$$

熱方程式の単一モードでは エネルギー が指数的に減衰しましたが、波動方程式では保存されます。
<!-- definition-example-end -->

<a id="prop-gpde10-wave-energy"></a>

<!-- formal-statement-start -->
> **命題（滑らかな零 Dirichlet 波動解のエネルギー保存）**  
> 十分滑らかな $u$ が
>
$$
u_{tt}-\Delta u=0
$$
>
> を $\Omega$ 上で満たし、$u=0$ on $\partial\Omega$ とする。このとき
>
$$
\boxed{
E(t)
=
\frac12\|u_t(t)\|_2^2
+
\frac12\|\nabla u(t)\|_2^2
}
$$
>
> は時間に依らず一定である。
<!-- formal-statement-end -->

<!-- proof-start -->
### 証明

方程式へ $u_t$ を掛けて積分すると

$$
\int_\Omega
u_{tt}u_t\,dx
-
\int_\Omega
(\Delta u)u_t\,dx
=
0.
$$

第一項は

$$
\int
u_{tt}u_t
=
\frac12
\frac{d}{dt}
\|u_t\|_2^2.
$$

第二項を空間で部分積分すると、零 Dirichlet 条件から境界項が消えて

$$
-\int
(\Delta u)u_t
=
\int
\nabla u\cdot\nabla u_t
=
\frac12
\frac{d}{dt}
\|\nabla u\|_2^2.
$$

従って

$$
\frac{d}{dt}
E(t)=0.
$$

よって $E(t)$ は一定です。
<!-- proof-end -->

弱い エネルギー solution では典型的に

$$
u\in L^\infty(0,T;H_0^1),
\qquad
u_t\in L^\infty(0,T;L^2),
$$

$$
u_{tt}\in L^2(0,T;H^{-1})
$$

のような空間を使います。

完全な波動 Galerkin 存在証明は、熱方程式と同じ

$$
\text{有限次元化}
\to
\text{エネルギー評価}
\to
\text{弱極限}
$$

を使いますが、本章の主定理を二階時間系へ機械的に重複させず、エネルギー空間がなぜこの形になるかを確認するところまで扱います。

---

## 13. 時間発展作用素族から解を見る

時間発展問題には、弱形式とは別に「初期状態を時刻 $t$ まで運ぶ作用素族」を先に作る入口があります。有限次元の同次方程式

$$
u_t+Au=0
$$

なら

$$
u(t)=e^{-tA}u_0
$$

と書けます。無限次元でも、時間 $s$ 進めてから $t$ 進める操作が最初から $s+t$ 進める操作と一致し、時刻 0 では恒等写像へ連続につながる作用素族を考えます。

<a id="def-gpde10-c0-semigroup"></a>

<!-- formal-statement-start -->
> **定義（強連続半群）**  
> 完備内積空間 $H$ 上の有界線形作用素の族 $(S(t))_{t\ge0}$ が
>
$$
S(0)=I,
\qquad
S(t+s)=S(t)S(s)
\qquad
(s,t\ge0)
$$
>
> を満たし、さらに任意の $x\in H$ に対して
>
$$
\boxed{
\|S(t)x-x\|_H\to0
\qquad(t\downarrow0)
}
$$
>
> を満たすとき、$(S(t))_{t\ge0}$ を $H$ 上の **強連続半群**（$C_0$-semigroup）と呼ぶ。
<!-- formal-statement-end -->

<!-- definition-example-start: def-gpde10-c0-semigroup -->
**定義の確認**

一つの固有モードが張る一次元空間 $H=\operatorname{span}\{w\}$ で、$\lambda\ge0$ とし

$$
S(t)(cw)
=
ce^{-\lambda t}w
$$

と置きます。このとき

$$
S(0)(cw)=cw,
$$

$$
S(t)S(s)(cw)
=
ce^{-\lambda s}e^{-\lambda t}w
=
S(t+s)(cw),
$$

さらに

$$
\|S(t)(cw)-cw\|_H
=
|c|\,|e^{-\lambda t}-1|\,\|w\|_H
\to0.
$$

従ってこれは強連続半群です。
<!-- definition-example-end -->

同次問題では $S(t)u_0$ が初期値の時間発展を表します。外力があると、時刻 $s$ に加わった $f(s)$ の寄与を残り時間 $t-s$ だけ $S(t-s)$ で運び、それを $s$ について足し合わせるのが自然です。これが Duhamel の原理に対応する積分表示です。

<a id="def-gpde10-mild-solution"></a>

<!-- formal-statement-start -->
> **定義（mild 解：半群表示）**  
> $H$ 上の強連続半群 $(S(t))_{t\ge0}$ が与えられ、形式的に $S(t)=e^{-tA}$ と書ける状況を考える。$u_0\in H$、$f\in L^1(0,T;H)$ とし、次の Bochner 積分が存在するとする。形式的な時間発展方程式
>
$$
u_t+Au=f,
\qquad
u(0)=u_0
$$
>
> に対して
>
$$
\boxed{
u(t)
=
S(t)u_0
+
\int_0^t
S(t-s)f(s)\,ds
}
$$
>
> を満たす $u\in C([0,T];H)$ を mild 解と呼ぶ。
<!-- formal-statement-end -->

<!-- definition-example-start: def-gpde10-mild-solution -->
### 直接例：一つの固有モードに外力を加える

**定義の確認**

$Aw=\lambda w$、$u_0=cw$ とし、外力を

$$
f(s)=q(s)w
$$

とします。固有モード上では

$$
S(t)w=e^{-\lambda t}w
$$

なので半群表示は

$$
\begin{aligned}
u(t)
&=
ce^{-\lambda t}w
+
\int_0^t
e^{-\lambda(t-s)}q(s)w\,ds
\\
&=
\left[
ce^{-\lambda t}
+
\int_0^t
e^{-\lambda(t-s)}q(s)\,ds
\right]w.
\end{aligned}
$$

$q=0$ なら前に確認した熱方程式の単一モードへ戻ります。
<!-- definition-example-end -->

ただし、

- どの作用素が強連続半群を生成するか
- Hille--Yosida 型生成定理
- 半群によるより強い正則化理論
- 最大正則性

は本章では扱いません。

ここでは **強連続半群と mild 解の定義、およびエネルギー弱解との接続位置**までを確認し、半群生成理論は後続の発展事項とします。

---

## 14. どの仮定がどこで働いたか

| 仮定・道具 | 使う場所 | 役割 |
|---|---|---|
| $V\hookrightarrow H$ 連続 | Gelfand 三つ組 / 極限通過 | $V$ の評価から $H$ の時間積分を制御する |
| $V$ dense in $H$ | 初期値の同定 / 強連続性 | $V$ テスト で得た情報を $H$ 全体へ広げる |
| $H\hookrightarrow V^*$ | 時間微分 | $H$ 内積を $V^*$-$V$ duality として読む |
| $a$ 有界 | 極限通過 / $Au\in V^*$ | $u_m\rightharpoonup u$ から $a(u_m,v)\to a(u,v)$ |
| $a$ 強圧的 | エネルギー評価 | $\|u_m\|_{L^2(0,T;V)}$ を次元一様に支える |
| $f\in L^2(0,T;V^*)$ | エネルギー評価 | $\langle f,u_m\rangle$ を Cauchy--Schwarz / Young で評価する |
| Galerkin 近似空間族の $V$-稠密性 | 極限通過 | 有限次元テスト関数から任意の $v\in V$ へ延長する |
| 弱コンパクト性 | 部分列抽出 | 一様評価 から無限次元候補 $u$ を取り出す |
| 線形性 | 弱収束での極限通過 | 弱収束だけで $a(u_m,v)$ を通す |
| エネルギー恒等式 | 初期値・一意性・安定性 | $u_t\in V^*$ でも $\|u(t)\|_H^2$ を微分する |

特に

$$
\boxed{
\text{Galerkin 法の本質}
=
\text{有限次元解そのもの}
\text{ではなく}
\text{次元一様の アプリオリ評価}
}
$$

です。

---

## 15. Encore V への橋

Encore V の 有限要素法（FEM） では、Galerkin 空間 $V_m$ を

- メッシュ
- 区分的多項式基底
- 要素行列
- 組立て

によって具体的に構成します。

解析側では

$$
m\to\infty
$$

で本物の解へ近づくことを証明したい。

数値側では

$$
m<\infty
$$

のまま計算した近似解を効率よく求めたい。

両者は同じ有限次元化を見ていますが、目的が違います。

本章では

$$
\boxed{
\text{Galerkin}
=
\text{存在証明のための有限次元近似}
}
$$

という見方を身につけ、メッシュやソルバーを使った具体的な離散化は Encore V で扱います。

---

## 16. 演習

### Level A

<a id="ex-gpde10-a01"></a>
#### GPDE10-A01 $L^2$ から $H^{-1}$ への埋め込み
- Level: A

$\Omega$ を Poincaré 定数 $C_P$ を持つ有界領域とする。

$h\in L^2(\Omega)$ に対し

$$
F_h(v)=\int_\Omega hv\,dx
$$

と置く。

$$
\|F_h\|_{H^{-1}}
\le
C_P\|h\|_{L^2}
$$

を示し、

$$
H_0^1(\Omega)
\subset
L^2(\Omega)
\subset
H^{-1}(\Omega)
$$

の二つの連続埋め込みを確認せよ。

<!-- solution-start -->
**詳細解答**

$V=H_0^1(\Omega)$ に

$$
\|v\|_V=\|\nabla v\|_2
$$

を入れます。

[Poincaré 不等式](../GPDE4/index.md#thm-gpde4-poincare)から

$$
\|v\|_2
\le
C_P\|\nabla v\|_2
=
C_P\|v\|_V.
$$

従って

$$
V\hookrightarrow L^2(\Omega)
$$

は連続です。

次に $h\in L^2$ に対し Cauchy--Schwarz から

$$
|F_h(v)|
=
\left|
\int_\Omega hv
\right|
\le
\|h\|_2\|v\|_2.
$$

Poincaré を代入して

$$
|F_h(v)|
\le
C_P\|h\|_2\|v\|_V.
$$

よって $F_h$ は $V$ 上の連続線形汎関数です。

[双対ノルムの基本評価](../F0_02C2_線形汎関数_双対空間_Riesz/index.md#prop-f0-02c2-dual-norm-basic-estimate)から

$$
\begin{aligned}
\|F_h\|_{V^*}
&=
\sup_{\|v\|_V\le1}
|F_h(v)|
\\
&\le
C_P\|h\|_2.
\end{aligned}
$$

したがって

$$
L^2(\Omega)\hookrightarrow V^*=H^{-1}(\Omega)
$$

も連続です。

よって

$$
H_0^1(\Omega)
\hookrightarrow
L^2(\Omega)
\hookrightarrow
H^{-1}(\Omega)
$$

が確認できました。
<!-- solution-end -->

<a id="ex-gpde10-a02"></a>
#### GPDE10-A02 熱方程式の単一モードと エネルギー減衰
- Level: A

$\Omega=(0,\pi)$ で

$$
u(t,x)=e^{-4t}\sin(2x)
$$

とする。

1. $u_t-u_{xx}=0$ を確認せよ。
2. 零 Dirichlet 条件を確認せよ。
3. $L^2$ エネルギー
   $$
   E(t)=\frac12\|u(t)\|_2^2
   $$
   を計算し、減衰率を求めよ。
4. 弱形式
   $$
   (u_t,v)_{L^2}+\int u_xv_x=0
   $$
   を確認せよ。

<!-- solution-start -->
**詳細解答**

時間微分は

$$
u_t
=
-4e^{-4t}\sin(2x).
$$

空間微分は

$$
u_x
=
2e^{-4t}\cos(2x),
$$

$$
u_{xx}
=
-4e^{-4t}\sin(2x).
$$

従って

$$
u_t-u_{xx}=0.
$$

また

$$
\sin(0)=0,
\qquad
\sin(2\pi)=0
$$

なので $x=0,\pi$ で $u=0$ です。

次に

$$
\int_0^\pi
\sin^2(2x)\,dx
=
\frac\pi2.
$$

従って

$$
\|u(t)\|_2^2
=
e^{-8t}\frac\pi2,
$$

$$
E(t)
=
\frac\pi4e^{-8t}.
$$

エネルギー は指数率 $8$ で減衰します。

最後に 滑らかな $v$ に対し部分積分すると

$$
\int_0^\pi
u_xv_x\,dx
=
-\int_0^\pi
u_{xx}v\,dx
$$

で、境界項は $v=0$ により消えます。

したがって

$$
(u_t,v)
+
\int u_xv_x
=
\int
(u_t-u_{xx})v
=
0.
$$

$H_0^1$ への密度で一般の $v$ にも成立します。
<!-- solution-end -->

<a id="ex-gpde10-a03"></a>
#### GPDE10-A03 二次元 Galerkin 系 を書く
- Level: A

$\Omega=(0,\pi)$、

$$
V_2
=
\operatorname{span}\{\sin x,\sin2x\}
$$

とする。

$$
u_2(t,x)
=
d_1(t)\sin x+d_2(t)\sin2x
$$

を熱方程式

$$
u_t-u_{xx}=f
$$

へ Galerkin 適用する。

$$
f_i(t)
=
\int_0^\pi
f(t,x)\sin(ix)\,dx
$$

と置き、$d_1,d_2$ の ODE を導け。

<!-- solution-start -->
**詳細解答**

テスト関数 としてまず $\sin x$ を使います。

$$
(u_2',\sin x)
+
\int_0^\pi
(u_2)_x(\sin x)_x\,dx
=
f_1(t).
$$

直交性から

$$
(u_2',\sin x)
=
\frac\pi2d_1'(t).
$$

また

$$
\int
(u_2)_x\cos x
=
\frac\pi2d_1(t).
$$

したがって

$$
\frac\pi2
\left(
d_1'+d_1
\right)
=
f_1(t).
$$

次に $\sin2x$ を テスト すると

$$
(u_2',\sin2x)
=
\frac\pi2d_2'(t).
$$

勾配項では固有値 $4$ が出て

$$
\int
(u_2)_x(2\cos2x)
=
\frac\pi2
4d_2(t).
$$

従って

$$
\frac\pi2
\left(
d_2'+4d_2
\right)
=
f_2(t).
$$

つまり

$$
\boxed{
d_1'+d_1
=
\frac2\pi f_1(t)
}
$$

$$
\boxed{
d_2'+4d_2
=
\frac2\pi f_2(t)
}
$$

です。

有限次元化により PDE が連立一次 ODE へ落ちることを直接確認できました。
<!-- solution-end -->

<a id="ex-gpde10-a04"></a>
#### GPDE10-A04 波動単一モードの エネルギー
- Level: A

$$
u(t,x)=\sin(3t)\sin(3x),
\qquad
0<x<\pi
$$

とする。

1. $u_{tt}-u_{xx}=0$ を確認せよ。
2. 
   $$
   E(t)
   =
   \frac12\|u_t(t)\|_2^2
   +
   \frac12\|u_x(t)\|_2^2
   $$
   を計算し、一定であることを示せ。

<!-- solution-start -->
**詳細解答**

$$
u_t
=
3\cos(3t)\sin(3x),
$$

$$
u_{tt}
=
-9\sin(3t)\sin(3x).
$$

また

$$
u_x
=
3\sin(3t)\cos(3x),
$$

$$
u_{xx}
=
-9\sin(3t)\sin(3x).
$$

従って

$$
u_{tt}-u_{xx}=0.
$$

さらに

$$
\int_0^\pi\sin^2(3x)\,dx
=
\int_0^\pi\cos^2(3x)\,dx
=
\frac\pi2.
$$

よって

$$
\|u_t\|_2^2
=
9\cos^2(3t)\frac\pi2,
$$

$$
\|u_x\|_2^2
=
9\sin^2(3t)\frac\pi2.
$$

したがって

$$
\begin{aligned}
E(t)
&=
\frac12
\frac{9\pi}{2}
\left(
\cos^2(3t)+\sin^2(3t)
\right)
\\
&=
\frac{9\pi}{4}.
\end{aligned}
$$

時間に依らず一定です。
<!-- solution-end -->

### Level B

<a id="ex-gpde10-b01"></a>
#### GPDE10-B01 外力 付き Galerkin エネルギー評価
- Level: B

$a$ は 有界 かつ 強圧的 で

$$
a(v,v)\ge\alpha\|v\|_V^2.
$$

Galerkin 解

$$
(u_m',v_m)_H+a(u_m,v_m)=\langle f,v_m\rangle
$$

に対し、

$$
\sup_{t}
\|u_m(t)\|_H^2
+
\alpha
\int_0^T
\|u_m\|_V^2
\le
\|u_{0m}\|_H^2
+
\frac1\alpha
\int_0^T
\|f\|_{V^*}^2
$$

を、各不等式の使用箇所を明示して導け。

<!-- solution-start -->
**詳細解答**

$v_m=u_m$ を選ぶと

$$
(u_m',u_m)_H
+
a(u_m,u_m)
=
\langle f,u_m\rangle.
$$

有限次元で $u_m$ は絶対連続なので

$$
(u_m',u_m)_H
=
\frac12
\frac{d}{dt}
\|u_m\|_H^2.
$$

強圧条件から

$$
a(u_m,u_m)
\ge
\alpha\|u_m\|_V^2.
$$

従って

$$
\frac12
\frac{d}{dt}
\|u_m\|_H^2
+
\alpha\|u_m\|_V^2
\le
|\langle f,u_m\rangle|.
$$

[双対ノルムの基本評価](../F0_02C2_線形汎関数_双対空間_Riesz/index.md#prop-f0-02c2-dual-norm-basic-estimate)から

$$
|\langle f,u_m\rangle|
\le
\|f\|_{V^*}\|u_m\|_V.
$$

[Young の不等式](../F0_00D2D_Lp_Holder_Minkowski/index.md#lem-f0-00d2d-01)に

$$
a=\|f\|_{V^*},
\qquad
b=\|u_m\|_V
$$

を入れて

$$
\|f\|_{V^*}\|u_m\|_V
\le
\frac1{2\alpha}
\|f\|_{V^*}^2
+
\frac\alpha2
\|u_m\|_V^2.
$$

従って

$$
\frac12
\frac{d}{dt}
\|u_m\|_H^2
+
\frac\alpha2
\|u_m\|_V^2
\le
\frac1{2\alpha}
\|f\|_{V^*}^2.
$$

$0$ から $t$ まで積分すると

$$
\|u_m(t)\|_H^2
+
\alpha
\int_0^t
\|u_m\|_V^2
\le
\|u_{0m}\|_H^2
+
\frac1\alpha
\int_0^t
\|f\|_{V^*}^2.
$$

$t\le T$ なので右辺を $T$ まで広げれば

$$
\sup_t
\|u_m(t)\|_H^2
+
\alpha
\int_0^T
\|u_m\|_V^2
\le
\|u_{0m}\|_H^2
+
\frac1\alpha
\int_0^T
\|f\|_{V^*}^2.
$$

ここで 次元 $m$ に依存する定数は一度も使っていません。
<!-- solution-end -->

<a id="ex-gpde10-b02"></a>
#### GPDE10-B02 時間積分した弱形式 で極限を通す
- Level: B

$u_m\rightharpoonup u$ in $L^2(0,T;V)$ とする。

$v\in V_N$ を固定し、$m\ge N$ で

$$
(u_m',v)_H+a(u_m,v)=\langle f,v\rangle
$$

が成り立つとする。

$\eta\in C^\infty([0,T])$、$\eta(T)=0$ に対し、

1. 時間部分積分した式を書け。
2. 各項が $m\to\infty$ でどの収束を使って極限へ行くか説明せよ。
3. 和集合 $\bigcup_mV_m$ の $V$-稠密性 により任意の $v\in V$ へ延長できることを示せ。

<!-- solution-start -->
**詳細解答**

まず $\eta$ を掛けて積分します。

$$
\int_0^T
(u_m',v)_H\eta\,dt
+
\int_0^T
a(u_m,v)\eta\,dt
=
\int_0^T
\langle f,v\rangle\eta\,dt.
$$

$v$ は時間に依存しないので第一項を時間部分積分して

$$
\begin{aligned}
&
-\int_0^T
(u_m,v)_H\eta'\,dt
+
\int_0^T
a(u_m,v)\eta\,dt
\\
&=
\int_0^T
\langle f,v\rangle\eta\,dt
+
(u_m(0),v)_H\eta(0).
\end{aligned}
$$

$\eta(T)=0$ なので終端項はありません。

次に

$$
u_m\rightharpoonup u
\quad\text{in }L^2(0,T;V)
$$

と $V\hookrightarrow H$ の連続性から

$$
u_m\rightharpoonup u
\quad\text{in }L^2(0,T;H).
$$

従って

$$
\int
(u_m,v)_H\eta'
\to
\int
(u,v)_H\eta'.
$$

また

$$
w\mapsto a(w,v)
$$

は 有界性 により $V$ 上の連続線形汎関数なので

$$
\int
a(u_m,v)\eta
\to
\int
a(u,v)\eta.
$$

初期値近似が

$$
u_m(0)=u_{0m}\to u_0
\quad\text{in }H
$$

なら

$$
(u_m(0),v)_H
\to
(u_0,v)_H.
$$

従って極限式は

$$
\begin{aligned}
&
-\int_0^T
(u,v)_H\eta'\,dt
+
\int_0^T
a(u,v)\eta\,dt
\\
&=
\int_0^T
\langle f,v\rangle\eta\,dt
+
(u_0,v)_H\eta(0).
\end{aligned}
$$

です。

ここまで $v\in\bigcup_mV_m$ でした。

任意の $v\in V$ に対し、稠密性 から

$$
v^{(k)}
\in
\bigcup_mV_m,
\qquad
v^{(k)}\to v
\quad\text{in }V
$$

を取れます。

第一項は $V\hookrightarrow H$、第二項は $a$ の 有界性、右辺は $f\in V^*$、初期値項は $V\hookrightarrow H$ により、それぞれ $v$ に関して連続です。

したがって $k\to\infty$ として任意の $v\in V$ へ式を延長できます。
<!-- solution-end -->

<a id="ex-gpde10-b03"></a>
#### GPDE10-B03 一意性と連続依存を エネルギー だけで示す
- Level: B

$u_1,u_2$ が

$$
u_t+Au=f
$$

の二つの エネルギー弱解 で、初期値 $u_{01},u_{02}$、外力 $f_1,f_2$ を持つとする。

$$
w=u_1-u_2
$$

に エネルギー恒等式 を適用し、

$$
\sup_t\|w(t)\|_H^2
+
\alpha
\int_0^T
\|w\|_V^2
\le
\|u_{01}-u_{02}\|_H^2
+
\frac1\alpha
\int_0^T
\|f_1-f_2\|_{V^*}^2
$$

を導け。

同じデータなら一意性が従うことも示せ。

<!-- solution-start -->
**詳細解答**

差を取ると

$$
w_t+Aw=g,
$$

ただし

$$
g=f_1-f_2.
$$

初期値は

$$
w(0)=u_{01}-u_{02}.
$$

[Gelfand 三つ組のエネルギー恒等式](#lem-gpde10-energy-identity)から

$$
\frac12
\frac{d}{dt}
\|w\|_H^2
=
\langle w_t,w\rangle.
$$

方程式より

$$
\langle w_t,w\rangle
=
-a(w,w)+\langle g,w\rangle.
$$

強圧条件から

$$
-a(w,w)
\le
-\alpha\|w\|_V^2.
$$

また

$$
\langle g,w\rangle
\le
\|g\|_{V^*}\|w\|_V
\le
\frac1{2\alpha}\|g\|_{V^*}^2
+
\frac\alpha2\|w\|_V^2.
$$

従って

$$
\frac12
\frac{d}{dt}
\|w\|_H^2
+
\frac\alpha2
\|w\|_V^2
\le
\frac1{2\alpha}
\|g\|_{V^*}^2.
$$

積分して

$$
\|w(t)\|_H^2
+
\alpha
\int_0^t
\|w\|_V^2
\le
\|w(0)\|_H^2
+
\frac1\alpha
\int_0^t
\|g\|_{V^*}^2.
$$

$t\le T$ で supremum を取れば

$$
\sup_t\|w(t)\|_H^2
+
\alpha
\int_0^T
\|w\|_V^2
\le
\|u_{01}-u_{02}\|_H^2
+
\frac1\alpha
\int_0^T
\|f_1-f_2\|_{V^*}^2.
$$

同じデータなら右辺は 0 です。

左辺は非負なので

$$
\|w(t)\|_H=0
$$

がすべての $t$ で成り立ちます。

従って

$$
u_1=u_2.
$$
<!-- solution-end -->

### Level C

<a id="ex-gpde10-c01"></a>
#### GPDE10-C01 熱方程式の Galerkin 存在証明を最初から閉じる
- Level: C

$\Omega$ を Poincaré 不等式が成り立つ有界領域とし、

$$
u_t-\Delta u=f,
\qquad
u|_{\partial\Omega}=0,
\qquad
u(0)=u_0
$$

を考える。

$$
f\in L^2(0,T;H^{-1}(\Omega)),
\qquad
u_0\in L^2(\Omega)
$$

とする。

nested 有限次元 spaces

$$
V_m\subset H_0^1(\Omega),
\qquad
\overline{\bigcup_mV_m}^{\,H_0^1}
=
H_0^1(\Omega)
$$

を使い、次を順に示せ。

1. Galerkin 系 が有限次元 ODE になる。
2. $m$ に依らない エネルギー評価 を導く。
3. $u_m\rightharpoonup u$ in $L^2(0,T;H_0^1)$ となる部分列を取る。
4. 時間積分した弱形式 で極限を通す。
5. $u_t\in L^2(0,T;H^{-1})$ を同定する。
6. $u(0)=u_0$ を示す。
7. エネルギー評価 から一意性を示す。

<!-- solution-start -->
**詳細解答**

$$
V=H_0^1(\Omega),
\qquad
H=L^2(\Omega)
$$

と置きます。

双線形形式は

$$
a(u,v)
=
\int_\Omega
\nabla u\cdot\nabla v\,dx.
$$

Cauchy--Schwarz から

$$
|a(u,v)|
\le
\|u\|_V\|v\|_V.
$$

また

$$
a(v,v)=\|v\|_V^2.
$$

従って 有界性 と 強圧条件 はどちらも定数 1 で成り立ちます。

#### 1. 有限次元 ODE

$V_m$ の基底を $w_1,\dots,w_m$ とし

$$
u_m(t)
=
\sum_{j=1}^m
d_j(t)w_j
$$

と置きます。

Galerkin 条件は

$$
(u_m',w_i)_H
+
a(u_m,w_i)
=
\langle f,w_i\rangle
\qquad
(i=1,\dots,m)
$$

です。

従って

$$
M d'(t)+K d(t)=F(t),
$$

$$
M_{ij}
=
(w_j,w_i)_H,
\qquad
K_{ij}
=
a(w_j,w_i),
$$

$$
F_i(t)
=
\langle f(t),w_i\rangle.
$$

$M$ は Gram 行列なので正定値・可逆です。

したがって

$$
d'
=
-M^{-1}Kd
+
M^{-1}F
$$

という有限次元線形 ODE です。

#### 2. 一様 エネルギー評価

Galerkin 方程式で $v_m=u_m$ を選ぶと

$$
\frac12
\frac{d}{dt}
\|u_m\|_H^2
+
\|u_m\|_V^2
=
\langle f,u_m\rangle.
$$

右辺を

$$
|\langle f,u_m\rangle|
\le
\|f\|_{V^*}\|u_m\|_V
\le
\frac12
\|f\|_{V^*}^2
+
\frac12
\|u_m\|_V^2
$$

と評価します。

従って

$$
\frac12
\frac{d}{dt}
\|u_m\|_H^2
+
\frac12
\|u_m\|_V^2
\le
\frac12
\|f\|_{V^*}^2.
$$

初期近似 $u_{0m}\to u_0$ in $H$ を取れば

$$
\sup_t\|u_m(t)\|_H^2
+
\int_0^T
\|u_m\|_V^2
\le
\|u_{0m}\|_H^2
+
\int_0^T
\|f\|_{V^*}^2.
$$

右辺は $m$ に一様に有界です。

#### 3. 弱収束部分列

したがって $(u_m)$ は $L^2(0,T;V)$ で有界です。

完備内積空間の弱 コンパクト性 から部分列を取り

$$
u_m\rightharpoonup u
\quad\text{in }L^2(0,T;V)
$$

とできます。

連続埋め込み $V\hookrightarrow H$ により

$$
u_m\rightharpoonup u
\quad\text{in }L^2(0,T;H)
$$

も成り立ちます。

#### 4. 時間積分した弱形式

$v\in V_N$ を固定します。

$m\ge N$ なら

$$
(u_m',v)_H+a(u_m,v)=\langle f,v\rangle.
$$

$\eta\in C^\infty([0,T])$、$\eta(T)=0$ を掛けて積分し、時間部分積分すると

$$
\begin{aligned}
&
-\int_0^T
(u_m,v)_H\eta'\,dt
+
\int_0^T
a(u_m,v)\eta\,dt
\\
&=
\int_0^T
\langle f,v\rangle\eta\,dt
+
(u_{0m},v)_H\eta(0).
\end{aligned}
$$

第一項は 弱収束 in $L^2(H)$、第二項は $a(\cdot,v)$ の連続線形性、初期項は $u_{0m}\to u_0$ in $H$ により極限を通せます。

従って

$$
\begin{aligned}
&
-\int_0^T
(u,v)_H\eta'\,dt
+
\int_0^T
a(u,v)\eta\,dt
\\
&=
\int_0^T
\langle f,v\rangle\eta\,dt
+
(u_0,v)_H\eta(0).
\end{aligned}
$$

和集合 $\bigcup_mV_m$ は $V$ に稠密で、各項は $v$ に連続なので任意の $v\in V$ へ延長できます。

#### 5. $u_t$ の同定

$A:V\to V^*$ を

$$
\langle Au,v\rangle
=
a(u,v)
$$

で定めます。

$$
\|Au\|_{V^*}
\le
\|u\|_V
$$

なので

$$
Au\in L^2(0,T;V^*).
$$

したがって

$$
g=f-Au
\in L^2(0,T;V^*).
$$

$\eta(0)=0$ も課せば

$$
-\int
(u,v)_H\eta'
=
\int
\langle g,v\rangle\eta.
$$

これは

$$
u_t=g=f-Au
$$

が時間 超関数微分 であることを意味します。

従って

$$
u_t\in L^2(0,T;H^{-1}).
$$

#### 6. 初期値

[Gelfand 三つ組のエネルギー恒等式](#lem-gpde10-energy-identity)により

$$
u\in C([0,T];H).
$$

そのため時間部分積分は

$$
-\int
(u,v)_H\eta'
=
\int
\langle u_t,v\rangle\eta
+
(u(0),v)_H\eta(0)
$$

と書けます。

一方、Galerkin 極限式の境界項は

$$
(u_0,v)_H\eta(0).
$$

従って

$$
(u(0)-u_0,v)_H=0
\qquad
(\forall v\in V).
$$

$V$ は $H$ に稠密なので

$$
u(0)=u_0.
$$

#### 7. 一意性

二解 $u_1,u_2$ の差

$$
w=u_1-u_2
$$

は

$$
w_t-\Delta w=0,
\qquad
w(0)=0
$$

を弱く満たします。

[Gelfand 三つ組のエネルギー恒等式](#lem-gpde10-energy-identity)から

$$
\frac12
\frac{d}{dt}
\|w\|_2^2
+
\|\nabla w\|_2^2
=
0.
$$

積分して

$$
\frac12
\|w(t)\|_2^2
+
\int_0^t
\|\nabla w\|_2^2\,ds
=
0.
$$

左辺は非負なので

$$
w=0.
$$

したがって エネルギー弱解 は一意です。

以上で、

$$
\boxed{
\text{有限次元 ODE}
\to
\text{uniform エネルギー評価}
\to
\text{弱コンパクト性}
\to
\text{極限通過}
\to
\text{エネルギー弱解}
}
$$

という Galerkin 存在 proof を閉じました。
<!-- solution-end -->

---

## 17. この章のまとめ

GPDE6--GPDE9 の 楕円型の流れ では

$$
\text{空間方向の弱形式}
\to
\text{存在}
\to
\text{正則性}
$$

を扱いました。

GPDE10 では時間変数を加え、

$$
\boxed{
V
\subset
H
\subset
V^*
}
$$

という Gelfand 三つ組の上で

$$
u\in L^2(0,T;V),
\qquad
u_t\in L^2(0,T;V^*)
$$

を組み合わせました。

存在証明の主線は

$$
\boxed{
\text{Galerkin}
\to
\text{アプリオリエネルギー評価}
\to
\text{弱コンパクト性}
\to
\text{時間積分した弱形式}
\to
\text{極限通過}
}
$$

です。

線形熱方程式 では弱収束だけで極限を通せました。

一方、非線形項では弱収束だけでは足りないことを

$$
\sin(nx)\rightharpoonup0,
\qquad
\sin^2(nx)\rightharpoonup\frac12
$$

から確認しました。

波動方程式では

$$
H_0^1\times L^2
$$

が 自然なエネルギー空間 となり、熱方程式の 散逸エネルギー と対照的に エネルギー保存が現れます。

mild 解 / 強連続半群は

$$
u(t)=S(t)u_0+\int_0^tS(t-s)f(s)\,ds
$$

という別の入口を与えますが、生成定理は後続拡張へ送ります。

これで Encore III は

$$
\boxed{
\text{超関数}
\to
\text{弱微分}
\to
\text{Sobolev}
\to
\text{コンパクト性}
\to
\text{変分弱解}
\to
\text{Lax--Milgram}
\to
\text{楕円型 PDE}
\to
\text{正則性}
\to
\text{時間発展の弱解}
}
$$

まで閉じます。

次の発展では、

- 強連続半群 / 最大正則性
- nonlinear evolution PDE
- Aubin--Lions コンパクト性
- conservation law / entropy solution
- Hamilton--Jacobi / viscosity solution
- Navier--Stokes 型 エネルギー弱解

などへ進めますが、それらは Encore III 本線の外です。
