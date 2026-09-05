# F0-00G 凸集合・凸関数・凸最適化の基礎

この講義では「凸性がなぜ局所情報を大域最適化へ変えるのか」に集中します。DREAM THEATER の標準通読では関数解析・分離定理まで準備したあと、この章へ戻って凸解析系列をまとめて読みます。

Slater 条件・強双対性・KKT はここではまだ使いません。まず

$$
\boxed{
\text{凸集合}
\to
\text{凸関数}
\to
\text{一次支持}
\to
\text{局所最小=大域最小}
\to
\text{凸最適化問題}
}
$$

までを閉じます。

---

## 1. 凸結合

<a id="def-f0-00g-convex-combination"></a>

<!-- formal-statement-start -->
> **定義（凸結合）**  
> 点 $x_1,\dots,x_k$ と非負係数 $\theta_1,\dots,\theta_k$ が、係数の総和1という条件を満たすとします。このとき次の点を $x_1,\dots,x_k$ の **凸結合** といいます。

$$
\theta_i\ge0,
\qquad
\sum_{i=1}^k\theta_i=1,
$$

$$
\sum_{i=1}^k\theta_i x_i.
$$
<!-- formal-statement-end -->

2点なら

$$
(1-t)x+ty,
\qquad0\le t\le1,
$$

で、$x$ と $y$ を結ぶ線分上の点です。

### 1.1 例

$$
x_1=
\begin{pmatrix}1\\0\end{pmatrix},
\qquad
x_2=
\begin{pmatrix}0\\2\end{pmatrix},
\qquad
\theta_1=\frac14,
\quad
\theta_2=\frac34
$$

なら

$$
\theta_1x_1+\theta_2x_2
=
\begin{pmatrix}1/4\\3/2\end{pmatrix}
$$

は2点の凸結合です。

---

## 2. 凸集合

<a id="def-f0-00g-convex-set"></a>

<!-- formal-statement-start -->
> **定義（凸集合）**  
> 集合 $C$ が **凸集合** であるとは、任意の $x,y\in C$ と $0\le t\le1$ に対して次が成り立つことです。

$$
(1-t)x+ty\in C.
$$
<!-- formal-statement-end -->

つまり

> 集合内の2点を結ぶ線分が、全部集合の中に残る。

という条件です。

### 2.1 例：半空間

$$
C=\{x\in\mathbb R^n:a^{\mathsf T}x\le b\}
$$

は凸です。実際 $x,y\in C$ なら

$$
\begin{aligned}
a^{\mathsf T}((1-t)x+ty)
&=(1-t)a^{\mathsf T}x+t a^{\mathsf T}y\\
&\le(1-t)b+tb=b.
\end{aligned}
$$

### 2.2 非例：円周

$$
\{x\in\mathbb R^2:\|x\|=1\}
$$

は凸ではありません。例えば $(1,0)$ と $(-1,0)$ は円周上ですが、その中点 $(0,0)$ は円周上にありません。

---

## 3. 凸包

<a id="def-f0-00g-convex-hull"></a>

<!-- formal-statement-start -->
> **定義（凸包）**  
> 集合 $S$ を含む凸集合のうち包含関係で最小のものを $S$ の **凸包** といい、$\operatorname{conv}(S)$ と書きます。
<!-- formal-statement-end -->

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
\sum_{i=1}^k\theta_i x_i:
\theta_i\ge0,
\ \sum_{i=1}^k\theta_i=1
\right\}
}.
$$

例えば

$$
\operatorname{conv}\{0,2\}=[0,2].
$$

F0-02B1 では、正例・負例の訓練点の凸包が交わるかどうかで hard-margin SVM の線形分離可能性を読みます。

---

## 4. 凸集合の共通部分は凸

$\{C_\alpha\}_{\alpha\in A}$ が凸集合族なら

$$
\bigcap_{\alpha\in A}C_\alpha
$$

も凸です。

