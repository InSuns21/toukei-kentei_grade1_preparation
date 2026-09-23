# FEM1 有限要素法 I：Poisson 方程式・変分形式・Galerkin 法

差分法では、微分方程式の微分を格子上の差分へ直接置き換えました。

有限要素法では入口が違います。まず PDE を **変分問題**へ移し、その解空間そのものを有限次元部分空間へ置き換えます。

本章の中心問いは

> **無限次元の Poisson 変分問題を有限次元へ落としたとき、何が解の存在・安定性・誤差を支配するのか。**

です。

直接の前提は [GPDE7 の Lax--Milgram 定理](../GPDE7/index.md#thm-gpde7-lax-milgram)です。Poisson の弱形式と双線形形式の有界性・強圧性は [GPDE6](../GPDE6/index.md#prop-gpde6-poisson-form) で既に証明しています。

本章ではそれらを再証明せず、

$$
\text{連続変分問題}
\longrightarrow
\text{有限次元部分空間}
\longrightarrow
\text{Galerkin 方程式}
\longrightarrow
\text{Galerkin 直交性}
\longrightarrow
\text{Céa の補題}
$$

という有限要素誤差解析の骨格を作ります。

> **この章の停止線**  
> 本章では有限次元部分空間 $V_h\subset V$ を抽象的に与えます。三角形分割、基準要素、節点自由度、局所基底、組立て（assembly）は FEM2、補間誤差と メッシュの形状正則性は FEM3、具体的な $h$ 依存誤差評価は FEM4 で扱います。

---

## 0. Poisson 方程式をどこから離散化するか

有界領域 $\Omega\subset\mathbb R^d$ の零 Dirichlet Poisson 問題を考えます。

GPDE6 で導入した空間

$$
V=H_0^1(\Omega)
$$

に勾配ノルム

$$
\|v\|_V=\|\nabla v\|_{L^2(\Omega)}
$$

を入れます。

双線形形式と線形汎関数を

$$
a(u,v)
=
\int_\Omega
\nabla u\cdot\nabla v\,dx,
$$

$$
F(v)=\langle F,v\rangle_{H^{-1},H_0^1}
$$

とすると、Poisson の変分弱解は

$$
\boxed{
a(u,v)=F(v)
\qquad
(\forall v\in V)
}
$$

を満たす $u\in V$ です。

[Poisson form の有界性と強圧性](../GPDE6/index.md#prop-gpde6-poisson-form)から、勾配ノルムに対して

$$
|a(w,v)|
\le
\|w\|_V\|v\|_V,
$$

$$
a(v,v)
=
\|v\|_V^2.
$$

従って有界性定数と強圧性定数を

$$
M=1,
\qquad
\alpha=1
$$

と取れます。

さらに [Lax--Milgram 定理](../GPDE7/index.md#thm-gpde7-lax-milgram)から、任意の $F\in V^*$ に対して連続問題には一意な解 $u\in V$ が存在します。

ここまでは連続問題です。

有限要素法側の最初の操作は、微分を差分へ置き換えることではありません。

$$
\boxed{
V
\quad\text{を}\quad
V_h\subset V
\quad\text{へ置き換える}
}
$$

ことです。

---

## 1. 有限次元 Galerkin 法

<a id="def-fem1-galerkin"></a>

<!-- formal-statement-start -->
### 定義（適合 Galerkin 離散化）

$V$ を実 Hilbert 空間、$a:V\times V\to\mathbb R$ を双線形形式、$F\in V^*$ とする。

有限次元部分空間

$$
V_h\subset V
$$

を選び、

$$
\boxed{
a(u_h,v_h)=F(v_h)
\qquad
(\forall v_h\in V_h)
}
$$

を満たす $u_h\in V_h$ を求める問題を **適合 Galerkin 離散化**という。

$V_h\subset V$ を満たすことを **適合性**という。
<!-- formal-statement-end -->

連続問題では全ての

$$
v\in V
$$

に対して方程式を課しました。

Galerkin 法では、未知関数も試験関数も同じ有限次元空間

$$
V_h
$$

へ制限します。

ここで添字 $h$ は後で メッシュ幅を表しますが、本章ではまだメッシュを導入しません。

<!-- definition-example-start: def-fem1-galerkin -->
### 例：$\mathbb R^2$ で Galerkin 法を直接確認する

$$
V=\mathbb R^2,
\qquad
a(u,v)=u\cdot v
$$

とし、

$$
F(v)=
\begin{pmatrix}
2\\
3
\end{pmatrix}
\cdot v
$$

とします。

連続問題

$$
u\cdot v=F(v)
\qquad
(\forall v\in\mathbb R^2)
$$

の解は

$$
u=
\begin{pmatrix}
2\\
3
\end{pmatrix}.
$$

ここで

$$
V_h=\operatorname{span}\left\{
\begin{pmatrix}
1\\
0
\end{pmatrix}
\right\}
$$

とします。

$u_h=(c,0)^{\mathsf T}$ と置けば、任意の $v_h=(t,0)^{\mathsf T}$ に対し

$$
ct=2t
$$

でなければならないので

$$
c=2.
$$

従って

$$
\boxed{
u_h=
\begin{pmatrix}
2\\
0
\end{pmatrix}
}.
$$

これは厳密解 $u$ の $V_h$ への直交射影になっています。

無限次元の PDE でも、本質はこの「許された部分空間の中で方程式を満たす点を選ぶ」という操作です。
<!-- definition-example-end -->

---

## 2. 離散問題は本当に解けるのか

有限次元にしただけでは、方程式が自動的に一意可解になるわけではありません。

連続問題で働いた強圧性を、離散空間にも引き継ぐ必要があります。

<a id="thm-fem1-discrete-wellposedness"></a>

<!-- formal-statement-start -->
### 定理（適合 Galerkin 問題の存在一意性）

$V$ を実 Hilbert 空間とし、$a:V\times V\to\mathbb R$ がある $M,\alpha>0$ に対して

$$
|a(w,v)|
\le
M\|w\|_V\|v\|_V
\qquad
(\forall w,v\in V),
$$

$$
a(v,v)
\ge
\alpha\|v\|_V^2
\qquad
(\forall v\in V)
$$

を満たすとする。

$F\in V^*$ とし、$V_h\subset V$ を有限次元部分空間とする。

このとき一意な $u_h\in V_h$ が存在して

$$
\boxed{
a(u_h,v_h)=F(v_h)
\qquad
(\forall v_h\in V_h)
}
$$

を満たす。

さらに

$$
\boxed{
\|u_h\|_V
\le
\frac1\alpha
\|F\|_{V^*}
}
$$

である。
<!-- formal-statement-end -->

### 証明の見取り図

新しい定理を一から証明する必要はありません。

$V_h$ は有限次元なので完備です。

また $a$ の有界性と強圧性は $V_h$ 上へ制限しても同じ定数 $M,\alpha$ で成立します。

従って GPDE7 の [Lax--Milgram 定理](../GPDE7/index.md#thm-gpde7-lax-milgram) を $V_h$ 上でそのまま使えます。

<!-- proof-start -->
### 証明

有限次元ノルム空間は完備なので、$V_h$ は $V$ から誘導された内積に関して Hilbert 空間です。

任意の $w_h,v_h\in V_h$ は $V$ の元でもあるので、連続問題の有界性から

$$
|a(w_h,v_h)|
\le
M\|w_h\|_V\|v_h\|_V.
$$

同様に強圧性から

$$
a(v_h,v_h)
\ge
\alpha\|v_h\|_V^2.
$$

また $F|_{V_h}$ は $V_h$ 上の連続線形汎関数です。

よって [Lax--Milgram 定理](../GPDE7/index.md#thm-gpde7-lax-milgram)を Hilbert 空間 $V_h$、双線形形式 $a|_{V_h\times V_h}$、線形汎関数 $F|_{V_h}$ に適用できます。

従って一意な $u_h\in V_h$ が存在して

$$
a(u_h,v_h)=F(v_h)
\qquad
(\forall v_h\in V_h)
$$

を満たします。

Lax--Milgram の安定性評価も同じ強圧性定数 $\alpha$ で

$$
\|u_h\|_V
\le
\frac1\alpha
\|F|_{V_h}\|_{V_h^*}.
$$

さらに

$$
\|F|_{V_h}\|_{V_h^*}
=
\sup_{0\ne v_h\in V_h}
\frac{|F(v_h)|}{\|v_h\|_V}
\le
\sup_{0\ne v\in V}
\frac{|F(v)|}{\|v\|_V}
=
\|F\|_{V^*}.
$$

したがって

$$
\|u_h\|_V
\le
\frac1\alpha
\|F\|_{V^*}.
$$
<!-- proof-end -->

### どの仮定が働いたか

適合性

$$
V_h\subset V
$$

があるため、連続問題で既に確認した

- 双線形形式が定義できること
- 有界性
- 強圧性

を離散問題へそのまま継承できます。

この単純さが適合 Galerkin 法の大きな利点です。

---

## 3. 基底を選べば連立一次方程式になる

有限次元空間

$$
V_h
=
\operatorname{span}\{\phi_1,\ldots,\phi_N\}
$$

の基底を一つ選びます。

未知解を

$$
u_h
=
\sum_{j=1}^N c_j\phi_j
$$

と書きます。

Galerkin 方程式を各基底関数 $\phi_i$ で試験すると

$$
a\left(
\sum_{j=1}^N c_j\phi_j,
\phi_i
\right)
=
F(\phi_i).
$$

双線形性から

$$
\sum_{j=1}^N
a(\phi_j,\phi_i)c_j
=
F(\phi_i).
$$

<a id="prop-fem1-basis-system"></a>

<!-- formal-statement-start -->
### 命題（Galerkin 方程式の行列表現）

$V_h=\operatorname{span}\{\phi_1,\ldots,\phi_N\}$ とする。

$$
A_{ij}=a(\phi_j,\phi_i),
\qquad
b_i=F(\phi_i)
$$

と定める。

このとき

$$
u_h=\sum_{j=1}^Nc_j\phi_j
$$

が Galerkin 解であることと、係数ベクトル

$$
\mathbf c=(c_1,\ldots,c_N)^{\mathsf T}
$$

が

$$
\boxed{
A\mathbf c=\mathbf b
}
$$

を満たすことは同値である。

さらに $a$ が強圧的なら $A$ は正則であり、$a$ が対称なら $A$ は実対称正定値行列である。
<!-- formal-statement-end -->

### 証明の見取り図

最初の同値は基底で試験するだけです。

正則性は

$$
A\mathbf c=0
$$

から対応する $v_h=\sum_jc_j\phi_j$ を作り、

$$
a(v_h,v_h)=0
$$

を強圧性へ入れて $v_h=0$ を得ます。

<!-- proof-start -->
### 証明

Galerkin 方程式を $\phi_i$ に対して課すと

$$
a(u_h,\phi_i)=F(\phi_i).
$$

$$
u_h=\sum_{j=1}^Nc_j\phi_j
$$

を代入して

$$
\sum_{j=1}^N
a(\phi_j,\phi_i)c_j
=
F(\phi_i).
$$

これは定義した $A,\mathbf b$ により

$$
A\mathbf c=\mathbf b
$$

です。

逆に、この連立方程式が全ての $i$ で成り立つなら、任意の

$$
v_h=\sum_{i=1}^Nd_i\phi_i
$$

に対し

$$
\begin{aligned}
a(u_h,v_h)
&=
\sum_{i=1}^Nd_i\,a(u_h,\phi_i)\\
&=
\sum_{i=1}^Nd_i\,F(\phi_i)\\
&=
F(v_h).
\end{aligned}
$$

従って Galerkin 方程式が成り立ちます。

次に $A\mathbf c=0$ とし、

$$
v_h=\sum_{j=1}^Nc_j\phi_j
$$

と置きます。

各 $i$ について

$$
a(v_h,\phi_i)=0.
$$

$v_h$ 自身も $V_h$ に属するので、係数 $c_i$ を使って線形結合を取れば

$$
a(v_h,v_h)=0.
$$

強圧性から

$$
\alpha\|v_h\|_V^2
\le
a(v_h,v_h)
=
0.
$$

従って

$$
v_h=0.
$$

基底 $\phi_1,\ldots,\phi_N$ は一次独立なので

$$
\mathbf c=0.
$$

よって $A$ の核は $\{0\}$ で、正方行列 $A$ は正則です。

さらに $a$ が対称なら

$$
A_{ij}
=
a(\phi_j,\phi_i)
=
a(\phi_i,\phi_j)
=
A_{ji}.
$$

また $\mathbf c\ne0$ に対し対応する $v_h\ne0$ なので

$$
\mathbf c^{\mathsf T}A\mathbf c
=
a(v_h,v_h)
\ge
\alpha\|v_h\|_V^2
>
0.
$$

従って $A$ は実対称正定値です。
<!-- proof-end -->

Poisson 問題では、この $A$ が後続 FEM2 で **剛性行列**として具体化されます。

---

## 4. 一次元 Poisson 問題を二次元の空間へ落としてみる

区間

$$
\Omega=(0,1)
$$

で

$$
-u''(x)=x^2,
\qquad
u(0)=u(1)=0
$$

を考えます。

厳密解は二回積分して

$$
u''=-x^2,
$$

$$
u'=-\frac{x^3}{3}+C_1,
$$

$$
u=-\frac{x^4}{12}+C_1x+C_2.
$$

境界条件から

$$
C_2=0,
\qquad
C_1=\frac1{12},
$$

したがって

$$
\boxed{
u(x)=\frac{x-x^4}{12}
}.
$$

変分形式は

$$
\int_0^1u'v'\,dx
=
\int_0^1x^2v\,dx
\qquad
(\forall v\in H_0^1(0,1)).
$$

本章ではメッシュを使わず、単純な二次元部分空間

$$
V_h
=
\operatorname{span}\{\phi_1,\phi_2\}
$$

を取り、

$$
\phi_1(x)=x(1-x),
$$

$$
\phi_2(x)=x(1-x)(2x-1)
$$

とします。

両者は $x=0,1$ で 0 なので

$$
\phi_1,\phi_2\in H_0^1(0,1).
$$

従って

$$
V_h\subset H_0^1(0,1)
$$

であり、適合性が成り立ちます。

微分は

$$
\phi_1'(x)=1-2x,
$$

$$
\phi_2'(x)=-6x^2+6x-1.
$$

剛性行列の成分を計算すると

$$
A_{11}
=
\int_0^1(1-2x)^2\,dx
=
\frac13,
$$

対称性から $A_{12}=A_{21}$ であり、直接積分すると

$$
A_{12}=0,
$$

さらに

$$
A_{22}
=
\int_0^1(-6x^2+6x-1)^2\,dx
=
\frac15.
$$

従って

$$
A
=
\begin{pmatrix}
1/3&0\\
0&1/5
\end{pmatrix}.
$$

右辺は

$$
b_1
=
\int_0^1x^2\phi_1(x)\,dx
=
\int_0^1(x^3-x^4)\,dx
=
\frac14-\frac15
=
\frac1{20},
$$

$$
b_2
=
\int_0^1x^2\phi_2(x)\,dx
=
\frac1{60}.
$$

よって

$$
\begin{pmatrix}
1/3&0\\
0&1/5
\end{pmatrix}
\begin{pmatrix}
c_1\\
c_2
\end{pmatrix}
=
\begin{pmatrix}
1/20\\
1/60
\end{pmatrix}.
$$

したがって

$$
c_1=\frac3{20},
\qquad
c_2=\frac1{12}.
$$

Galerkin 解は

$$
\boxed{
u_h
=
\frac3{20}\phi_1
+
\frac1{12}\phi_2
}
$$

です。

展開すると

$$
\boxed{
u_h(x)
=
-\frac{x^3}{6}
+
\frac{x^2}{10}
+
\frac{x}{15}
}.
$$

厳密解

$$
u(x)=\frac{x-x^4}{12}
$$

は四次式なので、この $V_h$ には入りません。

つまり今回は「厳密解がたまたま部分空間に入っていて完全再現された」のではなく、有限次元空間の中で本当に近似しています。

---

## 5. 連続式と離散式を引く

連続解 $u$ と離散解 $u_h$ の差を

$$
e=u-u_h
$$

と置きます。

連続問題は全ての $v\in V$ に対して

$$
a(u,v)=F(v)
$$

を満たします。

特に

$$
v_h\in V_h\subset V
$$

なら

$$
a(u,v_h)=F(v_h).
$$

一方、離散問題は

$$
a(u_h,v_h)=F(v_h).
$$

差を取れば、右辺が消えます。

<a id="thm-fem1-galerkin-orthogonality"></a>

<!-- formal-statement-start -->
### 定理（Galerkin 直交性）

連続変分問題

$$
a(u,v)=F(v)
\qquad
(\forall v\in V)
$$

の解を $u\in V$、適合 Galerkin 問題

$$
a(u_h,v_h)=F(v_h)
\qquad
(\forall v_h\in V_h)
$$

の解を $u_h\in V_h$ とする。

このとき誤差

$$
e=u-u_h
$$

は

$$
\boxed{
a(e,v_h)=0
\qquad
(\forall v_h\in V_h)
}
$$

を満たす。
<!-- formal-statement-end -->

### 証明の見取り図

連続式と離散式は、$V_h$ 上では同じ右辺を持ちます。

引き算するだけです。

<!-- proof-start -->
### 証明

任意の $v_h\in V_h$ を取ります。

適合性 $V_h\subset V$ により、連続問題へ $v=v_h$ を代入できるので

$$
a(u,v_h)=F(v_h).
$$

離散問題から

$$
a(u_h,v_h)=F(v_h).
$$

従って

$$
a(u-u_h,v_h)=0.
$$

すなわち

$$
a(e,v_h)=0.
$$
<!-- proof-end -->

### なぜ「直交」と呼ぶのか

$a$ が対称で正定値なら、$a(\cdot,\cdot)$ 自体が内積になります。

そのとき

$$
a(u-u_h,v_h)=0
$$

は、本当に

$$
u-u_h
$$

が $V_h$ の全方向に直交しているという意味です。

非対称な $a$ でもこの等式自体は成立しますが、通常の内積直交と同一視はしません。

---

## 6. 離散解は最良近似と同程度によい

[Galerkin 直交性](#thm-fem1-galerkin-orthogonality)だけでは、まだ誤差の大きさは分かりません。

ここで有界性と強圧性を組み合わせます。

<a id="thm-fem1-cea"></a>

<!-- formal-statement-start -->
### 定理（Céa の補題）

$V$ を実 Hilbert 空間とし、$a:V\times V\to\mathbb R$ が

$$
|a(w,v)|
\le
M\|w\|_V\|v\|_V
$$

および

$$
a(v,v)
\ge
\alpha\|v\|_V^2
$$

を満たすとする。

連続問題の解を $u\in V$、有限次元部分空間 $V_h\subset V$ 上の適合 Galerkin 解を $u_h\in V_h$ とする。

このとき

$$
\boxed{
\|u-u_h\|_V
\le
\frac{M}{\alpha}
\inf_{v_h\in V_h}
\|u-v_h\|_V
}
$$

が成り立つ。
<!-- formal-statement-end -->

これは **準最良近似性**です。

右辺は

$$
V_h
$$

の中で理論上最もよい近似の誤差です。

Galerkin 解はその最良値から高々

$$
M/\alpha
$$

倍しか悪くなりません。

### 証明の見取り図

任意の比較対象 $v_h\in V_h$ を一つ取ります。

誤差を

$$
e=u-u_h
$$

と置くと、強圧性から

$$
\alpha\|e\|_V^2
\le
a(e,e).
$$

ここで

$$
e
=
u-v_h
+
v_h-u_h.
$$

[Galerkin 直交性](#thm-fem1-galerkin-orthogonality)により

$$
a(e,v_h-u_h)=0
$$

なので

$$
a(e,e)=a(e,u-v_h).
$$

あとは有界性で上から抑えます。

<!-- proof-start -->
### 証明

$$
e=u-u_h
$$

と置き、任意の $v_h\in V_h$ を取ります。

強圧性から

$$
\alpha\|e\|_V^2
\le
a(e,e).
$$

一方

$$
e
=
u-u_h
=
(u-v_h)+(v_h-u_h).
$$

双線形性から

$$
a(e,e)
=
a(e,u-v_h)
+
a(e,v_h-u_h).
$$

$v_h-u_h\in V_h$ なので、[Galerkin 直交性](#thm-fem1-galerkin-orthogonality)から

$$
a(e,v_h-u_h)=0.
$$

従って

$$
a(e,e)
=
a(e,u-v_h).
$$

有界性より

$$
|a(e,u-v_h)|
\le
M\|e\|_V\|u-v_h\|_V.
$$

よって

$$
\alpha\|e\|_V^2
\le
M\|e\|_V\|u-v_h\|_V.
$$

$e=0$ なら結論は自明です。

$e\ne0$ なら $\|e\|_V$ で割って

$$
\|e\|_V
\le
\frac{M}{\alpha}
\|u-v_h\|_V.
$$

これは任意の $v_h\in V_h$ に対して成り立つので

$$
\|u-u_h\|_V
\le
\frac{M}{\alpha}
\inf_{v_h\in V_h}
\|u-v_h\|_V.
$$
<!-- proof-end -->

### どの仮定がどこで必要だったか

- **適合性 $V_h\subset V$**：連続方程式を $v_h$ で試験し、[Galerkin 直交性](#thm-fem1-galerkin-orthogonality)を得る。
- **強圧性**：誤差ノルムを $a(e,e)$ で下から押さえる。
- **有界性**：$a(e,u-v_h)$ を二つのノルムの積で上から押さえる。
- **有限次元性**：離散問題の存在一意性を確保する際に $V_h$ の完備性を自動的に得る。

Céa の補題は

$$
\boxed{
\text{安定性}
+
\text{近似可能性}
\Longrightarrow
\text{Galerkin 誤差評価}
}
$$

という構造を持っています。

FDM3 の

$$
\text{安定性}
+
\text{整合性}
\Longrightarrow
\text{収束}
$$

に対応する有限要素法側の基本骨格です。

---

## 7. 対称問題では自然な内積で最良近似になる

Poisson form は対称です。

対称かつ強圧的な双線形形式では、$a$ 自体を内積として使えます。

<a id="def-fem1-energy-norm"></a>

<!-- formal-statement-start -->
### 定義（エネルギーノルム）

$V$ を実ベクトル空間とし、$a:V\times V\to\mathbb R$ を対称かつ正定値な双線形形式とする。

$$
\boxed{
\|v\|_a
=
\sqrt{a(v,v)}
}
$$

を $a$ による **エネルギーノルム**という。
<!-- formal-statement-end -->

<!-- definition-example-start: def-fem1-energy-norm -->
### 例：Poisson のエネルギーノルム

$V=H_0^1(\Omega)$、

$$
a(u,v)
=
\int_\Omega
\nabla u\cdot\nabla v\,dx
$$

なら

$$
\|v\|_a^2
=
a(v,v)
=
\int_\Omega|\nabla v|^2\,dx.
$$

従って

$$
\boxed{
\|v\|_a
=
\|\nabla v\|_{L^2(\Omega)}
}.
$$

つまり本章で使っている $V$ のノルムと一致します。
<!-- definition-example-end -->

<a id="thm-fem1-best-approximation"></a>

<!-- formal-statement-start -->
### 定理（対称 Galerkin 法のエネルギーノルム最良近似性）

$a$ を対称かつ強圧的な双線形形式とし、$u$ を連続問題の解、$u_h\in V_h$ を適合 Galerkin 解とする。

このとき

$$
\boxed{
\|u-u_h\|_a
=
\inf_{v_h\in V_h}
\|u-v_h\|_a
}
$$

が成り立つ。

さらに任意の $v_h\in V_h$ に対して

$$
\boxed{
\|u-v_h\|_a^2
=
\|u-u_h\|_a^2
+
\|u_h-v_h\|_a^2
}
$$

が成り立つ。
<!-- formal-statement-end -->

### 証明の見取り図

これは Hilbert 空間の直交射影と同じ Pythagoras の定理です。

$$
u-v_h
=
(u-u_h)
+
(u_h-v_h)
$$

と分解します。

二つの項の交差項は [Galerkin 直交性](#thm-fem1-galerkin-orthogonality)で 0 になります。

<!-- proof-start -->
### 証明

任意の $v_h\in V_h$ を取ります。

$$
u-v_h
=
(u-u_h)+(u_h-v_h).
$$

エネルギーノルムの二乗を展開すると

$$
\begin{aligned}
\|u-v_h\|_a^2
&=
a(u-v_h,u-v_h)\\
&=
a(u-u_h,u-u_h)
+
2a(u-u_h,u_h-v_h)\\
&\quad+
a(u_h-v_h,u_h-v_h).
\end{aligned}
$$

ここで

$$
u_h-v_h\in V_h
$$

なので [Galerkin 直交性](#thm-fem1-galerkin-orthogonality)から

$$
a(u-u_h,u_h-v_h)=0.
$$

従って

$$
\|u-v_h\|_a^2
=
\|u-u_h\|_a^2
+
\|u_h-v_h\|_a^2.
$$

右辺第二項は非負なので

$$
\|u-u_h\|_a
\le
\|u-v_h\|_a
$$

です。

これは任意の $v_h\in V_h$ に対して成り立ちます。

一方 $v_h=u_h$ を選べば等号が達成されるので

$$
\|u-u_h\|_a
=
\inf_{v_h\in V_h}
\|u-v_h\|_a.
$$
<!-- proof-end -->

Poisson 問題ではエネルギーノルムが勾配ノルムそのものなので、Céa の定数も

$$
\frac{M}{\alpha}=1
$$

です。

したがって Poisson の適合 Galerkin 解は

$$
\boxed{
\|\nabla(u-u_h)\|_{L^2}
=
\inf_{v_h\in V_h}
\|\nabla(u-v_h)\|_{L^2}
}
$$

を満たします。

---

## 8. Poisson 問題に対する結論

<a id="cor-fem1-poisson-quasioptimality"></a>

<!-- formal-statement-start -->
### 系（Poisson Galerkin 近似の存在一意性と最良近似性）

$\Omega\subset\mathbb R^d$ を有界開集合とし、

$$
V=H_0^1(\Omega)
$$

に勾配ノルムを入れる。

$F\in H^{-1}(\Omega)$ とし、連続 Poisson 変分問題

$$
\int_\Omega
\nabla u\cdot\nabla v\,dx
=
F(v)
\qquad
(\forall v\in V)
$$

の解を $u\in V$ とする。

任意の有限次元部分空間 $V_h\subset V$ に対し、一意な $u_h\in V_h$ が存在して

$$
\int_\Omega
\nabla u_h\cdot\nabla v_h\,dx
=
F(v_h)
\qquad
(\forall v_h\in V_h)
$$

を満たす。

さらに

$$
\boxed{
\|\nabla(u-u_h)\|_{L^2(\Omega)}
=
\inf_{v_h\in V_h}
\|\nabla(u-v_h)\|_{L^2(\Omega)}
}
$$

である。
<!-- formal-statement-end -->

### 証明の見取り図

GPDE6 で Poisson form について

$$
M=\alpha=1
$$

を既に確認しています。

従って本章の離散存在一意性定理と、対称問題の最良近似定理をそのまま適用します。

<!-- proof-start -->
### 証明

[GPDE6 の Poisson form の評価](../GPDE6/index.md#prop-gpde6-poisson-form)により

$$
|a(w,v)|
\le
\|w\|_V\|v\|_V,
$$

$$
a(v,v)=\|v\|_V^2.
$$

従って

$$
M=1,
\qquad
\alpha=1.
$$

また Poisson form は対称です。

よって [適合 Galerkin 問題の存在一意性](#thm-fem1-discrete-wellposedness)から一意な $u_h\in V_h$ が存在します。

さらに [対称 Galerkin 法のエネルギーノルム最良近似性](#thm-fem1-best-approximation)から

$$
\|u-u_h\|_a
=
\inf_{v_h\in V_h}
\|u-v_h\|_a.
$$

Poisson では

$$
\|w\|_a
=
\|\nabla w\|_{L^2(\Omega)}
$$

なので

$$
\|\nabla(u-u_h)\|_{L^2(\Omega)}
=
\inf_{v_h\in V_h}
\|\nabla(u-v_h)\|_{L^2(\Omega)}.
$$
<!-- proof-end -->

この結果は非常に強いですが、まだ

$$
\inf_{v_h\in V_h}
\|u-v_h\|_V
$$

が メッシュ幅 $h$ に対してどれくらい小さいかは分かりません。

その評価には

- 具体的な有限要素空間
- 補間作用素
- メッシュの形状正則性
- 解 $u$ の追加正則性

が必要です。

それが FEM2–FEM4 の役割です。

---

## 9. Céa の補題は「収束定理」そのものではない

[Céa の補題](#thm-fem1-cea)から

$$
\|u-u_h\|_V
\le
\frac{M}{\alpha}
\inf_{v_h\in V_h}
\|u-v_h\|_V
$$

を得ました。

しかし右辺が 0 へ行くとは、まだ言っていません。

### 失敗例：空間を改善しなければ誤差は消えない

$$
V=\mathbb R^2,
\qquad
a(u,v)=u\cdot v
$$

とし、厳密解を

$$
u=
\begin{pmatrix}
0\\
1
\end{pmatrix}
$$

とします。

全ての $h$ に対して

$$
V_h
=
\operatorname{span}
\left\{
\begin{pmatrix}
1\\
0
\end{pmatrix}
\right\}
$$

と固定します。

このとき Galerkin 解は常に

$$
u_h=0.
$$

最良近似誤差も

$$
\inf_{v_h\in V_h}
\|u-v_h\|_2
=
1.
$$

従って [Céa の補題](#thm-fem1-cea)は正しく

$$
\|u-u_h\|_2=1
$$

を保証しますが、誤差は全く減りません。

つまり

$$
\boxed{
\text{Céa}
+
\text{良い近似空間}
}
$$

の両方が必要です。

FEM3 では、この「良い近似空間」を補間誤差から定量化します。

---

## 10. 強圧性を失うと離散問題も壊れる

適合 Galerkin 法だからといって、連続問題の安定性が不要になるわけではありません。

$$
V=\mathbb R^2
$$

とし

$$
a(u,v)=u_1v_1
$$

を考えます。

これは有界ですが、

$$
w=
\begin{pmatrix}
0\\
1
\end{pmatrix}
$$

に対して

$$
a(w,w)=0
$$

なので強圧的ではありません。

$V_h=V$ とします。

### 一意性が壊れる例

$$
F(v)=v_1
$$

なら Galerkin 方程式は

$$
u_1v_1=v_1
\qquad
(\forall v)
$$

なので

$$
u_1=1
$$

だけが決まり、$u_2$ は任意です。

### 存在が壊れる例

$$
F(v)=v_2
$$

なら

$$
u_1v_1=v_2
\qquad
(\forall v)
$$

を要求します。

$v=(0,1)^{\mathsf T}$ を入れると

$$
0=1
$$

となり不可能です。

強圧性を失うと

$$
\boxed{
\text{一意性}
\quad\text{も}\quad
\text{存在}
}
$$

も壊れ得ます。

Céa の証明でも、最初の

$$
\alpha\|e\|_V^2
\le
a(e,e)
$$

が使えなくなります。

---

## 11. 有限要素法はこの先どこで現れるか

ここまでの Galerkin 法は、任意の有限次元部分空間 $V_h$ に対する抽象論です。

有限要素法では $V_h$ を勝手な大域多項式空間として作るのではなく、

$$
\boxed{
\text{領域を小さな要素へ分割}
\longrightarrow
\text{各要素上の低次多項式}
\longrightarrow
\text{境界・連続性条件で貼り合わせる}
}
$$

という局所構成を使います。

その結果、

- 基底関数が局所的な台を持つ
- 剛性行列が疎になる
- 複雑な領域へ適用しやすい
- メッシュ細分化で近似空間を系統的に改善できる

という計算上の利点が得られます。

ただし、これらは Galerkin 法そのものではなく **Galerkin 空間を有限要素でどう構成するか**という次の段階です。

FEM2 でそこへ進みます。

---

## 12. 演習

### Level A

<a id="ex-fem1-a01"></a>
#### FEM1-A01 $\mathbb R^2$ の Galerkin 射影
- Level: A

$$
V=\mathbb R^2,
\qquad
a(u,v)=u\cdot v,
$$

$$
F(v)=
\begin{pmatrix}
4\\
-1
\end{pmatrix}
\cdot v
$$

とする。

$$
V_h
=
\operatorname{span}
\left\{
\begin{pmatrix}
1\\
1
\end{pmatrix}
\right\}
$$

上の Galerkin 解 $u_h$ を求めよ。

さらに厳密解 $u=(4,-1)^{\mathsf T}$ に対して

$$
(u-u_h)\cdot v_h=0
\qquad
(\forall v_h\in V_h)
$$

を確認せよ。

<!-- solution-start -->
**詳細解答**

基底を

$$
\phi=
\begin{pmatrix}
1\\
1
\end{pmatrix}
$$

とし

$$
u_h=c\phi
$$

と置きます。

Galerkin 方程式を $\phi$ で試験すると

$$
a(c\phi,\phi)=F(\phi).
$$

左辺は

$$
c\,\phi\cdot\phi
=
c(1^2+1^2)
=
2c.
$$

右辺は

$$
F(\phi)
=
\begin{pmatrix}
4\\
-1
\end{pmatrix}
\cdot
\begin{pmatrix}
1\\
1
\end{pmatrix}
=
3.
$$

従って

$$
2c=3,
$$

$$
c=\frac32.
$$

よって

$$
\boxed{
u_h=
\begin{pmatrix}
3/2\\
3/2
\end{pmatrix}
}.
$$

誤差は

$$
u-u_h
=
\begin{pmatrix}
4\\
-1
\end{pmatrix}
-
\begin{pmatrix}
3/2\\
3/2
\end{pmatrix}
=
\begin{pmatrix}
5/2\\
-5/2
\end{pmatrix}.
$$

任意の $v_h=t\phi$ に対して

$$
(u-u_h)\cdot v_h
=
t
\begin{pmatrix}
5/2\\
-5/2
\end{pmatrix}
\cdot
\begin{pmatrix}
1\\
1
\end{pmatrix}
=
t\left(\frac52-\frac52\right)
=
0.
$$

従って [Galerkin 直交性](#thm-fem1-galerkin-orthogonality)を直接確認できました。
<!-- solution-end -->

<a id="ex-fem1-a02"></a>
#### FEM1-A02 一次元一基底 Galerkin 計算
- Level: A

$$
-u''=x
\qquad
(0<x<1),
$$

$$
u(0)=u(1)=0
$$

を考える。

$$
V_h=\operatorname{span}\{\phi\},
\qquad
\phi(x)=x(1-x)
$$

とする。

1. $u_h=c\phi$ と置き、Galerkin 方程式から $c$ を求めよ。
2. 厳密解を求めよ。
3. 厳密解が $V_h$ に属さないことを確認せよ。

<!-- solution-start -->
**詳細解答**

変分形式は

$$
\int_0^1u_h'v_h'\,dx
=
\int_0^1xv_h\,dx.
$$

$V_h$ は一次元なので $v_h=\phi$ だけを試験すれば十分です。

$$
u_h=c\phi
$$

より

$$
c\int_0^1(\phi')^2\,dx
=
\int_0^1x\phi\,dx.
$$

$$
\phi'=1-2x
$$

なので

$$
\int_0^1(\phi')^2\,dx
=
\int_0^1(1-4x+4x^2)\,dx
=
1-2+\frac43
=
\frac13.
$$

右辺は

$$
\int_0^1x^2(1-x)\,dx
=
\int_0^1(x^2-x^3)\,dx
=
\frac13-\frac14
=
\frac1{12}.
$$

従って

$$
c\frac13=\frac1{12},
$$

$$
\boxed{
c=\frac14
}.
$$

したがって

$$
\boxed{
u_h(x)=\frac14x(1-x)
}.
$$

厳密解は

$$
-u''=x
$$

より

$$
u''=-x.
$$

積分して

$$
u'=-\frac{x^2}{2}+C_1,
$$

$$
u=-\frac{x^3}{6}+C_1x+C_2.
$$

境界条件から

$$
C_2=0,
\qquad
-\frac16+C_1=0,
$$

従って

$$
C_1=\frac16.
$$

よって

$$
\boxed{
u(x)=\frac{x-x^3}{6}
}.
$$

$V_h$ の元は全て $c(x-x^2)$ という二次多項式ですが、厳密解は三次項 $-x^3/6$ を持ちます。

従って

$$
u\notin V_h.
$$
<!-- solution-end -->

<a id="ex-fem1-a03"></a>
#### FEM1-A03 剛性行列が正定値になる理由
- Level: A

$a$ を対称かつ強圧的な双線形形式とし、

$$
V_h=\operatorname{span}\{\phi_1,\ldots,\phi_N\}.
$$

$$
A_{ij}=a(\phi_j,\phi_i)
$$

とする。

任意の $\mathbf c\ne0$ に対して

$$
\mathbf c^{\mathsf T}A\mathbf c>0
$$

を示せ。

<!-- solution-start -->
**詳細解答**

係数ベクトル

$$
\mathbf c=(c_1,\ldots,c_N)^{\mathsf T}
$$

に対し

$$
v_h=\sum_{j=1}^Nc_j\phi_j
$$

と置きます。

基底は一次独立なので

$$
\mathbf c\ne0
\quad\Longrightarrow\quad
v_h\ne0.
$$

行列の定義から

$$
\begin{aligned}
\mathbf c^{\mathsf T}A\mathbf c
&=
\sum_{i=1}^N\sum_{j=1}^N
c_iA_{ij}c_j\\
&=
\sum_{i,j}
c_i\,a(\phi_j,\phi_i)c_j\\
&=
a\left(
\sum_jc_j\phi_j,
\sum_ic_i\phi_i
\right)\\
&=
a(v_h,v_h).
\end{aligned}
$$

強圧性から

$$
a(v_h,v_h)
\ge
\alpha\|v_h\|_V^2.
$$

$v_h\ne0$ なので右辺は正です。

従って

$$
\boxed{
\mathbf c^{\mathsf T}A\mathbf c>0
}.
$$

対称性から $A$ も対称なので、$A$ は実対称正定値行列です。
<!-- solution-end -->

<a id="ex-fem1-a04"></a>
#### FEM1-A04 Céa の定数を読む
- Level: A

ある変分問題で

$$
|a(w,v)|
\le
5\|w\|_V\|v\|_V,
$$

$$
a(v,v)
\ge
2\|v\|_V^2
$$

が成り立つとする。

さらにある $w_h\in V_h$ が

$$
\|u-w_h\|_V\le0.04
$$

を満たすとする。

[Céa の補題](#thm-fem1-cea)から $\|u-u_h\|_V$ を評価せよ。

<!-- solution-start -->
**詳細解答**

有界性定数は

$$
M=5,
$$

強圧性定数は

$$
\alpha=2.
$$

[Céa の補題](#thm-fem1-cea)より

$$
\|u-u_h\|_V
\le
\frac{M}{\alpha}
\inf_{v_h\in V_h}\|u-v_h\|_V.
$$

最良近似誤差は、特定の $w_h$ を使って

$$
\inf_{v_h\in V_h}\|u-v_h\|_V
\le
\|u-w_h\|_V
\le
0.04.
$$

従って

$$
\|u-u_h\|_V
\le
\frac52\cdot0.04
=
0.10.
$$

よって

$$
\boxed{
\|u-u_h\|_V\le0.10
}.
$$
<!-- solution-end -->

### Level B

<a id="ex-fem1-b01"></a>
#### FEM1-B01 Galerkin 直交性から Céa の補題を再構成する
- Level: B

$V_h\subset V$ とし、$a$ は有界性定数 $M$、強圧性定数 $\alpha$ を持つとする。

次の順で [Céa の補題](#thm-fem1-cea)を証明せよ。

1. $e=u-u_h$ に対し $a(e,v_h)=0$ を示す。
2. 任意の $w_h\in V_h$ に対し
   $$
   a(e,e)=a(e,u-w_h)
   $$
   を示す。
3. 有界性・強圧性から
   $$
   \|e\|_V
   \le
   \frac M\alpha
   \|u-w_h\|_V
   $$
   を導く。
4. $w_h$ に関する下限を取る。

<!-- solution-start -->
**詳細解答**

連続問題は

$$
a(u,v)=F(v)
\qquad
(\forall v\in V)
$$

であり、適合性 $V_h\subset V$ により任意の $v_h\in V_h$ に対して

$$
a(u,v_h)=F(v_h).
$$

一方、離散問題は

$$
a(u_h,v_h)=F(v_h).
$$

差を取ると

$$
a(u-u_h,v_h)=0.
$$

従って

$$
\boxed{
a(e,v_h)=0
\qquad
(\forall v_h\in V_h)
}.
$$

次に任意の $w_h\in V_h$ を取ります。

$$
e=u-u_h
=
(u-w_h)+(w_h-u_h).
$$

よって

$$
a(e,e)
=
a(e,u-w_h)
+
a(e,w_h-u_h).
$$

$w_h-u_h\in V_h$ なので [Galerkin 直交性](#thm-fem1-galerkin-orthogonality)から第二項は 0 です。

従って

$$
\boxed{
a(e,e)=a(e,u-w_h)
}.
$$

強圧性と有界性を順に使うと

$$
\alpha\|e\|_V^2
\le
a(e,e)
=
a(e,u-w_h)
\le
M\|e\|_V\|u-w_h\|_V.
$$

$e=0$ なら結論は自明です。

$e\ne0$ なら $\|e\|_V$ で割り

$$
\|e\|_V
\le
\frac M\alpha
\|u-w_h\|_V.
$$

これは任意の $w_h\in V_h$ で成り立つので

$$
\boxed{
\|u-u_h\|_V
\le
\frac M\alpha
\inf_{w_h\in V_h}
\|u-w_h\|_V
}.
$$
<!-- solution-end -->

<a id="ex-fem1-b02"></a>
#### FEM1-B02 Poisson の二基底 Galerkin 系
- Level: B

$$
-u''=x^2,
\qquad
u(0)=u(1)=0
$$

に対し

$$
\phi_1=x(1-x),
\qquad
\phi_2=x(1-x)(2x-1),
$$

$$
V_h=\operatorname{span}\{\phi_1,\phi_2\}
$$

とする。

1. $A_{11}=1/3$, $A_{12}=A_{21}=0$, $A_{22}=1/5$ を積分から確認せよ。
2. $b_1=1/20$, $b_2=1/60$ を計算せよ。
3. 係数 $c_1,c_2$ を求めよ。
4. $u_h$ を多項式として展開せよ。
5. 厳密解 $u=(x-x^4)/12$ と一致しないことを確認せよ。

<!-- solution-start -->
**詳細解答**

まず

$$
\phi_1'=1-2x,
$$

$$
\phi_2'=-6x^2+6x-1.
$$

従って

$$
A_{11}
=
\int_0^1(1-2x)^2\,dx
=
\int_0^1(1-4x+4x^2)\,dx
=
1-2+\frac43
=
\frac13.
$$

交差項は

$$
\begin{aligned}
A_{12}
&=
\int_0^1
(1-2x)(-6x^2+6x-1)\,dx\\
&=
\int_0^1
(12x^3-18x^2+8x-1)\,dx\\
&=
3-6+4-1\\
&=
0.
\end{aligned}
$$

対称性から

$$
A_{21}=0.
$$

さらに

$$
(-6x^2+6x-1)^2
=
36x^4-72x^3+48x^2-12x+1
$$

なので

$$
\begin{aligned}
A_{22}
&=
\frac{36}{5}
-18
+16
-6
+1\\
&=
\frac15.
\end{aligned}
$$

右辺は

$$
b_1
=
\int_0^1x^2(x-x^2)\,dx
=
\int_0^1(x^3-x^4)\,dx
=
\frac14-\frac15
=
\frac1{20}.
$$

また

$$
\phi_2=-2x^3+3x^2-x
$$

なので

$$
x^2\phi_2
=
-2x^5+3x^4-x^3.
$$

従って

$$
b_2
=
-\frac13+\frac35-\frac14
=
\frac1{60}.
$$

連立方程式は

$$
\begin{pmatrix}
1/3&0\\
0&1/5
\end{pmatrix}
\begin{pmatrix}
c_1\\
c_2
\end{pmatrix}
=
\begin{pmatrix}
1/20\\
1/60
\end{pmatrix}.
$$

よって

$$
c_1
=
\frac{1/20}{1/3}
=
\frac3{20},
$$

$$
c_2
=
\frac{1/60}{1/5}
=
\frac1{12}.
$$

したがって

$$
u_h
=
\frac3{20}(x-x^2)
+
\frac1{12}(-2x^3+3x^2-x).
$$

同類項をまとめると

$$
\boxed{
u_h
=
-\frac{x^3}{6}
+
\frac{x^2}{10}
+
\frac{x}{15}
}.
$$

厳密解は

$$
u=\frac{x-x^4}{12}
$$

であり四次項を持ちますが、$u_h$ は三次以下です。

従って

$$
u_h\ne u.
$$
<!-- solution-end -->

<a id="ex-fem1-b03"></a>
#### FEM1-B03 強圧性を失ったときの二種類の破綻
- Level: B

$$
V=\mathbb R^2,
\qquad
a(u,v)=u_1v_1,
\qquad
V_h=V
$$

とする。

1. $a$ が有界だが強圧的でないことを示せ。
2. $F_1(v)=v_1$ に対する Galerkin 解を全て求め、一意性がないことを示せ。
3. $F_2(v)=v_2$ に対する Galerkin 解が存在しないことを示せ。
4. Céa の証明のどの一歩が使えなくなるか答えよ。

<!-- solution-start -->
**詳細解答**

Cauchy--Schwarz より

$$
|a(u,v)|
=
|u_1v_1|
\le
\|u\|_2\|v\|_2.
$$

従って $a$ は有界です。

しかし

$$
w=(0,1)^{\mathsf T}
$$

に対して

$$
a(w,w)=0
$$

なのに

$$
\|w\|_2=1.
$$

従って正の $\alpha$ で

$$
a(w,w)\ge\alpha\|w\|_2^2
$$

を満たすことはできず、強圧的ではありません。

$F_1(v)=v_1$ のとき、方程式は

$$
u_1v_1=v_1
\qquad
(\forall v_1,v_2).
$$

従って

$$
u_1=1
$$

だけが必要で、$u_2$ は任意です。

解集合は

$$
\boxed{
\{(1,t)^{\mathsf T}:t\in\mathbb R\}
}
$$

であり、一意性がありません。

$F_2(v)=v_2$ のとき

$$
u_1v_1=v_2
\qquad
(\forall v)
$$

です。

$v=(0,1)^{\mathsf T}$ を代入すると

$$
0=1
$$

となるので解は存在しません。

Céa の証明では最初に

$$
\alpha\|e\|_V^2
\le
a(e,e)
$$

と誤差ノルムを下から押さえます。

強圧性がないとこの評価が失われ、$a(e,e)$ から $\|e\|_V$ を制御できません。
<!-- solution-end -->

### Level C

<a id="ex-fem1-c01"></a>
#### FEM1-C01 Poisson Galerkin 法の骨格を最初から閉じる
- Level: C

$\Omega\subset\mathbb R^d$ を有界開集合とし

$$
V=H_0^1(\Omega),
$$

$$
a(u,v)
=
\int_\Omega
\nabla u\cdot\nabla v\,dx,
$$

$$
F\in H^{-1}(\Omega)
$$

とする。

有限次元部分空間 $V_h\subset V$ を任意に取る。

次を順に示せ。

1. 連続問題
   $$
   a(u,v)=F(v)
   \qquad
   (\forall v\in V)
   $$
   と離散問題
   $$
   a(u_h,v_h)=F(v_h)
   \qquad
   (\forall v_h\in V_h)
   $$
   がともに一意可解である。
2. Galerkin 直交性
   $$
   a(u-u_h,v_h)=0
   \qquad
   (\forall v_h\in V_h)
   $$
   を示す。
3. 任意の $w_h\in V_h$ に対し
   $$
   \|\nabla(u-w_h)\|_2^2
   =
   \|\nabla(u-u_h)\|_2^2
   +
   \|\nabla(u_h-w_h)\|_2^2
   $$
   を示す。
4. そこから
   $$
   \|\nabla(u-u_h)\|_2
   =
   \inf_{w_h\in V_h}
   \|\nabla(u-w_h)\|_2
   $$
   を導け。
5. この結果だけでは $h\to0$ の収束率がまだ分からない理由を説明せよ。

<!-- solution-start -->
**詳細解答**

**1. 連続問題と離散問題の一意可解性**

GPDE6 で Poisson form は勾配ノルム

$$
\|v\|_V=\|\nabla v\|_2
$$

に対して

$$
|a(w,v)|
\le
\|w\|_V\|v\|_V
$$

かつ

$$
a(v,v)
=
\|v\|_V^2
$$

を満たすことが証明済みです。

したがって有界性定数・強圧性定数は

$$
M=\alpha=1.
$$

$V=H_0^1(\Omega)$ は Hilbert 空間で、$F\in V^*$ です。

従って [Lax--Milgram 定理](../GPDE7/index.md#thm-gpde7-lax-milgram)から一意な $u\in V$ が存在します。

一方 $V_h$ は有限次元なので完備であり、$a$ を $V_h\times V_h$ に制限しても同じ評価

$$
|a(w_h,v_h)|
\le
\|w_h\|_V\|v_h\|_V,
$$

$$
a(v_h,v_h)
=
\|v_h\|_V^2
$$

が成り立ちます。

従って再び [Lax--Milgram 定理](../GPDE7/index.md#thm-gpde7-lax-milgram)により一意な $u_h\in V_h$ が存在します。

**2. Galerkin 直交性**

任意の $v_h\in V_h$ は $V$ の元でもあるので、連続式から

$$
a(u,v_h)=F(v_h).
$$

離散式から

$$
a(u_h,v_h)=F(v_h).
$$

差を取ると

$$
\boxed{
a(u-u_h,v_h)=0
}.
$$

**3. Pythagoras 型恒等式**

任意の $w_h\in V_h$ を取ります。

$$
u-w_h
=
(u-u_h)+(u_h-w_h).
$$

Poisson form は対称なので

$$
\begin{aligned}
\|\nabla(u-w_h)\|_2^2
&=
a(u-w_h,u-w_h)\\
&=
a(u-u_h,u-u_h)\\
&\quad+
2a(u-u_h,u_h-w_h)\\
&\quad+
a(u_h-w_h,u_h-w_h).
\end{aligned}
$$

$u_h-w_h\in V_h$ なので [Galerkin 直交性](#thm-fem1-galerkin-orthogonality)から

$$
a(u-u_h,u_h-w_h)=0.
$$

従って

$$
\boxed{
\|\nabla(u-w_h)\|_2^2
=
\|\nabla(u-u_h)\|_2^2
+
\|\nabla(u_h-w_h)\|_2^2
}.
$$

**4. 最良近似性**

右辺第二項は非負なので

$$
\|\nabla(u-u_h)\|_2
\le
\|\nabla(u-w_h)\|_2
$$

が任意の $w_h\in V_h$ に対して成り立ちます。

よって

$$
\|\nabla(u-u_h)\|_2
\le
\inf_{w_h\in V_h}
\|\nabla(u-w_h)\|_2.
$$

逆向きは $w_h=u_h$ を候補に取れば

$$
\inf_{w_h\in V_h}
\|\nabla(u-w_h)\|_2
\le
\|\nabla(u-u_h)\|_2.
$$

従って

$$
\boxed{
\|\nabla(u-u_h)\|_2
=
\inf_{w_h\in V_h}
\|\nabla(u-w_h)\|_2
}.
$$

**5. なぜまだ収束率は出ないか**

右辺は

$$
\inf_{w_h\in V_h}
\|\nabla(u-w_h)\|_2
$$

という「空間 $V_h$ が厳密解をどれだけよく近似できるか」という量です。

本章では $V_h$ を任意の有限次元部分空間としているだけで、

- $h$ が何を表すか
- $h\to0$ で空間がどう豊かになるか
- 厳密解の滑らかさからどの補間誤差が得られるか

をまだ定めていません。

従って Céa / 最良近似性は **離散解が最良近似と同程度に良い**ことは保証しますが、その最良近似誤差の $h$ 依存率までは与えません。

FEM2 で有限要素空間を構成し、FEM3 で補間誤差を評価し、FEM4 で両者を結んで具体的な収束率を得ます。
<!-- solution-end -->

---

## 13. まとめ

本章では、有限要素法の前段階となる適合 Galerkin 法を

$$
\boxed{
\text{変分問題の解空間を有限次元化する方法}
}
$$

として構成しました。

連続問題

$$
a(u,v)=F(v)
\qquad
(\forall v\in V)
$$

に対して

$$
V_h\subset V
$$

を選び、

$$
a(u_h,v_h)=F(v_h)
\qquad
(\forall v_h\in V_h)
$$

を解きます。

有界性と強圧性は部分空間へそのまま継承されるため、Lax--Milgram により離散問題も一意可解です。

基底を選ぶと Galerkin 方程式は

$$
A\mathbf c=\mathbf b
$$

という有限次元連立一次方程式になり、対称強圧的問題では $A$ は実対称正定値です。

連続式と離散式の差から

$$
\boxed{
a(u-u_h,v_h)=0
}
$$

という [Galerkin 直交性](#thm-fem1-galerkin-orthogonality)が得られます。

これを強圧性・有界性と組み合わせると [Céa の補題](#thm-fem1-cea)

$$
\boxed{
\|u-u_h\|_V
\le
\frac M\alpha
\inf_{v_h\in V_h}
\|u-v_h\|_V
}
$$

が得られます。

さらに Poisson のような対称問題ではエネルギーノルムで

$$
\boxed{
\|u-u_h\|_a
=
\inf_{v_h\in V_h}
\|u-v_h\|_a
}
$$

という厳密な最良近似性になります。

したがって有限要素誤差解析は

$$
\boxed{
\text{離散安定性}
+
\text{空間の近似能力}
}
$$

の二つへ分解できます。

本章で前者を閉じました。

次の **FEM2「有限要素・三角形分割・基底」** では、抽象的だった $V_h$ を mesh と局所多項式から実際に構成し、

- 有限要素
- 三角形分割
- 基準要素
- アフィン写像
- 自由度
- 局所基底
- 組立て（assembly）

へ進みます。
