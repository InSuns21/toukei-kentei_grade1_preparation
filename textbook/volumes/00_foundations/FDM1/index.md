# FDM1 差分法 I：熱方程式と差分法の導入

PDE3 では、一次元熱方程式

$$
u_t=\kappa u_{xx},
\qquad
\kappa>0
$$

を連続な偏微分方程式として扱い、最大原理・エネルギー法・Fourier 展開から解の性質を調べました。

この章では視点を変えます。連続関数 $u(t,x)$ をそのまま求める代わりに、有限個の時空間点へ数値を割り当てた離散データを作り、

~~~text
偏微分方程式
  ↓
微分を有限差分へ置換
  ↓
有限個の未知数の更新式
  ↓
各時刻で数値を計算
~~~

という流れを構成します。

主役は二つです。

- 前進時間・中心空間差分法：次時刻の値を直接計算する陽解法
- 後退 Euler 差分法：次時刻の値を連立方程式から求める陰解法

直接の前提は、[PDE3 の一次元熱方程式](../PDE3/index.md#def-pde3-heat-equation)、[NA7 の後退 Euler 法](../NA7/index.md#def-na7-backward-euler)、[NA8 の Cholesky 分解](../NA8/index.md#def-na8-cholesky-factorization)です。

> **この章の停止線**  
> 差分式の導出、境界条件の組込み、陽解法・陰解法の区別、陰解法の各時刻ステップが一意に解けることまでは本章で閉じます。時間刻みと空間刻みの比が安定性へどう効くか、CFL 条件、von Neumann 型解析、長時間の誤差増幅は FDM2 で扱います。

---

## 0. まず連続問題を固定する

区間

$$
0<x<L,
\qquad
0<t\le T
$$

で熱方程式

$$
u_t(t,x)=\kappa u_{xx}(t,x)
$$

を考えます。

初期条件を

$$
u(0,x)=f(x),
$$

Dirichlet 境界条件を

$$
u(t,0)=g_0(t),
\qquad
u(t,L)=g_L(t)
$$

とします。

古典解を想定するなら、角 $(0,0)$ と $(0,L)$ でデータが食い違わないよう

$$
f(0)=g_0(0),
\qquad
f(L)=g_L(0)
$$

という整合条件が自然です。

差分法では、この連続問題のすべての点を追うのではなく、有限個の点だけを残します。

---

## 1. 空間と時間を格子へ落とす

<a id="def-fdm1-grid-grid-function"></a>
<!-- formal-statement-start -->
### 定義（時空間差分格子・格子関数）

正整数 $J,N$ を取り、

$$
h=\frac{L}{J},
\qquad
\tau=\frac{T}{N}
$$

とする。

空間格子点と時間格子点を

$$
x_j=jh
\qquad
(j=0,\ldots,J),
$$

$$
t_n=n\tau
\qquad
(n=0,\ldots,N)
$$

で定める。

点

$$
(t_n,x_j)
$$

の集合を **時空間差分格子**という。

各格子点へ数値

$$
U_j^n
$$

を割り当てるものを **格子関数**という。数値計算では

$$
\boxed{
U_j^n\approx u(t_n,x_j)
}
$$

と解釈する。
<!-- formal-statement-end -->

<!-- definition-example-start: def-fdm1-grid-grid-function -->
### 例：$L=1$ を4分割する

$J=4$ とすると

$$
h=\frac14
$$

で、

$$
x_0=0,\quad
x_1=\frac14,\quad
x_2=\frac12,\quad
x_3=\frac34,\quad
x_4=1
$$

です。

たとえばある時刻 $t_n$ で

$$
(U_0^n,U_1^n,U_2^n,U_3^n,U_4^n)
=
\left(
0,\frac34,1,\frac34,0
\right)
$$

なら、この5個の値がその時刻の格子関数です。

端点 $j=0,J$ は境界条件から与え、内部点 $j=1,\ldots,J-1$ を数値法で更新します。
<!-- definition-example-end -->

ここで重要なのは、$h$ と $\tau$ が別々の離散化幅だということです。空間を細かくしても時間を粗いままにできますし、その逆もできます。

後で両者をまとめる無次元量

$$
\boxed{
r=\frac{\kappa\tau}{h^2}
}
$$

が何度も現れます。

---

## 2. 微分を有限個の値の差へ置き換える

<a id="def-fdm1-difference-operators"></a>
<!-- formal-statement-start -->
### 定義（前進時間差分・中心二階空間差分・一次元離散 Laplacian）

格子関数 $U_j^n$ に対し、前進時間差分を

$$
\boxed{
\delta_t^+U_j^n
=
\frac{U_j^{n+1}-U_j^n}{\tau}
}
$$

で定める。

中心二階空間差分を

$$
\boxed{
\delta_{xx}U_j^n
=
\frac{
U_{j+1}^n-2U_j^n+U_{j-1}^n
}{h^2}
}
$$

で定める。

固定した時刻で

$$
(\Delta_h U)_j
=
\delta_{xx}U_j
$$

と書くとき、$\Delta_h$ を **一次元離散 Laplacian**という。
<!-- formal-statement-end -->

<!-- definition-example-start: def-fdm1-difference-operators -->
### 例：二次関数では中心二階差分が厳密に二階微分になる

$$
q(x)=x^2
$$

とします。

任意の内部格子点 $x_j$ で

$$
\begin{aligned}
\delta_{xx}q(x_j)
&=
\frac{(x_j+h)^2-2x_j^2+(x_j-h)^2}{h^2}\\
&=
\frac{2h^2}{h^2}\\
&=2.
\end{aligned}
$$

一方、

$$
q''(x)=2.
$$

したがって二次関数では

$$
\delta_{xx}q(x_j)=q''(x_j)
$$

が厳密に成り立ちます。
<!-- definition-example-end -->

### なぜこの差分近似が微分を近似するのか

差分式を暗記するより、Taylor 展開から一度作る方が安全です。

$t$ について二階連続微分可能なら、ある $\xi_t\in(t,t+\tau)$ が存在して

$$
u(t+\tau,x)
=
u(t,x)
+
\tau u_t(t,x)
+
\frac{\tau^2}{2}
u_{tt}(\xi_t,x).
$$

従って

$$
\frac{u(t+\tau,x)-u(t,x)}{\tau}
=
u_t(t,x)
+
\frac{\tau}{2}u_{tt}(\xi_t,x).
$$

つまり前進時間差分は、$\tau$ が小さいとき $u_t$ を近似します。

空間について四階連続微分可能なら、ある

$$
\xi_+\in(x,x+h),
\qquad
\xi_-\in(x-h,x)
$$

が存在して

$$
u(t,x+h)
=
u
+
hu_x
+
\frac{h^2}{2}u_{xx}
+
\frac{h^3}{6}u_{xxx}
+
\frac{h^4}{24}u_{xxxx}(t,\xi_+),
$$

$$
u(t,x-h)
=
u
-
hu_x
+
\frac{h^2}{2}u_{xx}
-
\frac{h^3}{6}u_{xxx}
+
\frac{h^4}{24}u_{xxxx}(t,\xi_-).
$$

ここで右辺の $u,u_x,u_{xx},u_{xxx}$ はすべて $(t,x)$ で評価しています。

2式を足して $2u(t,x)$ を引くと、一次と三次の項が打ち消し合い、

$$
\frac{
u(t,x+h)-2u(t,x)+u(t,x-h)
}{h^2}
=
u_{xx}(t,x)
+
\frac{h^2}{24}
\left[
u_{xxxx}(t,\xi_+)
+
u_{xxxx}(t,\xi_-)
\right].
$$

中心差分が左右対称であることが、奇数階の項を消しています。

ここでは「どの微分をどの差分近似で置き換えるか」までを使います。局所打切り誤差を一般に定義し、局所誤差から大域収束へつなぐ議論は FDM3 で行います。

---

## 3. 陽解法と陰解法は何が違うのか

<a id="def-fdm1-explicit-implicit"></a>
<!-- formal-statement-start -->
### 定義（差分法の陽解法・陰解法）

時刻 $t_n$ までの格子値が既知であるとする。

次時刻 $t_{n+1}$ の未知量 $U_j^{n+1}$ を、既知量から直接計算できる差分法を **陽解法**という。

一方、複数の $U_j^{n+1}$ が互いに結合して現れ、次時刻へ進むために方程式系を解く必要がある差分法を **陰解法**という。
<!-- formal-statement-end -->

<!-- definition-example-start: def-fdm1-explicit-implicit -->
### 例：右辺に新時刻があるかを見る

更新式が

$$
U_j^{n+1}
=
U_j^n
+
r
\left(
U_{j+1}^n-2U_j^n+U_{j-1}^n
\right)
$$

なら、右辺は時刻 $n$ の既知量だけなので陽解法です。

一方、

$$
-rU_{j-1}^{n+1}
+
(1+2r)U_j^{n+1}
-
rU_{j+1}^{n+1}
=
U_j^n
$$

では、隣接する新時刻の未知量が同時に現れるので陰解法です。
<!-- definition-example-end -->

「陽なら良い」「陰なら良い」という分類ではありません。

- 陽解法：1ステップは軽いが、安定性のため刻み幅に制約が出ることがある。
- 陰解法：各ステップで方程式系を解く必要があるが、安定性で有利なことがある。

後半は FDM2 で数式として確かめます。

---

## 4. 前進時間・中心空間差分法を導く

熱方程式

$$
u_t=\kappa u_{xx}
$$

の $u_t$ を前進時間差分、$u_{xx}$ を同じ時刻 $t_n$ の中心二階空間差分で置き換えます。

すると

$$
\frac{U_j^{n+1}-U_j^n}{\tau}
=
\kappa
\frac{
U_{j+1}^n-2U_j^n+U_{j-1}^n
}{h^2}.
$$

$r=\kappa\tau/h^2$ を使うと

$$
U_j^{n+1}
=
U_j^n
+
r
\left(
U_{j+1}^n-2U_j^n+U_{j-1}^n
\right).
$$

すなわち

$$
\boxed{
U_j^{n+1}
=
rU_{j-1}^n
+
(1-2r)U_j^n
+
rU_{j+1}^n
}
$$

です。

<a id="def-fdm1-ftcs"></a>
<!-- formal-statement-start -->
### 定義（前進時間・中心空間差分法）

一次元熱方程式

$$
u_t=\kappa u_{xx}
$$

に対し、内部格子点 $j=1,\ldots,J-1$ で

$$
\boxed{
\frac{U_j^{n+1}-U_j^n}{\tau}
=
\kappa
\frac{
U_{j+1}^n-2U_j^n+U_{j-1}^n
}{h^2}
}
$$

とする差分法を **前進時間・中心空間差分法**という。

英語名 forward-time centered-space の頭文字から FTCS とも呼ばれる。
<!-- formal-statement-end -->

<!-- definition-example-start: def-fdm1-ftcs -->
### 例：斉次境界条件で1ステップ進める

$$
L=1,
\qquad
\kappa=1,
\qquad
J=4,
\qquad
h=\frac14
$$

とします。

時間刻みを

$$
\tau=\frac1{64}
$$

とすると

$$
r
=
\frac{\tau}{h^2}
=
\frac{1/64}{1/16}
=
\frac14.
$$

初期値を

$$
f(x)=4x(1-x)
$$

とし、境界条件を

$$
U_0^n=U_4^n=0
$$

とします。

初期格子値は

$$
U^0
=
\left(
0,\frac34,1,\frac34,0
\right).
$$

第一内部点では

$$
\begin{aligned}
U_1^1
&=
\frac34
+
\frac14
\left(
0-2\cdot\frac34+1
\right)\\
&=
\frac34-\frac18\\
&=
\frac58.
\end{aligned}
$$

中央では

$$
\begin{aligned}
U_2^1
&=
1
+
\frac14
\left(
\frac34-2+\frac34
\right)\\
&=
1-\frac18\\
&=
\frac78.
\end{aligned}
$$

対称性から

$$
U_3^1=\frac58.
$$

したがって

$$
\boxed{
U^1
=
\left(
0,\frac58,\frac78,\frac58,0
\right)
}
$$

です。
<!-- definition-example-end -->

---

## 5. 初期条件と境界条件は別の役割を持つ

差分計算を開始するには、時刻 $n=0$ の全空間格子値が必要です。

初期条件から

$$
\boxed{
U_j^0=f(x_j)
\qquad
(j=0,\ldots,J)
}
$$

と置きます。

一方、各時刻で端点値は境界条件から

$$
\boxed{
U_0^n=g_0(t_n),
\qquad
U_J^n=g_L(t_n)
}
$$

と与えます。

### 陽解法では境界値をそのまま参照する

$j=1$ の更新式は

$$
U_1^{n+1}
=
U_1^n
+
r
\left(
U_2^n-2U_1^n+U_0^n
\right).
$$

ここで

$$
U_0^n=g_0(t_n)
$$

は既知です。

同様に $j=J-1$ では

$$
U_J^n=g_L(t_n)
$$

を使います。

つまり陽解法では、時刻 $n$ の境界値を含めて右辺がすべて既知になっています。

---

## 6. 後退 Euler 差分法では新時刻を連立して求める

次は時間微分を、新時刻 $t_{n+1}$ で評価する後退型へ変えます。

$$
\frac{
U_j^{n+1}-U_j^n
}{\tau}
=
\kappa
\frac{
U_{j+1}^{n+1}
-
2U_j^{n+1}
+
U_{j-1}^{n+1}
}{h^2}.
$$

$r=\kappa\tau/h^2$ を使って整理すると

$$
\boxed{
-rU_{j-1}^{n+1}
+
(1+2r)U_j^{n+1}
-
rU_{j+1}^{n+1}
=
U_j^n
}
$$

です。

<a id="def-fdm1-backward-euler"></a>
<!-- formal-statement-start -->
### 定義（後退 Euler 差分法）

一次元熱方程式に対し、内部格子点 $j=1,\ldots,J-1$ で

$$
\boxed{
\frac{
U_j^{n+1}-U_j^n
}{\tau}
=
\kappa
\frac{
U_{j+1}^{n+1}
-
2U_j^{n+1}
+
U_{j-1}^{n+1}
}{h^2}
}
$$

とする方法を **後退 Euler 差分法**という。
<!-- formal-statement-end -->

<!-- definition-example-start: def-fdm1-backward-euler -->
### 例：2内部点なら $2\times2$ 連立方程式になる

内部点が2個、すなわち $J=3$ とします。

斉次境界条件

$$
U_0^{n+1}=U_3^{n+1}=0
$$

かつ $r=1$ なら、

$$
3U_1^{n+1}-U_2^{n+1}=U_1^n,
$$

$$
-U_1^{n+1}+3U_2^{n+1}=U_2^n.
$$

たとえば

$$
(U_1^n,U_2^n)=(1,0)
$$

なら

$$
\begin{pmatrix}
3&-1\\
-1&3
\end{pmatrix}
\begin{pmatrix}
U_1^{n+1}\\
U_2^{n+1}
\end{pmatrix}
=
\begin{pmatrix}
1\\
0
\end{pmatrix}.
$$

第一式から

$$
U_2^{n+1}=3U_1^{n+1}-1.
$$

第二式へ代入すると

$$
-U_1^{n+1}
+
3(3U_1^{n+1}-1)
=
0,
$$

よって

$$
8U_1^{n+1}=3.
$$

したがって

$$
U_1^{n+1}=\frac38,
\qquad
U_2^{n+1}=\frac18.
$$

新時刻の2点を同時に解く必要があることが、陰解法の意味です。
<!-- definition-example-end -->

---

## 7. 非斉次境界条件は右辺へ移す

内部未知ベクトルを

$$
\mathbf U^n
=
\begin{pmatrix}
U_1^n\\
U_2^n\\
\vdots\\
U_{J-1}^n
\end{pmatrix}
\in\mathbb R^{J-1}
$$

とします。

後退 Euler 差分法では

$$
A_r\mathbf U^{n+1}
=
\mathbf U^n
+
\mathbf b^{n+1}
$$

という形になります。

係数行列は

$$
\boxed{
A_r
=
\begin{pmatrix}
1+2r&-r&&0\\
-r&1+2r&\ddots&\\
&\ddots&\ddots&-r\\
0&&-r&1+2r
\end{pmatrix}
}
$$

です。

境界から来るベクトルは

$$
\boxed{
\mathbf b^{n+1}
=
r
\begin{pmatrix}
g_0(t_{n+1})\\
0\\
\vdots\\
0\\
g_L(t_{n+1})
\end{pmatrix}
}
$$

です。

実際、第一内部点の式は

$$
-rU_0^{n+1}
+
(1+2r)U_1^{n+1}
-
rU_2^{n+1}
=
U_1^n.
$$

既知の境界値

$$
U_0^{n+1}=g_0(t_{n+1})
$$

を右辺へ移して

$$
(1+2r)U_1^{n+1}
-
rU_2^{n+1}
=
U_1^n
+
rg_0(t_{n+1})
$$

となります。

最後の内部点でも同じことが起きます。

この「境界未知量ではなく、既知境界データを右辺へ移す」という操作は、有限要素法で境界条件を組み込むときにも再登場します。

---

## 8. 陰解法の連立方程式は毎回きちんと解ける

陰解法は連立方程式を解く必要があります。では、その係数行列は可逆なのでしょうか。

<a id="thm-fdm1-backward-euler-solvability"></a>
<!-- formal-statement-start -->
### 定理（後退 Euler 差分法の各時刻ステップの一意可解性）

$r>0$ とする。

後退 Euler 差分法の内部未知量に対する係数行列

$$
A_r
=
\begin{pmatrix}
1+2r&-r&&0\\
-r&1+2r&\ddots&\\
&\ddots&\ddots&-r\\
0&&-r&1+2r
\end{pmatrix}
\in\mathbb R^{(J-1)\times(J-1)}
$$

は実対称正定値である。

したがって任意の右辺に対して

$$
A_r\mathbf U^{n+1}
=
\mathbf c
$$

は一意解を持つ。
<!-- formal-statement-end -->

### 証明の見取り図

対角 $2$、隣接成分 $-1$ を持つ行列部分の二次形式を、隣接差の平方和へ書き換えます。

すると

$$
\mathbf v^{\mathsf T}A_r\mathbf v
$$

は

- $\|\mathbf v\|_2^2$
- 隣接成分差の平方
- 両端成分の平方

の和になります。非零ベクトルでは最初の項だけでも正なので、正定値性が直ちに従います。

<!-- proof-start -->
### 証明

$m=J-1$ とし、

$$
\mathbf v
=
(v_1,\ldots,v_m)^{\mathsf T}
\ne0
$$

を任意に取ります。

まず

$$
A_r=I+rK
$$

と書きます。ただし

$$
K
=
\begin{pmatrix}
2&-1&&0\\
-1&2&\ddots&\\
&\ddots&\ddots&-1\\
0&&-1&2
\end{pmatrix}.
$$

$K$ の二次形式は

$$
\mathbf v^{\mathsf T}K\mathbf v
=
2\sum_{j=1}^{m}v_j^2
-
2\sum_{j=1}^{m-1}v_jv_{j+1}.
$$

一方、

$$
\sum_{j=1}^{m-1}(v_{j+1}-v_j)^2
=
\sum_{j=1}^{m-1}
\left(
v_{j+1}^2+v_j^2-2v_jv_{j+1}
\right).
$$

ここへ端点項を足すと

$$
v_1^2
+
\sum_{j=1}^{m-1}(v_{j+1}-v_j)^2
+
v_m^2
=
2\sum_{j=1}^{m}v_j^2
-
2\sum_{j=1}^{m-1}v_jv_{j+1}.
$$

従って

$$
\mathbf v^{\mathsf T}K\mathbf v
=
v_1^2
+
\sum_{j=1}^{m-1}(v_{j+1}-v_j)^2
+
v_m^2
\ge0.
$$

よって

$$
\begin{aligned}
\mathbf v^{\mathsf T}A_r\mathbf v
&=
\mathbf v^{\mathsf T}\mathbf v
+
r\mathbf v^{\mathsf T}K\mathbf v\\
&\ge
\|\mathbf v\|_2^2\\
&>0.
\end{aligned}
$$

したがって $A_r$ は実対称正定値です。

実対称正定値行列は可逆なので、任意の右辺に対して一意解を持ちます。

さらに [NA8 の Cholesky 分解](../NA8/index.md#def-na8-cholesky-factorization)を利用できるため、各時刻ステップを構造を保ったまま解けます。
<!-- proof-end -->

この定理が保証しているのは **1ステップを解けること**です。

「何ステップ進めても誤差や摂動が暴走しないか」は別問題です。そこが FDM2 の安定性です。

---

## 9. 空間だけを離散化すると ODE 系になる

差分法にはもう一つ重要な見方があります。

まず空間だけを差分化し、時間は連続のまま残します。

斉次 Dirichlet 境界条件

$$
u(t,0)=u(t,L)=0
$$

を考えます。

内部格子点で

$$
U_j(t)\approx u(t,x_j)
$$

と置き、

$$
\frac{dU_j}{dt}
=
\kappa
\frac{
U_{j+1}-2U_j+U_{j-1}
}{h^2}
$$

とします。

内部ベクトル

$$
\mathbf U(t)
=
(U_1(t),\ldots,U_{J-1}(t))^{\mathsf T}
$$

を使うと

$$
\boxed{
\mathbf U'(t)
=
-\frac{\kappa}{h^2}
K\mathbf U(t)
}
$$

です。

これは PDE を有限次元 ODE 系へ変えたものです。

この操作は、空間だけを離散化して時間を連続のまま残す **空間半離散化**の具体例です。

<a id="prop-fdm1-semidiscrete-euler"></a>
<!-- formal-statement-start -->
### 命題（空間半離散系と Euler 法による二つの差分スキームの対応）

斉次 Dirichlet 境界条件の熱方程式を空間中心差分で半離散化して

$$
\mathbf U'(t)
=
-\frac{\kappa}{h^2}
K\mathbf U(t)
$$

を得たとする。

この ODE 系へ時間刻み $\tau$ の前進 Euler 法を適用すると前進時間・中心空間差分法が得られる。

同じ ODE 系へ [NA7 の後退 Euler 法](../NA7/index.md#def-na7-backward-euler)を適用すると後退 Euler 差分法が得られる。
<!-- formal-statement-end -->

### 証明の見取り図

前進 Euler 法では右辺を時刻 $n$ で評価するため

$$
\mathbf U^{n+1}
=
\mathbf U^n
-
rK\mathbf U^n.
$$

後退 Euler 法では右辺を時刻 $n+1$ で評価するため

$$
\mathbf U^{n+1}
=
\mathbf U^n
-
rK\mathbf U^{n+1}.
$$

成分表示へ戻せば、それぞれ既に導いた二つの差分式そのものです。

<!-- proof-start -->
### 証明

半離散 ODE 系を

$$
\mathbf U'=F(\mathbf U),
\qquad
F(\mathbf U)
=
-\frac{\kappa}{h^2}K\mathbf U
$$

と書きます。

前進 Euler 法では

$$
\mathbf U^{n+1}
=
\mathbf U^n
+
\tau F(\mathbf U^n).
$$

従って

$$
\mathbf U^{n+1}
=
\mathbf U^n
-
\frac{\kappa\tau}{h^2}
K\mathbf U^n
=
(I-rK)\mathbf U^n.
$$

第 $j$ 成分は

$$
U_j^{n+1}
=
U_j^n
+
r
\left(
U_{j+1}^n
-
2U_j^n
+
U_{j-1}^n
\right),
$$

すなわち前進時間・中心空間差分法です。

次に後退 Euler 法では

$$
\mathbf U^{n+1}
=
\mathbf U^n
+
\tau F(\mathbf U^{n+1}).
$$

従って

$$
\mathbf U^{n+1}
=
\mathbf U^n
-
rK\mathbf U^{n+1}.
$$

よって

$$
(I+rK)\mathbf U^{n+1}
=
\mathbf U^n.
$$

第 $j$ 成分へ戻すと

$$
-rU_{j-1}^{n+1}
+
(1+2r)U_j^{n+1}
-
rU_{j+1}^{n+1}
=
U_j^n,
$$

すなわち後退 Euler 差分法です。
<!-- proof-end -->

この対応は、FDM が ODE 数値解法と別世界の技法ではないことを示します。

~~~text
PDE
  ↓ 空間だけ離散化
大規模 ODE 系
  ↓ 時間積分法
全離散差分法
~~~

という見方を持つと、後続の有限要素法でも同じ構造が見えやすくなります。

---

## 10. ここまでで何が分かり、何がまだ分からないか

前進時間・中心空間差分法は

$$
\mathbf U^{n+1}
=
(I-rK)\mathbf U^n
$$

という陽的更新です。

後退 Euler 差分法は

$$
(I+rK)\mathbf U^{n+1}
=
\mathbf U^n
$$

という陰的更新です。

後者は $I+rK$ が正定値なので、任意の $r>0$ で1ステップの連立方程式が一意に解けます。

しかし、ここから

> 「任意の $r$ で数値解が安定である」

とはまだ言えません。

一意可解性は「次の値が定まるか」の問題です。

安定性は「初期誤差・丸め誤差・局所誤差が反復でどれだけ増幅されるか」の問題です。

この二つを混同しないことが、差分法の最初の重要な分岐です。

FDM2 では

- 前進時間・中心空間差分法に現れる刻み幅制約
- Fourier モードごとの増幅率
- 後退 Euler 差分法との違い
- theta 法

へ進みます。

---

# 演習

## 11. Level A

### FDM1-A01 格子と差分演算を直接計算する

- Level: A
- 目安時間: 10分

$L=1$, $T=1$, $J=4$, $N=10$ とする。

格子関数を

$$
U_j^n=x_j^2+t_n
$$

で定める。

1. $h,\tau,x_2,t_3$ を求めよ。
2. $\delta_t^+U_2^3$ を求めよ。
3. $\delta_{xx}U_2^3$ を求めよ。
4. 連続関数 $u(t,x)=x^2+t$ の $u_t,u_{xx}$ と比較せよ。

<!-- solution-start -->
#### 詳細解答

空間刻みは

$$
h=\frac{L}{J}
=
\frac14.
$$

時間刻みは

$$
\tau=\frac{T}{N}
=
\frac1{10}.
$$

したがって

$$
x_2=2h=\frac12,
\qquad
t_3=3\tau=\frac3{10}.
$$

次に

$$
U_2^3
=
x_2^2+t_3,
$$

$$
U_2^4
=
x_2^2+t_4.
$$

よって

$$
\begin{aligned}
\delta_t^+U_2^3
&=
\frac{U_2^4-U_2^3}{\tau}\\
&=
\frac{t_4-t_3}{\tau}\\
&=
\frac{\tau}{\tau}\\
&=
\boxed{1}.
\end{aligned}
$$

空間差分について、時刻項 $t_3$ は

$$
t_3-2t_3+t_3=0
$$

と消えます。

したがって

$$
\begin{aligned}
\delta_{xx}U_2^3
&=
\frac{
x_3^2-2x_2^2+x_1^2
}{h^2}.
\end{aligned}
$$

$x_1=x_2-h$, $x_3=x_2+h$ なので

$$
x_3^2-2x_2^2+x_1^2
=
2h^2.
$$

従って

$$
\boxed{
\delta_{xx}U_2^3=2
}.
$$

一方、

$$
u(t,x)=x^2+t
$$

なら

$$
u_t=1,
\qquad
u_{xx}=2.
$$

よってこの関数では、前進時間差分と中心二階空間差分がそれぞれ対応する微分を厳密に再現しています。
<!-- solution-end -->

### FDM1-A02 前進時間・中心空間差分法を1ステップ実行する

- Level: A
- 目安時間: 12分

$$
L=1,
\qquad
\kappa=1,
\qquad
J=4,
\qquad
\tau=\frac1{64}
$$

とする。

境界条件は斉次 Dirichlet 条件

$$
U_0^n=U_4^n=0
$$

とし、初期値を

$$
f(x)=4x(1-x)
$$

とする。

1. $h$ と $r$ を求めよ。
2. $\mathbf U^0$ を求めよ。
3. 前進時間・中心空間差分法で $\mathbf U^1$ を求めよ。

<!-- solution-start -->
#### 詳細解答

$$
h=\frac{1}{4}.
$$

したがって

$$
h^2=\frac1{16}.
$$

よって

$$
r
=
\frac{\kappa\tau}{h^2}
=
\frac{1/64}{1/16}
=
\boxed{\frac14}.
$$

初期値は

$$
U_j^0=f(x_j)=4x_j(1-x_j).
$$

各点で

$$
U_0^0=0,
$$

$$
U_1^0
=
4\cdot\frac14\cdot\frac34
=
\frac34,
$$

$$
U_2^0
=
4\cdot\frac12\cdot\frac12
=
1,
$$

$$
U_3^0=\frac34,
\qquad
U_4^0=0.
$$

従って

$$
\mathbf U^0
=
\left(
0,\frac34,1,\frac34,0
\right).
$$

更新式は

$$
U_j^1
=
U_j^0
+
\frac14
\left(
U_{j+1}^0
-
2U_j^0
+
U_{j-1}^0
\right).
$$

$j=1$ では

$$
U_1^1
=
\frac34
+
\frac14
\left(
1-\frac32
\right)
=
\frac58.
$$

$j=2$ では

$$
U_2^1
=
1
+
\frac14
\left(
\frac34-2+\frac34
\right)
=
\frac78.
$$

$j=3$ は対称性から

$$
U_3^1=\frac58.
$$

境界は0なので

$$
\boxed{
\mathbf U^1
=
\left(
0,\frac58,\frac78,\frac58,0
\right)
}.
$$
<!-- solution-end -->

### FDM1-A03 非斉次境界条件を陰解法の右辺へ組み込む

- Level: A
- 目安時間: 12分

$J=4$、$r=1/2$ とする。

時刻 $n$ の内部値を

$$
(U_1^n,U_2^n,U_3^n)=(1,2,3)
$$

とし、新時刻の境界値を

$$
g_0(t_{n+1})=2,
\qquad
g_L(t_{n+1})=1
$$

とする。

後退 Euler 差分法の

$$
A_r\mathbf U^{n+1}
=
\mathbf c
$$

を具体的に書け。

<!-- solution-start -->
#### 詳細解答

$r=1/2$ なので

$$
1+2r=2.
$$

係数行列は

$$
A_r
=
\begin{pmatrix}
2&-1/2&0\\
-1/2&2&-1/2\\
0&-1/2&2
\end{pmatrix}.
$$

右辺の基礎部分は

$$
\mathbf U^n
=
\begin{pmatrix}
1\\2\\3
\end{pmatrix}.
$$

左境界から第一成分へ

$$
r g_0(t_{n+1})
=
\frac12\cdot2
=
1
$$

が加わります。

右境界から第三成分へ

$$
r g_L(t_{n+1})
=
\frac12\cdot1
=
\frac12
$$

が加わります。

したがって

$$
\mathbf c
=
\begin{pmatrix}
1+1\\
2\\
3+1/2
\end{pmatrix}
=
\begin{pmatrix}
2\\
2\\
7/2
\end{pmatrix}.
$$

よって求める連立方程式は

$$
\boxed{
\begin{pmatrix}
2&-1/2&0\\
-1/2&2&-1/2\\
0&-1/2&2
\end{pmatrix}
\begin{pmatrix}
U_1^{n+1}\\
U_2^{n+1}\\
U_3^{n+1}
\end{pmatrix}
=
\begin{pmatrix}
2\\
2\\
7/2
\end{pmatrix}
}.
$$

境界値そのものは未知ベクトルへ入れず、既知データとして右辺へ移すのが要点です。
<!-- solution-end -->

### FDM1-A04 2内部点の後退 Euler ステップを解く

- Level: A
- 目安時間: 12分

斉次 Dirichlet 境界条件、内部点2個、$r=1$ とする。

$$
(U_1^n,U_2^n)=(1,0)
$$

から後退 Euler 差分法を1ステップ実行せよ。

<!-- solution-start -->
#### 詳細解答

内部点2個なので係数行列は

$$
A
=
\begin{pmatrix}
1+2r&-r\\
-r&1+2r
\end{pmatrix}.
$$

$r=1$ を代入すると

$$
A
=
\begin{pmatrix}
3&-1\\
-1&3
\end{pmatrix}.
$$

斉次境界条件なので右辺への境界寄与はありません。

したがって

$$
\begin{pmatrix}
3&-1\\
-1&3
\end{pmatrix}
\begin{pmatrix}
U_1^{n+1}\\
U_2^{n+1}
\end{pmatrix}
=
\begin{pmatrix}
1\\
0
\end{pmatrix}.
$$

連立方程式は

$$
3U_1^{n+1}-U_2^{n+1}=1,
$$

$$
-U_1^{n+1}+3U_2^{n+1}=0.
$$

第二式から

$$
U_1^{n+1}=3U_2^{n+1}.
$$

第一式へ代入して

$$
9U_2^{n+1}-U_2^{n+1}=1.
$$

よって

$$
U_2^{n+1}=\frac18,
$$

$$
U_1^{n+1}=\frac38.
$$

したがって

$$
\boxed{
(U_1^{n+1},U_2^{n+1})
=
\left(
\frac38,\frac18
\right)
}.
$$
<!-- solution-end -->

---

## 12. Level B

### FDM1-B01 二つの差分スキームを熱方程式から自力で導く

- Level: B
- 目安時間: 20分

熱方程式

$$
u_t=\kappa u_{xx}
$$

に対して、$r=\kappa\tau/h^2$ とする。

1. $u_t(t_n,x_j)$ を前進時間差分、$u_{xx}(t_n,x_j)$ を中心二階空間差分で置き換え、前進時間・中心空間差分法を導け。
2. $u_t(t_{n+1},x_j)$ を後退型の時間差分、$u_{xx}(t_{n+1},x_j)$ を新時刻の中心二階空間差分で置き換え、後退 Euler 差分法を導け。
3. どちらが陽解法でどちらが陰解法か、未知量の現れ方から説明せよ。

<!-- solution-start -->
#### 詳細解答

まず時刻 $t_n$ の熱方程式を

$$
u_t(t_n,x_j)
=
\kappa u_{xx}(t_n,x_j)
$$

と見ます。

時間微分を

$$
u_t(t_n,x_j)
\approx
\frac{
U_j^{n+1}-U_j^n
}{\tau}
$$

で置き換えます。

空間二階微分を

$$
u_{xx}(t_n,x_j)
\approx
\frac{
U_{j+1}^n
-
2U_j^n
+
U_{j-1}^n
}{h^2}
$$

で置き換えます。

したがって

$$
\frac{
U_j^{n+1}-U_j^n
}{\tau}
=
\kappa
\frac{
U_{j+1}^n
-
2U_j^n
+
U_{j-1}^n
}{h^2}.
$$

両辺へ $\tau$ を掛けると

$$
U_j^{n+1}
-
U_j^n
=
r
\left(
U_{j+1}^n
-
2U_j^n
+
U_{j-1}^n
\right).
$$

従って

$$
\boxed{
U_j^{n+1}
=
rU_{j-1}^n
+
(1-2r)U_j^n
+
rU_{j+1}^n
}.
$$

右辺はすべて時刻 $n$ の既知量なので陽解法です。

次に時刻 $t_{n+1}$ を基準にします。

時間微分を

$$
u_t(t_{n+1},x_j)
\approx
\frac{
U_j^{n+1}-U_j^n
}{\tau}
$$

とし、空間二階微分を新時刻で

$$
u_{xx}(t_{n+1},x_j)
\approx
\frac{
U_{j+1}^{n+1}
-
2U_j^{n+1}
+
U_{j-1}^{n+1}
}{h^2}
$$

と置きます。

すると

$$
\frac{
U_j^{n+1}-U_j^n
}{\tau}
=
\kappa
\frac{
U_{j+1}^{n+1}
-
2U_j^{n+1}
+
U_{j-1}^{n+1}
}{h^2}.
$$

整理すると

$$
U_j^{n+1}
-
rU_{j+1}^{n+1}
+
2rU_j^{n+1}
-
rU_{j-1}^{n+1}
=
U_j^n.
$$

よって

$$
\boxed{
-rU_{j-1}^{n+1}
+
(1+2r)U_j^{n+1}
-
rU_{j+1}^{n+1}
=
U_j^n
}.
$$

ここでは $U_{j-1}^{n+1},U_j^{n+1},U_{j+1}^{n+1}$ が同時に未知なので、空間全体で連立方程式を解く必要があります。したがって陰解法です。
<!-- solution-end -->

### FDM1-B02 後退 Euler 行列の正定値性を平方和から証明する

- Level: B
- 目安時間: 25分

$m\ge1$ とし、

$$
K
=
\begin{pmatrix}
2&-1&&0\\
-1&2&\ddots&\\
&\ddots&\ddots&-1\\
0&&-1&2
\end{pmatrix}
\in\mathbb R^{m\times m}.
$$

1. 任意の $\mathbf v=(v_1,\ldots,v_m)^{\mathsf T}$ に対して
   $$
   \mathbf v^{\mathsf T}K\mathbf v
   =
   v_1^2
   +
   \sum_{j=1}^{m-1}(v_{j+1}-v_j)^2
   +
   v_m^2
   $$
   を示せ。
2. $r>0$ とし $A_r=I+rK$ とする。$A_r$ が正定値であることを示せ。
3. なぜこれで後退 Euler 差分法の各ステップが一意に解けると言えるか。

<!-- solution-start -->
#### 詳細解答

行列積を展開すると

$$
\mathbf v^{\mathsf T}K\mathbf v
=
2\sum_{j=1}^{m}v_j^2
-
2\sum_{j=1}^{m-1}v_jv_{j+1}.
$$

一方、

$$
\sum_{j=1}^{m-1}(v_{j+1}-v_j)^2
=
\sum_{j=1}^{m-1}
\left(
v_{j+1}^2
+
v_j^2
-
2v_jv_{j+1}
\right).
$$

この和では内部成分 $v_2^2,\ldots,v_{m-1}^2$ は2回、端成分 $v_1^2,v_m^2$ は1回だけ現れます。

そこでさらに端成分を1回ずつ足すと

$$
v_1^2
+
\sum_{j=1}^{m-1}(v_{j+1}-v_j)^2
+
v_m^2
=
2\sum_{j=1}^{m}v_j^2
-
2\sum_{j=1}^{m-1}v_jv_{j+1}.
$$

したがって

$$
\boxed{
\mathbf v^{\mathsf T}K\mathbf v
=
v_1^2
+
\sum_{j=1}^{m-1}(v_{j+1}-v_j)^2
+
v_m^2
}.
$$

右辺は平方の和なので

$$
\mathbf v^{\mathsf T}K\mathbf v\ge0.
$$

次に

$$
A_r=I+rK
$$

より

$$
\mathbf v^{\mathsf T}A_r\mathbf v
=
\|\mathbf v\|_2^2
+
r\mathbf v^{\mathsf T}K\mathbf v.
$$

$\mathbf v\ne0$ なら

$$
\|\mathbf v\|_2^2>0
$$

であり、第二項は非負です。

従って

$$
\boxed{
\mathbf v^{\mathsf T}A_r\mathbf v>0
\qquad
(\mathbf v\ne0)
}.
$$

よって $A_r$ は実対称正定値です。

正定値行列は核に非零ベクトルを持ちません。

もし

$$
A_r\mathbf v=0
$$

なら

$$
0
=
\mathbf v^{\mathsf T}A_r\mathbf v
$$

ですが、正定値性からこれは $\mathbf v=0$ のときしか起きません。

従って $A_r$ は可逆で、任意の右辺に対して線形方程式

$$
A_r\mathbf U^{n+1}=\mathbf c
$$

は一意解を持ちます。

したがって後退 Euler 差分法は各時刻ステップで一意に次の内部格子値を決められます。
<!-- solution-end -->

### FDM1-B03 空間半離散化から二つの時間積分法を復元する

- Level: B
- 目安時間: 25分

非斉次 Dirichlet 条件

$$
u(t,0)=g_0(t),
\qquad
u(t,L)=g_L(t)
$$

を持つ熱方程式を考える。

内部ベクトルを

$$
\mathbf U(t)
=
(U_1(t),\ldots,U_{J-1}(t))^{\mathsf T}
$$

とする。

1. 空間中心差分から
   $$
   \mathbf U'(t)
   =
   -\frac{\kappa}{h^2}K\mathbf U(t)
   +
   \frac{\kappa}{h^2}
   \begin{pmatrix}
   g_0(t)\\
   0\\
   \vdots\\
   0\\
   g_L(t)
   \end{pmatrix}
   $$
   を導け。
2. この ODE 系へ前進 Euler 法を適用し、境界値が時刻 $t_n$ で入ることを示せ。
3. 後退 Euler 法を適用し、境界値が時刻 $t_{n+1}$ で入ることを示せ。

<!-- solution-start -->
#### 詳細解答

内部点 $j$ では

$$
\frac{dU_j}{dt}
=
\kappa
\frac{
U_{j+1}
-
2U_j
+
U_{j-1}
}{h^2}.
$$

内部点だけを未知ベクトルへ入れると、隣接内部点から来る部分は

$$
-\frac{\kappa}{h^2}K\mathbf U(t)
$$

です。

第一内部点 $j=1$ では左隣が境界値

$$
U_0(t)=g_0(t)
$$

なので、右辺に

$$
\frac{\kappa}{h^2}g_0(t)
$$

が加わります。

最後の内部点 $j=J-1$ では右隣が

$$
U_J(t)=g_L(t)
$$

なので、最後の成分に

$$
\frac{\kappa}{h^2}g_L(t)
$$

が加わります。

従って

$$
\boxed{
\mathbf U'(t)
=
-\frac{\kappa}{h^2}K\mathbf U(t)
+
\frac{\kappa}{h^2}
\begin{pmatrix}
g_0(t)\\
0\\
\vdots\\
0\\
g_L(t)
\end{pmatrix}
}.
$$

この右辺を $F(t,\mathbf U)$ と書きます。

前進 Euler 法は

$$
\mathbf U^{n+1}
=
\mathbf U^n
+
\tau F(t_n,\mathbf U^n).
$$

したがって

$$
\mathbf U^{n+1}
=
(I-rK)\mathbf U^n
+
r
\begin{pmatrix}
g_0(t_n)\\
0\\
\vdots\\
0\\
g_L(t_n)
\end{pmatrix}.
$$

境界値は右辺を時刻 $t_n$ で評価するため、$g_0(t_n),g_L(t_n)$ が入ります。

成分表示では前進時間・中心空間差分法そのものです。

次に後退 Euler 法は

$$
\mathbf U^{n+1}
=
\mathbf U^n
+
\tau F(t_{n+1},\mathbf U^{n+1}).
$$

従って

$$
\mathbf U^{n+1}
=
\mathbf U^n
-
rK\mathbf U^{n+1}
+
r
\begin{pmatrix}
g_0(t_{n+1})\\
0\\
\vdots\\
0\\
g_L(t_{n+1})
\end{pmatrix}.
$$

未知量を左辺へ移せば

$$
\boxed{
(I+rK)\mathbf U^{n+1}
=
\mathbf U^n
+
r
\begin{pmatrix}
g_0(t_{n+1})\\
0\\
\vdots\\
0\\
g_L(t_{n+1})
\end{pmatrix}
}.
$$

後退 Euler 法では右辺を新時刻で評価するので、境界データも $t_{n+1}$ の値が入ります。
<!-- solution-end -->

---

## 13. Level C

### FDM1-C01 初期境界値問題から陽解法・陰解法を組み立てて比較する

- Level: C
- 目安時間: 40分

$$
u_t=u_{xx},
\qquad
0<x<1
$$

を考える。

境界条件を

$$
u(t,0)=1,
\qquad
u(t,1)=0
$$

とし、初期条件を

$$
u(0,x)
=
1-x+x(1-x)
$$

とする。

空間分割数を $J=4$、時間刻みを

$$
\tau=\frac1{64}
$$

とする。

1. $h,r$ と初期格子値 $\mathbf U^0$ を求めよ。
2. 前進時間・中心空間差分法で1ステップ進め、内部値 $(U_1^1,U_2^1,U_3^1)$ を求めよ。
3. 後退 Euler 差分法の $3\times3$ 連立方程式を組み立てよ。
4. その連立方程式を解き、内部値 $(U_1^1,U_2^1,U_3^1)$ を求めよ。
5. 二つの方法の計算構造の違いを説明し、「陰解法の係数行列が正定値だから安定性まで証明できた」と言ってはいけない理由を説明せよ。

<!-- solution-start -->
#### 詳細解答

### 1. 格子と初期値

$J=4$ なので

$$
h=\frac14.
$$

したがって

$$
h^2=\frac1{16}.
$$

$\kappa=1$ だから

$$
r
=
\frac{\tau}{h^2}
=
\frac{1/64}{1/16}
=
\boxed{\frac14}.
$$

初期関数は

$$
f(x)
=
1-x+x(1-x).
$$

端点では

$$
f(0)=1,
\qquad
f(1)=0,
$$

なので境界条件との整合条件も満たしています。

内部点で計算します。

$x_1=1/4$ では

$$
\begin{aligned}
f(1/4)
&=
1-\frac14
+
\frac14\cdot\frac34\\
&=
\frac34+\frac3{16}\\
&=
\frac{15}{16}.
\end{aligned}
$$

$x_2=1/2$ では

$$
f(1/2)
=
\frac12+\frac14
=
\frac34.
$$

$x_3=3/4$ では

$$
f(3/4)
=
\frac14+\frac3{16}
=
\frac7{16}.
$$

したがって全格子値は

$$
\boxed{
\mathbf U^0
=
\left(
1,\frac{15}{16},\frac34,\frac7{16},0
\right)
}.
$$

### 2. 前進時間・中心空間差分法

更新式は

$$
U_j^1
=
U_j^0
+
\frac14
\left(
U_{j+1}^0
-
2U_j^0
+
U_{j-1}^0
\right).
$$

$j=1$ では

$$
\begin{aligned}
U_1^1
&=
\frac{15}{16}
+
\frac14
\left(
\frac34
-
2\cdot\frac{15}{16}
+
1
\right)\\
&=
\frac{15}{16}
+
\frac14
\left(
\frac{12-30+16}{16}
\right)\\
&=
\frac{15}{16}
-
\frac1{32}\\
&=
\boxed{\frac{29}{32}}.
\end{aligned}
$$

$j=2$ では

$$
\begin{aligned}
U_2^1
&=
\frac34
+
\frac14
\left(
\frac7{16}
-
2\cdot\frac34
+
\frac{15}{16}
\right)\\
&=
\frac34
+
\frac14
\left(
\frac{7-24+15}{16}
\right)\\
&=
\frac34-\frac1{32}\\
&=
\boxed{\frac{23}{32}}.
\end{aligned}
$$

$j=3$ では

$$
\begin{aligned}
U_3^1
&=
\frac7{16}
+
\frac14
\left(
0
-
2\cdot\frac7{16}
+
\frac34
\right)\\
&=
\frac7{16}
+
\frac14
\left(
-\frac2{16}
\right)\\
&=
\frac7{16}-\frac1{32}\\
&=
\boxed{\frac{13}{32}}.
\end{aligned}
$$

従って内部ベクトルは

$$
\boxed{
(U_1^1,U_2^1,U_3^1)
=
\left(
\frac{29}{32},
\frac{23}{32},
\frac{13}{32}
\right)
}.
$$

### 3. 後退 Euler 差分法の連立方程式

$r=1/4$ なので

$$
1+2r
=
1+\frac12
=
\frac32.
$$

係数行列は

$$
A
=
\begin{pmatrix}
3/2&-1/4&0\\
-1/4&3/2&-1/4\\
0&-1/4&3/2
\end{pmatrix}.
$$

新時刻でも境界値は

$$
g_0(t_1)=1,
\qquad
g_L(t_1)=0.
$$

したがって右辺は

$$
\begin{pmatrix}
U_1^0+r g_0(t_1)\\
U_2^0\\
U_3^0+r g_L(t_1)
\end{pmatrix}
=
\begin{pmatrix}
15/16+1/4\\
3/4\\
7/16
\end{pmatrix}
=
\begin{pmatrix}
19/16\\
3/4\\
7/16
\end{pmatrix}.
$$

よって

$$
\boxed{
\begin{pmatrix}
3/2&-1/4&0\\
-1/4&3/2&-1/4\\
0&-1/4&3/2
\end{pmatrix}
\begin{pmatrix}
U_1^1\\
U_2^1\\
U_3^1
\end{pmatrix}
=
\begin{pmatrix}
19/16\\
3/4\\
7/16
\end{pmatrix}
}.
$$

### 4. 連立方程式を解く

分母を払うため両辺を16倍すると

$$
\begin{pmatrix}
24&-4&0\\
-4&24&-4\\
0&-4&24
\end{pmatrix}
\begin{pmatrix}
U_1^1\\
U_2^1\\
U_3^1
\end{pmatrix}
=
\begin{pmatrix}
19\\
12\\
7
\end{pmatrix}.
$$

さらに4で割ると

$$
\begin{cases}
6U_1^1-U_2^1=19/4,\\
-U_1^1+6U_2^1-U_3^1=3,\\
-U_2^1+6U_3^1=7/4.
\end{cases}
$$

第一式から

$$
U_2^1
=
6U_1^1-\frac{19}{4}.
$$

第三式から

$$
U_2^1
=
6U_3^1-\frac74.
$$

従って

$$
6U_1^1-\frac{19}{4}
=
6U_3^1-\frac74,
$$

よって

$$
U_1^1-U_3^1=\frac12.
$$

すなわち

$$
U_1^1=U_3^1+\frac12.
$$

第二式へ

$$
U_2^1=6U_3^1-\frac74
$$

と

$$
U_1^1=U_3^1+\frac12
$$

を代入すると

$$
-\left(U_3^1+\frac12\right)
+
6\left(6U_3^1-\frac74\right)
-
U_3^1
=
3.
$$

左辺をまとめて

$$
34U_3^1-11=3.
$$

したがって

$$
34U_3^1=14,
$$

$$
U_3^1=\frac7{17}.
$$

よって

$$
U_1^1
=
\frac7{17}+\frac12
=
\frac{31}{34}.
$$

また

$$
U_2^1
=
6\cdot\frac7{17}
-
\frac74
=
\frac{42}{17}-\frac74.
$$

通分すると

$$
U_2^1
=
\frac{168-119}{68}
=
\frac{49}{68}.
$$

従って

$$
\boxed{
(U_1^1,U_2^1,U_3^1)
=
\left(
\frac{31}{34},
\frac{49}{68},
\frac7{17}
\right)
}.
$$

### 5. 計算構造と安定性の区別

前進時間・中心空間差分法では

$$
U_j^{n+1}
=
rU_{j-1}^n
+
(1-2r)U_j^n
+
rU_{j+1}^n
$$

なので、時刻 $n$ の値から各内部点を直接計算できます。

一方、後退 Euler 差分法では新時刻の隣接値が同時に現れるため、

$$
A_r\mathbf U^{n+1}
=
\mathbf c
$$

という連立方程式を毎ステップ解く必要があります。

本章の定理により $A_r$ は実対称正定値なので、この連立方程式は一意に解けます。

しかしこれは **各ステップの可解性**です。

安定性では、初期値や各ステップに小さな摂動が入ったとき、その差が反復によってどの程度増幅されるかを調べなければなりません。

行列が可逆で次の値が一意に定まることだけでは、長時間反復で摂動が増幅されないことは示せません。

したがって

> 係数行列が正定値である  
> したがって陰解法は一意に解ける

までは FDM1 の結論ですが、

> したがって安定である

という推論には追加の解析が必要です。その追加部分が FDM2 の主題です。
<!-- solution-end -->

---

## 14. この章の要点

1. 連続解 $u(t,x)$ を有限個の値
   $$
   U_j^n\approx u(t_n,x_j)
   $$
   で置き換える。
2. 時空間格子は
   $$
   x_j=jh,
   \qquad
   t_n=n\tau
   $$
   で作る。
3. 前進時間差分は
   $$
   \frac{U_j^{n+1}-U_j^n}{\tau},
   $$
   中心二階空間差分は
   $$
   \frac{U_{j+1}^n-2U_j^n+U_{j-1}^n}{h^2}
   $$
   である。
4. 前進時間・中心空間差分法は
   $$
   U_j^{n+1}
   =
   rU_{j-1}^n
   +
   (1-2r)U_j^n
   +
   rU_{j+1}^n
   $$
   という陽解法である。
5. 後退 Euler 差分法は
   $$
   -rU_{j-1}^{n+1}
   +
   (1+2r)U_j^{n+1}
   -
   rU_{j+1}^{n+1}
   =
   U_j^n
   $$
   という陰解法である。
6. 非斉次 Dirichlet 境界値は、内部未知ベクトルへ含めず既知項として右辺へ移す。
7. 後退 Euler 差分法の係数行列 $I+rK$ は実対称正定値なので、各時刻ステップは一意に解ける。
8. 空間半離散化した熱方程式へ前進 Euler 法・後退 Euler 法を適用すると、それぞれ二つの差分スキームが得られる。
9. 各ステップが一意に解けることと、反復全体が安定であることは別問題である。
10. 次の FDM2 では、刻み幅比 $r=\kappa\tau/h^2$ が安定性へどう現れるかを解析する。

次は FDM2「差分スキームの安定性」です。
