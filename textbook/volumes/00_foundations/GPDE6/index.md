# GPDE6：二階微分を捨てて、エネルギーで解を作る

<!-- definition-example-audit: strict -->

PDE5 では Poisson 方程式

$$
-\Delta u=f
$$

を古典解の立場から扱いました。

GPDE3--GPDE5 では、その後に必要となる関数空間を準備しました。

- 弱微分と Sobolev 空間
- 零 Dirichlet 条件を担う $H_0^1$
- Poincaré 不等式
- 弱収束部分列
- compactness

本章では、これらを初めて PDE の存在問題へまとめて投入します。

中心となる発想は一つです。

$$
\boxed{
\text{二階微分を解に要求する代わりに、test function 側へ微分を移す}
}
$$

これにより、Poisson 方程式を

$$
u\in H_0^1(\Omega)
$$

だけで意味を持つ積分方程式へ変えます。

さらに、その積分方程式が

$$
\text{quadratic energy の最小化}
$$

と同じ問題であることを示し、GPDE5 の弱コンパクト性を使って最小点を実際に構成します。

本章の流れは次です。

~~~text
classical Poisson problem
  ↓ test function を掛ける
座標ごとの部分積分
  ↓
一階微分だけの積分恒等式
  ↓
H_0^1 の双対で外力を受ける
  ↓
a(u,v)=F(v)
  ↓
対称性
  ↓
energy minimization
  ↓
minimizing sequence
  ↓ weak compactness
weak limit
  ↓ weak-limit norm estimate
minimizer
  ↓
Poisson weak solution
~~~

GPDE7 では、この特殊な Poisson 構造を一般の双線形形式へ抽象化し、必要な下からの評価を定式化して Lax--Milgram 定理として閉じます。

---

## 1. PDE5 の Poisson 問題を「積分して読む」

PDE5 の符号規約に合わせ、

$$
-\Delta u=f
\quad\text{in }\Omega,
\qquad
u=0
\quad\text{on }\partial\Omega
$$

を考えます。

点ごとに

$$
\Delta u
$$

を読むには二階微分が必要です。

しかし、$u$ に必要な情報が本当に二階微分までなのかを調べるため、まず滑らかな場合に積分恒等式へ変形します。

$\varphi\in C_c^\infty(\Omega)$ とします。

方程式へ $\varphi$ を掛けると

$$
\int_\Omega
(-\Delta u)\varphi\,dx
=
\int_\Omega
f\varphi\,dx.
$$

左辺を座標ごとに分ければ

$$
\int_\Omega
(-\Delta u)\varphi\,dx
=
\sum_{i=1}^d
\int_\Omega
(-\partial_{ii}u)\varphi\,dx.
$$

$\varphi$ は $\Omega$ の内部に compact support を持つため、各座標方向で端の境界項は 0 です。

