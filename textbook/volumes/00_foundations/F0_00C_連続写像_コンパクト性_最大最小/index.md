# F0-00C 補講：連続写像・コンパクト性・最大最小

この補講では、「極限を取っても値が飛ばない」ことを連続性として定式化し、そこからコンパクト性へ進みます。

最適化との接続は明快です。

$$
\boxed{
\text{コンパクトな集合}
+\text{連続関数}
\Longrightarrow
\text{最大値・最小値を実際に達成する}
}
$$

この章では、この矢印を途中の定理ごと証明します。

---

## 1. 連続写像

> **定義（点における連続性）**  
> 距離空間 $(X,d_X)$、$(Y,d_Y)$、写像 $f:X\to Y$、点 $x\in X$ に対して、$f$ が $x$ で **連続** であるとは、任意の $\varepsilon>0$ に対し、ある $\delta>0$ が存在して
> $$
> d_X(x,y)<\delta
> \Longrightarrow
> d_Y(f(x),f(y))<\varepsilon
> $$
> が全ての $y\in X$ について成り立つことをいう。

> **定義（連続写像）**  
> 距離空間 $(X,d_X)$、$(Y,d_Y)$ の間の写像 $f:X\to Y$ が **連続写像** であるとは、$f$ が全ての $x\in X$ で連続であることをいう。

「入力を十分近づければ、出力も好きなだけ近づけられる」という意味です。

---

## 2. 連続性の三つの顔

距離空間では、$\varepsilon$–$\delta$、点列、開集合の逆像という三つの見方が一致します。

> **定理（距離空間における連続性の同値条件）**  
> 距離空間 $(X,d_X)$、$(Y,d_Y)$ と写像 $f:X\to Y$ に対して、次の三条件は同値である。
> 1. $f$ は $X$ 上で連続である。
> 2. 任意の点列 $(x_n)$ と点 $x\in X$ について
>    $$
>    x_n\to x
>    \Longrightarrow
>    f(x_n)\to f(x)
>    $$
>    が成り立つ。
> 3. 任意の開集合 $U\subset Y$ に対して、逆像
>    $$
>    f^{-1}(U)=\{x\in X:f(x)\in U\}
>    $$
>    は $X$ の開集合である。

### 証明

#### 1 ⇒ 2

$f$ が連続で、$x_n\to x$ とします。任意の $\varepsilon>0$ に対し、$f$ の $x$ での連続性から、ある $\delta>0$ が存在して

$$
d_X(x,y)<\delta
\Longrightarrow
d_Y(f(x),f(y))<\varepsilon.
$$

$x_n\to x$ なので、十分大きい $n$ では

$$
d_X(x_n,x)<\delta.
$$

したがって

$$
d_Y(f(x_n),f(x))<\varepsilon.
$$

よって $f(x_n)\to f(x)$ です。

#### 2 ⇒ 3

点列による条件2を仮定します。$U\subset Y$ を開集合とし、$x\in f^{-1}(U)$ を取ります。

$f^{-1}(U)$ が $x$ の近傍を含まないと仮定すると、各 $n\ge1$ について

$$
B_X(x,1/n)\not\subset f^{-1}(U)
$$

です。そこで

$$
x_n\in B_X(x,1/n)\setminus f^{-1}(U)
$$

を選べます。すると $x_n\to x$ ですが

$$
f(x_n)\notin U
$$

です。

一方、条件2より $f(x_n)\to f(x)$ であり、$f(x)\in U$ です。$U$ は開集合なので、ある $\varepsilon>0$ が存在して

$$
B_Y(f(x),\varepsilon)\subset U.
$$

十分大きい $n$ では $f(x_n)\in B_Y(f(x),\varepsilon)\subset U$ となり矛盾します。

したがって $f^{-1}(U)$ は各点の周囲に開球を含み、開集合です。

#### 3 ⇒ 1

条件3を仮定します。$x\in X$ と $\varepsilon>0$ を任意に取ります。

$$
U=B_Y(f(x),\varepsilon)
$$

は $Y$ の開集合なので、条件3より $f^{-1}(U)$ は $X$ の開集合です。また $x\in f^{-1}(U)$ ですから、ある $\delta>0$ が存在して

$$
B_X(x,\delta)\subset f^{-1}(U).
$$

したがって

$$
d_X(x,y)<\delta
\Longrightarrow
f(y)\in U
\Longrightarrow
d_Y(f(x),f(y))<\varepsilon.
$$

よって $f$ は $x$ で連続です。$x$ は任意だったので $f$ は連続です。$\square$

