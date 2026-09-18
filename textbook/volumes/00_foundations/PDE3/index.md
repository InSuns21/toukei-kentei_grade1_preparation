# PDE3 熱方程式：拡散・最大値原理・熱核

PDE2 では、二階線形 PDE を主要部から楕円型・放物型・双曲型へ分類しました。本章では、そのうち放物型の代表である **熱方程式** を初めて本格的に解きます。

熱方程式の特徴は、単に「時間について一階、空間について二階」という見た目だけではありません。

- 温度の山は時間とともに低くなる。
- 空間的な細かい振動ほど速く消える。
- 初期値の情報は Gaussian で平均化される。
- 非負の熱は、古典モデルでは任意の正時刻に全空間へ広がる。

この四つを、最大値原理・エネルギー法・Fourier 級数・Fourier 変換という別々の道具から同じ現象として読みます。

本章の直接の前提は [PDE2 二階線形PDEの分類](../PDE2/index.md)、[ODE7 境界値問題と Sturm--Liouville 理論](../ODE7/index.md)、[FOU2 Fourier級数の収束論](../FOU2/index.md)、[FOU3 Fourier変換](../FOU3/index.md) です。

> **証明境界**  
> 本章は一次元熱方程式の古典解を対象にします。最大値原理、一意性、エネルギー散逸、有限区間の Fourier 正弦級数解、実数全体の熱核表示までは本文で閉じます。弱解、Sobolev 空間、一般の放物型作用素、半群論は Encore III 以降へ送り、本章の証明へ逆輸入しません。

---

## 1. 熱方程式は何を表すのか

長さ方向だけを持つ細い棒を考え、時刻 $t$、位置 $x$ における温度を $u(t,x)$ とします。

<a id="def-pde3-heat-equation"></a>
<!-- formal-statement-start -->
> **定義（一次元熱方程式）**  
> 定数 $\kappa>0$ に対し

$$
u_t=\kappa u_{xx}
$$

> を一次元熱方程式という。$\kappa$ を拡散係数という。
<!-- formal-statement-end -->

PDE2 の記号で独立変数を $(x,t)$ と見ると、二階項は

$$
-\kappa u_{xx}
$$

だけです。したがって

$$
A=-\kappa,\qquad B=0,\qquad C=0,
$$

ゆえに

$$
B^2-AC=0.
$$

熱方程式は放物型です。

<!-- definition-example-start: def-pde3-heat-equation -->
**定義の確認：正弦波は形を保ったまま減衰する**

$\mu>0$ とし

$$
u(t,x)=e^{-\kappa\mu^2t}\sin(\mu x)
$$

と置きます。すると

$$
u_t=-\kappa\mu^2e^{-\kappa\mu^2t}\sin(\mu x),
$$

$$
u_{xx}=-\mu^2e^{-\kappa\mu^2t}\sin(\mu x).
$$

したがって

$$
u_t=\kappa u_{xx}.
$$

空間周波数 $\mu$ が大きいほど減衰率 $\kappa\mu^2$ が大きいことがすでに見えています。
<!-- definition-example-end -->

この例が本章全体の原型です。熱方程式は「波形を移動させる」のではなく、空間的な凹凸を周波数ごとに減衰させます。

---

## 2. 初期値だけでなく空間境界も必要になる

有限区間

$$
0<x<L,\qquad 0<t\le T
$$

で熱方程式を考えます。時間について一階なので、まず初期温度

$$
u(0,x)=f(x)
$$

を与えます。

しかし区間には端点 $x=0,L$ があります。たとえば両端を常に 0 度へ固定するなら

$$
u(t,0)=u(t,L)=0
$$

です。

最大値原理では「どの境界を見ればよいか」を明示しておく必要があります。

<a id="def-pde3-parabolic-boundary"></a>
<!-- formal-statement-start -->
> **定義（放物型境界）**  
> $Q_T=(0,L)\times(0,T]$ とする。このとき

$$
\partial_p Q_T
=
([0,L]\times\{0\})
\cup
(\{0,L\}\times[0,T])
$$

> を $Q_T$ の放物型境界という。
<!-- formal-statement-end -->

<!-- definition-example-start: def-pde3-parabolic-boundary -->
**定義の確認**

長方形 $[0,L]\times[0,T]$ の幾何学的境界には上辺 $t=T$ も含まれます。しかし熱方程式は初期時刻 $t=0$ から未来へ進む問題なので、放物型境界には

- 底辺 $t=0$、
- 左右の側面 $x=0,L$

を入れ、最終時刻の上辺 $t=T$ は入れません。
<!-- definition-example-end -->

<a id="def-pde3-classical-solution"></a>
<!-- formal-statement-start -->
> **定義（熱方程式の古典解）**  
> $u$ が $\overline{Q_T}=[0,L]\times[0,T]$ で連続であり、$Q_T$ の内部で $u_t,u_x,u_{xx}$ が連続し、

$$
u_t=\kappa u_{xx}
$$

> を点ごとに満たし、指定された初期条件・境界条件を連続的に満たすとき、$u$ をその初期境界値問題の古典解という。
<!-- formal-statement-end -->

<!-- definition-example-start: def-pde3-classical-solution -->
**定義の確認**

$$
u(t,x)=e^{-\kappa(\pi/L)^2t}\sin\left(\frac{\pi x}{L}\right)
$$

は $\overline{Q_T}$ で連続で、必要な偏導関数を持ちます。また

$$
u(t,0)=u(t,L)=0
$$

であり、

$$
u(0,x)=\sin\left(\frac{\pi x}{L}\right).
$$

したがって、初期値 $f(x)=\sin(\pi x/L)$、斉次 Dirichlet 境界条件に対する古典解です。
<!-- definition-example-end -->

---

## 3. 最大値は内部で新しく生まれない

熱方程式の最も重要な構造の一つが最大値原理です。

直感は簡単です。ある時刻・位置で温度が周囲より高い局所最大になっているなら

$$
u_{xx}\le0.
$$

熱方程式は

$$
u_t=\kappa u_{xx}
$$

なので、その点では温度は増えにくく、むしろ下がる方向へ動きます。

この直感を、最終時刻 $t=T$ のような片側時間微分しか使えない場合も含めて厳密化します。

