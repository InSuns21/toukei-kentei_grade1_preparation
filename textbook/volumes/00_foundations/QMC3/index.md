# QMC3 準 Monte Carlo III：格子則

QMC2 では、関数空間を固定したときの最悪誤差を

$$
e(Q_N;\mathcal H)
=
\sup_{\|f\|_{\mathcal H}\le1}
|Q_N(f)-I(f)|
$$

で測り、良い点集合が存在することまで進みました。

しかし「存在する」と「作れる」は別問題です。

QMC3 では、点をばらばらに探す代わりに

$$
\boxed{
\boldsymbol x_n
=
\left\{
\frac{n\boldsymbol z}{N}
\right\},
\qquad
n=0,\ldots,N-1
}
$$

という非常に強い代数構造を持つ点集合を使います。

ここで $\{\cdot\}$ は各座標の小数部分、$\boldsymbol z$ は整数ベクトルです。この一つのベクトルだけで $N$ 個の点が決まります。

格子則の核心は、点の幾何を見るよりも **周波数を見ると構造が完全に見える**ことです。

整数周波数 $\boldsymbol h\in\mathbb Z^s$ に対して

$$
e^{2\pi i\boldsymbol h\cdot\boldsymbol x}
$$

を格子点上で平均すると、

$$
\boldsymbol h\cdot\boldsymbol z
\equiv0\pmod N
$$

を満たす周波数だけが残り、それ以外は厳密に消えます。

したがって本章の設計原理は

$$
\boxed{
\text{小さい周波数を双対格子から追い出す}
}
$$

です。

この考え方が、後半の 成分逐次構成（CBC）へつながります。

---

## 0. 本章で再定義しないものと、周期性という新しい境界

求積則と最悪誤差は QMC2 の正本を使います。

