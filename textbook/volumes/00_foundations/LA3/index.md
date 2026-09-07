# LA3 標準線形代数 III：代数的双対・通常の行列式・抽象行列式

この章では、有限次元線形代数の二つの重要な構造を組み立てます。

前半では、ベクトルをスカラーへ送る線形形式を集めた **代数的双対** を扱います。後半では、速習で計算道具として使っていた行列式を一般の $n\times n$ 行列について定義し、その性質を証明したうえで、行列式を「基底に依存しない体積倍率」として抽象化します。

特に後続の LA4 で使う

- 一般の $n\times n$ 行列式
- 交代多重線形性
- 行・列基本変形と行列式
- Laplace 展開と余因子
- $\det A\ne0$ と可逆性の同値
- 乗法性 $\det(AB)=\det A\det B$
- 相似不変性

を、この章の中で根拠まで閉じます。

---

## 1. 線形形式と代数的双対

<a id="def-la3-linear-form"></a>
<!-- formal-statement-start -->
> **定義（線形形式）**  
> $\mathbb F=\mathbb R$ または $\mathbb C$ とし、$V$ を $\mathbb F$ 上のベクトル空間とする。線形写像
$$
\varphi:V\to\mathbb F
$$
> を線形形式という。
<!-- formal-statement-end -->

<a id="def-la3-dual-space"></a>
<!-- formal-statement-start -->
> **定義（代数的双対）**  
> $V$ 上の線形形式全体
$$
V^*=\{\varphi:V\to\mathbb F:\varphi\text{ は線形}\}
$$
> を $V$ の代数的双対という。加法とスカラー倍は点ごとに定める。
<!-- formal-statement-end -->

<!-- definition-example-start: def-la3-linear-form, def-la3-dual-space -->
**定義の確認**：$V=\mathbb R^n$ とします。任意の $a\in\mathbb R^n$ に対して
$$
\varphi_a(x)=a^{\mathsf T}x
$$
と置くと、任意の $x,y\in\mathbb R^n$ と $\alpha,\beta\in\mathbb R$ に対して
$$
\begin{aligned}
\varphi_a(\alpha x+\beta y)
&=a^{\mathsf T}(\alpha x+\beta y)\\
&=\alpha a^{\mathsf T}x+\beta a^{\mathsf T}y\\
&=\alpha\varphi_a(x)+\beta\varphi_a(y).
\end{aligned}
$$
したがって $\varphi_a$ は線形形式です。

逆に $\varphi\in(\mathbb R^n)^*$ を任意に取り、標準基底を $e_1,\dots,e_n$ とします。
$$
a_i=\varphi(e_i)
$$
と置けば、$x=\sum_i x_i e_i$ に対して
$$
\varphi(x)
=\sum_i x_i\varphi(e_i)
=\sum_i a_i x_i
=a^{\mathsf T}x.
$$
よって有限次元の標準座標では、全ての線形形式がこの形に書けます。
<!-- definition-example-end -->

---

## 2. 双対基底

<a id="def-la3-dual-basis"></a>
<!-- formal-statement-start -->
> **定義（双対基底）**  
> 基底 $e_1,\dots,e_n$ に対し
$$
e^i(e_j)=\delta_{ij}
$$
> を満たす線形形式 $e^1,\dots,e^n\in V^*$ を双対基底という。
<!-- formal-statement-end -->

<!-- definition-example-start: def-la3-dual-basis -->
**定義の確認**：$V=\mathbb R^2$ の標準基底に対して
$$
e^1(x_1,x_2)=x_1,
\qquad
e^2(x_1,x_2)=x_2
$$
と置けば
$$
e^i(e_j)=\delta_{ij}
$$
です。双対基底は「各座標を1成分ずつ読む関数」です。
<!-- definition-example-end -->

<a id="thm-la3-dual-basis"></a>
<!-- formal-statement-start -->
> **定理（双対基底定理）**  
> 有限次元ベクトル空間 $V$ の任意の基底 $e_1,\dots,e_n$ に対して双対基底 $e^1,\dots,e^n$ が一意に存在し、これは $V^*$ の基底である。特に
$$
\dim V^*=\dim V.
$$
<!-- formal-statement-end -->

<!-- proof-start -->
### 証明

任意の $x\in V$ は一意に
$$
x=\sum_{j=1}^n x_j e_j
$$
と書けます。そこで
$$
e^i(x)=x_i
$$
と定めます。

$x=\sum_jx_je_j$, $y=\sum_jy_je_j$ なら
$$
\alpha x+\beta y
=\sum_j(\alpha x_j+\beta y_j)e_j
$$
なので
$$
e^i(\alpha x+\beta y)
=\alpha x_i+\beta y_i
=\alpha e^i(x)+\beta e^i(y).
$$
よって $e^i\in V^*$ であり、定義から $e^i(e_j)=\delta_{ij}$ です。

一意性を確認します。$f^i(e_j)=\delta_{ij}$ を満たす別の線形形式 $f^i$ があれば、任意の $x=\sum_jx_je_j$ に対して
$$
f^i(x)=\sum_jx_jf^i(e_j)=x_i=e^i(x).
$$
したがって $f^i=e^i$ です。

次に任意の $\varphi\in V^*$ について
$$
\varphi(x)
=\sum_jx_j\varphi(e_j)
=\sum_j\varphi(e_j)e^j(x)
$$
なので
$$
\varphi=\sum_j\varphi(e_j)e^j.
$$
よって $e^1,\dots,e^n$ は $V^*$ を張ります。

さらに
$$
\sum_i a_i e^i=0
$$
なら、両辺を $e_j$ に作用させて
$$
0=\sum_i a_ie^i(e_j)=a_j.
$$
全ての $j$ で $a_j=0$ なので一次独立です。従って双対基底は $V^*$ の基底で
$$
\dim V^*=n=\dim V.
$$
$\square$
<!-- proof-end -->

---

## 3. annihilator：部分空間を消す線形形式

<a id="def-la3-annihilator"></a>
<!-- formal-statement-start -->
> **定義（annihilator）**  
> 部分空間 $W\subset V$ に対して
$$
W^\circ
=\{\varphi\in V^*: \varphi(w)=0\ \text{for all }w\in W\}
$$
> を $W$ の annihilator（零化空間）という。
<!-- formal-statement-end -->

