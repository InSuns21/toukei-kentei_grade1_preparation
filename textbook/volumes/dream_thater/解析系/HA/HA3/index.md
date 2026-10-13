# HA3 Hilbert変換と主値

[FOU4のPlancherel理論](../../FOU/FOU4/index.md#thm-fou4-l2-extension)によって、二乗可積分関数は周波数成分へ分解できました。[HA2の補間](../HA2/index.md#thm-ha2-marc-infinity)は作用素の端点情報を中間の指数へ伝えます。しかし、核が原点で $1/t$ のように発散する場合、そもそも積分をどう定義すべきでしょうか。

対称な二点 $t$ と $-t$ の寄与は打ち消し合います。絶対値を付けてしまうと消えるはずの情報まで失います。この消去を捉えるのが **Cauchy主値** です。本章では最も基本的な特異積分であるHilbert変換を、実空間の切断積分と周波数空間の乗数という二つの視点から構成します。

本章を通じてFourier変換は [FOU3の規約](../../FOU/FOU3/index.md#def-fou3-fourier-transform)

$$
\widehat f(\xi)=\int_{\mathbb R}f(x)e^{-ix\xi}\,dx,
\qquad
f(x)=\frac1{2\pi}\int_{\mathbb R}\widehat f(\xi)e^{ix\xi}\,d\xi
$$

（反転式は適切な関数に適用）を用います。特に [Plancherel等式](../../FOU/FOU4/index.md#thm-fou4-l2-extension)は $\|\widehat f\|_2^2=2\pi\|f\|_2^2$ です。

## 1. 絶対収束しない積分から意味を取り出す

$1/t$ を原点の近くで積分すると、正側と負側の絶対積分はそれぞれ発散します。そこで原点から等距離の部分を一緒に除いてから極限を取ります。例えば $f$ が原点の近くで定数なら、二つの寄与は正確に相殺されます。

<a id="def-ha3-principal-value"></a>
<!-- formal-statement-start -->
> **定義（Cauchy主値と切断Hilbert変換）**  
> $f$ を $\mathbb R$ 上の可測関数とする。$\varepsilon>0$ と $R>\varepsilon$ に対し、積分が存在するとき

$$
H_{\varepsilon,R}f(x)
=\frac1\pi\int_{\varepsilon<|t|<R}\frac{f(x-t)}{t}\,dt
=\frac1\pi\int_{\varepsilon<|x-u|<R}\frac{f(u)}{x-u}\,du
$$

> と置く。$R\to\infty$ の通常の極限で $H_\varepsilon f(x)$ が存在し、さらに $\varepsilon\downarrow0$ の極限が存在するとき、その値を主値積分

$$
\operatorname{p.v.}\frac1\pi\int_{\mathbb R}\frac{f(u)}{x-u}\,du
=\lim_{\varepsilon\downarrow0}H_\varepsilon f(x)
$$

> といい、点 $x$ におけるHilbert変換と呼ぶ。二つの極限が存在することを定義に含める。
<!-- formal-statement-end -->

<!-- definition-example-start: def-ha3-principal-value -->
**定義の確認**　$f=\boldsymbol{1}_{(-1,1)}$ と $x=0$ を選ぶと、$0<\varepsilon<1<R$ で

$$
H_{\varepsilon,R}f(0)
=\frac1\pi\left(\int_{-1}^{-\varepsilon}\frac{dt}{t}
+\int_\varepsilon^1\frac{dt}{t}\right)=0.
$$

ただし $\int_{-1}^1|f(-t)/t|dt=\infty$ です。主値が0であることと絶対積分が存在することは別です。
<!-- definition-example-end -->

<a id="prop-ha3-smooth-pv"></a>
<!-- formal-statement-start -->
> **命題（滑らかな関数の主値の存在）**  
> $f\in C_c^1(\mathbb R)$（連続微分可能でコンパクト台を持つ関数）なら、すべての $x\in\mathbb R$ で $H_\varepsilon f(x)$ が存在し、$\varepsilon\downarrow0$ で有限の主値に収束する。
<!-- formal-statement-end -->

### 証明の見取り図

近くで定数 $f(x)$ を足し引きすると、核 $1/t$ の奇性によって定数部分の積分が消えます。残りの分子は平均値の定理により $O(|t|)$ です。遠方では $f$ の可積分性を使います。

<!-- proof-start -->
### 証明

$x$ を固定します。$|t|<1$ について

$$
\int_{\varepsilon<|t|<1}\frac{f(x)}t\,dt
=f(x)\left(\int_{-1}^{-\varepsilon}\frac{dt}t
+\int_\varepsilon^1\frac{dt}t\right)=0.
$$

よって $0<\varepsilon<1$ に対して

$$
H_\varepsilon f(x)=\frac1\pi
\left\{\int_{\varepsilon<|t|<1}\frac{f(x-t)-f(x)}t\,dt
+\int_{|t|\ge1}\frac{f(x-t)}t\,dt\right\}.
$$

[平均値の定理](../../../基礎科目/RA/RA3/index.md#thm-ra3-mvt)の適用対象を $s\mapsto f(x-s)$、区間の端点を $0,t$ とすると、

$$
|f(x-t)-f(x)|\le \|f'\|_\infty |t|.
$$

したがって第一積分の被積分関数の絶対値は $\|f'\|_\infty$ 以下で、$\varepsilon\downarrow0$ の極限が存在します。第二積分は

$$
\int_{|t|\ge1}\left|\frac{f(x-t)}t\right|dt
\le\int_{\mathbb R}|f(x-t)|dt=\|f\|_1<\infty
$$

と絶対収束します。両部分を加えた有限値が求める主値です。
<!-- proof-end -->

ここでは $C_c^1$ を使いましたが、原点近くの差を $O(|t|)$ と評価でき、遠方の積分も収束する関数なら同じ仕組みです。逆に不連続点では差を $O(|t|)$ とできず、主値が壊れることがあります。

## 2. Fourier乗数の符号は正弦積分から決まる

核 $1/t$ は奇関数です。そのため切断核のFourier変換では余弦部分が消え、正弦だけが残ります。極限値を「既知の公式」として置かず、まず必要な振動積分を証明します。

<a id="lem-ha3-dirichlet"></a>
<!-- formal-statement-start -->
> **補題（Dirichlet積分）**  
> 実数 $a$ について広義積分（原点では通常の連続延長）

$$
\int_0^\infty\frac{\sin(at)}t\,dt
=\frac\pi2\operatorname{sgn}(a),
\qquad \operatorname{sgn}(0)=0
$$

> が成立する。また

$$
\sup_{0\le A<B<\infty}
\left|\int_A^B\frac{\sin u}{u}\,du\right|<\infty.
$$
<!-- formal-statement-end -->

### 証明の見取り図

無限遠では部分積分が尾部を $1/A$ で抑えます。積分値は、指数減衰 $e^{-st}$ を掛けた積分を $a$ で微分して求め、最後に減衰を外します。

<!-- proof-start -->
### 証明

まず $1\le A<B$ について部分積分すると

$$
\int_A^B\frac{\sin u}{u}\,du
=\left[-\frac{\cos u}{u}\right]_A^B
-\int_A^B\frac{\cos u}{u^2}\,du,
$$

したがって絶対値は $2/A+\int_A^\infty u^{-2}du\le3/A$ です。$0\le A<B\le1$ では $|\sin u/u|\le1$ なので絶対値は1以下です。区間が1をまたぐ場合は二つに分け、全区間で一定の上界（例えば4）を得ます。これで収束と一様な部分積分評価が成立します。

$s>0$ と $a\in\mathbb R$ に対して

$$
I_s(a)=\int_0^\infty e^{-st}\frac{\sin(at)}t\,dt
$$

と置きます。$\sin(at)/t$ は原点近くで有界で、無限遠では指数減衰するので絶対収束します。$a$ の有界区間で微分すると $e^{-st}\cos(at)$ が可積分な優関数 $e^{-st}$ を持ちます。よって微分積分交換ができ、

$$
I_s'(a)=\int_0^\infty e^{-st}\cos(at)\,dt
=\operatorname{Re}\frac1{s-ia}
=\frac{s}{s^2+a^2}.
$$

$I_s(0)=0$ を用いて $0$ から $a$ まで積分し、

$$
I_s(a)=\int_0^a\frac{s}{s^2+v^2}\,dv
=\arctan(a/s)
$$

を得ます。$a>0$ の場合、尾部 $[A,B]$ の $\sin(at)/t$ の積分は変数 $u=at$ と上の部分積分評価から $3/(aA)$ 以下（$aA\ge1$）です。指数減衰付きの尾部も部分積分すると同じ次数で一様に抑えられます。有限区間 $[0,A]$ では [優収束定理](../../F0/F0-00D2B/index.md#thm-f0-00d2b-01)で $e^{-st}\to1$ とできるので、

$$
\lim_{s\downarrow0}I_s(a)
=\int_0^\infty\frac{\sin(at)}t\,dt
=\lim_{s\downarrow0}\arctan(a/s)=\frac\pi2.
$$

$a<0$ は奇性から負号が付き、$a=0$ は両辺0です。
<!-- proof-end -->

上の積分は絶対収束しません。無限遠の振動による相殺が必要である点が、次のFourier乗数の決定的な仕組みです。

## 3. $L^2$ 上にHilbert変換を構成する

$\varepsilon<|t|<R$ の切断核なら $L^1$ です。[FOU3の畳み込み定理](../../FOU/FOU3/index.md#thm-fou3-convolution)で乗数が書け、切断を除いても乗数が一様有界であることから $L^2$ 極限が残ります。

<a id="def-ha3-l2-hilbert"></a>
<!-- formal-statement-start -->
> **定義（$L^2$ Hilbert変換）**  
> $f\in L^2(\mathbb R)$ に対して、Fourier側で

$$
\widehat{Hf}(\xi)
=-i\,\operatorname{sgn}(\xi)\widehat f(\xi)
\quad\text{（ほとんど至る所）}
$$

> を満たす一意の $Hf\in L^2(\mathbb R)$ を $L^2$ Hilbert変換と定める。$L^2$ Fourier変換はFOU4の延長を用いる。
<!-- formal-statement-end -->

<!-- definition-example-start: def-ha3-l2-hilbert -->
**定義の確認**　$L^2$ の周波数関数 $g=\boldsymbol{1}_{(1,2)}$ を取り、[FOU4の反転と全射性](../../FOU/FOU4/index.md#thm-fou4-l2-inversion)により $\widehat f=g$ となる $f\in L^2$ を選びます。すると $\widehat{Hf}=-ig$ です。$|-i|=1$ なので入力と出力の $L^2$ ノルムは一致します。この定義は各点の主値を前提にしません。
<!-- definition-example-end -->

<a id="thm-ha3-multiplier"></a>
<!-- formal-statement-start -->
> **定理（Hilbert変換のFourier乗数と$L^2$構成）**  
> $f\in L^2(\mathbb R)$、$0<\varepsilon<R$ とする。$k_{\varepsilon,R}(t)=(\pi t)^{-1}\boldsymbol{1}_{\{\varepsilon<|t|<R\}}$ に対し、$H_{\varepsilon,R}f=k_{\varepsilon,R}*f$ は $L^2$ 上で定義される。各 $\varepsilon>0$ について $H_{\varepsilon,R}f$ は $R\to\infty$ で $L^2$ 収束し、その極限を $H_\varepsilon f$ と書く。このとき

$$
\lim_{\varepsilon\downarrow0}\|H_\varepsilon f-Hf\|_2=0,
\qquad
\widehat{Hf}=-i\,\operatorname{sgn}(\xi)\widehat f
$$

> が成立する。全切断作用素の $L^2\to L^2$ ノルムには $\varepsilon,R$ に依存しない上界がある。$f\in C_c^1(\mathbb R)$ の場合、前節の点wise主値と $Hf$ はほとんど至る所で一致する。
<!-- formal-statement-end -->

### 証明の見取り図

有限切断から始めれば畳み込み公式を安全に適用できます。奇性で余弦を消し、[Dirichlet積分](#lem-ha3-dirichlet)で残った正弦積分の極限と一様上界を得ます。あとは [Plancherel](../../FOU/FOU4/index.md#thm-fou4-l2-extension)と優収束を順に使います。

<!-- proof-start -->
### 証明

$k_{\varepsilon,R}$ はコンパクト台を持つ $L^1$ 関数です。[FOU4の$L^1$-$L^2$畳み込み公式](../../FOU/FOU4/index.md#thm-fou4-l1-l2-convolution)を $k_{\varepsilon,R}$ と $f$ に適用すると、

$$
\widehat{H_{\varepsilon,R}f}(\xi)
=m_{\varepsilon,R}(\xi)\widehat f(\xi),
\qquad
m_{\varepsilon,R}(\xi)=\frac1\pi
\int_{\varepsilon<|t|<R}\frac{e^{-i\xi t}}t\,dt.
$$

$1/t$ と $\cos(\xi t)$ の積は奇関数、$1/t$ と $\sin(\xi t)$ の積は偶関数なので

$$
m_{\varepsilon,R}(\xi)
=-\frac{2i}{\pi}\int_\varepsilon^R\frac{\sin(\xi t)}t\,dt.
$$

$\xi\ne0$ では $u=|\xi|t$ と置くと

$$
m_{\varepsilon,R}(\xi)
=-\frac{2i}{\pi}\operatorname{sgn}(\xi)
\int_{|\xi|\varepsilon}^{|\xi|R}\frac{\sin u}{u}\,du.
$$

[補題の部分積分評価](#lem-ha3-dirichlet)から全ての $\xi,\varepsilon,R$ で $|m_{\varepsilon,R}(\xi)|\le 8/\pi$ です。$\xi=0$ なら $m_{\varepsilon,R}(0)=0$ です。まず $\varepsilon>0$ を固定して $R\to\infty$ とすると、Dirichletの収束判定より各 $\xi$ で

$$
m_\varepsilon(\xi)
=-\frac{2i}{\pi}\int_\varepsilon^\infty
\frac{\sin(\xi t)}t\,dt
$$

に収束します。乗数の一様上界から

$$
\|H_{\varepsilon,R}f-\mathcal F_2^{-1}(m_\varepsilon\widehat f)\|_2^2
=\frac1{2\pi}\int_{\mathbb R}
|m_{\varepsilon,R}-m_\varepsilon|^2|\widehat f|^2\,d\xi
\longrightarrow0
$$

が[優収束定理](../../F0/F0-00D2B/index.md#thm-f0-00d2b-01)で成立します。従って $H_\varepsilon f$ は $L^2$ で存在します。さらに $\xi\ne0$ を固定し $\varepsilon\downarrow0$ とすると、[Dirichlet積分](#lem-ha3-dirichlet)より

$$
m_\varepsilon(\xi)\longrightarrow
-\frac{2i}{\pi}\frac\pi2\operatorname{sgn}(\xi)
=-i\operatorname{sgn}(\xi).
$$

再び同じ一様上界と $|\widehat f|^2\in L^1$ により

$$
\|H_\varepsilon f-Hf\|_2^2
=\frac1{2\pi}\int|m_\varepsilon+i\operatorname{sgn}(\xi)|^2
|\widehat f(\xi)|^2\,d\xi\longrightarrow0.
$$

有限切断の一様有界性も $|m_{\varepsilon,R}|\le8/\pi$ と Plancherel から従います。

最後に $f\in C_c^1$ なら [滑らかな関数の主値の存在](#prop-ha3-smooth-pv)により $H_\varepsilon f(x)$ は各点で通常の主値へ収束します。有限切断の $R\to\infty$ は各点で $\int_{|t|>R}|f(x-t)|/|t|dt\le\|f\|_1/R$ ですから、ここで定義した $H_\varepsilon f$ の $L^2$ 同値類はこの点wise積分の同値類です。さらに $H_\varepsilon f\to Hf$ の $L^2$ 収束列から、$\varepsilon_n\downarrow0$ を適切に選んだ部分列がほとんど至る所で収束します。点wise主値の極限の一意性から、両者はほとんど至る所で一致します。
<!-- proof-end -->

$L^2$ 極限は、任意の $L^2$ 関数で各点の主値が存在することをまだ証明していません。とりわけ主値の存在を単に「$L^2$ 収束だから」と言い換えるのは誤りです。

<a id="cor-ha3-isometry"></a>
<!-- formal-statement-start -->
> **系（等長性と$H$の二乗）**  
> すべての $f\in L^2(\mathbb R)$ について

$$
\|Hf\|_2=\|f\|_2,\qquad H^2f=-f.
$$

> 特に $H$ は $L^2$ 上の有界線形作用素で、逆作用素は $-H$ である。
<!-- formal-statement-end -->

### 証明の見取り図

乗数の絶対値は零集合 $\{\xi=0\}$ を除いて1です。二回作用させると $(-i)^2=-1$ と $\operatorname{sgn}^2=1$ が現れます。

<!-- proof-start -->
### 証明

[Hilbert変換の乗数表示](#thm-ha3-multiplier)と[Plancherel等式](../../FOU/FOU4/index.md#thm-fou4-l2-extension)から

$$
\|Hf\|_2^2
=\frac1{2\pi}\int|-i\operatorname{sgn}(\xi)|^2
|\widehat f(\xi)|^2d\xi=\|f\|_2^2.
$$

$\xi=0$ はLebesgue測度0なので積分に影響しません。また

$$
\widehat{H(Hf)}(\xi)
=(-i\operatorname{sgn}\xi)^2\widehat f(\xi)
=-\widehat f(\xi)
$$

がほとんど至る所で成立します。[Fourier変換の$L^2$一意性](../../FOU/FOU4/index.md#thm-fou4-l2-inversion)から $H^2f=-f$ です。従って $(-H)H=H(-H)=I$ です。
<!-- proof-end -->

実数値の関数をHilbert変換すると、位相が周波数の正負により $\mp\pi/2$ だけ変わります。増幅ではなく位相の操作であることが、等長性の理由です。

## 4. Poisson核を通して境界値を見る

Fourier乗数の不連続な符号を、$e^{-y|\xi|}$ で減衰させたらどうなるでしょうか。空間側には、積分が扱いやすい滑らかな核が現れます。上半平面の高さ $y>0$ におけるPoisson積分とその共役は、$y\downarrow0$ で元の関数とHilbert変換へ近づきます。

<a id="def-ha3-poisson"></a>
<!-- formal-statement-start -->
> **定義（Poisson核と共役Poisson核）**  
> $y>0$、$t\in\mathbb R$ に対して

$$
P_y(t)=\frac1\pi\frac{y}{t^2+y^2},
\qquad
Q_y(t)=\frac1\pi\frac{t}{t^2+y^2}
$$

> をそれぞれPoisson核と共役Poisson核という。$P_y\in L^1\cap L^2$、$Q_y\in L^2$ である。$f\in L^2(\mathbb R)$ なら $P_y*f$ と $Q_y*f$ は $L^2$ 畳み込みとして解釈する（後者は $Q_y\in L^2$ の通常の点wise畳み込みだけに依存しない）。
<!-- formal-statement-end -->

<!-- definition-example-start: def-ha3-poisson -->
**定義の確認**　$t=yv$ と置換すると

$$
\int_{\mathbb R}P_y(t)\,dt
=\frac1\pi\int_{\mathbb R}\frac{dv}{1+v^2}=1.
$$

また $Q_y$ は奇関数で $Q_y(t)\sim1/(\pi t)$（$|t|\to\infty$）ですから $L^1$ ではありません。一方 $|Q_y(t)|^2\le C_y(1+t^2)^{-1}$ なので $L^2$ です。$Q_y$ を「質量1の近似恒等族」と呼ぶことはできません。
<!-- definition-example-end -->

<a id="prop-ha3-poisson-fourier"></a>
<!-- formal-statement-start -->
> **命題（Poisson核と共役Poisson核の変換対）**  
> $y>0$ とし、上記のFourier規約を採用する。このとき

$$
\widehat{P_y}(\xi)=e^{-y|\xi|},
\qquad
\mathcal F_2 Q_y(\xi)
=-i\operatorname{sgn}(\xi)e^{-y|\xi|}
$$

> が成立する。第一式は$L^1$ Fourier変換、第二式は $L^2$ Fourier変換として解釈する。
<!-- formal-statement-end -->

### 証明の見取り図

周波数側の指数関数は $L^1\cap L^2$ です。先に逆Fourier積分を直接実行すれば、留数計算を使わず実空間の核が得られます。

<!-- proof-start -->
### 証明

[Fourier反転と整合性](../../FOU/FOU4/index.md#thm-fou4-l1-l2-compatibility)を念頭に、まず $g(\xi)=e^{-y|\xi|}$ の逆変換を計算します。$y>0$ なので絶対収束し、

$$
\begin{aligned}
\frac1{2\pi}\int_{\mathbb R}e^{-y|\xi|}e^{it\xi}d\xi
&=\frac1\pi\int_0^\infty e^{-y\xi}\cos(t\xi)\,d\xi\\
&=\frac1\pi\operatorname{Re}\int_0^\infty e^{-(y-it)\xi}d\xi\\
&=\frac1\pi\operatorname{Re}\frac1{y-it}
=\frac{y}{\pi(y^2+t^2)}=P_y(t).
\end{aligned}
$$

$g\in L^1\cap L^2$ と $P_y\in L^1\cap L^2$ なので、[L2反転](../../FOU/FOU4/index.md#thm-fou4-l2-inversion)と [$L^1$/$L^2$整合性](../../FOU/FOU4/index.md#thm-fou4-l1-l2-compatibility)により第一式が従います。

次に $h(\xi)=-i\operatorname{sgn}(\xi)e^{-y|\xi|}$ の逆変換は

$$
\begin{aligned}
\frac1{2\pi}\int_{\mathbb R}h(\xi)e^{it\xi}d\xi
&=\frac1\pi\int_0^\infty e^{-y\xi}\sin(t\xi)\,d\xi\\
&=\frac1\pi\operatorname{Im}\frac1{y-it}
=\frac{t}{\pi(y^2+t^2)}=Q_y(t).
\end{aligned}
$$

$h,Q_y\in L^2$ なので [L2反転](../../FOU/FOU4/index.md#thm-fou4-l2-inversion)で第二式が成立します。
<!-- proof-end -->

任意の $L^2$ 関数と $Q_y$ の畳み込みは、一般に「$L^2$ 同士だから絶対積分で定義してよい」というだけでは $L^2$ 値といえません。ここでは乗数が有界であることを利用して、$Q_y*f=\mathcal F_2^{-1}(\widehat Q_y\widehat f)$ と定めます。この定義は $f$ が例えば $C_c^\infty$ のときには通常の積分と一致します。

<a id="thm-ha3-poisson-boundary"></a>
<!-- formal-statement-start -->
> **定理（Poisson積分と共役Poisson積分の$L^2$境界値）**  
> $f\in L^2(\mathbb R)$、$y>0$ とし、

$$
u_y=\mathcal F_2^{-1}(e^{-y|\xi|}\widehat f),
\qquad
v_y=\mathcal F_2^{-1}(-i\operatorname{sgn}(\xi)e^{-y|\xi|}\widehat f)
$$

> とする。$u_y=P_y*f$、$v_y=Q_y*f=H(u_y)=P_y*(Hf)$ が $L^2$ で成立し、

$$
\lim_{y\downarrow0}\|u_y-f\|_2=0,
\qquad
\lim_{y\downarrow0}\|v_y-Hf\|_2=0
$$

> である。さらに $u(x,y)$ と $v(x,y)$ は上半平面 $y>0$ で滑らかで、それぞれ調和関数となる。
<!-- formal-statement-end -->

### 証明の見取り図

Poisson核のFourier変換により、乗数 $e^{-y|\xi|}$ は元の周波数を高周波から穏やかに切ります。境界値はPlancherelと優収束で示し、調和性は核を直接微分して確認します。

<!-- proof-start -->
### 証明

$P_y\in L^1$ なので [FOU4の$L^1$-$L^2$畳み込み](../../FOU/FOU4/index.md#thm-fou4-l1-l2-convolution)と [変換対](#prop-ha3-poisson-fourier)から $\widehat{P_y*f}=e^{-y|\xi|}\widehat f$ です。共役核については直前で定義した乗数による $L^2$ 畳み込みとします。

[Hilbert変換の乗数表示](#thm-ha3-multiplier)から

$$
\widehat{H(u_y)}
=-i\operatorname{sgn}(\xi)e^{-y|\xi|}\widehat f
=\widehat{v_y},
$$

また $\widehat{P_y*(Hf)}=e^{-y|\xi|}[-i\operatorname{sgn}(\xi)\widehat f]$ です。[L2変換の一意性](../../FOU/FOU4/index.md#thm-fou4-l2-inversion)より二つの等式が出ます。境界収束は

$$
\begin{aligned}
\|u_y-f\|_2^2
&=\frac1{2\pi}\int_{\mathbb R}
|e^{-y|\xi|}-1|^2|\widehat f(\xi)|^2\,d\xi\to0,\\
\|v_y-Hf\|_2^2
&=\frac1{2\pi}\int_{\mathbb R}
|e^{-y|\xi|}-1|^2|\widehat f(\xi)|^2\,d\xi\to0.
\end{aligned}
$$

実際、括弧の絶対値は1以下で各 $\xi$ で0に収束し、$\widehat f\in L^2$ なので [優収束定理](../../F0/F0-00D2B/index.md#thm-f0-00d2b-01)を適用できます。

調和性を確認します。$r=x-t$、$D=r^2+y^2$ と置くと

$$
\partial_x P_y=-\frac{2yr}{\pi D^2},
\qquad
\partial_y P_y=\frac{r^2-y^2}{\pi D^2},
$$

$$
\partial_x Q_y=\frac{y^2-r^2}{\pi D^2},
\qquad
\partial_y Q_y=-\frac{2yr}{\pi D^2}.
$$

従って $\partial_xP_y=\partial_yQ_y$、$\partial_yP_y=-\partial_xQ_y$ であり、二回微分すると $\Delta P_y=\Delta Q_y=0$ です。各 $y>0$ の近傍では核の任意階導関数の $L^1$（$P_y$）あるいは $L^2$（$Q_y$）の局所一様な上界が得られます。$f\in L^2$ に対して $\partial_x^a\partial_y^b K_y*f$ の絶対収束と局所一様収束を Cauchy–Schwarz により確かめられるので、積分内微分が正当化されます。ゆえに $\Delta u=\Delta v=0$ です。
<!-- proof-end -->

この証明は $L^2$ ノルムにおける境界値です。全ての $L^2$ 関数について各点で $v(x,y)$ が $Hf(x)$ に収束することや、主値がほとんど至る所存在することをここで得たわけではありません。

## 5. 有理関数の主値を直接計算する

Poisson核は主値積分の手計算にも向いています。$f(x)=1/(1+x^2)$ は積分可能ですが、$u=x$ に原点型の特異性があり、正負の寄与を対称に合わせる必要があります。

<a id="prop-ha3-h-poisson"></a>
<!-- formal-statement-start -->
> **命題（Poisson核のHilbert変換）**  
> $y>0$ のPoisson核 $P_y(t)=y/(\pi(t^2+y^2))$ について、各 $x\in\mathbb R$ で主値が存在し、

$$
\operatorname{p.v.}\frac1\pi\int_{\mathbb R}
\frac{P_y(x-t)}t\,dt
=Q_y(x)=\frac{x}{\pi(x^2+y^2)}
$$

> が成り立つ。特に $f(x)=1/(1+x^2)$ なら

$$
Hf(x)=\frac{x}{1+x^2}
$$

> である。
<!-- formal-statement-end -->

### 証明の見取り図

分母の $t$ と $(x-t)^2+y^2$ を部分分数分解し、対称区間で積分します。単独では収束しない $1/t$ 項と、対数の境界項は主値・対称極限により消えます。

<!-- proof-start -->
### 証明

$P_y$ は滑らかで $P_y,P_y'\in L^1$ なので、[滑らかな関数の場合の消去](#prop-ha3-smooth-pv)と同じ評価で各 $x$ の主値が存在します。$D=x^2+y^2$ と置くと恒等式

$$
\frac1{t((x-t)^2+y^2)}
=\frac1D\left(\frac1t+
\frac{x-t}{(x-t)^2+y^2}+
\frac{x}{(x-t)^2+y^2}\right)
$$

が成り立ちます。右辺を通分すれば分子は

$$
((x-t)^2+y^2)+t(x-t)+tx=x^2+y^2=D
$$

と確認できます。左右対称の外側切断 $[-R,R]$、原点の穴 $(-\varepsilon,\varepsilon)$ で積分すると、第一項の主値は0です。第二項の原始関数は $-\tfrac12\log((x-t)^2+y^2)$ なので、$\varepsilon\downarrow0$ ののち $R\to\infty$ で

$$
-\frac12\log\frac{(x-R)^2+y^2}{(x+R)^2+y^2}\longrightarrow0.
$$

第三項は、$s=x-t$ の置換で

$$
\int_{-\infty}^\infty
\frac{x}{(x-t)^2+y^2}\,dt
=\frac{x}{y}\left[\arctan(s/y)\right]_{-\infty}^\infty
=\frac{\pi x}{y}.
$$

したがって、元の係数 $y/(\pi^2D)$ を掛け、

$$
HP_y(x)=\frac{y}{\pi^2D}\cdot\frac{\pi x}y
=\frac{x}{\pi D}=Q_y(x).
$$

$1/(1+x^2)=\pi P_1(x)$ とHilbert変換の線形性から第二式が従います。
<!-- proof-end -->

ここまでの基本結果だけでも、主値・周波数乗数・滑らかな調和拡張が一致することを具体的に検算できました。次のCalderón–Zygmund分解では、この相殺を一般の特異積分の弱型評価へ広げます。

## 6. 演習

### Level A：定義と符号を手で確かめる

<a id="ex-ha3-a01"></a>
**演習 HA3-A01**  
$f(x)=1+x$ とし、$0<\varepsilon<1$ について $\int_{\varepsilon<|t|<1}f(-t)/t\,dt$ を求めよ。絶対値積分の挙動も調べよ。

- Level: A
<!-- solution-start -->
**詳細解答**　$f(-t)=1-t$ なので

$$
\int_{\varepsilon<|t|<1}\frac{1-t}t\,dt
=\int_{\varepsilon<|t|<1}\frac{dt}t
-\int_{\varepsilon<|t|<1}dt
=0-2(1-\varepsilon).
$$

従って主値は $-2$ です。一方、$t$ が0に近ければ $|1-t|\ge1/2$ なので、絶対積分は $\frac12\int_{\varepsilon<|t|<1/2}dt/|t|=\log(1/(2\varepsilon))$ 以上となり発散します。
<!-- solution-end -->

<a id="ex-ha3-a02"></a>
**演習 HA3-A02**  
$P_y(t)=y/(\pi(t^2+y^2))$ について $L^1$ ノルムが1であること、$P_y$ が偶関数で $Q_y$ が奇関数であることを確かめよ。

- Level: A
<!-- solution-start -->
**詳細解答**　$P_y\ge0$ であり、$t=yv$ と置くと

$$
\|P_y\|_1=\frac1\pi\int_{-\infty}^\infty\frac{dv}{1+v^2}
=\frac1\pi[\arctan v]_{-\infty}^\infty=1.
$$

また $P_y(-t)=P_y(t)$ は分母の $t^2$ から、$Q_y(-t)=-Q_y(t)$ は分子の $t$ から直ちに確かめられます。$\int Q_y=0$ と通常のLebesgue積分で書くことはできません。$Q_y\notin L^1$ だからです。
<!-- solution-end -->

<a id="ex-ha3-a03"></a>
**演習 HA3-A03**  
$k_{\varepsilon,R}(t)=\boldsymbol{1}_{\{\varepsilon<|t|<R\}}/(\pi t)$ のFourier変換を余弦・正弦に分解せよ。$\xi>0$ と $\xi<0$ で極限の符号がどう変わるか述べよ。

- Level: A
<!-- solution-start -->
**詳細解答**　$e^{-i\xi t}=\cos(\xi t)-i\sin(\xi t)$ とおくと余弦の積分は奇関数の対称積分で0です。正弦の積分は偶関数なので

$$
\widehat k_{\varepsilon,R}(\xi)
=-\frac{2i}\pi\int_\varepsilon^R\frac{\sin(\xi t)}t\,dt.
$$

$\xi>0$ なら [Dirichlet積分](#lem-ha3-dirichlet)は $\pi/2$ に、$\xi<0$ なら $-\pi/2$ に収束します。従って $\varepsilon\downarrow0,R\to\infty$ の極限はそれぞれ $-i$、$+i$ です。$\xi=0$ なら全ての切断で0です。
<!-- solution-end -->

<a id="ex-ha3-a04"></a>
**演習 HA3-A04**  
$H$ の乗数を用いて任意の $f,g\in L^2(\mathbb R)$ について $\langle Hf,Hg\rangle=\langle f,g\rangle$ を示し、$H^{-1}$ を求めよ。内積は第一引数線形とする。

- Level: A
<!-- solution-start -->
**詳細解答**　[Parseval内積等式](../../FOU/FOU4/index.md#thm-fou4-parseval)と [乗数表示](#thm-ha3-multiplier)から

$$
\langle Hf,Hg\rangle
=\frac1{2\pi}\int(-i\operatorname{sgn}\xi)\widehat f\,
\overline{(-i\operatorname{sgn}\xi)\widehat g}\,d\xi
=\frac1{2\pi}\int|\operatorname{sgn}\xi|^2\widehat f\overline{\widehat g}\,d\xi
=\langle f,g\rangle.
$$

$H^2=-I$ であることは [系](#cor-ha3-isometry)から従うので、$(-H)H=H(-H)=I$、従って $H^{-1}=-H$ です。
<!-- solution-end -->

<a id="ex-ha3-a05"></a>
**演習 HA3-A05**  
$y>0$ を固定する。$Q_y(t)=t/(\pi(t^2+y^2))$ は $L^2(\mathbb R)$ に属するが $L^1(\mathbb R)$ に属さないことを示せ。

- Level: A
<!-- solution-start -->
**詳細解答**　$|t|\ge y$ で $|Q_y(t)|\ge1/(2\pi|t|)$ です。ゆえに $\int_{|t|\ge y}|Q_y(t)|dt=\infty$ です。他方、$|t|\le y$ なら $|Q_y(t)|\le |t|/(\pi y^2)$、$|t|>y$ なら $|Q_y(t)|\le1/(\pi|t|)$ なので

$$
\int|Q_y|^2dt
\le\frac2{\pi^2 y^4}\int_0^y t^2dt
+\frac2{\pi^2}\int_y^\infty\frac{dt}{t^2}
=\frac{2}{3\pi^2y}+\frac2{\pi^2y}<\infty.
$$
<!-- solution-end -->

### Level B：主値と滑らか化の構造を使う

<a id="ex-ha3-b01"></a>
**演習 HA3-B01**  
$a<b$ とし $f=\boldsymbol{1}_{(a,b)}$ とする。$x\notin\{a,b\}$ でHilbert変換の主値を求め、端点では有限主値が存在しない理由を述べよ。

- Level: B
<!-- solution-start -->
**詳細解答**　定義の $u$ 変数を使うと

$$
Hf(x)=\frac1\pi\operatorname{p.v.}\int_a^b\frac{du}{x-u}.
$$

$x\notin[a,b]$ なら通常の積分で、原始関数 $-\log|x-u|$ を端点で評価して

$$
Hf(x)=\frac1\pi\log\left|\frac{x-a}{x-b}\right|.
$$

$a<x<b$ では $x$ の両側から $\varepsilon$ を除くと

$$
\int_a^{x-\varepsilon}\frac{du}{x-u}
+\int_{x+\varepsilon}^b\frac{du}{x-u}
=\log(x-a)-\log\varepsilon
+\log\varepsilon-\log(b-x),
$$

ゆえに同じ式です。$x=a$ では積分区間が特異点の右にしかなく $-\int_{a+\varepsilon}^b du/(u-a)\to-\infty$、$x=b$ では $+\infty$ です。したがって端点で主値は存在しません。
<!-- solution-end -->

<a id="ex-ha3-b02"></a>
**演習 HA3-B02**  
$y,z>0$ に対し $P_y*P_z=P_{y+z}$ を示せ。さらに $Q_y*P_z=Q_{y+z}$ を $L^2$ の意味で示せ。

- Level: B
<!-- solution-start -->
**詳細解答**　[Poisson核の変換対](#prop-ha3-poisson-fourier)を使います。$P_y,P_z\in L^1$ なので[畳み込み定理](../../FOU/FOU3/index.md#thm-fou3-convolution)より

$$
\widehat{P_y*P_z}
=e^{-y|\xi|}e^{-z|\xi|}=e^{-(y+z)|\xi|}
=\widehat{P_{y+z}}.
$$

Fourier変換の一意性から最初の等式です。$P_z\in L^1,Q_y\in L^2$ なので[$L^1$-$L^2$畳み込み定理](../../FOU/FOU4/index.md#thm-fou4-l1-l2-convolution)が適用でき、

$$
\widehat{Q_y*P_z}
=(-i\operatorname{sgn}\xi)e^{-y|\xi|}e^{-z|\xi|}
=\widehat{Q_{y+z}}.
$$

[FOU4の一意性](../../FOU/FOU4/index.md#thm-fou4-l2-inversion)から $L^2$ で一致します。
<!-- solution-end -->

<a id="ex-ha3-b03"></a>
**演習 HA3-B03**  
$f(x)=(1+x^2)^{-1}$ とする。[Poisson核の主値計算](#prop-ha3-h-poisson)から $Hf$ を求め、$\|f\|_2=\|Hf\|_2$ を実積分でも確認せよ。

- Level: B
<!-- solution-start -->
**詳細解答**　$f=\pi P_1$ なので $Hf(x)=x/(1+x^2)$ です。まず $x=\tan\theta$、$dx=\sec^2\theta\,d\theta$ により

$$
\|f\|_2^2=\int_{-\infty}^\infty\frac{dx}{(1+x^2)^2}
=\int_{-\pi/2}^{\pi/2}\cos^2\theta\,d\theta
=\frac\pi2.
$$

さらに

$$
\frac{x^2}{(1+x^2)^2}
=\frac1{1+x^2}-\frac1{(1+x^2)^2}
$$

なので

$$
\|Hf\|_2^2
=\int\frac{dx}{1+x^2}-\int\frac{dx}{(1+x^2)^2}
=\pi-\frac\pi2=\frac\pi2.
$$

従って両ノルムは $\sqrt{\pi/2}$ で、[等長性](#cor-ha3-isometry)と一致します。
<!-- solution-end -->

<a id="ex-ha3-b04"></a>
**演習 HA3-B04**  
$f\in L^2$、$y>0$ について $u_y=P_y*f$ とする。$\|u_y\|_2\le\|f\|_2$ と $\|H(u_y)\|_2\le\|f\|_2$ を証明し、$y\downarrow0$ の極限で等号へ近づく理由を述べよ。

- Level: B
<!-- solution-start -->
**詳細解答**　[Poisson境界値定理](#thm-ha3-poisson-boundary)の乗数と[Plancherel](../../FOU/FOU4/index.md#thm-fou4-l2-extension)から

$$
\|u_y\|_2^2
=\frac1{2\pi}\int e^{-2y|\xi|}|\widehat f(\xi)|^2d\xi
\le\frac1{2\pi}\int|\widehat f|^2d\xi=\|f\|_2^2.
$$

$H(u_y)$ の乗数にはさらに $-i\operatorname{sgn}\xi$ が掛かりますが、その絶対値はほとんど至る所で1なので同じ積分です。$e^{-2y|\xi|}\to1$、$0\le e^{-2y|\xi|}\le1$ と $\widehat f\in L^2$ より[優収束定理](../../F0/F0-00D2B/index.md#thm-f0-00d2b-01)で積分が $\|f\|_2^2$ に収束します。
<!-- solution-end -->

### Level C：端点特異性と二種類の極限を区別する

<a id="ex-ha3-c01"></a>
**演習 HA3-C01**  
$f=\boldsymbol{1}_{(0,1)}\in L^2(\mathbb R)$ とする。(1) $x\notin\{0,1\}$ で主値の式を導け。(2) その結果が $L^2$ に属することを説明せよ。(3) 端点での主値不成立と $H_\varepsilon f\to Hf$ の $L^2$ 収束が矛盾しない理由を述べよ。

- Level: C
<!-- solution-start -->
**詳細解答**　(1) $x\notin[0,1]$ なら原始関数 $-\log|x-u|$ の端点評価で

$$
Hf(x)=\frac1\pi[\log|x|-\log|x-1|].
$$

$0<x<1$ では $u=x$ の両側に同じ長さ $\varepsilon$ の穴を開け、

$$
\begin{aligned}
\pi H_\varepsilon f(x)
&=\int_0^{x-\varepsilon}\frac{du}{x-u}
+\int_{x+\varepsilon}^1\frac{du}{x-u}\\
&=(\log x-\log\varepsilon)
+(\log\varepsilon-\log(1-x))\\
&=\log\frac{x}{1-x}
\end{aligned}
$$

（$\varepsilon<\min(x,1-x)$）となり同じ式です。

(2) $x\to0$ では $\log|x-1|$ が有界なので $|Hf(x)|\le C(1+|\log|x||)$、$x\to1$ でも同様です。$\int_0^\delta|\log t|^2dt<\infty$ は $t=e^{-s}$ で $\int_{-\log\delta}^\infty s^2e^{-s}ds<\infty$ に変換して確認できます。$|x|\ge2$ では

$$
\log\left|\frac{x}{x-1}\right|
=\log\left|1+\frac1{x-1}\right|=O(|x|^{-1})
$$

なのでその二乗は可積分です。従って $Hf\in L^2$ です。

(3) $x=0$ なら片側の $\int_\varepsilon^1(-1/u)\,du=\log\varepsilon$ が $-\infty$ へ発散し、$x=1$ なら $+\infty$ です。しかし二点集合 $\{0,1\}$ はLebesgue測度0で、$L^2$ の関数はその上の値を区別しません。[L2構成定理](#thm-ha3-multiplier)はノルム収束のみ主張するため、二点で有限主値が存在しないことと矛盾しません。
<!-- solution-end -->
