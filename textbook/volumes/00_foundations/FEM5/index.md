# FEM5 鞍点問題・Stokes 方程式

<!-- definition-example-audit: strict -->

FEM1–FEM4 では、主に

$$
a(u,v)=F(v)
$$

という **強圧型の一変分方程式**を扱ってきました。

Poisson 問題では、双線形形式の強圧性が

$$
a(v,v)\ge \alpha \|v\|_V^2
$$

を与え、Lax--Milgram、Galerkin 直交性、Céa の補題へ一直線につながりました。

しかし非圧縮流では、速度だけを自由に選べません。

$$
\nabla\cdot u=0
$$

という制約があり、その制約を課すために圧力 $p$ が Lagrange 乗数として現れます。

したがって未知量は

$$
(u,p)
$$

の二つになり、弱形式も

$$
\begin{cases}
a(u,v)+b(v,p)=f(v),\\
b(u,q)=g(q)
\end{cases}
$$

という **鞍点問題**になります。

このとき積空間 $V\times Q$ 上で単純に Lax--Milgram を使おうとしても、

$$
\mathcal A((0,p),(0,p))=0
$$

となり、圧力方向に強圧性がありません。

そこで強圧性の代わりに必要になるのが

$$
\boxed{
\text{制約核上の強圧性}
+
\text{inf-sup 条件}
}
$$

です。

本章では、まず抽象鞍点問題を有限次元の制約付き最小化から導入し、inf-sup 条件が「圧力が速度側から見える」ことを意味すると確認します。次に Babuška--Brezzi 型の存在一意性を、有界な持ち上げ と 制約核上の Lax--Milgram から証明します。

その後、

$$
-\nu\Delta u+\nabla p=f,
\qquad
\nabla\cdot u=0
$$

という定常 Stokes 方程式へ適用し、最後に混合有限要素法、

$$
\begin{pmatrix}
A&B^\mathsf T\\
B&0
\end{pmatrix}
\begin{pmatrix}
U\\ P
\end{pmatrix}
=
\begin{pmatrix}
F\\ G
\end{pmatrix}
$$

というブロック連立方程式、離散 inf-sup 条件、偽圧力モード、Taylor--Hood 要素の位置付けまで進みます。

> **この章の停止線**
>
> 本章は定常 Stokes 型の鞍点構造と混合有限要素法の安定性を扱います。時間依存問題は FEM6、移流卓越と安定化は FEM7 へ送ります。Navier--Stokes の非線形項や Leray--Hopf 弱解は PDE 発展系列の担当です。

---

## 0. 設定：二つの Hilbert 空間を使う

$V,Q$ を実 Hilbert 空間とし、ノルムを

$$
\|\cdot\|_V,
\qquad
\|\cdot\|_Q
$$

とします。

双線形形式

$$
a:V\times V\to\mathbb R,
\qquad
b:V\times Q\to\mathbb R
$$

が有界である、すなわち定数 $M_a,M_b>0$ が存在して

$$
|a(w,v)|
\le
M_a\|w\|_V\|v\|_V,
$$

$$
|b(v,q)|
\le
M_b\|v\|_V\|q\|_Q
$$

とします。

右辺は

$$
f\in V^*,
\qquad
g\in Q^*
$$

です。

---

## 1. 鞍点問題：制約付き最小化から何が出るか

<a id="def-fem5-saddle-point-problem"></a>

<!-- formal-statement-start -->
### 定義（抽象鞍点問題）

$V,Q$ を実 Hilbert 空間、$a:V\times V\to\mathbb R$、$b:V\times Q\to\mathbb R$ を有界双線形形式、$f\in V^*$、$g\in Q^*$ とする。

未知量 $(u,p)\in V\times Q$ に対して

$$
\boxed{
a(u,v)+b(v,p)=f(v)
\qquad
(\forall v\in V)
}
$$

および

$$
\boxed{
b(u,q)=g(q)
\qquad
(\forall q\in Q)
}
$$

を満たす問題を、本章では抽象鞍点問題と呼ぶ。
<!-- formal-statement-end -->

第一式は $u$ の平衡方程式、第二式は $u$ への制約です。

$p$ は制約を実現する Lagrange 乗数に当たります。

<!-- definition-example-start: def-fem5-saddle-point-problem -->
### 例：$\mathbb R^2$ の最小ノルム問題

制約

$$
u_1+u_2=1
$$

の下で

$$
J(u)
=
\frac12(u_1^2+u_2^2)
$$

を最小化します。

Lagrange 関数を

$$
L(u,p)
=
\frac12(u_1^2+u_2^2)
+
p(u_1+u_2-1)
$$

とすると停留条件は

$$
u_1+p=0,
$$

$$
u_2+p=0,
$$

$$
u_1+u_2=1.
$$

したがって

$$
u_1=u_2=-p
$$

であり、

$$
-2p=1.
$$

よって

$$
\boxed{
u=\left(\frac12,\frac12\right),
\qquad
p=-\frac12
}.
$$

行列では

$$
\begin{pmatrix}
1&0&1\\
0&1&1\\
1&1&0
\end{pmatrix}
\begin{pmatrix}
u_1\\u_2\\p
\end{pmatrix}
=
\begin{pmatrix}
0\\0\\1
\end{pmatrix}.
$$

右下が $0$ であることが、後の Stokes 行列と同じ鞍点構造です。
<!-- definition-example-end -->

---

## 2. なぜ積空間で Lax--Milgram を使えないのか

積空間 $V\times Q$ 上で

$$
\mathcal A((u,p),(v,q))
=
a(u,v)+b(v,p)+b(u,q)
$$

と置きたくなります。

しかし圧力方向だけを取ると

$$
\mathcal A((0,p),(0,p))
=
0.
$$

$p\ne0$ でも右辺は $0$ です。

したがって

$$
\mathcal A((u,p),(u,p))
\ge
c\left(
\|u\|_V^2+\|p\|_Q^2
\right)
$$

という積空間上の強圧性は成立しません。

ここで重要なのは、

> 「強圧性がないから解けない」

ではなく、

> 「制約付き問題では、強圧性とは別の安定性機構が必要」

ということです。

圧力 $p$ は自分自身の二次項を持たず、速度側との結合 $b(v,p)$ を通してしか見えません。

従って

$$
p\ne0
\quad\Longrightarrow\quad
b(v,p)\ne0
\text{ となる }v\text{ が十分大きく取れる}
$$

ことを定量化する必要があります。

それが inf-sup 条件です。

---

## 3. 制約核と inf-sup 条件

<a id="def-fem5-kernel-infsup"></a>

<!-- formal-statement-start -->
### 定義（制約核と inf-sup 条件）

有界双線形形式

$$
b:V\times Q\to\mathbb R
$$

に対し、

$$
\boxed{
Z
=
\left\{
v\in V:
b(v,q)=0
\quad
(\forall q\in Q)
\right\}
}
$$

を制約核 とする。

また、ある定数 $\beta>0$ が存在して

$$
\boxed{
\inf_{0\ne q\in Q}
\sup_{0\ne v\in V}
\frac{|b(v,q)|}
{\|v\|_V\|q\|_Q}
\ge
\beta
}
$$

が成り立つとき、$b$ は inf-sup 条件を満たすという。
<!-- formal-statement-end -->

絶対値は、$v$ を $-v$ に替えられる実線形問題では省いても同じ定数になります。

inf-sup 条件は

$$
\boxed{
\text{どの }q\ne0\text{ も速度試験関数から見えなくならない}
}
$$

という条件です。

一方、$Z$ は制約を厳密に満たす速度の空間です。

この $Z$ 上だけで $a$ が強圧的なら、制約を守った方向の未知量を Lax--Milgram で決められます。

<!-- definition-example-start: def-fem5-kernel-infsup -->
### 例：$b(v,q)=q(v_1+v_2)$

$$
V=\mathbb R^2,
\qquad
Q=\mathbb R
$$

に Euclid ノルムを入れ、

$$
b(v,q)
=
q(v_1+v_2)
$$

とします。

まず制約核は

$$
b(v,q)=0
\quad
(\forall q)
$$

と同値に

$$
v_1+v_2=0.
$$

従って

$$
\boxed{
Z=\operatorname{span}\{(1,-1)\}
}.
$$

次に固定した $q$ に対して

$$
\sup_{\|v\|_2=1}|b(v,q)|
=
|q|
\sup_{\|v\|_2=1}|v_1+v_2|.
$$

