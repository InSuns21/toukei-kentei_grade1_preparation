# OA5 正汎関数・状態・GNS 構成

<!-- definition-example-audit: strict -->

> **既出概念**：[OA3 の単位的 C*-環](../OA3/index.md#def-oa3-cstar-algebra)、[OA3 の正元](../OA3/index.md#def-oa3-positive)、[OA3 の正の平方根](../OA3/index.md#thm-oa3-positive-square-root)、[OA4 の連続関数計算](../OA4/index.md#thm-oa4-continuous-functional-calculus)、[LA5 の複素内積](../LA5/index.md#def-la5-complex-inner-product)を使います。

OA4 までで、一つの正規元 $a$ から

$
f(a)
$

を作り、そのスペクトルを連続関数として読めるようになりました。しかし、作用素環から確率的な値を読み取るためには、もう一つ別の道具が必要です。

たとえば行列 $A\in M_n(\mathbb C)$ と単位ベクトル $\xi\in\mathbb C^n$ があるとき、

$
\xi^*A\xi
$

は $A$ から一つの複素数を取り出します。特に $A=B^*B$ なら

$
\xi^*B^*B\xi
=
\|B\xi\|^2
\ge0.
$

つまり「平方に対して非負になる線形な読み取り規則」を考えると、抽象的な $C^*$-環の中にも確率的な平均に似た構造を入れられます。

本章の中心は、その向きを逆転させることです。

$
\boxed{
\text{Hilbert 空間上の作用素から非負な読み取り規則を作る}
\quad\Longrightarrow\quad
\text{読み取り規則から Hilbert 空間と作用素表現を作り直す}
}
$

本章後半では、この逆向きの再構成を実際に行います。

~~~
平方を非負に読む線形汎関数
  ↓
Cauchy--Schwarz 型不等式
  ↓
半内積 〈a,b〉φ = φ(a*b)
  ↓
長さ 0 の元を商でつぶす
  ↓
前 Hilbert 空間
  ↓
完備化して Hilbert 空間 Hφ
  ↓
左乗法が有界作用素 πφ(a) になる
  ↓
1つのベクトルから全体を生成し φ(a)=〈Ωφ,πφ(a)Ωφ〉 を回収
~~~

「商を取る」「左乗法が商へ降りる」「左乗法が有界である」の三点は、後半の再構成を式だけ暗記すると最も見えにくいところです。本章ではそこを一段ずつ証明します。

---

## 1. 正線形汎関数：平方を非負に読む

まず、抽象 $C^*$-環から複素数を取り出す線形汎関数に、正性を課します。

<a id="def-oa5-positive-functional"></a>

<!-- formal-statement-start -->
### 定義（正線形汎関数）

$A$ を単位的 $C^*$-環とする。複素線形汎関数

$$
\varphi:A\to\mathbb C
$$

が、任意の $x\in A$ に対して

$$
\boxed{
\varphi(x^*x)\ge0
}
$$

を満たすとき、$\varphi$ を **正線形汎関数** とする。

ここで不等号は $\varphi(x^*x)$ が実数かつ非負であることを意味する。
<!-- formal-statement-end -->

<!-- definition-example-start: def-oa5-positive-functional -->

### 直接例：正規化トレース

$A=M_n(\mathbb C)$ とし、

$$
\tau(X)=\frac1n\operatorname{Tr}(X)
$$

と置きます。

任意の $X=(x_{ij})$ に対して

$$
\begin{aligned}
\tau(X^*X)
&=
\frac1n\operatorname{Tr}(X^*X)\\
&=
\frac1n\sum_{i=1}^n\sum_{j=1}^n |x_{ij}|^2\\
&\ge0.
\end{aligned}
$$

したがって $\tau$ は正線形汎関数です。

<!-- definition-example-end -->

OA3 では正元 $c$ をスペクトルで定義しました。正線形汎関数の定義を $x^*x$ で書いたのは、GNS の半内積に直接使うためです。

この定義から OA3 の正元も非負に送られます。実際、正元 $c$ には [OA3 の正の平方根](../OA3/index.md#thm-oa3-positive-square-root) $c^{1/2}$ が存在し、

$$
c
=
c^{1/2}c^{1/2}
=
(c^{1/2})^*c^{1/2}.
$$

従って

$$
\varphi(c)\ge0.
$$

---

## 2. 正性は随伴との両立を自動的に生む

定義では $\varphi$ が随伴をどう扱うかを仮定していません。それでも正性から

$$
\varphi(a^*)
=
\overline{\varphi(a)}
$$

が従います。

その前に、後で何度も使う平方表示を準備します。

<a id="lem-oa5-cstar-square-bound"></a>

<!-- formal-statement-start -->
### 補題（C*-ノルムによる平方差の平方表示）

単位的 $C^*$-環 $A$ の任意の $x\in A$ に対して、ある自己共役元 $d\in A$ が存在して

$$
\boxed{
\|x\|^2 1-x^*x=d^*d
}
$$

が成り立つ。
<!-- formal-statement-end -->

### 証明の見取り図

$h=x^*x$ は自己共役で、

$$
\|h\|
=
\|x^*x\|
=
\|x\|^2.
$$

したがってスペクトルは実区間

$$
\sigma(h)\subset[-\|x\|^2,\|x\|^2]
$$

に入ります。OA4 の連続関数計算で

$$
t\mapsto\sqrt{\|x\|^2-t}
$$

を $h$ に代入します。

<!-- proof-start -->
### 証明

$$
h=x^*x
$$

と置きます。すると

$$
h^*
=
(x^*x)^*
=
x^*x
=
h.
$$

[OA3 の自己共役元のスペクトルは実数であること](../OA3/index.md#thm-oa3-self-adjoint-real-spectrum)とスペクトル半径の評価から

$$
\sigma_A(h)
\subset
[-\|h\|,\|h\|].
$$

$C^*$-恒等式より

$$
\|h\|
=
\|x^*x\|
=
\|x\|^2.
$$

従って、$\sigma_A(h)$ 上で

$$
g(t)=\sqrt{\|x\|^2-t}
$$

は実数値連続関数です。

[OA4 の連続関数計算](../OA4/index.md#thm-oa4-continuous-functional-calculus)で

$$
d=g(h)
$$

と置きます。$g$ は実数値なので $d=d^*$ です。また連続関数計算は積を保つため

$$
\begin{aligned}
d^*d
&=
d^2\\
&=
(g^2)(h)\\
&=
(\|x\|^2-\iota)(h)\\
&=
\|x\|^2 1-h\\
&=
\|x\|^2 1-x^*x.
\end{aligned}
$$

これで平方表示が得られました。
<!-- proof-end -->

この補題は「$x^*x$ は $\|x\|^2 1$ を越えない」という順序的な事実を、順序記号を新しく導入せずに使える形へしたものです。

<a id="lem-oa5-positive-functional-hermitian"></a>

<!-- formal-statement-start -->
### 補題（正線形汎関数は随伴を複素共役へ送る）

正線形汎関数 $\varphi:A\to\mathbb C$ に対して、任意の $a\in A$ で

$$
\boxed{
\varphi(a^*)
=
\overline{\varphi(a)}
}
$$

が成り立つ。

特に自己共役元 $h=h^*$ に対して $\varphi(h)\in\mathbb R$ である。
<!-- formal-statement-end -->

<!-- proof-start -->
### 証明

まず自己共役元 $h=h^*$ を取ります。

$r>\|h\|$ とします。OA4 の連続関数計算を $h$ に適用し、

$$
g_\pm(t)=\sqrt{r\pm t}
$$

と置けます。$\sigma(h)\subset[-\|h\|,\|h\|]$ なので $r\pm t>0$ です。

$$
d_\pm=g_\pm(h)
$$

と置くと $d_\pm=d_\pm^*$ で、

$$
r1\pm h=d_\pm^*d_\pm.
$$

正性から

$$
\varphi(r1+h)\ge0,
\qquad
\varphi(r1-h)\ge0.
$$

これらは実数です。また

$$
\varphi(1)=\varphi(1^*1)\ge0
$$

も実数です。したがって

$$
\varphi(h)
=
\varphi(r1+h)-r\varphi(1)
$$

は実数です。

一般の $a\in A$ を

$$
h=\frac{a+a^*}{2},
\qquad
k=\frac{a-a^*}{2i}
$$

によって

$$
a=h+ik,
\qquad
a^*=h-ik
$$

と書きます。$h,k$ は自己共役なので $\varphi(h),\varphi(k)$ は実数です。

従って

$$
\begin{aligned}
\varphi(a^*)
&=
\varphi(h)-i\varphi(k)\\
&=
\overline{\varphi(h)+i\varphi(k)}\\
&=
\overline{\varphi(a)}.
\end{aligned}
$$
<!-- proof-end -->

これで

$$
(a,b)\longmapsto\varphi(b^*a)
$$

が複素内積と同じ共役対称性を持つことが分かります。

---

## 3. 正線形汎関数の Cauchy--Schwarz 不等式

次に、GNS 構成の心臓部となる不等式を示します。

<a id="thm-oa5-positive-cauchy-schwarz"></a>

<!-- formal-statement-start -->
### 定理（正線形汎関数の Cauchy--Schwarz 不等式）

$A$ を単位的 $C^*$-環、$\varphi:A\to\mathbb C$ を正線形汎関数とする。

任意の $a,b\in A$ に対して

$$
\boxed{
|\varphi(b^*a)|^2
\le
\varphi(a^*a)\,\varphi(b^*b)
}
$$

が成り立つ。
<!-- formal-statement-end -->

### 証明の見取り図

$$
q_\varphi(a,b)=\varphi(b^*a)
$$

と置くと、

$$
q_\varphi(x,x)\ge0
$$

です。

通常の Cauchy--Schwarz と同じく

$$
q_\varphi(a+\lambda b,a+\lambda b)\ge0
$$

を $\lambda$ について最小化します。ただし $\varphi(b^*b)=0$ の場合を先に分けます。

<!-- proof-start -->
### 証明

$$
q(a,b)=\varphi(b^*a)
$$

と書きます。前節の補題から

$$
q(b,a)=\overline{q(a,b)}.
$$

また正性から

$$
q(a,a)=\varphi(a^*a)\ge0.
$$

まず

$$
q(b,b)>0
$$

とします。

任意の $\lambda\in\mathbb C$ に対し

$$
0
\le
q(a+\lambda b,a+\lambda b).
$$

展開すると

$$
q(a,a)
+
\lambda q(b,a)
+
\overline\lambda q(a,b)
+
|\lambda|^2 q(b,b)
\ge0.
$$

ここで

$$
\lambda
=
-\frac{q(a,b)}{q(b,b)}
$$

と選びます。すると

$$
\lambda q(b,a)
=
-\frac{|q(a,b)|^2}{q(b,b)},
$$

$$
\overline\lambda q(a,b)
=
-\frac{|q(a,b)|^2}{q(b,b)},
$$

$$
|\lambda|^2 q(b,b)
=
\frac{|q(a,b)|^2}{q(b,b)}.
$$

従って

$$
0
\le
q(a,a)
-
\frac{|q(a,b)|^2}{q(b,b)}.
$$

よって

$$
|q(a,b)|^2
\le
q(a,a)q(b,b).
$$

次に

$$
q(b,b)=0
$$

とします。

もし $q(a,b)\ne0$ なら、$t>0$ に対して

$$
\lambda=-tq(a,b)
$$

と置くと、

$$
\begin{aligned}
q(a+\lambda b,a+\lambda b)
&=
q(a,a)
-2t|q(a,b)|^2
\end{aligned}
$$

となります。十分大きな $t$ では右辺が負になり、正性に反します。

したがって

$$
q(a,b)=0.
$$

この場合も

$$
|q(a,b)|^2
\le
q(a,a)q(b,b)
$$

が成り立ちます。

以上から

$$
|\varphi(b^*a)|^2
\le
\varphi(a^*a)\varphi(b^*b).
$$
<!-- proof-end -->

この定理の重要な帰結は、

$$
\varphi(a^*a)=0
$$

なら、任意の $b$ について

$$
\varphi(b^*a)=0
$$

になることです。「長さ0の元」は全ての元と直交するため、商でつぶせます。

---

## 4. 正線形汎関数は自動的に有界である

正性は代数的な条件に見えますが、$C^*$-ノルムとの相性が非常に強く、連続性まで自動的に出ます。

<a id="thm-oa5-positive-functional-norm"></a>

<!-- formal-statement-start -->
### 定理（正線形汎関数のノルム）

単位的 $C^*$-環 $A$ 上の正線形汎関数 $\varphi$ は有界であり、

$$
\boxed{
\|\varphi\|
=
\varphi(1)
}
$$

を満たす。
<!-- formal-statement-end -->

<!-- proof-start -->
### 証明

補題より、任意の $a\in A$ に対してある $d=d^*$ が存在し、

$$
\|a\|^2 1-a^*a=d^*d.
$$

正性を使うと

$$
\varphi(d^*d)\ge0.
$$

従って

$$
\|a\|^2\varphi(1)-\varphi(a^*a)\ge0,
$$

すなわち

$$
\varphi(a^*a)
\le
\|a\|^2\varphi(1).
$$

Cauchy--Schwarz 不等式を $b=1$ に適用すると

$$
\begin{aligned}
|\varphi(a)|^2
&=
|\varphi(1^*a)|^2\\
&\le
\varphi(a^*a)\varphi(1)\\
&\le
\|a\|^2\varphi(1)^2.
\end{aligned}
$$

従って

$$
|\varphi(a)|
\le
\varphi(1)\|a\|.
$$

よって

$$
\|\varphi\|
\le
\varphi(1).
$$

一方 $\|1\|=1$ なので

$$
\|\varphi\|
\ge
|\varphi(1)|
=
\varphi(1).
$$

従って

$$
\|\varphi\|
=
\varphi(1).
$$
<!-- proof-end -->

---

## 5. 状態：正線形汎関数を確率1へ正規化する

正線形汎関数の全体には大きさがあります。期待値のように使うには、単位元を $1$ へ送るものに正規化します。

<a id="def-oa5-state"></a>

<!-- formal-statement-start -->
### 定義（状態）

単位的 $C^*$-環 $A$ 上の正線形汎関数 $\varphi$ が

$$
\boxed{
\varphi(1)=1
}
$$

を満たすとき、$\varphi$ を $A$ 上の **状態** とする。
<!-- formal-statement-end -->

<!-- definition-example-start: def-oa5-state -->

### 直接例：点評価状態

$K$ をコンパクト Hausdorff 空間、$x_0\in K$ とし、

$$
\delta_{x_0}:C(K)\to\mathbb C,
\qquad
\delta_{x_0}(f)=f(x_0)
$$

と置きます。

任意の $f\in C(K)$ について

$$
\delta_{x_0}(f^*f)
=
|f(x_0)|^2
\ge0
$$

なので正です。また

$$
\delta_{x_0}(1)=1.
$$

したがって $\delta_{x_0}$ は状態です。

<!-- definition-example-end -->

前節の定理から、状態は自動的に

$$
\|\varphi\|=1
$$

です。

行列環では、単位ベクトル $\xi\in\mathbb C^n$ に対して

$$
\omega_\xi(A)
=
\xi^*A\xi
$$

と置けば

$$
\omega_\xi(X^*X)
=
\|X\xi\|^2\ge0,
\qquad
\omega_\xi(I)=1,
$$

なので状態になります。

QM2 で状態ベクトルから期待値を作った式が、ここでは $C^*$-環上の状態の具体例として現れています。

---

## 6. 半内積と零空間：なぜ商が必要か

状態 $\varphi$ が与えられたら、

$$
\langle a,b\rangle_\varphi
=
\varphi(a^*b)
$$

と置きたくなります。

Cauchy--Schwarz も成り立つので、ほとんど内積に見えます。ただし

$$
\varphi(a^*a)=0
$$

なのに $a\ne0$ となる可能性があります。

点評価状態では、$f(x_0)=0$ なら非零関数でも長さ0です。そこで長さ0の元を同一視します。

<a id="def-oa5-gns-null-space"></a>

<!-- formal-statement-start -->
### 定義（GNS 零空間）

状態 $\varphi$ に対して

$$
\boxed{
N_\varphi
=
\{a\in A:\varphi(a^*a)=0\}
}
$$

を **GNS 零空間** とする。
<!-- formal-statement-end -->

<!-- definition-example-start: def-oa5-gns-null-space -->

### 直接例：点評価状態の零空間

$\varphi=\delta_{x_0}$ とします。

$$
\varphi(f^*f)
=
|f(x_0)|^2
$$

なので

$$
N_\varphi
=
\{f\in C(K):f(x_0)=0\}.
$$

したがって $f$ と $g$ が商空間で同じ類になることは

$$
f(x_0)=g(x_0)
$$

と同値です。

<!-- definition-example-end -->

GNS 構成では、$N_\varphi$ が単なる線形部分空間だけでなく **左イデアル** になることが決定的です。

<a id="prop-oa5-null-left-ideal"></a>

<!-- formal-statement-start -->
### 命題（GNS 零空間は左イデアルである）

状態 $\varphi$ に対して $N_\varphi$ は線形部分空間であり、

$$
x\in A,\quad a\in N_\varphi
\quad\Longrightarrow\quad
xa\in N_\varphi
$$

を満たす。
<!-- formal-statement-end -->

### 証明の見取り図

線形性では Cauchy--Schwarz により、長さ0の元との交差項が全て0になることを使います。

左イデアル性では

$$
\|x\|^2 1-x^*x=d^*d
$$

を $a$ で挟みます。

<!-- proof-start -->
### 証明

まず $a\in N_\varphi$ とします。Cauchy--Schwarz から任意の $b\in A$ に対して

$$
|\varphi(b^*a)|^2
\le
\varphi(a^*a)\varphi(b^*b)
=
0.
$$

従って

$$
\varphi(b^*a)=0.
$$

随伴を複素共役へ送るので

$$
\varphi(a^*b)=0
$$

も成り立ちます。

$a,b\in N_\varphi$ とすると

$$
\begin{aligned}
\varphi((a+b)^*(a+b))
&=
\varphi(a^*a)
+
\varphi(a^*b)
+
\varphi(b^*a)
+
\varphi(b^*b)\\
&=
0.
\end{aligned}
$$

従って $a+b\in N_\varphi$ です。

また $\lambda\in\mathbb C$ に対して

$$
\varphi((\lambda a)^*(\lambda a))
=
|\lambda|^2\varphi(a^*a)
=
0
$$

なので $\lambda a\in N_\varphi$ です。よって $N_\varphi$ は線形部分空間です。

次に $x\in A$、$a\in N_\varphi$ を取ります。

平方差の補題から、ある $d=d^*$ が存在して

$$
\|x\|^2 1-x^*x=d^*d.
$$

$a^*$ と $a$ で挟むと

$$
a^*(\|x\|^2 1-x^*x)a
=
a^*d^*da
=
(da)^*(da).
$$

正性から

$$
\varphi((da)^*(da))\ge0.
$$

従って

$$
\|x\|^2\varphi(a^*a)
-
\varphi(a^*x^*xa)
\ge0.
$$

$a\in N_\varphi$ なので第1項は0です。一方

$$
\varphi(a^*x^*xa)
=
\varphi((xa)^*(xa))
\ge0.
$$

したがって

$$
0
\le
\varphi((xa)^*(xa))
\le0.
$$

よって

$$
\varphi((xa)^*(xa))=0,
$$

すなわち

$$
xa\in N_\varphi.
$$
<!-- proof-end -->

右イデアルである必要はありません。GNS では左乗法

$$
a\mapsto xa
$$

を作用素として使うため、左イデアルであることがちょうど必要です。

---

## 7. 商空間に本物の内積を入れる

商ベクトル空間

$$
A/N_\varphi
$$

で $a$ の類を

$$
[a]=a+N_\varphi
$$

と書きます。

ここで

$$
\langle[a],[b]\rangle
=
\varphi(a^*b)
$$

と定めたいのですが、代表元の選び方に依存しないことを確認しなければなりません。

<a id="prop-oa5-quotient-inner-product"></a>

<!-- formal-statement-start -->
### 命題（GNS 商空間の内積）

$A/N_\varphi$ 上で

$$
\boxed{
\langle[a],[b]\rangle_\varphi
=
\varphi(a^*b)
}
$$

と定めると、これは well-defined な複素内積である。
<!-- formal-statement-end -->

<!-- proof-start -->
### 証明

$a'=a+n$、$b'=b+m$ とし、

$$
n,m\in N_\varphi
$$

とします。

Cauchy--Schwarz から、零空間の元は任意の元と直交するので

$$
\varphi(a^*m)=0,
\qquad
\varphi(n^*b)=0,
\qquad
\varphi(n^*m)=0.
$$

従って

$$
\begin{aligned}
\varphi((a')^*b')
&=
\varphi((a+n)^*(b+m))\\
&=
\varphi(a^*b)
+
\varphi(a^*m)
+
\varphi(n^*b)
+
\varphi(n^*m)\\
&=
\varphi(a^*b).
\end{aligned}
$$

よって代表元に依存しません。

線形性は $\varphi$ の線形性から従います。

共役対称性は

$$
\begin{aligned}
\langle[b],[a]\rangle_\varphi
&=
\varphi(b^*a)\\
&=
\overline{\varphi(a^*b)}\\
&=
\overline{\langle[a],[b]\rangle_\varphi}
\end{aligned}
$$

です。

最後に

$$
\langle[a],[a]\rangle_\varphi
=
\varphi(a^*a)\ge0.
$$

これが0なら $a\in N_\varphi$ なので

$$
[a]=0.
$$

従って正定値です。
<!-- proof-end -->

商空間 $A/N_\varphi$ は内積空間になりました。ただし一般には完備とは限りません。

その完備化を

$$
H_\varphi
$$

と書きます。

---

## 8. 左乗法を作用素にする

次に $x\in A$ を固定し、

$$
[a]\longmapsto[xa]
$$

と作用させます。

零空間が左イデアルだから、この写像は代表元に依存しません。

ここで目標を言葉にしておきます。抽象的な $C^*$-環の各元を Hilbert 空間上の有界作用素として、和・積・随伴・単位元を保ったまま実現する写像を **表現** と呼びます。さらに、一つのベクトルに環の全ての元を作用させ、その線形的な広がりと極限だけで Hilbert 空間全体を生成できるとき、そのベクトルを **巡回ベクトル** と呼びます。

GNS で欲しいのは、状態からこのような巡回表現を作ることです。

<a id="def-oa5-star-representation"></a>

<!-- formal-statement-start -->
### 定義（単位的 *-表現と巡回ベクトル）

$A$ を単位的 $C^*$-環、$H$ を Hilbert 空間とし、スカラー体を $\mathbb C$ とする。

単位的 *-準同型

$$
\pi:A\to B(H)
$$

を $A$ の $H$ 上の **単位的 *-表現** とする。

ベクトル $\Omega\in H$ が

$$
\overline{\{\pi(a)\Omega:a\in A\}}
=
H
$$

を満たすとき、$\Omega$ を **巡回ベクトル** とし、$(\pi,H,\Omega)$ を **巡回表現** とする。
<!-- formal-statement-end -->

<!-- definition-example-start: def-oa5-star-representation -->

### 直接例：行列環の標準表現

$$
A=M_n(\mathbb C),
\qquad
H=\mathbb C^n
$$

とし、

$$
\pi(A)\xi=A\xi
$$

と置きます。これは積・随伴・単位元をそのまま保つ単位的 *-表現です。

$\Omega=e_1$ とすると、任意の $\eta\in\mathbb C^n$ に対して第一列が $\eta$ である行列 $A$ を取れば

$$
A e_1=\eta.
$$

従って

$$
\{\pi(A)e_1:A\in M_n(\mathbb C)\}
=
\mathbb C^n.
$$

よって $e_1$ は巡回ベクトルです。

<!-- definition-example-end -->

GNS では、この表現を状態から作ります。

まず完備化前の商空間で

$$
\pi_\varphi^0(x)[a]=[xa]
$$

と置きます。

well-defined 性は左イデアル性から従います。

さらに

$$
\pi_\varphi^0(x)
$$

が有界でなければ、完備化 $H_\varphi$ へ延長できません。ここが第二の核心です。

<a id="prop-oa5-left-multiplication-bounded"></a>

<!-- formal-statement-start -->
### 命題（GNS 左乗法は有界である）

任意の $x\in A$ に対して

$$
\pi_\varphi^0(x)[a]=[xa]
$$

で定めた線形作用素は

$$
\boxed{
\|\pi_\varphi^0(x)\|
\le
\|x\|
}
$$

を満たす。

従って $H_\varphi$ 上の有界作用素

$$
\pi_\varphi(x)\in B(H_\varphi)
$$

へ一意に延長する。
<!-- formal-statement-end -->

<!-- proof-start -->
### 証明

商空間のノルムについて

$$
\|[a]\|_\varphi^2
=
\varphi(a^*a).
$$

平方差の補題から、ある $d=d^*$ が存在して

$$
\|x\|^2 1-x^*x=d^*d.
$$

従って

$$
\begin{aligned}
&\|x\|^2\varphi(a^*a)
-
\varphi(a^*x^*xa)\\
&\qquad=
\varphi\!\left(
a^*(\|x\|^2 1-x^*x)a
\right)\\
&\qquad=
\varphi((da)^*(da))\\
&\qquad\ge0.
\end{aligned}
$$

したがって

$$
\begin{aligned}
\|\pi_\varphi^0(x)[a]\|_\varphi^2
&=
\|[xa]\|_\varphi^2\\
&=
\varphi(a^*x^*xa)\\
&\le
\|x\|^2\varphi(a^*a)\\
&=
\|x\|^2\|[a]\|_\varphi^2.
\end{aligned}
$$

平方根を取ると

$$
\|\pi_\varphi^0(x)[a]\|_\varphi
\le
\|x\|\|[a]\|_\varphi.
$$

従って

$$
\|\pi_\varphi^0(x)\|\le\|x\|.
$$

有界作用素は完備化へ一意に連続延長できるので、$H_\varphi$ 上の作用素

$$
\pi_\varphi(x)
$$

を得ます。
<!-- proof-end -->

随伴も正しく対応します。完備化前では

$$
\begin{aligned}
\langle \pi_\varphi^0(x)[a],[b]\rangle_\varphi
&=
\varphi((xa)^*b)\\
&=
\varphi(a^*x^*b)\\
&=
\langle[a],\pi_\varphi^0(x^*)[b]\rangle_\varphi.
\end{aligned}
$$

従って

$$
\pi_\varphi(x)^*
=
\pi_\varphi(x^*).
$$

積と単位元についても

$$
\pi_\varphi(xy)[a]
=
[xya]
=
\pi_\varphi(x)\pi_\varphi(y)[a],
$$

$$
\pi_\varphi(1)[a]=[a]
$$

です。よって $\pi_\varphi$ は単位的 *-表現になります。

---

## 9. GNS 構成

全ての準備がそろいました。

<a id="thm-oa5-gns"></a>

<!-- formal-statement-start -->
### 定理（GNS 構成）

$A$ を単位的 $C^*$-環、$\varphi$ を $A$ 上の状態とする。

このとき複素 Hilbert 空間 $H_\varphi$、単位的 *-表現

$$
\pi_\varphi:A\to B(H_\varphi)
$$

および単位ベクトル $\Omega_\varphi\in H_\varphi$ が存在し、

1. $\Omega_\varphi$ は巡回ベクトルである。
2. 任意の $a\in A$ に対して

$$
\boxed{
\varphi(a)
=
\langle
\Omega_\varphi,
\pi_\varphi(a)\Omega_\varphi
\rangle
}
$$

が成り立つ。

具体的には

$$
H_\varphi
=
\overline{A/N_\varphi},
\qquad
\pi_\varphi(a)[b]=[ab],
\qquad
\Omega_\varphi=[1]
$$

で構成できる。
<!-- formal-statement-end -->

### 証明の見取り図

前節までで $A/N_\varphi$ の内積と左乗法の有界性は証明済みです。

残るのは

- $\Omega_\varphi=[1]$ のノルムが1であること。
- これが巡回であること。
- 元の状態を内積から回収できること。

の三点です。

<!-- proof-start -->
### 証明

$$
\Omega_\varphi=[1]
$$

と置きます。

状態の正規化条件から

$$
\begin{aligned}
\|\Omega_\varphi\|^2
&=
\langle[1],[1]\rangle_\varphi\\
&=
\varphi(1^*1)\\
&=
\varphi(1)\\
&=
1.
\end{aligned}
$$

従って $\Omega_\varphi$ は単位ベクトルです。

任意の $a\in A$ に対して

$$
\pi_\varphi(a)\Omega_\varphi
=
\pi_\varphi(a)[1]
=
[a].
$$

したがって

$$
\{\pi_\varphi(a)\Omega_\varphi:a\in A\}
$$

は商空間 $A/N_\varphi$ そのものです。

$H_\varphi$ はこの商空間の完備化なので、

$$
\overline{\{\pi_\varphi(a)\Omega_\varphi:a\in A\}}
=
H_\varphi.
$$

よって $\Omega_\varphi$ は巡回です。

最後に

$$
\begin{aligned}
\langle
\Omega_\varphi,
\pi_\varphi(a)\Omega_\varphi
\rangle
&=
\langle[1],[a]\rangle_\varphi\\
&=
\varphi(1^*a)\\
&=
\varphi(a).
\end{aligned}
$$

従って元の状態が回収されます。
<!-- proof-end -->

GNS の意味は、抽象的な $C^*$-環を最初から作用素環と仮定しなくても、**一つの状態を選べば、その状態から見える Hilbert 空間表現を構成できる**ことです。

---

## 10. GNS 表現の一意性

構成では商空間を使いましたが、同じ状態を同じ巡回ベクトルで実現する別の表現があったとしても、本質的には同じです。

<a id="thm-oa5-gns-uniqueness"></a>

<!-- formal-statement-start -->
### 定理（GNS 巡回表現の一意性）

$\varphi$ を単位的 $C^*$-環 $A$ 上の状態とする。

$(\pi_\varphi,H_\varphi,\Omega_\varphi)$ を GNS 表現とし、別の巡回表現 $(\rho,K,\Omega)$ が

$$
\varphi(a)
=
\langle\Omega,\rho(a)\Omega\rangle
$$

を全ての $a\in A$ について満たすとする。

このとき unitary 作用素

$$
U:H_\varphi\to K
$$

がただ一つ存在して

$$
U\Omega_\varphi=\Omega,
$$

$$
U\pi_\varphi(a)=\rho(a)U
$$

を全ての $a\in A$ について満たす。
<!-- formal-statement-end -->

### 証明の見取り図

稠密部分空間上で

$$
U_0[a]
=
\rho(a)\Omega
$$

と置きます。

内積が状態 $\varphi$ だけで決まるため、この写像は等長です。巡回性が全射性を与えます。

<!-- proof-start -->
### 証明

まず

$$
U_0:A/N_\varphi\to K
$$

を

$$
U_0[a]=\rho(a)\Omega
$$

で定めます。

well-defined 性を確認します。

$[a]=[b]$ なら $a-b\in N_\varphi$ なので

$$
\varphi((a-b)^*(a-b))=0.
$$

一方

$$
\begin{aligned}
\|\rho(a-b)\Omega\|^2
&=
\langle
\rho(a-b)\Omega,
\rho(a-b)\Omega
\rangle\\
&=
\langle
\Omega,
\rho((a-b)^*(a-b))\Omega
\rangle\\
&=
\varphi((a-b)^*(a-b))\\
&=
0.
\end{aligned}
$$

従って

$$
\rho(a)\Omega=\rho(b)\Omega.
$$

よって $U_0$ は well-defined です。

さらに

$$
\begin{aligned}
\langle U_0[a],U_0[b]\rangle
&=
\langle\rho(a)\Omega,\rho(b)\Omega\rangle\\
&=
\langle\Omega,\rho(a)^*\rho(b)\Omega\rangle\\
&=
\langle\Omega,\rho(a^*b)\Omega\rangle\\
&=
\varphi(a^*b)\\
&=
\langle[a],[b]\rangle_\varphi.
\end{aligned}
$$

従って $U_0$ は等長です。

よって完備化へ一意に等長写像

$$
U:H_\varphi\to K
$$

として延長できます。

$\Omega$ は $\rho$ の巡回ベクトルなので

$$
\overline{\{\rho(a)\Omega:a\in A\}}
=
K.
$$

これは $U_0$ の像が $K$ で稠密であることを意味します。

一方、完備空間からの等長写像の像は閉なので $U(H_\varphi)$ は閉です。稠密かつ閉なので

$$
U(H_\varphi)=K.
$$

従って $U$ は unitary です。

また

$$
U\Omega_\varphi
=
U[1]
=
\rho(1)\Omega
=
\Omega.
$$

任意の $a,b\in A$ に対し

$$
\begin{aligned}
U\pi_\varphi(a)[b]
&=
U[ab]\\
&=
\rho(ab)\Omega\\
&=
\rho(a)\rho(b)\Omega\\
&=
\rho(a)U[b].
\end{aligned}
$$

商空間は稠密なので

$$
U\pi_\varphi(a)=\rho(a)U
$$

が $H_\varphi$ 全体で成り立ちます。

最後に、この二条件を満たす unitary $V$ があれば

$$
V[a]
=
V\pi_\varphi(a)\Omega_\varphi
=
\rho(a)V\Omega_\varphi
=
\rho(a)\Omega
=
U[a].
$$

稠密部分空間で一致するため $V=U$ です。
<!-- proof-end -->

---

## 11. 三つの GNS 具体例

### 11.1 点評価状態は1次元表現を作る

$A=C(K)$、$\varphi=\delta_{x_0}$ とします。

既に

$$
N_\varphi
=
\{f:f(x_0)=0\}
$$

と分かっています。

写像

$$
[f]\longmapsto f(x_0)
$$

により

$$
A/N_\varphi\cong\mathbb C.
$$

内積は

$$
\langle[f],[g]\rangle
=
\overline{f(x_0)}g(x_0)
$$

です。既に完備なので

$$
H_\varphi\cong\mathbb C.
$$

さらに

$$
\pi_\varphi(f)z
=
f(x_0)z.
$$

つまり GNS 表現は点評価そのものです。

### 11.2 行列のベクトル状態は標準表現を回収する

$A=M_n(\mathbb C)$、$\xi=e_1$ とし、

$$
\varphi(A)
=
e_1^*Ae_1
$$

と置きます。

すると

$$
\begin{aligned}
\varphi(A^*A)
&=
e_1^*A^*Ae_1\\
&=
\|Ae_1\|^2.
\end{aligned}
$$

従って

$$
N_\varphi
=
\{A:Ae_1=0\}.
$$

これは「第一列が0の行列全体」です。

写像

$$
U_0:[A]\longmapsto Ae_1
$$

を考えると

$$
\begin{aligned}
\langle[A],[B]\rangle_\varphi
&=
e_1^*A^*Be_1\\
&=
(A e_1)^*(B e_1),
\end{aligned}
$$

なので $U_0$ は等長です。

任意の $\eta\in\mathbb C^n$ は、第一列を $\eta$ とする行列 $A$ によって

$$
Ae_1=\eta
$$

と書けるので全射です。

従って

$$
H_\varphi\cong\mathbb C^n.
$$

また

$$
U_0\pi_\varphi(X)[A]
=
X A e_1
=
XU_0[A].
$$

したがって $\pi_\varphi$ は標準表現

$$
X:\mathbb C^n\to\mathbb C^n
$$

と unitary 同値です。

### 11.3 正規化トレースは左正則表現を作る

$$
\tau(A)=\frac1n\operatorname{Tr}(A)
$$

とします。

$$
\tau(A^*A)
=
\frac1n\sum_{i,j}|a_{ij}|^2
$$

なので

$$
N_\tau=\{0\}.
$$

したがって GNS 空間はベクトル空間として

$$
M_n(\mathbb C)
$$

そのもので、内積は

$$
\langle A,B\rangle_\tau
=
\frac1n\operatorname{Tr}(A^*B).
$$

表現は左乗法

$$
\pi_\tau(X)A=XA
$$

です。

ベクトル状態では $n$ 次元だったのに対し、正規化トレースの GNS 空間は $n^2$ 次元です。同じ $C^*$-環でも、選ぶ状態によって「その状態から見える Hilbert 空間」は変わります。

---

# 演習

## Level A

### A1. 正規化トレースが状態であることを確認する

- Level: A

$A=M_n(\mathbb C)$ とし

$$
\tau(X)=\frac1n\operatorname{Tr}(X)
$$

とする。

1. $\tau(X^*X)\ge0$ を成分表示から示せ。
2. $\tau(I)=1$ を示せ。
3. $\tau$ が状態であることを結論せよ。

<!-- solution-start -->
### 詳細解答

#### 1. 正性

$X=(x_{ij})$ とします。

$X^*X$ の第 $i$ 対角成分は

$$
(X^*X)_{ii}
=
\sum_{j=1}^n \overline{x_{ji}}x_{ji}
=
\sum_{j=1}^n |x_{ji}|^2.
$$

従って

$$
\begin{aligned}
\tau(X^*X)
&=
\frac1n\sum_{i=1}^n (X^*X)_{ii}\\
&=
\frac1n\sum_{i=1}^n\sum_{j=1}^n |x_{ji}|^2\\
&\ge0.
\end{aligned}
$$

#### 2. 正規化

$$
\operatorname{Tr}(I)=n
$$

なので

$$
\tau(I)
=
\frac1n n
=
1.
$$

#### 3. 結論

$\tau$ は複素線形で、1から正線形汎関数、2から単位元を1へ送ります。

従って $\tau$ は状態です。
<!-- solution-end -->

### A2. 点評価状態の GNS 空間

- Level: A

$K$ をコンパクト Hausdorff 空間、$x_0\in K$ とし

$$
\varphi(f)=f(x_0)
$$

とする。

1. $N_\varphi=\{f:f(x_0)=0\}$ を示せ。
2. $[f]\mapsto f(x_0)$ が $C(K)/N_\varphi$ から $\mathbb C$ への等長同型であることを示せ。
3. GNS 表現が

$$
\pi_\varphi(f)z=f(x_0)z
$$

になることを示せ。

<!-- solution-start -->
### 詳細解答

#### 1. 零空間

$$
\begin{aligned}
\varphi(f^*f)
&=
(f^*f)(x_0)\\
&=
\overline{f(x_0)}f(x_0)\\
&=
|f(x_0)|^2.
\end{aligned}
$$

従って

$$
\varphi(f^*f)=0
\iff
f(x_0)=0.
$$

よって

$$
N_\varphi=\{f:f(x_0)=0\}.
$$

#### 2. 商空間

$$
U([f])=f(x_0)
$$

と置きます。

$[f]=[g]$ なら $f-g\in N_\varphi$ なので

$$
f(x_0)=g(x_0).
$$

従って well-defined です。

また

$$
\|[f]\|_\varphi^2
=
\varphi(f^*f)
=
|f(x_0)|^2
=
|U([f])|^2.
$$

よって等長です。

任意の $z\in\mathbb C$ は定数関数 $f\equiv z$ によって $U([f])=z$ と書けるので全射です。

#### 3. 表現

任意の $f,g\in C(K)$ に対して

$$
\begin{aligned}
U(\pi_\varphi(f)[g])
&=
U([fg])\\
&=
f(x_0)g(x_0)\\
&=
f(x_0)U([g]).
\end{aligned}
$$

従って $\mathbb C$ 上では

$$
\pi_\varphi(f)z=f(x_0)z.
$$
<!-- solution-end -->

### A3. ベクトル状態の零空間

- Level: A

$A=M_2(\mathbb C)$、$e_1=(1,0)^T$ とし、

$$
\varphi(X)=e_1^*Xe_1
$$

とする。

1. $\varphi(X)=x_{11}$ を示せ。
2. $\varphi(X^*X)=\|Xe_1\|^2$ を示せ。
3. $N_\varphi$ が第一列が0の行列全体であることを示せ。

<!-- solution-start -->
### 詳細解答

$$
X=
\begin{pmatrix}
x_{11}&x_{12}\\
x_{21}&x_{22}
\end{pmatrix}
$$

とします。

#### 1. 状態の値

$$
Xe_1
=
\begin{pmatrix}
x_{11}\\
x_{21}
\end{pmatrix}
$$

なので

$$
e_1^*Xe_1=x_{11}.
$$

#### 2. 二乗の値

$$
\begin{aligned}
\varphi(X^*X)
&=
e_1^*X^*Xe_1\\
&=
(Xe_1)^*(Xe_1)\\
&=
\|Xe_1\|^2.
\end{aligned}
$$

#### 3. 零空間

2から

$$
X\in N_\varphi
\iff
Xe_1=0.
$$

$Xe_1$ は $X$ の第一列なので、これは第一列が0であることと同値です。
<!-- solution-end -->

### A4. 状態の加重平均

- Level: A

$\varphi,\psi$ を単位的 $C^*$-環 $A$ 上の状態とし、$0\le t\le1$ とする。

$$
\omega=t\varphi+(1-t)\psi
$$

と置く。

$\omega$ も状態であることを示せ。

<!-- solution-start -->
### 詳細解答

任意の $x\in A$ に対して

$$
\varphi(x^*x)\ge0,
\qquad
\psi(x^*x)\ge0.
$$

また $t\ge0$、$1-t\ge0$ なので

$$
\begin{aligned}
\omega(x^*x)
&=
t\varphi(x^*x)
+
(1-t)\psi(x^*x)\\
&\ge0.
\end{aligned}
$$

従って $\omega$ は正線形汎関数です。

さらに

$$
\begin{aligned}
\omega(1)
&=
t\varphi(1)
+
(1-t)\psi(1)\\
&=
t+(1-t)\\
&=
1.
\end{aligned}
$$

よって $\omega$ は状態です。
<!-- solution-end -->

## Level B

### B1. 正線形汎関数のノルムを再構成する

- Level: B

$\varphi$ を単位的 $C^*$-環 $A$ 上の正線形汎関数とする。

[正線形汎関数の Cauchy--Schwarz 不等式](#thm-oa5-positive-cauchy-schwarz)を使って

$$
|\varphi(a)|
\le
\varphi(1)\|a\|
$$

を導き、

$$
\|\varphi\|=\varphi(1)
$$

を示せ。

<!-- solution-start -->
### 詳細解答

平方差の補題から、ある $d=d^*$ が存在して

$$
\|a\|^2 1-a^*a=d^*d.
$$

正性より

$$
\varphi(d^*d)\ge0.
$$

従って

$$
\varphi(a^*a)
\le
\|a\|^2\varphi(1).
$$

Cauchy--Schwarz を $b=1$ に適用すると

$$
\begin{aligned}
|\varphi(a)|^2
&=
|\varphi(1^*a)|^2\\
&\le
\varphi(a^*a)\varphi(1)\\
&\le
\|a\|^2\varphi(1)^2.
\end{aligned}
$$

両辺の平方根から

$$
|\varphi(a)|
\le
\varphi(1)\|a\|.
$$

したがって

$$
\|\varphi\|
\le
\varphi(1).
$$

一方 $\|1\|=1$ なので

$$
\|\varphi\|
\ge
|\varphi(1)|
=
\varphi(1).
$$

よって

$$
\boxed{
\|\varphi\|=\varphi(1).
}
$$
<!-- solution-end -->

### B2. GNS 左乗法の well-defined 性と有界性

- Level: B

$\varphi$ を状態、$N_\varphi$ を GNS 零空間とする。$x\in A$ に対して

$$
T_x[a]=[xa]
$$

と置く。

1. $T_x$ が代表元に依存しないことを示せ。
2. $\|T_x[a]\|_\varphi\le\|x\|\|[a]\|_\varphi$ を示せ。
3. $T_x$ が完備化 $H_\varphi$ 上の有界作用素へ延長することを説明せよ。

<!-- solution-start -->
### 詳細解答

#### 1. well-defined 性

$[a]=[b]$ とします。すると

$$
a-b\in N_\varphi.
$$

GNS 零空間は左イデアルなので

$$
x(a-b)\in N_\varphi.
$$

従って

$$
xa-xb\in N_\varphi,
$$

すなわち

$$
[xa]=[xb].
$$

よって $T_x$ は代表元に依存しません。

#### 2. 有界性

平方差の補題から

$$
\|x\|^2 1-x^*x=d^*d
$$

となる $d=d^*$ が存在します。

従って

$$
\begin{aligned}
0
&\le
\varphi((da)^*(da))\\
&=
\varphi(a^*d^*da)\\
&=
\|x\|^2\varphi(a^*a)
-
\varphi(a^*x^*xa).
\end{aligned}
$$

よって

$$
\varphi(a^*x^*xa)
\le
\|x\|^2\varphi(a^*a).
$$

したがって

$$
\begin{aligned}
\|T_x[a]\|_\varphi^2
&=
\varphi((xa)^*(xa))\\
&=
\varphi(a^*x^*xa)\\
&\le
\|x\|^2\|[a]\|_\varphi^2.
\end{aligned}
$$

平方根を取って

$$
\|T_x[a]\|_\varphi
\le
\|x\|\|[a]\|_\varphi.
$$

#### 3. 完備化への延長

2から $T_x$ は稠密部分空間 $A/N_\varphi$ 上の有界作用素です。

有界線形作用素は Cauchy 列を Cauchy 列へ送るため、完備化 $H_\varphi$ へ一意に連続延長できます。
<!-- solution-end -->

### B3. 正規化トレースの GNS 表現

- Level: B

$A=M_2(\mathbb C)$ とし、

$$
\tau(X)=\frac12\operatorname{Tr}(X)
$$

とする。

1. $N_\tau=\{0\}$ を示せ。
2. GNS 内積が

$$
\langle X,Y\rangle_\tau
=
\frac12\operatorname{Tr}(X^*Y)
$$

になることを示せ。
3. GNS 表現が

$$
\pi_\tau(A)X=AX
$$

という左乗法であることを示せ。
4. $\Omega_\tau=I$ が巡回であることを示せ。

<!-- solution-start -->
### 詳細解答

#### 1. 零空間

$$
X=
\begin{pmatrix}
a&b\\
c&d
\end{pmatrix}
$$

とします。

$$
\begin{aligned}
\tau(X^*X)
&=
\frac12\operatorname{Tr}(X^*X)\\
&=
\frac12(
|a|^2+|b|^2+|c|^2+|d|^2
).
\end{aligned}
$$

これは全成分が0のとき、かつそのときに限り0です。

従って

$$
N_\tau=\{0\}.
$$

#### 2. 内積

零空間が0なので商を取ってもベクトル空間は $M_2(\mathbb C)$ 自身です。

定義から

$$
\langle X,Y\rangle_\tau
=
\tau(Y^*X)
=
\frac12\operatorname{Tr}(X^*Y).
$$

#### 3. 表現

GNS 表現は左乗法で定義されるので

$$
\pi_\tau(A)[X]=[AX].
$$

零空間が0だから類記号を外して

$$
\pi_\tau(A)X=AX.
$$

#### 4. 巡回性

$$
\pi_\tau(A)I=AI=A.
$$

従って

$$
\{\pi_\tau(A)I:A\in M_2(\mathbb C)\}
=
M_2(\mathbb C).
$$

よって $I$ は巡回です。
<!-- solution-end -->

### B4. GNS 一意性の等長写像

- Level: B

$\varphi$ を状態とし、$(\rho,K,\Omega)$ を

$$
\varphi(a)=\langle\Omega,\rho(a)\Omega\rangle
$$

で実現する巡回表現とする。

$$
U_0[a]=\rho(a)\Omega
$$

と置く。

1. $U_0$ が well-defined であることを示せ。
2. $U_0$ が内積を保存することを示せ。
3. 巡回性から、完備化後の延長 $U:H_\varphi\to K$ が unitary になることを示せ。

<!-- solution-start -->
### 詳細解答

#### 1. well-defined 性

$[a]=[b]$ なら

$$
a-b\in N_\varphi.
$$

従って

$$
\varphi((a-b)^*(a-b))=0.
$$

一方

$$
\begin{aligned}
\|\rho(a-b)\Omega\|^2
&=
\langle
\Omega,
\rho((a-b)^*(a-b))\Omega
\rangle\\
&=
\varphi((a-b)^*(a-b))\\
&=
0.
\end{aligned}
$$

従って

$$
\rho(a)\Omega=\rho(b)\Omega.
$$

よって $U_0$ は well-defined です。

#### 2. 内積保存

$$
\begin{aligned}
\langle U_0[a],U_0[b]\rangle
&=
\langle\rho(a)\Omega,\rho(b)\Omega\rangle\\
&=
\langle\Omega,\rho(a)^*\rho(b)\Omega\rangle\\
&=
\langle\Omega,\rho(a^*b)\Omega\rangle\\
&=
\varphi(a^*b)\\
&=
\langle[a],[b]\rangle_\varphi.
\end{aligned}
$$

従って $U_0$ は等長です。

#### 3. unitary 性

等長写像 $U_0$ は完備化へ一意に等長延長

$$
U:H_\varphi\to K
$$

を持ちます。

$\Omega$ は巡回なので

$$
\overline{\{\rho(a)\Omega:a\in A\}}=K.
$$

つまり $U_0$ の像は $K$ で稠密です。

一方、完備空間からの等長写像 $U$ の像は閉です。

従って $U(H_\varphi)$ は稠密かつ閉なので

$$
U(H_\varphi)=K.
$$

よって $U$ は全射等長写像、すなわち unitary です。
<!-- solution-end -->

## Level C

### C1. 混合状態の GNS 表現を具体的に作る

- Level: C

$A=M_2(\mathbb C)$ とし、$0<p<1$ に対して

$$
\varphi_p(X)
=
p\,e_1^*Xe_1
+
(1-p)e_2^*Xe_2
$$

と置く。

1. $\varphi_p$ が状態であることを示せ。
2. $N_{\varphi_p}=\{0\}$ を示せ。
3. 写像

$$
U:M_2(\mathbb C)\to\mathbb C^2\oplus\mathbb C^2,
$$

$$
U(X)
=
\bigl(
\sqrt p\,Xe_1,
\sqrt{1-p}\,Xe_2
\bigr)
$$

が GNS 内積を保存することを示せ。
4. $U$ が全射であることを示し、

$$
H_{\varphi_p}
\cong
\mathbb C^2\oplus\mathbb C^2
$$

を得よ。
5. この同一視の下で

$$
\pi_{\varphi_p}(A)
=
A\oplus A
$$

となることを示せ。
6. 巡回ベクトルが

$$
\Omega
=
\bigl(
\sqrt p\,e_1,
\sqrt{1-p}\,e_2
\bigr)
$$

に対応し、

$$
\varphi_p(A)
=
\langle\Omega,(A\oplus A)\Omega\rangle
$$

を直接確認せよ。

<!-- solution-start -->
### 詳細解答

#### 1. 状態であること

任意の $X\in M_2(\mathbb C)$ に対して

$$
\begin{aligned}
\varphi_p(X^*X)
&=
p\,e_1^*X^*Xe_1
+
(1-p)e_2^*X^*Xe_2\\
&=
p\|Xe_1\|^2
+
(1-p)\|Xe_2\|^2\\
&\ge0.
\end{aligned}
$$

従って正です。

また

$$
\begin{aligned}
\varphi_p(I)
&=
p\,e_1^*e_1
+
(1-p)e_2^*e_2\\
&=
p+(1-p)\\
&=
1.
\end{aligned}
$$

よって $\varphi_p$ は状態です。

#### 2. 零空間

$X\in N_{\varphi_p}$ なら

$$
p\|Xe_1\|^2
+
(1-p)\|Xe_2\|^2
=
0.
$$

$0<p<1$ なので両係数は正です。また各ノルム二乗も非負です。

従って

$$
Xe_1=0,
\qquad
Xe_2=0.
$$

$e_1,e_2$ は $\mathbb C^2$ の基底なので $X=0$ です。

したがって

$$
N_{\varphi_p}=\{0\}.
$$

#### 3. 内積保存

GNS 内積は

$$
\langle X,Y\rangle_{\varphi_p}
=
\varphi_p(X^*Y).
$$

従って

$$
\begin{aligned}
\langle X,Y\rangle_{\varphi_p}
&=
p\,e_1^*X^*Ye_1
+
(1-p)e_2^*X^*Ye_2\\
&=
p\,(Xe_1)^*(Ye_1)
+
(1-p)(Xe_2)^*(Ye_2).
\end{aligned}
$$

一方、直和 Hilbert 空間の内積では

$$
\begin{aligned}
\langle U(X),U(Y)\rangle
&=
(\sqrt p\,Xe_1)^*(\sqrt p\,Ye_1)\\
&\qquad+
(\sqrt{1-p}\,Xe_2)^*
(\sqrt{1-p}\,Ye_2)\\
&=
p\,(Xe_1)^*(Ye_1)
+
(1-p)(Xe_2)^*(Ye_2).
\end{aligned}
$$

従って

$$
\langle U(X),U(Y)\rangle
=
\langle X,Y\rangle_{\varphi_p}.
$$

よって $U$ は等長です。

#### 4. 全射性

任意の

$$
(u,v)\in\mathbb C^2\oplus\mathbb C^2
$$

を取ります。

$0<p<1$ なので

$$
\frac{u}{\sqrt p},
\qquad
\frac{v}{\sqrt{1-p}}
$$

が定義できます。

第一列を $u/\sqrt p$、第二列を $v/\sqrt{1-p}$ とする行列 $X$ を取れば

$$
Xe_1=\frac{u}{\sqrt p},
\qquad
Xe_2=\frac{v}{\sqrt{1-p}}.
$$

従って

$$
U(X)=(u,v).
$$

よって $U$ は全射です。

有限次元なので既に完備であり、

$$
H_{\varphi_p}
\cong
\mathbb C^2\oplus\mathbb C^2.
$$

#### 5. 表現

GNS 表現は左乗法なので

$$
\pi_{\varphi_p}(A)X=AX.
$$

$U$ を通すと

$$
\begin{aligned}
U(AX)
&=
\bigl(
\sqrt p\,AXe_1,
\sqrt{1-p}\,AXe_2
\bigr)\\
&=
(A\oplus A)
\bigl(
\sqrt p\,Xe_1,
\sqrt{1-p}\,Xe_2
\bigr)\\
&=
(A\oplus A)U(X).
\end{aligned}
$$

従って

$$
U\pi_{\varphi_p}(A)U^{-1}
=
A\oplus A.
$$

#### 6. 巡回ベクトルと状態の回収

GNS 巡回ベクトルは $[I]$ です。零空間が0なので $I$ 自身と同一視できます。

$$
\begin{aligned}
U(I)
&=
\bigl(
\sqrt p\,Ie_1,
\sqrt{1-p}\,Ie_2
\bigr)\\
&=
\bigl(
\sqrt p\,e_1,
\sqrt{1-p}\,e_2
\bigr)\\
&=
\Omega.
\end{aligned}
$$

最後に

$$
\begin{aligned}
\langle\Omega,(A\oplus A)\Omega\rangle
&=
p\,e_1^*Ae_1
+
(1-p)e_2^*Ae_2\\
&=
\varphi_p(A).
\end{aligned}
$$

従って GNS 表現から元の状態を正確に回収できました。

$p=1$ ならベクトル状態となり GNS 空間は $\mathbb C^2$ へ縮みます。一方 $0<p<1$ では二つの列方向を同時に見るため、GNS 空間は4次元になります。状態の違いが表現空間の大きさに実際に反映されています。
<!-- solution-end -->

---

## まとめ

本章では、$C^*$-環の中の元を「状態から観測する」構造を作りました。

まず正線形汎関数

$$
\varphi(x^*x)\ge0
$$

を導入し、正性だけから

$$
\varphi(a^*)=\overline{\varphi(a)}
$$

と Cauchy--Schwarz 型不等式

$$
|\varphi(b^*a)|^2
\le
\varphi(a^*a)\varphi(b^*b)
$$

を導きました。

さらに $C^*$-ノルムとの両立から

$$
\|\varphi\|=\varphi(1)
$$

が分かり、

$$
\varphi(1)=1
$$

を満たすものを状態としました。

状態から作る形式

$$
\langle a,b\rangle_\varphi
=
\varphi(a^*b)
$$

は一般には半内積なので、

$$
N_\varphi
=
\{a:\varphi(a^*a)=0\}
$$

を割ります。

Cauchy--Schwarz により $N_\varphi$ は線形部分空間になり、さらに $C^*$-ノルムの平方表示により左イデアルになります。そのため左乗法

$$
[a]\mapsto[xa]
$$

が商空間上で定義できます。

しかも

$$
\|\pi_\varphi(x)\|
\le
\|x\|
$$

なので完備化へ延長でき、

$$
\pi_\varphi:A\to B(H_\varphi)
$$

という単位的 *-表現が得られました。

巡回ベクトル

$$
\Omega_\varphi=[1]
$$

に対して

$$
\boxed{
\varphi(a)
=
\langle
\Omega_\varphi,
\pi_\varphi(a)\Omega_\varphi
\rangle
}
$$

となります。

これが GNS 構成です。

抽象的な状態を与えるだけで、その状態をベクトル状態として実現する Hilbert 空間と作用素表現が再構成されました。

次章では、OA4 の連続関数計算と本章の状態・表現をまとめ、正規作用素のスペクトル定理を $C^*$-環の視点から読み直します。