### 2.1 例：距離関数は連続

固定した $z\in X$ に対し

$$
f(x)=d(z,x)
$$

と置きます。三角不等式から

$$
|d(z,x)-d(z,y)|\le d(x,y)
$$

なので、$x_n\to x$ なら

$$
|f(x_n)-f(x)|\le d(x_n,x)\to0.
$$

したがって距離関数は連続です。

---

## 3. コンパクト性

> **定義（開被覆）**  
> 位相空間 $X$ の部分集合 $K\subset X$ に対し、開集合族 $\{U_\alpha\}_{\alpha\in A}$ が
> $$
> K\subset\bigcup_{\alpha\in A}U_\alpha
> $$
> を満たすとき、この族を $K$ の **開被覆** という。

> **定義（コンパクト集合）**  
> 位相空間 $X$ の部分集合 $K\subset X$ が **コンパクト** であるとは、$K$ の任意の開被覆 $\{U_\alpha\}_{\alpha\in A}$ に対し、有限個の添字 $\alpha_1,\ldots,\alpha_m$ が存在して
> $$
> K\subset\bigcup_{j=1}^mU_{\alpha_j}
> $$
> となることをいう。

直感は

> 無限に細かい局所情報を、有限個の情報へ圧縮できる。

です。

> **定義（点列コンパクト性）**  
> 距離空間 $(X,d)$ の部分集合 $K\subset X$ が **点列コンパクト** であるとは、$K$ 内の任意の点列 $(x_n)$ が、ある $x\in K$ に収束する部分列 $(x_{n_k})$ を持つことをいう。

---

## 4. 距離空間では compact ⇔ sequentially compact

> **定理（距離空間におけるコンパクト性と点列コンパクト性）**  
> 距離空間 $(X,d)$ の部分集合 $K\subset X$ に対して、次の二条件は同値である。
> 1. $K$ はコンパクトである。
> 2. $K$ は点列コンパクトである。

### 証明：compact ⇒ sequentially compact

$K$ をコンパクトとし、$K$ 内の点列 $(x_n)$ を取ります。収束部分列を持たないと仮定します。

任意の $x\in K$ に対して、ある $r_x>0$ が存在して

$$
B(x,r_x)
$$

には点列の項 $x_n$ が有限個しか入らないことを示します。

もし全ての $r>0$ について $B(x,r)$ に無限個の $x_n$ が入るなら、半径 $1/k$ の球から添字を増加させながら

$$
x_{n_k}\in B(x,1/k)
$$

を選べます。すると

$$
d(x_{n_k},x)<1/k\to0
$$

なので $x_{n_k}\to x$ となり、収束部分列を持たないという仮定に矛盾します。

したがって $\{B(x,r_x):x\in K\}$ は $K$ の開被覆であり、各球には点列の項が有限個しか入りません。コンパクト性より有限個

$$
B(x_1,r_{x_1}),\ldots,B(x_m,r_{x_m})
$$

で $K$ を覆えます。

すると点列の全ての項 $x_n$ はこの有限個の球のどれかに入りますが、各球に入る項は有限個なので、全体でも有限個の項しか存在できないことになります。これは点列が無限列であることに矛盾します。

よって収束部分列が存在し、その極限は定義より $K$ に属します。

### 証明：sequentially compact ⇒ compact

今度は $K$ が点列コンパクトとします。

まず、任意の $\varepsilon>0$ に対し、有限個の点 $a_1,\ldots,a_m\in K$ が存在して

$$
K\subset\bigcup_{j=1}^mB(a_j,\varepsilon)
$$

となることを示します。この性質を **全有界性** と呼びます。

もしある $\varepsilon>0$ について有限個の $\varepsilon$ 球で覆えないなら、帰納的に

$$
x_{n+1}\notin\bigcup_{j=1}^nB(x_j,\varepsilon)
$$

となる点列を構成できます。すると $m\ne n$ なら

$$
d(x_m,x_n)\ge\varepsilon.
$$

もしある部分列 $x_{n_k}$ が $x$ に収束するなら、十分大きい $k,\ell$ について

$$
d(x_{n_k},x)<\varepsilon/3,
\qquad
d(x_{n_\ell},x)<\varepsilon/3
$$

となるので、三角不等式から

$$
d(x_{n_k},x_{n_\ell})<2\varepsilon/3,
$$

となり $d(x_{n_k},x_{n_\ell})\ge\varepsilon$ に矛盾します。したがって収束部分列は存在せず、点列コンパクト性に矛盾します。よって $K$ は全有界です。

