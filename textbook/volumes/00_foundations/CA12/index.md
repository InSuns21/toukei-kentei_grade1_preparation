# CA12 標準複素解析 XII：Riemann ζ 関数・theta 変換・解析接続・関数等式

> **複素解析 II の終章**。本章では、正整数上の級数から始まる Riemann ζ 関数が、素数の積、Gaussian の Fourier 変換、Gamma 関数、解析接続を一本の線で結ぶことを見る。中心は「既知の関数等式を使う」ことではない。Gaussian を周期化して theta 変換を作り、その Mellin 積分を $t=1$ で分割することで、解析接続・極・対称性・自明零点を同じ構成から導く。

<!-- definition-example-audit: strict -->

## 0. この章の主線

Gamma 関数は [CA11](../CA11/index.md#def-ca11-gamma-function)、無限積の非消滅性は [CA10](../CA10/index.md#thm-ca10-infinite-product-criterion)、Gaussian の Fourier 変換は [FOU3](../FOU3/index.md#lem-fou3-gaussian-transform)、周期関数の Fourier 級数収束は [FOU2](../FOU2/index.md#thm-fou2-dirichlet-convergence)、積分と総和の交換は [Fubini の定理](../F0_00D2C_積測度_Tonelli_Fubini/index.md#thm-f0-00d2c-02)を正本とする。

~~~text
Dirichlet 級数
  ↓ 局所一様絶対収束
右半平面で正則
  ↓ 一意分解
Euler 積
  ↓
素数と複素関数が接続
  ↓
Gaussian の周期化
  ↓ Fourier 係数を計算
theta 変換
  ↓ Mellin 積分
完成 zeta 因子
  ↓ t=1 で分割
解析接続 + s=1 の極
  ↓ s ↔ 1-s の対称性
関数等式
  ↓
自明零点・特殊値
~~~

素数定理、$\Re s=1$ 上の零点不存在、零点密度評価、Riemann--von Mangoldt 公式、L 関数、モジュラー形式、Riemann 予想の証明論は本章の停止線より先に置く。

---

## 1. 正整数上の級数を複素変数へ延ばす

<a id="def-ca12-riemann-zeta"></a>
<!-- formal-statement-start -->
### 定義（Riemann ζ 関数）

$\Re s>1$ に対して

$$
\zeta(s)
=
\sum_{n=1}^{\infty}n^{-s},
\qquad
n^{-s}:=e^{-s\log n}
$$

と定める。
<!-- formal-statement-end -->

<!-- definition-example-start: def-ca12-riemann-zeta -->
**定義の確認**。$s=2$ なら

$$
\zeta(2)
=
1+\frac1{2^2}+\frac1{3^2}+\cdots
$$

であり、絶対収束する。一般に $s=\sigma+i\tau$ なら

$$
|n^{-s}|=n^{-\sigma}
$$

なので、収束を決めるのはまず実部 $\sigma$ である。
<!-- definition-example-end -->

<a id="thm-ca12-zeta-holomorphic"></a>
<!-- formal-statement-start -->
### 定理（Riemann ζ 関数の右半平面での正則性）

Dirichlet 級数

$$
\sum_{n=1}^{\infty}n^{-s}
$$

は半平面 $\Re s>1$ の各コンパクト集合上で一様絶対収束する。従って $\zeta$ は $\Re s>1$ で正則である。
<!-- formal-statement-end -->

<!-- proof-start -->
### 証明

コンパクト集合

$$
K\subset\{s\in\mathbb C:\Re s>1\}
$$

を固定する。ある $\delta>0$ が存在して

$$
\Re s\ge1+\delta
\qquad(s\in K)
$$

とできる。従って

$$
|n^{-s}|
=
n^{-\Re s}
\le
n^{-1-\delta}.
$$

右辺の級数は収束するので Weierstrass の M 判定法から、Dirichlet 級数は $K$ 上一様絶対収束する。各項 $n^{-s}=e^{-s\log n}$ は $s$ の整関数だから、[正則関数列の局所一様極限](../CA7/index.md#thm-ca7-holomorphic-locally-uniform-limit)により極限 $\zeta$ は $\Re s>1$ で正則である。$\square$
<!-- proof-end -->

ここで「各点で収束する」だけでは正則性は出ない。コンパクト集合上一様収束まで上げることが、CA7 で学んだ正則関数列の理論を使う条件である。

---

## 2. 正整数の一意分解が Euler 積になる

<a id="thm-ca12-euler-product"></a>
<!-- formal-statement-start -->
### 定理（Euler 積と零点不存在）

$\Re s>1$ で

$$
\boxed{
\zeta(s)
=
\prod_{p\ {\rm prime}}
\left(1-p^{-s}\right)^{-1}
}
$$

が成り立つ。またこの半平面で

$$
\zeta(s)\ne0.
$$
<!-- formal-statement-end -->

<!-- proof-start -->
### 証明

まず有限個の素数 $p\le P$ だけを使う。有限積なので各幾何級数を掛け合わせてよく、

$$
\prod_{p\le P}(1-p^{-s})^{-1}
=
\prod_{p\le P}
\left(
1+p^{-s}+p^{-2s}+\cdots
\right).
$$

右辺を展開すると、現れる項は $n^{-s}$ であり、$n$ の素因数が全て $P$ 以下である正整数 $n$ がちょうど一度ずつ現れる。ここで正整数の素因数分解の一意性を使った。

$s=\sigma+i\tau$, $\sigma>1$ とすると

$$
\sum_{n=1}^{\infty}|n^{-s}|
=
\sum_{n=1}^{\infty}n^{-\sigma}
<\infty.
$$

従って $P\to\infty$ とすれば、有限 Euler 積の展開は絶対収束する全 Dirichlet 級数へ収束し、

$$
\zeta(s)
=
\prod_p(1-p^{-s})^{-1}
$$

を得る。

零点不存在を確認する。コンパクト集合 $K\subset\{\Re s>1\}$ では、ある $\delta>0$ により

$$
\sum_p\sup_{s\in K}|p^{-s}|
\le
\sum_{n=2}^{\infty}n^{-1-\delta}
<\infty.
$$

従って [無限積の局所一様収束判定](../CA10/index.md#thm-ca10-infinite-product-criterion)を $u_p(s)=-p^{-s}$ に適用すると

$$
\prod_p(1-p^{-s})
$$

は局所一様収束し、各因子が非零なので極限も非零である。その逆数である $\zeta(s)$ も零点を持たない。$\square$
<!-- proof-end -->

**直接例**。$s=2$ で最初の三素数だけ使うと

$$
\frac1{1-2^{-2}}
\frac1{1-3^{-2}}
\frac1{1-5^{-2}}
=
\frac43\cdot\frac98\cdot\frac{25}{24}
=
\frac{25}{16}
=
1.5625.
$$

真の値 $\zeta(2)=\pi^2/6\approx1.644934$ へ、素数を増やすごとに近づいていく。

---

## 3. 交代級数は $\Re s>0$ まで先に進める

<a id="def-ca12-dirichlet-eta"></a>
<!-- formal-statement-start -->
### 定義（Dirichlet eta 関数）

$\Re s>0$ に対して形式的に

$$
\eta(s)
=
\sum_{n=1}^{\infty}
(-1)^{n-1}n^{-s}
$$

を考える。
<!-- formal-statement-end -->

<!-- definition-example-start: def-ca12-dirichlet-eta -->
**定義の確認**。実数 $s>0$ では

$$
1-2^{-s}+3^{-s}-4^{-s}+\cdots
$$

は通常の交代級数である。しかし複素 $s$ では $n^{-s}$ 自体が位相を持つため、実数版の「単調減少だから収束」をそのまま使わず、部分和評価で確認する。
<!-- definition-example-end -->

<a id="prop-ca12-eta-holomorphic"></a>
<!-- formal-statement-start -->
### 命題（Dirichlet eta 関数の右半平面での正則性）

eta 級数は $\Re s>0$ の各コンパクト集合上で一様収束し、そこで正則関数を定める。また $\Re s>1$ では

$$
\boxed{
\eta(s)
=
\left(1-2^{1-s}\right)\zeta(s)
}
$$

が成り立つ。
<!-- formal-statement-end -->

<!-- proof-start -->
### 証明

コンパクト集合 $K\subset\{\Re s>0\}$ を取り、

$$
\Re s\ge\delta>0,
\qquad
|s|\le M
$$

とする。交代符号の部分和

$$
A_N=\sum_{n=1}^{N}(-1)^{n-1}
$$

は $|A_N|\le1$ を満たす。

Abel の部分和変換により、$N\le L$ で

$$
\sum_{n=N}^{L}(-1)^{n-1}n^{-s}
$$

の絶対値は、端点項と

$$
\sum_{n=N}^{L-1}
|A_n|\,
|n^{-s}-(n+1)^{-s}|
$$

で抑えられる。実変数 $x$ に対して $x^{-s}=e^{-s\log x}$ だから

$$
n^{-s}-(n+1)^{-s}
=
s\int_n^{n+1}x^{-s-1}\,dx.
$$

従って

$$
|n^{-s}-(n+1)^{-s}|
\le
M\int_n^{n+1}x^{-\delta-1}\,dx.
$$

尾部は $K$ 上一様に $O(N^{-\delta})$ となる。よって eta 級数は $K$ 上一様収束し、各項が整関数なので $\eta$ は $\Re s>0$ で正則である。

$\Re s>1$ では絶対収束するので奇数項と偶数項を分けてよい。

$$
\eta(s)
=
\sum_{n\ge1}n^{-s}
-
2\sum_{m\ge1}(2m)^{-s}
=
\zeta(s)-2^{1-s}\zeta(s).
$$

従って

$$
\eta(s)
=
(1-2^{1-s})\zeta(s).
$$

$\square$
<!-- proof-end -->

eta 関数は解析接続の「入口」を見せるが、本章の主証明には使わない。$1-2^{1-s}$ 自身が零点を持つため、これだけで全平面への解析接続を一気に作るより、theta 変換を使う方が関数等式まで同時に得られる。

---

## 4. Gaussian を周期化する

<a id="def-ca12-jacobi-theta"></a>
<!-- formal-statement-start -->
### 定義（Jacobi theta 関数）

$t>0$ に対して

$$
\theta(t)
=
\sum_{n\in\mathbb Z}e^{-\pi n^2t}
=
1+2\sum_{n=1}^{\infty}e^{-\pi n^2t}
$$

と定める。
<!-- formal-statement-end -->

<!-- definition-example-start: def-ca12-jacobi-theta -->
**定義の確認**。固定した $t>0$ では

$$
0<e^{-\pi n^2t}\le e^{-\pi n t}
\qquad(n\ge1)
$$

なので級数は絶対収束する。特に

$$
\theta(1)
=
1+2e^{-\pi}+2e^{-4\pi}+\cdots
$$

は有限で、後で得る変換公式では $t=1$ が自己双対点になる。
<!-- definition-example-end -->

theta 変換を一般 Poisson 和公式の一行引用で済ませない。Gaussian に必要な場合だけを、周期化した関数の Fourier 係数から作る。

$t>0$ を固定し、

$$
P_t(x)
=
\sum_{n\in\mathbb Z}
e^{-\pi t(x+n)^2}
$$

と置く。$x$ を有界区間に制限すると Gaussian tail により級数も微分級数も一様収束するので $P_t$ は $C^1$ 級の1周期関数である。

<a id="thm-ca12-theta-transformation"></a>
<!-- formal-statement-start -->
### 定理（theta 変換）

全ての $t>0$ に対して

$$
\boxed{
\theta(t)
=
t^{-1/2}\theta(1/t)
}
$$

が成り立つ。
<!-- formal-statement-end -->

<!-- proof-start -->
### 証明

1周期関数 $P_t$ の複素 Fourier 係数を

$$
c_k
=
\int_0^1P_t(x)e^{-2\pi ikx}\,dx
$$

とする。

$P_t$ の級数は $[0,1]$ 上一様絶対収束するので和と積分を交換できる。

$$
c_k
=
\sum_{n\in\mathbb Z}
\int_0^1
e^{-\pi t(x+n)^2}
e^{-2\pi ikx}\,dx.
$$

$u=x+n$ と置く。$k,n\in\mathbb Z$ なので

$$
e^{-2\pi ikx}
=
e^{-2\pi ik(u-n)}
=
e^{-2\pi iku}.
$$

区間 $[n,n+1]$ を全てつなげると

$$
c_k
=
\int_{\mathbb R}
e^{-\pi tu^2}e^{-2\pi iku}\,du.
$$

[Gaussian の Fourier 変換](../FOU3/index.md#lem-fou3-gaussian-transform)へ $a=\pi t$, $\xi=2\pi k$ を代入すると

$$
c_k
=
t^{-1/2}
e^{-\pi k^2/t}.
$$

$P_t$ は $C^1$ 級なので、[Dirichlet の点ごとの極限定理](../FOU2/index.md#thm-fou2-dirichlet-convergence)を周期1へ尺度変換して適用できる。従って

$$
P_t(x)
=
\sum_{k\in\mathbb Z}
t^{-1/2}e^{-\pi k^2/t}e^{2\pi ikx}.
$$

$x=0$ とすると、左辺は $P_t(0)=\theta(t)$、右辺は

$$
t^{-1/2}
\sum_{k\in\mathbb Z}e^{-\pi k^2/t}
=
t^{-1/2}\theta(1/t).
$$

従って

$$
\theta(t)=t^{-1/2}\theta(1/t).
$$

$\square$
<!-- proof-end -->

この証明で FOU3 は Gaussian が Fourier 変換で Gaussian に戻ることを担当し、FOU2 は周期化した関数がその Fourier 級数へ戻ることを担当している。

---

## 5. Mellin 積分が ζ と Gamma をつなぐ

<a id="thm-ca12-mellin-representation"></a>
<!-- formal-statement-start -->
### 定理（theta Mellin 表現）

$\Re s>1$ で

$$
\boxed{
\pi^{-s/2}
\Gamma(s/2)\zeta(s)
=
\frac12
\int_0^\infty
\left(\theta(t)-1\right)
t^{s/2-1}\,dt
}
$$

が成り立つ。
<!-- formal-statement-end -->

<!-- proof-start -->
### 証明

$\sigma=\Re s>1$ とする。

$$
\theta(t)-1
=
2\sum_{n=1}^{\infty}e^{-\pi n^2t}.
$$

まず絶対値を取った積分を調べる。

$$
2\sum_{n=1}^{\infty}
\int_0^\infty
e^{-\pi n^2t}
t^{\sigma/2-1}\,dt.
$$

$u=\pi n^2t$ と置くと

$$
\int_0^\infty
e^{-\pi n^2t}
t^{\sigma/2-1}\,dt
=
\pi^{-\sigma/2}n^{-\sigma}
\Gamma(\sigma/2).
$$

従って全体は

$$
2\pi^{-\sigma/2}
\Gamma(\sigma/2)
\zeta(\sigma)
<\infty.
$$

よって [Fubini の定理](../F0_00D2C_積測度_Tonelli_Fubini/index.md#thm-f0-00d2c-02)により和と積分を交換できる。

$$
\begin{aligned}
\frac12
\int_0^\infty
(\theta(t)-1)t^{s/2-1}\,dt
&=
\sum_{n=1}^{\infty}
\int_0^\infty
e^{-\pi n^2t}t^{s/2-1}\,dt\\
&=
\sum_{n=1}^{\infty}
(\pi n^2)^{-s/2}
\Gamma(s/2)\\
&=
\pi^{-s/2}
\Gamma(s/2)\zeta(s).
\end{aligned}
$$

$\square$
<!-- proof-end -->

ここで $\Gamma$ は単なる記号合わせではない。変数変換 $u=\pi n^2t$ が $n^{-s}$ を作るため、Dirichlet 級数が Mellin 型積分へ移る。

---

## 6. $t=1$ で分けると解析接続が見える

まず

$$
\Lambda(s)
=
\pi^{-s/2}\Gamma(s/2)\zeta(s)
$$

と書く。前節では $\Re s>1$ で定義された。

Mellin 積分を

$$
\int_0^\infty
=
\int_0^1+\int_1^\infty
$$

と分ける。小さい $t$ 側で theta 変換を使う。

$$
\theta(t)
=
t^{-1/2}\theta(1/t).
$$

$u=1/t$ と置くと

$$
\int_0^1
(\theta(t)-1)t^{s/2-1}\,dt
$$

は

$$
\int_1^\infty
(\theta(u)-1)
u^{(1-s)/2-1}\,du
+
\frac{2}{s-1}
-
\frac{2}{s}
$$

へ変形される。従って $\Re s>1$ で

$$
\boxed{
\Lambda(s)
=
H(s)
+
\frac1{s-1}
-
\frac1s
}
$$

ただし

$$
H(s)
=
\frac12
\int_1^\infty
(\theta(t)-1)
\left(
t^{s/2-1}
+
t^{(1-s)/2-1}
\right)\,dt.
$$

$t\ge1$ では

$$
0<\theta(t)-1
=
2\sum_{n=1}^{\infty}e^{-\pi n^2t}
\le
C e^{-\pi t}
$$

と指数減衰する。従って $s$ を任意のコンパクト集合に制限しても integrand は

$$
C_K e^{-\pi t}(t^A+t^B)
$$

型の可積分関数で抑えられる。よって $H(s)$ は全平面で整関数である。

<a id="thm-ca12-meromorphic-continuation"></a>
<!-- formal-statement-start -->
### 定理（Riemann ζ 関数の有理型解析接続）

Riemann ζ 関数は全平面へ有理型に解析接続される。その唯一の極は $s=1$ の単純極で、

$$
\boxed{
\operatorname{Res}(\zeta,1)=1
}
$$

である。
<!-- formal-statement-end -->

<!-- proof-start -->
### 証明

上で得た

$$
\Lambda(s)
=
H(s)+\frac1{s-1}-\frac1s
$$

を右辺によって全平面へ有理型に延長する。$H$ は整関数なので、$\Lambda$ の可能な極は $s=0,1$ の単純極だけである。

一方

$$
\zeta(s)
=
\frac{\pi^{s/2}}{\Gamma(s/2)}
\Lambda(s).
$$

[逆 Gamma 関数の Weierstrass 積](../CA11/index.md#thm-ca11-reciprocal-product)から $1/\Gamma(s/2)$ は整関数で、$s=0,-2,-4,\ldots$ に単純零点を持つ。従って $s=0$ では $\Lambda$ の単純極が $1/\Gamma(s/2)$ の単純零点で打ち消され、$\zeta$ は正則になる。負の偶数でも新しい極は生じない。

$s=1$ では $\Gamma(1/2)=\sqrt\pi$ だから、

$$
\operatorname{Res}_{s=1}\zeta(s)
=
\frac{\pi^{1/2}}{\Gamma(1/2)}
\operatorname{Res}_{s=1}\Lambda(s)
=
1.
$$

従って唯一の極は $s=1$ の単純極で、留数は1である。$\square$
<!-- proof-end -->

解析接続の核心は「小さい $t$ が危険だから捨てる」ことではない。theta 変換によって小さい $t$ の情報を大きい $t$ へ送り返し、発散部分だけを

$$
\frac1{s-1}-\frac1s
$$

として明示的に取り出した点にある。

---

## 7. 完成 zeta 因子の対称性

<a id="def-ca12-completed-zeta"></a>
<!-- formal-statement-start -->
### 定義（完成 zeta 因子と Riemann xi 関数）

有理型関数

$$
\Lambda(s)
=
\pi^{-s/2}\Gamma(s/2)\zeta(s)
$$

を完成 zeta 因子と呼ぶ。

さらに

$$
\xi(s)
=
\frac12s(s-1)\Lambda(s)
$$

を Riemann xi 関数と呼ぶ。
<!-- formal-statement-end -->

<!-- definition-example-start: def-ca12-completed-zeta -->
**定義の確認**。$\Lambda$ は $s=0,1$ に単純極を持つが、係数 $s(s-1)$ がその二つを打ち消すので $\xi$ は全平面で整関数になる。つまり $\xi$ は関数等式の対称性を極なしで保持するための整関数化である。
<!-- definition-example-end -->

上の $H(s)$ は定義から

$$
H(1-s)=H(s)
$$

を満たす。また

$$
\frac1{(1-s)-1}-\frac1{1-s}
=
-\frac1s+\frac1{s-1}.
$$

従って

$$
\boxed{
\Lambda(s)=\Lambda(1-s)
}
$$

が全平面で有理型関数として成立する。さらに

$$
\xi(s)=\xi(1-s).
$$

<a id="thm-ca12-functional-equation"></a>
<!-- formal-statement-start -->
### 定理（Riemann ζ 関数の関数等式）

有理型関数の恒等式として

$$
\boxed{
\pi^{-s/2}\Gamma(s/2)\zeta(s)
=
\pi^{-(1-s)/2}
\Gamma((1-s)/2)\zeta(1-s)
}
$$

が成り立つ。

同値に、

$$
\boxed{
\zeta(s)
=
2^s\pi^{s-1}
\sin\left(\frac{\pi s}{2}\right)
\Gamma(1-s)\zeta(1-s)
}
$$

が成り立つ。
<!-- formal-statement-end -->

<!-- proof-start -->
### 証明

第一式は直前に得た

$$
\Lambda(s)=\Lambda(1-s)
$$

そのものである。

第一式を $\zeta(s)$ について解くと

$$
\zeta(s)
=
\pi^{s-1/2}
\frac{\Gamma((1-s)/2)}
{\Gamma(s/2)}
\zeta(1-s).
$$

[Legendre の倍角公式](../CA11/index.md#thm-ca11-legendre-duplication)へ

$$
z=\frac{1-s}{2}
$$

を代入すると

$$
\Gamma((1-s)/2)
\Gamma(1-s/2)
=
2^s\sqrt\pi\,\Gamma(1-s).
$$

また [Euler の反射公式](../CA11/index.md#thm-ca11-reflection)へ $z=s/2$ を代入すると

$$
\Gamma(s/2)\Gamma(1-s/2)
=
\frac{\pi}{\sin(\pi s/2)}.
$$

二式を組み合わせて

$$
\frac{\Gamma((1-s)/2)}
{\Gamma(s/2)}
=
2^s\pi^{-1/2}
\sin\left(\frac{\pi s}{2}\right)
\Gamma(1-s).
$$

これを代入すれば

$$
\zeta(s)
=
2^s\pi^{s-1}
\sin\left(\frac{\pi s}{2}\right)
\Gamma(1-s)\zeta(1-s)
$$

を得る。$\square$
<!-- proof-end -->

---

## 8. 自明零点と critical strip

<a id="cor-ca12-trivial-zeros"></a>
<!-- formal-statement-start -->
### 系（自明零点）

正整数 $m\ge1$ に対して

$$
\boxed{
\zeta(-2m)=0
}
$$

である。
<!-- formal-statement-end -->

<!-- proof-start -->
### 証明

関数等式へ $s=-2m$ を代入する。すると

$$
\sin\left(\frac{\pi s}{2}\right)
=
\sin(-m\pi)
=
0.
$$

一方、

$$
\Gamma(1-s)=\Gamma(1+2m)
$$

は有限で非零であり、

$$
\zeta(1-s)
=
\zeta(1+2m)
$$

は $\Re(1-s)>1$ にあるため Euler 積から有限かつ非零である。従って

$$
\zeta(-2m)=0.
$$

$\square$
<!-- proof-end -->

これらを **自明零点**という。

Euler 積は $\Re s>1$ に零点がないことを示し、関数等式は $\Re s<0$ の零点が負の偶数だけであることを示す。従って本章の道具だけでも、「自明零点でない零点」を探す領域は

$$
0\le\Re s\le1
$$

まで絞られる。

古典的には境界線 $\Re s=1$ に零点がないことも証明され、関数等式から $\Re s=0$ も除外される。その結果、非自明零点は

$$
0<\Re s<1
$$

という critical strip に入る。しかし $\Re s=1$ の零点不存在の証明は素数定理へ接続する深い段階なので、本章では黒箱として使わない。

**Riemann 予想**は、全ての非自明零点が

$$
\Re s=\frac12
$$

上にあるという主張である。本章では定義と位置付けだけを扱い、証明論へは進まない。

---

## 9. 標準特殊値を回収する

<a id="cor-ca12-special-values"></a>
<!-- formal-statement-start -->
### 系（標準特殊値）

解析接続された Riemann ζ 関数について

$$
\boxed{
\zeta(0)=-\frac12,
\qquad
\zeta(-1)=-\frac1{12},
\qquad
\zeta(2)=\frac{\pi^2}{6}
}
$$

が成り立つ。
<!-- formal-statement-end -->

<!-- proof-start -->
### 証明

まず $s=0$ の近くでは

$$
\Lambda(s)
=
H(s)+\frac1{s-1}-\frac1s
=
-\frac1s+O(1).
$$

また [CA11 の逆 Gamma 積](../CA11/index.md#thm-ca11-reciprocal-product)から

$$
\frac1{\Gamma(s/2)}
=
\frac{s}{2}+O(s^2).
$$

従って

$$
\zeta(s)
=
\pi^{s/2}
\frac{\Lambda(s)}{\Gamma(s/2)}
\to
-\frac12.
$$

よって

$$
\zeta(0)=-\frac12.
$$

次に [CA10 の正弦関数の Euler 積](../CA10/index.md#thm-ca10-euler-sine-product)で $z^2$ の係数を比較する結果から

$$
\zeta(2)
=
\sum_{n=1}^{\infty}\frac1{n^2}
=
\frac{\pi^2}{6}.
$$

最後に関数等式へ $s=-1$ を代入する。

$$
\zeta(-1)
=
2^{-1}\pi^{-2}
\sin(-\pi/2)
\Gamma(2)\zeta(2).
$$

従って

$$
\zeta(-1)
=
-\frac1{2\pi^2}\cdot\frac{\pi^2}{6}
=
-\frac1{12}.
$$

$\square$
<!-- proof-end -->

「$1+2+3+\cdots=-1/12$」という表現を通常の級数の和として読んではいけない。$\zeta(-1)=-1/12$ は、$\Re s>1$ で定義した関数を解析接続した値であり、発散級数の通常和ではない。

---

## 10. 何が一つの証明機構だったか

本章の主要結果は別々の魔法ではない。

- **Euler 積**：正整数の一意分解を、絶対収束が許す無限積へ移した。
- **theta 変換**：Gaussian を周期化し、Fourier 係数が再び Gaussian になることを使った。
- **解析接続**：Mellin 積分の $t\to0$ 側を theta 変換で $t\to\infty$ 側へ送り返し、発散する二項だけを明示した。
- **関数等式**：解析接続に使った同じ式が $s\leftrightarrow1-s$ で不変だった。

つまり

~~~text
Gaussian の自己相似性
  ↓ Fourier
theta の自己双対性
  ↓ Mellin
completed zeta の s ↔ 1-s 対称性
~~~

という一つの構造である。

---

## 11. 演習

### Level A

<a id="ex-ca12-a1"></a>
#### CA12-A01 Dirichlet 級数の局所一様収束
- Level: A

コンパクト集合 $K\subset\{\Re s>1\}$ に対し、ある $\delta>0$ を用いて

$$
\sum_{n=1}^{\infty}n^{-s}
$$

が $K$ 上一様絶対収束することを示せ。

<a id="ex-ca12-a2"></a>
#### CA12-A02 有限 Euler 積
- Level: A

$s=2$ とし、素数 $2,3,5,7$ までの有限 Euler 積

$$
\prod_{p\in\{2,3,5,7\}}
(1-p^{-2})^{-1}
$$

を計算せよ。また、この積が $\zeta(2)$ より小さい理由を説明せよ。

<a id="ex-ca12-a3"></a>
#### CA12-A03 theta 変換の数値対応
- Level: A

theta 変換から

$$
\theta(4)=\frac12\theta(1/4)
$$

を示せ。さらに、$t=1$ が自己双対点であることを確認せよ。

<a id="ex-ca12-a4"></a>
#### CA12-A04 三つの特殊値
- Level: A

本文の結果を使い、

$$
\zeta(0),\qquad
\zeta(-2),\qquad
\zeta(2)
$$

を求め、それぞれがどの定理から出るかを明記せよ。

### Level B

<a id="ex-ca12-b1"></a>
#### CA12-B01 eta 関数の収束
- Level: B

$\Re s>0$ のコンパクト集合上で eta 級数が一様収束することを Abel の部分和変換で示し、$\Re s>1$ で

$$
\eta(s)=(1-2^{1-s})\zeta(s)
$$

を導け。

<a id="ex-ca12-b2"></a>
#### CA12-B02 Gaussian 周期化から theta 変換まで
- Level: B

$$
P_t(x)
=
\sum_{n\in\mathbb Z}e^{-\pi t(x+n)^2}
$$

の Fourier 係数を直接計算し、

$$
c_k=t^{-1/2}e^{-\pi k^2/t}
$$

を示せ。そこから $P_t(0)$ を二通りに表して theta 変換を導け。

<a id="ex-ca12-b3"></a>
#### CA12-B03 対称形から古典的関数等式へ
- Level: B

$$
\Lambda(s)=\Lambda(1-s)
$$

から始め、CA11 の Euler の反射公式と Legendre の倍角公式を用いて

$$
\zeta(s)
=
2^s\pi^{s-1}
\sin(\pi s/2)
\Gamma(1-s)\zeta(1-s)
$$

を導け。

### Level C

<a id="ex-ca12-c1"></a>
#### CA12-C01 theta Mellin 法を一続きで再構成
- Level: C

次を順に示せ。

1. $\Re s>1$ で
   $$
   \Lambda(s)
   =
   \frac12\int_0^\infty(\theta(t)-1)t^{s/2-1}\,dt.
   $$
2. 積分を $t=1$ で分け、theta 変換と $u=1/t$ により
   $$
   \Lambda(s)
   =
   H(s)+\frac1{s-1}-\frac1s
   $$
   を得よ。
3. $H$ が整関数であることを指数減衰から示せ。
4. $\zeta$ が $s=1$ に留数1の単純極だけを持つことを示せ。
5. $\Lambda(s)=\Lambda(1-s)$ と負の偶数での自明零点を導け。

---

## 12. 詳細解答

### A1 解答

$K$ は $\Re s>1$ のコンパクト部分集合なので

$$
\delta
=
\min_{s\in K}(\Re s-1)
>0.
$$

従って全ての $s\in K$ で

$$
|n^{-s}|
=
n^{-\Re s}
\le
n^{-1-\delta}.
$$

右辺は収束級数なので M 判定法により

$$
\sum_{n=1}^{\infty}n^{-s}
$$

は $K$ 上一様絶対収束する。

### A2 解答

各因子は

$$
(1-2^{-2})^{-1}=\frac43,
\quad
(1-3^{-2})^{-1}=\frac98,
$$

$$
(1-5^{-2})^{-1}=\frac{25}{24},
\quad
(1-7^{-2})^{-1}=\frac{49}{48}.
$$

従って

$$
\frac43\cdot\frac98\cdot\frac{25}{24}\cdot\frac{49}{48}
=
\frac{1225}{768}
\approx1.59505.
$$

有限 Euler 積を展開すると、素因数が $2,3,5,7$ だけからなる正整数 $n$ の $n^{-2}$ を全て足したものになる。全正整数を足す $\zeta(2)$ からは、例えば素因数11を含む項が欠けている。全項が正なので有限積は $\zeta(2)$ より小さい。

### A3 解答

theta 変換

$$
\theta(t)=t^{-1/2}\theta(1/t)
$$

へ $t=4$ を代入すると

$$
\theta(4)
=
4^{-1/2}\theta(1/4)
=
\frac12\theta(1/4).
$$

また $t=1$ では

$$
\theta(1)
=
1^{-1/2}\theta(1)
=
\theta(1).
$$

変換 $t\mapsto1/t$ の固定点が $t=1$ である。

### A4 解答

解析接続の式から

$$
\zeta(0)=-\frac12.
$$

自明零点の系で $m=1$ とすれば

$$
\zeta(-2)=0.
$$

CA10 の正弦関数の Euler 積の係数比較から

$$
\zeta(2)=\frac{\pi^2}{6}.
$$

三つはそれぞれ「$s=0$ で Gamma の零点が $\Lambda$ の極を打ち消す機構」「関数等式の正弦因子」「正弦関数の無限積」という別の機構から現れる。

### B1 解答

$K\subset\{\Re s>0\}$ をコンパクトとする。ある $\delta,M>0$ が存在して

$$
\Re s\ge\delta,
\qquad
|s|\le M
$$

となる。

$a_n=(-1)^{n-1}$ の部分和 $A_N$ は $|A_N|\le1$。Abel の部分和変換を使うと尾部は、端点項と

$$
\sum_{n=N}^{L-1}
A_n
\{n^{-s}-(n+1)^{-s}\}
$$

の和になる。

$$
n^{-s}-(n+1)^{-s}
=
s\int_n^{n+1}x^{-s-1}\,dx
$$

なので

$$
|n^{-s}-(n+1)^{-s}|
\le
M\int_n^{n+1}x^{-\delta-1}\,dx.
$$

従って尾部は $O(N^{-\delta})$ で $K$ 上一様に0へ行く。eta 級数は $K$ 上一様収束する。

$\Re s>1$ では絶対収束するので

$$
\begin{aligned}
\eta(s)
&=
\sum_{n\ge1}n^{-s}
-
2\sum_{m\ge1}(2m)^{-s}\\
&=
\zeta(s)-2^{1-s}\zeta(s)\\
&=
(1-2^{1-s})\zeta(s).
\end{aligned}
$$

### B2 解答

$$
c_k
=
\int_0^1
P_t(x)e^{-2\pi ikx}\,dx
$$

とする。一様絶対収束により和と積分を交換し、

$$
c_k
=
\sum_{n\in\mathbb Z}
\int_0^1
e^{-\pi t(x+n)^2}e^{-2\pi ikx}\,dx.
$$

$u=x+n$ と置くと整数 $k,n$ に対して

$$
e^{-2\pi ikx}=e^{-2\pi iku},
$$

したがって

$$
c_k
=
\int_{\mathbb R}
e^{-\pi tu^2}e^{-2\pi iku}\,du.
$$

FOU3 の Gaussian Fourier 変換で $a=\pi t$, $\xi=2\pi k$ とすれば

$$
c_k
=
t^{-1/2}e^{-\pi k^2/t}.
$$

よって Fourier 級数は

$$
P_t(x)
=
t^{-1/2}
\sum_{k\in\mathbb Z}
e^{-\pi k^2/t}e^{2\pi ikx}.
$$

$x=0$ とすると

$$
\theta(t)
=
t^{-1/2}\theta(1/t).
$$

### B3 解答

対称形は

$$
\pi^{-s/2}\Gamma(s/2)\zeta(s)
=
\pi^{-(1-s)/2}
\Gamma((1-s)/2)\zeta(1-s).
$$

従って

$$
\zeta(s)
=
\pi^{s-1/2}
\frac{\Gamma((1-s)/2)}
{\Gamma(s/2)}
\zeta(1-s).
$$

Legendre の倍角公式で $z=(1-s)/2$ とすると

$$
\Gamma((1-s)/2)\Gamma(1-s/2)
=
2^s\sqrt\pi\,\Gamma(1-s).
$$

Euler の反射公式で $z=s/2$ とすると

$$
\Gamma(s/2)\Gamma(1-s/2)
=
\frac{\pi}{\sin(\pi s/2)}.
$$

従って

$$
\frac{\Gamma((1-s)/2)}
{\Gamma(s/2)}
=
2^s\pi^{-1/2}
\sin(\pi s/2)\Gamma(1-s).
$$

これを代入して

$$
\zeta(s)
=
2^s\pi^{s-1}
\sin(\pi s/2)
\Gamma(1-s)\zeta(1-s).
$$

### C1 解答

**1. Mellin 表現。**

$\sigma=\Re s>1$ とする。

$$
\theta(t)-1
=
2\sum_{n=1}^{\infty}e^{-\pi n^2t}.
$$

絶対値を取った二重和積分は

$$
2\sum_{n=1}^{\infty}
\int_0^\infty
e^{-\pi n^2t}t^{\sigma/2-1}\,dt
=
2\pi^{-\sigma/2}
\Gamma(\sigma/2)\zeta(\sigma)
<\infty.
$$

従って Fubini により和と積分を交換できる。

$$
\frac12
\int_0^\infty
(\theta(t)-1)t^{s/2-1}\,dt
=
\pi^{-s/2}\Gamma(s/2)\zeta(s)
=
\Lambda(s).
$$

**2. $t=1$ で分割。**

$$
2\Lambda(s)
=
\int_1^\infty(\theta(t)-1)t^{s/2-1}\,dt
+
\int_0^1(\theta(t)-1)t^{s/2-1}\,dt.
$$

第二項で $u=1/t$ とする。theta 変換から

$$
\theta(1/u)=u^{1/2}\theta(u).
$$

従って

$$
\begin{aligned}
\int_0^1(\theta(t)-1)t^{s/2-1}\,dt
&=
\int_1^\infty
\{u^{1/2}\theta(u)-1\}u^{-s/2-1}\,du\\
&=
\int_1^\infty
(\theta(u)-1)u^{(1-s)/2-1}\,du\\
&\quad+
\int_1^\infty u^{(1-s)/2-1}\,du
-
\int_1^\infty u^{-s/2-1}\,du.
\end{aligned}
$$

$\Re s>1$ では最後の二つは

$$
\frac{2}{s-1}
\qquad\text{と}\qquad
\frac{2}{s}.
$$

従って

$$
\Lambda(s)
=
H(s)+\frac1{s-1}-\frac1s,
$$

$$
H(s)
=
\frac12\int_1^\infty
(\theta(t)-1)
\left(
t^{s/2-1}+t^{(1-s)/2-1}
\right)\,dt.
$$

**3. $H$ が整関数。**

$t\ge1$ では

$$
\theta(t)-1
\le
C e^{-\pi t}.
$$

$s$ をコンパクト集合 $K$ に制限すると二つの冪は $t^A,t^B$ で一様に抑えられる。従って integrand は

$$
C_K e^{-\pi t}(t^A+t^B)
$$

で抑えられ、これは $[1,\infty)$ 上可積分である。各 $t$ で integrand は $s$ の整関数なので、局所一様収束する積分として $H$ は整関数になる。

**4. ζ の極。**

$\Lambda$ は $s=0,1$ にだけ単純極を持つ。

$$
\zeta(s)
=
\pi^{s/2}\frac{\Lambda(s)}{\Gamma(s/2)}.
$$

$1/\Gamma(s/2)$ は $s=0$ に単純零点を持つため $s=0$ の極を打ち消す。$s=1$ では

$$
\operatorname{Res}_{s=1}\Lambda(s)=1,
\qquad
\Gamma(1/2)=\sqrt\pi,
$$

なので

$$
\operatorname{Res}_{s=1}\zeta(s)
=
\frac{\sqrt\pi}{\sqrt\pi}=1.
$$

従って ζ の唯一の極は $s=1$ の単純極で、留数1である。

**5. 対称性と自明零点。**

$H$ の定義は $s$ と $1-s$ を入れ替えても不変であり、

$$
\frac1{s-1}-\frac1s
$$

も同じ対称性を持つ。従って

$$
\Lambda(s)=\Lambda(1-s).
$$

Gamma の反射公式と倍角公式で古典形へ直すと

$$
\zeta(s)
=
2^s\pi^{s-1}
\sin(\pi s/2)
\Gamma(1-s)\zeta(1-s).
$$

$s=-2m$, $m\ge1$ では正弦因子が0で、残りの因子は有限かつ非零なので

$$
\zeta(-2m)=0.
$$

これで Mellin 表現、解析接続、関数等式、自明零点が一つの theta 変換から連続して導かれた。

---

## 13. まとめ

本章では次を一つの依存鎖として閉じた。

- $\Re s>1$ で Dirichlet 級数を局所一様絶対収束させ、Riemann ζ 関数を正則関数として構成した。
- 正整数の一意分解と絶対収束から Euler 積を導き、$\Re s>1$ での零点不存在を示した。
- Dirichlet eta 関数が $\Re s>0$ で正則になることを Abel の部分和変換で確認した。
- Gaussian を周期化し、FOU3 の Gaussian Fourier 変換と FOU2 の Fourier 級数収束から theta 変換を証明した。
- Fubini の適用条件を絶対積分で確認し、theta 関数の Mellin 表現を導いた。
- $t=1$ で積分を分け、theta 変換で小さい $t$ を大きい $t$ へ送り返すことで ζ を解析接続した。
- $s=1$ が留数1の単純極であることを明示した。
- 完成 zeta 因子の $s\leftrightarrow1-s$ 対称性から関数等式を導いた。
- 負の偶数の自明零点と $\zeta(0),\zeta(-1),\zeta(2)$ を既存の Gamma 関数・正弦関数の Euler 積へ接続して導いた。

これで CA7--CA12 の「複素解析 II」は、正規族・Riemann 面・楕円関数・無限積・Gamma 関数から Riemann ζ 関数までを、証明付きの一本の系列として閉じる。
