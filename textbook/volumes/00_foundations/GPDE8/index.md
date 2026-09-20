# GPDE8：二階線形楕円型 PDE — 係数の仮定を energy estimate へ翻訳する

<!-- definition-example-audit: strict -->

GPDE7 では、実 Hilbert 空間上の変分問題

$$
a(u,v)=F(v)
\qquad
(\forall v\in V)
$$

について、

$$
\text{boundedness}+\text{coercivity}
\Longrightarrow
\text{存在・一意性・安定性}
$$

を Lax--Milgram 定理として証明しました。

本章では、その抽象定理を二階線形楕円型 PDE

$$
-\operatorname{div}(A(x)\nabla u)
+b(x)\cdot\nabla u
+c(x)u
=f
$$

へ戻します。

ここで重要なのは「Lax--Milgram を使う」とだけ言わないことです。

係数に置く仮定を、一つずつ

$$
\boxed{
\text{係数の仮定}
\longrightarrow
\text{双線形形式の評価}
\longrightarrow
\text{PDE の存在・一意性}
}
$$

へ翻訳します。

特に役割は次のように分かれます。

- $A$ の有界性：主部の boundedness を与える。
- $A$ の一様楕円性：主部の正の energy を与える。
- $b,c$ の有界性：下位項を $H_0^1$ norm で評価できるようにする。
- $b,c$ の符号・大きさ・微分構造：coercivity が残るかを決める。
- Poincare 不等式：$L^2$ norm を勾配 norm へ戻す。
- Lax--Milgram：得られた boundedness と coercivity を存在・一意性へ変える。

さらに後半では Neumann 問題を扱い、

$$
\boxed{
\text{coercivity が失われた}
\neq
\text{問題が解けない}
}
$$

ことも確認します。

純 Neumann 問題では定数関数が kernel に残るため、適切なのは

- 互換条件
- 平均ゼロ部分空間
- 定数を除いた一意性

です。

---

## 1. divergence form を主役にする理由

二階線形作用素には、たとえば

$$
-\sum_{i,j=1}^d a_{ij}(x)\partial_{ij}u
$$

という non-divergence form と、

$$
-\operatorname{div}(A(x)\nabla u)
$$

という divergence form があります。

本章では後者を主役にします。

理由は弱形式との相性です。

十分滑らかな $u,v$ について、$v=0$ on $\partial\Omega$ なら

$$
\int_\Omega
-\operatorname{div}(A\nabla u)\,v\,dx
=
\int_\Omega
A\nabla u\cdot\nabla v\,dx.
$$

右辺には $u$ の二階微分が現れません。

したがって $u\in H_0^1(\Omega)$ でも意味を持ちます。

これが

$$
\text{二階 PDE}
\longrightarrow
\text{一階弱微分だけを要求する変分問題}
$$

という GPDE6 の機構です。

<a id="def-gpde8-divergence-operator"></a>

<!-- formal-statement-start -->
> **定義（本章で扱う divergence form 二階線形作用素）**  
> $\Omega\subset\mathbb R^d$ を開集合とする。行列値係数
>
> $$
> A(x)=(a_{ij}(x))_{i,j=1}^d,
> $$
>
> ベクトル値係数 $b(x)\in\mathbb R^d$、スカラー係数 $c(x)\in\mathbb R$ に対し
>
> $$
> Lu
> =
> -\operatorname{div}(A\nabla u)
> +b\cdot\nabla u
> +cu
> $$
>
> を本章の二階線形作用素と呼ぶ。
<!-- formal-statement-end -->

本章の零 Dirichlet 問題は

$$
Lu=f
\quad\text{in }\Omega,
\qquad
u=0
\quad\text{on }\partial\Omega
$$

です。

---

## 2. 一様楕円性は「全方向で主部が正」という条件

有限次元の二次形式

$$
\xi^{\mathsf T}A\xi
$$

を思い出します。

PDE では係数 $A=A(x)$ が場所ごとに変わるので、各点で正であるだけでは不十分です。

正の下限が $x$ によらず共通に取れることが必要です。

<a id="def-gpde8-uniform-ellipticity"></a>

<!-- formal-statement-start -->
> **定義（一様楕円性）**  
> 可測な行列値関数 $A:\Omega\to\mathbb R^{d\times d}$ が一様楕円的であるとは、ある定数 $\lambda>0$ が存在して、ほとんどすべての $x\in\Omega$ とすべての $\xi\in\mathbb R^d$ に対して
>
> $$
> \boxed{
> \xi^{\mathsf T}A(x)\xi
> \ge
> \lambda|\xi|^2
> }
> $$
>
> が成り立つことをいう。
<!-- formal-statement-end -->

### 最小例：異方的でも楕円的

$$
A=
\begin{pmatrix}
4&0\\
0&1
\end{pmatrix}
$$

なら

$$
\xi^{\mathsf T}A\xi
=
4\xi_1^2+\xi_2^2
\ge
|\xi|^2.
$$

したがって $\lambda=1$ で一様楕円的です。

方向によって拡散の強さが違っても、どの方向にも正の拡散が残っています。

### 非対称でもよい

$$
A=
\begin{pmatrix}
2&1\\
-1&1
\end{pmatrix}
$$

なら

$$
\xi^{\mathsf T}A\xi
=
2\xi_1^2+\xi_2^2.
$$

反対称部分は

$$
\xi^{\mathsf T}
\frac{A-A^{\mathsf T}}2
\xi
=
0
$$

なので、対角評価には寄与しません。

従って

$$
\xi^{\mathsf T}A\xi
\ge
|\xi|^2.
$$

GPDE7 と同じく、存在一意性のために対称性そのものは必要ありません。

---

## 3. 弱形式を導く

まず滑らかな $u$ が

$$
-\operatorname{div}(A\nabla u)
+b\cdot\nabla u
+cu
=f
$$

を満たすとします。

$v\in C_c^\infty(\Omega)$ を掛けて積分すると

$$
\int_\Omega
-\operatorname{div}(A\nabla u)\,v\,dx
+
\int_\Omega
(b\cdot\nabla u)v\,dx
+
\int_\Omega
cuv\,dx
=
\int_\Omega
fv\,dx.
$$

主部だけ部分積分して

$$
\int_\Omega
A\nabla u\cdot\nabla v\,dx
+
\int_\Omega
(b\cdot\nabla u)v\,dx
+
\int_\Omega
cuv\,dx
=
\int_\Omega
fv\,dx.
$$

そこで

$$
a(u,v)
=
\int_\Omega
A\nabla u\cdot\nabla v\,dx
+
\int_\Omega
(b\cdot\nabla u)v\,dx
+
\int_\Omega
cuv\,dx
$$

と置きます。

<a id="def-gpde8-dirichlet-weak-solution"></a>

<!-- formal-statement-start -->
> **定義（零 Dirichlet 問題の変分弱解）**  
> $\Omega\subset\mathbb R^d$ を有界開集合とし、$A,b,c$ は後述の boundedness 条件を満たすとする。$F\in H^{-1}(\Omega)=(H_0^1(\Omega))^*$ に対し、$u\in H_0^1(\Omega)$ が
>
> $$
> \boxed{
> \int_\Omega
> A\nabla u\cdot\nabla v\,dx
> +
> \int_\Omega
> (b\cdot\nabla u)v\,dx
> +
> \int_\Omega
> cuv\,dx
> =
> F(v)
> }
> $$
>
> をすべての $v\in H_0^1(\Omega)$ について満たすとき、$u$ を $Lu=F$ の零 Dirichlet 変分弱解と呼ぶ。
<!-- formal-statement-end -->

境界条件は式の右端に追加されるのではなく、

$$
u\in H_0^1(\Omega)
$$