一変数の [微積分学の基本定理II](../RA4/index.md#thm-ra4-ftc2) を各切片へ適用すると

$$
\int_\Omega
(-\partial_{ii}u)\varphi\,dx
=
\int_\Omega
\partial_i u\,\partial_i\varphi\,dx.
$$

したがって

$$
\boxed{
\int_\Omega
\nabla u\cdot\nabla\varphi\,dx
=
\int_\Omega
f\varphi\,dx
}
$$

を得ます。

ここで重要なのは、左辺から $u$ の二階微分が消えたことです。

必要なのは

$$
\nabla u\in L^2(\Omega)
$$

までです。

つまり

$$
u\in H^1(\Omega)
$$

で式を読む余地が生まれました。

### なぜ test function を $H_0^1$ まで広げたいのか

$C_c^\infty(\Omega)$ だけでも distributional equation は読めます。

しかし零 Dirichlet 問題では、解自身が住む空間として [H_0^1](../GPDE4/index.md#def-gpde4-h01) を使います。

そこで test function も同じ空間へ広げると

$$
\text{trial space}
=
\text{test space}
=
H_0^1(\Omega)
$$

となり、PDE が 完備内積空間上の方程式として見えるようになります。

そのためには右辺

$$
v\mapsto
\int_\Omega fv\,dx
$$

を $H_0^1$ 上の連続線形汎関数として読める必要があります。

---

## 2. 外力を受ける空間を作る

$\Omega\subset\mathbb R^d$ を有界開集合とします。

GPDE4 の [勾配 norm と H1 norm の同値性](../GPDE4/index.md#cor-gpde4-gradient-norm)から

$$
\|v\|_V
:=
\|\nabla v\|_{L^2(\Omega)}
$$

は $H_0^1(\Omega)$ 上の norm です。

以後

$$
V:=H_0^1(\Omega)
$$

と書き、この勾配 norm を使います。

<a id="def-gpde6-hminus1"></a>

<!-- formal-statement-start -->
> **定義（Hminus1 空間）**  
> $\Omega\subset\mathbb R^d$ を有界開集合とし

$$
V=H_0^1(\Omega),
\qquad
\|v\|_V=\|\nabla v\|_{L^2(\Omega)}
$$

> とする。
>
> $V$ の連続双対

$$
\boxed{
H^{-1}(\Omega)
:=
V^*
=
\left(H_0^1(\Omega)\right)^*
}
$$

> を $H^{-1}(\Omega)$ と書く。
>
> $F\in H^{-1}(\Omega)$ の norm は

$$
\boxed{
\|F\|_{H^{-1}}
=
\sup_{\|v\|_V\le1}
|F(v)|
}
$$

> とする。
<!-- formal-statement-end -->

[双対空間](../F0_02C2_線形汎関数_双対空間_Riesz/index.md#def-f0-02c2-dual-space)は既に定義済みです。

GPDE4 の norm 同値性により、通常の $H^1$ norm を使って連続な線形汎関数と、勾配 norm を使って連続な線形汎関数は同じ集合です。

ただし dual norm の数値は norm の選び方に応じて同値な範囲で変わります。

<!-- definition-example-start: def-gpde6-hminus1 -->
**定義の確認**

$f\equiv1$ とし

$$
F(v)
=
\int_\Omega v\,dx
$$

と置きます。

[Cauchy--Schwarz 不等式](../F0_00E2_Cauchy_Schwarz_Bessel_Parseval/index.md#thm-f0-00e2-cauchy-schwarz)により

$$
|F(v)|
\le
|\Omega|^{1/2}
\|v\|_2.
$$

さらに [Poincaré 不等式](../GPDE4/index.md#thm-gpde4-poincare)から

$$
\|v\|_2
\le
C_P\|\nabla v\|_2
=
C_P\|v\|_V.
$$

従って

$$
|F(v)|
\le
C_P|\Omega|^{1/2}
\|v\|_V.
$$

よって $F$ は $V$ 上の連続線形汎関数であり

$$
F\in H^{-1}(\Omega).
$$

$H^{-1}$ は「負の一階微分を持つ関数」という点wise定義ではなく、$H_0^1$ に作用する連続線形汎関数の空間です。
<!-- definition-example-end -->

---

## 3. $L^2$ の外力は自動的に $H^{-1}$ のデータになる

<a id="prop-gpde6-l2-hminus1"></a>

<!-- formal-statement-start -->
> **命題（L2 data は Hminus1 functional を定める）**  
> $\Omega\subset\mathbb R^d$ を有界開集合とし、$f\in L^2(\Omega)$ とする。
>
> このとき

$$
F_f(v)
:=
\int_\Omega
f v\,dx
\qquad
(v\in H_0^1(\Omega))
$$

> は $H^{-1}(\Omega)$ の元であり

$$
\boxed{
\|F_f\|_{H^{-1}}
\le
C_P\|f\|_{L^2(\Omega)}
}
$$

> が成り立つ。
<!-- formal-statement-end -->

### 証明の見取り図

必要なのは二段だけです。

[Cauchy--Schwarz 不等式](../F0_00E2_Cauchy_Schwarz_Bessel_Parseval/index.md#thm-f0-00e2-cauchy-schwarz)により

$$
L^2\times L^2
\longrightarrow
\mathbb R
$$

で積分を制御し、さらに [Poincaré 不等式](../GPDE4/index.md#thm-gpde4-poincare)によって

$$
\|v\|_2
\longrightarrow
\|\nabla v\|_2
$$

へ変えます。

<!-- proof-start -->
### 証明

任意の $v\in H_0^1(\Omega)$ に対し [Cauchy--Schwarz 不等式](../F0_00E2_Cauchy_Schwarz_Bessel_Parseval/index.md#thm-f0-00e2-cauchy-schwarz)から

$$
|F_f(v)|
=
\left|
\int_\Omega fv\,dx
\right|
\le
\|f\|_2\|v\|_2.
$$

[Poincaré 不等式](../GPDE4/index.md#thm-gpde4-poincare)を使うと

$$
|F_f(v)|
\le
C_P
\|f\|_2
\|\nabla v\|_2.
$$

すなわち

$$
|F_f(v)|
\le
C_P
\|f\|_2
\|v\|_V.
$$

従って $F_f$ は $V$ 上の連続線形汎関数です。

[dual norm の定義](../F0_02C2_線形汎関数_双対空間_Riesz/index.md#def-f0-02c2-dual-norm)から

$$
\|F_f\|_{H^{-1}}
\le
C_P\|f\|_2.
$$
<!-- proof-end -->

この命題により、Poisson の右辺を $L^2$ 関数より広い

$$
F\in H^{-1}(\Omega)
$$

まで自然に拡張できます。

---

## 4. Poisson の変分弱解を定義する

<a id="def-gpde6-poisson-variational"></a>

<!-- formal-statement-start -->
> **定義（Poisson の変分弱解）**  
> $\Omega\subset\mathbb R^d$ を有界開集合とし、$F\in H^{-1}(\Omega)$ とする。
>
> $u\in H_0^1(\Omega)$ が任意の $v\in H_0^1(\Omega)$ に対して

$$
\boxed{
\int_\Omega
\nabla u\cdot\nabla v\,dx
=
F(v)
}
$$

> を満たすとき、$u$ を零 Dirichlet Poisson 問題の **変分弱解** と呼ぶ。
<!-- formal-statement-end -->

この定義では

$$
\Delta u
$$

を関数として要求していません。

さらに境界条件

$$
u=0
\quad\text{on }\partial\Omega
$$

も pointwise に書いていません。

境界条件は

$$
u\in H_0^1(\Omega)
$$

という **解空間の選択そのもの** に組み込まれています。

### 具体例：区間上の $f=1$

$\Omega=(0,1)$ とし

$$
u(x)
=
\frac{x(1-x)}{2}
$$

とします。

すると

$$
u(0)=u(1)=0
$$

であり、GPDE4 の区間版 zero-trace characterization から

$$
u\in H_0^1(0,1).
$$

また

$$
u'(x)
=
\frac12-x,
\qquad
-u''(x)=1.
$$

$\varphi\in C_c^\infty(0,1)$ なら一変数の部分積分から

$$
\int_0^1
u'\varphi'\,dx
=
\int_0^1
\varphi\,dx.
$$

一般の $v\in H_0^1(0,1)$ に対しては

$$
\varphi_n\in C_c^\infty(0,1),
\qquad
\varphi_n\to v
\quad\text{in }H^1
$$

と取り、両辺を極限へ移せます。

従って

$$
\int_0^1
u'v'\,dx
=
\int_0^1
v\,dx
$$

が全ての $v\in H_0^1(0,1)$ で成り立ちます。

<!-- definition-example-start: def-gpde6-poisson-variational -->
**定義の確認**

上の $u=x(1-x)/2$ は

$$
u\in H_0^1(0,1)
$$

を満たし、全ての $v\in H_0^1(0,1)$ に対して

$$
\int_0^1u'v'\,dx
=
\int_0^1v\,dx.
$$

したがって $F(v)=\int_0^1v\,dx$ に対する変分弱解です。

ここでは二階微分 $u''$ を定義の中では要求していません。
<!-- definition-example-end -->

---

## 5. 古典解から弱形式へは本当に降りられる

<a id="thm-gpde6-classical-to-variational"></a>

<!-- formal-statement-start -->
> **定理（古典 Poisson 解から変分弱解）**  
> $\Omega\subset\mathbb R^d$ を有界開集合とする。
>
> $u\in C^2(\Omega)\cap H_0^1(\Omega)$、$f\in L^2(\Omega)$ が

$$
-\Delta u=f
\quad\text{in }\Omega
$$

> を pointwise に満たすとする。
>
> このとき任意の $v\in H_0^1(\Omega)$ に対して

$$
\boxed{
\int_\Omega
\nabla u\cdot\nabla v\,dx
=
\int_\Omega
fv\,dx
}
$$

> が成り立つ。
>
> 特に $u$ は $F_f$ に対する変分弱解である。
<!-- formal-statement-end -->

### なぜ最初は $C_c^\infty$ だけでよいのか

$H_0^1$ は [定義](../GPDE4/index.md#def-gpde4-h01)そのものが

$$
C_c^\infty(\Omega)
$$

の $H^1$ 閉包です。

したがって、まず内部支持の滑らかな test function で恒等式を示し、その後連続性で閉包へ延ばせば十分です。

<!-- proof-start -->
### 証明

まず $\varphi\in C_c^\infty(\Omega)$ を取ります。

$\varphi$ の support は $\Omega$ の内部に compact に含まれるため、各座標方向の部分積分で境界項は生じません。

従って

$$
\int_\Omega
(-\partial_{ii}u)\varphi\,dx
=
\int_\Omega
\partial_i u\,\partial_i\varphi\,dx.
$$

$i=1,\dots,d$ で和を取ると

$$
\int_\Omega
(-\Delta u)\varphi\,dx
=
\int_\Omega
\nabla u\cdot\nabla\varphi\,dx.
$$

$-\Delta u=f$ なので

$$
\int_\Omega
\nabla u\cdot\nabla\varphi\,dx
=
\int_\Omega
f\varphi\,dx.
$$

次に $v\in H_0^1(\Omega)$ を取ります。

[H_0^1 の閉包定義](../GPDE4/index.md#def-gpde4-h01)から

$$
\varphi_n\in C_c^\infty(\Omega),
\qquad
\varphi_n\to v
\quad\text{in }H^1(\Omega)
$$

となる列を取れます。

左辺について [Cauchy--Schwarz 不等式](../F0_00E2_Cauchy_Schwarz_Bessel_Parseval/index.md#thm-f0-00e2-cauchy-schwarz)から

$$
\left|
\int_\Omega
\nabla u\cdot
(\nabla\varphi_n-\nabla v)\,dx
\right|
\le
\|\nabla u\|_2
\|\nabla\varphi_n-\nabla v\|_2
\to0.
$$

右辺についても

$$
\left|
\int_\Omega
f(\varphi_n-v)\,dx
\right|
\le
\|f\|_2
\|\varphi_n-v\|_2
\to0.
$$

従って $n\to\infty$ とすると

$$
\int_\Omega
\nabla u\cdot\nabla v\,dx
=
\int_\Omega
fv\,dx.
$$
<!-- proof-end -->

### bounded Lipschitz domain なら通常の零境界値から $H_0^1$ が出る

$\Omega$ が bounded Lipschitz domain で

$$
u\in C^2(\overline\Omega),
\qquad
u=0
\quad\text{on }\partial\Omega
$$

なら通常の境界制限は trace と一致します。

従って

$$
\operatorname{Tr}u=0.
$$

GPDE4 の [H_0^1 と zero trace の同一視](../GPDE4/index.md#thm-gpde4-h01-trace-kernel)から

$$
u\in H_0^1(\Omega).
$$

したがって通常の古典的な零 Dirichlet 解は、上の定理の仮定へ入ります。

---

## 6. distributional solution と変分弱解はどこが違うか

GPDE1 では [Poisson 方程式の distributional solution](../GPDE1/index.md#def-gpde1-distributional-poisson)を定義しました。

そこでは test function は

$$
\varphi\in C_c^\infty(\Omega)
$$

です。

一方、本章の変分弱解では

$$
v\in H_0^1(\Omega)
$$

まで test space を広げています。

さらに

$$
u\in H_0^1(\Omega)
$$

という境界条件も要求しています。

したがって

$$
\text{distributional equation}
$$

と

$$
\text{variational boundary-value problem}
$$

は同じ言葉ではありません。

ただし $u\in H_0^1$ と $f\in L^2$ が既に分かっていれば、二つは同値になります。

<a id="thm-gpde6-distributional-variational"></a>

<!-- formal-statement-start -->
> **定理（distributional solution と変分弱解の同値）**  
> $\Omega\subset\mathbb R^d$ を有界開集合とし

$$
u\in H_0^1(\Omega),
\qquad
f\in L^2(\Omega)
$$

> とする。
>
> このとき次は同値である。
>
> 1. $u$ は

$$
-\Delta u=f
$$

> の distributional solution である。
>
> 2. 任意の $v\in H_0^1(\Omega)$ に対して

$$
\int_\Omega
\nabla u\cdot\nabla v\,dx
=
\int_\Omega
fv\,dx
$$

> が成り立つ。
<!-- formal-statement-end -->

### 証明の見取り図

distributional equation は $C_c^\infty$ 上の等式です。

一方、$H_0^1$ は $C_c^\infty$ の閉包です。

従って

$$
\boxed{
\text{弱微分の積分公式}
+
\text{密度}
}
$$

だけで test space を広げられます。

<!-- proof-start -->
### 証明

まず 2 を仮定します。

任意の $\varphi\in C_c^\infty(\Omega)$ は $H_0^1(\Omega)$ に属するので

$$
\int_\Omega
\nabla u\cdot\nabla\varphi\,dx
=
\int_\Omega
f\varphi\,dx.
$$

$u\in H^1$ なので各 $\partial_i u$ は weak derivative です。

[weak derivative の定義](../GPDE2/index.md#def-gpde2-weak-derivative)から

$$
\int_\Omega
\partial_i u\,\partial_i\varphi\,dx
=
-
\int_\Omega
u\,\partial_{ii}\varphi\,dx.
$$

和を取ると

$$
\int_\Omega
\nabla u\cdot\nabla\varphi\,dx
=
-
\int_\Omega
u\Delta\varphi\,dx.
$$

従って

$$
-
\int_\Omega
u\Delta\varphi\,dx
=
\int_\Omega
f\varphi\,dx.
$$

これは

$$
-\Delta u=f
$$

の distributional equation です。

逆に 1 を仮定します。

distributional equation と [weak derivative の定義](../GPDE2/index.md#def-gpde2-weak-derivative)から、任意の $\varphi\in C_c^\infty(\Omega)$ に対して

$$
\int_\Omega
\nabla u\cdot\nabla\varphi\,dx
=
\int_\Omega
f\varphi\,dx
$$

が成り立ちます。

任意の $v\in H_0^1(\Omega)$ を取り

$$
\varphi_n\in C_c^\infty(\Omega),
\qquad
\varphi_n\to v
\quad\text{in }H^1
$$

とします。

[Cauchy--Schwarz 不等式](../F0_00E2_Cauchy_Schwarz_Bessel_Parseval/index.md#thm-f0-00e2-cauchy-schwarz)により

$$
\left|
\int_\Omega
\nabla u\cdot
(\nabla\varphi_n-\nabla v)\,dx
\right|
\le
\|\nabla u\|_2
\|\nabla\varphi_n-\nabla v\|_2
\to0.
$$

同じく

$$
\left|
\int_\Omega
f(\varphi_n-v)\,dx
\right|
\le
\|f\|_2
\|\varphi_n-v\|_2
\to0.
$$

従って極限を取れば

$$
\int_\Omega
\nabla u\cdot\nabla v\,dx
=
\int_\Omega
fv\,dx.
$$
<!-- proof-end -->

この定理で重要なのは、distributional equation だけから零境界条件が出たわけではないことです。

$$
u\in H_0^1(\Omega)
$$

を別に仮定したからこそ、零 Dirichlet 問題として同値になっています。

---

## 7. PDE を抽象方程式 $a(u,v)=F(v)$ にする

ここから実数値関数を考えます。

実 norm 空間 $V$ 上の双線形写像

$$
a:V\times V\to\mathbb R
$$

を考えます。

<a id="def-gpde6-bounded-bilinear"></a>

<!-- formal-statement-start -->
> **定義（bounded bilinear form）**  
> norm 空間 $V$ 上の双線形形式

$$
a:V\times V\to\mathbb R
$$

> に対し、ある定数 $M>0$ が存在して任意の $u,v\in V$ について

$$
\boxed{
|a(u,v)|
\le
M\|u\|_V\|v\|_V
}
$$

> が成り立つとき、$a$ を bounded bilinear form と呼ぶ。
<!-- formal-statement-end -->

<!-- definition-example-start: def-gpde6-bounded-bilinear -->
**定義の確認**

$V=\mathbb R$、$\|u\|_V=|u|$ とし

$$
a(u,v)=uv
$$

とします。

このとき

$$
|a(u,v)|
=
|u||v|
=
\|u\|_V\|v\|_V.
$$

従って $M=1$ で bounded です。
<!-- definition-example-end -->

<a id="def-gpde6-coercive"></a>

<!-- formal-statement-start -->
> **定義（coercive bilinear form）**  
> norm 空間 $V$ 上の双線形形式 $a$ に対し、ある定数 $\alpha>0$ が存在して任意の $v\in V$ について

$$
\boxed{
a(v,v)
\ge
\alpha\|v\|_V^2
}
$$

> が成り立つとき、$a$ を coercive であるという。
<!-- formal-statement-end -->

<!-- definition-example-start: def-gpde6-coercive -->
**定義の確認**

同じく $V=\mathbb R$、$a(u,v)=uv$ とすると

$$
a(v,v)
=
v^2
=
\|v\|_V^2.
$$

従って $\alpha=1$ で coercive です。

一方

$$
a(u,v)=0
$$

なら $a(v,v)=0$ なので、非零 $v$ に対して正の $\alpha$ を選べません。
<!-- definition-example-end -->

boundedness は

$$
\text{入力が少し変われば値も少ししか変わらない}
$$

ことを表します。

coercivity は

$$
\text{energy が norm を下から押さえる}
$$

ことを表します。

存在・一意性では、この「下から押さえる」性質が決定的に効きます。

---

## 8. Poisson の双線形形式は最もきれいな例である

$V=H_0^1(\Omega)$ に勾配 norm

$$
\|v\|_V=\|\nabla v\|_2
$$

を入れます。

Poisson form を

$$
a(u,v)
=
\int_\Omega
\nabla u\cdot\nabla v\,dx
$$

とします。

<a id="prop-gpde6-poisson-form"></a>

<!-- formal-statement-start -->
> **命題（Poisson form の boundedness と coercivity）**  
> $\Omega\subset\mathbb R^d$ を有界開集合とし

$$
V=H_0^1(\Omega),
\qquad
\|v\|_V=\|\nabla v\|_2
$$

> とする。
>
> Poisson form

$$
a(u,v)
=
\int_\Omega
\nabla u\cdot\nabla v\,dx
$$

> は bounded かつ coercive であり

$$
\boxed{
|a(u,v)|
\le
\|u\|_V\|v\|_V
}
$$

> および

$$
\boxed{
a(v,v)
=
\|v\|_V^2
}
$$

> が成り立つ。
>
> 通常の $H^1$ norm を使う場合も

$$
a(v,v)
\ge
\frac{1}{1+C_P^2}
\|v\|_{H^1(\Omega)}^2
$$

> が成り立つ。
<!-- formal-statement-end -->

### 証明の見取り図

boundedness は [Cauchy--Schwarz 不等式](../F0_00E2_Cauchy_Schwarz_Bessel_Parseval/index.md#thm-f0-00e2-cauchy-schwarz)そのものです。

coercivity は勾配 norm なら等号です。

通常の $H^1$ norm を使う場合だけ [Poincaré 不等式](../GPDE4/index.md#thm-gpde4-poincare)が必要になります。

<!-- proof-start -->
### 証明

[Cauchy--Schwarz 不等式](../F0_00E2_Cauchy_Schwarz_Bessel_Parseval/index.md#thm-f0-00e2-cauchy-schwarz)から

$$
|a(u,v)|
=
\left|
\int_\Omega
\nabla u\cdot\nabla v\,dx
\right|
\le
\|\nabla u\|_2
\|\nabla v\|_2.
$$

従って

$$
|a(u,v)|
\le
\|u\|_V\|v\|_V.
$$

また

$$
a(v,v)
=
\int_\Omega
|\nabla v|^2\,dx
=
\|v\|_V^2.
$$

よって勾配 norm に対して coercivity 定数は

$$
\alpha=1
$$

です。

通常の $H^1$ norm では [Poincaré 不等式](../GPDE4/index.md#thm-gpde4-poincare)から

$$
\|v\|_2^2
\le
C_P^2
\|\nabla v\|_2^2.
$$

したがって

$$
\|v\|_{H^1}^2
=
\|v\|_2^2
+
\|\nabla v\|_2^2
\le
(1+C_P^2)
\|\nabla v\|_2^2.
$$

整理すると

$$
a(v,v)
=
\|\nabla v\|_2^2
\ge
\frac{1}{1+C_P^2}
\|v\|_{H^1}^2.
$$
<!-- proof-end -->

### 具体例：境界条件を外すと coercivity が壊れる

同じ form を $H^1(\Omega)$ 全体で考えます。

非零定数関数

$$
v(x)\equiv1
$$

に対して

$$
a(v,v)
=
\|\nabla v\|_2^2
=
0
$$

ですが

$$
\|v\|_{H^1}>0.
$$

従って $H^1$ 全体では

$$
a(v,v)\ge\alpha\|v\|_{H^1}^2
$$

を正の $\alpha$ で満たせません。

$H_0^1$ を選ぶことは境界条件を表すだけでなく、定数方向を消して coercivity を回復する役割も持っています。

---

## 9. 対称問題では energy を最小化すればよい

Poisson form は対称です。

$$
a(u,v)=a(v,u).
$$

このとき二変数の方程式

$$
a(u,v)=F(v)
\qquad
(\forall v\in V)
$$

を一変数の最小化問題へ変えられます。

<a id="def-gpde6-energy"></a>

<!-- formal-statement-start -->
> **定義（energy functional）**  
> 実 norm 空間 $V$、対称双線形形式 $a:V\times V\to\mathbb R$、線形汎関数 $F:V\to\mathbb R$ に対し

$$
\boxed{
J(v)
=
\frac12a(v,v)-F(v)
}
$$

> を対応する energy functional と呼ぶ。
<!-- formal-statement-end -->

<!-- definition-example-start: def-gpde6-energy -->
**定義の確認**

$V=\mathbb R$、

$$
a(u,v)=uv,
\qquad
F(v)=bv
$$

とします。

すると

$$
J(v)
=
\frac12v^2-bv
=
\frac12(v-b)^2
-
\frac12b^2.
$$

従って最小点は

$$
v=b.
$$

一方

$$
a(v,w)=F(w)
\qquad
(\forall w\in\mathbb R)
$$

は

$$
vw=bw
\qquad
(\forall w)
$$

なので、やはり $v=b$ です。
<!-- definition-example-end -->

Poisson では

$$
J(v)
=
\frac12
\int_\Omega
|\nabla v|^2\,dx
-
F(v)
$$

です。

第一項は Dirichlet energy、第二項は外力が行う仕事に対応します。

<a id="thm-gpde6-variational-principle"></a>

<!-- formal-statement-start -->
> **定理（対称 coercive 問題の変分原理）**  
> $V$ を実 norm 空間とする。
>
> $a:V\times V\to\mathbb R$ を対称かつ coercive な双線形形式、$F\in V^*$ とし

$$
J(v)=\frac12a(v,v)-F(v)
$$

> とする。
>
> $u\in V$ について次は同値である。
>
> 1. 任意の $v\in V$ に対して

$$
a(u,v)=F(v).
$$

> 2. $u$ は $J$ の global minimizer である。
>
> さらに、この minimizer は存在するなら一意である。
<!-- formal-statement-end -->

### 証明の見取り図

核心は energy 差を完全平方の代わりに

$$
J(u+w)-J(u)
$$

として展開することです。

variational equation が一次項を消し、coercivity が残った二次項を正にします。

逆向きは

$$
u+tw
$$

と

$$
u-tw
$$

の両方向へ少し動かし、最小点では一次変化が 0 でなければならないことを式で示します。

<!-- proof-start -->
### 証明

任意の $u,w\in V$ に対し、対称性と双線形性から

$$
a(u+w,u+w)
=
a(u,u)
+
2a(u,w)
+
a(w,w).
$$

従って

$$
J(u+w)-J(u)
=
a(u,w)-F(w)
+
\frac12a(w,w).
$$

まず 1 を仮定します。

このとき

$$
a(u,w)-F(w)=0
$$

なので

$$
J(u+w)-J(u)
=
\frac12a(w,w).
$$

coercivity 定数を $\alpha>0$ とすると

$$
J(u+w)-J(u)
\ge
\frac{\alpha}{2}
\|w\|_V^2.
$$

従って $w\ne0$ なら

$$
J(u+w)>J(u).
$$

よって $u$ は一意な global minimizer です。

逆に 2 を仮定します。

任意の $w\in V$ と $t>0$ に対し、最小性から

$$
0
\le
J(u+tw)-J(u).
$$

展開すると

$$
0
\le
t\left(a(u,w)-F(w)\right)
+
\frac{t^2}{2}a(w,w).
$$

$t>0$ で割れば

$$
0
\le
a(u,w)-F(w)
+
\frac{t}{2}a(w,w).
$$

$t\downarrow0$ とすると

$$
a(u,w)-F(w)\ge0.
$$

同じ議論を $-w$ に適用すると

$$
-a(u,w)+F(w)\ge0.
$$

従って

$$
a(u,w)=F(w).
$$

$w$ は任意だったので 1 が成立します。
<!-- proof-end -->

この定理は「最小化問題を解けば弱解が得られる」ことを示します。

まだ最小点の存在は示していません。

次節で GPDE5 の弱コンパクト性を使い、Poisson energy の最小点を実際に作ります。

---

## 10. 弱極限で norm は突然小さくなっても、大きくはならない

直接法には一つ補題が必要です。

<a id="lem-gpde6-weak-lsc"></a>

<!-- formal-statement-start -->
> **補題（Hilbert norm の弱収束時の norm 評価）**  
> 実 完備内積空間 $H$ で

$$
x_n\rightharpoonup x
$$

> とする。
>
> このとき

$$
\boxed{
\|x\|
\le
\liminf_{n\to\infty}
\|x_n\|
}
$$

> が成り立つ。
<!-- formal-statement-end -->

### なぜこの向きなのか

弱収束では norm convergence は保証されません。

たとえば $\ell^2$ の標準基底は 0 へ弱収束しますが norm は 1 のままです。

したがって

$$
\|x_n\|\to\|x\|
$$

までは言えません。

しかし弱極限の norm が右辺の $\liminf$ を上回ることはありません。

energy の二次項に必要なのは、この片方向だけです。

<!-- proof-start -->
### 証明

内積を展開すると

$$
\|x_n-x\|^2
=
\|x_n\|^2
+
\|x\|^2
-
2\langle x_n,x\rangle.
$$

左辺は非負なので

$$
\|x_n\|^2
\ge
2\langle x_n,x\rangle
-
\|x\|^2.
$$

弱収束から、固定した $x$ に対して

$$
\langle x_n,x\rangle
\to
\langle x,x\rangle
=
\|x\|^2.
$$

従って

$$
\liminf_{n\to\infty}
\|x_n\|^2
\ge
\|x\|^2.
$$

両辺は非負なので平方根を取れば

$$
\|x\|
\le
\liminf_{n\to\infty}
\|x_n\|.
$$
<!-- proof-end -->

この補題により、弱極限へ移ったとき quadratic energy は上へ跳びません。

---

## 11. 直接法で Poisson 弱解を作る

いよいよ存在を示します。

ここでは Lax--Milgram を使いません。

GPDE5 までの道具だけで Poisson の対称問題を閉じます。

<a id="thm-gpde6-poisson-direct-method"></a>

<!-- formal-statement-start -->
> **定理（Poisson 変分問題の直接法）**  
> $\Omega\subset\mathbb R^d$ を有界開集合とし、$F\in H^{-1}(\Omega)$ とする。
>
> このとき一意な

$$
u\in H_0^1(\Omega)
$$

> が存在し、任意の $v\in H_0^1(\Omega)$ に対して

$$
\boxed{
\int_\Omega
\nabla u\cdot\nabla v\,dx
=
F(v)
}
$$

> が成り立つ。
>
> さらに

$$
\boxed{
\|\nabla u\|_2
\le
\|F\|_{H^{-1}}
}
$$

> が成り立つ。
<!-- formal-statement-end -->

### 証明の見取り図

$V=H_0^1(\Omega)$ に勾配 norm を入れ

$$
J(v)
=
\frac12\|v\|_V^2-F(v)
$$

を最小化します。

必要な段階は五つです。

~~~text
1. J は下に有界
2. minimizing sequence は V で有界
3. GPDE5 から弱収束部分列を取る
4. norm の弱収束時の norm 評価と F の弱連続性で極限が最小点
5. 変分原理から最小点が弱解
~~~

存在後の a priori estimate は test function に解自身を入れるだけです。

<!-- proof-start -->
### 証明

$$
V=H_0^1(\Omega),
\qquad
\|v\|_V=\|\nabla v\|_2
$$

と置きます。

GPDE4 の [勾配 norm と H1 norm の同値性](../GPDE4/index.md#cor-gpde4-gradient-norm)と [H_0^1 の完備内積構造](../GPDE4/index.md#prop-gpde4-h01-closed)から、$V$ は内積

$$
(u,v)_V
=
\int_\Omega
\nabla u\cdot\nabla v\,dx
$$

に関する 完備内積空間です。

energy を

$$
J(v)
=
\frac12\|v\|_V^2-F(v)
$$

とします。

[dual norm の基本評価](../F0_02C2_線形汎関数_双対空間_Riesz/index.md#prop-f0-02c2-dual-norm-basic-estimate)から

$$
|F(v)|
\le
\|F\|_{H^{-1}}
\|v\|_V.
$$

$c=\|F\|_{H^{-1}}$、$r=\|v\|_V$ と置くと

$$
J(v)
\ge
\frac12r^2-cr.
$$

右辺は

$$
\frac12(r-c)^2
-
\frac12c^2
$$

に等しいので

$$
J(v)
\ge
-\frac12c^2.
$$

従って

$$
m:=\inf_{v\in V}J(v)
$$

は有限です。

minimizing sequence $(v_n)$ を

$$
J(v_n)\to m
$$

となるように取ります。

十分大きい $n$ で

$$
J(v_n)\le m+1.
$$

一方

$$
\frac12r^2-cr
=
\frac14r^2
+
\frac14(r-2c)^2
-
c^2
\ge
\frac14r^2-c^2.
$$

従って

$$
J(v_n)
\ge
\frac14
\|v_n\|_V^2
-
c^2.
$$

よって

$$
\frac14
\|v_n\|_V^2
\le
m+1+c^2
$$

が十分大きい $n$ で成り立ちます。

有限個の初項を加えても有界性は変わらないので、$(v_n)$ は $V$ で有界です。

GPDE5 の [完備内積空間の有界列から弱収束部分列](../GPDE5/index.md#thm-gpde5-hilbert-weak-subsequence)により、部分列を取り直して

$$
v_n\rightharpoonup u
\quad\text{in }V
$$

となる $u\in V$ が存在します。

[弱収束の汎関数判定](../FA3/index.md#thm-fa3-weak-convergence-criterion)から

$$
F(v_n)\to F(u).
$$

また [Hilbert norm の弱収束時の norm 評価](#lem-gpde6-weak-lsc)から

$$
\|u\|_V^2
\le
\liminf_{n\to\infty}
\|v_n\|_V^2.
$$

従って

$$
J(u)
=
\frac12\|u\|_V^2-F(u)
\le
\liminf_{n\to\infty}
J(v_n)
=
m.
$$

$m$ は infimum なので逆向き

$$
m\le J(u)
$$

も成り立ちます。

従って

$$
J(u)=m.
$$

つまり $u$ は global minimizer です。

[対称 coercive 問題の変分原理](#thm-gpde6-variational-principle)から

$$
\int_\Omega
\nabla u\cdot\nabla v\,dx
=
F(v)
\qquad
(\forall v\in V).
$$

同じ定理から minimizer は一意なので、弱解も一意です。

最後に test function として $v=u$ を選びます。

すると

$$
\|u\|_V^2
=
F(u).
$$

[dual norm の基本評価](../F0_02C2_線形汎関数_双対空間_Riesz/index.md#prop-f0-02c2-dual-norm-basic-estimate)から

$$
F(u)
\le
\|F\|_{H^{-1}}
\|u\|_V.
$$

$\|u\|_V=0$ なら結論は成立します。

$\|u\|_V>0$ なら割って

$$
\|u\|_V
\le
\|F\|_{H^{-1}}.
$$

すなわち

$$
\|\nabla u\|_2
\le
\|F\|_{H^{-1}}.
$$
<!-- proof-end -->

### 何が GPDE5 から必要だったか

この存在証明で GPDE5 を使った場所は一箇所に凝縮されています。

$$
\boxed{
\text{minimizing sequence が有界}
\Longrightarrow
\text{弱収束部分列が取れる}
}
$$

です。

強収束は使っていません。

Poisson energy は凸な quadratic functional なので、弱収束と弱収束時の norm 評価だけで最小点を作れます。

非線形 PDE では、この先さらに compactness による強収束が必要になる場合があります。

---

## 12. 解はデータに連続に依存する

存在と一意性だけでなく、データを少し変えたとき解も少ししか変わらないことを示せます。

<a id="cor-gpde6-poisson-stability"></a>

<!-- formal-statement-start -->
> **系（Poisson 弱解の安定性）**  
> $\Omega\subset\mathbb R^d$ を有界開集合とする。
>
> $F_1,F_2\in H^{-1}(\Omega)$ に対する一意な弱解を $u_1,u_2\in H_0^1(\Omega)$ とする。
>
> このとき

$$
\boxed{
\|\nabla(u_1-u_2)\|_2
\le
\|F_1-F_2\|_{H^{-1}}
}
$$

> が成り立つ。
>
> 特に $f_1,f_2\in L^2(\Omega)$ の場合

$$
\boxed{
\|\nabla(u_1-u_2)\|_2
\le
C_P
\|f_1-f_2\|_2
}
$$

> が成り立つ。
<!-- formal-statement-end -->

<!-- proof-start -->
### 証明

$$
w=u_1-u_2
$$

と置きます。

二つの弱形式を引くと

$$
\int_\Omega
\nabla w\cdot\nabla v\,dx
=
(F_1-F_2)(v)
$$

が全ての $v\in H_0^1(\Omega)$ で成り立ちます。

$v=w$ とすると

$$
\|\nabla w\|_2^2
=
(F_1-F_2)(w).
$$

[dual norm の基本評価](../F0_02C2_線形汎関数_双対空間_Riesz/index.md#prop-f0-02c2-dual-norm-basic-estimate)から

$$
\|\nabla w\|_2^2
\le
\|F_1-F_2\|_{H^{-1}}
\|\nabla w\|_2.
$$

$\|\nabla w\|_2=0$ なら結論は成立します。

正なら割って

$$
\|\nabla w\|_2
\le
\|F_1-F_2\|_{H^{-1}}.
$$

$f_i\in L^2$ の場合は [L2 data は Hminus1 functional を定める命題](#prop-gpde6-l2-hminus1)を差 $f_1-f_2$ に適用すれば

$$
\|F_1-F_2\|_{H^{-1}}
\le
C_P\|f_1-f_2\|_2.
$$

二式を合わせて結論を得ます。
<!-- proof-end -->

この評価は一意性も含んでいます。

実際

$$
F_1=F_2
$$

なら右辺は 0 なので

$$
u_1=u_2
$$

です。

---

## 13. 「弱い」は「近似的」という意味ではない

変分弱解は

$$
a(u,v)=F(v)
$$

を近似的に満たすのではありません。

全ての

$$
v\in H_0^1(\Omega)
$$

に対して **厳密に** 等式を満たします。

弱いのは

$$
\text{方程式を読むために解へ要求する微分階数}
$$

です。

古典形では

$$
u\mapsto\Delta u
$$

を pointwise に読む必要がありました。

変分形では

$$
u\mapsto\nabla u
$$

だけを $L^2$ の意味で持てばよくなります。

その代わり、方程式を

$$
\text{全ての test function との積分恒等式}
$$

として読みます。

---

## 14. 境界条件を変えると空間も変わる

### 14.1 非零 Dirichlet 条件

もし

$$
u=g
\quad\text{on }\partial\Omega
$$

なら、一般に $u$ 自身は $H_0^1$ に入りません。

境界データを実現する

$$
G\in H^1(\Omega)
$$

が取れて

$$
\operatorname{Tr}G=g
$$

なら

$$
u=G+w,
\qquad
w\in H_0^1(\Omega)
$$

と分解します。

Poisson form では

$$
a(w,v)
=
F(v)-a(G,v)
$$

となり、未知量 $w$ は再び $H_0^1$ に戻ります。

一般の trace data をどの空間から取るべきかは分数階 Sobolev 空間へつながるため、本系列ではこの lifting の構造だけを押さえます。

### 14.2 Neumann 条件

Neumann 問題では trial space を $H^1(\Omega)$ に取るのが自然です。

しかし定数関数に対して

$$
\nabla v=0
$$

なので Poisson form は定数方向を制御できません。

したがって

$$
a(v,v)
=
\|\nabla v\|_2^2
$$

は $H^1$ norm に対して coercive ではありません。

これは PDE6 以前の古典論で見た

$$
\text{Neumann 解は定数を除いて一意}
$$

という事実の変分版です。

平均 0 空間や compatibility condition を用いてこの定数 kernel を処理する一般論は GPDE8 で扱います。

---

## 15. GPDE7 へ何を残したか

本章では Poisson の対称 form

$$
a(u,v)
=
\int_\Omega
\nabla u\cdot\nabla v\,dx
$$

について、直接法で存在一意性まで示しました。

しかし一般の楕円型 PDE では

$$
a(u,v)
\ne
a(v,u)
$$

となることがあります。

その場合

$$
J(v)=\frac12a(v,v)-F(v)
$$

を最小化する方法だけでは一般の方程式を表せません。

GPDE7 では対称性を捨て、

$$
\boxed{
\text{bounded}
+
\text{coercive}
}
$$

だけから

$$
a(u,v)=F(v)
$$

の存在一意性を導く Lax--Milgram 定理を証明します。

本章の直接法は特殊ケースの別証明ではなく、

$$
\text{なぜ coercivity が必要なのか}
$$

を energy の形で先に可視化する役割を持っています。

---

## 16. 演習

### Level A

<a id="ex-gpde6-a01"></a>
#### GPDE6-A01 一次元 Poisson 問題の弱形式
- Level: A

$f\in L^2(0,1)$ とし、滑らかな $u$ が

$$
-u''=f
\quad\text{in }(0,1),
\qquad
u(0)=u(1)=0
$$

を満たすとする。

1. $\varphi\in C_c^\infty(0,1)$ に対して

$$
\int_0^1u'\varphi'\,dx
=
\int_0^1f\varphi\,dx
$$

を示せ。
2. $u\in H_0^1(0,1)$ であると仮定し、上式を全ての $v\in H_0^1(0,1)$ へ延長せよ。

<!-- solution-start -->
**詳細解答**

まず $\varphi\in C_c^\infty(0,1)$ を取ります。

部分積分により

$$
\int_0^1
(-u'')\varphi\,dx
=
-
[u'\varphi]_0^1
+
\int_0^1
u'\varphi'\,dx.
$$

$\varphi$ は端点近傍で 0 なので

$$
[u'\varphi]_0^1=0.
$$

$-u''=f$ を代入して

$$
\int_0^1
u'\varphi'\,dx
=
\int_0^1
f\varphi\,dx.
$$

次に $v\in H_0^1(0,1)$ を取ります。

$H_0^1$ の定義から

$$
\varphi_n\in C_c^\infty(0,1),
\qquad
\varphi_n\to v
\quad\text{in }H^1(0,1)
$$

となる列が存在します。

各 $n$ で

$$
\int_0^1
u'\varphi_n'\,dx
=
\int_0^1
f\varphi_n\,dx.
$$

左辺の差は

$$
\left|
\int_0^1
u'(\varphi_n'-v')\,dx
\right|
\le
\|u'\|_2
\|\varphi_n'-v'\|_2
\to0.
$$

右辺の差は

$$
\left|
\int_0^1
f(\varphi_n-v)\,dx
\right|
\le
\|f\|_2
\|\varphi_n-v\|_2
\to0.
$$

従って極限を取って

$$
\boxed{
\int_0^1
u'v'\,dx
=
\int_0^1
fv\,dx
}
$$

を得ます。
<!-- solution-end -->

<a id="ex-gpde6-a02"></a>
#### GPDE6-A02 $L^2$ 外力を $H^{-1}$ で評価する
- Level: A

$\Omega$ を有界開集合、$f\in L^2(\Omega)$ とする。

$$
F(v)=\int_\Omega fv\,dx
$$

について

$$
F\in H^{-1}(\Omega)
$$

および

$$
\|F\|_{H^{-1}}
\le
C_P\|f\|_2
$$

を示せ。

<!-- solution-start -->
**詳細解答**

任意の $v\in H_0^1(\Omega)$ に対して [Cauchy--Schwarz 不等式](../F0_00E2_Cauchy_Schwarz_Bessel_Parseval/index.md#thm-f0-00e2-cauchy-schwarz)から

$$
|F(v)|
\le
\|f\|_2\|v\|_2.
$$

[Poincaré 不等式](../GPDE4/index.md#thm-gpde4-poincare)から

$$
\|v\|_2
\le
C_P\|\nabla v\|_2.
$$

従って

$$
|F(v)|
\le
C_P\|f\|_2
\|\nabla v\|_2.
$$

本章では

$$
\|v\|_V
=
\|\nabla v\|_2
$$

を $H_0^1$ の norm として使っているので

$$
|F(v)|
\le
C_P\|f\|_2\|v\|_V.
$$

よって $F$ は連続線形汎関数で

$$
F\in H^{-1}(\Omega).
$$

さらに $\|v\|_V\le1$ 上で supremum を取れば

$$
\boxed{
\|F\|_{H^{-1}}
\le
C_P\|f\|_2
}.
$$
<!-- solution-end -->

<a id="ex-gpde6-a03"></a>
#### GPDE6-A03 $f=1$ の弱解を直接確認する
- Level: A

$\Omega=(0,1)$ とし

$$
u(x)=\frac{x(1-x)}{2}.
$$

$u$ が

$$
-u''=1,
\qquad
u(0)=u(1)=0
$$

の変分弱解であることを定義から確認せよ。

<!-- solution-start -->
**詳細解答**

まず $u$ は多項式なので $u\in H^1(0,1)$ です。

端点値は

$$
u(0)=u(1)=0.
$$

[区間上の H_0^1 と zero trace](../GPDE4/index.md#thm-gpde4-h01-trace-kernel-interval)から

$$
u\in H_0^1(0,1).
$$

微分すると

$$
u'(x)=\frac12-x,
\qquad
u''(x)=-1.
$$

まず $\varphi\in C_c^\infty(0,1)$ に対して

$$
\int_0^1
u'\varphi'\,dx
=
-
\int_0^1
u''\varphi\,dx
=
\int_0^1
\varphi\,dx.
$$

一般の $v\in H_0^1(0,1)$ を取ります。

$$
\varphi_n\in C_c^\infty(0,1),
\qquad
\varphi_n\to v
\quad\text{in }H^1
$$

と近似します。

[Cauchy--Schwarz 不等式](../F0_00E2_Cauchy_Schwarz_Bessel_Parseval/index.md#thm-f0-00e2-cauchy-schwarz)により両辺は $H^1$ 収束に対して連続なので

$$
\int_0^1
u'v'\,dx
=
\int_0^1
v\,dx.
$$

従って

$$
\boxed{
u(x)=\frac{x(1-x)}2
}
$$

は $F(v)=\int_0^1v\,dx$ に対する変分弱解です。
<!-- solution-end -->

<a id="ex-gpde6-a04"></a>
#### GPDE6-A04 Poisson form の二つの norm での coercivity
- Level: A

$$
a(u,v)
=
\int_\Omega
\nabla u\cdot\nabla v\,dx
$$

を $H_0^1(\Omega)$ 上で考える。

1. 勾配 norm $\|v\|_V=\|\nabla v\|_2$ に対する boundedness 定数と coercivity 定数を求めよ。
2. 通常の $H^1$ norm に対し

$$
a(v,v)
\ge
\frac1{1+C_P^2}
\|v\|_{H^1}^2
$$

を示せ。

<!-- solution-start -->
**詳細解答**

[Cauchy--Schwarz 不等式](../F0_00E2_Cauchy_Schwarz_Bessel_Parseval/index.md#thm-f0-00e2-cauchy-schwarz)から

$$
|a(u,v)|
\le
\|\nabla u\|_2
\|\nabla v\|_2
=
\|u\|_V\|v\|_V.
$$

従って boundedness 定数は

$$
M=1
$$

と取れます。

また

$$
a(v,v)
=
\|\nabla v\|_2^2
=
\|v\|_V^2.
$$

従って coercivity 定数も

$$
\alpha=1
$$

と取れます。

通常の $H^1$ norm については [Poincaré 不等式](../GPDE4/index.md#thm-gpde4-poincare)から

$$
\|v\|_2^2
\le
C_P^2\|\nabla v\|_2^2.
$$

従って

$$
\|v\|_{H^1}^2
=
\|v\|_2^2
+
\|\nabla v\|_2^2
\le
(1+C_P^2)
\|\nabla v\|_2^2.
$$

よって

$$
\boxed{
a(v,v)
=
\|\nabla v\|_2^2
\ge
\frac1{1+C_P^2}
\|v\|_{H^1}^2
}.
$$
<!-- solution-end -->

### Level B

<a id="ex-gpde6-b01"></a>
#### GPDE6-B01 distributional equation から変分弱形式へ
- Level: B

$\Omega$ を有界開集合とし

$$
u\in H_0^1(\Omega),
\qquad
f\in L^2(\Omega)
$$

とする。

$u$ が

$$
-\Delta u=f
$$

を distribution の意味で満たすと仮定する。

任意の $v\in H_0^1(\Omega)$ に対して

$$
\int_\Omega
\nabla u\cdot\nabla v\,dx
=
\int_\Omega
fv\,dx
$$

を示せ。

<!-- solution-start -->
**詳細解答**

distributional equation から、任意の $\varphi\in C_c^\infty(\Omega)$ に対し

$$
-\int_\Omega
u\Delta\varphi\,dx
=
\int_\Omega
f\varphi\,dx
$$

が成り立ちます。

$u\in H^1$ なので、[weak derivative の定義](../GPDE2/index.md#def-gpde2-weak-derivative)から

$$
-\int_\Omega
u\partial_{ii}\varphi\,dx
=
\int_\Omega
\partial_i u\,\partial_i\varphi\,dx.
$$

$i$ で和を取って

$$
\int_\Omega
\nabla u\cdot\nabla\varphi\,dx
=
\int_\Omega
f\varphi\,dx.
$$

次に任意の $v\in H_0^1(\Omega)$ を取ります。

閉包定義により

$$
\varphi_n\in C_c^\infty(\Omega),
\qquad
\varphi_n\to v
\quad\text{in }H^1
$$

と取れます。

左辺は

$$
\left|
\int_\Omega
\nabla u\cdot
(\nabla\varphi_n-\nabla v)\,dx
\right|
\le
\|\nabla u\|_2
\|\nabla\varphi_n-\nabla v\|_2
\to0.
$$

右辺は

$$
\left|
\int_\Omega
f(\varphi_n-v)\,dx
\right|
\le
\|f\|_2
\|\varphi_n-v\|_2
\to0.
$$

従って

$$
\boxed{
\int_\Omega
\nabla u\cdot\nabla v\,dx
=
\int_\Omega
fv\,dx
}
$$

です。

鍵は

$$
C_c^\infty(\Omega)
\text{ で得た等式}
+
H_0^1\text{ への密度}
$$

です。
<!-- solution-end -->

<a id="ex-gpde6-b02"></a>
#### GPDE6-B02 variational equation と energy minimization
- Level: B

$V$ を実 norm 空間、$a$ を対称 coercive bilinear form、$F\in V^*$ とする。

$$
J(v)
=
\frac12a(v,v)-F(v)
$$

と置く。

$u\in V$ が

$$
a(u,v)=F(v)
\qquad
(\forall v\in V)
$$

を満たすなら、任意の $w\in V$ に対して

$$
J(u+w)-J(u)
=
\frac12a(w,w)
$$

を示し、$u$ が $J$ の一意な global minimizer であることを導け。

<!-- solution-start -->
**詳細解答**

対称性と双線形性から

$$
a(u+w,u+w)
=
a(u,u)
+
2a(u,w)
+
a(w,w).
$$

従って

$$
J(u+w)
=
\frac12a(u,u)
+
a(u,w)
+
\frac12a(w,w)
-
F(u)
-
F(w).
$$

一方

$$
J(u)
=
\frac12a(u,u)-F(u).
$$

差を取ると

$$
J(u+w)-J(u)
=
a(u,w)-F(w)
+
\frac12a(w,w).
$$

variational equation により

$$
a(u,w)=F(w)
$$

なので

$$
\boxed{
J(u+w)-J(u)
=
\frac12a(w,w)
}.
$$

coercivity 定数を $\alpha>0$ とすると

$$
a(w,w)
\ge
\alpha\|w\|_V^2.
$$

従って

$$
J(u+w)-J(u)
\ge
\frac{\alpha}{2}
\|w\|_V^2.
$$

$w\ne0$ なら右辺は正です。

よって

$$
J(u+w)>J(u)
$$

が全ての非零 $w$ で成り立ち、$u$ は一意な global minimizer です。
<!-- solution-end -->

<a id="ex-gpde6-b03"></a>
#### GPDE6-B03 データ収束から解の strong convergence を得る
- Level: B

$F_n,F\in H^{-1}(\Omega)$ とし

$$
\|F_n-F\|_{H^{-1}}\to0
$$

とする。

対応する Poisson 弱解を $u_n,u\in H_0^1(\Omega)$ とする。

$$
u_n\to u
\quad\text{in }H_0^1(\Omega)
$$

を勾配 norm で示せ。

<!-- solution-start -->
**詳細解答**

$u_n$ と $u$ の弱形式は

$$
\int_\Omega
\nabla u_n\cdot\nabla v\,dx
=
F_n(v),
$$

$$
\int_\Omega
\nabla u\cdot\nabla v\,dx
=
F(v)
$$

です。

差を取ると

$$
\int_\Omega
\nabla(u_n-u)\cdot\nabla v\,dx
=
(F_n-F)(v).
$$

ここで

$$
v=u_n-u
$$

を選びます。

すると

$$
\|\nabla(u_n-u)\|_2^2
=
(F_n-F)(u_n-u).
$$

[dual norm の定義](../F0_02C2_線形汎関数_双対空間_Riesz/index.md#def-f0-02c2-dual-norm)から

$$
|(F_n-F)(u_n-u)|
\le
\|F_n-F\|_{H^{-1}}
\|\nabla(u_n-u)\|_2.
$$

左の norm が 0 なら結論は成立します。

正なら割って

$$
\|\nabla(u_n-u)\|_2
\le
\|F_n-F\|_{H^{-1}}.
$$

右辺は 0 へ収束するので

$$
\boxed{
\|\nabla(u_n-u)\|_2\to0
}.
$$

GPDE4 の norm 同値性から、これは通常の $H^1$ norm での収束とも同値です。

したがって

$$
u_n\to u
\quad\text{in }H_0^1(\Omega).
$$
<!-- solution-end -->

### Level C

<a id="ex-gpde6-c01"></a>
#### GPDE6-C01 直接法で Poisson 弱解の存在を再構成する
- Level: C

$\Omega\subset\mathbb R^d$ を有界開集合、

$$
V=H_0^1(\Omega),
\qquad
\|v\|_V=\|\nabla v\|_2
$$

とする。

$F\in H^{-1}(\Omega)$ に対して

$$
J(v)
=
\frac12\|v\|_V^2-F(v)
$$

を考える。

次を順に示し、Poisson 変分問題の解の存在一意性を導け。

1. $J$ は下に有界である。
2. minimizing sequence は $V$ で有界である。
3. 弱収束部分列 $v_{n_k}\rightharpoonup u$ を取れる。
4. $u$ が $J$ の minimizer である。
5. $u$ が variational equation を満たす。
6. 解は一意である。

<!-- solution-start -->
**詳細解答**

$c=\|F\|_{H^{-1}}$ と置きます。

### 1. 下からの評価

[dual norm の基本評価](../F0_02C2_線形汎関数_双対空間_Riesz/index.md#prop-f0-02c2-dual-norm-basic-estimate)から

$$
|F(v)|
\le
c\|v\|_V.
$$

$r=\|v\|_V$ と書けば

$$
J(v)
\ge
\frac12r^2-cr.
$$

平方完成すると

$$
\frac12r^2-cr
=
\frac12(r-c)^2
-
\frac12c^2.
$$

従って

$$
J(v)
\ge
-\frac12c^2.
$$

よって

$$
m=\inf_VJ
$$

は有限です。

### 2. minimizing sequence の有界性

$$
J(v_n)\to m
$$

となる minimizing sequence を取ります。

十分大きい $n$ で

$$
J(v_n)\le m+1.
$$

一方

$$
\frac12r^2-cr
=
\frac14r^2
+
\frac14(r-2c)^2
-
c^2
\ge
\frac14r^2-c^2.
$$

したがって

$$
J(v_n)
\ge
\frac14\|v_n\|_V^2-c^2.
$$

ゆえに

$$
\frac14\|v_n\|_V^2
\le
m+1+c^2.
$$

十分大きい $n$ で一様有界です。

有限個の初項も含めれば $(v_n)$ 全体が $V$ で有界です。

### 3. 弱収束部分列

$V$ は勾配内積

$$
(u,v)_V
=
\int_\Omega\nabla u\cdot\nabla v\,dx
$$

について 完備内積空間です。

[完備内積空間の有界列から弱収束部分列](../GPDE5/index.md#thm-gpde5-hilbert-weak-subsequence)を使い、部分列を取り直して

$$
v_{n_k}\rightharpoonup u
\quad\text{in }V
$$

となる $u\in V$ が存在します。

以下添字を簡単にして $v_n\rightharpoonup u$ と書きます。

### 4. 弱極限が minimizer

弱収束の定義から、連続線形汎関数 $F$ に対して

$$
F(v_n)\to F(u).
$$

また [Hilbert norm の弱収束時の norm 評価](#lem-gpde6-weak-lsc)から

$$
\|u\|_V^2
\le
\liminf_{n\to\infty}
\|v_n\|_V^2.
$$

従って

$$
J(u)
=
\frac12\|u\|_V^2-F(u)
\le
\liminf_{n\to\infty}
J(v_n)
=
m.
$$

一方 $m$ は infimum なので

$$
m\le J(u).
$$

よって

$$
J(u)=m.
$$

したがって $u$ は minimizer です。

### 5. minimizer から variational equation

任意の $w\in V$ と $t>0$ に対し

$$
J(u+tw)\ge J(u).
$$

展開すると

$$
0
\le
t\left(
(u,w)_V-F(w)
\right)
+
\frac{t^2}{2}\|w\|_V^2.
$$

$t>0$ で割り、$t\downarrow0$ として

$$
(u,w)_V-F(w)\ge0.
$$

$-w$ を代入すれば逆向きも得られるので

$$
(u,w)_V=F(w).
$$

すなわち

$$
\boxed{
\int_\Omega
\nabla u\cdot\nabla w\,dx
=
F(w)
}
$$

が全ての $w\in V$ で成り立ちます。

### 6. 一意性

$u_1,u_2$ が二つの解とします。

差

$$
z=u_1-u_2
$$

に対して

$$
\int_\Omega
\nabla z\cdot\nabla v\,dx
=
0
$$

が全ての $v\in V$ で成り立ちます。

$v=z$ とすれば

$$
\|\nabla z\|_2^2=0.
$$

従って

$$
\|z\|_V=0.
$$

これは $V$ 上の norm なので

$$
z=0.
$$

よって

$$
\boxed{
u_1=u_2
}.
$$

以上で存在と一意性を再構成できました。
<!-- solution-end -->

---

## 17. まとめ

本章で Poisson 方程式を

$$
-\Delta u=f
$$

という pointwise equation から

$$
\boxed{
\int_\Omega
\nabla u\cdot\nabla v\,dx
=
F(v)
\qquad
(\forall v\in H_0^1(\Omega))
}
$$

へ移しました。

この変換で

- 解に必要な微分階数が二階から一階へ下がる。
- 零 Dirichlet 条件は $H_0^1$ という空間選択へ入る。
- 外力は $H^{-1}=(H_0^1)^*$ で受けられる。
- $L^2$ 外力は Poincaré により $H^{-1}$ データになる。
- distributional equation と variational equation は $u\in H_0^1$, $f\in L^2$ の下で同値になる。
- Poisson form は bounded かつ coercive である。
- 対称性により weak equation は energy minimization と同値になる。
- GPDE5 の弱コンパクト性と norm の弱収束時の norm 評価から minimizer を構成できる。
- coercivity から一意性と stability estimate が得られる。

という一本の構造が得られました。

次の GPDE7 では

$$
a(u,v)
=
F(v)
$$

を Poisson 固有の inner product から切り離し、一般の bounded coercive bilinear form に対して解の存在一意性を保証する Lax--Milgram 定理を証明します。
