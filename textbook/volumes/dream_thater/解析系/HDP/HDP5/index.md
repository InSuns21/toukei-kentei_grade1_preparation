# HDP5 Gaussian集中とLipschitz関数

[HDP4のMcDiarmid不等式](../HDP4/index.md#thm-hdp4-mcdiarmid)では、一つの入力を別の値へ置き換えたときの出力の変動幅を使いました。しかし正規分布の入力は実数全体に広がります。例えば入力が $x$ なら、別の値 $y$ はいくらでも遠くに取れます。したがって $f(x)=x$ でさえ、全入力を動かす一座標の変動幅は無限大です。

それでも、標準正規変数 $G$ の偏差は鋭く集中します。今回測るべきものは「任意の入れ替えによる最大変化」ではなく、**入力間の距離に対する出力変化の比率**です。Gaussian入力とLipschitz条件を結ぶと、次元によらず指数 $-t^2/(2L^2)$ の評価が得られます。その定数がどこから出るかも、標準正規の密度を微分するところから導きます。

## 1. Gaussian入力の変化を距離で測る

$\mathbb R^d$ にはEuclidノルム $\|x\|_2=(\sum_{j=1}^d x_j^2)^{1/2}$ を入れます。関数の入力を少し動かしたときの出力変動を、入力間の距離の定数倍で抑えます。

<a id="def-hdp5-lipschitz"></a>

<!-- formal-statement-start -->
> **定義（Euclid距離に関するLipschitz関数）**  
> $d\ge1$、$L\ge0$ とする。関数 $f:\mathbb R^d\to\mathbb R$ が $L$-Lipschitzであるとは、任意の $x,y\in\mathbb R^d$ に対して

$$
|f(x)-f(y)|\le L\|x-y\|_2
$$

> が成り立つことをいう。$L$ は実際の最小定数である必要はない。
<!-- formal-statement-end -->

<!-- definition-example-start: def-hdp5-lipschitz -->
**定義の確認** $f(x)=\max_{1\le j\le d}x_j$ とします。$x$ で最大値を取る番号を $j_*$ と選ぶと、

$$
f(x)-f(y)=x_{j_*}-\max_jy_j
\le x_{j_*}-y_{j_*}
\le\max_j|x_j-y_j|
\le\|x-y\|_2.
$$

$x$ と $y$ を交換して逆向きも得るため $f$ は $1$-Lipschitzです。[逆三角不等式](../../../基礎科目/F0/F0-00E2/index.md#thm-f0-00e2-reverse-triangle-inequality)から、ノルム関数 $f(x)=\|x\|_2$ も $1$-Lipschitzです。いずれも微分可能でない点があるので、最初から微分可能性を要求しません。
<!-- definition-example-end -->

$L=0$ ならすべての $x,y$ で $f(x)=f(y)$ となり、$f$ は定数です。これに対し $f(x)=\|x\|_2^2$ は全空間でLipschitzではありません。$x=te_1$、$y=0$ とすると、値の差を距離で割った比は $t$ となり、$t\to\infty$ で発散します。

標準Gaussianベクトル $G=(G_1,\ldots,G_d)$ は独立な $N(0,1)$ 成分を持ち、密度

$$
\gamma_d(x)=(2\pi)^{-d/2}\exp(-\|x\|_2^2/2)
$$

に従うものとします。以下の期待値は、断らない限りこの密度に関するものです。

## 2. Gaussian部分積分が出発点になる

正規密度の微分が $-x_j\gamma_d(x)$ となることから、Gaussian変数を一つ掛けた期待値を微分の期待値へ移せます。これが通常の積分での部分積分に対応する、最初の道具です。

<a id="lem-hdp5-gaussian-ibp"></a>

<!-- formal-statement-start -->
> **補題（Gaussian部分積分）**  
> $G\sim N(0,I_d)$ とする。$\varphi:\mathbb R^d\to\mathbb R$ が有界な $C^1$ 関数で、各偏導関数が有界なら、各 $j=1,\ldots,d$ に対して

$$
E[G_j\varphi(G)]=E[\partial_j\varphi(G)]
$$

> が成り立つ。両辺が絶対可積分で境界項が消える場合にも同じ式が成り立つ。
<!-- formal-statement-end -->

### 証明の見取り図

第 $j$ 座標だけで積分し、密度の微分を使って $x_j$ を消します。ほかの座標の積分はそのまま残ります。

<!-- proof-start -->
### 証明

密度の積表示により

$$
\partial_j\gamma_d(x)=-x_j\gamma_d(x).
$$

他座標を固定して $x_j\in[-R,R]$ 上で部分積分すると、

$$
\begin{aligned}
\int_{-R}^{R}x_j\varphi(x)\gamma_d(x)\,dx_j
&=-\int_{-R}^{R}\varphi(x)\partial_j\gamma_d(x)\,dx_j\\
&=-[\varphi(x)\gamma_d(x)]_{x_j=-R}^{R}
 +\int_{-R}^{R}\partial_j\varphi(x)\gamma_d(x)\,dx_j.
\end{aligned}
$$

$\varphi$ は有界なので境界項の絶対値は定数倍の $e^{-R^2/2}$ 以下となり零へ収束します。$|x_j|\gamma_d$ と $|\partial_j\varphi|\gamma_d$ は積分可能なので、極限と残りの座標の積分を取れます。これで両期待値が一致します。
<!-- proof-end -->

例えば $\varphi(x)=\sin x_j$ に適用すると $E[G_j\sin G_j]=E[\cos G_j]$ です。部分積分は単なる形式操作ではなく、**Gaussian密度が微分に対して閉じている**ことを利用しています。

<a id="ref-hdp5-standard-normal-mgf"></a>

### 標準正規の指数モーメント

標準正規の指数モーメントも直接確認できます。$d=1$ で指数を平方完成すると、任意の $\lambda\in\mathbb R$ について

$$
\begin{aligned}
E[e^{\lambda G}]
&=\frac1{\sqrt{2\pi}}\int_{\mathbb R}e^{\lambda x-x^2/2}\,dx\\
&=e^{\lambda^2/2}
  \frac1{\sqrt{2\pi}}\int_{\mathbb R}e^{-(x-\lambda)^2/2}\,dx
=e^{\lambda^2/2}.
\end{aligned}
$$

最後の積分は変数 $u=x-\lambda$ により正規密度の全積分 $1$ です。この式を後で線形関数と最大値の具体例に使います。

## 3. Gaussian平均を少しずつかける

単にGaussian部分積分を $e^{\lambda f}$ に一回適用するだけでは、任意の非線形Lipschitz関数の集中を出せません。そこで、元の関数とGaussian平均との間を連続的につなぐ操作を作ります。

$G'$ を $G$ と独立な標準Gaussianベクトルとします。時刻 $t$ を長くすると入力の元の位置の寄与を小さくし、代わりに新しいGaussian乱数を混ぜる操作を考えます。

<a id="def-hdp5-ou-semigroup"></a>

<!-- formal-statement-start -->
> **定義（Ornstein–Uhlenbeck平均作用素）**  
> $d\ge1$、$G'\sim N(0,I_d)$ とし、$h:\mathbb R^d\to\mathbb R$ は有界なBorel可測関数とする。$t\ge0$ に対し関数 $P_t h$ を

$$
(P_t h)(x)=E\!\left[h\!\left(e^{-t}x+\sqrt{1-e^{-2t}}\,G'\right)\right]
$$

> で定める。$P_0h=h$ と解釈する。
<!-- formal-statement-end -->

<!-- definition-example-start: def-hdp5-ou-semigroup -->
**定義の確認** $h(x)\equiv1$ とすれば、Gaussian入力の値によらず被積分関数は $1$ なので $(P_th)(x)=1$ です。また $t=0$ では係数が $e^0=1$、平方根が $0$ となり、定義から $P_0h(x)=h(x)$ を直接確認できます。
<!-- definition-example-end -->

$P_sP_t=P_{s+t}$ を満たすことは次の補題で確かめます。この性質を持つので、$(P_t)_{t\ge0}$ をOrnstein–Uhlenbeck半群と呼びます。以下の微分計算は、まず $h$ が有界で一階・二階の偏導関数も有界な滑らかな関数である場合に行います。

<a id="lem-hdp5-ou-identities"></a>

<!-- formal-statement-start -->
> **補題（Gaussian平均の半群性・不変性・微分交換）**  
> $h:\mathbb R^d\to\mathbb R$ が有界な $C^2$ 関数で一階・二階の偏導関数も有界とする。$G,G'$ を独立な $N(0,I_d)$ とすると、各 $t\ge0$ について

$$
P_sP_th=P_{s+t}h\quad(s\ge0),\qquad
E[(P_th)(G)]=E[h(G)],
\qquad
\nabla P_th=e^{-t}P_t(\nabla h).
$$

> さらに $t>0$ において、$\mathcal A=\Delta-x\cdot\nabla$ と置けば

$$
\partial_tP_th=\mathcal A P_th,
\qquad
\lim_{t\to\infty}(P_th)(x)=E[h(G)]
$$

> がすべての $x$ について成り立つ。
<!-- formal-statement-end -->

### 証明の見取り図

二回のGaussian平均を合成しても、正規変数の線形結合によって一回の平均に戻ります。$x$ 微分は合成関数の係数 $e^{-t}$ を生み、$t$ 微分に出る $G'$ は[Gaussian部分積分](#lem-hdp5-gaussian-ibp)で二階微分に戻します。

<!-- proof-start -->
### 証明

$s_r=\sqrt{1-e^{-2r}}$ と記し、独立な標準Gaussian $G',G''$ を取ります。$P_sP_t h$ の入力は

$$
e^{-t}(e^{-s}x+s_sG')+s_tG''
=e^{-(s+t)}x+e^{-t}s_sG'+s_tG''
$$

です。確率項は平均零のGaussianであり、その各座標の分散は

$$
e^{-2t}(1-e^{-2s})+(1-e^{-2t})
=1-e^{-2(s+t)}
$$

です。異なる座標の共分散は零なので、この確率項は $s_{s+t}G'$ と同じ分布を持ちます。従って $P_sP_th=P_{s+t}h$ です。

次に $Y=e^{-t}G+\sqrt{1-e^{-2t}}G'$ とします。各座標は独立な正規変数の和で、平均は $0$、分散は

$$
e^{-2t}+(1-e^{-2t})=1.
$$

異なる座標の間には共通のGaussian成分がないため、$Y\sim N(0,I_d)$ です。ゆえに $E(P_th)(G)=Eh(Y)=Eh(G)$ です。

$s_t=\sqrt{1-e^{-2t}}$ と書きます。偏導関数の有界性により期待値の中を $x_j$ で微分でき、

$$
\partial_j(P_th)(x)
=e^{-t}E[(\partial_jh)(e^{-t}x+s_tG')]
=e^{-t}(P_t\partial_jh)(x).
$$

同じ操作をもう一度行うと $\Delta P_th=e^{-2t}P_t(\Delta h)$ です。$t>0$ では $s_t'=e^{-2t}/s_t$ なので

$$
\begin{aligned}
\partial_tP_th(x)
&=-e^{-t}x\cdot E[\nabla h(e^{-t}x+s_tG')]\\
&\quad+\frac{e^{-2t}}{s_t}
\sum_jE[G'_j\partial_jh(e^{-t}x+s_tG')].
\end{aligned}
$$

[Gaussian部分積分](#lem-hdp5-gaussian-ibp)を $G'_j$ に関する関数 $\partial_jh(e^{-t}x+s_tG')$ へ適用します。その $G'_j$ 微分は $s_t\partial_{jj}h$ なので、第2項は

$$
\frac{e^{-2t}}{s_t}\sum_j s_tE[\partial_{jj}h(e^{-t}x+s_tG')]
=e^{-2t}P_t(\Delta h)(x)
=\Delta P_th(x)
$$

です。第1項は $-x\cdot\nabla P_th(x)$ と一致するため生成作用素の式を得ます。

最後に $e^{-t}x\to0$、$s_t\to1$ なので $h(e^{-t}x+s_tG')\to h(G')$ です。有界性による優収束から極限は $Eh(G)$ となります。
<!-- proof-end -->

ここまでで、平均を保存しつつ微分を $e^{-t}$ だけ縮める操作ができました。次にその縮小を定量的な不等式へ変換します。

## 4. 対数Sobolev不等式を導く

Gaussian平均でどれだけ情報が均されるかを測るため、正の関数とその平均に対し次の量を導入します。

<a id="def-hdp5-entropy"></a>

<!-- formal-statement-start -->
> **定義（Gaussianエントロピー汎関数）**  
> $G\sim N(0,I_d)$ とする。$h:\mathbb R^d\to(0,\infty)$ は有界で正の下限を持つBorel可測関数とする。このとき

$$
\operatorname{Ent}_{\gamma}(h)
=E[h(G)\log h(G)]-Eh(G)\log Eh(G)
$$

> と定める。
<!-- formal-statement-end -->

<!-- definition-example-start: def-hdp5-entropy -->
**定義の確認** $h(x)\equiv c>0$ のとき $E[h\log h]=c\log c$、$Eh\log Eh=c\log c$ なので $\operatorname{Ent}_\gamma(h)=0$ です。定数に向かって平均化された後の値が零になることと整合します。
<!-- definition-example-end -->

この量は $h$ が確率密度であることを要求しません。$P_t h$ に適用し、時間とともに減少する様子を追います。

<a id="lem-hdp5-gaussian-lsi"></a>

<!-- formal-statement-start -->
> **補題（Gaussian対数Sobolev不等式）**  
> $G\sim N(0,I_d)$ とする。$h:\mathbb R^d\to(0,\infty)$ は有界な $C^2$ 関数で、有界な一階・二階偏導関数を持ち、$\inf_xh(x)>0$ を満たすとする。このとき

$$
\operatorname{Ent}_{\gamma}(h)
\le\frac12E\!\left[\frac{\|\nabla h(G)\|_2^2}{h(G)}\right]
$$

> が成り立つ。
<!-- formal-statement-end -->

### 証明の見取り図

$H(t)=E[(P_th)(G)\log(P_th)(G)]$ を時刻で微分します。定数へ近づく際に減少した量が、勾配の二乗を時間積分したものになります。[微分交換公式](#lem-hdp5-ou-identities)による $e^{-2t}$ の積分が係数 $1/2$ を生みます。

<!-- proof-start -->
### 証明

最初に、滑らかな有界関数 $u,v$（必要な導関数も有界）について

$$
E[u(G)\mathcal Av(G)]
=-E[\nabla u(G)\cdot\nabla v(G)]
$$

を示します。$\mathcal Av=\Delta v-x\cdot\nabla v$ を展開し、各 $j$ について[Gaussian部分積分](#lem-hdp5-gaussian-ibp)を $\varphi=u\partial_jv$ に使うと、

$$
E[G_ju\partial_jv]
=E[(\partial_ju)(\partial_jv)+u\partial_{jj}v].
$$

$j$ について和を取ると

$$
\begin{aligned}
E[u(G)\mathcal Av(G)]
&=\sum_{j=1}^d\left(E[u\,\partial_{jj}v]-E[G_ju\,\partial_jv]\right)\\
&=-\sum_{j=1}^dE[(\partial_ju)(\partial_jv)]
=-E[\nabla u(G)\cdot\nabla v(G)].
\end{aligned}
$$

特に $u=1$ とすれば $\nabla u=0$ なので $E[\mathcal Av(G)]=0$ です。

$u_t=P_th$ とおきます。$h$ の正の下限と上限は平均後も保たれるので、$\log u_t$ とその微分が定義できます。さらに $t>0$ について、[Gaussian平均の生成作用素公式](#lem-hdp5-ou-identities)を代入すると

$$
\partial_t u_t(x)=\Delta u_t(x)-x\cdot\nabla u_t(x).
$$

$h$ の一階・二階偏導関数が有界なので、$\nabla u_t$ と $\Delta u_t$ も $t$ によらず有界です。従って右辺は、$t$ の有界区間で $C(1+\|x\|_2)$ によって抑えられます。標準Gaussianの $E\|G\|_2$ は有限なので、$H(t)$ の期待値と時間微分を交換できます。これを使うと

$$
\begin{aligned}
H'(t)
&=E[(1+\log u_t(G))\,\mathcal Au_t(G)]\\
&=-E[\nabla\log u_t(G)\cdot\nabla u_t(G)]\\
&=-E\!\left[\frac{\|\nabla u_t(G)\|_2^2}{u_t(G)}\right].
\end{aligned}
$$

$t\to\infty$ では $u_t(x)\to Eh(G)$ で、$u_t\log u_t$ は一様に有界です。ゆえに $H(\infty)=Eh\log Eh$ です。まず有限の $T>0$ に対して微分の積分を戻すと

$$
H(0)-H(T)=-\int_0^T H'(t)\,dt
=\int_0^TE\!\left[\frac{\|\nabla P_th(G)\|_2^2}{P_th(G)}\right]dt.
$$

左辺で $T\to\infty$ の極限を取ります。右辺の積分対象は非負なので積分区間を単調に延長でき、

$$
\operatorname{Ent}_{\gamma}(h)
=\int_0^\infty
E\!\left[\frac{\|\nabla P_th(G)\|_2^2}{P_th(G)}\right]dt.
$$

ここで[微分交換公式](#lem-hdp5-ou-identities)と、$P_t$ の中の確率分布に関する[Cauchy–Schwarz不等式](../../../基礎科目/F0/F0-00E2/index.md#thm-f0-00e2-cauchy-schwarz)を順に使います。$Y=e^{-t}x+\sqrt{1-e^{-2t}}G'$ と置くと、各座標 $j$ に対して

$$
\begin{aligned}
|E[\partial_jh(Y)]|^2
&=\left|E\left[\sqrt{h(Y)}\,\frac{\partial_jh(Y)}{\sqrt{h(Y)}}\right]\right|^2\\
&\le E[h(Y)]\,E\left[\frac{|\partial_jh(Y)|^2}{h(Y)}\right].
\end{aligned}
$$

両辺を $j=1,\ldots,d$ で足し、右辺の共通因子 $E[h(Y)]=(P_th)(x)$ を括ると、ベクトルに対する評価が得られます。すなわち各 $x$ について

$$
\begin{aligned}
\|\nabla P_th(x)\|_2^2
&=e^{-2t}\|P_t(\nabla h)(x)\|_2^2\\
&=e^{-2t}\left\|P_t\!\left(\sqrt h\,\frac{\nabla h}{\sqrt h}\right)(x)\right\|_2^2\\
&\le e^{-2t}(P_th)(x)
P_t\!\left(\frac{\|\nabla h\|_2^2}{h}\right)(x).
\end{aligned}
$$

分母 $P_th$ で割り、期待値を取ります。ここで

$$
q(x)=\frac{\|\nabla h(x)\|_2^2}{h(x)}
$$

と置くと、$\inf h>0$ と $\|\nabla h\|_2$ の有界性から $q$ は有界な連続関数です。ただし $h\in C^2$ だけでは $q$ が $C^2$ とは限らないため、[Gaussian平均の不変性](#lem-hdp5-ou-identities)の滑らかな関数に関する主張をそのまま適用することはできません。

そこで不変性をこの $q$ に直接確認します。$G,G'$ が独立な標準Gaussianであるとき、$Y_t=e^{-t}G+\sqrt{1-e^{-2t}}G'$ の平均は零で、共分散は $e^{-2t}I_d+(1-e^{-2t})I_d=I_d$ です。$Y_t$ は正規ベクトルなので $Y_t\sim N(0,I_d)$ であり、有界性によって積分は有限です。従って期待値を順に取ると

$$
E[(P_tq)(G)]
=E\left[q\left(e^{-t}G+\sqrt{1-e^{-2t}}G'\right)\right]
=E[q(G)].
$$

この恒等式を非負関数 $q$ に適用すれば

$$
\begin{aligned}
\operatorname{Ent}_{\gamma}(h)
&\le\int_0^\infty e^{-2t}
E\!\left[P_t\!\left(\frac{\|\nabla h\|_2^2}{h}\right)(G)\right]dt\\
&=\left(\int_0^\infty e^{-2t}\,dt\right)
E\!\left[\frac{\|\nabla h(G)\|_2^2}{h(G)}\right]\\
&=\frac12E\!\left[\frac{\|\nabla h(G)\|_2^2}{h(G)}\right].
\end{aligned}
$$

積分係数 $1/2$ は $\int_0^\infty e^{-2t}dt=1/2$ から出ました。
<!-- proof-end -->

この導出を経由すると、次の集中不等式の係数 $1/2$ を「既知の定数」として覚える必要がありません。

## 5. Lipschitz関数のGaussian集中

いま $f$ が滑らかな $L$-Lipschitz関数なら、[方向微分](../../../基礎科目/RA/RA6/index.md#def-ra6-directional-derivative)と[勾配](../../../幾何系/VC/VC1/index.md#def-vc1-gradient)を使って変化率を直接評価できます。任意の単位ベクトル $v$、$s\ne0$ について

$$
\left|\frac{f(x+sv)-f(x)}{s}\right|\le L
$$

です。$s\to0$ とすれば $|\nabla f(x)\cdot v|\le L$ となります。$\nabla f(x)\ne0$ なら $v=\nabla f(x)/\|\nabla f(x)\|_2$ を代入し、零なら自明なので、全ての $x$ に対し $\|\nabla f(x)\|_2\le L$ です。これを指数関数 $h=e^{\lambda f}$ に入れると

$$
\frac{\|\nabla h\|_2^2}{h}
=\lambda^2e^{\lambda f}\|\nabla f\|_2^2
\le\lambda^2L^2e^{\lambda f}
$$

が得られます。まず有界で滑らかな $f$ に適用し、その後Lipschitzな一般の $f$ へ拡張します。

<a id="thm-hdp5-gaussian-concentration"></a>

<!-- formal-statement-start -->
> **定理（Gaussian集中とLipschitz関数）**  
> $d\ge1$、$G\sim N(0,I_d)$ とし、可測関数 $f:\mathbb R^d\to\mathbb R$ がEuclid距離について $L$-Lipschitz（$L\ge0$）とする。$L>0$ なら、すべての $\lambda\in\mathbb R$ と $t>0$ について

$$
E e^{\lambda(f(G)-Ef(G))}\le e^{\lambda^2L^2/2},
$$

$$
P(f(G)-Ef(G)\ge t)\le e^{-t^2/(2L^2)},
\qquad
P(|f(G)-Ef(G)|\ge t)\le2e^{-t^2/(2L^2)}.
$$

> $L=0$ なら $f(G)=Ef(G)$ は確率一で成立し、$t>0$ の偏差確率は零である。
<!-- formal-statement-end -->

### 証明の見取り図

[Gaussian対数Sobolev不等式](#lem-hdp5-gaussian-lsi)に $h=e^{\lambda f}$ を代入し、指数モーメントの対数の微分不等式を積分します（Herbstの方法）。最後に[指数Markov法](../HDP1/index.md#prop-hdp1-exponential-markov)で尾部を出します。微分可能でないLipschitz関数は、切断と平滑化で近似します。

<!-- proof-start -->
### 証明

**第1段階：有界で滑らかな場合。** まず $f$ が有界な $C^2$ 関数で一階・二階偏導関数も有界とします。$h=e^{\lambda f}$ は正の下限を持ち、[Gaussian対数Sobolev不等式](#lem-hdp5-gaussian-lsi)の仮定を満たします。前節の勾配評価を代入すると

$$
\operatorname{Ent}_{\gamma}(e^{\lambda f})
\le\frac{\lambda^2L^2}{2}E[e^{\lambda f}].
$$

$M(\lambda)=E[e^{\lambda f(G)}]$、$K(\lambda)=\log M(\lambda)$ と置きます。有界性により微分と期待値を交換でき、

$$
M'(\lambda)=E[f(G)e^{\lambda f(G)}],
\qquad
K'(\lambda)=\frac{M'(\lambda)}{M(\lambda)}.
$$

従って直前の不等式を $M(\lambda)>0$ で割ると

$$
\lambda K'(\lambda)-K(\lambda)\le\frac{\lambda^2L^2}{2}.
$$

$\lambda>0$ に対して

$$
\frac{d}{d\lambda}\left(\frac{K(\lambda)}{\lambda}\right)
=\frac{\lambda K'(\lambda)-K(\lambda)}{\lambda^2}
\le\frac{L^2}{2}.
$$

$K(0)=0$、$K'(0)=Ef(G)$ より $\lim_{\lambda\downarrow0}K(\lambda)/\lambda=Ef(G)$ です。$0$ から $\lambda$ まで積分すると

$$
\frac{K(\lambda)}{\lambda}-Ef(G)
\le\frac{\lambda L^2}{2},
\qquad
K(\lambda)-\lambda Ef(G)\le\frac{\lambda^2L^2}{2}.
$$

指数を取れば正の $\lambda$ に対するモーメント母関数の上界です。$-f$ も $L$-Lipschitzなので同じ議論を $-f$ に使い、負の $\lambda$ についても結論を得ます。

**第2段階：任意のLipschitz関数。** $f$ は連続であり、$|f(x)|\le|f(0)|+L\|x\|_2$ です。また任意の $a\ge0$ で

$$
a\|x\|_2\le\frac{\|x\|_2^2}{4}+a^2
$$

が成り立ちます。独立な標準正規成分について直接積分すると $E e^{\|G\|_2^2/4}=2^{d/2}<\infty$ なので、$Ee^{a\|G\|_2}$ は有限です。従って以下の指数モーメントと中心化は存在します。

$T_M(u)=\max(-M,\min(u,M))$ と置けば $f_M=T_M\circ f$ は有界でLipschitz定数は高々 $L$ です。非負で積分が $1$、単位球に台を持つ滑らかな核 $\rho$ を使い、$f_{M,\varepsilon}=f_M*\rho_\varepsilon$ とします。積分の内側でLipschitz条件を用いると

$$
\begin{aligned}
|f_{M,\varepsilon}(x)-f_{M,\varepsilon}(y)|
&\le\int \rho_\varepsilon(u)|f_M(x-u)-f_M(y-u)|\,du\\
&\le L\|x-y\|_2
\end{aligned}
$$

です。$f_{M,\varepsilon}$ は有界かつ滑らかで、各階の導関数も有界なので第1段階が適用できます。

まず $M$ を固定して $\varepsilon\downarrow0$ とすると、Lipschitz性と核の台から

$$
|f_{M,\varepsilon}(x)-f_M(x)|
\le L\int\|u\|_2\rho_\varepsilon(u)\,du
\le L\varepsilon\longrightarrow0
$$

です。また $|f_{M,\varepsilon}|\le M$ だから、平均と指数モーメントに有界収束を適用できます。これで $f_M$ に同じ指数不等式が成立します。

次に $M\to\infty$ とすると $f_M(x)\to f(x)$ かつ $|f_M(x)|\le|f(x)|$ です。先に確認した $Ee^{a|f(G)|}<\infty$（任意の $a\ge0$）によって、平均には $|f(G)|$、指数モーメントには $e^{|\lambda||f(G)|}$ を可積分な優関数として使えます。各極限をこの順序で取れば、一般の $f$ でも

$$
Ee^{\lambda(f(G)-Ef(G))}\le e^{\lambda^2L^2/2}
$$

が成り立ちます。

**第3段階：尾部の導出。** $\lambda>0$ について[指数Markov法](../HDP1/index.md#prop-hdp1-exponential-markov)を $Y=f(G)-Ef(G)$ に適用すると

$$
P(Y\ge t)\le e^{-\lambda t}Ee^{\lambda Y}
\le\exp\left(-\lambda t+\frac{\lambda^2L^2}{2}\right).
$$

指数は $\lambda=t/L^2$ で最小となります。実際、微分は $-t+\lambda L^2$ で、その値は

$$
-\frac{t^2}{L^2}+\frac{t^2}{2L^2}
=-\frac{t^2}{2L^2}
$$

です。$-f$ に同じ上側評価を適用して下側を得て、二つの事象の和を上から抑えると両側評価になります。$L=0$ は定義から $f$ が定数となる場合です。
<!-- proof-end -->

**係数と次元の読み方。** $L$ は $d$ と別の量です。$L$ が $d$ に依存しなければ、偏差指数にも $d$ が直接現れません。これは期待値 $Ef(G)$ が $d$ に依存しないという主張ではありません。

また線形関数 $f(x)=a\cdot x$ では $L=\|a\|_2$ と選べ、独立なGaussian成分の指数モーメントを掛けると

$$
E e^{\lambda a\cdot G}
=\prod_{j=1}^d e^{\lambda^2a_j^2/2}
=e^{\lambda^2\|a\|_2^2/2}.
$$

指数モーメントの係数 $1/2$ はこの線形例ですでに等号となり、一様には改善できません。

## 6. 平均値と高確率の上界を分けて作る

### Gaussianベクトルの長さ

$f(x)=\|x\|_2$ は $1$-Lipschitzです。一方、[Cauchy–Schwarz不等式](../../../基礎科目/F0/F0-00E2/index.md#thm-f0-00e2-cauchy-schwarz)と $E\|G\|_2^2=\sum_jEG_j^2=d$ により

$$
E\|G\|_2\le\sqrt{E\|G\|_2^2}=\sqrt d.
$$

[Gaussian集中とLipschitz関数](#thm-hdp5-gaussian-concentration)を $f$、$L=1$ に適用し、$u>0$ と置けば

$$
P(\|G\|_2\ge\sqrt d+u)
\le P(\|G\|_2-E\|G\|_2\ge u)
\le e^{-u^2/2}.
$$

したがって $0<\delta<1$ なら、確率少なくとも $1-\delta$ で

$$
\|G\|_2\le\sqrt d+\sqrt{2\log(1/\delta)}
$$

です。**中心の $\sqrt d$ は別の期待値評価**から来たことに注意します。

### $d$ 個のGaussian座標の最大値

$d\ge2$、$Z=\max_{1\le j\le d}G_j$ と置きます。第1節で確認したように、最大値関数のLipschitz定数は $1$ です。一方、任意の $\lambda>0$ で標本ごとに

$$
e^{\lambda Z}\le\sum_{j=1}^d e^{\lambda G_j}
$$

なので、$\log$ の凹性と[標準正規の指数モーメント](#ref-hdp5-standard-normal-mgf)により

$$
\begin{aligned}
EZ
&=\frac1\lambda E[\log e^{\lambda Z}]
\le\frac1\lambda\log E[e^{\lambda Z}]\\
&\le\frac1\lambda\log\sum_{j=1}^dEe^{\lambda G_j}
=\frac{\log d}{\lambda}+\frac\lambda2.
\end{aligned}
$$

右辺を最小にする $\lambda=\sqrt{2\log d}$ を代入すると

$$
EZ\le\sqrt{2\log d}.
$$

続いて[Gaussian集中とLipschitz関数](#thm-hdp5-gaussian-concentration)を $Z-EZ$ に適用し、

$$
P\left(Z\ge\sqrt{2\log d}+u\right)
\le e^{-u^2/2}
$$

を得ます。座標最大値の「典型的な位置」は $\sqrt{\log d}$ 程度で動く一方、**その平均からの偏差**は次元に依存しない幅で集中します。期待値評価と集中評価を混同しないことが肝心です。

### 集合までの距離

非空集合 $A$ に点 $x$ がどれほど近いかは、$A$ に属する点との距離の下限で測ります。集合が閉じていなくても下限は定義できます。

<a id="def-hdp5-distance-to-set"></a>

<!-- formal-statement-start -->
> **定義（集合までの距離）**  
> 非空集合 $A\subset\mathbb R^d$ について

$$
r_A(x)=\inf_{a\in A}\|x-a\|_2\quad(x\in\mathbb R^d)
$$

> を $x$ から $A$ までの距離とする。
<!-- formal-statement-end -->

<!-- definition-example-start: def-hdp5-distance-to-set -->
**定義の確認** $A=\{0\}$ なら下限を取る候補は零ベクトルだけなので $r_A(x)=\|x\|_2$ です。また $A=(0,\infty)\subset\mathbb R$ のとき、$x<0$ では $a\downarrow0$ として $r_A(x)=-x$、$x\ge0$ では $r_A(x)=0$ となります。端点 $0$ が集合に含まれなくても下限は存在します。
<!-- definition-example-end -->

[三角不等式](../../../基礎科目/F0/F0-00E2/index.md#thm-f0-00e2-triangle-inequality)から、任意の $a\in A$ について

$$
\|x-a\|_2\le\|x-y\|_2+\|y-a\|_2.
$$

右辺で $a$ に関する下限を取り、さらに $x,y$ を交換すれば

$$
|r_A(x)-r_A(y)|\le\|x-y\|_2
$$

です。集合 $A$ の凸性は不要です。したがって $r_A(G)$ も平均の周りでGaussian集中します。

## 7. 共分散が単位行列でない場合

実際の観測では座標が独立とは限りません。ただし座標全体が標準Gaussianベクトルの線形像として表される場合には、その表示を使えます。任意の共分散を「座標が独立」と置き換えるのではありません。

<a id="cor-hdp5-affine-gaussian"></a>

<!-- formal-statement-start -->
> **系（アフィンGaussian像の集中）**  
> $G\sim N(0,I_m)$、$A\in\mathbb R^{d\times m}$、$b\in\mathbb R^d$ とし、$X=b+AG$ と置く。$f:\mathbb R^d\to\mathbb R$ が $L$-Lipschitzなら、$q=L\|A\|_{\mathrm{op}}>0$ のとき任意の $t>0$ について

$$
P(|f(X)-Ef(X)|\ge t)
\le2\exp\left(-\frac{t^2}{2L^2\|A\|_{\mathrm{op}}^2}\right).
$$

> $q=0$ のとき $f(X)$ は確率一で定数である。$X$ の共分散を $\Sigma=AA^\mathsf T$ と書けば、$\|A\|_{\mathrm{op}}^2=\|\Sigma\|_{\mathrm{op}}$ である。
<!-- formal-statement-end -->

### 証明の見取り図

$z\mapsto f(b+Az)$ のLipschitz定数を求めてから、[Gaussian集中とLipschitz関数](#thm-hdp5-gaussian-concentration)に戻します。

<!-- proof-start -->
### 証明

$F(z)=f(b+Az)$ と置きます。すべての $z,w\in\mathbb R^m$ に対し

$$
\begin{aligned}
|F(z)-F(w)|
&\le L\|A(z-w)\|_2\\
&\le L\|A\|_{\mathrm{op}}\|z-w\|_2.
\end{aligned}
$$

したがって $F$ は $q=L\|A\|_{\mathrm{op}}$-Lipschitzです。$F(G)=f(X)$ なので、[Gaussian集中とLipschitz関数](#thm-hdp5-gaussian-concentration)の $L$ を $q$ と置けば主張の尾部界が得られます。

共分散は

$$
E[(X-b)(X-b)^\mathsf T]
=AE[GG^\mathsf T]A^\mathsf T
=AA^\mathsf T
$$

です。[実行列の特異値分解](../../../基礎科目/F0/F0-00F2/index.md#thm-f0-00f2-svd)から、$A$ の特異値の二乗は $AA^\mathsf T$ の非零固有値です。[作用素ノルムと最大特異値の公式](../../../基礎科目/F0/F0-00F2/index.md#thm-f0-00f2-operator-norm-largest-singular)により、最大特異値の二乗は $\|\Sigma\|_{\mathrm{op}}$ です。$q=0$ なら $F$ が $0$-Lipschitzなので定数です。
<!-- proof-end -->

例えば互いに独立な $X_i\sim N(\mu,\sigma^2)$ の標本平均は、標準Gaussian $G_i$ を使って

$$
\overline X-\mu=\frac{\sigma}{n}\sum_{i=1}^nG_i
$$

と書けます。右辺を $G\in\mathbb R^n$ の関数とみなしたLipschitz定数は $|\sigma|/\sqrt n$ であり、[Gaussian集中とLipschitz関数](#thm-hdp5-gaussian-concentration)から

$$
P(|\overline X-\mu|\ge t)
\le2\exp\left(-\frac{nt^2}{2\sigma^2}\right)
$$

です（$\sigma>0$）。これは標本平均の分散が $\sigma^2/n$ である事実とも整合します。

## 8. 仮定を外すと何が壊れるか

**Gaussian入力を外す場合。** $X$ が標準Cauchy分布なら、$f(x)=x$ 自体は $1$-Lipschitzですが $EX$ が存在しません。Gaussian密度の微分式も、Gaussian平均の不変性も成立しないので、上の証明を使えません。Lipschitz性だけでは集中は導けません。

**大域Lipschitz性を外す場合。** $G\sim N(0,1)$ として $f(x)=x^2$ は滑らかでも大域Lipschitzではありません。平方完成ではなくGaussian積分を直接実行すると

$$
Ee^{\lambda G^2}
=\frac1{\sqrt{2\pi}}\int_{\mathbb R}
e^{-(1-2\lambda)x^2/2}\,dx
=(1-2\lambda)^{-1/2}
\qquad(\lambda<1/2).
$$

$\lambda\ge1/2$ では積分が発散します。一方、[Gaussian集中とLipschitz関数](#thm-hdp5-gaussian-concentration)の結論なら中心化指数モーメントがすべての実数 $\lambda$ で有限となるはずです。証明で壊れるのは $\|\nabla f(x)\|\le L$ の一様評価であり、実際 $f'(x)=2x$ は非有界です。

**中心の取り違え。** 本章の結果はまず $Ef(G)$ の周りの集中です。$\max_jG_j$ の例では $EZ$ が $d$ とともに変わります。中心を $0$ に変更するには、別途 $EZ$ 自体を評価しなければなりません。

## 9. 演習：Lipschitz定数・Gaussian平均・応用

**Level A：定義を実際に使う**

### A1. 線形関数の最小Lipschitz定数

$a\in\mathbb R^d$ として $f(x)=a^\mathsf Tx$ を考える。Lipschitz定数が $\|a\|_2$ で取れることを示せ。$a\ne0$ ならより小さな定数が使えないことも示せ。

- Level: A
- ID: HDP5-A1

<!-- solution-start -->
**詳細解答**　[Cauchy–Schwarz不等式](../../../基礎科目/F0/F0-00E2/index.md#thm-f0-00e2-cauchy-schwarz)から

$$
|f(x)-f(y)|=|a^\mathsf T(x-y)|
\le\|a\|_2\|x-y\|_2.
$$

逆に $a\ne0$ で $x=a$、$y=0$ と選ぶと、左辺は $\|a\|_2^2$、右辺の距離は $\|a\|_2$ です。その比が $\|a\|_2$ なので、これより小さい定数は不可能です。$a=0$ なら $f$ は定数で最小定数は $0$ です。
<!-- solution-end -->

### A2. 二つの非線形関数

$\mathbb R^d$ 上の $f(x)=\|x\|_2$ と $g(x)=\max_jx_j$ がともに $1$-Lipschitzであることを、それぞれ別の不等式から証明せよ。

- Level: A
- ID: HDP5-A2

<!-- solution-start -->
**詳細解答**　$f$ については[三角不等式](../../../基礎科目/F0/F0-00E2/index.md#thm-f0-00e2-triangle-inequality)を $x=(x-y)+y$ に使い、

$$
\|x\|_2-\|y\|_2\le\|x-y\|_2
$$

を得ます。逆向きも同じ方法で成立するので $|\|x\|_2-\|y\|_2|\le\|x-y\|_2$ です。$g$ についてはすべての $j$ で $x_j\le y_j+\|x-y\|_2$ が成立します。最大値を取って $g(x)\le g(y)+\|x-y\|_2$ とし、$x,y$ を交換して絶対値の評価を得ます。
<!-- solution-end -->

### A3. 目標確率から半径を求める

$G\sim N(0,I_5)$、$f$ は $2$-Lipschitzとする。$P(|f(G)-Ef(G)|\ge r)\le0.01$ を保証する半径 $r$ を求めよ。次元 $5$ が式に現れない理由も説明せよ。

- Level: A
- ID: HDP5-A3

<!-- solution-start -->
**詳細解答**　[Gaussian集中とLipschitz関数](#thm-hdp5-gaussian-concentration)に $L=2$ を代入すると

$$
P(|f(G)-Ef(G)|\ge r)\le2e^{-r^2/8}.
$$

右辺を $0.01$ 以下にする条件は $e^{-r^2/8}\le1/200$、すなわち $r^2/8\ge\log200$ です。したがって

$$
r=\sqrt{8\log200}
$$

とすればよいです。次元が現れないのは、Euclid距離に対して同じLipschitz定数 $2$ が全方向の変化をすでに制御しているからです。平均 $Ef(G)$ 自体は次元に依存し得ます。
<!-- solution-end -->

### A4. Gaussian標本平均

独立な $X_1,\ldots,X_n\sim N(\mu,9)$ を考える。$\overline X$ を標準Gaussianベクトルの関数とみなしLipschitz定数を求め、$P(|\overline X-\mu|\ge t)$ の上界を導け。

- Level: A
- ID: HDP5-A4

<!-- solution-start -->
**詳細解答**　$G_i=(X_i-\mu)/3$ は独立な標準正規で、

$$
\overline X-\mu=\frac3n\sum_{i=1}^nG_i.
$$

係数ベクトル $a=(3/n,\ldots,3/n)$ のEuclidノルムは

$$
\|a\|_2=\sqrt{n(3/n)^2}=\frac3{\sqrt n}.
$$

[Gaussian集中とLipschitz関数](#thm-hdp5-gaussian-concentration)に $L=3/\sqrt n$ を代入し、

$$
P(|\overline X-\mu|\ge t)\le2e^{-nt^2/18}
$$

を得ます。$E\overline X=\mu$ も各成分の平均から確認できます。
<!-- solution-end -->

### A5. 生成作用素の簡単な検算

一次元の $\mathcal Ah=h''-xh'$ に $h(x)=x^2$ を形式的に適用し、$\mathcal Ah(x)$ と $E[\mathcal Ah(G)]$ を求めよ。$G\sim N(0,1)$ とする。

- Level: A
- ID: HDP5-A5

<!-- solution-start -->
**詳細解答**　$h'(x)=2x$、$h''(x)=2$ だから

$$
\mathcal Ah(x)=2-x(2x)=2-2x^2.
$$

標準正規の二次モーメントは $EG^2=1$ なので

$$
E[\mathcal Ah(G)]=2-2EG^2=0.
$$

[Gaussian平均の生成作用素](#lem-hdp5-ou-identities)に対応する平均保存と整合します。補題では有界関数を仮定したのに対し、この設問では多項式を直接計算しており、期待値が有限であることを明示して使っています。
<!-- solution-end -->

**Level B：証明の部品を再構成する**

### B1. 対数Sobolev評価から指数モーメントへ

有界で滑らかな $L$-Lipschitz関数 $f$ に対し、次の評価が既に示されたとする。

$$
\operatorname{Ent}_\gamma(e^{\lambda f})
\le\frac{\lambda^2L^2}{2}Ee^{\lambda f}.
$$

$K(\lambda)=\log Ee^{\lambda f(G)}$ を用い、$\lambda>0$ について

$$
K(\lambda)-\lambda Ef(G)\le\frac{\lambda^2L^2}{2}
$$

を改めて導け。

- Level: B
- ID: HDP5-B1

<!-- solution-start -->
**詳細解答**　$h=e^{\lambda f}$ を[第4節の定義](#def-hdp5-entropy)に代入すると

$$
\operatorname{Ent}_\gamma(e^{\lambda f})
=E[\lambda f(G)e^{\lambda f(G)}]-M(\lambda)\log M(\lambda)
$$

です。$M'(\lambda)=E[f(G)e^{\lambda f(G)}]$ だから

$$
\frac{\operatorname{Ent}_\gamma(e^{\lambda f})}{M(\lambda)}
=\lambda\frac{M'}M-\log M
=\lambda K'-K.
$$

仮定の不等式で割ると $\lambda K'-K\le\lambda^2L^2/2$ です。ここから

$$
\left(\frac K\lambda\right)'
=\frac{\lambda K'-K}{\lambda^2}\le\frac{L^2}{2}.
$$

$K(0)=0$ および $K'(0)=Ef(G)$ より $K(\lambda)/\lambda\to Ef(G)$ です。これを初期値として積分し、

$$
\frac{K(\lambda)}\lambda
\le Ef(G)+\frac{\lambda L^2}{2}
$$

を得ます。両辺に $\lambda>0$ を掛けて結論が出ます。
<!-- solution-end -->

### B2. 相関した二つのGaussian座標

$(X_1,X_2)$ を平均零、各分散 $1$、共分散 $\rho$（$-1<\rho<1$）の共同Gaussianベクトルとする。$Z=\max(X_1,X_2)$ について、(1) $EZ$ を求め、(2) $P(Z-EZ\ge t)$ を $\rho$ を含む形で評価せよ。

- Level: B
- ID: HDP5-B2

<!-- solution-start -->
**詳細解答**　$Z=(X_1+X_2+|X_1-X_2|)/2$ です。$D=X_1-X_2$ は平均零、分散 $2-2\rho=2(1-\rho)$ の正規変数です。標準正規 $G$ について

$$
E|G|=\frac2{\sqrt{2\pi}}\int_0^\infty x e^{-x^2/2}\,dx
=\sqrt{\frac2\pi}
$$

なので

$$
EZ=\frac12 E|D|
=\frac12\sqrt{2(1-\rho)}\sqrt{\frac2\pi}
=\sqrt{\frac{1-\rho}{\pi}}.
$$

次に共分散行列は

$$
\Sigma=\begin{pmatrix}1&\rho\\\rho&1\end{pmatrix}.
$$

固有ベクトル $(1,1)$、$(1,-1)$ に対応する固有値は $1+\rho$、$1-\rho$ です。$|\rho|<1$ より両固有値は正です。正規直交固有ベクトルを列に並べた行列を

$$
Q=\frac1{\sqrt2}
\begin{pmatrix}1&1\\1&-1\end{pmatrix}
$$

とすれば、$A=Q\operatorname{diag}(\sqrt{1+\rho},\sqrt{1-\rho})Q^\mathsf T$ と取れます。実際、

$$
AA^\mathsf T
=Q\operatorname{diag}(1+\rho,1-\rho)Q^\mathsf T
=\Sigma,
\qquad
\|A\|_{\mathrm{op}}=\sqrt{1+|\rho|}.
$$

独立な標準正規ベクトル $G\in\mathbb R^2$ に対し $AG$ は共分散 $\Sigma$ の共同Gaussianベクトルです。最大値関数は $1$-Lipschitzなので、[アフィンGaussian像の集中](#cor-hdp5-affine-gaussian)の証明どおり、$G\mapsto\max_j(AG)_j$ は $\sqrt{1+|\rho|}$-Lipschitzです。[Gaussian集中とLipschitz関数](#thm-hdp5-gaussian-concentration)の片側評価を適用すると

$$
P(Z-EZ\ge t)
\le\exp\left(-\frac{t^2}{2(1+|\rho|)}\right).
$$

相関があるため $X_1,X_2$ を独立扱いしてはいません。
<!-- solution-end -->

### B3. Gaussianノルムの上側信頼半径

$G\sim N(0,I_d)$、$d\ge1$ とする。任意の $\delta\in(0,1)$ に対して、確率 $1-\delta$ 以上で $\|G\|_2\le \sqrt d+\sqrt{2\log(1/\delta)}$ が成り立つことを、期待値評価と集中評価の二段に分けて証明せよ。

- Level: B
- ID: HDP5-B3

<!-- solution-start -->
**詳細解答**　まず[Cauchy–Schwarz不等式](../../../基礎科目/F0/F0-00E2/index.md#thm-f0-00e2-cauchy-schwarz)から

$$
E\|G\|_2\le\sqrt{E\|G\|_2^2}
=\sqrt{\sum_{j=1}^dEG_j^2}
=\sqrt d.
$$

次にノルムの[逆三角不等式](../../../基礎科目/F0/F0-00E2/index.md#thm-f0-00e2-reverse-triangle-inequality)で $f(x)=\|x\|_2$ は $1$-Lipschitzです。[Gaussian集中とLipschitz関数](#thm-hdp5-gaussian-concentration)に $u=\sqrt{2\log(1/\delta)}$ を代入すると

$$
P(\|G\|_2-E\|G\|_2\ge u)
\le e^{-u^2/2}
=e^{-\log(1/\delta)}=\delta.
$$

$E\|G\|_2\le\sqrt d$ なので $\{\|G\|_2>\sqrt d+u\}$ は上の偏差事象に含まれます。従って上側信頼半径を得ます。
<!-- solution-end -->

### B4. 二次関数では何が失われるか

$G\sim N(0,1)$ とし $Y=G^2-1$ とする。(1) $E e^{\lambda Y}$ が有限な $\lambda$ の範囲とその値を求めよ。(2) $f(x)=x^2$ へGaussian集中定理を直接適用できない理由を、勾配条件と指数モーメントの両面から述べよ。

- Level: B
- ID: HDP5-B4

<!-- solution-start -->
**詳細解答**　密度を代入して

$$
\begin{aligned}
Ee^{\lambda Y}
&=e^{-\lambda}\frac1{\sqrt{2\pi}}\int_{\mathbb R}
\exp\left(-\frac{1-2\lambda}{2}x^2\right)\,dx\\
&=e^{-\lambda}(1-2\lambda)^{-1/2}
\qquad(\lambda<1/2).
\end{aligned}
$$

$\lambda=1/2$ では被積分関数が定数となり、$\lambda>1/2$ では無限遠で増加するので積分は発散します。$f'(x)=2x$ は $x\in\mathbb R$ で有界ではなく、一定のLipschitz定数 $L$ を選べません。またGaussian集中定理の指数モーメント上界なら任意の正の $\lambda$ で有限となるはずですが、実際は $\lambda\ge1/2$ で発散します。どちらも同じ仮定不足を示しています。
<!-- solution-end -->

**Level C：多くの相関したGaussianアフィン関数**

### C1. 有限個のアフィン関数の最大値

$d\ge2$、$m\ge1$ とする。$G\sim N(0,I_m)$、$a_1,\ldots,a_d\in\mathbb R^m$、$b_1,\ldots,b_d\in\mathbb R$ とし、

$$
Z=\max_{1\le j\le d}(b_j+a_j^\mathsf TG),
\qquad R=\max_{1\le j\le d}\|a_j\|_2>0,\qquad b_*=\max_jb_j
$$

とする。(1) $Z$ を $G$ の関数と見たLipschitz定数を評価せよ。(2) $EZ\le b_*+R\sqrt{2\log d}$ を示せ。(3) $u>0$ について $P(Z\ge b_*+R\sqrt{2\log d}+u)\le e^{-u^2/(2R^2)}$ を導け。ベクトル $a_j$ は直交すると仮定しない。

- Level: C
- ID: HDP5-C1

<!-- solution-start -->
**詳細解答**　(1) $F(g)=\max_j(b_j+a_j^\mathsf Tg)$ とします。任意の $g,h$ とすべての $j$ で

$$
b_j+a_j^\mathsf Tg
\le b_j+a_j^\mathsf Th+\|a_j\|_2\|g-h\|_2
\le b_j+a_j^\mathsf Th+R\|g-h\|_2.
$$

最大値を取った後、$g,h$ を交換すると $|F(g)-F(h)|\le R\|g-h\|_2$ です。

(2) $a_j^\mathsf TG$ は平均零、分散 $\|a_j\|_2^2$ の正規変数です。[標準正規の指数モーメント](#ref-hdp5-standard-normal-mgf)を各独立成分 $G_k$ と係数 $\lambda a_{jk}$ に適用します。$a_j=(a_{j1},\ldots,a_{jm})$ と書くと

$$
\begin{aligned}
Ee^{\lambda a_j^\mathsf TG}
&=\prod_{k=1}^mEe^{\lambda a_{jk}G_k}
=\prod_{k=1}^me^{\lambda^2a_{jk}^2/2}\\
&=e^{\lambda^2\|a_j\|_2^2/2}
\le e^{\lambda^2R^2/2}.
\end{aligned}
$$

$Z\le b_*+\max_j a_j^\mathsf TG$ なので、$\lambda>0$ に対し

$$
\begin{aligned}
EZ-b_*
&\le E\max_j a_j^\mathsf TG\\
&\le\frac1\lambda\log
 E\exp\left(\lambda\max_j a_j^\mathsf TG\right)\\
&\le\frac1\lambda\log\sum_{j=1}^dEe^{\lambda a_j^\mathsf TG}\\
&\le\frac{\log d}{\lambda}+\frac{\lambda R^2}{2}.
\end{aligned}
$$

右辺の微分は $-\log d/\lambda^2+R^2/2$ です。$d\ge2$、$R>0$ だから $\lambda_*=\sqrt{2\log d}/R$ が正で、代入すると二項の和は $R\sqrt{2\log d}$ です。

(3) (1) と[Gaussian集中とLipschitz関数](#thm-hdp5-gaussian-concentration)から $P(Z-EZ\ge u)\le e^{-u^2/(2R^2)}$ です。(2) により

$$
\{Z\ge b_*+R\sqrt{2\log d}+u\}
\subseteq\{Z\ge EZ+u\}.
$$

したがって求める上界を得ます。$a_j^\mathsf TG$ どうしは一般に相関しますが、指数モーメントを**各 $j$ ごとに評価してから和を取る**ため、直交性も相互独立性も使っていません。
<!-- solution-end -->

### C2. 共分散付きGaussianベクトルの長さ

$X=b+AG$、$G\sim N(0,I_m)$、$A\in\mathbb R^{d\times m}$、$\Sigma=AA^\mathsf T$ とする。$\Sigma\ne0$ のとき任意の $u>0$ について

$$
P\left(\|X-b\|_2\ge\sqrt{\operatorname{tr}\Sigma}+u\right)
\le\exp\left(-\frac{u^2}{2\|\Sigma\|_{\mathrm{op}}}\right)
$$

を示せ。$\Sigma=0$ の場合も述べよ。

- Level: C
- ID: HDP5-C2

<!-- solution-start -->
**詳細解答**　$f(x)=\|x-b\|_2$ は[逆三角不等式](../../../基礎科目/F0/F0-00E2/index.md#thm-f0-00e2-reverse-triangle-inequality)により $1$-Lipschitzです。共分散の対角和について

$$
\begin{aligned}
E\|X-b\|_2^2
&=E[G^\mathsf TA^\mathsf TAG]\\
&=\sum_{i,j}(A^\mathsf TA)_{ij}E[G_iG_j]\\
&=\sum_i(A^\mathsf TA)_{ii}
=\operatorname{tr}(AA^\mathsf T)
=\operatorname{tr}\Sigma.
\end{aligned}
$$

ここで $E[G_iG_j]$ は $i\ne j$ で零、$i=j$ で $1$ です。[Cauchy–Schwarz不等式](../../../基礎科目/F0/F0-00E2/index.md#thm-f0-00e2-cauchy-schwarz)から

$$
E\|X-b\|_2\le\sqrt{E\|X-b\|_2^2}
=\sqrt{\operatorname{tr}\Sigma}.
$$

一方、[アフィンGaussian像の集中](#cor-hdp5-affine-gaussian)の片側版（証明で使った[Gaussian集中とLipschitz関数](#thm-hdp5-gaussian-concentration)の上側評価）により

$$
P(\|X-b\|_2-E\|X-b\|_2\ge u)
\le\exp\left(-\frac{u^2}{2\|A\|_{\mathrm{op}}^2}\right)
=\exp\left(-\frac{u^2}{2\|\Sigma\|_{\mathrm{op}}}\right).
$$

期待値上界を用いて事象の包含を取れば所望の式が得られます。$\Sigma=0$ なら $\|A\|_{\mathrm{op}}=0$ より $A=0$、従って $X=b$ は確率一で、$u>0$ に対する左辺は零です。
<!-- solution-end -->

## 10. まとめ：Gaussianが特別である理由

有限個の独立入力の「入れ替え幅」を使った[McDiarmid不等式](../HDP4/index.md#thm-hdp4-mcdiarmid)に対し、Gaussian集中は全方向の**連続的な変化率**をEuclid距離で測ります。Gaussian部分積分、半群の微分縮小、対数Sobolev不等式、Herbstの指数評価という道筋を踏むことで、

$$
P(f(G)-Ef(G)\ge t)\le e^{-t^2/(2L^2)}
$$

を導きました。次元が増えても $L$ が固定なら偏差部分の定数は変わりません。ただし最大値やノルムの期待値の位置、あるいは共分散行列の作用素ノルムは別途評価します。

次のHDP6では有限個の方向を覆う $\varepsilon$-net とランダム射影を導入し、全方向の連続的な問題を有限個の確率評価へ変換します。