次に、$K$ の任意の開被覆 $\mathcal U$ に対して、ある $\delta>0$ が存在し、任意の $x\in K$ について

$$
B(x,\delta)\cap K
$$

が $\mathcal U$ のある1要素に含まれることを示します。この $\delta$ を **Lebesgue数** と呼びます。

そのような $\delta$ が存在しないと仮定すると、各 $n$ に対して点 $x_n\in K$ を選び、

$$
B(x_n,1/n)\cap K
$$

がどの $U\in\mathcal U$ にも含まれないようにできます。

点列コンパクト性から部分列 $x_{n_k}\to x\in K$ を取れます。$\mathcal U$ は被覆なので、ある $U\in\mathcal U$ が $x\in U$ を満たします。$U$ は開なので、ある $r>0$ について

$$
B(x,r)\cap K\subset U.
$$

十分大きい $k$ では

$$
d(x_{n_k},x)<r/2,
\qquad
1/n_k<r/2.
$$

このとき $y\in B(x_{n_k},1/n_k)\cap K$ なら

$$
d(y,x)
\le d(y,x_{n_k})+d(x_{n_k},x)
<r,
$$

よって $y\in U$ です。したがって

$$
B(x_{n_k},1/n_k)\cap K\subset U,
$$

矛盾です。ゆえにLebesgue数 $\delta>0$ が存在します。

全有界性を $\varepsilon=\delta/2$ に適用すると、有限個の点 $a_1,\ldots,a_m\in K$ で

$$
K\subset\bigcup_{j=1}^mB(a_j,\delta/2)
$$

とできます。Lebesgue数の性質を中心 $a_j$ に適用すると、ある $U_j\in\mathcal U$ が存在して

$$
B(a_j,\delta)\cap K\subset U_j.
$$

したがって特に

$$
B(a_j,\delta/2)\cap K\subset U_j
$$

です。

したがって

$$
K\subset\bigcup_{j=1}^mU_j.
$$

任意の開被覆から有限部分被覆を取れたので、$K$ はコンパクトです。$\square$

この定理のおかげで、距離空間では開被覆を直接追わず、点列から収束部分列を取り出す方法を使えます。

---

## 5. Bolzano–Weierstrassの定理

Heine–Borelを証明するため、まず有限次元で「有界列から収束部分列を取れる」ことを示します。

> **補題（実数列のBolzano–Weierstrass）**  
> 有界な実数列 $(x_n)$ は収束部分列を持つ。

### 証明

全ての項を含む閉区間 $I_1=[a_1,b_1]$ を取ります。$I_1$ を二等分すると、少なくとも一方の半区間には点列の項が無限個入ります。その半区間を $I_2=[a_2,b_2]$ とします。

同じ操作を繰り返し、

$$
I_1\supset I_2\supset I_3\supset\cdots
$$

で、各 $I_k$ が点列の項を無限個含み、長さが

$$
b_k-a_k=2^{-(k-1)}(b_1-a_1)\to0
$$

となるようにします。

左端点列 $(a_k)$ は単調増加で上に有界なので、実数の上限性質により

$$
x=\sup_k a_k
$$

が存在します。任意の $k$ について、$j\ge k$ なら $a_j\le b_k$ なので $x\le b_k$ です。また $a_k\le x$ です。したがって

$$
x\in I_k
$$

が全ての $k$ で成り立ちます。

各 $I_k$ は点列の項を無限個含むので、添字を増加させながら

$$
x_{n_k}\in I_k
$$

を選べます。$x,x_{n_k}\in I_k$ だから

$$
|x_{n_k}-x|
\le b_k-a_k\to0.
$$

よって $x_{n_k}\to x$ です。$\square$

> **補題（$\mathbb R^p$ のBolzano–Weierstrass）**  
> Euclid距離を入れた $\mathbb R^p$ の任意の有界点列 $(x_n)$ は収束部分列を持つ。

### 証明

$x_n=(x_{n1},\ldots,x_{np})$ とします。点列が有界なら各座標列 $(x_{nj})$ も有界です。

第1座標に実数版Bolzano–Weierstrassを使い、第1座標が収束する部分列を取ります。その部分列から第2座標が収束する部分列を取り、これを有限回繰り返します。

最終的に得られた部分列では全ての座標が収束します。極限を $x=(x_1,\ldots,x_p)$ とすれば

$$
\|x_{n_k}-x\|_2^2
=
\sum_{j=1}^p|x_{n_kj}-x_j|^2
\to0.
$$

よって $x_{n_k}\to x$ です。$\square$

---

