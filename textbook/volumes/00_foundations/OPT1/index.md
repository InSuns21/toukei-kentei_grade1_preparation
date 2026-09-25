# OPT1 凸集合・凸関数・凸最適化

<!-- definition-example-audit: strict -->

この章は DREAM THEATER の凸解析・最適化系列の入口です。有限次元の凸性を出発点に、後続の最適化で使う基本構造を一つの流れで組み立てます。

本章では

$$
\boxed{
\text{凸結合・凸集合}
\longrightarrow
\text{凸関数}
\longrightarrow
\text{局所情報から大域最適性}
\longrightarrow
\text{凸最適化}
}
$$

を自立した一講義として閉じ、その上に後続で必要になる **非負結合の幾何**、**準凸性・準凹性**、**経済学で現れる凸選好との違い**まで準備します。

---

## 1. 凸結合・凸集合・凸包

凸性の出発点は、「二点を混ぜた点が集合の中に残る」という幾何です。

<a id="def-opt1-convex-combination"></a>
<!-- formal-statement-start -->
> **定義（凸結合）**  
> 点 $x_1,\dots,x_k\in\mathbb R^n$ と係数 $\theta_1,\dots,\theta_k$ が
>
$$
\theta_i\ge0,\qquad \sum_{i=1}^k\theta_i=1
$$
>
> を満たすとき、
>
$$
\sum_{i=1}^k\theta_i x_i
$$
>
> を $x_1,\dots,x_k$ の **凸結合** という。
<!-- formal-statement-end -->

2点の場合は

$$
(1-t)x+ty,\qquad 0\le t\le1
$$

で、$x$ と $y$ を結ぶ線分上の点です。

<a id="def-opt1-convex-set"></a>
<!-- formal-statement-start -->
> **定義（凸集合）**  
> 集合 $C\subset\mathbb R^n$ が凸であるとは、任意の $x,y\in C$ と $0\le t\le1$ に対して
>
$$
(1-t)x+ty\in C
$$
>
> が成り立つことをいう。
<!-- formal-statement-end -->

<!-- definition-example-start: def-opt1-convex-combination, def-opt1-convex-set -->
**定義の確認**：半空間と円周

半空間

$$
H=\{x\in\mathbb R^n:a^{\mathsf T}x\le b\}
$$

を考えます。$x,y\in H$ なら

$$
a^{\mathsf T}\bigl((1-t)x+ty\bigr)
=(1-t)a^{\mathsf T}x+t a^{\mathsf T}y
\le b
$$

なので、任意の凸結合が $H$ に残ります。したがって $H$ は凸です。

一方、円周

$$
S^1=\{x\in\mathbb R^2:\|x\|=1\}
$$

では $(1,0),(-1,0)\in S^1$ ですが中点 $(0,0)\notin S^1$ です。よって円周は凸ではありません。
<!-- definition-example-end -->

<a id="def-opt1-convex-hull"></a>
<!-- formal-statement-start -->
> **定義（凸包）**  
> 集合 $S\subset\mathbb R^n$ を含む凸集合のうち包含関係で最小のものを $S$ の **凸包** といい、$\operatorname{conv}(S)$ と書く。
<!-- formal-statement-end -->

<a id="prop-opt1-finite-convex-hull"></a>
<!-- formal-statement-start -->
> **命題（有限集合の凸包）**  
> $S=\{x_1,\dots,x_m\}\subset\mathbb R^n$ とする。このとき
>
$$
\operatorname{conv}(S)
=
\left\{
\sum_{i=1}^m\theta_i x_i:
\theta_i\ge0,\quad
\sum_{i=1}^m\theta_i=1
\right\}.
$$
<!-- formal-statement-end -->

### 証明の見取り図

右辺を $D$ と置きます。$D$ 自身が凸で $S$ を含むことを示せば、凸包の最小性から $\operatorname{conv}(S)\subseteq D$。逆向きは、$S$ を含む任意の凸集合が有限凸結合をすべて含むことから従います。

<!-- proof-start -->
### 証明

右辺の集合を $D$ とします。まず $x_j$ は係数 $\theta_j=1$、他を0とすれば $D$ に入るので

$$
S\subseteq D.
$$

次に

$$
u=\sum_i\alpha_i x_i,\qquad
v=\sum_i\beta_i x_i
$$

を $D$ の二点、$0\le t\le1$ とします。このとき

$$
(1-t)u+tv
=
\sum_i\bigl((1-t)\alpha_i+t\beta_i\bigr)x_i.
$$

各係数は非負で、その総和は

$$
(1-t)\sum_i\alpha_i+t\sum_i\beta_i
=
1.
$$

従って $(1-t)u+tv\in D$ であり、$D$ は凸です。よって $S$ を含む最小の凸集合である $\operatorname{conv}(S)$ について

$$
\operatorname{conv}(S)\subseteq D.
$$

逆に、$C$ を $S$ を含む任意の凸集合とします。$C$ が有限凸結合に閉じていることを、項数について帰納法で確認します。1項ならその点は $C$ に属します。$m$ 項の場合、$\theta_m=1$ なら凸結合は $x_m\in C$ です。$\theta_m<1$ なら

$$
y=
\sum_{i=1}^{m-1}
\frac{\theta_i}{1-\theta_m}x_i
$$

と置きます。係数は非負で総和1なので、帰納法の仮定から $y\in C$ です。従って

$$
\sum_{i=1}^m\theta_i x_i
=
(1-\theta_m)y+\theta_m x_m
\in C.
$$

よって $D\subseteq C$。これは $S$ を含むすべての凸集合で成り立つため

$$
D\subseteq\operatorname{conv}(S).
$$

以上から $D=\operatorname{conv}(S)$ です。$\square$
<!-- proof-end -->

