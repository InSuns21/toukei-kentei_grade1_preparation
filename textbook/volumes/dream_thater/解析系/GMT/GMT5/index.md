# GMT5 平面Marstrand射影定理：次元

<!-- definition-example-audit: strict -->

平面上の集合を直線へ影として落とすと、二点が同じ位置へ重なり、次元が小さくなることがあります。例えば線分をその垂線方向へ射影すると一点です。では、方向を無作為に選んだときも次元は失われるのでしょうか。

[MT8のHausdorff次元](../../MT/MT8/index.md#def-mt8-hausdorff-dimension)と[GMT3のRiesz energy](../GMT3/index.md#def-gmt3-riesz-energy)を使うと、**射影後の二点が重なる費用を方向全体で平均する**という方法で答えられます。GMT4で学んだ[Fourier表示](../GMT4/index.md#thm-gmt4-fourier-energy)も、同じ平均を周波数側から説明します。

本章で完全に証明する集合クラスは、まず非空コンパクト集合、次に可算個のコンパクト集合の和です。一般のBorel集合についても古典的なMarstrand定理は成立しますが、コンパクト部分集合による次元近似には追加の集合論的・測度論的定理が必要です。証明した範囲と区別します。

## 1. 射影を座標で定義する

角度 $\theta\in[0,\pi)$ の単位ベクトルを $e_\theta=(\cos\theta,\sin\theta)$ とします。原点を通り $e_\theta$ が向く直線への直交射影は、点 $x=(x_1,x_2)$ の $e_\theta$ 方向成分です。射影先の直線をその座標 $u\in\mathbb R$ と同一視し、$\pi_\theta(x)=x\cdot e_\theta$ と表します。角度を $\pi$ だけ変えると値の符号が変わるだけなので、方向は $[0,\pi)$ で一度ずつ数えます。

<a id="def-gmt5-orthogonal-projection"></a>

<!-- formal-statement-start -->
> **定義（平面の直交射影と射影測度）**  
> $\theta\in[0,\pi)$、$e_\theta=(\cos\theta,\sin\theta)$ とする。直交射影の実数座標表示を

$$
\pi_\theta:\mathbb R^2\to\mathbb R,
\qquad \pi_\theta(x)=x\cdot e_\theta
$$

> と定義する。$\mu$ が $\mathbb R^2$ 上の有限非負Borel測度なら、射影測度 $\nu_\theta=(\pi_\theta)_\#\mu$ を、全てのBorel集合 $A\subset\mathbb R$ に対して

$$
\nu_\theta(A)=\mu(\pi_\theta^{-1}(A))
$$

> で定める。「ほとんど全ての方向」とは、方向空間 $[0,\pi)$ の正規化Lebesgue測度 $d\theta/\pi$ に関する零集合を除くことをいう。
<!-- formal-statement-end -->

<!-- definition-example-start: def-gmt5-orthogonal-projection -->
**定義の確認**

線分の影と質量の移動を調べます。

水平線分 $L=\{(u,0):0\le u\le1\}$ では

$$
\pi_\theta(u,0)=u\cos\theta,
\qquad
\pi_0L=[0,1],\quad\pi_{\pi/2}L=\{0\}.
$$

$L$ 上に $u\in[0,1]$ の一様分布を載せた確率測度 $\mu$ を考えます。$\theta=0$ なら $\nu_0$ は $[0,1]$ の一様測度です。一方 $\theta=\pi/2$ なら、任意のBorel集合 $A$ について $\nu_{\pi/2}(A)=1$（$0\in A$ のとき）、$0$（それ以外）なので $\nu_{\pi/2}=\delta_0$ です。いずれも $\nu_\theta(\mathbb R)=\mu(\mathbb R^2)=1$ で、射影は質量を失いません。
<!-- definition-example-end -->

また、Cauchy--Schwarz不等式と $|e_\theta|=1$ から

$$
|\pi_\theta(x)-\pi_\theta(y)|
=|(x-y)\cdot e_\theta|\le |x-y|.
$$

つまり各 $\pi_\theta$ は $1$-Lipschitzです。よって[MT8のLipschitz像の次元評価](../../MT/MT8/index.md#thm-mt8-lipschitz)により、任意の $E\subset\mathbb R^2$、任意の $\theta$ に対して

$$
\dim_H\pi_\theta E\le\min\{\dim_HE,1\}.
$$

上界は全方向で正しい。難しいのは、**ほとんど全方向で下界も等しくなる**ことです。

## 2. 二点が重なる方向を平均する

二点 $x\ne y$ の差を $z=x-y$ と置きます。射影後の距離は $|z\cdot e_\theta|$ です。$z$ に垂直な方向では0になるため、逆数の $t$ 乗は発散します。しかし $t<1$ なら、方向を積分した総量は有限です。

<a id="lem-gmt5-angular-kernel"></a>

<!-- formal-statement-start -->
> **補題（方向平均された特異核）**  
> $0<t<1$、$z\in\mathbb R^2\setminus\{0\}$ とする。方向を $d\theta/\pi$ で平均すると

$$
\frac1\pi\int_0^\pi|z\cdot e_\theta|^{-t}\,d\theta
=C_t|z|^{-t},
\qquad
C_t=\frac2\pi\int_0^{\pi/2}(\cos u)^{-t}\,du<\infty.
$$

> $t\ge1$ なら左辺の方向積分は全ての $z\ne0$ について $+\infty$ となる。ここで核は内積が0のとき $+\infty$ と読む。
<!-- formal-statement-end -->

### 証明の見取り図

$z$ の偏角を $\varphi$ とすると、内積は $|z|\cos(\theta-\varphi)$ です。$\cos$ の絶対値の $\pi$ 周期性で $\varphi$ が消えます。問題は $\cos u=0$ の近くで、そこでは $|\cos u|$ は零点からの角度に比例します。

<!-- proof-start -->
### 証明

$z=|z|(\cos\varphi,\sin\varphi)$ と書けば

$$
z\cdot e_\theta=|z|(\cos\varphi\cos\theta+
\sin\varphi\sin\theta)=|z|\cos(\theta-\varphi).
$$

$u=\theta-\varphi$ と置くと、被積分関数 $|\cos u|^{-t}$ は $\pi$ 周期なので、長さ $\pi$ のどの区間で積分しても同じ拡張実数値です。対称性より

$$
\int_0^\pi|\cos(\theta-\varphi)|^{-t}d\theta
=2\int_0^{\pi/2}(\cos u)^{-t}du.
$$

端点で $v=\pi/2-u$ と置くと $\cos u=\sin v$ です。$0\le v\le\pi/2$ で

$$
\frac{2v}{\pi}\le\sin v\le v
$$

が成り立つので、$v^{-t}\le(\sin v)^{-t}\le(\pi/2)^t v^{-t}$。従って積分の収束性は $\int_0^{\pi/2}v^{-t}dv$ と一致します。この積分は $t<1$ で有限、$t\ge1$ で無限です。有限の場合に係数 $|z|^{-t}$ を戻して主張を得ます。$\square$
<!-- proof-end -->

$t=1$ で積分が発散する点は重要です。次元が $1$ に達することの証明は、各 $t<1$ で下界を得て極限を取ります。射影が**正の長さ**を持つというGMT6の問題は、この補題の $t=1$ への単純代入では解けません。

## 3. 射影測度のenergyを平均する

[GMT3の定義](../GMT3/index.md#def-gmt3-riesz-energy)で $I_t(\mu)$ は平面上の二点核 $|x-y|^{-t}$ を積分したものです。射影測度に同じ核を用いると、その二点は $\pi_\theta(x),\pi_\theta(y)$ になります。これは押し出し測度の積分公式を二回使うことで確かめられます。

<a id="lem-gmt5-projection-energy"></a>

<!-- formal-statement-start -->
> **補題（射影energyの方向平均）**  
> $0<t<1$、$\mu$ を $\mathbb R^2$ 上の非負有限Borel測度とし、$\nu_\theta=(\pi_\theta)_\#\mu$ とする。このとき $\theta\mapsto I_t(\nu_\theta)$ はLebesgue可測で、無限大を許す等式

$$
\frac1\pi\int_0^\pi I_t(\nu_\theta)\,d\theta
=C_t I_t(\mu)
$$

> が成り立つ。$C_t$ は[角度積分の定数](#lem-gmt5-angular-kernel)である。特に $I_t(\mu)<\infty$ なら、$d\theta/\pi$ に関するほとんど全ての方向で $I_t(\nu_\theta)<\infty$ である。
<!-- formal-statement-end -->

### 証明の見取り図

三つの非負積分（$\theta,x,y$）を交換します。非負性による[Tonelliの定理](../../F0/F0-00D2C/index.md#thm-tonelli)なら、初めから有限energyと仮定する必要はありません。内側の角度積分を前節の補題で計算します。

<!-- proof-start -->
### 証明

射影測度の定義から、非負Borel関数 $h$ について

$$
\int h(u)\,d\nu_\theta(u)
=\int h(\pi_\theta(x))\,d\mu(x).
$$

単関数で定義を確認し、非負単関数の増大近似に単調収束を使えば、この公式は非負Borel関数一般で成立します。これを二変数核 $h(u,v)=|u-v|^{-t}$ に各変数について順に適用すると

$$
I_t(\nu_\theta)
=\iint|\pi_\theta(x)-\pi_\theta(y)|^{-t}
\,d\mu(x)d\mu(y)
=\iint|(x-y)\cdot e_\theta|^{-t}\,d\mu(x)d\mu(y).
$$

最後の被積分関数は $(\theta,x,y)$ の非負Borel関数（零点では値 $+\infty$）なので、積分は方向に関して可測です。[Tonelliの定理](../../F0/F0-00D2C/index.md#thm-tonelli)によって

$$
\begin{aligned}
\frac1\pi\int_0^\pi I_t(\nu_\theta)d\theta
&=\iint\left(\frac1\pi\int_0^\pi
|(x-y)\cdot e_\theta|^{-t}d\theta\right)
d\mu(x)d\mu(y)\\
&=C_t\iint|x-y|^{-t}d\mu(x)d\mu(y).
\end{aligned}
$$

$x=y$ でも両側の内側の値は $+\infty$ と定義して一致します。有限energyなら $\mu$ は原子を持ちません（質量 $a>0$ の点があれば対角の質量は少なくとも $a^2$ でenergyが発散）。従って対角での値の約束にも矛盾はありません。最後に $C_t<\infty$ だから左辺は有限となり、非負関数が無限となる方向の測度は0です。$\square$
<!-- proof-end -->

### GMT4からのもう一つの見方：周波数の直線切片

有限測度の[Fourier変換](../GMT4/index.md#def-gmt4-fourier-measure)を射影測度へ使うと、$r\in\mathbb R$ について

$$
\widehat{\nu_\theta}(r)
=\int e^{-iru}d\nu_\theta(u)
=\int e^{-irx\cdot e_\theta}d\mu(x)
=\widehat\mu(re_\theta).
$$

つまり、射影測度の一次元Fourier変換は、平面上の $\widehat\mu$ を原点から出る一本の周波数直線に制限したものです。次の恒等式は前の補題を周波数側で再導出します。

<a id="prop-gmt5-fourier-slicing"></a>

<!-- formal-statement-start -->
> **命題（Fourier切片からの方向平均）**  
> $0<t<1$、$\mu$ を $\mathbb R^2$ 上の有限非負Borel測度とする。係数を

$$
c_{d,t}=\frac{\Gamma((d-t)/2)}{2^t\pi^{d/2}\Gamma(t/2)}
$$

> と定める。このとき

$$
\frac1\pi\int_0^\pi I_t(\nu_\theta)d\theta
=\frac{c_{1,t}}{\pi c_{2,t}}I_t(\mu)
=C_tI_t(\mu)
$$

> が拡張実数として成立する。
<!-- formal-statement-end -->

### 証明の見取り図

GMT4のenergy恒等式を射影先の $d=1$ と元の平面の $d=2$ に適用します。$(r,\theta)\mapsto re_\theta$ は負の半径も許す極座標で、$\theta\in[0,\pi)$ のとき平面を重複なく覆います。

<!-- proof-start -->
### 証明

[GMT4のFourier energy恒等式](../GMT4/index.md#thm-gmt4-fourier-energy)を $d=1$ と $0<t<1$ で $\nu_\theta$ に適用し、先ほどの切片公式を代入すると

$$
I_t(\nu_\theta)
=c_{1,t}\int_{\mathbb R}|\widehat\mu(re_\theta)|^2|r|^{t-1}dr.
$$

非負性からTonelliで $r$ と $\theta$ を交換できます。$(r,\theta)\mapsto\xi=re_\theta$ は $r=0$ を除いて平面を重複なく覆います。$r>0$ の半平面と $r<0$ の半平面を合わせると、$\theta\in[0,\pi)$ で全ての方向が一度ずつ現れます。座標微分の行列式は

$$
\det\begin{pmatrix}
\cos\theta&-r\sin\theta\\
\sin\theta&r\cos\theta
\end{pmatrix}=r,
$$

だからJacobianの絶対値は $|r|$ です。従って

$$
\begin{aligned}
\frac1\pi\int_0^\pi I_t(\nu_\theta)d\theta
&=\frac{c_{1,t}}\pi\int_0^\pi\int_{\mathbb R}
|\widehat\mu(re_\theta)|^2|r|^{t-1}dr\,d\theta\\
&=\frac{c_{1,t}}\pi\int_{\mathbb R^2}
|\widehat\mu(\xi)|^2|\xi|^{t-2}d\xi\\
&=\frac{c_{1,t}}{\pi c_{2,t}}I_t(\mu),
\end{aligned}
$$

最後も[GMT4の定理](../GMT4/index.md#thm-gmt4-fourier-energy)を $d=2$ で使いました。Gamma係数を代入すると

$$
\frac{c_{1,t}}{\pi c_{2,t}}
=\frac{\Gamma((1-t)/2)}{\sqrt\pi\,\Gamma((2-t)/2)}.
$$

一方、$v=\sin^2u$ を用いて[角度積分の定数](#lem-gmt5-angular-kernel)を書き換えます。$dv=2\sin u\cos u\,du$ であるため

$$
\begin{aligned}
C_t&=\frac2\pi\int_0^{\pi/2}(\cos u)^{-t}du\\
&=\frac1\pi\int_0^1v^{-1/2}(1-v)^{-(t+1)/2}dv\\
&=\frac{\Gamma(1/2)\Gamma((1-t)/2)}
{\pi\Gamma((2-t)/2)},
\end{aligned}
$$

ここで用いたBeta--Gammaの関係も確認します。$a,b>0$ に対して $u=sw$、$v=s(1-w)$（$s>0,\ 0<w<1$）と置けばJacobianは $s$ で、非負性から[Tonelliの定理](../../F0/F0-00D2C/index.md#thm-tonelli)により

$$
\begin{aligned}
\Gamma(a)\Gamma(b)
&=\int_0^\infty\int_0^\infty
u^{a-1}v^{b-1}e^{-(u+v)}du\,dv\\
&=\left(\int_0^\infty s^{a+b-1}e^{-s}ds\right)
\left(\int_0^1w^{a-1}(1-w)^{b-1}dw\right).
\end{aligned}
$$

従って最後の積分は $\Gamma(a)\Gamma(b)/\Gamma(a+b)$ です。$a=1/2$、$b=(1-t)/2$ を代入し、Gaussian積分からの $\Gamma(1/2)=\sqrt\pi$ を使うと $C_t=c_{1,t}/(\pi c_{2,t})$ を得ます。$a,b>0$ の条件は $0<t<1$ と一致します。$\square$
<!-- proof-end -->

## 4. 平面Marstrand射影定理の次元側

一点への射影のような例外は残り得ます。しかし有限energyの測度を用意すると、[射影energyの方向平均](#lem-gmt5-projection-energy)により**例外方向が零集合**だと分かります。

<a id="thm-gmt5-marstrand-dimension"></a>

<!-- formal-statement-start -->
> **定理（平面Marstrand射影定理：コンパクト集合の次元）**  
> $K\subset\mathbb R^2$ を非空コンパクト集合とする。このとき $[0,\pi)$ のLebesgueほとんど全ての $\theta$ に対して

$$
\dim_H\pi_\theta K=\min\{\dim_HK,1\}
$$

> が成り立つ。例外方向の集合は $K$ に依存してよい。
<!-- formal-statement-end -->

### 証明の見取り図

上界は全方向で既に得ました。下界は、目標次元より小さい指数 $t$ を固定し、$t<s<\dim_HK$ の[Frostman測度](../GMT2/index.md#thm-gmt2-frostman)を取ります。[GMT3で証明したenergyの有限性](../GMT3/index.md#thm-gmt3-frostman-energy)から、射影測度もほとんど全方向で有限 $t$-energy。従って[有限energyによる次元下界](../GMT3/index.md#thm-gmt3-energy-dimension)が使えます。最後に可算個の $t$ を同時に満たす方向だけを残します。

<!-- proof-start -->
### 証明

$D=\dim_HK$ とし、まず全方向の上界を確認します。$\pi_\theta$ は $1$-Lipschitzなので、[MT8のLipschitz次元評価](../../MT/MT8/index.md#thm-mt8-lipschitz)より $\dim_H\pi_\theta K\le D$。また $\pi_\theta K\subset\mathbb R$ だから $\dim_H\pi_\theta K\le1$ です。$D=0$ の場合は非負性と合わせて結論が全方向で成立します。

$D>0$ とし、有理数 $t$ を

$$
0<t<\min\{D,1\}
$$

の範囲で一つ固定します。$t<s<D$ かつ $s\le2$ となる実数 $s$ を選べます（$D\le2$ なので実際には $s<2$）。[GMT2のFrostman補題](../GMT2/index.md#thm-gmt2-frostman)を非空コンパクト集合 $K$ と指数 $s$ に適用し、$K$ に支えられる確率測度 $\mu_t$ と $A_s>0$ を得ます。その球成長は

$$
\mu_t(B(x,r))\le A_s r^s
\quad(x\in\mathbb R^2,\ r>0).
$$

[GMT3の球成長から有限energyへの定理](../GMT3/index.md#thm-gmt3-frostman-energy)は $0<t<s$ のもとで $I_t(\mu_t)<\infty$ を与えます。$\nu_{t,\theta}=(\pi_\theta)_\#\mu_t$ とし、[射影energyの方向平均](#lem-gmt5-projection-energy)を適用すると

$$
\frac1\pi\int_0^\pi I_t(\nu_{t,\theta})d\theta
=C_tI_t(\mu_t)<\infty.
$$

従って $N_t=\{\theta:I_t(\nu_{t,\theta})=\infty\}$ は測度零です。$\theta\notin N_t$ なら、$\nu_{t,\theta}$ はコンパクト集合 $\pi_\theta K$ に支えられる確率測度です。さらに $t<1$ なので、[GMT3の有限energy次元下界](../GMT3/index.md#thm-gmt3-energy-dimension)を $d=1$、指数 $t$、集合 $\pi_\theta K$、測度 $\nu_{t,\theta}$ に適用できます。結論は

$$
\dim_H\pi_\theta K\ge t
\quad(\theta\notin N_t).
$$

ここで $\mu_t$ と $N_t$ は $t$ に依存して構いません。集合

$$
N=\bigcup_{t\in\mathbb Q\cap(0,\min\{D,1\})}N_t
$$

は可算個の零集合の和なので測度零です。$\theta\notin N$ なら全ての該当する有理数 $t$ で下界が成り立ち、密度性から

$$
\dim_H\pi_\theta K\ge\sup\bigl(\mathbb Q\cap(0,\min\{D,1\})\bigr)
=\min\{D,1\}.
$$

上界と合わせて等号を得ます。$\square$
<!-- proof-end -->

### コンパクト集合を可算個合わせてもよい

<a id="cor-gmt5-sigma-compact"></a>

<!-- formal-statement-start -->
> **系（可算個のコンパクト集合の和の射影次元）**  
> $E\subset\mathbb R^2$ が $E=\bigcup_{n=1}^\infty K_n$ と書け、各 $K_n$ がコンパクト集合であるとする（空集合も許す）。このときほとんど全ての $\theta\in[0,\pi)$ に対し

$$
\dim_H\pi_\theta E=\min\{\dim_HE,1\}.
$$

> 空集合のHausdorff次元は0とする。
<!-- formal-statement-end -->

### 証明の見取り図

まずHausdorff次元について可算和の値を直接証明し、各コンパクト集合の例外方向を可算個足し合わせます。極限集合で新しい例外が増えるわけではありません。

<!-- proof-start -->
### 証明

任意の可算個の集合 $A_n$ について

$$
\dim_H\bigcup_n A_n=\sup_n\dim_H A_n
$$

です。右辺を $a$ とすると、単調性から左辺は $a$ 以上。一方 $q>a$ なら全ての $n$ で $\mathcal H^q(A_n)=0$ なので、[Hausdorff外測度の可算劣加法性](../../MT/MT8/index.md#thm-mt8-hausdorff-outer-measure)により $\mathcal H^q(\bigcup_nA_n)=0$、従って左辺は $q$ 以下です。$q\downarrow a$ で公式が示されます。

各非空 $K_n$ に[コンパクト集合のMarstrand射影次元定理](#thm-gmt5-marstrand-dimension)を適用し、例外方向 $N_n$ を選びます。$N=\bigcup_nN_n$ は零集合です。$\theta\notin N$ で

$$
\begin{aligned}
\dim_H\pi_\theta E
&=\sup_n\dim_H\pi_\theta K_n\\
&=\sup_n\min\{\dim_HK_n,1\}\\
&=\min\{\sup_n\dim_HK_n,1\}
=\min\{\dim_HE,1\}.
\end{aligned}
$$

空の $K_n$ は計算に寄与しません。$\square$
<!-- proof-end -->

**集合クラスの注意**　コンパクト、閉集合（$E=\bigcup_n E\cap[-n,n]^2$）および可算コンパクト和についてはここまでの証明で完結しています。一般のBorel集合に対する標準的な射影定理へ進むには、Borel集合のHausdorff次元が内部のコンパクト部分集合の次元の上限に等しい、というコンパクト近似結果が別途必要です。本章ではその追加結果を証明なしに利用してBorel版まで証明したとはしません。

## 5. 例外方向と臨界次元の具体例

### 線分：例外は一方向だけ

傾き $m\in\mathbb R$ の線分 $L_m=\{(u,mu):0\le u\le1\}$ は、$\pi_\theta(u,mu)=u(\cos\theta+m\sin\theta)$ です。係数が非零なら影は長さ $|\cos\theta+m\sin\theta|$ の区間で次元1、零なら一点で次元0。零となる方向は $[0,\pi)$ でちょうど一つです。**「ほとんど全て」と「全て」は交換できません**。

### Cantor積集合：典型方向と座標方向で次元が違う

$C\subset[0,1]$ を中三分Cantor集合、$\alpha=\log2/\log3$ とします。[MT8で証明した次元](../../MT/MT8/index.md#thm-mt8-cantor-dimension)は $\dim_HC=\alpha$ です。積集合 $K=C\times C$ では各段階に一辺 $3^{-n}$ の正方形が $4^n$ 個残るので、$q>2\alpha$ に対して

$$
\mathcal H^q_{\sqrt2\,3^{-n}}(K)
\le4^n(\sqrt2\,3^{-n})^q\longrightarrow0.
$$

従って $\dim_HK\le2\alpha$。下界には $C$ 上の均等Cantor確率測度 $\lambda$ を使います。$3^{-(n+1)}<r\le3^{-n}$ なら長さ $2r$ の区間は段階 $n$ の長さ $3^{-n}$ の区間と高々4個交わるため、$\lambda((x-r,x+r))\le4\cdot2^{-n}\le4\cdot3^\alpha r^\alpha$。積測度 $\lambda\otimes\lambda$ の半径 $r$ の球は二つの幅 $2r$ の区間の直積に含まれ、

$$
(\lambda\otimes\lambda)(B(z,r))
\le16\cdot3^{2\alpha}r^{2\alpha}.
$$

[MT8の質量分布原理](../../MT/MT8/index.md#thm-mt8-mass-principle)から下界 $\dim_HK\ge2\alpha$ です。すなわち

$$
\dim_H(C\times C)=2\frac{\log2}{\log3}>1.
$$

水平・垂直方向への射影はいずれも $C$ なので次元は $\alpha<1$。一方、[平面Marstrand射影定理：コンパクト集合の次元](#thm-gmt5-marstrand-dimension)を適用すると、ほとんど全方向では次元1です。特別な二方向が例外であることと、例外集合全体が零測度であることは両立します。

### 次元が1でも長さが正とは限らない

Hausdorff次元1の集合が $\mathcal L^1$-測度正とは限りません。例えば $n\ge2$ について次元 $1-1/n$ のコンパクトな零測度Cantor集合 $C_n$ を取り、縮小した集合を点 $2^{-n}$ の近くの短い区間へ並べて、集積点0を加えれば、コンパクトでLebesgue測度0、Hausdorff次元1の集合が得られます（演習B4）。その集合を水平直線上に置けば、垂直方向以外の影は次元1でも長さ0です。

だからこの講義の**次元の結論**だけでは正の長さは導けません。次のGMT6では、元の集合の次元が厳密に1より大きいときに、射影測度の $L^2$ 密度を用いて正の長さを導きます。

## 6. 演習：方向積分から射影次元まで

### Level A：定義と基本操作

<a id="ex-gmt5-a1"></a>

**A1. 斜めの線分を射影する**

- Level: A
- 問題: $L=\{(u,2u):0\le u\le1\}$ と $\pi_\theta(x)=x\cdot(\cos\theta,\sin\theta)$ に対し、$\pi_\theta L$ を求めよ。長さ0となる方向が $[0,\pi)$ にちょうど一つあることを示せ。

<!-- solution-start -->
**詳細解答**

点 $(u,2u)$ は $u(\cos\theta+2\sin\theta)$ に移ります。$a_\theta=\cos\theta+2\sin\theta$ と置けば、$u\in[0,1]$ より

$$
\pi_\theta L=[\min(0,a_\theta),\max(0,a_\theta)].
$$

その長さは $|a_\theta|$ です。$a_\theta=\sqrt5\cos(\theta-\varphi)$、$\cos\varphi=1/\sqrt5$、$\sin\varphi=2/\sqrt5$ と表せます。$\cos$ の零点は長さ $\pi$ の半開区間に一つだけなので、$a_\theta=0$ の方向はちょうど一つです。その場合のみ像は $\{0\}$、それ以外は非退化区間です。
<!-- solution-end -->

<a id="ex-gmt5-a2"></a>

**A2. 原子が射影energyに与える影響**

- Level: A
- 問題: $\mu=\tfrac12\delta_{(0,0)}+\tfrac12\delta_{(1,0)}$ とし、$0<t<1$ とする。$\nu_\theta=(\pi_\theta)_\#\mu$ を求め、全ての方向で $I_t(\nu_\theta)=\infty$ となる理由を説明せよ。

<!-- solution-start -->
**詳細解答**

定義から $\nu_\theta=\tfrac12\delta_0+\tfrac12\delta_{\cos\theta}$ です。$\cos\theta\ne0$ なら0の点の自己対 $u=v=0$ が質量 $1/4$ を持ち、核 $|u-v|^{-t}=\infty$ なのでenergyは無限です。$\cos\theta=0$ なら二つの原子が一点に重なって $\nu_\theta=\delta_0$ となり、やはり自己対が質量1を持ちます。従って全方向で無限です。異なる原子間の距離だけを計算して対角成分を捨てることはできません。
<!-- solution-end -->

<a id="ex-gmt5-a3"></a>

**A3. 角度積分の臨界指数**

- Level: A
- 問題: $z=(3,4)$ とし、$t>0$ とする。$\int_0^\pi|z\cdot e_\theta|^{-t}d\theta$ の収束条件を求め、収束する場合に $C_t$ を用いて値を表せ。

<!-- solution-start -->
**詳細解答**

$|z|=5$ であり、$z=5(\cos\varphi,\sin\varphi)$ と書けるので $|z\cdot e_\theta|^{-t}=5^{-t}|\cos(\theta-\varphi)|^{-t}$。$\pi$ 周期性を使うと積分は

$$
5^{-t}\int_0^\pi|\cos u|^{-t}du
=2\cdot5^{-t}\int_0^{\pi/2}(\cos u)^{-t}du.
$$

零点近くで $\cos u=\sin(\pi/2-u)$ は $\pi/2-u$ と同程度なので、$\int_0^\varepsilon v^{-t}dv$ と比較します。これは $0<t<1$ でのみ有限。有限の場合は定義から積分値は $\pi C_t5^{-t}$ です。$t=1$ では対数発散します。
<!-- solution-end -->

<a id="ex-gmt5-a4"></a>

**A4. 区間のenergyと縮小率**

- Level: A
- 問題: $0<t<1$、$\lambda$ を $[0,1]$ 上の一様確率測度とする。$I_t(\lambda)$ を直接積分で求めよ。また $a\ne0$ の写像 $u\mapsto au$ による押し出し測度のenergyを求めよ。

<!-- solution-start -->
**詳細解答**

対称性により正方形 $[0,1]^2$ の対角より下側を2倍します。$u$ を外側にして

$$
\begin{aligned}
I_t(\lambda)
&=2\int_0^1\int_0^u(u-v)^{-t}dv\,du\\
&=\frac2{1-t}\int_0^1u^{1-t}du
=\frac2{(1-t)(2-t)}.
\end{aligned}
$$

内側の置換は $w=u-v$ で、$0<t<1$ のため下端の積分は有限です。押し出し測度の二点は $au,av$ となるため、核は $|a|^{-t}|u-v|^{-t}$。よってenergyは $2|a|^{-t}/((1-t)(2-t))$ です。$a=0$ なら点質量でenergyは無限となり、この公式へ0を代入してはいけません。
<!-- solution-end -->

<a id="ex-gmt5-a5"></a>

**A5. Fourier切片公式**

- Level: A
- 問題: $\mu$ を $\mathbb R^2$ 上の有限非負Borel測度とし、$\nu_\theta=(\pi_\theta)_\#\mu$ とする。角周波数規約のFourier変換について $\widehat{\nu_\theta}(r)=\widehat\mu(re_\theta)$ を、押し出し測度の定義から示せ。

<!-- solution-start -->
**詳細解答**

有限測度なので $|e^{-iru}|=1$ は積分可能です。[押し出し測度の積分公式](#lem-gmt5-projection-energy)を $h(u)=e^{-iru}$ の実部・虚部に適用して

$$
\begin{aligned}
\widehat{\nu_\theta}(r)
&=\int_{\mathbb R}e^{-iru}d\nu_\theta(u)\\
&=\int_{\mathbb R^2}e^{-ir\pi_\theta(x)}d\mu(x)\\
&=\int_{\mathbb R^2}e^{-ix\cdot(re_\theta)}d\mu(x)
=\widehat\mu(re_\theta).
\end{aligned}
$$

最後は $r\pi_\theta(x)=x\cdot(re_\theta)$ であり、新しい正規化因子は現れません。
<!-- solution-end -->

### Level B：仮定と例外方向を扱う

<a id="ex-gmt5-b1"></a>

**B1. 線分のenergy平均を二通りで確かめる**

- Level: B
- 問題: $0<t<1$、$\mu$ を水平単位線分上の一様確率測度とする。$I_t(\nu_\theta)$ を方向ごとに求め、方向平均が $C_tI_t(\mu)$ と一致することを直接検算せよ。

<!-- solution-start -->
**詳細解答**

水平線分上の二点の差は $(u-v,0)$ なので、射影後の差は $(u-v)\cos\theta$。$\cos\theta\ne0$ では[A4の区間energy](#ex-gmt5-a4)から

$$
I_t(\nu_\theta)
=|\cos\theta|^{-t}\frac2{(1-t)(2-t)}.
$$

$\theta=\pi/2$ では $\nu_\theta=\delta_0$ でenergyは無限ですが、方向測度では一点なので積分に影響しません。[角度積分の補題](#lem-gmt5-angular-kernel)を $z=(1,0)$ に使うと

$$
\frac1\pi\int_0^\pi I_t(\nu_\theta)d\theta
=\frac2{(1-t)(2-t)}\frac1\pi\int_0^\pi|\cos\theta|^{-t}d\theta
=C_t\frac2{(1-t)(2-t)}.
$$

平面上の元の線分測度も、二点間距離が $|u-v|$ だから $I_t(\mu)=2/((1-t)(2-t))$。よって方向平均公式と一致します。
<!-- solution-end -->

<a id="ex-gmt5-b2"></a>

**B2. 線分二本なら例外が消える**

- Level: B
- 問題: $E=([0,1]\times\{0\})\cup(\{0\}\times[0,1])$ とする。全ての $\theta\in[0,\pi)$ で $\dim_H\pi_\theta E=1$ を示せ。一般の一線分との違いを説明せよ。

<!-- solution-start -->
**詳細解答**

水平線分の影は $[\min(0,\cos\theta),\max(0,\cos\theta)]$、垂直線分の影は $[\min(0,\sin\theta),\max(0,\sin\theta)]$ です。$\cos^2\theta+\sin^2\theta=1$ なので、両係数が同時に0にはなりません。従って少なくとも一方の影は非退化区間で、[MT8の区間次元](../../MT/MT8/index.md#thm-mt8-interval-dimension)により合併の次元は1以上です。像は $\mathbb R$ の部分集合なので1以下。一本の線分ならその垂線方向で一点に潰れますが、直交する二本を同時に潰す方向はありません。
<!-- solution-end -->

<a id="ex-gmt5-b3"></a>

**B3. Cantor積の上下次元評価**

- Level: B
- 問題: 中三分Cantor集合 $C$ と $\alpha=\log2/\log3$ に対し、$\dim_H(C\times C)=2\alpha$ を、段階 $n$ の正方形被覆と均等積測度の球成長評価から再導出せよ。その上で水平射影が例外方向となる理由を説明せよ。

<!-- solution-start -->
**詳細解答**

段階 $n$ に一辺 $3^{-n}$ の正方形 $4^n$ 個があり、その直径は $\sqrt2\,3^{-n}$。$q>2\alpha$ なら

$$
4^n(\sqrt2\,3^{-n})^q=(\sqrt2)^q(4\cdot3^{-q})^n\to0,
$$

ゆえに次元は $2\alpha$ 以下です。均等Cantor測度 $\lambda$ は、$3^{-(n+1)}<r\le3^{-n}$ のとき、長さ $2r$ の区間が段階 $n$ の区間に高々4個交わることから

$$
\lambda((x-r,x+r))\le4\cdot2^{-n}
\le4\cdot3^\alpha r^\alpha.
$$

最後の不等式には $r>3^{-(n+1)}$ と $3^\alpha=2$ を使いました。半径 $r$ の球は二つの座標区間の直積に含まれるため、積測度の球質量は

$$
(\lambda\otimes\lambda)(B((x,y),r))\le16\cdot3^{2\alpha}r^{2\alpha}.
$$

[質量分布原理](../../MT/MT8/index.md#thm-mt8-mass-principle)により $\dim_H(C\times C)\ge2\alpha$ です。水平射影は $C$ で次元 $\alpha<1$。一方、元の積集合は次元 $2\alpha>1$ なので、[平面Marstrand射影定理：コンパクト集合の次元](#thm-gmt5-marstrand-dimension)の一般方向の次元1より小さく、例外方向であることが分かります。
<!-- solution-end -->

<a id="ex-gmt5-b4"></a>

**B4. 次元1でも長さ0のコンパクト集合**

- Level: B
- 問題: 各 $n\ge2$ に対し、$C_n\subset[0,1]$ を $\dim_HC_n=1-1/n$、$\mathcal L^1(C_n)=0$ のコンパクトCantor集合とする（[GMT2の具体的構成](../GMT2/index.md#cor-gmt2-dimension-characterization)の後の例）。$D=\{0\}\cup\bigcup_{n\ge2}(2^{-n}+2^{-2n}C_n)$ がコンパクト、$\dim_HD=1$、$\mathcal L^1(D)=0$ となることを示せ。$D\times\{0\}$ の射影が「次元1なら正の長さ」を反証する理由も述べよ。

<!-- solution-start -->
**詳細解答**

各 $D_n=2^{-n}+2^{-2n}C_n$ はコンパクトで、区間 $[2^{-n},2^{-n}+2^{-2n}]$ に入ります。$D$ 内の任意の列について、添字 $n$ が有界な項を無限に含むなら、ある固定した $D_n$ の中に収束部分列があります。添字が無限大へ行く部分列なら点は0へ収束し、0は $D$ に入っています。従って $D$ は有界で逐次コンパクト、ゆえにコンパクトです。

相似写像とその逆写像にそれぞれ[MT8のLipschitz次元評価](../../MT/MT8/index.md#thm-mt8-lipschitz)を使うと次元は不変なので、$\dim_HD_n=1-1/n$ です。Hausdorff次元の可算安定性（[本章の系の証明](#cor-gmt5-sigma-compact)）より

$$
\dim_HD=\sup_{n\ge2}(1-1/n)=1.
$$

各 $D_n$ は相似像でもLebesgue測度0であり、一点集合も測度0なので、可算劣加法性から $\mathcal L^1(D)=0$。$E=D\times\{0\}$ の射影は $\pi_\theta E=(\cos\theta)D$。$\cos\theta\ne0$ なら相似像で次元1、Lebesgue測度0を保ち、$\theta=\pi/2$ では一点です。次元定理は典型方向での**次元**だけを保証し、正測度は保証しません。
<!-- solution-end -->

### Level C：異なる縮尺のCantor積を解析する

<a id="ex-gmt5-c1"></a>

**C1. 二種類のCantor集合の積と方向依存**

- Level: C
- 問題: $A$ を中三分Cantor集合、$B$ を $[0,1]$ の各区間から左右の長さ $1/4$ の二部分区間だけを残す四進Cantor集合とする。$K=A\times B$、$\alpha=\log2/\log3$、$\beta=\log2/\log4=1/2$ と置く。次を示せ。
  1. $\dim_HK=\alpha+\beta>1$。
  2. 水平方向・垂直方向への射影次元はそれぞれ $\alpha,\beta$ である。
  3. ほとんど全方向への射影次元は1である。証明のどこで $t<1$ が必要かも述べよ。

<!-- solution-start -->
**詳細解答**

まず各集合の段階 $n$ の区間は $A$ で長さ $3^{-n}$・個数 $2^n$、$B$ で長さ $4^{-n}$・個数 $2^n$ です。任意の小さい $r>0$ に対し、$3^{-n}\le r<3^{-n+1}$、$4^{-m}\le r<4^{-m+1}$ を満たす整数 $n,m$ を取ります。$A$ は $2^n$ 個、$B$ は $2^m$ 個の長さ高々 $r$ の区間で覆えるので、積は直径高々 $\sqrt2r$ の長方形 $2^{n+m}$ 個で覆えます。

$$
2^n=(3^n)^\alpha\le 3^\alpha r^{-\alpha},
\qquad
2^m=(4^m)^\beta\le4^\beta r^{-\beta}.
$$

従って $q>\alpha+\beta$ ならHausdorff被覆の総 $q$ 乗直径は $O(r^{q-\alpha-\beta})\to0$。これで $\dim_HK\le\alpha+\beta$。

次に $A,B$ の均等確率測度を $\lambda_A,\lambda_B$ とします。$3^{-(n+1)}<r\le3^{-n}$ なら長さ $2r$ の区間は段階 $n$ の区間と高々4個交わるので

$$
\lambda_A((x-r,x+r))\le4\cdot2^{-n}\le4\cdot3^\alpha r^\alpha.
$$

同じ議論を $4^{-(m+1)}<r\le4^{-m}$ に用いると

$$
\lambda_B((y-r,y+r))\le4\cdot2^{-m}\le4\cdot4^\beta r^\beta.
$$

積測度 $\lambda_A\otimes\lambda_B$ の半径 $r$ の球は座標区間の直積に含まれるため、その質量は $16\cdot3^\alpha4^\beta r^{\alpha+\beta}$ 以下。大きい $r$ に対しても定数を増やせば成り立ちます。[MT8の質量分布原理](../../MT/MT8/index.md#thm-mt8-mass-principle)から $\dim_HK\ge\alpha+\beta$ です。$\alpha>1/2$ なので和は1より大きくなります。

水平射影 $\pi_0K=A$ なので次元 $\alpha$。垂直射影 $\pi_{\pi/2}K=B$ なので次元 $\beta$。どちらも1未満です。

最後に $K$ はコンパクトで、$D=\alpha+\beta>1$ です。[平面Marstrand射影定理：コンパクト集合の次元](#thm-gmt5-marstrand-dimension)を適用すると、ほとんど全方向で

$$
\dim_H\pi_\theta K=\min\{D,1\}=1
$$

となります。定理の証明では、有理数 $0<t<1$ を選び、$t<s<D$ のFrostman測度を取りました。角度平均で

$$
\int_0^\pi|\cos u|^{-t}du<\infty
$$

を使うために $t<1$ が必要です。$t=1$ のenergyが有限だと主張したわけではありません。全有理数に共通する非例外方向で $t\uparrow1$ として次元1を得ます。
<!-- solution-end -->

## 7. まとめと次の講義

- 射影 $\pi_\theta(x)=x\cdot e_\theta$ は $1$-Lipschitzなので、Hausdorff次元はどの方向でも増えません。
- $0<t<1$ では方向平均された核が $C_t|x-y|^{-t}$ になり、有限energyの測度はほとんど全方向へ有限energyのまま射影できます。
- Frostman測度と有限energyから、非空コンパクト集合および可算コンパクト和について、ほとんど全方向で $\dim_H\pi_\theta E=\min\{\dim_HE,1\}$ を証明しました。
- Fourier側では $\widehat{\nu_\theta}(r)=\widehat\mu(re_\theta)$ という直線切片と極座標が同じ平均公式を与えます。
- 特別な方向では次元が下がり得ます。また次元1と正のLebesgue測度は別の主張です。

次は**GMT6「平面Marstrand射影定理：正測度」**です。元の集合の次元が1より大きい場合、ほとんど全方向で影が正のLebesgue測度を持つことを、射影測度の $L^2$ 密度から示します。
