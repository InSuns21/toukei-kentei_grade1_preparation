# GPDE3：弱微分を $L^p$ と組み合わせ、極限に耐える関数空間を作る

GPDE2 では、古典微分できない関数にも distribution 微分を定義し、その微分が局所可積分関数で表せる場合を weak derivative と呼びました。

本章では、その考えを一つの関数空間へまとめます。

$$
\boxed{
u\in W^{k,p}(\Omega)
\quad\Longleftrightarrow\quad
D^\alpha u\in L^p(\Omega)
\text{ for every }|\alpha|\le k
}
$$

ここで $D^\alpha u$ は古典微分ではなく、GPDE2 で定義した弱微分です。

この定義の意味は大きいです。PDE の未知関数に「古典微分が存在する」と要求する代わりに、

- 関数そのものが $L^p$ で制御される。
- 必要な階数までの弱微分も $L^p$ で制御される。
- その制御を一つの norm で測る。
- Cauchy 列の極限を取っても、弱微分の情報が失われない。

という形で、極限操作に耐える解析の舞台を作れます。

GPDE4 では、この舞台に境界条件を組み込み、$H_0^1$、Poincare 不等式、trace へ進みます。

---

## 1. まず「関数の値」ではなく、ほとんど至る所（almost everywhere; a.e.）の同値類を扱う

$L^p(\Omega)$ では、測度 0 の集合上でだけ異なる二つの関数は同じ元です。

たとえば

$$
u(x)=0
$$

と

$$
v(x)=
\begin{cases}
1,&x=0,\\
0,&x\ne0
\end{cases}
$$

は $\mathbb R$ 上で a.e. 等しく、同じ $L^p$ の元を表します。

ここで作る関数空間でも事情は同じです。弱微分は積分恒等式で定義されるため、測度 0 の集合上の値を変えても変化しません。

したがって

$$
u(0)
$$

のような一点の値は、この種の a.e. 同値類だけからは一般に定まりません。

この点は GPDE4 で境界値を考えるときに重要になります。境界値は単純な「点ごとの代入」ではなく、trace という別の仕組みで回収する必要があります。

---

## 2. $W^{k,p}$ の定義

以後、$\Omega\subset\mathbb R^d$ を開集合とし、$k\in\mathbb N_0$、$1\le p\le\infty$ とします。

<a id="def-gpde3-sobolev-space"></a>
<!-- formal-statement-start -->
> **定義（Sobolev 空間）**  
> $u\in L^p(\Omega)$ が
>
> $$
> D^\alpha u\in L^p(\Omega)
> $$
>
> をすべての多重指数 $\alpha$ で $|\alpha|\le k$ を満たすものに対して満たすとき、
>
> $$
> u\in W^{k,p}(\Omega)
> $$
>
> と書く。ここで $D^\alpha u$ は distribution の意味での微分が $L^p$ 関数として表された弱微分を表す。
<!-- formal-statement-end -->

<!-- definition-example-start: def-gpde3-sobolev-space -->
**定義の確認**

$k=1$ なら

$$
W^{1,p}(\Omega)
=
\left\{
u\in L^p(\Omega):
D_j u\in L^p(\Omega)
\ (j=1,\ldots,d)
\right\}.
$$

つまり

$$
u,\quad D_1u,\ldots,D_du
$$

を全部 $L^p$ で制御します。

$k=2$ ならさらに

$$
D_iD_j u
$$

まで全て $L^p$ に入ることを要求します。
<!-- definition-example-end -->

古典的に $C^k$ であることは要求していません。必要なのは、弱微分が $L^p$ 関数として存在することです。

---

## 3. 関数と弱微分を一つの大きさで測る

弱微分の情報を全部まとめて測る norm を入れます。

<a id="def-gpde3-sobolev-norm"></a>
<!-- formal-statement-start -->
> **定義（Sobolev norm）**  
> $1\le p<\infty$ に対し、
>
> $$
> \boxed{
> \|u\|_{W^{k,p}(\Omega)}
> =
> \left(
> \sum_{|\alpha|\le k}
> \|D^\alpha u\|_{L^p(\Omega)}^p
> \right)^{1/p}
> }
> $$
>
> と定める。ただし $\alpha=0$ では $D^0u=u$ とする。
>
> $p=\infty$ では
>
> $$
> \boxed{
> \|u\|_{W^{k,\infty}(\Omega)}
> =
> \max_{|\alpha|\le k}
> \|D^\alpha u\|_{L^\infty(\Omega)}
> }
> $$
>
> と定める。
<!-- formal-statement-end -->

<!-- definition-example-start: def-gpde3-sobolev-norm -->
**定義の確認**

一変数で $k=1,p=2$ なら

$$
\|u\|_{H^1(\Omega)}^2
=
\|u\|_2^2+\|u'\|_2^2.
$$

関数の大きさだけでなく、その弱微分の大きさも同時に測っています。
<!-- definition-example-end -->

Sobolev norm は「関数値の誤差」と「微分の誤差」を一緒に小さくする norm です。

---

## 4. 最初の直接例：$|x|$ は滑らかでなくても $W^{1,p}$

$$
\Omega=(-1,1),
\qquad
u(x)=|x|
$$

とします。

GPDE2 で示したように

$$
Du=\operatorname{sgn}x
$$

が弱微分です。

任意の $1\le p<\infty$ に対し

$$
\int_{-1}^1|u(x)|^p\,dx
=
2\int_0^1x^p\,dx
=
\frac{2}{p+1}
<\infty,
$$

また

$$
\int_{-1}^1|Du(x)|^p\,dx
=
2
<\infty.
$$

さらに

$$
\|u\|_\infty=1,
\qquad
\|Du\|_\infty=1.
$$

従って

$$
\boxed{
|x|\in W^{1,p}(-1,1)
\quad
(1\le p\le\infty)
}
$$

です。

しかし二階 distribution 微分は

$$
D^2|x|=2\delta_0
$$

です。Dirac delta は $L^p$ 関数ではないので、

$$
\boxed{
|x|\notin W^{2,p}(-1,1)
\quad
(1\le p\le\infty)
}
$$

です。

「一階では Sobolev、二階では Sobolev でない」という現象がすでに現れています。

---

## 5. jump は一階 Sobolev に入らない

$$
u(x)=1_{(0,1)}(x)
$$

を $(-1,1)$ 上で考えます。

