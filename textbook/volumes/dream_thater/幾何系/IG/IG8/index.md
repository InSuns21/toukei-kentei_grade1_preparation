# IG8 双対平坦性と e/m 測地線

<!-- definition-example-audit: strict -->

[IG7 の α-接続](../IG7/index.md#thm-ig7-alpha-duality)で、Fisher 計量に関して双対な指数接続（e、$\alpha=+1$）と混合接続（m、$\alpha=-1$）を得ました。しかし「双対」は計量の微分に関する関係であって、どちらの接続でも測地線が直線になるという意味ではありません。実際、[IG6 の接続係数の変換則](../IG6/index.md#thm-ig6-coordinate-covariance)によれば、ある座標で直線に見えても、一般の座標の取り替えでは曲線に見えます。

ここで解きたい問いは、**一つの統計モデルに、指数的に変わる直線と確率を混ぜる直線がなぜ共存するのか**、です。鍵は接続ごとにその係数が零となる座標を探すことにあります。そのために、[IG5 の Hessian 表示](../IG5/index.md#def-ig5-hessian-chart)と二つの接続を結びます。

主な対象は共通の台で正の確率を持つ有限次元の正則統計モデルです。微分と期待値の交換に必要な可積分性、Fisher 計量の正定値性を仮定し、指数型分布族では自然母数領域の内部だけを扱います。曲率は [GEO16 の曲率テンソル](../../GEO/GEO16/index.md#def-geo16-curvature)と同じく、接続による共変微分の交換で定義します。ただし今は Levi-Civita 接続だけに限定せず、任意のアファイン接続について考えます。

## 1. 平坦な接続には、その接続にとっての直線がある

まず「平坦」の意味を明確にします。曲率テンソル $R^\nabla(X,Y)Z$ は $\nabla_X\nabla_YZ-\nabla_Y\nabla_XZ-\nabla_{[X,Y]}Z$ であり、捩率は $\operatorname{Tor}^\nabla(X,Y)=\nabla_XY-\nabla_YX-[X,Y]$ です。座標係数 $\Gamma^k_{ij}$ がすべて零なら、座標ベクトル場の共変微分も交換の障害も消えるため、曲率と捩率はともに零です。逆に曲率零だけでは捩率零を保証しません。

接続に応じて係数を零にできる座標を探すことが、「直線になる座標」を探す操作です。

<a id="def-ig8-affine-coordinate"></a>

<!-- formal-statement-start -->
> **定義（アファイン座標と平坦な接続）**  
> 滑らかな多様体 $M$ 上のアファイン接続 $\nabla$ が開集合 $U$ 上で **平坦**であるとは、すべてのベクトル場 $X,Y,Z$ に対し次が成り立つことをいう。

$$
R^\nabla(X,Y)Z=0.
$$

> **捩率零**は別途 $\operatorname{Tor}^\nabla=0$ を意味する。$U$ の局所座標 $x$ で次の条件が全添字について成立するとき、$x$ を $\nabla$ の **アファイン座標**という。

$$
\nabla_{\partial_i}\partial_j=0\qquad(1\le i,j\le d).
$$
<!-- formal-statement-end -->

<!-- definition-example-start: def-ig8-affine-coordinate -->
**定義の確認**（Bernoulli の e 接続）。成功確率 $p\in(0,1)$、$a=\log\{p/(1-p)\}$ を考えます。[IG7 の接続係数の計算](../IG7/index.md#thm-ig7-alpha-duality)から、$a$ 座標の $\Gamma^{e,a}_{aa}=0$ です。したがって $a$ は e-アファイン座標です。一次元では $R(\partial_a,\partial_a)\partial_a=0$（最初の二引数の交代性）で曲率零、$\operatorname{Tor}(\partial_a,\partial_a)=0$ で捩率零です。係数が零になること、曲率と捩率が零になることをそれぞれ確認できました。
<!-- definition-example-end -->

反対に $p$ 座標では $\Gamma^{e,p}_{pp}=(2p-1)/[p(1-p)]$ で一般に零ではありません。それでも曲率テンソル $R^e$ は零です。**平坦な接続でも、非アファイン座標では係数が消えるとは限らない**からです。なお捩率零かつ曲率零の接続は各点の近傍でアファイン座標を持ちますが、ここではその一般存在定理を使わず、以後の各モデルで座標を実際に構成します。

二つの接続が同時にあるとき、それぞれ別のアファイン座標を持つことがあります。これが次の主役です。

<a id="def-ig8-dually-flat"></a>

<!-- formal-statement-start -->
> **定義（双対平坦統計多様体）**  
> 正定値な Riemann 計量 $g$ を持つ滑らかな多様体 $M$ に、互いに [計量双対](../IG7/index.md#def-ig7-dual-connection)な二つのアファイン接続 $\nabla,\nabla^*$ が与えられているとする。
>
> **両接続が捩率零で、両者それぞれの曲率も零**であるとき、$(M,g,\nabla,\nabla^*)$ を **双対平坦**という。
>
> 特に $M$ が正則統計多様体で $g$ がその Fisher 計量なら **双対平坦統計多様体**と呼ぶ。その二接続が $\nabla=\nabla^e$、$\nabla^*=\nabla^m$ の場合を **e/m 双対平坦**という。
<!-- formal-statement-end -->

<!-- definition-example-start: def-ig8-dually-flat -->
**定義の確認**（Bernoulli の二つの座標）。$a=\log\{p/(1-p)\}$ では e 接続係数が零、$p$ では m 接続係数が零であることを [IG7 の導出](../IG7/index.md#thm-ig7-alpha-duality)で確認済みです。両接続はそこで捩率零かつ双対と証明されました。一次元ゆえ両者の曲率も零です。$g_{pp}=1/[p(1-p)]>0$ であり、定義の全条件が揃っているので Bernoulli の内部は双対平坦です。$p=0,1$ は score と Fisher 計量が通常の座標で正則でなく、この主張の対象外です。
<!-- definition-example-end -->

「e と m が双対なら双対平坦」とは言えません。双対性は [IG7 の定理](../IG7/index.md#thm-ig7-alpha-duality)で広い正則モデルに成り立ちますが、双対平坦性にはさらに**両接続の曲率がそれぞれ零**であることが必要です。

## 2. Hessian からもう一方のアファイン座標を作る

[IG5 の Legendre 双対](../IG5/index.md#thm-ig5-legendre-hessian)では、正定値 Hessian を持つポテンシャル $\psi$ に対して $\eta_i=\partial_i\psi$ が逆変換可能な座標になることを学びました。ここではこの座標の取り替えが、単に計量を変換するだけでなく、**計量双対な接続の係数を零にする**ことを示します。

ここで $\partial_i=\partial/\partial\theta^i$ は他の $\theta$ 成分を固定する偏微分であり、接続 $\nabla$ による共変微分とは異なります。

<a id="thm-ig8-hessian-dual-flat"></a>

<!-- formal-statement-start -->
> **定理（Hessian ポテンシャルからの双対平坦性）**  
> $U\subset\mathbb R^d$ を開凸集合とし、$\psi\in C^4(U)$ の Hessian $g$ が各点で正定値だとする。

$$
g_{ij}=\partial_i\partial_j\psi.
$$

> $\theta$ 座標で全接続係数が零となる $\nabla$ と、その $g$ に関する双対 $\nabla^*$ を取る。このとき両接続は捩率零・曲率零で、$(U,g,\nabla,\nabla^*)$ は双対平坦である。$\theta$ は $\nabla$-アファイン、次の $\eta$ は $\nabla^*$-アファイン座標である。

$$
\eta_i=\partial_i\psi.
$$

> さらに $\eta(U)$ 上の Legendre 双対ポテンシャル $\varphi(\eta)=\theta(\eta)\cdot\eta-\psi(\theta(\eta))$ は次を満たす。

$$
\frac{\partial\varphi}{\partial\eta_i}=\theta^i,\qquad
\frac{\partial^2\varphi}{\partial\eta_i\partial\eta_j}=g^{ij}.
$$
<!-- formal-statement-end -->

図形の直線を変えなくても、計量が Hessian なら、計量双対で測る「まっすぐ」の座標を勾配によって作れます。これが Hessian 幾何と情報幾何の接点です。

### 証明の見取り図

$\Gamma=0$ の座標で双対性を成分に書くと、$\Gamma^*$ は $g$ の一階微分だけで定まります。$\eta_i=\partial_i\psi$ の二階微分はちょうどこの $g$ の一階微分です。逆関数の二階微分公式に代入すると、$\eta$ 座標での $\Gamma^*$ が相殺して零になります。

<!-- proof-start -->
### 証明

$g$ の正定値性から Jacobian $\partial\eta_a/\partial\theta^i=g_{ai}$ は各点で可逆です。[IG5 の自然座標と期待値座標の可逆対応の議論](../IG5/index.md#thm-ig5-mean-diffeomorphism)と同じく、凸な $U$ 上で二点 $\theta\ne\theta'$ を結ぶ線分を積分すれば

$$
(\eta(\theta)-\eta(\theta'))\cdot(\theta-\theta')
=\int_0^1(\theta-\theta')^\mathsf T g(\theta'+s(\theta-\theta'))(\theta-\theta')\,ds>0.
$$

よって $\eta$ は単射で、Jacobian が各点で可逆なので [逆関数定理](../../../基礎科目/RA/RA6A/index.md#thm-ra6a-inverse-function)により開集合 $\eta(U)$ への滑らかな座標です。

[IG7 の計量双対の定義](../IG7/index.md#def-ig7-dual-connection)を $X=\partial_i,Y=\partial_j,Z=\partial_k$ に適用し、$\nabla_{\partial_i}\partial_j=0$ を代入すると

$$
\partial_i g_{jk}=g_{j\ell}\Gamma^{*\ell}_{ik},\qquad
\Gamma^{*\ell}_{ik}=g^{\ell j}\partial_i g_{jk}.
$$

ここで $g_{jk}=\psi_{jk}$ なので $\partial_i g_{jk}=\psi_{ijk}$ は三添字に対称です。したがって $\Gamma^{*\ell}_{ik}=\Gamma^{*\ell}_{ki}$ で $\nabla^*$ の捩率は零です。$\nabla$ は係数零なので捩率零・曲率零です。

次に $P^i_b=\partial\theta^i/\partial\eta_b$ と置きます。恒等式 $\eta_a(\theta(\eta))=\eta_a$ を $\eta_b,\eta_c$ で二回微分すると

$$
0=g_{ak}\frac{\partial^2\theta^k}{\partial\eta_b\partial\eta_c}
+(\partial_i g_{aj})P^i_bP^j_c.
$$

一方で [IG6 の接続係数の変換則](../IG6/index.md#thm-ig6-coordinate-covariance)において、座標変換の Jacobian が $\partial\eta_a/\partial\theta^k=g_{ak}$ であることを使うと、$\eta$ 座標の $\nabla^*$ の係数は

$$
\widetilde\Gamma^{*a}_{bc}
=g_{ak}\left(\Gamma^{*k}_{ij}P^i_bP^j_c
+\frac{\partial^2\theta^k}{\partial\eta_b\partial\eta_c}\right).
$$

$g_{ak}\Gamma^{*k}_{ij}=\partial_i g_{ja}=\partial_i g_{aj}$ を代入すれば、直前の恒等式によって括弧全体が零です。したがって $\widetilde\Gamma^{*a}_{bc}=0$ で、$\nabla^*$ の曲率も零です。

最後に $\varphi(\eta)=\theta^i(\eta)\eta_i-\psi(\theta(\eta))$ を微分します。$\partial_i\psi=\eta_i$ により $d\theta$ の項が消え、$d\varphi=\theta^i\,d\eta_i$ です。さらに

$$
\frac{\partial^2\varphi}{\partial\eta_i\partial\eta_j}
=\frac{\partial\theta^i}{\partial\eta_j}
=(g^{-1})^{ij}=g^{ij},
$$

となり、双対ポテンシャルの結論も得ます。
<!-- proof-end -->

**直接例（Bernoulli）**。$\theta=a$、$\psi(a)=\log(1+e^a)$ とすると

$$
\eta=\psi'(a)=\frac{e^a}{1+e^a}=p,\quad
g_{aa}=\psi''(a)=p(1-p)>0,\quad
\varphi(p)=p\log p+(1-p)\log(1-p).
$$

$\varphi''(p)=1/[p(1-p)]=g^{aa}$ です。$a$ で e 係数、$p$ で m 係数がそれぞれ零となることは第1節でも直接確認しました。$\psi$ が凸でも Hessian が退化する点では $\eta$ を局所座標とできないので、定理の正定値性は省略できません。

## 3. 正則な全指数型分布族では e/m が平坦になる

ここまでの定理は純粋に Hessian 計量の話でした。統計モデルでそれが現れる理由は、対数密度の二階微分が標本 $x$ に依らないことです。全指数型分布族を、固定した十分統計量 $F=(F_1,\ldots,F_d)$ と固定した台を用いて

$$
p_\theta(x)=h(x)\exp\{\theta^iF_i(x)-\psi(\theta)\},\qquad
\psi(\theta)=\log\int h(x)e^{\theta^iF_i(x)}\,d\mu(x)
$$

と書きます。$\mu$ は有限離散の場合は数え上げ測度です。[IG4 の自然母数の定義](../IG4/index.md#def-ig4-natural-chart)に戻り、自然母数が開集合を動き、Fisher 行列が正定値である最小・正則な**全族**を考えます。

<a id="thm-ig8-exponential-dual-flat"></a>

<!-- formal-statement-start -->
> **定理（全指数型分布族の双対平坦性）**  
> 共通の正の台を持つ最小・正則な $d$ 次元全指数型分布族を考える。

$$
p_\theta=h\exp\{\theta\cdot F-\psi(\theta)\}.
$$

> 自然母数領域 $\Theta$ が開凸集合で、$\psi\in C^4(\Theta)$、必要な微分と積分の交換が成立し、Fisher 行列が全域で正定値とする。このとき Fisher 計量と [IG7 の e/m 接続](../IG7/index.md#def-ig7-alpha-connection)は双対平坦である。自然母数 $\theta$ は e-アファイン座標、次の期待値母数 $\eta$ は m-アファイン座標である。

$$
\eta_i=E_\theta[F_i]=\partial_i\psi.
$$
<!-- formal-statement-end -->

この定理は「指数型という表記」だけからは出ません。最小性がない冗長な母数表示では Fisher 計量が退化し、$\eta$ が逆座標にならないことがあります。非線形な制限による曲がった部分モデルも、ここでいう全族とは区別します。

### 証明の見取り図

e 接続の下付き係数の式に $\ell_{ij}=-\psi_{ij}$ を代入し、score の平均零で係数が消えることを確認します。計量が $\psi$ の Hessian であることと合わせ、第2節の定理を適用します。

<!-- proof-start -->
### 証明

$\ell(x;\theta)=\log h(x)+\theta^iF_i(x)-\psi(\theta)$ の一階・二階微分は

$$
\ell_i=F_i-\psi_i,\qquad \ell_{ij}=-\psi_{ij}.
$$

正規化 $\int p_\theta\,d\mu=1$ を微分し、仮定した交換を行うと $E_\theta[\ell_k]=0$ です。[IG7 の α-接続の定義](../IG7/index.md#def-ig7-alpha-connection)で $\alpha=+1$ とすれば

$$
\Gamma^e_{ij,k}=E_\theta[\ell_{ij}\ell_k]
=-\psi_{ij}E_\theta[\ell_k]=0.
$$

逆 Fisher 行列を掛けても $\Gamma^{e,k}_{ij}=0$ です。よって $\theta$ は e-アファイン座標です。

さらに [IG4 の Fisher--Hessian 定理](../IG4/index.md#thm-ig4-fisher-hessian)によって

$$
g_{ij}=\psi_{ij}
$$

であり、最小性・正則性により正定値です。[Hessian ポテンシャルからの双対平坦性](#thm-ig8-hessian-dual-flat)には、$U=\Theta$、$\nabla=\nabla^e$、ポテンシャル $\psi$ を代入します。すると計量双対の接続は捩率零・曲率零で、$\eta=\partial\psi$ がそのアファイン座標です。

[IG7 の e/m 双対性](../IG7/index.md#thm-ig7-alpha-duality)によって、この計量双対の相手は実際に $\nabla^m$ です。従って m の平坦性と期待値座標についても結論が従います。
<!-- proof-end -->

たとえば Poisson 族では $\theta=\log\lambda\in\mathbb R$、$\psi=e^\theta$、$\eta=\lambda>0$ です。e の直線は $\log\lambda$ の直線、m の直線は $\lambda$ の直線になります。全族の内部でこの違いを、次に測地線として定式化します。

## 4. 接続が違えば、二点間の「直線」の式が違う

[IG6 の接続測地線](../IG6/index.md#def-ig6-connection-geodesic)は $\nabla_{\dot\gamma}\dot\gamma=0$ を満たす曲線です。あるアファイン座標 $x$ で $\Gamma^k_{ij}=0$ なら、その式は $d^2x^k/dt^2=0$ になり、$x^k(t)=x^k_0+t(x^k_1-x^k_0)$ です。これが接続に依存する「直線」の正確な意味です。

<a id="def-ig8-em-geodesic"></a>

<!-- formal-statement-start -->
> **定義（e/m 測地線）**  
> e/m 双対平坦統計多様体 $(M,g,\nabla^e,\nabla^m)$ において、次の方程式をそれぞれ満たす曲線を **e 測地線**、**m 測地線**という。

$$
\nabla^e_{\dot\gamma}\dot\gamma=0,\qquad
\nabla^m_{\dot\gamma}\dot\gamma=0.
$$

> 対応するアファイン座標 $\theta$、$\eta$ では、それぞれ次の線分になる。ただし線分が座標領域に含まれる範囲の $t$ に限る。

$$
\theta(t)=\theta_0+t(\theta_1-\theta_0),\qquad
\eta(t)=\eta_0+t(\eta_1-\eta_0).
$$
<!-- formal-statement-end -->

<!-- definition-example-start: def-ig8-em-geodesic -->
**定義の確認**（Poisson 族）。二つの平均 $\lambda_0,\lambda_1>0$ を取ります。e の座標 $\theta=\log\lambda$ で $\theta''(t)=0$ となる曲線は $\lambda_e(t)=\lambda_0^{1-t}\lambda_1^t$、m の座標 $\eta=\lambda$ で $\eta''(t)=0$ となる曲線は $\lambda_m(t)=(1-t)\lambda_0+t\lambda_1$ です。$0\le t\le1$ ではどちらも正なので領域内です。$\lambda_0=1,\lambda_1=9,t=1/2$ ならそれぞれ $3$ と $5$ になります。式を元の座標へ戻すと曲線の見た目が異なっても、各接続での加速度は零です。
<!-- definition-example-end -->

### 有限正確率単体：算術補間と幾何補間

$r\ge2$ 個の結果を持つ正の確率単体 $\Delta_{r-1}^{\circ}$ は、[IG4 の混合座標](../IG4/index.md#def-ig4-mixture-coordinate) $\eta_i=p_i$（$i<r$）と自然座標 $\theta^i=\log(p_i/p_r)$ の両方を持ちます。後者の逆写像は

$$
p_i=\frac{e^{\theta^i}}{1+\sum_{j<r}e^{\theta^j}},\quad (i<r),\qquad
p_r=\frac1{1+\sum_{j<r}e^{\theta^j}}.
$$

どちらの領域も凸です（$\theta\in\mathbb R^{r-1}$、$\eta_i>0$ かつ $\sum_{i<r}\eta_i<1$）。したがって二点を結ぶ線分は境界へ出ません。

<a id="thm-ig8-simplex-geodesics"></a>

<!-- formal-statement-start -->
> **定理（有限正単体の e/m 測地線）**  
> $r\ge2$ とし、各成分が正で総和1の分布 $p^0,p^1\in\Delta_{r-1}^{\circ}$ を取る。$0\le t\le1$ に対し、両端点を結ぶアファイン・パラメータ付き m 測地線と e 測地線は、それぞれ

$$
p_i^m(t)=(1-t)p_i^0+tp_i^1,
$$

$$
p_i^e(t)=\frac{(p_i^0)^{1-t}(p_i^1)^t}{\displaystyle\sum_{j=1}^r(p_j^0)^{1-t}(p_j^1)^t}
\qquad (1\le i\le r)
$$

> で与えられる。両者の全成分は正、総和は1である。一般には両曲線は一致しない。
<!-- formal-statement-end -->

### 証明の見取り図

m では確率の成分が座標そのものなので線形補間します。e では対数比の座標を線形補間し、基準成分との比から正規化すると指数の線形補間が確率の幾何補間に変わります。

<!-- proof-start -->
### 証明

混合座標 $\eta_i=p_i$（$i<r$）は [全指数型分布族の双対平坦性](#thm-ig8-exponential-dual-flat)により m-アファインです。線分 $\eta_i(t)=(1-t)p_i^0+tp_i^1$ を取り、最後の成分は $1-\sum_{i<r}\eta_i(t)=(1-t)p_r^0+tp_r^1$ です。各端点が正なので補間中も正です。$d^2\eta/dt^2=0$ から m 測地線の式を満たします。

一方 e-アファインな自然座標を各端点で $\theta^i_a=\log(p_i^a/p_r^a)$（$a=0,1$）と置くと

$$
\begin{aligned}
\theta^i(t)&=(1-t)\theta_0^i+t\theta_1^i,\\
e^{\theta^i(t)}&=\left(\frac{p_i^0}{p_r^0}\right)^{1-t}
\left(\frac{p_i^1}{p_r^1}\right)^t.
\end{aligned}
$$

$w_j(t)=(p_j^0)^{1-t}(p_j^1)^t>0$ と置けば、$e^{\theta^i(t)}=w_i(t)/w_r(t)$ です。前述の自然座標の逆写像に代入して

$$
p_i(t)=\frac{w_i(t)/w_r(t)}{1+\sum_{j<r}w_j(t)/w_r(t)}
=\frac{w_i(t)}{\sum_{j=1}^r w_j(t)}
$$

を得ます。分母は正で、和を取れば1です。$\theta''(t)=0$ なので e 測地線です。どちらもそれぞれの座標で端点を結ぶ二階微分零の解は唯一であり、主張を得ました。
<!-- proof-end -->

**三値分布で直接比較**。$p^0=(1/2,1/3,1/6)$、$p^1=(1/6,1/3,1/2)$ の中点では

$$
p^m(1/2)=(1/3,1/3,1/3),
$$

$$
p^e(1/2)=\frac{(1/(2\sqrt3),\ 1/3,\ 1/(2\sqrt3))}{1/\sqrt3+1/3}
=\left(\frac{\sqrt3}{2(\sqrt3+1)},\frac1{\sqrt3+1},\frac{\sqrt3}{2(\sqrt3+1)}\right).
$$

後者はおよそ $(0.317,0.366,0.317)$ で、真ん中の成分が $1/3$ ではありません。正の成分と総和1、自然座標での等間隔という条件まで確認したうえで、両者の差が見えます。この中点は一般の Fisher 距離に関する最短曲線の中点という意味ではありません。**e/m 接続の測地線と Levi-Civita の長さ最小測地線は別問題**です。

## 5. 混合型全族と曲がった部分モデルを混同しない

正の有限単体の中で、$p(t)=p^0+Bt$ と確率がアファインに動く [IG4 の混合型分布族](../IG4/index.md#def-ig4-mixture-family)は、必ずしも「全単体」の全次元を動きません。それでも、混合母数 $t$ 自身がその部分モデルの m-アファイン座標になります。

<a id="prop-ig8-mixture-flat"></a>

<!-- formal-statement-start -->
> **命題（混合型分布族の m 平坦性）**  
> $r$ 点上の有限正混合型分布族を次で定める。

$$
p_i(t)=p_i^0+\sum_{a=1}^k B_{ia}t^a>0
\qquad(1\le i\le r,\ t\in U).
$$

> $U\subset\mathbb R^k$ は非空開凸集合、$\sum_i p_i^0=1$、$\sum_i B_{ia}=0$、$B$ は列階数 $k$ とする。この族の統計的 m 接続は $t$ 座標で係数零である。Fisher 計量は正定値で、次の $H$ の Hessian となる。

$$
g_{ab}=\sum_i\frac{B_{ia}B_{ib}}{p_i(t)},\qquad
H(t)=\sum_i p_i(t)\log p_i(t).
$$

> したがって計量双対の e 接続も平坦で、$\xi_a=\partial_aH$ が e-アファイン座標を与える。
<!-- formal-statement-end -->

### 証明の見取り図

分布そのものが一次式であれば、対数密度の二階微分は score 二つの積の負号となります。これを m 接続の定義へ入れると零です。負エントロピーの二階微分で Fisher 計量を再現すれば、第2節の定理を e/m を交換して適用できます。

<!-- proof-start -->
### 証明

離散結果 $i$ において $\ell(i;t)=\log p_i(t)$ なので

$$
\ell_a(i;t)=\frac{B_{ia}}{p_i(t)},\qquad
\ell_{ab}(i;t)=-\frac{B_{ia}B_{ib}}{p_i(t)^2}=-\ell_a(i;t)\ell_b(i;t).
$$

[IG7 の m 接続の定義](../IG7/index.md#def-ig7-alpha-connection)に $\alpha=-1$ を代入すると

$$
\Gamma^m_{ab,c}=E[(\ell_{ab}+\ell_a\ell_b)\ell_c]=0.
$$

よって逆計量で添字を上げても零です。$g_{ab}=\sum_i p_i\ell_a(i)\ell_b(i)=\sum_i B_{ia}B_{ib}/p_i$ であり、$z\ne0$ に対し $z^\mathsf Tgz=\sum_i(Bz)_i^2/p_i>0$ です。最後の不等式には $B$ の列独立性を使いました。

$H$ の一階微分では $\sum_i B_{ia}=0$ を使うと

$$
\partial_aH=\sum_i B_{ia}(1+\log p_i)=\sum_iB_{ia}\log p_i,
$$

さらに $\partial_b\partial_aH=\sum_i B_{ia}B_{ib}/p_i=g_{ab}$ です。第2節の [Hessian ポテンシャルからの双対平坦性](#thm-ig8-hessian-dual-flat)に $\nabla=\nabla^m$、$\psi=H$ を適用します。[IG7 の二重双対性](../IG7/index.md#thm-ig7-dual-existence)により $\nabla^m$ の双対が $\nabla^e$ なので、e 接続も平坦で $\xi=\partial H$ がそのアファイン座標です。
<!-- proof-end -->

一方、曲がった指数型の**部分モデル**には注意が必要です。[IG4 の自然座標の定義](../IG4/index.md#def-ig4-natural-chart)に従い、三値の全指数型分布族 $p_{a,b}=(e^a,e^b,1)/(1+e^a+e^b)$ を $a=s,b=s^2$ に制限します。$s=-1,1$ の分布を結ぶ全族での e 測地線は自然座標の線分で、中点は $(a,b)=(0,1)$ です。しかし部分モデルで $a=0$ なら必ず $b=0$ なので、この中点は部分モデルの外です。

したがって**周囲の全族での e 測地線が部分族に閉じる保証はありません**。また、部分族の接続を接空間へ射影して作るなら、その接続と周囲の接続の区別も必要です。特にこの例は一次元なので、部分族の内在曲率はどの接続でも自動的に零です。「放物線だから一次元の内在接続が曲率非零」とは言えません。周囲での線分の非閉性と内在曲率を混同しないでください。

最後に、双対平坦なのは $\nabla^e,\nabla^m$ の曲率についての主張です。両者の平均である [Levi-Civita 接続](../IG7/index.md#thm-ig7-dual-existence)の曲率まで零だとは結論できません。この違いは IG13 で具体的に計算します。

---

## 6. 演習：二種類の平坦性を紙上で使う

### IG8-A01 Bernoulli の二種類の中点

成功確率 $p\in(0,1)$ の Bernoulli 族で $a=\log\{p/(1-p)\}$ とする。$p_0=1/5,p_1=3/5$ の e/m 測地線を与え、時刻 $t=1/2$ の値を求めよ。両曲線が $(0,1)$ の内部にあることも確認せよ。

- Level: A
- 狙い: 自然座標と期待値座標による補間を区別する

<!-- solution-start -->
**詳細解答**

[e/m 測地線の定義](#def-ig8-em-geodesic)で、$a$ が e、$p$ が m のアファイン座標です。m 側は $p_m(t)=(1-t)/5+3t/5=(1+2t)/5$ なので中点は $2/5$ です。

e 側はオッズ $p/(1-p)$ の対数を補間します。初期オッズは $1/4$、終期オッズは $3/2$ なので

$$
e^{a(t)}=(1/4)^{1-t}(3/2)^t,\qquad
p_e(t)=\frac{(1/4)^{1-t}(3/2)^t}{1+(1/4)^{1-t}(3/2)^t}.
$$

中点ではオッズが $\sqrt{3/8}=\sqrt3/(2\sqrt2)$ で

$$
p_e(1/2)=\frac{\sqrt3}{\sqrt3+2\sqrt2}\ne\frac25.
$$

$0\le t\le1$ では $p_m(t)\in[1/5,3/5]$、e 側のオッズも正の有限値なので $0<p_e(t)<1$ です。
<!-- solution-end -->

### IG8-A02 Poisson 族の接続係数

平均 $\lambda>0$ の Poisson 分布 $P_\lambda(X=x)=e^{-\lambda}\lambda^x/x!$（$x=0,1,\ldots$）について、自然座標 $\theta=\log\lambda$ で $g_{\theta\theta}$ と $\Gamma^{e,\theta}_{\theta\theta}$、$\Gamma^{m,\theta}_{\theta\theta}$ を求め、$\eta=\lambda$ が m-アファインであることを確かめよ。

- Level: A
- 狙い: 双対式の微分と接続係数の変換則を一段ずつ計算する

<!-- solution-start -->
**詳細解答**

$\ell=x\theta-e^\theta-\log x!$、$\psi=e^\theta$ です。[指数型分布族の双対平坦性](#thm-ig8-exponential-dual-flat)の証明と同様に $\ell_{\theta\theta}=-e^\theta$、$E\ell_\theta=E(X-\lambda)=0$ なので $\Gamma^e_{\theta\theta,\theta}=0$ です。Fisher 計量は $g_{\theta\theta}=\psi''=\lambda$ です。

[双対性の座標式](../IG7/index.md#def-ig7-dual-connection)で $\partial_\theta g=\lambda=g(\Gamma^{e,\theta}+\Gamma^{m,\theta})$ とすれば $\Gamma^{m,\theta}_{\theta\theta}=1$ です。$\theta=\log\eta$ では $d\theta/d\eta=1/\eta$、$d^2\theta/d\eta^2=-1/\eta^2$ です。[接続変換則](../IG6/index.md#thm-ig6-coordinate-covariance)より

$$
\Gamma^{m,\eta}_{\eta\eta}
=\eta\left\{\frac1{\eta^2}\cdot1-\frac1{\eta^2}\right\}=0.
$$

これで m 側のアファイン性を係数からも確認できました。
<!-- solution-end -->

### IG8-A03 三値分布の幾何中点

正の三値分布 $p^0=(1/2,1/3,1/6)$ と $p^1=(1/6,1/3,1/2)$ について、$t=1/2$ の e/m 測地線の確率を求め、両方の総和が1であることを確認せよ。

- Level: A
- 狙い: 正規化を抜かさず有限和で検算する

<!-- solution-start -->
**詳細解答**

[有限正単体の e/m 測地線](#thm-ig8-simplex-geodesics)により、m 側は算術中点で $(1/3,1/3,1/3)$ です。e 側の未正規化重みは

$$
w=\left(\sqrt{\frac1{12}},\sqrt{\frac1{9}},\sqrt{\frac1{12}}\right)
=\left(\frac1{2\sqrt3},\frac13,\frac1{2\sqrt3}\right).
$$

和は $Z=1/\sqrt3+1/3=(\sqrt3+1)/3>0$ です。したがって

$$
p^e=\left(\frac{\sqrt3}{2(\sqrt3+1)},\frac1{\sqrt3+1},\frac{\sqrt3}{2(\sqrt3+1)}\right).
$$

分子を足せば $\sqrt3/(\sqrt3+1)+1/(\sqrt3+1)=1$ で、すべて正です。m の総和も $3(1/3)=1$ です。
<!-- solution-end -->

### IG8-A04 平坦でも非アファインな座標

一次元開区間 $\theta>0$ で $\Gamma^\theta_{\theta\theta}=0$ とする。$u=\theta^2$ に座標を変えたとき $\Gamma^u_{uu}$ を計算せよ。この接続が曲率零であることと矛盾するか。

- Level: A
- 狙い: 係数零と曲率零の違いを確認する

<!-- solution-start -->
**詳細解答**

$\theta=\sqrt u$、$d\theta/du=1/(2\sqrt u)$、$d^2\theta/du^2=-1/(4u^{3/2})$、$du/d\theta=2\sqrt u$ です。[IG6 の変換則](../IG6/index.md#thm-ig6-coordinate-covariance)から

$$
\Gamma^u_{uu}=\frac{du}{d\theta}
\left\{\left(\frac{d\theta}{du}\right)^2\Gamma^\theta_{\theta\theta}+\frac{d^2\theta}{du^2}\right\}
=2\sqrt u\left(-\frac1{4u^{3/2}}\right)=-\frac1{2u}.
$$

元の $\theta$ 座標で係数零だから曲率零であり、曲率の零性は座標不変です。$u$ はアファイン座標でないだけで、矛盾しません。
<!-- solution-end -->

### IG8-B01 非定数 Hessian 計量の双対座標

$U=\{(x,y):|x|<1/4,|y|<1/4\}$ 上で $\psi(x,y)=(x^2+y^2)/2+x^2y/2$ とし、$\nabla$ の $(x,y)$ 座標係数を零とする。

1. Hessian が正定値であることを示せ。
2. 双対座標 $\eta_i=\partial_i\psi$ を求めよ。
3. 原点での $\Gamma^{*x}_{xy},\Gamma^{*y}_{xx}$ を求めよ。
4. $\eta$ 座標で原点の双対接続係数が零になる機構を確認せよ。

- Level: B
- 狙い: Hessian の三階微分と逆変換の二階微分を接続する

<!-- solution-start -->
**詳細解答**

偏微分すると

$$
\eta_1=x(1+y),\quad \eta_2=y+\frac{x^2}{2},\qquad
g=\begin{pmatrix}1+y&x\\x&1\end{pmatrix}.
$$

$1+y>3/4>0$ かつ $\det g=1+y-x^2>3/4-1/16>0$ なので、Sylvester の判定から正定値です。[Hessian ポテンシャルからの双対平坦性](#thm-ig8-hessian-dual-flat)の条件を満たします。原点では $g=I$、$\partial_x g_{xy}=1$、$\partial_y g_{xx}=1$ なので

$$
\Gamma^{*x}_{xy}=g^{xk}\partial_xg_{yk}=1,\qquad
\Gamma^{*y}_{xx}=g^{yk}\partial_xg_{xk}=1
$$

です（他の原点の係数は零）。原点で $D\eta=I$ だから逆写像の二階微分は $D^2\theta=-D^2\eta$ です。従って $\partial^2x/\partial\eta_1\partial\eta_2=-1$、$\partial^2y/\partial\eta_1^2=-1$ で、それぞれ $\Gamma^*$ の $+1$ と [座標変換則](../IG6/index.md#thm-ig6-coordinate-covariance)の括弧内で打ち消し合います。他の成分も零なので $\widetilde\Gamma^*=0$ です。定理はこの相殺が原点以外でも成り立つことを証明しています。
<!-- solution-end -->

### IG8-B02 混合型部分族の Fisher 計量と双対性

$p(t)=(1/4+t,1/4+t,1/2-2t)$、$-1/4<t<1/4$ の三値分布を考える。$g_{tt}$ と $H''(t)$、m 接続係数、e 接続の $t$ 座標係数を求め、$t$ は m-アファインだが一般に e-アファインではないことを確認せよ。

- Level: B
- 狙い: 混合型全族でも双対計量が非定数であることを示す

<!-- solution-start -->
**詳細解答**

$u=1/4+t$、$v=1/2-2t$ と置くと $p=(u,u,v)$、$u,v>0$ です。$B=(1,1,-2)^\mathsf T$ の列は非零なので [混合型の命題](#prop-ig8-mixture-flat)を適用できます。

$$
g(t)=\frac1u+\frac1u+\frac{(-2)^2}{v}=\frac2u+\frac4v>0.
$$

$H(t)=2u\log u+v\log v$ を微分すると $H'=2\log u-2\log v$（$2u'+v'=0$）で、$H''=2/u+4/v=g$ です。$\Gamma^{m,t}_{tt}=0$ は $\ell_{tt}=-\ell_t^2$ から従います。双対性の一次元の式 $g'=g(\Gamma^{e,t}_{tt}+\Gamma^{m,t}_{tt})$ から

$$
\Gamma^{e,t}_{tt}=\frac{g'(t)}{g(t)},\qquad
g'(t)=-\frac2{u^2}+\frac8{v^2}.
$$

例えば $t=1/16$ で $u=5/16,v=3/8$ となり、$g'=-512/25+512/9\ne0$ です。従って t は全区間の e-アファイン座標ではありません。e-アファイン座標は $\xi=H'(t)$ で、$d\xi/dt=H''=g>0$ が可逆性を保証します。
<!-- solution-end -->

### IG8-B03 曲がった部分モデルの直線の非閉性

三値全指数型族 $p_{a,b}=(e^a,e^b,1)/(1+e^a+e^b)$ の部分モデル $a=s,b=s^2$（$s\in\mathbb R$）について、$s=-1,1$ の二点を結ぶ**周囲の全族の e 測地線**の中点が部分モデルに属さないことを証明せよ。また、ここから部分モデルの接続曲率が非零だと結論できるか。

- Level: B
- 狙い: 外在的な線分の非閉性と内在曲率を区別する

<!-- solution-start -->
**詳細解答**

二点の自然座標は $(-1,1),(1,1)$ です。[全指数型分布族の双対平坦性](#thm-ig8-exponential-dual-flat)により $a,b$ は e-アファイン座標なので、中点は $(({-1}+1)/2,(1+1)/2)=(0,1)$ です。部分モデルに属するためにはある $s$ について $s=0$ かつ $s^2=1$ が必要ですが、$s=0$ は $s^2=0$ なので不可能です。

この事実は、**周囲の e 測地線が部分モデルに閉じない**ことしか意味しません。部分モデルの接続は接空間へ射影して定義される場合があり、その曲率は別に計算する必要があります。しかも一次元多様体では曲率テンソルの最初の二引数が交代的なので $R(X,Y)Z=0$ が恒等的に成立します。よって曲率非零とは結論できません。
<!-- solution-end -->

### IG8-B04 三値補間の接続係数と正規化

三値分布の自然座標 $\theta^1=\log(p_1/p_3),\theta^2=\log(p_2/p_3)$ と混合座標 $\eta=(p_1,p_2)$ を考える。$p^0=(1/2,1/4,1/4)$、$p^1=(1/4,1/2,1/4)$ を結ぶ e/m 測地線の中点を求め、$\theta(t)$ と $\eta(t)$ のいずれがそれぞれ一定速度であるかを説明せよ。

- Level: B
- 狙い: 分布の線分と正規化幾何補間を座標で検証する

<!-- solution-start -->
**詳細解答**

m の算術中点は $(3/8,3/8,1/4)$、e の未正規化重みは $(1/(2\sqrt2),1/(2\sqrt2),1/4)$ です。$Z=1/\sqrt2+1/4$ だから

$$
p^e(1/2)=\frac{(1/(2\sqrt2),1/(2\sqrt2),1/4)}{1/\sqrt2+1/4},
$$

で、正かつ総和1です。e 側の自然座標の端点は $(\log2,0)$ と $(0,\log2)$ なので、$\theta_e(t)=((1-t)\log2,t\log2)$ となり $\theta_e''(t)=0$ です。m 側では $\eta_m(t)=((1-t)/2+t/4,(1-t)/4+t/2)$ なので $\eta_m''(t)=0$ です。接続の定義が指定するのはこれらのアファイン速度であり、一般に Fisher 長さに関する等速性ではありません。
<!-- solution-end -->

### IG8-C01 全指数型・双対座標・二種類の測地線の再構成

$r\ge3$ とし、正の $r$ 点分布全体を $\theta^i=\log(p_i/p_r)$（$i<r$）で表示する。

1. $\psi(\theta)$ と $p_i(\theta)$ を正規化から導き、$\eta_i=\partial_i\psi$ が混合座標となることを示せ。
2. $g_{ij}$ と $\ell_{ij}$ を計算して、e 接続係数が零で $g$ が正定値になることを証明せよ。
3. Hessian と計量双対の関係から m 接続が $\eta$ 座標で零になることを説明せよ。
4. $p^0,p^1\in\Delta_{r-1}^{\circ}$ を結ぶ e/m 測地線の式を導き、どちらも全区間で正規化されることを証明せよ。
5. $r=3$、$p^0=(1/2,1/3,1/6)$、$p^1=(1/6,1/3,1/2)$ の中点を計算して比較し、もし端点が単体の境界に達したらどの仮定が失われるか述べよ。

- Level: C
- 狙い: 全族の正則性から平坦性・測地線・境界の限界まで一体として証明する

<!-- solution-start -->
**詳細解答**

1. $F_i(x)=\mathbf1_{\{x=i\}}$（$i<r$）、$h(x)=1$ とすれば $\sum_x e^{\sum_i\theta^iF_i(x)}=1+\sum_{i<r}e^{\theta^i}$ です。よって

   $$
   \psi(\theta)=\log\left(1+\sum_{i<r}e^{\theta^i}\right),\quad
   p_i=\frac{e^{\theta^i}}{1+\sum_{j<r}e^{\theta^j}},\quad
   p_r=\frac1{1+\sum_{j<r}e^{\theta^j}}.
   $$

   微分すると $\eta_i=\partial_i\psi=p_i$ です。正規化と $p_i>0$ より $\sum_{i<r}\eta_i<1$ で、逆写像 $\theta^i=\log\{\eta_i/(1-\sum_j\eta_j)\}$ が存在します。

2. $\ell_i=\mathbf1_{\{x=i\}}-p_i$、$\ell_{ij}=-\partial_jp_i$ なので

   $$
   g_{ij}=\partial_jp_i=p_i\delta_{ij}-p_ip_j,\qquad
   \ell_{ij}=-g_{ij}.
   $$

   $\ell_{ij}$ は $x$ に依らず、$E\ell_k=p_k-p_k=0$ です。[統計モデルの α-接続の定義](../IG7/index.md#def-ig7-alpha-connection)に $\alpha=+1$ を代入し $\Gamma^e_{ij,k}=E[\ell_{ij}\ell_k]=-g_{ij}E\ell_k=0$ を得ます。$v\in\mathbb R^{r-1}$ に $v_r=0$ を付け加えると

   $$
   v^\mathsf Tg v=\sum_{i=1}^r p_iv_i^2-\left(\sum_{i=1}^r p_iv_i\right)^2
   =\sum_{i=1}^r p_i(v_i-\bar v)^2,\quad \bar v=\sum_i p_iv_i.
   $$

   全 $p_i>0$ の下で零となるのは全 $v_i$ が等しいときだけですが、$v_r=0$ なので $v=0$ です。したがって正定値です。

3. $g_{ij}=\partial_i\partial_j\psi$ と $\Gamma^e=0$、$\Theta=\mathbb R^{r-1}$ の凸性が揃っています。[Hessian ポテンシャルからの双対平坦性](#thm-ig8-hessian-dual-flat)に入力すると、e の計量双対は $\eta_i=\partial_i\psi$ 座標で係数零です。[IG7 の双対性](../IG7/index.md#thm-ig7-alpha-duality)でその接続が m に一致します。前問で $\eta=(p_1,\ldots,p_{r-1})$ の逆写像も検証したため、局所だけでなく正単体全体のアファイン座標です。

4. m では $\eta_i(t)=(1-t)p_i^0+tp_i^1$、最後の成分も総和1から同じ一次式です。e では $\theta^i(t)=(1-t)\log(p_i^0/p_r^0)+t\log(p_i^1/p_r^1)$ なので、指数を取り、$w_i(t)=(p_i^0)^{1-t}(p_i^1)^t$ を使えば $p_i^e(t)=w_i(t)/\sum_jw_j(t)$ です。$0\le t\le1$ で $p_i^m>0,w_i>0$ であり、いずれも総和は1です。両曲線とも対応するアファイン座標で二階微分零なので、[測地線の定義](#def-ig8-em-geodesic)を満たします。

5. m 中点は $(1/3,1/3,1/3)$ です。e 中点は $w=(1/(2\sqrt3),1/3,1/(2\sqrt3))$、$\sum w=(\sqrt3+1)/3$ を代入して

   $$
   p^e(1/2)=\left(\frac{\sqrt3}{2(\sqrt3+1)},\frac1{\sqrt3+1},\frac{\sqrt3}{2(\sqrt3+1)}\right)
   $$

   となり、一般には一致しません。境界で $p_i=0$ を許すと $\log(p_i/p_r)$ の対数比が発散・未定義になり、共通の正の台と自然座標の可逆性が失われます。Fisher 表示 $\sum_i (dp_i)^2/p_i$ もそのままでは境界で定義できず、本定理の正則な内部に関する結論を無条件に延長できません。
<!-- solution-end -->

---

## 7. 何が分かったか

- **双対平坦**とは、双対な二接続が捩率零・曲率零であることです。計量双対性だけでは平坦性を保証しません。
- 正定値 Hessian $g_{ij}=\partial_i\partial_j\psi$ と一方のアファイン座標 $\theta$ があれば、$\eta_i=\partial_i\psi$ はもう一方のアファイン座標となります。逆 Hessian と Legendre 双対がこの変換を支えます。
- 最小・正則な**全指数型分布族**では e の接続係数が自然座標で零、m の係数が期待値座標で零です。有限正確率単体の m 測地線は算術補間、e 測地線は正規化した幾何補間です。
- 混合型部分族は混合母数で m 平坦ですが、曲がった指数型部分族で周囲の e 線分が内部に留まるとは限りません。双対平坦性は Levi-Civita 曲率零も意味しません。

次の IG9 では、二種類のアファイン座標とそのポテンシャルから、二点間の隔たり（正準 divergence）を作ります。