実際 $x,y$ が共通部分に属するなら、全ての $\alpha$ について $x,y\in C_\alpha$ です。各 $C_\alpha$ の凸性から

$$
(1-t)x+ty\in C_\alpha
$$

が全ての $\alpha$ で成立するため、凸結合も共通部分に属します。

この事実が、複数の凸不等式制約から作られる実行可能集合が凸になる基本理由です。

---

## 5. 凸関数

<a id="def-f0-00g-convex-function"></a>

<!-- formal-statement-start -->
> **定義（凸関数）**  
> 凸集合 $C$ 上の関数 $f:C\to\mathbb R$ が **凸関数** であるとは、任意の $x,y\in C$ と $0\le t\le1$ に対して次が成り立つことです。

$$
f((1-t)x+ty)
\le
(1-t)f(x)+tf(y).
$$
<!-- formal-statement-end -->

右辺はグラフ上の2点を結ぶ弦の高さです。したがって凸関数とは

> グラフが弦より上へ飛び出さない関数

です。

### 5.1 例：$f(x)=x^2$

$$
\begin{aligned}
&(1-t)x^2+ty^2-((1-t)x+ty)^2\\
&=t(1-t)(x-y)^2\ge0.
\end{aligned}
$$

従って $x^2$ は凸です。

---

## 6. $C^2$ 関数の Hessian 判定

<a id="thm-f0-00g-hessian-convexity"></a>

<!-- formal-statement-start -->
> **定理（$C^2$ 凸関数の Hessian 判定）**  
> $U\subset\mathbb R^d$ を開凸集合、$f\in C^2(U)$ とします。このとき、$f$ が凸であることと、全点で Hessian が半正定値であることは同値です。

$$
\boxed{
f\text{ が凸}
\iff
\nabla^2f(x)\succeq0
\quad(\forall x\in U)
}.
$$
<!-- formal-statement-end -->

F0-00F1 で扱った半正定値性が、ここで凸性の微分判定へ戻ってきます。

<!-- proof-start -->
### 証明

任意の直線へ制限して1変数へ落とします。

$x\in U$、$v\in\mathbb R^d$ に対し

$$
\phi(t)=f(x+tv)
$$

と置けば

$$
\phi''(t)
=v^{\mathsf T}\nabla^2f(x+tv)v.
$$

$f$ が凸なら $\phi$ も凸なので、1変数の凸関数の2階微分判定から

$$
\phi''(0)
=v^{\mathsf T}\nabla^2f(x)v
\ge0.
$$

任意の $v$ で成り立つので $\nabla^2f(x)\succeq0$ です。

逆に全点で Hessian が半正定値とします。$x,y\in U$ に対し

$$
\psi(t)=f((1-t)x+ty),
\qquad0\le t\le1
$$

と置くと

$$
\psi''(t)
=(y-x)^{\mathsf T}
\nabla^2f((1-t)x+ty)
(y-x)
\ge0.
$$

従って $\psi$ は凸で

$$
\psi(t)
\le
(1-t)\psi(0)+t\psi(1).
$$

これは $f$ の凸性そのものです。$\square$
<!-- proof-end -->

---

## 7. 狭義凸

<a id="def-f0-00g-strictly-convex"></a>

<!-- formal-statement-start -->
> **定義（狭義凸関数）**  
> 凸集合上の関数 $f$ が、任意の異なる $x,y$ と $0<t<1$ に対して次の厳密不等式を満たすとき、$f$ は **狭義凸** であるといいます。

$$
f((1-t)x+ty)
<
(1-t)f(x)+tf(y).
$$
<!-- formal-statement-end -->

狭義凸関数が最小値を持つ場合、その最小点は高々1つです。

> **注意**  
> 全点で $\nabla^2f(x)\succ0$ なら狭義凸ですが、逆は一般には成り立ちません。例えば $f(x)=x^4$ は狭義凸ですが $f''(0)=0$ です。

---

## 8. 微分可能な凸関数の一次支持不等式