$x=0$ に jump があるため、[GPDE2 の jump を持つ関数の distribution 微分](../GPDE2/index.md#prop-gpde2-jump-formula)から

$$
Du=\delta_0
$$

です。

したがって $Du$ は $L^p(-1,1)$ 関数ではありません。

よって

$$
\boxed{
1_{(0,1)}
\notin
W^{1,p}(-1,1)
\quad
(1\le p\le\infty)
}
$$

です。

$|x|$ には cusp はありますが関数自体は連続で、一階 distribution 微分は普通の関数として残りました。

一方 jump は一階微分の時点で delta を生みます。

この違いは Sobolev membership を判定するときの最初の重要な見分け方です。

---

## 6. べき関数で $p$ の役割を見る

$$
u(x)=x^\beta,
\qquad
0<x<1,
\qquad
\beta>0
$$

を考えます。

古典微分は

$$
u'(x)=\beta x^{\beta-1}.
$$

原点は区間の境界であり、内部 jump はありません。したがって distribution 微分もこの関数で表されます。

まず

$$
u\in L^p(0,1)
$$

は $\beta>0$ なら常に成り立ちます。

一方

$$
u'\in L^p(0,1)
$$

であるためには

$$
\int_0^1
x^{p(\beta-1)}
\,dx
<\infty
$$

が必要十分です。

べき積分の判定から

$$
p(\beta-1)>-1.
$$

従って $1\le p<\infty$ では

$$
\boxed{
x^\beta\in W^{1,p}(0,1)
\quad\Longleftrightarrow\quad
\beta>1-\frac1p
}
$$

です。

特に $p=2$ では

$$
x^\beta\in H^1(0,1)
\quad\Longleftrightarrow\quad
\beta>\frac12.
$$

したがって

$$
\sqrt{x}\notin H^1(0,1)
$$

です。

$p=\infty$ では $u'$ が有界であることが必要なので、

$$
\boxed{
x^\beta\in W^{1,\infty}(0,1)
\quad\Longleftrightarrow\quad
\beta\ge1
}
$$

です。

同じ関数でも $p$ を変えると Sobolev membership が変わります。

---

## 7. 弱微分作用素は極限に対して閉じている

Sobolev 空間が PDE で使いやすい理由の核心へ進みます。

近似解 $u_n$ を作り、

$$
u_n\to u
$$

を示しても、微分情報が極限で失われるなら困ります。

そこで次の閉性が重要です。

<a id="prop-gpde3-weak-derivative-closed"></a>
<!-- formal-statement-start -->
> **命題（弱微分作用素の閉性）**  
> $1\le p\le\infty$ とする。$u_n,u,v\in L^p(\Omega)$ とし、ある多重指数 $\alpha$ について
>
> $$
> u_n\to u
> \quad\text{in }L^p(\Omega),
> $$
>
> $$
> D^\alpha u_n\to v
> \quad\text{in }L^p(\Omega)
> $$
>
> とする。このとき
>
> $$
> D^\alpha u=v
> $$
>
> が弱微分の意味で成り立つ。
<!-- formal-statement-end -->

### 証明の見取り図

各 $n$ では弱微分の定義から

$$
\int_\Omega u_n D^\alpha\varphi
=
(-1)^{|\alpha|}
\int_\Omega
D^\alpha u_n\,\varphi
$$

です。

両辺を $n\to\infty$ とすればよいのですが、その極限交換を Hölder 不等式で正当化します。

<!-- proof-start -->
### 証明

任意の $\varphi\in C_c^\infty(\Omega)$ を取ります。

$u_n\to u$ in $L^p$ なので、

$$
\int_\Omega
(u_n-u)D^\alpha\varphi
\to0.
$$

実際、$1<p<\infty$ では共役指数を $q$ とすると

$$
\left|
\int_\Omega
(u_n-u)D^\alpha\varphi
\right|
\le
\|u_n-u\|_p
\|D^\alpha\varphi\|_q
\to0.
$$

$p=1$ では $D^\alpha\varphi\in L^\infty$ を使い、$p=\infty$ では $D^\alpha\varphi\in L^1$ を使えば同じです。

同様に

$$
D^\alpha u_n\to v
\quad\text{in }L^p
$$

より

$$
\int_\Omega
D^\alpha u_n\,\varphi
\to
\int_\Omega
v\varphi.
$$

各 $n$ について

$$
\int_\Omega
u_nD^\alpha\varphi
=
(-1)^{|\alpha|}
\int_\Omega
D^\alpha u_n\,\varphi.
$$

極限を取ると

$$
\int_\Omega
uD^\alpha\varphi
=
(-1)^{|\alpha|}
\int_\Omega
v\varphi.
$$

これは $v$ が $u$ の $\alpha$ 階弱微分であることの定義そのものです。

従って

$$
\boxed{
D^\alpha u=v
}.
$$
<!-- proof-end -->

この命題は、

$$
u_n\to u,
\qquad
D^\alpha u_n\to v
$$

という二つの $L^p$ 極限を、単なる別々の極限ではなく

$$
v=D^\alpha u
$$

という微分関係の極限へ結び戻します。

---

## 8. $W^{k,p}$ は完備である

次に Sobolev 空間の完備性を証明します。

<a id="thm-gpde3-wkp-complete"></a>
<!-- formal-statement-start -->
> **定理（Sobolev 空間の完備性）**  
> $\Omega\subset\mathbb R^d$ を開集合、$k\in\mathbb N_0$、$1\le p\le\infty$ とする。
>
> Sobolev norm を入れた
>
> $$
> W^{k,p}(\Omega)
> $$
>
> は完備なノルム空間である。
<!-- formal-statement-end -->

### 証明の見取り図

$W^{k,p}$-Cauchy 列なら、各弱微分

$$
D^\alpha u_n
$$

も $L^p$-Cauchy です。

$L^p$ の完備性から、それぞれに極限 $f_\alpha$ が存在します。

最後に前節の閉性を使って

$$
f_\alpha=D^\alpha f_0
$$

と確認します。

<!-- proof-start -->
### 証明

$(u_n)$ を $W^{k,p}(\Omega)$ の Cauchy 列とします。

定義から、任意の $|\alpha|\le k$ に対して

$$
\|D^\alpha u_n-D^\alpha u_m\|_{L^p}
\le
\|u_n-u_m\|_{W^{k,p}}.
$$

従って

$$
(D^\alpha u_n)_n
$$

は $L^p(\Omega)$ の Cauchy 列です。

$L^p$ の完備性から、各 $\alpha$ に対し $f_\alpha\in L^p(\Omega)$ が存在して

$$
D^\alpha u_n\to f_\alpha
\quad\text{in }L^p.
$$

特に $\alpha=0$ では

$$
u_n\to f_0
\quad\text{in }L^p.
$$

$\alpha\ne0$ を一つ固定します。

$$
u_n\to f_0
\quad\text{in }L^p,
$$

$$
D^\alpha u_n\to f_\alpha
\quad\text{in }L^p
$$

なので、[弱微分作用素の閉性](#prop-gpde3-weak-derivative-closed)から

$$
D^\alpha f_0=f_\alpha.
$$

従って $f_0$ は全ての $|\alpha|\le k$ に対して $L^p$ 弱微分を持ち、

$$
f_0\in W^{k,p}(\Omega).
$$

さらに

$$
\|u_n-f_0\|_{W^{k,p}}
$$

は各成分

$$
\|D^\alpha u_n-f_\alpha\|_p
$$

から作られるため 0 に収束します。

したがって $u_n$ は $W^{k,p}$ で $f_0$ に収束します。

よって

$$
\boxed{
W^{k,p}(\Omega)
\text{ is Banach}
}.
$$
<!-- proof-end -->

ここで重要なのは「$L^p$ が完備だから終わり」ではありません。

本当に必要なのは

$$
\text{$L^p$ 完備性}
+
\text{弱微分の閉性}
$$

です。

この二つが合わさって、極限後も Sobolev 構造が残ります。

---

## 9. $H^k=W^{k,2}$

$p=2$ は特別です。

<a id="def-gpde3-hk"></a>
<!-- formal-statement-start -->
> **定義（二乗可積分型 Sobolev 空間）**  
> $$
> H^k(\Omega)
> =
> W^{k,2}(\Omega)
> $$
> と書く。
>
> $u,v\in H^k(\Omega)$ に対し
>
> $$
> (u,v)_{H^k}
> =
> \sum_{|\alpha|\le k}
> \int_\Omega
> D^\alpha u(x)
> D^\alpha v(x)
> \,dx
> $$
>
> と定める。
<!-- formal-statement-end -->

<!-- definition-example-start: def-gpde3-hk -->
**定義の確認**

$k=1$ なら

$$
(u,v)_{H^1}
=
\int_\Omega uv
+
\sum_{j=1}^d
\int_\Omega
D_ju\,D_jv.
$$

従って

$$
\|u\|_{H^1}^2
=
\|u\|_2^2
+
\|\nabla u\|_2^2.
$$
<!-- definition-example-end -->

<a id="thm-gpde3-hk-hilbert"></a>
<!-- formal-statement-start -->
> **定理（二乗可積分型 Sobolev 空間の完備内積構造）**  
> 上の内積により $H^k(\Omega)$ は完備な内積空間である。
<!-- formal-statement-end -->

<!-- proof-start -->
### 証明

内積の線形性・対称性・正値性は $L^2$ 内積の性質から従います。

この内積から得られる norm は

$$
\|u\|_{H^k}^2
=
\sum_{|\alpha|\le k}
\|D^\alpha u\|_2^2,
$$

すなわち $p=2$ の Sobolev norm そのものです。

前節で

$$
W^{k,2}(\Omega)
$$

がこの norm について完備であることを示しました。

従って

$$
H^k(\Omega)=W^{k,2}(\Omega)
$$

は完備な内積空間です。
<!-- proof-end -->

PDE の変分法で $H^1$ が頻出するのは偶然ではありません。

微分情報を含む一方で完備な内積空間なので、直交性や内積を用いた表現など、後続の変分法に必要な道具を使えます。

---

## 10. smooth multiplier で局所化する

PDE では、関数全体ではなくある領域の内部だけを調べたいことが頻繁にあります。

そのとき smooth cutoff $\chi$ を掛けます。

<a id="prop-gpde3-smooth-multiplier"></a>
<!-- formal-statement-start -->
> **命題（smooth multiplier との積の弱微分）**  
> $u\in W^{k,p}(\Omega)$、$\chi\in C^\infty(\Omega)$ とし、$\chi$ と必要な階数までの微分が有界であるとする。
>
> このとき
>
> $$
> \chi u\in W^{k,p}(\Omega)
> $$
>
> であり、
>
> $$
> \boxed{
> D^\alpha(\chi u)
> =
> \sum_{\beta\le\alpha}
> {\alpha\choose\beta}
> D^\beta\chi
> D^{\alpha-\beta}u
> }
> $$
>
> が $|\alpha|\le k$ に対して a.e. 成り立つ。
<!-- formal-statement-end -->

### 証明の見取り図

一階の場合に、テスト関数 $\varphi$ ではなく

$$
\chi\varphi
$$

を $u$ の弱微分の定義へ代入します。

その後は

$$
D_j(\chi\varphi)
=
(D_j\chi)\varphi
+
\chi D_j\varphi
$$

を使えば Leibniz 則が出ます。

高階は一階公式を繰り返します。

<!-- proof-start -->
### 証明

まず $k=1$ の一階公式を示します。

任意の $\varphi\in C_c^\infty(\Omega)$ に対して、$\chi\varphi\in C_c^\infty(\Omega)$ です。

$D_ju$ の弱微分の定義から

$$
\int_\Omega
uD_j(\chi\varphi)
=
-\int_\Omega
D_ju\,\chi\varphi.
$$

積の古典微分を展開すると

$$
D_j(\chi\varphi)
=
(D_j\chi)\varphi
+
\chi D_j\varphi.
$$

従って

$$
\int_\Omega
u(D_j\chi)\varphi
+
\int_\Omega
u\chi D_j\varphi
=
-\int_\Omega
\chi D_ju\,\varphi.
$$

整理すると

$$
\int_\Omega
\chi uD_j\varphi
=
-\int_\Omega
\left(
\chi D_ju
+
uD_j\chi
\right)\varphi.
$$

従って

$$
D_j(\chi u)
=
\chi D_ju
+
uD_j\chi.
$$

右辺は、$\chi,D_j\chi$ が有界で $u,D_ju\in L^p$ なので $L^p$ に属します。

高階微分については、この一階公式を繰り返します。

各段階で $\chi$ の微分と $u$ の弱微分の積が現れ、組合せ係数をまとめると

$$
D^\alpha(\chi u)
=
\sum_{\beta\le\alpha}
{\alpha\choose\beta}
D^\beta\chi
D^{\alpha-\beta}u.
$$

各項は $L^p$ に属するので

$$
\chi u\in W^{k,p}(\Omega).
$$
<!-- proof-end -->

この命題により、

$$
u
\quad\longrightarrow\quad
\chi u
$$

と切り出して、境界から離れた内部だけを滑らかにする準備ができます。

---

## 11. $L^p$ 平行移動は $p<\infty$ で連続

mollifier による近似を Sobolev norm へ持ち上げるため、GPDE2 で使った平行移動の議論を $L^p$ へ拡張します。

<a id="lem-gpde3-lp-translation"></a>
<!-- formal-statement-start -->
> **補題（Lp 平行移動連続性）**  
> $1\le p<\infty$、$f\in L^p(\mathbb R^d)$ とする。
>
> $$
> \tau_h f(x)=f(x-h)
> $$
>
> と置くと
>
> $$
> \boxed{
> \|\tau_hf-f\|_{L^p(\mathbb R^d)}
> \to0
> \qquad(h\to0)
> }.
> $$
<!-- formal-statement-end -->

<!-- proof-start -->
### 証明

[MT7](../MT7/index.md) で $C_c(\mathbb R^d)$ が $L^p(\mathbb R^d)$ に稠密であることを使います。

$\varepsilon>0$ を取ります。

ある $g\in C_c(\mathbb R^d)$ を

$$
\|f-g\|_p<\varepsilon
$$

となるように取れます。

平行移動は Lebesgue 測度を保つので

$$
\|\tau_h(f-g)\|_p
=
\|f-g\|_p.
$$

従って三角不等式から

$$
\|\tau_hf-f\|_p
\le
2\|f-g\|_p
+
\|\tau_hg-g\|_p.
$$

最初の二項は

$$
2\|f-g\|_p<2\varepsilon.
$$

$g$ は compact support を持つ連続関数なので一様連続です。

$h\to0$ のとき

$$
g(x-h)\to g(x)
$$

は一様に起こり、十分小さい $h$ では $\tau_hg-g$ の台も固定した有限測度の compact 集合に入ります。

従って

$$
\|\tau_hg-g\|_p\to0.
$$

よって十分小さい $h$ に対し

$$
\|\tau_hf-f\|_p<3\varepsilon.
$$

$\varepsilon$ は任意なので結論が従います。
<!-- proof-end -->

ここで $p=\infty$ を除いていることに注意してください。

$L^\infty$ では一般の関数について平行移動が norm 連続とは限りません。

この差が、後で smooth density の $p<\infty$ 制限として現れます。

---

## 12. Sobolev 関数を領域内部で mollify する

$$
u\in W^{k,p}(\Omega)
$$

とし、$K\subset\subset\Omega$ を compact とします。

境界から離れていれば、GPDE2 の局所 mollification を各弱微分に適用できます。

<a id="thm-gpde3-local-mollification"></a>
<!-- formal-statement-start -->
> **定理（Sobolev 関数の局所 mollification）**  
> $1\le p<\infty$、$u\in W^{k,p}(\Omega)$、$K\subset\subset\Omega$ とする。
>
> 十分小さい $\varepsilon>0$ に対し局所 mollification
>
> $$
> u_\varepsilon=\rho_\varepsilon*u
> $$
>
> は $K$ の近傍で $C^\infty$ であり、$|\alpha|\le k$ に対して
>
> $$
> D^\alpha u_\varepsilon
> =
> \rho_\varepsilon*D^\alpha u
> $$
>
> が成り立つ。
>
> さらに
>
> $$
> \boxed{
> \|u_\varepsilon-u\|_{W^{k,p}(K)}
> \to0
> }
> $$
>
> が $\varepsilon\downarrow0$ で成り立つ。
<!-- formal-statement-end -->

### 証明の見取り図

GPDE2 ですでに[弱微分と mollification の交換](../GPDE2/index.md#thm-gpde2-weak-mollifier-commute)を示しました。

残るのは各

$$
D^\alpha u
$$

について mollifier が $L^p$ 近似になることです。

そのために[直前の補題](#lem-gpde3-lp-translation)を使います。

<!-- proof-start -->
### 証明

$K\subset\subset\Omega$ なので、ある $r>0$ が存在して

$$
K_r
=
\{x:\operatorname{dist}(x,K)\le r\}
\subset\Omega.
$$

$\varepsilon<r/2$ とします。

GPDE2 の弱微分と mollification の交換から、$|\alpha|\le k$ に対して

$$
D^\alpha u_\varepsilon
=
(D^\alpha u)_\varepsilon
$$

が $K$ 上で成り立ちます。

$f=D^\alpha u$ と置きます。

$f\in L^p(K_r)$ なので、$K_r$ の外で 0 とした関数

$$
w=f1_{K_r}
$$

は $L^p(\mathbb R^d)$ に属します。

$x\in K$ と $|z|\le1$ に対し、$\varepsilon<r/2$ なら

$$
x-\varepsilon z\in K_r.
$$

従って $K$ 上では

$$
f_\varepsilon(x)-f(x)
=
\int
\rho(z)
\left(
w(x-\varepsilon z)-w(x)
\right)
\,dz.
$$

Minkowski の積分不等式から

$$
\|f_\varepsilon-f\|_{L^p(K)}
\le
\int
\rho(z)
\|\tau_{\varepsilon z}w-w\|_{L^p(\mathbb R^d)}
\,dz.
$$

$\rho$ の台では $|z|\le1$ なので、[直前の補題](#lem-gpde3-lp-translation)から

$$
\sup_{|h|\le\varepsilon}
\|\tau_hw-w\|_p
\to0.
$$

また $\int\rho=1$ なので

$$
\|f_\varepsilon-f\|_{L^p(K)}
\to0.
$$

これは全ての $|\alpha|\le k$ に対して成り立ちます。

従って

$$
\sum_{|\alpha|\le k}
\|D^\alpha u_\varepsilon-D^\alpha u\|_{L^p(K)}^p
\to0.
$$

よって

$$
\boxed{
u_\varepsilon\to u
\text{ in }W^{k,p}(K)
}.
$$
<!-- proof-end -->

この定理は「境界から離れた内部では、Sobolev 関数を滑らかな関数で近似できる」ことを保証します。

---

## 13. 全空間では $C_c^\infty$ が稠密

局所近似を全空間の global approximation へ持ち上げます。

<a id="thm-gpde3-ccinf-density-rd"></a>
<!-- formal-statement-start -->
> **定理（全空間上の滑らかなコンパクト台関数の密度）**  
> $k\in\mathbb N_0$、$1\le p<\infty$ とする。
>
> 任意の
>
> $$
> u\in W^{k,p}(\mathbb R^d)
> $$
>
> に対し、ある列
>
> $$
> \varphi_n\in C_c^\infty(\mathbb R^d)
> $$
>
> が存在して
>
> $$
> \boxed{
> \varphi_n\to u
> \quad\text{in }W^{k,p}(\mathbb R^d)
> }
> $$
>
> が成り立つ。
<!-- formal-statement-end -->

### 証明の見取り図

いきなり mollify すると滑らかにはなりますが、compact support は得られません。

そこで二段階にします。

$$
u
\overset{\text{cutoff}}{\longrightarrow}
u_R
\overset{\text{mollify}}{\longrightarrow}
\varphi_{R,\varepsilon}.
$$

まず遠方の tail を cutoff で切り、その後 mollifier で滑らかにします。

<!-- proof-start -->
### 証明

$\chi\in C_c^\infty(\mathbb R^d)$ を

$$
0\le\chi\le1,
$$

$$
\chi(x)=1
\quad(|x|\le1),
$$

$$
\chi(x)=0
\quad(|x|\ge2)
$$

となるように取ります。

$R>1$ に対し

$$
\chi_R(x)=\chi(x/R)
$$

と置き、

$$
u_R=\chi_Ru
$$

とします。

まず

$$
u_R\to u
\quad\text{in }W^{k,p}(\mathbb R^d)
$$

を示します。

[smooth multiplier の積公式](#prop-gpde3-smooth-multiplier)から

$$
D^\alpha u_R
=
\sum_{\beta\le\alpha}
{\alpha\choose\beta}
D^\beta\chi_R
D^{\alpha-\beta}u.
$$

$\beta=0$ の項は

$$
\chi_R D^\alpha u.
$$

従って

$$
(\chi_R-1)D^\alpha u
$$

を考えます。

$\chi_R=1$ on $B_R$ なので、この差は $|x|>R$ にしか存在しません。

ゆえに

$$
\|(\chi_R-1)D^\alpha u\|_p
\le
\|D^\alpha u\|_{L^p(\{|x|>R\})}
\to0.
$$

次に $\beta\ne0$ の項を考えます。

尺度変換から

$$
D^\beta\chi_R(x)
=
R^{-|\beta|}
(D^\beta\chi)(x/R).
$$

従って

$$
\|D^\beta\chi_R\|_\infty
\le
C_\beta R^{-|\beta|}.
$$

よって

$$
\|
D^\beta\chi_R
D^{\alpha-\beta}u
\|_p
\le
C_\beta R^{-|\beta|}
\|
D^{\alpha-\beta}u
\|_p
\to0.
$$

したがって各 $|\alpha|\le k$ に対して

$$
D^\alpha u_R
\to
D^\alpha u
\quad\text{in }L^p.
$$

ゆえに

$$
u_R\to u
\quad\text{in }W^{k,p}.
$$

ここまでで compact support を持つ Sobolev 関数へ近似できました。

次に $R$ を固定します。

$u_R$ は compact support を持つので、全空間上で mollify して

$$
\varphi_{R,\varepsilon}
=
\rho_\varepsilon*u_R
$$

と置きます。

mollifier も compact support を持つため

$$
\varphi_{R,\varepsilon}
\in
C_c^\infty(\mathbb R^d).
$$

また[GPDE2 の弱微分と mollification の交換](../GPDE2/index.md#thm-gpde2-weak-mollifier-commute)から

$$
D^\alpha\varphi_{R,\varepsilon}
=
\rho_\varepsilon*
D^\alpha u_R.
$$

$D^\alpha u_R\in L^p(\mathbb R^d)$ であり、$p<\infty$ なので[本章の平行移動補題](#lem-gpde3-lp-translation)から

$$
\rho_\varepsilon*
D^\alpha u_R
\to
D^\alpha u_R
\quad\text{in }L^p.
$$

従って

$$
\varphi_{R,\varepsilon}
\to
u_R
\quad\text{in }W^{k,p}
$$

as $\varepsilon\downarrow0$.

最後に、各 $n$ について $R_n$ を十分大きく取り

$$
\|u_{R_n}-u\|_{W^{k,p}}<\frac1{2n},
$$

さらに $\varepsilon_n$ を十分小さく取り

$$
\|
\varphi_{R_n,\varepsilon_n}
-
u_{R_n}
\|_{W^{k,p}}
<
\frac1{2n}
$$

とします。

三角不等式から

$$
\|
\varphi_{R_n,\varepsilon_n}
-u
\|_{W^{k,p}}
<
\frac1n.
$$

従って

$$
\varphi_{R_n,\varepsilon_n}
\to u
\quad\text{in }W^{k,p}.
$$

これで $C_c^\infty(\mathbb R^d)$ の稠密性が示されました。
<!-- proof-end -->

この証明の構造は、後の PDE でも繰り返し現れます。

$$
\boxed{
\text{cutoff で局所化}
\quad\to\quad
\text{mollifier で平滑化}
\quad\to\quad
\text{極限へ戻す}
}
$$

GPDE2 で導入した mollifier が、ここで Sobolev norm の近似装置になります。

---

## 14. 一般領域では境界を雑に無視できない

前節で示したのは

$$
\mathbb R^d
$$

上の $C_c^\infty$ 密度です。

一般の開集合 $\Omega$ に対して

$$
C_c^\infty(\Omega)
$$

が $W^{1,p}(\Omega)$ 全体に稠密だと無条件に言ってはいけません。

この closure は GPDE4 で

$$
W_0^{1,p}(\Omega)
$$

あるいは $p=2$ なら

$$
H_0^1(\Omega)
$$

として扱います。

なぜ境界が問題になるか、一変数で見ます。

$$
\Omega=(0,1),
\qquad
u(x)=1.
$$

これは明らかに

$$
u\in H^1(0,1)
$$

です。

仮に $\varphi_n\in C_c^\infty(0,1)$ が

$$
\varphi_n\to1
\quad\text{in }H^1(0,1)
$$

とします。

すると

$$
\varphi_n'\to0
\quad\text{in }L^2(0,1).
$$

各 $\varphi_n$ は 0 の近くで 0 なので、任意の $x\in(0,1)$ に対し

$$
\varphi_n(x)
=
\int_0^x
\varphi_n'(t)\,dt.
$$

Cauchy--Schwarz から

$$
|\varphi_n(x)|
\le
\sqrt{x}
\|\varphi_n'\|_2
\le
\|\varphi_n'\|_2.
$$

従って

$$
\|\varphi_n\|_\infty
\le
\|\varphi_n'\|_2
\to0.
$$

特に

$$
\|\varphi_n\|_2\to0.
$$

これは

$$
\varphi_n\to1
\quad\text{in }L^2
$$

と矛盾します。

したがって

$$
1\notin
\overline{C_c^\infty(0,1)}^{\,H^1}.
$$

境界近くで関数を 0 に落とす操作は、勾配 norm に代償を払います。

この代償を正しく整理するのが GPDE4 の $H_0^1$、Poincare、trace です。

---

## 15. 区分線形関数はどこまで Sobolev か

tent 関数

$$
u(x)=\max(1-|x|,0)
$$

を $\mathbb R$ 上で考えます。

GPDE2 で一階弱微分を

$$
Du(x)
=
\begin{cases}
0,&x<-1,\\
1,&-1<x<0,\\
-1,&0<x<1,\\
0,&x>1
\end{cases}
$$

と求めました。

$u$ も $Du$ も有界で compact support を持つので、

$$
\boxed{
u\in W^{1,p}(\mathbb R)
\quad
(1\le p\le\infty)
}
$$

です。

一方、

$$
D^2u
=
\delta_{-1}
-
2\delta_0
+
\delta_1.
$$

これは $L^p$ 関数ではないので

$$
\boxed{
u\notin W^{2,p}(\mathbb R)
\quad
(1\le p\le\infty)
}
$$

です。

区分線形関数は「一階弱微分は関数として残るが、その一階弱微分自身に jump があるため二階で delta が出る」という典型例です。

---

## 16. $p=\infty$ では smooth approximation に注意する

前節の tent 関数を標準の偶対称 mollifier で平滑化します。

$$
u_\varepsilon=\rho_\varepsilon*u.
$$

各 $\varepsilon>0$ で

$$
u_\varepsilon\in C_c^\infty(\mathbb R).
$$

さらに

$$
u_\varepsilon'
=
\rho_\varepsilon*Du.
$$

$1\le p<\infty$ では[前節の密度定理](#thm-gpde3-ccinf-density-rd)から

$$
u_\varepsilon\to u
\quad\text{in }W^{1,p}
$$

が成り立ちます。

しかし $W^{1,\infty}$ では事情が違います。

$Du$ は 0 で $1$ から $-1$ へ jump します。

偶対称 mollifier なら対称性から

$$
u_\varepsilon'(0)=0.
$$

$u_\varepsilon'$ は連続なので、0 の右側の小区間で

$$
|u_\varepsilon'(x)|<\frac12
$$

となります。

一方、その区間で

$$
Du(x)=-1
$$

a.e. です。

従って正の測度を持つ集合上で

$$
|u_\varepsilon'(x)-Du(x)|
>
\frac12.
$$

よって

$$
\|u_\varepsilon'-Du\|_\infty
\ge
\frac12.
$$

したがって

$$
u_\varepsilon
\not\to
u
\quad\text{in }W^{1,\infty}.
$$

これは $p<\infty$ の smooth density を $p=\infty$ へ機械的に延長してはいけないことを示します。

---

## 17. Sobolev 空間が PDE の舞台になる理由

ここまでの結果を一つにつなげます。

古典 PDE では、たとえば Poisson 方程式

$$
-\Delta u=f
$$

に対して二階古典微分を要求しがちです。

しかし変分形式では、一度部分積分して

$$
\int_\Omega
\nabla u\cdot\nabla v
=
\langle f,v\rangle
$$

を考えます。

この式で必要なのは主に

$$
u\in H^1,
\qquad
v\in H^1
$$

という一階弱微分の $L^2$ 制御です。

しかも $H^1$ は完備な内積空間であり、Cauchy 列の極限を取っても $H^1$ の中に残ります。

したがって

$$
\boxed{
\text{高階の古典微分を直接要求する}
\quad\longrightarrow\quad
\text{弱微分を含む完備な関数空間で解を探す}
}
$$

という転換が可能になります。

これが大学院 PDE における Sobolev 空間の基本的な役割です。

---

# 演習

## GPDE3-A01 $H^1$ norm を直接計算する

- Level: A
- 目安時間: 12分

$$
u(x)=x(1-x),
\qquad
0<x<1
$$

とする。

1. $u\in H^1(0,1)$ を示せ。
2.
$$
\|u\|_{H^1(0,1)}^2
$$
を計算せよ。

<!-- solution-start -->
### 詳細解答

$u$ は多項式なので古典微分可能であり、

$$
u'(x)=1-2x.
$$

古典微分と弱微分は一致するので、$u'$ が弱微分です。

まず

$$
\|u\|_2^2
=
\int_0^1
x^2(1-x)^2
\,dx.
$$

展開すると

$$
x^2(1-x)^2
=
x^2-2x^3+x^4.
$$

従って

$$
\|u\|_2^2
=
\frac13
-
\frac12
+
\frac15
=
\frac1{30}.
$$

次に

$$
\|u'\|_2^2
=
\int_0^1
(1-2x)^2
\,dx.
$$

展開して

$$
(1-2x)^2
=
1-4x+4x^2.
$$

従って

$$
\|u'\|_2^2
=
1-2+\frac43
=
\frac13.
$$

両方有限なので

$$
u\in H^1(0,1).
$$

さらに

$$
\|u\|_{H^1}^2
=
\|u\|_2^2+\|u'\|_2^2
=
\frac1{30}
+
\frac13
=
\frac{11}{30}.
$$

よって

$$
\boxed{
\|u\|_{H^1(0,1)}
=
\sqrt{\frac{11}{30}}
}.
$$
<!-- solution-end -->

## GPDE3-A02 $|x|$ の Sobolev 階数を判定する

- Level: A
- 目安時間: 15分

$$
u(x)=|x|,
\qquad
-1<x<1
$$

とする。

1. $u\in H^1(-1,1)$ を示せ。
2. $\|u\|_{H^1}^2$ を求めよ。
3. $u\notin H^2(-1,1)$ を示せ。

<!-- solution-start -->
### 詳細解答

GPDE2 から

$$
Du=\operatorname{sgn}x
$$

です。

まず

$$
\|u\|_2^2
=
\int_{-1}^1x^2\,dx
=
\frac23.
$$

また

$$
|Du|=1
$$

a.e. on $(-1,1)$ なので

$$
\|Du\|_2^2
=
\int_{-1}^1 1\,dx
=
2.
$$

従って

$$
u\in H^1(-1,1)
$$

であり、

$$
\|u\|_{H^1}^2
=
\frac23+2
=
\frac83.
$$

よって

$$
\boxed{
\|u\|_{H^1}
=
\sqrt{\frac83}
}.
$$

一方、一階弱微分 $\operatorname{sgn}x$ は原点で jump $2$ を持つので、

$$
D^2u
=
D(\operatorname{sgn}x)
=
2\delta_0.
$$

Dirac delta は $L^2(-1,1)$ 関数ではありません。

したがって

$$
\boxed{
u\notin H^2(-1,1)
}.
$$
<!-- solution-end -->

## GPDE3-A03 jump 関数が $W^{1,p}$ に入らないことを示す

- Level: A
- 目安時間: 12分

$$
u(x)=1_{(0,1)}(x)
$$

を $(-1,1)$ 上で考える。

任意の $1\le p\le\infty$ に対して

$$
u\notin W^{1,p}(-1,1)
$$

を示せ。

<!-- solution-start -->
### 詳細解答

$u$ 自身は有界なので

$$
u\in L^p(-1,1)
$$

for every $1\le p\le\infty$.

しかし $x=0$ に jump があります。

任意の $\varphi\in C_c^\infty(-1,1)$ に対して

$$
\langle Du,\varphi\rangle
=
-\int_{-1}^1
u(x)\varphi'(x)\,dx.
$$

$u=1$ on $(0,1)$ なので

$$
\langle Du,\varphi\rangle
=
-\int_0^1
\varphi'(x)\,dx.
$$

$\varphi$ は 1 の近くで 0 なので

$$
-\int_0^1\varphi'
=
\varphi(0).
$$

従って

$$
Du=\delta_0.
$$

もし $u\in W^{1,p}$ なら、$Du$ はある $L^p$ 関数で表されなければなりません。

しかし $\delta_0$ はどの $L^p$ 関数でも表せません。

したがって

$$
\boxed{
u\notin W^{1,p}(-1,1)
\quad
(1\le p\le\infty)
}.
$$
<!-- solution-end -->

## GPDE3-A04 $x^\beta$ の membership threshold

- Level: A
- 目安時間: 18分

$$
u(x)=x^\beta,
\qquad
0<x<1,
\qquad
\beta>0
$$

とする。

1. $1\le p<\infty$ に対し
$$
u\in W^{1,p}(0,1)
$$
の必要十分条件を求めよ。
2. $u\in H^1(0,1)$ の条件を求めよ。
3. $\sqrt{x}$ が $H^1(0,1)$ に入るか判定せよ。

<!-- solution-start -->
### 詳細解答

$u$ 自身については

$$
\int_0^1
|u(x)|^p\,dx
=
\int_0^1
x^{\beta p}\,dx.
$$

$\beta>0$ なので

$$
\beta p>-1
$$

であり、常に有限です。

従って問題は弱微分です。

古典微分は

$$
u'(x)
=
\beta x^{\beta-1}.
$$

この関数は局所可積分であり、内部 jump もないので弱微分と一致します。

$u'\in L^p(0,1)$ であるための条件は

$$
\int_0^1
\beta^p
x^{p(\beta-1)}
\,dx
<\infty.
$$

定数 $\beta^p$ は積分可能性に影響しません。

べき積分

$$
\int_0^1x^\gamma\,dx
$$

が有限であるための必要十分条件は

$$
\gamma>-1.
$$

従って

$$
p(\beta-1)>-1.
$$

整理すると

$$
\boxed{
\beta>1-\frac1p
}.
$$

よって

$$
\boxed{
x^\beta\in W^{1,p}(0,1)
\iff
\beta>1-\frac1p
}.
$$

$H^1=W^{1,2}$ なので

$$
\boxed{
x^\beta\in H^1(0,1)
\iff
\beta>\frac12
}.
$$

$\sqrt{x}=x^{1/2}$ は境界値

$$
\beta=\frac12
$$

です。

このとき

$$
u'(x)=\frac1{2\sqrt{x}},
$$

したがって

$$
|u'(x)|^2
=
\frac1{4x}.
$$

$$
\int_0^1
\frac1{4x}\,dx
=
\infty.
$$

よって

$$
\boxed{
\sqrt{x}\notin H^1(0,1)
}.
$$
<!-- solution-end -->

## GPDE3-B01 $W^{1,p}$ の完備性を一階で再構成する

- Level: B
- 目安時間: 25分

$1\le p\le\infty$ とし、$(u_n)$ が $W^{1,p}(\Omega)$ の Cauchy 列であるとする。

1. ある $u,v_1,\ldots,v_d\in L^p(\Omega)$ が存在して
$$
u_n\to u,
\qquad
D_ju_n\to v_j
$$
in $L^p$ となることを示せ。
2. $v_j=D_ju$ を弱微分の定義から示せ。
3. $u_n\to u$ in $W^{1,p}$ を結論せよ。

<!-- solution-start -->
### 詳細解答

$W^{1,p}$ norm では

$$
\|u_n-u_m\|_{L^p}
\le
\|u_n-u_m\|_{W^{1,p}}
$$

です。

従って $(u_n)$ は $L^p$-Cauchy です。

同様に各 $j$ について

$$
\|D_ju_n-D_ju_m\|_{L^p}
\le
\|u_n-u_m\|_{W^{1,p}},
$$

なので

$$
(D_ju_n)_n
$$

も $L^p$-Cauchy です。

$L^p$ の完備性から、ある

$$
u,v_1,\ldots,v_d\in L^p(\Omega)
$$

が存在して

$$
u_n\to u
\quad\text{in }L^p,
$$

$$
D_ju_n\to v_j
\quad\text{in }L^p
$$

となります。

次に任意の $\varphi\in C_c^\infty(\Omega)$ を取ります。

各 $n$ について

$$
\int_\Omega
u_nD_j\varphi
=
-\int_\Omega
D_ju_n\,\varphi.
$$

左辺では $u_n\to u$ in $L^p$、右辺では $D_ju_n\to v_j$ in $L^p$ です。

[Hölder の不等式](../F0_00D2D_Lp_Holder_Minkowski/index.md#thm-f0-00d2d-01)により極限を取れて、

$$
\int_\Omega
uD_j\varphi
=
-\int_\Omega
v_j\varphi.
$$

従って

$$
v_j=D_ju
$$

が弱微分の意味で成り立ちます。

よって

$$
u\in W^{1,p}(\Omega).
$$

最後に

$$
\|u_n-u\|_{W^{1,p}}
$$

は

$$
\|u_n-u\|_p
$$

と

$$
\|D_ju_n-D_ju\|_p
=
\|D_ju_n-v_j\|_p
$$

から作られます。

全て 0 に収束するので

$$
\boxed{
u_n\to u
\quad\text{in }W^{1,p}(\Omega)
}.
$$
<!-- solution-end -->

## GPDE3-B02 局所 mollification を $W^{1,p}$ で示す

- Level: B
- 目安時間: 28分

$1\le p<\infty$、$u\in W^{1,p}(\Omega)$、$K\subset\subset\Omega$ とする。

十分小さい $\varepsilon>0$ に対し

$$
u_\varepsilon=\rho_\varepsilon*u
$$

を $K$ 上で定める。

1.
$$
D_ju_\varepsilon
=
(D_ju)_\varepsilon
$$
を示せ。
2.
$$
u_\varepsilon\to u
\quad\text{in }L^p(K)
$$
を示せ。
3.
$$
D_ju_\varepsilon\to D_ju
\quad\text{in }L^p(K)
$$
を示し、
$$
u_\varepsilon\to u
\quad\text{in }W^{1,p}(K)
$$
を結論せよ。

<!-- solution-start -->
### 詳細解答

1. $u\in W^{1,p}$ なので $D_ju\in L^p\subset L^1_{\mathrm{loc}}$ です。

GPDE2 の「弱微分と mollification の交換」を適用でき、

$$
\boxed{
D_ju_\varepsilon
=
(D_ju)_\varepsilon
}
$$

が境界から十分離れた $K$ 上で成り立ちます。

2. $K\subset\subset\Omega$ なので、ある $r>0$ に対して

$$
K_r
=
\{x:\operatorname{dist}(x,K)\le r\}
\subset\Omega.
$$

$w=u1_{K_r}$ を $\mathbb R^d$ 上で 0 延長します。

$w\in L^p(\mathbb R^d)$ です。

十分小さい $\varepsilon$ なら $x\in K$ から $x-\varepsilon z\in K_r$ が従うため、

$$
u_\varepsilon(x)-u(x)
=
\int
\rho(z)
\left(
w(x-\varepsilon z)-w(x)
\right)
\,dz.
$$

Minkowski の積分不等式から

$$
\|u_\varepsilon-u\|_{L^p(K)}
\le
\int
\rho(z)
\|\tau_{\varepsilon z}w-w\|_{L^p(\mathbb R^d)}
\,dz.
$$

[本章の平行移動補題](#lem-gpde3-lp-translation)より右辺は 0 へ収束します。

従って

$$
\boxed{
u_\varepsilon\to u
\text{ in }L^p(K)
}.
$$

3. 今度は $w_j=(D_ju)1_{K_r}$ に同じ議論を適用します。

すると

$$
(D_ju)_\varepsilon
\to
D_ju
\quad\text{in }L^p(K).
$$

1. で

$$
D_ju_\varepsilon=(D_ju)_\varepsilon
$$

だったので

$$
D_ju_\varepsilon\to D_ju
\quad\text{in }L^p(K).
$$

関数自身と全ての一階弱微分が $L^p(K)$ で収束するので

$$
\boxed{
u_\varepsilon\to u
\quad\text{in }W^{1,p}(K)
}.
$$
<!-- solution-end -->

## GPDE3-B03 smooth cutoff の積公式を直接証明する

- Level: B
- 目安時間: 22分

$u\in W^{1,p}(\Omega)$、$\chi\in C_c^\infty(\Omega)$ とする。

1. $\chi u\in L^p(\Omega)$ を示せ。
2. 任意の $\varphi\in C_c^\infty(\Omega)$ に対し
$$
\int_\Omega
\chi uD_j\varphi
=
-\int_\Omega
\left(
\chi D_ju
+
uD_j\chi
\right)\varphi
$$
を示せ。
3.
$$
D_j(\chi u)
=
\chi D_ju
+
uD_j\chi
$$
を結論せよ。

<!-- solution-start -->
### 詳細解答

$\chi\in C_c^\infty(\Omega)$ なので有界です。

従って

$$
|\chi u|
\le
\|\chi\|_\infty|u|.
$$

ゆえに

$$
\|\chi u\|_p
\le
\|\chi\|_\infty
\|u\|_p
<\infty.
$$

したがって

$$
\chi u\in L^p.
$$

次に $\varphi\in C_c^\infty(\Omega)$ を取ります。

積 $\chi\varphi$ も $C_c^\infty(\Omega)$ なので、$u$ の弱微分の定義から

$$
\int_\Omega
uD_j(\chi\varphi)
=
-\int_\Omega
D_ju\,\chi\varphi.
$$

古典的な積の微分を使うと

$$
D_j(\chi\varphi)
=
(D_j\chi)\varphi
+
\chi D_j\varphi.
$$

代入して

$$
\int_\Omega
u(D_j\chi)\varphi
+
\int_\Omega
u\chi D_j\varphi
=
-\int_\Omega
\chi D_ju\,\varphi.
$$

従って

$$
\int_\Omega
\chi uD_j\varphi
=
-\int_\Omega
\chi D_ju\,\varphi
-
\int_\Omega
uD_j\chi\,\varphi.
$$

まとめると

$$
\int_\Omega
\chi uD_j\varphi
=
-\int_\Omega
\left(
\chi D_ju
+
uD_j\chi
\right)\varphi.
$$

右辺の係数は

$$
\chi D_ju
+
uD_j\chi
\in L^p
$$

です。

よって弱微分の定義から

$$
\boxed{
D_j(\chi u)
=
\chi D_ju
+
uD_j\chi
}.
$$
<!-- solution-end -->

## GPDE3-C01 tent 関数で $p<\infty$ と $p=\infty$ の差を見る

- Level: C
- 目安時間: 40分

$$
u(x)=\max(1-|x|,0)
$$

を $\mathbb R$ 上で考える。

1. $u\in W^{1,p}(\mathbb R)$ for every $1\le p\le\infty$ を示せ。
2. $u\notin W^{2,p}(\mathbb R)$ for every $1\le p\le\infty$ を示せ。
3. 偶対称 mollifier に対し
$$
u_\varepsilon=\rho_\varepsilon*u
$$
と置く。$1\le p<\infty$ なら
$$
u_\varepsilon\to u
\quad\text{in }W^{1,p}(\mathbb R)
$$
を示せ。
4.
$$
u_\varepsilon\not\to u
\quad\text{in }W^{1,\infty}(\mathbb R)
$$
を示し、smooth density 定理で $p<\infty$ を仮定した理由を説明せよ。

<!-- solution-start -->
### 詳細解答

1. $u$ は compact support を持つ有界関数です。

従って

$$
u\in L^p(\mathbb R)
$$

for every $1\le p\le\infty$.

一階弱微分は GPDE2 で

$$
v(x)=Du(x)
=
\begin{cases}
0,&x<-1,\\
1,&-1<x<0,\\
-1,&0<x<1,\\
0,&x>1
\end{cases}
$$

と求めました。

$v$ も compact support を持つ有界関数なので

$$
v\in L^p(\mathbb R)
$$

for every $1\le p\le\infty$.

従って

$$
\boxed{
u\in W^{1,p}(\mathbb R)
\quad
(1\le p\le\infty)
}.
$$

2. $v$ は $-1,0,1$ で jump を持ちます。

jump の大きさはそれぞれ

$$
1,\quad -2,\quad 1.
$$

従って

$$
D^2u
=
Dv
=
\delta_{-1}
-
2\delta_0
+
\delta_1.
$$

これはどの $L^p$ 関数でもありません。

したがって

$$
\boxed{
u\notin W^{2,p}(\mathbb R)
\quad
(1\le p\le\infty)
}.
$$

3. $u\in W^{1,p}(\mathbb R)$ かつ $p<\infty$ です。

弱微分と mollification は交換するので

$$
u_\varepsilon'
=
\rho_\varepsilon*v.
$$

$L^p$ の approximate identity 性から

$$
u_\varepsilon
\to u
\quad\text{in }L^p,
$$

$$
u_\varepsilon'
=
\rho_\varepsilon*v
\to v
=
u'
\quad\text{in }L^p.
$$

従って

$$
\boxed{
u_\varepsilon\to u
\quad\text{in }W^{1,p}(\mathbb R)
\qquad
(1\le p<\infty)
}.
$$

4. 偶対称 mollifier を使います。

$v=Du$ は 0 の左で $1$、右で $-1$ です。

対称性から

$$
u_\varepsilon'(0)
=
(\rho_\varepsilon*v)(0)
=
0.
$$

$u_\varepsilon'$ は滑らかなので連続です。

従ってある $\delta_\varepsilon>0$ が存在して

$$
0<x<\delta_\varepsilon
$$

なら

$$
|u_\varepsilon'(x)|<\frac12.
$$

一方、その区間では

$$
u'(x)=v(x)=-1
$$

a.e. です。

よって

$$
|u_\varepsilon'(x)-u'(x)|
=
|u_\varepsilon'(x)+1|
>
\frac12
$$

が正の測度を持つ区間で成り立ちます。

従って essential supremum を取ると

$$
\|u_\varepsilon'-u'\|_\infty
\ge
\frac12.
$$

したがって

$$
\|u_\varepsilon-u\|_{W^{1,\infty}}
\not\to0.
$$

よって

$$
\boxed{
u_\varepsilon
\not\to
u
\quad\text{in }W^{1,\infty}
}.
$$

$p<\infty$ では、jump の近くの「遷移層」の幅が $\varepsilon$ とともに縮むため、その誤差は $L^p$ 積分では消えます。

しかし $L^\infty$ norm は集合の幅を見ず、最大誤差だけを見るため、遷移層がどれほど細くなっても誤差が残ります。

これが smooth density 定理を

$$
1\le p<\infty
$$

に限定した理由です。
<!-- solution-end -->

---

## 章末チェック

- Sobolev 空間が a.e. 同値類を扱うことを説明できる。
- $W^{k,p}(\Omega)$ を弱微分と $L^p$ 条件から定義できる。
- $p<\infty$ と $p=\infty$ の Sobolev norm を書ける。
- $|x|\in W^{1,p}(-1,1)$ だが $|x|\notin W^{2,p}(-1,1)$ を説明できる。
- jump 関数が一階 Sobolev に入らない理由を delta から説明できる。
- $x^\beta\in W^{1,p}(0,1)$ の threshold を積分可能性から導ける。
- 弱微分作用素の閉性をテスト関数と Hölder 不等式から証明できる。
- $L^p$ の完備性と弱微分の閉性から $W^{k,p}$ の完備性を証明できる。
- $H^k=W^{k,2}$ の内積を書き、完備な内積空間であることを説明できる。
- smooth multiplier との積の弱微分公式を証明できる。
- $1\le p<\infty$ で $L^p$ 平行移動連続性を証明できる。
- mollification が局所的に $W^{k,p}$ 近似を与えることを証明できる。
- $\mathbb R^d$ 上の $C_c^\infty$ 密度を cutoff と mollifier の二段階で再構成できる。
- 一般領域では $C_c^\infty(\Omega)$ の closure が $W^{1,p}(\Omega)$ 全体とは限らない理由を説明できる。
- tent 関数を使って $p<\infty$ と $p=\infty$ の smooth approximation の違いを説明できる。

次は **GPDE4「$H_0^1$・境界値・Poincare・trace」** です。
