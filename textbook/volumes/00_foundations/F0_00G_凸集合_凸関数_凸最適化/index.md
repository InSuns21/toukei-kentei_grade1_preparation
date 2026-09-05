# F0-00G 凸集合・凸関数・凸最適化の基礎

この講義では「凸性がなぜ局所情報を大域最適化へ変えるのか」に集中します。DREAM THEATER の標準通読では関数解析・分離定理まで準備したあと、この章へ戻って凸解析系列をまとめて読みます。Slater条件・強双対性・KKTは、epigraph・劣微分・Fenchel双対を経た後段で扱います。

$$\boxed{\text{凸集合}\to\text{凸関数}\to\text{一次支持}\to\text{局所最小=大域最小}\to\text{凸実行可能集合}}$$

---

## 1. 凸結合

<a id="def-f0-00g-convex-combination"></a>

<!-- formal-statement-start -->
> **定義（凸結合）**  
> 点 $x_1,\dots,x_k$ と係数 $\theta_i\ge0$、$\sum_{i=1}^k\theta_i=1$ に対して

$$
\sum_{i=1}^k\theta_i x_i
$$

> を $x_1,\dots,x_k$ の **凸結合** といいます。
<!-- formal-statement-end -->

<!-- definition-example-start: def-f0-00g-convex-combination -->
### 1.1 例：2点の凸結合

**定義の確認**

$$
x_1=\begin{pmatrix}1\\0\end{pmatrix},
\qquad
x_2=\begin{pmatrix}0\\2\end{pmatrix},
\qquad
\theta_1=\frac14,
\quad
\theta_2=\frac34
$$

とします。係数はともに非負で

$$
\theta_1+\theta_2=1
$$

なので定義の係数条件を満たします。従って

$$
\theta_1x_1+\theta_2x_2
=\begin{pmatrix}1/4\\3/2\end{pmatrix}
$$

は $x_1,x_2$ の凸結合です。
<!-- definition-example-end -->

2点なら

$$
(1-t)x+ty,
\qquad0\le t\le1
$$

です。

これは $x$ と $y$ を結ぶ線分上の点を表します。

---

## 2. 凸集合

<a id="def-f0-00g-convex-set"></a>

<!-- formal-statement-start -->
> **定義（凸集合）**  
> 集合 $C$ が **凸集合** であるとは、任意の $x,y\in C$ と $0\le t\le1$ に対して

$$
(1-t)x+ty\in C
$$

> が成り立つことです。
<!-- formal-statement-end -->

<!-- definition-example-start: def-f0-00g-convex-set -->
### 2.1 例：半空間は凸集合

**定義の確認**

$$
C=\{x\in\mathbb R^n:a^{\mathsf T}x\le b\}
$$

とします。任意の $x,y\in C$ と $0\le t\le1$ に対して

$$
\begin{aligned}
a^{\mathsf T}((1-t)x+ty)
&=(1-t)a^{\mathsf T}x+t a^{\mathsf T}y\\
&\le(1-t)b+tb=b.
\end{aligned}
$$

したがって $(1-t)x+ty\in C$ です。任意の $x,y,t$ について定義の条件を満たすため、$C$ は凸集合です。
<!-- definition-example-end -->

つまり

> 集合内の2点を結ぶ線分が、全部集合の中に残る。

という条件です。

### 例：区間

$$
[a,b]
$$

は凸集合です。

### 例：半空間

$$
C
=\{x\in\mathbb R^n:a^{\mathsf T}x\le b\}
$$

も凸集合です。

実際 $x,y\in C$ なら

$$
\begin{aligned}
a^{\mathsf T}((1-t)x+ty)
&=(1-t)a^{\mathsf T}x+t a^{\mathsf T}y\\
&\le(1-t)b+tb\\
&=b.
\end{aligned}
$$

### 非例：円周

$$
\{x\in\mathbb R^2:\|z\|=1\}
$$

は凸ではありません。

円周上の反対側の2点を結ぶ線分は円の内部を通るためです。

---

## 3. 凸包

<a id="def-f0-00g-convex-hull"></a>

