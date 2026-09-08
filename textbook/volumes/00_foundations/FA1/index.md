# FA1 標準関数解析 I：Banach 空間の商・Baire・一様有界性原理

<!-- definition-example-audit: strict -->

関数解析で最初に現れる「有限次元では気にしなくてよかったが、無限次元では完備性が結論を支配する」定理が **一様有界性原理（Banach–Steinhaus）** です。

本章では、その定理だけを孤立して置きません。次章 FA2 の開写像定理へ必要になる Banach 空間の商も先に整え、

```text
LA2 の線形商空間
  ↓
閉部分空間で割る商ノルム
  ↓
商写像は 1-Lipschitz かつ開写像
  ↓
Banach / closed subspace の商も Banach

TOP6 の Baire カテゴリー定理
  ↓
pointwise bounded と uniformly bounded の量化順序を分離
  ↓
一様有界性原理
  ↓
pointwise limit / 発散点の稠密性
  ↓
FA2 開写像定理・閉グラフ定理
```

という二本の流れを合流させます。

本章では Hahn–Banach は使いません。Baire 系の定理は Hahn–Banach 系とは別の機構で動きます。

以下、スカラー体は $\mathbb R$ または $\mathbb C$ とします。

---

## 1. 線形商空間に距離を入れる

[LA2 の商空間](../LA2/index.md#def-la2-quotient)では、部分空間 $M\subset X$ に対して

$$
X/M=\{x+M:x\in X\}
$$

を作りました。ここでは $X$ をノルム空間とし、$M$ を **閉** 線形部分空間とします。

剰余類 $x+M$ の大きさは、「$x$ が $M$ からどれだけ離れているか」で測るのが自然です。

<a id="def-fa1-quotient-norm"></a>
<!-- formal-statement-start -->
### 定義（商ノルム）

$X$ をノルム空間、$M\subset X$ を閉線形部分空間とする。$x+M\in X/M$ に対して

$$
\boxed{
\|x+M\|_{X/M}
:=
\inf_{m\in M}\|x-m\|_X
}
$$

と定める。これを **商ノルム** という。
<!-- formal-statement-end -->

<!-- definition-example-start: def-fa1-quotient-norm -->
**定義の確認**：$\mathbb R^2$ を横方向で割る

$X=\mathbb R^2$ に Euclid ノルムを入れ、

$$
M=\operatorname{span}(e_1)
$$

とします。$x=(a,b)$ なら

$$
\begin{aligned}
\|x+M\|_{X/M}
&=\inf_{t\in\mathbb R}\|(a,b)-(t,0)\|_2\\
&=\inf_t\sqrt{(a-t)^2+b^2}\\
&=|b|.
\end{aligned}
$$

つまり $e_1$ 方向は商で潰れ、縦方向の大きさだけが残ります。
<!-- definition-example-end -->

定義に infimum が入っているので、最小値を達成する $m\in M$ が存在すると勝手に仮定してはいけません。以下の証明でも必要なのは「infimum に任意に近い元を取れる」ことだけです。

---

<a id="thm-fa1-quotient-norm"></a>
<!-- formal-statement-start -->
### 定理（商ノルムの well-defined 性とノルム性）

$X$ をノルム空間、$M\subset X$ を閉線形部分空間とする。このとき

$$
\|x+M\|_{X/M}
=
\inf_{m\in M}\|x-m\|_X
$$

は代表元の取り方によらず、$X/M$ 上のノルムを定める。
<!-- formal-statement-end -->

<!-- proof-start -->
### 証明

#### 1.1 代表元によらない

$x+M=x'+M$ なら $x'=x+m_0$ となる $m_0\in M$ が存在します。従って

$$
\begin{aligned}
\inf_{m\in M}\|x'-m\|
&=\inf_{m\in M}\|x+m_0-m\|\\
&=\inf_{u\in M}\|x-u\|,
\end{aligned}
$$

です。最後は $u=m-m_0$ と置き、$m$ が $M$ 全体を動くと $u$ も $M$ 全体を動くことを使いました。

#### 1.2 正定値性で閉性を使う

明らかに $\|x+M\|_{X/M}\ge0$ です。また $x\in M$ なら $m=x$ を取って

$$
\|x+M\|_{X/M}=0.
$$

逆に

$$
\|x+M\|_{X/M}=0
$$

とします。infimum の定義から、各 $n$ に対し $m_n\in M$ を

$$
\|x-m_n\|<\frac1n
$$

となるように取れます。従って $m_n\to x$ です。$M$ は閉集合なので極限 $x$ も $M$ に入り、

$$
x+M=M
$$

です。

**ここが閉性を使う唯一の箇所です。**

#### 1.3 斉次性

$\alpha=0$ は自明です。$\alpha\ne0$ なら $M$ は線形部分空間なので

$$
\begin{aligned}
\|\alpha x+M\|_{X/M}
&=\inf_{m\in M}\|\alpha x-m\|\\
&=|\alpha|\inf_{u\in M}\|x-u\|\\
&=|\alpha|\|x+M\|_{X/M}.
\end{aligned}
$$

ここでは $m=\alpha u$ と置きました。

#### 1.4 和の評価

$\varepsilon>0$ を固定します。infimum の定義から $m_1,m_2\in M$ を

$$
\|x-m_1\|
<
\|x+M\|_{X/M}+\frac\varepsilon2,
$$

$$
\|y-m_2\|
<
\|y+M\|_{X/M}+\frac\varepsilon2
$$

となるように取れます。$m_1+m_2\in M$ なので

$$
\begin{aligned}
\|(x+y)+M\|_{X/M}
&\le\|(x+y)-(m_1+m_2)\|\\
&\le\|x-m_1\|+\|y-m_2\|\\
&<\|x+M\|_{X/M}+\|y+M\|_{X/M}+\varepsilon.
\end{aligned}
$$

$\varepsilon>0$ は任意だから

$$
\|(x+y)+M\|_{X/M}
\le
\|x+M\|_{X/M}+\|y+M\|_{X/M}.
$$

以上でノルム公理が全て成り立ちます。$\square$
<!-- proof-end -->

### 閉でない部分空間では何が壊れるか

$M$ が閉でない場合、同じ式は 0 でない剰余類にも値 0 を与え得ます。

例えば $\ell^2$ の有限支列全体 $c_{00}$ は $\ell^2$ で稠密ですが閉ではありません。任意の $x\in\ell^2$ に対して有限打ち切り $x^{(N)}\in c_{00}$ が

$$
\|x-x^{(N)}\|_2\to0
$$

なので

$$
\inf_{m\in c_{00}}\|x-m\|_2=0.
$$

従って $x\notin c_{00}$ でも $x+c_{00}$ の「大きさ」が 0 になってしまいます。

---

## 2. 標準商写像は直接、開写像になる

[LA2 の標準射影](../LA2/index.md#def-la2-quotient)を

$$
q:X\to X/M,
\qquad
q(x)=x+M
$$

と書きます。

商ノルムの定義から

$$
\|q(x)-q(y)\|_{X/M}
=
\inf_{m\in M}\|(x-y)-m\|
\le
\|x-y\|
$$

なので $q$ は 1-Lipschitz です。

さらに、もっと強く開球を開球へ写します。

<a id="lem-fa1-quotient-open-ball"></a>
<!-- formal-statement-start -->
### 補題（標準商写像は開球を開球へ写す）

任意の $x\in X$ と $r>0$ に対し

$$
\boxed{
q(B_X(x,r))
=
B_{X/M}(q(x),r)
}
$$

が成り立つ。従って $q$ は開写像である。
<!-- formal-statement-end -->

<!-- proof-start -->
### 証明

まず $z\in B_X(x,r)$ なら 1-Lipschitz 性から

$$
\|q(z)-q(x)\|_{X/M}
\le
\|z-x\|_X
<r,
$$

よって

$$
q(B_X(x,r))
\subseteq
B_{X/M}(q(x),r).
$$

逆に $q(y)\in B_{X/M}(q(x),r)$ とします。すると

$$
\|q(y)-q(x)\|_{X/M}
=
\inf_{m\in M}\|(y-x)-m\|
<r.
$$

infimum が $r$ より小さいので、ある $m\in M$ が存在して

$$
\|(y-x)-m\|<r.
$$

従って

$$
y-m\in B_X(x,r).
$$

一方 $q(y-m)=q(y)$ なので、$q(y)$ は $q(B_X(x,r))$ に入ります。よって逆包含も成り立ちます。$\square$
<!-- proof-end -->

ここでは FA2 の[開写像定理](../FA2/index.md#thm-fa2-open-mapping)を使っていません。**商ノルムの infimum から直接示した特殊な開写像**です。この非循環性は次章で重要になります。

---

## 3. Banach 空間を閉部分空間で割っても Banach

<a id="thm-fa1-quotient-banach"></a>
<!-- formal-statement-start -->
### 定理（Banach 空間の閉部分空間による商は Banach）

$X$ を Banach 空間、$M\subset X$ を閉線形部分空間とする。このとき商ノルムを入れた $X/M$ は Banach 空間である。
<!-- formal-statement-end -->

<!-- proof-start -->
### 証明

$X/M$ の Cauchy 列を

$$
\xi_1,\xi_2,\dots
$$

とします。

#### 3.1 差が急速に小さくなる部分列を取る

Cauchy 性から、添字を増加させて

$$
\|\xi_{n_{k+1}}-\xi_{n_k}\|_{X/M}
<2^{-k-2}
$$

となる部分列 $(\xi_{n_k})$ を取れます。

商ノルムは infimum なので、各 $k$ について差の剰余類を表す $z_k\in X$ を

$$
q(z_k)=\xi_{n_{k+1}}-\xi_{n_k},
$$

$$
\|z_k\|_X<2^{-k-1}
$$

となるように選べます。ここでも最良代表元の存在は仮定していません。

#### 3.2 $X$ 側で Cauchy 列を作る

$\xi_{n_1}$ の代表元 $x_1\in X$ を一つ取り、帰納的に

$$
x_{k+1}=x_k+z_k
$$

と置きます。すると

$$
q(x_{k+1})
=q(x_k)+q(z_k)
=\xi_{n_k}+(\xi_{n_{k+1}}-\xi_{n_k})
=\xi_{n_{k+1}}.
$$

また $p>q$ なら

$$
\begin{aligned}
\|x_p-x_q\|
&\le\sum_{k=q}^{p-1}\|z_k\|\\
&<\sum_{k=q}^{\infty}2^{-k-1}.
\end{aligned}
$$

右辺は $q\to\infty$ で 0 へ行くので $(x_k)$ は $X$ の Cauchy 列です。

#### 3.3 完備性をここで使う

$X$ は Banach なので、ある $x\in X$ が存在して

$$
x_k\to x.
$$

$q$ は 1-Lipschitz だから

$$
\xi_{n_k}=q(x_k)\to q(x)
$$

です。

元の $(\xi_n)$ は Cauchy で、その部分列が $q(x)$ へ収束したので、元の列全体も $q(x)$ へ収束します。実際、$\varepsilon>0$ に対し Cauchy 性で十分大きい $N$ を取り、さらに $n_k\ge N$ かつ

$$
\|\xi_{n_k}-q(x)\|<\frac\varepsilon2
$$

となる $k$ を取れば、$n\ge N$ について

$$
\|\xi_n-q(x)\|
\le
\|\xi_n-\xi_{n_k}\|+
\|\xi_{n_k}-q(x)\|
<\varepsilon.
$$

従って $X/M$ は完備です。$\square$
<!-- proof-end -->

この証明で Banach 性が働いた場所は、$X$ 側で作った Cauchy 列 $(x_k)$ の極限を $X$ 内に残した一点だけです。

---

## 4. 「各点ごとに有限」と「全作用素を一つの定数で抑える」は違う

$X,Y$ をノルム空間、$\mathcal T\subset\mathcal L(X,Y)$ を有界線形作用素の族とします。[有界線形作用素](../F0_02C3_Frechet微分_線形作用素_随伴/index.md#def-f0-02c3-bounded-linear-operator)と[作用素ノルム](../F0_02C3_Frechet微分_線形作用素_随伴/index.md#def-f0-02c3-operator-norm)は既存正本を使います。

<a id="def-fa1-pointwise-bounded"></a>
<!-- formal-statement-start -->
### 定義（点ごとに有界な作用素族）

作用素族 $\mathcal T\subset\mathcal L(X,Y)$ が **点ごとに有界（pointwise bounded）** であるとは、

$$
\boxed{
\forall x\in X,
\quad
\sup_{T\in\mathcal T}\|Tx\|_Y<\infty
}
$$

となることをいう。
<!-- formal-statement-end -->

<!-- definition-example-start: def-fa1-pointwise-bounded -->
**定義の確認**：$\ell^2$ の座標汎関数

$$
p_n:\ell^2\to\mathbb R,
\qquad
p_n(x)=x_n
$$

とします。任意の $x\in\ell^2$ に対し

$$
|p_n(x)|=|x_n|\le\|x\|_2
$$

なので

$$
\sup_n|p_n(x)|\le\|x\|_2<\infty.
$$

従って $(p_n)$ は点ごとに有界です。
<!-- definition-example-end -->

<a id="def-fa1-uniformly-bounded"></a>
<!-- formal-statement-start -->
### 定義（一様有界な作用素族）

作用素族 $\mathcal T\subset\mathcal L(X,Y)$ が **一様有界（uniformly bounded）** であるとは、

$$
\boxed{
\sup_{T\in\mathcal T}\|T\|<\infty
}
$$

となることをいう。
<!-- formal-statement-end -->

<!-- definition-example-start: def-fa1-uniformly-bounded -->
**定義の確認**：同じ座標汎関数族

上の $p_n$ について

$$
|p_n(x)|\le\|x\|_2
$$

なので $\|p_n\|\le1$ です。一方標準基底 $e_n$ に対して

$$
|p_n(e_n)|=1,
\qquad
\|e_n\|_2=1
$$

だから $\|p_n\|=1$。従って

$$
\sup_n\|p_n\|=1.
$$

この族は点ごとに有界であるだけでなく一様有界です。
<!-- definition-example-end -->

量化順序を並べると違いがはっきりします。

点ごとの有界性は

$$
\forall x\in X\ \exists M_x<\infty\ \forall T\in\mathcal T:
\|Tx\|\le M_x,
$$

一様有界性は

$$
\exists M<\infty\ \forall x\in X\ \forall T\in\mathcal T:
\|Tx\|\le M\|x\|.
$$

後者では **同じ $M$ が全ての $x$ と全ての $T$ に同時に効きます**。

一様有界なら点ごとに有界なのは作用素ノルムの定義から直ちに従います。驚くべき方向は、その逆です。

---

## 5. 一様有界性原理：Baire が量化順序を反転させる

<a id="thm-fa1-uniform-boundedness"></a>
<!-- formal-statement-start -->
### 定理（一様有界性原理：Banach–Steinhaus）

$X$ を Banach 空間、$Y$ をノルム空間とし、$\mathcal T\subset\mathcal L(X,Y)$ を点ごとに有界な作用素族とする。すると $\mathcal T$ は一様有界である。すなわち

$$
\boxed{
\forall x\in X,
\ \sup_{T\in\mathcal T}\|Tx\|<\infty
\quad\Longrightarrow\quad
\sup_{T\in\mathcal T}\|T\|<\infty
}
$$

が成り立つ。
<!-- formal-statement-end -->

<!-- proof-start -->
### 証明

各 $m\in\mathbb N$ に対して

$$
E_m
:=
\{x\in X:\|Tx\|\le m\ \text{for every }T\in\mathcal T\}
$$

と置きます。

#### 5.1 点ごとの有界性から $X=\bigcup_mE_m$

任意の $x\in X$ を固定します。点ごとの有界性により

$$
M_x:=\sup_{T\in\mathcal T}\|Tx\|<\infty.
$$

$M_x\le m$ となる整数 $m$ を取れば $x\in E_m$ です。従って

$$
X=\bigcup_{m=1}^{\infty}E_m.
$$

ここではまだ $m$ は $x$ に依存しています。

#### 5.2 各 $E_m$ は閉

各 $T\in\mathcal T$ は連続なので

$$
\{x:\|Tx\|\le m\}
$$

は閉集合です。従って

$$
E_m
=
\bigcap_{T\in\mathcal T}
\{x:\|Tx\|\le m\}
$$

も閉集合です。交わりは非可算でも閉性を保ちます。

#### 5.3 Baire により一つの $E_N$ が内部を持つ

もし全ての $E_m$ の内部が空なら、$G_m:=X\setminus E_m$ は全て開かつ稠密です。

$X$ は Banach、従ってノルム距離について完備です。[TOP6 の Baire のカテゴリー定理](../TOP6/index.md#thm-top6-baire-category)から

$$
\bigcap_{m=1}^{\infty}G_m
$$

は稠密、特に非空でなければなりません。

しかし

$$
\bigcap_mG_m
=
X\setminus\bigcup_mE_m
=
X\setminus X
=
\varnothing,
$$

矛盾です。

従って、ある $N\in\mathbb N$ について $E_N$ は非空な内部を持ちます。つまりある $x_0\in X$ と $r>0$ が存在して

$$
B(x_0,r)\subset E_N.
$$

**Banach 性を使ったのは、Baire を適用したこの一点です。**

#### 5.4 一つの局所球から全単位球の評価を作る

任意の $x\in X$ で $\|x\|\le1$ とし、任意の $T\in\mathcal T$ を取ります。

二点

$$
x_0+\frac r2x,
\qquad
x_0-\frac r2x
$$

はいずれも $B(x_0,r)$ に入るので $E_N$ に属します。従って

$$
\left\|T\left(x_0+\frac r2x\right)\right\|\le N,
$$

$$
\left\|T\left(x_0-\frac r2x\right)\right\|\le N.
$$

線形性を使って差を取ると

$$
rx
=
\left(x_0+\frac r2x\right)
-
\left(x_0-\frac r2x\right)
$$

だから

$$
\begin{aligned}
r\|Tx\|
&=
\left\|T\left(x_0+\frac r2x\right)
-T\left(x_0-\frac r2x\right)\right\|\\
&\le2N.
\end{aligned}
$$

従って

$$
\|Tx\|\le\frac{2N}{r}
\qquad(\|x\|\le1,\ T\in\mathcal T).
$$

単位球上で supremum を取れば

$$
\|T\|\le\frac{2N}{r}
$$

が全ての $T\in\mathcal T$ に同時に成り立ち、

$$
\boxed{
\sup_{T\in\mathcal T}\|T\|
\le
\frac{2N}{r}
<\infty
}
$$

です。$\square$
<!-- proof-end -->

証明の役割分担を縮めると

```text
pointwise bounded
  ↓
X = countable union of closed E_m
  ↓ Baire（domain の完備性）
one E_N contains a ball
  ↓ linearity（対称な二点の差）
one local bound becomes a global operator-norm bound
```

です。

なお、値域 $Y$ の完備性は使っていません。必要なのは **定義域 $X$ の Banach 性** です。

---

## 6. 完備性を外すと本当に壊れる：$c_{00}$

有限支列全体

$$
c_{00}
=
\{x=(x_1,x_2,\dots):x_n=0\ \text{for all sufficiently large }n\}
$$

に sup ノルム

$$
\|x\|_\infty=\sup_n|x_n|
$$

を入れます。

各 $n$ について

$$
T_n:c_{00}\to\mathbb R,
\qquad
T_n(x)=n x_n
$$

と定めます。

### 6.1 各 $T_n$ は有界だが、作用素ノルムは発散する

任意の $x\in c_{00}$ に対して

$$
|T_nx|
=n|x_n|
\le n\|x\|_\infty,
$$

よって $T_n$ は有界です。さらに標準基底 $e_n$ を使えば

$$
|T_ne_n|=n,
\qquad
\|e_n\|_\infty=1
$$

なので

$$
\|T_n\|=n.
$$

従って

$$
\sup_n\|T_n\|=\infty.
$$

### 6.2 それでも各点では有界

$x\in c_{00}$ を固定すると、ある $N_x$ 以降は $x_n=0$ です。従って

$$
T_nx=0
\qquad(n>N_x),
$$

よって

$$
\sup_n|T_nx|<\infty.
$$

つまり $(T_n)$ は点ごとに有界なのに一様有界ではありません。

### 6.3 なぜ一様有界性原理と矛盾しないか

$c_{00}$ は sup ノルムについて完備ではありません。実際

$$
s^{(m)}
=
\left(1,\frac12,\dots,\frac1m,0,0,\dots\right)
$$

と置くと、$p>q$ に対して

$$
\|s^{(p)}-s^{(q)}\|_\infty
=\frac1{q+1}
\to0.
$$

従って $(s^{(m)})$ は Cauchy 列ですが、その sup ノルム極限

$$
s=\left(1,\frac12,\frac13,\dots\right)
$$

は有限支列ではないため $c_{00}$ に属しません。

Baire 証明の失敗も直接見えます。上の族に対する

$$
E_m=\{x:\sup_n|n x_n|\le m\}
$$

は $c_{00}$ 全体を覆いますが、どの $E_m$ も内部を持ちません。

実際 $x\in E_m$ と $\varepsilon>0$ を固定し、$x$ の支えより大きい $k$ をさらに

$$
k\frac\varepsilon2>m
$$

となるように取ります。

$$
y=x+\frac\varepsilon2 e_k
$$

なら

$$
\|y-x\|_\infty=\frac\varepsilon2<\varepsilon
$$

ですが

$$
|T_ky|=k\frac\varepsilon2>m,
$$

よって $y\notin E_m$ です。

したがって「閉集合の可算和で全体を覆ったらどれかが内部を持つ」という Baire の結論が、非完備空間では壊れています。

### Banach 空間なら発散を隠せない

同じ式を $\ell^2$ 上で

$$
T_n(x)=n x_n
$$

と考えると $\|T_n\|=n$ なので一様有界ではありません。$\ell^2$ は Banach だから、一様有界性原理の対偶により点ごとの有界性も成り立たないはずです。

実際

$$
x_n=n^{-3/4}
$$

と置けば

$$
\sum_{n=1}^{\infty}|x_n|^2
=
\sum_{n=1}^{\infty}n^{-3/2}<\infty
$$

なので $x\in\ell^2$ ですが

$$
|T_nx|=n^{1/4}\to\infty.
$$

完備空間では、作用素ノルムの発散を全ての点から同時に隠すことはできません。

---

## 7. pointwise limit は自動的に有界になる

<a id="cor-fa1-pointwise-limit"></a>
<!-- formal-statement-start -->
### 系（pointwise 収束する作用素列の一様有界性）

$X$ を Banach 空間、$Y$ をノルム空間とし、$T_n\in\mathcal L(X,Y)$ とする。各 $x\in X$ について

$$
T_nx\to Tx
$$

となる極限が存在するとする。このとき

$$
\sup_n\|T_n\|<\infty
$$

であり、極限写像 $T:X\to Y$ は有界線形作用素である。
<!-- formal-statement-end -->

<!-- proof-start -->
### 証明

各 $x$ について収束列 $(T_nx)$ は有界なので

$$
\sup_n\|T_nx\|<\infty.
$$

従って[一様有界性原理](#thm-fa1-uniform-boundedness)から

$$
M:=\sup_n\|T_n\|<\infty.
$$

線形性は

$$
\begin{aligned}
T(ax+by)
&=\lim_nT_n(ax+by)\\
&=\lim_n(aT_nx+bT_ny)\\
&=aTx+bTy
\end{aligned}
$$

から従います。

また

$$
\|T_nx\|\le M\|x\|
$$

であり、$T_nx\to Tx$ なのでノルムの連続性から

$$
\|Tx\|
\le M\|x\|.
$$

従って $T$ は有界です。$\square$
<!-- proof-end -->

例えば座標汎関数 $p_n:\ell^2\to\mathbb R$ は各 $x\in\ell^2$ に対して $x_n\to0$ だから pointwise に 0 汎関数へ収束し、実際 $\sup_n\|p_n\|=1$ です。

---

## 8. さらに強い形：一様非有界なら発散点は稠密

<a id="cor-fa1-dense-unbounded-orbits"></a>
<!-- formal-statement-start -->
### 系（一様非有界作用素族の発散点は稠密）

$X$ を Banach 空間、$Y$ をノルム空間、$\mathcal T\subset\mathcal L(X,Y)$ とする。

$$
\sup_{T\in\mathcal T}\|T\|=\infty
$$

なら

$$
D
:=
\left\{x\in X:
\sup_{T\in\mathcal T}\|Tx\|=\infty
\right\}
$$

は $X$ で稠密である。
<!-- formal-statement-end -->

<!-- proof-start -->
### 証明

一様有界性原理の証明と同じく

$$
E_m
=
\{x:\|Tx\|\le m\ \forall T\in\mathcal T\}
$$

と置きます。各 $E_m$ は閉です。

もしある $E_m$ が非空な内部を持てば、Section 5.4 と全く同じ対称二点の差の議論により

$$
\sup_{T\in\mathcal T}\|T\|<\infty
$$

となり仮定に反します。従って全ての $E_m$ は内部が空です。

よって

$$
G_m:=X\setminus E_m
$$

は開かつ稠密です。[Baire のカテゴリー定理](../TOP6/index.md#thm-top6-baire-category)から

$$
\bigcap_{m=1}^{\infty}G_m
$$

は稠密です。

一方

$$
\begin{aligned}
x\in\bigcap_mG_m
&\iff x\notin E_m\ \text{for every }m\\
&\iff \text{for every }m\text{ there is }T\in\mathcal T\text{ with }\|Tx\|>m\\
&\iff \sup_{T\in\mathcal T}\|Tx\|=\infty.
\end{aligned}
$$

従って

$$
D=\bigcap_mG_m
$$

は稠密です。$\square$
<!-- proof-end -->

単に「どこか一つ発散する点がある」より強く、**任意の非空開球の中に発散点がある**ことが分かります。

---

## 9. FA2 への橋：商空間と Baire が再び合流する

次章では Banach 空間間の全射有界線形作用素

$$
T:X\to Y
$$

が自動的に開写像になることを示します。

本章で準備した二つの道具がそこで別々に働きます。

1. **Baire**：像の閉包がある球を含むところまで押し上げる。
2. **商空間**：$\ker T$ 方向を潰し、$T$ を
   $$
   X\xrightarrow{q}X/\ker T
   \xrightarrow{\widetilde T}Y
   $$
   と読む。

特に本章の標準商写像 $q$ の開性は商ノルムから直接証明済みで、FA2 の一般開写像定理を先取りしていません。

---

# 演習

## A問題

### FA1-A01 $\mathbb R^2/M$ の商ノルム

- Level: A
- 目安時間: 10分

$X=\mathbb R^2$ に Euclid ノルムを入れ、$M=\operatorname{span}(e_1)$ とする。写像

$$
\Phi:X/M\to\mathbb R,
\qquad
\Phi((a,b)+M)=b
$$

が well-defined な線形等長同型であることを示せ。

<!-- solution-start -->
#### 詳細解答

$(a,b)+M=(a',b')+M$ なら

$$
(a-a',b-b')\in M,
$$

従って第2成分は $b-b'=0$ であり $b=b'$。よって $\Phi$ は well-defined。

線形性は剰余類の加法・スカラー倍から直ちに従う。さらに本文の計算より

$$
\|(a,b)+M\|_{X/M}=|b|=|\Phi((a,b)+M)|,
$$

だから等長。任意の $c\in\mathbb R$ は $\Phi((0,c)+M)=c$ なので全射であり、等長性から核は 0 だから単射でもある。

#### 本番答案

剰余類が等しければ差は $M=\operatorname{span}(e_1)$ に入り、第2成分が等しいので $\Phi$ は well-defined。線形で、

$$
\|(a,b)+M\|=\inf_t\sqrt{(a-t)^2+b^2}=|b|=|\Phi((a,b)+M)|.
$$

また $c=\Phi((0,c)+M)$ なので全射。従って線形等長同型。

#### 採点基準（20点）
- well-defined性: 6点
- 商ノルム計算: 7点
- 線形性・全単射: 7点
<!-- solution-end -->

### FA1-A02 標準商写像の作用素ノルム

- Level: A
- 目安時間: 10分

$M\ne X$ とする。標準商写像 $q:X\to X/M$ について $\|q\|=1$ を示せ。

<!-- solution-start -->
#### 詳細解答

本文より

$$
\|q(x)\|_{X/M}\le\|x\|_X
$$

なので $\|q\|\le1$。

逆に $X/M$ に 0 でない元 $\xi$ を一つ取る。斉次性により $\|\xi\|=1$ としてよい。商ノルムの infimum 定義から、任意の $\varepsilon>0$ に対し $x\in X$ を

$$
q(x)=\xi,
\qquad
\|x\|<1+\varepsilon
$$

となるように取れる。従って

$$
1=\|q(x)\|
\le\|q\|\,\|x\|
<\|q\|(1+\varepsilon).
$$

よって $\|q\|>1/(1+\varepsilon)$。$\varepsilon\downarrow0$ より $\|q\|\ge1$。従って $\|q\|=1$。

#### 本番答案

$\|q(x)\|\le\|x\|$ から $\|q\|\le1$。$\|\xi\|=1$ の非零剰余類を取り、任意の $\varepsilon>0$ に対し $q(x)=\xi$, $\|x\|<1+\varepsilon$ となる代表元を取ると

$$
1=\|q(x)\|<\|q\|(1+\varepsilon).
$$

$\varepsilon\to0$ で $\|q\|\ge1$。よって $\|q\|=1$。

#### 採点基準（20点）
- 上側評価: 6点
- infimumを使った近似代表元: 8点
- 極限による下側評価: 6点
<!-- solution-end -->

### FA1-A03 座標汎関数族

- Level: A
- 目安時間: 8分

$p_n:\ell^2\to\mathbb R$, $p_n(x)=x_n$ とする。$\|p_n\|=1$ と $p_n(x)\to0$ を示せ。

<!-- solution-start -->
#### 詳細解答

$|x_n|\le\|x\|_2$ より $\|p_n\|\le1$。標準基底 $e_n$ に対して $\|e_n\|_2=1$, $p_n(e_n)=1$ なので $\|p_n\|\ge1$。従って $\|p_n\|=1$。

また $x\in\ell^2$ なら $\sum_n|x_n|^2<\infty$。もし $x_n\not\to0$ なら、ある $\varepsilon>0$ と無限個の $n$ について $|x_n|\ge\varepsilon$ となり、二乗和は無限大になって矛盾。従って $p_n(x)=x_n\to0$。

#### 本番答案

$|p_n(x)|=|x_n|\le\|x\|_2$ と $p_n(e_n)=1$ より $\|p_n\|=1$。また $x\in\ell^2$ では $\sum|x_n|^2<\infty$ だから必ず $x_n\to0$。従って $p_n(x)\to0$。

#### 採点基準（20点）
- $\|p_n\|\le1$: 6点
- $\|p_n\|\ge1$: 5点
- $x_n\to0$ の論証: 9点
<!-- solution-end -->

### FA1-A04 pointwise 収束から極限作用素へ

- Level: A
- 目安時間: 12分

$X$ を Banach、$Y$ をノルム空間とし、$T_n\in\mathcal L(X,Y)$ が全ての $x\in X$ で $T_nx\to Tx$ を満たすとする。$T$ が有界線形作用素であることを示せ。

<!-- solution-start -->
#### 詳細解答

各 $x$ について収束列 $(T_nx)$ は有界なので $(T_n)$ は点ごとに有界。[一様有界性原理](#thm-fa1-uniform-boundedness)により

$$
M:=\sup_n\|T_n\|<\infty.
$$

極限と有限和・スカラー倍を交換して $T$ は線形。さらに

$$
\|T_nx\|\le M\|x\|
$$

を $n\to\infty$ とすれば

$$
\|Tx\|\le M\|x\|.
$$

従って $T$ は有界線形作用素。

#### 本番答案

$T_nx\to Tx$ より各 $x$ で $\sup_n\|T_nx\|<\infty$。[Banach–Steinhaus](#thm-fa1-uniform-boundedness)から $M:=\sup_n\|T_n\|<\infty$。極限で線形性が保たれ、$\|Tx\|\le M\|x\|$ だから $T\in\mathcal L(X,Y)$。

#### 採点基準（20点）
- pointwise bounded性: 5点
- [一様有界性原理](#thm-fa1-uniform-boundedness)の適用: 7点
- 線形性・有界性: 8点
<!-- solution-end -->

## B問題

### FA1-B01 kernel で割った作用素

- Level: B
- 目安時間: 18分

$T\in\mathcal L(X,Y)$ とする。$\ker T$ が閉部分空間であり、

$$
\widetilde T:X/\ker T\to Y,
\qquad
\widetilde T(x+\ker T)=Tx
$$

が well-defined な単射有界線形作用素で、

$$
\|\widetilde T\|\le\|T\|
$$

を満たすことを示せ。

<!-- solution-start -->
#### 詳細解答

$x_n\in\ker T$, $x_n\to x$ なら連続性から

$$
Tx=\lim_nTx_n=0,
$$

従って $x\in\ker T$。よって $\ker T$ は閉。

$x+\ker T=x'+\ker T$ なら $x-x'\in\ker T$ なので $Tx=Tx'$。よって $\widetilde T$ は well-defined。線形性は明らか。

$\widetilde T(x+\ker T)=0$ なら $Tx=0$、従って $x\in\ker T$ で剰余類は 0。よって単射。

さらに任意の $k\in\ker T$ について

$$
Tx=T(x-k)
$$

だから

$$
\|Tx\|\le\|T\|\,\|x-k\|.
$$

$k$ について infimum を取れば

$$
\|\widetilde T(x+\ker T)\|
\le
\|T\|\,\|x+\ker T\|_{X/\ker T}.
$$

従って $\|\widetilde T\|\le\|T\|$。

#### 本番答案

$T$ の連続性から $\ker T=T^{-1}(\{0\})$ は閉。剰余類の代表元の差が kernel に入れば像は同じなので $\widetilde T$ は well-defined。核が 0 なので単射。任意の $k\in\ker T$ に対し

$$
\|Tx\|=\|T(x-k)\|\le\|T\|\|x-k\|,
$$

よって infimum を取り $\|\widetilde T\|\le\|T\|$。

#### 採点基準（20点）
- kernel の閉性: 5点
- well-defined性・単射性: 7点
- 商ノルムによる作用素評価: 8点
<!-- solution-end -->

### FA1-B02 非完備空間での反例

- Level: B
- 目安時間: 20分

$c_{00}$ に sup ノルムを入れ、$T_n(x)=n x_n$ とする。次を全て示せ。

1. 各 $T_n$ は有界で $\|T_n\|=n$。
2. $(T_n)$ は点ごとに有界。
3. $c_{00}$ は完備でない。
4. 一様有界性原理の仮定のうち何が欠けているか説明せよ。

<!-- solution-start -->
#### 詳細解答

1. $|T_nx|\le n\|x\|_\infty$ なので $\|T_n\|\le n$。$e_n$ で等号が出るので $\|T_n\|=n$。
2. 固定した $x\in c_{00}$ は有限支なので十分大きい $n$ で $T_nx=0$。従って $\sup_n|T_nx|<\infty$。
3. $s^{(m)}=(1,1/2,\dots,1/m,0,\dots)$ は sup ノルム Cauchy だが極限 $(1/n)$ は有限支でなく $c_{00}$ 外。
4. 定義域が Banach でない。従って Baire のカテゴリー定理を定義域に適用できず、「閉集合 $E_m$ のどれかが内部を持つ」という核心段階が失われる。

#### 本番答案

$|n x_n|\le n\|x\|_\infty$ と $e_n$ より $\|T_n\|=n$。各 $x$ は有限支なので $\sup_n|T_nx|<\infty$。一方 $s^{(m)}=(1,1/2,\dots,1/m,0,\dots)$ は Cauchy だが極限 $(1/n)\notin c_{00}$。従って $c_{00}$ は非完備で、Banach–Steinhaus の定義域 Banach 仮定が欠ける。

#### 採点基準（20点）
- 作用素ノルム: 5点
- pointwise bounded性: 4点
- 非完備性: 6点
- Baire機構との対応: 5点
<!-- solution-end -->

### FA1-B03 稠密集合上の収束を全空間へ延長

- Level: B
- 目安時間: 25分

$X$ をノルム空間、$Y$ を Banach 空間、$D\subset X$ を稠密集合とする。$T_n\in\mathcal L(X,Y)$ が

$$
M:=\sup_n\|T_n\|<\infty
$$

を満たし、各 $d\in D$ について $(T_nd)$ が $Y$ で収束するとする。このとき任意の $x\in X$ について $(T_nx)$ が収束することを示せ。

<!-- solution-start -->
#### 詳細解答

$x\in X$ と $\varepsilon>0$ を固定する。$D$ は稠密なので

$$
\|x-d\|<\frac{\varepsilon}{6M}
$$

となる $d\in D$ を取れる（$M=0$ なら自明）。$(T_nd)$ は収束するので Cauchy。従って十分大きい $m,n$ で

$$
\|T_nd-T_md\|<\frac\varepsilon3.
$$

すると

$$
\begin{aligned}
\|T_nx-T_mx\|
&\le\|T_n(x-d)\|+\|T_nd-T_md\|+\|T_m(d-x)\|\\
&\le2M\|x-d\|+\|T_nd-T_md\|\\
&<\frac\varepsilon3+\frac\varepsilon3
<\varepsilon.
\end{aligned}
$$

従って $(T_nx)$ は $Y$ の Cauchy 列。$Y$ は Banach なので極限が $Y$ 内に存在する。

この問題では $X$ の完備性は不要で、代わりに **あらかじめ得た一様作用素ノルム評価** と **値域 $Y$ の完備性** が働く。

#### 本番答案

$x$ に近い $d\in D$ を取り、

$$
\|T_nx-T_mx\|
\le2M\|x-d\|+\|T_nd-T_md\|
$$

と評価する。第1項は稠密性で、第2項は $D$ 上の収束で任意に小さくできる。よって $(T_nx)$ は Cauchy。$Y$ の完備性から収束する。

#### 採点基準（20点）
- 稠密点の選択: 5点
- 三項評価: 8点
- Cauchy性と値域完備性: 7点
<!-- solution-end -->

## C問題

### FA1-C01 一様非有界なら発散点はどの開球にもある

- Level: C
- 目安時間: 35分

$X$ を Banach、$Y$ をノルム空間、$T_n\in\mathcal L(X,Y)$ とし

$$
\sup_n\|T_n\|=\infty
$$

とする。任意の非空開集合 $U\subset X$ に、

$$
\sup_n\|T_nx\|=\infty
$$

を満たす $x\in U$ が存在することを示せ。

<!-- solution-start -->
#### 詳細解答

各 $m$ に対し

$$
E_m=\{x:\sup_n\|T_nx\|\le m\}
$$

と置く。各 $E_m$ は閉。

もしある $E_m$ が内部を持てば、ある球 $B(x_0,r)\subset E_m$ がある。$\|x\|\le1$ に対して $x_0\pm(r/2)x\in E_m$ だから

$$
r\|T_nx\|
\le2m
$$

が全 $n$ に対して成り立つ。よって

$$
\sup_n\|T_n\|\le2m/r<\infty,
$$

仮定に矛盾。従って全ての $E_m$ は閉かつ内部空。

ゆえに $G_m=X\setminus E_m$ は開稠密。Baire により

$$
G:=\bigcap_{m=1}^{\infty}G_m
$$

は稠密。したがって任意の非空開集合 $U$ と交わる。$x\in U\cap G$ を取ると、全ての $m$ について $x\notin E_m$、すなわちある $n$ が存在して $\|T_nx\|>m$。従って

$$
\sup_n\|T_nx\|=\infty.
$$

#### 本番答案

$E_m=\{x:\sup_n\|T_nx\|\le m\}$ は閉。もし $E_m$ が球 $B(x_0,r)$ を含めば、対称二点 $x_0\pm(r/2)x$ の差から $\sup_n\|T_n\|\le2m/r$ となり矛盾。従って $G_m=X\setminus E_m$ は開稠密。Baire より $\cap_mG_m$ は稠密なので任意の非空開 $U$ と交わり、その交点 $x$ では全 $m$ に対しある $n$ が $\|T_nx\|>m$ を満たす。よって $\sup_n\|T_nx\|=\infty$。

#### 採点基準（20点）
- $E_m$ の閉性: 4点
- 内部を持てば一様有界になる論証: 7点
- Baire適用: 5点
- 任意の開集合での結論: 4点
<!-- solution-end -->
