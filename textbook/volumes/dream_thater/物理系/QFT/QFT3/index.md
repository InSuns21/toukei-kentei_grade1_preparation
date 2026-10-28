# QFT3 Klein–Gordon場の初期値・振動数分解・超関数

<!-- definition-example-audit: strict -->

[QFT1のKlein–Gordon方程式](../QFT1/index.md#def-qft1-klein-gordon)は、相対論的な波の伝わり方を決めます。[QFT2の保存則](../QFT2/index.md#thm-qft2-translation)では、その解がエネルギーを運ぶことを確認しました。しかし、一つの平面波を方程式へ代入できても、**任意の初期の波形から何が起こるか**、あるいは量子化で使う正のエネルギーの波をどう区別するかは、まだ分かりません。

この講義では、空間Fourier変換により方程式を運動量ごとの振動子へ分解し、初期値から解を組み立てます。その後、複素解の正・負振動数、保存される形式の符号、そして点の値を積分に置き換える超関数の考え方へ進みます。**扱うのは古典場です。** 次の講義で生成・消滅演算子を導入する前に、計算と定義域の土台を作ります。

## 1. 三次元Fourier変換で波をほどく

時空は $3+1$ 次元のMinkowski空間、計量は $\eta=\operatorname{diag}(1,-1,-1,-1)$、自然単位系は $c=\hbar=1$ です。$\boldsymbol x,\boldsymbol p\in\mathbb R^3$ を空間位置と運動量、$m\ge0$ を一定の質量パラメータとします。空間内積を $\boldsymbol p\cdot\boldsymbol x=\sum_{j=1}^3p_jx^j$、$\omega_{\boldsymbol p}=\sqrt{|\boldsymbol p|^2+m^2}$ と書きます。

[FOU3の一変数Fourier変換・反転](../../../解析系/FOU/FOU3/index.md#thm-fou3-inversion)を各座標に適用する規格化として、

$$
\widehat h(\boldsymbol p)
=\int_{\mathbb R^3}h(\boldsymbol x)
e^{-i\boldsymbol p\cdot\boldsymbol x}\,d^3x,
\qquad
h(\boldsymbol x)
=\int_{\mathbb R^3}\frac{d^3p}{(2\pi)^3}
\widehat h(\boldsymbol p)e^{i\boldsymbol p\cdot\boldsymbol x}
$$

を用います。初めは絶対収束と反転を保証する滑らかで急減少する関数を使います。一変数公式を三回適用する際、関数と変換が可積分なので積分順序を交換できます。以下では $d\mu(\boldsymbol p)=d^3p/(2\pi)^3$ を積分記号の短縮形にします。重要なのは、**空間Fourier変換は時刻 $t$ を固定して実行する**という点です。

急減少の条件を正確に記します。[GPDE2で導入した多重指数](../../../解析系/GPDE/GPDE2/index.md#def-gpde2-multi-index) $\alpha,\beta\in\mathbb N_0^3$ に対し、$\boldsymbol x^\alpha=\prod_j(x^j)^{\alpha_j}$、$\partial^\beta=\prod_j\partial_{x^j}^{\beta_j}$ とします。滑らかな関数 $h$ の全ての量

$$
\sup_{\boldsymbol x\in\mathbb R^3}
|\boldsymbol x^\alpha\partial^\beta h(\boldsymbol x)|
$$

が有限となる条件を「どの多項式を掛けても、どの階数の導関数も急減少する」と表現します。この条件を満たす関数の集合に名前を付けます。

<a id="def-qft3-schwartz-function"></a>

<!-- formal-statement-start -->
> **定義（Schwartz関数）**
> 全ての多重指数 $\alpha,\beta\in\mathbb N_0^3$ について上記の重み付き微分の上限が有限である $h\in C^\infty(\mathbb R^3;\mathbb C)$ をSchwartz関数といい、その集合を $\mathcal S(\mathbb R^3;\mathbb C)$ とする。実数値の場合は $\mathcal S(\mathbb R^3;\mathbb R)$ と書く。
<!-- formal-statement-end -->

[GPDE1のコンパクト台のテスト関数](../../../解析系/GPDE/GPDE1/index.md#def-gpde1-test-function)はこの集合に含まれますが、Gaussianのように台が無限に広がる関数も含まれます。Schwartz関数のFourier変換もSchwartz関数になり、微分は周波数の乗算へ移ります。例えば部分積分によって

$$
\widehat{\partial_jh}(\boldsymbol p)
=ip_j\widehat h(\boldsymbol p),
\qquad
\widehat{-\Delta h}(\boldsymbol p)
=|\boldsymbol p|^2\widehat h(\boldsymbol p).
$$

境界項が消えるのは $h$ とその導関数の急減少によります。

ここで「Fourier変換もSchwartz級」という事実の根拠を確認します。積分内の微分と部分積分から

$$
\partial_{p_j}\widehat h
=-i\widehat{x^jh},
\qquad
p_j\widehat h=-i\widehat{\partial_jh}
$$

が得られます。これらを繰り返すと、任意の $\boldsymbol p^\alpha\partial_{\boldsymbol p}^\beta\widehat h$ は $h$ に多項式を掛けて微分した関数のFourier変換に定数を掛けたものです。元の関数はSchwartz級なので絶対可積分であり、Fourier変換の絶対値はその $L^1$ ノルムで抑えられます。このため全ての周波数側のSchwartz半ノルムが有限です。逆方向の急減少もFourier反転から同様に確認できます。

<!-- definition-example-start: def-qft3-schwartz-function -->
### 例：GaussianはSchwartz関数

**定義の確認**：$h(\boldsymbol x)=e^{-|\boldsymbol x|^2}$ は滑らかで、任意の多重指数 $\beta$ に対して $\partial^\beta h=P_\beta(\boldsymbol x)e^{-|\boldsymbol x|^2}$（$P_\beta$ は多項式）です。従って $\boldsymbol x^\alpha\partial^\beta h$ は多項式とGaussianの積であり、連続かつ無限遠で零へ収束するので有界です。これで定義の全ての $\alpha,\beta$ の条件が成立します。
<!-- definition-example-end -->

<a id="def-qft3-schwartz-data"></a>

<!-- formal-statement-start -->
> **定義（自由場のSchwartz初期値）**
> $m\ge0$ に対し、自由Klein–Gordon方程式 $(\partial_t^2-\Delta+m^2)\phi=0$ の時刻零でのCauchy初期値を

$$
\phi(0,\boldsymbol x)=f(\boldsymbol x),
\qquad
\partial_t\phi(0,\boldsymbol x)=g(\boldsymbol x)
$$

> と書く。$f,g\in\mathcal S(\mathbb R^3;\mathbb C)$ である場合をSchwartz初期値という。実場を求めるときは $f,g$ を実数値とする。
<!-- formal-statement-end -->

<!-- definition-example-start: def-qft3-schwartz-data -->
### 例：GaussianはCauchy初期値に使える

**定義の確認**：滑らかさ、全ての重み付き微分の有界性、二つの初期条件に必要な正則性を確認します。

$\sigma>0$ として

$$
f(\boldsymbol x)=e^{-|\boldsymbol x|^2/(2\sigma^2)},
\qquad g(\boldsymbol x)=0
$$

とします。$f$ の任意の偏微分は $\boldsymbol x$ の多項式と同じGaussianの積です。さらに任意の多項式を掛けても無限遠で零へ減衰します。したがって全てのSchwartz半ノルムは有限で、$f,g$ は実数値のSchwartz初期値です。$\widehat f$ も急減少し、後で解を作る各積分は収束します。
<!-- definition-example-end -->

## 2. 初期値問題を運動量ごとの振動子として解く

方程式へ空間Fourier変換を施すと、第1節で導いた微分と周波数の対応から

$$
(\partial_t^2+|\boldsymbol p|^2+m^2)
\widehat\phi(t,\boldsymbol p)=0
$$

になります。つまり各 $\boldsymbol p$ で角振動数 $\omega_{\boldsymbol p}$ の調和振動子です。$\omega_{\boldsymbol p}=0$ は $m=0,\boldsymbol p=0$ の一点だけに起こり、その点では $\sin(\omega t)/\omega$ を極限 $t$ で定義すればよいことを先に確認します。

<a id="thm-qft3-cauchy"></a>

<!-- formal-statement-start -->
> **定理（Schwartz初期値のCauchy解）**
> $m\ge0$ を定数とし、$f,g\in\mathcal S(\mathbb R^3;\mathbb C)$ を任意に与える。自由Klein–Gordon方程式

$$
(\partial_t^2-\Delta+m^2)\phi=0
$$

> と初期条件 $\phi(0,\cdot)=f,\ \partial_t\phi(0,\cdot)=g$ を満たす、各時刻で空間Schwartz級の古典解が一意に存在し、次式で与えられる。

$$
\phi(t,\boldsymbol x)
=\int_{\mathbb R^3}d\mu(\boldsymbol p)\,
e^{i\boldsymbol p\cdot\boldsymbol x}
\left[
\widehat f(\boldsymbol p)\cos(\omega_{\boldsymbol p}t)
+\widehat g(\boldsymbol p)
\frac{\sin(\omega_{\boldsymbol p}t)}{\omega_{\boldsymbol p}}
\right].
$$

> $\omega_{\boldsymbol p}=0$ では右辺の比を $t$ と読む。初期値が実数値なら解も実数値である。
<!-- formal-statement-end -->

### 証明の見取り図

各 $\boldsymbol p$ で二階常微分方程式を解くと、余弦の係数は初期の場、正弦の係数は初期速度に対応します。反転積分から解を戻し、方程式と二つの初期条件を検算します。一意性はFourier側の常微分方程式の一意性で確かめます。

<!-- proof-start -->
### 証明

$U(t,\boldsymbol p)=\widehat\phi(t,\boldsymbol p)$ と書きます。Fourier変換と微分の交換ができるSchwartz解なら

$$
U_{tt}+\omega_{\boldsymbol p}^2U=0,
\quad U(0,\boldsymbol p)=\widehat f(\boldsymbol p),
\quad U_t(0,\boldsymbol p)=\widehat g(\boldsymbol p).
$$

$\omega_{\boldsymbol p}>0$ に対する一般解 $A\cos(\omega t)+B\sin(\omega t)$ の初期値を代入すると $A=\widehat f$、$B=\widehat g/\omega$ です。$\omega=0$ なら $U_{tt}=0$ なので $U=\widehat f+t\widehat g$ となり、表示式の連続極限と一致します。

この式で逆Fourier積分を定めます。$t$ を固定すると

$$
C_t(\boldsymbol p)=\cos(t\sqrt{|\boldsymbol p|^2+m^2}),
\quad
S_t(\boldsymbol p)=
\frac{\sin(t\sqrt{|\boldsymbol p|^2+m^2})}
{\sqrt{|\boldsymbol p|^2+m^2}}
$$

は $\boldsymbol p$ の滑らかな関数です。原点付近では $q=|\boldsymbol p|^2+m^2$ として

$$
C_t=\sum_{n=0}^\infty
\frac{(-1)^nt^{2n}q^n}{(2n)!},
\qquad
S_t=\sum_{n=0}^\infty
\frac{(-1)^nt^{2n+1}q^n}{(2n+1)!}
$$

と書けるため、$m=0$ の原点でも特異性はありません。大きい $|\boldsymbol p|$ でこれらの任意の $\boldsymbol p$ 微分は固定した $t$ に対して高々多項式増大なので、Schwartz関数 $\widehat f,\widehat g$ との積は再びSchwartz関数です。したがって反転積分で得られる $\phi(t,\cdot)$ はSchwartz級で、$t$ に関する二階微分も有限な時間区間では積分内で実行できます。

積分内で方程式の左辺を計算すると

$$
\begin{aligned}
(\partial_t^2-\Delta+m^2)\phi
&=\int d\mu(\boldsymbol p)\,e^{i\boldsymbol p\cdot\boldsymbol x}
\bigl[\partial_t^2+\omega_{\boldsymbol p}^2\bigr]
\bigl(\widehat f C_t+\widehat g S_t\bigr)\\
&=0.
\end{aligned}
$$

$C_0=1,\ S_0=0,\ (\partial_tC_t)_{t=0}=0,\ (\partial_tS_t)_{t=0}=1$ なので、Fourier反転から $\phi(0)=f$、$\partial_t\phi(0)=g$ が得られます。一意性は二つのSchwartz解の差を空間Fourier変換すれば、各 $\boldsymbol p$ で初期値零の振動子の解が零となることから従います。実初期値のときは複素共役を取った解も同じ初期値を持つため、一意性から $\overline\phi=\phi$ です。
<!-- proof-end -->

最も単純な直接例は、周期境界条件の箱に入れた一つの余弦波です。$f(\boldsymbol x)=A\cos(\boldsymbol k\cdot\boldsymbol x)$、$g=0$ とすると

$$
\phi(t,\boldsymbol x)=A\cos(\boldsymbol k\cdot\boldsymbol x)
\cos\!\left(t\sqrt{|\boldsymbol k|^2+m^2}\right)
$$

です。これは初期の形を保つ定在波ですが、**全空間 $\mathbb R^3$ 上のSchwartz初期値ではありません**。有限周期箱の模式例として使い、全空間の解の定理へそのまま代入はしません。

## 3. 正振動数と負振動数はどこから現れるか

振動子の余弦と正弦は、複素指数関数二つに書き直せます。$\omega_{\boldsymbol p}>0$ で

$$
\begin{aligned}
\widehat\phi(t,\boldsymbol p)
&=a_+(\boldsymbol p)e^{-i\omega_{\boldsymbol p}t}
+a_-(\boldsymbol p)e^{i\omega_{\boldsymbol p}t},\\
a_+(\boldsymbol p)
&=\frac12\left(\widehat f(\boldsymbol p)
+\frac{i\widehat g(\boldsymbol p)}{\omega_{\boldsymbol p}}\right),\\
a_-(\boldsymbol p)
&=\frac12\left(\widehat f(\boldsymbol p)
-\frac{i\widehat g(\boldsymbol p)}{\omega_{\boldsymbol p}}\right).
\end{aligned}
$$

導出の確認として、和を取れば $a_++a_-=\widehat f$、時間微分して $-i\omega a_++i\omega a_-=\widehat g$ が戻ります。$e^{-i\omega t}$ の方を「正振動数」と呼ぶのは、時刻移動の因子を $e^{-iEt}$ と取ったとき $E=\omega>0$ に対応するためです。指数の肩に負号があることと、振動数の正負の呼称を取り違えないでください。

<a id="def-qft3-frequency"></a>

<!-- formal-statement-start -->
> **定義（正負振動数成分）**
> $m\ge0$、複素Schwartz初期値 $f,g$ をもつ自由Klein–Gordon解について、$\omega_{\boldsymbol p}>0$ で上記の $a_+,a_-$ を定める。$\phi$ を

$$
\phi=\phi_++\phi_-,
\qquad
\phi_\pm(t,\boldsymbol x)
=\int d\mu(\boldsymbol p)\,
a_\pm(\boldsymbol p)
e^{i\boldsymbol p\cdot\boldsymbol x\mp i\omega_{\boldsymbol p}t}
$$

> と分けたとき、$\phi_+$ を正振動数成分、$\phi_-$ を負振動数成分という。$m=0$ の $\boldsymbol p=0$ では係数を一点の値として定義する必要はなく、ほとんど至る所での積分表示で解釈する。
<!-- formal-statement-end -->

<!-- definition-example-start: def-qft3-frequency -->
### 例：静止した実Gaussianには両方の振動数が入る

**定義の確認**：係数の絶対収束、二つの指数因子の符号、初期値の復元を確認します。

第1節の $f(\boldsymbol x)=e^{-|\boldsymbol x|^2/(2\sigma^2)}$、$g=0$ を使うと、[FOU3のGaussian変換](../../../解析系/FOU/FOU3/index.md#lem-fou3-gaussian-transform)を三座標に適用して

$$
\widehat f(\boldsymbol p)
=(2\pi)^{3/2}\sigma^3e^{-\sigma^2|\boldsymbol p|^2/2},
\quad
a_+=a_-=\frac{\widehat f}{2}.
$$

両方を足すと $\widehat f\cos(\omega t)$ になり、$\partial_t\phi(0)=0$ が戻ります。もし正振動数成分だけを残すと初期の時間微分が一般に $-i\omega\widehat f/2$ となり、元の実初期値問題ではありません。**正振動数だけを取る操作と実場を取る操作は別**です。
<!-- definition-example-end -->

質量零では $\omega_{\boldsymbol p}=|\boldsymbol p|$ です。$\widehat g(0)\ne0$ なら $a_\pm$ に $1/|\boldsymbol p|$ が現れますが、三次元では原点近傍の積分

$$
\int_{|\boldsymbol p|<\varepsilon}
\frac{d^3p}{|\boldsymbol p|}
=4\pi\int_0^\varepsilon r\,dr
=2\pi\varepsilon^2
$$

は有限です。個々の係数は原点で発散し得ても、$a_\pm$ は局所可積分です。**一方、体積有限の周期箱の零モードは離散的な自由粒子型の $A+Bt$ になり、正負の振動子へ分けられません。** 連続運動量の測度零の一点と、離散箱の一つの自由度を混同しないことが重要です。

<a id="prop-qft3-reality"></a>

<!-- formal-statement-start -->
> **命題（実場の振動数係数の現実条件）**
> $m\ge0$ とし、実数値Schwartz初期値 $f,g$ に対応する解の係数 $a_\pm$ を取る。このとき、ほとんど全ての $\boldsymbol p$ で

$$
a_-(\boldsymbol p)
=\overline{a_+(-\boldsymbol p)}
$$

> が成立する。逆にSchwartz初期値から得られた複素解の係数がこの関係を満たせば、その解は実数値である。
<!-- formal-statement-end -->

### 証明の見取り図

実数値関数のFourier変換は、運動量を反転して複素共役を取ると元へ戻ります。この性質を二つの係数式に代入します。逆向きは指数を複素共役し、積分変数を反転させます。

<!-- proof-start -->
### 証明

実数値の $f$ なら

$$
\overline{\widehat f(-\boldsymbol p)}
=\overline{\int f(\boldsymbol x)e^{i\boldsymbol p\cdot\boldsymbol x}\,d^3x}
=\int f(\boldsymbol x)e^{-i\boldsymbol p\cdot\boldsymbol x}\,d^3x
=\widehat f(\boldsymbol p)
$$

です。$g$ も同様で、$\omega_{-\boldsymbol p}=\omega_{\boldsymbol p}$ だから

$$
\overline{a_+(-\boldsymbol p)}
=\frac12\left(\widehat f(\boldsymbol p)
-\frac{i\widehat g(\boldsymbol p)}{\omega_{\boldsymbol p}}\right)
=a_-(\boldsymbol p).
$$

逆向きには

$$
\begin{aligned}
\overline{\phi(t,\boldsymbol x)}
&=\int d\mu(\boldsymbol p)\,
\left[
\overline{a_+(\boldsymbol p)}
e^{-i\boldsymbol p\cdot\boldsymbol x+i\omega_{\boldsymbol p}t}
+\overline{a_-(\boldsymbol p)}
e^{-i\boldsymbol p\cdot\boldsymbol x-i\omega_{\boldsymbol p}t}
\right]\\
&=\int d\mu(\boldsymbol q)\,
\left[
a_-(\boldsymbol q)e^{i\boldsymbol q\cdot\boldsymbol x+i\omega_{\boldsymbol q}t}
+a_+(\boldsymbol q)e^{i\boldsymbol q\cdot\boldsymbol x-i\omega_{\boldsymbol q}t}
\right]
=\phi(t,\boldsymbol x),
\end{aligned}
$$

となります。第二行は $\boldsymbol q=-\boldsymbol p$ と置き、係数の関係を代入したものです。
<!-- proof-end -->

## 4. 保存形式は全解空間で正定値ではない

[QFT2の複素スカラー場のU(1)流](../QFT2/index.md#prop-qft2-u1)は、複素解から保存流を作る見本でした。同様に、二つの複素解 $u,v$ を組にすると、時間とともに変わらない双線形型が得られます。ただし **普通のHilbert空間の正定値内積と最初から同一視できません**。時間因子の符号によって値が正負に分かれるためです。

<a id="def-qft3-pairing"></a>

<!-- formal-statement-start -->
> **定義（Klein–Gordon保存形式）**
> $m\ge0$、$u,v$ を同じ質量 $m$ の複素Klein–Gordon方程式の、各時刻でSchwartz級の古典解とする。時刻 $t$ のKlein–Gordon形式を

$$
(u,v)_{\mathrm{KG}}(t)
=i\int_{\mathbb R^3}
\left(\overline u\,\partial_tv
-(\partial_t\overline u)\,v\right)\,d^3x
$$

> と定義する。これは第一変数に反線形、第二変数に線形なHermite形式である。
<!-- formal-statement-end -->

ここでHermite形式とは、$(u,v)_{\mathrm{KG}}=\overline{(v,u)_{\mathrm{KG}}}$ を満たすことです。実際、上の積分で $u,v$ を交換して複素共役すると同じ値へ戻ります。ただしHermiteであることは正定値であることを意味しません。

<!-- definition-example-start: def-qft3-pairing -->
### 例：一つの平面波の符号を周期箱で確かめる

**定義の確認**：保存形式を周期箱に置き換え、解の条件、積分の存在、正負の符号を確かめます。

体積 $V$ の周期箱で、許された一つの運動量 $\boldsymbol k$ と $\omega=\sqrt{|\boldsymbol k|^2+m^2}>0$ を選び、

$$
u_+(t,\boldsymbol x)
=\frac{e^{i\boldsymbol k\cdot\boldsymbol x-i\omega t}}
{\sqrt{2\omega V}},
\qquad
u_-(t,\boldsymbol x)
=\frac{e^{i\boldsymbol k\cdot\boldsymbol x+i\omega t}}
{\sqrt{2\omega V}}
$$

と置きます。$\partial_tu_\pm=\mp i\omega u_\pm$ なので

$$
\begin{aligned}
(u_+,u_+)_{\mathrm{KG}}
&=i\int(-2i\omega)|u_+|^2\,d^3x=1,\\
(u_-,u_-)_{\mathrm{KG}}
&=i\int(2i\omega)|u_-|^2\,d^3x=-1.
\end{aligned}
$$

分母の規格化、解の条件、保存形式の符号を一つずつ確かめました。これは周期箱の例であり、$\mathbb R^3$ 上の非減衰な平面波へ定義の積分をそのまま適用したものではありません。またQFT2で位相変換 $\psi\mapsto e^{i\varepsilon}\psi$ から得た流は、同じ場に対してこの形式の密度と **逆符号** です。保存流の符号は変換の生成子の選択に依存します。
<!-- definition-example-end -->

<a id="thm-qft3-pairing"></a>

<!-- formal-statement-start -->
> **定理（Klein–Gordon形式の保存と振動数符号）**
> $m\ge0$、$u,v$ をSchwartz初期値から得られる同質量の複素Klein–Gordon解とする。このとき $(u,v)_{\mathrm{KG}}(t)$ は $t$ に依存しない。また両解の[正負振動数係数](#def-qft3-frequency)を $a_\pm^u,a_\pm^v$ とすると

$$
(u,v)_{\mathrm{KG}}
=2\int_{\mathbb R^3}d\mu(\boldsymbol p)\,
\omega_{\boldsymbol p}
\left(
\overline{a_+^u(\boldsymbol p)}a_+^v(\boldsymbol p)
-\overline{a_-^u(\boldsymbol p)}a_-^v(\boldsymbol p)
\right).
$$

> 特に正振動数成分だけの解では非負、負振動数成分だけの解では非正である。全解空間では正定値ではない。
<!-- formal-statement-end -->

### 証明の見取り図

時間微分すると交差項が消え、残りは空間発散になります。Schwartz減衰で境界項は零です。もう一つの証明は初期時刻へFourier表示を代入することで、二つの振動数の交差項が符号の違いによって相殺されることを直接示します。

<!-- proof-start -->
### 証明

被積分関数を時間微分すると積の微分から

$$
\begin{aligned}
\frac d{dt}(u,v)_{\mathrm{KG}}
&=i\int
\left[
(\partial_t\overline u)(\partial_tv)
+\overline u\,\partial_t^2v
-(\partial_t^2\overline u)v
-(\partial_t\overline u)(\partial_tv)
\right]d^3x\\
&=i\int\left(\overline u\,\Delta v-(\Delta\overline u)v\right)d^3x\\
&=i\int\nabla\cdot
\left(\overline u\,\nabla v-v\nabla\overline u\right)d^3x=0.
\end{aligned}
$$

第二行で両解の $\partial_t^2=\Delta-m^2$ を代入すると質量項が相殺されます。第三行は積の微分であり、最後は急減少により無限遠の境界フラックスが零となるためです。

次に $t=0$ でのFourier表示を用います。[FOU4のParseval内積等式](../../../解析系/FOU/FOU4/index.md#thm-fou4-parseval)を三つの空間座標に適用すると

$$
(u,v)_{\mathrm{KG}}
=i\int d\mu(\boldsymbol p)\,
\left[
\overline{\widehat u}\,\partial_t\widehat v
-(\partial_t\overline{\widehat u})\,\widehat v
\right].
$$

一つの $\boldsymbol p$ で、$s=+1$ の項を $a_+e^{-i\omega t}$、$s=-1$ の項を $a_-e^{i\omega t}$ と書くと、$\overline{a_s^u e^{-is\omega t}}a_r^v e^{-ir\omega t}$ の係数は

$$
i\bigl[-ir\omega-is\omega\bigr]
=(s+r)\omega
$$

です。$s+r=0$ の交差項は消え、$s=r=+1$ なら $2\omega$、$s=r=-1$ なら $-2\omega$ が残るため主張の式が出ます。$m=0$ の零運動量は測度零で、$\omega|a_\pm|^2$ は原点近傍で高々定数倍の $1/|\boldsymbol p|$ なので積分は有限です。
<!-- proof-end -->

ここでの「非負」は $\phi_+\ne0$ なら真に正となる意味で使えますが、全体の $u=u_++u_-$ には正と負の寄与が混在します。したがって $(u,u)_{\mathrm{KG}}=0$ だから $u=0$ とはいえません。実場は正負振動数が共役の対になり、**その自己Klein–Gordon形式は零**です。これは場のエネルギーが零であるという意味ではありません。

## 5. 有限エネルギーの波束と平面波を区別する

[QFT1の自由場エネルギー](../QFT1/index.md#def-qft1-energy)は実場について

$$
E[\phi](t)=\frac12\int_{\mathbb R^3}
\left(|\partial_t\phi|^2+|\nabla\phi|^2
+m^2|\phi|^2\right)d^3x
$$

です。複素解には同じ式を実部と虚部のエネルギーの和として用います。[FOU4のParseval等式](../../../解析系/FOU/FOU4/index.md#thm-fou4-parseval)から、空間微分が $i\boldsymbol p$ の乗算になることを使うと、エネルギーは運動量ごとの振動子のエネルギーの和です。

<a id="prop-qft3-energy"></a>

<!-- formal-statement-start -->
> **命題（Fourier表示の自由場エネルギー）**
> $m\ge0$、$f,g\in\mathcal S(\mathbb R^3;\mathbb C)$ を初期値とするKlein–Gordon解について、上記の $E[\phi](t)$ は有限で時刻に依存せず、

$$
E[\phi]
=\frac12\int d\mu(\boldsymbol p)
\left(|\widehat g|^2+
\omega_{\boldsymbol p}^2|\widehat f|^2\right)
=\int d\mu(\boldsymbol p)\,
\omega_{\boldsymbol p}^2
\left(|a_+|^2+|a_-|^2\right)
$$

> が成立する。したがって実場で正負の成分のKlein–Gordon形式が相殺されても、エネルギーは一般に正である。
<!-- formal-statement-end -->

### 証明の見取り図

時刻零の空間側の三項にParsevalをそれぞれ適用します。最後の等号は初期値を $a_++a_-$ と $-i\omega a_++i\omega a_-$ に戻すと、交差項が消えることから出ます。時間一定性は前章の保存則を使えます。

<!-- proof-start -->
### 証明

初期時刻で

$$
\begin{aligned}
E[\phi](0)
&=\frac12\int
\left(|g|^2+\sum_j|\partial_jf|^2+m^2|f|^2\right)d^3x\\
&=\frac12\int d\mu(\boldsymbol p)\,
\left[
|\widehat g|^2+
\left(\sum_jp_j^2+m^2\right)|\widehat f|^2
\right].
\end{aligned}
$$

ここで $\sum_jp_j^2+m^2=\omega^2$ です。また

$$
\begin{aligned}
|\widehat g|^2+\omega^2|\widehat f|^2
&=\omega^2
\left(|a_--a_+|^2+|a_++a_-|^2\right)\\
&=2\omega^2\left(|a_+|^2+|a_-|^2\right),
\end{aligned}
$$

であり、第二行は複素数の恒等式 $|z-w|^2+|z+w|^2=2|z|^2+2|w|^2$ です。時間一定性は、実部と虚部のそれぞれへ[QFT1のエネルギー保存定理](../QFT1/index.md#thm-qft1-energy)を適用すればよく、Schwartz減衰により空間無限遠のフラックスは零です。
<!-- proof-end -->

単一の平面波 $e^{i\boldsymbol p\cdot\boldsymbol x-i\omega t}$ は振幅が無限遠で減衰しません。したがって非零の平面波は $\mathbb R^3$ 上で空間積分したエネルギーが発散します。定理の積分式にデルタ関数型のFourier係数をそのまま代入して絶対値二乗を取ることもできません。**正規化した波束や有限体積の周期箱**を用いてから極限を検討する必要があります。

## 6. 点の値ではなく、試験関数で場を読む

古典的な滑らかな場の値 $\phi(t,\boldsymbol x)$ は数値として存在します。しかし後で量子化すると、場を時空の各点で通常の作用素として扱うことには一般に問題が生じます。その準備として、まず古典場を「関数を一つ入力すると数値を返すもの」と読み替えます。

時空変数を $x=(t,\boldsymbol x)\in\mathbb R^4$ とします。Schwartz関数 $\chi\in\mathcal S(\mathbb R^4)$ とは、時空の全ての座標について、第1節と同じく任意の多項式重みを掛けた全階微分が有界なものです。$\chi$ は時空の広い範囲を弱く平均する重みであり、点評価の $\chi(x_0)$ とは異なります。

この関数空間上で連続線形に作用する対象は、[GPDE1の超関数](../../../解析系/GPDE/GPDE1/index.md#def-gpde1-distribution)を、コンパクト台関数から急減少関数へ広げたものです。ここで「連続」とは、Schwartz関数の全ての重み付き微分上限が十分小さければ作用の値も小さくなることを指します。

<a id="def-qft3-tempered"></a>

<!-- formal-statement-start -->
> **定義（緩増加超関数）**
> 時空Schwartz空間 $\mathcal S(\mathbb R^4)$ 上の複素線形汎関数 $T$ が、Schwartz関数の重み付き微分半ノルムで定まる位相に関して連続であるとき、$T$ を緩増加超関数（tempered distribution）という。すなわち有限個の非負整数の多重指数 $\alpha,\beta$ と定数 $C>0$ を用いて

$$
|T[\chi]|\le C\sum_{(\alpha,\beta)\in F}
\sup_{x\in\mathbb R^4}|x^\alpha\partial^\beta\chi(x)|
$$

> と全ての $\chi\in\mathcal S(\mathbb R^4)$ に対して評価できる。ここで $F$ は多重指数の有限集合である。
<!-- formal-statement-end -->

<!-- definition-example-start: def-qft3-tempered -->
### 例：試験関数の積分は緩増加超関数

**定義の確認**：$T[\chi]=\int_{\mathbb R^4}\chi(x)\,d^4x$ は線形です。$N=6$ とすれば $\int(1+|x|)^{-6}d^4x<\infty$ なので

$$
|T[\chi]|
\le \left(\int_{\mathbb R^4}(1+|x|)^{-6}d^4x\right)
\sup_x(1+|x|)^6|\chi(x)|.
$$

重み $(1+|x|)^6$ は有限個の座標単項式の絶対値の和で上から抑えられるため、右辺は定義の有限個の半ノルムで評価できます。従って連続性も直接確認できました。
<!-- definition-example-end -->

<a id="def-qft3-smearing"></a>

<!-- formal-statement-start -->
> **定義（古典場の試験関数smearing）**
> $\phi:\mathbb R^{1,3}\to\mathbb C$ をSchwartz初期値から得られる自由Klein–Gordon解とする。時空Schwartz関数 $\chi\in\mathcal S(\mathbb R^4;\mathbb C)$ に対し

$$
\Phi_\phi[\chi]
=\int_{\mathbb R^4}\phi(x)\chi(x)\,d^4x
$$

> を古典場 $\phi$ のsmearing（試験関数で積分した値）という。$\Phi_\phi$ は $\chi$ に対して複素線形な汎関数であり、通常の場の値と区別する。
<!-- formal-statement-end -->

<!-- definition-example-start: def-qft3-smearing -->
### 例：時空Gaussianで場を平均する

**定義の確認**：試験関数の急減少、積分の絶対収束、入力に対する線形性を調べます。

$\lambda,\sigma>0$ として

$$
\chi(t,\boldsymbol x)=
e^{-t^2/\lambda^2-|\boldsymbol x|^2/\sigma^2}
$$

を選びます。任意の時空偏微分は多項式と同じGaussianの積なので $\chi\in\mathcal S(\mathbb R^4)$ です。解 $\phi$ は第2節の積分表示と $a_\pm\in L^1(d^3p)$ から時空全体で有界です。ゆえに

$$
|\Phi_\phi[\chi]|
\le\sup_{t,\boldsymbol x}|\phi(t,\boldsymbol x)|
\int_{\mathbb R^4}
e^{-t^2/\lambda^2-|\boldsymbol x|^2/\sigma^2}\,d^4x
=M\pi^2\lambda\sigma^3
$$

と評価でき、積分は絶対収束します。$\phi=1$ は $m=0$ の古典解ですが、Schwartz初期値には含まれません。この例外的な解でも同じ積分式の値は $\pi^2\lambda\sigma^3$ となり、「点を読む」のではなく分布を平均する操作の意味が分かります。
また $\chi_1,\chi_2$ と複素数 $c_1,c_2$ に対して積分の線形性から $\Phi_\phi[c_1\chi_1+c_2\chi_2]=c_1\Phi_\phi[\chi_1]+c_2\Phi_\phi[\chi_2]$ です。
<!-- definition-example-end -->

<a id="prop-qft3-distribution"></a>

<!-- formal-statement-start -->
> **命題（古典Klein–Gordon解の超関数表示）**
> $m\ge0$ とし、Schwartz初期値から作った古典解 $\phi$ と上記の線形汎関数 $\Phi_\phi$ を取る。$\Phi_\phi$ は時空Schwartz空間上連続な緩増加超関数を定め、任意の $\chi\in\mathcal S(\mathbb R^4)$ について

$$
\Phi_\phi[(\Box+m^2)\chi]=0
$$

> を満たす。つまり自由Klein–Gordon方程式は試験関数への作用としても成り立つ。
<!-- formal-statement-end -->

### 証明の見取り図

自由解は全時空で有界なので、Schwartz関数との積分を関数の重み付き上限で評価できます。方程式の超関数版では微分を場から試験関数へ二回移し、境界項がないことを使います。

<!-- proof-start -->
### 証明

$a_\pm$ は第3節で見たように $L^1(\mathbb R^3)$ なので、振動数表示から

$$
|\phi(t,\boldsymbol x)|
\le\int d\mu(\boldsymbol p)
\bigl(|a_+(\boldsymbol p)|+|a_-(\boldsymbol p)|\bigr)
=M<\infty
$$

です。$N>4$ なら

$$
\begin{aligned}
|\Phi_\phi[\chi]|
&\le M\int_{\mathbb R^4}|\chi(x)|\,d^4x\\
&\le M
\left(\sup_x(1+|x|)^N|\chi(x)|\right)
\int_{\mathbb R^4}(1+|x|)^{-N}\,d^4x.
\end{aligned}
$$

後ろの積分は有限なので、Schwartz空間の半ノルムで連続性を示しました。[GPDE1の超関数の定義](../../../解析系/GPDE/GPDE1/index.md#def-gpde1-distribution)をコンパクト台関数から急減少関数へ拡張した緩増加超関数になっています。

次に $(\Box+m^2)\chi$ もSchwartz関数です。時間と空間の両端で $\chi$ とその微分が急減少し、$\phi$ と必要な導関数が有界なので、各変数で二度の部分積分が許されます。$\Box=\partial_t^2-\Delta$ は定数係数の二階微分作用素であり、二度の部分積分では符号が元へ戻るため、

$$
\begin{aligned}
\Phi_\phi[(\Box+m^2)\chi]
&=\int_{\mathbb R^4}\phi(\Box+m^2)\chi\,d^4x\\
&=\int_{\mathbb R^4}[(\Box+m^2)\phi]\chi\,d^4x
=0.
\end{aligned}
$$

最後は古典解の方程式です。これが「方程式を点ごとに書ける」場合に、より弱い試験関数形式も満たすことの直接検証です。
<!-- proof-end -->

量子論では将来 $\Phi[\chi]$ が状態空間上の作用素（一般に非有界）になるため、共通の稠密定義域や随伴、交換関係の検査が必要です。ここで示したのは**古典的な数値を返す超関数**についてだけであり、作用素値分布を構成したという主張ではありません。

## 7. 演習：初期値・周波数・分布をつなぐ

### 演習 QFT3-A1：Fourier変換した方程式

$m\ge0$ とし、$\phi(t,\cdot)$ とその二階導関数がSchwartz級である自由Klein–Gordon解を考える。空間Fourier変換した $\widehat\phi(t,\boldsymbol p)$ が満たす常微分方程式を導け。次に $U(t)=F\cos(\omega t)+G\sin(\omega t)/\omega$ の初期値を求めよ（$\omega>0$）。

- Level: A

<!-- solution-start -->
#### 詳細解答

空間Fourier変換では時間微分はそのまま残り、$\widehat{\partial_j^2\phi}=-p_j^2\widehat\phi$ です。よって

$$
\partial_t^2\widehat\phi+
\left(\sum_{j=1}^3p_j^2+m^2\right)\widehat\phi=0.
$$

$\omega^2=|\boldsymbol p|^2+m^2$ と書けば $U_{tt}+\omega^2U=0$ です。また

$$
U(0)=F,\qquad
U_t(t)=-\omega F\sin(\omega t)+G\cos(\omega t),
\qquad U_t(0)=G.
$$

従って $F$ は場の初期Fourier係数、$G$ は初期速度の係数です。
<!-- solution-end -->

### 演習 QFT3-A2：有限周期箱の一つの定在波

三次元周期箱で許される非零運動量 $\boldsymbol k$ を選ぶ。$m\ge0$、$\omega=\sqrt{|\boldsymbol k|^2+m^2}$、実定数 $A,B$ として、初期値 $f=A\cos(\boldsymbol k\cdot\boldsymbol x)$、$g=B\cos(\boldsymbol k\cdot\boldsymbol x)$ から出発する。自由場の解を構成し、初期値と運動方程式を検算せよ。

- Level: A

<!-- solution-start -->
#### 詳細解答

$f,g$ は同じ空間固有関数なので $\phi(t,\boldsymbol x)=q(t)\cos(\boldsymbol k\cdot\boldsymbol x)$ と置きます。空間Laplacianは

$$
\Delta\cos(\boldsymbol k\cdot\boldsymbol x)
=-|\boldsymbol k|^2\cos(\boldsymbol k\cdot\boldsymbol x)
$$

です。従って $q_{tt}+\omega^2q=0$、$q(0)=A$、$q_t(0)=B$ から

$$
\phi(t,\boldsymbol x)
=\left[A\cos(\omega t)+\frac B\omega\sin(\omega t)\right]
\cos(\boldsymbol k\cdot\boldsymbol x).
$$

時間微分して $t=0$ を代入すると $\partial_t\phi(0)=B\cos(\boldsymbol k\cdot\boldsymbol x)$ です。また二階時間微分は $-\omega^2\phi$、空間Laplacianは $-|\boldsymbol k|^2\phi$ なので、方程式の左辺は $(-\omega^2+|\boldsymbol k|^2+m^2)\phi=0$ です。
<!-- solution-end -->

### 演習 QFT3-A3：質量零の周期箱の零モード

$m=0$、有限の周期箱で空間的に定数な場 $\phi(t,\boldsymbol x)=q(t)$ を考える。一般解と初期値 $q(0)=A,\ q_t(0)=B$ を求め、なぜ $\omega=0$ のモードを $e^{\pm i\omega t}$ の二つの独立な振動へ分解できないか述べよ。

- Level: A

<!-- solution-start -->
#### 詳細解答

空間微分が零なので方程式は $q_{tt}=0$ です。一度積分すると $q_t=B$、もう一度積分すると

$$
q(t)=A+Bt
$$

です。$\omega=0$ では $e^{+i\omega t}=e^{-i\omega t}=1$ となり二つが同じ関数です。その線形結合だけでは $Bt$ を表せません。$\sin(\omega t)/\omega\to t$ という極限を先に取る必要があります。連続三次元運動量での $\boldsymbol p=0$ は測度零ですが、周期箱では独立な零モードである点も異なります。
<!-- solution-end -->

### 演習 QFT3-A4：時空Gaussianとsmearing

$\lambda,\sigma>0$ とし、$\chi(t,\boldsymbol x)=e^{-t^2/\lambda^2-|\boldsymbol x|^2/\sigma^2}$ とする。$\chi$ が時空Schwartz関数である理由を示し、$m=0$ の定数古典解 $\phi=1$ に対して拡張した積分 $\int\phi\chi\,d^4x$ を計算せよ。定数解がSchwartz初期値の定理の対象かも答えよ。

- Level: A

<!-- solution-start -->
#### 詳細解答

各変数の微分は多項式と $\chi$ の積です。Gaussianの指数減衰は任意の多項式重みを上回るため、全てのSchwartz半ノルムが有限です。一変数積分 $\int_{\mathbb R}e^{-t^2/\lambda^2}dt=\sqrt\pi\lambda$ と空間の三つのGaussian積分を掛けて

$$
\int_{\mathbb R^4}\phi\chi\,d^4x
=(\sqrt\pi\lambda)(\sqrt\pi\sigma)^3
=\pi^2\lambda\sigma^3.
$$

$\phi=1$ は $\Box\phi=0$ を満たすものの、初期値 $f=1$ は無限遠で減衰しないためSchwartz関数ではありません。ここではsmearing積分がより広い古典解にも使えることを検証しました。
<!-- solution-end -->

### 演習 QFT3-A5：実数値初期データの係数

$m>0$、$\sigma>0$、$c\in\mathbb R$ とする。初期値 $f(\boldsymbol x)=e^{-|\boldsymbol x|^2/(2\sigma^2)}$、$g=cf$ の正負振動数係数を求め、$a_-(\boldsymbol p)=\overline{a_+(-\boldsymbol p)}$ を直接確認せよ。

- Level: A

<!-- solution-start -->
#### 詳細解答

第3節のGaussian変換から $\widehat f=(2\pi)^{3/2}\sigma^3e^{-\sigma^2|\boldsymbol p|^2/2}$ は実数値かつ偶関数です。$\widehat g=c\widehat f$ なので

$$
a_\pm(\boldsymbol p)
=\frac{\widehat f(\boldsymbol p)}2
\left(1\pm\frac{ic}{\omega_{\boldsymbol p}}\right).
$$

$\omega_{-\boldsymbol p}=\omega_{\boldsymbol p}$、$\widehat f(-\boldsymbol p)=\widehat f(\boldsymbol p)\in\mathbb R$ より

$$
\overline{a_+(-\boldsymbol p)}
=\frac{\widehat f(\boldsymbol p)}2
\left(1-\frac{ic}{\omega_{\boldsymbol p}}\right)
=a_-(\boldsymbol p).
$$

したがって両成分の和は実場です。$c\ne0$ なら二つの係数は同一ではありませんが、共役関係は保たれます。
<!-- solution-end -->

### 演習 QFT3-B1：Gaussian波束の有限エネルギー

$m\ge0$、$\sigma>0$ とし、実初期値 $f(\boldsymbol x)=e^{-|\boldsymbol x|^2/(2\sigma^2)}$、$g=0$ を取る。

1. $|\nabla f|^2$ を求めよ。
2. $\int_{\mathbb R^3}e^{-|\boldsymbol x|^2/\sigma^2}d^3x$ と $\int_{\mathbb R^3}|\boldsymbol x|^2e^{-|\boldsymbol x|^2/\sigma^2}d^3x$ を求めよ。
3. 自由場のエネルギーを時刻零で計算し、$\sigma$ と $m$ の依存を説明せよ。

- Level: B

<!-- solution-start -->
#### 詳細解答

**(1)** 各座標で $\partial_jf=-(x^j/\sigma^2)f$ です。従って

$$
|\nabla f|^2
=\sum_j\frac{(x^j)^2}{\sigma^4}|f|^2
=\frac{|\boldsymbol x|^2}{\sigma^4}
e^{-|\boldsymbol x|^2/\sigma^2}.
$$

**(2)** 三つの一変数Gaussian積分の積から

$$
I_0=\int_{\mathbb R^3}e^{-|\boldsymbol x|^2/\sigma^2}d^3x
=\pi^{3/2}\sigma^3.
$$

次に $a=\sigma^{-2}>0$ に対し $I_0(a)=(\pi/a)^{3/2}$ と見れば、積分内微分がGaussian優収束で許され、

$$
-I_0'(a)
=\int_{\mathbb R^3}|\boldsymbol x|^2e^{-a|\boldsymbol x|^2}d^3x
=\frac32\pi^{3/2}a^{-5/2}.
$$

従って $a=\sigma^{-2}$ では $I_2=\frac32\pi^{3/2}\sigma^5$ です。

**(3)** 初期速度が零なので

$$
\begin{aligned}
E
&=\frac12\int(|\nabla f|^2+m^2f^2)\,d^3x\\
&=\frac12\left(\frac{I_2}{\sigma^4}+m^2I_0\right)\\
&=\pi^{3/2}\sigma^3
\left(\frac{3}{4\sigma^2}+\frac{m^2}{2}\right).
\end{aligned}
$$

$\sigma$ が小さいほど勾配による寄与は相対的に大きく、$m$ は場の二乗による寄与を増やします。どの $\sigma>0$ でも有限です。
<!-- solution-end -->

### 演習 QFT3-B2：保存エネルギーの周波数表示

$m>0$、複素Schwartz初期値 $f,g$ とその自由解を考える。三次元Parseval等式を使って

$$
E=\frac12\int d\mu(\boldsymbol p)
\left(|\widehat g|^2+
\omega_{\boldsymbol p}^2|\widehat f|^2\right)
$$

を導き、$a_\pm=(\widehat f\pm i\widehat g/\omega)/2$ によって正負振動数の絶対値二乗の和へ書き換えよ。$\widehat f=0$、$\widehat g\not\equiv0$ の場合にもエネルギーが正であることを示せ。

- Level: B

<!-- solution-start -->
#### 詳細解答

[FOU4のParseval等式](../../../解析系/FOU/FOU4/index.md#thm-fou4-parseval)を各空間座標へ使い、$\widehat{\partial_jf}=ip_j\widehat f$ を代入します。初期時刻に

$$
\begin{aligned}
\int|\nabla f|^2d^3x
&=\int d\mu(\boldsymbol p)\sum_jp_j^2|\widehat f|^2,\\
\int |g|^2d^3x
&=\int d\mu(\boldsymbol p)|\widehat g|^2.
\end{aligned}
$$

質量項 $m^2\int|f|^2$ を加えると $|\boldsymbol p|^2+m^2=\omega^2$ になり、指定式を得ます。さらに $\widehat f=a_++a_-$、$\widehat g=i\omega(a_--a_+)$ だから

$$
\begin{aligned}
|\widehat g|^2+\omega^2|\widehat f|^2
&=\omega^2\{|a_--a_+|^2+|a_-+a_+|^2\}\\
&=2\omega^2(|a_-|^2+|a_+|^2).
\end{aligned}
$$

よって $E=\int d\mu\,\omega^2(|a_+|^2+|a_-|^2)$ です。$\widehat f=0$ なら最初の式は $E=\frac12\int d\mu|\widehat g|^2>0$ です。ここでは $\widehat g\not\equiv0$ とSchwartz連続性から積分が真に正となります。
<!-- solution-end -->

### 演習 QFT3-B3：周期箱での正負振動数の直交性

体積 $V$ の周期箱で $m>0$ とする。許された運動量 $\boldsymbol k,\boldsymbol \ell$ に対し

$$
u_{\boldsymbol k}^{\pm}(t,\boldsymbol x)
=\frac{e^{i\boldsymbol k\cdot\boldsymbol x\mp i\omega_{\boldsymbol k}t}}
{\sqrt{2\omega_{\boldsymbol k}V}}
$$

を考える。Klein–Gordon保存形式で $(u_{\boldsymbol k}^+,u_{\boldsymbol\ell}^+)$、$(u_{\boldsymbol k}^-,u_{\boldsymbol\ell}^-)$、$(u_{\boldsymbol k}^+,u_{\boldsymbol\ell}^-)$ を計算せよ。

- Level: B

<!-- solution-start -->
#### 詳細解答

周期箱の直交積分は

$$
\int_Ve^{i(\boldsymbol\ell-\boldsymbol k)\cdot\boldsymbol x}d^3x
=V\,\delta_{\boldsymbol k,\boldsymbol\ell}
$$

です。正振動数の同士では $\partial_tu^+=-i\omega u^+$、$\partial_t\overline{u^+}=i\omega\overline{u^+}$ だから被積分関数の係数は $i(-i\omega_{\boldsymbol\ell}-i\omega_{\boldsymbol k})=\omega_{\boldsymbol\ell}+\omega_{\boldsymbol k}$ です。運動量が一致する場合だけ残るので

$$
(u_{\boldsymbol k}^+,u_{\boldsymbol\ell}^+)
=\frac{2\omega_{\boldsymbol k}V}
{2\omega_{\boldsymbol k}V}
\delta_{\boldsymbol k,\boldsymbol\ell}
=\delta_{\boldsymbol k,\boldsymbol\ell}.
$$

負振動数同士では時間微分の二つの符号が逆になるので、同じ計算で

$$
(u_{\boldsymbol k}^-,u_{\boldsymbol\ell}^-)
=-\delta_{\boldsymbol k,\boldsymbol\ell}
$$

です。交差項は空間積分が零ならもちろん零ですが、$\boldsymbol k=\boldsymbol\ell$ でも係数が $i(i\omega_{\boldsymbol\ell}-i\omega_{\boldsymbol k})=0$ なので

$$
(u_{\boldsymbol k}^+,u_{\boldsymbol\ell}^-)=0
$$

です。これは通常の正定値Hilbert内積と異なり、負振動数の自己形式が負になるという例です。
<!-- solution-end -->

### 演習 QFT3-B4：古典解の弱い方程式

$m\ge0$ とし、$\phi\in C^2(\mathbb R^{1,3})$ が自由Klein–Gordon方程式を満たし、$\phi$ とその一階微分が有界とする。コンパクト台の滑らかな試験関数 $\chi$ に対し、積分の部分積分を行って

$$
\int_{\mathbb R^4}\phi(\Box+m^2)\chi\,d^4x=0
$$

を示せ。さらに時間微分の一階だけを移すときの負号と、二階を移すときの符号をそれぞれ明記せよ。

- Level: B

<!-- solution-start -->
#### 詳細解答

試験関数 $\chi$ の台はコンパクトなので、任意の $t$ 方向の外端で $\chi=\partial_t\chi=0$ です。よって

$$
\int\phi\,\partial_t\chi\,d^4x
=-\int(\partial_t\phi)\chi\,d^4x
$$

となります。さらに一度部分積分すると

$$
\int\phi\,\partial_t^2\chi\,d^4x
=-\int(\partial_t\phi)\partial_t\chi\,d^4x
=\int(\partial_t^2\phi)\chi\,d^4x.
$$

空間各座標でも同じ二回の部分積分により $\int\phi\partial_j^2\chi=\int(\partial_j^2\phi)\chi$ です。従って

$$
\begin{aligned}
\int\phi(\Box+m^2)\chi\,d^4x
&=\int[(\partial_t^2-\Delta+m^2)\phi]\chi\,d^4x\\
&=0.
\end{aligned}
$$

一階微分では負号が一つ、二階微分では負号が二つ現れて元に戻ります。$m^2$ は微分を含まないので移動操作を要しません。
<!-- solution-end -->

### 演習 QFT3-C1：純正振動数の初期値を設計する

$m>0,\ \sigma>0$ とし、実Gaussian $f(\boldsymbol x)=e^{-|\boldsymbol x|^2/(2\sigma^2)}$ を出発点とする。$\widehat f$ は第3節のものとする。複素初期速度をFourier側で

$$
\widehat g(\boldsymbol p)
=-i\omega_{\boldsymbol p}\widehat f(\boldsymbol p)
$$

と定める（$g$ はこの逆Fourier変換）。

1. $g$ がSchwartz級で、初期値が古典解を定めることを示せ。
2. 係数 $a_\pm$ を求め、純正振動数であることを示せ。
3. $(\phi,\phi)_{\mathrm{KG}}$ と $E[\phi]$ をFourier積分で計算し、それぞれの符号を示せ。
4. 反対に初期速度を零へ変更すると、実場のKlein–Gordon自己形式とエネルギーがそれぞれどうなるか述べよ。
5. 任意の時空Schwartz関数 $\chi$ に対し、$\Phi_\phi[(\Box+m^2)\chi]=0$ が成立する理由を、積分の定義域・境界項も含めて説明せよ。

- Level: C

<!-- solution-start -->
#### 詳細解答

**(1)** $m>0$ なので $\omega_{\boldsymbol p}=\sqrt{|\boldsymbol p|^2+m^2}$ は全 $\boldsymbol p$ で滑らかで、その任意階導関数は高々多項式増大です。$\widehat f$ はGaussianで急減少だから $\omega\widehat f$ もSchwartz級です。従ってその逆Fourier変換 $g$ もSchwartz級であり、[Cauchy解定理](#thm-qft3-cauchy)が適用できます。

**(2)** [正負振動数成分](#def-qft3-frequency)の式へ代入すると

$$
\begin{aligned}
a_+&=\frac12\left(\widehat f+
\frac{i(-i\omega\widehat f)}\omega\right)
=\widehat f,\\
a_-&=\frac12\left(\widehat f-
\frac{i(-i\omega\widehat f)}\omega\right)
=0.
\end{aligned}
$$

よって

$$
\phi(t,\boldsymbol x)
=\int d\mu(\boldsymbol p)
\widehat f(\boldsymbol p)
e^{i\boldsymbol p\cdot\boldsymbol x-i\omega_{\boldsymbol p}t}.
$$

**(3)** [Klein–Gordon形式の振動数表示](#thm-qft3-pairing)に $a_-=0$ を代入すれば

$$
(\phi,\phi)_{\mathrm{KG}}
=2\int d\mu(\boldsymbol p)\,\omega_{\boldsymbol p}
|\widehat f(\boldsymbol p)|^2>0.
$$

[エネルギーの振動数表示](#prop-qft3-energy)から

$$
E[\phi]=\int d\mu(\boldsymbol p)
\omega_{\boldsymbol p}^2|\widehat f(\boldsymbol p)|^2>0.
$$

いずれも $\widehat f$ が零関数でなく、$\omega_{\boldsymbol p}\ge m>0$ なので真に正です。ただし積分の重みは $2\omega$ と $\omega^2$ であり、この二つの時間一定の量を同一視してはいけません。

**(4)** $g=0$ にすると $a_+=a_-=\widehat f/2$ です。実初期値なので解は実場となり、正負の寄与が等しいため自己形式は零です。一方、

$$
E=\frac12\int d\mu(\boldsymbol p)
\omega_{\boldsymbol p}^2|\widehat f|^2>0
$$

です。これは「自己形式が零なのにエネルギーは正」の具体例です。

**(5)** 第2節の解の積分表示から $\phi$ と必要な導関数は時空全体で有界です。$\chi$ とその導関数は全方向で急減少するので、$\Phi_\phi[\chi]$ および $\Phi_\phi[(\Box+m^2)\chi]$ は絶対収束します。各時間・空間座標で二度部分積分すると境界項が零になり、

$$
\Phi_\phi[(\Box+m^2)\chi]
=\int[(\Box+m^2)\phi]\chi\,d^4x=0
$$

です。最後の零は第2節で古典的に検証した方程式から従います。ここで得たのは数値を返す超関数であり、量子場の作用素を定義したわけではありません。
<!-- solution-end -->

## 8. 次の講義へ

初期値から古典場の全ての運動量成分を構成できました。正負振動数は古典的な複素解の分解として既に現れますが、その係数がただちに生成・消滅演算子であるわけではありません。

次はこの調和振動子の集まりをFock空間上で量子化し、正規化、共通の稠密定義域、交換関係、真空を検討します。場を点ごとの作用素として急いで扱わず、試験関数で積分した作用素から始める理由も、ここまでの古典的なsmearingから理解できます。
