# OTR19 静的最適輸送と流体作用は等価か

これまでは、二つの分布を一度に結ぶ[最適結合](../OTR2/index.md#def-otr2-coupling)と、分布を時刻ごとに動かす[連続の方程式の弱解](../OTR17/index.md#def-otr17-measure-weak)を別々に扱ってきました。静的な費用が「出発点から到着点までの移動距離の二乗」なら、動的な費用は「各時刻の速度の二乗を質量で平均したもの」です。この二つが本当に同じ最小値を持つかを調べます。

例えば質量1の粒子が $0$ から $1$ へ動くとします。速さ $1$ で動けば作用は $\int_0^1 1^2dt=1$。前半だけ急いで止まれば、同じ端点でも作用は増えます。今回は質量が分かれたり合流したりしても成り立つ定式化を目指します。

以下では $d\ge1$、時間区間を $[0,1]$、空間を $\mathbb R^d$ とし、端点の確率測度 $\mu_0,\mu_1$ は有限二次モーメントを持つ、すなわち $\mathcal P_2(\mathbb R^d)$ に属するとします。密度がない測度も含めます。[Wasserstein距離](../OTR8/index.md#def-otr8-wasserstein) $W_2$ の費用は距離の二乗であり、係数 $1/2$ は付けません。

## 1. 真空を含めて質量と流束を表す

[OTR18の運動作用](../OTR18/index.md#def-otr18-kinetic-speed)は速度場 $v$ に対して $\int|v|^2d\mu_tdt$ でした。密度 $\rho(t,x)$ があるなら質量が単位時間に運ばれる流束は $m=\rho v$ です。これを代入すると $\rho|v|^2=|m|^2/\rho$ になります。しかし $\rho=0$ の場所では、そのままでは割り算ができません。また移動Dirac測度には、そもそも Lebesgue 密度 $\rho(t,x)$ がありません。

そこでまず、空間と時間を合わせた領域 $Q=(0,1)\times\mathbb R^d$ の**測度**として質量と流束を扱います。$dt\,d\mu_t(x)$ は、集合 $B\subset Q$ について $\int_0^1\mu_t(\{x:(t,x)\in B\})dt$ を与える空間時間測度です。ベクトル値測度は各成分が有限符号付き測度であるものとし、$|\boldsymbol m|$ はベクトル値測度 $\boldsymbol m$ の全変動測度を表します。後に密度が存在する場合の流束密度を $m(t,x)$ と書き、測度 $\boldsymbol m$ と区別します。

<a id="def-otr19-spacetime"></a>

<!-- formal-statement-start -->
> **定義（空間時間の質量・流束測度）**  
> $t\mapsto\mu_t\in\mathcal P_2(\mathbb R^d)$ を狭義連続曲線とする。$Q=(0,1)\times\mathbb R^d$ 上の非負測度 $\boldsymbol\rho$ を

$$
\boldsymbol\rho(dt,dx)=dt\,d\mu_t(x)
$$

> で定める。$Q$ 上の有限な $\mathbb R^d$ 値測度 $\boldsymbol m$ を**流束測度**という。速度場 $v$ があり $\int_Q|v|d\boldsymbol\rho<\infty$ なら $d\boldsymbol m=v\,d\boldsymbol\rho$ と書く。
<!-- formal-statement-end -->

<!-- definition-example-start: def-otr19-spacetime -->
**定義の確認**。$d=1$、$\mu_t=\delta_t$、$v(t,x)=1$ とします。任意の有界 Borel 関数 $f$ に対して

$$
\int_Q f(t,x)d\boldsymbol\rho=\int_0^1f(t,t)dt,
\qquad
\int_Q f(t,x)d\boldsymbol m=\int_0^1f(t,t)dt.
$$

両者は直線 $x=t$ 上に集中し、二次元の $dt\,dx$ に対して特異ですが、有限測度であり、流束は質量測度に関して速度 $1$ を持ちます。曲線は $W_2(\mu_s,\mu_t)=|t-s|$ により狭義連続、二次モーメントは $t^2\le1$ です。
<!-- definition-example-end -->

非負質量と流束を同時に見るには、真空での値を決めた次の関数が便利です。$r$ は非負の質量密度、$z\in\mathbb R^d$ は流束密度に当たります。

$$
\Psi(r,z)=
\begin{cases}
|z|^2/r,&r>0,\\
0,&r=0,\ z=0,\\
+\infty,&r=0,\ z\ne0.
\end{cases}
$$

真空で流束もゼロなら費用ゼロ、質量がないのに流束だけあれば費用無限大です。任意の二つの非負・ベクトル値測度を一つの基準測度に対する密度として書けば、この関数を積分できます。

<a id="def-otr19-fluid-action"></a>

<!-- formal-statement-start -->
> **定義（真空を含む流体作用）**  
> $Q=(0,1)\times\mathbb R^d$ 上の有限非負測度 $\boldsymbol\rho$ と有限ベクトル値測度 $\boldsymbol m$ に対し、$\lambda=\boldsymbol\rho+|\boldsymbol m|$ と置く。Radon–Nikodym 密度を $r=d\boldsymbol\rho/d\lambda$、$z=d\boldsymbol m/d\lambda$ とし、**流体作用**を

$$
\mathscr A(\boldsymbol\rho,\boldsymbol m)
=\int_Q\Psi(r,z)\,d\lambda\in[0,+\infty]
$$

> と定める。$r=0,z\ne0$ では $\Psi=+\infty$ とし、$r=z=0$ では $\Psi=0$ とする。
<!-- formal-statement-end -->

<!-- definition-example-start: def-otr19-fluid-action -->
**定義の確認**。先の $\mu_t=\delta_t$ では $\boldsymbol m=\boldsymbol\rho$ なので $\lambda=2\boldsymbol\rho$、$r=z=1/2$。従って $\Psi(r,z)=(1/2)^2/(1/2)=1/2$ であり

$$
\mathscr A=\int_Q\tfrac12\,d(2\boldsymbol\rho)=1.
$$

一方、$\boldsymbol\rho=0$ で $\boldsymbol m$ が非零なら、$\lambda=|\boldsymbol m|$ の正の測度を持つ部分で $r=0$、$|z|=1$ となり $\mathscr A=+\infty$。真空規約の三つの場合のうち、$r=z=0$ は両測度がない領域で、費用に寄与しません。
<!-- definition-example-end -->

この定義で基準測度に $\lambda$ を使ったのは、密度 $r,z$ が必ず存在するためです。$\Psi(cr,cz)=c\Psi(r,z)$（$c>0$）という一次同次性により、同じ測度対を支配する別の基準測度で計算しても作用は同じです。特に有限作用のとき通常の速度場表示へ戻せることを示します。

<a id="lem-otr19-velocity"></a>

<!-- formal-statement-start -->
> **補題（有限作用と速度場の同値）**  
> $Q=(0,1)\times\mathbb R^d$ 上の有限非負測度 $\boldsymbol\rho$ と有限ベクトル値測度 $\boldsymbol m$ について、$\mathscr A(\boldsymbol\rho,\boldsymbol m)<\infty$ であるための必要十分条件は、$\boldsymbol m=v\boldsymbol\rho$ を満たす $v\in L^2(\boldsymbol\rho;\mathbb R^d)$ が存在することである。このとき

$$
\mathscr A(\boldsymbol\rho,\boldsymbol m)
=\int_Q|v|^2\,d\boldsymbol\rho.
$$
<!-- formal-statement-end -->

### 証明の見取り図

真空で $z\ne0$ なら無限作用となるので、有限作用は流束の質量に対する絶対連続性を強制します。流束を質量で割ったものが速度場で、作用がその二乗積分になります。

<!-- proof-start -->
### 証明

$\lambda=\boldsymbol\rho+|\boldsymbol m|$、$r=d\boldsymbol\rho/d\lambda$、$z=d\boldsymbol m/d\lambda$ と置きます。有限作用なら $r=0$ かつ $|z|>0$ となる集合の $\lambda$ 測度はゼロです。$\boldsymbol\rho$-零集合 $E$ では $r=0$ が $\lambda$-ほとんど至る所で成り立つので、上の結論から $|\boldsymbol m|(E)=\int_E|z|d\lambda=0$ です。従って $\boldsymbol m\ll\boldsymbol\rho$。

Radon–Nikodym の定理を各成分に適用して $d\boldsymbol m=v\,d\boldsymbol\rho$ とします。$r>0$ では $z=rv$ ですから

$$
\int_Q\Psi(r,z)d\lambda
=\int_{\{r>0\}}r|v|^2d\lambda
=\int_Q|v|^2d\boldsymbol\rho.
$$

左辺は有限なので $v\in L^2(\boldsymbol\rho)$。逆にそのような $v$ があれば $\boldsymbol m=v\boldsymbol\rho$ は Cauchy–Schwarz により有限測度であり、$z=rv$ が $\lambda$-ほとんど至る所で成立して上式を逆にたどれます。$\square$
<!-- proof-end -->

流体作用が凸であることも重要です。これは「流束を平均してから費用を測ると、平均費用以下になる」という Jensen の不等式に対応します。

<a id="prop-otr19-convexity"></a>

<!-- formal-statement-start -->
> **命題（流体作用の凸性）**  
> $Q=(0,1)\times\mathbb R^d$ 上の有限測度対 $(\boldsymbol\rho_i,\boldsymbol m_i)$（$i=0,1$、$\boldsymbol\rho_i\ge0$）と $\theta\in[0,1]$ について、$\boldsymbol\rho_\theta=(1-\theta)\boldsymbol\rho_0+\theta\boldsymbol\rho_1$、$\boldsymbol m_\theta=(1-\theta)\boldsymbol m_0+\theta\boldsymbol m_1$ とすると

$$
\mathscr A(\boldsymbol\rho_\theta,\boldsymbol m_\theta)
\le(1-\theta)\mathscr A(\boldsymbol\rho_0,\boldsymbol m_0)
+\theta\mathscr A(\boldsymbol\rho_1,\boldsymbol m_1).
$$
<!-- formal-statement-end -->

### 証明の見取り図

$r>0$ なら $|z|^2/r$ は二乗ノルムの透視変換です。Cauchy–Schwarz によってその凸性を直接示し、真空の場合を分けます。

<!-- proof-start -->
### 証明

$a,b\ge0$、$u,w\in\mathbb R^d$ とし、有限な $\Psi(a,u),\Psi(b,w)$ の場合だけ調べれば十分です。$a+b>0$ なら

$$
|u+w|^2
=\left|\sqrt a\frac{u}{\sqrt a}+\sqrt b\frac{w}{\sqrt b}\right|^2
\le(a+b)\left(\frac{|u|^2}{a}+\frac{|w|^2}{b}\right).
$$

ゼロ分母の項は、有限作用により対応する分子もゼロなので $0$ と読みます。$a=b=0$ なら $u=w=0$ で凸性は等号です。$(a,u)=((1-\theta)r_0,(1-\theta)z_0)$、$(b,w)=(\theta r_1,\theta z_1)$ と置き、$\Psi$ の一次同次性を使うと点ごとの凸性が出ます。

二つの測度対をともに支配する有限測度 $\lambda=\sum_i(\boldsymbol\rho_i+|\boldsymbol m_i|)$ に対して密度を取り、その不等式を $Q$ 上で積分すれば主張を得ます。片方の作用が無限大なら右辺も拡張実数として扱い（$\theta=0,1$ はその項を除く）、不等式は自明です。$\square$
<!-- proof-end -->

## 2. 端点を固定した動的最適輸送

質量測度だけでなく流束にも条件が必要です。両端点が与えられたとき、時刻ごとの質量を保存する条件が[OTR17の弱い連続の方程式](../OTR17/index.md#def-otr17-measure-weak)でした。密度の有無に依存せず同じ式を書けます。

<a id="def-otr19-admissible"></a>

<!-- formal-statement-start -->
> **定義（動的輸送の許容対）**  
> $\mu_0,\mu_1\in\mathcal P_2(\mathbb R^d)$ を端点とする。狭義連続な曲線 $t\mapsto\mu_t\in\mathcal P_2(\mathbb R^d)$ が $t=0,1$ で指定された測度に一致し、$\sup_{0\le t\le1}\int|x|^2d\mu_t(x)<\infty$ を満たすとする。$\boldsymbol\rho=dt\,d\mu_t(x)$ と有限ベクトル値測度 $\boldsymbol m$ が、任意の $\varphi\in C_c^1([0,1]\times\mathbb R^d)$ に対して

$$
\begin{aligned}
&\int\varphi(1,x)\,d\mu_1(x)-\int\varphi(0,x)\,d\mu_0(x)\\
&\quad=\int_Q\partial_t\varphi\,d\boldsymbol\rho
+\int_Q\nabla_x\varphi\cdot d\boldsymbol m
\end{aligned}
$$

> を満たすとき、$(\boldsymbol\rho,\boldsymbol m)$ を端点 $\mu_0,\mu_1$ の**動的輸送の許容対**という。試験関数は時間端点で零になる必要はなく、空間方向にはコンパクト支持とする。作用が無限大の許容対も定義上は含む。
<!-- formal-statement-end -->

<!-- definition-example-start: def-otr19-admissible -->
**定義の確認**。$\mu_0=\delta_0$、$\mu_1=\delta_1$ とし、$\mu_t=\delta_t$ と $\boldsymbol m=\boldsymbol\rho$ を選びます。先に確認した狭義連続性、端点、一様に有限な二次モーメントを持ちます。任意の許された $\varphi$ について、連鎖律より

$$
\int_0^1[\partial_t\varphi(t,t)+\partial_x\varphi(t,t)]dt
=\int_0^1\frac{d}{dt}\varphi(t,t)dt
=\varphi(1,1)-\varphi(0,0).
$$

従って弱式と有限作用 $\mathscr A=1$ がともに検証されました。
<!-- definition-example-end -->

## 3. すべての動的運動は静的費用以上を使う

まず「いくら複雑な動きをしても、最適結合の費用よりは安くできない」を示します。[OTR18で得た軌道表現の定理](../OTR18/index.md#thm-otr18-superposition)を利用する段階です。

<a id="lem-otr19-lower"></a>

<!-- formal-statement-start -->
> **補題（静的費用による動的作用の下界）**  
> $\mu_0,\mu_1\in\mathcal P_2(\mathbb R^d)$ を端点とする任意の[動的輸送の許容対](#def-otr19-admissible) $(\boldsymbol\rho,\boldsymbol m)$ について

$$
W_2(\mu_0,\mu_1)^2\le\mathscr A(\boldsymbol\rho,\boldsymbol m)
$$

> が成り立つ。
<!-- formal-statement-end -->

### 証明の見取り図

有限作用から速度場を取り出し、連続の方程式の評価 $|\mu'|\le\|v_t\|$ を使います。時間について Cauchy–Schwarz を適用する際、区間の長さが $1$ であることが重要です。

<!-- proof-start -->
### 証明

作用が無限大なら自明です。有限の場合、[有限作用と速度場の同値](#lem-otr19-velocity)から $\boldsymbol m=v\boldsymbol\rho$、$\int_0^1\int|v|^2d\mu_tdt=\mathscr A<\infty$ です。許容対の弱式は[OTR17の測度弱解](../OTR17/index.md#def-otr17-measure-weak)の式そのものです。

各時刻 $\mu_t\in\mathcal P_2$ と狭義連続性があり、$\int_0^1\int|v|^2<\infty$ なので、[速度場による距離微分の評価](../OTR18/index.md#thm-otr18-velocity-bound)を適用できます。この定理は $\mu$ が $AC^2$ になり、ほとんどすべての時刻で

$$
|\mu'|(t)\le\left(\int|v(t,x)|^2d\mu_t(x)\right)^{1/2}
$$

を与えます。さらに[距離微分の積分上界](../OTR18/index.md#thm-otr18-metric-speed)と時間区間 $[0,1]$ 上の Cauchy–Schwarz から

$$
\begin{aligned}
W_2(\mu_0,\mu_1)
&\le\int_0^1|\mu'|(t)dt\\
&\le\int_0^1\left(\int|v|^2d\mu_t\right)^{1/2}dt\\
&\le\left(\int_0^1 1^2dt\right)^{1/2}
\left(\int_0^1\int|v|^2d\mu_tdt\right)^{1/2}\\
&=\mathscr A(\boldsymbol\rho,\boldsymbol m)^{1/2}.
\end{aligned}
$$

両辺非負なので二乗して結論です。別の見方では、[OTR18の軌道分解](../OTR18/index.md#thm-otr18-superposition)で得た粒子軌道の二点周辺が端点結合となり、各軌道の $|\gamma_1-\gamma_0|^2\le\int_0^1|\dot\gamma_t|^2dt$ を積分したことに対応します。$\square$
<!-- proof-end -->

## 4. 最適結合を一直線に動かせば上界が得られる

逆向きには、[OTR3の存在定理](../OTR3/index.md#thm-otr3-polish)で得られる二次費用の最適結合 $\pi$ を用います。$\pi$ は始点 $x$ と終点 $y$ の組の確率分布で、周辺は $\mu_0,\mu_1$ です。各組を $X_t(x,y)=(1-t)x+ty$ と直線補間します。これが[OTR15の変位補間](../OTR15/index.md#def-otr15-displacement-interpolation)でした。

$\partial_tX_t(x,y)=y-x$ は $x,y$ を固定して時間 $t$ で微分した粒子速度です。一方、後で用いる $v(t,z)$ は時刻と**現在位置** $z$ に対応する速度場です。複数の粒子が同じ $z$ に来る場合、二者はそのまま同じ関数にはなりません。

<a id="lem-otr19-upper"></a>

<!-- formal-statement-start -->
> **補題（最適結合による動的作用の上界）**  
> $\mu_0,\mu_1\in\mathcal P_2(\mathbb R^d)$ とし、二次費用 $|x-y|^2$ の最適結合 $\pi\in\Pi(\mu_0,\mu_1)$ を選ぶ。$X_t(x,y)=(1-t)x+ty$ として $\mu_t=(X_t)_\#\pi$ とする。この曲線と、$Q=(0,1)\times\mathbb R^d$ 上の流束測度

$$
\int_Q\Phi\cdot d\boldsymbol m
=\int_0^1\int_{\mathbb R^d\times\mathbb R^d}
\Phi(t,X_t(x,y))\cdot(y-x)\,d\pi(x,y)dt
$$

> （任意の有界 Borel ベクトル場 $\Phi$ に対する定義）によって作る $\boldsymbol\rho=dt\,d\mu_t$ は動的輸送の許容対であり、

$$
\mathscr A(\boldsymbol\rho,\boldsymbol m)\le
\int|y-x|^2d\pi(x,y)=W_2(\mu_0,\mu_1)^2
$$

> を満たす。
<!-- formal-statement-end -->

### 証明の見取り図

連鎖律から連続の方程式を、位置ごとに複数の粒子速度を平均することから作用の上界を得ます。軌道が交差しても、流束を位置と時刻へまとめる際に Jensen の不等式が働くため作用は増えません。

<!-- proof-start -->
### 証明

**(1) 測度として定義できる。** $\pi$ は確率測度で有限二次費用を持つので、Cauchy–Schwarz により $\int|y-x|d\pi\le(\int|y-x|^2d\pi)^{1/2}<\infty$。従って表示式は有限ベクトル値測度 $\boldsymbol m$ を定めます。また $|X_t|^2\le2|x|^2+2|y|^2$ により $\sup_t\int|z|^2d\mu_t(z)\le2\int(|x|^2+|y|^2)d\pi<\infty$。$t\mapsto X_t$ の連続性と有界連続試験関数の支配収束から $\mu_t$ は狭義連続、端点は指定された周辺です。

**(2) 弱い保存則。** $\varphi\in C_c^1([0,1]\times\mathbb R^d)$ に対し、各 $(x,y)$ で

$$
\frac{d}{dt}\varphi(t,X_t)
=\partial_t\varphi(t,X_t)+\nabla_x\varphi(t,X_t)\cdot(y-x).
$$

右辺は $\|\partial_t\varphi\|_\infty+\|\nabla\varphi\|_\infty|y-x|$ で積分可能なので、時間積分後に $\pi$ 積分と交換できます。時間端点を評価すると

$$
\begin{aligned}
&\int\varphi(1,y)d\mu_1(y)-\int\varphi(0,x)d\mu_0(x)\\
&=\int_0^1\int\partial_t\varphi(t,X_t)d\pi dt
+\int_0^1\int\nabla\varphi(t,X_t)\cdot(y-x)d\pi dt\\
&=\int_Q\partial_t\varphi\,d\boldsymbol\rho
+\int_Q\nabla\varphi\cdot d\boldsymbol m.
\end{aligned}
$$

これが許容対の弱式です。

**(3) 有限作用。** $\Theta(dt,dx,dy)=dt\,d\pi(x,y)$ とし、$F(t,x,y)=(t,X_t(x,y))$ と置きます。$F_\#\Theta=\boldsymbol\rho$ です。$\boldsymbol\rho$-零集合 $E\subset Q$ では

$$
|\boldsymbol m|(E)\le\int\boldsymbol1_E(F(t,x,y))|y-x|\,d\Theta=0
$$

なので $\boldsymbol m\ll\boldsymbol\rho$ です。Radon–Nikodym 密度 $v=d\boldsymbol m/d\boldsymbol\rho$ は、同じ $(t,z)=F(t,x,y)$ を持つ粒子速度 $Y=y-x$ の条件付き平均に当たります。実際、どの有界 Borel ベクトル場 $\Phi$ についても

$$
\int\Phi(F)\cdot Y\,d\Theta
=\int_Q\Phi\cdot d\boldsymbol m
=\int_Q\Phi\cdot v\,d\boldsymbol\rho
$$

です。この関係と二乗の非負性から、条件付き平均が二乗作用を増やさないことを直接確かめます。各粒子について

$$
2\Phi(F)\cdot Y-|\Phi(F)|^2
=|Y|^2-|Y-\Phi(F)|^2\le|Y|^2
$$

なので、両辺を $\Theta$ で積分し、上の等式を代入します。$\Phi_R=v\boldsymbol1_{\{|v|\le R\}}$（$R>0$）を選ぶと

$$
\int_{\{|v|\le R\}}|v|^2d\boldsymbol\rho
\le\int|Y|^2d\Theta.
$$

$R\to\infty$ の単調収束により $v\in L^2(\boldsymbol\rho)$ です。よって[有限作用と速度場の同値](#lem-otr19-velocity)を適用でき、

$$
\begin{aligned}
\mathscr A(\boldsymbol\rho,\boldsymbol m)
&=\int_0^1\int|v(t,z)|^2d\mu_t(z)dt\\
&\le\int_0^1\int|y-x|^2d\pi(x,y)dt\\
&=\int|y-x|^2d\pi=W_2(\mu_0,\mu_1)^2.
\end{aligned}
$$

一行目はその補題、二行目は上で示した不等式、三行目は時間区間が長さ $1$ であることによります。$\square$
<!-- proof-end -->

## 5. 二つの定式化の一致

<a id="thm-otr19-benamou-brenier"></a>

<!-- formal-statement-start -->
> **定理（Benamou–Brenierの動的定式化）**  
> 任意の $\mu_0,\mu_1\in\mathcal P_2(\mathbb R^d)$ に対して、$Q=(0,1)\times\mathbb R^d$ 上の[動的輸送の許容対](#def-otr19-admissible)を走ると

$$
\boxed{
W_2(\mu_0,\mu_1)^2
=\min_{(\boldsymbol\rho,\boldsymbol m)\text{ 許容対}}
\mathscr A(\boldsymbol\rho,\boldsymbol m)
}.
$$

> 最小値は達成される。有限作用の許容対では $\boldsymbol m=v\boldsymbol\rho$ と書けるので、右辺を $\int_0^1\int|v|^2d\mu_tdt$ の最小値としてもよい。$\mu_t$ が密度 $\rho(t,x)$ を持ち、流束も $m(t,x)dxdt$ と書ける場合には被積分量は $|m|^2/\rho$（真空規約付き）となる。
<!-- formal-statement-end -->

### 証明の見取り図

どの運動でも[下界](#lem-otr19-lower) $W_2^2\le\mathscr A$、一つの最適結合を直線補間すると[上界](#lem-otr19-upper) $\mathscr A\le W_2^2$ です。上界の構成が実際の許容対なので、単なる下限ではなく最小値が存在します。

<!-- proof-start -->
### 証明

$D=W_2(\mu_0,\mu_1)<\infty$ と置きます。前提の二次モーメント条件から $D$ は有限で、[Polish空間上の最適結合の存在](../OTR3/index.md#thm-otr3-polish)により最適な $\pi$ が存在します。任意の許容対について[下界の補題](#lem-otr19-lower)から $D^2\le\mathscr A$。一方、[最適結合の構成](#lem-otr19-upper)は作用 $\mathscr A_*\le D^2$ の許容対を与えます。よって

$$
D^2\le\inf\mathscr A\le\mathscr A_*\le D^2.
$$

すべて等号なので $\mathscr A_*=D^2$、その許容対が最小値を達成します。有限作用の速度表現は[補題](#lem-otr19-velocity)によります。$\square$
<!-- proof-end -->

この定理は **質量を時間方向に動かす最小の二乗速度作用が、端点間の静的な最適輸送費用に等しい**と言っています。式は $[0,1]$ を時間区間とした正規化です。一般の長さ $T>0$ なら同じ議論で最小作用は $W_2^2/T$ となります（時間を $s=t/T$ へ変換すれば、速度に $1/T$ が付き、積分区間が $T$ 倍になるためです）。

## 6. 密度表示はいつ正当化できるか

教科書でよく見る式は、質量密度を $\rho(t,x)$、流束密度を $m(t,x)$ と書いた形です。**出発測度が $\mu_0\ll\mathcal L^d$ を満たす場合**には、測度表示の最小値を密度表示に制限しても変わらず、正確には端点条件を含む次の等式になります。

$$
\begin{aligned}
W_2(\mu_0,\mu_1)^2
&=\inf\biggl\{\int_0^1\int_{\mathbb R^d}
\frac{|m(t,x)|^2}{\rho(t,x)}\,dx\,dt:\\
&\qquad(\boldsymbol\rho,\boldsymbol m)\text{ は端点 }\mu_0,\mu_1\text{ の許容対},\\
&\qquad d\boldsymbol\rho=\rho(t,x)\,dt\,dx,\quad
d\boldsymbol m=m(t,x)\,dt\,dx\biggr\}.
\end{aligned}
$$

ここで許容対には[弱い保存則と両端点の条件](#def-otr19-admissible)が含まれ、密度表示での保存則は分布の意味で $\partial_t\rho+\nabla\cdot m=0$ です。端点も密度を持つ場合は $\rho(0,\cdot)dx=\mu_0$、$\rho(1,\cdot)dx=\mu_1$ と読めますが、終点が原子測度の場合は $t=1$ の密度を要求せず、測度曲線の端点を $\mu_1$ として指定します。真空は[流体作用の定義](#def-otr19-fluid-action)の規約で扱います。**定理の一般形は測度対についての最小値**であり、出発測度にも密度を仮定できない場合、この密度表示の等式をそのまま主張してはいけません。

例えば $\mu_0=\delta_0$、$\mu_1=\delta_1$ では最小曲線 $\mu_t=\delta_t$ は $dt\,dx$ に関して特異であり、$\rho(t,x)$ は存在しません。それでも測度形式の作用は $1$ です。

実際、$\mu_0$ が Lebesgue 測度に絶対連続なら、最適な動的対は $0\le t<1$ で密度を持つように構成できます。[Brenier定理](../OTR13/index.md#thm-otr13-brenier)で最適結合は $(\mathrm{id},T)_\#\mu_0$ と書け、$T$ は凸関数の勾配です。

$A$ を $T=\nabla\varphi$ が成り立つ $\mu_0$-全測度集合とします。[凸劣微分の巡回単調性](../OTR12/index.md#prop-otr12-subdifferential-cyclic)を二点 $x,y\in A$ に適用すると、次の単調性が従います。

$$
(T(x)-T(y))\cdot(x-y)\ge0.
$$

$t<1$ に対する補間写像 $F_t(x)=(1-t)x+tT(x)$ は、従って

$$
\begin{aligned}
(F_t(x)-F_t(y))\cdot(x-y)
&=(1-t)|x-y|^2+t(T(x)-T(y))\cdot(x-y)\\
&\ge(1-t)|x-y|^2.
\end{aligned}
$$

従って $|F_t(x)-F_t(y)|\ge(1-t)|x-y|$。$A$ 上で $F_t$ は単射であり、像 $F_t(A)$ から $A$ への逆写像は $L=1/(1-t)$-Lipschitz です。

Lipschitz 写像が Lebesgue 零集合を零集合へ写す理由も確認します。零集合を一辺の長さ $\ell_j$ の立方体で覆い、$\sum_j\ell_j^d<\varepsilon$ とします。$L$-Lipschitz 写像による各立方体内の点の像は直径 $L\sqrt d\,\ell_j$ 以下なので、像を覆う球の体積和は $C_dL^d\varepsilon$ 以下です。$\varepsilon\downarrow0$ で像の外測度は $0$ です（定義域が立方体の一部に限られていても同じです）。

従って Lebesgue 零集合 $N$ に対し $F_t^{-1}(N)\cap A$ は逆写像による $N\cap F_t(A)$ の像なので零集合です。$\mu_0\ll\mathcal L^d$ から $\mu_t(N)=\mu_0(F_t^{-1}(N))=0$ となり、$t<1$ で $\mu_t$ も絶対連続です。こうして $dt$-ほとんどすべての時刻で $d\boldsymbol\rho=\rho(t,x)dt\,dx$、$d\boldsymbol m=m(t,x)dt\,dx$ と書け、$m=\rho v$ なら

$$
\mathscr A=\int_0^1\int_{\mathbb R^d}\frac{|m|^2}{\rho}dxdt.
$$

ただし $\mu_1$ には原子が残ってもよく、$t\uparrow1$ で密度が発散することはあります。時刻一点は空間時間作用の積分に寄与しません。

## 7. 境界があると何が変わるか

有界領域 $\Omega\subset\mathbb R^d$ では、境界を通って質量が出ていかない[no-flux 弱条件](../OTR17/index.md#def-otr17-no-flux)を要求する場合があります。**凸領域**なら、二つの点を結ぶ線分が領域の閉包から外れないため、最適結合の直線補間がそのまま使えます。

<a id="prop-otr19-convex-domain"></a>

<!-- formal-statement-start -->
> **命題（凸領域内の流体作用とW2）**  
> $\Omega\subset\mathbb R^d$ を有界・凸な $C^1$ 領域とし、$\mu_0,\mu_1\in\mathcal P_2(\mathbb R^d)$ の支持が $\overline\Omega$ に含まれるとする。曲線 $\mu_t$ と流束を $\overline\Omega$ に支持させ、任意の $\varphi\in C^1([0,1]\times\overline\Omega)$ に対して[no-flux 弱形式](../OTR17/index.md#def-otr17-no-flux)を要求した有限作用の許容対を考える。このとき

$$
\min\mathscr A=W_2(\mu_0,\mu_1)^2
$$

> であり、最小値は $\overline\Omega$ に支持された曲線で達成される。
<!-- formal-statement-end -->

### 証明の見取り図

下界は全空間でも正しいので変わりません。上界では、凸性が「最適結合の各線分が領域を出ない」ことを保証します。任意の境界まで定義された試験関数に沿って連鎖律を積分すれば境界流束なしの弱式になります。

<!-- proof-start -->
### 証明

全空間の[下界](#lem-otr19-lower)は領域内の許容対にも適用できます。実際、支持が $\overline\Omega$ にある測度を全空間へ拡張し、コンパクト支持の試験関数を制限すると全空間の弱式を満たすためです。

上界では端点の最適結合 $\pi$ の支持が $\overline\Omega\times\overline\Omega$ に含まれます。$\overline\Omega$ の凸性により $X_t(x,y)=(1-t)x+ty\in\overline\Omega$ です。[上界の補題](#lem-otr19-upper)と同じ $\mu_t$ と $\boldsymbol m$ を構成すると、支持はすべて $\overline\Omega$ 内にあり、作用は $W_2^2$ 以下です。

任意の $\varphi\in C^1([0,1]\times\overline\Omega)$ は閉領域近傍の $C^1$ 関数の制限として与えられるので、各線分上で連鎖律

$$
\frac{d}{dt}\varphi(t,X_t)
=\partial_t\varphi(t,X_t)+\nabla\varphi(t,X_t)\cdot(y-x)
$$

を使えます。$\overline\Omega$ は有界で $\varphi$ の導関数も有界だから、$\pi$ 積分と時間積分の交換は正当です。端点を評価すれば[no-flux 弱条件](../OTR17/index.md#def-otr17-no-flux)を満たします。下界と上界を挟めば等号と最小値の達成が得られます。$\square$
<!-- proof-end -->

非凸領域では同じ議論は成立しません。例えば環状領域 $\Omega=\{x\in\mathbb R^2:1<|x|<2\}$ で $a=(-3/2,0)$、$b=(3/2,0)$ を取ります。$W_2(\delta_a,\delta_b)^2=|b-a|^2=9$ ですが、線分は $|x|\le1$ の穴を横切ります。$\overline\Omega$ 内の連続軌道は必ず直線 $x_1=0$ 上の点 $z=(0,z_2)$ で $|z_2|\ge1$ を通るので、その長さは三角不等式により

$$
L\ge|a-z|+|z-b|
\ge2\sqrt{(3/2)^2+1^2}=\sqrt{13}>3.
$$

その二乗作用は時間 Cauchy–Schwarz から $L^2\ge13$ 以上です。有限作用の保存則には[OTR18の軌道表現](../OTR18/index.md#thm-otr18-superposition)が使えるので、粒子の全軌道にこの下界が適用されます。この差は、**全空間の静的費用に境界制約を後付けしても同じ最小化問題にならない**ことを示しています。

## 8. 計算例で等号と不等号を区別する

### 一様分布の平行移動

$\mu_0=\boldsymbol1_{[0,1]}dx$、$\mu_1=\boldsymbol1_{[2,3]}dx$ とします。$X_t(x)=x+2t$ による押し出しは $\mu_t=\boldsymbol1_{[2t,1+2t]}dx$、密度は $\rho(t,z)=\boldsymbol1_{[2t,1+2t]}(z)$、流束は $m(t,z)=2\rho(t,z)$ です。支持の内側で $|m|^2/\rho=4\rho$、外側は $\rho=m=0$ なので

$$
\mathscr A=\int_0^1\int_{2t}^{1+2t}4\,dzdt=4.
$$

[一次元の分位点公式](../OTR11/index.md#thm-otr11-quantile-formula)でも $W_2^2=\int_0^1|(u+2)-u|^2du=4$ です。真空にある流束はゼロとしたため、定義の無限作用の枝は現れません。

### 二つの原子が合流する

$\mu_0=\tfrac12\delta_{-1}+\tfrac12\delta_1$、$\mu_1=\delta_0$ とします。最適結合は両原子を $0$ へ結ぶものだけで、$W_2^2=(1/2)1^2+(1/2)1^2=1$。補間は

$$
\mu_t=\tfrac12\delta_{-(1-t)}+\tfrac12\delta_{1-t},
\qquad
v(t,\mp(1-t))=\pm1\quad(0<t<1).
$$

各時刻の速度二乗の質量平均は $\tfrac12+\tfrac12=1$、作用も $1$ です。合流時刻 $t=1$ の速度の多価性は時間積分に影響しません。

### 同じ端点でも急ぐと損をする

$\mu_t=\delta_{t^2}$、$v(t,x)=2t$ は $\delta_0$ から $\delta_1$ への許容曲線ですが、

$$
\mathscr A=\int_0^1(2t)^2dt=\frac43
>W_2(\delta_0,\delta_1)^2=1.
$$

一般に $\mu_t=\delta_{f(t)}$、$f(0)=a$、$f(1)=b$、$f$ 絶対連続で $f'\in L^2$ なら、$\int_0^1|f'|^2dt\ge|b-a|^2$。等号は $f'(t)=b-a$ がほとんど至る所で一定のときです。距離を固定して時間の使い方だけ変えると、二乗作用は変わります。

## 9. 演習：定義・構成・反例を自分で検算する

### OTR19-A01 真空規約と速度の復元
- Level: A

一点での質量密度 $r\ge0$ と流束密度 $z\in\mathbb R$ について、$\Psi(2,3)$、$\Psi(0,0)$、$\Psi(0,1)$ を求めよ。また $r=2,z=3$ での速度と、$r|v|^2=\Psi(r,z)$ を検証せよ。

<!-- solution-start -->
**詳細解答**。[流体作用の真空規約](#def-otr19-fluid-action)から、$r=2>0$ のとき $\Psi(2,3)=3^2/2=9/2$。$r=0,z=0$ は定義で $0$、$r=0,z=1$ は無限大です。$m=rv$ に対応して $v=z/r=3/2$ なので

$$
r|v|^2=2\left(\frac32\right)^2
=2\cdot\frac94=\frac92=\Psi(2,3).
$$

質量がないのに非零流束を流す場合と、質量も流束もない真空を区別できました。
<!-- solution-end -->

### OTR19-A02 移動Diracの弱式と作用
- Level: A

$b\in\mathbb R$、$\mu_t=\delta_{bt}$（$0\le t\le1$）、$v(t,x)=b$ とする。空間時間測度で流束を定め、許容対の弱式・作用・端点の $W_2^2$ を計算せよ。

<!-- solution-start -->
**詳細解答**。$\boldsymbol\rho=dt\,\delta_{bt}(dx)$、$\boldsymbol m=b\boldsymbol\rho$ と置くと、速度は Borel 可測で $\int|v|d\boldsymbol\rho=|b|<\infty$、流束は有限測度です。$W_2(\delta_{bs},\delta_{bt})=|b||t-s|$ で曲線は狭義連続、二次モーメントは $b^2t^2$ で有限です。

任意の $\varphi\in C_c^1([0,1]\times\mathbb R)$ に対し

$$
\begin{aligned}
\int_Q\partial_t\varphi\,d\boldsymbol\rho
+\int_Q\partial_x\varphi\,d\boldsymbol m
&=\int_0^1\bigl(\partial_t\varphi(t,bt)+b\partial_x\varphi(t,bt)\bigr)dt\\
&=\int_0^1\frac{d}{dt}\varphi(t,bt)dt\\
&=\varphi(1,b)-\varphi(0,0).
\end{aligned}
$$

これは指定端点の弱式です。[作用と速度の同値](#lem-otr19-velocity)から $\mathscr A=\int_0^1b^2dt=b^2$、Dirac同士の結合は一つなので $W_2^2(\delta_0,\delta_b)=|b|^2$。密度がなくても等号です。
<!-- solution-end -->

### OTR19-A03 平行移動する密度と流束
- Level: A

$\mu_0$ を $[0,2]$ 上の密度 $1/2$ の一様確率測度とし、$\mu_t=(x\mapsto x+3t)_\#\mu_0$ とする。密度 $\rho$ と流束密度 $m$、作用、端点間の $W_2^2$ を求めよ。

<!-- solution-start -->
**詳細解答**。区間の長さは $2$ なので質量は $\int_0^2(1/2)dx=1$ です。$\rho(t,z)=\tfrac12\boldsymbol1_{[3t,2+3t]}(z)$、速度は $v=3$、従って $m=\rho v=\tfrac32\boldsymbol1_{[3t,2+3t]}$ です。支持外では $\rho=m=0$ で[真空規約](#def-otr19-fluid-action)が適用され、支持内では

$$
\frac{|m|^2}{\rho}=\frac{(3/2)^2}{1/2}=\frac92.
$$

よって $\mathscr A=\int_0^1\int_{3t}^{2+3t}(9/2)dzdt=9$。同一初期点を距離 $3$ だけ動かす結合により $W_2^2\le9$。逆に任意の結合 $(X,Y)$ では平均差 $E[Y-X]=3$ なので $E|Y-X|^2\ge|E[Y-X]|^2=9$。従って $W_2^2=9=\mathscr A$ です。
<!-- solution-end -->

### OTR19-A04 再パラメータ化の損失
- Level: A

$p>1/2$ とし、$\mu_t=\delta_{t^p}$、$v(t,x)=pt^{p-1}$（$0<t\le1$）を考える。$\mathscr A$ を求め、$p=1$ のみが端点の静的費用に一致することを示せ。

<!-- solution-start -->
**詳細解答**。$f(t)=t^p$ は $[0,1]$ で絶対連続、$f'(t)=pt^{p-1}$ が $t>0$ で成り立ちます。$p>1/2$ なら指数 $2p-2>-1$ なので

$$
\mathscr A=\int_0^1p^2t^{2p-2}dt
=p^2\left[\frac{t^{2p-1}}{2p-1}\right]_0^1
=\frac{p^2}{2p-1}.
$$

端点は $\delta_0,\delta_1$ で $W_2^2=1$。差を共通分母でまとめると

$$
\frac{p^2}{2p-1}-1
=\frac{p^2-2p+1}{2p-1}
=\frac{(p-1)^2}{2p-1}\ge0.
$$

分母は正なので、等号は $p=1$ のときだけです。$t=0$ の速度値は単一時刻ゆえ作用には影響しません。
<!-- solution-end -->

### OTR19-A05 有限作用だけで保存則は従うか
- Level: A

$\mu_t=\delta_0$（すべての $t\in[0,1]$）に対し $\boldsymbol m=c\,dt\,\delta_0(dx)$（$c\ne0$）とする。作用を求め、[許容対の定義](#def-otr19-admissible)を満たさない試験関数を一つ構成せよ。

<!-- solution-start -->
**詳細解答**。$\boldsymbol\rho=dt\,\delta_0(dx)$ と $\boldsymbol m=c\boldsymbol\rho$ は有限測度であり、作用は $\mathscr A=\int_0^1c^2dt=c^2<\infty$ です。しかし $\chi\in C_c^1(\mathbb R)$ を $0$ の近傍で $1$ とし、$\varphi(t,x)=x\chi(x)$ と置きます。$\varphi(t,0)=0$、$\partial_t\varphi=0$、$\partial_x\varphi(t,0)=1$ なので

$$
\underbrace{\int\varphi(1)d\mu_1-\int\varphi(0)d\mu_0}_{=0}
\ne\underbrace{\int_Q\partial_t\varphi\,d\boldsymbol\rho
+\int_Q\partial_x\varphi\,d\boldsymbol m}_{=c}.
$$

従って弱式が破れます。有限作用は流束の積分可能性を保証しても、質量分布と流束が保存則で整合することまでは保証しません。
<!-- solution-end -->

### OTR19-B01 速度を平均したときの凸性
- Level: B

$\boldsymbol\rho=dt\,\delta_0(dx)$ とし、流束測度 $\boldsymbol m_+=\boldsymbol\rho$、$\boldsymbol m_-=-\boldsymbol\rho$ を考える。それぞれの作用と、$\boldsymbol m_\theta=(1-\theta)\boldsymbol m_++\theta\boldsymbol m_-$（$0\le\theta\le1$）の作用を計算し、凸性の不等式を検証せよ。これらが必ずしも許容対でないことも述べよ。

<!-- solution-start -->
**詳細解答**。二つの速度は $v_+=1$、$v_-=-1$ で、質量測度の全質量が $\int_0^1 1dt=1$ なので各作用は $1$ です。混合流束の密度は

$$
\boldsymbol m_\theta=((1-\theta)-\theta)\boldsymbol\rho
=(1-2\theta)\boldsymbol\rho.
$$

従って $\mathscr A(\boldsymbol\rho,\boldsymbol m_\theta)=(1-2\theta)^2\le1=(1-\theta)\cdot1+\theta\cdot1$。差は

$$
1-(1-2\theta)^2=4\theta(1-\theta)\ge0.
$$

$\theta=1/2$ なら平均流束は $0$ で作用も $0$ です。一方、$\theta\ne1/2$ では前問と同様に $\varphi(t,x)=x\chi(x)$（$\chi\in C_c^1$ は $0$ の近くで $1$）を試験すると、[許容対の弱式](#def-otr19-admissible)の左辺は $0$、右辺は $1-2\theta\ne0$ です。従って $\theta\ne1/2$ の対は許容対でなく、$\theta=1/2$ の対のみ静止した測度の許容対です。作用の凸性は保存則とは別の数学的性質です。
<!-- solution-end -->

### OTR19-B02 Gaussianの伸縮を密度で確かめる
- Level: B

$\mu_0=N(0,1)$、$\mu_1=N(0,4)$（第二引数は分散）を $\mathbb R$ 上の確率測度とする。$T(x)=2x$ で運ぶ補間 $\mu_t=(x\mapsto(1+t)x)_\#\mu_0$ について、確率密度 $\rho(t,z)$、速度 $v(t,z)$、流束 $m=\rho v$ を与え、作用と $W_2^2$ を照合せよ。

<!-- solution-start -->
**詳細解答**。初期確率変数 $X\sim N(0,1)$ とすれば $Z_t=(1+t)X\sim N(0,(1+t)^2)$ です。$1+t>0$ なので密度変換から

$$
\rho(t,z)=\frac1{\sqrt{2\pi}(1+t)}
\exp\left(-\frac{z^2}{2(1+t)^2}\right).
$$

軌道の時間微分は $\dot Z_t=X=Z_t/(1+t)$ で、従って $v(t,z)=z/(1+t)$、$m(t,z)=\rho(t,z)z/(1+t)$ です。連鎖律を $E[\varphi(t,Z_t)]$ に適用すると[許容対の弱式](#def-otr19-admissible)も成立します。各時刻の作用密度を積分すると

$$
\int_{\mathbb R}\frac{|m|^2}{\rho}dz
=E\left[\frac{Z_t^2}{(1+t)^2}\right]
=\frac{(1+t)^2E[X^2]}{(1+t)^2}=1.
$$

よって $\mathscr A=\int_0^1 1dt=1$。$T$ は増加写像で[一次元の単調結合](../OTR11/index.md#thm-otr11-quantile-formula)を与えるため最適であり、$W_2^2=E|2X-X|^2=E[X^2]=1$。両者は一致します。
<!-- solution-end -->

### OTR19-B03 非最適結合を補間するとどうなるか
- Level: B

$\mu_0=\mu_1=\tfrac12\delta_{-1}+\tfrac12\delta_1$ とする。結合 $\pi$ が質量 $1/2$ を $(-1,1)$ と $(1,-1)$ に置く場合、直線補間した $\mu_t$ と有限作用の速度場を示し、その作用と静的 $W_2^2$ を比較せよ。

<!-- solution-start -->
**詳細解答**。二軌道は $\gamma_t^-=-1+2t$、$\gamma_t^+=1-2t$ で、各質量は $1/2$ です。従って

$$
\mu_t=\tfrac12\delta_{-1+2t}+\tfrac12\delta_{1-2t}.
$$

$t\ne1/2$ では位置が異なり、$v(t,-1+2t)=2$、$v(t,1-2t)=-2$ とできます。$t=1/2$ では二原子が合流するので速度を $0$ と定めても時間積分は変わりません。二本の軌道に沿う連鎖律を各 $1/2$ 倍して加えれば[弱形式](#def-otr19-admissible)が成立します。作用は

$$
\mathscr A=\int_0^1\left(\tfrac12\cdot2^2+\tfrac12\cdot(-2)^2\right)dt=4.
$$

一方、同一の測度を結ぶ恒等結合を使えば費用 $0$、従って $W_2(\mu_0,\mu_1)^2=0$ です。非最適な結合の直線補間でも保存則は成り立ちますが、その作用は静的最小値と一致するとは限りません。
<!-- solution-end -->

### OTR19-B04 凸領域でのno-flux
- Level: B

$\Omega=(0,4)$、$\mu_0=\boldsymbol1_{[1,2]}dx$、$\mu_1=\boldsymbol1_{[2,3]}dx$ とする。$\mu_t=\boldsymbol1_{[1+t,2+t]}dx$ と一定速度 $v=1$ が[no-flux弱条件](../OTR17/index.md#def-otr17-no-flux)を満たすことを示し、領域内の最小作用を求めよ。

<!-- solution-start -->
**詳細解答**。$\Omega$ は有界凸で境界が二点の $C^1$ 領域、各時刻の支持は $[1+t,2+t]\subset[1,3]\subset\Omega$ です。任意の $\varphi\in C^1([0,1]\times[0,4])$ に対し、$z=x+t$ と置いて

$$
\begin{aligned}
\int_0^1\int_{1+t}^{2+t}(\partial_t\varphi+\partial_z\varphi)dzdt
&=\int_1^2\int_0^1\frac{d}{dt}\varphi(t,x+t)dtdx\\
&=\int_1^2[\varphi(1,x+1)-\varphi(0,x)]dx.
\end{aligned}
$$

最後の式は端点測度での積分差です。従って no-flux 弱式が成立します。作用は $\int_0^1\int_{1+t}^{2+t}1^2dzdt=1$。任意の結合の平均移動距離は $1$ なので Jensen より $W_2^2\ge1$、この平行移動結合の費用も $1$。従って[凸領域での定理](#prop-otr19-convex-domain)から領域内の最小作用は $1$ です。
<!-- solution-end -->

### OTR19-C01 Benamou–Brenier公式を原子測度で再構成する
- Level: C

$\mu_0=\tfrac13\delta_0+\tfrac23\delta_3$、$\mu_1=\tfrac13\delta_1+\tfrac23\delta_5$ とする。次の問いに答えよ。

1. 一次元の最適結合と $W_2^2$ を求めよ。
2. 直線補間の質量・流束測度を定め、弱式と作用を検証せよ。
3. 任意の別の有限作用の許容対に対する下界を示し、最小値と最小値達成を結論せよ。

<!-- solution-start -->
**詳細解答**。(1) 出発点と到着点はともに昇順で、質量が対応しています。[一次元の単調結合の最適性](../OTR11/index.md#thm-otr11-quantile-formula)から、$\pi=\tfrac13\delta_{(0,1)}+\tfrac23\delta_{(3,5)}$ が最適です。各移動距離は $1$ と $2$ なので

$$
W_2^2=\frac13|1-0|^2+\frac23|5-3|^2
=\frac13+\frac83=3.
$$

(2) 二軌道 $\gamma_t^1=t$、$\gamma_t^2=3+2t$ に重み $1/3,2/3$ を置きます。$0\le t\le1$ で二点は衝突しないので

$$
\mu_t=\frac13\delta_t+\frac23\delta_{3+2t},
\qquad v(t,t)=1,\quad v(t,3+2t)=2.
$$

$\boldsymbol\rho=dt\,d\mu_t$、$\boldsymbol m=v\boldsymbol\rho$ と定めると流束は有限です。任意の空間方向にコンパクトな台を持つ $C^1$ 試験関数 $\varphi$ に対し

$$
\begin{aligned}
&\int_Q\partial_t\varphi d\boldsymbol\rho
+\int_Q\partial_x\varphi d\boldsymbol m\\
&=\frac13\int_0^1\frac{d}{dt}\varphi(t,t)dt
+\frac23\int_0^1\frac{d}{dt}\varphi(t,3+2t)dt\\
&=\frac13[\varphi(1,1)-\varphi(0,0)]
+\frac23[\varphi(1,5)-\varphi(0,3)],
\end{aligned}
$$

これは二端点の積分差です。作用は

$$
\mathscr A=\int_0^1\left(\frac13\cdot1^2+\frac23\cdot2^2\right)dt
=3.
$$

(3) 任意の有限作用許容対 $(\tilde{\boldsymbol\rho},\tilde{\boldsymbol m})$ では[速度場の同値](#lem-otr19-velocity)により $\tilde{\boldsymbol m}=\tilde v\tilde{\boldsymbol\rho}$、続いて[OTR18の速度評価](../OTR18/index.md#thm-otr18-velocity-bound)から

$$
\begin{aligned}
\sqrt3=W_2(\mu_0,\mu_1)
&\le\int_0^1|\tilde\mu'|(t)dt\\
&\le\int_0^1\|\tilde v_t\|_{L^2(\tilde\mu_t)}dt\\
&\le\left(\int_0^1\|\tilde v_t\|_{L^2(\tilde\mu_t)}^2dt\right)^{1/2}
=\sqrt{\mathscr A(\tilde{\boldsymbol\rho},\tilde{\boldsymbol m})}.
\end{aligned}
$$

よって任意の許容対の作用は $3$ 以上、(2) の対が作用 $3$ を実現するため、最小値は $3=W_2^2$ で達成されます。主定理の二つの方向を具体的に再構成できました。
<!-- solution-end -->

### OTR19-C02 一様密度が原子に崩壊するとき
- Level: C

$\mu_0=\boldsymbol1_{[0,1]}dx$、$\mu_1=\delta_0$ とする。輸送写像 $T(x)=0$ の直線補間 $X_t(x)=(1-t)x$ について次を示せ。

1. $0\le t<1$ の密度 $\rho$ と速度・流束を求めよ。
2. 弱式と $\rho=0$ での規約を確かめよ。
3. 作用と $W_2^2$ を求めよ。
4. $t\uparrow1$ で通常の密度表示がどうなるか説明せよ。

<!-- solution-start -->
**詳細解答**。(1) 初期位置 $x\in[0,1]$ が一様で $z=(1-t)x$ です。$0\le t<1$ なら逆変換 $x=z/(1-t)$、Jacobian $dx/dz=1/(1-t)$、像は $[0,1-t]$。従って

$$
\rho(t,z)=\frac1{1-t}\boldsymbol1_{[0,1-t]}(z),
\qquad
v(t,z)=-\frac{z}{1-t}
\quad (0<t<1,\ 0\le z\le1-t).
$$

軌道速度は $\partial_tX_t(x)=-x$ なので $v(t,X_t(x))=-x$ です。流束は

$$
m(t,z)=\rho(t,z)v(t,z)
=-\frac{z}{(1-t)^2}\boldsymbol1_{[0,1-t]}(z).
$$

(2) 支持外では $\rho=m=0$ なので真空作用は $0$。$\rho>0$ の部分だけで $|m|^2/\rho$ を計算します。任意の $\varphi\in C_c^1([0,1]\times\mathbb R)$ に対し、$X_t(x)=(1-t)x$ と置いて

$$
\begin{aligned}
&\int_0^1\int(\partial_t\varphi+v\partial_z\varphi)\rho\,dzdt\\
&=\int_0^1\int_0^1[\partial_t\varphi(t,(1-t)x)-x\partial_z\varphi(t,(1-t)x)]dxdt\\
&=\int_0^1[\varphi(1,0)-\varphi(0,x)]dx
=\varphi(1,0)-\int_0^1\varphi(0,x)dx.
\end{aligned}
$$

これが $\mu_1=\delta_0$ を含む端点弱式です。被積分項は有界な試験関数の導関数と $|x|\le1$ で支配されるため、交換は正当です。

(3) 速度二乗は $x^2$ に等しいので

$$
\begin{aligned}
\mathscr A&=\int_0^1\int_0^{1-t}\frac{z^2}{(1-t)^3}dzdt\\
&=\int_0^1\frac{(1-t)^3}{3(1-t)^3}dt=\frac13.
\end{aligned}
$$

到着点が常に $0$ なので端点結合は唯一で、$W_2^2=\int_0^1|x-0|^2dx=[x^3/3]_0^1=1/3$ です。

(4) $\rho(t,z)$ の高さは $1/(1-t)\to\infty$、支持区間の長さは $1-t\to0$。ただし質量は各時刻 $\int\rho dz=1$ で、任意の有界連続 $f$ に対し $\int_0^1 f((1-t)x)dx\to f(0)$ なので測度としては $\delta_0$ へ収束します。終点に密度は存在しませんが、単一時刻は $dt$-積分に寄与せず有限作用の結論を妨げません。
<!-- solution-end -->

## 10. 今回の結論と次の問い

- 適切な弱い保存則、有限二次モーメント、真空での流束の規約の下で、**静的な最適輸送費用 $W_2^2$ と動的な最小作用は一致**します。
- 下界には[OTR18の速度場評価](../OTR18/index.md#thm-otr18-velocity-bound)、上界には[OTR15の変位補間](../OTR15/index.md#thm-otr15-displacement-geodesic)を使います。最小値は実際に達成されます。
- 密度表示 $|m|^2/\rho$ は便利ですが、一般の測度では流束を測度として扱う必要があります。凸領域ならno-fluxと直線補間は両立しますが、非凸領域では幾何的制約が変わります。

次の OTR20 では、同じ密度変化を生む速度場が複数あるとき、**どの速度場が最小作用を持つか**を調べます。それが確率測度空間の「接方向」を考える入口になります。
