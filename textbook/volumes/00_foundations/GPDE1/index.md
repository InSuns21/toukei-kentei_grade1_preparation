# GPDE1：テスト関数・distribution

Encore II では、PDE を十分滑らかな関数の等式として読みました。ところが、PDE1 の Burgers 方程式では特性線が交差して古典微分が壊れ、PDE6 の基本解では一点に集中した source を表す Dirac delta が顔を出しました。

ここで発想を変えます。

$$
\text{各点で微分できるか}
\quad\longrightarrow\quad
\text{滑らかな probe に作用させたとき何が起こるか}
$$

この probe が **テスト関数**、probe への作用として対象を読む枠組みが **distribution** です。

英語の distribution は確率論の probability distribution にも使われます。本系列では、文脈が明らかなとき distribution を Schwartz distribution（超関数）の意味で使います。確率分布とは別の概念です。

本章では distribution の「微分」はまだ定義しません。それは GPDE2 の仕事です。代わりに、

- テスト関数をどう収束させるか。
- distribution の連続性をどう手で検証するか。
- 普通の局所可積分関数がどう distribution になるか。
- Dirac delta がなぜ distribution で、なぜ普通の関数ではないか。
- PDE をテスト関数恒等式として読むとは何か。

を閉じます。

---

## 1. なぜ滑らかでコンパクトな probe を使うのか

PDE では部分積分を繰り返します。そこで probe 自身には何回でも微分できる滑らかさが欲しくなります。

同時に、境界項を消して領域内部だけを調べたいので、probe は領域の内部にコンパクトに収まっていてほしい。この二つを同時に満たすのが $C_c^\infty$ です。

開集合 $\Omega\subset\mathbb R^d$ を固定します。関数 $\varphi$ の台を

$$
\operatorname{supp}\varphi
=
\overline{\{x\in\Omega:\varphi(x)\ne0\}}
$$

と書きます。

<a id="def-gpde1-test-function"></a>
<!-- formal-statement-start -->
> **定義（テスト関数とテスト関数空間）**  
> 開集合 $\Omega\subset\mathbb R^d$ 上で、無限回連続微分可能かつ台が $\Omega$ 内のコンパクト集合である関数 $\varphi$ を **テスト関数**という。テスト関数全体を

$$
\mathcal D(\Omega)
=
C_c^\infty(\Omega)
$$

> と書く。
<!-- formal-statement-end -->

### 最小の具体例：bump 関数

一変数で

$$
h(t)
=
\begin{cases}
e^{-1/t},&t>0,\\
0,&t\le0
\end{cases}
$$

と置くと、$h$ は $t=0$ を含めて $C^\infty$ 級です。$t>0$ 側で何回微分しても

$$
\frac{\text{多項式}(1/t)}{t^m}e^{-1/t}
$$

の形の有限和になり、$t\downarrow0$ では指数減衰が任意の $t^{-N}$ より速いため、全ての右微分が $0$ へ落ちます。左側では恒等的に $0$ なので、微分が全階でつながります。

したがって

$$
\eta(x)
=
e\,h(1-|x|^2)
$$

は $\mathbb R^d$ 上の $C^\infty$ 関数で、

$$
0\le\eta\le1,\qquad
\eta(0)=1,\qquad
\operatorname{supp}\eta\subset\overline{B(0,1)}
$$

を満たします。

<!-- definition-example-start: def-gpde1-test-function -->
**定義の確認**

$\eta$ は無限回微分可能で、非零になり得るのは $|x|<1$ の内部だけです。従って台は閉単位球の部分集合でありコンパクトです。よって

$$
\eta\in\mathcal D(\mathbb R^d).
$$

一方 $e^{-|x|^2}$ は $C^\infty$ ですが全空間で非零なので台がコンパクトではありません。したがってテスト関数ではありません。
<!-- definition-example-end -->

この bump 関数を平行移動・縮小すれば、領域内部の任意の小さな場所だけを probe できます。

---

## 2. テスト関数の「収束」は点ごとの収束より強くする

distribution の連続性を定義するには、入力するテスト関数がどの意味で近づくかを先に決める必要があります。

コンパクト集合 $K\subset\Omega$ と整数 $m\ge0$ に対し、$\operatorname{supp}\varphi\subset K$ のとき

$$
p_{K,m}(\varphi)
$$

を、$\varphi$ とその $m$ 階までの全ての偏微分の絶対値の $K$ 上の最大値、とします。特に

$$
p_{K,0}(\varphi)
=
\sup_{x\in K}|\varphi(x)|.
$$

<a id="def-gpde1-test-function-convergence"></a>
<!-- formal-statement-start -->
> **定義（テスト関数列の収束）**  
> $\varphi_n,\varphi\in\mathcal D(\Omega)$ とする。$\varphi_n\to\varphi$ in $\mathcal D(\Omega)$ とは、ある一つのコンパクト集合 $K\subset\Omega$ が存在して

$$
\operatorname{supp}\varphi_n\subset K,
\qquad
\operatorname{supp}\varphi\subset K
$$

> が全ての $n$ で成り立ち、さらに任意の整数 $m\ge0$ について

$$
p_{K,m}(\varphi_n-\varphi)\to0
$$

> が成り立つことをいう。
<!-- formal-statement-end -->

重要なのは二条件です。

1. **台が一つの固定コンパクト集合から逃げない。**
2. **関数だけでなく全階の偏微分が一様に近づく。**

<!-- definition-example-start: def-gpde1-test-function-convergence -->
**なぜ「共通コンパクト台」が必要か**

非零の $\eta\in\mathcal D(\mathbb R)$ を一つ固定し、

$$
\varphi_n(x)=\eta(x-n)
$$

とします。各固定点 $x$ では十分大きい $n$ に対して $x$ は台の外に出るので、

$$
\varphi_n^{(k)}(x)\to0
$$

が全ての $k$ で成り立ちます。

しかし台は右へ逃げ続け、一つのコンパクト集合には入りません。実際、

