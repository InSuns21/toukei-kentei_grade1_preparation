# ODE7 境界値問題と Sturm--Liouville 理論

ODE1・ODE2 では、ある一点で値と導関数を指定する**初期値問題**を中心に扱いました。本章では、区間の左端と右端に条件を置く**境界値問題**へ進みます。

境界値問題では、初期値問題の「初期値を与えれば一意に解ける」という感覚がそのまま使えません。境界条件と方程式が共鳴すると、解が存在しなかったり、逆に無数に存在したりします。その共鳴をパラメータ $\lambda$ の問題として整理したものが Sturm--Liouville 理論です。

本章の中心は

$$
-\frac d{dx}\left(p(x)y'(x)\right)+q(x)y(x)=\lambda w(x)y(x)
$$

です。微分式だけでなく**境界条件まで含めて一つの固有値問題**と見ることが重要です。

前提は [ODE2 高階線形微分方程式](../ODE2/index.md) です。ODE2 の連続係数線形方程式の初期値一意性を使います。Fourier 級数の完全性や一般の作用素論は前提にしません。

---

## 1. 初期値問題と境界値問題は何が違うのか

<a id="def-ode7-two-point-bvp"></a>
<!-- formal-statement-start -->
> **定義（二点境界値問題）**  
> 区間 $[a,b]$ 上の二階常微分方程式に対し、左端 $a$ と右端 $b$ に条件を課して解を求める問題を **二点境界値問題** という。本章では主に、方程式と境界条件がともに線形な場合を扱う。
<!-- formal-statement-end -->

初期値問題では同じ点 $a$ で $y(a)$ と $y'(a)$ を与えます。二点境界値問題では情報が二つの端点へ分かれるため、ODE2 の一意性定理をそのまま「解の存在」に使うことはできません。

<!-- definition-example-start: def-ode7-two-point-bvp -->
**定義の確認**：同じ方程式でも 0 個・1 個・無数個

$$
y''+y=0
$$

の一般解は

$$
y(x)=A\cos x+B\sin x
$$

です。

1. $y(0)=0$, $y(\pi)=0$ なら $A=0$ で、第二条件は $B\sin\pi=0$ なので $B$ は任意です。解は $B\sin x$ と無数にあります。
2. $y(0)=0$, $y(\pi)=1$ なら $A=0$ なのに $y(\pi)=0$ しか起こらず、解はありません。
3. $y(0)=0$, $y(\pi/2)=1$ なら $A=0$, $B=1$ で、解は $y=\sin x$ に一意に決まります。

境界条件を少し変えただけで、存在・一意性の様子が変わります。Sturm--Liouville 理論は、この現象を固有値という形で整理します。
<!-- definition-example-end -->

---

## 2. 正則 Sturm--Liouville 問題

有限区間で扱う標準形を固定します。

<a id="def-ode7-regular-sl"></a>
<!-- formal-statement-start -->
> **定義（正則 Sturm--Liouville 問題）**  
> 有限閉区間 $[a,b]$ で

> - $p\in C^1([a,b])$,
> - $q,w\in C([a,b])$ は実数値,
> - $p(x)>0$, $w(x)>0$ がすべての $x\in[a,b]$ で成り立つ

> とする。微分式

$$
L[y]:=-(p y')'+qy
$$

> と固有値方程式

$$
L[y]=\lambda w y
$$

> に、端点の斉次線形境界条件を組み合わせた問題を **正則 Sturm--Liouville 問題** という。
<!-- formal-statement-end -->

$p>0$ は最高階の係数が区間内で退化しないことを保証します。実際、$p$ で割れば

$$
y''+\frac{p'}p y'+\frac{\lambda w-q}{p}y=0
$$

となり、ODE2 の連続係数二階線形方程式の理論を使えます。

$w>0$ は後で

$$
\int_a^b w|y|^2\,dx>0\qquad(y\not\equiv0)
$$

を保証し、固有値の実数性や直交性を取り出すときに働きます。

<!-- definition-example-start: def-ode7-regular-sl -->
**定義の確認**：最小の標準例

$[0,L]$ で

$$
-y''=\lambda y,
\qquad y(0)=y(L)=0
$$

を考えます。ここでは

$$
p=1,\qquad q=0,\qquad w=1.
$$

$p\in C^1$, $q,w\in C$ であり、$p>0,w>0$ です。したがってこれは正則 Sturm--Liouville 問題です。後でこの問題の固有関数が $\sin(n\pi x/L)$ になることを、$\lambda$ の符号を三場合に分けて導きます。
<!-- definition-example-end -->

---

## 3. 境界条件は「端点で境界形式を消す」ように選ぶ

本章では左右の端点を混ぜない分離型条件を扱います。

<a id="def-ode7-separated-bc"></a>
<!-- formal-statement-start -->
> **定義（分離型自己共役境界条件）**  
> 実数 $\alpha_1,\alpha_2,\beta_1,\beta_2$ が

$$
(\alpha_1,\alpha_2)\ne(0,0),
\qquad
(\beta_1,\beta_2)\ne(0,0)
$$

> を満たすとする。境界条件

$$
\alpha_1y(a)+\alpha_2p(a)y'(a)=0,
$$

$$
\beta_1y(b)+\beta_2p(b)y'(b)=0
$$

> を **分離型自己共役境界条件** と呼ぶ。
<!-- formal-statement-end -->

Dirichlet 条件 $y(a)=y(b)=0$、Neumann 条件 $y'(a)=y'(b)=0$、Robin 条件 $c_1y+c_2py'=0$ はすべてこの形に含まれます。

<!-- definition-example-start: def-ode7-separated-bc -->
**定義の確認**：Robin 条件

たとえば

$$
y(a)+2p(a)y'(a)=0,
\qquad
3y(b)-p(b)y'(b)=0
$$

では

$$
(\alpha_1,\alpha_2)=(1,2),
\qquad
(\beta_1,\beta_2)=(3,-1),
$$

で、どちらの係数対も $(0,0)$ ではありません。左端の条件は左端の値だけ、右端の条件は右端の値だけを使うので分離型です。
<!-- definition-example-end -->

ここで「自己共役」という語の実体は、次節の境界形式が消えることです。名前だけで済ませず、端点ごとに確認します。

---

## 4. 重み付き内積と固有関数

<a id="def-ode7-weighted-inner-product"></a>
<!-- formal-statement-start -->
> **定義（重み付き内積の記号）**  
> $w>0$ を連続関数とする。連続な複素数値関数 $f,g$ に対して

$$
\langle f,g\rangle_w
:=\int_a^b f(x)\overline{g(x)}w(x)\,dx
$$

> と定める。
<!-- formal-statement-end -->

<!-- definition-example-start: def-ode7-weighted-inner-product -->
**定義の確認**：重みを実際に積分する

$[0,1]$ で $w(x)=1+x$ とします。$f(x)=1$, $g(x)=x$ なら

$$
\langle 1,x\rangle_w
=\int_0^1x(1+x)\,dx
=\frac12+\frac13
=\frac56.
$$

また

$$
\langle 1,1\rangle_w
=\int_0^1(1+x)\,dx
=\frac32>0.
$$

一般にも $w>0$ なので、連続関数 $f\not\equiv0$ なら $|f|>0$ となる小区間があり、$\langle f,f\rangle_w>0$ です。
<!-- definition-example-end -->

<a id="def-ode7-eigenpair"></a>
<!-- formal-statement-start -->
> **定義（Sturm--Liouville 固有値・固有関数）**  
> 正則 Sturm--Liouville 問題で、ある $\lambda\in\mathbb C$ に対して境界条件を満たす非零関数 $y$ が

$$
L[y]=\lambda w y
$$

> を満たすとき、$\lambda$ を **固有値**、$y$ をその **固有関数** という。
<!-- formal-statement-end -->

<!-- definition-example-start: def-ode7-eigenpair -->
**定義の確認**：$\sin x$ は本当に固有関数か

$[0,\pi]$ で $L[y]=-y''$, $w=1$, Dirichlet 条件 $y(0)=y(\pi)=0$ とします。$y=\sin x$ は

$$
-y''=\sin x=1\cdot y
$$

かつ

$$
y(0)=y(\pi)=0
$$

を満たします。したがって $\lambda=1$ は固有値、$\sin x$ は固有関数です。微分方程式だけでなく境界条件も検証して初めて固有関数と言えます。
<!-- definition-example-end -->

---

## 5. Lagrange 恒等式：直交性を生む一行の出発点

<a id="thm-ode7-lagrange-identity"></a>
<!-- formal-statement-start -->
> **定理（Lagrange 恒等式）**  
> $p\in C^1([a,b])$, $q\in C([a,b])$ を実数値とし、

$$
L[y]=-(py')'+qy
$$

> とする。$u,v\in C^2([a,b];\mathbb C)$ に対して

$$
\boxed{
\int_a^b\left\{L[u]\overline v-u\overline{L[v]}\right\}\,dx
=
\left[p\left(u\overline{v'}-u'\overline v\right)\right]_a^b
}
$$

> が成り立つ。
<!-- formal-statement-end -->

### 証明の見取り図

$q$ の項は実係数なので左右で相殺します。残る二つの項は積の微分一つにまとまります。

<!-- proof-start -->
### 証明

$q$ は実数値だから

$$
\overline{L[v]}=-(p\overline{v'})'+q\overline v.
$$

したがって

$$
\begin{aligned}
L[u]\overline v-u\overline{L[v]}
&=-(pu')'\overline v+q u\overline v
+u(p\overline{v'})'-q u\overline v\\
&=u(p\overline{v'})'-(pu')'\overline v.
\end{aligned}
$$

一方、積の微分を計算すると

$$
\begin{aligned}
\frac d{dx}\left[p(u\overline{v'}-u'\overline v)\right]
&=(pu\overline{v'})'-(pu'\overline v)'\\
&=u(p\overline{v'})'-(pu')'\overline v.
\end{aligned}
$$

よって被積分関数はこの全微分に等しい。$[a,b]$ で積分して微積分の基本定理を使えば主張を得ます。$\square$
<!-- proof-end -->

この端点量

$$
B_x(u,v):=p(x)\left(u(x)\overline{v'(x)}-u'(x)\overline{v(x)}\right)
$$

を境界形式と呼ぶことにします。

---

## 6. なぜ分離型境界条件で境界形式が消えるのか

<a id="thm-ode7-boundary-form"></a>
<!-- formal-statement-start -->
> **定理（分離型境界条件による境界形式の消滅）**  
> $u,v$ が同じ実係数の分離型境界条件

$$
\alpha_1y(a)+\alpha_2p(a)y'(a)=0,
\qquad
\beta_1y(b)+\beta_2p(b)y'(b)=0
$$

> を満たすとする。このとき

$$
B_a(u,v)=B_b(u,v)=0
$$

> であり、従って Lagrange 恒等式の右辺は 0 になる。
<!-- formal-statement-end -->

### 証明の見取り図

左端では $(y(a),p(a)y'(a))$ が一本の一次方程式を満たします。その解集合は複素二次元空間の一次元部分空間です。$u$ と $v$ の端点データは同じ一次元部分空間にあるので比例し、その二行二列式に当たる境界形式が 0 になります。右端も同じです。

<!-- proof-start -->
### 証明

左端で

$$
U_a=(u(a),p(a)u'(a)),
\qquad
V_a=(v(a),p(a)v'(a))
$$

と置きます。両方とも

$$
\alpha_1 z_1+\alpha_2z_2=0
$$

を満たします。$(\alpha_1,\alpha_2)\ne(0,0)$ なので、この方程式の解集合は一次元です。従って $U_a$ と $V_a$ は比例します。

比例する二ベクトルの行列式は 0 だから

$$
\begin{aligned}
0
&=u(a)\overline{p(a)v'(a)}-p(a)u'(a)\overline{v(a)}\\
&=p(a)\left(u(a)\overline{v'(a)}-u'(a)\overline{v(a)}\right)\\
&=B_a(u,v).
\end{aligned}
$$

境界係数と $p$ は実数なので複素共役を取っても同じ境界条件が保たれることを使いました。右端でも $(\beta_1,\beta_2)\ne(0,0)$ に対して同じ議論を行えば $B_b(u,v)=0$ です。$\square$
<!-- proof-end -->

Dirichlet や Neumann だけが特別なのではありません。「同じ一次元の端点条件に $u,v$ が入る」ことが本質です。

---

## 7. 固有値は実数になる

<a id="thm-ode7-real-eigenvalue"></a>
<!-- formal-statement-start -->
> **定理（固有値の実数性）**  
> 実係数の正則 Sturm--Liouville 問題に実係数の分離型自己共役境界条件を課す。この問題の固有値 $\lambda\in\mathbb C$ はすべて実数である。
<!-- formal-statement-end -->

### 証明の見取り図

固有関数 $y$ と自分自身を Lagrange 恒等式へ入れます。境界形式は 0。一方、積分側は $(\lambda-\overline\lambda)\int w|y|^2$ です。$w>0$ と $y\ne0$ が積分を正にするため、$\lambda=\overline\lambda$ が強制されます。

<!-- proof-start -->
### 証明

$y\not\equiv0$ が

$$
L[y]=\lambda wy
$$

を満たすとします。[Lagrange 恒等式](#thm-ode7-lagrange-identity)で $u=v=y$ と置くと、[分離型境界条件による境界形式の消滅](#thm-ode7-boundary-form)により境界項は 0 です。従って

$$
0
=\int_a^b\left\{L[y]\overline y-y\overline{L[y]}\right\}\,dx.
$$

固有値方程式を代入すると

$$
0
=(\lambda-\overline\lambda)
\int_a^bw(x)|y(x)|^2\,dx.
$$

$w(x)>0$ で $y$ は連続かつ非零なので

$$
\int_a^bw|y|^2\,dx>0.
$$

従って $\lambda-\overline\lambda=0$、すなわち $\lambda\in\mathbb R$ です。$\square$
<!-- proof-end -->

ここで $w>0$ が単なる飾りではないことが見えます。最後の積分を正にしているのがこの仮定です。

---

## 8. 異なる固有値の固有関数は直交する

<a id="thm-ode7-orthogonality"></a>
<!-- formal-statement-start -->
> **定理（異なる固有値に属する固有関数の直交性）**  
> 同じ正則 Sturm--Liouville 問題と同じ分離型自己共役境界条件に対し、$u,v$ がそれぞれ異なる固有値 $\lambda\ne\mu$ の固有関数なら

$$
\boxed{
\langle u,v\rangle_w
=\int_a^bu(x)\overline{v(x)}w(x)\,dx=0
}
$$

> である。
<!-- formal-statement-end -->

<!-- proof-start -->
### 証明

前節により $\lambda,\mu$ は実数です。固有値方程式は

$$
L[u]=\lambda wu,
\qquad
L[v]=\mu wv.
$$

[Lagrange 恒等式](#thm-ode7-lagrange-identity)と[分離型境界条件による境界形式の消滅](#thm-ode7-boundary-form)から

$$
0
=\int_a^b\left\{L[u]\overline v-u\overline{L[v]}\right\}\,dx.
$$

右辺へ固有値方程式を代入すると

$$
0=(\lambda-\mu)
\int_a^bu\overline v\,w\,dx.
$$

$\lambda\ne\mu$ なので

$$
\int_a^bu\overline v\,w\,dx=0.
$$

$\square$
<!-- proof-end -->

直交性の証明機構は明確です。

$$
\text{Lagrange 恒等式}
\to
\text{境界条件で端点項が消える}
\to
(\lambda-\mu)\langle u,v\rangle_w=0.
$$

境界条件を無視すると、この矢印の中央が壊れます。

---

## 9. 分離型問題では固有空間は一次元になる

<a id="thm-ode7-simple-eigenvalue"></a>
<!-- formal-statement-start -->
> **定理（分離型問題の固有値の単純性）**  
> 正則 Sturm--Liouville 問題に分離型境界条件を課す。固定した固有値 $\lambda$ に属する任意の二つの固有関数 $u,v$ は比例する。従って各固有値の固有空間は一次元である。
<!-- formal-statement-end -->

### 証明の見取り図

左端の境界条件は初期データ $(y(a),p(a)y'(a))$ を一次元の直線へ制限します。二つの固有関数の初期データは比例するので、その比例を引けば初期値が両方 0 の解ができます。ODE2 の初期値一意性で、その差は恒等的に 0 です。

<!-- proof-start -->
### 証明

$u,v$ は同じ $\lambda$ に対して

$$
-(py')'+qy=\lambda wy
$$

を満たします。$p>0$ なので

$$
y''+\frac{p'}p y'+\frac{\lambda w-q}{p}y=0
$$

と書け、係数は連続です。よって ODE2 の初期値一意性を使えます。

左端条件から

$$
(u(a),p(a)u'(a)),
\qquad
(v(a),p(a)v'(a))
$$

は同じ一次元部分空間にあります。固有関数は非零です。もし一方の端点データが $(0,0)$ なら $y(a)=y'(a)=0$ となり、初期値一意性によりその解は恒等的に 0 となって矛盾します。従って両初期データは非零であり、ある $c\in\mathbb C$ が存在して

$$
(u(a),p(a)u'(a))=c(v(a),p(a)v'(a)).
$$

$z=u-cv$ と置けば

$$
z(a)=0,
\qquad
p(a)z'(a)=0.
$$

$p(a)>0$ だから $z'(a)=0$ です。$z$ も同じ二階線形 ODE を満たすので、ODE2 の初期値一意性から $z\equiv0$。従って $u=cv$ です。$\square$
<!-- proof-end -->

ここでは右端条件を使っていません。固定した $\lambda$ に対して、左端の一条件だけで解空間が一次元まで絞られ、右端条件が「その一次元解が通過できる $\lambda$」を選びます。

---

## 10. Dirichlet 条件：正弦系を最初から導く

ここから **三つの標準境界条件の固有値列** を、固有値の符号を省略せず順に導きます。

$[0,L]$ で

$$
-y''=\lambda y,
\qquad
y(0)=y(L)=0
$$

を解きます。$\lambda$ の符号を飛ばさないことが重要です。

### 10.1 $\lambda<0$

$\lambda=-\kappa^2$, $\kappa>0$ と置くと

$$
y''-\kappa^2y=0,
$$

$$
y=A\cosh(\kappa x)+B\sinh(\kappa x).
$$

$y(0)=0$ から $A=0$。さらに

$$
y(L)=B\sinh(\kappa L)=0.
$$

$\sinh(\kappa L)>0$ なので $B=0$ です。非零解はありません。

### 10.2 $\lambda=0$

$y=A+Bx$ です。$y(0)=0$ から $A=0$、$y(L)=0$ から $BL=0$、従って $B=0$。やはり非零解はありません。

### 10.3 $\lambda>0$

$\lambda=k^2$, $k>0$ と置くと

$$
y=A\cos(kx)+B\sin(kx).
$$

$y(0)=0$ から $A=0$。非零解には $B\ne0$ が必要で、$y(L)=0$ から

$$
\sin(kL)=0.
$$

従って

$$
kL=n\pi,
\qquad n=1,2,3,\ldots
$$

です。つまり

$$
\boxed{
\lambda_n=\left(\frac{n\pi}{L}\right)^2,
\qquad
\phi_n(x)=\sin\left(\frac{n\pi x}{L}\right)
}
$$

です。

この正弦系は「Fourier 級数だから突然現れた」のではなく、Dirichlet 境界値問題の固有関数として現れます。

---

## 11. Neumann 条件：定数モードを落とさない

次に

$$
-y''=\lambda y,
\qquad
y'(0)=y'(L)=0
$$

を考えます。

$\lambda<0$ では

$$
y=A\cosh(\kappa x)+B\sinh(\kappa x)
$$

に対し $y'(0)=\kappa B=0$ から $B=0$、$y'(L)=\kappa A\sinh(\kappa L)=0$ から $A=0$ なので非零解はありません。

$\lambda=0$ では $y=A+Bx$、$y'=B$ です。Neumann 条件は $B=0$ だけを要求するため、定数関数 $y=A\ne0$ が残ります。従って

$$
\lambda_0=0,
\qquad
\phi_0(x)=1
$$

は固有対です。

$\lambda=k^2>0$ では

$$
y=A\cos(kx)+B\sin(kx).
$$

$y'(0)=kB=0$ から $B=0$、$y'(L)=-kA\sin(kL)=0$ から

$$
kL=n\pi,
\qquad n=1,2,\ldots
$$

です。従って

$$
\boxed{
\lambda_n=\left(\frac{n\pi}{L}\right)^2,
\qquad
\phi_n(x)=\cos\left(\frac{n\pi x}{L}\right),
\quad n=0,1,2,\ldots
}
$$

となります。Dirichlet では 0 固有値が消え、Neumann では定数モードとして残ります。境界条件が固有値列を変えています。

---

## 12. 混合境界条件：半整数周波数が出る

$$
-y''=\lambda y,
\qquad
y(0)=0,
\qquad
y'(L)=0
$$

を考えます。

$\lambda<0$ と $\lambda=0$ では Dirichlet 側の条件と Neumann 側の条件を順に入れると非零解は残りません。

$\lambda=k^2>0$ では $y(0)=0$ から

$$
y=B\sin(kx).
$$

さらに

$$
y'(L)=Bk\cos(kL)=0.
$$

非零解には

$$
\cos(kL)=0
$$

が必要なので

$$
kL=\left(n+\frac12\right)\pi,
\qquad n=0,1,2,\ldots
$$

です。従って

$$
\boxed{
\lambda_n=\left(\frac{(n+1/2)\pi}{L}\right)^2,
\qquad
\phi_n(x)=\sin\left(\frac{(n+1/2)\pi x}{L}\right)
}
$$

です。

正弦か余弦かだけでなく、整数周波数か半整数周波数かまで境界条件が決めます。

---

## 13. Rayleigh 商：固有値をエネルギー比として読む

Dirichlet 条件では固有値を積分比として表せます。

<a id="thm-ode7-rayleigh"></a>
<!-- formal-statement-start -->
> **定理（Dirichlet 問題の Rayleigh 商）**  
> 正則 Sturm--Liouville 固有値問題

$$
-(py')'+qy=\lambda wy,
\qquad y(a)=y(b)=0
$$

> の固有関数 $y\not\equiv0$ に対して

$$
\boxed{
\lambda=
\frac{\displaystyle\int_a^b\left(p|y'|^2+q|y|^2\right)dx}
{\displaystyle\int_a^bw|y|^2dx}
}
$$

> が成り立つ。
<!-- formal-statement-end -->

<!-- proof-start -->
### 証明

固有値方程式へ $\overline y$ を掛けて積分します。

$$
\int_a^b\left\{-(py')'\overline y+q|y|^2\right\}dx
=
\lambda\int_a^bw|y|^2dx.
$$

第一項を部分積分すると

$$
\int_a^b-(py')'\overline y\,dx
=
\left[-py'\overline y\right]_a^b
+\int_a^bp|y'|^2dx.
$$

Dirichlet 条件 $y(a)=y(b)=0$ により境界項は 0 です。従って

$$
\int_a^b\left(p|y'|^2+q|y|^2\right)dx
=
\lambda\int_a^bw|y|^2dx.
$$

分母は $w>0$ と $y\ne0$ により正なので割ることができ、主張を得ます。$\square$
<!-- proof-end -->

### 仮定から粗い下界を作る

さらに

$$
p(x)\ge p_0>0,
\qquad
q(x)\ge0,
\qquad
0<w(x)\le w_1
$$

とします。$\ell=b-a$ と置くと、$y(a)=0$ から

$$
y(x)=\int_a^xy'(t)dt.
$$

Cauchy--Schwarz により

$$
|y(x)|^2
\le(x-a)\int_a^x|y'(t)|^2dt
\le \ell\int_a^b|y'|^2dt.
$$

$x$ で積分して

$$
\int_a^b|y|^2dx
\le \ell^2\int_a^b|y'|^2dx.
$$

従って

$$
\lambda
\ge
\frac{p_0\int|y'|^2}{w_1\int|y|^2}
\ge
\boxed{\frac{p_0}{w_1\ell^2}}.
$$

最良定数ではありませんが、「正の $p$ が微分エネルギーを持ち上げ、正の $w$ が分母を作る」という機構を前提だけで確認できます。

---

## 14. 共鳴すると、外力にも直交条件が現れる

固有値は斉次問題だけの話ではありません。同じ値で非斉次問題を解こうとすると可解条件が現れます。

<a id="thm-ode7-resonance-compatibility"></a>
<!-- formal-statement-start -->
> **定理（共鳴時の必要可解条件）**  
> $\lambda$ を分離型自己共役 Sturm--Liouville 問題の固有値、$\phi$ をその固有関数とする。同じ境界条件の下で

$$
(L-\lambda w)u=f
$$

> が解 $u$ をもつなら、必ず

$$
\boxed{
\int_a^bf(x)\overline{\phi(x)}\,dx=0
}
$$

> が成り立つ。
<!-- formal-statement-end -->

<!-- proof-start -->
### 証明

$L[\phi]=\lambda w\phi$ です。Lagrange 恒等式へ $u,\phi$ を入れると、同じ境界条件を満たすので境界項は 0 です。従って

$$
0
=\int_a^b\left\{L[u]\overline\phi-u\overline{L[\phi]}\right\}dx.
$$

$(L-\lambda w)u=f$ から $L[u]=\lambda wu+f$、また $\lambda$ は実数なので

$$
\begin{aligned}
0
&=\int_a^b\left\{(\lambda wu+f)\overline\phi-u\lambda w\overline\phi\right\}dx\\
&=\int_a^bf\overline\phi\,dx.
\end{aligned}
$$

これが必要条件です。$\square$
<!-- proof-end -->

### 具体例：$\sin x$ 方向の外力は解けない

$[0,\pi]$ で

$$
-u''-u=f(x),
\qquad
u(0)=u(\pi)=0
$$

を考えます。$L=-d^2/dx^2$, $\lambda=1$ で、$\phi=\sin x$ が固有関数です。

$f=\sin x$ なら

$$
\int_0^\pi f\phi\,dx
=\int_0^\pi\sin^2x\,dx
=\frac\pi2\ne0,
$$

なので解は存在しません。

一方 $f=\sin2x$ なら直交条件を満たし、

$$
u_p=\frac13\sin2x
$$

は

$$
-u_p''-u_p=\sin2x
$$

を満たします。さらに任意の $c$ に対し

$$
u=\frac13\sin2x+c\sin x
$$

も解です。共鳴点では、可解な場合にも斉次固有関数が残るため一意性を失います。

---

## 15. 固有関数展開：直交性だけでは「展開できる」とは言えない

直交する固有関数 $\phi_n$ があり、ある関数 $f$ が

$$
f=\sum_nc_n\phi_n
$$

と展開できると仮定します。両辺と $\phi_m$ の重み付き内積を取れば、直交性から

$$
\langle f,\phi_m\rangle_w
=c_m\langle\phi_m,\phi_m\rangle_w
$$

なので

$$
\boxed{
 c_m=
 \frac{\langle f,\phi_m\rangle_w}
 {\langle\phi_m,\phi_m\rangle_w}
}
$$

です。

ここで論理を二つに分けます。

- **直交性**：異なる固有関数どうしの内積が 0。これは本章で証明済みです。
- **完全性**：必要な関数を固有関数列で近似・展開できる。これは直交性だけからは出ません。

正弦・余弦系の完全性は Fourier 解析の中心定理です。一般の正則 Sturm--Liouville 問題についても、適切な関数空間では固有関数が完全系をなし、固有値が離散的に並んで $+\infty$ へ進むという標準定理があります。しかし、その一般完全性を本章の ODE2 だけから数行で証明することはしません。

**本章の証明境界**：実固有値、直交性、分離型条件での単純性、具体的な Dirichlet/Neumann/混合問題の全固有値、Rayleigh 商、共鳴の必要条件までは本文で閉じました。一般問題の固有値列の存在・離散性・完全性は、後続の Fourier 解析と関数解析側のコンパクト自己共役作用素論で厳密化します。

この停止線を置くことで、「直交したから自動的に基底」という誤った飛躍を避けます。

---

## 16. PDE へどうつながるか

PDE で変数分離

$$
u(t,x)=T(t)X(x)
$$

を行うと、空間側に二点境界値問題が現れます。たとえば固定端の熱方程式では空間側が

$$
-X''=\lambda X,
\qquad
X(0)=X(L)=0
$$

となり、本章の Dirichlet 固有関数

$$
\sin\left(\frac{n\pi x}{L}\right)
$$

が現れます。

役割分担は

$$
\boxed{
\text{ODE7：境界値固有問題を作って理解する}
\longrightarrow
\text{Fourier解析：展開・収束を理解する}
\longrightarrow
\text{PDE：各モードの時間発展を解く}
}
$$

です。

旧 PDE3 にあった Sturm--Liouville の理論部分は本章を正本とし、旧URLは互換ハブとして残します。

---

## 17. 解法・証明の実践フロー

1. 二階方程式を $-(py')'+qy=\lambda wy$ の形へ整理する。
2. $p\in C^1$, $q,w\in C$, $p>0,w>0$ を確認する。
3. 境界条件を端点ごとの $\alpha_1y+\alpha_2py'=0$ の形へ書く。
4. 固有値を具体的に求めるときは $\lambda<0$, $\lambda=0$, $\lambda>0$ を分ける。
5. 一般論では [Lagrange 恒等式](#thm-ode7-lagrange-identity)を出発点にし、境界形式が本当に 0 になることを確認する。
6. 実固有値には $u=v=y$、直交性には異なる固有関数 $u,v$ を代入する。
7. 同じ固有値の単純性には、端点初期データの一次元性と ODE2 の初期値一意性を使う。
8. Dirichlet 固有値の符号や下界には [Dirichlet 問題の Rayleigh 商](#thm-ode7-rayleigh)を使う。
9. 非斉次問題が固有値で共鳴したら、まず外力と固有関数の直交条件を確認する。
10. 「直交」と「完全」を分ける。一般完全性は本章では黒箱境界を越えない。

---

# 演習

## Level A

<a id="ex-ode7-a01"></a>
### ODE7-A01 境界値問題の解の個数
- Level: A

$$
y''+y=0
$$

について、次の境界条件ごとに解が 0 個・1 個・無数個のどれになるか判定し、すべての解を求めよ。

1. $y(0)=0$, $y(\pi)=0$
2. $y(0)=0$, $y(\pi)=1$
3. $y(0)=0$, $y(\pi/2)=2$

<!-- solution-start -->
**詳細解答**

一般解は

$$
y=A\cos x+B\sin x.
$$

どの場合も $y(0)=A=0$ です。

1. $y(\pi)=B\sin\pi=0$ は任意の $B$ で成り立ちます。従って

$$
y=B\sin x\qquad(B\in\mathbb R)
$$

と無数の解があります。

2. $A=0$ なら常に $y(\pi)=B\sin\pi=0$ です。これを 1 にすることはできないため解はありません。

3. $y(\pi/2)=B=2$ なので $B=2$ に一意に決まり、

$$
y=2\sin x
$$

が唯一の解です。

同じ ODE でも、両端条件の組合せで存在・一意性が変わることが確認できました。
<!-- solution-end -->

<a id="ex-ode7-a02"></a>
### ODE7-A02 Robin 条件で境界形式を消す
- Level: A

$p=1$ とし、$u,v$ が端点 $x=0$ で

$$
y(0)+2y'(0)=0
$$

をともに満たすとする。

$$
B_0(u,v)=u(0)\overline{v'(0)}-u'(0)\overline{v(0)}
$$

が 0 になることを、境界条件を直接代入して示せ。

<!-- solution-start -->
**詳細解答**

境界条件から

$$
u(0)=-2u'(0),
\qquad
v(0)=-2v'(0).
$$

係数 2 は実数なので

$$
\overline{v(0)}=-2\overline{v'(0)}.
$$

従って

$$
\begin{aligned}
B_0(u,v)
&=(-2u'(0))\overline{v'(0)}
-u'(0)(-2\overline{v'(0)})\\
&=0.
\end{aligned}
$$

「Robin だから自動的に 0」ではなく、同じ端点一次条件を $u,v$ が共有するため二項が相殺しています。
<!-- solution-end -->

<a id="ex-ode7-a03"></a>
### ODE7-A03 Dirichlet 固有値を三場合から求める
- Level: A

$$
-y''=\lambda y,
\qquad
y(0)=y(2)=0
$$

の固有値と固有関数をすべて求めよ。$\lambda<0$, $\lambda=0$, $\lambda>0$ を省略しないこと。

<!-- solution-start -->
**詳細解答**

$\lambda=-\kappa^2<0$ では

$$
y=A\cosh(\kappa x)+B\sinh(\kappa x).
$$

$y(0)=0$ から $A=0$、$y(2)=B\sinh(2\kappa)=0$ から $B=0$。固有値はありません。

$\lambda=0$ では $y=A+Bx$。$y(0)=0$ から $A=0$、$y(2)=0$ から $2B=0$ なので非零解はありません。

$\lambda=k^2>0$ では

$$
y=A\cos(kx)+B\sin(kx).
$$

$y(0)=0$ から $A=0$。非零解には $B\ne0$ が必要なので

$$
\sin(2k)=0.
$$

従って $2k=n\pi$, $n=1,2,\ldots$ で、

$$
\boxed{
\lambda_n=\left(\frac{n\pi}{2}\right)^2,
\qquad
\phi_n(x)=\sin\left(\frac{n\pi x}{2}\right)
}
$$

です。
<!-- solution-end -->

<a id="ex-ode7-a04"></a>
### ODE7-A04 正弦固有関数の直交性を積分で確認する
- Level: A

整数 $m\ne n$, $m,n\ge1$ に対し

$$
\int_0^\pi\sin(mx)\sin(nx)\,dx=0
$$

を積和公式から直接示せ。また $m=n$ のときの値も求めよ。

<!-- solution-start -->
**詳細解答**

積和公式

$$
2\sin(mx)\sin(nx)
=\cos((m-n)x)-\cos((m+n)x)
$$

を使います。$m\ne n$ なら

$$
\begin{aligned}
2\int_0^\pi\sin(mx)\sin(nx)dx
&=\left[\frac{\sin((m-n)x)}{m-n}
-\frac{\sin((m+n)x)}{m+n}\right]_0^\pi\\
&=0,
\end{aligned}
$$

なので積分は 0 です。

$m=n$ では

$$
\sin^2(nx)=\frac{1-\cos(2nx)}2
$$

から

$$
\int_0^\pi\sin^2(nx)dx
=\frac\pi2.
$$

従って正規化すれば $\sqrt{2/\pi}\sin(nx)$ が長さ 1 の直交系になります。
<!-- solution-end -->

## Level B

<a id="ex-ode7-b01"></a>
### ODE7-B01 Neumann と混合境界条件の固有値列
- Level: B

$[0,L]$ で $-y''=\lambda y$ を考える。

1. $y'(0)=y'(L)=0$ の固有値・固有関数をすべて求めよ。
2. $y(0)=0$, $y'(L)=0$ の固有値・固有関数をすべて求めよ。
3. 0 固有値がどちらに現れるか、その理由を境界条件から説明せよ。

<!-- solution-start -->
**詳細解答**

**1. Neumann 条件**

$\lambda<0$ では $y=A\cosh(\kappa x)+B\sinh(\kappa x)$。$y'(0)=\kappa B=0$ から $B=0$、$y'(L)=\kappa A\sinh(\kappa L)=0$ から $A=0$ です。

$\lambda=0$ では $y=A+Bx$、$y'=B$ なので $B=0$。$A\ne0$ を許すため $\lambda_0=0$, $\phi_0=1$ が固有対です。

$\lambda=k^2>0$ では $y=A\cos kx+B\sin kx$。$y'(0)=kB=0$ から $B=0$、$y'(L)=-Ak\sin(kL)=0$ より

$$
kL=n\pi,
\qquad n=1,2,\ldots
$$

です。まとめて

$$
\lambda_n=\left(\frac{n\pi}{L}\right)^2,
\qquad
\phi_n=\cos\left(\frac{n\pi x}{L}\right),
\quad n=0,1,2,\ldots
$$

となります。

**2. 混合条件**

$\lambda<0,0$ では非零解は残りません。$\lambda=k^2>0$ では $y(0)=0$ から $y=B\sin kx$。$y'(L)=Bk\cos(kL)=0$ より

$$
kL=\left(n+\frac12\right)\pi,
\qquad n=0,1,2,\ldots
$$

です。従って

$$
\lambda_n=\left(\frac{(n+1/2)\pi}{L}\right)^2,
\qquad
\phi_n=\sin\left(\frac{(n+1/2)\pi x}{L}\right).
$$

**3. 0 固有値**

$\lambda=0$ の解は $A+Bx$。Neumann 条件は傾き $B=0$ だけを要求するため定数解が残ります。混合条件では $y(0)=0$ がさらに $A=0$ を要求するため、非零定数解も消えます。
<!-- solution-end -->

<a id="ex-ode7-b02"></a>
### ODE7-B02 固有値の単純性を初期値一意性から再構成する
- Level: B

正則 Sturm--Liouville 問題で左端条件が

$$
\alpha_1y(a)+\alpha_2p(a)y'(a)=0,
\qquad
(\alpha_1,\alpha_2)\ne(0,0)
$$

であるとする。同じ固有値 $\lambda$ に属する二つの固有関数 $u,v$ が比例することを、Wronskian の定理を引用せず ODE2 の初期値一意性から証明せよ。

<!-- solution-start -->
**詳細解答**

$p(a)>0$ なので、初期データを

$$
Y_u=(u(a),p(a)u'(a)),
\qquad
Y_v=(v(a),p(a)v'(a))
$$

と書いても $(y(a),y'(a))$ と同じ情報を持ちます。

左端条件は

$$
\alpha_1z_1+\alpha_2z_2=0
$$

という一本の斉次一次方程式です。係数対が $(0,0)$ でないため、その解集合は一次元です。従って $Y_u,Y_v$ は比例します。

また $Y_u=(0,0)$ なら $u(a)=u'(a)=0$ であり、連続係数二階線形 ODE の初期値一意性から $u\equiv0$ となって固有関数に反します。$Y_v$ も同様です。よってある $c$ が存在して $Y_u=cY_v$ です。

$z=u-cv$ と置くと

$$
z(a)=z'(a)=0
$$

で、$z$ は同じ方程式を満たします。初期値一意性により $z\equiv0$、従って $u=cv$ です。
<!-- solution-end -->

<a id="ex-ode7-b03"></a>
### ODE7-B03 Rayleigh 商から固有値の下界を出す
- Level: B

$[0,L]$ で

$$
-(p(x)y')'+q(x)y=\lambda w(x)y,
\qquad y(0)=y(L)=0
$$

を考える。$p(x)\ge2$, $q(x)\ge0$, $0<w(x)\le3$ とする。本章で示した評価だけを使って、任意の固有値が

$$
\lambda\ge\frac{2}{3L^2}
$$

を満たすことを示せ。

<!-- solution-start -->
**詳細解答**

[Dirichlet 問題の Rayleigh 商](#thm-ode7-rayleigh)から

$$
\lambda
=\frac{\int_0^L(p|y'|^2+q|y|^2)dx}
{\int_0^Lw|y|^2dx}.
$$

仮定 $p\ge2$, $q\ge0$, $w\le3$ より

$$
\lambda
\ge
\frac{2\int_0^L|y'|^2dx}
{3\int_0^L|y|^2dx}.
$$

$y(0)=0$ なので

$$
y(x)=\int_0^xy'(t)dt.
$$

Cauchy--Schwarz により

$$
|y(x)|^2
\le x\int_0^x|y'(t)|^2dt
\le L\int_0^L|y'|^2dt.
$$

$x\in[0,L]$ で積分すると

$$
\int_0^L|y|^2dx
\le L^2\int_0^L|y'|^2dx.
$$

従って

$$
\lambda
\ge
\frac{2}{3L^2}.
$$

固有関数は非零で Dirichlet 条件を満たすため $\int|y'|^2>0$ であり、途中で 0 除算は起こりません。
<!-- solution-end -->

## Level C

<a id="ex-ode7-c01"></a>
### ODE7-C01 共鳴する非斉次境界値問題
- Level: C

$[0,\pi]$ で

$$
-u''-u=f(x),
\qquad
u(0)=u(\pi)=0
$$

を考える。

1. 解が存在するなら $\int_0^\pi f(x)\sin x\,dx=0$ が必要であることを、本章の [Lagrange 恒等式](#thm-ode7-lagrange-identity)から導け。
2. $f(x)=\sin x$ には解がないことを示せ。
3. $f(x)=\sin2x$ には解が存在することを確認し、すべての解を求めよ。
4. 3 で一意性が失われる理由を、斉次問題の固有関数と結び付けて説明せよ。

<!-- solution-start -->
**詳細解答**

**1. 必要条件**

$L=-d^2/dx^2$, $w=1$, $\lambda=1$ と見ます。$\phi(x)=\sin x$ は

$$
L[\phi]=\phi,
\qquad
\phi(0)=\phi(\pi)=0
$$

を満たす固有関数です。

解 $u$ が存在すると仮定します。[Lagrange 恒等式](#thm-ode7-lagrange-identity)で $u$ と $\phi$ を使うと、Dirichlet 条件により境界項は 0 です。

$$
0
=\int_0^\pi\{L[u]\phi-uL[\phi]\}dx.
$$

方程式 $L[u]-u=f$、すなわち $L[u]=u+f$ と $L[\phi]=\phi$ を代入すると

$$
0
=\int_0^\pi\{(u+f)\phi-u\phi\}dx
=\int_0^\pi f(x)\sin x\,dx.
$$

従ってこの直交条件は必要です。

**2. $f=\sin x$**

$$
\int_0^\pi\sin^2x\,dx=\frac\pi2\ne0.
$$

必要条件を破るので解は存在しません。

**3. $f=\sin2x$**

まず

$$
\int_0^\pi\sin2x\sin x\,dx=0
$$

なので必要条件を満たします。特解を $u_p=A\sin2x$ と置くと

$$
-u_p''-u_p
=4A\sin2x-A\sin2x
=3A\sin2x.
$$

従って $A=1/3$ で

$$
u_p=\frac13\sin2x.
$$

これは両端で 0 なので境界条件も満たします。

対応する斉次方程式

$$
-u''-u=0
$$

の Dirichlet 解は $c\sin x$ です。従ってすべての解は

$$
\boxed{
 u(x)=\frac13\sin2x+c\sin x,
 \qquad c\in\mathbb R
}
$$

です。

**4. 一意性が失われる理由**

$\lambda=1$ は斉次 Sturm--Liouville 問題の固有値なので、境界条件を満たす非零斉次解 $\sin x$ が存在します。一つ特解が見つかっても、任意の $c\sin x$ を足して同じ非斉次方程式と境界条件を保てます。したがって共鳴点では逆作用素に相当する一意な解写像を作れません。
<!-- solution-end -->

---

## 章末チェック

- 二点境界値問題では解が 0 個・1 個・無数個になり得る理由を例で説明できる。
- 正則 Sturm--Liouville 問題で $p>0,w>0$ を置く意味を説明できる。
- 分離型境界条件が端点の境界形式を消すことを直接示せる。
- Lagrange 恒等式を導出できる。
- 固有値の実数性と異なる固有値の固有関数の直交性を証明できる。
- 分離型問題の固有値が単純になる理由を ODE の初期値一意性から説明できる。
- Dirichlet・Neumann・混合条件の $-y''=\lambda y$ を $\lambda$ の三場合に分けて解ける。
- Rayleigh 商を導出し、係数仮定から粗い下界を出せる。
- 共鳴時の非斉次問題に直交条件が必要になることを導ける。
- 直交性と完全性を混同せず、一般固有関数展開の証明境界を説明できる。
