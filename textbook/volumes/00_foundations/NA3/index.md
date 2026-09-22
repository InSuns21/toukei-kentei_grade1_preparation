# NA3 数値解析 III：非線形連立方程式

一変数の Newton 法では、接線

$$
f(x_k)+f'(x_k)(x-x_k)
$$

をゼロにする点を次の近似値にしました。非線形連立方程式では、これをそのまま

$$
F(x_k)+J_F(x_k)s_k=0
$$

という **線形連立方程式**へ置き換えます。

ここで重要なのは、「微分を行列へ置き換える」だけではありません。

- なぜ根の近くで Jacobian が可逆なままなのか。
- なぜ Newton 誤差の一次項が消えて二次項になるのか。
- なぜ小さい残差が小さい根誤差を意味しない場合があるのか。
- なぜ初期値によって別の根へ収束したり、反復自体が定義できなくなったりするのか。

を、行列の条件数と多変数の一次近似から説明する必要があります。

本章では

~~~text
F(x)=0
  ↓
Fréchet微分・Jacobianで一次近似
  ↓
J_F(x_k)s_k=-F(x_k)
  ↓
Newtonステップ
  ↓
JacobianのLipschitz性
  ↓
一次近似の二次剰余
  ↓
可逆行列の摂動評価
  ↓
局所二次収束
  ↓
逆Jacobianと根の感度
  ↓
残差・悪条件性・初期値依存
~~~

を一つの流れとして整理します。

直接の前提は [NA1 浮動小数点・誤差・条件数・安定性](../NA1/index.md)、[NA2 非線形方程式・不動点反復・Newton 法](../NA2/index.md)、[F0-02C3 Fréchet微分・Jacobian・連鎖律](../F0_02C3_Frechet微分_線形作用素_随伴/index.md)、[RA4 Riemann積分・微積分学の基本定理](../RA4/index.md) です。

特に本章では、

