# EVOL2 $C_0$ 半群・生成作用素・Hille--Yosida

<!-- definition-example-audit: strict -->

GPDE10 では、時間発展を「初期状態を時刻 $t$ まで運ぶ作用素」として見るために、[強連続半群](../GPDE10/index.md#def-gpde10-c0-semigroup)を導入しました。EVOL1 では、微分作用素のような非有界作用素では

$$
A:D(A)\subset X\to X
$$

の定義域そのものが作用素のデータであり、閉性・稠密性・レゾルベントが重要になることを学びました。

本章では、この二つを接続します。

有限次元の線形 ODE

$$
u'(t)=Au(t),
\qquad
u(0)=x
$$

では

$$
u(t)=e^{tA}x
$$

でした。無限次元では $A$ が非有界でも、時刻ごとの解作用素 $T(t)$ は有界作用素であることがあります。そこで問いは二方向に分かれます。

$$
\boxed{
T(t)
\longrightarrow
A
\quad\text{と}\quad
A
\longrightarrow
T(t)
}
$$

前者は時刻0での差分商から、時間発展を微分した作用素を取り出す問題、後者は非有界作用素が本当に時間発展を生成するかを判定する問題です。Hille--Yosida 定理は、後者をレゾルベント評価へ翻訳します。

本章の流れは

$$
C_0\text{ 半群}
\to
\text{生成作用素}
\to
\text{閉性・稠密性}
\to
\text{レゾルベントの Laplace 表現}
\to
\text{Yosida 近似}
\to
\text{Hille--Yosida}
$$

です。

---

## 1. まず時間発展側を固定する

GPDE10 では Hilbert 空間上で強連続半群を導入しました。その定義に現れるのは作用素の合成・ノルム・極限であり、内積は使いません。そこで本章では同じ三条件

$$
T(0)=I,
\qquad
T(t+s)=T(t)T(s),
$$

$$
T(t)x\to x
\qquad(t\downarrow0)
$$

を Banach 空間 $X$ 上で課した作用素族 $(T(t))_{t\ge0}$ を強連続半群として扱います。

特にノルムを増やさない時間発展は、生成定理を最も透明な形で学ぶのに適しています。

<a id="def-evol2-contraction-semigroup"></a>
<!-- formal-statement-start -->
### 定義（縮小半群）

$X$ を Banach 空間とし、$(T(t))_{t\ge0}$ を $X$ 上の強連続半群とする。

すべての $t\ge0$ について

$$
\|T(t)\|_{B(X)}
\le
1
$$

が成り立つとき、$(T(t))_{t\ge0}$ を **縮小半群**という。
<!-- formal-statement-end -->

<!-- definition-example-start: def-evol2-contraction-semigroup -->
### 定義の確認：減衰する対角時間発展

$X=\ell^2(\mathbb N)$ とし、

$$
T(t)x
=
(e^{-nt}x_n)_{n\ge1}
$$

と置きます。

まず

$$
T(0)x=x.
$$

また各成分で

$$
e^{-n(t+s)}
=
e^{-nt}e^{-ns}
$$

なので

$$
T(t+s)=T(t)T(s).
$$

さらに

$$
\|T(t)x\|_2^2
=
\sum_{n=1}^{\infty}e^{-2nt}|x_n|^2
\le
\sum_{n=1}^{\infty}|x_n|^2
=
\|x\|_2^2,
$$

従って

$$
\|T(t)\|\le1.
$$

強連続性も直接確認できます。任意の $\varepsilon>0$ に対し、まず $N$ を大きくして

$$
\sum_{n>N}|x_n|^2
<
\frac{\varepsilon^2}{16}
$$

とします。有限個の $1\le n\le N$ については $e^{-nt}\to1$ なので、十分小さい $t$ で

$$
\sum_{n=1}^{N}|e^{-nt}-1|^2|x_n|^2
<
\frac{\varepsilon^2}{4}.
$$

一方、$|e^{-nt}-1|\le2$ だから尾部は

$$
\sum_{n>N}|e^{-nt}-1|^2|x_n|^2
\le
4\sum_{n>N}|x_n|^2
<
\frac{\varepsilon^2}{4}.
$$

従って

$$
\|T(t)x-x\|_2<\varepsilon.
$$

よって $(T(t))$ は縮小 $C_0$ 半群です。
<!-- definition-example-end -->

この例は本章を通して使います。EVOL1 の正の対角作用素

$$
A_+(x_n)=(nx_n)
$$

に対し、この時間発展の生成作用素は $-A_+$ になります。

---

## 2. 時刻0の差分商から生成作用素を取り出す

有限次元なら

$$
\frac{e^{tA}x-x}{t}\to Ax.
$$

同じ式を無限次元でも使いたくなります。ただし、この極限が全ての $x\in X$ で存在するとは限りません。ここで EVOL1 の「定義域も作用素の一部」という考え方が効きます。

<a id="def-evol2-generator"></a>
<!-- formal-statement-start -->
### 定義（強連続半群の生成作用素）

$X$ を Banach 空間、$(T(t))_{t\ge0}$ を $X$ 上の強連続半群とする。

$$
D(A)
=
\left\{
x\in X:
\lim_{h\downarrow0}
\frac{T(h)x-x}{h}
\text{ が }X\text{ で存在する}
\right\}
$$

と置く。

$x\in D(A)$ に対して

$$
Ax
=
\lim_{h\downarrow0}
\frac{T(h)x-x}{h}
$$

で定まる線形作用素

$$
A:D(A)\subset X\to X
$$

を $(T(t))$ の **強連続半群の生成作用素**、または簡単に **半群の生成作用素**という。
<!-- formal-statement-end -->

<!-- definition-example-start: def-evol2-generator -->
### 定義の確認：対角半群の生成作用素

第1節の

$$
T(t)x=(e^{-nt}x_n)
$$

を考えます。

有限支え $x\in c_{00}$ なら成分ごとに

$$
\frac{e^{-nh}-1}{h}x_n
\to
-nx_n.
$$

有限和しかないため $\ell^2$ ノルムでも極限を通せて

$$
Ax=(-nx_n).
$$

さらに後で、生成作用素の正確な定義域が

$$
D(A)
=
\left\{
x\in\ell^2:
(nx_n)\in\ell^2
\right\}
$$

であることを確認します。

従って EVOL1 の閉作用素 $A_+$ を使えば

$$
A=-A_+.
$$
<!-- definition-example-end -->

生成作用素は「半群を時刻0で微分したもの」です。しかし $x\in D(A)$ なら時刻0だけでなく全時刻で軌道を微分できます。

<a id="prop-evol2-orbit-differentiation"></a>
<!-- formal-statement-start -->
### 命題（生成作用素上の軌道微分）

$A$ を強連続半群 $(T(t))_{t\ge0}$ の生成作用素とする。

$x\in D(A)$ なら任意の $t\ge0$ について

$$
T(t)x\in D(A),
$$

$$
AT(t)x=T(t)Ax,
$$

さらに $t>0$ で

$$
\frac{d}{dt}T(t)x
=
AT(t)x
=
T(t)Ax
$$

が成り立つ。
<!-- formal-statement-end -->

### 証明の見取り図

半群則を使うと、時刻 $t$ での差分商は

$$
\frac{T(t+h)x-T(t)x}{h}
=
T(t)\frac{T(h)x-x}{h}
$$

と、時刻0の差分商へ戻せます。$T(t)$ は有界なので極限を外へ出せます。

<!-- proof-start -->
### 証明

$x\in D(A)$ とする。$h>0$ に対し半群則から

$$
T(h)T(t)x
=
T(t)T(h)x.
$$

従って

$$
\frac{T(h)T(t)x-T(t)x}{h}
=
T(t)
\frac{T(h)x-x}{h}.
$$

右辺で $h\downarrow0$ とすると、$x\in D(A)$ より

$$
\frac{T(h)x-x}{h}\to Ax.
$$

$T(t)$ は有界線形作用素だから

$$
T(t)\frac{T(h)x-x}{h}
\to
T(t)Ax.
$$

よって $T(t)x\in D(A)$ で

$$
AT(t)x=T(t)Ax.
$$

右微分は同じ計算で得られます。

$t>0$ で左微分を見るには $0<h<t$ として

$$
\frac{T(t)x-T(t-h)x}{h}
=
T(t-h)\frac{T(h)x-x}{h}.
$$

$h\downarrow0$ で、強連続性から

$$
T(t-h)Ax\to T(t)Ax
$$

なので左微分も同じ極限を持ちます。したがって

$$
\frac{d}{dt}T(t)x=T(t)Ax=AT(t)x.
$$

$\square$
<!-- proof-end -->

積分すると、後で閉性の証明に使う恒等式

$$
T(t)x-x
=
\int_0^tT(s)Ax\,ds
\qquad(x\in D(A))
$$

を得ます。

---

## 3. 生成作用素はなぜ閉じていて、しかも稠密に定義されるのか

Hille--Yosida の条件に「閉」「稠密定義」が出てくるのは偶然ではありません。どちらも $C_0$ 半群から自動的に出ます。

<a id="thm-evol2-generator-closed-dense"></a>
<!-- formal-statement-start -->
### 定理（生成作用素は閉かつ稠密定義）

$X$ を Banach 空間、$(T(t))_{t\ge0}$ を $X$ 上の強連続半群、$A$ をその生成作用素とする。

このとき $A$ は閉作用素であり、

$$
\overline{D(A)}^{\,X}=X
$$

が成り立つ。
<!-- formal-statement-end -->

### 証明の見取り図

稠密性には、任意の $x\in X$ を短時間平均

$$
x_t
=
\frac1t\int_0^tT(s)x\,ds
$$

で平滑化します。$x_t$ は生成作用素の定義域に入り、$t\downarrow0$ で $x$ へ戻ります。

閉性には、$x_n\to x$、$Ax_n\to y$ を仮定し、

$$
T(t)x_n-x_n
=
\int_0^tT(s)Ax_n\,ds
$$

の極限を取ります。

<!-- proof-start -->
### 証明

#### 稠密性

任意の $x\in X$ と $t>0$ に対し

$$
x_t
=
\frac1t\int_0^tT(s)x\,ds
$$

と置きます。積分は連続な $X$ 値関数の Riemann 積分として取れます。

$h>0$ に対して

$$
\begin{aligned}
T(h)x_t-x_t
&=
\frac1t
\left(
\int_0^tT(h+s)x\,ds
-
\int_0^tT(s)x\,ds
\right)
\\
&=
\frac1t
\left(
\int_t^{t+h}T(r)x\,dr
-
\int_0^hT(r)x\,dr
\right).
\end{aligned}
$$

従って

$$
\frac{T(h)x_t-x_t}{h}
=
\frac1t
\left[
\frac1h\int_t^{t+h}T(r)x\,dr
-
\frac1h\int_0^hT(r)x\,dr
\right].
$$

強連続性より $h\downarrow0$ で

$$
\frac1h\int_t^{t+h}T(r)x\,dr
\to
T(t)x,
$$

$$
\frac1h\int_0^hT(r)x\,dr
\to
x.
$$

よって $x_t\in D(A)$ で

$$
Ax_t
=
\frac{T(t)x-x}{t}.
$$

一方

$$
\|x_t-x\|
\le
\frac1t
\int_0^t
\|T(s)x-x\|\,ds.
$$

被積分関数は $s\downarrow0$ で0へ行くので

$$
x_t\to x.
$$

任意の $x$ が $D(A)$ の元で近似できるから $D(A)$ は稠密です。

#### 閉性

$x_n\in D(A)$ が

$$
x_n\to x,
\qquad
Ax_n\to y
$$

を満たすとします。

第2節の積分恒等式から

$$
T(t)x_n-x_n
=
\int_0^tT(s)Ax_n\,ds.
$$

固定した $t$ に対して左辺は

$$
T(t)x_n-x_n
\to
T(t)x-x.
$$

右辺について、$s\in[0,t]$ 上で $(T(s))$ は一様有界です。実際、強連続性と一様有界性原理から

$$
M_t
=
\sup_{0\le s\le t}\|T(s)\|
<
\infty.
$$

よって

$$
\left\|
\int_0^tT(s)(Ax_n-y)\,ds
\right\|
\le
tM_t\|Ax_n-y\|
\to0.
$$

したがって

$$
T(t)x-x
=
\int_0^tT(s)y\,ds.
$$

両辺を $t$ で割ると

$$
\frac{T(t)x-x}{t}
=
\frac1t
\int_0^tT(s)y\,ds.
$$

$t\downarrow0$ で強連続性から右辺は $y$ に収束します。従って

$$
x\in D(A),
\qquad
Ax=y.
$$

よって $A$ は閉作用素です。$\square$
<!-- proof-end -->

この定理は EVOL1 の理論とぴったり接続します。

$$
\boxed{
C_0\text{ 半群の生成作用素}
\Rightarrow
\text{閉作用素}
+
\text{稠密定義作用素}
}
$$

従って、生成候補 $A$ が最初から閉じていない、あるいは定義域が稠密でないなら、その時点で $C_0$ 半群の生成作用素にはなれません。

---

## 4. 半群を Laplace 変換するとレゾルベントが現れる

時間発展 $T(t)$ とレゾルベント

$$
R(\lambda,A)
=
(\lambda I-A)^{-1}
$$

は別々の道具に見えます。ところが縮小半群では Laplace 変換が両者を直接つなぎます。

まず $\lambda>0$ と $x\in X$ に対し

$$
R_\lambda x
=
\int_0^\infty e^{-\lambda t}T(t)x\,dt
$$

と置きます。縮小性から

$$
\|e^{-\lambda t}T(t)x\|
\le
e^{-\lambda t}\|x\|,
$$

右辺は可積分なので、この不定積分はノルム収束します。

<a id="thm-evol2-laplace-resolvent"></a>
<!-- formal-statement-start -->
### 定理（レゾルベントの Laplace 表現）

$A$ を Banach 空間 $X$ 上の縮小 $C_0$ 半群 $(T(t))_{t\ge0}$ の生成作用素とする。

任意の $\lambda>0$ について

$$
\lambda\in\rho(A)
$$

であり、

$$
R(\lambda,A)x
=
\int_0^\infty
e^{-\lambda t}T(t)x\,dt
$$

が成り立つ。

さらに

$$
\|R(\lambda,A)\|
\le
\frac1\lambda.
$$
<!-- formal-statement-end -->

### 証明の見取り図

積分で作った $y=R_\lambda x$ に対し、$T(h)y-y$ を計算して差分商を取ります。すると $y\in D(A)$ と

$$
(\lambda I-A)y=x
$$

が同時に得られます。逆向きは $x\in D(A)$ に対する

$$
\frac{d}{dt}
\left(
e^{-\lambda t}T(t)x
\right)
$$

を積分します。

<!-- proof-start -->
### 証明

$x\in X$ とし

$$
y
=
\int_0^\infty
e^{-\lambda t}T(t)x\,dt
$$

と置きます。

まず $h>0$ に対し

$$
\begin{aligned}
T(h)y
&=
\int_0^\infty
e^{-\lambda t}T(t+h)x\,dt
\\
&=
e^{\lambda h}
\int_h^\infty
e^{-\lambda r}T(r)x\,dr.
\end{aligned}
$$

したがって

$$
\begin{aligned}
\frac{T(h)y-y}{h}
&=
\frac{e^{\lambda h}-1}{h}
\int_h^\infty
e^{-\lambda r}T(r)x\,dr
\\
&\quad
-
\frac1h
\int_0^h
e^{-\lambda r}T(r)x\,dr.
\end{aligned}
$$

$h\downarrow0$ で

$$
\frac{e^{\lambda h}-1}{h}\to\lambda,
$$

$$
\int_h^\infty
e^{-\lambda r}T(r)x\,dr
\to y,
$$

また強連続性から

$$
\frac1h
\int_0^h
e^{-\lambda r}T(r)x\,dr
\to x.
$$

従って

$$
\frac{T(h)y-y}{h}
\to
\lambda y-x.
$$

よって

$$
y\in D(A),
\qquad
Ay=\lambda y-x,
$$

すなわち

$$
(\lambda I-A)y=x.
$$

したがって $\lambda I-A$ は全射です。

次に $z\in D(A)$ について

$$
(\lambda I-A)z=0
$$

と仮定します。すると $Az=\lambda z$ です。第2節より

$$
\frac{d}{dt}T(t)z
=
T(t)Az
=
\lambda T(t)z.
$$

よって

$$
T(t)z=e^{\lambda t}z.
$$

一方、縮小性から

$$
e^{\lambda t}\|z\|
=
\|T(t)z\|
\le
\|z\|.
$$

$t>0$ では $e^{\lambda t}>1$ なので $z=0$ です。従って $\lambda I-A$ は単射でもあります。

よって

$$
R(\lambda,A)=R_\lambda.
$$

最後に

$$
\begin{aligned}
\|R(\lambda,A)x\|
&\le
\int_0^\infty
e^{-\lambda t}\|T(t)x\|\,dt
\\
&\le
\|x\|
\int_0^\infty e^{-\lambda t}\,dt
\\
&=
\frac1\lambda\|x\|.
\end{aligned}
$$

したがって

$$
\|R(\lambda,A)\|
\le
\frac1\lambda.
$$

$\square$
<!-- proof-end -->

この式が Hille--Yosida の必要条件の源です。

$$
\boxed{
\text{時間側の縮小性}
\quad\Longrightarrow\quad
\text{レゾルベント側の }1/\lambda\text{ 評価}
}
$$

---

## 5. 対角半群ではレゾルベントが本当に Laplace 変換になる

第1節の対角半群の生成作用素は

$$
A(x_n)=(-nx_n),
$$

$$
D(A)
=
\{x\in\ell^2:(nx_n)\in\ell^2\}.
$$

実際、$\lambda>0$ に対して

$$
(\lambda I-A)x
=
((\lambda+n)x_n).
$$

従って

$$
R(\lambda,A)y
=
\left(
\frac{y_n}{\lambda+n}
\right)_{n\ge1}.
$$

一方、Laplace 表現を成分ごとに計算すると

$$
\begin{aligned}
\left(
\int_0^\infty
e^{-\lambda t}T(t)y\,dt
\right)_n
&=
\int_0^\infty
e^{-\lambda t}e^{-nt}y_n\,dt
\\
&=
y_n
\int_0^\infty
e^{-(\lambda+n)t}\,dt
\\
&=
\frac{y_n}{\lambda+n}.
\end{aligned}
$$

確かに一致します。

さらに

$$
\frac1{\lambda+n}
\le
\frac1\lambda
$$

だから

$$
\|R(\lambda,A)\|\le\frac1\lambda.
$$

抽象定理の評価が、各モードの減衰率にそのまま現れています。

---

## 6. 逆向きへ進むための Yosida 近似

ここまでは半群 $T(t)$ が先にあり、生成作用素 $A$ を取り出しました。Hille--Yosida の核心は逆向きです。

しかし非有界作用素 $A$ に対して

$$
e^{tA}
=
\sum_{k=0}^{\infty}\frac{t^kA^k}{k!}
$$

と書くことは一般にはできません。$A^k$ の定義域が狭く、級数を $X$ 全体で評価できないからです。

そこでレゾルベントを使って、$A$ を有界作用素へ近似します。

<a id="def-evol2-yosida-approximation"></a>
<!-- formal-statement-start -->
### 定義（Yosida 近似）

$A:D(A)\subset X\to X$ を線形作用素とし、$\lambda>0$ が $\rho(A)$ に属するとする。

$$
J_\lambda
=
\lambda R(\lambda,A)
$$

および

$$
A_\lambda
=
\lambda(J_\lambda-I)
$$

を定める。

$A_\lambda$ を $A$ の **Yosida 近似**という。
<!-- formal-statement-end -->

<!-- definition-example-start: def-evol2-yosida-approximation -->
### 定義の確認：対角生成作用素

$$
A(x_n)=(-nx_n)
$$

では

$$
R(\lambda,A)y
=
\left(
\frac{y_n}{\lambda+n}
\right).
$$

従って

$$
J_\lambda y
=
\left(
\frac{\lambda}{\lambda+n}y_n
\right),
$$

$$
A_\lambda y
=
\left(
-\frac{\lambda n}{\lambda+n}y_n
\right).
$$

元の係数 $-n$ は $n\to\infty$ で無限に大きくなりますが、

$$
\left|
\frac{\lambda n}{\lambda+n}
\right|
\le
\lambda
$$

なので $A_\lambda$ は $\ell^2$ 全体で定義された有界作用素です。

また固定した $n$ について

$$
-\frac{\lambda n}{\lambda+n}
\to
-n
\qquad(\lambda\to\infty).
$$

つまり Yosida 近似は、高周波の無限大をいったん $\lambda$ で切って有界化し、最後に $\lambda\to\infty$ で元へ戻す操作です。
<!-- definition-example-end -->

Hille--Yosida の仮定

$$
\|R(\lambda,A)\|
\le
\frac1\lambda
$$

があれば

$$
\|J_\lambda\|\le1.
$$

従って $A_\lambda$ は有界なので、指数級数で

$$
T_\lambda(t)
=
e^{tA_\lambda}
$$

を定義できます。

しかも

$$
A_\lambda
=
\lambda(J_\lambda-I)
$$

だから

$$
T_\lambda(t)
=
e^{-\lambda t}
e^{\lambda tJ_\lambda}.
$$

よって

$$
\begin{aligned}
\|T_\lambda(t)\|
&\le
e^{-\lambda t}
\sum_{k=0}^{\infty}
\frac{(\lambda t)^k}{k!}
\|J_\lambda\|^k
\\
&\le
e^{-\lambda t}
e^{\lambda t}
\\
&=
1.
\end{aligned}
$$

したがって、近似段階ですでに縮小性が保たれます。

---

## 7. レゾルベント条件から時間発展を作る

いよいよ逆向きをまとめます。

<a id="thm-evol2-hille-yosida-contraction"></a>
<!-- formal-statement-start -->
### 定理（Hille--Yosida：縮小半群版）

$X$ を Banach 空間、$A:D(A)\subset X\to X$ を線形作用素とする。

次は同値である。

1. $A$ は $X$ 上の縮小 $C_0$ 半群の生成作用素である。
2. $A$ は閉かつ稠密に定義され、すべての $\lambda>0$ について
   $$
   \lambda\in\rho(A)
   $$
   であり、
   $$
   \|R(\lambda,A)\|
   \le
   \frac1\lambda
   $$
   が成り立つ。
<!-- formal-statement-end -->

### 証明の見取り図

必要性は第3節と第4節です。

逆向きでは

$$
A
\to
A_\lambda
\to
T_\lambda(t)=e^{tA_\lambda}
\to
T(t)
$$

と進みます。

1. $J_\lambda=\lambda R(\lambda,A)$ が恒等作用素へ強収束する。
2. $A_\lambda x\to Ax$ を $x\in D(A)$ で示す。
3. $T_\lambda(t)$ が縮小作用素であり、$D(A)$ 上で Cauchy になることを示す。
4. 稠密性と縮小性で極限を $X$ 全体へ延長する。
5. 極限族 $T(t)$ が半群則・強連続性を持つ。
6. その生成作用素がちょうど $A$ であることを確認する。

<!-- proof-start -->
### 証明

#### 1から2

第3節より生成作用素は閉かつ稠密定義です。第4節より任意の $\lambda>0$ に対し

$$
\lambda\in\rho(A),
\qquad
\|R(\lambda,A)\|\le\frac1\lambda.
$$

#### 2から1

以下、条件2を仮定します。

まず

$$
J_\lambda=\lambda R(\lambda,A)
$$

と置きます。仮定から

$$
\|J_\lambda\|\le1.
$$

$x\in D(A)$ なら

$$
(\lambda I-A)x=\lambda x-Ax.
$$

両辺へ $R(\lambda,A)$ を作用させると

$$
x
=
\lambda R(\lambda,A)x
-
R(\lambda,A)Ax.
$$

従って

$$
J_\lambda x-x
=
R(\lambda,A)Ax.
$$

ゆえに

$$
\|J_\lambda x-x\|
\le
\frac1\lambda\|Ax\|
\to0.
$$

$D(A)$ は $X$ に稠密で、$\|J_\lambda\|\le1$ なので、任意の $x\in X$ へ延長して

$$
J_\lambda x\to x.
$$

次に

$$
A_\lambda
=
\lambda(J_\lambda-I)
$$

と置きます。レゾルベント恒等式

$$
A R(\lambda,A)
=
\lambda R(\lambda,A)-I
$$

から

$$
A_\lambda
=
\lambda A R(\lambda,A).
$$

また $x\in D(A)$ では

$$
A_\lambda x
=
J_\lambda Ax.
$$

したがって

$$
A_\lambda x\to Ax.
$$

各 $A_\lambda$ は有界なので

$$
T_\lambda(t)=e^{tA_\lambda}
$$

を定義できます。第6節の計算から

$$
\|T_\lambda(t)\|\le1.
$$

レゾルベント同士は可換なので $J_\lambda,J_\mu$、従って $A_\lambda,A_\mu$ も可換です。$x\in D(A)$ とし、

$$
F(s)
=
T_\lambda(t-s)T_\mu(s)x
$$

を $0\le s\le t$ で考えます。有界作用素の指数関数だから通常の微分ができ、

$$
F'(s)
=
T_\lambda(t-s)T_\mu(s)
(A_\mu-A_\lambda)x.
$$

積分すると

$$
T_\mu(t)x-T_\lambda(t)x
=
\int_0^t
T_\lambda(t-s)T_\mu(s)
(A_\mu-A_\lambda)x\,ds.
$$

縮小性から

$$
\|T_\mu(t)x-T_\lambda(t)x\|
\le
t\|(A_\mu-A_\lambda)x\|.
$$

しかも $A_\lambda x\to Ax$ なので、右辺は $\lambda,\mu\to\infty$ で0へ行きます。従って各固定 $T>0$ について、$x\in D(A)$ では $T_\lambda(t)x$ が $0\le t\le T$ 上一様に Cauchy です。

任意の $x\in X$ を取ります。$D(A)$ の稠密性から $x_m\in D(A)$ で $x_m\to x$ とできます。縮小性を使うと

$$
\begin{aligned}
\|T_\lambda(t)x-T_\mu(t)x\|
&\le
\|T_\lambda(t)(x-x_m)\|
\\
&\quad+
\|T_\lambda(t)x_m-T_\mu(t)x_m\|
\\
&\quad+
\|T_\mu(t)(x_m-x)\|
\\
&\le
2\|x-x_m\|
+
\|T_\lambda(t)x_m-T_\mu(t)x_m\|.
\end{aligned}
$$

まず $m$ を大きくし、その後 $\lambda,\mu$ を大きくすれば右辺を一様に小さくできます。従って任意の $x\in X$ に対し

$$
T(t)x
=
\lim_{\lambda\to\infty}T_\lambda(t)x
$$

が $t$ のコンパクト区間上一様に存在します。

各 $T_\lambda(t)$ が縮小作用素なので

$$
\|T(t)x\|
\le
\|x\|.
$$

よって

$$
\|T(t)\|\le1.
$$

半群則を示します。任意の $x\in X$ に対し

$$
T_\lambda(t+s)x
=
T_\lambda(t)T_\lambda(s)x.
$$

$\lambda\to\infty$ とすると、左辺は $T(t+s)x$ へ収束します。右辺について

$$
\begin{aligned}
\|T_\lambda(t)T_\lambda(s)x-T(t)T(s)x\|
&\le
\|T_\lambda(t)(T_\lambda(s)x-T(s)x)\|
\\
&\quad+
\|(T_\lambda(t)-T(t))T(s)x\|
\\
&\le
\|T_\lambda(s)x-T(s)x\|
\\
&\quad+
\|(T_\lambda(t)-T(t))T(s)x\|
\to0.
\end{aligned}
$$

したがって

$$
T(t+s)=T(t)T(s).
$$

また $T(0)=I$ です。

強連続性を示します。$x\in D(A)$ なら

$$
T_\lambda(t)x-x
=
\int_0^tT_\lambda(s)A_\lambda x\,ds.
$$

従って

$$
\|T_\lambda(t)x-x\|
\le
t\|A_\lambda x\|.
$$

$A_\lambda x\to Ax$ なので、十分大きい $\lambda$ で $\|A_\lambda x\|\le\|Ax\|+1$ とできます。$\lambda\to\infty$ で

$$
\|T(t)x-x\|
\le
t(\|Ax\|+1).
$$

よって $x\in D(A)$ では $T(t)x\to x$。一般の $x\in X$ には $D(A)$ の稠密性と縮小性で延長できます。

最後に $T(t)$ の生成作用素を $B$ と書き、$B=A$ を示します。

$x\in D(A)$ について、上の積分式で $\lambda\to\infty$ とすると

$$
T(t)x-x
=
\int_0^tT(s)Ax\,ds.
$$

従って

$$
\frac{T(t)x-x}{t}
=
\frac1t\int_0^tT(s)Ax\,ds
\to Ax
$$

なので

$$
x\in D(B),
\qquad
Bx=Ax.
$$

すなわち $A\subset B$ です。

逆に $x\in D(B)$ とします。任意の $\lambda>0$ に対し

$$
y=(\lambda I-B)x
$$

と置き、

$$
z=R(\lambda,A)y
$$

とします。$z\in D(A)\subset D(B)$ で

$$
(\lambda I-B)z
=
(\lambda I-A)z
=
y.
$$

従って

$$
(\lambda I-B)(x-z)=0.
$$

$B$ は縮小半群の生成作用素なので、第4節の単射性の議論から $\lambda I-B$ は単射です。よって

$$
x=z\in D(A).
$$

したがって $D(B)\subset D(A)$ で、結局

$$
A=B.
$$

以上で $A$ は縮小 $C_0$ 半群の生成作用素です。$\square$
<!-- proof-end -->

この定理で重要なのは、生成性を「作用素の指数関数が書けるか」で判定していないことです。

$$
\boxed{
\text{閉性}
+
\text{稠密性}
+
\text{正の実軸上のレゾルベント評価}
}
$$

が、時間発展の存在を保証します。

---

## 8. 指数成長を許す場合は作用素をずらす

PDE では必ずしも縮小半群だけが出るわけではありません。

$$
\|T(t)\|
\le
e^{\omega t}
$$

程度の指数成長を許すことがあります。

この場合

$$
S(t)=e^{-\omega t}T(t)
$$

と置けば $(S(t))$ は縮小半群です。生成作用素は

$$
A-\omega I
$$

になります。

<a id="cor-evol2-hille-yosida-quasi-contraction"></a>
<!-- formal-statement-start -->
### 系（指数成長型 Hille--Yosida）

$A:D(A)\subset X\to X$ を閉かつ稠密定義作用素、$\omega\in\mathbb R$ とする。

$A$ が

$$
\|T(t)\|
\le
e^{\omega t}
$$

を満たす $C_0$ 半群の生成作用素であることと、すべての $\lambda>\omega$ について

$$
\lambda\in\rho(A),
$$

$$
\|R(\lambda,A)\|
\le
\frac1{\lambda-\omega}
$$

が成り立つことは同値である。
<!-- formal-statement-end -->

<!-- proof-start -->
### 証明

$B=A-\omega I$ と置きます。

$$
\lambda I-A
=
(\lambda-\omega)I-B
$$

なので

$$
R(\lambda,A)
=
R(\lambda-\omega,B).
$$

また $A$ が $T(t)$ を生成するなら $B$ は

$$
S(t)=e^{-\omega t}T(t)
$$

を生成し、逆も同様です。

したがって

$$
\|T(t)\|\le e^{\omega t}
$$

は

$$
\|S(t)\|\le1
$$

と同値です。

縮小半群版 Hille--Yosida を $B$ に適用すると

$$
\|R(\mu,B)\|
\le
\frac1\mu
\qquad(\mu>0).
$$

ここで

$$
\mu=\lambda-\omega
$$

と置けば

$$
\|R(\lambda,A)\|
\le
\frac1{\lambda-\omega}.
$$

逆向きも同じ置換で従います。$\square$
<!-- proof-end -->

一般に定数 $M\ge1$ を伴う

$$
\|T(t)\|\le M e^{\omega t}
$$

を扱う完全版 Hille--Yosida では、単なる一次レゾルベント評価ではなく

$$
\|R(\lambda,A)^n\|
\le
\frac{M}{(\lambda-\omega)^n}
$$

を全ての $n\ge1$ で課します。本章では生成機構そのものを見通すため、縮小版と $M=1$ の指数成長版を主役にします。

---

## 9. translation semigroup で生成作用素を手計算する

$X=C_0([0,\infty))$ を、無限遠で0へ収束する連続関数全体に上限ノルムを入れた Banach 空間とします。

$$
(T(t)f)(s)=f(s+t)
$$

と置くと

$$
\|T(t)f\|_\infty
\le
\|f\|_\infty,
$$

$$
T(t+r)=T(t)T(r).
$$

$C_0([0,\infty))$ の関数は一様連続なので

$$
\|T(t)f-f\|_\infty\to0.
$$

従って $(T(t))$ は縮小 $C_0$ 半群です。

$f\in C^1([0,\infty))$ で $f,f'\in C_0([0,\infty))$ なら

$$
\frac{T(h)f-f}{h}(s)
=
\frac{f(s+h)-f(s)}{h}.
$$

微分の基本定理から

$$
\frac{f(s+h)-f(s)}{h}
-
f'(s)
=
\frac1h
\int_0^h
\{f'(s+r)-f'(s)\}\,dr.
$$

$f'$ は一様連続なので右辺は $s$ に一様に0へ行きます。よって

$$
Af=f'.
$$

この例では「生成作用素＝空間微分」が文字通り現れます。しかも微分作用素は全ての $C_0$ 関数には定義できないため、EVOL1 の定義域の議論が不可欠です。

---

## 10. 熱方程式では生成作用素が Laplacian になる

零 Dirichlet 熱方程式

$$
u_t=\Delta u
$$

を $(0,\pi)$ で考えます。

正弦基底

$$
e_n(x)=\sqrt{\frac2\pi}\sin(nx)
$$

では

$$
\Delta e_n=-n^2e_n.
$$

初期値

$$
u_0=\sum_{n=1}^{\infty}a_ne_n
$$

に対し

$$
T(t)u_0
=
\sum_{n=1}^{\infty}
e^{-n^2t}a_ne_n.
$$

これは第1節の対角半群の係数 $n$ を $n^2$ に置き換えたものです。

したがって生成作用素は

$$
Au
=
\Delta u
$$

で、スペクトル側では

$$
Ae_n=-n^2e_n.
$$

レゾルベントは

$$
R(\lambda,A)f
=
\sum_{n=1}^{\infty}
\frac{f_n}{\lambda+n^2}e_n.
$$

各係数について

$$
\frac1{\lambda+n^2}
\le
\frac1\lambda
$$

なので Hille--Yosida の評価が見えます。

この見方の利点は、

$$
\text{熱核を直接計算する}
$$

ことと

$$
\text{Laplacian が半群を生成することを示す}
$$

ことを分離できる点です。

EVOL5 ではさらに analytic semigroup を使い、正の時刻で微分が増える smoothing を作用素論として整理します。

---

## 11. Hille--Yosida と Lumer--Phillips は何が違うか

Hille--Yosida は

$$
\lambda I-A
$$

の可逆性とレゾルベント評価を直接確認する生成定理です。

しかし PDE では、レゾルベントを明示的に計算するより

$$
\operatorname{Re}\langle Ax,x\rangle
\le0
$$

のようなエネルギー散逸を確認する方が自然なことがあります。

次章 EVOL3 の Lumer--Phillips 定理は

$$
\text{dissipativity}
+
\text{range condition}
$$

から縮小半群生成を判定します。

役割分担は

$$
\boxed{
\text{Hille--Yosida}
=
\text{レゾルベントから生成性を見る}
}
$$

$$
\boxed{
\text{Lumer--Phillips}
=
\text{エネルギー散逸から生成性を見る}
}
$$

です。

---

## 12. 演習

### Level A

<a id="ex-evol2-a01"></a>
#### EVOL2-A01 対角作用素族の強連続性
- Level: A

$\ell^2$ 上で

$$
T(t)x=(e^{-nt}x_n)
$$

と置く。

1. $T(t+s)=T(t)T(s)$ を示せ。
2. $\|T(t)\|\le1$ を示せ。
3. 有限支え近似を使って $T(t)x\to x$ を示せ。

<!-- solution-start -->
**詳細解答**

1. 各成分で

$$
(T(t)T(s)x)_n
=
e^{-nt}e^{-ns}x_n
=
e^{-n(t+s)}x_n
=
(T(t+s)x)_n.
$$

従って

$$
T(t+s)=T(t)T(s).
$$

2. 任意の $x\in\ell^2$ に対して

$$
\|T(t)x\|_2^2
=
\sum_{n=1}^{\infty}e^{-2nt}|x_n|^2
\le
\sum_{n=1}^{\infty}|x_n|^2.
$$

従って

$$
\|T(t)\|\le1.
$$

3. $P_Nx=(x_1,\ldots,x_N,0,\ldots)$ とします。任意の $\varepsilon>0$ に対し、まず

$$
\|x-P_Nx\|_2<\frac{\varepsilon}{4}
$$

となる $N$ を取ります。

縮小性から

$$
\|T(t)(x-P_Nx)\|_2
\le
\|x-P_Nx\|_2.
$$

従って

$$
\begin{aligned}
\|T(t)x-x\|_2
&\le
\|T(t)(x-P_Nx)\|_2
\\
&\quad+
\|T(t)P_Nx-P_Nx\|_2
+
\|P_Nx-x\|_2
\\
&<
\frac{\varepsilon}{2}
+
\|T(t)P_Nx-P_Nx\|_2.
\end{aligned}
$$

$P_Nx$ は有限支えなので、有限個の成分について $e^{-nt}\to1$ を使えば

$$
\|T(t)P_Nx-P_Nx\|_2<\frac{\varepsilon}{2}
$$

となる十分小さい $t$ が取れます。よって

$$
\|T(t)x-x\|_2<\varepsilon.
$$

したがって $T(t)x\to x$ です。
<!-- solution-end -->

<a id="ex-evol2-a02"></a>
#### EVOL2-A02 対角半群の生成作用素
- Level: A

EVOL2-A01 の半群について、生成作用素が

$$
Ax=(-nx_n)
$$

で

$$
D(A)
=
\{x\in\ell^2:(nx_n)\in\ell^2\}
$$

となることを示せ。

<!-- solution-start -->
**詳細解答**

まず $x\in D(A)$ と仮定します。

各成分について

$$
\frac{e^{-nh}-1}{h}x_n
\to
-nx_n.
$$

さらに $r\ge0$ に対して

$$
0\le1-e^{-r}\le r
$$

だから

$$
\left|
\frac{e^{-nh}-1}{h}
\right|
\le n.
$$

従って

$$
\left|
\frac{e^{-nh}-1}{h}x_n+nx_n
\right|
\le
2n|x_n|.
$$

右辺の二乗和は $x\in D(A)$ より有限です。有限尾部分割を使えば

$$
\left\|
\frac{T(h)x-x}{h}
-
(-nx_n)
\right\|_2
\to0.
$$

よって $x$ は生成作用素の定義域に入り、

$$
Ax=(-nx_n).
$$

逆に差分商が $\ell^2$ である $y$ に収束するとします。$\ell^2$ 収束は各成分収束を含むので

$$
y_n
=
\lim_{h\downarrow0}
\frac{e^{-nh}-1}{h}x_n
=
-nx_n.
$$

$y\in\ell^2$ だから

$$
(nx_n)\in\ell^2.
$$

従って $x\in D(A)$ です。

以上より定義域はちょうど

$$
D(A)=\{x:(nx_n)\in\ell^2\}
$$

です。
<!-- solution-end -->

<a id="ex-evol2-a03"></a>
#### EVOL2-A03 軌道の積分恒等式
- Level: A

$A$ を $C_0$ 半群 $(T(t))$ の生成作用素とし、$x\in D(A)$ とする。

$$
T(t)x-x
=
\int_0^tT(s)Ax\,ds
$$

を示せ。

<!-- solution-start -->
**詳細解答**

本文の軌道微分命題から

$$
\frac{d}{ds}T(s)x
=
T(s)Ax.
$$

右辺は $s$ の連続関数です。従って Banach 空間値の微積分の基本定理を使い、

$$
T(t)x-T(0)x
=
\int_0^tT(s)Ax\,ds.
$$

$T(0)=I$ だから

$$
T(t)x-x
=
\int_0^tT(s)Ax\,ds.
$$
<!-- solution-end -->

<a id="ex-evol2-a04"></a>
#### EVOL2-A04 Laplace レゾルベント評価
- Level: A

$(T(t))$ を縮小 $C_0$ 半群とする。$\lambda>0$ に対し

$$
R_\lambda x
=
\int_0^\infty e^{-\lambda t}T(t)x\,dt
$$

と置く。

$$
\|R_\lambda\|
\le
\frac1\lambda
$$

を示せ。

<!-- solution-start -->
**詳細解答**

任意の $x\in X$ について、三角不等式と縮小性から

$$
\begin{aligned}
\|R_\lambda x\|
&\le
\int_0^\infty
e^{-\lambda t}\|T(t)x\|\,dt
\\
&\le
\|x\|
\int_0^\infty
e^{-\lambda t}\,dt.
\end{aligned}
$$

最後の積分は

$$
\int_0^\infty e^{-\lambda t}\,dt
=
\frac1\lambda.
$$

従って

$$
\|R_\lambda x\|
\le
\frac1\lambda\|x\|.
$$

$x\ne0$ について $\|x\|$ で割り、上限を取れば

$$
\|R_\lambda\|
\le
\frac1\lambda.
$$
<!-- solution-end -->

<a id="ex-evol2-a05"></a>
#### EVOL2-A05 生成作用素の shift
- Level: A

$A$ が $C_0$ 半群 $T(t)$ を生成するとする。$\omega\in\mathbb R$ とし

$$
S(t)=e^{-\omega t}T(t)
$$

と置く。

$S(t)$ の生成作用素が $A-\omega I$ であることを示せ。

<!-- solution-start -->
**詳細解答**

$x\in D(A)$ とします。

$$
\begin{aligned}
\frac{S(h)x-x}{h}
&=
\frac{e^{-\omega h}T(h)x-x}{h}
\\
&=
e^{-\omega h}
\frac{T(h)x-x}{h}
+
\frac{e^{-\omega h}-1}{h}x.
\end{aligned}
$$

$h\downarrow0$ で

$$
e^{-\omega h}\to1,
$$

$$
\frac{T(h)x-x}{h}\to Ax,
$$

$$
\frac{e^{-\omega h}-1}{h}\to-\omega.
$$

従って

$$
\frac{S(h)x-x}{h}
\to
Ax-\omega x
=
(A-\omega I)x.
$$

逆に $S$ の差分商が存在すれば

$$
T(h)x=e^{\omega h}S(h)x
$$

と同じ計算を逆向きに使って $T$ の差分商も存在します。したがって定義域も一致し、生成作用素は

$$
A-\omega I
$$

です。
<!-- solution-end -->

### Level B

<a id="ex-evol2-b01"></a>
#### EVOL2-B01 短時間平均は生成作用素の定義域に入る
- Level: B

$A$ を $C_0$ 半群 $(T(t))$ の生成作用素とする。$x\in X$、$t>0$ に対し

$$
x_t
=
\frac1t\int_0^tT(s)x\,ds
$$

と置く。

1. $x_t\in D(A)$ を示せ。
2. 
   $$
   Ax_t=\frac{T(t)x-x}{t}
   $$
   を示せ。
3. $x_t\to x$ を示し、$D(A)$ の稠密性を導け。

<!-- solution-start -->
**詳細解答**

1と2は同時に示します。$h>0$ について

$$
\begin{aligned}
T(h)x_t-x_t
&=
\frac1t
\left[
\int_0^tT(h+s)x\,ds
-
\int_0^tT(s)x\,ds
\right]
\\
&=
\frac1t
\left[
\int_t^{t+h}T(r)x\,dr
-
\int_0^hT(r)x\,dr
\right].
\end{aligned}
$$

よって

$$
\frac{T(h)x_t-x_t}{h}
=
\frac1t
\left[
\frac1h\int_t^{t+h}T(r)x\,dr
-
\frac1h\int_0^hT(r)x\,dr
\right].
$$

強連続性から

$$
\frac1h\int_t^{t+h}T(r)x\,dr
\to
T(t)x,
$$

$$
\frac1h\int_0^hT(r)x\,dr
\to
x.
$$

したがって差分商は収束し、

$$
x_t\in D(A),
$$

$$
Ax_t
=
\frac{T(t)x-x}{t}.
$$

3について

$$
x_t-x
=
\frac1t
\int_0^t(T(s)x-x)\,ds.
$$

従って

$$
\|x_t-x\|
\le
\frac1t
\int_0^t
\|T(s)x-x\|\,ds.
$$

$s\downarrow0$ で被積分関数は0へ行くので、右辺も $t\downarrow0$ で0へ行きます。

よって任意の $x\in X$ が $D(A)$ の元 $x_t$ で近似でき、

$$
\overline{D(A)}=X.
$$
<!-- solution-end -->

<a id="ex-evol2-b02"></a>
#### EVOL2-B02 translation semigroup のレゾルベント
- Level: B

$X=C_0([0,\infty))$ 上で

$$
(T(t)f)(s)=f(s+t)
$$

とする。$\lambda>0$ に対し

$$
(R_\lambda f)(s)
=
\int_0^\infty
e^{-\lambda t}f(s+t)\,dt
$$

と置く。

1. $\|R_\lambda f\|_\infty\le\lambda^{-1}\|f\|_\infty$ を示せ。
2. $g=R_\lambda f$ が
   $$
   \lambda g-g'=f
   $$
   を満たすことを示せ。

<!-- solution-start -->
**詳細解答**

1. 任意の $s\ge0$ に対し

$$
\begin{aligned}
|R_\lambda f(s)|
&\le
\int_0^\infty
e^{-\lambda t}|f(s+t)|\,dt
\\
&\le
\|f\|_\infty
\int_0^\infty e^{-\lambda t}\,dt
\\
&=
\frac1\lambda\|f\|_\infty.
\end{aligned}
$$

$s$ の上限を取って

$$
\|R_\lambda f\|_\infty
\le
\frac1\lambda\|f\|_\infty.
$$

2. 変数 $r=s+t$ と置くと

$$
g(s)
=
e^{\lambda s}
\int_s^\infty
e^{-\lambda r}f(r)\,dr.
$$

積の微分と積分上端・下端の微分を使って

$$
\begin{aligned}
g'(s)
&=
\lambda e^{\lambda s}
\int_s^\infty
e^{-\lambda r}f(r)\,dr
-
e^{\lambda s}e^{-\lambda s}f(s)
\\
&=
\lambda g(s)-f(s).
\end{aligned}
$$

従って

$$
\lambda g-g'=f.
$$

translation semigroup の生成作用素は $A=d/ds$ なので、これは

$$
(\lambda I-A)g=f
$$

そのものです。
<!-- solution-end -->

<a id="ex-evol2-b03"></a>
#### EVOL2-B03 対角作用素で Hille--Yosida を直接確認する
- Level: B

$\ell^2$ 上で

$$
A(x_n)=(-nx_n),
$$

$$
D(A)=\{x:(nx_n)\in\ell^2\}
$$

とする。

1. $A$ が閉かつ稠密定義であることを EVOL1 の結果から説明せよ。
2. 任意の $\lambda>0$ について
   $$
   R(\lambda,A)y
   =
   \left(
   \frac{y_n}{\lambda+n}
   \right)
   $$
   を示せ。
3. Hille--Yosida を適用して縮小半群の生成性を結論せよ。

<!-- solution-start -->
**詳細解答**

1. EVOL1 の正の対角作用素

$$
A_+(x_n)=(nx_n)
$$

は、同じ定義域

$$
D(A_+)=\{x:(nx_n)\in\ell^2\}
$$

で閉かつ稠密定義でした。

$A=-A_+$ なので、グラフの第二成分へ符号を付けるだけです。したがって $A$ も閉作用素です。定義域は変わらないので稠密性も保たれます。

2. 方程式

$$
(\lambda I-A)x=y
$$

は成分ごとに

$$
(\lambda+n)x_n=y_n.
$$

従って候補は

$$
x_n=\frac{y_n}{\lambda+n}.
$$

さらに

$$
\sum n^2|x_n|^2
=
\sum
\left(
\frac{n}{\lambda+n}
\right)^2|y_n|^2
\le
\sum|y_n|^2,
$$

なので $x\in D(A)$ です。従って

$$
R(\lambda,A)y
=
\left(
\frac{y_n}{\lambda+n}
\right).
$$

3. 各成分で

$$
\frac1{\lambda+n}
\le
\frac1\lambda
$$

だから

$$
\|R(\lambda,A)y\|_2
\le
\frac1\lambda\|y\|_2.
$$

従って Hille--Yosida の全条件を満たします。よって $A$ は縮小 $C_0$ 半群を生成します。

実際、その半群は

$$
T(t)x=(e^{-nt}x_n)
$$

です。
<!-- solution-end -->

<a id="ex-evol2-b04"></a>
#### EVOL2-B04 Yosida 近似の収束
- Level: B

EVOL2-B03 の対角作用素について

$$
A_\lambda
=
\lambda A R(\lambda,A)
$$

とする。

1. $A_\lambda$ の第 $n$ 成分の係数を求めよ。
2. $\|A_\lambda\|\le\lambda$ を示せ。
3. $x\in D(A)$ なら $A_\lambda x\to Ax$ を $\ell^2$ で示せ。

<!-- solution-start -->
**詳細解答**

1. まず

$$
R(\lambda,A)x
=
\left(
\frac{x_n}{\lambda+n}
\right).
$$

これへ $A$ を作用させると

$$
A R(\lambda,A)x
=
\left(
-\frac{n}{\lambda+n}x_n
\right).
$$

従って

$$
A_\lambda x
=
\left(
-\frac{\lambda n}{\lambda+n}x_n
\right).
$$

2. 各 $n$ について

$$
0\le
\frac{\lambda n}{\lambda+n}
\le
\lambda.
$$

したがって

$$
\|A_\lambda x\|_2^2
\le
\lambda^2\|x\|_2^2.
$$

よって

$$
\|A_\lambda\|\le\lambda.
$$

3. $x\in D(A)$ なら $(nx_n)\in\ell^2$ です。

差は

$$
(A_\lambda x-Ax)_n
=
\left(
-\frac{\lambda n}{\lambda+n}
+n
\right)x_n
=
\frac{n^2}{\lambda+n}x_n.
$$

固定した $n$ について

$$
\frac{n^2}{\lambda+n}x_n\to0.
$$

また

$$
0\le
\frac{n^2}{\lambda+n}
\le n.
$$

従って

$$
\left|
\frac{n^2}{\lambda+n}x_n
\right|
\le
n|x_n|.
$$

右辺の二乗和は有限です。有限尾部を使った優収束により

$$
\|A_\lambda x-Ax\|_2\to0.
$$
<!-- solution-end -->

### Level C

<a id="ex-evol2-c01"></a>
#### EVOL2-C01 Dirichlet 熱半群を Hille--Yosida で読む
- Level: C

$X=L^2(0,\pi)$ とし、

$$
e_n(x)=\sqrt{\frac2\pi}\sin(nx)
$$

を正規直交基底とする。

作用素 $A$ を

$$
D(A)
=
\left\{
u=\sum_{n\ge1}a_ne_n:
\sum_{n\ge1}n^4|a_n|^2<\infty
\right\},
$$

$$
Au
=
-\sum_{n\ge1}n^2a_ne_n
$$

で定める。

1. $A$ が稠密定義であることを示せ。
2. $A$ が閉作用素であることを示せ。
3. $\lambda>0$ に対し $R(\lambda,A)$ を求め、
   $$
   \|R(\lambda,A)\|\le\frac1\lambda
   $$
   を示せ。
4. Hille--Yosida により縮小 $C_0$ 半群 $T(t)$ が存在することを示し、その作用を基底展開で求めよ。
5. $u_0\in D(A)$ なら $u(t)=T(t)u_0$ が
   $$
   u_t=Au
   $$
   を満たすことを示せ。

<!-- solution-start -->
**詳細解答**

1. 有限個の $e_n$ の線形結合は $D(A)$ に入ります。正規直交基底の有限線形結合は $L^2(0,\pi)$ に稠密なので

$$
\overline{D(A)}^{L^2}
=
L^2(0,\pi).
$$

2. $u^{(k)}\in D(A)$ が

$$
u^{(k)}\to u,
\qquad
Au^{(k)}\to v
$$

を $L^2$ で満たすとします。

係数を

$$
u^{(k)}=\sum_na_n^{(k)}e_n,
\qquad
u=\sum_na_ne_n,
\qquad
v=\sum_nb_ne_n
$$

と書きます。

$L^2$ 収束から各固定 $n$ について

$$
a_n^{(k)}\to a_n.
$$

また

$$
Au^{(k)}
=
-\sum_n n^2a_n^{(k)}e_n
\to
\sum_nb_ne_n
$$

だから

$$
-n^2a_n^{(k)}\to b_n.
$$

従って

$$
b_n=-n^2a_n.
$$

$v\in L^2$ より

$$
\sum_n|b_n|^2
=
\sum_n n^4|a_n|^2
<\infty.
$$

したがって $u\in D(A)$ で

$$
Au=v.
$$

よって $A$ は閉作用素です。

3. 方程式

$$
(\lambda I-A)u=f
$$

を係数で書きます。

$$
(\lambda+n^2)a_n=f_n.
$$

従って

$$
R(\lambda,A)f
=
\sum_{n\ge1}
\frac{f_n}{\lambda+n^2}e_n.
$$

さらに

$$
\begin{aligned}
\|R(\lambda,A)f\|_2^2
&=
\sum_n
\frac{|f_n|^2}{(\lambda+n^2)^2}
\\
&\le
\frac1{\lambda^2}
\sum_n|f_n|^2.
\end{aligned}
$$

従って

$$
\|R(\lambda,A)\|
\le
\frac1\lambda.
$$

4. 1から3で Hille--Yosida の条件がそろったので、$A$ は縮小 $C_0$ 半群を生成します。

各基底ベクトルでは

$$
Ae_n=-n^2e_n.
$$

従って一変数 ODE

$$
c_n'(t)=-n^2c_n(t)
$$

の解から

$$
T(t)e_n=e^{-n^2t}e_n.
$$

線形性と連続性により一般の

$$
u_0=\sum_na_ne_n
$$

に対して

$$
T(t)u_0
=
\sum_n
e^{-n^2t}a_ne_n.
$$

5. $u_0\in D(A)$ なら軌道微分命題を使えて

$$
\frac{d}{dt}T(t)u_0
=
AT(t)u_0.
$$

従って

$$
u(t)=T(t)u_0
$$

は

$$
u_t=Au
$$

を満たします。

基底ごとに見ても

$$
\frac{d}{dt}
\left(
e^{-n^2t}a_n
\right)
=
-n^2e^{-n^2t}a_n
$$

であり、同じ式が得られます。

この問題では

$$
\text{閉性・稠密性}
\to
\text{レゾルベント評価}
\to
\text{半群生成}
\to
\text{熱方程式}
$$

が一つにつながっています。
<!-- solution-end -->

---

## 13. 本章で持ち帰る構造

最初に知っていたのは、時間発展を表す強連続半群でした。

そこから

$$
Ax
=
\lim_{h\downarrow0}
\frac{T(h)x-x}{h}
$$

で生成作用素を取り出すと、生成作用素は自動的に閉かつ稠密定義になります。

縮小半群ならさらに

$$
R(\lambda,A)
=
\int_0^\infty
e^{-\lambda t}T(t)\,dt
$$

で、時間発展の Laplace 変換がレゾルベントになります。

逆に、閉かつ稠密定義な作用素が

$$
\|R(\lambda,A)\|
\le
\frac1\lambda
$$

を満たせば、Yosida 近似

$$
A_\lambda
=
\lambda A R(\lambda,A)
$$

で有界作用素へ近似し、

$$
e^{tA_\lambda}
$$

の極限として本物の $C_0$ 半群を構成できます。

したがって本章の中心は

$$
\boxed{
\text{時間発展}
\leftrightarrow
\text{生成作用素}
\leftrightarrow
\text{レゾルベント}
}
$$

です。

次章 EVOL3 では、同じ縮小半群生成問題をレゾルベントの明示評価ではなく、dissipativity と range condition から判定する Lumer--Phillips 定理へ進みます。