<!-- definition-example-start: def-opt1-convex-hull -->
**定義の確認**：二点の凸包

$S=\{0,2\}\subset\mathbb R$ なら、凸結合は

$$
(1-t)0+t2=2t,\qquad0\le t\le1
$$

なので

$$
\operatorname{conv}\{0,2\}=[0,2].
$$

つまり凸包は、元の集合を凸にするために必要な線分をすべて補ったものです。
<!-- definition-example-end -->

### 1.1 凸集合の共通部分

凸集合族 $\{C_\lambda\}_{\lambda\in\Lambda}$ に対し

$$
\bigcap_{\lambda\in\Lambda}C_\lambda
$$

も凸です。実際、$x,y$ が共通部分に属すれば、各 $\lambda$ について $x,y\in C_\lambda$ です。各 $C_\lambda$ の凸性により $(1-t)x+ty\in C_\lambda$ がすべての $\lambda$ で成り立つので、凸結合は共通部分にも属します。

この単純な事実が、複数の凸制約を同時に課しても実行可能集合が凸に保たれる理由になります。

---

## 2. 非負倍と凸結合

凸包では係数の総和を1に固定しました。分離定理や Farkas の補題へ進むには、今度は「非負倍を自由に許す」集合が必要になります。

<a id="def-opt1-convex-cone"></a>
<!-- formal-statement-start -->
> **定義（錐・凸錐）**  
> 空でない集合 $K\subset\mathbb R^n$ が、任意の $x\in K$ と $\alpha\ge0$ に対して

$$
\alpha x\in K
$$

> を満たすとき、$K$ を **錐** という。さらに $K$ が凸集合でもあるとき、$K$ を **凸錐** という。これは、任意の $x,y\in K$ と $\alpha,\beta\ge0$ に対して

$$
\alpha x+\beta y\in K
$$

> が成り立つことと同値である。
<!-- formal-statement-end -->

この同値性も確認しておきます。$K$ が錐かつ凸なら、$\alpha+\beta>0$ のとき

$$
\alpha x+\beta y
=
(\alpha+\beta)
\left(
\frac{\alpha}{\alpha+\beta}x
+
\frac{\beta}{\alpha+\beta}y
\right)
\in K.
$$

$\alpha=\beta=0$ のときは、錐の定義で $0\in K$ なので同じ結論です。逆に、すべての $\alpha,\beta\ge0$ について $\alpha x+\beta y\in K$ なら、$\beta=0$ として非負倍への閉性が得られ、$\alpha=1-t$, $\beta=t$ として凸性が得られます。

凸集合では係数の総和を1に固定しますが、凸錐では非負係数の大きさに制限がありません。

<!-- definition-example-start: def-opt1-convex-cone -->
**定義の確認**：非負直交象限

$$
K=\mathbb R_+^2
=
\{(x_1,x_2):x_1\ge0,\ x_2\ge0\}
$$

を考えます。

$x=(x_1,x_2),y=(y_1,y_2)\in K$、$\alpha,\beta\ge0$ なら

$$
\alpha x+\beta y
=
(\alpha x_1+\beta y_1,\,
 \alpha x_2+\beta y_2).
$$

各成分は非負なので

$$
\alpha x+\beta y\in K.
$$

したがって $\mathbb R_+^2$ は定義を直接満たす凸錐です。

一方、

$$
\{x\in\mathbb R^2:x_1+x_2=1,\ x_1,x_2\ge0\}
$$

は凸集合ですが凸錐ではありません。点を2倍すると座標和が2になり、集合から出るからです。
<!-- definition-example-end -->

凸包と凸錐の違いは、係数条件だけ見れば明瞭です。

$$
\begin{array}{c|c}
\text{凸包} & \theta_i\ge0,\ \sum_i\theta_i=1\\
\hline
\text{凸錐が生成する集合} & \theta_i\ge0
\end{array}
$$

この差が OPT2 で扱う Farkas の補題で効きます。

---

## 3. 凸関数・狭義凸関数・Hessian 判定

集合の凸性が「線分が集合から出ない」ことなら、関数の凸性は「グラフが弦より上へ飛び出さない」ことです。

<a id="def-opt1-convex-function"></a>
<!-- formal-statement-start -->
> **定義（凸関数）**  
> 凸集合 $C$ 上の関数 $f:C\to\mathbb R$ が凸であるとは、任意の $x,y\in C$ と $0\le t\le1$ に対して
>
$$
f((1-t)x+ty)
\le
(1-t)f(x)+tf(y)
$$
>
> が成り立つことをいう。
<!-- formal-statement-end -->

<a id="def-opt1-strictly-convex"></a>
<!-- formal-statement-start -->
> **定義（狭義凸関数）**  
> 凸集合 $C$ 上の関数 $f:C\to\mathbb R$ が狭義凸であるとは、任意の異なる $x,y\in C$ と $0<t<1$ に対して
>
$$
f((1-t)x+ty)
<
(1-t)f(x)+tf(y)
$$
>
> が成り立つことをいう。
<!-- formal-statement-end -->

<!-- definition-example-start: def-opt1-convex-function, def-opt1-strictly-convex -->
**定義の確認**：$f(x)=x^2$

$$
(1-t)x^2+ty^2-\bigl((1-t)x+ty\bigr)^2
=
t(1-t)(x-y)^2.
$$

右辺は常に非負なので $x^2$ は凸です。さらに $x\ne y$、$0<t<1$ なら右辺は正なので、$x^2$ は狭義凸です。
<!-- definition-example-end -->

<a id="thm-opt1-hessian-convexity"></a>
<!-- formal-statement-start -->
> **定理（Hessian による凸性判定）**  
> $U\subset\mathbb R^d$ を開凸集合、$f\in C^2(U)$ とする。このとき
>
$$
f\text{ が凸}
\iff
\nabla^2f(x)\succeq0
\qquad(\forall x\in U).
$$
<!-- formal-statement-end -->

