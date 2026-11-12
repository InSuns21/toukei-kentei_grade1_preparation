# INV9 疎性とTVは何を残すか

<!-- definition-example-audit: strict -->

[INV8の一般変分正則化](../INV8/index.md#def-inv8-variational-objective)では、観測への適合度と罰則を別々に選べること、適切な条件の下で最小点が存在することを学びました。しかし二乗ノルム罰則は、**小さくしたい成分を正確に零にする**目的には必ずしも向きません。また画像の輪郭を滑らかに薄めず、平坦な領域と鋭い段差を残すには何を罰するべきでしょうか。

本講では実数ベクトルを未知量とし、成分の大きさを足す $\ell^1$ 罰則と、隣接差分の絶対値を足す全変動（TV）罰則を調べます。先に有限次元で最適性条件を自力で導出し、その条件から疎性と段差保存の機構を確認します。さらに一般の凸罰則を比較する Bregman 距離を導入します。**連続関数のBV理論と有限個の画素のTVは同一視しません。**

## 1. 二乗罰則では消えない成分を消す

実行列 $A\in\mathbb R^{m\times n}$、観測 $y\in\mathbb R^m$、$\lambda>0$ を固定します。既習の[二乗ノルム Tikhonov 最小化](../INV5/index.md#thm-inv5-tikhonov-minimizer)に対応する有限次元の模型は

$$
\frac12\|Ax-y\|_2^2+\frac{\lambda}{2}\|x\|_2^2
$$

です。ところが $A=I_n$ なら各座標の最小点は $x_i=y_i/(1+\lambda)$ です。$y_i\ne0$ だった座標は、いくら小さくなっても零にはなりません。

未知量が「多数の座標のうち少数だけが非零」と想定されるとき、まず成分の絶対値を足す罰則を考えます。これは非零座標の個数そのものではありませんが、凸性を保ちながら正確な零を生みます。

<a id="def-inv9-l1-regularization"></a>

<!-- formal-statement-start -->
> **定義（有限次元のℓ¹正則化）**  
> $A\in\mathbb R^{m\times n}$、$y\in\mathbb R^m$、$\lambda>0$ とする。$x=(x_1,\ldots,x_n)\in\mathbb R^n$ の $\ell^1$ 罰則を

$$
R_1(x)=\|x\|_1:=\sum_{i=1}^n|x_i|
$$

> と置き、目的関数を

$$
J_\lambda(x)=\frac12\|Ax-y\|_2^2+\lambda\|x\|_1
$$

> とする。$x$ の非零成分の個数が少ない性質を疎性という。
<!-- formal-statement-end -->

<!-- definition-example-start: def-inv9-l1-regularization -->

**定義の確認**：$x=(3,0,-2,0)$ は非零成分が2個、$\|x\|_1=|3|+0+|-2|+0=5$ です。これに対し $\|x\|_2^2=3^2+(-2)^2=13$ です。**非零成分の個数と $\ell^1$ ノルムは別の量**です。例えば $(1/10,1/10,1/10)$ の非零成分は3個ですが $\ell^1$ ノルムは $3/10$ にすぎません。さらに $A=I_4$、$y=(2,0,-1,1)$、$\lambda=1$ とすると、この $x$ の残差は $Ax-y=(1,0,-1,-1)$ です。したがって定義した目的関数の値まで計算でき、

$$
J_1(x)=\frac12(1^2+0^2+(-1)^2+(-1)^2)+\|x\|_1=\frac32+5=\frac{13}{2}.
$$
<!-- definition-example-end -->

$J_\lambda$ は連続で、

$$
J_\lambda(x)\ge\lambda\|x\|_1\ge\lambda\|x\|_2
$$

です。最後の不等式は $(\sum_i|x_i|)^2=\sum_i x_i^2+2\sum_{i<j}|x_ix_j|\ge\sum_i x_i^2$ から従います。従って $J_\lambda(x)\to\infty$（$\|x\|_2\to\infty$）。有限次元の有界閉集合から収束部分列を取る直接法、または[INV8の存在定理](../INV8/index.md#thm-inv8-existence)により最小点が存在します。

## 2. 折れ曲がった絶対値をどう微分するか

$|t|$ は $t=0$ で微分できません。そこで、一つの数 $p$ が凸関数 $R$ を点 $z$ で下から支える一次式

$$
R(x)\ge R(z)+\langle p,x-z\rangle
\qquad(\text{すべての }x)
$$

を満たすかどうかで最小化を調べます。この条件は「接線の代わりに支える直線・超平面を置く」という意味です。

[OPT3の劣勾配・劣微分の定義](../../../応用系/OPT/OPT3/index.md#def-opt3-subgradient)を、この章では有限値の凸関数 $R:\mathbb R^n\to\mathbb R$ に適用します。つまり点 $z$ での劣勾配 $p$ は、すべての $x$ について

$$
R(x)\ge R(z)+\langle p,x-z\rangle
$$

を満たすベクトルで、その全体を $\partial R(z)$ と書きます。以下の確認は、新しい定義を重ねるのではなく、この不等式を絶対値に適用する練習です。

**既習定義の直接確認**：$R(t)=|t|$、$z=0$ では、$p=1/2$ とすると $|t|\ge t/2$ が $t\ge0$ でも $t<0$ でも成立します。$p=-1$ や $p=1$ も成立します。一方 $p=2$ は $t=1$ で $1\ge2$ が破れます。したがって劣勾配は一つに限られません。

<a id="prop-inv9-absolute-subgradient"></a>

<!-- formal-statement-start -->
> **命題（絶対値とℓ¹ノルムの劣微分）**  
> $r(t)=|t|$（$t\in\mathbb R$）と $R_1(x)=\sum_{i=1}^n|x_i|$（$x\in\mathbb R^n$）について

$$
\partial r(t)=
\begin{cases}
\{1\}&t>0,\\
[-1,1]&t=0,\\
\{-1\}&t<0,
\end{cases}
$$

> かつ

$$
\partial R_1(x)
=\{p\in\mathbb R^n:p_i\in\partial r(x_i)\ (1\le i\le n)\}.
$$
<!-- formal-statement-end -->

### 証明の見取り図

零以外では、支える直線の傾きは左右の小さな増分による割り算を比較して固定されます。零では正方向と負方向が $p$ を挟みます。多変数の場合は一座標だけを動かすと必要性が、各座標の不等式を足すと十分性が得られます。

<!-- proof-start -->
### 証明

$t>0$ なら十分小さい正負の $h$ に対し $|t+h|=t+h$ です。劣勾配の不等式に $x=t+h$ を代入すると $h\ge ph$。$h>0$ で $p\le1$、$h<0$ で $p\ge1$、従って $p=1$ です。$t<0$ でも同じ操作を $|t+h|=-(t+h)$ に施して $p=-1$ です。それぞれ $|x|\ge |t|+p(x-t)$ は符号を場合分けして直接確かめられます。

$t=0$ では $|h|\ge ph$ がすべての $h$ で成立することが条件です。$h>0$ を入れて $p\le1$、$h<0$ を入れて $p\ge-1$ です。逆に $|p|\le1$ なら $ph\le|p||h|\le|h|$ なので十分です。

$R_1$ の劣勾配 $p$ に対し、$x$ から第 $i$ 座標だけ $h$ へ変更した点を不等式に入れると

$$
|h|\ge|x_i|+p_i(h-x_i)
$$

となり、$p_i\in\partial r(x_i)$ が必要です。逆に各 $i$ でこの不等式が成り立てば、それらを $i=1,\ldots,n$ で足して

$$
\sum_i|v_i|\ge\sum_i|x_i|+\sum_i p_i(v_i-x_i)
$$

を得ます。よって $p\in\partial R_1(x)$ です。$\square$
<!-- proof-end -->

## 3. 疎性を決める最適性条件

二乗残差 $f(x)=\tfrac12\|Ax-y\|_2^2$ は微分可能で、任意の方向 $h$ への変化は

$$
f(x+th)-f(x)
=t\langle A^{\mathsf T}(Ax-y),h\rangle
+\frac{t^2}{2}\|Ah\|_2^2
$$

です。したがって勾配は $g=A^{\mathsf T}(Ax-y)$ です。これは行列の転置を使う有限次元の等式であり、無限次元の劣微分公式を暗黙に使っていません。以下、$\operatorname{sgn}(u)$ は実数 $u>0$ で $1$、$u<0$ で $-1$、$u=0$ で $0$ を返す符号関数です。また $e_i\in\mathbb R^n$ は第 $i$ 成分だけが $1$、他は $0$ の標準基底ベクトルとします。一座標だけを動かす $x+te_i$ では、$t\in\mathbb R$ がその座標の増分を表します。

<a id="thm-inv9-l1-optimality"></a>

<!-- formal-statement-start -->
> **定理（有限次元ℓ¹正則化の必要十分な最適性条件）**  
> $A\in\mathbb R^{m\times n}$、$y\in\mathbb R^m$、$\lambda>0$ とする。$x_*\in\mathbb R^n$ が

$$
J_\lambda(x)=\frac12\|Ax-y\|_2^2+\lambda\|x\|_1
$$

> の大域最小点であるための必要十分条件は、$g=A^{\mathsf T}(Ax_*-y)$ と置いたとき、各 $i$ で

$$
\begin{cases}
g_i=-\lambda\,\operatorname{sgn}(x_{*,i})&x_{*,i}\ne0,\\
|g_i|\le\lambda&x_{*,i}=0
\end{cases}
$$

> が成り立つことである。同値に、ある $p\in\partial R_1(x_*)$ が存在して

$$
A^{\mathsf T}(Ax_*-y)+\lambda p=0
$$

> を満たすことである。さらに $A$ の列が線形独立（$A$ が単射）なら最小点は一意である。
<!-- formal-statement-end -->

### 証明の見取り図

最小点から一座標だけずらし、$t\downarrow0$ と $t\uparrow0$ を別々に調べると零座標の幅 $[-\lambda,\lambda]$ が現れます。逆向きには二乗残差の展開と劣勾配の支持不等式を足して、すべての候補との差が非負と示します。

<!-- proof-start -->
### 証明

**必要性。** $x_*$ が最小点なら、任意の座標 $i$ と $t\in\mathbb R$ について

$$
0\le J_\lambda(x_*+te_i)-J_\lambda(x_*)
=tg_i+\frac{t^2}{2}\|Ae_i\|_2^2
+\lambda(|x_{*,i}+t|-|x_{*,i}|).
$$

$x_{*,i}>0$ なら十分小さい $|t|$ で最後の差は $t$ です。$t>0$ と $t<0$ からそれぞれ割り、$t\to0$ として $g_i+\lambda=0$ が必要です。$x_{*,i}<0$ の場合は差が $-t$ なので $g_i-\lambda=0$ です。

$x_{*,i}=0$ なら $t>0$ から $g_i+\lambda\ge0$、$t<0$ から $g_i-\lambda\le0$ を得て、$-\lambda\le g_i\le\lambda$ です。[劣微分の命題](#prop-inv9-absolute-subgradient)により各場合とも $p_i=-g_i/\lambda\in\partial r(x_{*,i})$ なので、ベクトル $p$ は $\partial R_1(x_*)$ に属します。

**十分性。** $g+\lambda p=0$ と $p\in\partial R_1(x_*)$ を仮定します。任意の $v$ に対し残差の平方を展開し、劣勾配の定義を使うと

$$
\begin{aligned}
J_\lambda(v)-J_\lambda(x_*)
&=\langle g,v-x_*\rangle
+\frac12\|A(v-x_*)\|_2^2
+\lambda(R_1(v)-R_1(x_*))\\
&\ge\langle g+\lambda p,v-x_*\rangle
+\frac12\|A(v-x_*)\|_2^2\\
&=\frac12\|A(v-x_*)\|_2^2\ge0.
\end{aligned}
$$

ゆえに $x_*$ は大域最小点です。$A$ が単射なら、$v\ne x_*$ に対して右辺は正となるので最小点は一意です。$\square$
<!-- proof-end -->

**零座標の意味**：$x_{*,i}=0$ では勾配が一つの値に等しい必要はなく、$|g_i|\le\lambda$ の幅の中に入れば足ります。この幅が「小さい成分を正確に零にする」鍵です。逆に、この条件だけで最小点の非零座標数が必ず少ないと断言できるわけではありません。観測行列とデータに依存します。

### 直接例：ソフト閾値

<a id="prop-inv9-soft-threshold"></a>

<!-- formal-statement-start -->
> **命題（恒等観測のソフト閾値公式）**  
> $A=I_n$ のとき、$y\in\mathbb R^n$、$\lambda>0$ に対する $\ell^1$ 正則化の唯一の最小点は、各座標で

$$
x_{*,i}=\operatorname{sgn}(y_i)\max\{|y_i|-\lambda,0\},
\qquad \operatorname{sgn}(0)=0
$$

> である。
<!-- formal-statement-end -->

### 証明の見取り図

成分ごとに正・負・零の三場合を比較します。零座標を認める区間は、絶対値の劣微分が幅を持つ部分に一致します。

<!-- proof-start -->
### 証明

各座標は独立で、$j_i(t)=\tfrac12(t-y_i)^2+\lambda|t|$ を最小化すれば足ります。$t>0$ では微分条件 $t-y_i+\lambda=0$ から $t=y_i-\lambda>0$ が必要なので $y_i>\lambda$。$t<0$ では $t-y_i-\lambda=0$ から $t=y_i+\lambda<0$ が必要なので $y_i<-\lambda$。$t=0$ では[最適性定理](#thm-inv9-l1-optimality)が $|-y_i|\le\lambda$ を要求します。

この三場合をまとめると表示公式です。$A=I_n$ は単射なので解は一意です。$\square$
<!-- proof-end -->

例えば $y=(3,0.4,-2)$、$\lambda=1$ なら

$$
x_*=(2,0,-1).
$$

第2座標は $|0.4|\le1$ のため**厳密に零**です。同じ係数で二乗ノルム罰則 $\tfrac\lambda2\|x\|_2^2$ を使うと $(1.5,0.2,-1)$ となり、第2座標は残ります。疎性を強制するのは「罰則が大きい」ことだけでなく、**原点での折れ曲がり**です。

## 4. 凸罰則を比較する Bregman 距離

普通の距離 $\|x-z\|$ は位置の差を測ります。一方、凸罰則 $R$ のある点 $z$ で選んだ劣勾配 $p$ に対し、$R$ のグラフとその[OPT2で導入した支持超平面](../../../応用系/OPT/OPT2/index.md#def-opt2-supporting-hyperplane)に相当する一次式の間の高さを測る量を作れます。

<a id="def-inv9-bregman"></a>

<!-- formal-statement-start -->
> **定義（劣勾配に依存するBregman距離）**  
> 有限値凸関数 $R:\mathbb R^n\to\mathbb R$、点 $z\in\mathbb R^n$、劣勾配 $p\in\partial R(z)$ を固定する。$x\in\mathbb R^n$ に対し

$$
D_R^p(x,z):=R(x)-R(z)-\langle p,x-z\rangle
$$

> を $p$ に関する Bregman 距離という。「距離」という名称だが、一般に対称性や $D_R^p(x,z)=0\Rightarrow x=z$ は要求しない。
<!-- formal-statement-end -->

<!-- definition-example-start: def-inv9-bregman -->

**定義の確認**：$R(t)=|t|$、$z=0$、$p=0$ を選ぶと、[絶対値の劣微分](#prop-inv9-absolute-subgradient)から $p\in\partial R(0)$ であり、$D_R^0(1,0)=1$ です。一方、基点を $z=1$、$p=1$ に変えれば $D_R^1(0,1)=0-1-1(0-1)=0$。引数を逆転すると値が変わります。さらに $D_R^1(2,1)=2-1-(2-1)=0$ ですが $2\ne1$ です。
<!-- definition-example-end -->

<a id="prop-inv9-bregman-nonnegative"></a>

<!-- formal-statement-start -->
> **命題（Bregman距離の非負性）**  
> 有限値凸関数 $R:\mathbb R^n\to\mathbb R$ と $p\in\partial R(z)$ に対し、任意の $x$ で $D_R^p(x,z)\ge0$。特に $R(x)=\tfrac12\|x\|_2^2$ の場合は $p=z$ が唯一の劣勾配であり、

$$
D_R^z(x,z)=\frac12\|x-z\|_2^2
$$

> となる。
<!-- formal-statement-end -->

### 証明の見取り図

非負性は劣勾配の定義を書き直しただけですが、二乗ノルムの場合は内積の展開によって通常の距離と結び付きます。

<!-- proof-start -->
### 証明

$p\in\partial R(z)$ の意味は $R(x)\ge R(z)+\langle p,x-z\rangle$ なので移項して非負性を得ます。二乗ノルムの場合は

$$
R(x)-R(z)-\langle z,x-z\rangle
=\frac12\|x\|_2^2-\frac12\|z\|_2^2
-\langle z,x\rangle+\|z\|_2^2
=\frac12\|x-z\|_2^2.
$$

この場合の劣勾配が $z$ だけであることは $R(z+h)-R(z)=\langle z,h\rangle+\tfrac12\|h\|^2$ に劣勾配の不等式を入れ、$h=tv$ の正負両側から $t\to0$ とすることで確認できます。$\square$
<!-- proof-end -->

Bregman 距離は、罰則の**どの面に沿って動いたか**を区別します。折れ曲がらない二乗罰則なら零は一致点だけですが、$\ell^1$ の同じ線形な面の内部では異なる点でも零になり得ます。

## 5. 成分ではなく隣接差分を罰する：離散 TV

画像や時系列で「多くの画素値が零」とは限りません。むしろ**近くの値は等しく、変化する場所は少ない**と期待することがあります。このとき絶対値を取る対象を $x_i$ から隣接差分 $x_{i+1}-x_i$ に替えます。

<a id="def-inv9-discrete-tv"></a>

<!-- formal-statement-start -->
> **定義（一次元離散全変動）**  
> $n\ge2$、$x=(x_1,\ldots,x_n)\in\mathbb R^n$ とし、差分作用素 $D:\mathbb R^n\to\mathbb R^{n-1}$ を

$$
(Dx)_i=x_{i+1}-x_i\qquad(1\le i<n)
$$

> で定める。一次元離散全変動を

$$
\operatorname{TV}_d(x)=\|Dx\|_1
=\sum_{i=1}^{n-1}|x_{i+1}-x_i|
$$

> とする。データ $y\in\mathbb R^n$ と $\lambda>0$ に対する TV 正則化は

$$
T_\lambda(x)=\frac12\|x-y\|_2^2+\lambda\operatorname{TV}_d(x)
$$

> を最小化する問題である。
<!-- formal-statement-end -->

<!-- definition-example-start: def-inv9-discrete-tv -->

**定義の確認**：$x=(1,1,4,4)$ は成分がすべて非零なので疎なベクトルではありません。しかし $Dx=(0,3,0)$ で、差分は一つの場所だけ非零です。よって $\operatorname{TV}_d(x)=3$。例えば $y=(1,1,3,3)$、$\lambda=1$ を選べば、$x-y=(0,0,1,1)$ なので $T_1(x)=\tfrac12(1^2+1^2)+3=4$ となり、目的関数の二つの項も確認できます。一方、一定ベクトル $c(1,1,1,1)$ は $Dx=0$ なので TV が零になります。
<!-- definition-example-end -->

ここで $D$ の成分を書き下すと、$q=(q_1,\ldots,q_{n-1})$ との内積は

$$
\begin{aligned}
\langle q,Dh\rangle
&=\sum_{i=1}^{n-1}q_i(h_{i+1}-h_i)\\
&=-q_1h_1+\sum_{j=2}^{n-1}(q_{j-1}-q_j)h_j+q_{n-1}h_n\\
&=\langle D^{\mathsf T}q,h\rangle.
\end{aligned}
$$

ここで中間の和は $n=2$ の場合は空和（零）です。$h$ の各成分の係数を読み取ると、転置作用素 $D^{\mathsf T}:\mathbb R^{n-1}\to\mathbb R^n$ の成分は

$$
(D^{\mathsf T}q)_j=
\begin{cases}
-q_1&j=1,\\
q_{j-1}-q_j&2\le j\le n-1,\\
q_{n-1}&j=n.
\end{cases}
$$

特に $n=2$ なら $D^{\mathsf T}q=(-q_1,q_1)$ です。差分への劣勾配をこの転置で元の座標へ戻す理由は、この内積の恒等式にあります。$D$ の階数や特異値を突然使って判定する必要はありません。

<a id="prop-inv9-tv-certificate"></a>

<!-- formal-statement-start -->
> **命題（離散TVの最小性を示す証明書）**  
> $n\ge2$、$y,z\in\mathbb R^n$、$\lambda>0$ とし、$r(t)=|t|$ と置く。$q\in\mathbb R^{n-1}$ が各 $i$ で

$$
q_i\in\partial r((Dz)_i)
$$

> を満たし、さらに

$$
z-y+\lambda D^{\mathsf T}q=0
$$

> が成立するとする。このとき $z$ は $T_\lambda$ の**唯一の大域最小点**である。
<!-- formal-statement-end -->

### 証明の見取り図

$q_i$ は各差分を下から支える傾きです。支持不等式を足して $\operatorname{TV}_d$ の下界を作り、残差の平方を展開します。残った平方項が正なので一意性まで出ます。

<!-- proof-start -->
### 証明

$q_i\in\partial r((Dz)_i)$ を[OPT3の劣勾配の定義](../../../応用系/OPT/OPT3/index.md#def-opt3-subgradient)に代入すると、任意の $v$ に対して

$$
|(Dv)_i|\ge|(Dz)_i|+q_i((Dv)_i-(Dz)_i).
$$

$i$ で和を取り、$\langle q,D(v-z)\rangle=\langle D^{\mathsf T}q,v-z\rangle$ と書き換えると

$$
\operatorname{TV}_d(v)-\operatorname{TV}_d(z)
\ge\langle q,D(v-z)\rangle
=\langle D^{\mathsf T}q,v-z\rangle.
$$

他方、二乗残差の展開から

$$
\frac12\|v-y\|_2^2-\frac12\|z-y\|_2^2
=\langle z-y,v-z\rangle+\frac12\|v-z\|_2^2.
$$

両式を加え、仮定 $z-y+\lambda D^{\mathsf T}q=0$ を使えば

$$
T_\lambda(v)-T_\lambda(z)
\ge\frac12\|v-z\|_2^2\ge0.
$$

$v\ne z$ なら右辺は正です。従って唯一の最小点です。$\square$
<!-- proof-end -->

この証明書は**最小性を確かめる十分条件**として使います。一般の線形合成に対する劣微分の等号則をこの命題から証明したわけではないため、必要十分条件と混同しません。

### 段差データの直接計算

$y=(0,0,3,3)$、$\lambda=1$ とします。候補

$$
z=(1/2,1/2,5/2,5/2)
$$

は $Dz=(0,2,0)$ なので $q=(1/2,1,1/2)$ は各差分の[絶対値の劣微分](#prop-inv9-absolute-subgradient)に属します。しかも

$$
D^{\mathsf T}q=(-1/2,-1/2,1/2,1/2),
\qquad z-y=(1/2,1/2,-1/2,-1/2)
$$

より両者の和は零です。[証明書の命題](#prop-inv9-tv-certificate)によって $z$ が唯一の最小点です。**平坦な二領域と中央の段差が残りました**。ジャンプの高さは $3$ から $2$ へ縮むので「TVなら元の高さを完全に保持する」という意味ではありません。

比較として差分を**二乗**する目的関数

$$
Q(x)=\frac12\|x-y\|_2^2+\frac12\|Dx\|_2^2
$$

を取ります。微分すると $(I+D^{\mathsf T}D)x=y$。成分ごとに

$$
2x_1-x_2=0,\quad
-x_1+3x_2-x_3=0,\quad
-x_2+3x_3-x_4=3,\quad
-x_3+2x_4=3.
$$

この連立方程式の解は

$$
x=(3/7,6/7,15/7,18/7).
$$

差分は $(3/7,9/7,3/7)$ で、中央以外にも傾斜が広がります。これが「絶対差分は段差を集中させ、二乗差分は傾斜を広げやすい」という機構の具体例です。なお**成分の二乗ノルム** $\|x\|_2^2$ と**差分の二乗ノルム** $\|Dx\|_2^2$ は別の罰則です。どの量を滑らかにするかを明示して比較する必要があります。

## 6. 連続 BV への入口と有限次元との境界

一次元の区間 $[a,b]$ 上の実数値関数 $u$ に対し、分割 $a=t_0<\cdots<t_k=b$ を選んで $\sum_{j=1}^k|u(t_j)-u(t_{j-1})|$ を測り、その上限が有限なら（この代表元に関して）有界変動といいます。分割を細かくすれば、有限個の画素での差分和と同じ形が現れます。

<a id="def-inv9-continuous-variation"></a>

<!-- formal-statement-start -->
> **定義（区間上の点ごとの全変動）**  
> 実数値関数 $u:[a,b]\to\mathbb R$（$a<b$）に対し、

$$
\operatorname{TV}_{[a,b]}(u)
=\sup_{\substack{k\ge1\\a=t_0<\cdots<t_k=b}}
\sum_{j=1}^{k}|u(t_j)-u(t_{j-1})|
$$

> と定める。これが有限である関数を、この代表元について有界変動関数という。
<!-- formal-statement-end -->

<!-- definition-example-start: def-inv9-continuous-variation -->

**定義の確認**：$a=0,b=1$、$u(t)=0$（$t<1/2$）、$u(t)=1$（$t\ge1/2$）なら、どの分割でも増加する段差を横切る寄与は高々1であり、$1/2$ をまたぐ分割では1です。よって $\operatorname{TV}_{[0,1]}(u)=1$。この関数は跳躍不連続なので、通常の意味の連続微分可能関数ではありません。
<!-- definition-example-end -->

ここでの定義は**点ごとの値を固定した区間上の変動**です。関数のほとんど至る所の同値類を扱う解析学の連続 $BV$ 空間の一般理論では分布微分を有限符号測度として定めるなど、代表元に依存しない定式化が必要です。従って $\operatorname{TV}_d$ の有限次元最小点が存在しただけで、連続 $BV$ 最小点の存在や離散化極限を主張することはできません。連続理論には適切な位相での下半連続性、コンパクト埋め込み、境界条件・定数方向の制御が要ります。

特に $\operatorname{TV}_d(c,c,\ldots,c)=0$ はすべての $c$ で成立します。従って**TV罰則単独は強制的ではありません**。[INV8の存在定理](../INV8/index.md#thm-inv8-existence)が仮定する「罰則自体の強制性」はここでは満たされないため、その定理をそのまま適用してはなりません。一方、恒等観測の二乗残差がある $T_\lambda$ については

$
T_\lambda(x)\ge\frac12\|x-y\|_2^2,
\qquad \|x-y\|_2\ge\|x\|_2-\|y\|_2
$

ですから、$\|x\|_2\to\infty$ なら $T_\lambda(x)\to\infty$。有限次元での連続性と有界閉集合のコンパクト性から最小点は存在します。また $x\ne v$ と $w=(x+v)/2$ に対して

$
\begin{aligned}
\frac12\|w-y\|_2^2
&=\frac14\|x-y\|_2^2+\frac14\|v-y\|_2^2-\frac18\|x-v\|_2^2,\\
\operatorname{TV}_d(w)
&=\left\|\frac{Dx+Dv}{2}\right\|_1
\le\frac{\operatorname{TV}_d(x)+\operatorname{TV}_d(v)}{2}.
\end{aligned}
$

従って $T_\lambda(w)<(T_\lambda(x)+T_\lambda(v))/2$ であり、最小点は一意です。**罰則が強制的・厳密凸であることと、目的関数全体がそうであることは別**です。

## 7. 演習：零成分と段差を自分で判定する

### Level A：劣微分と罰則を手計算する

<a id="ex-inv9-a01"></a>

### INV9-A01 絶対値の劣勾配
- Level: A

$R(t)=|t|$ とする。$z=0$ における劣勾配を定義から求め、$p=3/2$ が劣勾配でない理由を具体的な $t$ で示せ。

<!-- solution-start -->
#### 詳細解答

$p\in\partial R(0)$ は任意の $t$ に対する $|t|\ge pt$ と同値です。$t>0$ を代入して $p\le1$、$t<0$ を代入して $p\ge-1$、両条件を合わせて $[-1,1]$ です。逆に $|p|\le1$ なら $pt\le|p||t|\le|t|$ なので全て成立します。$p=3/2$ では $t=1$ を取ると $1\ge3/2$ が偽です。
<!-- solution-end -->

<a id="ex-inv9-a02"></a>

### INV9-A02 一成分の閾値
- Level: A

$J(t)=\tfrac12(t-2)^2+\tfrac32|t|$ の唯一の最小点を、正・負・零の場合に分けて求めよ。

<!-- solution-start -->
#### 詳細解答

$t>0$ では $J'(t)=t-2+3/2=t-1/2$ なので候補 $t=1/2>0$。$t<0$ では $J'(t)=t-2-3/2=t-7/2$ であり、零点は $t<0$ にありません。$t=0$ では[最適性定理](#thm-inv9-l1-optimality)の条件 $|0-2|\le3/2$ が偽です。よって $t=1/2$ が最小点で、二乗残差の厳密凸性から一意です。
<!-- solution-end -->

<a id="ex-inv9-a03"></a>

### INV9-A03 疎性とノルムは別
- Level: A

$x=(2,0,-1,0)$、$v=(1/4,1/4,1/4,1/4)$ の非零成分数、$\ell^1$ ノルム、二乗 $\ell^2$ ノルムを比較せよ。

<!-- solution-start -->
#### 詳細解答

$x$ の非零成分は2個、$\|x\|_1=|2|+|-1|=3$、$\|x\|_2^2=2^2+(-1)^2=5$ です。$v$ の非零成分は4個、$\|v\|_1=4(1/4)=1$、$\|v\|_2^2=4(1/4)^2=1/4$ です。従って $\ell^1$ ノルムが小さいことは非零成分の個数が必ず少ないことと同値ではありません。
<!-- solution-end -->

<a id="ex-inv9-a04"></a>

### INV9-A04 Bregman 距離の零
- Level: A

$R(t)=|t|$、$z=1$、$p=1$ とする。$D_R^p(3,1)$ と $D_R^p(-1,1)$ を求め、零になっても二点が一致するとは限らない理由を述べよ。

<!-- solution-start -->
#### 詳細解答

$z=1>0$ なので[劣微分の命題](#prop-inv9-absolute-subgradient)より $p=1$ は適切です。定義から $D_R^1(3,1)=3-1-1(3-1)=0$、$D_R^1(-1,1)=1-1-1(-1-1)=2$ です。$R(t)=t$ は $t>0$ 上で一次関数なので、同じ支持直線上にある $t=1,3$ の差を Bregman 距離では検出できません。
<!-- solution-end -->

<a id="ex-inv9-a05"></a>

### INV9-A05 TVの零空間
- Level: A

$x\in\mathbb R^4$ について $\operatorname{TV}_d(x)=0$ と $x_1=x_2=x_3=x_4$ が同値であることを示せ。TV罰則だけでは強制性が得られない理由も述べよ。

<!-- solution-start -->
#### 詳細解答

$\operatorname{TV}_d(x)=|x_2-x_1|+|x_3-x_2|+|x_4-x_3|$ は非負の三項の和です。零なら各項が零なので順に $x_2=x_1$、$x_3=x_2$、$x_4=x_3$。逆向きは代入すれば各差分が零です。一方 $x^{(k)}=(k,k,k,k)$ とすると $\|x^{(k)}\|_2=2|k|\to\infty$ でも TV は常に零です。従って罰則単独は強制的ではありません。
<!-- solution-end -->

### Level B：最適性・段差・一意性をつなぐ

<a id="ex-inv9-b01"></a>

### INV9-B01 観測行列と零座標
- Level: B

$A=\operatorname{diag}(1,2)$、$y=(3,1)$、$\lambda=1$ に対する $J_\lambda(x)$ の最小点を求め、各座標で[最適性条件](#thm-inv9-l1-optimality)を検算せよ。

<!-- solution-start -->
#### 詳細解答

$J(x)=\tfrac12(x_1-3)^2+\tfrac12(2x_2-1)^2+|x_1|+|x_2|$ です。第1座標は $x_1>0$ の微分条件 $x_1-3+1=0$ から $x_1=2$。第2座標は $x_2=0$ とすると $g_2=2(2x_2-1)=-2$ なので $|g_2|=2>1$ で不適です。$x_2>0$ なら微分条件 $2(2x_2-1)+1=0$ から $x_2=1/4>0$。従って $x_*=(2,1/4)$。勾配は $g=(2-3,\ 2(1/2-1))=(-1,-1)$、両座標の符号が正なので $g+\lambda(1,1)=0$。$A$ は単射で解は一意です。ここで観測の係数2により閾値をデータ $|y_2|$ だけで判定できない点に注意します。
<!-- solution-end -->

<a id="ex-inv9-b02"></a>

### INV9-B02 二画素の融合
- Level: B

$y=(0,2)$、$\lambda>0$ に対する $T_\lambda(x)$ を最小化せよ。$\lambda<1$ と $\lambda\ge1$ で場合分けし、証明書を示せ。

<!-- solution-start -->
#### 詳細解答

$D=(-1,1)$、$D^{\mathsf T}q=(-q,q)$ です。証明書 $x-y+\lambda D^{\mathsf T}q=0$ を成分で書くと $x_1=\lambda q$、$x_2=2-\lambda q$。差は $x_2-x_1=2-2\lambda q$。

$0<\lambda<1$ では $q=1$ と置くと $x=(\lambda,2-\lambda)$、差は $2-2\lambda>0$ なので $q\in\partial|\cdot|(x_2-x_1)$。$\lambda\ge1$ では $q=1/\lambda$ と置くと $x=(1,1)$、差は零で $|q|\le1$。いずれも証明書が成立するので[TV証明書の命題](#prop-inv9-tv-certificate)により唯一の最小点です。閾値 $\lambda=1$ から二画素は完全に融合します。
<!-- solution-end -->

<a id="ex-inv9-b03"></a>

### INV9-B03 段差保存の範囲
- Level: B

$y=(0,0,3,3)$ とし $0<\lambda\le3$ で $z=(\lambda/2,\lambda/2,3-\lambda/2,3-\lambda/2)$ が TV 最小点であることを証明書で示せ。$\lambda=3$ で何が起きるか確認せよ。

<!-- solution-start -->
#### 詳細解答

$Dz=(0,3-\lambda,0)$ です。$0<\lambda<3$ なら $q=(1/2,1,1/2)$ と置くと中央の差分は正なので $q_2=1$ が必要で、両端は差分零なので $q_1=q_3=1/2\in[-1,1]$ が許されます。$D^{\mathsf T}q=(-1/2,-1/2,1/2,1/2)$ より

$$
z-y+\lambda D^{\mathsf T}q
=(\lambda/2,\lambda/2,-\lambda/2,-\lambda/2)
+\lambda(-1/2,-1/2,1/2,1/2)=0.
$$

$\lambda=3$ では中央差分も零ですが、$q_2=1$ は $[-1,1]$ に含まれるため証明書は依然有効です。解は全成分 $3/2$ となり、段差が消滅します。双方とも二乗残差の厳密凸性で一意です。
<!-- solution-end -->

<a id="ex-inv9-b04"></a>

### INV9-B04 二乗差分が段差を広げる理由
- Level: B

$y=(0,0,3,3)$ に対し $Q(x)=\tfrac12\|x-y\|_2^2+\tfrac12\|Dx\|_2^2$ の正規方程式を作り、解と差分を求めよ。

<!-- solution-start -->
#### 詳細解答

方向 $h$ での微分は $\langle x-y,h\rangle+\langle Dx,Dh\rangle=\langle x-y+D^{\mathsf T}Dx,h\rangle$ です。従って $(I+D^{\mathsf T}D)x=y$。成分を展開すると

$$
2x_1-x_2=0,\quad -x_1+3x_2-x_3=0,\quad
-x_2+3x_3-x_4=3,\quad -x_3+2x_4=3.
$$

問題は $x\mapsto3\mathbf1-\operatorname{reverse}(x)$ の変換で不変で、目的関数は厳密凸なので一意解は $x_4=3-x_1$、$x_3=3-x_2$ を満たします。第1式から $x_2=2x_1$、第2式から $-x_1+3x_2-(3-x_2)=0$、従って $-x_1+4x_2=3$。$7x_1=3$ なので

$$
x=(3/7,6/7,15/7,18/7),\qquad Dx=(3/7,9/7,3/7).
$$

三つの差分がすべて非零です。比較対象のTV解 $z=(1/2,1/2,5/2,5/2)$ は $Dz=(0,2,0)$ で、変化が中央に集中します。
<!-- solution-end -->

### Level C：零空間、最適性、Bregman 距離を統合する

<a id="ex-inv9-c01"></a>

### INV9-C01 観測できない分解方向と疎性
- Level: C

$A:\mathbb R^3\to\mathbb R^2$ を $A(x_1,x_2,x_3)=(x_1+x_2,x_3)$、$y=(3,1)$、$\lambda=1$ とする。$J(x)=\tfrac12\|Ax-y\|_2^2+\|x\|_1$ を考える。

(1) すべての最小点を求めよ。

(2) $z=(2,0,0)$ が最小点であることを劣勾配で検算せよ。

(3) $p=(1,1,1)$ を選び、別の最小点 $v=(1,1,0)$ について $D_{\|\cdot\|_1}^{p}(v,z)$ を求めよ。

(4) 同じ観測行列に対する二乗ノルム罰則では、なぜ一意性が得られるか述べよ。

<!-- solution-start -->
#### 詳細解答

**(1) 最小点全体。** $s=x_1+x_2$ と置くと、三角不等式から $|x_1|+|x_2|\ge|s|$ であり、等号は $x_1,x_2$ が同符号（零を含む）のとき成立します。従って

$$
J(x)\ge\tfrac12(s-3)^2+|s|
+\tfrac12(x_3-1)^2+|x_3|.
$$

一変数関数 $\tfrac12(s-3)^2+|s|$ に[恒等観測のソフト閾値公式](#prop-inv9-soft-threshold)を適用すると $s=2$ で最小です。別の変数 $x_3$ については $|1|\le\lambda=1$ なので、[最適性条件](#thm-inv9-l1-optimality)を $A=1$ に適用すると $x_3=0$ が最小です。両方の等号を実現するには $x_1,x_2\ge0$、$x_1+x_2=2$ が必要十分です。よって最小点全体は

$$
\{(t,2-t,0):0\le t\le2\}.
$$

**(2) 最適性条件。** $z=(2,0,0)$ では $Az-y=(-1,-1)$。転置行列 $A^{\mathsf T}$ は $(u,v)$ を $(u,u,v)$ へ写すため

$$
g=A^{\mathsf T}(Az-y)=(-1,-1,-1).
$$

$z_1>0$ で $p_1=1$、$z_2=z_3=0$ で $p_2=p_3=1\in[-1,1]$ と選べるので $p=(1,1,1)\in\partial\|z\|_1$。よって $g+p=0$、[最適性定理](#thm-inv9-l1-optimality)に一致します。

**(3) Bregman 距離。** $v=(1,1,0)$ は (1) から別の最小点で $\|v\|_1=\|z\|_1=2$。さらに $\langle p,v-z\rangle=\langle(1,1,1),(-1,1,0)\rangle=0$ なので

$$
D_{\|\cdot\|_1}^p(v,z)=2-2-0=0.
$$

異なる解でも同じ線形面に沿うと Bregman 距離は零になり得ます。

**(4) 比較。** $J_2(x)=\tfrac12\|Ax-y\|_2^2+\tfrac12\|x\|_2^2$ の二乗罰則は厳密凸です。実際、異なる $x,v$ に対する中点の $\|x\|_2^2$ は両端の平均より $\tfrac14\|x-v\|_2^2$ だけ小さくなります。残差項は凸なので和は厳密凸であり、存在する最小点は一意です。$\ell^1$ の非一意性は観測不能な方向 $(1,-1,0)$ と、罰則の平らな面が重なったことによります。
<!-- solution-end -->

---

**まとめ**：$\ell^1$ は成分そのものの零を、TV は**差分**の零を促します。最適性条件の劣勾配が原点で幅を持つため、厳密に零になることが可能です。Bregman 距離は凸罰則の支持平面からのずれを測りますが、一般の距離の公理は満たしません。次の INV10 では、前向き写像が非線形になると、これらの最小化や局所的な識別条件がどう変わるかを調べます。
