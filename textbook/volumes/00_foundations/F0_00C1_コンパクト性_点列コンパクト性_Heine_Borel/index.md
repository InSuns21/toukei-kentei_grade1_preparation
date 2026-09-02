# F0-00C1 補講：コンパクト性・点列コンパクト性・Heine--Borel

この講義の問いは一つです。

> **どんな条件なら、無限に続く点列や開被覆から有限な情報を取り出せるか。**

距離空間でのコンパクト性と点列コンパクト性を結び、有限次元ではHeine--Borelへ落とします。

---

## 1. コンパクト性

> **定義（開被覆）**  
> 位相空間 $X$ の部分集合 $K\subset X$ に対し、開集合族 $\{U_\alpha\}_{\alpha\in A}$ が
$$
K\subset\bigcup_{\alpha\in A}U_\alpha
$$
> を満たすとき、この族を $K$ の **開被覆** という。

> **定義（コンパクト集合）**  
> 位相空間 $X$ の部分集合 $K\subset X$ が **コンパクト** であるとは、$K$ の任意の開被覆 $\{U_\alpha\}_{\alpha\in A}$ に対し、有限個の添字 $\alpha_1,\ldots,\alpha_m$ が存在して
$$
K\subset\bigcup_{j=1}^mU_{\alpha_j}
$$
> となることをいう。

直感は

> 無限に細かい局所情報を、有限個の情報へ圧縮できる。

です。

> **定義（点列コンパクト性）**  
> 距離空間 $(X,d)$ の部分集合 $K\subset X$ が **点列コンパクト** であるとは、$K$ 内の任意の点列 $(x_n)$ が、ある $x\in K$ に収束する部分列 $(x_{n_k})$ を持つことをいう。

---

## 2. 距離空間では compact ⇔ sequentially compact

> **定理（距離空間におけるコンパクト性と点列コンパクト性）**  
> 距離空間 $(X,d)$ の部分集合 $K\subset X$ に対して、次の二条件は同値である。
> 1. $K$ はコンパクトである。
> 2. $K$ は点列コンパクトである。

<!-- proof-start -->
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

<!-- proof-end -->
<!-- proof-start -->
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
<!-- proof-end -->

この定理のおかげで、距離空間では開被覆を直接追わず、点列から収束部分列を取り出す方法を使えます。

---

## 3. Bolzano–Weierstrassの定理

Heine–Borelを証明するため、まず有限次元で「有界列から収束部分列を取れる」ことを示します。

> **補題（実数列のBolzano–Weierstrass）**  
> 有界な実数列 $(x_n)$ は収束部分列を持つ。

<!-- proof-start -->
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
<!-- proof-end -->

> **補題（$\mathbb R^p$ のBolzano–Weierstrass）**  
> Euclid距離を入れた $\mathbb R^p$ の任意の有界点列 $(x_n)$ は収束部分列を持つ。

<!-- proof-start -->
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
<!-- proof-end -->

---

## 4. Heine–Borelの定理

> **定理（Heine–Borel）**  
> Euclid距離を入れた $\mathbb R^p$ の部分集合 $K\subset\mathbb R^p$ に対して、次の二条件は同値である。
> 1. $K$ はコンパクトである。
> 2. $K$ は閉集合かつ有界である。

<!-- proof-start -->
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
<!-- proof-end -->

ここで非常に重要なのは

> 「閉かつ有界ならコンパクト」は $\mathbb R^p$ の有限次元性に依存する。

という点です。F0-00Dでは無限次元で壊れる例を見ます。

---

## 5. 連続像はコンパクト

> **定理（コンパクト集合の連続像）**  
> 位相空間 $X,Y$、コンパクト集合 $K\subset X$、連続写像 $f:X\to Y$ に対して、像
$$
f(K)=\{f(x):x\in K\}
$$
> は $Y$ のコンパクト集合である。

<!-- proof-start -->
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
<!-- proof-end -->

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

---

## 6. 演習

### F0-00C1-A01 Heine–Borelで判定する

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

### F0-00C1-B01 有限点集合の凸包はコンパクト

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

---

## 7. 次に進む

ここまでで「コンパクトであることを判定する道具」が揃いました。次講では、それを最大最小・集合間距離・最近点の**存在証明**へ使います。

**次：[F0-00C2 コンパクト性の応用・最大最小・最近点](../F0_00C2_コンパクト性の応用_最大最小_最近点/index.md)**