という試行空間へ組み込まれています。

---

## 4. まず boundedness を係数から作る

以後 $\Omega$ を有界開集合とし、

$$
\|v\|_V
=
\|\nabla v\|_{L^2(\Omega)},
\qquad
V=H_0^1(\Omega)
$$

とします。

GPDE4 の Poincare 不等式により、ある $C_P>0$ が存在して

$$
\|v\|_2
\le
C_P\|\nabla v\|_2
=
C_P\|v\|_V
$$

です。

行列係数には

$$
|A(x)\xi|
\le
\Lambda|\xi|
$$

を仮定します。

たとえば各成分が $L^\infty$ なら、次元に依存する $\Lambda$ を取れます。

<a id="prop-gpde8-boundedness"></a>

<!-- formal-statement-start -->
> **命題（係数の $L^\infty$ 有界性から双線形形式の boundedness）**  
> $\Omega\subset\mathbb R^d$ を有界開集合とし、Poincare 定数を $C_P$ とする。ほとんどすべての $x\in\Omega$ で
>
> $$
> |A(x)\xi|
> \le
> \Lambda|\xi|
> \qquad
> (\forall \xi\in\mathbb R^d)
> $$
>
> を満たし、
>
> $$
> b\in L^\infty(\Omega;\mathbb R^d),
> \qquad
> c\in L^\infty(\Omega)
> $$
>
> とする。このとき
>
> $$
> a(u,v)
> =
> \int_\Omega A\nabla u\cdot\nabla v
> +
> \int_\Omega (b\cdot\nabla u)v
> +
> \int_\Omega cuv
> $$
>
> は $V=H_0^1(\Omega)$ 上の bounded bilinear form であり、
>
> $$
> \boxed{
> |a(u,v)|
> \le
> M\|u\|_V\|v\|_V
> }
> $$
>
> ただし
>
> $$
> M
> =
> \Lambda
> +
> C_P\|b\|_\infty
> +
> C_P^2\|c\|_\infty
> $$
>
> と取れる。
<!-- formal-statement-end -->

### 証明の見取り図

三つの項をそれぞれ Cauchy--Schwarz と Poincare で評価します。

主部は勾配同士なので Poincare は不要です。

一次項では $v$ の $L^2$ norm を一回、零次項では $u,v$ の $L^2$ norm を二回 Poincare で勾配へ戻します。

<!-- proof-start -->
### 証明

主部について

$$
\begin{aligned}
\left|
\int_\Omega
A\nabla u\cdot\nabla v\,dx
\right|
&\le
\int_\Omega
|A\nabla u|\,|\nabla v|\,dx
\\
&\le
\Lambda
\int_\Omega
|\nabla u|\,|\nabla v|\,dx
\\
&\le
\Lambda
\|\nabla u\|_2
\|\nabla v\|_2.
\end{aligned}
$$

一次項について

$$
\begin{aligned}
\left|
\int_\Omega
(b\cdot\nabla u)v\,dx
\right|
&\le
\|b\|_\infty
\|\nabla u\|_2
\|v\|_2
\\
&\le
C_P\|b\|_\infty
\|u\|_V
\|v\|_V.
\end{aligned}
$$

零次項について

$$
\begin{aligned}
\left|
\int_\Omega
cuv\,dx
\right|
&\le
\|c\|_\infty
\|u\|_2
\|v\|_2
\\
&\le
C_P^2\|c\|_\infty
\|u\|_V
\|v\|_V.
\end{aligned}
$$

三つを足して

$$
|a(u,v)|
\le
\left(
\Lambda
+
C_P\|b\|_\infty
+
C_P^2\|c\|_\infty
\right)
\|u\|_V\|v\|_V.
$$

従って主張が得られます。
<!-- proof-end -->

ここでは係数の滑らかさは使っていません。

$L^\infty$ 程度の粗い係数でも弱形式は意味を持ちます。

これは「弱解を使う価値」の一つです。

---

## 5. 一様楕円性だけでは lower-order term を抑え切れない

$a(v,v)$ を直接計算します。

$$
a(v,v)
=
\int_\Omega
A\nabla v\cdot\nabla v
+
\int_\Omega
(b\cdot\nabla v)v
+
\int_\Omega
cv^2.
$$

主部は一様楕円性から

$$
\int_\Omega
A\nabla v\cdot\nabla v
\ge
\lambda\|\nabla v\|_2^2.
$$

しかし一次項と零次項は負になる可能性があります。

そこで

$$
c_-(x)
=
\max\{-c(x),0\}
$$

を $c$ の負部分とします。

すると

$$
c(x)\ge -c_-(x)
$$

なので

$$
\int_\Omega
cv^2
\ge
-\|c_-\|_\infty\|v\|_2^2.
$$

一次項も

$$
\left|
\int_\Omega
(b\cdot\nabla v)v
\right|
\le
\|b\|_\infty
\|\nabla v\|_2
\|v\|_2.
$$

Poincare を使うと

$$
\left|
\int_\Omega
(b\cdot\nabla v)v
\right|
\le
C_P\|b\|_\infty
\|\nabla v\|_2^2
$$

および

$$
\int_\Omega
cv^2
\ge
-C_P^2\|c_-\|_\infty
\|\nabla v\|_2^2.
$$

従って

$$
a(v,v)
\ge
\left(
\lambda
-
C_P\|b\|_\infty
-
C_P^2\|c_-\|_\infty
\right)
\|\nabla v\|_2^2.
$$

<a id="prop-gpde8-small-lower-coercivity"></a>

<!-- formal-statement-start -->
> **命題（下位項の小ささによる coercivity）**  
> 上の boundedness の仮定に加え、$A$ が一様楕円的で
>
> $$
> \xi^{\mathsf T}A(x)\xi
> \ge
> \lambda|\xi|^2
> $$
>
> を満たすとする。さらに
>
> $$
> \boxed{
> \alpha
> :=
> \lambda
> -
> C_P\|b\|_\infty
> -
> C_P^2\|c_-\|_\infty
> >
> 0
> }
> $$
>
> と仮定する。このとき
>
> $$
> \boxed{
> a(v,v)
> \ge
> \alpha\|v\|_V^2
> }
> $$
>
> がすべての $v\in H_0^1(\Omega)$ について成り立つ。
<!-- formal-statement-end -->

<!-- proof-start -->
### 証明

一様楕円性から

$$
\int_\Omega
A\nabla v\cdot\nabla v
\ge
\lambda\|\nabla v\|_2^2.
$$

一次項は

$$
\begin{aligned}
\int_\Omega
(b\cdot\nabla v)v
&\ge
-
\left|
\int_\Omega
(b\cdot\nabla v)v
\right|
\\
&\ge
-
\|b\|_\infty
\|\nabla v\|_2
\|v\|_2
\\
&\ge
-
C_P\|b\|_\infty
\|\nabla v\|_2^2.
\end{aligned}
$$

零次項は

$$
\begin{aligned}
\int_\Omega
cv^2
&\ge
-
\int_\Omega
c_-v^2
\\
&\ge
-
\|c_-\|_\infty
\|v\|_2^2
\\
&\ge
-
C_P^2\|c_-\|_\infty
\|\nabla v\|_2^2.
\end{aligned}
$$

従って

$$
a(v,v)
\ge
\alpha\|\nabla v\|_2^2
=
\alpha\|v\|_V^2.
$$
<!-- proof-end -->

この条件は使いやすい十分条件ですが、必要条件ではありません。

次節でその意味を確認します。

---

## 6. 一次項は大きくても消えることがある

$\Omega=(0,1)$ とし、

$$
Lu
=
-u''
+\beta u'
$$

を考えます。

双線形形式は

$$
a(u,v)
=
\int_0^1 u'v'\,dx
+
\beta\int_0^1 u'v\,dx.
$$

