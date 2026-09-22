# NA2 数値解析 II：非線形方程式・不動点反復・Newton 法

非線形方程式

$$
f(x)=0
$$

は、数値解析で最初に現れる「反復によって解を近づける」問題です。線形方程式と違って、一般には有限回の四則演算だけで根を書けません。そこで必要になるのは、

- 解がある区間を保持しながら確実に狭める方法
- 方程式を不動点問題へ書き換えて反復する方法
- 接線を使って局所的に一気に精度を上げる方法
- 反復が本当に解へ近づいているかを評価する方法

です。

本章では

~~~text
符号変化で根を囲う
  ↓
二分法で保証付きに狭める
  ↓
x = g(x) と書いて不動点反復
  ↓
縮小性から存在・一意性・誤差評価
  ↓
収束次数で速さを測る
  ↓
Newton 法
  ↓
単純根の近くで二次収束
  ↓
停止判定と失敗例
~~~

を一つの流れとして整理します。

直接の前提は [NA1 浮動小数点・誤差・条件数・安定性](../NA1/index.md)、[RA2 極限・連続・一様連続](../RA2/index.md)、[RA3 微分法](../RA3/index.md)、[F0-00D Cauchy 列・完備距離空間](../F0_00D_Cauchy列_完備性_無限次元/index.md) です。

特に、

