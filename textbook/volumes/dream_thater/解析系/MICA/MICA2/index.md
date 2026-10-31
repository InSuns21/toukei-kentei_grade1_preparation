# MICA2 錐領域での減衰

[前講の局所Fourier判定](../MICA1/index.md#thm-mica1-local-smooth)は、ある点の近くで滑らかかどうかを、切り出した超関数のFourier変換が**全方向**で急減少するかによって判定しました。しかし、例えば平面で直線 $x_1=0$ に集中した超関数は、直線に沿う周波数方向と直線を横切る周波数方向とで、まったく異なる振る舞いをします。

この違いを表すには、周波数の大きさだけでなく、その**向き**を固定して無限遠へ進む必要があります。さらに、位置を切り出すcutoffを小さくしたあとも方向別の減衰が残ることを、証明しなければなりません。この講義ではその二つを行います。次の MICA3 で、減衰しない位置と方向の組を一つの集合へまとめます。

$n\ge1$、$u\in\mathcal D'(\mathbb R^n)$ とします。空間変数 $x$、周波数変数 $\xi$ はそれぞれ $\mathbb R^n$ に属し、内積と長さはEuclidのものを使います。Fourier変換は[前講の局所Fourier変換](../MICA1/index.md#def-mica1-local-fourier)と同じく

$$
\widehat{\chi u}(\xi)=\langle u,\chi(x)e^{-ix\cdot\xi}\rangle
$$

とします。ここで $\chi\in C_c^\infty(\mathbb R^n)$ です。$\xi\ne0$ のとき、その向きは単位ベクトル $\xi/|\xi|$ で表せます。大きさを変えても同じ向きと見なすことが、この後の錐の定義の出発点です。

## 1. 大きさではなく向きを指定する

$\mathbb R^2$ の周波数平面で、$\xi_2$ 軸の上向きに近い方向を考えます。例えば $\xi_2>2|\xi_1|$ という領域は、原点を除いた上向きの角度範囲を表します。$\xi$ を正の数倍してもこの不等式は変わりません。そのため、固定した有限幅の帯ではなく、原点から外へ無限に伸びる領域になります。

一般に $S^{n-1}:=\{\omega\in\mathbb R^n:|\omega|=1\}$ を単位球面とします。$n=1$ では $S^0=\{-1,1\}$ です。方向 $\xi_0\ne0$ の周りに、少し幅を持たせた開いた方向の集合を用います。

<a id="def-mica2-open-cone"></a>

<!-- formal-statement-start -->
> **定義（開錐と錐近傍）**
> $\Gamma\subset\mathbb R^n\setminus\{0\}$ が**開錐**であるとは、$\mathbb R^n\setminus\{0\}$ で開集合であり、任意の $\xi\in\Gamma$ と $t>0$ に対して $t\xi\in\Gamma$ が成り立つことをいう。$\xi_0\ne0$ が $\Gamma$ に属するとき、$\Gamma$ を $\xi_0$ の開錐近傍という。
>
> 二つの開錐 $\Gamma',\Gamma$ について、$\Gamma'$ が $\Gamma$ の内側に**角度の余裕を持って収まる**とは、単位球面内で次が成り立つことをいう。

$$
\overline{\Gamma'\cap S^{n-1}}\ \subset\ \Gamma\cap S^{n-1}.
$$

> 上の閉包は $S^{n-1}$ 内で取る。特に、$\Gamma'$ の境界方向が $\Gamma$ の外に達しないことを要求している。
<!-- formal-statement-end -->

どの開錐にも原点は入りません。$t>0$ のみを使うので、$\xi$ と $-\xi$ は同じ向きではありません。角度の余裕という最後の条件は、cutoffを変えるときの誤差を吸収するために使います。

<!-- definition-example-start: def-mica2-open-cone -->
### 直接例：上向きの開錐を二段階で選ぶ

**定義の確認**。$n=2$ で

$$
\Gamma=\{(\xi_1,\xi_2):\xi_2>|\xi_1|\},\qquad
\Gamma'=\{(\xi_1,\xi_2):\xi_2>2|\xi_1|\}
$$

とします。どちらも連続関数 $\xi_2-c|\xi_1|$ が正となる集合で開いており、$t>0$ を掛けても不等式の両辺が $t$ 倍されるので錐です。$\xi_2>0$ が従うため原点を含みません。

$\Gamma'\cap S^1$ の閉包では $\omega_2\ge2|\omega_1|$、$|\omega|=1$ です。$\omega_1=0$ なら $\omega_2=1>0$、$\omega_1\ne0$ なら $\omega_2\ge2|\omega_1|>|\omega_1|$ です。従ってすべての閉包方向が $\Gamma$ に入り、角度の余裕が確かめられます。
<!-- definition-example-end -->

任意の $\xi_0\ne0$ の周りにも開錐近傍を作れます。$\omega_0=\xi_0/|\xi_0|$ とし、$0<\varepsilon<1$ に対して

$$
\Gamma_\varepsilon(\omega_0)
=\{\xi\ne0:\xi\cdot\omega_0>(1-\varepsilon)|\xi|\}
$$

とすれば、$\xi_0\in\Gamma_\varepsilon(\omega_0)$ です。内積と長さの連続性から開いており、両辺が正の拡大で同じ倍率になるので錐です。$0<\varepsilon'<\varepsilon$ とすれば、その小さい錐の球面上の閉包は大きい錐の内側に入ります。以後、ある方向の錐を狭めるときには、このように角度の余裕を残して選びます。

## 2. 錐の中だけで急減少する

[全方向での急減少](../MICA1/index.md#def-mica1-rapid-decay)は、$|\xi|\to\infty$ の進み方を問わず同じ次数の評価を要求しました。ここでは周波数を一つの開錐に限ります。重要なのは、次数 $N$ ごとの定数 $C_N$ が、錐の中のすべての $\xi$ に対して共通であることです。

<a id="def-mica2-conic-rapid"></a>

<!-- formal-statement-start -->
> **定義（開錐における急減少）**
> $\Gamma\subset\mathbb R^n\setminus\{0\}$ を開錐、$F:\mathbb R^n\to\mathbb C$ を関数とする。$F$ が $\Gamma$ 上で**急減少する**とは、各整数 $N\ge0$ に対して定数 $C_N<\infty$ が存在し、すべての $\xi\in\Gamma$ について

$$
|F(\xi)|\le C_N(1+|\xi|)^{-N}
$$

> が成立することをいう。$\Gamma$ の外で同じ評価が成立することは要求しない。
<!-- formal-statement-end -->

<!-- definition-example-start: def-mica2-conic-rapid -->
### 直接例：一つの軸では減衰し、別の軸ではしない

**定義の確認**。$b\in C_c^\infty(\mathbb R)$ を $b\ge0$、$b=1$ が原点の近傍で成り立つように選び、$F(\xi_1,\xi_2)=\widehat b(\xi_2)$ とします。[滑らかなコンパクト支持関数のFourier急減少](../MICA1/index.md#thm-mica1-smooth-rapid)により、各 $N$ に対して

$$
|F(\xi_1,\xi_2)|\le B_N(1+|\xi_2|)^{-N}.
$$

上向きの錐 $\Gamma=\{\xi_2>2|\xi_1|\}$ では $|\xi|^2=\xi_1^2+\xi_2^2<(5/4)\xi_2^2$ なので $|\xi_2|>2|\xi|/\sqrt5$ です。従って

$$
|F(\xi)|\le B_N(\sqrt5/2)^N(1+|\xi|)^{-N}
$$

と評価できます（$2/\sqrt5<1$ を用いた）。一方、横向きの半直線 $\xi=(r,0)$、$r>0$ では

$$
F(r,0)=\widehat b(0)=\int_\mathbb R b(x)\,dx>0.
$$

もし右向きの開錐で急減少すれば、この半直線上でも $N=1$ の評価が必要となり矛盾します。全方向の判定と方向別の判定が異なる具体例です。
<!-- definition-example-end -->

この $F$ は単なる人工的な関数ではありません。平面の $x_1=0$ に集中し、$x_2$ 方向には滑らかに変化する超関数のFourier変換として現れます。第4節で分布から直接導きます。

## 3. cutoffを縮めても方向別の評価は残るか

位置の局所化では、もとのcutoff $\chi$ が $1$ である領域の内側に新しいcutoff $\psi$ の台を収めます。すると $\psi u=\psi(\chi u)$ です。しかし、$\chi u$ が**全方向**で滑らかな場合とは違い、今回は錐の外でFourier変換が増大し得ます。周波数側で別の方向が混ざらないかが問題です。

鍵は、空間で滑らかな関数を掛ける操作が周波数では畳み込みになることです。[FOU3のFourier反転定理](../../FOU/FOU3/index.md#thm-fou3-inversion)と、[コンパクト支持超関数の多項式増大](../MICA1/index.md#prop-mica1-polynomial-growth)を使い、超関数の場合を確認します。

<a id="prop-mica2-cutoff-convolution"></a>

<!-- formal-statement-start -->
> **命題（滑らかな乗算のFourier畳み込み表示）**
> $T\in\mathcal D'(\mathbb R^n)$ はコンパクト支持、$\psi\in C_c^\infty(\mathbb R^n)$ とする。このとき、Lebesgue積分として絶対収束する表示

$$
\widehat{\psi T}(\xi)
=\frac1{(2\pi)^n}\int_{\mathbb R^n}
\widehat\psi(\zeta)\widehat T(\xi-\zeta)\,d\zeta
$$

> が、すべての $\xi\in\mathbb R^n$ に対して成り立つ。
<!-- formal-statement-end -->

### 証明の見取り図

$\psi$ を逆Fourier積分で表し、$T$ の作用と積分を交換します。この交換を正当化するのは、$\widehat\psi$ の急減少が $\widehat T$ の多項式増大より速いことです。

<!-- proof-start -->
### 証明

$T$ の台の近くで $1$ となる $\rho\in C_c^\infty$ を固定します。[Fourier反転](../../FOU/FOU3/index.md#thm-fou3-inversion)を $\psi$ に適用すると

$$
\psi(x)=\frac1{(2\pi)^n}\int_{\mathbb R^n}e^{ix\cdot\zeta}\widehat\psi(\zeta)\,d\zeta.
$$

多重指数 $\alpha$ で $|\alpha|\le m$ 回まで $x$ 微分した $\rho(x)e^{-ix\cdot\xi}e^{ix\cdot\zeta}$ は、固定した $\xi$ と $\rho$ に対して $(1+|\zeta|)^m$ 以下の多項式評価を持ちます。一方、$\widehat\psi$ は[急減少](../MICA1/index.md#thm-mica1-smooth-rapid)し、$N>m+n$ を選べば

$$
\int_{\mathbb R^n}(1+|\zeta|)^m|\widehat\psi(\zeta)|\,d\zeta<\infty.
$$

従って、[局所有限階評価](../../GPDE/GPDE1/index.md#prop-gpde1-local-finite-order)の半ノルムで逆Fourier積分の打切りを外せ、$T$ の連続な作用と積分を交換できます。$\rho=1$ が $T$ の台の近くで成り立つので

$$
\begin{aligned}
\widehat{\psi T}(\xi)
&=\langle T,\psi(x)e^{-ix\cdot\xi}\rangle\\
&=\frac1{(2\pi)^n}\int\widehat\psi(\zeta)
\langle T,\rho(x)e^{-ix\cdot(\xi-\zeta)}\rangle\,d\zeta\\
&=\frac1{(2\pi)^n}\int\widehat\psi(\zeta)\widehat T(\xi-\zeta)\,d\zeta.
\end{aligned}
$$

また[コンパクト支持超関数のFourier変換の多項式増大](../MICA1/index.md#prop-mica1-polynomial-growth)から、ある $m\ge0$ と $C>0$ で

$$
|\widehat T(\xi-\zeta)|\le C(1+|\xi-\zeta|)^m
\le C(1+|\xi|)^m(1+|\zeta|)^m.
$$

この評価と $\widehat\psi$ の急減少は右辺の絶対収束も保証します。$\square$
<!-- proof-end -->

### 周波数の混合に角度の余裕が必要な理由

もし $\xi$ がある錐の境界ぎりぎりにあると、少し $\zeta$ を引くだけで $\xi-\zeta$ は元の錐から外へ出ます。だから、小さい錐 $\Gamma'$ の方向を取り、大きい錐 $\Gamma$ の内側に余裕を残します。次の補題はその余裕を数式にします。

<a id="lem-mica2-angular-separation"></a>

<!-- formal-statement-start -->
> **補題（角度の余裕と周波数差）**
> $\Gamma',\Gamma$ は $\mathbb R^n\setminus\{0\}$ の開錐で、

$$
\overline{\Gamma'\cap S^{n-1}}\subset\Gamma\cap S^{n-1}
$$

> を満たすとする。するとある $0<\epsilon<1/2$ が存在し、すべての $\xi\in\Gamma'$ と $|\zeta|\le\epsilon|\xi|$ に対して

$$
\xi-\zeta\in\Gamma,\qquad
|\xi-\zeta|\ge(1-\epsilon)|\xi|
$$

> が成り立つ。
<!-- formal-statement-end -->

### 証明の見取り図

単位球面上で $\Gamma'$ の方向を閉じても $\Gamma$ の内側にあります。このコンパクトな方向集合から $\Gamma$ の外側までの距離は正なので、周波数の相対変化を十分小さくすれば外へ出ません。

<!-- proof-start -->
### 証明

$K=\overline{\Gamma'\cap S^{n-1}}$ とし、$A=S^{n-1}\setminus\Gamma$ とします。$K$ はコンパクト、$A$ は閉集合、$K\cap A=\varnothing$ なので、$A$ が空でない場合には距離

$$
d:=\inf\{|\omega-\nu|:\omega\in K,\ \nu\in A\}>0
$$

を得ます。$A=\varnothing$ の場合は $d=1$ と取って構いません。$0<\epsilon<1/2$ を $2\epsilon/(1-\epsilon)<d$ となるよう選びます。$\omega=\xi/|\xi|$ とし、$\eta=\xi-\zeta$ とすると $|\eta|\ge|\xi|-|\zeta|\ge(1-\epsilon)|\xi|>0$ です。さらに

$$
\begin{aligned}
\left|\frac\eta{|\eta|}-\frac\xi{|\xi|}\right|
&\le \frac{|\eta-\xi|}{|\eta|}
+|\xi|\left|\frac1{|\eta|}-\frac1{|\xi|}\right|\\
&\le\frac{|\zeta|}{|\eta|}
+\frac{\bigl||\xi|-|\eta|\bigr|}{|\eta|}\\
&\le\frac{2\epsilon}{1-\epsilon}<d.
\end{aligned}
$$

$\omega\in K$ なので、$\eta/|\eta|$ が $A$ にあれば距離 $d$ の定義に矛盾します。従って $\eta/|\eta|\in\Gamma$、錐性より $\eta\in\Gamma$ です。$\square$
<!-- proof-end -->

<a id="thm-mica2-cutoff-stability"></a>

<!-- formal-statement-start -->
> **定理（cutoffの縮小に対する錐急減少の保存）**
> $u\in\mathcal D'(\mathbb R^n)$、$\chi\in C_c^\infty(\mathbb R^n)$ が開集合 $U\subset\mathbb R^n$ 上で $\chi=1$ を満たすとする。$\widehat{\chi u}$ は開錐 $\Gamma$ 上で急減少すると仮定する。さらに $\psi\in C_c^\infty(\mathbb R^n)$ が $\operatorname{supp}\psi\subset U$ を満たし、開錐 $\Gamma'$ が

$$
\overline{\Gamma'\cap S^{n-1}}\subset\Gamma\cap S^{n-1}
$$

> を満たすとする。このとき $\widehat{\psi u}$ は $\Gamma'$ 上で急減少する。
<!-- formal-statement-end -->

ここで必要なのは **cutoffの台を小さくすること**と**周波数の錐を少し狭めること**の両方です。$\psi$ の台が $U$ をはみ出す場合や、同じ開錐を境界まで保つ場合は、この定理の結論を自動的には使えません。

### 証明の見取り図

$T=\chi u$ とすると $\psi u=\psi T$ です。[畳み込み表示](#prop-mica2-cutoff-convolution)を使い、$\zeta$ が $\xi$ に比べ小さい部分では $\xi-\zeta\in\Gamma$ なので仮定の急減少を使います。大きい部分では錐の外へ出てもよい代わりに、$\widehat\psi(\zeta)$ の急減少で $\widehat T$ の多項式増大を抑えます。

<!-- proof-start -->
### 証明

$T=\chi u$ はコンパクト支持です。$\operatorname{supp}\psi\subset U$ と $\chi=1$ on $U$ から、任意の試験関数 $\varphi$ について

$$
\langle\psi u,\varphi\rangle
=\langle u,\psi\varphi\rangle
=\langle\chi u,\psi\varphi\rangle
=\langle\psi T,\varphi\rangle.
$$

従って[畳み込み表示](#prop-mica2-cutoff-convolution)を適用できます。$\widehat T$ の[多項式増大](../MICA1/index.md#prop-mica1-polynomial-growth)として $|\widehat T(\eta)|\le C(1+|\eta|)^m$ を固定し、[角度補題](#lem-mica2-angular-separation)の $\epsilon$ を取ります。$\xi\in\Gamma'$、$|\xi|\ge1$ に対し、積分を

$$
I_{\mathrm{near}}=\int_{|\zeta|\le\epsilon|\xi|}
\widehat\psi(\zeta)\widehat T(\xi-\zeta)\,d\zeta,
\qquad
I_{\mathrm{far}}=\int_{|\zeta|>\epsilon|\xi|}
\widehat\psi(\zeta)\widehat T(\xi-\zeta)\,d\zeta
$$

と分けます（共通因子 $(2\pi)^{-n}$ は最後に掛けます）。

**近い部分。** $\eta=\xi-\zeta$ は補題により $\Gamma$ に入り、$|\eta|\ge(1-\epsilon)|\xi|$ です。任意の $N\ge0$ に対し、仮定の錐急減少から

$$
\begin{aligned}
|I_{\mathrm{near}}|
&\le C_N\int_{|\zeta|\le\epsilon|\xi|}
|\widehat\psi(\zeta)|(1+|\xi-\zeta|)^{-N}\,d\zeta\\
&\le C_N(1-\epsilon)^{-N}(1+|\xi|)^{-N}
\int_{\mathbb R^n}|\widehat\psi(\zeta)|\,d\zeta.
\end{aligned}
$$

最後の積分は $\psi\in C_c^\infty$ から有限です。

**遠い部分。** こちらでは $\eta$ が錐の外へ出ても構いません。$1+|\xi-\zeta|\le(1+|\xi|)(1+|\zeta|)$ なので

$$
|I_{\mathrm{far}}|\le C(1+|\xi|)^m
\int_{|\zeta|>\epsilon|\xi|}
|\widehat\psi(\zeta)|(1+|\zeta|)^m\,d\zeta.
$$

$\widehat\psi$ の急減少を次数 $Q=N+2m+n+1$ より大きい整数で使います（$m$ が整数ならこの $Q$ 自体でよい）。半径 $r=|\zeta|$ による積分評価から、$Q-m>n$ のとき

$$
\begin{aligned}
\int_{|\zeta|>\epsilon|\xi|}(1+|\zeta|)^{m-Q}\,d\zeta
&\le C_{n,m,Q}\bigl(1+\epsilon|\xi|\bigr)^{n+m-Q}\\
&\le C'_{n,m,Q,\epsilon}(1+|\xi|)^{n+m-Q}.
\end{aligned}
$$

後半で指数 $n+m-Q$ が負であることに注意しました。従って

$$
|I_{\mathrm{far}}|
\le C''(1+|\xi|)^{n+2m-Q}
\le C''(1+|\xi|)^{-N-1}.
$$

二つを足せば、$|\xi|\ge1$ の $\xi\in\Gamma'$ について任意次数 $N$ の急減少が成立します。$|\xi|\le1$ では $\widehat{\psi T}$ は連続かつ有界であり（[多項式増大命題](../MICA1/index.md#prop-mica1-polynomial-growth)でもよい）、定数を増やして全域へ拡張できます。$\square$
<!-- proof-end -->

証明で $Q$ を $N$ より多く取るのは、$\widehat T$ の増大次数 $m$、積分の次元 $n$、さらに外側の $(1+|\xi|)^m$ を支払うためです。$\widehat\psi$ には**任意次数**の減衰があるので、この支払いが可能でした。

## 4. ある点で、ある方向だけ規則的である

位置と方向を一緒に扱う準備ができました。非零方向 $\xi_0$ を一つ固定し、その周りの錐で急減少するcutoffが存在するかを問います。ここでの「方向」は長さでなく正の倍率を同一視した向きですが、記録には非零ベクトル $\xi_0$ を使います。

<a id="def-mica2-directional-regularity"></a>

<!-- formal-statement-start -->
> **定義（点と非零方向でのFourier規則性）**
> $u\in\mathcal D'(\mathbb R^n)$、$x_0\in\mathbb R^n$、$\xi_0\in\mathbb R^n\setminus\{0\}$ とする。$u$ が組 $(x_0,\xi_0)$ で**方向別Fourier規則性を持つ**とは、次を満たすものが存在することをいう。
>
> 1. $x_0$ のある近傍で $\chi=1$ となる $\chi\in C_c^\infty(\mathbb R^n)$。
> 2. $\xi_0$ を含む開錐 $\Gamma$。
>
> このとき、任意の整数 $N\ge0$ に対し、$\xi\in\Gamma$ のすべてについて

$$
|\widehat{\chi u}(\xi)|\le C_N(1+|\xi|)^{-N}
$$

> を満たす定数 $C_N$ が存在する。$t>0$ に対し $\xi_0$ を $t\xi_0$ に替えても同じ性質である。
<!-- formal-statement-end -->

<!-- definition-example-start: def-mica2-directional-regularity -->
### 直接例：滑らかな点ではどの方向でも成立する

**定義の確認**。$u$ が $x_0$ の近傍 $U$ で $C^\infty$ 関数 $f$ に等しいとします。$x_0$ の近傍で $1$ かつ台が $U$ に収まる $\chi\in C_c^\infty$ を選ぶと、$\chi u=\chi f\in C_c^\infty$ です。[急減少と滑らかさの同値](../MICA1/index.md#thm-mica1-smooth-rapid)から全方向で評価が成り立ちます。従って任意の $\xi_0\ne0$ に対し、例えば $\Gamma_\varepsilon(\xi_0/|\xi_0|)$ を取れば二つの存在条件を満たします。
<!-- definition-example-end -->

### 直接例：直線に集中した超関数

$\mathbb R^2$ 上で、$x_1=0$ に集中した超関数 $u=\delta(x_1)$ を、試験関数 $\varphi$ に対して

$$
\langle u,\varphi\rangle=\int_{\mathbb R}\varphi(0,x_2)\,dx_2
$$

で定義します。$a,b\in C_c^\infty(\mathbb R)$ は原点近くで $1$ とし、$\chi(x_1,x_2)=a(x_1)b(x_2)$ を選びます。超関数の作用をそのまま計算すると

$$
\begin{aligned}
\widehat{\chi u}(\xi_1,\xi_2)
&=\int_{\mathbb R}a(0)b(x_2)e^{-ix_2\xi_2}\,dx_2\\
&=\widehat b(\xi_2).
\end{aligned}
$$

第2節の計算から、$\xi_2>2|\xi_1|$ の錐でも $-\xi_2>2|\xi_1|$ の錐でも急減少します。従って原点では**上下の方向に規則性がある**ことが分かります。

対照的に、水平右向き $\xi_0=(1,0)$ は、どのcutoffを使っても規則的になりません。実際、任意の $\widetilde\chi\in C_c^\infty(\mathbb R^2)$ が原点近くで $1$ なら、$g(x_2)=\widetilde\chi(0,x_2)$ は零でない $C_c^\infty$ 関数です。よって

$$
\widehat{\widetilde\chi u}(\xi_1,\xi_2)=\widehat g(\xi_2)
$$

であり、[Fourier反転](../../FOU/FOU3/index.md#thm-fou3-inversion)から $\widehat g$ は恒等的に零にはなりません。$\widehat g(\beta)\ne0$ となる固定した実数 $\beta$ を選べば、$r\to+\infty$ で $(r,\beta)$ は水平右向きの**任意**の開錐近傍に入り、変換の絶対値は $|\widehat g(\beta)|>0$ のままです。$N=1$ の評価と矛盾するので、定義の存在条件は満たせません。左向きも $r\to-\infty$ により同じです。

<a id="prop-mica2-regularity-open"></a>

<!-- formal-statement-start -->
> **命題（方向別規則性が成り立つ位置と方向の開放性）**
> $u\in\mathcal D'(\mathbb R^n)$ が $(x_0,\xi_0)$、$\xi_0\ne0$ で方向別Fourier規則性を持つなら、$x_0$ の開近傍 $V$ と $\xi_0$ の開錐近傍 $\Gamma_0$ が存在し、すべての $(x,\xi)\in V\times\Gamma_0$ で $u$ は方向別Fourier規則性を持つ。
<!-- formal-statement-end -->

### 証明の見取り図

定義の存在条件に使った一つのcutoffと一つの錐は、その内側の点と方向すべてで共通に使えます。位置方向への開放性をこの二つから読み取ります。

<!-- proof-start -->
### 証明

定義により、$\chi=1$ が成り立つ $x_0$ を含む開集合 $V$ と、$\xi_0\in\Gamma_0$ かつ $\widehat{\chi u}$ が急減少する開錐 $\Gamma_0$ が存在します。任意の $x\in V$ について $V$ は $x$ の近傍でもあり、$\chi=1$ はそこでも成立します。また任意の $\xi\in\Gamma_0$ に対して同じ $\Gamma_0$ が開錐近傍です。従って同じ $\chi,\Gamma_0,C_N$ が定義の条件をすべて満たします。$\square$
<!-- proof-end -->

### 全方向で規則的なら、もとの点は滑らか

方向ごとに異なるcutoffしか分かっていない場合も、球面のコンパクト性を使えば、共通の小さいcutoffへ集約できます。この橋渡しにより方向別の判定は[前講の点ごとの滑らかさ判定](../MICA1/index.md#thm-mica1-local-smooth)と矛盾しません。

<a id="thm-mica2-all-directions"></a>

<!-- formal-statement-start -->
> **定理（全非零方向での規則性と滑らかさ）**
> $u\in\mathcal D'(\mathbb R^n)$、$x_0\in\mathbb R^n$ とする。$u$ が $x_0$ のある開近傍で $C^\infty$ 関数に等しいことと、すべての $\xi_0\in\mathbb R^n\setminus\{0\}$ について $u$ が $(x_0,\xi_0)$ で方向別Fourier規則性を持つことは同値である。
<!-- formal-statement-end -->

### 証明の見取り図

滑らかなら全方向で減衰する向きは[前講の定理](../MICA1/index.md#thm-mica1-smooth-rapid)から従います。逆向きでは、球面上の方向を有限個の錐で覆い、すべてのcutoffが $1$ である小近傍に一つのcutoffを置いてから[縮小定理](#thm-mica2-cutoff-stability)を適用します。

<!-- proof-start -->
### 証明

滑らかなら第4節の最初の定義例で、各方向に同じ $\chi$ を使って規則性を確認しました。

逆に、すべての $\omega\in S^{n-1}$ で方向別規則性があるとします。各 $\omega$ について、$x_0$ の開近傍 $U_\omega$ 上で $\chi_\omega=1$ となり、開錐 $\Gamma_\omega\ni\omega$ で $\widehat{\chi_\omega u}$ が急減少するとします。$\Gamma_\omega\cap S^{n-1}$ は球面の開被覆です。各 $\omega$ を中心とする、球面上の閉包が $\Gamma_\omega$ 内に入るさらに小さな開錐 $\Gamma'_\omega$ を選べます。これらも $S^{n-1}$ を覆います。

球面がコンパクトなので有限個 $\Gamma'_{\omega_1},\ldots,\Gamma'_{\omega_k}$ で覆えます。$U=\bigcap_{j=1}^k U_{\omega_j}$ は $x_0$ の開近傍なので、$x_0$ 近傍で $1$、台が $U$ に入る $\psi\in C_c^\infty$ を取れます。各 $j$ で[縮小定理](#thm-mica2-cutoff-stability)を $\chi_{\omega_j}$ と $\psi$ に適用し、$\widehat{\psi u}$ の $\Gamma'_{\omega_j}$ 上での急減少を得ます。

任意の $\xi\ne0$ はどれか一つの $\Gamma'_{\omega_j}$ に入ります。各 $N$ について有限個の定数 $C_{N,j}$ の最大を取れば、全 $\xi\ne0$ で

$$
|\widehat{\psi u}(\xi)|\le\max_{1\le j\le k}C_{N,j}(1+|\xi|)^{-N}
$$

となります。$\xi=0$ では定数を増やせばよいので全方向の急減少を得ます。[局所Fourier判定と滑らかさの同値](../MICA1/index.md#thm-mica1-local-smooth)から $u$ は $x_0$ の近傍で滑らかです。$\square$
<!-- proof-end -->

## 5. 演習

### 演習 MICA2-A1：錐であることと角度の余裕

- Level: A
- 目安時間: 10分

$\mathbb R^2$ で $\Gamma=\{(p,q):q>|p|\}$、$\Gamma'=\{(p,q):q>3|p|\}$ とする。両者が開錐であること、$\overline{\Gamma'\cap S^1}\subset\Gamma\cap S^1$ を証明せよ。$t<0$ の拡大を定義に含めない理由も説明せよ。

<!-- solution-start -->
#### 詳細解答

$q-|p|$ と $q-3|p|$ は連続関数なので、正となる集合は開です。$t>0$ なら $tq>c|tp|$ と $q>c|p|$ が同値で、どちらも正の拡大で不変です。各点では $q>0$ なので原点は含みません。

$\overline{\Gamma'\cap S^1}$ の点では $q\ge3|p|$ かつ $p^2+q^2=1$ です。$p\ne0$ なら $q>|p|$、$p=0$ なら $q=1>|p|=0$ です。よって閉包は $\Gamma$ に含まれます。$t<0$ なら上向き $(0,1)$ が下向き $(0,-1)$ に移り、後者は $\Gamma$ に入りません。向きを区別するため正の拡大だけを使います。
<!-- solution-end -->

### 演習 MICA2-A2：一次元での片方向の急減少

- Level: A
- 目安時間: 10分

$F:\mathbb R\to\mathbb R$ を $F(\xi)=e^{-\xi}$（$\xi\ge0$）、$F(\xi)=1$（$\xi<0$）で定める。開錐 $\Gamma_+=(0,\infty)$ と $\Gamma_-=(-\infty,0)$ のそれぞれで急減少かを判定せよ。$F$ 全体が滑らかである必要はあるか。

<!-- solution-start -->
#### 詳細解答

$\Gamma_+$ で $r=\xi>0$ とおくと $(1+r)^Ne^{-r}$ は $r\ge0$ 上の連続関数で、無限遠で零に向かいます。従ってその上限を $C_N$ に取れば、各 $N$ の錐急減少が成立します。$\Gamma_-$ では $F(\xi)=1$ なので、$N=1$ に対する $(1+|\xi|)|F(\xi)|$ は $\xi\to-\infty$ で発散します。定義は $F$ の値の評価だけであり、$\xi=0$ での微分可能性は要求しません。この例は局所化超関数のFourier変換という追加の構造を仮定しない、関数の条件の確認です。
<!-- solution-end -->

### 演習 MICA2-A3：直線デルタの方向別評価

- Level: A
- 目安時間: 12分

$\mathbb R^2$ の超関数 $u=\delta(x_1)$ に $\chi(x_1,x_2)=a(x_1)b(x_2)$ を掛ける。$a,b\in C_c^\infty(\mathbb R)$ は原点近くで $1$ とする。$\widehat{\chi u}$ を求め、$\Gamma=\{\xi_2>3|\xi_1|\}$ での任意次数の減衰を示せ。

<!-- solution-start -->
#### 詳細解答

超関数 $u$ の試験関数への評価式に代入すると $\langle\chi u,\varphi\rangle=\int a(0)b(x_2)\varphi(0,x_2)\,dx_2$ であり、$a(0)=1$ なので

$$
\widehat{\chi u}(\xi_1,\xi_2)=\int b(x_2)e^{-ix_2\xi_2}\,dx_2=\widehat b(\xi_2).
$$

$\Gamma$ では $|\xi_1|<\xi_2/3$、従って $|\xi|<\sqrt{10}|\xi_2|/3$ です。[急減少定理](../MICA1/index.md#thm-mica1-smooth-rapid)により $|\widehat b(\xi_2)|\le B_N(1+|\xi_2|)^{-N}$ です。$|\xi_2|>3|\xi|/\sqrt{10}$ を代入し、

$$
|\widehat{\chi u}(\xi)|\le B_N(\sqrt{10}/3)^N(1+|\xi|)^{-N}
$$

を得ます。$\sqrt{10}/3>1$ でも、これは各 $N$ ごとの有限定数なので問題ありません。
<!-- solution-end -->

### 演習 MICA2-A4：狭いcutoffと広いcutoffは同じでない

- Level: A
- 目安時間: 10分

$u=\delta_{(3,0)}\in\mathcal D'(\mathbb R^2)$、$x_0=(0,0)$ とする。$\operatorname{supp}\chi_1\subset B(0,1)$、$\chi_1=1$ が $x_0$ 近傍で成立するcutoffと、$\chi_2=1$ が $x_0$ と $(3,0)$ の両近傍で成立するcutoffを取る。両者の局所Fourier変換を比較し、[縮小定理](#thm-mica2-cutoff-stability)の台の条件がなぜ必要か述べよ。

<!-- solution-start -->
#### 詳細解答

$\chi_1(3,0)=0$、$\chi_2(3,0)=1$ なので、[局所Fourier変換の定義](../MICA1/index.md#def-mica1-local-fourier)から

$$
\widehat{\chi_1u}(\xi)=0,\qquad
\widehat{\chi_2u}(\xi)=e^{-3i\xi_1}.
$$

前者はすべての開錐で急減少し、後者は絶対値が常に $1$ なのでどの非空開錐でも $N=1$ の急減少条件を満たしません。$\chi_2$ の台は $\chi_1=1$ の領域に収まっていません。したがって、定理はこの二つのcutoffを比較しておらず矛盾はありません。
<!-- solution-end -->

### 演習 MICA2-B1：畳み込み公式をデルタで検算する

- Level: B
- 目安時間: 16分

$T=\delta_0\in\mathcal D'(\mathbb R^n)$、$\psi\in C_c^\infty(\mathbb R^n)$ とする。[滑らかな乗算の畳み込み公式](#prop-mica2-cutoff-convolution)の左辺と右辺を別々に計算し、$(2\pi)^{-n}$ の係数まで一致することを確認せよ。

<!-- solution-start -->
#### 詳細解答

[超関数の局所化](../MICA1/index.md#def-mica1-local-fourier)を $T=\delta_0$ に適用すると $\psi T=\psi(0)\delta_0$、従って左辺は $\psi(0)$ です。一方 $\widehat{\delta_0}(\eta)=1$ なので、畳み込み公式の右辺は

$$
\frac1{(2\pi)^n}\int_{\mathbb R^n}
\widehat\psi(\zeta)\widehat{\delta_0}(\xi-\zeta)\,d\zeta
=\frac1{(2\pi)^n}\int_{\mathbb R^n}\widehat\psi(\zeta)\,d\zeta.
$$

$\psi$ は滑らかでコンパクト支持なので、そのFourier変換は急減少し、積分は絶対収束します。[Fourier反転定理](../../FOU/FOU3/index.md#thm-fou3-inversion)を $x=0$ で適用すると、最後の式は $\psi(0)$ です。係数を落とすと一致しません。
<!-- solution-end -->

### 演習 MICA2-B2：遠い周波数を抑える次数

- Level: B
- 目安時間: 20分

$n=2$、$T\in\mathcal D'(\mathbb R^2)$ はコンパクト支持で $|\widehat T(\eta)|\le C(1+|\eta|)^2$ とする。$\psi\in C_c^\infty(\mathbb R^2)$ と $0<\epsilon<1/2$ を固定する。$|\xi|\ge1$ に対し

$$
J(\xi)=\int_{|\zeta|>\epsilon|\xi|}
|\widehat\psi(\zeta)\widehat T(\xi-\zeta)|\,d\zeta
$$

を定める。$J(\xi)=O((1+|\xi|)^{-3})$ を、$\widehat\psi$ の何次の急減少評価で示せるか。積分の半径冪を明記せよ。

<!-- solution-start -->
#### 詳細解答

仮定 $|\widehat T(\eta)|\le C(1+|\eta|)^2$ と $1+|\xi-\zeta|\le(1+|\xi|)(1+|\zeta|)$ を代入すると

$$
J(\xi)\le C(1+|\xi|)^2
\int_{|\zeta|>\epsilon|\xi|}
(1+|\zeta|)^2|\widehat\psi(\zeta)|\,d\zeta.
$$

例えば急減少の次数 $Q=11$ を選び $|\widehat\psi(\zeta)|\le B_{11}(1+|\zeta|)^{-11}$ とすれば、右辺は $CB_{11}(1+|\xi|)^2\int_{|\zeta|>\epsilon|\xi|}(1+|\zeta|)^{-9}\,d\zeta$ 以下です。二次元の極座標で $R=\epsilon|\xi|$ とおくと

$$
\begin{aligned}
\int_{|\zeta|>R}(1+|\zeta|)^{-9}\,d\zeta
&=2\pi\int_R^\infty r(1+r)^{-9}\,dr\\
&\le2\pi\int_R^\infty(1+r)^{-8}\,dr\\
&=\frac{2\pi}{7}(1+R)^{-7}.
\end{aligned}
$$

$1+\epsilon|\xi|\ge\epsilon(1+|\xi|)$ なので $J(\xi)\le C'(1+|\xi|)^{-5}$、特に要求の $O((1+|\xi|)^{-3})$ が従います。$Q=9$ でも同じ積分を $(1+r)^{-6}$ で評価して $O((1+|\xi|)^{-3})$ が得られます。$Q=11$ は余裕のある選択です。
<!-- solution-end -->

### 演習 MICA2-B3：全方向の規則性を一つのcutoffへまとめる

- Level: B
- 目安時間: 20分

$u\in\mathcal D'(\mathbb R^2)$ と $x_0\in\mathbb R^2$ について、単位円の各方向 $\omega$ ごとに、$\chi_\omega=1$ が $x_0$ 近傍で成立し、$\widehat{\chi_\omega u}$ が $\omega$ の開錐近傍で急減少すると仮定する。$u$ が $x_0$ の近傍で滑らかであることを、方向ごとのcutoffが最初から同一だとは仮定せずに証明せよ。

<!-- solution-start -->
#### 詳細解答

各 $\omega\in S^1$ で急減少する開錐 $\Gamma_\omega$ を一つ選び、その球面上の閉包が $\Gamma_\omega$ に入る小錐 $\Gamma'_\omega\ni\omega$ を選びます。$S^1$ はコンパクトなので、有限個 $\Gamma'_{\omega_1},\dots,\Gamma'_{\omega_k}$ で覆われます。

各 $j$ で $\chi_{\omega_j}=1$ となる $x_0$ の近傍を $U_j$ とし、$U=\bigcap_{j=1}^kU_j$ を取ります。有限交叉なので $U$ は $x_0$ の開近傍です。$x_0$ で $1$ かつ台が $U$ 内にある $\psi\in C_c^\infty$ を選ぶと、[縮小定理](#thm-mica2-cutoff-stability)により、すべての $j$ で $\widehat{\psi u}$ は $\Gamma'_{\omega_j}$ 上で急減少します。

各 $N$ に対し $k$ 個の評価定数の最大値を取れば、$\mathbb R^2\setminus\{0\}$ 全体で同じ次数 $N$ の評価が得られます。$\xi=0$ は連続性で補えます。[前講の局所判定定理](../MICA1/index.md#thm-mica1-local-smooth)を適用すれば $u$ は $x_0$ 近傍で滑らかです。有限被覆がなければ、無限個の評価定数から共通上界を取れない点に注意します。
<!-- solution-end -->

### 演習 MICA2-B4：任意のcutoffに対する横向きの障害

- Level: B
- 目安時間: 18分

$u=\delta(x_1)$ を $\mathbb R^2$ 上の超関数とし、$\chi\in C_c^\infty(\mathbb R^2)$ は原点近傍で $1$ とする。分離形 $a(x_1)b(x_2)$ を仮定せずに $\widehat{\chi u}(\xi)$ を計算し、原点の水平右向きと左向きのどちらでも方向別Fourier規則性が成立しないと証明せよ。

<!-- solution-start -->
#### 詳細解答

$g(x_2)=\chi(0,x_2)$ とおけば $g\in C_c^\infty(\mathbb R)$、$g=1$ が $x_2=0$ の近傍で成立します。超関数の定義に代入して

$$
\widehat{\chi u}(\xi_1,\xi_2)
=\int_{\mathbb R}\chi(0,x_2)e^{-ix_2\xi_2}\,dx_2
=\widehat g(\xi_2).
$$

$g$ は原点近くで $1$ なので零関数ではありません。もしそのFourier変換が恒等的に零なら、[Fourier反転定理](../../FOU/FOU3/index.md#thm-fou3-inversion)により $g$ も零関数となるため矛盾します。従って、変換が零でない周波数 $\beta\in\mathbb R$ を一つ固定できます。

任意の右向き開錐 $\Gamma$ は、十分大きい $r>0$ に対する $(r,\beta)$ を含みます。この列では

$$
\widehat{\chi u}(r,\beta)=\widehat g(\beta)\ne0
$$

で値が一定なので、$N=1$ の急減少は成立しません。$r\to-\infty$ とすれば左向きについても同じ結論です。$\chi$ は任意だったので、別のcutoffへ替えてもこの障害は消えません。
<!-- solution-end -->

### 演習 MICA2-C1：二本の直線の交差点での方向

- Level: C
- 目安時間: 35分

$\mathbb R^2$ 上で $u=\delta(x_1)+\delta(x_2)$ とする。ここで $\langle\delta(x_1),\varphi\rangle=\int\varphi(0,x_2)\,dx_2$、$\langle\delta(x_2),\varphi\rangle=\int\varphi(x_1,0)\,dx_1$ とする。原点 $x_0=(0,0)$ において次を示せ。

1. $a,b\in C_c^\infty(\mathbb R)$ が原点近くで $1$ のとき、$\chi(x_1,x_2)=a(x_1)b(x_2)$ による $\widehat{\chi u}$ を求めよ。
2. $\xi_0=(p,q)$ で $pq\ne0$ なら、$(x_0,\xi_0)$ で方向別Fourier規則性が成立することを証明せよ。
3. $\xi_0$ が水平または垂直の非零方向なら、どのcutoffを選んでも方向別Fourier規則性が成立しないことを証明せよ。「あるcutoffでの失敗」だけで済ませないこと。

<!-- solution-start -->
#### 詳細解答

**1. 変換の計算。** 第4節の作用を各項に適用すると、$a(0)=b(0)=1$ なので

$$
\begin{aligned}
\widehat{\chi\delta(x_1)}(\xi_1,\xi_2)
&=\int b(x_2)e^{-ix_2\xi_2}\,dx_2=\widehat b(\xi_2),\\
\widehat{\chi\delta(x_2)}(\xi_1,\xi_2)
&=\int a(x_1)e^{-ix_1\xi_1}\,dx_1=\widehat a(\xi_1).
\end{aligned}
$$

線形性により $\widehat{\chi u}(\xi)=\widehat b(\xi_2)+\widehat a(\xi_1)$ です。

**2. 斜め方向の減衰。** $pq\ne0$ なら、$\xi_0/|\xi_0|$ の二成分はともに非零です。十分小さい開錐 $\Gamma$ と定数 $c>0$ を選べば、そのすべての $\xi$ について $|\xi_1|\ge c|\xi|$、$|\xi_2|\ge c|\xi|$ が成立します。これは単位円上で $|\omega_1|,|\omega_2|$ が $\xi_0/|\xi_0|$ の近傍で正の下界を持つためです。[急減少定理](../MICA1/index.md#thm-mica1-smooth-rapid)を $a,b$ にそれぞれ使い

$$
|\widehat{\chi u}(\xi)|
\le (A_N+B_N)c^{-N}(1+|\xi|)^{-N},\qquad \xi\in\Gamma
$$

を得ます。$\chi=1$ が原点近くで成立するため、方向別規則性が証明されました。

**3. 軸方向が失敗する理由。** 任意のcutoff $\widetilde\chi\in C_c^\infty(\mathbb R^2)$ で原点近傍で $1$ となるものを取り、$g(x_2)=\widetilde\chi(0,x_2)$、$h(x_1)=\widetilde\chi(x_1,0)$ とします。どちらも零でない $C_c^\infty$ 関数で、作用の計算から

$$
\widehat{\widetilde\chi u}(\xi_1,\xi_2)
=\widehat g(\xi_2)+\widehat h(\xi_1).
$$

[Fourier反転](../../FOU/FOU3/index.md#thm-fou3-inversion)により $\widehat g\not\equiv0$。$\widehat g(\beta)\ne0$ となる $\beta$ を固定して $\xi=(r,\beta)$、$r\to\pm\infty$ とすると、$\widehat h(r)\to0$ なので $\widehat{\widetilde\chi u}(r,\beta)\to\widehat g(\beta)\ne0$ です。従って左右の開錐では急減少しません。同じ議論を $\widehat h(\alpha)\ne0$ となる固定 $\alpha$ と $\xi=(\alpha,r)$ に適用すると、$\widehat g(r)\to0$ なので上下でも急減少しません。cutoffが任意だったため、軸方向の非規則性が確定します。
<!-- solution-end -->

## 6. 次の講義へ

錐の中での急減少は、「その点の、その方向には高周波の特異性がない」という情報を表します。[cutoffの縮小定理](#thm-mica2-cutoff-stability)によって、その判定が一つの大きなcutoffの偶然に依存しないことも分かりました。ただし、cutoffを縮めるときには錐を少し狭める必要があります。

また、全方向で規則的であることと点の近傍で滑らかであることが[同値](#thm-mica2-all-directions)でした。二本の直線デルタの交点では、同じ位置でも軸方向と斜め方向を区別できました。MICA3では、**方向別規則性が失敗する組だけ**を集め、波面集合を定義します。