$$
\int_{\mathbb R}\varphi_n(x)\,dx
=
\int_{\mathbb R}\eta(x)\,dx
$$

は一定で 0 へ行きません。

「各点では消えた」だけでは、積分で観測した量が消えるとは限りません。distribution が局所的な probe の極限を安定に読むために、固定コンパクト台が必要です。
<!-- definition-example-end -->

---

## 3. distribution は連続線形汎関数である

F0-02C2 では、関数を入力して数を返す線形汎関数を扱いました。ここでは入力空間が $\mathcal D(\Omega)$ です。

<a id="def-gpde1-distribution"></a>
<!-- formal-statement-start -->
> **定義（distribution）**  
> 写像

$$
T:\mathcal D(\Omega)\to\mathbb R
$$

> または複素数値の写像が **distribution** であるとは、次の二条件を満たすことをいう。
>
> 1. 線形性：
>
> $$T(a\varphi+b\psi)=aT(\varphi)+bT(\psi).$$
>
> 2. テスト関数列に対する連続性：$\varphi_n\to\varphi$ in $\mathcal D(\Omega)$ なら
>
> $$T(\varphi_n)\to T(\varphi).$$
>
> distribution 全体を $\mathcal D'(\Omega)$ と書き、作用を

$$
\langle T,\varphi\rangle
$$

> と表す。
<!-- formal-statement-end -->

この系列では一般の局所凸位相空間論を前提にしません。上の「列を使った連続性」を直接使い、必要な評価へ落とします。

二つの distribution $S,T$ が等しいとは、全ての $\varphi\in\mathcal D(\Omega)$ に対して

$$
\langle S,\varphi\rangle
=
\langle T,\varphi\rangle
$$

となることです。distribution の世界では、各点の値ではなく **全ての probe に対する応答** が対象を決めます。

<!-- definition-example-start: def-gpde1-distribution -->
**定義の確認**

最も単純な例として

$
\langle T_1,\varphi\rangle
=
\int_\Omega\varphi(x)\,dx
$

を考えます。積分の線形性から $T_1$ は線形です。

$arphi_n\to0$ in $\mathcal D(\Omega)$ とし、全ての台を含む共通コンパクト集合を $K$ とすると、

$
|\langle T_1,\varphi_n\rangle|
\le
|K|\,p_{K,0}(\varphi_n)
\to0.
$

ここで $|K|$ は $K$ の Lebesgue 測度です。従って $T_1$ はテスト関数列に対して連続であり、distribution です。

この例では distribution の作用は普通の積分ですが、Dirac delta のように積分可能関数では表せない作用も同じ定義に入ります。
<!-- definition-example-end -->

---

## 4. 連続性を手で確認できる形にする

定義のままでは「全ての収束列」を確認する必要がありそうに見えます。実際には固定コンパクト集合ごとの有限階評価に落とせます。

<a id="prop-gpde1-local-finite-order"></a>
<!-- formal-statement-start -->
> **命題（distribution の局所有限階評価）**  
> 線形写像 $T:\mathcal D(\Omega)\to\mathbb R$ または $\mathbb C$ を考える。$T$ が上の意味で distribution であることと、任意のコンパクト集合 $K\subset\Omega$ に対して、ある整数 $m\ge0$ と定数 $C>0$ が存在し、

$$
|\langle T,\varphi\rangle|
\le
C\,p_{K,m}(\varphi)
$$

> が $\operatorname{supp}\varphi\subset K$ を満たす全ての $\varphi\in\mathcal D(\Omega)$ に対して成り立つことは同値である。
<!-- formal-statement-end -->

### 証明の見取り図

評価があれば、$\varphi_n\to0$ のとき $p_{K,m}(\varphi_n)\to0$ なので直ちに $T\varphi_n\to0$ です。

逆向きは背理法です。ある $K$ 上でどの有限階評価も存在しないなら、$n$ 階までの微分は非常に小さいのに $T$ の値だけ 1 のまま、という列を作れます。それは distribution の連続性に反します。

<!-- proof-start -->
### 証明

まず有限階評価を仮定します。

$\varphi_n\to0$ in $\mathcal D(\Omega)$ とします。定義より、ある一つのコンパクト集合 $K$ が全ての台を含みます。$K$ に対する評価の $m,C$ を取ると、

$$
|\langle T,\varphi_n\rangle|
\le
C\,p_{K,m}(\varphi_n).
$$

右辺は 0 へ収束するので、

$$
\langle T,\varphi_n\rangle\to0.
$$

線形性から一般の $\varphi_n\to\varphi$ も $\varphi_n-\varphi\to0$ を使えば連続性が従います。

逆に $T$ が distribution であるとし、あるコンパクト集合 $K$ について有限階評価が存在しないと仮定します。

すると各 $n\ge1$ に対して、$\operatorname{supp}\psi_n\subset K$ を満たし、

$$
|\langle T,\psi_n\rangle|
>
n\,p_{K,n}(\psi_n)
$$

となる $\psi_n$ を取れます。

$\langle T,\psi_n\rangle\ne0$ なので

$$
\varphi_n
=
\frac{\psi_n}{|\langle T,\psi_n\rangle|}
$$

と置くと、

$$
p_{K,n}(\varphi_n)<\frac1n,
\qquad
|\langle T,\varphi_n\rangle|=1.
$$

固定した $m$ に対し、$n\ge m$ なら

$$
p_{K,m}(\varphi_n)
\le
p_{K,n}(\varphi_n)
<
\frac1n.
$$

従って任意の $m$ について

$$
p_{K,m}(\varphi_n)\to0.
$$

台は全て $K$ に入っているので

$$
\varphi_n\to0
\quad\text{in }\mathcal D(\Omega).
$$

しかし

$$
|\langle T,\varphi_n\rangle|=1
$$

であり $T(\varphi_n)\to0$ ではありません。これは distribution の連続性に反します。

よって各 $K$ 上で有限階評価が存在します。
<!-- proof-end -->

この命題は後続で何度も使います。新しい候補 $T$ が distribution か確認したいとき、収束列を一つずつ追う代わりに **固定コンパクト台上で何階微分まで見れば作用を抑えられるか** を探せばよいわけです。