対角に $u=v$ を入れると

$$
\beta\int_0^1 v'v\,dx
=
\frac{\beta}{2}
\int_0^1
(v^2)'\,dx.
$$

$v\in H_0^1(0,1)$ なので trace は両端で 0 です。

従って

$$
\beta\int_0^1 v'v\,dx
=
\frac{\beta}{2}
[v^2]_0^1
=
0.
$$

ゆえに

$$
a(v,v)
=
\int_0^1|v'|^2\,dx.
$$

$\beta$ がどれほど大きくても coercivity 定数は 1 です。

つまり前節の

$$
C_P|\beta|<1
$$

型条件は十分条件にすぎません。

係数の構造を使えば、より鋭い評価が得られます。

---

## 7. $\operatorname{div}b$ を使う coercivity criterion

多次元でも同じ機構があります。

滑らかな $v$ なら

$$
(b\cdot\nabla v)v
=
\frac12
b\cdot\nabla(v^2).
$$

部分積分すると

$$
\int_\Omega
(b\cdot\nabla v)v\,dx
=
-\frac12
\int_\Omega
(\operatorname{div}b)v^2\,dx
$$

です。

零 Dirichlet 条件により境界項は消えます。

この計算は $b\in W^{1,\infty}$ と $v\in H_0^1$ でも、$C_c^\infty$ 近似から正当化できます。

<a id="lem-gpde8-drift-diagonal"></a>

<!-- formal-statement-start -->
> **補題（一次項の対角恒等式）**  
> $\Omega\subset\mathbb R^d$ を有界開集合とし、
>
> $$
> b\in W^{1,\infty}(\Omega;\mathbb R^d).
> $$
>
> このとき任意の $v\in H_0^1(\Omega)$ に対して
>
> $$
> \boxed{
> \int_\Omega
> (b\cdot\nabla v)v\,dx
> =
> -\frac12
> \int_\Omega
> (\operatorname{div}b)v^2\,dx
> }
> $$
>
> が成り立つ。
<!-- formal-statement-end -->

### 証明の見取り図

まず $v\in C_c^\infty(\Omega)$ で積の微分と部分積分を行います。

その後 $H_0^1$ の定義により $C_c^\infty$ 近似列 $v_n\to v$ を取り、$b,\operatorname{div}b\in L^\infty$ を使って各積分を極限へ送ります。

<!-- proof-start -->
### 証明

$v\in C_c^\infty(\Omega)$ なら

$$
2(b\cdot\nabla v)v
=
b\cdot\nabla(v^2).
$$

従って

$$
\int_\Omega
(b\cdot\nabla v)v\,dx
=
\frac12
\int_\Omega
b\cdot\nabla(v^2)\,dx.
$$

$v^2$ は compact support を持つので部分積分から

$$
\int_\Omega
b\cdot\nabla(v^2)\,dx
=
-
\int_\Omega
(\operatorname{div}b)v^2\,dx.
$$

従って恒等式が成り立ちます。

一般の $v\in H_0^1(\Omega)$ に対し、定義から $v_n\in C_c^\infty(\Omega)$ で

$$
v_n\to v
\quad\text{in }H^1(\Omega)
$$

となる列を取ります。

左辺の差は

$$
\int_\Omega
(b\cdot\nabla v_n)v_n
-
\int_\Omega
(b\cdot\nabla v)v
$$

を

$$
\int_\Omega
b\cdot(\nabla v_n-\nabla v)v_n
+
\int_\Omega
(b\cdot\nabla v)(v_n-v)
$$

と分ければ、Cauchy--Schwarz と $b\in L^\infty$ から 0 へ収束します。

右辺も

$$
v_n^2-v^2
=
(v_n-v)(v_n+v)
$$

と書き、

$$
\|v_n^2-v^2\|_1
\le
\|v_n-v\|_2
\|v_n+v\|_2
\to0
$$

なので、$\operatorname{div}b\in L^\infty$ から極限を通せます。

従って一般の $v\in H_0^1$ にも恒等式が成立します。
<!-- proof-end -->

この補題により

$$
a(v,v)
=
\int_\Omega
A\nabla v\cdot\nabla v
+
\int_\Omega
\left(
c-\frac12\operatorname{div}b
\right)v^2\,dx.
$$

従って次が得られます。

<a id="cor-gpde8-structural-coercivity"></a>

<!-- formal-statement-start -->
> **系（一次項の構造を使う coercivity）**  
> $A$ が楕円定数 $\lambda>0$ で一様楕円的、$b\in W^{1,\infty}(\Omega;\mathbb R^d)$、$c\in L^\infty(\Omega)$ とする。さらに
>
> $$
> \boxed{
> c-\frac12\operatorname{div}b
> \ge0
> \quad\text{a.e. in }\Omega
> }
> $$
>
> と仮定する。このとき
>
> $$
> \boxed{
> a(v,v)
> \ge
> \lambda\|\nabla v\|_2^2
> }
> $$
>
> が任意の $v\in H_0^1(\Omega)$ について成り立つ。
<!-- formal-statement-end -->

この条件では $\|b\|_\infty$ の小ささは不要です。

---

## 8. 主定理：一般係数の零 Dirichlet 問題

ここまでで Lax--Milgram の仮定を係数条件へ翻訳できました。

<a id="thm-gpde8-dirichlet-existence"></a>

<!-- formal-statement-start -->
> **定理（二階線形楕円型零 Dirichlet 問題の弱解）**  
> $\Omega\subset\mathbb R^d$ を有界開集合、$V=H_0^1(\Omega)$ とし
>
> $$
> \|v\|_V=\|\nabla v\|_2
> $$
>
> を入れる。係数 $A,b,c$ は
>
> $$
> |A(x)\xi|
> \le
> \Lambda|\xi|,
> \qquad
> \xi^{\mathsf T}A(x)\xi
> \ge
> \lambda|\xi|^2
> $$
>
> をほとんどすべての $x$ とすべての $\xi$ について満たし、
>
> $$
> b\in L^\infty(\Omega;\mathbb R^d),
> \qquad
> c\in L^\infty(\Omega)
> $$
>
> とする。
>
> さらに双線形形式
>
> $$
> a(u,v)
> =
> \int_\Omega A\nabla u\cdot\nabla v
> +
> \int_\Omega (b\cdot\nabla u)v
> +
> \int_\Omega cuv
> $$
>
> が、ある $\alpha>0$ に対して
>
> $$
> a(v,v)\ge\alpha\|v\|_V^2
> \qquad
> (\forall v\in V)
> $$
>
> を満たすとする。たとえば
>
> $$
> \lambda
> -
> C_P\|b\|_\infty
> -
> C_P^2\|c_-\|_\infty
> >0
> $$
>
> はその十分条件である。
>
> このとき任意の $F\in H^{-1}(\Omega)$ に対して一意な $u\in H_0^1(\Omega)$ が存在し
>
> $$
> \boxed{
> a(u,v)=F(v)
> \qquad
> (\forall v\in H_0^1(\Omega))
> }
> $$
>
> を満たす。さらに
>
> $$
> \boxed{
> \|u\|_V
> \le
> \frac1\alpha
> \|F\|_{H^{-1}(\Omega)}
> }
> $$
>
> が成り立つ。
<!-- formal-statement-end -->

### 証明の見取り図

新しい論証はほとんどありません。

本章で確認した係数評価を GPDE7 の Lax--Milgram へ差し込むだけです。

ただし「適切な条件の下で」と隠さず、

$$
\boxed{
A,b,c
\to
M,\alpha
\to
\text{Lax--Milgram}
}
$$

という依存を明示することが重要です。

<!-- proof-start -->
### 証明

