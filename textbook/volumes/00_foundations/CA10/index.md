# CA10 標準複素解析 X：無限積・Weierstrass 因数分解・Mittag--Leffler

> **複素解析 II の構成論編**。これまで Taylor / Laurent 展開は、すでに与えられた正則関数・有理型関数の局所構造を読み取る道具だった。本章では向きを逆にし、「この点列を零点にしたい」「各点でこの極部分を持たせたい」というデータから関数そのものを作る。無限積を局所一様収束まで制御し、零点を担う積表示と、指定した極から有理型関数を作る構成法を証明する。最後に整数格子へ特殊化して、$\pi\cot\pi z$ の部分分数展開と $\sin\pi z$ の Euler 積を導く。

<!-- definition-example-audit: strict -->

## 0. この章の主線

局所一様収束と正則関数列の極限は [CA7](../CA7/index.md#def-ca7-locally-uniform-convergence)、Laurent 展開と留数定理は [CA4](../CA4/index.md#thm-ca4-laurent) と [CA4 の留数定理](../CA4/index.md#thm-ca4-residue)を正本とする。単連結領域で正則関数が原始関数を持つことは [CA2](../CA2/index.md#thm-ca2-cauchy-simply-connected)を使う。

~~~text
有限積
  ↓ 部分積を局所一様に制御
部分積列の極限
  ↓
E_p(w) で低次の非収束成分を打ち消す
  ↓
任意の離散零点列から整関数を構成
  ↓
零点を持たない整関数 = e^g
  ↓
Weierstrass 因数分解
  ↓
極の主部から低次 Taylor 多項式を差し引く
  ↓
Mittag--Leffler
  ↓
整数極へ特殊化 + 留数定理
  ↓
整数極を持つ余接関数の部分分数表示
  ↓ 対数微分を積分
正弦関数の積表示
~~~

Hadamard の有限位数因数分解、Runge / Mergelyan の近似定理、Picard の定理、Nevanlinna 理論は本章の停止線より先に置く。

---

## 1. 無限積は「部分積の極限」である

<a id="def-ca10-infinite-product"></a>
<!-- formal-statement-start -->
### 定義（関数の無限積）

領域 $\Omega\subset\mathbb C$ 上の正則関数列 $u_n$ に対し、

$$
P_N(z)
=
\prod_{n=1}^{N}
(1+u_n(z))
$$

を第 $N$ 部分積という。$P_N$ が $\Omega$ 上で局所一様に正則関数 $P$ へ収束するとき、

$$
P(z)
=
\prod_{n=1}^{\infty}
(1+u_n(z))
$$

と書き、この無限積が **局所一様収束する**という。
<!-- formal-statement-end -->

<!-- definition-example-start: def-ca10-infinite-product -->
**定義の確認**。$u_n(z)=z/2^n$ とする。コンパクト集合 $K\subset\mathbb C$ で $|z|\le R$ と抑えれば

$$
\sum_{n=1}^{\infty}
\sup_{z\in K}
\left|\frac{z}{2^n}\right|
\le
R\sum_{n=1}^{\infty}2^{-n}
<\infty.
$$

後で証明する収束判定により

$$
\prod_{n=1}^{\infty}
\left(1+\frac{z}{2^n}\right)
$$

は全平面で局所一様収束する。零点は有限因子の零点 $z=-2^n$ から来る。
<!-- definition-example-end -->

数の級数では $\sum a_n$ を調べた。積では、$1+u_n$ が1へ近づくことが必要になる。積そのものを直接差し引くより、1の近くで対数を取って「積を和へ変える」のが基本技法である。

<a id="thm-ca10-infinite-product-criterion"></a>
<!-- formal-statement-start -->
### 定理（無限積の局所一様収束判定）

$\Omega$ を領域、$u_n$ を $\Omega$ 上正則とする。任意のコンパクト集合 $K\subset\Omega$ に対して

$$
\sum_{n=1}^{\infty}
\sup_{z\in K}|u_n(z)|
<\infty
$$

が成り立つとする。このとき

$$
\prod_{n=1}^{\infty}(1+u_n(z))
$$

は $\Omega$ 上局所一様収束し、極限 $P$ は正則である。

さらに $z_0\in\Omega$ で全ての因子 $1+u_n(z_0)$ が非零なら $P(z_0)\ne0$ である。従って極限の零点は有限個の因子の零点からのみ生じ、その重複度は対応する因子の重複度の和である。
<!-- formal-statement-end -->

<!-- proof-start -->
### 証明

コンパクト集合 $K\subset\Omega$ を固定する。仮定から

$$
\sup_K|u_n|\to0
$$

なので、ある $N_0$ 以降では $\sup_K|u_n|\le1/2$ とできる。

$|w|\le1/2$ では

$$
\log(1+w)
=
\sum_{k=1}^{\infty}
\frac{(-1)^{k+1}}{k}w^k
$$

を正則な冪級数として使える。また

$$
|\log(1+w)|
\le
\sum_{k=1}^{\infty}|w|^k
\le
2|w|.
$$

よって

$$
\sum_{n=N_0}^{\infty}
\sup_K|\log(1+u_n)|
\le
2
\sum_{n=N_0}^{\infty}
\sup_K|u_n|
<\infty.
$$

従って対数級数は $K$ 上一様収束する。尾部の積は

$$
\prod_{n=N_0}^{N}(1+u_n(z))
=
\exp\left(
\sum_{n=N_0}^{N}
\log(1+u_n(z))
\right)
$$

だから、右辺は $K$ 上一様に

$$
\exp\left(
\sum_{n=N_0}^{\infty}
\log(1+u_n(z))
\right)
$$

へ収束する。有限個の先頭因子を掛ければ部分積全体が $K$ 上一様収束する。

$K$ は任意なので局所一様収束が得られ、[正則関数列の局所一様極限](../CA7/index.md#thm-ca7-holomorphic-locally-uniform-limit)から極限 $P$ は正則である。

最後に $z_0$ でどの因子も0でなければ、十分後ろの尾部は上の指数表示を持つので0にならない。先頭有限積も仮定により非零である。従って $P(z_0)\ne0$。零点の重複度についても、ある零点を含む因子は局所的に有限個だけ取り出せ、残りの尾部は非零正則関数だから有限積の場合と同じである。$\square$
<!-- proof-end -->

**注意**。条件

$$
\sum \sup_K|u_n|<\infty
$$

は便利な十分条件であり、無限積が収束するための必要条件ではない。本章では「任意の零点列を作れる」強さを得るため、十分条件を 基本因子 に適用する。

---

## 2. 低次項を消して積を収束させる

零点を $w=1$ に置くだけなら $1-w$ で足りる。しかし

$$
\prod_n\left(1-\frac{z}{a_n}\right)
$$

が収束するとは限らない。$\log(1-w)$ の一次・二次・…の項を指数関数で打ち消す。

<a id="def-ca10-elementary-factor"></a>
<!-- formal-statement-start -->
### 定義（Weierstrass の基本因子）

Weierstrass の基本因子（elementary factor）を、整数 $p\ge0$ に対し

$$
E_0(w)=1-w,
$$

$$
E_p(w)
=
(1-w)
\exp\left(
w+\frac{w^2}{2}+\cdots+\frac{w^p}{p}
\right)
\qquad(p\ge1)
$$

と定める。
<!-- formal-statement-end -->

<!-- definition-example-start: def-ca10-elementary-factor -->
**定義の確認**。$p=1$ なら

$$
E_1(w)=(1-w)e^w.
$$

$w=1$ では指数因子は非零なので $E_1$ は単純零点を持つ。一方 $w=0$ 近傍では

$$
\log E_1(w)
=
\log(1-w)+w
=
-\frac{w^2}{2}-\frac{w^3}{3}-\cdots,
$$

となり、$1-w$ だけの場合に残る一次項が消えている。
<!-- definition-example-end -->

<a id="lem-ca10-elementary-factor-estimate"></a>
<!-- formal-statement-start -->
### 補題（基本因子の誤差評価）

$p\ge0$ とし、$|w|\le1/2$ とする。このとき $E_p(w)\ne0$ で、$w=0$ から連続に選んだ対数について

$$
\log E_p(w)
=
-\sum_{k=p+1}^{\infty}\frac{w^k}{k},
$$

したがって

$$
|\log E_p(w)|
\le
2|w|^{p+1}.
$$
<!-- formal-statement-end -->

<!-- proof-start -->
### 証明

$|w|<1$ で

$$
\log(1-w)
=
-\sum_{k=1}^{\infty}\frac{w^k}{k}
$$

だから、定義の指数部を加えると $k=1,\ldots,p$ の項が正確に消えて

$$
\log E_p(w)
=
-\sum_{k=p+1}^{\infty}\frac{w^k}{k}.
$$

さらに

$$
|\log E_p(w)|
\le
\sum_{k=p+1}^{\infty}|w|^k
=
\frac{|w|^{p+1}}{1-|w|}
\le
2|w|^{p+1}.
$$

ここで $|w|\le1/2$ が最後の評価を与えた。$\square$
<!-- proof-end -->

基本因子の役目は零点を変えることではない。指数因子には零点がないので、$E_p$ の零点は常に $w=1$ の単純零点だけである。変わるのは **原点付近でどの次数まで誤差を消すか** である。

---

## 3. 任意の離散零点を積で作る

<a id="def-ca10-canonical-product"></a>
<!-- formal-statement-start -->
### 定義（標準積）

標準積（canonical product）は、零点列を積として符号化する構成である。

$0$ でない複素数列 $(a_n)$ と非負整数列 $(p_n)$ に対して

$$
\prod_{n=1}^{\infty}
E_{p_n}\left(\frac{z}{a_n}\right)
$$

を、この零点列に対応する **標準積** という。零点の重複度を表すときは、同じ $a_n$ を必要な回数だけ列に繰り返してよい。
<!-- formal-statement-end -->

<!-- definition-example-start: def-ca10-canonical-product -->
**定義の確認**。正の整数 $1,2,3,\ldots$ を単純零点にしたいとする。$p_n=1$ とすれば

$$
E_1(z/n)
=
\left(1-\frac zn\right)e^{z/n}.
$$

コンパクト集合 $|z|\le R$ では、大きい $n$ に対して

$$
|\log E_1(z/n)|
\le
2\frac{R^2}{n^2}.
$$

$\sum n^{-2}<\infty$ なので積は局所一様収束し、正の整数をちょうど単純零点に持つ整関数を作る。
<!-- definition-example-end -->

<a id="thm-ca10-weierstrass-zero-set"></a>
<!-- formal-statement-start -->
### 定理（離散零点集合を持つ整関数の構成）

$(a_n)$ を $0$ でない複素数の列とし、各コンパクト集合に含まれる項が有限個、すなわち

$$
|a_n|\to\infty
$$

とする。重複度は同じ点を有限回繰り返すことで表す。

このとき整数列 $p_n\ge0$ を適切に選べば

$$
P(z)
=
\prod_{n=1}^{\infty}
E_{p_n}\left(\frac{z}{a_n}\right)
$$

は全平面で局所一様収束する整関数となり、その零点は重複度込みでちょうど $(a_n)$ である。

さらに原点を $m$ 重零点にしたければ $z^mP(z)$ とすればよい。
<!-- formal-statement-end -->

<!-- proof-start -->
### 証明

例えば

$$
p_n\ge n
$$

となるように選ぶだけで十分である。

任意の円板

$$
K_R=\{z:|z|\le R\}
$$

を固定する。$|a_n|\to\infty$ なので、ある $N_R$ 以降では

$$
|a_n|\ge2R.
$$

従って $z\in K_R$, $n\ge N_R$ なら

$$
\left|\frac{z}{a_n}\right|
\le
\frac12.
$$

[基本因子の評価](#lem-ca10-elementary-factor-estimate)から

$$
\left|
\log
E_{p_n}\left(\frac{z}{a_n}\right)
\right|
\le
2
\left|\frac{z}{a_n}\right|^{p_n+1}
\le
2\left(\frac12\right)^{p_n+1}
\le
2^{-n}.
$$

よって尾部の対数級数は $K_R$ 上一様絶対収束する。したがって積は $K_R$ 上一様収束する。$R$ は任意なので全平面で局所一様収束し、[正則関数列の局所一様極限](../CA7/index.md#thm-ca7-holomorphic-locally-uniform-limit)から $P$ は整関数である。

各因子 $E_{p_n}(z/a_n)$ は $z=a_n$ に単純零点を持ち、それ以外に零点を持たない。任意の有限点の近くには列 $(a_n)$ の項が有限個しかないため、[無限積の収束判定](#thm-ca10-infinite-product-criterion)の非消滅部分から、尾部が新しい零点を作ることはない。従って零点は重複度込みで指定列と一致する。$\square$
<!-- proof-end -->

ここで「零点集合が離散」であることが本質である。有限点 $a$ に零点が無限に集積すれば、[恒等定理](../CA3/index.md#thm-ca3-isolated-zeros-identity)により整関数は恒等的に0になってしまう。離散性は構成上便利なだけでなく、非零正則関数の零点集合に必須の条件である。

---

## 4. 零点を全部取り除くと指数関数が残る

<a id="thm-ca10-zero-free-exponential"></a>
<!-- formal-statement-start -->
### 定理（零点を持たない整関数の指数表示）

整関数 $h$ が全平面で零点を持たないとする。このとき整関数 $g$ が存在して

$$
h(z)=e^{g(z)}
$$

と書ける。
<!-- formal-statement-end -->

<!-- proof-start -->
### 証明

$h$ は零点を持たないので

$$
\frac{h'(z)}{h(z)}
$$

は全平面で正則である。全平面 $\mathbb C$ は単連結だから、[CA2 の原始関数存在結果](../CA2/index.md#thm-ca2-cauchy-simply-connected)により整関数 $G$ が存在して

$$
G'(z)=\frac{h'(z)}{h(z)}
$$

となる。

すると

$$
\frac{d}{dz}
\left(
h(z)e^{-G(z)}
\right)
=
e^{-G(z)}
\left(
h'(z)-G'(z)h(z)
\right)
=0.
$$

従って $h(z)e^{-G(z)}=c$ は非零定数である。複素数 $c\ne0$ に対して $e^\alpha=c$ を満たす $\alpha\in\mathbb C$ を一つ選び、

$$
g(z)=G(z)+\alpha
$$

と置けば

$$
e^{g(z)}=e^{G(z)}c=h(z).
$$

よって求める指数表示を得る。$\square$
<!-- proof-end -->

この定理は「全平面が単連結」であることを使っている。例えば穿孔平面上の零点を持たない正則関数 $h(z)=z$ は、全域で一価な正則対数を持たない。CA2 で見た $\int dz/z=2\pi i$ が障害になる。

---

## 5. 零点データから整関数を因数分解する

<a id="thm-ca10-weierstrass-factorization"></a>
<!-- formal-statement-start -->
### 定理（Weierstrass 因数分解定理）

$f$ を恒等的に0でない整関数とする。原点での零点の重複度を $m\ge0$ とし、原点以外の零点を重複度込みで

$$
a_1,a_2,\ldots,
\qquad
|a_n|\to\infty
$$

と並べる。

このとき適切な非負整数 $p_n$ と整関数 $g$ が存在して

$$
f(z)
=
z^m e^{g(z)}
\prod_{n=1}^{\infty}
E_{p_n}\left(\frac{z}{a_n}\right).
$$

零点が有限個なら積は有限積と解釈する。
<!-- formal-statement-end -->

<!-- proof-start -->
### 証明

[離散零点集合を持つ整関数の構成](#thm-ca10-weierstrass-zero-set)により

$$
P(z)
=
z^m
\prod_{n=1}^{\infty}
E_{p_n}\left(\frac{z}{a_n}\right)
$$

は $f$ と全く同じ零点を同じ重複度で持つ整関数として構成できる。

零点でない点では

$$
H(z)=\frac{f(z)}{P(z)}
$$

は正則である。$a$ が共通の $r$ 重零点なら局所的に

$$
f(z)=(z-a)^r u(z),
\qquad
P(z)=(z-a)^r v(z),
$$

ただし $u(a),v(a)\ne0$ と書けるので

$$
H(z)=\frac{u(z)}{v(z)}
$$

へ正則に延長され、延長値も非零である。従って $H$ は全平面で零点を持たない整関数になる。

[零点を持たない整関数の指数表示](#thm-ca10-zero-free-exponential)から整関数 $g$ が存在して

$$
H=e^g.
$$

ゆえに

$$
f
=
P e^g
=
z^m e^{g(z)}
\prod_{n=1}^{\infty}
E_{p_n}(z/a_n).
$$

これが因数分解である。$\square$
<!-- proof-end -->

Weierstrass 因数分解が言っているのは「零点を知れば関数が一意に決まる」ではない。零点を全部担う標準積を取り出した後にも、零点を持たない自由度 $e^g$ が残る。例えば $e^z\sin\pi z$ と $\sin\pi z$ は零点集合が同じである。

---

## 6. 極を指定して有理型関数を作る

零点に対する Weierstrass 構成の双対的な問題が「各点でこの極部分を持つ有理型関数を作れ」である。

### CA4 の主部をデータとして指定する

[CA4 の Laurent 級数](../CA4/index.md#def-ca4-laurent-series)で、孤立特異点における負冪部分を **主部（principal part）** と定義した。本章ではその定義を再定義せず、離散集合 $A=\{a_n\}\subset\mathbb C$ の各点 $a_n$ に対して

$$
P_n(z)
=
\sum_{k=1}^{m_n}
\frac{c_{n,k}}{(z-a_n)^k},
\qquad
c_{n,m_n}\ne0
$$

という非零な主部を指定する。

**直接例**。全ての正の整数 $n$ で単純極、留数1を持たせたいなら

$$
a_n=n,
\qquad
P_n(z)=\frac1{z-n}.
$$

単純極なので主部は $(z-n)^{-1}$ の一項だけであり、その係数1が留数である。

単に $\sum P_n(z)$ と足すだけでは収束しないことがある。そこで各極が遠くへ行くほど、その主部の **内側の円板で見える Taylor 多項式**を差し引く。

<a id="thm-ca10-mittag-leffler"></a>
<!-- formal-statement-start -->
### 定理（Mittag--Leffler の定理）

$A=\{a_n\}\subset\mathbb C$ を有限集または有限集積点を持たない離散集合とし、各 $a_n$ に非零な主部 $P_n$ を指定する。

このとき有理型関数 $F$ が存在して、

1. $F$ の極はちょうど $A$ にあり、
2. 各 $a_n$ における Laurent 展開の主部は指定された $P_n$

となる。
<!-- formal-statement-end -->

<!-- proof-start -->
### 証明

有限集合なら

$$
F(z)=\sum_n P_n(z)
$$

で終わる。以下、$A$ が無限とする。

もし $0\in A$ なら、その主部 $P_0$ は最後に有限項として加えることにし、残りを

$$
0<|a_1|\le|a_2|\le\cdots,
\qquad
|a_n|\to\infty
$$

と並べる。離散性からこのように並べられる。

$P_n$ は $z=0$ を中心に半径 $|a_n|$ の円板内で正則である。従ってその Taylor 級数は

$$
|z|\le\frac{|a_n|}{2}
$$

上で一様収束する。よって十分高い次数までの Taylor 多項式 $Q_n(z)$ を選べば

$$
\sup_{|z|\le |a_n|/2}
|P_n(z)-Q_n(z)|
\le
2^{-n}
$$

とできる。

そこで

$$
F(z)
=
P_0(z)
+
\sum_{n=1}^{\infty}
\left(
P_n(z)-Q_n(z)
\right)
$$

と置く。ただし $0\notin A$ なら $P_0=0$ とする。

任意のコンパクト集合 $K\subset\mathbb C\setminus A$ を取る。ある $R$ で $K\subset\{|z|\le R\}$ とできる。$|a_n|\to\infty$ なので十分大きい $n$ では

$$
R\le\frac{|a_n|}{2}.
$$

従って尾部では

$$
\sup_{z\in K}
|P_n(z)-Q_n(z)|
\le2^{-n}.
$$

よって級数は $K$ 上一様収束する。各項は $K$ の近傍で正則だから、[正則関数列の局所一様極限](../CA7/index.md#thm-ca7-holomorphic-locally-uniform-limit)により $F$ は $\mathbb C\setminus A$ 上正則である。

次に一つの極 $a_N$ の近くを見る。$A$ は離散なので、$a_N$ の小円板を他の全ての $a_n$ から離して取れる。その円板では

$$
F(z)
=
P_N(z)-Q_N(z)
+
\left[
P_0(z)
+
\sum_{n\ne N}(P_n(z)-Q_n(z))
\right].
$$

角括弧内は正則であり、$Q_N$ も多項式だから正則である。従って $a_N$ の主部は正確に $P_N$ である。$P_N\ne0$ なので $a_N$ は実際に極であり、他に極はない。$\square$
<!-- proof-end -->

### 直接例：正の整数に留数1の単純極を置く

$$
P_n(z)=\frac1{z-n}
$$

について、Taylor の定数項 $-1/n$ を差し引く、すなわち

$$
Q_n(z)=-\frac1n
$$

とすると

$$
P_n(z)-Q_n(z)
=
\frac1{z-n}+\frac1n
=
\frac{z}{n(z-n)}.
$$

$|z|\le R$ かつ $n\ge2R$ なら

$$
\left|
\frac{z}{n(z-n)}
\right|
\le
\frac{2R}{n^2}.
$$

従って

$$
\sum_{n=1}^{\infty}
\left(
\frac1{z-n}+\frac1n
\right)
$$

は正の整数を単純極、留数1として持つ有理型関数を与える。補正多項式は極を変えず、内側のコンパクト集合 から見える非収束成分だけを消している。

---

## 7. 整数極を持つ余接関数を展開する

Mittag--Leffler の定理だけなら、整数全体に留数1の単純極を持つ有理型関数の存在は分かる。しかし $\pi\cot\pi z$ とその構成級数が **完全に一致する**ことまで言うには、整関数の差を決定する必要がある。ここでは留数定理で定数の曖昧さまで消す。

<a id="thm-ca10-cot-partial-fraction"></a>
<!-- formal-statement-start -->
### 定理（pi cot(pi z) の部分分数展開）

$z\notin\mathbb Z$ に対して

$$
\boxed{
\pi\cot\pi z
=
\frac1z
+
\sum_{n=1}^{\infty}
\frac{2z}{z^2-n^2}
}
$$

が成り立つ。右辺の級数は $\mathbb C\setminus\mathbb Z$ 上で局所一様収束する。
<!-- formal-statement-end -->

<!-- proof-start -->
### 証明

まず局所一様収束を確認する。コンパクト集合 $K\subset\mathbb C\setminus\mathbb Z$ を固定し、$|z|\le R$ とする。$n\ge2R+1$ なら

$$
|z^2-n^2|
\ge
n^2-|z|^2
\ge
\frac34n^2,
$$

従って

$$
\left|
\frac{2z}{z^2-n^2}
\right|
\le
\frac{8R}{3n^2}.
$$

$\sum n^{-2}$ は収束するので級数は $K$ 上一様収束する。

次に $z\notin\mathbb Z$ を固定する。$N$ を十分大きく取り、頂点

$$
\pm\left(N+\frac12\right)
\pm i\left(N+\frac12\right)
$$

を持つ正方形の正向き境界を $\Gamma_N$ とする。関数

$$
F_z(w)
=
\frac{\pi\cot\pi w}{w^2-z^2}
$$

を積分する。

$\Gamma_N$ 上では整数から実部または虚部方向に一様に離れている。垂直辺では

$$
\cot\left(\pi\left(N+\frac12+iy\right)\right)
=
-i\tanh(\pi y),
$$

なので絶対値は1以下である。水平辺でも

$$
|\cot(\pi(x+iy))|
$$

は $|y|=N+1/2$ で一様有界である。従ってある $C$ が $N$ に依らず存在して

$$
|\pi\cot\pi w|\le C
\qquad(w\in\Gamma_N).
$$

一方 $|w|\ge N+1/2$ だから

$$
|w^2-z^2|
\ge
|w|^2-|z|^2
\asymp N^2.
$$

正方形の周長は $O(N)$ なので [ML 評価](../CA2/index.md#thm-ca2-reparam-ml)から

$$
\int_{\Gamma_N}F_z(w)\,dw\to0.
$$

$\Gamma_N$ 内の整数 $n=-N,\ldots,N$ では $\pi\cot\pi w$ の留数が1なので

$$
\operatorname{Res}(F_z,n)
=
\frac1{n^2-z^2}.
$$

また $w=z$ と $w=-z$ の留数はそれぞれ

$$
\frac{\pi\cot\pi z}{2z},
\qquad
\frac{\pi\cot\pi z}{2z},
$$

である。[留数定理](../CA4/index.md#thm-ca4-residue)から

$$
\frac1{2\pi i}
\int_{\Gamma_N}F_z(w)\,dw
=
\sum_{n=-N}^{N}\frac1{n^2-z^2}
+
\frac{\pi\cot\pi z}{z}.
$$

$N\to\infty$ とすると左辺は0になるから

$$
\frac{\pi\cot\pi z}{z}
=
-\sum_{n\in\mathbb Z}\frac1{n^2-z^2}.
$$

$n=0$ と $\pm n$ をまとめれば

$$
\pi\cot\pi z
=
\frac1z
+
\sum_{n=1}^{\infty}
\frac{2z}{z^2-n^2}.
$$

これが求める展開である。$\square$
<!-- proof-end -->

この式は Mittag--Leffler の「各整数に留数1の単純極を置く」という局所データが、周期関数 $\pi\cot\pi z$ へどうまとまるかを具体化している。

---

## 8. 正弦関数を無限積へ戻す

部分分数展開は、積表示の **対数微分**になっている。

<a id="thm-ca10-euler-sine-product"></a>
<!-- formal-statement-start -->
### 定理（sin(pi z) の Euler 積）

全ての $z\in\mathbb C$ に対して

$$
\boxed{
\frac{\sin\pi z}{\pi z}
=
\prod_{n=1}^{\infty}
\left(
1-\frac{z^2}{n^2}
\right)
}
$$

が成り立つ。左辺は $z=0$ で値1に正則延長する。
<!-- formal-statement-end -->

<!-- proof-start -->
### 証明

まず

$$
G(z)
=
\prod_{n=1}^{\infty}
\left(
1-\frac{z^2}{n^2}
\right)
$$

を考える。コンパクト集合 $|z|\le R$ で

$$
\sum_{n=1}^{\infty}
\sup_{|z|\le R}
\left|
-\frac{z^2}{n^2}
\right|
\le
R^2\sum_{n=1}^{\infty}\frac1{n^2}
<\infty
$$

だから、[無限積の収束判定](#thm-ca10-infinite-product-criterion)により $G$ は整関数である。

円板 $|z|<1$ では $G$ も

$$
S(z)=\frac{\sin\pi z}{\pi z}
$$

も零点を持たず、$S(0)=G(0)=1$ である。

ここで対数微分の極限交換を確認する。$0<r<1$ を固定し、有限部分積を

$$
G_N(z)=\prod_{n=1}^{N}\left(1-\frac{z^2}{n^2}\right)
$$

とする。$G_N\to G$ は $|z|\le r$ の近傍で局所一様だから、[導関数列の局所一様収束](../CA7/index.md#cor-ca7-derivative-local-uniform-convergence)により $G_N'\to G'$ も $|z|\le r$ 上一様に成り立つ。また $G$ はこの円板で零点を持たないので、十分大きい $N$ では $G_N/G$ も一様に1へ近づき、

$$
\frac{G_N'}{G_N}\to\frac{G'}{G}
$$

が一様に成り立つ。一方、有限積では

$$
\frac{G_N'(z)}{G_N(z)}
=
\sum_{n=1}^{N}
\frac{-2z/n^2}{1-z^2/n^2}
=
\sum_{n=1}^{N}
\frac{2z}{z^2-n^2}.
$$

さらに $|z|\le r<1$ なら

$$
\left|
\frac{2z}{z^2-n^2}
\right|
\le
\frac{2r}{n^2-r^2}
\le
\frac{2r}{(1-r^2)n^2},
$$

なので右辺の級数も一様収束する。従って極限を取って

$$
\frac{G'(z)}{G(z)}
=
\sum_{n=1}^{\infty}
\frac{2z}{z^2-n^2}
$$

を得る。

一方

$$
\frac{S'(z)}{S(z)}
=
\pi\cot\pi z-\frac1z.
$$

[部分分数展開](#thm-ca10-cot-partial-fraction)から両者は等しい。従って $|z|<1$ で

$$
\left(\frac{S}{G}\right)'
=
0.
$$

$S(0)/G(0)=1$ だから

$$
S(z)=G(z)
\qquad(|z|<1).
$$

両辺は全平面で整関数なので、[恒等定理](../CA3/index.md#thm-ca3-isolated-zeros-identity)により全平面で一致する。$\square$
<!-- proof-end -->

### 直接例：Euler 積から Basel 和の入口

積の $z^2$ 係数を比較すると

$$
\frac{\sin\pi z}{\pi z}
=
1-\frac{\pi^2z^2}{6}+O(z^4),
$$

一方

$$
\prod_{n=1}^{\infty}
\left(1-\frac{z^2}{n^2}\right)
=
1-
z^2\sum_{n=1}^{\infty}\frac1{n^2}
+O(z^4).
$$

したがって

$$
\sum_{n=1}^{\infty}\frac1{n^2}
=
\frac{\pi^2}{6}.
$$

係数比較を厳密化するには $0$ 近傍で積が局所一様収束していることを使う。本章の無限積論が、Euler の古典計算を正則関数論の中へ置き直している。

---

## 9. Weierstrass と Mittag--Leffler は何を分担するか

### 零点は積で作る

零点 $a_n$ は因子

$$
E_{p_n}(z/a_n)
$$

で一つずつ置く。収束を妨げる低次項は指数補正で消す。

### 極は和で作る

極 $a_n$ の主部 $P_n$ は加法的なデータである。内側のコンパクト集合 で見える Taylor 多項式 $Q_n$ を差し引き、

$$
\sum(P_n-Q_n)
$$

を収束させる。

### 一意性には自由度が残る

同じ零点を持つ整関数同士の比は零点を持たない整関数だから $e^g$ が残る。同じ主部を持つ有理型関数同士の差は整関数である。したがって

~~~text
零点データ     → 乗法的自由度 e^g
主部 → 加法的自由度（整関数）
~~~

という対称性がある。

---

## 10. 仮定を落とすとどこが壊れるか

### 零点列の離散性を落とす

有限点に零点が集積すると [恒等定理](../CA3/index.md#thm-ca3-isolated-zeros-identity)により非零整関数は作れない。Weierstrass 構成の $|a_n|\to\infty$ は単なる並べ方の都合ではない。

### 基本因子の指数補正を落とす

$a_n=n$ に対して単純積

$$
\prod_{n=1}^{\infty}\left(1-\frac zn\right)
$$

を考えると、対数の一次項はおおよそ

$$
-z\sum_{n=1}^{\infty}\frac1n
$$

となって収束しない。$E_1(z/n)$ では指数因子 $e^{z/n}$ がこの一次項を消し、残りが $O(n^{-2})$ になる。

### Mittag--Leffler で補正多項式を落とす

正の整数に留数1の極を置く単純和

$$
\sum_{n=1}^{\infty}\frac1{z-n}
$$

は $-1/n$ 型の尾部を持ち、調和級数と同じ理由で収束しない。

$$
\frac1{z-n}+\frac1n
$$

へ直すと $O(n^{-2})$ になり、局所一様収束する。

---

## 11. まとめ

- 関数の無限積は有限部分積の局所一様極限として扱う。
- $\sum\sup_K|u_n|<\infty$ なら $\prod(1+u_n)$ は局所一様収束し、尾部は対数級数の指数として非消滅性まで制御できる。
- Weierstrass の基本因子
  $$
  E_p(w)=(1-w)\exp(w+\cdots+w^p/p)
  $$
  は零点を $w=1$ に保ったまま、$\log(1-w)$ の低次項を消す。
- 離散零点列 $|a_n|\to\infty$ に対して $p_n$ を十分大きく選べば標準積が整関数を与える。
- 零点を持たない整関数は $e^g$ と書けるため、任意の非零整関数は「零点を担う標準積 × $e^g$」に因数分解できる。
- Mittag--Leffler の定理では各主部から Taylor 多項式を差し引き、内側のコンパクト集合 上で尾部を幾何級数的に小さくして有理型関数を構成する。
- [留数定理](../CA4/index.md#thm-ca4-residue)から
  $$
  \pi\cot\pi z
  =
  \frac1z+\sum_{n\ge1}\frac{2z}{z^2-n^2}
  $$
  が得られる。
- その対数微分を積分すると
  $$
  \frac{\sin\pi z}{\pi z}
  =
  \prod_{n\ge1}\left(1-\frac{z^2}{n^2}\right)
  $$
  が得られる。

---

## 12. 演習

### Level A

<a id="ex-ca10-a01"></a>
#### CA10-A01 一次因子の無限積
- Level: A

$$
P(z)=
\prod_{n=1}^{\infty}
\left(1+\frac{z}{2^n}\right)
$$

について、全平面で局所一様収束することを示し、零点を全て求めよ。

<!-- solution-start -->
**解答**：

任意のコンパクト集合 $K$ を取り $|z|\le R$ とする。このとき

$$
\sum_{n=1}^{\infty}
\sup_K\left|\frac{z}{2^n}\right|
\le
R\sum_{n=1}^{\infty}2^{-n}
=
R
<\infty.
$$

よって [無限積の局所一様収束判定](#thm-ca10-infinite-product-criterion)から $P$ は全平面で局所一様収束し、整関数になる。

第 $n$ 因子は

$$
1+\frac{z}{2^n}
$$

なので零点は $z=-2^n$。これらは互いに異なり各因子で単純である。また無限積定理の非消滅部分から、どの因子も0でない点に新しい零点は生じない。従って

$$
\boxed{
Z(P)=\{-2,-4,-8,\ldots\}
}
$$

で、全て単純零点である。
<!-- solution-end -->

<a id="ex-ca10-a02"></a>
#### CA10-A02 $E_2$ が三次から始まること
- Level: A

$$
E_2(w)=(1-w)\exp\left(w+\frac{w^2}{2}\right)
$$

について、$|w|<1$ で

$$
\log E_2(w)
=
-\frac{w^3}{3}
-\frac{w^4}{4}
-\cdots
$$

を示し、なぜ $E_2(w)=1+O(w^3)$ といえるか説明せよ。

<!-- solution-start -->
**解答**：

$|w|<1$ では

$$
\log(1-w)
=
-w-\frac{w^2}{2}-\frac{w^3}{3}-\cdots.
$$

従って

$$
\log E_2(w)
=
\log(1-w)+w+\frac{w^2}{2}
=
-\sum_{k=3}^{\infty}\frac{w^k}{k}.
$$

右辺は $O(w^3)$ である。$x=O(w^3)$ に対して $e^x=1+x+O(x^2)$ だから

$$
E_2(w)
=
\exp(O(w^3))
=
1+O(w^3).
$$

一次・二次の誤差を指数補正が消したため、積の尾部 は三次から始まる。
<!-- solution-end -->

<a id="ex-ca10-a03"></a>
#### CA10-A03 零点を持たない整関数を指数表示する
- Level: A

$$
h(z)=e^{z^2+3z+1}
$$

について $h'/h$ を計算せよ。また一般の零点を持たない整関数 $h$ に対して、なぜ $h'/h$ の原始関数が指数表示を与えるのかを3行程度で説明せよ。

<!-- solution-start -->
**解答**：

具体例では

$$
\frac{h'(z)}{h(z)}
=
2z+3.
$$

これは $z^2+3z$ の導関数である。

一般に $h$ が零点を持たなければ $h'/h$ は整関数で、$\mathbb C$ は単連結だから原始関数 $G$ を持つ。すると

$$
(he^{-G})'
=
e^{-G}(h'-G'h)=0
$$

なので $he^{-G}=c\ne0$。$c=e^\alpha$ と書けば

$$
\boxed{h=e^{G+\alpha}}.
$$
<!-- solution-end -->

<a id="ex-ca10-a04"></a>
#### CA10-A04 正の整数に単純極を置く
- Level: A

級数

$$
F(z)
=
\sum_{n=1}^{\infty}
\left(
\frac1{z-n}+\frac1n
\right)
$$

が $\mathbb C\setminus\mathbb N$ 上で局所一様収束し、各正の整数 $n$ に留数1の単純極を持つことを示せ。

<!-- solution-start -->
**解答**：

コンパクト集合 $K\subset\mathbb C\setminus\mathbb N$ を固定し $|z|\le R$ とする。$n\ge2R+1$ なら

$$
|z-n|
\ge
n-R
\ge
\frac n2.
$$

従って

$$
\left|
\frac1{z-n}+\frac1n
\right|
=
\left|
\frac{z}{n(z-n)}
\right|
\le
\frac{2R}{n^2}.
$$

$\sum n^{-2}$ は収束するから尾部は $K$ 上一様収束する。有限個の先頭項は $K$ の近傍で正則なので $F$ は $\mathbb C\setminus\mathbb N$ 上正則である。

$n=N$ の近くでは

$$
F(z)
=
\frac1{z-N}
+
\left[
\frac1N
+
\sum_{n\ne N}
\left(
\frac1{z-n}+\frac1n
\right)
\right].
$$

角括弧内は $z=N$ の近くで正則だから、主部は

$$
\frac1{z-N}.
$$

従って $N$ は単純極で留数は1である。
<!-- solution-end -->

### Level B

<a id="ex-ca10-b01"></a>
#### CA10-B01 正の整数を零点に持つ 標準積
- Level: B

$$
P(z)
=
\prod_{n=1}^{\infty}
E_1(z/n)
=
\prod_{n=1}^{\infty}
\left(1-\frac zn\right)e^{z/n}
$$

について、

1. 全平面で局所一様収束すること、
2. 零点が正の整数だけで全て単純であること、
3. 補正 $e^{z/n}$ を外した単純積では本章の絶対収束判定が使えないこと

を示せ。

<!-- solution-start -->
**解答**：

1. $|z|\le R$ を固定する。$n\ge2R$ なら $|z/n|\le1/2$ なので
   $$
   |\log E_1(z/n)|
   \le
   2|z/n|^2
   \le
   \frac{2R^2}{n^2}.
   $$
   $\sum n^{-2}<\infty$ より対数級数は コンパクト集合上一様収束し、積も局所一様収束する。

2. $E_1(w)=(1-w)e^w$ の指数因子は零点を持たず、$w=1$ が単純零点である。従って第 $n$ 因子は $z=n$ に単純零点を持つ。離散性と尾部の非消滅性から他の零点はない。

3. 単純因子 $1-z/n$ では
   $$
   \sum_{n=1}^{\infty}
   \sup_{|z|\le R}
   \left|\frac zn\right|
   =
   R\sum_{n=1}^{\infty}\frac1n
   $$
   が収束しない。より本質的には
   $$
   \log(1-z/n)
   =
   -\frac zn+O(n^{-2})
   $$
   の一次項が調和級数型に残る。$e^{z/n}$ がこの一次項を打ち消している。
<!-- solution-end -->

<a id="ex-ca10-b02"></a>
#### CA10-B02 $\pi\cot\pi z$ の留数計算を閉じる
- Level: B

固定した $z\notin\mathbb Z$ に対し

$$
F_z(w)
=
\frac{\pi\cot\pi w}{w^2-z^2}
$$

を考える。

1. 整数 $n$ における留数を求めよ。
2. $w=\pm z$ における留数を求めよ。
3. 大正方形上の積分が0へ行くと仮定して、部分分数展開を導け。

<!-- solution-start -->
**解答**：

1. $\sin\pi w$ は $w=n$ で
   $$
   \sin\pi w
   =
   \pi(-1)^n(w-n)+O((w-n)^2)
   $$
   であり、$\cos\pi n=(-1)^n$ だから $\pi\cot\pi w$ の留数は1。従って
   $$
   \operatorname{Res}(F_z,n)
   =
   \frac1{n^2-z^2}.
   $$

2. $w=z$ は分母 $w^2-z^2$ の単純零点なので
   $$
   \operatorname{Res}(F_z,z)
   =
   \frac{\pi\cot\pi z}{2z}.
   $$
   $w=-z$ では分母の導関数は $-2z$、分子は
   $$
   \pi\cot(-\pi z)=-\pi\cot\pi z
   $$
   だから同じく
   $$
   \operatorname{Res}(F_z,-z)
   =
   \frac{\pi\cot\pi z}{2z}.
   $$

3. 留数定理と積分の極限0から
   $$
   0
   =
   \sum_{n\in\mathbb Z}\frac1{n^2-z^2}
   +
   \frac{\pi\cot\pi z}{z}.
   $$
   よって
   $$
   \pi\cot\pi z
   =
   -z\sum_{n\in\mathbb Z}\frac1{n^2-z^2}.
   $$
   $n=0$ と $\pm n$ をまとめると
   $$
   \boxed{
   \pi\cot\pi z
   =
   \frac1z
   +
   \sum_{n=1}^{\infty}\frac{2z}{z^2-n^2}
   }.
   $$
<!-- solution-end -->

<a id="ex-ca10-b03"></a>
#### CA10-B03 部分分数から Euler 積へ
- Level: B

$$
G(z)=
\prod_{n=1}^{\infty}
\left(1-\frac{z^2}{n^2}\right),
\qquad
S(z)=\frac{\sin\pi z}{\pi z}
$$

とする。$|z|<1$ で

$$
\frac{G'}G
=
\frac{S'}S
$$

を示し、$G(0)=S(0)=1$ から $G=S$ を導け。最後に恒等定理で全平面へ延長せよ。

<!-- solution-start -->
**解答**：

$|z|\le r<1$ では $\sum r^2/n^2<\infty$ だから積は一様収束し、どの因子も0でない。従って

$$
\frac{G'}{G}
=
\sum_{n=1}^{\infty}
\frac{d}{dz}
\log\left(1-\frac{z^2}{n^2}\right)
=
\sum_{n=1}^{\infty}
\frac{2z}{z^2-n^2}.
$$

一方

$$
\frac{S'}S
=
\pi\cot\pi z-\frac1z.
$$

[部分分数展開](#thm-ca10-cot-partial-fraction)から右辺は同じ級数である。従って

$$
\left(\frac SG\right)'=0
$$

なので $S/G$ は $|z|<1$ で定数。$z=0$ で両方1だから定数は1であり

$$
S=G
\qquad(|z|<1).
$$

$S$ も $G$ も整関数だから [恒等定理](../CA3/index.md#thm-ca3-isolated-zeros-identity)により

$$
\boxed{
\frac{\sin\pi z}{\pi z}
=
\prod_{n=1}^{\infty}
\left(1-\frac{z^2}{n^2}\right)
}
$$

が全平面で成り立つ。
<!-- solution-end -->

### Level C

<a id="ex-ca10-c01"></a>
#### CA10-C01 零点構成・極構成・整数格子の統合
- Level: C

次の流れを一つの論証として再構成せよ。

1. $|a_n|\to\infty$ を満たす零点列に対し、$p_n\ge n$ を選ぶと
   $$
   \prod_n E_{p_n}(z/a_n)
   $$
   が局所一様収束し、指定零点を持つ整関数になることを示す。
2. 零点を持たない整関数が $e^g$ と書けることを使い、Weierstrass 因数分解を導く。
3. 離散な極 $a_n$ と 主部 $P_n$ に対し、$P_n$ の Taylor 多項式 $Q_n$ を差し引いて
   $$
   \sum_n(P_n-Q_n)
   $$
   を局所一様収束させる Mittag--Leffler 構成を説明する。
4. 整数格子へ特殊化し、$\pi\cot\pi z$ の部分分数展開と $\sin\pi z$ の Euler 積が「極データ」と「零点データ」の具体例になっていることを説明する。

<!-- solution-start -->
**解答**：

**1. 零点列から積を作る。**

コンパクト円板 $|z|\le R$ を固定する。$|a_n|\to\infty$ なので十分大きい $n$ では $|a_n|\ge2R$。従って

$$
|z/a_n|\le1/2.
$$

$p_n\ge n$ とすると 基本因子の評価から

$$
\left|
\log E_{p_n}(z/a_n)
\right|
\le
2|z/a_n|^{p_n+1}
\le
2^{-n}.
$$

したがって対数級数は円板上一様収束し、積も局所一様収束する。各因子は $z=a_n$ にだけ単純零点を持ち、重複させた $a_n$ の回数だけ重複度が増える。尾部は非零だから新しい零点は生じない。

**2. 任意の整関数を因数分解する。**

非零整関数 $f$ の零点を上の積 $P$ で同じ重複度に再現する。すると

$$
H=f/P
$$

は共通零点で可除に延長され、全平面で零点を持たない整関数になる。

$H'/H$ は整関数で、$\mathbb C$ は単連結だから原始関数 $G$ を持つ。

$$
(He^{-G})'=0
$$

より $H=ce^G=e^g$。従って

$$
\boxed{f=e^gP}
$$

が Weierstrass 因数分解である。

**3. 主部 から和を作る。**

極を $|a_n|\to\infty$ と並べる。$P_n$ は原点中心で半径 $|a_n|$ まで正則だから、Taylor 多項式 $Q_n$ を十分高次まで取って

$$
\sup_{|z|\le|a_n|/2}
|P_n-Q_n|
\le2^{-n}
$$

とする。

任意のコンパクト集合 $K$ はある $|z|\le R$ に入り、十分大きい $n$ では $R\le|a_n|/2$。従って

$$
\sum_n(P_n-Q_n)
$$

の尾部は $K$ 上 $\sum2^{-n}$ で抑えられる。局所一様極限は極以外で正則であり、$a_N$ 近傍では $P_N-Q_N$ だけが指定された主部 を持つ。これで Mittag--Leffler の定理が得られる。

**4. 整数格子で二つの構成が出会う。**

$\pi\cot\pi z$ は全整数に留数1の単純極を持つ。留数定理を

$$
\frac{\pi\cot\pi w}{w^2-z^2}
$$

へ適用すると

$$
\pi\cot\pi z
=
\frac1z+
\sum_{n=1}^{\infty}
\frac{2z}{z^2-n^2}.
$$

これは極データを和へ展開した Mittag--Leffler 型の具体例である。

一方 $\sin\pi z$ は全整数に単純零点を持つ。上式から

$$
\pi\cot\pi z-\frac1z
=
\sum_{n=1}^{\infty}
\frac{2z}{z^2-n^2}
$$

を得るが、左辺は

$$
\frac{d}{dz}
\log\frac{\sin\pi z}{\pi z},
$$

右辺は

$$
\frac{d}{dz}
\log
\prod_{n=1}^{\infty}
\left(1-\frac{z^2}{n^2}\right)
$$

である。$z=0$ で両者を1に正規化すると

$$
\boxed{
\frac{\sin\pi z}{\pi z}
=
\prod_{n=1}^{\infty}
\left(1-\frac{z^2}{n^2}\right)
}.
$$

したがって整数格子では、**極を和で構成する Mittag--Leffler と、零点を積で構成する Weierstrass が、cotangent と sine を介して同じ解析構造の加法版・乗法版として現れる。**
<!-- solution-end -->
