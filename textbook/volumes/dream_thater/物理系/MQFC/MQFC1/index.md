# MQFC1 場のsmearing・Schwartz空間・緩増加分布と核

温度のような古典的な場なら各点の値を測ると考えられます。しかし量子場の数学では、点の値よりも、滑らかな重みを掛けて空間全体で平均した結果を基本にします。例えば一点に集中した量は普通の関数では表せませんが、測定器の重みを与えれば応答を計算できます。この操作を smearing（試験関数による平均化）と呼びます。重みは非負や積分1である必要はありません。

[超関数](../../../解析系/GPDE/GPDE1/index.md#def-gpde1-distribution)と[超関数の微分](../../../解析系/GPDE/GPDE2/index.md#def-gpde2-distributional-derivative)を既習とします。[QFT3のSchwartz関数](../../QFT/QFT3/index.md#def-qft3-schwartz-function)と[緩増加超関数](../../QFT/QFT3/index.md#def-qft3-tempered)を一般次元の半ノルム位相と連続性の観点から精密化します。ここではまず数値を返す分布だけを扱い、作用素を返す量子場は次講で構成します。

## 1. 無限遠まで制御する試験関数

$x\in\mathbb R^d$、$d\ge1$ とし、$|x|$ をEuclidノルムとします。[多重指数](../../../解析系/GPDE/GPDE2/index.md#def-gpde2-multi-index) $\alpha=(\alpha_1,\dots,\alpha_d)$ は非負整数の組で、$|\alpha|=\sum_j\alpha_j$、$\partial^\alpha=\prod_j\partial_{x_j}^{\alpha_j}$ です。コンパクト支持の試験関数は局所問題に便利ですが、Fourier変換すると一般にコンパクト支持ではなくなります。そこで無限遠での減衰を全階微分にも要求します。関数の大きさを測る非負の量 $p$ が $p(f+g)\le p(f)+p(g)$ と $p(cf)=|c|p(f)$ を満たすとき半ノルムと呼びます。零でない関数に対して零となることも許します。以下では各 $p_{N,m}$ が実際には $p_{0,0}$ 以上なので、零となるのは零関数だけです。$\partial_j$ は他の座標を固定した $x_j$ による偏微分、一次元の $f',f''$ はそれぞれ $df/dx,d^2f/dx^2$ を表します。

<a id="def-mqfc1-schwartz"></a>

<!-- formal-statement-start -->
> **定義（Schwartz空間）**  
> 滑らかな複素数値関数 $f$ で、すべての整数 $N,m\ge0$ に対して次の量が有限であるもの全体を $\mathcal S(\mathbb R^d)$ とする。

$$
p_{N,m}(f)=\max_{|\alpha|\le m}\sup_x(1+|x|)^N|\partial^\alpha f(x)|.
$$

> この空間の収束は、すべての $p_{N,m}(f_k-f)$ が零に収束することで定める。位相は有限個の半ノルムの上界による近傍で定める。
<!-- formal-statement-end -->

<!-- definition-example-start: def-mqfc1-schwartz -->
### 直接例

**定義の確認**。$f(x)=e^{-|x|^2}$ は、微分するごとに多項式と同じ指数関数の積になります。実際 $\partial_j(Pe^{-|x|^2})=(\partial_j P-2x_jP)e^{-|x|^2}$ です。初めの多項式を $P=1$ としてこの式を繰り返せば、全階微分が多項式とGaussianの積になります。多項式の次数を $k$ とすると $|P(x)|\le C(1+|x|)^k$ であり、$(1+r)^{N+k}e^{-r^2}$ は $r\to\infty$ で零に近づく連続関数なので有界です。有限個の微分について最大を取っても有限です。一方 $f(x)=(1+|x|^2)^{-1}$ は $p_{3,0}$ が無限となるため属しません。[コンパクト支持の滑らかな試験関数](../../../解析系/GPDE/GPDE1/index.md#def-gpde1-test-function)も、各微分が同じコンパクト集合の外で零となり、集合上で重み付き微分が連続かつ有界なので属します。
<!-- definition-example-end -->

通常の点ごとの収束だけでは足りません。例えば一次元の $f_k(x)=e^{-(x-k)^2}$ は各点で零に近づきますが $p_{0,0}(f_k)=1$ です。

## 2. 緩増加分布

測定結果が重みの微小変化に対して連続であることを要求します。有限個の半ノルムによる制御は、その連続性を数式にしたものです。汎関数は関数を一つの数に写す写像で、複素線形とは $T(af+bg)=aT(f)+bT(g)$ が複素数 $a,b$ に対して成り立つことです。$\langle T,f\rangle$ はこの作用を表し、内積ではありません。

<a id="def-mqfc1-tempered"></a>

<!-- formal-statement-start -->
> **定義（緩増加分布）**  
> $\mathcal S'(\mathbb R^d)$ は $\mathcal S(\mathbb R^d)$ 上の連続な複素線形汎関数全体である。作用を $\langle T,f\rangle$ と書く。連続性は、ある $C>0$ と $N,m\ge0$ に対し

$$
|\langle T,f\rangle|\le C p_{N,m}(f)
\qquad(f\in\mathcal S)
$$

> が成立することと同値である。
<!-- formal-statement-end -->

連続なら原点のある近傍で絶対値が1以下になります。有限個の半ノルムを最大の $N,m$ にまとめ、ある $\eta>0$ で $p_{N,m}(f)<\eta$ なら $|\langle T,f\rangle|\le1$ とできます。$f\ne0$ なら $p_{N,m}(f)\ge p_{0,0}(f)>0$ なので、$u=\eta f/(2p_{N,m}(f))$ とおけます。$p_{N,m}(u)=\eta/2$ と線形性から

$$
|\langle T,f\rangle|
=\frac{2p_{N,m}(f)}{\eta}|\langle T,u\rangle|
\le\frac2\eta p_{N,m}(f).
$$

$f=0$ でも成立します。逆にこの評価があれば、$p_{N,m}(f-g)<\varepsilon/C$ のとき $|\langle T,f\rangle-\langle T,g\rangle|<\varepsilon$ なので任意の $g$ で連続です。

<!-- definition-example-start: def-mqfc1-tempered -->
### 直接例

**定義の確認**。[Dirac分布](../../../解析系/GPDE/GPDE1/index.md#def-gpde1-dirac) $\delta_a$（$a\in\mathbb R^d$）を $\langle\delta_a,f\rangle=f(a)$ と定めると線形で、絶対値は $p_{0,0}(f)$ 以下です。従って緩増加分布です。これは普通の関数の一点での値ではなく、重みに対する応答です。
<!-- definition-example-end -->

<a id="prop-mqfc1-polynomial"></a>

<!-- formal-statement-start -->
> **命題（多項式増大関数による緩増加分布）**  
> 可測な $g$ が $|g(x)|\le A(1+|x|)^q$（$A>0,q\ge0$）をほとんど至る所で満たすなら、次の積分は緩増加分布を定める。

$$
\langle T_g,f\rangle=\int_{\mathbb R^d}g(x)f(x)\,dx.
$$
<!-- formal-statement-end -->

### 証明の見取り図

増大分を試験関数の減衰で相殺し、残りを可積分にします。

<!-- proof-start -->
### 証明

整数 $N>q+d$ を選びます。被積分関数の絶対値は

$$
|g(x)f(x)|\le A p_{N,0}(f)(1+|x|)^{q-N}
$$

です。単位球内の積分は有限で、球外では半径 $r$ に関する積分が定数倍の $\int_1^\infty r^{d-1+q-N}\,dr$ 以下です。指数は $-1$ 未満なので有限です。よって $I=\int_{\mathbb R^d}(1+|x|)^{q-N}\,dx<\infty$ です。絶対収束と $|\langle T_g,f\rangle|\le AIp_{N,0}(f)$ が同時に従い、積分の線形性と[緩増加分布の連続性判定](#def-mqfc1-tempered)から結論を得ます。
<!-- proof-end -->

## 3. 微分とFourier変換

分布の微分は試験関数へ移します。Fourier変換についても同じ方針ですが、そのためには試験関数の空間が変換で保たれる必要があります。[Fourier変換](../../../解析系/FOU/FOU3/index.md#def-fou3-fourier-transform)の符号を次で固定します。$x,\xi\in\mathbb R^d$ はそれぞれ空間変数と周波数変数、$x\cdot\xi=\sum_j x_j\xi_j$、$i$ は虚数単位です。多重指数の冪は $x^\beta=\prod_j x_j^{\beta_j}$ と書きます。積分は特記しない限り該当する全Euclid空間上です。

$$
\widehat f(\xi)=\int e^{-ix\cdot\xi}f(x)\,dx.
$$

<a id="thm-mqfc1-fourier"></a>

<!-- formal-statement-start -->
> **定理（Schwartz空間のFourier変換）**  
> Fourier変換は $\mathcal S(\mathbb R^d)$ から自身への連続な線形全単射であり、逆変換は

$$
f(x)=(2\pi)^{-d}\int e^{ix\cdot\xi}\widehat f(\xi)\,d\xi
$$

> で与えられる。
<!-- formal-statement-end -->

### 証明の見取り図

周波数微分を空間の多項式に、周波数の多項式を空間微分に変換します。

<!-- proof-start -->
### 証明

すべての $x^\beta f(x)$ は可積分です。実際、整数 $L>|\beta|+d$ に対して $|x^\beta f(x)|\le p_{L,0}(f)(1+|x|)^{|\beta|-L}$ であり、第2節と同じ半径積分で右辺は可積分です。周波数の第 $j$ 座標を $h$ だけ動かした差商には

$$
\left|\frac{e^{-ihx_j}-1}{h}\right|\le |x_j|
\quad(h\ne0)
$$

が成り立つので、各微分の差商はさらに一つ $|x_j|$ を掛けた可積分関数で支配できます。[優収束定理](../../../解析系/F0/F0-00D2B/index.md#thm-f0-00d2b-01)を繰り返し適用すると

$$
\partial_\xi^\beta\widehat f
=\widehat{(-ix)^\beta f}.
$$

部分積分により、任意の多重指数 $\alpha$ について

$$
(i\xi)^\alpha\partial_\xi^\beta\widehat f
=\widehat{\partial_x^\alpha[(-ix)^\beta f]}.
$$

境界項は急減少性から零です。例えば一座標で $u=(-ix)^\beta f$ とすれば $\int e^{-ix\cdot\xi}\partial_{x_j}u\,dx=i\xi_j\widehat u(\xi)$ となり、これを反復します。右辺の絶対値は被変換関数の $L^1$ ノルム（絶対値の積分）以下です。積の微分則で $\gamma\le\alpha$ を成分ごとの不等式として

$$
\partial_x^\alpha[(-ix)^\beta f]
=\sum_{\gamma\le\alpha}\binom{\alpha}{\gamma}
\partial_x^\gamma[(-ix)^\beta]\,
\partial_x^{\alpha-\gamma} f .
$$

各多項式因子の次数は高々 $|\beta|$ なので、整数 $L>|\beta|+d$ に対して

$$
\left\|\partial_x^\alpha[(-ix)^\beta f]\right\|_1
\le C_{\alpha,\beta,L}p_{L,|\alpha|}(f).
$$

出力側の重み次数を $N$、微分階数を $m$ とします。$(1+|\xi|)^N\le(1+\sum_j|\xi_j|)^N$ を展開し、$|\alpha|\le N,|\beta|\le m$ の有限個の評価を足すと

$$
p_{N,m}(\widehat f)\le C_{N,m,d}p_{m+d+1,N}(f).
$$

これで[Schwartz空間](#def-mqfc1-schwartz)の全条件と連続性が従います。

逆符号の変換も同じ評価を満たします。[一変数の反転定理](../../../解析系/FOU/FOU3/index.md#thm-fou3-inversion)を各座標に適用します。一座標 $t$ と残りの座標 $z$ に分け、部分変換を $H(\eta,z)=\int e^{-it\eta}f(t,z)\,dt$ と書きます。$a,b\ge0$ と残りの座標の多重指数 $\gamma,\lambda$ について

$$
(i\eta)^a z^\gamma\partial_\eta^b\partial_z^\lambda H
=\int e^{-it\eta}\partial_t^a[(-it)^b z^\gamma\partial_z^\lambda f(t,z)]\,dt.
$$

右辺の各項は、十分大きい半ノルムの定数倍と $(1+|t|)^{-2}$ の積で一様に抑えられます（多項式の総次数より2以上大きい重みを選びます）。したがって残りの座標も含めた急減少性が保たれます。各座標で関数と部分変換は可積分かつ連続で、反転定理の仮定がそろいます。従って[Fubiniの定理](../../../解析系/F0/F0-00D2C/index.md#thm-f0-00d2c-02)により順序を交換でき、各座標から $(2\pi)^{-1}$ が現れて逆変換式を得ます。逆向きにも同じ議論が成立するので全単射です。
<!-- proof-end -->

<a id="def-mqfc1-duality"></a>

<!-- formal-statement-start -->
> **定義（緩増加分布の微分とFourier変換）**  
> $T\in\mathcal S'$ に対し

$$
\begin{aligned}
\langle\partial^\alpha T,f\rangle
&=(-1)^{|\alpha|}\langle T,\partial^\alpha f\rangle,\\
\langle\widehat T,f\rangle
&=\langle T,\widehat f\rangle
\end{aligned}
$$

> と定める。双対作用は複素線形であって複素共役を含まない。
<!-- formal-statement-end -->

[超関数の微分](../../../解析系/GPDE/GPDE2/index.md#def-gpde2-distributional-derivative)と同じ符号規約です。$p_{N,m}(\partial^\alpha f)\le p_{N,m+|\alpha|}(f)$ であり、[Schwartz空間のFourier変換](#thm-mqfc1-fourier)も連続です。よって連続線形写像の合成として両者は再び緩増加分布です。$g\in L^1(\mathbb R^d)$ の場合、$\iint |g(x)f(\xi)|\,dx\,d\xi=\|g\|_1\|f\|_1<\infty$ なので[Fubiniの定理](../../../解析系/F0/F0-00D2C/index.md#thm-f0-00d2c-02)により

$$
\langle\widehat T_g,f\rangle
=\int g(x)\widehat f(x)\,dx
=\int \widehat g(\xi) f(\xi)\,d\xi.
$$

通常の変換と一致します。

<!-- definition-example-start: def-mqfc1-duality -->
### 直接例

**定義の確認**。一次元で $\delta_0'=\partial_x\delta_0$ と書くと、$\langle\delta_0',f\rangle=-f'(0)$、$\langle\widehat{\delta_0},f\rangle=\widehat f(0)=\int f(x)\,dx$ です。前者は $p_{0,1}$ で制御され、後者は[多項式増大関数による緩増加分布](#prop-mqfc1-polynomial)により緩増加分布です。つまり $\widehat{\delta_0}=1$ です。
<!-- definition-example-end -->

ここで分布への多項式の乗算を $\langle PT,f\rangle=\langle T,Pf\rangle$ と定めます。積の微分則によって、次数 $k$ の多項式 $P$ に対し $p_{N,m}(Pf)\le C p_{N+k,m}(f)$ となるので、この操作も緩増加分布を保ちます。特に周波数変数を $\xi$ とすると $P(\xi)=i\xi_j$ を使えます。

<a id="prop-mqfc1-derivative"></a>

<!-- formal-statement-start -->
> **命題（分布微分のFourier表示）**  
> $T\in\mathcal S'$ に対して $\widehat{\partial_j T}=i\xi_j\widehat T$ が成り立つ。
<!-- formal-statement-end -->

<!-- proof-start -->
### 証明

ここでは試験関数の入力を $\xi$、そのFourier変換の出力を $x$ と書きます。指数 $e^{-i\xi\cdot x}$ を $x_j$ で微分すると $-i\xi_j$ が現れるので、[Schwartz空間のFourier変換の証明](#thm-mqfc1-fourier)から $\partial_{x_j}\widehat f(x)=\widehat{-i\xi_j f}(x)$ です。[分布の双対定義](#def-mqfc1-duality)を順に適用すると、

$$
\begin{aligned}
\langle\widehat{\partial_j T},f\rangle
&=-\langle T,\partial_{x_j}\widehat f\rangle\\
&=\langle T,\widehat{i\xi_j f}\rangle\\
&=\langle\widehat T,i\xi_j f\rangle.
\end{aligned}
$$

右辺は先に定めた多項式乗算による $i\xi_j\widehat T$ の作用です。任意の $f$ で一致するので結論を得ます。
<!-- proof-end -->

## 4. 点評価と積はどこで失敗するか

一次元で[平滑化核](../../../解析系/GPDE/GPDE2/index.md#def-gpde2-mollifier)として非負の滑らかなコンパクト支持関数 $\rho$ を $\int\rho=1$、$\rho(0)>0$ となるように選び、$\rho_\varepsilon(x)=\varepsilon^{-1}\rho(x/\varepsilon)$ とします（$\varepsilon>0$）。

<a id="prop-mqfc1-product-failure"></a>

<!-- formal-statement-start -->
> **命題（点評価と積の連続拡張の障害）**  
> $\rho_\varepsilon\to\delta_0$ は各試験関数への作用の収束として成立する。しかし $\rho_\varepsilon(0)$ は発散し、$\rho_\varepsilon^2$ は緩増加分布として収束しない。
<!-- formal-statement-end -->

<!-- proof-start -->
### 証明

$\varepsilon>0$ なので変数変換 $x=\varepsilon y$ のJacobianは $\varepsilon$、すなわち $dx=\varepsilon\,dy$ です。第2節の[関数が定める分布](#prop-mqfc1-polynomial)として計算すると

$$
\langle\rho_\varepsilon,f\rangle=\int\rho(y)f(\varepsilon y)\,dy\longrightarrow f(0).
$$

[優収束定理](../../../解析系/F0/F0-00D2B/index.md#thm-f0-00d2b-01)の支配関数は $\rho(y)\|f\|_\infty$ です。一方、$\rho_\varepsilon(0)=\varepsilon^{-1}\rho(0)\to+\infty$ です。二乗については

$$
\varepsilon\langle\rho_\varepsilon^2,f\rangle
=\int\rho(y)^2f(\varepsilon y)\,dy
\longrightarrow f(0)\int\rho(y)^2\,dy.
$$

ここでも $\rho^2\|f\|_\infty$ が可積分な支配関数です。$f(x)=e^{-x^2}$ とすれば $f(0)=1$ で、$\rho(0)>0$ と連続性から $\int\rho^2>0$ です。従って $\langle\rho_\varepsilon^2,f\rangle$ は発散し、分布極限はありません。
<!-- proof-end -->

この反例は、通常の滑らかな関数上の点評価や積を、すべての緩増加分布にこの収束に関して連続に拡張することができないと示します。ここで必要なのは一つの試験関数への作用の発散だけです。全試験関数について発散することまで要求する必要はありません。特定の分布の積が別条件で定義できることや、発散を差し引く処方の存在を否定するものではありません。

## 5. 二点核と正値性

二つの重みに対する相関を考えます。二変数の普通の関数がない場合にも、直積空間の試験関数に作用する分布を使えます。$f\otimes g$ は $(x,y)\mapsto f(x)g(y)$ です。$\alpha,\beta$ をそれぞれ $x,y$ の多重指数とすると

$$
\partial_x^\alpha\partial_y^\beta(f\otimes g)
=(\partial^\alpha f)(x)(\partial^\beta g)(y).
$$

$1+|(x,y)|\le(1+|x|)(1+|y|)$ なので $p_{N,m}(f\otimes g)\le p_{N,m}(f)p_{N,m}(g)$ です。従って直積空間のSchwartz関数です。複素共役 $\overline f$ も同じ半ノルムを持ちます。[複素内積](../../../解析系/FOU/FOU4/index.md#def-fou4-complex-l2)と似た二変数の形式を考えますが、ここでは共役を第1引数に付けます（FOU4の規約とは逆です）。第1引数で共役線形、第2引数で線形な形式を半双線形形式と呼びます。

<a id="def-mqfc1-kernel"></a>

<!-- formal-statement-start -->
> **定義（二点分布核と正値性）**  
> $K\in\mathcal S'(\mathbb R^{2d})$ を二点分布核と呼び、対応する複素半双線形形式（第1引数で共役線形、第2引数で線形）を

$$
B_K(f,g)=\langle K,\overline f\otimes g\rangle
$$

> と定める（$f,g\in\mathcal S(\mathbb R^d)$）。すべての $f\in\mathcal S$ に対して $B_K(f,f)\ge0$（実数）なら正値型の核と呼ぶ。
<!-- formal-statement-end -->

<!-- definition-example-start: def-mqfc1-kernel -->
### 直接例

$K$ の線形性により $B_K(af+bh,g)=\overline aB_K(f,g)+\overline bB_K(h,g)$、$B_K(f,ag+bh)=aB_K(f,g)+bB_K(f,h)$ が成立します。これで二つの引数の線形性の違いが分かります。

**定義の確認**。対角核 $K$ を $\langle K,F\rangle=\int F(x,x)\,dx$ で定めます。$N>d$ のとき $|F(x,x)|\le p_{N,0}(F)(1+\sqrt2|x|)^{-N}$ なので絶対値の積分は $p_{N,0}(F)$ と有限な定数 $\int (1+\sqrt2|x|)^{-N}\,dx$ の積以下です（整数 $N>d$）。積分の線形性と[連続性判定](#def-mqfc1-tempered)で分布核だと確認できます。さらに

$$
B_K(f,f)=\int |f(x)|^2\,dx\ge0.
$$

一方、$-K$ は同じ意味で分布核ですが、非零の $f$ に対して負になります。核であること自体は正値性を保証しません。
<!-- definition-example-end -->

無限個の試験関数すべてを一度に調べる代わりに、有限個 $f_1,\ldots,f_n\in\mathcal S$ を選び、その線形結合 $f=\sum_j c_j f_j$ の正値性を調べます。$G_{ij}$ は第 $i$・第 $j$ の試験関数の組に対する作用の値で、$c=(c_1,\ldots,c_n)^T$ は係数列です。$G^*=\overline G^T$ は共役転置、$c^*=\overline c^T$ は行ベクトルです。$G^*=G$ かつ $c^*Gc$ がすべての $c$ で非負の実数になる行列をHermite正半定値と呼びます。試験関数が一次独立とは限らないため、この係数列は基底座標とは限りません。

<a id="prop-mqfc1-gram"></a>

<!-- formal-statement-start -->
> **命題（有限個の試験関数による正値性判定）**  
> 二点分布核が正値型であることと、任意の有限族 $f_1,\dots,f_n\in\mathcal S(\mathbb R^d)$（$n\ge1$）に対し次の行列がHermite正半定値であることは同値である。

$$
G_{ij}=B_K(f_i,f_j).
$$

> ここでHermite正半定値とは、すべての $c\in\mathbb C^n$ について次の条件を満たすことをいう。

$$
G^*=G,\qquad c^*Gc\ge0.
$$
<!-- formal-statement-end -->

<!-- proof-start -->
### 証明

[二点分布核の半双線形性](#def-mqfc1-kernel)から、$f=\sum_jc_j f_j$ とすれば

$$
B_K(f,f)=\sum_{i,j}\overline{c_i}c_jG_{ij}=c^*Gc.
$$

正値型ならこれは常に非負の実数です。$e_i$ を第 $i$ 成分だけ1で他が0の標準基底ベクトルとします。$c=e_i$ で $G_{ii}$ は非負の実数です。異なる添字 $i,j$（虚数単位はこの式では $\mathrm i$ と書きます）について

$$
\begin{aligned}
(e_i+e_j)^*G(e_i+e_j)&=G_{ii}+G_{jj}+G_{ij}+G_{ji},\\
(e_i+\mathrm i e_j)^*G(e_i+\mathrm i e_j)
&=G_{ii}+G_{jj}+\mathrm i(G_{ij}-G_{ji}).
\end{aligned}
$$

両式が実数なので $\operatorname{Im}(G_{ij}+G_{ji})=0$、$\operatorname{Re}(G_{ij}-G_{ji})=0$ です。従って $G_{ji}=\overline{G_{ij}}$ となり、Hermite正半定値です。逆向きは任意の $f$ に対して $n=1,f_1=f,c_1=1$ と選べば $B_K(f,f)\ge0$ が従います。
<!-- proof-end -->

対角核の例では $G_{ij}=\int\overline{f_i(x)}f_j(x)\,dx$ で、上の展開は $c^*Gc=\int|\sum_jc_jf_j(x)|^2\,dx$ になります。これは有限族の行列が元の正値性を表す具体例です。一般の連続双線形形式を分布核で表すSchwartz核定理はここでは使用しません。また並進不変な核 $K(x,y)=u(x-y)$ に対する正値性と一般の核の正値性を区別します。相関の正値性は次講以降でHilbert空間の内積を構成するための条件になります。

## 6. 演習

### 演習 MQFC1-A1：急減少

- Level: A
- 目安時間: 10分

一次元で $x^2 e^{-x^2}$ がSchwartz関数であることを示せ。

<!-- solution-start -->
#### 詳細解答

$P_0=x^2$ とし $P_{k+1}=P_k'-2xP_k$ とおくと第 $k$ 階微分は $P_k e^{-x^2}$ です。各 $P_k$ は多項式です。任意の $N$ に対し $(1+|x|)^N|P_k(x)|e^{-x^2}$ は連続で無限遠で零になるため有界です。有限個の微分の最大も有限なので[Schwartz空間の定義](#def-mqfc1-schwartz)を満たします。
<!-- solution-end -->

### 演習 MQFC1-A2：デルタの微分

- Level: A
- 目安時間: 10分

一次元で $a\in\mathbb R$ とする。$\langle\delta_a'',f\rangle$ を求め、連続性を示せ。

<!-- solution-start -->
#### 詳細解答

[分布微分の定義](#def-mqfc1-duality)を二度使うと $\langle\delta_a'',f\rangle=-\langle\delta_a',f'\rangle=\langle\delta_a,f''\rangle$ です。二回微分の符号は $(-1)^2=1$ なので $\langle\delta_a'',f\rangle=f''(a)$ です。絶対値は $p_{0,2}(f)$ 以下であり、緩増加分布です。
<!-- solution-end -->

### 演習 MQFC1-A3：平行移動したデルタ

- Level: A
- 目安時間: 10分

一次元の $\widehat{\delta_a}$ を求めよ。

<!-- solution-start -->
#### 詳細解答

[Fourier変換の双対定義](#def-mqfc1-duality)から

$$
\langle\widehat{\delta_a},f\rangle=\widehat f(a)
=\int e^{-ia\xi}f(\xi)\,d\xi.
$$

従って $\widehat{\delta_a}(\xi)=e^{-ia\xi}$ です。絶対値が1なので[多項式増大関数の命題](#prop-mqfc1-polynomial)も適用できます。
<!-- solution-end -->

### 演習 MQFC1-A4：非正値の核

- Level: A
- 目安時間: 10分

$K(x,y)=-1$ は分布核だが正値型ではないことを示せ。

<!-- solution-start -->
#### 詳細解答

定数関数は $\mathbb R^{2d}$ 上で[多項式増大条件](#prop-mqfc1-polynomial)を $A=1,q=0$ として満たします。$f$ は可積分なので $\iint|f(x)f(y)|\,dx\,dy=\|f\|_1^2<\infty$ です。[二点分布核の定義](#def-mqfc1-kernel)と[Fubiniの定理](../../../解析系/F0/F0-00D2C/index.md#thm-f0-00d2c-02)で積分を分離すると

$$
B_K(f,f)=-\left|\int f(x)\,dx\right|^2.
$$

$f=e^{-|x|^2}$ の積分は正なので負になり、正値型ではありません。
<!-- solution-end -->

### 演習 MQFC1-B1：定数分布の変換

- Level: B
- 目安時間: 15分

$d$ 次元の定数分布 $1$ のFourier変換を求め、$\widehat{\partial_j1}=0$ と整合することを示せ。

<!-- solution-start -->
#### 詳細解答

[Fourier反転式](#thm-mqfc1-fourier)を $x=0$ で使うと $\int\widehat f(\xi)\,d\xi=(2\pi)^df(0)$ です。従って $\langle\widehat1,f\rangle=(2\pi)^df(0)$、つまり $\widehat1=(2\pi)^d\delta_0$ です。また

$$
\langle i\xi_j\widehat1,f\rangle
=(2\pi)^d(i\xi_j f)(0)=0.
$$

[分布微分](#def-mqfc1-duality)により定数の分布微分は $-\int\partial_j f$ です。絶対可積分なのでFubiniの定理で第 $j$ 座標を先に積分すると、急減少によって両端の境界値は零となります。従って $\partial_j1=0$ で、[分布微分のFourier表示](#prop-mqfc1-derivative)と一致します。
<!-- solution-end -->

### 演習 MQFC1-B2：正規化した二乗の極限

- Level: B
- 目安時間: 15分

第4節の $\rho_\varepsilon$ に対し $\varepsilon\rho_\varepsilon^2$ の極限を求め、その値が $\rho$ に依存することを示せ。

<!-- solution-start -->
#### 詳細解答

[第4節の変数変換](#prop-mqfc1-product-failure)と同じ $x=\varepsilon y$、$dx=\varepsilon\,dy$ から $\langle\varepsilon\rho_\varepsilon^2,f\rangle=\int\rho(y)^2 f(\varepsilon y)\,dy$ となります。$\rho^2\|f\|_\infty$ で支配されるので極限は $f(0)\int\rho^2$ です。従って $(\int\rho^2)\delta_0$ に収束します。別の正規化関数 $\widetilde\rho(y)=2\rho(2y)$ は積分1ですが、

$$
\int\widetilde\rho(y)^2\,dy
=4\int\rho(2y)^2\,dy
=2\int\rho(u)^2\,du.
$$

最後の等号は $u=2y$、$dy=du/2$ によります。係数が2倍になります。この処方は元の分布だけから一意には決まりません。
<!-- solution-end -->

### 演習 MQFC1-B3：階数1の核

- Level: B
- 目安時間: 20分

$h\in\mathcal S$ とし $K(x,y)=h(x)\overline{h(y)}$ とする。緩増加分布であることと正値性を示し、有限族の行列を求めよ。

<!-- solution-start -->
#### 詳細解答

$h$ は有界なので $K$ も有界で、[多項式増大関数の命題](#prop-mqfc1-polynomial)により緩増加分布です。$z_j=\int\overline{h(y)}f_j(y)\,dy$ とおきます。$|h f_j|$ は可積分なので[Fubiniの定理](../../../解析系/F0/F0-00D2C/index.md#thm-f0-00d2c-02)で

$$
\begin{aligned}
B_K(f_i,f_j)
&=\iint h(x)\overline{f_i(x)}\,
        \overline{h(y)}f_j(y)\,dx\,dy\\
&=\left(\int h(x)\overline{f_i(x)}\,dx\right)
  \left(\int\overline{h(y)}f_j(y)\,dy\right)
=\overline{z_i}z_j.
\end{aligned}
$$

したがって

$$
G_{ij}=\overline{z_i}z_j,\qquad
c^*Gc=\left|\sum_j c_jz_j\right|^2.
$$

$G_{ji}=\overline{G_{ij}}$ も成立するので[有限族による正値性判定](#prop-mqfc1-gram)から正値型です。各列は共通ベクトル $(\overline{z_i})_i$ の倍数なので行列の階数は高々1です。すべての $z_j$ が零なら階数0、そうでなければ階数1です。
<!-- solution-end -->

### 演習 MQFC1-C1：差を測る正値核

- Level: C
- 目安時間: 30分

一次元で $a\ne0$ とし、$K$ を

$$
\langle K,F\rangle=2F(0,0)+F(a,a)-F(0,a)-F(a,0)
$$

と定める。連続性、正値性、$B_K(f,f)=0$ の条件を示し、この零条件が $f=0$ を意味しない理由を説明せよ。

<!-- solution-start -->
#### 詳細解答

各[Dirac分布の点評価](#def-mqfc1-tempered)は $p_{0,0}(F)$ 以下なので、係数の絶対値の和 $2+1+1+1=5$ から $|\langle K,F\rangle|\le5p_{0,0}(F)$ です。線形汎関数の線形結合なので線形であり、分布核です。[二点分布核の定義](#def-mqfc1-kernel)に $F(x,y)=\overline{f(x)}f(y)$ を代入し、$u=f(0),v=f(a)$ とすると

$$
\begin{aligned}
B_K(f,f)&=2|u|^2+|v|^2-\overline uv-\overline vu\\
&=|u|^2+|u-v|^2\ge0.
\end{aligned}
$$

両方の平方が零となる条件は $u=0$ かつ $u-v=0$、すなわち $f(0)=f(a)=0$ です。例えば $f(x)=x(x-a)e^{-x^2}$ はこの条件を満たします。演習MQFC1-A1と同じ多項式とGaussianの積の微分評価でSchwartz関数であり、$x=a/2$ で非零です。従って正値型でも零ノルムの非零試験関数が存在し、内積を作るにはそのような方向を同一視する必要があります。
<!-- solution-end -->

## 7. 次の講義

試験関数の空間、連続な分布、そのFourier変換と二点核の正値性を得ました。次のMQFC2では数値の代わりに共通稠密定義域上の作用素を返す場を扱います。正値性はHilbert空間との接続に、点評価と積の失敗は相互作用のくりこみの必要性につながります。
