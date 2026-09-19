# GPDE5：微分の制御を「収束する部分列」へ変える

<!-- definition-example-audit: strict -->

GPDE3 では Sobolev 空間を作り、GPDE4 では $H_0^1$・Poincaré 不等式・trace によって境界条件を関数空間へ組み込みました。

ここから PDE の存在証明で何度も現れる、もう一つの壁へ進みます。

近似解 $u_n$ に対して

$$
\|u_n\|_{H_0^1(\Omega)}
\le C
$$

という a priori estimate が得られても、それだけで

$$
u_n\to u
\quad\text{in }H_0^1
$$

とは限りません。無限次元の閉有界集合は、一般に norm compact ではないからです。

それでも PDE では

$$
\boxed{
\text{有界性}
\Longrightarrow
\text{弱収束部分列}
\Longrightarrow
\text{より弱い norm で強収束部分列}
}
$$

という二段階を使えます。

後半の

$$
\text{強収束部分列を回収する}
$$

この収束部分列回収の機構が本章の中心で、後半では Rellich--Kondrachov 定理として具体化します。

本章では次の流れを完全に追います。

~~~text
微分を Lp で制御する
  ↓
微分制御から高い Lq integrability へ
  ↓
より高い積分可能性
  ↓
translation を小さくする
  ↓
有限次元近似が可能になる
  ↓
compactness
  ↓
bounded H_0^1 sequence
  ↓
weak H_0^1 + strong L2 subsequence
~~~

そして最後に、critical exponent では concentration によって compactness が壊れることまで確認します。

以下、**ほとんど至る所（almost everywhere; a.e.）** と略記します。

---

## 1. まず「どの指数へ埋め込めるか」は尺度変換が決める

$1\le p<d$ とします。

$u\in C_c^\infty(\mathbb R^d)$ に対し

$$
u_\lambda(x)=u(\lambda x)
$$

と置きます。

変数変換 $y=\lambda x$ により

$$
\|u_\lambda\|_{L^q(\mathbb R^d)}
=
\lambda^{-d/q}
\|u\|_{L^q(\mathbb R^d)}
$$

です。

一方

$$
\nabla u_\lambda(x)
=
\lambda \nabla u(\lambda x)
$$

なので

$$
\|\nabla u_\lambda\|_{L^p}
=
\lambda^{1-d/p}
\|\nabla u\|_{L^p}.
$$

もし

$$
\|u\|_{L^q}
\le
C\|\nabla u\|_{L^p}
$$

が全ての尺度で同じ定数 $C$ により成り立つなら、$\lambda$ の指数は一致しなければなりません。

従って

$$
-\frac d q
=
1-\frac d p,
$$

すなわち

$$
\frac1q
=
\frac1p-\frac1d.
$$

この $q$ を次で正式に定義します。

<a id="def-gpde5-sobolev-conjugate"></a>

<!-- formal-statement-start -->
> **定義（Sobolev 共役指数）**  
> $1\le p<d$ とする。
>
> $p$ の Sobolev 共役指数 $p^*$ を

$$
\boxed{
\frac1{p^*}
=
\frac1p-\frac1d
}
$$

> すなわち

$$
\boxed{
p^*
=
\frac{dp}{d-p}
}
$$

> で定める。
<!-- formal-statement-end -->

<!-- definition-example-start: def-gpde5-sobolev-conjugate -->
**定義の確認**

$d=3$、$p=2$ なら

$$
p^*
=
\frac{3\cdot2}{3-2}
=
6.
$$

従って三次元では一次弱微分を $L^2$ で制御すると、零境界条件の下で典型的に

$$
H_0^1(\Omega)
\hookrightarrow
L^6(\Omega)
$$

まで積分可能性を上げられます。

一方 $d=2$、$p=2$ では分母 $d-p$ が 0 です。これは「$p^*=\infty$ と機械的に代入すればよい」という意味ではありません。$p=d$ は critical case で、別の現象が起きます。
<!-- definition-example-end -->

尺度変換は定理の証明ではありません。

しかし

$$
p^*=\frac{dp}{d-p}
$$

がなぜ突然現れるのかを、ほぼ一意に決めています。

---

## 2. 二種類の埋め込みを区別する

<a id="def-gpde5-continuous-embedding"></a>

<!-- formal-statement-start -->
> **定義（連続埋め込み）**  
> norm 空間 $X,Y$ が同じ対象の関数空間で $X\subseteq Y$ とする。
>
> 定数 $C>0$ が存在して任意の $u\in X$ に対し

$$
\|u\|_Y
\le
C\|u\|_X
$$

> が成り立つとき、$X$ は $Y$ に連続に埋め込まれるといい

$$
X\hookrightarrow Y
$$

> と書く。
<!-- formal-statement-end -->

<!-- definition-example-start: def-gpde5-continuous-embedding -->
**定義の確認**

GPDE4 の Poincaré 不等式は、有界開集合 $\Omega$ に対し

$$
\|u\|_{L^2}
\le
C_P\|\nabla u\|_{L^2}
\le
C_P\|u\|_{H^1}
$$

を与えました。

従って

$$
H_0^1(\Omega)
\hookrightarrow
L^2(\Omega)
$$

は連続埋め込みです。
<!-- definition-example-end -->

連続埋め込みは

$$
u_n\to u\text{ in }X
\Longrightarrow
u_n\to u\text{ in }Y
$$

を保証します。

しかし「$X$ で有界」というだけの列から、$Y$ で収束する部分列が取れるとはまだ言っていません。

そこで compactness を加えます。

<a id="def-gpde5-compact-embedding"></a>

<!-- formal-statement-start -->
> **定義（compact embedding）**  
> norm 空間 $X\subseteq Y$ とする。
>
> $X$ の任意の有界列 $(u_n)$ から、$Y$ の norm で収束する部分列を取り出せるとき、包含写像 $X\to Y$ は compact であるといい

$$
\boxed{
X\hookrightarrow\!\hookrightarrow Y
}
$$

> と書く。
<!-- formal-statement-end -->

<!-- definition-example-start: def-gpde5-compact-embedding -->
**定義の確認**

有限次元では何が起きるかを確認します。

$X=Y=\mathbb R^m$ とします。

$\mathbb R^m$ の有界列は Bolzano--Weierstrass により収束部分列を持ちます。

従って恒等写像

$$
\mathbb R^m\to\mathbb R^m
$$

は compact です。

無限次元ではこの性質が自動ではなくなります。本章の Rellich--Kondrachov は、Sobolev norm での微分制御が「低い norm では有限次元に近い」ことを作る定理です。
<!-- definition-example-end -->

compact embedding なら連続埋め込みも成り立つのが標準ですが、本章では必要な埋め込みごとに評価を明示します。

---

## 3. まず $W^{1,1}$ で微分から積分可能性を得る

高次元で微分制御を積分可能性へ変える最初の核心は、各座標方向について基本定理を使うことです。

$u\in C_c^\infty(\mathbb R^d)$ とし、$x=(x_1,\dots,x_d)$ と書きます。

$i$ 番目の座標だけを動かすと、compact support により十分遠くでは $u=0$ なので

$$
|u(x)|
\le
\int_{\mathbb R}
|\partial_i u(x_1,\dots,x_{i-1},t,x_{i+1},\dots,x_d)|
\,dt.
$$

右辺を

$$
g_i(\widehat x_i)
$$

と書きます。

ここで $\widehat x_i$ は $x_i$ を除いた $d-1$ 個の座標です。

各 $i$ について $|u(x)|\le g_i(\widehat x_i)$ なので

$$
|u(x)|^{d/(d-1)}
\le
\prod_{i=1}^d
g_i(\widehat x_i)^{1/(d-1)}.
$$

残るのは右辺を積分することです。

<a id="lem-gpde5-functional-loomis-whitney"></a>

<!-- formal-statement-start -->
> **補題（関数型 Loomis--Whitney 不等式）**  
> $d\ge2$ とし、各 $i=1,\dots,d$ について
>
> $g_i:\mathbb R^{d-1}\to[0,\infty)$
>
> を可積分関数とする。
>
> $g_i(\widehat x_i)$ を $\mathbb R^d$ 上で $x_i$ に依存しない関数として読むと

$$
\boxed{
\int_{\mathbb R^d}
\prod_{i=1}^d
g_i(\widehat x_i)^{1/(d-1)}
\,dx
\le
\prod_{i=1}^d
\|g_i\|_{L^1(\mathbb R^{d-1})}^{1/(d-1)}
}
$$

> が成り立つ。
<!-- formal-statement-end -->

### 証明の見取り図

$d=2$ では変数が分離して積分がそのまま積になります。

