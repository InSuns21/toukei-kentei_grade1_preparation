# OTR15 測度空間の最短経路とは

[OTR8 の Wasserstein 距離](../OTR8/index.md#def-otr8-wasserstein)は二つの確率分布の隔たりを測ります。しかし距離があるだけでは、途中の時刻に分布をどう置けば「最短の道」になるか分かりません。点を動かす速度と、分布の重みを変える速度も同じではありません。

本章では基礎空間を Euclid 空間 $\mathbb R^d$（$d\ge1$）に固定します。[有限 $p$ 次モーメントの定義](../OTR8/index.md#def-otr8-p-moment)で $p=2$ とした確率測度の空間が $\mathcal P_2(\mathbb R^d)$ です。

この空間では、最適結合に従って粒子を直線上で動かすと、距離に関する最短経路ができます。この構成を証明し、単に二つの分布を混ぜる操作との違い、最短経路の非一意性を計算します。

## 1. 「最短」は何を意味するか

平面上の二点を結ぶ直線を想像しましょう。始点から終点への距離だけでなく、曲線上で細かく区切った距離の和を考えると、回り道は直線より長くなります。確率測度を点とする空間でも同じ発想を採ります。

距離空間 $(M,D)$ の連続曲線 $\gamma:[0,1]\to M$ と分割 $0=t_0<\cdots<t_n=1$ を考えます。隣り合う点の距離を足し、その上限を取ります。曲線の長さが有限でないこともあります。

<a id="def-otr15-metric-length"></a>

<!-- formal-statement-start -->
> **定義（距離空間の曲線の長さ）**
> 距離空間 $(M,D)$ と連続写像 $\gamma:[0,1]\to M$ に対し、その長さ $L_D(\gamma)\in[0,\infty]$ を

$$
L_D(\gamma)=\sup_{\substack{n\ge1\\0=t_0<\cdots<t_n=1}}
\sum_{i=1}^n D(\gamma(t_{i-1}),\gamma(t_i))
$$

> と定める。特に $M=\mathcal P_2(\mathbb R^d)$、$D=W_2$ の場合を Wasserstein 距離に関する曲線の長さとする。
<!-- formal-statement-end -->

<!-- definition-example-start: def-otr15-metric-length -->
**定義の確認**。$\gamma(t)=\delta_{2t}$ を $\mathcal P_2(\mathbb R)$ の曲線とします。各時刻の二次モーメントは $4t^2<\infty$ です。

Dirac 測度同士の結合は唯一なので、[p-Wasserstein距離](../OTR8/index.md#def-otr8-wasserstein)の定義から $W_2(\delta_{2s},\delta_{2t})=2|s-t|$ となります。従って任意の分割について

$$
\sum_i W_2(\gamma(t_{i-1}),\gamma(t_i))
=2\sum_i(t_i-t_{i-1})=2.
$$

上限も $2$ なので $L_{W_2}(\gamma)=2$。端点間の距離も $W_2(\delta_0,\delta_2)=2$ で、回り道をしていません。
<!-- definition-example-end -->

一般に [Wasserstein 距離の三角不等式](../OTR8/index.md#thm-otr8-metric)を分割へ繰り返し適用すると

$$
W_2(\gamma(0),\gamma(1))
\le\sum_i W_2(\gamma(t_{i-1}),\gamma(t_i))
\le L_{W_2}(\gamma).
$$

したがって曲線の長さが端点間距離に等しければ最短です。ただし、同じ最短経路でも途中で止まってから急ぐような時間付けでは、一定の速さになりません。以下では時間の付け方も固定します。

<a id="def-otr15-constant-geodesic"></a>

<!-- formal-statement-start -->
> **定義（定速測地線）**
> 距離空間 $(M,D)$ と点 $a,b\in M$ に対し、連続曲線 $\gamma:[0,1]\to M$ が $a$ から $b$ への定速測地線であるとは、$\gamma(0)=a$、$\gamma(1)=b$ かつ任意の $s,t\in[0,1]$ に対して

$$
D(\gamma(s),\gamma(t))=|s-t|D(a,b)
$$

> が成り立つことをいう。
<!-- formal-statement-end -->

<!-- definition-example-start: def-otr15-constant-geodesic -->
**定義の確認**。$\gamma(t)=\delta_{2t}$ では端点が $\delta_0,\delta_2$ であり、上で計算した式が任意の $s,t$ について成立するので定速測地線です。一方、$\eta(t)=\delta_{2t^2}$ は同じ幾何的な道を進みますが、

$$
W_2(\eta(0),\eta(1/2))=\tfrac12
\ne\tfrac12W_2(\eta(0),\eta(1))=1
$$

です。端点と経路の形だけでなく、時刻に対する距離の比例性が必要です。
<!-- definition-example-end -->

定速測地線の長さは、任意の分割で和が $D(a,b)\sum_i(t_i-t_{i-1})=D(a,b)$ となるため $D(a,b)$ です。よって確かに最短です。

## 2. 最適結合で「誰をどこへ運ぶか」を決める

たとえば質量の半分が $0$、半分が $2$ にあり、全質量を $1$ に集めたいとします。最初の原子を $0\to1$、次を $2\to1$ と動かすと、途中時刻 $t$ の分布は

$$
\mu_t=\tfrac12\delta_t+\tfrac12\delta_{2-t}
$$

となります。これは各原子を一定の速さで移したものであり、最初と最後の分布を単に確率的に混ぜたものではありません。この構成を一般化します。

まず、[結合測度](../OTR2/index.md#def-otr2-coupling) $\pi$ は、始点と終点の対応を確率的に指定します。Euclid 空間で対応した二点 $x,y$ を結ぶ線分の時刻 $t$ の位置は $(1-t)x+ty$ です。

最適結合は [Polish空間上の最適結合の存在](../OTR3/index.md#thm-otr3-polish)から得られます。実際、$\mathbb R^d$ は Polish 空間で、費用 $|x-y|^2$ は非負連続です。さらに

$$
|x-y|^2\le 2|x|^2+2|y|^2
$$

により、二次モーメントが有限なら積結合の費用も有限です。

線分上の位置を表す時刻 $t$ の写像を $e_t$、その位置の分布を $\mu_t$ と書きます。添字 $t$ は時刻を指定し、微分を表すものではありません。

[押し出し測度の定義](../../F0/F0-00P1/index.md#def-f0-00p1-pushforward)と [OTR1 の輸送写像](../OTR1/index.md#def-otr1-transport-map)で用いる $\#$ 記法では、任意の Borel 集合 $A\subseteq\mathbb R^d$ について

$$
((e_t)_{\#}\pi)(A)
=\pi\bigl(\{(x,y):e_t(x,y)\in A\}\bigr)
$$

です。これは元の結合の各組を線分上へ移し、移動後の領域に入った質量を数える操作です。

<a id="def-otr15-displacement-interpolation"></a>

<!-- formal-statement-start -->
> **定義（変位補間）**
> $d\ge1$、$\mu_0,\mu_1\in\mathcal P_2(\mathbb R^d)$ とし、$\pi\in\Pi(\mu_0,\mu_1)$ が二次費用 $|x-y|^2$ の最適結合であるとする。各 $t\in[0,1]$ に対し Borel 写像 $e_t:\mathbb R^d\times\mathbb R^d\to\mathbb R^d$ を

$$
e_t(x,y)=(1-t)x+ty
$$

> と置き、押し出し測度

$$
\mu_t=(e_t)_{\#}\pi
$$

> で定める曲線 $(\mu_t)_{0\le t\le1}$ を $\pi$ に沿う **変位補間（displacement interpolation）** という。ここで $\mathcal P_2$ と $\Pi$ はそれぞれ有限二次モーメントの確率測度全体と、指定された二つの周辺分布を持つ結合の集合である。
<!-- formal-statement-end -->

<!-- definition-example-start: def-otr15-displacement-interpolation -->
**定義の確認**。$\mu_0=\frac12\delta_0+\frac12\delta_2$、$\mu_1=\delta_1$ とします。第二周辺が $\delta_1$ なので唯一の結合は

$$
\pi=\tfrac12\delta_{(0,1)}+\tfrac12\delta_{(2,1)}.
$$

両周辺はそれぞれ指定した確率測度です。費用は $\frac12|0-1|^2+\frac12|2-1|^2=1$ で、ほかに結合がないため最適です。$e_t(0,1)=t$、$e_t(2,1)=2-t$ なので押し出しは上の $\mu_t$ となります。原子の重みは $1/2$ のまま、位置だけが動きます。さらに

$$
\int |z|^2\,d\mu_t(z)=\tfrac12t^2+\tfrac12(2-t)^2<\infty
$$

なので、確かにすべての時刻で $\mathcal P_2(\mathbb R)$ に属します。
<!-- definition-example-end -->

確率変数 $(X,Y)$ の分布を $\pi$ に取れば、$\mu_t$ は $(1-t)X+tY$ の分布でもあります。

## 3. 変位補間が定速測地線になることを証明する

前節の例では粒子の移動速度が一定でした。ただし、各粒子の直線移動から測度同士の最適性が自動で出るわけではありません。途中時刻の測度同士を別の方法で結び直せば、費用がさらに下がる可能性を排除する必要があります。

<a id="thm-otr15-displacement-geodesic"></a>

<!-- formal-statement-start -->
> **定理（最適結合から作るW2定速測地線）**
> $d\ge1$、$\mu_0,\mu_1\in\mathcal P_2(\mathbb R^d)$ とし、$\pi\in\Pi(\mu_0,\mu_1)$ を費用 $|x-y|^2$ の最適結合とする。$e_t(x,y)=(1-t)x+ty$、$\mu_t=(e_t)_{\#}\pi$ と置くと、すべての $t\in[0,1]$ で $\mu_t\in\mathcal P_2(\mathbb R^d)$ であり、任意の $s,t\in[0,1]$ に対し

$$
\boxed{W_2(\mu_s,\mu_t)=|s-t|\,W_2(\mu_0,\mu_1).}
$$

> 従って $(\mu_t)$ は $\mathcal P_2(\mathbb R^d)$ の $W_2$ 定速測地線で、Wasserstein 距離に関する長さは $W_2(\mu_0,\mu_1)$ に等しい。
<!-- formal-statement-end -->

### 証明の見取り図

最適結合の同じ $(x,y)$ を時刻 $s,t$ に送り、途中時刻間の**候補結合**を作ると、距離の上界が $|s-t|$ 倍で得られます。一方、[p-Wasserstein距離の距離公理](../OTR8/index.md#thm-otr8-metric)の三角不等式で両端を三つの区間へ分けると、上界がすべて等号でなければならないと分かります。候補結合を無条件に最適と呼ばないことが要点です。

<!-- proof-start -->
### 証明

$D=W_2(\mu_0,\mu_1)$ と書きます。まず $e_t$ は連続、従って Borel 可測であり、押し出し $\mu_t$ は確率測度です。二乗ノルムの凸性から、$0\le t\le1$ に対して

$$
|(1-t)x+ty|^2\le(1-t)|x|^2+t|y|^2.
$$

[押し出し積分公式](../../F0/F0-00P3D/index.md#thm-f0-00p3d-pushforward-integration)を $e_t$ に、次に [周辺分布の積分恒等式](../OTR2/index.md#prop-otr2-marginal-integration)を非負関数 $|x|^2,|y|^2$ に適用して、両辺を積分すると

$$
\int|z|^2\,d\mu_t(z)
\le(1-t)\int|x|^2\,d\mu_0(x)
+t\int|y|^2\,d\mu_1(y)<\infty.
$$

よって $\mu_t\in\mathcal P_2(\mathbb R^d)$ です。$e_0(x,y)=x$、$e_1(x,y)=y$ なので端点の分布も正しいです。

任意の $s,t\in[0,1]$ に対して $(e_s,e_t)_{\#}\pi$ は第一周辺 $\mu_s$、第二周辺 $\mu_t$ を持つ許容結合です。[p-Wasserstein距離](../OTR8/index.md#def-otr8-wasserstein)の定義と、$e_s-e_t=(s-t)(y-x)$ から

$$
\begin{aligned}
W_2^2(\mu_s,\mu_t)
&\le\int|e_s(x,y)-e_t(x,y)|^2\,d\pi\\
&=(s-t)^2\int|x-y|^2\,d\pi\\
&=(s-t)^2D^2.
\end{aligned}
$$

最後の等号だけに $\pi$ の最適性を使いました。したがって

$$
W_2(\mu_s,\mu_t)\le|s-t|D.
$$

今 $0\le s\le t\le1$ とします。[距離の三角不等式](../OTR8/index.md#thm-otr8-metric)を三つの区間へ適用し、直前の上界を各区間で使うと

$$
\begin{aligned}
D
&\le W_2(\mu_0,\mu_s)+W_2(\mu_s,\mu_t)
  +W_2(\mu_t,\mu_1)\\
&\le sD+W_2(\mu_s,\mu_t)+(1-t)D\\
&\le sD+(t-s)D+(1-t)D=D.
\end{aligned}
$$

両端が等しいためすべて等号です。特に $0\le s\le t\le1$ で

$$
W_2(\mu_s,\mu_t)=(t-s)D
$$

となります。$s>t$ の場合も距離の対称性で同じ式が成り立ちます。

さらに任意の固定した時刻 $s$ について

$$
\lim_{t\to s}W_2(\mu_s,\mu_t)
=\lim_{t\to s}|s-t|D=0
$$

なので、$t\mapsto\mu_t$ は $W_2$ 距離について連続です。従って [定速測地線の定義](#def-otr15-constant-geodesic)を満たします。

任意の分割で長さの和は $D\sum_i(t_i-t_{i-1})=D$ です。[距離空間の曲線の長さ](#def-otr15-metric-length)の定義から $L_{W_2}(\mu_\cdot)=D$ となります。$\square$
<!-- proof-end -->

この証明は、途中時刻の結合が**新たに最適だと仮定していない**点で重要です。端点の最適性と三角不等式が、途中区間でも等号を強制しています。なお、Euclid 空間の線分を使っているため、任意の基礎距離空間で同じ構成ができるとは限りません。

## 4. 最適写像があるときと Gaussian の場合

最適結合が [Brenierの最適写像定理](../OTR13/index.md#thm-otr13-brenier)による最適写像 $T$ のグラフなら、$\pi=(\mathrm{id},T)_{\#}\mu_0$ です。この結合を [変位補間の定義](#def-otr15-displacement-interpolation)へ代入すると

$$
\mu_t=(T_t)_{\#}\mu_0,\qquad
T_t(x)=(1-t)x+tT(x).
$$

各粒子を $x$ から $T(x)$ まで直線上で動かしています。$\mu_0$ の Lebesgue 絶対連続性があれば [Brenierの最適写像定理](../OTR13/index.md#thm-otr13-brenier)が最適結合の一意性も保証しますが、その仮定なしに最適写像が存在するとは言えません。

Gaussian の場合、[前章の正定値輸送行列の補題](../OTR14/index.md#lem-otr14-positive-transport-matrix)は、中心化したベクトル $x-m_0$ に作用する対称正定値行列 $M$ を構成します。この行列は出発共分散 $A$ を到着共分散 $B$ へ移す条件 $MAM=B$ を満たします。

従って最適写像 $T(x)=m_1+M(x-m_0)$ を $T_t$ に代入すると、平均の移動と中心化部分の変形は

$$
T_t(x)=(1-t)m_0+tm_1+M_t(x-m_0),
\qquad M_t=(1-t)I_d+tM
$$

と分離できます。ここで $I_d$ は $d$ 次単位行列で、$M_t$ は時刻 $t$ の**中心化部分への線形作用**を表し、時間微分ではありません。この行列が共分散の変化を決めます。

<a id="prop-otr15-gaussian-geodesic"></a>

<!-- formal-statement-start -->
> **命題（非退化Gaussian間の変位補間）**
> $d\ge1$、$m_0,m_1\in\mathbb R^d$、実対称正定値行列 $A,B\in\mathbb R^{d\times d}$ を取り、$\mu_0=\mathcal N_d(m_0,A)$、$\mu_1=\mathcal N_d(m_1,B)$ とする。対称正定値行列

$$
M=A^{-1/2}(A^{1/2}BA^{1/2})^{1/2}A^{-1/2}
$$

> および $M_t=(1-t)I_d+tM$ を置く。このとき唯一の最適結合に沿う変位補間は

$$
\boxed{\mu_t=\mathcal N_d\!\left((1-t)m_0+tm_1,\ M_tAM_t\right)}
$$

> であり、$0\le t\le1$ の各時刻で共分散行列 $M_tAM_t$ は正定値である。
<!-- formal-statement-end -->

### 証明の見取り図

前章の最適写像は平均を平行移動し、中心化した部分に $M$ を作用させます。$T_t$ を展開すれば、平均と中心化部分が分離します。共分散は一般に $(1-t)A+tB$ ではなく、$M_tAM_t$ です。

<!-- proof-start -->
### 証明

[OTR14 の非退化Gaussian最適写像](../OTR14/index.md#thm-otr14-gaussian-w2-spd)は $T(x)=m_1+M(x-m_0)$ です。$\mu_0$ の確率ベクトルを $X=m_0+A^{1/2}Z$（$Z$ は独立標準正規成分）と書けば、

$$
\begin{aligned}
T_t(X)
&=(1-t)X+t\{m_1+M(X-m_0)\}\\
&=(1-t)m_0+tm_1+\{(1-t)I_d+tM\}(X-m_0)\\
&=(1-t)m_0+tm_1+M_tA^{1/2}Z.
\end{aligned}
$$

[Gaussian の線形像の規則](../OTR14/index.md#def-otr14-gaussian-law)により、平均は $(1-t)m_0+tm_1$、共分散は

$$
(M_tA^{1/2})(M_tA^{1/2})^{\mathsf T}=M_tAM_t
$$

です。$M$ のすべての固有値 $\lambda$ は正なので、$M_t$ の固有値は $(1-t)+t\lambda>0$ です。ゆえに $M_t$ は可逆です。任意の $v\ne0$ に対し

$$
v^{\mathsf T}M_tAM_tv=(M_tv)^{\mathsf T}A(M_tv)>0
$$

だから、共分散は正定値です。[Brenierの最適写像定理](../OTR13/index.md#thm-otr13-brenier)は出発 Gaussian の絶対連続性から最適結合の一意性も保証します。$\square$
<!-- proof-end -->

### 直接例：平均と標準偏差は直線的に動く

$\mu_0=\mathcal N_1(0,1)$、$\mu_1=\mathcal N_1(2,9)$ とします。正定値な一次元共分散 $A=1,B=9$ から $M=3$、最適写像は $T(x)=2+3x$ です。[前命題](#prop-otr15-gaussian-geodesic)より

$$
\mu_t=\mathcal N_1\bigl(2t,(1+2t)^2\bigr).
$$

たとえば中点は $\mu_{1/2}=\mathcal N_1(1,4)$ です。[Gaussian 間の距離公式](../OTR14/index.md#thm-otr14-gaussian-w2-spd)をこの例の任意の $s,t$ に適用すると

$$
\begin{aligned}
W_2^2(\mu_s,\mu_t)
&=(2s-2t)^2+\bigl((1+2s)-(1+2t)\bigr)^2\\
&=8(s-t)^2.
\end{aligned}
$$

従って $W_2(\mu_s,\mu_t)=2\sqrt2\,|s-t|$ であり、一般定理と一致します。

## 5. 分布を混ぜることと、質量を動かすこと

二つの確率測度を混ぜる操作は、時刻 $t$ に $\mu_0$ から確率 $1-t$、$\mu_1$ から確率 $t$ で標本を抽出することに対応します。これは粒子の位置の補間ではなく、元の二つの分布を選ぶ割合の補間です。

<a id="def-otr15-linear-mixture"></a>

<!-- formal-statement-start -->
> **定義（確率測度の線形混合）**
> $d\ge1$、$\mu_0,\mu_1\in\mathcal P_2(\mathbb R^d)$、$0\le t\le1$ とする。各 Borel 集合 $A\subset\mathbb R^d$ に対して $\bar\mu_t(A)=(1-t)\mu_0(A)+t\mu_1(A)$ で定める確率測度 $\bar\mu_t$ を、二つの確率測度の線形混合という。記号では

$$
\bar\mu_t=(1-t)\mu_0+t\mu_1
$$

> と書く。
<!-- formal-statement-end -->

<!-- definition-example-start: def-otr15-linear-mixture -->
**定義の確認**。$\mu_0=\delta_{-1}$、$\mu_1=\delta_1$、$t=1/2$ とします。任意の Borel 集合 $A$ について

$$
\bar\mu_{1/2}(A)=
\tfrac12\boldsymbol{1}_{\{-1\in A\}}+
\tfrac12\boldsymbol{1}_{\{1\in A\}},
$$

なので $\bar\mu_{1/2}=\frac12\delta_{-1}+\frac12\delta_1$ です。各原子の質量は非負で合計 $1$、二次モーメントは $\frac12\cdot1+\frac12\cdot1=1<\infty$ なので $\mathcal P_2$ に属します。$t=0,1$ ではそれぞれ元の分布を返します。
<!-- definition-example-end -->

[変位補間](#def-otr15-displacement-interpolation)では各粒子の位置を補間しますが、線形混合では両端に質量を残しながら比率を変えます。両者は一般に異なります。

### Dirac 測度で距離の違いを確認する

$\mu_0=\delta_{-1}$、$\mu_1=\delta_1$ とします。最適結合は $\delta_{(-1,1)}$ のみなので、変位補間は $\mu_t=\delta_{-1+2t}$。端点からの距離は

$$
W_2(\delta_{-1},\mu_t)=2t.
$$

一方、線形混合は $\bar\mu_t=(1-t)\delta_{-1}+t\delta_1$ です。第一周辺を $\delta_{-1}$ に固定した結合は唯一で、費用は

$$
W_2^2(\delta_{-1},\bar\mu_t)
=(1-t)|{-1}-({-1})|^2+t|{-1}-1|^2=4t.
$$

従って $W_2(\delta_{-1},\bar\mu_t)=2\sqrt t$ で、$0<t<1$ では $2\sqrt t>2t$。線形混合は端点を結びますが、定速測地線ではありません。特に中点の分布は $\delta_0$ と $\frac12\delta_{-1}+\frac12\delta_1$ で異なります。

Gaussian でも第4節の例で、線形混合 $\frac12\mathcal N_1(0,1)+\frac12\mathcal N_1(2,9)$ の平均は $1$ ですが、分散は

$$
\tfrac12\{1+(0-1)^2\}+\tfrac12\{9+(2-1)^2\}=6
$$

です。変位補間の中点の分散 $4$ と異なり、混合分布自体も一般には Gaussian ではありません。

### 最適結合が複数なら最短経路も複数になりうる

次の二次元の四点を考えます。

$$
a=(-1,0),\quad b=(1,0),\quad
c=(0,-1),\quad d=(0,1)
$$

そして $\mu_0=\frac12(\delta_a+\delta_b)$、$\mu_1=\frac12(\delta_c+\delta_d)$ とします。どの始点・終点の組も二乗距離は $2$ なので、**すべての許容結合が費用 $2$ の最適結合**です。例えば

$$
\pi^\downarrow=\tfrac12\delta_{(a,c)}+\tfrac12\delta_{(b,d)},
\qquad
\pi^\uparrow=\tfrac12\delta_{(a,d)}+\tfrac12\delta_{(b,c)}
$$

の二つを取ると、時刻 $1/2$ の分布はそれぞれ

$$
\mu_{1/2}^\downarrow
=\tfrac12\delta_{(-1/2,-1/2)}+\tfrac12\delta_{(1/2,1/2)},
$$

$$
\mu_{1/2}^\uparrow
=\tfrac12\delta_{(-1/2,1/2)}+\tfrac12\delta_{(1/2,-1/2)}
$$

です。両者は異なりますが、[最適結合から作るW2定速測地線](#thm-otr15-displacement-geodesic)によりどちらも長さ $\sqrt2$ の最短経路です。この空間の定速最短経路が常に一意とは限らないことが、図なしでも座標から確かめられます。

## 6. 最短経路の中点はどんな形でなければならないか

変位補間が最短になることの逆方向も考えます。ある中間測度が端点からちょうど $t:(1-t)$ の距離にあれば、質量の移動に何か制約が生まれるでしょうか。Euclid 空間では、距離の等号条件が直線上の位置を強制します。

<a id="prop-otr15-intermediate-rigidity"></a>

<!-- formal-statement-start -->
> **命題（測地線上の中間測度の直線表示）**
> $d\ge1$、$\mu_0,\mu_1,\sigma\in\mathcal P_2(\mathbb R^d)$、$0<t<1$ とし、$D=W_2(\mu_0,\mu_1)$ に対して

$$
W_2(\mu_0,\sigma)=tD,\qquad
W_2(\sigma,\mu_1)=(1-t)D
$$

> を仮定する。このとき二次費用についての最適結合 $\pi\in\Pi(\mu_0,\mu_1)$ が存在し、

$$
\sigma=((1-t)x+ty)_{\#}\pi
$$

> と表せる。特に、$\mathcal P_2(\mathbb R^d)$ の $W_2$ 距離に関する任意の定速測地線の時刻 $t$ の中間測度は、ある端点最適結合の変位補間で得られる。
<!-- formal-statement-end -->

### 証明の見取り図

まず $\mu_0$ と $\sigma$、$\sigma$ と $\mu_1$ の最適結合を [結合の貼り合わせ補題](../OTR8/index.md#lem-otr8-gluing)で三点 $(x,z,y)$ の同時分布にします。二乗距離の重み付き不等式には等号条件があり、ここで端点の最適費用と一致するため、中間点 $z$ は線分上の時刻 $t$ の位置に限られます。

<!-- proof-start -->
### 証明

[Polish空間上の最適結合の存在](../OTR3/index.md#thm-otr3-polish)により、$\mu_0,\sigma$ の最適結合と $\sigma,\mu_1$ の最適結合が存在します。[結合の貼り合わせ補題](../OTR8/index.md#lem-otr8-gluing)により、$\mathbb R^{3d}$ 上の確率測度 $\eta$ を取り、$(x,z)$ 周辺と $(z,y)$ 周辺をこの二つの結合に一致させます。

任意のベクトル $u,v$ と $0<t<1$ について、平方を展開すると

$$
\begin{aligned}
\frac{|u|^2}{t}+\frac{|v|^2}{1-t}-|u+v|^2
&=\frac{1-t}{t}|u|^2+\frac{t}{1-t}|v|^2-2u\cdot v\\
&=\left|\sqrt{\frac{1-t}{t}}u-\sqrt{\frac{t}{1-t}}v\right|^2\ge0.
\end{aligned}
$$

ここで $u=z-x$、$v=y-z$ と置けば

$$
|x-y|^2\le\frac{|x-z|^2}{t}+\frac{|z-y|^2}{1-t}.
$$

$(x,y)$ 周辺は $\mu_0,\mu_1$ の許容結合です。よって直前の不等式を [p-Wasserstein距離](../OTR8/index.md#def-otr8-wasserstein)の定義と仮定を用いて積分すると

$$
\begin{aligned}
D^2
&\le\int|x-y|^2\,d\eta\\
&\le\frac1t\int|x-z|^2\,d\eta
  +\frac1{1-t}\int|z-y|^2\,d\eta\\
&=\frac{(tD)^2}{t}+\frac{((1-t)D)^2}{1-t}
=D^2.
\end{aligned}
$$

従って $(x,y)$ 周辺 $\pi$ は最適です。また上記の二乗距離不等式の非負な差の積分が $0$ なので、差は $\eta$-ほとんど至る所で $0$ です。平方の等号条件から

$$
\sqrt{\frac{1-t}{t}}(z-x)
=\sqrt{\frac{t}{1-t}}(y-z),
$$

すなわち $(1-t)(z-x)=t(y-z)$、従って $z=(1-t)x+ty$ が $\eta$-ほとんど至る所で成立します。$\eta$ の $z$ 周辺は $\sigma$ だから、$\sigma=(e_t)_{\#}\pi$ です。$D=0$ の場合も各積分が $0$ となり同じ結論が成立します。$\square$
<!-- proof-end -->

この命題は「各時刻の中間測度に、それを作る端点最適結合がある」と述べています。時刻ごとに得られる結合が同じであることまで、この証明だけで主張しているわけではありません。全時刻を一つの結合で表す一般定理には、さらに整合性の議論が必要です。

## 7. 演習：長さ・最適結合・補間を自分で確かめる

### OTR15-A01 Dirac 測度の最短経路
- Level: A

$a,b\in\mathbb R^d$ とし、$\gamma_t=\delta_{(1-t)a+tb}$（$0\le t\le1$）とする。$\gamma_t\in\mathcal P_2$、$W_2(\gamma_s,\gamma_t)$、曲線の長さを求め、定速測地線であることを確かめよ。

<!-- solution-start -->
### 詳細解答

各 $\gamma_t$ は一つの点 $z_t=(1-t)a+tb$ に質量 $1$ を置いた確率測度で、二次モーメントは $|z_t|^2<\infty$ です。二つの Dirac 測度の許容結合は $\delta_{(z_s,z_t)}$ だけなので、[p-Wasserstein距離](../OTR8/index.md#def-otr8-wasserstein)の定義から

$$
W_2^2(\gamma_s,\gamma_t)=|z_s-z_t|^2
=|(s-t)(b-a)|^2=(s-t)^2|b-a|^2.
$$

端点距離は $|b-a|$。分割の長さの和は

$$
\sum_i|t_i-t_{i-1}|\,|b-a|=|b-a|
$$

で分割によらないので、[距離空間の曲線の長さ](#def-otr15-metric-length)の定義から長さも $|b-a|$。任意の二時刻の距離が時刻差と端点距離の積だから [定速測地線の定義](#def-otr15-constant-geodesic)を満たします。
<!-- solution-end -->

### OTR15-A02 補間後の二次モーメント
- Level: A

$\mu_0,\mu_1\in\mathcal P_2(\mathbb R^d)$ の任意の結合 $\pi$（最適性は仮定しない）から $e_t(x,y)=(1-t)x+ty$ の押し出し $\rho_t$ を作る。$0\le t\le1$ に対し、$\rho_t$ が確率測度で有限二次モーメントを持つことを証明せよ。

<!-- solution-start -->
### 詳細解答

$e_t$ は連続で Borel 可測、$\pi$ は確率測度なので押し出し $\rho_t$ も確率測度です。二乗ノルムを展開すると

$$
|(1-t)x+ty|^2
=(1-t)|x|^2+t|y|^2-t(1-t)|x-y|^2
\le(1-t)|x|^2+t|y|^2.
$$

[押し出し積分公式](../../F0/F0-00P3D/index.md#thm-f0-00p3d-pushforward-integration)と [周辺分布の積分恒等式](../OTR2/index.md#prop-otr2-marginal-integration)を $|x|^2,|y|^2$ に適用して積分すると

$$
\int|z|^2\,d\rho_t(z)
\le(1-t)\int|x|^2\,d\mu_0(x)
+t\int|y|^2\,d\mu_1(y)<\infty.
$$

両端の積分は $\mathcal P_2$ の仮定で有限です。この結論に $\pi$ の最適性は不要で、最適性が必要なのは途中経路の定速性を証明するときです。
<!-- solution-end -->

### OTR15-A03 線形混合の速度
- Level: A

$\mu_0=\delta_0$、$\mu_1=\delta_4$ とし、線形混合 $\bar\mu_t=(1-t)\delta_0+t\delta_4$ を考える。$W_2(\mu_0,\bar\mu_t)$ と $W_2(\bar\mu_t,\mu_1)$ を計算し、$t=1/4$ で定速測地線の条件を満たさないことを示せ。

<!-- solution-start -->
### 詳細解答

第一周辺が $\delta_0$ の結合は唯一で、第二周辺の $0,4$ へそれぞれ質量 $1-t,t$ を送ります。従って

$$
W_2^2(\delta_0,\bar\mu_t)=(1-t)\,0^2+t\,4^2=16t.
$$

同様に終点 $\delta_4$ を第二周辺に固定すると、$0$ から $4$ へ質量 $1-t$ を送るため

$$
W_2^2(\bar\mu_t,\delta_4)=16(1-t).
$$

よって距離は順に $4\sqrt t,4\sqrt{1-t}$。端点距離は $4$ なので、$t=1/4$ における定速条件は始点距離 $1$ を要求しますが、実際は $2$ です。従って定速測地線ではありません。
<!-- solution-end -->

### OTR15-A04 二点を一つの点へ集める
- Level: A

$\mu_0=\frac13\delta_{-2}+\frac23\delta_1$、$\mu_1=\delta_0$ とする。最適結合を記し、変位補間 $\mu_t$ と $W_2(\mu_0,\mu_1)$ を求めよ。特に中点の分布とその二次モーメントを求めよ。

<!-- solution-start -->
### 詳細解答

到着測度は $\delta_0$ なので、結合は唯一で

$$
\pi=\tfrac13\delta_{(-2,0)}+\tfrac23\delta_{(1,0)}.
$$

従って最適で、費用は $\frac13\cdot4+\frac23\cdot1=2$、距離は $\sqrt2$ です。$e_t(-2,0)=-2(1-t)$、$e_t(1,0)=1-t$ だから

$$
\mu_t=\tfrac13\delta_{-2(1-t)}+\tfrac23\delta_{1-t}.
$$

$t=1/2$ では $\mu_{1/2}=\frac13\delta_{-1}+\frac23\delta_{1/2}$、二次モーメントは

$$
\tfrac13(-1)^2+\tfrac23(1/2)^2=\tfrac13+\tfrac16=\tfrac12.
$$

[最適結合から作るW2定速測地線](#thm-otr15-displacement-geodesic)から始点からの中点距離は $\sqrt2/2$ で、その二乗が $\frac12$ になることも、到着点が $0$ なので直接確認できます。
<!-- solution-end -->

### OTR15-A05 一次元 Gaussian の中点
- Level: A

$\mu_0=\mathcal N_1(-1,4)$、$\mu_1=\mathcal N_1(3,16)$ とする。最適写像 $T$、変位補間 $\mu_t$、中点 $\mu_{1/2}$ と端点距離 $W_2(\mu_0,\mu_1)$ を求めよ。

<!-- solution-start -->
### 詳細解答

標準偏差は $2,4$ なので、[非退化Gaussian分布間の最適写像とWasserstein距離](../OTR14/index.md#thm-otr14-gaussian-w2-spd)で $M=\sqrt{16/4}=2$。平均 $\!-1$ の周りの中心化を使い

$$
T(x)=3+2(x+1)=2x+5.
$$

従って $T_t(x)=(1-t)x+t(2x+5)=(1+t)x+5t$ です。$X\sim\mathcal N_1(-1,4)$ に適用すると

$$
\mathbb E[T_t(X)]=(1+t)(-1)+5t=-1+4t,
\quad
\operatorname{Var}(T_t(X))=4(1+t)^2.
$$

ゆえに $\mu_t=\mathcal N_1(-1+4t,4(1+t)^2)$、中点は $\mathcal N_1(1,9)$。端点距離の二乗は平均差の二乗と標準偏差差の二乗の和で

$$
W_2^2(\mu_0,\mu_1)=(3-(-1))^2+(4-2)^2=16+4=20,
$$

従って距離は $2\sqrt5$ です。
<!-- solution-end -->

### OTR15-B01 途中結合の最適性を回復する
- Level: B

$\mu_0,\mu_1\in\mathcal P_2(\mathbb R^d)$、その最適結合 $\pi$、$\mu_t=(e_t)_{\#}\pi$ が与えられたとする。任意の $0\le s<t\le1$ について、$(e_s,e_t)_{\#}\pi$ が $\mu_s$ と $\mu_t$ の**最適結合**であることを、最初から証明せよ。

<!-- solution-start -->
### 詳細解答

$(e_s,e_t)_{\#}\pi$ は押し出しの周辺の性質で許容結合です。$D^2=\int|x-y|^2\,d\pi=W_2^2(\mu_0,\mu_1)$ とすると費用は

$$
\int|e_s-e_t|^2\,d\pi=(t-s)^2D^2.
$$

従って $W_2(\mu_s,\mu_t)\le(t-s)D$。[Wasserstein 距離の三角不等式](../OTR8/index.md#thm-otr8-metric)と同じ候補結合で得る $W_2(\mu_0,\mu_s)\le sD$、$W_2(\mu_t,\mu_1)\le(1-t)D$ を合わせると

$$
D\le sD+W_2(\mu_s,\mu_t)+(1-t)D,
$$

従って $W_2(\mu_s,\mu_t)\ge(t-s)D$ です。上下界が一致し、候補結合の費用が距離の二乗に等しいので、候補結合は最適です。$D=0$ の場合も費用は $0$ であり結論は同じです。
<!-- solution-end -->

### OTR15-B02 最短経路が一意でない四点配置
- Level: B

$a=(-1,0)$、$b=(1,0)$、$c=(0,-1)$、$d=(0,1)$ とし、$\mu_0=\frac12(\delta_a+\delta_b)$、$\mu_1=\frac12(\delta_c+\delta_d)$ とする。$(a,c),(b,d)$ を組にする結合と、$(a,d),(b,c)$ を組にする結合の費用を計算し、二つの中点測度を求めよ。また二つの中点間の $W_2$ 距離を求めよ。

<!-- solution-start -->
### 詳細解答

$|a-c|^2=|a-d|^2=|b-c|^2=|b-d|^2=2$ です。よって任意の許容結合の費用は質量の総和が $1$ であることから $2$。指定された二つの結合はどちらも最適で、端点距離は $\sqrt2$ です。

最初の結合の中点は $p=(-1/2,-1/2)$、$q=(1/2,1/2)$ に半分ずつあります。次の結合の中点は $r=(-1/2,1/2)$、$s=(1/2,-1/2)$ に半分ずつあります。四組の二乗距離を計算すると

$$
|p-r|^2=|p-s|^2=|q-r|^2=|q-s|^2=1.
$$

よって中点間の任意の結合の費用が $1$ で、距離も $W_2=1$ です。二つの中点は異なりますが、どちらも [最適結合から作るW2定速測地線](#thm-otr15-displacement-geodesic)の結論を満たします。
<!-- solution-end -->

### OTR15-B03 中点条件から直線性を導く
- Level: B

$\mu_0,\mu_1,\sigma\in\mathcal P_2(\mathbb R^d)$、$D=W_2(\mu_0,\mu_1)$ とし、$W_2(\mu_0,\sigma)=W_2(\sigma,\mu_1)=D/2$ とする。端点を $X,Y$、中間点を $Z$ とする三点の同時分布を使い、$Z=(X+Y)/2$ がほとんど確実に成り立つような端点最適結合を構成せよ。必要な等号条件を示せ。

<!-- solution-start -->
### 詳細解答

各区間の最適結合は [Polish空間上の最適結合の存在](../OTR3/index.md#thm-otr3-polish)により存在します。中間周辺 $\sigma$ を共有するので [結合の貼り合わせ補題](../OTR8/index.md#lem-otr8-gluing)で三点 $(X,Z,Y)$ の同時分布を作れます。ベクトル $u=Z-X$、$v=Y-Z$ に対する恒等式は

$$
2|u|^2+2|v|^2-|u+v|^2=|u-v|^2\ge0.
$$

[p-Wasserstein距離](../OTR8/index.md#def-otr8-wasserstein)の定義から任意の端点結合の費用は $D^2$ 以上です。これと二つの最適費用を用いて積分すると

$$
D^2\le\mathbb E|X-Y|^2
\le2\mathbb E|X-Z|^2+2\mathbb E|Z-Y|^2
=2(D/2)^2+2(D/2)^2=D^2.
$$

よってすべて等号で、$\mathbb E|u-v|^2=0$ だから $u=v$ がほとんど確実に成立します。従って $Z-X=Y-Z$、すなわち $Z=(X+Y)/2$。$(X,Y)$ の分布は費用 $D^2$ を実現する端点最適結合であり、その中点の押し出しが $\sigma$ です。
<!-- solution-end -->

### OTR15-B04 Gaussian の共分散は線形に混ざらない
- Level: B

$d=2$、$\mu_0=\mathcal N_2(0,I_2)$、$\mu_1=\mathcal N_2(0,\operatorname{diag}(4,9))$ とする。変位補間の時刻 $t$ の共分散を求め、$t=1/2$ における $(1-t)I_2+t\operatorname{diag}(4,9)$ との違いを計算し、どの量が線形補間されるか説明せよ。

<!-- solution-start -->
### 詳細解答

[非退化Gaussian分布間の最適写像とWasserstein距離](../OTR14/index.md#thm-otr14-gaussian-w2-spd)から $A=I_2$、$B=\operatorname{diag}(4,9)$ に対して $M=B^{1/2}=\operatorname{diag}(2,3)$ です。[非退化Gaussian間の変位補間](#prop-otr15-gaussian-geodesic)を適用すると

$$
M_t=(1-t)I_2+tM=\operatorname{diag}(1+t,1+2t)
$$

なので、共分散は

$$
M_tI_2M_t=\operatorname{diag}((1+t)^2,(1+2t)^2).
$$

$t=1/2$ では $\operatorname{diag}(9/4,4)$。一方、共分散行列の単なる線形補間は $\operatorname{diag}(5/2,5)$ で違います。ここで直線的に変わるのは $M_t$、すなわちこの同時対角化可能な例では**標準偏差** $1+t$ と $1+2t$ です。共分散は標準偏差を二乗した量であるため、線形になりません。
<!-- solution-end -->

### OTR15-C01 結合の自由度と最短経路の分岐
- Level: C

$a=(-1,0)$、$b=(1,0)$、$c=(0,-1)$、$d=(0,1)$、$\mu_0=\frac12(\delta_a+\delta_b)$、$\mu_1=\frac12(\delta_c+\delta_d)$ とする。$0\le\lambda\le1/2$ に対し、結合 $\pi_\lambda$ の質量を $(a,c)$ と $(b,d)$ にそれぞれ $\lambda$、$(a,d)$ と $(b,c)$ にそれぞれ $1/2-\lambda$ と割り当てる。

1. すべての $\lambda$ について両周辺が正しく、$\pi_\lambda$ が最適であることを示せ。
2. $\pi_\lambda$ による中点分布を求め、$\lambda=0$ と $\lambda=1/2$ が異なる定速測地線を与えることを証明せよ。
3. 線形混合 $\bar\mu_t=(1-t)\mu_0+t\mu_1$ について、$t=1/2$ における $W_2(\mu_0,\bar\mu_{1/2})$ を求め、定速測地線の中点と比較せよ。

<!-- solution-start -->
### 詳細解答

**(1) 周辺と最適性。** $a$ から出る質量は $\lambda+(1/2-\lambda)=1/2$、$b$ からも同様に $1/2$ です。

$c$ に入る質量は $(a,c)$ からの $\lambda$ と $(b,c)$ からの $1/2-\lambda$ の和で $1/2$。$d$ についても $1/2$ です。$0\le\lambda\le1/2$ なので各質量は非負、総質量は $1$。従って $\pi_\lambda\in\Pi(\mu_0,\mu_1)$ です。すべての組の二乗距離は $2$ であるため

$$
\int|x-y|^2\,d\pi_\lambda
=2\{2\lambda+2(1/2-\lambda)\}=2.
$$

任意の許容結合も同じ四組にだけ質量を置き、その総和は $1$ なので費用は必ず $2$。よって $\pi_\lambda$ はすべて最適、$W_2(\mu_0,\mu_1)=\sqrt2$ です。

**(2) 中点と異なる最短経路。** 各組 $(x,y)$ を $(x+y)/2$ へ送るので

$$
\begin{aligned}
\mu_{1/2}^\lambda
={}&\lambda\,\delta_{(-1/2,-1/2)}
+(1/2-\lambda)\,\delta_{(-1/2,1/2)}\\
&+(1/2-\lambda)\,\delta_{(1/2,-1/2)}
+\lambda\,\delta_{(1/2,1/2)}.
\end{aligned}
$$

$\lambda=0$ なら支持は反対角線の二点、$\lambda=1/2$ なら主対角線の二点です。例えば $(-1/2,-1/2)$ の質量は前者 $0$、後者 $1/2$ なので測度が異なります。どちらも [最適結合から作るW2定速測地線](#thm-otr15-displacement-geodesic)の結論を満たし、中点の位置が違うため曲線も異なります。

**(3) 線形混合。** $\bar\mu_{1/2}$ は四点 $a,b,c,d$ にそれぞれ質量 $1/4$ を置きます。

$\mu_0$ からこれへ送る際、到着点 $c,d$ は計 $1/2$ の質量を要求し、そこへの二乗距離はどの始点からも $2$ です。従って費用は少なくとも $2\cdot(1/2)=1$。

具体的には $(a,a),(b,b),(a,c),(b,d)$ に各 $1/4$ の質量を置く結合を取れます。始点 $a,b$ から各 $1/2$ が出て、到着点 $a,b,c,d$ に各 $1/4$ が入るため両周辺は正しく、費用は $0+0+2/4+2/4=1$ です。ゆえに

$$
W_2(\mu_0,\bar\mu_{1/2})=1.
$$

一方どの変位補間の中点も [最適結合から作るW2定速測地線](#thm-otr15-displacement-geodesic)から始点距離は $\sqrt2/2$。$1>\sqrt2/2$ なので、線形混合は定速測地線の中点ではありません。$\square$
<!-- solution-end -->

## 8. まとめと次への接続

- $W_2$ 空間の曲線の長さを距離の分割和の上限で測ると、端点距離より短い経路はありません。
- Euclid 空間で二次費用の最適結合 $\pi$ を取り、$(x,y)$ を $(1-t)x+ty$ へ送ると、任意の二時刻で $W_2(\mu_s,\mu_t)=|s-t|W_2(\mu_0,\mu_1)$ となります。これは端点最適性と三角不等式から証明できます。
- 変位補間は粒子の位置を動かします。測度の線形混合は重みを変えるもので、一般には定速測地線ではありません。
- 最適結合が複数あれば定速最短経路も複数になりえます。逆に、最短経路の中間測度は何らかの端点最適結合の直線補間で表されます。

次の OTR16 では、普通の線形混合に沿う凸性と、ここで構成した定速最短経路に沿う凸性がどう異なるかを考えます。位置によるエネルギーや密度に依存する量の変化を調べる入口が、ここで得た変位補間です。