## 6. Heine–Borelの定理

> **定理（Heine–Borel）**  
> Euclid距離を入れた $\mathbb R^p$ の部分集合 $K\subset\mathbb R^p$ に対して、次の二条件は同値である。
> 1. $K$ はコンパクトである。
> 2. $K$ は閉集合かつ有界である。

### 証明

#### compact ⇒ closed and bounded

$K$ がコンパクトなら点列コンパクトです。

$K$ 内の点列 $x_n\to x\in\mathbb R^p$ を取ります。点列コンパクト性により、ある部分列 $x_{n_k}$ が $y\in K$ に収束します。一方、元の列が $x$ に収束しているので、その部分列も $x$ に収束します。距離空間では極限は一意なので

$$
y=x.
$$

したがって $x\in K$ です。F0-00Bの閉集合の点列特徴付けより $K$ は閉集合です。

次に

$$
K\subset\bigcup_{n=1}^{\infty}B(0,n)
$$

という開被覆を考えます。コンパクト性より有限個で覆えるので、ある $N$ が存在して

$$
K\subset B(0,N).
$$

したがって $K$ は有界です。

#### closed and bounded ⇒ compact

$K$ を閉かつ有界とします。$K$ 内の任意の点列 $(x_n)$ を取ると、有界性より $\mathbb R^p$ の有界列です。

Bolzano–Weierstrassにより、ある部分列が

$$
x_{n_k}\to x\in\mathbb R^p
$$

と収束します。$K$ は閉集合なので、F0-00Bの閉集合の点列特徴付けより

$$
x\in K.
$$

したがって $K$ は点列コンパクトです。距離空間での同値定理より $K$ はコンパクトです。$\square$

ここで非常に重要なのは

> 「閉かつ有界ならコンパクト」は $\mathbb R^p$ の有限次元性に依存する。

という点です。F0-00Dでは無限次元で壊れる例を見ます。

---

## 7. 連続像はコンパクト

> **定理（コンパクト集合の連続像）**  
> 位相空間 $X,Y$、コンパクト集合 $K\subset X$、連続写像 $f:X\to Y$ に対して、像
> $$
> f(K)=\{f(x):x\in K\}
> $$
> は $Y$ のコンパクト集合である。

### 証明

$f(K)$ の任意の開被覆 $\{U_\alpha\}_{\alpha\in A}$ を取ります。

$f$ は連続なので各逆像 $f^{-1}(U_\alpha)$ は $X$ の開集合です。また

$$
K\subset\bigcup_{\alpha\in A}f^{-1}(U_\alpha)
$$

です。

$K$ のコンパクト性より、有限個 $\alpha_1,\ldots,\alpha_m$ が存在して

$$
K\subset\bigcup_{j=1}^m f^{-1}(U_{\alpha_j}).
$$

両辺を $f$ で写せば

$$
f(K)\subset\bigcup_{j=1}^mU_{\alpha_j}.
$$

したがって $f(K)$ はコンパクトです。$\square$

### 7.1 例：有限個の点の凸包はコンパクト

$x_1,\ldots,x_n\in\mathbb R^p$ とします。係数の単体

$$
\Delta
=
\left\{
\theta\in\mathbb R^n:
\theta_i\ge0,
\ \sum_{i=1}^n\theta_i=1
\right\}
$$

は閉かつ有界なのでHeine–Borelによりコンパクトです。

写像

$$
T(\theta)=\sum_{i=1}^n\theta_i x_i
$$

は連続なので

$$
\operatorname{conv}\{x_1,\ldots,x_n\}=T(\Delta)
$$

もコンパクトです。

SVMで正例・負例の有限集合から作る凸包がコンパクトになる理由はこれです。

---

## 8. Weierstrassの最大最小定理

> **定理（Weierstrassの最大最小定理）**  
> 位相空間 $X$ の空でないコンパクト集合 $K\subset X$ と連続関数 $f:K\to\mathbb R$ に対して、ある $x_{\min},x_{\max}\in K$ が存在し
> $$
> f(x_{\min})
> =
> \min_{x\in K}f(x),
> \qquad
> f(x_{\max})
> =
> \max_{x\in K}f(x)
> $$
> が成り立つ。

### 証明

連続像のコンパクト性より

$$
f(K)\subset\mathbb R
$$

は空でないコンパクト集合です。Heine–Borelより $f(K)$ は閉かつ有界です。

有界なので

$$
M=\sup f(K)
$$

が存在します。上限の定義から、各 $n$ について $y_n\in f(K)$ を

$$
M-\frac1n<y_n\le M
$$