### 証明の見取り図

多変数関数を任意の直線へ制限し、1変数の二階微分判定へ落とします。Hessian の二次形式

$$
v^{\mathsf T}\nabla^2f(x)v
$$

が、方向 $v$ に沿った二階微分そのものです。

<!-- proof-start -->
### 証明

まず $f$ が凸であるとします。$x\in U$、$v\in\mathbb R^d$ を固定し、$x+tv\in U$ となる開区間で

$$
\phi(t)=f(x+tv)
$$

と置きます。$f$ の凸性から $\phi$ は1変数の凸関数です。十分小さい $h>0$ に対して凸性を中点 $0=(h+(-h))/2$ へ適用すると

$$
2\phi(0)\le\phi(h)+\phi(-h).
$$

従って

$$
\frac{\phi(h)-2\phi(0)+\phi(-h)}{h^2}\ge0.
$$

$h\downarrow0$ とすると $\phi\in C^2$ より左辺は $\phi''(0)$ へ収束するため

$$
\phi''(0)\ge0.
$$

連鎖律により

$$
\phi''(0)
=
v^{\mathsf T}\nabla^2f(x)v.
$$

任意の $v$ で非負なので $\nabla^2f(x)\succeq0$ です。

逆に、すべての $x\in U$ で $\nabla^2f(x)\succeq0$ とします。任意の $x,y\in U$ に対し

$$
\psi(t)=f((1-t)x+ty),
\qquad0\le t\le1
$$

と置きます。$U$ は凸なので線分全体が $U$ に入り、

$$
\psi''(t)
=
(y-x)^{\mathsf T}
\nabla^2f((1-t)x+ty)
(y-x)
\ge0.
$$

従って $\psi'$ は単調非減少です。$0<t<1$ に対し平均値の定理を区間 $[0,t]$ と $[t,1]$ へ適用すると、ある $\xi\in(0,t)$、$\eta\in(t,1)$ が存在して

$$
\frac{\psi(t)-\psi(0)}{t}=\psi'(\xi)
\le
\psi'(\eta)
=
\frac{\psi(1)-\psi(t)}{1-t}.
$$

これを整理すると

$$
\psi(t)
\le
(1-t)\psi(0)+t\psi(1).
$$

すなわち

$$
f((1-t)x+ty)
\le
(1-t)f(x)+tf(y).
$$

したがって $f$ は凸です。$\square$
<!-- proof-end -->

### 3.1 狭義凸と Hessian 正定値は同値ではない

$$
\nabla^2f(x)\succ0\quad(\forall x)
$$

なら狭義凸ですが、逆は一般には成り立ちません。

例えば

$$
f(x)=x^4
$$

を考えます。導関数

$$
f'(x)=4x^3
$$

は $\mathbb R$ 上で狭義単調増加です。$x<z<y$ とし、平均値の定理を $[x,z]$ と $[z,y]$ に適用すると、ある $\xi\in(x,z)$、$\eta\in(z,y)$ が存在して

$$
\frac{f(z)-f(x)}{z-x}
=
f'(\xi)
<
f'(\eta)
=
\frac{f(y)-f(z)}{y-z}.
$$

ここで $z=(1-t)x+ty$ と置いて整理すると

$$
f((1-t)x+ty)
<
(1-t)f(x)+tf(y)
$$

となるので、$f$ は狭義凸です。一方で

$$
f''(0)=0.
$$

この例は、「狭義凸だから Hessian が全点で正定値」と短絡してはいけないことを示します。

---

## 4. 凸より弱いが最適化に十分なことがある：準凸・準凹

凸関数は強い条件です。しかし最小化問題では、関数値そのものが弦の下にあることより、

> ある高さ以下の点を集めた集合が凸である

ことだけで十分な場面があります。

<a id="def-opt1-quasiconvex"></a>
<!-- formal-statement-start -->
> **定義（準凸関数・準凹関数）**  
> 凸集合 $C$ 上の関数 $f:C\to\mathbb R$ が準凸であるとは、任意の $x,y\in C$ と $0\le t\le1$ に対して
$$
f((1-t)x+ty)
\le
\max\{f(x),f(y)\}
$$
> が成り立つことをいう。  
> $f$ が準凹であるとは、$-f$ が準凸であることをいう。すなわち
$$
f((1-t)x+ty)
\ge
\min\{f(x),f(y)\}
$$
> が成り立つことをいう。
<!-- formal-statement-end -->

凸関数なら

$$
(1-t)f(x)+tf(y)
\le
\max\{f(x),f(y)\}
$$

なので準凸です。しかし逆は成り立ちません。

<!-- definition-example-start: def-opt1-quasiconvex -->
**定義の確認**：$f(x)=x^3$

$f(x)=x^3$ は $\mathbb R$ 上で単調増加です。

$x\le y$ とすると

$$
x\le(1-t)x+ty\le y
$$

なので単調性から

$$
f(x)
\le
f((1-t)x+ty)
\le
f(y).
$$

したがって

$$
f((1-t)x+ty)
\le
\max\{f(x),f(y)\}
$$

かつ

$$
f((1-t)x+ty)
\ge
\min\{f(x),f(y)\}.
$$

よって $x^3$ は準凸かつ準凹です。

一方

$$
f''(x)=6x
$$

は負にも正にもなるので、$x^3$ は $\mathbb R$ 全体では凸でも凹でもありません。

つまり

$$
\boxed{
\text{準凸・準凹}
\text{ は }
\text{凸・凹}
\text{ より弱い}
}
$$

ことを具体的に確認できます。
<!-- definition-example-end -->