命題「係数の $L^\infty$ 有界性から双線形形式の boundedness」により

$$
|a(u,v)|
\le
M\|u\|_V\|v\|_V
$$

です。

仮定から

$$
a(v,v)
\ge
\alpha\|v\|_V^2
$$

です。

$V=H_0^1(\Omega)$ は GPDE4 で導入した Hilbert 空間であり、$F\in V^*$ です。

従って GPDE7 の Lax--Milgram 定理を適用でき、一意な $u\in V$ が存在して

$$
a(u,v)=F(v)
\qquad
(\forall v\in V)
$$

を満たします。

同定理の安定性評価から

$$
\|u\|_V
\le
\alpha^{-1}\|F\|_{V^*}.
$$

$V^*=H^{-1}(\Omega)$ なので主張が得られます。
<!-- proof-end -->

---

## 9. energy estimate は存在定理の副産物ではない

弱解 $u$ の式に $v=u$ を入れます。

$$
a(u,u)
=
F(u).
$$

coercivity と双対 norm の定義から

$$
\alpha\|u\|_V^2
\le
|F(u)|
\le
\|F\|_{V^*}\|u\|_V.
$$

$u\ne0$ なら一つ約して

$$
\|u\|_V
\le
\frac1\alpha
\|F\|_{V^*}.
$$

これは Lax--Milgram の安定性と同じ評価です。

PDE の言葉では a priori energy estimate と呼ばれます。

重要なのは順序です。

$$
\boxed{
\text{解があると仮定}
\to
\text{解に依存しない評価}
}
$$

を先に得ることで、

- 一意性
- データへの連続依存
- 近似解の有界性
- GPDE9 の正則性推定
- GPDE10 の Galerkin 極限

へ進めます。

---

## 10. 負の零次項は本当に coercivity を壊す

$\Omega=(0,\pi)$ で

$$
Lu
=
-u''-\mu u
$$

を考えます。

双線形形式は

$$
a(u,v)
=
\int_0^\pi u'v'\,dx
-
\mu
\int_0^\pi uv\,dx.
$$

$v(x)=\sin x$ を入れると

$$
v'(x)=\cos x
$$

なので

$$
\int_0^\pi |v'|^2\,dx
=
\frac\pi2
$$

かつ

$$
\int_0^\pi |v|^2\,dx
=
\frac\pi2.
$$

したがって

$$
a(v,v)
=
(1-\mu)\frac\pi2.
$$

- $\mu<1$ ならこの方向では正。
- $\mu=1$ なら $a(v,v)=0$。
- $\mu>1$ なら $a(v,v)<0$。

特に $\mu=1$ では

$$
-\sin''x-\sin x=0
$$

なので非零 kernel が現れます。

これは

$$
\boxed{
\text{負の reaction term が主部の energy を食い潰す}
}
$$

という具体例です。

一様楕円性だけでは full operator の coercivity は保証されません。

---

## 11. 係数・外力が変わったときの安定性

同じ PDE を少し変えたとき、解がどれほど動くかを評価します。

$V=H_0^1(\Omega)$ 上の二つの双線形形式 $a_1,a_2$ と右辺 $F_1,F_2$ を考え、

$$
a_i(u_i,v)=F_i(v)
\qquad
(\forall v\in V)
$$

とします。

$a_1$ が coercivity 定数 $\alpha_1>0$ を持つとします。

差 $w=u_1-u_2$ に対して

$$
a_1(w,v)
=
(F_1-F_2)(v)
+
(a_2-a_1)(u_2,v).
$$

$v=w$ とすると

$$
\alpha_1\|w\|_V^2
\le
\|F_1-F_2\|_{V^*}\|w\|_V
+
\|a_2-a_1\|_{\mathrm{op}}
\|u_2\|_V\|w\|_V.
$$

従って

$$
\|u_1-u_2\|_V
\le
\frac1{\alpha_1}
\left(
\|F_1-F_2\|_{V^*}
+
\|a_2-a_1\|_{\mathrm{op}}\|u_2\|_V
\right).
$$

<a id="cor-gpde8-data-stability"></a>

<!-- formal-statement-start -->
> **系（外力・係数摂動に対する安定性）**  
> $a_1,a_2$ を $V$ 上の bounded bilinear form とし、$a_1$ は coercivity 定数 $\alpha_1>0$ を持つとする。$u_i$ が
>
> $$
> a_i(u_i,v)=F_i(v)
> \qquad
> (\forall v\in V)
> $$
>
> を満たすとき
>
> $$
> \boxed{
> \|u_1-u_2\|_V
> \le
> \frac1{\alpha_1}
> \left(
> \|F_1-F_2\|_{V^*}
> +
> \|a_2-a_1\|_{\mathrm{op}}\|u_2\|_V
> \right)
> }
> $$
>
> が成り立つ。
<!-- formal-statement-end -->

<!-- proof-start -->
### 証明

二つの変分方程式の差から

$$
a_1(u_1,v)-a_2(u_2,v)
=
(F_1-F_2)(v).
$$

左辺へ $a_1(u_2,v)$ を足して引くと

$$
a_1(u_1-u_2,v)
+
(a_1-a_2)(u_2,v)
=
(F_1-F_2)(v).
$$

従って

$$
a_1(w,v)
=
(F_1-F_2)(v)
+
(a_2-a_1)(u_2,v).
$$

$v=w$ とし、coercivity と作用素 norm の定義を使えば

$$
\alpha_1\|w\|_V^2
\le
\|F_1-F_2\|_{V^*}\|w\|_V
+
\|a_2-a_1\|_{\mathrm{op}}
\|u_2\|_V\|w\|_V.
$$

$w\ne0$ なら $\|w\|_V$ で割って主張を得ます。

$w=0$ なら不等式は自明です。
<!-- proof-end -->

係数差が

$$
\delta A=A_2-A_1,
\quad
\delta b=b_2-b_1,
\quad
\delta c=c_2-c_1
$$

なら、boundedness の証明と同じ計算から

$$
\|a_2-a_1\|_{\mathrm{op}}
\le
\|\delta A\|_\infty
+
C_P\|\delta b\|_\infty
+
C_P^2\|\delta c\|_\infty
$$

と評価できます。

したがって係数の $L^\infty$ 摂動が小さければ、解の $H_0^1$ 摂動も小さいことが分かります。

---

## 12. Neumann 問題では何が変わるか

純粋な拡散

$$
-\operatorname{div}(A\nabla u)=f
$$

に Neumann 条件を課すとします。

弱形式の主部は

$$
a(u,v)
=
\int_\Omega
A\nabla u\cdot\nabla v\,dx
$$

です。

しかし試行空間は $H_0^1$ ではなく $H^1(\Omega)$ になります。

ここで定数関数 $k$ に対し

$$
\nabla k=0
$$

なので

$$
a(k,k)=0.
$$

一方

$$
\|k\|_{H^1}>0
$$

です。

従って $H^1$ 上では coercive ではありません。

これは事故ではありません。

PDE 自体が

$$
u
\longmapsto
u+\text{constant}
$$

で不変だからです。

### kernel があるなら右辺にも条件が必要

弱形式

$$
a(u,v)=F(v)
\qquad
(\forall v\in H^1(\Omega))
$$

で $v=1$ を取ると

$$
a(u,1)=0
$$

です。

従って必要条件は

$$
\boxed{
F(1)=0
}
$$

です。

これが Neumann 問題の compatibility condition です。

滑らかなデータで

$$
F(v)
=
\int_\Omega fv\,dx
+
\int_{\partial\Omega}g\,\operatorname{Tr}v\,dS
$$

なら

$$
F(1)=0
$$

は

$$
\boxed{
\int_\Omega f\,dx
+
\int_{\partial\Omega}g\,dS
=
0
}
$$

