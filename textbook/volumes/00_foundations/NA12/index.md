# NA12 数値解析 XII：無制約最適化と共役勾配法

NA9 では、実対称正定値行列 $A$ に対する線形方程式

$$
Ax=b
$$

を Krylov 部分空間で解く方法として共役勾配法を導入しました。

この章では、同じ反復を「二次関数を最小にする方法」として読み直します。目標はアルゴリズムをもう一度証明し直すことではなく、

~~~text
微分可能な目的関数
  ↓
最小候補で必要な微分条件
  ↓
目的関数を減らす方向を選ぶ
  ↓
勾配だけを使う反復
  ↓
曲率を使う反復
  ↓
実対称正定値二次関数
  ↓
線形方程式 Ax=b
  ↓
NA9 の共役勾配法
~~~

という最適化側の意味を一本につなぐことです。

直接の前提は、[F0-00G の凸関数と Hessian 判定](../F0_00G_凸集合_凸関数_凸最適化/index.md#thm-f0-00g-hessian-convexity)と、[NA9 の共役勾配法](../NA9/index.md#def-na9-cg)です。

NA9 で既に証明した残差直交性、探索方向の $A$-共役性、有限回終了、Krylov 部分空間上の最良近似性は、ここでは canonical result として使います。

---

## 0. 制約がなくても「最小」を定義する必要がある

<a id="def-na12-unconstrained-minimization"></a>
<!-- formal-statement-start -->
### 定義（無制約最適化問題・局所最小点・大域最小点）

関数

$$
f:\mathbb R^n\to\mathbb R
$$

に対して

$$
\boxed{
\min_{x\in\mathbb R^n} f(x)
}
$$

を **無制約最適化問題**という。

点 $x_*$ が **局所最小点**であるとは、ある $\delta>0$ が存在して

$$
\|x-x_*\|_2<\delta
$$

を満たすすべての $x$ に対し

$$
f(x_*)\le f(x)
$$

となることをいう。

点 $x_*$ が **大域最小点**であるとは、すべての $x\in\mathbb R^n$ に対して

$$
f(x_*)\le f(x)
$$

となることをいう。
<!-- formal-statement-end -->

<!-- definition-example-start: def-na12-unconstrained-minimization -->
### 例：局所最小と大域最小を直接確認する

**定義の確認**。

$$
f(x)=(x-2)^2+1
$$

では

$$
f(x)-f(2)=(x-2)^2\ge0.
$$

従って $x_*=2$ は大域最小点です。大域最小点なら任意の十分小さい近傍でも同じ不等式が成り立つので、局所最小点でもあります。
<!-- definition-example-end -->

制約がないから問題が簡単になるわけではありません。例えば

$$
f(x)=x^3
$$

は下に有界でないため大域最小点を持ちません。

一方、局所最小点は微分情報から候補を絞れます。

---

## 1. 局所最小点では勾配が消える

<a id="prop-na12-first-order-necessary"></a>
<!-- formal-statement-start -->
### 命題（無制約最適化の一階必要条件）

$f:\mathbb R^n\to\mathbb R$ が $x_*$ で微分可能で、$x_*$ が局所最小点なら

$$
\boxed{
\nabla f(x_*)=0
}
$$

である。
<!-- formal-statement-end -->

<!-- proof-start -->
### 証明

任意の $v\in\mathbb R^n$ を固定し、

$$
\phi(t)=f(x_*+tv)
$$

と置きます。

$x_*$ が局所最小点なので、$t=0$ は一変数関数 $\phi$ の局所最小点です。従って

$$
\phi'(0)=0.
$$

連鎖律から

$$
\phi'(0)
=
\nabla f(x_*)^{\mathsf T}v.
$$

よって任意の $v$ に対して

$$
\nabla f(x_*)^{\mathsf T}v=0.
$$

特に

$$
v=\nabla f(x_*)
$$

と取れば

$$
\|\nabla f(x_*)\|_2^2=0.
$$

従って

$$
\nabla f(x_*)=0.
$$
<!-- proof-end -->

勾配が0であることは必要条件ですが、一般には十分ではありません。

例えば

$$
f(x)=x^3
$$

では $f'(0)=0$ ですが、$0$ は最小点ではありません。

---

## 2. 二階微分は停留点の形を見分ける

<a id="prop-na12-second-order-conditions"></a>
<!-- formal-statement-start -->
### 命題（無制約最適化の二階最小条件）

$f\in C^2(\mathbb R^n)$ とする。

1. $x_*$ が局所最小点なら
   $$
   \boxed{
   \nabla^2 f(x_*)\succeq0
   }.
   $$
2. 
   $$
   \nabla f(x_*)=0,
   \qquad
   \nabla^2 f(x_*)\succ0
   $$
   なら、$x_*$ は狭義局所最小点である。
<!-- formal-statement-end -->

<!-- proof-start -->
### 証明

まず $x_*$ を局所最小点とします。

任意の $v\in\mathbb R^n$ に対し

$$
\phi(t)=f(x_*+tv)
$$

と置けば、$t=0$ は $\phi$ の局所最小点なので

$$
\phi''(0)\ge0.
$$

連鎖律から

$$
\phi''(0)
=
v^{\mathsf T}\nabla^2f(x_*)v.
$$

任意の $v$ で非負なので

$$
\nabla^2 f(x_*)\succeq0.
$$

次に

$$
H_*=\nabla^2 f(x_*)\succ0
$$

とします。最小固有値を

$$
m=\lambda_{\min}(H_*)>0
$$

とします。

Hessian は連続なので、$x_*$ の十分小さい近傍では

$$
\|\nabla^2f(x)-H_*\|_2<\frac m2
$$

とできます。

従って任意の $z$ に対して

$$
\begin{aligned}
z^{\mathsf T}\nabla^2f(x)z
&=
z^{\mathsf T}H_*z
+
z^{\mathsf T}(\nabla^2f(x)-H_*)z\\
&\ge
m\|z\|_2^2
-
\frac m2\|z\|_2^2\\
&=
\frac m2\|z\|_2^2.
\end{aligned}
$$

$x=x_*+h$ をこの近傍に取り、

$$
\psi(t)=f(x_*+th)
$$

とします。$\nabla f(x_*)=0$ なので

$$
\psi'(0)=0.
$$

Taylor の定理より、ある $\theta\in(0,1)$ が存在して

$$
\begin{aligned}
f(x_*+h)-f(x_*)
&=
\frac12\psi''(\theta)\\
&=
\frac12
h^{\mathsf T}
\nabla^2f(x_*+\theta h)
h\\
&\ge
\frac m4\|h\|_2^2.
\end{aligned}
$$

$h\ne0$ なら右辺は正です。従って $x_*$ は狭義局所最小点です。
<!-- proof-end -->

[F0-00G の Hessian 判定](../F0_00G_凸集合_凸関数_凸最適化/index.md#thm-f0-00g-hessian-convexity)では Hessian 半正定値性を凸性へ結びました。ここでは同じ二階情報を、数値反復の局所形状を読むために使っています。

---

## 3. 目的関数を減らす方向を選ぶ

<a id="def-na12-descent-line-search"></a>
<!-- formal-statement-start -->
### 定義（降下方向・厳密直線探索）

$f$ が $x$ で微分可能とする。

非零ベクトル $p$ が

$$
\boxed{
\nabla f(x)^{\mathsf T}p<0
}
$$

を満たすとき、$p$ を $x$ における **降下方向**という。

与えられた方向 $p$ に対し、

$$
\boxed{
\alpha_*
\in
\mathop{\mathrm{arg\,min}}_{\alpha\ge0}
f(x+\alpha p)
}
$$

を選ぶことを **厳密直線探索**という。
<!-- formal-statement-end -->

<!-- definition-example-start: def-na12-descent-line-search -->
### 例：勾配と反対向きは降下方向になる

**定義の確認**。

$$
f(x,y)=x^2+2y^2
$$

の点 $(1,1)$ では

$$
\nabla f(1,1)=
\begin{pmatrix}
2\\4
\end{pmatrix}.
$$

$$
p=
-\nabla f(1,1)
=
\begin{pmatrix}
-2\\-4
\end{pmatrix}
$$

とすると

$$
\nabla f(1,1)^{\mathsf T}p
=
-(2^2+4^2)
=-20<0.
$$

従って $p$ は降下方向です。
<!-- definition-example-end -->

<a id="prop-na12-descent-direction"></a>
<!-- formal-statement-start -->
### 命題（降下方向では十分小さい正の歩幅で関数値が下がる）

$f$ が $x$ で微分可能で、

$$
\nabla f(x)^{\mathsf T}p<0
$$

とする。

このとき、ある $\varepsilon>0$ が存在し、

$$
0<\alpha<\varepsilon
$$

なら

$$
\boxed{
f(x+\alpha p)<f(x)
}
$$

である。
<!-- formal-statement-end -->

<!-- proof-start -->
### 証明

微分可能性から

$$
f(x+\alpha p)
=
f(x)
+
\alpha\nabla f(x)^{\mathsf T}p
+
o(\alpha)
$$

です。

$$
c=-\nabla f(x)^{\mathsf T}p>0
$$

と置きます。

$o(\alpha)/\alpha\to0$ なので、十分小さい $\alpha>0$ では

$$
|o(\alpha)|\le\frac c2\alpha
$$

とできます。従って

$$
\begin{aligned}
f(x+\alpha p)-f(x)
&\le
-c\alpha+\frac c2\alpha\\
&=
-\frac c2\alpha<0.
\end{aligned}
$$

よって主張を得ます。
<!-- proof-end -->

---

## 4. Euclid ノルムで最も急な局所下降

<a id="def-na12-steepest-descent"></a>
<!-- formal-statement-start -->
### 定義（最急降下法）

$f:\mathbb R^n\to\mathbb R$ を微分可能とする。

各反復で

$$
g_k=\nabla f(x_k)
$$

を計算し、

$$
\boxed{
x_{k+1}
=
x_k-\alpha_k g_k,
\qquad
\alpha_k>0
}
$$

と更新する方法を **最急降下法**という。

特に

$$
\alpha_k
\in
\mathop{\mathrm{arg\,min}}_{\alpha\ge0}
f(x_k-\alpha g_k)
$$

と選ぶ場合を、厳密直線探索を用いる最急降下法という。
<!-- formal-statement-end -->

<!-- definition-example-start: def-na12-steepest-descent -->
### 例：一変数二次関数では1回で最小点へ行ける

**定義の確認**。

$$
f(x)=\frac12 a x^2-bx,
\qquad a>0
$$

とします。

$$
g(x)=ax-b
$$

なので、$g(x)\ne0$ の点から

$$
x^+=x-\alpha g(x)
$$

と進みます。

厳密直線探索では

$$
\alpha=\frac1a
$$

となり、

$$
x^+
=
x-\frac1a(ax-b)
=
\frac ba.
$$

これはちょうど大域最小点です。
<!-- definition-example-end -->

<a id="prop-na12-steepest-direction"></a>
<!-- formal-statement-start -->
### 命題（負の勾配は Euclid ノルムに関する最急降下方向）

$g=\nabla f(x)\ne0$ とする。

単位ベクトル $\|p\|_2=1$ の中でその方向に沿う一次変化率

$$
g^{\mathsf T}p
$$

を最小にする方向は

$$
\boxed{
p_*=-\frac g{\|g\|_2}
}
$$

であり、最小値は $-\|g\|_2$ である。
<!-- formal-statement-end -->

<!-- proof-start -->
### 証明

Cauchy--Schwarz の不等式から

$$
g^{\mathsf T}p
\ge
-\|g\|_2\|p\|_2
=
-\|g\|_2.
$$

一方

$$
p=-\frac g{\|g\|_2}
$$

なら

$$
g^{\mathsf T}p
=
-\|g\|_2.
$$

従ってこの下界が達成され、負の勾配方向が最急です。
<!-- proof-end -->

「最急」はノルムに依存します。この章で最急降下というときは Euclid ノルムを使います。

---

## 5. 実対称正定値二次関数は線形方程式そのものである

<a id="def-na12-spd-quadratic"></a>
<!-- formal-statement-start -->
### 定義（実対称正定値二次目的関数）

$A\in\mathbb R^{n\times n}$ を実対称正定値行列、$b\in\mathbb R^n$、$c\in\mathbb R$ とする。

$$
\boxed{
q(x)
=
\frac12x^{\mathsf T}Ax
-
b^{\mathsf T}x
+
c
}
$$

を **実対称正定値二次目的関数**という。
<!-- formal-statement-end -->

<!-- definition-example-start: def-na12-spd-quadratic -->
### 例：2変数の二次目的関数

**定義の確認**。

$$
A=
\begin{pmatrix}
2&0\\
0&6
\end{pmatrix},
\qquad
b=
\begin{pmatrix}
2\\6
\end{pmatrix}
$$

とすると、$A$ は対称で、任意の非零 $z=(z_1,z_2)^{\mathsf T}$ に対し

$$
z^{\mathsf T}Az
=
2z_1^2+6z_2^2>0
$$

です。従って $A$ は正定値です。

対応する目的関数は

$$
q(x_1,x_2)
=
x_1^2+3x_2^2-2x_1-6x_2+c
$$

です。
<!-- definition-example-end -->

微分すると

$$
\boxed{
\nabla q(x)=Ax-b,
\qquad
\nabla^2q(x)=A
}.
$$

従って停留条件は

$$
\nabla q(x)=0
\iff
Ax=b.
$$

線形方程式の解を求めることと、この二次関数を最小化することが同じ問題になります。

<a id="prop-na12-quadratic-gap"></a>
<!-- formal-statement-start -->
### 命題（実対称正定値二次関数の一意な最小点と目的関数差）

$A$ を実対称正定値とし、

$$
q(x)
=
\frac12x^{\mathsf T}Ax-b^{\mathsf T}x+c
$$

とする。

$$
x_*=A^{-1}b
$$

と置けば、$x_*$ は一意な大域最小点であり、任意の $x$ について

$$
\boxed{
q(x)-q(x_*)
=
\frac12
\|x-x_*\|_A^2
}
$$

が成り立つ。
<!-- formal-statement-end -->

<!-- proof-start -->
### 証明

$$
e=x-x_*
$$

と置きます。$Ax_*=b$ なので

$$
x=x_*+e
$$

を代入すると

$$
\begin{aligned}
q(x)
&=
\frac12(x_*+e)^{\mathsf T}A(x_*+e)
-
b^{\mathsf T}(x_*+e)
+c\\
&=
\frac12x_*^{\mathsf T}Ax_*
+
x_*^{\mathsf T}Ae
+
\frac12e^{\mathsf T}Ae
-
b^{\mathsf T}x_*
-
b^{\mathsf T}e
+c.
\end{aligned}
$$

$Ax_*=b$ と $A^{\mathsf T}=A$ から

$$
x_*^{\mathsf T}Ae
=
b^{\mathsf T}e.
$$

従って交差項が消え、

$$
q(x)
=
q(x_*)
+
\frac12e^{\mathsf T}Ae.
$$

[NA9 の $A$-ノルム](../NA9/index.md#def-na9-a-inner-product)を使えば

$$
q(x)-q(x_*)
=
\frac12\|e\|_A^2.
$$

$A$ は正定値なので、$e\ne0$ なら

$$
\|e\|_A^2>0.
$$

従って $x=x_*$ のときだけ最小値を取り、最小点は一意です。
<!-- proof-end -->

この恒等式は NA12 の中心です。

**二次目的関数をどれだけ減らしたか**と、**線形方程式の解に $A$-ノルムでどれだけ近づいたか**が同じ量を表します。

---

## 6. 二次関数の厳密直線探索は閉じた式になる

<a id="prop-na12-quadratic-line-search"></a>
<!-- formal-statement-start -->
### 命題（実対称正定値二次関数の厳密直線探索）

実対称正定値二次目的関数 $q$ と点 $x$ を取り、

$$
g=\nabla q(x)
$$

とする。

$p\ne0$ が降下方向

$$
g^{\mathsf T}p<0
$$

なら、$q(x+\alpha p)$ を $\alpha\ge0$ で最小にする歩幅は一意で、

$$
\boxed{
\alpha_*
=
-\frac{g^{\mathsf T}p}
{p^{\mathsf T}Ap}
}
$$

である。

特に $p=-g$ なら

$$
\boxed{
\alpha_*
=
\frac{g^{\mathsf T}g}
{g^{\mathsf T}Ag}
}.
$$
<!-- formal-statement-end -->

<!-- proof-start -->
### 証明

$$
\phi(\alpha)=q(x+\alpha p)
$$

と置きます。

$\nabla q(y)=Ay-b$ なので

$$
\begin{aligned}
\phi'(\alpha)
&=
p^{\mathsf T}\nabla q(x+\alpha p)\\
&=
p^{\mathsf T}(g+\alpha Ap)\\
&=
g^{\mathsf T}p
+
\alpha p^{\mathsf T}Ap.
\end{aligned}
$$

また

$$
\phi''(\alpha)=p^{\mathsf T}Ap>0
$$

です。従って $\phi$ は狭義凸で、唯一の停留点が大域最小点です。

$\phi'(\alpha)=0$ を解けば

$$
\alpha_*
=
-\frac{g^{\mathsf T}p}{p^{\mathsf T}Ap}.
$$

$p$ は降下方向なので分子の符号から $\alpha_*>0$ です。

$p=-g$ を代入すれば

$$
\alpha_*
=
\frac{g^{\mathsf T}g}{g^{\mathsf T}Ag}.
$$
<!-- proof-end -->

---

## 7. 最急降下法には条件数がそのまま効く

実対称正定値行列 $A$ の固有値を

$$
0<m=\lambda_{\min}(A)
\le
\lambda_{\max}(A)=L
$$

とし、

$$
\kappa=\frac Lm
$$

と置きます。

<a id="thm-na12-steepest-descent-condition-number"></a>
<!-- formal-statement-start -->
### 定理（厳密直線探索付き最急降下法の条件数依存収束評価）

実対称正定値二次目的関数 $q$ に厳密直線探索付き最急降下法を適用する。

$x_*$ を一意な最小点、

$$
e_k=x_k-x_*,
\qquad
\kappa=\kappa_2(A)
$$

とする。

このとき

$$
\boxed{
\|e_{k+1}\|_A
\le
\frac{\kappa-1}{\kappa+1}
\|e_k\|_A
}
$$

である。

従って目的関数差について

$$
\boxed{
q(x_{k+1})-q(x_*)
\le
\left(
\frac{\kappa-1}{\kappa+1}
\right)^2
\bigl(q(x_k)-q(x_*)\bigr)
}
$$

が成り立つ。
<!-- formal-statement-end -->

<!-- proof-start -->
### 証明

最急降下方向は

$$
-g_k
=
-(Ax_k-b)
=
-Ae_k
$$

です。

厳密直線探索で得る $x_{k+1}$ は、この直線上で目的関数を最小にします。従って任意の固定した $\widehat\alpha>0$ に対して

$$
q(x_{k+1})
\le
q(x_k-\widehat\alpha Ae_k).
$$

ここで

$$
\widehat\alpha
=
\frac{2}{m+L}
$$

を選びます。

候補点の誤差は

$$
\widehat e_{k+1}
=
(I-\widehat\alpha A)e_k.
$$

実対称行列のスペクトル定理により

$$
A=Q\Lambda Q^{\mathsf T}
$$

と直交対角化し、

$$
z=Q^{\mathsf T}e_k
$$

と置きます。

すると

$$
\begin{aligned}
\|\widehat e_{k+1}\|_A^2
&=
\sum_i
\lambda_i
(1-\widehat\alpha\lambda_i)^2
z_i^2.
\end{aligned}
$$

$m\le\lambda_i\le L$ なので

$$
\left|
1-\frac{2\lambda_i}{m+L}
\right|
\le
\frac{L-m}{L+m}.
$$

従って

$$
\|\widehat e_{k+1}\|_A
\le
\frac{L-m}{L+m}
\|e_k\|_A.
$$

[二次目的関数差の恒等式](#prop-na12-quadratic-gap)から、厳密直線探索が候補点以上に目的関数を減らすことは

$$
\|e_{k+1}\|_A
\le
\|\widehat e_{k+1}\|_A
$$

を意味します。

よって

$$
\|e_{k+1}\|_A
\le
\frac{L-m}{L+m}
\|e_k\|_A.
$$

$$
\frac{L-m}{L+m}
=
\frac{\kappa-1}{\kappa+1}
$$

なので第一の評価を得ます。

最後に

$$
q(x)-q(x_*)
=
\frac12\|x-x_*\|_A^2
$$

を使って両辺を二乗すれば、目的関数差の評価が従います。
<!-- proof-end -->

$\kappa$ が大きいと

$$
\frac{\kappa-1}{\kappa+1}
\approx1
$$

となるため、谷が細長い二次関数では最急降下法がゆっくり進みます。

---

## 8. 曲率を使えば二次関数では1回で解ける

<a id="def-na12-newton-optimization"></a>
<!-- formal-statement-start -->
### 定義（無制約最適化に対する Newton 法）

$f\in C^2(\mathbb R^n)$ とする。

点 $x_k$ で Hessian

$$
H_k=\nabla^2f(x_k)
$$

が可逆なら、

$$
\boxed{
H_k s_k
=
-\nabla f(x_k)
}
$$

を解き、

$$
\boxed{
x_{k+1}=x_k+s_k
}
$$

と更新する方法を **無制約最適化に対する Newton 法**という。
<!-- formal-statement-end -->

<!-- definition-example-start: def-na12-newton-optimization -->
### 例：実対称正定値二次関数では Newton 法が1回で終わる

**定義の確認**。

$$
q(x)
=
\frac12x^{\mathsf T}Ax-b^{\mathsf T}x,
\qquad
A\succ0
$$

なら

$$
\nabla q(x_k)=Ax_k-b,
\qquad
\nabla^2q(x_k)=A.
$$

Newton 方程式は

$$
As_k=b-Ax_k.
$$

従って

$$
s_k=A^{-1}b-x_k
$$

であり、

$$
x_{k+1}
=
A^{-1}b
=
x_*.
$$

初期値によらず1回で最小点へ到達します。
<!-- definition-example-end -->

<a id="prop-na12-quadratic-newton-one-step"></a>
<!-- formal-statement-start -->
### 命題（実対称正定値二次関数に対する Newton 法の1回終了）

実対称正定値二次目的関数に対し、Newton 法は任意の初期値から1回の更新で一意な大域最小点

$$
x_*=A^{-1}b
$$

へ到達する。
<!-- formal-statement-end -->

<!-- proof-start -->
### 証明

前節の計算を一般の $c$ を含む場合にも適用します。

$$
\nabla q(x_k)=Ax_k-b,
\qquad
\nabla^2q(x_k)=A.
$$

Newton 方程式は

$$
As_k
=
-(Ax_k-b).
$$

$A$ は正定値なので可逆で、

$$
s_k
=
A^{-1}b-x_k.
$$

従って

$$
x_{k+1}
=
x_k+s_k
=
A^{-1}b
=
x_*.
$$
<!-- proof-end -->

### 反例：Hessian が不定値なら Newton 方向は降下方向とは限らない

$$
f(x,y)
=
\frac12(x^2-y^2)
$$

を考えます。

$$
\nabla f(x,y)
=
\begin{pmatrix}
x\\-y
\end{pmatrix},
\qquad
\nabla^2 f
=
\begin{pmatrix}
1&0\\
0&-1
\end{pmatrix}.
$$

点

$$
x_0=
\begin{pmatrix}
0\\1
\end{pmatrix}
$$

では

$$
f(x_0)=-\frac12.
$$

Newton 方程式を解くと

$$
s_0=
\begin{pmatrix}
0\\-1
\end{pmatrix}
$$

なので

$$
x_1=
\begin{pmatrix}
0\\0
\end{pmatrix}.
$$

しかし

$$
f(x_1)=0>-\frac12=f(x_0).
$$

つまり関数値は増えています。

失った仮定は Hessian の正定値性です。正定値なら二次モデルには一意な最小点がありますが、不定値なら二次モデルは鞍点形で、Newton 方程式を解くだけでは降下方向を保証できません。

---

## 9. 共役勾配法は二次関数の直線探索として読める

ここからは [NA9 の共役勾配法](../NA9/index.md#def-na9-cg)をそのまま使います。

実対称正定値二次目的関数に対して

$$
g_k
=
\nabla q(x_k)
=
Ax_k-b
$$

なので、NA9 の残差

$$
r_k=b-Ax_k
$$

とは

$$
\boxed{
r_k=-g_k
}
$$

の関係があります。

<a id="prop-na12-cg-line-search-interpretation"></a>
<!-- formal-statement-start -->
### 命題（共役勾配法の歩幅は二次目的関数の厳密直線探索である）

$A$ を実対称正定値とし、NA9 の共役勾配法を

$$
Ax=b
$$

へ適用する。

同じ $A,b$ から作る

$$
q(x)
=
\frac12x^{\mathsf T}Ax-b^{\mathsf T}x
$$

を考える。

共役勾配法の各探索方向 $p_k$ に沿う更新

$$
x_{k+1}=x_k+\alpha_kp_k
$$

において、

$$
\boxed{
\alpha_k
=
\frac{r_k^{\mathsf T}r_k}
{p_k^{\mathsf T}Ap_k}
}
$$

は $q(x_k+\alpha p_k)$ の厳密直線探索で得られる歩幅である。
<!-- formal-statement-end -->

<!-- proof-start -->
### 証明

[二次関数の厳密直線探索公式](#prop-na12-quadratic-line-search)から

$$
\alpha_*
=
-\frac{g_k^{\mathsf T}p_k}
{p_k^{\mathsf T}Ap_k}.
$$

ここで

$$
g_k=-r_k
$$

なので

$$
\alpha_*
=
\frac{r_k^{\mathsf T}p_k}
{p_k^{\mathsf T}Ap_k}.
$$

NA9 の共役勾配法では

$$
p_0=r_0
$$

であり、$k\ge1$ では

$$
p_k=r_k+\beta_{k-1}p_{k-1}.
$$

[NA9 の残差直交性](../NA9/index.md#thm-na9-cg-structure)から

$$
r_k^{\mathsf T}p_{k-1}=0.
$$

従って

$$
r_k^{\mathsf T}p_k
=
r_k^{\mathsf T}r_k.
$$

よって

$$
\alpha_*
=
\frac{r_k^{\mathsf T}r_k}
{p_k^{\mathsf T}Ap_k},
$$

これは NA9 の共役勾配法の歩幅そのものです。
<!-- proof-end -->

最初の反復では

$$
p_0=r_0=-g_0
$$

なので、共役勾配法は最急降下法と同じ方向から始まります。

違いは2回目以降です。最急降下法は毎回 $-g_k$ へ向き直しますが、共役勾配法は過去の探索方向と $A$-共役になるように方向を修正します。

---

## 10. NA9 の最良近似性は二次関数最小化そのものである

<a id="thm-na12-cg-quadratic-minimization"></a>
<!-- formal-statement-start -->
### 定理（共役勾配法の Krylov アフィン空間上の二次目的関数最小化）

$A$ を実対称正定値行列とし、

$$
q(x)
=
\frac12x^{\mathsf T}Ax-b^{\mathsf T}x+c
$$

とする。

$x_*$ を一意な大域最小点とし、初期値 $x_0$ から NA9 の共役勾配法で $x_k$ を作る。

このとき

$$
\boxed{
x_k
=
\mathop{\mathrm{arg\,min}}_{
x\in x_0+\mathcal K_k(A,r_0)
}
q(x)
}
$$

であり、最小点は一意である。

また丸め誤差のない厳密演算では高々 $n$ 回で $x_*$ に到達する。
<!-- formal-statement-end -->

<!-- proof-start -->
### 証明

[二次目的関数差の恒等式](#prop-na12-quadratic-gap)から

$$
q(x)-q(x_*)
=
\frac12\|x-x_*\|_A^2.
$$

従って $q(x)$ を最小にすることと

$$
\|x-x_*\|_A
$$

を最小にすることは同値です。

一方、[NA9 の共役勾配法の $A$-ノルム最良近似性](../NA9/index.md#thm-na9-cg-best-approx)から、$x_k$ は

$$
x_0+\mathcal K_k(A,r_0)
$$

の中で $A$-ノルム誤差を一意に最小にします。

よって同じアフィン空間の中で $q$ も一意に最小にします。

有限回終了は [NA9 の直交性・$A$-共役性・有限回終了定理](../NA9/index.md#thm-na9-cg-structure)から従います。ここで必要な仮定は同じく $A$ の実対称正定値性です。
<!-- proof-end -->

これで

$$
\boxed{
Ax=b
\quad\Longleftrightarrow\quad
\min_x
\left(
\frac12x^{\mathsf T}Ax-b^{\mathsf T}x
\right)
}
$$

という等価性が、単なる停留条件だけでなく反復法のレベルでも閉じました。

---

## 11. 最急降下法と共役勾配法では条件数の現れ方が違う

最急降下法について、この章では

$$
\|e_k\|_A
\le
\left(
\frac{\kappa-1}{\kappa+1}
\right)^k
\|e_0\|_A
$$

を得ました。

一方 [NA9 の Chebyshev 収束評価](../NA9/index.md#thm-na9-cg-chebyshev)では、共役勾配法について

$$
\boxed{
\|e_k\|_A
\le
2
\left(
\frac{\sqrt\kappa-1}
{\sqrt\kappa+1}
\right)^k
\|e_0\|_A
}
$$

です。

両式の形から、

- 最急降下法では悪条件性が $\kappa$ のまま強く現れる
- 共役勾配法では最悪時評価に $\sqrt\kappa$ が現れる

ことが分かります。

NA9 の前処理は、この二次最小化の見方では「変数の座標尺度を変え、細長い谷をより丸い形へ近づける操作」と解釈できます。

---

## 12. 演習 Level A

### NA12-A01 停留点と大域最小点

- Level: A
- 目安時間: 10分

$$
f(x,y)
=
(x-1)^2+2(y+1)^2
$$

について、

1. 勾配を求めよ。
2. 停留点を求めよ。
3. その点が一意な大域最小点であることを示せ。

<!-- solution-start -->
#### 詳細解答

勾配は

$$
\nabla f(x,y)
=
\begin{pmatrix}
2(x-1)\\
4(y+1)
\end{pmatrix}.
$$

停留条件

$$
\nabla f(x,y)=0
$$

から

$$
x=1,
\qquad
y=-1.
$$

従って候補は

$$
x_*=
\begin{pmatrix}
1\\-1
\end{pmatrix}.
$$

任意の $(x,y)$ に対して

$$
f(x,y)-f(1,-1)
=
(x-1)^2+2(y+1)^2
\ge0.
$$

等号は $x=1,y=-1$ のときだけなので、

$$
\boxed{
(1,-1)
}
$$

が一意な大域最小点です。
<!-- solution-end -->

### NA12-A02 二次関数の最急降下1反復

- Level: A
- 目安時間: 15分

$$
q(x)
=
\frac12
x^{\mathsf T}
\begin{pmatrix}
1&0\\
0&4
\end{pmatrix}
x
$$

に対し、

$$
x_0=
\begin{pmatrix}
1\\1
\end{pmatrix}
$$

から厳密直線探索付き最急降下法を1回行え。

<!-- solution-start -->
#### 詳細解答

$$
A=
\begin{pmatrix}
1&0\\
0&4
\end{pmatrix}
$$

なので

$$
g_0=Ax_0
=
\begin{pmatrix}
1\\4
\end{pmatrix}.
$$

最急降下方向は

$$
p_0=-g_0.
$$

厳密直線探索の歩幅は

$$
\alpha_0
=
\frac{g_0^{\mathsf T}g_0}
{g_0^{\mathsf T}Ag_0}.
$$

分子は

$$
g_0^{\mathsf T}g_0
=
1+16=17.
$$

また

$$
Ag_0=
\begin{pmatrix}
1\\16
\end{pmatrix}
$$

なので

$$
g_0^{\mathsf T}Ag_0
=
1+64=65.
$$

従って

$$
\alpha_0=\frac{17}{65}.
$$

更新は

$$
\begin{aligned}
x_1
&=
x_0-\alpha_0g_0\\
&=
\begin{pmatrix}
1\\1
\end{pmatrix}
-
\frac{17}{65}
\begin{pmatrix}
1\\4
\end{pmatrix}\\
&=
\boxed{
\begin{pmatrix}
48/65\\
-3/65
\end{pmatrix}
}.
\end{aligned}
$$
<!-- solution-end -->

### NA12-A03 Newton 法の1回終了

- Level: A
- 目安時間: 15分

$$
A=
\begin{pmatrix}
4&1\\
1&3
\end{pmatrix},
\qquad
b=
\begin{pmatrix}
1\\2
\end{pmatrix}
$$

とし、

$$
q(x)=\frac12x^{\mathsf T}Ax-b^{\mathsf T}x
$$

を考える。

$x_0=0$ から Newton 法を1回実行し、最小点を求めよ。

<!-- solution-start -->
#### 詳細解答

$$
\nabla q(x)=Ax-b,
\qquad
\nabla^2q(x)=A.
$$

$x_0=0$ では

$$
\nabla q(x_0)=-b.
$$

Newton 方程式は

$$
As_0=b.
$$

すなわち

$$
\begin{pmatrix}
4&1\\
1&3
\end{pmatrix}
\begin{pmatrix}
s_1\\s_2
\end{pmatrix}
=
\begin{pmatrix}
1\\2
\end{pmatrix}.
$$

第一式から

$$
s_2=1-4s_1.
$$

第二式へ代入すると

$$
s_1+3(1-4s_1)=2,
$$

従って

$$
-11s_1=-1,
\qquad
s_1=\frac1{11}.
$$

$$
s_2
=
1-\frac4{11}
=
\frac7{11}.
$$

よって

$$
x_1=x_0+s_0
=
\boxed{
\begin{pmatrix}
1/11\\
7/11
\end{pmatrix}
}.
$$

実際

$$
Ax_1=b
$$

なので、これは一意な最小点です。
<!-- solution-end -->

### NA12-A04 不定値 Hessian で Newton 法が関数値を増やす

- Level: A
- 目安時間: 12分

$$
f(x,y)=\frac12(x^2-y^2)
$$

に対し、

$$
x_0=
\begin{pmatrix}
0\\1
\end{pmatrix}
$$

から Newton 法を1回行え。

1. $x_1$ を求めよ。
2. $f(x_1)$ と $f(x_0)$ を比較せよ。
3. どの仮定が失われたために降下が保証されないのか説明せよ。

<!-- solution-start -->
#### 詳細解答

$$
\nabla f(x,y)
=
\begin{pmatrix}
x\\-y
\end{pmatrix},
\qquad
H=
\begin{pmatrix}
1&0\\
0&-1
\end{pmatrix}.
$$

$x_0=(0,1)^{\mathsf T}$ では

$$
g_0=
\begin{pmatrix}
0\\-1
\end{pmatrix}.
$$

Newton 方程式

$$
Hs_0=-g_0
=
\begin{pmatrix}
0\\1
\end{pmatrix}
$$

を解くと

$$
s_0=
\begin{pmatrix}
0\\-1
\end{pmatrix}.
$$

従って

$$
x_1=x_0+s_0
=
\boxed{
\begin{pmatrix}
0\\0
\end{pmatrix}
}.
$$

関数値は

$$
f(x_0)=-\frac12,
\qquad
f(x_1)=0.
$$

従って

$$
f(x_1)>f(x_0)
$$

で、関数値は増えています。

Hessian は固有値 $1,-1$ を持つ不定値行列です。正定値性を失ったため、Newton 方程式の解が二次モデルの最小方向になる保証も、降下方向になる保証も失われています。
<!-- solution-end -->

---

## 13. 演習 Level B

### NA12-B01 二次目的関数差の平方完成

- Level: B
- 目安時間: 20分

$A$ を実対称正定値行列とし、

$$
q(x)=\frac12x^{\mathsf T}Ax-b^{\mathsf T}x+c.
$$

$x_*=A^{-1}b$ とする。

展開を省略せず、

$$
q(x)-q(x_*)
=
\frac12(x-x_*)^{\mathsf T}A(x-x_*)
$$

を示し、一意な大域最小性を導け。

<!-- solution-start -->
#### 詳細解答

$$
e=x-x_*
$$

と置くと

$$
x=x_*+e.
$$

従って

$$
\begin{aligned}
q(x)
&=
\frac12(x_*+e)^{\mathsf T}A(x_*+e)
-
b^{\mathsf T}(x_*+e)
+c\\
&=
\frac12x_*^{\mathsf T}Ax_*
+
x_*^{\mathsf T}Ae
+
\frac12e^{\mathsf T}Ae
-
b^{\mathsf T}x_*
-
b^{\mathsf T}e
+c.
\end{aligned}
$$

$Ax_*=b$ と $A^{\mathsf T}=A$ から

$$
x_*^{\mathsf T}Ae
=
(Ax_*)^{\mathsf T}e
=
b^{\mathsf T}e.
$$

従って交差項は打ち消し合い、

$$
q(x)
=
q(x_*)+\frac12e^{\mathsf T}Ae.
$$

すなわち

$$
\boxed{
q(x)-q(x_*)
=
\frac12(x-x_*)^{\mathsf T}A(x-x_*)
}.
$$

$A$ は正定値なので $x\ne x_*$ なら

$$
(x-x_*)^{\mathsf T}A(x-x_*)>0.
$$

従って $x_*$ は一意な大域最小点です。
<!-- solution-end -->

### NA12-B02 最急降下法の条件数評価を再構成する

- Level: B
- 目安時間: 25分

$A$ を実対称正定値行列とし、

$$
m=\lambda_{\min}(A),
\qquad
L=\lambda_{\max}(A).
$$

$$
\widehat\alpha=\frac2{m+L}
$$

と置く。

1. 任意の固有値 $\lambda\in[m,L]$ について
   $$
   |1-\widehat\alpha\lambda|
   \le
   \frac{L-m}{L+m}
   $$
   を示せ。
2. 実対称行列の直交対角化を使って
   $$
   \|(I-\widehat\alpha A)e\|_A
   \le
   \frac{L-m}{L+m}\|e\|_A
   $$
   を示せ。
3. 厳密直線探索付き最急降下法の1反復が、この固定歩幅候補以上に目的関数を減らすことから定理の評価を導け。

<!-- solution-start -->
#### 詳細解答

関数

$$
h(\lambda)=1-\frac{2\lambda}{m+L}
$$

は $\lambda$ に関して一次関数です。

端点では

$$
h(m)
=
\frac{L-m}{L+m},
$$

$$
h(L)
=
-\frac{L-m}{L+m}.
$$

従って区間 $[m,L]$ 上で

$$
\boxed{
|h(\lambda)|
\le
\frac{L-m}{L+m}
}.
$$

次に

$$
A=Q\Lambda Q^{\mathsf T},
\qquad
z=Q^{\mathsf T}e
$$

とします。

すると

$$
\begin{aligned}
\|(I-\widehat\alpha A)e\|_A^2
&=
\sum_i
\lambda_i
(1-\widehat\alpha\lambda_i)^2
z_i^2\\
&\le
\left(
\frac{L-m}{L+m}
\right)^2
\sum_i\lambda_i z_i^2\\
&=
\left(
\frac{L-m}{L+m}
\right)^2
\|e\|_A^2.
\end{aligned}
$$

平方根を取れば

$$
\boxed{
\|(I-\widehat\alpha A)e\|_A
\le
\frac{L-m}{L+m}\|e\|_A
}.
$$

厳密直線探索は、最急降下方向上で $\alpha$ を最適に選びます。従って固定候補 $\widehat\alpha$ より悪い目的関数値にはなりません。

二次関数では

$$
q(x)-q(x_*)
=
\frac12\|x-x_*\|_A^2
$$

なので、

$$
\|e_{k+1}\|_A
\le
\frac{L-m}{L+m}\|e_k\|_A.
$$

最後に

$$
\frac{L-m}{L+m}
=
\frac{\kappa-1}{\kappa+1}
$$

から所望の評価を得ます。
<!-- solution-end -->

### NA12-B03 共役勾配法の歩幅を直線探索から導く

- Level: B
- 目安時間: 20分

実対称正定値二次目的関数

$$
q(x)=\frac12x^{\mathsf T}Ax-b^{\mathsf T}x
$$

と、NA9 の共役勾配法を考える。

1. $r_k=-\nabla q(x_k)$ を示せ。
2. $q(x_k+\alpha p_k)$ の最小化から
   $$
   \alpha_k
   =
   -\frac{\nabla q(x_k)^{\mathsf T}p_k}
   {p_k^{\mathsf T}Ap_k}
   $$
   を導け。
3. NA9 の残差直交性を使って
   $$
   r_k^{\mathsf T}p_k
   =
   r_k^{\mathsf T}r_k
   $$
   を示し、NA9 の共役勾配法の歩幅と一致することを示せ。

<!-- solution-start -->
#### 詳細解答

勾配は

$$
\nabla q(x_k)=Ax_k-b.
$$

一方、残差は

$$
r_k=b-Ax_k.
$$

従って

$$
\boxed{
r_k=-\nabla q(x_k)
}.
$$

次に

$$
\phi(\alpha)=q(x_k+\alpha p_k)
$$

とすると

$$
\phi'(\alpha)
=
\nabla q(x_k)^{\mathsf T}p_k
+
\alpha p_k^{\mathsf T}Ap_k.
$$

$A$ は正定値なので

$$
p_k^{\mathsf T}Ap_k>0.
$$

従って唯一の最小点は

$$
\boxed{
\alpha_k
=
-\frac{\nabla q(x_k)^{\mathsf T}p_k}
{p_k^{\mathsf T}Ap_k}
}.
$$

$r_k=-\nabla q(x_k)$ を使えば

$$
\alpha_k
=
\frac{r_k^{\mathsf T}p_k}
{p_k^{\mathsf T}Ap_k}.
$$

$k=0$ では $p_0=r_0$ なので

$$
r_0^{\mathsf T}p_0=r_0^{\mathsf T}r_0.
$$

$k\ge1$ では

$$
p_k=r_k+\beta_{k-1}p_{k-1}.
$$

NA9 の残差直交性から

$$
r_k^{\mathsf T}p_{k-1}=0.
$$

従って

$$
r_k^{\mathsf T}p_k
=
r_k^{\mathsf T}r_k.
$$

よって

$$
\boxed{
\alpha_k
=
\frac{r_k^{\mathsf T}r_k}
{p_k^{\mathsf T}Ap_k}
},
$$

となり、NA9 の共役勾配法の公式と一致します。
<!-- solution-end -->

---

## 14. 演習 Level C

### NA12-C01 最急降下法と共役勾配法を同じ二次関数で比較する

- Level: C
- 目安時間: 40分

$$
A=
\begin{pmatrix}
1&0\\
0&4
\end{pmatrix},
\qquad
b=0,
\qquad
q(x)=\frac12x^{\mathsf T}Ax
$$

とし、

$$
x_0=
\begin{pmatrix}
1\\1
\end{pmatrix}
$$

から始める。

1. 厳密直線探索付き最急降下法の $x_1$ を求めよ。
2. さらに $x_2$ を求め、2反復後にも最小点 $0$ に到達しないことを確認せよ。
3. 同じ $x_0$ から共役勾配法を実行し、第一反復が最急降下法と一致することを示せ。
4. 共役勾配法の $\beta_0,p_1,\alpha_1$ を求め、$x_2=0$ となることを示せ。
5. なぜ2次元ではこの違いが生じるのか、NA9 の $A$-共役性と有限回終了を使って説明せよ。

<!-- solution-start -->
#### 詳細解答

### 1. 最急降下法の第一反復

$$
g_0=Ax_0
=
\begin{pmatrix}
1\\4
\end{pmatrix}.
$$

厳密直線探索の歩幅は

$$
\alpha_0
=
\frac{g_0^{\mathsf T}g_0}
{g_0^{\mathsf T}Ag_0}.
$$

$$
g_0^{\mathsf T}g_0=17,
$$

$$
Ag_0=
\begin{pmatrix}
1\\16
\end{pmatrix},
\qquad
g_0^{\mathsf T}Ag_0=65.
$$

従って

$$
\alpha_0=\frac{17}{65}.
$$

よって

$$
x_1
=
x_0-\alpha_0g_0
=
\boxed{
\begin{pmatrix}
48/65\\
-3/65
\end{pmatrix}
}.
$$

### 2. 最急降下法の第二反復

$$
g_1=Ax_1
=
\begin{pmatrix}
48/65\\
-12/65
\end{pmatrix}.
$$

分子は

$$
g_1^{\mathsf T}g_1
=
\frac{48^2+12^2}{65^2}
=
\frac{2448}{4225}.
$$

また

$$
Ag_1
=
\begin{pmatrix}
48/65\\
-48/65
\end{pmatrix}
$$

なので

$$
g_1^{\mathsf T}Ag_1
=
\frac{48^2+12\cdot48}{65^2}
=
\frac{2880}{4225}.
$$

従って

$$
\alpha_1
=
\frac{2448}{2880}
=
\frac{17}{20}.
$$

よって

$$
\begin{aligned}
x_2
&=
x_1-\frac{17}{20}g_1\\
&=
\begin{pmatrix}
48/65\\
-3/65
\end{pmatrix}
-
\frac{17}{20}
\begin{pmatrix}
48/65\\
-12/65
\end{pmatrix}\\
&=
\boxed{
\begin{pmatrix}
36/325\\
36/325
\end{pmatrix}
}.
\end{aligned}
$$

従って $x_2\ne0$ です。最急降下法は2次元でも一般に2回で終わりません。

### 3. 共役勾配法の第一反復

$b=0$ なので

$$
r_0=b-Ax_0
=
\begin{pmatrix}
-1\\
-4
\end{pmatrix}
=
-g_0.
$$

$$
p_0=r_0
$$

だから第一方向は最急降下方向と同じです。

共役勾配法の歩幅は

$$
\alpha_0
=
\frac{r_0^{\mathsf T}r_0}
{p_0^{\mathsf T}Ap_0}
=
\frac{17}{65}.
$$

従って

$$
x_1
=
\begin{pmatrix}
48/65\\
-3/65
\end{pmatrix},
$$

で最急降下法と一致します。

### 4. 共役勾配法の第二反復

$$
r_1=b-Ax_1
=
\begin{pmatrix}
-48/65\\
12/65
\end{pmatrix}.
$$

従って

$$
r_1^{\mathsf T}r_1
=
\frac{2448}{4225},
\qquad
r_0^{\mathsf T}r_0=17.
$$

よって

$$
\beta_0
=
\frac{2448/4225}{17}
=
\frac{144}{4225}.
$$

したがって

$$
\begin{aligned}
p_1
&=
r_1+\beta_0p_0\\
&=
\begin{pmatrix}
-48/65\\
12/65
\end{pmatrix}
+
\frac{144}{4225}
\begin{pmatrix}
-1\\
-4
\end{pmatrix}\\
&=
\boxed{
\begin{pmatrix}
-3264/4225\\
204/4225
\end{pmatrix}
}.
\end{aligned}
$$

次に

$$
\alpha_1
=
\frac{r_1^{\mathsf T}r_1}
{p_1^{\mathsf T}Ap_1}
=
\boxed{
\frac{65}{68}
}.
$$

従って

$$
\frac{65}{68}p_1
=
\begin{pmatrix}
-48/65\\
3/65
\end{pmatrix}.
$$

よって

$$
x_2
=
x_1+\alpha_1p_1
=
\begin{pmatrix}
48/65\\
-3/65
\end{pmatrix}
+
\begin{pmatrix}
-48/65\\
3/65
\end{pmatrix}
=
\boxed{
\begin{pmatrix}
0\\
0
\end{pmatrix}
}.
$$

### 5. 構造の説明

最急降下法は各反復で現在の負の勾配へ向き直るため、以前に進んだ方向の効果を後の反復で一部打ち消すことがあります。

一方、共役勾配法の探索方向は NA9 の定理により互いに $A$-共役です。

非零な $A$-共役方向は線形独立なので、$\mathbb R^2$ では高々2本で全空間を張ります。したがって丸め誤差のない厳密演算では2反復以内に一意な最小点へ到達します。

この例ではその有限回終了が実際に

$$
x_2=0
$$

として現れています。
<!-- solution-end -->

---

## 15. この章の要点

1. 微分可能な無制約最適化問題では、局所最小点で
   $$
   \nabla f(x_*)=0
   $$
   が必要である。
2. $C^2$ 関数の局所最小点では Hessian は半正定値であり、停留点で Hessian が正定値なら狭義局所最小点である。
3. 
   $$
   \nabla f(x)^{\mathsf T}p<0
   $$
   なら、十分小さい正の歩幅で目的関数は減る。
4. Euclid ノルムの単位方向の中では、負の勾配がその方向に沿う一次変化率を最も小さくする。
5. 実対称正定値二次目的関数では
   $$
   \nabla q(x)=Ax-b
   $$
   なので、停留条件と線形方程式 $Ax=b$ は同じである。
6. 二次目的関数差は
   $$
   q(x)-q(x_*)
   =
   \frac12\|x-x_*\|_A^2
   $$
   であり、最適化誤差と $A$-ノルム誤差が一致する。
7. 厳密直線探索付き最急降下法の最悪時収束率には
   $$
   \frac{\kappa-1}{\kappa+1}
   $$
   が現れる。
8. Newton 法は実対称正定値二次関数では1回で終了するが、Hessian が不定値なら Newton 方向は降下方向とは限らない。
9. 共役勾配法では残差が負の勾配であり、NA9 の歩幅は二次目的関数の厳密直線探索から得られる。
10. NA9 の $A$-ノルム最良近似性は、そのまま Krylov アフィン空間上で二次目的関数を最小にする性質である。
11. 共役勾配法の最悪時評価には $\sqrt\kappa$ が現れ、最急降下法より悪条件性の影響が緩和される。

これで NA1–NA12 の数値解析本線が完了します。次は FDM1 へ進みます。