<!-- formal-statement-start -->
> **定義（凸包）**  
> 集合 $S$ を含む凸集合のうち包含関係で最小のものを $S$ の **凸包** といい、

$$
\operatorname{conv}(S)
$$

> と書きます。
<!-- formal-statement-end -->

<!-- definition-example-start: def-f0-00g-convex-hull -->
### 3.1 例：2点の凸包は線分

**定義の確認**

$S=\{0,2\}\subset\mathbb R$ とします。区間 $[0,2]$ は凸で $S$ を含みます。一方、$S$ を含む任意の凸集合 $C$ は、定義により任意の $0\le t\le1$ に対して

$$
(1-t)0+t2=2t\in C
$$

を満たすので $[0,2]\subset C$ です。従って $[0,2]$ は $S$ を含む凸集合のうち包含関係で最小であり、

$$
\operatorname{conv}(S)=[0,2].
$$

「$S$ を含む」「凸である」「その中で最小」という定義の三点を確認しています。
<!-- definition-example-end -->

有限集合

$$
S=\{x_1,\dots,x_k\}
$$

なら

$$
\boxed{
\operatorname{conv}(S)
=
\left\{
\sum_i\theta_i x_i:
\theta_i\ge0,
\sum_i\theta_i=1
\right\}
}
$$

です。

F0-02Bでは、正例・負例の訓練点の凸包が交わるかどうかでhard-margin SVMの線形分離可能性を読みます。

---

## 4. 凸集合の共通部分は凸

凸集合 $C_1,C_2$ の共通部分

$$
C_1\cap C_2
$$

も凸です。

$x,y\in C_1\cap C_2$ なら

$$
x,y\in C_1
$$

かつ

$$
x,y\in C_2.
$$

両方が凸なので

$$
(1-t)x+ty
$$

は両方に属します。

したがって

$$
(1-t)x+ty\in C_1\cap C_2.
$$

線形不等式を複数課した実行可能集合が凸になるのはこのためです。

---

## 5. 凸関数

<a id="def-f0-00g-convex-function"></a>

<!-- formal-statement-start -->
> **定義（凸関数）**  
> 凸集合 $C$ 上の関数 $f:C\to\mathbb R$ が **凸関数** であるとは、任意の $x,y\in C$ と $0\le t\le1$ に対して

$$
f((1-t)x+ty)\le(1-t)f(x)+tf(y)
$$

> が成り立つことです。
<!-- formal-statement-end -->

<!-- definition-example-start: def-f0-00g-convex-function -->
### 5.1 例：$f(x)=x^2$ は凸

**定義の確認**

任意の $x,y\in\mathbb R$ と $0\le t\le1$ に対して

$$
\begin{aligned}
&(1-t)f(x)+tf(y)-f((1-t)x+ty)\\
&=(1-t)x^2+ty^2-((1-t)x+ty)^2\\
&=t(1-t)(x-y)^2\ge0.
\end{aligned}
$$

従って

$$
f((1-t)x+ty)\le(1-t)f(x)+tf(y)
$$

が全ての $x,y,t$ で成立し、定義より $f(x)=x^2$ は凸関数です。
<!-- definition-example-end -->

右辺はグラフ上の2点を結ぶ弦の高さです。

したがって凸関数とは

> グラフが弦より上へ飛び出さない関数

です。

---

## 6. 代表例：二次関数

$$
f(x)=x^2
$$

は凸です。

2階微分すると

$$
f''(x)=2>0.
$$

多変数でも、領域と滑らかさを明記すれば同じ判定が**必要十分条件**になります。

<a id="thm-f0-00g-hessian-convexity"></a>

<!-- formal-statement-start -->
> **定理（$C^2$ 凸関数のHessian判定）**  
> $U\subset\mathbb R^d$ を開凸集合、$f\in C^2(U)$ とする。このとき

$$
\boxed{f\text{ が凸}\iff\nabla^2 f(x)\succeq0\quad(\forall x\in U)}
$$

> が成り立つ。
<!-- formal-statement-end -->

F0-00F1で扱った半正定値性が、ここで凸性の微分判定へ戻ってきます。