---

## 5. 普通の関数は distribution として読める

PDE では滑らかでなくても積分可能な関数を扱いたいので、まず $L^1_{\mathrm{loc}}$ を distribution に入れます。

<a id="def-gpde1-regular-distribution"></a>
<!-- formal-statement-start -->
> **定義（正則 distribution）**  
> $f\in L^1_{\mathrm{loc}}(\Omega)$ に対して

$$
\langle T_f,\varphi\rangle
=
\int_\Omega f(x)\varphi(x)\,dx
$$

> と定める。この作用が定める distribution を $f$ による **正則 distribution** という。
<!-- formal-statement-end -->

式が有限であることは、$\varphi$ の台がコンパクトであることから従います。実際、$\operatorname{supp}\varphi\subset K\subset\Omega$ なら

$$
\int_\Omega |f\varphi|
=
\int_K |f\varphi|
\le
p_{K,0}(\varphi)\int_K|f|<\infty.
$$

<a id="prop-gpde1-l1loc-distribution"></a>
<!-- formal-statement-start -->
> **命題（局所可積分関数は distribution を定める）**  
> $f\in L^1_{\mathrm{loc}}(\Omega)$ とする。このとき

$$
\langle T_f,\varphi\rangle
=
\int_\Omega f\varphi
$$

> は $\mathcal D(\Omega)$ 上の distribution である。
<!-- formal-statement-end -->

### 証明の見取り図

線形性は積分の線形性です。連続性には前節の有限階評価を使い、

$$
|\langle T_f,\varphi\rangle|
\le
\left(\int_K|f|\right)p_{K,0}(\varphi)
$$

と $m=0$ で抑えます。局所可積分性が、固定コンパクト集合 $K$ 上の積分を有限にする箇所です。

<!-- proof-start -->
### 証明

積分の線形性から $T_f$ は線形です。

コンパクト集合 $K\subset\Omega$ を固定し、$\operatorname{supp}\varphi\subset K$ とします。このとき

$$
|\langle T_f,\varphi\rangle|
=
\left|
\int_K f(x)\varphi(x)\,dx
\right|
\le
\int_K |f(x)|\,|\varphi(x)|\,dx.
$$

さらに

$$
|\varphi(x)|
\le
p_{K,0}(\varphi)
$$

なので、

$$
|\langle T_f,\varphi\rangle|
\le
\left(\int_K|f(x)|\,dx\right)
p_{K,0}(\varphi).
$$