になります。

---

## 13. 平均ゼロ部分空間で coercivity を回復する

$\Omega$ を bounded connected Lipschitz domain とします。

$$
V_0
=
\left\{
v\in H^1(\Omega):
\int_\Omega v\,dx=0
\right\}
$$

と置きます。

この空間では定数方向を除いているので、勾配 norm が再び norm になります。

必要なのが Poincare--Wirtinger 不等式です。

<a id="lem-gpde8-poincare-wirtinger"></a>

<!-- formal-statement-start -->
> **補題（Poincare--Wirtinger）**  
> $\Omega\subset\mathbb R^d$ を bounded connected Lipschitz domain とする。このときある $C_W>0$ が存在して
>
> $$
> \boxed{
> \|v\|_{L^2(\Omega)}
> \le
> C_W\|\nabla v\|_{L^2(\Omega)}
> }
> $$
>
> が、平均ゼロ
>
> $$
> \int_\Omega v\,dx=0
> $$
>
> を満たすすべての $v\in H^1(\Omega)$ に対して成り立つ。
<!-- formal-statement-end -->

### 証明の見取り図

GPDE5 の compactness を使います。

もし不等式が壊れるなら、

$$
\|v_n\|_2=1,
\qquad
\|\nabla v_n\|_2\to0,
\qquad
\int_\Omega v_n=0
$$

という列が作れます。

Rellich--Kondrachov により $L^2$ 強収束する部分列を取り、極限 $v$ は $\nabla v=0$ なので connected domain 上で定数です。

平均ゼロなので $v=0$。

しかし強収束から $\|v\|_2=1$ でもあり矛盾します。

<!-- proof-start -->
### 証明

背理法で示します。

主張が偽なら、各 $n$ に対して平均ゼロの $v_n\in H^1(\Omega)$ を

$$
\|v_n\|_2
>
n\|\nabla v_n\|_2
$$

となるように取れます。

$w_n=v_n/\|v_n\|_2$ と正規化すれば

$$
\|w_n\|_2=1,
\qquad
\|\nabla w_n\|_2<\frac1n,
\qquad
\int_\Omega w_n\,dx=0.
$$

従って $(w_n)$ は $H^1(\Omega)$ で有界です。

bounded Lipschitz domain 上の Rellich--Kondrachov により、部分列を取り直して

$$
w_n\to w
\quad\text{strongly in }L^2(\Omega)
$$

とできます。

さらに $\nabla w_n\to0$ strongly in $L^2$ なので、弱微分の閉性から

$$
\nabla w=0.
$$

connected domain 上で弱勾配が 0 の $H^1$ 関数は a.e. 定数なので

$$
w=C
\quad\text{a.e.}
$$

です。

一方、$L^2$ 強収束から $L^1$ 収束も従うため

$$
\int_\Omega w\,dx
=
\lim_{n\to\infty}
\int_\Omega w_n\,dx
=
0.
$$

従って $C=0$、すなわち $w=0$ です。

しかし $L^2$ 強収束から

$$
\|w\|_2
=
\lim_{n\to\infty}\|w_n\|_2
=
1
$$

であり矛盾です。

従って補題が成り立ちます。
<!-- proof-end -->

---

## 14. Neumann 問題の存在と「定数を除いた一意性」

簡単のため lower-order term は入れず、

$$
a(u,v)
=
\int_\Omega
A\nabla u\cdot\nabla v\,dx
$$

を考えます。

$a$ は $V_0$ 上で bounded です。

一様楕円性から

$$
a(v,v)
\ge
\lambda\|\nabla v\|_2^2.
$$

Poincare--Wirtinger により $\|\nabla v\|_2$ は $V_0$ 上で $H^1$ norm と同値なので、Lax--Milgram を使えます。

<a id="thm-gpde8-neumann"></a>

<!-- formal-statement-start -->
> **定理（純 Neumann 問題の弱解）**  
> $\Omega\subset\mathbb R^d$ を bounded connected Lipschitz domain とし、$A$ は
>
> $$
> |A(x)\xi|\le\Lambda|\xi|,
> \qquad
> \xi^{\mathsf T}A(x)\xi\ge\lambda|\xi|^2
> $$
>
> を満たすとする。
>
> $F\in(H^1(\Omega))^*$ が compatibility condition
>
> $$
> \boxed{
> F(1)=0
> }
> $$
>
> を満たすとする。
>
> このとき平均ゼロ条件
>
> $$
> \int_\Omega u\,dx=0
> $$
>
> を満たす一意な $u\in H^1(\Omega)$ が存在して
>
> $$
> \boxed{
> \int_\Omega
> A\nabla u\cdot\nabla v\,dx
> =
> F(v)
> \qquad
> (\forall v\in H^1(\Omega))
> }
> $$
>
> を満たす。
>
> 平均ゼロ条件を外せば、解は定数加算を除いて一意である。
<!-- formal-statement-end -->

### 証明の見取り図

1. 平均ゼロ空間 $V_0$ で Lax--Milgram を適用する。
2. 任意の $v\in H^1$ を「平均ゼロ部分＋定数」に分解する。
3. 定数部分は左辺では勾配が 0、右辺では $F(1)=0$ により消える。
4. 二つの解の差は energy 0 なので定数になる。

<!-- proof-start -->
### 証明

$$
V_0
=
\left\{
v\in H^1(\Omega):
\int_\Omega v\,dx=0
\right\}
$$

と置きます。

平均を取る写像は $H^1\to\mathbb R$ の連続線形汎関数なので、$V_0$ は閉部分空間です。

従って $V_0$ は Hilbert 空間です。

Poincare--Wirtinger により

$$
\|v\|_{V_0}
=
\|\nabla v\|_2
$$

は $V_0$ 上で $H^1$ norm と同値です。

主部の boundedness から

$$
|a(u,v)|
\le
\Lambda
\|u\|_{V_0}
\|v\|_{V_0}.
$$

一様楕円性から

$$
a(v,v)
\ge
\lambda
\|v\|_{V_0}^2.
$$

また $F$ の $V_0$ への制限は連続です。

従って Lax--Milgram により、一意な $u\in V_0$ が存在して

$$
a(u,v_0)=F(v_0)
\qquad
(\forall v_0\in V_0)
$$

を満たします。

任意の $v\in H^1(\Omega)$ に対し

$$
\bar v
=
\frac1{|\Omega|}
\int_\Omega v\,dx,
\qquad
v_0=v-\bar v
$$

と置けば $v_0\in V_0$ です。

定数 $\bar v$ の勾配は 0 なので

$$
a(u,v)
=
a(u,v_0).
$$

また $F(1)=0$ から

$$
F(v)
=
F(v_0)+\bar v F(1)
=
F(v_0).
$$

従って

$$
a(u,v)=F(v)
$$

が任意の $v\in H^1$ について成り立ちます。

最後に $u_1,u_2$ が二つの解なら $w=u_1-u_2$ は

$$
a(w,v)=0
\qquad
(\forall v\in H^1)
$$

を満たします。

$v=w$ とすると

$$
0
=
a(w,w)
\ge
\lambda\|\nabla w\|_2^2.
$$

従って $\nabla w=0$。

$\Omega$ は connected なので $w$ は a.e. 定数です。

よって解は定数加算を除いて一意です。

平均ゼロ条件を課せばその定数も 0 になります。
<!-- proof-end -->

この章の Dirichlet と Neumann の差は、境界条件の記号の差ではありません。

$$
\boxed{
H_0^1
\text{ では定数方向が消えている}
\quad\text{対して}\quad
H^1
\text{ では定数 kernel が残る}
}
$$

という関数空間の差です。

---

## 15. どの仮定がどこで必要だったか

