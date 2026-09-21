# TOP7：距離の「一様な近さ」を抽象化する

位相は「一点の近くに何があるか」を記録します。しかし、距離空間で使ってきた

- 二点 $x,y$ が一様に近い
- 写像が場所によらず同じ精度で近さを保つ
- 点列が互いに近づいていく
- 空間全体を同じ尺度の有限個の近傍で覆う

という情報は、位相だけからは復元できません。

この章では、[TOP6 の filter](../TOP6/index.md#def-top6-filter) と [全有界性](../TOP6/index.md#thm-top6-total-bounded-cauchy-subsequence) を土台に、距離の「$\varepsilon$ 以内」を抽象化し、二点の近さを距離なしで記録する仕組みを導入します。

最初に見るべき現象は、同じ集合 $\mathbb R$ 上の二つの距離

$$
d(x,y)=|x-y|,
\qquad
\rho(x,y)=|\arctan x-\arctan y|
$$

です。この二つは同じ通常位相を入れます。しかし $x_n=n$ は $d$ では Cauchy 列でない一方、$\rho$ では Cauchy 列です。さらに $(\mathbb R,d)$ は完備ですが $(\mathbb R,\rho)$ は完備ではありません。

つまり

> **位相が同じでも、場所によらない近さの保存・Cauchy 性・完備性は同じとは限らない。**

この差を正確に記録するのが、これから定義する二点の近さの構造です。

---

## 1. 二点を同時に近づける

集合 $X$ に対し、対角集合を

$$
\Delta_X={(x,x):x\in X}
$$

と書きます。

$U,V\subset X\times X$ に対し

$$
U^{-1}
=
{(y,x):(x,y)\in U},
$$

$$
U\circ V
=
{(x,z):\exists y\in X, (x,y)\in V, (y,z)\in U}
$$

と定めます。

距離空間なら

$$
U_\varepsilon
=
{(x,y):d(x,y)<\varepsilon}
$$

が「二点が $\varepsilon$ より近い」という条件です。

距離を抽象化すると、この $U_\varepsilon$ そのものではなく、「十分近い二点の組を含む集合」の族だけを取り出せます。

<a id="def-top7-uniformity"></a>

<!-- formal-statement-start -->
> **定義（一様構造・近縁）**  
> 集合 $X$ 上の **一様構造**とは、$X\times X$ の部分集合からなる族 $\mathcal U$ で、次を満たすものです。
>
> 1. $U\in\mathcal U$ なら $\Delta_X\subset U$。
> 2. $U\in\mathcal U$ かつ $U\subset W\subset X\times X$ なら $W\in\mathcal U$。
> 3. $U,V\in\mathcal U$ なら $U\cap V\in\mathcal U$。
> 4. $U\in\mathcal U$ なら $U^{-1}\in\mathcal U$。
> 5. $U\in\mathcal U$ なら、ある $V\in\mathcal U$ が存在して $V\circ V\subset U$。
>
> $\mathcal U$ の元を **近縁**（entourage）と呼び、$(X,\mathcal U)$ を **一様空間**と呼びます。
<!-- formal-statement-end -->

<!-- definition-example-start: def-top7-uniformity -->
### 直接例：2点集合の離散一様構造

**定義の確認**

$X=\{0,1\}$ とし、
$$
\mathcal U
=
\{U\subset X\times X:\Delta_X\subset U\}
$$
と置きます。対角を含むこと、上方閉性、有限交差、逆関係は定義から従います。さらに任意の $U\in\mathcal U$ に対し $V=\Delta_X$ と取れば
$$
V\circ V=\Delta_X\subset U.
$$
従って5公理を全て満たし、$\mathcal U$ は一様構造です。
<!-- definition-example-end -->

5番目の公理が三角不等式の抽象形です。「$x$ と $y$ が十分近く、$y$ と $z$ も十分近ければ、$x$ と $z$ は指定された精度で近い」と読めます。

### 直接例：距離から一様構造を作る

距離空間 $(X,d)$ に対し

$$
U_\varepsilon={(x,y):d(x,y)<\varepsilon}
$$

とします。

<a id="thm-top7-metric-uniformity"></a>

<!-- formal-statement-start -->
> **定理（距離が定める一様構造）**  
> 距離空間 $(X,d)$ に対し、
>
$$
\mathcal U_d
=
{U\subset X\times X:\exists\varepsilon>0, U_\varepsilon\subset U}
$$
>
> とおくと、$\mathcal U_d$ は $X$ 上の一様構造です。
<!-- formal-statement-end -->

### 証明の見取り図

対角を含むこと、上方包含、有限交差、逆関係は距離の基本性質から直接確認できます。核心は合成で、$V=U_{\varepsilon/2}$ と取れば三角不等式により

$$
V\circ V\subset U_\varepsilon
$$

となります。

<!-- proof-start -->
### 証明

$U\in\mathcal U_d$ とします。ある $\varepsilon>0$ があり $U_\varepsilon\subset U$ です。

$d(x,x)=0<\varepsilon$ より $\Delta_X\subset U_\varepsilon\subset U$ なので公理1が成り立ちます。

$U\subset W$ なら $U_\varepsilon\subset W$ なので $W\in\mathcal U_d$ です。

$U,V\in\mathcal U_d$ なら、ある $\varepsilon,\delta>0$ に対し

$$
U_\varepsilon\subset U,
\qquad
U_\delta\subset V.
$$

したがって

$$
U_{\min(\varepsilon,\delta)}
\subset U\cap V,
$$

よって $U\cap V\in\mathcal U_d$ です。

距離の対称性から $U_\varepsilon^{-1}=U_\varepsilon$ なので、$U^{-1}$ も $U_\varepsilon$ を含み、$\mathcal U_d$ に属します。

最後に $W=U_{\varepsilon/2}$ とします。$(x,z)\in W\circ W$ なら、ある $y$ が存在して

$$
d(x,y)<\frac{\varepsilon}{2},
\qquad
d(y,z)<\frac{\varepsilon}{2}.
$$

三角不等式より

$$
d(x,z)
\le d(x,y)+d(y,z)
<\varepsilon.
$$

したがって

$$
W\circ W\subset U_\varepsilon\subset U.
$$

以上で全ての公理を確認しました。
<!-- proof-end -->

距離を忘れても、「どの二点の組を十分近いとみなすか」という情報は $\mathcal U_d$ に残っています。

---

## 2. 二点の近さから位相を戻す

$U\subset X\times X$ と $x\in X$ に対し

$$
U[x]={y\in X:(x,y)\in U}
$$

と書きます。

<a id="def-top7-induced-topology"></a>

<!-- formal-statement-start -->
> **定義（一様空間の開集合）**  
> 一様空間 $(X,\mathcal U)$ で、$O\subset X$ が開集合であるとは、任意の $x\in O$ に対し、ある $U\in\mathcal U$ が存在して
>
$$
U[x]\subset O
$$
>
> となることと定めます。
<!-- formal-statement-end -->

<!-- definition-example-start: def-top7-induced-topology -->
### 直接例：離散一様構造が誘導する位相

**定義の確認**

上の $X=\{0,1\}$ と離散一様構造を考えます。任意の $O\subset X$ と $x\in O$ に対し $U=\Delta_X$ を取ると
$$
U[x]=\{x\}\subset O.
$$
従って全ての部分集合が開であり、誘導位相は離散位相です。
<!-- definition-example-end -->

<a id="thm-top7-induced-topology"></a>

<!-- formal-statement-start -->
> **定理（一様構造は位相を誘導する）**  
> 上の定義で得られる開集合族は位相をなします。さらに距離 $d$ から作った一様構造 $\mathcal U_d$ が誘導する位相は、距離 $d$ の通常の距離位相と一致します。
<!-- formal-statement-end -->

### 証明の見取り図

任意和は各点で使った近縁をそのまま使えます。有限交差は近縁の有限交差で処理できます。

距離の場合は

$$
U_\varepsilon[x]=B_d(x,\varepsilon)
$$

なので、近縁による近傍と開球による近傍が一致します。

<!-- proof-start -->
### 証明

空集合は条件を空虚に満たし、$X$ は任意の $x\in X$ に対して任意の $U\in\mathcal U$ を使えば $U[x]\subset X$ なので開です。

開集合族 $(O_\lambda)_{\lambda\in\Lambda}$ を取り、

$$
O=\bigcup_{\lambda\in\Lambda}O_\lambda
$$

とします。$x\in O$ なら、ある $\lambda$ で $x\in O_\lambda$ です。$O_\lambda$ が開なので、ある $U\in\mathcal U$ が存在して

$$
U[x]\subset O_\lambda\subset O.
$$

よって任意和は開です。

$O_1,O_2$ を開とし $x\in O_1\cap O_2$ とします。それぞれに対して $U_1,U_2\in\mathcal U$ が存在し

$$
U_1[x]\subset O_1,
\qquad
U_2[x]\subset O_2.
$$

$U_1\cap U_2\in\mathcal U$ であり

$$
(U_1\cap U_2)[x]
=
U_1[x]\cap U_2[x]
\subset O_1\cap O_2.
$$

したがって有限交差も開です。

距離一様構造では $U_\varepsilon[x]=B_d(x,\varepsilon)$ です。従って「ある近縁 $U$ で $U[x]\subset O$」と「ある $\varepsilon>0$ で $B_d(x,\varepsilon)\subset O$」は同値であり、距離位相と一致します。
<!-- proof-end -->

ここで重要なのは、**一様構造から位相は作れるが、位相から一様構造が一意に戻るわけではない**ことです。

---

## 3. 同じ位相でも一様構造は違いうる

$\mathbb R$ 上で

$$
d(x,y)=|x-y|,
\qquad
\rho(x,y)=|\arctan x-\arctan y|
$$

を考えます。

$\arctan:\mathbb R\to(-\pi/2,\pi/2)$ は狭義単調な連続全単射で、逆写像 $\tan$ も連続です。したがって $\rho$ が入れる位相は通常位相と同じです。

一方、$x_n=n$ とすると

$$
\rho(n,m)
=
|\arctan n-\arctan m|.
$$

$\arctan n\to\pi/2$ なので $(n)$ は $\rho$ に関して Cauchy です。しかし

$$
d(n,n+1)=1
$$

なので $d$ に関して Cauchy ではありません。

<a id="prop-top7-same-topology-different-uniformity"></a>

<!-- formal-statement-start -->
> **命題（同じ位相を誘導する異なる一様構造）**  
> $\mathbb R$ 上の距離
>
$$
d(x,y)=|x-y|,
\qquad
\rho(x,y)=|\arctan x-\arctan y|
$$
>
> は同じ位相を誘導しますが、同じ一様構造を誘導しません。
<!-- formal-statement-end -->

<!-- proof-start -->
### 証明

同じ一様構造を誘導すると仮定します。

$\rho$ に関して $(n)$ は Cauchy です。一様構造が同一なら、一様構造だけで定まる Cauchy 性も同一になるはずです。

しかし $d(n,n+1)=1$ なので、$\varepsilon=1/2$ に対し、どれだけ $N$ を大きくしても $m=n+1ge N$ を取れば

$$
d(n,m)=1ge\frac12.
$$

したがって $(n)$ は $d$-Cauchy ではありません。矛盾です。

よって二つの一様構造は異なります。
<!-- proof-end -->

この例は後で、**完備性も位相不変量ではない**ことを同時に示します。

---

## 4. 場所によらない近さを保つ写像

<a id="def-top7-uniform-continuity"></a>

<!-- formal-statement-start -->
> **定義（一様連続写像）**  
> 一様空間 $(X,\mathcal U_X)$ から $(Y,\mathcal U_Y)$ への写像 $f:X\to Y$ が **一様連続**であるとは、任意の $V\in\mathcal U_Y$ に対し、ある $U\in\mathcal U_X$ が存在して
>
$$
(x,x')\in U
\quad\Longrightarrow\quad
(f(x),f(x'))\in V
$$
>
> が全ての $x,x'\in X$ について成り立つことです。
<!-- formal-statement-end -->

<!-- definition-example-start: def-top7-uniform-continuity -->
### 直接例：離散一様空間からの写像

**定義の確認**

$X$ を離散一様空間、$(Y,\mathcal U_Y)$ を任意の一様空間とし、$f:X\to Y$ を任意の写像とします。$V\in\mathcal U_Y$ に対し $U=\Delta_X$ と取れば、
$$
(x,x')\in U
\Longrightarrow
x=x'
\Longrightarrow
(f(x),f(x'))\in\Delta_Y\subset V.
$$
従って $f$ は一様連続です。
<!-- definition-example-end -->

距離空間ならこれは通常の

$$
\forall\varepsilon>0 \exists\delta>0 \forall x,x',
\quad
d_X(x,x')<\delta
\Rightarrow
d_Y(f(x),f(x'))<\varepsilon
$$

そのものです。

<a id="prop-top7-metric-uniform-continuity"></a>

<!-- formal-statement-start -->
> **命題（距離空間での一様連続性との一致）**  
> 距離空間 $(X,d_X),(Y,d_Y)$ が誘導する一様構造を考えます。写像 $f:X\to Y$ が一様空間の意味で一様連続であることと、通常の $\varepsilon$--$\delta$ の意味で一様連続であることは同値です。
<!-- formal-statement-end -->

証明は $V=U_\varepsilon^Y$ と $U=U_\delta^X$ を対応させれば直ちに得られます。

### 直接例：$\arctan$ と $\tan$

恒等写像

$$
\operatorname{id}:(\mathbb R,d)\to(\mathbb R,\rho)
$$

は

$$
|\arctan x-\arctan y|
\le |x-y|
$$

より 1-Lipschitz、従って一様連続です。

しかし逆向き

$$
\operatorname{id}:(\mathbb R,\rho)\to(\mathbb R,d)
$$

は一様連続ではありません。実際

$$
\rho(n,n+1)\to0
$$

ですが

$$
d(n,n+1)=1.
$$

同相写像でも一様同型とは限らない、という差がここに現れます。

<a id="prop-top7-uniform-composition"></a>

<!-- formal-statement-start -->
> **命題（一様連続写像の合成）**  
> $f:X\to Y$ と $g:Y\to Z$ が一様連続なら、$g\circ f:X\to Z$ も一様連続です。
<!-- formal-statement-end -->

<!-- proof-start -->
### 証明

$W\in\mathcal U_Z$ を取ります。$g$ の一様連続性より、ある $V\in\mathcal U_Y$ が存在して

$$
(y,y')in V
\Rightarrow
(g(y),g(y'))in W.
$$

さらに $f$ の一様連続性より、ある $U\in\mathcal U_X$ が存在して

$$
(x,x')in U
\Rightarrow
(f(x),f(x'))in V.
$$

従って $(x,x')in U$ なら

$$
(g(f(x)),g(f(x')))in W.
$$

よって $g\circ f$ は一様連続です。
<!-- proof-end -->

---

## 5. Cauchy 性を filter で書く

[TOP6 で導入した filter](../TOP6/index.md#def-top6-filter) を使うと、点列に依存しない Cauchy 性を書けます。

<a id="def-top7-cauchy-filter"></a>

<!-- formal-statement-start -->
> **定義（Cauchy filter）**  
> 一様空間 $(X,\mathcal U)$ 上の filter $\mathcal F$ が **Cauchy filter** であるとは、任意の $U\in\mathcal U$ に対し、ある $A\in\mathcal F$ が存在して
>
$$
A\times A\subset U
$$
>
> となることです。
<!-- formal-statement-end -->

<!-- definition-example-start: def-top7-cauchy-filter -->
### 直接例：一点に集中する filter

**定義の確認**

$x\in X$ とし、$x$ を含む集合全体からなる主 filter $\mathcal F_x$ を考えます。任意の近縁 $U$ に対し $A=\{x\}\in\mathcal F_x$ と取れば
$$
A\times A=\{(x,x)\}\subset\Delta_X\subset U.
$$
従って $\mathcal F_x$ は Cauchy filter です。
<!-- definition-example-end -->

これは「filter の最終部分が、指定した一様精度の中に丸ごと収まる」という意味です。

点列 $(x_n)$ の最終 filter を

$$
\mathcal F_{(x_n)}
=
{A\subset X:\exists N, {x_n:n\ge N}\subset A}
$$

とします。

<a id="prop-top7-sequence-cauchy-filter"></a>

<!-- formal-statement-start -->
> **命題（距離 Cauchy 列と Cauchy filter）**  
> 距離空間 $(X,d)$ の点列 $(x_n)$ について、$(x_n)$ が通常の意味で Cauchy 列であることと、その最終 filter $\mathcal F_{(x_n)}$ が距離一様構造に関して Cauchy filter であることは同値です。
<!-- formal-statement-end -->

<!-- proof-start -->
### 証明

$(x_n)$ が Cauchy とします。$U\in\mathcal U_d$ を取ると、ある $\varepsilon>0$ で

$$
U_\varepsilon\subset U.
$$

Cauchy 性より、ある $N$ が存在して $m,n\ge N$ なら

$$
d(x_m,x_n)<\varepsilon.
$$

従って尾集合

$$
A_N={x_n:n\ge N}
$$

は $A_N\times A_N\subset U_\varepsilon\subset U$ を満たし、$A_N\in\mathcal F_{(x_n)}$ です。

逆に最終 filter が Cauchy とします。$\varepsilon>0$ に対して $U_\varepsilon$ を取ると、ある $A\in\mathcal F_{(x_n)}$ が存在して

$$
A\times A\subset U_\varepsilon.
$$

$A\in\mathcal F_{(x_n)}$ なので、ある $N$ に対して全ての $n\ge N$ で $x_n\in A$ です。従って $m,n\ge N$ なら

$$
(x_m,x_n)\in A\times A\subset U_\varepsilon,
$$

すなわち $d(x_m,x_n)<\varepsilon$ です。
<!-- proof-end -->

---

## 6. 分離性と完備性

一様構造では、異なる二点が全ての近縁に入ってしまうことがあります。距離空間のように二点を一様構造で区別できる条件を分離性と呼びます。

<a id="def-top7-separated-uniform-space"></a>

<!-- formal-statement-start -->
> **定義（分離一様空間）**  
> 一様空間 $(X,\mathcal U)$ が **分離的**であるとは
>
$$
\bigcap_{U\in\mathcal U}U=\Delta_X
$$
>
> が成り立つことです。
<!-- formal-statement-end -->

<!-- definition-example-start: def-top7-separated-uniform-space -->
### 直接例：離散一様空間は分離的

**定義の確認**

離散一様構造では $\Delta_X$ 自身が近縁であり、全ての近縁は $\Delta_X$ を含みます。従って
$$
\bigcap_{U\in\mathcal U}U
=
\Delta_X.
$$
よって離散一様空間は分離的です。
<!-- definition-example-end -->

距離一様空間は分離的です。$x\ne y$ なら $d(x,y)>0$ なので、$\varepsilon=d(x,y)/2$ とすれば $(x,y)\notin U_\varepsilon$ です。

<a id="prop-top7-separated-hausdorff"></a>

<!-- formal-statement-start -->
> **命題（分離性と Hausdorff 性）**  
> 分離一様空間が誘導する位相は Hausdorff です。
<!-- formal-statement-end -->

### 証明の見取り図

$x\ne y$ なら、ある近縁 $U$ が $(x,y)$ を含みません。さらに対称な $V$ を十分小さく取り

$$
V\circ V\subset U
$$

とすれば、$V[x]$ と $V[y]$ は交わりません。

<!-- proof-start -->
### 証明

$x\ne y$ とします。分離性より、ある $U\in\mathcal U$ が存在して

$$
(x,y)\notin U.
$$

$U\cap U^{-1}$ に取り替えて $U$ を対称としてよいです。

一様構造の公理より、ある $V\in\mathcal U$ が存在して

$$
V\circ V\subset U.
$$

さらに $V\cap V^{-1}$ に取り替えて $V$ も対称としてよいです。

もし $z\in V[x]\cap V[y]$ なら

$$
(x,z)\in V,
\qquad
(y,z)\in V.
$$

$V$ は対称なので $(z,y)\in V$ です。従って

$$
(x,y)\in V\circ V\subset U,
$$

これは $(x,y)\notin U$ に矛盾します。

よって $V[x]$ と $V[y]$ は互いに素な近傍です。
<!-- proof-end -->

<a id="def-top7-complete-uniform-space"></a>

<!-- formal-statement-start -->
> **定義（完備一様空間）**  
> 一様空間 $(X,\mathcal U)$ が **完備**であるとは、$X$ 上の任意の Cauchy filter が $X$ のある点へ収束することです。
<!-- formal-statement-end -->

<!-- definition-example-start: def-top7-complete-uniform-space -->
### 直接例：離散一様空間は完備

**定義の確認**

離散一様空間上の Cauchy filter $\mathcal F$ を取ります。近縁 $\Delta_X$ に Cauchy 条件を適用すると、ある $A\in\mathcal F$ が
$$
A\times A\subset\Delta_X
$$
を満たします。filter は空集合を含まないので $A=\{x\}$ となる点 $x$ が存在します。すると $\mathcal F$ は $x$ の全ての近傍を含み、$x$ へ収束します。従って離散一様空間は完備です。
<!-- definition-example-end -->

距離空間では、この定義は通常の Cauchy 列による完備性と一致します。距離空間では可算な基本近縁 $U_{1/n}$ を使えるため、Cauchy filter から Cauchy 列を抽出して通常の完備性へ帰着できます。

### 同じ位相でも完備性は変わる

$(\mathbb R,d)$ は完備です。

一方 $(\mathbb R,\rho)$ で $x_n=n$ は Cauchy ですが、もし $\rho$ で $x_n\to x\in\mathbb R$ なら

$$
\arctan n\to\arctan x.
$$

左辺は $\pi/2$ へ収束するので $\arctan x=\pi/2$ が必要ですが、そのような実数 $x$ はありません。

従って $(\mathbb R,\rho)$ は不完備です。

---

## 7. 全有界性も一様構造の概念になる

<a id="def-top7-total-bounded-uniform"></a>

<!-- formal-statement-start -->
> **定義（一様空間の全有界性）**  
> 一様空間 $(X,\mathcal U)$ が **全有界**であるとは、任意の $U\in\mathcal U$ に対し有限集合 $F\subset X$ が存在して
>
$$
X=\bigcup_{x\in F}U[x]
$$
>
> となることです。
<!-- formal-statement-end -->

<!-- definition-example-start: def-top7-total-bounded-uniform -->
### 直接例：有限離散一様空間は全有界

**定義の確認**

有限集合 $X$ に離散一様構造を入れます。任意の近縁 $U$ に対し有限集合 $F=X$ と取れば、各 $x\in X$ について $x\in U[x]$ なので
$$
X=\bigcup_{x\in F}U[x].
$$
従って有限離散一様空間は全有界です。
<!-- definition-example-end -->

距離一様空間で $U=U_\varepsilon$ とすれば

$$
U_\varepsilon[x]=B(x,\varepsilon)
$$

なので、これは TOP6 で使った距離空間の全有界性と一致します。

<a id="thm-top7-compact-complete-total-bounded"></a>

<!-- formal-statement-start -->
> **定理（コンパクト一様空間は完備かつ全有界）**  
> $(X,\mathcal U)$ をコンパクトな分離一様空間とします。このとき $X$ は完備かつ全有界です。
<!-- formal-statement-end -->

### 証明の見取り図

全有界性には、各点の一様近傍で $X$ を覆い、コンパクト性で有限部分被覆を取ります。

完備性には、Cauchy filter がコンパクト性により cluster point を持つことを使います。Cauchy 条件で filter のある集合を十分小さくし、その集合が cluster point の近傍と交わることから、filter 全体がその点へ収束すると示します。

<!-- proof-start -->
### 証明

まず全有界性を示します。$U\in\mathcal U$ を取ります。ある対称な $V\in\mathcal U$ を

$$
V\circ V\subset U
$$

となるように取ります。

各 $x\in X$ に対して $V[x]$ は $x$ の近傍です。従って、各 $x$ について開集合 $O_x$ を

$$
x\in O_x\subset V[x]
$$

となるように取れます。$(O_x)_{x\in X}$ は $X$ の開被覆です。

コンパクト性から有限個 $x_1,\ldots,x_m$ を選んで

$$
X=O_{x_1}\cup\cdots\cup O_{x_m}
\subset
V[x_1]\cup\cdots\cup V[x_m]
\subset
U[x_1]\cup\cdots\cup U[x_m].
$$

よって全有界です。

次に完備性を示します。$\mathcal F$ を Cauchy filter とします。コンパクト空間上の filter は cluster point $x\in X$ を持ちます。

$U\in\mathcal U$ を任意に取ります。対称な $V\in\mathcal U$ を

$$
V\circ V\subset U
$$

となるように取ります。

$\mathcal F$ が Cauchy なので、ある $A\in\mathcal F$ が存在して

$$
A\times A\subset V.
$$

$x$ は $\mathcal F$ の cluster point なので、$V[x]$ の内部に含まれるある近傍 $O$ と $A$ は交わります。$a\in A\cap O$ を一つ取ります。すると $(x,a)\in V$ です。

任意の $y\in A$ に対し $(a,y)\in V$ なので

$$
(x,y)\in V\circ V\subset U.
$$

従って $A\subset U[x]$ です。$A\in\mathcal F$ と filter の上方閉性から

$$
U[x]\in\mathcal F.
$$

$U$ は任意だったので $\mathcal F\to x$ です。

従って $X$ は完備です。
<!-- proof-end -->

距離空間では [TOP6 の「compact $Longleftrightarrow$ complete + totally bounded」](../TOP6/index.md#thm-top6-compact-complete-total-bounded) が逆向きまで成り立ちます。一様空間の一般論では逆向きにも追加の議論が必要になるため、本章では距離空間の既存正本を再利用します。

---

## 8. 一様連続写像は Cauchy 性を保つ

<a id="prop-top7-uniform-map-cauchy-filter"></a>

<!-- formal-statement-start -->
> **命題（一様連続写像は Cauchy filter を送る）**  
> $f:X\to Y$ を一様連続写像とし、$\mathcal F$ を $X$ 上の Cauchy filter とします。このとき像 filter $f_*\mathcal F$ は $Y$ 上の Cauchy filter です。
<!-- formal-statement-end -->

<!-- proof-start -->
### 証明

$V\in\mathcal U_Y$ を取ります。一様連続性より、ある $U\in\mathcal U_X$ が存在して

$$
(x,x')in U
\Rightarrow
(f(x),f(x'))in V.
$$

$\mathcal F$ は Cauchy なので、ある $A\in\mathcal F$ が存在して

$$
A\times A\subset U.
$$

すると任意の $a,a'in A$ に対して

$$
(f(a),f(a'))in V.
$$

従って

$$
f(A)\times f(A)\subset V.
$$

像 filter は $f(A)$ を含むので Cauchy です。
<!-- proof-end -->

この命題は「一様連続写像は Cauchy 列を Cauchy 列へ送る」という距離空間の事実の正体です。

---

## 9. 一様収束と関数空間

距離空間 $(Y,d_Y)$ への写像 $f,g:X\to Y$ に対し、値が有界な範囲では

$$
d_\infty(f,g)
=
\sup_{x\in X}d_Y(f(x),g(x))
$$

を考えられます。

$d_\infty(f_n,f)\to0$ は

$$
\forall\varepsilon>0 \exists N \forall n\ge N \forall x\in X,
\quad
d_Y(f_n(x),f(x))<\varepsilon
$$

という一様収束そのものです。

「各 $x$ ごとに $N$ を選ぶ」のではなく、「全 $x$ に同じ $N$ を使う」点が、一様構造の思想です。

この見方は、関数解析で $C_b(X)$ や $C_0(X)$ を sup norm で扱うときの基礎になります。

---

## 10. 何が位相的で、何が一様的か

最後に区別を固定します。

| 性質 | 位相だけで決まるか | 一様構造が必要か |
|---|---:|---:|
| 開集合・閉集合 | はい | いいえ |
| 連続性 | はい | いいえ |
| compactness | はい | いいえ |
| connectedness | はい | いいえ |
| 一様連続性 | いいえ | はい |
| Cauchy 性 | いいえ | はい |
| completeness | いいえ | はい |
| total boundedness | いいえ | はい |
| uniform convergence | いいえ | はい |

特に

$$
(\mathbb R,|\cdot|)
\quad\text{と}\quad
(\mathbb R,|\arctan x-\arctan y|)
$$

は位相的には同じですが、一様構造としては違います。この一例が章全体の要点です。

---

# 11. 演習 A

<a id="ex-top7-a01"></a>

## TOP7-A01 距離近縁の平方

- Level: A

距離空間 $(X,d)$ で

$$
U_\varepsilon={(x,y):d(x,y)<\varepsilon}
$$

とする。$U_{\varepsilon/2}\circ U_{\varepsilon/2}\subset U_\varepsilon$ を示せ。

<!-- solution-start -->
### 詳細解答

$(x,z)\in U_{\varepsilon/2}\circ U_{\varepsilon/2}$ とする。定義より、ある $y\in X$ が存在して

$$
d(x,y)<\frac{\varepsilon}{2},
\qquad
d(y,z)<\frac{\varepsilon}{2}.
$$

三角不等式から

$$
d(x,z)
\le d(x,y)+d(y,z)
<\varepsilon.
$$

従って $(x,z)\in U_\varepsilon$ である。
<!-- solution-end -->

<a id="ex-top7-a02"></a>

## TOP7-A02 同じ位相

- Level: A

$$
\rho(x,y)=|\arctan x-\arctan y|
$$

が $\mathbb R$ の通常位相と同じ位相を誘導することを、$\arctan$ が $\mathbb R$ から $(-\pi/2,\pi/2)$ への同相写像であることから説明せよ。

<!-- solution-start -->
### 詳細解答

写像

$$
\phi(x)=\arctan x
$$

は $\mathbb R$ から $(-\pi/2,\pi/2)$ への連続な狭義単調全単射で、逆写像 $\tan$ も連続である。

また

$$
\rho(x,y)=|\phi(x)-\phi(y)|
$$

なので、$\phi$ は $(\mathbb R,\rho)$ と区間 $(-\pi/2,\pi/2)$ の通常距離空間との等長写像である。

区間の位相を $\phi^{-1}$ で $\mathbb R$ に戻したものは通常の $\mathbb R$ の位相である。従って $\rho$ と $d(x,y)=|x-y|$ は同じ位相を誘導する。
<!-- solution-end -->

<a id="ex-top7-a03"></a>

## TOP7-A03 一様連続性の失敗

- Level: A

$f(x)=x^2$ は $\mathbb R$ 上で連続だが一様連続ではないことを、

$$
x_n=n,
\qquad
y_n=n+\frac1n
$$

を使って示せ。

<!-- solution-start -->
### 詳細解答

入力差は

$$
|x_n-y_n|=\frac1n\to0.
$$

一方

$$
|f(y_n)-f(x_n)|
=
\left(n+\frac1n\right)^2-n^2
=
2+\frac1{n^2}
\to2.
$$

もし $f$ が一様連続なら、入力距離が0へ行く任意の二点列に対して出力距離も0へ行かなければならない。ここでは出力差が2へ収束するので矛盾する。

従って $x^2$ は $\mathbb R$ 上で一様連続ではない。
<!-- solution-end -->

<a id="ex-top7-a04"></a>

## TOP7-A04 Cauchy filter

- Level: A

$\mathbb R$ の通常距離で $x_n=1/n$ とする。最終 filter $\mathcal F_{(x_n)}$ が Cauchy filter であることを定義から確認せよ。

<!-- solution-start -->
### 詳細解答

任意の距離近縁 $U\in\mathcal U_d$ を取る。ある $\varepsilon>0$ があり

$$
U_\varepsilon\subset U.
$$

$1/n$ は通常の Cauchy 列なので、ある $N$ が存在して $m,n\ge N$ なら

$$
\left|\frac1m-\frac1n\right|<\varepsilon.
$$

尾集合

$$
A_N={1/n:n\ge N}
$$

は最終 filter に属し、

$$
A_N\times A_N\subset U_\varepsilon\subset U.
$$

よって定義から最終 filter は Cauchy である。
<!-- solution-end -->

# 12. 演習 B

<a id="ex-top7-b01"></a>

## TOP7-B01 誘導位相の有限交差

- Level: B

一様構造から定めた開集合 $O_1,O_2$ に対し、$O_1\cap O_2$ が開であることを、一様構造の有限交差公理を明示して証明せよ。

<!-- solution-start -->
### 詳細解答

$x\in O_1\cap O_2$ を任意に取る。

$O_1$ が開なので、ある $U_1\in\mathcal U$ が存在して

$$
U_1[x]\subset O_1.
$$

同様に、ある $U_2\in\mathcal U$ が存在して

$$
U_2[x]\subset O_2.
$$

一様構造の有限交差公理から

$$
U=U_1\cap U_2\in\mathcal U.
$$

さらに

$$
U[x]
=
U_1[x]\cap U_2[x]
\subset
O_1\cap O_2.
$$

従って各 $x\in O_1\cap O_2$ に一様近傍が含まれるので、$O_1\cap O_2$ は開である。
<!-- solution-end -->

<a id="ex-top7-b02"></a>

## TOP7-B02 一様連続写像と Cauchy 列

- Level: B

距離空間 $X,Y$ の間の一様連続写像 $f:X\to Y$ と Cauchy 列 $(x_n)$ に対し、$(f(x_n))$ が Cauchy 列であることを $\varepsilon$--$\delta$ で示せ。その後、本章の Cauchy filter の命題との対応を説明せよ。

<!-- solution-start -->
### 詳細解答

$\varepsilon>0$ を取る。一様連続性より、ある $\delta>0$ が存在して

$$
d_X(x,x')<\delta
\Rightarrow
d_Y(f(x),f(x'))<\varepsilon
$$

が全ての $x,x'$ に対して成り立つ。

$(x_n)$ は Cauchy なので、ある $N$ が存在して $m,n\ge N$ なら

$$
d_X(x_m,x_n)<\delta.
$$

従って

$$
d_Y(f(x_m),f(x_n))<\varepsilon.
$$

よって $(f(x_n))$ は Cauchy である。

filter の言葉では、$(x_n)$ の最終 filter が Cauchy であり、一様連続写像が Cauchy filter を Cauchy filter へ送る命題を適用している。距離空間では最終 filter の Cauchy 性と点列の Cauchy 性が同値なので、二つの証明は同じ構造を表している。
<!-- solution-end -->

<a id="ex-top7-b03"></a>

## TOP7-B03 compactness から全有界性

- Level: B

コンパクト一様空間 $(X,\mathcal U)$ と $U\in\mathcal U$ を取る。有限集合 $F$ を作って

$$
X=\bigcup_{x\in F}U[x]
$$

を示せ。どこで「近縁の平方根」とコンパクト性を使ったか明記せよ。

<!-- solution-start -->
### 詳細解答

一様構造の公理から、ある $V\in\mathcal U$ を

$$
V\circ V\subset U
$$

となるように取れる。必要なら $V\cap V^{-1}$ に取り替えて対称としてよい。

各 $x\in X$ に対し $V[x]$ は $x$ の近傍なので、開集合 $O_x$ を

$$
x\in O_x\subset V[x]
$$

と取る。

$(O_x)_{x\in X}$ は $X$ の開被覆である。ここでコンパクト性を使い、有限個

$$
x_1,\ldots,x_m
$$

を選んで

$$
X=O_{x_1}\cup\cdots\cup O_{x_m}.
$$

従って

$$
X\subset V[x_1]\cup\cdots\cup V[x_m].
$$

$V\subset U$ として取れるので

$$
X=\bigcup_{j=1}^m U[x_j].
$$

したがって $F={x_1,\ldots,x_m}$ が求める有限集合である。

「近縁の平方根」$V$ は各点の十分小さな一様近傍を作るために使い、コンパクト性は無限個の近傍から有限個だけを残すために使った。
<!-- solution-end -->

# 13. 演習 C

<a id="ex-top7-c01"></a>

## TOP7-C01 同じ位相、異なる完備性

- Level: C

$\mathbb R$ 上の

$$
d(x,y)=|x-y|,
\qquad
\rho(x,y)=|\arctan x-\arctan y|
$$

について次を示せ。

1. $d$ と $\rho$ は同じ位相を誘導する。
2. $(\mathbb R,d)$ は完備である。
3. $x_n=n$ は $\rho$-Cauchy である。
4. $(x_n)$ は $\rho$ では収束しない。
5. 従って完備性は位相的性質ではなく一様的性質であることを説明せよ。

<!-- solution-start -->
### 詳細解答

1. $\arctan:\mathbb R\to(-\pi/2,\pi/2)$ は通常位相に関する同相写像であり、

   $$
   \rho(x,y)=|\arctan x-\arctan y|
   $$

   なので $\rho$ の距離位相は通常位相と一致する。

2. $(\mathbb R,d)$ の Cauchy 列は実数の完備性により実数へ収束する。従って完備である。

3. 実数列 $\arctan n$ は $\pi/2$ へ収束するので Cauchy である。従って任意の $\varepsilon>0$ に対し、十分大きい $m,n$ で

   $$
   \rho(m,n)
   =
   |\arctan m-\arctan n|
   <\varepsilon.
   $$

   よって $(n)$ は $\rho$-Cauchy である。

4. もしある $x\in\mathbb R$ へ $\rho$-収束するなら

   $$
   |\arctan n-\arctan x|\to0.
   $$

   左辺の第1項は $\pi/2$ へ収束するので

   $$
   \arctan x=\frac{\pi}{2}
   $$

   が必要になる。しかし有限な実数 $x$ に対して $\arctan x<\pi/2$ である。矛盾。

5. 同じ位相を持つ二つの距離のうち、一方は完備で他方は不完備である。従って完備性は開集合族だけから決まらない。二点間の一様な近さ、すなわち一様構造に依存する。

この例では $\arctan$ により「無限遠」が有限距離の端点 $\pi/2$ に押し込まれ、その端点自体が空間に存在しないことが不完備性の原因である。
<!-- solution-end -->

---

## 14. 章末チェック

- [ ] 一様構造の5公理を距離のどの性質の抽象化か説明できる。
- [ ] 距離一様構造を $U_\varepsilon$ から構成できる。
- [ ] 一様構造から位相を戻せる。
- [ ] 同じ位相を誘導する異なる一様構造の例を挙げられる。
- [ ] 一様連続性を entourage と $\varepsilon$--$\delta$ の両方で書ける。
- [ ] Cauchy filter と距離 Cauchy 列の対応を説明できる。
- [ ] 分離一様空間が Hausdorff になる理由を説明できる。
- [ ] compact uniform space が complete / totally bounded になる機構を追える。
- [ ] completeness が位相不変量ではないことを具体例で示せる。

次は、cover の直径を使って集合自身の幾何学的な大きさを測る [MT8](../MT8/index.md) へ進みます。