<a id="prop-f0-00g-first-order-convexity"></a>
<a id="thm-f0-00g-first-order-convexity"></a>

<!-- formal-statement-start -->
> **定理（微分可能な凸関数の一次支持不等式）**  
> $C\subset\mathbb R^d$ を開凸集合、$f:C\to\mathbb R$ を微分可能な凸関数とします。このとき任意の $x,y\in C$ に対して、接平面は関数を下から支えます。

$$
\boxed{
f(y)
\ge
f(x)+\nabla f(x)^{\mathsf T}(y-x)
}.
$$
<!-- formal-statement-end -->

<!-- proof-start -->
### 証明

$$
g(t)=f(x+t(y-x))
$$

と置きます。$g$ は1変数の凸関数なので $0<t\le1$ について

$$
g(t)
\le
(1-t)g(0)+tg(1).
$$

従って

$$
\frac{g(t)-g(0)}{t}
\le
g(1)-g(0).
$$

$t\downarrow0$ とすると

$$
\nabla f(x)^{\mathsf T}(y-x)
\le
f(y)-f(x),
$$

すなわち主張を得ます。$\square$
<!-- proof-end -->

この不等式は次の C4 で、微分できない凸関数の劣勾配不等式へ一般化されます。

---

## 9. 停留点は大域最小

微分可能な凸関数で

$$
\nabla f(x^*)=0
$$

なら一次支持不等式から任意の $y$ に対して

$$
f(y)
\ge
f(x^*)+
\nabla f(x^*)^{\mathsf T}(y-x^*)
=f(x^*).
$$

従って

$$
\boxed{x^*\text{ は大域最小点}}.
$$

一般の非線形最適化では $\nabla f=0$ は単なる候補ですが、凸性が入ると局所情報が大域情報へ昇格します。

---

## 10. 局所最小は大域最小

<a id="thm-f0-00g-local-global"></a>

<!-- formal-statement-start -->
> **定理（凸関数の局所最小は大域最小）**  
> 凸集合 $C$ 上の凸関数 $f:C\to\mathbb R$ では、任意の局所最小点は大域最小点です。
<!-- formal-statement-end -->

<!-- proof-start -->
### 証明

$x^*$ が局所最小だが大域最小でないと仮定します。するとある $y\in C$ が存在して

$$
f(y)<f(x^*).
$$

$0<t<1$ に対し

$$
z_t=(1-t)x^*+ty\in C
$$

であり、凸性から

$$
\begin{aligned}
f(z_t)
&\le(1-t)f(x^*)+tf(y)\\
&<f(x^*).
\end{aligned}
$$

$t\downarrow0$ なら $z_t\to x^*$ なので、$x^*$ の任意に小さい近傍により小さい値を持つ点が存在し、局所最小性に矛盾します。$\square$
<!-- proof-end -->

---

## 11. 凸最適化問題

<a id="def-f0-00g-convex-optimization"></a>

<!-- formal-statement-start -->
> **定義（凸最適化問題）**  
> 目的関数と不等式制約が凸関数で、等式制約が affine である最適化問題を凸最適化問題と呼びます。典型形は次です。

$$
\min_x f(x)
$$

subject to

$$
g_i(x)\le0,
\qquad i=1,\dots,m,
$$

$$
Ax=b.
$$
<!-- formal-statement-end -->

各不等式制約集合

$$
C_i=\{x:g_i(x)\le0\}
$$

は凸です。実際 $x,y\in C_i$ なら

$$
\begin{aligned}
g_i((1-t)x+ty)
&\le(1-t)g_i(x)+tg_i(y)\\
&\le0.
\end{aligned}
$$

等式制約 $Ax=b$ の解集合も affine なので凸です。共通部分も凸であるため、実行可能集合全体が凸になります。

ここまでは「凸問題ならなぜ扱いやすいか」の幾何です。Lagrange 双対・Slater 条件・KKT は後段で扱います。

