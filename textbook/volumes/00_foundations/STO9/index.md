# STO9：確率微分方程式 — 存在一意性と局所化

<!-- definition-example-audit: strict -->

STO7 までで、Brown 運動に沿った stochastic integral と Itô formula を使えるようになりました。

次の問いは自然です。

$$
dX_t=b(X_t)\,dt+\sigma(X_t)\,dW_t,
\qquad
X_0=\xi
$$

と書いたとき、そもそもこの式を満たす process は存在するのでしょうか。

存在したとして、

- 同じ Brown 運動を入れたら同じ解になるのか
- 係数を少し変えたら解も少ししか変わらないのか
- 係数が global Lipschitz でないとき、どこまで解を延長できるのか
- 有限時間で $|X_t|$ が無限遠へ逃げることはあるのか

を区別して考える必要があります。

本章の中心線は

$$
\boxed{
\text{integral equation}
\to
\text{strong solution}
\to
\text{Picard iteration}
\to
\text{pathwise uniqueness}
\to
\text{localization}
\to
\text{non-explosion}
}
$$

です。

weak solution、uniqueness in law、Girsanov theorem は次の STO10 に送ります。本章では **同じ確率空間・同じ Brown 運動を固定した上で解を作る** ことに集中します。

---

## 1. SDE は積分表示として読む

