# HA10 振動積分と定常位相法

[FOU3のFourier変換](../../FOU/FOU3/index.md#def-fou3-fourier-transform)では振動する指数関数を積分し、[HA9のFourier乗数](../HA9/index.md#def-ha9-multiplier)では周波数側の滑らかさを空間側の減衰へ結び付けました。今度は、指数関数の中の位相が急速に変化するとき、積分そのものがどの程度打ち消し合うかを調べます。

例えば $e^{i\lambda x}$ は $\lambda$ を大きくすると激しく振動します。滑らかな重みを掛けて積分すれば、正負の振動が相殺し、高速に小さくなります。しかし $e^{i\lambda x^2/2}$ は $x=0$ で振動の速さが一度止まり、減衰は一般に $\lambda^{-1/2}$ 程度です。この差から「**停留点（位相の勾配が零となる点）**を探し、そこでの二次近似を測る」という定常位相法が生まれます。

全章を通じて $\lambda\ge1$ は振動の強さを表す実数です。$C_c^\infty(U)$ は開集合 $U\subset\mathbb R^n$ 内にコンパクトな台を持つ無限回微分可能関数の空間です。$a$ を**振幅**、実数値関数 $\phi$ を**位相**と呼び、

$$
I(\lambda)=\int_{\mathbb R^n}e^{i\lambda\phi(x)}a(x)\,dx
$$

を振動積分と呼びます。ここでは積分の絶対収束を保証するため $a\in C_c^\infty(U)$ を主に考えます。Fourier変換は

$$
\widehat f(\xi)=\int_{\mathbb R^n}e^{-ix\cdot\xi}f(x)\,dx,\qquad
f(x)=(2\pi)^{-n}\int_{\mathbb R^n}e^{ix\cdot\xi}\widehat f(\xi)\,d\xi
$$

と正規化し、後者は滑らかなコンパクト台関数には[FOU3の反転定理](../../FOU/FOU3/index.md#thm-fou3-inversion)から従います。

## 1. 停留点と非退化性をどう判定するか

位相の一次変化は勾配で表せます。[VC1の勾配](../../../幾何系/VC/VC1/index.md#def-vc1-gradient)を使い、点 $p$ での一次項が消えることを停留点の条件とします。その点で最初に残る二次項を記録する行列が、**Hessian（Hesse行列）**です。

具体的に、$\phi$ が $C^2$ 級であるとき、$H_\phi(p)$ の第 $j,k$ 成分は $\partial_j\partial_k\phi(p)$ です。二階偏導関数が連続なので行列は対称で、[多変数Taylor展開](../../../基礎科目/RA/RA6/index.md#thm-ra6-second-order-taylor)により $h\to0$ で

$$
\phi(p+h)=\phi(p)+\nabla\phi(p)\cdot h
+\frac12h^{\mathsf T}H_\phi(p)h+o(|h|^2)
$$

となります。対称行列の正の固有値の個数を $n_+$、負の固有値の個数を $n_-$（重複度込み）とし、零固有値がない場合の差 $n_+-n_-$ を**符号数**と呼びます。これは実対称行列を直交基底で対角化して定めた量です。

<a id="def-ha10-critical"></a>
<!-- formal-statement-start -->
> **定義（停留点・非退化臨界点と符号数）**  
> $U\subset\mathbb R^n$ は開、$\phi\in C^2(U;\mathbb R)$ とする。$p\in U$ が $\nabla\phi(p)=0$ を満たすとき $p$ を位相の停留点（臨界点）という。さらに $\det H_\phi(p)\ne0$ のとき **非退化臨界点**という。非退化点の符号数は

$$
\operatorname{sgn}H_\phi(p)=n_+(H_\phi(p))-n_-(H_\phi(p))
$$

> と定義する。$n_++n_-=n$ である。
<!-- formal-statement-end -->

<!-- definition-example-start: def-ha10-critical -->
**定義の確認**　$\phi(x,y)=x^2-3y^2+2x$ を考えます。定義の一次条件は

$$
\nabla\phi(x,y)=(2x+2,-6y)=0
\quad\Longleftrightarrow\quad p=(-1,0)
$$

です。二次項は

$$
H_\phi(p)=\begin{pmatrix}2&0\\0&-6\end{pmatrix},
\qquad \det H_\phi(p)=-12\ne0.
$$

従って $p$ は非退化です。固有値は $2,-6$ なので $n_+=n_-=1$、符号数は $0$ です。単に行列式を計算したのではなく、最初に勾配が零となる点を求め、その二次変化を表示する行列の可逆性を確認しました。
<!-- definition-example-end -->

この定義は、一般の位相を最小例 $\phi(x)=x$（停留点なし）と $\phi(x)=x^2/2$（停留点 $0$、Hessian $1$）に分類する道具です。一方 $\phi(x)=x^4$ も停留点 $0$ を持ちますが、二階微分が零なので非退化ではありません。この差が減衰指数に現れます。

## 2. 停留点がなければ何度でも部分積分できる

一次元で $\phi'(x)\ne0$ なら、$e^{i\lambda\phi(x)}$ を微分すると $i\lambda\phi'(x)$ 倍になります。これを逆に利用して指数関数を一回ずつ部分積分する方法は、勾配が零でない多変数の場合にも通用します。

<a id="prop-ha10-nonstationary"></a>
<!-- formal-statement-start -->
> **命題（非停留領域の速い減衰）**  
> $U\subset\mathbb R^n$ は開、$\phi\in C^\infty(U;\mathbb R)$、$a\in C_c^\infty(U)$ とし、$\operatorname{supp}a$ 上で $|\nabla\phi|\ge c>0$ とする。このとき任意の整数 $N\ge1$ に対して $C_N<\infty$ が存在し、すべての $\lambda\ge1$ に対して

$$
\left|\int_Ue^{i\lambda\phi(x)}a(x)\,dx\right|\le C_N\lambda^{-N}
$$

> が成立する。$C_N$ は $N,c$、台付近の位相の微分、振幅の微分に依存する。
<!-- formal-statement-end -->

### 証明の見取り図

指数関数に作用して恒等写像となる微分作用素を作ります。転置に当たる部分積分を $N$ 回繰り返すたび、振幅側へ微分が移り、$\lambda^{-1}$ が一つずつ現れます。勾配の下界は途中の分母を制御します。

<!-- proof-start -->
### 証明

台の近傍で

$$
V(x)=\frac{\nabla\phi(x)}{|\nabla\phi(x)|^2},
\qquad
L=\frac{1}{i\lambda}V\cdot\nabla
$$

とおきます。$\nabla e^{i\lambda\phi}=i\lambda(\nabla\phi)e^{i\lambda\phi}$ だから

$$
Le^{i\lambda\phi}
=\frac{V\cdot(i\lambda\nabla\phi)}{i\lambda}e^{i\lambda\phi}
=e^{i\lambda\phi}.
$$

台がコンパクトなので境界項はなく、一回の部分積分は

$$
I(\lambda)=-\frac{1}{i\lambda}
\int_Ue^{i\lambda\phi}\operatorname{div}(aV)\,dx
$$

です。$D^*b=-\operatorname{div}(bV)$ とおけば

$$
I(\lambda)=(i\lambda)^{-N}
\int_Ue^{i\lambda\phi}(D^*)^Na\,dx.
$$

$\operatorname{supp}(D^*)^Na\subset\operatorname{supp}a$ で、$V$ と必要な導関数はこの台で有界です。よって $(D^*)^Na\in L^1$ かつ $\|(D^*)^Na\|_1$ は $\lambda$ に依存しません。絶対値を取れば

$$
|I(\lambda)|\le\lambda^{-N}\|(D^*)^Na\|_1.
$$
<!-- proof-end -->

**直接計算**　$\phi(x)=x$ では $V=1$ です。$a\in C_c^\infty(\mathbb R)$ に対して

$$
\int e^{i\lambda x}a(x)\,dx
=(-1)^N(i\lambda)^{-N}\int e^{i\lambda x}a^{(N)}(x)\,dx
$$

となり、振幅を何回でも微分できることが速い減衰の理由です。非停留点では二次近似は必要ありません。

## 3. 二階微分が消えない一次元位相

停留点があっても二階微分が零でなければ、一次導関数はその周りで速く変化します。一次導関数が小さい場所を短い区間に閉じ込め、残りを部分積分するのが **van der Corput 補題**の基本形です。

<a id="lem-ha10-vdc"></a>
<!-- formal-statement-start -->
> **補題（van der Corput の二階微分評価）**  
> 有限区間 $[u,v]$ 上 $\phi\in C^2([u,v];\mathbb R)$ とし、$|\phi''(x)|\ge\kappa>0$ が全点で成立するとする。$a\in C^1([u,v];\mathbb C)$ に対し、ある絶対定数 $C$ で

$$
\left|\int_u^v e^{i\lambda\phi(x)}a(x)\,dx\right|
\le C(\lambda\kappa)^{-1/2}
\left(\|a\|_\infty+\int_u^v|a'(x)|\,dx\right),
\qquad\lambda>0
$$

> が成立する。区間の長さに依存する係数は不要である。
<!-- formal-statement-end -->

### 証明の見取り図

連続な $\phi''$ の符号は区間で一定なので $\phi'$ は単調です。$|\phi'|\le t$ の部分の長さを平均値定理で抑え、残る高振動領域には一回の部分積分を使います。閾値 $t$ は二つの誤差を同程度にするよう選びます。

<!-- proof-start -->
### 証明

まず振幅が $1$ の積分を任意の部分区間 $J\subset[u,v]$ で評価します。$\phi'$ が単調で傾きの絶対値が $\kappa$ 以上なので

$$
E_t=\{x\in J:|\phi'(x)|\le t\}
$$

は区間（または空集合）であり、その長さは $2t/\kappa$ 以下です。従って $E_t$ 上の積分の絶対値も $2t/\kappa$ 以下です。

$J\setminus E_t$ は高々二つの区間で、各区間では $|\phi'|\ge t$ です。一つの区間 $[c,d]$ で部分積分すると

$$
\int_c^d e^{i\lambda\phi(x)}\,dx
=\left[\frac{e^{i\lambda\phi(x)}}{i\lambda\phi'(x)}\right]_c^d
+\frac{1}{i\lambda}\int_c^d
e^{i\lambda\phi(x)}\frac{\phi''(x)}{(\phi'(x))^2}\,dx.
$$

$\phi'$ は単調で符号が一定なので、最後の積分の絶対値は

$$
\frac{1}{\lambda}\int_c^d\frac{|\phi''|}{|\phi'|^2}\,dx
=\frac{1}{\lambda}
\left|\frac1{\phi'(c)}-\frac1{\phi'(d)}\right|
\le\frac{1}{\lambda t}.
$$

境界二項は合わせて $2/(\lambda t)$ 以下です。二区間を足すと

$$
\left|\int_J e^{i\lambda\phi(x)}\,dx\right|
\le\frac{2t}{\kappa}+\frac{6}{\lambda t}.
$$

$t=(\kappa/\lambda)^{1/2}$ と選ぶと、すべての $J$ に一様な上界 $8(\lambda\kappa)^{-1/2}$ を得ます。

$F(s)=\int_u^s e^{i\lambda\phi(x)}\,dx$ とすると、上の評価から $\|F\|_\infty\le8(\lambda\kappa)^{-1/2}$ です。最後に

$$
\int_u^v e^{i\lambda\phi(x)}a(x)\,dx
=F(v)a(v)-\int_u^v F(x)a'(x)\,dx
$$

と積分すれば、主張は $C=8$ で成立します。
<!-- proof-end -->

**定義への戻り道**　$\phi(x)=x^2/2$ では $\phi''=1$、停留点は $0$ です。補題は $O(\lambda^{-1/2})$ を保証しますが、係数や振動の位相までは求めません。次の節でそれらを求めます。

## 4. 非退化点の近くでは二次形式に直せる

多次元の停留点は二階微分をまとめた Hessian で測ります。しかし Taylor の $o(|h|^2)$ をそのまま指数関数の中へ代入すると、$\lambda$ 倍された誤差の扱いが難しくなります。そこで、十分小さい近傍では**滑らかな座標変換によって位相を正確な二次形式へ変える**ことを証明します。

<a id="lem-ha10-morse"></a>
<!-- formal-statement-start -->
> **補題（非退化臨界点の局所二次標準形）**  
> $U\subset\mathbb R^n$ は開、$\phi\in C^\infty(U;\mathbb R)$ とし、$p\in U$ は非退化臨界点とする。$p$ の近傍で滑らかな座標 $z=z(x)$ を取り、$z(p)=0$、$Dz(p)$ は可逆で、

$$
\phi(x)=\phi(p)+\frac12\sum_{j=1}^n\varepsilon_jz_j(x)^2,
\qquad \varepsilon_j\in\{-1,1\}
$$

> と表せる。正の符号の個数は $n_+(H_\phi(p))$、負の符号の個数は $n_-(H_\phi(p))$ と一致し、

$$
|\det Dz(p)|=\sqrt{|\det H_\phi(p)|}.
$$

<!-- formal-statement-end -->

### 証明の見取り図

Taylor の二次形式を、**点に依存する対称行列**を用いて剰余なしに書きます。その行列を局所的に三角行列と対角行列へ分解し、符号を保つ平方根を座標へ吸収します。最後は[RA6Aの逆関数定理](../../../基礎科目/RA/RA6A/index.md#thm-ra6a-inverse-function)で本当に座標になっていることを確認します。

<!-- proof-start -->
### 証明

平行移動して $p=0$ とします。$g(t)=\phi(tx)$ と置き、一次元の積分型 Taylor 公式を $t=0$ で適用します。$g'(0)=\nabla\phi(0)\cdot x=0$ なので

$$
\begin{aligned}
\phi(x)-\phi(0)
&=\int_0^1(1-t)g''(t)\,dt\\
&=\int_0^1(1-t)\sum_{j,k}x_jx_k\partial_j\partial_k\phi(tx)\,dt\\
&=\frac12x^{\mathsf T}Q(x)x,
\end{aligned}
$$

ただし

$$
Q(x)=2\int_0^1(1-t)H_\phi(tx)\,dt,\qquad
Q(0)=H_\phi(0).
$$

$Q(x)$ は滑らかな実対称行列です。定数の直交座標変換で $Q(0)$ を固有値がすべて非零の対角行列にします。以降その座標を $x$ と書きます。

$Q(0)$ の左上からの各主小行列式は非零なので、連続性から $x$ が十分小さいときも非零です。その近傍で、通常の平方完成を第一変数から繰り返すと

$$
Q(x)=L(x)D(x)L(x)^{\mathsf T}
$$

となります。$L$ は対角成分が $1$ の下三角行列、$D=\operatorname{diag}(d_1,\ldots,d_n)$ は対角行列です。各 $d_j(x)$ は行列成分の四則演算と非零の主小行列式によって滑らかに決まり、$d_j(0)$ は元の非零固有値です。

$d_j(x)$ は小近傍で符号を変えないので、$\varepsilon_j=\operatorname{sgn}d_j(0)$ とおき

$$
z_j(x)=\sqrt{|d_j(x)|}\,(L(x)^{\mathsf T}x)_j
$$

と定めます。すると

$$
\frac12x^{\mathsf T}Q(x)x
=\frac12\sum_j d_j(x)(L(x)^{\mathsf T}x)_j^2
=\frac12\sum_j\varepsilon_j z_j(x)^2.
$$

$z(0)=0$ かつ $Dz(0)$ は、可逆な $L(0)^{\mathsf T}$ と正の対角行列の積ですから可逆です。[逆関数定理](../../../基礎科目/RA/RA6A/index.md#thm-ra6a-inverse-function)の仮定（滑らかさ、Jacobianの可逆性）を満たし、$z$ は局所座標です。

二回微分して $H_\phi(0)=Dz(0)^{\mathsf T}J Dz(0)$（$J=\operatorname{diag}(\varepsilon_j)$）を得ます。行列式を取れば

$$
\det H_\phi(0)=(\det Dz(0))^2\det J,\qquad |\det J|=1,
$$

よって最後の式が従います。正負の個数は平方完成の各ピボットの符号であり、実対称形式の慣性（可逆な座標変換で変わらない正負次数）と一致します。ここでは $Q(0)$ を対角化したため、その符号の個数は直接 $\varepsilon_j$ に表れています。
<!-- proof-end -->

**低次元の確認**　$\phi(x,y)=x^2-y^2$ なら $Q=\operatorname{diag}(2,-2)$、$z_1=\sqrt2x$、$z_2=\sqrt2y$ と置けば $\phi=(z_1^2-z_2^2)/2$ です。$|\det Dz|=2=\sqrt{|\det H_\phi|}$ も確認できます。

## 5. 二次位相の積分係数を決める

二次標準形の積分を評価するには、Gaussian のFourier変換を使います。実数の減衰を少し入れて絶対可積分にし、その係数を連続的に零へ近づけます。[FOU3のGaussian変換](../../FOU/FOU3/index.md#lem-fou3-gaussian-transform)が出発点です。

<a id="lem-ha10-quadratic"></a>
<!-- formal-statement-start -->
> **補題（二次位相の漸近公式）**  
> $J=\operatorname{diag}(\varepsilon_1,\ldots,\varepsilon_n)$、$\varepsilon_j\in\{-1,1\}$、$b\in C_c^\infty(\mathbb R^n)$ とする。$\operatorname{sgn}J=\sum_j\varepsilon_j$ とおく。$\lambda\ge1$ に対し

$$
\int_{\mathbb R^n}e^{i\lambda z^{\mathsf T}Jz/2}b(z)\,dz
=\left(\frac{2\pi}{\lambda}\right)^{n/2}
e^{i\pi\operatorname{sgn}J/4}
\left(b(0)+O_b(\lambda^{-1})\right).
$$

> 誤差定数は $b$ と $n$ に依存し、$\lambda$ に依存しない。
<!-- formal-statement-end -->

### 証明の見取り図

振幅を Fourier 反転して指数関数へ分解し、各座標の Gaussian 振動積分を順に計算します。位相の符号が正なら $e^{i\pi/4}$、負なら $e^{-i\pi/4}$ が一つずつ出ます。残った Fourier 側の指数の差を $O(\lambda^{-1}|\eta|^2)$ で抑えます。

<!-- proof-start -->
### 証明

$[\,\widehat b(\eta)=\int e^{-iz\cdot\eta}b(z)\,dz\,]$ とし、[Fourier反転](../../FOU/FOU3/index.md#thm-fou3-inversion)より

$$
b(z)=(2\pi)^{-n}\int_{\mathbb R^n}e^{iz\cdot\eta}\widehat b(\eta)\,d\eta.
$$

$\widehat b$ は急減少で、$\int(1+|\eta|^2)|\widehat b(\eta)|\,d\eta<\infty$ です。実際、各座標で何度も部分積分すると $\eta^\alpha\widehat b(\eta)$ が有界となるためです。

まず $\epsilon>0$ とし、$\exp(-\epsilon|z|^2/2)$ を掛けた積分を考えます。絶対可積分なので Fubini を適用でき、Gaussian の変換公式を複素係数 $\epsilon-i\lambda\varepsilon_j$ に拡張して各座標で計算すると

$$
\begin{aligned}
&\int e^{-\epsilon|z|^2/2}
e^{i\lambda z^{\mathsf T}Jz/2+i z\cdot\eta}\,dz\\
&\qquad=(2\pi)^{n/2}
\prod_{j=1}^n(\epsilon-i\lambda\varepsilon_j)^{-1/2}
\exp\left(-\frac12\sum_{j=1}^n
\frac{\eta_j^2}{\epsilon-i\lambda\varepsilon_j}\right).
\end{aligned}
$$

平方根は正の実部を持つ領域から連続に取ります。$\epsilon\downarrow0$ のとき

$$
(\epsilon-i\lambda\varepsilon_j)^{-1/2}
\longrightarrow\lambda^{-1/2}e^{i\pi\varepsilon_j/4},
\qquad
\frac{1}{\epsilon-i\lambda\varepsilon_j}
\longrightarrow \frac{i\varepsilon_j}{\lambda}.
$$

右辺の指数の絶対値は $\le1$、係数も $\lambda^{-n/2}$ 以下なので、$\widehat b\in L^1$ による優収束を適用できます。左辺は $b\in L^1$ だから同じく優収束可能です。結果として

$$
\begin{aligned}
I_J(\lambda)
&=\left(\frac{2\pi}{\lambda}\right)^{n/2}
e^{i\pi\operatorname{sgn}J/4}
(2\pi)^{-n}\int\widehat b(\eta)
e^{-i\eta^{\mathsf T}J\eta/(2\lambda)}\,d\eta.
\end{aligned}
$$

最後に $|e^{-it}-1|\le |t|$、$|\eta^{\mathsf T}J\eta|\le|\eta|^2$ を使うと

$$
\left|(2\pi)^{-n}\int\widehat b(\eta)
\left(e^{-i\eta^{\mathsf T}J\eta/(2\lambda)}-1\right)d\eta\right|
\le\frac{(2\pi)^{-n}}{2\lambda}
\int|\eta|^2|\widehat b(\eta)|\,d\eta.
$$

Fourier反転の $z=0$ での値は $(2\pi)^{-n}\int\widehat b=b(0)$ ですから、結論を得ます。
<!-- proof-end -->

ここでの $n/2$ は**積分変数の次元の半分**です。$n=1$ なら $\lambda^{-1/2}$、$n=2$ なら $\lambda^{-1}$ となり、複素位相 $e^{i\pi\operatorname{sgn}J/4}$ は正負の曲率方向を区別します。

## 6. 定常位相法の主定理

局所二次化と Gaussian 積分を組み合わせます。位相が停留しない領域は[非停留評価](#prop-ha10-nonstationary)で任意の冪より速く減衰するため、主要項は非退化臨界点に集中します。

<a id="thm-ha10-stationary-phase"></a>
<!-- formal-statement-start -->
> **定理（非退化停留点の定常位相公式）**  
> $U\subset\mathbb R^n$ は開、$\phi\in C^\infty(U;\mathbb R)$、$a\in C_c^\infty(U;\mathbb C)$ とする。$\operatorname{supp}a$ と交わる $\phi$ の臨界点が有限個 $p_1,\ldots,p_m$ で、すべて $\det H_\phi(p_j)\ne0$ を満たすとする。$\lambda\to+\infty$ で

$$
\begin{aligned}
\int_U e^{i\lambda\phi(x)}a(x)\,dx
&=\left(\frac{2\pi}{\lambda}\right)^{n/2}
\sum_{j=1}^m
\frac{e^{i\lambda\phi(p_j)}
e^{i\pi\operatorname{sgn}H_\phi(p_j)/4}}
{\sqrt{|\det H_\phi(p_j)|}}a(p_j)\\
&\qquad+O(\lambda^{-n/2-1}).
\end{aligned}
$$

> 誤差定数は $a,\phi$ および臨界点近傍に依存する。臨界点がなければ積分は任意の $N$ に対し $O(\lambda^{-N})$ である。
<!-- formal-statement-end -->

### 証明の見取り図

各臨界点の近くで滑らかな分割関数を一つずつ取り、それ以外に台を持つ成分と合わせます。臨界点の周りには[局所二次標準形](#lem-ha10-morse)、その後に[二次位相公式](#lem-ha10-quadratic)を使います。座標変換の Jacobian が Hessian の行列式の平方根を分母に生みます。

<!-- proof-start -->
### 証明

各 $p_j$ は[局所二次標準形](#lem-ha10-morse)によって孤立しています。互いに交わらない小近傍 $U_j$ を選び、$p_j$ で $1$、$U_j$ 外で $0$ となる滑らかな $\chi_j$ を取ります。$\chi_0=1-\sum_{j=1}^m\chi_j$ とし、

$$
a=\chi_0a+\sum_{j=1}^m\chi_j a.
$$

$\chi_0a$ の台には停留点がないので、コンパクト性により $|\nabla\phi|\ge c>0$ です。[非停留命題](#prop-ha10-nonstationary)からその積分は任意の $N$ について $O(\lambda^{-N})$ です。

$j$ を固定し、$x\mapsto z$ を[局所二次標準形](#lem-ha10-morse)の写像とします。座標変換すると

$$
\begin{aligned}
\int_{U_j}e^{i\lambda\phi(x)}\chi_j(x)a(x)\,dx
&=e^{i\lambda\phi(p_j)}
\int e^{i\lambda z^{\mathsf T}J_jz/2}b_j(z)\,dz,\\
b_j(z)&=\chi_j(x(z))a(x(z))\,|\det Dx(z)|.
\end{aligned}
$$

$J_j$ は符号が $\pm1$ の対角行列であり、$\operatorname{sgn}J_j=\operatorname{sgn}H_\phi(p_j)$ です。さらに $\chi_j(p_j)=1$ であるから

$$
b_j(0)=a(p_j)|\det Dx(0)|
=\frac{a(p_j)}{|\det Dz(p_j)|}
=\frac{a(p_j)}{\sqrt{|\det H_\phi(p_j)|}}.
$$

[二次位相補題](#lem-ha10-quadratic)を $b_j,J_j$ へ適用すると

$$
\int_{U_j}e^{i\lambda\phi}\chi_ja\,dx
=e^{i\lambda\phi(p_j)}
\left(\frac{2\pi}{\lambda}\right)^{n/2}
e^{i\pi\operatorname{sgn}H_\phi(p_j)/4}
\left(
\frac{a(p_j)}{\sqrt{|\det H_\phi(p_j)|}}
+O(\lambda^{-1})\right).
$$

点の個数は有限なので誤差を加算しても $O(\lambda^{-n/2-1})$ です。非停留成分には $N>n/2+1$ を選べば同じ誤差へ吸収できます。
<!-- proof-end -->

**適用の実例**　$n=2$、$\phi(x,y)=x^2-y^2$、$a\in C_c^\infty$ が原点近くに台を持ち $a(0,0)=1$ とします。唯一の停留点は原点、Hessianは $\operatorname{diag}(2,-2)$、行列式の絶対値は $4$、符号数は $0$ なので、

$$
\int e^{i\lambda(x^2-y^2)}a(x,y)\,dx\,dy
=\frac{\pi}{\lambda}+O(\lambda^{-2}).
$$

符号数が零でも Hessian の行列式の絶対値を忘れてはいけません。

## 7. 球面の Fourier 変換に曲率が現れる

Fourier restriction を考える際、まず曲面に分布した測度の Fourier 変換を評価します。$d\ge2$、$S^{d-1}=\{x\in\mathbb R^d:|x|=1\}$ とし、$\sigma$ を通常の**球面面積測度**とします。その Fourier 変換とは

$$
\widehat\sigma(\xi)=\int_{S^{d-1}}e^{-i\xi\cdot x}\,d\sigma(x)
$$

です。有限測度なので積分は定義できます。球面では曲率が零でないため、接平面方向に二次の位相変化が現れ、$d-1$ 個の接方向すべてが減衰に寄与します。

<a id="ref-ha10-area-element"></a>
局所的に曲面を $F(u)=(u,h(u))$ と表示したとき、各座標方向の接ベクトルは $\partial_jF=e_j+(\partial_jh)e_d$ です。これらの内積から作る Gram 行列は

$$
G=(\partial_jF\cdot\partial_kF)_{j,k}
=I_{d-1}+\nabla h(\nabla h)^{\mathsf T}.
$$

曲面の小面積は接ベクトルの張る平行多面体の体積であり、$d\sigma=\sqrt{\det G}\,du$ です。$\nabla h$ に垂直な方向の $G$ の固有値は $1$、$\nabla h$ に平行な方向では $1+|\nabla h|^2$ なので、

$$
d\sigma=\sqrt{1+|\nabla h|^2}\,du
$$

と求まります。この関係を両極の座標で直接使います。

<a id="thm-ha10-sphere"></a>
<!-- formal-statement-start -->
> **定理（球面面積測度のFourier減衰）**  
> $d\ge2$ とする。$r=|\xi|\to+\infty$ のとき

$$
\begin{aligned}
\widehat\sigma(\xi)
&=\left(\frac{2\pi}{r}\right)^{(d-1)/2}
\left[
e^{-ir+i\pi(d-1)/4}
+e^{ir-i\pi(d-1)/4}
\right]\\
&\qquad+O(r^{-(d+1)/2}),
\end{aligned}
$$

> かつ任意の $\xi\in\mathbb R^d$ に対して

$$
|\widehat\sigma(\xi)|\le C_d(1+|\xi|)^{-(d-1)/2}.
$$

> 誤差と定数は $\xi/|\xi|$ によらず一様である。
<!-- formal-statement-end -->

### 証明の見取り図

回転で $\xi=re_d$ と置きます。球面上の位相 $-x_d$ は北極と南極だけで停留します。北極付近の局所座標 $u\in\mathbb R^{d-1}$ では $x_d=\sqrt{1-|u|^2}$ なので、位相の Hessian は $+I_{d-1}$、南極では $-I_{d-1}$ です。球面積の Jacobian は両極で $1$ となり、[定常位相定理](#thm-ha10-stationary-phase)の係数を全て決定します。

<!-- proof-start -->
### 証明

球面測度は回転で不変なので、$\xi\ne0$ に対し回転して $\xi=re_d$ としてよいです。球面上の位相は $\phi(x)=-x_d$ で、接ベクトル $v$ に対する方向微分は $-v_d$ です。すべての接ベクトルでこれが零になるのは、法線 $x$ が $e_d$ と平行な $x=\pm e_d$ のみです。

北極付近では $u=(x_1,\ldots,x_{d-1})$ を用いて

$$
x=(u,\sqrt{1-|u|^2}),\qquad
\phi_N(u)=-\sqrt{1-|u|^2}.
$$

[上で導いた局所グラフの面積要素](#ref-ha10-area-element)をこのグラフへ適用します。$h(u)=\sqrt{1-|u|^2}$、$\nabla h=-u/\sqrt{1-|u|^2}$ なので

$$
\sqrt{1+|\nabla h|^2}
=\sqrt{1+\frac{|u|^2}{1-|u|^2}}
=(1-|u|^2)^{-1/2}.
$$

よって $d\sigma=(1-|u|^2)^{-1/2}du$ です。北極では振幅が $1$、位相は $\phi_N(0)=-1$、勾配は $0$ で、

$$
D^2\phi_N(0)=I_{d-1},\quad
|\det D^2\phi_N(0)|=1,\quad
\operatorname{sgn}D^2\phi_N(0)=d-1.
$$

同様に南極では

$$
\phi_S(u)=+\sqrt{1-|u|^2},\quad
\phi_S(0)=1,\quad
D^2\phi_S(0)=-I_{d-1},
$$

従って行列式の絶対値は $1$、符号数は $-(d-1)$、面積振幅は $1$ です。

両極を囲う滑らかな切断関数を取り、球面の残りを有限個の座標パッチに分けます。残る各パッチでは接方向の位相勾配が零にならないため、座標表示で[非停留命題](#prop-ha10-nonstationary)を適用して任意の冪で減衰します。

二つの極のパッチには積分変数の次元 $n=d-1$、振動の強さ $\lambda=r$ として[定常位相定理](#thm-ha10-stationary-phase)を適用します。北極から

$$
\left(\frac{2\pi}{r}\right)^{(d-1)/2}
e^{-ir+i\pi(d-1)/4}+O(r^{-(d+1)/2}),
$$

南極から

$$
\left(\frac{2\pi}{r}\right)^{(d-1)/2}
e^{ir-i\pi(d-1)/4}+O(r^{-(d+1)/2})
$$

を得ます。足せば第1式です。$r\ge1$ では各指数の絶対値が $1$ なので $|\widehat\sigma(\xi)|\le C_dr^{-(d-1)/2}$。$0\le r\le1$ では

$$
|\widehat\sigma(\xi)|\le\int_{S^{d-1}}1\,d\sigma=\sigma(S^{d-1})<\infty.
$$

二つを合わせて $(1+r)^{-(d-1)/2}$ の上界が得られます。回転不変性により定数は方向に依存しません。
<!-- proof-end -->

**係数の検算（$d=3$）**　この場合、球面の緯度積分は直接計算できます。$t=\cos\theta$ とすると

$$
\widehat\sigma(re_3)
=2\pi\int_{-1}^1e^{-irt}\,dt
=4\pi\frac{\sin r}{r}\quad(r>0).
$$

[球面定理](#thm-ha10-sphere)の主項も、$d-1=2$ を代入すれば

$$
\frac{2\pi}{r}
\left(ie^{-ir}-ie^{ir}\right)
=4\pi\frac{\sin r}{r},
$$

と完全に一致します。$r=0$ では極限 $4\pi$ が球面積です。

## 8. 曲率を失うと減衰はどう変わるか

$S^1$ では両極の接線方向で二階微分が消えませんでした。対照的に、平面内の線分の位相は、法線方向の周波数に対して**まったく変化しません**。

例えば直線上の測度 $d\mu(t,0)=\chi(t)\,dt$（$\chi\in C_c^\infty(\mathbb R)$、$\chi\ge0$、$\int\chi>0$）を考えると、

$$
\widehat\mu(0,r)=\int_{\mathbb R}e^{-i(0\cdot t+r\cdot0)}\chi(t)\,dt
=\int_{\mathbb R}\chi(t)\,dt>0
$$

です。$r\to\infty$ でも全く減衰しません。線分の曲率は零で、法線方向の位相の接方向 Hessian も零です。従って[球面減衰定理](#thm-ha10-sphere)を曲率が消えた曲面へ無条件に移せません。

もう少し穏やかな退化として $\phi(t)=t^4$ を考えると、停留点で $\phi''(0)=0$ です。$|t|\lesssim\lambda^{-1/4}$ が振動の遅い領域となり、そこでの長さから $\lambda^{-1/4}$ という尺度が現れます。この評価を演習で証明します。**曲率や非退化性は飾りの仮定ではなく、減衰指数を決める条件**です。

次の HA11 では、球面に沿う関数の Fourier 変換を逆方向に延ばす extension 作用素を調べます。曲面の測度の変換が減衰するという事実は、その作用素を $TT^*$ で評価するときの核評価の出発点になります。

## 9. 演習と詳細解答

### Level A：定義・符号・指数の確認

<a id="ex-ha10-a01"></a>
**演習 HA10-A01（一次元の停留点）**  
- Level: A

$\phi(x)=x^2/2+3$、$a\in C_c^\infty(\mathbb R)$、$a(0)=2$ とする。停留点、Hessianの符号数、[定常位相公式](#thm-ha10-stationary-phase)の主項を求めよ。

<!-- solution-start -->
**詳細解答**　$\phi'(x)=x$ なので停留点は $x=0$ だけです。$\phi''(0)=1\ne0$ なので非退化、符号数は $+1$、行列式の絶対値は $1$ です。位相の値は $\phi(0)=3$ ですから

$$
\int e^{i\lambda(x^2/2+3)}a(x)\,dx
=2\left(\frac{2\pi}{\lambda}\right)^{1/2}
e^{3i\lambda+i\pi/4}
+O(\lambda^{-3/2}).
$$

$\lambda^{-1/2}$ は積分次元 $1$ から、$2$ は $a(0)$ から生じます。
<!-- solution-end -->

<a id="ex-ha10-a02"></a>
**演習 HA10-A02（非停留の一回積分）**  
- Level: A

$a\in C_c^1(\mathbb R)$ とする。$\int e^{i\lambda x}a(x)\,dx$ を部分積分し、$\lambda^{-1}\|a'\|_1$ の評価を導け。

<!-- solution-start -->
**詳細解答**　$\frac{d}{dx}e^{i\lambda x}=i\lambda e^{i\lambda x}$ を使います。$a$ はコンパクト台なので両端で零となり、境界項が消えて

$$
\begin{aligned}
\int_{\mathbb R}e^{i\lambda x}a(x)\,dx
&=\left[\frac{e^{i\lambda x}}{i\lambda}a(x)\right]_{-\infty}^{+\infty}
-\frac1{i\lambda}\int_{\mathbb R}e^{i\lambda x}a'(x)\,dx\\
&=-\frac1{i\lambda}\int_{\mathbb R}e^{i\lambda x}a'(x)\,dx.
\end{aligned}
$$

従って絶対値は $\lambda^{-1}\|a'\|_1$ 以下です。[非停留命題](#prop-ha10-nonstationary)の $n=N=1$ の具体形です。
<!-- solution-end -->

<a id="ex-ha10-a03"></a>
**演習 HA10-A03（不定符号Hessian）**  
- Level: A

$\phi(x,y)=x^2-3y^2$ とし、$a(0,0)=5$、$a\in C_c^\infty(\mathbb R^2)$ とする。停留点、$|\det H|$、符号数、定常位相の主項を求めよ。

<!-- solution-start -->
**詳細解答**　勾配は $(2x,-6y)$ なので停留点は原点のみ。Hessian は

$$
H=\begin{pmatrix}2&0\\0&-6\end{pmatrix},\quad
|\det H|=12,\quad \operatorname{sgn}H=1-1=0.
$$

[定常位相定理](#thm-ha10-stationary-phase)で $n=2$、$\phi(0)=0$ として

$$
I(\lambda)=\frac{2\pi}{\lambda}
\frac{5}{\sqrt{12}}+O(\lambda^{-2})
=\frac{5\pi}{\sqrt3\,\lambda}+O(\lambda^{-2}).
$$

符号数零のときは位相因子が $1$ ですが、Hessian の行列式は消えません。
<!-- solution-end -->

<a id="ex-ha10-a04"></a>
**演習 HA10-A04（円の停留点）**  
- Level: A

単位円を $(\cos\theta,\sin\theta)$ でパラメータ化し、$\xi=(r,0)$、$r>0$ とする。$\widehat{\sigma_{S^1}}(\xi)$ の二つの停留点と主項を[定常位相定理](#thm-ha10-stationary-phase)から求めよ。

<!-- solution-start -->
**詳細解答**　円の弧長要素は $d\theta$、位相は $\phi(\theta)=-\cos\theta$ です。微分すると $\phi'(\theta)=\sin\theta$ なので $\theta=0,\pi$ が停留点です。

$$
\begin{array}{c|c|c|c}
\theta&\phi(\theta)&\phi''(\theta)&\operatorname{sgn}\phi''\\
0&-1&+1&+1\\
\pi&+1&-1&-1
\end{array}
$$

両方とも非退化、弧長振幅は $1$ ですから

$$
\widehat{\sigma_{S^1}}(r,0)
=\left(\frac{2\pi}{r}\right)^{1/2}
\left(e^{-ir+i\pi/4}+e^{ir-i\pi/4}\right)
+O(r^{-3/2}).
$$

円周は周期座標なので停留点の周りで局所切断を取り、残りは非停留評価で処理します。
<!-- solution-end -->

<a id="ex-ha10-a05"></a>
**演習 HA10-A05（平坦な曲線）**  
- Level: A

$\chi\in C_c^\infty(\mathbb R)$ は非負で $\int\chi=1$ とする。直線上の測度 $d\mu(t,0)=\chi(t)dt$ の Fourier 変換を $(0,r)$ で計算し、球面の場合との違いを述べよ。

<!-- solution-start -->
**詳細解答**　定義へ $\xi=(0,r)$、$x=(t,0)$ を代入すれば内積は $0$ なので

$$
\widehat\mu(0,r)=\int e^{-i(0t+r0)}\chi(t)\,dt=1.
$$

$r\to\infty$ でも減衰はありません。線分では接方向の位相二階微分が零であり、[球面減衰定理](#thm-ha10-sphere)が必要とする非退化 Hessian と異なります。
<!-- solution-end -->

### Level B：証明の部品を組み直す

<a id="ex-ha10-b01"></a>
**演習 HA10-B01（非停留位相を二回積分）**  
- Level: B

$a\in C_c^\infty(\mathbb R)$、$\phi(x)=x+x^3$ とする。部分積分を二回行い $\int e^{i\lambda\phi}a=O(\lambda^{-2})$ を示せ。二回目の振幅を明示せよ。

<!-- solution-start -->
**詳細解答**　$\phi'(x)=1+3x^2\ge1$ とおき $q(x)=1/\phi'(x)$ を定義します。初回の部分積分では

$$
I(\lambda)=-\frac1{i\lambda}\int e^{i\lambda\phi}(qa)'\,dx.
$$

再び $\frac{d}{dx}e^{i\lambda\phi}=i\lambda\phi'e^{i\lambda\phi}$ を使って

$$
I(\lambda)=\frac1{(i\lambda)^2}
\int e^{i\lambda\phi}\bigl[q(qa)'\bigr]'dx.
$$

二回目の振幅を展開すると

$$
\bigl[q(qa)'\bigr]'
=\bigl(q q'a+q^2a'\bigr)'
=(q q')'a+3qq'a'+q^2a''.
$$

ここで $q,q',q''$ は台上有界で、$a,a',a''$ は可積分です。従って

$$
|I(\lambda)|
\le\lambda^{-2}
\left(\|(q q')'a\|_1+3\|qq'a'\|_1+\|q^2a''\|_1\right)
=O(\lambda^{-2}).
$$

符号は二回の負号が打ち消し合います。
<!-- solution-end -->

<a id="ex-ha10-b02"></a>
**演習 HA10-B02（線形項つき二次位相）**  
- Level: B

有限区間 $[u,v]$ 上 $\phi_b(x)=x^2+bx$、$a\in C^1([u,v])$ とする。$b\in\mathbb R$ に一様な $\lambda^{-1/2}$ 評価を示し、停留点が区間外の場合との違いを説明せよ。

<!-- solution-start -->
**詳細解答**　$\phi_b'(x)=2x+b$、$\phi_b''(x)=2$ なので全ての $b$ について $|\phi_b''|=2$ です。[van der Corput補題](#lem-ha10-vdc)へ $\kappa=2$ を代入すれば

$$
\left|\int_u^v e^{i\lambda(x^2+bx)}a(x)\,dx\right|
\le C(2\lambda)^{-1/2}
\left(\|a\|_\infty+\|a'\|_1\right)
$$

であり、右辺に $b$ は現れません。停留点は $x=-b/2$ です。もしこれが振幅の台から正の距離だけ離れるなら、その台上で $|\phi_b'|$ に正の下界があり、振幅が $C_c^\infty((u,v))$ なら[非停留命題](#prop-ha10-nonstationary)で任意冪の減衰が得られます。ただしその上界の定数は台と停留点の距離に依存し、$b$ に一様とは限りません。
<!-- solution-end -->

<a id="ex-ha10-b03"></a>
**演習 HA10-B03（交差項の二次標準化）**  
- Level: B

$\phi(x,y)=x^2+2xy$、$a\in C_c^\infty(\mathbb R^2)$、$a(0,0)=1$ とする。座標変換 $u=x+y,v=y$ を使い Hessian の行列式と定常位相の係数を二通りで確認せよ。

<!-- solution-start -->
**詳細解答**　$\nabla\phi=(2x+2y,2x)$ なので停留点は原点だけです。Hessian は

$$
H=\begin{pmatrix}2&2\\2&0\end{pmatrix},
\qquad\det H=-4,\qquad\operatorname{sgn}H=0,
$$

です。[定常位相定理](#thm-ha10-stationary-phase)から $n=2$、$\sqrt{|\det H|}=2$ より主項は $\pi/\lambda$ です。

一方 $u=x+y,v=y$ とすると $x=u-v$、Jacobian の絶対値は $1$、位相は

$$
x^2+2xy=(u-v)^2+2(u-v)v=u^2-v^2.
$$

新座標の二次位相 Hessian は $\operatorname{diag}(2,-2)$ で、正負符号は一つずつ、行列式の絶対値は $4$ です。変換後の振幅は原点で $1$ なので、[二次位相公式](#lem-ha10-quadratic)で $u$ と $v$ の二つの Gaussian 係数を掛け、

$$
\left(\frac{\pi}{\lambda}\right)^{1/2}e^{i\pi/4}
\left(\frac{\pi}{\lambda}\right)^{1/2}e^{-i\pi/4}
=\frac{\pi}{\lambda}
$$

を得ます。二つの計算が一致します。
<!-- solution-end -->

<a id="ex-ha10-b04"></a>
**演習 HA10-B04（退化した四次位相）**  
- Level: B

$a\in C_c^1(\mathbb R)$ とする。$\lambda\ge1$ について

$$
\left|\int_{\mathbb R}e^{i\lambda t^4}a(t)\,dt\right|
\le C_a\lambda^{-1/4}
$$

を、$|t|\le\lambda^{-1/4}$ とその外側に分けて証明せよ。二階微分版の[van der Corput補題](#lem-ha10-vdc)を全域には使えない理由も述べよ。

<!-- solution-start -->
**詳細解答**　$\rho=\lambda^{-1/4}$ と置きます。内側の区間は長さ $2\rho$ なので

$$
\left|\int_{|t|\le\rho}e^{i\lambda t^4}a(t)\,dt\right|
\le 2\rho\|a\|_\infty.
$$

外側の正半軸では $\phi'(t)=4t^3$ です。支持の右端 $R$ で $a(R)=0$ となるよう $R$ を選び、部分積分すると

$$
\begin{aligned}
\int_\rho^R e^{i\lambda t^4}a(t)\,dt
&=\left[\frac{e^{i\lambda t^4}a(t)}{4i\lambda t^3}\right]_\rho^R\\
&\quad-\frac1{4i\lambda}
\int_\rho^R e^{i\lambda t^4}
\left(\frac{a'(t)}{t^3}-\frac{3a(t)}{t^4}\right)dt.
\end{aligned}
$$

境界項は $\|a\|_\infty/(4\lambda\rho^3)$ 以下、積分項は

$$
\frac{\|a'\|_1}{4\lambda\rho^3}
+\frac{3\|a\|_\infty}{4\lambda}
\int_\rho^\infty t^{-4}dt
=\frac{\|a'\|_1+\|a\|_\infty}{4\lambda\rho^3}
$$

以下です。負半軸も $|t|$ を用いて同じ評価です。$\lambda\rho^3=\lambda^{1/4}$ なので内外を合わせて $C_a\lambda^{-1/4}$ が得られます。$\phi''(t)=12t^2$ は $0$ で零になるため、正の一様下界を要求する二階微分補題の仮定が破れています。
<!-- solution-end -->

### Level C：曲面・減衰・非退化性をつなぐ

<a id="ex-ha10-c01"></a>
**演習 HA10-C01（球面の定常位相を一から構成）**  
- Level: C

$d\ge2$、$\sigma$ を単位球面 $S^{d-1}\subset\mathbb R^d$ の面積測度とする。$\xi=re_d$、$r\ge1$ とする。

1. 位相 $-x_d$ の球面上の停留点を求めよ。
2. 各極近傍を $x=(u,\pm\sqrt{1-|u|^2})$ と書き、面積要素と Hessian の固有値を求めよ。
3. 定常位相公式から $\widehat\sigma(re_d)$ の主項と $O(r^{-(d+1)/2})$ の誤差を導け。
4. $d=3$ では直接積分と比較し、平坦な直線測度では同じ減衰が成り立たない理由を述べよ。

<!-- solution-start -->
**詳細解答**

**（1）停留点**　球面の点 $x$ での接ベクトル $v$ は $x\cdot v=0$ を満たします。位相 $\phi=-x_d$ の接方向微分は $-v_d$ です。これがすべての接ベクトルで零となるためには $e_d$ が法線 $x$ に平行でなければならず、$x=\pm e_d$ を得ます。

**（2）局所座標と条件**　極付近で $h_\pm(u)=\pm\sqrt{1-|u|^2}$ とおきます。$dh_\pm$ の成分は $\mp u_j/\sqrt{1-|u|^2}$ です。したがってグラフの面積要素は

$$
\sqrt{\det(I_{d-1}+\nabla h_\pm\nabla h_\pm^{\mathsf T})}\,du
=\sqrt{1+|\nabla h_\pm|^2}\,du
=(1-|u|^2)^{-1/2}du.
$$

中央の等式は階数1行列 $vv^{\mathsf T}$ が $v$ 方向に固有値 $|v|^2$、直交方向に固有値 $0$ を持つことから従います。位相の二階微分は原点で、北極では $D^2(-h_+)(0)=I_{d-1}$、南極では $D^2(-h_-)(0)=-I_{d-1}$ です。よって両者の行列式の絶対値は $1$、符号数は $\pm(d-1)$ です。

**（3）定常位相**　[$n=d-1$ 次元の定常位相定理](#thm-ha10-stationary-phase)に $r$ を大きなパラメータとして代入します。各極の位相値は北が $-1$、南が $+1$、振幅の原点値はいずれも $1$ です。非停留部分は[部分積分命題](#prop-ha10-nonstationary)で $O(r^{-N})$ ですから

$$
\widehat\sigma(re_d)
=\left(\frac{2\pi}{r}\right)^{(d-1)/2}
\left(e^{-ir+i\pi(d-1)/4}+e^{ir-i\pi(d-1)/4}\right)
+O(r^{-(d+1)/2}).
$$

角度方向は回転で同じ評価へ戻せます。

**（4）直接検算と比較**　$d=3$ では球面積分に $t=x_3$ を用いて

$$
\widehat\sigma(re_3)
=2\pi\int_{-1}^1e^{-irt}\,dt
=\frac{2\pi}{-ir}(e^{-ir}-e^{ir})
=\frac{4\pi\sin r}{r}.
$$

定常位相の式は $d-1=2$、$e^{\pm i\pi/2}=\pm i$ を代入すると同じ値です。一方、直線 $x=(t,0)$ の測度では $e^{-i(0,r)\cdot(t,0)}=1$ であり、接方向の Hessian が零で、[$S^{d-1}$ の減衰](#thm-ha10-sphere)を導いた非退化性がありません。
<!-- solution-end -->

## 10. 次に読むもの

[定常位相定理](#thm-ha10-stationary-phase)は非退化な臨界点一つにつき $\lambda^{-n/2}$ の減衰を作り、[球面減衰定理](#thm-ha10-sphere)では接方向が $d-1$ 個あるため $|\xi|^{-(d-1)/2}$ が現れました。次章では、曲面上の Fourier extension と、その作用素の $TT^*$ を通してこの減衰を $L^p$ 評価へ接続します。