- Jacobian は [F0-02C3 の Fréchet 微分の行列表示](../F0_02C3_Frechet微分_線形作用素_随伴/index.md#def-f0-02c3-frechet-derivative)
- 作用素ノルムは [F0-02C3 の作用素ノルム](../F0_02C3_Frechet微分_線形作用素_随伴/index.md#def-f0-02c3-operator-norm)
- 行列条件数と最小特異値は [NA1 の 2-ノルム条件数](../NA1/index.md#def-na1-matrix-condition-number)
- 収束次数は [NA2 の収束次数](../NA2/index.md#def-na2-order-of-convergence)

を正本として使います。

<!-- definition-example-audit: strict -->

---

## 0. 非線形連立方程式では「根」も「残差」もベクトルになる

<a id="def-na3-root-residual"></a>
<!-- formal-statement-start -->
### 定義（非線形連立方程式の根・残差）

開集合 $U\subset\mathbb R^n$ と写像

$$
F:U\to\mathbb R^n
$$

を考える。

$$
F(\alpha)=0
$$

を満たす $\alpha\in U$ を **非線形連立方程式 $F(x)=0$ の根**という。

近似値 $x\in U$ に対して

$$
\boxed{
r(x):=F(x)
}
$$

を **残差**といい、その大きさを例えば Euclid ノルム

$$
\|F(x)\|_2
$$

で測る。
<!-- formal-statement-end -->

<!-- definition-example-start: def-na3-root-residual -->
**定義の確認**。二つの方程式

$$
x^2+y^2=1,
\qquad
x-y=0
$$

を

$$
F(x,y)
=
\begin{pmatrix}
x^2+y^2-1\\
x-y
\end{pmatrix}
$$

と書きます。

$$
\alpha_\pm
=
\left(
\pm\frac1{\sqrt2},
\pm\frac1{\sqrt2}
\right)
$$

では

$$
F(\alpha_\pm)=0
$$

なので二つとも根です。

一方

$$
x_0=
\begin{pmatrix}
1\\
1/2
\end{pmatrix}
$$

では

$$
F(x_0)
=
\begin{pmatrix}
1/4\\
1/2
\end{pmatrix},
$$

従って

$$
\|F(x_0)\|_2
=
\frac{\sqrt5}{4}.
$$

残差は「今の点を方程式へ代入したときの不一致」です。
<!-- definition-example-end -->

一変数と同様、残差が小さいことと根に近いことは同じではありません。後で、両者を結ぶ係数が逆 Jacobian のノルムであることを示します。

---

## 1. Jacobian は非線形写像の局所線形モデル

$F=(F_1,\dots,F_n)^{\mathsf T}$ が $x$ で Fréchet 微分可能なら、

$$
F(x+h)
=
F(x)+J_F(x)h+\rho_x(h),
$$

ただし

$$
\frac{\|\rho_x(h)\|_2}{\|h\|_2}
\to0
\qquad
(h\to0)
$$

です。

Jacobian 行列は

$$
J_F(x)
=
\begin{pmatrix}
\dfrac{\partial F_1}{\partial x_1}(x)&\cdots&
\dfrac{\partial F_1}{\partial x_n}(x)\\
\vdots&&\vdots\\
\dfrac{\partial F_n}{\partial x_1}(x)&\cdots&
\dfrac{\partial F_n}{\partial x_n}(x)
\end{pmatrix}.
$$

これは [F0-02C3](../F0_02C3_Frechet微分_線形作用素_随伴/index.md) で構成した Fréchet 微分 $DF(x)$ を標準基底で表したものです。

### 例：円と直線

$$
F(x,y)
=
\begin{pmatrix}
x^2+y^2-1\\
x-y
\end{pmatrix}
$$

なら

$$
J_F(x,y)
=
\begin{pmatrix}
2x&2y\\
1&-1
\end{pmatrix}.
$$

現在点 $(x,y)$ の近くで $(s,t)$ だけ動かすと

$$
F(x+s,y+t)
\approx
F(x,y)
+
J_F(x,y)
\begin{pmatrix}
s\\t
\end{pmatrix}.
$$

非線形問題を毎回一つの線形問題へ置き換えるのが多変数 Newton 法の基本発想です。

---

## 2. 多変数 Newton 法を線形化から導く

現在点を $x_k$ とし、次の点を

$$
x_{k+1}=x_k+s_k
$$

と書きます。

根を求めたいので

$$
F(x_k+s_k)=0
$$

にしたい。しかし左辺は非線形です。

一次近似

$$
F(x_k+s_k)
\approx
F(x_k)+J_F(x_k)s_k
$$

で置き換え、

$$
F(x_k)+J_F(x_k)s_k=0
$$

を要求します。

<a id="def-na3-system-newton"></a>
<!-- formal-statement-start -->
### 定義（非線形連立方程式に対する Newton 法）

$F:U\subset\mathbb R^n\to\mathbb R^n$ が微分可能とする。

反復点 $x_k\in U$ で $J_F(x_k)$ が可逆なら、**Newton ステップ** $s_k$ を

$$
\boxed{
J_F(x_k)s_k=-F(x_k)
}
$$

の解として定め、

$$
\boxed{
x_{k+1}=x_k+s_k
}
$$

と更新する。この反復を **非線形連立方程式に対する Newton 法**という。
<!-- formal-statement-end -->

<!-- definition-example-start: def-na3-system-newton -->
**定義の確認**。先ほどの

$$
F(x,y)
=
\begin{pmatrix}
x^2+y^2-1\\
x-y
\end{pmatrix}
$$

に

$$
x_0=
\begin{pmatrix}
1\\
1/2
\end{pmatrix}
$$

から Newton 法を適用します。

$$
F(x_0)
=
\begin{pmatrix}
1/4\\
1/2
\end{pmatrix},
\qquad
J_F(x_0)
=
\begin{pmatrix}
2&1\\
1&-1
\end{pmatrix}.
$$

従って

$$
\begin{pmatrix}
2&1\\
1&-1
\end{pmatrix}
\begin{pmatrix}
s_1\\s_2
\end{pmatrix}
=
-
\begin{pmatrix}
1/4\\1/2
\end{pmatrix}.
$$

第二式から

$$
s_1-s_2=-\frac12,
$$

第一式と合わせると

$$
s_1=-\frac14,
\qquad
s_2=\frac14.
$$

したがって

$$
x_1
=
\begin{pmatrix}
3/4\\
3/4
\end{pmatrix}.
$$

一回で直線 $x=y$ 上へ乗りました。

次の反復では

$$
F(3/4,3/4)
=
\begin{pmatrix}
1/8\\0
\end{pmatrix},
$$

$$
J_F(3/4,3/4)
=
\begin{pmatrix}
3/2&3/2\\
1&-1
\end{pmatrix}.
$$

第二式から二つの補正成分は等しく、

$$
3s=-\frac18
$$

なので

$$
s=-\frac1{24}.
$$

従って

$$
x_2
=
\begin{pmatrix}
17/24\\
17/24
\end{pmatrix}
\approx
\begin{pmatrix}
0.70833\\
0.70833
\end{pmatrix},
$$

正の根

$$
\left(\frac1{\sqrt2},\frac1{\sqrt2}\right)
\approx
(0.70711,0.70711)
$$

へ急速に近づきます。
<!-- definition-example-end -->

### 逆行列を明示的に作らない

数式だけなら

$$
s_k=-J_F(x_k)^{-1}F(x_k)
$$

と書けます。しかし数値計算では通常、

$$
J_F(x_k)^{-1}
$$

を明示的に計算してから掛けるのではなく、

$$
J_F(x_k)s_k=-F(x_k)
$$

という線形方程式を直接解きます。

理由は二つあります。

1. 必要なのは逆行列そのものではなく、右辺 $-F(x_k)$ に対する解だけだから。
2. 逆行列を明示的に形成すると余計な演算・記憶を使い、丸め誤差の観点でも有利ではないから。

線形方程式をどう安定に解くかは NA8 で本格的に扱います。本章では Newton 法の数理構造へ集中します。

---

## 3. 二次収束には「一次近似の誤差が二次」であることが必要

一変数 Newton 法では Taylor 展開から

$$
f(\alpha)
=
f(x)+f'(x)(\alpha-x)+O(|x-\alpha|^2)
$$

を使いました。

多変数でも同じ役割を果たす評価が必要です。そのため Jacobian の変化を制御します。

<a id="def-na3-jacobian-lipschitz"></a>
<!-- formal-statement-start -->
### 定義（Jacobian の Lipschitz 連続性）

集合 $D\subset\mathbb R^n$ 上で $F:D\to\mathbb R^n$ が微分可能とする。

ある定数 $L\ge0$ が存在して、任意の $x,y\in D$ に対し

$$
\boxed{
\|J_F(x)-J_F(y)\|_2
\le
L\|x-y\|_2
}
$$

が成り立つとき、$J_F$ は $D$ 上で **Lipschitz 連続**であるという。
<!-- formal-statement-end -->

<!-- definition-example-start: def-na3-jacobian-lipschitz -->
**定義の確認**。円と直線の例では

$$
J_F(x,y)
=
\begin{pmatrix}
2x&2y\\
1&-1
\end{pmatrix}.
$$

二点 $z=(x,y)$、$w=(u,v)$ に対して

$$
J_F(z)-J_F(w)
=
\begin{pmatrix}
2(x-u)&2(y-v)\\
0&0
\end{pmatrix}.
$$

この行列の 2-作用素ノルムは第一行の Euclid ノルムに等しいので

$$
\|J_F(z)-J_F(w)\|_2
=
2\sqrt{(x-u)^2+(y-v)^2}
=
2\|z-w\|_2.
$$

従ってこの例では全平面上で

$$
L=2
$$

を取れます。
<!-- definition-example-end -->

<a id="prop-na3-quadratic-remainder"></a>
<!-- formal-statement-start -->
### 命題（Lipschitz Jacobian による一次近似の二次剰余）

凸集合 $D\subset\mathbb R^n$ 上で $F:D\to\mathbb R^n$ が連続微分可能で、$J_F$ が Lipschitz 定数 $L$ を持つとする。

$x,x+h\in D$ なら

$$
\boxed{
\|F(x+h)-F(x)-J_F(x)h\|_2
\le
\frac L2\|h\|_2^2
}
$$

が成り立つ。
<!-- formal-statement-end -->

### 証明の見取り図

線分

$$
\gamma(t)=x+th
$$

に沿って $F$ を一変数関数として見ます。

微積分学の基本定理で

$$
F(x+h)-F(x)
=
\int_0^1 J_F(x+th)h\,dt
$$

と書き、$J_F(x)h$ を引きます。

残るのは Jacobian の差なので、Lipschitz 評価を積分すれば $1/2$ が出ます。

<!-- proof-start -->
### 証明

各成分 $F_i$ について

$$
\phi_i(t)=F_i(x+th)
$$

と置きます。連鎖律より

$$
\phi_i'(t)
=
\nabla F_i(x+th)^{\mathsf T}h.
$$

[微積分学の基本定理II](../RA4/index.md#thm-ra4-ftc2) を各成分へ適用すると

$$
F(x+h)-F(x)
=
\int_0^1J_F(x+th)h\,dt.
$$

従って

$$
F(x+h)-F(x)-J_F(x)h
=
\int_0^1
\{J_F(x+th)-J_F(x)\}h\,dt.
$$

作用素ノルムの評価から

$$
\begin{aligned}
\|F(x+h)-F(x)-J_F(x)h\|_2
&\le
\int_0^1
\|J_F(x+th)-J_F(x)\|_2
\|h\|_2\,dt\\
&\le
\int_0^1
Lt\|h\|_2^2\,dt\\
&=
\frac L2\|h\|_2^2.
\end{aligned}
$$

$\square$
<!-- proof-end -->

ここで凸性を使ったのは、$x$ から $x+h$ への線分全体が $D$ に留まり、積分表示をその区間で使えるようにするためです。

---

## 4. 根で可逆なら、十分近くでも可逆であり続ける

Newton 法は各反復で

$$
J_F(x_k)s_k=-F(x_k)
$$

を解くので、Jacobian が可逆でなければ次へ進めません。

根 $\alpha$ で $J_F(\alpha)$ が可逆だとしても、周囲の $J_F(x)$ まで自動的に可逆とはまだ言えません。

その橋渡しが可逆行列の摂動評価です。

<a id="lem-na3-inverse-perturbation"></a>
<!-- formal-statement-start -->
### 補題（可逆行列の摂動と逆行列ノルム）

$A\in\mathbb R^{n\times n}$ を可逆とし、$E\in\mathbb R^{n\times n}$ とする。

$$
\boxed{
\|A^{-1}E\|_2<1
}
$$

なら $A+E$ は可逆で、

$$
\boxed{
\|(A+E)^{-1}\|_2
\le
\frac{\|A^{-1}\|_2}
{1-\|A^{-1}E\|_2}
}
$$

が成り立つ。
<!-- formal-statement-end -->

### 証明の見取り図

$$
A+E
=
A(I+A^{-1}E)
$$

と分解します。

$\|A^{-1}E\|_2<1$ なら

$$
I+A^{-1}E
$$

の逆を 行列の幾何級数

$$
I-B+B^2-B^3+\cdots
$$

で構成できます。

<!-- proof-start -->
### 証明

$$
B=A^{-1}E
$$

と置きます。仮定より

$$
\|B\|_2<1.
$$

有限和

$$
S_m
=
I-B+B^2-\cdots+(-B)^m
$$

を考えると

$$
(I+B)S_m
=
I+(-1)^mB^{m+1}.
$$

作用素ノルムの劣乗法性より

$$
\|B^{m+1}\|_2
\le
\|B\|_2^{m+1}
\to0.
$$

また級数

$$
\sum_{k=0}^{\infty}(-B)^k
$$

は作用素ノルムで絶対収束します。極限を $S$ とすると

$$
(I+B)S=I.
$$

同様に

$$
S(I+B)=I
$$

なので

$$
(I+B)^{-1}=S.
$$

さらに

$$
\|S\|_2
\le
\sum_{k=0}^{\infty}\|B\|_2^k
=
\frac1{1-\|B\|_2}.
$$

一方

$$
A+E
=
A(I+B)
$$

なので

$$
(A+E)^{-1}
=
(I+B)^{-1}A^{-1}.
$$

従って

$$
\|(A+E)^{-1}\|_2
\le
\frac{\|A^{-1}\|_2}
{1-\|A^{-1}E\|_2}.
$$

$\square$
<!-- proof-end -->

この補題は「可逆性は十分小さい摂動で壊れない」という定量的な主張です。

---

## 5. 根の近くで Jacobian の可逆性を保証する

$\alpha$ を根とし

$$
A:=J_F(\alpha)
$$

が可逆だとします。

$$
M:=\|A^{-1}\|_2
$$

と置きます。

Jacobian が Lipschitz 定数 $L$ を持つなら

$$
\|J_F(x)-A\|_2
\le
L\|x-\alpha\|_2.
$$

従って

$$
\|A^{-1}(J_F(x)-A)\|_2
\le
ML\|x-\alpha\|_2.
$$

特に

$$
ML\|x-\alpha\|_2
\le
\frac12
$$

なら前節の補題を適用でき、

$$
J_F(x)
$$

は可逆で

$$
\boxed{
\|J_F(x)^{-1}\|_2
\le
2M
}
$$

です。

つまり局所収束証明で本当に必要なのは、

- 根で Jacobian が可逆
- Jacobian が急激に変化しない

という二つです。

---

## 6. 多変数 Newton 法の局所二次収束

<a id="thm-na3-local-newton"></a>
<!-- formal-statement-start -->
### 定理（非線形連立方程式に対する Newton 法の局所収束）

$U\subset\mathbb R^n$ を開集合、$F:U\to\mathbb R^n$ を連続微分可能とする。

$\alpha\in U$ が

$$
F(\alpha)=0
$$

を満たし、

$$
A:=J_F(\alpha)
$$

が可逆であるとする。

ある $r>0$ に対し閉球

$$
\overline B(\alpha,r)\subset U
$$

で、$J_F$ が Lipschitz 定数 $L$ を持つとする。

さらに

$$
M:=\|A^{-1}\|_2
$$

として

$$
\boxed{
MLr\le\frac12
}
$$

とする。

このとき任意の

$$
x_0\in\overline B(\alpha,r)
$$

から Newton 法を開始すると、すべての反復で $J_F(x_k)$ は可逆で、反復点は閉球内に留まり、

$$
x_k\to\alpha.
$$

さらに誤差

$$
e_k:=x_k-\alpha
$$

は

$$
\boxed{
\|e_{k+1}\|_2
\le
ML\|e_k\|_2^2
}
$$

を満たす。
<!-- formal-statement-end -->

### 証明の見取り図

証明は二つの評価を組み合わせます。

1. 根の近くでは
   $$
   \|J_F(x)^{-1}\|_2\le2M.
   $$
2. 線形化の剰余は
   $$
   \frac L2\|x-\alpha\|_2^2
   $$
   以下。

$2M$ と $L/2$ が掛かって $ML$ となり、誤差の一次項が消えて二乗だけが残ります。

<!-- proof-start -->
### 証明

まず $x\in\overline B(\alpha,r)$ を任意に取ります。

前節より

$$
\|A^{-1}(J_F(x)-A)\|_2
\le
MLr
\le
\frac12.
$$

したがって [可逆行列の摂動と逆行列ノルム](#lem-na3-inverse-perturbation) より $J_F(x)$ は可逆で、

$$
\|J_F(x)^{-1}\|_2
\le
\frac{M}{1-1/2}
=
2M.
$$

次に $e=x-\alpha$ とします。

Newton 更新を

$$
x_+
=
x-J_F(x)^{-1}F(x)
$$

と書くと

$$
e_+
=
x_+-\alpha
=
e-J_F(x)^{-1}F(x).
$$

$J_F(x)$ を掛けた形へ直すと

$$
e_+
=
J_F(x)^{-1}
\{J_F(x)e-F(x)\}.
$$

ここで $F(\alpha)=0$ です。

[一次近似の二次剰余](#prop-na3-quadratic-remainder) を基点 $x$、増分 $-e=\alpha-x$ に適用すると

$$
\|F(\alpha)-F(x)+J_F(x)e\|_2
\le
\frac L2\|e\|_2^2.
$$

$F(\alpha)=0$ なので

$$
\|J_F(x)e-F(x)\|_2
\le
\frac L2\|e\|_2^2.
$$

従って

$$
\begin{aligned}
\|e_+\|_2
&\le
\|J_F(x)^{-1}\|_2
\|J_F(x)e-F(x)\|_2\\
&\le
2M\cdot\frac L2\|e\|_2^2\\
&=
ML\|e\|_2^2.
\end{aligned}
$$

これが二次誤差評価です。

さらに $\|e\|_2\le r$ なら

$$
\|e_+\|_2
\le
MLr\,\|e\|_2
\le
\frac12\|e\|_2.
$$

従って

$$
\|e_+\|_2\le\frac r2<r.
$$

つまり一回更新しても閉球内に留まります。

$x_0\in\overline B(\alpha,r)$ から帰納的に、すべての $x_k$ について

- $J_F(x_k)$ は可逆
- $x_k\in\overline B(\alpha,r)$
- $\|e_{k+1}\|_2\le\frac12\|e_k\|_2$

が成り立ちます。

従って

$$
\|e_k\|_2
\le
2^{-k}\|e_0\|_2
\to0.
$$

よって

$$
x_k\to\alpha.
$$

さらに各段階で既に

$$
\|e_{k+1}\|_2
\le
ML\|e_k\|_2^2
$$

を得ています。これは **二次収束型の誤差評価**です。

[NA2 の収束次数](../NA2/index.md#def-na2-order-of-convergence) は

$$
\frac{\|e_{k+1}\|}{\|e_k\|^2}
$$

が正の有限値へ収束するときに「次数2」と定義しました。本定理の上界だけから、その極限が正であることまでは主張しません。問題によっては二次より速く収束する場合もあるためです。

$\square$
<!-- proof-end -->

### どの仮定が何をしているか

この定理では仮定の役割がはっきり分かれています。

- $F(\alpha)=0$：誤差式で定数項を消す。
- $J_F(\alpha)$ 可逆：Newton ステップを根の近くで一意に解ける起点。
- Jacobian の Lipschitz 性：一次近似の剰余を二次で抑える。
- $MLr\le1/2$：Jacobian の可逆性を球内で保ち、更新点を球外へ逃がさない。

特に $J_F(\alpha)$ が特異なら、この証明の最初の可逆行列摂動が使えません。一変数の重根で $f'(\alpha)=0$ だったことの多変数版です。

---

## 7. 根の感度は逆 Jacobian が測る

Newton 法で逆 Jacobian が現れるのは、反復式だけではありません。問題そのものの感度にも同じ量が現れます。

方程式を少し摂動して

$$
F(x)=b
$$

を考えます。

根 $\alpha$ の近くで

$$
F(\alpha+h)
\approx
F(\alpha)+A h
=
Ah
$$

なので、

$$
Ah\approx b.
$$

従って一次近似では

$$
h\approx A^{-1}b.
$$

<a id="def-na3-root-condition"></a>
<!-- formal-statement-start -->
### 定義（根の局所絶対条件数）

$F(\alpha)=0$ かつ $J_F(\alpha)$ が可逆とする。

$$
\boxed{
\kappa_{\mathrm{root}}(\alpha)
:=
\|J_F(\alpha)^{-1}\|_2
}
$$

を、加法的な右辺摂動に対する **根の局所絶対条件数**と呼ぶ。
<!-- formal-statement-end -->

<!-- definition-example-start: def-na3-root-condition -->
**定義の確認**。線形な写像

$$
F(x)=Ax-b
$$

では Jacobian は常に

$$
J_F(x)=A
$$

です。

右辺を $b+\Delta b$ に変えると根の変化は厳密に

$$
\Delta x=A^{-1}\Delta b.
$$

従って

$$
\|\Delta x\|_2
\le
\|A^{-1}\|_2\|\Delta b\|_2.
$$

非線形問題でも、根の十分近くでは同じ式が一次近似として現れます。
<!-- definition-example-end -->

NA1 の

$$
\kappa_2(A)
=
\|A\|_2\|A^{-1}\|_2
$$

は相対的な入力・出力スケールを含む線形方程式の条件数でした。

ここではまず加法摂動

$$
F(x)=b
$$

に対する **絶対感度**だけを取り出しているため、

$$
\|J_F(\alpha)^{-1}\|_2
$$

だけが現れます。

---

## 8. 残差が小さくても根誤差が小さいとは限らない

<a id="prop-na3-residual-root-error"></a>
<!-- formal-statement-start -->
### 命題（近傍での残差から根誤差への評価）

[局所収束定理](#thm-na3-local-newton)と同じ記号を用いる。

$x\in\overline B(\alpha,r)$ とし、

$$
ML\|x-\alpha\|_2\le1
$$

とする。このとき

$$
\boxed{
\|x-\alpha\|_2
\le
2M\|F(x)\|_2
}
$$

が成り立つ。
<!-- formal-statement-end -->

<!-- proof-start -->
### 証明

$e=x-\alpha$ と置きます。

§3 と同様に、各成分へ [微積分学の基本定理II](../RA4/index.md#thm-ra4-ftc2) を適用すると

$$
F(x)-F(\alpha)
=
\left\{
\int_0^1J_F(\alpha+te)\,dt
\right\}e.
$$

$F(\alpha)=0$ なので

$$
F(x)=Be,
$$

ただし

$$
B
=
\int_0^1J_F(\alpha+te)\,dt.
$$

$A=J_F(\alpha)$ とすると

$$
B-A
=
\int_0^1
\{J_F(\alpha+te)-A\}\,dt.
$$

Jacobian の Lipschitz 性より

$$
\begin{aligned}
\|B-A\|_2
&\le
\int_0^1Lt\|e\|_2\,dt\\
&=
\frac L2\|e\|_2.
\end{aligned}
$$

従って

$$
\|A^{-1}(B-A)\|_2
\le
\frac{ML}{2}\|e\|_2
\le
\frac12.
$$

[可逆行列の摂動と逆行列ノルム](#lem-na3-inverse-perturbation) より $B$ は可逆で

$$
\|B^{-1}\|_2\le2M.
$$

$F(x)=Be$ なので

$$
e=B^{-1}F(x).
$$

従って

$$
\|x-\alpha\|_2
=
\|e\|_2
\le
2M\|F(x)\|_2.
$$

$\square$
<!-- proof-end -->

この式は停止判定を読むときに重要です。

$$
\|F(x)\|_2
$$

が小さいだけでは不十分で、係数

$$
M=\|J_F(\alpha)^{-1}\|_2
$$

が大きいと根誤差は大きくなり得ます。

---

## 9. 悪条件な Jacobian：小さい残差が大きい位置誤差を隠す

$\varepsilon>0$ とし、

$$
F_\varepsilon(x,y)
=
\begin{pmatrix}
x+y-2\\
x+(1+\varepsilon)y-(2+\varepsilon)
\end{pmatrix}
$$

を考えます。

根は

$$
\alpha=
\begin{pmatrix}
1\\1
\end{pmatrix}
$$

です。

Jacobian は一定で

$$
A_\varepsilon
=
\begin{pmatrix}
1&1\\
1&1+\varepsilon
\end{pmatrix},
$$

$$
\det A_\varepsilon
=
\varepsilon.
$$

$\varepsilon$ が小さいと二本の方程式はほとんど平行で、Jacobian はほぼ特異になります。

近似点を

$$
x_t
=
\begin{pmatrix}
1+t\\
1-t
\end{pmatrix}
$$

とします。

根誤差は

$$
\|x_t-\alpha\|_2
=
\sqrt2\,|t|.
$$

一方

$$
F_\varepsilon(x_t)
=
A_\varepsilon
\begin{pmatrix}
t\\-t
\end{pmatrix}
=
\begin{pmatrix}
0\\
-\varepsilon t
\end{pmatrix},
$$

従って

$$
\|F_\varepsilon(x_t)\|_2
=
\varepsilon|t|.
$$

よって

$$
\frac{\|x_t-\alpha\|_2}
{\|F_\varepsilon(x_t)\|_2}
=
\frac{\sqrt2}{\varepsilon}.
$$

$\varepsilon\to0$ でこの比は無限大へ増大します。

残差は $\varepsilon$ 倍まで小さく見えるのに、位置誤差は小さくなりません。

### 証明機構のどこが壊れかけているか

局所収束・残差評価では

$$
M=\|J_F(\alpha)^{-1}\|_2
$$

を使いました。

$\varepsilon\to0$ では最小特異値が0へ近づくため、[NA1 の特異値による条件数表示](../NA1/index.md#prop-na1-condition-singular-values)から

$$
\|A_\varepsilon^{-1}\|_2
=
\frac1{\sigma_{\min}(A_\varepsilon)}
$$

が大きくなります。

したがって、

- Newton の局所収束を保証できる半径が狭くなる。
- 残差から根誤差への係数が大きくなる。
- 線形 Newton ステップ自体も丸め誤差に敏感になる。

という三つが同時に起こります。

「Jacobian の悪条件性」は単なる線形代数の話ではなく、非線形反復の信頼性そのものに入ってきます。

---

## 10. 初期値によって別の根へ行く

局所収束定理は、一つの根 $\alpha$ の十分近くから始めたときの定理です。

大域的にどの根へ行くかまでは決めません。

$$
F(x,y)
=
\begin{pmatrix}
x^2-1\\
y^2-1
\end{pmatrix}
$$

を考えます。

根は

$$
(1,1),\quad
(1,-1),\quad
(-1,1),\quad
(-1,-1)
$$

の四つです。

Jacobian は

$$
J_F(x,y)
=
\begin{pmatrix}
2x&0\\
0&2y
\end{pmatrix}.
$$

$x\neq0,\ y\neq0$ なら Newton 法は成分ごとに

$$
x_{k+1}
=
\frac12\left(x_k+\frac1{x_k}\right),
$$

$$
y_{k+1}
=
\frac12\left(y_k+\frac1{y_k}\right)
$$

です。

各成分の符号は反復で変わりません。

したがって、

- 第1象限からは $(1,1)$
- 第2象限からは $(-1,1)$
- 第3象限からは $(-1,-1)$
- 第4象限からは $(1,-1)$

へ収束します。

一方 $x=0$ または $y=0$ では Jacobian が特異なので、通常の Newton ステップ自体が定義できません。

この例では座標軸が収束域の境界になっています。

より一般の非線形系では境界ははるかに複雑になり得ます。NA3で必要なのは、**局所二次収束を大域収束と読み替えないこと**です。

---

## 11. 特異 Jacobian では何が失われるか

一変数で重根

$$
f(\alpha)=0,
\qquad
f'(\alpha)=0
$$

だと Newton 法の二次収束が失われました。

多変数では対応する条件が

$$
\det J_F(\alpha)=0
$$

です。

例えば

$$
F(x,y)
=
\begin{pmatrix}
x^2\\y
\end{pmatrix}
$$

は

$$
\alpha=(0,0)
$$

を根に持ちますが、

$$
J_F(0,0)
=
\begin{pmatrix}
0&0\\
0&1
\end{pmatrix}
$$

は特異です。

$x\neq0$ では Newton 法は

$$
x_{k+1}
=
x_k-\frac{x_k^2}{2x_k}
=
\frac{x_k}{2},
$$

$$
y_{k+1}=0.
$$

従って $x$ 成分は

$$
|x_{k+1}|=\frac12|x_k|
$$

としか減らず、線形収束です。

失われたのは局所収束定理の

$$
J_F(\alpha)^{-1}
$$

です。逆行列が存在しないため可逆行列摂動補題の起点を作れず、Newton 誤差式を

$$
J_F(x)^{-1}\times\text{二次剰余}
$$

という形で一様に評価できません。

---

## 12. 停止判定では何を見るか

実際の計算では真の根 $\alpha$ は分かりません。

したがって典型的には

$$
\|F(x_k)\|_2
$$

と

$$
\|s_k\|_2
=
\|x_{k+1}-x_k\|_2
$$

を監視します。

しかしどちらも単独では万能ではありません。

### 残差が小さい

悪条件な Jacobian では

$$
\|F(x_k)\|_2
$$

が小さくても根誤差が大きい場合があります。

### Newton ステップが小さい

線形方程式

$$
J_F(x_k)s_k=-F(x_k)
$$

が悪条件なら、計算された $s_k$ 自体の信頼性を確認する必要があります。

また丸め誤差で更新量がそれ以上変化しなくなっただけかもしれません。

したがって、本章の理論からは

~~~text
残差
+
Newton更新量
+
Jacobianの条件
~~~

を合わせて見るのが自然です。

線形方程式を有限精度でどう解き、その残差・後方誤差をどう評価するかは NA8 へ接続します。

---

## 13. 演習

### Level A

<a id="ex-na3-a1"></a>
#### NA3-A01 Jacobian と Newton ステップ
- Level: A

$$
F(x,y)
=
\begin{pmatrix}
x^2+y-2\\
x+y-2
\end{pmatrix}
$$

とする。

1. $J_F(x,y)$ を求めよ。
2. $x_0=(1,0)^{\mathsf T}$ での残差を求めよ。
3. Newton ステップを求め、次の反復点を計算せよ。
4. 得られた点が実際に根であることを確認せよ。

<a id="ex-na3-a2"></a>
#### NA3-A02 Jacobian の Lipschitz 定数
- Level: A

$$
F(x,y)
=
\begin{pmatrix}
x^2\\
xy
\end{pmatrix}
$$

を閉球

$$
D=\{(x,y):x^2+y^2\le R^2\}
$$

上で考える。

$J_F$ を求め、

$$
\|J_F(z)-J_F(w)\|_2
\le
L\|z-w\|_2
$$

を満たす具体的な $L$ を一つ与えよ。

厳密な最小値でなくてよい。

<a id="ex-na3-a3"></a>
#### NA3-A03 可逆性が保たれる半径
- Level: A

根 $\alpha$ において

$$
M=\|J_F(\alpha)^{-1}\|_2=4,
$$

Jacobian の Lipschitz 定数が

$$
L=3
$$

であるとする。

局所収束定理の条件

$$
MLr\le\frac12
$$

を満たす最大の $r$ を求めよ。

さらにその球内で

$$
\|J_F(x)^{-1}\|_2
$$

にどのような上界を与えられるか。

<a id="ex-na3-a4"></a>
#### NA3-A04 悪条件な残差
- Level: A

$$
A_\varepsilon
=
\begin{pmatrix}
1&1\\
1&1+\varepsilon
\end{pmatrix},
\qquad
e=
\begin{pmatrix}
1\\-1
\end{pmatrix}
$$

とする。

1. $A_\varepsilon e$ を求めよ。
2. $\|e\|_2/\|A_\varepsilon e\|_2$ を求めよ。
3. $\varepsilon\to0$ で何が起こるか説明せよ。

### Level B

<a id="ex-na3-b1"></a>
#### NA3-B01 一次近似の二次剰余を積分から導く
- Level: B

凸集合 $D$ 上で $J_F$ が Lipschitz 定数 $L$ を持つとする。

$$
F(x+h)-F(x)
=
\int_0^1J_F(x+th)h\,dt
$$

から出発し、

$$
\|F(x+h)-F(x)-J_F(x)h\|_2
\le
\frac L2\|h\|_2^2
$$

を導け。

各不等式でどの性質を使ったかも記せ。

<a id="ex-na3-b2"></a>
#### NA3-B02 Newton 誤差式
- Level: B

$F(\alpha)=0$ とし、$x$ の近くで $J_F(x)$ は可逆とする。

Newton 更新

$$
x_+
=
x-J_F(x)^{-1}F(x)
$$

について、$e=x-\alpha$、$e_+=x_+-\alpha$ と置く。

1. 
   $$
   e_+
   =
   J_F(x)^{-1}\{J_F(x)e-F(x)\}
   $$
   を示せ。
2. Jacobian が Lipschitz 定数 $L$ を持ち、
   $$
   \|J_F(x)^{-1}\|_2\le K
   $$
   なら
   $$
   \|e_+\|_2
   \le
   \frac{KL}{2}\|e\|_2^2
   $$
   を示せ。
3. 一次の誤差項が消える理由を説明せよ。

<a id="ex-na3-b3"></a>
#### NA3-B03 四つの根と初期値依存
- Level: B

$$
F(x,y)
=
\begin{pmatrix}
x^2-1\\
y^2-1
\end{pmatrix}
$$

を考える。

1. Newton 反復を成分ごとに書け。
2. $x_0y_0\neq0$ とする。各成分の符号が保存されることを示せ。
3. 四つの象限ごとにどの根へ収束するか答えよ。
4. 座標軸上で通常の Newton 法が定義できない理由を説明せよ。

### Level C

<a id="ex-na3-c1"></a>
#### NA3-C01 円と直線：局所収束・条件数・初期値
- Level: C

$$
F(x,y)
=
\begin{pmatrix}
x^2+y^2-1\\
x-y
\end{pmatrix}
$$

とし、正の根

$$
\alpha
=
\begin{pmatrix}
1/\sqrt2\\
1/\sqrt2
\end{pmatrix}
$$

を考える。

1. $J_F(x,y)$ を求め、$J_F(\alpha)$ が可逆であることを示せ。
2. $J_F$ が全平面で Lipschitz 定数 $L=2$ を持つことを示せ。
3. $J_F(\alpha)^{-1}$ を求め、$M=\|J_F(\alpha)^{-1}\|_2$ を特異値または $A^{\mathsf T}A$ から求めよ。
4. 局所収束定理から、どの程度の半径 $r$ なら
   $$
   MLr\le\frac12
   $$
   を満たすか書け。
5. $x_0=(1,1/2)^{\mathsf T}$ から最初の二回の Newton 反復を計算せよ。さらに、この $x_0$ が 4 で得た保証半径の内側か外側か確認せよ。
6. 負の根も存在することを踏まえ、局所収束定理が「任意の初期値から正の根へ行く」と主張していない理由を説明せよ。

---

## 14. 詳細解答

### A1 解答

$$
F_1(x,y)=x^2+y-2,
\qquad
F_2(x,y)=x+y-2.
$$

従って

$$
J_F(x,y)
=
\begin{pmatrix}
2x&1\\
1&1
\end{pmatrix}.
$$

$x_0=(1,0)^{\mathsf T}$ では

$$
F(1,0)
=
\begin{pmatrix}
-1\\
-1
\end{pmatrix},
\qquad
J_F(1,0)
=
\begin{pmatrix}
2&1\\
1&1
\end{pmatrix}.
$$

Newton ステップは

$$
\begin{pmatrix}
2&1\\
1&1
\end{pmatrix}
\begin{pmatrix}
s_1\\s_2
\end{pmatrix}
=
\begin{pmatrix}
1\\1
\end{pmatrix}.
$$

第二式は

$$
s_1+s_2=1,
$$

第一式との差を取ると

$$
s_1=0.
$$

従って

$$
s_2=1.
$$

よって

$$
\boxed{
x_1
=
x_0+s_0
=
\begin{pmatrix}
1\\1
\end{pmatrix}
}.
$$

実際、

$$
F(1,1)
=
\begin{pmatrix}
1+1-2\\
1+1-2
\end{pmatrix}
=
0.
$$

この例では一次線形化が一回の補正で根を捉えました。

### A2 解答

$$
F(x,y)
=
\begin{pmatrix}
x^2\\xy
\end{pmatrix}
$$

なので

$$
J_F(x,y)
=
\begin{pmatrix}
2x&0\\
y&x
\end{pmatrix}.
$$

$z=(x,y)$、$w=(u,v)$ とすると

$$
J_F(z)-J_F(w)
=
\begin{pmatrix}
2(x-u)&0\\
y-v&x-u
\end{pmatrix}.
$$

$a=x-u$、$b=y-v$ と置きます。任意のベクトル

$$
q=
\begin{pmatrix}
p\\r
\end{pmatrix}
$$

に対して

$$
\{J_F(z)-J_F(w)\}q
=
\begin{pmatrix}
2ap\\
bp+ar
\end{pmatrix}.
$$

実際、

$$
(a^2+b^2)(p^2+r^2)-(bp+ar)^2
=
(ap-br)^2
\ge0
$$

なので

$$
(bp+ar)^2
\le
(a^2+b^2)(p^2+r^2).
$$

また

$$
4a^2p^2
\le
4a^2(p^2+r^2).
$$

よって

$$
\begin{aligned}
\|\{J_F(z)-J_F(w)\}q\|_2^2
&=
4a^2p^2+(bp+ar)^2\\
&\le
(5a^2+b^2)(p^2+r^2)\\
&\le
5(a^2+b^2)\|q\|_2^2.
\end{aligned}
$$

$q\neq0$ について $\|q\|_2$ で割り、上限を取ると

$$
\boxed{
\|J_F(z)-J_F(w)\|_2
\le
\sqrt5\,\|z-w\|_2
}.
$$

よって

$$
\boxed{L=\sqrt5}
$$

を取れます。

この例では $R$ に依存しない上界が得られました。

### A3 解答

$$
M=4,
\qquad
L=3
$$

なので

$$
MLr
=
12r.
$$

条件

$$
12r\le\frac12
$$

から

$$
r\le\frac1{24}.
$$

従って許される最大半径は

$$
\boxed{
r=\frac1{24}
}.
$$

この球内では

$$
\|J_F(x)^{-1}\|_2
\le
2M
=
\boxed{8}.
$$

### A4 解答

$$
A_\varepsilon e
=
\begin{pmatrix}
1&1\\
1&1+\varepsilon
\end{pmatrix}
\begin{pmatrix}
1\\-1
\end{pmatrix}
=
\begin{pmatrix}
0\\
-\varepsilon
\end{pmatrix}.
$$

従って

$$
\|e\|_2=\sqrt2,
\qquad
\|A_\varepsilon e\|_2=\varepsilon.
$$

よって

$$
\boxed{
\frac{\|e\|_2}
{\|A_\varepsilon e\|_2}
=
\frac{\sqrt2}{\varepsilon}
}.
$$

$\varepsilon\to0$ ではこの比は無限大へ増大します。

つまり $e$ 自体は一定の大きさなのに、残差 $A_\varepsilon e$ は任意に小さくできます。

これは $A_\varepsilon$ が特異行列へ近づき、最小特異値が0へ近づくためです。

### B1 解答

出発点は

$$
F(x+h)-F(x)
=
\int_0^1J_F(x+th)h\,dt.
$$

両辺から $J_F(x)h$ を引きます。

定数行列 $J_F(x)$ について

$$
J_F(x)h
=
\int_0^1J_F(x)h\,dt
$$

なので

$$
F(x+h)-F(x)-J_F(x)h
=
\int_0^1
\{J_F(x+th)-J_F(x)\}h\,dt.
$$

ノルムを取ると、積分に対する三角不等式から

$$
\begin{aligned}
&\|F(x+h)-F(x)-J_F(x)h\|_2\\
&\le
\int_0^1
\|\{J_F(x+th)-J_F(x)\}h\|_2\,dt.
\end{aligned}
$$

作用素ノルムの定義より

$$
\|\{J_F(x+th)-J_F(x)\}h\|_2
\le
\|J_F(x+th)-J_F(x)\|_2\|h\|_2.
$$

Jacobian の Lipschitz 性から

$$
\|J_F(x+th)-J_F(x)\|_2
\le
L\|th\|_2
=
Lt\|h\|_2.
$$

従って

$$
\begin{aligned}
&\|F(x+h)-F(x)-J_F(x)h\|_2\\
&\le
\int_0^1Lt\|h\|_2^2\,dt\\
&=
L\|h\|_2^2
\left[\frac{t^2}{2}\right]_0^1\\
&=
\boxed{
\frac L2\|h\|_2^2
}.
\end{aligned}
$$

使った性質は順に、

1. 各成分への微積分学の基本定理IIの適用
2. 積分の三角不等式
3. 作用素ノルムの評価
4. Jacobian の Lipschitz 性

です。

### B2 解答

Newton 更新は

$$
x_+
=
x-J_F(x)^{-1}F(x).
$$

$\alpha$ を引くと

$$
e_+
=
x-\alpha-J_F(x)^{-1}F(x).
$$

$e=x-\alpha$ なので

$$
e_+
=
e-J_F(x)^{-1}F(x).
$$

第一項へ

$$
I=J_F(x)^{-1}J_F(x)
$$

を入れると

$$
\boxed{
e_+
=
J_F(x)^{-1}
\{J_F(x)e-F(x)\}
}.
$$

次に $F(\alpha)=0$ なので、一次近似の二次剰余を基点 $x$、増分

$$
\alpha-x=-e
$$

へ適用します。

$$
\|F(\alpha)-F(x)-J_F(x)(\alpha-x)\|_2
\le
\frac L2\|e\|_2^2.
$$

$F(\alpha)=0$ かつ $\alpha-x=-e$ だから

$$
\|J_F(x)e-F(x)\|_2
\le
\frac L2\|e\|_2^2.
$$

仮定

$$
\|J_F(x)^{-1}\|_2\le K
$$

と合わせると

$$
\begin{aligned}
\|e_+\|_2
&\le
\|J_F(x)^{-1}\|_2
\|J_F(x)e-F(x)\|_2\\
&\le
K\frac L2\|e\|_2^2.
\end{aligned}
$$

従って

$$
\boxed{
\|e_+\|_2
\le
\frac{KL}{2}\|e\|_2^2
}.
$$

一次の誤差項が消える理由は、Newton ステップが

$$
F(x)+J_F(x)s=0
$$

を **厳密に解くように選ばれている**からです。

一次線形化の部分は更新で打ち消され、残るのは線形化の二次剰余です。

### B3 解答

$$
F(x,y)
=
\begin{pmatrix}
x^2-1\\
y^2-1
\end{pmatrix},
\qquad
J_F(x,y)
=
\begin{pmatrix}
2x&0\\
0&2y
\end{pmatrix}.
$$

$x\neq0,\ y\neq0$ なら Newton ステップは各成分独立に

$$
2x_k s_{x,k}=-(x_k^2-1),
$$

$$
2y_k s_{y,k}=-(y_k^2-1).
$$

従って

$$
x_{k+1}
=
x_k-\frac{x_k^2-1}{2x_k}
=
\frac12
\left(
x_k+\frac1{x_k}
\right),
$$

$$
y_{k+1}
=
\frac12
\left(
y_k+\frac1{y_k}
\right).
$$

$x_k>0$ なら

$$
x_k+\frac1{x_k}>0
$$

なので $x_{k+1}>0$。

$x_k<0$ なら $1/x_k<0$ なので $x_{k+1}<0$。

従って $x$ 成分の符号は保存されます。$y$ も同様です。

各成分は $\pm1$ の平方根 Newton 法なので、

- $x_0>0,\ y_0>0$ なら $(1,1)$
- $x_0<0,\ y_0>0$ なら $(-1,1)$
- $x_0<0,\ y_0<0$ なら $(-1,-1)$
- $x_0>0,\ y_0<0$ なら $(1,-1)$

へ収束します。

一方 $x=0$ または $y=0$ では

$$
\det J_F(x,y)=4xy=0.
$$

Jacobian が特異なので

$$
J_F(x_k)s_k=-F(x_k)
$$

を一意に解けず、通常の Newton 法はその点では定義できません。

### C1 解答

$$
F(x,y)
=
\begin{pmatrix}
x^2+y^2-1\\
x-y
\end{pmatrix}.
$$

**1. Jacobian と根での可逆性。**

$$
J_F(x,y)
=
\begin{pmatrix}
2x&2y\\
1&-1
\end{pmatrix}.
$$

$$
a:=\frac1{\sqrt2}
$$

と置くと

$$
\alpha=(a,a)^{\mathsf T},
$$

$$
A:=J_F(\alpha)
=
\begin{pmatrix}
\sqrt2&\sqrt2\\
1&-1
\end{pmatrix}.
$$

ここで

$$
B=
\begin{pmatrix}
1/(2\sqrt2)&1/2\\
1/(2\sqrt2)&-1/2
\end{pmatrix}
$$

と置くと、直接掛け算して

$$
AB=BA=I_2
$$

を確認できます。従って $A$ は可逆で、$B=A^{-1}$ です。

**2. Lipschitz 定数。**

二点 $z=(x,y)$、$w=(u,v)$ に対して

$$
J_F(z)-J_F(w)
=
\begin{pmatrix}
2(x-u)&2(y-v)\\
0&0
\end{pmatrix}.
$$

この行列の 2-作用素ノルムは第一行の Euclid ノルムだから

$$
\|J_F(z)-J_F(w)\|_2
=
2\sqrt{(x-u)^2+(y-v)^2}.
$$

従って

$$
\boxed{L=2}.
$$

**3. 逆行列ノルム。**

$$
A:=J_F(\alpha)
=
\begin{pmatrix}
\sqrt2&\sqrt2\\
1&-1
\end{pmatrix}.
$$

$$
A^{\mathsf T}A
=
\begin{pmatrix}
3&1\\
1&3
\end{pmatrix}.
$$

この固有値は

$$
4,\qquad2.
$$

従って $A$ の特異値は

$$
2,\qquad\sqrt2.
$$

最小特異値は $\sqrt2$ なので

$$
\boxed{
M=\|A^{-1}\|_2
=
\frac1{\sqrt2}
}.
$$

逆行列を直接書けば

$$
A^{-1}
=
\frac1{-2\sqrt2}
\begin{pmatrix}
-1&-\sqrt2\\
-1&\sqrt2
\end{pmatrix}
=
\begin{pmatrix}
1/(2\sqrt2)&1/2\\
1/(2\sqrt2)&-1/2
\end{pmatrix}.
$$

**4. 局所収束半径。**

$$
M=\frac1{\sqrt2},
\qquad
L=2
$$

なので

$$
ML=\sqrt2.
$$

条件

$$
MLr\le\frac12
$$

は

$$
\sqrt2\,r\le\frac12.
$$

従って

$$
\boxed{
r\le\frac1{2\sqrt2}
}.
$$

この半径の閉球が定義域内にあることも必要ですが、この例では $F$ は全平面で定義されているので問題ありません。

**5. 最初の二回。**

$$
x_0=
\begin{pmatrix}
1\\1/2
\end{pmatrix}.
$$

本文で計算した通り

$$
F(x_0)
=
\begin{pmatrix}
1/4\\1/2
\end{pmatrix},
$$

$$
J_F(x_0)
=
\begin{pmatrix}
2&1\\1&-1
\end{pmatrix}.
$$

Newton ステップは

$$
s_0=
\begin{pmatrix}
-1/4\\1/4
\end{pmatrix}.
$$

従って

$$
\boxed{
x_1=
\begin{pmatrix}
3/4\\3/4
\end{pmatrix}
}.
$$

次に

$$
F(x_1)
=
\begin{pmatrix}
1/8\\0
\end{pmatrix},
$$

$$
J_F(x_1)
=
\begin{pmatrix}
3/2&3/2\\
1&-1
\end{pmatrix}.
$$

第二式からステップ成分は等しいので

$$
s_{1,1}=s_{1,2}=s.
$$

第一式は

$$
3s=-\frac18
$$

だから

$$
s=-\frac1{24}.
$$

従って

$$
\boxed{
x_2
=
\begin{pmatrix}
17/24\\
17/24
\end{pmatrix}
}.
$$

さらに

$$
\|x_0-\alpha\|_2^2
=
\left(1-\frac1{\sqrt2}\right)^2
+
\left(\frac12-\frac1{\sqrt2}\right)^2
=
\frac94-\frac3{\sqrt2}.
$$

一方、保証半径の上限は

$$
r=\frac1{2\sqrt2},
\qquad
r^2=\frac18.
$$

数値的には

$$
\|x_0-\alpha\|_2\approx0.3587,
\qquad
r\approx0.3536.
$$

したがって、この $x_0$ は **定理が保証する球のわずか外側**です。それでも実際の反復は収束しました。これは定理の半径条件が十分条件であり、必要条件ではないことを示す具体例です。

**6. 局所定理の意味。**

この系には正の根だけでなく

$$
-\alpha
=
\begin{pmatrix}
-1/\sqrt2\\
-1/\sqrt2
\end{pmatrix}
$$

もあります。

局所収束定理は、指定した根 $\alpha$ の周囲で

$$
MLr\le\frac12
$$

を満たす球を取り、その球内から開始した反復が $\alpha$ へ収束すると主張しています。

球外の初期値については何も主張していません。

特に負の根の十分近くから始めれば、同じ議論を負の根へ適用してそちらへ収束します。

したがって

$$
\boxed{
\text{局所二次収束}
\neq
\text{任意の初期値から同じ根への大域収束}
}
$$

です。

---

## 15. まとめ

本章では、一変数 Newton 法を非線形連立方程式へ拡張し、その局所収束機構を行列と線形化誤差から組み立てました。

- 非線形連立方程式を
  $$
  F(x)=0
  $$
  と書き、残差を $F(x)$ とした。
- Fréchet 微分の行列表示として Jacobian を使い、
  $$
  F(x+s)
  \approx
  F(x)+J_F(x)s
  $$
  と線形化した。
- Newton ステップを
  $$
  J_F(x_k)s_k=-F(x_k)
  $$
  の解として定義し、逆行列を明示的に作らず線形方程式を解く形が数値計算上の基本であることを確認した。
- Jacobian の Lipschitz 性から
  $$
  \|F(x+h)-F(x)-J_F(x)h\|_2
  \le
  \frac L2\|h\|_2^2
  $$
  を証明した。
- 行列の幾何級数を使って、可逆行列の十分小さい摂動が可逆であり続けることを証明した。
- 根 $\alpha$ で $J_F(\alpha)$ が可逆なら、十分小さい球内で Newton 法が定義され続け、
  $$
  \|e_{k+1}\|_2
  \le
  ML\|e_k\|_2^2
  $$
  を満たすことを証明した。
- 根の局所絶対条件数を
  $$
  \|J_F(\alpha)^{-1}\|_2
  $$
  として解釈した。
- 残差から根誤差を評価するときにも逆 Jacobian のノルムが現れることを示した。
- ほぼ特異な Jacobian では小さい残差が大きい根誤差を隠すことを具体例で確認した。
- 複数根を持つ系では初期値ごとに収束先が変わり、Jacobian が特異な点では Newton 法が定義できないことを確認した。
- 特異な根では一変数の重根と同様、二次収束が失われ得ることを確認した。

次の NA4「多項式補間」では、反復法から一度離れ、有限個の節点値から関数を多項式で近似する問題へ進みます。Lagrange 補間、Newton 補間、補間誤差、節点選択、Runge 現象を扱います。