<a id="thm-pde3-maximum-principle"></a>
<!-- formal-statement-start -->
> **定理（熱方程式の最大値原理）**  
> $\kappa>0$ とし、$u\in C(\overline{Q_T})$ が $Q_T$ で $u_t,u_x,u_{xx}$ を連続に持つとする。さらに

$$
u_t-\kappa u_{xx}\le0
$$

> が $Q_T$ で成り立つとする。このとき

$$
\max_{\overline{Q_T}}u
=
\max_{\partial_pQ_T}u.
$$
<!-- formal-statement-end -->

### 証明の見取り図

不等式が等号の場合だけを眺めると、内部最大点で $u_t=0$ と言いたくなります。しかし最大点が $t=T$ にあると時間方向は片側しかありません。

そこで

$$
v(t,x)=u(t,x)-\varepsilon t
$$

と少し傾けます。すると

$$
v_t-\kappa v_{xx}<0
$$

が厳密に成り立ちます。この $v$ が放物型境界より大きい最大値を内部で取ると、片側時間微分と空間二階微分の符号から逆に

$$
v_t-\kappa v_{xx}\ge0
$$

となって矛盾します。

<!-- proof-start -->
### 証明

$$
M:=\max_{\partial_pQ_T}u
$$

と置きます。$\varepsilon>0$ を固定し

$$
v(t,x)=u(t,x)-\varepsilon t
$$

とします。すると

$$
v_t-\kappa v_{xx}
=
u_t-\kappa u_{xx}-\varepsilon
\le-\varepsilon<0.
$$

もし $\max_{\overline{Q_T}}v>M$ なら、その最大点 $(t_0,x_0)$ は放物型境界上にはありません。

実際、$t=0$ では $v=u\le M$ です。また $x=0,L$ では

$$
v=u-\varepsilon t\le u\le M.
$$

したがって

$$
0<x_0<L,\qquad 0<t_0\le T.
$$

$x_0$ は空間変数について内部最大点なので

$$
v_x(t_0,x_0)=0,
\qquad
v_{xx}(t_0,x_0)\le0.
$$

時間については、$t<t_0$ に対し

$$
v(t,x_0)\le v(t_0,x_0)
$$

なので

$$
\frac{v(t_0,x_0)-v(t,x_0)}{t_0-t}\ge0.
$$

$t\uparrow t_0$ とすれば

$$
v_t(t_0,x_0)\ge0.
$$

従って

$$
v_t(t_0,x_0)-\kappa v_{xx}(t_0,x_0)\ge0,
$$

これは先ほどの厳密不等式

$$
v_t-\kappa v_{xx}<0
$$

に矛盾します。

ゆえに

$$
v(t,x)\le M
$$

が全ての $(t,x)\in\overline{Q_T}$ で成り立ちます。したがって

$$
u(t,x)\le M+\varepsilon t\le M+\varepsilon T.
$$

$\varepsilon\downarrow0$ とすると

$$
u(t,x)\le M.
$$

放物型境界は $\overline{Q_T}$ の部分集合なので逆向きの不等式は自明です。よって

$$
\max_{\overline{Q_T}}u
=
\max_{\partial_pQ_T}u.
$$
<!-- proof-end -->

ここで $\kappa>0$ が本質です。内部最大点で $u_{xx}\le0$ という情報を、時間方向の減少へ変換する符号を保証しています。

---

## 4. 一意性と比較原理は最大値原理から出る

最大値原理は「温度は最大値を増幅しない」という物理的説明だけでなく、解が一意に決まることを証明します。

<a id="cor-pde3-uniqueness"></a>
<!-- formal-statement-start -->
> **系（初期境界値問題の一意性）**  
> 同じ初期値と同じ Dirichlet 境界値を持つ熱方程式の古典解 $u,v$ が存在するなら、

$$
u=v
$$

> である。
<!-- formal-statement-end -->

<!-- proof-start -->
### 証明

差

$$
w=u-v
$$

を取ると

$$
w_t-\kappa w_{xx}=0
$$

で、放物型境界上では $w=0$ です。

最大値原理を $w$ に適用すると

$$
\max_{\overline{Q_T}}w\le0.
$$

同じく $-w$ に適用すると

$$
\max_{\overline{Q_T}}(-w)\le0,
$$

すなわち

$$
w\ge0.
$$

よって $w=0$、したがって $u=v$ です。
<!-- proof-end -->

<a id="cor-pde3-comparison"></a>
<!-- formal-statement-start -->
> **系（比較原理）**  
> $u,v$ が $\overline{Q_T}$ 上の古典関数で

$$
u_t-\kappa u_{xx}
\le
v_t-\kappa v_{xx}
$$

> を $Q_T$ で満たし、放物型境界上で

$$
u\le v
$$

> なら、$\overline{Q_T}$ 全体で

$$
u\le v
$$

> が成り立つ。
<!-- formal-statement-end -->

<!-- proof-start -->
### 証明

$w=u-v$ と置けば

$$
w_t-\kappa w_{xx}\le0,
$$

かつ放物型境界上で $w\le0$ です。最大値原理より

$$
\max_{\overline{Q_T}}w
=
\max_{\partial_pQ_T}w
\le0.
$$

従って $u\le v$ です。
<!-- proof-end -->

特に初期値・境界値が非負なら、0 を比較対象にして解も非負です。

---

## 5. 熱は $L^2$ エネルギーも減らす

最大値原理は最大温度を支配しました。次は温度分布全体の大きさを積分で測ります。

斉次 Dirichlet 条件

$$
u(t,0)=u(t,L)=0
$$

を課します。

<a id="prop-pde3-energy"></a>
<!-- formal-statement-start -->
> **命題（Dirichlet熱方程式のエネルギー散逸恒等式）**  
> $u$ を十分滑らかな斉次 Dirichlet 熱方程式の古典解とする。このとき

$$
E(t):=\frac12\int_0^L u(t,x)^2\,dx
$$

> に対して

$$
\boxed{
E'(t)
=
-\kappa\int_0^L u_x(t,x)^2\,dx
\le0
}
$$

> が成り立つ。
<!-- formal-statement-end -->

### 証明の見取り図

時間微分を積分の中へ入れ、熱方程式を代入し、空間で一回部分積分します。境界項が消える場所で Dirichlet 条件を使います。

<!-- proof-start -->
### 証明

十分滑らかなので

$$
E'(t)
=
\int_0^L u\,u_t\,dx.
$$

熱方程式 $u_t=\kappa u_{xx}$ を代入すると

