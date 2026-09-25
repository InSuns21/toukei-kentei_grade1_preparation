# OPT9 制約付き数値最適化

<!-- definition-example-audit: strict -->

[OPT5](../OPT5/index.md) では Lagrange 双対・Slater 条件・KKT、[OPT6](../OPT6/index.md) では接錐・制約想定・KKT 乗数の存在、[OPT7](../OPT7/index.md) では滑らかな無制約最適化、[OPT8](../OPT8/index.md) では射影勾配法と近接法を学びました。

本章では、それらを **実際に制約付き問題を解く反復法**へ組み立てます。対象は

$$
\min_{x\in\mathbb R^n} f(x)
\quad\text{subject to}\quad
g_i(x)\le0\ (i=1,\ldots,m),
\qquad
h(x)=0
$$

です。

制約付き数値最適化では、目的関数を下げるだけでは足りません。反復中に同時に追う量は

$$
\boxed{
\text{目的関数}
\quad+\quad
\text{可行性}
\quad+\quad
\text{KKT 残差}
}
$$

です。

本章の主線は

$$
\boxed{
\text{射影}
\to
\text{二次ペナルティ}
\to
\text{対数障壁}
\to
\text{主双対 KKT 系}
\to
\text{Newton ステップ}
\to
\text{逐次二次計画法}
}
$$

です。