---

## 5. 準凸性を集合の凸性として読む

準凸性は「高さ $\alpha$ 以下の領域」が凸であることと同値です。

<a id="thm-opt1-quasiconvex-sublevel"></a>
<!-- formal-statement-start -->
> **定理（準凸性の下位集合による特徴付け）**  
> 凸集合 $C\subset\mathbb R^n$ 上の関数 $f:C\to\mathbb R$ について、次は同値である。
>
> 1. $f$ は準凸である。
> 2. 任意の $\alpha\in\mathbb R$ に対して
$$
L_\alpha=\{x\in C:f(x)\le\alpha\}
$$
> は凸集合である。
<!-- formal-statement-end -->

この定理は、最小化で準凸性が自然な理由を示します。ある候補値 $\alpha$ 以下を達成できる点の集合が、常に凸だからです。

### 証明の見取り図

準凸性から集合の凸性を示す向きでは、$x,y\in L_\alpha$ を取り、

$$
\max\{f(x),f(y)\}\le\alpha
$$

を準凸不等式へ入れます。

逆向きでは

$$
\alpha=\max\{f(x),f(y)\}
$$

と選べば、$x,y$ が同じ $L_\alpha$ に入り、その線分も $L_\alpha$ に残ります。

<!-- proof-start -->
### 証明

まず $f$ が準凸であるとします。

任意の $\alpha\in\mathbb R$ と $x,y\in L_\alpha$ を取ります。すると

$$
f(x)\le\alpha,\qquad
f(y)\le\alpha.
$$

したがって任意の $0\le t\le1$ に対し、準凸性から

$$
\begin{aligned}
f((1-t)x+ty)
&\le
\max\{f(x),f(y)\}\\
&\le\alpha.
\end{aligned}
$$

よって

$$
(1-t)x+ty\in L_\alpha
$$

であり、$L_\alpha$ は凸です。

逆に、全ての $L_\alpha$ が凸だとします。

任意の $x,y\in C$ に対し

$$
\alpha=\max\{f(x),f(y)\}
$$

と置きます。このとき

$$
x,y\in L_\alpha.
$$

$L_\alpha$ は凸なので、任意の $0\le t\le1$ に対して

$$
(1-t)x+ty\in L_\alpha.
$$

したがって

$$
f((1-t)x+ty)
\le\alpha
=
\max\{f(x),f(y)\}.
$$

これは準凸性です。以上で同値性が示されました。 $\square$
<!-- proof-end -->

---

<a id="def-opt1-local-global-minimizer"></a>
<!-- formal-statement-start -->
> **定義（局所最小点・大域最小点）**  
> 集合 $C\subset\mathbb R^n$ 上の関数 $f:C\to\mathbb R$ と点 $x^\ast\in C$ を考える。ある $r>0$ が存在し、$\|x-x^\ast\|<r$ を満たすすべての $x\in C$ に対して $f(x^\ast)\le f(x)$ となるとき $x^\ast$ を **局所最小点** という。すべての $x\in C$ に対して $f(x^\ast)\le f(x)$ となるとき $x^\ast$ を **大域最小点** という。
<!-- formal-statement-end -->

この二つは一般には別物です。凸性が入ると、後で証明するように局所最小点が大域最小点へ昇格します。

<!-- definition-example-start: def-opt1-local-global-minimizer -->
### 5.1 $x^2$ の最小点

**定義の確認**：局所最小点・大域最小点

$C=\mathbb R$、$f(x)=x^2$、$x^\ast=0$ とします。任意の $x\in\mathbb R$ に対して

$$
f(x^\ast)=0\le x^2=f(x)
$$

なので、$x^\ast=0$ は大域最小点です。

また、例えば $r=1$ と取れば、$|x-x^\ast|<1$ を満たすすべての $x\in C$ に対して同じ不等式

$$
f(x^\ast)\le f(x)
$$

が成り立ちます。したがって $x^\ast=0$ は局所最小点でもあります。

この例では大域最小点なら局所最小点でもあることを定義から直接確認できます。逆向きは一般には成り立たず、その失敗例は §7.1 で扱います。
<!-- definition-example-end -->

---

## 6. 微分可能な凸関数では勾配が大域情報を持つ

一般の微分可能関数では、勾配は局所情報です。凸関数では一次近似で得られる affine 関数が全領域で関数を下から支えるため、勾配が大域情報へ変わります。

<a id="thm-opt1-first-order-convexity"></a>
<!-- formal-statement-start -->
> **定理（微分可能な凸関数の一次支持不等式）**  
> $C\subset\mathbb R^d$ を開凸集合、$f:C\to\mathbb R$ を微分可能な凸関数とする。このとき任意の $x,y\in C$ に対して
>
$$
f(y)
\ge
f(x)+\nabla f(x)^{\mathsf T}(y-x)
$$
>
> が成り立つ。
<!-- formal-statement-end -->

### 証明の見取り図

$x$ から $y$ へ向かう線分に制限し、

$$
g(t)=f(x+t(y-x))
$$

という1変数凸関数を考えます。凸性から割線の傾きが右微分以上になることを使います。

<!-- proof-start -->
### 証明

$0<t\le1$ に対し、凸性から

$$
g(t)
\le
(1-t)g(0)+tg(1).
$$

したがって

$$
\frac{g(t)-g(0)}{t}
\le
g(1)-g(0).
$$

$t\downarrow0$ とすると、微分可能性により

$$
g'(0)
=
\nabla f(x)^{\mathsf T}(y-x)
\le
f(y)-f(x).
$$

整理して

$$
f(y)
\ge
f(x)+\nabla f(x)^{\mathsf T}(y-x)
$$

を得ます。$\square$
<!-- proof-end -->

