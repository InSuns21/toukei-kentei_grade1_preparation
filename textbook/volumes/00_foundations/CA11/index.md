# CA11 標準複素解析 XI：Gamma 関数・反射公式・Stirling 公式

> **複素解析 II の特殊関数編 I**。CA10 では零点・極のデータから関数を構成した。本章では、その構成論が一つの具体的特殊関数にどう現れるかを見る。Euler 積分から始め、関数等式で有理型解析接続し、逆 Gamma 関数の Weierstrass 積を導く。そこから CA10 の正弦関数の Euler 積と比較して反射公式を証明し、最後に Wallis 積まで戻って Stirling 公式の定数 sqrt(2pi) を決定する。

<!-- definition-example-audit: strict -->

## 0. この章の主線

正則関数列の局所一様極限は [CA7](../CA7/index.md#thm-ca7-holomorphic-locally-uniform-limit)、Weierstrass の基本因子と正弦関数の Euler 積は [CA10](../CA10/index.md#def-ca10-elementary-factor) と [CA10 の Euler 積](../CA10/index.md#thm-ca10-euler-sine-product)を正本とする。

~~~text
Euler 積分
  ↓ 局所一様収束
右半平面で正則
  ↓ 部分積分
Gamma(z+1)=z Gamma(z)
  ↓
全平面への有理型解析接続
  ↓
Euler の極限公式
  ↓ CA10 の基本因子
1/Gamma の Weierstrass 積
  ↓ CA10 の sin(pi z) の Euler 積
Euler の反射公式
  ↓
半整数値・特殊値
  ↓ Wallis 積
Stirling 公式
  ↓
Legendre の倍角公式
~~~

Bohr--Mollerup の特徴付け、高次の漸近展開、Barnes G 関数、多重 Gamma 関数は本章の停止線より先に置く。

---

## 1. Euler 積分から Gamma 関数を作る

<a id="def-ca11-gamma-function"></a>
<!-- formal-statement-start -->
### 定義（Gamma 関数）

$\Re z>0$ に対して

$$
\Gamma(z)
=
\int_0^\infty t^{z-1}e^{-t}\,dt
$$

と定める。ただし $t>0$ では実対数を用いて

$$
t^{z-1}
=
\exp((z-1)\log t)
$$

とする。
<!-- formal-statement-end -->

<!-- definition-example-start: def-ca11-gamma-function -->
**定義の確認**。$z=1$ なら

$$
\Gamma(1)
=
\int_0^\infty e^{-t}\,dt
=
1.
$$

また $\Re z=\sigma>0$ なら、$0<t\le1$ では

$$
|t^{z-1}e^{-t}|
\le
t^{\sigma-1},
$$

$t\ge1$ では指数減衰 $e^{-t}$ が多項式増大を上回る。したがって積分は両端で収束する。
<!-- definition-example-end -->

<a id="thm-ca11-gamma-holomorphic"></a>
<!-- formal-statement-start -->
### 定理（Gamma 関数の右半平面での正則性）

Gamma 関数は半平面

$$
H=\{z\in\mathbb C:\Re z>0\}
$$

上で正則である。
<!-- formal-statement-end -->

<!-- proof-start -->
### 証明

コンパクト集合 $K\subset H$ を固定する。ある $0<\delta\le M$ が存在して

$$
\delta
\le
\Re z
\le
M
\qquad(z\in K)
$$

とできる。

$0<t\le1$ では

$$
|t^{z-1}e^{-t}|
\le
t^{\delta-1},
$$

$t\ge1$ では

$$
|t^{z-1}e^{-t}|
\le
t^{M-1}e^{-t}.
$$

右辺はいずれも対応する区間で可積分である。従って

$$
\Gamma_{\varepsilon,R}(z)
=
\int_\varepsilon^R t^{z-1}e^{-t}\,dt
$$

は $\varepsilon\downarrow0$, $R\uparrow\infty$ のとき $K$ 上一様に $\Gamma(z)$ へ収束する。

固定した $0<\varepsilon<R<\infty$ では integrand は $z$ の整関数であり、有限区間上の積分は Riemann 和の一様極限として正則である。よって $\Gamma_{\varepsilon,R}$ は正則である。

したがって [正則関数列の局所一様極限](../CA7/index.md#thm-ca7-holomorphic-locally-uniform-limit)により $\Gamma$ は $H$ 上正則である。$\square$
<!-- proof-end -->

局所一様収束を見る理由は、単に積分が各 $z$ で収束するだけでは「$z$ の正則関数になっている」とは言えないからである。CA7 の道具がここで初めて特殊関数の構成へ直接使われる。

---

## 2. 関数等式が階乗を埋め込む

<a id="thm-ca11-functional-equation"></a>
<!-- formal-statement-start -->
### 定理（Gamma 関数の関数等式）

$\Re z>0$ で

$$
\boxed{
\Gamma(z+1)=z\Gamma(z)
}
$$

が成り立つ。
<!-- formal-statement-end -->

<!-- proof-start -->
### 証明

部分積分により

$$
\Gamma(z+1)
=
\int_0^\infty t^z e^{-t}\,dt
=
\left[-t^z e^{-t}\right]_0^\infty
+
z\int_0^\infty t^{z-1}e^{-t}\,dt.
$$

$\Re z>0$ なので $t\downarrow0$ で $t^z\to0$、また $t\uparrow\infty$ では指数関数が任意の冪より速く減衰するため $t^ze^{-t}\to0$ である。従って境界項は0となり、

$$
\Gamma(z+1)=z\Gamma(z).
$$

$\square$
<!-- proof-end -->

$\Gamma(1)=1$ と合わせると、正整数 $n$ に対して

$$
\Gamma(n+1)
=
n\Gamma(n)
=
\cdots
=
n!
$$

を得る。Gamma 関数は階乗を複素変数へ延長するが、「階乗の補間」という性質だけで一意になるわけではない。本章では正則性と関数等式を軸に扱う。

---

## 3. 関数等式で左半平面へ進む

<a id="thm-ca11-meromorphic-continuation"></a>
<!-- formal-statement-start -->
### 定理（Gamma 関数の有理型解析接続と極）

Gamma 関数は全平面 $\mathbb C$ へ有理型に解析接続される。その極は

$$
0,-1,-2,\ldots
$$

の単純極だけであり、

$$
\boxed{
\operatorname{Res}(\Gamma,-m)
=
\frac{(-1)^m}{m!}
}
\qquad(m=0,1,2,\ldots)
$$

である。
<!-- formal-statement-end -->

<!-- proof-start -->
### 証明

正整数 $N$ に対して $\Re z>-N$ かつ

$$
z\notin\{0,-1,\ldots,-N+1\}
$$

なら

$$
\Gamma_N(z)
=
\frac{\Gamma(z+N)}
{z(z+1)\cdots(z+N-1)}
$$

と置く。分子は $\Re(z+N)>0$ で定義済みである。

関数等式を $N$ 回使うと、もとの右半平面では

$$
\Gamma(z+N)
=
z(z+1)\cdots(z+N-1)\Gamma(z)
$$

だから $\Gamma_N$ は元の Gamma 関数と一致する。また $N$ と $N+1$ の定義も重なりで一致するため、これらは貼り合わさって全平面上の有理型関数を与える。

$m\ge0$ を固定し $N=m+1$ とする。$z=-m$ の近くで

$$
\Gamma(z)
=
\frac{\Gamma(z+m+1)}
{z(z+1)\cdots(z+m)}.
$$

分子は $z=-m$ で $\Gamma(1)=1$ となる。分母から $(z+m)$ を除いた値は

$$
(-m)(-m+1)\cdots(-1)
=
(-1)^m m!.
$$

従って

$$
\lim_{z\to-m}
(z+m)\Gamma(z)
=
\frac1{(-1)^m m!}
=
\frac{(-1)^m}{m!}.
$$

これは非零なので $z=-m$ は単純極であり、留数は上式で与えられる。ほかの点では十分大きい $N$ を選べば分母が消えないため正則である。$\square$
<!-- proof-end -->

**直接例**。最初の三つは

$$
\operatorname{Res}(\Gamma,0)=1,
\qquad
\operatorname{Res}(\Gamma,-1)=-1,
\qquad
\operatorname{Res}(\Gamma,-2)=\frac12.
$$

極の位置だけでなく符号が交互に変わることまで関数等式から決まる。

---

## 4. Euler の極限公式から積表示を作る

<a id="def-ca11-euler-mascheroni"></a>
<!-- formal-statement-start -->
### 定義（Euler--Mascheroni 定数）

調和数

$$
H_n
=
1+\frac12+\cdots+\frac1n
$$

に対し、

$$
\gamma
=
\lim_{n\to\infty}(H_n-\log n)
$$

を Euler--Mascheroni 定数という。
<!-- formal-statement-end -->

<!-- definition-example-start: def-ca11-euler-mascheroni -->
**定義の確認**。数列 $\gamma_n=H_n-\log n$ は

$$
\gamma_{n+1}-\gamma_n
=
\frac1{n+1}
-
\log\left(1+\frac1n\right)
<0
$$

で減少する。一方

$$
H_n
>
\int_1^{n+1}\frac{dx}{x}
=
\log(n+1)
$$

なので

$$
\gamma_n>\log(1+1/n)>0.
$$

従って $\gamma_n$ は正の下限を持つ単調減少列であり、極限 $\gamma$ は実際に存在する。
<!-- definition-example-end -->

<a id="thm-ca11-euler-limit"></a>
<!-- formal-statement-start -->
### 定理（Euler の極限公式）

$\Re z>0$ に対して

$$
\boxed{
\Gamma(z)
=
\lim_{n\to\infty}
\frac{n!\,n^z}
{z(z+1)\cdots(z+n)}
}
$$

が成り立つ。収束は右半平面の各コンパクト集合上で一様である。
<!-- formal-statement-end -->

<!-- proof-start -->
### 証明

まず

$$
B_n(z)
=
\int_0^1 t^{z-1}(1-t)^n\,dt
$$

と置く。部分積分を繰り返すと

$$
B_n(z)
=
\frac{n!}
{z(z+1)\cdots(z+n)}.
$$

一方 $u=nt$ と置けば

$$
n^zB_n(z)
=
\int_0^n
u^{z-1}
\left(1-\frac un\right)^n
\,du.
$$

固定した $u\ge0$ に対して

$$
\left(1-\frac un\right)^n
\to
e^{-u}
$$

である。ただし $u>n$ では integrand を0とみなす。

コンパクト集合 $K\subset\{\Re z>0\}$ を取り、

$$
0<\delta\le\Re z\le M
$$

とする。$0\le u\le n$ では

$$
\left(1-\frac un\right)^n
\le
e^{-u}.
$$

従って $0<u\le1$ では絶対値は $u^{\delta-1}$ 以下、$u\ge1$ では $u^{M-1}e^{-u}$ 以下である。両者は可積分だから、有限区間上の一様収束と両端の一様な tail 評価を組み合わせれば、$K$ 上一様に

$$
n^zB_n(z)
\to
\int_0^\infty u^{z-1}e^{-u}\,du
=
\Gamma(z).
$$

$B_n$ の式を代入すれば主張を得る。$\square$
<!-- proof-end -->

<a id="thm-ca11-reciprocal-product"></a>
<!-- formal-statement-start -->
### 定理（逆 Gamma 関数の Weierstrass 積）

全ての $z\in\mathbb C$ に対して

$$
\boxed{
\frac1{\Gamma(z)}
=
z e^{\gamma z}
\prod_{n=1}^{\infty}
\left(1+\frac zn\right)e^{-z/n}
}
$$

が成り立つ。右辺は全平面で局所一様収束する整関数である。

その零点は

$$
0,-1,-2,\ldots
$$

だけで、全て単純である。従って Gamma 関数は有限点で零点を持たない。
<!-- formal-statement-end -->

<!-- proof-start -->
### 証明

[Euler の極限公式](#thm-ca11-euler-limit)を書き換えると

$$
\frac1{\Gamma(z)}
=
\lim_{n\to\infty}
z
\prod_{k=1}^{n}
\left(1+\frac zk\right)
n^{-z}.
$$

ここで

$$
n^{-z}
=
e^{-z\log n}
=
e^{z(H_n-\log n)}
e^{-zH_n}.
$$

従って有限積は

$$
z e^{z(H_n-\log n)}
\prod_{k=1}^{n}
\left(1+\frac zk\right)e^{-z/k}.
$$

$H_n-\log n\to\gamma$ なので指数因子は $e^{\gamma z}$ へ収束する。

さらに

$$
\left(1+\frac zk\right)e^{-z/k}
=
E_1\left(-\frac zk\right),
$$

ここで $E_1$ は [CA10 の Weierstrass 基本因子](../CA10/index.md#def-ca10-elementary-factor)である。コンパクト集合 $|z|\le R$ 上では大きい $k$ に対して

$$
\left|
\log E_1(-z/k)
\right|
\le
2\frac{R^2}{k^2}.
$$

従って [CA10 の基本因子評価](../CA10/index.md#lem-ca10-elementary-factor-estimate)により積は全平面で局所一様収束し、整関数を定める。

右半平面では [Euler の極限公式](#thm-ca11-euler-limit)からこの整関数は $1/\Gamma(z)$ に一致する。よって有理型解析接続後も恒等的に逆 Gamma 関数を与える。

先頭因子 $z$ が $0$ に単純零点を作り、$k$ 番目の因子 $1+z/k$ が $z=-k$ に単純零点を作る。指数因子は零点を持たず、CA10 の無限積の非消滅性から他の零点は生じない。したがって零点は非正整数だけである。

もし Gamma 関数が有限点 $z_0$ で零点を持てば、$1/\Gamma$ は $z_0$ で極を持つはずだが、右辺は整関数である。従って Gamma 関数は零点を持たない。$\square$
<!-- proof-end -->

<a id="cor-ca11-gamma-zero-free"></a>
<!-- formal-statement-start -->
### 系（Gamma 関数の零点不存在）

有理型解析接続された Gamma 関数は、有限複素平面上に零点を持たない。
<!-- formal-statement-end -->

<!-- proof-start -->
### 証明

[逆 Gamma 関数の Weierstrass 積](#thm-ca11-reciprocal-product)により $1/\Gamma$ は全平面で整関数である。Gamma 関数が有限点で零点を持てば、その逆数はその点に極を持つので矛盾する。$\square$
<!-- proof-end -->

ここで CA10 の構成論が単なる一般論ではなくなる。Gamma 関数の極集合は、その逆数では **指定された零点集合**になり、基本因子が収束を担当する。

---

## 5. 正弦関数と掛け合わせると反射公式が出る

<a id="thm-ca11-reflection"></a>
<!-- formal-statement-start -->
### 定理（Euler の反射公式）

$z\notin\mathbb Z$ に対して

$$
\boxed{
\Gamma(z)\Gamma(1-z)
=
\frac{\pi}{\sin\pi z}
}
$$

が成り立つ。両辺は有理型関数として全平面で同一である。
<!-- formal-statement-end -->

<!-- proof-start -->
### 証明

逆 Gamma 関数の積表示を $z$ と $-z$ に適用して掛けると

$$
\frac1{\Gamma(z)\Gamma(-z)}
=
-z^2
\prod_{n=1}^{\infty}
\left(1-\frac{z^2}{n^2}\right).
$$

[CA10 の正弦関数の Euler 積](../CA10/index.md#thm-ca10-euler-sine-product)

$$
\frac{\sin\pi z}{\pi z}
=
\prod_{n=1}^{\infty}
\left(1-\frac{z^2}{n^2}\right)
$$

を代入して

$$
\frac1{\Gamma(z)\Gamma(-z)}
=
-\frac{z\sin\pi z}{\pi}.
$$

一方、関数等式を $-z$ に適用すると

$$
\Gamma(1-z)
=
-z\Gamma(-z).
$$

従って

$$
\frac1{\Gamma(z)\Gamma(1-z)}
=
-\frac1z
\frac1{\Gamma(z)\Gamma(-z)}
=
\frac{\sin\pi z}{\pi}.
$$

$z\notin\mathbb Z$ では両辺を逆数にでき、

$$
\Gamma(z)\Gamma(1-z)
=
\frac{\pi}{\sin\pi z}.
$$

$\square$
<!-- proof-end -->

### 半整数値

$z=1/2$ を代入すると

$$
\Gamma(1/2)^2
=
\pi.
$$

Euler 積分から $\Gamma(1/2)>0$ なので

$$
\boxed{
\Gamma(1/2)=\sqrt\pi
}
$$

である。さらに関数等式から

$$
\Gamma\left(n+\frac12\right)
=
\frac{(2n)!}{4^n n!}\sqrt\pi
\qquad(n=0,1,2,\ldots)
$$

を得る。

**直接例**。$z=1/3$ なら

$$
\Gamma(1/3)\Gamma(2/3)
=
\frac{\pi}{\sin(\pi/3)}
=
\frac{2\pi}{\sqrt3}.
$$

特殊値を個別に暗記するのではなく、反射公式へ代入して再構成できる。

---

## 6. Stirling 公式の定数まで決める

<a id="thm-ca11-stirling"></a>
<!-- formal-statement-start -->
### 定理（Stirling 公式）

$n\to\infty$ に対して

$$
\boxed{
n!
\sim
\sqrt{2\pi n}
\left(\frac ne\right)^n
}
$$

が成り立つ。

さらに正の実数 $x\to+\infty$ に対して

$$
\boxed{
\Gamma(x)
\sim
\sqrt{2\pi}\,
x^{x-\frac12}e^{-x}
}
$$

が成り立つ。
<!-- formal-statement-end -->

<!-- proof-start -->
### 証明

#### 第1段階：未定定数を持つ形まで出す

$$
S_n
=
\log n!
-
\left(n+\frac12\right)\log n
+
n
$$

と置く。差を取ると

$$
S_{n+1}-S_n
=
1
-
\left(n+\frac12\right)
\log\left(1+\frac1n\right).
$$

$0<x\le1$ では交代級数から

$$
x-\frac{x^2}{2}
\le
\log(1+x)
\le
x-\frac{x^2}{2}+\frac{x^3}{3}.
$$

$x=1/n$ とする。$n=1/x$ だから、下側の評価から

$$
\left(n+\frac12\right)
\left(x-\frac{x^2}{2}\right)
=
\left(\frac1x+\frac12\right)
\left(x-\frac{x^2}{2}\right)
=
1-\frac{x^2}{4},
$$

従って

$$
S_{n+1}-S_n
\le
\frac{x^2}{4}.
$$

上側の評価からは

$$
\left(\frac1x+\frac12\right)
\left(x-\frac{x^2}{2}+\frac{x^3}{3}\right)
=
1+\frac{x^2}{12}+\frac{x^3}{6},
$$

なので

$$
S_{n+1}-S_n
\ge
-\frac{x^2}{12}-\frac{x^3}{6}
\ge
-\frac{x^2}{4}.
$$

ここで $0<x\le1$ を使った。従って

$$
\left|S_{n+1}-S_n\right|
\le
\frac{x^2}{4}
=
\frac1{4n^2}.
$$

よって $\sum |S_{n+1}-S_n|$ は収束し、$S_n$ はある実数 $C$ に収束する。よって

$$
n!
=
e^{C+o(1)}
n^{n+\frac12}e^{-n}.
$$

残る仕事は $e^C$ を決めることである。

#### 第2段階：Wallis 積から定数を決める

$$
I_m
=
\int_0^{\pi/2}\sin^m\theta\,d\theta
$$

と置く。部分積分により

$$
I_m
=
\frac{m-1}{m}I_{m-2}
\qquad(m\ge2).
$$

従って

$$
I_{2n}
=
\frac{\pi}{2}
\frac{(2n)!}{4^n(n!)^2},
$$

$$
I_{2n+1}
=
\frac{4^n(n!)^2}{(2n+1)!}.
$$

$0\le\sin\theta\le1$ なので

$$
I_{2n+1}
\le
I_{2n}
\le
I_{2n-1}.
$$

また漸化式から

$$
I_{2n+1}
=
\frac{2n}{2n+1}I_{2n-1}.
$$

したがって

$$
\frac{2n}{2n+1}
\le
\frac{I_{2n+1}}{I_{2n}}
\le
1,
$$

ゆえに

$$
\frac{I_{2n+1}}{I_{2n}}
\to1.
$$

一方、上の明示式を掛けると

$$
I_{2n}I_{2n+1}
=
\frac{\pi}{2(2n+1)}.
$$

従って

$$
I_{2n}
\sim
\frac{\sqrt\pi}{2\sqrt n}.
$$

よって

$$
\frac1{4^n}\binom{2n}{n}
=
\frac{2I_{2n}}{\pi}
\sim
\frac1{\sqrt{\pi n}}.
$$

他方、未定定数 $A=e^C$ を用いた階乗漸近式から

$$
\binom{2n}{n}
=
\frac{(2n)!}{(n!)^2}
\sim
4^n
\frac{\sqrt2}{A\sqrt n}.
$$

二つを比較すると

$$
\frac{\sqrt2}{A}
=
\frac1{\sqrt\pi},
$$

従って

$$
A=\sqrt{2\pi}.
$$

これで整数版

$$
n!
\sim
\sqrt{2\pi n}(n/e)^n
$$

が得られた。

#### 第3段階：正の実軸へ拡張する

[Euler の極限公式](#thm-ca11-euler-limit)を $z=1+a$ に適用する。$0\le a\le1$ はコンパクト集合なので、その収束は $a$ について一様である。極限公式は

$$
\Gamma(1+a)
=
\lim_{N\to\infty}
\frac{N!\,N^{1+a}}
{(1+a)(2+a)\cdots(N+1+a)}
$$

である。関数等式を $N+1$ 回使えば

$$
(1+a)(2+a)\cdots(N+1+a)
=
\frac{\Gamma(N+2+a)}{\Gamma(1+a)}.
$$

したがって $\Gamma(1+a)\ne0$ を用いて両辺から $\Gamma(1+a)$ を消すと

$$
\frac{\Gamma(N+2+a)}
{N!\,N^{1+a}}
\to1
$$

を $0\le a\le1$ で一様に得る。$N=n-1$ と置けば

$$
\frac{\Gamma(n+1+a)}
{(n-1)!\,(n-1)^{1+a}}
\to1.
$$

さらに

$$
\frac{(n-1)!\,(n-1)^{1+a}}
{n!\,n^a}
=
\left(1-\frac1n\right)^{1+a}
\to1
$$

も $0\le a\le1$ で一様なので、

$$
\boxed{
\frac{\Gamma(n+1+a)}
{n!\,n^a}
\to1
}
$$

が一様に従う。

任意の大きい $x>0$ を

$$
x=n+1+a,
\qquad
0\le a<1
$$

と書く。すると

$$
\Gamma(x)
\sim
n!\,n^a
\sim
\sqrt{2\pi}\,
n^{n+a+\frac12}e^{-n}.
$$

さらに

$$
\frac{
x^{x-\frac12}e^{-x}
}{
n^{n+a+\frac12}e^{-n}
}
=
\left(1+\frac{1+a}{n}\right)^{n+a+\frac12}
e^{-(1+a)}
\to1
$$

であり、この収束も $0\le a<1$ で一様である。従って

$$
\Gamma(x)
\sim
\sqrt{2\pi}\,
x^{x-\frac12}e^{-x}.
$$

$\square$
<!-- proof-end -->

### 複素 sector 版の適用範囲

複素変数では、任意の $\delta>0$ に対して

$$
|\arg z|
\le
\pi-\delta
$$

という負の実軸から離れた閉 sector で、$|z|\to\infty$ のとき

$$
\Gamma(z)
=
\sqrt{2\pi}\,
z^{z-\frac12}e^{-z}
\left(
1+O_\delta\left(\frac1{|z|}\right)
\right)
$$

という強化版が成り立つ。ここで

$$
z^{z-\frac12}
=
\exp\left(
\left(z-\frac12\right)\log z
\right)
$$

とし、$\log z$ にはこの sector 上で主値に一致する正則な対数分枝を使う。

本章で核心証明したのは正の実軸上の形である。sector 版の完全証明には Binet 表示または Euler--Maclaurin 展開を追加で準備する必要があるため、適用範囲だけを明示し、高次漸近展開とともに停止線の先へ送る。

---

## 7. Stirling から Legendre の倍角公式を決める

<a id="thm-ca11-duplication"></a>
<!-- formal-statement-start -->
### 定理（Legendre の倍角公式）

全ての $z$ について有理型恒等式として

$$
\boxed{
\Gamma(z)
\Gamma\left(z+\frac12\right)
=
2^{1-2z}\sqrt\pi\,
\Gamma(2z)
}
$$

が成り立つ。
<!-- formal-statement-end -->

<!-- proof-start -->
### 証明

まず $\Re z>0$ とする。

$$
R(z)
=
\frac{
\Gamma(z)\Gamma(z+\frac12)
}{
2^{1-2z}\sqrt\pi\,\Gamma(2z)
}
$$

と置く。右半平面では Gamma 関数に極も零点もないので $R$ は正則である。

関数等式を用いると

$$
R(z+1)
=
R(z).
$$

実際、分子に増える因子は

$$
z\left(z+\frac12\right),
$$

分母に増える因子は

$$
\frac14(2z)(2z+1)
=
z\left(z+\frac12\right)
$$

で完全に相殺する。

正の実数 $x\to+\infty$ では [Stirling 公式](#thm-ca11-stirling)を三つの Gamma 因子へ適用すると

$$
R(x)\to1.
$$

任意の $x>0$ と整数 $n\ge1$ に対して周期性から

$$
R(x)=R(x+n).
$$

$n\to\infty$ とすれば右辺は1へ収束するため $R(x)=1$ である。従って正の実軸上で恒等式が成り立つ。

両辺は右半平面で正則であり、正の実軸は右半平面内に集積点を持つから、[恒等定理](../CA3/index.md#thm-ca3-isolated-zeros-identity)により右半平面全体で成立する。さらに両辺の有理型解析接続により全平面で同一である。$\square$
<!-- proof-end -->

**確認**。$z=1/2$ とすると

$$
\Gamma(1/2)\Gamma(1)
=
2^0\sqrt\pi\,\Gamma(1)
$$

となり、$\Gamma(1/2)=\sqrt\pi$ と整合する。

---

## 8. Beta 関数は二つの Gamma を一つへ束ねる

<a id="def-ca11-beta-function"></a>
<!-- formal-statement-start -->
### 定義（Beta 関数）

$\Re z>0$, $\Re w>0$ に対して

$$
B(z,w)
=
\int_0^1
t^{z-1}(1-t)^{w-1}\,dt
$$

を Beta 関数という。
<!-- formal-statement-end -->

<!-- definition-example-start: def-ca11-beta-function -->
**定義の確認**。$z=w=1$ なら

$$
B(1,1)
=
\int_0^1 1\,dt
=
1.
$$

両端ではそれぞれ $t^{\Re z-1}$ と $(1-t)^{\Re w-1}$ で支配されるため、仮定 $\Re z,\Re w>0$ が収束条件になっている。
<!-- definition-example-end -->

<a id="thm-ca11-beta-gamma"></a>
<!-- formal-statement-start -->
### 定理（Beta--Gamma 関係式）

$\Re z>0$, $\Re w>0$ で

$$
\boxed{
B(z,w)
=
\frac{\Gamma(z)\Gamma(w)}
{\Gamma(z+w)}
}
$$

が成り立つ。
<!-- formal-statement-end -->

<!-- proof-start -->
### 証明

この補助節では、[Fubini の定理](../F0_00D2C_積測度_Tonelli_Fubini/index.md#thm-f0-00d2c-02)と [多重積分の変数変換定理](../RA7/index.md#thm-ra7-change-of-variables)を使う。CA11 の主線そのものには必要ないので、これらを未修なら本節だけ後回しにしてよい。

まず
$$
\left|
x^{z-1}y^{w-1}e^{-(x+y)}
\right|
=
x^{\Re z-1}y^{\Re w-1}e^{-(x+y)}
$$
であり、その絶対値の二重積分は
$$
\Gamma(\Re z)\Gamma(\Re w)<\infty
$$
である。従って [Fubini の定理](../F0_00D2C_積測度_Tonelli_Fubini/index.md#thm-f0-00d2c-02)を適用でき、

$$
\Gamma(z)\Gamma(w)
=
\int_0^\infty
\int_0^\infty
x^{z-1}y^{w-1}e^{-(x+y)}
\,dx\,dy
$$

と書ける。

ここで

$$
r=x+y,
\qquad
t=\frac{x}{x+y}
$$

と置く。$(r,t)$ から $(x,y)$ へ戻す式は

$$
x=rt,
\qquad
y=r(1-t),
$$

領域は $r>0$, $0<t<1$ であり、Jacobian の絶対値は $r$ である。[多重積分の変数変換定理](../RA7/index.md#thm-ra7-change-of-variables)をこの写像に適用すると

$$
\Gamma(z)\Gamma(w)
=
\int_0^\infty
r^{z+w-1}e^{-r}\,dr
\int_0^1
t^{z-1}(1-t)^{w-1}\,dt.
$$

すなわち

$$
\Gamma(z)\Gamma(w)
=
\Gamma(z+w)B(z,w).
$$

右半平面では Gamma 関数は零点を持たないから $\Gamma(z+w)$ で割ることができ、主張を得る。$\square$
<!-- proof-end -->

この節だけは二重積分の順序交換と変数変換を使う。主線の反射公式・Stirling・倍角公式には依存せず、CA12 もこの補助節を prerequisite にしない。

**直接例**。$z=w=1/2$ とすると

$$
B(1/2,1/2)
=
\frac{\Gamma(1/2)^2}{\Gamma(1)}
=
\pi.
$$

一方、定義で $t=\sin^2\theta$ と置いても同じ値が得られる。

---

## 9. 何が一つにつながったか

本章では同じ Gamma 関数を三つの視点から見た。

- **積分**：右半平面で正則な関数として構成する。
- **関数等式**：左半平面へ有理型解析接続し、極と留数を決める。
- **無限積**：逆 Gamma 関数を整関数として構成し、零点構造を読む。

特に

$$
\frac1{\Gamma(z)}
=
z e^{\gamma z}
\prod_{n=1}^{\infty}
E_1(-z/n)
$$

と

$$
\frac{\sin\pi z}{\pi z}
=
\prod_{n=1}^{\infty}
\left(1-\frac{z^2}{n^2}\right)
$$

を掛け合わせるだけで反射公式が出る。CA10 の「零点から関数を作る」理論が、特殊関数の恒等式を生むところまで到達した。

---

## 10. 演習

### Level A

<a id="ex-ca11-a1"></a>
#### CA11-A01 関数等式と階乗
- Level: A

$\Gamma(1)=1$ と関数等式だけから

$$
\Gamma(n+1)=n!
$$

を示せ。

<a id="ex-ca11-a2"></a>
#### CA11-A02 極と留数
- Level: A

$m\ge0$ に対して

$$
\operatorname{Res}(\Gamma,-m)
=
\frac{(-1)^m}{m!}
$$

を関数等式から導け。

<a id="ex-ca11-a3"></a>
#### CA11-A03 逆 Gamma 積の特殊化
- Level: A

逆 Gamma 関数の積表示へ $z=1$ を代入して

$$
1
=
e^\gamma
\prod_{n=1}^{\infty}
\left(1+\frac1n\right)e^{-1/n}
$$

を示せ。

<a id="ex-ca11-a4"></a>
#### CA11-A04 反射公式の特殊値
- Level: A

反射公式から

$$
\Gamma(1/3)\Gamma(2/3)
=
\frac{2\pi}{\sqrt3}
$$

を導け。

### Level B

<a id="ex-ca11-b1"></a>
#### CA11-B01 積表示から反射公式を再構成
- Level: B

$1/\Gamma(z)$ と $1/\Gamma(-z)$ の積を取り、CA10 の正弦関数の Euler 積を使って反射公式を最初から導け。

<a id="ex-ca11-b2"></a>
#### CA11-B02 Legendre の倍角公式
- Level: B

$$
R(z)
=
\frac{
\Gamma(z)\Gamma(z+1/2)
}{
2^{1-2z}\sqrt\pi\,\Gamma(2z)
}
$$

と置き、

1. $R(z+1)=R(z)$、
2. $x\to+\infty$ で $R(x)\to1$、
3. [恒等定理](../CA3/index.md#thm-ca3-isolated-zeros-identity)

を用いて $R\equiv1$ を示せ。

<a id="ex-ca11-b3"></a>
#### CA11-B03 Beta--Gamma 関係式
- Level: B

二重積分で

$$
\Gamma(z)\Gamma(w)
$$

を表し、

$$
x=rt,
\qquad
y=r(1-t)
$$

と変数変換して

$$
B(z,w)
=
\frac{\Gamma(z)\Gamma(w)}{\Gamma(z+w)}
$$

を導け。収束条件も確認せよ。

### Level C

<a id="ex-ca11-c1"></a>
#### CA11-C01 Stirling 公式を定数まで再構成
- Level: C

$$
S_n
=
\log n!
-
\left(n+\frac12\right)\log n
+
n
$$

と

$$
I_m
=
\int_0^{\pi/2}\sin^m\theta\,d\theta
$$

を用いて、

1. $S_n$ が収束すること、
2. $\binom{2n}{n}/4^n\sim1/\sqrt{\pi n}$、
3. 未定定数が $\sqrt{2\pi}$ であること

を順に示し、

$$
n!
\sim
\sqrt{2\pi n}(n/e)^n
$$

を導け。

---

## 11. 詳細解答

### A1 解答

関数等式は

$$
\Gamma(z+1)=z\Gamma(z)
$$

である。$z=n,n-1,\ldots,1$ と順に使うと

$$
\Gamma(n+1)
=
n\Gamma(n)
=
n(n-1)\Gamma(n-1)
=
\cdots
=
n!\Gamma(1).
$$

$\Gamma(1)=1$ だから

$$
\Gamma(n+1)=n!.
$$

### A2 解答

$m\ge0$ とする。関数等式を $m+1$ 回使えば、$z=-m$ の近くで

$$
\Gamma(z)
=
\frac{\Gamma(z+m+1)}
{z(z+1)\cdots(z+m)}.
$$

従って

$$
(z+m)\Gamma(z)
=
\frac{\Gamma(z+m+1)}
{z(z+1)\cdots(z+m-1)}.
$$

$z\to-m$ とすると分子は $\Gamma(1)=1$、分母は

$$
(-m)(-m+1)\cdots(-1)
=
(-1)^m m!
$$

へ収束する。よって

$$
\operatorname{Res}(\Gamma,-m)
=
\lim_{z\to-m}(z+m)\Gamma(z)
=
\frac{(-1)^m}{m!}.
$$

### A3 解答

逆 Gamma 関数の積表示

$$
\frac1{\Gamma(z)}
=
z e^{\gamma z}
\prod_{n=1}^{\infty}
\left(1+\frac zn\right)e^{-z/n}
$$

へ $z=1$ を代入する。$\Gamma(1)=1$ なので左辺は1であり、

$$
1
=
e^\gamma
\prod_{n=1}^{\infty}
\left(1+\frac1n\right)e^{-1/n}
$$

を得る。

有限積で見ると

$$
\prod_{n=1}^{N}\left(1+\frac1n\right)
=
N+1
$$

だから右辺の第 $N$ 部分積は

$$
e^\gamma (N+1)e^{-H_N}.
$$

$H_N-\log N\to\gamma$ と $(N+1)/N\to1$ から、確かに1へ収束することも確認できる。

### A4 解答

反射公式へ $z=1/3$ を代入すると

$$
\Gamma(1/3)\Gamma(2/3)
=
\frac{\pi}{\sin(\pi/3)}.
$$

$\sin(\pi/3)=\sqrt3/2$ だから

$$
\Gamma(1/3)\Gamma(2/3)
=
\frac{2\pi}{\sqrt3}.
$$

### B1 解答

まず

$$
\frac1{\Gamma(z)}
=
z e^{\gamma z}
\prod_{n=1}^{\infty}
\left(1+\frac zn\right)e^{-z/n},
$$

$$
\frac1{\Gamma(-z)}
=
-z e^{-\gamma z}
\prod_{n=1}^{\infty}
\left(1-\frac zn\right)e^{z/n}.
$$

を掛ける。指数因子は完全に相殺し、

$$
\frac1{\Gamma(z)\Gamma(-z)}
=
-z^2
\prod_{n=1}^{\infty}
\left(1-\frac{z^2}{n^2}\right).
$$

CA10 の Euler 積から

$$
\prod_{n=1}^{\infty}
\left(1-\frac{z^2}{n^2}\right)
=
\frac{\sin\pi z}{\pi z}.
$$

従って

$$
\frac1{\Gamma(z)\Gamma(-z)}
=
-\frac{z\sin\pi z}{\pi}.
$$

関数等式

$$
\Gamma(1-z)
=
-z\Gamma(-z)
$$

を用いると

$$
\frac1{\Gamma(z)\Gamma(1-z)}
=
-\frac1z
\frac1{\Gamma(z)\Gamma(-z)}
=
\frac{\sin\pi z}{\pi}.
$$

よって $z\notin\mathbb Z$ で

$$
\Gamma(z)\Gamma(1-z)
=
\frac{\pi}{\sin\pi z}.
$$

### B2 解答

右半平面で

$$
R(z)
=
\frac{
\Gamma(z)\Gamma(z+1/2)
}{
2^{1-2z}\sqrt\pi\,\Gamma(2z)
}
$$

とする。

まず関数等式より

$$
\Gamma(z+1)=z\Gamma(z),
$$

$$
\Gamma(z+3/2)
=
\left(z+\frac12\right)
\Gamma(z+1/2),
$$

$$
\Gamma(2z+2)
=
(2z+1)(2z)\Gamma(2z).
$$

また

$$
2^{1-2(z+1)}
=
\frac14\,2^{1-2z}.
$$

従って $R(z+1)$ で新たに現れる因子は分子・分母とも

$$
z\left(z+\frac12\right)
$$

であり、相殺して

$$
R(z+1)=R(z).
$$

次に $x\to+\infty$ で [Stirling 公式](#thm-ca11-stirling)を

$$
\Gamma(x),\quad
\Gamma(x+1/2),\quad
\Gamma(2x)
$$

へ適用すると、冪・指数・定数が全て相殺し

$$
R(x)\to1.
$$

固定した $x>0$ に対し周期性から

$$
R(x)=R(x+n).
$$

$n\to\infty$ として $R(x)=1$。従って正の実軸上で $R=1$ である。

$R$ は右半平面で正則で、正の実軸は右半平面内に集積点を持つため[恒等定理](../CA3/index.md#thm-ca3-isolated-zeros-identity)から

$$
R(z)\equiv1
$$

となる。すなわち

$$
\Gamma(z)\Gamma(z+1/2)
=
2^{1-2z}\sqrt\pi\,\Gamma(2z).
$$

### B3 解答

$\Re z>0$, $\Re w>0$ なら

$$
\int_0^\infty x^{\Re z-1}e^{-x}\,dx<\infty,
\qquad
\int_0^\infty y^{\Re w-1}e^{-y}\,dy<\infty.
$$

従って積の二重積分は絶対収束する。

$$
\Gamma(z)\Gamma(w)
=
\int_0^\infty\int_0^\infty
x^{z-1}y^{w-1}e^{-(x+y)}
\,dx\,dy.
$$

変数変換

$$
x=rt,\qquad y=r(1-t)
$$

では

$$
r=x+y>0,\qquad 0<t<1.
$$

Jacobian は

$$
\left|
\det
\begin{pmatrix}
t&r\\
1-t&-r
\end{pmatrix}
\right|
=
r.
$$

よって

$$
x^{z-1}y^{w-1}dx\,dy
=
r^{z+w-2}
t^{z-1}(1-t)^{w-1}
\cdot r\,dr\,dt.
$$

したがって

$$
\Gamma(z)\Gamma(w)
=
\left(
\int_0^\infty r^{z+w-1}e^{-r}\,dr
\right)
\left(
\int_0^1 t^{z-1}(1-t)^{w-1}\,dt
\right).
$$

第一因子は $\Gamma(z+w)$、第二因子は $B(z,w)$ だから

$$
\Gamma(z)\Gamma(w)
=
\Gamma(z+w)B(z,w).
$$

Gamma 関数は零点を持たないので

$$
B(z,w)
=
\frac{\Gamma(z)\Gamma(w)}{\Gamma(z+w)}.
$$

### C1 解答

まず

$$
S_n
=
\log n!
-
\left(n+\frac12\right)\log n
+n
$$

とする。差は

$$
S_{n+1}-S_n
=
1-
\left(n+\frac12\right)
\log\left(1+\frac1n\right).
$$

$0<x\le1$ で

$$
x-\frac{x^2}{2}
\le
\log(1+x)
\le
x-\frac{x^2}{2}+\frac{x^3}{3}
$$

である。$x=1/n$ とすると

$$
\left(n+\frac12\right)
\left(x-\frac{x^2}{2}\right)
=
1-\frac{x^2}{4},
$$

一方

$$
\left(n+\frac12\right)
\left(x-\frac{x^2}{2}+\frac{x^3}{3}\right)
=
1+\frac{x^2}{12}+\frac{x^3}{6}.
$$

従って

$$
-\frac{x^2}{12}-\frac{x^3}{6}
\le
S_{n+1}-S_n
\le
\frac{x^2}{4}.
$$

$0<x\le1$ だから左辺の絶対値も $x^2/4$ 以下であり、

$$
|S_{n+1}-S_n|
\le
\frac1{4n^2}.
$$

従って差の絶対値の級数が収束し、$S_n\to C$。よって

$$
n!
=
A\,n^{n+1/2}e^{-n}(1+o(1)),
\qquad
A=e^C>0.
$$

次に

$$
I_m
=
\int_0^{\pi/2}\sin^m\theta\,d\theta.
$$

部分積分から

$$
I_m=\frac{m-1}{m}I_{m-2}.
$$

従って

$$
I_{2n}
=
\frac\pi2\frac{(2n)!}{4^n(n!)^2},
$$

$$
I_{2n+1}
=
\frac{4^n(n!)^2}{(2n+1)!}.
$$

また

$$
I_{2n+1}\le I_{2n}\le I_{2n-1},
$$

$$
I_{2n+1}
=
\frac{2n}{2n+1}I_{2n-1}
$$

なので

$$
\frac{2n}{2n+1}
\le
\frac{I_{2n+1}}{I_{2n}}
\le1.
$$

よって比は1へ収束する。一方

$$
I_{2n}I_{2n+1}
=
\frac{\pi}{2(2n+1)}
\sim
\frac{\pi}{4n}.
$$

したがって

$$
I_{2n}
\sim
\frac{\sqrt\pi}{2\sqrt n}.
$$

これを

$$
I_{2n}
=
\frac\pi2
\frac1{4^n}\binom{2n}{n}
$$

へ戻すと

$$
\frac1{4^n}\binom{2n}{n}
\sim
\frac1{\sqrt{\pi n}}.
$$

一方、未定定数 $A$ を含む階乗漸近式から

$$
\binom{2n}{n}
=
\frac{(2n)!}{(n!)^2}
\sim
4^n\frac{\sqrt2}{A\sqrt n}.
$$

従って

$$
\frac{\sqrt2}{A}
=
\frac1{\sqrt\pi},
$$

すなわち

$$
A=\sqrt{2\pi}.
$$

以上から

$$
n!
\sim
\sqrt{2\pi}\,
n^{n+1/2}e^{-n}
=
\sqrt{2\pi n}
\left(\frac ne\right)^n.
$$

定数を未決定のままにせず、Wallis 積が正確に $\sqrt{2\pi}$ を固定していることが核心である。

---

## 12. この章の到達点

CA11 を終えた段階で、次を自力で再構成できることを目標とする。

1. Euler 積分の局所一様収束から Gamma 関数の正則性を示す。
2. 関数等式から有理型解析接続・極・留数を導く。
3. [Euler の極限公式](#thm-ca11-euler-limit)から逆 Gamma 関数の Weierstrass 積を導く。
4. Gamma 関数が零点を持たないことを積表示から読む。
5. CA10 の正弦関数の Euler 積と比較して反射公式を証明する。
6. Wallis 積で Stirling 公式の定数 sqrt(2pi) まで決定する。
7. Stirling と周期性から Legendre の倍角公式を証明する。
8. Beta--Gamma 関係式の変数変換を追う。

次章 CA12 では、Gamma 関数を Mellin 変換側の因子として使い、Riemann zeta 関数の解析接続と関数等式へ進む。