<!-- proof-start -->
### 証明：任意の直線へ制限して1変数へ落とす

まず1変数の準備をします。開区間上の $C^2$ 関数 $\phi$ について $\phi$ が凸であることと $\phi''(t)\ge0$ は同値です。

$\phi''\ge0$ なら平均値の定理から $\phi'$ は単調非減少です。従って $a<b$ と $0<s<1$ に対し $c=(1-s)a+sb$ と置けば

$$
\frac{\phi(c)-\phi(a)}{c-a}\le\frac{\phi(b)-\phi(c)}{b-c},
$$

これを整理して $\phi(c)\le(1-s)\phi(a)+s\phi(b)$ を得るので凸です。

逆に $\phi$ が凸なら、任意の $t$ と十分小さい $h>0$ に対して中点不等式

$$
\phi(t)\le\frac{\phi(t-h)+\phi(t+h)}2
$$

が成り立ちます。従って

$$
\frac{\phi(t+h)-2\phi(t)+\phi(t-h)}{h^2}\ge0.
$$

$h\downarrow0$ とすれば $\phi''(t)\ge0$ です。

#### $(\Rightarrow)$ 凸性からHessian半正定値性

$x\in U$ と $v\in\mathbb R^d$ を任意に取り、$\phi(t):=f(x+tv)$ と置きます。$U$ は開なので0近傍で定義され、$f$ の凸性から $\phi$ も凸です。よって

$$
0\le\phi''(0)=v^{\mathsf T}\nabla^2f(x)v.
$$

全ての $v$ で成り立つので $\nabla^2f(x)\succeq0$ です。

#### $(\Leftarrow)$ Hessian半正定値性から凸性

$x,y\in U$ を任意に取り

$$
\phi(t):=f((1-t)x+ty),\qquad0\le t\le1
$$

と置きます。$U$ が凸なので線分全体が $U$ に含まれ、連鎖律から

$$
\phi''(t)=(y-x)^{\mathsf T}\nabla^2 f((1-t)x+ty)(y-x)\ge0.
$$

従って $\phi$ は凸で

$$
f((1-t)x+ty)\le(1-t)f(x)+tf(y).
$$

よって $f$ は凸です。
<!-- proof-end -->

### 6.1 注意：狭義凸とHessian正定値は完全な同値ではない

全ての点で $\nabla^2f(x)\succ0$ なら $f$ は狭義凸ですが、逆は一般に成り立ちません。例えば $f(x)=x^4$ は $\mathbb R$ 上で狭義凸ですが $f''(0)=0$ です。「凸性」と「Hessian半正定値」は $C^2$ の下で同値ですが、「狭義凸」と「Hessian正定値」を同値と覚えないことが重要です。

---

## 7. 狭義凸関数

<a id="def-f0-00g-strictly-convex"></a>

<!-- formal-statement-start -->
> **定義（狭義凸関数）**  
> 凸集合上の関数 $f$ が、任意の異なる $x,y$ と $0<t<1$ に対して

$$
f((1-t)x+ty)<(1-t)f(x)+tf(y)
$$

> を満たすとき、$f$ は **狭義凸** であるといいます。
<!-- formal-statement-end -->

<!-- definition-example-start: def-f0-00g-strictly-convex -->
### 7.1 例：$f(x)=x^2$ は狭義凸

**定義の確認**

異なる $x,y\in\mathbb R$ と $0<t<1$ に対して

$$
(1-t)f(x)+tf(y)-f((1-t)x+ty)
=t(1-t)(x-y)^2>0.
$$

ここでは $t(1-t)>0$ かつ $(x-y)^2>0$ なので不等号が厳密になります。従って

$$
f((1-t)x+ty)<(1-t)f(x)+tf(y)
$$

が定義どおり成立し、$f(x)=x^2$ は狭義凸です。
<!-- definition-example-end -->

狭義凸関数が最小値を持つ場合、その最小点は高々1つです。

もし異なる2点 $x,y$ が両方最小点なら、その中点で

$$
f\left(\frac{x+y}{2}\right)
<
\frac12f(x)+\frac12f(y)
$$