となるように取れます。すると $y_n\to M$ です。

$f(K)$ は閉集合なので、閉集合の点列特徴付けより

$$
M\in f(K).
$$

したがって、ある $x_{\max}\in K$ が存在して

$$
f(x_{\max})=M.
$$

同様に $m=\inf f(K)$ について $m\in f(K)$ が従い、ある $x_{\min}\in K$ が存在して

$$
f(x_{\min})=m.
$$

よって最大値・最小値が実際に達成されます。$\square$

---

## 9. 有限直積もコンパクト

> **定理（有限個のコンパクト距離空間の直積）**  
> $m\ge1$ とし、各 $j=1,\ldots,m$ について $(K_j,d_j)$ をコンパクト距離空間とする。直積
> $$
> K=K_1\times\cdots\times K_m
> $$
> に距離
> $$
> d(x,y)
> =
> \max_{1\le j\le m}d_j(x_j,y_j)
> $$
> を入れると、$(K,d)$ はコンパクトである。

### 証明

$K$ 内の任意の点列

$$
x_n=(x_{n1},\ldots,x_{nm})
$$

を取ります。

$K_1$ のコンパクト性から、第1座標が $a_1\in K_1$ に収束する部分列を取れます。その部分列から、$K_2$ のコンパクト性により第2座標が $a_2\in K_2$ に収束する部分列を取ります。

これを有限回繰り返すと、全ての座標について

$$
x_{n_kj}\to a_j
\qquad(j=1,\ldots,m)
$$

となる一つの部分列を得ます。

$a=(a_1,\ldots,a_m)\in K$ と置けば、有限個の座標全てが収束するので

$$
d(x_{n_k},a)
=
\max_jd_j(x_{n_kj},a_j)
\to0.
$$

したがって $K$ は点列コンパクトであり、距離空間における同値定理からコンパクトです。$\square$

---

## 10. 互いに素なコンパクト集合の距離は正

> **定理（互いに素なコンパクト集合間の正距離）**  
> 距離空間 $(X,d)$ の空でないコンパクト集合 $A,B\subset X$ が
> $$
> A\cap B=\varnothing
> $$
> を満たすとする。このとき
> $$
> d(A,B)
> :=
> \inf\{d(a,b):a\in A,\ b\in B\}
> $$
> は実際にある $(a_*,b_*)\in A\times B$ で達成され、さらに
> $$
> d(A,B)>0
> $$
> である。

### 証明

前節より $A\times B$ はコンパクトです。

関数

$$
g:A\times B\to\mathbb R,
\qquad
g(a,b)=d(a,b)
$$

を考えます。三角不等式から

$$
|d(a,b)-d(a',b')|
\le d(a,a')+d(b,b')
$$

なので $g$ は連続です。

Weierstrassの定理により、ある $(a_*,b_*)\in A\times B$ が存在して

$$
g(a_*,b_*)
=
\min_{a\in A,b\in B}d(a,b)
=
d(A,B).
$$

もし $d(A,B)=0$ なら

$$
d(a_*,b_*)=0
$$

なので距離の定義から $a_*=b_*$ です。すると

$$
a_*=b_*\in A\cap B,
$$

これは $A\cap B=\varnothing$ に矛盾します。

したがって

$$
\boxed{d(A,B)>0}.
$$

$\square$

これはハードマージンSVMで二つのコンパクトな凸包の間に正のマージンが生じる背景です。

---

## 11. 閉集合への最近点は存在する

$C\subset\mathbb R^p$ を空でない閉集合、$z\in\mathbb R^p$ を固定します。

距離

$$
\delta
=
\inf_{x\in C}\|z-x\|_2
$$

を考えます。$C$ 自体は有界とは限らないので、そのままHeine–Borelは使えません。

近似最小列 $x_n\in C$ を

$$
\|z-x_n\|_2\to\delta
$$

となるように取ります。十分大きい $n$ では

$$
\|z-x_n\|_2\le\delta+1.
$$

よって尾部は

$$
C\cap\overline B(z,\delta+1)
$$

に入ります。この集合は閉かつ有界なのでコンパクトです。

したがって部分列 $x_{n_k}\to p$ を取れます。$C$ は閉なので $p\in C$、距離関数は連続なので

$$
\|z-p\|_2
=
\lim_{k\to\infty}\|z-x_{n_k}\|_2
=
\delta.
$$

つまり最近点が存在します。

$$
\boxed{
\text{有界化}
\to
\text{Heine--Borel}
\to
\text{収束部分列}
\to
\text{閉性}
\to
\text{連続性}
\to
\text{最小値達成}
}
$$

