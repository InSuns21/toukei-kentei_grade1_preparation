# IG13 統計多様体の曲率と曲がった指数型分布族

<!-- definition-example-audit: strict -->

[IG8 の双対平坦性](../IG8/index.md#def-ig8-dually-flat)では、正則な全指数型分布族に e 接続と m 接続の二種類の平坦な構造があると分かりました。一方、[IG2 の Fisher--Rao 計量](../IG2/index.md#def-ig2-fisher-rao-metric)は距離や角度を定め、その計量から別の接続、Levi-Civita 接続が得られます。

**e/m 接続が平坦なら、計量が表す空間まで平らなのでしょうか。** 答えは否です。正規位置尺度族は e/m 接続が平坦でありながら、Levi-Civita 接続で測る曲率は負です。さらに、平坦な全指数型分布族を非線形に制限すると、その部分モデルの接続も曲がることがあります。この二つを手計算で確かめます。

本講で用いる曲率の符号は [GEO16 の曲率作用素](../../GEO/GEO16/index.md#def-geo16-curvature) と同じで、任意の接続 $\nabla$ について

$$
R^\nabla(X,Y)Z
=\nabla_X\nabla_YZ-\nabla_Y\nabla_XZ-\nabla_{[X,Y]}Z
$$

とします。$X,Y,Z$ は滑らかな接ベクトル場、$[X,Y]$ は Lie 括弧です。曲率は「ベクトルを二方向に微分する順序の食い違い」を測ります。一般の曲率作用素と、計量の断面曲率とは区別します。

対象は共通台を持つ、滑らかな有限次元の識別可能な正則統計モデルです。Fisher 計量 $g$ は正定値、必要な score の二次・三次モーメントと微分交換は存在するとします。曲率を計算する箇所では接続係数を一階微分できるだけの滑らかさを仮定します。例に使う正規分布族は全母数領域の内部でこれらを満たします。

## 1. 接続が違えば「曲率零」の意味が違う

[IG6 のアファイン接続](../IG6/index.md#def-ig6-connection-choice)を局所座標 $\theta^i$ で表すと、$\nabla_{\partial_i}\partial_j=\Gamma^k_{ij}\partial_k$ です。基底 $\partial_i=\partial/\partial\theta^i$ について $[\partial_i,\partial_j]=0$ なので、上の定義を二度展開すると

<a id="eq-ig13-curvature-coordinates"></a>

$$
\begin{aligned}
R^\nabla(\partial_i,\partial_j)\partial_k
&=R^\ell{}_{kij}\partial_\ell,\\
R^\ell{}_{kij}
&=\partial_i\Gamma^\ell_{jk}-\partial_j\Gamma^\ell_{ik}
+\Gamma^m_{jk}\Gamma^\ell_{im}
-\Gamma^m_{ik}\Gamma^\ell_{jm}.
\end{aligned}
$$

この式の上下で一度ずつ現れる添字 $m$ には和を取ります。右辺の一階微分は係数の変化、二次の積は接続による補正です。[GEO16 の曲率作用素](../../GEO/GEO16/index.md#def-geo16-curvature)も Levi-Civita 接続に対する同じ計算から得られます。

[IG7 の $\alpha$-接続](../IG7/index.md#def-ig7-alpha-connection)では $\alpha=+1$ が e、$\alpha=-1$ が m、$\alpha=0$ が Levi-Civita でした。したがって一つの統計モデルにも、異なる曲率テンソルが存在します。

<a id="def-ig13-connection-curvatures"></a>

<!-- formal-statement-start -->
> **定義（統計モデルの α-曲率テンソル）**
> 正定値 Fisher 計量 $g$ を持つ滑らかな正則統計多様体 $M$ に、捩率零の $\alpha$-接続 $\nabla^{(\alpha)}$ が定義されているとする。ベクトル場 $X,Y,Z$ に対し
>
$$
R^{(\alpha)}(X,Y)Z
:=\nabla^{(\alpha)}_X\nabla^{(\alpha)}_YZ
-\nabla^{(\alpha)}_Y\nabla^{(\alpha)}_XZ
-\nabla^{(\alpha)}_{[X,Y]}Z
$$
>
> を **$\alpha$-接続で定まる曲率**という。特に e の曲率は $R^e=R^{(+1)}$、m の曲率は $R^m=R^{(-1)}$ とする。
> Levi-Civita 曲率は $R^{\mathrm{LC}}=R^{(0)}$ であり、「e/m 平坦」は $R^e=R^m=0$ を意味する。
> 一方、二次元の **Gauss 曲率** $K$ は Levi-Civita 接続と $g$ による [断面曲率](../../GEO/GEO16/index.md#def-geo16-sectional-curvature)である。一次独立な $u,v$ について
>
$$
K=\frac{g(R^{\mathrm{LC}}(u,v)v,u)}
{g(u,u)g(v,v)-g(u,v)^2}
$$
>
> と定める。
<!-- formal-statement-end -->

<!-- definition-example-start: def-ig13-connection-curvatures -->
**定義の確認**（一次元 Bernoulli 族）。$0<p<1$ の Bernoulli 族で座標を $p$ とすると、[IG7 で直接計算した接続係数](../IG7/index.md#def-ig7-alpha-connection)は e では $\Gamma^{e,p}_{pp}=(2p-1)/[p(1-p)]$、m では $\Gamma^{m,p}_{pp}=0$ です。前者は普通零ではありません。しかし一次元の接ベクトル場は $f\partial_p$ で、曲率は最初の二引数について交代的です。したがって $R^{(\alpha)}(\partial_p,\partial_p)\partial_p=0$、多重線形性により **全 $\alpha$ で曲率テンソルは零**です。接続係数が非零でも、曲率は零となり得ます。また一次元では二次元の接平面がないため、Gauss 曲率という値を割り当てません。
<!-- definition-example-end -->

### 計量双対な二接続で定まる曲率は互いに独立ではない

計量双対性は [IG7 の定義](../IG7/index.md#def-ig7-dual-connection)

$$
Xg(Y,Z)=g(\nabla_XY,Z)+g(Y,\nabla_X^*Z)
$$

で与えられました。この式をもう一度微分すると、二接続で定まる曲率にも関係が生じます。

<a id="thm-ig13-dual-curvature"></a>

<!-- formal-statement-start -->
> **定理（計量双対性による曲率の転置関係）**
> 非退化な Riemann 計量 $g$ を持つ滑らかな多様体 $M$ に、互いに $g$-双対な二つのアファイン接続 $\nabla,\nabla^*$ があるとする。このとき任意の滑らかなベクトル場 $X,Y,Z,W$ に対して
>
$$
g(R^\nabla(X,Y)Z,W)
=-g(Z,R^{\nabla^*}(X,Y)W).
$$
>
> 特に $R^\nabla=0$ なら $R^{\nabla^*}=0$、逆も成立する。正則統計多様体では $R^e=0$ と $R^m=0$ は同値である。
<!-- formal-statement-end -->

### 証明の見取り図

双対性の式を $Yg(Z,W)$ に適用してから $X$ で微分し、$X$ と $Y$ を入れ替えた式を引きます。交差項は相殺され、残りは二つの曲率作用素になります。最後に計量の非退化性を使います。

<!-- proof-start -->
### 証明

双対性を二回使うと、まず

$$
\begin{aligned}
XYg(Z,W)
={}&Xg(\nabla_YZ,W)+Xg(Z,\nabla_Y^*W)\\
={}&g(\nabla_X\nabla_YZ,W)
+g(\nabla_YZ,\nabla_X^*W)\\
&+g(\nabla_XZ,\nabla_Y^*W)
+g(Z,\nabla_X^*\nabla_Y^*W).
\end{aligned}
$$

$X$ と $Y$ を交換した式では中央の二項が同じ和として現れるので、差を取れば

$$
\begin{aligned}
[X,Y]g(Z,W)
={}&g\bigl((\nabla_X\nabla_Y-\nabla_Y\nabla_X)Z,W\bigr)\\
&+g\bigl(Z,(\nabla_X^*\nabla_Y^*-\nabla_Y^*\nabla_X^*)W\bigr).
\end{aligned}
$$

一方、双対性に $[X,Y]$ を代入すると左辺は

$$
[X,Y]g(Z,W)
=g(\nabla_{[X,Y]}Z,W)+g(Z,\nabla^*_{[X,Y]}W).
$$

両辺からこの二項を引き、曲率の定義と照合すれば主張の等式です。$R^\nabla=0$ ならすべての $Z$ に対して $g(Z,R^{\nabla^*}(X,Y)W)=0$ なので、$g$ の非退化性から $R^{\nabla^*}(X,Y)W=0$ です。逆向きも同じです。[IG7 の e/m 双対性](../IG7/index.md#thm-ig7-alpha-duality)を適用すると最後の主張を得ます。
<!-- proof-end -->

これは **e と m の曲率同士**の関係です。両者の平均である Levi-Civita 接続で定まる曲率が零になることまでは主張しません。

## 2. 正規位置尺度族：e/m は平坦、計量の曲率は負

具体的な矛盾に見える例を調べます。実数値確率変数 $X$ が $N(\mu,\sigma^2)$ に従い、$\mu\in\mathbb R$、$\sigma>0$ とします。確率密度関数と対数密度は

$$
p(x;\mu,\sigma)
=\frac{1}{\sqrt{2\pi}\sigma}
\exp\left\{-\frac{(x-\mu)^2}{2\sigma^2}\right\},\qquad
\ell=-\frac12\log(2\pi)-\log\sigma-\frac{(x-\mu)^2}{2\sigma^2}.
$$

まず計量は [IG2 の正規位置尺度計算](../IG2/index.md#prop-ig2-normal-information)と [IG7 の接続計算](../IG7/index.md#def-ig7-alpha-connection)の出発点に戻って確認します。$z=(X-\mu)/\sigma$ は標準正規で、score と必要なモーメントは

$$
\ell_\mu=\frac z\sigma,\quad
\ell_\sigma=\frac{z^2-1}{\sigma},\quad
E[z]=E[z^3]=0,\quad E[z^2]=1,\quad E[z^4]=3.
$$

ゆえに $g_{\mu\mu}=1/\sigma^2$、$g_{\mu\sigma}=0$、$g_{\sigma\sigma}=2/\sigma^2$ です。両固有値が正なので、$\sigma>0$ の領域では正定値計量です。

<a id="thm-ig13-normal-curvature"></a>

<!-- formal-statement-start -->
> **定理（正規位置尺度族の負の Fisher 曲率）**
> $\mathcal N=\{N(\mu,\sigma^2):\mu\in\mathbb R,\ \sigma>0\}$ に正定値 Fisher--Rao 計量を入れる。$\mu,\sigma$ 座標では
>
$$
(g_{ij})=\frac1{\sigma^2}
\begin{pmatrix}1&0\\0&2\end{pmatrix}.
$$
>
> この計量の Levi-Civita 接続による Gauss 曲率は全点で $K=-1/2$ である。一方、$\mathcal N$ の e 接続と m 接続はともに捩率零かつ曲率零、すなわち e/m 双対平坦である。
<!-- formal-statement-end -->

### 証明の見取り図

[GEO13 の Levi-Civita 接続](../../GEO/GEO13/index.md#thm-geo13-levi-civita-existence)で得た座標公式へ、この計量の成分と偏微分を代入します。その後、曲率成分 $R^\mu{}_{\sigma\mu\sigma}$ を計算して断面曲率の分子へ入れます。別に自然母数 $(\mu/\sigma^2,-1/(2\sigma^2))$ の領域を調べ、[IG8 の全指数型分布族の定理](../IG8/index.md#thm-ig8-exponential-dual-flat)を適用します。

<!-- proof-start -->
### 証明

計量の逆行列と非零の偏微分は

$$
(g^{ij})=\begin{pmatrix}\sigma^2&0\\0&\sigma^2/2\end{pmatrix},\qquad
\partial_\sigma g_{\mu\mu}=-\frac2{\sigma^3},\qquad
\partial_\sigma g_{\sigma\sigma}=-\frac4{\sigma^3}.
$$

[GEO13 の Levi-Civita 係数公式](../../GEO/GEO13/index.md#thm-geo13-levi-civita-existence) $\Gamma^k_{ij}=\frac12g^{k\ell}(\partial_i g_{j\ell}+\partial_jg_{i\ell}-\partial_\ell g_{ij})$ に代入します。例えば

$$
\Gamma^\mu_{\mu\sigma}
=\frac12 g^{\mu\mu}\partial_\sigma g_{\mu\mu}
=-\frac1\sigma,\qquad
\Gamma^\sigma_{\mu\mu}
=-\frac12g^{\sigma\sigma}\partial_\sigma g_{\mu\mu}
=\frac1{2\sigma}.
$$

残りは $\Gamma^\sigma_{\sigma\sigma}=-1/\sigma$ だけが非零で、下添字の対称性から $\Gamma^\mu_{\sigma\mu}=-1/\sigma$ です。これは [IG7 の具体計算](../IG7/index.md#def-ig7-alpha-connection)で得た LC 列とも一致します。

曲率の座標公式で $(i,j,k,\ell)=(\mu,\sigma,\sigma,\mu)$ を選ぶと、

$$
\begin{aligned}
R^\mu{}_{\sigma\mu\sigma}
&=\partial_\mu\Gamma^\mu_{\sigma\sigma}
-\partial_\sigma\Gamma^\mu_{\mu\sigma}
+\Gamma^m_{\sigma\sigma}\Gamma^\mu_{\mu m}
-\Gamma^m_{\mu\sigma}\Gamma^\mu_{\sigma m}\\
&=0-\frac1{\sigma^2}
+\left(-\frac1\sigma\right)\left(-\frac1\sigma\right)
-\left(-\frac1\sigma\right)\left(-\frac1\sigma\right)\\
&=-\frac1{\sigma^2}.
\end{aligned}
$$

ここで和に残るのは第三項では $m=\sigma$、第四項では $m=\mu$ です。$u=\partial_\mu,v=\partial_\sigma$ を [断面曲率の定義](../../GEO/GEO16/index.md#def-geo16-sectional-curvature)に代入すると

$$
K=\frac{g_{\mu\mu}R^\mu{}_{\sigma\mu\sigma}}
{g_{\mu\mu}g_{\sigma\sigma}-g_{\mu\sigma}^2}
=\frac{(1/\sigma^2)(-1/\sigma^2)}
{(1/\sigma^2)(2/\sigma^2)}
=-\frac12.
$$

他方、自然母数を $\theta_1=\mu/\sigma^2$、$\theta_2=-1/(2\sigma^2)$ と置くと、逆変換は

$$
\sigma^2=-\frac1{2\theta_2},\qquad
\mu=-\frac{\theta_1}{2\theta_2},
\qquad \theta_1\in\mathbb R,\ \theta_2<0.
$$

元の密度は $p_\theta(x)=\exp\{\theta_1x+\theta_2x^2-\psi(\theta)\}$ で、

$$
\psi(\theta)=-\frac{\theta_1^2}{4\theta_2}
+\frac12\log\left(\frac{\pi}{-\theta_2}\right).
$$

$\theta_2<0$ のもとで平方完成すると

$$
\theta_2x^2+\theta_1x
=\theta_2\left(x+\frac{\theta_1}{2\theta_2}\right)^2
-\frac{\theta_1^2}{4\theta_2},
$$

となり、Gaussian 積分から上の $\psi$ を得ます。母数領域 $\theta_2<0$ は開凸半平面であり、座標変換の Jacobian は

$$
\det\frac{\partial(\theta_1,\theta_2)}{\partial(\mu,\sigma)}
=\det\begin{pmatrix}
\sigma^{-2}&-2\mu\sigma^{-3}\\0&\sigma^{-3}
\end{pmatrix}
=\sigma^{-5}>0.
$$

したがって内部で滑らかに可逆です。十分統計量 $(X,X^2)$ の非零な一次結合 $aX+bX^2$ は全実数の台上で定数にはならないため、その分散は正です。すなわち任意の $(a,b)\ne(0,0)$ に対して Fisher 行列の二次形式は $\operatorname{Var}(aX+bX^2)>0$ となります。対数分配関数はこの領域で滑らかで、微分と積分の交換も正規尾部により局所的に正当化されます。したがって [IG8 の全指数型分布族の双対平坦性](../IG8/index.md#thm-ig8-exponential-dual-flat)の仮定が揃い、$R^e=R^m=0$ です。
<!-- proof-end -->

**同じ空間に二つの答えがあるのではありません。** どの接続を用いて問うかが違います。Levi-Civita 曲率は計量の長さ・角度に由来する量、e/m 曲率は指数・混合の「平行」の規則に由来する量です。[IG7 の平均関係](../IG7/index.md#thm-ig7-alpha-duality)は接続の係数に関する線形関係であり、曲率の式には係数の積もあるため、曲率を単純に平均できません。

また $y=\sqrt2\,\sigma>0$、$x=\mu$ と置けば $g=2(dx^2+dy^2)/y^2$ です。この表示は領域 $y>0$ における双曲計量を定数倍したものですが、曲率の値は既知の双曲幾何の公式に依存せず、上で出発点から計算済みです。

## 3. 全指数型分布族を制限すると何が変わるか

全指数型分布族の自然母数 $\theta=(\theta^1,\ldots,\theta^d)$ は d 次元の開集合を動きます。その中で、より少ない $m<d$ 個の母数 $u=(u^1,\ldots,u^m)$ だけを使って $\theta=F(u)$ と置くと、全族の一部に限った統計モデルを得ます。$F$ の微分が各点で rank $m$ なら、母数の小さな変化を接ベクトルとして正しく区別できます。

その像が自然母数空間の $m$ 次元アファイン平面なら、単なる低次元の全指数型分布族として扱える場合があります。これと、**像そのものが非線形に曲がる制限**とを区別します。

<a id="def-ig13-curved-exponential"></a>

<!-- formal-statement-start -->
> **定義（曲がった指数型分布族）**
> $\Theta\subset\mathbb R^d$ を開集合とし、最小・正則な $d$ 次元全指数型分布族
>
$$
p_\theta(x)=h(x)\exp\{\theta^aT_a(x)-\psi(\theta)\},
\qquad\theta\in\Theta
$$
>
> が正定値 Fisher 計量を持つとする。$U\subset\mathbb R^m$ は開集合、$1\le m<d$ とする。$C^3$ 写像 $F:U\to\Theta$ が単射な埋め込みで、各点で微分の rank が $m$ であるとき、$p_{F(u)}$ を **指数型分布族の正則な部分モデル**という。特に像 $F(U)$ がどの点の近傍でも $m$ 次元アファイン部分空間の開部分集合にならないものを、ここでは **曲がった指数型分布族**と呼ぶ。
<!-- formal-statement-end -->

<!-- definition-example-start: def-ig13-curved-exponential -->
**定義の確認**（正規平均の放物面）。$X=(X_1,X_2,X_3)$ の成分が独立に $N(\eta_a,1)$ に従い、$\eta=(\eta_1,\eta_2,\eta_3)\in\mathbb R^3$ とします。観測値を $x\in\mathbb R^3$ とした同時確率密度は

$$
p(x;\eta)=(2\pi)^{-3/2}\exp\left\{-\frac12\sum_{a=1}^3(x_a-\eta_a)^2\right\}
=h(x)\exp\left\{\eta\cdot x-\frac12\|\eta\|^2\right\},
$$

となります。ここで $h(x)=(2\pi)^{-3/2}e^{-\|x\|^2/2}$ は母数によらず、対数分配関数は $\psi(\eta)=\|\eta\|^2/2$ です。score は $X-\eta$、共分散は $I_3$ なので Fisher 計量は恒等行列で正定値です。$U=\mathbb R^2$ 上で $F(u,v)=(u,v,u^2+v^2)$ とします。

接ベクトル $F_u=(1,0,2u)$ と $F_v=(0,1,2v)$ は、第一・第二成分を比べればどの点でも一次独立です。$F$ は最初の二成分から逆に $(u,v)$ を回復できる埋め込みで、像は放物面です。さらに $F_{uu}=(0,0,2)$ が接平面 $\operatorname{span}(F_u,F_v)$ に属すると仮定すると、第一・第二成分が零だから線形結合の係数は双方零となり、第三成分が2であることに矛盾します。従って **どの点の近傍でも像はアファイン平面になりません**。rank、埋め込み、局所的な非アファイン性の全条件を満たし、正則な曲がった部分モデルです。
<!-- definition-example-end -->

全族の接続を部分モデルへどう移すかにも注意が要ります。接ベクトルの共変微分は周囲の空間へはみ出し得ます。接平面とその計量直交方向に分け、接平面側だけを取り出す操作を接射影と呼びます。[IG2 の Fisher 計量の引き戻し](../IG2/index.md#def-ig2-fisher-rao-metric)と組にすれば、部分モデル自身の計量と接続を定められます。

<a id="def-ig13-induced-connections"></a>

<!-- formal-statement-start -->
> **定義（部分モデルへの誘導接続）**
> 正定値計量 $\bar g$ を持つ滑らかな多様体 $\bar M$ と、そこに互いに計量双対な捩率零の接続 $\bar\nabla,\bar\nabla^*$ があるとする。$F:M\hookrightarrow\bar M$ を滑らかな埋め込みとし、$M$ 上の計量を $g=F^*\bar g$ とする。$F_*TM\subset F^*T\bar M$ への $\bar g$-直交射影を $P$ とする。$M$ のベクトル場 $X,Y$ について
>
$$
F_*(\nabla_XY)=P(\bar\nabla_{F_*X}F_*Y),
\qquad
F_*(\nabla_X^*Y)=P(\bar\nabla^*_{F_*X}F_*Y)
$$
>
> で定める $\nabla,\nabla^*$ を **誘導接続**という。右辺は局所的な接ベクトル場の延長を用いて計算する。接射影で取り除く法方向成分は **外在的な曲がり**を表す。
<!-- formal-statement-end -->

<!-- definition-example-start: def-ig13-induced-connections -->
**定義の確認**（放物面の接射影）。先ほどの $F$ は平坦な $\mathbb R^3$ へ入ります。$u=1,v=0$ では $F_u=(1,0,2)$、$F_v=(0,1,0)$、$F_{uu}=(0,0,2)$ です。まず、これらは母数方向 $\partial_u,\partial_v$ を周囲へ写した接ベクトルなので、[計量の引き戻し](../IG2/index.md#def-ig2-fisher-rao-metric)から接計量の成分は $G_{ij}=\langle F_i,F_j\rangle$ であり、ここでは $G=\operatorname{diag}(5,1)$ です。

接射影を $P(F_{uu})=aF_u+bF_v$ と置くと、残差が両接ベクトルと直交する条件は

$$
\begin{pmatrix}5&0\\0&1\end{pmatrix}
\begin{pmatrix}a\\b\end{pmatrix}
=\begin{pmatrix}\langle F_{uu},F_u\rangle\\\langle F_{uu},F_v\rangle\end{pmatrix}
=\begin{pmatrix}4\\0\end{pmatrix}.
$$

よって $a=4/5,b=0$ であり、射影後の係数 $\Gamma^u_{uu}=4/5$ と、法方向の残り $F_{uu}-(4/5)F_u=(-4/5,0,2/5)$ が得られます。残差との内積は $\langle(-4/5,0,2/5),F_u\rangle=-4/5+4/5=0$、$F_v$ に対しても零です。接射影と法方向の意味を、定義の直交条件から直接確認できました。
<!-- definition-example-end -->

<a id="prop-ig13-induced-metric-connection"></a>

<!-- formal-statement-start -->
> **命題（曲がった部分モデルへの計量と接続の誘導）**
> $F:U\subset\mathbb R^m\to\Theta\subset\mathbb R^d$ を前定義の $C^3$ 正則埋め込みとする。
> $\Theta$ の正定値計量を $\bar g_{ab}$、双対な捩率零の接続係数を $\bar\Gamma^a_{bc},\bar\Gamma^{*a}_{bc}$ とする。
> $F_i^a=\partial_iF^a$、$F_{ij}^a=\partial_i\partial_jF^a$ とおく。
> 部分モデルの計量と、接射影により誘導される接続係数は
>
$$
G_{ij}=\bar g_{ab}(F)F_i^aF_j^b,\qquad
\Gamma^k_{ij}
=G^{k\ell}\bar g_{ab}(F)F_\ell^a
\bigl(F_{ij}^b+\bar\Gamma^b_{cd}(F)F_i^cF_j^d\bigr)
$$
>
> で与えられ、$\Gamma^{*k}_{ij}$ も $\bar\Gamma$ を $\bar\Gamma^*$ に換えた同じ式で定まる。二つの誘導接続は捩率零で、計量 $G$ に関して双対である。周囲の両接続で定まる曲率が零でも、誘導接続で定まる曲率が零とは限らない。
<!-- formal-statement-end -->

### 証明の見取り図

接ベクトル $F_i$ の Gram 行列が $G$ です。周囲で $F_j$ を $u^i$ 方向に共変微分し、その接ベクトル $F_\ell$ との内積を $G^{-1}$ で解くと射影係数になります。双対性・捩率零は射影前の性質から引き継がれます。

<!-- proof-start -->
### 証明

$u$ の接ベクトル $v=v^i\partial_i$ は $F_*v=v^iF_i^a\partial_a$ です。その内積を展開すると

$$
\bar g(F_*v,F_*w)
=\bar g_{ab}(F)F_i^aF_j^b v^iw^j
=G_{ij}v^iw^j.
$$

$F_i$ が一次独立で $\bar g$ が正定値なので $G$ も正定値で逆行列を持ちます。周囲の接続を座標で展開すると

$$
\bar\nabla_{F_i}F_j
=\bigl(F_{ij}^b+\bar\Gamma^b_{cd}F_i^cF_j^d\bigr)\partial_b.
$$

接射影を $\Gamma^k_{ij}F_k$ と書けば、差がすべての $F_\ell$ に直交する条件は

$$
G_{\ell k}\Gamma^k_{ij}
=\bar g_{ab}F_\ell^a
\bigl(F_{ij}^b+\bar\Gamma^b_{cd}F_i^cF_j^d\bigr).
$$

両辺に $G^{r\ell}$ を掛けて係数公式を得ます。$F_{ij}=F_{ji}$ と周囲の接続の捩率零から $\Gamma^k_{ij}=\Gamma^k_{ji}$ であり、もう一方も同じです。

最後に、周囲の双対性を接ベクトル $F_j,F_k$ に適用します。

$$
\partial_iG_{jk}
=\bar g(\bar\nabla_{F_i}F_j,F_k)
+\bar g(F_j,\bar\nabla^*_{F_i}F_k).
$$

法方向成分は接ベクトルとの内積で消えます。接成分だけを残せば

$$
\partial_iG_{jk}
=G_{\ell k}\Gamma^\ell_{ij}
+G_{j\ell}\Gamma^{*\ell}_{ik},
$$

これは [計量双対の定義](../IG7/index.md#def-ig7-dual-connection)の座標表示です。なお「誘導しても曲率零」とは一般に導けません。次の定理で曲率非零の実例を構成します。
<!-- proof-end -->

## 4. 平坦な全族の中の正曲率モデル

正規位置尺度族では「周囲を制限しなくても LC だけ曲がる」例を見ました。次は「周囲の全ての接続が平坦でも、非線形な制限によって誘導接続が曲がる」例です。

先ほどの独立な3変量正規平均全族は、自然座標 $\eta\in\mathbb R^3$ における Fisher 計量が Euclid 計量で、$\psi(\eta)=\|\eta\|^2/2$ です。score の三乗期待値が零なので [IG7 の $\alpha$-接続と三次テンソル](../IG7/index.md#thm-ig7-alpha-duality)から、全ての $\alpha$-接続は標準の係数零の接続と一致します。特に周囲では e/m/LC すべての曲率が零です。

<a id="thm-ig13-paraboloid-curvature"></a>

<!-- formal-statement-start -->
> **定理（曲がった正規平均モデルの正曲率）**
> $X_1,X_2,X_3$ は独立で $X_a\sim N(\eta_a,1)$ とし、平均母数を $\eta=F(u,v)=(u,v,u^2+v^2)$、$(u,v)\in\mathbb R^2$ に制限する。誘導 Fisher 計量は
>
$$
G=\begin{pmatrix}
1+4u^2&4uv\\4uv&1+4v^2
\end{pmatrix}
$$
>
> で正定値である。この部分モデルでは誘導された e/m/Levi-Civita 接続は一致し、$(u,v)=(0,0)$ での Gauss 曲率は $K=4$ となる。したがって平坦な全指数型分布族の正則な部分モデルが、誘導接続について曲率非零となり得る。
<!-- formal-statement-end -->

### 証明の見取り図

放物面の二つの接ベクトルで Gram 行列を作ります。周囲の接続係数は零なので、誘導接続係数は二階微分 $F_{ij}$ の接射影だけです。原点では係数自体は零ですが、係数の一階微分は零でなく、そこから曲率が生じます。

<!-- proof-start -->
### 証明

$F_u=(1,0,2u)$、$F_v=(0,1,2v)$ なので、前命題の $G_{ij}=\langle F_i,F_j\rangle$ により表示された行列を得ます。$W=1+4u^2+4v^2$ とおくと

$$
\det G=(1+4u^2)(1+4v^2)-16u^2v^2=W>0,
$$

かつ $G_{uu}=1+4u^2>0$ なので $G$ は正定値です。逆行列は

$$
G^{-1}=\frac1W
\begin{pmatrix}1+4v^2&-4uv\\-4uv&1+4u^2\end{pmatrix}.
$$

$F_{uu}=F_{vv}=(0,0,2)$、$F_{uv}=0$ です。周囲の接続係数が零であることと、射影係数の公式から

$$
\Gamma^k_{ij}
=G^{k\ell}\langle F_{ij},F_\ell\rangle
=4\delta_{ij}G^{k\ell}q_\ell,\qquad
q=(q_u,q_v)^{\mathsf T}=(u,v)^{\mathsf T}.
$$

ここで $i,j,k,\ell\in\{u,v\}$、$\delta_{ij}$ は $i=j$ のとき 1、そうでなければ 0 です。$G^{k\ell}$ は逆行列 $G^{-1}$ の成分で、$\ell$ は和を取る添字、$q_\ell$ は普通の二成分列ベクトルの成分です。行列積を実行すると

$$
\begin{pmatrix}
1+4v^2&-4uv\\-4uv&1+4u^2
\end{pmatrix}
\begin{pmatrix}u\\v\end{pmatrix}
=\begin{pmatrix}u\\v\end{pmatrix}
$$

なので $G^{-1}q=q/W$、すなわち $G^{k\ell}q_\ell=q_k/W$ です。ここでは計量で添字を上げた $q^k$ と書き換えているのではなく、列ベクトル $G^{-1}q$ の第 $k$ 成分を計算しています。よって $\Gamma^k_{ij}=4\delta_{ij}q_k/W$ で、具体的には

$$
\Gamma^u_{uu}=\Gamma^u_{vv}=\frac{4u}{W},\qquad
\Gamma^v_{uu}=\Gamma^v_{vv}=\frac{4v}{W},\qquad
\Gamma^k_{uv}=0.
$$

周囲の e/m/LC 接続は同一なので、射影した誘導接続も同一です。原点では全係数が零ですが

$$
\left.\partial_u\Gamma^u_{vv}\right|_{(0,0)}=4,\qquad
\left.\partial_v\Gamma^u_{uv}\right|_{(0,0)}=0.
$$

曲率公式の $(i,j,k,\ell)=(u,v,v,u)$ に代入すると、係数同士の積は原点で消え、

$$
R^u{}_{vuv}(0,0)=4-0+0-0=4.
$$

原点で $G=I_2$ なので断面曲率の分子は $G_{uu}R^u{}_{vuv}=4$、分母は $\det G=1$ です。よって $K(0,0)=4$ となります。
<!-- proof-end -->

**外在的な曲がりと内在曲率は別物です。** 放物面の法方向成分 $F_{ij}-P(F_{ij})$ は周囲への埋め込みの曲がりです。今の二次元例では、それが誘導した内在曲率にも現れました。しかし $t\mapsto (t,0,t^2)$ のような一次元の曲線部分モデルでは、周囲で曲がっていても、一次元の曲率作用素は常に零です。

文献では曲がった指数型分布族の「統計曲率」という言葉が、しばしば推定・漸近効率に現れる**外在的な量**を指します。ここで計算した Gauss 曲率 $K$ と同一の定義ではありません。統計曲率の大域的な不変量や推定損失に関する一般公式には、モデル・標本数・正則性・特定の接続や法束の選択など追加の設定が必要です。本講では両者を混同せず、まず計量・誘導接続・曲率を直接計算できる範囲までを扱います。

## 5. 演習

### IG13-A01 正規位置尺度族の Fisher 計量

実数値確率変数 $X$ が $N(\mu,\sigma^2)$（$\mu\in\mathbb R,\sigma>0$）に従い、その確率密度関数を $p(x;\mu,\sigma)=(\sqrt{2\pi}\sigma)^{-1}\exp\{-(x-\mu)^2/(2\sigma^2)\}$ とする。$z=(X-\mu)/\sigma$ のモーメント $E[z^2]=1,E[z^4]=3$ と奇数次モーメント零を使って、score 二成分と Fisher 行列を求めよ。

- Level: A
- 狙い: 曲率の前に正定値な計量を出発点から作る
<!-- solution-start -->
**詳細解答**

対数密度 $\ell=-\frac12\log(2\pi)-\log\sigma-(x-\mu)^2/(2\sigma^2)$ を、観測値 $x$ を固定して微分すると

$$
\ell_\mu=\frac{x-\mu}{\sigma^2}=\frac z\sigma,\qquad
\ell_\sigma=-\frac1\sigma+\frac{(x-\mu)^2}{\sigma^3}=\frac{z^2-1}{\sigma}.
$$

score の積の期待値を各成分に取れば

$$
\begin{aligned}
g_{\mu\mu}&=E[z^2]/\sigma^2=1/\sigma^2,\\
g_{\mu\sigma}&=E[z(z^2-1)]/\sigma^2=0,\\
g_{\sigma\sigma}&=E[z^4-2z^2+1]/\sigma^2=(3-2+1)/\sigma^2=2/\sigma^2.
\end{aligned}
$$

交差項は奇数次モーメントの消失によります。対角成分はともに正で交差項は零なので、任意の非零方向 $(a,b)$ の二乗長 $(a^2+2b^2)/\sigma^2$ は正、すなわち Fisher 計量は正定値です。
<!-- solution-end -->

### IG13-A02 Levi-Civita 係数の符号

二次元座標 $(\mu,\sigma)$、$\sigma>0$ の計量 $g_{\mu\mu}=\sigma^{-2}$、$g_{\sigma\sigma}=2\sigma^{-2}$、$g_{\mu\sigma}=0$ を与える。Levi-Civita 係数 $\Gamma^\mu_{\mu\sigma}$、$\Gamma^\sigma_{\mu\mu}$、$\Gamma^\sigma_{\sigma\sigma}$ を求め、他の係数が零となる理由を述べよ。

- Level: A
- 狙い: 曲率公式で使う係数を符号付きで検算する
<!-- solution-start -->
**詳細解答**

逆計量は $g^{\mu\mu}=\sigma^2,g^{\sigma\sigma}=\sigma^2/2$ です。$g$ は $\mu$ に依らず、交差項も零です。[GEO13 の Levi-Civita 接続](../../GEO/GEO13/index.md#thm-geo13-levi-civita-existence)に示された係数の座標公式へ代入すると

$$
\begin{aligned}
\Gamma^\mu_{\mu\sigma}
&=\tfrac12\sigma^2(-2\sigma^{-3})=-\sigma^{-1},\\
\Gamma^\sigma_{\mu\mu}
&=-\tfrac12(\sigma^2/2)(-2\sigma^{-3})=(2\sigma)^{-1},\\
\Gamma^\sigma_{\sigma\sigma}
&=\tfrac12(\sigma^2/2)(-4\sigma^{-3})=-\sigma^{-1}.
\end{aligned}
$$

対称性から $\Gamma^\mu_{\sigma\mu}=\Gamma^\mu_{\mu\sigma}$。$\Gamma^\mu_{\mu\mu}$、$\Gamma^\mu_{\sigma\sigma}$、$\Gamma^\sigma_{\mu\sigma}$ と $\Gamma^\sigma_{\sigma\mu}$ は $\partial_\mu g_{ij}=0$ および交差項零から消えます。
<!-- solution-end -->

### IG13-A03 曲率の一成分から Gauss 曲率へ

前問の計量と Levi-Civita 係数を使う。符号規約 $R(X,Y)Z=\nabla_X\nabla_YZ-\nabla_Y\nabla_XZ-\nabla_{[X,Y]}Z$ により $R^\mu{}_{\sigma\mu\sigma}$ を求め、二次元 Gauss 曲率を計算せよ。

- Level: A
- 狙い: 曲率作用素と断面曲率の添字順・符号を確かめる
<!-- solution-start -->
**詳細解答**

[曲率の座標式](#eq-ig13-curvature-coordinates)へ $i=\mu,j=\sigma,k=\sigma,\ell=\mu$ を代入します。非零項は

$$
R^\mu{}_{\sigma\mu\sigma}
=-\partial_\sigma(-\sigma^{-1})
+(-\sigma^{-1})(-\sigma^{-1})
-(-\sigma^{-1})(-\sigma^{-1})
=-\sigma^{-2}.
$$

$u=\partial_\mu,v=\partial_\sigma$ では $g(u,v)=0$ ですから、[断面曲率の定義](../../GEO/GEO16/index.md#def-geo16-sectional-curvature)より

$$
K=\frac{g_{\mu\mu}R^\mu{}_{\sigma\mu\sigma}}{g_{\mu\mu}g_{\sigma\sigma}}
=\frac{\sigma^{-2}(-\sigma^{-2})}{2\sigma^{-4}}=-\frac12.
$$
<!-- solution-end -->

### IG13-A04 e/m 平坦であるための条件

正規位置尺度族 $N(\mu,\sigma^2)$ の自然母数 $\theta_1=\mu/\sigma^2,\theta_2=-1/(2\sigma^2)$ に対し、領域と逆変換を求めよ。$\theta_2<0$ のもとで全指数型分布族の [双対平坦性定理](../IG8/index.md#thm-ig8-exponential-dual-flat)を適用できる理由を述べよ。

- Level: A
- 狙い: e/m 平坦性を LC 曲率の零と取り違えない
<!-- solution-start -->
**詳細解答**

$\theta_2=-1/(2\sigma^2)$ から $\theta_2<0$、$\sigma^2=-1/(2\theta_2)$ です。$\mu=\theta_1\sigma^2=-\theta_1/(2\theta_2)$ と戻せます。よって自然母数領域は $\mathbb R\times(-\infty,0)$ という開凸集合で、変換は内部で滑らかかつ可逆です。十分統計量 $(X,X^2)$ に関する対数分配関数は

$$
\psi(\theta)=-\frac{\theta_1^2}{4\theta_2}
+\frac12\log\left(\frac{\pi}{-\theta_2}\right)
$$

で滑らかです。$X$ と $X^2$ は独立ではありませんが、共分散行列の正定値性には独立性は不要です。任意の非零 $(a,b)$ について $aX+bX^2$ は全実数の台上で定数にならず、その分散が正なので、Fisher 行列は正定値です。[IG8 の双対平坦性定理](../IG8/index.md#thm-ig8-exponential-dual-flat)の最小性・正則性などの条件を満たし $R^e=R^m=0$。これは $K=-1/2$ と両立します。
<!-- solution-end -->

### IG13-A05 曲がった正規平均モデルの計量

3変量正規平均モデル $X_a\sim N(\eta_a,1)$（$a=1,2,3$、独立）を $F(u,v)=(u,v,u^2+v^2)$、$(u,v)\in\mathbb R^2$ に制限する。$F_u,F_v$、誘導 Fisher 行列 $G$ とその行列式を計算し、全域で正定値であることを示せ。

- Level: A
- 狙い: 抽象的な引き戻し計量を Gram 行列で確認する
<!-- solution-start -->
**詳細解答**

全族の Fisher 行列は $\bar g=I_3$ です。偏微分は $F_u=(1,0,2u)$、$F_v=(0,1,2v)$ です。[誘導計量の命題](#prop-ig13-induced-metric-connection)ではこれらの接ベクトルの内積が接計量の成分ですから

$$
G=\begin{pmatrix}
F_u\cdot F_u&F_u\cdot F_v\\F_v\cdot F_u&F_v\cdot F_v
\end{pmatrix}
=\begin{pmatrix}1+4u^2&4uv\\4uv&1+4v^2\end{pmatrix}.
$$

行列式は

$$
\det G=(1+4u^2)(1+4v^2)-(4uv)^2=1+4u^2+4v^2>0.
$$

さらに $G_{uu}>0$ と $\det G>0$ なので、二次形式を平方完成すれば

$$
(a,b)G(a,b)^{\mathsf T}
=G_{uu}\left(a+\frac{G_{uv}}{G_{uu}}b\right)^2
+\frac{\det G}{G_{uu}}b^2>0
\quad((a,b)\ne(0,0)).
$$

これは一次独立な接ベクトルを Fisher 内積で測った結果と一致します。
<!-- solution-end -->

### IG13-B01 一様な計量スケールの曲率への影響

二次元の正定値計量 $g$ と定数 $c>0$ に対し、$\widetilde g=cg$ とする。Levi-Civita 接続が不変であることを係数の式から導き、Gauss 曲率が $\widetilde K=K/c$ となることを示せ。特に正規位置尺度族の計量を二倍にしたときの値を求めよ。

- Level: B
- 狙い: 接続不変と断面曲率のスケール変化を区別する
<!-- solution-start -->
**詳細解答**

$\widetilde g_{ij}=cg_{ij}$、$\widetilde g^{ij}=c^{-1}g^{ij}$ です。$c$ は座標に依らないので $\partial_i\widetilde g_{jk}=c\partial_i g_{jk}$。したがって

$$
\widetilde\Gamma^k_{ij}
=\tfrac12c^{-1}g^{k\ell}\bigl(c\partial_i g_{j\ell}
+c\partial_jg_{i\ell}-c\partial_\ell g_{ij}\bigr)
=\Gamma^k_{ij}.
$$

曲率作用素 $R$ は接続だけで決まるので $\widetilde R=R$ です。しかし断面曲率の分子は $\widetilde g(R(u,v)v,u)=c\,g(R(u,v)v,u)$、分母は $c^2[g(u,u)g(v,v)-g(u,v)^2]$。したがって $\widetilde K=K/c$。正規位置尺度族では元が $-1/2$ なので、二倍した計量では $-1/4$ です。
<!-- solution-end -->

### IG13-B02 放物面の接続から非零曲率へ

$F(u,v)=(u,v,u^2+v^2)$ を Euclid 計量を持つ $\mathbb R^3$ へ埋め込む。$F_{uu},F_{uv},F_{vv}$ と接計量の逆行列から、誘導接続の非零係数を求めよ。その後、$(u,v)=(0,0)$ で $R^u{}_{vuv}$ と $K$ を計算せよ。

- Level: B
- 狙い: 平坦な周囲の接続を射影した後に曲率が生まれることを自力で導く
<!-- solution-start -->
**詳細解答**

$F_{uu}=F_{vv}=(0,0,2)$、$F_{uv}=0$。$W=1+4u^2+4v^2$ とおくと

$$
G^{-1}=\frac1W\begin{pmatrix}1+4v^2&-4uv\\-4uv&1+4u^2\end{pmatrix}.
$$

接ベクトルとの内積は $\langle F_{uu},F_u\rangle=4u$、$\langle F_{uu},F_v\rangle=4v$ です。[誘導係数の命題](#prop-ig13-induced-metric-connection)で周囲の係数を零と置けば

$$
(\Gamma^u_{uu},\Gamma^v_{uu})
=G^{-1}(4u,4v)^{\mathsf T}
=\left(\frac{4u}{W},\frac{4v}{W}\right).
$$

$F_{vv}=F_{uu}$ なので $\Gamma^k_{vv}=\Gamma^k_{uu}$、$F_{uv}=0$ より $\Gamma^k_{uv}=0$ です。原点で係数は零、一方 $\partial_u(4u/W)|_0=4$、$\partial_v\Gamma^u_{uv}=0$。従って $R^u{}_{vuv}(0)=4$ です。$G(0)=I_2$ により $K(0)=4/1=4$ となります。
<!-- solution-end -->

### IG13-B03 指数型の「全族」と非線形な制限

独立な3変量正規平均全族 $N_3(\eta,I_3)$ の自然母数は $\eta\in\mathbb R^3$ とする。部分モデル $F(u,v)=(u,v,u^2+v^2)$ について、次を示せ。

1. 自然母数のアファイン線分が像を保つとは限らないことを二点で示せ。
2. 全族が e 平坦でも部分モデルが e 平坦と結論できない理由を、誘導接続の式のどの項に原因があるか指摘せよ。

- Level: B
- 狙い: 周囲の接続係数零と誘導接続係数零を区別する
<!-- solution-start -->
**詳細解答**

二点 $F(1,0)=(1,0,1)$ と $F(-1,0)=(-1,0,1)$ を選びます。全族の e-アファイン座標 $\eta$ での中点は $(0,0,1)$ ですが、像の第一・第二成分が零なら $u=v=0$ で第三成分も零でなければならず、$(0,0,1)$ は像にありません。したがって全族の e 測地線は部分モデル内に留まりません。

周囲では $\bar\Gamma^b_{cd}=0$ ですが、[誘導接続係数](#prop-ig13-induced-metric-connection)には

$$
\Gamma^k_{ij}=G^{k\ell}\bar g_{ab}F_\ell^aF_{ij}^b
$$

という $F$ の二階微分由来の項が残ります。ここで $F_{uu}=F_{vv}=(0,0,2)$ は非零で、例えば $u=1,v=0$ で $\Gamma^u_{uu}=4/5$ です。係数が非零というだけでは非平坦の証明にはなりませんが、[実際の曲率計算](#thm-ig13-paraboloid-curvature)により原点で $K=4\ne0$ です。よって誘導された e 接続も曲率零ではありません。
<!-- solution-end -->

### IG13-B04 外側で曲がっても一次元では曲率零

独立な3変量正規平均全族から、$t\in\mathbb R$ を母数とする曲線部分モデル $\eta(t)=(t,0,t^2)$ を取る。誘導 Fisher 計量 $g_{tt}$ と Levi-Civita 係数 $\Gamma^t_{tt}$ を求めよ。また、$t=0$ で周囲の二階微分ベクトルが接線方向でないことを確かめ、なおかつ内在曲率作用素が零である理由を述べよ。

- Level: B
- 狙い: 第二基本形式と内在曲率を混同しない
<!-- solution-start -->
**詳細解答**

$\eta'(t)=(1,0,2t)$ より $g_{tt}=\|\eta'(t)\|^2=1+4t^2>0$ です。一階微分 $\partial_tg_{tt}=8t$ と逆計量 $g^{tt}=1/(1+4t^2)$ を使えば

$$
\Gamma^t_{tt}=\tfrac12g^{tt}\partial_tg_{tt}
=\frac{4t}{1+4t^2}.
$$

$t=0$ では $\eta'(0)=(1,0,0)$、$\eta''(0)=(0,0,2)$ なので二階微分は非零で接線と直交します。したがって外在的には曲がっています。しかし接空間は一次元で、曲率作用素は最初の二引数に交代的です。任意の二接ベクトルが同じ一次元方向に比例するため $R(X,Y)Z=0$ が全ての $X,Y,Z$ に成り立ちます。二次元の Gauss 曲率をこの曲線へ当てはめることもできません。
<!-- solution-end -->

### IG13-C01 負曲率の全族と正曲率の部分モデル

次の二モデルを同じ曲率符号規約で比較する。

1. $X\sim N(\mu,\sigma^2)$、$\mu\in\mathbb R,\sigma>0$。計量 $g_{\mu\mu}=1/\sigma^2$、$g_{\sigma\sigma}=2/\sigma^2$、$g_{\mu\sigma}=0$ を与える。
2. $X_a\sim N(\eta_a,1)$（$a=1,2,3$、独立）の全平均族から $\eta=(u,v,u^2+v^2)$ に制限した二次元モデル。

1. 第1モデルで Levi-Civita 係数を求め、$R^\mu{}_{\sigma\mu\sigma}$ から $K$ を計算せよ。
2. 第1モデルが e/m 平坦となる根拠を自然母数領域まで明示せよ。
3. 第2モデルの誘導計量と $\Gamma^u_{vv}$ を求め、原点の $K$ を計算せよ。
4. 「全指数型分布族の e/m 平坦性」「Levi-Civita 曲率」「部分モデルへの誘導」のどの二つを混同すると誤った結論になるか説明せよ。

- Level: C
- 狙い: 接続の選択と部分モデルの制限を同時に扱う統合検算
<!-- solution-start -->
**詳細解答**

**(1)** 逆計量は $\operatorname{diag}(\sigma^2,\sigma^2/2)$。$\partial_\sigma g_{\mu\mu}=-2/\sigma^3$、$\partial_\sigma g_{\sigma\sigma}=-4/\sigma^3$ から

$$
\Gamma^\mu_{\mu\sigma}=\Gamma^\mu_{\sigma\mu}=-\frac1\sigma,\quad
\Gamma^\sigma_{\mu\mu}=\frac1{2\sigma},\quad
\Gamma^\sigma_{\sigma\sigma}=-\frac1\sigma
$$

で、残りは零です。曲率公式の四項は順に $0,-1/\sigma^2,+1/\sigma^2,-1/\sigma^2$ なので $R^\mu{}_{\sigma\mu\sigma}=-1/\sigma^2$。従って

$$
K=\frac{(1/\sigma^2)(-1/\sigma^2)}{(1/\sigma^2)(2/\sigma^2)}=-\frac12.
$$

**(2)** 自然母数 $\theta_1=\mu/\sigma^2,\theta_2=-1/(2\sigma^2)$ の領域は $\mathbb R\times(-\infty,0)$ で開凸です。逆変換は $\sigma^2=-1/(2\theta_2)$、$\mu=-\theta_1/(2\theta_2)$。固定された十分統計量 $(X,X^2)$ の全指数型表示を持ち、正則・最小で Fisher 計量は正定値です。[全指数型分布族の双対平坦性](../IG8/index.md#thm-ig8-exponential-dual-flat)から $R^e=R^m=0$。これは (1) の $R^{\mathrm{LC}}\ne0$ に反しません。

**(3)** $F_u=(1,0,2u),F_v=(0,1,2v)$ なので

$$
G=\begin{pmatrix}1+4u^2&4uv\\4uv&1+4v^2\end{pmatrix},\qquad
W=\det G=1+4u^2+4v^2.
$$

周囲の $\bar\Gamma=0$、$F_{vv}=(0,0,2)$ と $G^{-1}$ の第一行 $\bigl((1+4v^2)/W,-4uv/W\bigr)$ から

$$
\Gamma^u_{vv}
=\frac{(1+4v^2)4u-4uv(4v)}W=\frac{4u}W.
$$

同じ方法で $\Gamma^u_{uv}=0$、原点では他の係数も零。したがって $R^u{}_{vuv}(0)=\partial_u(4u/W)|_0=4$、$G(0)=I_2$ より $K(0)=4$ です。周囲のすべての $\alpha$ 接続は零係数である一方、この部分モデルの誘導接続は非平坦です。

**(4)** 第1の誤りは e/m の「平坦」を LC の「平坦」と読むことです。曲率を定義する接続が異なります。第2の誤りは全族の係数零をそのまま非線形部分モデルの係数零と読むことです。接射影の式には $F_{ij}$ が残り、その一階変化が (3) の曲率を作ります。いずれも仮定・対象を取り違えた推論であり、数値 $-1/2$ と $4$ が直接の反例です。
<!-- solution-end -->

## 6. 何が分かったか

- $\alpha$-接続で定まる曲率は接続の選択に依存します。計量の Gauss 曲率は Levi-Civita 接続から定め、e/m 曲率と混同しません。
- 計量双対な接続では曲率が負の転置関係を満たします。正則な全指数型分布族では e/m は平坦でも、正規位置尺度族の Levi-Civita 曲率は $-1/2$ です。
- 正則な曲がった指数型分布族では、接ベクトルの Gram 行列から誘導計量を作り、周囲の共変微分を接射影して誘導接続を得ます。周囲が平坦でも、放物面状の正規平均部分モデルは原点で $K=4$ です。
- 内在曲率と外在的な曲がりは異なり、一次元モデルは外在的に曲がっていても内在曲率作用素が零です。「統計曲率」という追加の不変量を Gauss 曲率と同一視しません。

次の IG14 では、こうした統計モデルの幾何のうち、確率的な粗視化で何が保たれ、何が減少するのかを調べます。