$W=(W^1,\ldots,W^m)$ を [STO7 の $m$ 次元 Brown 運動](../STO7/index.md#def-sto7-vector-brownian) とします。

係数

$$
b:\mathbb R^d\to\mathbb R^d,
\qquad
\sigma:\mathbb R^d\to\mathbb R^{d\times m}
$$

を考えます。

微分記号

$$
dX_t=b(X_t)\,dt+\sigma(X_t)\,dW_t
$$

は、通常の微分方程式の意味で微分可能な標本関数を要求しているわけではありません。

<a id="def-sto9-sde"></a>

<!-- formal-statement-start -->
> **定義（Brownian SDE）**  
> $W$ を $m$ 次元 Brown 運動、$\xi$ を $\mathbb R^d$-値初期確率変数とする。
>
> process $X=(X_t)_{t\ge0}$ が
>
$$
X_t
=
\xi
+
\int_0^t b(X_s)\,ds
+
\int_0^t \sigma(X_s)\,dW_s
$$
>
> を全ての $t$ で almost surely 満たすとき、この積分表示を
>
$$
dX_t=b(X_t)\,dt+\sigma(X_t)\,dW_t,
\qquad
X_0=\xi
$$
>
> と略記する。
<!-- formal-statement-end -->

右辺の stochastic integral は STO6 で構成した Itô integral です。

したがって SDE を「解く」とは、Brown 運動の標本関数を通常微分することではなく、**積分表示の固定点を探すこと**です。

<!-- definition-example-start: def-sto9-sde -->
### 直接例：定数係数なら積分するだけ

$b(x)\equiv\mu\in\mathbb R^d$、$\sigma(x)\equiv\Sigma\in\mathbb R^{d\times m}$ とします。

すると

$$
X_t
=
\xi+\mu t+\Sigma W_t
$$

について

$$
\int_0^t b(X_s)\,ds
=
\mu t
$$

かつ

$$
\int_0^t \sigma(X_s)\,dW_s
=
\Sigma W_t
$$

なので、定義の積分表示をそのまま満たします。

ここでは SDE が「Brown 運動に drift を足したもの」として目で確認できます。
<!-- definition-example-end -->

---

## 2. 解を作るとき何を固定するのか

weak solution との違いを後続章で明確にするため、本章では確率空間を固定します。

$\xi$ と $W$ が生成する filtration を usual augmentation したものを

$$
\mathcal F_t^{\xi,W}
=
\sigma\!\left(
\xi,\,
W_s:0\le s\le t
\right)^{\mathrm{aug}}
$$

と書きます。

本章では $W$ がこの joint filtration $(\mathcal F_t^{\xi,W})$ に関しても Brown 運動であることを仮定します。例えば $\xi$ と Brown 運動 $W$ が independent ならこの条件を満たします。これにより「初期値を最初から知っている」ことが、未来の Brownian increments を先取りすることはありません。

<a id="def-sto9-strong-solution"></a>

<!-- formal-statement-start -->
> **定義（strong solution）**  
> 初期値 $\xi$ と $m$ 次元 Brown 運動 $W$ を一つ固定し、
>
$$
\mathcal F_t=\mathcal F_t^{\xi,W}
$$
>
> とする。
>
> continuous $\mathbb R^d$-値 process $X$ が $(\mathcal F_t)$-adapted であり、各 $T<\infty$ について
>
$$
\int_0^T
\left(
|b(X_s)|
+
\|\sigma(X_s)\|_{\mathrm F}^2
\right)ds
<
\infty
$$
>
> almost surely で、さらに
>
$$
X_t
=
\xi
+
\int_0^t b(X_s)\,ds
+
\int_0^t \sigma(X_s)\,dW_s
$$
>
> を全ての $t\ge0$ で almost surely 満たすとき、$X$ をこの SDE の **strong solution** という。
<!-- formal-statement-end -->

$\|\cdot\|_{\mathrm F}$ は行列の Frobenius norm です。

strong という語は「数値誤差の strong convergence」とは別の意味です。

ここでは、

$$
\boxed{
\text{Brownian motion }W
\text{ と初期値 }\xi
\text{ を先に固定し、その情報だけから }X\text{ を作る}
}
$$

という意味です。

<!-- definition-example-start: def-sto9-strong-solution -->
### 直接例：geometric Brownian motion は Brown 運動の明示関数

1 次元で

$$
dX_t=\mu X_t\,dt+\alpha X_t\,dW_t,
\qquad
X_0=x
$$

を考えます。

候補

$$
X_t
=
x\exp\left\{
\left(\mu-\frac{\alpha^2}{2}\right)t
+\alpha W_t
\right\}
$$

は $W_t$ の連続関数なので $\mathcal F_t^{W}$-adapted です。

$f(t,w)=x\exp((\mu-\alpha^2/2)t+\alpha w)$ に
[Itô process 版の時間依存 Itô formula](../STO7/index.md#thm-sto7-ito-process-formula)
を使うと

$$
\partial_t f
=
\left(\mu-\frac{\alpha^2}{2}\right)f,
\qquad
\partial_w f
=
\alpha f,
\qquad
\partial_{ww}f
=
\alpha^2 f.
$$

従って

$$
\begin{aligned}
dX_t
&=
\left(
\partial_t f+\frac12\partial_{ww}f
\right)dt
+
\partial_w f\,dW_t\\
&=
\mu X_t\,dt
+
\alpha X_t\,dW_t.
\end{aligned}
$$

よってこの $X$ は strong solution です。

指数の $-\alpha^2/2$ が、[Brownian quadratic variation](../STO5/index.md#thm-sto5-brownian-qv) から来る Itô correction です。
<!-- definition-example-end -->

---

## 3. 一意性には複数の意味がある

本章で必要なのは、同じ Brown 運動を共有する二つの解を比較する一意性です。

<a id="def-sto9-pathwise-uniqueness"></a>

<!-- formal-statement-start -->
> **定義（pathwise uniqueness）**  
> 同じ filtered probability space 上で、同じ Brown 運動 $W$ と同じ初期値 $\xi$ を使う二つの strong solution $X,Y$ を取る。
>
> 任意のそのような $X,Y$ に対して
>
$$
P\left(
X_t=Y_t
\text{ for all }t\ge0
\right)=1
$$
>
> が成り立つとき、その SDE は **pathwise uniqueness** を持つという。
<!-- formal-statement-end -->

ここで重要なのは「分布が同じ」だけでは弱いことです。

pathwise uniqueness は

$$
\boxed{
\text{same noise}
+
\text{same initial state}
\Longrightarrow
\text{same sample path}
}
$$

という主張です。

<!-- definition-example-start: def-sto9-pathwise-uniqueness -->
### 直接例：定数係数では差を取れば消える

$$
dX_t=\mu\,dt+\alpha\,dW_t,
\qquad
dY_t=\mu\,dt+\alpha\,dW_t,
\qquad
X_0=Y_0
$$

なら

$$
X_t-Y_t
=
X_0-Y_0
=
0.
$$

同じ Brown 運動を入れているため stochastic terms も完全に相殺します。

後で global Lipschitz 係数について、この「差を取る」を Gronwall estimate へ一般化します。
<!-- definition-example-end -->

---

## 4. まず Gronwall の機械を用意する

Picard iteration と uniqueness の両方で同じ積分不等式が現れます。

<a id="lem-sto9-gronwall"></a>

<!-- formal-statement-start -->
> **補題（積分形 Gronwall lemma）**  
> $f:[0,T]\to[0,\infty)$ を連続関数とし、定数 $a,c\ge0$ に対して
>
$$
f(t)
\le
a+c\int_0^t f(s)\,ds
\qquad
(0\le t\le T)
$$
>
> が成り立つとする。
>
> このとき
>
$$
f(t)\le a e^{ct}
$$
>
> が成り立つ。特に $a=0$ なら $f\equiv0$ である。
<!-- formal-statement-end -->

### 証明の見取り図

右辺自体を新しい関数 $g$ とし、$g'\le cg$ を作ります。

<!-- proof-start -->
### 証明

$$
g(t)
=
a+c\int_0^t f(s)\,ds
$$

と置きます。

仮定から

$$
0\le f(t)\le g(t)
$$

であり、

$$
g'(t)
=
cf(t)
\le
cg(t).
$$

従って

$$
\frac{d}{dt}
\left(
e^{-ct}g(t)
\right)
=
e^{-ct}
\{g'(t)-cg(t)\}
\le0.
$$

したがって

$$
e^{-ct}g(t)
\le
g(0)
=
a.
$$

よって

$$
f(t)
\le
g(t)
\le
ae^{ct}.
$$

$a=0$ なら $f(t)\le0$ なので $f\equiv0$ です。
<!-- proof-end -->

---

## 5. global Lipschitz 係数と linear growth

存在一意性を保証する最も標準的な条件を置きます。

係数 $b,\sigma$ が **global Lipschitz** であるとは、ある $L<\infty$ が存在して全ての $x,y\in\mathbb R^d$ について

$$
|b(x)-b(y)|
+
\|\sigma(x)-\sigma(y)\|_{\mathrm F}
\le
L|x-y|
$$

が成り立つこととします。

この仮定は自動的に linear growth を与えます。

実際、

$$
|b(x)|
\le
|b(0)|+L|x|
$$

なので

$$
|b(x)|^2
\le
2|b(0)|^2+2L^2|x|^2.
$$

$\sigma$ も同様です。

従ってある $K<\infty$ が存在して

$$
\boxed{
|b(x)|^2
+
\|\sigma(x)\|_{\mathrm F}^2
\le
K(1+|x|^2)
}
$$

となります。

この「Lipschitz は差を制御し、linear growth は大きさを制御する」という役割分担を覚えておくと、local theory で何が不足するかが見えやすくなります。

---

## 6. Picard iteration を stochastic integral で回す

初期値 $\xi\in L^2$ とし、

$$
X_t^{(0)}=\xi
$$

から始めて

$$
X_t^{(n+1)}
=
\xi
+
\int_0^t b(X_s^{(n)})\,ds
+
\int_0^t \sigma(X_s^{(n)})\,dW_s
$$

と定義します。

deterministic equation の Picard iteration と同じ形ですが、stochastic integral の差を [continuous-time Doob $L^2$ inequality](../STO6/index.md#thm-sto6-doob-l2) で制御する点が新しいところです。

<a id="lem-sto9-picard-estimate"></a>

<!-- formal-statement-start -->
> **補題（Picard 差分の factorial estimate）**  
> $b,\sigma$ が global Lipschitz で、$E|\xi|^2<\infty$ とする。
>
> 任意の $T<\infty$ に対し、$T$ と Lipschitz 定数のみに依存する $C_T<\infty$ が存在して
>
$$
D_{n+1}(t)
:=
E\left[
\sup_{0\le u\le t}
|X_u^{(n+1)}-X_u^{(n)}|^2
\right]
\le
C_T\int_0^t D_n(s)\,ds
$$
>
> が $0\le t\le T$ で成り立つ。
>
> 特に
>
$$
D_{n+1}(T)
\le
D_1(T)
\frac{(C_TT)^n}{n!}.
$$
<!-- formal-statement-end -->

### 証明の見取り図

差

$$
\Delta_t^{(n+1)}
=
X_t^{(n+1)}-X_t^{(n)}
$$

を drift part と martingale part に分けます。

drift は Cauchy--Schwarz、martingale は Doob $L^2$ inequality と Itô isometry で同じ

$$
\int_0^t D_n(s)\,ds
$$

へ落ちます。

<!-- proof-start -->
### 証明

$$
\Delta_t^{(n+1)}
=
\int_0^t
\{b(X_s^{(n)})-b(X_s^{(n-1)})\}\,ds
+
\int_0^t
\{\sigma(X_s^{(n)})-\sigma(X_s^{(n-1)})\}\,dW_s.
$$

$(a+b)^2\le2a^2+2b^2$ より

$$
D_{n+1}(t)
\le
2A_n(t)+2M_n(t),
$$

ただし

$$
A_n(t)
=
E\sup_{u\le t}
\left|
\int_0^u
\{b(X_s^{(n)})-b(X_s^{(n-1)})\}\,ds
\right|^2
$$

および

$$
M_n(t)
=
E\sup_{u\le t}
\left|
\int_0^u
\{\sigma(X_s^{(n)})-\sigma(X_s^{(n-1)})\}\,dW_s
\right|^2.
$$

drift part について Cauchy--Schwarz から

$$
\begin{aligned}
A_n(t)
&\le
t
E\int_0^t
|b(X_s^{(n)})-b(X_s^{(n-1)})|^2\,ds\\
&\le
tL^2
\int_0^t
E|X_s^{(n)}-X_s^{(n-1)}|^2\,ds\\
&\le
TL^2
\int_0^t
D_n(s)\,ds.
\end{aligned}
$$

martingale part は
[Doob $L^2$ inequality](../STO6/index.md#thm-sto6-doob-l2)
と
[Itô isometry による $L^2$ stochastic integral](../STO6/index.md#thm-sto6-l2-construction)
から

$$
\begin{aligned}
M_n(t)
&\le
4
E
\left|
\int_0^t
\{\sigma(X_s^{(n)})-\sigma(X_s^{(n-1)})\}\,dW_s
\right|^2\\
&=
4E\int_0^t
\|\sigma(X_s^{(n)})-\sigma(X_s^{(n-1)})\|_{\mathrm F}^2\,ds\\
&\le
4L^2
\int_0^t
D_n(s)\,ds.
\end{aligned}
$$

従って

$$
D_{n+1}(t)
\le
(2TL^2+8L^2)
\int_0^tD_n(s)\,ds.
$$

右辺の係数を $C_T$ と書けば第一主張です。

これを反復すると

$$
\begin{aligned}
D_{n+1}(T)
&\le
C_T\int_0^T D_n(s_n)\,ds_n\\
&\le
C_T^2
\int_{0<s_{n-1}<s_n<T}
D_{n-1}(s_{n-1})
\,ds_{n-1}ds_n\\
&\le\cdots\\
&\le
D_1(T)
C_T^n
\int_{0<s_1<\cdots<s_n<T}
ds_1\cdots ds_n.
\end{aligned}
$$

simplex の体積は

$$
\frac{T^n}{n!}
$$

なので

$$
D_{n+1}(T)
\le
D_1(T)
\frac{(C_TT)^n}{n!}.
$$
<!-- proof-end -->

factorial が出るため

$$
\sum_{n=0}^{\infty}
\sqrt{D_{n+1}(T)}
<
\infty.
$$

これが Picard sequence の一様収束を保証する核心です。

---

## 7. global Lipschitz なら strong solution が一意に存在する

<a id="thm-sto9-global-existence-uniqueness"></a>

<!-- formal-statement-start -->
> **定理（global Lipschitz SDE の strong existence・pathwise uniqueness）**  
> $\xi$ を $E|\xi|^2<\infty$ を満たす $\mathcal F_0$-可測 $\mathbb R^d$-値確率変数、$W$ を $m$ 次元 Brown 運動とし、$W$ は joint filtration $(\mathcal F_t^{\xi,W})$ に関して Brown 運動であるとする。
>
> $b:\mathbb R^d\to\mathbb R^d$、$\sigma:\mathbb R^d\to\mathbb R^{d\times m}$ が global Lipschitz であるとする。
>
> このとき
>
$$
dX_t=b(X_t)\,dt+\sigma(X_t)\,dW_t,
\qquad
X_0=\xi
$$
>
> は全ての有限時間区間上で strong solution を持ち、その solution は pathwise unique である。
>
> さらに任意の $T<\infty$ について
>
$$
E\left[
\sup_{0\le t\le T}|X_t|^2
\right]
<
\infty.
$$
<!-- formal-statement-end -->

### 証明の見取り図

存在は Picard sequence の差の総和を使います。

$$
X^{(n)}
=
X^{(0)}
+
\sum_{k=0}^{n-1}
\left(
X^{(k+1)}-X^{(k)}
\right)
$$

なので、差の supremum norm が almost surely 可算和可能なら uniform limit ができます。

一意性は二つの解の差に対して Picard estimate と同じ計算を行い、[積分形 Gronwall lemma](#lem-sto9-gronwall) を使います。

<!-- proof-start -->
### 証明

固定した $T<\infty$ を取ります。

#### Step 1：Picard sequence が finite second moment を持つ

global Lipschitz から linear growth

$$
|b(x)|^2+\|\sigma(x)\|_{\mathrm F}^2
\le
K(1+|x|^2)
$$

を得ます。

$X^{(0)}_t=\xi$ なので

$$
E\sup_{t\le T}|X_t^{(0)}|^2
=
E|\xi|^2
<
\infty.
$$

$X^{(n)}$ が有限 second moment を持つとすると、定義式、Cauchy--Schwarz、Doob $L^2$ inequality から

$$
E\sup_{t\le T}|X_t^{(n+1)}|^2
<\infty.
$$

従って帰納法で全ての Picard iterate が well-defined です。

#### Step 2：差の可算和が収束する

前補題から

$$
D_{n+1}(T)
\le
D_1(T)
\frac{(C_TT)^n}{n!}.
$$

Cauchy--Schwarz により

$$
E
\sup_{t\le T}
|X_t^{(n+1)}-X_t^{(n)}|
\le
\sqrt{D_{n+1}(T)}.
$$

従って

$$
\sum_{n=0}^{\infty}
E
\sup_{t\le T}
|X_t^{(n+1)}-X_t^{(n)}|
<
\infty.
$$

Tonelli の定理を非負級数へ使うと

$$
E\left[
\sum_{n=0}^{\infty}
\sup_{t\le T}
|X_t^{(n+1)}-X_t^{(n)}|
\right]
<
\infty.
$$

よって

$$
\sum_{n=0}^{\infty}
\sup_{t\le T}
|X_t^{(n+1)}-X_t^{(n)}|
<
\infty
$$

almost surely です。

したがって $X^{(n)}$ は $[0,T]$ 上 almost surely 一様収束し、その極限を $X$ と書けば $X$ は continuous です。

各固定 $t$ で $X_t^{(n)}$ は $\mathcal F_t^{\xi,W}$-可測なので、極限 $X_t$ も $\mathcal F_t^{\xi,W}$-可測です。

さらに $m>n$ に対し Minkowski inequality を使うと

$$
\left\|
\sup_{t\le T}|X_t^{(m)}-X_t^{(n)}|
\right\|_{L^2}
\le
\sum_{k=n}^{m-1}
\sqrt{D_{k+1}(T)}.
$$

右辺は $n,m\to\infty$ で $0$ へ行きます。さらに $m\to\infty$ で $X^{(m)}\to X$ almost surely uniformly なので、[Fatou の補題](../F0_00D2B_単調収束_Fatou_優収束/index.md#lem-f0-00d2b-01) から

$$
\left\|
\sup_{t\le T}|X_t-X_t^{(n)}|
\right\|_{L^2}
\le
\sum_{k=n}^{\infty}
\sqrt{D_{k+1}(T)}
\to0.
$$

従って Picard sequence は $X$ へ $L^2$ supremum の意味でも収束します。

#### Step 3：極限は積分表示を満たす

従って $X^{(n)}\to X$ は $L^2$ supremum の意味でも収束します。

Lipschitz estimate より

$$
E\int_0^T
|b(X_s^{(n)})-b(X_s)|^2\,ds
\le
L^2T
E\sup_{s\le T}|X_s^{(n)}-X_s|^2
\to0.
$$

従って drift integrals は $L^2$ supremum で収束します。

同様に Itô isometry と Doob inequality から

$$
E\sup_{t\le T}
\left|
\int_0^t
\{\sigma(X_s^{(n)})-\sigma(X_s)\}\,dW_s
\right|^2
\to0.
$$

Picard equation

$$
X_t^{(n+1)}
=
\xi
+
\int_0^t b(X_s^{(n)})\,ds
+
\int_0^t \sigma(X_s^{(n)})\,dW_s
$$

で $n\to\infty$ とすると

$$
X_t
=
\xi
+
\int_0^t b(X_s)\,ds
+
\int_0^t \sigma(X_s)\,dW_s.
$$

従って $X$ は strong solution です。

#### Step 4：pathwise uniqueness

同じ $W,\xi$ で二つの solutions $X,Y$ を取ります。

$$
X_t-Y_t
=
\int_0^t
\{b(X_s)-b(Y_s)\}\,ds
+
\int_0^t
\{\sigma(X_s)-\sigma(Y_s)\}\,dW_s.
$$

Picard estimate と同じ計算から

$$
f(t)
:=
E\sup_{u\le t}|X_u-Y_u|^2
\le
C_T\int_0^t f(s)\,ds.
$$

[積分形 Gronwall lemma](#lem-sto9-gronwall) の $a=0$ の場合から

$$
f(t)=0.
$$

従って

$$
P\left(
X_t=Y_t
\text{ for all }0\le t\le T
\right)=1.
$$

$T=1,2,\ldots$ の可算共通部分を取れば、全 $t\ge0$ について indistinguishable です。

以上で strong existence と pathwise uniqueness が示されました。
<!-- proof-end -->

global Lipschitz はかなり強い仮定ですが、まずここで「SDE の解が本当に Picard の固定点として作れる」ことを閉じるのが重要です。

---

## 8. 解そのものの大きさも有限時間では制御できる

<a id="prop-sto9-moment-estimate"></a>

<!-- formal-statement-start -->
> **命題（finite-horizon L2 supremum moment estimate）**  
> 前定理の仮定の下で、各 $T<\infty$ に対して $C_T<\infty$ が存在し
>
$$
E\left[
\sup_{0\le t\le T}|X_t|^2
\right]
\le
C_T
\left(
1+E|\xi|^2
\right)
$$
>
> が成り立つ。
<!-- formal-statement-end -->

### 証明の見取り図

積分表示を

$$
\xi+\text{drift}+\text{martingale}
$$

の三つに分け、linear growth を入れます。

最後に Gronwall lemma で閉じます。

<!-- proof-start -->
### 証明

linear growth 定数 $K$ を

$$
|b(x)|^2+\|\sigma(x)\|_{\mathrm F}^2
\le
K(1+|x|^2)
$$

と取ります。

$(a+b+c)^2\le3(a^2+b^2+c^2)$ から

$$
\begin{aligned}
E\sup_{u\le t}|X_u|^2
&\le
3E|\xi|^2\\
&\quad+
3E\sup_{u\le t}
\left|
\int_0^u b(X_s)\,ds
\right|^2\\
&\quad+
3E\sup_{u\le t}
\left|
\int_0^u \sigma(X_s)\,dW_s
\right|^2.
\end{aligned}
$$

drift part は

$$
\begin{aligned}
E\sup_{u\le t}
\left|
\int_0^u b(X_s)\,ds
\right|^2
&\le
tE\int_0^t|b(X_s)|^2\,ds\\
&\le
TK\int_0^t
\left(
1+
E\sup_{r\le s}|X_r|^2
\right)ds.
\end{aligned}
$$

martingale part は [Doob $L^2$ inequality](../STO6/index.md#thm-sto6-doob-l2) と [Itô isometry](../STO6/index.md#thm-sto6-ito-isometry-simple) から

$$
\begin{aligned}
E\sup_{u\le t}
\left|
\int_0^u \sigma(X_s)\,dW_s
\right|^2
&\le
4E\int_0^t\|\sigma(X_s)\|_{\mathrm F}^2\,ds\\
&\le
4K\int_0^t
\left(
1+
E\sup_{r\le s}|X_r|^2
\right)ds.
\end{aligned}
$$

従って

$$
F(t)
:=
E\sup_{u\le t}|X_u|^2
$$

は

$$
F(t)
\le
3E|\xi|^2
+
C_T
\int_0^t
\{1+F(s)\}\,ds
$$

を満たします。

$G(t)=1+F(t)$ と置けば

$$
G(t)
\le
1+3E|\xi|^2
+
C_T\int_0^tG(s)\,ds.
$$

[積分形 Gronwall lemma](#lem-sto9-gronwall) から

$$
G(T)
\le
\left(
1+3E|\xi|^2
\right)e^{C_TT}.
$$

定数をまとめれば

$$
E\sup_{t\le T}|X_t|^2
\le
C_T'(1+E|\xi|^2).
$$
<!-- proof-end -->

この estimate は後の localization で重要です。

存在一意性の proof tool であるだけでなく、「有限時間で解がどれほど遠くへ行けるか」を確率的に制御します。

---

## 9. 初期値や係数を少し変えたときの安定性

SDE をモデルとして使うなら、一意性だけでは足りません。

入力を少し変えたときに解が大きく飛ばないことも必要です。

<a id="thm-sto9-stability"></a>

<!-- formal-statement-start -->
> **定理（初期値・係数に対する stability estimate）**  
> $(b,\sigma)$ と $(\widetilde b,\widetilde\sigma)$ は共通の定数 $L$ で global Lipschitz とする。
>
> 同じ Brown 運動 $W$ 上で
>
$$
\begin{aligned}
dX_t&=b(X_t)\,dt+\sigma(X_t)\,dW_t,
&X_0&=\xi,\\
dY_t&=\widetilde b(Y_t)\,dt+\widetilde\sigma(Y_t)\,dW_t,
&Y_0&=\eta
\end{aligned}
$$
>
> とする。
>
> さらに
>
$$
\delta^2
:=
\sup_{x\in\mathbb R^d}
\left(
|b(x)-\widetilde b(x)|^2
+
\|\sigma(x)-\widetilde\sigma(x)\|_{\mathrm F}^2
\right)
<
\infty
$$
>
> とする。
>
> このとき各 $T<\infty$ に対して $C_T<\infty$ が存在し
>
$$
E\left[
\sup_{0\le t\le T}|X_t-Y_t|^2
\right]
\le
C_T
\left(
E|\xi-\eta|^2+\delta^2
\right).
$$
<!-- formal-statement-end -->

### 証明の見取り図

係数差を

$$
b(X)-\widetilde b(Y)
=
\{b(X)-b(Y)\}
+
\{b(Y)-\widetilde b(Y)\}
$$

と分けます。

第一項は Lipschitz、第二項は $\delta$ で制御できます。

<!-- proof-start -->
### 証明

$$
Z_t=X_t-Y_t
$$

と置きます。

すると

$$
\begin{aligned}
Z_t
&=
\xi-\eta\\
&\quad+
\int_0^t
\{b(X_s)-\widetilde b(Y_s)\}\,ds\\
&\quad+
\int_0^t
\{\sigma(X_s)-\widetilde\sigma(Y_s)\}\,dW_s.
\end{aligned}
$$

drift difference は

$$
\begin{aligned}
|b(X_s)-\widetilde b(Y_s)|
&\le
|b(X_s)-b(Y_s)|
+
|b(Y_s)-\widetilde b(Y_s)|\\
&\le
L|Z_s|+\delta.
\end{aligned}
$$

同様に

$$
\|\sigma(X_s)-\widetilde\sigma(Y_s)\|_{\mathrm F}
\le
L|Z_s|+\delta.
$$

前節と同じ Cauchy--Schwarz + Doob $L^2$ estimate から

$$
F(t)
:=
E\sup_{u\le t}|Z_u|^2
$$

は

$$
F(t)
\le
C
E|\xi-\eta|^2
+
C_T\delta^2
+
C_T\int_0^tF(s)\,ds
$$

を満たします。

[積分形 Gronwall lemma](#lem-sto9-gronwall) から

$$
F(T)
\le
C_T'
\left(
E|\xi-\eta|^2+\delta^2
\right).
$$
<!-- proof-end -->

$\delta=0$ とすれば initial data に対する安定性です。

逆に $\xi=\eta$ とすれば coefficients の近似に対する安定性になります。

これは数値 SDE、近似モデル、parameter perturbation の基礎 estimate です。

---

## 10. global Lipschitz を捨てると何が起きるか

現実の nonlinear SDE では global Lipschitz は強すぎることがあります。

そこで条件を局所化します。

**local Lipschitz** とは、任意の $R>0$ に対して $L_R<\infty$ が存在し、

$$
|x|,|y|\le R
$$

なら

$$
|b(x)-b(y)|
+
\|\sigma(x)-\sigma(y)\|_{\mathrm F}
\le
L_R|x-y|
$$

となることです。

球の中では uniqueness を守れます。

しかし無限遠まで同じ定数で制御できないため、solution が finite time に無限遠へ逃げる可能性が残ります。

---

## 11. 局所解をどこまで延長できるか

<a id="def-sto9-maximal-solution"></a>

<!-- formal-statement-start -->
> **定義（maximal strong solution・explosion time）**  
> $b,\sigma$ を local Lipschitz とし、初期状態 $x\in\mathbb R^d$ を固定する。
>
> stopping time $\tau_{\mathrm e}\in(0,\infty]$ と continuous adapted process
>
$$
X=(X_t)_{0\le t<\tau_{\mathrm e}}
$$
>
> の組が **maximal strong solution** であるとは、任意の整数 $n>|x|$ に対し
>
$$
\tau_n
=
\inf\{t\ge0:|X_t|\ge n\}
$$
>
> と置くと
>
$$
\tau_n\uparrow\tau_{\mathrm e},
$$
>
> 各 $t<\tau_{\mathrm e}$ で
>
$$
X_t
=
x
+
\int_0^t b(X_s)\,ds
+
\int_0^t\sigma(X_s)\,dW_s
$$
>
> が成り立ち、さらに
>
$$
\{\tau_{\mathrm e}<\infty\}
\subset
\left\{
\limsup_{t\uparrow\tau_{\mathrm e}}|X_t|=\infty
\right\}
$$
>
> が成り立つことをいう。
>
> $\tau_{\mathrm e}$ を **explosion time** という。
>
> また
>
$$
P(\tau_{\mathrm e}=\infty)=1
$$
>
> のとき、この maximal strong solution は **non-explosive** であるという。
<!-- formal-statement-end -->

<!-- definition-example-start: def-sto9-maximal-solution -->
### 直接例：deterministic equation も SDE の特殊例で、実際に爆発する

1 次元で

$$
dX_t=X_t^2\,dt,
\qquad
X_0=1,
\qquad
\sigma\equiv0
$$

を考えます。

これは通常の微分方程式

$$
\frac{dX_t}{dt}=X_t^2
$$

であり、

$$
-\frac1{X_t}=t+C.
$$

$X_0=1$ から $C=-1$ なので

$$
X_t=\frac1{1-t},
\qquad
0\le t<1.
$$

従って

$$
\tau_{\mathrm e}=1,
\qquad
X_t\to\infty
\quad(t\uparrow1).
$$

係数 $b(x)=x^2$ は各 bounded interval では Lipschitz ですが global Lipschitz ではありません。

ここで失われたのは「局所的な uniqueness」ではなく、**無限遠へ逃げないための global control** です。
<!-- definition-example-end -->

---

## 12. cutoff した global problem を貼り合わせる

半径 $n$ の閉球への metric projection を

$$
\pi_n(x)
=
\begin{cases}
x,&|x|\le n,\\
n\dfrac{x}{|x|},&|x|>n
\end{cases}
$$

とします。

$\pi_n$ は $1$-Lipschitz です。

そこで

$$
b_n(x)=b(\pi_n(x)),
\qquad
\sigma_n(x)=\sigma(\pi_n(x))
$$

と置きます。

$b,\sigma$ が local Lipschitz なら、ball $|x|\le n$ 上の Lipschitz 定数 $L_n$ を使って

$$
|b_n(x)-b_n(y)|
+
\|\sigma_n(x)-\sigma_n(y)\|_{\mathrm F}
\le
L_n|x-y|.
$$

従って $(b_n,\sigma_n)$ は global Lipschitz です。

各 $n$ について前定理から global strong solution $X^{(n)}$ が存在します。

<a id="thm-sto9-local-maximal-solution"></a>

<!-- formal-statement-start -->
> **定理（local Lipschitz SDE の maximal strong solution）**  
> $b:\mathbb R^d\to\mathbb R^d$、$\sigma:\mathbb R^d\to\mathbb R^{d\times m}$ が local Lipschitz であり、初期状態 $x\in\mathbb R^d$ を固定する。
>
> このとき SDE
>
$$
dX_t=b(X_t)\,dt+\sigma(X_t)\,dW_t,
\qquad
X_0=x
$$
>
> は maximal strong solution $(X,\tau_{\mathrm e})$ を持つ。
>
> また explosion 前の pathwise uniqueness が成り立つ。すなわち二つの maximal solutions $X,Y$ が同じ $W,x$ で駆動されるなら
>
$$
X_t=Y_t
$$
>
> が全ての
>
$$
t<\tau_{\mathrm e}^X\wedge\tau_{\mathrm e}^Y
$$
>
> について almost surely 成り立つ。
<!-- formal-statement-end -->

### 証明の見取り図

1. cutoff coefficients $(b_n,\sigma_n)$ の global solution $X^{(n)}$ を作る。
2. ball $n$ を出るまでは $b_n=b_m=b$ なので $X^{(n)}$ と $X^{(m)}$ は一致する。
3. exit times を増大列にして、その前まで process を貼り合わせる。
4. 有限 explosion time まで解の値が bounded なら、もっと大きい cutoff solution で延長できて maximality に反する。

<!-- proof-start -->
### 証明

整数 $n_0>|x|$ を一つ固定し、以下 $n\ge n_0$ とします。

各 $n$ について

$$
dX_t^{(n)}
=
b_n(X_t^{(n)})\,dt
+
\sigma_n(X_t^{(n)})\,dW_t,
\qquad
X_0^{(n)}=x
$$

の unique global strong solution を取ります。

$X^{(n)}$ の ball $n$ からの exit time を

$$
\tau_n^{(n)}
=
\inf\{t\ge0:|X_t^{(n)}|\ge n\}
$$

とします。

$m>n$ を取ります。

両 process が ball $n$ の中にいる間は

$$
b_n=b_m=b,
\qquad
\sigma_n=\sigma_m=\sigma.
$$

そこで

$$
\rho
=
\inf\{
t\ge0:
|X_t^{(n)}|\ge n
\text{ or }
|X_t^{(m)}|\ge n
\}
$$

まで両方を止めます。

$[0,\rho]$ 上では同じ initial value、同じ Brownian motion、同じ coefficients の SDE なので、global Lipschitz theorem の uniqueness estimate を停止した equation へ適用して

$$
X_{t\wedge\rho}^{(n)}
=
X_{t\wedge\rho}^{(m)}
$$

almost surely です。

従って両者の ball $n$ からの exit time は一致します。

この共通値を $\tau_n$ と書けます。

さらに $n<m$ なら

$$
\tau_n\le\tau_m
$$

です。

実際 $\tau_n$ までは $X^{(m)}=X^{(n)}$ であり、$\tau_n$ で norm は $n<m$ なので、$X^{(m)}$ が ball $m$ を出るのはそれ以後です。

よって

$$
\tau_{\mathrm e}
=
\lim_{n\to\infty}\tau_n
$$

を定義できます。

$t<\tau_{\mathrm e}$ なら十分大きい $n$ で $t<\tau_n$ なので

$$
X_t
=
X_t^{(n)}
$$

と置きます。

consistency によりこの定義は $n$ の選び方に依存しません。

各 compact time interval $[0,T]\subset[0,\tau_{\mathrm e})$ ではある $n$ が存在して

$$
X_t=X_t^{(n)}
\qquad
(0\le t\le T),
$$

したがって $X$ は continuous adapted で、元の coefficients $b,\sigma$ に対する積分表示を満たします。

もし $\tau_{\mathrm e}<\infty$ なのに

$$
\limsup_{t\uparrow\tau_{\mathrm e}}|X_t|
<
\infty
$$

なら、ある $R<\infty$ が存在して explosion 直前まで $|X_t|\le R$ です。

$n>R+1$ を取れば $\tau_n>\tau_{\mathrm e}$ となってしまい

$$
\tau_{\mathrm e}
=
\sup_n\tau_n
$$

に反します。

従って有限 explosion time では

$$
\limsup_{t\uparrow\tau_{\mathrm e}}|X_t|=\infty.
$$

最後に二つの maximal solutions $X,Y$ を取ります。

任意の $n$ について

$$
\rho_n
=
\inf\{t:|X_t|\ge n\text{ or }|Y_t|\ge n\}
$$

まで止めれば coefficients は ball $n$ 上で Lipschitz です。

global uniqueness と同じ estimate から

$$
X_{t\wedge\rho_n}=Y_{t\wedge\rho_n}.
$$

$n\uparrow\infty$ とすれば explosion 前の pathwise uniqueness を得ます。
<!-- proof-end -->

ここで localization の役割がはっきりします。

$$
\boxed{
\text{局所問題}
\overset{\text{cutoff}}{\longrightarrow}
\text{global Lipschitz 問題}
\overset{\text{stop before cutoff}}{\longrightarrow}
\text{元の問題}
}
$$

です。

---

## 13. linear growth があれば explosion は起きない

local Lipschitz だけでは $dX=X^2dt$ のように爆発しました。

次の条件を追加します。

$$
|b(x)|^2+\|\sigma(x)\|_{\mathrm F}^2
\le
K(1+|x|^2).
$$

<a id="thm-sto9-linear-growth-nonexplosion"></a>

<!-- formal-statement-start -->
> **定理（linear growth による non-explosion）**  
> $b,\sigma$ が local Lipschitz で、ある $K<\infty$ に対して
>
$$
|b(x)|^2+\|\sigma(x)\|_{\mathrm F}^2
\le
K(1+|x|^2)
$$
>
> が全ての $x$ で成り立つとする。
>
> 初期状態 $x\in\mathbb R^d$ から出発する maximal strong solution の explosion time $\tau_{\mathrm e}$ は
>
$$
P(\tau_{\mathrm e}=\infty)=1
$$
>
> を満たす。
<!-- formal-statement-end -->

### 証明の見取り図

exit time $\tau_n$ まで止めれば、解は bounded domain にいるため全ての計算を安全にできます。

重要なのは、moment estimate の定数を $n$ に依存させないことです。

linear growth は元 coefficients 自体の global bound なので、停止後の estimate は全て同じ $K$ で閉じます。

<!-- proof-start -->
### 証明

maximal solution $X$ と、整数 $n>|x|$ に対する exit times

$$
\tau_n
=
\inf\{t\ge0:|X_t|\ge n\}
$$

を取ります。

固定 $T<\infty$ について stopped process

$$
X_{t\wedge\tau_n}
$$

を考えます。

積分表示は

$$
X_{t\wedge\tau_n}
=
x
+
\int_0^{t\wedge\tau_n}b(X_s)\,ds
+
\int_0^{t\wedge\tau_n}\sigma(X_s)\,dW_s.
$$

前の moment estimate と全く同じ計算をすると、linear growth 定数が $n$ に依存しないため

$$
E\left[
\sup_{0\le t\le T}
|X_{t\wedge\tau_n}|^2
\right]
\le
C_T(1+|x|^2)
$$

を得ます。

$\tau_n\le T$ なら continuity から

$$
|X_{\tau_n}|=n.
$$

従って

$$
n^2
1_{\{\tau_n\le T\}}
\le
\sup_{0\le t\le T}
|X_{t\wedge\tau_n}|^2.
$$

期待値を取ると

$$
P(\tau_n\le T)
\le
\frac{
C_T(1+|x|^2)
}{n^2}.
$$

$n\to\infty$ で右辺は $0$ へ行きます。

$\tau_n\uparrow\tau_{\mathrm e}$ なので、任意の $n>|x|$ について

$$
\{\tau_{\mathrm e}\le T\}
\subset
\{\tau_n\le T\}.
$$

したがって

$$
P(\tau_{\mathrm e}\le T)
\le
P(\tau_n\le T)
\le
\frac{C_T(1+|x|^2)}{n^2}.
$$

$n\to\infty$ とすれば

$$
P(\tau_{\mathrm e}\le T)=0.
$$

$T=1,2,\ldots$ について可算和を取れば

$$
P(\tau_{\mathrm e}<\infty)=0.
$$
<!-- proof-end -->

global Lipschitz は non-explosion の十分条件ですが必要条件ではありません。

次の節では、係数の大きさが superlinear でも「外向きに押していない」なら爆発を防げることを見ます。

---

## 14. Lyapunov function で無限遠への逃走を止める

global linear growth は便利ですが、例えば

$$
b(x)=-x^3
$$

は満たしません。

それでも drift は大きな $|x|$ で原点方向を向いています。

この幾何を関数 $V$ で測ります。

<a id="thm-sto9-lyapunov-nonexplosion"></a>

<!-- formal-statement-start -->
> **定理（Lyapunov 型 non-explosion criterion）**  
> $b,\sigma$ は local Lipschitz とし、初期状態 $x_0\in\mathbb R^d$ から出発する $(X,\tau_{\mathrm e})$ を maximal strong solution とする。
>
> $V\in C^2(\mathbb R^d;[0,\infty))$ が
>
$$
V(x)\to\infty
\qquad
(|x|\to\infty)
$$
>
> を満たし、ある $C<\infty$ に対して全ての $x$ で
>
$$
\nabla V(x)\cdot b(x)
+
\frac12
\operatorname{tr}
\left(
\sigma(x)\sigma(x)^{\mathsf T}
D^2V(x)
\right)
\le
C\{1+V(x)\}
$$
>
> とする。
>
> このとき
>
$$
P(\tau_{\mathrm e}=\infty)=1.
$$
<!-- formal-statement-end -->

この theorem は STO11 の generator を先取りせず、Itô formula に現れる drift combination をそのまま書いています。

### 証明の見取り図

$V(X_{t\wedge\tau_n})$ に Itô formula を使います。

stochastic integral の期待値を $0$ にして drift inequality を入れると

$$
E[V(X_{t\wedge\tau_n})]
\le
V(x_0)
+
C\int_0^t
\{1+E[V(X_{s\wedge\tau_n})]\}\,ds.
$$

一方、$\tau_n\le T$ なら $X_{\tau_n}$ は sphere $|x|=n$ 上にいるため、$V(x)\to\infty$ という無限遠での発散性によって $V$ は大きくなります。

<!-- proof-start -->
### 証明

整数 $n>|x_0|$ に対して

$$
\tau_n
=
\inf\{t\ge0:|X_t|\ge n\}
$$

とします。

[Itô process 版の時間依存 Itô formula](../STO7/index.md#thm-sto7-ito-process-formula)
を時間に依存しない $V$ へ適用すると

$$
\begin{aligned}
V(X_{t\wedge\tau_n})
&=
V(x_0)\\
&\quad+
\int_0^{t\wedge\tau_n}
\nabla V(X_s)\cdot b(X_s)\,ds\\
&\quad+
\frac12
\int_0^{t\wedge\tau_n}
\operatorname{tr}
\left(
\sigma(X_s)\sigma(X_s)^{\mathsf T}
D^2V(X_s)
\right)ds\\
&\quad+
\int_0^{t\wedge\tau_n}
\nabla V(X_s)^{\mathsf T}\sigma(X_s)\,dW_s.
\end{aligned}
$$

停止前は $|X_s|\le n$ です。$\nabla V$、$\sigma$ は compact ball 上で bounded なので、停止した stochastic integrand は $[0,T]$ 上 square-integrable です。

従って stochastic integral の期待値は $0$ です。

仮定を入れると

$$
E[V(X_{t\wedge\tau_n})]
\le
V(x_0)
+
C
E\int_0^{t\wedge\tau_n}
\{1+V(X_s)\}\,ds.
$$

$V\ge0$ なので

$$
E[V(X_{t\wedge\tau_n})]
\le
V(x_0)
+
C
\int_0^t
\{1+E[V(X_{s\wedge\tau_n})]\}\,ds.
$$

[積分形 Gronwall lemma](#lem-sto9-gronwall) から

$$
\sup_n
\sup_{0\le t\le T}
E[V(X_{t\wedge\tau_n})]
\le
C_T
\{1+V(x_0)\}.
$$

次に

$$
a_n
=
\inf_{|x|=n}V(x)
$$

と置きます。

$V(x)\to\infty$ as $|x|\to\infty$ なので

$$
a_n\to\infty.
$$

$\tau_n\le T$ なら $|X_{\tau_n}|=n$ なので

$$
V(X_{\tau_n})\ge a_n.
$$

従って

$$
a_nP(\tau_n\le T)
\le
E[V(X_{T\wedge\tau_n})]
\le
C_T\{1+V(x_0)\}.
$$

よって

$$
P(\tau_n\le T)
\le
\frac{C_T\{1+V(x_0)\}}{a_n}
\to0.
$$

linear-growth theorem と同じく $\tau_n\uparrow\tau_{\mathrm e}$ から

$$
P(\tau_{\mathrm e}\le T)=0.
$$

任意の整数 $T$ について成り立つので

$$
P(\tau_{\mathrm e}=\infty)=1.
$$
<!-- proof-end -->

### 直接例：$dX_t=-X_t^3dt+dW_t$ は爆発しない

$$
dX_t=-X_t^3\,dt+dW_t
$$

を考えます。

$b(x)=-x^3$ は global linear growth ではありません。

しかし

$$
V(x)=x^2
$$

とすると

$$
V'(x)=2x,
\qquad
V''(x)=2.
$$

Itô drift combination は

$$
V'(x)b(x)
+
\frac12V''(x)
=
2x(-x^3)+1
=
1-2x^4.
$$

従って

$$
1-2x^4
\le
1
\le
1+V(x).
$$

また

$$
V(x)\to\infty
\qquad
(|x|\to\infty).
$$

よって Lyapunov criterion から solution は non-explosive です。

superlinear という見た目だけでは explosion は決まりません。

**大きな $|x|$ でどちら向きに押すか** が重要です。

---

## 15. 一次元では順序も保存できる

最後に pathwise uniqueness より少し強い「順序の保存」を見ます。

ここでは local time theory を逆輸入せず、positive part の smooth approximation と Itô formula だけで証明します。

<a id="thm-sto9-comparison"></a>

<!-- formal-statement-start -->
> **定理（一次元 SDE の comparison theorem）**  
> $b_1,b_2,\sigma:\mathbb R\to\mathbb R$ は global Lipschitz とし、
>
$$
b_1(x)\le b_2(x)
\qquad
(\forall x\in\mathbb R)
$$
>
> とする。
>
> 同じ 1 次元 Brown 運動 $W$ 上で
>
$$
\begin{aligned}
dX_t&=b_1(X_t)\,dt+\sigma(X_t)\,dW_t,\\
dY_t&=b_2(Y_t)\,dt+\sigma(Y_t)\,dW_t
\end{aligned}
$$
>
> を考え、初期値が
>
$$
E|X_0|^2+E|Y_0|^2<\infty,
\qquad
X_0\le Y_0
$$
>
> almost surely を満たすとする。
>
> このとき
>
$$
P\left(
X_t\le Y_t
\text{ for all }t\ge0
\right)=1.
$$
<!-- formal-statement-end -->

同じ diffusion coefficient を要求している点が重要です。

noise の振幅自体が別なら、drift の順序だけから標本関数の順序は一般には出ません。

### smooth positive part

非負 $C^\infty$ function $\psi$ を

$$
\operatorname{supp}\psi\subset(0,1),
\qquad
\int_0^1\psi(r)\,dr=1
$$

となるよう一つ固定します。

$$
q_\varepsilon(x)
=
\int_{-\infty}^{x/\varepsilon}\psi(r)\,dr
$$

とし、

$$
\phi_\varepsilon(x)
=
\int_0^x q_\varepsilon(y)\,dy
$$

と置きます。

すると

$$
0\le\phi_\varepsilon'(x)\le1,
$$

$$
\phi_\varepsilon''(x)
=
\frac1\varepsilon
\psi(x/\varepsilon),
$$

したがって $\phi_\varepsilon''$ は $(0,\varepsilon)$ にだけ支えられます。

さらに定数

$$
c_\psi
=
\int_0^1(1-q_1(r))\,dr
$$

を使えば $x\ge\varepsilon$ で

$$
\phi_\varepsilon(x)=x-\varepsilon c_\psi
$$

なので

$$
0\le x^+-\phi_\varepsilon(x)\le\varepsilon.
$$

### 証明の見取り図

$Z=X-Y$ と置いて $\phi_\varepsilon(Z_t)$ に Itô formula を使います。

- drift term は $Z>0$ のときだけ問題になり、drift order と Lipschitz から $LZ^+$ で抑えられる。
- quadratic variation term は $0<Z<\varepsilon$ の狭い領域だけで現れ、Lipschitz diffusion によって $O(\varepsilon)$ へ落ちる。
- $\varepsilon\downarrow0$ で $E[Z_t^+]$ の Gronwall inequality が残る。

<!-- proof-start -->
### 証明

$$
Z_t=X_t-Y_t
$$

と置きます。

すると

$$
dZ_t
=
\{b_1(X_t)-b_2(Y_t)\}\,dt
+
\{\sigma(X_t)-\sigma(Y_t)\}\,dW_t.
$$

Itô formula から

$$
\begin{aligned}
\phi_\varepsilon(Z_t)
&=
\phi_\varepsilon(Z_0)\\
&\quad+
\int_0^t
\phi_\varepsilon'(Z_s)
\{b_1(X_s)-b_2(Y_s)\}\,ds\\
&\quad+
\int_0^t
\phi_\varepsilon'(Z_s)
\{\sigma(X_s)-\sigma(Y_s)\}\,dW_s\\
&\quad+
\frac12
\int_0^t
\phi_\varepsilon''(Z_s)
|\sigma(X_s)-\sigma(Y_s)|^2\,ds.
\end{aligned}
$$

初期値の順序から $Z_0\le0$ なので

$$
\phi_\varepsilon(Z_0)=0.
$$

#### Step 1：drift term

$\phi_\varepsilon'(z)=0$ for $z\le0$ です。

$Z_s>0$ のとき $X_s>Y_s$ で、

$$
\begin{aligned}
b_1(X_s)-b_2(Y_s)
&=
\{b_1(X_s)-b_2(X_s)\}\\
&\quad+
\{b_2(X_s)-b_2(Y_s)\}\\
&\le
L(X_s-Y_s)\\
&=
LZ_s.
\end{aligned}
$$

従って

$$
\phi_\varepsilon'(Z_s)
\{b_1(X_s)-b_2(Y_s)\}
\le
LZ_s^+.
$$

#### Step 2：second-order term

$\sigma$ の Lipschitz 定数も $L$ と書きます。

$$
|\sigma(X_s)-\sigma(Y_s)|
\le
L|Z_s|.
$$

また $\phi_\varepsilon''$ は $0<Z_s<\varepsilon$ でしか非零でなく、

$$
\phi_\varepsilon''(Z_s)
\le
\frac{\|\psi\|_\infty}{\varepsilon}.
$$

従って

$$
\begin{aligned}
\frac12
\phi_\varepsilon''(Z_s)
|\sigma(X_s)-\sigma(Y_s)|^2
&\le
\frac{L^2\|\psi\|_\infty}{2\varepsilon}
Z_s^2
1_{\{0<Z_s<\varepsilon\}}\\
&\le
\frac12
L^2\|\psi\|_\infty
\varepsilon.
\end{aligned}
$$

#### Step 3：期待値を取る

global Lipschitz solution は finite-horizon second moment estimate を持つので、stochastic integral は localization を外した後も mean zero です。

従って

$$
E[\phi_\varepsilon(Z_t)]
\le
L\int_0^tE[Z_s^+]\,ds
+
C\varepsilon t.
$$

一方

$$
0\le
Z_t^+-\phi_\varepsilon(Z_t)
\le
\varepsilon
$$

なので

$$
E[Z_t^+]
\le
\varepsilon
+
L\int_0^tE[Z_s^+]\,ds
+
C\varepsilon t.
$$

$\varepsilon\downarrow0$ とすると

$$
E[Z_t^+]
\le
L\int_0^tE[Z_s^+]\,ds.
$$

[積分形 Gronwall lemma](#lem-sto9-gronwall) から

$$
E[Z_t^+]=0.
$$

従って各固定 $t$ で

$$
Z_t\le0
$$

almost surely です。

非負の rational times の可算集合で同時に成り立つ event を取り、$X,Y$ の continuity を使えば全ての $t\ge0$ で

$$
X_t\le Y_t
$$

となります。
<!-- proof-end -->

### 直接例：同じ additive noise なら drift の差が順序を保つ

$$
\begin{aligned}
dX_t&=-X_t\,dt+dW_t,\\
dY_t&=(1-Y_t)\,dt+dW_t
\end{aligned}
$$

を同じ Brown 運動で駆動し、$X_0\le Y_0$ とします。

$$
b_1(x)=-x,
\qquad
b_2(x)=1-x,
$$

なので

$$
b_1(x)\le b_2(x)
$$

です。

comparison theorem から

$$
X_t\le Y_t
\qquad
(\forall t\ge0)
$$

almost surely です。

実際、差 $D_t=Y_t-X_t$ は noise が消えて

$$
dD_t=(1-D_t)\,dt
$$

となり、

$$
D_t
=
1+(D_0-1)e^{-t}
\ge0
$$

も直接確認できます。

---

## 16. 仮定を外すとどこが壊れるか

### 16.1 Lipschitz を失うと uniqueness が壊れ得る

deterministic special case

$$
dX_t=\sqrt{|X_t|}\,dt,
\qquad
X_0=0
$$

を考えます。

$b(x)=\sqrt{|x|}$ は $0$ で Lipschitz ではありません。

一つの解は

$$
X_t\equiv0.
$$

一方、任意の $c\ge0$ に対して

$$
X_t^{(c)}
=
\begin{cases}
0,&0\le t\le c,\\
\dfrac{(t-c)^2}{4},&t>c
\end{cases}
$$

も解です。

$t>c$ では

$$
\frac{d}{dt}X_t^{(c)}
=
\frac{t-c}{2}
=
\sqrt{X_t^{(c)}}.
$$

$t=c$ でも左右微分は $0$ でつながります。

したがって solution は一意ではありません。

元の uniqueness proof では

$$
|b(x)-b(y)|
\le
L|x-y|
$$

から差を Gronwall estimate へ閉じました。

この inequality が失われたため、差を $0$ に固定する機構が壊れています。

### 16.2 local Lipschitz だけでは global existence は出ない

前の

$$
dX_t=X_t^2dt,
\qquad
X_0=1
$$

では local uniqueness はありますが、$t=1$ で explosion しました。

つまり

$$
\boxed{
\text{local Lipschitz}
\Rightarrow
\text{local uniqueness}
\not\Rightarrow
\text{non-explosion}
}
$$

です。

### 16.3 comparison では同一 diffusion が重要

comparison proof の second-order term は

$$
|\sigma(X)-\sigma(Y)|^2
\le
L^2|X-Y|^2
$$

だから narrow layer $0<X-Y<\varepsilon$ で $O(\varepsilon)$ にできました。

二つの equations が別々の diffusion coefficients を持つと

$$
|\sigma_1(X)-\sigma_2(Y)|
$$

は $X=Y$ でも $0$ とは限りません。

すると second-order term が $\varepsilon^{-1}$ scale で残り、同じ proof mechanism は閉じません。

---

# 17. 演習 A

#### STO9-A01 定数係数 SDE が strong solution であることを確認する
- Level: A
- 目安時間: 15分

$m$ 次元 Brown 運動 $W$、$\mu\in\mathbb R^d$、$\Sigma\in\mathbb R^{d\times m}$、square-integrable $\xi$ に対し

$$
X_t=\xi+\mu t+\Sigma W_t
$$

とする。

1. $X$ が $\mathcal F_t^{\xi,W}$-adapted continuous process であることを確認せよ。
2. $X$ が
   $dX_t=\mu\,dt+\Sigma\,dW_t$
   の strong solution であることを示せ。
3. $E|X_t|^2$ が有限であることを示せ。

<!-- solution-start -->
### 詳細解答

1. $\xi$ は $\mathcal F_0^{\xi,W}$-可測、$W_t$ は $\mathcal F_t^{\xi,W}$-可測です。

従って

$$
X_t=\xi+\mu t+\Sigma W_t
$$

も $\mathcal F_t^{\xi,W}$-可測です。

$\xi$ は時間に依存せず、$t\mapsto\mu t$ と $t\mapsto W_t$ は continuous なので $X$ も continuous です。

2. 定数係数なので

$$
\int_0^t\mu\,ds=\mu t
$$

および

$$
\int_0^t\Sigma\,dW_s=\Sigma W_t.
$$

従って

$$
X_t
=
\xi
+
\int_0^t\mu\,ds
+
\int_0^t\Sigma\,dW_s.
$$

よって strong solution の定義を満たします。

3. $(a+b+c)^2\le3(a^2+b^2+c^2)$ を vector norm に適用すると

$$
E|X_t|^2
\le
3E|\xi|^2
+
3|\mu|^2t^2
+
3E|\Sigma W_t|^2.
$$

$W_t$ の covariance は $tI_m$ なので

$$
E|\Sigma W_t|^2
=
t\operatorname{tr}(\Sigma\Sigma^{\mathsf T})
=
t\|\Sigma\|_{\mathrm F}^2.
$$

従って

$$
E|X_t|^2
\le
3E|\xi|^2
+
3|\mu|^2t^2
+
3t\|\Sigma\|_{\mathrm F}^2
<
\infty.
$$
<!-- solution-end -->

#### STO9-A02 geometric Brownian motion の explicit solution
- Level: A
- 目安時間: 20分

$$
dX_t=\mu X_t\,dt+\alpha X_t\,dW_t,
\qquad
X_0=x
$$

について

$$
X_t
=
x\exp\left\{
\left(\mu-\frac{\alpha^2}{2}\right)t+\alpha W_t
\right\}
$$

が solution であることを Itô formula から示せ。

さらに $x>0$ なら $X_t>0$ for all $t$ almost surely を示せ。

<!-- solution-start -->
### 詳細解答

$$
f(t,w)
=
x\exp\left\{
\left(\mu-\frac{\alpha^2}{2}\right)t+\alpha w
\right\}
$$

と置きます。

微分すると

$$
\partial_t f
=
\left(\mu-\frac{\alpha^2}{2}\right)f,
$$

$$
\partial_w f=\alpha f,
$$

$$
\partial_{ww}f=\alpha^2f.
$$

Itô formula から

$$
\begin{aligned}
df(t,W_t)
&=
\left(
\partial_t f
+
\frac12\partial_{ww}f
\right)dt
+
\partial_wf\,dW_t\\
&=
\left(
\mu-\frac{\alpha^2}{2}
+
\frac{\alpha^2}{2}
\right)f\,dt
+
\alpha f\,dW_t\\
&=
\mu f\,dt+\alpha f\,dW_t.
\end{aligned}
$$

また

$$
f(0,W_0)=f(0,0)=x.
$$

従って $X_t=f(t,W_t)$ は SDE の solution です。

$x>0$ なら exponential factor は常に正なので

$$
X_t>0
$$

が全ての $t$ で成り立ちます。
<!-- solution-end -->

#### STO9-A03 Gronwall による pathwise uniqueness の核心
- Level: A
- 目安時間: 20分

同じ Brown 運動と同じ初期値で駆動される二つの solutions $X,Y$ が

$$
E\sup_{u\le t}|X_u-Y_u|^2
\le
C\int_0^t
E\sup_{r\le s}|X_r-Y_r|^2\,ds
$$

を満たすとする。

この不等式だけから $X,Y$ が indistinguishable であることを示せ。

<!-- solution-start -->
### 詳細解答

$$
f(t)
=
E\sup_{u\le t}|X_u-Y_u|^2
$$

と置きます。

$f(t)\ge0$ で、

$$
f(t)
\le
C\int_0^tf(s)\,ds.
$$

これは [積分形 Gronwall lemma](#lem-sto9-gronwall) で $a=0$ とした場合です。

従って

$$
f(t)=0
$$

for all $t$ です。

特に固定 $T$ に対し

$$
E\sup_{u\le T}|X_u-Y_u|^2=0.
$$

非負確率変数の期待値が $0$ なので

$$
\sup_{u\le T}|X_u-Y_u|=0
$$

almost surely です。

従って

$$
X_u=Y_u
\qquad
(0\le u\le T)
$$

almost surely です。

$T=1,2,\ldots$ の可算共通部分を取れば、全時刻で equality が同時に成り立ちます。

よって $X,Y$ は indistinguishable です。
<!-- solution-end -->

#### STO9-A04 finite-time explosion を直接計算する
- Level: A
- 目安時間: 15分

deterministic SDE

$$
dX_t=X_t^2\,dt,
\qquad
X_0=x_0>0
$$

を考える。

1. maximal solution を求めよ。
2. explosion time を求めよ。
3. $b(x)=x^2$ が local Lipschitz だが linear growth を満たさないことを確認せよ。

<!-- solution-start -->
### 詳細解答

1. $\sigma\equiv0$ なので通常の微分方程式

$$
\frac{dX_t}{dt}=X_t^2
$$

です。

$X_t>0$ の間

$$
\frac{d}{dt}\left(-\frac1{X_t}\right)=1.
$$

従って

$$
-\frac1{X_t}
=
t-\frac1{x_0}.
$$

よって

$$
X_t
=
\frac{x_0}{1-x_0t}.
$$

2. denominator が $0$ になる時刻は

$$
\tau_{\mathrm e}
=
\frac1{x_0}.
$$

$t\uparrow\tau_{\mathrm e}$ で

$$
X_t\to+\infty.
$$

3. 任意の $R<\infty$ について $|x|,|y|\le R$ なら

$$
|x^2-y^2|
=
|x-y||x+y|
\le
2R|x-y|.
$$

従って local Lipschitz です。

一方 linear growth

$$
|x^2|^2=x^4
\le
K(1+x^2)
$$

を全ての $x$ で満たす有限 $K$ は存在しません。

従って local Lipschitz は local uniqueness を与えても non-explosion までは保証しません。
<!-- solution-end -->

# 18. 演習 B

#### STO9-B01 Picard iteration の最初の二段
- Level: B
- 目安時間: 30分

1 次元 SDE

$$
dX_t=(a+bX_t)\,dt+c\,dW_t,
\qquad
X_0=x
$$

を考える。

Picard iteration を

$$
X_t^{(0)}=x
$$

から始める。

1. $X^{(1)}$ を求めよ。
2. $X^{(2)}$ を積分表示で求めよ。
3. $X^{(2)}-X^{(1)}$ が deterministic integral と stochastic integral の和としてどのように現れるか書き下し、本文の factorial estimate の構造を確認せよ。

<!-- solution-start -->
### 詳細解答

Picard rule は

$$
X_t^{(n+1)}
=
x
+
\int_0^t(a+bX_s^{(n)})\,ds
+
\int_0^tc\,dW_s.
$$

1. $X_s^{(0)}=x$ なので

$$
\begin{aligned}
X_t^{(1)}
&=
x
+
\int_0^t(a+bx)\,ds
+
cW_t\\
&=
x+(a+bx)t+cW_t.
\end{aligned}
$$

2. 次に

$$
\begin{aligned}
X_t^{(2)}
&=
x
+
\int_0^t
\{a+bX_s^{(1)}\}\,ds
+
cW_t\\
&=
x
+
\int_0^t
\{a+b[x+(a+bx)s+cW_s]\}\,ds
+
cW_t.
\end{aligned}
$$

従って

$$
\begin{aligned}
X_t^{(2)}
&=
x
+
(a+bx)t
+
\frac12b(a+bx)t^2\\
&\quad+
bc\int_0^tW_s\,ds
+
cW_t.
\end{aligned}
$$

3. 一般の Picard difference formula は

$$
\begin{aligned}
X_t^{(n+1)}-X_t^{(n)}
&=
\int_0^t
b\{X_s^{(n)}-X_s^{(n-1)}\}\,ds\\
&\quad+
\int_0^t(c-c)\,dW_s.
\end{aligned}
$$

この例では diffusion coefficient が constant なので stochastic difference は $0$ です。

特に

$$
X_t^{(2)}-X_t^{(1)}
=
b\int_0^t
\{X_s^{(1)}-x\}\,ds.
$$

一般 nonlinear SDE では diffusion difference も残り、それを Doob $L^2$ inequality と Itô isometry で同じ時間積分 estimate に落とします。

この「一段進むごとに時間積分が一つ増える」ことが

$$
\frac{T^n}{n!}
$$

という simplex volume を生みます。
<!-- solution-end -->

#### STO9-B02 linear growth から non-explosion を導く
- Level: B
- 目安時間: 30分

maximal solution $X$ の exit times を

$$
\tau_n=\inf\{t\ge0:|X_t|\ge n\}
$$

とする。

ある $C_T$ が $n$ に依存せず

$$
E\sup_{0\le t\le T}
|X_{t\wedge\tau_n}|^2
\le
C_T
$$

を満たすと仮定する。

1. $P(\tau_n\le T)\le C_T/n^2$ を示せ。
2. $\{\tau_{\mathrm e}\le T\}\subset\{\tau_n\le T\}$ を使って $P(\tau_{\mathrm e}\le T)=0$ を示せ。
3. なぜ $C_T$ が $n$ に依存しないことが本質か説明せよ。

<!-- solution-start -->
### 詳細解答

1. $\tau_n\le T$ なら continuity から

$$
|X_{\tau_n}|=n.
$$

従って

$$
n^2
1_{\{\tau_n\le T\}}
\le
\sup_{0\le t\le T}
|X_{t\wedge\tau_n}|^2.
$$

期待値を取ると

$$
n^2P(\tau_n\le T)
\le
E\sup_{0\le t\le T}
|X_{t\wedge\tau_n}|^2
\le
C_T.
$$

よって

$$
P(\tau_n\le T)
\le
\frac{C_T}{n^2}.
$$

2. $\tau_n\le\tau_{\mathrm e}$ なので、$\tau_{\mathrm e}\le T$ なら必ず $\tau_n\le T$ です。従って各 $n$ について

$$
\{\tau_{\mathrm e}\le T\}
\subset
\{\tau_n\le T\}.
$$

よって

$$
P(\tau_{\mathrm e}\le T)
\le
P(\tau_n\le T)
\le
\frac{C_T}{n^2}.
$$

$n\to\infty$ とすれば

$$
P(\tau_{\mathrm e}\le T)=0.
$$

3. もし estimate が

$$
E\sup|X_{t\wedge\tau_n}|^2
\le
C_{T,n}
$$

しか与えず、$C_{T,n}$ が例えば $n^4$ のように増えれば

$$
P(\tau_n\le T)
\le
\frac{C_{T,n}}{n^2}
$$

は $0$ へ行きません。

linear growth は stopping radius に依存しない global coefficient bound を与えるため、moment estimate の constant を $n$ に依存させずに済みます。
<!-- solution-end -->

#### STO9-B03 comparison theorem を explicit solution と照合する
- Level: B
- 目安時間: 30分

同じ Brown 運動 $W$ に対し

$$
\begin{aligned}
dX_t&=-X_t\,dt+dW_t,
&X_0&=x,\\
dY_t&=(c-Y_t)\,dt+dW_t,
&Y_0&=y
\end{aligned}
$$

とする。ここで $c\ge0$、$x\le y$ とする。

1. comparison theorem の仮定を確認せよ。
2. $D_t=Y_t-X_t$ の equation を求めよ。
3. $D_t$ を明示的に解き、$D_t\ge0$ を直接示せ。

<!-- solution-start -->
### 詳細解答

1. drift は

$$
b_1(z)=-z,
\qquad
b_2(z)=c-z.
$$

$c\ge0$ だから

$$
b_1(z)\le b_2(z)
$$

for all $z$ です。

両 drift は Lipschitz constant $1$ を持ちます。

diffusion coefficient はどちらも

$$
\sigma(z)=1
$$

で同一です。

初期値も $x\le y$ です。

従って comparison theorem の仮定を満たします。

2. 差を取ると Brownian terms が消えて

$$
\begin{aligned}
dD_t
&=
dY_t-dX_t\\
&=
(c-Y_t+X_t)\,dt\\
&=
(c-D_t)\,dt.
\end{aligned}
$$

初期値は

$$
D_0=y-x\ge0.
$$

3. 線形微分方程式

$$
D_t'=c-D_t
$$

の解は

$$
D_t
=
c+(D_0-c)e^{-t}.
$$

別の形にすると

$$
D_t
=
e^{-t}D_0+c(1-e^{-t}).
$$

$D_0\ge0$、$c\ge0$ なので

$$
D_t\ge0.
$$

従って

$$
X_t\le Y_t
$$

for all $t$ です。

この例では same diffusion によって noise が差から完全に消えるため、comparison mechanism が特に見えやすくなっています。
<!-- solution-end -->

# 19. 演習 C

#### STO9-C01 superlinear drift を Lyapunov function で制御する
- Level: C
- 目安時間: 50分

1 次元 SDE

$$
dX_t
=
(-X_t^3+\beta X_t)\,dt
+
\gamma\,dW_t,
\qquad
X_0=x_0
$$

を考える。$\beta\in\mathbb R$、$\gamma\in\mathbb R$、$x_0\in\mathbb R$ とする。

1. coefficients が local Lipschitz であることを示せ。
2. $b(x)=-x^3+\beta x$ は一般に global linear growth を満たさないことを確認せよ。
3. $V(x)=1+x^2$ に対し、Itô formula の drift combination
   $V'(x)b(x)+\frac12V''(x)\gamma^2$
   を計算せよ。
4. ある $C<\infty$ が存在して
   $V'(x)b(x)+\frac12V''(x)\gamma^2\le CV(x)$
   を全ての $x$ で満たすことを示せ。
5. [Lyapunov 型 non-explosion criterion](#thm-sto9-lyapunov-nonexplosion) を使って global strong solution が存在することを結論せよ。

<!-- solution-start -->
### 詳細解答

1. diffusion coefficient $\sigma(x)=\gamma$ は constant なので global Lipschitz です。

drift

$$
b(x)=-x^3+\beta x
$$

について、$|x|,|y|\le R$ なら

$$
\begin{aligned}
|b(x)-b(y)|
&=
|-(x^3-y^3)+\beta(x-y)|\\
&\le
|x-y|
\left(
|x^2+xy+y^2|+|\beta|
\right)\\
&\le
(3R^2+|\beta|)|x-y|.
\end{aligned}
$$

従って $b$ は local Lipschitz です。

2. $|x|\to\infty$ で

$$
|b(x)|
\sim
|x|^3.
$$

従って

$$
|b(x)|^2
\sim
|x|^6,
$$

これは

$$
K(1+x^2)
$$

では全空間上一様に抑えられません。

よって global linear growth は満たしません。

3. $V(x)=1+x^2$ なので

$$
V'(x)=2x,
\qquad
V''(x)=2.
$$

従って drift combination は

$$
\begin{aligned}
V'(x)b(x)
+
\frac12V''(x)\gamma^2
&=
2x(-x^3+\beta x)+\gamma^2\\
&=
-2x^4+2\beta x^2+\gamma^2.
\end{aligned}
$$

4. quartic term は nonpositive なので

$$
-2x^4+2\beta x^2+\gamma^2
\le
2|\beta|x^2+\gamma^2.
$$

また

$$
x^2\le V(x),
\qquad
1\le V(x).
$$

従って

$$
2|\beta|x^2+\gamma^2
\le
(2|\beta|+\gamma^2)V(x).
$$

したがって

$$
C=2|\beta|+\gamma^2
$$

と取れば

$$
V'(x)b(x)
+
\frac12V''(x)\gamma^2
\le
CV(x).
$$

5. $V\in C^2$、$V\ge0$ で

$$
V(x)\to\infty
\qquad
(|x|\to\infty).
$$

また初期値では

$$
V(x_0)=1+x_0^2<\infty.
$$

従って [Lyapunov 型 non-explosion criterion](#thm-sto9-lyapunov-nonexplosion) の条件を全て満たします。

local Lipschitz theorem により maximal strong solution は存在し、Lyapunov criterion によりその explosion time は

$$
\tau_{\mathrm e}=\infty
$$

almost surely です。

したがってこの SDE は全時刻で unique strong solution を持ちます。

この例では drift の大きさ自体は cubic ですが、leading term $-x^3$ が原点方向へ強く戻すため explosion を防いでいます。
<!-- solution-end -->

---

## 20. この章で何が閉じたか

STO9 では

$$
dX_t=b(X_t)\,dt+\sigma(X_t)\,dW_t
$$

を単なる記号ではなく、実際に solution を構成できる対象へ変えました。

中心結果をまとめると

$$
\boxed{
\begin{array}{c}
\text{global Lipschitz}\\
\Downarrow\\
\text{Picard strong existence}
+
\text{pathwise uniqueness}\\
\Downarrow\\
\text{moment / stability estimates}
\end{array}
}
$$

です。

さらに

$$
\boxed{
\begin{array}{c}
\text{local Lipschitz}\\
\Downarrow\\
\text{maximal solution up to }\tau_{\mathrm e}\\
\Downarrow\\
\text{linear growth or Lyapunov control}\\
\Downarrow\\
\tau_{\mathrm e}=\infty
\end{array}
}
$$

も証明しました。

comparison theorem では、同じ noise を共有する一次元 SDE が pathwise order まで保持できることも確認しました。

---

## 21. 次章への橋

本章では「同じ Brown 運動を最初から固定して解を作る」問題を扱いました。

しかし SDE には別の問いがあります。

$$
\boxed{
\text{Brownian motion や確率空間そのものも含めて、
どこかに解を作れればよいのではないか}
}
$$

これが weak solution の発想です。

次の STO10 では

- weak solution
- strong solution との違い
- equivalent change of measure
- exponential martingale
- Novikov condition
- Girsanov theorem
- drift removal
- weak existence への応用
- pathwise uniqueness と uniqueness in law の位置付け

へ進みます。

STO9 が **同じ noise の上での固定点理論** なら、STO10 は **確率測度を変えて law を作る理論** です。
