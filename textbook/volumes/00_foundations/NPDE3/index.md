# NPDE3 非線形変分法・単調作用素・$p$-Laplacian

GPDE6 では Poisson 方程式

$$
-\Delta u=f
$$

を、Hilbert 空間 $H_0^1(\Omega)$ 上の二次エネルギーと変分方程式へ読み替えました。そこでは双線形形式があり、未知関数 $u$ は一次的に現れます。

しかし非線形楕円型方程式

$$
-\operatorname{div}
\left(
|\nabla u|^{p-2}\nabla u
\right)
=f,
\qquad
1<p<\infty
$$

では、勾配に掛かる係数そのものが $u$ に依存します。$p=2$ なら

$$
|\nabla u|^{p-2}\nabla u
=
\nabla u
$$

なので Poisson 方程式へ戻りますが、$p\ne2$ では Lax--Milgram 型の線形理論をそのまま使えません。

本章では、この「線形性を失った後」に何を残せば存在・一意性を取り戻せるかを追います。

~~~text
Poisson では二次エネルギーを最小化できた
  ↓
p≠2 ではエネルギーが p 乗になり、方程式は非線形になる
  ↓
最小化列を弱極限へ送るには何が要るか
  ↓
反射性 + 弱下半連続性 + 強圧性
  ↓
p-energy の最小化から p-Laplacian の弱解を得る
  ↓
さらに「作用素方程式 Au=f」として見る
  ↓
正定値性の代わりに単調性
  ↓
Browder--Minty 型定理
  ↓
非線形近似列の極限は Minty の方法で同定する
~~~