という証明鎖です。

---

## 12. 演習 Level A

### F0-00C-A01 点列で連続性を確認する

- Level: A
- 目安時間: 8分
- 主題: 点列による連続性
- 使用技術: 三角不等式

$\mathbb R$ に通常の距離を入れ、$f(x)=x^2$ とする。任意の $x_n\to x$ に対して $f(x_n)\to f(x)$ を示せ。

<!-- solution-start -->

#### 解答

##### 詳細解答

$x_n\to x$ なら、収束列は有界なので、ある $M>0$ が存在して十分大きい $n$ について

$$
|x_n|\le M,
\qquad
|x|\le M
$$

とできます。

すると

$$
|x_n^2-x^2|
=|x_n-x||x_n+x|
\le2M|x_n-x|.
$$

右辺は $x_n\to x$ より0へ収束するので

$$
x_n^2\to x^2.
$$

よって点列特徴付けから $f(x)=x^2$ は連続です。

##### 本番答案

$x_n\to x$ より $(x_n)$ は有界。十分大きい $n$ で $|x_n|,|x|\le M$ とすれば

$$
|x_n^2-x^2|
\le2M|x_n-x|\to0.
$$

したがって $x_n^2\to x^2$ であり、$f$ は連続。

##### 採点基準

- 因数分解: 6点
- 収束列の有界性: 5点
- 評価式: 6点
- 結論: 3点

<!-- solution-end -->

### F0-00C-A02 Heine–Borelで判定する

- Level: A
- 目安時間: 8分
- 主題: コンパクト性
- 使用技術: 閉性・有界性

$\mathbb R$ に通常の距離を入れる。次の集合がコンパクトか判定し、理由を述べよ。

1. $[0,1]$
2. $(0,1)$
3. $[0,\infty)$
4. $\{0\}\cup\{1/n:n\in\mathbb N\}$

<!-- solution-start -->

#### 解答

##### 詳細解答

$\mathbb R$ ではHeine–Borelにより「閉かつ有界」とコンパクトが同値です。

1. $[0,1]$ は閉かつ有界なのでコンパクト。
2. $(0,1)$ は有界ですが閉でないのでコンパクトでない。
3. $[0,\infty)$ は閉ですが有界でないのでコンパクトでない。
4. $\{0\}\cup\{1/n:n\in\mathbb N\}$ はF0-00Bで示したように閉集合であり、$[0,1]$ に含まれるので有界です。したがってコンパクト。

##### 本番答案

$$
\boxed{1,4\text{ はコンパクト},\qquad2,3\text{ は非コンパクト}}
$$

理由はHeine–Borelの「閉かつ有界」による。

##### 採点基準

- 各判定: 各3点、計12点
- 閉性・有界性の理由: 8点

<!-- solution-end -->

---

## 13. 演習 Level B

### F0-00C-B01 有限点集合の凸包はコンパクト

- Level: B
- 目安時間: 12分
- 主題: 連続像のコンパクト性
- 使用技術: Heine–Borel、連続写像

$x_1,\ldots,x_n\in\mathbb R^p$ を固定し、

$$
\operatorname{conv}\{x_1,\ldots,x_n\}
=
\left\{
\sum_{i=1}^n\theta_i x_i:
\theta_i\ge0,
\ \sum_{i=1}^n\theta_i=1
\right\}
$$

とする。この集合がコンパクトであることを示せ。

<!-- solution-start -->

#### 解答

##### 詳細解答

係数集合

$$
\Delta
=
\left\{
\theta\in\mathbb R^n:
\theta_i\ge0,
\ \sum_{i=1}^n\theta_i=1
\right\}
$$

を考えます。

$\Delta$ は各条件 $\theta_i\ge0$ と $\sum_i\theta_i=1$ で定まる閉集合です。また $0\le\theta_i\le1$ なので有界です。Heine–Borelより $\Delta$ はコンパクトです。

写像

$$
T:\Delta\to\mathbb R^p,
\qquad
T(\theta)=\sum_{i=1}^n\theta_i x_i
$$

は座標の線形結合なので連続です。

定義から

$$
T(\Delta)=\operatorname{conv}\{x_1,\ldots,x_n\}.
$$

連続像のコンパクト性より凸包はコンパクトです。

##### 本番答案

単体

$$
\Delta=\{\theta\in\mathbb R^n:\theta_i\ge0,\ \sum_i\theta_i=1\}
$$

は閉かつ有界なのでコンパクト。連続写像