$$
E'(t)
=
\kappa\int_0^L u\,u_{xx}\,dx.
$$

部分積分により

$$
\int_0^L u\,u_{xx}\,dx
=
\left[u\,u_x\right]_0^L
-
\int_0^L u_x^2\,dx.
$$

境界条件 $u(t,0)=u(t,L)=0$ から境界項は 0 です。従って

$$
E'(t)
=
-\kappa\int_0^L u_x^2\,dx
\le0.
$$
<!-- proof-end -->

ここで失われている量は、空間的な傾きです。温度が完全に平らなら $u_x=0$ で散逸項は 0 になります。

ただし斉次 Dirichlet 条件では平らな非零定数は境界条件を満たせません。したがって最終的には 0 へ向かうことが期待されます。この減衰を次節では固有モードごとに直接見ます。

---

## 6. 変数分離すると空間固有値と時間減衰へ分かれる

斉次 Dirichlet 問題

$$
u_t=\kappa u_{xx},
\qquad
0<x<L,
$$

$$
u(t,0)=u(t,L)=0
$$

を考え、

$$
u(t,x)=T(t)X(x)
$$

と仮定します。

代入すると

$$
T'(t)X(x)=\kappa T(t)X''(x).
$$

$T X\ne0$ の範囲で割れば

$$
\frac{T'}{\kappa T}
=
\frac{X''}{X}.
$$

左辺は $t$ だけ、右辺は $x$ だけの関数なので、両方とも定数です。減衰するモードを得るため

$$
\frac{T'}{\kappa T}
=
\frac{X''}{X}
=
-\lambda
$$

と置きます。

すると

$$
T'+\kappa\lambda T=0,
$$

$$
-X''=\lambda X,
\qquad
X(0)=X(L)=0.
$$

空間側は [ODE7 の固有値・固有関数](../ODE7/index.md#def-ode7-eigenpair) で扱った Dirichlet 固有値問題そのものです。

この具体問題を直接解くと、$\lambda\le0$ では非零解がなく、$\lambda>0$ では

$$
\lambda_n
=
\left(\frac{n\pi}{L}\right)^2,
\qquad
X_n(x)
=
\sin\left(\frac{n\pi x}{L}\right),
\qquad
n=1,2,\ldots
$$

となります。

時間側は

$$
T_n(t)
=
C_n
e^{-\kappa(n\pi/L)^2t}.
$$

したがって各モードは

$$
e^{-\kappa(n\pi/L)^2t}
\sin\left(\frac{n\pi x}{L}\right)
$$

として減衰します。

高周波ほど $n^2$ に比例して速く消える。これが「熱が細かい凹凸を先に消す」機構です。

---

## 7. 有限個のモードなら何も難しくない

無限級数へ進む前に、有限和を完全に確認します。

<a id="prop-pde3-finite-sine"></a>
<!-- formal-statement-start -->
> **命題（有限Fourier正弦モード解）**  
> 任意の $N\in\mathbb N$ と実数 $b_1,\ldots,b_N$ に対し

$$
u_N(t,x)
=
\sum_{n=1}^N
b_n
e^{-\kappa(n\pi/L)^2t}
\sin\left(\frac{n\pi x}{L}\right)
$$

> は斉次 Dirichlet 熱方程式の古典解で、初期値

$$
u_N(0,x)
=
\sum_{n=1}^N
b_n
\sin\left(\frac{n\pi x}{L}\right)
$$

> を持つ。
<!-- formal-statement-end -->

<!-- proof-start -->
### 証明

有限和なので項別微分に問題はありません。各項について

$$
\partial_t
\left(
e^{-\kappa(n\pi/L)^2t}
\sin\left(\frac{n\pi x}{L}\right)
\right)
=
-\kappa\left(\frac{n\pi}{L}\right)^2
e^{-\kappa(n\pi/L)^2t}
\sin\left(\frac{n\pi x}{L}\right),
$$

一方

$$
\partial_{xx}
\left(
e^{-\kappa(n\pi/L)^2t}
\sin\left(\frac{n\pi x}{L}\right)
\right)
=
-\left(\frac{n\pi}{L}\right)^2
e^{-\kappa(n\pi/L)^2t}
\sin\left(\frac{n\pi x}{L}\right).
$$

よって各項で $u_t=\kappa u_{xx}$ が成立し、有限和でも成立します。

また

$$
\sin(0)=0,
\qquad
\sin(n\pi)=0
$$

なので $x=0,L$ の境界値は 0 です。$t=0$ を代入すれば初期値も得られます。
<!-- proof-end -->

この段階では「級数の項別微分」はまだ一度も使っていません。無限和へ移るときだけ、収束の正当化が必要になります。

---

## 8. Fourier正弦級数で一般の初期温度を展開する

初期値 $f$ が十分滑らかで

$$
f(0)=f(L)=0
$$

を満たすとします。

正弦係数を

$$
b_n
=
\frac2L
\int_0^L
f(x)
\sin\left(\frac{n\pi x}{L}\right)
dx
$$

と置きます。

形式的には

$$
f(x)
=
\sum_{n=1}^{\infty}
b_n
\sin\left(\frac{n\pi x}{L}\right)
$$

なので、各モードを時間発展させて

$$
u(t,x)
=
\sum_{n=1}^{\infty}
b_n
e^{-\kappa(n\pi/L)^2t}
\sin\left(\frac{n\pi x}{L}\right)
$$

としたくなります。

問題は「無限和を本当に微分してよいか」です。ここを飛ばしません。

<a id="thm-pde3-sine-series"></a>
<!-- formal-statement-start -->
> **定理（滑らかな初期値に対するFourier正弦級数解）**  
> $f\in C^2([0,L])$ が

$$
f(0)=f(L)=0
$$

> を満たすとする。

$$
b_n
=
\frac2L
\int_0^L
f(x)
\sin\left(\frac{n\pi x}{L}\right)
dx
$$

> と置けば

$$
u(t,x)
=
\sum_{n=1}^{\infty}
b_n
e^{-\kappa(n\pi/L)^2t}
\sin\left(\frac{n\pi x}{L}\right)
$$

> は $t>0$ で熱方程式を満たし、$x=0,L$ で 0、さらに

$$
u(t,\cdot)\to f
$$

> が $t\downarrow0$ で一様に成り立つ。従って各有限 $T>0$ に対して $u$ は初期値 $f$ を持つ古典解である。
<!-- formal-statement-end -->

### 証明の見取り図

必要なのは二段階です。

1. $f\in C^2$ と端点条件から $b_n=O(n^{-2})$ を出す。
2. 正の時刻 $t\ge\tau>0$ では指数因子 $e^{-cn^2\tau}$ が付くので、二階空間微分や時間微分をした後の級数まで一様収束する。

初期時刻では FOU2 の Fourier 級数収束を、$f$ の奇関数周期延長へ適用します。

<!-- proof-start -->
### 証明

$$
k_n=\frac{n\pi}{L}
$$

と書きます。まず

$$
b_n
=
\frac2L\int_0^L f(x)\sin(k_nx)\,dx.
$$

一回部分積分すると、$f(0)=f(L)=0$ から境界項が消え、

$$
\int_0^L f(x)\sin(k_nx)\,dx
=
\frac1{k_n}
\int_0^L f'(x)\cos(k_nx)\,dx.
$$

さらにもう一回部分積分すると、$\sin(k_nL)=\sin(n\pi)=0$ と $\sin0=0$ から

$$
\int_0^L f'(x)\cos(k_nx)\,dx
=
-\frac1{k_n}
\int_0^L f''(x)\sin(k_nx)\,dx.
$$

従って

$$
|b_n|
\le
\frac2L
\frac1{k_n^2}
\int_0^L|f''(x)|\,dx.
$$

つまりある定数 $C$ が存在して

$$
|b_n|\le\frac{C}{n^2}.
$$

よって

$$
\sum_{n=1}^{\infty}|b_n|<\infty.
$$

したがって $t\ge0$ で元の級数は Weierstrass の判定法により一様収束します。

次に任意の $\tau>0$ を固定し、$t\ge\tau$ を考えます。時間微分または空間二階微分をすると、各項に $k_n^2$ が掛かります。したがって絶対値は定数倍を除き

$$
|b_n|k_n^2e^{-\kappa k_n^2\tau}
$$

で抑えられます。

$|b_n|k_n^2$ は一様に有界であり、

$$
\sum_{n=1}^{\infty}e^{-\kappa k_n^2\tau}<\infty
$$

なので、微分後の級数も一様収束します。従って $t>0$ では項別微分でき、

$$
u_t=\kappa u_{xx}.
$$

各項は $x=0,L$ で 0 なので境界条件も満たします。

最後に初期値を確認します。$f$ を $(-L,L)$ 上へ奇関数として延長し、さらに $2L$ 周期に延長します。$f\in C^2([0,L])$ かつ $f(0)=f(L)=0$ なので、この周期延長は連続で区分的 $C^1$ です。

[FOU2 の Dirichlet の点ごとの極限定理](../FOU2/index.md#thm-fou2-dirichlet-convergence)により、その Fourier 級数は各点で $f$ へ収束します。奇関数なので余弦係数は 0 で、正弦係数は上の $b_n$ です。

一方 $\sum|b_n|<\infty$ なので正弦級数は一様収束します。従って

$$
f(x)
=
\sum_{n=1}^{\infty}
b_n\sin(k_nx)
$$

が $[0,L]$ で成立します。

さらに

$$
\begin{aligned}
|u(t,x)-f(x)|
&\le
\sum_{n=1}^{\infty}
|b_n|
\left|
e^{-\kappa k_n^2t}-1
\right|.
\end{aligned}
$$

各 $n$ で括弧内は $t\downarrow0$ で 0 へ行き、常に 2 以下です。$\sum|b_n|<\infty$ なので級数版の優収束により

$$
\sup_{0\le x\le L}|u(t,x)-f(x)|
\to0.
$$

従って初期値へ一様に戻ります。
<!-- proof-end -->

この定理では $C^2$ を使って証明を簡潔に閉じました。より粗い初期値まで広げるには関数空間の議論が必要になり、Encore III 以降の仕事です。

---

## 9. モード減衰から長時間挙動を読む

正弦級数解では

$$
u(t,x)
=
\sum_{n=1}^{\infty}
b_n
e^{-\kappa(n\pi/L)^2t}
\sin\left(\frac{n\pi x}{L}\right).
$$

$n$ が大きいほど指数減衰が速いので、長時間後には最初に非零な低周波モードが残ります。

たとえば

$$
f(x)
=
3\sin\left(\frac{\pi x}{L}\right)
-
2\sin\left(\frac{3\pi x}{L}\right)
$$

なら

$$
u(t,x)
=
3e^{-\kappa(\pi/L)^2t}
\sin\left(\frac{\pi x}{L}\right)
-
2e^{-9\kappa(\pi/L)^2t}
\sin\left(\frac{3\pi x}{L}\right).
$$

第三モードは第一モードの 9 倍の指数率で減衰します。

これはエネルギー散逸命題と同じ現象を、周波数ごとに分解して見ているだけです。

---

## 10. 実数全体ではFourier変換が連続周波数を分離する

今度は境界のない実数全体

$$
x\in\mathbb R
$$

で

$$
u_t=\kappa u_{xx},
\qquad
u(0,x)=f(x)
$$

を考えます。

空間変数 $x$ について Fourier 変換すると、[FOU3 の微分則](../FOU3/index.md#thm-fou3-derivative-rule)により形式的に

$$
\widehat{u_{xx}}(t,\xi)
=
-\xi^2\widehat u(t,\xi).
$$

従って

$$
\partial_t\widehat u(t,\xi)
=
-\kappa\xi^2\widehat u(t,\xi).
$$

これは各 $\xi$ ごとの一階 ODE です。初期値

$$
\widehat u(0,\xi)=\widehat f(\xi)
$$

から

$$
\widehat u(t,\xi)
=
e^{-\kappa t\xi^2}
\widehat f(\xi).
$$

周波数側で高周波 $\xi$ が指数的に削られます。

[Gaussian の Fourier 変換](../FOU3/index.md#lem-fou3-gaussian-transform)から、$e^{-\kappa t\xi^2}$ の逆変換は Gaussian です。

<a id="def-pde3-heat-kernel"></a>
<!-- formal-statement-start -->
> **定義（一次元熱核）**  
> $t>0$ に対し

$$
G_t(x)
=
\frac1{\sqrt{4\pi\kappa t}}
\exp\left(
-\frac{x^2}{4\kappa t}
\right)
$$

> を一次元熱核という。
<!-- formal-statement-end -->

<!-- definition-example-start: def-pde3-heat-kernel -->
**定義の確認：質量は 1**

$$
x=2\sqrt{\kappa t}\,z
$$

と置くと

$$
dx=2\sqrt{\kappa t}\,dz.
$$

したがって

$$
\begin{aligned}
\int_{\mathbb R}G_t(x)\,dx
&=
\frac1{\sqrt{4\pi\kappa t}}
\int_{\mathbb R}
e^{-x^2/(4\kappa t)}dx\\
&=
\frac1{\sqrt\pi}
\int_{\mathbb R}e^{-z^2}dz\\
&=1.
\end{aligned}
$$

また $G_t(x)>0$ が全ての $x$ で成り立ちます。
<!-- definition-example-end -->

---

## 11. 熱核との畳み込みが全空間の解になる

<a id="thm-pde3-whole-line"></a>
<!-- formal-statement-start -->
> **定理（実数全体上の熱核表示）**  
> $\kappa>0$、$f\in L^1(\mathbb R)$ とし、$f$ は各点で連続であるとする。$t>0$ に対して

$$
u(t,x)
=
(G_t*f)(x)
=
\int_{\mathbb R}
G_t(x-y)f(y)\,dy
$$

> と定める。このとき $u$ は $t>0$ で

$$
u_t=\kappa u_{xx}
$$

> を満たし、各 $x$ について

$$
u(t,x)\to f(x)
\qquad(t\downarrow0)
$$

> が成り立つ。また

$$
\|u(t,\cdot)-f\|_1\to0.
$$
<!-- formal-statement-end -->

### 証明の見取り図

$G_t$ 自身について

$$
\partial_tG_t=\kappa\partial_{xx}G_t
$$

を直接計算します。固定した $t>0$ では $G_t$ と必要な導関数が可積分なので、積分記号下で微分できます。

初期値への回帰は新しい定理ではありません。FOU3 の Gaussian approximate identity で

$$
\varepsilon=\kappa t
$$

と置いたものがそのまま $G_t$ です。

<!-- proof-start -->
### 証明

まず

$$
G_t(x)
=
(4\pi\kappa t)^{-1/2}
e^{-x^2/(4\kappa t)}
$$

とします。対数微分を使うと

$$
\partial_tG_t
=
G_t
\left(
-\frac1{2t}
+
\frac{x^2}{4\kappa t^2}
\right).
$$

一方

$$
\partial_xG_t
=
-\frac{x}{2\kappa t}G_t,
$$

したがって

$$
\partial_{xx}G_t
=
\left(
-\frac1{2\kappa t}
+
\frac{x^2}{4\kappa^2t^2}
\right)G_t.
$$

よって

$$
\kappa\partial_{xx}G_t
=
G_t
\left(
-\frac1{2t}
+
\frac{x^2}{4\kappa t^2}
\right)
=
\partial_tG_t.
$$

固定した $t_0>0$ に対し、たとえば $t\in[t_0/2,3t_0/2]$ に制限すると、$G_t(z)$、$\partial_tG_t(z)$、$\partial_{xx}G_t(z)$ は $z$ について一様に有界です。したがって被積分関数は定数倍の $|f(y)|$ で支配されます。従って [優収束定理](../F0_00D2B_単調収束_Fatou_優収束/index.md#thm-f0-00d2b-01) を用いて積分記号下で微分でき、

$$
u_t(t,x)
=
\int_{\mathbb R}
(\partial_tG_t)(x-y)f(y)\,dy,
$$

$$
u_{xx}(t,x)
=
\int_{\mathbb R}
(\partial_{xx}G_t)(x-y)f(y)\,dy.
$$

$G_t$ 自身の熱方程式から

$$
u_t=\kappa u_{xx}.
$$

次に FOU3 で用いた Gaussian 核

$$
k_\varepsilon(x)
=
\frac1{2\sqrt{\pi\varepsilon}}
e^{-x^2/(4\varepsilon)}
$$

へ

$$
\varepsilon=\kappa t
$$

を代入すると

$$
k_{\kappa t}=G_t.
$$

したがって [Gaussian approximate identity](../FOU3/index.md#thm-fou3-gaussian-approximation) より、$f$ の連続点 $x$ で

$$
(G_t*f)(x)\to f(x),
$$

また

$$
\|G_t*f-f\|_1\to0.
$$
<!-- proof-end -->

Fourier 変換を使うと「周波数ごとの ODE」、熱核を使うと「空間で Gaussian 平均」と見えます。両者は同じ時間発展の二つの表示です。

---

## 12. 熱核が示す四つの現象

<a id="prop-pde3-kernel-consequences"></a>
<!-- formal-statement-start -->
> **命題（熱核解の質量保存・正値性・平滑化・無限伝播）**  
> $f\in L^1(\mathbb R)$ とし、

$$
u(t,x)=G_t*f(x)
$$

> とする。このとき各 $t>0$ について次が成り立つ。
>
> 1. 質量保存：

$$
\int_{\mathbb R}u(t,x)\,dx
=
\int_{\mathbb R}f(x)\,dx.
$$

> 2. $f\ge0$ a.e. なら $u(t,x)\ge0$。
> 3. $t>0$ では空間変数について任意回微分できる。
> 4. $f\ge0$ a.e. で $f\not\equiv0$ なら

$$
u(t,x)>0
$$

> が全ての $x\in\mathbb R$ で成り立つ。
<!-- formal-statement-end -->

### 証明の見取り図

質量保存は $\int G_t=1$ と Fubini、正値性は $G_t>0$、平滑化は Gaussian の任意階導関数が可積分であることから出ます。

4 は特に熱方程式らしい性質です。初期値が有限区間にしか存在しなくても、Gaussian は全ての点で正なので、正時刻には全空間へ正の影響が届きます。

<!-- proof-start -->
### 証明

1. Fubini の定理を使うと

$$
\begin{aligned}
\int_{\mathbb R}u(t,x)\,dx
&=
\int_{\mathbb R}
\int_{\mathbb R}
G_t(x-y)f(y)\,dy\,dx\\
&=
\int_{\mathbb R}
f(y)
\left(
\int_{\mathbb R}G_t(x-y)\,dx
\right)dy.
\end{aligned}
$$

内側の積分は変数変換 $z=x-y$ により 1 です。従って

$$
\int u(t,x)dx
=
\int f(y)dy.
$$

2. $G_t\ge0$ と $f\ge0$ から被積分関数が非負なので $u\ge0$ です。

3. 任意の整数 $m\ge0$ について $\partial_x^mG_t$ は「多項式 × Gaussian」の形で $L^1(\mathbb R)$ に属します。従って固定した $t>0$ で畳み込みを項別微分でき、

$$
\partial_x^m u
=
(\partial_x^mG_t)*f.
$$

4. $f\ge0$ かつ $f\not\equiv0$ なら、$f>0$ となる集合は正の測度を持ちます。固定した $t>0,x\in\mathbb R$ に対し

$$
G_t(x-y)>0
$$

が全ての $y$ で成り立つので、

$$
\int_{\mathbb R}G_t(x-y)f(y)dy>0.
$$
<!-- proof-end -->

「無限伝播」は相対論的な信号速度の主張ではなく、この放物型モデルの数学的性質です。波動方程式では PDE4 で有限伝播が現れ、対照がはっきりします。

---

## 13. 拡散距離は $\sqrt{t}$ で伸びる

熱核は

$$
G_t(x)
=
\frac1{\sqrt{t}}
\frac1{\sqrt{4\pi\kappa}}
\exp\left(
-\frac{(x/\sqrt t)^2}{4\kappa}
\right)
$$

と書けます。

したがって時間を $t$ 倍にすると、典型的な空間幅は $\sqrt t$ 倍です。

より定量的には、$G_t$ を確率密度と見れば平均は 0 で、

$$
\int_{\mathbb R}x^2G_t(x)dx
=
2\kappa t.
$$

標準偏差は

$$
\sqrt{2\kappa t}.
$$

つまり「拡散距離は時間に比例」ではなく「時間の平方根に比例」です。

---

## 14. 非零境界値は定常解を引いて斉次化する

Fourier 正弦級数は斉次 Dirichlet 条件に最も自然です。境界値が非零でも、定常解を引けば同じ形へ戻せます。

たとえば

$$
u_t=\kappa u_{xx},
$$

$$
u(t,0)=0,
\qquad
u(t,L)=1
$$

とします。

時間に依らない定常解 $s(x)$ は

$$
s''(x)=0,
$$

$$
s(0)=0,
\qquad
s(L)=1
$$

を満たすので

$$
s(x)=\frac{x}{L}.
$$

そこで

$$
v(t,x)=u(t,x)-\frac{x}{L}
$$

と置けば

$$
v_t=\kappa v_{xx},
$$

$$
v(t,0)=v(t,L)=0.
$$

以後は正弦級数で解けます。

境界条件を先に斉次化し、残差を固有関数展開する。この操作は PDE7 の固有関数法でも繰り返し使います。

---

## 15. 三つの見方を対応させる

熱方程式には三つの代表的な見方があります。

### 最大値原理

$$
\|u(t,\cdot)\|_\infty
$$

の増幅を抑えます。比較・一意性・正値性へ直結します。

### エネルギー法

$$
\frac12\int u^2
$$

の減少を示します。勾配があるほどエネルギーを失います。

### Fourier 分解

各周波数を

$$
e^{-\kappa\xi^2t}
$$

で減衰させます。高周波ほど速く消え、平滑化が見えます。

別の定理を三つ覚えるのではなく、

$$
\boxed{
\text{拡散は局所的な山を削り、
全体のエネルギーを減らし、
高周波を先に消す}
}
$$

という同じ構造を三方向から見ています。

---

## 16. 演習

### Level A

<a id="ex-pde3-a01"></a>
#### PDE3-A01 単一モードを直接検証する
- Level: A

$\kappa>0$, $L>0$, $n\in\mathbb N$ とし

$$
u(t,x)
=
5e^{-\kappa(n\pi/L)^2t}
\sin\left(\frac{n\pi x}{L}\right)
$$

とする。

1. $u_t=\kappa u_{xx}$ を直接確認せよ。
2. $u(t,0)=u(t,L)=0$ を確認せよ。
3. 最大振幅が時間とともにどう減衰するか答えよ。
4. $n$ を2倍にすると指数減衰率は何倍になるか。

<!-- solution-start -->
**解答**

$$
k_n=\frac{n\pi}{L}
$$

と置きます。

1.

$$
u_t
=
-5\kappa k_n^2
e^{-\kappa k_n^2t}
\sin(k_nx),
$$

一方

$$
u_{xx}
=
-5k_n^2
e^{-\kappa k_n^2t}
\sin(k_nx).
$$

従って

$$
u_t=\kappa u_{xx}.
$$

2. $x=0$ では $\sin0=0$、$x=L$ では $\sin(n\pi)=0$ なので

$$
u(t,0)=u(t,L)=0.
$$

3. $|\sin(k_nx)|\le1$ なので

$$
\max_x|u(t,x)|
=
5e^{-\kappa k_n^2t}.
$$

4. $n$ を $2n$ にすると $k_n^2$ は4倍になるので、指数減衰率も4倍です。
<!-- solution-end -->

<a id="ex-pde3-a02"></a>
#### PDE3-A02 最大値原理で解の範囲を縛る
- Level: A

$u$ が

$$
u_t=\kappa u_{xx},
\qquad
0<x<L,\ 0<t\le T
$$

の古典解で、

$$
0\le u(0,x)\le7,
$$

$$
0\le u(t,0)\le7,
\qquad
0\le u(t,L)\le7
$$

を満たすとする。

全ての $(t,x)\in[0,T]\times[0,L]$ で

$$
0\le u(t,x)\le7
$$

を示せ。

<!-- solution-start -->
**解答**

上側評価は最大値原理を $u$ に適用します。放物型境界上で $u\le7$ なので

$$
\max_{\overline{Q_T}}u
=
\max_{\partial_pQ_T}u
\le7.
$$

従って $u\le7$ です。

下側評価には $-u$ を使います。$-u$ も熱方程式を満たし、放物型境界上で

$$
-u\le0.
$$

最大値原理から

$$
-u\le0,
$$

すなわち

$$
u\ge0.
$$

よって

$$
0\le u\le7.
$$
<!-- solution-end -->

<a id="ex-pde3-a03"></a>
#### PDE3-A03 単一モードのエネルギー
- Level: A

$$
u(t,x)
=
Ae^{-\kappa(\pi/L)^2t}
\sin\left(\frac{\pi x}{L}\right)
$$

について

$$
E(t)=\frac12\int_0^Lu(t,x)^2dx
$$

を求め、$E'(t)$ が本文のエネルギー散逸恒等式と一致することを確認せよ。

<!-- solution-start -->
**解答**

$$
\int_0^L\sin^2\left(\frac{\pi x}{L}\right)dx
=
\frac L2
$$

なので

$$
E(t)
=
\frac12
A^2e^{-2\kappa(\pi/L)^2t}
\frac L2
=
\frac{A^2L}{4}
e^{-2\kappa(\pi/L)^2t}.
$$

従って

$$
E'(t)
=
-\frac{A^2L}{2}
\kappa\left(\frac{\pi}{L}\right)^2
e^{-2\kappa(\pi/L)^2t}.
$$

一方

$$
u_x
=
A\frac{\pi}{L}
e^{-\kappa(\pi/L)^2t}
\cos\left(\frac{\pi x}{L}\right),
$$

なので

$$
\int_0^Lu_x^2dx
=
A^2\left(\frac{\pi}{L}\right)^2
e^{-2\kappa(\pi/L)^2t}
\frac L2.
$$

したがって

$$
-\kappa\int_0^Lu_x^2dx
=
-\frac{A^2L}{2}
\kappa\left(\frac{\pi}{L}\right)^2
e^{-2\kappa(\pi/L)^2t}
=
E'(t).
$$
<!-- solution-end -->

<a id="ex-pde3-a04"></a>
#### PDE3-A04 熱核の幅を計算する
- Level: A

$$
G_t(x)
=
\frac1{\sqrt{4\pi\kappa t}}
e^{-x^2/(4\kappa t)}
$$

について次を示せ。

1.

$$
\int_{\mathbb R}G_t(x)dx=1.
$$

2.

$$
\int_{\mathbb R}xG_t(x)dx=0.
$$

3.

$$
\int_{\mathbb R}x^2G_t(x)dx=2\kappa t.
$$

<!-- solution-start -->
**解答**

1. $x=2\sqrt{\kappa t}\,z$ と置けば

$$
\int G_tdx
=
\frac1{\sqrt\pi}
\int_{\mathbb R}e^{-z^2}dz
=1.
$$

2. $xG_t(x)$ は奇関数なので

$$
\int_{\mathbb R}xG_t(x)dx=0.
$$

3. 同じ変数変換で

$$
x^2=4\kappa t\,z^2.
$$

従って

$$
\int x^2G_t(x)dx
=
\frac{4\kappa t}{\sqrt\pi}
\int_{\mathbb R}z^2e^{-z^2}dz.
$$

$(e^{-z^2})'=-2ze^{-z^2}$ を使って部分積分すると

$
\begin{aligned}
\int_{\mathbb R}z^2e^{-z^2}dz
&=
-\frac12\int_{\mathbb R}z\,(e^{-z^2})'dz\\
&=
-\frac12\left[ze^{-z^2}\right]_{-\infty}^{\infty}
+\frac12\int_{\mathbb R}e^{-z^2}dz\\
&=
\frac{\sqrt\pi}{2}.
\end{aligned}
$

境界項が 0 になるのは $|z|e^{-z^2}\to0$ によります。

従って

$$
\int x^2G_t(x)dx
=
2\kappa t.
$$
<!-- solution-end -->

### Level B

<a id="ex-pde3-b01"></a>
#### PDE3-B01 二つの固有モードを時間発展させる
- Level: B

斉次 Dirichlet 問題

$$
u_t=\kappa u_{xx},
\qquad
0<x<L
$$

で初期値を

$$
f(x)
=
3\sin\left(\frac{\pi x}{L}\right)
-
2\sin\left(\frac{2\pi x}{L}\right)
$$

とする。

1. 解を求めよ。
2. 第二モードと第一モードの振幅比を求めよ。
3. $t\to\infty$ でどちらのモードが支配的か説明せよ。

<!-- solution-start -->
**解答**

1. 各正弦モードは独立に

$$
e^{-\kappa(n\pi/L)^2t}
$$

を掛けられて時間発展します。従って

$$
\boxed{
u(t,x)
=
3e^{-\kappa(\pi/L)^2t}
\sin\left(\frac{\pi x}{L}\right)
-
2e^{-4\kappa(\pi/L)^2t}
\sin\left(\frac{2\pi x}{L}\right)
}.
$$

2. 振幅の絶対値の比は

$$
\frac{
2e^{-4\kappa(\pi/L)^2t}
}{
3e^{-\kappa(\pi/L)^2t}
}
=
\frac23
e^{-3\kappa(\pi/L)^2t}.
$$

3. この比は 0 へ行きます。従って長時間では第一モードが支配的です。高周波の第二モードは指数率が4倍なので先に消えます。
<!-- solution-end -->

<a id="ex-pde3-b02"></a>
#### PDE3-B02 比較原理で初期誤差の増幅を抑える
- Level: B

$u,v$ は同じ斉次 Dirichlet 境界条件を持つ熱方程式の古典解とし、

$$
|u(0,x)-v(0,x)|\le\varepsilon
$$

が全ての $x\in[0,L]$ で成り立つとする。

全ての $t\in[0,T]$ で

$$
\sup_{0\le x\le L}
|u(t,x)-v(t,x)|
\le\varepsilon
$$

を示せ。

<!-- solution-start -->
**解答**

差

$$
w=u-v
$$

は

$$
w_t=\kappa w_{xx},
$$

$$
w(t,0)=w(t,L)=0
$$

を満たします。

初期時刻では

$$
-\varepsilon\le w(0,x)\le\varepsilon.
$$

上側について定数関数 $\varepsilon$ と比較します。定数関数は熱方程式を満たし、放物型境界上で

$$
w\le\varepsilon.
$$

比較原理から

$$
w\le\varepsilon.
$$

下側については $-\varepsilon$ を比較対象にします。放物型境界上で $-\varepsilon\le w$ であり、$w$ と定数関数 $-\varepsilon$ はともに熱方程式を満たすので、比較原理から

$
-\varepsilon\le w.
$

従って

$$
|u-v|
=
|w|
\le\varepsilon
$$

が全域で成り立ち、

$$
\sup_x|u(t,x)-v(t,x)|
\le\varepsilon.
$$

初期値の最大誤差は、熱方程式の時間発展で増幅されません。
<!-- solution-end -->

<a id="ex-pde3-b03"></a>
#### PDE3-B03 コンパクトな熱が正時刻には全空間へ広がる
- Level: B

$f\in L^1(\mathbb R)$ が

$$
f\ge0,\qquad
f\not\equiv0,
$$

かつ

$$
f(x)=0
\qquad(|x|>1)
$$

を満たすとする。

$$
u(t,x)=G_t*f(x)
$$

について次を示せ。

1. 任意の $t>0$ と $x\in\mathbb R$ で $u(t,x)>0$。
2. 全質量 $\int u(t,x)dx$ は時間に依らない。
3. 1 と 2 が同時に成り立つことが「熱が無限に生成される」ことを意味しない理由を説明せよ。

<!-- solution-start -->
**解答**

1.

$$
u(t,x)
=
\int_{-1}^{1}
G_t(x-y)f(y)dy.
$$

$G_t(z)>0$ は全ての $z$ で成り立ちます。さらに $f\ge0$ で $f\not\equiv0$ なので、$f>0$ となる集合は正の測度を持ちます。従って積分は厳密に正で、

$$
u(t,x)>0.
$$

2. Fubini と $\int G_t=1$ から

$$
\begin{aligned}
\int_{\mathbb R}u(t,x)dx
&=
\int_{\mathbb R}
\int_{\mathbb R}
G_t(x-y)f(y)dydx\\
&=
\int_{\mathbb R}
f(y)
\left(\int_{\mathbb R}G_t(x-y)dx\right)dy\\
&=
\int_{\mathbb R}f(y)dy.
\end{aligned}
$$

3. 正時刻には値が全空間で正になりますが、総積分は保存されています。つまり新しい熱量を作っているのではなく、元の質量を広い範囲へ非常に薄く再分配しています。
<!-- solution-end -->

### Level C

<a id="ex-pde3-c01"></a>
#### PDE3-C01 非零境界値を斉次化して長時間挙動まで読む
- Level: C

$0<x<L$ で

$$
u_t=\kappa u_{xx}
$$

を考える。境界条件と初期値は

$$
u(t,0)=0,
\qquad
u(t,L)=1,
$$

$$
u(0,x)
=
\frac{x}{L}
+
2\sin\left(\frac{\pi x}{L}\right)
-
\sin\left(\frac{3\pi x}{L}\right)
$$

とする。

1. 定常解 $s(x)$ を求めよ。
2. $v=u-s$ と置いて $v$ の初期境界値問題を書け。
3. $v$ を Fourier 正弦モードで解け。
4. $u$ を求めよ。
5. $t\to\infty$ で $u(t,x)$ が何へ収束するか説明せよ。
6. 過渡成分のうち最も遅く減衰するものを答えよ。

<!-- solution-start -->
**解答**

1. 定常解は $s_t=0$ なので

$$
s''=0.
$$

従って

$$
s(x)=Ax+B.
$$

境界条件

$$
s(0)=0,
\qquad
s(L)=1
$$

から

$$
B=0,
\qquad
A=\frac1L.
$$

よって

$$
\boxed{
s(x)=\frac{x}{L}
}.
$$

2.

$$
v(t,x)=u(t,x)-\frac{x}{L}
$$

と置きます。$x/L$ は時間に依らず二階微分も 0 なので

$$
v_t=\kappa v_{xx}.
$$

境界では

$$
v(t,0)=u(t,0)-0=0,
$$

$$
v(t,L)=u(t,L)-1=0.
$$

初期値は

$$
v(0,x)
=
2\sin\left(\frac{\pi x}{L}\right)
-
\sin\left(\frac{3\pi x}{L}\right).
$$

3. 各モードを独立に時間発展させて

$$
v(t,x)
=
2e^{-\kappa(\pi/L)^2t}
\sin\left(\frac{\pi x}{L}\right)
-
e^{-9\kappa(\pi/L)^2t}
\sin\left(\frac{3\pi x}{L}\right).
$$

4. $u=v+s$ なので

$$
\boxed{
u(t,x)
=
\frac{x}{L}
+
2e^{-\kappa(\pi/L)^2t}
\sin\left(\frac{\pi x}{L}\right)
-
e^{-9\kappa(\pi/L)^2t}
\sin\left(\frac{3\pi x}{L}\right)
}.
$$

5. 二つの指数因子はどちらも 0 へ行くので

$$
u(t,x)\to\frac{x}{L}.
$$

境界温度を保つため、最終状態は 0 ではなく定常線形温度分布です。

6. 第一モードの減衰率は

$$
\kappa\left(\frac{\pi}{L}\right)^2,
$$

第三モードの減衰率はその9倍です。したがって最も遅く減衰する過渡成分は

$$
2e^{-\kappa(\pi/L)^2t}
\sin\left(\frac{\pi x}{L}\right)
$$

です。
<!-- solution-end -->

---

## 17. 章末チェック

- 熱方程式が PDE2 の意味で放物型であることを判別式から確認できる。
- 放物型境界に初期面と空間境界が入り、最終時刻面が入らない理由を説明できる。
- 単一正弦モードが熱方程式を満たし、高周波ほど速く減衰することを直接計算できる。
- 最大値原理の $\varepsilon t$ 摂動の役割を説明し、証明を再構成できる。
- 最大値原理から一意性・比較原理・非負性を導ける。
- Dirichlet 境界条件で部分積分し、エネルギー散逸恒等式を導ける。
- 変数分離から Dirichlet 固有値問題と時間減衰 ODE を導ける。
- 有限 Fourier 正弦和が厳密解になることを直接確認できる。
- $f\in C^2$, $f(0)=f(L)=0$ から $b_n=O(n^{-2})$ を二回の部分積分で示せる。
- 正時刻で指数減衰が項別微分を正当化する仕組みを説明できる。
- Fourier 変換後に各周波数が $\partial_t\widehat u=-\kappa\xi^2\widehat u$ を満たすことを導ける。
- 熱核 $G_t$ が熱方程式を満たし、積分1の Gaussian であることを確認できる。
- 熱核との畳み込みが初期値へ戻ることを Gaussian approximate identity と接続できる。
- 質量保存・平滑化・正値性・無限伝播を熱核から説明できる。
- 非零 Dirichlet 境界値を定常解を引いて斉次化できる。
- 弱解・Sobolev 空間・一般放物型理論を本章の古典解の議論へ混入させない。
