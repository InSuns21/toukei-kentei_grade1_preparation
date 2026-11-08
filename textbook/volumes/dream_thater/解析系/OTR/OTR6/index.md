# OTR6 連続空間でも双対性は成立するか

<!-- definition-example-audit: strict -->

## 1. 点の数が無限でも「費用の下界」を作れるか

[OTR5 の有限離散輸送の双対問題](../OTR5/index.md#def-otr5-finite-dual)では、出発点 $i$ と到着点 $j$ に数値 $u_i,v_j$ を割り当て、すべての経路で $u_i+v_j\le c_{ij}$ とするだけで輸送費用の下界が得られました。さらに [有限輸送の強双対性](../OTR5/index.md#thm-otr5-strong-duality)は、最良の下界が最小費用に一致することを保証します。

出発点・到着点が区間全体のように連続していると、有限個の変数を並べることはできません。しかし各点に数を割り当てる**関数**を使えば、同じ考え方を表現できます。残る疑問は、こうした下界を最大化しても本当に最小費用へ届くのか、ということです。

この章の主定理では、**$X,Y$ が空でないコンパクト距離空間、$c:X\times Y\to\mathbb R$ が連続**という仮定を固定します。$\mu,\nu$ はそれぞれの Borel 確率測度です。$\mathcal P(Z)$ は $Z$ 上の Borel 確率測度全体、$C(Z)$ は $Z$ 上の実数値連続関数全体を表します。コンパクト性は、細かい有限分割を作るだけでなく、構成した関数の極限を取るためにも使います。

[結合の定義](../OTR2/index.md#def-otr2-coupling)による $\Pi(\mu,\nu)$ は、第一周辺が $\mu$、第二周辺が $\nu$ である $X\times Y$ 上の確率測度の集合です。[Kantorovich の主問題](../OTR2/index.md#def-otr2-kantorovich)を今回の仮定に合わせて書くと、

$$
P_c(\mu,\nu)=\inf_{\pi\in\Pi(\mu,\nu)}\int_{X\times Y}c(x,y)\,d\pi(x,y)
$$

となります。$c$ はコンパクト集合上の連続関数なので有界で、積分値は常に有限です。ただし [コンパクト空間での最適結合の存在定理](../OTR3/index.md#thm-otr3-compact)は**非負費用**を仮定するため、そのままでは符号を許す今回の $c$ に適用できません。$m=\min_{X\times Y}c$ と置き、$c_+(x,y)=c(x,y)-m\ge0$ に移すと、どの確率結合 $\pi$ に対しても

$$
\int c_+\,d\pi=\int c\,d\pi-m\pi(X\times Y)=\int c\,d\pi-m.
$$

従って $c_+$ と $c$ の最小化を達成する結合は同じです。非負・連続な $c_+$ に上記の存在定理を適用すれば、元の $c$ でも下限が最小値として達成されることが分かります。

連続関数の空間 $C(X)$、$C(Y)$ を使い、出発側に $f\in C(X)$、到着側に $g\in C(Y)$ を置きます。$f(x)+g(y)\le c(x,y)$ をすべての組 $(x,y)$ に課し、これらの関数から費用の下界を作ります。

<a id="def-otr6-continuous-dual"></a>

<!-- formal-statement-start -->
> **定義（連続Kantorovich双対問題）**
> $X,Y$ を空でないコンパクト距離空間、$\mu\in\mathcal P(X)$、$\nu\in\mathcal P(Y)$、$c\in C(X\times Y,\mathbb R)$ とする。**双対実行可能対**とは、$f\in C(X),g\in C(Y)$ で

$$
f(x)+g(y)\le c(x,y)\qquad(\forall(x,y)\in X\times Y)
$$

> を満たす組 $(f,g)$ である。この $f,g$ を**連続双対ポテンシャル**という。**連続双対値**を

$$
D_c(\mu,\nu)=\sup_{\substack{f\in C(X),\ g\in C(Y)\\f(x)+g(y)\le c(x,y)}}\left(\int_X f\,d\mu+\int_Y g\,d\nu\right)
$$

> と定義する。括弧内を双対目的値と呼ぶ。
<!-- formal-statement-end -->

<!-- definition-example-start: def-otr6-continuous-dual -->
### 定義の確認：無限個の不等式をまとめて確かめる

**定義の確認**：すべての点の組で双対制約が成立することを、余裕の非負性から直接判定します。

$X=Y=[0,1]$、$c(x,y)=|x-y|$ とし、$f(x)=-x$、$g(y)=y$ と取ります。すべての $x,y\in[0,1]$ に対し

$$
c(x,y)-f(x)-g(y)=|x-y|+x-y=2\max\{x-y,0\}\ge0
$$

なので、無限個の制約を一つの式で検証できました。例えば $\mu$ を区間 $[0,1]$ 上の密度 $1$ の確率測度（$\mu(A)=\int_A1\,dx$）、$\nu=\delta_1$（点 $1$ に全質量を置く測度）とすると、双対目的値は

$$
\int_0^1(-x)\,dx+g(1)=-\frac12+1=\frac12.
$$

この $1/2$ が最小輸送費用そのものかどうかは、主実行可能な結合の費用とも比べて判断します。
<!-- definition-example-end -->

<a id="thm-otr6-weak-duality"></a>

<!-- formal-statement-start -->
> **定理（連続輸送の弱双対とギャップ恒等式）**
> 空でないコンパクト距離空間 $X,Y$、Borel 確率測度 $\mu,\nu$、連続費用 $c:X\times Y\to\mathbb R$ とする。任意の $\pi\in\Pi(\mu,\nu)$ と双対実行可能な $(f,g)\in C(X)\times C(Y)$ に対し、

$$
\int c\,d\pi-\left(\int f\,d\mu+\int g\,d\nu\right)
=\int_{X\times Y}(c-f-g)\,d\pi\ge0.
$$

> 特に $D_c(\mu,\nu)\le P_c(\mu,\nu)$ である。
<!-- formal-statement-end -->

### 証明の見取り図

OTR5 の各セルについての和を、結合 $\pi$ に関する積分へ置き換えます。$\pi$ の周辺が $\mu,\nu$ であることが、二つのポテンシャルを積分から取り出す根拠です。

<!-- proof-start -->
### 証明

[周辺分布による積分公式](../OTR2/index.md#prop-otr2-marginal-integration)を有界連続関数 $f,g$ に適用すると、

$$
\int_{X\times Y} f(x)\,d\pi=\int_X f\,d\mu,
\qquad
\int_{X\times Y} g(y)\,d\pi=\int_Y g\,d\nu.
$$

したがって積分の線形性から

$$
\begin{aligned}
\int c\,d\pi-\int f\,d\mu-\int g\,d\nu
&=\int_{X\times Y}\bigl(c(x,y)-f(x)-g(y)\bigr)\,d\pi(x,y)\\
&\ge0.
\end{aligned}
$$

最後は被積分関数が各点で非負であり、$\pi$ が非負測度だからです。固定した $(f,g)$ に対してすべての $\pi$ の費用以上にはならないので、まず主問題について下限を取り、次に双対実行可能対について上限を取れば $D_c\le P_c$ を得ます。$\square$
<!-- proof-end -->

先ほどの密度 $1$ の $\mu$ と $\nu=\delta_1$ の例では、第二周辺が $\delta_1$ である結合は $y=1$ に集中します。第一周辺も指定すると $\pi=\mu\otimes\delta_1$ しかありません。その費用は

$$
\int_0^1|x-1|\,dx=\int_0^1(1-x)\,dx=\frac12.
$$

双対目的値と等しいため、$(f,g)=(-x,y)$ と $\pi$ がともに最適です。これは連続空間での具体的な最適性証明書です。

## 2. 相手のポテンシャルを一番大きくするには

双対実行可能な $g$ がすでに選ばれているとします。制約を $f$ について解き直すと、どの $y\in Y$ に対しても

$$
f(x)\le c(x,y)-g(y)
$$

です。したがって、同時に満たせる $f(x)$ の最大値は右辺の $y$ に関する最小値です。この「相手を固定して最小化する操作」を次で定義します。同じ操作は出発側と到着側のどちらからも行えます。

<a id="def-otr6-c-transform"></a>

<!-- formal-statement-start -->
> **定義（c-変換とc-共役対）**
> 空でないコンパクト距離空間 $X,Y$ と連続費用 $c:X\times Y\to\mathbb R$ を取る。$g\in C(Y)$ の $c$-変換は $X$ 上の関数

$$
g^c(x)=\min_{y\in Y}\{c(x,y)-g(y)\}
$$

> であり、$f\in C(X)$ の $c$-変換は $Y$ 上の関数

$$
f^c(y)=\min_{x\in X}\{c(x,y)-f(x)\}
$$

> である。$f=g^c$ と $g=f^c$ をともに満たす対を **$c$-共役対**と呼ぶ。上付きの $c$ はべき乗ではなく、作用する関数の定義域によって変換の向きを区別する記号である。
<!-- formal-statement-end -->

<!-- definition-example-start: def-otr6-c-transform -->
### 定義の確認：絶対値費用を二方向に変換する

**定義の確認**：最小化の範囲と最小値の達成点を、二方向それぞれで検算します。

$X=Y=[0,1]$、$c(x,y)=|x-y|$、$g(y)=y$ とします。固定した $x$ に対し、$y\ge x$ なら

$$
|x-y|-y=(y-x)-y=-x,
$$

$y<x$ なら $|x-y|-y=x-2y>-x$ です。$y=x$ は許されるので最小値は $-x$、すなわち $g^c(x)=-x$ です。次に $f(x)=-x$ を変換すると、$x\le y$ で

$$
|x-y|-f(x)=y-x+x=y,
$$

$x>y$ で $|x-y|+x=2x-y>y$ です。従って $f^c(y)=y=g(y)$ となります。両方向の最小値を確かめ、**この $(f,g)$ は $c$-共役対**だと分かりました。
<!-- definition-example-end -->

<a id="prop-otr6-c-transform-improvement"></a>

<!-- formal-statement-start -->
> **命題（c-変換による許容対の改良）**
> $X,Y$ を空でないコンパクト距離空間、$c\in C(X\times Y)$ とする。双対実行可能対 $(f,g)\in C(X)\times C(Y)$ に対し、次が成り立つ。
>
> 1. $g^c\in C(X)$、$f^c\in C(Y)$ であり、$f\le g^c$、$g\le f^c$ が各点で成立する。
> 2. $(g^c,g)$ は双対実行可能で、元の対より双対目的値を減らさない。さらに $g_1=(g^c)^c$ と置けば、$(g^c,g_1)$ は $c$-共役対で、目的値は減らない。
> 3. $x,x'\in X$、$y,y'\in Y$ に対し、次の一様連続性の評価が成立する。

$$
\begin{aligned}
|g^c(x)-g^c(x')|&\le\sup_{z\in Y}|c(x,z)-c(x',z)|,\\
|f^c(y)-f^c(y')|&\le\sup_{z\in X}|c(z,y)-c(z,y')|.
\end{aligned}
$$
<!-- formal-statement-end -->

### 証明の見取り図

最小値を取る点が変わっても、**同じ比較相手**を使って上下から評価すると差を抑えられます。$c$-変換は各点で許される最大の相手を与えるので、目的値は下がりません。二度改良すると、両方向の変換で元に戻る対になります。

<!-- proof-start -->
### 証明

まず固定した $x\in X$ で $y\mapsto c(x,y)-g(y)$ はコンパクト集合上の連続関数なので最小値を持ちます。$x,x'$ について、$a_y=c(x,y)-g(y)$、$b_y=c(x',y)-g(y)$ と書けば、任意の $y$ で

$$
\min_z a_z\le a_y\le b_y+\sup_z|a_z-b_z|.
$$

右辺について $y$ の最小値を取ると

$$
\min_z a_z-\min_z b_z\le\sup_z|a_z-b_z|
=\sup_{z\in Y}|c(x,z)-c(x',z)|.
$$

$x,x'$ を逆にして絶対値を得ます。$c$ はコンパクト積空間上で一様連続なので右辺は $x'\to x$ で $0$ になり、$g^c$ は連続です。$f^c$ も $X,Y$ を交換すれば同じ証明で連続です。これで第3項も得られました。

実行可能性は $f(x)+g(y)\le c(x,y)$ なので、すべての $y$ について $f(x)\le c(x,y)-g(y)$、よって $f(x)\le g^c(x)$ です。$g\le f^c$ も同様です。また $g^c$ の定義から

$$
g^c(x)\le c(x,y)-g(y)\quad(\forall x,y)
$$

だから $(g^c,g)$ は実行可能です。$\mu$ が確率測度で $g^c-f\ge0$ なので、$f$ を $g^c$ に置き換えた双対目的値は小さくなりません。

さらに $f_1=g^c$、$g_1=f_1^c$ とします。$(f_1,g)$ が実行可能だから $g\le g_1$ であり、同様に目的値は下がりません。残るのは $f_1=g_1^c$ です。$g_1\ge g$ より

$$
g_1^c(x)=\min_y\{c(x,y)-g_1(y)\}
\le\min_y\{c(x,y)-g(y)\}=f_1(x).
$$

一方 $g_1(y)=\min_z\{c(z,y)-f_1(z)\}$ だから各 $x,y$ で $g_1(y)\le c(x,y)-f_1(x)$、すなわち $f_1(x)\le c(x,y)-g_1(y)$ です。$y$ について最小値を取れば $f_1(x)\le g_1^c(x)$。両側を合わせて $f_1=g_1^c$、従って $(f_1,g_1)$ は $c$-共役対です。$\square$
<!-- proof-end -->

この命題から、双対最適対があれば **$c$-共役な双対最適対も選べる** と分かります。もっとも、変換した対が一意とは限りません。双対では

$$
(f,g)\longmapsto(f+t,g-t)\qquad(t\in\mathbb R)
$$

という定数シフトも、制約と目的値を全く変えないからです。後の極限操作では $f(x_0)=0$ と規格化して、この自由度を一つ固定します。

## 3. 有限分割の最適値は元の費用へ近づくか

双対の強さを示すには、連続空間を小さなセルへ分割し、そのセルを代表点に置き換えます。ただし「細かくすれば近づく」では不十分です。**どの結合でも一様に費用が近い**ことと、離散結合を元の測度へ戻せることが要点です。

$X,Y$ 上の距離を $d_X,d_Y$ とします。連続費用 $c$ の変化量を、$r\ge0$ に対し

$$
\omega(r)=\sup\Bigl\{|c(x,y)-c(x',y')|:\ d_X(x,x')+d_Y(y,y')\le r\Bigr\}
$$

と置きます。これは有限で非減少、$\omega(r)\to0$（$r\downarrow0$）です。連続関数がコンパクト積上で一様連続であるためです。

コンパクト距離空間には、任意の $\delta>0$ で直径が $\delta$ 以下の有限 Borel 分割 $X=\bigsqcup_i A_i$、$Y=\bigsqcup_j B_j$ があります。実際、有限個の半径 $\delta/2$ 未満の開球で覆い、先に選んだ球の部分を後の球から除けば互いに素な Borel 集合が得られます。空集合は除きます。代表点 $x_i\in A_i,y_j\in B_j$ を選び、$a_i=\mu(A_i),b_j=\nu(B_j)$ とします。

<a id="lem-otr6-finite-partition"></a>

<!-- formal-statement-start -->
> **補題（有限分割による輸送費用の近似）**
> 空でないコンパクト距離空間 $X,Y$、Borel 確率測度 $\mu,\nu$、連続費用 $c$ とその上記の変化量 $\omega$ を取る。直径 $\delta$ 以下の有限 Borel 分割 $A_i,B_j$ と代表点 $x_i,y_j$ に対し、$a_i=\mu(A_i),b_j=\nu(B_j)$、$c_{ij}=c(x_i,y_j)$ とし、有限輸送最適値を

$$
P_\delta=\min_{\substack{p_{ij}\ge0\\\sum_jp_{ij}=a_i,\ \sum_ip_{ij}=b_j}}\sum_{i,j}c_{ij}p_{ij}
$$

> と定める。このとき

$$
|P_c(\mu,\nu)-P_\delta|\le\omega(2\delta).
$$
<!-- formal-statement-end -->

### 証明の見取り図

連続結合 $\pi$ のセル質量を $p_{ij}=\pi(A_i\times B_j)$ と読めば離散結合になります。逆に離散結合を各セルの条件付き周辺測度の積に分配すると元の周辺分布へ戻せます。両方向とも一セル内の費用差は $\omega(2\delta)$ 以下です。

<!-- proof-start -->
### 証明

まず任意の $\pi\in\Pi(\mu,\nu)$ に対し $p_{ij}=\pi(A_i\times B_j)$ とします。[結合の周辺条件](../OTR2/index.md#def-otr2-coupling)を使って

$$
\sum_jp_{ij}=\pi(A_i\times Y)=a_i,\qquad
\sum_ip_{ij}=\pi(X\times B_j)=b_j.
$$

したがって $P=(p_{ij})$ は有限問題の実行可能行列です。セル内では $d_X(x,x_i)\le\delta$、$d_Y(y,y_j)\le\delta$ なので

$$
\left|\int c\,d\pi-\sum_{ij}c_{ij}p_{ij}\right|
\le\sum_{ij}\int_{A_i\times B_j}|c(x,y)-c_{ij}|\,d\pi
\le\omega(2\delta).
$$

ここから $P_\delta\le\int c\,d\pi+\omega(2\delta)$、$\pi$ について下限を取って

$$
P_\delta\le P_c(\mu,\nu)+\omega(2\delta)
$$

を得ます。

逆向きには、有限問題の任意の実行可能行列 $(p_{ij})$ を取ります。$a_i>0$ のとき $\mu_i=\mu|_{A_i}/a_i$、$b_j>0$ のとき $\nu_j=\nu|_{B_j}/b_j$ と置きます。零質量セルでは $\mu_i=\delta_{x_i}$、$\nu_j=\delta_{y_j}$ と定めて構いません。その行または列は $p_{ij}=0$ だからです。

各 $\mu_i,\nu_j$ は対応するセルに集中した確率測度です。有限測度なので $\sigma$ 有限であり、[積測度の存在一意性定理](../../F0/F0-00D2C/index.md#thm-f0-00d2c-01)を適用できます。こうして得られる積測度を使い

$$
\widetilde\pi=\sum_{i,j}p_{ij}(\mu_i\otimes\nu_j)
$$

と構成します。全質量は $\sum_{ij}p_{ij}=1$ で、第一周辺は

$$
\sum_{ij}p_{ij}\mu_i
=\sum_i\left(\sum_jp_{ij}\right)\mu_i
=\sum_i a_i\mu_i=\mu,
$$

第二周辺も $\sum_jb_j\nu_j=\nu$ なので $\widetilde\pi\in\Pi(\mu,\nu)$ です。セル内の費用差をもう一度積分すると

$$
\left|\int c\,d\widetilde\pi-\sum_{ij}c_{ij}p_{ij}\right|
\le\sum_{ij}p_{ij}\omega(2\delta)=\omega(2\delta).
$$

よって $P_c(\mu,\nu)\le\sum c_{ij}p_{ij}+\omega(2\delta)$。有限問題の最適行列（[非空コンパクトな輸送多面体](../OTR4/index.md#prop-otr4-compact)）を入れれば $P_c\le P_\delta+\omega(2\delta)$ です。両方向を合わせて結論を得ます。$\square$
<!-- proof-end -->

この補題は、離散化が**上からだけでなく下からも**元の最適値へ近づくことを保証します。零質量セルを無視して確率測度を割り算してしまわない点も、離散・連続をつなぐ際の重要な注意です。

## 4. 有限双対を極限まで運べば何が残るか

ここまでで次の道具が揃いました。

1. 有限分割に対して [有限輸送の強双対性](../OTR5/index.md#thm-otr5-strong-duality)が使える。
2. 分割の最適値 $P_\delta$ は [近似補題](#lem-otr6-finite-partition)で $P_c$ に近づく。
3. 離散ポテンシャルを $c$-変換で連続関数へ拡張すると、値が増えすぎず、関数の変化も費用 $c$ の変化で抑えられる。

問題は最後の「極限」です。有限問題ごとのポテンシャルは異なる関数なので、何もせず極限を取れるわけではありません。定数シフトで一点の値を固定し、有界性と一様連続性を揃えれば、コンパクト空間上の関数列から [一様収束](../../../基礎科目/RA/RA5/index.md#def-ra5-uniform) する部分列を取り出せます。

<a id="thm-otr6-compact-duality"></a>

<!-- formal-statement-start -->
> **定理（コンパクト空間のKantorovich双対性と双対達成）**
> $X,Y$ を空でないコンパクト距離空間、$\mu,\nu$ をそれぞれの Borel 確率測度、$c:X\times Y\to\mathbb R$ を連続費用とする。このとき主問題と連続双対問題はいずれも最適値を達成し、

$$
\min_{\pi\in\Pi(\mu,\nu)}\int c\,d\pi
=\max_{\substack{f\in C(X),\ g\in C(Y)\\f(x)+g(y)\le c(x,y)}}
\left(\int f\,d\mu+\int g\,d\nu\right).
$$

> さらに双対最適対は $c$-共役対となるように選べる。
<!-- formal-statement-end -->

### 証明の見取り図

小さなセルの有限LPを解き、離散双対変数から代表点についての有限最小値で $f_\delta$ を延長し、これを $c$-変換して $g_\delta$ を作ります。連続ポテンシャルの目的値は有限最適値から高々小さな誤差しか下がりません。次に一点で規格化した関数列の一様収束部分列を構成し、実行可能性と目的値を極限へ渡します。最後に $c$-変換で共役対に改良します。

<!-- proof-start -->
### 証明

**（1）有限LPの双対解を連続関数へ延長する。**

$\delta_k\downarrow0$ とし、[有限分割補題](#lem-otr6-finite-partition)の分割 $A_i^{(k)},B_j^{(k)}$ を作ります。添字 $k$ を一時省略し、代表点と質量を $x_i,y_j,a_i,b_j$ と書きます。[有限強双対性](../OTR5/index.md#thm-otr5-strong-duality)から有限個の実数 $u_i,v_j$ が存在し、

$$
u_i+v_j\le c(x_i,y_j),\qquad
\sum_i a_i u_i+\sum_j b_j v_j=P_\delta
$$

を満たします。ここで出発側の連続関数を

$$
f_\delta(x)=\min_j\{c(x,y_j)-v_j\}
$$

と定義します。有限個の連続関数の最小値なので連続です。各代表点 $x_i$ では有限LPの制約から

$$
u_i\le c(x_i,y_j)-v_j\quad(\forall j)
\quad\Longrightarrow\quad u_i\le f_\delta(x_i)
$$

です。次に $c$-変換を施して

$$
g_\delta(y)=f_\delta^c(y)
=\min_{x\in X}\{c(x,y)-f_\delta(x)\}
$$

とします。[変換の命題](#prop-otr6-c-transform-improvement)により $g_\delta\in C(Y)$ で $(f_\delta,g_\delta)$ は双対実行可能です。しかも $f_\delta$ の定義からすべての $x$ で $f_\delta(x)\le c(x,y_j)-v_j$、従って

$$
g_\delta(y_j)=\min_{x\in X}\{c(x,y_j)-f_\delta(x)\}\ge v_j.
$$

これで **離散双対目的値より代表点での連続ポテンシャルの和が小さくならない** ことが示せました。

**（2）連続双対目的値の損失を評価する。**

[変換の一様連続性評価](#prop-otr6-c-transform-improvement)を一度 $f_\delta$（有限個の最小値）、一度 $g_\delta=f_\delta^c$ に使うと、各セル内の $x\in A_i,y\in B_j$ で

$$
|f_\delta(x)-f_\delta(x_i)|\le\omega(\delta),
\qquad
|g_\delta(y)-g_\delta(y_j)|\le\omega(\delta).
$$

確率測度の総質量は $1$ なので、セルごとに積分して足すと

$$
\begin{aligned}
\int_X f_\delta\,d\mu
&=\sum_i\int_{A_i}f_\delta(x)\,d\mu(x)
\ge\sum_i a_i f_\delta(x_i)-\omega(\delta),\\
\int_Y g_\delta\,d\nu
&\ge\sum_j b_j g_\delta(y_j)-\omega(\delta).
\end{aligned}
$$

代表点での不等式と有限LPの最適値を代入すると

$$
\begin{aligned}
\int f_\delta\,d\mu+\int g_\delta\,d\nu
&\ge\sum_i a_i u_i+\sum_j b_j v_j-2\omega(\delta)\\
&=P_\delta-2\omega(\delta)\\
&\ge P_c(\mu,\nu)-\omega(2\delta)-2\omega(\delta).
\end{aligned}
$$

一方 [弱双対](#thm-otr6-weak-duality)により左辺は常に $P_c$ 以下です。$\delta\downarrow0$ で誤差は $0$ に近づくため、この時点で既に **双対値の上限は主最適値に等しい** と証明できました。

**（3）双対最大値の達成を証明する。**

しかし上限が等しいだけでは、それを取る一組の関数があるとは限りません。点 $x_0\in X$ を固定し、定数シフト

$$
\widehat f_\delta(x)=f_\delta(x)-f_\delta(x_0),\qquad
\widehat g_\delta(y)=g_\delta(y)+f_\delta(x_0)
$$

を行います。制約・双対目的値・$c$-変換関係を保ち、$\widehat f_\delta(x_0)=0$ になります。第（2）段の一様連続性評価から

$$
|\widehat f_\delta(x)|
=|f_\delta(x)-f_\delta(x_0)|
\le\sup_{z\in Y}|c(x,z)-c(x_0,z)|\le2\|c\|_\infty.
$$

また $\widehat g_\delta=(\widehat f_\delta)^c$ なので、その定義と上の上界から

$$
|\widehat g_\delta(y)|\le\|c\|_\infty+\|\widehat f_\delta\|_\infty
\le3\|c\|_\infty.
$$

従って両列は一様有界です。第（2）段の評価は規格化後も変わらず、共通の一様連続性を持ちます。ここから一様収束部分列を得る根拠を明記します。$X,Y$ のそれぞれで半径 $1/m$ の有限網を全 $m\ge1$ について取り、その合併から可算個の点を並べます。[実数列の Bolzano--Weierstrass の定理](../../../基礎科目/RA/RA2/index.md#thm-ra2-bolzano-weierstrass)により有界数列には収束部分列があるので、この可算点列について順次部分列を選び、対角部分列を取れば、**同じ部分列で両関数のすべての網点の値が収束**します。

さらに任意の $\varepsilon>0$ に対し、費用 $c$ の一様連続性から半径 $r$ の近接点では両列の関数値の差が $\varepsilon/3$ 以下になるように $r$ を選べます。有限 $r$ 網の各点で対角部分列は Cauchy なので、十分後の二つの関数 $h_k,h_\ell$ と任意の点 $z$ について、近い網点 $z_i$ を介して

$$
|h_k(z)-h_\ell(z)|
\le|h_k(z)-h_k(z_i)|+|h_k(z_i)-h_\ell(z_i)|+|h_\ell(z_i)-h_\ell(z)|<\varepsilon.
$$

よって双方の関数列は一様 Cauchy で、[RA5 の一様 Cauchy 判定](../../../基礎科目/RA/RA5/index.md#thm-ra5-uniform-cauchy-criterion)により一様極限が存在します。[一様極限の連続性](../../../基礎科目/RA/RA5/index.md#thm-ra5-continuity)から $f_*\in C(X),g_*\in C(Y)$ です。この議論はコンパクト性と共通の変化量評価から一様収束を導いており、収束定理を無条件で使っているわけではありません。

各 $k$ で $\widehat f_{\delta_k}(x)+\widehat g_{\delta_k}(y)\le c(x,y)$ なので、極限を取って $f_*(x)+g_*(y)\le c(x,y)$ です。さらに確率測度上では

$$
\left|\int\widehat f_{\delta_k}\,d\mu-\int f_*\,d\mu\right|
\le\|\widehat f_{\delta_k}-f_*\|_\infty\longrightarrow0
$$

であり、$g$ についても同様です。第（2）段の上下の不等式を極限へ渡すと

$$
\int_X f_*\,d\mu+\int_Y g_*\,d\nu=P_c(\mu,\nu)
$$

を得ます。つまり双対最大値が**実際に達成されました**。主最小値の達成は第1節で確認したように、費用を $c_+=c-\min c\ge0$ に平行移動して [OTR3 の存在定理](../OTR3/index.md#thm-otr3-compact)を適用することで従います。

**（4）$c$-共役な最適対を選ぶ。**

最後に [変換による改良命題](#prop-otr6-c-transform-improvement)を最適対 $(f_*,g_*)$ に適用し、$f_1=g_*^c$、$g_1=f_1^c$ とします。新しい対は実行可能で双対目的値を減らしませんが、既に最大値 $P_c$ に達しているので、目的値は同じです。同命題から $f_1=g_1^c$ も成り立つため、$c$-共役な最適対が得られます。$\square$
<!-- proof-end -->

**二種類の結論を区別しましょう。** 第（2）段だけで $P_c=D_c$（双対ギャップがゼロ）が証明されます。第（3）段は、それを達成する**連続関数そのものの存在**を別に証明しています。非コンパクト空間で「値の一致」と「最大値の達成」を混同しないための区別です。

## 5. ポテンシャルはどの経路が最適かも教える

[OTR5 の相補性](../OTR5/index.md#thm-otr5-complementary-slackness)では、正の輸送質量があるセルは双対制約の等号セルでした。連続空間でも、双対余裕 $c-f-g$ が消える点だけに最適結合を集中させることができます。ただし連続空間では「セルの正の成分」ではなく、**測度がその集合にどれだけ質量を置くか**で言い直します。

<a id="def-otr6-contact-set"></a>

<!-- formal-statement-start -->
> **定義（双対等号集合）**
> 空でないコンパクト距離空間 $X,Y$、連続費用 $c$、双対実行可能な $(f,g)\in C(X)\times C(Y)$ に対して、**双対等号集合**を

$$
E(f,g)=\{(x,y)\in X\times Y:c(x,y)=f(x)+g(y)\}
$$

> と定義する。これは連続関数 $c-f-g$ の零点集合なので閉集合である。
<!-- formal-statement-end -->

<!-- definition-example-start: def-otr6-contact-set -->
### 定義の確認：等号集合は対角線より広いこともある

**定義の確認**：余裕の零点をすべて求め、閉集合性と結合の集中条件を確かめます。

$X=Y=[0,1]$、$c(x,y)=|x-y|$、$f(x)=-x$、$g(y)=y$ なら

$$
c(x,y)-f(x)-g(y)=2\max\{x-y,0\}.
$$

零点の条件は $x\le y$ なので $E(f,g)=\{(x,y):x\le y\}$ です。第1節の区間上の密度 $1$ の測度から $\delta_1$ への輸送は $y=1$ 上に集中し、確かにこの集合に含まれます。等号集合の全点へ質量を置く必要はなく、**結合の周辺条件も同時に満たす**必要があります。
<!-- definition-example-end -->

<a id="cor-otr6-contact-optimality"></a>

<!-- formal-statement-start -->
> **系（双対等号集合による最適性判定）**
> 空でないコンパクト距離空間 $X,Y$、Borel 確率測度 $\mu,\nu$、連続費用 $c$、許容結合 $\pi$、双対実行可能対 $(f,g)$ を取る。次の条件が成立するなら、結合とポテンシャルはともに最適である。

$$
\pi(E(f,g))=1.
$$

> 逆に、$(f,g)$ が双対最適対なら、$\pi$ が主最適であることと上の条件は同値である。
<!-- formal-statement-end -->

### 証明の見取り図

ギャップは非負連続関数 $h=c-f-g$ の積分です。積分がゼロという条件を、$h=0$ の集合へ全質量が集中するという条件へ読み替えます。

<!-- proof-start -->
### 証明

双対実行可能性から $h\ge0$ です。[ギャップ恒等式](#thm-otr6-weak-duality)により主費用と双対目的値の差は $\int h\,d\pi$ です。$\pi(E)=1$ なら $h=0$ が $\pi$-ほとんど至る所で成り立ち、差は $0$ です。弱双対により両者がともに最適です。

逆に $(f,g)$ と $\pi$ がそれぞれ最適なら、[強双対性](#thm-otr6-compact-duality)から差は $0$、従って $\int h\,d\pi=0$ です。任意の整数 $m\ge1$ に対し

$$
0=\int h\,d\pi\ge\frac1m\,\pi(\{h\ge1/m\})
$$

なので $\pi(\{h\ge1/m\})=0$ です。$\{h>0\}=\bigcup_{m\ge1}\{h\ge1/m\}$ だから、その質量も $0$ です。よって $\pi(E)=1$。逆向きは前段で示しました。$\square$
<!-- proof-end -->

この条件は **最適性の証明書** になります。結合 $\pi$ の**台**とは、どの開近傍にも正の $\pi$-質量がある点全体で、$\operatorname{supp}\pi$ と記します。コンパクト距離空間では、台の外側を可算個の零質量の開集合で覆えるため、$\pi(\operatorname{supp}\pi)=1$ です。$E(f,g)$ は閉集合なので、

$$
\pi(E(f,g))=1\quad\Longleftrightarrow\quad\operatorname{supp}\pi\subseteq E(f,g).
$$

実際、左から右は $E$ の外側が開いた零質量集合であることから従います。右から左は台が全質量を担うことから従います。一方、等号集合に含まれるというだけの点集合から、周辺分布を満たす結合の存在が保証されるわけではありません。次の OTR7 では、どの集合が最適輸送の支持として許されるかを、$c$-循環単調性で調べます。

### 二乗距離費用でも確認してみる

$X=Y=[0,1]$、$c(x,y)=(x-y)^2$、$\mu=\delta_0$、$\nu=\delta_1$ とします。$f(x)=x^2-2x$、$g(y)=y^2$ は

$$
c(x,y)-f(x)-g(y)
=(x-y)^2-(x^2-2x)-y^2=2x(1-y)\ge0
$$

で実行可能です。等号集合は $x=0$ または $y=1$ の和集合です。唯一の結合 $\pi=\delta_{(0,1)}$ はその集合に集中し、費用も双対目的値も $1$ となります。さらに

$$
\begin{aligned}
g^c(x)&=\min_{0\le y\le1}\{(x-y)^2-y^2\}=\min_y(x^2-2xy)=x^2-2x,\\
f^c(y)&=\min_{0\le x\le1}\{(x-y)^2-x^2+2x\}
=\min_x\{y^2+2x(1-y)\}=y^2.
\end{aligned}
$$

前者は $x\ge0$ なので $y=1$ で、後者は $1-y\ge0$ なので $x=0$ で最小になります。このように具体例で **制約、最適性、二方向の $c$-変換** を別々に確認できます。

### 非コンパクト空間へは何を持ち越せないか

今回の定理は $X,Y$ がコンパクト、$c$ が連続という形で証明しました。[OTR3](../OTR3/index.md#thm-otr3-polish)では非コンパクトな Polish 空間上の非負下半連続費用でも主最適結合の存在を示しましたが、**主問題の存在と双対の最適関数の存在は別問題**です。

例えば $X=Y=\mathbb R$、$c(x,y)=|x-y|$ とし、$\mu=\nu$ を Cauchy 分布（密度 $1/[\pi(1+x^2)]$）とします。対角結合で主最適値は $0$ です。形式的には次の関数が双対制約を満たします。

$$
f(x)=x,\qquad g(y)=-y,\qquad f(x)+g(y)=x-y\le|x-y|.
$$

ところが Cauchy 分布の正の側の一次積分は

$$
\int_0^R\frac{x}{\pi(1+x^2)}\,dx
=\frac{\log(1+R^2)}{2\pi}\longrightarrow\infty
$$

となり、負の側も絶対値について同様に発散します。従って $\int f\,d\mu$ も $\int g\,d\nu$ も Lebesgue 積分として定義されません。**この対を双対目的値 $0$ の証明書にしてはいけません。** この例では有界な零ポテンシャルが別にあるものの、一般の非コンパクト問題では積分可能性・モーメント条件・費用の成長条件、場合によっては関数クラスの調整が要ります。

また $\mathbb R$ には有限 $\delta$ 網がなく、$c$ も大域一様連続とは限らず、規格化したポテンシャルが大域一様有界になるとも限りません。従って第4節のコンパクト性による部分列抽出を、仮定なしにそのまま流用することはできません。

## 6. 演習：有限LPから連続の最適性証明書へ

### OTR6-A01 双対下界を実際の輸送費用と比べる
- Level: A

$X=Y=[0,1]$、$c(x,y)=|x-y|$、$\mu=\delta_0$、$\nu=\delta_1$ とする。$f(x)=-x$、$g(y)=y$ が双対実行可能であることを確かめ、双対目的値と唯一の許容結合の費用を計算せよ。両者が最適である理由を述べよ。

<!-- solution-start -->
**詳細解答**

すべての $x,y\in[0,1]$ に対して

$$
c(x,y)-f(x)-g(y)=|x-y|+x-y
=\begin{cases}0&(x\le y),\\2(x-y)&(x>y)
\end{cases}\ge0
$$

なので双対実行可能です。Dirac測度での積分は評価点での値だから、双対目的値は $f(0)+g(1)=0+1=1$ です。

第一周辺が $\delta_0$、第二周辺が $\delta_1$ の結合は $(0,1)$ に全質量を置く $\pi=\delta_{(0,1)}$ だけです。費用は $\int c\,d\pi=c(0,1)=1$。従って [弱双対性](#thm-otr6-weak-duality)により共通値 $1$ が主・双対の最適値です。
<!-- solution-end -->

### OTR6-A02 $c$-変換を場合分けで求める
- Level: A

$X=Y=[0,1]$、$c(x,y)=|x-y|$ とする。$g(y)=y$ から $f=g^c$ を求め、さらに $f^c=g$ を確かめよ。最小値を取る点がどこにあるかも示せ。

<!-- solution-start -->
**詳細解答**

固定した $x\in[0,1]$ に対し、$y\ge x$ なら $|x-y|-y=-x$ です。$y<x$ なら $|x-y|-y=x-2y>-x$ なので、前者で最小値が達成されて

$$
g^c(x)=\min_{0\le y\le1}(|x-y|-y)=-x.
$$

次に $f(x)=-x$ とすると、$x\le y$ では $|x-y|+x=y$、$x>y$ では $|x-y|+x=2x-y>y$ なので

$$
f^c(y)=\min_{0\le x\le1}(|x-y|+x)=y.
$$

最初の最小値は任意の $y\in[x,1]$ で、次は任意の $x\in[0,y]$ で達成されます。両方の変換が元へ戻るので、[定義](#def-otr6-c-transform)により $c$-共役対です。
<!-- solution-end -->

### OTR6-A03 定数シフトで何が変わらないか
- Level: A

$X=Y=[0,1]$、$c(x,y)=|x-y|$、$\mu$ を密度 $1$ の確率測度、$\nu=\delta_1$ とする。最適対 $f(x)=-x,g(y)=y$ を $t=2$ で $f'=f+t,g'=g-t$ と変形し、実行可能性、双対目的値、等号集合、$c$-共役関係を検算せよ。

<!-- solution-start -->
**詳細解答**

$f'(x)=2-x$、$g'(y)=y-2$ です。和は $f'(x)+g'(y)=y-x=f(x)+g(y)$ だから、制約 $y-x\le|x-y|$ と余裕 $|x-y|+x-y$ は変化しません。従って等号集合も変わらず $\{x\le y\}$ です。

目的値は

$$
\int_0^1(2-x)\,dx+g'(1)
=\left(2-\frac12\right)+(1-2)=\frac12.
$$

変換前も $-1/2+1=1/2$ です。最後に [A02 の計算](#def-otr6-c-transform)を定数だけずらして直接確かめると、

$$
\begin{aligned}
(g')^c(x)&=\min_y\{|x-y|-(y-2)\}=2-x=f'(x),\\
(f')^c(y)&=\min_x\{|x-y|-(2-x)\}=y-2=g'(y).
\end{aligned}
$$

従って $c$-共役関係も保たれます。確率測度の全質量が両方 $1$ だから、目的値の定数の寄与が $+2-2=0$ となります。
<!-- solution-end -->

### OTR6-A04 同じ最適輸送でも等号集合は違う
- Level: A

$X=Y=[0,1]$、$\mu=\nu$ を区間上の密度 $1$ の確率測度、$c(x,y)=|x-y|$ とする。対 $(f_1,g_1)=(0,0)$ と $(f_2(x),g_2(y))=(x,-y)$ について、実行可能性と最適性を確認し、それぞれの双対等号集合を求めよ。対角結合が双方の集合に集中することを確かめよ。

<!-- solution-start -->
**詳細解答**

第一の余裕は $|x-y|\ge0$、第二の余裕は $|x-y|-x+y=2\max\{y-x,0\}\ge0$ なので、どちらも双対実行可能です。双対目的値は第一が $0$、第二も

$$
\int_0^1 x\,dx+\int_0^1(-y)\,dy=\frac12-\frac12=0.
$$

対角への写像 $T(x)=x$ から作る [グラフ結合](../OTR2/index.md#prop-otr2-graph) $\pi=(\mathrm{id},\mathrm{id})_{\#}\mu$ の費用は $\int|x-x|\,d\mu=0$ です。[弱双対](#thm-otr6-weak-duality)から両対も $\pi$ も最適です。

等号集合は $E(f_1,g_1)=\{x=y\}$、$E(f_2,g_2)=\{y\le x\}$ です。対角線 $x=y$ は双方に含まれます。**等号集合が一意に定まることは、最適性には必要ありません。**
<!-- solution-end -->

### OTR6-B01 二乗距離の最適ポテンシャルを作る
- Level: B

$X=Y=[0,1]$、$c(x,y)=(x-y)^2$、$\mu=\delta_0$、$\nu=\delta_1$ とする。$g(y)=y^2$ の $c$-変換 $f=g^c$ と $f^c$ を求めよ。余裕 $c-f-g$ の因数分解を使って等号集合を記述し、主・双対最適値を証明せよ。

<!-- solution-start -->
**詳細解答**

固定した $x$ で

$$
g^c(x)=\min_{0\le y\le1}\{(x-y)^2-y^2\}
=\min_y\{x^2-2xy\}=x^2-2x
$$

です。$x\ge0$ で $-2x\le0$ なので $y=1$ が最小点です。次に

$$
f^c(y)=\min_{0\le x\le1}\{(x-y)^2-(x^2-2x)\}
=\min_x\{y^2+2x(1-y)\}=y^2
$$

で、$1-y\ge0$ なので $x=0$ が最小点です。よって $f(x)=x^2-2x$、$g(y)=y^2$ は [共役対](#def-otr6-c-transform)です。費用から和を引くと

$$
(x-y)^2-(x^2-2x)-y^2=2x(1-y)\ge0
$$

で、等号は $x=0$ または $y=1$ のときに成立します。唯一の結合 $\pi=\delta_{(0,1)}$ はその集合に集中します。主費用は $c(0,1)=1$、双対目的値は $f(0)+g(1)=0+1=1$ なので [最適性判定](#cor-otr6-contact-optimality)から最適値は $1$ です。
<!-- solution-end -->

### OTR6-B02 分割誤差の一般上界と実際の誤差を比較する
- Level: B

$X=Y=[0,1]$、$c(x,y)=|x-y|$、$\mu$ は区間上の密度 $1$ の確率測度、$\nu=\delta_1$ とする。$X$ を $m\ge2$ 個の長さ $1/m$ の区間へ分け、代表点を $x_i=(i-1/2)/m$ とする。$Y$ も同様に分割し、最終セルの代表点だけは $y_m=1$ とする（それ以外の代表点は各セル内の任意の点でよい）。離散最適値 $P_{1/m}$ を計算し、[有限分割補題](#lem-otr6-finite-partition)の誤差上界と比較せよ。

<!-- solution-start -->
**詳細解答**

$X$ の各セルの $\mu$ 質量は $a_i=1/m$、$Y$ では $\nu$ が点 $1$ に集中するので $b_m=1$、それ以外の $b_j=0$ です。行和・列和を満たし各成分が非負の輸送行列は $p_{im}=1/m$、$p_{ij}=0$（$j\ne m$）だけなので

$$
\begin{aligned}
P_{1/m}&=\frac1m\sum_{i=1}^m|x_i-1|
=\frac1m\sum_{i=1}^m\left(1-\frac{i-1/2}{m}\right)\\
&=1-\frac1{m^2}\left(\frac{m(m+1)}2-\frac m2\right)
=\frac12.
\end{aligned}
$$

元の結合も $\mu\otimes\delta_1$ の一つだけで、最適費用は $P_c=\int_0^1(1-x)\,dx=1/2$ です。つまり実際の誤差は $0$。

絶対値の差の評価と実数の加法について、

$$
\big||x-y|-|x'-y'|\big|\le|x-x'|+|y-y'|
$$

だから $\omega(r)\le r$ であり、分割補題は $|P_c-P_{1/m}|\le\omega(2/m)\le2/m$ を保証します。**一般上界はどの測度にも通用する代わりに、この特定例では鋭くありません**。最終セルの代表点を $1$ に取ったことも誤差 $0$ に寄与しています。
<!-- solution-end -->

### OTR6-B03 二度変換したら本当に止まるか
- Level: B

空でないコンパクト距離空間 $X,Y$ と連続費用 $c$ を取る。任意の $g\in C(Y)$ に対して $f=g^c$、$g_1=f^c$ とする。$g_1\ge g$、$(g_1)^c=f$ を証明せよ。$\mu,\nu$ が Borel 確率測度のとき、$(f,g_1)$ は $(f,g)$ より双対目的値を下げないことも示せ。

<!-- solution-start -->
**詳細解答**

$f(x)=\min_y(c(x,y)-g(y))$ なので、すべての $x,y$ で $f(x)\le c(x,y)-g(y)$ です。従って $g(y)\le c(x,y)-f(x)$ を $x$ について最小化すれば

$$
g(y)\le\min_x\{c(x,y)-f(x)\}=g_1(y).
$$

一方 $g_1\ge g$ から、$c(x,y)-g_1(y)\le c(x,y)-g(y)$ を $y$ について最小化すると

$$
(g_1)^c(x)\le g^c(x)=f(x).
$$

逆向きには、$g_1(y)=\min_z(c(z,y)-f(z))\le c(x,y)-f(x)$ だから $f(x)\le c(x,y)-g_1(y)$ です。全 $y$ の最小値を取って $f(x)\le(g_1)^c(x)$。よって $(g_1)^c=f$ です。$c$-変換は連続関数を連続関数に写すので、$(f,g)$ と $(f,g_1)$ は双対実行可能です。最後に

$$
\left(\int f\,d\mu+\int g_1\,d\nu\right)
-\left(\int f\,d\mu+\int g\,d\nu\right)
=\int(g_1-g)\,d\nu\ge0
$$

です。$g_1$ への置換で目的値を改善しつつ $c$-共役対に到達できます。
<!-- solution-end -->

### OTR6-C01 区間の有限分割から連続双対を再構成する
- Level: C

$X=Y=[0,1]$、$c(x,y)=|x-y|$ とし、$\mu,\nu$ を任意の Borel 確率測度とする。区間を長さ高々 $1/m$ の Borel セルへ分け、代表点を選んだ有限輸送最適値を $P_m$ とする。次の順序で、連続双対の最大値が存在し主最適値 $P$ に一致することを証明せよ。

1. $|P-P_m|\le2/m$ を示す。
2. 有限双対最適解 $u_i,v_j$ から $f_m(x)=\min_j(|x-y_j|-v_j)$、$g_m=f_m^c$ を作り、$\int f_m\,d\mu+\int g_m\,d\nu\ge P-4/m$ を示す。
3. $f_m(0)=0$ となるよう定数シフトし、規格化した $f_m,g_m$ の一様収束部分列を作って結論へ進む。

<!-- solution-start -->
**詳細解答**

**1. 最適値の近似。** 絶対値の逆三角不等式を二度使うと

$$
\big||x-y|-|x'-y'|\big|\le|x-x'|+|y-y'|.
$$

各セルで代表点との距離は高々 $1/m$ なので、すべてのセルで費用の差は $2/m$ 以下です。連続結合をセル質量へ写す方向と、離散結合を各セルの条件付き周辺測度の積で持ち上げる方向を [近似補題](#lem-otr6-finite-partition)と同じく実施すると、双方の費用差は $2/m$ 以下です。よって $P_m\le P+2/m$ と $P\le P_m+2/m$ が得られます。

**2. 双対目的値の評価。** [有限強双対性](../OTR5/index.md#thm-otr5-strong-duality)により、有限問題で $u_i+v_j\le|x_i-y_j|$、$\sum_i a_i u_i+\sum_j b_j v_j=P_m$ とする $u,v$ が取れます。$f_m(x)=\min_j(|x-y_j|-v_j)$ なら $f_m(x_i)\ge u_i$。さらに $g_m(y)=\min_x(|x-y|-f_m(x))$ は $g_m(y_j)\ge v_j$ を満たし、$(f_m,g_m)$ は実行可能です。

$|f_m(x)-f_m(x')|\le|x-x'|$ は最小値の差の評価から得られ、$g_m$ も同じく $1$-Lipschitz です。各セルで代表点との差は高々 $1/m$ だから

$$
\begin{aligned}
\int f_m\,d\mu+\int g_m\,d\nu
&\ge\sum_i a_i f_m(x_i)+\sum_jb_jg_m(y_j)-\frac2m\\
&\ge P_m-\frac2m\ge P-\frac4m.
\end{aligned}
$$

また [弱双対](#thm-otr6-weak-duality)により左辺は $P$ 以下なので、目的値は $P$ に近づきます。

**3. 極限と達成。** $f_m$ の代わりに $\widehat f_m(x)=f_m(x)-f_m(0)$、$g_m$ の代わりに $\widehat g_m(y)=g_m(y)+f_m(0)$ を使います。両方の和・目的値は変わらず、$\widehat f_m(0)=0$ です。$1$-Lipschitz 性から $|\widehat f_m(x)|\le x\le1$、また $\widehat g_m=(\widehat f_m)^c$ なので $|\widehat g_m(y)|\le2$ です。

有界性と共通の $1$-Lipschitz 性を用い、$[0,1]$ の有理数点で対角部分列を取り、両関数が同じ部分列上で各有理点に収束するようにします。$\varepsilon>0$ に対し有理点からなる有限 $\varepsilon/4$ 網 $\{z_i\}$ を取り、そこでは十分大きい $k,\ell$ に対して $|h_k(z_i)-h_\ell(z_i)|<\varepsilon/2$ とできます。任意の $z$ に近い $z_i$ を選べば

$$
|h_k(z)-h_\ell(z)|\le |z-z_i|+|h_k(z_i)-h_\ell(z_i)|+|z_i-z|<\varepsilon.
$$

ここで $h_m$ は規格化した $f_m$ または $g_m$ のどちらかです。従って両列は一様 Cauchy で、[一様 Cauchy 判定](../../../基礎科目/RA/RA5/index.md#thm-ra5-uniform-cauchy-criterion)と[一様極限の連続性](../../../基礎科目/RA/RA5/index.md#thm-ra5-continuity)から連続関数 $f_*,g_*$ に一様収束します。各 $m$ で $\widehat f_m(x)+\widehat g_m(y)\le|x-y|$ なので極限も実行可能です。さらに確率測度に対し積分差は一様ノルム以下だから、第2段の評価を極限へ渡すと

$$
P\ge\int f_*\,d\mu+\int g_*\,d\nu
\ge\lim_{m\to\infty}\left(P-\frac4m\right)=P.
$$

ここで左の不等式は弱双対です。よって目的値は厳密に $P$ となり、双対最大値が $f_*,g_*$ で達成されます。さらに [コンパクト空間での主最適結合の存在](../OTR3/index.md#thm-otr3-compact)により主最小値も達成されます。$\square$
<!-- solution-end -->

## 7. この章で得たもの

- 双対実行可能な連続関数は、結合の周辺積分を通じて輸送費用の下界を与えます。ギャップは $c-f-g$ の非負積分です。
- $c$-変換は相手のポテンシャルを最大まで引き上げ、$c$-共役対を構成します。費用の一様連続性がポテンシャルにも受け継がれます。
- 有限分割の輸送問題は誤差 $\omega(2\delta)$ 以内で元の問題を近似し、有限LPの双対解を連続関数へ伸ばすことができます。
- コンパクト空間・連続費用では最適双対関数も存在し、主最適値と双対最大値は一致します。等号集合に集中する結合は最適です。

次の OTR7 では、ポテンシャルを先に与えずに輸送の支持集合から最適性を判定するため、$c$-循環単調性へ進みます。
