# FDM3 差分法 III：整合性・安定性・収束性

FDM1 では熱方程式を格子へ落とし、FDM2 ではその差分時間発展が摂動を増幅するかどうかを調べました。

この章では、局所的な近似誤差と大域的な数値誤差を結びます。

中心にある論理は

~~~text
厳密な PDE
  ↓ 格子へ制限
差分方程式へ代入した残差
  ↓ 整合性
残差が格子細分化で0へ行く
  ＋
差分時間発展が誤差を増幅しすぎない
  ↓ 安定性
大域誤差が0へ行く
  ↓
収束
~~~

です。

直接の前提は、[FDM2 の差分時間発展の安定性](../FDM2/index.md#def-fdm2-contractivity)と、[NA6 の局所打切り誤差・整合性・大域誤差](../NA6/index.md#def-na6-local-error)です。

> **この章の停止線**  
> 本章では一次元熱方程式に対し、FTCS と後退 Euler 差分法を使って「整合性＋安定性→収束」を具体的に証明します。移流項が入ったとき中心差分が非物理振動を起こす機構、風上差分、数値拡散、Péclet 数は FDM4 で扱います。

---

## 0. 局所的に正しいだけでは足りない

差分式を厳密解へ代入し、残差が小さければ「元の PDE をよく近似している」ように見えます。

しかし、各ステップで生じた小さな誤差が後の時間発展で何倍にも増幅されるなら、最終時刻の誤差は小さくなりません。

したがって二つの問いを分けます。

1. **整合性**：厳密解を差分式へ代入したとき、残差は格子細分化で0へ行くか。
2. **安定性**：すでに存在する誤差・摂動を、差分時間発展が有限時間内でどれだけ増幅するか。

そして最後に

3. **収束性**：数値解そのものが厳密解の格子点値へ近づくか。

を調べます。

NA6 で一段法について行った議論を、今度は空間格子を持つベクトル値の時間発展へ移します。

---

## 1. 厳密解を格子へ制限して差分残差を測る

一次元熱方程式

$$
u_t=\kappa u_{xx},
\qquad
0<x<L,
\qquad
0<t\le T,
\qquad
\kappa>0
$$

を考えます。

FDM1 と同じ格子

$$
x_j=jh,
\qquad
t_n=n\tau
$$

を使い、厳密解の格子点値を

$$
Y_j^n
=
u(t_n,x_j)
$$

と書きます。

<a id="def-fdm3-local-residual"></a>
<!-- formal-statement-start -->
### 定義（差分スキームの局所残差）

熱方程式の差分スキームへ、数値解ではなく厳密解の格子点値

$$
Y_j^n=u(t_n,x_j)
$$

を代入したときに残る、単位時間あたりの欠陥を **差分スキームの局所残差**という。

FTCS では

$$
\boxed{
\rho_j^n
=
\frac{Y_j^{n+1}-Y_j^n}{\tau}
-
\kappa
\frac{
Y_{j+1}^n-2Y_j^n+Y_{j-1}^n
}{h^2}
}
$$

と定める。

後退 Euler 差分法では

$$
\boxed{
\widetilde\rho_j^{n+1}
=
\frac{Y_j^{n+1}-Y_j^n}{\tau}
-
\kappa
\frac{
Y_{j+1}^{n+1}-2Y_j^{n+1}+Y_{j-1}^{n+1}
}{h^2}
}
$$

と定める。
<!-- formal-statement-end -->

これは [NA6 の局所打切り誤差](../NA6/index.md#def-na6-local-error)の時空間格子版です。

FTCS の定義を書き換えると

$$
\boxed{
Y_j^{n+1}
=
Y_j^n
+
r
\left(
Y_{j+1}^n-2Y_j^n+Y_{j-1}^n
\right)
+
\tau\rho_j^n
}
$$

です。

ここで

$$
r=\frac{\kappa\tau}{h^2}.
$$

つまり、差分スキーム自身は最後の $\tau\rho_j^n$ を捨てています。

<!-- definition-example-start: def-fdm3-local-residual -->
### 例：二次関数では FTCS の残差が厳密に0になる

**定義の確認**。関数

$$
u(t,x)=x^2+2\kappa t
$$

を考えます。

$$
u_t=2\kappa,
\qquad
u_{xx}=2
$$

なので

$$
u_t=\kappa u_{xx}
$$

を厳密に満たします。

時間差分は

$$
\frac{
u(t_{n+1},x_j)-u(t_n,x_j)
}{\tau}
=
\frac{2\kappa\tau}{\tau}
=
2\kappa.
$$

空間中心二階差分は

$$
\frac{
(x_j+h)^2-2x_j^2+(x_j-h)^2
}{h^2}
=
2.
$$

したがって

$$
\rho_j^n
=
2\kappa-\kappa\cdot2
=
\boxed{0}.
$$

時間について一次、空間について二次の多項式なので、FTCS が使う二つの差分がどちらも厳密になっています。
<!-- definition-example-end -->

---

## 2. FTCS の局所残差は $O(\tau+h^2)$

局所残差がどの程度小さいかを Taylor 展開で評価します。

<a id="prop-fdm3-ftcs-residual"></a>
<!-- formal-statement-start -->
### 命題（FTCS の局所残差評価）

熱方程式の古典解 $u$ が

$$
u_{tt},
\qquad
u_{xxxx}
$$

を持ち、閉領域

$$
[0,T]\times[0,L]
$$

上でこれらが連続であるとする。

$$
M_{tt}
=
\max_{[0,T]\times[0,L]}
|u_{tt}|,
$$

$$
M_{xxxx}
=
\max_{[0,T]\times[0,L]}
|u_{xxxx}|
$$

と置く。

FTCS の局所残差は、すべての内部格子点で

$$
\boxed{
|\rho_j^n|
\le
\frac{\tau}{2}M_{tt}
+
\frac{\kappa h^2}{12}M_{xxxx}
}
$$

を満たす。

したがって

$$
\max_{n,j}|\rho_j^n|
\longrightarrow0
\qquad
(\tau,h\to0)
$$

であり、FTCS は滑らかな熱方程式解に対して

$$
O(\tau+h^2)
$$

で整合的である。
<!-- formal-statement-end -->

### 証明の見取り図

時間前進差分は

$$
u_t+O(\tau),
$$

空間中心二階差分は

$$
u_{xx}+O(h^2)
$$

です。

熱方程式

$$
u_t-\kappa u_{xx}=0
$$

により主項が消え、二つの Taylor 余項だけが残ります。

<!-- proof-start -->
### 証明

時間方向に Taylor の定理を使います。

ある

$$
\xi_{n,j}\in(t_n,t_{n+1})
$$

が存在して

$$
Y_j^{n+1}
=
Y_j^n
+
\tau u_t(t_n,x_j)
+
\frac{\tau^2}{2}
u_{tt}(\xi_{n,j},x_j).
$$

したがって

$$
\frac{Y_j^{n+1}-Y_j^n}{\tau}
=
u_t(t_n,x_j)
+
\frac{\tau}{2}
u_{tt}(\xi_{n,j},x_j).
$$

次に空間方向へ中心二階差分を使います。

Taylor 展開の左右の余項を合わせると

$$
\frac{
Y_{j+1}^n-2Y_j^n+Y_{j-1}^n
}{h^2}
=
u_{xx}(t_n,x_j)
+
R_{x,j}^n
$$

であり、

$$
|R_{x,j}^n|
\le
\frac{h^2}{12}M_{xxxx}.
$$

よって

$$
\begin{aligned}
\rho_j^n
&=
u_t(t_n,x_j)
-
\kappa u_{xx}(t_n,x_j)
\\
&\quad+
\frac{\tau}{2}
u_{tt}(\xi_{n,j},x_j)
-
\kappa R_{x,j}^n.
\end{aligned}
$$

厳密解は熱方程式を満たすので

$$
u_t-\kappa u_{xx}=0.
$$

従って

$$
|\rho_j^n|
\le
\frac{\tau}{2}M_{tt}
+
\kappa|R_{x,j}^n|.
$$

空間余項の評価を代入して

$$
|\rho_j^n|
\le
\frac{\tau}{2}M_{tt}
+
\frac{\kappa h^2}{12}M_{xxxx}.
$$

右辺は $\tau,h\to0$ で0へ行くため、整合性が従います。
<!-- proof-end -->

ここでは

$$
\tau\to0,
\qquad
h\to0
$$

の両方が必要です。

「空間だけ細かくすればよい」「時間だけ細かくすればよい」という話ではありません。

---

## 3. 大域誤差と格子収束

局所残差は「一歩ごとに新しく注入される誤差」です。

欲しいのは、固定した有限時間まで全部積み重なった誤差です。

<a id="def-fdm3-global-error"></a>
<!-- formal-statement-start -->
### 定義（格子大域誤差・格子収束）

厳密解の格子点値を

$$
Y_j^n=u(t_n,x_j)
$$

とし、差分法による数値解を $U_j^n$ とする。

$$
\boxed{
e_j^n
=
Y_j^n-U_j^n
}
$$

を **格子大域誤差**という。

固定した $T>0$ に対し、ある格子ノルム $\|\cdot\|$ について

$$
\boxed{
\max_{0\le n\le N}
\|\mathbf e^n\|
\longrightarrow0
}
$$

が

$$
h,\tau\to0
$$

の許容された格子細分化に沿って成り立つとき、その差分法はそのノルムで **格子収束する**という。
<!-- formal-statement-end -->

<!-- definition-example-start: def-fdm3-global-error -->
### 例：最大ノルムで格子誤差を見る

**定義の確認**。内部格子点で

$$
\mathbf e^n
=
(e_1^n,\ldots,e_{J-1}^n)^{\mathsf T}
$$

とし、

$$
\|\mathbf e^n\|_\infty
=
\max_{1\le j\le J-1}|e_j^n|
$$

とします。

もし

$$
\max_{0\le n\le N}
\|\mathbf e^n\|_\infty
\le
C(\tau+h^2)
$$

で、定数 $C$ が $h,\tau$ に依存しないなら、

$$
\tau,h\to0
$$

で右辺は0へ行きます。

したがって最大ノルムで格子収束します。
<!-- definition-example-end -->

局所残差と大域誤差の違いは、NA6 の局所打切り誤差と大域誤差の違いと同じです。

---

## 4. FTCS の凸結合構造と最大ノルム

FDM2 では Fourier モードから FTCS の安定条件

$$
0\le r\le\frac12
$$

を得ました。

同じ条件には、実空間で非常に分かりやすい意味があります。

FTCS の更新式は

$$
U_j^{n+1}
=
rU_{j-1}^n
+
(1-2r)U_j^n
+
rU_{j+1}^n.
$$

$r\le1/2$ なら三つの係数はすべて非負で、和は1です。

したがって新しい値は、前時刻の三つの値の **凸結合**です。

<a id="thm-fdm3-discrete-maximum"></a>
<!-- formal-statement-start -->
### 定理（FTCS の離散最大値原理と最大ノルム縮小性）

斉次 Dirichlet 境界条件

$$
V_0^n=V_J^n=0
$$

の下で、格子関数 $V_j^n$ が FTCS の斉次更新

$$
V_j^{n+1}
=
rV_{j-1}^n
+
(1-2r)V_j^n
+
rV_{j+1}^n
$$

を満たすとする。

$$
0\le r\le\frac12
$$

なら、

$$
\boxed{
\|\mathbf V^{n+1}\|_\infty
\le
\|\mathbf V^n\|_\infty
}
$$

が成り立つ。

さらに、初期値と境界値が非負なら全時刻で

$$
V_j^n\ge0
$$

である。

従って FTCS はこの条件の下で、離散的な最大値の抑制と非負性保存を持つ。
<!-- formal-statement-end -->

### 証明の見取り図

更新式が凸結合なら、三つの値の最大値より大きい値も、最小値より小さい値も新たには作れません。

これは連続熱方程式が持つ最大値の抑制を、格子上で再現したものです。

<!-- proof-start -->
### 証明

$$
M_n
=
\|\mathbf V^n\|_\infty
$$

と置きます。

すべての内部点で

$$
|V_{j-1}^n|,
\quad
|V_j^n|,
\quad
|V_{j+1}^n|
\le
M_n
$$

です。境界値は0なので同じ評価に含められます。

$r\ge0$ かつ $1-2r\ge0$ だから

$$
\begin{aligned}
|V_j^{n+1}|
&\le
r|V_{j-1}^n|
+
(1-2r)|V_j^n|
+
r|V_{j+1}^n|
\\
&\le
\left(
r+1-2r+r
\right)M_n
\\
&=
M_n.
\end{aligned}
$$

すべての $j$ について最大を取ると

$$
\|\mathbf V^{n+1}\|_\infty
\le
\|\mathbf V^n\|_\infty.
$$

次に非負性を考えます。

時刻 $n$ で

$$
V_j^n\ge0
$$

がすべての格子点で成り立つなら、更新式は非負数の非負係数付き和なので

$$
V_j^{n+1}\ge0.
$$

初期時刻から帰納すれば全時刻で非負です。
<!-- proof-end -->

<!-- definition-example-start: thm-fdm3-discrete-maximum -->
### 例：$r=1/4$ では本当に平均になっている

$$
r=\frac14
$$

なら

$$
1-2r=\frac12.
$$

従って

$$
V_j^{n+1}
=
\frac14V_{j-1}^n
+
\frac12V_j^n
+
\frac14V_{j+1}^n.
$$

例えば

$$
(V_{j-1}^n,V_j^n,V_{j+1}^n)
=
(2,6,-2)
$$

なら

$$
V_j^{n+1}
=
\frac12+3-\frac12
=
3.
$$

前時刻の局所範囲

$$
-2\le V\le6
$$

から外れていません。

熱方程式らしく、局所的な尖りを平均化する更新になっています。
<!-- definition-example-end -->

### CFL 条件がどこで使われたか

証明で本質的だったのは

$$
1-2r\ge0
$$

です。

つまり

$$
r\le\frac12.
$$

この条件を破ると中央係数が負になり、更新式は凸結合ではなくなります。

そこで凸結合による最大値評価の証明機構そのものが壊れます。

---

## 5. 誤差方程式を作る

数値解 $U_j^n$ は

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

を満たします。

一方、厳密解の格子点値は

$$
Y_j^{n+1}
=
Y_j^n
+
r
\left(
Y_{j+1}^n-2Y_j^n+Y_{j-1}^n
\right)
+
\tau\rho_j^n
$$

を満たします。

引き算して

$$
e_j^n=Y_j^n-U_j^n
$$

と置くと、

$$
\boxed{
e_j^{n+1}
=
re_{j-1}^n
+
(1-2r)e_j^n
+
re_{j+1}^n
+
\tau\rho_j^n
}
$$

です。

これが本章の核心です。

- 過去の誤差は斉次時間発展で運ばれる。
- 新しい局所残差は各ステップで $\tau\rho^n$ として注入される。

安定性は前者を、整合性は後者を制御します。

---

## 6. 一般の線形時間発展で「安定性＋整合性→収束」

FTCS だけを見る前に、誤差伝播の骨格を一度抽象化します。

格子ベクトル上の線形写像を $S_{h,\tau}$ とし、

$$
\mathbf U^{n+1}
=
S_{h,\tau}\mathbf U^n
$$

という斉次時間発展を考えます。

厳密解の格子点値が

$$
\mathbf Y^{n+1}
=
S_{h,\tau}\mathbf Y^n
+
\tau\boldsymbol\rho^n
$$

を満たすなら、誤差は

$$
\mathbf e^{n+1}
=
S_{h,\tau}\mathbf e^n
+
\tau\boldsymbol\rho^n
$$

です。

<a id="thm-fdm3-stability-consistency"></a>
<!-- formal-statement-start -->
### 定理（線形時間発展の安定性と整合性からの収束）

固定した $T>0$ を取る。

線形差分時間発展

$$
\mathbf U^{n+1}
=
S_{h,\tau}\mathbf U^n
$$

と、その誤差方程式

$$
\mathbf e^{n+1}
=
S_{h,\tau}\mathbf e^n
+
\tau\boldsymbol\rho^n
$$

を考える。

ある定数 $C_T$ が存在し、十分細かいすべての許容格子について

$$
\boxed{
\|S_{h,\tau}^{\,m}\|
\le
C_T
\qquad
(0\le m\tau\le T)
}
$$

が成り立つとする。

このとき

$$
\boxed{
\|\mathbf e^n\|
\le
C_T
\left(
\|\mathbf e^0\|
+
t_n
\max_{0\le k<n}
\|\boldsymbol\rho^k\|
\right)
}
$$

が成り立つ。

従って

$$
\|\mathbf e^0\|\to0,
\qquad
\max_k\|\boldsymbol\rho^k\|\to0
$$

なら

$$
\max_{0\le t_n\le T}
\|\mathbf e^n\|
\to0.
$$
<!-- formal-statement-end -->

### 証明の見取り図

誤差漸化式を最後まで展開します。

過去の誤差と各時刻で注入された残差が、すべて $S$ の冪で運ばれます。

安定性が $S^m$ の大きさを一様に抑えれば、残差は最大でも「有限時間 $T$ の分だけ」蓄積するだけです。

<!-- proof-start -->
### 証明

誤差方程式を一回使うと

$$
\mathbf e^n
=
S\mathbf e^{n-1}
+
\tau\boldsymbol\rho^{n-1}.
$$

さらに

$$
\mathbf e^{n-1}
=
S\mathbf e^{n-2}
+
\tau\boldsymbol\rho^{n-2}
$$

を代入すると

$$
\mathbf e^n
=
S^2\mathbf e^{n-2}
+
\tau S\boldsymbol\rho^{n-2}
+
\tau\boldsymbol\rho^{n-1}.
$$

これを初期時刻まで繰り返して

$$
\boxed{
\mathbf e^n
=
S^n\mathbf e^0
+
\tau
\sum_{k=0}^{n-1}
S^{n-1-k}\boldsymbol\rho^k
}
$$

を得ます。

ノルムを取ると

$$
\|\mathbf e^n\|
\le
\|S^n\|\|\mathbf e^0\|
+
\tau
\sum_{k=0}^{n-1}
\|S^{n-1-k}\|
\|\boldsymbol\rho^k\|.
$$

仮定から

$$
\|S^m\|\le C_T
$$

なので

$$
\|\mathbf e^n\|
\le
C_T\|\mathbf e^0\|
+
\tau C_T
\sum_{k=0}^{n-1}
\|\boldsymbol\rho^k\|.
$$

さらに

$$
\sum_{k=0}^{n-1}
\|\boldsymbol\rho^k\|
\le
n
\max_{0\le k<n}
\|\boldsymbol\rho^k\|
$$

より

$$
\|\mathbf e^n\|
\le
C_T
\left(
\|\mathbf e^0\|
+
n\tau
\max_{0\le k<n}
\|\boldsymbol\rho^k\|
\right).
$$

$n\tau=t_n$ なので

$$
\|\mathbf e^n\|
\le
C_T
\left(
\|\mathbf e^0\|
+
t_n
\max_{0\le k<n}
\|\boldsymbol\rho^k\|
\right).
$$

$t_n\le T$ だから、初期誤差と局所残差が0へ行けば大域誤差も0へ行きます。
<!-- proof-end -->

### Lax--Richtmyer 同値定理との関係

古典的な **Lax--Richtmyer 同値定理**は、適切な線形初期値問題に対する整合的な線形差分近似では、

$$
\boxed{
\text{安定性}
\Longleftrightarrow
\text{収束性}
}
$$

となることを述べます。

ただし完全な一般形では、

- 連続問題の解写像
- 格子への制限写像
- 離散解写像
- どのノルムで近似するか
- 連続問題の適切性をどう仮定するか

を厳密に設定する必要があります。

本章では、その一般論を看板だけ掲げるのではなく、熱方程式の具体的な時間発展写像に対して必要な方向

$$
\boxed{
\text{整合性}
+
\text{安定性}
\Longrightarrow
\text{収束性}
}
$$

を上の定理で直接証明しました。

---

## 7. FTCS は最大ノルムで $O(\tau+h^2)$ 収束する

いままでの部品を組み合わせます。

<a id="thm-fdm3-ftcs-convergence"></a>
<!-- formal-statement-start -->
### 定理（FTCS の最大ノルム収束）

一次元熱方程式の古典解 $u$ が

$$
u_{tt},
\qquad
u_{xxxx}
$$

を閉領域上で連続に持つとする。

数値解は厳密な初期値・境界値を格子点で用い、

$$
U_j^0=u(0,x_j),
$$

$$
U_0^n=u(t_n,0),
\qquad
U_J^n=u(t_n,L)
$$

とする。

さらに

$$
0\le
r
=
\frac{\kappa\tau}{h^2}
\le
\frac12
$$

とする。

このとき最大ノルム誤差は

$$
\boxed{
\|\mathbf e^n\|_\infty
\le
t_n
\left(
\frac{\tau}{2}M_{tt}
+
\frac{\kappa h^2}{12}M_{xxxx}
\right)
}
$$

を満たす。

従って固定した $T$ 上で

$$
\boxed{
\max_{0\le n\le N}
\|\mathbf e^n\|_\infty
=
O(\tau+h^2)
}
$$

である。
<!-- formal-statement-end -->

<!-- proof-start -->
### 証明

初期値を厳密に標本化しているので

$$
\mathbf e^0=\mathbf0.
$$

境界値も厳密に与えているため、誤差は斉次 Dirichlet 境界条件

$$
e_0^n=e_J^n=0
$$

を満たします。

誤差方程式は

$$
e_j^{n+1}
=
re_{j-1}^n
+
(1-2r)e_j^n
+
re_{j+1}^n
+
\tau\rho_j^n.
$$

FTCS の斉次時間発展写像を $S$ と書けば

$$
\mathbf e^{n+1}
=
S\mathbf e^n
+
\tau\boldsymbol\rho^n.
$$

前節の最大ノルム縮小性から

$$
\|S\mathbf v\|_\infty
\le
\|\mathbf v\|_\infty.
$$

従って反復して

$$
\|S^m\|_\infty
\le1.
$$

前節の一般定理で

$$
C_T=1
$$

と取れます。

よって

$$
\|\mathbf e^n\|_\infty
\le
t_n
\max_{k,j}
|\rho_j^k|.
$$

局所残差評価

$$
|\rho_j^k|
\le
\frac{\tau}{2}M_{tt}
+
\frac{\kappa h^2}{12}M_{xxxx}
$$

を代入して

$$
\|\mathbf e^n\|_\infty
\le
t_n
\left(
\frac{\tau}{2}M_{tt}
+
\frac{\kappa h^2}{12}M_{xxxx}
\right).
$$

$t_n\le T$ だから

$$
\max_n
\|\mathbf e^n\|_\infty
\le
T
\left(
\frac{\tau}{2}M_{tt}
+
\frac{\kappa h^2}{12}M_{xxxx}
\right).
$$

右辺は $\tau,h\to0$ で0へ行きます。
<!-- proof-end -->

### CFL 条件の役割は「精度」ではなく「安定性」

残差評価だけを見ると

$$
O(\tau+h^2)
$$

であり、そこには

$$
r\le\frac12
$$

は出てきません。

CFL 条件が使われるのは、局所残差を大域誤差へ運ぶときです。

つまり

$$
\boxed{
r\le\frac12
}
$$

は Taylor 展開の条件ではなく、誤差伝播を抑える条件です。

この切り分けが重要です。

---

## 8. 整合性だけでは収束論は閉じない

FTCS で

$$
r=0.6
$$

を固定しながら

$$
\tau
=
0.6\frac{h^2}{\kappa}
$$

と取るとします。

$h\to0$ なら

$$
\tau\to0
$$

でもあるので、局所残差は

$$
O(\tau+h^2)
=
O(h^2)
$$

で0へ行きます。

つまり **整合性はある**ままです。

しかし FDM2 で見た周期格子の交互振動モード

$$
(-1)^j
$$

に対する増幅因子は

$$
G(\pi)
=
1-4r
=
1-2.4
=
-1.4.
$$

したがって摂動は一ステップで1.4倍されます。

$N=T/\tau$ ステップ後には

$$
|G|^N
=
1.4^N
$$

です。

$h\to0$ では

$$
N
=
\frac{T}{\tau}
\asymp
\frac1{h^2}
$$

なので、増幅は極端に大きくなります。

### 「初期摂動も0へ行くなら大丈夫」でもない

各格子で高周波モードの初期摂動振幅を

$$
\varepsilon_h
=
1.4^{-N}
$$

と取ります。

$N\to\infty$ なので

$$
\varepsilon_h\to0.
$$

つまり初期データ誤差は0へ近づいています。

ところが $N$ ステップ後は

$$
1.4^N\varepsilon_h
=
1.
$$

です。

初期誤差が0へ行くにもかかわらず、最終時刻の誤差は0へ行きません。

ここで壊れたのは整合性ではなく **安定性**です。

---

## 9. 後退 Euler 差分法の局所残差

後退 Euler 差分法では

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

厳密解を代入した残差は

$$
\widetilde\rho_j^{n+1}
=
\frac{
Y_j^{n+1}-Y_j^n
}{\tau}
-
\kappa
\delta_{xx}Y_j^{n+1}.
$$

時間差分は今度は新時刻側で評価されますが、次数は同じです。

<a id="prop-fdm3-be-residual"></a>
<!-- formal-statement-start -->
### 命題（後退 Euler 差分法の局所残差評価）

FTCS の局所残差評価と同じ正則性を仮定する。

後退 Euler 差分法の局所残差は

$$
\boxed{
|\widetilde\rho_j^{n+1}|
\le
\frac{\tau}{2}M_{tt}
+
\frac{\kappa h^2}{12}M_{xxxx}
}
$$

を満たす。

従って後退 Euler 差分法も

$$
O(\tau+h^2)
$$

で整合的である。
<!-- formal-statement-end -->

<!-- proof-start -->
### 証明

時間について $t_{n+1}$ を基準に後ろ向き Taylor 展開を使います。

ある

$$
\eta_{n,j}\in(t_n,t_{n+1})
$$

が存在して

$$
Y_j^n
=
Y_j^{n+1}
-
\tau u_t(t_{n+1},x_j)
+
\frac{\tau^2}{2}
u_{tt}(\eta_{n,j},x_j).
$$

従って

$$
\frac{
Y_j^{n+1}-Y_j^n
}{\tau}
=
u_t(t_{n+1},x_j)
-
\frac{\tau}{2}
u_{tt}(\eta_{n,j},x_j).
$$

空間中心二階差分は新時刻で

$$
\delta_{xx}Y_j^{n+1}
=
u_{xx}(t_{n+1},x_j)
+
\widetilde R_{x,j}^{n+1}
$$

かつ

$$
|\widetilde R_{x,j}^{n+1}|
\le
\frac{h^2}{12}M_{xxxx}.
$$

従って

$$
\begin{aligned}
\widetilde\rho_j^{n+1}
&=
u_t(t_{n+1},x_j)
-
\kappa u_{xx}(t_{n+1},x_j)
\\
&\quad
-
\frac{\tau}{2}
u_{tt}(\eta_{n,j},x_j)
-
\kappa\widetilde R_{x,j}^{n+1}.
\end{aligned}
$$

熱方程式で主項が消え、

$$
|\widetilde\rho_j^{n+1}|
\le
\frac{\tau}{2}M_{tt}
+
\frac{\kappa h^2}{12}M_{xxxx}.
$$
<!-- proof-end -->

整合性だけを見れば FTCS と後退 Euler は同じ

$$
O(\tau+h^2)
$$

です。

違いは安定性に現れます。

---

## 10. 後退 Euler は最大ノルムでも無条件に縮小的

FDM1 で、後退 Euler の係数行列

$$
A_r
=
\begin{pmatrix}
1+2r&-r&&0\\
-r&1+2r&\ddots&\\
&\ddots&\ddots&-r\\
0&&-r&1+2r
\end{pmatrix}
$$

が実対称正定値であり、各ステップが一意に解けることを証明しました。

ここでは別の性質を示します。

<a id="thm-fdm3-be-maxnorm"></a>
<!-- formal-statement-start -->
### 定理（後退 Euler 差分法の最大ノルム縮小性）

斉次 Dirichlet 境界条件の下で、後退 Euler 差分法の斉次更新

$$
A_r\mathbf V^{n+1}
=
\mathbf V^n
$$

を考える。

任意の

$$
r\ge0
$$

に対して

$$
\boxed{
\|\mathbf V^{n+1}\|_\infty
\le
\|\mathbf V^n\|_\infty
}
$$

が成り立つ。

従って後退 Euler 差分法は最大ノルムでも CFL 条件なしに縮小的である。
<!-- formal-statement-end -->

### 証明の見取り図

新時刻で絶対値が最大になる成分を一つ選びます。

その点では両隣の絶対値は最大成分以下なので、後退 Euler の式から最大成分そのものを前時刻の最大値で抑えられます。

<!-- proof-start -->
### 証明

$$
M
=
\|\mathbf V^{n+1}\|_\infty
$$

と置きます。

$M=0$ なら結論は自明です。

$M>0$ とし、

$$
|V_k^{n+1}|=M
$$

となる内部点 $k$ を取ります。

符号

$$
s
=
\operatorname{sgn}(V_k^{n+1})
\in\{-1,1\}
$$

を掛けると

$$
sV_k^{n+1}=M.
$$

後退 Euler の第 $k$ 成分は

$$
-rV_{k-1}^{n+1}
+
(1+2r)V_k^{n+1}
-
rV_{k+1}^{n+1}
=
V_k^n.
$$

両辺に $s$ を掛けます。

$$
-rsV_{k-1}^{n+1}
+
(1+2r)M
-
rsV_{k+1}^{n+1}
=
sV_k^n.
$$

最大値の定義から

$$
|V_{k-1}^{n+1}|\le M,
\qquad
|V_{k+1}^{n+1}|\le M.
$$

従って

$$
-rsV_{k-1}^{n+1}
\ge
-rM,
$$

$$
-rsV_{k+1}^{n+1}
\ge
-rM.
$$

よって左辺は

$$
-rM+(1+2r)M-rM=M
$$

以上です。

したがって

$$
M
\le
sV_k^n
\le
|V_k^n|
\le
\|\mathbf V^n\|_\infty.
$$

ゆえに

$$
\|\mathbf V^{n+1}\|_\infty
\le
\|\mathbf V^n\|_\infty.
$$
<!-- proof-end -->

### FTCS との違い

FTCS では

$$
1-2r\ge0
$$

が必要でした。

後退 Euler の証明では

$$
r\ge0
$$

しか使っていません。

これが実空間で見た「無条件安定」です。

---

## 11. 後退 Euler も $O(\tau+h^2)$ 収束する

厳密解の格子点値は

$$
A_r\mathbf Y^{n+1}
=
\mathbf Y^n
+
\tau\widetilde{\boldsymbol\rho}^{n+1}
$$

を満たします。

数値解は

$$
A_r\mathbf U^{n+1}
=
\mathbf U^n.
$$

引き算すると

$$
A_r\mathbf e^{n+1}
=
\mathbf e^n
+
\tau\widetilde{\boldsymbol\rho}^{n+1}.
$$

つまり

$$
\mathbf e^{n+1}
=
A_r^{-1}\mathbf e^n
+
\tau A_r^{-1}
\widetilde{\boldsymbol\rho}^{n+1}.
$$

前節の縮小性から

$$
\|A_r^{-1}\|_\infty
\le1.
$$

<a id="thm-fdm3-be-convergence"></a>
<!-- formal-statement-start -->
### 定理（後退 Euler 差分法の最大ノルム収束）

FTCS の収束定理と同じ正則性を仮定し、初期値・境界値を厳密に格子点で与える。

後退 Euler 差分法では任意の

$$
r=\frac{\kappa\tau}{h^2}\ge0
$$

に対して

$$
\boxed{
\|\mathbf e^n\|_\infty
\le
t_n
\left(
\frac{\tau}{2}M_{tt}
+
\frac{\kappa h^2}{12}M_{xxxx}
\right)
}
$$

が成り立つ。

従って

$$
\boxed{
\max_{0\le n\le N}
\|\mathbf e^n\|_\infty
=
O(\tau+h^2)
}
$$

であり、安定性のための CFL 条件を必要としない。
<!-- formal-statement-end -->

<!-- proof-start -->
### 証明

誤差方程式から

$$
\mathbf e^{n+1}
=
A_r^{-1}
\left(
\mathbf e^n
+
\tau
\widetilde{\boldsymbol\rho}^{n+1}
\right).
$$

最大ノルムを取ると

$$
\|\mathbf e^{n+1}\|_\infty
\le
\|A_r^{-1}\|_\infty
\left(
\|\mathbf e^n\|_\infty
+
\tau
\|\widetilde{\boldsymbol\rho}^{n+1}\|_\infty
\right).
$$

前節から

$$
\|A_r^{-1}\|_\infty\le1.
$$

従って

$$
\|\mathbf e^{n+1}\|_\infty
\le
\|\mathbf e^n\|_\infty
+
\tau
\|\widetilde{\boldsymbol\rho}^{n+1}\|_\infty.
$$

初期誤差は0なので、反復して

$$
\|\mathbf e^n\|_\infty
\le
\tau
\sum_{m=1}^{n}
\|\widetilde{\boldsymbol\rho}^{m}\|_\infty.
$$

最大残差で抑えると

$$
\|\mathbf e^n\|_\infty
\le
n\tau
\max_m
\|\widetilde{\boldsymbol\rho}^{m}\|_\infty.
$$

$n\tau=t_n$ だから

$$
\|\mathbf e^n\|_\infty
\le
t_n
\max_m
\|\widetilde{\boldsymbol\rho}^{m}\|_\infty.
$$

局所残差評価を代入して

$$
\|\mathbf e^n\|_\infty
\le
t_n
\left(
\frac{\tau}{2}M_{tt}
+
\frac{\kappa h^2}{12}M_{xxxx}
\right).
$$
<!-- proof-end -->

---

## 12. 「無条件安定」でも粗い時間刻みで正確とは限らない

後退 Euler は安定性のために

$$
\tau\le C h^2
$$

を要求しません。

しかし誤差評価は

$$
O(\tau+h^2)
$$

です。

例えば空間刻みを

$$
h=10^{-3}
$$

まで細かくしても、時間刻みを

$$
\tau=0.1
$$

のままにすれば、時間離散誤差 $O(\tau)$ が支配します。

したがって

$$
\boxed{
\text{無条件安定}
\ne
\text{任意に粗い刻みで高精度}
}
$$

です。

安定性は「誤差を暴走させない」性質、精度は「残差そのものがどれだけ小さいか」という別問題です。

---

## 13. 連続問題と離散問題で最大値を制御する

連続熱方程式では、内部で新しい正の最大値を自発的に作れないという拡散の性質が現れます。

FTCS では $r\le1/2$ のとき

$$
U_j^{n+1}
=
rU_{j-1}^n
+
(1-2r)U_j^n
+
rU_{j+1}^n
$$

が凸結合なので、同じ構造が離散化後にも残ります。

この対応は偶然ではありません。

良い離散化では、連続問題が持つ

- 最大値の抑制
- エネルギーの減衰
- 総量の保存
- 非負性
- 単調性

などの構造のうち、問題に重要なものをできるだけ保つことが安定性につながります。

FEM ではこれが

- 安定性を与える下からの評価
- 離散エネルギー評価
- 離散解が満たす直交的な誤差関係

など別の形で現れます。

---

## 14. FDM2 の Fourier 安定性と本章の最大ノルム評価は何が違うか

FDM2 では周期格子や離散正弦モードを使い、

$$
|G(\xi)|\le1
$$

を各周波数で確認しました。

これは主に離散 $\ell^2$ ノルムの議論です。

本章では

$$
\|\mathbf V^{n+1}\|_\infty
\le
\|\mathbf V^n\|_\infty
$$

を実空間で直接証明しました。

同じ FTCS でも、異なるノルム・異なる構造から安定性を見ています。

- Fourier 解析：周波数ごとの増幅を可視化する。
- 最大ノルム評価：実空間で最大値・非負性を制御する。

どちらか一方が常に万能ではありません。

移流拡散へ進むと、中心差分では「Fourier 的には何が起きるか」「単調性がなぜ壊れるか」の両方を見る必要があります。

---

# 15. 演習

## Level A

<a id="ex-fdm3-a01"></a>
### FDM3-A01 二次解で FTCS の局所残差を確認する
- Level: A

$$
u(t,x)=x^2+2\kappa t
$$

について、

1. 熱方程式 $u_t=\kappa u_{xx}$ を満たすことを確認せよ。
2. FTCS の局所残差 $\rho_j^n$ を定義から計算せよ。
3. 残差が0になる理由を、時間差分と空間差分の多項式次数から説明せよ。

<!-- solution-start -->
### 詳細解答

まず

$$
u_t=2\kappa,
\qquad
u_{xx}=2
$$

なので

$$
u_t-\kappa u_{xx}
=
2\kappa-2\kappa
=
0.
$$

従って熱方程式を満たします。

時間差分は

$$
\frac{
u(t_n+\tau,x_j)-u(t_n,x_j)
}{\tau}
=
\frac{
2\kappa\tau
}{\tau}
=
2\kappa.
$$

空間差分は

$$
\begin{aligned}
&\frac{
u(t_n,x_j+h)
-
2u(t_n,x_j)
+
u(t_n,x_j-h)
}{h^2}
\\
&=
\frac{
(x_j+h)^2-2x_j^2+(x_j-h)^2
}{h^2}
\\
&=
2.
\end{aligned}
$$

したがって

$$
\rho_j^n
=
2\kappa-\kappa\cdot2
=
\boxed{0}.
$$

時間について一次関数なので前進差分が厳密であり、空間について二次関数なので中心二階差分が厳密です。
<!-- solution-end -->

<a id="ex-fdm3-a02"></a>
### FDM3-A02 FTCS の一段最大ノルム評価
- Level: A

$$
r=\frac14
$$

とし、ある時刻で

$$
(V_{j-1}^n,V_j^n,V_{j+1}^n)
=
(-4,2,6)
$$

とする。

1. $V_j^{n+1}$ を計算せよ。
2. 新しい値が前時刻の局所最小値と最大値の間にあることを確認せよ。
3. 一般の $r\in[0,1/2]$ で同じ性質が成り立つ理由を説明せよ。

<!-- solution-start -->
### 詳細解答

$r=1/4$ では

$$
1-2r=\frac12.
$$

したがって

$$
\begin{aligned}
V_j^{n+1}
&=
\frac14(-4)
+
\frac12(2)
+
\frac14(6)
\\
&=
-1+1+\frac32
\\
&=
\boxed{\frac32}.
\end{aligned}
$$

前時刻の局所範囲は

$$
-4\le V\le6
$$

であり、

$$
-4
\le
\frac32
\le
6.
$$

一般の $0\le r\le1/2$ では

$$
r\ge0,
\qquad
1-2r\ge0,
\qquad
r+(1-2r)+r=1.
$$

従って新しい値は三つの値の凸結合です。凸結合は元の最小値と最大値の間に入ります。
<!-- solution-end -->

<a id="ex-fdm3-a03"></a>
### FDM3-A03 局所残差から大域誤差を見積もる
- Level: A

ある安定な差分法で

$$
\|\mathbf e^{n+1}\|_\infty
\le
\|\mathbf e^n\|_\infty
+
\tau R
$$

が全ステップで成り立ち、

$$
\mathbf e^0=0
$$

とする。

1. $n$ ステップ後の誤差を評価せよ。
2. $t_n=n\tau\le T$ を用いて評価を簡単にせよ。
3. $R\le C(\tau+h^2)$ なら収束率を述べよ。

<!-- solution-start -->
### 詳細解答

一回目は

$$
\|\mathbf e^1\|_\infty
\le
\tau R.
$$

二回目は

$$
\|\mathbf e^2\|_\infty
\le
\|\mathbf e^1\|_\infty+\tau R
\le
2\tau R.
$$

帰納的に

$$
\boxed{
\|\mathbf e^n\|_\infty
\le
n\tau R
}.
$$

$n\tau=t_n\le T$ なので

$$
\boxed{
\|\mathbf e^n\|_\infty
\le
TR
}.
$$

さらに

$$
R\le C(\tau+h^2)
$$

なら

$$
\boxed{
\|\mathbf e^n\|_\infty
\le
TC(\tau+h^2)
}.
$$

したがって固定有限時間では

$$
O(\tau+h^2)
$$

で収束します。
<!-- solution-end -->

<a id="ex-fdm3-a04"></a>
### FDM3-A04 後退 Euler の最大値評価を二内部点で確認する
- Level: A

$r=1$、内部点が2個の後退 Euler 更新

$$
\begin{pmatrix}
3&-1\\
-1&3
\end{pmatrix}
\begin{pmatrix}
V_1^{n+1}\\
V_2^{n+1}
\end{pmatrix}
=
\begin{pmatrix}
2\\
-1
\end{pmatrix}
$$

を解け。

そのうえで

$$
\|\mathbf V^{n+1}\|_\infty
\le
\|\mathbf V^n\|_\infty
$$

を確認せよ。

<!-- solution-start -->
### 詳細解答

連立方程式は

$$
3V_1^{n+1}-V_2^{n+1}=2,
$$

$$
-V_1^{n+1}+3V_2^{n+1}=-1.
$$

第一式から

$$
V_2^{n+1}
=
3V_1^{n+1}-2.
$$

第二式へ代入すると

$$
-V_1^{n+1}
+
3(3V_1^{n+1}-2)
=
-1.
$$

従って

$$
8V_1^{n+1}=5,
$$

$$
V_1^{n+1}=\frac58.
$$

よって

$$
V_2^{n+1}
=
\frac{15}{8}-2
=
-\frac18.
$$

したがって

$$
\|\mathbf V^{n+1}\|_\infty
=
\frac58.
$$

前時刻ベクトルは

$$
\mathbf V^n=(2,-1)^{\mathsf T}
$$

なので

$$
\|\mathbf V^n\|_\infty=2.
$$

従って

$$
\boxed{
\frac58\le2
}
$$

であり、縮小性を具体的に確認できました。
<!-- solution-end -->

## Level B

<a id="ex-fdm3-b01"></a>
### FDM3-B01 線形時間発展の誤差伝播公式
- Level: B

誤差が

$$
\mathbf e^{n+1}
=
S\mathbf e^n
+
\tau\boldsymbol\rho^n
$$

を満たすとする。

1. 数学的帰納法で
   $$
   \mathbf e^n
   =
   S^n\mathbf e^0
   +
   \tau
   \sum_{k=0}^{n-1}
   S^{n-1-k}\boldsymbol\rho^k
   $$
   を示せ。
2. $\|S^m\|\le C_T$ から大域誤差評価を導け。
3. この証明のどの箇所が「安定性」、どの箇所が「整合性」に対応するか説明せよ。

<!-- solution-start -->
### 詳細解答

$n=1$ では

$$
\mathbf e^1
=
S\mathbf e^0
+
\tau\boldsymbol\rho^0
$$

なので公式は成り立ちます。

$n$ で公式が成り立つと仮定します。

すると

$$
\begin{aligned}
\mathbf e^{n+1}
&=
S\mathbf e^n
+
\tau\boldsymbol\rho^n
\\
&=
S
\left(
S^n\mathbf e^0
+
\tau
\sum_{k=0}^{n-1}
S^{n-1-k}\boldsymbol\rho^k
\right)
+
\tau\boldsymbol\rho^n
\\
&=
S^{n+1}\mathbf e^0
+
\tau
\sum_{k=0}^{n-1}
S^{n-k}\boldsymbol\rho^k
+
\tau\boldsymbol\rho^n
\\
&=
S^{n+1}\mathbf e^0
+
\tau
\sum_{k=0}^{n}
S^{n-k}\boldsymbol\rho^k.
\end{aligned}
$$

従って帰納法で公式が成り立ちます。

ノルムを取ると

$$
\|\mathbf e^n\|
\le
\|S^n\|\|\mathbf e^0\|
+
\tau
\sum_{k=0}^{n-1}
\|S^{n-1-k}\|
\|\boldsymbol\rho^k\|.
$$

安定性

$$
\|S^m\|\le C_T
$$

を使えば

$$
\|\mathbf e^n\|
\le
C_T\|\mathbf e^0\|
+
\tau C_T
\sum_{k=0}^{n-1}
\|\boldsymbol\rho^k\|.
$$

最大残差で抑えて

$$
\|\mathbf e^n\|
\le
C_T
\left(
\|\mathbf e^0\|
+
n\tau
\max_k\|\boldsymbol\rho^k\|
\right).
$$

$n\tau=t_n\le T$ なので

$$
\boxed{
\|\mathbf e^n\|
\le
C_T
\left(
\|\mathbf e^0\|
+
T
\max_k\|\boldsymbol\rho^k\|
\right)
}.
$$

ここで

- $\|S^m\|\le C_T$ が安定性
- $\max_k\|\boldsymbol\rho^k\|\to0$ が整合性

です。

二つを同じ式で結ぶことにより収束が出ます。
<!-- solution-end -->

<a id="ex-fdm3-b02"></a>
### FDM3-B02 FTCS の誤差評価を初期誤差付きで導く
- Level: B

FTCS が $r\le1/2$ を満たし、初期近似が厳密値と一致せず

$$
\|\mathbf e^0\|_\infty
\le
\eta_h
$$

とする。

局所残差が

$$
\max_{n,j}|\rho_j^n|
\le
C(\tau+h^2)
$$

を満たすとき、

$$
\max_{0\le n\le N}
\|\mathbf e^n\|_\infty
$$

を評価せよ。

<!-- solution-start -->
### 詳細解答

FTCS は $r\le1/2$ の下で最大ノルム縮小的なので

$$
\|S^m\|_\infty\le1.
$$

誤差伝播定理で

$$
C_T=1
$$

と取れます。

従って

$$
\|\mathbf e^n\|_\infty
\le
\|\mathbf e^0\|_\infty
+
t_n
\max_k
\|\boldsymbol\rho^k\|_\infty.
$$

仮定を使うと

$$
\|\mathbf e^n\|_\infty
\le
\eta_h
+
t_n C(\tau+h^2).
$$

$t_n\le T$ だから

$$
\boxed{
\max_n
\|\mathbf e^n\|_\infty
\le
\eta_h
+
TC(\tau+h^2)
}.
$$

したがって

$$
\eta_h\to0,
\qquad
\tau,h\to0
$$

なら収束します。

初期値の離散化誤差も、大域誤差の一部として安定性によって運ばれることが分かります。
<!-- solution-end -->

<a id="ex-fdm3-b03"></a>
### FDM3-B03 整合的だが不安定な FTCS の高周波摂動
- Level: B

周期格子で FTCS を使い、

$$
r=0.6
$$

を固定する。

1. 高周波モード $\xi=\pi$ の増幅因子を求めよ。
2. $\tau=0.6h^2/\kappa$ と取ると局所残差はなぜ0へ行くか。
3. $N=T/\tau$ とし、初期摂動振幅
   $$
   \varepsilon_h=|G(\pi)|^{-N}
   $$
   を取る。$\varepsilon_h\to0$ であることを示せ。
4. $N$ ステップ後の摂動振幅を求め、整合性だけでは収束を保証できない理由を説明せよ。

<!-- solution-start -->
### 詳細解答

FTCS の増幅因子は

$$
G(\xi)
=
1
-
4r\sin^2\frac{\xi}{2}.
$$

$\xi=\pi$ では

$$
\sin^2\frac{\pi}{2}=1
$$

なので

$$
G(\pi)
=
1-4(0.6)
=
\boxed{-1.4}.
$$

従って

$$
|G(\pi)|=1.4>1.
$$

一方、

$$
\tau
=
0.6\frac{h^2}{\kappa}
$$

だから $h\to0$ なら $\tau\to0$ です。

局所残差は滑らかな解に対して

$$
O(\tau+h^2)
$$

なので

$$
O(h^2)
$$

となり0へ行きます。従って整合性はあります。

ステップ数は

$$
N
=
\frac{T}{\tau}
=
\frac{T\kappa}{0.6h^2}.
$$

$h\to0$ で $N\to\infty$ です。

したがって

$$
\varepsilon_h
=
1.4^{-N}
\to0.
$$

しかし $N$ ステップ後の振幅は

$$
|G|^N\varepsilon_h
=
1.4^N1.4^{-N}
=
\boxed{1}.
$$

初期摂動は0へ近づいているのに、有限時間後の摂動は0へ近づきません。

整合性は「毎ステップの新しい欠陥が小さい」ことしか保証せず、既存の誤差を増幅しないことは保証しません。

ここで不足しているのが安定性です。
<!-- solution-end -->

## Level C

<a id="ex-fdm3-c01"></a>
### FDM3-C01 FTCS と後退 Euler の精度制約・安定性制約を比較する
- Level: C

一次元熱方程式に対し、FTCS と後退 Euler の最大ノルム誤差評価がどちらも

$$
\max_n\|\mathbf e^n\|_\infty
\le
C_T(\tau+h^2)
$$

であるとする。

目標誤差を $\varepsilon$ とし、空間刻みを

$$
h=\varepsilon
$$

まで非常に細かく取る場合を考える。

1. 空間離散誤差 $h^2$ の大きさを求めよ。
2. 精度だけを見れば、時間刻み $\tau$ はどの程度で十分か。
3. FTCS の安定性条件
   $$
   \tau
   \le
   \frac{h^2}{2\kappa}
   $$
   を代入し、必要な時間刻みの次数を求めよ。
4. 後退 Euler では安定性のための同じ制約がないことを使い、両者のステップ数を次数で比較せよ。
5. 「両者とも一次時間精度なのに、後退 Euler が実用上有利になり得る」理由を説明せよ。

<!-- solution-start -->
### 詳細解答

空間刻みが

$$
h=\varepsilon
$$

なので

$$
h^2=\varepsilon^2.
$$

目標誤差は $\varepsilon$ です。

誤差評価

$$
C_T(\tau+h^2)
$$

で、すでに空間誤差は

$$
\varepsilon^2
\ll
\varepsilon
$$

です。

したがって精度だけを見れば

$$
\tau
=
O(\varepsilon)
$$

で十分です。

ところが FTCS は安定性のため

$$
\tau
\le
\frac{h^2}{2\kappa}.
$$

$h=\varepsilon$ を代入すると

$$
\boxed{
\tau
=
O(\varepsilon^2)
}.
$$

つまり精度上は $O(\varepsilon)$ で足りるのに、安定性のためさらに小さい $O(\varepsilon^2)$ まで時間刻みを縮める必要があります。

固定最終時刻 $T$ までのステップ数は

$$
N=\frac{T}{\tau}.
$$

従って FTCS は

$$
\boxed{
N_{\mathrm{FTCS}}
=
O(\varepsilon^{-2})
}.
$$

後退 Euler は安定性による $\tau\le Ch^2$ を必要としないため、精度だけから

$$
\tau=O(\varepsilon)
$$

と取れます。

従って

$$
\boxed{
N_{\mathrm{BE}}
=
O(\varepsilon^{-1})
}.
$$

両者とも時間方向には一次精度ですが、FTCS には空間刻みと時間刻みを結び付ける安定性制約があります。

空間を精度上必要な以上に細かくする状況では、その安定性制約が時間刻みまで強制的に小さくします。

後退 Euler ではその制約がないので、時間刻みを時間精度だけから選べます。

ただし後退 Euler は各ステップで連立方程式を解く必要があります。

従って比較は

$$
\text{1ステップの安さ}
\quad\text{対}\quad
\text{必要ステップ数}
$$

のトレードオフになります。
<!-- solution-end -->

---

## 16. まとめ

この章では、数値 PDE の収束論を

$$
\boxed{
\text{局所残差}
\longrightarrow
\text{整合性}
}
$$

と

$$
\boxed{
\text{誤差時間発展}
\longrightarrow
\text{安定性}
}
$$

に分け、それらを誤差方程式で結びました。

線形時間発展では

$$
\mathbf e^{n+1}
=
S\mathbf e^n
+
\tau\boldsymbol\rho^n
$$

を反復すると

$$
\mathbf e^n
=
S^n\mathbf e^0
+
\tau
\sum_{k=0}^{n-1}
S^{n-1-k}\boldsymbol\rho^k.
$$

ここから

$$
\boxed{
\text{安定性}
+
\text{整合性}
\Longrightarrow
\text{収束性}
}
$$

が直接見えます。

FTCS では

$$
r\le\frac12
$$

の下で最大ノルム縮小性が成り立ち、

$$
\max_n
\|\mathbf e^n\|_\infty
=
O(\tau+h^2)
$$

を得ました。

後退 Euler 差分法では任意の $r\ge0$ で最大ノルム縮小性が成り立ち、同じ

$$
O(\tau+h^2)
$$

の収束評価を CFL 条件なしに得ました。

一方、FTCS で $r>1/2$ としても局所残差は0へ行き得ます。

それでも高周波モードは増幅されるため、整合性だけでは収束論は閉じません。

この構造は、後続の有限要素法でも

$$
\text{近似性}
+
\text{安定性}
\longrightarrow
\text{誤差評価}
$$

という形で再登場します。

次の **FDM4「移流拡散と風上化」** では、拡散だけでなく移流項

$$
bu_x
$$

が入ったとき、中心差分がなぜ非物理振動を生み得るかを調べます。

そこで

- 中心差分
- 風上差分
- 数値拡散
- Péclet 数
- 単調性と安定化

を扱い、有限要素法の移流拡散問題へ接続します。