となり、最小値よりさらに小さくなって矛盾するためです。

---

## 8. 微分可能な凸関数の一次支持不等式

<a id="prop-f0-00g-first-order-convexity"></a>

<!-- formal-statement-start -->
> **命題（微分可能な凸関数の一次支持不等式）**  
> $C\subset\mathbb R^d$ を凸な開集合、$f:C\to\mathbb R$ を微分可能な凸関数とします。このとき任意の $x,y\in C$ に対して

$$
\boxed{
f(y)\ge f(x)+\nabla f(x)^{\mathsf T}(y-x)
}
$$

> が成り立ちます。
<!-- formal-statement-end -->

$f$ が微分可能な凸関数なら

$$
\boxed{
f(y)
\ge
f(x)+\nabla f(x)^{\mathsf T}(y-x)
}
$$

が成り立ちます。

右辺は $x$ における接平面です。

つまり凸関数のグラフは、各点の接平面より下へ落ちません。

### 導出

$$
g(t)=f(x+t(y-x))
$$

と置きます。

$g$ は1変数の凸関数です。

凸性から $0<t\le1$ について

$$
g(t)
\le
(1-t)g(0)+tg(1).
$$

整理すると

$$
\frac{g(t)-g(0)}{t}
\le g(1)-g(0).
$$

$t\downarrow0$ とすると

$$
g'(0)
\le g(1)-g(0).
$$

$$
g'(0)=\nabla f(x)^{\mathsf T}(y-x)
$$

なので

$$
f(y)
\ge
f(x)+\nabla f(x)^{\mathsf T}(y-x).
$$

---

## 9. 凸関数では停留点が大域最小になる

もし

$$
\nabla f(x^*)=0
$$

なら、一次支持不等式から任意の $y$ について

$$
f(y)
\ge
f(x^*)+
\nabla f(x^*)^{\mathsf T}(y-x^*)
=f(x^*).
$$

したがって

$$
\boxed{x^*\text{ は大域最小点}}
$$

です。

一般の非線形最適化では

$$
\nabla f=0
$$

は単なる候補でした。

凸性が入ると局所情報が大域情報へ昇格します。

---

## 10. 局所最小は大域最小

凸集合 $C$ 上の凸関数 $f$ を考えます。

$x^*$ が局所最小なのに、大域最小でないと仮定します。

するとある $y\in C$ が存在して

$$
f(y)<f(x^*).
$$

凸性から $0<t<1$ について

$$
\begin{aligned}
f((1-t)x^*+ty)
&\le
(1-t)f(x^*)+tf(y)\\
&<f(x^*).
\end{aligned}
$$

$t$ を十分小さくすれば

$$
(1-t)x^*+ty
$$

は $x^*$ の任意に小さい近傍にあります。

これは局所最小性に反します。

よって

$$
\boxed{
\text{凸問題では局所最小}=\text{大域最小}
}
$$

です。

---

## 11. 凸最適化問題

典型的な凸最適化問題は

$$
\min_x f(x)
$$

subject to

$$
g_i(x)\le0,
\qquad i=1,\dots,m,
$$

$$
Ax=b
$$

という形です。

ここで

- $f$ は凸関数
- 各 $g_i$ は凸関数
- 等式制約はaffine

とします。

このとき実行可能集合は凸です。

### なぜ不等式制約集合が凸なのか

$$
C_i=\{x:g_i(x)\le0\}
$$

を考えます。

$x,y\in C_i$ なら

$$
g_i(x)\le0,
\qquad
g_i(y)\le0.
$$

凸性から

$$
\begin{aligned}
g_i((1-t)x+ty)
&\le
(1-t)g_i(x)+tg_i(y)\\
&\le0.
\end{aligned}
$$

よって $C_i$ は凸です。

複数制約の共通部分も凸なので、実行可能集合全体も凸です。

---

## 12. 演習

### F0-00G-A01 凸集合判定

- Level: A
- 目安時間: 8分

$C=\{x\in\mathbb R^n:a^Tx\le b\}$ が凸であることを示せ。

