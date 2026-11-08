# OTR22 勾配流を変分最小化で離散化できるか

[OTR21の滑らかな自由エネルギーの下降方程式](../OTR21/index.md#thm-otr21-gradient-pde)は、第一変分から速度を求め、それを連続の方程式へ代入する方法でした。ただし、初期密度が滑らかでなければ $\nabla\log\rho$ は定義できず、そもそも時間発展の解が存在するかも分かりません。

実数の最急降下を数値的に進めるときは、現在位置から一度に遠くへ動かないように罰則を付けて、次の位置を**最小化問題**として決められます。確率測度でも、[二次Wasserstein距離](../OTR8/index.md#def-otr8-wasserstein)で動いた距離を測れば、微分方程式を書かずに時間を一歩進めることができます。この発想が Jordan–Kinderlehrer–Otto（JKO）の時間離散化です。

本講では空間を $\mathbb R^d$（$d\ge1$）とし、$\mathcal P_2=\mathcal P_2(\mathbb R^d)$ を有限二次モーメントを持つ確率測度の集合とします。$W_2$ はその上の距離であり、狭義収束は有界連続な試験関数の積分が収束することを意味します。最初は**一歩が定義できる理由とエネルギー評価**に集中し、最適性条件からPDEを導く作業は次講で扱います。

## 1. 連続的な下降を「一歩の最小化」に替える

実数の例として $E(x)=\lambda x^2/2$（$\lambda>0$）を考え、現在値が $b$、時間刻みが $\tau>0$ だとします。次の値 $x$ を

$$
\frac{\lambda}{2}x^2+\frac{(x-b)^2}{2\tau}
$$

が最小になるように選びます。第一項はエネルギー、第二項は一歩の移動への罰則です。微分すると

$$
\lambda x+\frac{x-b}{\tau}=0,\qquad
x=\frac{b}{1+\lambda\tau}.
$$

こうすれば $\tau$ を小さくすると $x$ は $b$ に近く、しかも $|x|<|b|$（$b\ne0$）です。確率測度では位置の差 $|x-b|$ を $W_2$ に置き換えます。

ここで使う汎関数 $\mathcal F$ の**有効定義域**は $\operatorname{Dom}(\mathcal F)=\{\mu\in\mathcal P_2:\mathcal F(\mu)<+\infty\}$ です。値域を $\mathbb R\cup\{+\infty\}$ とし、$-\infty$ は取らないものとします。$+\infty$ は許さない分布や無限エネルギーの分布を除外する値です。与えられた関数の値を最小にする点の集合を $\operatorname{argmin}$ と書きます。

<a id="def-otr22-jko-step"></a>

<!-- formal-statement-start -->
> **定義（JKOの一歩と反復）**
> $d\ge1$、$\tau>0$ とし、$\mathcal F:\mathcal P_2(\mathbb R^d)\to\mathbb R\cup\{+\infty\}$ の有効定義域が空でないとする。$\mu^0\in\operatorname{Dom}(\mathcal F)$ から始め、$k=0,1,\ldots$ に対して

$$
\mu^{k+1}\in\underset{\mu\in\mathcal P_2}{\operatorname{argmin}}
\left\{\mathcal F(\mu)+\frac{1}{2\tau}W_2^2(\mu,\mu^k)\right\}
$$

> を満たす測度を一つ選ぶ手順を **JKO反復**（minimizing movement）という。括弧内を $J_{\tau,\mu^k}(\mu)$ と記す。$\operatorname{argmin}$ は最小値を実現する測度の集合であり、集合が空の場合は次の一歩を定義できない。
<!-- formal-statement-end -->

<!-- definition-example-start: def-otr22-jko-step -->
**定義の確認**（原子測度の一歩）。$\mathcal F(\mu)=\frac{\lambda}{2}\int x^2\,d\mu(x)$（$d=1,\lambda>0$）、$\mu^0=\delta_b$ とします。$\delta_b$ は二次モーメント $b^2<\infty$ を持ち、$\mathcal F(\delta_b)=\lambda b^2/2$ なので出発点は有効定義域内です。[結合の定義](../OTR2/index.md#def-otr2-coupling)により $\mu$ と $\delta_b$ の結合は $\mu(dx)\delta_b(dy)$ だけで、

$$
W_2^2(\mu,\delta_b)=\int(x-b)^2\,d\mu(x).
$$

そこで目的関数は

$$
J_{\tau,\delta_b}(\mu)=
\int\left\{\frac{\lambda}{2}x^2+\frac{(x-b)^2}{2\tau}\right\}d\mu(x).
$$

平方完成で括弧内は

$$
\frac{1+\lambda\tau}{2\tau}
\left(x-\frac{b}{1+\lambda\tau}\right)^2
+\frac{\lambda b^2}{2(1+\lambda\tau)}.
$$

確率測度の積分なので、非負の平方項がゼロになる $\delta_{b/(1+\lambda\tau)}$ だけが最小化します。$\tau>0$、質量 $1$、有限二次モーメント、最小値の実現をすべて確かめられました。一般の測度から出発した場合も第4節で解きます。
<!-- definition-example-end -->

$W_2^2/(2\tau)$ の係数に注目してください。$\tau$ が小さいほど遠くへ動く費用が大きくなります。この係数の $2$ を落とすと、形式的な下降速度と時間刻みが一致しません。

## 2. 最小値は本当に実現するか

最小化式を書いただけでは $\operatorname{argmin}$ が空でないとは限りません。実数上の $f(x)=e^x$ は下限 $0$ を持っても最小値を取りません。測度の空間でも、候補列が逃げないことと、極限で目的関数が跳び上がらないことの両方が必要です。

証明に使う用語を先に揃えます。[狭義収束](../OTR3/index.md#def-otr3-narrow) $\mu_n\rightharpoonup\mu$ は $\int f\,d\mu_n\to\int f\,d\mu$（$f$ は有界連続）であり、[一様緊密性](../OTR3/index.md#def-otr3-tight)は質量の大部分を一つのコンパクト集合へ閉じ込められることです。ここで $\mathcal F$ が**狭義下半連続**とは、このような列について

$$
\mathcal F(\mu)\le\liminf_{n\to\infty}\mathcal F(\mu_n)
$$

が成り立つことです。この定義は[下半連続性の考え方](../OTR3/index.md#def-otr3-lsc)を汎関数へ適用したものです。$W_2$ 収束より**弱い**狭義収束で下半連続と要求する点が肝心です。

<a id="lem-otr22-w2-lsc"></a>

<!-- formal-statement-start -->
> **補題（二次Wasserstein費用の狭義下半連続性）**
> $d\ge1$ とし、$\mu_n,\nu_n,\mu,\nu\in\mathcal P_2(\mathbb R^d)$ とする。$\mu_n\rightharpoonup\mu$、$\nu_n\rightharpoonup\nu$ が狭義収束なら

$$
W_2^2(\mu,\nu)\le\liminf_{n\to\infty}W_2^2(\mu_n,\nu_n).
$$
<!-- formal-statement-end -->

### 証明の見取り図

各組の[最適結合の存在](../OTR3/index.md#thm-otr3-polish)を使い、費用が有界な部分列の結合を極限へ運びます。極限でも周辺分布が保たれることは[結合の閉性](../OTR3/index.md#prop-otr3-closed)から従い、費用は[非負下半連続積分の評価](../OTR3/index.md#lem-otr3-lsc-integral)で下から評価できます。

<!-- proof-start -->
### 証明

$L=\liminf_n W_2^2(\mu_n,\nu_n)$ と置きます。$L=+\infty$ なら自明なので $L<\infty$ とします。$W_2^2(\mu_{n_j},\nu_{n_j})\to L$ となる部分列を取ります。各 $j$ について[Polish空間上の最適結合の存在定理](../OTR3/index.md#thm-otr3-polish)を非負連続費用 $c(x,y)=|x-y|^2$ に適用し、最適結合 $\pi_j$ を取ります。

狭義収束列 $\mu_{n_j}$、$\nu_{n_j}$ はそれぞれ一様緊密です。任意の $\varepsilon>0$ に対してコンパクト集合 $K_1,K_2$ を選び、両周辺分布がそれぞれ補集合に与える質量を $\varepsilon/2$ 未満にできます。結合の周辺条件から

$$
\pi_j((K_1\times K_2)^c)
\le\mu_{n_j}(K_1^c)+\nu_{n_j}(K_2^c)<\varepsilon.
$$

従って $\pi_j$ も一様緊密です。[Prokhorovのコンパクト性定理](../OTR3/index.md#thm-otr3-prokhorov)でさらに部分列を取り $\pi_j\rightharpoonup\pi$ とします。[結合の狭義閉性](../OTR3/index.md#prop-otr3-closed)により $\pi\in\Pi(\mu,\nu)$ です。非負連続な $c$ を[下半連続費用のliminf不等式](../OTR3/index.md#lem-otr3-lsc-integral)へ代入すると

$$
W_2^2(\mu,\nu)
\le\int|x-y|^2\,d\pi
\le\liminf_j\int|x-y|^2\,d\pi_j=L.
$$

最初の不等式は $\pi$ が許容結合であること、二つ目は下半連続性によります。$\square$
<!-- proof-end -->

二次モーメントが**一様に有界**でも、必ずしも $W_2$ で収束するわけではありません。例えば

$$
\mu_n=(1-n^{-2})\delta_0+n^{-2}\delta_n
$$

は $\delta_0$ へ狭義収束しますが、$W_2^2(\mu_n,\delta_0)=1$ のままです。存在証明に必要なのは強い $W_2$ コンパクト性ではなく、上の**弱いコンパクト性＋下半連続性**です。

<a id="thm-otr22-existence"></a>

<!-- formal-statement-start -->
> **定理（JKOの一歩の存在）**
> $d\ge1$、$\tau>0$ とする。$\mathcal F:\mathcal P_2(\mathbb R^d)\to\mathbb R\cup\{+\infty\}$ が次の条件を満たすとする。
>
> 1. $\operatorname{Dom}(\mathcal F)\ne\varnothing$。
> 2. 定数 $m\in\mathbb R$ が存在し、すべての $\mu\in\mathcal P_2$ について $\mathcal F(\mu)\ge m$。
> 3. $\mathcal F$ は狭義収束に関して下半連続である。
>
> このとき任意の $\nu\in\operatorname{Dom}(\mathcal F)$ に対して

$$
\underset{\mu\in\mathcal P_2}{\operatorname{argmin}}
\left\{\mathcal F(\mu)+\frac{W_2^2(\mu,\nu)}{2\tau}\right\}
\ne\varnothing.
$$

> 特に有限エネルギーの初期測度 $\mu^0$ から全ての有限ステップ $k$ のJKO反復を逐次選べる。ただし最小化解の一意性は主張しない。
<!-- formal-statement-end -->

### 証明の見取り図

現在の分布 $\nu$ 自身が有限値の競争相手です。最小化列では $\mathcal F\ge m$ のため移動費用に上界が付きます。この距離の上界を二次モーメントの上界へ変換し、[一様緊密性](../OTR3/index.md#def-otr3-tight)を得ます。そして[Prokhorovのコンパクト性定理](../OTR3/index.md#thm-otr3-prokhorov)を使い、最後に $\mathcal F$ と[二次Wasserstein費用の狭義下半連続性](#lem-otr22-w2-lsc)を別々に適用します。

<!-- proof-start -->
### 証明

$I=\inf_{\mu\in\mathcal P_2}J_{\tau,\nu}(\mu)$ と置きます。$\nu\in\operatorname{Dom}(\mathcal F)$ により

$$
m\le I\le J_{\tau,\nu}(\nu)=\mathcal F(\nu)<\infty.
$$

従って $J_{\tau,\nu}(\mu_n)\to I$ となる最小化列 $\mu_n\in\operatorname{Dom}(\mathcal F)$ が取れます。有限個の先頭項を除けば $J_{\tau,\nu}(\mu_n)\le\mathcal F(\nu)+1$ です。$\mathcal F(\mu_n)\ge m$ を差し引いて

$$
W_2^2(\mu_n,\nu)
\le2\tau\bigl(\mathcal F(\nu)+1-m\bigr)=:C_0.
$$

各 $\mu_n,\nu$ の間で最適結合 $\pi_n$ を取り、$|x|^2\le2|x-y|^2+2|y|^2$ を積分します。$M_2(\nu):=\int|y|^2\,d\nu(y)$ と記すと

$$
\begin{aligned}
\int|x|^2\,d\mu_n(x)
&=\int|x|^2\,d\pi_n(x,y)\\
&\le2W_2^2(\mu_n,\nu)+2\int|y|^2\,d\nu(y)\\
&\le 2C_0+2M_2(\nu)=:C_1<\infty.
\end{aligned}
$$

$R>0$ に対し $\mu_n(\{|x|>R\})\le C_1/R^2$ なので、閉球（$\mathbb R^d$ ではコンパクト）による一様緊密性が得られます。[Prokhorovのコンパクト性定理](../OTR3/index.md#thm-otr3-prokhorov)で部分列 $\mu_{n_j}\rightharpoonup\mu_*$ を取ります。[下半連続費用のliminf不等式](../OTR3/index.md#lem-otr3-lsc-integral)を $|x|^2$ に適用して

$$
\int|x|^2\,d\mu_*\le\liminf_j\int|x|^2\,d\mu_{n_j}\le C_1,
$$

すなわち $\mu_*\in\mathcal P_2$ です。$\mathcal F$ の狭義下半連続性と[二次Wasserstein費用の狭義下半連続性](#lem-otr22-w2-lsc)から

$$
\begin{aligned}
J_{\tau,\nu}(\mu_*)
&=\mathcal F(\mu_*)+\frac{W_2^2(\mu_*,\nu)}{2\tau}\\
&\le\liminf_j\mathcal F(\mu_{n_j})
+\liminf_j\frac{W_2^2(\mu_{n_j},\nu)}{2\tau}\\
&\le\liminf_j J_{\tau,\nu}(\mu_{n_j})=I.
\end{aligned}
$$

一つ目の不等号は二項それぞれの下半連続性、二つ目は下に有界な二列の $\liminf$ の超加法性（$\liminf a_j+\liminf b_j\le\liminf(a_j+b_j)$）です。一方 $I$ は下限なので $I\le J_{\tau,\nu}(\mu_*)$。従って等号で $\mu_*$ は最小化解です。さらに $\mathcal F(\mu_*)\le J_{\tau,\nu}(\mu_*)=I<\infty$ なので次の一歩にも同じ定理を適用できます。$\square$
<!-- proof-end -->

**どの仮定が働いたか。** $m$ は輸送距離の上界、$\nu\in\mathcal P_2$ は二次モーメントの上界、$\mathbb R^d$ の閉球のコンパクト性は一様緊密性、狭義下半連続性は極限で最小値を失わないために使いました。$W_2$ の閉球そのものがコンパクトだとは仮定していません。

## 3. 一歩ごとに必ず減る量

最小化解の存在を確認したので、今度は目的関数の値を比較します。核心は、候補に**前の測度自身**を代入できることです。

<a id="prop-otr22-energy"></a>

<!-- formal-statement-start -->
> **命題（JKOの離散エネルギー不等式）**
> $\tau>0$、$\mathcal F:\mathcal P_2(\mathbb R^d)\to\mathbb R\cup\{+\infty\}$ とし、有限エネルギーの $\mu^0$ から各 $k$ で[一歩の最小化](#def-otr22-jko-step)が実現しているとする。このとき各 $k\ge0$ について

$$
\mathcal F(\mu^{k+1})
+\frac{W_2^2(\mu^{k+1},\mu^k)}{2\tau}
\le\mathcal F(\mu^k).
$$

> さらに $\mathcal F\ge m$ なら任意の整数 $N\ge1$ に対して

$$
\sum_{k=0}^{N-1}\frac{W_2^2(\mu^{k+1},\mu^k)}{\tau}
\le2\bigl(\mathcal F(\mu^0)-m\bigr).
$$
<!-- formal-statement-end -->

### 証明の見取り図

一歩の最小化において $\mu=\mu^k$ を候補に選びます。[距離公理](../OTR8/index.md#thm-otr8-metric)から $W_2(\mu^k,\mu^k)=0$ です。これを足し上げると隣り合うエネルギー差が相殺されます。

<!-- proof-start -->
### 証明

[JKOの一歩と反復](#def-otr22-jko-step)の定義により、許容候補 $\mu^k$ に対して

$$
\begin{aligned}
\mathcal F(\mu^{k+1})
+\frac{W_2^2(\mu^{k+1},\mu^k)}{2\tau}
&=J_{\tau,\mu^k}(\mu^{k+1})\\
&\le J_{\tau,\mu^k}(\mu^k)
=\mathcal F(\mu^k).
\end{aligned}
$$

$k=0,\ldots,N-1$ の不等式を和にすると

$$
\frac1{2\tau}\sum_{k=0}^{N-1}W_2^2(\mu^{k+1},\mu^k)
\le\sum_{k=0}^{N-1}\bigl(\mathcal F(\mu^k)-\mathcal F(\mu^{k+1})\bigr)
=\mathcal F(\mu^0)-\mathcal F(\mu^N).
$$

右端を $\mathcal F(\mu^0)-m$ で押さえ、両辺を2倍します。$\square$
<!-- proof-end -->

ここで得たのは**エネルギーの単調減少と離散的移動量の制御**です。[OTR21の滑らかな流れの散逸等式](../OTR21/index.md#thm-otr21-dissipation)とは異なり、解の微分可能性もPDEも使っていません。エネルギー不等式だけから連続時間でのPDEへの収束や一意性を結論してはならない、という点にも注意してください。

<a id="prop-otr22-distance-bound"></a>

<!-- formal-statement-start -->
> **命題（有限時間内の移動距離の評価）**
> 前命題の仮定で $\mathcal F\ge m$ とする。整数 $N\ge1$ と $\tau>0$ に対し

$$
W_2(\mu^N,\mu^0)
\le\sqrt{2N\tau\,\bigl(\mathcal F(\mu^0)-m\bigr)}.
$$
<!-- formal-statement-end -->

### 証明の見取り図

各ステップの距離を[三角不等式](../OTR8/index.md#thm-otr8-metric)で足し、有限和の[Cauchy–Schwarz不等式](../../../基礎科目/F0/F0-00E2/index.md#thm-f0-00e2-cauchy-schwarz)を使います。

<!-- proof-start -->
### 証明

$a_k=W_2(\mu^{k+1},\mu^k)\ge0$ と置きます。[三角不等式](../OTR8/index.md#thm-otr8-metric)と[Cauchy–Schwarz不等式](../../../基礎科目/F0/F0-00E2/index.md#thm-f0-00e2-cauchy-schwarz)より

$$
W_2(\mu^N,\mu^0)\le\sum_{k=0}^{N-1}a_k
\le\sqrt{N\sum_{k=0}^{N-1}a_k^2}.
$$

[離散エネルギー不等式](#prop-otr22-energy)の和から $\sum a_k^2\le2\tau(\mathcal F(\mu^0)-m)$ です。これを平方根内へ代入します。$\square$
<!-- proof-end -->

例えば総時間 $N\tau=T$ を固定して刻みを細かくしても、右辺は $\sqrt{2T(\mathcal F(\mu^0)-m)}$ で抑えられます。ただしこの評価は「一歩の大きさが必ず $\tau$ に比例する」とは主張していません。

## 4. 二次外場なら一歩を完全に解ける

抽象的な存在定理は最小化解の値までは教えてくれません。しかし[位置エネルギー](../OTR16/index.md#def-otr16-potential-energy)が二次式なら、結合上で平方完成できます。$\nu$ の形はGaussianに限りません。

<a id="prop-otr22-quadratic"></a>

<!-- formal-statement-start -->
> **命題（二次位置エネルギーのJKO一歩）**
> $d\ge1$、$\lambda>0$、$\tau>0$ とし、

$$
\mathcal F(\mu)=\frac{\lambda}{2}\int_{\mathbb R^d}|x|^2\,d\mu(x),
\qquad \nu\in\mathcal P_2(\mathbb R^d).
$$

> $S_\tau(y)=y/(1+\lambda\tau)$ と置く。このとき JKO 最小化解はただ一つで

$$
\mu_*=(S_\tau)_{\#}\nu.
$$

> さらに $M_2(\nu)=\int|y|^2\,d\nu(y)$ とすると

$$
\mathcal F(\mu_*)=\frac{\lambda M_2(\nu)}{2(1+\lambda\tau)^2},
\qquad
W_2^2(\mu_*,\nu)=
\frac{(\lambda\tau)^2}{(1+\lambda\tau)^2}M_2(\nu).
$$
<!-- formal-statement-end -->

### 証明の見取り図

任意の $\mu$ と $\nu$ の結合を一つ取ると、目的関数は結合上の積分として書けます。被積分関数を $x$ について平方完成すると、$x=S_\tau(y)$ 以外に質量を置く余地がなくなります。最後にこの写像が作る結合の費用が本当に $W_2$ の最小費用であることも確認します。

<!-- proof-start -->
### 証明

$c=1+\lambda\tau>1$ とし、任意の $\mu\in\mathcal P_2$ と最適結合 $\pi\in\Pi(\mu,\nu)$ を取ります。$\pi$ の第一周辺が $\mu$ なので

$$
\begin{aligned}
J_{\tau,\nu}(\mu)
&=\iint\left[\frac{\lambda}{2}|x|^2+\frac{|x-y|^2}{2\tau}\right]d\pi(x,y)\\
&=\frac{c}{2\tau}\iint\left|x-\frac y c\right|^2d\pi(x,y)
+\frac{\lambda}{2c}\int|y|^2\,d\nu(y)\\
&\ge\frac{\lambda M_2(\nu)}{2c}.
\end{aligned}
$$

平方完成の二行目は $c|x-y/c|^2=c|x|^2-2x\cdot y+|y|^2/c$ と展開して確認でき、余る $|y|^2$ の係数は $(1-1/c)/(2\tau)=\lambda/(2c)$ です。

$\pi_*=(S_\tau,\operatorname{id})_{\#}\nu$ で $\mu_*=S_{\tau\#}\nu$ とすれば平方項がゼロです。従って $\pi_*$ に沿う移動費用を使った目的関数の上界は下界と一致し、$\mu_*$ は最小化解です。別の最小化解があればその最適結合の平方項もゼロなので $x=S_\tau(y)$ がほとんど至る所で成立し、第一周辺は同じ $\mu_*$ です。

質量を押し出しで計算すると $\int|x|^2\,d\mu_*=M_2(\nu)/c^2$ です。また、上の等号成立から $\pi_*$ は二次費用でも最適でなければなりません（もしそれより安い結合があれば目的関数が下界未満になるため）。従って

$$
W_2^2(\mu_*,\nu)=\int|S_\tau(y)-y|^2\,d\nu(y)
=\left(\frac{\lambda\tau}{c}\right)^2M_2(\nu).
$$

これで二つの式が従います。$\square$
<!-- proof-end -->

**一歩を反復する**。$c=1+\lambda\tau$ は一定なので、上の[一意な最小化解](#prop-otr22-quadratic)を毎回選ぶと

$$
\mu^k=(c^{-k}\operatorname{id})_{\#}\mu^0,\qquad
M_2(\mu^k)=c^{-2k}M_2(\mu^0).
$$

$d=1$、$\mu^0=\frac12(\delta_{-2}+\delta_4)$、$\lambda=1,\tau=\frac12$ なら $c=3/2$ です。第一歩は $\frac12(\delta_{-4/3}+\delta_{8/3})$、元の二次モーメントは $(4+16)/2=10$、第一歩の二次モーメントは $10\cdot(2/3)^2=40/9$ です。エネルギーは $5$ から $20/9$ に減り、移動費用は $W_2^2=10/9$、従って

$$
\mathcal F(\mu^1)+\frac{W_2^2(\mu^1,\mu^0)}{2\tau}
=\frac{20}{9}+\frac{10}{9}=\frac{10}{3}<5.
$$

一歩の[エネルギー不等式](#prop-otr22-energy)を式と数値の両方で確認できました。

## 5. エントロピーを含む自由エネルギーでも使えるか

[OTR21の熱エントロピー](../OTR21/index.md#def-otr21-free-energy)は $\mathbb R^d$ 上で負に大きくなり得ます。例えば区間 $[-R,R]$ 上の一様密度は $\int\rho\log\rho=-\log(2R)$ です。したがって熱エントロピー単独を「下から有界な $\mathcal F$」として[存在定理](#thm-otr22-existence)へ直接入れることはできません。

一方、二次外場を加えると、[Gibbs密度と相対エントロピーの関係](../OTR21/index.md#prop-otr21-gibbs)がエネルギー下界を与えます。[INFO2の有限分布の相対エントロピー](../../../応用系/INFO/INFO2/index.md#def-info2-relative-entropy)は対数の底が2でしたが、以下では測度を扱い、自然対数を使います。$d=1$、$V(x)=x^2/2$ とすると、基準となる標準Gaussian確率測度 $\gamma$ の密度は

$$
g(x)=(2\pi)^{-1/2}e^{-x^2/2}.
$$

確率測度 $\mu$ と基準確率測度 $\gamma$ の**相対エントロピー** $D(\mu\Vert\gamma)$ を、$\mu$ が $\gamma$ に密度 $h$ を持つ場合（全てのBorel集合 $A$ に $\mu(A)=\int_Ah\,d\gamma$、この $h$ を $d\mu/d\gamma$ と書く）は $\int h\log h\,d\gamma$、そのような密度を持たない場合は $+\infty$ とする非負の量として使います。$0\log0=0$ と定めます。この定義で有限な密度について

$$
\mathcal F(\mu):=D(\mu\Vert\gamma)-\frac12\log(2\pi)
=\int\rho\log\rho\,dx+\frac12\int x^2\rho(x)\,dx.
$$

右辺が通常の自由エネルギーです。拡張された左辺は密度が存在しない測度でも $+\infty$ として意味を持ち、$\mathcal F\ge-\frac12\log(2\pi)$ です。残るのは狭義下半連続性です。

<a id="lem-otr22-relative-entropy-lsc"></a>

<!-- formal-statement-start -->
> **補題（相対エントロピーの狭義下半連続性）**
> $\gamma$ を $\mathbb R^d$ 上のBorel確率測度とする。確率測度 $\mu$ に対し、$\mu\ll\gamma$ なら $h=d\mu/d\gamma$ を用いて $D(\mu\Vert\gamma)=\int h\log h\,d\gamma$ とし、それ以外では $+\infty$ とする。このとき

$$
D(\mu\Vert\gamma)
=\sup_{\varphi\in C_b(\mathbb R^d)}
\left\{\int\varphi\,d\mu-\log\int e^\varphi\,d\gamma\right\}.
$$

> 特に $\mu_n\rightharpoonup\mu$ なら

$$
D(\mu\Vert\gamma)\le\liminf_nD(\mu_n\Vert\gamma).
$$
<!-- formal-statement-end -->

### 証明の見取り図

任意の有界な $\varphi$ に対する下界は、密度比について凸関数 $s\log s-s+1$ の非負性を使って得ます。逆向きは $\varphi$ を対数密度に近づけます。連続関数だけで十分であることには、有限測度の下で有界可測関数を連続関数で積分近似できる事実を使います。密度がない場合は、$\gamma$ がほとんど質量を持たない場所に $\mu$ の質量を検出する関数を置きます。

<!-- proof-start -->
### 証明

まず $\mu\ll\gamma$ で $h=d\mu/d\gamma$ とします。$D$ が有限の場合、$\gamma_\varphi=e^\varphi\gamma/Z_\varphi$（$Z_\varphi=\int e^\varphi d\gamma$）は確率測度です。凸関数 $s\log s-s+1\ge0$ を $d\mu/d\gamma_\varphi$ に適用する[相対エントロピーの非負性](../OTR21/index.md#prop-otr21-gibbs)と同じ計算で

$$
0\le D(\mu\Vert\gamma_\varphi)
=D(\mu\Vert\gamma)-\int\varphi\,d\mu+\log Z_\varphi.
$$

従って右辺の上限は $D(\mu\Vert\gamma)$ 以下です。$D=+\infty$ の場合も上限 $\le+\infty$ は成立します。

逆向きには $\psi_R=\max(-R,\min(R,\log h))$ と置きます（$h=0$ では $\log h=-\infty$）。$\psi_R$ は有界可測です。$h\log h$ の負の部分は $h|\log h|\boldsymbol{1}_{h<1}\le1/e$ なので積分可能であり、正の部分には単調収束を適用できます。従って $R\to\infty$ で

$$
\int\psi_R\,d\mu\longrightarrow D(\mu\Vert\gamma).
$$

また $e^{\psi_R}=\min(e^R,\max(e^{-R},h))\le h+1$ なので優収束により $\int e^{\psi_R}d\gamma\to\int h\,d\gamma=1$ です。

連続関数への近似を確認します。固定した $R$ で $\eta=\mu+\gamma$ と置きます。有限Borel測度 $\eta$ に関して有界可測な $\psi_R$ を有限個の値を取る単関数で $L^1(\eta)$ 近似します。

単関数に現れる各Borel集合 $A$ は測度の正則性により、任意の $\varepsilon>0$ に対してコンパクト $K\subset A$、開集合 $U\supset A$ を選び、

$$
\eta(U\setminus K)<\varepsilon
$$

とできます。$K$ で $1$、$U$ の外で $0$、途中では $[0,1]$ の値を取る連続関数 $f$ を作れば、

$$
\int|\boldsymbol{1}_A-f|\,d\eta\le\eta(U\setminus K)<\varepsilon.
$$

この連続近似の線形結合を値域 $[-R,R]$ へ切り詰めると、有界連続な $\varphi_R$ で $\int|\varphi_R-\psi_R|d\eta$ を任意に小さくできます。$e^t$ は $[-R,R]$ 上で $e^R$-Lipschitzなので、二つの積分

$$
\int\varphi_R\,d\mu,\qquad \int e^{\varphi_R}\,d\gamma
$$

もそれぞれ $\int\psi_R\,d\mu$ と $\int e^{\psi_R}d\gamma$ に近づきます。従って連続関数の上限は $\int\psi_R d\mu-\log\int e^{\psi_R}d\gamma$ 以上となり、$R\to\infty$ で $D$ に達します。

次に $\mu\not\ll\gamma$ なら、$\gamma(A)=0$、$\mu(A)>0$ となるBorel集合 $A$ があります。内側正則性からコンパクト $K\subset A$ を選んで $\mu(K)=a>0$ とできます。各 $M>0$ に対して外側正則性により $\gamma(U)<e^{-2M}$ となる開集合 $U\supset K$ を取り、$K$ 上で $M$、$U$ の外で $0$、その間で $[0,M]$ の値を取る連続関数 $\varphi_M$ を作ります。すると

$$
\int\varphi_M d\mu\ge Ma,\qquad
\int e^{\varphi_M}d\gamma
\le1+(e^M-1)\gamma(U)<1+e^{-M}.
$$

ゆえに上限は $M a-\log(1+e^{-M})\to\infty$ です。これで変分表示が全ての場合に成立します。

最後に固定した $\varphi\in C_b$ では $\mu_n\rightharpoonup\mu$ より $\int\varphi d\mu_n\to\int\varphi d\mu$ です。各 $n$ の $D(\mu_n\Vert\gamma)$ は中括弧内以上なので、liminf を取り、その後 $\varphi$ の上限を取ると下半連続性が得られます。$\square$
<!-- proof-end -->

これにより $\mathcal F(\mu)=D(\mu\Vert\gamma)-\frac12\log(2\pi)$ は $\mathcal P_2(\mathbb R)$ 上で下から有界、狭義下半連続で、$\mu=\gamma$ では有限です。従って[存在定理](#thm-otr22-existence)を適用でき、Gaussianに限らない有限エネルギーの初期密度についてもJKOの各一歩を選べます。**これは熱・Fokker–Planck方程式の解の存在を証明したわけではありません。**

## 6. 存在と一意性・正則性は違う

**非一意性の直接例。** $d=1$ で $\nu=\delta_0$、

$$
\mathcal F(\mu)=\int(x^2-1)^2\,d\mu(x)
$$

とします。被積分関数は非負連続なので $\mathcal F$ は下から有界かつ狭義下半連続で、$\delta_0$ は有限エネルギーです。しかし $W_2^2(\mu,\delta_0)=\int x^2d\mu$ だから、$J_{\tau,\delta_0}$ は

$$
\int\left[(x^2-1)^2+\frac{x^2}{2\tau}\right]d\mu(x)
$$

です。$\tau>1/4$ とし $a^2=1-1/(4\tau)>0$ と置くと、被積分関数は

$$
\left(x^2-a^2\right)^2+1-a^4
$$

と書けます。従って $\delta_a$、$\delta_{-a}$、両者の任意の混合など、支持が $\{-a,a\}$ に含まれるすべての確率測度が最小化解です。存在定理に一意性は含まれません。

**下半連続性を外すとどうなるか。** $\nu=\delta_0$、$\tau>0$ とし、$\mathcal F(\delta_0)=1$、その他の $\mu\in\mathcal P_2$ では $\mathcal F(\mu)=0$ とします。$\mathcal F\ge0$ で有効定義域は非空ですが、$\delta_{1/n}\rightharpoonup\delta_0$ に対して下半連続ではありません。実際

$$
J_{\tau,\delta_0}(\delta_{1/n})=\frac{1}{2\tau n^2}\to0
$$

であり、$\delta_0$ の値は $1$、他の測度の値は $W_2^2(\mu,\delta_0)/(2\tau)>0$ です。下限 $0$ を達成する測度はありません。下半連続性は単なる飾りではないのです。

## 7. 演習：定義・存在・エネルギー評価を使う

### OTR22-A01 時間刻みの係数
- Level: A

$\lambda>0,\tau>0,b\in\mathbb R$ とし $q(x)=\lambda x^2/2+(x-b)^2/(2\tau)$ とする。最小点と最小値を求め、$\tau\downarrow0$ で $(x_*-b)/\tau$ がどこへ収束するか調べよ。

<!-- solution-start -->
**詳細解答**。$q'(x)=\lambda x+(x-b)/\tau$、$q''(x)=\lambda+1/\tau>0$ なので唯一の最小点は

$$
x_*=\frac b{1+\lambda\tau}.
$$

平方完成で $q(x)=\frac{1+\lambda\tau}{2\tau}(x-x_*)^2+\frac{\lambda b^2}{2(1+\lambda\tau)}$ だから、最小値は後者です。差商は

$$
\frac{x_*-b}{\tau}
=\frac{b-b(1+\lambda\tau)}{\tau(1+\lambda\tau)}
=-\frac{\lambda b}{1+\lambda\tau}\longrightarrow-\lambda b.
$$

連続下降の速度 $-\lambda b$ と係数が一致します。
<!-- solution-end -->

### OTR22-A02 二次モーメントから一様緊密性
- Level: A

$\mu_n\in\mathcal P_2(\mathbb R^d)$ が $\int|x|^2d\mu_n\le C$ を満たすとする。任意の $\varepsilon>0$ に対して一様に質量 $1-\varepsilon$ 以上を含むコンパクト集合を示せ。

<!-- solution-start -->
**詳細解答**。$R>\sqrt{C/\varepsilon}$ と取れば、非負関数 $|x|^2$ の積分を使い

$$
R^2\mu_n(\{|x|>R\})
\le\int_{|x|>R}|x|^2d\mu_n\le C.
$$

従って $\mu_n(\overline B_R)\ge1-C/R^2>1-\varepsilon$ です。$\mathbb R^d$ の閉球は有界かつ閉なのでコンパクトであり、[一様緊密性の定義](../OTR3/index.md#def-otr3-tight)が確認できました。
<!-- solution-end -->

### OTR22-A03 競争相手の選び方
- Level: A

JKOの一歩 $\mu^{k+1}$ が存在し $\mathcal F(\mu^k)<\infty$ とする。何を競争相手に選べば $\mathcal F(\mu^{k+1})\le\mathcal F(\mu^k)$ が言えるか、距離項を残して示せ。

<!-- solution-start -->
**詳細解答**。前の状態 $\mu^k$ 自身を許容候補として[JKOの一歩と反復](#def-otr22-jko-step)の定義へ代入します。$W_2(\mu^k,\mu^k)=0$ なので

$$
\mathcal F(\mu^{k+1})+\frac{W_2^2(\mu^{k+1},\mu^k)}{2\tau}
\le\mathcal F(\mu^k)+0.
$$

距離の二乗は非負であり、これを左辺から落とせば単調減少が従います。移動を許す代償は、減ったエネルギーで賄われます。
<!-- solution-end -->

### OTR22-A04 狭義収束とW2収束を区別する
- Level: A

$n\ge2$ に対し $\mu_n=(1-n^{-2})\delta_0+n^{-2}\delta_n$ とする。$\mu_n\rightharpoonup\delta_0$ と $W_2(\mu_n,\delta_0)=1$ を確認し、存在証明で必要な収束の種類を述べよ。

<!-- solution-start -->
**詳細解答**。任意の有界連続 $f$ に対して

$$
\int f\,d\mu_n-f(0)
=n^{-2}\bigl(f(n)-f(0)\bigr)\to0
$$

です。右辺は $2\|f\|_\infty/n^2$ 以下なので狭義収束します。一方 $\delta_0$ との結合は一つだけで

$$
W_2^2(\mu_n,\delta_0)=
(1-n^{-2})\cdot0+n^{-2}\cdot n^2=1.
$$

JKOの存在証明には狭義収束の部分列と目的関数の狭義下半連続性を使い、$W_2$ 収束の部分列を仮定する必要はありません。
<!-- solution-end -->

### OTR22-A05 反復の質量と二次モーメント
- Level: A

$\lambda>0,\tau>0$、$\mu^0=\frac13\delta_{-3}+\frac23\delta_6$ とする。二次外場のJKO一歩 $\mu^1$ と $M_2(\mu^1)$ を求めよ。

<!-- solution-start -->
**詳細解答**。[二次外場の一歩](#prop-otr22-quadratic)で $c=1+\lambda\tau$ とすれば、原子の位置を $1/c$ 倍するので

$$
\mu^1=\frac13\delta_{-3/c}+\frac23\delta_{6/c}.
$$

質量は $1/3+2/3=1$ のまま、二次モーメントは

$$
M_2(\mu^1)
=\frac13\frac9{c^2}+\frac23\frac{36}{c^2}
=\frac{3+24}{c^2}=\frac{27}{c^2}<\infty.
$$

原子測度にも一歩が定義でき、密度や微分は必要ありません。
<!-- solution-end -->

### OTR22-B01 存在証明の主要連鎖
- Level: B

$\nu\in\mathcal P_2$、$\mathcal F(\nu)<\infty$、$\mathcal F\ge m$ で、$\mathcal F$ が狭義下半連続とする。$J_{\tau,\nu}(\mu_n)\le\mathcal F(\nu)+1$ から、狭義収束する部分列の存在と、極限が $\mathcal P_2$ に入ることを証明せよ。

<!-- solution-start -->
**詳細解答**。$\mathcal F(\mu_n)\ge m$ なので

$$
\frac{W_2^2(\mu_n,\nu)}{2\tau}
\le J_{\tau,\nu}(\mu_n)-m
\le\mathcal F(\nu)+1-m.
$$

最適結合 $\pi_n$ において $|x|^2\le2|x-y|^2+2|y|^2$ を積分します。$M_2(\nu)=\int|y|^2d\nu$ と置くと

$$
\int|x|^2d\mu_n
\le4\tau\bigl(\mathcal F(\nu)+1-m\bigr)+2M_2(\nu)=:C.
$$

半径 $R$ の閉球外の質量は $C/R^2$ 以下なので一様緊密です。[Prokhorovのコンパクト性定理](../OTR3/index.md#thm-otr3-prokhorov)により、ある部分列の狭義極限 $\mu_*$ が存在します。[下半連続費用のliminf不等式](../OTR3/index.md#lem-otr3-lsc-integral)を $|x|^2$ に適用すると

$$
M_2(\mu_*)\le\liminf_n M_2(\mu_n)\le C.
$$

従って $\mu_*\in\mathcal P_2$ です。まだ最小化の証明は終わっておらず、目的関数の下半連続性を続けて使います。
<!-- solution-end -->

### OTR22-B02 離散移動量から総移動距離へ
- Level: B

$\mathcal F\ge m$ とし、JKO反復が $N$ 回実行できるとする。[JKOの離散エネルギー不等式](#prop-otr22-energy)から

$$
\sum_{k=0}^{N-1}W_2(\mu^{k+1},\mu^k)
\le\sqrt{2N\tau(\mathcal F(\mu^0)-m)}
$$

を導き、$N\tau\le T$ なら何が刻みに依存せず有界になるか述べよ。

<!-- solution-start -->
**詳細解答**。[JKOの離散エネルギー不等式](#prop-otr22-energy)を和にすると、$a_k=W_2(\mu^{k+1},\mu^k)$ について $\sum a_k^2\le2\tau(\mathcal F(\mu^0)-m)$ です。有限和に[Cauchy–Schwarz不等式](../../../基礎科目/F0/F0-00E2/index.md#thm-f0-00e2-cauchy-schwarz)を適用し、

$$
\left(\sum_{k=0}^{N-1}a_k\right)^2
\le\left(\sum_{k=0}^{N-1}1^2\right)
\left(\sum_{k=0}^{N-1}a_k^2\right)
\le2N\tau(\mathcal F(\mu^0)-m).
$$

非負なので平方根を取れます。$N\tau\le T$ なら総移動距離は $\sqrt{2T(\mathcal F(\mu^0)-m)}$ 以下です。ただし各ステップを連続時間の解とみなせるかは別問題です。
<!-- solution-end -->

### OTR22-B03 反例で二つの仮定を点検する
- Level: B

$\nu=\delta_0$ とする。

1. $\mathcal F(\mu)=0$（$\mu\ne\delta_0$）、$\mathcal F(\delta_0)=1$ のJKO目的関数に最小化解がないことを示せ。
2. $\mathcal F(\mu)=\int(x^2-1)^2d\mu$ のとき、$\tau>1/4$ で最小化解が複数存在することを示せ。

<!-- solution-start -->
**詳細解答**。第1問では $\delta_{1/n}$ が許容で、$J_{\tau,\delta_0}(\delta_{1/n})=1/(2\tau n^2)\to0$ です。$\mu\ne\delta_0$ の目的値は $W_2^2(\mu,\delta_0)/(2\tau)>0$、$\mu=\delta_0$ の目的値は $1$ なので下限は達成されません。$\delta_{1/n}$ の狭義極限 $\delta_0$ で $\mathcal F$ が上へ跳ぶのが原因です。

第2問では $z=x^2$ と置くと被積分関数は

$$
z^2+\left(-2+\frac1{2\tau}\right)z+1
=\left(z-1+\frac1{4\tau}\right)^2+1-\left(1-\frac1{4\tau}\right)^2.
$$

$a=\sqrt{1-1/(4\tau)}>0$ なので $x=\pm a$ が点ごとの最小値を取り、$\delta_a,\delta_{-a}$ およびそれらの混合が最小化します。後者の例では存在定理の仮定が成立しても一意性はありません。
<!-- solution-end -->

### OTR22-B04 相対エントロピーを通じた存在
- Level: B

$\gamma$ を標準Gaussian確率測度とし、$\mathcal F(\mu)=D(\mu\Vert\gamma)-\frac12\log(2\pi)$ を $\mathcal P_2(\mathbb R)$ 上に定める。$\mu^0=\gamma$ からJKO反復の各一歩が存在する理由を、下界・下半連続性・有効定義域の三点で説明せよ。

<!-- solution-start -->
**詳細解答**。[相対エントロピーの非負性](../OTR21/index.md#prop-otr21-gibbs)と特異測度で $+\infty$ とする規約より

$$
D(\mu\Vert\gamma)\ge0,\qquad
\mathcal F(\mu)\ge-\frac12\log(2\pi).
$$

[変分表示の補題](#lem-otr22-relative-entropy-lsc)を狭義収束列 $\mu_n\rightharpoonup\mu$ に適用すると

$$
D(\mu\Vert\gamma)\le\liminf_n D(\mu_n\Vert\gamma).
$$

定数を引いても下半連続性は保たれます。$\gamma\in\mathcal P_2$ は二次モーメント $1$ を持ち、$D(\gamma\Vert\gamma)=0$ なので $\gamma\in\operatorname{Dom}(\mathcal F)$ です。この三点と $\tau>0$ を[存在定理](#thm-otr22-existence)に代入すると、第一歩が存在します。第一歩は有限エネルギーなので同じ論理を再適用して任意の有限回を構成できます。
<!-- solution-end -->

### OTR22-C01 一般の初期分布についてJKOを解き切る
- Level: C

$d\ge1$、$\lambda,\tau>0$、二次モーメント有限の任意の確率測度 $\mu^0$ に対して $\mathcal F(\mu)=\frac{\lambda}{2}M_2(\mu)$ のJKO反復を考える。

1. 任意のステップの最小化解が一意で、$\mu^k=((1+\lambda\tau)^{-k}\operatorname{id})_{\#}\mu^0$ であることを導け。
2. $M_2(\mu^0)=M>0$ とし、$N$ 歩までの離散散逸和 $\sum_{k=0}^{N-1}W_2^2(\mu^{k+1},\mu^k)/(2\tau)$ を等比級数として正確に計算せよ。
3. $\mathcal F(\mu^0)-\mathcal F(\mu^N)$ と比較し、両者が一般には等しくない理由を計算で示せ。

<!-- solution-start -->
**詳細解答**。$c=1+\lambda\tau>1$ と置きます。任意の結合について平方完成した[二次位置エネルギーの一歩](#prop-otr22-quadratic)は $\nu$ の形を仮定しないため、各 $k$ で $\mu^{k+1}=(c^{-1}\operatorname{id})_{\#}\mu^k$ が唯一の解です。押し出しの合成により $\mu^k=(c^{-k}\operatorname{id})_{\#}\mu^0$、$M_2(\mu^k)=Mc^{-2k}$ です。

同じ命題の距離公式を $\nu=\mu^k$ に適用すると

$$
W_2^2(\mu^{k+1},\mu^k)
=\frac{(\lambda\tau)^2}{c^2}Mc^{-2k}
=(\lambda\tau)^2Mc^{-2(k+1)}.
$$

従って求める和は

$$
\begin{aligned}
S_N
&=\frac{\lambda^2\tau M}{2}\sum_{j=1}^{N}c^{-2j}\\
&=\frac{\lambda^2\tau M}{2}\,
\frac{c^{-2}(1-c^{-2N})}{1-c^{-2}}\\
&=\frac{\lambda M}{2(2+\lambda\tau)}
\left(1-c^{-2N}\right).
\end{aligned}
$$

実際 $1-c^{-2}=(c^2-1)/c^2=(\lambda\tau)(2+\lambda\tau)/c^2$ なので係数を検算できます。エネルギー差は

$$
\mathcal F(\mu^0)-\mathcal F(\mu^N)
=\frac{\lambda M}{2}\bigl(1-c^{-2N}\bigr).
$$

$\lambda,\tau>0$ なので $S_N$ はこの差より小さく、比は $1/(2+\lambda\tau)$ です。一歩の最小化式で比較した相手は $\mu^k$ であり、最小化解でない一般の比較相手との不等式が必ず等号になるとは限りません。$N\to\infty$ でも離散エネルギー不等式は余裕を残します。
<!-- solution-end -->

次講では、ここで実現した**一歩の最小化解がどの弱い最適性条件を満たすか**を調べます。その式を時間刻みで割ったとき、なぜ[OTR21の形式的下降PDE](../OTR21/index.md#thm-otr21-gradient-pde)が現れるのかを確かめます。