$f\in L^1_{\mathrm{loc}}(\Omega)$ より括弧内は有限です。従って [局所有限階評価](#prop-gpde1-local-finite-order)を $m=0$ で満たし、$T_f$ は distribution です。
<!-- proof-end -->

<!-- definition-example-start: def-gpde1-regular-distribution -->
**特異でも局所可積分ならよい**

$\Omega=(-1,1)$ で

$$
f(x)=|x|^{-1/2}
$$

を考えます。$x=0$ で発散しますが、

$$
\int_{-r}^{r}|x|^{-1/2}\,dx
=
4\sqrt r<\infty
\qquad
(0<r<1)
$$

なので $f\in L^1_{\mathrm{loc}}((-1,1))$ です。

従って

$$
\langle T_f,\varphi\rangle
=
\int_{-1}^{1}|x|^{-1/2}\varphi(x)\,dx
$$

は正則 distribution を定めます。distribution は「滑らかな関数だけを含む拡張」ではなく、まず局所可積分な粗い関数を全て受け入れます。
<!-- definition-example-end -->

Lebesgue 積分では、測度 0 の集合上でだけ異なる関数を同じものとして扱います。この通常の約束のもとで、$f\mapsto T_f$ が異なる $L^1_{\mathrm{loc}}$ の元を異なる distribution へ送ることまでは本章で証明しません。GPDE2 の mollifier を使うと、$T_f=0$ なら $f=0$ がほとんど至る所で成り立つことまで自然に閉じられます。

---

## 6. Dirac delta は「点を読む」distribution である

<a id="def-gpde1-dirac"></a>
<!-- formal-statement-start -->
> **定義（Dirac delta）**  
> $a\in\Omega$ とする。$\delta_a\in\mathcal D'(\Omega)$ を

$$
\langle\delta_a,\varphi\rangle
=
\varphi(a)
$$

> により定める。これを点 $a$ における **Dirac delta** という。
<!-- formal-statement-end -->

<!-- definition-example-start: def-gpde1-dirac -->
**distribution 条件を直接確認する**

線形性は

$$
\langle\delta_a,c\varphi+d\psi\rangle
=
c\varphi(a)+d\psi(a)
$$

から直ちに分かります。

コンパクト集合 $K$ に台を持つ $\varphi$ について、$a\in K$ なら

$$
|\langle\delta_a,\varphi\rangle|
=
|\varphi(a)|
\le
p_{K,0}(\varphi),
$$

$a\notin K$ なら $\varphi(a)=0$ です。

従って局所有限階評価を $m=0$ で満たし、$\delta_a$ は distribution です。
<!-- definition-example-end -->

### delta は普通の局所可積分関数では表せない

$a\in\Omega$ とし、十分小さい $\varepsilon>0$ で $\overline{B(a,\varepsilon)}\subset\Omega$ とします。第1節の bump 関数 $\eta$ を使って

$$
\eta_\varepsilon(x)
=
\eta\left(\frac{x-a}{\varepsilon}\right)
$$

と置くと、

$$
0\le\eta_\varepsilon\le1,\qquad
\eta_\varepsilon(a)=1,\qquad
\operatorname{supp}\eta_\varepsilon\subset\overline{B(a,\varepsilon)}.
$$

もしある $f\in L^1_{\mathrm{loc}}(\Omega)$ が

$$
T_f=\delta_a
$$

を満たすなら、

$$
1
=
\langle\delta_a,\eta_\varepsilon\rangle
=
\int_\Omega f(x)\eta_\varepsilon(x)\,dx.
$$

しかし

$$
\left|
\int_\Omega f\eta_\varepsilon
\right|
\le
\int_{B(a,\varepsilon)}|f(x)|\,dx.
$$

$f$ は $a$ の近くで可積分なので、[Lebesgue 積分の絶対連続性](../MT4/index.md#thm-mt4-integral-absolute-continuity)から右辺は $\varepsilon\downarrow0$ で 0 へ行きます。左辺は常に 1 なので矛盾です。

したがって Dirac delta は正則 distribution ではありません。

ここで初めて

$$
\text{局所可積分関数}
\subsetneq
\mathcal D'(\Omega)
$$

という真の拡張が見えました。

---

## 7. distribution の収束は「全ての probe への応答」で測る

<a id="def-gpde1-distribution-convergence"></a>
<!-- formal-statement-start -->
> **定義（distribution の収束）**  
> $T_n,T\in\mathcal D'(\Omega)$ とする。$T_n$ が $T$ に distribution の意味で収束するとは、任意の $\varphi\in\mathcal D(\Omega)$ に対して

$$
\langle T_n,\varphi\rangle
\to
\langle T,\varphi\rangle
$$

> が成り立つことをいう。
<!-- formal-statement-end -->

<!-- definition-example-start: def-gpde1-distribution-convergence -->
**移動する delta**

$a_n\to a$ in $\Omega$ とします。任意のテスト関数 $\varphi$ は連続なので

$$
\langle\delta_{a_n},\varphi\rangle
=
\varphi(a_n)
\to
\varphi(a)
=
\langle\delta_a,\varphi\rangle.
$$

従って

$$
\delta_{a_n}\to\delta_a
$$

in $\mathcal D'(\Omega)$ です。
<!-- definition-example-end -->

点ごとの値を持たない delta に対しても、収束を直接定義できることが重要です。

---

## 8. Gaussian は distribution の意味で delta へ集中する

$\Omega=\mathbb R^d$ とし、

$$
\rho_\varepsilon(x)
=
\frac1{(2\pi\varepsilon^2)^{d/2}}
\exp\left(-\frac{|x|^2}{2\varepsilon^2}\right)
$$

と置きます。各 $\rho_\varepsilon$ は $L^1$ 関数なので正則 distribution $T_{\rho_\varepsilon}$ を定めます。

任意の $\varphi\in\mathcal D(\mathbb R^d)$ に対し、変数変換 $x=\varepsilon y$ から

$$
\langle T_{\rho_\varepsilon},\varphi\rangle
=
\int_{\mathbb R^d}
\frac1{(2\pi)^{d/2}}
e^{-|y|^2/2}
\varphi(\varepsilon y)\,dy.
$$

各固定 $y$ について

$$
\varphi(\varepsilon y)\to\varphi(0).
$$

また $\varphi$ は有界なので

$$
\left|
\frac1{(2\pi)^{d/2}}
e^{-|y|^2/2}
\varphi(\varepsilon y)
\right|
\le
\|\varphi\|_\infty
\frac1{(2\pi)^{d/2}}
e^{-|y|^2/2},
$$

右辺は可積分です。[Lebesgue の優収束定理](../F0_00D2B_単調収束_Fatou_優収束/index.md#thm-f0-00d2b-01)から

$$
\langle T_{\rho_\varepsilon},\varphi\rangle
\to
\varphi(0)
=
\langle\delta_0,\varphi\rangle.
$$

従って

$$
\boxed{
T_{\rho_\varepsilon}
\to
\delta_0
\quad\text{in }\mathcal D'(\mathbb R^d)
}
$$

です。

これは「Gaussian の高さが無限大になる」という点ごとの話ではありません。全てのテスト関数に対する積分が点評価へ収束する、という statement です。

GPDE2 では compact support を持つ mollifier に切り替え、粗い関数を平滑化する道具として系統化します。

---

## 9. PDE を各点の等式ではなくテスト関数恒等式として読む

Poisson 方程式

$$
-\Delta u=f
$$

を考えます。

$u$ が $C^2$ なら各点で $\Delta u$ を計算できます。しかし $u\in L^1_{\mathrm{loc}}$ しか分からない場合、$u_{x_ix_i}$ は古典的には意味を持たないかもしれません。

そこで微分を $u$ からテスト関数側へ移します。

<a id="def-gpde1-distributional-poisson"></a>
<!-- formal-statement-start -->
> **定義（Poisson 方程式の distributional solution）**  
> 開集合 $\Omega\subset\mathbb R^d$ 上で $u,f\in L^1_{\mathrm{loc}}(\Omega)$ とする。$u$ が

$$
-\Delta u=f
$$

> の **distributional solution** であるとは、任意の $\varphi\in\mathcal D(\Omega)$ に対して

$$
\int_\Omega
u(x)\{-\Delta\varphi(x)\}\,dx
=
\int_\Omega
f(x)\varphi(x)\,dx
$$

> が成り立つことをいう。
<!-- formal-statement-end -->

この定義では $u$ を二回微分していません。二階微分は全て滑らかな $\varphi$ が引き受けています。

<!-- definition-example-start: def-gpde1-distributional-poisson -->
**一次元で直接読む**

$\Omega=(0,1)$ で

$$
u(x)=x(1-x)
$$

とすると

$$
-u''(x)=2.
$$

任意の $\varphi\in\mathcal D((0,1))$ に対して二回部分積分すれば、

$$
\int_0^1u(x)\{-\varphi''(x)\}\,dx
=
\int_0^1 2\varphi(x)\,dx.
$$

$\varphi$ は $(0,1)$ の内部にコンパクトな台を持つので、端点近くでは $\varphi=\varphi'=0$ となり、境界項は消えます。
<!-- definition-example-end -->

---

## 10. 古典解は distributional solution に含まれる

新しい解概念を導入したら、従来の解を壊していないか確認する必要があります。

<a id="prop-gpde1-classical-implies-distributional"></a>
<!-- formal-statement-start -->
> **命題（古典 Poisson 解は distributional solution である）**  
> 開集合 $\Omega\subset\mathbb R^d$ 上で $u\in C^2(\Omega)$、$f\in C(\Omega)$ とし、

$$
-\Delta u=f
$$

> が各点で成り立つとする。このとき $u$ は同じ方程式の distributional solution である。
<!-- formal-statement-end -->

### 証明の見取り図

$\varphi$ の台は $\Omega$ の内部にコンパクトに収まるので、その外側で積分を打ち切っても境界項は出ません。各座標について二回部分積分し、二階微分を $\varphi$ から $u$ へ戻せば、古典方程式が現れます。

<!-- proof-start -->
### 証明

$\varphi\in\mathcal D(\Omega)$ を任意に取ります。$\operatorname{supp}\varphi$ を内部に含む長方形 $Q$ で

$$
\overline Q\subset\Omega
$$

となるものを取れます。$\varphi$ は $Q$ の境界近くで 0 なので、各座標 $x_j$ について部分積分の境界項は消えます。

従って

$$
\int_Q
u(-\partial_{jj}\varphi)
=
\int_Q
(-\partial_{jj}u)\varphi.
$$

これを $j=1,\ldots,d$ で足すと、

$$
\int_Q
u(-\Delta\varphi)
=
\int_Q
(-\Delta u)\varphi.
$$

$\varphi$ は $Q$ の外で 0 なので積分範囲を $\Omega$ に戻せます。また古典方程式 $-\Delta u=f$ から

$$
\int_\Omega
u(-\Delta\varphi)
=
\int_\Omega
f\varphi.
$$

これは [distributional solution の定義](#def-gpde1-distributional-poisson)そのものです。
<!-- proof-end -->

新しい解概念は古典解を捨てるのではなく、

$$
\boxed{
\text{classical solution}
\Longrightarrow
\text{distributional solution}
}
$$

と解のクラスを広げます。

逆向きは一般には成り立ちません。distributional solution は古典微分を持たないことがあります。どの追加仮定で滑らかさが回復するかは GPDE9 の elliptic regularity で扱います。

---

## 11. PDE6 の基本解を distribution の等式として読み直す

PDE6 では基本解を「特異点の外で調和的で、特異点を囲む flux が 1」という古典的な形で扱いました。

distribution を使うと、その意味を一つの式にまとめられます。

たとえば一次元で

$$
\Phi(x)
=
-\frac{|x|}{2}
$$

とします。$x\ne0$ では $\Phi''(x)=0$ ですが、原点で折れ曲がっています。

任意の $\varphi\in\mathcal D(\mathbb R)$ に対して

$$
\int_{\mathbb R}
\Phi(x)\{-\varphi''(x)\}\,dx
=
\frac12
\int_{\mathbb R}
|x|\varphi''(x)\,dx.
$$

積分を $(-\infty,0)$ と $(0,\infty)$ に分けます。

正の側では

$$
\int_0^\infty x\varphi''(x)\,dx
=
\varphi(0).
$$

負の側では

$$
\int_{-\infty}^0 (-x)\varphi''(x)\,dx
=
\varphi(0).
$$

従って

$$
\int_{\mathbb R}
\Phi(-\varphi'')
=
\varphi(0)
=
\langle\delta_0,\varphi\rangle.
$$

つまり

$$
\boxed{
-\Phi''=\delta_0
}
$$

を distribution の意味で満たします。

PDE6 の「一点 source」は、distribution では literal な等式として書けるようになりました。二次元・高次元の基本解も同じ思想で

$$
-\Delta\Phi=\delta_0
$$

と読めます。

---

## 12. PDE1 の Burgers shock では何が起きるか

PDE1 の Burgers 方程式を保存則の形で書くと

$$
u_t+\partial_x\left(\frac{u^2}{2}\right)=0
$$

です。

$u$ が jump を持つと $u_t$ や $u_x$ は古典的には存在しません。しかし $u$ が局所有界なら $u$ と $u^2$ は局所可積分なので、任意の時空テスト関数 $\varphi$ に対し

$$
\iint
\left[
u\,\varphi_t
+
\frac{u^2}{2}\varphi_x
\right]
\,dx\,dt
=
0
$$

という積分恒等式は意味を持ちます。

これが conservation law を distributional に読む入口です。

ただし、ここには重要な停止線があります。Burgers 方程式では distributional solution だけでは一意性が足りません。物理的な shock を選ぶ entropy condition は Encore III 本線には入れず、後続 PDE 拡張で扱います。

---

## 13. GPDE2 へ：微分を distribution 自身へ移す

本章では Poisson 方程式について

$$
\int u(-\Delta\varphi)
=
\int f\varphi
$$

と書き、微分をテスト関数側へ押しつけました。

GPDE2 ではこれを一般化し、

$$
\langle \partial_j T,\varphi\rangle
=
-\langle T,\partial_j\varphi\rangle
$$

によって distribution 自身の微分を定義します。

すると

- Heaviside の微分が Dirac delta になる。
- jump が delta 項を生む。
- 普通には微分できない関数にも微分を持たせられる。
- distribution 微分が再び $L^p$ 関数で表せるとき weak derivative が得られる。
- mollifier で粗い対象を平滑化し、極限へ戻せる。

という大学院 PDE の基本機構へ進めます。

---

# 演習

## GPDE1-A01 テスト関数か判定する

- Level: A
- 目安時間: 10分

$\mathbb R$ 上の次の関数について、$\mathcal D(\mathbb R)$ の元か判定し、理由を述べよ。

1. $e^{-x^2}$
2. $\max(1-|x|,0)$
3. 第1節の bump 関数 $\eta(x)=e\,h(1-x^2)$
4. $\eta(x-3)$

<!-- solution-start -->
### 詳細解答

テスト関数には

1. $C^\infty$ であること
2. 台がコンパクトであること

の両方が必要です。

1. $e^{-x^2}$ は $C^\infty$ ですが、全ての $x\in\mathbb R$ で正なので

$$
\operatorname{supp}(e^{-x^2})=\mathbb R.
$$

台がコンパクトでないため $\mathcal D(\mathbb R)$ の元ではありません。

2. $\max(1-|x|,0)$ の台は $[-1,1]$ でコンパクトです。しかし $x=0$ で左右微分がそれぞれ $1$ と $-1$ になり、一階微分可能ですらありません。従ってテスト関数ではありません。

3. 第1節で確認した通り $\eta$ は $C^\infty$ で、

$$
\operatorname{supp}\eta\subset[-1,1].
$$

従って $\eta\in\mathcal D(\mathbb R)$ です。

4. 平行移動は滑らかさを保ち、

$$
\operatorname{supp}\eta(x-3)
\subset[2,4].
$$

従って $\eta(x-3)\in\mathcal D(\mathbb R)$ です。
<!-- solution-end -->

## GPDE1-A02 局所可積分な特異関数が distribution を定める

- Level: A
- 目安時間: 12分

$\Omega=(-1,1)$ とし、

$$
f(x)=|x|^{-1/2}
$$

とする。

1. $0<r<1$ に対して $\int_{-r}^{r}|f(x)|\,dx$ を求めよ。
2. $\operatorname{supp}\varphi\subset[-r,r]$ を満たす $\varphi\in\mathcal D(\Omega)$ に対し、

$$
|\langle T_f,\varphi\rangle|
\le
4\sqrt r\,p_{[-r,r],0}(\varphi)
$$

を示せ。
3. これが $T_f$ の distribution 連続性をどう保証するか説明せよ。

<!-- solution-start -->
### 詳細解答

1. 偶関数なので

$$
\int_{-r}^{r}|x|^{-1/2}\,dx
=
2\int_0^r x^{-1/2}\,dx.
$$

直接積分すると

$$
2\int_0^r x^{-1/2}\,dx
=
2\cdot2\sqrt r
=
4\sqrt r.
$$

有限なので、$x=0$ で値が発散していても局所可積分です。

2. 台が $[-r,r]$ に入るため

$$
\langle T_f,\varphi\rangle
=
\int_{-r}^{r}|x|^{-1/2}\varphi(x)\,dx.
$$

従って

$$
|\langle T_f,\varphi\rangle|
\le
\int_{-r}^{r}|x|^{-1/2}|\varphi(x)|\,dx.
$$

さらに

$$
|\varphi(x)|
\le
p_{[-r,r],0}(\varphi)
$$

なので

$$
|\langle T_f,\varphi\rangle|
\le
p_{[-r,r],0}(\varphi)
\int_{-r}^{r}|x|^{-1/2}\,dx
=
4\sqrt r\,p_{[-r,r],0}(\varphi).
$$

3. これは [局所有限階評価](#prop-gpde1-local-finite-order)を $m=0$ で満たす評価です。従って $T_f$ はテスト関数収束に対して連続であり、distribution です。
<!-- solution-end -->

## GPDE1-A03 移動する Dirac delta

- Level: A
- 目安時間: 10分

$a_n\to a$ in $\Omega$ とする。$\delta_{a_n}\to\delta_a$ in $\mathcal D'(\Omega)$ を定義から証明せよ。

<!-- solution-start -->
### 詳細解答

distribution の収束を示すには、任意の固定した $\varphi\in\mathcal D(\Omega)$ に対して作用の収束を示せばよいです。

Dirac delta の定義から

$$
\langle\delta_{a_n},\varphi\rangle
=
\varphi(a_n).
$$

$\varphi$ は $C^\infty$ なので特に連続です。$a_n\to a$ より

$$
\varphi(a_n)\to\varphi(a).
$$

再び Dirac delta の定義を使うと

$$
\varphi(a)
=
\langle\delta_a,\varphi\rangle.
$$

従って任意の $\varphi$ に対して

$$
\langle\delta_{a_n},\varphi\rangle
\to
\langle\delta_a,\varphi\rangle,
$$

よって

$$
\boxed{\delta_{a_n}\to\delta_a}
$$

in $\mathcal D'(\Omega)$ です。
<!-- solution-end -->

## GPDE1-A04 古典 Poisson 解をテスト関数恒等式へ移す

- Level: A
- 目安時間: 12分

$\Omega=(0,1)$ で

$$
u(x)=x(1-x),
\qquad
f(x)=2
$$

とする。任意の $\varphi\in\mathcal D((0,1))$ に対し

$$
\int_0^1u(x)\{-\varphi''(x)\}\,dx
=
\int_0^1f(x)\varphi(x)\,dx
$$

を二回の部分積分で直接示せ。

<!-- solution-start -->
### 詳細解答

まず

$$
u'(x)=1-2x,
\qquad
u''(x)=-2.
$$

従って古典的には $-u''=2=f$ です。

左辺を計算します。

$$
\int_0^1u(-\varphi'')\,dx
=
-\int_0^1u\varphi''\,dx.
$$

一回目の部分積分で

$$
-\int_0^1u\varphi''\,dx
=
-\left[u\varphi'\right]_0^1
+
\int_0^1u'\varphi'\,dx.
$$

$\varphi$ は $(0,1)$ の内部にコンパクトな台を持つため、0 と 1 の近くで $\varphi'=0$ です。よって境界項は 0 です。

さらに

$$
\int_0^1u'\varphi'\,dx
=
\left[u'\varphi\right]_0^1
-
\int_0^1u''\varphi\,dx.
$$

今度は $\varphi=0$ が端点近くで成り立つので境界項は 0 です。従って

$$
\int_0^1u(-\varphi'')\,dx
=
-\int_0^1u''\varphi\,dx
=
\int_0^1 2\varphi\,dx.
$$

右辺は

$$
\int_0^1f\varphi\,dx
=
\int_0^1 2\varphi\,dx
$$

なので一致します。
<!-- solution-end -->

## GPDE1-B01 点ごとの消滅ではテスト関数収束にならない

- Level: B
- 目安時間: 15分

非零の $\eta\in\mathcal D(\mathbb R)$ を取り、

$$
\varphi_n(x)=\eta(x-n)
$$

とする。

1. 任意の固定した $x$ と整数 $k\ge0$ に対して $\varphi_n^{(k)}(x)\to0$ を示せ。
2. $\varphi_n\not\to0$ in $\mathcal D(\mathbb R)$ であることを示せ。
3. 正則 distribution $T_1$ に対して $\langle T_1,\varphi_n\rangle$ を計算し、固定コンパクト台条件の必要性を説明せよ。

<!-- solution-start -->
### 詳細解答

1. $\eta$ の台をある有界区間 $[-R,R]$ に含めます。すると

$$
\operatorname{supp}\varphi_n
\subset[n-R,n+R].
$$

固定した $x$ に対し、$n>x+R$ なら $x\notin[n-R,n+R]$ です。このとき $\varphi_n$ は $x$ の近くで恒等的に 0 なので、全ての $k$ について

$$
\varphi_n^{(k)}(x)=0.
$$

従って点ごとには全階微分が 0 へ収束します。

2. もし $\varphi_n\to0$ in $\mathcal D(\mathbb R)$ なら、全ての $\operatorname{supp}\varphi_n$ を含む一つのコンパクト集合 $K$ が必要です。しかし台 $[n-R,n+R]$ は右へ無限に移動するため、そのような $K$ は存在しません。

3. $T_1$ は

$$
\langle T_1,\psi\rangle
=
\int_{\mathbb R}\psi(x)\,dx
$$

です。変数変換 $y=x-n$ により

$$
\langle T_1,\varphi_n\rangle
=
\int_{\mathbb R}\eta(x-n)\,dx
=
\int_{\mathbb R}\eta(y)\,dy.
$$

$\eta$ を非負かつ非零に取れば、この値は正の定数であり 0 へ行きません。

したがって、点ごとの全階微分収束だけを「テスト関数収束」としてしまうと、正則 distribution $T_1$ すら連続でなくなります。共通コンパクト台条件は装飾ではなく、distribution の作用を安定にするために必要です。
<!-- solution-end -->

## GPDE1-B02 Gaussian から Dirac delta への収束

- Level: B
- 目安時間: 20分

$\mathbb R^d$ 上で

$$
\rho_\varepsilon(x)
=
\frac1{(2\pi\varepsilon^2)^{d/2}}
e^{-|x|^2/(2\varepsilon^2)}
$$

とする。任意の $\varphi\in\mathcal D(\mathbb R^d)$ に対し

$$
\int_{\mathbb R^d}\rho_\varepsilon(x)\varphi(x)\,dx
\to
\varphi(0)
$$

を優収束定理で証明せよ。

<!-- solution-start -->
### 詳細解答

変数変換

$$
x=\varepsilon y,
\qquad
dx=\varepsilon^d\,dy
$$

を使います。

すると

$$
\rho_\varepsilon(\varepsilon y)
=
\frac1{(2\pi\varepsilon^2)^{d/2}}
e^{-|y|^2/2}.
$$

従って

$$
\int\rho_\varepsilon(x)\varphi(x)\,dx
=
\int_{\mathbb R^d}
\frac1{(2\pi)^{d/2}}
e^{-|y|^2/2}
\varphi(\varepsilon y)\,dy.
$$

各固定 $y$ について $\varepsilon y\to0$ なので、$\varphi$ の連続性から

$$
\varphi(\varepsilon y)\to\varphi(0).
$$

また $\varphi$ はコンパクト台を持つ連続関数なので有界です。したがって

$$
\left|
\frac1{(2\pi)^{d/2}}
e^{-|y|^2/2}
\varphi(\varepsilon y)
\right|
\le
\|\varphi\|_\infty
\frac1{(2\pi)^{d/2}}
e^{-|y|^2/2}.
$$

右辺は $\mathbb R^d$ 上で可積分です。[Lebesgue の優収束定理](../F0_00D2B_単調収束_Fatou_優収束/index.md#thm-f0-00d2b-01)より

$$
\int\rho_\varepsilon(x)\varphi(x)\,dx
\to
\varphi(0)
\int_{\mathbb R^d}
\frac1{(2\pi)^{d/2}}
e^{-|y|^2/2}\,dy.
$$

標準 Gaussian の全質量は 1 なので

$$
\int\rho_\varepsilon\varphi
\to
\varphi(0).
$$

Dirac delta の定義から右辺は $\langle\delta_0,\varphi\rangle$ です。従って

$$
\boxed{
T_{\rho_\varepsilon}\to\delta_0
}
$$

in $\mathcal D'(\mathbb R^d)$ です。
<!-- solution-end -->

## GPDE1-B03 Dirac delta が正則 distribution でないことを証明する

- Level: B
- 目安時間: 20分

$a\in\Omega$ とする。ある $f\in L^1_{\mathrm{loc}}(\Omega)$ が $T_f=\delta_a$ を満たすと仮定し、第1節の bump 関数を縮小して矛盾を導け。

<!-- solution-start -->
### 詳細解答

$a$ は開集合 $\Omega$ の点なので、ある $r>0$ が存在して

$$
\overline{B(a,r)}\subset\Omega
$$

となります。

第1節の bump 関数 $\eta$ は

$$
0\le\eta\le1,
\qquad
\eta(0)=1,
\qquad
\operatorname{supp}\eta\subset\overline{B(0,1)}
$$

を満たします。

$0<\varepsilon<r$ に対し

$$
\eta_\varepsilon(x)
=
\eta\left(\frac{x-a}{\varepsilon}\right)
$$

と置きます。すると $\eta_\varepsilon\in\mathcal D(\Omega)$ で、

$$
\eta_\varepsilon(a)=1,
\qquad
\operatorname{supp}\eta_\varepsilon
\subset
\overline{B(a,\varepsilon)}.
$$

仮定 $T_f=\delta_a$ から

$$
1
=
\langle\delta_a,\eta_\varepsilon\rangle
=
\langle T_f,\eta_\varepsilon\rangle
=
\int_\Omega f(x)\eta_\varepsilon(x)\,dx.
$$

一方 $0\le\eta_\varepsilon\le1$ なので

$$
1
\le
\int_{B(a,\varepsilon)}|f(x)|\,dx.
$$

$f\in L^1_{\mathrm{loc}}(\Omega)$ なので $f$ は $B(a,r)$ 上で可積分です。[Lebesgue 積分の絶対連続性](../MT4/index.md#thm-mt4-integral-absolute-continuity)により、測度が 0 へ行く集合 $B(a,\varepsilon)$ について

$$
\int_{B(a,\varepsilon)}|f(x)|\,dx
\to0.
$$

従って十分小さい $\varepsilon$ では右辺は 1 未満になり、$1\le$ 右辺に矛盾します。

よって

$$
\boxed{
\delta_a
\text{ は正則 distribution ではない}
}
$$

ことが分かります。
<!-- solution-end -->

## GPDE1-C01 一次元基本解を distribution として検証する

- Level: C
- 目安時間: 30分

$\mathbb R$ 上で

$$
\Phi(x)
=
-\frac{|x|}{2}
$$

とする。

1. $x\ne0$ では $-\Phi''(x)=0$ であることを確認せよ。
2. 任意の $\varphi\in\mathcal D(\mathbb R)$ に対し

$$
\int_{\mathbb R}
\Phi(x)\{-\varphi''(x)\}\,dx
=
\varphi(0)
$$

を、正負の半直線に分けた部分積分から示せ。
3. これが

$$
-\Phi''=\delta_0
$$

を distribution の意味で表す理由を説明せよ。
4. 「原点以外では右辺 0」だけでは delta source を見落とす理由を説明せよ。

<!-- solution-start -->
### 詳細解答

1. $x>0$ では

$$
\Phi(x)=-\frac x2,
$$

$x<0$ では

$$
\Phi(x)=\frac x2.
$$

どちらも一次関数なので $x\ne0$ では

$$
\Phi''(x)=0.
$$

従って古典的には原点以外で $-\Phi''=0$ です。

2. 左辺は

$$
\int_{\mathbb R}
\Phi(-\varphi'')
=
\frac12
\int_{\mathbb R}
|x|\varphi''(x)\,dx.
$$

正負に分けます。

正の半直線では

$$
\int_0^\infty x\varphi''(x)\,dx
=
\left[x\varphi'(x)\right]_0^\infty
-
\int_0^\infty\varphi'(x)\,dx.
$$

$\varphi$ はコンパクト台を持つので十分大きい $x$ では $\varphi=\varphi'=0$ です。また $x=0$ では $x\varphi'(x)=0$ です。従って第一項は 0 です。

さらに

$$
-\int_0^\infty\varphi'(x)\,dx
=
-\left[\varphi(x)\right]_0^\infty
=
\varphi(0).
$$

したがって

$$
\int_0^\infty x\varphi''(x)\,dx
=
\varphi(0).
$$

負の半直線では

$$
\int_{-\infty}^0(-x)\varphi''(x)\,dx
=
\left[(-x)\varphi'(x)\right]_{-\infty}^0
+
\int_{-\infty}^0\varphi'(x)\,dx.
$$

第一項は同様に 0 です。第二項は

$$
\int_{-\infty}^0\varphi'(x)\,dx
=
\varphi(0).
$$

従って

$$
\int_{\mathbb R}|x|\varphi''(x)\,dx
=
2\varphi(0).
$$

よって

$$
\int_{\mathbb R}
\Phi(-\varphi'')
=
\frac12\cdot2\varphi(0)
=
\varphi(0).
$$

3. Dirac delta の定義は

$$
\langle\delta_0,\varphi\rangle
=
\varphi(0).
$$

一方、Poisson 型の distributional identity では $-\Phi''$ の作用を

$$
\varphi
\mapsto
\int\Phi(-\varphi'')
$$

で読みます。2. でこれが全てのテスト関数に対して $\varphi(0)$ と一致したので、

$$
\boxed{
-\Phi''=\delta_0
}
$$

in $\mathcal D'(\mathbb R)$ です。

4. 原点以外だけを見ると $\Phi$ は左右で一次関数なので二階微分は 0 です。しかし原点では一階微分が

$$
\Phi'(0-)=\frac12,
\qquad
\Phi'(0+)=-\frac12
$$

と jump します。

古典微分はこの一点で壊れるため、「$x\ne0$ で $-\Phi''=0$」という情報だけでは source を記録できません。テスト関数を通じて原点をまたぐ部分積分を行うと、その jump が $\varphi(0)$ という集中項として残ります。

これが PDE6 の fundamental solution を distribution の等式へ昇格させる仕組みです。GPDE2 ではこの現象を distributional derivative の一般公式として整理します。
<!-- solution-end -->

---

## 章末チェック

- $\mathcal D(\Omega)=C_c^\infty(\Omega)$ の二条件を説明できる。
- テスト関数列の収束で「共通コンパクト台」と「各 $p_{K,m}$ が 0 へ収束すること」が必要な理由を説明できる。
- distribution をテスト関数空間上の連続線形汎関数として定義できる。
- 局所有限階評価とテスト関数列に対する連続性の同値性を証明できる。
- $f\in L^1_{\mathrm{loc}}$ から $T_f$ を作り、その連続性を $m=0$ の評価で検証できる。
- Dirac delta の作用を計算し、正則 distribution ではないことを shrinking bump で証明できる。
- $T_n\to T$ in $\mathcal D'$ を全テスト関数への作用の収束として扱える。
- Gaussian から Dirac delta への distribution 収束を優収束定理で証明できる。
- Poisson 方程式の distributional solution をテスト関数恒等式で定義できる。
- 古典 Poisson 解が distributional solution になることを二回の部分積分で証明できる。
- 一次元基本解 $-|x|/2$ が $-\Phi''=\delta_0$ を distribution の意味で満たすことを直接検証できる。
- Burgers shock では distributional solution だけでは一意性が足りず、entropy solution は後続系列へ送ることを説明できる。

次は **GPDE2「distribution 微分・mollifier・弱微分」** です。
