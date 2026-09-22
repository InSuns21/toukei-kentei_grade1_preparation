# GEO2 接空間・余接空間・微分・接束

[GEO1](../GEO1/index.md) では、多様体の滑らかさを局所座標の貼り合わせとして定義しました。ここから先で必要なのは、点 $p\in M$ の近くを「一次まで見る」言語です。

Euclid 空間では、点 $x$ における方向はベクトル $v\in\mathbb R^n$ で表せます。多様体には大域的な座標がないので、そのままでは $p+tv$ と書けません。それでも

- $p$ を通る曲線の速度
- $p$ で滑らかな関数を方向微分する作用

は座標に依存しない形で定義できます。本章では、この二つが同じ対象を表すことを証明し、その空間を **接空間** $T_pM$ とします。

その後、

$$
f:M\to N
\quad\Longrightarrow\quad
df_p:T_pM\to T_{f(p)}N
$$

を定義し、さらに双対空間 $T_p^*M$、接束 $TM$、余接束 $T^*M$ まで構成します。

直接 prerequisite は [GEO1](../GEO1/index.md) と [LA3A](../LA3A/index.md) です。局所座標内の多変数微分と連鎖律は GEO1 の prerequisite である RA6A までを使います。

<!-- definition-example-audit: strict -->

---

## 1. 点の近くで同じ関数は同じものとみなす

接ベクトルを「関数を微分する作用」として定義するとき、必要なのは関数の大域的な値ではなく、点 $p$ の近くでの振る舞いだけです。

<a id="def-geo2-smooth-local-function-class"></a>
<!-- formal-statement-start -->
> **定義（滑らかな関数の芽）**  
> $M$ を滑らかな多様体、$p\in M$ とする。$p$ の開近傍 $U,V$ 上の滑らかな関数
>
> $$
> f:U\to\mathbb R,
> \qquad
> g:V\to\mathbb R
> $$
>
> に対し、ある $p$ の開近傍 $W\subseteq U\cap V$ が存在して
>
> $$
> f|_W=g|_W
> $$
>
> となるとき、$f$ と $g$ は $p$ で同じ **芽**を定めるという。芽全体を $C_p^\infty(M)$ と書く。
<!-- formal-statement-end -->

<!-- definition-example-start: def-geo2-smooth-local-function-class -->
**定義の確認**

$\mathbb R$ の $0$ の近くで

$$
f(x)=x^2
$$

とし、別の関数 $g$ を $|x|<1$ では $x^2$、それより外では別の滑らかな式で定めたとします。$f$ と $g$ は大域的には異なっていても、$0$ の十分小さい近傍で一致するので同じ芽を定めます。

逆に $x^2$ と $x^2+x^3$ は任意の $0$ の近傍で異なる点を持つため、同じ芽ではありません。
<!-- definition-example-end -->

芽は代表元を変えても、和・積・実数倍を自然に定義できます。従って $C_p^\infty(M)$ は実代数になります。

---

## 2. 接ベクトルを「点での微分作用素」として定義する

<a id="def-geo2-tangent-derivation"></a>
<!-- formal-statement-start -->
> **定義（点 $p$ における接ベクトル）**  
> $M$ を滑らかな多様体、$p\in M$ とする。線形写像
>
> $$
> v:C_p^\infty(M)\to\mathbb R
> $$
>
> が任意の $[f],[g]\in C_p^\infty(M)$ に対して
>
> $$
> v([fg])
> =
> f(p)v([g])+g(p)v([f])
> $$
>
> を満たすとき、$v$ を $p$ における **接ベクトル**という。
>
> $p$ における接ベクトル全体を $T_pM$ と書き、これを $M$ の $p$ における **接空間**という。
<!-- formal-statement-end -->

この積の微分則が本質です。定数関数 $1$ について

$$
v(1)=v(1\cdot1)=2v(1)
$$

なので $v(1)=0$ です。従って定数関数はすべて $v$ で0へ送られます。

<!-- definition-example-start: def-geo2-tangent-derivation -->
**定義の確認**
### 例：$\mathbb R^n$ の通常の方向微分

$p\in\mathbb R^n$、$a=(a^1,\dots,a^n)\in\mathbb R^n$ とし、

$$
v_a([f])
=
\sum_{i=1}^n
a^i
\frac{\partial f}{\partial x^i}(p)
$$

と定めます。線形性は偏微分の線形性から従い、積については

$$
\frac{\partial(fg)}{\partial x^i}(p)
=
f(p)\frac{\partial g}{\partial x^i}(p)
+
g(p)\frac{\partial f}{\partial x^i}(p)
$$

なので Leibniz 則を満たします。従って $v_a\in T_p\mathbb R^n$ です。
<!-- definition-example-end -->

ここでは $a$ を先に知っているから方向微分を書けました。一般多様体では逆に、接ベクトル $v$ から座標成分 $a^i$ を取り出します。

---

## 3. 座標基底と接空間の次元

$(U,\varphi)$ を $p$ を含む座標近傍とし、

$$
\varphi=(x^1,\dots,x^n)
$$

と書きます。

<a id="def-geo2-coordinate-basis"></a>
<!-- formal-statement-start -->
> **定義（座標方向の接ベクトル）**  
> $i=1,\dots,n$ に対し、
>
> $$
> \left.\frac{\partial}{\partial x^i}\right|_p([f])
> =
> \frac{\partial(f\circ\varphi^{-1})}{\partial x^i}
> \bigl(\varphi(p)\bigr)
> $$
>
> と定める。
<!-- formal-statement-end -->

<!-- definition-example-start: def-geo2-coordinate-basis -->
**定義の確認**

$M=\mathbb R^2$、標準座標 $(x,y)$、$p=(1,2)$ とします。$f(x,y)=x^2y$ なら

$$
\left.\frac{\partial}{\partial x}\right|_p f
=
2xy\big|_{(1,2)}
=
4,
$$

$$
\left.\frac{\partial}{\partial y}\right|_p f
=
x^2\big|_{(1,2)}
=
1.
$$

通常の偏微分がそのまま座標方向の接ベクトルになっています。
<!-- definition-example-end -->

接空間の構造を証明するため、Euclid 空間の局所一次分解を使います。

<a id="lem-geo2-hadamard-local"></a>
<!-- formal-statement-start -->
> **補題（局所一次分解）**  
> $a\in\mathbb R^n$ とし、$F$ を $a$ の近傍で滑らかな実数値関数とする。$a$ の十分小さい凸近傍では、滑らかな関数 $H_1,\dots,H_n$ が存在して
>
> $$
> F(x)-F(a)
> =
> \sum_{i=1}^n
> (x^i-a^i)H_i(x),
> $$
>
> かつ
>
> $$
> H_i(a)
> =
> \frac{\partial F}{\partial x^i}(a)
> $$
>
> となる。
<!-- formal-statement-end -->

<!-- proof-start -->
### 証明

$a$ を中心とする十分小さい開球を取り、その中で線分

$$
a+t(x-a),
\qquad
0\le t\le1
$$

が定義域に入るようにします。