- [準 Monte Carlo 求積則](../QMC1/index.md#def-qmc1-qmc-rule)
- [最悪誤差](../QMC2/index.md#def-qmc2-worst-case-error)
- [RKHS 最悪誤差の表現公式](../QMC2/index.md#thm-qmc2-worst-case-error)

また Fourier 側では FOU1 の

- [複素指数係数](../FOU1/index.md#def-fou1-complex-exponential-coefficient)

を既知として使います。

ただし QMC2 の主役だった重み付きアンカー型 Sobolev 空間と、本章後半の周期 Fourier 空間は同じ関数空間ではありません。

格子則の周波数消去則は、単位立方体の向かい合う面を同一視した

$$
[0,1)^s
\cong
\mathbb R^s/\mathbb Z^s
$$

という周期構造と相性がよいからです。

したがって本章では、まず周期関数に対象を絞ります。

> **停止線**  
> 非周期関数へ格子則をそのまま適用すると、境界での不連続な周期延長が高周波を増やし、本章の滑らかさによる高速収束が失われることがあります。非周期関数を周期問題へ変換する方法は、格子則の基本構造とは分けて扱います。

---

## 1. 一つの整数ベクトルから $N$ 点を作る

実数 $t$ に対して

$$
\{t\}
=
t-\lfloor t\rfloor
\in[0,1)
$$

を小数部分とします。ベクトルには座標ごとに適用します。

<a id="def-qmc3-rank1-lattice"></a>
<!-- formal-statement-start -->
### 定義（ランク1格子点集合と生成ベクトル）

正整数 $N$ と整数ベクトル

$$
\boldsymbol z
=
(z_1,\ldots,z_s)
\in\mathbb Z^s
$$

を取る。

$$
\gcd(N,z_1,\ldots,z_s)=1
$$

を仮定し、

$$
\boxed{
P_N(\boldsymbol z)
=
\left\{
\left\{
\frac{n\boldsymbol z}{N}
\right\}
:
n=0,\ldots,N-1
\right\}
}
$$

を **ランク1格子点集合** とする。

$\boldsymbol z$ を **生成ベクトル** と呼び、

$$
\boxed{
Q_{N,\boldsymbol z}(f)
=
\frac1N
\sum_{n=0}^{N-1}
f\left(
\left\{
\frac{n\boldsymbol z}{N}
\right\}
\right)
}
$$

を対応する ランク1格子則とする。
<!-- formal-statement-end -->

最大公約数条件は、$N$ 個の添字が同じ点へ潰れないために入っています。

実際、

$$
\left\{
\frac{n\boldsymbol z}{N}
\right\}
=
\left\{
\frac{m\boldsymbol z}{N}
\right\}
$$

なら各 $j$ について

$$
N\mid(n-m)z_j
$$

です。

$\gcd(N,z_1,\ldots,z_s)=1$ なので、ある整数 $a_0,a_1,\ldots,a_s$ が存在して

$$
a_0N+\sum_{j=1}^sa_jz_j=1
$$

です。両辺に $n-m$ を掛けると $N\mid n-m$ が従います。

$0\le n,m\le N-1$ なので $n=m$ です。

<!-- definition-example-start: def-qmc3-rank1-lattice -->
**定義の確認**：$N=5,\ \boldsymbol z=(1,2)$

$$
\begin{array}{c|c}
n & \{n\boldsymbol z/5\} \\ \hline
0&(0,0)\\
1&(1/5,2/5)\\
2&(2/5,4/5)\\
3&(3/5,1/5)\\
4&(4/5,3/5)
\end{array}
$$

第二座標は毎回 $2/5$ ずつ進み、1を超えると小数部分へ戻ります。

5点を二次元で独立に指定したのではなく、生成ベクトル $(1,2)$ だけで全点が決まりました。
<!-- definition-example-end -->

この規則性は自由度を大きく減らします。

一般の $N$ 点を $s$ 次元で直接選ぶなら $Ns$ 個の実数が必要ですが、ランク1格子では $s$ 個の整数成分だけを選べばよいからです。

その代わり、生成ベクトルを誤ると規則性がそのまま弱点になります。

---

## 2. どの周波数が消えずに残るか

整数周波数ベクトル

$$
\boldsymbol h
=
(h_1,\ldots,h_s)
\in\mathbb Z^s
$$

を考えます。

ランク1格子点へ複素指数モードを入れると

$$
e^{2\pi i\boldsymbol h\cdot\boldsymbol x_n}
=
\exp
\left(
2\pi i
\frac{n\boldsymbol h\cdot\boldsymbol z}{N}
\right)
$$

です。

右辺は有限等比級数になります。

<a id="def-qmc3-dual-lattice"></a>
<!-- formal-statement-start -->
### 定義（双対格子）

ランク1格子 $P_N(\boldsymbol z)$ に対して

$$
\boxed{
L^\perp(\boldsymbol z,N)
=
\left\{
\boldsymbol h\in\mathbb Z^s:
\boldsymbol h\cdot\boldsymbol z
\equiv0
\pmod N
\right\}
}
$$

をその **双対格子** とする。
<!-- formal-statement-end -->

<!-- definition-example-start: def-qmc3-dual-lattice -->
**定義の確認**：$N=5,\ \boldsymbol z=(1,2)$

$$
\boldsymbol h=(1,2)
$$

なら

$$
\boldsymbol h\cdot\boldsymbol z
=
1+4
=
5
\equiv0\pmod5
$$

なので

$$
(1,2)\in L^\perp((1,2),5).
$$

一方

$$
(1,-1)\cdot(1,2)
=
-1
\not\equiv0\pmod5
$$

なので

$$
(1,-1)\notin L^\perp((1,2),5).
$$
<!-- definition-example-end -->

<a id="thm-qmc3-character-orthogonality"></a>
<!-- formal-statement-start -->
### 定理（ランク1格子上の複素指数モードの離散直交性）

任意の $\boldsymbol h\in\mathbb Z^s$ に対して

$$
\boxed{
\frac1N
\sum_{n=0}^{N-1}
\exp
\left(
2\pi i
\boldsymbol h\cdot
\frac{n\boldsymbol z}{N}
\right)
=
\begin{cases}
1,
&
\boldsymbol h\in
L^\perp(\boldsymbol z,N),
\\
0,
&
\boldsymbol h\notin
L^\perp(\boldsymbol z,N).
\end{cases}
}
$$
<!-- formal-statement-end -->

### 証明の見取り図

$$
\omega
=
\exp
\left(
2\pi i
\frac{\boldsymbol h\cdot\boldsymbol z}{N}
\right)
$$

と置きます。

双対格子上では $\omega=1$ です。

それ以外では $\omega\ne1$ ですが $\omega^N=1$ なので、有限等比級数

$$
1+\omega+\cdots+\omega^{N-1}
$$

が厳密に0になります。

<!-- proof-start -->
### 証明

$\boldsymbol h\in L^\perp(\boldsymbol z,N)$ なら、ある整数 $q$ により

$$
\boldsymbol h\cdot\boldsymbol z=qN
$$

です。

従って各 $n$ で

$$
\exp
\left(
2\pi i
\frac{n\boldsymbol h\cdot\boldsymbol z}{N}
\right)
=
e^{2\pi inq}
=
1.
$$

よって平均は1です。

次に

$$
\boldsymbol h\notin L^\perp(\boldsymbol z,N)
$$

とします。

$$
\omega
=
\exp
\left(
2\pi i
\frac{\boldsymbol h\cdot\boldsymbol z}{N}
\right)
$$

と置けば $\omega\ne1$ です。

一方、

$$
\omega^N
=
\exp
\left(
2\pi i
\boldsymbol h\cdot\boldsymbol z
\right)
=
1.
$$

従って有限等比級数の公式から

$$
\sum_{n=0}^{N-1}\omega^n
=
\frac{1-\omega^N}{1-\omega}
=
0.
$$

$N$ で割れば平均は0です。
<!-- proof-end -->

この定理は、格子則を理解する最重要公式です。

点の配置を図で眺める代わりに

$$
\boxed{
\text{双対格子に入る周波数は残る}
\qquad
\text{入らない周波数は完全に消える}
}
$$

と判定できます。

---

## 3. 三角多項式の積分誤差は双対格子上の係数だけ

FOU1 では $2\pi$ 周期の一次元関数に対して複素指数係数を定義しました。本章では単位立方体と整合するよう周期を1へ規格化し、多次元へ拡張します。一次元で変数を $\theta=2\pi x$ と置けば、FOU1 の規約と同じ内容です。

<a id="def-qmc3-unit-torus-fourier-coefficient"></a>
<!-- formal-statement-start -->
### 定義（単位周期立方体上の Fourier 係数）

各座標について1周期で積分可能な関数

$$
f:[0,1)^s\to\mathbb C
$$

と整数周波数

$$
\boldsymbol h\in\mathbb Z^s
$$

に対して

$$
\boxed{
\widehat f(\boldsymbol h)
=
\int_{[0,1)^s}
f(\boldsymbol x)
e^{-2\pi i\boldsymbol h\cdot\boldsymbol x}
\,d\boldsymbol x
}
$$

を **単位周期立方体上の Fourier 係数** とする。
<!-- formal-statement-end -->

<!-- definition-example-start: def-qmc3-unit-torus-fourier-coefficient -->
**定義の確認**：$s\ge1$ とし、

$$
f(\boldsymbol x)
=
1+2\cos(2\pi x_1)
=
1+e^{2\pi ix_1}+e^{-2\pi ix_1}
$$

とします。

$\boldsymbol e_1=(1,0,\ldots,0)$ と書けば、整数周波数の一周期積分消去から

$$
\widehat f(\boldsymbol0)=1,
\qquad
\widehat f(\boldsymbol e_1)=1,
\qquad
\widehat f(-\boldsymbol e_1)=1,
$$

で、それ以外の Fourier 係数は0です。

つまり有限 Fourier 和に書いたときの各複素指数モードの係数が、上の積分でそのまま回収されます。
<!-- definition-example-end -->

$[0,1)^s$ 上の有限 Fourier 和

$$
T(\boldsymbol x)
=
\sum_{\boldsymbol h\in F}
\widehat T(\boldsymbol h)
e^{2\pi i\boldsymbol h\cdot\boldsymbol x}
$$

を考えます。ここで $F\subset\mathbb Z^s$ は有限集合です。

$\boldsymbol h\ne\boldsymbol0$ なら

$$
\int_{[0,1)^s}
e^{2\pi i\boldsymbol h\cdot\boldsymbol x}
\,d\boldsymbol x
=
0
$$

です。

各座標のうち少なくとも一つで

$$
\int_0^1e^{2\pi ih_jx_j}\,dx_j=0
$$

になるからです。

したがって

$$
I(T)
=
\widehat T(\boldsymbol0).
$$

<a id="thm-qmc3-trigonometric-error"></a>
<!-- formal-statement-start -->
### 定理（三角多項式に対する格子則の積分誤差公式）

有限 Fourier 和

$$
T(\boldsymbol x)
=
\sum_{\boldsymbol h\in F}
\widehat T(\boldsymbol h)
e^{2\pi i\boldsymbol h\cdot\boldsymbol x}
$$

に対して

$$
\boxed{
Q_{N,\boldsymbol z}(T)-I(T)
=
\sum_{\substack{
\boldsymbol h\in
F\cap L^\perp(\boldsymbol z,N)
\\
\boldsymbol h\ne\boldsymbol0
}}
\widehat T(\boldsymbol h)
}
$$

が成り立つ。
<!-- formal-statement-end -->

### 証明の見取り図

有限和なので、求積平均と和の順序を問題なく交換できます。

各周波数について前節の離散直交性を使えば、双対格子の項だけが残ります。積分側はゼロ周波数だけです。

<!-- proof-start -->
### 証明

格子平均へ有限和を代入すると

$$
\begin{aligned}
Q_{N,\boldsymbol z}(T)
&=
\frac1N
\sum_{n=0}^{N-1}
\sum_{\boldsymbol h\in F}
\widehat T(\boldsymbol h)
\exp
\left(
2\pi i
\boldsymbol h\cdot
\frac{n\boldsymbol z}{N}
\right)
\\
&=
\sum_{\boldsymbol h\in F}
\widehat T(\boldsymbol h)
\left[
\frac1N
\sum_{n=0}^{N-1}
\exp
\left(
2\pi i
\boldsymbol h\cdot
\frac{n\boldsymbol z}{N}
\right)
\right].
\end{aligned}
$$

[ランク1格子上の複素指数モードの離散直交性](#thm-qmc3-character-orthogonality)により

$$
Q_{N,\boldsymbol z}(T)
=
\sum_{\boldsymbol h\in
F\cap L^\perp(\boldsymbol z,N)}
\widehat T(\boldsymbol h).
$$

一方

$$
I(T)
=
\widehat T(\boldsymbol0).
$$

$\boldsymbol0$ は必ず双対格子に属するので、差を取れば

$$
Q_{N,\boldsymbol z}(T)-I(T)
=
\sum_{\substack{
\boldsymbol h\in
F\cap L^\perp(\boldsymbol z,N)
\\
\boldsymbol h\ne\boldsymbol0
}}
\widehat T(\boldsymbol h).
$$
<!-- proof-end -->

この公式から、生成ベクトル設計の意味が一気に明確になります。

積分値に寄与しない非零周波数が双対格子へ入ると、格子則はその係数を積分値だと誤認します。

---

## 4. 悪い生成ベクトルは低周波を丸ごと残す

二次元で

$$
N=5,
\qquad
\boldsymbol z=(1,1)
$$

とします。

すると

$$
\boldsymbol h=(1,-1)
$$

について

$$
\boldsymbol h\cdot\boldsymbol z
=
1-1
=
0
$$

なので

$$
(1,-1)
\in
L^\perp((1,1),5).
$$

関数

$$
f(x_1,x_2)
=
\cos
\left(
2\pi(x_1-x_2)
\right)
$$

を考えます。

一周期積分では

$$
I(f)=0.
$$

しかし格子点は

$$
\left(
\frac n5,\frac n5
\right)
$$

なので、すべての点で

$$
f\left(
\frac n5,\frac n5
\right)
=
1.
$$

従って

$$
\boxed{
Q_{5,(1,1)}(f)=1,
\qquad
I(f)=0.
}
$$

誤差は1です。

これは点数不足だけが原因ではありません。

生成ベクトル $(1,1)$ が低周波 $(1,-1)$ を双対格子へ入れてしまったことが原因です。

一方

$$
\boldsymbol z=(1,2)
$$

なら

$$
(1,-1)\cdot(1,2)
=
-1
\not\equiv0\pmod5.
$$

前節の離散直交性から、このモードの格子平均は厳密に0になります。

つまり

$$
\boxed{
\text{良い生成ベクトル}
=
\text{重要な低周波を双対格子へ入れない生成ベクトル}
}
$$

という設計像が見えてきます。

---

## 5. 有限和から絶対収束 Fourier 級数へ

有限 Fourier 和だけでは関数クラスが狭すぎます。

そこで、和と積分を安全に交換できる範囲まで拡張します。

<a id="def-qmc3-absolute-fourier"></a>
<!-- formal-statement-start -->
### 定義（絶対収束 Fourier 級数）

$[0,1)^s$ 上の周期関数 $f$ が

$$
\boxed{
f(\boldsymbol x)
=
\sum_{\boldsymbol h\in\mathbb Z^s}
\widehat f(\boldsymbol h)
e^{2\pi i\boldsymbol h\cdot\boldsymbol x}
}
$$

と表され、

$$
\boxed{
\sum_{\boldsymbol h\in\mathbb Z^s}
|\widehat f(\boldsymbol h)|
<
\infty
}
$$

を満たすとき、本章では $f$ は絶対収束 Fourier 級数を持つという。
<!-- formal-statement-end -->

<!-- definition-example-start: def-qmc3-absolute-fourier -->
**定義の確認**：一次元の無限級数

$$
f(x)
=
1+
\sum_{m=1}^{\infty}
2^{-m}\cos(2\pi mx)
$$

を考えます。

複素指数表示では

$$
\widehat f(0)=1,
\qquad
\widehat f(m)
=
\widehat f(-m)
=
2^{-(m+1)}
\quad(m\ge1).
$$

したがって

$$
\begin{aligned}
\sum_{h\in\mathbb Z}
|\widehat f(h)|
&=
1+
2\sum_{m=1}^{\infty}2^{-(m+1)}
\\
&=
1+
\sum_{m=1}^{\infty}2^{-m}
\\
&=
2
<
\infty.
\end{aligned}
$$

よってこの級数は定義を直接満たします。
<!-- definition-example-end -->

この仮定なら

$$
\left|
\widehat f(\boldsymbol h)
e^{2\pi i\boldsymbol h\cdot\boldsymbol x}
\right|
=
|\widehat f(\boldsymbol h)|
$$

なので、Fourier 級数は $\boldsymbol x$ に関して一様に絶対収束します。

従って有限部分和 $S_M$ に対して

$$
\sup_{\boldsymbol x}
|f(\boldsymbol x)-S_M(\boldsymbol x)|
\to0.
$$

この一様収束により、積分と極限を交換できます。また格子平均は有限個の点評価の平均なので、そこでも極限を交換できます。

<a id="thm-qmc3-absolute-fourier-error"></a>
<!-- formal-statement-start -->
### 定理（絶対収束 Fourier 級数に対する格子則の積分誤差公式）

$f$ が絶対収束 Fourier 級数を持つなら

$$
\boxed{
Q_{N,\boldsymbol z}(f)-I(f)
=
\sum_{\substack{
\boldsymbol h\in
L^\perp(\boldsymbol z,N)
\\
\boldsymbol h\ne\boldsymbol0
}}
\widehat f(\boldsymbol h)
}
$$

が成り立つ。

右辺も絶対収束する。
<!-- formal-statement-end -->

### 証明の見取り図

有限部分和では前定理が使えます。

絶対収束から一様収束が得られるので、有限部分和の誤差公式の極限を取ります。

双対格子上の部分和も、元の絶対収束級数の部分級数なので絶対収束します。

<!-- proof-start -->
### 証明

有限集合

$$
F_M
=
\{
\boldsymbol h\in\mathbb Z^s:
|h_j|\le M
\text{ for all }j
\}
$$

を取り、

$$
S_M(\boldsymbol x)
=
\sum_{\boldsymbol h\in F_M}
\widehat f(\boldsymbol h)
e^{2\pi i\boldsymbol h\cdot\boldsymbol x}
$$

とします。

絶対収束より

$$
\sup_{\boldsymbol x}
|f(\boldsymbol x)-S_M(\boldsymbol x)|
\le
\sum_{\boldsymbol h\notin F_M}
|\widehat f(\boldsymbol h)|
\to0.
$$

従って

$$
Q_{N,\boldsymbol z}(S_M)
\to
Q_{N,\boldsymbol z}(f)
$$

です。また単位立方体の体積は1なので

$$
|I(S_M)-I(f)|
\le
\sup_{\boldsymbol x}
|S_M(\boldsymbol x)-f(\boldsymbol x)|
\to0.
$$

有限和 $S_M$ には前定理を適用でき、

$$
Q_{N,\boldsymbol z}(S_M)-I(S_M)
=
\sum_{\substack{
\boldsymbol h\in
F_M\cap L^\perp(\boldsymbol z,N)
\\
\boldsymbol h\ne\boldsymbol0
}}
\widehat f(\boldsymbol h).
$$

右辺は

$$
\sum_{\boldsymbol h}
|\widehat f(\boldsymbol h)|
<
\infty
$$

の部分級数なので絶対収束します。

$M\to\infty$ とすれば

$$
Q_{N,\boldsymbol z}(f)-I(f)
=
\sum_{\substack{
\boldsymbol h\in
L^\perp(\boldsymbol z,N)
\\
\boldsymbol h\ne\boldsymbol0
}}
\widehat f(\boldsymbol h).
$$
<!-- proof-end -->

この公式は「格子則の積分誤差は双対格子上へ折り返されて残った Fourier 係数の総和」であることを意味します。

---

## 6. 滑らかな周期関数では高周波を強く罰する

QMC2 では関数空間の単位球を指定して最悪誤差を測りました。

同じ発想を Fourier 係数へ移します。

$\alpha>1/2$ と正の座標重み

$$
\gamma_1,\ldots,\gamma_s
$$

を取ります。

整数 $k$ に対して

$$
\rho_{\alpha,\gamma_j}(k)
=
\begin{cases}
1,
&
k=0,
\\
|k|^{2\alpha}/\gamma_j,
&
k\ne0
\end{cases}
$$

と置き、

$$
r_{\alpha,\boldsymbol\gamma}(\boldsymbol h)
=
\prod_{j=1}^s
\rho_{\alpha,\gamma_j}(h_j)
$$

とします。

<a id="def-qmc3-weighted-periodic-fourier"></a>
<!-- formal-statement-start -->
### 定義（重み付き周期 Fourier 空間）

$\alpha>1/2$ と正の重み $\gamma_1,\ldots,\gamma_s$ を固定する。

Fourier 係数が

$$
\boxed{
\|f\|_{\alpha,\boldsymbol\gamma}^2
=
\sum_{\boldsymbol h\in\mathbb Z^s}
|\widehat f(\boldsymbol h)|^2
r_{\alpha,\boldsymbol\gamma}(\boldsymbol h)
<
\infty
}
$$

を満たす周期関数全体を、本章の **重み付き周期 Fourier 空間**
$\mathcal H_{\alpha,\boldsymbol\gamma}^{\mathrm{per}}$ とする。
<!-- formal-statement-end -->

この定義が前節の絶対収束条件を自動的に満たすことを確認します。

$$
C_\alpha
=
2\sum_{m=1}^{\infty}m^{-2\alpha}
$$

と置きます。

$\alpha>1/2$ なので $2\alpha>1$ であり、$p$ 級数として

$$
C_\alpha<\infty.
$$

また

$$
\begin{aligned}
\sum_{\boldsymbol h\in\mathbb Z^s}
r_{\alpha,\boldsymbol\gamma}(\boldsymbol h)^{-1}
&=
\prod_{j=1}^s
\left(
1+
2\gamma_j
\sum_{m=1}^\infty
m^{-2\alpha}
\right)
\\
&=
\boxed{
\prod_{j=1}^s
(1+\gamma_jC_\alpha)
}
<
\infty.
\end{aligned}
$$

[Cauchy--Schwarz の不等式](../F0_00E2_Cauchy_Schwarz_Bessel_Parseval/index.md#thm-f0-00e2-cauchy-schwarz)から

$$
\begin{aligned}
\sum_{\boldsymbol h}
|\widehat f(\boldsymbol h)|
&=
\sum_{\boldsymbol h}
\left(
|\widehat f(\boldsymbol h)|
\sqrt{r(\boldsymbol h)}
\right)
\frac1{\sqrt{r(\boldsymbol h)}}
\\
&\le
\|f\|_{\alpha,\boldsymbol\gamma}
\left(
\sum_{\boldsymbol h}
r(\boldsymbol h)^{-1}
\right)^{1/2}
\\
&<
\infty.
\end{aligned}
$$

したがってこの空間の関数には、前節の格子誤差公式を適用できます。

重み $\gamma_j$ が小さいほど、$h_j\ne0$ を含む Fourier 係数はノルムで強く罰せられます。

これは QMC2 の積型重みと同じ設計思想です。

ただし、QMC2 はアンカー型 Sobolev 空間、本章は周期 Fourier 空間なので、核やノルムそのものは別物です。

<!-- definition-example-start: def-qmc3-weighted-periodic-fourier -->
**定義の確認**：単一 Fourier モード

$$
f(\boldsymbol x)
=
e^{2\pi i\boldsymbol k\cdot\boldsymbol x}
$$

なら Fourier 係数は

$$
\widehat f(\boldsymbol h)
=
\begin{cases}
1,&\boldsymbol h=\boldsymbol k,\\
0,&\boldsymbol h\ne\boldsymbol k.
\end{cases}
$$

したがって

$$
\|f\|_{\alpha,\boldsymbol\gamma}^2
=
r_{\alpha,\boldsymbol\gamma}(\boldsymbol k).
$$

高周波ほど $|k_j|^{2\alpha}$ によりノルムが大きくなり、重み $\gamma_j$ が小さい座標の振動も強く罰せられます。
<!-- definition-example-end -->

---

## 7. 最悪誤差は双対格子の重み付き和になる

前節の空間で

$$
\|f\|_{\alpha,\boldsymbol\gamma}\le1
$$

とします。

格子誤差公式から

$$
E_{N,\boldsymbol z}(f)
=
\sum_{\substack{
\boldsymbol h\in L^\perp(\boldsymbol z,N)
\\
\boldsymbol h\ne\boldsymbol0
}}
\widehat f(\boldsymbol h).
$$

これに [Cauchy--Schwarz の不等式](../F0_00E2_Cauchy_Schwarz_Bessel_Parseval/index.md#thm-f0-00e2-cauchy-schwarz)を使うと

$$
\begin{aligned}
|E_{N,\boldsymbol z}(f)|
&\le
\left[
\sum_{\substack{
\boldsymbol h\in L^\perp
\\
\boldsymbol h\ne\boldsymbol0
}}
|\widehat f(\boldsymbol h)|^2
r(\boldsymbol h)
\right]^{1/2}
\\
&\quad\times
\left[
\sum_{\substack{
\boldsymbol h\in L^\perp
\\
\boldsymbol h\ne\boldsymbol0
}}
r(\boldsymbol h)^{-1}
\right]^{1/2}
\\
&\le
\|f\|_{\alpha,\boldsymbol\gamma}
\left[
\sum_{\substack{
\boldsymbol h\in L^\perp
\\
\boldsymbol h\ne\boldsymbol0
}}
r(\boldsymbol h)^{-1}
\right]^{1/2}.
\end{aligned}
$$

しかもこの上界は達成できます。

<a id="thm-qmc3-fourier-wce"></a>
<!-- formal-statement-start -->
### 定理（重み付き周期 Fourier 空間における格子則の最悪誤差公式）

$\alpha>1/2$ と正の重み $\boldsymbol\gamma$ に対して

$$
\boxed{
e\left(
Q_{N,\boldsymbol z};
\mathcal H_{\alpha,\boldsymbol\gamma}^{\mathrm{per}}
\right)^2
=
\sum_{\substack{
\boldsymbol h\in
L^\perp(\boldsymbol z,N)
\\
\boldsymbol h\ne\boldsymbol0
}}
r_{\alpha,\boldsymbol\gamma}(\boldsymbol h)^{-1}
}
$$

が成り立つ。
<!-- formal-statement-end -->

### 証明の見取り図

上界はすでに Cauchy--Schwarz で得ました。

等号を作るには、双対格子上だけに Fourier 係数を置き、

$$
\widehat f(\boldsymbol h)
\propto
r(\boldsymbol h)^{-1}
$$

とします。

双対格子は $\boldsymbol h\mapsto-\boldsymbol h$ で閉じており、重みも対称なので、係数を実対称に選べます。

<!-- proof-start -->
### 証明

$$
S
=
\sum_{\substack{
\boldsymbol h\in
L^\perp(\boldsymbol z,N)
\\
\boldsymbol h\ne\boldsymbol0
}}
r(\boldsymbol h)^{-1}
$$

と置きます。

全整数格子上の逆重み和が有限なので

$$
0\le S<\infty.
$$

$S=0$ なら非零双対周波数がなく、公式は自明です。

以下 $S>0$ とします。

任意の $\|f\|\le1$ に対して、前の Cauchy--Schwarz 評価から

$$
|E_{N,\boldsymbol z}(f)|
\le
\sqrt S.
$$

したがって

$$
e
\le
\sqrt S.
$$

次に Fourier 係数を

$$
\widehat f_\ast(\boldsymbol h)
=
\begin{cases}
S^{-1/2}r(\boldsymbol h)^{-1},
&
\boldsymbol h\in L^\perp,\ 
\boldsymbol h\ne\boldsymbol0,
\\
0,
&
\text{otherwise}
\end{cases}
$$

と定めます。

この係数列について

$$
\begin{aligned}
\|f_\ast\|^2
&=
\sum_{\boldsymbol h}
|\widehat f_\ast(\boldsymbol h)|^2
r(\boldsymbol h)
\\
&=
S^{-1}
\sum_{\substack{
\boldsymbol h\in L^\perp
\\
\boldsymbol h\ne\boldsymbol0
}}
r(\boldsymbol h)^{-1}
\\
&=
1.
\end{aligned}
$$

また前節で示した逆重み和の有限性から Fourier 級数は絶対収束します。

誤差は

$$
\begin{aligned}
E_{N,\boldsymbol z}(f_\ast)
&=
\sum_{\substack{
\boldsymbol h\in L^\perp
\\
\boldsymbol h\ne\boldsymbol0
}}
\widehat f_\ast(\boldsymbol h)
\\
&=
S^{-1/2}
\sum_{\substack{
\boldsymbol h\in L^\perp
\\
\boldsymbol h\ne\boldsymbol0
}}
r(\boldsymbol h)^{-1}
\\
&=
\sqrt S.
\end{aligned}
$$

従って

$$
e\ge\sqrt S.
$$

上界と合わせて

$$
e^2=S.
$$
<!-- proof-end -->

この定理により、生成ベクトルの設計問題が

$$
\boxed{
\boldsymbol z
\text{ を選んで }
\sum_{\substack{
\boldsymbol h\in L^\perp(\boldsymbol z,N)
\\
\boldsymbol h\ne0
}}
r(\boldsymbol h)^{-1}
\text{ を小さくする}
}
$$

という明示的な整数周波数問題へ変わりました。

特に小さい $|\boldsymbol h|$ は逆重み $r(\boldsymbol h)^{-1}$ が大きいので、低周波の双対ベクトルを避けることが重要です。

---

## 8. 一次元では誤差率を完全に計算できる

一次元で

$$
\gcd(z,N)=1
$$

とします。

双対格子条件は

$$
hz\equiv0\pmod N.
$$

$z$ は $N$ を法として可逆なので

$$
h\equiv0\pmod N.
$$

従って

$$
\boxed{
L^\perp(z,N)
=
N\mathbb Z.
}
$$

です。

<a id="thm-qmc3-one-dimensional-rate"></a>
<!-- formal-statement-start -->
### 定理（一次元格子則の滑らかさ依存最悪誤差率）

$\alpha>1/2$、$\gamma>0$ とする。

一次元の重み付き周期 Fourier 空間で、$\gcd(z,N)=1$ のランク1格子則を使うと

$$
\boxed{
e\left(
Q_{N,z};
\mathcal H_{\alpha,\gamma}^{\mathrm{per}}
\right)^2
=
\gamma C_\alpha N^{-2\alpha}
}
$$

したがって

$$
\boxed{
e\left(
Q_{N,z};
\mathcal H_{\alpha,\gamma}^{\mathrm{per}}
\right)
=
\sqrt{\gamma C_\alpha}\,
N^{-\alpha}
}
$$

が成り立つ。

ここで

$$
C_\alpha
=
2\sum_{m=1}^{\infty}m^{-2\alpha}.
$$
<!-- formal-statement-end -->

### 証明の見取り図

一次元では残る非零周波数が

$$
\pm N,\pm2N,\ldots
$$

だけです。

各周波数の逆重みは

$$
\gamma|h|^{-2\alpha}
$$

なので、$N^{-2\alpha}$ を外へ出せます。

<!-- proof-start -->
### 証明

前節の最悪誤差公式と

$$
L^\perp(z,N)=N\mathbb Z
$$

から

$$
\begin{aligned}
e^2
&=
\sum_{\substack{
h\in N\mathbb Z
\\
h\ne0
}}
r_{\alpha,\gamma}(h)^{-1}
\\
&=
\sum_{m\in\mathbb Z\setminus\{0\}}
\gamma|mN|^{-2\alpha}
\\
&=
\gamma N^{-2\alpha}
\sum_{m\in\mathbb Z\setminus\{0\}}
|m|^{-2\alpha}
\\
&=
\gamma C_\alpha N^{-2\alpha}.
\end{aligned}
$$

平方根を取れば

$$
e
=
\sqrt{\gamma C_\alpha}
N^{-\alpha}.
$$
<!-- proof-end -->

Monte Carlo 法の典型的な $N^{-1/2}$ と違い、ここでは周期関数の周波数減衰を関数空間へ組み込んだ結果、滑らかさ $\alpha$ がそのまま誤差指数に現れます。

ただしこれは一次元かつ周期 Fourier 空間での結論です。

高次元では、双対格子に短い非零ベクトルが入り得るため、生成ベクトル設計が必要になります。

---

## 9. 同じ点集合を表す生成ベクトルがある

生成ベクトルは見かけほど一意ではありません。

$N$ と互いに素な整数 $a$ を使って

$$
a\boldsymbol z
$$

へ一斉に掛けても、点集合は変わりません。

<a id="thm-qmc3-unit-scaling"></a>
<!-- formal-statement-start -->
### 定理（生成ベクトルの可逆スカラー倍不変性）

$$
\gcd(a,N)=1
$$

とする。

このとき

$$
\boxed{
P_N(a\boldsymbol z)
=
P_N(\boldsymbol z)
}
$$

が成り立つ。

従って $N$ が素数で $z_1\not\equiv0\pmod N$ なら、同じ点集合を与える生成ベクトルを選び直して

$$
\boxed{
z_1=1
}
$$

と正規化できる。
<!-- formal-statement-end -->

### 証明の見取り図

$a$ が $N$ と互いに素なら

$$
0,a,2a,\ldots,(N-1)a
$$

を $N$ で割った余りは $0,\ldots,N-1$ の並べ替えです。

したがって点の列の順番が変わるだけです。

<!-- proof-start -->
### 証明

$\gcd(a,N)=1$ なので、写像

$$
n
\longmapsto
an\pmod N
$$

は $\{0,\ldots,N-1\}$ 上の単射です。

有限集合から自身への単射なので全射でもあり、余りは全てちょうど一度ずつ現れます。

したがって

$$
\left\{
\left\{
\frac{na\boldsymbol z}{N}
\right\}
:
n=0,\ldots,N-1
\right\}
$$

は

$$
\left\{
\left\{
\frac{m\boldsymbol z}{N}
\right\}
:
m=0,\ldots,N-1
\right\}
$$

の並べ替えにすぎません。

よって

$$
P_N(a\boldsymbol z)
=
P_N(\boldsymbol z).
$$

次に $N$ が素数で

$$
z_1\not\equiv0\pmod N
$$

とします。

非零剰余類 $z_1$ は法 $N$ で逆元を持つので、ある $a$ が存在して

$$
az_1\equiv1\pmod N.
$$

この $a$ も $N$ と互いに素です。

したがって $a\boldsymbol z$ は同じ点集合を与え、その第一成分を法 $N$ で1にできます。
<!-- proof-end -->

この正規化により、素数 $N$ の CBC 構成では最初の成分を探索せず

$$
z_1=1
$$

から始められます。

---

## 10. 成分逐次構成（CBC）

高次元で

$$
\boldsymbol z
=
(z_1,\ldots,z_s)
$$

を一度に最適化すると、素数 $N$ で $z_1=1$ に固定しても候補数は

$$
(N-1)^{s-1}
$$

です。

そこで、座標を一つずつ追加します。

$d$ 次元までの生成ベクトルを

$$
\boldsymbol z^{(d)}
=
(z_1,\ldots,z_d)
$$

と書きます。

対応する二乗最悪誤差を

$$
R_d(\boldsymbol z^{(d)})
=
\sum_{\substack{
\boldsymbol h\in
L^\perp(\boldsymbol z^{(d)},N)
\\
\boldsymbol h\ne\boldsymbol0
}}
r_{\alpha,\boldsymbol\gamma^{(d)}}(\boldsymbol h)^{-1}
$$

と置きます。

<a id="def-qmc3-cbc"></a>
<!-- formal-statement-start -->
### 定義（成分逐次構成）

$N$ を素数とし、第一成分を

$$
z_1=1
$$

とする。

$d=2,\ldots,s$ に対して、すでに

$$
z_1,\ldots,z_{d-1}
$$

が決まっているとする。

候補

$$
c\in\{1,\ldots,N-1\}
$$

の中から

$$
\boxed{
z_d
\in
\operatorname*{arg\,min}_{1\le c\le N-1}
R_d(z_1,\ldots,z_{d-1},c)
}
$$

を選ぶ手続きを **成分逐次構成**（component-by-component construction; CBC）とする。
<!-- formal-statement-end -->

CBC は「最終 $s$ 次元の大域最適解を必ず返す」という定義ではありません。

重要なのは

$$
\boxed{
1\text{ 座標追加するたびに}
\text{ 双対格子の誤差基準を見て選ぶ}
}
$$

ことです。

全組合せを列挙する代わりに、各段で $N-1$ 個の候補を比較します。

理論的な誤差保証を得るには、候補平均から少なくとも一つ良い成分が存在することを示す議論を組み合わせます。高速 CBC 実装では、さらに積型構造や巡回構造を使って基準計算そのものを高速化します。

本章ではまず、CBC が何を最小化しているかを手計算で確認します。

<!-- definition-example-start: def-qmc3-cbc -->
**定義の確認**：$N=5$、二次元、低周波だけを見る

第一成分を $z_1=1$ に固定し、

$$
z_2\in\{1,2,3,4\}
$$

を比較します。

手計算用に

$$
H
=
\{
-1,0,1
\}^2
\setminus\{(0,0)\}
$$

だけを見て

$$
R_H(z_2)
=
\#\{
\boldsymbol h\in H:
h_1+z_2h_2\equiv0\pmod5
\}
$$

とします。

$z_2=1$ では

$$
(1,-1),\ (-1,1)
$$

が残るので

$$
R_H(1)=2.
$$

$z_2=4$ では

$$
(1,1),\ (-1,-1)
$$

が残るので

$$
R_H(4)=2.
$$

一方 $z_2=2,3$ では、この $H$ の中に非零双対ベクトルがありません。

したがって

$$
R_H(2)=R_H(3)=0.
$$

この低周波切断だけを見る CBC なら

$$
z_2=2
\quad\text{または}\quad
z_2=3
$$

を選びます。

実際の CBC は有限切断の個数ではなく、関数空間に対応する重み付き双対格子和 $R_d$ を使います。
<!-- definition-example-end -->

---

## 11. 格子則で何を設計しているのか

QMC1 では、点集合を幾何的に見て

$$
D_N^\ast
$$

を小さくする発想を学びました。

QMC2 では、関数空間を固定して

$$
e(Q_N;\mathcal H)
$$

を小さくする発想へ進みました。

QMC3 では周期 Fourier 空間に対して

$$
\boxed{
e^2
=
\sum_{\substack{
\boldsymbol h\in L^\perp
\\
\boldsymbol h\ne0
}}
r(\boldsymbol h)^{-1}
}
$$

まで具体化しました。

つまり ランク1格子の設計は

$$
\boxed{
\text{重要な Fourier 周波数を}
\text{双対格子から追い出す}
}
$$

問題です。

悪い生成ベクトルでは、$(1,-1)$ のような非常に低い周波数が残り、滑らかな関数でも大きな誤差を生みます。

良い生成ベクトルでは、双対格子に残る周波数を高周波側へ押しやれます。

この「構成を代数で設計する」考え方は、QMC4 以降の デジタル点集合 でも別の代数構造として現れます。

ただし デジタル点集合 では Fourier 指数関数ではなく、二進・有限体構造に適した Walsh 関数が主役になります。

---

# 演習

## Level A

### QMC3-A01 ランク1格子点を全部書く

$$
N=5,
\qquad
\boldsymbol z=(1,2)
$$

とする。

1. $P_5(\boldsymbol z)$ の5点をすべて書け。
2. 点が重複しないことを確認せよ。
3. 第二座標がどの順で現れるかを説明せよ。

- Level: A

<!-- solution-start -->
#### 詳細解答

定義から

$$
\boldsymbol x_n
=
\left\{
\frac{n(1,2)}5
\right\},
\qquad
n=0,1,2,3,4.
$$

各 $n$ で計算します。

$$
n=0:
\qquad
\boldsymbol x_0=(0,0).
$$

$$
n=1:
\qquad
\boldsymbol x_1=
\left(
\frac15,\frac25
\right).
$$

$$
n=2:
\qquad
\boldsymbol x_2=
\left(
\frac25,\frac45
\right).
$$

$$
n=3:
\qquad
\frac{3(1,2)}5
=
\left(
\frac35,\frac65
\right).
$$

第二座標の小数部分は $1/5$ なので

$$
\boldsymbol x_3=
\left(
\frac35,\frac15
\right).
$$

$$
n=4:
\qquad
\frac{4(1,2)}5
=
\left(
\frac45,\frac85
\right),
$$

よって

$$
\boldsymbol x_4=
\left(
\frac45,\frac35
\right).
$$

したがって

$$
\boxed{
P_5(1,2)
=
\left\{
(0,0),
\left(\frac15,\frac25\right),
\left(\frac25,\frac45\right),
\left(\frac35,\frac15\right),
\left(\frac45,\frac35\right)
\right\}.
}
$$

第一座標だけ見れば

$$
0,\frac15,\frac25,\frac35,\frac45
$$

とすべて異なるため、5点は重複しません。

第二座標の分子は法5で

$$
0,\ 2,\ 4,\ 6\equiv1,\ 8\equiv3
$$

なので

$$
0,\frac25,\frac45,\frac15,\frac35
$$

の順で現れます。
<!-- solution-end -->

### QMC3-A02 双対格子と複素指数平均

$$
N=5,
\qquad
\boldsymbol z=(1,2)
$$

とする。

次の周波数が双対格子に入るか判定し、その複素指数モードの格子平均を求めよ。

1. $\boldsymbol h=(1,2)$
2. $\boldsymbol h=(1,-1)$
3. $\boldsymbol h=(5,0)$

- Level: A

<!-- solution-start -->
#### 詳細解答

双対格子条件は

$$
h_1+2h_2
\equiv0\pmod5
$$

です。

1. $\boldsymbol h=(1,2)$ では

$$
1+2\cdot2
=
5
\equiv0\pmod5.
$$

したがって

$$
(1,2)\in L^\perp.
$$

離散直交性から格子平均は

$$
\boxed{1}.
$$

2. $\boldsymbol h=(1,-1)$ では

$$
1+2(-1)
=
-1
\not\equiv0\pmod5.
$$

したがって

$$
(1,-1)\notin L^\perp
$$

で、格子平均は

$$
\boxed{0}.
$$

3. $\boldsymbol h=(5,0)$ では

$$
5+0
\equiv0\pmod5.
$$

したがって

$$
(5,0)\in L^\perp
$$

で、格子平均は

$$
\boxed{1}.
$$
<!-- solution-end -->

### QMC3-A03 悪い生成ベクトルを関数で検出する

$$
N=5,
\qquad
f(x_1,x_2)
=
\cos
\left(
2\pi(x_1-x_2)
\right)
$$

とする。

1. $I(f)$ を求めよ。
2. $\boldsymbol z=(1,1)$ で $Q_{5,\boldsymbol z}(f)$ を求めよ。
3. $\boldsymbol z=(1,2)$ で $Q_{5,\boldsymbol z}(f)$ を求めよ。
4. 結果を双対格子条件で説明せよ。

- Level: A

<!-- solution-start -->
#### 詳細解答

1. $x_1$ について先に積分すると

$$
\int_0^1
\cos
\left(
2\pi(x_1-x_2)
\right)
dx_1
=
0
$$

です。

従って

$$
\boxed{
I(f)=0.
}
$$

2. $\boldsymbol z=(1,1)$ の格子点は

$$
\left(
\frac n5,\frac n5
\right).
$$

各点で

$$
x_1-x_2=0
$$

なので

$$
f=1.
$$

したがって

$$
\boxed{
Q_{5,(1,1)}(f)=1.
}
$$

3. $f$ は

$$
f
=
\frac12
e^{2\pi i(x_1-x_2)}
+
\frac12
e^{-2\pi i(x_1-x_2)}
$$

です。

周波数は

$$
(1,-1),
\qquad
(-1,1).
$$

$\boldsymbol z=(1,2)$ では

$$
(1,-1)\cdot(1,2)=-1
$$

で法5の0ではありません。

反対符号の周波数も同様に双対格子へ入りません。

従って両モードの格子平均は0で

$$
\boxed{
Q_{5,(1,2)}(f)=0.
}
$$

4. $(1,1)$ では

$$
(1,-1)\cdot(1,1)=0
$$

なので低周波が双対格子へ入り、その Fourier 係数が誤差として丸ごと残りました。

$(1,2)$ では同じ周波数が双対格子から外れるため、格子平均で厳密に消えました。
<!-- solution-end -->

### QMC3-A04 一次元の双対格子と誤差率

一次元で

$$
\gcd(z,N)=1
$$

とする。

1. 双対格子が $N\mathbb Z$ であることを示せ。
2. $\alpha>1/2$ の重み付き周期 Fourier 空間で

$$
e^2
=
\gamma C_\alpha N^{-2\alpha}
$$

を導け。
3. $\alpha=1$ と $\alpha=2$ で、$N$ を2倍にすると最悪誤差が何倍になるか答えよ。

- Level: A

<!-- solution-start -->
#### 詳細解答

1. 双対格子条件は

$$
hz\equiv0\pmod N.
$$

$\gcd(z,N)=1$ なので $z$ は法 $N$ で逆元を持ちます。

両辺へその逆元を掛けると

$$
h\equiv0\pmod N.
$$

従って

$$
\boxed{
L^\perp(z,N)=N\mathbb Z.
}
$$

2. 非零双対周波数は

$$
h=mN,
\qquad
m\in\mathbb Z\setminus\{0\}
$$

です。

一次元では

$$
r_{\alpha,\gamma}(h)^{-1}
=
\gamma|h|^{-2\alpha}
$$

なので

$$
\begin{aligned}
e^2
&=
\sum_{m\ne0}
\gamma|mN|^{-2\alpha}
\\
&=
\gamma N^{-2\alpha}
\sum_{m\ne0}|m|^{-2\alpha}
\\
&=
\boxed{
\gamma C_\alpha N^{-2\alpha}
}.
\end{aligned}
$$

3. 最悪誤差は

$$
e
=
\sqrt{\gamma C_\alpha}
N^{-\alpha}.
$$

$N$ を $2N$ にすると比は

$$
\frac{e(2N)}{e(N)}
=
2^{-\alpha}.
$$

したがって

$$
\alpha=1
\quad\Rightarrow\quad
\boxed{\frac12},
$$

$$
\alpha=2
\quad\Rightarrow\quad
\boxed{\frac14}.
$$
<!-- solution-end -->

## Level B

### QMC3-B01 三角多項式の格子誤差公式を導く

有限集合 $F\subset\mathbb Z^s$ と

$$
T(\boldsymbol x)
=
\sum_{\boldsymbol h\in F}
\widehat T(\boldsymbol h)
e^{2\pi i\boldsymbol h\cdot\boldsymbol x}
$$

を考える。

1. $I(T)=\widehat T(\boldsymbol0)$ を示せ。
2. 格子平均へ $T$ を代入し、離散直交性を用いて

$$
Q_{N,\boldsymbol z}(T)
=
\sum_{\boldsymbol h\in F\cap L^\perp}
\widehat T(\boldsymbol h)
$$

を示せ。
3. 積分誤差公式を導け。

- Level: B

<!-- solution-start -->
#### 詳細解答

1. 有限和なので積分と和を交換できます。

$$
I(T)
=
\sum_{\boldsymbol h\in F}
\widehat T(\boldsymbol h)
\int_{[0,1)^s}
e^{2\pi i\boldsymbol h\cdot\boldsymbol x}
d\boldsymbol x.
$$

$\boldsymbol h=\boldsymbol0$ なら積分は1です。

$\boldsymbol h\ne\boldsymbol0$ なら、少なくとも一つの座標 $j$ で $h_j\ne0$ です。

その座標について

$$
\int_0^1
e^{2\pi ih_jx_j}
dx_j
=
\left[
\frac{e^{2\pi ih_jx_j}}{2\pi ih_j}
\right]_0^1
=
0.
$$

従って

$$
\boxed{
I(T)=\widehat T(\boldsymbol0).
}
$$

2. 格子平均は

$$
\begin{aligned}
Q_{N,\boldsymbol z}(T)
&=
\frac1N
\sum_{n=0}^{N-1}
\sum_{\boldsymbol h\in F}
\widehat T(\boldsymbol h)
e^{2\pi i\boldsymbol h\cdot n\boldsymbol z/N}
\\
&=
\sum_{\boldsymbol h\in F}
\widehat T(\boldsymbol h)
\left[
\frac1N
\sum_{n=0}^{N-1}
e^{2\pi in\boldsymbol h\cdot\boldsymbol z/N}
\right].
\end{aligned}
$$

角括弧は離散直交性から

$$
\begin{cases}
1,&\boldsymbol h\in L^\perp,\\
0,&\boldsymbol h\notin L^\perp.
\end{cases}
$$

です。

したがって

$$
\boxed{
Q_{N,\boldsymbol z}(T)
=
\sum_{\boldsymbol h\in F\cap L^\perp}
\widehat T(\boldsymbol h).
}
$$

3. $\boldsymbol0\in L^\perp$ なので

$$
\begin{aligned}
Q_{N,\boldsymbol z}(T)-I(T)
&=
\sum_{\boldsymbol h\in F\cap L^\perp}
\widehat T(\boldsymbol h)
-
\widehat T(\boldsymbol0)
\\
&=
\boxed{
\sum_{\substack{
\boldsymbol h\in F\cap L^\perp
\\
\boldsymbol h\ne\boldsymbol0
}}
\widehat T(\boldsymbol h)
}.
\end{aligned}
$$
<!-- solution-end -->

### QMC3-B02 Fourier 重みから最悪誤差を導く

$\mathcal H_{\alpha,\boldsymbol\gamma}^{\mathrm{per}}$ で

$$
S
=
\sum_{\substack{
\boldsymbol h\in L^\perp(\boldsymbol z,N)
\\
\boldsymbol h\ne0
}}
r_{\alpha,\boldsymbol\gamma}(\boldsymbol h)^{-1}
$$

とする。

1. 任意の $\|f\|\le1$ に対して

$$
|Q_{N,\boldsymbol z}(f)-I(f)|
\le
\sqrt S
$$

を示せ。
2. 等号を達成する Fourier 係数列を構成せよ。
3. その係数列が実数値周期関数を与える理由を説明せよ。

- Level: B

<!-- solution-start -->
#### 詳細解答

1. 格子誤差公式から

$$
E(f)
=
\sum_{\substack{
\boldsymbol h\in L^\perp
\\
\boldsymbol h\ne0
}}
\widehat f(\boldsymbol h).
$$

各項へ

$$
1
=
\sqrt{r(\boldsymbol h)}
\frac1{\sqrt{r(\boldsymbol h)}}
$$

を入れ、[Cauchy--Schwarz の不等式](../F0_00E2_Cauchy_Schwarz_Bessel_Parseval/index.md#thm-f0-00e2-cauchy-schwarz)を使うと

$$
\begin{aligned}
|E(f)|
&\le
\left[
\sum_{\substack{
\boldsymbol h\in L^\perp
\\
\boldsymbol h\ne0
}}
|\widehat f(\boldsymbol h)|^2r(\boldsymbol h)
\right]^{1/2}
\\
&\quad\times
\left[
\sum_{\substack{
\boldsymbol h\in L^\perp
\\
\boldsymbol h\ne0
}}
r(\boldsymbol h)^{-1}
\right]^{1/2}
\\
&\le
\|f\|\sqrt S.
\end{aligned}
$$

$\|f\|\le1$ だから

$$
\boxed{
|E(f)|\le\sqrt S.
}
$$

2. $S>0$ とします。

$$
\widehat f_\ast(\boldsymbol h)
=
\begin{cases}
S^{-1/2}r(\boldsymbol h)^{-1},
&
\boldsymbol h\in L^\perp,\ \boldsymbol h\ne0,
\\
0,
&
\text{otherwise}
\end{cases}
$$

とします。

すると

$$
\begin{aligned}
\|f_\ast\|^2
&=
S^{-1}
\sum_{\substack{
\boldsymbol h\in L^\perp
\\
\boldsymbol h\ne0
}}
r(\boldsymbol h)^{-1}
\\
&=1.
\end{aligned}
$$

また

$$
E(f_\ast)
=
S^{-1/2}
\sum_{\substack{
\boldsymbol h\in L^\perp
\\
\boldsymbol h\ne0
}}
r(\boldsymbol h)^{-1}
=
\boxed{\sqrt S}.
$$

したがって上界は達成されます。

3. 双対格子は

$$
\boldsymbol h\in L^\perp
\quad\Longrightarrow\quad
-\boldsymbol h\in L^\perp
$$

です。

また重みは絶対値だけで定まるため

$$
r(-\boldsymbol h)=r(\boldsymbol h).
$$

従って

$$
\widehat f_\ast(-\boldsymbol h)
=
\widehat f_\ast(\boldsymbol h)
=
\overline{\widehat f_\ast(\boldsymbol h)}.
$$

Fourier 係数が共役対称なので、対応する Fourier 級数は実数値になります。
<!-- solution-end -->

### QMC3-B03 生成ベクトルを正規化する

$$
N=7,
\qquad
\boldsymbol z=(3,5,1)
$$

とする。

1. $3$ の法7における逆元を求めよ。
2. その逆元を $\boldsymbol z$ 全体へ掛け、新しい生成ベクトルを法7で求めよ。
3. 新旧の生成ベクトルが同じ点集合を与えることを説明せよ。
4. この正規化が CBC の探索数をどう減らすか説明せよ。

- Level: B

<!-- solution-start -->
#### 詳細解答

1. 法7で

$$
3\cdot5=15\equiv1\pmod7.
$$

従って $3$ の逆元は

$$
\boxed{5}.
$$

2. 全成分へ5を掛けると

$$
5(3,5,1)
=
(15,25,5).
$$

法7で

$$
15\equiv1,
\qquad
25\equiv4,
\qquad
5\equiv5.
$$

したがって

$$
\boxed{
\boldsymbol z'=(1,4,5).
}
$$

3. $\gcd(5,7)=1$ なので

$$
n\mapsto5n\pmod7
$$

は $0,\ldots,6$ を重複なく一度ずつ取る並べ替えです。

したがって

$$
\left\{
\left\{
\frac{n(5\boldsymbol z)}7
\right\}
:
n=0,\ldots,6
\right\}
$$

は元の点集合の順番を変えただけです。

よって

$$
\boxed{
P_7(1,4,5)
=
P_7(3,5,1).
}
$$

4. 素数 $N$ で第一成分が非零なら常に

$$
z_1=1
$$

へ正規化できます。

そのため第一成分について $N-1$ 個を探索する必要がありません。

CBC は最初から $z_1=1$ と固定し、第二成分以降だけを順に選べます。
<!-- solution-end -->

## Level C

### QMC3-C01 小さな CBC を手で実行する

$$
N=5
$$

とし、第一成分を

$$
z_1=1
$$

に固定する。

二次元の候補

$$
z_2\in\{1,2,3,4\}
$$

を比較する。

手計算用に低周波集合

$$
H
=
\{-1,0,1\}^2
\setminus\{(0,0)\}
$$

と、切断基準

$$
R_H(z_2)
=
\sum_{\substack{
\boldsymbol h\in H
\\
h_1+z_2h_2\equiv0\pmod5
}}
1
$$

を定める。

1. 各 $z_2=1,2,3,4$ について、条件を満たす $\boldsymbol h\in H$ をすべて列挙せよ。
2. $R_H(z_2)$ を計算し、この切断基準で CBC が選ぶ候補を求めよ。
3. $z_2=1$ が悪い理由を、具体的な周期関数で示せ。
4. この有限切断基準で最小になったからといって、真の最悪誤差も大域最小だとは限らない理由を説明せよ。
5. 真の CBC では何を最小化するか答えよ。

- Level: C

<!-- solution-start -->
#### 詳細解答

$H$ の非零ベクトルは

$$
(-1,-1),\ (-1,0),\ (-1,1),
$$

$$
(0,-1),\ (0,1),
$$

$$
(1,-1),\ (1,0),\ (1,1)
$$

の8個です。

条件は

$$
h_1+z_2h_2
\equiv0\pmod5
$$

です。

### 1. 各候補を調べる

#### $z_2=1$

条件は

$$
h_1+h_2\equiv0\pmod5.
$$

$h_1,h_2\in\{-1,0,1\}$ なので和は $-2$ から $2$ です。

法5で0になるには、この範囲では実際に0でなければなりません。

非零ベクトルでは

$$
(1,-1),
\qquad
(-1,1)
$$

の2個です。

したがって

$$
\boxed{
R_H(1)=2.
}
$$

#### $z_2=2$

条件は

$$
h_1+2h_2\equiv0\pmod5.
$$

$h_2=0$ なら $h_1=0$ が必要ですが、$(0,0)$ は除外されています。

$h_2=1$ なら

$$
h_1+2\in\{1,2,3\}
$$

で0ではありません。

$h_2=-1$ なら

$$
h_1-2\in\{-3,-2,-1\}
$$

で、法5の0でもありません。

したがって該当なしで

$$
\boxed{
R_H(2)=0.
}
$$

#### $z_2=3$

条件は

$$
h_1+3h_2\equiv0\pmod5.
$$

$h_2=0$ なら非零解なしです。

$h_2=1$ なら

$$
h_1+3\in\{2,3,4\}
$$

で0ではありません。

$h_2=-1$ なら

$$
h_1-3\in\{-4,-3,-2\}
$$

で、法5の0ではありません。

したがって

$$
\boxed{
R_H(3)=0.
}
$$

#### $z_2=4$

法5で $4\equiv-1$ なので条件は

$$
h_1-h_2\equiv0\pmod5.
$$

この範囲では $h_1=h_2$ が必要です。

非零解は

$$
(1,1),
\qquad
(-1,-1)
$$

です。

したがって

$$
\boxed{
R_H(4)=2.
}
$$

### 2. CBC の選択

結果は

$$
R_H(1)=2,
\qquad
R_H(2)=0,
\qquad
R_H(3)=0,
\qquad
R_H(4)=2.
$$

従ってこの切断基準では

$$
\boxed{
z_2=2
\quad\text{または}\quad
z_2=3
}
$$

が最小です。

### 3. $z_2=1$ の失敗を具体化する

関数

$$
f(x_1,x_2)
=
\cos
\left(
2\pi(x_1-x_2)
\right)
$$

を取ります。

積分は0です。

一方 $\boldsymbol z=(1,1)$ では全格子点で $x_1=x_2$ なので

$$
f=1.
$$

したがって

$$
Q_{5,(1,1)}(f)=1
$$

で、誤差は1です。

これは低周波

$$
(1,-1)
$$

が双対格子へ入ったためです。

### 4. 有限切断だけでは大域最適性を保証しない

$R_H$ は

$$
|h_1|,|h_2|\le1
$$

の非常に低い周波数しか見ていません。

$z_2=2$ と $z_2=3$ のどちらにも、この範囲の非零双対ベクトルはありません。

しかしより高い周波数まで見ると、それぞれ異なる双対ベクトルが現れます。

さらに真の最悪誤差では、各周波数を単に1個と数えるのではなく

$$
r_{\alpha,\boldsymbol\gamma}(\boldsymbol h)^{-1}
$$

という重みを付けます。

したがって

$$
R_H(z_2)=0
$$

だけから、真の最悪誤差が0とも、大域最小とも結論できません。

### 5. 真の CBC の目的関数

$d$ 次元までの生成ベクトルに対して

$$
\boxed{
R_d(\boldsymbol z^{(d)})
=
\sum_{\substack{
\boldsymbol h\in
L^\perp(\boldsymbol z^{(d)},N)
\\
\boldsymbol h\ne0
}}
r_{\alpha,\boldsymbol\gamma^{(d)}}(\boldsymbol h)^{-1}
}
$$

を最小化します。

これは本章の重み付き周期 Fourier 空間における

$$
\boxed{
e(Q_{N,\boldsymbol z^{(d)}})^2
}
$$

そのものです。

有限切断例は、この無限和の中で「低周波を双対格子から追い出す」という CBC の幾何を手で見える形にしたものです。
<!-- solution-end -->

---

## 12. まとめ

QMC3 の核心は、ランク1格子の規則性を弱点ではなく設計変数へ変えることです。

1. 生成ベクトル $\boldsymbol z$ から $N$ 点を作る。
2. 双対格子

$$
L^\perp(\boldsymbol z,N)
=
\{
\boldsymbol h:
\boldsymbol h\cdot\boldsymbol z
\equiv0\pmod N
\}
$$

を考える。
3. 格子平均では双対格子上の Fourier モードだけが残る。
4. したがって積分誤差は非零双対周波数の Fourier 係数だけで決まる。
5. 周期 Fourier 空間では最悪誤差平方が

$$
\sum_{\boldsymbol h\in L^\perp\setminus\{0\}}
r(\boldsymbol h)^{-1}
$$

と完全に書ける。
6. CBC はこの量を座標ごとに小さくするよう生成ベクトルを構成する。

QMC2 では「よい点集合が存在する」ことを関数空間から証明しました。

QMC3 では

$$
\boxed{
\text{双対格子を制御して点集合を構成する}
}
$$

ところまで進みました。

次の QMC4 では、格子とは別の代数的構成である $(t,m,s)$ 型のデジタル点集合と $(t,s)$ 型のデジタル列へ進みます。
