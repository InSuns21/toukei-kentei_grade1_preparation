# NDA4 一様分布・Weyl判定・Kronecker近似

[前章の同時Dirichlet近似](../NDA3/index.md#thm-nda3-simultaneous-dirichlet)は、実数ベクトルを整数倍して整数格子へ近づける分母が存在することを保証しました。しかし、近い時刻が**一度は存在する**ことと、整数倍した点が単位立方体の中を**偏りなく訪れる**ことは違います。さらに、指定した目標点へ近づけるかどうかには、座標の間の整数係数の関係が効きます。

例えば $n\sqrt2$ の小数部分は $0$ にも $1/2$ にも近づけます。一方 $(n\sqrt2,2n\sqrt2)$ の小数部分が $(0,1/2)$ に近づくことはありません。どの整数 $n$ でも第二座標から第一座標の2倍を引けば整数だからです。この「通れる場所」を厳密に決定することが本章の目標です。

道筋は、区間・直方体への訪問割合を数えることから始まり、指数和による判定、無理回転、そして任意次元でのKronecker近似へ進みます。証明では有限等比級数と三角多項式を実際に構成します。使う積分は連続な周期関数の区間上の積分であり、測度論の定理は前提にしません。

## 1. 小数部分と偏りのない訪問

実数 $t$ から最大の $t$ 以下の整数 $\lfloor t\rfloor$ を引いた $\{t\}=t-\lfloor t\rfloor$ が小数部分です。整数を足しても小数部分は変わりません。多次元では各座標を同じ方法で扱い、$[0,1)^d$ の向かい合う面をつないだ空間を $\mathbb T^d=\mathbb R^d/\mathbb Z^d$ と記します。点 $x$ は $x+\boldsymbol m$（$\boldsymbol m\in\mathbb Z^d$）と同じ点です。

$a_j,b_j$ が $0\le a_j<b_j\le1$ を満たすとき、$R=\prod_{j=1}^d[a_j,b_j)$ を半開直方体とします。境界上にある点を二重に数えず、体積は $\prod_j(b_j-a_j)$ です。訪問割合がすべての箱についてその体積へ収束することを、次の定義で厳密にします。

<a id="def-nda4-equidistribution"></a>

<!-- formal-statement-start -->
> **定義（一様分布 mod 1）**  
> 整数 $d\ge1$ と点列 $x_n\in\mathbb T^d$（$n=0,1,\ldots$）を取る。任意の半開直方体 $R=\prod_{j=1}^d[a_j,b_j)$（$0\le a_j<b_j\le1$）について
$$
\lim_{N\to\infty}\frac1N\#\{0\le n<N:x_n\in R\}
=\prod_{j=1}^d(b_j-a_j)
$$
> が成立するとき、$(x_n)$ は $\mathbb T^d$ 上で一様分布するという。
<!-- formal-statement-end -->

<!-- definition-example-start: def-nda4-equidistribution -->
**定義の確認**：$x_n=\{n/4\}$ は $0,1/4,1/2,3/4$ を周期4で繰り返します。$R=[0,1/8)$ の訪問回数は $N=4m$ のとき $m$ 回で、比は $1/4$ です。区間の長さ $1/8$ と一致しないので一様分布しません。一方、この点列を見て「四つの点に均等」と言えても、連続した円周全体への一様分布とは区別しなければなりません。
<!-- definition-example-end -->

角度で考えると、$x\in\mathbb T$ を $e^{2\pi ix}$ へ写したものが単位円です。後で調べるのは、一定角 $\alpha$ を毎回足す回転 $x_n=\{n\alpha+\beta\}$ です。$\alpha$ が有理数なら訪問点は有限個です。無理数のときはどうなるでしょうか。

## 2. 連続関数と三角多項式に置き換える

箱の個数を直接計算しようとすると、境界で値が跳ぶ0と1の関数が現れます。ここでは $\mathbf1_R(x)$ を、$x\in R$ なら1、それ以外なら0とする記号として用います。まず、連続な周期関数だけを使って一様分布を判定できるようにします。$\int_{\mathbb T^d}f$ は $[0,1]^d$ 上の積分を表します。積分と体積の扱いは[Jordan可測集合の定義](../../../基礎科目/RA/RA7/index.md#def-ra7-jordan-measurable)に沿うものです。

<a id="lem-nda4-continuous-tests"></a>

<!-- formal-statement-start -->
> **補題（連続関数による一様分布の判定）**  
> $d\ge1$、$x_n\in\mathbb T^d$ とする。次は同値である。
>
> 1. $(x_n)$ は[一様分布](#def-nda4-equidistribution)する。
> 2. 任意の実数値連続周期関数 $f:\mathbb T^d\to\mathbb R$ に対して
$$
\lim_{N\to\infty}\frac1N\sum_{n=0}^{N-1}f(x_n)
=\int_{[0,1]^d}f(x)\,dx
$$
> が成り立つ。
>
> 複素数値連続関数でも実部・虚部に分けて同じ結論が成り立つ。
<!-- formal-statement-end -->

### 証明の見取り図

一様分布から連続関数への方向は、単位立方体を細かい箱に区切って、その箱の上で関数をほぼ一定と見なします。逆方向は、直方体への所属を0と1で表す関数を、連続な下側・上側の関数で挟みます。どちらも境界を無視するのではなく、境界付近の**体積が小さい**ことを定量化します。

<!-- proof-start -->
### 証明

最初に1を仮定します。連続周期関数 $f$ はコンパクトな $\mathbb T^d$ 上で一様連続です。任意の $\varepsilon>0$ に対して十分大きな整数 $m$ を取り、$[0,1)^d$ を辺長 $1/m$ の $m^d$ 個の半開立方体 $Q_\nu$ に分割すると、各 $Q_\nu$ での $f$ の振幅は $\varepsilon$ 以下です。代表点 $\xi_\nu\in Q_\nu$ を選び、$s(x)=f(\xi_\nu)$（$x\in Q_\nu$）とすれば $\sup_x|f(x)-s(x)|\le\varepsilon$ です。従って
$$
\left|\frac1N\sum_{n<N}f(x_n)-\frac1N\sum_{n<N}s(x_n)\right|
\le\varepsilon
$$
および
$$
\left|\int f-\int s\right|\le\varepsilon
$$
を得ます。一方、有限和に分けて
$$
\frac1N\sum_{n<N}s(x_n)
=\sum_\nu f(\xi_\nu)\frac{\#\{n<N:x_n\in Q_\nu\}}N
\longrightarrow
\sum_\nu f(\xi_\nu)\operatorname{vol}(Q_\nu)
=\int s
$$
です。従って $f$ の平均と積分の差の極限上限は $2\varepsilon$ 以下です。$\varepsilon$ は任意なので2が従います。

逆に2を仮定し、半開直方体 $R$ を固定します。$\mathbb T^d$ 上の距離を各座標の円周距離 $\|t\|=\min_{m\in\mathbb Z}|t-m|$ の最大値で測ります。$R$ の境界から距離 $\delta$ 以下の部分 $U_\delta$ は、有限個の厚さ $2\delta$ 以下の帯の和に含まれます。その体積は $\delta\downarrow0$ で $0$ に向かいます。

集合 $A$ への距離 $\operatorname{dist}(x,A)$ は $x$ の連続関数です。$0<\delta<1/4$ として
$$
f_-(x)=\min\{1,\operatorname{dist}(x,\mathbb T^d\setminus R)/\delta\},
\qquad
f_+(x)=\max\{0,1-\operatorname{dist}(x,R)/\delta\}
$$
を取ります。$R=\mathbb T^d$ の場合は定数関数で直接判定します。それ以外では $f_\pm$ は連続周期関数で、
$$
0\le f_-(x)\le\mathbf1_R(x)\le f_+(x)\le1
$$
です。$R$ の境界から $\delta$ 以上離れた点では両者と $\mathbf1_R$ が一致するので
$$
\operatorname{vol}(R)-\operatorname{vol}(U_\delta)
\le\int f_-\le\int f_+\le
\operatorname{vol}(R)+\operatorname{vol}(U_\delta).
$$
有限平均にも同じ挟み込みを適用し、2による $f_\pm$ の極限を取ると、訪問割合の極限下限・上限はそれぞれ $\operatorname{vol}(R)\mp\operatorname{vol}(U_\delta)$ に挟まれます。最後に $\delta\downarrow0$ とすると両者とも $\operatorname{vol}(R)$ です。従って1が成立します。
<!-- proof-end -->

指数関数 $e^{2\pi ikx}$ は複素数値ですが、加法を乗法に変える利点があります。次は連続関数を指数関数の**有限和**で近似する補題です。ここを証明しておけば、次の指数和判定で近似定理をブラックボックスにする必要はありません。

<a id="lem-nda4-fejer-approximation"></a>

<!-- formal-statement-start -->
> **補題（Fejér核による三角多項式近似）**  
> $d\ge1$ とし、$f:\mathbb T^d\to\mathbb C$ を連続関数とする。任意の $\varepsilon>0$ に対し、有限集合 $S\subset\mathbb Z^d$ と複素係数 $c_{\boldsymbol k}$ が存在し、
$$
P(x)=\sum_{\boldsymbol k\in S}c_{\boldsymbol k}
e^{2\pi i\boldsymbol k\cdot x},
\qquad
\sup_{x\in\mathbb T^d}|f(x)-P(x)|<\varepsilon
$$
> を満たす。
<!-- formal-statement-end -->

### 証明の見取り図

1次元では[Fejér核](../../../解析系/FOU/FOU2/index.md#def-fou2-fejer-kernel)として既習の $1+z+\cdots+z^M$ の絶対値の二乗を使い、積分が1で原点に集中する非負の三角多項式を作ります。それを各座標で掛け、$f$ との畳み込みを取れば三角多項式となり、一様連続性から元の $f$ に一様に近づきます。

<!-- proof-start -->
### 証明

整数 $M\ge0$ に対して
$$
F_M(t)=\frac1{M+1}\left|\sum_{j=0}^{M}e^{2\pi ijt}\right|^2
=\sum_{k=-M}^{M}\left(1-\frac{|k|}{M+1}\right)e^{2\pi ikt}
$$
と置きます。後半の等式は、積を展開すると指数 $k=j-\ell$ を作る対 $(j,\ell)$ が $M+1-|k|$ 組あることから従います。$F_M(t)\ge0$、指数 $k=0$ の係数が1なので
$$
\int_0^1F_M(t)\,dt=1.
$$
ここで $k\ne0$ の指数関数の積分は
$$
\int_0^1e^{2\pi ikt}\,dt
=\left[\frac{e^{2\pi ikt}}{2\pi ik}\right]_{t=0}^{t=1}=0
$$
です。$\|t\|\ge\delta>0$ のとき等比級数を使って
$$
\left|\sum_{j=0}^{M}e^{2\pi ijt}\right|
=\left|\frac{1-e^{2\pi i(M+1)t}}{1-e^{2\pi it}}\right|
\le\frac1{|\sin(\pi t)|}
\le\frac1{\sin(\pi\delta)}
$$
なので（$0<\delta<1/2$）、
$$
F_M(t)\le\frac1{(M+1)\sin^2(\pi\delta)}.
$$

$d$ 次元では $H_M(t)=\prod_{j=1}^dF_M(t_j)$ と置きます。非負で積分1、かつ有限個の指数関数の和です。畳み込み
$$
P_M(x)=\int_{[0,1]^d}f(x-t)H_M(t)\,dt
$$
を考えます。$H_M$ の有限Fourier展開を代入し、$u=x-t$ と周期性による変数移動を使うと、各項は
$$
\int f(x-t)e^{2\pi i\boldsymbol k\cdot t}\,dt
=e^{2\pi i\boldsymbol k\cdot x}
\int f(u)e^{-2\pi i\boldsymbol k\cdot u}\,du
$$
となるため、$P_M$ は有限三角多項式です。

$f$ の一様連続性から、$\max_j\|t_j\|<\delta$ ならすべての $x$ で $|f(x-t)-f(x)|<\varepsilon/2$ となる $\delta>0$ が取れます。$B=\sup_x|f(x)|$ と置き、積分をこの近傍とその外に分けます。外側は少なくとも一座標で $\|t_j\|\ge\delta$ なので、非負性・各座標の積分1より
$$
\int_{\max_j\|t_j\|\ge\delta}H_M(t)\,dt
\le\sum_{j=1}^d\int_{\|t_j\|\ge\delta}F_M(t_j)\,dt_j
\le\frac{d}{(M+1)\sin^2(\pi\delta)}.
$$
従って
$$
\begin{aligned}
|P_M(x)-f(x)|
&\le\int |f(x-t)-f(x)|H_M(t)\,dt\\
&\le\frac\varepsilon2+
\frac{2Bd}{(M+1)\sin^2(\pi\delta)}.
\end{aligned}
$$
$M$ を十分大きく取れば右辺は $\varepsilon$ より小さくなります。評価は $x$ に依存しないので一様近似です。
<!-- proof-end -->

## 3. Weyl判定：訪問回数から指数和へ

ベクトル $\boldsymbol k=(k_1,\ldots,k_d)\in\mathbb Z^d$ に対し、$e^{2\pi i\boldsymbol k\cdot x}$ はトーラスの周期性を保ちます。非零 $\boldsymbol k$ ではこの関数の積分は0です。なぜなら $k_j\ne0$ の座標が一つはあり、その座標で先ほどの積分を実行すれば0だからです。

<a id="thm-nda4-weyl-criterion"></a>

<!-- formal-statement-start -->
> **定理（Weyl判定）**  
> $d\ge1$、$x_n\in\mathbb T^d$ とする。$(x_n)$ が[一様分布](#def-nda4-equidistribution)するための必要十分条件は、任意の $\boldsymbol k\in\mathbb Z^d\setminus\{0\}$ に対して
$$
\lim_{N\to\infty}\frac1N
\sum_{n=0}^{N-1}e^{2\pi i\boldsymbol k\cdot x_n}=0
$$
> が成立することである。
<!-- formal-statement-end -->

### 証明の見取り図

必要性は指数関数を[連続関数判定](#lem-nda4-continuous-tests)へ入力します。十分性では任意の連続関数 $f$ を[Fejér核による三角多項式近似](#lem-nda4-fejer-approximation)で三角多項式に置き換えます。非定数の各周波数が消え、定数項だけが平均と積分の両方に残ります。

<!-- proof-start -->
### 証明

一様分布を仮定します。$\boldsymbol k\ne0$ を固定し、$f(x)=e^{2\pi i\boldsymbol k\cdot x}$ と置きます。$f$ は連続周期関数で、その積分は前述の座標ごとの積分により0です。[連続関数判定](#lem-nda4-continuous-tests)を実部と虚部に適用すると所望の指数和は0に収束します。

逆にすべての非零 $\boldsymbol k$ の指数和が0に収束するとします。任意の連続周期関数 $f$ と $\varepsilon>0$ を固定し、[Fejér核による三角多項式近似](#lem-nda4-fejer-approximation)から
$$
P(x)=\sum_{\boldsymbol k\in S}c_{\boldsymbol k}e^{2\pi i\boldsymbol k\cdot x},
\qquad
\|f-P\|_\infty<\varepsilon
$$
を取ります。有限和なので極限と和を交換でき、
$$
\lim_{N\to\infty}\frac1N\sum_{n<N}P(x_n)=c_{\boldsymbol0}
=\int_{\mathbb T^d}P(x)\,dx.
$$
ただし $S$ に $\boldsymbol0$ がなければ $c_{\boldsymbol0}=0$ と置きます。また
$$
\left|\frac1N\sum_{n<N}(f-P)(x_n)\right|\le\varepsilon,
\qquad
\left|\int(f-P)\right|\le\varepsilon
$$
です。従って
$$
\limsup_{N\to\infty}
\left|\frac1N\sum_{n<N}f(x_n)-\int f\right|\le2\varepsilon.
$$
$\varepsilon$ は任意なので[連続関数判定](#lem-nda4-continuous-tests)の条件2が成立し、一様分布です。
<!-- proof-end -->

**定理の使い方**：すべての区間の訪問回数を数える代わりに、固定した非零整数 $\boldsymbol k$ ごとに**一つの有限指数和**の極限を調べればよくなりました。ただし「各 $\boldsymbol k$ を固定してから $N\to\infty$」という順番です。$\boldsymbol k$ に関して一様な評価は[Weyl判定](#thm-nda4-weyl-criterion)の仮定ではありません。

## 4. 有理回転と無理回転

$n$ 回回転した点 $x_n=\{n\alpha+\beta\}$ へ[Weyl判定](#thm-nda4-weyl-criterion)を使います。$\beta$ は初期角、$\alpha$ は一回の回転角です。$k\ne0$ を固定したとき
$$
\frac1N\sum_{n=0}^{N-1}e^{2\pi ik(n\alpha+\beta)}
=\frac{e^{2\pi ik\beta}}N
\sum_{n=0}^{N-1}z^n,
\qquad z=e^{2\pi ik\alpha}.
$$
$z\ne1$ なら有限等比級数を計算できます。

<a id="thm-nda4-irrational-rotation"></a>

<!-- formal-statement-start -->
> **定理（無理回転の一様分布）**  
> 実数 $\alpha,\beta$ に対して $x_n=\{n\alpha+\beta\}$（$n\ge0$）とする。この点列が $\mathbb T$ 上で一様分布するための必要十分条件は $\alpha\notin\mathbb Q$ である。
<!-- formal-statement-end -->

### 証明の見取り図

無理数ならどの非零整数 $k$ に対しても $k\alpha$ は整数にならず、等比級数の分母が消えません。有理数ならその分母が消える周波数が必ずあり、指数和は0でなく1になります。

<!-- proof-start -->
### 証明

$\alpha\notin\mathbb Q$ とします。任意の $k\in\mathbb Z\setminus\{0\}$ に対して $k\alpha\notin\mathbb Z$ なので $z\ne1$ です。従って
$$
\sum_{n=0}^{N-1}z^n=\frac{1-z^N}{1-z},
\qquad
\left|\frac1N\sum_{n=0}^{N-1}e^{2\pi ik(n\alpha+\beta)}\right|
\le\frac2{N|1-e^{2\pi ik\alpha}|}\longrightarrow0.
$$
分母は $k$ を固定すると正の定数です。[Weyl判定](#thm-nda4-weyl-criterion)から一様分布します。

逆に $\alpha=p/q\in\mathbb Q$（$p\in\mathbb Z$、$q\ge1$）なら $k=q$ を選ぶと $e^{2\pi ikn\alpha}=e^{2\pi inp}=1$ です。従って
$$
\frac1N\sum_{n=0}^{N-1}e^{2\pi iq(n\alpha+\beta)}
=e^{2\pi iq\beta}\ne0.
$$
[Weyl判定](#thm-nda4-weyl-criterion)の必要条件を満たさず、一様分布しません。
<!-- proof-end -->

**誤解しやすい点**：無理回転が一様分布することは「任意の長さの有限区間で完全に等間隔」という意味ではありません。固定した区間への訪問割合が、$N\to\infty$ でその長さに近づくという意味です。また、有理回転が周期軌道上で等しい頻度を持つことと、トーラス全体で一様分布することは別です。

## 5. Kronecker近似：近づける目標点を決める

今度は $\boldsymbol\alpha=(\alpha_1,\ldots,\alpha_d)$ の整数倍を考えます。$n\boldsymbol\alpha$ が任意の指定点 $\boldsymbol\beta$ に近づくためには、座標間の**整数係数の関係**を壊してはいけません。

例えば $\alpha_2=2\alpha_1$ なら、すべての $n$ で $\{n\alpha_2-2n\alpha_1\}=0$ です。従って目標にも $\beta_2-2\beta_1\in\mathbb Z$ が必要です。驚くべきことに、すべてのそのような整数係数の関係についてこの条件を課せば、それだけで十分です。

<a id="def-nda4-integer-relation"></a>

<!-- formal-statement-start -->
> **定義（整数関係）**  
> $\boldsymbol\alpha\in\mathbb R^d$ に対し、
$$
L_{\boldsymbol\alpha}
=\{\boldsymbol k\in\mathbb Z^d:
\boldsymbol k\cdot\boldsymbol\alpha\in\mathbb Z\}
$$
> を整数関係の集合という。$\boldsymbol k=\boldsymbol0$ は常に属する。
<!-- formal-statement-end -->

<!-- definition-example-start: def-nda4-integer-relation -->
**定義の確認**：$\boldsymbol\alpha=(\sqrt2,2\sqrt2)$ では
$$
\boldsymbol k\cdot\boldsymbol\alpha
=(k_1+2k_2)\sqrt2.
$$
$\sqrt2$ は無理数なので、これが整数になる必要十分条件は $k_1+2k_2=0$ です。ゆえに
$$
L_{\boldsymbol\alpha}=\{m(-2,1):m\in\mathbb Z\}.
$$
特に $(0,1/2)$ は $\boldsymbol k=(-2,1)$ の関係に違反しますが、$(1/5,2/5)$ は全関係と両立します。
<!-- definition-example-end -->

二点間の円周距離 $\|s-t\|=\min_{m\in\mathbb Z}|s-t-m|$ を用います。目標への近さは各座標で同時に測らなければなりません。

<a id="thm-nda4-kronecker"></a>

<!-- formal-statement-start -->
> **定理（Kroneckerの近似定理）**  
> $d\ge1$、$\boldsymbol\alpha,\boldsymbol\beta\in\mathbb R^d$ とする。次は同値である。
>
> **条件1（近似可能性）**：任意の $\varepsilon>0$ に対し、整数 $n\ge0$ が存在して
$$
\max_{1\le j\le d}\|n\alpha_j-\beta_j\|<\varepsilon
$$
> を満たす。
> **条件2（整数関係）**：任意の $\boldsymbol k\in\mathbb Z^d$ について
$$
\boldsymbol k\cdot\boldsymbol\alpha\in\mathbb Z
\quad\Longrightarrow\quad
\boldsymbol k\cdot\boldsymbol\beta\in\mathbb Z
$$
> が成立する。
<!-- formal-statement-end -->

### 証明の見取り図

必要性は連続な指数関数に極限を通すだけです。十分性には、目標点の近傍では大きく、そこから離れると急速に小さくなる**非負の三角多項式**を作ります。そのFourier係数を非負にしておけば、整数関係と両立する目標点では時間平均に正の下界が残ります。訪問点が目標から一定距離以上離れていると平均は小さくなるので矛盾します。

<!-- proof-start -->
### 証明

**1から2へ**。1を仮定し、$\boldsymbol k\in L_{\boldsymbol\alpha}$ を固定します。$\varepsilon=1/r$（$r\ge1$）として $n_r\ge0$ を選び、整数ベクトル $\boldsymbol m_r$ も選んで
$$
|n_r\alpha_j-\beta_j-m_{r,j}|<1/r
\quad(1\le j\le d)
$$
とします。内積を取ると
$$
\left|\boldsymbol k\cdot\beta-
n_r(\boldsymbol k\cdot\alpha)+
\boldsymbol k\cdot\boldsymbol m_r\right|
\le\frac{\sum_j|k_j|}{r}\longrightarrow0.
$$
後ろの二項は整数です。従って $\boldsymbol k\cdot\beta$ の整数への距離が0であり、$\boldsymbol k\cdot\beta\in\mathbb Z$ です。

**2から1へ**。2を仮定します。背理法で、ある $\delta>0$ に対して全ての整数 $n\ge0$ が
$$
\max_j\|n\alpha_j-\beta_j\|\ge\delta
$$
を満たすとします。$\delta$ は必要なら $0<\delta<1/2$ としてよいです。

整数 $M\ge1$ に対して、1次元の周期関数
$$
g_M(t)=\left(\frac{1+\cos2\pi t}{2}\right)^M
=\cos^{2M}(\pi t)
$$
を作ります。二項定理で
$$
g_M(t)=4^{-M}(e^{\pi it}+e^{-\pi it})^{2M}
=\sum_{h=-M}^{M}b_{M,h}e^{2\pi iht},
\qquad
b_{M,h}=4^{-M}\binom{2M}{M+h}\ge0.
$$
特に定数係数 $b_{M,0}$ はこの $2M+1$ 個の係数の最大値で、総和が $g_M(0)=1$ だから
$$
b_{M,0}\ge\frac1{2M+1}.
$$

$d$ 次元で
$$
K_M(x)=\frac{\prod_{j=1}^d g_M(x_j)}{b_{M,0}^d}
=\sum_{\substack{\boldsymbol h\in\mathbb Z^d\\|h_j|\le M}}
a_{M,\boldsymbol h}e^{2\pi i\boldsymbol h\cdot x}
$$
とします。すべての $a_{M,\boldsymbol h}\ge0$、そして $a_{M,\boldsymbol0}=1$ です。この有限和の軌道平均を計算します。固定した $\boldsymbol h$ について等比級数から
$$
\lim_{N\to\infty}\frac1N\sum_{n=0}^{N-1}
e^{2\pi i\boldsymbol h\cdot(n\alpha-\beta)}
=
\begin{cases}
e^{-2\pi i\boldsymbol h\cdot\beta},&
\boldsymbol h\cdot\alpha\in\mathbb Z,\\
0,&\boldsymbol h\cdot\alpha\notin\mathbb Z.
\end{cases}
$$
2の整数関係条件により上の第一行は常に1です。有限和の極限を取れば
$$
\lim_{N\to\infty}\frac1N\sum_{n=0}^{N-1}K_M(n\alpha-\beta)
=\sum_{\substack{|h_j|\le M\\\boldsymbol h\in L_{\boldsymbol\alpha}}}
a_{M,\boldsymbol h}\ge a_{M,\boldsymbol0}=1.
$$

一方、仮定した $\delta$ のために、各 $n$ では少なくとも一座標 $j$ で $\|n\alpha_j-\beta_j\|\ge\delta$ です。$|\cos(\pi t)|\le\cos(\pi\delta)<1$（$\delta\le1/2$）なので、その座標の $g_M$ は $\cos^{2M}(\pi\delta)$ 以下です。他の $g_M$ はすべて1以下です。従って
$$
0\le K_M(n\alpha-\beta)
\le(2M+1)^d\cos^{2M}(\pi\delta)
$$
が全 $n$ で成立します。右辺は指数減衰が多項式増大より速いため $M\to\infty$ で0に収束します。十分大きな固定 $M$ を選んで右辺を $1/2$ 未満にすれば、その $M$ での軌道平均の極限は $1/2$ 以下です。先の下界1と矛盾します。よって1が従います。
<!-- proof-end -->

この証明では「閉部分群にはそれを識別する指標がある」という高次の群論を使っていません。整数関係の情報と正係数の多項式を直接組み合わせたため、prerequisiteの範囲内で両方向を閉じられます。

<a id="cor-nda4-rational-independence"></a>

<!-- formal-statement-start -->
> **系（有理独立とトーラス上の一様分布）**  
> $\boldsymbol\alpha\in\mathbb R^d$ に対し、次は同値である。
>
> 1. $1,\alpha_1,\ldots,\alpha_d$ が有理数体上一次独立である。
> 2. $(\{n\alpha_1\},\ldots,\{n\alpha_d\})_{n\ge0}$ が $\mathbb T^d$ 上で一様分布する。
> 3. 任意の $\boldsymbol\beta\in\mathbb R^d$ と $\varepsilon>0$ に対して
$$
\max_j\|n\alpha_j-\beta_j\|<\varepsilon
$$
> を満たす整数 $n\ge0$ が存在する。
<!-- formal-statement-end -->

### 証明の見取り図

一次独立なら $\boldsymbol k\cdot\boldsymbol\alpha\notin\mathbb Z$ が非零の全 $\boldsymbol k$ に成立するため、指数和は幾何級数として消えます。逆に整数関係があれば対応する指数関数が常に1となり、一様分布も任意目標への近似もできなくなります。

<!-- proof-start -->
### 証明

1は $L_{\boldsymbol\alpha}=\{\boldsymbol0\}$ と同値です。1を仮定すると、非零 $\boldsymbol k$ に対して $z=e^{2\pi i\boldsymbol k\cdot\alpha}\ne1$ なので
$$
\left|\frac1N\sum_{n<N}e^{2\pi i\boldsymbol k\cdot n\alpha}\right|
=\left|\frac{1-z^N}{N(1-z)}\right|
\le\frac2{N|1-z|}\longrightarrow0.
$$
[Weyl判定](#thm-nda4-weyl-criterion)から2です。2なら任意の目標 $\boldsymbol\beta$ を中心とする十分小さい開直方体の体積は正なので、訪問回数が正となる大きな $N$ があり3が従います（円周の継ぎ目では開近傍を半開直方体へ分割します）。最後に3を仮定し、もし非零 $\boldsymbol k\in L_{\boldsymbol\alpha}$ があれば $\boldsymbol k\cdot\boldsymbol\beta\notin\mathbb Z$ となる $\boldsymbol\beta$ を選べます。これは[Kroneckerの近似定理](#thm-nda4-kronecker)の必要条件に反するため、1が従います。
<!-- proof-end -->

## 6. 分布と近似がつなぐもの

[前章の同時Dirichlet近似](../NDA3/index.md#thm-nda3-simultaneous-dirichlet)は、$q$ と誤差の上限を与える**存在・量的評価**です。[Kroneckerの近似定理](#thm-nda4-kronecker)は、任意の目標へ**到達可能か**を整数関係だけで判定します。[Weyl判定](#thm-nda4-weyl-criterion)は、有限時間平均が空間平均へ近づくという**分布の判定**です。似た「近づく」を扱っていても、それぞれの量化は異なります。

この区別は数値積分の準Monte Carlo法（QMC）にも現れます。一様分布点列では連続な周期関数の標本平均が空間平均へ収束しますが、ここで証明したのは収束そのものまでです。有限 $N$ の誤差速度や低ディスクレパンシー性は、追加の評価が必要です。また回転写像は力学系の最小例で、無理回転における軌道の分布と、有理回転における周期性を対比できます。

## 7. 演習：指数和から整数関係へ

### Level A：定義と有限計算を確認する

**NDA4-A1（周期回転の訪問割合）**  
$x_n=\{n/4\}$、$R=[0,1/8)$ とする。$N=4m$ の訪問割合を求め、一様分布するか判定してください。

- Level: A

<!-- solution-start -->
**詳細解答**

$0\le n<4m$ において $n\bmod4$ は各値を $m$ 回ずつ取ります。対応する点は $0,1/4,1/2,3/4$ です。$[0,1/8)$ に入るのは $0$ だけなので
$$
\frac1{4m}\#\{0\le n<4m:x_n\in R\}=\frac m{4m}=\frac14.
$$
$R$ の長さは $1/8$ であり、極限はそれに等しくありません。[一様分布の定義](#def-nda4-equidistribution)により一様分布しません。
<!-- solution-end -->

**NDA4-A2（指数関数の積分）**  
$k\in\mathbb Z$ に対し $\int_0^1e^{2\pi ikt}\,dt$ を $k=0$ と $k\ne0$ に分けて求めてください。

- Level: A

<!-- solution-start -->
**詳細解答**

$k=0$ のとき被積分関数は1なので積分は1です。$k\ne0$ のとき
$$
\int_0^1e^{2\pi ikt}\,dt
=\frac{e^{2\pi ik}-1}{2\pi ik}
=\frac{1-1}{2\pi ik}=0.
$$
整数 $k$ のため $e^{2\pi ik}=1$ であることを使いました。この直交性が[Weyl判定](#thm-nda4-weyl-criterion)の定数項だけを残す計算です。
<!-- solution-end -->

**NDA4-A3（整数関係の具体例）**  
$\boldsymbol\alpha=(\sqrt2,2\sqrt2)$ の $L_{\boldsymbol\alpha}$ を求め、$\boldsymbol\beta=(0,1/2)$ が[Kroneckerの近似定理](#thm-nda4-kronecker)の必要条件を満たすか判定してください。

- Level: A

<!-- solution-start -->
**詳細解答**

$$
k_1\alpha_1+k_2\alpha_2=(k_1+2k_2)\sqrt2.
$$
$\sqrt2$ は無理数なので、整数になるのは $k_1+2k_2=0$ のときだけです。従って
$$
L_{\boldsymbol\alpha}=\{(-2m,m):m\in\mathbb Z\}.
$$
$\boldsymbol k=(-2,1)$ は関係に属しますが、
$$
\boldsymbol k\cdot\boldsymbol\beta=(-2)\cdot0+1\cdot\frac12=\frac12\notin\mathbb Z.
$$
必要条件が破れるので、同じ整数 $n$ による目標への任意精度の近似はできません。
<!-- solution-end -->

**NDA4-A4（Fejér核の最初の例）**  
$F_1(t)=\tfrac12|1+e^{2\pi it}|^2$ を実数値の三角多項式として展開し、非負性と積分1を確認してください。

- Level: A

<!-- solution-start -->
**詳細解答**

共役を掛けて展開すると
$$
\begin{aligned}
F_1(t)
&=\frac12(1+e^{2\pi it})(1+e^{-2\pi it})\\
&=\frac12(2+e^{2\pi it}+e^{-2\pi it})\\
&=1+\cos(2\pi t).
\end{aligned}
$$
最初の表示は絶対値の二乗なので非負です。積分は
$$
\int_0^1F_1(t)\,dt
=\int_0^1 1\,dt+\left[\frac{\sin2\pi t}{2\pi}\right]_0^1
=1.
$$
この二性質が[Fejér核による三角多項式近似](#lem-nda4-fejer-approximation)の出発点です。
<!-- solution-end -->

### Level B：判定と反例の証明を再構成する

**NDA4-B1（有理回転の共鳴周波数）**  
$\alpha=p/q$（整数 $p$、正整数 $q$）と $\beta\in\mathbb R$ に対し、$x_n=\{n\alpha+\beta\}$ が一様分布しないことを、周波数 $k=q$ の指数和から直接示してください。

- Level: B

<!-- solution-start -->
**詳細解答**

周波数 $k=q\ne0$ を固定します。$qn\alpha=np\in\mathbb Z$ なので
$$
e^{2\pi iq(n\alpha+\beta)}
=e^{2\pi inp}e^{2\pi iq\beta}=e^{2\pi iq\beta}.
$$
従ってすべての $N\ge1$ で
$$
\frac1N\sum_{n=0}^{N-1}e^{2\pi iqx_n}
=\frac N N e^{2\pi iq\beta}
=e^{2\pi iq\beta}.
$$
右辺の絶対値は1であり、0には収束しません。[Weyl判定](#thm-nda4-weyl-criterion)の必要条件に反するため、一様分布ではありません。$\beta$ をどう選んでも結論は変わりません。
<!-- solution-end -->

**NDA4-B2（零密度の例外を変更する）**  
$\mathbb T^d$ の一様分布点列 $x_n$ と別の点列 $y_n$ があり、$0\le n<N$ で $x_n\ne y_n$ となる添字の数が $o(N)$ であるとする。$y_n$ も一様分布することを示してください。

- Level: B

<!-- solution-start -->
**詳細解答**

非零の $\boldsymbol k\in\mathbb Z^d$ を固定し、相違添字の集合を $E_N$ とします。指数関数の絶対値は1なので、各相違添字で差の絶対値は2以下です。従って
$$
\begin{aligned}
\left|\frac1N\sum_{n<N}e^{2\pi i\boldsymbol k\cdot y_n}
-\frac1N\sum_{n<N}e^{2\pi i\boldsymbol k\cdot x_n}\right|
&\le\frac1N\sum_{n\in E_N}2\\
&=\frac{2|E_N|}{N}\longrightarrow0.
\end{aligned}
$$
元の $x_n$ の指数和は[Weyl判定](#thm-nda4-weyl-criterion)で0へ収束するので $y_n$ の指数和も0へ収束します。これは全非零 $\boldsymbol k$ で成立し、再度Weyl判定を使うと $y_n$ は一様分布します。
<!-- solution-end -->

**NDA4-B3（無理回転は何度でも訪れる）**  
$\alpha\notin\mathbb Q$、$0\le a<b\le1$ とする。$x_n=\{n\alpha\}$ が $[a,b)$ を無限回訪れることを、一様分布の定義から示してください。

- Level: B

<!-- solution-start -->
**詳細解答**

[無理回転の一様分布定理](#thm-nda4-irrational-rotation)より、
$$
\lim_{N\to\infty}\frac1N\#\{0\le n<N:x_n\in[a,b)\}=b-a>0.
$$
もし訪問回数が有限なら、その総数を $C$ と置けるので、すべての $N$ に対し訪問割合は $C/N$ 以下です。従って訪問割合は0へ収束し、正の極限 $b-a$ と矛盾します。よって訪問回数は無限です。「少なくとも一回」と「無限回」の違いは正の訪問頻度から導けます。
<!-- solution-end -->

**NDA4-B4（整数関係のある目標の可否）**  
$\boldsymbol\alpha=(\sqrt2,2\sqrt2)$ とする。$\boldsymbol\beta=(1/5,2/5)$ へは任意精度で同時近似できるが、$\boldsymbol\gamma=(1/5,1/2)$ へはできないことを示してください。

- Level: B

<!-- solution-start -->
**詳細解答**

[整数関係の定義](#def-nda4-integer-relation)により、整数ベクトル $\boldsymbol k=(k_1,k_2)$ に対して
$
\boldsymbol k\cdot\boldsymbol\alpha=(k_1+2k_2)\sqrt2.
$
$\sqrt2$ は無理数なので、この値が整数となるのは $k_1+2k_2=0$ のときだけです。従って整数関係は $\boldsymbol k=m(-2,1)$（$m\in\mathbb Z$）に限られます。$\boldsymbol\beta$ に対して
$$
\boldsymbol k\cdot\boldsymbol\beta
=m\left(-2\cdot\frac15+\frac25\right)=0\in\mathbb Z
$$
が全ての $m\in\mathbb Z$ で成り立つので、[Kroneckerの近似定理](#thm-nda4-kronecker)の十分条件を満たし、任意の $\varepsilon>0$ に対し $n\ge0$ が存在します。

一方 $\boldsymbol k=(-2,1)$ を $\boldsymbol\gamma$ に適用すると
$$
\boldsymbol k\cdot\boldsymbol\gamma
=-\frac25+\frac12=\frac1{10}\notin\mathbb Z.
$$
必要条件を満たさず、任意精度での同時近似は不可能です。座標ごとに近似可能なことだけでは、共通の $n$ は得られません。
<!-- solution-end -->

### Level C：分布・近似・時間平均を統合する

**NDA4-C1（二つの平方根の軌道）**  
$\boldsymbol\alpha=(\sqrt2,\sqrt3)$ とする。(i) $1,\sqrt2,\sqrt3$ が有理数体上一次独立であることを示し、(ii) 任意の $\boldsymbol\beta\in\mathbb T^2$ の任意の近傍へ $n\boldsymbol\alpha$ が入ることを証明してください。(iii) 次の極限を計算してください。
$$
\lim_{N\to\infty}\frac1N\sum_{n=0}^{N-1}
\cos^2(\pi n\sqrt2)\cos^2(\pi n\sqrt3).
$$

- Level: C

<!-- solution-start -->
**詳細解答**

(i) $m+k\sqrt2+\ell\sqrt3=0$（$m,k,\ell\in\mathbb Z$）と仮定します。$\ell\ne0$、$k\ne0$ かつ $m\ne0$ であれば
$$
2mk\sqrt2=3\ell^2-m^2-2k^2
$$
を得ます。これは $m+k\sqrt2=-\ell\sqrt3$ の両辺を二乗して整理した式です。右辺は整数なので $\sqrt2$ が有理数となり矛盾します。$m=0$ かつ $k\ell\ne0$ なら二乗して $2k^2=3\ell^2$ となります。この等式は、整数の平方数の素因数2の指数が偶数であることと矛盾します。$k=0$ または $\ell=0$ の場合、残りの根号が整数の有理倍になる等式は $\sqrt2,\sqrt3$ の無理性から係数が全て0でなければ成立しません。従って $m=k=\ell=0$ で一次独立です。

(ii) (i) から $\boldsymbol k\cdot\boldsymbol\alpha\notin\mathbb Z$ が全ての非零 $\boldsymbol k\in\mathbb Z^2$ で成立します。[有理独立の系](#cor-nda4-rational-independence)の1から3を適用すると、任意の $\boldsymbol\beta$ と $\varepsilon>0$ に対して
$$
\max\{\|n\sqrt2-\beta_1\|,\|n\sqrt3-\beta_2\|\}<\varepsilon
$$
となる整数 $n\ge0$ が存在します。

(iii) $\cos^2(\pi t)=(1+\cos2\pi t)/2$ なので、被積分関数に対応する周期関数を
$$
f(x,y)=\frac14(1+\cos2\pi x)(1+\cos2\pi y)
$$
と置きます。(i) と[有理独立の系](#cor-nda4-rational-independence)から $n\boldsymbol\alpha$ は $\mathbb T^2$ 上で一様分布します。[連続関数判定](#lem-nda4-continuous-tests)で、求める時間平均は $\int_0^1\int_0^1 f(x,y)\,dx\,dy$ です。積を展開し、$\int_0^1\cos2\pi t\,dt=0$ を二度使うと
$$
\begin{aligned}
\int_0^1\int_0^1f(x,y)\,dx\,dy
&=\frac14\left(\int_0^1(1+\cos2\pi x)\,dx\right)
\left(\int_0^1(1+\cos2\pi y)\,dy\right)\\
&=\frac14(1+0)(1+0)=\frac14.
\end{aligned}
$$
従って極限は $1/4$ です。
<!-- solution-end -->

## 8. まとめと後続

有理回転は有限軌道を持ち、無理回転は円周上で一様分布します。多次元では、整数関係が全くなければトーラス全体へ一様分布し、整数関係がある場合にも[Kroneckerの近似定理](#thm-nda4-kronecker)が到達可能な目標をちょうど記述します。中心となった道具は、連続関数の三角多項式近似と、整数関係によって消えない周波数の区別でした。

次のNDA5では「無限に多くの良い近似があるか」からさらに進み、誤差が分母の何乗で小さくなるかを表す無理性指数を扱います。一様分布や目標への近似可能性だけで、分母に対する最良の誤差指数まで決まるわけではありません。