一変数関数

$$
G(t)=F(a+t(x-a))
$$

へ微積分学の基本定理を使うと、

$$
F(x)-F(a)
=
\int_0^1 G'(t)\,dt.
$$

連鎖律より

$$
G'(t)
=
\sum_{i=1}^n
(x^i-a^i)
\frac{\partial F}{\partial x^i}
(a+t(x-a)).
$$

従って

$$
H_i(x)
=
\int_0^1
\frac{\partial F}{\partial x^i}
(a+t(x-a))
\,dt
$$

と置けば所望の分解を得ます。被積分関数は $(t,x)$ の滑らかな関数なので $H_i$ も滑らかです。また $x=a$ を代入すると

$$
H_i(a)
=
\frac{\partial F}{\partial x^i}(a).
$$

$\square$
<!-- proof-end -->

<a id="thm-geo2-coordinate-expression"></a>
<!-- formal-statement-start -->
> **定理（接ベクトルの座標表示）**  
> $M$ を $n$ 次元滑らかな多様体、$p\in M$ とし、$(x^1,\dots,x^n)$ を $p$ の局所座標とする。任意の $v\in T_pM$ は一意に
>
> $$
> v
> =
> \sum_{i=1}^n
> v(x^i)
> \left.\frac{\partial}{\partial x^i}\right|_p
> $$
>
> と表される。
>
> 従って
>
> $$
> \left\{
> \left.\frac{\partial}{\partial x^1}\right|_p,
> \dots,
> \left.\frac{\partial}{\partial x^n}\right|_p
> \right\}
> $$
>
> は $T_pM$ の基底であり、
>
> $$
> \dim T_pM=n.
> $$
<!-- formal-statement-end -->

<!-- proof-start -->
### 証明

$f$ の $p$ における芽を取り、座標表示

$$
F=f\circ\varphi^{-1}
$$

を考えます。局所一次分解により、$a=\varphi(p)$ の近くで

$$
F(x)-F(a)
=
\sum_{i=1}^n
(x^i-a^i)H_i(x)
$$

と書けます。

これを多様体上へ戻すと、$p$ の近くで

$$
f-f(p)
=
\sum_{i=1}^n
\bigl(x^i-x^i(p)\bigr)h_i
$$

となり、

$$
h_i(p)
=
\frac{\partial(f\circ\varphi^{-1})}{\partial x^i}
\bigl(\varphi(p)\bigr).
$$

$v$ を作用させます。定数項は0へ送られます。また積の微分則より

$$
v\!\left(
(x^i-x^i(p))h_i
\right)
=
(x^i(p)-x^i(p))v(h_i)
+
h_i(p)v(x^i).
$$

第一項は0なので

$$
v(f)
=
\sum_{i=1}^n
v(x^i)
\frac{\partial(f\circ\varphi^{-1})}{\partial x^i}
\bigl(\varphi(p)\bigr).
$$

従って

$$
v
=
\sum_{i=1}^n
v(x^i)
\left.\frac{\partial}{\partial x^i}\right|_p.
$$

一意性は、右辺を座標関数 $x^j$ に作用させれば

$$
\left.\frac{\partial x^j}{\partial x^i}\right|_p
=
\delta_i^j
$$

となることから従います。$\square$
<!-- proof-end -->

この定理によって、抽象的に定義した $T_pM$ が実際に $n$ 次元線形空間であることが分かりました。

---

## 4. 曲線の速度としての接ベクトル

<a id="def-geo2-curve-equivalence"></a>
<!-- formal-statement-start -->
> **定義（点 $p$ を通る曲線の一次同値）**  
> $\gamma:(-\varepsilon,\varepsilon)\to M$ と $\eta:(-\delta,\delta)\to M$ を滑らかな曲線とし、
>
> $$
> \gamma(0)=\eta(0)=p
> $$
>
> とする。$p$ を含む一つの局所座標 $\varphi$ で
>
> $$
> (\varphi\circ\gamma)'(0)
> =
> (\varphi\circ\eta)'(0)
> $$
>
> となるとき、$\gamma$ と $\eta$ は $p$ で一次同値であるという。
<!-- formal-statement-end -->

<!-- definition-example-start: def-geo2-curve-equivalence -->
**定義の確認**

$\mathbb R^2$ の原点で

$$
\gamma(t)=(t,t^2),
\qquad
\eta(t)=(t,0)
$$

とすると、

$$
\gamma'(0)=(1,0)=\eta'(0)
$$

なので二曲線は一次同値です。二次の曲がり方は違っても、接ベクトルは一次の速度しか記録しません。
<!-- definition-example-end -->

この定義は座標の選び方に依存しません。別の座標 $\psi$ を使えば、座標変換

$$
F=\psi\circ\varphi^{-1}
$$

に対して Euclid 空間の連鎖律から

$$
(\psi\circ\gamma)'(0)
=
DF_{\varphi(p)}(\varphi\circ\gamma)'(0)
$$

となるからです。

<a id="def-geo2-curve-tangent"></a>
<!-- formal-statement-start -->
> **定義（曲線が定める微分作用素）**  
> $p$ を通る滑らかな曲線 $\gamma$ に対し、
>
> $$
> v_\gamma([f])
> =
> \left.\frac{d}{dt}\right|_{t=0}
> f(\gamma(t))
> $$
>
> と定める。
<!-- formal-statement-end -->

<!-- definition-example-start: def-geo2-curve-tangent -->
**定義の確認**

$\mathbb R^2$ で

$$
\gamma(t)=(1+t,2t),
\qquad
f(x,y)=x^2+y
$$

とすると、

$$
f(\gamma(t))
=
(1+t)^2+2t
=
1+4t+t^2.
$$

従って

$$
v_\gamma(f)=4.
$$

一方 $\gamma'(0)=(1,2)$ なので、方向微分

$$
\frac{\partial f}{\partial x}(1,0)
+
2\frac{\partial f}{\partial y}(1,0)
=
2+2=4
$$

と一致します。
<!-- definition-example-end -->

<a id="thm-geo2-curve-derivation-equivalence"></a>
<!-- formal-statement-start -->
> **定理（曲線表示と微分作用素表示の同値）**  
> $M$ を滑らかな多様体、$p\in M$ とする。$p$ を通る滑らかな曲線の一次同値類を $[\gamma]$ と書くと、
>
> $$
> [\gamma]\longmapsto v_\gamma
> $$
>
> は曲線の一次同値類全体と $T_pM$ の間の一対一対応を与える。
>
> 局所座標 $(x^1,\dots,x^n)$ では
>
> $$
> v_\gamma
> =
> \sum_{i=1}^n
> \left.\frac{d}{dt}\right|_{t=0}
> x^i(\gamma(t))
> \left.\frac{\partial}{\partial x^i}\right|_p.
> $$
<!-- formal-statement-end -->

<!-- proof-start -->
### 証明

まず $v_\gamma$ が接ベクトルであることを確認します。線形性は一変数微分の線形性から従います。積について

