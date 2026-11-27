# MQFC32 分布のscaling degree

[二点時間順序核の非対角構成](../MQFC31/index.md#prop-mqfc31-two-point-order)では、二つの挿入点が一致しない領域で核を構成した。今度は二つの挿入点 $z_1,z_2$ の差座標 $x=z_1-z_2$ が原点に近づくとき、その核がどれほど強く特異になるかを測りたい。

普通の関数なら正の尺度 $\lambda$ で引数を変えた $f(\lambda x)$ を観察すればよい。例えば原点からのEuclid距離 $|x|$ の逆二乗は長さを半分にすると4倍になる。しかし一点で試験関数の値を読む[Dirac のデルタ超関数](../../../解析系/GPDE/GPDE1/index.md#def-gpde1-dirac)には通常の関数としての点値がない。そこで試験関数への作用を用いて、普通の関数にも分布にも共通する尺度を作る。

以下、$d\ge1$ は座標の個数を表す整数、$x=(x_1,\ldots,x_d)$、$U$ は $\mathbb R^d$ または $\mathbb R^d\setminus\{0\}$ とする。$|x|=(\sum_{j=1}^d x_j^2)^{1/2}$ は座標のEuclidノルムである。短距離の拡大縮小を測るための補助的なノルムで、時空計量を変更するものではない。時空の符号規約は $(-,+,+,+)$ とする。

## 1. 試験関数を縮めて分布を観測する

[テスト関数とテスト関数空間](../../../解析系/GPDE/GPDE1/index.md#def-gpde1-test-function)を $\mathcal D(U)=C_c^\infty(U)$ と書く。[超関数](../../../解析系/GPDE/GPDE1/index.md#def-gpde1-distribution)（以下では分布とも呼ぶ）$t$ はこの空間への連続線形作用で、その全体を $\mathcal D'(U)$、作用値を $\langle t,\varphi\rangle$ と書く。分布の等号は全試験関数への作用値の一致を意味する。本章では複素線形の作用を用い、試験関数を共役しない。

まず局所可積分（任意のコンパクト集合上で絶対値の積分が有限）な $f$ が定める[正則超関数](../../../解析系/GPDE/GPDE1/index.md#def-gpde1-regular-distribution)を考える。以後、関数とそれが定める分布を同じ記号 $f$ で表し、$d^dx$ は $d$ 次元の体積要素を表す。

$\lambda>0$ として、$f(\lambda x)$ の作用を積分で書く。積分変数を $y=\lambda x$ と変える。二つの候補領域 $U$ はこの写像と逆写像 $x=y/\lambda$ で保たれる。体積要素を換算するため、標準座標で $y_i=\lambda x_i$ を $x_j$ で偏微分する。$\lambda$ は固定する。

$$
\frac{\partial y_i}{\partial x_j}
=\begin{cases}
\lambda & (i=j),\\
0 & (i\ne j).
\end{cases}
$$

従ってJacobian行列は $\lambda I_d$（$I_d$ は $d$ 次単位行列）で、その行列式は対角成分の積 $\lambda^d>0$ である。変数変換の体積要素は $d^dy=\lambda^d d^dx$ となるから

$$
\int_U f(\lambda x)\varphi(x)\,d^dx
=\int_U f(y)\lambda^{-d}\varphi(y/\lambda)\,d^dy.
$$

右辺には $f$ の点値を読む操作がない。試験関数を変えて元の分布に入力する形なので、そのまま一般の分布へ広げられる。

<a id="def-mqfc32-dilation"></a>

<!-- formal-statement-start -->
> **定義（分布のスケール変換）**  
> $U=\mathbb R^d$ または $U=\mathbb R^d\setminus\{0\}$、$t\in\mathcal D'(U)$、$\lambda>0$ とする。分布のスケール変換 $t_\lambda$ は次式で定める。

$$
\langle t_\lambda,\varphi\rangle
=\langle t,\varphi_\lambda\rangle,\qquad
\varphi_\lambda(y)=\lambda^{-d}\varphi(y/\lambda).
$$

> ここで $\varphi\in\mathcal D(U)$ とする。
<!-- formal-statement-end -->

この操作が分布を与えることを確認する。$\varphi$ の台がコンパクト集合 $K\subset U$ に含まれるなら、$\varphi_\lambda$ の台は $\lambda K\subset U$ に含まれる。固定した正の $\lambda$ ではこれもコンパクトであり、合成関数は滑らかだから $\varphi_\lambda\in\mathcal D(U)$ である。[多重指数](../../../解析系/GPDE/GPDE2/index.md#def-gpde2-multi-index) $\alpha=(\alpha_1,\ldots,\alpha_d)\in\mathbb N_0^d$ は各座標の微分回数、$|\alpha|=\sum_j\alpha_j$ はその合計を表す。ここで $\partial_{y_j}$ は $y_j$ について他の座標と $\lambda$ を固定して微分する。$\partial_j$ は関数の第 $j$ 座標の偏微分を表す。連鎖律の一階分は

$$
\partial_{y_j}\varphi_\lambda(y)
=\lambda^{-d-1}(\partial_j\varphi)(y/\lambda).
$$

同じ操作を各座標に $\alpha_j$ 回繰り返すと

$$
\partial^\alpha\varphi_\lambda(y)
=\lambda^{-d-|\alpha|}(\partial^\alpha\varphi)(y/\lambda).
$$

従って[超関数の局所有限階評価](../../../解析系/GPDE/GPDE1/index.md#prop-gpde1-local-finite-order)を $\lambda K$ 上で適用できる。ある $C,m$ に対し

$$
|\langle t,\varphi_\lambda\rangle|
\le C\max_{|\alpha|\le m}\lambda^{-d-|\alpha|}
  \sup_K|\partial^\alpha\varphi|.
$$

固定した $\lambda$ では有限な定数

$$
C_\lambda=C\max_{0\le k\le m}\lambda^{-d-k}
$$

を取れば、右辺は $C_\lambda\max_{|\alpha|\le m}\sup_K|\partial^\alpha\varphi|$ で抑えられる。試験関数を縮める操作も $t$ も線形なので $t_\lambda$ は線形である。同じ局所有限階評価の逆向きを使えば連続性も従い、$t_\lambda$ は分布である。

<!-- definition-example-start: def-mqfc32-dilation -->
### 直接例：一点を読む分布

**定義の確認**。[Dirac のデルタ超関数](../../../解析系/GPDE/GPDE1/index.md#def-gpde1-dirac) $\delta$ を全空間で考える。任意の試験関数に対し

$$
\langle\delta_\lambda,\varphi\rangle
=\varphi_\lambda(0)=\lambda^{-d}\varphi(0).
$$

よって $\delta_\lambda=\lambda^{-d}\delta$ である。一方、定数関数 $1$ のスケール変換は $1$ のままである。実際、$y=\lambda x$ を代入すれば

$$
\int_U\lambda^{-d}\varphi(y/\lambda)\,d^dy
=\int_U\varphi(x)\,d^dx.
$$

両方とも全試験関数に対して定義式を確認できた。$\lambda^{-d}$ は積分の規格化に必要で、これを省くと定数関数まで $\lambda^d$ 倍されてしまう。
<!-- definition-example-end -->

## 2. どれだけの冪を掛ければ零になるか

短い距離を調べるには $\lambda\downarrow0$ とする。分布が $\lambda^{-2}$ 程度に増えるなら $\lambda^3$ を掛けると消えるが、$\lambda^2$ では消えないことがある。この境界を数値にする。

[超関数の収束](../../../解析系/GPDE/GPDE1/index.md#def-gpde1-distribution-convergence)と同じく、極限は固定した全試験関数への作用が収束することを意味する。

<a id="def-mqfc32-scaling-degree"></a>

<!-- formal-statement-start -->
> **定義（スケーリング次数）**  
> $U=\mathbb R^d$ または $U=\mathbb R^d\setminus\{0\}$、$t\in\mathcal D'(U)$ とする。原点でのスケーリング次数（scaling degree）を次で定める。

$$
\operatorname{sd}_U(t)=
\inf\{\omega\in\mathbb R:
\lambda^\omega t_\lambda\longrightarrow0
\text{ in }\mathcal D'(U)\}.
$$

> 極限は $\lambda\downarrow0$ で取り、すべての $\varphi\in\mathcal D(U)$ について作用値が零に近づくことを要求する。空集合の下限は $+\infty$、下に有界でない集合の下限は $-\infty$ とする。
<!-- formal-statement-end -->

一つの $\omega$ で極限が零なら、$\omega'>\omega$ でも $\lambda^{\omega'-\omega}\to0$ を掛けるので極限は零になる。このため、$s=\operatorname{sd}_U(t)$ とすると、実数 $\omega>s$ なら条件を満たす。実際、下限の性質から条件を満たす $\omega_0<\omega$ が存在する。一方、$\omega<s$ なら条件を満たさない。$s$ 自身で成立するかは別に調べる。零分布では全 $\omega$ が条件を満たすので $s=-\infty$ である。

<!-- definition-example-start: def-mqfc32-scaling-degree -->
### 直接例：原点を除いた平面の逆距離

**定義の確認**。$d=2$、$U=\mathbb R^2\setminus\{0\}$、$f(x)=|x|^{-1}$ とする。任意の試験関数について $f(\lambda x)=\lambda^{-1}f(x)$ なので

$$
\langle\lambda^\omega f_\lambda,\varphi\rangle
=\lambda^{\omega-1}\int_U |x|^{-1}\varphi(x)\,d^2x.
$$

台は原点から離れているため積分は有限である。$\omega>1$ なら全試験関数で零へ収束する。逆に、原点を含まない小球内の非負かつ非零の試験関数を取ると積分は正である。$\omega=1$ では一定の正値、$\omega<1$ では発散する。従って $\operatorname{sd}_U(f)=1$。
<!-- definition-example-end -->

## 3. 冪に従う分布とデルタ導関数

スケールを変えた分布が元の分布の定数倍になる場合には、その冪を直接読める。これを斉次性として整理する。

<a id="def-mqfc32-homogeneous"></a>

<!-- formal-statement-start -->
> **定義（斉次分布）**  
> $U=\mathbb R^d$ または $U=\mathbb R^d\setminus\{0\}$、$t\in\mathcal D'(U)$、$h\in\mathbb R$ とする。すべての $\lambda>0$ で

$$
t_\lambda=\lambda^h t
$$

> が成り立つとき $t$ は次数 $h$ の斉次分布である。
<!-- formal-statement-end -->

<!-- definition-example-start: def-mqfc32-homogeneous -->
**定義の確認**。$U=\mathbb R^d$ 上の関数 $x_1^2$ は局所可積分であり分布を定める。すべての $\lambda>0$ について $(\lambda x_1)^2=\lambda^2x_1^2$ だから、変数変換で全試験関数に対して

$$
\langle (x_1^2)_\lambda,\varphi\rangle
=\lambda^2\int_{\mathbb R^d}x_1^2\varphi(x)\,d^dx.
$$

従って斉次次数は2である。
<!-- definition-example-end -->

<a id="thm-mqfc32-homogeneous-degree"></a>

<!-- formal-statement-start -->
> **定理（斉次分布のスケーリング次数）**  
> $U=\mathbb R^d$ または $U=\mathbb R^d\setminus\{0\}$ とする。次数 $h\in\mathbb R$ の斉次分布 $t$ が零分布でないなら、

$$
\operatorname{sd}_U(t)=-h
$$

> を満たす。
<!-- formal-statement-end -->

### 証明の見取り図

斉次性を代入すると、極限を決めるのは $\lambda^{\omega+h}$ だけになる。零でない分布には作用値が零でない試験関数があるので、上からの評価だけでなく下からの判定もできる。

<!-- proof-start -->
### 証明

[斉次分布](#def-mqfc32-homogeneous)の条件から任意の $\varphi$ について

$$
\lambda^\omega\langle t_\lambda,\varphi\rangle
=\lambda^{\omega+h}\langle t,\varphi\rangle.
$$

$\omega+h>0$ なら全試験関数で零へ収束する。$t\ne0$ なので、ある $\varphi_0$ に対し $c=\langle t,\varphi_0\rangle\ne0$ である。$\omega+h=0$ のとき作用値は $c$、$\omega+h<0$ のとき絶対値は $|c|\lambda^{\omega+h}\to\infty$ となる。

従って[スケーリング次数](#def-mqfc32-scaling-degree)を定める実数の集合は $(-h,\infty)$ であり、下限は $-h$ である。
<!-- proof-end -->

例えば $|x|^{-p}$ は原点を除く全空間上で任意の実数 $p$ に対して斉次次数 $-p$ の非零分布であるから、[斉次分布のスケーリング次数](#thm-mqfc32-homogeneous-degree)によりスケーリング次数は $p$ である。全空間で同じ積分を使えるかは、別に原点付近の可積分性を調べなければならない。

点に集中する分布についても、試験関数への微分を計算すれば冪が読める。[超関数の微分](../../../解析系/GPDE/GPDE2/index.md#def-gpde2-distributional-derivative)は、試験関数に微分を移し、微分回数ごとに符号を反転させる操作である。

<a id="prop-mqfc32-delta-degree"></a>

<!-- formal-statement-start -->
> **命題（デルタ導関数のスケーリング次数）**  
> $d\ge1$、$\alpha\in\mathbb N_0^d$ とし、全空間 $\mathbb R^d$ 上のデルタ分布を $\delta$ とする。その分布微分 $\partial^\alpha\delta$ は次数 $-d-|\alpha|$ の斉次分布であり、

$$
\operatorname{sd}_{\mathbb R^d}(\partial^\alpha\delta)
=d+|\alpha|
$$

> が成り立つ。
<!-- formal-statement-end -->

### 証明の見取り図

一点を読むと $\lambda^{-d}$ が生じる。試験関数を一階微分するごとに引数 $y/\lambda$ からさらに $\lambda^{-1}$ が生じる。

<!-- proof-start -->
### 証明

[超関数の微分](../../../解析系/GPDE/GPDE2/index.md#def-gpde2-distributional-derivative)と[分布のスケール変換](#def-mqfc32-dilation)から

$$
\begin{aligned}
\langle(\partial^\alpha\delta)_\lambda,\varphi\rangle
&=(-1)^{|\alpha|}(\partial^\alpha\varphi_\lambda)(0)\\
&=\lambda^{-d-|\alpha|}(-1)^{|\alpha|}
  (\partial^\alpha\varphi)(0)\\
&=\lambda^{-d-|\alpha|}\langle\partial^\alpha\delta,\varphi\rangle.
\end{aligned}
$$

非零性も必要である。原点近傍で1となる滑らかなコンパクト台関数 $\chi$ を選ぶ。例えば[テスト関数の構成例](../../../解析系/GPDE/GPDE1/index.md#def-gpde1-test-function) の滑らかな関数（正の引数 $q$ で $e^{-1/q}$、それ以外で0）をここでは $\eta(q)$ と書き、

$$
\chi(x)=\frac{\eta(4-|x|^2)}{\eta(4-|x|^2)+\eta(|x|^2-1)}.
$$

とする。分母の二つの引数の和は3なので少なくとも一方が正であり、分母は常に正である。従って $\chi$ は滑らかで、$|x|\le1$ で1、$|x|\ge2$ で0となる。この $\chi$ に対し、$\varphi(x)=x^\alpha\chi(x)$ とする。ただし $x^\alpha=\prod_j x_j^{\alpha_j}$ である。原点近傍では $\chi=1$ なので、そこで $\varphi=x^\alpha$ である。各座標を $\alpha_j$ 回微分すると $x_j^{\alpha_j}$ が $\alpha_j!$ になる。従って

$$
\langle\partial^\alpha\delta,\varphi\rangle
=(-1)^{|\alpha|}\prod_{j=1}^d\alpha_j!\ne0.
$$

[斉次分布のスケーリング次数](#thm-mqfc32-homogeneous-degree)を $h=-d-|\alpha|$ に適用すると結論を得る。
<!-- proof-end -->

四次元なら $\delta$ の次数は4、一階導関数は5、二階導関数は6である。原点を除いた領域に制限するとこれらの分布はすべて零になる。この差が、後に局所反項を分類するときに重要になる。

## 4. 和、微分、座標の積で次数はどう変わるか

核の正確な斉次性がなくても、演算ごとの上界があれば特異性を追跡できる。座標を掛ける操作は

$$
\langle x_jt,\varphi\rangle=\langle t,x_j\varphi\rangle
$$

で定める。積の台は元の試験関数の台に含まれる。多重指数 $\alpha$ に対し、$e_j$ を第 $j$ 成分だけが1の多重指数とすると、積の微分は

$$
\partial^\alpha(x_j\varphi)
=x_j\partial^\alpha\varphi+\alpha_j\partial^{\alpha-e_j}\varphi
$$

となる（$\alpha_j=0$ では第二項を省く）。固定コンパクト集合上では $|x_j|$ が有界なので、右辺は試験関数の $|\alpha|$ 階までの微分で抑えられる。この評価を [超関数の局所有限階評価](../../../解析系/GPDE/GPDE1/index.md#prop-gpde1-local-finite-order)に代入すれば、$x_jt$ も分布である。

<a id="prop-mqfc32-degree-rules"></a>

<!-- formal-statement-start -->
> **命題（スケーリング次数の演算則）**  
> $U=\mathbb R^d$ または $U=\mathbb R^d\setminus\{0\}$ とし、$t,u\in\mathcal D'(U)$ のスケーリング次数を有限実数 $s_t,s_u$ とする。$j\in\{1,\dots,d\}$ および $\alpha\in\mathbb N_0^d$ に対して、

$$
\begin{aligned}
\operatorname{sd}_U(t+u)&\le\max(s_t,s_u),\\
\operatorname{sd}_U(\partial^\alpha t)&\le s_t+|\alpha|,\\
\operatorname{sd}_U(x_jt)&\le s_t-1.
\end{aligned}
$$

> また $s_t\ne s_u$ なら第一の不等式は等号になる。
<!-- formal-statement-end -->

### 証明の見取り図

微分は試験関数側に移すと長さの逆数を一つ生み、座標の積は長さを一つ生む。和では最大の次数が上界になる。同次数同士では打ち消しが起き得る。

<!-- proof-start -->
### 証明

和について $\omega>\max(s_t,s_u)$ を選ぶ。[スケーリング次数](#def-mqfc32-scaling-degree)の下限の性質から、それぞれ $\lambda^\omega t_\lambda$ と $\lambda^\omega u_\lambda$ は零へ収束する。線形性により和も零へ収束する。

$s_t>s_u$ と仮定し、もし $\operatorname{sd}_U(t+u)<s_t$ なら

$$
\max(\operatorname{sd}_U(t+u),s_u)<\omega<s_t
$$

を満たす実数を選べる。すると $\lambda^\omega(t+u)_\lambda$ と $\lambda^\omega u_\lambda$ が零へ収束し、その差 $\lambda^\omega t_\lambda$ も零へ収束する。これは $\omega<s_t$ に矛盾する。$s_u>s_t$ の場合は $u=(t+u)-t$ として同じ論理を適用する。

微分については[超関数の微分](../../../解析系/GPDE/GPDE2/index.md#def-gpde2-distributional-derivative)の符号を保ったまま計算する。

$$
\begin{aligned}
\langle(\partial^\alpha t)_\lambda,\varphi\rangle
&=(-1)^{|\alpha|}\langle t,\partial^\alpha\varphi_\lambda\rangle\\
&=\lambda^{-|\alpha|}(-1)^{|\alpha|}
   \langle t,(\partial^\alpha\varphi)_\lambda\rangle\\
&=\lambda^{-|\alpha|}\langle\partial^\alpha t_\lambda,\varphi\rangle.
\end{aligned}
$$

$\omega>s_t+|\alpha|$ とすれば、$\omega-|\alpha|>s_t$ である。固定試験関数 $\partial^\alpha\varphi$ への作用が零へ収束するので、微分の上界を得る。

座標の積について、$(x_j\varphi)_\lambda(y)=\lambda^{-d}(y_j/\lambda)\varphi(y/\lambda)$ である。よって

$$
\begin{aligned}
\langle(x_jt)_\lambda,\varphi\rangle
&=\langle t,y_j\varphi_\lambda(y)\rangle\\
&=\lambda\langle t,(x_j\varphi)_\lambda\rangle\\
&=\lambda\langle t_\lambda,x_j\varphi\rangle.
\end{aligned}
$$

$\omega>s_t-1$ なら $\omega+1>s_t$。固定試験関数 $x_j\varphi$ への作用に下限の性質を適用すれば、座標の積の上界が従う。
<!-- proof-end -->

等号とは限らない。例えば定数分布 $1$ の一階微分は [古典微分との一致](../../../解析系/GPDE/GPDE2/index.md#prop-gpde2-classical-compatible) により零である。また $x_j\delta=0$ である。実際、任意の試験関数について $\langle x_j\delta,\varphi\rangle=0\cdot\varphi(0)=0$ だから、上界 $d-1$ に対し実際の次数は $-\infty$ となる。

## 5. 対数と短距離・長距離の区別

原点を除く領域で $f(x)=\log|x|$ とすると

$$
f(\lambda x)=\log\lambda+\log|x|.
$$

任意の試験関数への作用は $A\log\lambda+B$ となる。ただし

$$
A=\int_U\varphi(x)\,d^dx,\qquad
B=\int_U\log|x|\varphi(x)\,d^dx
$$

である。$\omega>0$ なら $v=-\log\lambda\to\infty$ と置いて

$$
\lambda^\omega|\log\lambda|=ve^{-\omega v}\to0.
$$

従って全試験関数で条件を満たす。$\int_U\varphi>0$ の試験関数では $\omega=0$ で作用値が発散する。$\omega<0$ でもその絶対値は発散する。従って[スケーリング次数](#def-mqfc32-scaling-degree)は0であり、定数と同じである。しかし定数は原点で有界、対数は原点で非有界である。次数は特異性の冪を測る尺度であって、対数因子まで識別するものではない。

端点が許される例もある。$d=1$ の原点を除いた領域で

$$
g(x)=\frac{1}{1+(\log|x|)^2}
$$

とする。任意の固定試験関数の台 $K$ で $|\log|x||\le M$ が成立する。$v=-\log\lambda>M$ なら

$$
0<g(\lambda x)\le\frac{1}{1+(v-M)^2}.
$$

この上界に $\int_U|\varphi(x)|\,dx$ を掛けると作用値の絶対値も零へ収束する。従って $\omega=0$ で極限は零である。一方、非負で積分が正の試験関数では

$$
\int_U g(\lambda x)\varphi(x)\,dx
\ge\frac{\int_U\varphi(x)\,dx}{1+(v+M)^2}.
$$

$\omega<0$ の場合、$\lambda^\omega=e^{|\omega|v}$ がこの多項式の分母より速く増えるので零に収束しない。従って次数は0だが、この例では端点0も条件を満たす。

短距離を紫外（UV）、長距離を赤外（IR）と呼ぶ。本章の定義では $\lambda\downarrow0$ だけを調べる。例えば一次元で $f_1(x)=1$ と $f_2(x)=(1+x^2)^{-1}$ はともに $f_i(\lambda x)\to1$ が各固定コンパクト集合で一様に成立する。固定試験関数に対して一様収束の誤差に $\int|\varphi|$ を掛ければ、分布としても作用値は $\int\varphi$ に収束する。$\omega>0$ では $\lambda^\omega$ を掛けると零になり、$\int\varphi>0$ の試験関数では $\omega\le0$ で零にならない。従って[スケーリング次数](#def-mqfc32-scaling-degree)はともに0である。一方、全実数上の積分は $f_1$ が無限大、$f_2$ は

$$
\int_{\mathbb R}\frac{dx}{1+x^2}
=[\arctan x]_{-\infty}^{\infty}=\pi
$$

である。同じ紫外次数から赤外の可積分性を推論することはできない。

## 6. 次元と比較する理由

$d$ 次元で $p\in\mathbb R$ とし、原点を除いた核 $|x|^{-p}$ を考える。[斉次分布のスケーリング次数](#thm-mqfc32-homogeneous-degree)は $p$ を与える。

ここでは原点を囲む積分を調べる。極座標 $x=r\theta$（$r=|x|>0$、$|\theta|=1$）では動径方向の体積要素が $r^{d-1}dr$ となる。単位球面の面積を $\sigma_{d-1}>0$ と書けば、$0<\varepsilon<1$ について

$$
\int_{\varepsilon<|x|<1}|x|^{-p}\,d^dx
=\sigma_{d-1}\int_\varepsilon^1 r^{d-1-p}\,dr.
$$

$p\ne d$ と $p=d$ では原始関数が異なるので、

$$
\sigma_{d-1}\int_\varepsilon^1 r^{d-1-p}\,dr
=\begin{cases}
\sigma_{d-1}\dfrac{1-\varepsilon^{d-p}}{d-p} & (p\ne d),\\
\sigma_{d-1}\log(1/\varepsilon) & (p=d).
\end{cases}
$$

となる。従って $p<d$ なら局所可積分であり、[局所可積分関数が定める超関数](../../../解析系/GPDE/GPDE1/index.md#prop-gpde1-l1loc-distribution)として全空間へ広げられる。$p=d$ では対数的に、$p>d$ では冪として発散する。

四次元では $|x|^{-2}$ は原点近くで可積分だが、普通の関数として二乗した $|x|^{-4}$ は可積分ではない。この模型が示すのは、非対角で核の積が定義できても、そのまま原点を含む積分へ持ち込めない場合があるということである。

局所可積分性が失われても分布として延長できないとは限らない。次講では試験関数の原点近傍でのTaylor展開を利用して延長を構成する。今回のスケーリング次数は、どの程度の引き去りが必要かを見積もるための出発点になる。

## 7. 演習

### 演習 MQFC32-A1：Jacobianと規格化
- Level: A

$d=3$ の全空間で $f(x)=x_2$ とする。試験関数の変数変換を用いて $f_\lambda$ と次数を求めよ。

<!-- solution-start -->
**詳細解答**

[分布のスケール変換](#def-mqfc32-dilation)を用いると

$$
\langle f_\lambda,\varphi\rangle
=\int y_2\lambda^{-3}\varphi(y/\lambda)\,d^3y.
$$

$y=\lambda x$ では $d^3y=\lambda^3d^3x$、$y_2=\lambda x_2$ となるので、右辺は $\lambda\int x_2\varphi(x)\,d^3x$。よって $f_\lambda=\lambda f$ である。$x_2>0$ の領域の非負非零試験関数への積分が正なので $f\ne0$。[斉次分布のスケーリング次数](#thm-mqfc32-homogeneous-degree)に $h=1$ を代入し、次数は $-1$ となる。
<!-- solution-end -->

### 演習 MQFC32-A2：原点を除く冪核
- Level: A

$d=3$、$U=\mathbb R^3\setminus\{0\}$ 上で $f(x)=|x|^{-5/2}$ の次数を求めよ。また原点を含む単位球での積分が有限かを判定せよ。

<!-- solution-start -->
**詳細解答**

$f(\lambda x)=\lambda^{-5/2}f(x)$ であり、非負非零試験関数への作用は正である。[斉次分布のスケーリング次数](#thm-mqfc32-homogeneous-degree)により次数は $5/2$。

原点を半径 $\varepsilon$ だけ除けば、球面の面積 $4\pi$ と動径のJacobian $r^2$ を使って

$$
\int_{\varepsilon<|x|<1}|x|^{-5/2}\,d^3x
=4\pi\int_\varepsilon^1 r^{-1/2}\,dr
=8\pi(1-\sqrt\varepsilon).
$$

$\varepsilon\downarrow0$ で $8\pi$ に収束する。従って原点付近でも可積分である。
<!-- solution-end -->

### 演習 MQFC32-A3：デルタ導関数
- Level: A

全空間 $\mathbb R^4$ で $t=\partial_1^2\partial_3\delta$ とする。試験関数への作用と $t_\lambda$、次数を求めよ。

<!-- solution-start -->
**詳細解答**

[超関数の微分](../../../解析系/GPDE/GPDE2/index.md#def-gpde2-distributional-derivative)において $\alpha=(2,0,1,0)$ だから $|\alpha|=3$。

$$
\langle t,\varphi\rangle=-\partial_1^2\partial_3\varphi(0).
$$

試験関数の規格化は $\lambda^{-4}$、三階微分は追加で $\lambda^{-3}$ を生む。従って

$$
\langle t_\lambda,\varphi\rangle
=-\lambda^{-7}\partial_1^2\partial_3\varphi(0)
=\lambda^{-7}\langle t,\varphi\rangle.
$$

原点付近で $x_1^2x_3$ に等しい試験関数では作用値が $-2$ なので非零である。[斉次分布のスケーリング次数](#thm-mqfc32-homogeneous-degree)から次数は7。
<!-- solution-end -->

### 演習 MQFC32-A4：対数の二乗
- Level: A

$U=\mathbb R\setminus\{0\}$ で $f(x)=(\log|x|)^2$ とする。次数を求め、端点で極限が零になるか判定せよ。

<!-- solution-start -->
**詳細解答**

$(\log|\lambda x|)^2=(\log\lambda)^2+2\log\lambda\log|x|+(\log|x|)^2$ である。固定試験関数の台は原点から離れているので各項の積分は有限である。$v=-\log\lambda$ と置くと作用は $Av^2-2Bv+C$ となる。ただし、すべての積分は $U$ 上で取り、

$$
\begin{aligned}
A&=\int_U\varphi(x)\,dx,\\
B&=\int_U\log|x|\varphi(x)\,dx,\\
C&=\int_U(\log|x|)^2\varphi(x)\,dx.
\end{aligned}
$$

$\omega>0$ では $v^2e^{-\omega v}\to0$ なので全試験関数への作用が零へ収束する。$A>0$ の試験関数では作用が $Av^2$ を最高次項として増える。$\omega=0$ では発散し、$\omega<0$ でも発散する。[スケーリング次数](#def-mqfc32-scaling-degree)は0で、端点は条件を満たさない。
<!-- solution-end -->

### 演習 MQFC32-B1：異なる次数の和と打ち消し
- Level: B

$U=\mathbb R^2\setminus\{0\}$ で $t=|x|^{-1}$、$u=|x|^{-2}$ とする。$t+u$ と $(t+u)-u$ の次数を求め、同次数の和では最大値が常に得られるか答えよ。

<!-- solution-start -->
**詳細解答**

[斉次分布のスケーリング次数](#thm-mqfc32-homogeneous-degree)から $s_t=1$、$s_u=2$ である。$t+u$ については [スケーリング次数の演算則](#prop-mqfc32-degree-rules) の異なる次数の場合の等号を適用し、次数2を得る。

直接には

$$
\lambda^\omega(t+u)_\lambda
=\lambda^{\omega-1}t+\lambda^{\omega-2}u.
$$

$\omega>2$ で両項は零へ収束する。$\omega\le2$ では非負非零試験関数への $u$ の作用が正で、$t$ も非負だから相殺されない。

次に $(t+u)-u=t$ なので次数は1。足す二項 $t+u$ と $-u$ はいずれも次数2だが、和の次数は1になる。同次数なら最大値は上界にとどまる。
<!-- solution-end -->

### 演習 MQFC32-B2：座標とデルタ微分
- Level: B

全空間 $\mathbb R^d$ で $j,k\in\{1,\ldots,d\}$ に対して $x_j\partial_k\delta=-\delta_{jk}\delta$ を示せ。ここで $\delta_{jk}$ は $j=k$ のとき1、それ以外で0とする。両場合で次数を求めよ。

<!-- solution-start -->
**詳細解答**

座標の積は試験関数 $x_j\varphi$ への作用として読む。この試験関数に対して[超関数の微分](../../../解析系/GPDE/GPDE2/index.md#def-gpde2-distributional-derivative)を適用する。従って

$$
\begin{aligned}
\langle x_j\partial_k\delta,\varphi\rangle
&=-\partial_k(x_j\varphi)(0)\\
&=-\delta_{jk}\varphi(0)-0\cdot\partial_k\varphi(0).
\end{aligned}
$$

よって全試験関数への作用は $-\delta_{jk}\delta$ と一致する。$j=k$ なら [デルタ導関数のスケーリング次数](#prop-mqfc32-delta-degree) の $\alpha=0$ より次数 $d$。$j\ne k$ なら零分布なので $-\infty$ となる。

[スケーリング次数の演算則](#prop-mqfc32-degree-rules)の上界は $(d+1)-1=d$ である。前者は等号、後者は真の不等号になる。
<!-- solution-end -->

### 演習 MQFC32-B3：赤外だけを変える
- Level: B

一次元で $f(x)=(1+x^2)^{-1}$、$g(x)=1+x^2$ を全空間上の分布とみなす。原点での次数と、区間 $[-R,R]$ の積分の $R\to\infty$ における挙動を比較せよ。

<!-- solution-start -->
**詳細解答**

任意の固定試験関数の台を $[-M,M]$ に含めると

$$
|f(\lambda x)-1|\le\lambda^2M^2,\qquad
|g(\lambda x)-1|\le\lambda^2M^2.
$$

これらを $|\varphi|$ と掛けて積分すれば、両方のスケール変換の作用が $\int\varphi$ に近づく。$\omega>0$ なら零へ収束し、$\int\varphi>0$ の試験関数では $\omega=0$ で正値へ収束、$\omega<0$ で絶対値が発散する。[スケーリング次数](#def-mqfc32-scaling-degree)は両方0である。

一方、

$$
\int_{-R}^R f(x)\,dx=2\arctan R\to\pi,
$$

$$
\int_{-R}^R g(x)\,dx=2R+\frac{2R^3}{3}\to\infty.
$$

短距離の次数が同じでも長距離の挙動は異なる。
<!-- solution-end -->

### 演習 MQFC32-C1：非対角の核と局所項
- Level: C

$d=4$ で $U=\mathbb R^4\setminus\{0\}$、$f(x)=|x|^{-2}$ とする。$f$ と普通の関数としての二乗 $f^2$ の次数を求め、それぞれの原点付近の積分を比較せよ。

さらに、$f^2$ の全空間への延長 $T$ が存在し次数4を持つと仮定する。延長とは、$U$ に台を持つ試験関数（全空間に零延長して用いる）への作用が $f^2$ と一致する分布をいう。$T+c\delta$ と $T+b\partial_1\delta$ の次数を調べよ。ただし $b,c$ は非零複素数とする。非対角上の制限は変わるか。

<!-- solution-start -->
**詳細解答**

$f$ と $f^2$ は原点を除いた領域でそれぞれ斉次次数 $-2,-4$ を持つ。非零だから[斉次分布のスケーリング次数](#thm-mqfc32-homogeneous-degree)により次数は2と4。

四次元単位球面の面積を $\sigma_3$ とすると、動径の積分で

$$
\int_{\varepsilon<|x|<1}|x|^{-2}\,d^4x
=\sigma_3\frac{1-\varepsilon^2}{2},
$$

$$
\int_{\varepsilon<|x|<1}|x|^{-4}\,d^4x
=\sigma_3\log(1/\varepsilon).
$$

前者は有限値に収束するが後者は発散する。後者に対して延長が存在すること自体は、この積分から結論していない。

仮定された全空間上の $T$ に対し、[デルタ導関数のスケーリング次数](#prop-mqfc32-delta-degree)から $c\delta$ は次数4、$b\partial_1\delta$ は次数5である。非零定数倍は作用に定数を掛けるだけなので次数を変えない。

[スケーリング次数の演算則](#prop-mqfc32-degree-rules)の和の上界から $\operatorname{sd}_{\mathbb R^4}(T+c\delta)\le4$。反対に、もしこの次数が4より小さければ、ある $\omega<4$ で $\lambda^\omega(T+c\delta)_\lambda$ が零に収束する。しかし原点から離れた台を持つ非負非零試験関数 $\varphi$ を全空間へ零で延長して用いる。任意の $\lambda>0$ で $\varphi_\lambda$ の台も原点から離れ、$\varphi_\lambda(0)=0$ である。[分布のスケール変換](#def-mqfc32-dilation)と延長の仮定から

$$
\begin{aligned}
\langle(T+c\delta)_\lambda,\varphi\rangle
&=\langle T,\varphi_\lambda\rangle+c\varphi_\lambda(0)\\
&=\int_U |y|^{-4}\lambda^{-4}\varphi(y/\lambda)\,d^4y\\
&=\lambda^{-4}\int_U |x|^{-4}\varphi(x)\,d^4x.
\end{aligned}
$$

積分は正であり、$\lambda^\omega$ を掛けても零に収束しない。従って次数は4である。

一方 $T+b\partial_1\delta$ は異なる次数4と5の和だから、[スケーリング次数の演算則](#prop-mqfc32-degree-rules)の等号の場合により次数5となる。原点から離れた試験関数は原点で値と全階微分が零なので、どちらの局所項を加えても非対角での制限は $f^2$ のままである。しかし次数を4に保つという要求は、一階デルタ導関数の追加を排除する。
<!-- solution-end -->

## 8. 次の講義

次は原点を除く分布を全空間へ延長する。今回求めた次数と空間次元の差を使い、試験関数のどのTaylor係数を引く必要があるかを考える。

## 9. 直接前提講座

- [MQFC31](../MQFC31/index.md)
- [GPDE1](../../../解析系/GPDE/GPDE1/index.md)
- [GPDE2](../../../解析系/GPDE/GPDE2/index.md)