<!-- solution-start -->
#### 詳細解答
$x,y\in C$, $0\le t\le1$ とすると $a^T((1-t)x+ty)=(1-t)a^Tx+ta^Ty\le b$。
#### 本番答案
凸結合に線形性を適用すれば制約を保つ。
#### 採点基準（20点）
- 凸結合設定: 5点
- 線形性: 7点
- 不等式: 6点
- 結論: 2点
<!-- solution-end -->

### F0-00G-B01 局所最小は大域最小

- Level: B
- 目安時間: 12分

凸集合 $C$ 上の凸関数 $f$ について、局所最小点が大域最小点であることを示せ。

<!-- solution-start -->
#### 詳細解答
局所最小 $x^*$ が大域最小でないなら $f(y)<f(x^*)$ となる $y\in C$ がある。十分小さい $t>0$ で $z_t=(1-t)x^*+ty$ は $x^*$ の近傍にあり、凸性から $f(z_t)\le(1-t)f(x^*)+tf(y)<f(x^*)$。局所最小性に矛盾。
#### 本番答案
大域的により小さい点への線分上で、凸性により任意に近い改善点ができるため矛盾。
#### 採点基準（20点）
- 背理法: 4点
- 凸結合点: 5点
- 凸性評価: 7点
- 矛盾と結論: 4点
<!-- solution-end -->

### F0-00G-A02 Hessianで二次関数の凸性を判定する

- Level: A
- 目安時間: 10分

$$
f(x,y)=x^2+4xy+5y^2
$$

が $\mathbb R^2$ 上で凸であることをHessian判定から示せ。

<!-- solution-start -->
#### 詳細解答

$$
\nabla^2f=
\begin{pmatrix}
2&4\\
4&10
\end{pmatrix}.
$$

先頭主座小行列式は $2>0$、行列式は $20-16=4>0$ なので正定値。従って特に半正定値であり、$C^2$ Hessian判定から $f$ は凸である。実際には正定値なので狭義凸でもある。

#### 本番答案
$\nabla^2f=\begin{pmatrix}2&4\\4&10\end{pmatrix}\succ0$（主座小行列式 $2,4$ が正）。よってHessian判定から凸。

#### 採点基準（20点）
- Hessian計算: 8点
- PSD/PD判定: 7点
- 凸性結論: 5点
<!-- solution-end -->

### F0-00G-B02 狭義凸でもHessianが正定値とは限らない

- Level: B
- 目安時間: 15分

$f(x)=x^4$ が $\mathbb R$ 上で狭義凸であることを示し、一方で $f''(0)=0$ であることから

$$
\text{狭義凸}\Rightarrow\nabla^2f(x)\succ0\ (\forall x)
$$

が誤りであることを説明せよ。

<!-- solution-start -->
#### 詳細解答
$f'(x)=4x^3$ は $\mathbb R$ 上で狭義単調増加である。従って任意の $x<y$ で接線の傾きが厳密に増加し、$x^4$ は狭義凸である。一方

$$
f''(x)=12x^2
$$

なので $f''(0)=0$。従って狭義凸であってもHessianが全点で正定値とは限らない。なお $f''(x)\ge0$ は全点で成り立つので、通常の凸性と半正定値性の同値には矛盾しない。

#### 本番答案
$f'(x)=4x^3$ は狭義増加なので $f$ は狭義凸。しかし $f''(0)=0$。従って狭義凸 $\Rightarrow$ Hessian正定値は成り立たない。

#### 採点基準（20点）
- $f'$ の狭義単調性: 7点
- 狭義凸の結論: 5点
- $f''(0)=0$: 4点
- 同値ではないことの説明: 4点
<!-- solution-end -->

---

## 13. epigraph・閉凸関数への接続

ここまでで凸性そのものと「局所情報が大域情報へ昇格する」理由を準備しました。次は関数を epigraph という凸集合として見直し、閉性・下半連続性・支持超平面へ進みます。その後、劣微分・錐・Fenchel共役を経て制約付き最適化とKKTへ接続します。

**次：[F0-00G1 epigraph・閉凸関数・支持超平面](../F0_00G1_epigraph_閉凸関数_支持超平面/index.md)**