$$
\frac{d}{dt}
(fg)(\gamma(t))
=
f(\gamma(t))
\frac{d}{dt}g(\gamma(t))
+
g(\gamma(t))
\frac{d}{dt}f(\gamma(t))
$$

なので $t=0$ を代入すると Leibniz 則を満たします。

次に局所座標で連鎖律を使うと、

$$
\left.\frac{d}{dt}\right|_{0}
f(\gamma(t))
=
\sum_{i=1}^n
\frac{\partial(f\circ\varphi^{-1})}{\partial x^i}
(\varphi(p))
\left.\frac{d}{dt}\right|_0
x^i(\gamma(t)).
$$

従って表示公式が得られます。

この式から、一次同値な二曲線は同じ $v_\gamma$ を定めます。

逆に $v_\gamma=v_\eta$ なら各座標関数 $x^i$ へ作用させて

$$
\left.\frac{d}{dt}\right|_0x^i(\gamma(t))
=
v_\gamma(x^i)
=
v_\eta(x^i)
=
\left.\frac{d}{dt}\right|_0x^i(\eta(t))
$$

となるので $\gamma,\eta$ は一次同値です。従って写像は単射です。

最後に任意の $v\in T_pM$ を取ります。座標成分を

$$
a^i=v(x^i)
$$

とし、$a=(a^1,\dots,a^n)$ と置きます。$\varphi(U)$ は開集合なので、十分小さい $|t|$ に対して

$$
\varphi(p)+ta\in\varphi(U)
$$

です。そこで

$$
\gamma(t)
=
\varphi^{-1}(\varphi(p)+ta)
$$

と置くと、

$$
\left.\frac{d}{dt}\right|_0x^i(\gamma(t))
=
a^i.
$$

よって座標表示定理から $v_\gamma=v$ です。従って全射でもあります。$\square$
<!-- proof-end -->

この同値性により、以後は同じ接ベクトルを

- 関数を微分する作用
- 曲線の速度

のどちらとして見ても構いません。

---

## 5. 座標を変えると接ベクトルの成分はどう変わるか

同じ点 $p$ の二つの局所座標を

$$
x=(x^1,\dots,x^n),
\qquad
y=(y^1,\dots,y^n)
$$

とします。

座標基底は

$$
\left.\frac{\partial}{\partial x^i}\right|_p
=
\sum_{j=1}^n
\frac{\partial y^j}{\partial x^i}(p)
\left.\frac{\partial}{\partial y^j}\right|_p
$$

と変換します。

実際、任意の芽 $f$ に作用させると、右辺は多変数連鎖律によって左辺と同じ値を与えます。

従って

$$
v
=
\sum_i v^i
\left.\frac{\partial}{\partial x^i}\right|_p
=
\sum_j w^j
\left.\frac{\partial}{\partial y^j}\right|_p
$$

なら

$$
w^j
=
\sum_i
\frac{\partial y^j}{\partial x^i}(p)v^i.
$$

つまり接ベクトルの座標成分は、座標変換の Jacobi 行列によって変換されます。

### 例：極座標での成分変換

平面の $r>0$ の領域で

$$
x=r\cos\theta,
\qquad
y=r\sin\theta
$$

とします。すると

$$
\frac{\partial}{\partial r}
=
\cos\theta\frac{\partial}{\partial x}
+
\sin\theta\frac{\partial}{\partial y},
$$

$$
\frac{\partial}{\partial\theta}
=
-r\sin\theta\frac{\partial}{\partial x}
+
r\cos\theta\frac{\partial}{\partial y}.
$$

同じ接ベクトルでも、基底を変えると成分が変わります。変わらないのは $v$ という抽象的な線形作用そのものです。

---

## 6. 滑らかな写像の微分

<a id="def-geo2-differential"></a>
<!-- formal-statement-start -->
> **定義（滑らかな写像の微分）**  
> $f:M\to N$ を滑らかな写像、$p\in M$ とする。$v\in T_pM$ に対し、
>
> $$
> df_p(v):C_{f(p)}^\infty(N)\to\mathbb R
> $$
>
> を
>
> $$
> df_p(v)([h])
> =
> v([h\circ f])
> $$
>
> で定める。
>
> この線形写像
>
> $$
> df_p:T_pM\to T_{f(p)}N
> $$
>
> を $f$ の $p$ における **微分**という。
<!-- formal-statement-end -->

$h$ が $f(p)$ の近くで定義されていれば、$f$ の連続性により $h\circ f$ は $p$ の近くで定義されます。また代表元を小さい近傍へ取り直しても芽は変わらないので、この定義は良定義です。

<!-- definition-example-start: def-geo2-differential -->
**定義の確認**
### 例：Euclid 空間では Jacobi 行列になる

$$
f:\mathbb R^2\to\mathbb R^2,
\qquad
f(x,y)=(x^2y,e^x+y)
$$

とします。$p=(1,0)$ で

$$
Df_p
=
\begin{pmatrix}
0 & 1\\
1 & 1
\end{pmatrix}.
$$

接ベクトル $v=a\partial_x+b\partial_y$ に対し、

$$
df_p(v)
=
b\,\partial_{u}
+
(a+b)\,\partial_v
$$

です。通常の多変数微分と一致しています。
<!-- definition-example-end -->

<a id="thm-geo2-differential-coordinate"></a>
<!-- formal-statement-start -->
> **定理（微分の座標表示）**  
> $f:M^m\to N^n$ を滑らかな写像とする。$p\in M$ の局所座標を $x=(x^1,\dots,x^m)$、$f(p)$ の局所座標を $y=(y^1,\dots,y^n)$ とする。
>
> $$
> v
> =
> \sum_{i=1}^m
> v^i
> \left.\frac{\partial}{\partial x^i}\right|_p
> $$
>
> なら
>
> $$
> df_p(v)
> =
> \sum_{j=1}^n
> \left(
> \sum_{i=1}^m
> \frac{\partial(y^j\circ f)}{\partial x^i}(p)v^i
> \right)
> \left.\frac{\partial}{\partial y^j}\right|_{f(p)}.
> $$
>
> 従って $df_p$ の行列表現は座標表示
>
> $$
> y\circ f\circ x^{-1}
> $$
>
> の Jacobi 行列である。
<!-- formal-statement-end -->

<!-- proof-start -->
### 証明

$df_p(v)$ の $y^j$ 成分は、接ベクトルの座標表示定理により

$$
df_p(v)(y^j)
$$

です。微分の定義から

$$
df_p(v)(y^j)
=
v(y^j\circ f).
$$

さらに $v$ の $x$ 座標表示を使えば

$$
v(y^j\circ f)
=
\sum_{i=1}^m
v^i
\frac{\partial(y^j\circ f)}{\partial x^i}(p).
$$

これを各 $j$ について並べれば所望の式を得ます。$\square$
<!-- proof-end -->

曲線表示を使うと、微分はさらに直感的です。

<a id="prop-geo2-differential-curves"></a>
<!-- formal-statement-start -->
> **命題（微分は曲線の速度を送る）**  
> $v=[\gamma]\in T_pM$ なら
>
> $$
> df_p(v)
> =
> [f\circ\gamma]
> \in T_{f(p)}N.
> $$
<!-- formal-statement-end -->