> **役割分担**  
> 単純な閉凸集合への射影そのものは [OPT8 の射影勾配法](../OPT8/index.md#def-opt8-projected-gradient) が canonical owner です。本章では、その固定点条件を「制約付き最適性残差」として読み直し、射影で簡単に扱えない非線形制約へペナルティ法・障壁法・主双対法を経て、最後は目的関数の局所二次モデルと制約の一次近似を反復して解く Newton 型手法まで進みます。線形計画に特化した障壁パラメータの経路と内点法の展開は後続の OPT11 が担当します。

---

## 1. 射影法を最適性残差として読む

閉凸集合 $C$ 上の問題

$$
\min_{x\in C} f(x)
$$

では、OPT8 の射影勾配法

$$
x^+
=
P_C\bigl(x-\alpha\nabla f(x)\bigr)
$$

が反復点を毎回可行領域へ戻します。

ここで「更新量そのもの」を残差にします。

<a id="def-opt9-projected-gradient-mapping"></a>
<!-- formal-statement-start -->
> **定義（射影勾配写像）**  
> $C\subset\mathbb R^n$ を非空閉凸集合、$f:\mathbb R^n\to\mathbb R$ を微分可能、$\alpha>0$ とする。
>
$$
\boxed{
G_\alpha(x)
=
\frac1\alpha
\left[
x-P_C\bigl(x-\alpha\nabla f(x)\bigr)
\right]
}
$$
>
> を **射影勾配写像**という。
<!-- formal-statement-end -->

<!-- definition-example-start: def-opt9-projected-gradient-mapping -->
**定義の確認**：$C=[0,\infty)$、$f(x)=\frac12(x+1)^2$

$\alpha=1$ とすると

$$
x-\nabla f(x)
=
x-(x+1)
=
-1.
$$

従って任意の $x\ge0$ で

$$
P_C(-1)=0,
$$

$$
G_1(x)=x.
$$

制約付き最小点は $x^*=0$ であり、

$$
G_1(x^*)=0
$$

となります。逆に $x>0$ では $G_1(x)=x\ne0$ なので、最適性残差が残っています。
<!-- definition-example-end -->

<a id="thm-opt9-projected-gradient-stationarity"></a>
<!-- formal-statement-start -->
> **定理（射影勾配写像と凸制約付き最適性）**  
> $C\subset\mathbb R^n$ を非空閉凸集合、$f:\mathbb R^n\to\mathbb R$ を微分可能な凸関数、$\alpha>0$ とする。$x^*\in C$ について
>
$$
\boxed{
x^*\in\operatorname*{arg\,min}_{x\in C}f(x)
\iff
G_\alpha(x^*)=0
}
$$
>
> が成り立つ。
<!-- formal-statement-end -->

### 証明の見取り図

$G_\alpha(x^*)=0$ は

$$
x^*
=
P_C\bigl(x^*-\alpha\nabla f(x^*)\bigr)
$$

と同じです。あとは OPT2 の射影の変分不等式を、OPT3 の制約付き Fermat 条件へ読み替えます。

<!-- proof-start -->
### 証明

[OPT2 の射影の変分不等式](../OPT2/index.md#thm-opt2-projection-variational-inequality)より

$$
x^*
=
P_C\bigl(x^*-\alpha\nabla f(x^*)\bigr)
$$

であることは、任意の $y\in C$ に対して

$$
\left\langle
x^*-\alpha\nabla f(x^*)-x^*,
y-x^*
\right\rangle
\le0
$$

と同値です。

$\alpha>0$ なので整理して

$$
\langle\nabla f(x^*),y-x^*\rangle\ge0
\qquad(y\in C).
$$

これは [OPT3 の微分可能な凸関数に対する制約付き Fermat 条件](../OPT3/index.md#cor-opt3-smooth-constrained)です。従って $x^*$ が $C$ 上の大域最小点であることと同値です。

$\square$
<!-- proof-end -->

この定理により

$$
\|G_\alpha(x_k)\|
$$

を停止判定に使えます。単に

$$
f(x_{k+1})\approx f(x_k)
$$

を見るより、「制約付き一次最適性がどれだけ残っているか」を直接測れます。

> **限界**  
> 射影 $P_C$ 自体が高価なら、この方法は問題を解いたことになりません。非線形制約
> $g_i(x)\le0$, $h(x)=0$
> では、最近点射影が元問題と同程度に難しい場合があります。そこで制約を目的関数や KKT 系へ移します。

---

## 2. 外から押し込む：二次ペナルティ法

まず等式制約

$$
h(x)=0,
\qquad
h:\mathbb R^n\to\mathbb R^p
$$

を考えます。

制約違反 $\|h(x)\|$ を目的関数へ加えれば、無制約最適化へ変換できます。

<a id="def-opt9-quadratic-penalty"></a>
<!-- formal-statement-start -->
> **定義（二次ペナルティ法）**  
> 等式制約問題
>
$$
\min_x f(x)
\quad\text{subject to}\quad
h(x)=0
$$
>
> に対して、$\rho>0$ を取り
>
$$
\boxed{
\Phi_\rho(x)
=
f(x)
+
\frac{\rho}{2}\|h(x)\|^2
}
$$
>
> を最小化する方法を **二次ペナルティ法**という。通常は $\rho$ を段階的に大きくする。
<!-- formal-statement-end -->

<!-- definition-example-start: def-opt9-quadratic-penalty -->
**定義の確認**：

$$
\min_x \frac12(x-2)^2
\quad\text{subject to}\quad
x=0
$$

を考えます。制約付き最小点は $x^*=0$ です。

二次ペナルティ関数は

$$
\Phi_\rho(x)
=
\frac12(x-2)^2+\frac{\rho}{2}x^2.
$$

微分条件

$$
(x-2)+\rho x=0
$$

から

$$
\boxed{
x_\rho=\frac{2}{1+\rho}.
}
$$

したがって

$$
x_\rho\to0
\qquad(\rho\to\infty).
$$

さらに

$$
\lambda_\rho
=
\rho h(x_\rho)
=
\frac{2\rho}{1+\rho}
\to2.
$$

元の Lagrangian を

$$
L(x,\lambda)
=
\frac12(x-2)^2+\lambda x
$$

とすれば、$x^*=0$ の [KKT 条件](../OPT5/index.md#thm-opt5-kkt)から $\lambda^*=2$ です。つまりペナルティ法の量 $\rho h(x_\rho)$ は、制約違反を縮めながら KKT 乗数へ近づいています。
<!-- definition-example-end -->

<a id="thm-opt9-penalty-feasibility-bound"></a>
<!-- formal-statement-start -->
> **定理（二次ペナルティ最小点の可行性評価）**  
> $f:\mathbb R^n\to\mathbb R$ が下から有界で
>
$$
f(x)\ge m_f
\qquad(x\in\mathbb R^n)
$$
>
> を満たすとする。さらに $h(\bar x)=0$ を満たす可行点 $\bar x$ が存在するとする。$x_\rho$ が
>
$$
\Phi_\rho(x)
=
f(x)+\frac{\rho}{2}\|h(x)\|^2
$$
>
> の大域最小点なら
>
$$
\boxed{
\|h(x_\rho)\|
\le
\sqrt{
\frac{2(f(\bar x)-m_f)}{\rho}
}
}
$$
>
> が成り立つ。
<!-- formal-statement-end -->

### 証明の見取り図

$x_\rho$ はペナルティ問題の最小点なので、可行点 $\bar x$ より悪くありません。可行点ではペナルティ項が 0 です。その一行を整理します。

<!-- proof-start -->
### 証明

$x_\rho$ の最小性と $h(\bar x)=0$ から

$$
f(x_\rho)
+
\frac{\rho}{2}\|h(x_\rho)\|^2
\le
f(\bar x).
$$

$f(x_\rho)\ge m_f$ なので

$$
m_f
+
\frac{\rho}{2}\|h(x_\rho)\|^2
\le
f(\bar x).
$$

従って

$$
\frac{\rho}{2}\|h(x_\rho)\|^2
\le
f(\bar x)-m_f.
$$

$\rho>0$ で割れば

$$
\|h(x_\rho)\|^2
\le
\frac{2(f(\bar x)-m_f)}{\rho}.
$$

両辺の平方根を取って結論を得ます。

$\square$
<!-- proof-end -->

### 2.1 ペナルティの停留条件は KKT を予告する

$f,h$ が微分可能なら

$$
\nabla\Phi_\rho(x)
=
\nabla f(x)
+
\rho Dh(x)^{\mathsf T}h(x).
$$

ペナルティ問題の停留点 $x_\rho$ で

$$
\nabla\Phi_\rho(x_\rho)=0
$$

なら

$$
\nabla f(x_\rho)
+
Dh(x_\rho)^{\mathsf T}\lambda_\rho
=
0,
$$

ただし

$$
\boxed{
\lambda_\rho=\rho h(x_\rho).
}
$$

これは KKT の停留条件と同じ形です。

### 2.2 なぜ $\rho$ を無限に大きくして一発で解かないのか

線形等式制約

$$
h(x)=Ax-b
$$

なら

$$
\nabla^2\Phi_\rho(x)
=
\nabla^2 f(x)
+
\rho A^{\mathsf T}A.
$$

$\rho$ を大きくすると、制約方向の曲率だけが極端に大きくなり得ます。すると条件数が悪化し、無制約 Newton 法や最急降下法で解く内部問題が数値的に難しくなります。

つまり二次ペナルティ法には

$$
\boxed{
\text{大きい }\rho
\Rightarrow
\text{可行性は改善}
\quad\text{しかし}\quad
\text{条件付けは悪化し得る}
}
$$

というトレードオフがあります。

---

## 3. 内側から境界へ近づく：対数障壁法

不等式制約

$$
g_i(x)\le0
$$

に対して、二次ペナルティは外側の点も許しつつ違反を罰します。障壁法は逆です。

**反復点を厳密に内部**

$$
g_i(x)<0
$$

へ置き、境界に近づくと目的関数を $+\infty$ へ発散させます。

<a id="def-opt9-log-barrier"></a>
<!-- formal-statement-start -->
> **定義（対数障壁問題）**  
> 不等式制約問題
>
$$
\min_x f(x)
\quad\text{subject to}\quad
g_i(x)\le0
\quad(i=1,\ldots,m)
$$
>
> に対し、$\mu>0$ とする。厳密可行領域
>
$$
\mathcal D
=
\{x:g_i(x)<0\ \text{for all }i\}
$$
>
> 上で
>
$$
\boxed{
\phi_\mu(x)
=
f(x)
-
\mu\sum_{i=1}^m\log\bigl(-g_i(x)\bigr)
}
$$
>
> を最小化する問題を **対数障壁問題**という。
<!-- formal-statement-end -->

<!-- definition-example-start: def-opt9-log-barrier -->
**定義の確認**：

$$
\min_x x
\quad\text{subject to}\quad
x\ge1
$$

を

$$
g(x)=1-x\le0
$$

と書きます。厳密可行領域は $x>1$ です。

対数障壁関数は

$$
\phi_\mu(x)
=
x-\mu\log(x-1).
$$

微分すると

$$
\phi_\mu'(x)
=
1-\frac{\mu}{x-1}.
$$

従って最小点は

$$
\boxed{
x_\mu=1+\mu.
}
$$

$\mu\downarrow0$ とすると $x_\mu\downarrow1$ で、最適点へ内部側から近づきます。
<!-- definition-example-end -->

<a id="def-opt9-central-path"></a>
<!-- formal-statement-start -->
> **定義（中心路）**  
> 各 $\mu>0$ に対する対数障壁問題の最小点 $x_\mu$ が一意に定まるとする。このとき
>
$$
\boxed{
\{x_\mu:\mu>0\}
}
$$
>
> を **中心路**という。
<!-- formal-statement-end -->

<!-- definition-example-start: def-opt9-central-path -->
先ほどの一変数問題では

$$
x_\mu=1+\mu
$$

なので、中心路は半直線上を境界点 $1$ へ向かう曲線です。$\mu$ は「境界からどれだけ離しておくか」を調整するパラメータになっています。
<!-- definition-example-end -->

---

## 4. 障壁の勾配から摂動 KKT が現れる

$f,g_i$ が微分可能なら

$$
\nabla\phi_\mu(x)
=
\nabla f(x)
-
\mu
\sum_{i=1}^m
\frac{\nabla g_i(x)}{g_i(x)}.
$$

ここで

$$
\boxed{
\lambda_i
=
-\frac{\mu}{g_i(x)}
=
\frac{\mu}{-g_i(x)}
}
$$

と置くと、厳密可行性 $g_i(x)<0$ から $\lambda_i>0$ です。

障壁問題の停留条件

$$
\nabla\phi_\mu(x)=0
$$

は

$$
\nabla f(x)
+
\sum_{i=1}^m
\lambda_i\nabla g_i(x)
=
0
$$

となり、さらに

$$
\boxed{
\lambda_i g_i(x)=-\mu
}
$$

です。

KKT の相補性

$$
\lambda_i g_i(x)=0
$$

が、$\mu>0$ の間だけ少しずれた形になっています。

<a id="thm-opt9-barrier-gap"></a>
<!-- formal-statement-start -->
> **定理（凸対数障壁点の摂動 KKT と双対ギャップ）**  
> $f,g_1,\ldots,g_m:\mathbb R^n\to\mathbb R$ を微分可能な凸関数とし、厳密可行点が存在するとする。$\mu>0$ に対する対数障壁問題が最小点 $x_\mu$ を持つとする。
>
> 
> $$
> \lambda_i(\mu)
> =
> \frac{\mu}{-g_i(x_\mu)}
> \qquad(i=1,\ldots,m)
> $$
>
> と置くと、
>
$$
\lambda_i(\mu)>0,
$$
>
$$
\nabla f(x_\mu)
+
\sum_{i=1}^m
\lambda_i(\mu)\nabla g_i(x_\mu)
=
0,
$$
>
$$
\lambda_i(\mu)g_i(x_\mu)=-\mu
$$
>
> が成り立つ。
>
> さらに元の凸問題の最適値を $p^*$ とすると
>
$$
\boxed{
0
\le
f(x_\mu)-p^*
\le
m\mu
}
$$
>
> が成り立つ。
<!-- formal-statement-end -->

### 証明の見取り図

前半は障壁関数の一階条件です。後半では $\lambda(\mu)$ を双対変数として使い、$x_\mu$ が Lagrangian の大域最小点になることを凸性から確認します。

<!-- proof-start -->
### 証明

$x_\mu$ は厳密可行なので

$$
g_i(x_\mu)<0.
$$

従って

$$
\lambda_i(\mu)
=
\frac{\mu}{-g_i(x_\mu)}
>0.
$$

障壁問題の一階条件は

$$
0
=
\nabla f(x_\mu)
-
\mu
\sum_{i=1}^m
\frac{\nabla g_i(x_\mu)}{g_i(x_\mu)}.
$$

定義した $\lambda_i(\mu)$ を代入すると

$$
\nabla f(x_\mu)
+
\sum_{i=1}^m
\lambda_i(\mu)\nabla g_i(x_\mu)
=
0.
$$

また定義から直接

$$
\lambda_i(\mu)g_i(x_\mu)
=
-\mu.
$$

ここから双対ギャップを評価します。Lagrangian を

$$
L(x,\lambda)
=
f(x)+\sum_{i=1}^m\lambda_i g_i(x)
$$

とします。$\lambda_i(\mu)\ge0$ であり、$f,g_i$ は凸なので

$$
x\mapsto L(x,\lambda(\mu))
$$

も凸です。さらに先ほどの停留条件より

$$
\nabla_xL(x_\mu,\lambda(\mu))=0.
$$

微分可能な凸関数の一次条件から、$x_\mu$ はこの Lagrangian の大域最小点です。従って双対関数 $q$ について

$$
q(\lambda(\mu))
=
L(x_\mu,\lambda(\mu)).
$$

相補性のずれを使うと

$$
\begin{aligned}
q(\lambda(\mu))
&=
f(x_\mu)
+
\sum_{i=1}^m
\lambda_i(\mu)g_i(x_\mu)\\
&=
f(x_\mu)-m\mu.
\end{aligned}
$$

[OPT5 の弱双対性](../OPT5/index.md#thm-opt5-weak-duality)から

$$
q(\lambda(\mu))\le p^*.
$$

一方 $x_\mu$ は厳密可行です。したがって、可行点全体で取る下限 $p^*$ はこの可行点での値を超えず、

$$
p^*\le f(x_\mu).
$$

従って

$$
f(x_\mu)-m\mu
\le
p^*
\le
f(x_\mu).
$$

整理すると

$$
\boxed{
0
\le
f(x_\mu)-p^*
\le
m\mu.
}
$$

$\square$
<!-- proof-end -->

> **仮定が働いた場所**  
> 凸性は、障壁点の停留条件から「Lagrangian の大域最小点」を得る箇所で使いました。非凸問題では同じ一階条件が得られても、双対ギャップ評価まで自動的には進みません。

---

## 5. ペナルティ法と障壁法は何が違うか

両者は似ていますが、制約への向き合い方が逆です。

| 方法 | 反復点 | パラメータ | 極限で狙うもの |
|---|---|---|---|
| 二次ペナルティ法 | 制約外でもよい | $\rho\uparrow\infty$ | 違反を 0 へ押す |
| 対数障壁法 | 厳密可行点のみ | $\mu\downarrow0$ | 内部から境界へ近づく |
| 射影法 | 毎回可行 | 歩幅 $\alpha$ | 射影固定点 |
| 主双対法 | 主変数と双対変数を同時更新 | $\mu$ など | KKT 残差を同時に 0 へ |

ペナルティ法は外側から、障壁法は内側から、主双対法は KKT 方程式そのものから近づく、と捉えると見通しがよくなります。

---

## 6. KKT 系を非線形方程式として Newton 法で解く

まず等式制約だけの問題

$$
\min_x f(x)
\quad\text{subject to}\quad
h(x)=0
$$

を考えます。

Lagrangian は

$$
L(x,\nu)=f(x)+\nu^{\mathsf T}h(x)
$$

です。[KKT 条件](../OPT5/index.md#thm-opt5-kkt)は

$$
\nabla_xL(x,\nu)=0,
\qquad
h(x)=0.
$$

これは $(x,\nu)$ に関する非線形連立方程式です。

<a id="thm-opt9-equality-kkt-newton"></a>
<!-- formal-statement-start -->
> **定理（等式制約 KKT 系の Newton ステップ）**  
> $f:\mathbb R^n\to\mathbb R$ と $h:\mathbb R^n\to\mathbb R^p$ を2回連続微分可能とする。
>
> 
> $$
> r_d(x,\nu)
> =
> \nabla f(x)+Dh(x)^{\mathsf T}\nu,
> \qquad
> r_p(x)=h(x)
> $$
>
> と置く。KKT 方程式
>
$$
r_d(x,\nu)=0,
\qquad
r_p(x)=0
$$
>
> に Newton 法を適用すると、ステップ $(\Delta x,\Delta\nu)$ は
>
$$
\boxed{
\begin{pmatrix}
\nabla^2_{xx}L(x,\nu) & Dh(x)^{\mathsf T}\\
Dh(x) & 0
\end{pmatrix}
\begin{pmatrix}
\Delta x\\
\Delta\nu
\end{pmatrix}
=
-
\begin{pmatrix}
r_d(x,\nu)\\
r_p(x)
\end{pmatrix}
}
$$
>
> を満たす。
<!-- formal-statement-end -->

### 証明の見取り図

Newton 法は「残差を一次近似して 0 にする」方法です。KKT 残差の Jacobian をブロックごとに微分します。

<!-- proof-start -->
### 証明

KKT 残差を

$$
F(x,\nu)
=
\begin{pmatrix}
r_d(x,\nu)\\
r_p(x)
\end{pmatrix}
=
\begin{pmatrix}
\nabla f(x)+Dh(x)^{\mathsf T}\nu\\
h(x)
\end{pmatrix}
$$

と置きます。

上段を $x$ で微分すると

$$
\nabla^2 f(x)
+
\sum_{j=1}^p
\nu_j\nabla^2 h_j(x)
=
\nabla^2_{xx}L(x,\nu).
$$

上段を $\nu$ で微分すると

$$
Dh(x)^{\mathsf T}.
$$

下段を $x$ で微分すると $Dh(x)$、$\nu$ では 0 です。

従って Jacobian は

$$
DF(x,\nu)
=
\begin{pmatrix}
\nabla^2_{xx}L(x,\nu) & Dh(x)^{\mathsf T}\\
Dh(x) & 0
\end{pmatrix}.
$$

Newton 方程式

$$
DF(x,\nu)
\begin{pmatrix}
\Delta x\\
\Delta\nu
\end{pmatrix}
=
-F(x,\nu)
$$

へ代入すれば結論を得ます。

$\square$
<!-- proof-end -->

### 6.1 線形等式制約では KKT 行列になる

$h(x)=Ax-b$ なら $Dh(x)=A$、$\nabla^2h_j=0$ なので

$$
\nabla^2_{xx}L(x,\nu)=\nabla^2 f(x).
$$

Newton 系は

$$
\begin{pmatrix}
\nabla^2f(x) & A^{\mathsf T}\\
A & 0
\end{pmatrix}
\begin{pmatrix}
\Delta x\\
\Delta\nu
\end{pmatrix}
=
-
\begin{pmatrix}
\nabla f(x)+A^{\mathsf T}\nu\\
Ax-b
\end{pmatrix}.
$$

この不定対称ブロック行列が、制約付き最適化で繰り返し現れる **KKT 行列**です。

---

## 7. 不等式も含めて主変数・双対変数・スラックを同時に動かす

不等式制約

$$
g(x)\le0
$$

にスラック変数

$$
s>0
$$

を入れ、

$$
g(x)+s=0
$$

とします。

相補性は本来

$$
S\lambda=0
$$

ですが、厳密正値性

$$
s>0,\qquad\lambda>0
$$

を保つために

$$
S\lambda=\mu\mathbf1
$$

へ摂動します。

<a id="def-opt9-perturbed-kkt"></a>
<!-- formal-statement-start -->
> **定義（摂動 KKT 系）**  
> 問題
>
$$
\min_x f(x)
\quad\text{subject to}\quad
g(x)\le0,\qquad h(x)=0
$$
>
> に対し、$s\in\mathbb R^m_{++}$、$\lambda\in\mathbb R^m_{++}$、$\nu\in\mathbb R^p$、$\mu>0$ を用いる。
>
> 
> $$
> L(x,\lambda,\nu)
> =
> f(x)+\lambda^{\mathsf T}g(x)+\nu^{\mathsf T}h(x)
> $$
>
> とし、
>
$$
\boxed{
\begin{aligned}
\nabla_xL(x,\lambda,\nu)&=0,\\
g(x)+s&=0,\\
h(x)&=0,\\
S\lambda&=\mu\mathbf1
\end{aligned}
}
$$
>
> を **摂動 KKT 系**という。ここで $S=\operatorname{diag}(s)$ である。
<!-- formal-statement-end -->

<!-- definition-example-start: def-opt9-perturbed-kkt -->
**定義の確認**：

$$
\min_x x
\quad\text{subject to}\quad
1-x\le0
$$

では

$$
g(x)=1-x,
\qquad
s=x-1.
$$

停留条件は

$$
1-\lambda=0
$$

なので $\lambda=1$ です。摂動相補性

$$
s\lambda=\mu
$$

から

$$
s=\mu.
$$

従って

$$
x=1+\mu,
$$

となり、対数障壁で得た中心路と同じ点が復元されます。
<!-- definition-example-end -->

<a id="thm-opt9-primal-dual-newton"></a>
<!-- formal-statement-start -->
> **定理（摂動 KKT 系の主双対 Newton 方程式）**  
> $f,g,h$ を2回連続微分可能とする。現在点 $(x,\lambda,\nu,s)$ で
>
$$
\begin{aligned}
r_d&=\nabla_xL(x,\lambda,\nu),\\
r_g&=g(x)+s,\\
r_h&=h(x),\\
r_c&=S\lambda-\mu\mathbf1
\end{aligned}
$$
>
> と置く。また
>
$$
H=\nabla^2_{xx}L(x,\lambda,\nu),
\qquad
J_g=Dg(x),
\qquad
J_h=Dh(x),
\qquad
\Lambda=\operatorname{diag}(\lambda).
$$
>
> この摂動 KKT 系に Newton 法を適用すると
>
$$
\boxed{
\begin{pmatrix}
H & J_g^{\mathsf T} & J_h^{\mathsf T} & 0\\
J_g & 0 & 0 & I\\
J_h & 0 & 0 & 0\\
0 & S & 0 & \Lambda
\end{pmatrix}
\begin{pmatrix}
\Delta x\\
\Delta\lambda\\
\Delta\nu\\
\Delta s
\end{pmatrix}
=
-
\begin{pmatrix}
r_d\\
r_g\\
r_h\\
r_c
\end{pmatrix}
}
$$
>
> を得る。
<!-- formal-statement-end -->

### 証明の見取り図

4本の残差を、それぞれ $(x,\lambda,\nu,s)$ について一次近似するだけです。最後の相補性だけ積の微分則が入り、

$$
\Delta(S\lambda)
=
S\Delta\lambda+\Lambda\Delta s
$$

となります。

<!-- proof-start -->
### 証明

停留条件残差

$$
r_d=\nabla_xL(x,\lambda,\nu)
$$

の一次変化は

$$
H\Delta x
+
J_g^{\mathsf T}\Delta\lambda
+
J_h^{\mathsf T}\Delta\nu.
$$

不等式側の主残差

$$
r_g=g(x)+s
$$

の一次変化は

$$
J_g\Delta x+\Delta s.
$$

等式制約残差

$$
r_h=h(x)
$$

の一次変化は

$$
J_h\Delta x.
$$

最後に

$$
r_c=S\lambda-\mu\mathbf1
$$

を考えます。成分ごとに

$$
(r_c)_i=s_i\lambda_i-\mu
$$

なので一次変化は

$$
\lambda_i\Delta s_i+s_i\Delta\lambda_i.
$$

ベクトル表示では

$$
\Lambda\Delta s+S\Delta\lambda.
$$

Newton 法は「現在残差 + 一次変化 = 0」と置くので、4式を縦に並べれば

$$
\begin{pmatrix}
H & J_g^{\mathsf T} & J_h^{\mathsf T} & 0\\
J_g & 0 & 0 & I\\
J_h & 0 & 0 & 0\\
0 & S & 0 & \Lambda
\end{pmatrix}
\begin{pmatrix}
\Delta x\\
\Delta\lambda\\
\Delta\nu\\
\Delta s
\end{pmatrix}
=
-
\begin{pmatrix}
r_d\\
r_g\\
r_h\\
r_c
\end{pmatrix}.
$$

$\square$
<!-- proof-end -->

### 7.1 正値性を壊さない歩幅

Newton ステップをそのまま $\alpha=1$ で入れると

$$
s+\Delta s
$$

や

$$
\lambda+\Delta\lambda
$$

が負になることがあります。

そこで実装では

$$
s+\alpha\Delta s>0,
\qquad
\lambda+\alpha\Delta\lambda>0
$$

を保つ最大歩幅より少し小さい $\alpha$ を選ぶ **fraction-to-boundary** 型の制御を使います。

主双対法の重要点は、単に $x$ だけを更新するのではなく、

$$
\boxed{
x,\ s,\ \lambda,\ \nu
}
$$

を同時に動かし、

- 停留条件
- 主可行性
- 双対可行性
- 相補性

を一つの残差系として減らすことです。

---

## 8. 逐次二次計画法：毎回「局所 QP」を解く

Newton 法は非線形方程式を一次近似しました。制約付き最適化では別の見方もできます。

現在点 $x_k$ の近くで

- 目的関数を二次近似
- 制約を一次近似

して、その近似問題を解きます。

<a id="def-opt9-sqp"></a>
<!-- formal-statement-start -->
> **定義（逐次二次計画法）**  
> 非線形制約問題
>
$$
\min_x f(x)
\quad\text{subject to}\quad
g(x)\le0,\qquad h(x)=0
$$
>
> に対し、反復点 $x_k$ と対称行列 $B_k$ を用いる。ステップ $p$ を二次計画問題
>
$$
\boxed{
\begin{aligned}
\min_p\quad&
\nabla f(x_k)^{\mathsf T}p
+
\frac12p^{\mathsf T}B_kp\\
\text{subject to}\quad&
g(x_k)+Dg(x_k)p\le0,\\
&
h(x_k)+Dh(x_k)p=0
\end{aligned}
}
$$
>
> から求める方法を **逐次二次計画法（SQP）**という。
<!-- formal-statement-end -->

<!-- definition-example-start: def-opt9-sqp -->
**定義の確認**：線形等式制約

$$
\min_{x\in\mathbb R^2}
\frac12(x_1^2+x_2^2)
\quad\text{subject to}\quad
x_1+x_2=1
$$

では、目的関数自体が二次、制約自体が線形です。従って

$$
B_k=I
$$

とすれば SQP の部分問題は元問題と同じ形になり、一回の部分問題を正確に解けば

$$
x^*=
\left(\frac12,\frac12\right)
$$

へ到達します。

これは SQP が「毎回 QP を解く」方法であり、元問題がすでに QP なら近似誤差がないことを示す最小例です。
<!-- definition-example-end -->

<a id="thm-opt9-sqp-newton-equivalence"></a>
<!-- formal-statement-start -->
> **定理（等式制約 SQP と KKT-Newton ステップの一致）**  
> $f:\mathbb R^n\to\mathbb R$、$h:\mathbb R^n\to\mathbb R^p$ を2回連続微分可能とする。現在点 $(x,\nu)$ で
>
$$
B=\nabla^2_{xx}L(x,\nu)
$$
>
> を使い、等式制約 SQP 部分問題
>
$$
\min_p
\left\{
\nabla f(x)^{\mathsf T}p+\frac12p^{\mathsf T}Bp
\right\}
\quad\text{subject to}\quad
h(x)+Dh(x)p=0
$$
>
> を考える。
>
> この部分問題の KKT 系で得られる $(p,\Delta\nu)$ は、元の KKT 方程式に Newton 法を適用して得るステップ $(\Delta x,\Delta\nu)$ と一致する。
<!-- formal-statement-end -->

### 証明の見取り図

SQP 部分問題の Lagrange 乗数を「新しい乗数 $\nu+\Delta\nu$」として書けば、上段が Newton の停留条件の方程式へそのまま変形されます。

<!-- proof-start -->
### 証明

SQP 部分問題の Lagrangian を

$$
\ell(p,\eta)
=
\nabla f(x)^{\mathsf T}p
+
\frac12p^{\mathsf T}Bp
+
\eta^{\mathsf T}
\left(
h(x)+Dh(x)p
\right)
$$

とします。

$p$ に関する 停留条件は

$$
\nabla f(x)+Bp+Dh(x)^{\mathsf T}\eta=0.
$$

ここで

$$
\eta=\nu+\Delta\nu
$$

と書き、$B=\nabla^2_{xx}L(x,\nu)$ を代入すると

$$
\nabla^2_{xx}L(x,\nu)p
+
Dh(x)^{\mathsf T}\Delta\nu
=
-
\left[
\nabla f(x)+Dh(x)^{\mathsf T}\nu
\right].
$$

一方、一次近似制約は

$$
Dh(x)p=-h(x).
$$

従って

$$
\begin{pmatrix}
\nabla^2_{xx}L(x,\nu) & Dh(x)^{\mathsf T}\\
Dh(x) & 0
\end{pmatrix}
\begin{pmatrix}
p\\
\Delta\nu
\end{pmatrix}
=
-
\begin{pmatrix}
\nabla f(x)+Dh(x)^{\mathsf T}\nu\\
h(x)
\end{pmatrix}.
$$

これは [等式制約 KKT 系の Newton ステップ](#thm-opt9-equality-kkt-newton)そのものです。従って

$$
p=\Delta x.
$$

$\square$
<!-- proof-end -->

この一致が SQP の核心です。

$$
\boxed{
\text{KKT 方程式へ Newton 法}
\quad\Longleftrightarrow\quad
\text{局所二次モデル + 一次近似制約}
}
$$

不等式制約がある場合は、局所 QP の活性制約が「どの [KKT 条件](../OPT5/index.md#thm-opt5-kkt)が効くか」を同時に選びます。

---

## 9. SQP の Hessian を毎回正確に作る必要はない

理論上は

$$
B_k
=
\nabla^2_{xx}L(x_k,\lambda_k,\nu_k)
$$

が自然です。しかし大規模問題では Hessian の構成・因子分解が高価です。

そこで実務では

- BFGS 型更新
- L-BFGS 型の限定記憶更新
- Gauss--Newton 型近似

などで $B_k$ を近似することがあります。

ただし $B_k$ を単に「適当な正定値行列」にすればよいわけではありません。SQP の速い局所収束は、Lagrangian の二階情報をどれだけ正しく再現できるかに依存します。

---

## 10. Newton / SQP は局所法：大域化が必要

[OPT7 の Newton 法](../OPT7/index.md#thm-opt7-newton-local-quadratic-convergence)と同様、KKT-Newton や SQP の高速収束は局所的です。初期点が遠いと

- 目的関数が増える
- 制約違反が増える
- QP 部分問題が不適切になる
- 不等式のスラックや双対変数が正値性を失う

ことがあります。

代表的な大域化は

- メリット関数（merit function）を使う直線探索
- 信頼領域法（trust-region method）
- 制約違反と目的改善を別々に受理判定するフィルタ法
- 主双対法での境界までの割合（fraction-to-boundary）

です。

本章では完全な大域収束定理までは扱いません。重要なのは、**Newton 系や SQP 部分問題を作ること**と、**そのステップを安全に採用すること**が別問題だと理解することです。

---

## 11. 仮定・機構を失うと何が壊れるか

### 11.1 ペナルティ係数を大きくするだけでは数値的に楽にならない

$\rho\uparrow\infty$ で可行性は改善しますが、Hessian に

$$
\rho Dh(x)^{\mathsf T}Dh(x)
$$

の大きな曲率が入り、条件数が悪化し得ます。

**失ったもの**は「内部無制約問題が良条件」という性質です。したがって外側反復だけ見て $\rho$ を巨大化する設計は危険です。

### 11.2 障壁法は厳密可行初期点を要求する

対数障壁

$$
-\log(-g_i(x))
$$

は $g_i(x)\ge0$ で定義できません。

**失ったもの**は障壁関数の定義域です。初期点が外側なら、まず 初期可行点探索（phase I）の補助問題などで厳密可行点を作る必要があります。

### 11.3 KKT 行列は常に可逆ではない

等式制約 Newton 系

$$
\begin{pmatrix}
H&A^{\mathsf T}\\
A&0
\end{pmatrix}
$$

の可逆性には、典型的には

- 制約 Jacobian の行独立性
- $Ad=0$ を満たす制約保存方向 $d$ 上での適切な二階正定値性

が関わります。

[OPT6](../OPT6/index.md) で学んだ制約想定や二階条件が、ここでは「Newton 線形方程式を安定に解けるか」という数値問題として再登場します。

### 11.4 非凸問題では KKT 残差が 0 でも大域最適とは限らない

KKT は局所停留性の条件です。凸性がなければ、KKT 点が

- 局所最大
- 鞍点
- 望ましくない局所最小

である可能性があります。

これはアルゴリズムの失敗ではなく、**最適性条件そのものの保証範囲**の違いです。

---

## 12. 方法を選ぶときの見取り図

単純な閉凸集合で射影が安いなら

$$
\boxed{\text{射影法}}
$$

が直接的です。

等式制約をまず無制約問題へ落としたいなら

$$
\boxed{\text{ペナルティ法}}
$$

が簡単ですが、$\rho$ 増大と条件付けの悪化を管理します。

凸不等式制約で厳密可行点があり、境界へ内部から近づきたいなら

$$
\boxed{\text{障壁法}}
$$

が自然です。

主可行性・双対可行性・相補性を同時に扱うなら

$$
\boxed{\text{主双対 Newton 法}}
$$

へ進みます。

一般の滑らかな非線形制約で Newton 型の局所高速収束を狙うなら

$$
\boxed{\text{逐次二次計画法}}
$$

が中心候補になります。

---

## 13. 演習 Level A

<a id="ex-opt9-a01"></a>
### OPT9-A01 射影勾配写像を計算する

- Level: A
- 目安時間: 10分

$$
C=[1,\infty),
\qquad
f(x)=\frac12x^2,
\qquad
\alpha=1
$$

とする。

1. $G_1(x)$ を $x\ge1$ について求めよ。
2. $G_1(x)=0$ を満たす点を求めよ。
3. その点が制約付き最小点であることを直接確認せよ。

<!-- solution-start -->
#### 詳細解答

勾配は

$$
\nabla f(x)=x.
$$

従って

$$
x-\nabla f(x)=0.
$$

$0$ の $C=[1,\infty)$ への射影は

$$
P_C(0)=1.
$$

したがって

$$
G_1(x)
=
x-1.
$$

よって

$$
G_1(x)=0
$$

となるのは

$$
\boxed{x=1}
$$

だけです。

また $x\ge1$ なら

$$
f(x)=\frac12x^2\ge\frac12=f(1).
$$

従って $x=1$ は確かに制約付き大域最小点です。
<!-- solution-end -->

<a id="ex-opt9-a02"></a>
### OPT9-A02 二次ペナルティの最小点と乗数近似

- Level: A
- 目安時間: 12分

$$
\min_x \frac12(x-3)^2
\quad\text{subject to}\quad
x=1
$$

を考える。

1. 二次ペナルティ関数 $\Phi_\rho$ を書け。
2. 最小点 $x_\rho$ を求めよ。
3. $\lambda_\rho=\rho(x_\rho-1)$ を求め、$\rho\to\infty$ の極限を計算せよ。
4. 元問題の KKT 乗数と一致することを確認せよ。

<!-- solution-start -->
#### 詳細解答

制約関数を

$$
h(x)=x-1
$$

と置きます。二次ペナルティ関数は

$$
\Phi_\rho(x)
=
\frac12(x-3)^2
+
\frac{\rho}{2}(x-1)^2.
$$

微分すると

$$
\Phi_\rho'(x)
=
(x-3)+\rho(x-1).
$$

停留条件より

$$
(1+\rho)x=3+\rho.
$$

従って

$$
\boxed{
x_\rho
=
\frac{\rho+3}{\rho+1}
=
1+\frac{2}{\rho+1}.
}
$$

よって

$$
\lambda_\rho
=
\rho(x_\rho-1)
=
\frac{2\rho}{\rho+1}.
$$

したがって

$$
\boxed{
\lambda_\rho\to2.
}
$$

元問題の Lagrangian を

$$
L(x,\lambda)
=
\frac12(x-3)^2+\lambda(x-1)
$$

とすると 停留条件は

$$
x-3+\lambda=0.
$$

$x^*=1$ を代入して

$$
-2+\lambda=0,
$$

従って

$$
\lambda^*=2.
$$

ペナルティ由来の $\lambda_\rho$ は元の KKT 乗数へ収束しています。
<!-- solution-end -->

<a id="ex-opt9-a03"></a>
### OPT9-A03 対数障壁点と相補性のずれ

- Level: A
- 目安時間: 12分

$$
\min_x x
\quad\text{subject to}\quad
x\ge2
$$

を考える。

1. $g(x)=2-x$ として対数障壁関数を書け。
2. 障壁点 $x_\mu$ を求めよ。
3. $\lambda_\mu=\mu/(x_\mu-2)$ を求めよ。
4. $\lambda_\mu g(x_\mu)=-\mu$ を確認せよ。

<!-- solution-start -->
#### 詳細解答

厳密可行領域は $x>2$ です。

対数障壁関数は

$$
\phi_\mu(x)
=
x-\mu\log(x-2).
$$

微分すると

$$
\phi_\mu'(x)
=
1-\frac{\mu}{x-2}.
$$

従って

$$
x_\mu-2=\mu,
$$

$$
\boxed{
x_\mu=2+\mu.
}
$$

双対変数は

$$
\lambda_\mu
=
\frac{\mu}{x_\mu-2}
=
\frac{\mu}{\mu}
=
\boxed{1}.
$$

また

$$
g(x_\mu)
=
2-(2+\mu)
=
-\mu.
$$

よって

$$
\lambda_\mu g(x_\mu)
=
1\cdot(-\mu)
=
\boxed{-\mu}.
$$
<!-- solution-end -->

<a id="ex-opt9-a04"></a>
### OPT9-A04 線形等式制約の KKT-Newton ステップ

- Level: A
- 目安時間: 15分

$$
f(x_1,x_2)
=
\frac12(x_1^2+x_2^2),
\qquad
x_1+x_2=1
$$

を考える。現在点を

$$
x=
\begin{pmatrix}
1\\
0
\end{pmatrix},
\qquad
\nu=0
$$

とする。

Newton 系を解いて $(\Delta x,\Delta\nu)$ を求め、更新後の点を計算せよ。

<!-- solution-start -->
#### 詳細解答

$$
\nabla f(x)
=
\begin{pmatrix}
1\\
0
\end{pmatrix},
\qquad
\nabla^2f(x)=I,
\qquad
A=
\begin{pmatrix}
1&1
\end{pmatrix}.
$$

現在点は

$$
Ax-1=0
$$

なので主残差は 0 です。

Newton 系は

$$
\begin{pmatrix}
1&0&1\\
0&1&1\\
1&1&0
\end{pmatrix}
\begin{pmatrix}
\Delta x_1\\
\Delta x_2\\
\Delta\nu
\end{pmatrix}
=
-
\begin{pmatrix}
1\\
0\\
0
\end{pmatrix}.
$$

上二式から

$$
\Delta x_1+\Delta\nu=-1,
$$

$$
\Delta x_2+\Delta\nu=0.
$$

制約の一次近似から

$$
\Delta x_1+\Delta x_2=0.
$$

第2式より

$$
\Delta x_2=-\Delta\nu.
$$

従って

$$
\Delta x_1=\Delta\nu.
$$

第1式へ代入して

$$
2\Delta\nu=-1,
$$

$$
\Delta\nu=-\frac12.
$$

したがって

$$
\boxed{
\Delta x
=
\begin{pmatrix}
-1/2\\
1/2
\end{pmatrix},
\qquad
\Delta\nu=-1/2.
}
$$

更新後は

$$
x^+
=
\begin{pmatrix}
1/2\\
1/2
\end{pmatrix},
\qquad
\nu^+=-\frac12.
$$

これは元問題の KKT 解そのものです。二次目的関数と線形制約なので、一回の Newton ステップで到達します。
<!-- solution-end -->

---

## 14. 演習 Level B

<a id="ex-opt9-b01"></a>
### OPT9-B01 二次ペナルティの可行性評価を再構成する

- Level: B
- 目安時間: 18分

$f(x)\ge m_f$、$h(\bar x)=0$ とし、$x_\rho$ は

$$
\Phi_\rho(x)
=
f(x)+\frac{\rho}{2}\|h(x)\|^2
$$

の大域最小点とする。

1. $\Phi_\rho(x_\rho)\le\Phi_\rho(\bar x)$ を書き下せ。
2. $f(x_\rho)\ge m_f$ を使って $\|h(x_\rho)\|$ を評価せよ。
3. この評価だけから $\|h(x_\rho)\|=O(1/\rho)$ とは言えない理由を説明せよ。

<!-- solution-start -->
#### 詳細解答

$x_\rho$ は大域最小点なので

$$
\Phi_\rho(x_\rho)
\le
\Phi_\rho(\bar x).
$$

$h(\bar x)=0$ だから

$$
f(x_\rho)
+
\frac{\rho}{2}\|h(x_\rho)\|^2
\le
f(\bar x).
$$

さらに

$$
f(x_\rho)\ge m_f
$$

なので

$$
m_f
+
\frac{\rho}{2}\|h(x_\rho)\|^2
\le
f(\bar x).
$$

従って

$$
\|h(x_\rho)\|^2
\le
\frac{2(f(\bar x)-m_f)}{\rho}.
$$

よって

$$
\boxed{
\|h(x_\rho)\|
\le
\sqrt{
\frac{2(f(\bar x)-m_f)}{\rho}
}.
}
$$

右辺は $\rho^{-1/2}$ に比例します。したがって、この一般評価だけから保証できるのは

$$
\|h(x_\rho)\|=O(\rho^{-1/2})
$$

までです。

一変数の滑らかな例では $O(1/\rho)$ が出ることもありますが、それには追加の正則性・乗数有界性などが必要です。一般評価と個別例の速さを混同してはいけません。
<!-- solution-end -->

<a id="ex-opt9-b02"></a>
### OPT9-B02 対数障壁の双対ギャップを再構成する

- Level: B
- 目安時間: 22分

$f,g_1,\ldots,g_m$ を微分可能な凸関数とし、$x_\mu$ を対数障壁問題の最小点とする。

$$
\lambda_i
=
\frac{\mu}{-g_i(x_\mu)}
$$

と置く。

1. $\lambda_i>0$ と $\lambda_i g_i(x_\mu)=-\mu$ を示せ。
2. 障壁問題の一階条件から $\nabla_xL(x_\mu,\lambda)=0$ を示せ。
3. 凸性から $q(\lambda)=L(x_\mu,\lambda)$ を示せ。
4. [OPT5 の弱双対性](../OPT5/index.md#thm-opt5-weak-duality)を使って
   $$
   0\le f(x_\mu)-p^*\le m\mu
   $$
   を導け。

<!-- solution-start -->
#### 詳細解答

$x_\mu$ は対数障壁の定義域にあるため

$$
g_i(x_\mu)<0.
$$

したがって

$$
\lambda_i
=
\frac{\mu}{-g_i(x_\mu)}
>0.
$$

また

$$
\lambda_i g_i(x_\mu)
=
\frac{\mu}{-g_i(x_\mu)}g_i(x_\mu)
=
-\mu.
$$

次に障壁関数

$$
\phi_\mu(x)
=
f(x)
-
\mu\sum_i\log(-g_i(x))
$$

の一階条件は

$$
0
=
\nabla f(x_\mu)
-
\mu\sum_i
\frac{\nabla g_i(x_\mu)}{g_i(x_\mu)}.
$$

ここで

$$
-\frac{\mu}{g_i(x_\mu)}
=
\lambda_i
$$

なので

$$
0
=
\nabla f(x_\mu)
+
\sum_i\lambda_i\nabla g_i(x_\mu)
=
\nabla_xL(x_\mu,\lambda).
$$

$f,g_i$ は凸、$\lambda_i\ge0$ だから

$$
x\mapsto L(x,\lambda)
$$

も凸です。微分可能な凸関数で勾配が 0 なので、$x_\mu$ は大域最小点です。従って

$$
q(\lambda)
=
\inf_xL(x,\lambda)
=
L(x_\mu,\lambda).
$$

さらに

$$
\begin{aligned}
q(\lambda)
&=
f(x_\mu)
+
\sum_i\lambda_i g_i(x_\mu)\\
&=
f(x_\mu)-m\mu.
\end{aligned}
$$

[OPT5 の弱双対性](../OPT5/index.md#thm-opt5-weak-duality)より

$$
q(\lambda)\le p^*.
$$

また $x_\mu$ は主問題に厳密可行なので

$$
p^*\le f(x_\mu).
$$

よって

$$
f(x_\mu)-m\mu
\le
p^*
\le
f(x_\mu).
$$

整理して

$$
\boxed{
0
\le
f(x_\mu)-p^*
\le
m\mu.
}
$$
<!-- solution-end -->

<a id="ex-opt9-b03"></a>
### OPT9-B03 主双対 Newton 方程式を自力で組み立てる

- Level: B
- 目安時間: 25分

摂動 KKT 系

$$
\begin{aligned}
\nabla_xL(x,\lambda,\nu)&=0,\\
g(x)+s&=0,\\
h(x)&=0,\\
S\lambda-\mu\mathbf1&=0
\end{aligned}
$$

を考える。

1. 4本の残差を定義せよ。
2. 各残差の一次変化を書け。
3. 変数の順序を $(x,\lambda,\nu,s)$ として Newton 行列を組み立てよ。
4. 最後の行に $S$ と $\Lambda$ が現れる理由を成分ごとに説明せよ。

<!-- solution-start -->
#### 詳細解答

残差を

$$
r_d
=
\nabla_xL(x,\lambda,\nu),
$$

$$
r_g
=
g(x)+s,
$$

$$
r_h
=
h(x),
$$

$$
r_c
=
S\lambda-\mu\mathbf1
$$

と置きます。

さらに

$$
H=\nabla^2_{xx}L,
\qquad
J_g=Dg(x),
\qquad
J_h=Dh(x),
\qquad
\Lambda=\operatorname{diag}(\lambda)
$$

とします。

停留条件の一次変化は

$$
H\Delta x
+
J_g^{\mathsf T}\Delta\lambda
+
J_h^{\mathsf T}\Delta\nu.
$$

不等式主残差の一次変化は

$$
J_g\Delta x+\Delta s.
$$

等式主残差の一次変化は

$$
J_h\Delta x.
$$

相補性残差の第 $i$ 成分は

$$
s_i\lambda_i-\mu.
$$

その一次変化は積の微分則から

$$
s_i\Delta\lambda_i
+
\lambda_i\Delta s_i.
$$

従ってベクトルでは

$$
S\Delta\lambda+\Lambda\Delta s.
$$

よって Newton 方程式は

$$
\boxed{
\begin{pmatrix}
H & J_g^{\mathsf T} & J_h^{\mathsf T} & 0\\
J_g & 0 & 0 & I\\
J_h & 0 & 0 & 0\\
0 & S & 0 & \Lambda
\end{pmatrix}
\begin{pmatrix}
\Delta x\\
\Delta\lambda\\
\Delta\nu\\
\Delta s
\end{pmatrix}
=
-
\begin{pmatrix}
r_d\\
r_g\\
r_h\\
r_c
\end{pmatrix}.
}
$$

最後の行の $S$ は $\lambda$ 側の変化へ掛かる現在の $s_i$、$\Lambda$ は $s$ 側の変化へ掛かる現在の $\lambda_i$ を対角に並べたものです。
<!-- solution-end -->

---

## 15. 演習 Level C

<a id="ex-opt9-c01"></a>
### OPT9-C01 一つの制約問題を4つの見方で追う

- Level: C
- 目安時間: 40分

問題

$$
\min_x \frac12x^2
\quad\text{subject to}\quad
x\ge1
$$

を考える。$g(x)=1-x\le0$ と書く。

1. 真の最適解 $x^*$ と KKT 乗数 $\lambda^*$ を求めよ。
2. $C=[1,\infty)$ への射影勾配法を歩幅 $\alpha=1$ で考え、任意の可行点 $x_0\ge1$ から一回でどこへ移るか求めよ。
3. 外点を許す二乗違反ペナルティ
   $$
   \Phi_\rho(x)
   =
   \frac12x^2
   +
   \frac{\rho}{2}\max\{1-x,0\}^2
   $$
   の大域最小点 $x_\rho$ を求め、制約違反を評価せよ。
4. 対数障壁
   $$
   \phi_\mu(x)
   =
   \frac12x^2-\mu\log(x-1)
   \qquad(x>1)
   $$
   の最小点 $x_\mu$ を求めよ。
5. $\lambda_\mu=\mu/(x_\mu-1)$ と置き、
   $$
   x_\mu-\lambda_\mu=0,
   \qquad
   \lambda_\mu(x_\mu-1)=\mu
   $$
   を示せ。
6. $\rho\uparrow\infty$ と $\mu\downarrow0$ の極限を比較し、「外から」と「内から」の違いを説明せよ。

<!-- solution-start -->
#### 詳細解答

### 1. 真の KKT 解

可行領域は $x\ge1$ です。目的関数 $\frac12x^2$ は $x\ge0$ で増加するので

$$
\boxed{x^*=1}.
$$

Lagrangian は

$$
L(x,\lambda)
=
\frac12x^2+\lambda(1-x).
$$

停留条件は

$$
x-\lambda=0.
$$

$x^*=1$ なので

$$
\boxed{\lambda^*=1}.
$$

また

$$
\lambda^*\ge0,
\qquad
g(x^*)=0,
\qquad
\lambda^*g(x^*)=0
$$

も満たします。

### 2. 射影勾配法

勾配は

$$
\nabla f(x)=x.
$$

$\alpha=1$ なら勾配ステップは

$$
x_0-\nabla f(x_0)=0.
$$

これを $[1,\infty)$ へ射影すると

$$
P_{[1,\infty)}(0)=1.
$$

従って任意の可行初期点から

$$
\boxed{x_1=1}
$$

です。

この例では射影が非常に簡単なので、一回で解けます。

### 3. 二乗違反ペナルティ

$x\ge1$ ではペナルティ項が 0 なので

$$
\Phi_\rho(x)=\frac12x^2
$$

であり、この領域の最小値は $x=1$ で $\frac12$ です。

$x<1$ では

$$
\Phi_\rho(x)
=
\frac12x^2+\frac{\rho}{2}(1-x)^2.
$$

微分すると

$$
\Phi_\rho'(x)
=
x-\rho(1-x)
=
(1+\rho)x-\rho.
$$

従って候補は

$$
\boxed{
x_\rho=\frac{\rho}{1+\rho}.
}
$$

これは確かに $x_\rho<1$ です。

この点での制約違反は

$$
1-x_\rho
=
1-\frac{\rho}{1+\rho}
=
\boxed{
\frac1{1+\rho}.
}
$$

また目的値は

$$
\Phi_\rho(x_\rho)
=
\frac{\rho}{2(1+\rho)}
<
\frac12,
$$

なので大域最小点は境界 $x=1$ ではなく $x_\rho$ です。

従ってペナルティ法は有限の $\rho$ では制約外に残り、

$$
x_\rho\uparrow1
$$

と外側から近づきます。

### 4. 対数障壁点

$x>1$ で

$$
\phi_\mu'(x)
=
x-\frac{\mu}{x-1}.
$$

停留条件は

$$
x(x-1)=\mu.
$$

すなわち

$$
x^2-x-\mu=0.
$$

$x>1$ を満たす根を取ると

$$
\boxed{
x_\mu
=
\frac{1+\sqrt{1+4\mu}}{2}.
}
$$

### 5. 双対変数と摂動相補性

$$
\lambda_\mu
=
\frac{\mu}{x_\mu-1}.
$$

停留条件

$$
x_\mu(x_\mu-1)=\mu
$$

から

$$
\frac{\mu}{x_\mu-1}
=
x_\mu.
$$

従って

$$
\boxed{
\lambda_\mu=x_\mu.
}
$$

よって 停留条件は

$$
x_\mu-\lambda_\mu=0.
$$

さらに

$$
\lambda_\mu(x_\mu-1)
=
x_\mu(x_\mu-1)
=
\boxed{\mu}.
$$

$g(x)=1-x$ を使う表記なら

$$
\lambda_\mu g(x_\mu)=-\mu.
$$

### 6. 外からと内から

ペナルティ点は

$$
x_\rho
=
\frac{\rho}{1+\rho}
<1
$$

なので制約外にあり、

$$
x_\rho\uparrow1
\qquad(\rho\uparrow\infty)
$$

です。

障壁点は

$$
x_\mu
=
\frac{1+\sqrt{1+4\mu}}2
>1
$$

なので厳密可行領域内にあり、

$$
x_\mu\downarrow1
\qquad(\mu\downarrow0)
$$

です。

したがって

$$
\boxed{
\text{ペナルティ法は外側から、障壁法は内側から最適境界へ近づく。}
}
$$

主双対法はさらに $\lambda$ も同時に更新し、極限で

$$
(x,\lambda)=(1,1)
$$

という KKT 解全体へ近づく、と理解できます。
<!-- solution-end -->

---

## 16. この章の要点

- 単純な閉凸制約では、射影勾配写像
  $$
  G_\alpha(x)
  =
  \frac1\alpha
  \left[
  x-P_C(x-\alpha\nabla f(x))
  \right]
  $$
  が一次最適性残差になる。
- 二次ペナルティ法は
  $$
  f(x)+\frac{\rho}{2}\|h(x)\|^2
  $$
  により等式制約を無制約問題へ移す。$\rho$ を大きくすると可行性は改善するが、条件付けが悪化し得る。
- ペナルティ停留点では
  $$
  \lambda_\rho=\rho h(x_\rho)
  $$
  と置くと KKT の停留条件と同じ形が現れる。
- 対数障壁法は厳密可行領域内で
  $$
  f(x)-\mu\sum_i\log(-g_i(x))
  $$
  を最小化し、$\mu\downarrow0$ で境界へ近づく。
- 凸問題の障壁点では
  $$
  \lambda_i=\frac{\mu}{-g_i(x_\mu)}
  $$
  と置くと
  $$
  \lambda_i g_i(x_\mu)=-\mu
  $$
  となり、
  $$
  0\le f(x_\mu)-p^*\le m\mu
  $$
  が得られる。
- [KKT 条件](../OPT5/index.md#thm-opt5-kkt)は非線形連立方程式として Newton 法で解ける。等式制約では
  $$
  \begin{pmatrix}
  \nabla^2_{xx}L&Dh^{\mathsf T}\\
  Dh&0
  \end{pmatrix}
  $$
  が基本 KKT 行列になる。
- 主双対法は $x,s,\lambda,\nu$ を同時更新し、停留条件・主可行性・相補性を同じ Newton 系で減らす。
- 逐次二次計画法は、目的関数を二次近似し制約を一次近似する。等式制約で Lagrangian の正確な Hessian を使うと、SQP ステップは KKT-Newton ステップと一致する。
- Newton / SQP の高速収束は局所的であり、直線探索・信頼領域法・フィルタ法・境界までの割合などの大域化が別途必要になる。

次の OPT10 では線形計画へ進み、多面体・極点・基本実行可能解・LP 双対・相補性を、Farkas の補題と接続して閉じます。
