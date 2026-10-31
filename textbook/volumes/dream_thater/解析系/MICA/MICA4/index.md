# MICA4 基本分布の波面集合

[波面集合の定義](../MICA3/index.md#def-mica3-wavefront)で、特異性を「位置と非零周波数方向の組」として記録できるようになりました。しかし実際の分布の波面集合を求めるには、cutoffを掛けたFourier変換がどの錐で急減少するかを計算しなければなりません。

例えば原点に集中するDiracデルタと、同じ原点で不連続な段差関数はどちらも原点で特異です。さらに、複素平面の上側から実軸へ近づけた $1/z$ の境界値は、原点で特異なのに正の周波数方向だけを残します。単に「不連続」「デルタがある」と言うだけでは、この違いは見えません。

本講ではFourier変換を

$$
\widehat f(\xi)=\int_{\mathbb R^n}e^{-ix\cdot\xi}f(x)\,dx,
\qquad
f(x)=(2\pi)^{-n}\int_{\mathbb R^n}e^{ix\cdot\xi}\widehat f(\xi)\,d\xi
$$

とし、$u\in\mathcal D'(\mathbb R^n)$、$\chi\in C_c^\infty(\mathbb R^n)$ が局所化した $\chi u$ のFourier変換を使います。[局所Fourier変換の定義](../MICA1/index.md#def-mica1-local-fourier)と[錐内の急減少](../MICA2/index.md#def-mica2-conic-rapid)が計算の基礎です。錐は正の倍率で閉じ、**正方向と負方向は別々に判定**します。

## 1. 点に集中する分布はどの方向でも特異

まず $a\in\mathbb R^n$ のDiracデルタは、試験関数 $\varphi$ に $\langle\delta_a,\varphi\rangle=\varphi(a)$ と作用する分布です。点の周りでの局所化は一つの値 $\chi(a)$ だけで決まります。位置の特異性を方向で絞れるのでしょうか。

<a id="prop-mica4-point-delta"></a>

<!-- formal-statement-start -->
> **命題（点デルタの波面集合）**
>
> $a\in\mathbb R^n$ に対して、Diracデルタ $\delta_a\in\mathcal D'(\mathbb R^n)$ の波面集合は

$$
WF(\delta_a)=\{(a,\xi):\xi\in\mathbb R^n\setminus\{0\}\}
$$

> である。
<!-- formal-statement-end -->

### 証明の見取り図

局所化したデルタのFourier変換は純粋な振動因子 $e^{-ia\cdot\xi}$ であり、絶対値が全方向で $1$ です。一方、$a$ から離れた点ではcutoffで分布を消せます。**どのcutoffでも非減衰**なのがポイントです。

<!-- proof-start -->
### 証明

点 $x_0\ne a$ では、$a$ を含まない開球に台を持ち $x_0$ 近傍で $1$ となる $\chi$ を取れます。このとき $\chi\delta_a=0$ なので、任意の非零方向で急減少します。

$x_0=a$ とし、$a$ の近傍で $1$ となる任意の $\chi$ を取ると、分布の作用から

$$
\widehat{\chi\delta_a}(\xi)
=\langle\delta_a,\chi(x)e^{-ix\cdot\xi}\rangle
=e^{-ia\cdot\xi},
\qquad
|\widehat{\chi\delta_a}(\xi)|=1.
$$

任意の非零 $\xi_0$ とそれを含む開錐 $\Gamma$ に対して、$t\xi_0\in\Gamma$（$t>0$）です。もし次数 $N=1$ の急減少評価が成立するなら

$$
1\le C_1(1+t|\xi_0|)^{-1}
$$

が全ての $t>0$ で成り立つはずですが、$t\to\infty$ で右辺は $0$ に収束します。$\chi$ と $\Gamma$ は任意だったので、全ての非零方向が残ります。$\square$
<!-- proof-end -->

これは[MICA3の原点デルタの計算](../MICA3/index.md#def-mica3-wavefront)を任意の点と次元に広げたものです。点の位置を動かす因子 $e^{-ia\cdot\xi}$ は絶対値を変えず、特異方向を消しません。

## 2. 段差の特異性は正負の両方向にある

点デルタではFourier変換の絶対値が一定でしたが、段差では境界項が $1/|\xi|$ で残ります。まず、原点を境に左右で値が変わる関数を分布として定義します。

<a id="def-mica4-heaviside"></a>

<!-- formal-statement-start -->
> **定義（Heaviside関数）**
>
> $\mathbb R$ 上の局所可積分関数 $H$ を $H(x)=0$（$x<0$）、$H(x)=1$（$x>0$）で定める。この関数が定める分布も $H$ と書き、試験関数 $\varphi\in C_c^\infty(\mathbb R)$ に

$$
\langle H,\varphi\rangle=\int_0^\infty\varphi(x)\,dx
$$

> と作用させる。$x=0$ での関数値は分布に影響しない。
<!-- formal-statement-end -->

<!-- definition-example-start: def-mica4-heaviside -->
### 例：段差の左右と分布微分

**定義の確認**。$(-\infty,0)$ に台を持つ試験関数には作用が零で、$(0,\infty)$ に台を持つ非負で零でない試験関数には作用が正です。任意の試験関数への積分は有限かつ線形で、コンパクト集合上の一様収束に対し連続なので分布を定めます。

さらに[分布微分の定義](../../GPDE/GPDE2/index.md#def-gpde2-distributional-derivative)を用いると

$$
\langle H',\varphi\rangle
=-\int_0^\infty\varphi'(x)\,dx
=\varphi(0)
=\langle\delta_0,\varphi\rangle.
$$

従って $H'=\delta_0$ です。段差が微分によって点への集中に変わることが、試験関数上で確かめられました。
<!-- definition-example-end -->

<a id="thm-mica4-heaviside"></a>

<!-- formal-statement-start -->
> **定理（Heaviside関数の波面集合）**
>
> $H\in\mathcal D'(\mathbb R)$ を $H(x)=1$（$x>0$）、$H(x)=0$（$x<0$）で定める。すると

$$
WF(H)=\{(0,\xi):\xi\ne0\}.
$$

> 特に任意の $\chi\in C_c^\infty(\mathbb R)$ が $0$ の近傍で $1$ なら、$|\xi|\to\infty$ の正負両側で

$$
\widehat{\chi H}(\xi)=\frac1{i\xi}+O(|\xi|^{-2})
$$

> が成り立つ。
<!-- formal-statement-end -->

### 証明の見取り図

段差を局所化して半直線の積分に直し、部分積分で $x=0$ の境界項を取り出します。残りは滑らかな関数のFourier変換なので、もう一度部分積分すれば一段速く減衰します。

<!-- proof-start -->
### 証明

$x_0\ne0$ では $H$ は定数関数なので[MICA3の射影定理](../MICA3/index.md#thm-mica3-projection)により、その位置の波面方向はありません。

$\chi=1$ near $0$ を満たす任意のコンパクト支持滑らかな関数について

$$
I(\xi)=\widehat{\chi H}(\xi)
=\int_0^\infty\chi(x)e^{-ix\xi}\,dx
$$

です。$\xi\ne0$ で $e^{-ix\xi}$ の原始関数は $e^{-ix\xi}/(-i\xi)$ なので、上端の $\chi$ は零、下端は $\chi(0)=1$ であり、

$$
I(\xi)=\frac1{i\xi}
+\frac1{i\xi}\int_0^\infty\chi'(x)e^{-ix\xi}\,dx.
$$

$\chi$ は $0$ の近傍で一定ゆえ $\chi'(0)=0$ です。もう一度部分積分し、$\chi''$ の絶対可積分性を使うと

$$
\int_0^\infty\chi'(x)e^{-ix\xi}\,dx
=\frac1{i\xi}\int_0^\infty\chi''(x)e^{-ix\xi}\,dx,
\qquad
\left|I(\xi)-\frac1{i\xi}\right|
\le\frac{\|\chi''\|_{L^1}}{|\xi|^2}.
$$

よって十分大きい $|\xi|$ では $|I(\xi)|\ge1/(2|\xi|)$ です。任意の正方向の開錐にも任意の負方向の開錐にも大きな $|\xi|$ があり、例えば次数 $N=2$ の急減少に反します。どちらの方向もどのcutoffでも消えないので結論を得ます。$\square$
<!-- proof-end -->

この結果は、上の直接例で求めた分布微分 $H'=\delta_0$ とも整合します。[微分でWFは増えない](../MICA3/index.md#thm-mica3-derivative)ため $WF(\delta_0)\subset WF(H)$ であり、実際に両者は等しいのです。ただし、**微分の非増大だけから逆向きの包含は出ません**。ここでの等号は上の直接計算によります。

## 3. 超平面に集中したデルタは法線方向だけを残す

一次元の点デルタを高次元で使うと、「支持が超平面の上にある分布」が作れます。ただしこれは空間全体の点デルタとは違い、超平面に沿う方向には滑らかさが残ります。まず超平面を $x_n=a\cdot x'$ と書きます。$x'=(x_1,\ldots,x_{n-1})$ は接線側の座標、$x_n$ は最後の座標、$a\in\mathbb R^{n-1}$ は傾きを表す固定ベクトルです。

<a id="def-mica4-hyperplane-delta"></a>

<!-- formal-statement-start -->
> **定義（アフィン超平面デルタ）**
>
> $n\ge2$、$a\in\mathbb R^{n-1}$ とする。超平面 $S_a=\{(x',x_n):x_n=a\cdot x'\}$ に沿うデルタ分布 $\delta(x_n-a\cdot x')\in\mathcal D'(\mathbb R^n)$ を

$$
\langle\delta(x_n-a\cdot x'),\varphi\rangle
=\int_{\mathbb R^{n-1}}\varphi(x',a\cdot x')\,dx'
$$

> （$\varphi\in C_c^\infty(\mathbb R^n)$）で定める。
<!-- formal-statement-end -->

<!-- definition-example-start: def-mica4-hyperplane-delta -->
### 例：直線 $y=2x$ への集中

**定義の確認**。$n=2,a=2$ として $u=\delta(y-2x)$ を取ります。試験関数 $\varphi$ に対し

$$
\langle u,\varphi\rangle=\int_{\mathbb R}\varphi(t,2t)\,dt.
$$

線形性は積分の線形性から従い、台がコンパクトな $\varphi$ の $(t,2t)$ への制限もコンパクト支持かつ滑らかです。したがって積分は有限で、各コンパクト集合上の試験関数の収束に対して連続です。$y\ne2x$ の点の近傍に台を持つ $\varphi$ には作用が $0$ ですが、直線上の点の近傍では非負の試験関数を選べば作用は正です。よって支持はちょうど直線 $y=2x$ です。

この定義は積分に $dt$ を使うので、直線上の弧長測度 $ds=\sqrt5\,dt$ による積分とは $\sqrt5$ 倍違います。波面集合は非零定数倍で変わりませんが、分布の正規化は区別します。
<!-- definition-example-end -->

接線方向のベクトルは $(v,a\cdot v)$（$v\in\mathbb R^{n-1}$）です。周波数側のベクトル $\xi=(\xi',\xi_n)$ をこの接線へ作用させると $(\xi'+a\xi_n)\cdot v$ になります。従って全ての接線に対して零となる条件は $\xi'+a\xi_n=0$ です。この計算が「法線の向き」を座標で判定できる理由です。

<a id="thm-mica4-hyperplane"></a>

<!-- formal-statement-start -->
> **定理（アフィン超平面デルタの波面集合）**
>
> $n\ge2$、$a\in\mathbb R^{n-1}$、$u=\delta(x_n-a\cdot x')$ とする。このとき

$$
WF(u)=\left\{
\bigl((x',a\cdot x'),\,t(-a,1)\bigr):
x'\in\mathbb R^{n-1},\ t\in\mathbb R\setminus\{0\}
\right\}.
$$

> すなわち、超平面の各点で残るのは接線を全て消す非零共変ベクトルの方向だけである。
<!-- formal-statement-end -->

### 証明の見取り図

試験関数を超平面へ制限してからFourier変換すると、$\xi'+a\xi_n$ だけが残ります。これが非零の方向では[滑らかなコンパクト支持関数の急減少](../MICA1/index.md#thm-mica1-smooth-rapid)を使え、零になる法線方向では周波数を法線に沿って大きくしても値が変わりません。

<!-- proof-start -->
### 証明

超平面外の点では局所化で $u$ が零になります。超平面上の $p=(p',a\cdot p')$ を固定し、$p$ の近傍で $1$ となる任意のcutoff $\chi$ に対して

$$
g(x')=\chi(x',a\cdot x')\in C_c^\infty(\mathbb R^{n-1}),
\qquad
\widehat{\chi u}(\xi',\xi_n)
=\int g(x')e^{-ix'\cdot(\xi'+a\xi_n)}\,dx'
=\widehat g(\xi'+a\xi_n)
$$

です。$g=1$ near $p'$ だから零関数ではありません。

まず $\xi'_0+a\xi_{n,0}\ne0$ とします。線形写像 $L(\xi)=\xi'+a\xi_n$ の連続性から、$\xi_0$ を含む小さな開錐 $\Gamma$ と $c>0$ があり、$\xi\in\Gamma$ なら $|L(\xi)|\ge c|\xi|$ です。$\widehat g$ の任意次数の急減少を入力すると

$$
|\widehat{\chi u}(\xi)|
\le C_N(1+|L(\xi)|)^{-N}
\le C_N\max(1,c^{-N})(1+|\xi|)^{-N},
$$

従って非法線方向は規則的です。

逆に法線方向 $\xi_0=t_0(-a,1)$（$t_0\ne0$）を考えます。$\widehat g$ が恒等的に零なら[Fourier反転](../../FOU/FOU3/index.md#thm-fou3-inversion)により $g=0$ となるはずですから、$\widehat g(\beta)\ne0$ となる $\beta\in\mathbb R^{n-1}$ が存在します。$t$ を $t_0$ と同符号で $|t|\to\infty$ として

$$
\xi(t)=(-ta+\beta,t),\qquad
L(\xi(t))=\beta,\qquad
\widehat{\chi u}(\xi(t))=\widehat g(\beta)\ne0
$$

と取れます。$\xi(t)/|\xi(t)|$ は $\xi_0/|\xi_0|$ に近づくので、$\xi_0$ を含む任意の開錐には十分大きな $|t|$ で $\xi(t)$ が入ります。固定の非零値は次数 $N=1$ の急減少に反します。$\chi$ は任意であり、法線の正負両方向が残ります。$\square$
<!-- proof-end -->

特に $a=0$ とすると、水平超平面 $x_n=0$ に対して

$$
WF(\delta(x_n))
=\{((x',0),(0,\tau)):x'\in\mathbb R^{n-1},\ \tau\ne0\}.
$$

点デルタが全方向に特異なのに対し、超平面デルタは**接線周波数方向では急減少し、法線周波数方向で残る**ことが分かりました。一般の曲がった超曲面でこの記述を座標によらず扱う方法は、続くMICA5で導入します。

## 4. 複素境界値は片方の周波数方向だけを残す

前の三例は、どの特異点でも周波数の向きを反転すると同じ振る舞いでした。しかし**複素数値の分布では正負が非対称**になり得ます。$z=x+i\varepsilon$ の逆数を実軸へ上側から近づけると、そのような例が得られます。

まず実数 $\varepsilon>0$ ごとに $1/(x\pm i\varepsilon)$ は実軸上の滑らかな複素数値関数です。$\varepsilon\downarrow0$ で、試験関数との積分が定める分布の極限を考えます。極限では単なる関数 $1/x$ ではなく、原点のデルタも現れます。

<a id="def-mica4-boundary-value"></a>

<!-- formal-statement-start -->
> **定義（片側境界値分布）**
>
> $\varepsilon>0$ とし、試験関数 $\varphi\in C_c^\infty(\mathbb R)$ に対する分布極限で

$$
u_+=\lim_{\varepsilon\downarrow0}\frac1{x+i\varepsilon},
\qquad
u_-=\lim_{\varepsilon\downarrow0}\frac1{x-i\varepsilon}
$$

> を定める。複素数値分布を扱い、分布の作用は試験関数に関して複素線形とする。また、主値分布を

$$
\left\langle\operatorname{pv}\frac1x,\varphi\right\rangle
=\lim_{r\downarrow0}\int_{|x|>r}\frac{\varphi(x)}x\,dx
$$

> で定める（積分範囲は $\varphi$ のコンパクト支持の範囲）。
<!-- formal-statement-end -->

極限が実際に存在することを示してから、この定義を使います。主値では原点の左右の発散を対称に打ち消します。符号を取り違えると波面の向きが逆になるので、デルタ項も同時に確認します。

<a id="prop-mica4-sokhotski"></a>

<!-- formal-statement-start -->
> **命題（境界値の分布公式）**
>
> 上記の分布極限は $\mathcal D'(\mathbb R)$ に存在し、次を満たす。

$$
u_+=\operatorname{pv}\frac1x-i\pi\delta_0,
\qquad
u_-=\operatorname{pv}\frac1x+i\pi\delta_0.
$$
<!-- formal-statement-end -->

### 証明の見取り図

分母を有理化した実部は奇関数核で主値へ、虚部は幅 $\varepsilon$・積分質量 $\pi$ の核でデルタへ収束します。

<!-- proof-start -->
### 証明

まず

$$
\frac1{x\pm i\varepsilon}
=\frac{x}{x^2+\varepsilon^2}
\mp i\frac{\varepsilon}{x^2+\varepsilon^2}.
$$

$\varphi$ の台を $[-R,R]$ に収め、$R>0$ とします。第一項では $x/(x^2+\varepsilon^2)$ が奇関数であることから定数 $\varphi(0)$ の積分は零です。したがって

$$
\int_{-R}^R\frac{x\varphi(x)}{x^2+\varepsilon^2}\,dx
=\int_{-R}^R\frac{x\{\varphi(x)-\varphi(0)\}}{x^2+\varepsilon^2}\,dx.
$$

平均値の定理から $|\varphi(x)-\varphi(0)|\le\|\varphi'\|_\infty|x|$ であり、被積分関数の絶対値は $\|\varphi'\|_\infty$ 以下です。優収束を使うと極限は

$$
\int_{-R}^R\frac{\varphi(x)-\varphi(0)}x\,dx
=\left\langle\operatorname{pv}\frac1x,\varphi\right\rangle
$$

です。第二項には $x=\varepsilon t$ を代入して

$$
\int_{\mathbb R}\frac{\varepsilon\varphi(x)}{x^2+\varepsilon^2}\,dx
=\int_{\mathbb R}\frac{\varphi(\varepsilon t)}{1+t^2}\,dt
\longrightarrow\varphi(0)\int_{\mathbb R}\frac{dt}{1+t^2}
=\pi\varphi(0)
$$

を得ます。$\varphi(\varepsilon t)$ は一様有界で $(1+t^2)^{-1}$ は可積分なので優収束が使えます。よって両方の分布極限が存在し、主張する符号の公式が成立します。$\square$
<!-- proof-end -->

<!-- definition-example-start: def-mica4-boundary-value -->
### 例：主値とデルタを境界値から取り出す

**定義の確認**。上の極限公式により任意の試験関数への作用が存在し、

$$
\frac{u_++u_-}{2}=\operatorname{pv}\frac1x,
\qquad
\frac{u_--u_+}{2\pi i}=\delta_0
$$

となります。前者では虚部のデルタが相殺され、後者では主値部分が相殺されることを、任意の試験関数 $\varphi$ への作用で検証できます。これらは点ごとの $1/x$ の等式ではなく、**分布としての等式**です。
<!-- definition-example-end -->

次に局所Fourier変換を直接計算します。$\varepsilon>0$ での恒等式

$$
\frac1{x+i\varepsilon}
=-i\int_0^\infty e^{ixt-\varepsilon t}\,dt,
\qquad
\frac1{x-i\varepsilon}
=i\int_0^\infty e^{-ixt-\varepsilon t}\,dt
$$

は指数関数を積分して確かめられます。$\chi$ をコンパクト支持滑らかとし、$\xi$ を固定すれば、$t$ の減衰と $\chi$ の可積分性によって積分順序を交換できます。さらに $\widehat\chi$ は急減少するため、$\varepsilon\downarrow0$ の極限でも $t$ に関する優収束が使えます。

<a id="thm-mica4-boundary-wf"></a>

<!-- formal-statement-start -->
> **定理（片側境界値分布の波面集合）**
>
> $u_\pm\in\mathcal D'(\mathbb R)$ を上の片側境界値分布とし、Fourier変換を $\widehat f(\xi)=\int e^{-ix\xi}f(x)\,dx$ とする。このとき

$$
WF(u_+)=\{(0,\xi):\xi>0\},
\qquad
WF(u_-)=\{(0,\xi):\xi<0\}.
$$

> 任意の $\chi\in C_c^\infty(\mathbb R)$ が $0$ 近傍で $1$ なら、局所Fourier変換は

$$
\widehat{\chi u_+}(\xi)
=-i\int_{-\infty}^{\xi}\widehat\chi(s)\,ds,
\qquad
\widehat{\chi u_-}(\xi)
=i\int_{\xi}^{\infty}\widehat\chi(s)\,ds
$$

> で与えられる。
<!-- formal-statement-end -->

### 証明の見取り図

$u_+$ は正の周波数 $t\ge0$ の振動を積分したものです。cutoffを掛けると $\widehat\chi$ の累積積分になり、正の無限遠では非零定数に近づく一方、負の無限遠では滑らかなコンパクト支持関数のFourier変換の尾部積分として任意次数で減衰します。$u_-$ は逆向きです。

<!-- proof-start -->
### 証明

任意の $\chi\in C_c^\infty(\mathbb R)$ について、上の指数積分公式を $\chi$ に掛けてFourier変換すると

$$
\begin{aligned}
\widehat{\chi u_+}(\xi)
&=-i\lim_{\varepsilon\downarrow0}
\int_0^\infty e^{-\varepsilon t}
\left(\int_{\mathbb R}\chi(x)e^{-ix(\xi-t)}\,dx\right)dt\\
&=-i\int_0^\infty\widehat\chi(\xi-t)\,dt
=-i\int_{-\infty}^{\xi}\widehat\chi(s)\,ds.
\end{aligned}
$$

ここで二番目の等号は、固定 $\xi$ に対し $|\widehat\chi(\xi-t)|$ が $t\ge0$ で可積分であることから従います。$u_-$ も同じ計算で

$$
\widehat{\chi u_-}(\xi)
=i\int_0^\infty\widehat\chi(\xi+t)\,dt
=i\int_\xi^\infty\widehat\chi(s)\,ds
$$

です。$\chi=1$ near $0$ のとき、[Fourier反転公式](../../FOU/FOU3/index.md#thm-fou3-inversion)を $x=0$ へ適用して

$$
\int_{\mathbb R}\widehat\chi(s)\,ds=2\pi\chi(0)=2\pi
$$

となります。ゆえに

$$
\lim_{\xi\to+\infty}\widehat{\chi u_+}(\xi)=-2\pi i,
\qquad
\lim_{\xi\to-\infty}\widehat{\chi u_-}(\xi)=2\pi i.
$$

正の無限遠での $u_+$ と負の無限遠での $u_-$ は、次数 $N=1$ の急減少ですら満たしません。逆方向を評価するには、任意の $N$ に対し $\widehat\chi$ のSchwartz評価を次数 $N+2$ で用います。例えば $\xi<0$ なら

$$
\begin{aligned}
|\widehat{\chi u_+}(\xi)|
&\le C_{N+2}\int_{-\infty}^{\xi}(1+|s|)^{-N-2}\,ds\\
&=\frac{C_{N+2}}{N+1}(1+|\xi|)^{-N-1}
\le C'_N(1+|\xi|)^{-N}.
\end{aligned}
$$

同じ評価を $\xi>0$ の $u_-$ に適用できます。$0$ から離れた点では[境界値の分布公式](#prop-mica4-sokhotski)により $u_\pm=1/x$ という滑らかな関数なので、波面方向はありません。よって主張どおり正負の片方向だけが残ります。$\square$
<!-- proof-end -->

Fourier変換の指数を $e^{+ix\xi}$ に変更すれば向きは逆転します。後続の二点分布の「正周波数」を論じるときも、符号規約を先に固定する必要があります。

なお[波面集合の和の包含](../MICA3/index.md#prop-mica3-sum)をこの例に使うと、

$$
WF\left(\operatorname{pv}\frac1x\right)
=WF\left(\frac{u_++u_-}{2}\right)
=\{(0,\xi):\xi\ne0\}
$$

です。最後の等号の逆向きは包含だけからは出ないので、実際には $u_+=\operatorname{pv}(1/x)-i\pi\delta_0$ の局所Fourier式を正負それぞれで確認するか、$\widehat{\chi\,\operatorname{pv}(1/x)}=(\widehat{\chi u_+}+\widehat{\chi u_-})/2$ の極限 $\mp i\pi$ を使います。

## 5. 半空間の段差と、異なる特異方向の重ね合わせ

二次元では $H(x)$ を $y$ 方向に一定な分布として扱えます。ここでは単なる一次元分布の引き戻し定理は使わず、試験関数への積分から直接計算します。

<a id="prop-mica4-halfspace"></a>

<!-- formal-statement-start -->
> **命題（半空間のHeaviside関数）**
>
> $\mathbb R^2$ 上の局所可積分関数 $v(x,y)=H(x)$ が定める分布について

$$
WF(v)=\{((0,y),(\tau,0)):y\in\mathbb R,\ \tau\ne0\}.
$$
<!-- formal-statement-end -->

### 証明の見取り図

$y$ 方向に局所化したFourier変換はSchwartz減衰し、$x$ 方向には境界の $1/(i\xi_x)$ が残ります。これを同時に評価します。

<!-- proof-start -->
### 証明

$x\ne0$ で $v$ は定数なので波面方向はありません。$p=(0,y_0)$ で任意の $\chi\in C_c^\infty(\mathbb R^2)$ が $p$ 近傍で $1$ とします。部分Fourier変換

$$
g_\eta(x)=\int_{\mathbb R}\chi(x,y)e^{-iy\eta}\,dy
$$

を置くと

$$
\widehat{\chi v}(\xi,\eta)
=\int_0^\infty g_\eta(x)e^{-ix\xi}\,dx.
$$

$\eta_0\ne0$ の方向では小さな開錐で $|\eta|\ge c|(\xi,\eta)|$ です。$y$ 方向の部分積分を任意回行えば、$x$ の全ての有限階微分について $\sup_x|\partial_x^j g_\eta(x)|\le C_{j,N}(1+|\eta|)^{-N}$ です。$x$ の積分区間は固定コンパクト集合に含まれるので、任意の $N$ で全周波数の急減少が得られます。

次に法線方向 $(\tau_0,0)$、$\tau_0\ne0$ を考えます。$\chi(0,y)=1$ near $y_0$ で零関数ではないため、[Fourier反転](../../FOU/FOU3/index.md#thm-fou3-inversion)から $g_\beta(0)\ne0$ となる $\beta$ が存在します。$x$ 方向に二回部分積分し、$g_\beta$ はコンパクト支持で滑らかなので

$$
\widehat{\chi v}(\xi,\beta)
=\frac{g_\beta(0)}{i\xi}+O(|\xi|^{-2}).
$$

従って $\xi\to\pm\infty$ のいずれでも急減少せず、$(\xi,\beta)$ は対応する法線方向の任意の開錐に最終的に入ります。これで等式が成立します。$\square$
<!-- proof-end -->

この例と[斜めの超平面デルタ](#thm-mica4-hyperplane)を足したときは、片方にない方向が他方によって打ち消されることはありません。なぜなら $WF(u+v)\subset WF(u)\cup WF(v)$ と、$u=(u+v)-v$ への同じ包含を合わせれば、$WF(u)\setminus WF(v)$ は $WF(u+v)$ に必ず残るからです。一方、同じ方向に特異性を持つ二つの分布の和では相殺があり得ます。

## 6. 演習

### 演習 MICA4-A1：平行移動した点デルタの全方向

- Level: A
- 目安時間: 12分

$u=\delta_{(1,-2)}$ を $\mathbb R^2$ 上で考える。$(1,-2)$ の上で $(1,1)$、$(-1,1)$ の両方向が $WF(u)$ に入ることを、任意のcutoffと開錐を使って証明せよ。また $(0,0)$ の上の波面方向を求めよ。

<!-- solution-start -->
#### 詳細解答

$(1,-2)$ 近傍で $1$ となる任意の $\chi$ について、[点デルタの命題](#prop-mica4-point-delta)の計算を直接繰り返すと

$$
\widehat{\chi u}(\xi_1,\xi_2)
=e^{-i(\xi_1-2\xi_2)},\qquad
|\widehat{\chi u}|=1.
$$

$(1,1)$ を含む開錐に $(t,t)$、$(-1,1)$ を含む開錐に $(-t,t)$（$t>0$）が含まれます。どちらも $|\xi|=\sqrt2t$ であり、急減少の次数 $N=1$ を仮定すると $1\le C_1(1+\sqrt2t)^{-1}$ となり $t\to\infty$ で矛盾します。正の倍率だけで二方向を別々に検証しました。

$(0,0)$ の近傍で $1$ となり $(1,-2)$ を避けるcutoff $\psi$ を選べば $\psi u=0$ です。従って原点の上には波面方向がありません。
<!-- solution-end -->

### 演習 MICA4-A2：段差の位置を動かす

- Level: A
- 目安時間: 15分

$H_3(x)=H(x-3)$ とする。$3$ の近傍で $1$ となる任意の $\chi\in C_c^\infty(\mathbb R)$ について、$\widehat{\chi H_3}(\xi)$ の主要項を求め、$WF(H_3)$ を示せ。

<!-- solution-start -->
#### 詳細解答

$\widehat{\chi H_3}(\xi)=\int_3^\infty\chi(x)e^{-ix\xi}\,dx$ です。$x=3+s$ とおき $\psi(s)=\chi(3+s)$ とすると

$$
\widehat{\chi H_3}(\xi)
=e^{-3i\xi}\int_0^\infty\psi(s)e^{-is\xi}\,ds.
$$

$\psi=1$ near $0$ なので[Heavisideの定理](#thm-mica4-heaviside)の部分積分を適用し、

$$
\widehat{\chi H_3}(\xi)
=e^{-3i\xi}\left(\frac1{i\xi}+O(|\xi|^{-2})\right).
$$

指数因子の絶対値は $1$ で、十分大きい正負の $\xi$ では絶対値が $1/(2|\xi|)$ 以上です。$x\ne3$ では分布は滑らかな定数なので

$$
WF(H_3)=\{(3,\xi):\xi\ne0\}.
$$
<!-- solution-end -->

### 演習 MICA4-A3：水平直線に沿うデルタ

- Level: A
- 目安時間: 13分

$u=\delta(y)$ を $\mathbb R^2$ 上で $\langle u,\varphi\rangle=\int_{\mathbb R}\varphi(x,0)\,dx$ と定める。点 $(2,0)$ の上の方向 $(1,1)$ と $(0,-3)$ の所属を判定せよ。非所属では開錐の評価、所属では任意のcutoffへの反例列を示せ。

<!-- solution-start -->
#### 詳細解答

$(2,0)$ の近傍で $1$ となる任意の $\chi$ に対し、$g(x)=\chi(x,0)$ とおくと

$$
\widehat{\chi u}(\xi,\eta)=\widehat g(\xi)
$$

です。$(1,1)$ の周りの十分狭い開錐では $|\xi|\ge c|(\xi,\eta)|$ となるため、$\widehat g$ のSchwartz急減少から全次数の評価を得ます。従って $((2,0),(1,1))\notin WF(u)$。

一方、$g=1$ near $2$ なので零関数ではなく、[Fourier反転](../../FOU/FOU3/index.md#thm-fou3-inversion)から $\widehat g(\beta)\ne0$ となる $\beta$ が存在します。周波数列 $(\beta,-t)$ は $(0,-3)$ の向きへ近づき、$\widehat{\chi u}(\beta,-t)=\widehat g(\beta)$ は零でない定数です。任意のcutoffと錐について次数 $N=1$ の急減少が破れるので $((2,0),(0,-3))\in WF(u)$ です。
<!-- solution-end -->

### 演習 MICA4-A4：上下境界値の符号

- Level: A
- 目安時間: 14分

$u_\pm=\lim_{\varepsilon\downarrow0}(x\pm i\varepsilon)^{-1}$ を分布極限で定める。$\chi=1$ near $0$ のとき $\widehat{\chi u_+}(\xi)$ と $\widehat{\chi u_-}(\xi)$ の $\xi\to+\infty$ における極限を求め、どちらの分布に正方向の波面があるか答えよ。

<!-- solution-start -->
#### 詳細解答

[境界値のFourier積分](#thm-mica4-boundary-wf)によれば

$$
\widehat{\chi u_+}(\xi)=-i\int_{-\infty}^{\xi}\widehat\chi(s)\,ds,
\qquad
\widehat{\chi u_-}(\xi)=i\int_{\xi}^{\infty}\widehat\chi(s)\,ds.
$$

$\chi(0)=1$ とFourier反転から全積分は $2\pi$ です。$\widehat\chi$ は任意次数で急減少するので尾部積分は $0$ へ収束し、

$$
\lim_{\xi\to+\infty}\widehat{\chi u_+}(\xi)=-2\pi i,
\qquad
\lim_{\xi\to+\infty}\widehat{\chi u_-}(\xi)=0.
$$

後者は単に $0$ へ収束するだけでなく、任意次数で急減少します。従って正方向に波面を持つのは $u_+$ だけです。$e^{-ix\xi}$ という規約を変えれば答えの符号も変わります。
<!-- solution-end -->

### 演習 MICA4-A5：主値分布の両方向

- Level: A
- 目安時間: 14分

$p=\operatorname{pv}(1/x)$ とする。$p=(u_++u_-)/2$ を使い、$\chi=1$ near $0$ に対する $\widehat{\chi p}(\xi)$ の正負両端の極限を求め、$WF(p)$ を決定せよ。「和の包含」だけから等号を主張してはいけない理由も述べよ。

<!-- solution-start -->
#### 詳細解答

[境界値の分布公式](#prop-mica4-sokhotski)により $p=(u_++u_-)/2$ です。従って

$$
\widehat{\chi p}(\xi)
=\frac{-i\int_{-\infty}^{\xi}\widehat\chi(s)\,ds
+i\int_{\xi}^{\infty}\widehat\chi(s)\,ds}{2}.
$$

正の無限遠では左側の積分が $2\pi$、右側の積分が $0$、負の無限遠ではその逆になります。よって

$$
\lim_{\xi\to+\infty}\widehat{\chi p}(\xi)=-i\pi,
\qquad
\lim_{\xi\to-\infty}\widehat{\chi p}(\xi)=i\pi.
$$

いずれも零でないため、$WF(p)=\{(0,\xi):\xi\ne0\}$ です。[和の包含](../MICA3/index.md#prop-mica3-sum)は上界しか与えず、同じ方向に特異な項の相殺を排除できないので、この極限計算が必要です。
<!-- solution-end -->

### 演習 MICA4-B1：斜めの直線デルタ

- Level: B
- 目安時間: 23分

$u=\delta(y-2x)$ を $\langle u,\varphi\rangle=\int\varphi(t,2t)\,dt$ で定める。点 $(1,2)$ における方向 $(1,0)$、$(-2,1)$、$(2,-1)$ の所属を、局所Fourier変換と開錐の評価から求めよ。

<!-- solution-start -->
#### 詳細解答

$\chi=1$ near $(1,2)$ とし、$g(t)=\chi(t,2t)$ を置きます。定義から

$$
\widehat{\chi u}(\xi,\eta)=\widehat g(\xi+2\eta).
$$

$(1,0)$ の近傍には $|\xi+2\eta|\ge c\sqrt{\xi^2+\eta^2}$ を満たす開錐があります。$\widehat g$ のSchwartz急減少からこの開錐では全次数で急減少し、$(1,0)$ は含まれません。

$g=1$ near $1$ なので $\widehat g(\beta)\ne0$ となる $\beta$ が存在します。正の法線方向へは

$$
(\xi,\eta)=(-2t+\beta,t),\qquad t\to+\infty
$$

を取り、逆向きへは $t\to-\infty$ を取ります。いずれも $\xi+2\eta=\beta$ なので局所Fourier変換は $\widehat g(\beta)\ne0$ のままです。従って $(-2,1)$ と $(2,-1)$ はどちらも属します。[超平面デルタの定理](#thm-mica4-hyperplane)と一致します。
<!-- solution-end -->

### 演習 MICA4-B2：零になる係数は特異性を全部消すか

- Level: B
- 目安時間: 22分

$w(x)=xH(x)$ を $\mathbb R$ 上の分布とする。$\chi=1$ near $0$ に対して $\widehat{\chi w}(\xi)$ の主要項を二度以上の部分積分で求め、$WF(w)$ を決定せよ。$x\delta_0=0$ と比較せよ。

<!-- solution-start -->
#### 詳細解答

局所Fourier変換は

$$
J(\xi)=\int_0^\infty x\chi(x)e^{-ix\xi}\,dx
$$

です。$f(x)=x\chi(x)$ とすると $f(0)=0$、$f'(0)=\chi(0)=1$、$f''$ はコンパクト支持滑らかです。第一回の部分積分では境界項が零で

$$
J(\xi)=\frac1{i\xi}\int_0^\infty f'(x)e^{-ix\xi}\,dx.
$$

もう一度部分積分すると

$$
J(\xi)=\frac{f'(0)}{(i\xi)^2}
+\frac1{(i\xi)^2}\int_0^\infty f''(x)e^{-ix\xi}\,dx.
$$

さらに $f''$ に部分積分を一回適用すると、最後の積分は $O(|\xi|^{-1})$ なので

$$
J(\xi)=\frac1{(i\xi)^2}+O(|\xi|^{-3}).
$$

十分大きい正負の $\xi$ で $|J(\xi)|\ge1/(2|\xi|^2)$ であり、次数 $N=3$ の急減少に反します。$0$ 以外では $w$ は滑らかなので

$$
WF(xH(x))=\{(0,\xi):\xi\ne0\}.
$$

$x\delta_0=0$ は係数 $x(0)=0$ により完全に消えますが、$xH$ は段差を連続にするだけで微分 $H+x\delta_0=H$ に段差が残り、滑らかにはなりません。[乗算の非増大](../MICA3/index.md#thm-mica3-smooth-multiplier)は、係数の零点で波面が必ず消えるとは主張しません。
<!-- solution-end -->

### 演習 MICA4-B3：同じ場所での相殺

- Level: B
- 目安時間: 21分

一次元で $f(x)=H(x)+H(-x)$、$g(x)=H(x)-H(-x)$ とする。分布として $f,g$ を表し、各波面集合を直接計算の根拠付きで求めよ。$WF(H(x))\cup WF(H(-x))$ が $WF(f)$ と一致しない理由を説明せよ。

<!-- solution-start -->
#### 詳細解答

$x\ne0$ では $H(x)+H(-x)=1$、$H(x)-H(-x)=2H(x)-1$ です。一点の値の違いは局所可積分関数の分布に影響しないため、分布としても

$$
f=1,\qquad g=2H-1.
$$

$f$ は滑らかなので $WF(f)=\varnothing$ です。$g$ について、滑らかな項を足してもWFが変わらないことを[和の包含](../MICA3/index.md#prop-mica3-sum)の両向きに適用し、$WF(g)=WF(H)=\{(0,\xi):\xi\ne0\}$ を得ます。具体的には $g=2H-1$ と $2H=g+1$ に包含を使います。

$H(-x)$ 自体も原点で段差を持つので、正負とも $1/|\xi|$ の非減衰があります。しかし $f$ では二つの段差の跳びが逆向きで、和が定数 $1$ になります。[和の包含](../MICA3/index.md#prop-mica3-sum)が等号を保証しない理由は、このように同一方向の特異成分が打ち消せるからです。
<!-- solution-end -->

### 演習 MICA4-B4：境界値の線形結合

- Level: B
- 目安時間: 20分

片側境界値 $u_+$、$u_-$ に対し、$q=u_++u_-$ と $r=u_--u_+$ の分布としての形を求め、どちらも原点の正負両方向を波面に持つことを局所Fourier極限から確かめよ。

<!-- solution-start -->
#### 詳細解答

[境界値の分布公式](#prop-mica4-sokhotski)から

$$
q=2\operatorname{pv}\frac1x,
\qquad
r=2\pi i\delta_0.
$$

$\chi=1$ near $0$ とします。[境界値のFourier積分](#thm-mica4-boundary-wf)の正負の極限を差し引くと

$$
\begin{array}{c|cc}
&\xi\to+\infty&\xi\to-\infty\\ \hline
\widehat{\chi q}(\xi)&-2\pi i&2\pi i\\
\widehat{\chi r}(\xi)&2\pi i&2\pi i
\end{array}
$$

となります。どの値も零でないので、どちらも原点の正負両方向が波面に入ります。原点以外では $q=2/x$、$r=0$ という滑らかな分布なので、他の位置の波面はありません。$q$ は主値型、$r$ は点デルタ型で、同じWFを持っても分布が異なることが分かります。
<!-- solution-end -->

### 演習 MICA4-C1：二本の異なる特異集合が交わる点

- Level: C
- 目安時間: 40分

$\mathbb R^2$ 上で $u=\delta(y-2x)$、$v=H(x)$ とし、$w=u+v$ とする。$u$ は $\langle u,\varphi\rangle=\int\varphi(t,2t)\,dt$、$v$ は局所可積分関数 $H(x)$ が定める分布である。

1. $WF(u)$ と $WF(v)$ を、それぞれFourier積分から求めよ。
2. 原点以外の各点で $WF(w)$ の方向を決定せよ。
3. 原点の上で、異なる二つの法線方向の集合がそのまま $WF(w)$ の方向の集合になることを、和の包含と差への適用から証明せよ。

<!-- solution-start -->
#### 詳細解答

**1. 個々の波面集合。** [アフィン超平面デルタの定理](#thm-mica4-hyperplane)の証明では $\widehat{\chi u}(\xi,\eta)=\widehat g(\xi+2\eta)$、$g(t)=\chi(t,2t)$ でした。従って $\xi+2\eta\ne0$ では錐急減少、$\xi+2\eta=0$ の非零方向では固定の $\widehat g(\beta)\ne0$ を保持する列があり、

$$
WF(u)=\{((t,2t),s(-2,1)):t\in\mathbb R,\ s\ne0\}.
$$

[半空間のHeaviside関数の命題](#prop-mica4-halfspace)の部分Fourier変換では、$\eta\ne0$ の錐で急減少、$(\xi,\eta)=(\pm t,\beta)$ では $g_\beta(0)/(i\xi)+O(\xi^{-2})$ が残るので

$$
WF(v)=\{((0,y),s(1,0)):y\in\mathbb R,\ s\ne0\}.
$$

**2. 原点以外。** $y=2x$ と $x=0$ の交点は原点だけです。

$y=2x$ の原点以外の点では $x\ne0$ なので、$v$ は局所的に定数で滑らかです。そこで[局所性](../MICA3/index.md#lem-mica3-locality)と[和の包含](../MICA3/index.md#prop-mica3-sum)を $w=u+v$ と $u=w-v$ に適用すると、当該点の上で $WF(w)=WF(u)$ を得ます。

$x=0$ の原点以外の点では $u$ が局所的に零です。同じ二つの性質を $w=u+v$ と $v=w-u$ に適用すると、当該点の上で $WF(w)=WF(v)$ です。二直線の外では両者とも滑らかで、波面方向はありません。

**3. 原点。** [和の包含](../MICA3/index.md#prop-mica3-sum)から

$$
WF(w)|_{(0,0)}
\subset \{s(-2,1):s\ne0\}\cup\{s(1,0):s\ne0\}.
$$

ここで二つの集合は交わりません。実際、$s(-2,1)=t(1,0)$ とおくと第二成分から $s=0$ となり、非零条件に反します。$u=w-v$ へ和の包含を使うと

$$
WF(u)\subset WF(w)\cup WF(v).
$$

$WF(u)$ の原点上のどの方向も $WF(v)$ には入らないので、それらは必ず $WF(w)$ に入ります。同様に $v=w-u$ より $WF(v)\subset WF(w)\cup WF(u)$、したがって $v$ の全方向も残ります。上界と合わせて

$$
WF(w)|_{(0,0)}
=\{s(-2,1):s\ne0\}\cup\{s(1,0):s\ne0\}
$$

です。異なる方向に特異性を持つ項どうしは、この加算では相殺できません。なお、二つの方向集合が重なる場合には同じ議論で等号を結論できない点が重要です。
<!-- solution-end -->

## 7. 何を得たか

点デルタは全非零方向、超平面デルタは超平面の法線方向、Heavisideの段差は境界の正負両法線方向、片側境界値はその片方だけに波面を持ちました。違いを生むのは、局所Fourier変換の**錐ごとの非減衰**です。

特に $(x+i0)^{-1}$ と $(x-i0)^{-1}$ の向きは、Fourier変換の指数の符号から導かれ、単に見た目が似ているから同じWFとは言えません。次のMICA5では、ここで座標計算した「法線方向」を、滑らかな座標の取り替えによっても意味が変わらない形にまとめます。