<!-- proof-start -->
### 証明

任意の $h\in C_{f(p)}^\infty(N)$ に対して

$$
df_p(v_\gamma)(h)
=
v_\gamma(h\circ f)
=
\left.\frac{d}{dt}\right|_0
h(f(\gamma(t)))
=
v_{f\circ\gamma}(h).
$$

従って両者は同じ接ベクトルです。$\square$
<!-- proof-end -->

<a id="thm-geo2-composition-differential"></a>
<!-- formal-statement-start -->
> **定理（多様体上の連鎖律）**  
> 滑らかな写像
>
> $$
> M\xrightarrow{f}N\xrightarrow{g}P
> $$
>
> と $p\in M$ に対して
>
> $$
> d(g\circ f)_p
> =
> dg_{f(p)}\circ df_p.
> $$
>
> また恒等写像について
>
> $$
> d(\operatorname{id}_M)_p
> =
> \operatorname{id}_{T_pM}.
> $$
<!-- formal-statement-end -->

<!-- proof-start -->
### 証明

$v\in T_pM$ と $[h]\in C_{g(f(p))}^\infty(P)$ を取ります。定義から

$$
d(g\circ f)_p(v)(h)
=
v(h\circ g\circ f).
$$

一方、

$$
\bigl(dg_{f(p)}(df_p(v))\bigr)(h)
=
df_p(v)(h\circ g)
=
v((h\circ g)\circ f).
$$

両者は同じなので

$$
d(g\circ f)_p(v)
=
dg_{f(p)}(df_p(v)).
$$

$v$ は任意なので写像として一致します。

恒等写像については

$$
d(\operatorname{id}_M)_p(v)(h)
=
v(h\circ\operatorname{id}_M)
=
v(h)
$$

なので恒等写像です。$\square$
<!-- proof-end -->

微分同相写像 $f$ なら

$$
d(f^{-1})_{f(p)}\circ df_p
=
\operatorname{id}_{T_pM}
$$

なので $df_p$ は線形同型です。これは「微分同相な多様体は各点で同じ次元を持つ」ことも示します。

---

## 7. 実数値関数の微分と余接空間

<a id="def-geo2-cotangent-space"></a>
<!-- formal-statement-start -->
> **定義（余接空間）**  
> $p\in M$ に対し、
>
> $$
> T_p^*M=(T_pM)^*
> $$
>
> を $p$ における **余接空間**という。$T_p^*M$ の元を **余ベクトル**という。
<!-- formal-statement-end -->

<!-- definition-example-start: def-geo2-cotangent-space -->
**定義の確認**

局所座標 $(x^1,\dots,x^n)$ に対し、

$$
dx^i|_p:T_pM\to\mathbb R,
\qquad
dx^i|_p(v)=v(x^i)
$$

と定めます。すると

$$
dx^i|_p
\left(
\left.\frac{\partial}{\partial x^j}\right|_p
\right)
=
\delta_j^i.
$$

従って

$$
\{dx^1|_p,\dots,dx^n|_p\}
$$

は座標基底の双対基底です。
<!-- definition-example-end -->

<a id="def-geo2-function-differential"></a>
<!-- formal-statement-start -->
> **定義（実数値関数の微分）**  
> 滑らかな関数 $h:M\to\mathbb R$ に対し、
>
> $$
> dh_p\in T_p^*M
> $$
>
> を
>
> $$
> dh_p(v)=v(h)
> $$
>
> で定める。
<!-- formal-statement-end -->

<!-- definition-example-start: def-geo2-function-differential -->
**定義の確認**

局所座標で

$$
v=\sum_i v^i\frac{\partial}{\partial x^i}\Big|_p
$$

なら

$$
dh_p(v)
=
\sum_i
\frac{\partial h}{\partial x^i}(p)v^i.
$$

従って

$$
dh_p
=
\sum_i
\frac{\partial h}{\partial x^i}(p)\,dx^i|_p.
$$

通常の全微分がそのまま余ベクトルになっています。
<!-- definition-example-end -->

<a id="def-geo2-covector-pullback"></a>
<!-- formal-statement-start -->
> **定義（余ベクトルの引き戻し）**  
> $f:M\to N$ を滑らかな写像、$p\in M$ とする。$\alpha\in T_{f(p)}^*N$ に対して
>
> $$
> f_p^*\alpha
> =
> \alpha\circ df_p
> \in T_p^*M
> $$
>
> と定め、これを $\alpha$ の $f$ による $p$ での **引き戻し**という。
<!-- formal-statement-end -->

<!-- definition-example-start: def-geo2-covector-pullback -->
**定義の確認**

$$
f:\mathbb R^2\to\mathbb R^2,
\qquad
f(x,y)=(u,v)=(x+y,xy)
$$

とします。点 $(x,y)$ で

$$
du=df^*(du)=dx+dy,
$$

$$
dv=df^*(dv)=y\,dx+x\,dy.
$$

たとえば $\alpha=2\,du-dv$ なら

$$
f^*\alpha
=
(2-y)\,dx+(2-x)\,dy.
$$
<!-- definition-example-end -->

ここで扱うのは一点の余ベクトルの引き戻しです。微分形式全体の引き戻しは GEO7 で扱います。

<a id="prop-geo2-pullback-composition"></a>
<!-- formal-statement-start -->
> **命題（余ベクトルの引き戻しの合成則）**  
> $M\xrightarrow{f}N\xrightarrow{g}P$ に対し、
>
> $$
> (g\circ f)_p^*
> =
> f_p^*\circ g_{f(p)}^*.
> $$
<!-- formal-statement-end -->

<!-- proof-start -->
### 証明

$\alpha\in T_{g(f(p))}^*P$ と $v\in T_pM$ に対し、

$$
((g\circ f)_p^*\alpha)(v)
=
\alpha(d(g\circ f)_p(v)).
$$

連鎖律を使うと

$$
\alpha(dg_{f(p)}(df_p(v)))
=
(g_{f(p)}^*\alpha)(df_p(v))
=
(f_p^*(g_{f(p)}^*\alpha))(v).
$$

従って二つの余ベクトルは一致します。$\square$
<!-- proof-end -->

---

## 8. 接束とベクトル束

点ごとの接空間を全部まとめます。

<a id="def-geo2-tangent-bundle"></a>
<!-- formal-statement-start -->
> **定義（接束）**  
> 滑らかな多様体 $M$ に対し、
>
> $$
> TM
> =
> \bigsqcup_{p\in M}T_pM
> $$
>
> を **接束**という。$v\in T_pM$ に対して
>
> $$
> \pi(v)=p
> $$
>
> と定めた写像 $\pi:TM\to M$ を自然な射影という。
<!-- formal-statement-end -->

<!-- definition-example-start: def-geo2-tangent-bundle -->
**定義の確認**

$M=\mathbb R^n$ では各 $T_p\mathbb R^n$ が標準基底で $\mathbb R^n$ と同一視できるので、