<!-- definition-example-start: def-la3-annihilator -->
**定義の確認**：$V=\mathbb R^3$, $W=\operatorname{span}(e_1,e_2)$ とします。任意の
$$
\varphi=a_1e^1+a_2e^2+a_3e^3
$$
が $W$ を消すための必要十分条件は
$$
a_1=a_2=0
$$
です。従って
$$
W^\circ=\operatorname{span}(e^3).
$$
<!-- definition-example-end -->

<a id="thm-la3-annihilator-dimension"></a>
<!-- formal-statement-start -->
> **定理（annihilator の次元公式）**  
> $V$ を有限次元、$W\subset V$ を部分空間とすると
$$
\dim W^\circ=\dim V-\dim W=\dim(V/W).
$$
<!-- formal-statement-end -->

<!-- proof-start -->
### 証明

$W$ の基底 $e_1,\dots,e_r$ を $V$ の基底
$$
e_1,\dots,e_r,e_{r+1},\dots,e_n
$$
へ延長し、双対基底を $e^1,\dots,e^n$ とします。

任意の $\varphi\in V^*$ は
$$
\varphi=\sum_{i=1}^na_ie^i
$$
と一意に書けます。$\varphi$ が $W$ を消すなら
$$
0=\varphi(e_j)=a_j
\qquad(j=1,\dots,r).
$$
逆に $a_1=\cdots=a_r=0$ なら、任意の $w=\sum_{j=1}^rc_je_j\in W$ に対して
$$
\varphi(w)=0.
$$
従って
$$
W^\circ=\operatorname{span}(e^{r+1},\dots,e^n)
$$
であり
$$
\dim W^\circ=n-r.
$$
[LA2 の商空間の次元公式](../LA2/index.md#thm-la2-quotient-dimension)から
$$
\dim(V/W)=n-r
$$
でもあるので結論を得ます。$\square$
<!-- proof-end -->

<a id="thm-la3-quotient-dual-annihilator"></a>
<!-- formal-statement-start -->
> **定理（商空間の双対と annihilator）**  
> $W\subset V$ を部分空間、$q:V\to V/W$, $q(v)=v+W$ を標準射影とする。このとき
$$
q^*:(V/W)^*\to W^\circ,
\qquad
q^*(\psi)=\psi\circ q
$$
> は線形同型である。従って
$$
(V/W)^*\cong W^\circ.
$$
<!-- formal-statement-end -->

<!-- proof-start -->
### 証明

まず $\psi\in(V/W)^*$ と $w\in W$ に対して
$$
q(w)=0_{V/W}
$$
なので
$$
(q^*\psi)(w)=\psi(q(w))=0.
$$
従って $q^*\psi\in W^\circ$ です。

逆向きの写像を作ります。$\varphi\in W^\circ$ に対して
$$
\widetilde\varphi(v+W)=\varphi(v)
$$
と置きます。$v+W=v'+W$ なら $v-v'\in W$ なので
$$
\varphi(v)-\varphi(v')=\varphi(v-v')=0.
$$
従って代表元によらず well-defined です。

さらに
$$
\begin{aligned}
\widetilde\varphi(a(v+W)+b(u+W))
&=\widetilde\varphi(av+bu+W)\\
&=\varphi(av+bu)\\
&=a\varphi(v)+b\varphi(u),
\end{aligned}
$$
なので $\widetilde\varphi\in(V/W)^*$ です。

$R(\varphi)=\widetilde\varphi$ と置くと、$v\in V$ について
$$
(q^*R(\varphi))(v)=R(\varphi)(v+W)=\varphi(v),
$$
また $\psi\in(V/W)^*$ について
$$
(R(q^*\psi))(v+W)=(q^*\psi)(v)=\psi(v+W).
$$
従って
$$
q^*R=I_{W^\circ},
\qquad
Rq^*=I_{(V/W)^*}.
$$
よって $q^*$ は線形同型です。$\square$
<!-- proof-end -->

---

## 4. 双対写像

<a id="def-la3-dual-map"></a>
<!-- formal-statement-start -->
> **定義（双対写像）**  
> 線形写像 $T:V\to W$ に対し
$$
T^*:W^*\to V^*,
\qquad
T^*(\psi)=\psi\circ T
$$
> を双対写像という。
<!-- formal-statement-end -->

<!-- definition-example-start: def-la3-dual-map -->
**定義の確認**：$V$ の基底を $e_1,\dots,e_n$、$W$ の基底を $f_1,\dots,f_m$ とし、$T$ の表現行列を $A=(A_{ij})$ とします。
$$
T(e_j)=\sum_{i=1}^mA_{ij}f_i.
$$
双対基底について
$$
(T^*f^i)(e_j)=f^i(T(e_j))=A_{ij}
$$
なので
$$
T^*f^i=\sum_{j=1}^nA_{ij}e^j.
$$
従って $T^*$ の表現行列は $A^{\mathsf T}$ です。ここでは内積を使っていないので、複素数上でも共役は入りません。
<!-- definition-example-end -->

---

## 5. 二重双対

<a id="thm-la3-double-dual"></a>
<!-- formal-statement-start -->
> **定理（有限次元二重双対同型）**  
> 有限次元ベクトル空間 $V$ に対し
$$
J:V\to V^{**},
\qquad
J(v)(\varphi)=\varphi(v)
$$
> は基底の選択によらない線形同型である。
<!-- formal-statement-end -->

<!-- proof-start -->
### 証明

$\varphi,\psi\in V^*$ と $a,b\in\mathbb F$ に対して
$$
J(v)(a\varphi+b\psi)
=a\varphi(v)+b\psi(v)
$$
なので $J(v)\in V^{**}$ です。また任意の $\varphi\in V^*$ に対して
$$
J(av+bw)(\varphi)
=\varphi(av+bw)
=(aJ(v)+bJ(w))(\varphi)
$$
なので $J$ は線形です。

単射性を示します。$v\ne0$ とし、$v$ を含む基底
$$
v,v_2,\dots,v_n
$$
を取ります。その双対基底の第1要素を $v^1$ とすれば
$$
J(v)(v^1)=v^1(v)=1\ne0.
$$
従って $v\ne0$ なら $J(v)\ne0$ で、$J$ は単射です。

[双対基底定理](#thm-la3-dual-basis)から
$$
\dim V^{**}=\dim V^*=\dim V.
$$
同次元有限次元空間の間の単射は全射でもあるので $J$ は同型です。

なお $J(v)(\varphi)=\varphi(v)$ という定義には基底が現れません。証明中に基底を選んだのは単射性を示すためだけで、写像 $J$ 自体は基底に依存しません。$\square$
<!-- proof-end -->

---

## 6. 通常の $n\times n$ 行列式

ここから、後続章で使う一般の行列式を定義から組み立てます。$2\times2$ の公式 $ad-bc$ を暗記しただけでは、Cayley--Hamilton の余因子行列や一般の特性多項式を支えるには足りません。

### 6.1 置換と符号

<a id="def-la3-permutation-sign"></a>
<!-- formal-statement-start -->
> **定義（置換の転倒数と符号）**  
> $n$ 個の記号 $1,\dots,n$ の置換全体を $S_n$ とする。$\sigma\in S_n$ に対して
$$
\operatorname{inv}(\sigma)
=\#\{(i,j):i<j,\ \sigma(i)>\sigma(j)\}
$$
> を転倒数といい
$$
\operatorname{sgn}(\sigma)=(-1)^{\operatorname{inv}(\sigma)}
$$
> を $\sigma$ の符号という。
<!-- formal-statement-end -->

<!-- definition-example-start: def-la3-permutation-sign -->
**定義の確認**：$\sigma=(2,3,1)$、すなわち
$$
\sigma(1)=2,\quad \sigma(2)=3,\quad \sigma(3)=1
$$
とします。転倒は
$$
(1,3),\ (2,3)
$$
の2個なので
$$
\operatorname{inv}(\sigma)=2,
\qquad
\operatorname{sgn}(\sigma)=(-1)^2=1.
$$
<!-- definition-example-end -->

<a id="lem-la3-permutation-sign-product"></a>
<!-- formal-statement-start -->
> **補題（置換の符号の積）**  
> $\sigma,\rho\in S_n$ に対して
$$
\operatorname{sgn}(\sigma\circ\rho)
=\operatorname{sgn}(\sigma)\operatorname{sgn}(\rho).
$$
> 特に互換 $\tau$ について $\operatorname{sgn}(\tau)=-1$ であり
$$
\operatorname{sgn}(\sigma\circ\tau)
=-\operatorname{sgn}(\sigma).
$$
<!-- formal-statement-end -->

<!-- proof-start -->
### 証明

隣り合う2箇所を交換する置換を $s_k=(k\ k+1)$ とします。$\sigma$ の並びの第 $k$ 項と第 $k+1$ 項を交換すると、この2項どうしの大小関係だけが反転し、他の項との転倒数の合計は変わりません。従って
$$
\operatorname{inv}(\sigma\circ s_k)
\equiv \operatorname{inv}(\sigma)+1\pmod2,
$$
すなわち
$$
\operatorname{sgn}(\sigma\circ s_k)
=-\operatorname{sgn}(\sigma).
$$

任意の置換 $\rho$ は隣接互換の積
$$
\rho=s_{i_1}\cdots s_{i_m}
$$
と書けます。恒等置換から同じ交換を順に施せば
$$
\operatorname{sgn}(\rho)=(-1)^m.
$$
同じ交換列を $\sigma$ の右から施せば
$$
\operatorname{sgn}(\sigma\circ\rho)
=(-1)^m\operatorname{sgn}(\sigma)
=\operatorname{sgn}(\sigma)\operatorname{sgn}(\rho).
$$

一般の互換 $(p\ q)$（$p<q$）は
$$
(p\ p+1)\cdots(q-1\ q)(q-2\ q-1)\cdots(p\ p+1)
$$
という $2(q-p)-1$ 回の隣接交換で表せるので奇置換です。従って符号は $-1$ です。$\square$
<!-- proof-end -->

<a id="def-la3-matrix-determinant"></a>
<!-- formal-statement-start -->
> **定義（Leibniz 公式による行列式）**  
> $A=(a_{ij})\in\mathbb F^{n\times n}$ に対して
$$
\det A
=
\sum_{\sigma\in S_n}
\operatorname{sgn}(\sigma)
\prod_{j=1}^n a_{\sigma(j),j}
$$
> と定める。
<!-- formal-statement-end -->

<!-- definition-example-start: def-la3-matrix-determinant -->
**定義の確認**：$n=2$ では $S_2$ は恒等置換と互換 $(1\ 2)$ の2個だけです。従って
$$
\begin{aligned}
\det\begin{pmatrix}a&b\\c&d\end{pmatrix}
&=(+1)ad+(-1)cb\\
&=ad-bc.
\end{aligned}
$$
速習で使った $2\times2$ の公式は Leibniz 公式の特殊例です。
<!-- definition-example-end -->

### 6.2 列に関する多重線形性と交代性

<a id="thm-la3-det-alternating-multilinear"></a>
<!-- formal-statement-start -->
> **定理（通常の行列式の交代多重線形性）**  
> 行列式は各列について線形であり、2列を交換すると符号が反転する。従って同じ列を2本持つ行列の行列式は0である。また
$$
\det I_n=1.
$$
<!-- formal-statement-end -->

<!-- proof-start -->
### 証明

まず第 $k$ 列だけを
$$
c_k=\alpha u+\beta v
$$
とします。Leibniz 公式の各項には第 $k$ 列の成分がちょうど1個
$$
a_{\sigma(k),k}
$$
だけ現れます。従ってその因子について分配すれば
$$
\det(c_1,\dots,\alpha u+\beta v,\dots,c_n)
=
\alpha\det(c_1,\dots,u,\dots,c_n)
+
\beta\det(c_1,\dots,v,\dots,c_n).
$$
よって各列について線形です。

次に第 $p$ 列と第 $q$ 列を交換した行列を $A'$ とし、$\tau=(p\ q)$ と置きます。$A'$ の Leibniz 展開で $\sigma$ に対応する積は、元の $A$ では $\sigma\circ\tau$ に対応する積と同じです。一方[置換の符号の積](#lem-la3-permutation-sign-product)から
$$
\operatorname{sgn}(\sigma\circ\tau)
=-\operatorname{sgn}(\sigma).
$$
従って全ての項が1対1に対応しながら符号だけ反転し
$$
\det A'=-\det A.
$$

2列が同じなら、その2列を交換しても行列自体は変わりません。しかし上で示した符号反転から
$$
\det A=-\det A.
$$
$\mathbb R,\mathbb C$ では標数が2ではないので
$$
\det A=0.
$$

最後に $I_n$ の Leibniz 公式では、恒等置換以外の項はどこかで非対角成分0を含みます。従って残るのは恒等置換の項だけで
$$
\det I_n=1.
$$
$\square$
<!-- proof-end -->

### 6.3 行列式はこの性質で一意に決まる

<a id="thm-la3-det-uniqueness"></a>
<!-- formal-statement-start -->
> **定理（行列式の特徴付け）**  
> $D:(\mathbb F^n)^n\to\mathbb F$ が列について多重線形、交代的で
$$
D(e_1,\dots,e_n)=1
$$
> を満たすなら
$$
D(c_1,\dots,c_n)=\det[c_1\ \cdots\ c_n].
$$
<!-- formal-statement-end -->

<!-- proof-start -->
### 証明

各列を標準基底で
$$
c_j=\sum_{i=1}^na_{ij}e_i
$$
と展開します。多重線形性から
$$
D(c_1,\dots,c_n)
=
\sum_{i_1,\dots,i_n}
\left(\prod_{j=1}^na_{i_jj}\right)
D(e_{i_1},\dots,e_{i_n}).
$$
同じ添字が2回現れる項は交代性で0です。従って残るのは
$$
(i_1,\dots,i_n)=(\sigma(1),\dots,\sigma(n))
$$
と置換になっている項だけです。

交換1回ごとに交代性から符号が反転するので
$$
D(e_{\sigma(1)},\dots,e_{\sigma(n)})
=\operatorname{sgn}(\sigma)D(e_1,\dots,e_n)
=\operatorname{sgn}(\sigma).
$$
従って
$$
D(c_1,\dots,c_n)
=
\sum_{\sigma\in S_n}
\operatorname{sgn}(\sigma)
\prod_{j=1}^na_{\sigma(j),j}
=
\det[c_1\ \cdots\ c_n].
$$
$\square$
<!-- proof-end -->

### 6.4 転置・行に関する性質

<a id="thm-la3-det-transpose"></a>
<!-- formal-statement-start -->
> **定理（転置で行列式は変わらない）**  
> 任意の正方行列 $A$ に対して
$$
\det(A^{\mathsf T})=\det A.
$$
<!-- formal-statement-end -->

<!-- proof-start -->
### 証明

Leibniz 公式から
$$
\det(A^{\mathsf T})
=
\sum_{\sigma\in S_n}
\operatorname{sgn}(\sigma)
\prod_{j=1}^n a_{j,\sigma(j)}.
$$
ここで $i=\sigma(j)$、すなわち $j=\sigma^{-1}(i)$ と添字を付け替えると
$$
\prod_{j=1}^n a_{j,\sigma(j)}
=
\prod_{i=1}^na_{\sigma^{-1}(i),i}.
$$
また[置換の符号の積](#lem-la3-permutation-sign-product)を
$$
\sigma\circ\sigma^{-1}=\mathrm{id}
$$
に適用すると
$$
1=\operatorname{sgn}(\sigma)\operatorname{sgn}(\sigma^{-1})
$$
なので
$$
\operatorname{sgn}(\sigma^{-1})=\operatorname{sgn}(\sigma).
$$
$\sigma\mapsto\sigma^{-1}$ は $S_n$ の全単射なので、和を $\rho=\sigma^{-1}$ で取り直せば
$$
\det(A^{\mathsf T})
=
\sum_{\rho\in S_n}
\operatorname{sgn}(\rho)
\prod_{i=1}^na_{\rho(i),i}
=
\det A.
$$
$\square$
<!-- proof-end -->

従って列について示した性質は、そのまま行についても成り立ちます。

### 6.5 基本変形と三角行列

<a id="thm-la3-det-elementary-operations"></a>
<!-- formal-statement-start -->
> **定理（基本変形と行列式）**  
> 行または列の基本変形に対して行列式は次のように変化する。
>
> 1. 2行（2列）を交換すると $-1$ 倍。
> 2. 1行（1列）を $c$ 倍すると $c$ 倍。
> 3. ある行（列）に別の行（列）の $c$ 倍を加えても不変。
<!-- formal-statement-end -->

<!-- proof-start -->
### 証明

1 はすでに示した交代性です。2 は各行・列に関する線形性です。

3 を列について示します。第 $j$ 列を $c_j+\lambda c_k$ に変えると多重線形性から
$$
\begin{aligned}
&\det(c_1,\dots,c_j+\lambda c_k,\dots,c_n)\\
&\qquad=
\det(c_1,\dots,c_j,\dots,c_n)
+\lambda\det(c_1,\dots,c_k,\dots,c_n).
\end{aligned}
$$
第2項には第 $k$ 列と同じ列が2本あるので0です。従って行列式は変わりません。行の場合は転置を使えば同様です。$\square$
<!-- proof-end -->

<a id="thm-la3-triangular-determinant"></a>
<!-- formal-statement-start -->
> **定理（三角行列の行列式）**  
> 上三角または下三角行列 $A=(a_{ij})$ に対して
$$
\det A=\prod_{i=1}^na_{ii}.
$$
<!-- formal-statement-end -->

<!-- proof-start -->
### 証明

上三角の場合を示します。Leibniz 公式の項
$$
\prod_{j=1}^na_{\sigma(j),j}
$$
が非零であるためには、下三角部分が0なので全ての $j$ で
$$
\sigma(j)\le j
$$
でなければなりません。

しかし全ての $j$ で $\sigma(j)\le j$ なら
$$
\sum_j\sigma(j)\le\sum_jj.
$$
左辺も右辺も $1+\cdots+n$ なので実際には等号であり、各不等式も全て等号でなければなりません。従って
$$
\sigma(j)=j
$$
が全ての $j$ で成り立ちます。つまり非零になり得るのは恒等置換の項だけです。

従って
$$
\det A=a_{11}\cdots a_{nn}.
$$
下三角の場合は転置を使います。$\square$
<!-- proof-end -->

### 6.6 Laplace 展開と余因子

行 $i$ と列 $j$ を取り除いてできる $(n-1)\times(n-1)$ 行列を $M_{ij}$ とし
$$
C_{ij}=(-1)^{i+j}\det M_{ij}
$$
を $(i,j)$ 余因子と呼びます。

<a id="thm-la3-laplace-expansion"></a>
<!-- formal-statement-start -->
> **定理（Laplace 展開）**  
> 任意の $n\times n$ 行列 $A=(a_{ij})$ と固定した列 $j$ に対して
$$
\det A=\sum_{i=1}^n a_{ij}C_{ij}.
$$
> 固定した行 $i$ に対しても
$$
\det A=\sum_{j=1}^n a_{ij}C_{ij}.
$$
<!-- formal-statement-end -->

<!-- proof-start -->
### 証明

列 $j$ で展開します。Leibniz 公式を、$\sigma(j)=i$ となる項ごとに分けます。
$$
\det A
=
\sum_{i=1}^n
\sum_{\sigma:\sigma(j)=i}
\operatorname{sgn}(\sigma)
\prod_{k=1}^n a_{\sigma(k),k}.
$$
固定した $i$ の内側の和では $a_{ij}$ が全項に共通なので外へ出せます。

$\sigma(j)=i$ を固定し、元の並びから第 $j$ 列と第 $i$ 行を取り除いて残った添字を昇順に詰め直すと、$M_{ij}$ のある置換 $\bar\sigma\in S_{n-1}$ が得られます。第 $j$ 列を先頭へ移すのに $j-1$ 回、第 $i$ 行を先頭へ移すのに $i-1$ 回の交換が必要なので、元の置換と残りの置換の符号には
$$
(-1)^{(i-1)+(j-1)}=(-1)^{i+j}
$$
の差があります。従って
$$
\operatorname{sgn}(\sigma)
=(-1)^{i+j}\operatorname{sgn}(\bar\sigma).
$$

よって固定した $i$ に対応する項の和は
$$
\begin{aligned}
&\sum_{\sigma:\sigma(j)=i}
\operatorname{sgn}(\sigma)
\prod_{k=1}^n a_{\sigma(k),k}\\
&\qquad=
a_{ij}(-1)^{i+j}\det M_{ij}
=a_{ij}C_{ij}.
\end{aligned}
$$
これを $i$ について足せば
$$
\det A=\sum_i a_{ij}C_{ij}.
$$
行展開は $A^{\mathsf T}$ に列展開を適用し、$\det A^{\mathsf T}=\det A$ を使えば従います。$\square$
<!-- proof-end -->

### 6.7 余因子行列

<a id="def-la3-adjugate"></a>
<!-- formal-statement-start -->
> **定義（余因子行列）**  
> 余因子 $C_{ij}$ を用いて
$$
\operatorname{adj}(A)_{ji}=C_{ij}
$$
> と定めた行列を $A$ の余因子行列（adjugate）という。
<!-- formal-statement-end -->

<!-- definition-example-start: def-la3-adjugate -->
**定義の確認**：
$$
A=\begin{pmatrix}a&b\\c&d\end{pmatrix}
$$
なら
$$
C_{11}=d,\quad C_{12}=-c,\quad C_{21}=-b,\quad C_{22}=a.
$$
余因子を転置して並べるので
$$
\operatorname{adj}(A)
=\begin{pmatrix}d&-b\\-c&a\end{pmatrix}.
$$
<!-- definition-example-end -->

<a id="thm-la3-adjugate-identity"></a>
<!-- formal-statement-start -->
> **定理（余因子行列の恒等式）**  
> 任意の正方行列 $A$ に対して
$$
A\operatorname{adj}(A)
=\operatorname{adj}(A)A
=(\det A)I.
$$
<!-- formal-statement-end -->

<!-- proof-start -->
### 証明

$A\operatorname{adj}(A)$ の $(i,j)$ 成分は
$$
\sum_{k=1}^na_{ik}C_{jk}
$$
です。

$i=j$ なら、これは第 $i$ 行に関する Laplace 展開なので
$$
\sum_k a_{ik}C_{ik}=\det A.
$$

$i\ne j$ なら、この和は「第 $j$ 行を第 $i$ 行で置き換えた行列」を第 $j$ 行で Laplace 展開した値です。この行列には同じ行が2本あるので行列式は0です。従って
$$
(A\operatorname{adj}(A))_{ij}
=
\begin{cases}
\det A,&i=j,\\
0,&i\ne j.
\end{cases}
$$
よって
$$
A\operatorname{adj}(A)=(\det A)I.
$$
$\operatorname{adj}(A)A=(\det A)I$ も列について同じ議論を行えば得られます。$\square$
<!-- proof-end -->

特に $\det A\ne0$ なら
$$
A^{-1}=\frac{1}{\det A}\operatorname{adj}(A)
$$
なので $A$ は可逆です。逆向きも含む完全な可逆性判定は、抽象行列式の乗法性を得た後で証明します。

---

## 7. 交代多重線形形式

通常の行列式で確認した構造を、座標を選ばない言葉へ移します。

<a id="def-la3-alternating-form"></a>
<!-- formal-statement-start -->
> **定義（交代多重線形形式）**  
> $n$ 個の変数を持つ写像
$$
\omega:V^n\to\mathbb F
$$
> が各変数について線形で、$v_i=v_j$ となる2つの引数があるとき常に
$$
\omega(v_1,\dots,v_n)=0
$$
> となるとき、$\omega$ を交代 $n$ 重線形形式という。
<!-- formal-statement-end -->

<!-- definition-example-start: def-la3-alternating-form -->
**定義の確認**：$V=\mathbb R^2$ で
$$
\omega((x_1,x_2),(y_1,y_2))=x_1y_2-x_2y_1
$$
と置きます。各変数について線形であり
$$
\omega(x,x)=0
$$
なので交代2重線形形式です。
<!-- definition-example-end -->

交代性と多重線形性から2変数を交換すると符号が反転します。実際
$$
0=\omega(\dots,u+v,\dots,u+v,\dots)
$$
を展開し、$u,u$ と $v,v$ の項を交代性で消せば
$$
\omega(\dots,u,\dots,v,\dots)
=-\omega(\dots,v,\dots,u,\dots)
$$
を得ます。

<a id="thm-la3-top-alternating-one-dimensional"></a>
<!-- formal-statement-start -->
> **定理（最高次交代形式は1次元）**  
> $V$ を $n$ 次元ベクトル空間とし、基底 $e_1,\dots,e_n$ を固定する。任意の交代 $n$ 重線形形式 $\omega$ は
$$
\omega(e_1,\dots,e_n)
$$
> だけで一意に決まる。また $\omega(e_1,\dots,e_n)=1$ を満たす交代 $n$ 重線形形式が存在する。従って交代 $n$ 重線形形式全体の空間は1次元である。
<!-- formal-statement-end -->

<!-- proof-start -->
### 証明

任意の $v_1,\dots,v_n\in V$ を
$$
v_j=\sum_{i=1}^na_{ij}e_i
$$
とします。多重線形性で展開すると
$$
\omega(v_1,\dots,v_n)
=
\sum_{i_1,\dots,i_n}
\left(\prod_{j=1}^na_{i_jj}\right)
\omega(e_{i_1},\dots,e_{i_n}).
$$
添字が重複する項は交代性で0です。従って置換に対応する項だけが残り
$$
\omega(v_1,\dots,v_n)
=
\sum_{\sigma\in S_n}
\left(\prod_{j=1}^na_{\sigma(j)j}\right)
\omega(e_{\sigma(1)},\dots,e_{\sigma(n)}).
$$
交換1回ごとに符号が反転するので
$$
\omega(e_{\sigma(1)},\dots,e_{\sigma(n)})
=
\operatorname{sgn}(\sigma)\omega(e_1,\dots,e_n).
$$
従って
$$
\omega(v_1,\dots,v_n)
=
\det(a_{ij})\,\omega(e_1,\dots,e_n).
$$
ここで右辺の $\det(a_{ij})$ は[Leibniz 公式](#def-la3-matrix-determinant)で既に定義済みです。従って $\omega$ は1つの値 $\omega(e_1,\dots,e_n)$ だけで決まります。

存在を示します。各 $v_j$ の座標列を並べた行列を
$$
[v_1\ \cdots\ v_n]_{\mathcal B}
$$
とし
$$
\omega_0(v_1,\dots,v_n)
=
\det[v_1\ \cdots\ v_n]_{\mathcal B}
$$
と定めます。[通常の行列式の交代多重線形性](#thm-la3-det-alternating-multilinear)から $\omega_0$ は交代 $n$ 重線形形式であり
$$
\omega_0(e_1,\dots,e_n)=\det I=1.
$$
従って所望の非零形式が存在します。

任意の $\omega$ は
$$
\omega=\omega(e_1,\dots,e_n)\omega_0
$$
なので、交代 $n$ 重線形形式全体は $\omega_0$ が張る1次元空間です。$\square$
<!-- proof-end -->

ここでは「通常の行列式の性質」を未証明のまま借りていません。Leibniz 公式から通常行列式を先に構成し、その性質を証明してから最高次交代形式の存在へ進んでいます。

---

## 8. 行列式を体積形式の倍率として定義する

<a id="def-la3-abstract-determinant"></a>
<!-- formal-statement-start -->
> **定義（抽象行列式）**  
> $V$ を $n$ 次元ベクトル空間、$T:V\to V$ を線形写像とする。非零な交代 $n$ 重線形形式 $\omega$ を1つ取る。このとき一意なスカラー $\det T$ が存在して
$$
\omega(Tv_1,\dots,Tv_n)
=(\det T)\,\omega(v_1,\dots,v_n)
$$
> が全ての $v_1,\dots,v_n\in V$ で成り立つ。このスカラーを $T$ の抽象行列式という。
<!-- formal-statement-end -->

$T$ を固定して
$$
\omega_T(v_1,\dots,v_n)
=\omega(Tv_1,\dots,Tv_n)
$$
と置きます。$T$ と $\omega$ の線形性から $\omega_T$ は多重線形で、$v_i=v_j$ なら $Tv_i=Tv_j$ なので交代的です。従って $\omega_T$ も交代 $n$ 重線形形式です。

[最高次交代形式は1次元](#thm-la3-top-alternating-one-dimensional)なので、一意な $c\in\mathbb F$ が存在して
$$
\omega_T=c\omega.
$$
この $c$ が $\det T$ です。従って抽象行列式の存在・一意性は最高次交代形式の1次元性そのものです。

<!-- definition-example-start: def-la3-abstract-determinant -->
**定義の確認**：$V=\mathbb R^2$ で
$$
\omega(u,v)=u_1v_2-u_2v_1
$$
とし
$$
T(x,y)=(2x+y,x+3y)
$$
とします。標準基底について
$$
Te_1=(2,1)^T,
\qquad
Te_2=(1,3)^T
$$
なので
$$
\omega(Te_1,Te_2)=5,
\qquad
\omega(e_1,e_2)=1.
$$
従って
$$
\det T=5.
$$
<!-- definition-example-end -->

### 8.1 抽象行列式と通常の行列式の一致

<a id="thm-la3-abstract-matrix-det-agree"></a>
<!-- formal-statement-start -->
> **定理（抽象行列式と表現行列の行列式）**  
> $V$ の任意の基底 $\mathcal B$ に対して
$$
\det T=\det[T]_{\mathcal B}.
$$
> 従って右辺は基底の選択に依存しない。
<!-- formal-statement-end -->

<!-- proof-start -->
### 証明

基底を $e_1,\dots,e_n$ と書き、[最高次交代形式は1次元](#thm-la3-top-alternating-one-dimensional)で構成した
$$
\omega(e_1,\dots,e_n)=1
$$
を満たす交代 $n$ 重線形形式を取ります。$T$ の表現行列を $A=(A_{ij})$ とすると
$$
Te_j=\sum_iA_{ij}e_i.
$$
最高次交代形式の展開式から
$$
\omega(Te_1,\dots,Te_n)
=\det A\,\omega(e_1,\dots,e_n)
=\det A.
$$
一方、抽象行列式の定義から
$$
\omega(Te_1,\dots,Te_n)
=(\det T)\omega(e_1,\dots,e_n)
=\det T.
$$
従って
$$
\det T=\det A=\det[T]_{\mathcal B}.
$$
左辺は基底を使わず定義されているので、右辺も基底に依存しません。$\square$
<!-- proof-end -->

### 8.2 乗法性

<a id="thm-la3-det-multiplicative"></a>
<!-- formal-statement-start -->
> **定理（行列式の乗法性）**  
> 線形自己写像 $S,T:V\to V$ に対して
$$
\det(S\circ T)=(\det S)(\det T).
$$
> 従って正方行列 $A,B$ に対して
$$
\det(AB)=\det A\det B.
$$
<!-- formal-statement-end -->

<!-- proof-start -->
### 証明

非零な交代 $n$ 重線形形式 $\omega$ を固定します。任意の $v_1,\dots,v_n$ に対して
$$
\begin{aligned}
\omega(STv_1,\dots,STv_n)
&=(\det S)\omega(Tv_1,\dots,Tv_n)\\
&=(\det S)(\det T)\omega(v_1,\dots,v_n).
\end{aligned}
$$
一方、$S\circ T$ に直接定義を使えば
$$
\omega(STv_1,\dots,STv_n)
=\det(S\circ T)\omega(v_1,\dots,v_n).
$$
$\omega$ は非零なので、ある $u_1,\dots,u_n$ で
$$
\omega(u_1,\dots,u_n)\ne0
$$
です。その組を代入して非零な値で割れば
$$
\det(S\circ T)=(\det S)(\det T).
$$

基底を1つ固定すれば $S,T,S\circ T$ の表現行列はそれぞれ $A,B,AB$ となり、[抽象行列式と表現行列の一致](#thm-la3-abstract-matrix-det-agree)から
$$
\det(AB)=\det A\det B.
$$
$\square$
<!-- proof-end -->

### 8.3 可逆性判定

<a id="thm-la3-det-invertible"></a>
<!-- formal-statement-start -->
> **定理（行列式による可逆性判定）**  
> 有限次元線形自己写像 $T:V\to V$ について
$$
T\text{ が可逆}
\Longleftrightarrow
\det T\ne0.
$$
> 従って正方行列 $A$ について
$$
A\text{ が可逆}
\Longleftrightarrow
\det A\ne0.
$$
<!-- formal-statement-end -->

<!-- proof-start -->
### 証明

まず $T$ が可逆とします。[乗法性](#thm-la3-det-multiplicative)から
$$
1=\det I
=\det(T^{-1}T)
=\det(T^{-1})\det T.
$$
積が1なので
$$
\det T\ne0.
$$

逆に $T$ が可逆でないとします。有限次元で始域と終域が同じ次元なので、$T$ は単射でもありません。従ってある $0\ne v_1\in V$ が存在して
$$
Tv_1=0.
$$
$v_1$ を基底
$$
v_1,v_2,\dots,v_n
$$
へ延長します。[最高次交代形式は1次元](#thm-la3-top-alternating-one-dimensional)から、この基底について
$$
\omega(v_1,\dots,v_n)=1
$$
となる交代 $n$ 重線形形式 $\omega$ を取れます。

抽象行列式の定義をこの基底に適用すると
$$
\begin{aligned}
\det T
&=(\det T)\omega(v_1,\dots,v_n)\\
&=\omega(Tv_1,Tv_2,\dots,Tv_n)\\
&=\omega(0,Tv_2,\dots,Tv_n)\\
&=0.
\end{aligned}
$$
従って
$$
T\text{ が不可逆}\Longrightarrow\det T=0.
$$
その対偶から $\det T\ne0$ なら $T$ は可逆です。

行列の場合は $A$ が定める線形自己写像 $T_A(x)=Ax$ に[抽象行列式と表現行列の一致](#thm-la3-abstract-matrix-det-agree)を使えば同じ結論が得られます。$\square$
<!-- proof-end -->

この定理と[余因子行列の恒等式](#thm-la3-adjugate-identity)を合わせると、可逆な行列には
$$
A^{-1}=\frac1{\det A}\operatorname{adj}(A)
$$
が成り立ちます。

### 8.4 相似不変性

<a id="thm-la3-det-similarity-invariant"></a>
<!-- formal-statement-start -->
> **定理（行列式の相似不変性）**  
> $P$ が可逆なら
$$
\det(P^{-1}AP)=\det A.
$$
<!-- formal-statement-end -->

<!-- proof-start -->
### 証明

[乗法性](#thm-la3-det-multiplicative)から
$$
\det(P^{-1}AP)
=\det(P^{-1})\det(A)\det(P).
$$
また
$$
1=\det I
=\det(P^{-1}P)
=\det(P^{-1})\det(P).
$$
従って
$$
\det(P^{-1}AP)=\det A.
$$
$\square$
<!-- proof-end -->

この定理により、後続 LA4 の
$$
\chi_T(t)=\det(tI-T)
$$
は基底を変えても同じ多項式になります。

---

## 9. 演習

### Level A

<a id="ex-la3-a01"></a>
#### LA3-A01 双対基底
- Level: A

$V=\mathbb R^2$ の基底
$$
v_1=(1,1)^T,
\qquad
v_2=(1,-1)^T
$$
に対する双対基底を求めよ。

<!-- solution-start -->
**解答**：$x=(x_1,x_2)^T=av_1+bv_2$ とすると
$$
x_1=a+b,
\qquad
x_2=a-b.
$$
従って
$$
a=\frac{x_1+x_2}{2},
\qquad
b=\frac{x_1-x_2}{2}.
$$
よって
$$
v^1(x)=\frac{x_1+x_2}{2},
\qquad
v^2(x)=\frac{x_1-x_2}{2}.
$$
実際 $v^i(v_j)=\delta_{ij}$ を満たします。
<!-- solution-end -->

<a id="ex-la3-a02"></a>
#### LA3-A02 annihilator
- Level: A

$$
W=\{(x,y,z):x+y+z=0\}\subset\mathbb R^3
$$
の $W^\circ$ を求めよ。

<!-- solution-start -->
**解答**：
$$
\varphi(x,y,z)=x+y+z
$$
と置けば $W=\ker\varphi$ なので
$$
\operatorname{span}(\varphi)\subset W^\circ.
$$
また $\dim W=2$ なので[annihilator の次元公式](#thm-la3-annihilator-dimension)から
$$
\dim W^\circ=3-2=1.
$$
従って
$$
W^\circ=\operatorname{span}(\varphi).
$$
<!-- solution-end -->

<a id="ex-la3-a03"></a>
#### LA3-A03 双対写像
- Level: A

$T:\mathbb R^2\to\mathbb R^2$ の標準基底での行列が
$$
A=\begin{pmatrix}1&2\\3&4\end{pmatrix}
$$
のとき、標準双対基底での $T^*$ の行列を求めよ。

<!-- solution-start -->
**解答**：標準双対基底を $e^1,e^2$ とします。
$$
T(e_1)=e_1+3e_2,
\qquad
T(e_2)=2e_1+4e_2.
$$
従って
$$
T^*e^1=e^1+2e^2,
\qquad
T^*e^2=3e^1+4e^2.
$$
よって表現行列は
$$
\begin{pmatrix}1&3\\2&4\end{pmatrix}=A^{\mathsf T}.
$$
<!-- solution-end -->

<a id="ex-la3-a04"></a>
#### LA3-A04 面積倍率
- Level: A

$T(x,y)=(2x,3y)$ の抽象行列式を求めよ。

<!-- solution-start -->
**解答**：標準面積形式
$$
\omega(u,v)=u_1v_2-u_2v_1
$$
を使います。
$$
Te_1=(2,0)^T,
\qquad
Te_2=(0,3)^T
$$
なので
$$
\omega(Te_1,Te_2)=6,
\qquad
\omega(e_1,e_2)=1.
$$
従って
$$
\det T=6.
$$
<!-- solution-end -->

<a id="ex-la3-a05"></a>
#### LA3-A05 Leibniz 公式
- Level: A

$$
A=\begin{pmatrix}
1&2&0\\
0&3&4\\
5&0&6
\end{pmatrix}
$$
の行列式を Leibniz 公式または Laplace 展開で求めよ。

<!-- solution-start -->
**解答**：第1行で Laplace 展開すると
$$
\begin{aligned}
\det A
&=1\det\begin{pmatrix}3&4\\0&6\end{pmatrix}
-2\det\begin{pmatrix}0&4\\5&6\end{pmatrix}\\
&=18-2(-20)\\
&=58.
\end{aligned}
$$
<!-- solution-end -->

### Level B

<a id="ex-la3-b01"></a>
#### LA3-B01 quotient dual と annihilator
- Level: B

$W\subset V$ とし、$q:V\to V/W$ を標準射影とする。双対写像
$$
q^*:(V/W)^*\to V^*
$$
の像が $W^\circ$ であることを示せ。

<!-- solution-start -->
**解答**：$\psi\in(V/W)^*$ と $w\in W$ に対して
$$
(q^*\psi)(w)=\psi(q(w))=\psi(0)=0
$$
なので $\operatorname{Im}q^*\subset W^\circ$ です。

逆に $\varphi\in W^\circ$ に対して
$$
\psi(v+W)=\varphi(v)
$$
と定めます。$v+W=v'+W$ なら $v-v'\in W$ なので
$$
\varphi(v)-\varphi(v')=\varphi(v-v')=0.
$$
従って well-defined で
$$
(q^*\psi)(v)=\psi(v+W)=\varphi(v).
$$
よって $q^*\psi=\varphi$ であり
$$
\operatorname{Im}q^*=W^\circ.
$$
<!-- solution-end -->

<a id="ex-la3-b02"></a>
#### LA3-B02 二重双対の自然性
- Level: B

$T:V\to W$ に対して
$$
T^{**}\circ J_V=J_W\circ T
$$
を示せ。

<!-- solution-start -->
**解答**：$v\in V$, $\psi\in W^*$ を任意に取ると
$$
\begin{aligned}
(T^{**}J_V(v))(\psi)
&=J_V(v)(T^*\psi)\\
&=(T^*\psi)(v)\\
&=\psi(Tv)\\
&=(J_W(Tv))(\psi).
\end{aligned}
$$
全ての $\psi$ で一致するので
$$
T^{**}J_V(v)=J_W(Tv).
$$
全ての $v$ で成り立つため所望の写像等式を得ます。
<!-- solution-end -->

<a id="ex-la3-b03"></a>
#### LA3-B03 determinant と可逆性
- Level: B

有限次元 $V$ の線形自己写像 $T$ について
$$
T\text{ が可逆}\Longleftrightarrow\det T\ne0
$$
を示せ。

<!-- solution-start -->
**解答**：[行列式による可逆性判定](#thm-la3-det-invertible)そのものです。可逆なら
$$
1=\det(T^{-1}T)=\det(T^{-1})\det T
$$
なので $\det T\ne0$。逆に $T$ が不可逆なら非零な $v_1\in\ker T$ を基底へ延長し、その基底で値1に正規化した最高次交代形式 $\omega$ を使って
$$
\det T
=\omega(Tv_1,\dots,Tv_n)
=0
$$
を得ます。従って $\det T\ne0$ なら可逆です。
<!-- solution-end -->

<a id="ex-la3-b04"></a>
#### LA3-B04 基本変形と行列式
- Level: B

$$
A=\begin{pmatrix}
1&2&3\\
2&5&7\\
1&0&4
\end{pmatrix}
$$
について、行基本変形だけを使って $\det A$ を求めよ。各変形が行列式へ与える影響も記せ。

<!-- solution-start -->
**解答**：
$$
R_2\leftarrow R_2-2R_1,
\qquad
R_3\leftarrow R_3-R_1
$$
は「他行の倍を加える」操作なので行列式を変えません。
$$
\begin{pmatrix}
1&2&3\\
0&1&1\\
0&-2&1
\end{pmatrix}.
$$
さらに
$$
R_3\leftarrow R_3+2R_2
$$
も行列式を変えず
$$
\begin{pmatrix}
1&2&3\\
0&1&1\\
0&0&3
\end{pmatrix}
$$
を得ます。上三角行列なので
$$
\det A=1\cdot1\cdot3=3.
$$
<!-- solution-end -->

### Level C

<a id="ex-la3-c01"></a>
#### LA3-C01 最高次交代形式の具体計算
- Level: C

$V=\mathbb R^3$、標準基底を $e_1,e_2,e_3$ とし、交代3重線形形式 $\omega$ が
$$
\omega(e_1,e_2,e_3)=2
$$
を満たすとする。
$$
v_1=(1,1,0)^T,
\quad
v_2=(0,1,1)^T,
\quad
v_3=(1,0,1)^T
$$
について $\omega(v_1,v_2,v_3)$ を求めよ。

<!-- solution-start -->
**解答**：[最高次交代形式は1次元](#thm-la3-top-alternating-one-dimensional)から
$$
\omega(v_1,v_2,v_3)
=
\det\begin{pmatrix}
1&0&1\\
1&1&0\\
0&1&1
\end{pmatrix}
\omega(e_1,e_2,e_3).
$$
行列式は
$$
1(1\cdot1-0\cdot1)+1(1\cdot1-1\cdot0)=2
$$
なので
$$
\omega(v_1,v_2,v_3)=2\cdot2=4.
$$
<!-- solution-end -->

<a id="ex-la3-c02"></a>
#### LA3-C02 相似変換と特性多項式
- Level: C

$B=P^{-1}AP$ とする。任意の $t$ に対して
$$
\det(tI-B)=\det(tI-A)
$$
を示せ。

<!-- solution-start -->
**解答**：
$$
\begin{aligned}
tI-B
&=tI-P^{-1}AP\\
&=P^{-1}(tI-A)P.
\end{aligned}
$$
従って[相似不変性](#thm-la3-det-similarity-invariant)から
$$
\det(tI-B)
=\det(P^{-1}(tI-A)P)
=\det(tI-A).
$$
これにより特性多項式は表現行列の基底選択に依存しません。
<!-- solution-end -->

---

## 10. 次に進む

この章で、双対空間に加えて、通常の $n\times n$ 行列式を Leibniz 公式から構成し、Laplace 展開・余因子・可逆性・乗法性・相似不変性まで閉じました。そのうえで行列式を最高次交代形式への作用として抽象化し、座標表示と基底に依存しない定義が一致することも確認しました。

次は自己写像 $T$ に多項式 $p(T)$ を代入し、**特性多項式・最小多項式・Cayley--Hamilton・一般化固有空間・Jordan 構造**へ進みます。
