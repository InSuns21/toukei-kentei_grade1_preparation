# GR40 Hamiltonian・運動量制約

<!-- definition-example-audit: strict -->

[GR39の初期データ候補](../GR39/index.md#def-gr39-initial-data)は、空間計量 $h_{ij}$ と第二基本形式 $K_{ij}$、物質場からできていました。しかし滑らかな $h,K$ を好きに選ぶだけで、そのデータを通るEinstein時空が必ず得られるわけではありません。4次元の[Einstein場の方程式](../GR12/index.md#thm-gr12-einstein-equation)には、時間発展を計算する前の各時刻面でも成立しなければならない成分があるからです。

その成分を見つける道具が、時刻面の**内在曲率**（面の中で測る曲率）と**外在曲率**（時空内で面が曲がる様子）を結ぶGauss–Codazzi関係です。本章では曲率の符号から出発して関係式を導き、初期データの許される組を判定します。とりわけ、真空の平坦時空であっても曲がった時刻面を選べることが、内在曲率と外在曲率を両方数える必要性を教えてくれます。

以下、$(M,g)$ は滑らかな4次元・時間向き付きLorentz時空で、符号は $(-,+,+,+)$、単位系は $G=c=1$ とします。$\Sigma$ は滑らかな空間的超曲面、$e_i$（$i=1,2,3$）は接基底、$n$ は未来向き単位法線です。[GR39の第二基本形式の時間発展表示](../GR39/index.md#prop-gr39-k-evolution)と同じ符号で

$$
g(n,n)=-1,\quad g(n,e_i)=0,\quad
h_{ij}=g(e_i,e_j),\quad
K_{ij}=g(\nabla_{e_i}n,e_j),\quad K=h^{ij}K_{ij}
$$

を用います。$h$ のLevi-Civita接続を $D$、そのRiemann曲率とスカラー曲率をそれぞれ $R^{(3)}_{ijkl},\mathcal R^{(3)}$ と書きます。4次元では[GR6の曲率作用素](../GR6/index.md#prop-gr6-coordinate-curvature)の規約

$$
R(X,Y)Z=\nabla_X\nabla_YZ-\nabla_Y\nabla_XZ-\nabla_{[X,Y]}Z,
\qquad R^{(4)}_{abcd}=g(R(e_c,e_d)e_b,e_a)
$$

を用い、添字 $n$ はその位置への法線 $n$ の代入を表します。物質については[GR39で導入した射影](../GR39/index.md#def-gr39-initial-data)

$$
\rho=T(n,n),\qquad j_i=-T(n,e_i)
$$

を使います。$S_{ij}=T(e_i,e_j)$ は進化式に現れますが、今回導く四つの制約式の右辺には直接現れません。微分計算は十分滑らかな場の局所座標内で行い、初期値問題の大域的な存在定理を仮定しません。

## 1. 曲率を時刻面へ分解する

まず、接ベクトル $X,Y$ の共変微分は必ず「面に接する成分」と「法線成分」に分けられます。法線成分の係数を決めるには、$g(Y,n)=0$ を接方向に微分します。

$$
0=X[g(Y,n)]
=g(\nabla_XY,n)+g(Y,\nabla_Xn)
=g(\nabla_XY,n)+K(X,Y).
$$

$g(n,n)=-1$ なので、$\nabla_XY$ の法線成分は $+K(X,Y)n$ です。これが符号の第一の要所です。一方、$n$ の長さが一定だから $\nabla_Xn$ は接方向です。従って

$$
\nabla_XY=D_XY+K(X,Y)n,\qquad
\nabla_Xn=K(X,\cdot)^\sharp,
$$

となります。$\sharp$ は $h$ で添字を上げる操作で、座標では $\nabla_{e_i}n=K_i{}^je_j$ です。最初の式の $D$ が誘導計量のLevi-Civita接続になることは、接方向への射影が計量両立性・捩率零を継承することから従います。

この二式を曲率の定義へ入れると、面に接する四方向の曲率と、法線を一方向だけ含む曲率を計算できます。前者がGauss関係、後者がCodazzi関係です。

<a id="prop-gr40-gauss-codazzi"></a>

<!-- formal-statement-start -->
> **命題（空間的超曲面のGauss・Codazzi射影）**
> 滑らかなLorentz4次元時空 $(M,g)$ に空間的超曲面 $\Sigma$ を取り、未来単位法線 $n$ と正符号の第二基本形式 $K_{ij}=g(\nabla_{e_i}n,e_j)$ を用いる。4次元と3次元の曲率作用素はともに上記の $R(X,Y)Z$ の規約とする。このとき

$$
\boxed{R^{(4)}_{ijkl}
=R^{(3)}_{ijkl}+K_{jl}K_{ik}-K_{jk}K_{il}}
$$

> および

$$
\boxed{R^{(4)}_{n k i j}=D_jK_{ik}-D_iK_{jk}}
$$

> が成り立つ。前者を二重に縮約し、後者を一重に縮約すると、4次元Einsteinテンソル $G$ とRicciテンソルについて

$$
\boxed{2G(n,n)=\mathcal R^{(3)}+K^2-K_{ij}K^{ij}},
\qquad
\boxed{\operatorname{Ric}(n,e_i)=D_jK^j{}_i-D_iK}
$$

> を得る。
<!-- formal-statement-end -->

### 証明の見取り図

接方向へ射影した曲率は、面内の曲率に $K$ の二次式が加わります。法線方向への射影は $K$ の空間共変微分の差です。最後の縮約では時間方向が負符号を持つため、$2G(n,n)$ が「空間四方向だけの曲率の和」になることを明示します。

<!-- proof-start -->
### 証明

任意の接ベクトル場 $X,Y,Z$ を取り、上で導いた二つの分解式を用います。$\nabla_X\nabla_YZ$ の接方向成分は

$$
(\nabla_X\nabla_YZ)^\top
=D_XD_YZ+K(Y,Z)K(X,\cdot)^\sharp
$$

です。$X,Y$ を交換した式と $\nabla_{[X,Y]}Z$ の接方向成分を引けば

$$
(R^{(4)}(X,Y)Z)^\top
=R^{(3)}(X,Y)Z
+K(Y,Z)K(X,\cdot)^\sharp
-K(X,Z)K(Y,\cdot)^\sharp.
$$

$X=e_k,Y=e_l,Z=e_j$ として $e_i$ との内積を取ると、第一式になります。なお符号が正になるのは、先ほどの $\nabla_XY=D_XY+Kn$ と $\nabla_Xn=K^\sharp$ の積のためです。

法線成分については、まず $\nabla_X\nabla_YZ$ の $n$ に沿う**係数**が

$$
K(X,D_YZ)+X[K(Y,Z)]
$$

であることを使います。二方向の差を取り、$D_XY-D_YX=[X,Y]$ から、

$$
\begin{aligned}
\operatorname{coeff}_n R^{(4)}(X,Y)Z
&=X[K(Y,Z)]-Y[K(X,Z)]\\
&\quad+K(X,D_YZ)-K(Y,D_XZ)-K([X,Y],Z)\\
&=(D_XK)(Y,Z)-(D_YK)(X,Z).
\end{aligned}
$$

ただし $g(n,n)=-1$ なので、法線との**内積**はこの係数の負号です。$X=e_i,Y=e_j,Z=e_k$ と置けば第二式

$$
g(R(e_i,e_j)e_k,n)=D_jK_{ik}-D_iK_{jk}
$$

を得ます。

第一式を $h^{ik}h^{jl}$ で縮約すると、

$$
\begin{aligned}
P&:=h^{ik}h^{jl}R^{(4)}_{ijkl}\\
&=\mathcal R^{(3)}
+(h^{ik}K_{ik})(h^{jl}K_{jl})
-h^{ik}h^{jl}K_{jk}K_{il}\\
&=\mathcal R^{(3)}+K^2-K_{ij}K^{ij}.
\end{aligned}
$$

一方、その点で正規直交枠 $(n,e_1,e_2,e_3)$ を選びます。[GR6のRicci縮約](../GR6/index.md#def-gr6-ricci-scalar)をまず法線方向に適用すると

$$
\operatorname{Ric}(n,n)=\sum_{i=1}^3R^{(4)}_{i n i n}
$$

です。スカラー曲率では正規直交枠の符号が $(-1,1,1,1)$ なので、空間添字だけの和が $P$、法線を一つ含む二組がそれぞれ負号を持ち、曲率の二組交換対称性から

$$
\begin{aligned}
\mathcal R^{(4)}
&=\sum_{i,j=1}^3R^{(4)}_{i j i j}
-2\sum_{i=1}^3R^{(4)}_{i n i n}\\
&=P-2\operatorname{Ric}(n,n),\\
2G(n,n)&=2\operatorname{Ric}(n,n)+\mathcal R^{(4)}=P.
\end{aligned}
$$

最後の行は $G=\operatorname{Ric}-\tfrac12\mathcal R^{(4)}g$ に $g(n,n)=-1$ を代入したものです。

最後にRicciの混合成分を、同じ直交枠で縮約します。曲率の最初の二添字の反対称性・二組の交換対称性を使うと、

$$
\begin{aligned}
\operatorname{Ric}(n,e_k)
&=\sum_{i=1}^3 R^{(4)}_{i n i k}
=-\sum_i R^{(4)}_{n i i k}\\
&=-\sum_i(D_kK_{ii}-D_iK_{ki})
=D_iK^i{}_k-D_kK.
\end{aligned}
$$

正規直交枠での計算は各点ででき、両辺がテンソルとして定義されるため任意の座標で成り立ちます。$\square$
<!-- proof-end -->

例えばMinkowskiの平坦な標準時刻面では $\mathcal R^{(3)}=0$、$K_{ij}=0$ で、二つの縮約式の両辺が零になります。しかし平坦な時空であっても $K=0$ とは限りません。その検算は後で行います。

## 2. 初期データに四つの等式を課す

初期面上の $h,K$ を与えても、まだEinstein方程式を満たしたとは言えません。前節の縮約によって、4次元Einsteinテンソルの法線・混合成分は、面内だけで計算できる量になりました。これらを物質密度 $\rho,j_i$ と比較して零になるか調べることが、**Hamiltonian制約**と**運動量制約**の意味です。

ここでは、計算すべき差をまず定義します。$h$ の逆計量で第二基本形式の添字を上げると、混合成分と反変成分はそれぞれ

$$
K^j{}_i=h^{jk}K_{ki},\qquad K^{ij}=h^{ik}h^{jl}K_{kl}
$$

です。$\delta^j_i$ は接基底に関する恒等写像の成分（Kroneckerのデルタ）で、計量両立接続の下では

$$
D_j\delta^j_i=0,\qquad D_j(K\delta^j_i)=D_iK
$$

となります。$D_jK^j{}_i-D_iK$ の前に負符号を入れるのは、既習の $j_i=-T(n,e_i)$ と揃え、運動量制約の右辺を $+\kappa j_i$ にするためです。

<a id="def-gr40-constraints"></a>

<!-- formal-statement-start -->
> **定義（Hamiltonian制約・運動量制約）**
> 滑らかな3次元多様体 $\Sigma$ に正定値Riemann計量 $h$、対称二階テンソル $K_{ij}$、スカラー場 $\rho$、共変ベクトル場 $j_i$ を与え、$\Lambda\in\mathbb R$ を定数、$\kappa=8\pi$ とする。$D$ と $\mathcal R^{(3)}$ を $h$ から作り、$K=h^{ij}K_{ij}$ とするとき、次の四つの等式をそれぞれ**Hamiltonian制約**（一つ）・**運動量制約**（各 $i$ に一つ）と呼ぶ。

$$
\boxed{\mathcal R^{(3)}+K^2-K_{ij}K^{ij}=2\kappa\rho+2\Lambda}
$$

$$
\boxed{D_j(K\delta^j_i-K^j{}_i)=\kappa j_i.}
$$

> これらを満たす組を、指定した物質射影と宇宙項に関して**制約を満たす初期データ候補**と呼ぶ。ここで定義するのは面上の必要な等式であり、それだけで物質方程式を含む4次元時間発展解の存在を宣言するものではない。
<!-- formal-statement-end -->

<!-- definition-example-start: def-gr40-constraints -->
**定義の確認**：Minkowski標準時刻面のCartesian接基底 $(\partial_x,\partial_y,\partial_z)$ で、真空・宇宙項なしのデータを

$$
h_{ij}=g(\partial_i,\partial_j)=\delta_{ij},\qquad
K_{ij}=0,\qquad \rho=j_i=\Lambda=0
$$

と置きます。任意の非零接ベクトル $v=v^i\partial_i$ に対し

$$
h(v,v)=v^i\delta_{ij}v^j=(v^1)^2+(v^2)^2+(v^3)^2>0
$$

で正定値です。$K_{ij}=0=K_{ji}$ なので対称性も満たします。$h_{ij}$ がこの座標で定数であることから、[Levi-Civita接続のChristoffel係数公式](../../../幾何系/GEO/GEO13/index.md#prop-geo13-levi-civita-christoffel)

$$
\Gamma^k_{ij}=\frac12h^{k\ell}(\partial_i h_{j\ell}+\partial_jh_{i\ell}-\partial_\ell h_{ij})=0
$$

が成り立ち、その微分と二次式からなる $R^{(3)}$ も零です。従ってHamiltonian側は $0+0-0=0$、運動量側は各 $i$ で $D_j(K\delta^j_i-K^j{}_i)=D_j(0)=0$ となり、いずれも右辺の零と一致します。正定値性・対称性と二種類の等式をそれぞれ検査しました。
<!-- definition-example-end -->

制約式には $N$（lapse）も $\beta$（shift）も現れません。[GR39の時間発展表示](../GR39/index.md#prop-gr39-k-evolution)は $\partial_t h_{ij}$ に $N,\beta$ が必要だったのに、こちらは同じ初期面の幾何と物質の整合性だけを問うためです。

<a id="thm-gr40-einstein-constraints"></a>

<!-- formal-statement-start -->
> **定理（Einstein方程式のHamiltonian・運動量制約）**
> 滑らかな4次元Lorentz時空 $(M,g)$ と空間的超曲面 $\Sigma$ があり、未来単位法線 $n$、誘導計量 $h$、正符号の第二基本形式 $K_{ij}=g(\nabla_{e_i}n,e_j)$ を用いるとする。応力テンソル $T$ と定数 $\Lambda$ が、単位系 $G=c=1$、$\kappa=8\pi$ でEinstein場の方程式

$$
G_{\mu\nu}+\Lambda g_{\mu\nu}=\kappa T_{\mu\nu}
$$

> を満たすなら、$\rho=T(n,n)$ と $j_i=-T(n,e_i)$ に対し、上のHamiltonian制約と運動量制約が各点で成立する。
>
> 特に、これらの制約はEinstein方程式を満たす初期値の必要条件である。制約を満たすことだけから、任意の物質模型に対する時間発展解の存在・一意性までは帰結しない。
<!-- formal-statement-end -->

### 証明の見取り図

Einstein方程式を $n,n$ と $n,e_i$ に評価します。前者では宇宙項の符号が $-\Lambda$、後者では計量の混合成分が零です。この二点と $j_i$ の定義にある負号を区別して代入すれば、先ほど定義した制約式になります。

<!-- proof-start -->
### 証明

[GR12のEinstein場の方程式](../GR12/index.md#thm-gr12-einstein-equation)を $n,n$ へ代入し、$g(n,n)=-1$ と $\rho=T(n,n)$ を使うと

$$
G(n,n)+\Lambda(-1)=\kappa\rho,
\qquad G(n,n)=\kappa\rho+\Lambda.
$$

[Gauss・Codazziの二重縮約](#prop-gr40-gauss-codazzi)をこの最後の式へ代入し、両辺を2倍して

$$
\mathcal R^{(3)}+K^2-K_{ij}K^{ij}
=2G(n,n)=2\kappa\rho+2\Lambda
$$

を得ます。次に $n,e_i$ へ代入します。直交性と $j_i$ の負号から

$$
G(n,e_i)+\underbrace{\Lambda g(n,e_i)}_{=0}
=\kappa T(n,e_i)=-\kappa j_i.
$$

$G(n,e_i)=\operatorname{Ric}(n,e_i)$ なので、[Codazziの一重縮約](#prop-gr40-gauss-codazzi)を使い、

$$
D_jK^j{}_i-D_iK=-\kappa j_i.
$$

両辺の符号を反転すれば $D_j(K\delta^j_i-K^j{}_i)=\kappa j_i$ です。$i=1,2,3$ に対してそれぞれ成立し、Hamiltonian一つと合わせて四つの制約になります。$\square$
<!-- proof-end -->

文献によっては $K_{ij}^{\mathrm{ADM}}=-K_{ij}$ と定義します。その場合、運動量式は $D_j(K_{\mathrm{ADM}}{}^j{}_i-K_{\mathrm{ADM}}\delta^j_i)=\kappa j_i$ となります。本章の式と矛盾はなく、第二基本形式全体の符号変更です。

## 3. 時間対称と等方的なデータを手で判定する

Hamiltonian制約の $K^2-K_{ij}K^{ij}$ を手早く評価できる二つの形があります。一つは $K=0$ ではなく、テンソル全体 $K_{ij}=0$ という**幾何学的時間対称データ**。もう一つは $K_{ij}=Hh_{ij}$ とすべての空間方向に同じ法線変化率を持つ**純跡データ**です。$H$ はここでは面上の滑らかな実数値関数です。

<a id="prop-gr40-special-data"></a>

<!-- formal-statement-start -->
> **命題（時間対称および純跡の初期データの判定）**
> 3次元Riemann計量 $h$ と対称二階テンソル $K$、物質射影 $\rho,j_i$、定数 $\Lambda$ について、上記二種の制約式を考える。
>
> **（1）** $K_{ij}=0$ なら、制約式は

$$
\mathcal R^{(3)}=2\kappa\rho+2\Lambda,\qquad j_i=0
$$

> と同値である。
>
> **（2）** $K_{ij}=Hh_{ij}$ なら、制約式は

$$
\mathcal R^{(3)}+6H^2=2\kappa\rho+2\Lambda,
\qquad 2D_iH=\kappa j_i
$$

> と同値である。従って純跡データで $j_i=0$ なら、$H$ は各連結成分上で定数である。
<!-- formal-statement-end -->

### 証明の見取り図

二階テンソルが零なら二次項も微分項も消えます。純跡なら3次元の跡で係数3が現れ、二乗の差が $9-3=6$ になります。運動量式では $D h=0$ により関数 $H$ の微分だけが残ります。

<!-- proof-start -->
### 証明

$K_{ij}=0$ では $K=0$、$K_{ij}K^{ij}=0$、$D_j(K\delta^j_i-K^j{}_i)=0$ なので、[制約の定義](#def-gr40-constraints)への代入で（1）を得ます。逆に二つの右辺条件が成立すれば代入した制約が成立するため同値です。

$K_{ij}=Hh_{ij}$ では $h^{ij}h_{ij}=3$ と $D_jh_{ik}=0$ を順に使うと

$$
\begin{aligned}
K&=h^{ij}Hh_{ij}=3H,\\
K_{ij}K^{ij}&=H^2h_{ij}h^{ij}=3H^2,\\
K^2-K_{ij}K^{ij}&=9H^2-3H^2=6H^2,\\
D_j(K\delta^j_i-K^j{}_i)
&=D_j(3H\delta^j_i-H\delta^j_i)
=2D_iH.
\end{aligned}
$$

これらを二つの制約式に代入すれば（2）が得られます。$j_i=0$ なら $D_iH=0$、すなわち任意の接方向に沿う微分が零なので連結成分ごとに $H$ は一定です。逆向きも代入で確認できます。$\square$
<!-- proof-end -->

例えば $\Lambda=0$ の真空で $K_{ij}=0$ とすると、[時間対称データの判定](#prop-gr40-special-data)から $\mathcal R^{(3)}=0$ が必要です。**スカラー曲率零はRiemann曲率テンソル全体が零という意味ではありません。**

半径 $a>0$ の丸い3次元球面では $\mathcal R^{(3)}=6/a^2$ なので、時間対称の真空初期面にはできません。同じ計量と $K_{ij}=0$ でも、

$$
\rho=\frac{\mathcal R^{(3)}}{2\kappa}=\frac{3}{8\pi a^2},
\qquad j_i=0
$$

と置くなら、少なくとも幾何・物質射影の制約を満たします。物質の運動方程式や大域発展まで確認したことにはなりません。

## 4. 曲がったMinkowski葉が制約を満たす理由

GR39の平坦時空上の曲がった時刻葉では、非零の第二基本形式が現れました。それでも時空が真空・平坦なのだから、初期データは制約を満たすはずです。実際に内在曲率と外在曲率の相殺を追ってみます。

Minkowskiの慣性座標 $(T,X,Y,Z)$ で $t=T-f(X)$、$x=X$ とし、

$$
p(x)=f'(x)=\frac{df}{dx},\qquad q(x)=1-p(x)^2>0
$$

と置きます。以下の $p',q'$ はそれぞれ $dp/dx,dq/dx$ を表します。[GR39の曲がった時刻葉の計算](../GR39/index.md#prop-gr39-k-evolution)と同じ法線・符号を使えば、

$$
h=q(x)\,dx^2+dy^2+dz^2,\qquad
K_{xx}=\frac{p'}{\sqrt q},\qquad
K_{yy}=K_{zz}=0.
$$

$q>0$ なので局所的に新しい空間座標 $u(x)$ を $du=\sqrt q\,dx$ で作れます。Jacobianが $\sqrt q>0$ だからこれは局所可逆で、$h=du^2+dy^2+dz^2$ となり $\mathcal R^{(3)}=0$ です。さらに $h^{xx}=1/q$ から

$$
K=\frac{p'}{q^{3/2}},
\qquad K_{ij}K^{ij}=\frac{(p')^2}{q^3}=K^2.
$$

Hamiltonian左辺は $0+K^2-K^2=0$。運動量式では $K^x{}_x=K$ が唯一の非零混合成分です。$h=q\,dx^2+dy^2+dz^2$ の接続係数で非零になり得るものは $\Gamma^x_{xx}=q'/(2q)$ だけなので、

$$
D_jK^j{}_x=\partial_xK+\Gamma^x_{xx}K-\Gamma^x_{xx}K
=\partial_xK=D_xK.
$$

$y,z$ 方向は $K^j{}_i=0$（$i=y,z$）で、$K$ も $x$ のみに依存します。従って

$$
D_jK^j{}_y=D_yK=0,\qquad D_jK^j{}_z=D_zK=0
$$

です。これで $D_jK^j{}_i-D_iK=0$ が各 $i$ で成立します。曲がった時刻葉なのに真空の制約を満たすのは偶然ではなく、平坦な4次元時空のGauss–Codazzi射影がその成分をちょうど相殺するためです。

## 5. 制約と時間発展は別の問い

制約式は $h_{ij},K_{ij}$ とその**空間微分**の等式です。一方[GR39の時間発展表示](../GR39/index.md#prop-gr39-k-evolution)

$$
\partial_t h_{ij}=2NK_{ij}+D_i\beta_j+D_j\beta_i
$$

は、同じ面のデータをどの座標時刻で記述するかを含みます。したがって制約を満たす $h,K$ を固定したまま、その面での $N>0$ と $\beta^i$ の選択を変えても、制約の左辺は変わりません。変わるのは座標成分の時間変化の表現です。

ただし「四つの制約を満たす」ことを、**完全な初期値問題を解いた**ことと同一視してはいけません。実際のEinstein–物質系では、物質場自身の制約・進化式、適切な滑らかさ、座標条件、局所または大域の存在と一意性などが別途関わります。また、単に制約式に $\rho,j$ を代入できたというだけで、対応する物質場を構成したことにもなりません。

たとえば $h=\delta$、$K_{ij}=0$、$\rho=j_i=\Lambda=0$ は真空制約を満たします。$N=1$、$\beta=0$ なら $\partial_th_{ij}=0$ です。同じ時刻面で $N=1$、$\beta^x=bx$（定数 $b$）、他は零と選べば、[時間発展表示](../GR39/index.md#prop-gr39-k-evolution)から

$$
\partial_t h_{xx}=2\partial_x(bx)=2b,\qquad
\partial_t h_{ij}=0\quad ((i,j)\ne(x,x))
$$

となります。それでも初期面上の $\mathcal R^{(3)},K,\rho,j$ は変化しません。座標の時刻微分が違うことを、初期面の制約違反と取り違えないでください。

## 6. 演習

### Level A：各成分の符号・係数を確かめる

<a id="ex-gr40-a01"></a>

### GR40-A01 法線射影の宇宙項
- Level: A

Lorentz計量の符号を $(-,+,+,+)$、未来単位法線を $n$ とする。$G+\Lambda g=\kappa T$、$\rho=T(n,n)$、$2G(n,n)=\mathcal R^{(3)}+K^2-K_{ij}K^{ij}$ を仮定し、Hamiltonian制約を導け。$\Lambda$ の符号を明示せよ。

<!-- solution-start -->
**詳細解答。** 法線の長さは $g(n,n)=-1$ なので、場の方程式の法線射影は

$$
G(n,n)+\Lambda g(n,n)=\kappa T(n,n),
\qquad G(n,n)-\Lambda=\kappa\rho.
$$

従って $2G(n,n)=2\kappa\rho+2\Lambda$。[Gaussの縮約](#prop-gr40-gauss-codazzi)へ代入すると

$$
\mathcal R^{(3)}+K^2-K_{ij}K^{ij}=2\kappa\rho+2\Lambda.
$$

宇宙項が右辺で正になるのは、最初に $g(n,n)=-1$ を用いたためです。
<!-- solution-end -->

<a id="ex-gr40-a02"></a>

### GR40-A02 平坦空間の等方的な第二基本形式
- Level: A

3次元Euclid計量 $h_{ij}=\delta_{ij}$ と $K_{ij}=Hh_{ij}$（定数 $H$）、$\Lambda=0$ を考える。Hamiltonian制約から $\rho$ を求め、運動量制約から $j_i$ を求めよ。

<!-- solution-start -->
**詳細解答。** 平坦な $h$ のスカラー曲率は零です。逆計量で縮約すると $K=3H$、$K_{ij}K^{ij}=3H^2$ なので

$$
16\pi\rho=0+9H^2-3H^2=6H^2,
\qquad \rho=\frac{3H^2}{8\pi}.
$$

$D_iH=0$ だから [純跡データの判定](#prop-gr40-special-data)では $8\pi j_i=2D_iH=0$、すなわち $j_i=0$ です。$H\ne0$ なら、$\rho=0$ の真空データではありません。
<!-- solution-end -->

<a id="ex-gr40-a03"></a>

### GR40-A03 時間対称な3次元球面
- Level: A

半径 $a>0$ の丸い3次元球面は $\mathcal R^{(3)}=6/a^2$ を持つとする。$K_{ij}=0,\Lambda=0$ で制約を満たす $\rho,j_i$ を求め、真空ならどうなるか述べよ。

<!-- solution-start -->
**詳細解答。** [時間対称データの判定](#prop-gr40-special-data)に代入すると、運動量側は $j_i=0$。Hamiltonian側は

$$
\frac6{a^2}=2(8\pi)\rho,
\qquad \rho=\frac{3}{8\pi a^2}.
$$

$a$ は有限で正なのでこの密度は正です。真空の $\rho=0$ を課すと $6/a^2=0$ という矛盾になるため、与えられた幾何のまま真空初期データにはできません。
<!-- solution-end -->

<a id="ex-gr40-a04"></a>

### GR40-A04 対角成分の組合せ
- Level: A

$h_{ij}=\delta_{ij}$、$\Lambda=0$、$K_{ij}=\operatorname{diag}(a,b,c)$（$a,b,c$ は空間・時間に依存しない実定数）とする。Hamiltonian制約の左辺と運動量制約の左辺を計算し、$a=b=s$、$c=-s/2$ のとき真空制約が成立するか判定せよ。

<!-- solution-start -->
**詳細解答。** $K=a+b+c$、$K_{ij}K^{ij}=a^2+b^2+c^2$ なので

$$
\begin{aligned}
\mathcal R^{(3)}+K^2-K_{ij}K^{ij}
&=(a+b+c)^2-(a^2+b^2+c^2)\\
&=2(ab+bc+ca).
\end{aligned}
$$

平坦な $h$ の接続係数は零で、$K_{ij}$ と跡は定数だから運動量制約の左辺は各方向で零です。指定値では

$$
ab+bc+ca=s^2-\frac{s^2}{2}-\frac{s^2}{2}=0.
$$

従って $\rho=0,j_i=0$ の真空制約を満たす初期データ**候補**です。$K_{ij}\ne0$ でも真空制約は成立し得ますが、これだけで4次元時空を構成したわけではありません。
<!-- solution-end -->

<a id="ex-gr40-a05"></a>

### GR40-A05 空間で変化する純跡データ
- Level: A

$h_{ij}=\delta_{ij}$、$K_{ij}=f(x)h_{ij}$（$f$ は滑らかな実関数）、$\Lambda=0$ とする。必要な $\rho$ と運動量密度 $j_x,j_y,j_z$ を求めよ。

<!-- solution-start -->
**詳細解答。** [純跡データの判定](#prop-gr40-special-data)に $H=f(x)$ を代入します。3次元スカラー曲率は零なので

$$
6f(x)^2=16\pi\rho(x),\qquad
\rho(x)=\frac{3f(x)^2}{8\pi}.
$$

運動量側は $D_i f=\partial_i f$ で、$x$ にのみ依存するから

$$
8\pi j_x=2f'(x),\qquad
8\pi j_y=8\pi j_z=0.
$$

従って $j_x=f'(x)/(4\pi)$、$j_y=j_z=0$。$f$ が非定数なら運動量密度を零に設定することはできません。この $\rho,j$ に対応する物質模型の可解性は別問題です。
<!-- solution-end -->

### Level B：制約の構造と座標の区別

<a id="ex-gr40-b01"></a>

### GR40-B01 跡と跡なし部分
- Level: B

3次元正定値計量 $h$ と対称 $K_{ij}$ について、$A_{ij}:=K_{ij}-\tfrac13Kh_{ij}$ を定義する。$h^{ij}A_{ij}=0$ を証明し、Hamiltonian・運動量制約を $K,A$ で表せ。

<!-- solution-start -->
**詳細解答。** まず定義を縮約すると

$$
h^{ij}A_{ij}=K-\frac13K\,h^{ij}h_{ij}
=K-\frac13K\cdot3=0.
$$

$K_{ij}=A_{ij}+(K/3)h_{ij}$ の二乗を展開します。交差項は $A$ が跡なしであるため零となり、

$$
\begin{aligned}
K_{ij}K^{ij}
&=A_{ij}A^{ij}+\frac{2K}{3}A_{ij}h^{ij}
+\frac{K^2}{9}h_{ij}h^{ij}\\
&=A_{ij}A^{ij}+\frac{K^2}{3}.
\end{aligned}
$$

よってHamiltonian制約は

$$
\mathcal R^{(3)}+\frac23K^2-A_{ij}A^{ij}
=16\pi\rho+2\Lambda.
$$

運動量制約の左辺では

$$
D_j(K\delta^j_i-K^j{}_i)
=D_j\left(\frac23K\delta^j_i-A^j{}_i\right)
=\frac23D_iK-D_jA^j{}_i.
$$

従って $\frac23D_iK-D_jA^j{}_i=8\pi j_i$ です。純跡は $A=0$ の特別な場合に一致します。
<!-- solution-end -->

<a id="ex-gr40-b02"></a>

### GR40-B02 曲がったMinkowski時刻面の両制約
- Level: B

Minkowskiで $t=T-f(X)$、$x=X$、$p=f'(x)$、$q=1-p^2>0$ とし、初期データを $h=q\,dx^2+dy^2+dz^2$、$K_{xx}=p'/\sqrt q$、他の $K_{ij}=0$ とする。$\Lambda=\rho=j_i=0$ の二種類の制約を直接検算せよ。

<!-- solution-start -->
**詳細解答。** $du/dx=\sqrt q>0$ を満たす局所座標を取ると、$h=du^2+dy^2+dz^2$ だから $\mathcal R^{(3)}=0$ です。一方、$h^{xx}=1/q$ より

$$
K=h^{xx}K_{xx}=\frac{p'}{q^{3/2}},
\qquad K_{ij}K^{ij}=(h^{xx})^2K_{xx}^2=\frac{(p')^2}{q^3}.
$$

従ってHamiltonianの左辺は零です。運動量側では、$K^x{}_x=K$、その他の $K^j{}_i=0$ です。唯一の空間接続係数は $\Gamma^x_{xx}=q'/(2q)$ なので

$$
D_jK^j{}_x
=\partial_xK+\Gamma^x_{xx}K-\Gamma^x_{xx}K
=\partial_xK=D_xK.
$$

$y,z$ 成分はすべて零です。従って $D_j(K\delta^j_i-K^j{}_i)=0$ が三方向で成立します。$p'\ne0$ の場所でも制約は満たされ、$K=0$ を仮定していません。
<!-- solution-end -->

<a id="ex-gr40-b03"></a>

### GR40-B03 shiftを変えても制約は変わらない
- Level: B

ある初期時刻で $h_{ij}=\delta_{ij}$、$K_{ij}=0$、$\rho=j_i=\Lambda=0$ を固定する。$N=1$、$\beta^x=bx$、$\beta^y=\beta^z=0$（実定数 $b$）を選んだとき、$\partial_t h_{ij}$ と二種類の制約の左辺を求めよ。$\beta=0$ との差を述べよ。

<!-- solution-start -->
**詳細解答。** この面の空間接続係数は零なので、$\beta_x=bx$ と $\partial_x\beta_x=b$ から

$$
\partial_t h_{xx}=2NK_{xx}+2D_x\beta_x=2b,
\qquad \partial_t h_{yy}=\partial_t h_{zz}=0.
$$

その他の成分も零です。ここでは[GR39の時間発展表示](../GR39/index.md#prop-gr39-k-evolution)を初期時刻に適用しました。制約には $\beta$ が現れず、$\mathcal R^{(3)}=K=K_{ij}=0$ だからHamiltonian左辺は零、$D_j(K\delta^j_i-K^j{}_i)=0$ で運動量左辺も零です。

$\beta=0$ の場合は $\partial_th_{xx}=0$ ですが、両設定の初期面の幾何データは同じです。時刻微分の相違を制約の不一致と解釈してはいけません。
<!-- solution-end -->

<a id="ex-gr40-b04"></a>

### GR40-B04 真空初期データの候補を見分ける
- Level: B

3次元Euclid計量 $h=\delta$、$\Lambda=0$ を固定し、二つの候補 (I) $K_{ij}=s\delta_{ij}$（$s\ne0$ は定数）、(II) $K_{ij}=\operatorname{diag}(s,s,-s/2)$ を考える。$\rho=j_i=0$ という真空の両制約をそれぞれ検査し、どちらが不適切か理由を述べよ。

<!-- solution-start -->
**詳細解答。** 両者とも空間的に定数の $K_{ij}$ なので運動量左辺は零です。(I) は $K=3s$、$K_{ij}K^{ij}=3s^2$ で

$$
\mathcal R^{(3)}+K^2-K_{ij}K^{ij}
=0+9s^2-3s^2=6s^2>0.
$$

真空のHamiltonian右辺は零なので (I) は不適切です。(II) は $K=3s/2$、$K_{ij}K^{ij}=s^2+s^2+s^2/4=9s^2/4$ で

$$
K^2-K_{ij}K^{ij}
=\frac{9s^2}{4}-\frac{9s^2}{4}=0.
$$

(II) は両制約を満たす候補です。「真空だから $K_{ij}=0$」という推論が誤りであることも分かります。成立を示したのは制約のみで、時空の時間発展の構成ではありません。
<!-- solution-end -->

### Level C：内在曲率・外在曲率・shiftを同時に追う

<a id="ex-gr40-c01"></a>

### GR40-C01 Milne葉と移動空間座標
- Level: C

Minkowski時空の未来光円錐内部 $T>r=\sqrt{X^2+Y^2+Z^2}$ に、$\tau>0,\chi\ge0$ を $T=\tau\cosh\chi$、$r=\tau\sinh\chi$ で導入する。球面角座標を $(\theta,\phi)$ とし、平坦計量が

$$
ds^2=-d\tau^2+\tau^2\{d\chi^2+\sinh^2\chi\,(d\theta^2+\sin^2\theta\,d\phi^2)\}
$$

になることを用いて、次を示せ。

1. $\tau$ 一定の葉の $N,\beta,K_{ij},K,\mathcal R^{(3)}$ を求め、真空のHamiltonian・運動量制約を検算する。
2. 定数 $v$ に対し $u=\chi-v\tau$ と座標変更した場合、$N,\beta^u$ と $K_{uu},K_{\theta\theta}$ を時間発展表示から再導出し、同じ初期幾何と制約になることを確認する。座標は $\chi=u+v\tau>0$ の領域に限ってよい。

<!-- solution-start -->
**詳細解答。** $\tau$ 一定面では $N=1$、$\beta=0$、$n=\partial_\tau$ であり、$g(n,n)=-1$ です。誘導計量は

$$
h_{ij}=\tau^2\operatorname{diag}(1,\sinh^2\chi,\sinh^2\chi\sin^2\theta)
$$

です。[GR39の時間発展表示](../GR39/index.md#prop-gr39-k-evolution)で $\partial_\tau h_{ij}=2\tau\,\bar h_{ij}$（$\bar h$ は波括弧内の計量）と書くとき、微分では空間座標 $(\chi,\theta,\phi)$ を固定しています。従って

$$
K_{ij}=\frac12\partial_\tau h_{ij}
=\tau\bar h_{ij}=\frac1\tau h_{ij},
\quad K=\frac3\tau,\quad K_{ij}K^{ij}=\frac3{\tau^2}.
$$

4次元Minkowskiは平坦なので $R^{(4)}_{ijkl}=0$ です。[Gauss射影](#prop-gr40-gauss-codazzi)の二重縮約 $0=\mathcal R^{(3)}+K^2-K_{ij}K^{ij}$ より

$$
\mathcal R^{(3)}
=-\frac9{\tau^2}+\frac3{\tau^2}
=-\frac6{\tau^2}.
$$

従ってHamiltonian左辺は $-6/\tau^2+9/\tau^2-3/\tau^2=0$ です。また $K^j{}_i=\tau^{-1}\delta^j_i$ で $\tau$ は同一時刻面の空間座標に依存しないので

$$
D_j(K\delta^j_i-K^j{}_i)
=D_j\left(\frac2\tau\delta^j_i\right)=0.
$$

これで $\rho=j_i=\Lambda=0$ の両制約を検算しました。

次に $\chi=u+v\tau$、$d\chi=du+v\,d\tau$ と変換します。計量の径方向は

$$
-d\tau^2+\tau^2(du+v\,d\tau)^2
$$

なので、[3+1計量](../GR39/index.md#prop-gr39-adm-metric)と比較して $N=1$、$\beta^u=v$、$h_{uu}=\tau^2$ です。角方向では $h_{\theta\theta}=\tau^2\sinh^2\chi$、$h_{\phi\phi}=h_{\theta\theta}\sin^2\theta$ です。shiftベクトルは $\beta=v\partial_u$ となります。

新座標での微分は $(u,\theta,\phi)$ を固定する $\partial_\tau$ であり、変換式 $\chi=u+v\tau$ から

$$
\left.\frac{\partial\chi}{\partial\tau}\right|_u=v,
\qquad
\left.\frac{\partial\chi}{\partial u}\right|_\tau=1
$$

です。特に元の法線は新座標では

$$
n=\left.\partial_\tau\right|_\chi
=\left.\partial_\tau\right|_u-v\left.\partial_u\right|_\tau
$$

と表示され、座標時刻ベクトルとは一致しません。$\sinh^2\chi$ の偏微分に連鎖律を適用すると、$\partial_\tau h_{\theta\theta}$ に $2v\tau^2\sinh\chi\cosh\chi$ が追加されます。一方、同じ項がshiftのLie微分にも現れます。実際、

$$
\begin{aligned}
\partial_\tau h_{uu}&=2\tau,&(\mathcal L_\beta h)_{uu}&=0,\\
\partial_\tau h_{\theta\theta}
&=2\tau\sinh^2\chi+2v\tau^2\sinh\chi\cosh\chi,&
(\mathcal L_\beta h)_{\theta\theta}
&=v\partial_u h_{\theta\theta}=2v\tau^2\sinh\chi\cosh\chi.
\end{aligned}
$$

[時間発展表示](../GR39/index.md#prop-gr39-k-evolution)でshiftのLie微分を引くと

$$
K_{uu}=\frac{2\tau-0}{2}=\tau,
\qquad
K_{\theta\theta}
=\frac{2\tau\sinh^2\chi}{2}
=\tau\sinh^2\chi.
$$

$K_{\phi\phi}=\tau\sinh^2\chi\sin^2\theta$ も同様に得ます。すなわち全成分で $K_{ij}=h_{ij}/\tau$ です。$h,K$ は同じ葉のテンソルを新座標で表示しただけなので、そのスカラー曲率と二種類の制約は前問と同じ値になります。$v$ の項は時間微分とshiftのLie微分の間で相殺されます。
<!-- solution-end -->

## 7. 次に何を解くか

本章で得た四つの制約は、初期面を通るEinstein解なら必ず満たす必要があります。これにより、座標選択だけで変わるlapse・shiftと、面の幾何に課される条件を切り分けました。さらに、真空であっても空間の曲率と第二基本形式は個別には非零でよく、両者の組合せが制約を満たすことを確かめました。

次のGR41以降では均一・等方な宇宙の空間幾何と尺度因子を扱い、GR42で進化式と制約の具体的な関係を調べます。初期面で条件を満たすことと、その後も時間発展方程式に従うことは、区別したまま使います。