$$
T\mathbb R^n
\cong
\mathbb R^n\times\mathbb R^n.
$$

第一成分が基点 $p$、第二成分がその点での速度ベクトルです。
<!-- definition-example-end -->

<a id="def-geo2-vector-bundle"></a>
<!-- formal-statement-start -->
> **定義（滑らかな実ベクトル束）**  
> 滑らかな多様体 $M$ 上の各ファイバーが $k$ 次元である滑らかな実ベクトル束とは、滑らかな多様体 $E$ と滑らかな全射
>
> $$
> \pi:E\to M
> $$
>
> であって、各 $p\in M$ の近くに開集合 $U$ と微分同相写像
>
> $$
> \Phi:\pi^{-1}(U)\to U\times\mathbb R^k
> $$
>
> が存在し、
>
> 1. $\operatorname{pr}_1\circ\Phi=\pi$,
> 2. 各 $q\in U$ で $\Phi|_{\pi^{-1}(q)}:\pi^{-1}(q)\to\{q\}\times\mathbb R^k$ が線形同型
>
> となるものをいう。この $\Phi$ を **局所自明化**という。
<!-- formal-statement-end -->

<!-- definition-example-start: def-geo2-vector-bundle -->
**定義の確認**

積空間

$$
E=M\times\mathbb R^k,
\qquad
\pi(p,a)=p
$$

は各ファイバーが $k$ 次元のベクトル束です。どの開集合 $U$ でも恒等写像

$$
U\times\mathbb R^k\to U\times\mathbb R^k
$$

が局所自明化になります。これを自明束と呼びます。
<!-- definition-example-end -->

<a id="thm-geo2-tangent-bundle-smooth"></a>
<!-- formal-statement-start -->
> **定理（接束の滑らかな構造）**  
> $M$ を $n$ 次元滑らかな多様体とする。$TM$ には、各座標近傍
>
> $$
> \varphi:U\to\varphi(U)\subseteq\mathbb R^n
> $$
>
> に対して
>
> $$
> \widetilde\varphi:\pi^{-1}(U)\to\varphi(U)\times\mathbb R^n
> $$
>
> $$
> \widetilde\varphi
> \left(
> \sum_i v^i
> \left.\frac{\partial}{\partial x^i}\right|_p
> \right)
> =
> (\varphi(p),v^1,\dots,v^n)
> $$
>
> が座標写像となる一意な自然な滑らかな構造が入る。
>
> この構造で $TM$ は $2n$ 次元滑らかな多様体であり、
>
> $$
> \pi:TM\to M
> $$
>
> は各ファイバーが $n$ 次元の滑らかなベクトル束である。
<!-- formal-statement-end -->

<!-- proof-start -->
### 証明

二つの局所座標を $x$ と $y$ とし、座標変換を

$$
F=y\circ x^{-1}
$$

と書きます。

$x$ 座標で基点を $a=x(p)$、接ベクトルの成分を $v\in\mathbb R^n$ とします。接ベクトルの成分変換則から、$y$ 座標での成分は

$$
DF_a\,v
$$

です。従って接束上の座標変換は

$$
(a,v)
\longmapsto
(F(a),DF_a\,v)
$$

となります。

$F$ は $C^\infty$ 級であり、各成分の一階偏導関数も $C^\infty$ 級なので、この写像は $\mathbb R^{2n}$ の開集合間の滑らかな写像です。

逆の座標変換は $F^{-1}$ を使って

$$
(b,w)
\longmapsto
(F^{-1}(b),D(F^{-1})_b\,w)
$$

となり、これも滑らかです。従って $\widetilde\varphi$ たちは滑らかなアトラスを定め、その極大化によって $TM$ に $2n$ 次元の滑らかな構造が入ります。

この座標で射影 $\pi$ は

$$
(a,v)\longmapsto a
$$

なので滑らかです。

また

$$
\pi^{-1}(U)\to U\times\mathbb R^n,
\qquad
v_p\longmapsto
\bigl(p,(v^1,\dots,v^n)\bigr)
$$

は各ファイバー上で線形同型であり、局所自明化を与えます。また、これらの $\widetilde\varphi$ を座標写像として含む極大滑らかアトラスは GEO1 の極大化により一意です。この意味で、上の滑らかな構造は自然に一意に定まります。従って $TM$ は各ファイバーが $n$ 次元のベクトル束です。$\square$
<!-- proof-end -->

接束の座標変換で現れる

$$
DF_a\,v
$$

が、「接ベクトルは座標変換の一次近似で運ばれる」という事実をそのまま表しています。

---

## 9. 余接束

<a id="def-geo2-cotangent-bundle"></a>
<!-- formal-statement-start -->
> **定義（余接束）**  
> 滑らかな多様体 $M$ に対し、
>
> $$
> T^*M
> =
> \bigsqcup_{p\in M}T_p^*M
> $$
>
> を **余接束**という。
<!-- formal-statement-end -->

<!-- definition-example-start: def-geo2-cotangent-bundle -->
**定義の確認**

$M=\mathbb R^n$ では

$$
T_p^*\mathbb R^n
=
\operatorname{span}
\{dx^1|_p,\dots,dx^n|_p\}
$$

なので

$$
T^*\mathbb R^n
\cong
\mathbb R^n\times(\mathbb R^n)^*
\cong
\mathbb R^n\times\mathbb R^n.
$$

ただし第二成分は速度ではなく、速度を実数へ写す線形形式です。
<!-- definition-example-end -->

<a id="prop-geo2-cotangent-bundle-smooth"></a>
<!-- formal-statement-start -->
> **命題（余接束の局所自明化）**  
> $M$ が $n$ 次元滑らかな多様体なら、$T^*M$ は自然に $2n$ 次元滑らかな多様体となり、$M$ 上の各ファイバーが $n$ 次元のベクトル束になる。
>
> 局所座標 $x=(x^1,\dots,x^n)$ では
>
> $$
> \alpha_p
> =
> \sum_i a_i\,dx^i|_p
> $$
>
> を
>
> $$
> (x(p),a_1,\dots,a_n)
> $$
>
> に送ることで局所自明化される。
<!-- formal-statement-end -->

<!-- proof-start -->
### 証明

別の座標 $y$ を取り、

$$
F=y\circ x^{-1}
$$

とします。余ベクトルを

$$
\alpha
=
\sum_i a_i\,dx^i
=
\sum_j b_j\,dy^j
$$

と書きます。

$$
dy^j
=
\sum_i
\frac{\partial y^j}{\partial x^i}dx^i
$$

なので、列ベクトル表示では

$$
a=(DF_x)^{\mathsf T}b.
$$

従って

$$
b=(DF_x)^{-\mathsf T}a.
$$

よって余接束上の座標変換は

$$
(x,a)
\longmapsto
\left(
F(x),
(DF_x)^{-\mathsf T}a
\right).
$$

$F$ は微分同相写像なので $DF_x$ は可逆です。逆行列の各成分は行列式を分母に持つ滑らかな関数として書けるため、この座標変換は滑らかです。