特に $\nabla f(x^\ast)=0$ なら、任意の $y\in C$ に対して

$$
f(y)\ge f(x^\ast)
$$

なので $x^\ast$ は大域最小点です。

---

## 7. 局所最小が大域最小になる仕組み

<a id="thm-opt1-local-global"></a>
<!-- formal-statement-start -->
> **定理（凸関数の局所最小は大域最小）**  
> 凸集合 $C$ 上の凸関数 $f:C\to\mathbb R$ では、任意の局所最小点は大域最小点である。
<!-- formal-statement-end -->

### 証明の見取り図

より良い点 $y$ が一つでもあれば、$x^\ast$ と $y$ を結ぶ線分上に $x^\ast$ へ任意に近い改善点ができます。実行可能集合の凸性が「改善点までの線分が残る」ことを、関数の凸性が「線分上で値が改善する」ことを担当します。

<!-- proof-start -->
### 証明

$x^\ast$ が局所最小だが大域最小でないと仮定します。するとある $y\in C$ が存在して

$$
f(y)<f(x^\ast).
$$

$0<t<1$ に対し

$$
z_t=(1-t)x^\ast+ty
$$

と置きます。$C$ は凸なので $z_t\in C$ です。また関数の凸性から

$$
\begin{aligned}
f(z_t)
&\le
(1-t)f(x^\ast)+tf(y)\\
&<
(1-t)f(x^\ast)+tf(x^\ast)\\
&=
f(x^\ast).
\end{aligned}
$$

一方 $t\downarrow0$ なら $z_t\to x^\ast$ です。したがって $x^\ast$ の任意に小さい近傍に、より小さい値を持つ実行可能点が存在します。これは局所最小性に矛盾します。よって $x^\ast$ は大域最小です。$\square$
<!-- proof-end -->

### 7.1 失敗例：実行可能集合が非凸だと何が壊れるか

$$
C=[0,1]\cup[2,3],
\qquad
f(x)=x
$$

を考えます。$f$ は affine なので凸ですが、$C$ は凸ではありません。

$x=2$ は $C$ に相対的な近傍では局所最小ですが、

$$
f(0)=0<2=f(2)
$$

なので大域最小ではありません。

元の証明で壊れたのは

$$
(1-t)2+t0\in C
$$

という部分です。実際、線分は $(1,2)$ の穴へ入ります。

---

## 8. 狭義凸なら最小点は一つしかない

<a id="thm-opt1-strict-unique"></a>
<!-- formal-statement-start -->
> **定理（狭義凸関数の最小点の一意性）**  
> 凸集合 $C$ 上の狭義凸関数 $f:C\to\mathbb R$ が最小点を持つなら、その最小点は一意である。
<!-- formal-statement-end -->

存在は別問題です。この定理が言うのは、

> 最小点が存在したなら二つ以上には分かれない

という一意性だけです。

### 証明の見取り図

二つの異なる最小点 $x^\ast,y^\ast$ があると仮定します。中点は凸集合に残りますが、狭義凸性によりその関数値は二つの最小値よりさらに小さくなり、最小性に矛盾します。

<!-- proof-start -->
### 証明

異なる二つの最小点 $x^\ast,y^\ast\in C$ が存在すると仮定します。

共通の最小値を $m$ とすると

$$
f(x^\ast)=f(y^\ast)=m.
$$

$C$ は凸なので中点

$$
z=\frac{x^\ast+y^\ast}{2}
$$

も $C$ に属します。

$x^\ast\ne y^\ast$ と狭義凸性から

$$
\begin{aligned}
f(z)
&<
\frac12f(x^\ast)+\frac12f(y^\ast)\\
&=
m.
\end{aligned}
$$

しかし $m$ は最小値なので $f(z)<m$ は不可能です。したがって最小点は一意です。 $\square$
<!-- proof-end -->

ここでも、狭義凸性は **存在** を保証していません。

例えば

$$
f(x)=e^x
\quad\text{on}\quad
\mathbb R
$$

は狭義凸ですが、

$$
\inf_{x\in\mathbb R}e^x=0
$$

を達成する点はありません。

---

## 9. 凸最適化問題では実行可能集合も凸になる

<a id="def-opt1-convex-optimization"></a>
<!-- formal-statement-start -->
> **定義（凸最適化問題）**  
> $f,g_1,\dots,g_m:\mathbb R^n\to\mathbb R$ を凸関数、$A\in\mathbb R^{p\times n}$、$b\in\mathbb R^p$ とする。このとき
>
$$
\min_{x\in\mathbb R^n} f(x)
$$
>
> subject to
>
$$
g_i(x)\le0,\qquad i=1,\dots,m,
$$
>
$$
Ax=b
$$
>
> の形の問題を **凸最適化問題** という。
<!-- formal-statement-end -->

<!-- definition-example-start: def-opt1-convex-optimization -->
**定義の確認**：

$$
\min_{x_1,x_2}
\quad
x_1^2+2x_2^2
$$

subject to

$$
x_1+x_2=1,\qquad x_1\ge0,\qquad x_2\ge0
$$

を考えます。目的関数の Hessian は

$$
\begin{pmatrix}
2&0\\
0&4
\end{pmatrix}\succ0
$$

なので凸です。不等式は $-x_1\le0$、$-x_2\le0$ と書け、どちらも affine、等式制約も affine です。したがって定義どおり凸最適化問題です。
<!-- definition-example-end -->

<a id="prop-opt1-convex-feasible"></a>
<!-- formal-statement-start -->
> **命題（凸最適化問題の実行可能集合は凸）**  
> 凸関数 $g_1,\dots,g_m:\mathbb R^n\to\mathbb R$、$A\in\mathbb R^{p\times n}$、$b\in\mathbb R^p$ に対し
>
$$
C=
\{x:g_i(x)\le0\ (i=1,\dots,m),\ Ax=b\}
$$
>
> と置く。このとき $C$ は凸集合である。
<!-- formal-statement-end -->