- 根の存在には RA2 の [中間値定理](../RA2/index.md#thm-ra2-ivt)
- 縮小写像の反復には F0-00D の [完備空間の閉部分集合は完備](../F0_00D_Cauchy列_完備性_無限次元/index.md#thm-f0-00d-01)
- 誤差評価には RA3 の [平均値定理](../RA3/index.md#thm-ra3-mvt)
- Newton 法の二次収束には RA3 の [Taylor の定理](../RA3/index.md#thm-ra3-taylor)

を使います。

<!-- definition-example-audit: strict -->

---

## 0. 「根を求める」を数値計算の問題として見る

<a id="def-na2-root"></a>
<!-- formal-statement-start -->
### 定義（零点・根）

関数 $f:D\to\mathbb R$ に対し、

$$
f(\alpha)=0
$$

を満たす $\alpha\in D$ を $f$ の **零点**、または方程式 $f(x)=0$ の **根**という。
<!-- formal-statement-end -->

<!-- definition-example-start: def-na2-root -->
**定義の確認**。$f(x)=x^2-2$ なら

$$
f(\sqrt2)=0,
\qquad
f(-\sqrt2)=0
$$

なので $\pm\sqrt2$ が零点です。数値計算では $\sqrt2$ を記号のまま使うのではなく、例えば

$$
1.41421356\ldots
$$

のような近似値を、誤差を管理しながら求めることが目的になります。
<!-- definition-example-end -->

非線形方程式では「近似値が何桁合っているか」を真の根なしで直接確認できないことが多いです。したがって、各アルゴリズムは **計算値だけで評価できる誤差指標**を持つことが重要です。

本章では代表的に、

- 二分法：根を含む区間の幅
- 縮小不動点反復：連続する反復値の差
- 一般の方程式：残差 $|f(x_n)|$
- Newton 法：Newton step $|x_{n+1}-x_n|$

を使います。ただし残差や step が小さいだけで根誤差が小さいとは限らないため、後で条件を明示します。

---

## 1. まず根を「囲う」：符号変化と中間値定理

<a id="def-na2-bracket"></a>
<!-- formal-statement-start -->
### 定義（根の区間囲い込み）

連続関数 $f:[a,b]\to\mathbb R$ に対し、

$$
f(a)f(b)\le0
$$

を満たす閉区間 $[a,b]$ を、$f$ の根を **区間で囲い込んでいる**という。

端点で零点でない場合は

$$
f(a)f(b)<0
$$

であり、両端の符号が異なる。
<!-- formal-statement-end -->

<!-- definition-example-start: def-na2-bracket -->
**定義の確認**。$f(x)=x^3+x-1$ について

$$
f(0)=-1,
\qquad
f(1)=1
$$

だから

$$
f(0)f(1)=-1<0.
$$

$f$ は多項式なので $[0,1]$ で連続です。[中間値定理](../RA2/index.md#thm-ra2-ivt) により、$(0,1)$ に少なくとも一つ根があります。
<!-- definition-example-end -->

符号変化は **根の存在を保証する情報**です。根の近似値を一つだけ持つより、根を含む区間を持つ方が、誤差保証を作りやすくなります。

一方、偶数重根では符号が変わらないことがあります。例えば

$$
f(x)=(x-1)^2
$$

は $x=1$ に根を持ちますが、その両側で $f(x)\ge0$ です。したがって「符号変化がないから根がない」は誤りです。符号変化は十分条件であって必要条件ではありません。

---

## 2. 二分法：遅いが、根を見失わない

<a id="alg-na2-bisection"></a>
<!-- formal-statement-start -->
### アルゴリズム（二分法）

$f:[a_0,b_0]\to\mathbb R$ を連続とし、

$$
f(a_0)f(b_0)<0
$$

とする。

各 $n\ge0$ で

$$
m_n=\frac{a_n+b_n}{2}
$$

と置く。

- $f(m_n)=0$ なら終了する。
- $f(a_n)f(m_n)<0$ なら
  $$
  [a_{n+1},b_{n+1}]=[a_n,m_n].
  $$
- それ以外なら
  $$
  [a_{n+1},b_{n+1}]=[m_n,b_n].
  $$

とする。
<!-- formal-statement-end -->

二分法では、毎回必ず符号変化を保つ半区間を選びます。したがって「速そうな方向」へ飛ぶことはしません。その代わり根を含む保証を失いません。

<a id="thm-na2-bisection-convergence"></a>
<!-- formal-statement-start -->
### 定理（二分法の収束と誤差上界）

$f:[a_0,b_0]\to\mathbb R$ が連続で

$$
f(a_0)f(b_0)<0
$$

とする。二分法が有限回で零点に到達しないとする。

このとき二分法で得られる区間は

$$
[a_0,b_0]\supset[a_1,b_1]\supset\cdots
$$

と入れ子になり、

$$
b_n-a_n
=
\frac{b_0-a_0}{2^n}.
$$

さらに中点列 $m_n$ はある零点 $\alpha$ に収束し、

$$
\boxed{
|m_n-\alpha|
\le
\frac{b_0-a_0}{2^{n+1}}
}
$$

が成り立つ。
<!-- formal-statement-end -->

### 証明の見取り図

核心は三つです。

1. 各段階で符号変化を保つので、中間値定理により各区間は少なくとも一つ零点を含む。
2. 区間長は毎回半分になるので、中点列は Cauchy 列になる。
3. 実数の完備性で極限を得て、連続性によりその極限が零点だと分かる。

<!-- proof-start -->
### 証明

各段階で符号変化を持つ半区間を選ぶので

$$
f(a_n)f(b_n)<0
$$

が保たれます。従って [中間値定理](../RA2/index.md#thm-ra2-ivt) により、各 $[a_n,b_n]$ は少なくとも一つの零点を含みます。

区間を毎回二等分するので

$$
b_{n+1}-a_{n+1}
=
\frac12(b_n-a_n).
$$

帰納的に

$$
b_n-a_n
=
\frac{b_0-a_0}{2^n}.
$$

次に中点列 $(m_n)$ が Cauchy であることを示します。$k\ge n$ なら

$$
[a_k,b_k]\subset[a_n,b_n]
$$

なので $m_k\in[a_n,b_n]$ です。$m_n$ は $[a_n,b_n]$ の中点だから

$$
|m_k-m_n|
\le
\frac{b_n-a_n}{2}
=
\frac{b_0-a_0}{2^{n+1}}.
$$

右辺は $n\to\infty$ で0へ行くため $(m_n)$ は Cauchy 列です。$\mathbb R$ は完備なので、ある $\alpha\in\mathbb R$ が存在して

$$
m_n\to\alpha.
$$

各 $n$ について $[a_n,b_n]$ に零点 $\alpha_n$ を一つ取ります。すると

$$
|\alpha_n-m_n|
\le
\frac{b_n-a_n}{2}
=
\frac{b_0-a_0}{2^{n+1}}
\to0.
$$

$m_n\to\alpha$ なので

$$
\alpha_n\to\alpha.
$$

$f(\alpha_n)=0$ であり、$f$ は連続だから

$$
f(\alpha)
=
\lim_{n\to\infty}f(\alpha_n)
=
0.
$$

したがって $\alpha$ は零点です。

最後に $\alpha\in[a_n,b_n]$ です。実際、$\alpha_k\in[a_n,b_n]$ が全ての $k\ge n$ で成り立ち、閉区間は極限を含むので $\alpha\in[a_n,b_n]$。従って中点との距離は半区間長以下で

$$
|m_n-\alpha|
\le
\frac{b_n-a_n}{2}
=
\frac{b_0-a_0}{2^{n+1}}.
$$

$\square$
<!-- proof-end -->

この誤差上界は、真の根を知らなくても使えます。初期区間幅を $L_0=b_0-a_0$ とすると、

$$
\frac{L_0}{2^{n+1}}\le\varepsilon
$$

を満たす $n$ まで反復すれば、中点誤差は $\varepsilon$ 以下です。

---

## 3. 二分法の強みと限界

二分法の強みは、関数値の符号だけで動けることです。

- 導関数が不要。
- 初期区間で符号変化さえあれば根を見失わない。
- 誤差上界が明示的。
- 収束判定が区間幅だけでできる。

一方、区間幅は毎回 $1/2$ 倍にしかなりません。誤差を約10桁減らすには、およそ

$$
2^{-n}\approx10^{-10}
$$

となる回数が必要です。

$$
n
\approx
\frac{10\log 10}{\log2}
\approx33.2
$$

なので、30回を超える反復が必要です。

二分法は「遅い」のではなく、**1回ごとに得られる保証と引き換えに進み方を制限している**と見る方が正確です。

---

## 4. 方程式を不動点問題へ書き換える

<a id="def-na2-fixed-point"></a>
<!-- formal-statement-start -->
### 定義（不動点）

写像 $g:I\to I$ に対し、

$$
g(\alpha)=\alpha
$$

を満たす $\alpha\in I$ を $g$ の **不動点**という。
<!-- formal-statement-end -->

<!-- definition-example-start: def-na2-fixed-point -->
**定義の確認**。$g(x)=\cos x$ の不動点は

$$
x=\cos x
$$

の解です。したがって

$$
f(x)=x-\cos x
$$

の零点を求める問題は、$g(x)=\cos x$ の不動点を求める問題と同じです。
<!-- definition-example-end -->

<a id="def-na2-fixed-point-iteration"></a>
<!-- formal-statement-start -->
### 定義（不動点反復）

写像 $g:I\to I$ と初期値 $x_0\in I$ に対し、

$$
\boxed{
x_{n+1}=g(x_n)
}
$$

で定める点列を **不動点反復**という。
<!-- formal-statement-end -->

<!-- definition-example-start: def-na2-fixed-point-iteration -->
**定義の確認**。$x=\cos x$ に対して $x_0=1$ とすると

$$
x_1=\cos1\approx0.5403,
$$

$$
x_2=\cos(0.5403)\approx0.8576,
$$

$$
x_3\approx0.6543
$$

と進みます。反復値は振動しながら不動点へ近づきます。

「方程式を $x=g(x)$ に変形できる」だけでは収束は保証されません。どの変形を選ぶかが重要です。
<!-- definition-example-end -->

同じ方程式でも不動点表示は複数あります。例えば

$$
x^2=2
$$

は

$$
x=\frac2x
$$

とも

$$
x=\frac12\left(x+\frac2x\right)
$$

とも書けます。

前者の反復

$$
x_{n+1}=\frac2{x_n}
$$

は $x_0=1$ なら

$$
1,\ 2,\ 1,\ 2,\ldots
$$

と周期2で振動し、収束しません。

一方、後者は後で見るように $\sqrt2$ へ速く収束します。

---

## 5. 縮小写像：反復を収束させる中心条件

<a id="def-na2-contraction"></a>
<!-- formal-statement-start -->
### 定義（縮小写像）

区間 $I\subset\mathbb R$ 上の写像 $g:I\to I$ が **縮小写像**であるとは、ある定数

$$
0\le q<1
$$

が存在し、任意の $x,y\in I$ に対して

$$
\boxed{
|g(x)-g(y)|
\le
q|x-y|
}
$$

が成り立つことをいう。

$q$ を縮小率と呼ぶ。
<!-- formal-statement-end -->

<!-- definition-example-start: def-na2-contraction -->
**定義の確認**。$I=[1,2]$ 上で

$$
g(x)=\frac12\left(x+\frac2x\right)
$$

とします。

$$
g'(x)
=
\frac12\left(1-\frac2{x^2}\right).
$$

$x\in[1,2]$ では

$$
-\frac12
\le
g'(x)
\le
\frac14
$$

なので

$$
|g'(x)|\le\frac12.
$$

[平均値定理](../RA3/index.md#thm-ra3-mvt) より

$$
|g(x)-g(y)|
\le
\frac12|x-y|.
$$

したがって $g$ は縮小率 $q=1/2$ の縮小写像です。

さらに

$$
g(x)-\sqrt2
=
\frac{(x-\sqrt2)^2}{2x}
\ge0
$$

かつ

$$
g(x)\le\frac32
$$

が $x\in[1,2]$ で成り立つので

$$
g([1,2])\subset[1,2].
$$

定義の二つの条件「区間内に戻る」「距離を縮める」を実際に確認できました。
<!-- definition-example-end -->

<a id="prop-na2-derivative-contraction"></a>
<!-- formal-statement-start -->
### 命題（導関数による縮小性判定）

閉区間 $I=[a,b]$ 上で $g:I\to I$ が連続、$(a,b)$ で微分可能とする。

ある $q<1$ が存在して

$$
|g'(x)|\le q
\qquad
(x\in(a,b))
$$

なら、$g$ は $I$ 上の縮小写像である。
<!-- formal-statement-end -->

<!-- proof-start -->
### 証明

任意の異なる $x,y\in I$ を取ります。[平均値定理](../RA3/index.md#thm-ra3-mvt) により、$x,y$ の間のある $\xi$ が存在して

$$
g(x)-g(y)
=
g'(\xi)(x-y).
$$

従って

$$
|g(x)-g(y)|
=
|g'(\xi)|\,|x-y|
\le
q|x-y|.
$$

$q<1$ なので縮小写像の定義を満たします。$\square$
<!-- proof-end -->

導関数の上界だけでは十分ではありません。

$$
g(I)\subset I
$$

も必要です。縮小性があっても、反復値が解析している区間から飛び出せば、その区間上の評価を次の反復へ使えません。

---

## 6. 縮小不動点反復の収束定理

<a id="thm-na2-contraction-fixed-point"></a>
<!-- formal-statement-start -->
### 定理（閉区間上の縮小不動点反復）

閉区間 $I=[a,b]$ と縮小写像 $g:I\to I$ を考える。縮小率を $q\in[0,1)$ とする。

任意の $x_0\in I$ から

$$
x_{n+1}=g(x_n)
$$

と定めると、次が成り立つ。

1. $g$ は $I$ にただ一つの不動点 $\alpha$ を持つ。
2. $x_n\to\alpha$。
3. 事前誤差評価
   $$
   \boxed{
   |x_n-\alpha|
   \le
   \frac{q^n}{1-q}|x_1-x_0|
   }
   $$
   が成り立つ。
4. $n\ge1$ で事後誤差評価
   $$
   \boxed{
   |x_n-\alpha|
   \le
   \frac{q}{1-q}|x_n-x_{n-1}|
   }
   $$
   が成り立つ。
<!-- formal-statement-end -->

### 証明の見取り図

縮小評価を一回ずつ連鎖させると

$$
|x_{n+1}-x_n|
\le
q^n|x_1-x_0|
$$

となります。

この差を足し上げると幾何級数が現れ、反復列が Cauchy だと分かります。閉区間は完備なので極限が区間内に存在し、Lipschitz 連続性から極限が不動点になります。

一意性は、二つの不動点があれば「距離が $q<1$ 倍以下になるのに距離自体は変わらない」という矛盾から出ます。

<!-- proof-start -->
### 証明

$g(I)\subset I$ なので、$x_0\in I$ なら全ての $x_n$ は $I$ に属します。

縮小性より

$$
|x_{n+1}-x_n|
=
|g(x_n)-g(x_{n-1})|
\le
q|x_n-x_{n-1}|.
$$

これを繰り返すと

$$
|x_{n+1}-x_n|
\le
q^n|x_1-x_0|.
$$

$m>n$ とすると三角不等式より

$$
|x_m-x_n|
\le
\sum_{k=n}^{m-1}|x_{k+1}-x_k|.
$$

従って

$$
|x_m-x_n|
\le
|x_1-x_0|
\sum_{k=n}^{m-1}q^k
\le
\frac{q^n}{1-q}|x_1-x_0|.
$$

$q^n\to0$ なので $(x_n)$ は Cauchy 列です。

$\mathbb R$ は完備であり、$I=[a,b]$ は閉集合なので、[完備空間の閉部分集合は完備](../F0_00D_Cauchy列_完備性_無限次元/index.md#thm-f0-00d-01)により $I$ も完備です。従ってある $\alpha\in I$ が存在して

$$
x_n\to\alpha.
$$

縮小写像は Lipschitz 連続なので連続です。したがって

$$
\alpha
=
\lim_{n\to\infty}x_{n+1}
=
\lim_{n\to\infty}g(x_n)
=
g(\alpha).
$$

よって $\alpha$ は不動点です。

次に一意性を示します。$\alpha,\beta\in I$ がともに不動点なら

$$
|\alpha-\beta|
=
|g(\alpha)-g(\beta)|
\le
q|\alpha-\beta|.
$$

従って

$$
(1-q)|\alpha-\beta|\le0.
$$

$1-q>0$ かつ絶対値は非負なので

$$
|\alpha-\beta|=0.
$$

従って $\alpha=\beta$ です。

事前評価は、上で得た

$$
|x_m-x_n|
\le
\frac{q^n}{1-q}|x_1-x_0|
$$

で $m\to\infty$ とすれば

$$
|x_n-\alpha|
\le
\frac{q^n}{1-q}|x_1-x_0|.
$$

事後評価は

$$
|\alpha-x_n|
\le
\sum_{k=n}^{\infty}|x_{k+1}-x_k|
$$

とし、

$$
|x_{n+1}-x_n|
\le
q|x_n-x_{n-1}|
$$

から

$$
|x_{n+j+1}-x_{n+j}|
\le
q^{j+1}|x_n-x_{n-1}|
$$

を使えば

$$
|\alpha-x_n|
\le
|x_n-x_{n-1}|
\sum_{j=0}^{\infty}q^{j+1}
=
\frac{q}{1-q}|x_n-x_{n-1}|.
$$

$\square$
<!-- proof-end -->

この定理は、収束することだけでなく **真の不動点を知らずに使える停止判定**まで与えます。

---

## 7. 縮小条件を失うと何が壊れるか

$$
g(x)=\frac2x
$$

を $[1,2]$ で考えます。$\sqrt2$ は不動点ですが、

$$
g'(x)=-\frac2{x^2},
$$

特に

$$
|g'(1)|=2>1.
$$

縮小写像ではありません。

$x_0=1$ とすると

$$
x_1=2,\qquad
x_2=1,\qquad
x_3=2,\ldots
$$

と周期2になります。

失ったのは

$$
|g(x)-g(y)|
\le
q|x-y|,
\qquad q<1
$$

という距離縮小です。

縮小不動点定理の証明では

$$
|x_{n+1}-x_n|
\le
q^n|x_1-x_0|
$$

から Cauchy 性を作りました。$q<1$ がなくなると、この幾何級数評価そのものが成立しません。

「不動点が存在する」ことと「単純反復がその不動点へ収束する」ことは別問題です。

---

## 8. 収束次数：反復の「速さ」を定量化する

<a id="def-na2-order-of-convergence"></a>
<!-- formal-statement-start -->
### 定義（収束次数）

$x_n\to\alpha$ とし、

$$
e_n:=x_n-\alpha
$$

を誤差とする。

ある $p\ge1$ と $\lambda\in(0,\infty)$ が存在して

$$
\boxed{
\lim_{n\to\infty}
\frac{|e_{n+1}|}{|e_n|^p}
=
\lambda
}
$$

となるとき、$(x_n)$ は $\alpha$ へ **次数 $p$ で収束する**という。

特に

- $p=1$：線形収束
- $p=2$：二次収束

という。
<!-- formal-statement-end -->

<!-- definition-example-start: def-na2-order-of-convergence -->
**定義の確認**。

もし

$$
e_{n+1}=\frac12e_n
$$

なら

$$
\frac{|e_{n+1}|}{|e_n|}
=
\frac12
$$

なので線形収束です。

一方

$$
e_{n+1}=3e_n^2
$$

なら

$$
\frac{|e_{n+1}|}{|e_n|^2}
=
3
$$

なので二次収束です。

二次収束では誤差が十分小さくなった後、概ね「正しい桁数が一反復ごとに倍になる」挙動が現れます。
<!-- definition-example-end -->

二分法は区間幅が毎回 $1/2$ 倍になるため、典型的には線形収束です。

縮小不動点反復も

$$
|e_{n+1}|
=
|g(x_n)-g(\alpha)|
\le
q|e_n|
$$

なので、一般には線形収束が基本です。

Newton 法は単純根の近くで二次収束します。ここが速度差の核心です。

---

## 9. Newton 法は「接線と x 軸の交点」を次の近似にする

<a id="def-na2-newton-method"></a>
<!-- formal-statement-start -->
### 定義（Newton 法）

$f$ が微分可能で、反復点 $x_n$ で

$$
f'(x_n)\neq0
$$

とする。

$x_n$ における接線

$$
y
=
f(x_n)+f'(x_n)(x-x_n)
$$

と $x$ 軸の交点を次の反復点とする方法を **Newton 法**という。

すなわち

$$
\boxed{
x_{n+1}
=
x_n-\frac{f(x_n)}{f'(x_n)}
}
$$

である。
<!-- formal-statement-end -->

<!-- definition-example-start: def-na2-newton-method -->
**定義の確認**。$f(x)=x^2-2$ では

$$
f'(x)=2x
$$

なので

$$
x_{n+1}
=
x_n-\frac{x_n^2-2}{2x_n}
=
\frac12\left(x_n+\frac2{x_n}\right).
$$

$x_0=1$ なら

$$
x_1=\frac32,
$$

$$
x_2
=
\frac12\left(
\frac32+\frac{2}{3/2}
\right)
=
\frac{17}{12}
\approx1.4166667,
$$

$$
x_3
=
\frac12\left(
\frac{17}{12}+\frac{24}{17}
\right)
=
\frac{577}{408}
\approx1.4142157.
$$

わずか3回で $\sqrt2$ にかなり近づきます。
<!-- definition-example-end -->

Newton 法は不動点反復

$$
x_{n+1}=N(x_n),
\qquad
N(x)
=
x-\frac{f(x)}{f'(x)}
$$

と見ることもできます。

根 $\alpha$ が単純なら

$$
N'(\alpha)=0
$$

となるため、通常の縮小写像よりさらに強く誤差の一次項が消え、二次項が主役になります。

---

## 10. 単純根と重根

<a id="def-na2-simple-multiple-root"></a>
<!-- formal-statement-start -->
### 定義（単純根・重根）

$f$ が $\alpha$ の近くで十分微分可能とする。

- $f(\alpha)=0$ かつ
  $$
  f'(\alpha)\neq0
  $$
  のとき、$\alpha$ を **単純根**という。
- ある整数 $m\ge2$ と、$\alpha$ の近くで $h(\alpha)\neq0$ を満たす関数 $h$ が存在して
  $$
  f(x)=(x-\alpha)^m h(x)
  $$
  と書けるとき、$\alpha$ を **重複度 $m$ の重根**という。
<!-- formal-statement-end -->

<!-- definition-example-start: def-na2-simple-multiple-root -->
**定義の確認**。

$$
f(x)=x^2-2
$$

では $\alpha=\sqrt2$ に対し

$$
f'(\sqrt2)=2\sqrt2\neq0
$$

なので単純根です。

一方

$$
g(x)=(x-1)^3
$$

では

$$
g(x)=(x-1)^3\cdot1
$$

なので $x=1$ は重複度3の重根です。
<!-- definition-example-end -->

Newton 法の二次収束は **単純根**の近くでの性質です。重根では一般に収束が遅くなります。

---

## 11. Newton 法の局所二次収束

<a id="thm-na2-newton-quadratic"></a>
<!-- formal-statement-start -->
### 定理（Newton 法の局所二次収束）

$\alpha$ を $f$ の単純根とする。すなわち

$$
f(\alpha)=0,
\qquad
f'(\alpha)\neq0.
$$

$f$ が $\alpha$ の近傍で $C^2$ 級なら、ある $\rho>0$ と定数 $C>0$ が存在して、

$$
|x_0-\alpha|\le\rho
$$

を満たす任意の初期値 $x_0$ から Newton 法を始めると、全ての反復が定義され、$\alpha$ へ収束する。

さらに

$$
\boxed{
|x_{n+1}-\alpha|
\le
C|x_n-\alpha|^2
}
$$

が全ての $n$ で成り立つ。

従って Newton 法は単純根の十分近くでは少なくとも二次の速さで収束する。
<!-- formal-statement-end -->

### 証明の見取り図

単純根なので $f'(\alpha)\neq0$ です。連続性により、根の近くでは $f'$ は0から離れたままです。

Taylor の定理を「$x_n$ から真の根 $\alpha$ まで」使うと

$$
0=f(\alpha)
$$

から Newton step 後の誤差が

$$
x_{n+1}-\alpha
=
\frac{f''(\xi_n)}{2f'(x_n)}
(x_n-\alpha)^2
$$

と厳密に書けます。

分母を0から離し、分子を有界にすれば、誤差が二乗される評価が出ます。

<!-- proof-start -->
### 証明

$f'(\alpha)\neq0$ で $f'$ は連続なので、ある $\rho_1>0$ が存在して

$$
|x-\alpha|\le\rho_1
$$

なら

$$
|f'(x)|
\ge
m
:=
\frac{|f'(\alpha)|}{2}
>
0
$$

となります。

また $f''$ は連続なので、閉区間

$$
[\alpha-\rho_1,\alpha+\rho_1]
$$

上で有界です。ある $M\ge0$ が存在して

$$
|f''(x)|\le M
$$

とできます。

$$
C:=\frac{M}{2m}
$$

と置きます。$C=0$ ならこの近傍で $f$ は一次関数であり Newton 法は一回で根へ到達するので主張は明らかです。以下 $C>0$ とします。

$$
0<\rho\le\rho_1
$$

を

$$
C\rho\le\frac12
$$

となるように取ります。

$|x_n-\alpha|\le\rho$ と仮定します。$x_n$ と $\alpha$ の間で [Taylor の定理](../RA3/index.md#thm-ra3-taylor) を一次まで適用すると、ある $\xi_n$ が $x_n$ と $\alpha$ の間に存在して

$$
f(\alpha)
=
f(x_n)
+
f'(x_n)(\alpha-x_n)
+
\frac12f''(\xi_n)(\alpha-x_n)^2.
$$

$f(\alpha)=0$ なので

$$
f(x_n)
=
f'(x_n)(x_n-\alpha)
-
\frac12f''(\xi_n)(x_n-\alpha)^2.
$$

Newton 法の式へ代入すると

$$
\begin{aligned}
x_{n+1}-\alpha
&=
x_n-\alpha-\frac{f(x_n)}{f'(x_n)}\\
&=
x_n-\alpha
-
\left[
x_n-\alpha
-
\frac{f''(\xi_n)}{2f'(x_n)}
(x_n-\alpha)^2
\right]\\
&=
\frac{f''(\xi_n)}{2f'(x_n)}
(x_n-\alpha)^2.
\end{aligned}
$$

従って

$$
|x_{n+1}-\alpha|
\le
\frac{M}{2m}|x_n-\alpha|^2
=
C|x_n-\alpha|^2.
$$

さらに $|x_n-\alpha|\le\rho$ なら

$$
|x_{n+1}-\alpha|
\le
C\rho|x_n-\alpha|
\le
\frac12|x_n-\alpha|
\le
\rho.
$$

従って帰納的に全ての $x_n$ はこの近傍内に留まり、$f'(x_n)\neq0$ なので Newton step は全て定義されます。

また

$$
|x_{n+1}-\alpha|
\le
\frac12|x_n-\alpha|
$$

なので $x_n\to\alpha$ です。

最後にすでに示した

$$
|x_{n+1}-\alpha|
\le
C|x_n-\alpha|^2
$$

が二次収束評価です。$\square$
<!-- proof-end -->

<a id="cor-na2-newton-asymptotic-constant"></a>
<!-- formal-statement-start -->
### 系（Newton 法の二次誤差定数）

前定理の仮定に加え $x_n\neq\alpha$ が十分大きい $n$ で成り立つとする。このとき

$$
\boxed{
\lim_{n\to\infty}
\frac{x_{n+1}-\alpha}{(x_n-\alpha)^2}
=
\frac{f''(\alpha)}{2f'(\alpha)}
}
$$

である。

従って右辺が0でなければ、収束次数は正確に2である。
<!-- formal-statement-end -->

<!-- proof-start -->
### 証明

前定理の証明で

$$
\frac{x_{n+1}-\alpha}{(x_n-\alpha)^2}
=
\frac{f''(\xi_n)}{2f'(x_n)}
$$

を得ました。

$x_n\to\alpha$ で、$\xi_n$ は $x_n$ と $\alpha$ の間にあるので

$$
\xi_n\to\alpha.
$$

$f',f''$ の連続性と $f'(\alpha)\neq0$ から

$$
\frac{f''(\xi_n)}{2f'(x_n)}
\to
\frac{f''(\alpha)}{2f'(\alpha)}.
$$

$\square$
<!-- proof-end -->

---

## 12. 重根では Newton 法が遅くなる

$$
f(x)=(x-\alpha)^m,
\qquad
m\ge2
$$

を考えます。

$$
f'(x)
=
m(x-\alpha)^{m-1}
$$

なので、$x_n\neq\alpha$ なら Newton step は

$$
x_{n+1}
=
x_n
-
\frac{x_n-\alpha}{m}.
$$

従って誤差 $e_n=x_n-\alpha$ は

$$
\boxed{
e_{n+1}
=
\left(1-\frac1m\right)e_n
}
$$

です。

これは二次ではなく線形収束です。

例えば

$$
f(x)=(x-1)^2
$$

では

$$
e_{n+1}=\frac12e_n.
$$

失った仮定は単純根条件

$$
f'(\alpha)\neq0
$$

です。重根では $f'(\alpha)=0$ なので、局所二次収束定理の証明で必要だった

$$
|f'(x)|\ge m_0>0
$$

という分母の下界を作れません。

---

## 13. Newton 法は大域的には保証されない

Newton 法の局所二次収束定理は「初期値が十分根に近い」ときの定理です。

遠い初期値から必ず収束するとは言っていません。

### 例：0 と 1 の間を永遠に往復する

$$
f(x)=x^3-2x+2
$$

を考えます。

$$
f'(x)=3x^2-2.
$$

$x_0=0$ から始めると

$$
x_1
=
0-\frac{2}{-2}
=
1.
$$

次に

$$
x_2
=
1-\frac{1}{1}
=
0.
$$

従って

$$
0,\ 1,\ 0,\ 1,\ldots
$$

という周期2に入り、根へ収束しません。

この例では Newton 法の公式自体は毎回定義されています。しかし初期値が局所収束領域へ入っていません。

### 失敗の種類

Newton 法では少なくとも次を区別します。

- $f'(x_n)=0$ で step が定義できない。
- $|f'(x_n)|$ が非常に小さく、巨大な step が出る。
- 根から遠く、別の根へ行く。
- 周期軌道へ入る。
- 重根で二次収束が失われる。

二分法のような大域保証と Newton 法の局所速度は、別の長所です。

---

## 14. 残差はいつ根誤差を保証するか

NA1 では線形方程式で「残差が小さいだけでは解誤差が小さいとは限らない」と学びました。同じ注意が非線形方程式にもあります。

<a id="prop-na2-residual-error-bound"></a>
<!-- formal-statement-start -->
### 命題（導関数下界による残差から根誤差への評価）

$f$ が区間 $I$ で微分可能とし、$\alpha\in I$ が零点

$$
f(\alpha)=0
$$

であるとする。

ある $m>0$ が存在して

$$
|f'(x)|\ge m
\qquad
(x\in I)
$$

とする。

$x\in I$ で、$x$ と $\alpha$ の間の線分が $I$ に含まれるなら

$$
\boxed{
|x-\alpha|
\le
\frac{|f(x)|}{m}
}
$$

が成り立つ。
<!-- formal-statement-end -->

<!-- proof-start -->
### 証明

[平均値定理](../RA3/index.md#thm-ra3-mvt) により、$x$ と $\alpha$ の間のある $\xi$ が存在して

$$
f(x)-f(\alpha)
=
f'(\xi)(x-\alpha).
$$

$f(\alpha)=0$ なので

$$
|f(x)|
=
|f'(\xi)|\,|x-\alpha|.
$$

仮定より

$$
|f'(\xi)|\ge m
$$

だから

$$
|f(x)|
\ge
m|x-\alpha|.
$$

従って

$$
|x-\alpha|
\le
\frac{|f(x)|}{m}.
$$

$\square$
<!-- proof-end -->

この命題が示すのは、

> 残差 $|f(x)|$ を根誤差へ変換するには、根の近くで $f'$ が0から離れていることが必要

ということです。

単純根では $f'(\alpha)\neq0$ なので、十分小さい近傍ならこの条件を満たせます。

重根では $f'(\alpha)=0$ なので、同じ形の一様な下界を作れません。

---

## 15. 停止判定を方法ごとに使い分ける

### 15.1 二分法

区間幅から

$$
|m_n-\alpha|
\le
\frac{b_n-a_n}{2}
$$

と直接保証できます。

これは最も強い停止判定です。

### 15.2 縮小不動点反復

縮小率 $q$ が既知なら

$$
|x_n-\alpha|
\le
\frac{q}{1-q}|x_n-x_{n-1}|
$$

を使えます。

単なる「前回との差が小さい」より強く、真の不動点への誤差上界になっています。

### 15.3 一般の残差

$$
|f(x_n)|
$$

が小さくても、$f'$ が小さい領域では根誤差は大きいかもしれません。

導関数下界 $m$ が分かるなら

$$
|x_n-\alpha|
\le
\frac{|f(x_n)|}{m}
$$

へ変換できます。

### 15.4 Newton step

Newton 法では

$$
x_{n+1}-x_n
=
-\frac{f(x_n)}{f'(x_n)}.
$$

局所二次収束領域では step の大きさは有用な停止指標ですが、大域的には小さい step だけで根への近さを保証できるとは限りません。

実装では通常、

- 区間幅
- step
- 残差
- 最大反復回数

を組み合わせます。

---

## 16. 二分法と Newton 法を対立させない

二分法と Newton 法は目的が違います。

| 観点 | 二分法 | Newton 法 |
|---|---|---|
| 必要情報 | 関数値の符号 | 関数値と導関数 |
| 大域保証 | 符号変化区間を保てば強い | 一般にはない |
| 典型収束 | 線形 | 単純根近傍で二次 |
| 導関数0 | 問題なし | step が定義不能 |
| 誤差保証 | 区間幅から直接 | 局所理論や追加評価が必要 |

実際の数値計算では、

~~~text
二分法などで安全に根を囲う
        ↓
根の近くへ入る
        ↓
Newton 法へ切り替える
~~~

という **保証と速度の組合せ**が自然です。

これは NA1 で見た「問題の性質」と「アルゴリズムの性質」を分ける考え方の延長でもあります。

---

## 17. 演習

### Level A

<a id="ex-na2-a1"></a>
#### NA2-A01 二分法の反復回数
- Level: A

$$
f(x)=x^3+x-1
$$

について $[0,1]$ が根を囲い込むことを確認せよ。

さらに二分法の中点誤差を

$$
10^{-6}
$$

以下にするには、少なくとも何回の二分が必要か求めよ。

<a id="ex-na2-a2"></a>
#### NA2-A02 縮小写像の確認
- Level: A

$$
g(x)
=
\frac12\left(x+\frac2x\right)
$$

を $I=[1,2]$ 上で考える。

1. $g(I)\subset I$ を示せ。
2. $|g'(x)|\le1/2$ を示せ。
3. $g$ が縮小写像であることを示せ。
4. 不動点を求めよ。

<a id="ex-na2-a3"></a>
#### NA2-A03 収束次数
- Level: A

誤差列がそれぞれ

$$
e_{n+1}=\frac14e_n
$$

および

$$
e_{n+1}=5e_n^2
$$

を満たすとする。

それぞれの収束次数と誤差定数を答えよ。

<a id="ex-na2-a4"></a>
#### NA2-A04 $\sqrt2$ に対する Newton 法
- Level: A

$$
f(x)=x^2-2
$$

に Newton 法を適用せよ。

1. 反復式を導け。
2. $x_0=1$ から $x_1,x_2,x_3$ を分数で求めよ。
3. $x_3^2-2$ を計算し、残差が小さくなっていることを確認せよ。

### Level B

<a id="ex-na2-b1"></a>
#### NA2-B01 縮小反復の事後誤差評価
- Level: B

縮小率 $q\in(0,1)$ の縮小写像 $g:I\to I$ に対し、

$$
x_{n+1}=g(x_n)
$$

とする。

本文の事後誤差評価

$$
|x_n-\alpha|
\le
\frac{q}{1-q}|x_n-x_{n-1}|
$$

を、差分の無限和から自力で導け。

さらに $q=1/3$、

$$
|x_n-x_{n-1}|=10^{-8}
$$

なら、根誤差をいくつ以下と保証できるか。

<a id="ex-na2-b2"></a>
#### NA2-B02 $\sqrt a$ に対する Newton 誤差
- Level: B

$a>0$ とし、

$$
f(x)=x^2-a
$$

に Newton 法を適用する。$\alpha=\sqrt a$、$x_n>0$ とする。

1. 
   $$
   x_{n+1}
   =
   \frac12\left(x_n+\frac a{x_n}\right)
   $$
   を導け。
2. 誤差 $e_n=x_n-\alpha$ が
   $$
   \boxed{
   e_{n+1}
   =
   \frac{e_n^2}{2x_n}
   }
   $$
   を満たすことを示せ。
3. $x_n\ge\alpha/2$ なら
   $$
   |e_{n+1}|
   \le
   \frac1\alpha|e_n|^2
   $$
   を示せ。

<a id="ex-na2-b3"></a>
#### NA2-B03 Newton 法の周期2
- Level: B

$$
f(x)=x^3-2x+2
$$

に Newton 法を適用する。

1. Newton 写像
   $$
   N(x)=x-\frac{f(x)}{f'(x)}
   $$
   を書け。
2. $N(0)=1$, $N(1)=0$ を示せ。
3. $x_0=0$ から反復が収束しないことを示せ。
4. この現象が局所二次収束定理と矛盾しない理由を、定理の仮定に即して説明せよ。

### Level C

<a id="ex-na2-c1"></a>
#### NA2-C01 $x^3=2$ を三つの評価で解く
- Level: C

$$
f(x)=x^3-2
$$

の正の根 $\alpha=\sqrt[3]{2}$ を考える。

1. $[1,2]$ が根を囲い込むことを示し、二分法の $n$ 回目の中点誤差上界を書け。
2. Newton 法の反復式
   $$
   x_{n+1}
   =
   \frac13\left(
   2x_n+\frac2{x_n^2}
   \right)
   $$
   を導け。
3. Newton 写像を
   $$
   g(x)
   =
   \frac13\left(
   2x+\frac2{x^2}
   \right)
   $$
   とする。$[1,2]$ 上で
   $$
   |g'(x)|\le\frac23
   $$
   を示せ。
4. $g([1,2])\subset[1,2]$ を示し、縮小不動点定理から $x_0\in[1,2]$ なら Newton 反復が $\alpha$ へ収束することを示せ。
5. Taylor 型の局所評価を直接使い、Newton 法が $\alpha$ の近くで二次収束することを示せ。
6. 二分法の「区間幅による保証」と Newton 法の「局所二次収束」が、同じ問題でどう補完し合うか説明せよ。

---

## 18. 詳細解答

### A1 解答

$$
f(0)=-1,
\qquad
f(1)=1
$$

なので

$$
f(0)f(1)=-1<0.
$$

$f$ は連続だから $[0,1]$ は根を囲い込みます。

初期区間幅は

$$
b_0-a_0=1.
$$

本文の誤差上界より

$$
|m_n-\alpha|
\le
\frac1{2^{n+1}}.
$$

これを $10^{-6}$ 以下にしたいので

$$
2^{n+1}\ge10^6.
$$

両辺の対数を取ると

$$
n+1
\ge
\frac{6\log10}{\log2}
\approx19.93.
$$

従って整数として

$$
n+1\ge20,
$$

すなわち

$$
\boxed{n\ge19}.
$$

ここで $m_0$ を初期区間の中点と数える本文の添字では、$n=19$ の中点で

$$
2^{-20}<10^{-6}
$$

となります。

「二分を何回行った後の区間か」という数え方では、20回二分した区間幅が $2^{-20}$ です。添字の定義を混同しないことが重要です。

### A2 解答

$$
g(x)
=
\frac12\left(x+\frac2x\right).
$$

**1. 区間内に戻ること。**

$x\in[1,2]$ では

$$
g(x)-\sqrt2
=
\frac{x^2+2-2\sqrt2\,x}{2x}
=
\frac{(x-\sqrt2)^2}{2x}
\ge0.
$$

従って

$$
g(x)\ge\sqrt2>1.
$$

また

$$
g'(x)
=
\frac12-\frac1{x^2}.
$$

$g'(x)=0$ は $x=\sqrt2$ で、$g$ は $[1,\sqrt2]$ で減少、$[\sqrt2,2]$ で増加します。従って最大値は端点で取り、

$$
g(1)=\frac32,
\qquad
g(2)=\frac32.
$$

よって

$$
g(x)\le\frac32<2.
$$

従って

$$
g([1,2])\subset[1,2].
$$

**2. 導関数の上界。**

$$
g'(x)
=
\frac12\left(1-\frac2{x^2}\right).
$$

$x\in[1,2]$ では

$$
-\frac12
\le
g'(x)
\le
\frac14.
$$

従って

$$
|g'(x)|\le\frac12.
$$

**3. 縮小性。**

平均値定理により任意の $x,y\in[1,2]$ に対して

$$
|g(x)-g(y)|
\le
\frac12|x-y|.
$$

従って縮小率 $q=1/2$ の縮小写像です。

**4. 不動点。**

$$
x
=
\frac12\left(x+\frac2x\right)
$$

より

$$
2x=x+\frac2x,
$$

$$
x=\frac2x.
$$

$x\in[1,2]$ なので $x>0$ であり、

$$
x^2=2.
$$

従って唯一の不動点は

$$
\boxed{\sqrt2}.
$$

### A3 解答

一つ目は

$$
e_{n+1}=\frac14e_n.
$$

従って

$$
\frac{|e_{n+1}|}{|e_n|}
=
\frac14.
$$

よって収束次数は

$$
\boxed{p=1}
$$

で、誤差定数は

$$
\boxed{\lambda=\frac14}.
$$

二つ目は

$$
e_{n+1}=5e_n^2.
$$

従って

$$
\frac{|e_{n+1}|}{|e_n|^2}
=
5.
$$

よって収束次数は

$$
\boxed{p=2}
$$

で、誤差定数は

$$
\boxed{\lambda=5}.
$$

### A4 解答

$f(x)=x^2-2$ だから

$$
f'(x)=2x.
$$

Newton 法より

$$
x_{n+1}
=
x_n-\frac{x_n^2-2}{2x_n}
=
\frac12\left(x_n+\frac2{x_n}\right).
$$

$x_0=1$ とします。

まず

$$
x_1
=
\frac12(1+2)
=
\frac32.
$$

次に

$$
x_2
=
\frac12\left(
\frac32+\frac{2}{3/2}
\right)
=
\frac12\left(
\frac32+\frac43
\right).
$$

通分すると

$$
\frac32+\frac43
=
\frac{9+8}{6}
=
\frac{17}{6},
$$

従って

$$
x_2=\frac{17}{12}.
$$

次に

$$
x_3
=
\frac12\left(
\frac{17}{12}
+
\frac{2}{17/12}
\right)
=
\frac12\left(
\frac{17}{12}
+
\frac{24}{17}
\right).
$$

通分すると

$$
\frac{17}{12}
+
\frac{24}{17}
=
\frac{289+288}{204}
=
\frac{577}{204}.
$$

従って

$$
\boxed{
x_3=\frac{577}{408}
}.
$$

残差は

$$
x_3^2-2
=
\frac{577^2}{408^2}-2.
$$

$$
577^2=332929,
\qquad
408^2=166464.
$$

よって

$$
x_3^2-2
=
\frac{332929-332928}{166464}
=
\boxed{
\frac1{166464}
}.
$$

約

$$
6.01\times10^{-6}
$$

であり、3回の反復で残差がかなり小さくなっています。

### B1 解答

$\alpha$ を唯一の不動点とします。

$$
x_n-\alpha
=
\sum_{k=n}^{\infty}(x_k-x_{k+1})
$$

と考え、絶対値を取ると

$$
|x_n-\alpha|
\le
\sum_{k=n}^{\infty}|x_{k+1}-x_k|.
$$

縮小性から

$$
|x_{k+1}-x_k|
\le
q|x_k-x_{k-1}|.
$$

従って $k=n+j$ と書けば

$$
|x_{n+j+1}-x_{n+j}|
\le
q^{j+1}|x_n-x_{n-1}|.
$$

したがって

$$
\begin{aligned}
|x_n-\alpha|
&\le
|x_n-x_{n-1}|
\sum_{j=0}^{\infty}q^{j+1}\\
&=
|x_n-x_{n-1}|
\frac{q}{1-q}.
\end{aligned}
$$

よって

$$
\boxed{
|x_n-\alpha|
\le
\frac{q}{1-q}|x_n-x_{n-1}|
}.
$$

$q=1/3$ なら

$$
\frac{q}{1-q}
=
\frac{1/3}{2/3}
=
\frac12.
$$

従って

$$
|x_n-\alpha|
\le
\frac12\times10^{-8}
=
\boxed{5\times10^{-9}}.
$$

### B2 解答

$$
f(x)=x^2-a,
\qquad
f'(x)=2x.
$$

したがって Newton 法は

$$
x_{n+1}
=
x_n-\frac{x_n^2-a}{2x_n}
=
\frac{x_n^2+a}{2x_n}.
$$

よって

$$
\boxed{
x_{n+1}
=
\frac12\left(
x_n+\frac a{x_n}
\right)
}.
$$

$\alpha=\sqrt a$ なので

$$
a=\alpha^2.
$$

誤差を $e_n=x_n-\alpha$ とすると

$$
\begin{aligned}
e_{n+1}
&=
x_{n+1}-\alpha\\
&=
\frac{x_n^2+\alpha^2}{2x_n}
-\alpha\\
&=
\frac{x_n^2-2\alpha x_n+\alpha^2}{2x_n}\\
&=
\frac{(x_n-\alpha)^2}{2x_n}.
\end{aligned}
$$

従って

$$
\boxed{
e_{n+1}
=
\frac{e_n^2}{2x_n}
}.
$$

さらに $x_n\ge\alpha/2$ なら

$$
2x_n\ge\alpha.
$$

よって

$$
|e_{n+1}|
=
\frac{|e_n|^2}{2x_n}
\le
\frac1\alpha|e_n|^2.
$$

従って

$$
\boxed{
|e_{n+1}|
\le
\frac1\alpha|e_n|^2
}.
$$

この式は $\sqrt a$ に対する Newton 法の二次収束を、一般定理を使わず直接示しています。

### B3 解答

$$
f(x)=x^3-2x+2,
$$

$$
f'(x)=3x^2-2.
$$

従って Newton 写像は

$$
\boxed{
N(x)
=
x-\frac{x^3-2x+2}{3x^2-2}
}.
$$

$x=0$ では

$$
N(0)
=
0-\frac2{-2}
=
1.
$$

$x=1$ では

$$
f(1)=1-2+2=1,
$$

$$
f'(1)=3-2=1,
$$

だから

$$
N(1)
=
1-\frac11
=
0.
$$

従って $x_0=0$ なら

$$
x_1=1,
\qquad
x_2=0,
\qquad
x_3=1,
\ldots
$$

となり、反復列は周期2で収束しません。

これは局所二次収束定理と矛盾しません。定理は単純根 $\alpha$ の **十分近く**に初期値を取ることを要求しています。

$x_0=0$ がその局所近傍に入っているとは限らず、実際に反復は 0 と 1 を往復して根の近傍へ入りません。

定理は Newton 法の大域収束を主張していません。

### C1 解答

$$
f(x)=x^3-2.
$$

**1. 二分法の保証。**

$$
f(1)=-1,
\qquad
f(2)=6.
$$

従って

$$
f(1)f(2)<0.
$$

$f$ は連続なので $[1,2]$ に少なくとも一つ根があります。

さらに

$$
f'(x)=3x^2>0
\qquad
(x>0)
$$

なので正の範囲では狭義増加です。従って正の根は一意です。

初期区間幅は1だから、本文の二分法誤差評価より

$$
\boxed{
|m_n-\alpha|
\le
\frac1{2^{n+1}}
}.
$$

**2. Newton 反復。**

$$
f'(x)=3x^2.
$$

Newton 法より

$$
\begin{aligned}
x_{n+1}
&=
x_n-\frac{x_n^3-2}{3x_n^2}\\
&=
\frac{3x_n^3-(x_n^3-2)}{3x_n^2}\\
&=
\frac{2x_n^3+2}{3x_n^2}.
\end{aligned}
$$

従って

$$
\boxed{
x_{n+1}
=
\frac13\left(
2x_n+\frac2{x_n^2}
\right)
}.
$$

**3. 導関数の上界。**

$$
g(x)
=
\frac13\left(
2x+\frac2{x^2}
\right).
$$

微分すると

$$
g'(x)
=
\frac13\left(
2-\frac4{x^3}
\right).
$$

$x\in[1,2]$ なら

$$
\frac1{x^3}\in\left[\frac18,1\right].
$$

従って

$$
2-\frac4{x^3}
\in
[-2,3/2].
$$

よって

$$
g'(x)\in
\left[-\frac23,\frac12\right].
$$

したがって

$$
\boxed{
|g'(x)|
\le
\frac23
}.
$$

**4. 区間内に戻ること。**

まず $x\in[1,2]$ なら $g(x)>0$ です。

$g'(x)=0$ は

$$
2-\frac4{x^3}=0
$$

すなわち

$$
x^3=2
$$

の点 $\alpha$ です。

従って $g$ は $[1,\alpha]$ で減少、$[\alpha,2]$ で増加します。最小値は

$$
g(\alpha)
=
\alpha
$$

です。

端点では

$$
g(1)
=
\frac13(2+2)
=
\frac43,
$$

$$
g(2)
=
\frac13\left(
4+\frac12
\right)
=
\frac32.
$$

従って

$$
\alpha
\le
g(x)
\le
\frac32.
$$

$\alpha>1$ かつ $3/2<2$ なので

$$
g([1,2])\subset[1,2].
$$

さらに前問で

$$
|g'(x)|\le\frac23<1
$$

を示したので、平均値定理から $g$ は縮小率 $q=2/3$ の縮小写像です。

従って縮小不動点定理により、任意の

$$
x_0\in[1,2]
$$

からの反復は唯一の不動点へ収束します。

不動点方程式

$$
x
=
\frac13\left(
2x+\frac2{x^2}
\right)
$$

は

$$
3x=2x+\frac2{x^2},
$$

$$
x^3=2
$$

と同値なので、その不動点は

$$
\alpha=\sqrt[3]2
$$

です。

**5. 局所二次収束。**

$f(x)=x^3-2$ について

$$
f'(\alpha)=3\alpha^2\neq0,
$$

$$
f''(x)=6x.
$$

従って $\alpha$ は単純根で、$f$ は $C^2$ 級です。本文の局所二次収束定理を適用できます。

より直接には、Taylor の定理から Newton 誤差は、$x_n$ と $\alpha$ の間のある $\xi_n$ を用いて

$$
x_{n+1}-\alpha
=
\frac{f''(\xi_n)}{2f'(x_n)}
(x_n-\alpha)^2.
$$

ここでは

$$
\frac{f''(\xi_n)}{2f'(x_n)}
=
\frac{6\xi_n}{6x_n^2}
=
\frac{\xi_n}{x_n^2}.
$$

$x_n\to\alpha$ なら $\xi_n\to\alpha$ なので

$$
\frac{\xi_n}{x_n^2}
\to
\frac{\alpha}{\alpha^2}
=
\frac1\alpha.
$$

従って十分根に近いところでは

$$
|x_{n+1}-\alpha|
\approx
\frac1\alpha
|x_n-\alpha|^2.
$$

すなわち二次収束です。

**6. 二つの方法の役割。**

二分法は

$$
|m_n-\alpha|
\le
2^{-(n+1)}
$$

という大域的で明示的な保証を持ちます。初期区間に符号変化があれば、根を見失いません。

一方 Newton 法は、大域的には周期軌道や巨大 step の可能性がありますが、単純根の近くへ入れば誤差が二乗される二次収束を持ちます。

従って実用上は

~~~text
二分法で根を安全に囲いながら近づく
        ↓
Newton 法の局所収束域へ入る
        ↓
Newton 法で高速に仕上げる
~~~

という組合せが合理的です。

「保証」と「速度」は競合する性質ではなく、補完的な性質です。

---

## 19. まとめ

本章では、非線形方程式の反復法を「収束保証」と「収束速度」の両面から整理しました。

- 連続関数の符号変化と中間値定理から根の存在を保証した。
- 二分法が根を含む区間を保ちながら幅を毎回半分にし、
  $$
  |m_n-\alpha|
  \le
  \frac{b_0-a_0}{2^{n+1}}
  $$
  を満たすことを証明した。
- 方程式を $x=g(x)$ へ変換し、不動点反復として見る立場を導入した。
- 閉区間上の縮小写像について、不動点の存在・一意性・反復収束・事前/事後誤差評価を証明した。
- 収束次数を定義し、線形収束と二次収束の違いを定量化した。
- Newton 法を接線から導出した。
- 単純根の近くで
  $$
  |e_{n+1}|
  \le
  C|e_n|^2
  $$
  となる局所二次収束を Taylor の定理から証明した。
- 重根では $f'(\alpha)=0$ のため二次収束が失われ得ることを確認した。
- Newton 法は大域的には周期2へ入ることすらあり、局所収束定理を大域保証として誤読できないことを確認した。
- 残差から根誤差を評価するには
  $$
  |f'|\ge m>0
  $$
  のような感度条件が必要だと示した。
- 二分法の保証と Newton 法の速度を組み合わせる考え方を整理した。

次の NA3「非線形連立方程式」では、スカラーの導関数を Jacobian 行列へ置き換え、多変数 Newton 法の局所収束、初期値依存、Jacobian の悪条件性へ進みます。