従って接束の場合と同様に滑らかなアトラスが得られ、各ファイバーで線形な局所自明化を持つので各ファイバーが $n$ 次元のベクトル束になります。$\square$
<!-- proof-end -->

接ベクトルの成分が $DF$ で変換されるのに対し、余ベクトルの成分は $(DF)^{-\mathsf T}$ で変換されます。この双対的な変換則が、後のテンソル場と微分形式の基礎になります。

---

## 10. 積多様体の接空間

GEO1 で作った積多様体に対し、接空間も直和に分解します。

<a id="prop-geo2-product-tangent"></a>
<!-- formal-statement-start -->
> **命題（積多様体の接空間）**  
> $M,N$ を滑らかな多様体とし、$(p,q)\in M\times N$ とする。射影
>
> $$
> \pi_M:M\times N\to M,
> \qquad
> \pi_N:M\times N\to N
> $$
>
> により
>
> $$
> T_{(p,q)}(M\times N)
> \longrightarrow
> T_pM\oplus T_qN,
> $$
>
> $$
> v
> \longmapsto
> \bigl(d\pi_M(v),d\pi_N(v)\bigr)
> $$
>
> は線形同型である。
<!-- formal-statement-end -->

<!-- proof-start -->
### 証明

$M$ の局所座標を $x=(x^1,\dots,x^m)$、$N$ の局所座標を $y=(y^1,\dots,y^n)$ とします。積座標では接空間の座標基底は

$$
\frac{\partial}{\partial x^1},
\dots,
\frac{\partial}{\partial x^m},
\frac{\partial}{\partial y^1},
\dots,
\frac{\partial}{\partial y^n}
$$

です。

接ベクトル

$$
v
=
\sum_i a^i\frac{\partial}{\partial x^i}
+
\sum_j b^j\frac{\partial}{\partial y^j}
$$

に対して、射影の座標表示は

$$
(x,y)\mapsto x,
\qquad
(x,y)\mapsto y
$$

なので

$$
d\pi_M(v)
=
\sum_i a^i\frac{\partial}{\partial x^i},
$$

$$
d\pi_N(v)
=
\sum_j b^j\frac{\partial}{\partial y^j}.
$$

従ってこの写像は座標成分を二つに分けるだけであり、明らかに線形同型です。$\square$
<!-- proof-end -->

---

## 11. 具体例：球面の接空間

まず同じ式を周囲の Euclid 空間への写像として

$$
\widetilde q:
\mathbb R^{n+1}\setminus\{0\}\to\mathbb R^{n+1},
\qquad
\widetilde q(x)=\frac{x}{\|x\|}
$$

と見ます。値は実際には $S^n$ に入ります。

$v\in\mathbb R^{n+1}$ に対し、通常の多変数微分を計算すると

$$
D\widetilde q_x(v)
=
\frac{v}{\|x\|}
-
\frac{x\langle x,v\rangle}{\|x\|^3}.
$$

実際、

$$
\widetilde q(x)=\|x\|^{-1}x
$$

に積の微分則を使い、

$$
D(\|x\|^{-1})_x(v)
=
-\frac{\langle x,v\rangle}{\|x\|^3}
$$

とすれば得られます。

次に $p\in S^n$ を固定し、$p$ を通る任意の球面上の曲線 $\sigma$ を取ります。

$$
\|\sigma(t)\|^2=1
$$

を $t=0$ で微分すると

$$
2\langle p,\sigma'(0)\rangle=0.
$$

従って球面上の曲線の速度は必ず $p^\perp$ に入ります。

逆に $w\perp p$ なら

$$
\gamma(t)
=
\widetilde q(p+tw)
=
\frac{p+tw}{\|p+tw\|}
$$

は $S^n$ 上の曲線です。上の微分公式と $\|p\|=1$、$\langle p,w\rangle=0$ から

$$
\gamma'(0)
=
D\widetilde q_p(w)
=
w.
$$

したがって $p^\perp$ の任意の方向が球面上の曲線の速度として実現します。

GEO1 の立体射影座標を一枚固定します。立体射影とその逆写像は周囲の Euclid 座標の滑らかな式で書けるため、両方向の連鎖律から、二曲線が一次同値であることと周囲の Euclid 空間での速度が一致することは同値です。よって

$$
[\sigma]\longmapsto \sigma'(0)
$$

は線形同型

$$
T_pS^n
\cong
\{w\in\mathbb R^{n+1}:\langle p,w\rangle=0\}
=
p^\perp
$$

を与えます。

GEO3 ではこれを、球面が正則値の逆像

$$
S^n
=
\{x:\|x\|^2=1\}
$$

であることから

$$
T_pS^n
=
\ker d(\|x\|^2)_p
$$

として一般化します。

---

## 12. 演習

### GEO2-A01 接ベクトルを微分作用素として計算する

$\mathbb R^2$ の点 $p=(1,-1)$ で

$$
v
=
2\left.\frac{\partial}{\partial x}\right|_p
-
3\left.\frac{\partial}{\partial y}\right|_p
$$

とする。

1. $f(x,y)=x^2y+e^y$ に対して $v(f)$ を求めよ。
2. $g(x,y)=xy$ に対して Leibniz 則を使って $v(g^2)$ を求めよ。

- Level: A
- 狙い: 接ベクトルを点での微分作用素として使う

<!-- solution-start -->
**詳細解答**

1. まず

   $$
   \frac{\partial f}{\partial x}=2xy,
   \qquad
   \frac{\partial f}{\partial y}=x^2+e^y.
   $$

   $p=(1,-1)$ では

   $$
   \frac{\partial f}{\partial x}(p)=-2,
   \qquad
   \frac{\partial f}{\partial y}(p)=1+e^{-1}.
   $$

   従って

   $$
   v(f)
   =
   2(-2)-3(1+e^{-1})
   =
   -7-\frac3e.
   $$

2. $g(p)=-1$ です。Leibniz 則から

   $$
   v(g^2)
   =
   v(g\cdot g)
   =
   2g(p)v(g).
   $$

   また

   $$
   v(g)
   =
   2y-3x
   $$

   を $p$ で評価して

   $$
   v(g)=-2-3=-5.
   $$

   よって

   $$
   v(g^2)
   =
   2(-1)(-5)
   =
   10.
   $$
<!-- solution-end -->

### GEO2-A02 曲線から接ベクトルを読む

$$
\gamma(t)
=
(\cos t,\sin t)
$$

を $S^1$ 上の曲線とする。

1. $t=0$ における速度を 周囲の $\mathbb R^2$ のベクトルとして求めよ。
2. 高さ関数 $h(x,y)=y$ に対して $v_\gamma(h)$ を求めよ。
3. $\eta(t)=(\cos(t+t^3),\sin(t+t^3))$ は $t=0$ で $\gamma$ と同じ接ベクトルを定めることを示せ。

- Level: A
- 狙い: 曲線の一次同値と方向微分を対応させる

<!-- solution-start -->
**詳細解答**

1. 微分すると

   $$
   \gamma'(t)=(-\sin t,\cos t)
   $$

   なので

   $$
   \gamma'(0)=(0,1).
   $$