### 証明の見取り図

実行可能な二点の凸結合を作ります。不等式制約は各 $g_i$ の凸性で保存され、等式制約は線形性で保存されます。

<!-- proof-start -->
### 証明

$x,y\in C$、$0\le t\le1$ とし

$$
z=(1-t)x+ty
$$

と置きます。各 $i$ について

$$
\begin{aligned}
g_i(z)
&\le
(1-t)g_i(x)+tg_i(y)\\
&\le0.
\end{aligned}
$$

また

$$
Az=(1-t)Ax+tAy=b.
$$

したがって $z\in C$ です。よって $C$ は凸です。$\square$
<!-- proof-end -->

先ほどの具体例では実行可能集合は閉線分です。目的関数は狭義凸なので、最小点が存在すれば一意です。具体的な最小点の存在と値は演習 OPT1-C01 で制約を代入して直接確認します。

---

## 10. 「凸選好」と「凸関数」は同じではない

後のミクロ経済学で重要なので、ここで言葉だけ先に分離します。

経済学で「凸選好」というと、二つの消費束 $x,y$ がどちらも十分好ましいなら、その混合

$$
(1-t)x+ty
$$

も十分好ましい、という性質を指します。

効用関数 $u$ で表すなら自然に現れるのは

$$
u((1-t)x+ty)
\ge
\min\{u(x),u(y)\},
$$

すなわち **準凹性** です。

したがって

$$
\boxed{
\text{凸選好}
\quad\text{と}\quad
\text{凸関数}
\text{ は別概念}
}
$$

です。

最大化問題では凹関数・準凹関数が自然であり、最小化問題では凸関数・準凸関数が自然です。

例えば

$$
u(x_1,x_2)=\sqrt{x_1}+\sqrt{x_2}
\qquad(x_1,x_2\ge0)
$$

は凹関数なので準凹です。したがって効用の高い側を混ぜても、元の二点の悪い方より効用が下がらないという構造を持ちます。

この区別を保ったまま、MICRO 系列では消費者最適化へ進みます。

---

## 11. 何が凸性のおかげなのか

ここまでの役割を整理します。

$$
\boxed{
\begin{array}{c}
\text{凸集合}\\
\Downarrow\\
\text{二点を結ぶ改善経路が実行可能}
\end{array}
}
$$

$$
\boxed{
\begin{array}{c}
\text{凸関数}\\
\Downarrow\\
\text{弦より下、接平面より上}\\
\Downarrow\\
\text{局所条件が大域条件へ}
\end{array}
}
$$

$$
\boxed{
\begin{array}{c}
\text{狭義凸}\\
\Downarrow\\
\text{最小点が存在すれば一意}
\end{array}
}
$$

$$
\boxed{
\begin{array}{c}
\text{準凸}\\
\Downarrow\\
\text{各候補値以下の領域が凸}
\end{array}
}
$$

後続章では、この幾何を「集合を分離する超平面」と「最適性を表す乗数」へ発展させます。

---

## 12. 演習 Level A

<a id="ex-opt1-a01"></a>
### OPT1-A01 凸集合を定義から判定する

- Level: A

次の集合が凸かどうか判定せよ。

$$
C_1=\{(x,y):x+2y\le3\},
$$

$$
C_2=\{(x,y):x^2+y^2\le1\},
$$

$$
C_3=\{(x,y):x^2+y^2=1\}.
$$

<!-- solution-start -->
#### 詳細解答

$C_1$ は半空間です。$p,q\in C_1$、$0\le t\le1$ とすると

$$
(1,2)^{\mathsf T}\bigl((1-t)p+tq\bigr)
=
(1-t)(1,2)^{\mathsf T}p
+t(1,2)^{\mathsf T}q
\le3,
$$

なので $C_1$ は凸です。

$C_2$ は単位円板です。$p,q\in C_2$ とすると $\|p\|^2\le1$、$\|q\|^2\le1$ です。内積を展開すると

$$
\begin{aligned}
\|(1-t)p+tq\|^2
&=(1-t)\|p\|^2+t\|q\|^2
-t(1-t)\|p-q\|^2\\
&\le
(1-t)\|p\|^2+t\|q\|^2\\
&\le1.
\end{aligned}
$$

従って $(1-t)p+tq\in C_2$ であり、定義から $C_2$ は凸です。

$C_3$ は円周です。

$$
(1,0),(-1,0)\in C_3
$$

ですが、その中点

$$
\frac12(1,0)+\frac12(-1,0)=(0,0)
$$

は $C_3$ に属しません。よって $C_3$ は凸ではありません。
<!-- solution-end -->

<a id="ex-opt1-a02"></a>
### OPT1-A02 凸錐を判定する

- Level: A

次の二集合について、凸集合か、凸錐かをそれぞれ判定せよ。

$$
K_1=\mathbb R_+^2,
$$

$$
K_2=\{(x_1,x_2):x_1+x_2=1,\ x_1,x_2\ge0\}.
$$

<!-- solution-start -->
#### 詳細解答

$K_1$ について、$x,y\in K_1$、$\alpha,\beta\ge0$ なら各成分について

$$
\alpha x_j+\beta y_j\ge0
$$

なので

$$
\alpha x+\beta y\in K_1.
$$

したがって $K_1$ は凸錐です。特に $\alpha+\beta=1$ の場合も閉じているので凸集合でもあります。

$K_2$ は線分です。$x,y\in K_2$、$0\le t\le1$ なら

$$
(1,1)^{\mathsf T}\bigl((1-t)x+ty\bigr)=1
$$