本章の依存を整理します。

| 仮定 | 使う場所 | 失うと何が起きるか |
|---|---|---|
| $A$ の有界性 | 主部の boundedness | $a(u,v)$ を $H^1$ norm で制御できない |
| 一様楕円性 | 主部の正の energy | 勾配方向の kernel が残り得る |
| $b,c\in L^\infty$ | lower-order term の boundedness | 弱形式自体の連続性が壊れ得る |
| lower-order term の小ささ・符号・構造 | coercivity | 一意性・Lax--Milgram が壊れ得る |
| $\Omega$ 有界 | Poincare | $L^2$ 項を勾配で制御できない |
| connectedness | Neumann の kernel が定数だけ | 成分ごとに独立な定数 kernel が残る |
| $F(1)=0$ | Neumann compatibility | test $v=1$ ですでに矛盾する |
| Lipschitz domain | trace と Rellich / Poincare--Wirtinger の標準形 | 境界値・compactness の扱いに追加議論が必要 |

特に

$$
\text{uniform ellipticity}
\Longrightarrow
\text{full coercivity}
$$

ではありません。

lower-order term を含むなら、その寄与を必ず調べます。

---

## 16. GPDE9 への橋：存在の次は regularity

GPDE8 で得た弱解は

$$
u\in H_0^1(\Omega)
$$

です。

しかし元の PDE には二階微分が書かれていました。

そこで次に問うべきことは

$$
\boxed{
f,A,\partial\Omega
\text{ がもう少し滑らかなら}
\quad
u
\text{ ももう少し滑らかになるか}
}
$$

です。

GPDE9 では

- cutoff function
- difference quotient
- Caccioppoli 型 energy estimate
- interior $H^2$ regularity

を通じて、弱解から正則性を回収します。

GPDE8 の energy estimate は、その入口になります。

---

## 17. 演習

### Level A

#### GPDE8-A01 非対称行列の一様楕円性

$$
A=
\begin{pmatrix}
3&2\\
-2&1
\end{pmatrix}
$$

とする。

1. 任意の $\xi=(\xi_1,\xi_2)^{\mathsf T}$ に対して $\xi^{\mathsf T}A\xi$ を計算せよ。
2. $A$ が一様楕円的であることを示し、楕円定数 $\lambda$ を一つ与えよ。
3. 反対称部分が二次形式に寄与しないことを確認せよ。

<!-- solution-start -->
### 詳細解答

直接計算すると

$$
A\xi
=
\begin{pmatrix}
3\xi_1+2\xi_2\\
-2\xi_1+\xi_2
\end{pmatrix}.
$$

従って

$$
\begin{aligned}
\xi^{\mathsf T}A\xi
&=
\xi_1(3\xi_1+2\xi_2)
+
\xi_2(-2\xi_1+\xi_2)
\\
&=
3\xi_1^2
+
2\xi_1\xi_2
-
2\xi_1\xi_2
+
\xi_2^2
\\
&=
3\xi_1^2+\xi_2^2.
\end{aligned}
$$

よって

$$
\xi^{\mathsf T}A\xi
\ge
\xi_1^2+\xi_2^2
=
|\xi|^2.
$$

したがって $\lambda=1$ と取れます。

次に

$$
\frac{A-A^{\mathsf T}}2
=
\begin{pmatrix}
0&2\\
-2&0
\end{pmatrix}.
$$

任意の反対称行列 $K$ について

$$
\xi^{\mathsf T}K\xi
=
(\xi^{\mathsf T}K\xi)^{\mathsf T}
=
\xi^{\mathsf T}K^{\mathsf T}\xi
=
-\xi^{\mathsf T}K\xi
$$

なので

$$
\xi^{\mathsf T}K\xi=0.
$$

従って一様楕円性は $A$ の対称部分で決まります。
<!-- solution-end -->

#### GPDE8-A02 双線形形式の boundedness 定数

$V=H_0^1(\Omega)$、$\|v\|_V=\|\nabla v\|_2$ とし、Poincare 定数を $C_P$ とする。

$$
|A(x)\xi|\le\Lambda|\xi|,
\quad
\|b\|_\infty\le B,
\quad
\|c\|_\infty\le C
$$

と仮定する。

$$
a(u,v)
=
\int_\Omega A\nabla u\cdot\nabla v
+
\int_\Omega(b\cdot\nabla u)v
+
\int_\Omega cuv
$$

に対して

$$
|a(u,v)|
\le
(\Lambda+BC_P+CC_P^2)
\|u\|_V\|v\|_V
$$

を導け。

<!-- solution-start -->
### 詳細解答

主部は

$$
\begin{aligned}
\left|
\int_\Omega A\nabla u\cdot\nabla v
\right|
&\le
\int_\Omega
|A\nabla u|\,|\nabla v|
\\
&\le
\Lambda
\|\nabla u\|_2
\|\nabla v\|_2
\\
&=
\Lambda
\|u\|_V\|v\|_V.
\end{aligned}
$$

一次項は

$$
\begin{aligned}
\left|
\int_\Omega
(b\cdot\nabla u)v
\right|
&\le
B\|\nabla u\|_2\|v\|_2
\\
&\le
BC_P
\|u\|_V\|v\|_V.
\end{aligned}
$$

零次項は

$$
\begin{aligned}
\left|
\int_\Omega
cuv
\right|
&\le
C\|u\|_2\|v\|_2
\\
&\le
CC_P^2
\|u\|_V\|v\|_V.
\end{aligned}
$$

三式を足せば

$$
|a(u,v)|
\le
(\Lambda+BC_P+CC_P^2)
\|u\|_V\|v\|_V.
$$

主部では Poincare を使わず、一次項で一回、零次項で二回使っていることが係数の形に反映されています。
<!-- solution-end -->

#### GPDE8-A03 lower-order term の小ささ

一様楕円性定数を $\lambda$、Poincare 定数を $C_P$ とする。

$$
\|b\|_\infty=B,
\qquad
\|c_-\|_\infty=C_-
$$

のとき

$$
a(v,v)
\ge
(\lambda-BC_P-C_-C_P^2)
\|\nabla v\|_2^2
$$

を示せ。

さらに

$$
\lambda-BC_P-C_-C_P^2>0
$$

が何を保証するか説明せよ。

<!-- solution-start -->
### 詳細解答

一様楕円性から

$$
\int_\Omega
A\nabla v\cdot\nabla v
\ge
\lambda\|\nabla v\|_2^2.
$$

一次項は絶対値を取って

$$
\begin{aligned}
\int_\Omega
(b\cdot\nabla v)v
&\ge
-
B\|\nabla v\|_2\|v\|_2
\\
&\ge
-
BC_P\|\nabla v\|_2^2.
\end{aligned}
$$

また $c\ge-c_-$ なので

$$
\begin{aligned}
\int_\Omega
cv^2
&\ge
-
C_-\|v\|_2^2
\\
&\ge
-
C_-C_P^2\|\nabla v\|_2^2.
\end{aligned}
$$

従って

$$
a(v,v)
\ge
(\lambda-BC_P-C_-C_P^2)
\|\nabla v\|_2^2.
$$

括弧内を

$$
\alpha
=
\lambda-BC_P-C_-C_P^2
$$

と置けば、$\alpha>0$ のとき

$$
a(v,v)\ge\alpha\|v\|_V^2.
$$

したがって $a$ は coercive です。

boundedness も満たしていれば、Lax--Milgram により任意の $F\in H^{-1}$ に対する弱解の存在一意性と

$$
\|u\|_V
\le
\alpha^{-1}\|F\|_{H^{-1}}
$$

が従います。
<!-- solution-end -->

#### GPDE8-A04 負の reaction term の閾値