[Cauchy--Schwarz の不等式](../F0_00E2_Cauchy_Schwarz_Bessel_Parseval/index.md#thm-f0-00e2-cauchy-schwarz)から

$$
|v_1+v_2|
=
|(1,1)\cdot v|
\le
\sqrt2\|v\|_2.
$$

等号は

$$
v=\frac1{\sqrt2}(1,1)
$$

で達成されます。

したがって

$$
\sup_{v\ne0}
\frac{|b(v,q)|}{\|v\|_2}
=
\sqrt2|q|.
$$

よって

$$
\boxed{
\beta=\sqrt2
}.
$$

この例では、圧力方向 $q$ は $(1,1)$ 方向の速度を通して確実に観測されます。
<!-- definition-example-end -->

---

## 4. inf-sup 条件は「制約を満たす lift」を作る

鞍点問題の存在証明で最初に必要なのは、

$$
b(u,q)=g(q)
$$

を満たす $u$ を作ることです。

inf-sup 条件はまさにこのために働きます。

<a id="lem-fem5-bounded-lifting"></a>

<!-- formal-statement-start -->
### 補題（inf-sup 条件による 有界な持ち上げ）

$V,Q$ を実 Hilbert 空間とし、$b:V\times Q\to\mathbb R$ を有界双線形形式とする。

$b$ が定数 $\beta>0$ で inf-sup 条件

$$
\inf_{0\ne q\in Q}
\sup_{0\ne v\in V}
\frac{|b(v,q)|}
{\|v\|_V\|q\|_Q}
\ge
\beta
$$

を満たすとする。

このとき任意の $g\in Q^*$ に対し、ある $u_g\in V$ が存在して

$$
b(u_g,q)=g(q)
\qquad
(\forall q\in Q)
$$

かつ

$$
\boxed{
\|u_g\|_V
\le
\frac1\beta
\|g\|_{Q^*}
}
$$

を満たす。
<!-- formal-statement-end -->

### 証明の見取り図

各 $q\in Q$ に対し、Riesz 表現により $Tq\in V$ を

$$
(Tq,v)_V=b(v,q)
$$

で定めます。

inf-sup 条件は

$$
\|Tq\|_V
\ge
\beta\|q\|_Q
$$

そのものです。

そこで $Q$ 上に

$$
c(p,q)
=
(Tp,Tq)_V
$$

を作ると、

$$
c(q,q)
=
\|Tq\|_V^2
\ge
\beta^2\|q\|_Q^2
$$

となり、今度は普通の Lax--Milgram が使えます。

<!-- proof-start -->
### 証明

固定した $q\in Q$ に対して

$$
v\mapsto b(v,q)
$$

は $V$ 上の連続線形汎関数です。

[Riesz 表現定理](../F0_02C2_線形汎関数_双対空間_Riesz/index.md#ref-riesz-representation)により一意な $Tq\in V$ が存在して

$$
(Tq,v)_V
=
b(v,q)
\qquad
(\forall v\in V)
$$

を満たします。

さらに

$$
\|Tq\|_V
=
\sup_{0\ne v\in V}
\frac{|(Tq,v)_V|}{\|v\|_V}
=
\sup_{0\ne v\in V}
\frac{|b(v,q)|}{\|v\|_V}.
$$

inf-sup 条件から

$$
\|Tq\|_V
\ge
\beta\|q\|_Q.
$$

また $b$ の有界性から

$$
\|Tq\|_V
\le
M_b\|q\|_Q.
$$

したがって

$$
c(p,q)
=
(Tp,Tq)_V
$$

は $Q\times Q$ 上の有界双線形形式であり、

$$
c(q,q)
=
\|Tq\|_V^2
\ge
\beta^2\|q\|_Q^2
$$

なので強圧的です。

$g\in Q^*$ に [Lax--Milgram 定理](../GPDE7/index.md#thm-gpde7-lax-milgram)を適用すると、一意な $p_g\in Q$ が存在して

$$
c(p_g,q)
=
g(q)
\qquad
(\forall q\in Q)
$$

を満たします。

ここで

$$
u_g=T p_g
$$

と置きます。

すると

$$
b(u_g,q)
=
b(Tp_g,q)
=
(Tq,Tp_g)_V
=
c(p_g,q)
=
g(q).
$$

従って制約式を満たします。

最後に

$$
\|u_g\|_V^2
=
\|Tp_g\|_V^2
=
c(p_g,p_g)
=
g(p_g)
\le
\|g\|_{Q^*}\|p_g\|_Q.
$$

一方

$$
\beta\|p_g\|_Q
\le
\|Tp_g\|_V
=
\|u_g\|_V.
$$

したがって

$$
\|u_g\|_V^2
\le
\frac1\beta
\|g\|_{Q^*}
\|u_g\|_V.
$$

$u_g=0$ なら結論は自明です。

$u_g\ne0$ なら両辺を $\|u_g\|_V$ で割って

$$
\boxed{
\|u_g\|_V
\le
\frac1\beta
\|g\|_{Q^*}
}.
$$
<!-- proof-end -->

### 何が分かったか

inf-sup 条件は抽象的な「行列が特異でない条件」ではありません。

$$
g
\quad\longmapsto\quad
u_g
$$

という制約の lifting を作り、そのノルムを

$$
1/\beta
$$

で制御します。

$\beta$ が小さいほど、同じ制約を実現するために大きな速度が必要になり、問題は不安定になります。

---

## 5. Babuška--Brezzi 型の存在一意性

次に、制約を満たした後で 制約核上の未知量を決めます。

<a id="thm-fem5-brezzi"></a>

<!-- formal-statement-start -->
### 定理（鞍点問題の Babuška--Brezzi 型存在一意性）

$V,Q$ を実 Hilbert 空間とする。

有界双線形形式

$$
a:V\times V\to\mathbb R,
\qquad
b:V\times Q\to\mathbb R
$$

がそれぞれ定数 $M_a,M_b>0$ で有界とする。

制約核

$$
Z
=
\{v\in V:\ b(v,q)=0\ \forall q\in Q\}
$$

上で、ある $\alpha>0$ に対して

$$
a(z,z)
\ge
\alpha\|z\|_V^2
\qquad
(\forall z\in Z)
$$

が成り立つとする。

さらに $b$ が定数 $\beta>0$ で inf-sup 条件を満たすとする。

このとき任意の

$$
f\in V^*,
\qquad
g\in Q^*
$$

に対し、抽象鞍点問題

$$
a(u,v)+b(v,p)=f(v)
\qquad
(\forall v\in V),
$$

$$
b(u,q)=g(q)
\qquad
(\forall q\in Q)
$$

は一意な解

$$
(u,p)\in V\times Q
$$

を持つ。

さらに解は、$M_a,\alpha,\beta$ のみに依存する定数 $C$ により

$$
\boxed{
\|u\|_V+\|p\|_Q
\le
C\left(
\|f\|_{V^*}+\|g\|_{Q^*}
\right)
}
$$

と安定に評価される。
<!-- formal-statement-end -->

### 証明の見取り図

証明は三段です。

1. inf-sup から $b(u_g,q)=g(q)$ を満たす 持ち上げ $u_g$ を作る。
2. $u=u_g+z$ と置き、$z\in Z$ を 制約核上の Lax--Milgram で決める。
3. 残差
   $$
   r(v)=f(v)-a(u,v)
   $$
   は $Z$ 上で $0$ になるため、inf-sup が作る $Q$ 側の表現から一意な $p$ を回収する。

つまり

$$
\boxed{
\text{inf-sup}
\to
\text{制約を満たす}
\to
\text{制約核上の強圧性}
\to
\text{乗数を回収}
}
$$

です。

<!-- proof-start -->
### 証明

まず [有界な持ち上げ の補題](#lem-fem5-bounded-lifting)から、ある $u_g\in V$ が存在して

$$
b(u_g,q)=g(q)
\qquad
(\forall q\in Q)
$$

かつ

$$
\|u_g\|_V
\le
\beta^{-1}\|g\|_{Q^*}
$$

を満たします。

$Z$ は連続線形汎関数族の核の共通部分なので閉部分空間です。

従って $Z$ 自身も Hilbert 空間です。

$z\in Z$ に対して

$$
a(z,w)
=
f(w)-a(u_g,w)
\qquad
(\forall w\in Z)
$$

を考えます。

右辺は $Z$ 上の連続線形汎関数であり、

$$
|f(w)-a(u_g,w)|
\le
\left(
\|f\|_{V^*}
+
M_a\|u_g\|_V
\right)
\|w\|_V.
$$

$a$ は $Z$ 上で強圧的なので、[Lax--Milgram 定理](../GPDE7/index.md#thm-gpde7-lax-milgram)から一意な $z\in Z$ が存在します。

しかも

$$
\|z\|_V
\le
\frac1\alpha
\left(
\|f\|_{V^*}
+
M_a\|u_g\|_V
\right).
$$

$$
u=u_g+z
$$

と置きます。

$z\in Z$ なので

$$
b(u,q)
=
b(u_g,q)+b(z,q)
=
g(q).
$$

従って第二式は満たされます。

次に残差

$$
r(v)
=
f(v)-a(u,v)
$$

を考えます。

任意の $w\in Z$ に対して

$$
r(w)
=
f(w)-a(u_g+z,w)
=
f(w)-a(u_g,w)-a(z,w)
=
0.
$$

従って $r$ は $Z$ 上で消えます。

[Riesz 表現定理](../F0_02C2_線形汎関数_双対空間_Riesz/index.md#ref-riesz-representation)により、ある $y\in V$ が存在して

$$
r(v)=(y,v)_V
$$

と書けます。

$r|_Z=0$ なので

$$
y\perp Z.
$$

第4節で定義した作用素 $T:Q\to V$ は

$$
(Tq,v)_V=b(v,q)
$$

を満たし、inf-sup 条件から

$$
\|Tq\|_V\ge\beta\|q\|_Q
$$

です。

従って $T$ の値域 は閉です。

また $z\in Z$ なら

$$
(Tq,z)_V=b(z,q)=0
$$

なので

$$
\operatorname{Ran}T
\subset
Z^\perp.
$$

逆に、$y_0\in Z^\perp$ が $\operatorname{Ran}T$ にも直交するとします。

すると全ての $q\in Q$ に対して

$$
0=(Tq,y_0)_V=b(y_0,q).
$$

従って

$$
y_0\in Z.
$$

しかし $y_0\in Z^\perp$ でもあるので

$$
y_0=0.
$$

従って $\operatorname{Ran}T$ は $Z^\perp$ で稠密です。

値域は閉でもあるので

$$
\operatorname{Ran}T=Z^\perp.
$$

したがって $y\in Z^\perp$ に対して一意な $p\in Q$ が存在して

$$
Tp=y.
$$

よって任意の $v\in V$ に対して

$$
b(v,p)
=
(Tp,v)_V
=
(y,v)_V
=
r(v)
=
f(v)-a(u,v).
$$

従って

$$
a(u,v)+b(v,p)=f(v).
$$

これで存在が示されました。

一意性を示します。

$f=0,g=0$ の同次問題を考えます。

第二式から

$$
u\in Z.
$$

第一式に $v=u$ を入れると

$$
a(u,u)+b(u,p)=0.
$$

$u\in Z$ なので $b(u,p)=0$ です。

従って

$$
a(u,u)=0.
$$

制約核上の強圧性から

$$
u=0.
$$

第一式は

$$
b(v,p)=0
\qquad
(\forall v\in V)
$$

となります。

inf-sup 条件から

$$
\beta\|p\|_Q
\le
\sup_{v\ne0}
\frac{|b(v,p)|}{\|v\|_V}
=
0,
$$

ゆえに

$$
p=0.
$$

したがって解は一意です。

安定性については、まず

$$
\|u_g\|_V
\le
\beta^{-1}\|g\|_{Q^*}
$$

および

$$
\|z\|_V
\le
\alpha^{-1}
\left(
\|f\|_{V^*}
+
M_a\beta^{-1}\|g\|_{Q^*}
\right)
$$

なので

$$
\|u\|_V
\le
\frac1\alpha\|f\|_{V^*}
+
\left(
1+\frac{M_a}{\alpha}
\right)
\frac1\beta
\|g\|_{Q^*}.
$$

さらに

$$
\beta\|p\|_Q
\le
\sup_{v\ne0}
\frac{|b(v,p)|}{\|v\|_V}
=
\sup_{v\ne0}
\frac{|f(v)-a(u,v)|}{\|v\|_V}
\le
\|f\|_{V^*}+M_a\|u\|_V.
$$

よって $\|p\|_Q$ も $\|f\|_{V^*}+\|g\|_{Q^*}$ で評価できます。

以上より所要の安定性評価が従います。
<!-- proof-end -->

### Lax--Milgram との違い

Lax--Milgram では

$$
\text{全空間 }V\text{ 上の強圧性}
$$

が中心でした。

鞍点問題では

$$
\boxed{
\text{制約核 }Z\text{ 上の強圧性}
}
$$

で十分です。

その代わり、制約核の外側を制御し、Lagrange 乗数を一意にするために

$$
\boxed{
\text{inf-sup 条件}
}
$$

が必要になります。

これが「一般化された Lax--Milgram 型理論」と呼ばれる理由です。

---

## 6. Stokes 方程式では圧力が Lagrange 乗数になる

$\Omega\subset\mathbb R^d$ を有界連結 Lipschitz 領域とし、

$$
d=2
\quad\text{または}\quad
d=3
$$

とします。

粘性係数を

$$
\nu>0
$$

とします。

定常 Stokes 方程式は

$$
-\nu\Delta u+\nabla p=f
\qquad
\text{in }\Omega,
$$

$$
\nabla\cdot u=0
\qquad
\text{in }\Omega,
$$

$$
u=0
\qquad
\text{on }\partial\Omega
$$

です。

速度空間を

$$
V
=
[H_0^1(\Omega)]^d
$$

とします。

圧力には定数分の不定性があります。

実際、$p$ を $p+C$ に替えても

$$
\nabla(p+C)=\nabla p.
$$

そこで平均を固定して

$$
Q
=
L_0^2(\Omega)
:=
\left\{
q\in L^2(\Omega):
\int_\Omega q\,dx=0
\right\}
$$

とします。

<a id="def-fem5-stokes-weak-form"></a>

<!-- formal-statement-start -->
### 定義（Stokes 方程式の速度–圧力弱形式）

$\Omega\subset\mathbb R^d$ を有界連結 Lipschitz 領域、$\nu>0$ とする。

$$
V=[H_0^1(\Omega)]^d,
\qquad
Q=L_0^2(\Omega)
$$

と置く。

$$
a(u,v)
=
\nu
\int_\Omega
\nabla u:\nabla v\,dx,
$$

$$
b(v,q)
=
-
\int_\Omega
q\,\nabla\cdot v\,dx
$$

と定める。

$f\in V^*$ に対して、$(u,p)\in V\times Q$ が

$$
\boxed{
a(u,v)+b(v,p)=f(v)
\qquad
(\forall v\in V)
}
$$

および

$$
\boxed{
b(u,q)=0
\qquad
(\forall q\in Q)
}
$$

を満たすとき、これを Stokes 方程式の速度–圧力弱形式の解とする。
<!-- formal-statement-end -->

### 強形式から弱形式へ

滑らかな $u,p,v$ を考えます。

運動量方程式へ $v$ を掛けて積分すると

$$
\int_\Omega
(-\nu\Delta u)\cdot v\,dx
+
\int_\Omega
\nabla p\cdot v\,dx
=
f(v).
$$

$v=0$ on $\partial\Omega$ なので部分積分から

$$
\int_\Omega
(-\nu\Delta u)\cdot v\,dx
=
\nu
\int_\Omega
\nabla u:\nabla v\,dx.
$$

また

$$
\int_\Omega
\nabla p\cdot v\,dx
=
-
\int_\Omega
p\,\nabla\cdot v\,dx.
$$

従って第一式が得られます。

非圧縮条件は

$$
\nabla\cdot u=0
$$

なので

$$
-
\int_\Omega
q\,\nabla\cdot u\,dx
=
0
$$

となり、第二式を得ます。

弱形式ではこの二式を Sobolev 空間上の定義として採用します。

<!-- definition-example-start: def-fem5-stokes-weak-form -->
### 例：stream function から divergence-free 速度を作る

$\Omega=(0,1)^2$ とし、

$$
\psi(x,y)
=
x^2(1-x)^2y^2(1-y)^2
$$

とします。

速度を

$$
u
=
\left(
\partial_y\psi,
-\partial_x\psi
\right)
$$

と定めます。

すると

$$
\nabla\cdot u
=
\partial_x\partial_y\psi
-
\partial_y\partial_x\psi
=
0.
$$

また $\psi$ は境界で二重に消えるので、$\partial_x\psi,\partial_y\psi$ も対応する境界上で消え、

$$
u=0
\quad\text{on }\partial\Omega.
$$

従って

$$
u\in [H_0^1(\Omega)]^2
$$

であり、制約核 の具体例になっています。

さらに

$$
p(x,y)=x-\frac12
$$

は

$$
\int_\Omega p\,dx\,dy
=
0
$$

なので

$$
p\in L_0^2(\Omega).
$$

$$
f
=
-\nu\Delta u+\nabla p
$$

と定めれば、$(u,p)$ は滑らかな 製造解 になります。
<!-- definition-example-end -->

---

## 7. Stokes の各仮定を確認する

### 7.1 $a$ の有界性と強圧性

$V$ のノルムを

$$
\|v\|_V
=
\|\nabla v\|_{L^2(\Omega)}
$$

とします。

[Poincaré の不等式](../GPDE4/index.md#thm-gpde4-poincare)により、これは $[H_0^1]^d$ 上の標準 $H^1$ ノルムと同値です。

[Cauchy--Schwarz の不等式](../F0_00E2_Cauchy_Schwarz_Bessel_Parseval/index.md#thm-f0-00e2-cauchy-schwarz)から

$$
|a(u,v)|
\le
\nu
\|\nabla u\|_2
\|\nabla v\|_2
=
\nu
\|u\|_V\|v\|_V.
$$

さらに

$$
a(v,v)
=
\nu
\|\nabla v\|_2^2
=
\nu
\|v\|_V^2.
$$

従って Stokes では $a$ は 制約核上どころか $V$ 全体で強圧的です。

### 7.2 $b$ の有界性

各成分を使うと

$$
|\nabla\cdot v|
\le
\sqrt d\,|\nabla v|
$$

なので

$$
|b(v,q)|
\le
\|q\|_2
\|\nabla\cdot v\|_2
\le
\sqrt d\,
\|q\|_2
\|\nabla v\|_2.
$$

従って $b$ は有界です。

### 7.3 連続 Stokes inf-sup

Stokes 理論の本質的な幾何条件は次です。

<a id="thm-fem5-continuous-stokes-infsup"></a>

<!-- formal-statement-start -->
### 定理（連続 Stokes inf-sup 条件）

$\Omega\subset\mathbb R^d$ を有界連結 Lipschitz 領域とし、

$$
V=[H_0^1(\Omega)]^d,
\qquad
Q=L_0^2(\Omega)
$$

とする。

このとき領域に依存する定数

$$
\beta_\Omega>0
$$

が存在して

$$
\boxed{
\inf_{0\ne q\in Q}
\sup_{0\ne v\in V}
\frac{
\left|
\int_\Omega q\,\nabla\cdot v\,dx
\right|
}{
\|\nabla v\|_{L^2}
\|q\|_{L^2}
}
\ge
\beta_\Omega
}
$$

が成り立つ。
<!-- formal-statement-end -->

### この定理の意味

任意の平均零圧力 $q$ に対して、その圧力を divergence を通して検出する速度試験関数 $v$ が存在します。

同値に、平均零の $q$ に対して

$$
\nabla\cdot v=q
$$

を満たす零境界速度を、ノルム制御付きで構成できます。

この右逆の標準的構成は Bogovskiĭ 型作用素を用います。

> **意図的黒箱**
>
> 一般 Lipschitz 領域上の Bogovskiĭ 作用素の完全構成は、本章の有限要素安定性の射程を大きく超えます。本章では連続 Stokes inf-sup を領域解析の 既知の定理 とし、以後「この定理のどこを使うか」は全て明示します。離散側では連続 inf-sup が自動的には継承されないことが主題です。

---

## 8. Stokes 弱解の存在一意性

<a id="thm-fem5-stokes-wellposedness"></a>

<!-- formal-statement-start -->
### 定理（Stokes 速度–圧力弱解の存在一意性）

$\Omega\subset\mathbb R^d$ を有界連結 Lipschitz 領域、$\nu>0$ とする。

$$
V=[H_0^1(\Omega)]^d,
\qquad
Q=L_0^2(\Omega)
$$

とし、$a,b$ を [Stokes 方程式の速度–圧力弱形式](#def-fem5-stokes-weak-form)で定める。

このとき任意の $f\in V^*$ に対して、一意な

$$
(u,p)\in V\times Q
$$

が存在して

$$
a(u,v)+b(v,p)=f(v)
\qquad
(\forall v\in V),
$$

$$
b(u,q)=0
\qquad
(\forall q\in Q)
$$

を満たす。

さらに定数 $C>0$ が存在して

$$
\boxed{
\|u\|_V+\|p\|_Q
\le
C\|f\|_{V^*}
}
$$

が成り立つ。
<!-- formal-statement-end -->

### 証明の見取り図

前節までで、

- $a$ は有界
- $a$ は $V$ 全体で強圧的
- $b$ は有界
- $b$ は連続 Stokes inf-sup を満たす
- $g=0$

を確認しました。

従って [Babuška--Brezzi 型存在一意性](#thm-fem5-brezzi)をそのまま適用できます。

<!-- proof-start -->
### 証明

第7.1節から

$$
a(v,v)
=
\nu\|v\|_V^2
$$

なので、特に制約核 $Z\subset V$ 上で

$$
a(z,z)
\ge
\nu\|z\|_V^2.
$$

従って 制約核上の強圧性 定数として

$$
\alpha=\nu
$$

を取れます。

第7.2節から $b$ は有界です。

[連続 Stokes inf-sup 条件](#thm-fem5-continuous-stokes-infsup)から、ある $\beta_\Omega>0$ が存在して inf-sup 条件が成り立ちます。

したがって [Babuška--Brezzi 型存在一意性](#thm-fem5-brezzi)を

$$
g=0
$$

として適用できます。

よって一意な $(u,p)\in V\times Q$ が存在し、

$$
\|u\|_V+\|p\|_Q
\le
C\|f\|_{V^*}
$$

を得ます。
<!-- proof-end -->

### 圧力空間を $L_0^2$ にする理由

もし $Q=L^2(\Omega)$ とすると、定数関数 $p=C$ に対して、任意の $v\in H_0^1$ で

$$
b(v,C)
=
-C\int_\Omega\nabla\cdot v\,dx.
$$

零 trace の近似と発散定理から

$$
\int_\Omega\nabla\cdot v\,dx=0.
$$

従って

$$
b(v,C)=0
\qquad
(\forall v).
$$

つまり定数圧力は速度側から全く見えず、inf-sup 定数は $0$ になります。

平均零条件は単なる正規化ではなく、

$$
\boxed{
\text{見えない定数モードを除く}
}
$$

操作です。

---

## 9. 混合有限要素法：連続 inf-sup は自動継承されない

有限次元部分空間

$$
V_h\subset V,
\qquad
Q_h\subset Q
$$

を取ります。

<a id="def-fem5-mixed-fem"></a>

<!-- formal-statement-start -->
### 定義（Stokes 混合有限要素法）

$\Omega\subset\mathbb R^d$ を有界連結 Lipschitz 領域、$\nu>0$ とし、

$
V=[H_0^1(\Omega)]^d,
\qquad
Q=L_0^2(\Omega)
$

とする。

$
a(u,v)
=
\nu\int_\Omega\nabla u:\nabla v\,dx,
\qquad
b(v,q)
=
-\int_\Omega q\,\nabla\cdot v\,dx
$

とし、$f\in V^*$ とする。

有限次元部分空間

$
V_h\subset V,
\qquad
Q_h\subset Q
$

に対して、$(u_h,p_h)\in V_h\times Q_h$ が

$
\boxed{
a(u_h,v_h)+b(v_h,p_h)=f(v_h)
\qquad
(\forall v_h\in V_h)
}
$

および

$
\boxed{
b(u_h,q_h)=0
\qquad
(\forall q_h\in Q_h)
}
$

を満たすとき、これを Stokes 問題の混合有限要素近似とする。
<!-- formal-statement-end -->

<!-- definition-example-start: def-fem5-mixed-fem -->
### 定義の確認：実際の Stokes 空間の有限次元部分空間

$\Omega=(0,1)^2$、$\nu=1$ とします。

まず

$
\chi(x,y)
=
x^2(1-x)^2y^2(1-y)^2
$

から

$
\phi_0
=
\left(
\partial_y\chi,
-\partial_x\chi
\right)
$

を作ります。第6節と同じ計算で

$
\phi_0\in[H_0^1(\Omega)]^2,
\qquad
\nabla\cdot\phi_0=0.
$

さらに

$
w(x,y)=x(1-x)y(1-y),
\qquad
\phi_1=(w,0),
$

$
r(x,y)=x-\frac12
$

と置きます。

$w$ は境界で $0$ なので

$
\phi_1\in[H_0^1(\Omega)]^2.
$

また

$
\int_\Omega r\,dx\,dy
=
\int_0^1\left(x-\frac12\right)dx
=
0
$

だから

$
r\in L_0^2(\Omega).
$

従って

$
V_h=\operatorname{span}\{\phi_0,\phi_1\}
\subset[H_0^1(\Omega)]^2,
$

$
Q_h=\operatorname{span}\{r\}
\subset L_0^2(\Omega)
$

は定義で要求した有限次元部分空間です。

ここで

$
u_h=\phi_0,
\qquad
p_h=r
$

とし、

$
f(v_h)
=
a(\phi_0,v_h)+b(v_h,r)
$

で $f$ を $V_h$ 上に定めます。

$\nabla\cdot\phi_0=0$ なので、任意の $q_h=cr\in Q_h$ に対して

$
b(u_h,q_h)
=
-c\int_\Omega r\,\nabla\cdot\phi_0\,dx
=
0.
$

また $f$ の定義から任意の $v_h\in V_h$ について

$
a(u_h,v_h)+b(v_h,p_h)=f(v_h).
$

従って $(u_h,p_h)$ は [Stokes 混合有限要素法](#def-fem5-mixed-fem)の二式を実際に満たします。

圧力が速度空間から見えていることも確認できます。

$
\partial_xw
=
(1-2x)y(1-y)
$

なので

$
b(\phi_1,r)
=
-
\int_0^1\int_0^1
\left(x-\frac12\right)(1-2x)y(1-y)
\,dx\,dy.
$

ここで

$
\int_0^1
\left(x-\frac12\right)(1-2x)\,dx
=
-\frac16,
$

$
\int_0^1y(1-y)\,dy
=
\frac16.
$

したがって

$
\boxed{
b(\phi_1,r)=\frac1{36}\ne0
}.
$

この例では $Q_h$ の唯一の非零方向が $\phi_1$ を通して検出されます。
<!-- definition-example-end -->

離散制約核 を

$$
Z_h
=
\left\{
v_h\in V_h:
b(v_h,q_h)=0
\quad
(\forall q_h\in Q_h)
\right\}
$$

とします。

また離散 inf-sup 定数を

$$
\boxed{
\beta_h
=
\inf_{0\ne q_h\in Q_h}
\sup_{0\ne v_h\in V_h}
\frac{|b(v_h,q_h)|}
{\|v_h\|_V\|q_h\|_Q}
}
$$

とします。

連続問題で

$$
\beta_\Omega>0
$$

でも、部分空間を選んだだけでは

$$
\beta_h\ge c>0
$$

は自動的には出ません。

ここが Poisson 型適合 FEM との大きな違いです。

Poisson では $V_h\subset V$ なら強圧性がそのまま継承されました。

Stokes では

$$
\boxed{
V_h\subset V,\ Q_h\subset Q
}
$$

だけでは不十分で、

$$
\boxed{
\inf_h\beta_h>0
}
$$

が必要です。

---

## 10. 離散安定性と混合 Céa 型評価

<a id="thm-fem5-discrete-mixed-stability"></a>

<!-- formal-statement-start -->
### 定理（離散 inf-sup による混合有限要素法の安定性と準最良近似）

$V,Q$ を実 Hilbert 空間とし、有界双線形形式

$
a:V\times V\to\mathbb R,
\qquad
b:V\times Q\to\mathbb R
$

と右辺 $f\in V^*$、$g\in Q^*$ に対する抽象鞍点問題の解を $(u,p)\in V\times Q$ とする。

有限次元部分空間

$
V_h\subset V,
\qquad
Q_h\subset Q
$

を取り、

$
Z_h
=
\{v_h\in V_h:
b(v_h,q_h)=0\ \forall q_h\in Q_h\}
$

とする。

$a$ が $Z_h$ 上で、$h$ に依存しない $\alpha_0>0$ により

$
a(z_h,z_h)
\ge
\alpha_0\|z_h\|_V^2
\qquad
(\forall z_h\in Z_h)
$

を満たすとする。

さらに離散 inf-sup 定数

$
\beta_h
=
\inf_{0\ne q_h\in Q_h}
\sup_{0\ne v_h\in V_h}
\frac{|b(v_h,q_h)|}
{\|v_h\|_V\|q_h\|_Q}
$

について、ある $\beta_0>0$ が存在して全ての対象離散化で

$
\beta_h\ge\beta_0
$

とする。

このとき

$
a(u_h,v_h)+b(v_h,p_h)=f(v_h),
\qquad
b(u_h,q_h)=g(q_h)
$

を全ての $v_h\in V_h,q_h\in Q_h$ に対して満たす離散解 $(u_h,p_h)$ は一意に存在する。

さらに $h$ に依存しない定数 $C>0$ が存在して

$$
\boxed{
\|u-u_h\|_V+\|p-p_h\|_Q
\le
C
\left[
\inf_{w_h\in V_h}\|u-w_h\|_V
+
\inf_{r_h\in Q_h}\|p-r_h\|_Q
\right]
}
$$

が成り立つ。
<!-- formal-statement-end -->

### 証明の見取り図

存在一意性は有限次元空間 $V_h,Q_h$ に [Babuška--Brezzi 型定理](#thm-fem5-brezzi)を適用するだけです。

誤差評価では任意の比較関数

$$
w_h\in V_h,
\qquad
r_h\in Q_h
$$

を取り、

$$
\xi_h=u_h-w_h,
\qquad
\eta_h=p_h-r_h
$$

を未知量とみなします。

すると $(\xi_h,\eta_h)$ 自身が、近似誤差

$$
u-w_h,
\qquad
p-r_h
$$

を右辺とする離散鞍点問題を満たします。

離散安定性をそこへ適用すれば終わります。

<!-- proof-start -->
### 証明

まず $V_h,Q_h$ は有限次元 Hilbert 空間です。

仮定より

- $a$ は $Z_h$ 上で一様強圧的
- $b$ は離散 inf-sup 条件を一様に満たす

ので、[Babuška--Brezzi 型存在一意性](#thm-fem5-brezzi)から離散解 $(u_h,p_h)$ は一意に存在します。

次に任意の

$$
w_h\in V_h,
\qquad
r_h\in Q_h
$$

を固定し、

$$
\xi_h=u_h-w_h,
\qquad
\eta_h=p_h-r_h
$$

と置きます。

連続式を $v_h\in V_h$ に適用すると

$$
a(u,v_h)+b(v_h,p)=f(v_h).
$$

離散式は

$$
a(u_h,v_h)+b(v_h,p_h)=f(v_h).
$$

差を取ると

$$
a(u_h-u,v_h)
+
b(v_h,p_h-p)
=
0.
$$

従って

$$
a(\xi_h,v_h)+b(v_h,\eta_h)
=
a(u-w_h,v_h)
+
b(v_h,p-r_h).
$$

右辺の汎関数ノルムは

$$
\le
M_a\|u-w_h\|_V
+
M_b\|p-r_h\|_Q.
$$

連続制約式

$
b(u,q_h)=g(q_h)
$

と離散制約式

$
b(u_h,q_h)=g(q_h)
$

の差を取ると

$
b(u_h-u,q_h)=0
\qquad
(\forall q_h\in Q_h).
$$

従って

$$
b(\xi_h,q_h)
=
b(u-w_h,q_h).
$$

右辺の $Q_h^*$ ノルムは

$$
\le
M_b\|u-w_h\|_V.
$$

離散 Babuška--Brezzi 安定性を $(\xi_h,\eta_h)$ に適用すると

$$
\|\xi_h\|_V+\|\eta_h\|_Q
\le
C
\left(
\|u-w_h\|_V
+
\|p-r_h\|_Q
\right),
$$

ここで $C$ は $M_a,M_b,\alpha_0,\beta_0$ のみに依存し、$h$ には依存しません。

三角不等式から

$$
\|u-u_h\|_V
\le
\|u-w_h\|_V+\|\xi_h\|_V,
$$

$$
\|p-p_h\|_Q
\le
\|p-r_h\|_Q+\|\eta_h\|_Q.
$$

従って

$$
\|u-u_h\|_V+\|p-p_h\|_Q
\le
C'
\left(
\|u-w_h\|_V+\|p-r_h\|_Q
\right).
$$

$w_h,r_h$ は任意なので、それぞれ infimum を取って

$$
\boxed{
\|u-u_h\|_V+\|p-p_h\|_Q
\le
C
\left[
\inf_{w_h\in V_h}\|u-w_h\|_V
+
\inf_{r_h\in Q_h}\|p-r_h\|_Q
\right]
}.
$$
<!-- proof-end -->

### FEM4 との対応

FEM4 では

$$
\text{Céa}
+
\text{補間誤差}
$$

でした。

混合 FEM では

$$
\boxed{
\text{Babuška--Brezzi 安定性}
+
\text{速度近似誤差}
+
\text{圧力近似誤差}
}
$$

になります。

安定性定数に

$$
1/\beta_0
$$

が入るため、離散 inf-sup 定数が $0$ へ落ちると、近似空間が高次でも誤差定数が爆発し得ます。

---

## 11. ブロック行列と Schur 補行列

速度基底を

$$
\{\phi_1,\dots,\phi_n\},
$$

圧力基底を

$$
\{\psi_1,\dots,\psi_m\}
$$

とします。

$$
u_h=\sum_{j=1}^nU_j\phi_j,
\qquad
p_h=\sum_{k=1}^mP_k\psi_k
$$

と書き、

$$
A_{ij}=a(\phi_j,\phi_i),
$$

$$
B_{ki}=b(\phi_i,\psi_k)
$$

と置きます。

すると混合方程式は

<a id="prop-fem5-block-schur"></a>

<!-- formal-statement-start -->
### 命題（混合有限要素行列と Schur 補行列）

有限次元空間 $V_h,Q_h$ の基底をそれぞれ

$
\{\phi_1,\dots,\phi_n\},
\qquad
\{\psi_1,\dots,\psi_m\}
$

とし、

$
A_{ij}=a(\phi_j,\phi_i),
\qquad
B_{ki}=b(\phi_i,\psi_k),
$

$
F_i=f(\phi_i),
\qquad
G_k=g(\psi_k)
$

と定める。

このとき離散鞍点問題は

$
\boxed{
\begin{pmatrix}
A&B^\mathsf T\\
B&0
\end{pmatrix}
\begin{pmatrix}
U\\P
\end{pmatrix}
=
\begin{pmatrix}
F\\G
\end{pmatrix}
}
$

と書ける。

さらに $A$ が対称正定値なら、$U$ を消去して得られる圧力 Schur 補行列

$
\boxed{
S=BA^{-1}B^\mathsf T
}
$

は半正定値である。

$B^\mathsf T$ が単射、すなわち非零圧力モードが全て速度空間から見えるとき、$S$ は正定値である。
<!-- formal-statement-end -->

### 証明の見取り図

$A$ の正定値性は速度エネルギーを測ります。

一方、

$$
P^\mathsf TSP
=
(B^\mathsf TP)^\mathsf T
A^{-1}
(B^\mathsf TP)
$$

なので、Schur 補行列が圧力を制御できるかどうかは

$$
B^\mathsf TP=0
$$

となる非零 $P$ が存在するかに完全に依存します。

これが有限次元 inf-sup の線形代数版です。

<!-- proof-start -->
### 証明

基底係数を第一式へ代入すると、各 $i$ に対して

$$
\sum_{j=1}^nA_{ij}U_j
+
\sum_{k=1}^mB_{ki}P_k
=
F_i.
$$

従って

$$
AU+B^\mathsf TP=F.
$$

第二式から

$$
BU=G.
$$

よってブロック行列表示が得られます。

$A$ が正定値なら可逆なので

$$
U
=
A^{-1}(F-B^\mathsf TP).
$$

第二式へ代入して

$$
BA^{-1}(F-B^\mathsf TP)=G.
$$

従って

$$
BA^{-1}B^\mathsf TP
=
BA^{-1}F-G.
$$

Schur 補行列を

$$
S=BA^{-1}B^\mathsf T
$$

と置きます。

任意の $P$ に対して

$$
P^\mathsf TSP
=
P^\mathsf TBA^{-1}B^\mathsf TP
=
(B^\mathsf TP)^\mathsf T
A^{-1}
(B^\mathsf TP)
\ge
0.
$$

従って $S$ は半正定値です。

さらに $B^\mathsf T$ が単射なら、$P\ne0$ に対して

$$
B^\mathsf TP\ne0.
$$

$A^{-1}$ は正定値なので

$$
P^\mathsf TSP>0.
$$

従って $S$ は正定値です。
<!-- proof-end -->

---

## 12. 偽圧力モード は何が壊れているのか

最小の代数例を見ます。

$$
V_h=\mathbb R^2,
\qquad
Q_h=\mathbb R^2
$$

とし、

$$
B=
\begin{pmatrix}
1&0\\
0&0
\end{pmatrix}.
$$

圧力ベクトル

$$
P=
\begin{pmatrix}
0\\1
\end{pmatrix}
$$

に対して

$$
B^\mathsf TP=0.
$$

つまり第二圧力成分は、どの速度試験関数に対しても全く現れません。

従って

$$
\beta_h=0.
$$

ブロック方程式でも、この圧力成分をいくら変えても第一式は変わりません。

これが 偽圧力モード の本質です。

有限要素法では、速度空間と圧力空間をそれぞれ「高精度そう」に選ぶだけでは足りません。

$$
\boxed{
\text{二つの空間の組合せ}
}
$$

が重要です。

---

## 13. Taylor--Hood 要素の位置付け

三角形または四面体メッシュ上で、古典的な選択の一つが Taylor--Hood 要素です。

典型的には

$$
V_h
=
[\text{連続 }P_2]^d
\cap [H_0^1]^d,
$$

$$
Q_h
=
\text{連続 }P_1
\cap L_0^2
$$

を使います。

速度を圧力より一段高い次数にすることで、標準的な形状正則メッシュ族の下で一様な離散 inf-sup 条件を満たす代表的な安定 組 になります。

一方、

$$
P_1/P_1
$$

の等次数 組 は、安定化なしでは一般に一様 inf-sup 安定ではありません。

ここで重要なのは

> 「$P_2/P_1$ だから魔法のように安定」

ではなく、

> 「有限次元の速度空間が、全ての離散圧力モードを一様な定数で検出できる」

ことです。

Taylor--Hood の離散 inf-sup の完全証明には Fortin 作用素や macroelement 議論など別の有限要素技法が必要になります。

> **本章での扱い**
>
> Taylor--Hood は安定 組 の 代表例 として位置付けます。個々のメッシュ族に対する離散 inf-sup の完全証明は本章の停止線の外です。ここでは、安定 組 を仮定した後の存在一意性・誤差評価・行列構造を完全に追えることを完成条件とします。

---

## 14. まとめ：Poisson 型 FEM から何が増えたか

強圧型問題では

$$
\boxed{
\text{強圧性}
\to
\text{Lax--Milgram}
\to
\text{Céa}
}
$$

でした。

鞍点型問題では

$$
\boxed{
\text{制約核上の強圧性}
+
\text{inf-sup}
\to
\text{Babuška--Brezzi}
\to
\text{混合準最良近似}
}
$$

になります。

Stokes では

$$
u
=
\text{速度},
\qquad
p
=
\text{非圧縮制約の Lagrange 乗数}
$$

です。

有限要素化すると

$$
\begin{pmatrix}
A&B^\mathsf T\\
B&0
\end{pmatrix}
$$

という不定値ブロック行列が現れ、

$$
\beta_h>0
$$

は

- 圧力の一意性
- Schur 補行列の正定値性
- 偽圧力モード の排除
- 誤差定数の一様性

を同時に支えます。

次の FEM6 では、空間離散化を保ったまま時間微分を残す **半離散有限要素法**へ進みます。

---

# 演習

## Level A

<a id="ex-fem5-a01"></a>
### FEM5-A01 制約付き最小化を鞍点系で解く
- Level: A

$$
u_1+u_2=1
$$

の制約の下で

$$
J(u)
=
\frac12(u_1^2+u_2^2)
$$

を最小化する。

1. Lagrange 関数を作れ。
2. 停留条件を三元連立一次方程式として書け。
3. $(u_1,u_2,p)$ を求めよ。

<!-- solution-start -->
**詳細解答**

Lagrange 関数を

$$
L(u_1,u_2,p)
=
\frac12(u_1^2+u_2^2)
+
p(u_1+u_2-1)
$$

とします。

各変数で偏微分すると

$$
\frac{\partial L}{\partial u_1}
=
u_1+p,
$$

$$
\frac{\partial L}{\partial u_2}
=
u_2+p,
$$

$$
\frac{\partial L}{\partial p}
=
u_1+u_2-1.
$$

停留条件は

$$
u_1+p=0,
$$

$$
u_2+p=0,
$$

$$
u_1+u_2=1.
$$

行列では

$$
\begin{pmatrix}
1&0&1\\
0&1&1\\
1&1&0
\end{pmatrix}
\begin{pmatrix}
u_1\\u_2\\p
\end{pmatrix}
=
\begin{pmatrix}
0\\0\\1
\end{pmatrix}.
$$

最初の二式から

$$
u_1=u_2=-p.
$$

第三式へ代入して

$$
-2p=1,
$$

したがって

$$
p=-\frac12.
$$

よって

$$
\boxed{
u_1=u_2=\frac12,
\qquad
p=-\frac12
}.
$$

$u$ は制約直線上で原点に最も近い点になっています。
<!-- solution-end -->

<a id="ex-fem5-a02"></a>
### FEM5-A02 制約核上の強圧性 を確認する
- Level: A

$$
V=\mathbb R^2,
\qquad
Q=\mathbb R
$$

とし、

$$
a(u,v)=u\cdot v,
$$

$$
b(v,q)=q(v_1-v_2)
$$

とする。

1. 制約核 $Z$ を求めよ。
2. $a$ が $Z$ 上で強圧的であり、強圧性定数として $\alpha=1$ を取れることを示せ。

<!-- solution-start -->
**詳細解答**

$Z$ の定義は

$$
Z
=
\{v\in\mathbb R^2:
q(v_1-v_2)=0
\ \forall q\in\mathbb R\}.
$$

全ての $q$ に対して成り立つためには

$$
v_1-v_2=0
$$

が必要十分です。

従って

$$
\boxed{
Z
=
\{(t,t):t\in\mathbb R\}
=
\operatorname{span}\{(1,1)\}
}.
$$

次に任意の $z\in Z$ に対して

$$
a(z,z)
=
z\cdot z
=
\|z\|_2^2.
$$

したがって

$$
a(z,z)
\ge
1\cdot\|z\|_2^2.
$$

よって

$$
\boxed{
\alpha=1
}
$$

を取れます。

実際には $a$ は $\mathbb R^2$ 全体で強圧的なので、当然 制約核上でも強圧的です。
<!-- solution-end -->

<a id="ex-fem5-a03"></a>
### FEM5-A03 inf-sup 定数を手計算する
- Level: A

$$
V=\mathbb R^2,
\qquad
Q=\mathbb R
$$

に Euclid ノルムを入れ、

$$
b(v,q)
=
q(v_1+v_2)
$$

とする。

inf-sup 定数

$$
\beta
=
\inf_{q\ne0}
\sup_{v\ne0}
\frac{|b(v,q)|}{\|v\|_2|q|}
$$

を求めよ。

<!-- solution-start -->
**詳細解答**

固定した $q\ne0$ に対して

$$
\frac{|b(v,q)|}{\|v\|_2|q|}
=
\frac{|v_1+v_2|}{\|v\|_2}.
$$

[Cauchy--Schwarz の不等式](../F0_00E2_Cauchy_Schwarz_Bessel_Parseval/index.md#thm-f0-00e2-cauchy-schwarz)から

$$
|v_1+v_2|
=
|(1,1)\cdot v|
\le
\|(1,1)\|_2\|v\|_2
=
\sqrt2\|v\|_2.
$$

従って

$$
\sup_{v\ne0}
\frac{|v_1+v_2|}{\|v\|_2}
\le
\sqrt2.
$$

一方

$$
v=(1,1)
$$

とすると

$$
\frac{|v_1+v_2|}{\|v\|_2}
=
\frac2{\sqrt2}
=
\sqrt2.
$$

よって supremum は $\sqrt2$ です。

これは $q$ に依存しないので infimum を取っても同じです。

従って

$$
\boxed{
\beta=\sqrt2
}.
$$
<!-- solution-end -->

<a id="ex-fem5-a04"></a>
### FEM5-A04 Stokes 圧力から定数モードを除く理由
- Level: A

$\Omega$ を有界 Lipschitz 領域とし、

$$
V=[H_0^1(\Omega)]^d.
$$

$$
b(v,q)
=
-\int_\Omega q\,\nabla\cdot v\,dx
$$

とする。

1. 定数 $q=C$ に対して $b(v,C)=0$ が全ての $v\in V$ で成り立つ理由を説明せよ。
2. $Q=L^2(\Omega)$ のままでは inf-sup 定数が $0$ になることを示せ。
3. $Q=L_0^2(\Omega)$ とする意味を述べよ。

<!-- solution-start -->
**詳細解答**

まず滑らかな零境界関数 $v$ なら発散定理から

$$
\int_\Omega\nabla\cdot v\,dx
=
\int_{\partial\Omega}v\cdot n\,dS
=
0.
$$

一般の $v\in[H_0^1]^d$ についても、滑らかなコンパクト台関数による $H^1$ 近似から同じ恒等式が従います。

従って定数 $C$ に対して

$$
b(v,C)
=
-C
\int_\Omega\nabla\cdot v\,dx
=
0.
$$

もし $Q=L^2(\Omega)$ とすると、$C\ne0$ を固定して

$$
\sup_{v\ne0}
\frac{|b(v,C)|}
{\|v\|_V\|C\|_{L^2}}
=
0.
$$

従って $q$ に関する infimum も

$$
\boxed{
\beta=0
}
$$

です。

これは定数圧力が速度方程式から全く見えないことを意味します。

そこで

$$
Q
=
L_0^2(\Omega)
=
\left\{
q\in L^2:
\int_\Omega q=0
\right\}
$$

とし、定数方向を除きます。

これにより圧力の「定数を足しても同じ」という不定性を固定し、連続 Stokes inf-sup を正の定数で述べられるようになります。
<!-- solution-end -->

## Level B

<a id="ex-fem5-b01"></a>
### FEM5-B01 Schur 補行列の正定値性
- Level: B

$A\in\mathbb R^{n\times n}$ を対称正定値行列、$B\in\mathbb R^{m\times n}$ とし、

$$
S=BA^{-1}B^\mathsf T
$$

とする。

1. $S$ が対称半正定値であることを示せ。
2. $B^\mathsf T$ が単射なら $S$ が正定値であることを示せ。
3. $B^\mathsf TP=0$ を満たす $P\ne0$ が 偽圧力モード に対応する理由を説明せよ。

<!-- solution-start -->
**詳細解答**

まず

$$
S^\mathsf T
=
(BA^{-1}B^\mathsf T)^\mathsf T
=
BA^{-1}B^\mathsf T
=
S
$$

です。

ここで $A$ が対称正定値なので $A^{-1}$ も対称です。

任意の $P\in\mathbb R^m$ に対し

$$
P^\mathsf TSP
=
P^\mathsf TBA^{-1}B^\mathsf TP.
$$

$$
Y=B^\mathsf TP
$$

と置けば

$$
P^\mathsf TSP
=
Y^\mathsf TA^{-1}Y
\ge
0.
$$

従って $S$ は半正定値です。

次に $B^\mathsf T$ が単射とします。

$P\ne0$ なら

$$
Y=B^\mathsf TP\ne0.
$$

$A^{-1}$ は正定値なので

$$
Y^\mathsf TA^{-1}Y>0.
$$

従って

$$
P^\mathsf TSP>0.
$$

よって

$$
\boxed{
S\text{ は正定値}
}.
$$

逆に $B^\mathsf TP=0$ を満たす $P\ne0$ があると、ブロック第一式の圧力寄与

$$
B^\mathsf TP
$$

は消えます。

したがってその圧力モードを加えても速度方程式は変わらず、圧力を一意に決められません。

これが 偽圧力モード の代数的な形です。
<!-- solution-end -->

<a id="ex-fem5-b02"></a>
### FEM5-B02 離散 inf-sup が 0 になる最小例
- Level: B

$$
V_h=\mathbb R^2,
\qquad
Q_h=\mathbb R^2
$$

とし、

$$
b(v,q)
=
q_1v_1.
$$

1. 行列 $B$ を書け。
2. $q=(0,1)$ が全ての $v$ から見えないことを示せ。
3. 離散 inf-sup 定数 $\beta_h$ を求めよ。
4. 圧力の第二成分が一意に決まらないことを説明せよ。

<!-- solution-start -->
**詳細解答**

標準基底を使うと

$$
b(v,q)
=
q^\mathsf TBv
$$

となる $B$ は

$$
\boxed{
B=
\begin{pmatrix}
1&0\\
0&0
\end{pmatrix}
}.
$$

$$
q=
\begin{pmatrix}
0\\1
\end{pmatrix}
$$

とすると

$$
b(v,q)
=
q_1v_1
=
0
$$

が全ての $v$ で成り立ちます。

従って

$$
\sup_{v\ne0}
\frac{|b(v,q)|}
{\|v\|_2\|q\|_2}
=
0.
$$

infimum は非負なので

$$
\boxed{
\beta_h=0
}.
$$

さらに

$$
B^\mathsf Tq=0.
$$

したがってブロック第一式

$$
AU+B^\mathsf TP=F
$$

では $P_2$ が現れません。

第二式 $BU=G$ にも $P$ 自体は現れないため、$P_2$ は任意に変えられます。

よって圧力は一意ではありません。
<!-- solution-end -->

<a id="ex-fem5-b03"></a>
### FEM5-B03 混合準最良近似評価を再構成する
- Level: B

連続解 $(u,p)\in V\times Q$ と離散解 $(u_h,p_h)\in V_h\times Q_h$ があり、離散 Babuška--Brezzi 安定性

$$
\|w_h\|_V+\|r_h\|_Q
\le
C_{\mathrm{stab}}
\left(
\|F_h\|_{V_h^*}
+
\|G_h\|_{Q_h^*}
\right)
$$

が一様に成り立つとする。

任意の比較関数

$$
v_h\in V_h,
\qquad
q_h\in Q_h
$$

を使って

$$
\|u-u_h\|_V+\|p-p_h\|_Q
\le
C
\left(
\|u-v_h\|_V+\|p-q_h\|_Q
\right)
$$

を導け。

<!-- solution-start -->
**詳細解答**

まず

$$
\xi_h=u_h-v_h,
\qquad
\eta_h=p_h-q_h
$$

と置きます。

連続式と離散式の第一式の差から、任意の $w_h\in V_h$ に対して

$$
a(u_h-u,w_h)
+
b(w_h,p_h-p)
=
0.
$$

従って

$$
a(\xi_h,w_h)+b(w_h,\eta_h)
=
a(u-v_h,w_h)
+
b(w_h,p-q_h).
$$

$a,b$ の有界性から、右辺を $F_h(w_h)$ と書けば

$$
\|F_h\|_{V_h^*}
\le
M_a\|u-v_h\|_V
+
M_b\|p-q_h\|_Q.
$$

次に制約式の差から

$$
b(u_h-u,s_h)=0
\qquad
(\forall s_h\in Q_h).
$$

よって

$$
b(\xi_h,s_h)
=
b(u-v_h,s_h).
$$

右辺を $G_h(s_h)$ と書けば

$$
\|G_h\|_{Q_h^*}
\le
M_b\|u-v_h\|_V.
$$

仮定した離散安定性を $(\xi_h,\eta_h)$ に適用して

$$
\|\xi_h\|_V+\|\eta_h\|_Q
\le
C
\left(
\|u-v_h\|_V+\|p-q_h\|_Q
\right).
$$

最後に

$$
u-u_h
=
(u-v_h)-\xi_h,
$$

$$
p-p_h
=
(p-q_h)-\eta_h
$$

なので三角不等式から

$$
\|u-u_h\|_V+\|p-p_h\|_Q
\le
C'
\left(
\|u-v_h\|_V+\|p-q_h\|_Q
\right).
$$

$v_h,q_h$ は任意なので、各項の infimum を取れば混合準最良近似評価になります。
<!-- solution-end -->

## Level C

<a id="ex-fem5-c01"></a>
### FEM5-C01 有限次元 Stokes 型モデルを最後まで解く
- Level: C

$$
V=\mathbb R^2,
\qquad
Q=\mathbb R
$$

に Euclid ノルムを入れる。

$$
A=
\begin{pmatrix}
2&0\\
0&1
\end{pmatrix},
\qquad
B=
\begin{pmatrix}
1&1
\end{pmatrix},
$$

$$
F=
\begin{pmatrix}
1\\0
\end{pmatrix},
\qquad
G=0
$$

とし、

$$
\begin{pmatrix}
A&B^\mathsf T\\
B&0
\end{pmatrix}
\begin{pmatrix}
U\\P
\end{pmatrix}
=
\begin{pmatrix}
F\\G
\end{pmatrix}
$$

を考える。

1. 制約核 $\ker B$ を求めよ。
2. $a(u,u)=u^\mathsf TAu$ が 制約核上で $\alpha=1$ の強圧性を持つことを示せ。
3. $b(v,q)=qBv$ の inf-sup 定数 $\beta$ を求めよ。
4. Schur 補行列 $S=BA^{-1}B^\mathsf T$ を求めよ。
5. $(U,P)$ を求めよ。
6. この系で速度エネルギーと圧力安定性が別の行列 $A$ と $B$ によって支えられていることを説明せよ。

<!-- solution-start -->
**詳細解答**

まず

$$
BU=0
$$

は

$$
u_1+u_2=0
$$

です。

従って

$$
\boxed{
\ker B
=
\operatorname{span}\{(1,-1)\}
}.
$$

次に任意の $u=(u_1,u_2)$ に対して

$$
a(u,u)
=
u^\mathsf TAu
=
2u_1^2+u_2^2.
$$

したがって

$$
2u_1^2+u_2^2
\ge
u_1^2+u_2^2
=
\|u\|_2^2.
$$

特に 制約核上でも

$$
a(u,u)\ge\|u\|_2^2.
$$

よって

$$
\boxed{
\alpha=1
}
$$

を取れます。

次に

$$
b(v,q)
=
q(v_1+v_2).
$$

固定した $q$ に対して

$$
\sup_{v\ne0}
\frac{|b(v,q)|}{\|v\|_2}
=
|q|
\sup_{v\ne0}
\frac{|v_1+v_2|}{\|v\|_2}
=
\sqrt2|q|.
$$

従って

$$
\boxed{
\beta=\sqrt2
}.
$$

次に

$$
A^{-1}
=
\begin{pmatrix}
1/2&0\\
0&1
\end{pmatrix}.
$$

よって

$$
S
=
BA^{-1}B^\mathsf T
=
\begin{pmatrix}
1&1
\end{pmatrix}
\begin{pmatrix}
1/2&0\\
0&1
\end{pmatrix}
\begin{pmatrix}
1\\1
\end{pmatrix}.
$$

まず

$$
A^{-1}B^\mathsf T
=
\begin{pmatrix}
1/2\\1
\end{pmatrix}
$$

なので

$$
\boxed{
S=\frac32
}.
$$

連立方程式を成分で書くと

$$
2u_1+p=1,
$$

$$
u_2+p=0,
$$

$$
u_1+u_2=0.
$$

第三式から

$$
u_2=-u_1.
$$

第二式から

$$
p=-u_2=u_1.
$$

第一式へ代入して

$$
2u_1+u_1=1.
$$

従って

$$
u_1=\frac13.
$$

よって

$$
u_2=-\frac13,
\qquad
p=\frac13.
$$

したがって

$$
\boxed{
U=
\begin{pmatrix}
1/3\\
-1/3
\end{pmatrix},
\qquad
P=\frac13
}.
$$

最後に構造を整理します。

$A$ は

$$
u^\mathsf TAu
$$

を通して速度方向のエネルギーを制御します。

一方 $B$ は

$$
qBv
$$

を通して圧力が速度試験空間から見えるかを制御します。

$A$ がどれほど正定値でも、$B^\mathsf T$ に非自明な核 があれば圧力は一意になりません。

逆に $B$ が圧力をよく検出しても、$A$ が 制約核上で退化すれば制約を満たす速度方向を制御できません。

従って鞍点問題では

$$
\boxed{
A\text{ 側の 制約核上の強圧性}
}
$$

と

$$
\boxed{
B\text{ 側の inf-sup}
}
$$

の両方が必要です。
<!-- solution-end -->