---

## 12. 演習 Level A

### F0-00G-A01 半空間の凸性

- Level: A
- 目安時間: 8分

$$
C=\{x\in\mathbb R^n:a^{\mathsf T}x\le b\}
$$

が凸であることを示せ。

<!-- solution-start -->
#### 詳細解答
$x,y\in C$、$0\le t\le1$ とすると

$$
a^{\mathsf T}((1-t)x+ty)
=(1-t)a^{\mathsf T}x+t a^{\mathsf T}y
\le b.
$$

従って凸結合も $C$ に属する。

#### 本番答案
線形性より制約は凸結合で保存される。

#### 採点基準（20点）
- 凸結合設定: 5点
- 線形性: 7点
- 不等式評価: 6点
- 結論: 2点
<!-- solution-end -->

### F0-00G-A02 Hessian 判定

- Level: A
- 目安時間: 10分

$$
f(x,y)=x^2+4xy+5y^2
$$

が $\mathbb R^2$ 上で凸であることを Hessian 判定から示せ。

<!-- solution-start -->
#### 詳細解答

$$
\nabla^2f
=
\begin{pmatrix}
2&4\\
4&10
\end{pmatrix}.
$$

先頭主座小行列式は $2>0$、行列式は $20-16=4>0$ なので正定値。従って特に半正定値であり、$f$ は凸である。

#### 本番答案
$\nabla^2f\succ0$ より凸。

#### 採点基準（20点）
- Hessian: 8点
- PSD/PD判定: 7点
- 結論: 5点
<!-- solution-end -->

---

## 13. 演習 Level B

### F0-00G-B01 局所最小は大域最小

- Level: B
- 目安時間: 12分

凸集合 $C$ 上の凸関数 $f$ について、局所最小点が大域最小点であることを示せ。

<!-- solution-start -->
#### 詳細解答
局所最小 $x^*$ が大域最小でないなら、$f(y)<f(x^*)$ となる $y\in C$ がある。$z_t=(1-t)x^*+ty$ と置くと $z_t\to x^*$ かつ、凸性から

$$
f(z_t)
\le
(1-t)f(x^*)+tf(y)
<f(x^*).
$$

よって任意に近い改善点が存在し、局所最小性に矛盾する。

#### 本番答案
より小さい点への線分上に、凸性で任意に近い改善点ができるため矛盾。

#### 採点基準（20点）
- 背理法: 4点
- 凸結合点: 5点
- 凸性評価: 7点
- 結論: 4点
<!-- solution-end -->

### F0-00G-B02 狭義凸と Hessian

- Level: B
- 目安時間: 15分

$f(x)=x^4$ が狭義凸である一方 $f''(0)=0$ であることから

$$
\text{狭義凸}
\Rightarrow
\nabla^2f(x)\succ0\quad(\forall x)
$$

が誤りであることを説明せよ。

<!-- solution-start -->
#### 詳細解答
$f'(x)=4x^3$ は狭義単調増加なので $f$ は狭義凸。一方

$$
f''(x)=12x^2
$$

より $f''(0)=0$。従って狭義凸でも Hessian が全点で正定値とは限らない。

#### 本番答案
$f'$ は狭義増加だが $f''(0)=0$。よって反例。

#### 採点基準（20点）
- $f'$ の単調性: 7点
- 狭義凸: 5点
- $f''(0)=0$: 4点
- 結論: 4点
<!-- solution-end -->

---

## 14. epigraph・閉凸関数への接続

ここまでで凸性そのものと「局所情報が大域情報へ昇格する」理由を準備しました。次は関数を epigraph という凸集合として見直し、閉性・下半連続性・支持超平面へ進みます。その後、劣微分・錐・Fenchel 共役を経て制約付き最適化と KKT へ接続します。

**次：[F0-00G1 epigraph・閉凸関数・支持超平面](../F0_00G1_epigraph_閉凸関数_支持超平面/index.md)**