$\Omega=(0,\pi)$ で

$$
a_\mu(u,v)
=
\int_0^\pi u'v'\,dx
-
\mu\int_0^\pi uv\,dx
$$

とする。

$v(x)=\sin x$ に対して $a_\mu(v,v)$ を計算し、

1. $\mu=1$ で coercivity が成り立たないこと、
2. $\mu>1$ では $a_\mu(v,v)<0$ となること

を示せ。

<!-- solution-start -->
### 詳細解答

$v=\sin x$ なので $v'=\cos x$ です。

よって

$$
\int_0^\pi|v'|^2\,dx
=
\int_0^\pi\cos^2x\,dx
=
\frac\pi2
$$

かつ

$$
\int_0^\pi|v|^2\,dx
=
\int_0^\pi\sin^2x\,dx
=
\frac\pi2.
$$

したがって

$$
a_\mu(v,v)
=
\frac\pi2
-
\mu\frac\pi2
=
(1-\mu)\frac\pi2.
$$

$\mu=1$ なら

$$
a_1(v,v)=0
$$

ですが $v\ne0$ です。

もし coercivity が成り立つなら、ある $\alpha>0$ に対して

$$
0
=
a_1(v,v)
\ge
\alpha\|v\|_V^2
>0
$$

となり矛盾します。

従って coercive ではありません。

$\mu>1$ なら

$$
1-\mu<0
$$

なので

$$
a_\mu(v,v)<0.
$$

主部 $-\partial_{xx}$ 自体は楕円的でも、負の零次項が十分大きいと full form の正値性が壊れることが分かります。
<!-- solution-end -->

### Level B

#### GPDE8-B01 $\operatorname{div}b$ を使って coercivity を示す

$\Omega$ を有界開集合とし、

$$
A(x)\xi\cdot\xi
\ge
\lambda|\xi|^2,
$$

$$
b\in W^{1,\infty}(\Omega;\mathbb R^d),
\qquad
c\in L^\infty(\Omega)
$$

とする。

$$
c-\frac12\operatorname{div}b
\ge0
\quad\text{a.e.}
$$

のとき

$$
a(v,v)
\ge
\lambda\|\nabla v\|_2^2
$$

を示せ。

<!-- solution-start -->
### 詳細解答

まず $v\in C_c^\infty(\Omega)$ なら

$$
2(b\cdot\nabla v)v
=
b\cdot\nabla(v^2).
$$

従って

$$
\begin{aligned}
\int_\Omega
(b\cdot\nabla v)v\,dx
&=
\frac12
\int_\Omega
b\cdot\nabla(v^2)\,dx
\\
&=
-\frac12
\int_\Omega
(\operatorname{div}b)v^2\,dx.
\end{aligned}
$$

$H_0^1$ の一般の $v$ についても、$C_c^\infty$ 近似と $b,\operatorname{div}b\in L^\infty$ によりこの恒等式が成り立ちます。

従って

$$
\begin{aligned}
a(v,v)
&=
\int_\Omega
A\nabla v\cdot\nabla v\,dx
+
\int_\Omega
(b\cdot\nabla v)v\,dx
+
\int_\Omega
cv^2\,dx
\\
&=
\int_\Omega
A\nabla v\cdot\nabla v\,dx
+
\int_\Omega
\left(
c-\frac12\operatorname{div}b
\right)
v^2\,dx.
\end{aligned}
$$

一様楕円性から第一項は

$$
\ge
\lambda\|\nabla v\|_2^2.
$$

仮定から第二項は非負です。

従って

$$
a(v,v)
\ge
\lambda\|\nabla v\|_2^2.
$$

この証明では $\|b\|_\infty$ の小ささを使っていません。

一次項の構造を利用したためです。
<!-- solution-end -->

#### GPDE8-B02 外力と係数の摂動評価

$V$ 上の $a_1,a_2$ と $F_1,F_2$ に対し

$$
a_i(u_i,v)=F_i(v)
$$

とする。

$a_1$ は coercivity 定数 $\alpha_1>0$ を持つとする。

$$
\|u_1-u_2\|_V
\le
\frac1{\alpha_1}
\left(
\|F_1-F_2\|_{V^*}
+
\|a_2-a_1\|_{\mathrm{op}}\|u_2\|_V
\right)
$$

を導け。

さらに $a_2$ の coercivity 定数が $\alpha_2>0$ なら、右辺から $\|u_2\|_V$ を消去せよ。

<!-- solution-start -->
### 詳細解答

$w=u_1-u_2$ と置きます。

二つの式から

$$
a_1(u_1,v)-a_2(u_2,v)
=
(F_1-F_2)(v).
$$

左辺を

$$
a_1(u_1-u_2,v)
+
(a_1-a_2)(u_2,v)
$$

と分ければ

$$
a_1(w,v)
=
(F_1-F_2)(v)
+
(a_2-a_1)(u_2,v).
$$

$v=w$ とすると

$$
a_1(w,w)
=
(F_1-F_2)(w)
+
(a_2-a_1)(u_2,w).
$$

coercivity から

$$
a_1(w,w)
\ge
\alpha_1\|w\|_V^2.
$$

右辺は

$$
|(F_1-F_2)(w)|
\le
\|F_1-F_2\|_{V^*}\|w\|_V
$$

および

$$
|(a_2-a_1)(u_2,w)|
\le
\|a_2-a_1\|_{\mathrm{op}}
\|u_2\|_V\|w\|_V.
$$

従って

$$
\alpha_1\|w\|_V^2
\le
\left(
\|F_1-F_2\|_{V^*}
+
\|a_2-a_1\|_{\mathrm{op}}\|u_2\|_V
\right)
\|w\|_V.
$$

$w\ne0$ なら一つ約して

$$
\|w\|_V
\le
\frac1{\alpha_1}
\left(
\|F_1-F_2\|_{V^*}
+
\|a_2-a_1\|_{\mathrm{op}}\|u_2\|_V
\right).
$$

$w=0$ なら自明です。

さらに $a_2$ が coercivity 定数 $\alpha_2$ を持つなら Lax--Milgram の energy estimate から

$$
\|u_2\|_V
\le
\frac1{\alpha_2}
\|F_2\|_{V^*}.
$$

従って

$$
\boxed{
\|u_1-u_2\|_V
\le
\frac1{\alpha_1}
\|F_1-F_2\|_{V^*}
+
\frac1{\alpha_1\alpha_2}
\|a_2-a_1\|_{\mathrm{op}}
\|F_2\|_{V^*}
}.
$$
<!-- solution-end -->

#### GPDE8-B03 Neumann compatibility と平均ゼロ解

$\Omega$ を bounded connected Lipschitz domain とし、

$$
a(u,v)
=
\int_\Omega
A\nabla u\cdot\nabla v\,dx
$$

とする。$A$ は bounded かつ一様楕円的とする。

1. 弱解が $H^1(\Omega)$ 上で存在するなら $F(1)=0$ が必要であることを示せ。
2. 平均ゼロ空間
   $$
   V_0=\left\{v\in H^1(\Omega):\int_\Omega v=0\right\}
   $$
   上で $a$ が coercive になる理由を説明せよ。
3. $F(1)=0$ の下で得た $V_0$ 上の解が、実はすべての $v\in H^1$ に対する弱形式を満たすことを示せ。
4. 解が定数加算を除いて一意であることを示せ。

<!-- solution-start -->
### 詳細解答

1. 弱形式が

$$
a(u,v)=F(v)
\qquad
(\forall v\in H^1)
$$

なら $v=1$ を取れます。

$\nabla1=0$ なので

$$
a(u,1)
=
\int_\Omega
A\nabla u\cdot\nabla1\,dx
=
0.
$$

従って

$$
F(1)=0
$$

