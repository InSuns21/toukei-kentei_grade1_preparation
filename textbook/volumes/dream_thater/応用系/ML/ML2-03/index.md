# ML2-03 指数型分布族と共役性

<!-- definition-example-audit: strict -->

[前講のGaussian事後分布](../ML2-02/index.md#thm-ml2-02-gaussian-posterior)では、尤度と事前密度の二次式を足し合わせ、平方完成するだけで更新できた。一方、Bernoulli観測では確率を直接掛け、正規分布では二次式を扱う。一見別の計算に見えるが、どちらも「観測が与える係数を指数の中で足す」という共通構造を持つ。さらに、この形の正規化に必要な関数を微分すると、平均と分散が現れる。

なぜ正規化の微分から平均・分散が出るのか。なぜ更新が足し算で済むのか。その二つを、**母数によって観測値の台が動かない**という重要な条件と一緒に解き明かす。

## 1. 共通の台を持つ分布を一つの式で表す

まず離散分布では確率を全点で足し、連続分布では密度を積分して、合計が1になるよう正規化する。両者を一緒に書くため、観測空間 $S$ 上の積分記号 $\int_S f(x)\,d\mu(x)$ を用いる。$S$ が有限または可算なら $\mu$ は数え上げ測度（積分は和）、$S\subset\mathbb R^k$ なら $\mu$ はLebesgue測度（通常の積分）とする。

ここで $h(x)\ge0$ は母数に依存しない重み、$T(x)\in\mathbb R^d$ は観測から作る統計量、$\eta\in\mathbb R^d$ はその係数である。係数 $\eta$ を**自然母数**と呼ぶ。この講での $T$ の役割は、指数の中で自然母数と内積になり、複数の観測を掛け合わせると和として現れることである。和や積分が有限になる領域と、正規化した確率の実際の台を区別する。

<a id="def-ml2-03-regular-family"></a>

<!-- formal-statement-start -->
> **定義（固定台の正則自然指数型分布族）**
> 測度空間 $(S,\mu)$、可測関数 $h:S\to[0,\infty)$、$T:S\to\mathbb R^d$（$d\ge1$）を母数に依存せず固定する。各成分は有限実数値とし、$h>0$ となる集合が正の $\mu$ 測度を持つとする。次の積分と領域を置く。

$$
Z(\eta)=\int_S h(x)e^{\eta^{\mathsf T}T(x)}\,d\mu(x),\qquad
\Omega=\{\eta\in\mathbb R^d:Z(\eta)<\infty\},\qquad
\Theta=\operatorname{int}\Omega.
$$

> $\Theta\ne\varnothing$ と仮定し、$\eta\in\Theta$ に対し $A(\eta)=\log Z(\eta)$ と置く。$A$ を**対数分配関数**と呼ぶ。分布族の確率質量関数または確率密度関数を

$$
p_\eta(x)=h(x)\exp\{\eta^{\mathsf T}T(x)-A(\eta)\},\qquad x\in S
$$

> で定める。共通の正の台は $S_h=\{x\in S:h(x)>0\}$（$\mu$ 零集合の差は無視）であり、$\eta$ に依存しない。開いた自然母数空間 $\Theta$ を持つこの族を、正則自然指数型分布族という。
<!-- formal-statement-end -->

<!-- definition-example-start: def-ml2-03-regular-family -->
**定義の確認**（Bernoulli模型）。$S=\{0,1\}$ を数え上げ測度で扱い、$h(0)=h(1)=1$、$T(x)=x$ と置く。二点とも $h(x)>0$ であり、任意の $\eta\in\mathbb R$ に対して

$$
Z(\eta)=e^{\eta\cdot0}+e^{\eta\cdot1}=1+e^\eta>0,
\qquad A(\eta)=\log(1+e^\eta)<\infty.
$$

ゆえに $\Theta=\mathbb R$ は開で、台 $\{0,1\}$ はすべての有限な自然母数で同一である。正規化後は

$$
p_\eta(1)=\frac{e^\eta}{1+e^\eta}=:p,\qquad
p_\eta(0)=\frac1{1+e^\eta}=1-p.
$$

二つの確率は正で和が1。$0<p<1$ と $\eta=\log\{p/(1-p)\}$ は一対一に対応する。一方、$p=0,1$ は有限な $\eta$ に対応せず、この正則族の**境界極限**である。
<!-- definition-example-end -->

同じ形に書けるからといって、観測値の台が母数で変わる分布へ自動的に微分公式を使えるわけではない。また $Z(\eta)$ は単に定数ではなく、$\eta$ の関数である。正規化式 $\int_S p_\eta\,d\mu=1$ が次の微分公式の出発点になる。

## 2. 対数分配関数を微分すると何が出るか

有限和なら微分と和を交換できる。しかし連続分布の積分では、$T(x)$ が大きい領域が微分後に効くことがある。そこで $\eta$ の周囲に少し動かしても $Z$ が有限であるという、$\Theta$ の開性を利用する。具体的には、近傍で一階・二階微分した被積分関数を**同じ可積分関数で抑える**。これは[Lebesgueの優収束定理](../../../解析系/F0/F0-00D2B/index.md#thm-f0-00d2b-01)の適用条件である。

<a id="thm-ml2-03-log-partition-moments"></a>

<!-- formal-statement-start -->
> **定理（対数分配関数の一階・二階微分公式）**
> [固定台の正則自然指数型分布族](#def-ml2-03-regular-family)で $\eta\in\Theta\subset\mathbb R^d$ とする。各 $\eta$ に対して $T(X)$ の二次モーメントは有限で、$A$ は $\Theta$ 上で二回連続微分可能である。成分 $i,j\in\{1,\ldots,d\}$ について

$$
\frac{\partial A}{\partial\eta_i}(\eta)=E_\eta[T_i(X)],
$$

$$
\frac{\partial^2 A}{\partial\eta_i\partial\eta_j}(\eta)
=\operatorname{Cov}_\eta(T_i(X),T_j(X)).
$$

> 特に $\nabla A(\eta)=E_\eta[T(X)]$、$\nabla^2A(\eta)=\operatorname{Cov}_\eta(T(X))$ である。
<!-- formal-statement-end -->

### 証明の見取り図

一階微分は $Z$ の中の $e^{\eta^{\mathsf T}T}$ から $T_i$ を一つ取り出し、$Z'/Z$ に正規化する。二階では $T_iT_j$ の平均から二つの平均の積が引かれ、共分散になる。難所は積分微分交換だが、自然母数を小さな立方体の頂点まで動かした指数関数で $T_iT_j$ を支配する。

<!-- proof-start -->
### 証明

$\eta\in\Theta$ を固定する。$\Theta$ は開集合なので、十分小さい $\delta>0$ を取り、各符号ベクトル $s\in\{-1,1\}^d$ に対して $\eta+\delta s\in\Theta$ とできる。従って有限個の積分 $Z(\eta+\delta s)$ はすべて有限である。

$\zeta$ が $\|\zeta-\eta\|_\infty\le\delta/2$ を満たすとする。$t=T(x)$ と書き、$r=\sum_i|t_i|$ と置く。指数関数の増大が多項式より速いことから、$k=0,1,2$ について $r^ke^{-\delta r/2}\le C_{k,\delta}$ となる定数がある。したがって

$$
\begin{aligned}
r^k h(x)e^{\zeta^{\mathsf T}t}
&\le r^kh(x)e^{\eta^{\mathsf T}t+(\delta/2)r}\\
&\le C_{k,\delta}h(x)e^{\eta^{\mathsf T}t+\delta r}\\
&\le C_{k,\delta}\sum_{s\in\{-1,1\}^d}h(x)e^{(\eta+\delta s)^{\mathsf T}t}.
\end{aligned}
$$

最後の不等号は、各 $t_i$ の符号を選べば和の一項が $e^{\eta^{\mathsf T}t+\delta r}$ になるためである。右辺は $x$ について可積分であり、$\zeta$ と独立である。$T_i$ と $T_iT_j$ の絶対値はそれぞれ $r,r^2$ 以下なので、$Z$ の一階・二階微分の候補に同じ支配が適用できる。

差商の各点極限は、例えば $i$ 方向では

$$
\frac{e^{(\zeta+he_i)^{\mathsf T}T}-e^{\zeta^{\mathsf T}T}}h
\longrightarrow T_i e^{\zeta^{\mathsf T}T}\quad(h\to0).
$$

平均値の定理から差商は近傍の一階微分の絶対値で抑えられる。よって[優収束定理](../../../解析系/F0/F0-00D2B/index.md#thm-f0-00d2b-01)をこの差商に適用できる。同様に二階の差商にも上の支配を適用し、

$$
\begin{aligned}
\partial_i Z(\eta)&=\int_ST_i(x)h(x)e^{\eta^{\mathsf T}T(x)}\,d\mu(x),\\
\partial_{ij}Z(\eta)&=\int_ST_i(x)T_j(x)h(x)e^{\eta^{\mathsf T}T(x)}\,d\mu(x)
\end{aligned}
$$

を得る。支配は各 $\eta$ の近傍で一様なので両導関数は連続でもある。$Z>0$、$A=\log Z$ から商の微分を行うと

$$
\begin{aligned}
\partial_i A&=\frac{\partial_i Z}{Z}=\int_ST_i(x)p_\eta(x)\,d\mu(x),\\
\partial_{ij}A&=\frac{\partial_{ij}Z}{Z}-\frac{(\partial_i Z)(\partial_j Z)}{Z^2}\\
&=E_\eta[T_iT_j]-E_\eta[T_i]E_\eta[T_j].
\end{aligned}
$$

上の支配で二次モーメントの有限性も同時に示されている。$\square$
<!-- proof-end -->

この公式は正規化の裏に隠れた平均と揺らぎを取り出す。特に二階微分の行列は常に非負の二次形式を作る。しかし**正定値になるとは限らない**。

<a id="prop-ml2-03-convexity"></a>

<!-- formal-statement-start -->
> **命題（共分散による対数分配関数の凸性）**
> [固定台の正則自然指数型分布族](#def-ml2-03-regular-family)で自然母数空間 $\Theta$ を考える。$\Theta$ は凸集合で、$A$ は $\Theta$ 上の凸関数である。点 $\eta\in\Theta$ で $\nabla^2A(\eta)$ が正定値であることと、任意の $v\in\mathbb R^d\setminus\{0\}$ について $v^{\mathsf T}T(X)$ が $p_\eta$ のもとでほとんど確実に定数ではないことは同値である。
<!-- formal-statement-end -->

### 証明の見取り図

自然母数空間の凸性は、二つの可積分指数の間の指数を重み付き相加平均で抑える。Hessianにベクトルを左右から掛けると、その線形結合の分散になる。

<!-- proof-start -->
### 証明

$\eta,\xi\in\Omega$、$0\le t\le1$ とする。正数 $a,b$ について $a^tb^{1-t}\le ta+(1-t)b$ を $a=e^{\eta^{\mathsf T}T(x)}$、$b=e^{\xi^{\mathsf T}T(x)}$ に適用し、$h\ge0$ を掛けて積分すると

$$
Z(t\eta+(1-t)\xi)\le tZ(\eta)+(1-t)Z(\xi)<\infty.
$$

よって $\Omega$ は凸、内部 $\Theta$ も凸である。[微分公式](#thm-ml2-03-log-partition-moments)から任意の $v\in\mathbb R^d$ について

$$
v^{\mathsf T}\nabla^2A(\eta)v
=E_\eta\left[\{v^{\mathsf T}T-E_\eta[v^{\mathsf T}T]\}^2\right]\ge0.
$$

凸集合上の任意の線分 $\eta(t)=\eta_0+t(\eta_1-\eta_0)$ に $A$ を制限すると、その二階微分は上の非負量だから凸である。また分散が0になるのは、非負の二乗の期待値が0、すなわち確率1でその二乗が0の場合に限る。従って非零 $v$ すべてに対して分散が正であることがHessianの正定値性と同値。$\square$
<!-- proof-end -->

**定義の確認に戻る数値例。** Bernoulliで $\eta=\log3$ とすると、$p_\eta(1)=3/4$、$p_\eta(0)=1/4$。$T(X)=X$ だから

$$
E_\eta[X]=\frac34,\qquad
E_\eta[X^2]=\frac34,\qquad
\operatorname{Var}_\eta(X)=\frac34-\frac9{16}=\frac3{16}.
$$

一方 $A(\eta)=\log(1+e^\eta)$ を直接微分すれば

$$
A'(\eta)=\frac{e^\eta}{1+e^\eta},\qquad
A''(\eta)=\frac{e^\eta}{(1+e^\eta)^2},
$$

となり、$\eta=\log3$ で $3/4$、$3/16$。一階・二階とも[微分公式](#thm-ml2-03-log-partition-moments)と一致する。Bernoulliの $T$ は二値を取るため、有限 $\eta$ では分散は正だが $\eta\to\pm\infty$ の極限で0に近づく。

<a id="ref-ml2-03-gaussian-exponential-form"></a>

## 3. Gaussian模型も同じ計算になる

Bernoulliで指数の係数だった $\eta$ は対数オッズだった。[非退化正規密度](../ML1-07/index.md#def-ml1-07-gaussian)の平均 $\mu\in\mathbb R$ に対しても、分散 $\sigma^2>0$ を固定すれば指数の一次項を切り出せる。$x\in\mathbb R$ で

$$
\begin{aligned}
f_\mu(x)
&=\frac1{\sqrt{2\pi\sigma^2}}\exp\left[-\frac{(x-\mu)^2}{2\sigma^2}\right]\\
&=\underbrace{\frac{e^{-x^2/(2\sigma^2)}}{\sqrt{2\pi\sigma^2}}}_{h(x)}
\exp\left\{\underbrace{\frac\mu{\sigma^2}}_{\eta}\underbrace{x}_{T(x)}-
\frac{\mu^2}{2\sigma^2}\right\}.
\end{aligned}
$$

ここで $h$ は分散 $\sigma^2$、平均0の密度である。平方完成を逆向きに使って積分すると

$$
\begin{aligned}
Z(\eta)&=\int_{\mathbb R}\frac1{\sqrt{2\pi\sigma^2}}
\exp\left[-\frac{x^2}{2\sigma^2}+\eta x\right]dx\\
&=e^{\sigma^2\eta^2/2}\int_{\mathbb R}\frac1{\sqrt{2\pi\sigma^2}}
\exp\left[-\frac{(x-\sigma^2\eta)^2}{2\sigma^2}\right]dx
=e^{\sigma^2\eta^2/2}.
\end{aligned}
$$

積分の最後は平均だけが移動した正規密度の積分1を使った。従って $\Theta=\mathbb R$、共通台 $\mathbb R$、

$$
A(\eta)=\frac{\sigma^2\eta^2}{2},\qquad
A'(\eta)=\sigma^2\eta=\mu,\qquad
A''(\eta)=\sigma^2.
$$

Bernoulliでは自然母数とともに分散が変わるが、このGaussianでは**固定した $\sigma^2$ が常に二階微分として現れる**。これが[前講の既知雑音分散Gaussian模型](../ML2-02/index.md#def-ml2-02-gaussian-linear-model)を、より一般の指数型表示から見直した姿である。

## 4. なぜ共役更新は足し算になるか

前講で事前分布にGaussianを選ぶと事後もGaussianだったのは偶然ではない。観測を掛けると指数の $\eta$ の一次項と $A(\eta)$ の係数だけが変わる。この二種類の係数を**超母数** $\chi\in\mathbb R^d$、$\nu\in\mathbb R$ として整理する。

共役という語は、[前講の事後密度](../ML2-02/index.md#def-ml2-02-posterior)のように、事前と事後が同じ分布族にとどまる性質を指す。ただし「同じ形が書ける」ことと「積分が有限で確率分布になる」ことは別である。$\eta$ 上の密度を正規化できる条件を必ず付ける。

<a id="def-ml2-03-conjugate-prior"></a>

<!-- formal-statement-start -->
> **定義（正規化可能な指数型共役事前分布）**
> [固定台の正則自然指数型分布族](#def-ml2-03-regular-family)の自然母数 $\eta\in\Theta\subset\mathbb R^d$ に対し、$\chi\in\mathbb R^d$、$\nu\in\mathbb R$ を固定する。Lebesgue測度 $d\eta$ に関して

$$
K(\chi,\nu)=\int_\Theta
\exp\{\eta^{\mathsf T}\chi-\nu A(\eta)\}\,d\eta
$$

> が $0<K(\chi,\nu)<\infty$ を満たす場合、事前密度を

$$
\pi_{\chi,\nu}(\eta)=\frac{\exp\{\eta^{\mathsf T}\chi-\nu A(\eta)\}}{K(\chi,\nu)},\qquad \eta\in\Theta
$$

> と定める。これは自然母数上の共役事前分布族であり、$\chi,\nu$ を超母数と呼ぶ。
<!-- formal-statement-end -->

<a id="ex-ml2-03-gaussian-conjugate"></a>

<!-- definition-example-start: def-ml2-03-conjugate-prior -->
**定義の確認**（Gaussianの自然母数）。既知の $\sigma^2>0$ に対し、前節の $A(\eta)=\sigma^2\eta^2/2$ を用いる。$\nu>0$、$\chi\in\mathbb R$ なら

$$
\eta\chi-\frac{\nu\sigma^2\eta^2}{2}
=-\frac{\nu\sigma^2}{2}
\left(\eta-\frac\chi{\nu\sigma^2}\right)^2
+\frac{\chi^2}{2\nu\sigma^2}.
$$

正の係数 $\nu\sigma^2$ で平方完成できるため、$\eta\in\mathbb R$ に関する $K$ は正で有限である。密度は平均 $\chi/(\nu\sigma^2)$、分散 $1/(\nu\sigma^2)$ の正規密度。$\mu=\sigma^2\eta$ に戻せば $\mu\sim N(\chi/\nu,\sigma^2/\nu)$ である。$\nu\le0$ ではこのGaussianの正規化は一般に失敗し、特に $\nu=0$ で指数は高々一次式なので実数全体で積分できない。
<!-- definition-example-end -->

<a id="thm-ml2-03-conjugate-update"></a>

<!-- formal-statement-start -->
> **定理（指数型共役事前分布の超母数更新）**
> [固定台の正則自然指数型分布族](#def-ml2-03-regular-family)から、$\eta\in\Theta$ を固定して $X_1,\ldots,X_n$（$n\ge1$）を条件付き独立同分布に観測する。各 $x_i\in S_h$ とし、自然母数の事前密度が[正規化可能な指数型共役事前分布](#def-ml2-03-conjugate-prior) $\pi_{\chi,\nu}$ であるとする。更新した超母数を

$$
\chi_n=\chi+\sum_{i=1}^nT(x_i),\qquad \nu_n=\nu+n
$$

> と置き、さらに $K(\chi_n,\nu_n)<\infty$ と仮定する。このとき事後密度は $\pi_{\chi_n,\nu_n}$ に等しい。
<!-- formal-statement-end -->

### 証明の見取り図

同時尤度の指数をまとめると、統計量の和が $\eta$ の係数に、標本数が $-A(\eta)$ の係数に現れる。事前の二係数へそのまま加え、更新先の正規化積分の有限性を確認する。

<!-- proof-start -->
### 証明

条件付き独立性から、観測値 $x=(x_1,\ldots,x_n)$ の同時尤度は

$$
\begin{aligned}
L(\eta;x)&=\prod_{i=1}^np_\eta(x_i)\\
&=\left\{\prod_{i=1}^nh(x_i)\right\}
\exp\left\{\eta^{\mathsf T}\sum_{i=1}^nT(x_i)-nA(\eta)\right\}.
\end{aligned}
$$

$x_i\in S_h$ なので $\prod_i h(x_i)>0$ であり、この因子は $\eta$ に依存しない。これに事前密度を掛けると

$$
\begin{aligned}
L(\eta;x)\pi_{\chi,\nu}(\eta)
&=\frac{\prod_i h(x_i)}{K(\chi,\nu)}
\exp\left\{\eta^{\mathsf T}\left(\chi+\sum_iT(x_i)\right)
-(\nu+n)A(\eta)\right\}\\
&=\frac{\prod_i h(x_i)}{K(\chi,\nu)}
e^{\eta^{\mathsf T}\chi_n-\nu_nA(\eta)}.
\end{aligned}
$$

仮定 $K(\chi_n,\nu_n)<\infty$ により周辺密度は

$$
m(x)=\int_\Theta L(\eta;x)\pi_{\chi,\nu}(\eta)\,d\eta
=\frac{\prod_i h(x_i)}{K(\chi,\nu)}K(\chi_n,\nu_n)>0.
$$

従って分子を $m(x)$ で割ると $\pi_{\chi_n,\nu_n}$ が残る。更新先の $K$ を確認せずに「共役だから事後が存在する」とするのは、この最後の一歩を省略している。$\square$
<!-- proof-end -->

## 5. 二つの共役模型を実際に更新する

### 5.1 Beta–Bernoulliの対応

Bernoulliの自然母数 $\eta$ について $p=e^\eta/(1+e^\eta)$、$A(\eta)=\log(1+e^\eta)$ である。$\eta\in\mathbb R$ を確率 $p\in(0,1)$ に変換すると、$d\eta/dp=1/\{p(1-p)\}$ になる。このJacobianが、指数型事前分布とBeta分布の対応に不可欠である。

<a id="prop-ml2-03-beta-bernoulli"></a>

<!-- formal-statement-start -->
> **命題（Beta–Bernoulli共役更新）**
> $X_i\mid p\sim\operatorname{Bernoulli}(p)$ を $i=1,\ldots,n$ で条件付き独立とし、$0<p<1$ とする。事前密度は

$$
\pi(p)=\frac{p^{\alpha-1}(1-p)^{\beta-1}}{B(\alpha,\beta)},\qquad
B(\alpha,\beta)=\int_0^1u^{\alpha-1}(1-u)^{\beta-1}\,du,
$$

> $\alpha,\beta>0$ とする。$s=\sum_{i=1}^nx_i$（$0\le s\le n$）を観測した後の事後密度は $\operatorname{Beta}(\alpha+s,\beta+n-s)$ である。自然母数 $\eta=\log\{p/(1-p)\}$ の[共役超母数](#def-ml2-03-conjugate-prior)では $\chi=\alpha,\nu=\alpha+\beta$ に対応する。
<!-- formal-statement-end -->

### 証明の見取り図

自然母数上での指数を $p$ へ直し、Jacobianを掛けるとBeta密度の指数が一つずつ減る。観測成功数が $\alpha$ に、失敗数が $\beta$ に足される。

<!-- proof-start -->
### 証明

$\eta=\log p-\log(1-p)$、$A(\eta)=-\log(1-p)$ だから

$$
e^{\eta\chi-\nu A(\eta)}
=p^\chi(1-p)^{\nu-\chi},\qquad
d\eta=\frac{dp}{p(1-p)}.
$$

従って $p$ に関する事前密度の未正規化部分は $p^{\chi-1}(1-p)^{\nu-\chi-1}$。端点0付近の積分が有限である条件は $\chi>0$、端点1付近では $\nu-\chi>0$ である。このとき $K(\chi,\nu)=B(\chi,\nu-\chi)$ は正で有限。$\alpha=\chi$、$\beta=\nu-\chi$ と対応する。

観測の同時尤度は $p^s(1-p)^{n-s}$。積を取ると

$$
\pi(p)L(p;x)\ \propto\
p^{\alpha+s-1}(1-p)^{\beta+n-s-1}.
$$

両指数は $\alpha+s>0$、$\beta+n-s>0$ に対応するので新しいBeta積分も有限。よってBeta$(\alpha+s,\beta+n-s)$ に正規化できる。自然母数では $\chi_n=\alpha+s$、$\nu_n=\alpha+\beta+n$ だから $\nu_n-\chi_n=\beta+n-s$ と同じ。$\square$
<!-- proof-end -->

**更新例。** $p\sim\operatorname{Beta}(2,3)$、$x=(1,1,1,0)$ を観測すると、$s=3,n-s=1$ で事後は $\operatorname{Beta}(5,4)$。成功の情報は $\alpha$、失敗の情報は $\beta$ に一つずつ蓄積される。標本順を並べ替えても和 $s$ は変わらず、事後分布も変わらない。

### 5.2 既知分散Gaussianの精度加算

Bernoulliでは成功数と失敗数が加算された。Gaussianでは、観測値の和と標本数が加算される。前講の係数回帰は行列による精度加算だったが、ここでは未知平均一つの場合を扱う。

<a id="prop-ml2-03-gaussian-conjugacy"></a>

<!-- formal-statement-start -->
> **命題（既知分散Gaussianの共役更新）**
> $\sigma^2>0$ を既知とし、$X_i\mid\mu\sim N(\mu,\sigma^2)$（$i=1,\ldots,n$、$n\ge1$）を条件付き独立に観測する。事前分布を $\mu\sim N(m_0,\sigma^2/\nu)$（$m_0\in\mathbb R,\nu>0$）とする。自然母数 $\eta=\mu/\sigma^2$、超母数 $\chi=\nu m_0$、$\nu$ に対し、事後は

$$
\mu\mid x_1,\ldots,x_n\sim
N\left(\frac{\nu m_0+\sum_{i=1}^nx_i}{\nu+n},\ \frac{\sigma^2}{\nu+n}\right)
$$

> となる。
<!-- formal-statement-end -->

### 証明の見取り図

$A(\eta)=\sigma^2\eta^2/2$ を共役事前密度へ代入し、[超母数更新](#thm-ml2-03-conjugate-update)で係数を足す。最後に $\mu=\sigma^2\eta$ へ戻す。

<!-- proof-start -->
### 証明

Gaussianの[指数型表示](#ref-ml2-03-gaussian-exponential-form)では $T(x)=x$、$A(\eta)=\sigma^2\eta^2/2$。$\nu>0$ なので[共役事前の直接例](#ex-ml2-03-gaussian-conjugate)で $K$ は有限。更新先でも $\nu+n>0$ だから有限で、[超母数更新定理](#thm-ml2-03-conjugate-update)を適用できる。

$$
\chi_n=\nu m_0+\sum_i x_i,\qquad \nu_n=\nu+n.
$$

$\eta$ の事後密度の指数を平方完成すると

$$
\begin{aligned}
\chi_n\eta-\frac{\nu_n\sigma^2}{2}\eta^2
&=-\frac{\nu_n\sigma^2}{2}
\left(\eta-\frac{\chi_n}{\nu_n\sigma^2}\right)^2
+\frac{\chi_n^2}{2\nu_n\sigma^2}.
\end{aligned}
$$

$\eta$ の事後平均は $\chi_n/(\nu_n\sigma^2)$、分散は $1/(\nu_n\sigma^2)$。$\mu=\sigma^2\eta$ の変換で平均に $\sigma^2$、分散に $\sigma^4$ を掛け、結論を得る。$\square$
<!-- proof-end -->

この結果は[前講のGaussian事後公式](../ML2-02/index.md#thm-ml2-02-gaussian-posterior)で $p=1$、設計行列を全行1、$S_0=\sigma^2/\nu$ とする場合に等しい。実際、事後精度は $\nu/\sigma^2+n/\sigma^2=(\nu+n)/\sigma^2$、一次項は $(\nu m_0+\sum_i x_i)/\sigma^2$ である。

## 6. 条件が外れる三つの落とし穴

1. **台が母数によって動く場合。** $X\sim\operatorname{Unif}(0,\theta)$、$\theta>0$ の密度は $f_\theta(x)=\boldsymbol{1}_{(0,\theta)}(x)/\theta$ である。正規化の積分領域が $\theta$ に依存するので、固定台の[微分公式](#thm-ml2-03-log-partition-moments)をそのまま適用できない。端点を無視して内部でだけ微分すると $\int_0^\theta\partial_\theta(1/\theta)\,dx=-1/\theta$ だが、正規化恒等式の微分は本来0。欠けた $+1/\theta$ は右端の移動による境界項である。**壊れたのは固定した積分領域上での微分交換の前提**である。
2. **正則族の境界母数。** Bernoulliで $p=0$ または1を厳密に含めると、$\eta=\log\{p/(1-p)\}$ は有限ではない。[定義](#def-ml2-03-regular-family)の $\Theta=\mathbb R$ 内の点ではなく、$\eta\to\pm\infty$ の極限として扱う。$A''>0$ が各有限点で成立しても、境界で同じ局所微分公式が適用できるとは言えない。
3. **事前分布が正規化不能。** Bernoulliの $\chi=0,\nu=2$ を $p$ へ変換すると密度候補は $p^{-1}(1-p)$ に比例し、$\int_0^1p^{-1}(1-p)\,dp=\infty$。よって[共役事前分布の定義](#def-ml2-03-conjugate-prior)の $K<\infty$ を満たさない。事後式だけを形式的に書けても、適切な事前確率分布を出発点としたBayes更新とは言えない。

## 7. 自然母数を動かして数値照合する

[対数分配関数の微分ラボ](../../../../../../simulation/ml2-03.html)では、Bernoulliの $A(\eta)=\log(1+e^\eta)$ と、既知分散 $\sigma^2=2$ のGaussianの $A(\eta)=\eta^2$ を切り替え、$\eta\in[-5,5]$ を動かせる。式から求めた一階・二階微分と、刻み幅 $10^{-3}$ の中央差分を別々に計算して並べる。

確認する点は二つ。Bernoulliの $\eta=0$ なら $A'(0)=1/2,A''(0)=1/4$、Gaussianで $\eta=1/2$ なら $A'(1/2)=1,A''(1/2)=2$ となる。またBernoulliの $|\eta|$ を大きくすると分散は0に近づく一方、既知分散Gaussianでは2のまま。数値差分の一致は公式の検算であり、**積分微分交換を保証する数学的証明は第2節**にある。

## 8. 演習

### ML2-03-A01 Bernoulliの対数分配関数

- Level: A

台 $S=\{0,1\}$、数え上げ測度、$h(x)=1,T(x)=x$ を持つ確率質量関数 $p_\eta(x)=h(x)\exp\{\eta T(x)-A(\eta)\}$ を考える。自然母数を $\eta=\log3$ として、$Z,A,p_\eta(0),p_\eta(1),A',A''$ を求め、期待値と分散に一致することを確かめよ。

<!-- solution-start -->
#### 詳細解答

二点を数え上げると $Z=1+e^\eta$ なので、$\eta=\log3$ で $Z=4,A=\log4$。正規化した質量は

$$
p_\eta(0)=\frac14,\qquad p_\eta(1)=\frac34.
$$

$A'=e^\eta/(1+e^\eta)$ を商の微分でもう一度微分すると

$$
A''=\frac{e^\eta(1+e^\eta)-e^{2\eta}}{(1+e^\eta)^2}
=\frac{e^\eta}{(1+e^\eta)^2}.
$$

従って $A'=3/4,A''=3/16$。一方 $X^2=X$ が二点のどちらでも成り立ち、

$$
E[X]=0\cdot\frac14+1\cdot\frac34=\frac34,\qquad
\operatorname{Var}(X)=E[X^2]-E[X]^2=\frac34-\frac9{16}=\frac3{16}.
$$

二つの値は[対数分配関数の微分公式](#thm-ml2-03-log-partition-moments)の具体的計算と一致する。
<!-- solution-end -->

### ML2-03-A02 既知分散Gaussianの自然母数

- Level: A

観測変数 $X\sim N(\mu,2)$（$\mu\in\mathbb R$）について、$S=\mathbb R$、$T(x)=x$、$h(x)=(4\pi)^{-1/2}e^{-x^2/4}$ とする。自然母数 $\eta=1/2$ のとき $\mu$、$Z(\eta)$、$A(\eta)$、$A'(\eta)$、$A''(\eta)$ を求め、台と正規化を確かめよ。

<!-- solution-start -->
#### 詳細解答

固定分散 $\sigma^2=2$ の[Gaussianの指数型表示](#ref-ml2-03-gaussian-exponential-form)では $\eta=\mu/2$、従って $\mu=1$。平方完成を行うと

$$
-\frac{x^2}{4}+\frac{x}{2}
=-\frac{(x-1)^2}{4}+\frac14.
$$

よって $h(x)e^{\eta x}$ の積分は、正規化された $N(1,2)$ の密度の積分に $e^{1/4}$ を掛けたものだから、$Z(1/2)=e^{1/4}>0$、$A(1/2)=1/4$。一般に $A(\eta)=\eta^2$ なので

$$
A'(1/2)=2\cdot\frac12=1,\qquad A''(1/2)=2.
$$

密度はすべての $x\in\mathbb R$ で正であり、台は母数に依存せず $\mathbb R$。$Z$ で割った積分は1になる。
<!-- solution-end -->

### ML2-03-A03 正規化できない共役密度

- Level: A

Bernoulli模型の自然母数を $\eta=\log\{p/(1-p)\}$、対数分配関数を $A(\eta)=\log(1+e^\eta)$ とする。超母数 $\chi=0,\nu=2$ の未正規化事前密度 $e^{\eta\chi-\nu A(\eta)}$ を、$p\in(0,1)$ 上の密度候補に直し、積分が有限か調べよ。

<!-- solution-start -->
#### 詳細解答

$A(\eta)=-\log(1-p)$ なので、指数は $e^{-2A}=(1-p)^2$。自然母数から確率への変換は $d\eta=dp/\{p(1-p)\}$ だから

$$
K(0,2)=\int_0^1(1-p)^2\frac{dp}{p(1-p)}
=\int_0^1\frac{1-p}{p}\,dp.
$$

$0<p\le1/2$ では $(1-p)/p\ge1/(2p)$。$\int_0^{1/2}dp/p$ は発散するので $K(0,2)=\infty$。従って[正規化可能な共役事前分布](#def-ml2-03-conjugate-prior)の条件を満たさず、確率密度にはならない。
<!-- solution-end -->

### ML2-03-A04 動く台と境界項

- Level: A

$\theta>0$、$X\sim\operatorname{Unif}(0,\theta)$ の確率密度関数を $f_\theta(x)=1/\theta$（$0<x<\theta$）、その他0とする。$\int_0^\theta f_\theta(x)\,dx=1$ を $\theta$ で微分するとき、被積分関数の微分だけを積分した値と、本来の微分値を比較せよ。どの仮定がないために誤差が生じるか。

<!-- solution-start -->
#### 詳細解答

積分領域の内部で $\partial_\theta f_\theta(x)=-1/\theta^2$ とすれば

$$
\int_0^\theta\partial_\theta f_\theta(x)\,dx
=\int_0^\theta-\frac1{\theta^2}\,dx=-\frac1\theta.
$$

一方、正規化式は恒等的に1なので全微分は0である。可動右端を含めた積分の微分則では

$$
\frac d{d\theta}\int_0^\theta\frac{dx}{\theta}
=\frac1\theta+\int_0^\theta\left(-\frac1{\theta^2}\right)dx
=\frac1\theta-\frac1\theta=0.
$$

取り落としたのは境界項 $1/\theta$。台 $(0,\theta)$ が母数とともに動くため、[固定台の定義](#def-ml2-03-regular-family)の条件がなく、固定領域の微分公式を適用できない。
<!-- solution-end -->

### ML2-03-B01 三値分布のHessian

- Level: B

台 $S=\{1,2,3\}$、数え上げ測度、$h(x)=1$、$T(1)=(1,0)^{\mathsf T}$、$T(2)=(0,1)^{\mathsf T}$、$T(3)=(0,0)^{\mathsf T}$ の自然指数型分布族を考える。$\eta=(\log2,\log3)^{\mathsf T}$ において $A,\nabla A,\nabla^2A$ を導出し、Hessianが正定値であることを行列式から確認せよ。

<!-- solution-start -->
#### 詳細解答

三点の指数重みは順に $e^{\eta_1},e^{\eta_2},1$ なので

$$
Z=1+e^{\eta_1}+e^{\eta_2},\qquad
A=\log(1+e^{\eta_1}+e^{\eta_2}).
$$

指定点では $Z=6$、$A=\log6$、点の確率は $p_1=1/3,p_2=1/2,p_3=1/6$。偏微分を分母・分子の積の規則で実行すると

$$
\partial_i A=p_i\quad(i=1,2),\qquad
\partial_{ii}A=p_i(1-p_i),\qquad
\partial_{12}A=-p_1p_2.
$$

従って

$$
\nabla A=\begin{pmatrix}1/3\\1/2\end{pmatrix},\qquad
\nabla^2A=\begin{pmatrix}2/9&-1/6\\-1/6&1/4\end{pmatrix}.
$$

ここで[対数分配関数の一階・二階微分公式](#thm-ml2-03-log-partition-moments)を、二成分の統計量 $T=(T_1,T_2)^{\mathsf T}$ に適用したことも確かめる。Hessianの各成分は

$$
H_{ij}=E_\eta[T_iT_j]-E_\eta[T_i]E_\eta[T_j]
=\operatorname{Cov}_\eta(T_i,T_j)
$$

であり、上で求めた行列はこの共分散行列に等しい。正定値性とは、任意の非零ベクトル $v=(v_1,v_2)^{\mathsf T}$ に対して

$$
v^{\mathsf T}(\nabla^2A)v>0
$$

となることなので、その判定を具体的に確かめる。Hessianは対称で、左上成分は $2/9>0$。行列式は

$$
\det(\nabla^2A)=\frac29\cdot\frac14-\left(-\frac16\right)^2
=\frac1{18}-\frac1{36}=\frac1{36}>0.
$$

なぜこの二条件で正定値を判定できるかも、二次形式を平方完成して確認する。$H=\nabla^2A$ とおくと

$$
\begin{aligned}
v^{\mathsf T}Hv
&=\frac29v_1^2-\frac13v_1v_2+\frac14v_2^2\\
&=\frac29\left(v_1-\frac34v_2\right)^2+\frac18v_2^2.
\end{aligned}
$$

第二項の係数は $\det(H)/H_{11}=(1/36)/(2/9)=1/8$ に等しい。従って上の二条件は二つの平方の係数が正であることを意味し、$v\ne0$ なら二次形式は必ず正となる。これは $v^{\mathsf T}T$ が任意の非零 $v$ に対して三点すべてで同じ値にはならないという[凸性命題](#prop-ml2-03-convexity)とも一致する。
<!-- solution-end -->

### ML2-03-B02 超母数更新と次の観測

- Level: B

成功確率 $p$ の事前分布を $\operatorname{Beta}(2,3)$、観測 $X_1,X_2,X_3\mid p$ を条件付き独立なBernoulli$(p)$ とする。観測値 $(1,1,0)$ の後の事後超母数 $\chi_3,\nu_3$ とBeta母数を求め、次の成功確率 $P(X_4=1\mid X_1=1,X_2=1,X_3=0)$ を求めよ。比較のため標本の成功割合も示せ。

<!-- solution-start -->
#### 詳細解答

[Beta–Bernoulliの対応](#prop-ml2-03-beta-bernoulli)では $\chi=\alpha=2,\nu=\alpha+\beta=5$。標本数 $n=3$、成功数 $s=2$ なので[超母数更新](#thm-ml2-03-conjugate-update)から

$$
\chi_3=2+2=4,\qquad \nu_3=5+3=8.
$$

よって事後のBeta母数は $\alpha_3=4,\beta_3=8-4=4$。次の成功確率は $p$ で条件付けた成功確率 $p$ を事後分布で平均したものだから

$$
P(X_4=1\mid x_1,x_2,x_3)=\int_0^1p\frac{p^3(1-p)^3}{B(4,4)}\,dp
=\frac{B(5,4)}{B(4,4)}.
$$

この比は $1/2$ である。実際、$u\mapsto1-u$ の置換で $B(5,4)=B(4,5)$、さらに $B(4,4)=B(5,4)+B(4,5)$ なので比は $1/2$。標本成功割合は $s/n=2/3$ であり、事前を取り込む予測成功確率と一致する必要はない。
<!-- solution-end -->

### ML2-03-B03 Gaussianの共役更新と平方完成

- Level: B

既知分散 $\sigma^2=2$ とし、$X_1,X_2\mid\mu$ は条件付き独立に $N(\mu,2)$、事前分布は $\mu\sim N(1,1)$ とする。観測値 $(0,2)$ に対する共役超母数と事後平均・分散を求めよ。また尤度と事前密度の指数を $\mu$ で平方完成して一致を確認せよ。

<!-- solution-start -->
#### 詳細解答

事前分散が $\sigma^2/\nu=2/\nu=1$ なので $\nu=2$、事前平均 $m_0=1$ より $\chi=\nu m_0=2$。観測の和は $0+2=2$、$n=2$ だから

$$
\chi_2=2+2=4,\qquad\nu_2=2+2=4.
$$

[Gaussian共役更新](#prop-ml2-03-gaussian-conjugacy)から事後平均は $\chi_2/\nu_2=1$、分散は $\sigma^2/\nu_2=1/2$。

もう一方の出発点として、係数 $\mu$ に依存する負の対数尤度と負の対数事前密度を足すと

$$
\begin{aligned}
Q(\mu)&=\frac{(0-\mu)^2+(2-\mu)^2}{4}+\frac{(\mu-1)^2}{2}\\
&=\frac{2\mu^2-4\mu+4}{4}+\frac{\mu^2-2\mu+1}{2}\\
&=\mu^2-2\mu+\frac32=(\mu-1)^2+\frac12.
\end{aligned}
$$

したがって事後密度は $e^{-(\mu-1)^2}$ に比例する。正規密度 $N(m,v)$ の指数は $-(\mu-m)^2/(2v)$ なので、$m=1,v=1/2$ と一致する。
<!-- solution-end -->

### ML2-03-B04 凸でも正定値とは限らない

- Level: B

$S=\{0,1\}$、数え上げ測度、$h(x)=1$、$T(x)=(x,2x)^{\mathsf T}$、自然母数 $\eta\in\mathbb R^2$ の指数型分布族を考える。$A(\eta)$ とHessianを求め、二階微分公式は成立するのにHessianが特異であることを示せ。異なる自然母数が同じ分布を表す具体例を一つ挙げよ。

<!-- solution-start -->
#### 詳細解答

$\eta^{\mathsf T}T(x)=(\eta_1+2\eta_2)x$ と書ける。$u=\eta_1+2\eta_2$ と置くと

$$
Z(\eta)=1+e^u,\qquad A(\eta)=\log(1+e^u).
$$

$p=e^u/(1+e^u)$ とすれば連鎖律から

$$
\nabla A=p\begin{pmatrix}1\\2\end{pmatrix},\qquad
\nabla^2A=p(1-p)\begin{pmatrix}1&2\\2&4\end{pmatrix}.
$$

行列式は $p^2(1-p)^2(4-4)=0$。実際 $v=(2,-1)^{\mathsf T}$ では $v^{\mathsf T}T(X)=2X-2X=0$ が確率1で一定なので、[正定値性の判定](#prop-ml2-03-convexity)を満たさない。$\eta=(0,0)$ と $\eta'=(2,-1)$ はどちらも $u=0$ で、Bernoulli$(1/2)$ と同じ分布を与える。共通台・開性・微分交換条件はすべて成立しており、壊れているのは自然母数表示の一意性である。
<!-- solution-end -->

### ML2-03-C01 共役事後の不確実性と予測分散

- Level: C

成功確率 $p\in(0,1)$ について事前分布を $\operatorname{Beta}(2,2)$ とし、独立な条件付きBernoulli観測 $X_1,\ldots,X_4\mid p$ で $(1,1,1,0)$ を得た。Beta$(a,b)$ の密度は $u^{a-1}(1-u)^{b-1}/B(a,b)$（$a,b>0$、$0<u<1$）とする。

1. 事後分布と新しい条件付き独立観測 $Y\mid p\sim\operatorname{Bernoulli}(p)$ の予測成功確率を求めよ。
2. $B(a+1,b)/B(a,b)=a/(a+b)$ を部分積分と恒等式 $u+(1-u)=1$ から導き、事後の $E[p^2]$ と $\operatorname{Var}(p)$ を求めよ。
3. $E[p(1-p)]+\operatorname{Var}(p)=\operatorname{Var}(Y)$ を具体的な数値で確かめ、[対数分配関数の二階微分公式](#thm-ml2-03-log-partition-moments)が表す分散と予測分散を区別せよ。

<!-- solution-start -->
#### 詳細解答

**（1）** 成功数 $s=3$、失敗数 $4-s=1$ なので[Beta–Bernoulli更新](#prop-ml2-03-beta-bernoulli)で事後はBeta$(5,3)$。任意の $p$ では $P(Y=1\mid p)=p$ だから予測成功確率は事後の $E[p]$ に等しい。

**（2）** 一般の $a,b>0$ について、$u^a(1-u)^b$ は両端で0なので部分積分が使える。

$$
\begin{aligned}
B(a+1,b)&=\int_0^1u^a(1-u)^{b-1}\,du\\
&=\left[-\frac{u^a(1-u)^b}{b}\right]_0^1
+\frac ab\int_0^1u^{a-1}(1-u)^b\,du\\
&=\frac ab B(a,b+1).
\end{aligned}
$$

また $u+(1-u)=1$ を $u^{a-1}(1-u)^{b-1}$ に掛けて積分すると

$$
B(a,b)=B(a+1,b)+B(a,b+1).
$$

右辺の第二項に $B(a,b+1)=(b/a)B(a+1,b)$ を代入し、

$$
\frac{B(a+1,b)}{B(a,b)}=\frac{a}{a+b}.
$$

これを2回適用すれば

$$
E[p]=\frac{a}{a+b},\qquad
E[p^2]=\frac{a(a+1)}{(a+b)(a+b+1)}.
$$

事後の $a=5,b=3$ を代入すると

$$
E[p]=\frac58,\qquad
E[p^2]=\frac{5\cdot6}{8\cdot9}=\frac5{12}.
$$

従って新観測の予測成功確率は $5/8$、また

$$
\operatorname{Var}(p)=E[p^2]-E[p]^2
=\frac5{12}-\frac{25}{64}=\frac5{192}.
$$

**（3）** 固定した $p$ に対するBernoulliの自然母数は $\eta=\log\{p/(1-p)\}$ で、[微分公式](#thm-ml2-03-log-partition-moments)による二階微分は $A''(\eta)=p(1-p)=\operatorname{Var}(Y\mid p)$。しかし事後分布を通じた予測では $p$ 自身が不確実である。

$$
\begin{aligned}
E[p(1-p)]&=E[p]-E[p^2]=\frac58-\frac5{12}=\frac5{24},\\
E[p(1-p)]+\operatorname{Var}(p)&=\frac5{24}+\frac5{192}=\frac{45}{192}=\frac{15}{64}.
\end{aligned}
$$

一方、周辺化した $Y$ は成功確率 $5/8$ のBernoulliだから、分散は

$$
\operatorname{Var}(Y)=\frac58\left(1-\frac58\right)=\frac{15}{64}.
$$

両者は一致する。$A''$ は**母数を固定したときの揺らぎ**、予測分散はそれに母数 $p$ の**事後不確実性**を足したものであり、[前講の予測分散の二項分解](../ML2-02/index.md#thm-ml2-02-predictive-variance)と同じ構造を持つ。ただし、両模型の確率分布自体は異なる。
<!-- solution-end -->

## 9. まとめ

正則な自然指数型分布族では、台が固定で自然母数を局所的に動かせるため、対数分配関数の勾配は統計量の平均、Hessianは共分散となる。共役事前分布を正規化できるなら、独立標本の観測は超母数 $\chi,\nu$ の加算更新に集約される。BernoulliのBeta更新と既知分散Gaussianの更新は、その二つの顔である。一方、動く台・境界母数・非正規化事前は適用範囲を外れる。次講では、このように変数間の確率的関係を局所分布の積として組み立てる方法を学ぶ。