$$
T(\theta)=\sum_i\theta_i x_i
$$

の像が凸包なので、連続像のコンパクト性より

$$
\boxed{\operatorname{conv}\{x_1,\ldots,x_n\}\text{ はコンパクト}}.
$$

##### 採点基準

- $\Delta$ の導入: 4点
- $\Delta$ のコンパクト性: 6点
- $T$ の連続性: 4点
- 像が凸包であることと結論: 6点

<!-- solution-end -->

### F0-00C-B02 コンパクト集合上で最大最小を求める

- Level: B
- 目安時間: 12分
- 主題: Weierstrassの定理
- 使用技術: コンパクト性、二次式評価

$$
K=[0,1]^2
$$

とし、

$$
f(x,y)
=
\left(x-\frac12\right)^2
+
\left(y-\frac12\right)^2
$$

とする。

1. $K$ がコンパクトであることを示せ。
2. $f$ が $K$ 上で最大値・最小値を持つことを定理から説明せよ。
3. 最大値と最小値を求めよ。

<!-- solution-start -->

#### 解答

##### 詳細解答

$K=[0,1]^2$ は $\mathbb R^2$ で閉かつ有界なので、Heine–Borelよりコンパクトです。

$f$ は多項式から作られた連続関数なので、Weierstrassの最大最小定理により $K$ 上で最大値・最小値を達成します。

各項は非負なので

$$
f(x,y)\ge0.
$$

$(x,y)=(1/2,1/2)$ で等号が成立するため

$$
\min_K f=0.
$$

また $0\le x,y\le1$ なので

$$
\left|x-\frac12\right|\le\frac12,
\qquad
\left|y-\frac12\right|\le\frac12.
$$

したがって

$$
f(x,y)
\le\frac14+\frac14
=\frac12.
$$

四隅 $(0,0),(0,1),(1,0),(1,1)$ で等号が成立するので

$$
\max_K f=\frac12.
$$

##### 本番答案

$K$ は閉かつ有界なのでコンパクト、$f$ は連続。よってWeierstrassにより最大最小を達成する。

$$
0\le f(x,y)\le\frac14+\frac14=\frac12.
$$

中心 $(1/2,1/2)$ で0、四隅で $1/2$ を取るので

$$
\boxed{\min_Kf=0,\qquad\max_Kf=1/2}.
$$

##### 採点基準

- $K$ のコンパクト性: 5点
- Weierstrass適用: 5点
- 最小値: 4点
- 最大値: 6点

<!-- solution-end -->

### F0-00C-B03 二つの円板の距離

- Level: B
- 目安時間: 12分
- 主題: コンパクト集合間の距離
- 使用技術: Heine–Borel、三角不等式

$\mathbb R^2$ にEuclid距離を入れ、

$$
A=\{x\in\mathbb R^2:\|x\|_2\le1\},
$$

$$
B=\{x\in\mathbb R^2:\|x-(4,0)\|_2\le1\}
$$

とする。

1. $A,B$ がコンパクトで互いに素であることを示せ。
2. $d(A,B)$ が正で実際に達成されることを定理から説明せよ。
3. $d(A,B)$ を求めよ。

<!-- solution-start -->

#### 解答

##### 詳細解答

$A,B$ はともに閉円板なので閉かつ有界です。Heine–Borelよりコンパクトです。

中心間距離は4、半径はそれぞれ1なので、二つの円板は交わりません。したがって互いに素な非空コンパクト集合間の正距離定理より、$d(A,B)>0$ であり最小値は達成されます。

任意の $a\in A,b\in B$ について三角不等式から

$$
4
=\|(4,0)\|_2
\le
\|a\|_2
+\|b-a\|_2
+\|b-(4,0)\|_2.
$$

$\|a\|_2\le1$、$\|b-(4,0)\|_2\le1$ なので

$$
\|b-a\|_2\ge2.
$$

一方

$$
a=(1,0),
\qquad
b=(3,0)
$$

と取れば $a\in A,b\in B$ で

$$
\|b-a\|_2=2.
$$

したがって

$$
\boxed{d(A,B)=2}.
$$

##### 本番答案

$A,B$ は閉かつ有界なのでコンパクト。中心距離4、半径和2より互いに素。

任意の $a\in A,b\in B$ に対し

$$
4\le\|a\|+\|b-a\|+\|b-(4,0)\|
\le2+\|b-a\|
$$

なので $\|b-a\|\ge2$。$(1,0),(3,0)$ で等号を達成するから

$$
\boxed{d(A,B)=2}.
$$

##### 採点基準

