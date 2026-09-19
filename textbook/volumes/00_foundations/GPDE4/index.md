# GPDE4：境界値を点wise条件から関数空間の条件へ変える

GPDE3 では、弱微分を $L^2$ で制御する空間

$$
H^1(\Omega)=W^{1,2}(\Omega)
$$

を作りました。

しかし PDE では、関数空間を作っただけではまだ足りません。たとえば零 Dirichlet 問題

$$
-\Delta u=f
\quad\text{in }\Omega,
\qquad
u=0
\quad\text{on }\partial\Omega
$$

を考えると、最後の

$$
u=0\quad\text{on }\partial\Omega
$$

を Sobolev 関数に対してどう読むかが問題になります。

$H^1(\Omega)$ の元は、ほとんど至る所（almost everywhere; a.e.）で一致する関数を同一視した同値類です。しかも $\Omega$ は開集合なので、そもそも境界 $\partial\Omega$ は定義域の外側です。したがって一般の $u\in H^1(\Omega)$ に対して、古典解のように「境界点 $x$ へ代入して $u(x)=0$」と書くことはできません。

本章の中心は、この境界条件を二つの方向から作り直すことです。

$$
\boxed{
\text{境界から離れた滑らかな関数で近似できる}
}
\quad\Longleftrightarrow\quad
\boxed{
\text{trace が 0}
}
$$

左側が $H_0^1(\Omega)$、右側が trace による境界値です。

さらに、この零境界条件を入れると、関数自身の $L^2$ norm を勾配で制御する評価

$$
\|u\|_{L^2(\Omega)}
\le
C_P\|\nabla u\|_{L^2(\Omega)}
$$

が成立し、勾配だけで $u$ 全体を制御できるようになります。

GPDE6 以降の変分法では

$$
\int_\Omega |\nabla u|^2
$$

が主役になります。その前に本章で

$$
H_0^1
\longrightarrow
\text{$L^2$ と勾配の制御}
\longrightarrow
\text{勾配 norm}
\longrightarrow
\text{trace}
$$

を閉じます。

---

## 1. なぜ「境界で $u=0$」を点wiseに書けないのか

$L^2(\Omega)$ や $H^1(\Omega)$ では、測度 0 の集合上でだけ異なる関数は同じ元です。

さらに、$u\in H^1(\Omega)$ は $\Omega$ 上の関数の同値類であり、通常は $\partial\Omega$ 上の値を最初から持っていません。

たとえば $\Omega=(0,1)$ で、内部では同じ式

$$
u(x)=x(1-x)
\qquad
0<x<1
$$

を使いながら、あとから形式的に

$$
u(0)=0,\qquad u(1)=0
$$

と置くことも、

$$
u(0)=100,\qquad u(1)=-7
$$

と置くことも、開区間 $(0,1)$ 上の $H^1$ 元としては同じです。

境界値は、代表元へ勝手に値を書き足して決めるものではありません。

必要なのは、内部の $H^1$ 情報から連続的に境界データを回収する仕組みです。

その仕組みが trace です。

ただし trace へ行く前に、零境界条件だけならもっと直接的に定義できます。

---

## 2. $H_0^1$：零境界条件を近似可能性として定義する

<a id="def-gpde4-h01"></a>

<!-- formal-statement-start -->
> **定義（H_0^1）**  
> $\Omega\subset\mathbb R^d$ を開集合とする。
>
> $C_c^\infty(\Omega)$ の $H^1(\Omega)$ norm による閉包を

$$
\boxed{
H_0^1(\Omega)
:=
\overline{C_c^\infty(\Omega)}^{\,H^1(\Omega)}
}
$$

> と定める。
>
> すなわち $u\in H_0^1(\Omega)$ であるとは、ある列
>
> $$
> \varphi_n\in C_c^\infty(\Omega)
> $$
>
> が存在し、
>
> $$
> \|\varphi_n-u\|_{H^1(\Omega)}
> \to0
> $$
>
> となることである。
<!-- formal-statement-end -->

<!-- definition-example-start: def-gpde4-h01 -->
**定義の確認**

$\Omega=(0,1)$ とし、$(1/4,3/4)$ に台を持つ滑らかな bump 関数 $\varphi$ を取ります。

このとき

$$
\varphi\in C_c^\infty(0,1).
$$

したがって一定列

$$
\varphi_n=\varphi
$$

を取れば

$$
\|\varphi_n-\varphi\|_{H^1}=0.
$$

よって

$$
\varphi\in H_0^1(0,1).
$$

「境界で 0」という言葉を一度も使わなくても、閉包の定義だけで $H_0^1$ への所属を確認できました。
<!-- definition-example-end -->

この定義の重要点は、近似関数 $\varphi_n$ がすべて境界から正の距離を持つ台を持つことです。

したがって $H_0^1$ は

$$
\text{境界近くで 0 の滑らかな関数}
$$

を $H^1$ 極限で閉じた空間です。

後で定義する標準的な境界正則性を持つ有界領域では、これがちょうど

$$
\operatorname{Tr}u=0
$$

と一致することを示します。

---

## 3. $H_0^1$ は $H^1$ の閉部分空間である

<a id="prop-gpde4-h01-closed"></a>

<!-- formal-statement-start -->
> **命題（H_0^1 は閉部分空間）**  
> 任意の開集合 $\Omega\subset\mathbb R^d$ に対し、$H_0^1(\Omega)$ は $H^1(\Omega)$ の閉線形部分空間である。
>
> 特に $H^1(\Omega)$ の内積を制限すると、$H_0^1(\Omega)$ は完備な内積空間である。
<!-- formal-statement-end -->

### 証明の見取り図

$H_0^1$ はそもそも

$$
C_c^\infty(\Omega)
$$

の $H^1$ 閉包として定義しました。

したがって「閉」であることは定義そのものです。

残るのは、線形部分空間であることと、閉部分空間が完備性を引き継ぐことです。

<!-- proof-start -->
### 証明

$u,v\in H_0^1(\Omega)$、$a,b\in\mathbb R$ とします。

定義から

$$
u_n,v_n\in C_c^\infty(\Omega)
$$

を

$$
u_n\to u,
\qquad
v_n\to v
\quad\text{in }H^1(\Omega)
$$

となるように取れます。

このとき

$$
au_n+bv_n\in C_c^\infty(\Omega)
$$

であり、

$$
\|au_n+bv_n-(au+bv)\|_{H^1}
\le
|a|\|u_n-u\|_{H^1}
+
|b|\|v_n-v\|_{H^1}
\to0.
$$

従って

$$
au+bv\in H_0^1(\Omega).
$$

よって $H_0^1(\Omega)$ は線形部分空間です。

また定義から $H_0^1(\Omega)$ は $H^1(\Omega)$ で閉じています。

GPDE3 で $H^1(\Omega)$ が完備な内積空間であることを示しました。完備な内積空間の閉部分空間は再び完備なので、

$$
\boxed{
H_0^1(\Omega)
\text{ is Hilbert}
}
$$

です。
<!-- proof-end -->

ここではまだ境界の滑らかさを一切仮定していません。

$H_0^1$ の定義自体は、任意の開集合で意味を持ちます。

---

## 4. 零境界条件が定数方向を消す

全 $H^1(\Omega)$ で

$$
\|u\|_2
\le
C\|\nabla u\|_2
$$

を期待することはできません。

定数関数

$$
u\equiv1
$$

を入れると、

$$
\|\nabla u\|_2=0
$$

なのに、有限測度の非空領域では

$$
\|u\|_2>0
$$

だからです。

つまり勾配は

$$
u\mapsto u+c
$$

という定数方向を見分けられません。

$H_0^1$ は零境界条件によって、その定数方向を除きます。

そこで勾配だけで関数自身まで制御できるようになります。

<a id="thm-gpde4-poincare"></a>

<!-- formal-statement-start -->
> **定理（H_0^1 の Poincaré 不等式）**  
> $\Omega\subset\mathbb R^d$ を有界開集合とする。
>
> このとき定数 $C_P>0$ が存在し、任意の $u\in H_0^1(\Omega)$ に対して

$$
\boxed{
\|u\|_{L^2(\Omega)}
\le
C_P
\|\nabla u\|_{L^2(\Omega)}
}
$$

> が成り立つ。
>
> 特に、ある $a<b$ に対して

$$
\Omega\subset
(a,b)\times\mathbb R^{d-1}
$$

> なら

$$
C_P=b-a
$$

> と取れる。
<!-- formal-statement-end -->

この定理には Lipschitz 境界も $C^1$ 境界も不要です。

必要なのは

