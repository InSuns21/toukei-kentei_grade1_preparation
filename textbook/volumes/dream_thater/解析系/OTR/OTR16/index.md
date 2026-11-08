# OTR16 汎関数の凸性は測地線で変わるか

[OTR15の変位補間](../OTR15/index.md#def-otr15-displacement-interpolation)では、確率分布の粒子を最適結合に従って直線移動させると、$W_2$ に関する最短経路が得られました。では、その途中で「分布に割り当てたエネルギー」は凸関数のように振る舞うでしょうか。

実数の凸性は、二つの数を線形補間して測ります。しかし確率測度では、[分布の線形混合](../OTR15/index.md#def-otr15-linear-mixture)と変位補間が異なります。ここではまず凸性の測り方を区別し、位置・粒子間相互作用・密度そのものに依存する三種類のエネルギーを調べます。最後の種類には、輸送写像の **Jacobian（微分行列の行列式）** が必要になります。

## 1. どの経路に沿って凸性を問うか

通常の凸関数 $f$ は、直線上の点 $(1-t)x+ty$ で $f((1-t)x+ty)\le(1-t)f(x)+tf(y)$ を満たします。測度の空間で直線の役割を担うのは、[最適結合から作る定速測地線](../OTR15/index.md#thm-otr15-displacement-geodesic)です。

さらに曲率を数値で測るため、実数 $\lambda$ による二次補正を入れます。$\lambda=0$ が普通の凸性、正なら両端を結ぶ弦より定量的に低くなる条件、負なら一定の凹みを許す条件です。以下では値が有限の測度だけを比較し、$-\infty$ を取る汎関数は扱いません。

<a id="def-otr16-lambda-convexity"></a>

<!-- formal-statement-start -->
> **定義（Wasserstein測地線に沿うlambda凸性）**
> $d\ge1$、$\lambda\in\mathbb R$ とする。汎関数 $\mathcal F:\mathcal P_2(\mathbb R^d)\to\mathbb R\cup\{+\infty\}$ が **$\lambda$-変位凸（$\lambda$-geodesically convex）** であるとは、$\mathcal F(\mu_0),\mathcal F(\mu_1)<\infty$ を満たす任意の端点と、任意の二次費用最適結合 $\pi\in\Pi(\mu_0,\mu_1)$ について、$\mu_t=((1-t)x+ty)_{\#}\pi$ が有限値を持ち、すべての $t\in[0,1]$ で

$$
\mathcal F(\mu_t)\le(1-t)\mathcal F(\mu_0)+t\mathcal F(\mu_1)
-\frac{\lambda}{2}t(1-t)W_2^2(\mu_0,\mu_1)
$$

> が成立することをいう。$\lambda=0$ の場合を **変位凸** という。
<!-- formal-statement-end -->

<!-- definition-example-start: def-otr16-lambda-convexity -->
**定義の確認**。$\mu_0=\delta_a,\ \mu_1=\delta_b$ とします。結合は $\delta_{(a,b)}$ だけなので、変位補間は $\delta_{(1-t)a+tb}$、距離は $|a-b|$ です。$\mathcal F(\delta_x)=\kappa|x|^2/2$ と置けば、

$$
|(1-t)a+tb|^2=(1-t)|a|^2+t|b|^2-t(1-t)|a-b|^2.
$$

従って定義の不等式は $\lambda=\kappa$ で等号です。端点、経路、補正項をそれぞれ確かめられました。
<!-- definition-example-end -->

ここで「任意の最適結合」としたのは、最短経路が一意とは限らないためです。「少なくとも一つの測地線に沿う凸性」という弱い定義も使われますが、本章で証明する位置・凸相互作用の結果は任意の最適結合に対して成立します。後半の密度に依存するエネルギーについては、滑らかな写像が作る測地線に限定して証明します。

## 2. 外場による位置エネルギー

分布の各粒子が位置 $x$ でポテンシャル $V(x)$ を持つとき、全体の平均エネルギーは $V$ の積分です。粒子間の相互作用はここでは含みません。

<a id="def-otr16-potential-energy"></a>

<!-- formal-statement-start -->
> **定義（位置エネルギー）**
> $d\ge1$ とし、連続関数 $V:\mathbb R^d\to\mathbb R$ が $|V(x)|\le C(1+|x|^2)$ を満たすとする。$\mu\in\mathcal P_2(\mathbb R^d)$ の位置エネルギーを

$$
\mathcal V(\mu)=\int_{\mathbb R^d}V(x)\,d\mu(x)
$$

> と定める。二次成長条件と有限二次モーメントにより積分は有限である。
<!-- formal-statement-end -->

<!-- definition-example-start: def-otr16-potential-energy -->
**定義の確認**。$d=1,\ V(x)=x^2/2$、$\mu=\frac14\delta_{-2}+\frac34\delta_2$ とすると、両原子の質量は非負で和は $1$、二次モーメントは $4$ で有限です。$|V(x)|\le(1+|x|^2)/2$ だから成長条件を満たし、

$$
\mathcal V(\mu)=\frac14\frac{(-2)^2}{2}+\frac34\frac{2^2}{2}=2.
$$
<!-- definition-example-end -->

Hessian $D^2V(x)$ は二階偏微分を並べた実対称行列です。$D^2V(x)\succeq\lambda I$ とは、すべてのベクトル $v$ について $v^{\mathsf T}D^2V(x)v\ge\lambda|v|^2$ という意味です。これは各直線への制限の二階微分を下から押さえます。

<a id="thm-otr16-potential"></a>

<!-- formal-statement-start -->
> **定理（位置エネルギーのlambda変位凸性）**
> $d\ge1$、$\lambda\in\mathbb R$ とする。$V\in C^2(\mathbb R^d)$ が $|V(x)|\le C(1+|x|^2)$ およびすべての $x,v\in\mathbb R^d$ に対して

$$
v^{\mathsf T}D^2V(x)v\ge\lambda|v|^2
$$

> を満たすなら、$\mathcal V(\mu)=\int V\,d\mu$ は $\mathcal P_2(\mathbb R^d)$ 上で $\lambda$-変位凸である。
<!-- formal-statement-end -->

### 証明の見取り図

一つの粒子が $x$ から $y$ へ動く線分上で二階微分を評価し、その不等式を最適結合で積分します。[変位補間](../OTR15/index.md#def-otr15-displacement-interpolation)の押し出しにより、線分上の積分が中間測度の位置エネルギーそのものになります。

<!-- proof-start -->
### 証明

$\mu_0,\mu_1\in\mathcal P_2$ と最適結合 $\pi$ を固定し、任意の $(x,y)$ で $z_t=(1-t)x+ty$、$g(t)=V(z_t)$ と置きます。連鎖律とHessianの仮定より

$$
g''(t)=(y-x)^{\mathsf T}D^2V(z_t)(y-x)\ge\lambda|y-x|^2.
$$

$h(t)=g(t)-\lambda|y-x|^2t^2/2$ は $h''(t)\ge0$ で凸です。凸性を $0,1$ 間に適用し、

$$
\begin{aligned}
g(t)-\frac{\lambda}{2}|y-x|^2t^2
&\le(1-t)g(0)+t\left(g(1)-\frac{\lambda}{2}|y-x|^2\right),\\
g(t)&\le(1-t)V(x)+tV(y)
-\frac{\lambda}{2}t(1-t)|x-y|^2.
\end{aligned}
$$

$\pi$ に関して積分します。二次成長と周辺測度の二次モーメントにより各項は絶対可積分です。[押し出し測度による変位補間](../OTR15/index.md#def-otr15-displacement-interpolation)を左辺に、周辺条件を右辺に使い、最適性から $\int|x-y|^2\,d\pi=W_2^2(\mu_0,\mu_1)$ なので

$$
\mathcal V(\mu_t)\le(1-t)\mathcal V(\mu_0)+t\mathcal V(\mu_1)
-\frac{\lambda}{2}t(1-t)W_2^2(\mu_0,\mu_1).
$$

任意の最適結合で示したので定義を満たします。$\square$
<!-- proof-end -->

$V(x)=-|x|^2$ のHessianは $-2I$ です。この場合は $(-2)$-変位凸ですが、$0$-変位凸とは限りません。実際 $\delta_{-1}$ と $\delta_1$ の中点は $\delta_0$ で、エネルギー $0$ は両端の値 $-1$ の平均を超えます。**Hessianの下界を「正の凸性」と取り違えない**ことが重要です。

## 3. 粒子どうしの相互作用エネルギー

位置エネルギーは粒子一個ずつの和でした。粒子同士の距離や向きに応じて作用する場合、二つの独立な粒子 $X,X'$ の差 $X-X'$ を用います。全ての対を二回数えるため、慣例的に係数 $1/2$ を付けます。

<a id="def-otr16-interaction-energy"></a>

<!-- formal-statement-start -->
> **定義（相互作用エネルギー）**
> $d\ge1$ とし、連続な偶関数 $W:\mathbb R^d\to\mathbb R$ が $|W(z)|\le C(1+|z|^2)$ を満たすとする。$\mu\in\mathcal P_2(\mathbb R^d)$ の相互作用エネルギーを

$$
\mathcal W(\mu)=\frac12\int_{\mathbb R^d}\int_{\mathbb R^d}
W(x-x')\,d\mu(x')\,d\mu(x)
$$

> と定める。$W(-z)=W(z)$ は粒子の順序を入れ替えても値が同じことを表す。
<!-- formal-statement-end -->

<!-- definition-example-start: def-otr16-interaction-energy -->
**定義の確認**。$\mu=\frac12(\delta_{-1}+\delta_1)$、$W(z)=z^2$ なら偶性・連続性・二次成長を満たし、$\mu$ の二次モーメントは $1$ です。対 $(x,x')$ は四通りで、それぞれ重み $1/4$ です。同じ点の対は費用 $0$、異なる点の二対は費用 $4$ なので

$$
\mathcal W(\mu)=\frac12\left(\frac14\cdot4+\frac14\cdot4\right)=1.
$$
<!-- definition-example-end -->

$W$ が凸なら、二粒子の差も線形に補間されることから変位凸性が生まれます。ただし全粒子を同じベクトルだけ移動しても差は変わりません。この事実が、位置エネルギーとの決定的な違いです。

<a id="thm-otr16-interaction"></a>

<!-- formal-statement-start -->
> **定理（相互作用エネルギーの変位凸性）**
> $d\ge1$ とし、$W\in C^2(\mathbb R^d)$ が偶関数、二次成長で、$D^2W(z)\succeq\lambda I$ をすべての $z$ で満たすとする。二次費用最適結合 $\pi$ に沿う変位補間 $\mu_t$ と重心 $m_i=\int x\,d\mu_i(x)$ に対し

$$
\begin{aligned}
\mathcal W(\mu_t)\le {}&(1-t)\mathcal W(\mu_0)+t\mathcal W(\mu_1)\\
&-\frac{\lambda}{2}t(1-t)
\left(W_2^2(\mu_0,\mu_1)-|m_1-m_0|^2\right).
\end{aligned}
$$

> 特に $W$ が凸（$\lambda=0$）なら $\mathcal W$ は任意の最適結合に沿って $0$-変位凸である。
<!-- formal-statement-end -->

### 証明の見取り図

結合 $\pi$ から二組 $(x,y)$、$(x',y')$ を独立に取ります。両粒子の相対位置 $x-x'$ は時刻 $t$ に $(1-t)(x-x')+t(y-y')$ へ動きます。二点の移動量の差が補正項となり、重心の移動だけが差し引かれます。

<!-- proof-start -->
### 証明

$\delta=y-x$、$\delta'=y'-x'$ と記します。$W$ のHessian下界に[位置エネルギーの証明](#thm-otr16-potential)と同じ一変数の計算を、今度は $z=x-x'$、$w=y-y'$ に適用すると

$$
W((1-t)z+tw)\le(1-t)W(z)+tW(w)
-\frac{\lambda}{2}t(1-t)|\delta-\delta'|^2.
$$

$\pi\otimes\pi$ で積分し $1/2$ を掛けます。二つの組は独立で、各時刻の点の周辺は $\mu_t$ だから左辺は $\mathcal W(\mu_t)$ です。二乗差を展開して

$$
\begin{aligned}
\int|\delta-\delta'|^2\,d(\pi\otimes\pi)
&=2\int|\delta|^2\,d\pi
-2\left|\int\delta\,d\pi\right|^2\\
&=2\left(W_2^2(\mu_0,\mu_1)-|m_1-m_0|^2\right).
\end{aligned}
$$

最初の等号は独立性により $\int\delta\cdot\delta'\,d(\pi\otimes\pi)=|\int\delta\,d\pi|^2$、次の等号は最適性と $\int(y-x)d\pi=m_1-m_0$ によります。係数は $1/2$（エネルギーの定義）と $\lambda/2$（凸性の補正）と二乗差の $2$ で、結論の $\lambda/2$ になります。$\square$
<!-- proof-end -->

右辺の括弧は非負です。なぜなら $\int|\delta|^2\,d\pi-|\int\delta\,d\pi|^2$ は移動ベクトルの分散だからです。ただし $\lambda>0$ でも一律に $\lambda$-変位凸とは結論できません。$\mu_1$ が $\mu_0$ の平行移動なら $\delta$ は一定、括弧は $0$ で、$\mathcal W$ も一定です。非零距離の平行移動測地線に対し正の $\lambda$ の定義を満たすことはできません。

## 4. 密度の変化を測る内部エネルギー

相互作用までの二種類は測度の積分で済みました。一方、密度が一か所に集中すること自体に費用を課すには、確率密度 $\rho$ の値を関数 $U$ に通して積分します。$\mu$ が密度を持つことは、Lebesgue測度 $\mathcal L^d$ に関して $d\mu=\rho(x)\,dx$ と書けることです。

<a id="def-otr16-internal-energy"></a>

<!-- formal-statement-start -->
> **定義（内部エネルギー）**
> $d\ge1$、連続関数 $U:[0,\infty)\to\mathbb R$ が $U(0)=0$ を満たすとする。$\mu\in\mathcal P_2(\mathbb R^d)$ がLebesgue密度 $\rho\ge0$ を持ち、$U(\rho)$ が絶対可積分であるとき、その内部エネルギーを

$$
\mathcal U(\mu)=\int_{\mathbb R^d}U(\rho(x))\,dx
$$

> と定める。本章の比較では、この積分が有限な密度を用いる。密度のない測度での値を $+\infty$ とする拡張は、追加の条件の下で別途考える。
<!-- formal-statement-end -->

<!-- definition-example-start: def-otr16-internal-energy -->
**定義の確認**。$\rho=\boldsymbol{1}_{[0,2]}/2$ は非負で積分が $1$、二次モーメントは $\int_0^2 x^2/2\,dx=4/3$ です。$U(r)=r\log r$（$U(0)=0$ と連続延長）なら、台の外で積分への寄与はなく

$$
\mathcal U(\mu)=\int_0^2\frac12\log\frac12\,dx=-\log2.
$$

負の値でも問題ありません。これはShannon entropyの符号を反転した、密度の **Boltzmann entropy** です。
<!-- definition-example-end -->

このエネルギーは $\rho_t$ を直接計算しないと評価できません。滑らかで一対一の輸送写像 $T$ によって質量を動かすとき、体積の倍率は $J(x)=\det DT(x)$ です。小さな体積 $dx$ に入っていた質量 $\rho_0(x)\,dx$ が、$T(x)$ の近くでは $\rho_1(T(x))J(x)\,dx$ になるため、

$$
\rho_1(T(x))J(x)=\rho_0(x).
$$

これは[押し出し測度の定義](../../F0/F0-00P1/index.md#def-f0-00p1-pushforward)に、通常の多変数変数変換公式を適用したものです。係数を逆にしてはなりません。$J>1$ なら同じ質量が広がり、密度が下がります。

変位補間の写像 $T_t=(1-t)I+tT$ では $DT_t=(1-t)I+tDT$ となります。体積の倍率が時刻についてどう変わるかを知ることが核心です。

## 5. 行列式の評価から変位凸性へ

内部エネルギーの証明には、まず $U$ の条件を「体積を $s^d$ 倍に拡大したとき、エネルギーがどう変わるか」として読み替えるのが便利です。密度 $r$ は $r/s^d$ になり、体積要素は $s^d$ 倍されます。

<a id="def-otr16-mccann"></a>

<!-- formal-statement-start -->
> **定義（McCannの変位凸性条件）**
> $d\ge1$ とし、連続関数 $U:[0,\infty)\to\mathbb R$、$U(0)=0$ に対して、$s>0$ 上の関数

$$
h(s)=s^d U(s^{-d})
$$

> が **凸かつ非増加** であるとき、$U$ はこの次元で **McCannの変位凸性条件** を満たすという。
<!-- formal-statement-end -->

<!-- definition-example-start: def-otr16-mccann -->
**定義の確認**。$U(r)=r\log r$ とすると

$$
h(s)=s^d s^{-d}\log(s^{-d})=-d\log s,\qquad
h'(s)=-\frac d s<0,\quad h''(s)=\frac d{s^2}>0.
$$

従ってどの $d\ge1$ でも非増加かつ凸です。単に $U''(r)\ge0$ を確かめるだけでは代用できません。
<!-- definition-example-end -->

行列式の $1/d$ 乗が凹であれば、$s=J_t^{1/d}$ に上の条件を適用できます。なぜその冪を取るのでしょうか。行列式は体積倍率、$1/d$ 乗は各方向が等しく広がったと仮定したときの長さ倍率だからです。

<a id="lem-otr16-determinant"></a>

<!-- formal-statement-start -->
> **補題（正定値行列上の行列式冪の凹性）**
> $d\ge1$ とし、実対称正定値行列 $A,B\in\mathbb R^{d\times d}$、$0\le t\le1$ に対して

$$
\det((1-t)A+tB)^{1/d}
\ge(1-t)\det(A)^{1/d}+t\det(B)^{1/d}.
$$
<!-- formal-statement-end -->

### 証明の見取り図

$A_t=(1-t)A+tB$ は正定値です。$\log\det A_t$ を二度微分すると、対称行列の固有値の二乗和が現れます。二乗和と和の二乗の関係から、$\det A_t$ の $1/d$ 乗の二階微分は非正になります。

<!-- proof-start -->
### 証明

$H=B-A$、$A_t=A+tH$、$f(t)=\log\det A_t$、$q(t)=\exp(f(t)/d)$ とします。$A_t$ は正定値なので各量は $[0,1]$ で定義されます。固定した $t$ で $S=A_t^{-1/2}HA_t^{-1/2}$ は実対称で、固有値を $\sigma_1,\ldots,\sigma_d$ とします。小さい実数 $u$ に対して

$$
\begin{aligned}
\det(A_t+uH)
&=\det A_t\det(I+u A_t^{-1}H)\\
&=\det A_t\det(I+u S)
=\det A_t\prod_{i=1}^d(1+u\sigma_i).
\end{aligned}
$$

従って $\log\det(A_t+uH)=f(t)+\sum_i\log(1+u\sigma_i)$ を $u=0$ で一度、二度微分すれば

$$
f'(t)=\sum_i\sigma_i,\qquad f''(t)=-\sum_i\sigma_i^2.
$$

$q=\exp(f/d)$ の連鎖律を二段に分けると $q'=qf'/d$、$q''=q(f''/d+(f')^2/d^2)$ です。[実数のCauchy–Schwarz不等式](../../../基礎科目/F0/F0-00E2/index.md#thm-f0-00e2-cauchy-schwarz)をベクトル $(\sigma_1,\ldots,\sigma_d)$ と $(1,\ldots,1)$ に適用すると $\left(\sum_i\sigma_i\right)^2\le d\sum_i\sigma_i^2$ なので

$$
\frac{q''(t)}{q(t)}
=-\frac1d\sum_i\sigma_i^2+
\frac1{d^2}\left(\sum_i\sigma_i\right)^2\le0.
$$

$q(t)>0$ だから $q$ は凹です。端点 $q(0)=\det(A)^{1/d}$、$q(1)=\det(B)^{1/d}$ を結ぶ弦より下へ行かないことが結論です。$\square$
<!-- proof-end -->

実例として $d=2,\ A=I,\ B=\operatorname{diag}(4,9)$ の中点では

$$
\det((A+B)/2)^{1/2}
=\sqrt{(5/2)\cdot5}=\sqrt{25/2}
>\frac{1+\sqrt{36}}2=\frac72.
$$

「行列式そのものが凹」ではなく、**$1/d$ 乗が凹**である点に注意しましょう。

<a id="thm-otr16-internal"></a>

<!-- formal-statement-start -->
> **定理（滑らかな輸送に沿う内部エネルギーの変位凸性）**
> $d\ge1$、$\Omega\subset\mathbb R^d$ を有界凸開集合とする。$\mu_0=\rho_0\,dx\in\mathcal P_2$ とし、$\rho_0$ は $\Omega$ 上で滑らかかつ $0<c\le\rho_0\le C$、外では $0$ とする。$T:\Omega\to T(\Omega)$ は二次費用の最適輸送写像で、$C^1$ 級微分同相、$DT(x)$ は実対称正定値で固有値が一様に正の下界と有限な上界を持つとする。$T$ と $DT$ は有界とし、$\mu_1=T_{\#}\mu_0$、$T_t=(1-t)I+tT$、$\mu_t=(T_t)_{\#}\mu_0$ と置く。
>
> $U:[0,\infty)\to\mathbb R$ が連続、$U(0)=0$ で [McCannの変位凸性条件](#def-otr16-mccann)を満たすなら、$\mu_t$ は密度 $\rho_t$ を持ち、$\mathcal U(\mu_t)$ は有限で、すべての $0\le t\le1$ に対し

$$
\mathcal U(\mu_t)\le(1-t)\mathcal U(\mu_0)+t\mathcal U(\mu_1).
$$
<!-- formal-statement-end -->

### 証明の見取り図

[最適写像からの変位補間](../OTR15/index.md#thm-otr15-displacement-geodesic)で曲線を作ります。$J_t=\det DT_t$ と置けば、質量保存から $\rho_t(T_t(x))=\rho_0(x)/J_t(x)$。行列式の補題で $J_t^{1/d}$ の下界を得て、非増加かつ凸な $h$ に渡します。密度の変換式と行列式の評価の **不等号の向き** が証明の要点です。

<!-- proof-start -->
### 証明

まず $DT_t=(1-t)I+tDT$ は実対称正定値です。$\Omega$ 内の異なる $x,x'$ に対し、凸性で線分が $\Omega$ に含まれるので

$$
\begin{aligned}
(T_t(x)-T_t(x'))\cdot(x-x')
&=\int_0^1 (x-x')^{\mathsf T}
DT_t(x'+s(x-x'))(x-x')\,ds\\
&>0.
\end{aligned}
$$

よって $T_t$ は単射です。また $J_t=\det DT_t>0$ なので、各点で[逆関数定理](../../../基礎科目/RA/RA6A/index.md#thm-ra6a-inverse-function)を微分行列 $DT_t$ に適用できます。これにより局所的に $C^1$ の逆写像があります。

単射性によりこれらの局所逆写像は像の上で一致します。従って $T_t$ は像の上で $C^1$ 微分同相です。

最適輸送写像 $T$ のグラフ結合に[最適結合から作るW2定速測地線](../OTR15/index.md#thm-otr15-displacement-geodesic)を適用すると、$(\mu_t)$ は $W_2$ 定速測地線です。

任意の可測集合 $E\subset\Omega$ で、[押し出し測度の定義](../../F0/F0-00P1/index.md#def-f0-00p1-pushforward)を $T_t(E)$ に適用し、変数変換公式で積分を元の座標へ戻すと

$$
\int_E\rho_0(x)\,dx
=\mu_t(T_t(E))
=\int_E\rho_t(T_t(x))J_t(x)\,dx.
$$

したがって $\rho_0(x)=\rho_t(T_t(x))J_t(x)$ がほとんど至る所で成立します。この式を内部エネルギーの積分へ代入すると、$U(0)=0$ により像の外の寄与はなく

$$
\mathcal U(\mu_t)
=\int_\Omega J_t(x)\,
U\!\left(\frac{\rho_0(x)}{J_t(x)}\right)\,dx.
$$

$q_t(x)=J_t(x)^{1/d}>0$、$r=\rho_0(x)>0$ と置き、$h_r(s)=s^dU(r/s^d)$ とします。$u=s/r^{1/d}$ と変数を替えると

$$
h_r(s)=r\,u^dU(u^{-d})=r\,h(u).
$$

従って $h_r$ も凸かつ非増加です。[行列式の凹性補題](#lem-otr16-determinant)を $A=I$、$B=DT(x)$ に適用すると

$$
q_t(x)\ge(1-t)q_0(x)+tq_1(x)
=(1-t)+t\det DT(x)^{1/d}.
$$

$h_r$ が非増加、次に凸であることを順に使い

$$
\begin{aligned}
h_r(q_t(x))
&\le h_r((1-t)q_0(x)+tq_1(x))\\
&\le(1-t)h_r(q_0(x))+t h_r(q_1(x)).
\end{aligned}
$$

これはまさに $J_tU(r/J_t)\le(1-t)U(r)+tJ_1U(r/J_1)$ です。$\Omega$ 上で積分すると、上の変数変換式を $t=0,1$ にも適用して結論を得ます。密度・Jacobianには上下の一様界があり、$U$ は連続なので各積分は有限です。$\square$
<!-- proof-end -->

ここで証明したのは **滑らかで正定値Jacobianを持つ最適写像に沿う場合** です。任意の特異測度・非滑らかな最適結合にも同じ結論を延ばすには、近似列の構成、エネルギーの下半連続性、境界や無限遠での積分可能性などを別途確認する必要があります。この定理だけで全 $\mathcal P_2$ 上の変位凸性を証明したことにはなりません。

### entropy と冪型エネルギー

エネルギーの関数 $U$ を具体的に入れ、条件が何を要求するかを計算します。冪型では指数によって結論が変わります。

<a id="cor-otr16-entropy-power"></a>

<!-- formal-statement-start -->
> **系（熱エントロピーと冪型内部エネルギー）**
> 次元 $d\ge1$ について、$U(r)=r\log r$（$U(0)=0$）はMcCannの変位凸性条件を満たす。また $m>0,\ m\ne1$ に対して

$$
U_m(r)=\frac{r^m}{m-1},\qquad U_m(0)=0
$$

> は $m\ge1-1/d$ のとき同条件を満たす。従って [滑らかな輸送に沿う内部エネルギーの定理](#thm-otr16-internal)の正則性仮定の下で、それぞれのエネルギーは $0$-凸である。
<!-- formal-statement-end -->

### 証明の見取り図

$r\log r$ では $h=-d\log s$。冪型では $h_m(s)=s^{d(1-m)}/(m-1)$ になり、一階・二階微分の符号を見るだけです。$m<1$ では分母が負なので二階微分の符号が反転します。

<!-- proof-start -->
### 証明

entropy は[McCann条件の直接例](#def-otr16-mccann)で $h'=-d/s<0$、$h''=d/s^2>0$ と計算済みです。冪型では $a=d(1-m)$ と置いて

$$
h_m(s)=\frac{s^a}{m-1},\quad
h_m'(s)=\frac{a}{m-1}s^{a-1}=-d\,s^{a-1}<0,
$$

$$
h_m''(s)=\frac{a(a-1)}{m-1}s^{a-2}
=d\{d(m-1)+1\}s^{a-2}.
$$

$s>0$ なので $h_m''\ge0$ は $d(m-1)+1\ge0$、すなわち $m\ge1-1/d$ と同値です。$m>0$ なので $U_m$ は $0$ で連続かつ $U_m(0)=0$。各仮定が揃い、[内部エネルギーの定理](#thm-otr16-internal)を適用できます。$\square$
<!-- proof-end -->

### 直接計算：一様分布の幅を伸ばす

$d=1$ で $\mu_0$ を $[0,1]$ 上の一様分布、$\mu_1$ を $[0,2]$ 上の一様分布とします。[一次元の単調最適結合](../OTR11/index.md#thm-otr11-quantile-formula)から $T(x)=2x$ が最適です。$T_t(x)=(1+t)x$、$J_t=1+t$ なので、途中分布は $[0,1+t]$ に密度 $1/(1+t)$ を持ちます。従って

$$
\mathcal U_{\mathrm{ent}}(\mu_t)
=\int_0^{1+t}\frac{\log(1/(1+t))}{1+t}\,dy
=-\log(1+t),
$$

$$
\mathcal U_m(\mu_t)
=\frac1{m-1}(1+t)^{1-m}.
$$

entropyの場合は二階微分が $(1+t)^{-2}>0$、$m=2$ の場合は $\mathcal U_2(\mu_t)=(1+t)^{-1}$ で二階微分が $2(1+t)^{-3}>0$ です。この一様密度は境界で不連続なので直前の滑らかな定理の仮定は満たしませんが、ここでの結論は **密度を直接計算して** 確認しています。

一方 $d\ge2$、$0<m<1-1/d$ で、$[0,1]^d$ 上の一様分布を $T(x)=2x$ で運ぶと、$a_t=1+t$ として

$$
\mathcal U_m(\mu_t)=\frac{a_t^{d(1-m)}}{m-1}.
$$

指数 $d(1-m)>1$ かつ分母 $m-1<0$ なので、この関数は **厳密に凹** です。端点を結ぶ変位補間で凸性に反します。McCann条件の閾値には実質的な意味があり、単なる証明上の飾りではありません。

## 6. 演習：不等号の向きと仮定を検算する

### OTR16-A01 lambda補正の等号
- Level: A

$d=1$、$\mu_0=\delta_{-2}$、$\mu_1=\delta_1$、$V(x)=3x^2/2$ とする。中間測度、$W_2^2$、位置エネルギーを計算し、$\lambda=3$ の変位凸性不等式が全 $t\in[0,1]$ で等号であることを示せ。

<!-- solution-start -->
**詳細解答**。結合は $\delta_{(-2,1)}$ だけなので $\mu_t=\delta_{-2+3t}$、$W_2^2=|-2-1|^2=9$ です。

$$
\mathcal V(\mu_t)=\frac32(-2+3t)^2
=6-18t+\frac{27}{2}t^2.
$$

両端は $\mathcal V(\mu_0)=6$、$\mathcal V(\mu_1)=3/2$。補正付きの右辺は

$$
(1-t)6+t\frac32-\frac32t(1-t)\cdot9
=6-18t+\frac{27}{2}t^2.
$$

従って全時刻で等号です。$V''=3$ という[位置エネルギーの定理](#thm-otr16-potential)の仮定とも一致します。
<!-- solution-end -->

### OTR16-A02 二原子の相互作用
- Level: A

$\mu_0=\frac12(\delta_{-1}+\delta_1)$、$\mu_1=\delta_0$、$W(z)=z^2$ とする。最適結合からの変位補間に沿って $\mathcal W(\mu_t)$ を求め、[相互作用の定理](#thm-otr16-interaction)の $\lambda=2$ の評価と照合せよ。

<!-- solution-start -->
**詳細解答**。第二周辺が一点なので結合は唯一で、$\mu_t=\frac12(\delta_{-(1-t)}+\delta_{1-t})$ です。異なる原子間の差は $2(1-t)$ で、二対の各重みが $1/4$ だから

$$
\mathcal W(\mu_t)=\frac12\cdot2\cdot\frac14\cdot[2(1-t)]^2=(1-t)^2.
$$

$W_2^2(\mu_0,\mu_1)=\frac12\cdot1+\frac12\cdot1=1$、重心差は $0$、端点のエネルギーは $1,0$。評価の右辺は

$$
(1-t)\cdot1+t\cdot0-\frac22t(1-t)(1-0)=(1-t)^2.
$$

ここでも等号になります。
<!-- solution-end -->

### OTR16-A03 密度とJacobian
- Level: A

$[0,1]$ 上の一様密度 $\rho_0=1$ を $T(x)=3x$ で運ぶ。$T_t$、$J_t$、$\rho_t$ の台、entropy $\int\rho_t\log\rho_t$ を計算し、質量が $1$ のままであることを検証せよ。

<!-- solution-start -->
**詳細解答**。$T_t(x)=(1+2t)x$ なので $DT_t=J_t=1+2t>0$。質量保存 $\rho_t(T_t(x))J_t=\rho_0(x)=1$ より

$$
\rho_t(y)=\frac1{1+2t}\boldsymbol{1}_{[0,1+2t]}(y).
$$

確かに $\int\rho_t\,dy=(1+2t)/(1+2t)=1$。二次モーメントも $(1+2t)^2/3<\infty$ です。entropyは

$$
\int_0^{1+2t}\frac1{1+2t}\log\frac1{1+2t}\,dy=-\log(1+2t).
$$

体積が増えた分だけ密度が減るというJacobian式の向きも確認できました。
<!-- solution-end -->

### OTR16-A04 McCann条件の微分
- Level: A

任意の整数 $d\ge1$ に対し $U(r)=r\log r$ と $U(r)=r^2$ について $h(s)=s^dU(s^{-d})$ を求め、非増加性と凸性を導関数の符号で示せ。

<!-- solution-start -->
**詳細解答**。entropyは $h(s)=-d\log s$、$h'=-d/s<0$、$h''=d/s^2>0$ です。二乗密度は

$$
h(s)=s^d(s^{-d})^2=s^{-d},
\quad h'(s)=-d s^{-d-1}<0,
\quad h''(s)=d(d+1)s^{-d-2}>0.
$$

いずれも $s>0$ の全範囲で非増加かつ凸で、[McCann条件](#def-otr16-mccann)を満たします。
<!-- solution-end -->

### OTR16-A05 平行移動による限界
- Level: A

非零ベクトル $a\in\mathbb R^d$ と二次モーメント有限な確率測度 $\mu_0$ を取り、$\mu_1=(x\mapsto x+a)_{\#}\mu_0$ とする。$W(z)=|z|^2$ の相互作用エネルギーが、両端の最適変位補間に沿って一定であることを示し、正の $\lambda$-変位凸性を満たせない理由を述べよ。

<!-- solution-start -->
**詳細解答**。$T(x)=x+a$ は凸関数 $\varphi(x)=|x|^2/2+a\cdot x$ の勾配です。任意の結合 $\pi$ で $D=y-x$ と置くと $ED=a$ であり、

$$
E|D|^2=E|D-ED|^2+|ED|^2\ge|a|^2.
$$

平行移動結合は $D=a$ が一定で等号を達成するので最適です。途中の $\mu_t$ は $\mu_0$ を $ta$ 平行移動した分布です。独立な二点 $X,X'$ の差は $(X+ta)-(X'+ta)=X-X'$ なので $\mathcal W(\mu_t)=\mathcal W(\mu_0)$。

$W_2^2=|a|^2>0$ ですから、もし $\lambda>0$-変位凸なら $0<t<1$ で

$$
\mathcal W(\mu_0)\le\mathcal W(\mu_0)-\frac{\lambda}{2}t(1-t)|a|^2,
$$

という不可能な不等式になります。[相互作用の定理](#thm-otr16-interaction)に現れる重心補正が必要な理由です。
<!-- solution-end -->

### OTR16-B01 相互作用の補正項の正体
- Level: B

$d\ge1$ とし、二次費用の最適結合 $\pi\in\Pi(\mu_0,\mu_1)$ 上で移動ベクトル $D=Y-X$ を考える。独立な複製 $D'$ を用いて $E|D-D'|^2=2(E|D|^2-|ED|^2)$ を導き、相互作用エネルギーの凸性評価に $|m_1-m_0|^2$ が引かれる理由を説明せよ。

<!-- solution-start -->
**詳細解答**。積を展開すると

$$
E|D-D'|^2=E|D|^2+E|D'|^2-2E(D\cdot D').
$$

同分布から $E|D'|^2=E|D|^2$、独立性から $E(D\cdot D')=(ED)\cdot(ED')=|ED|^2$ です。また周辺条件より $ED=EY-EX=m_1-m_0$、最適性より $E|D|^2=W_2^2$。よって所望の式です。相互作用は二粒子の相対移動 $D-D'$ にのみ依存し、平均の移動（全粒子に共通する平行移動）はエネルギーに現れません。
<!-- solution-end -->

### OTR16-B02 対角行列で行列式の凹性を検算する
- Level: B

$d=2$、$A=I_2$、$B=\operatorname{diag}(4,9)$ とする。$t=1/2$ で [行列式冪の凹性](#lem-otr16-determinant)の両辺を計算せよ。さらにこの例で $\det((A+B)/2)$ と $(\det A+\det B)/2$ を比較し、補題がどの量についての凹性を述べるか説明せよ。

<!-- solution-start -->
**詳細解答**。中点行列は $\operatorname{diag}(5/2,5)$ で、行列式は $25/2$。その平方根は $\sqrt{25/2}=5/\sqrt2$ です。端点の行列式の平方根は $1,6$ だから弦の値は $7/2$ で、

$$
\frac5{\sqrt2}>\frac72
\quad\Longleftrightarrow\quad
\frac{25}{2}>\frac{49}{4}.
$$

最後は $50>49$ なので真です。一方、行列式自体の中点は $25/2$、端点の行列式平均は $(1+36)/2=37/2$ で、$25/2<37/2$。行列式自体はこの区間で凹不等式を満たしていません。凹なのは $J^{1/d}$ です。
<!-- solution-end -->

### OTR16-B03 冪型の閾値を自力で導く
- Level: B

$d=2$、$0<m<1$、$U_m(r)=r^m/(m-1)$ とする。McCann条件が成り立つ $m$ の範囲を微分して求めよ。特に $m=1/4$ で、$[0,1]^2$ の一様分布を $T(x)=2x$ で運ぶ変位補間の内部エネルギーが凸でないことを式で示せ。

<!-- solution-start -->
**詳細解答**。$h_m(s)=s^{2(1-m)}/(m-1)$ で $a=2(1-m)>0$ と置くと

$$
h_m'(s)=\frac{a}{m-1}s^{a-1}=-2s^{a-1}<0,
\qquad h_m''(s)=2(2m-1)s^{a-2}.
$$

よって凸性の条件は $m\ge1/2$ です。$m=1/4$ なら $a=3/2$、$U_m$ の係数は $-4/3$ です。最適写像 $T(x)=2x$ に沿って中間一様密度は一辺 $1+t$ の正方形上で $(1+t)^{-2}$ だから

$$
\mathcal U_{1/4}(\mu_t)
=\frac{-4}{3}(1+t)^{3/2}.
$$

二階微分は $-\frac43\cdot\frac32\cdot\frac12(1+t)^{-1/2}=-(1+t)^{-1/2}<0$。厳密に凹であり、$t=1/2$ の値は端点値の平均より大きく、$0$-変位凸性が破れます。最適性は $T=\nabla|x|^2$ が凸勾配写像であり、支持が有界で[可積分な凸双対証明書による最適性](../OTR13/index.md#prop-otr13-dual-certificate)の条件を満たすことから確認できます。
<!-- solution-end -->

### OTR16-B04 負の曲率を見逃さない
- Level: B

$V(x)=-x^2$、$\mu_0=\delta_{-1}$、$\mu_1=\delta_1$ とする。$0$-変位凸性が成立しないことを中点で示し、$\lambda=-2$ の補正項を入れると等号になることを確かめよ。また任意の $\lambda>-2$ が不可能であることを示せ。

<!-- solution-start -->
**詳細解答**。補間は $\mu_t=\delta_{-1+2t}$、二乗距離は $4$。中点のエネルギー $0$ は両端エネルギー $-1$ の平均より大きく、$0$-変位凸性に反します。$\lambda=-2$ の右辺は

$$
(1-t)(-1)+t(-1)-\frac{-2}{2}t(1-t)\cdot4
=-1+4t(1-t),
$$

左辺は $-(-1+2t)^2=-1+4t-4t^2$ で等号です。もし $\lambda>-2$ なら $0<t<1$ で右辺の補正 $-2\lambda t(1-t)$ は $4t(1-t)$ より小さくなり、等号だった左辺より下に来るため不等式は破れます。
<!-- solution-end -->

### OTR16-C01 三種類のエネルギーの合成
- Level: C

$\mu_0$ を $[0,1]$ の一様分布、$\mu_1$ を $[2,4]$ の一様分布とし、最適写像を $T(x)=2x+2$ とする。位置ポテンシャル $V(x)=x^2/2$、相互作用ポテンシャル $W(z)=z^2/2$、内部関数 $U(r)=r\log r$ から

$$
\mathcal F(\mu)=\int V\,d\mu+\frac12\iint W(x-y)\,d\mu(x)d\mu(y)+\int U(\rho)\,dx
$$

を定める（最後の項は密度 $\rho$ が存在する場合）。次を順に示せ。

1. $T_t$、中間密度の台と値、$W_2^2(\mu_0,\mu_1)$ を求める。
2. $m_t=E[X_t]$、分散、三つのエネルギーと合計 $\mathcal F(\mu_t)$ を計算する。
3. この経路に沿って $\lambda=1$ の変位凸性不等式が成立することを、位置の等号、相互作用の補正、entropyの凸性に分けて証明する。

<!-- solution-start -->
**詳細解答**。$T'(x)=2>0$ で一次元単調写像です。[一次元最適輸送](../OTR11/index.md#thm-otr11-quantile-formula)により最適で、

$$
T_t(x)=(1-t)x+t(2x+2)=(1+t)x+2t.
$$

$a_t=1+t$、$b_t=2t$ と置くと、$\mu_t$ は $[b_t,b_t+a_t]$ の一様分布で密度 $1/a_t$ です。輸送距離の二乗は

$$
W_2^2=\int_0^1|T(x)-x|^2\,dx
=\int_0^1(x+2)^2\,dx
=\left[\frac{x^3}{3}+2x^2+4x\right]_0^1
=\frac{19}{3}.
$$

一様分布の平均と分散を、$X_t=b_t+a_tX$、$X\sim\operatorname{Unif}[0,1]$ として計算すると

$$
m_t=b_t+\frac{a_t}{2}=\frac12+\frac52t,\qquad
\operatorname{Var}(X_t)=a_t^2\left(\frac13-\frac14\right)=\frac{a_t^2}{12}.
$$

$E[X_t^2]=m_t^2+a_t^2/12$ なので位置エネルギーは $\mathcal V(\mu_t)=m_t^2/2+a_t^2/24$。独立な $X_t,X_t'$ に対し $E(X_t-X_t')^2=2\operatorname{Var}(X_t)$ だから

$$
\mathcal W(\mu_t)=\frac12 E\frac{(X_t-X_t')^2}{2}
=\frac12\operatorname{Var}(X_t)=\frac{a_t^2}{24}.
$$

entropyは幅と密度から $\mathcal U(\mu_t)=-\log a_t$。従って

$$
\boxed{\mathcal F(\mu_t)
=\frac12\left(\frac12+\frac52t\right)^2+\frac{(1+t)^2}{12}-\log(1+t).}
$$

最後に $\mathcal V$ は $V''=1$ で、各粒子について二次関数の等式が成立するため

$$
\mathcal V(\mu_t)
=(1-t)\mathcal V(\mu_0)+t\mathcal V(\mu_1)
-\frac12t(1-t)\frac{19}{3}.
$$

相互作用は $W''=1$ です。移動量 $D=T(X)-X=X+2$ の分散は $1/12$ なので、[相互作用の定理](#thm-otr16-interaction)から

$$
\mathcal W(\mu_t)
=(1-t)\mathcal W(\mu_0)+t\mathcal W(\mu_1)
-\frac12t(1-t)\frac1{12}.
$$

entropyは $-\log(1+t)$ で、二階微分が $(1+t)^{-2}>0$ です。ゆえに $\mathcal U(\mu_t)\le(1-t)\mathcal U(\mu_0)+t\mathcal U(\mu_1)$。三式を足すと相互作用の追加の非正項を落としても

$$
\mathcal F(\mu_t)\le(1-t)\mathcal F(\mu_0)+t\mathcal F(\mu_1)
-\frac12t(1-t)\frac{19}{3}.
$$

これは選んだ測地線上で $\lambda=1$ の評価です。境界で密度が飛ぶ例なので、内部エネルギーは滑らかな定理を無条件に引用せず、直接計算した凸性で正当化しました。
<!-- solution-end -->

## 7. まとめと次への接続

- $W_2$ に沿う凸性は、測度の線形混合ではなく **最適な粒子移動** に沿って測る。$\lambda$ の補正は移動距離の二乗に比例する。
- 位置エネルギーには $D^2V\succeq\lambda I$ がそのまま効く。凸相互作用エネルギーも変位凸だが、平行移動がエネルギーを変えないため、一般には正の一様な凸性係数を持てない。
- 内部エネルギーでは $\rho_t(T_t(x))\det DT_t(x)=\rho_0(x)$ が入口となり、行列式の $1/d$ 乗の凹性とMcCann条件を組み合わせる。
- 滑らかな写像での計算と一般測度上の定理は論理的に別である。特異な分布や無限遠の問題には追加の論証が要る。

次の OTR17 では、測度の動きを密度と速度場の保存則として表します。ここで扱ったエネルギーは、その先の Wasserstein 勾配流で変化を測る対象になります。