2. 曲線に沿って

   $$
   h(\gamma(t))
   =
   \sin t
   $$

   だから

   $$
   v_\gamma(h)
   =
   \left.\frac{d}{dt}\right|_0\sin t
   =
   1.
   $$

3. $\theta(t)=t+t^3$ と置くと $\theta'(0)=1$ です。

   $$
   \eta'(0)
   =
   (-\sin\theta(0),\cos\theta(0))\theta'(0)
   =
   (0,1).
   $$

   従って $\gamma$ と $\eta$ は同じ一次速度を持ち、同じ接ベクトルを定めます。
<!-- solution-end -->

### GEO2-A03 写像の微分

$$
f:\mathbb R^2\to\mathbb R^3,
\qquad
f(x,y)=(x^2,xy,\sin y)
$$

とする。

1. $df_{(1,0)}$ の行列表現を求めよ。
2. $v=2\partial_x-\partial_y$ の像を求めよ。

- Level: A
- 狙い: 多様体上の微分を Euclid 空間の Jacobi 行列として計算する

<!-- solution-start -->
**詳細解答**

1. Jacobi 行列は

   $$
   Df_{(x,y)}
   =
   \begin{pmatrix}
   2x & 0\\
   y & x\\
   0 & \cos y
   \end{pmatrix}.
   $$

   従って

   $$
   Df_{(1,0)}
   =
   \begin{pmatrix}
   2 & 0\\
   0 & 1\\
   0 & 1
   \end{pmatrix}.
   $$

2. $v$ の成分列は $(2,-1)^{\mathsf T}$ です。よって

   $$
   df_{(1,0)}(v)
   =
   \begin{pmatrix}
   2 & 0\\
   0 & 1\\
   0 & 1
   \end{pmatrix}
   \begin{pmatrix}
   2\\
   -1
   \end{pmatrix}
   =
   \begin{pmatrix}
   4\\
   -1\\
   -1
   \end{pmatrix}.
   $$

   したがって

   $$
   df_{(1,0)}(v)
   =
   4\partial_{u_1}
   -
   \partial_{u_2}
   -
   \partial_{u_3}.
   $$
<!-- solution-end -->

### GEO2-A04 余ベクトルの引き戻し

$$
f:\mathbb R^2\to\mathbb R^2,
\qquad
f(x,y)=(u,v)=(x+y,x^2-y)
$$

とする。$N=\mathbb R^2$ 側の余ベクトル

$$
\alpha=3\,du+2\,dv
$$

を $f$ で引き戻せ。

- Level: A
- 狙い: 余ベクトルの引き戻しを座標で計算する

<!-- solution-start -->
**詳細解答**

まず

$$
du=d(x+y)=dx+dy,
$$

$$
dv=d(x^2-y)=2x\,dx-dy.
$$

従って

$$
f^*\alpha
=
3(dx+dy)+2(2x\,dx-dy).
$$

整理すると

$$
f^*\alpha
=
(3+4x)\,dx+dy.
$$

点 $p=(x,y)$ を固定すれば、これは $T_p^*\mathbb R^2$ の余ベクトルです。
<!-- solution-end -->

### GEO2-B01 曲線の一次同値が座標に依存しないこと

$p\in M$ を通る滑らかな曲線 $\gamma,\eta$ が、一つの局所座標 $x$ で

$$
(x\circ\gamma)'(0)
=
(x\circ\eta)'(0)
$$

を満たすとする。別の局所座標 $y$ でも

$$
(y\circ\gamma)'(0)
=
(y\circ\eta)'(0)
$$

となることを、定義域の重なりを明示して証明せよ。

- Level: B
- 狙い: 曲線による接ベクトル定義の座標独立性を証明する

<!-- solution-start -->
**詳細解答**

$\gamma(0)=\eta(0)=p$ なので、十分小さい $|t|$ に制限すれば両曲線は $x$ と $y$ の座標近傍の共通部分に入ります。

座標変換を

$$
F=y\circ x^{-1}
$$

と置くと、その小さい区間で

$$
y\circ\gamma
=
F\circ x\circ\gamma,
$$

$$
y\circ\eta
=
F\circ x\circ\eta.
$$

Euclid 空間の連鎖律より

$$
(y\circ\gamma)'(0)
=
DF_{x(p)}(x\circ\gamma)'(0),
$$

$$
(y\circ\eta)'(0)
=
DF_{x(p)}(x\circ\eta)'(0).
$$

仮定で右辺の入力ベクトルが等しいので、出力も等しくなります。従って一次同値性は座標の選択に依存しません。
<!-- solution-end -->

### GEO2-B02 極座標で接ベクトルと余ベクトルを変換する

$r>0$ の平面で

$$
x=r\cos\theta,
\qquad
y=r\sin\theta
$$

とする。

1. $\partial_r,\partial_\theta$ を $\partial_x,\partial_y$ で表せ。
2. $dr,d\theta$ を $dx,dy$ で表せ。
3. 双対関係
   $$
   dr(\partial_r)=1,\quad dr(\partial_\theta)=0,\quad
   d\theta(\partial_r)=0,\quad d\theta(\partial_\theta)=1
   $$
   を直接確認せよ。

- Level: B
- 狙い: 接基底と余接基底の逆転置変換を具体計算する

<!-- solution-start -->
**詳細解答**

1. 座標変換の微分から

   $$
   \frac{\partial x}{\partial r}=\cos\theta,
   \qquad
   \frac{\partial y}{\partial r}=\sin\theta,
   $$

   $$
   \frac{\partial x}{\partial\theta}=-r\sin\theta,
   \qquad
   \frac{\partial y}{\partial\theta}=r\cos\theta.
   $$

   従って

   $$
   \partial_r
   =
   \cos\theta\,\partial_x
   +
   \sin\theta\,\partial_y,
   $$

   $$
   \partial_\theta
   =
   -r\sin\theta\,\partial_x
   +
   r\cos\theta\,\partial_y.
   $$

2. $r=\sqrt{x^2+y^2}$ なので

   $$
   dr
   =
   \frac{x}{r}dx+\frac{y}{r}dy
   =
   \cos\theta\,dx+\sin\theta\,dy.
   $$

   また局所的に $\theta=\operatorname{Arg}(x+iy)$ とすれば

   $$
   d\theta
   =
   -\frac{y}{r^2}dx+\frac{x}{r^2}dy
   =
   -\frac{\sin\theta}{r}dx
   +
   \frac{\cos\theta}{r}dy.
   $$

3. 例えば

   $$
   dr(\partial_r)
   =
   \cos^2\theta+\sin^2\theta
   =
   1,
   $$

   $$
   dr(\partial_\theta)
   =
   -r\cos\theta\sin\theta
   +
   r\sin\theta\cos\theta
   =
   0.
   $$

   同様に

   $$
   d\theta(\partial_r)=0,
   \qquad
   d\theta(\partial_\theta)=1.
   $$

   従って二組は互いに双対基底です。
<!-- solution-end -->

### GEO2-B03 積多様体の接空間

