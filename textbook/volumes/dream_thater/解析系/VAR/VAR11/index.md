# VAR11 Palais–Smale・Ekeland・minimax

[VAR9の最小化の直接法](../VAR9/index.md#thm-var9-direct-method)と[VAR10のTonelli型存在定理](../VAR10/index.md#thm-var10-tonelli-existence)は、下に有界なエネルギーから最小点を得る方法を示しました。しかし、両端が低く中間に山のあるエネルギーでは、山頂の停留点も重要です。たとえば二つの安定配置の間の遷移状態は、最小点ではなく鞍点になることがあります。

最小化列の代わりに「関数値がある高さへ近づき、導関数が零へ近づく列」を作り、それが収束する条件を確かめます。そのために、まず微分と臨界点を区別し、Ekelandの変分原理、minimaxとPalais–Smale条件へ進みます。一般のHamilton系の作用が自動的にコンパクト性を持つわけではありません。

## 1. 微分可能性と臨界点

以下、$H$ は実Hilbert空間、内積を $\langle\cdot,\cdot\rangle$、ノルムを $\|\cdot\|$ とします。汎関数 $\Phi:H\to\mathbb R$ の値は実数です。有限次元の導関数と異なり、無限次元では方向ごとの微分だけでは一様な線形近似を保証できません。

<a id="def-var11-frechet"></a>
<!-- formal-statement-start -->
> **定義（Gâteaux微分とFréchet微分）**  
> $u\in H$ で全ての $h\in H$ について極限 $\lim_{t\to0}(\Phi(u+th)-\Phi(u))/t$ が存在し、その値が $h$ の有界線形汎関数 $L(h)$ なら、$L$ を $u$ におけるGâteaux微分という。さらに
$$
\lim_{\|h\|\to0,\ h\ne0}
\frac{|\Phi(u+h)-\Phi(u)-L(h)|}{\|h\|}=0
$$
> なら $L=D\Phi(u)$ をFréchet微分という。$u\mapsto D\Phi(u)$ が作用素ノルムで連続なら $\Phi\in C^1(H,\mathbb R)$ と書く。
<!-- formal-statement-end -->

<!-- definition-example-start: def-var11-frechet -->
**直接例**。固定した $f\in H$ に対し $\Phi(u)=\frac12\|u-f\|^2$ とすると
$$
\Phi(u+h)-\Phi(u)
=\langle u-f,h\rangle+\frac12\|h\|^2.
$$
従って $L(h)=\langle u-f,h\rangle$ は有界線形で、残差を $\|h\|$ で割ると $\|h\|/2\to0$ です。$D\Phi(u)h=\langle u-f,h\rangle$、勾配は $\nabla\Phi(u)=u-f$ です。
<!-- definition-example-end -->

**方向ごとの極限では足りない例**。$\mathbb R^2$ で $g(0,0)=0$、
$$
g(x,y)=\frac{x^3y}{x^4+y^2}\quad ((x,y)\ne(0,0))
$$
とします。$|g(x,y)|\le |x|/2$ なので連続ですが、$h=(a,b)$ とすると $b\ne0$ の場合
$$
\frac{g(ta,tb)}t
=\frac{t a^3b}{t^2a^4+b^2}\longrightarrow0,
$$
$b=0$ でも同じ極限は0です。しかし $y=x^2$ に沿えば $g(x,x^2)=x/2$ です。原点からの距離は $|x|\sqrt{1+x^2}$ なので、零写像を線形近似とするFréchet条件は破れます。

<a id="def-var11-critical"></a>
<!-- formal-statement-start -->
> **定義（臨界点と臨界値）**  
> 実Hilbert空間 $H$ 上の $\Phi\in C^1(H,\mathbb R)$ について $D\Phi(u)=0$ を満たす $u\in H$ を臨界点、$\Phi(u)$ を臨界値という。Riesz表現による $\nabla\Phi(u)\in H$ は $D\Phi(u)h=\langle\nabla\Phi(u),h\rangle$ を満たすため、臨界点条件は $\nabla\Phi(u)=0$ と同値である。
<!-- formal-statement-end -->

<!-- definition-example-start: def-var11-critical -->
**直接例**。$\Phi(x)=x^4-2x^2$ ($H=\mathbb R$) では $\Phi'(x)=4x(x^2-1)$ より $x=0,\pm1$ が臨界点です。$\Phi''(0)=-4$ で0は極大点、$\Phi''(\pm1)=8$ で $\pm1$ は極小点です。臨界点という語は最小点を意味しません。
<!-- definition-example-end -->

## 2. 近似的な臨界点が収束する条件

[VAR9の直接法](../VAR9/index.md#thm-var9-direct-method)は最小化列の弱収束と弱下半連続性で議論しました。鞍点では最小化列そのものが使えないため、導関数も小さくなる列を考えます。

<a id="def-var11-ps"></a>
<!-- formal-statement-start -->
> **定義（Palais–Smale列とコンパクト性条件）**  
> 実Hilbert空間 $H$ と $\Phi\in C^1(H,\mathbb R)$、$c\in\mathbb R$ に対し、列 $(u_n)\subset H$ が
$$
\Phi(u_n)\longrightarrow c,\qquad
\|D\Phi(u_n)\|_{H^*}=\|\nabla\Phi(u_n)\|\longrightarrow0
$$
> を満たすとき、レベル $c$ のPalais–Smale列（PS列）という。レベル $c$ の**(PS)条件**とは、そのような全ての列に強収束部分列が存在することである。全ての $c\in\mathbb R$ で成立するとき(PS)条件が成り立つという。
<!-- formal-statement-end -->

<!-- definition-example-start: def-var11-ps -->
**直接例**。$\Phi(u)=\frac12\|u-f\|^2$ なら $\nabla\Phi(u)=u-f$。PS列について $\|u_n-f\|\to0$ なので $u_n\to f$ と強収束します。逆に $\Phi(x)=e^{-x^2}$ ($H=\mathbb R$) では $x_n=n$ に対して $\Phi(x_n)\to0$、$\Phi'(x_n)=-2ne^{-n^2}\to0$ ですが、$x_n$ は収束部分列を持ちません。これはレベル0の(PS)が破れる直接例です。
<!-- definition-example-end -->

<a id="prop-var11-ps-critical"></a>
<!-- formal-statement-start -->
> **命題（(PS)条件による臨界点の回収）**  
> $H$ が実Hilbert空間、$\Phi\in C^1(H,\mathbb R)$ で、レベル $c$ の(PS)条件を満たすとする。レベル $c$ のPS列が一つでも存在すれば、$\Phi(u)=c$ かつ $D\Phi(u)=0$ となる $u\in H$ が存在する。
<!-- formal-statement-end -->

### 証明の見取り図

PS列自体は収束を約束しません。(PS)を使って強収束部分列を選び、$\Phi$ と $D\Phi$ の連続性で極限に等式を渡します。

<!-- proof-start -->
### 証明

PS列 $(u_n)$ から(PS)により $u_{n_k}\to u$ を取ります。$C^1$ 性から $\Phi(u_{n_k})\to\Phi(u)$、$\|D\Phi(u_{n_k})-D\Phi(u)\|_{H^*}\to0$。一方PS列の定義から左辺の前者は $c$、後者の導関数は零へ収束するので、$\Phi(u)=c$、$D\Phi(u)=0$ です。
<!-- proof-end -->

(PS)がどこで失敗するかも確認します。無限次元の $H=\ell^2$ で標準基底 $e_n$ を取り、
$$
\Psi(u)=\sum_{n=1}^\infty\frac{u_n^2}{n}
$$
とします。$\Psi(e_n)=1/n\to0$、$\|\nabla\Psi(e_n)\|=2/n\to0$ ですが、$\|e_n-e_m\|=\sqrt2$ ($n\ne m$)。有界なPS列でも強収束部分列がないことがあります。弱収束だけでは勾配の零を得るための強いコンパクト性の代わりになりません。

## 3. Ekelandの変分原理：真の極小点がなくても近似する

最小値を取れない関数でも、単なる最小化列では導関数が小さくなるとは限りません。Ekelandの原理は、距離によるわずかな罰則を加えた比較不等式を保証します。ここでは微分可能性すら使わない距離空間版を証明します。

<a id="thm-var11-ekeland"></a>
<!-- formal-statement-start -->
> **定理（Ekelandの変分原理）**  
> $(X,d)$ が非空の完備距離空間、$f:X\to\mathbb R$ が下に有界で下半連続とする。$\varepsilon,\lambda>0$ および
$$
f(x_0)\le\inf_X f+\varepsilon
$$
> を満たす $x_0\in X$ に対し、ある $x_*\in X$ が存在し、次を満たす。
>
> **（E1）** $f(x_*)\le f(x_0)$。
>
> **（E2）** $d(x_*,x_0)\le\lambda$。
>
> **（E3）** 任意の $x\ne x_*$ に対して
$$
f(x)>f(x_*)-\frac{\varepsilon}{\lambda}d(x,x_*).
$$
<!-- formal-statement-end -->

### 証明の見取り図

傾き $\theta=\varepsilon/\lambda$ の「下り坂」を表す集合を繰り返し狭めます。関数値の降下が移動距離を制御するため列はCauchyになります。完備性で極限を得て、下半連続性から比較不等式を極限へ渡します。

<!-- proof-start -->
### 証明

$\theta=\varepsilon/\lambda$ とし、各 $x\in X$ に対して
$$
S(x)=\{y\in X:f(y)+\theta d(y,x)\le f(x)\}
$$
と置きます。$x\in S(x)$ なので空でなく、$f$ の下半連続性と距離の連続性から $S(x)$ は閉集合です。$y\in S(x)$ と $z\in S(y)$ なら
$$
f(z)+\theta d(z,x)
\le f(z)+\theta d(z,y)+\theta d(y,x)
\le f(y)+\theta d(y,x)\le f(x),
$$
ゆえに $S(y)\subset S(x)$ です。

$x_0$ から始め、$x_{n+1}\in S(x_n)$ で
$$
f(x_{n+1})\le\inf_{S(x_n)}f+2^{-n-1}\varepsilon
$$
となるものを選びます。$f(x_{n+1})+\theta d(x_{n+1},x_n)\le f(x_n)$ だから $(f(x_n))$ は単調減少で下に有界です。$m>n$ なら入れ子性から $x_m\in S(x_n)$ なので
$$
\theta d(x_m,x_n)\le f(x_n)-f(x_m)\longrightarrow0
\quad(n,m\to\infty).
$$
従って $(x_n)$ はCauchy列で、完備性により $x_n\to x_*$ です。$x_m\in S(x_n)$ ($m\ge n$) と閉性から $x_*\in S(x_n)$、特に $x_*\in S(x_0)$ です。よって(E1)が成立し、さらに
$$
\theta d(x_*,x_0)\le f(x_0)-f(x_*)
\le f(x_0)-\inf_X f\le\varepsilon
$$
より(E2)も従います。

最後に $y\in S(x_*)$ と仮定すると、入れ子性より全ての $n$ で $y\in S(x_n)$。選択の仕方から
$$
f(y)\ge\inf_{S(x_n)}f
\ge f(x_{n+1})-2^{-n-1}\varepsilon.
$$
$n\to\infty$ で $f(y)\ge\lim_n f(x_n)$ を得ます。また $x_*\in S(x_n)$ と下半連続性から
$$
f(x_*)\le\liminf_n f(x_n)\le
\limsup_n f(x_n)\le f(x_*),
$$
ここで最後は $f(x_n)\ge f(x_*)$ によります。従って $f(y)\ge f(x_*)$ です。一方 $y\in S(x_*)$ なら $f(y)+\theta d(y,x_*)\le f(x_*)$。両者を合わせると $d(y,x_*)=0$、すなわち $y=x_*$。よって $x\ne x_*$ は $S(x_*)$ に入らず、これが(E3)です。
<!-- proof-end -->

<a id="prop-var11-ekeland-slope"></a>
<!-- formal-statement-start -->
> **命題（Ekeland点の勾配評価）**  
> 実Hilbert空間 $H$ 上の下に有界な $\Phi\in C^1(H,\mathbb R)$ で、$\Phi(u_0)\le\inf_H\Phi+\varepsilon$ とする。$\lambda>0$ を選ぶと、ある $u_*\in H$ に対して
$$
\Phi(u_*)\le\Phi(u_0),\quad
\|u_*-u_0\|\le\lambda,\quad
\|D\Phi(u_*)\|_{H^*}\le\varepsilon/\lambda
$$
> が成り立つ。
<!-- formal-statement-end -->

### 証明の見取り図

[Ekelandの変分原理](#thm-var11-ekeland)の不等式へ $u_*+th$ を代入し、$t\downarrow0$ と $t\uparrow0$ の両方向を比べます。

<!-- proof-start -->
### 証明

[Ekelandの変分原理](#thm-var11-ekeland)をノルム距離で適用します。(E1)、(E2)は前二式を与えます。単位ベクトル $h$、$t>0$ に対し(E3)より
$$
\frac{\Phi(u_*+th)-\Phi(u_*)}{t}>-\frac{\varepsilon}{\lambda}.
$$
$t\downarrow0$ で $D\Phi(u_*)h\ge-\varepsilon/\lambda$。$-h$ にも適用して $D\Phi(u_*)h\le\varepsilon/\lambda$。よって全ての $\|h\|=1$ で $|D\Phi(u_*)h|\le\varepsilon/\lambda$ なので作用素ノルムの評価を得ます。
<!-- proof-end -->

**具体的な使い方**。$\inf\Phi=m$ とし $\Phi(u_n^0)\le m+1/n^2$ となる点を選んで $\varepsilon=1/n^2,\lambda=1/n$ を適用すると、
$$
m\le\Phi(u_n)\le m+\frac1{n^2},
\qquad
\|D\Phi(u_n)\|\le\frac1n.
$$
従って最小値のレベル $m$ にPS列を構成できます。ただし、これだけでは**収束**しません。レベル $m$ に(PS)があって初めて[臨界点の回収命題](#prop-var11-ps-critical)から極小点が得られます。

## 4. 低い両端の間の山：minimax値

二つの低い状態を結ぶ経路が、必ず高い領域を通る状況を考えます。各経路の最大エネルギーを比較して最も低い峠の高さを探します。

<a id="def-var11-minimax"></a>
<!-- formal-statement-start -->
> **定義（Mountain Passの経路族とminimax値）**  
> 実Hilbert空間 $H$ 上の連続汎関数 $\Phi$ と $e\ne0$ に対して
$$
\Gamma=\{\gamma\in C([0,1],H):
\gamma(0)=0,\ \gamma(1)=e\}
$$
> と置き、経路に沿う最大値の下限
$$
c=\inf_{\gamma\in\Gamma}\max_{t\in[0,1]}\Phi(\gamma(t))
$$
> をminimax値という。$\Gamma$ は直線経路 $t\mapsto te$ を含むので空でなく、各経路の最大値はコンパクト区間上で存在する。
<!-- formal-statement-end -->

<!-- definition-example-start: def-var11-minimax -->
**直接例**。$H=\mathbb R$、$\Phi(x)=x^2(x-2)^2$、$e=2$ を考えます。任意の $\gamma\in\Gamma$ は中間値の定理により $1$ を通るので
$$
\max_t\Phi(\gamma(t))\ge\Phi(1)=1.
$$
一方 $\gamma(t)=2t$ では $x\in[0,2]$、$\Phi(x)=[1-(x-1)^2]^2\le1$。従って $c=1$ です。$\Phi'(1)=0$、$\Phi''(1)=-4$ で、この臨界点は最小点ではありません。
<!-- definition-example-end -->

## 5. Mountain Passの定理とPS列の構成

minimax値だけでは臨界点を保証しません。峠に臨界点がないと仮定した場合、経路全体を下げられることを示します。この論証では**勾配が局所Lipschitz連続**という追加条件を置き、Hilbert空間上の常微分方程式を直接構成します。一般の $C^1$ 汎関数に対するMountain Passの定理より少し強い仮定ですが、変形の核心をこの章で証明できます。

<a id="thm-var11-mountain-pass"></a>
<!-- formal-statement-start -->
> **定理（Mountain Passの定理：局所Lipschitz勾配版）**  
> $H$ を実Hilbert空間、$\Phi\in C^1(H,\mathbb R)$ とし、$\nabla\Phi:H\to H$ が局所Lipschitz連続とする。$\Phi(0)=0$、ある $r,\alpha>0$ と $e\in H$、$\|e\|>r$ が存在し、
$$
\inf_{\|u\|=r}\Phi(u)\ge\alpha,
\qquad \Phi(e)\le0
$$
> を満たすとする。[経路族とminimax値](#def-var11-minimax)で定義される $c$ は $c\ge\alpha$ を満たし、レベル $c$ のPS列が存在する。さらにレベル $c$ の(PS)条件が成立すれば、$\Phi(u)=c$、$D\Phi(u)=0$ となる臨界点が存在する。
<!-- formal-statement-end -->

### 証明の見取り図

経路は必ず半径 $r$ の球面を横切るので $c\ge\alpha$ です。もし高さ $c$ の近くで勾配が零に近づく点がなければ、正規化した勾配の流れによって、その高さの点だけをエネルギー速度1で下げられます。端点を動かさずにminimax値を下回る経路を作ると矛盾です。

<!-- proof-start -->
### 証明

**（1）障壁とminimax値。** 任意の $\gamma\in\Gamma$ で $\|\gamma(0)\|=0<r<\|e\|=\|\gamma(1)\|$ です。連続関数 $t\mapsto\|\gamma(t)\|$ の中間値の定理から $\|\gamma(t_0)\|=r$ となる $t_0$ があり、
$$
\max_t\Phi(\gamma(t))
\ge\Phi(\gamma(t_0))\ge\alpha.
$$
全経路で下限を取れば $c\ge\alpha>0$。直線経路の最大値は有限なので $c<\infty$ です。

**（2）PS列が存在しないと仮定。** 各正整数 $n$ に $u_n$ を選び
$$
|\Phi(u_n)-c|<1/n,\qquad
\|\nabla\Phi(u_n)\|<1/n
$$
とできなければ、ある $\delta,\rho>0$ に対し
$$
|\Phi(u)-c|\le\rho\quad\Longrightarrow\quad
\|\nabla\Phi(u)\|\ge\delta
$$
が全 $u\in H$ で成り立ちます。実際、ある $n$ で条件を同時に満たす点がなければ、$\rho=1/(2n)$、$\delta=1/n$ とできます。

**（3）エネルギーを下げる流れ。** $0<\eta<\min(\rho/2,c/4)$ を選び、実数上のLipschitz関数 $\chi$ を
$$
0\le\chi\le1,\quad
\chi(s)=1\ (|s-c|\le\eta),\quad
\chi(s)=0\ (|s-c|\ge2\eta)
$$
となるよう折れ線補間で定めます。ベクトル場を
$$
V(u)=
\begin{cases}
-\chi(\Phi(u))\dfrac{\nabla\Phi(u)}
{\|\nabla\Phi(u)\|^2},&|\Phi(u)-c|<2\eta,\\
0,&|\Phi(u)-c|\ge2\eta
\end{cases}
$$
と定義します。第一の場合 $2\eta<\rho$ より分母は $\delta^2$ 以上です。$\nabla\Phi$ の局所Lipschitz性、$\Phi$ の局所Lipschitz性、$\chi=0$ となる帯の境界から、$V$ は境界をまたいでも局所Lipschitzです。また $\|V(u)\|\le1/\delta$ が全域で成り立ちます。

従って常微分方程式 $\dot u=V(u)$ は各初期値から局所一意解を持ち、速度が一様有界なので有限時刻に発散せず、全ての $s\ge0$ まで延長できます。流れを $T_s(u)$ と書くと、連鎖律から
$$
\frac d{ds}\Phi(T_s(u))
=\langle\nabla\Phi(T_s(u)),V(T_s(u))\rangle
=-\chi(\Phi(T_s(u)))\le0.
$$
特にエネルギーが $[c-\eta,c+\eta]$ の間は減少速度がちょうど1です。エネルギーが最初 $c+\eta$ 以下なら、時刻 $2\eta$ には $c-\eta$ 以下になります。実際、初期値がすでに $c-\eta$ 以下なら単調性からよく、そうでなければその帯を速度1で通過するのに必要な時間は高々 $2\eta$ です。

**（4）経路を変形した矛盾。** $c$ の定義から $\max_t\Phi(\gamma(t))\le c+\eta$ を満たす $\gamma\in\Gamma$ を選べます。$\widetilde\gamma(t)=T_{2\eta}(\gamma(t))$ は初期値への連続依存性から連続です。端点のエネルギーは $\Phi(0)=0$、$\Phi(e)\le0$ であり、$2\eta<c$ なので両端では $V=0$、従って $\widetilde\gamma(0)=0$、$\widetilde\gamma(1)=e$ です。しかし全ての $t$ で
$$
\Phi(\widetilde\gamma(t))\le c-\eta,
\qquad
\max_t\Phi(\widetilde\gamma(t))<c,
$$
となり、$\widetilde\gamma\in\Gamma$ と $c$ の下限性に反します。

よって任意の $n$ に対し前述の二不等式を満たす $u_n$ が存在し、これがレベル $c$ のPS列です。レベル $c$ の(PS)条件がある場合は[臨界点の回収命題](#prop-var11-ps-critical)に適用して、所望の臨界点を得ます。
<!-- proof-end -->

**何が証明できたか。** 幾何条件は「峠の高さ」を決め、勾配を下げる流れがPS列を作り、(PS)はその列から実際の臨界点を回収します。これは三つの異なる役割です。一般の $C^1$ 理論では局所Lipschitz勾配を使わない擬勾配場を構成しますが、本章の定理は上記の追加仮定の範囲で閉じています。

### 実際に峠になる二変数の模型

$\Phi(x,y)=x^2(x-2)^2+y^2$ ($H=\mathbb R^2$) とします。$0=(0,0)$、$e=(2,0)$ で両端の値は0です。原点からの距離が1の点について
$$
\Phi(x,y)=x^2(x-2)^2+y^2
\ge \alpha>0
$$
となる $\alpha$ は存在します。実際、半径1の円上で $\Phi=0$ なら $y=0$ かつ $x=0$ または2となり半径1と矛盾し、コンパクト性により正の最小値が存在します。全経路は $x=1$ を通り、その点で $\Phi(1,y)=1+y^2\ge1$。$y=0$ の直線経路では最大値1なので $c=1$。$(1,0)$ は臨界点で、Hessianは $\operatorname{diag}(-4,2)$、最小点ではなく鞍点です。

この汎関数は多項式なので勾配は局所Lipschitz、$\Phi$ の有界な下位集合は有界です。有限次元では有界列は収束部分列を持つため各レベルで(PS)も満たします。無限次元では同じ結論を言うには別途コンパクト性の証明が必要です。

## 6. 対称部分空間で探した臨界点は全体でも臨界か

対称性を課すと変数が減り、実際の計算が簡単になります。ただし対称部分空間で停留した点が、全方向について停留するとは一般には限りません。有限群の直交作用で、エネルギーが不変な場合に限り、簡潔に証明できます。

<a id="prop-var11-symmetric-critical"></a>
<!-- formal-statement-start -->
> **命題（有限群の対称臨界性）**  
> 有限群 $G$ が実Hilbert空間 $H$ に直交線形作用素 $g:H\to H$ として作用し、$\Phi\in C^1(H,\mathbb R)$ が全 $g\in G$ について $\Phi(gu)=\Phi(u)$ を満たすとする。固定点部分空間
$$
H^G=\{u\in H:gu=u\ \text{for every }g\in G\}
$$
> の点 $u\in H^G$ が制限 $\Phi|_{H^G}$ の臨界点なら、$u$ は $H$ 全体でも $\Phi$ の臨界点である。
<!-- formal-statement-end -->

### 証明の見取り図

不変性を微分すると、固定点における勾配も群の作用で固定されます。その勾配は固定点空間に属するので、制限方向で零なら自分自身との内積も零です。

<!-- proof-start -->
### 証明

各 $g\in G$ と $h\in H$ について不変性 $\Phi(g(u+th))=\Phi(u+th)$ を $t=0$ で微分し、
$$
D\Phi(gu)(gh)=D\Phi(u)h
$$
を得ます。$u\in H^G$ では $gu=u$ なので
$$
\langle\nabla\Phi(u),gh\rangle
=\langle\nabla\Phi(u),h\rangle.
$$
$g$ の直交性から $\langle g^{-1}\nabla\Phi(u),h\rangle=\langle\nabla\Phi(u),h\rangle$、全 $h$ に成り立つため $g^{-1}\nabla\Phi(u)=\nabla\Phi(u)$。ゆえに $\nabla\Phi(u)\in H^G$ です。制限で臨界という仮定は全ての $h\in H^G$ について $\langle\nabla\Phi(u),h\rangle=0$ を意味します。$h=\nabla\Phi(u)$ を選べるので $\|\nabla\Phi(u)\|^2=0$、従って全方向で $D\Phi(u)=0$ です。
<!-- proof-end -->

**直接例**。$\mathbb R^2$ の座標交換 $g(x,y)=(y,x)$ を考えます。$\Phi(x,y)=(x^2-1)^2+(y^2-1)^2$ は不変で、固定点空間は対角線 $(t,t)$ です。制限関数は $2(t^2-1)^2$、微分は $8t(t^2-1)$。$t=0,\pm1$ は対角線上の臨界点で、全体の勾配
$$
\nabla\Phi(t,t)=(4t(t^2-1),4t(t^2-1))=(0,0)
$$
となることも直接確認できます。

一方 $\Phi(x,y)=(x+y)^2+(x-y)$ は座標交換で不変ではありません。対角線上の制限は $4t^2$ で $t=0$ が停留しますが、全体の勾配は $\nabla\Phi(0,0)=(1,-1)\ne0$。**不変性の仮定**を失うと、勾配が固定点空間へ入る証明が壊れます。

## 7. 演習

### Level A

<a id="ex-var11-a01"></a>
#### VAR11-A01 方向微分とFréchet微分
- Level: A

原点で零、その他で $g(x,y)=x^3y/(x^4+y^2)$ とする。原点で方向微分が全て零であることと、Fréchet微分が存在しないことを示せ。

<!-- solution-start -->
### 詳細解答

$h=(a,b)$ に対し、$b\ne0$ なら
$$
\frac{g(ta,tb)-g(0,0)}t
=\frac{t a^3b}{t^2a^4+b^2}\longrightarrow0.
$$
$b=0$ なら分子が零です。従ってGâteaux微分は零線形写像です。Fréchet微分が存在すれば方向微分と一致するため候補は零だけです。しかし $(x,y)=(s,s^2)$ では $g(s,s^2)=s/2$ で、
$$
\frac{|g(s,s^2)|}{\sqrt{s^2+s^4}}
=\frac1{2\sqrt{1+s^2}}\longrightarrow\frac12\ne0.
$$
従ってFréchet微分は存在しません。
<!-- solution-end -->

<a id="ex-var11-a02"></a>
#### VAR11-A02 二次汎関数のPS条件
- Level: A

実Hilbert空間 $H$ と固定点 $f\in H$ について $\Phi(u)=\frac12\|u-f\|^2$ が全レベルで(PS)を満たすことを証明せよ。

<!-- solution-start -->
### 詳細解答

内積を展開して
$$
\Phi(u+h)-\Phi(u)
=\langle u-f,h\rangle+\tfrac12\|h\|^2
$$
なので $\nabla\Phi(u)=u-f$ です。どのレベル $c$ のPS列でも $\|u_n-f\|=\|\nabla\Phi(u_n)\|\to0$、従って列全体が $f$ へ強収束します。また $\Phi(u_n)\to0$ なので実際のPS列はレベル0にしか存在しません。他レベルの(PS)条件は対象列がないため空虚に真です。
<!-- solution-end -->

<a id="ex-var11-a03"></a>
#### VAR11-A03 PSが失敗するレベル
- Level: A

$\Phi(x)=e^{-x^2}$ ($x\in\mathbb R$) のレベル0の(PS)が失敗することを、実際の列と導関数から示せ。

<!-- solution-start -->
### 詳細解答

$x_n=n$ と置くと $\Phi(x_n)=e^{-n^2}\to0$。微分は
$$
\Phi'(x)=-2xe^{-x^2},
\qquad |\Phi'(x_n)|=2ne^{-n^2}\to0.
$$
従って $(x_n)$ はレベル0のPS列です。しかし $x_n\to+\infty$ で収束部分列はありません。関数値が下に有界であっても(PS)は保証されません。
<!-- solution-end -->

<a id="ex-var11-a04"></a>
#### VAR11-A04 一次元のminimax値
- Level: A

$\Phi(x)=x^2(x-2)^2$、$H=\mathbb R$、端点 $0,2$ の経路族に対して $c$ を求め、レベル $c$ の臨界点と二階微分を調べよ。

<!-- solution-start -->
### 詳細解答

全ての連続経路は値1を通るため最大値は $\Phi(1)=1$ 以上です。直線経路 $x=2t$ は区間 $[0,2]$ を走り、そこで
$$
\Phi(x)=[1-(x-1)^2]^2\le1.
$$
よって $c=1$。$\Phi'(x)=4x(x-1)(x-2)$ なので $\Phi'(1)=0$。さらに $\Phi''(1)=-4<0$ で、峠の点は局所最大点です。
<!-- solution-end -->

<a id="ex-var11-a05"></a>
#### VAR11-A05 対称性の直接確認
- Level: A

$\Phi(x,y)=(x^2-1)^2+(y^2-1)^2$ と座標交換群を考える。固定点空間と、その上の全ての臨界点を求め、それらが全空間でも臨界点か確かめよ。

<!-- solution-start -->
### 詳細解答

固定点条件 $(y,x)=(x,y)$ は $x=y=t$ です。制限は $\phi(t)=2(t^2-1)^2$ で $\phi'(t)=8t(t^2-1)$。従って $t=-1,0,1$ が全ての制限臨界点です。全体では
$$
\nabla\Phi(x,y)=(4x(x^2-1),4y(y^2-1)),
$$
ここへ $(t,t)$ を代入するといずれも零です。[有限群の対称臨界性](#prop-var11-symmetric-critical)の具体例です。
<!-- solution-end -->

### Level B

<a id="ex-var11-b01"></a>
#### VAR11-B01 Ekelandによる小勾配列
- Level: B

$\Phi(x)=e^x$ ($x\in\mathbb R$) について、$\inf\Phi$、最小点の有無、$\Phi(x_n)\to\inf\Phi$ かつ $\Phi'(x_n)\to0$ を満たす明示列を求めよ。Ekelandの原理が強収束を保証しない理由を説明せよ。

<!-- solution-start -->
### 詳細解答

$e^x>0$ ですが $x\to-\infty$ で $e^x\to0$ なので $\inf_\mathbb R\Phi=0$、最小点は存在しません。$x_n=-2\log n$ ($n\ge1$) と選べば
$$
\Phi(x_n)=\Phi'(x_n)=\frac1{n^2}\longrightarrow0.
$$
一方 $x_n\to-\infty$ で強収束部分列はありません。[Ekeland点の勾配評価](#prop-var11-ekeland-slope)は小勾配の点の存在を述べるのであって、列のコンパクト性は仮定していません。この例ではレベル0の(PS)も失敗します。
<!-- solution-end -->

<a id="ex-var11-b02"></a>
#### VAR11-B02 有界なPS列でもコンパクトとは限らない
- Level: B

$H=\ell^2$ で $\Psi(u)=\sum_{k\ge1}u_k^2/k$ を考える。$\Psi$ が $C^1$ であること、$e_n$ がレベル0のPS列であること、強収束部分列がないことを示せ。

<!-- solution-start -->
### 詳細解答

対角作用素 $Au=(u_k/k)_k$ は $\|Au\|\le\|u\|$ を満たす有界線形作用素で、$\Psi(u)=\langle Au,u\rangle$。展開すると
$$
\Psi(u+h)-\Psi(u)
=2\langle Au,h\rangle+\langle Ah,h\rangle.
$$
残差は $\le\|h\|^2$ なので $D\Psi(u)h=2\langle Au,h\rangle$、$\nabla\Psi(u)=2Au$ で連続です。$u_n=e_n$ について
$$
\Psi(e_n)=1/n\to0,\quad
\|\nabla\Psi(e_n)\|=2/n\to0.
$$
しかし $n\ne m$ で $\|e_n-e_m\|=\sqrt2$ なのでCauchy部分列すらありません。有界性だけでは(PS)になりません。
<!-- solution-end -->

<a id="ex-var11-b03"></a>
#### VAR11-B03 臨界点が多すぎてもPSは破れる
- Level: B

無限次元Hilbert空間 $H$ 上で $\Phi(u)=\frac12\|u\|^2-\frac14\|u\|^4$ とする。$\|u\|=1$ の全ての点がレベル $1/4$ の臨界点であり、そのレベルで(PS)が失敗することを示せ。

<!-- solution-start -->
### 詳細解答

$\|u+h\|^2=\|u\|^2+2\langle u,h\rangle+\|h\|^2$ による多項式展開から
$$
D\Phi(u)h=(1-\|u\|^2)\langle u,h\rangle,
\qquad \nabla\Phi(u)=(1-\|u\|^2)u.
$$
$\|u\|=1$ なら $\nabla\Phi(u)=0$、$\Phi(u)=1/2-1/4=1/4$ です。無限次元Hilbert空間には正規直交列 $(e_n)$ があり、各 $e_n$ はレベル $1/4$ の臨界点なのでPS列です。しかし $\|e_n-e_m\|=\sqrt2$ で収束部分列はありません。臨界点が存在していても、そのレベルの(PS)は破れ得ます。
<!-- solution-end -->

<a id="ex-var11-b04"></a>
#### VAR11-B04 不変性を外したときの失敗
- Level: B

$\Phi(x,y)=(x+y)^2+(x-y)$、$g(x,y)=(y,x)$ とする。固定点空間での停留点と全方向の勾配を比較し、[有限群の対称臨界性](#prop-var11-symmetric-critical)のどの仮定が破れているか述べよ。

<!-- solution-start -->
### 詳細解答

固定点空間は $(t,t)$ で、制限 $\Phi(t,t)=4t^2$ の微分は $8t$。従って $(0,0)$ は制限臨界点です。一方
$$
\nabla\Phi(x,y)=(2(x+y)+1,\,2(x+y)-1),
\quad \nabla\Phi(0,0)=(1,-1)\ne0.
$$
$\Phi(y,x)=(x+y)^2-(x-y)\ne\Phi(x,y)$ なので群作用に対する不変性を失っています。証明で勾配が固定点空間へ属するという段階が使えず、横方向 $(1,-1)$ に沿う変化が残ります。
<!-- solution-end -->

### Level C

<a id="ex-var11-c01"></a>
#### VAR11-C01 二次元の峠・PS・対称性を一つに結ぶ
- Level: C

$H=\mathbb R^2$、$\Phi(x,y)=x^2(x-2)^2+y^2$、始点 $(0,0)$、終点 $(2,0)$ を考える。

1. Mountain Passの障壁条件を検証し、minimax値 $c$ を求めよ。
2. (PS)条件が全レベルで成立することを証明し、対応する臨界点とHessianを求めよ。
3. $g(x,y)=(x,-y)$ による群作用を用いて、固定点空間で求めた臨界点が全空間でも臨界点となることを示せ。

<!-- solution-start -->
### 詳細解答

**1.** $\Phi(0,0)=\Phi(2,0)=0$、$\|e\|=2$ です。$r=1$ の円周では $\Phi\ge0$ で、等号なら $y=0$ かつ $x\in\{0,2\}$ となり半径1に反します。円周のコンパクト性と連続性から $\alpha=\min_{\|(x,y)\|=1}\Phi(x,y)>0$ が存在します。全経路は連続な第一座標で $x=1$ を取るため、その点の $\Phi(1,y)=1+y^2\ge1$ です。直線経路 $(2t,0)$ では
$$
\Phi(2t,0)=[1-(2t-1)^2]^2\le1.
$$
従って $c=1$ です。

**2.** $\Phi(x,y)\to\infty$ as $\|(x,y)\|\to\infty$ です。実際 $|y|\to\infty$ なら $y^2\to\infty$、$|x|\to\infty$ なら $x^2(x-2)^2\to\infty$ です。どのPS列も $\Phi(u_n)\to c_0$ から有限の下位集合に入り、有限次元のBolzano–Weierstrass定理で強収束部分列を持ちます。従って全レベルで(PS)。導関数を計算すると
$$
\nabla\Phi(x,y)=(4x(x-1)(x-2),\,2y).
$$
$(1,0)$ で勾配は零で $\Phi(1,0)=1=c$ です。二階微分は
$$
D^2\Phi(1,0)=
\begin{pmatrix}-4&0\\0&2\end{pmatrix}.
$$
$x$ 方向には減少し $y$ 方向には増加するため、この点は鞍点です。

**3.** $G=\{1,g\}$ は直交作用で、$y^2$ が不変なので $\Phi(g(x,y))=\Phi(x,y)$。固定点空間は $y=0$、制限は $\phi(x)=x^2(x-2)^2$。その導関数 $4x(x-1)(x-2)$ は $x=1$ で零です。[有限群の対称臨界性](#prop-var11-symmetric-critical)の仮定が揃うので $(1,0)$ は全空間の臨界点です。実際、全勾配へ代入しても $(0,0)$ となります。
<!-- solution-end -->

---

## 8. 到達点と次章

本章では下に有界な汎関数から小勾配列を得るEkelandの原理、峠の高さからPS列を作るMountain Passの論理、そして強収束を保証する(PS)条件を分離しました。鞍点は極小点でなくても臨界点であり、有限群の不変性を確かめれば対称部分空間での停留性を全方向へ拡張できます。

次のVAR12では、臨界点が極小点・鞍点のどちらに近いかを第二変分の作用素、Morse指数と零空間から判定します。周期軌道や特異作用へ応用するときは、その問題固有の(PS)成立を別途検証する必要があります。