- $\Omega$ が有界で、一方向の有限幅を持つこと。
- $u\in H_0^1$ なので、まず $C_c^\infty$ で証明してから $H^1$ 極限へ移せること。

の二点です。

### 証明の見取り図

まず

$$
u\in C_c^\infty(\Omega)
$$

とします。

$u$ を $\Omega$ の外で 0 と延長すると、境界近くでもすでに 0 なので、零延長は滑らかなままです。

固定した横座標 $x'\in\mathbb R^{d-1}$ に対して左端 $x_1=a$ から微分を積分し、

$$
u(x_1,x')
=
\int_a^{x_1}
\partial_1u(s,x')\,ds
$$

と書きます。

あとは Cauchy--Schwarz を使って各断面を評価し、最後に全断面を積分します。

<!-- proof-start -->
### 証明

$\Omega$ は有界なので、$a<b$ を十分広く取って

$$
\Omega
\subset
(a,b)\times\mathbb R^{d-1}
$$

とできます。

まず

$$
u\in C_c^\infty(\Omega)
$$

とします。

$u$ を $\mathbb R^d$ へ 0 で延長しても、$u$ の台は $\Omega$ の内部にコンパクトに含まれるため、延長後も $C_c^\infty(\mathbb R^d)$ です。

$x=(x_1,x')$ と書きます。

$x'$ を固定すると、$u(a,x')=0$ なので

$$
u(x_1,x')
=
\int_a^{x_1}
\partial_1u(s,x')\,ds.
$$

[Cauchy--Schwarz の不等式](../F0_00E2_Cauchy_Schwarz_Bessel_Parseval/index.md#thm-f0-00e2-cauchy-schwarz)より

$$
|u(x_1,x')|^2
\le
(x_1-a)
\int_a^{x_1}
|\partial_1u(s,x')|^2\,ds.
$$

$x_1\in(a,b)$ なので

$$
x_1-a\le b-a
$$

かつ積分区間を広げて

$$
\int_a^{x_1}
|\partial_1u|^2
\le
\int_a^b
|\partial_1u|^2.
$$

従って

$$
|u(x_1,x')|^2
\le
(b-a)
\int_a^b
|\partial_1u(s,x')|^2\,ds.
$$

両辺を $x_1\in(a,b)$ で積分すると

$$
\int_a^b
|u(x_1,x')|^2\,dx_1
\le
(b-a)^2
\int_a^b
|\partial_1u(s,x')|^2\,ds.
$$

さらに $x'\in\mathbb R^{d-1}$ で積分します。

[Fubini の定理](../F0_00D2C_積測度_Tonelli_Fubini/index.md#thm-f0-00d2c-02)により

$$
\|u\|_{L^2(\mathbb R^d)}^2
\le
(b-a)^2
\|\partial_1u\|_{L^2(\mathbb R^d)}^2.
$$

零延長なので、これは

$$
\|u\|_{L^2(\Omega)}^2
\le
(b-a)^2
\|\partial_1u\|_{L^2(\Omega)}^2.
$$

さらに

$$
\|\partial_1u\|_2
\le
\|\nabla u\|_2
$$

だから

$$
\|u\|_2
\le
(b-a)
\|\nabla u\|_2.
$$

これで $C_c^\infty(\Omega)$ 上の評価が得られました。

次に一般の

$$
u\in H_0^1(\Omega)
$$

を取ります。

定義から

$$
u_n\in C_c^\infty(\Omega)
$$

で

$$
u_n\to u
\quad\text{in }H^1(\Omega)
$$

となる列が存在します。

従って

$$
u_n\to u
\quad\text{in }L^2(\Omega)
$$

かつ

$$
\nabla u_n\to\nabla u
\quad\text{in }L^2(\Omega).
$$

各 $n$ に対して

$$
\|u_n\|_2
\le
(b-a)\|\nabla u_n\|_2.
$$

両辺の極限を取ると

$$
\|u\|_2
\le
(b-a)\|\nabla u\|_2.
$$

よって

$$
\boxed{
\|u\|_2
\le
C_P\|\nabla u\|_2
}
$$

が $C_P=b-a$ で成り立ちます。
<!-- proof-end -->

この証明で境界の正則性を使っていないことは重要です。

Poincaré 不等式のこの版は

$$
H_0^1
=
\overline{C_c^\infty}^{H^1}
$$

という閉包定義だけで動きます。

---

## 5. 勾配だけで $H_0^1$ の大きさを測れる

$H^1$ norm は

$$
\|u\|_{H^1}^2
=
\|u\|_2^2
+
\|\nabla u\|_2^2
$$

でした。

一般の $H^1$ では

$$
\|\nabla u\|_2
$$

は seminorm にすぎません。定数関数の勾配が 0 だからです。

しかし $H_0^1$ では Poincaré 不等式が定数方向を消します。

<a id="cor-gpde4-gradient-norm"></a>

<!-- formal-statement-start -->
> **系（勾配 norm と H^1 norm の同値性）**  
> $\Omega\subset\mathbb R^d$ を有界開集合とする。
>
> $u\in H_0^1(\Omega)$ に対して

$$
\|u\|_{\nabla}
:=
\|\nabla u\|_{L^2(\Omega)}
$$

> と定めると、$\|\cdot\|_{\nabla}$ は $H_0^1(\Omega)$ 上の norm であり、通常の $H^1$ norm と同値である。
>
> 具体的に Poincaré 定数を $C_P$ とすると

$$
\|\nabla u\|_2
\le
\|u\|_{H^1}
\le
\sqrt{1+C_P^2}\,
\|\nabla u\|_2.
$$
<!-- formal-statement-end -->

### 証明の見取り図

左の不等式は $H^1$ norm の定義から直ちに分かります。

右の不等式は

$$
\|u\|_2
\le
C_P\|\nabla u\|_2
$$

を $H^1$ norm へ代入するだけです。

そして

$$
\|\nabla u\|_2=0
$$

なら Poincaré により

$$
\|u\|_2=0
$$

なので、勾配 seminorm は $H_0^1$ 上では本当の norm になります。

<!-- proof-start -->
### 証明

まず

$$
\|\nabla u\|_2^2
\le
\|u\|_2^2+\|\nabla u\|_2^2
=
\|u\|_{H^1}^2.
$$

従って

$$
\|\nabla u\|_2
\le
\|u\|_{H^1}.
$$

一方 [Poincaré 不等式](#thm-gpde4-poincare)から

$$
\|u\|_2^2
\le
C_P^2\|\nabla u\|_2^2.
$$

よって

$$
\|u\|_{H^1}^2
=
\|u\|_2^2+\|\nabla u\|_2^2
\le
(1+C_P^2)\|\nabla u\|_2^2.
$$

平方根を取ると

$$
\|u\|_{H^1}
\le
\sqrt{1+C_P^2}
\|\nabla u\|_2.
$$

最後に

$$
\|\nabla u\|_2=0
$$

とします。

Poincaré により

$$
\|u\|_2
\le
C_P\|\nabla u\|_2
=0.
$$

したがって $u=0$ in $L^2$、すなわち $H_0^1$ の元として $u=0$ です。

よって $\|\nabla u\|_2$ は norm です。
<!-- proof-end -->

GPDE6 以降では

$$
\|u\|_{H_0^1}
:=
\|\nabla u\|_2
$$

と書くことがあります。

これは単なる略記ではありません。

Poincaré 不等式があるからこそ、この量だけで $H_0^1$ の位相を完全に測れます。

---

## 6. trace を理解する前に、一変数では何が起きるか

高次元の一般 trace 定理は、境界の幾何を扱う必要があります。

その前に一変数を完全に閉じます。

区間では

$$
H^1(a,b)
$$

の元は、実は適切な代表元を選べば連続関数になります。

この事実は「一変数だから特別」です。

高次元の $H^1$ で一般に点値が意味を持つ、と誤解してはいけません。

---

## 7. 一変数 $W^{1,1}$ 関数は絶対連続代表元を持つ

<a id="thm-gpde4-w11-ac"></a>

<!-- formal-statement-start -->
> **定理（一変数 W^{1,1} の基本定理）**  
> $I=(a,b)$ を有界開区間とし、$u\in W^{1,1}(I)$ とする。
>
> $g=Du\in L^1(I)$ を弱微分とする。
>
> このとき $u$ の a.e. 同値類には絶対連続な代表元 $\widetilde u$ が存在し、任意の $x,y\in[a,b]$ に対して

$$
\boxed{
\widetilde u(x)-\widetilde u(y)
=
\int_y^x
g(t)\,dt
}
$$

> が成り立つ。
>
> 特に $\widetilde u$ は連続であり、古典微分 $\widetilde u'(x)=g(x)$ が a.e. 成り立つ。
<!-- formal-statement-end -->

ここで「代表元」と言っていることが重要です。

元の $u$ は a.e. 同値類です。

定理は、その同値類の中から絶対連続な関数を一つ選べる、と言っています。

### 証明の見取り図

弱微分 $g$ を一度積分して

$$
F(x)=\int_{x_0}^x g(t)\,dt
$$

と置きます。

$F$ の弱微分は $g$ です。

したがって

$$
D(u-F)=0
$$

です。

残る核心は

$$
Dv=0
\quad\Longrightarrow\quad
v\text{ は a.e. 定数}
$$

です。

これは GPDE2 の mollifier を使うと直接示せます。

$v$ を局所的に平滑化すると、平滑化後の導関数も 0 なので定数になります。mollifier を 0 へ戻せば、元の $v$ も a.e. 定数です。

<!-- proof-start -->
### 証明

$g=Du\in L^1(I)$ とします。

一点 $x_0\in I$ を固定し、

$$
F(x)
=
\int_{x_0}^x g(t)\,dt
$$

と置きます。

$g\in L^1(I)$ なので $F$ は絶対連続で、

$$
F'(x)=g(x)
$$

が a.e. 成り立ちます。

従って $F$ の distribution 微分も $g$ です。

したがって

$$
v:=u-F
$$

と置くと

$$
Dv
=
Du-DF
=
g-g
=
0
$$

が distribution の意味で成り立ちます。

ここで

$$
Dv=0
\Longrightarrow
v\text{ は a.e. 定数}
$$

を示します。

コンパクト区間

$$
J\Subset I
$$

を任意に取ります。

$\operatorname{dist}(J,\partial I)>0$ なので、十分小さい $\varepsilon>0$ に対して局所 mollification

$$
v_\varepsilon
=
\rho_\varepsilon*v
$$

が $J$ 上で定義できます。

GPDE2 で示した弱微分と mollification の交換から

$$
(v_\varepsilon)'
=
(Dv)*\rho_\varepsilon
=
0
$$

です。

$v_\varepsilon$ は滑らかなので、$J$ の各連結成分、ここでは区間 $J$ 全体で定数です。

すなわちある定数 $c_\varepsilon$ が存在して

$$
v_\varepsilon(x)=c_\varepsilon
\qquad
x\in J.
$$

一方 mollifier 近似により

$$
v_\varepsilon\to v
\quad\text{in }L^1(J).
$$

定数関数列 $c_\varepsilon$ が $L^1(J)$ で $v$ へ収束します。したがって

$
|J|\,|c_\varepsilon-c_\delta|
=
\|c_\varepsilon-c_\delta\|_{L^1(J)}
\le
\|c_\varepsilon-v\|_{L^1(J)}
+
\|v-c_\delta\|_{L^1(J)}
\to0.
$

よって $(c_\varepsilon)$ は実数として Cauchy で、ある定数 $c_J$ へ収束します。従って $v=c_J$ が $J$ 上 a.e. 成り立ちます。

$J$ を大きくして互いに重なる区間で覆うと、重なり上で定数値が一致するため、$I$ 全体である一つの定数 $c$ が存在して

$$
v=c
\quad\text{a.e. on }I.
$$

従って

$$
u
=
F+c
\quad\text{a.e.}
$$

です。

そこで

$$
\widetilde u(x)
=
c+\int_{x_0}^x g(t)\,dt
$$

と定めます。

$\widetilde u$ は絶対連続で $u$ と a.e. 等しく、

$$
\widetilde u(x)-\widetilde u(y)
=
\int_y^x g(t)\,dt
$$

を満たします。
<!-- proof-end -->

この定理により、一変数では Sobolev 関数の点値を、任意の代表元ではなく絶対連続代表元から回収できます。

特に

$$
H^1(a,b)
\subset
W^{1,1}(a,b)
$$

です。

実際、有限区間では Cauchy--Schwarz により

$$
\|u\|_{L^1}
\le
\sqrt{b-a}\|u\|_{L^2},
$$

$$
\|u'\|_{L^1}
\le
\sqrt{b-a}\|u'\|_{L^2}.
$$

したがって $H^1$ 関数にも上の絶対連続代表元が存在します。

---

## 8. 区間上の trace は端点値そのものになる

一変数では、絶対連続代表元を使って端点値を定義できます。

ただし「端点値が存在する」だけでは trace として不十分です。

必要なのは、端点値が $H^1$ norm に関して連続に変化することです。

<a id="thm-gpde4-trace-interval"></a>

<!-- formal-statement-start -->
> **定理（区間上の trace 定理）**  
> $L>0$ とし、$u\in H^1(0,L)$ の絶対連続代表元を $\widetilde u$ とする。
>
> 写像

$$
\operatorname{Tr}:
H^1(0,L)
\to
\mathbb R^2,
\qquad
\operatorname{Tr}u
=
\bigl(\widetilde u(0),\widetilde u(L)\bigr)
$$

> は well-defined な有界線形作用素である。
>
> 具体的に

$$
|\widetilde u(0)|^2
+
|\widetilde u(L)|^2
\le
\left(
\frac{4}{L}
+
4L
\right)
\|u\|_{H^1(0,L)}^2
$$

> が成り立つ。
<!-- formal-statement-end -->

### なぜ well-defined なのか

同じ $H^1$ 元を表す二つの絶対連続代表元があるとします。

両者は a.e. 等しいので、その差は連続かつ a.e. 0 です。

連続関数がある点で 0 でなければ、その近傍で絶対値が正になるので正の測度を持つ集合上で 0 でなくなります。

従って差は全点で 0 です。

つまり絶対連続代表元は一意です。

したがって端点値も同値類から一意に定まります。

### 証明の見取り図

任意の $x\in(0,L)$ に対して

$$
\widetilde u(0)
=
\widetilde u(x)
-
\int_0^x
u'(s)\,ds.
$$

二乗して

$$
|a+b|^2
\le
2|a|^2+2|b|^2
$$

と Cauchy--Schwarz を使います。

その後 $x$ について平均を取ると、一点の値が $L^2$ norm と導関数の $L^2$ norm で評価できます。

<!-- proof-start -->
### 証明

前節で $u$ は一意な絶対連続代表元 $\widetilde u$ を持つことを示しました。

$u,v\in H^1(0,L)$ と $a,b\in\mathbb R$ に対し、絶対連続代表元の一意性と

$
a\widetilde u+b\widetilde v
$

が $au+bv$ の絶対連続代表元であることから

$
\operatorname{Tr}(au+bv)
=
a\operatorname{Tr}u+b\operatorname{Tr}v
$

です。従って $\operatorname{Tr}$ は線形です。

有界性を示します。

任意の $x\in(0,L)$ に対し

$$
\widetilde u(0)
=
\widetilde u(x)
-
\int_0^x
u'(s)\,ds.
$$

従って

$$
|\widetilde u(0)|^2
\le
2|\widetilde u(x)|^2
+
2\left|
\int_0^x
u'(s)\,ds
\right|^2.
$$

Cauchy--Schwarz から

$$
\left|
\int_0^x
u'(s)\,ds
\right|^2
\le
x
\int_0^x
|u'(s)|^2\,ds
\le
L
\|u'\|_{L^2(0,L)}^2.
$$

したがって

$$
|\widetilde u(0)|^2
\le
2|\widetilde u(x)|^2
+
2L\|u'\|_2^2.
$$

両辺を $x\in(0,L)$ で積分すると

$$
L|\widetilde u(0)|^2
\le
2\|u\|_2^2
+
2L^2\|u'\|_2^2.
$$

よって

$$
|\widetilde u(0)|^2
\le
\frac{2}{L}\|u\|_2^2
+
2L\|u'\|_2^2.
$$

同様に

$$
\widetilde u(L)
=
\widetilde u(x)
+
\int_x^L
u'(s)\,ds
$$

から

$$
|\widetilde u(L)|^2
\le
\frac{2}{L}\|u\|_2^2
+
2L\|u'\|_2^2.
$$

二つを足すと

$$
|\widetilde u(0)|^2
+
|\widetilde u(L)|^2
\le
\frac{4}{L}\|u\|_2^2
+
4L\|u'\|_2^2.
$$

さらに

$$
\|u\|_2^2
\le
\|u\|_{H^1}^2,
\qquad
\|u'\|_2^2
\le
\|u\|_{H^1}^2
$$

なので

$$
|\widetilde u(0)|^2
+
|\widetilde u(L)|^2
\le
\left(
\frac{4}{L}+4L
\right)
\|u\|_{H^1}^2.
$$

従って $\operatorname{Tr}$ は有界です。
<!-- proof-end -->

### 直接例：affine 関数

$$
u(x)=2x-1
\qquad
0<x<1
$$

なら

$$
u\in H^1(0,1),
\qquad
u'=2.
$$

絶対連続代表元は同じ式であり、

$$
\operatorname{Tr}u
=
(-1,1).
$$

したがって

$$
u\notin H_0^1(0,1)
$$

であることが後の kernel 特徴付けから分かります。

---

## 9. 区間では $H_0^1$ と zero trace が完全に一致する

高次元へ進む前に、区間ではこの同一視を完全証明します。

<a id="thm-gpde4-h01-trace-kernel-interval"></a>

<!-- formal-statement-start -->
> **定理（区間上の H_0^1 と zero trace）**  
> $L>0$ とする。
>
> このとき

$$
\boxed{
H_0^1(0,L)
=
\left\{
u\in H^1(0,L):
\operatorname{Tr}u=(0,0)
\right\}
}
$$

> が成り立つ。
<!-- formal-statement-end -->

### 証明の見取り図

包含

$$
H_0^1
\subset
\ker\operatorname{Tr}
$$

は trace の連続性だけで出ます。

$C_c^\infty(0,L)$ の関数は端点付近で 0 なので trace は 0 です。それを $H^1$ 極限へ移します。

逆向きは少し重要です。

zero trace を持つ $u$ は端点近くで

$$
u(x)
=
\int_0^x u'(s)\,ds
$$

と書けます。

この積分表示により、端点近くを cutoff しても $H^1$ 誤差が小さくなることを示せます。

cutoff 後は台が境界から離れるので、GPDE3 の mollifier で $C_c^\infty$ に近似できます。

<!-- proof-start -->
### 証明

まず

$$
u\in H_0^1(0,L)
$$

とします。

定義から

$$
\varphi_n\in C_c^\infty(0,L)
$$

で

$$
\varphi_n\to u
\quad\text{in }H^1(0,L)
$$

となる列が存在します。

各 $\varphi_n$ は端点の近傍で 0 なので

$$
\operatorname{Tr}\varphi_n=(0,0).
$$

区間 trace の連続性から

$$
\operatorname{Tr}\varphi_n
\to
\operatorname{Tr}u
\quad\text{in }\mathbb R^2.
$$

左辺は常に $(0,0)$ なので

$$
\operatorname{Tr}u=(0,0).
$$

従って

$$
H_0^1(0,L)
\subset
\ker\operatorname{Tr}.
$$

逆に

$$
u\in H^1(0,L),
\qquad
\operatorname{Tr}u=(0,0)
$$

とします。

絶対連続代表元を同じ記号 $u$ で表します。

すると

$$
u(0)=u(L)=0.
$$

$0<\varepsilon<L/8$ に対して、滑らかな cutoff $\chi_\varepsilon$ を

$$
0\le\chi_\varepsilon\le1,
$$

$$
\chi_\varepsilon=0
\quad\text{on }
(0,\varepsilon)\cup(L-\varepsilon,L),
$$

$$
\chi_\varepsilon=1
\quad\text{on }
(2\varepsilon,L-2\varepsilon),
$$

$$
|\chi_\varepsilon'|
\le
\frac{C}{\varepsilon}
$$

となるように取ります。

まず

$$
(1-\chi_\varepsilon)u
$$

は端点から距離 $2\varepsilon$ 以内でしか非零になりません。

$u\in L^2$ なので積分の絶対連続性から

$$
\|(1-\chi_\varepsilon)u\|_2
\to0.
$$

微分は

$$
D\bigl((1-\chi_\varepsilon)u\bigr)
=
(1-\chi_\varepsilon)u'
-
\chi_\varepsilon'u.
$$

第一項は $u'\in L^2$ と積分の絶対連続性から

$$
\|(1-\chi_\varepsilon)u'\|_2
\to0.
$$

残る cutoff 微分項を評価します。

左端では $u(0)=0$ なので

$$
u(x)
=
\int_0^x
u'(s)\,ds.
$$

Cauchy--Schwarz から

$$
|u(x)|^2
\le
x
\int_0^x
|u'(s)|^2\,ds.
$$

$x\le2\varepsilon$ なら

$$
|u(x)|^2
\le
x
\int_0^{2\varepsilon}
|u'(s)|^2\,ds.
$$

したがって

$$
\int_0^{2\varepsilon}
|\chi_\varepsilon'(x)u(x)|^2\,dx
\le
\frac{C^2}{\varepsilon^2}
\int_0^{2\varepsilon}
x\,dx
\int_0^{2\varepsilon}
|u'(s)|^2\,ds.
$$

ここで

$$
\int_0^{2\varepsilon}x\,dx
=
2\varepsilon^2.
$$

よって

$$
\int_0^{2\varepsilon}
|\chi_\varepsilon'u|^2
\le
2C^2
\int_0^{2\varepsilon}
|u'|^2
\to0.
$$

右端も

$$
u(x)
=
-\int_x^L
u'(s)\,ds
$$

を使えば同様です。

従って

$$
\|\chi_\varepsilon u-u\|_{H^1(0,L)}
\to0.
$$

固定した $\varepsilon$ に対し、$\chi_\varepsilon u$ は

$$
[\varepsilon,L-\varepsilon]
$$

の内部に台を持ちます。

これを $\mathbb R$ へ 0 で延長し、半径

$$
\delta<\frac{\varepsilon}{2}
$$

の mollifier で平滑化します。

GPDE3 の局所 mollification から、$\delta\to0$ で

$$
\rho_\delta*(\chi_\varepsilon u)
\to
\chi_\varepsilon u
\quad\text{in }H^1.
$$

しかも $\delta<\varepsilon/2$ なら convolution 後の台も $(0,L)$ の内部に残るため

$$
\rho_\delta*(\chi_\varepsilon u)
\in
C_c^\infty(0,L).
$$

まず $\varepsilon$ を小さくし、その後 $\delta$ を小さく取る対角列を選べば、

$$
C_c^\infty(0,L)
$$

の列で $u$ を $H^1$ 近似できます。

従って

$$
u\in H_0^1(0,L).
$$

以上から

$$
H_0^1(0,L)
=
\ker\operatorname{Tr}.
$$
<!-- proof-end -->

この証明は、zero trace が単なる記号ではなく

$$
\text{境界層を切り落としても }H^1\text{ 誤差が消える}
$$

という近似機構を持つことを示しています。

---

## 10. 直接例：$x(1-x)$ は $H_0^1(0,1)$ に入る

$$
u(x)=x(1-x)
$$

とします。

これは

$$
u\in H^1(0,1)
$$

であり、絶対連続代表元は通常の多項式そのものです。

したがって

$$
\operatorname{Tr}u
=
(u(0),u(1))
=
(0,0).
$$

前節の[区間版 kernel 特徴付け](#thm-gpde4-h01-trace-kernel-interval)から

$$
\boxed{
x(1-x)\in H_0^1(0,1)
}
$$

です。

ここで重要なのは

$$
x(1-x)\notin C_c^\infty(0,1)
$$

であることです。

台の閉包は $[0,1]$ なので、$(0,1)$ にコンパクトに含まれていません。

それでも $H_0^1$ には入ります。

つまり

$$
C_c^\infty
\subsetneq
H_0^1
$$

であり、閉包を取る意味があります。

---

## 11. 高次元では境界の形が重要になる

一変数では境界は二点だけでした。

高次元では $\partial\Omega$ は $(d-1)$ 次元の集合であり、局所的な形が trace の構成に影響します。

境界を局所的に一様な Lipschitz graph として表せると、境界近くを

$$
\text{横方向 }x'
+
\text{法線方向に近い一方向}
$$

へ分解し、一変数の評価を各断面に適用できます。

その標準仮定が Lipschitz 境界です。

<a id="def-gpde4-lipschitz-domain"></a>

<!-- formal-statement-start -->
> **定義（bounded Lipschitz domain）**  
> 有界開集合 $\Omega\subset\mathbb R^d$ が bounded Lipschitz domain であるとは、各境界点 $x_0\in\partial\Omega$ に対して近傍 $U$ と剛体変換後の座標
>
> $$
> x=(x',x_d)
> $$
>
> を取り、ある Lipschitz 関数
>
> $$
> \gamma:\mathbb R^{d-1}\to\mathbb R
> $$
>
> を用いて $U$ 内で

$$
\Omega
=
\{(x',x_d)\in U:
x_d>\gamma(x')\}
$$

> の形に表せることをいう。
<!-- formal-statement-end -->

<!-- definition-example-start: def-gpde4-lipschitz-domain -->
**定義の確認**

長方形

$$
\Omega=(0,1)^d
$$

を考えます。

面の内部では境界は

$$
x_d=0
$$

のような定数関数のグラフです。

角の近くでも座標を適切に回転すれば、領域は有限個の Lipschitz graph patch で表せます。

したがって立方体・直方体は bounded Lipschitz domain です。

一方、極端な cusp を持つ領域では、境界を一様な Lipschitz graph として表せないことがあります。その場合、以下の trace 定理を同じ形で無条件に使ってはいけません。
<!-- definition-example-end -->

Lipschitz とは「微分可能」を要求していません。

境界に角があってもよいので、多角形・多面体は FEM でも重要な代表例です。

---

## 12. 高次元の trace を構成する

<a id="thm-gpde4-trace-lipschitz"></a>

<!-- formal-statement-start -->
> **定理（bounded Lipschitz domain 上の trace）**  
> $\Omega\subset\mathbb R^d$ を bounded Lipschitz domain とする。
>
> このとき一意な有界線形作用素

$$
\operatorname{Tr}:
H^1(\Omega)
\to
L^2(\partial\Omega)
$$

> が存在し、$\overline\Omega$ の近傍で滑らかな関数 $u$ に対しては通常の境界制限と一致する。
>
> すなわち、ある定数 $C_{\mathrm{tr}}>0$ が存在して

$$
\boxed{
\|\operatorname{Tr}u\|_{L^2(\partial\Omega)}
\le
C_{\mathrm{tr}}
\|u\|_{H^1(\Omega)}
}
$$

> が全ての $u\in H^1(\Omega)$ に対して成り立つ。
<!-- formal-statement-end -->

### 何を言っているのか

この定理は「$H^1$ 関数が境界上で点wise連続になる」と言っているのではありません。

内部の a.e. 同値類から

$$
\operatorname{Tr}u
$$

という境界上の $L^2$ 同値類を連続的に取り出せる、と言っています。

また

$$
\operatorname{Tr}:
H^1(\Omega)
\to
L^2(\partial\Omega)
$$

と書けるからといって、任意の $L^2(\partial\Omega)$ データが trace として実現できるわけではありません。

実際の range はより正則な境界空間で記述され、標準的には $H^{1/2}(\partial\Omega)$ が現れます。本系列では分数階 Sobolev 空間をまだ導入していないので、ここでは必要な

$$
H^1(\Omega)\to L^2(\partial\Omega)
$$

の連続性だけを使います。

### 証明の核心：局所的には一変数評価

境界 patch を

$$
x_d=\gamma(x')
$$

と書き、領域がその上側

$$
x_d>\gamma(x')
$$

にあるとします。

滑らかな $u$ に対し、固定した $x'$ で

$$
s\mapsto
u(x',\gamma(x')+s)
$$

を一変数関数として見ます。

高さ $h>0$ の細い cylinder が patch 内に入るように取れば、一変数の trace 評価から

$$
|u(x',\gamma(x'))|^2
\le
\frac{2}{h}
\int_0^h
|u(x',\gamma(x')+s)|^2\,ds
+
2h
\int_0^h
|\partial_du(x',\gamma(x')+s)|^2\,ds.
$$

これを $x'$ で積分します。

ここで Lipschitz graph の parametrization に対する標準的な表面測度表示を black-box package の一部として使い、graph 上では

$
dS
=
\sqrt{1+|\nabla\gamma(x')|^2}\,dx'
$

と表され、その係数は $\gamma$ の Lipschitz 定数だけで一様に制御されます。

よって局所的に

$$
\|u\|_{L^2(\partial\Omega\cap U)}^2
\le
C
\left(
\|u\|_{L^2(\Omega\cap U')}^2
+
\|\nabla u\|_{L^2(\Omega\cap U')}^2
\right)
$$

が得られます。

有限個の境界 patch を足せば全境界の評価になります。

### この章での意図的黒箱

一般 Lipschitz domain について chart の貼り合わせまで完全に構成するには、次の補助理論が必要です。

- compact な境界を有限個の Lipschitz graph chart で覆い、smooth partition of unity で局所化すること。
- Lipschitz graph 上の表面測度を chart 座標で積分し、その Jacobian を Lipschitz 定数で制御する面積公式。
- bounded Lipschitz domain に対する $H^1$ extension と、それを用いた「境界まで滑らかな関数」の $H^1$ density。
- zero trace の関数を境界層 cutoff / inward shift で内部支持関数へ近似できること。

これらを本章では **Lipschitz boundary package** と呼び、幾何測度論と extension operator の構成部分だけを意図的黒箱とします。

黒箱にしているのは「どの局所 chart をどう貼るか」という技術部分です。trace estimate の解析核心である

$
\text{一変数の端点評価}
\to
\text{境界 graph に沿った積分}
$

は本文で計算し、区間上の zero-trace characterization は完全証明しています。

<!-- proof-start -->
### 証明

まず $\overline\Omega$ の近傍で滑らかな $u$ に対して評価を示します。

$\partial\Omega$ は compact なので、有限個の Lipschitz graph patch

$$
U_1,\ldots,U_N
$$

で覆えます。

各 patch では剛体変換後、

$$
\partial\Omega\cap U_j
=
\{(x',\gamma_j(x'))\}
$$

かつ局所的に

$$
\Omega\cap U_j
=
\{x_d>\gamma_j(x')\}\cap U_j
$$

と書けます。

patch を少し小さく取り、ある $h_j>0$ に対して

$$
(x',\gamma_j(x')+s)
\in\Omega
\qquad
0<s<h_j
$$

となる cylinder 部分を確保します。

固定した $x'$ に対し

$$
v_{x'}(s)
=
u(x',\gamma_j(x')+s)
$$

と置きます。

一変数の評価から

$$
|v_{x'}(0)|^2
\le
\frac{2}{h_j}
\int_0^{h_j}
|v_{x'}(s)|^2\,ds
+
2h_j
\int_0^{h_j}
|v_{x'}'(s)|^2\,ds.
$$

ここで

$$
v_{x'}'(s)
=
\partial_du(x',\gamma_j(x')+s).
$$

したがって

$$
|u(x',\gamma_j(x'))|^2
\le
\frac{2}{h_j}
\int_0^{h_j}
|u(x',\gamma_j(x')+s)|^2\,ds
+
2h_j
\int_0^{h_j}
|\partial_du(x',\gamma_j(x')+s)|^2\,ds.
$$

$\gamma_j$ の Lipschitz 定数を $M_j$ とすると

$$
\sqrt{1+|\nabla\gamma_j|^2}
\le
\sqrt{1+M_j^2}
$$

が a.e. 成り立ちます。

従って $x'$ で積分し、座標変換の Jacobian が剛体変換では 1 であることを使うと

$$
\|u\|_{L^2(\partial\Omega\cap U_j)}^2
\le
C_j
\left(
\|u\|_{L^2(\Omega\cap U_j')}^2
+
\|\nabla u\|_{L^2(\Omega\cap U_j')}^2
\right)
$$

を得ます。

有限個の patch の和を取り、境界から離れた部分は trace に寄与しないので、

$$
\|u|_{\partial\Omega}\|_{L^2(\partial\Omega)}
\le
C_{\mathrm{tr}}
\|u\|_{H^1(\Omega)}
$$

が滑らかな $u$ に対して成り立ちます。

ここで上で明示した Lipschitz boundary package の extension / density 部分により、任意の $u\in H^1(\Omega)$ に対して境界まで滑らかな $u_n$ を

$$
u_n\to u
\quad\text{in }H^1(\Omega)
$$

となるよう取れます。

上の評価から

$$
\|u_n|_{\partial\Omega}
-
u_m|_{\partial\Omega}\|_{L^2(\partial\Omega)}
\le
C_{\mathrm{tr}}
\|u_n-u_m\|_{H^1(\Omega)}.
$$

従って

$$
u_n|_{\partial\Omega}
$$

は $L^2(\partial\Omega)$ の Cauchy 列です。

$L^2(\partial\Omega)$ の完備性から極限が存在するので、

$$
\operatorname{Tr}u
:=
\lim_{n\to\infty}
u_n|_{\partial\Omega}
$$

と定めます。

別の近似列を使っても、二つの近似列の差へ同じ trace estimate を適用すれば極限は同じです。

したがって $\operatorname{Tr}$ は well-defined です。

線形性は近似列から従い、極限を取ることで

$$
\|\operatorname{Tr}u\|_{L^2(\partial\Omega)}
\le
C_{\mathrm{tr}}
\|u\|_{H^1(\Omega)}
$$

も得られます。

滑らかな $u$ に対しては定義が通常の境界制限そのものなので、延長は一意です。
<!-- proof-end -->

Lipschitz 仮定が働いた場所は二つです。

1. 境界を graph として表し、一変数の断面評価を使えること。
2. 滑らかな近似を境界まで運ぶ extension / density machinery を使えること。

「十分良い領域なら trace がある」とだけ覚えるのではなく、どの機構に領域仮定が必要なのかを押さえてください。

---

## 13. 一般領域で零境界条件を trace で特徴付ける

<a id="thm-gpde4-h01-trace-kernel"></a>

<!-- formal-statement-start -->
> **定理（H_0^1 と zero trace の同一視）**  
> $\Omega\subset\mathbb R^d$ を bounded Lipschitz domain とする。
>
> このとき

$$
\boxed{
H_0^1(\Omega)
=
\left\{
u\in H^1(\Omega):
\operatorname{Tr}u=0
\text{ in }L^2(\partial\Omega)
\right\}
}
$$

> が成り立つ。
<!-- formal-statement-end -->

### 片方の包含はすぐに証明できる

$u\in H_0^1$ なら

$$
\varphi_n\in C_c^\infty(\Omega),
\qquad
\varphi_n\to u
\quad\text{in }H^1
$$

となる列があります。

各 $\varphi_n$ は境界近くで 0 なので

$$
\operatorname{Tr}\varphi_n=0.
$$

trace の連続性から

$$
\operatorname{Tr}u=0.
$$

従って

$$
H_0^1(\Omega)
\subset
\ker\operatorname{Tr}.
$$

### 逆包含の機構

逆向きは区間の場合と同じ発想です。

zero trace を持つ関数を境界 chart ごとに局所化し、

- 境界 graph に沿う方向と内向き方向へ分ける。
- 内向きに少し押し込む、または境界層 cutoff を掛ける。
- zero trace により、その操作の $H^1$ 誤差が 0 へ行く。
- 境界から正の距離を持つようになった後で mollify する。

という手順で $C_c^\infty(\Omega)$ へ近似します。

区間で完全証明した cutoff estimate が、この高次元構成の法線方向の核心です。

一般 Lipschitz chart を貼り合わせる technical step は前節と同じ Lipschitz extension / density package に含めます。

<!-- proof-start -->
### 証明

まず

$$
u\in H_0^1(\Omega)
$$

とします。

定義から

$$
\varphi_n\in C_c^\infty(\Omega),
\qquad
\varphi_n\to u
\quad\text{in }H^1(\Omega).
$$

各 $\varphi_n$ は $\partial\Omega$ の近傍で 0 なので

$$
\operatorname{Tr}\varphi_n=0.
$$

trace の有界性から

$$
\|\operatorname{Tr}u\|_{L^2(\partial\Omega)}
=
\|\operatorname{Tr}(u-\varphi_n)\|_{L^2(\partial\Omega)}
\le
C_{\mathrm{tr}}
\|u-\varphi_n\|_{H^1(\Omega)}
\to0.
$$

従って

$$
\operatorname{Tr}u=0.
$$

これで

$$
H_0^1(\Omega)
\subset
\ker\operatorname{Tr}
$$

が示されました。

逆に

$$
u\in H^1(\Omega),
\qquad
\operatorname{Tr}u=0
$$

とします。

bounded Lipschitz domain の有限 chart と partition of unity を取り、$u$ を境界 patch ごとの局所成分と内部成分へ分解します。

内部成分はすでに境界から正の距離を持つため、GPDE3 の mollification で $C_c^\infty(\Omega)$ 近似できます。

境界成分については各 chart を

$$
\Omega
=
\{x_d>\gamma(x')\}
$$

の形へ直します。

$\operatorname{Tr}u=0$ なので、各法線方向断面に対する境界値は $L^2$ の意味で 0 です。

区間の場合の

$$
u(x)
=
\int_0^x u'(s)\,ds
$$

に対応する一方向評価を使うと、厚さ $\varepsilon$ の境界層を cutoff したときの

$$
H^1
$$

誤差が $\varepsilon\to0$ で 0 へ収束します。

cutoff 後の各局所成分は境界から正の距離を持つので、十分小さい半径で mollify しても台は $\Omega$ の内部に残ります。

有限個の局所近似を partition of unity で足し合わせると、

$$
\psi_n\in C_c^\infty(\Omega)
$$

で

$$
\psi_n\to u
\quad\text{in }H^1(\Omega)
$$

となる列を得ます。

従って

$$
u\in H_0^1(\Omega).
$$

よって

$$
\ker\operatorname{Tr}
\subset
H_0^1(\Omega).
$$

以上から

$$
H_0^1(\Omega)
=
\ker\operatorname{Tr}.
$$

逆包含の chart の貼り合わせと境界層近似の一般形は、本章で明示した Lipschitz boundary package の範囲とします。とくに「zero trace なら境界層 cutoff の $H^1$ 誤差が消える」という高次元化を黒箱補題として使っています。区間での完全な cutoff 計算がその解析核心です。
<!-- proof-end -->

これで

$$
u=0\quad\text{on }\partial\Omega
$$

を Sobolev 空間で正確に読む準備ができました。

bounded Lipschitz domain では

$$
\boxed{
u\in H_0^1(\Omega)
\quad\Longleftrightarrow\quad
u\in H^1(\Omega)
\text{ and }
\operatorname{Tr}u=0
}
$$

です。

---

## 14. pointwise zero・zero trace・平均 zero は別物

境界条件と Poincaré を使うとき、三つを混同しないことが重要です。

### 14.1 pointwise zero

古典的な連続関数なら

$$
u(x)=0
\qquad
x\in\partial\Omega
$$

と書けます。

しかし一般の $H^1$ 元には、この点wise表現をそのまま使えません。

### 14.2 zero trace

bounded Lipschitz domain では

$$
\operatorname{Tr}u=0
$$

が Sobolev の零 Dirichlet 条件です。

これは

$$
u\in H_0^1(\Omega)
$$

と同値です。

### 14.3 平均 zero

別の Poincaré 型不等式では

$$
u_\Omega
:=
\frac1{|\Omega|}
\int_\Omega u\,dx
=
0
$$

を課します。

この条件は定数方向を除くという目的では似ていますが、境界値 0 とは違います。

たとえば $(0,1)$ で

$$
u(x)=x-\frac12
$$

は平均 0 ですが、

$$
\operatorname{Tr}u
=
\left(
-\frac12,
\frac12
\right)
$$

なので

$$
u\notin H_0^1(0,1).
$$

条件が違えば使える Poincaré 不等式も違います。

---

## 15. 非零 Dirichlet 条件は affine space として読む

境界データが 0 でない場合

$$
u=g
\quad\text{on }\partial\Omega
$$

を考えたいことがあります。

$g$ 自体を内部の関数として扱うのではなく、ある

$$
w\in H^1(\Omega)
$$

で

$$
\operatorname{Tr}w=g
$$

を満たすものが取れたとします。

すると同じ境界データを持つ $u$ は

$$
\operatorname{Tr}(u-w)=0
$$

なので

$$
u-w\in H_0^1(\Omega).
$$

従って

$$
\boxed{
\{u\in H^1(\Omega):\operatorname{Tr}u=g\}
=
w+H_0^1(\Omega)
}
$$

です。

零境界条件は線形部分空間 $H_0^1$ を作り、非零境界条件はその平行移動を作ります。

この見方は GPDE6 の弱形式でそのまま使います。

---

## 16. ここまでの依存鎖

本章の流れをまとめると、

$$
H_0^1
=
\overline{C_c^\infty}^{H^1}
$$

から始まり、

$$
\text{zero boundary approximation}
\Longrightarrow
\text{Poincaré}
$$

によって

$$
\|u\|_2
\lesssim
\|\nabla u\|_2
$$

を得ます。

その結果

$$
\|u\|_{H^1}
\asymp
\|\nabla u\|_2
\qquad
u\in H_0^1
$$

となります。

一方、一変数の弱微分を積分し直すことで trace の原型を完全に構成し、bounded Lipschitz domain では

$$
H_0^1(\Omega)
=
\ker\operatorname{Tr}
$$

と読み替えられます。

最終的に

$$
\boxed{
\text{零 Dirichlet 条件}
=
\text{trace zero}
=
H_0^1
}
$$

という関数空間の言葉が手に入りました。

GPDE6 ではこの空間を使って Poisson 方程式を

$$
\int_\Omega
\nabla u\cdot\nabla v\,dx
=
\langle f,v\rangle
$$

という変分形式へ変換します。

ただしその前に GPDE5 で Sobolev embedding と compactness を扱い、

$$
\text{bounded sequence}
\to
\text{convergent subsequence}
$$

を作る道具を整えます。

---

# 演習

## GPDE4-A01 $x(1-x)$ の $H_0^1$ membership

- Level: A
- 目安時間: 8分

$u(x)=x(1-x)$ を $(0,1)$ 上で考える。

1. $u\in H^1(0,1)$ を確認せよ。
2. $\operatorname{Tr}u$ を求めよ。
3. $u\in H_0^1(0,1)$ を結論せよ。

<!-- solution-start -->
### 詳細解答

まず

$$
u(x)=x-x^2
$$

なので

$$
u'(x)=1-2x.
$$

$u$ と $u'$ はともに $(0,1)$ 上で有界だから

$$
u,u'\in L^2(0,1).
$$

従って

$$
u\in H^1(0,1).
$$

多項式は連続なので絶対連続代表元は同じ式です。

端点で

$$
u(0)=0,
\qquad
u(1)=0.
$$

従って

$$
\operatorname{Tr}u=(0,0).
$$

区間上の特徴付け

$$
H_0^1(0,1)
=
\ker\operatorname{Tr}
$$

から

$$
\boxed{
u\in H_0^1(0,1)
}
$$

です。

なお $u$ 自身は $C_c^\infty(0,1)$ ではありません。$H_0^1$ が閉包として $C_c^\infty$ より広いことも確認できます。
<!-- solution-end -->

## GPDE4-A02 区間上の Poincaré 不等式

- Level: A
- 目安時間: 10分

$u\in C_c^\infty(0,L)$ とする。

$$
\|u\|_{L^2(0,L)}
\le
L\|u'\|_{L^2(0,L)}
$$

を示せ。

<!-- solution-start -->
### 詳細解答

$u$ は 0 の近傍で 0 なので

$$
u(0)=0.
$$

従って任意の $x\in(0,L)$ に対し

$$
u(x)
=
\int_0^x
u'(s)\,ds.
$$

Cauchy--Schwarz により

$$
|u(x)|^2
\le
x
\int_0^x
|u'(s)|^2\,ds.
$$

ここで

$$
x\le L
$$

かつ

$$
\int_0^x|u'|^2
\le
\int_0^L|u'|^2
=
\|u'\|_2^2
$$

だから

$$
|u(x)|^2
\le
L\|u'\|_2^2.
$$

$x\in(0,L)$ で積分すると

$$
\|u\|_2^2
=
\int_0^L|u(x)|^2\,dx
\le
L^2\|u'\|_2^2.
$$

平方根を取って

$$
\boxed{
\|u\|_2
\le
L\|u'\|_2
}
$$

を得ます。
<!-- solution-end -->

## GPDE4-A03 なぜ全 $H^1$ では勾配だけで制御できないか

- Level: A
- 目安時間: 5分

$|\Omega|>0$ で有限測度の開集合 $\Omega$ を考える。

全ての $u\in H^1(\Omega)$ に対して

$$
\|u\|_2
\le
C\|\nabla u\|_2
$$

が成立する有限定数 $C$ は存在しないことを示せ。

<!-- solution-start -->
### 詳細解答

定数関数

$$
u(x)=1
$$

を取ります。

有限測度なので

$$
u\in L^2(\Omega).
$$

弱微分は

$$
\nabla u=0.
$$

従って

$$
u\in H^1(\Omega).
$$

しかし

$$
\|u\|_2
=
\left(
\int_\Omega1\,dx
\right)^{1/2}
=
|\Omega|^{1/2}
>0,
$$

一方

$$
\|\nabla u\|_2=0.
$$

したがって不等式を仮定すると

$$
|\Omega|^{1/2}
\le
C\cdot0
=
0
$$

となり矛盾します。

壊れている機構は「勾配が定数方向を検出できない」ことです。

$H_0^1$ では零境界条件が非零定数を排除するため、Poincaré 不等式が成立します。
<!-- solution-end -->

## GPDE4-A04 affine 関数の trace

- Level: A
- 目安時間: 8分

$$
u(x)=ax+b
$$

を $(0,L)$ 上で考える。

1. $\operatorname{Tr}u$ を求めよ。
2. $u\in H_0^1(0,L)$ となる $a,b$ を全て求めよ。

<!-- solution-start -->
### 詳細解答

affine 関数は滑らかなので

$$
u\in H^1(0,L).
$$

端点値は

$$
u(0)=b,
$$

$$
u(L)=aL+b.
$$

従って

$$
\boxed{
\operatorname{Tr}u
=
(b,aL+b)
}
$$

です。

区間上では

$$
u\in H_0^1(0,L)
\quad\Longleftrightarrow\quad
\operatorname{Tr}u=(0,0).
$$

したがって

$$
b=0,
$$

$$
aL+b=0.
$$

$b=0$ を代入すると

$$
aL=0.
$$

$L>0$ なので

$$
a=0.
$$

よって affine 関数のうち $H_0^1(0,L)$ に入るのは

$$
\boxed{
u\equiv0
}
$$

だけです。
<!-- solution-end -->

## GPDE4-B01 $H_0^1$ の完備性を勾配 norm で読み直す

- Level: B
- 目安時間: 15分

$\Omega$ を有界開集合とする。

$(u_n)$ が

$$
\|u\|_{\nabla}
=
\|\nabla u\|_2
$$

に関して $H_0^1(\Omega)$ の Cauchy 列であるとする。

$(u_n)$ が通常の $H^1$ norm でも Cauchy であり、ある $u\in H_0^1(\Omega)$ へ勾配 norm で収束することを示せ。

<!-- solution-start -->
### 詳細解答

[Poincaré 不等式](#thm-gpde4-poincare)により、任意の $v\in H_0^1(\Omega)$ に対して

$$
\|v\|_{H^1}
\le
\sqrt{1+C_P^2}
\|\nabla v\|_2.
$$

$v=u_n-u_m$ と置くと

$$
\|u_n-u_m\|_{H^1}
\le
\sqrt{1+C_P^2}
\|\nabla u_n-\nabla u_m\|_2.
$$

仮定から右辺は $n,m\to\infty$ で 0 へ収束します。

従って $(u_n)$ は $H^1$ norm でも Cauchy です。

$H_0^1(\Omega)$ は $H^1(\Omega)$ の閉部分空間で完備なので、ある

$$
u\in H_0^1(\Omega)
$$

が存在して

$$
u_n\to u
\quad\text{in }H^1.
$$

特に

$$
\nabla u_n\to\nabla u
\quad\text{in }L^2.
$$

したがって

$$
\|u_n-u\|_{\nabla}
=
\|\nabla u_n-\nabla u\|_2
\to0.
$$

つまり勾配 norm でも $H_0^1$ は完備です。

ここで Poincaré 不等式が、勾配 Cauchy から関数自身の $L^2$ Cauchy まで回収する役割を果たしています。
<!-- solution-end -->

## GPDE4-B02 区間で zero trace から境界層 cutoff を正当化する

- Level: B
- 目安時間: 20分

$u\in H^1(0,1)$ が

$$
\operatorname{Tr}u=(0,0)
$$

を満たすとする。

$0<\varepsilon<1/8$ に対して

$$
0\le\chi_\varepsilon\le1,
$$

$$
\chi_\varepsilon=0
\quad\text{on }
(0,\varepsilon)\cup(1-\varepsilon,1),
$$

$$
\chi_\varepsilon=1
\quad\text{on }
(2\varepsilon,1-2\varepsilon),
$$

$$
|\chi_\varepsilon'|
\le
C/\varepsilon
$$

を満たす smooth cutoff を取る。

$$
\chi_\varepsilon u\to u
\quad\text{in }H^1(0,1)
$$

を示せ。

<!-- solution-start -->
### 詳細解答

絶対連続代表元を同じ記号 $u$ で表します。

trace が 0 なので

$$
u(0)=u(1)=0.
$$

まず

$$
(1-\chi_\varepsilon)u
$$

は端点から距離 $2\varepsilon$ 以内でしか非零ではありません。

$u\in L^2(0,1)$ なので

$$
\|(1-\chi_\varepsilon)u\|_2
\to0.
$$

次に

$$
D(\chi_\varepsilon u-u)
=
(\chi_\varepsilon-1)u'
+
\chi_\varepsilon'u.
$$

第一項は $u'\in L^2$ だから

$$
\|(\chi_\varepsilon-1)u'\|_2
\to0.
$$

第二項を左端で評価します。

$u(0)=0$ なので

$$
u(x)=\int_0^x u'(s)\,ds.
$$

Cauchy--Schwarz により

$$
|u(x)|^2
\le
x
\int_0^x|u'(s)|^2\,ds.
$$

$0<x<2\varepsilon$ では

$$
|u(x)|^2
\le
x
\int_0^{2\varepsilon}|u'(s)|^2\,ds.
$$

従って

$$
\int_0^{2\varepsilon}
|\chi_\varepsilon'u|^2dx
\le
\frac{C^2}{\varepsilon^2}
\int_0^{2\varepsilon}
x\,dx
\int_0^{2\varepsilon}|u'|^2ds.
$$

$$
\int_0^{2\varepsilon}x\,dx
=
2\varepsilon^2
$$

なので

$$
\int_0^{2\varepsilon}
|\chi_\varepsilon'u|^2dx
\le
2C^2
\int_0^{2\varepsilon}|u'|^2ds
\to0.
$$

右端では

$$
u(x)
=
-\int_x^1u'(s)\,ds
$$

を使って同じ評価が得られます。

したがって

$$
\|\chi_\varepsilon'u\|_2
\to0.
$$

以上を合わせると

$$
\|\chi_\varepsilon u-u\|_{H^1}
\to0.
$$

zero trace が cutoff の微分

$$
\chi_\varepsilon'
\sim
\varepsilon^{-1}
$$

による発散を、端点近くの $u$ の小ささで打ち消しています。
<!-- solution-end -->

## GPDE4-B03 長方形で trace estimate を作る

- Level: B
- 目安時間: 20分

$$
\Omega
=
D\times(0,h),
\qquad
D\subset\mathbb R^{d-1}
$$

とし、$u\in C^1(\overline\Omega)$ とする。

下面

$$
\Gamma=D\times\{0\}
$$

に対して

$$
\|u|_\Gamma\|_{L^2(\Gamma)}^2
\le
\frac{2}{h}
\|u\|_{L^2(\Omega)}^2
+
2h
\|\partial_du\|_{L^2(\Omega)}^2
$$

を示せ。

<!-- solution-start -->
### 詳細解答

$x'\in D$ を固定します。

任意の $t\in(0,h)$ に対して

$$
u(x',0)
=
u(x',t)
-
\int_0^t
\partial_du(x',s)\,ds.
$$

従って

$$
|u(x',0)|^2
\le
2|u(x',t)|^2
+
2\left|
\int_0^t
\partial_du(x',s)\,ds
\right|^2.
$$

Cauchy--Schwarz から

$$
\left|
\int_0^t
\partial_du(x',s)\,ds
\right|^2
\le
t
\int_0^t
|\partial_du(x',s)|^2\,ds.
$$

$t\le h$ なので

$$
|u(x',0)|^2
\le
2|u(x',t)|^2
+
2h
\int_0^h
|\partial_du(x',s)|^2\,ds.
$$

$t\in(0,h)$ で積分すると

$$
h|u(x',0)|^2
\le
2\int_0^h|u(x',t)|^2dt
+
2h^2
\int_0^h
|\partial_du(x',s)|^2ds.
$$

$h$ で割って

$$
|u(x',0)|^2
\le
\frac2h
\int_0^h|u(x',t)|^2dt
+
2h
\int_0^h
|\partial_du(x',s)|^2ds.
$$

最後に $x'\in D$ で積分すると

$$
\int_D|u(x',0)|^2dx'
\le
\frac2h
\int_D\int_0^h|u|^2dt\,dx'
+
2h
\int_D\int_0^h|\partial_du|^2ds\,dx'.
$$

[Fubini の定理](../F0_00D2C_積測度_Tonelli_Fubini/index.md#thm-f0-00d2c-02)により

$$
\boxed{
\|u|_\Gamma\|_{L^2(\Gamma)}^2
\le
\frac2h
\|u\|_{L^2(\Omega)}^2
+
2h
\|\partial_du\|_{L^2(\Omega)}^2
}
$$

です。

一般 Lipschitz domain の trace estimate は、この一変数評価を boundary graph chart ごとに実行したものです。
<!-- solution-end -->

## GPDE4-C01 同じ非零境界データを持つ関数の差を制御する

- Level: C
- 目安時間: 25分

$\Omega$ を bounded Lipschitz domain とし、

$$
w\in H^1(\Omega),
\qquad
g=\operatorname{Tr}w
$$

とする。

集合

$$
\mathcal A_g
=
\{u\in H^1(\Omega):
\operatorname{Tr}u=g\}
$$

を考える。

1. $\mathcal A_g=w+H_0^1(\Omega)$ を示せ。
2. $u,v\in\mathcal A_g$ なら

$$
\|u-v\|_{H^1}
\le
\sqrt{1+C_P^2}
\|\nabla u-\nabla v\|_2
$$

を示せ。
3. なぜこの評価が「同じ Dirichlet 境界データを持つ二つの候補解の差」を調べるときに有効か説明せよ。

<!-- solution-start -->
### 詳細解答

まず

$$
u\in\mathcal A_g
$$

とします。

定義から

$$
\operatorname{Tr}u=g
$$

かつ

$$
\operatorname{Tr}w=g.
$$

trace の線形性により

$$
\operatorname{Tr}(u-w)
=
\operatorname{Tr}u-\operatorname{Tr}w
=
g-g
=
0.
$$

bounded Lipschitz domain 上の特徴付け

$$
H_0^1(\Omega)
=
\ker\operatorname{Tr}
$$

から

$$
u-w\in H_0^1(\Omega).
$$

従って

$$
u\in w+H_0^1(\Omega).
$$

よって

$$
\mathcal A_g
\subset
w+H_0^1(\Omega).
$$

逆に

$$
u=w+z,
\qquad
z\in H_0^1(\Omega)
$$

とします。

すると

$$
\operatorname{Tr}z=0
$$

なので

$$
\operatorname{Tr}u
=
\operatorname{Tr}w+\operatorname{Tr}z
=
g.
$$

従って

$$
u\in\mathcal A_g.
$$

よって

$$
\boxed{
\mathcal A_g
=
w+H_0^1(\Omega)
}
$$

です。

次に

$$
u,v\in\mathcal A_g
$$

とします。

両者は同じ trace を持つので

$$
\operatorname{Tr}(u-v)=0.
$$

従って

$$
u-v\in H_0^1(\Omega).
$$

Poincaré から導いた norm 同値性を $u-v$ に適用すると

$$
\|u-v\|_{H^1}
\le
\sqrt{1+C_P^2}
\|\nabla(u-v)\|_2.
$$

すなわち

$$
\boxed{
\|u-v\|_{H^1}
\le
\sqrt{1+C_P^2}
\|\nabla u-\nabla v\|_2
}
$$

です。

最後に意味を説明します。

非零 Dirichlet 条件を持つ候補解 $u,v$ 自体は $H_0^1$ に入りません。しかし同じ境界データを持つため、その差

$$
u-v
$$

は zero trace です。

したがって差は $H_0^1$ に入り、Poincaré 不等式を使えます。

つまり一意性や安定性を調べるとき、

$$
\text{非零境界条件}
$$

を直接扱う代わりに

$$
\text{同じ境界データを引いて零境界条件へ戻す}
$$

ことができます。

これは GPDE6 以降の変分法で繰り返し使う基本操作です。
<!-- solution-end -->

---

## 章末チェック

- $H_0^1(\Omega)$ を $C_c^\infty(\Omega)$ の $H^1$ 閉包として定義できる。
- $H_0^1$ が $H^1$ の閉部分空間として完備になる理由を説明できる。
- 任意の有界開集合で $H_0^1$ 版 Poincaré 不等式を断面積分から証明できる。
- 定数関数が全 $H^1$ 版 Poincaré を壊す理由を説明できる。
- $H_0^1$ 上では $\|\nabla u\|_2$ が norm になり、$H^1$ norm と同値になることを証明できる。
- 一変数 $W^{1,1}$ 関数が絶対連続代表元を持つことを弱微分と mollifier から証明できる。
- 区間上の trace を端点値として構成し、その $H^1$ 連続性を証明できる。
- 区間上で $H_0^1=\ker\operatorname{Tr}$ を境界層 cutoff と mollification から証明できる。
- bounded Lipschitz domain の仮定が trace のどこで働くか説明できる。
- 一般 trace 定理で $H^1(\Omega)\to L^2(\partial\Omega)$ の連続性を正確に使える。
- bounded Lipschitz domain で zero trace による零境界条件の特徴付けを使える。
- pointwise zero、zero trace、平均 zero を区別できる。
- 非零 Dirichlet 条件を零境界 Sobolev 空間の affine translate として読める。

次の GPDE5 では、Sobolev norm の制御から

$$
L^q
$$

や連続性への埋め込みを取り出し、さらに bounded sequence から strong convergence を持つ部分列を回収する compactness へ進みます。