$M,N$ を滑らかな多様体とし、$\gamma(t)=(\alpha(t),\beta(t))$ を $M\times N$ 上の曲線とする。

1. $[\gamma]$ が
   $$
   ([\alpha],[\beta])
   \in T_{\alpha(0)}M\oplus T_{\beta(0)}N
   $$
   に対応することを示せ。
2. この対応が本文の
   $$
   v\mapsto(d\pi_M(v),d\pi_N(v))
   $$
   と一致することを示せ。
3. $T_{(p,q)}(M\times N)$ の次元を求めよ。

- Level: B
- 狙い: 曲線表示・微分・直和分解を統合する

<!-- solution-start -->
**詳細解答**

1. 積座標 $(x,y)$ では

   $$
   (x,y)\circ\gamma(t)
   =
   (x(\alpha(t)),y(\beta(t))).
   $$

   従って速度は

   $$
   \left(
   (x\circ\alpha)'(0),
   (y\circ\beta)'(0)
   \right)
   $$

   に分かれます。第一成分は $[\alpha]$、第二成分は $[\beta]$ の座標成分です。

2. 微分は曲線の速度を像の曲線の速度へ送るので

   $$
   d\pi_M([\gamma])
   =
   [\pi_M\circ\gamma]
   =
   [\alpha],
   $$

   $$
   d\pi_N([\gamma])
   =
   [\pi_N\circ\gamma]
   =
   [\beta].
   $$

   よって本文の線形同型と一致します。

3. $\dim M=m,\dim N=n$ とすれば

   $$
   \dim T_pM=m,
   \qquad
   \dim T_qN=n.
   $$

   直和の次元は和なので

   $$
   \dim T_{(p,q)}(M\times N)
   =
   m+n.
   $$
<!-- solution-end -->

### GEO2-C01 球面への正規化写像を接空間まで追う

$$
q:\mathbb R^{n+1}\setminus\{0\}\to S^n,
\qquad
q(x)=\frac{x}{\|x\|}
$$

を考える。

1. $dq_x(v)$ を求めよ。
2. $dq_x(v)$ が $q(x)$ に直交することを示せ。
3. $\ker dq_x$ を求めよ。
4. $\|p\|=1$ とし、任意の $w\perp p$ に対して
   $$
   \gamma(t)=\frac{p+tw}{\|p+tw\|}
   $$
   が $S^n$ 上の曲線であり、$\gamma'(0)=w$ となることを示せ。
5. 任意の $S^n$ 上の曲線 $\sigma$ について $\sigma'(0)\perp p$ となることを示し、以上から
   $$
   T_pS^n\cong p^\perp
   $$
   を説明せよ。

- Level: C
- 狙い: 微分・核・曲線表示を一つの幾何的構成で統合する

<!-- solution-start -->
**詳細解答**

1. $r(x)=\|x\|$ と置くと

   $$
   q(x)=r(x)^{-1}x.
   $$

   まず

   $$
   dr_x(v)
   =
   \frac{\langle x,v\rangle}{\|x\|}
   $$

   です。従って

   $$
   d(r^{-1})_x(v)
   =
   -r(x)^{-2}dr_x(v)
   =
   -\frac{\langle x,v\rangle}{\|x\|^3}.
   $$

   積の微分則から

   $$
   dq_x(v)
   =
   \frac{v}{\|x\|}
   -
   \frac{x\langle x,v\rangle}{\|x\|^3}.
   $$

2. $q(x)=x/\|x\|$ なので

   $$
   \left\langle q(x),dq_x(v)\right\rangle
   =
   \frac{\langle x,v\rangle}{\|x\|^2}
   -
   \frac{\|x\|^2\langle x,v\rangle}{\|x\|^4}
   =
   0.
   $$

   従って像は $q(x)^\perp$ に入ります。

3. $dq_x(v)=0$ とすると

   $$
   \frac{v}{\|x\|}
   =
   \frac{x\langle x,v\rangle}{\|x\|^3},
   $$

   すなわち

   $$
   v
   =
   \frac{\langle x,v\rangle}{\|x\|^2}x.
   $$

   従って $v$ は $x$ の実数倍です。逆に $v=\lambda x$ を代入すれば $dq_x(v)=0$ です。よって

   $$
   \ker dq_x
   =
   \operatorname{span}\{x\}.
   $$

4. $\|p\|=1$、$w\perp p$ なら $p+tw\ne0$ は $t=0$ の近くで成り立ち、定義から $\|\gamma(t)\|=1$ です。従って $\gamma(t)\in S^n$ です。

   1の公式を $x=p$ に適用すると

   $$
   \gamma'(0)
   =
   dq_p(w)
   =
   w-p\langle p,w\rangle
   =
   w.
   $$

5. 任意の球面上の曲線 $\sigma$ について

   $$
   \|\sigma(t)\|^2=1
   $$

   です。$t=0$ で微分すると

   $$
   2\langle p,\sigma'(0)\rangle=0,
   $$

   したがって $\sigma'(0)\in p^\perp$ です。

   一方4より任意の $w\in p^\perp$ は実際に球面上の曲線の速度として実現できます。GEO1 の立体射影座標とその逆写像に連鎖律を使えば、曲線の一次同値は周囲の Euclid 空間での速度の一致と同値です。従って

   $$
   [\sigma]\longmapsto\sigma'(0)
   $$

   は線形な一対一対応を与え、

   $$
   T_pS^n
   \cong
   p^\perp
   =
   \{w\in\mathbb R^{n+1}:\langle p,w\rangle=0\}.
   $$

   この同一視は球面の内在的な接空間を周囲の Euclid 空間の部分空間として具体化したものです。
<!-- solution-end -->

---

## 13. まとめ

本章では、点 $p$ の一次近似を三つの形で捉えました。

$$
\text{曲線の速度}
\longleftrightarrow
\text{Leibniz 則を満たす微分作用素}
\longleftrightarrow
\text{局所座標での }\mathbb R^n\text{ のベクトル}.
$$

この同値性によって、接空間 $T_pM$ は座標に依存しない $n$ 次元線形空間として定まりました。

さらに滑らかな写像 $f:M\to N$ から

$$
df_p:T_pM\to T_{f(p)}N
$$

を定義し、

$$
d(g\circ f)_p
=
dg_{f(p)}\circ df_p
$$

という連鎖律を、芽による定義から直接証明しました。

双対側では

$$
T_p^*M=(T_pM)^*
$$

を余接空間とし、$dh_p$ と余ベクトルの引き戻しを定義しました。点ごとの空間をまとめると

$$
TM=\bigsqcup_pT_pM,
\qquad
T^*M=\bigsqcup_pT_p^*M
$$

が得られ、どちらも自然な各ファイバーが $n$ 次元のベクトル束になります。

次の GEO3 では、微分 $df_p$ の階数を局所座標で制御する **階数定理**へ進みます。そこから、はめ込み・沈め込み・埋め込み・正則値・部分多様体を構成し、

$$
T_p(f^{-1}(c))
=
\ker df_p
$$

という接空間の基本公式を導きます。