前提は [GPDE6 の弱形式・変分形式](../GPDE6/index.md)、[FA4 の反射性と弱コンパクト性](../FA4/index.md#def-fa4-reflexive)、[FIX1 の Brouwer 不動点定理](../FIX1/index.md#cor-fix1-brouwer-convex)、[OPT3 の強圧性](../OPT3/index.md#def-opt3-coercivity)です。

以下、$\Omega\subset\mathbb R^d$ は空でない有界開集合、$1<p<\infty$ とし、

$$
q=\frac{p}{p-1}
$$

を共役指数とします。また

$$
X=W_0^{1,p}(\Omega)
$$

と置きます。

---

## 1. $W_0^{1,p}$ では勾配だけで大きさを測れる

GPDE5 で

$$
W_0^{1,p}(\Omega)
=
\overline{C_c^\infty(\Omega)}^{\,W^{1,p}}
$$

を定義しました。

$p=2$ の GPDE4 では Poincaré 不等式を使って $H_0^1$ の大きさを勾配だけで測れました。同じ機構は $1<p<\infty$ でも働きます。

$\Omega$ が有界なので、ある $R>0$ を選んで

$$
\Omega\subset(-R,R)^d
$$

とできます。

まず $\varphi\in C_c^\infty(\Omega)$ を $\mathbb R^d$ 上で0延長します。固定した

$$
x'=(x_2,\ldots,x_d)
$$

に対して、$x_1=-R$ では $\varphi=0$ ですから

$$
\varphi(x_1,x')
=
\int_{-R}^{x_1}
\partial_1\varphi(s,x')\,ds.
$$

Hölder の不等式を使うと

$$
|\varphi(x_1,x')|
\le
(2R)^{1/q}
\left(
\int_{-R}^{R}
|\partial_1\varphi(s,x')|^p\,ds
\right)^{1/p}.
$$

両辺を $p$ 乗して

$$
|\varphi(x_1,x')|^p
\le
(2R)^{p-1}
\int_{-R}^{R}
|\partial_1\varphi(s,x')|^p\,ds.
$$

さらに $x_1$ について $(-R,R)$ 上で積分すると

$$
\int_{-R}^{R}
|\varphi(x_1,x')|^p\,dx_1
\le
(2R)^p
\int_{-R}^{R}
|\partial_1\varphi(s,x')|^p\,ds.
$$

残りの変数 $x'$ でも積分すれば

$$
\|\varphi\|_{L^p(\Omega)}
\le
2R
\|\partial_1\varphi\|_{L^p(\Omega)}
\le
2R
\|\nabla\varphi\|_{L^p(\Omega)}.
$$

$W_0^{1,p}$ は $C_c^\infty(\Omega)$ の $W^{1,p}$ 閉包なので、近似極限へ送ると一般の $u\in W_0^{1,p}(\Omega)$ にも延長できます。

<a id="prop-npde3-p-poincare"></a>
<!-- formal-statement-start -->
> **命題（W01p の p-Poincaré 不等式）**  
> $\Omega\subset\mathbb R^d$ を有界開集合、$1<p<\infty$ とする。このとき $\Omega$ のみに依存する定数 $C_{\Omega,p}>0$ が存在し、任意の $u\in W_0^{1,p}(\Omega)$ に対して

$$
\|u\|_{L^p(\Omega)}
\le
C_{\Omega,p}
\|\nabla u\|_{L^p(\Omega)}
$$

> が成り立つ。
<!-- formal-statement-end -->

この命題により

$$
\|u\|_X
:=
\|\nabla u\|_{L^p(\Omega)}
$$

は $X=W_0^{1,p}(\Omega)$ 上のノルムになり、通常の $W^{1,p}$ ノルムと同値です。本章ではこの勾配ノルムを使います。

### なぜ反射性が要るのか

直接法では、最小化列を「有界だから収束部分列がある」と言いたくなります。しかし無限次元 Banach 空間では、ノルム有界列からノルム収束部分列を一般には取り出せません。

そこで収束を弱収束へ緩めます。FA4 で見たように、反射的 Banach 空間では閉単位球が弱コンパクトです。

$W_0^{1,p}$ が反射的であることも、既習の $L^p$ 双対性から確認できます。

<a id="prop-npde3-w01p-reflexive"></a>
<!-- formal-statement-start -->
> **命題（W01p の反射性）**  
> $\Omega\subset\mathbb R^d$ を有界開集合、$1<p<\infty$ とする。このとき $W_0^{1,p}(\Omega)$ は反射的 Banach 空間である。
<!-- formal-statement-end -->

### 証明の見取り図

$W^{1,p}$ の関数を「関数本体と全ての一階弱微分」の組へ送ります。その像は有限個の $L^p$ の直積の閉部分空間です。$1<p<\infty$ の $L^p$ は MT7 の双対定理から反射的なので、閉部分空間も反射的です。

<!-- proof-start -->
### 証明

$\Omega$ は有限 Lebesgue 測度を持つので $\sigma$ 有限です。MT7 の $L^p$ 双対定理より

$$
(L^p(\Omega))^*
\simeq
L^q(\Omega),
\qquad
q=\frac{p}{p-1}.
$$

$q$ にもう一度同じ定理を適用すると

$$
(L^q(\Omega))^*
\simeq
L^p(\Omega).
$$

この同一視は $L^p$ の標準埋め込みと一致するので、$L^p(\Omega)$ は反射的です。

有限積

$$
E=
L^p(\Omega)^{d+1}
$$

も反射的です。

写像

$$
T:W_0^{1,p}(\Omega)\to E
$$

を

$$
T(u)
=
\left(
u,\partial_1u,\ldots,\partial_du
\right)
$$

で定めます。$E$ に

$$
\|(v_0,\ldots,v_d)\|_E
=
\left(
\sum_{j=0}^d
\|v_j\|_{L^p}^p
\right)^{1/p}
$$

を入れると

$$
\|T(u)\|_E
=
\|u\|_{W^{1,p}}
$$

です。

GPDE3 の完備性と、GPDE5 で $W_0^{1,p}$ が $W^{1,p}$ の閉部分空間として定義されることから、$W_0^{1,p}$ は完備です。したがって等長像 $T(W_0^{1,p})$ は $E$ の閉部分空間です。

最後に、反射的 Banach 空間の閉部分空間 $Y$ も反射的であることを確認します。$E$ の閉単位球は弱コンパクトです。$Y$ はノルム閉線形部分空間なので、Hahn--Banach の分離により弱閉です。従って

$$
B_Y
=
Y\cap B_E
$$

は弱コンパクトです。FA4 の「閉単位球の弱コンパクト性と反射性の同値」から $Y$ は反射的です。

よって $T(W_0^{1,p})$、従って $W_0^{1,p}(\Omega)$ は反射的です。
<!-- proof-end -->

---

## 2. 直接法は「弱極限で最小値を失わない」仕組みである

有限次元では、連続関数をコンパクト集合上で最小化すれば最小値を取ります。

無限次元では、強圧性で最小化列を有界にしても、ノルム位相では閉有界集合がコンパクトとは限りません。そこで

1. 反射性で弱コンパクト性を得る。
2. 弱極限で汎関数値が下がり過ぎないことを要求する。

という二段階を使います。

<a id="def-npde3-weak-lsc"></a>
<!-- formal-statement-start -->
> **定義（弱下半連続汎関数）**  
> $X$ を Banach 空間、$J:X\to(-\infty,+\infty]$ とする。任意のネット $u_\alpha$ と $u\in X$ に対し

$$
u_\alpha\rightharpoonup u
$$

> ならば

$$
J(u)
\le
\liminf_\alpha J(u_\alpha)
$$

> が成り立つとき、$J$ を **弱下半連続** という。
<!-- formal-statement-end -->

<!-- definition-example-start: def-npde3-weak-lsc -->
**定義の確認**

$X$ が Hilbert 空間なら GPDE6 で

$$
u_\alpha\rightharpoonup u
\quad\Longrightarrow\quad
\|u\|
\le
\liminf_\alpha\|u_\alpha\|
$$

を見ました。したがって

$$
J(u)=\|u\|^2
$$

は弱下半連続です。
<!-- definition-example-end -->

強圧性そのものは OPT3 で導入済みです。有限次元に限定された定義ではなく、ノルム空間上の汎関数について

$$
\|u\|_X\to\infty
\quad\Longrightarrow\quad
J(u)\to+\infty
$$

を要求する条件でした。本章ではこの同じ強圧性を Banach 空間上で使います。

例えば $p>1$、$c\ge0$ に対して

$$
J(u)
=
\frac1p\|u\|_X^p
-c\|u\|_X
$$

なら、$r=\|u\|_X$ と置くと

$$
J(u)
=
r
\left(
\frac1p r^{p-1}-c
\right).
$$

$p-1>0$ なので $r\to\infty$ で $J(u)\to+\infty$ となり、OPT3 の定義どおり強圧的です。

ここで Banach 空間一般に使える弱下半連続性を一つ準備します。

<a id="prop-npde3-norm-weak-lsc"></a>
<!-- formal-statement-start -->
> **命題（ノルムは弱下半連続）**  
> $X$ を Banach 空間とする。$u_\alpha\rightharpoonup u$ なら

$$
\|u\|_X
\le
\liminf_\alpha
\|u_\alpha\|_X.
$$
<!-- formal-statement-end -->

### 証明の見取り図

Hahn--Banach により、ノルムは単位双対球上の連続線形汎関数の上限として復元できます。各汎関数は弱収束で値が収束するので、その上限も下半連続になります。

<!-- proof-start -->
### 証明

Hahn--Banach のノルム保存拡張から、各 $x\in X$ に対して

$$
\|x\|_X
=
\sup_{\substack{\ell\in X^*\\ \|\ell\|_{X^*}\le1}}
|\ell(x)|
$$

です。

任意の $\ell\in X^*$、$\|\ell\|\le1$ を固定します。弱収束より

$$
\ell(u_\alpha)\to\ell(u).
$$

従って

$$
|\ell(u)|
=
\lim_\alpha|\ell(u_\alpha)|
\le
\liminf_\alpha\|u_\alpha\|_X.
$$

左辺について単位双対球上の上限を取ると

$$
\|u\|_X
\le
\liminf_\alpha\|u_\alpha\|_X.
$$
<!-- proof-end -->

<a id="thm-npde3-direct-method"></a>
<!-- formal-statement-start -->
> **定理（反射的 Banach 空間上の直接法）**  
> $X$ を反射的 Banach 空間とし、$J:X\to(-\infty,+\infty]$ は $-\infty$ を取らず、ある点で有限値を取るとする。さらに $J$ は下に有界、弱下半連続、強圧的とする。このときある $u\in X$ が存在して

$$
J(u)
=
\inf_{v\in X}J(v)
$$

> が成り立つ。
<!-- formal-statement-end -->

### 証明の見取り図

$m=\inf_XJ$ と置き、

$$
K_n
=
\{v\in X:J(v)\le m+1/n\}
$$

を考えます。強圧性で全ての $K_n$ を一つの大きな弱コンパクト球へ入れ、弱下半連続性で $K_n$ を弱閉にします。$K_n$ は減少列なので、コンパクト性の有限交叉性から共通点が存在します。

<!-- proof-start -->
### 証明

$J$ は下に有界で、どこかで有限なので

$$
-\infty<m:=\inf_{v\in X}J(v)<+\infty.
$$

各 $n\ge1$ に対して

$$
K_n
=
\left\{
v\in X:
J(v)\le m+\frac1n
\right\}
$$

と置きます。$m$ が下限なので $K_n$ は空ではありません。

強圧性より、ある $R>0$ が存在して

$$
\|v\|_X\ge R
\quad\Longrightarrow\quad
J(v)>m+1.
$$

従って全ての $n\ge1$ に対して

$$
K_n\subset B_R
:=
\{v:\|v\|_X\le R\}.
$$

$X$ は反射的なので、FA4 より $B_R$ は弱コンパクトです。

次に $K_n$ が弱閉であることを示します。$v_\alpha\in K_n$ かつ $v_\alpha\rightharpoonup v$ とすると、弱下半連続性より

$$
J(v)
\le
\liminf_\alpha J(v_\alpha)
\le
m+\frac1n.
$$

従って $v\in K_n$ です。

また

$$
K_{n+1}\subset K_n
$$

なので、$\{K_n\}$ は有限交叉性を持つ弱閉集合族です。全て $B_R$ の中にあり、$B_R$ は弱コンパクトなので

$$
\bigcap_{n=1}^\infty K_n
\ne\varnothing.
$$

$u$ をこの共通部分から取ります。全ての $n$ について

$$
m\le J(u)\le m+\frac1n.
$$

$n\to\infty$ とすれば

$$
J(u)=m.
$$

従って $u$ は $J$ の最小化点です。
<!-- proof-end -->

ここでは凸性を仮定していません。凸性は、後で弱下半連続性を作りやすくし、狭義凸性は最小化点の一意性を与えます。

---

## 3. $p$-energy を最小化すると $p$-Laplacian が現れる

$f\in X^*$ を固定します。

<a id="def-npde3-p-energy"></a>
<!-- formal-statement-start -->
> **定義（p-energy）**  
> $\Omega\subset\mathbb R^d$ を有界開集合、$1<p<\infty$、

$$
X=W_0^{1,p}(\Omega)
$$

> とし、$f\in X^*$ とする。$v\in X$ に対して

$$
J_f(v)
=
\frac1p
\int_\Omega
|\nabla v|^p\,dx
-
\langle f,v\rangle
$$

> と定める。この $J_f$ を本章の **$p$-energy** と呼ぶ。
<!-- formal-statement-end -->

<!-- definition-example-start: def-npde3-p-energy -->
**定義の確認：$p=2$**

$p=2$ なら

$$
J_f(v)
=
\frac12
\int_\Omega|\nabla v|^2\,dx
-
\langle f,v\rangle.
$$

これは GPDE6 の Poisson 問題で使った二次エネルギーです。従って $p$-energy は、既習の Poisson エネルギーを $p$ 乗へ拡張したものになっています。
<!-- definition-example-end -->

### 3.1 弱下半連続性

$v_\alpha\rightharpoonup v$ in $X$ とします。勾配を取る写像

$$
D:X\to L^p(\Omega;\mathbb R^d),
\qquad
D(v)=\nabla v
$$

は有界線形なので弱連続です。従って

$$
\nabla v_\alpha
\rightharpoonup
\nabla v
\quad
\text{in }
L^p(\Omega;\mathbb R^d).
$$

ノルムの弱下半連続性から

$$
\|\nabla v\|_{L^p}
\le
\liminf_\alpha
\|\nabla v_\alpha\|_{L^p}.
$$

$t\mapsto t^p$ は $[0,\infty)$ で連続単調増加なので

$$
\|\nabla v\|_{L^p}^p
\le
\liminf_\alpha
\|\nabla v_\alpha\|_{L^p}^p.
$$

一方、$f\in X^*$ なので

$$
\langle f,v_\alpha\rangle
\to
\langle f,v\rangle.
$$

よって $J_f$ は弱下半連続です。

### 3.2 強圧性

双対ノルムの定義から

$$
|\langle f,v\rangle|
\le
\|f\|_{X^*}\|v\|_X.
$$

本章では

$$
\|v\|_X
=
\|\nabla v\|_{L^p}
$$

なので

$$
J_f(v)
\ge
\frac1p\|v\|_X^p
-
\|f\|_{X^*}\|v\|_X.
$$

右辺は $\|v\|_X\to\infty$ で $+\infty$ へ向かうため、$J_f$ は強圧的です。

### 3.3 狭義凸性

$\xi\mapsto|\xi|^p$ は $1<p<\infty$ で狭義凸です。従って $u\ne v$ なら、Poincaré 不等式により $\nabla u$ と $\nabla v$ が正測度集合上で異なり、

$$
\int_\Omega
\left|
(1-\theta)\nabla u+\theta\nabla v
\right|^p dx
<
(1-\theta)
\int_\Omega|\nabla u|^pdx
+
\theta
\int_\Omega|\nabla v|^pdx
$$

が $0<\theta<1$ で成り立ちます。線形項 $-\langle f,v\rangle$ は凸性を変えないので、$J_f$ は狭義凸です。

直接法より最小化点が存在し、狭義凸性より一意です。

次に、その最小化点がどの方程式を満たすかを計算します。

固定した $u,\varphi\in X$ に対し

$$
h(t)
=
J_f(u+t\varphi)
$$

と置きます。

ベクトル $a,b\in\mathbb R^d$ に対して

$$
\frac{|a+tb|^p-|a|^p}{t}
$$

を計算します。関数

$$
s\mapsto|a+stb|^p
$$

に微積分学の基本定理を適用すると

$$
|a+tb|^p-|a|^p
=
\int_0^1
p|a+stb|^{p-2}
(a+stb)\cdot(tb)\,ds.
$$

$t\ne0$ で割ると

$$
\frac{|a+tb|^p-|a|^p}{t}
=
\int_0^1
p|a+stb|^{p-2}
(a+stb)\cdot b\,ds.
$$

$t\to0$ で右辺は

$$
p|a|^{p-2}a\cdot b
$$

へ収束します。

さらに $|t|\le1$ なら

$$
|a+stb|^{p-1}
\le
C_p
\left(
|a|^{p-1}+|b|^{p-1}
\right)
$$

なので、被積分関数の絶対値は

$$
C_p
\left(
|a|^{p-1}|b|
+
|b|^p
\right)
$$

で抑えられます。$a=\nabla u(x)$、$b=\nabla\varphi(x)$ とすれば、第一項は Hölder の不等式で可積分です。

従って優収束定理により積分と $t\to0$ を交換でき、

$$
h'(0)
=
\int_\Omega
|\nabla u|^{p-2}
\nabla u\cdot\nabla\varphi\,dx
-
\langle f,\varphi\rangle.
$$

<a id="thm-npde3-p-energy-euler"></a>
<!-- formal-statement-start -->
> **定理（p-energy の最小化と Euler--Lagrange 方程式）**  
> $\Omega\subset\mathbb R^d$ を有界開集合、$1<p<\infty$、

$$
X=W_0^{1,p}(\Omega),
\qquad
f\in X^*
$$

> とする。$p$-energy $J_f$ は $X$ 上にただ一つの最小化点 $u$ を持つ。その $u$ は任意の $\varphi\in X$ に対して

$$
\boxed{
\int_\Omega
|\nabla u|^{p-2}
\nabla u\cdot\nabla\varphi\,dx
=
\langle f,\varphi\rangle
}
$$

> を満たす。逆に、この等式を満たす $u$ は $J_f$ の最小化点である。
<!-- formal-statement-end -->

### 証明の見取り図

存在は「反射性 + 弱下半連続性 + 強圧性」の直接法、一意性は狭義凸性です。最小化点では任意の直線方向の一変数関数が $t=0$ で最小になるため導関数が0になります。逆向きは凸関数の接線不等式を使います。

<!-- proof-start -->
### 証明

前節までに $X$ は反射的、$J_f$ は弱下半連続かつ強圧的であることを示しました。直接法により最小化点 $u$ が存在します。

また $J_f$ は狭義凸なので、異なる二つの最小化点は存在できません。従って最小化点は一意です。

任意の $\varphi\in X$ を固定し

$$
h(t)=J_f(u+t\varphi)
$$

と置きます。$u$ は $J_f$ の最小化点なので $t=0$ は $h$ の最小点です。上で $h'(0)$ の存在を示したので

$$
h'(0)=0.
$$

従って

$$
\int_\Omega
|\nabla u|^{p-2}
\nabla u\cdot\nabla\varphi\,dx
=
\langle f,\varphi\rangle.
$$

逆に $u$ がこの等式を満たすとします。

関数

$$
\Phi(\xi)=\frac1p|\xi|^p
$$

は凸で微分可能なので、任意の $\xi,\eta\in\mathbb R^d$ に対して接線不等式

$$
\Phi(\eta)
\ge
\Phi(\xi)
+
|\xi|^{p-2}\xi\cdot(\eta-\xi)
$$

が成り立ちます。

$\xi=\nabla u(x)$、$\eta=\nabla v(x)$ として積分すると

$$
\frac1p
\int_\Omega|\nabla v|^pdx
\ge
\frac1p
\int_\Omega|\nabla u|^pdx
+
\int_\Omega
|\nabla u|^{p-2}
\nabla u\cdot
(\nabla v-\nabla u)\,dx.
$$

弱形式を $\varphi=v-u$ に適用すれば

$$
\int_\Omega
|\nabla u|^{p-2}
\nabla u\cdot
(\nabla v-\nabla u)\,dx
=
\langle f,v-u\rangle.
$$

従って

$$
J_f(v)\ge J_f(u).
$$

よって $u$ は最小化点です。
<!-- proof-end -->

---

## 4. 作用素として見ると「正定値性」は「単調性」へ変わる

$p$-energy の最小化だけでも $p$-Laplacian の存在一意性は得られました。

しかし非線形 PDE では、エネルギーが明示的に書けない作用素も現れます。そこで方程式を

$$
A(u)=f
$$

という Banach 空間上の作用素方程式として扱います。

線形 Lax--Milgram では、強圧性

$$
a(u,u)\ge c\|u\|^2
$$

が「同じ方向へ押し返す」性質を与えました。非線形では二点を比較する形へ拡張します。

<a id="def-npde3-monotone-operator"></a>
<!-- formal-statement-start -->
> **定義（単調作用素）**  
> $X$ を実 Banach 空間とし、$A:X\to X^*$ とする。任意の $u,v\in X$ に対して

$$
\langle Au-Av,u-v\rangle
\ge0
$$

> が成り立つとき $A$ を **単調作用素** という。さらに $u\ne v$ なら常に不等号が厳密になるとき、$A$ を狭義単調という。
<!-- formal-statement-end -->

<!-- definition-example-start: def-npde3-monotone-operator -->
**定義の確認：一変数の $p=4$**

$A:\mathbb R\to\mathbb R$ を

$$
A(x)=x^3
$$

とします。このとき

$$
(A(x)-A(y))(x-y)
=
(x^3-y^3)(x-y).
$$

因数分解すると

$$
(x^3-y^3)(x-y)
=
(x-y)^2
(x^2+xy+y^2).
$$

さらに

$$
x^2+xy+y^2
=
\left(x+\frac y2\right)^2
+
\frac34y^2
\ge0.
$$

従って $A$ は単調です。$x\ne y$ なら積は正なので狭義単調です。
<!-- definition-example-end -->

作用素の存在定理には、直線方向に沿った最低限の連続性も使います。

<a id="def-npde3-hemicontinuous"></a>
<!-- formal-statement-start -->
> **定義（半連続作用素）**  
> $X$ を実 Banach 空間、$A:X\to X^*$ とする。任意の $u,v,w\in X$ に対して実変数関数

$$
t
\longmapsto
\langle A(u+tv),w\rangle
$$

> が連続であるとき、$A$ は **半連続（hemicontinuous）** であるという。
<!-- formal-statement-end -->

<!-- definition-example-start: def-npde3-hemicontinuous -->
**定義の確認**

有界線形作用素 $A:X\to X^*$ なら

$$
\langle A(u+tv),w\rangle
=
\langle Au,w\rangle
+
t\langle Av,w\rangle
$$

です。右辺は $t$ の一次関数なので連続です。従って全ての有界線形作用素は半連続です。
<!-- definition-example-end -->

ここでの「半連続」は、前節の「下半連続」と別の概念です。前者は作用素を直線上で動かしたときの双対積の連続性、後者は汎関数値の弱極限に関する片側評価です。

<a id="def-npde3-coercive-operator"></a>
<!-- formal-statement-start -->
> **定義（強圧的作用素）**  
> $X$ を実 Banach 空間、$A:X\to X^*$ とする。

$$
\frac{\langle Au,u\rangle}{\|u\|_X}
\longrightarrow+\infty
\qquad
(\|u\|_X\to\infty)
$$

> が成り立つとき、$A$ を **強圧的作用素** という。
<!-- formal-statement-end -->

<!-- definition-example-start: def-npde3-coercive-operator -->
**定義の確認**

$X=\mathbb R$、$A(x)=|x|^{p-2}x$ とします。$x\ne0$ なら

$$
\frac{A(x)x}{|x|}
=
\frac{|x|^p}{|x|}
=
|x|^{p-1}.
$$

$p>1$ なので $|x|\to\infty$ で $|x|^{p-1}\to\infty$ です。従ってこの作用素は強圧的です。
<!-- definition-example-end -->

---

## 5. 有限次元では Brouwer が非線形方程式を解く

Browder--Minty 型定理の核心は、いきなり無限次元を解くことではありません。

まず有限次元部分空間で解き、その解を一様有界にし、弱コンパクト性で極限へ送ります。

有限次元部分の存在を与えるのが Brouwer 不動点定理です。

<a id="lem-npde3-fd-zero"></a>
<!-- formal-statement-start -->
> **補題（有限次元の強圧零点補題）**  
> $F$ を有限次元実ノルム空間、$G:F\to F^*$ を連続とする。$F$ に任意の内積 $(\cdot,\cdot)_F$ を入れ、そのノルムを $|\cdot|_F$ とする。ある $R>0$ が存在して

$$
\langle G(v),v\rangle>0
\qquad
(|v|_F=R)
$$

> が成り立つなら、ある $u\in F$、$|u|_F\le R$ が存在して

$$
G(u)=0
$$

> となる。
<!-- formal-statement-end -->

### 証明の見取り図

$G$ が零点を持たないと仮定します。内積で $F^*$ を $F$ と同一視し、$G(v)$ と反対向きの球面へ全ての点を送ります。Brouwer 不動点定理で固定点が生じますが、その固定点では $\langle G(v),v\rangle<0$ となり、境界の正値条件と矛盾します。

<!-- proof-start -->
### 証明

有限次元 Riesz 同型

$$
R_F:F\to F^*,
\qquad
\langle R_Fz,v\rangle=(z,v)_F
$$

を使い、

$$
g(v)=R_F^{-1}G(v)
$$

と置きます。

$G$ が零点を持たないと仮定すると $g(v)\ne0$ です。閉球

$$
B_R^F
=
\{v\in F:|v|_F\le R\}
$$

上で

$$
T(v)
=
-R\frac{g(v)}{|g(v)|_F}
$$

と定めます。$G$ は連続なので $T$ も連続であり、

$$
|T(v)|_F=R
$$

だから $T(B_R^F)\subset B_R^F$ です。

FIX1 の Brouwer 不動点定理により、ある $v\in B_R^F$ が存在して

$$
T(v)=v.
$$

この等式から $|v|_F=R$ です。また

$$
v
=
-R\frac{g(v)}{|g(v)|_F}
$$

なので

$$
(g(v),v)_F
=
-R|g(v)|_F
<0.
$$

Riesz 同型の定義から

$$
\langle G(v),v\rangle
=
(g(v),v)_F
<0.
$$

しかし $|v|_F=R$ では仮定により

$$
\langle G(v),v\rangle>0.
$$

矛盾です。従って $G$ は閉球内に零点を持ちます。
<!-- proof-end -->

---

## 6. 単調性で全射性を得る：Browder--Minty の方法

線形 Lax--Milgram と比較すると、役割分担は次のようになります。

| 線形変分問題 | 非線形単調作用素 |
|---|---|
| 双線形形式 | $A:X\to X^*$ |
| 強圧性 | 作用素の強圧性 |
| 正定値性・楕円性 | 単調性 |
| 線形連続性 | 半連続性 + 有界集合上有界 |
| Galerkin の線形方程式 | Brouwer で有限次元非線形方程式 |
| 弱極限 | 単調性で極限を同定 |

<a id="thm-npde3-browder-minty"></a>
<!-- formal-statement-start -->
> **定理（Browder--Minty 型全射定理）**  
> $X$ を実反射的 Banach 空間とし、$A:X\to X^*$ が次を満たすとする。
>
> 1. $A$ は単調である。
> 2. $A$ は半連続である。
> 3. $A$ は有界集合を $X^*$ の有界集合へ送る。
> 4. $A$ は強圧的である。
>
> このとき任意の $f\in X^*$ に対して、ある $u\in X$ が存在して

$$
Au=f
$$

> となる。さらに $A$ が狭義単調なら、この解は一意である。
<!-- formal-statement-end -->

### 証明の見取り図

全ての有限次元部分空間 $F\subset X$ を包含関係で並べます。各 $F$ では Brouwer により

$$
\langle Au_F-f,v\rangle=0
\qquad
(v\in F)
$$

を解きます。

強圧性から $u_F$ は $F$ に依らず有界です。反射性で弱収束する subnet を取り、単調性

$$
\langle Au_F-Av,u_F-v\rangle\ge0
$$

へ Galerkin 方程式を代入します。極限後に

$$
\langle f-Av,u-v\rangle\ge0
$$

が全ての $v$ に対して得られます。最後に $v=u\pm tw$ と置き、半連続性で $t\downarrow0$ とすれば $Au=f$ です。

<!-- proof-start -->
### 証明

$f\in X^*$ を固定します。

**Step 1：有限次元 Galerkin 問題を解く。**

$F\subset X$ を有限次元部分空間とします。$G_F:F\to F^*$ を

$$
\langle G_F(u),v\rangle
=
\langle Au-f,v\rangle
\qquad
(u,v\in F)
$$

で定めます。

まず $G_F$ が連続であることを確認します。$u_n\to u$ in $F$ とし、$w\in F$ を固定します。有限次元なので $\{u_n\}$ は $X$ でも有界であり、仮定3から $\{Au_n\}$ は $X^*$ で有界です。

$t>0$ とします。単調性を $u_n$ と $u+tw$ に適用すると

$$
0
\le
\langle Au_n-A(u+tw),u_n-u-tw\rangle.
$$

展開して

$$
t\langle Au_n-A(u+tw),w\rangle
\le
\langle Au_n-A(u+tw),u_n-u\rangle.
$$

右辺は $Au_n$ の有界性と $u_n-u\to0$ から0へ収束します。従って

$$
\limsup_{n\to\infty}
\langle Au_n,w\rangle
\le
\langle A(u+tw),w\rangle.
$$

同様に $u-tw$ と比較すると

$$
\liminf_{n\to\infty}
\langle Au_n,w\rangle
\ge
\langle A(u-tw),w\rangle.
$$

$t\downarrow0$ とし、半連続性を使えば

$$
\langle Au_n,w\rangle
\to
\langle Au,w\rangle.
$$

有限次元 $F$ の基底ベクトルを $w$ に取れば、$G_F(u_n)\to G_F(u)$ in $F^*$ が従います。

次に、強圧性から

$$
\frac{\langle Au,u\rangle}{\|u\|_X}
-
\|f\|_{X^*}
\to+\infty.
$$

従って $\|u\|_X$ が十分大きければ

$$
\langle Au-f,u\rangle>0.
$$

$F$ 上の任意の内積ノルム $|\cdot|_F$ と $\|\cdot\|_X$ は同値なので、十分大きな $R_F$ を取れば

$$
|u|_F=R_F
\quad\Longrightarrow\quad
\langle G_F(u),u\rangle>0.
$$

有限次元の強圧零点補題より、ある $u_F\in F$ が存在して

$$
\langle Au_F-f,v\rangle=0
\qquad
(v\in F).
$$

**Step 2：Galerkin 解を $F$ に依らず有界にする。**

$v=u_F$ を上の等式へ入れると

$$
\langle Au_F,u_F\rangle
=
\langle f,u_F\rangle.
$$

$u_F\ne0$ なら

$$
\frac{\langle Au_F,u_F\rangle}{\|u_F\|_X}
\le
\|f\|_{X^*}.
$$

左辺は $\|u_F\|_X\to\infty$ で $+\infty$ へ向かうので、$\{u_F\}$ は $X$ で一様有界です。

**Step 3：弱極限を取る。**

全ての有限次元部分空間を包含関係で順序付けた有向集合を考えます。$X$ は反射的なので、FA4 より大きな閉球は弱コンパクトです。従って Galerkin 解の net は subnet を取り直して

$$
u_F\rightharpoonup u
$$

とできます。

任意の $v\in X$ を固定します。元の有向集合では、十分大きな $F$ なら $v\in F$ です。subnet でもこの性質は保たれます。

単調性より

$$
0
\le
\langle Au_F-Av,u_F-v\rangle.
$$

$v\in F$ なので Galerkin 方程式から

$$
\langle Au_F,u_F-v\rangle
=
\langle f,u_F-v\rangle.
$$

従って

$$
0
\le
\langle f-Av,u_F-v\rangle.
$$

$f-Av\in X^*$ は固定されているので、$u_F\rightharpoonup u$ を使って極限へ送ると

$$
\boxed{
\langle f-Av,u-v\rangle
\ge0
}
$$

が任意の $v\in X$ について成り立ちます。

**Step 4：比較点を $u$ へ近づける。**

任意の $w\in X$ と $t>0$ に対し

$$
v=u-tw
$$

と置きます。すると

$$
\langle f-A(u-tw),tw\rangle\ge0,
$$

従って

$$
\langle f-A(u-tw),w\rangle\ge0.
$$

$t\downarrow0$ とすると、半連続性により

$$
\langle f-Au,w\rangle\ge0.
$$

一方

$$
v=u+tw
$$

と置けば

$$
\langle f-A(u+tw),-tw\rangle\ge0,
$$

すなわち

$$
\langle f-A(u+tw),w\rangle\le0.
$$

再び $t\downarrow0$ として

$$
\langle f-Au,w\rangle\le0.
$$

両方を合わせると

$$
\langle f-Au,w\rangle=0
\qquad
(w\in X).
$$

従って

$$
Au=f.
$$

**Step 5：狭義単調なら一意。**

$Au=f=Av$ とすると

$$
\langle Au-Av,u-v\rangle=0.
$$

狭義単調性より $u=v$ です。
<!-- proof-end -->

---

## 7. $p$-Laplacian は Browder--Minty の仮定を全部満たす

まず解概念を固定します。

<a id="def-npde3-plaplacian-weak"></a>
<!-- formal-statement-start -->
> **定義（p-Laplacian の変分弱解）**  
> $\Omega\subset\mathbb R^d$ を有界開集合、$1<p<\infty$、

$$
X=W_0^{1,p}(\Omega),
\qquad
f\in X^*
$$

> とする。

$$
\Delta_pu
=
\operatorname{div}
\left(
|\nabla u|^{p-2}\nabla u
\right)
$$

> と書く。$u\in X$ が任意の $\varphi\in X$ に対して

$$
\int_\Omega
|\nabla u|^{p-2}
\nabla u\cdot\nabla\varphi\,dx
=
\langle f,\varphi\rangle
$$

> を満たすとき、$u$ を零 Dirichlet 問題

$$
-\Delta_pu=f,
\qquad
u|_{\partial\Omega}=0
$$

> の **変分弱解** という。
<!-- formal-statement-end -->

<!-- definition-example-start: def-npde3-plaplacian-weak -->
**定義の確認：滑らかな解から弱形式へ**

$u\in W_0^{1,p}(\Omega)$ とし、さらにベクトル場

$$
F=
|\nabla u|^{p-2}\nabla u
$$

が $C^1$ 級で、

$$
-\operatorname{div}F=f
$$

が古典的に成り立つとします。$\varphi\in C_c^\infty(\Omega)$ を掛けて積分すると

$$
-\int_\Omega
\operatorname{div}
\left(
|\nabla u|^{p-2}\nabla u
\right)\varphi\,dx
=
\int_\Omega f\varphi\,dx.
$$

部分積分により境界項は消え、

$$
\int_\Omega
|\nabla u|^{p-2}
\nabla u\cdot\nabla\varphi\,dx
=
\int_\Omega f\varphi\,dx.
$$

これが定義の弱形式です。密度により適切な $f$ なら $\varphi\in X$ へ拡張されます。
<!-- definition-example-end -->

作用素 $A:X\to X^*$ を

$$
\boxed{
\langle Au,v\rangle
=
\int_\Omega
|\nabla u|^{p-2}
\nabla u\cdot\nabla v\,dx
}
$$

で定めます。

まず Hölder の不等式から

$$
|\langle Au,v\rangle|
\le
\left\|
|\nabla u|^{p-1}
\right\|_{L^q}
\|\nabla v\|_{L^p}.
$$

$(p-1)q=p$ なので

$$
\left\|
|\nabla u|^{p-1}
\right\|_{L^q}
=
\|\nabla u\|_{L^p}^{p-1}.
$$

従って

$$
\|Au\|_{X^*}
\le
\|u\|_X^{p-1}.
$$

特に $A$ は有界集合を有界集合へ送ります。

<a id="prop-npde3-plaplacian-properties"></a>
<!-- formal-statement-start -->
> **命題（p-Laplacian 作用素の基本性質）**  
> $\Omega\subset\mathbb R^d$ を有界開集合、$1<p<\infty$ とし、

$$
X=W_0^{1,p}(\Omega)
$$

> とする。作用素 $A:X\to X^*$ を

$$
\langle Au,v\rangle
=
\int_\Omega
|\nabla u|^{p-2}
\nabla u\cdot\nabla v\,dx
$$

> で定める。このとき $A$ は有界集合上有界、狭義単調、半連続、強圧的である。
<!-- formal-statement-end -->

### 証明の見取り図

点ごとの写像

$$
a(\xi)=|\xi|^{p-2}\xi
$$

は狭義凸関数 $|\xi|^p/p$ の勾配なので狭義単調です。半連続性は支配収束、強圧性は

$$
\langle Au,u\rangle=\|u\|_X^p
$$

から直ちに出ます。

<!-- proof-start -->
### 証明

有界集合上有界であることは直前の評価

$$
\|Au\|_{X^*}
\le
\|u\|_X^{p-1}
$$

から従います。

**単調性。**

$$
\Phi(\xi)
=
\frac1p|\xi|^p
$$

は $1<p<\infty$ で微分可能な狭義凸関数で、

$$
\nabla\Phi(\xi)
=
|\xi|^{p-2}\xi
=
a(\xi).
$$

凸関数の接線不等式から

$$
\Phi(\xi)
\ge
\Phi(\eta)
+
a(\eta)\cdot(\xi-\eta),
$$

$$
\Phi(\eta)
\ge
\Phi(\xi)
+
a(\xi)\cdot(\eta-\xi).
$$

二式を足すと

$$
(a(\xi)-a(\eta))\cdot(\xi-\eta)
\ge0.
$$

狭義凸性により $\xi\ne\eta$ なら不等号は厳密です。

従って $u,v\in X$ に対して

$$
\langle Au-Av,u-v\rangle
=
\int_\Omega
\left(
a(\nabla u)-a(\nabla v)
\right)
\cdot
(\nabla u-\nabla v)\,dx
\ge0.
$$

等号なら $\nabla u=\nabla v$ は、ほとんど至る所（almost everywhere; a.e.）で成り立ちます。$u-v\in W_0^{1,p}$ なので $p$-Poincaré 不等式より

$$
\|u-v\|_{L^p}
\le
C\|\nabla u-\nabla v\|_{L^p}
=
0.
$$

従って $u=v$ です。よって $A$ は狭義単調です。

**半連続性。**

固定した $u,v,w\in X$ に対し

$$
F(t)
=
\langle A(u+tv),w\rangle
$$

を考えます。$t_n\to t$ とすると点ごとに

$$
a(\nabla u+t_n\nabla v)
\cdot\nabla w
\to
a(\nabla u+t\nabla v)
\cdot\nabla w.
$$

$\{t_n\}$ は有界なので、ある $M>0$ について $|t_n|\le M$ とできます。すると

$$
|a(\nabla u+t_n\nabla v)|
\le
C_{p,M}
\left(
|\nabla u|^{p-1}
+
|\nabla v|^{p-1}
\right).
$$

従って積分被積分関数は

$$
C_{p,M}
\left(
|\nabla u|^{p-1}
+
|\nabla v|^{p-1}
\right)
|\nabla w|
$$

で抑えられます。$(p-1)q=p$ と Hölder の不等式から右辺は可積分です。

優収束定理により

$$
F(t_n)\to F(t).
$$

従って $A$ は半連続です。

**強圧性。**

$$
\langle Au,u\rangle
=
\int_\Omega|\nabla u|^pdx
=
\|u\|_X^p.
$$

従って $u\ne0$ なら

$$
\frac{\langle Au,u\rangle}{\|u\|_X}
=
\|u\|_X^{p-1}.
$$

$p>1$ なので $\|u\|_X\to\infty$ で右辺は $+\infty$ へ向かいます。よって $A$ は強圧的です。
<!-- proof-end -->

<a id="thm-npde3-plaplacian-existence"></a>
<!-- formal-statement-start -->
> **定理（零 Dirichlet p-Laplacian の存在一意性）**  
> $\Omega\subset\mathbb R^d$ を有界開集合、$1<p<\infty$、

$$
X=W_0^{1,p}(\Omega)
$$

> とする。任意の $f\in X^*$ に対して、零 Dirichlet 問題

$$
-\Delta_pu=f
$$

> はただ一つの変分弱解 $u\in X$ を持つ。
<!-- formal-statement-end -->

### 証明の見取り図

$X$ は反射的で、直前の命題から $p$-Laplacian 作用素は Browder--Minty 型定理の全仮定を満たします。全射性が存在を、狭義単調性が一意性を与えます。

<!-- proof-start -->
### 証明

命題「$W_0^{1,p}$ の反射性」より $X$ は反射的です。

$p$-Laplacian 作用素

$$
\langle Au,v\rangle
=
\int_\Omega
|\nabla u|^{p-2}
\nabla u\cdot\nabla v\,dx
$$

は、直前の命題により

- 単調
- 半連続
- 有界集合上有界
- 強圧的

です。

従って Browder--Minty 型全射定理より、任意の $f\in X^*$ に対して $Au=f$ を満たす $u\in X$ が存在します。これは定義そのものから $-\Delta_pu=f$ の変分弱解です。

さらに $A$ は狭義単調なので、この解は一意です。
<!-- proof-end -->

### $p=2$ で何が戻るか

$p=2$ なら

$$
A(u)
=
-\Delta u
$$

に対応し、

$$
\langle Au,v\rangle
=
\int_\Omega\nabla u\cdot\nabla v\,dx.
$$

これは GPDE6 の Poisson 双線形形式です。

したがって本章は Lax--Milgram と無関係な別ルートではありません。

$$
\boxed{
\text{線形強圧問題}
\quad\longrightarrow\quad
\text{単調非線形強圧問題}
}
$$

という拡張になっています。

---

## 8. 近似列では「弱収束したから非線形項も収束する」とは言えない

線形作用素 $T$ なら、弱連続性から

$$
u_n\rightharpoonup u
\quad\Longrightarrow\quad
Tu_n\rightharpoonup Tu
$$

を期待できます。

しかし非線形写像では一般に

$$
u_n\rightharpoonup u
$$

だけから

$$
A(u_n)\rightharpoonup A(u)
$$

は従いません。

$p$-Laplacian では、例えば

$$
|\nabla u_n|^{p-2}\nabla u_n
$$

の極限を同定する必要があります。

ここで単調性をもう一度使います。

<a id="lem-npde3-minty-identification"></a>
<!-- formal-statement-start -->
> **補題（Minty の非線形極限同定）**  
> $X$ を実 Banach 空間、$A:X\to X^*$ を単調かつ半連続とする。net $u_\alpha\in X$ と $u\in X$、$g\in X^*$ が

$$
u_\alpha\rightharpoonup u
\quad\text{in }X,
$$

$$
Au_\alpha\rightharpoonup g
\quad\text{in }X^*
$$

> を満たし、さらに

$$
\limsup_\alpha
\langle Au_\alpha,u_\alpha\rangle
\le
\langle g,u\rangle
$$

> とする。このとき

$$
g=Au.
$$
<!-- formal-statement-end -->

### 証明の見取り図

任意の比較点 $v$ に対する単調性

$$
\langle Au_\alpha-Av,u_\alpha-v\rangle\ge0
$$

を展開します。弱収束で固定項を極限へ送り、仮定された limsup 条件で「動く項どうしの積」を制御すると

$$
\langle g-Av,u-v\rangle\ge0
$$

が得られます。あとは $v=u\pm tw$ として半連続性で $t\downarrow0$ とします。

<!-- proof-start -->
### 証明

任意の $v\in X$ を固定します。単調性から

$$
0
\le
\langle Au_\alpha-Av,u_\alpha-v\rangle.
$$

展開すると

$$
0
\le
\langle Au_\alpha,u_\alpha\rangle
-
\langle Au_\alpha,v\rangle
-
\langle Av,u_\alpha\rangle
+
\langle Av,v\rangle.
$$

仮定より

$$
\limsup_\alpha
\langle Au_\alpha,u_\alpha\rangle
\le
\langle g,u\rangle.
$$

また $Au_\alpha\rightharpoonup g$ in $X^*$ なので、固定した $v$ に対して

$$
\langle Au_\alpha,v\rangle
\to
\langle g,v\rangle.
$$

$u_\alpha\rightharpoonup u$ in $X$ なので、固定した $Av\in X^*$ に対して

$$
\langle Av,u_\alpha\rangle
\to
\langle Av,u\rangle.
$$

従って上の非負量の limsup を取ると

$$
0
\le
\langle g,u\rangle
-
\langle g,v\rangle
-
\langle Av,u\rangle
+
\langle Av,v\rangle.
$$

すなわち

$$
\boxed{
\langle g-Av,u-v\rangle\ge0
}
$$

が任意の $v\in X$ に対して成り立ちます。

任意の $w\in X$ と $t>0$ に対して

$$
v=u-tw
$$

と置くと

$$
\langle g-A(u-tw),tw\rangle\ge0.
$$

$t>0$ で割って

$$
\langle g-A(u-tw),w\rangle\ge0.
$$

$t\downarrow0$ とし、半連続性を使うと

$$
\langle g-Au,w\rangle\ge0.
$$

同様に $v=u+tw$ と置けば

$$
\langle g-A(u+tw),w\rangle\le0
$$

となり、$t\downarrow0$ で

$$
\langle g-Au,w\rangle\le0.
$$

従って任意の $w\in X$ に対して

$$
\langle g-Au,w\rangle=0.
$$

よって $g=Au$ です。
<!-- proof-end -->

この補題の重要点は、弱収束だけでは不足していることです。

追加された

$$
\limsup
\langle Au_\alpha,u_\alpha\rangle
\le
\langle g,u\rangle
$$

が、非線形項を正しい極限へ固定する最後の情報です。Galerkin 法、正則化、時間離散化などで非線形 PDE を近似するとき、この種のエネルギー情報が決定的になります。

---

## 9. 一次元では $p$-Laplacian を手で解ける

区間 $\Omega=(0,1)$ で

$$
-\left(
|u'|^{p-2}u'
\right)'
=
1,
\qquad
u(0)=u(1)=0
$$

を考えます。

流束

$$
w(x)
=
|u'(x)|^{p-2}u'(x)
$$

を置けば

$$
-w'(x)=1.
$$

従って

$$
w(x)=C-x.
$$

逆写像は

$$
u'(x)
=
\operatorname{sgn}(C-x)
|C-x|^{1/(p-1)}.
$$

両端条件から

$$
0
=
u(1)-u(0)
=
\int_0^1u'(x)\,dx.
$$

左右の面積が一致するため $C=1/2$ です。

したがって

$$
u'(x)
=
\operatorname{sgn}\left(\frac12-x\right)
\left|
\frac12-x
\right|^{1/(p-1)}.
$$

$q=p/(p-1)$ とすると、$0\le x\le1/2$ では

$$
u(x)
=
\int_0^x
\left(
\frac12-s
\right)^{1/(p-1)}ds.
$$

変数

$$
y=\frac12-s
$$

を使うと

$$
u(x)
=
\frac1q
\left[
\left(\frac12\right)^q
-
\left(\frac12-x\right)^q
\right].
$$

対称性から $1/2\le x\le1$ では

$$
u(x)=u(1-x).
$$

$p=2$ なら $q=2$ なので

$$
u(x)
=
\frac12
\left[
\frac14-\left(\frac12-x\right)^2
\right]
=
\frac{x(1-x)}2.
$$

Poisson 方程式の既知解へ正確に戻ります。

---

## 10. 本章で線形理論から何が変わったか

本章では二つの存在証明を得ました。

一つ目は **エネルギー最小化** です。

$$
\text{反射性}
+
\text{弱下半連続性}
+
\text{強圧性}
\Longrightarrow
\text{最小化点の存在}.
$$

$p$-energy が狭義凸なら最小化点は一意で、その Euler--Lagrange 方程式が $p$-Laplacian です。

二つ目は **単調作用素法** です。

$$
\text{反射性}
+
\text{単調性}
+
\text{半連続性}
+
\text{強圧性}
\Longrightarrow
A(X)=X^*.
$$

こちらは明示的なエネルギー汎関数を持たない問題にも拡張できます。

そして近似解から極限へ進むときには

$$
u_n\rightharpoonup u
$$

だけでは非線形項を通せず、Minty の同定法のような追加機構が必要です。

これが「線形 Lax--Milgram を越える」ときの基本地図です。

---

## 11. 演習

### Level A

<a id="ex-npde3-a01"></a>
#### NPDE3-A01 区間上の $p$-Poincaré 評価
- Level: A

$\varphi\in C_c^\infty(0,1)$、$1<p<\infty$ とする。

1. 任意の $x\in(0,1)$ に対して

$$
\varphi(x)=\int_0^x\varphi'(s)\,ds
$$

と書けることを説明せよ。
2. Hölder の不等式から

$$
|\varphi(x)|
\le
\|\varphi'\|_{L^p(0,1)}
$$

を示せ。
3. さらに

$$
\|\varphi\|_{L^p(0,1)}
\le
\|\varphi'\|_{L^p(0,1)}
$$

を示せ。

<!-- solution-start -->
#### 詳細解答

$\varphi$ は $(0,1)$ 内にコンパクトな台を持つので、0の近傍では $\varphi=0$ です。従って微積分学の基本定理から

$$
\varphi(x)
=
\varphi(0)+\int_0^x\varphi'(s)\,ds
=
\int_0^x\varphi'(s)\,ds.
$$

共役指数 $q=p/(p-1)$ を使い、Hölder の不等式を適用すると

$$
|\varphi(x)|
\le
\left(
\int_0^x|\varphi'(s)|^pds
\right)^{1/p}
\left(
\int_0^x1^qds
\right)^{1/q}.
$$

後者は $x^{1/q}\le1$ なので

$$
|\varphi(x)|
\le
\|\varphi'\|_{L^p(0,1)}.
$$

両辺を $p$ 乗して $x\in(0,1)$ で積分すると

$$
\int_0^1|\varphi(x)|^pdx
\le
\int_0^1
\|\varphi'\|_{L^p}^pdx
=
\|\varphi'\|_{L^p}^p.
$$

$p$ 乗根を取って

$$
\|\varphi\|_{L^p}
\le
\|\varphi'\|_{L^p}.
$$
<!-- solution-end -->

<a id="ex-npde3-a02"></a>
#### NPDE3-A02 $p=2$ で Poisson へ戻す
- Level: A

$p=2$ とする。

1. $|\nabla u|^{p-2}\nabla u$ を簡単にせよ。
2. $p$-Laplacian の弱形式を書け。
3. GPDE6 の Poisson 弱形式と一致することを確認せよ。

<!-- solution-start -->
#### 詳細解答

$p=2$ では $p-2=0$ なので

$$
|\nabla u|^{p-2}\nabla u
=
|\nabla u|^0\nabla u
=
\nabla u.
$$

従って弱形式は

$$
\int_\Omega
\nabla u\cdot\nabla\varphi\,dx
=
\langle f,\varphi\rangle
\qquad
(\varphi\in H_0^1(\Omega)).
$$

これは GPDE6 で得た零 Dirichlet Poisson 問題の変分弱形式そのものです。
<!-- solution-end -->

<a id="ex-npde3-a03"></a>
#### NPDE3-A03 $x^3$ の単調性
- Level: A

$A:\mathbb R\to\mathbb R$ を $A(x)=x^3$ とする。

1. $(A(x)-A(y))(x-y)$ を因数分解せよ。
2. $A$ が狭義単調であることを示せ。

<!-- solution-start -->
#### 詳細解答

差の立方を因数分解すると

$$
x^3-y^3
=
(x-y)(x^2+xy+y^2).
$$

従って

$$
(A(x)-A(y))(x-y)
=
(x-y)^2(x^2+xy+y^2).
$$

第二因子は

$$
x^2+xy+y^2
=
\left(x+\frac y2\right)^2
+
\frac34y^2
\ge0.
$$

$x\ne y$ なら $(x-y)^2>0$ です。また $x^2+xy+y^2=0$ は $x=y=0$ のときだけなので、$x\ne y$ では

$$
(A(x)-A(y))(x-y)>0.
$$

よって $A$ は狭義単調です。
<!-- solution-end -->

<a id="ex-npde3-a04"></a>
#### NPDE3-A04 $p$-Laplacian 作用素の双対評価
- Level: A

$X=W_0^{1,p}(\Omega)$ に

$$
\|u\|_X=\|\nabla u\|_{L^p}
$$

を入れ、

$$
\langle Au,v\rangle
=
\int_\Omega
|\nabla u|^{p-2}\nabla u\cdot\nabla v\,dx
$$

とする。

$$
\|Au\|_{X^*}
\le
\|u\|_X^{p-1}
$$

を示せ。

<!-- solution-start -->
#### 詳細解答

点ごとに Cauchy--Schwarz の不等式を使うと

$$
\left|
|\nabla u|^{p-2}
\nabla u\cdot\nabla v
\right|
\le
|\nabla u|^{p-1}|\nabla v|.
$$

従って

$$
|\langle Au,v\rangle|
\le
\int_\Omega
|\nabla u|^{p-1}|\nabla v|\,dx.
$$

共役指数 $q=p/(p-1)$ に対する Hölder の不等式より

$$
|\langle Au,v\rangle|
\le
\left(
\int_\Omega
|\nabla u|^{(p-1)q}dx
\right)^{1/q}
\|\nabla v\|_{L^p}.
$$

$(p-1)q=p$ なので

$$
\left(
\int_\Omega
|\nabla u|^{(p-1)q}dx
\right)^{1/q}
=
\left(
\int_\Omega|\nabla u|^pdx
\right)^{1/q}
=
\|u\|_X^{p-1}.
$$

従って

$$
|\langle Au,v\rangle|
\le
\|u\|_X^{p-1}\|v\|_X.
$$

$\|v\|_X\le1$ で上限を取れば

$$
\|Au\|_{X^*}
\le
\|u\|_X^{p-1}.
$$
<!-- solution-end -->

<a id="ex-npde3-a05"></a>
#### NPDE3-A05 古典解から変分弱解へ
- Level: A

$u\in C^2(\Omega)\cap C^1(\overline\Omega)$ が

$$
-\operatorname{div}
\left(
|\nabla u|^{p-2}\nabla u
\right)
=
g
$$

を満たし、$u=0$ on $\partial\Omega$ とする。$\varphi\in C_c^\infty(\Omega)$ に対して弱形式を導け。

<!-- solution-start -->
#### 詳細解答

方程式へ $\varphi$ を掛けて積分すると

$$
-\int_\Omega
\operatorname{div}
\left(
|\nabla u|^{p-2}\nabla u
\right)
\varphi\,dx
=
\int_\Omega g\varphi\,dx.
$$

ベクトル場

$$
F=
|\nabla u|^{p-2}\nabla u
$$

と置きます。$\varphi$ は $\Omega$ 内にコンパクトな台を持つので、部分積分の境界項は0です。従って

$$
-\int_\Omega
(\operatorname{div}F)\varphi\,dx
=
\int_\Omega
F\cdot\nabla\varphi\,dx.
$$

よって

$$
\int_\Omega
|\nabla u|^{p-2}\nabla u\cdot\nabla\varphi\,dx
=
\int_\Omega g\varphi\,dx.
$$

これが変分弱形式です。
<!-- solution-end -->

### Level B

<a id="ex-npde3-b01"></a>
#### NPDE3-B01 直接法と事前評価
- Level: B

$f\in X^*$ とし、

$$
J_f(v)
=
\frac1p\|v\|_X^p
-
\langle f,v\rangle
$$

を考える。

1. $J_f$ が強圧的であることを示せ。
2. 最小化点 $u$ が存在する理由を述べよ。
3. 弱形式へ $\varphi=u$ を代入し、

$$
\|u\|_X^{p-1}
\le
\|f\|_{X^*}
$$

を示せ。

<!-- solution-start -->
#### 詳細解答

双対評価から

$$
-\langle f,v\rangle
\ge
-\|f\|_{X^*}\|v\|_X.
$$

従って

$$
J_f(v)
\ge
\frac1p\|v\|_X^p
-
\|f\|_{X^*}\|v\|_X.
$$

$r=\|v\|_X$ と置けば右辺は

$$
\frac1p r^p-\|f\|r.
$$

$p>1$ なので $r\to\infty$ で $+\infty$ へ向かいます。よって $J_f$ は強圧的です。

$X=W_0^{1,p}(\Omega)$ は反射的であり、$J_f$ は弱下半連続です。従って反射的 Banach 空間上の直接法から最小化点 $u$ が存在します。

この最小化点は Euler--Lagrange 方程式

$$
\int_\Omega
|\nabla u|^{p-2}\nabla u\cdot\nabla\varphi\,dx
=
\langle f,\varphi\rangle
$$

を満たします。$\varphi=u$ と置くと

$$
\int_\Omega|\nabla u|^pdx
=
\langle f,u\rangle.
$$

左辺は $\|u\|_X^p$ です。右辺を双対ノルムで評価すると

$$
\|u\|_X^p
\le
\|f\|_{X^*}\|u\|_X.
$$

$u=0$ なら結論は自明です。$u\ne0$ なら $\|u\|_X$ で割って

$$
\|u\|_X^{p-1}
\le
\|f\|_{X^*}.
$$
<!-- solution-end -->

<a id="ex-npde3-b02"></a>
#### NPDE3-B02 一次元 $p$-Laplacian の明示解
- Level: B

$1<p<\infty$ とし、

$$
-\left(
|u'|^{p-2}u'
\right)'
=
1
\quad\text{in }(0,1),
$$

$$
u(0)=u(1)=0
$$

を考える。$q=p/(p-1)$ とする。

1. $w=|u'|^{p-2}u'$ と置き、$w=C-x$ を示せ。
2. 両端条件から $C=1/2$ を示せ。
3. $0\le x\le1/2$ で

$$
u(x)
=
\frac1q
\left[
\left(\frac12\right)^q
-
\left(\frac12-x\right)^q
\right]
$$

を導け。
4. $p=2$ で $u=x(1-x)/2$ へ戻ることを確認せよ。

<!-- solution-start -->
#### 詳細解答

$w=|u'|^{p-2}u'$ と置けば方程式は

$$
-w'=1
$$

です。従って

$$
w'= -1
$$

を積分して

$$
w(x)=C-x.
$$

写像

$$
z\mapsto|z|^{p-2}z
$$

の逆写像は

$$
y\mapsto
\operatorname{sgn}(y)|y|^{1/(p-1)}
$$

なので

$$
u'(x)
=
\operatorname{sgn}(C-x)
|C-x|^{1/(p-1)}.
$$

両端条件から

$$
0
=
u(1)-u(0)
=
\int_0^1u'(x)\,dx.
$$

$0<C<1$ とすると

$$
0
=
\int_0^C
(C-x)^{1/(p-1)}dx
-
\int_C^1
(x-C)^{1/(p-1)}dx.
$$

$q=p/(p-1)$ なので

$$
\int_0^C
(C-x)^{1/(p-1)}dx
=
\frac{C^q}{q},
$$

$$
\int_C^1
(x-C)^{1/(p-1)}dx
=
\frac{(1-C)^q}{q}.
$$

従って

$$
C^q=(1-C)^q.
$$

$C$ と $1-C$ は非負なので

$$
C=1-C,
$$

従って

$$
C=\frac12.
$$

$0\le x\le1/2$ では

$$
u'(x)
=
\left(\frac12-x\right)^{1/(p-1)}.
$$

$u(0)=0$ を使って

$$
u(x)
=
\int_0^x
\left(\frac12-s\right)^{1/(p-1)}ds.
$$

$y=1/2-s$ と変数変換すると

$$
u(x)
=
\int_{1/2-x}^{1/2}
y^{1/(p-1)}dy
=
\frac1q
\left[
\left(\frac12\right)^q
-
\left(\frac12-x\right)^q
\right].
$$

$p=2$ なら $q=2$ なので

$$
u(x)
=
\frac12
\left[
\frac14
-
\left(\frac12-x\right)^2
\right]
=
\frac{x(1-x)}2.
$$

$x\ge1/2$ でも対称性から同じ二次式になります。
<!-- solution-end -->

<a id="ex-npde3-b03"></a>
#### NPDE3-B03 Minty の極限同定
- Level: B

$A:X\to X^*$ は単調かつ半連続とする。

$$
u_n\rightharpoonup u,
\qquad
Au_n\rightharpoonup g,
$$

$$
\limsup_{n\to\infty}
\langle Au_n,u_n\rangle
\le
\langle g,u\rangle
$$

とする。

1. 任意の $v\in X$ に対して

$$
\langle g-Av,u-v\rangle\ge0
$$

を導け。
2. $v=u-tw$ と $v=u+tw$ を使って $g=Au$ を示せ。

<!-- solution-start -->
#### 詳細解答

単調性から

$$
0
\le
\langle Au_n-Av,u_n-v\rangle.
$$

展開すると

$$
0
\le
\langle Au_n,u_n\rangle
-
\langle Au_n,v\rangle
-
\langle Av,u_n\rangle
+
\langle Av,v\rangle.
$$

第一項には limsup 条件を使います。第二項は $Au_n\rightharpoonup g$ により

$$
\langle Au_n,v\rangle
\to
\langle g,v\rangle.
$$

第三項は $u_n\rightharpoonup u$ により

$$
\langle Av,u_n\rangle
\to
\langle Av,u\rangle.
$$

従って

$$
0
\le
\langle g,u\rangle
-
\langle g,v\rangle
-
\langle Av,u\rangle
+
\langle Av,v\rangle.
$$

右辺をまとめると

$$
\langle g-Av,u-v\rangle\ge0.
$$

次に任意の $w\in X$、$t>0$ に対して

$$
v=u-tw
$$

と置きます。すると

$$
\langle g-A(u-tw),tw\rangle\ge0.
$$

$t$ で割って

$$
\langle g-A(u-tw),w\rangle\ge0.
$$

$t\downarrow0$ とし、半連続性を使うと

$$
\langle g-Au,w\rangle\ge0.
$$

同様に $v=u+tw$ と置けば

$$
\langle g-A(u+tw),w\rangle\le0
$$

を得て、$t\downarrow0$ から

$$
\langle g-Au,w\rangle\le0.
$$

従って

$$
\langle g-Au,w\rangle=0
$$

が任意の $w$ で成り立ちます。よって $g=Au$ です。
<!-- solution-end -->

<a id="ex-npde3-b04"></a>
#### NPDE3-B04 反応項を加えた単調作用素
- Level: B

$\lambda\ge0$ とし、

$$
\langle A_\lambda u,v\rangle
=
\int_\Omega
|\nabla u|^{p-2}\nabla u\cdot\nabla v\,dx
+
\lambda
\int_\Omega
|u|^{p-2}uv\,dx
$$

と定める。

1. $A_\lambda:X\to X^*$ が well-defined で、有界集合を有界集合へ送ることを示せ。
2. $A_\lambda$ が単調であることを示せ。
3. $A_\lambda$ が強圧的であることを示せ。
4. 半連続性も成り立つ理由を述べ、Browder--Minty 型定理を適用せよ。

<!-- solution-start -->
#### 詳細解答

第一項は本文と同じ評価から

$$
\left|
\int_\Omega
|\nabla u|^{p-2}\nabla u\cdot\nabla v\,dx
\right|
\le
\|u\|_X^{p-1}\|v\|_X.
$$

第二項には Hölder の不等式を使って

$$
\left|
\int_\Omega
|u|^{p-2}uv\,dx
\right|
\le
\|u\|_{L^p}^{p-1}
\|v\|_{L^p}.
$$

$p$-Poincaré 不等式より

$$
\|u\|_{L^p}
\le
C\|u\|_X,
\qquad
\|v\|_{L^p}
\le
C\|v\|_X.
$$

従って

$$
|\langle A_\lambda u,v\rangle|
\le
\left(
1+\lambda C^p
\right)
\|u\|_X^{p-1}\|v\|_X.
$$

よって $A_\lambda u\in X^*$ で、$A_\lambda$ は有界集合を有界集合へ送ります。

写像

$$
a(z)=|z|^{p-2}z
$$

は $\mathbb R^d$ でも $\mathbb R$ でも単調です。従って

$$
\langle A_\lambda u-A_\lambda v,u-v\rangle
$$

は

$$
\int_\Omega
\left[
a(\nabla u)-a(\nabla v)
\right]
\cdot
(\nabla u-\nabla v)\,dx
$$

と

$$
\lambda
\int_\Omega
\left[
a(u)-a(v)
\right]
(u-v)\,dx
$$

の和です。どちらも非負なので $A_\lambda$ は単調です。

さらに

$$
\langle A_\lambda u,u\rangle
=
\|\nabla u\|_{L^p}^p
+
\lambda\|u\|_{L^p}^p
\ge
\|u\|_X^p.
$$

従って

$$
\frac{\langle A_\lambda u,u\rangle}{\|u\|_X}
\ge
\|u\|_X^{p-1}
\to+\infty.
$$

よって強圧的です。

半連続性は本文と同じく、$t\mapsto a(\nabla u+t\nabla v)$ および $t\mapsto a(u+tv)$ の点ごとの連続性と Hölder 型の可積分支配から優収束定理で従います。

$X$ は反射的なので Browder--Minty 型定理を適用でき、任意の $f\in X^*$ に対して

$$
A_\lambda u=f
$$

を満たす $u\in X$ が存在します。
<!-- solution-end -->

### Level C

<a id="ex-npde3-c01"></a>
#### NPDE3-C01 $p$-Laplacian + 反応項を二つの方法で解く
- Level: C

$\Omega\subset\mathbb R^d$ を有界開集合、$1<p<\infty$、$q=p/(p-1)$、$\lambda>0$ とする。$g\in L^q(\Omega)$ に対し

$$
-\Delta_pu
+
\lambda|u|^{p-2}u
=
g
$$

in $\Omega$、

$$
u|_{\partial\Omega}=0
$$

を考える。

1. $X=W_0^{1,p}(\Omega)$ 上の弱形式を書き、右辺が $X^*$ の元を定めることを示せ。
2. エネルギー

$$
J(v)
=
\frac1p
\int_\Omega|\nabla v|^pdx
+
\frac{\lambda}{p}
\int_\Omega|v|^pdx
-
\int_\Omega gv\,dx
$$

が弱下半連続・強圧的・狭義凸であることを示せ。
3. 直接法からただ一つの最小化点が存在し、その Euler--Lagrange 方程式が弱形式と一致することを示せ。
4. 対応する作用素が Browder--Minty 型定理の仮定を満たすことを確認し、同じ存在一意性を作用素法から導け。
5. 解 $u$ が満たす事前評価を一つ導け。

<!-- solution-start -->
#### 詳細解答

**1. 弱形式と右辺の連続性**

弱形式は、$u\in X$ を求めて任意の $\varphi\in X$ に対し

$$
\int_\Omega
|\nabla u|^{p-2}
\nabla u\cdot\nabla\varphi\,dx
+
\lambda
\int_\Omega
|u|^{p-2}u\varphi\,dx
=
\int_\Omega
g\varphi\,dx
$$

を要求することです。

右辺について Hölder の不等式より

$$
\left|
\int_\Omega g\varphi\,dx
\right|
\le
\|g\|_{L^q}
\|\varphi\|_{L^p}.
$$

$p$-Poincaré 不等式から

$$
\|\varphi\|_{L^p}
\le
C_{\Omega,p}
\|\nabla\varphi\|_{L^p}
=
C_{\Omega,p}\|\varphi\|_X.
$$

従って

$$
\left|
\int_\Omega g\varphi\,dx
\right|
\le
C_{\Omega,p}
\|g\|_{L^q}
\|\varphi\|_X.
$$

よって

$$
\varphi\mapsto\int_\Omega g\varphi\,dx
$$

は $X^*$ の元を定めます。

**2. エネルギーの三性質**

$v_\alpha\rightharpoonup v$ in $X$ とします。勾配写像は弱連続なので

$$
\nabla v_\alpha
\rightharpoonup
\nabla v
\quad\text{in }L^p.
$$

ノルムの弱下半連続性より

$$
\int_\Omega|\nabla v|^pdx
\le
\liminf_\alpha
\int_\Omega|\nabla v_\alpha|^pdx.
$$

また包含写像 $X\to L^p(\Omega)$ は有界線形なので

$$
v_\alpha\rightharpoonup v
\quad\text{in }L^p,
$$

従って

$$
\int_\Omega|v|^pdx
\le
\liminf_\alpha
\int_\Omega|v_\alpha|^pdx.
$$

右辺の線形項は $X^*$ の元なので

$$
\int_\Omega gv_\alpha dx
\to
\int_\Omega gv dx.
$$

従って $J$ は弱下半連続です。

強圧性は

$$
J(v)
\ge
\frac1p\|v\|_X^p
-
C_{\Omega,p}\|g\|_{L^q}\|v\|_X
$$

から従います。右辺は $\|v\|_X\to\infty$ で $+\infty$ です。

$\xi\mapsto|\xi|^p$ と $s\mapsto|s|^p$ は $p>1$ で狭義凸です。従って最初の二項は凸で、特に勾配項だけでも $W_0^{1,p}$ 上では狭義凸です。最後の項は線形なので $J$ は狭義凸です。

**3. 直接法と Euler--Lagrange 方程式**

$X$ は反射的 Banach 空間で、$J$ は弱下半連続かつ強圧的です。直接法により最小化点 $u$ が存在します。狭義凸性から一意です。

固定した $\varphi\in X$ に対して

$$
h(t)=J(u+t\varphi)
$$

と置きます。$t=0$ は最小点なので $h'(0)=0$ です。

本文と同じ一変数微分の計算と優収束の議論から

$$
\frac{d}{dt}
\left.
\frac1p
\int_\Omega
|\nabla u+t\nabla\varphi|^pdx
\right|_{t=0}
=
\int_\Omega
|\nabla u|^{p-2}
\nabla u\cdot\nabla\varphi\,dx.
$$

同様に

$$
\frac{d}{dt}
\left.
\frac{\lambda}{p}
\int_\Omega
|u+t\varphi|^pdx
\right|_{t=0}
=
\lambda
\int_\Omega
|u|^{p-2}u\varphi\,dx.
$$

線形項は

$$
\frac{d}{dt}
\left.
\left(
-\int_\Omega
g(u+t\varphi)\,dx
\right)
\right|_{t=0}
=
-\int_\Omega g\varphi\,dx.
$$

従って $h'(0)=0$ は

$$
\int_\Omega
|\nabla u|^{p-2}
\nabla u\cdot\nabla\varphi\,dx
+
\lambda
\int_\Omega
|u|^{p-2}u\varphi\,dx
=
\int_\Omega
g\varphi\,dx
$$

となり、弱形式と一致します。

**4. Browder--Minty 型定理**

作用素 $A_\lambda:X\to X^*$ を

$$
\langle A_\lambda u,\varphi\rangle
=
\int_\Omega
|\nabla u|^{p-2}
\nabla u\cdot\nabla\varphi\,dx
+
\lambda
\int_\Omega
|u|^{p-2}u\varphi\,dx
$$

で定めます。

Level B04 で確認した通り、

- Hölder と Poincaré により有界集合上有界
- $z\mapsto|z|^{p-2}z$ の単調性により単調
- 優収束定理により半連続
- $\langle A_\lambda u,u\rangle\ge\|u\|_X^p$ により強圧的

です。

さらに勾配項が狭義単調なので $A_\lambda$ は狭義単調です。

$X$ は反射的なので Browder--Minty 型定理により、右辺

$$
f_g(\varphi)
=
\int_\Omega g\varphi\,dx
$$

に対して $A_\lambda u=f_g$ を満たす解が存在し、狭義単調性から一意です。

**5. 事前評価**

弱形式へ $\varphi=u$ を代入すると

$$
\|\nabla u\|_{L^p}^p
+
\lambda\|u\|_{L^p}^p
=
\int_\Omega gu\,dx.
$$

右辺を Hölder と Poincaré で評価して

$$
\int_\Omega gu\,dx
\le
\|g\|_{L^q}
\|u\|_{L^p}
\le
C_{\Omega,p}
\|g\|_{L^q}
\|u\|_X.
$$

左辺は第一項だけ残して

$$
\|u\|_X^p
\le
C_{\Omega,p}
\|g\|_{L^q}
\|u\|_X.
$$

$u=0$ なら自明です。$u\ne0$ なら $\|u\|_X$ で割り、

$$
\boxed{
\|u\|_X^{p-1}
\le
C_{\Omega,p}
\|g\|_{L^q}
}
$$

を得ます。

この評価は、外力 $g$ の大きさが解の勾配ノルムをどの程度制御するかを示しています。
<!-- solution-end -->