一般の $d$ では、最後の変数 $x_d$ を先に積分して [Hölder の不等式](../F0_00D2D_Lp_Holder_Minkowski/index.md#thm-f0-00d2d-01) を使います。

すると $d-1$ 次元の同じ形が現れます。

最後にもう一度 [Hölder の不等式](../F0_00D2D_Lp_Holder_Minkowski/index.md#thm-f0-00d2d-01) を使うと、帰納法が閉じます。

<!-- proof-start -->
### 証明

$d=2$ では

$$
g_1(\widehat x_1)=g_1(x_2),
\qquad
g_2(\widehat x_2)=g_2(x_1)
$$

なので [Fubini の定理](../F0_00D2C_積測度_Tonelli_Fubini/index.md#thm-f0-00d2c-02)により

$$
\int_{\mathbb R^2}
g_1(x_2)g_2(x_1)\,dx_1dx_2
=
\|g_1\|_1\|g_2\|_1.
$$

従って成立します。

$d-1$ 次元で成立すると仮定し、$d$ 次元を示します。

$x'=(x_1,\dots,x_{d-1})$ とします。

$x_d$ について先に積分します。

$g_d(\widehat x_d)=g_d(x')$ は $x_d$ に依存しません。

残る $d-1$ 個の因子に [Hölder の不等式](../F0_00D2D_Lp_Holder_Minkowski/index.md#thm-f0-00d2d-01) を指数 $d-1$ で適用すると

$$
\int_{\mathbb R}
\prod_{i=1}^{d-1}
g_i(\widehat x_i)^{1/(d-1)}
\,dx_d
\le
\prod_{i=1}^{d-1}
\left(
\int_{\mathbb R}
g_i(\widehat x_i)\,dx_d
\right)^{1/(d-1)}.
$$

$i=1,\dots,d-1$ に対し

$$
G_i(\widehat x_i')
:=
\int_{\mathbb R}
g_i(\widehat x_i)\,dx_d
$$

と置きます。

ここで $\widehat x_i'$ は $x'$ から $x_i$ を除いた $d-2$ 個の変数です。

従って元の積分は

$$
\int_{\mathbb R^{d-1}}
g_d(x')^{1/(d-1)}
\prod_{i=1}^{d-1}
G_i(\widehat x_i')^{1/(d-1)}
\,dx'
$$

以下です。

ここで [Hölder の不等式](../F0_00D2D_Lp_Holder_Minkowski/index.md#thm-f0-00d2d-01) を指数

$$
d-1,
\qquad
\frac{d-1}{d-2}
$$

で適用すると

$$
\int_{\mathbb R^{d-1}}
g_d^{1/(d-1)}
\prod_{i=1}^{d-1}
G_i^{1/(d-1)}
\le
\|g_d\|_1^{1/(d-1)}
\left[
\int_{\mathbb R^{d-1}}
\prod_{i=1}^{d-1}
G_i(\widehat x_i')^{1/(d-2)}
\,dx'
\right]^{(d-2)/(d-1)}.
$$

角括弧の中は $d-1$ 次元の Loomis--Whitney 型です。

帰納法の仮定から

$$
\int_{\mathbb R^{d-1}}
\prod_{i=1}^{d-1}
G_i(\widehat x_i')^{1/(d-2)}
\,dx'
\le
\prod_{i=1}^{d-1}
\|G_i\|_1^{1/(d-2)}.
$$

これを代入すると

$$
\int_{\mathbb R^d}
\prod_{i=1}^d
g_i(\widehat x_i)^{1/(d-1)}
\,dx
\le
\|g_d\|_1^{1/(d-1)}
\prod_{i=1}^{d-1}
\|G_i\|_1^{1/(d-1)}.
$$

[Fubini の定理](../F0_00D2C_積測度_Tonelli_Fubini/index.md#thm-f0-00d2c-02)により

$$
\|G_i\|_{L^1(\mathbb R^{d-2})}
=
\|g_i\|_{L^1(\mathbb R^{d-1})}.
$$

従って

$$
\int_{\mathbb R^d}
\prod_{i=1}^d
g_i(\widehat x_i)^{1/(d-1)}
\,dx
\le
\prod_{i=1}^d
\|g_i\|_1^{1/(d-1)}.
$$

帰納法により全ての $d\ge2$ で成立します。
<!-- proof-end -->

これで $W^{1,1}$ の基本評価を閉じられます。

<a id="thm-gpde5-w11-sobolev"></a>

<!-- formal-statement-start -->
> **定理（W11 Sobolev 不等式）**  
> $d\ge2$ とする。
>
> 定数 $C_d>0$ が存在して、任意の $u\in W^{1,1}(\mathbb R^d)$ に対し

$$
\boxed{
\|u\|_{L^{d/(d-1)}(\mathbb R^d)}
\le
C_d
\|\nabla u\|_{L^1(\mathbb R^d)}
}
$$

> が成り立つ。
<!-- formal-statement-end -->

### 証明の見取り図

各座標方向で

$$
|u(x)|\le g_i(\widehat x_i)
$$

を作り、全部を掛けます。

Loomis--Whitney によって $d$ 本の一次元積分を一つの $L^{d/(d-1)}$ norm へまとめます。

<!-- proof-start -->
### 証明

上で定めた

$$
g_i(\widehat x_i)
=
\int_{\mathbb R}
|\partial_i u(x_1,\dots,t,\dots,x_d)|
\,dt
$$

に対し

$$
|u(x)|^{d/(d-1)}
\le
\prod_{i=1}^d
g_i(\widehat x_i)^{1/(d-1)}.
$$

両辺を積分し、[関数型 Loomis--Whitney 不等式](#lem-gpde5-functional-loomis-whitney)を使うと

$$
\int_{\mathbb R^d}
|u|^{d/(d-1)}
\le
\prod_{i=1}^d
\|g_i\|_1^{1/(d-1)}.
$$

[Fubini の定理](../F0_00D2C_積測度_Tonelli_Fubini/index.md#thm-f0-00d2c-02)により

$$
\|g_i\|_1
=
\|\partial_i u\|_1.
$$

従って

$$
\|u\|_{d/(d-1)}^{d/(d-1)}
\le
\prod_{i=1}^d
\|\partial_i u\|_1^{1/(d-1)}.
$$

両辺を $(d-1)/d$ 乗すると

$$
\|u\|_{d/(d-1)}
\le
\left(
\prod_{i=1}^d
\|\partial_i u\|_1
\right)^{1/d}.
$$

相加相乗平均より

$$
\left(
\prod_{i=1}^d
\|\partial_i u\|_1
\right)^{1/d}
\le
\frac1d
\sum_{i=1}^d
\|\partial_i u\|_1.
$$

また点wiseに

$$
\sum_{i=1}^d|\partial_i u|
\le
\sqrt d\,|\nabla u|
$$

なので

$$
\frac1d
\sum_{i=1}^d
\|\partial_i u\|_1
\le
\frac1{\sqrt d}
\|\nabla u\|_1.
$$

従って定数をまとめれば、まず全ての $u\in C_c^\infty(\mathbb R^d)$ について

$$
\|u\|_{d/(d-1)}
\le
C_d\|\nabla u\|_1
$$

を得ます。

次に一般の $u\in W^{1,1}(\mathbb R^d)$ を取ります。

GPDE3 の [全空間上の滑らかなコンパクト台関数の密度](../GPDE3/index.md#thm-gpde3-ccinf-density-rd)により

$$
u_n\in C_c^\infty(\mathbb R^d),
\qquad
u_n\to u
\quad\text{in }W^{1,1}
$$

と取れます。

差 $u_n-u_m$ に今示した評価を適用すると

$$
\|u_n-u_m\|_{d/(d-1)}
\le
C_d
\|\nabla u_n-\nabla u_m\|_1
\to0.
$$

従って $(u_n)$ は $L^{d/(d-1)}$ で Cauchy です。

その極限を $v$ とします。

一方 $u_n\to u$ in $L^1$ なので、部分列を取れば a.e. で $u_n\to u$ です。

同じ部分列からさらに部分列を取り、$L^{d/(d-1)}$ 収束から a.e. で $u_n\to v$ とできます。

[距離空間における極限の一意性](../F0_00B_距離空間_開集合_閉集合_収束/index.md#prop-f0-00b-01)により $u=v$ です。

最後に極限を取って

$$
\|u\|_{d/(d-1)}
\le
C_d\|\nabla u\|_1.
$$
<!-- proof-end -->

定数の最良値ではなく、指数と証明機構が本章の主役です。

---

## 4. power trick で一般の $1<p<d$ へ上げる

<a id="thm-gpde5-sobolev-rd"></a>

<!-- formal-statement-start -->
> **定理（R^d 上の Sobolev 不等式）**  
> $d\ge2$、$1\le p<d$ とし

$$
p^*=\frac{dp}{d-p}
$$

> とする。
>
> 定数 $C_{d,p}>0$ が存在して、任意の $u\in W^{1,p}(\mathbb R^d)$ に対し

$$
\boxed{
\|u\|_{L^{p^*}(\mathbb R^d)}
\le
C_{d,p}
\|\nabla u\|_{L^p(\mathbb R^d)}
}
$$

> が成り立つ。
<!-- formal-statement-end -->

### 証明の見取り図

$p=1$ は前節で証明済みです。

$1<p<d$ では

$$
v=|u|^\alpha
$$

を $W^{1,1}$ の不等式へ入れます。

$\alpha$ は

$$
\alpha\frac d{d-1}=p^*
$$

となるよう選びます。

すると右辺の Hölder 指数も偶然ではなく、同じ $p^*$ に閉じます。

<!-- proof-start -->
### 証明

まず $u\in C_c^\infty(\mathbb R^d)$ とし、$1<p<d$ とします。

$$
q:=p^*=\frac{dp}{d-p}
$$

と置き、

$$
\alpha
:=
\frac{p(d-1)}{d-p}
$$

とします。

すると

$$
\alpha\frac d{d-1}
=
\frac{dp}{d-p}
=
q.
$$

$v=|u|^\alpha$ と置きます。

$\alpha>1$ なので $v\in W^{1,1}$ で

$$
|\nabla v|
=
\alpha |u|^{\alpha-1}|\nabla u|
$$

が a.e. 成り立ちます。

[W11 Sobolev 不等式](#thm-gpde5-w11-sobolev)から

$$
\|v\|_{d/(d-1)}
\le
C_d\|\nabla v\|_1.
$$

左辺は

$$
\|v\|_{d/(d-1)}
=
\left(
\int |u|^{\alpha d/(d-1)}
\right)^{(d-1)/d}
=
\|u\|_q^\alpha.
$$

右辺は

$$
C_d\alpha
\int
|u|^{\alpha-1}|\nabla u|.
$$

$p'=p/(p-1)$ とし [Hölder の不等式](../F0_00D2D_Lp_Holder_Minkowski/index.md#thm-f0-00d2d-01) を使うと

$$
\int
|u|^{\alpha-1}|\nabla u|
\le
\||u|^{\alpha-1}\|_{p'}
\|\nabla u\|_p.
$$

ここで

$$
(\alpha-1)p'
=
\frac{d(p-1)}{d-p}\frac{p}{p-1}
=
\frac{dp}{d-p}
=
q.
$$

従って

$$
\||u|^{\alpha-1}\|_{p'}
=
\|u\|_q^{\alpha-1}.
$$

以上から

$$
\|u\|_q^\alpha
\le
C_d\alpha
\|u\|_q^{\alpha-1}
\|\nabla u\|_p.
$$

$u=0$ なら自明です。

$u\ne0$ なら $\|u\|_q^{\alpha-1}$ で割って

$$
\|u\|_q
\le
C_{d,p}\|\nabla u\|_p.
$$

これで $C_c^\infty$ 上の評価が得られました。

一般の $u\in W^{1,p}(\mathbb R^d)$ を取ります。

GPDE3 の [全空間上の $C_c^\infty$ 密度](../GPDE3/index.md#thm-gpde3-ccinf-density-rd)により

$$
u_n\in C_c^\infty(\mathbb R^d),
\qquad
u_n\to u
\quad\text{in }W^{1,p}
$$

と取れます。

差 $u_n-u_m$ に [R^d 上の Sobolev 不等式](#thm-gpde5-sobolev-rd)を使うと

$$
\|u_n-u_m\|_{p^*}
\le
C_{d,p}
\|\nabla u_n-\nabla u_m\|_p
\to0.
$$

従って $(u_n)$ は $L^{p^*}$ Cauchy で、ある $v\in L^{p^*}$ へ収束します。

一方 $u_n\to u$ in $L^p$ なので部分列を取れば a.e. で $u_n\to u$ です。

同じ部分列は $L^{p^*}$ 収束からさらに部分列を取れば a.e. で $v$ へ収束します。

[距離空間における極限の一意性](../F0_00B_距離空間_開集合_閉集合_収束/index.md#prop-f0-00b-01)から $u=v$ a.e. です。

最後に極限を取って

$$
\|u\|_{p^*}
\le
C_{d,p}
\|\nabla u\|_p.
$$
<!-- proof-end -->

この証明で重要なのは

$$
\boxed{
\text{W}^{1,1}\text{ の幾何}
+
\text{power trick}
+
\text{Hölder}
}
$$

です。

---

## 5. 領域上では extension が境界を処理する

$\Omega\subset\mathbb R^d$ 上の $W^{1,p}$ 関数を、[R^d 上の Sobolev 不等式](#thm-gpde5-sobolev-rd)へそのまま入れることはできません。

一般の $u\in W^{1,p}(\Omega)$ を 0 で延長すると、境界に jump が生じて弱微分へ境界 measure が現れることがあるからです。

$H_0^1$ では零延長が使えますが、一般の $W^{1,p}(\Omega)$ では境界形状を使った extension operator が必要です。

<a id="thm-gpde5-extension-lipschitz"></a>

<!-- formal-statement-start -->
> **定理（bounded Lipschitz domain の Sobolev extension）**  
> $\Omega\subset\mathbb R^d$ を bounded Lipschitz domain とし、$1\le p\le\infty$ とする。
>
> このとき有界線形作用素

$$
E:
W^{1,p}(\Omega)
\to
W^{1,p}(\mathbb R^d)
$$

> が存在して

$$
Eu=u
\quad\text{a.e. on }\Omega
$$

> かつ

$$
\|Eu\|_{W^{1,p}(\mathbb R^d)}
\le
C_{\Omega,p}
\|u\|_{W^{1,p}(\Omega)}
$$

> が成り立つ。
<!-- formal-statement-end -->

### この定理で境界仮定を使う場所

この extension theorem の一般証明は、GPDE4 の trace theorem と同じく境界 chart の幾何が主役です。

bounded Lipschitz boundary を有限個の chart で平坦化し、各 chart でグラフ境界を越えて反射し、partition of unity で貼り合わせます。

その際

- chart と逆写像が Lipschitz であること。
- Jacobian が上下から制御されること。
- 反射後の一次弱微分が $L^p$ に残ること。
- 有限個の chart だけで境界全体を覆えること。

が必要です。

本章ではこの幾何的 extension construction を **意図的黒箱** とします。証明を使う後続箇所では、必ず「bounded Lipschitz domain だから有界 extension operator がある」と仮定確認を行います。

一方 $H_0^1$ の compactness はこの black box に依存させません。後半で任意の bounded open set に対し零延長から直接証明します。

<a id="cor-gpde5-lipschitz-embedding"></a>

<!-- formal-statement-start -->
> **系（bounded Lipschitz domain 上の Sobolev embedding）**  
> $\Omega\subset\mathbb R^d$ を bounded Lipschitz domain、$1\le p<d$ とする。
>
> $p^*=dp/(d-p)$ とすると

$$
\boxed{
W^{1,p}(\Omega)
\hookrightarrow
L^{p^*}(\Omega)
}
$$

> である。
>
> すなわち定数 $C>0$ が存在して

$$
\|u\|_{L^{p^*}(\Omega)}
\le
C
\|u\|_{W^{1,p}(\Omega)}
$$

> が全ての $u\in W^{1,p}(\Omega)$ で成り立つ。
<!-- formal-statement-end -->

<!-- proof-start -->
### 証明

extension theorem により

$$
Eu\in W^{1,p}(\mathbb R^d)
$$

かつ

$$
\|Eu\|_{W^{1,p}(\mathbb R^d)}
\le
C_E\|u\|_{W^{1,p}(\Omega)}.
$$

[R^d 上の Sobolev 不等式](#thm-gpde5-sobolev-rd)から

$$
\|Eu\|_{L^{p^*}(\mathbb R^d)}
\le
C_{d,p}
\|\nabla Eu\|_{L^p(\mathbb R^d)}
\le
C_{d,p}C_E
\|u\|_{W^{1,p}(\Omega)}.
$$

$Eu=u$ a.e. on $\Omega$ なので

$$
\|u\|_{L^{p^*}(\Omega)}
\le
\|Eu\|_{L^{p^*}(\mathbb R^d)}.
$$

従って結論が従います。
<!-- proof-end -->

### $H_0^1$ なら境界正則性なしで使える

$d\ge3$、$\Omega$ を任意の open set とし、$u\in H_0^1(\Omega)$ とします。

$C_c^\infty(\Omega)$ 近似を 0 延長すれば、零延長 $\widetilde u$ は $H^1(\mathbb R^d)$ に属し

$$
\|\nabla\widetilde u\|_{L^2(\mathbb R^d)}
=
\|\nabla u\|_{L^2(\Omega)}.
$$

従って

$$
\boxed{
\|u\|_{L^{2^*}(\Omega)}
\le
C_d\|\nabla u\|_2,
\qquad
2^*=\frac{2d}{d-2}
}
$$

です。

これは GPDE6 以降で最も使いやすい形です。

---

## 6. 次元と指数で何が変わるか

Sobolev embedding は一つの公式ではなく、$p$ と $d$ の比較で性格が変わります。

| regime | 典型的な結論 | 何を得るか |
|---|---|---|
| $p<d$ | $W^{1,p}\to L^{p^*}$ | integrability が上がる |
| $p=d$ | bounded domain では各有限 $q$ への埋め込み | critical、一般には $L^\infty$ までは行かない |
| $p>d$ | Hölder 連続代表元 | pointwise regularity が得られる |

$p>d$ では代表的に

$$
\alpha
=
1-\frac d p
>0
$$

として

$$
|u(x)-u(y)|
\le
C|x-y|^\alpha
\|u\|_{W^{1,p}}
$$

という Morrey 型評価が現れます。

この一般 Morrey theorem の完全証明は、ball 上の Poincaré 評価・平均値の dyadic 比較・Lebesgue differentiation を組み合わせる別の証明パッケージを必要とします。

本章では **Morrey 側は入口に留めます**。GPDE6--GPDE10 の主線で必要なのは、$H_0^1$ の integrability と compactness だからです。

ただし意味は重要です。

$$
p<d
\quad\Rightarrow\quad
\text{微分制御を積分可能性へ変換}
$$

に対し

$$
p>d
\quad\Rightarrow\quad
\text{微分制御を点wise連続性へ変換}
$$

へ役割が変わります。

---

## 7. 弱収束は「有界列から何かを残す」ために使う

FA3 で弱収束を

$$
u_n\rightharpoonup u
$$

と書き、全ての連続線形汎関数で値が収束することとして定義しました。

[弱収束の正本](../FA3/index.md#def-fa3-weak-convergence)を再定義はしません。

[完備な内積空間](../F0_02C1_ノルム空間_Banach_Hilbert/index.md#def-f0-02c1-hilbert-space)では Riesz 表現により

$$
u_n\rightharpoonup u
$$

は

$$
\langle u_n,v\rangle
\to
\langle u,v\rangle
\qquad
(\forall v)
$$

と同値です。

強収束なら弱収束しますが、逆は一般に偽です。

$\ell^2$ の標準基底 $e_n$ は

$$
e_n\rightharpoonup0
$$

ですが

$$
\|e_n\|_2=1
$$

なので強収束しません。

この「弱い代わりに部分列が取りやすい」性質を、完備な内積空間について点列レベルで直接証明します。

<a id="thm-gpde5-hilbert-weak-subsequence"></a>

<!-- formal-statement-start -->
> **定理（完備内積空間の有界列から弱収束部分列）**  
> 完備な内積空間 $H$ の有界列 $(u_n)$ に対し、ある部分列 $(u_{n_k})$ と $u\in H$ が存在して

$$
\boxed{
u_{n_k}\rightharpoonup u
\quad\text{in }H
}
$$

> となる。
<!-- formal-statement-end -->

### 証明の見取り図

列そのものが生成する閉部分空間だけを見れば可分です。

そこで可算正規直交基底を取り、各座標

$$
\langle u_n,e_j\rangle
$$

に対して対角線部分列を取ります。

座標極限が本当に $H$ の元を作ることは [Bessel の不等式](../F0_00E2_Cauchy_Schwarz_Bessel_Parseval/index.md#thm-f0-00e2-bessel-inequality)で確認します。

<!-- proof-start -->
### 証明

$(u_n)$ は有界なので、ある $M>0$ が存在して

$$
\|u_n\|_H\le M
$$

です。

$M_0$ を $\{u_n:n\ge1\}$ の線形包の閉包とします。

$M_0$ は可算集合から生成された可分な完備内積空間です。

$M_0$ が有限次元なら Bolzano--Weierstrass を各座標に使えば結論は直ちに従うので、以下では $M_0$ が無限次元の場合を書きます。

$M_0$ の可算正規直交基底を

$$
(e_1,e_2,\dots)
$$

とします。

各固定 $j$ について

$$
|\langle u_n,e_j\rangle|
\le
\|u_n\|\|e_j\|
\le M
$$

なので、スカラー列 $(\langle u_n,e_j\rangle)_n$ は有界です。

まず $j=1$ の座標が収束する部分列を取ります。

その部分列から $j=2$ の座標も収束する部分列を取ります。

これを繰り返し、対角線部分列 $(u_{n_k})$ を取ると、任意の $j$ について

$$
\langle u_{n_k},e_j\rangle
\to
a_j
$$

となるスカラー $a_j$ が存在します。

任意の $N$ に対し [Bessel の不等式](../F0_00E2_Cauchy_Schwarz_Bessel_Parseval/index.md#thm-f0-00e2-bessel-inequality)から

$$
\sum_{j=1}^N
|\langle u_{n_k},e_j\rangle|^2
\le
\|u_{n_k}\|^2
\le
M^2.
$$

$k\to\infty$ とすると

$$
\sum_{j=1}^N|a_j|^2
\le
M^2.
$$

さらに $N\to\infty$ として

$$
\sum_{j=1}^\infty|a_j|^2
\le
M^2.
$$

従って完備内積空間の正規直交展開により

$$
u
:=
\sum_{j=1}^\infty
a_j e_j
\in M_0
$$

が定まります。

まず有限線形結合

$$
v=\sum_{j=1}^N c_j e_j
$$

に対して

$$
\langle u_{n_k},v\rangle
=
\sum_{j=1}^N
\overline{c_j}
\langle u_{n_k},e_j\rangle
\to
\sum_{j=1}^N
\overline{c_j}a_j
=
\langle u,v\rangle.
$$

一般の $v\in M_0$ を取ります。

有限線形結合 $v_N$ を

$$
\|v-v_N\|\to0
$$

となるように取れます。

すると

$$
|\langle u_{n_k}-u,v-v_N\rangle|
\le
(\|u_{n_k}\|+\|u\|)\|v-v_N\|
\le
2M\|v-v_N\|
$$

です。

まず $N$ を大きくしてこの誤差を小さくし、その後固定した $N$ で $k\to\infty$ とすれば

$$
\langle u_{n_k},v\rangle
\to
\langle u,v\rangle
$$

が全ての $v\in M_0$ で成り立ちます。

最後に一般の $v\in H$ を

$$
v=v_0+v_\perp,
\qquad
v_0\in M_0,
\quad
v_\perp\in M_0^\perp
$$

と分解します。

$u_{n_k},u\in M_0$ なので

$$
\langle u_{n_k},v_\perp\rangle
=
\langle u,v_\perp\rangle
=
0.
$$

従って全ての $v\in H$ について

$$
\langle u_{n_k},v\rangle
\to
\langle u,v\rangle.
$$

すなわち

$$
u_{n_k}\rightharpoonup u.
$$
<!-- proof-end -->

ここでは Banach--Alaoglu や Eberlein--Šmulian を点列抽出の黒箱として使っていません。

完備内積空間で必要な点列版を直接閉じました。

### 弱収束 + norm 収束なら強収束

完備内積空間では

$$
u_n\rightharpoonup u,
\qquad
\|u_n\|\to\|u\|
$$

なら

$$
u_n\to u
$$

です。

実際

$$
\|u_n-u\|^2
=
\|u_n\|^2+\|u\|^2
-2\operatorname{Re}\langle u_n,u\rangle
\to0.
$$

弱収束で不足しているのは、ちょうど norm の情報だと読めます。

---

## 8. $H_0^1$ の零延長は translation に強い

compactness の核心は

$$
u(\cdot+h)-u
$$

が $h\to0$ で一様に小さくなることです。

<a id="lem-gpde5-h01-translation"></a>

<!-- formal-statement-start -->
> **補題（H01 零延長の translation estimate）**  
> $\Omega\subset\mathbb R^d$ を open set とし、$u\in H_0^1(\Omega)$ とする。
>
> $u$ を $\mathbb R^d$ へ 0 延長したものを $\widetilde u$ とする。
>
> このとき任意の $h\in\mathbb R^d$ に対し

$$
\boxed{
\|\widetilde u(\cdot+h)-\widetilde u\|_{L^2(\mathbb R^d)}
\le
|h|
\|\nabla u\|_{L^2(\Omega)}
}
$$

> が成り立つ。
<!-- formal-statement-end -->

### 証明の見取り図

まず $C_c^\infty(\Omega)$ で、$t\mapsto u(x+th)$ に [微積分学の基本定理II](../RA4/index.md#thm-ra4-ftc2) を使います。

$$
u(x+h)-u(x)
=
\int_0^1
h\cdot\nabla u(x+th)\,dt.
$$

Jensen と平行移動不変性で $L^2$ 評価を出し、最後に $H_0^1$ の閉包定義で一般の $u$ へ移します。

<!-- proof-start -->
### 証明

まず $\varphi\in C_c^\infty(\Omega)$ を $\mathbb R^d$ へ 0 延長します。

この零延長も $C_c^\infty(\mathbb R^d)$ です。

[微積分学の基本定理II](../RA4/index.md#thm-ra4-ftc2)から

$$
\varphi(x+h)-\varphi(x)
=
\int_0^1
h\cdot\nabla\varphi(x+th)\,dt.
$$

Cauchy--Schwarz と Jensen により

$$
|\varphi(x+h)-\varphi(x)|^2
\le
|h|^2
\int_0^1
|\nabla\varphi(x+th)|^2\,dt.
$$

$x$ で積分し [Fubini の定理](../F0_00D2C_積測度_Tonelli_Fubini/index.md#thm-f0-00d2c-02)を使うと

$$
\|\varphi(\cdot+h)-\varphi\|_2^2
\le
|h|^2
\int_0^1
\int_{\mathbb R^d}
|\nabla\varphi(x+th)|^2
\,dx\,dt.
$$

平行移動不変性により右辺は

$$
|h|^2\|\nabla\varphi\|_2^2
$$

に等しい。

従って

$$
\|\varphi(\cdot+h)-\varphi\|_2
\le
|h|\|\nabla\varphi\|_2.
$$

次に $u\in H_0^1(\Omega)$ とします。

定義から

$$
\varphi_n\in C_c^\infty(\Omega),
\qquad
\varphi_n\to u
\quad\text{in }H^1(\Omega)
$$

と取れます。

零延長すると

$$
\widetilde\varphi_n\to\widetilde u
\quad\text{in }L^2(\mathbb R^d)
$$

かつ

$$
\nabla\widetilde\varphi_n
\to
\widetilde{\nabla u}
\quad\text{in }L^2(\mathbb R^d).
$$

平行移動は $L^2$ isometry なので

$$
\widetilde\varphi_n(\cdot+h)-\widetilde\varphi_n
\to
\widetilde u(\cdot+h)-\widetilde u
\quad\text{in }L^2.
$$

各 $n$ の評価へ極限を取れば

$$
\|\widetilde u(\cdot+h)-\widetilde u\|_2
\le
|h|
\|\nabla u\|_2.
$$
<!-- proof-end -->

この一行評価が、無限次元の有界集合を低い norm で compact にする核心です。

---

## 9. translation が一様に小さければ有限次元近似できる

次の補題は Kolmogorov--Riesz compactness criterion の $L^2$ で必要な部分を、直接証明したものです。

<a id="lem-gpde5-l2-translation-compactness"></a>

<!-- formal-statement-start -->
> **補題（L2 translation compactness）**  
> $\mathcal F\subset L^2(\mathbb R^d)$ とする。
>
> 次を仮定する。
>
> 1. $\mathcal F$ は $L^2$ で有界である。
> 2. ある bounded set $K\subset\mathbb R^d$ が存在し、全ての $u\in\mathcal F$ が a.e. に $K$ の外で 0 である。
> 3. translation が一様に連続である。すなわち

$$
\lim_{h\to0}
\sup_{u\in\mathcal F}
\|u(\cdot+h)-u\|_2
=
0.
$$

> このとき $\mathcal F$ は $L^2(\mathbb R^d)$ で相対 compact である。
<!-- formal-statement-end -->

### 証明の見取り図

空間を小さい立方体に区切り、各立方体上で関数を平均値へ置き換えます。

同じ立方体内の二点の差は小さい translation です。

従って細かい grid では、全ての $u\in\mathcal F$ を一様に piecewise constant 関数へ近似できます。

support が固定 bounded set に入るので、使う立方体は有限個です。

つまり像は有限次元になります。

<!-- proof-start -->
### 証明

一辺 $\delta>0$ の半開立方体で $\mathbb R^d$ を分割します。

各 cube を $Q$ と書き、$|Q|=\delta^d$ とします。

$u\in L^2$ に対し

$$
u_Q
=
\frac1{|Q|}
\int_Q u(y)\,dy
$$

とし、

$$
P_\delta u
=
u_Q
\quad\text{on }Q
$$

と定めます。

各 cube で平均からの二乗偏差恒等式

$$
\int_Q|u-u_Q|^2
=
\frac1{2|Q|}
\int_Q\int_Q
|u(x)-u(y)|^2
\,dx\,dy
$$

が成り立ちます。

$h=y-x$ と置くと、$x,y\in Q$ なら

$$
|h|_\infty\le\delta.
$$

全 cube について和を取ると

$$
\|u-P_\delta u\|_2^2
\le
\frac1{2\delta^d}
\int_{[-\delta,\delta]^d}
\|u(\cdot+h)-u\|_2^2
\,dh.
$$

さらに $[-\delta,\delta]^d$ の体積は $(2\delta)^d$ なので

$$
\|u-P_\delta u\|_2^2
\le
2^{d-1}
\sup_{|h|_\infty\le\delta}
\|u(\cdot+h)-u\|_2^2.
$$

仮定 3 から、任意の $\varepsilon>0$ に対し $\delta$ を十分小さく取れば

$$
\sup_{u\in\mathcal F}
\|u-P_\delta u\|_2
<
\frac{\varepsilon}{3}.
$$

一方、全ての $u\in\mathcal F$ は固定 bounded set $K$ の外で 0 です。

従って $P_\delta u$ が非零になり得る cube は、$K$ と交わる有限個の cube だけです。

ゆえに

$$
P_\delta\mathcal F
$$

は有限次元の piecewise constant 空間に含まれます。

また Jensen により

$$
\|P_\delta u\|_2
\le
\|u\|_2
$$

なので、$\mathcal F$ の有界性から $P_\delta\mathcal F$ も有限次元空間で有界です。

有限次元の有界集合は totally bounded なので、有限個の点

$$
v_1,\dots,v_N
$$

を使って $P_\delta\mathcal F$ を $\varepsilon/3$-net で覆えます。

任意の $u\in\mathcal F$ に対し、ある $j$ が存在して

$$
\|P_\delta u-v_j\|_2<\frac{\varepsilon}{3}.
$$

従って

$$
\|u-v_j\|_2
\le
\|u-P_\delta u\|_2
+
\|P_\delta u-v_j\|_2
<
\frac{2\varepsilon}{3}.
$$

よって $\mathcal F$ 自身が totally bounded です。

$L^2(\mathbb R^d)$ は完備なので、その閉包は compact です。

従って $\mathcal F$ は相対 compact です。
<!-- proof-end -->

この証明では「compactness criterion」という名前だけを使っていません。

translation 制御が有限次元近似を作るところまで展開しました。

---

## 10. Rellich--Kondrachov：$H_0^1$ 有界列は $L^2$ で強収束部分列を持つ

<a id="thm-gpde5-rellich-h01-l2"></a>

<!-- formal-statement-start -->
> **定理（Rellich--Kondrachov：H01 から L2）**  
> $\Omega\subset\mathbb R^d$ を bounded open set とする。
>
> このとき

$$
\boxed{
H_0^1(\Omega)
\hookrightarrow\!\hookrightarrow
L^2(\Omega)
}
$$

> である。
>
> すなわち $H_0^1(\Omega)$ の任意の有界列 $(u_n)$ から、ある部分列 $(u_{n_k})$ と $u\in L^2(\Omega)$ を取り

$$
u_{n_k}\to u
\quad\text{in }L^2(\Omega)
$$

> とできる。
<!-- formal-statement-end -->

### 仮定を確認する

ここでは boundary が Lipschitz である必要はありません。

使うのは

- $\Omega$ bounded なので零延長の support が固定 bounded set に入ること。
- $u_n\in H_0^1$ なので零延長が $H^1(\mathbb R^d)$ に入り、translation estimate が使えること。

だけです。

### 証明の見取り図

$u_n$ を 0 延長します。

$H_0^1$ 有界性から

$$
\sup_n\|\widetilde u_n\|_2<\infty,
\qquad
\sup_n\|\nabla u_n\|_2<\infty.
$$

translation estimate により

$$
\sup_n
\|\widetilde u_n(\cdot+h)-\widetilde u_n\|_2
\le
C|h|\to0.
$$

前節の compactness lemma の三条件が揃います。

<!-- proof-start -->
### 証明

$(u_n)$ を $H_0^1(\Omega)$ の有界列とします。

ある $M>0$ が存在して

$$
\|u_n\|_{H^1(\Omega)}
\le M
$$

です。

各 $u_n$ を $\mathbb R^d$ へ 0 延長して $\widetilde u_n$ とします。

まず

$$
\|\widetilde u_n\|_{L^2(\mathbb R^d)}
=
\|u_n\|_{L^2(\Omega)}
\le M.
$$

従って $L^2$ で一様有界です。

次に $\Omega$ は bounded なので、ある bounded set $K$ が存在して

$$
\overline\Omega\subset K.
$$

全ての $\widetilde u_n$ は a.e. に $K$ の外で 0 です。

最後に [translation estimate](#lem-gpde5-h01-translation)から

$$
\|\widetilde u_n(\cdot+h)-\widetilde u_n\|_2
\le
|h|\|\nabla u_n\|_2
\le
M|h|.
$$

従って

$$
\sup_n
\|\widetilde u_n(\cdot+h)-\widetilde u_n\|_2
\le
M|h|
\to0
\qquad(h\to0).
$$

[L2 translation compactness](#lem-gpde5-l2-translation-compactness)の三仮定が全て満たされます。

従って $(\widetilde u_n)$ から $L^2(\mathbb R^d)$ で強収束する部分列 $(\widetilde u_{n_k})$ を取れます。

極限を $\widetilde u$ とします。

各 $\widetilde u_{n_k}$ は $\Omega$ の外で 0 なので

$$
\int_{\mathbb R^d\setminus\Omega}
|\widetilde u|^2
\le
2\|\widetilde u-\widetilde u_{n_k}\|_2^2
+
2\int_{\mathbb R^d\setminus\Omega}
|\widetilde u_{n_k}|^2
\to0.
$$

従って $\widetilde u=0$ a.e. on $\mathbb R^d\setminus\Omega$ です。

$u=\widetilde u|_\Omega$ と置けば

$$
u_{n_k}\to u
\quad\text{in }L^2(\Omega).
$$

よって

$$
H_0^1(\Omega)
\hookrightarrow\!\hookrightarrow
L^2(\Omega).
$$
<!-- proof-end -->

これが Encore III で繰り返し使う compactness の最小正本です。

---

## 11. subcritical exponent ではさらに $L^q$ 強収束まで上げられる

$d\ge3$ では

$$
2^*
=
\frac{2d}{d-2}.
$$

$H_0^1$ 有界列は [R^d 上の Sobolev 不等式](#thm-gpde5-sobolev-rd)により $L^{2^*}$ でも一様有界です。

Rellich により部分列が $L^2$ で強収束すれば、$2<q<2^*$ に対して interpolation で $L^q$ 強収束へ上げられます。

<a id="cor-gpde5-subcritical-compact"></a>

<!-- formal-statement-start -->
> **系（H01 の subcritical compact embedding）**  
> $\Omega\subset\mathbb R^d$ を bounded open set とする。
>
> $d\ge3$ なら任意の

$$
1\le q<2^*=\frac{2d}{d-2}
$$

> に対して

$$
\boxed{
H_0^1(\Omega)
\hookrightarrow\!\hookrightarrow
L^q(\Omega)
}
$$

> である。
>
> $d=2$ なら任意の有限 $1\le q<\infty$ に対して同じ compact embedding が成り立つ。
<!-- formal-statement-end -->

<!-- proof-start -->
### 証明

まず $d\ge3$ とします。

$H_0^1$ 有界列 $(u_n)$ から Rellich により

$$
u_{n_k}\to u
\quad\text{in }L^2
$$

となる部分列を取ります。

[R^d 上の Sobolev 不等式](#thm-gpde5-sobolev-rd)により $(u_{n_k})$ は $L^{2^*}$ で一様有界です。

さらに $L^2$ 強収束から部分列を取り、a.e. に $u_{n_k}\to u$ としてよいです。$L^{2^*}$ norm の一様有界性と [Fatou の補題](../F0_00D2B_単調収束_Fatou_優収束/index.md#lem-f0-00d2b-01)から

$$
\int_\Omega |u|^{2^*}
\le
\liminf_{k\to\infty}
\int_\Omega |u_{n_k}|^{2^*}
<\infty.
$$

従って $u\in L^{2^*}(\Omega)$ であり、差

$$
w_k=u_{n_k}-u
$$

も $L^{2^*}$ で一様有界です。

$2<q<2^*$ に対し

$$
\frac1q
=
\frac{\theta}{2}
+
\frac{1-\theta}{2^*}
\qquad
(0<\theta<1)
$$

となる $\theta$ を取ります。

[Hölder の不等式](../F0_00D2D_Lp_Holder_Minkowski/index.md#thm-f0-00d2d-01)から得られる interpolation により

$$
\|w_k\|_q
\le
\|w_k\|_2^\theta
\|w_k\|_{2^*}^{1-\theta}.
$$

第一因子は 0 へ収束し、第二因子は有界なので

$$
\|w_k\|_q\to0.
$$

$1\le q<2$ では $\Omega$ の有限測度性から

$$
\|w_k\|_q
\le
|\Omega|^{1/q-1/2}
\|w_k\|_2
\to0.
$$

従って全ての $1\le q<2^*$ で compact です。

次に $d=2$ とします。

任意の有限 $q>2$ を固定します。

$q<s<\infty$ となる $s$ を取ります。

$r<2$ を十分 2 に近く選べば

$$
r^*=\frac{2r}{2-r}>s
$$

とできます。

$\Omega$ は有限測度なので [Hölder の不等式](../F0_00D2D_Lp_Holder_Minkowski/index.md#thm-f0-00d2d-01)により

$$
\|f\|_{L^r(\Omega)}
\le
|\Omega|^{1/r-1/2}
\|f\|_{L^2(\Omega)}
$$

が $f$ と各一次弱微分に使えます。

従って $H_0^1$ 有界列は $W^{1,r}$ でも一様有界です。

さらに $H_0^1$ の $C_c^\infty$ 近似列は同じ評価により $W^{1,r}$ でも収束するので、各 $u_n$ は $W_0^{1,r}(\Omega)$ に属します。

$r<d=2$ なので零延長と[R^d 上の Sobolev 不等式](#thm-gpde5-sobolev-rd)から $L^{r^*}$、従って $L^s$ で一様有界です。

Rellich の $L^2$ 強収束と $L^s$ 有界性を interpolation すれば $L^q$ 強収束を得ます。

$q\le2$ は先ほどと同じ有限測度評価で従います。
<!-- proof-end -->

$d=1$ では GPDE4 の一変数絶対連続代表元と Cauchy--Schwarz からさらに強い連続性が得られます。

---

## 12. 弱極限と強極限を同じものにする

PDE の典型的な列では

$$
u_n\rightharpoonup u
\quad\text{in }H_0^1
$$

と

$$
u_n\to v
\quad\text{in }L^2
$$

を別々に得ます。

この二つの極限は一致します。

実際、包含写像

$$
H_0^1(\Omega)\hookrightarrow L^2(\Omega)
$$

は連続です。

従って $H_0^1$ 弱収束から $L^2$ 弱収束

$$
u_n\rightharpoonup u
\quad\text{in }L^2
$$

も従います。

一方 $L^2$ 強収束は $L^2$ 弱収束を含意するので

$$
u_n\rightharpoonup v
\quad\text{in }L^2.
$$

$L^2$ の弱極限は一意だから

$$
u=v.
$$

従って bounded sequence から部分列を取り直して

$$
\boxed{
u_{n_k}\rightharpoonup u
\text{ in }H_0^1,
\qquad
u_{n_k}\to u
\text{ in }L^2
}
$$

と同じ $u$ へ収束させられます。

これが GPDE10 の Galerkin limit passage の基本形です。

### なぜ強収束が欲しいのか

たとえば

$$
u_n\to u
\quad\text{in }L^2
$$

なら

$$
\|u_n^2-u^2\|_{L^1}
=
\|(u_n-u)(u_n+u)\|_1
$$

に [Hölder の不等式](../F0_00D2D_Lp_Holder_Minkowski/index.md#thm-f0-00d2d-01)を使って

$$
\|u_n^2-u^2\|_1
\le
\|u_n-u\|_2
\left(
\|u_n\|_2+\|u\|_2
\right)
\to0.
$$

弱収束だけでは norm や積は一般に連続ではありません。

compactness は、非線形項や積の極限へ進むための「強収束回収装置」です。

---

## 13. critical exponent で compactness が壊れる

ここでは $H_0^1$ の一般 $p$ 版を一度だけ使います。

<a id="def-gpde5-w01p"></a>

<!-- formal-statement-start -->
> **定義（W01p）**  
> $\Omega\subset\mathbb R^d$ を open set、$1\le p<\infty$ とする。
>
> $C_c^\infty(\Omega)$ の $W^{1,p}(\Omega)$ norm による閉包を

$$
\boxed{
W_0^{1,p}(\Omega)
:=
\overline{C_c^\infty(\Omega)}^{\,W^{1,p}(\Omega)}
}
$$

> と定める。
<!-- formal-statement-end -->

<!-- definition-example-start: def-gpde5-w01p -->
**定義の確認**

$\varphi\in C_c^\infty(\Omega)$ なら一定列 $\varphi_n=\varphi$ が $W^{1,p}$ で $\varphi$ へ収束するので

$$
\varphi\in W_0^{1,p}(\Omega).
$$

$p=2$ では GPDE4 の

$$
W_0^{1,2}(\Omega)=H_0^1(\Omega)
$$

です。
<!-- definition-example-end -->

Sobolev inequality は critical exponent $p^*$ まで連続埋め込みを与えます。

しかし critical exponent では一般に compact ではありません。

原因は **concentration** です。

<a id="prop-gpde5-critical-noncompactness"></a>

<!-- formal-statement-start -->
> **命題（critical exponent では compactness が壊れる）**  
> $1\le p<d$ とし、$\Omega\subset\mathbb R^d$ を非空 open set とする。
>
> $p^*=dp/(d-p)$ とする。
>
> このとき一般に

$$
W_0^{1,p}(\Omega)
\hookrightarrow
L^{p^*}(\Omega)
$$

> は compact ではない。
>
> 実際、$W_0^{1,p}$ で有界だが $L^{p^*}$ で強収束部分列を持たない concentration sequence を構成できる。
<!-- formal-statement-end -->

### 証明の見取り図

一点 $x_0\in\Omega$ の近くへ bump function を縮めます。

support は縮みますが、振幅をちょうど

$$
n^{(d-p)/p}
$$

だけ上げると

$$
\|\nabla u_n\|_p
\quad\text{と}\quad
\|u_n\|_{p^*}
$$

が尺度不変になります。

これが criticality そのものです。

<!-- proof-start -->
### 証明

$x_0\in\Omega$ を取ります。

$\Omega$ は open なので、ある $r>0$ が存在して

$$
B(x_0,r)\subset\Omega.
$$

非零関数

$$
\varphi\in C_c^\infty(B(0,1))
$$

を固定します。

十分大きい $n$ に対し

$$
u_n(x)
=
n^{(d-p)/p}
\varphi(n(x-x_0))
$$

と置きます。

support は

$$
\operatorname{supp}u_n
\subset
B(x_0,1/n)
\subset
\Omega
$$

なので

$$
u_n\in C_c^\infty(\Omega)
\subset
W_0^{1,p}(\Omega).
$$

まず $L^p$ norm は、$y=n(x-x_0)$ と変数変換して

$$
\|u_n\|_p^p
=
\int
n^{d-p}
|\varphi(n(x-x_0))|^p
\,dx.
$$

変数変換後は

$$
\|u_n\|_p^p
=
n^{d-p}n^{-d}
\|\varphi\|_p^p
=
n^{-p}
\|\varphi\|_p^p.
$$

従って

$$
\|u_n\|_p
=
n^{-1}\|\varphi\|_p
\to0.
$$

次に

$$
\nabla u_n(x)
=
n^{(d-p)/p+1}
\nabla\varphi(n(x-x_0)).
$$

指数は

$$
\frac{d-p}{p}+1
=
\frac d p.
$$

従って

$$
\|\nabla u_n\|_p^p
=
n^d n^{-d}
\|\nabla\varphi\|_p^p
=
\|\nabla\varphi\|_p^p.
$$

よって $(u_n)$ は $W_0^{1,p}$ で有界です。

最後に $q=p^*=dp/(d-p)$ とすると

$$
q\frac{d-p}{p}
=
d.
$$

従って

$$
\|u_n\|_q^q
=
n^d n^{-d}
\|\varphi\|_q^q
=
\|\varphi\|_q^q.
$$

すなわち

$$
\|u_n\|_{p^*}
=
\|\varphi\|_{p^*}
>0
$$

は一定です。

一方 $x\ne x_0$ を固定すると、十分大きい $n$ では

$$
x\notin B(x_0,1/n)
$$

なので

$$
u_n(x)=0.
$$

従って

$$
u_n(x)\to0
$$

が a.e. 成り立ちます。

もし $L^{p^*}$ で強収束する部分列が存在したとします。

さらに部分列を取れば a.e. でもその強極限へ収束します。

しかし a.e. 極限は 0 なので、強極限は 0 です。

すると norm も

$$
\|u_{n_k}\|_{p^*}\to0
$$

でなければなりません。

これは

$$
\|u_{n_k}\|_{p^*}
=
\|\varphi\|_{p^*}
>0
$$

に矛盾します。

従って $L^{p^*}$ 強収束部分列は存在しません。
<!-- proof-end -->

subcritical $q<p^*$ では縮小 support が norm を 0 へ押し下げます。

critical $q=p^*$ ではちょうど尺度が釣り合って norm が残ります。

これが

$$
\boxed{
\text{continuous at critical}
\quad\text{but}\quad
\text{compact only below critical}
}
$$

の正体です。

---

## 14. PDE で使う compactness パッケージ

GPDE6 以降では、次の形を一つの定型手順として使います。

$$
\|u_n\|_{H_0^1(\Omega)}
\le C
$$

が得られたとします。

### Step 1：弱収束部分列

$H_0^1(\Omega)$ は GPDE4 で完備な内積空間だと示しました。

従って [完備内積空間の有界列から弱収束部分列](#thm-gpde5-hilbert-weak-subsequence)から

$$
u_{n_k}\rightharpoonup u
\quad\text{in }H_0^1.
$$

### Step 2：Rellich で強収束

$\Omega$ bounded なら

$$
u_{n_k}\to u
\quad\text{in }L^2
$$

となるよう、必要ならさらに部分列を取れます。

### Step 3：subcritical $L^q$ へ上げる

次元に応じた Sobolev bound と interpolation により

$$
u_{n_k}\to u
\quad\text{in }L^q
$$

を subcritical range で得られます。

### Step 4：極限式へ戻す

線形項は弱収束で処理し、積・非線形項など強収束が必要な箇所だけ compactness で得た強収束を使います。

この使い分けが重要です。

弱収束を無理に強収束へ置き換えるのでも、全てを weak limit だけで押し切るのでもありません。

---

## 15. 演習

### Level A

<a id="ex-gpde5-a01"></a>
#### GPDE5-A01 scaling から $p^*$ を出す
- Level: A

$u_\lambda(x)=u(\lambda x)$ とする。

$$
\|u_\lambda\|_q
\le
C\|\nabla u_\lambda\|_p
$$

が $\lambda>0$ に依存しない同じ定数 $C$ で成立するために必要な $q$ を求めよ。

<!-- solution-start -->
**解答・解説**

変数変換から

$$
\|u_\lambda\|_q
=
\lambda^{-d/q}\|u\|_q.
$$

また

$$
\nabla u_\lambda(x)
=
\lambda\nabla u(\lambda x)
$$

なので

$$
\|\nabla u_\lambda\|_p
=
\lambda^{1-d/p}
\|\nabla u\|_p.
$$

同じ不等式が全ての $\lambda$ で尺度不変に成立するには

$$
-\frac d q
=
1-\frac d p
$$

が必要です。

従って

$$
\frac1q
=
\frac1p-\frac1d
$$

であり

$$
\boxed{
q=p^*=\frac{dp}{d-p}
}.
$$

$d=3,p=2$ なら $q=6$ です。
<!-- solution-end -->

<a id="ex-gpde5-a02"></a>
#### GPDE5-A02 weak と strong を区別する
- Level: A

$\ell^2$ の標準基底 $(e_n)$ について

$$
e_n\rightharpoonup0
$$

だが strong convergence しないことを確認せよ。

<!-- solution-start -->
**解答・解説**

任意の $y=(y_j)\in\ell^2$ に対し

$$
\langle e_n,y\rangle
=
\overline{y_n}.
$$

$\ell^2$ 列は $y_n\to0$ を満たすので

$$
\langle e_n,y\rangle\to0.
$$

全ての $y$ に対して内積評価が 0 へ収束するから

$$
e_n\rightharpoonup0.
$$

一方

$$
\|e_n-0\|_2
=
1
$$

なので

$$
\|e_n\|_2\not\to0.
$$

従って strong convergence はしません。

弱収束だけでは norm が保存され得ることが分かります。
<!-- solution-end -->

<a id="ex-gpde5-a03"></a>
#### GPDE5-A03 translation estimate を再現する
- Level: A

$\varphi\in C_c^\infty(\mathbb R^d)$ に対し

$$
\|\varphi(\cdot+h)-\varphi\|_2
\le
|h|\|\nabla\varphi\|_2
$$

を基本定理から導け。

<!-- solution-start -->
**解答・解説**

固定した $x$ に対して

$$
F(t)=\varphi(x+th)
$$

と置きます。

すると

$$
F'(t)
=
h\cdot\nabla\varphi(x+th).
$$

基本定理から

$$
\varphi(x+h)-\varphi(x)
=
\int_0^1
h\cdot\nabla\varphi(x+th)\,dt.
$$

Cauchy--Schwarz により

$$
|\varphi(x+h)-\varphi(x)|^2
\le
|h|^2
\int_0^1
|\nabla\varphi(x+th)|^2\,dt.
$$

$x$ で積分し [Fubini の定理](../F0_00D2C_積測度_Tonelli_Fubini/index.md#thm-f0-00d2c-02)を使うと

$$
\|\varphi(\cdot+h)-\varphi\|_2^2
\le
|h|^2
\int_0^1
\|\nabla\varphi(\cdot+th)\|_2^2\,dt.
$$

Lebesgue measure の平行移動不変性から

$$
\|\nabla\varphi(\cdot+th)\|_2
=
\|\nabla\varphi\|_2.
$$

従って

$$
\|\varphi(\cdot+h)-\varphi\|_2^2
\le
|h|^2\|\nabla\varphi\|_2^2.
$$

平方根を取って結論です。
<!-- solution-end -->

<a id="ex-gpde5-a04"></a>
#### GPDE5-A04 高周波列で compactness を見る
- Level: A

$\Omega=(0,1)$ とし

$$
u_n(x)
=
\frac{\sin(n\pi x)}{n\pi}
$$

とする。

1. $(u_n)$ が $H_0^1(0,1)$ で有界であることを示せ。
2. $u_n\to0$ in $L^2(0,1)$ を示せ。
3. $u_n\to0$ in $H_0^1$ ではないことを示せ。

<!-- solution-start -->
**解答・解説**

端点で

$$
u_n(0)=u_n(1)=0
$$

なので、一変数の zero-trace characterization から $u_n\in H_0^1(0,1)$ です。

まず

$$
u_n'(x)=\cos(n\pi x).
$$

従って

$$
\|u_n'\|_2^2
=
\int_0^1\cos^2(n\pi x)\,dx
=
\frac12.
$$

また

$$
\|u_n\|_2^2
=
\frac1{n^2\pi^2}
\int_0^1\sin^2(n\pi x)\,dx
=
\frac1{2n^2\pi^2}.
$$

したがって

$$
\|u_n\|_{H^1}^2
=
\frac12+\frac1{2n^2\pi^2}
\le1
$$

で有界です。

さらに

$$
\|u_n\|_2
=
\frac1{\sqrt2\,n\pi}
\to0.
$$

よって $L^2$ では strong convergence します。

しかし

$$
\|u_n'\|_2
=
\frac1{\sqrt2}
$$

は 0 へ収束しません。

従って

$$
\|u_n\|_{H^1}\not\to0.
$$

つまり $H_0^1$ では strong convergence しません。

Rellich compactness が「高い norm での強収束」ではなく「低い $L^2$ norm での強収束」を回収することが見えます。
<!-- solution-end -->

### Level B

<a id="ex-gpde5-b01"></a>
#### GPDE5-B01 $H_0^1$ の critical Sobolev bound
- Level: B

$d\ge3$、$\Omega\subset\mathbb R^d$ を open set とする。

任意の $u\in H_0^1(\Omega)$ に対し

$$
\|u\|_{L^{2d/(d-2)}(\Omega)}
\le
C_d
\|\nabla u\|_{L^2(\Omega)}
$$

を示せ。

境界の Lipschitz 性を仮定しない理由も説明せよ。

<!-- solution-start -->
**解答・解説**

$u\in H_0^1(\Omega)$ なので、定義から

$$
\varphi_n\in C_c^\infty(\Omega),
\qquad
\varphi_n\to u
\quad\text{in }H^1(\Omega)
$$

と取れます。

各 $\varphi_n$ を $\mathbb R^d$ へ 0 延長します。

compact support が $\Omega$ 内部にあるため、延長後も

$$
\widetilde\varphi_n\in C_c^\infty(\mathbb R^d).
$$

また

$$
\|\widetilde\varphi_n-\widetilde\varphi_m\|_{H^1(\mathbb R^d)}
=
\|\varphi_n-\varphi_m\|_{H^1(\Omega)}.
$$

従って零延長列は $H^1(\mathbb R^d)$ Cauchy で、極限は $u$ の零延長 $\widetilde u$ です。

[R^d 上の Sobolev 不等式](#thm-gpde5-sobolev-rd)を $p=2$ で使うと

$$
\|\widetilde u\|_{L^{2^*}(\mathbb R^d)}
\le
C_d
\|\nabla\widetilde u\|_2,
\qquad
2^*=\frac{2d}{d-2}.
$$

零延長なので

$$
\|\widetilde u\|_{L^{2^*}(\mathbb R^d)}
=
\|u\|_{L^{2^*}(\Omega)}
$$

かつ

$$
\|\nabla\widetilde u\|_{L^2(\mathbb R^d)}
=
\|\nabla u\|_{L^2(\Omega)}.
$$

従って

$$
\boxed{
\|u\|_{L^{2d/(d-2)}(\Omega)}
\le
C_d\|\nabla u\|_2
}.
$$

一般の $H^1(\Omega)$ 関数を 0 延長すると境界 jump が出る可能性があります。

しかし $H_0^1$ は $C_c^\infty(\Omega)$ の $H^1$ 閉包として定義されるため、零延長を近似列から構成できます。

したがって境界の Lipschitz 性は不要です。
<!-- solution-end -->

<a id="ex-gpde5-b02"></a>
#### GPDE5-B02 weak + norm convergence から strong convergence
- Level: B

完備な内積空間 $H$ で

$$
u_n\rightharpoonup u,
\qquad
\|u_n\|\to\|u\|
$$

なら

$$
u_n\to u
$$

in norm であることを証明せよ。

<!-- solution-start -->
**解答・解説**

Hilbert norm を内積で展開します。

$$
\|u_n-u\|^2
=
\|u_n\|^2
+
\|u\|^2
-
2\operatorname{Re}\langle u_n,u\rangle.
$$

弱収束から、固定した $u\in H$ に対して

$$
\langle u_n,u\rangle
\to
\langle u,u\rangle
=
\|u\|^2.
$$

また仮定から

$$
\|u_n\|^2\to\|u\|^2.
$$

従って右辺の極限は

$$
\|u\|^2+\|u\|^2-2\|u\|^2
=
0.
$$

よって

$$
\|u_n-u\|^2\to0,
$$

すなわち

$$
u_n\to u
$$

strongly in $H$ です。
<!-- solution-end -->

<a id="ex-gpde5-b03"></a>
#### GPDE5-B03 weak $H_0^1$ と strong $L^2$ の極限を同定する
- Level: B

$\Omega$ を bounded open set とし、$(u_n)$ を $H_0^1(\Omega)$ の有界列とする。

ある部分列について

$$
u_n\rightharpoonup u
\quad\text{in }H_0^1
$$

かつ

$$
u_n\to v
\quad\text{in }L^2
$$

が得られたとする。

1. $u=v$ a.e. を示せ。
2. さらに $u_n^2\to u^2$ in $L^1$ を示せ。

<!-- solution-start -->
**解答・解説**

まず [Poincaré 不等式](../GPDE4/index.md#thm-gpde4-poincare)により包含写像

$$
H_0^1(\Omega)\to L^2(\Omega)
$$

は連続です。

従って $H_0^1$ 弱収束から

$$
u_n\rightharpoonup u
\quad\text{in }L^2
$$

が従います。

一方

$$
u_n\to v
\quad\text{in }L^2
$$

なら strong convergence は weak convergence を含意するので

$$
u_n\rightharpoonup v
\quad\text{in }L^2.
$$

$L^2$ の弱極限は一意なので

$$
u=v
\quad\text{in }L^2,
$$

すなわち a.e. 同値類として同じです。

次に

$$
u_n^2-u^2
=
(u_n-u)(u_n+u).
$$

[Hölder の不等式](../F0_00D2D_Lp_Holder_Minkowski/index.md#thm-f0-00d2d-01)により

$$
\|u_n^2-u^2\|_1
\le
\|u_n-u\|_2
\|u_n+u\|_2.
$$

第一因子は strong $L^2$ convergence により 0 へ収束します。

第二因子は

$$
\|u_n+u\|_2
\le
\|u_n\|_2+\|u\|_2
$$

であり、strong convergence する列は有界なので一様に有界です。

従って

$$
\boxed{
\|u_n^2-u^2\|_1\to0
}.
$$

compactness による $L^2$ strong convergence が二次非線形項の極限を可能にしています。
<!-- solution-end -->

### Level C

<a id="ex-gpde5-c01"></a>
#### GPDE5-C01 critical concentration と非compact性
- Level: C

$1\le p<d$、$\Omega\subset\mathbb R^d$ を非空 open set とする。

$x_0\in\Omega$ と非零

$$
\varphi\in C_c^\infty(B(0,1))
$$

を取り、十分大きい $n$ に対し

$$
u_n(x)
=
n^\alpha
\varphi(n(x-x_0))
$$

とする。

1. $\|\nabla u_n\|_p$ が $n$ に依存しないよう $\alpha$ を決めよ。
2. その $\alpha$ で $\|u_n\|_{p^*}$ も一定になることを示せ。
3. $\|u_n\|_p\to0$ を示せ。
4. $(u_n)$ が $L^{p^*}$ で strong convergent subsequence を持たないことを示せ。
5. なぜ $q<p^*$ なら同じ concentration が compactness を壊さないか、norm scaling から説明せよ。

<!-- solution-start -->
**解答・解説**

まず

$$
u_n(x)
=
n^\alpha
\varphi(n(x-x_0))
$$

とします。

微分すると

$$
\nabla u_n(x)
=
n^{\alpha+1}
\nabla\varphi(n(x-x_0)).
$$

変数変換

$$
y=n(x-x_0),
\qquad
dx=n^{-d}dy
$$

により

$$
\|\nabla u_n\|_p^p
=
n^{p(\alpha+1)-d}
\|\nabla\varphi\|_p^p.
$$

これを $n$ に依存させないためには

$$
p(\alpha+1)-d=0.
$$

従って

$$
\boxed{
\alpha
=
\frac d p-1
=
\frac{d-p}{p}
}.
$$

次に一般の $q$ について

$$
\|u_n\|_q^q
=
n^{q\alpha-d}
\|\varphi\|_q^q.
$$

critical exponent

$$
p^*
=
\frac{dp}{d-p}
$$

では

$$
p^*\alpha
=
\frac{dp}{d-p}\frac{d-p}{p}
=
d.
$$

従って

$$
\|u_n\|_{p^*}^{p^*}
=
\|\varphi\|_{p^*}^{p^*},
$$

すなわち

$$
\boxed{
\|u_n\|_{p^*}
=
\|\varphi\|_{p^*}
}.
$$

$q=p$ なら

$$
p\alpha-d
=
(d-p)-d
=
-p.
$$

よって

$$
\|u_n\|_p^p
=
n^{-p}\|\varphi\|_p^p
$$

であり

$$
\boxed{
\|u_n\|_p
=
n^{-1}\|\varphi\|_p
\to0
}.
$$

support は

$$
\operatorname{supp}u_n
\subset
B(x_0,1/n)
$$

なので、$x\ne x_0$ を固定すると十分大きい $n$ で $u_n(x)=0$ です。

従って

$$
u_n\to0
\quad\text{a.e.}
$$

です。

もし $L^{p^*}$ strong convergent subsequence $u_{n_k}\to v$ があれば、さらに部分列を取って a.e. convergence も得られます。

a.e. 極限は 0 なので $v=0$ a.e. です。

strong convergence なら norm も収束するため

$$
\|u_{n_k}\|_{p^*}
\to
\|v\|_{p^*}
=
0
$$

でなければなりません。

しかし全ての $k$ で

$$
\|u_{n_k}\|_{p^*}
=
\|\varphi\|_{p^*}
>0.
$$

矛盾です。

従って critical embedding は compact ではありません。

最後に $q<p^*$ とします。

$\alpha=(d-p)/p$ なので

$$
q\alpha-d
<
p^*\alpha-d
=
0.
$$

従って

$$
\|u_n\|_q^q
=
n^{q\alpha-d}
\|\varphi\|_q^q
\to0.
$$

つまり subcritical norm では concentration しても mass が消えます。

critical exponent だけが尺度変換に対して norm を保存するため、compactness loss が残ります。
<!-- solution-end -->

---

## 16. まとめ

本章で得た構造は次です。

$$
\boxed{
1\le p<d
\Longrightarrow
W^{1,p}
\hookrightarrow
L^{p^*},
\qquad
p^*=\frac{dp}{d-p}
}
$$

Sobolev exponent は尺度変換から必然に現れ、$W^{1,1}$ の座標積分と Loomis--Whitney、power trick によって一般 $p$ の不等式を証明しました。

bounded Lipschitz domain では extension theorem が全空間の不等式を領域へ運びます。

一方 $H_0^1$ では零延長が使えるため、境界正則性なしで Sobolev inequality と compactness を扱えます。

compactness の核心は

$$
\|\widetilde u(\cdot+h)-\widetilde u\|_2
\le
|h|\|\nabla u\|_2
$$

という translation estimate です。

これにより

$$
H_0^1(\Omega)
\hookrightarrow\!\hookrightarrow
L^2(\Omega)
$$

を任意の bounded open set で完全証明しました。

したがって有界列から

$$
u_{n_k}\rightharpoonup u
\quad\text{in }H_0^1,
$$

同時に

$$
u_{n_k}\to u
\quad\text{in }L^2
$$

を得られます。

ただし critical exponent では concentration sequence が norm を保つため、連続埋め込みは残っても compactness は一般に失われます。

次の GPDE6 では、この関数空間と compactness の準備を使って Poisson 方程式

$$
-\Delta u=f
$$

を

$$
\int_\Omega
\nabla u\cdot\nabla v
=
\langle f,v\rangle
$$

という weak / variational formulation へ移します。