- コンパクト性: 4点
- 互いに素: 3点
- 正距離定理の適用: 3点
- 下界2の導出: 6点
- 達成点と結論: 4点

<!-- solution-end -->

---

## 14. 演習 Level C

### F0-00C-C01 閉集合への最近点の存在

- Level: C
- 目安時間: 25分
- 主題: compactnessによる存在証明
- 使用技術: infimum、近似最小列、Heine–Borel、閉性、連続性

$C\subset\mathbb R^p$ を空でない閉集合、$z\in\mathbb R^p$ を固定点とする。

$$
\delta
=
\inf_{x\in C}\|z-x\|_2
$$

と定める。

1. $x_n\in C$ を
   $$
   \delta\le\|z-x_n\|_2<\delta+\frac1n
   $$
   となるように取れることを説明せよ。
2. 十分大きい $n$ で $x_n$ がある閉有界集合に入ることを示せ。
3. $C$ 上で距離 $\delta$ を達成する点 $p\in C$ が存在することを示せ。

<!-- solution-start -->

#### 解答

##### 詳細解答

$\delta$ は集合

$$
S=\{\|z-x\|_2:x\in C\}
$$

の下限です。下限の定義より、任意の $\varepsilon>0$ に対して

$$
s<\delta+\varepsilon
$$

を満たす $s\in S$ が存在します。$\varepsilon=1/n$ とすれば、ある $x_n\in C$ が存在して

$$
\delta\le\|z-x_n\|_2<\delta+\frac1n.
$$

$n\ge1$ なら

$$
\|z-x_n\|_2<\delta+1.
$$

したがって全ての $n$ について実は

$$
x_n\in C\cap\overline B(z,\delta+1).
$$

この集合は $C$ と閉球の共通部分なので閉集合であり、閉球に含まれるので有界です。Heine–Borelよりコンパクトです。

よって点列 $(x_n)$ は収束部分列を持ち、ある

$$
p\in C\cap\overline B(z,\delta+1)
$$

に対して

$$
x_{n_k}\to p
$$

となります。

距離関数 $x\mapsto\|z-x\|_2$ は連続なので

$$
\|z-p\|_2
=
\lim_{k\to\infty}\|z-x_{n_k}\|_2.
$$

一方

$$
\delta
\le
\|z-x_{n_k}\|_2
<
\delta+\frac1{n_k}
$$

であり、はさみうちから右辺の極限は $\delta$ です。したがって

$$
\boxed{\|z-p\|_2=\delta}.
$$

$p\in C$ なので、距離のinfimumは実際に達成されました。

##### 本番答案

下限の定義より

$$
\delta\le\|z-x_n\|<\delta+1/n
$$

となる $x_n\in C$ を取れる。すると $x_n\in C\cap\overline B(z,\delta+1)$。

この集合は閉かつ有界なのでHeine–Borelによりコンパクト。よって部分列 $x_{n_k}\to p\in C$ が存在する。

距離関数の連続性から

$$
\|z-p\|
=
\lim_k\|z-x_{n_k}\|
=
\delta.
$$

したがって最近点 $p\in C$ が存在する。

##### 採点基準

- 近似最小列の構成: 5点
- 閉有界集合への制限: 4点
- Heine–Borelと部分列: 5点
- 閉性により $p\in C$: 2点
- 距離関数の連続性: 2点
- 最小値達成の結論: 2点

<!-- solution-end -->

---

## 15. 後続補講への接続

次の [F0-00D Cauchy列・完備性・無限次元で何が壊れるか](../F0_00D_Cauchy列_完備性_無限次元/index.md) では、コンパクト性とは別の極限保証である **完備性** を扱います。

この章までで

$$
\boxed{
\text{compact}
\Rightarrow
\text{収束部分列}
\Rightarrow
\text{極値・最近点の存在}
}
$$

という有限次元最適化の存在証明の床が完成しました。

---

## 章末チェック

- $\varepsilon$–$\delta$、点列、開集合逆像の三つの連続性条件の同値性を証明できる。
- コンパクト性と点列コンパクト性の同値性を距離空間で証明できる。
- Bolzano–Weierstrassを実数から $\mathbb R^p$ へ拡張できる。
- Heine–Borelを両方向に証明できる。
- 連続像がコンパクトであることを開被覆から証明できる。
- Weierstrassの最大最小定理を証明できる。
- 有限直積のコンパクト性を点列で証明できる。
- 互いに素な非空コンパクト集合の距離が正になることを証明できる。
- 閉集合への最近点存在証明を再構成できる。