で各成分も非負なので凸です。

しかし $x=(1,0)\in K_2$ に対し

$$
2x=(2,0)
$$

は座標和が2なので $K_2$ に属しません。したがって $K_2$ は凸錐ではありません。
<!-- solution-end -->

<a id="ex-opt1-a03"></a>
### OPT1-A03 準凸だが凸でない関数

- Level: A

$f(x)=x^3$ が $\mathbb R$ 上で準凸であることを示し、凸ではないことも確認せよ。

<!-- solution-start -->
#### 詳細解答

$f(x)=x^3$ は単調増加です。任意の $x,y$ について、必要なら $x\le y$ と順序を入れ替えます。

$0\le t\le1$ なら

$$
x\le(1-t)x+ty\le y
$$

なので

$$
x^3
\le
\bigl((1-t)x+ty\bigr)^3
\le
y^3.
$$

したがって

$$
f((1-t)x+ty)
\le
\max\{f(x),f(y)\},
$$

よって $f$ は準凸です。

一方、$x=-1$、$y=0$、$t=1/2$ とすると、中点は $-1/2$ です。

$$
f\left(-\frac12\right)=-\frac18,
$$

ですが、両端の関数値の平均は

$$
\frac12 f(-1)+\frac12 f(0)=-\frac12.
$$

凸関数なら左辺が右辺以下でなければなりません。しかし

$$
-\frac18>-\frac12
$$

なので凸不等式が破れます。したがって $f(x)=x^3$ は $\mathbb R$ 上で凸ではありません。
<!-- solution-end -->

<a id="ex-opt1-a04"></a>
### OPT1-A04 凸最適化問題かどうか

- Level: A

次の問題が凸最適化問題であることを確認せよ。

$$
\min_{x_1,x_2}
\quad
x_1^2+2x_2^2
$$

subject to

$$
x_1+x_2=1,\qquad
x_1\ge0,\qquad
x_2\ge0.
$$

<!-- solution-start -->
#### 詳細解答

目的関数

$$
f(x_1,x_2)=x_1^2+2x_2^2
$$

の Hessian は

$$
\nabla^2f
=
\begin{pmatrix}
2&0\\
0&4
\end{pmatrix}.
$$

これは正定値なので、特に半正定値であり $f$ は凸です。

不等式制約は

$$
-x_1\le0,\qquad -x_2\le0
$$

と書けます。どちらも affine 関数なので凸です。

等式制約

$$
x_1+x_2=1
$$

も affine です。

したがって目的関数と不等式制約が凸、等式制約が affine という条件を満たし、この問題は凸最適化問題です。
<!-- solution-end -->

---

## 13. 演習 Level B

<a id="ex-opt1-b01"></a>
### OPT1-B01 凸集合族の共通部分と三角形の凸包

- Level: B

次の二問に答えよ。

1. 任意個の凸集合族 $\{C_\lambda\}_{\lambda\in\Lambda}$ に対し
   $$
   C=\bigcap_{\lambda\in\Lambda}C_\lambda
   $$
   が凸集合であることを証明せよ。
