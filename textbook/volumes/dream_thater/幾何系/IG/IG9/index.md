# IG9 正準 divergence と Bregman 幾何

<!-- definition-example-audit: strict -->

[IG8 の双対平坦性](../IG8/index.md#def-ig8-dually-flat)では、同じ分布に自然座標 $\theta$ と期待値座標 $\eta$ を付け、二つの接続で異なる直線を描きました。しかし「直線」を得ただけでは、二点の隔たりをどの数で測るかはまだ決まりません。Fisher 計量から作る長さと、[IG3 の KL divergence](../IG3/index.md#thm-ig3-kl-fisher-hessian) のような非対称の隔たりも別物です。

ここでは凸なポテンシャルのグラフと接平面の**縦の差**を測ります。この差を二点に対応させると、双対座標に自然な向きのある divergence ができ、正則な全指数型分布族では KL divergence に一致します。最後に三点の差を分解する恒等式を導きます。射影の存在・最小性・直交条件を証明するのは次の IG10 です。

本講で使う設定を固定します。$U\subset\mathbb R^d$ は空でない開凸集合、$\psi\in C^4(U)$ は各点で正定値な Hessian を持つ関数です。

$\theta=(\theta^1,\ldots,\theta^d)$ を $U$ の座標とし、$\eta_i=\partial_i\psi(\theta)$ と置きます。内積の点は $\theta\cdot\eta=\sum_i\theta^i\eta_i$ を表します。

[IG5 の Legendre 双対](../IG5/index.md#thm-ig5-legendre-hessian)と[IG8 の Hessian 双対平坦性](../IG8/index.md#thm-ig8-hessian-dual-flat)により、$\eta$ は開集合 $V=\eta(U)$ への一対一の滑らかな座標で、双対ポテンシャル

$$
\varphi(\eta)=\theta(\eta)\cdot\eta-\psi(\theta(\eta)),
\qquad \nabla_\eta\varphi(\eta)=\theta(\eta)
$$

が定まります。$U$ は凸なので二点を結ぶ線分も $U$ に入ります。$V$ の凸性は一般には仮定しません。以下の「三点」は常に $U$ の内部の点を指します。

## 1. 凸関数のグラフと接平面の差

一変数の厳密凸関数では、ある点で引いた接線よりグラフが上にあります。多変数では、点 $y$ における一次近似 $\psi(y)+\nabla\psi(y)\cdot(x-y)$ が接平面に当たります。グラフ $\psi(x)$ からこれを引くと、**起点 $y$ に依存する**隔たりが作れます。

<a id="def-ig9-bregman"></a>

<!-- formal-statement-start -->
> **定義（Bregman divergence）**  
> 開凸集合 $U\subset\mathbb R^d$ 上の微分可能な凸関数 $\psi:U\to\mathbb R$ と $x,y\in U$ に対し、$y$ における接平面と $x$ における関数値の差を **Bregman divergence** と定める。

$$
D_\psi(x:y)=\psi(x)-\psi(y)-\nabla\psi(y)\cdot(x-y).
$$

> コロンの左側を評価点、右側を接平面の基点とする。この順序を本講で固定する。
<!-- formal-statement-end -->

<!-- definition-example-start: def-ig9-bregman -->
**定義の確認**（二次関数）。$U=\mathbb R$、$\psi(t)=t^2/2$ は $\psi''=1>0$ なので凸かつ微分可能です。$y$ の接線は $t\mapsto y^2/2+y(t-y)$ ですから、

$$
D_\psi(x:y)=\frac{x^2-y^2}{2}-y(x-y)
=\frac{(x-y)^2}{2}.
$$

関数値から**右側の点 $y$ における**接線の値を引いたこと、$x,y$ がともに定義域にあること、結果が非負で $x=y$ にだけ零であることを確認できました。別の凸ポテンシャルでは一般に引数交換で値が変わります。
<!-- definition-example-end -->

非負性は「距離」という呼び名だけからは出ません。凸性に必要な線分上で関数を一変数に制限して確かめます。

<a id="thm-ig9-bregman-positive"></a>

<!-- formal-statement-start -->
> **定理（Bregman divergence の非負性と積分表示）**  
> $U\subset\mathbb R^d$ を開凸集合、$\psi\in C^2(U)$ を凸関数とする。任意の $x,y\in U$ について $D_\psi(x:y)\ge0$ である。さらに

$$
D_\psi(x:y)=\int_0^1(1-t)(x-y)^\mathsf T
\nabla^2\psi\bigl(y+t(x-y)\bigr)(x-y)\,dt.
$$

> $\psi$ が厳密凸なら $D_\psi(x:y)=0$ は $x=y$ と同値である。特に Hessian が全域で正定値なら厳密凸であり、$x\ne y$ のとき $D_\psi(x:y)>0$ となる。
<!-- formal-statement-end -->

### 証明の見取り図

二点の差 $v=x-y$ に沿う一変数関数 $f(t)=\psi(y+tv)$ を作ります。$f''(t)=v^\mathsf T\nabla^2\psi(y+tv)v$ を積分すると、接線との差が非負な Hessian の重み付き積分になります。厳密凸性だけを仮定する場合は接線が他点で一致し得ないことを示します。

<!-- proof-start -->
### 証明

$v=x-y$、$f(t)=\psi(y+tv)$（$0\le t\le1$）と置きます。凸な $U$ 上の線分なので $f$ は定義され、連鎖律により

$$
f'(t)=\nabla\psi(y+tv)\cdot v,\qquad
f''(t)=v^\mathsf T\nabla^2\psi(y+tv)v
$$

です。部分積分を用いると

$$
\begin{aligned}
\int_0^1(1-t)f''(t)\,dt
&=[(1-t)f'(t)]_0^1+\int_0^1f'(t)\,dt\\
&=-f'(0)+f(1)-f(0)=D_\psi(x:y).
\end{aligned}
$$

$C^2$ 凸関数の Hessian は半正定値なので被積分項は非負です。正定値なら $v\ne0$ に対して $f''(t)>0$ で、積分は正です。

一般に微分可能な厳密凸関数についても、$x\ne y$ なら接平面の等号は成立しません。実際、もし $\psi(x)=\psi(y)+\nabla\psi(y)\cdot(x-y)$ なら、凸性から任意の $0<t<1$ に対し

$$
\psi(y+t(x-y))\le(1-t)\psi(y)+t\psi(x)
=\psi(y)+t\nabla\psi(y)\cdot(x-y).
$$

逆向きも確かめます。凸な一変数関数 $f(t)=\psi(y+t(x-y))$ の導関数は非減少なので、$0<t<1$ に対し

$$
f(t)-f(0)=\int_0^t f'(s)\,ds\ge t f'(0)
=t\nabla\psi(y)\cdot(x-y).
$$

従って直前の上側評価と同じ量で挟まれ、等号となります。しかし $x\ne y$ であれば厳密凸性から上側評価は真の不等号なので矛盾します。$x=y$ では定義式から零です。
<!-- proof-end -->

**失われる仮定**。$\psi(t)=t$ なら凸ですが厳密凸ではなく、どの二点でも $D_\psi=0$ です。接線とグラフが全区間で重なり、上の証明の厳密不等号が消えるためです。また $\psi(t)=t^4$ では $t=0$ で Hessian が零でも厳密凸なので、正定値 Hessian は十分条件であって必要条件ではありません。

**対称性も三角不等式も自動ではない**。たとえば $U=(0,\infty)$、$\psi(t)=-\log t$ なら

$$
D_\psi(x:y)=\frac{x}{y}-1-\log\frac{x}{y}.
$$

$D_\psi(2:1)=1-\log2$、$D_\psi(1:2)=\log2-1/2$ は異なります。Bregman divergence を一般の距離と混同しないでください。

## 2. 双対座標から正準 divergence を作る

[IG8 の Hessian 双対平坦性](../IG8/index.md#thm-ig8-hessian-dual-flat)では、$\theta$ は一方の接続のアファイン座標、$\eta=\nabla\psi(\theta)$ はその計量双対接続のアファイン座標でした。ポテンシャルが互いに Legendre 双対であるため、二点 $P,Q$ の $\theta$ 座標と $\eta$ 座標を「交差させて」引く量が作れます。

<a id="def-ig9-canonical"></a>

<!-- formal-statement-start -->
> **定義（双対平坦座標の正準 divergence）**  
> $U\subset\mathbb R^d$ が開凸、$\psi\in C^4(U)$ の Hessian が正定値で、[IG8 の構成](../IG8/index.md#thm-ig8-hessian-dual-flat)による双対平坦構造 $(U,g,\nabla,\nabla^*)$ と双対座標 $\eta=\nabla\psi(\theta)$、$\varphi$ が与えられているとする。$P,Q\in U$ の座標を $\theta_P,\theta_Q$、$\eta_P,\eta_Q$ と書く。**正準 divergence** を

$$
\mathcal D(P:Q)=
\psi(\theta_P)+\varphi(\eta_Q)-\theta_P\cdot\eta_Q
$$

> で定める。本講ではこの向きが $D_\psi(\theta_P:\theta_Q)$ と一致する規約を採用する。
<!-- formal-statement-end -->

<!-- definition-example-start: def-ig9-canonical -->
**定義の確認**（重み付き二次ポテンシャル）。$U=\mathbb R^2$ とし、$\psi(\theta)=((\theta^1)^2+4(\theta^2)^2)/2$ とします。$g=\operatorname{diag}(1,4)$ は正定値で、$U$ は開凸です。$\eta=(\theta^1,4\theta^2)$ は逆写像 $\theta=(\eta_1,\eta_2/4)$ を持ち、[IG8 の定理](../IG8/index.md#thm-ig8-hessian-dual-flat)の双対平坦条件が成立します。$\varphi(\eta)=(\eta_1^2+\eta_2^2/4)/2$ なので

$$
\begin{aligned}
\mathcal D(P:Q)
&=\frac{(\theta_P^1)^2+4(\theta_P^2)^2}{2}
+\frac{(\theta_Q^1)^2+4(\theta_Q^2)^2}{2}
-\theta_P^1\theta_Q^1-4\theta_P^2\theta_Q^2\\
&=\frac{(\theta_P^1-\theta_Q^1)^2+
4(\theta_P^2-\theta_Q^2)^2}{2}.
\end{aligned}
$$

両点の座標が定義され、双対関係・正定値・零点をすべて確認しました。この特殊例は対称ですが、一般の正準 divergence は対称ではありません。
<!-- definition-example-end -->

なぜこの形が Bregman divergence になるのでしょう。定義に現れる $\varphi(\eta_Q)$ を $\theta_Q$ で書き換えるだけで、接平面との差が表れます。

<a id="thm-ig9-canonical-dual"></a>

<!-- formal-statement-start -->
> **定理（正準 divergence の双対表示）**  
> [正準 divergence の定義](#def-ig9-canonical)の仮定の下で、すべての $P,Q\in U$ について

$$
\mathcal D(P:Q)=D_\psi(\theta_P:\theta_Q)
=D_\varphi(\eta_Q:\eta_P).
$$

> 特に $\mathcal D(P:Q)\ge0$ で、$\mathcal D(P:Q)=0$ は $P=Q$ と同値である。逆向きの $\mathcal D(Q:P)$ は一般には異なる。
<!-- formal-statement-end -->

### 証明の見取り図

$\varphi(\eta_Q)$ を $\theta_Q\cdot\eta_Q-\psi(\theta_Q)$ に置き換えると第一の表示が出ます。第二の表示には、今度は $\psi(\theta_P)=\theta_P\cdot\eta_P-\varphi(\eta_P)$ を使います。

<!-- proof-start -->
### 証明

[IG5 の Legendre 等式](../IG5/index.md#thm-ig5-legendre-hessian)を点 $Q$ に適用すると

$$
\begin{aligned}
\mathcal D(P:Q)
&=\psi(\theta_P)+\theta_Q\cdot\eta_Q-\psi(\theta_Q)
-\theta_P\cdot\eta_Q\\
&=\psi(\theta_P)-\psi(\theta_Q)
-\nabla\psi(\theta_Q)\cdot(\theta_P-\theta_Q)
=D_\psi(\theta_P:\theta_Q).
\end{aligned}
$$

同じ Legendre 等式を $P$ に適用して

$$
\begin{aligned}
\mathcal D(P:Q)
&=\varphi(\eta_Q)-\varphi(\eta_P)
+\theta_P\cdot\eta_P-\theta_P\cdot\eta_Q\\
&=\varphi(\eta_Q)-\varphi(\eta_P)
-\nabla\varphi(\eta_P)\cdot(\eta_Q-\eta_P)
=D_\varphi(\eta_Q:\eta_P).
\end{aligned}
$$

となります。[非負性定理](#thm-ig9-bregman-positive)を $\psi$ に適用します。Hessian が正定値なので $\theta_P=\theta_Q$ の場合に限り零です。$\theta$ は座標として一対一だから、これは $P=Q$ に等価です。
<!-- proof-end -->

この式では **$\theta$ 側は $(P:Q)$、$\eta$ 側は $(Q:P)$** と向きが反転します。$\eta_P=\nabla\psi(\theta_P)$ などの対応を保ったまま、左右を取り替えないことが重要です。 $V$ が凸でない場合の $D_\varphi(\eta_Q:\eta_P)$ は、同じ接平面差の**代数式**を $V$ 上の二点で評価した記号です。第1節の「開凸集合上の Bregman divergence」の非負性定理を $V$ に直接適用するのではなく、上で証明した $D_\psi$ との等式から非負性を得ています。

### 座標とポテンシャルの取り替え

$\psi$ に一次関数 $a\cdot\theta+b$ を加えると、勾配は $\eta+a$ にずれますが、Bregman の差では追加分が相殺します。また $\widetilde\theta=A\theta+c$（$A$ は可逆行列）のもとで $\widetilde\psi(\widetilde\theta)=\psi(A^{-1}(\widetilde\theta-c))$ と変換すると、連鎖律で $\nabla_{\widetilde\theta}\widetilde\psi=A^{-\mathsf T}\eta$ です。よって

$$
\bigl(A^{-\mathsf T}\eta_Q\bigr)\cdot
\bigl(A\theta_P-A\theta_Q\bigr)
=\eta_Q\cdot(\theta_P-\theta_Q),
$$

となり、$D_\psi$ の値は不変です。これは**同一の双対平坦構造を表すアファイン座標・ポテンシャルの許容変更**についての主張です。任意の非線形座標変換で、同じ関数形をそのまま代入してよいという主張ではありません。

さらに大域的な注意があります。上では一つの開凸な大域アファイン座標とポテンシャルを仮定しました。局所的に双対平坦であっても、大域座標や二点を同時に含むパッチが存在するとは限りません。その場合、この式を任意の二点に大域的に定義できたことにはなりません。

## 3. 指数型分布族では KL と一致する — 向きに注意

今度は幾何的に作った $\mathcal D$ を確率モデルへ戻します。[IG8 の全指数型分布族の双対平坦性](../IG8/index.md#thm-ig8-exponential-dual-flat)が適用できるとき、$\psi$ は対数分配関数、$\eta=E_\theta F$ は十分統計量の平均です。

<a id="thm-ig9-exponential-kl"></a>

<!-- formal-statement-start -->
> **定理（全指数型分布族の正準 divergence と KL）**  
> 同じ支配測度 $\mu$ と共通の正の台を持つ、最小・正則な $d$ 次元の全指数型分布族

$$
p_\theta(x)=h(x)\exp\{\theta\cdot F(x)-\psi(\theta)\},
\qquad\theta\in\Theta
$$

> を考える。$\Theta$ は開凸、$\psi\in C^4(\Theta)$ は正定値 Hessian を持ち、正規化の微分と積分の交換が成立し、各 $\theta'$ の下で $F$ の各成分が可積分とする。このとき任意の $\theta,\theta'\in\Theta$ に対し両辺は有限で、

$$
\mathcal D(p_\theta:p_{\theta'})
=D_\psi(\theta:\theta')
=D_{\mathrm{KL}}(p_{\theta'}\Vert p_\theta).
$$

> 左側の第1引数に対応する分布 $p_\theta$ は、KL の**第2引数**になる。
<!-- formal-statement-end -->

### 証明の見取り図

KL の被積分関数は $\log(p_{\theta'}/p_\theta)$ です。自然母数の差に $F$ が掛かった項を $p_{\theta'}$ で期待値にすると、$\eta(\theta')=\nabla\psi(\theta')$ が現れます。残りの定数は対数分配関数の差です。

<!-- proof-start -->
### 証明

共通の正の台上で対数比を計算すると、

$$
\begin{aligned}
\log\frac{p_{\theta'}(x)}{p_\theta(x)}
&=\log h(x)+\theta'\cdot F(x)-\psi(\theta')\\
&\quad-\log h(x)-\theta\cdot F(x)+\psi(\theta)\\
&=(\theta'-\theta)\cdot F(x)+\psi(\theta)-\psi(\theta').
\end{aligned}
$$

ここで基準分布 $p_{\theta'}$ に関して積分し、[IG4 の対数分配関数の微分式](../IG4/index.md#thm-ig4-fisher-hessian)から $E_{\theta'}F=\nabla\psi(\theta')$ を使えば

$$
\begin{aligned}
D_{\mathrm{KL}}(p_{\theta'}\Vert p_\theta)
&=E_{\theta'}\!\left[
(\theta'-\theta)\cdot F+\psi(\theta)-\psi(\theta')\right]\\
&=\psi(\theta)-\psi(\theta')
-\nabla\psi(\theta')\cdot(\theta-\theta')\\
&=D_\psi(\theta:\theta')=\mathcal D(p_\theta:p_{\theta'}).
\end{aligned}
$$

各 $F_i$ の可積分性と有限な $\psi$ により期待値の絶対可積分性が確保され、ここでの KL は有限です。最後の等号には[双対表示定理](#thm-ig9-canonical-dual)を用いました。
<!-- proof-end -->

**Bernoulli で向きを検算**。標本 $X\in\{0,1\}$ に対して $P_a(X=x)=p^x(1-p)^{1-x}$、$p=e^a/(1+e^a)$ とします。$\psi(a)=\log(1+e^a)$、$\psi'(a)=p$、$\psi''(a)=p(1-p)>0$ で、自然母数の定義域は $\mathbb R$ です。二点の成功確率を $p$（左）、$q$（右）、対応する logit を $a,b$ とすると

$$
\begin{aligned}
D_\psi(a:b)
&=\log\frac{1+e^a}{1+e^b}-q(a-b)\\
&=\log\frac{1-q}{1-p}
-q\log\frac{p(1-q)}{q(1-p)}\\
&=q\log\frac{q}{p}+(1-q)\log\frac{1-q}{1-p}.
\end{aligned}
$$

これは**$D_{\mathrm{KL}}(\mathrm{Bern}(q)\Vert\mathrm{Bern}(p))$** です。$p=3/4,q=1/4$ なら $D_\psi(a:b)=\tfrac12\log3$、逆向きもこの対称な端点の組では偶然同じなので、向きの検算には $p=1/2,q=1/4$ を使うと

$$
D_\psi(a:b)=\tfrac14\log\tfrac12+\tfrac34\log\tfrac32,
\qquad
D_\psi(b:a)=\tfrac12\log\tfrac43
$$

となり一致しません。$0<p,q<1$ なので境界での対数の未定義性はありません。

**Poisson で別の検算**。$P_\lambda(X=x)=e^{-\lambda}\lambda^x/x!$（$x=0,1,\ldots,\lambda>0$）は $a=\log\lambda$、$\psi(a)=e^a$、$\eta=\lambda$ の全指数型分布族です。右点を $\mu>0$、左点を $\lambda>0$ とすると

$$
D_\psi(\log\lambda:\log\mu)
=\lambda-\mu-\mu\log\frac{\lambda}{\mu}
=D_{\mathrm{KL}}(P_\mu\Vert P_\lambda).
$$

$\psi''=e^a>0$ で可逆性が成立し、$\mu>0$ では $E_\mu X=\mu<\infty$ です。Bernoulli と異なる無限離散の例でも定理の可積分条件が確認できました。

### KL と同一視できない場合

上の一致は、**その対数分配関数から作った双対平坦構造**について証明したものです。たとえば同じ Bernoulli モデルに自然座標 $a$ と別の二次ポテンシャル $\widetilde\psi(a)=a^2/2$ を形式的に与えると、その Bregman divergence は $(a-b)^2/2$ で、通常の Bernoulli KL とは一致しません。この別ポテンシャルの Hessian は Bernoulli Fisher 計量 $p(1-p)$ と一致しないので、**統計モデルから誘導された同じ幾何ではない**ことが相違の理由です。

また、一般の曲がった統計モデルに大域的な e/m アファイン座標と対数分配関数があるとは限りません。前節の「正準」という語だけから、任意の統計多様体で $\mathcal D=D_{\mathrm{KL}}$ と推論することはできません。

## 4. 三点の差は双対座標の内積になる

二点間の隔たりが非対称なら、三点 $x,y,z$ の差 $D_\psi(x:z)-D_\psi(x:y)-D_\psi(y:z)$ は一般に零ではありません。しかし定義式を展開すると、残りはポテンシャルの値を含まず、**座標差と双対座標差の内積**だけになります。これが次の IG10 の射影・直交を支える恒等式です。

<a id="thm-ig9-three-point"></a>

<!-- formal-statement-start -->
> **定理（Bregman 三点恒等式）**  
> 開凸集合 $U\subset\mathbb R^d$ 上の微分可能な凸関数 $\psi$ と $x,y,z\in U$ について、次が成り立つ。

$$
D_\psi(x:z)=D_\psi(x:y)+D_\psi(y:z)
+(x-y)\cdot\bigl(\nabla\psi(y)-\nabla\psi(z)\bigr).
$$

> 特に正定値 Hessian の双対平坦座標では、$x=\theta_P,y=\theta_Q,z=\theta_R$ として最後の項は $(\theta_P-\theta_Q)\cdot(\eta_Q-\eta_R)$ である。
<!-- formal-statement-end -->

### 証明の見取り図

三つの Bregman divergence を[定義](#def-ig9-bregman)で展開します。$\psi(x),\psi(y),\psi(z)$ はすべて打ち消し合い、残る一次式を $(x-y)$ でくくります。

<!-- proof-start -->
### 証明

$D_\psi(x:z)-D_\psi(x:y)-D_\psi(y:z)$ に定義を代入すると

$$
\begin{aligned}
&[\psi(x)-\psi(z)-\nabla\psi(z)\cdot(x-z)]\\
&\quad-[\psi(x)-\psi(y)-\nabla\psi(y)\cdot(x-y)]\\
&\quad-[\psi(y)-\psi(z)-\nabla\psi(z)\cdot(y-z)]\\
&=-\nabla\psi(z)\cdot[(x-z)-(y-z)]
+\nabla\psi(y)\cdot(x-y)\\
&=(x-y)\cdot(\nabla\psi(y)-\nabla\psi(z)).
\end{aligned}
$$

最後に $x=\theta_P,y=\theta_Q,z=\theta_R$ を代入し、$\eta_Q=\nabla\psi(\theta_Q)$、$\eta_R=\nabla\psi(\theta_R)$ と読めば主張の双対座標表示を得ます。
<!-- proof-end -->

**二次関数の例**。$\psi(t)=t^2/2$、$x=3,y=2,z=0$ なら左辺は $D(3:0)=9/2$、右辺は $D(3:2)=1/2$、$D(2:0)=2$、残差 $(3-2)(2-0)=2$ で、$1/2+2+2=9/2$ と一致します。非負な divergence の和に、符号が決まらない内積補正項が付くことに注意してください。

この最後の内積が零になる条件は、適切な二種類の接続の接ベクトルに関する直交として解釈できます。ただし、**内積が零になる幾何学的状況や射影の存在・一意性はまだ仮定していません**。それらは IG10 で確認します。

## 5. 対角線の近くでは Fisher 計量に戻る

大きく離れた二点の Bregman divergence は非対称ですが、一方を微小に動かすと、最初の非零項は Hessian 計量です。

<a id="prop-ig9-local-metric"></a>

<!-- formal-statement-start -->
> **命題（正準 divergence の局所二次項）**  
> $U$ と $\psi\in C^4(U)$ が[正準 divergence の定義](#def-ig9-canonical)の仮定を満たすとする。$\theta\in U$ と十分小さい $\delta\in\mathbb R^d$ に対し

$$
\mathcal D(\theta+\delta:\theta)
=\frac12\,\delta^\mathsf T g(\theta)\delta+O(\|\delta\|^3),
\qquad g(\theta)=\nabla^2\psi(\theta).
$$
<!-- formal-statement-end -->

### 証明の見取り図

[Taylor 展開](../../../基礎科目/RA/RA3/index.md#thm-ra3-taylor)で $\psi(\theta+\delta)$ の定数・一次項を取り出すと Bregman の定義で相殺され、二次項だけが残ります。$C^3$ の仮定は三次剰余を局所的に抑えるために使います。

<!-- proof-start -->
### 証明

$\theta$ を含む閉球が $U$ に入るよう $\delta$ を小さく取ります。$h(t)=\psi(\theta+t\delta)$ は線分上で $C^3$ です。[Taylor の定理](../../../基礎科目/RA/RA3/index.md#thm-ra3-taylor)の展開点を $t=0$、評価点を $t=1$、次数を2として使うと

$$
\psi(\theta+\delta)
=\psi(\theta)+\nabla\psi(\theta)\cdot\delta
+\frac12\delta^\mathsf T\nabla^2\psi(\theta)\delta+R_3.
$$

$h'''(t)=\sum_{ijk}\partial_{ijk}\psi(\theta+t\delta)\delta^i\delta^j\delta^k$ です。三階偏導関数は閉球上で有界なので $|R_3|\le C\|\delta\|^3$ となります。[正準 divergence の双対表示](#thm-ig9-canonical-dual)による $D_\psi(\theta+\delta:\theta)$ の式に代入し、定数・一次項を引けば主張です。
<!-- proof-end -->

これは[IG3 の KL からの Fisher 二次項](../IG3/index.md#thm-ig3-kl-fisher-hessian)と整合します。ただし一致するのは同じ統計モデルの対数分配関数を使う第3節の状況です。境界や Fisher 計量が退化する場所まで $O(\|\delta\|^3)$ の一様性を主張していません。

---

## 6. 演習：向き・双対性・三点の計算

### IG9-A01 二次ポテンシャルの定義確認

$U=\mathbb R^2$、$\psi(x_1,x_2)=(x_1^2+3x_2^2)/2$ とする。Hessian の正定値性を確かめ、任意の $x,y\in U$ の $D_\psi(x:y)$ を求めよ。零となる条件と対称性も述べよ。

- Level: A
- 狙い: 接平面の差を座標で計算し、二次型との関係を確認する

<!-- solution-start -->
**詳細解答**

$\nabla\psi(y)=(y_1,3y_2)$、$\nabla^2\psi=\operatorname{diag}(1,3)$ なので $v\ne0$ に対し $v^\mathsf T\nabla^2\psi v=v_1^2+3v_2^2>0$ です。[定義](#def-ig9-bregman)へ代入すると

$$
\begin{aligned}
D_\psi(x:y)&=\frac{x_1^2+3x_2^2-y_1^2-3y_2^2}{2}
-y_1(x_1-y_1)-3y_2(x_2-y_2)\\
&=\frac{(x_1-y_1)^2+3(x_2-y_2)^2}{2}.
\end{aligned}
$$

両平方は非負なので零となるのは $x_1=y_1,x_2=y_2$ のときだけです。差の平方だけから決まるためこの例では $D_\psi(x:y)=D_\psi(y:x)$ です。
<!-- solution-end -->

### IG9-A02 Bernoulli の KL の向き

$X\in\{0,1\}$ の Bernoulli 分布で、成功確率 $p=1/2$ と $q=1/4$ を取る。自然母数 $a=\log\{p/(1-p)\}$、$b=\log\{q/(1-q)\}$、対数分配関数 $\psi(t)=\log(1+e^t)$ に対し $D_\psi(a:b)$ と $D_\psi(b:a)$ をそれぞれ求め、どちらがどの向きの KL か答えよ。

- Level: A
- 狙い: 第1引数と KL の基準分布の取り違えを防ぐ

<!-- solution-start -->
**詳細解答**

$a=0$、$b=-\log3$ です。$\psi(a)=\log2$、$\psi(b)=\log(4/3)$、$\psi'(a)=1/2$、$\psi'(b)=1/4$ なので

$$
\begin{aligned}
D_\psi(a:b)&=\log2-\log(4/3)-\tfrac14\log3
=\log(3/2)-\tfrac14\log3,\\
D_\psi(b:a)&=\log(4/3)-\log2-\tfrac12(-\log3)
=\log(2/3)+\tfrac12\log3=\tfrac12\log(4/3).
\end{aligned}
$$

最初の値は $(1/4)\log((1/4)/(1/2))+(3/4)\log((3/4)/(1/2))$ に等しく、[指数型族の定理](#thm-ig9-exponential-kl)から $D_{\mathrm{KL}}(\mathrm{Bern}(q)\Vert\mathrm{Bern}(p))$ です。後者は $D_{\mathrm{KL}}(\mathrm{Bern}(p)\Vert\mathrm{Bern}(q))$ です。
<!-- solution-end -->

### IG9-A03 Poisson の非対称性

$P_\lambda(X=x)=e^{-\lambda}\lambda^x/x!$（$x=0,1,\ldots$）、$\lambda>0$ に対し、$\lambda=4$、$\mu=1$ とする。$\psi(a)=e^a$、$a=\log\lambda$ を用い $D_\psi(\log4:\log1)$ と逆向きを計算せよ。

- Level: A
- 狙い: 無限離散型でも期待値と向きを確認する

<!-- solution-start -->
**詳細解答**

$\psi'(\log\mu)=\mu$ なので[定義](#def-ig9-bregman)から

$$
D_\psi(\log4:\log1)=4-1-1(\log4-\log1)=3-\log4,
$$

$$
D_\psi(\log1:\log4)=1-4-4(\log1-\log4)=-3+4\log4.
$$

両者は正で異なります。$P_\mu$ の下で $EX=\mu<\infty$、両分布の台は $\{0,1,\ldots\}$ で共通です。[KL 一致定理](#thm-ig9-exponential-kl)によって前者は $D_{\mathrm{KL}}(P_1\Vert P_4)$、後者は $D_{\mathrm{KL}}(P_4\Vert P_1)$ です。
<!-- solution-end -->

### IG9-A04 Legendre 双対で引数が逆になる理由

$U=(0,\infty)$、$\psi(\theta)=-\log\theta$ とする。$\eta=\psi'(\theta)$、像 $V$、双対ポテンシャル $\varphi(\eta)$ を求め、$D_\psi(x:y)=D_\varphi(\eta_y:\eta_x)$ を直接計算で確かめよ（$x,y>0$）。

- Level: A
- 狙い: 双対座標での Bregman の引数反転を手計算する

<!-- solution-start -->
**詳細解答**

$\psi'(\theta)=-1/\theta$、$\psi''(\theta)=1/\theta^2>0$ なので $\eta=-1/\theta$ は $V=(-\infty,0)$ への可逆写像です。逆は $\theta=-1/\eta$ で、[Legendre 双対](../IG5/index.md#thm-ig5-legendre-hessian)から

$$
\varphi(\eta)=(-1/\eta)\eta-[-\log(-1/\eta)]
=-1-\log(-\eta),\qquad\varphi'(\eta)=-1/\eta.
$$

$\eta_x=-1/x$、$\eta_y=-1/y$ を代入すると

$$
\begin{aligned}
D_\varphi(\eta_y:\eta_x)
&=\log\frac{-\eta_x}{-\eta_y}-\left(-\frac1{\eta_x}\right)(\eta_y-\eta_x)\\
&=\log\frac{y}{x}+x\left(-\frac1y+\frac1x\right)
=\frac{x}{y}-1-\log\frac{x}{y}.
\end{aligned}
$$

これは $D_\psi(x:y)=-\log x+\log y+(x-y)/y$ と一致します。$\eta_x,\eta_y<0$ なので全ての対数は定義されています。
<!-- solution-end -->

### IG9-A05 厳密凸性を落としたとき

$\psi(x_1,x_2)=x_1^2/2$ を $U=\mathbb R^2$ で考える。Bregman divergence を計算し、異なる二点で零となる例を与えよ。非負性定理のどの仮定が失われ、証明のどこに影響するか説明せよ。

- Level: A
- 狙い: 凸と厳密凸、半正定値と正定値を区別する

<!-- solution-start -->
**詳細解答**

$\nabla\psi(y)=(y_1,0)$ なので $D_\psi(x:y)=(x_1-y_1)^2/2$ です。$x=(0,1)$、$y=(0,0)$ は異なるのに $D_\psi(x:y)=0$ です。Hessian は $\operatorname{diag}(1,0)$ で半正定値ですが正定値ではなく、$\psi$ は $x_2$ 方向で厳密凸ではありません。[積分表示](#thm-ig9-bregman-positive)の $v=(0,1)$ に対して被積分項が全区間零となるため、非負性は残りますが異点での厳密不等式は得られません。
<!-- solution-end -->

### IG9-B01 三点恒等式の符号と残差

$U=(0,\infty)$、$\psi(t)=-\log t$、$x=1,y=2,z=4$ とする。三つの Bregman divergence を個別に求め、三点恒等式の内積補正項を計算し一致を示せ。

- Level: B
- 狙い: 非二次ポテンシャルで三点の残差とその符号を確認する

<!-- solution-start -->
**詳細解答**

$D_\psi(s:t)=s/t-1-\log(s/t)$ なので

$$
D(1:4)=\tfrac14-1+\log4=-\tfrac34+\log4,
$$

$$
D(1:2)=\tfrac12-1+\log2=-\tfrac12+\log2,\quad
D(2:4)=\tfrac12-1+\log2=-\tfrac12+\log2.
$$

$\psi'(2)=-1/2$、$\psi'(4)=-1/4$ より補正は

$$
(x-y)(\psi'(y)-\psi'(z))
=(1-2)(-1/2+1/4)=1/4.
$$

右辺は $(-1+2\log2)+1/4=-3/4+\log4$ となり左辺と一致します。補正項を引くのでなく**足す**のが[三点恒等式](#thm-ig9-three-point)の符号です。
<!-- solution-end -->

### IG9-B02 正確率単体の Bregman と KL

$r\ge2$、$p=(p_1,\ldots,p_r)$、$q=(q_1,\ldots,q_r)$ を全成分正、総和1の確率ベクトルとする。混合座標 $u=(p_1,\ldots,p_{r-1})$ 上で $H(u)=\sum_{i=1}^r p_i\log p_i$、$p_r=1-\sum_{i<r}p_i$ と定める。$D_H(u_p:u_q)$ を求め、KL のどちらの向きか確かめよ。さらに Hessian の正定値性も示せ。

- Level: B
- 狙い: e/m を交換した場合のポテンシャルと KL の向きを整理する

<!-- solution-start -->
**詳細解答**

$u_i=p_i$（$i<r$）とみなして $p_r=1-\sum_{i<r}u_i$ を微分すると、

$$
\partial_iH=\log p_i-\log p_r,\qquad
\partial_i\partial_jH=\frac{\delta_{ij}}{p_i}+\frac1{p_r}.
$$

任意の $v\ne0$ に対し

$$
v^\mathsf T\nabla^2H\,v
=\sum_{i<r}\frac{v_i^2}{p_i}
+\frac{(\sum_{i<r}v_i)^2}{p_r}>0
$$

です。定義の線形項は

$$
\begin{aligned}
D_H(u_p:u_q)
&=\sum_i p_i\log p_i-\sum_i q_i\log q_i\\
&\quad-\sum_{i<r}\log(q_i/q_r)(p_i-q_i)\\
&=\sum_{i<r}p_i\log(p_i/q_i)+p_r\log(p_r/q_r),
\end{aligned}
$$

となります。最後の変形には $\sum_i(p_i-q_i)=0$ を使いました。従って $D_H(u_p:u_q)=D_{\mathrm{KL}}(p\Vert q)$ です。第3節の自然座標ポテンシャル $\psi$ による $D_\psi(\theta_p:\theta_q)=D_{\mathrm{KL}}(q\Vert p)$ と向きが逆に見えるのは、[双対表示定理](#thm-ig9-canonical-dual)で $\eta$ 側の引数が反転するためであり矛盾しません。
<!-- solution-end -->

### IG9-B03 アファイン変更に対する不変性

$U=\mathbb R^d$ 上の微分可能な厳密凸関数 $\psi$ と可逆行列 $A$、ベクトル $c,a$、実数 $b$ を取る。$\widetilde\theta=A\theta+c$、$\widetilde\psi(\widetilde\theta)=\psi(A^{-1}(\widetilde\theta-c))+a\cdot\widetilde\theta+b$ と定めるとき、$D_{\widetilde\psi}(\widetilde x:\widetilde y)=D_\psi(x:y)$ を示せ。

- Level: B
- 狙い: アファイン座標の選び直しで量が変わらない理由を示す

<!-- solution-start -->
**詳細解答**

連鎖律を使うと、$\theta=A^{-1}(\widetilde\theta-c)$ において

$$
\nabla_{\widetilde\theta}\widetilde\psi
=A^{-\mathsf T}\nabla_\theta\psi(\theta)+a.
$$

$\widetilde x=Ax+c$、$\widetilde y=Ay+c$ なので

$$
\begin{aligned}
D_{\widetilde\psi}(\widetilde x:\widetilde y)
&=\psi(x)-\psi(y)+a\cdot A(x-y)\\
&\quad-[A^{-\mathsf T}\nabla\psi(y)+a]\cdot A(x-y)\\
&=\psi(x)-\psi(y)-\nabla\psi(y)\cdot(x-y).
\end{aligned}
$$

最後は $(A^{-\mathsf T}u)\cdot Av=u\cdot v$ と $a$ の項の相殺を使いました。可逆性がないと座標の逆写像と連鎖律で使った $A^{-1}$ が定義されないので、仮定は本質的です。
<!-- solution-end -->

### IG9-B04 局所二次項と三次の非対称性

$U=(0,\infty)$、$\psi(t)=t\log t$ とする。$y>0$ を固定し、十分小さい $h$ に対して $D_\psi(y+h:y)$ と $D_\psi(y:y+h)$ をそれぞれ三次まで展開せよ。二次項が同じで三次項が異なることを確認せよ。

- Level: B
- 狙い: Fisher/Hessian の二次近似と向きの高次差を区別する

<!-- solution-start -->
**詳細解答**

$\psi'(t)=1+\log t$、$\psi''(t)=1/t$、$\psi'''(t)=-1/t^2$ です。$|h|<y/2$ とすれば両点が $U$ に入ります。$C^\infty$ なので Taylor 展開から

$$
\begin{aligned}
D_\psi(y+h:y)
&=\psi(y+h)-\psi(y)-h\psi'(y)\\
&=\frac{h^2}{2y}-\frac{h^3}{6y^2}+O(h^4).
\end{aligned}
$$

逆向きは

$$
\begin{aligned}
D_\psi(y:y+h)
&=\psi(y)-\psi(y+h)+h\psi'(y+h)\\
&=-\left[h\psi'(y)+\frac{h^2}{2y}-\frac{h^3}{6y^2}\right]\\
&\quad+h\left[\psi'(y)+\frac{h}{y}-\frac{h^2}{2y^2}\right]+O(h^4)\\
&=\frac{h^2}{2y}-\frac{h^3}{3y^2}+O(h^4).
\end{aligned}
$$

共通の $h^2/(2y)$ は[局所二次項](#prop-ig9-local-metric)の Hessian 計量 $g(y)=1/y$ に対応します。三次の係数差が非対称性を表します。
<!-- solution-end -->

### IG9-C01 正確率単体の双対表示・KL・三点恒等式

$r\ge3$ とし、各成分が正で総和1の $r$ 点分布を

$$
p_\theta(i)=\frac{e^{\theta^i}}{1+\sum_{j<r}e^{\theta^j}}\ (i<r),
\qquad p_\theta(r)=\frac1{1+\sum_{j<r}e^{\theta^j}}
$$

（$\theta\in\mathbb R^{r-1}$）で表す。$\psi(\theta)=\log(1+\sum_{j<r}e^{\theta^j})$ とする。

1. $\eta_i=\partial_i\psi=p_\theta(i)$ と Hessian の正定値性を導き、$\eta$ の領域を求めよ。
2. Legendre 双対 $\varphi$ が負エントロピー $\sum_i p_i\log p_i$ になることを示せ。
3. 三つの正分布 $p,q,s$ に対応する自然座標を $\theta_p,\theta_q,\theta_s$ とするとき、$D_\psi(\theta_p:\theta_q)$ を KL で書き、三点恒等式を分布の成分で検算せよ。
4. $r=3$、$p=(1/2,1/4,1/4)$、$q=(1/4,1/2,1/4)$、$s=(1/4,1/4,1/2)$ に対して三点の補正項と恒等式の両辺を計算せよ。成分零を許す境界へこの計算を無条件に延長できない理由も述べよ。

- Level: C
- 狙い: 双対座標から KL と三点恒等式を一貫して再導出し、境界の条件まで検査する

<!-- solution-start -->
**詳細解答**

1. $Z=1+\sum_{j<r}e^{\theta^j}$ と置くと $\partial_i\psi=e^{\theta^i}/Z=p_i$ です。もう一回微分して

   $$
   g_{ij}=\partial_jp_i=p_i\delta_{ij}-p_ip_j.
   $$

   $v\in\mathbb R^{r-1}$ に $v_r=0$ を付け、$\bar v=\sum_{i=1}^rp_iv_i$ と置けば

   $$
   v^\mathsf Tgv=\sum_{i=1}^rp_iv_i^2-\bar v^2
   =\sum_{i=1}^rp_i(v_i-\bar v)^2.
   $$

   正の分布なので零のときすべての $v_i=\bar v$ ですが $v_r=0$ から $\bar v=0$、従って $v=0$ です。よって正定値です。$\eta_i=p_i>0$、$p_r=1-\sum_{i<r}\eta_i>0$ から像は $V=\{\eta_i>0,\sum_{i<r}\eta_i<1\}$ です。逆は $\theta^i=\log(p_i/p_r)$ なので全域で一対一です。

2. [Legendre 双対の定義](../IG5/index.md#def-ig5-legendre-dual)から

   $$
   \varphi(\eta)=\sum_{i<r}p_i\log\frac{p_i}{p_r}-\log Z.
   $$

   $p_r=1/Z$ だから $\log Z=-\log p_r$ を代入して

   $$
   \varphi=\sum_{i<r}p_i\log p_i
   -\left(\sum_{i<r}p_i\right)\log p_r+\log p_r
   =\sum_{i=1}^r p_i\log p_i.
   $$

3. 共通の正の台・開凸領域・正定値 Hessian が揃うので[KL 一致定理](#thm-ig9-exponential-kl)から

   $$
   D_\psi(\theta_p:\theta_q)=\sum_iq_i\log\frac{q_i}{p_i}
   =D_{\mathrm{KL}}(q\Vert p).
   $$

   [三点恒等式](#thm-ig9-three-point)により

   $$
   D_{\mathrm{KL}}(s\Vert p)
   =D_{\mathrm{KL}}(q\Vert p)+D_{\mathrm{KL}}(s\Vert q)
   +(\theta_p-\theta_q)\cdot(\eta_q-\eta_s).
   $$

   最後の項は $\theta_p^i-\theta_q^i=\log(p_iq_r/(q_ip_r))$、$\eta_q-\eta_s=(q_i-s_i)_{i<r}$ を用いて

   $$
   \sum_{i<r}(q_i-s_i)\log\frac{p_iq_r}{q_ip_r}
   =\sum_{i=1}^r(q_i-s_i)\log\frac{p_i}{q_i}
   $$

   と書けます。後者は $\sum_i(q_i-s_i)=0$ による $r$ 番目の項の補完です。実際、KL の左辺から二つの KL を引くと

   $$
   \sum_i s_i\log\frac{s_i}{p_i}
   -\sum_i q_i\log\frac{q_i}{p_i}
   -\sum_i s_i\log\frac{s_i}{q_i}
   =\sum_i(q_i-s_i)\log\frac{p_i}{q_i},
   $$

   となり一致します。

4. 三点の自然座標は $\theta_p=(\log2,0)$、$\theta_q=(0,\log2)$、$\theta_s=(-\log2,-\log2)$ です。$\eta_q-\eta_s=(0,1/4)$ だから補正は

   $$
   (\theta_p-\theta_q)\cdot(\eta_q-\eta_s)
   =(\log2,-\log2)\cdot(0,1/4)
   =-\frac14\log2.
   $$

   $\sum_iq_i\log(q_i/p_i)=\frac14\log(1/2)+\frac12\log2=\frac14\log2$、
   $\sum_is_i\log(s_i/q_i)=\frac14\log(1/2)+\frac12\log2=\frac14\log2$ です。
   $\sum_is_i\log(s_i/p_i)=\frac14\log(1/2)+\frac12\log2=\frac14\log2$ なので

   $$
   \frac14\log2=\frac14\log2+\frac14\log2-\frac14\log2.
   $$

   境界で $p_i=0$ を許すと自然座標 $\log(p_i/p_r)$ が定義できず、正定値な滑らかな Fisher 計量も内部と同じ式で扱えません。KL も向きによって $+\infty$ になり得るため、この内部での双対座標計算を無条件に延長できません。
<!-- solution-end -->

---

## 7. 何が分かったか

- Bregman divergence は凸関数の値と基点の接平面との差で、正定値 Hessian の下で非負・異点で正です。ただし一般には非対称です。
- 双対平坦な Hessian 座標の正準 divergence は $D_\psi(\theta_P:\theta_Q)=D_\varphi(\eta_Q:\eta_P)$ で、双対表示では引数が逆転します。
- 最小・正則な全指数型分布族で $\psi$ を対数分配関数に選ぶと、正準 divergence は $D_{\mathrm{KL}}(p_{\theta_Q}\Vert p_{\theta_P})$ です。一般の統計多様体で無条件に同一視できません。
- 三点恒等式は divergence の差を $(\theta_P-\theta_Q)\cdot(\eta_Q-\eta_R)$ と書きます。IG10 ではこの内積の零条件と、情報射影が存在する条件を区別して調べます。
