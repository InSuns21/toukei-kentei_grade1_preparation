# IG4 指数型分布族と混合型分布族

<!-- definition-example-audit: strict -->

[IG3 の KL divergence の二次近似](../IG3/index.md#thm-ig3-kl-fisher-hessian)から、近い分布の隔たりを Fisher 計量で測れるようになりました。しかし、計量だけでは「どの座標が分布の形に合っているか」は分かりません。Bernoulli 分布では確率 $p$ をそのまま動かす方法と、対数オッズ $\log\{p/(1-p)\}$ を動かす方法があります。どちらも同じ分布を指すのに、直線に見える方向は違います。

この講では二つの仕組みを調べます。**指数型分布族**は確率の対数を自然母数の一次式で表し、**混合型分布族**は確率そのものを係数の一次式で表します。まず指数型の正規化から Fisher 計量が対数分配関数の二階微分になることを確認し、次に有限確率単体の混合座標と比較します。「二つの座標が双対になる」というさらに強い主張は、後の Legendre 双対と接続を扱う際に証明します。

## 1. 指数の係数を座標として読む

例えば $X\in\{0,1\}$ の Bernoulli 分布を、成功確率 $p$ の代わりに実数 $a$ を使って

$$
p_a(0)=\frac{1}{1+e^a},\qquad
p_a(1)=\frac{e^a}{1+e^a}
$$

と書きます。$a=\log\{p/(1-p)\}$ であり、$a$ を増やすと成功が相対的に起こりやすくなります。この表示では、観測値 $x$ から作る統計量 $F(x)=x$ と係数 $a$ の積が指数に入ります。

一般の測度空間 $(S,\mu)$ では、可測な $h:S\to[0,\infty)$ と、各成分が有限実数値で可測な関数 $F=(F_1,\ldots,F_d):S\to\mathbb R^d$ を固定し、$\mu(\{h>0\})>0$ と仮定して

$$
Z(\theta)=\int_S h(x)e^{\sum_i\theta^iF_i(x)}\,d\mu(x),
\quad
\Omega=\{\theta\in\mathbb R^d:Z(\theta)<\infty\},
\quad \Theta=\operatorname{int}\Omega
$$

を考えます。$\theta^i$ は指数の係数（自然母数）であり、上付きの $i$ は成分番号であってべき乗ではありません。$F_i$ は観測から計算する統計量、$h$ は母数に依存しない基準の重みです。$\mu(\{h>0\})>0$ なので、$Z(\theta)$ が有限なら $Z(\theta)>0$ です。$\Theta\ne\varnothing$ とし、$\psi(\theta)=\log Z(\theta)$ を対数分配関数と書けば

$$
p_\theta(x)=h(x)\exp\left\{\sum_i\theta^iF_i(x)-\psi(\theta)\right\}.
$$

これは [ML2-03 の固定台の正則自然指数型分布族](../../../応用系/ML/ML2-03/index.md#def-ml2-03-regular-family)そのものです。以後は $\mu$ に関してほとんど至る所の固定された正の台 $S_h=\{h>0\}$ 上で対数を取ります。自然母数空間 $\Theta$ は開かつ凸であり、各点の近傍での指数的な積分支配によって二階まで微分積分交換が成立します。この事実は [ML2-03 の微分公式の証明](../../../応用系/ML/ML2-03/index.md#thm-ml2-03-log-partition-moments)で、有限個の近傍点における可積分指数関数を支配関数にして確かめられています。

異なる母数が同じ分布を表したら、係数を座標と呼ぶのは危険です。そこで [IG1 のパラメータ表示](../IG1/index.md#def-ig1-finite-parametrization)と[方向スコアの定義](../IG1/index.md#def-ig1-directional-score)、[IG2 の非退化条件](../IG2/index.md#thm-ig2-positive-definiteness)にならい、局所識別と接方向の非退化性を確認してから自然座標として使います。以下、$\partial_i$ は他の自然母数成分を固定して $\theta^i$ で偏微分する記号、$\partial_{ij}$ は $\theta^i,\theta^j$ に関する二階偏微分です。

<a id="def-ig4-natural-chart"></a>

<!-- formal-statement-start -->
> **定義（指数型分布族の局所自然座標）**  
> $d\ge1$、非空の開集合 $\Theta\subset\mathbb R^d$ 上の正則指数型分布族 $p_\theta=h\exp(\theta\cdot F-\psi(\theta))$ を考え、共通の正の台を $S_h$ とする。$\theta\mapsto p_\theta$ が局所的に一対一であり、各 $\theta\in\Theta$ と非零 $v\in\mathbb R^d$ に対して方向スコアが

$$
\sum_{i=1}^d v^i\partial_i\log p_\theta\ne0
\quad\text{in }L^2(p_\theta)
$$

> であるとき、$\theta=(\theta^1,\ldots,\theta^d)$ をそのモデルの**局所自然座標**として扱う。
<!-- formal-statement-end -->

<!-- definition-example-start: def-ig4-natural-chart -->
**定義の確認**（Bernoulli）。$h(0)=h(1)=1$、$F(x)=x$、$Z(a)=1+e^a$ です。全実数 $a$ に対して正規化でき、台は $\{0,1\}$ のままです。$p_a(1)=e^a/(1+e^a)$ の導関数は $e^a/(1+e^a)^2>0$ なので $a$ から分布への写像は一対一です。さらに $p=p_a(1)\in(0,1)$ と置けば $\frac{d}{da}\log p_a(1)=1-p>0$ であり、正の確率を持つ標本点 $x=1$ で方向スコアが非零です。よって $L^2(p_a)$ でも零元にはならず、定義の二条件をともに満たします。後で Fisher 計量でも非退化性を直接確かめます。
<!-- definition-example-end -->

観測が $n$ 個の独立同分布標本 $X_1,\ldots,X_n$ なら、その同時密度は

$$
\prod_{r=1}^n p_\theta(x_r)
=\left(\prod_{r=1}^n h(x_r)\right)
\exp\left\{\sum_i\theta^i\sum_{r=1}^nF_i(x_r)-n\psi(\theta)\right\}.
$$

$x_1,\ldots,x_n$ の母数依存部分は $\sum_rF(x_r)$ だけを通ります。共通台を持ち、この因子分解が成立するため、[S1-02 の十分性の因子分解判定](../../../../03_inference/S1_02_統計量_十分性_分解定理/index.md#thm-s1-02-01)から $\sum_rF(X_r)$ は $\theta$ の**十分統計量**です。これは「幾何的な自然座標」と「標本の情報圧縮」が同じ指数表示から出ることを示します。ただし十分性だけでは座標の非退化性は保証されません。

## 2. 正規化の二階微分が Fisher 計量になる

指数型表示の対数は

$$
\ell_\theta(x)=\log h(x)+\sum_i\theta^iF_i(x)-\psi(\theta)
$$

です。従って [IG1 の方向スコア](../IG1/index.md#def-ig1-directional-score)を各自然母数方向へ適用すると

$$
\partial_i\ell_\theta(x)=F_i(x)-\partial_i\psi(\theta)
$$

となります。ここで正規化 $Z$ を微分すると、指数から $F_i$ と $F_iF_j$ が出ます。$Z>0$ と、開いた $\Theta$ の近傍での可積分支配により

$$
\begin{aligned}
\partial_i Z&=\int_S F_i(x)h(x)e^{\theta\cdot F(x)}\,d\mu(x),\\
\partial_{ij}Z&=\int_S F_i(x)F_j(x)h(x)e^{\theta\cdot F(x)}\,d\mu(x),\\
\partial_i\psi&=\frac{\partial_i Z}{Z}=E_\theta[F_i(X)],\\
\partial_{ij}\psi&=\frac{\partial_{ij}Z}{Z}
-\frac{\partial_iZ\,\partial_jZ}{Z^2}
=E_\theta[F_iF_j]-E_\theta[F_i]E_\theta[F_j].
\end{aligned}
$$

一階・二階の微分積分交換と導関数の連続性は [対数分配関数の微分公式](../../../応用系/ML/ML2-03/index.md#thm-ml2-03-log-partition-moments)の仮定に対応しています。最後の式は $F_i,F_j$ の共分散です。ここに [IG2 の Fisher 情報行列](../IG2/index.md#def-ig2-fisher-information)を重ねると、計量の新しい表示を得ます。

<a id="thm-ig4-fisher-hessian"></a>

<!-- formal-statement-start -->
> **定理（指数型分布族の Fisher--Hessian 恒等式）**  
> 測度空間 $(S,\mu)$ 上の固定台の正則指数型分布族 $p_\theta=h\exp(\theta\cdot F-\psi(\theta))$ を考える。$F:S\to\mathbb R^d$ と $h\ge0$ は母数に依存せず、$\Theta=\operatorname{int}\{\theta:0<Z(\theta)<\infty\}\ne\varnothing$ とする。$\theta\in\Theta$ において、その自然母数表示の Fisher 行列は

$$
g_{ij}(\theta)=\partial_{ij}\psi(\theta)
=\operatorname{Cov}_\theta(F_i(X),F_j(X)).
$$

> したがって $\psi$ の Hessian は半正定値である。自然母数が局所座標を与える非退化な点では正定値である。
<!-- formal-statement-end -->

**証明の見取り図**：スコアは「統計量 $F_i$ からその平均を引いたもの」です。Fisher 行列はこの中心化した統計量の積の期待値で、正規化関数の二階微分と一致します。正定値性は、中心化した統計量の線形結合が消えない条件で判定します。

<!-- proof-start -->
### 証明

[ML2-03 の微分公式](../../../応用系/ML/ML2-03/index.md#thm-ml2-03-log-partition-moments)を、定理の $(S,\mu),h,F,\Theta$ に適用します。$\Theta$ は指数の積分が有限な集合の内部なので、各 $\theta$ の近くで二階までの積分交換に必要な支配が得られ、$E_\theta[F_iF_j]$ は有限です。従って $\partial_i\psi=E_\theta F_i$、$\partial_{ij}\psi=\operatorname{Cov}_\theta(F_i,F_j)$ です。

スコアを直接微分すれば $\partial_i\ell_\theta=F_i-\partial_i\psi=F_i-E_\theta F_i$。よって [Fisher 情報行列の定義](../IG2/index.md#def-ig2-fisher-information)から

$$
\begin{aligned}
g_{ij}&=E_\theta[(F_i-E_\theta F_i)(F_j-E_\theta F_j)]\\
&=E_\theta[F_iF_j]-E_\theta F_i\,E_\theta F_j
=\partial_{ij}\psi.
\end{aligned}
$$

任意の $v\in\mathbb R^d$ について

$$
v^{\mathsf T}Gv
=E_\theta\left[\left\{\sum_iv^i(F_i-E_\theta F_i)\right\}^2\right]\ge0.
$$

零となるのは対応する方向スコアが $p_\theta$ の下でほとんど確実に零のときです。[IG2 の非退化条件](../IG2/index.md#thm-ig2-positive-definiteness)と局所自然座標の条件により、非零方向すべてで正になります。
<!-- proof-end -->

この等式は、任意の座標で「計量＝ある関数の普通の二階偏微分」と言っているわけではありません。指数の**自然母数**で書いたときに成り立つ特別な式です。座標を変えると計量は [テンソル変換則](../IG2/index.md#thm-ig2-coordinate-invariance)に従いますが、一般の Hessian は非線形座標変換で余分な一階微分の項を持ちます。この違いが次講の入口です。

### 自然座標はいつ本当に座標になるか

「統計量の成分が多いほどよい」とは限りません。例えば Bernoulli の $F(x)=(x,2x)$ は二成分ですが、実際に分布を動かす方向は一つだけです。必要なのは、$F$ の非零線形結合が台上で定数にならないことです。まずこの非冗長性を定義します。ここでの条件は指数表示に関するもので、[最小十分統計量](../../../../03_inference/S1_02_統計量_十分性_分解定理/index.md#def-s1-02-minimal-sufficient-statistic)という統計的圧縮の条件と混同しません。

<a id="def-ig4-exponential-minimality"></a>

<!-- formal-statement-start -->
> **定義（指数表示の最小性）**  
> 固定の正の台 $S_h$、統計量 $F:S\to\mathbb R^d$、非空の開自然母数空間 $\Theta$ を持つ正則指数型分布族を考える。非零 $v\in\mathbb R^d$ と定数 $c\in\mathbb R$ で $v\cdot F(x)=c$ が $S_h$ 上で $\mu$ ほとんど至る所成り立つものがないとき、その指数表示は**最小**である。
<!-- formal-statement-end -->

<!-- definition-example-start: def-ig4-exponential-minimality -->
**定義の確認**（Bernoulli の $F(x)=x$）。$S_h=\{0,1\}$ の両点が正の確率を持ちます。$vx=c$ が両点で成立すると仮定すると、$x=0$ から $c=0$、$x=1$ から $v=c=0$ となります。従って非零の $v$ は存在せず、指数表示は最小です。これと $F=(x,2x)$ の退化例を比べましょう。
<!-- definition-example-end -->

<a id="prop-ig4-minimality"></a>

<!-- formal-statement-start -->
> **命題（最小性・識別可能性と正定値 Fisher 行列）**  
> 上の正則指数型分布族で、$\Theta$ は非空の開集合、正の台 $S_h$ は $\theta$ に依存せず、$F_i$ は有限実数値とする。次は同値である。
>
> 1. 非零 $v\in\mathbb R^d$ と定数 $c$ で $v\cdot F(x)=c$ が $S_h$ 上で $\mu$ ほとんど至る所成立するものはない（[指数表示の最小性](#def-ig4-exponential-minimality)）。
> 2. 任意の $\theta\in\Theta$ において $G(\theta)=\nabla^2\psi(\theta)$ は正定値である。
> 3. $\theta\mapsto p_\theta$ は一対一であり、各点で方向スコアが非退化である。
<!-- formal-statement-end -->

**証明の見取り図**：$v^{\mathsf T}Gv$ は $v\cdot F$ の分散なので、定数になる方向がちょうど零方向です。その方向へ母数を動かすと、指数に加わる定数は正規化 $\psi$ に吸収され、分布が変わりません。

<!-- proof-start -->
### 証明

[Fisher--Hessian 恒等式](#thm-ig4-fisher-hessian)より $v^{\mathsf T}G(\theta)v=\operatorname{Var}_\theta(v\cdot F)$。二乗の期待値が零であることは $v\cdot F$ が $p_\theta$ の下でほとんど確実に定数であることと同値です。全 $\theta\in\Theta$ で $p_\theta(x)>0$ は $S_h$ 上の $\mu$ ほとんど全点に成り立つため、零集合は同じです。よって 1 と 2 は同値で、2 なら方向スコアも非退化です。

さらに $p_\theta=p_\xi$ が $\mu$ ほとんど至る所成立するとします。共通の正の台で対数を取れば

$$
(\theta-\xi)\cdot F(x)=\psi(\theta)-\psi(\xi)
$$

です。1 の下では $\theta-\xi=0$ でなければ定数関係が生じてしまうので、$\theta=\xi$。従って 1 から 3 が従います。

逆に 1 が破れ、ある非零 $v$ と $c$ が $v\cdot F=c$ を満たすなら、$\Theta$ は開なので任意の $\theta\in\Theta$ に対し十分小さい非零 $t$ で $\theta+tv\in\Theta$ です。このとき

$$
Z(\theta+tv)=\int_Sh e^{\theta\cdot F+tc}\,d\mu=e^{tc}Z(\theta),
\quad
\psi(\theta+tv)=\psi(\theta)+tc.
$$

従って $p_{\theta+tv}=p_\theta$ となり、3 の一対一性に反します。これで同値性が示されました。
<!-- proof-end -->

**退化の直接例。** $F(x)=(x,2x)$、$\theta=(a,b)\in\mathbb R^2$、$h(0)=h(1)=1$ とすると $Z=1+e^{a+2b}$ で、$p_\theta(1)$ は $a+2b$ のみに依存します。$v=(2,-1)$ なら $v\cdot F(x)=0$ が両標本点で成立します。$q=p_\theta(1)$ と置いて実際にスコアと Fisher 行列を求めると

$$
\nabla\ell_\theta(X)=(X-q)(1,2)^{\mathsf T},\quad
G=q(1-q)\begin{pmatrix}1&2\\2&4\end{pmatrix},
\quad Gv=0.
$$

$q\in(0,1)$ でも行列式は零です。失われたのは台や積分交換ではなく、母数方向の識別可能性です。

## 3. Bernoulli・Poisson・正規分布を自然母数で計算する

### Bernoulli：対数オッズの座標

第1節の Bernoulli で $a\in\mathbb R$ とします。一変数のプライム記法 $\psi'(a),\psi''(a)$ はそれぞれ $d\psi/da,d^2\psi/da^2$ を意味し、多変数の $\partial_i,\partial_{ij}$ と微分する変数を揃えた書き方です。このとき

$$
\psi(a)=\log(1+e^a),\quad
\psi'(a)=\frac{e^a}{1+e^a}=p,\quad
\psi''(a)=\frac{e^a}{(1+e^a)^2}=p(1-p).
$$

$F=X$ だから $\psi'=E[X]$、$\psi''=\operatorname{Var}(X)$ です。[IG2 の確率座標での計量](../IG2/index.md#def-ig2-fisher-information) $g_{pp}=1/[p(1-p)]$ を、$dp/da=p(1-p)$ によって変換しても

$$
g_{aa}=\left(\frac{dp}{da}\right)^2g_{pp}=p(1-p)
$$

と一致します。有限の $a$ では常に正ですが、$a\to\pm\infty$ で $p\to1,0$ となり、$g_{aa}\to0$ です。$p=0,1$ は自然母数空間 $\mathbb R$ の有限な内部点ではありません。

### Poisson：無限和でも固定台

$X\in\{0,1,2,\ldots\}$、$h(x)=1/x!$、$F(x)=x$、$a=\log\lambda\in\mathbb R$ とします。指数級数を使えば

$$
Z(a)=\sum_{x=0}^\infty\frac{e^{ax}}{x!}=\exp(e^a),
\qquad
\psi(a)=e^a=\lambda.
$$

従って $p_a(x)=e^{-\lambda}\lambda^x/x!$ で正規化され、$\psi'(a)=\psi''(a)=\lambda$ より平均も分散も $\lambda$ です。自然母数での Fisher 情報量は $g_{aa}=\lambda$。$\lambda$ 座標では $da/d\lambda=1/\lambda$ だから、[IG2 の座標変換則](../IG2/index.md#thm-ig2-coordinate-invariance)より $g_{\lambda\lambda}=(da/d\lambda)^2g_{aa}=1/\lambda$ です。標本点は無限個ですが、台は $\lambda>0$ の全域で同じであり、各 $a$ の近傍に有限な $Z$ があることが積分交換を支えます。

### 正規位置尺度族：二つの統計量

$X\sim N(\mu,\sigma^2)$、$\mu\in\mathbb R$、$\sigma^2>0$ では指数の中の $x$ と $x^2$ を切り出します。

$$
F(x)=(x,x^2),\qquad
\theta^1=\frac{\mu}{\sigma^2},\qquad
\theta^2=-\frac{1}{2\sigma^2}<0,\qquad
h(x)=\frac1{\sqrt{2\pi}}.
$$

母数の領域は開半平面 $\Theta=\{(\theta^1,\theta^2):\theta^2<0\}$。平方完成の中心と分散を

$$
\mu=-\frac{\theta^1}{2\theta^2},\qquad
\sigma^2=-\frac1{2\theta^2}
$$

と書けば、積分は

$$
\begin{aligned}
Z(\theta)
&=\frac1{\sqrt{2\pi}}\int_{\mathbb R}
\exp\left\{\theta^2\left(x+\frac{\theta^1}{2\theta^2}\right)^2
-\frac{(\theta^1)^2}{4\theta^2}\right\}\,dx\\
&=\frac1{\sqrt{-2\theta^2}}
\exp\left\{-\frac{(\theta^1)^2}{4\theta^2}\right\},\\
\psi(\theta)&=-\frac12\log(-2\theta^2)-\frac{(\theta^1)^2}{4\theta^2}.
\end{aligned}
$$

正規積分の係数 $(-2\theta^2)^{-1/2}$ が欠けると正規化が崩れます。ここで

$$
\partial_1\psi=-\frac{\theta^1}{2\theta^2}=\mu,\qquad
\partial_2\psi=-\frac1{2\theta^2}+\frac{(\theta^1)^2}{4(\theta^2)^2}
=\sigma^2+\mu^2.
$$

これは $E[X]$ と $E[X^2]$ です。二階微分は正規分布の中心モーメント $E[(X-\mu)^3]=0$、$E[(X-\mu)^4]=3\sigma^4$ を使うと

$$
\nabla^2\psi
=\operatorname{Cov}(X,X^2)
=\begin{pmatrix}
\sigma^2&2\mu\sigma^2\\
2\mu\sigma^2&2\sigma^4+4\mu^2\sigma^2
\end{pmatrix},
\quad
\det\nabla^2\psi=2\sigma^6>0.
$$

例えば共分散の非対角成分は $E[X^3]-E[X]E[X^2]$ で、$E[X^3]=\mu^3+3\mu\sigma^2$ を代入すると $2\mu\sigma^2$ になります。正定値性の判定には、対称二次行列 $G=\begin{pmatrix}A&C\\C&D\end{pmatrix}$（$A>0$）について

$$
v^{\mathsf T}Gv
=A\left(v^1+\frac CA v^2\right)^2
+\frac{\det G}{A}(v^2)^2
$$

と平方完成できることを使います。いま $A=\sigma^2>0$、$\det G=2\sigma^6>0$ なので、$v\ne0$ の二次形式は正です。この計量を $(\mu,\sigma)$ に引き戻せば、[IG2 の正規位置尺度族の計量](../IG2/index.md#prop-ig2-normal-information)と同じ量を表します。

---

## 4. 確率を足し合わせる混合座標

指数型では $\log p$ の係数を動かしました。確率分布を実際に混ぜる操作では、対数を介さず成分 $p_i$ そのものが一次式になります。[IG1 の正の有限確率単体](../IG1/index.md#def-ig1-positive-simplex)の各点は $p_i>0$、$\sum_i p_i=1$ を満たします。成分和が1なので $m$ 個すべてを自由に変えられるわけではなく、最後の成分は残りで決まります。

<a id="def-ig4-mixture-coordinate"></a>

<!-- formal-statement-start -->
> **定義（正の有限単体の混合座標）**  
> $m\ge2$ とし、各成分が正で総和1の $m$ 点分布 $p\in\Delta_{m-1}^{\circ}$ を考える。$u=(u^1,\ldots,u^{m-1})$ の各成分を $u^i=p_i$ と置く。最後の確率の復元式と、座標の範囲は

$$
p_m=1-\sum_{i=1}^{m-1}u^i,\qquad
u^i>0,\quad \sum_{i=1}^{m-1}u^i<1
$$

> である。この $u$ を正の有限確率単体の**混合座標**とする。
<!-- formal-statement-end -->

<!-- definition-example-start: def-ig4-mixture-coordinate -->
**定義の確認**（三値分布）。$p=(1/2,1/3,1/6)$ は各成分が正で和が1です。混合座標は $u=(1/2,1/3)$ で、確かに $1/2+1/3<1$。逆に $p_3=1-1/2-1/3=1/6$ と復元でき、座標と確率の対応は一対一です。微小な座標変化 $(a,b)$ は確率の接速度 $(a,b,-a-b)$ に対応し、[単体の接空間](../IG1/index.md#thm-ig1-simplex-tangent)の成分和0条件も満たします。
<!-- definition-example-end -->

混合座標で係数が直線的に動く分布族を作ります。$p^0$ を基準の確率ベクトル、$B$ を各列の成分和が零の $m\times k$ 行列とし、$p(t)=p^0+Bt$ と置きます。列の成分和が零なら正規化は保たれます。各成分が正のところだけを開いた母数領域に選べば、台も固定されます。

<a id="def-ig4-mixture-family"></a>

<!-- formal-statement-start -->
> **定義（有限単体上の混合型分布族）**  
> $m\ge2$、$1\le k\le m-1$、$p^0\in\Delta_{m-1}^{\circ}$ とし、$B\in\mathbb R^{m\times k}$ の各列の成分和は零、列階数は $k$ とする。非空の開凸集合

$$
U=\{t\in\mathbb R^k:p^0+Bt\in\Delta_{m-1}^{\circ}\}
$$

> 上の分布族 $p(t)=p^0+Bt$ を、ここでは**混合型分布族**とする。$t$ はこの族の混合アファイン座標である。$B$ の列階数条件は、異なる $t$ が異なる分布を表すための条件である。
<!-- formal-statement-end -->

<!-- definition-example-start: def-ig4-mixture-family -->
**定義の確認**（三値の線形制約）。$p^0=(1/4,1/4,1/2)$、$B=(1,1,-2)^{\mathsf T}$ とすると、列の成分和は $1+1-2=0$、階数は1です。$t\in(-1/4,1/4)$ に対して $p(t)=(1/4+t,1/4+t,1/2-2t)$ は全成分が正で和が1です。$u=1/4+t$ と書けば $p=(u,u,1-2u)$、$0<u<1/2$。混合座標 $(p_1,p_2)=(u,u)$ は直線です。ここで $u$ と $t$ は違う原点を使うだけで、分布族は同じです。
<!-- definition-example-end -->

二つの固定分布 $q^0,q^1\in\Delta_{m-1}^{\circ}$ を $(1-s)q^0+sq^1$（$0<s<1$）で混ぜる場合もこの形になります。$B=q^1-q^0$ と置けば、成分和は零で、$q^0\ne q^1$ なら階数1です。複数の固定分布を混ぜるときは、基準の $q^0$ と差ベクトル $q^a-q^0$ を $B$ の列とします。ただしそれらが線形従属なら冗長な混合係数を取り除かなければなりません。

<a id="thm-ig4-mixture-affine"></a>

<!-- formal-statement-start -->
> **定理（混合型分布族のアファイン線分と Fisher 計量）**  
> [有限単体上の混合型分布族](#def-ig4-mixture-family) $p(t)=p^0+Bt$、$t\in U$ を考える。任意の $t_0,t_1\in U$ と $0\le s\le1$ に対して、$t_s=(1-s)t_0+st_1$ は $U$ に属し、

$$
p(t_s)=(1-s)p(t_0)+sp(t_1).
$$

> また $t$ 座標における Fisher 行列は

$$
G(t)=B^{\mathsf T}
\operatorname{diag}\left(\frac1{p_1(t)},\ldots,\frac1{p_m(t)}\right)B
$$

> であり、$U$ のすべての点で正定値である。
<!-- formal-statement-end -->

**証明の見取り図**：正の確率の凸結合は再び正で、和も1です。$p(t)$ が係数に対して一次式であるため、確率を混ぜる操作と母数を線形補間する操作が一致します。Fisher 計量は確率の接速度を各 $p_i$ で割った二乗和で計算できます。

<!-- proof-start -->
### 証明

$p(t_0)$ と $p(t_1)$ は正の確率であり、任意の $s\in[0,1]$ に対して各成分 $(1-s)p_i(t_0)+sp_i(t_1)>0$、成分和も $(1-s)+s=1$ です。また

$$
\begin{aligned}
p((1-s)t_0+st_1)
&=p^0+B((1-s)t_0+st_1)\\
&=(1-s)(p^0+Bt_0)+s(p^0+Bt_1).
\end{aligned}
$$

よって $t_s\in U$ と等式が示されました。

成分ごとに $p_i(t)=p_i^0+\sum_aB_{ia}t^a$ なので $\partial_a p_i=B_{ia}$ です。[有限正単体からの Fisher 計量の引き戻し](../IG2/index.md#thm-ig2-simplex-pullback)を、接速度 $\partial_a p=(B_{1a},\ldots,B_{ma})$ に適用すると

$$
g_{ab}(t)=\sum_{i=1}^m\frac{\partial_a p_i(t)\partial_b p_i(t)}{p_i(t)}
=\sum_{i=1}^m\frac{B_{ia}B_{ib}}{p_i(t)}.
$$

これは表示した行列式です。$v\ne0$ に対して

$$
v^{\mathsf T}G(t)v=\sum_i\frac{(Bv)_i^2}{p_i(t)}>0
$$

です。実際、列階数が $k$ なので $Bv\ne0$ となり、少なくとも一つの分子が正で、すべての分母も正です。
<!-- proof-end -->

混合型の直線性は Fisher 計量が定数であるという意味ではありません。上の式の分母 $p_i(t)$ は通常 $t$ に依存します。**アファインな座標**と**Euclid 的な定数計量**は別の性質です。

## 5. 二種類の直線と曲がった部分族

三値の全確率単体では、混合座標 $u=(p_1,p_2)$ はすでに定義しました。一方、三値の分布を指数型で表すには $F_1(x)=\mathbf1_{\{x=1\}}$、$F_2(x)=\mathbf1_{\{x=2\}}$、$h(x)=1$ と選びます。自然母数を $(a,b)$ とすると

$$
p(a,b)=\frac{(e^a,e^b,1)}{1+e^a+e^b},
\qquad
\psi(a,b)=\log(1+e^a+e^b).
$$

$p_3>0$ なので $a=\log(p_1/p_3)$、$b=\log(p_2/p_3)$ と逆に求められます。従って正の三値単体全体は、混合座標でも自然座標でも表示できます。ただし、この二つの座標の対応は**直線を直線に移すとは限りません**。

実例として、$p(u)=(u,1/3,2/3-u)$（$0<u<2/3$）は混合座標では直線ですが、自然座標では

$$
a(u)=\log\frac{u}{2/3-u},
\qquad
b(u)=\log\frac{1/3}{2/3-u}
$$

となります。$u=1/6,1/3,1/2$ での自然座標は順に

$$
\left(-\log3,\log\frac23\right),\quad
(0,0),\quad
(\log3,\log2).
$$

第2点は第1点と第3点の中点ではありません（第2成分の中点は $\frac12\log(4/3)\ne0$）。第一成分は等間隔なので、この三点は一直線上にもありません。したがって混合座標で直線であることは、自然座標で直線であることを意味しません。

さらに、三値の全指数型分布族の自然母数を $a=s$、$b=s^2$（$s\in\mathbb R$）に制限した族

$$
p_s=\frac{(e^s,e^{s^2},1)}{1+e^s+e^{s^2}}
$$

を考えましょう。これは二次元指数型分布族の中の滑らかな一次元部分族です。しかし自然座標での像は放物線 $(s,s^2)$ で、例えば $s=-1,0,1$ の三点は一直線上にありません。これは**指数型分布族の部分族なら自然座標で自動的にアファインになる**という誤解への反例です。一般の曲がった指数型部分族の幾何は後の章で扱います。今は、全指数型・その非線形制限・混合型という三つの構成を区別できれば十分です。

---

## 6. 演習：表示の仕組みを実際に判定する

### IG4-A01 Bernoulli の自然座標と計量

$X\in\{0,1\}$、$p_a(x)=\exp\{ax-\psi(a)\}$、$a\in\mathbb R$ とする。正規化から $\psi$ を求め、成功確率 $p$、$E_a[X]$、$\operatorname{Var}_a(X)$、自然座標での Fisher 情報量を計算せよ。

- Level: A
- 狙い: 正規化・微分公式・スコアの対応を一度に検算する

<!-- solution-start -->
**詳細解答**

$x=0,1$ の確率和を1にするには $e^{-\psi}(1+e^a)=1$ が必要なので $\psi(a)=\log(1+e^a)$。従って $p=p_a(1)=e^a/(1+e^a)$、$p_a(0)=1-p$ です。$X^2=X$ より $E[X]=p$、$\operatorname{Var}(X)=E[X^2]-E[X]^2=p-p^2=p(1-p)$ です。

対数密度を $a$ で微分すると $S_a(X)=X-\psi'(a)=X-p$ です。よって [Fisher 行列の定義](../IG2/index.md#def-ig2-fisher-information)に代入して

$$
g_{aa}=E[(X-p)^2]=p(1-p)
=\frac{e^a}{(1+e^a)^2}=\psi''(a).
$$

各 $a$ で $0<p<1$ なので $g_{aa}>0$ です。
<!-- solution-end -->

### IG4-A02 Poisson の対数分配関数

$x\in\mathbb Z_{\ge0}$、$h(x)=1/x!$、$F(x)=x$、自然母数 $a\in\mathbb R$ の指数型分布族を考える。$Z(a)$、$\psi(a)$、確率質量、平均、分散、Fisher 情報量 $g_{aa}$ を求めよ。

- Level: A
- 狙い: 可算固定台での正規化と Hessian を確認する

<!-- solution-start -->
**詳細解答**

指数関数の冪級数から

$$
Z(a)=\sum_{x=0}^\infty\frac{(e^a)^x}{x!}=e^{e^a},
\qquad\psi(a)=\log Z(a)=e^a.
$$

$\lambda=e^a>0$ と置けば $p_a(x)=e^{-\lambda}\lambda^x/x!$ で、全 $x\ge0$ で正です。任意の $a$ とその近傍で $Z$ は有限なので [対数分配関数の微分公式](../../../応用系/ML/ML2-03/index.md#thm-ml2-03-log-partition-moments)を適用でき、$E[X]=\psi'(a)=e^a=\lambda$、$\operatorname{Var}(X)=\psi''(a)=e^a=\lambda$。スコアは $X-\lambda$ なので

$$
g_{aa}=E[(X-\lambda)^2]=\lambda=\psi''(a)>0.
$$
<!-- solution-end -->

### IG4-A03 三値分布の混合座標と接方向

$p=(1/5,3/10,1/2)$ とする。三値単体の混合座標を求め、座標方向 $(a,b)$ に対応する確率の速度を記せ。速度の成分和が零であることを確かめよ。

- Level: A
- 狙い: 正規化制約を消去した座標から接空間へ戻る

<!-- solution-start -->
**詳細解答**

$1/5+3/10+1/2=1$ かつ各成分が正です。[混合座標の定義](#def-ig4-mixture-coordinate)から $u^1=p_1=1/5$、$u^2=p_2=3/10$。復元式は $p_3=1-u^1-u^2=1/2$ です。曲線 $u(t)=u+t(a,b)$ を微分すれば

$$
\frac{d}{dt}p(u(t))\bigg|_{t=0}=(a,b,-a-b),
\quad a+b+(-a-b)=0.
$$

十分小さい $|t|$ なら正の各成分が保たれるため、この速度は実際の単体内曲線から得られます。[単体の接空間の定理](../IG1/index.md#thm-ig1-simplex-tangent)の条件と一致します。
<!-- solution-end -->

### IG4-A04 十分統計量の因子分解

$X_1,\ldots,X_n$（$n\ge1$）を成功確率 $p\in(0,1)$ の独立同分布 Bernoulli 標本とする。自然母数 $a=\log\{p/(1-p)\}$ で同時確率を表し、$T=\sum_rX_r$ が十分統計量であることを示せ。

- Level: A
- 狙い: 自然母数の指数和と標本情報の圧縮を結ぶ

<!-- solution-start -->
**詳細解答**

個々の確率質量は $p_a(x_r)=\exp\{ax_r-\log(1+e^a)\}$ なので、独立性により

$$
P_a(X_1=x_1,\ldots,X_n=x_n)
=\prod_{r=1}^n p_a(x_r)
=\exp\{aT(x_1,\ldots,x_n)-n\log(1+e^a)\}.
$$

従って $g_a(t)=\exp\{at-n\log(1+e^a)\}$、$h(x_1,\ldots,x_n)=1$ として同時確率は $g_a(T(x))h(x)$ に分解されます。台 $\{0,1\}^n$ は母数に依存しないので [ネイマンの分解定理](../../../../03_inference/S1_02_統計量_十分性_分解定理/index.md#thm-s1-02-01)が適用でき、$T$ は十分統計量です。
<!-- solution-end -->

### IG4-B01 正規位置尺度族の Hessian

$X\sim N(\mu,\sigma^2)$、$\sigma^2>0$ とする。$F=(X,X^2)$、$\theta^1=\mu/\sigma^2$、$\theta^2=-1/(2\sigma^2)$、$h=(2\pi)^{-1/2}$ に対し、$\psi$、$\nabla\psi$、$\nabla^2\psi$ を求めよ。特に $(\mu,\sigma^2)=(1,2)$ で行列が正定値であることを検算せよ。

- Level: B
- 狙い: 二変数の平方完成・微分・共分散を結ぶ

<!-- solution-start -->
**詳細解答**

$\theta^2<0$ なので $\theta^2x^2+\theta^1x=\theta^2(x+\theta^1/(2\theta^2))^2-(\theta^1)^2/(4\theta^2)$ と平方完成でき、正規積分によって

$$
\psi(\theta)=-\frac12\log(-2\theta^2)-\frac{(\theta^1)^2}{4\theta^2}.
$$

一階微分は

$$
\nabla\psi=\begin{pmatrix}
-\theta^1/(2\theta^2)\\
-1/(2\theta^2)+(\theta^1)^2/(4(\theta^2)^2)
\end{pmatrix}
=\begin{pmatrix}\mu\\\sigma^2+\mu^2\end{pmatrix}.
$$

二階微分の $(1,1)$ 成分は $-1/(2\theta^2)=\sigma^2$、$(1,2)$ 成分は $\theta^1/(2(\theta^2)^2)=2\mu\sigma^2$ です。$(2,2)$ 成分は $1/(2(\theta^2)^2)-(\theta^1)^2/(2(\theta^2)^3)=2\sigma^4+4\mu^2\sigma^2$。従って

$$
\nabla^2\psi=
\begin{pmatrix}\sigma^2&2\mu\sigma^2\\
2\mu\sigma^2&2\sigma^4+4\mu^2\sigma^2\end{pmatrix}.
$$

$(\mu,\sigma^2)=(1,2)$ では $\nabla^2\psi=\begin{pmatrix}2&4\\4&16\end{pmatrix}$ です。左上の主小行列式は $2>0$、全行列式は $32-16=16>0$ であり、方向 $v=(v^1,v^2)$ に対しても

$$
v^{\mathsf T}(\nabla^2\psi)v=2(v^1+2v^2)^2+8(v^2)^2>0\qquad(v\ne0)
$$

と直接確認できます。また一般の行列式は $2\sigma^6>0$ となり、[Fisher--Hessian 恒等式](#thm-ig4-fisher-hessian)と一致します。
<!-- solution-end -->

### IG4-B02 混合直線は自然座標でも直線か

$0<u<2/3$ の三値分布 $p(u)=(u,1/3,2/3-u)$ を考える。混合型分布族であることを確認し、Fisher 情報量 $g_{uu}$ を求めよ。また自然座標 $(a,b)=(\log(p_1/p_3),\log(p_2/p_3))$ で $u=1/6,1/3,1/2$ の三点が一直線上にないことを示せ。

- Level: B
- 狙い: 直線性と計量の座標依存を切り分ける

<!-- solution-start -->
**詳細解答**

$p^0=(1/3,1/3,1/3)$、$B=(1,0,-1)^{\mathsf T}$、$t=u-1/3$ と置くと $p(u)=p^0+Bt$。$B$ は列和零で階数1、$u\in(0,2/3)$ では全確率が正です。[混合型分布族の定義](#def-ig4-mixture-family)を満たします。[混合型の Fisher 計量公式](#thm-ig4-mixture-affine)に $B$ と $p$ を代入すると

$$
g_{uu}=\frac{1^2}{u}+\frac{0^2}{1/3}+\frac{(-1)^2}{2/3-u}
=\frac1u+\frac1{2/3-u}>0.
$$

自然座標は本文と同じく $a=\log\{u/(2/3-u)\}$、$b=\log\{(1/3)/(2/3-u)\}$。三点は $\bigl(-\log3,\log(2/3)\bigr)$、$(0,0)$、$(\log3,\log2)$ です。第一成分の中央は0ですが、第二成分の端点の平均は $\frac12\log(4/3)\ne0$。従って三点は同一直線上にありません。混合直線が自然座標で曲がる例です。
<!-- solution-end -->

### IG4-B03 冗長な統計量の零方向

$X\in\{0,1\}$、$h=1$、$F(x)=(x,2x)$、$\theta=(a,b)\in\mathbb R^2$ とする。$\psi$ と Fisher 行列を求め、その核の非零ベクトルを一つ示せ。また異なる二つの母数で同じ分布になる例を挙げよ。

- Level: B
- 狙い: 正則な固定台でも自然母数表示が退化することを確認する

<!-- solution-start -->
**詳細解答**

$\theta\cdot F(x)=(a+2b)x$ なので $Z=1+e^{a+2b}$、$\psi=\log(1+e^{a+2b})$ です。$q=e^{a+2b}/(1+e^{a+2b})$ と置くと $\nabla\psi=q(1,2)^{\mathsf T}$、$\nabla q=q(1-q)(1,2)^{\mathsf T}$。従って

$$
G=\nabla^2\psi=q(1-q)\begin{pmatrix}1&2\\2&4\end{pmatrix}.
$$

$v=(2,-1)^{\mathsf T}$ を掛けると $Gv=q(1-q)(0,0)^{\mathsf T}$ なので核は非自明です。例えば $(a,b)=(0,0)$ と $(2,-1)$ はどちらも $a+2b=0$ で、$P(X=1)=1/2$ という同じ分布を表します。[最小性命題](#prop-ig4-minimality)の仮定が壊れるのは、$v\cdot F(x)=2x-2x=0$ が台上の定数になるためです。
<!-- solution-end -->

### IG4-B04 二つの三値分布を混ぜる

$q^0=(1/2,1/3,1/6)$、$q^1=(1/6,1/3,1/2)$ とし、$p_\lambda=(1-\lambda)q^0+\lambda q^1$（$0<\lambda<1$）とする。$p_\lambda$ の三成分、混合係数に関する Fisher 情報量、$\lambda=1/2$ での値を求めよ。混合座標の直線性と Fisher 計量が一定であることを混同しない理由も述べよ。

- Level: B
- 狙い: 混合係数・確率・計量を具体的に比較する

<!-- solution-start -->
**詳細解答**

$B=q^1-q^0=(-1/3,0,1/3)^{\mathsf T}$ は列和零で非零、従って階数1です。

$$
p_\lambda=\left(\frac12-\frac{\lambda}3,\frac13,\frac16+\frac{\lambda}3\right).
$$

$0<\lambda<1$ なら各成分は正で和が1です。[混合型の計量公式](#thm-ig4-mixture-affine)に $\partial_\lambda p=B$ を代入すると

$$
g_{\lambda\lambda}=\frac{1/9}{1/2-\lambda/3}
+\frac{1/9}{1/6+\lambda/3}.
$$

$\lambda=1/2$ では $p=(1/3,1/3,1/3)$ だから $g_{\lambda\lambda}=(1/9)/(1/3)+(1/9)/(1/3)=2/3$。一方、指定領域内の $\lambda=1/4$ では $p=(5/12,1/3,1/4)$ なので

$$
g_{\lambda\lambda}=\frac4{15}+\frac49=\frac{32}{45}\ne\frac23
$$

となります。係数 $\lambda$ から確率 $p$ への写像が一次式であることと、Fisher 計量の分母が $\lambda$ に依存することは矛盾しません。なお $0<\lambda<1$ は二分布の凸混合を表す範囲であり、正の確率を保つアファイン表示の最大開区間は $-1/2<\lambda<3/2$ です。
<!-- solution-end -->

### IG4-C01 三値の全指数型と曲がった制限

$S=\{1,2,3\}$、数え上げ測度とし、$F_1(x)=\mathbf1_{\{x=1\}}$、$F_2(x)=\mathbf1_{\{x=2\}}$、$h(x)=1$ の指数型分布族 $p_{a,b}$（$(a,b)\in\mathbb R^2$）を考える。

1. $\psi(a,b)$、$E[F]$、Fisher 行列 $G(a,b)$ を導き、行列式を $p_1p_2p_3$ と表せ。
2. 自然母数を $(a,b)=(s,s^2)$（$s\in\mathbb R$）へ制限した部分族 $q_s$ について、$s=0$ における Fisher 情報量を自然母数からの引き戻しと確率の直接微分の二方法で求めよ。
3. $q_s$ が全二次元指数型分布族の中の滑らかな部分族でありながら、自然母数空間で一次元アファイン直線を描かないことを具体的な三点で確かめよ。

- Level: C
- 狙い: Hessian・座標の引き戻し・曲がった部分族を接続する

<!-- solution-start -->
**詳細解答**

1. $Z=1+e^a+e^b$ と置けば $\psi=\log Z$、$p_1=e^a/Z$、$p_2=e^b/Z$、$p_3=1/Z$ です。$\partial_a\psi=p_1$、$\partial_b\psi=p_2$。商の微分を展開すると

   $$
   \begin{aligned}
   \partial_a p_1&=p_1(1-p_1),&
   \partial_b p_1&=-p_1p_2,\\
   \partial_a p_2&=-p_1p_2,&
   \partial_b p_2&=p_2(1-p_2).
   \end{aligned}
   $$

   従って [Fisher--Hessian 恒等式](#thm-ig4-fisher-hessian)から

   $$
   G(a,b)=\begin{pmatrix}
   p_1(1-p_1)&-p_1p_2\\
   -p_1p_2&p_2(1-p_2)
   \end{pmatrix}.
   $$

   行列式を展開して

   $$
   \det G=p_1p_2\{(1-p_1)(1-p_2)-p_1p_2\}
   =p_1p_2(1-p_1-p_2)=p_1p_2p_3>0.
   $$

   全成分が正なので Hessian は正定値であり、$F_1,F_2$ に非自明な定数関係はありません。

2. $s=0$ では $(a,b)=(0,0)$、$p=(1/3,1/3,1/3)$ で、$G_{11}(0,0)=2/9$。パラメータ写像 $\theta(s)=(s,s^2)$ の速度は $\theta'(s)=d\theta(s)/ds=(1,2s)$ です。ここでプライムは $s$ に関する常微分です。これは二次元座標間の局所微分同相ではなく、一次元部分族への制限です。したがって座標変換定理をそのまま適用せず、対数密度の連鎖律から

   $$
   \frac{d}{ds}\log p_{\theta(s)}(x)
   =\frac{d\theta^1(s)}{ds}\,\partial_1\log p_{\theta(s)}(x)
   +\frac{d\theta^2(s)}{ds}\,\partial_2\log p_{\theta(s)}(x)
   $$

   を得ます。[Fisher 情報行列](../IG2/index.md#def-ig2-fisher-information)の定義により、この方向スコアの二乗期待値を取ると

   $$
   g_{ss}(s)
   =\sum_{i,j=1}^2\frac{d\theta^i(s)}{ds}\frac{d\theta^j(s)}{ds}g_{ij}(\theta(s))
   =\theta'(s)^{\mathsf T}G(\theta(s))\theta'(s).
   $$

   $s=0$ では

   $$
   g_{ss}(0)=\theta'(0)^{\mathsf T}G(0,0)\theta'(0)
   =(1,0)G(0,0)(1,0)^{\mathsf T}=\frac29.
   $$

   直接にも $q_s=(e^s,e^{s^2},1)/(1+e^s+e^{s^2})$ と微分できます。分母を $\widetilde Z(s)=1+e^s+e^{s^2}$ と名付けると、$\widetilde Z(0)=3$、$\widetilde Z'(0)=1$ です。ここで $q_i'(0),\widetilde Z'(0)$ のプライムは $s$ に関する微分なので、商の微分から

   $$
   q_1'(0)=\frac{1\cdot3-1\cdot1}{9}=\frac29,\quad
   q_2'(0)=\frac{0\cdot3-1\cdot1}{9}=-\frac19,\quad
   q_3'(0)=-\frac19.
   $$

   [単体の Fisher 計量の引き戻し](../IG2/index.md#thm-ig2-simplex-pullback)へ代入すると

   $$
   g_{ss}(0)=\sum_{i=1}^3\frac{q_i'(0)^2}{q_i(0)}
   =3\left(\frac4{81}+\frac1{81}+\frac1{81}\right)=\frac29.
   $$

   二つの計算は一致します。

3. $\theta(-1)=(-1,1)$、$\theta(0)=(0,0)$、$\theta(1)=(1,1)$ です。両端を結ぶ直線上では第2成分が常に1なので $(0,0)$ を含みません。従って自然母数空間の像はアファイン直線ではありません。一方 $\theta'(s)=(1,2s)\ne0$ なので局所的な滑らかな一次元部分族を与えます。**全指数型分布族の自然座標を非線形に制限すること**と、混合型の定義 $p=p^0+Bt$ とは別の操作です。
<!-- solution-end -->

---

## 7. 何が分かったか

- 正則指数型分布族では $\partial_i\psi=E[F_i]$、$\partial_{ij}\psi=\operatorname{Cov}(F_i,F_j)=g_{ij}$ です。積分交換には自然母数の開いた近傍での可積分支配が働いています。
- Fisher 行列が正定値になるのは、統計量の非零線形結合が台上で定数にならないときです。冗長な係数があれば自然母数は真正の座標になりません。
- 有限正単体の混合型分布族は確率を $p^0+Bt$ と表します。混合座標での線分と自然座標での線分は一般には一致しません。非線形な指数型部分族まで直線とみなすこともできません。

次の IG5 では、自然母数と期待値を結び付ける $\eta=\nabla\psi(\theta)$ を調べます。厳密凸性によって座標間を行き来し、二種類の座標がどう関係するかを明らかにします。