2. $S=\{(0,0),(1,0),(0,1)\}$ とする。[有限集合の凸包](#prop-opt1-finite-convex-hull)の命題を用いて
   $$
   \operatorname{conv}(S)
   =
   \{(u,v):u\ge0,\ v\ge0,\ u+v\le1\}
   $$
   を示せ。

<!-- solution-start -->
#### 詳細解答

$x,y\in C$ とします。

共通部分の定義から、任意の $\lambda\in\Lambda$ に対して

$$
x,y\in C_\lambda.
$$

各 $C_\lambda$ は凸なので、任意の $0\le t\le1$ に対し

$$
(1-t)x+ty\in C_\lambda.
$$

これは全ての $\lambda$ について成り立つため

$$
(1-t)x+ty
\in
\bigcap_{\lambda\in\Lambda}C_\lambda
=
C.
$$

よって $C$ は凸です。

次に $S=\{(0,0),(1,0),(0,1)\}$ を考えます。[有限集合の凸包](#prop-opt1-finite-convex-hull)の命題から、$(u,v)\in\operatorname{conv}(S)$ であることは、ある $\theta_0,\theta_1,\theta_2\ge0$ が存在して

$$
\theta_0+\theta_1+\theta_2=1,
$$

$$
(u,v)
=
\theta_0(0,0)+\theta_1(1,0)+\theta_2(0,1)
=
(\theta_1,\theta_2)
$$

と書けることと同値です。従って

$$
u=\theta_1\ge0,\qquad
v=\theta_2\ge0,
$$

かつ

$$
u+v
=
\theta_1+\theta_2
=
1-\theta_0
\le1.
$$

逆に $u\ge0$, $v\ge0$, $u+v\le1$ なら

$$
\theta_1=u,\qquad
\theta_2=v,\qquad
\theta_0=1-u-v
$$

と置けば三係数は非負で総和1です。従って $(u,v)$ は $S$ の凸結合です。以上から

$$
\boxed{
\operatorname{conv}(S)
=
\{(u,v):u\ge0,\ v\ge0,\ u+v\le1\}.
}
$$

この結果により、凸集合族の共通部分と有限凸結合による凸包表示の両方を具体的に使えました。
<!-- solution-end -->

<a id="ex-opt1-b02"></a>
### OPT1-B02 下位集合から準凸性を判定する

- Level: B

$f(x)=|x|$ について

$$
L_\alpha=\{x\in\mathbb R:|x|\le\alpha\}
$$

を全ての $\alpha\in\mathbb R$ について求め、下位集合による特徴付けから $f$ が準凸であることを示せ。

<!-- solution-start -->
#### 詳細解答

まず $\alpha<0$ なら $|x|\ge0$ なので

$$
L_\alpha=\varnothing.
$$

空集合は凸です。

次に $\alpha\ge0$ なら

$$
|x|\le\alpha
\iff
-\alpha\le x\le\alpha.
$$

したがって

$$
L_\alpha=[-\alpha,\alpha].
$$

区間は凸集合です。

以上より、全ての $\alpha\in\mathbb R$ で $L_\alpha$ は凸です。したがって [準凸性の下位集合による特徴付け](#thm-opt1-quasiconvex-sublevel)から $f(x)=|x|$ は準凸です。

実際 $f$ は凸でもありますが、この問題では関数値の凸不等式を直接使わず、集合の凸性から準凸性を判定しました。
<!-- solution-end -->

<a id="ex-opt1-b03"></a>
### OPT1-B03 正定値二次形式の一意最小性

- Level: B

対称正定値行列 $Q\in\mathbb R^{n\times n}$ と $c\in\mathbb R^n$ に対し

$$
f(x)=\frac12x^{\mathsf T}Qx+c^{\mathsf T}x
$$

を考える。

1. $f$ が狭義凸であることを示せ。
2. 凸集合 $C$ 上で $f$ が最小点を持つなら、その最小点が一意であることを示せ。

<!-- solution-start -->
#### 詳細解答

まず $x\ne y$、$0<t<1$ とします。

二次形式を展開すると

$$
\begin{aligned}
&(1-t)f(x)+tf(y)-f((1-t)x+ty)\\
&=
\frac12t(1-t)(x-y)^{\mathsf T}Q(x-y).
\end{aligned}
$$

$Q\succ0$ なので $x-y\ne0$ に対し

$$
(x-y)^{\mathsf T}Q(x-y)>0.
$$

また $t(1-t)>0$ です。したがって

$$
f((1-t)x+ty)
<
(1-t)f(x)+tf(y),
$$

よって $f$ は狭義凸です。

次に $C$ が凸で、$f$ が $C$ 上で最小点を持つとします。前半で $f$ は狭義凸だと分かったので、[狭義凸関数の最小点の一意性](#thm-opt1-strict-unique)を適用できます。

したがって最小点は一意です。

ここでは正定値性が「存在」を保証したのではありません。正定値性から狭義凸性を得て、その結果として「存在するなら一意」と結論しています。
<!-- solution-end -->

---

## 14. 演習 Level C

<a id="ex-opt1-c01"></a>
### OPT1-C01 凸性だけで二変数問題を最後まで解く

- Level: C

次の最適化問題を考える。

$$
\min_{x_1,x_2}
\quad
(x_1-1)^2+2(x_2-2)^2
$$

subject to

$$
x_1+x_2=2,\qquad
x_1\ge0,\qquad
x_2\ge0.
$$

1. この問題が凸最適化問題であることを示せ。
2. 最小点が存在すれば一意であることを示せ。
3. KKT を使わずに最小点と最小値を求めよ。
4. 得られた点が大域最小である理由を、凸性から説明せよ。

<!-- solution-start -->
#### 詳細解答

目的関数を

$$
f(x_1,x_2)
=
(x_1-1)^2+2(x_2-2)^2
$$

と置きます。

Hessian は

$$
\nabla^2f
=
\begin{pmatrix}
2&0\\
0&4
\end{pmatrix}
\succ0.
$$

したがって $f$ は狭義凸であり、特に凸です。

制約は affine 等式

$$
x_1+x_2=2
$$

と affine 不等式

$$
-x_1\le0,\qquad -x_2\le0
$$

なので、この問題は凸最適化問題です。

実行可能集合は

$$
C=\{(x_1,x_2):x_1+x_2=2,\ x_1,x_2\ge0\}
$$

で、端点 $(0,2)$、$(2,0)$ を結ぶ凸集合です。$f$ は狭義凸なので、**最小点が存在すれば一意**です。

ここでは存在を別定理へ預けず、次の一変数化で実際に最小点を構成します。等式制約から

$$
x_2=2-x_1
$$

とします。非負条件より

$$
0\le x_1\le2.
$$

目的関数は

$$
\begin{aligned}
\varphi(x_1)
&=
(x_1-1)^2
+2((2-x_1)-2)^2\\
&=
(x_1-1)^2+2x_1^2\\
&=
3x_1^2-2x_1+1.
\end{aligned}
$$

微分すると

$$
\varphi'(x_1)=6x_1-2.
$$

したがって停留点は

$$
x_1^\ast=\frac13.
$$

これは区間 $[0,2]$ の内部にあります。

よって

$$
x_2^\ast
=
2-\frac13
=
\frac53.
$$

最小値は

$$
\begin{aligned}
f(x^\ast)
&=
\left(\frac13-1\right)^2
+
2\left(\frac53-2\right)^2\\
&=
\frac49+2\frac19\\
&=
\frac69\\
&=
\frac23.
\end{aligned}
$$

したがって

$$
\boxed{
x^\ast=
\left(\frac13,\frac53\right),
\qquad
\min f=\frac23
}.
$$

最後に大域最小性を確認します。

$\varphi$ は凸関数であり、停留点 $x_1^\ast=1/3$ が実行可能区間の内部にあります。凸関数では停留点は大域最小です。

あるいは元の二変数問題で、目的関数と実行可能集合がともに凸なので、近傍内で最小となる実行可能点は全実行可能点の中でも最小です。

さらに狭義凸性から、その最小点は一意です。
<!-- solution-end -->

---

## 15. 次に進む

本章では「凸性が局所情報を大域情報へ変える」仕組みを整えました。

次の OPT2 では、閉凸集合への射影から出発し、集合を超平面で分ける幾何と Farkas の補題へ進みます。そこで凸錐が線形不等式の可解性を記述する道具として再登場します。
