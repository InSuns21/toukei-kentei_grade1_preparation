# GMT28 Gauss--Greenの境界積分・集合演算・切断

<!-- definition-example-audit: strict -->

## 1. 境界を積分するとき、何を数えるのか

滑らかな領域なら、発散の体積積分を外向き法線方向の流束に直せます。しかし有限周長集合には角、裂け目、測度零の穴があり、位相的境界の全体を面積で積分すると、存在しない「壁」まで数えることがあります。[GMT24のGauss--Green測度](../GMT24/index.md#thm-gmt24-gauss-green)はベクトル値測度でこの問題を避けました。[De Giorgi構造定理の整流可能性と測度同定](../GMT27/index.md#thm-gmt27-de-giorgi-structure)により、その測度は縮約境界上の面積と外向き法線で表せます。

本講義では、その二つを結んで境界積分を復元した後、集合を合体・切断したときに **どの境界が残り、どの境界が消えるか** を追います。最後に、水平な薄切りで得られる断面の周長と、元の境界の面積を coarea で結びます。

以下は整数 $d\ge2$、開集合 $\Omega\subset\mathbb R^d$ を基本設定とします。$E$ はLebesgue可測な集合で、$\Omega$ において局所有限周長を持つとします。[周長の定義](../GMT24/index.md#def-gmt24-finite-perimeter)と[縮約境界の定義](../GMT25/index.md#def-gmt25-reduced-boundary)から

$$
\mu_E=|D\chi_E|,\qquad
\mathcal G_E=-D\chi_E=\nu_E^*\,\mu_E,\qquad
S_E=\partial^*E\cap\Omega
$$

と書きます。$\nu_E^*$ は**外向き**の単位法線です。[GMT10の測度正規化](../GMT10/index.md#lem-gmt10-hausdorff-normalization)を用いて

$$
c_k=\mathcal H^k([0,1]^k),\qquad
\mathcal A^k=c_k^{-1}\mathcal H^k,\qquad c_0=1
$$

と置きます。$\mathcal H^k$ は直径による**非正規化**Hausdorff測度で、$\mathcal A^k$ はEuclidの平面上で通常の $k$ 次元Lebesgue測度に一致する面積です。$\mathcal A^0$ は点の個数を数えます。$\lambda\llcorner B$ は測度 $\lambda$ の集合 $B$ への制限です。

### 最小例：内部の線は外部境界ではない

$Q_1=(0,1)\times(0,1)$ と $Q_2=(1,2)\times(0,1)$ を考えます。共有する縦線で $Q_1$ の外向き法線は $e_1$、$Q_2$ の外向き法線は $-e_1$。二つを合わせた領域 $(0,2)\times(0,1)$ の内部では、その二つの流束が相殺されます。各正方形の周長は4ですが、和集合の周長は6です。**面積の足し算と、向きのある境界測度の足し算を混同しない**ことが出発点です。

## 2. 縮約境界上のGauss--Green

古典的な発散定理を、有限周長の集合について正確に回復します。テストベクトル場の成分は $C^1$、台は $\Omega$ のコンパクト部分集合とします。この条件なら、境界での余計な流束や無限遠の項がありません。

<a id="thm-gmt28-boundary-integration"></a>

<!-- formal-statement-start -->
> **定理（縮約境界でのGauss--Green境界積分）**
> $d\ge2$、$\Omega\subset\mathbb R^d$ は開集合、$E\subset\mathbb R^d$ は $\Omega$ で局所有限周長を持つとする。任意の $\Phi\in C_c^1(\Omega;\mathbb R^d)$ に対して

$$
\boxed{\displaystyle
\int_E\operatorname{div}\Phi\,d\mathcal L^d
=\int_{\partial^*E\cap\Omega}
\Phi(x)\cdot\nu_E^*(x)\,d\mathcal A^{d-1}(x)
=c_{d-1}^{-1}\int_{\partial^*E\cap\Omega}
\Phi\cdot\nu_E^*\,d\mathcal H^{d-1}.}
$$

> 右辺は縮約境界についての積分であり、位相的境界にそのまま置き換える主張ではない。
<!-- formal-statement-end -->

### 証明の見取り図

[分布的Gauss--Green恒等式](../GMT24/index.md#thm-gmt24-gauss-green)の右辺は $\mathcal G_E$ による積分です。[De Giorgiの測度同定](../GMT27/index.md#thm-gmt27-de-giorgi-structure)で $\mathcal G_E=\nu_E^*\mathcal A^{d-1}\llcorner\partial^*E$ に置き換えます。測度の同定で $c_{d-1}^{-1}$ を落とさないのが唯一の正規化上の注意です。

<!-- proof-start -->
### 証明

$\Phi$ の台 $K$ を固定します。$E$ は $K$ の近傍で有限周長なので、[Gauss--Green測度の存在・極分解・双対性](../GMT24/index.md#thm-gmt24-gauss-green)から

$$
\int_E\operatorname{div}\Phi\,dx
=\int_\Omega\Phi\cdot d\mathcal G_E.
$$

[GMT27の定理](../GMT27/index.md#thm-gmt27-de-giorgi-structure)をこの $\mathcal G_E$ に適用すると、$\mathcal G_E=\nu_E^*\mathcal A^{d-1}\llcorner S_E$ です。$\Phi$ は有界で $K$ の外で消え、$\mathcal A^{d-1}(S_E\cap K)<\infty$ なので積分可能です。従って

$$
\int_\Omega\Phi\cdot d\mathcal G_E
=\int_{S_E}\Phi\cdot\nu_E^*\,d\mathcal A^{d-1}
=c_{d-1}^{-1}\int_{S_E}\Phi\cdot\nu_E^*\,d\mathcal H^{d-1}.
$$

最初の等式へ代入して結論を得ます。
<!-- proof-end -->

### 例：半径 $R$ の円盤

$E=B_R(0)\subset\mathbb R^2$、$\Phi(x)=x$ とします。定理はコンパクト台の場を要求するので、$E$ の閉包の近くで1になる滑らかな cutoff $\eta$ を取り、$\eta\Phi$ を適用します。$E$ 上では $\operatorname{div}(\eta\Phi)=2$ です。境界上は $\nu_E^*(x)=x/R$ なので

$$
\int_E2\,dx=2\pi R^2,\qquad
\int_{\partial^*E}\Phi\cdot\nu_E^*\,d\mathcal A^1
=\int_{\partial B_R}R\,ds=R(2\pi R)=2\pi R^2.
$$

$c_1=1$ ですが、$d=3$ などに進むと $c_{d-1}$ の係数を残す必要があります。零測度の点を円盤から取り除いても $\chi_E$ はLebesgueほとんど至る所（almost everywhere; a.e.）同じであり、境界積分は変化しません。

## 3. 合併・共通部分で境界はどう変わるか

[集合演算と相似変換の境界測度恒等式](../GMT24/index.md#prop-gmt24-set-operations)は、補集合と和・共通部分の **Gauss--Green測度 $\mathcal G=-D\chi$** について既に証明しました。しかし、それだけで周長の足し算が等号になるわけではありません。全変動は向きの違うベクトルの相殺で減るからです。

集合の特徴関数を使うと、$\chi_{E\cup F}=\max(\chi_E,\chi_F)$、$\chi_{E\cap F}=\min(\chi_E,\chi_F)$ です。滑らかな二つの関数では、最大値と最小値の勾配は各点で元の二つの勾配を振り分けます。この観察を [BVの滑らかなstrict近似](../GMT22/index.md#thm-gmt22-smooth-approx) と [全変動の下半連続性](../GMT22/index.md#thm-gmt22-lsc) で極限へ運ぶと、境界の**過剰な足し算をしない不等式**が得られます。

<a id="thm-gmt28-perimeter-submodularity"></a>

<!-- formal-statement-start -->
> **定理（集合演算の周長劣加法性）**
> $E,F\subset\mathbb R^d$ が開集合 $\Omega$ で局所有限周長を持つなら、$E^c,E\cup F,E\cap F$ も $\Omega$ で局所有限周長を持つ。任意の開集合 $U\subset\Omega$ について、拡張実数値の不等式

$$
\boxed{\displaystyle
P(E\cup F;U)+P(E\cap F;U)
\le P(E;U)+P(F;U)}
$$

> が成立する。また $\Omega$ 上のベクトル値Radon測度として

$$
\mathcal G_{E^c}=-\mathcal G_E,\qquad
\mathcal G_{E\cup F}+\mathcal G_{E\cap F}
=\mathcal G_E+\mathcal G_F.
$$

> 特に $P(E^c;U)=P(E;U)$ である。不等式を等式と取り違えてはならない。
<!-- formal-statement-end -->

### 証明の見取り図

滑らかな $u,v$ では最大・最小の勾配の全変動の和が元の全変動の和に等しいです。有限周長集合の特徴関数へ $L^1_{\rm loc}$ で近似し、下半連続性で「$\le$」を得ます。ベクトル恒等式は指示関数の足し算から直接出すので、周長の不等式と論理的に分けて証明します。

<!-- proof-start -->
### 証明

まず $V\Subset\Omega$ を有界な開集合とし、周長測度が $\partial V$ に質量を持たないように選びます。[GMT22のstrict近似定理](../GMT22/index.md#thm-gmt22-smooth-approx)を局所化し、$u_j,v_j$ を滑らかな関数で

$$
u_j\to\chi_E,\quad v_j\to\chi_F\quad\text{in }L^1(V),
\qquad
\int_V|\nabla u_j|\to P(E;V),\quad
\int_V|\nabla v_j|\to P(F;V)
$$

となるように取ります（例えば小さな畳み込み半径を選び、$\partial V$ の周長質量が0であることを使います）。滑らかな関数の $\max(u_j,v_j)$ と $\min(u_j,v_j)$ はLipschitzで、$u_j>v_j$ では前者の勾配は $\nabla u_j$、後者は $\nabla v_j$ です。$u_j<v_j$ では逆で、等号集合では $\nabla u_j=\nabla v_j$ がa.e.成り立ちます。従って

$$
|\nabla\max(u_j,v_j)|+|\nabla\min(u_j,v_j)|
=|\nabla u_j|+|\nabla v_j|\quad\text{a.e. on }V.
$$

$\max,\min$ は引数について $L^1$-Lipschitzなので、左辺の二つの関数はそれぞれ $\chi_{E\cup F}$ と $\chi_{E\cap F}$ に $L^1(V)$ 収束します。[全変動の下半連続性](../GMT22/index.md#thm-gmt22-lsc)を各々へ適用して和を取ると

$$
\begin{aligned}
P(E\cup F;V)+P(E\cap F;V)
&\le\liminf_j\int_V|\nabla\max(u_j,v_j)|\\
&\quad+\liminf_j\int_V|\nabla\min(u_j,v_j)|\\
&\le\liminf_j\int_V
(|\nabla u_j|+|\nabla v_j|)\\
&=P(E;V)+P(F;V).
\end{aligned}
$$

コンパクト集合を含むこのような $V$ を選べるので、局所有限周長が従います。任意の開 $U\subset\Omega$ については、周長のRadon測度としての内正則性から $V$ を増大させれば同じ不等式です。

最後に、$\chi_{E^c}=1-\chi_E$ と

$$
\chi_{E\cup F}+\chi_{E\cap F}=\chi_E+\chi_F
$$

を分布微分し、$\mathcal G=-D\chi$ を代入します。この段階で各集合は有限周長と分かっているので、ベクトル値測度の等式として正当です。[GMT24の既出命題](../GMT24/index.md#prop-gmt24-set-operations)とも一致します。
<!-- proof-end -->

### 例：共有面と法線の相殺

先の隣接する二つの単位正方形では、$P(Q_1)+P(Q_2)=8$、$P(Q_1\cup Q_2)=6$、$P(Q_1\cap Q_2)=0$ です。両集合が共有する線分で外向き法線が逆向きになり、$1+1$ の二つの周長寄与が消えます。逆に同じ集合を二回使えば、和・共通部分はどちらも元の集合で、$2P(E)=2P(E)$ と等号です。

ここで $\partial(E\cup F)=\partial E\cup\partial F$ は**一般には偽**です。また $\mathcal G_{E\cup F}=\mathcal G_E+\mathcal G_F$ も一般には偽です。正しい測度恒等式には $\mathcal G_{E\cap F}$ が入ります。

## 4. 境界を水平に薄切りする

今度は $x=(x',s)\in\mathbb R^{d-1}\times\mathbb R$ と分けます。高さ $t$ での断面は

$$
E_t=\{x'\in\mathbb R^{d-1}:(x',t)\in E\}.
$$

これは $E$ の **断面集合** であり、半空間 $H_t=\{s<t\}$ と交わらせた集合とは異なります。$E_t$ は代表の選び方により例外的な高さでは変わり得ますが、[Fubiniの定理](../../F0/F0-00D2C/index.md#thm-f0-00d2c-02)によりほとんどすべての $t$ で差は消えます。

ここで元の境界 $S=\partial^*E$ 上の法線を $\nu_E^*=(\nu'(x),\nu_d(x))$ と分けます。高さ写像 $h(x)=s$ の境界接平面上での微分の長さは

$$
J^S_1h(x)=|\pi_{T_xS}e_d|
=\sqrt{1-(\nu_E^*(x)\cdot e_d)^2}=|\nu'(x)|.
$$

理由は、法線方向 $e_d\cdot\nu_E^*$ を $e_d$ から引いた $\pi_{T_xS}e_d=e_d-(e_d\cdot\nu_E^*)\nu_E^*$ の長さの二乗が $1-(e_d\cdot\nu_E^*)^2$ だからです。[GMT27の整流可能性](../GMT27/index.md#thm-gmt27-de-giorgi-structure)により接平面は面積a.e.存在します。**水平な境界片は $|\nu'|=0$ なので、典型的な水平断面の境界へは寄与しません。**

<a id="thm-gmt28-hyperplane-slicing"></a>

<!-- formal-statement-start -->
> **定理（超平面切断の周長とcoarea）**
> $d\ge2$、$E\subset\mathbb R^d$ は局所有限周長を持つLebesgue可測集合とする。$S=\partial^*E$、$\nu_E^*=(\nu',\nu_d)$ とする。ほとんどすべての $t\in\mathbb R$ に対して、断面 $E_t\subset\mathbb R^{d-1}$ は局所有限周長を持ち、任意の開集合 $A\subset\mathbb R^{d-1}$ について

$$
P(E_t;A)=\int_{\substack{x\in S\cap(A\times\{t\})\\|\nu'(x)|>0}}
d\mathcal A^{d-2}(x).
$$

> その断面の外向き法線は、右辺の面積ほとんど至る所で $\nu'(x)/|\nu'(x)|$ に一致する。任意の有界な開集合 $A\subset\mathbb R^{d-1}$ と有界区間 $I\subset\mathbb R$ に対して

$$
\boxed{\displaystyle
\int_I P(E_t;A)\,dt
=\int_{S\cap(A\times I)}|\nu'(x)|\,d\mathcal A^{d-1}(x)
\le P(E;A\times I).}
$$

> 断面の周長は $(d-1)$ 次元で測り、右辺の境界面積は $(d-1)$ 次元のままである。$d=2$ の断面境界には $\mathcal A^0$（点の個数）を使う。
<!-- formal-statement-end -->

### 証明の見取り図

[整流可能集合上のcoarea](../GMT14/index.md#thm-gmt14-coarea)を境界 $S$ と高さ写像 $h$ に適用し、面積を断面へ分解します。ただし coarea の右辺が直ちに断面の**周長**だとは言えません。前の[境界積分定理](#thm-gmt28-boundary-integration)を横方向のテスト場へ適用し、Fubiniで断面ごとの分布微分を同定して初めて、それが $P(E_t)$ と分かります。

<!-- proof-start -->
### 証明

一つの有界直方体 $A_0\times I_0$ で局所化して証明します。$\mathcal A^{d-1}(S\cap(A_0\times I_0))<\infty$ です。[GMT14の整流可能集合上のcoarea公式](../GMT14/index.md#cor-gmt14-rectifiable-coarea)（[GMT13の整流可能集合上の面積公式](../GMT13/index.md#thm-gmt13-rectifiable-area)による拡張部分）を、$S$ の可算Lipschitz片上で $h(x)=x_d$ に適用します。$\mathcal A^k=c_k^{-1}\mathcal H^k$ で正規化すると

$$
\int_{S\cap(A_0\times I_0)}g(x)|\nu'(x)|\,d\mathcal A^{d-1}(x)
=\int_{I_0}\int_{S\cap(A_0\times\{t\})}
g(x)\,d\mathcal A^{d-2}(x)\,dt
$$

が非負可測 $g$ に対して成立します。$\nu'=0$ の集合は左辺に寄与せず、右辺でもほとんどすべての高さで $\mathcal A^{d-2}$-零です。この公式へ $g=\mathbf1_{\{|\nu'|>0\}}$ を入れると、右辺の断面面積は $t$ について局所可積分になります。

横方向成分 $i\in\{1,\dots,d-1\}$ と $\psi\in C_c^1(A_0)$、$\eta\in C_c^1(I_0)$ を固定し、

$$
\Phi(x',s)=\eta(s)\psi(x')e_i
$$

を[境界積分定理](#thm-gmt28-boundary-integration)へ代入します。Fubiniとcoarea（符号付き関数には正負部分を適用）から

$$
\begin{aligned}
\int_{I_0}\eta(t)\int_{E_t}\partial_i\psi(x')\,dx'\,dt
&=\int_{S}\eta(s)\psi(x')\nu_i(x)\,d\mathcal A^{d-1}(x)\\
&=\int_{I_0}\eta(t)
\int_{\substack{S\cap(A_0\times\{t\})\\|\nu'|>0}}
\psi(x')\frac{\nu_i(x)}{|\nu'(x)|}\,d\mathcal A^{d-2}(x)\,dt.
\end{aligned}
$$

両辺の $t$ に関する被積分関数は局所可積分なので、$\eta$ の任意性によりa.e. $t$ で等しいです。$i$ は有限個、$\psi$ は $C_c^1(A_0)$ の可算稠密族から始め、上の断面測度の局所有限性で一般の $\psi$ へ拡張します。$A_0,I_0$ は有理端点の可算直方体で尽くせるため、例外高さを一つの零集合へまとめられます。

そこでa.e. $t$ の断面の分布微分は、$A_0$ 上で

$$
-D_{x'}\chi_{E_t}
=\frac{\nu'(x',t)}{|\nu'(x',t)|}\,
\mathcal A^{d-2}\llcorner
\bigl\{(x',t)\in S:|\nu'(x',t)|>0\bigr\}
$$

です。右辺の密度は長さ1であり、断面の $x'$ と元の $(x',t)$ は一対一に対応するので、全変動はちょうどこの $\mathcal A^{d-2}$ です。これで断面の局所有限周長と周長・法線の表示が同時に分かりました。最後に先ほどのcoarea公式を $g=\mathbf1_{\{|\nu'|>0\}}$ に適用すると

$$
\int_I P(E_t;A)\,dt
=\int_{S\cap(A\times I)}|\nu'|\,d\mathcal A^{d-1}
\le\int_{S\cap(A\times I)}1\,d\mathcal A^{d-1}
=P(E;A\times I).
$$

任意の $A,I$ は内側から可算個の直方体で近似し、測度の単調収束で拡張できます。
<!-- proof-end -->

### 例：長方形を水平に切る

$E=(0,2)\times(0,1)$ とし、$x' =x$、$s=y$ とします。$0<t<1$ では $E_t=(0,2)$ で、一次元の周長は左右二点の数

$$
P(E_t;\mathbb R)=2
$$

です。$t\notin[0,1]$ では断面は空なので周長0。従って $\int_{\mathbb R}P(E_t)\,dt=2$。一方元の矩形の左右の辺で法線は $\pm e_1$ だから $|\nu'|=1$、上下辺では法線が $\pm e_2$ で $|\nu'|=0$ です。従って境界側も $1+1=2$。元の周長6と混同しないでください。

## 5. 半空間との交わりは、新しい切断面を作る

断面の周長 $P(E_t)$ と、**切った集合** $E\cap H_t$ の周長は違います。例えば長方形を半分にすると、新しい水平の辺が一本生まれます。その長さは断面の **長さ $\mathcal L^1(E_t)$** であり、断面の周長（端点数）ではありません。一般次元でも新しい面を測るのは $\mathcal L^{d-1}(E_t)$ です。

<a id="prop-gmt28-halfspace-cut"></a>

<!-- formal-statement-start -->
> **命題（半空間切断の周長公式）**
> $E\subset\mathbb R^d$ を有界なLebesgue可測集合で、有限周長を持つとする。$H_t=\{(x',s):s<t\}$ と置く。ほとんどすべての $t\in\mathbb R$ に対して、$E\cap H_t$ は有限周長を持ち、ベクトル値測度および周長について

$$
\boxed{\displaystyle
\mathcal G_{E\cap H_t}
=\mathcal G_E\llcorner H_t
+e_d\,\bigl(\mathcal L^{d-1}\llcorner E_t\bigr)
\otimes\delta_t,}
$$

$$
\boxed{\displaystyle
P(E\cap H_t)
=P(E;H_t)+\mathcal L^{d-1}(E_t).}
$$

> $\delta_t$ は高さ $t$ への点質量である。新しい面の外向き法線は $+e_d$。この公式をすべての $t$ に無条件で拡張してはならない。
<!-- formal-statement-end -->

### 証明の見取り図

高さが $t$ より下で1、上で0となる滑らかな cutoff を [境界積分定理](#thm-gmt28-boundary-integration)に掛けます。高さ微分だけが薄い帯に集中し、極限で断面の面積が現れます。境界面積測度が平面に質量を持たない一般の $t$ では、古い境界と新しい水平面が互いに素なので、全変動が足せます。

<!-- proof-start -->
### 証明

有限周長より $\mu_E(\mathbb R^d)<\infty$ です。互いに素な水平超平面に正の測度質量を持てる高さは高々可算個なので、a.e. $t$ で $\mu_E(\{s=t\})=0$ です。また[Fubiniの定理](../../F0/F0-00D2C/index.md#thm-f0-00d2c-02)による切断の可積分性と[GMT1のLebesgue微分定理](../GMT1/index.md#thm-gmt1-function-differentiation)を高さ変数の一次元Lebesgue測度へ適用することにより、a.e. $t$ で $E_t$ は有限面積を持ち、任意のコンパクト台連続関数 $f$ に対して

$$
\lim_{\varepsilon\downarrow0}\frac1\varepsilon
\int_t^{t+\varepsilon}\int_{E_s}f(x',s)\,dx'\,ds
=\int_{E_t}f(x',t)\,dx'
$$

が成立します（まず可算稠密な $f$ で同時に成立させ、一様近似で一般の $f$ へ広げます）。これらの条件を満たす $t$ を固定します。

滑らかな $\theta_\varepsilon(s)$ を $s\le t$ で1、$s\ge t+\varepsilon$ で0、$-1/\varepsilon$ 程度の非正の導関数を持ち $\int\theta_\varepsilon'=-1$ となるように取ります。$\Phi\in C_c^1(\mathbb R^d;\mathbb R^d)$ に対して [境界積分定理](#thm-gmt28-boundary-integration)を $\theta_\varepsilon\Phi$ に適用すると

$$
\int_E\theta_\varepsilon\operatorname{div}\Phi\,dx
+\int_E\theta_\varepsilon'\Phi_d\,dx
=\int_S\theta_\varepsilon\Phi\cdot\nu_E^*\,d\mathcal A^{d-1}.
$$

左の第一項は支配収束で $\int_{E\cap H_t}\operatorname{div}\Phi$ へ、第二項は上の断面の微分定理から $-\int_{E_t}\Phi_d(x',t)\,dx'$ へ収束します。右辺は $\mu_E(\{s=t\})=0$ により $\int_{S\cap H_t}\Phi\cdot\nu_E^*\,d\mathcal A^{d-1}$ へ収束します。移項すれば

$$
\int_{E\cap H_t}\operatorname{div}\Phi\,dx
=\int_{S\cap H_t}\Phi\cdot\nu_E^*\,d\mathcal A^{d-1}
+\int_{E_t}\Phi(x',t)\cdot e_d\,dx'.
$$

テスト場の任意性と[Gauss--Green測度の一意性](../GMT24/index.md#thm-gmt24-gauss-green)から第一の測度恒等式が従います。二つの項はそれぞれ $H_t$ と $\{s=t\}$ に集中して互いに特異であり、後者の密度は $|e_d|=1$ です。よって全変動を取ると

$$
|\mathcal G_{E\cap H_t}|(\mathbb R^d)
=\mu_E(H_t)+\mathcal L^{d-1}(E_t),
$$

すなわち第二の公式が得られます。
<!-- proof-end -->

### 例：長方形と例外高さ

$E=(0,2)\times(0,1)$ の高さ $t=1/2$ では、古い境界のうち $y<1/2$ にある長さは、底辺2と左右の縦辺の各 $1/2$ の和で3です。切断面は長さ2なので

$$
P(E\cap\{y<1/2\})=3+2=5.
$$

一方 $t=1$ は **例外高さ** です。この場合 $E\cap H_1=E$ で周長6ですが、$P(E;H_1)=4$（底辺2、左右辺各1）、開集合代表では $E_1=\varnothing$ で $\mathcal L^1(E_1)=0$ です。「4+0=6」とはなりません。もとの上辺がまさに切断超平面上にあり、$\mu_E(\{y=1\})=2$ だからです。この点が、a.e.条件を落とせない仕組みです。

## 6. 何を使い分けるか

- 境界の **向きと流束** を知りたいなら、[Gauss--Green境界積分](#thm-gmt28-boundary-integration)を使います。
- 和・共通部分の **総周長** を比較するなら、[集合演算の劣加法性](#thm-gmt28-perimeter-submodularity)を使います。ベクトル測度恒等式を総周長の等式に変えてはいけません。
- 高さで切った **断面そのものの周長** なら、[超平面切断のcoarea](#thm-gmt28-hyperplane-slicing)です。重みは $|\nu'|$ です。
- 下半分として残した **立体の周長** なら、[半空間切断公式](#prop-gmt28-halfspace-cut)です。新しくできた面の寄与は $\mathcal L^{d-1}(E_t)$ です。

次の演習では、円盤・多角形・例外高さについてこれらを実際に使い分けます。

## 7. 演習

### Level A：境界積分と断面の計算

<a id="ex-gmt28-a01"></a>
### GMT28-A01 円盤の流束

- Level: A

$E=B_R(0)\subset\mathbb R^2$、$R>0$ とする。$\Phi(x,y)=(2x,y)$ に対する[境界積分公式](#thm-gmt28-boundary-integration)の両辺を別々に積分し、一致を確認せよ。

<!-- solution-start -->
#### 詳細解答

$\operatorname{div}\Phi=\partial_x(2x)+\partial_y(y)=3$ だから

$$
\int_E\operatorname{div}\Phi\,dx\,dy=3|E|=3\pi R^2.
$$

境界の点は $(R\cos\theta,R\sin\theta)$、外向き法線は $(\cos\theta,\sin\theta)$、弧長要素は $ds=R\,d\theta$ です。従って

$$
\begin{aligned}
\int_{\partial^*E}\Phi\cdot\nu\,ds
&=\int_0^{2\pi}
(2R\cos^2\theta+R\sin^2\theta)R\,d\theta\\
&=R^2(2\pi+\pi)=3\pi R^2.
\end{aligned}
$$

$\Phi$ は全空間でコンパクト台を持たないので、厳密には閉円盤の近傍で1となる滑らかな cutoff を掛けて定理を使います。領域と境界では値が変わらないため計算も変わりません。
<!-- solution-end -->

<a id="ex-gmt28-a02"></a>
### GMT28-A02 補集合の外向き法線

- Level: A

$E=(0,2)\times(0,1)$ とし、$\Phi=(0,1)$ とする。$P(E^c)$ と、上下の水平辺における $E,E^c$ の外向き法線を求め、境界積分の符号が反転することを確かめよ。

<!-- solution-start -->
#### 詳細解答

$P(E)=2(2+1)=6$ です。[集合演算と相似変換の境界測度恒等式](../GMT24/index.md#prop-gmt24-set-operations)から $P(E^c)=6$ も従います。上辺の法線は $E$ に対し $(0,1)$、下辺では $(0,-1)$。補集合ではそれぞれ反対向きになります。

上辺と下辺での流束を分けて計算します。$\Phi=(0,1)$ とすると

$$
\begin{array}{c|cc}
 & \text{上辺} & \text{下辺}\\ \hline
E & +2 & -2\\
E^c & -2 & +2
\end{array}
$$

です。縦辺の内積は0。両集合とも合計は0ですが、各辺の流束の符号は逆です。定数場はcutoffして、境界と対象集合を含む有界領域で局所的に考えればよいです。
<!-- solution-end -->

<a id="ex-gmt28-a03"></a>
### GMT28-A03 長方形の断面周長

- Level: A

$E=(0,a)\times(0,b)$、$a,b>0$ とし、水平断面 $E_t$ の周長をa.e. $t$ で求めよ。また[切断のcoarea公式](#thm-gmt28-hyperplane-slicing)の両辺を計算せよ。

<!-- solution-start -->
#### 詳細解答

$0<t<b$ では $E_t=(0,a)$ であり、一次元の外向き法線は左端で $-1$、右端で $+1$ です。従って $P(E_t;\mathbb R)=1+1=2$。区間外では断面は空です。よって

$$
\int_{\mathbb R}P(E_t)\,dt=\int_0^b2\,dt=2b.
$$

元の境界の垂直な左右辺では $\nu'=\pm1$、各辺の長さは $b$。水平な上下辺では $\nu'=0$ です。従って右辺は $b+b=2b$。$a$ に依存しないのは断面の**長さ**でなく**端点数**を積分しているからです。
<!-- solution-end -->

<a id="ex-gmt28-a04"></a>
### GMT28-A04 長方形の下側を残す

- Level: A

$E=(0,3)\times(0,2)$ を $t=1/2$ で水平切断した集合 $E\cap\{y<t\}$ の周長を、[半空間切断公式](#prop-gmt28-halfspace-cut)と直接の長方形周長計算の二通りで求めよ。

<!-- solution-start -->
#### 詳細解答

古い境界のうち $y<1/2$ にある部分は底辺の長さ3と縦辺二本の長さ $1/2$ の和で、$P(E;\{y<1/2\})=3+1/2+1/2=4$ です。高さ $1/2$ の断面 $E_t=(0,3)$ のLebesgue長さは3だから

$$
P(E\cap\{y<1/2\})=4+3=7.
$$

一方切断後の集合は $(0,3)\times(0,1/2)$ とa.e.等しいので、長方形の周長 $2(3+1/2)=7$。断面の周長2を足して $4+2$ としてはいけません。
<!-- solution-end -->

<a id="ex-gmt28-a05"></a>
### GMT28-A05 例外高さを見つける

- Level: A

$E=(0,1)\times(0,1)$ の $t=1$ で、切断周長の公式を形式的に適用すると何が起きるか。失われた仮定を測度で特定せよ。

<!-- solution-start -->
#### 詳細解答

$E\cap\{y<1\}=E$ なので周長は4。一方、開集合代表では $E_1=\varnothing$、$P(E;\{y<1\})$ は底辺1と縦辺各1の和で3です。形式的な右辺は $3+0=3$ となり4に一致しません。元の上辺は $\{y=1\}$ に載り、

$$
\mu_E(\{y=1\})=\mathcal A^1((0,1)\times\{1\})=1\ne0.
$$

[半空間切断公式](#prop-gmt28-halfspace-cut)の証明では、$\mu_E(\{y=t\})=0$ を使ってcutoffの右辺を $\mu_E\llcorner\{y<t\}$ へ収束させていました。この条件が失われるため、上辺の寄与が消えたままになってしまうのです。
<!-- solution-end -->

### Level B：主要結果を接続する

<a id="ex-gmt28-b01"></a>
### GMT28-B01 隣接する正方形と厳密な不等号

- Level: B

$E=(0,1)^2$、$F=(1,2)\times(0,1)$ とする。[周長の劣加法性](#thm-gmt28-perimeter-submodularity)の両辺を計算し、不等式が真に厳しくなる理由を、共有辺上のGauss--Green測度の向きから説明せよ。

<!-- solution-start -->
#### 詳細解答

各正方形の周長は4で、和は8。$E\cap F=\varnothing$ だから $P(E\cap F)=0$。$E\cup F$ と $(0,2)\times(0,1)$ は共有辺を含むかどうかだけ異なり、Lebesgue a.e.等しいので、その周長は $2(2+1)=6$ です。従って

$$
P(E\cup F)+P(E\cap F)=6<8=P(E)+P(F).
$$

共有辺 $\{1\}\times(0,1)$ 上で $E$ の外向き法線は $+e_1$、$F$ の外向き法線は $-e_1$ です。[Gauss--Green測度の表示](#thm-gmt28-boundary-integration)によれば、この辺に集中するベクトル測度は互いに逆向きで打ち消されます。一方全変動を先に取ると $1+1=2$ の境界量を数えます。二重に数えた2の差が、$8-6$ の正体です。
<!-- solution-end -->

<a id="ex-gmt28-b02"></a>
### GMT28-B02 円盤断面と円周のcoarea

- Level: B

$E=B_R(0)\subset\mathbb R^2$ を水平に切る。a.e. $t$ での $P(E_t)$ を求め、境界側の積分

$$
\int_{\partial^*E}|\nu'(x)|\,ds
$$

を円周の角度表示で計算して、[超平面切断の公式](#thm-gmt28-hyperplane-slicing)を検証せよ。

<!-- solution-start -->
#### 詳細解答

$|t|<R$ の断面は

$$
E_t=(-\sqrt{R^2-t^2},\sqrt{R^2-t^2})
$$

という長さが正の開区間なので、その両端の点を数えて $P(E_t)=2$ です。$|t|>R$ では空集合で0。よって左辺は $\int_{-R}^R2\,dt=4R$ です。

円周上の点を $(R\cos\theta,R\sin\theta)$ とおくと、外向き法線は $(\cos\theta,\sin\theta)$、従って $|\nu'|=|\cos\theta|$ で、弧長要素は $R\,d\theta$。右辺は

$$
\int_0^{2\pi}R|\cos\theta|\,d\theta
=4R\int_0^{\pi/2}\cos\theta\,d\theta
=4R.
$$

上下の点では $|\nu'|=0$ ですが、その二点は弧長零でもあります。$P(E)=2\pi R$ と $4R$ は異なる量です。
<!-- solution-end -->

<a id="ex-gmt28-b03"></a>
### GMT28-B03 cutoffの微分から法線の符号を復元する

- Level: B

有限周長集合 $E\subset\mathbb R^d$ と、$\mu_E(\{s=t\})=0$ かつ断面微分定理の成り立つ高さ $t$ を考える。[境界積分公式](#thm-gmt28-boundary-integration)を $\theta_\varepsilon(s)\Phi(x',s)$ に適用し、なぜ切断面の法線が $-e_d$ でなく $+e_d$ になるのか説明せよ。

<!-- solution-start -->
#### 詳細解答

$\theta_\varepsilon$ を下側で1、上側で0とするため、$\theta_\varepsilon'\le0$ かつ $\int\theta_\varepsilon'=-1$ です。積の発散を展開すると

$$
\operatorname{div}(\theta_\varepsilon\Phi)
=\theta_\varepsilon\operatorname{div}\Phi
+\theta_\varepsilon'\Phi_d.
$$

従って境界積分から得る極限式は

$$
\int_{E\cap H_t}\operatorname{div}\Phi
-\int_{E_t}\Phi_d
=\int_{\partial^*E\cap H_t}\Phi\cdot\nu_E^*\,d\mathcal A^{d-1}.
$$

第二項を右辺へ移すと $+\int_{E_t}\Phi\cdot e_d$ です。これにより切断後の集合から上へ出る法線が $+e_d$ と分かります。$-e_d$ と誤記すると、この移項の符号と矛盾します。高さ $t$ で元の境界測度が質量を持たない条件は、右辺のcutoff極限で古い境界を平面上に残さないために必要です。
<!-- solution-end -->

<a id="ex-gmt28-b04"></a>
### GMT28-B04 局所周長の劣加法性を導く

- Level: B

$u,v\in C^1(\Omega)$ とし、$w=\max(u,v)$、$z=\min(u,v)$ とする。まずa.e.の勾配について

$$
|\nabla w|+|\nabla z|=|\nabla u|+|\nabla v|
$$

を証明せよ。その後、これを有限周長集合の特徴関数へ近似適用すると、なぜ等号でなく周長の **不等号** だけが得られるかを述べよ。

<!-- solution-start -->
#### 詳細解答

$u>v$ の開集合では $w=u,z=v$、$u<v$ では $w=v,z=u$ なので等式は成り立ちます。等号集合 $\{u=v\}$ では、微分可能な関数 $u-v$ が0になる集合上でその勾配はLebesgue a.e.0です。よって $\nabla u=\nabla v$ がa.e.成り立ち、$w,z$ のa.e.勾配もこの共通値です。従って各場合で等式が成立します。

次に [GMT22のstrict近似](../GMT22/index.md#thm-gmt22-smooth-approx)で $\chi_E,\chi_F$ を $u_j,v_j$ へ近似します。$\max,\min$ は $L^1$ 極限で $\chi_{E\cup F},\chi_{E\cap F}$ を与え、勾配の積分の和は近似の各段階で一致します。しかし [全変動の下半連続性](../GMT22/index.md#thm-gmt22-lsc)から得られるのは

$$
P(E\cup F;U)+P(E\cap F;U)
\le\liminf_j\int_U
(|\nabla u_j|+|\nabla v_j|).
$$

極限操作では個々の全変動が減る可能性があるため、等号は保証されません。共有面で法線が相殺されるB01は不等号が実際に厳しくなる例です。
<!-- solution-end -->

### Level C：複数の公式で円弧と切断面を確かめる

<a id="ex-gmt28-c01"></a>
### GMT28-C01 円盤を高さ $t$ で切る

- Level: C

$E=B_R(0)\subset\mathbb R^2$、$-R<t<R$ とし、$F_t=E\cap\{y<t\}$ を考える。

1. 元の円周のうち $y<t$ にある弧の長さと、新しい水平切断面の長さを求めよ。
2. [半空間切断公式](#prop-gmt28-halfspace-cut)から $P(F_t)$ を求めよ。$t=0$ と $t\to R^-$ の値を検算せよ。
3. $V(t)=\mathcal L^2(F_t)$ を直接積分し、$V'(t)$ が切断面の長さに等しいことを示せ。

<!-- solution-start -->
#### 詳細解答

**1. 弧と切断面。** 円周を $(R\cos\theta,R\sin\theta)$ と媒介表示すると、高さ条件は $\sin\theta<t/R$ です。$\alpha=\arcsin(t/R)\in(-\pi/2,\pi/2)$ とおけば、$y<t$ の円弧に対応する角度集合の総長は $\pi+2\alpha$。弧長要素が $R\,d\theta$ なので、その弧長は

$$
L_{\mathrm{arc}}(t)=R\bigl(\pi+2\arcsin(t/R)\bigr).
$$

$y=t$ の断面は $x^2<R^2-t^2$ を満たす区間だから、そのLebesgue長さは

$$
L_{\mathrm{cut}}(t)=2\sqrt{R^2-t^2}.
$$

**2. 切断後の周長。** $-R<t<R$ では円周が高さ $t$ に接するのは高々二点で $\mu_E(\{y=t\})=0$ です。[切断周長公式](#prop-gmt28-halfspace-cut)で、残る円弧と新しい弦の寄与を足すと

$$
\boxed{P(F_t)=R\bigl(\pi+2\arcsin(t/R)\bigr)
+2\sqrt{R^2-t^2}.}
$$

$t=0$ では半円弧 $\pi R$ と直径 $2R$ の和、$P(F_0)=\pi R+2R$ です。$t\to R^-$ では $\arcsin(t/R)\to\pi/2$、弦は0へ収束し、$P(F_t)\to2\pi R=P(E)$。いずれも幾何学的な形と一致します。

**3. 面積の導関数。** 水平断面の長さでFubini積分を作ると

$$
V(t)=\int_{-R}^{t}2\sqrt{R^2-s^2}\,ds.
$$

原始関数は次の形です。

$$
\int2\sqrt{R^2-s^2}\,ds
=s\sqrt{R^2-s^2}+R^2\arcsin(s/R)+C.
$$

この式へ下端 $-R$ を代入すれば

$$
V(t)=t\sqrt{R^2-t^2}
+R^2\left(\arcsin(t/R)+\frac{\pi}{2}\right).
$$

微分すると、第一項の微分が $\sqrt{R^2-t^2}-t^2/\sqrt{R^2-t^2}$、第二項の微分が $R^2/\sqrt{R^2-t^2}$ なので

$$
\begin{aligned}
V'(t)
&=\sqrt{R^2-t^2}
+\frac{R^2-t^2}{\sqrt{R^2-t^2}}\\
&=2\sqrt{R^2-t^2}=L_{\mathrm{cut}}(t).
\end{aligned}
$$

ここで $V'(t)$ は **断面の長さ**、$P((E)_t)=2$ は **断面の周長**、$P(F_t)$ は **切った二次元集合の周長** です。三つを区別することが本問の結論です。
<!-- solution-end -->