が必要です。

2. $V_0$ 上では Poincare--Wirtinger により

$$
\|v\|_2
\le
C_W\|\nabla v\|_2.
$$

従って $\|\nabla v\|_2$ は $V_0$ 上の norm になります。

一様楕円性から

$$
a(v,v)
\ge
\lambda\|\nabla v\|_2^2.
$$

したがって $V_0$ 上で coercive です。

3. Lax--Milgram で $u\in V_0$ が

$$
a(u,v_0)=F(v_0)
\qquad
(\forall v_0\in V_0)
$$

を満たすとします。

任意の $v\in H^1$ に対して

$$
\bar v
=
\frac1{|\Omega|}\int_\Omega v,
\qquad
v_0=v-\bar v
$$

と置けば $v_0\in V_0$ です。

定数の勾配は 0 なので

$$
a(u,v)=a(u,v_0).
$$

また $F(1)=0$ から

$$
F(v)
=
F(v_0)+\bar vF(1)
=
F(v_0).
$$

よって

$$
a(u,v)=F(v)
$$

が任意の $v\in H^1$ について成り立ちます。

4. $u_1,u_2$ が二つの解なら $w=u_1-u_2$ は

$$
a(w,v)=0
$$

をすべての $v$ について満たします。

$v=w$ として

$$
0
=
a(w,w)
\ge
\lambda\|\nabla w\|_2^2.
$$

従って $\nabla w=0$。

connected domain 上では $w$ は a.e. 定数です。

よって二解は定数だけ異なります。

平均ゼロ条件まで課せば、その定数は 0 なので解は一意です。
<!-- solution-end -->

### Level C

#### GPDE8-C01 一般係数 Dirichlet 問題を仮定確認から閉じる

$\Omega\subset\mathbb R^2$ を bounded Lipschitz domain とし、

$$
A(x)
=
\begin{pmatrix}
2+x_1^2&1\\
-1&1+x_2^2
\end{pmatrix},
\qquad
b(x)=(K,0),
\qquad
c(x)=1,
$$

ただし $K\in\mathbb R$ とする。

$$
-\operatorname{div}(A\nabla u)
+
K\partial_1u
+
u
=
F
$$

に零 Dirichlet 条件を課す。

1. $A$ が一様楕円的であることを示せ。
2. $A$ が bounded であることを確認し、双線形形式が bounded であることを示せ。
3. $b$ は定数ベクトルなので $\operatorname{div}b=0$ であることを使い、$K$ の大きさに依存せず coercivity を示せ。
4. 任意の $F\in H^{-1}(\Omega)$ に対して弱解が一意に存在することを示せ。
5. 解に対する energy estimate を与えよ。
6. この問題で「$\|b\|_\infty$ が小さい」という十分条件だけを使うと何を見落とすか説明せよ。

<!-- solution-start -->
### 詳細解答

双線形形式を

$$
a(u,v)
=
\int_\Omega
A\nabla u\cdot\nabla v\,dx
+
K\int_\Omega
\partial_1u\,v\,dx
+
\int_\Omega
uv\,dx
$$

と置きます。

#### 1. 一様楕円性

$\xi=(\xi_1,\xi_2)^{\mathsf T}$ とすると

$$
\begin{aligned}
\xi^{\mathsf T}A(x)\xi
&=
(2+x_1^2)\xi_1^2
+\xi_1\xi_2
-\xi_1\xi_2
+(1+x_2^2)\xi_2^2
\\
&=
(2+x_1^2)\xi_1^2
+
(1+x_2^2)\xi_2^2.
\end{aligned}
$$

従って

$$
\xi^{\mathsf T}A(x)\xi
\ge
\xi_1^2+\xi_2^2
=
|\xi|^2.
$$

よって $\lambda=1$ と取れます。

#### 2. boundedness

$\Omega$ は bounded なので $x_1,x_2$ は $\Omega$ 上で有界です。

従って $A$ の各成分は $L^\infty(\Omega)$ に属し、ある $\Lambda<\infty$ が存在して

$$
|A(x)\xi|
\le
\Lambda|\xi|
$$

です。

また

$$
\|b\|_\infty=|K|,
\qquad
\|c\|_\infty=1.
$$

従って本章の boundedness 命題から

$$
|a(u,v)|
\le
\left(
\Lambda
+
C_P|K|
+
C_P^2
\right)
\|u\|_V\|v\|_V.
$$

#### 3. coercivity

$b=(K,0)$ は定数ベクトルなので

$$
\operatorname{div}b=0.
$$

また $c=1$ なので

$$
c-\frac12\operatorname{div}b
=
1
\ge0.
$$

従って構造的 coercivity の系から

$$
a(v,v)
\ge
\lambda\|\nabla v\|_2^2
=
\|v\|_V^2.
$$

実際、一次項は

$$
K\int_\Omega
\partial_1v\,v\,dx
=
\frac K2
\int_\Omega
\partial_1(v^2)\,dx
=
0
$$

です。

従って coercivity 定数は $\alpha=1$ と取れます。

ここで $K$ の大きさは関係しません。

#### 4. 存在一意性

$V=H_0^1(\Omega)$ は Hilbert 空間です。

$a$ は bounded かつ coercive、$F\in V^*$ です。

従って Lax--Milgram により、一意な $u\in H_0^1(\Omega)$ が存在して

$$
a(u,v)=F(v)
\qquad
(\forall v\in H_0^1(\Omega))
$$

を満たします。

#### 5. energy estimate

coercivity 定数を $\alpha=1$ と取れるので

$$
\boxed{
\|\nabla u\|_2
\le
\|F\|_{H^{-1}(\Omega)}
}.
$$

#### 6. 小ささ条件だけでは何を見落とすか

粗い十分条件を使うと

$$
1-C_P|K|>0
$$

のような制約を要求してしまいます。

しかし実際には一次項は対角上で完全に消えるため、任意の $K\in\mathbb R$ で coercivity が成立します。

つまり

$$
\boxed{
\text{絶対値評価は安全だが、構造を捨てるため鋭くない}
}
$$

ということです。

一般係数 PDE では、まず粗い評価で十分条件を得て、その後に divergence・符号・反対称性などの構造を使って条件を改善する、という二段階の見方が重要です。
<!-- solution-end -->

---

## 18. まとめ

本章の主線は次です。

$$
\boxed{
-\operatorname{div}(A\nabla u)
+b\cdot\nabla u
+cu
=F
}
$$

を

$$
a(u,v)=F(v)
$$

へ移し、

$$
\boxed{
\begin{array}{c}
|A\xi|\le\Lambda|\xi|
\\
b,c\in L^\infty
\end{array}
}
\Longrightarrow
\text{boundedness}
$$

と

$$
\boxed{
\xi^{\mathsf T}A\xi\ge\lambda|\xi|^2
+
\text{lower-order control}
}
\Longrightarrow
\text{coercivity}
$$

を確認して、

$$
\boxed{
\text{Lax--Milgram}
\Longrightarrow
\text{weak existence + uniqueness + energy estimate}
}
$$

へ進みます。

さらに

$$
\boxed{
\text{係数・外力の摂動}
\Longrightarrow
\text{解の摂動評価}
}
$$

を得ました。

Neumann 問題では

$$
\boxed{
\text{定数 kernel}
\Longrightarrow
F(1)=0
\Longrightarrow
\text{平均ゼロ空間で coercivity}
}
$$

という別の構造が現れます。

したがって大学院 PDE で見るべきなのは、単に「楕円型」という名前ではありません。

$$
\boxed{
\text{どの仮定が、どの energy estimate を可能にしているか}
}
$$

です。

次の GPDE9 では、この energy estimate を局所化して、弱解から追加の微分可能性を回収します。
