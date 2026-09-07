# MT1 標準測度論：関数列の収束様式・Egorov・Lusin

この章では、測度論で頻出する収束概念を「名前の一覧」ではなく、**どの仮定がどの矢印を成立させるか**まで追います。

```text
一様収束 → 各点収束 → a.e.収束
                         │  μ(X)<∞
                         ↓
                      測度収束
                         ↑
L^p収束 ────────────────┘   （1≤p<∞、有限測度不要）

測度収束 → a.e.収束する部分列   （有限測度不要）

a.e.収束 + μ(X)<∞ → Egorov：小測度集合を除けば一様収束
Lebesgue可測 f:E⊂R→R + λ(E)<∞ → Lusin：小測度集合を除けば連続
```

最後の Lusin だけは一般測度空間の定理ではありません。[MT0](../MT0/index.md) で正本化した **Lebesgue 測度の内正則性**を使います。

---

## 1. 四つの収束概念

測度空間 $(X,\mathcal F,\mu)$ 上の可測関数 $f_n,f:X\to\mathbb R$ を考えます。

<a id="def-mt1-pointwise"></a>
<!-- formal-statement-start -->
### 定義（各点収束）

$f_n$ が $f$ に各点収束するとは、

$$
\boxed{\forall x\in X\ \forall\varepsilon>0\ \exists N=N(x,\varepsilon)\ \forall n\ge N:
|f_n(x)-f(x)|<\varepsilon}
$$

が成り立つことをいう。
<!-- formal-statement-end -->

<a id="def-mt1-ae"></a>
<!-- formal-statement-start -->
### 定義（a.e.収束）

$f_n$ が $f$ に almost everywhere（a.e.）収束するとは、ある可測零集合 $N$ が存在して

$$
\boxed{\mu(N)=0,\qquad \forall x\in X\setminus N:\ f_n(x)\to f(x)}
$$

となることをいう。
<!-- formal-statement-end -->

<a id="def-mt1-in-measure"></a>
<!-- formal-statement-start -->
### 定義（測度収束 / convergence in measure）

$f_n$ が $f$ に測度収束するとは、

$$
\boxed{\forall\varepsilon>0:\quad
\mu\bigl(\{|f_n-f|>\varepsilon\}\bigr)\to0}
$$

となることをいう。
<!-- formal-statement-end -->

<a id="def-mt1-lp"></a>
<!-- formal-statement-start -->
### 定義（$L^p$収束）

$1\le p<\infty$ とする。$f_n-f\in L^p(\mu)$ で

$$
\boxed{\|f_n-f\|_p
=\left(\int_X|f_n-f|^p\,d\mu\right)^{1/p}\to0}
$$

となるとき、$f_n$ は $f$ に $L^p$ 収束するという。
<!-- formal-statement-end -->

### 量化順序の違い

各点収束では $N$ が点 $x$ に依存してよいのに対し、一様収束では

$$
\forall\varepsilon>0\ \exists N\ \forall x\in X\ \forall n\ge N
$$

の順です。Egorov の定理は、有限測度空間上の a.e. 収束から「小さい例外集合を一つ除けば、この量化順序を一様収束の形へ入れ替えられる」と読むと本質が見えます。

---

## 測度の上からの連続性：有限測度性が必要な場所を先に閉じる

後で a.e.収束、Egorov、Lusin を扱うとき、減少する可測集合列の測度を極限へ通します。既存 D2 では[下からの連続性](../F0_00D2_測度_可測関数_Lebesgue積分_Lp/index.md#thm-f0-00d2-01)までを証明しているので、必要な上からの連続性をここでそこから導きます。

<a id="thm-mt1-continuity-from-above-finite"></a>
<!-- formal-statement-start -->
### 補題（測度の上からの連続性）

測度空間 $(X,\mathcal F,\mu)$ の可測集合列 $(A_n)$ が

$$
A_1\supset A_2\supset\cdots,
\qquad
A=\bigcap_{n=1}^{\infty}A_n
$$

を満たし、さらに

$$
\mu(A_1)<\infty
$$

とする。このとき

$$
\boxed{\mu(A_n)\downarrow\mu(A)}.
$$
<!-- formal-statement-end -->

### 証明の見取り図

減少列を直接扱う代わりに、最初の有限測度集合 $A_1$ の中で補集合を取り

$$
B_n=A_1\setminus A_n
$$

とします。すると $B_n\uparrow A_1\setminus A$ なので D2 の下からの連続性を使えます。$\mu(A_1)<\infty$ は、最後に $\mu(A_1)$ から差し引くために必要です。

<!-- proof-start -->
### 証明

$$
B_n=A_1\setminus A_n
$$

と置くと

$$
B_1\subset B_2\subset\cdots,
\qquad
\bigcup_{n=1}^{\infty}B_n
=A_1\setminus A.
$$

[下からの連続性](../F0_00D2_測度_可測関数_Lebesgue積分_Lp/index.md#thm-f0-00d2-01)より

$$
\mu(B_n)\uparrow\mu(A_1\setminus A).
$$

$A_n$ と $B_n$ は互いに素で $A_1=A_n\sqcup B_n$ だから

$$
\mu(A_1)=\mu(A_n)+\mu(B_n).
$$

$\mu(A_1)<\infty$ なので

$$
\mu(A_n)=\mu(A_1)-\mu(B_n)
\to
\mu(A_1)-\mu(A_1\setminus A)
=\mu(A).
$$

また $(A_n)$ は減少列なので $(\mu(A_n))$ も減少列です。従って

$$
\mu(A_n)\downarrow\mu(A).
$$

$\square$
<!-- proof-end -->

この補題で有限測度性を外せないことは、$A_n=[n,\infty)$ とすれば分かります。$A_n\downarrow\varnothing$ ですが全ての $n$ で $\lambda(A_n)=\infty$ です。

---

## 2. $L^p$収束なら測度収束する

<a id="thm-mt1-lp-implies-measure"></a>
<!-- formal-statement-start -->
### 定理（$L^p$収束 $\Rightarrow$ 測度収束）

$1\le p<\infty$ とする。$f_n\to f$ in $L^p$ なら $f_n\to f$ in measure である。

この含意に $\mu(X)<\infty$ は不要である。
<!-- formal-statement-end -->

<!-- proof-start -->
### 証明

任意の $\varepsilon>0$ を固定し、

$$
E_n=\{|f_n-f|>\varepsilon\}
$$

と置きます。$E_n$ 上では $|f_n-f|^p>\varepsilon^p$ なので

$$
\varepsilon^p1_{E_n}\le |f_n-f|^p.
$$

両辺を積分して

$$
\varepsilon^p\mu(E_n)
\le
\int_X|f_n-f|^p\,d\mu
=\|f_n-f\|_p^p.
$$

従って

$$
\boxed{
\mu(E_n)
\le\varepsilon^{-p}\|f_n-f\|_p^p
\to0.}
$$

ここで使ったのは積分による Chebyshev 型評価だけで、$X$ 全体の測度が有限であることは使っていません。$\square$
<!-- proof-end -->

---

## 3. 有限測度なら a.e.収束から測度収束が従う

<a id="thm-mt1-ae-implies-measure-finite"></a>
<!-- formal-statement-start -->
### 定理（有限測度空間で a.e.収束 $\Rightarrow$ 測度収束）

$\mu(X)<\infty$ とする。$f_n\to f$ a.e. なら $f_n\to f$ in measure である。
<!-- formal-statement-end -->

### 証明の見取り図

固定した $\varepsilon>0$ に対し、その時点以降に一度でも誤差が $\varepsilon$ を超える点を

$$
A_N=\bigcup_{n\ge N}\{|f_n-f|>\varepsilon\}
$$

とまとめます。a.e.収束は $A_N\downarrow$ の極限が零集合になることを意味します。有限測度性は、**この減少列へ[測度の上からの連続性](#thm-mt1-continuity-from-above-finite)を適用するため**に使います。

<!-- proof-start -->
### 証明

任意の $\varepsilon>0$ を固定し、

$$
E_n=\{|f_n-f|>\varepsilon\},
\qquad
A_N=\bigcup_{n\ge N}E_n
$$

と置きます。すると

$$
A_1\supset A_2\supset\cdots,
\qquad
\bigcap_{N=1}^\infty A_N
=\limsup_{n\to\infty}E_n.
$$

a.e.収束する点では、固定した $\varepsilon$ に対して $E_n$ に入るのは有限回だけです。従って

$$
\mu\left(\bigcap_NA_N\right)=0.
$$

また

$$
\mu(A_1)\le\mu(X)<\infty.
$$

よって[測度の上からの連続性](#thm-mt1-continuity-from-above-finite)により

$$
\mu(A_N)\downarrow0.
$$

$E_N\subset A_N$ だから

$$
0\le\mu(E_N)\le\mu(A_N)\to0.
$$

$\varepsilon>0$ は任意だったので測度収束です。$\square$
<!-- proof-end -->

### 有限測度性を外すと壊れる

$X=\mathbb R$、Lebesgue 測度として

$$
f_n=1_{[n,n+1]}
$$

とします。各 $x$ は十分大きい $n$ で $[n,n+1]$ の外にいるので $f_n(x)\to0$。したがって各点収束します。

しかし $0<\varepsilon<1$ なら

$$
\lambda(\{|f_n|>\varepsilon\})=1
$$

で、測度収束しません。

失われた機構は明確です。$A_N=[N,\infty)$ の測度が最初から無限大なので、減少列 $A_N\downarrow\varnothing$ に対して上からの連続性を使えません。

---

## 4. 測度収束なら a.e.収束する部分列を取れる

<a id="thm-mt1-measure-subsequence-ae"></a>
<!-- formal-statement-start -->
### 定理（測度収束から a.e.収束部分列）

$f_n\to f$ in measure とする。このとき部分列 $(f_{n_k})$ が存在して

$$
\boxed{f_{n_k}\to f\quad\text{a.e.}}
$$

となる。

この定理に $\mu(X)<\infty$ は不要である。
<!-- formal-statement-end -->

### 証明の見取り図

測度収束から、誤差 $2^{-k}$ を超える集合の測度も $2^{-k}$ 未満になる時点 $n_k$ を選びます。悪い集合を

$$
E_k=\{|f_{n_k}-f|>2^{-k}\}
$$

とすれば $\sum_k\mu(E_k)<\infty$。尾部和を直接評価して、無限回悪い集合に入る点の集合を零集合にします。

ここでは「全空間の測度が有限」も「上からの連続性」も不要です。

<!-- proof-start -->
### 証明

測度収束より各 $k\ge1$ について十分大きい $n$ では

$$
\mu(\{|f_n-f|>2^{-k}\})<2^{-k}.
$$

従って帰納的に

$$
n_1<n_2<\cdots
$$

を選び、

$$
E_k:=\{|f_{n_k}-f|>2^{-k}\},
\qquad
\mu(E_k)<2^{-k}
$$

とできます。

無限回 $E_k$ に入る点の集合は

$$
E_\infty
:=\limsup_{k\to\infty}E_k
=\bigcap_{m=1}^\infty\bigcup_{k\ge m}E_k.
$$

各 $m$ について可算劣加法性から

$$
\mu(E_\infty)
\le
\mu\left(\bigcup_{k\ge m}E_k\right)
\le
\sum_{k\ge m}\mu(E_k)
<
\sum_{k\ge m}2^{-k}
=2^{1-m}.
$$

右辺は $m\to\infty$ で0なので

$$
\mu(E_\infty)=0.
$$

$x\notin E_\infty$ なら、ある $m(x)$ 以降は全て $x\notin E_k$ です。従って十分大きい $k$ で

$$
|f_{n_k}(x)-f(x)|\le2^{-k}\to0.
$$

よって $f_{n_k}\to f$ a.e. $\square$
<!-- proof-end -->

### 逆に、列全体が a.e.収束するとは限らない

$[0,1)$ を考えます。$2^k\le n<2^{k+1}$ のとき $j=n-2^k$ と置き、

$$
f_n
=1_{[j/2^k,(j+1)/2^k)}
$$

とします。同じ $k$ のブロックでは $[0,1)$ を長さ $2^{-k}$ の区間が順番に一周します。

従って

$$
\lambda(\{|f_n|>1/2\})=2^{-k}\to0,
$$

なので $f_n\to0$ in measure です。

しかし各 $x\in[0,1)$ は**各ブロックでちょうど一回** $f_n(x)=1$ となり、それ以外では0です。従って列全体はどの $x\in[0,1)$ でも0へ収束しません。

測度収束は「各 $n$ の悪い集合が小さい」ことしか言わず、悪い集合が点の上を移動し続けることを禁止しません。部分列定理は、悪い集合の測度を可算和可能な速さまで薄くして、この移動を止める仕組みです。

---

## 5. a.e.収束と $L^p$収束は別物

有限測度空間でも a.e.収束だけから $L^p$収束は従いません。$[0,1]$ 上で

$$
f_n(x)=n^{1/p}1_{(0,1/n)}(x)
$$

とすると $f_n\to0$ a.e. ですが

$$
\|f_n\|_p^p
=\int_0^{1/n}n\,dx
=1.
$$

従って $L^p$収束しません。

失われているのは「高さの暴走を積分可能な形で抑える機構」です。[DCT](../F0_00D2B_単調収束_Fatou_優収束/index.md) の支配関数や、一様可積分性のような追加条件が必要になる理由がここにあります。

---

## 6. Egorov の定理

<a id="thm-mt1-egorov"></a>
<!-- formal-statement-start -->
### 定理（Egorov）

$E\in\mathcal F$、$\mu(E)<\infty$ とし、可測関数 $f_n,f:E\to\mathbb R$ が

$$
f_n\to f\quad\text{a.e. on }E
$$

を満たすとする。このとき任意の $\varepsilon>0$ に対して可測集合 $B\subset E$ が存在し、

$$
\mu(B)<\varepsilon
$$

かつ

$$
\boxed{f_n\to f\quad\text{uniformly on }E\setminus B}
$$

となる。
<!-- formal-statement-end -->

### 証明の見取り図

誤差水準 $1/m$ ごとに

$$
A_{m,N}
=
\bigcup_{n\ge N}\{|f_n-f|\ge1/m\}
$$

を作ります。a.e.収束により、零集合を除けば $N\to\infty$ でこれらは空へ縮みます。有限測度性により[上からの連続性](#thm-mt1-continuity-from-above-finite)を使い、各 $m$ について測度の小さい尾部を一つ選びます。最後に $m$ 全体の悪い集合を $\varepsilon/2^m$ で予算配分して除きます。

<!-- proof-start -->
### 証明

まず零集合 $N_0\subset E$ を除けば全ての $x\in E\setminus N_0$ で $f_n(x)\to f(x)$ としてよいです。

$m,N\ge1$ に対して

$$
A_{m,N}
=
\bigcup_{n\ge N}
\left\{x\in E\setminus N_0:|f_n(x)-f(x)|\ge\frac1m\right\}
$$

と置きます。$N$ について

$$
A_{m,1}\supset A_{m,2}\supset\cdots.
$$

各点で収束するので

$$
\bigcap_{N=1}^\infty A_{m,N}=\varnothing.
$$

また $A_{m,1}\subset E$ だから

$$
\mu(A_{m,1})\le\mu(E)<\infty.
$$

従って[上からの連続性](#thm-mt1-continuity-from-above-finite)より

$$
\mu(A_{m,N})\downarrow0\qquad(N\to\infty).
$$

各 $m$ について $N_m$ を

$$
\mu(A_{m,N_m})<\frac{\varepsilon}{2^{m+1}}
$$

となるように選びます。そして

$$
B=N_0\cup\bigcup_{m=1}^\infty A_{m,N_m}
$$

と置けば

$$
\mu(B)
\le\sum_{m=1}^\infty\frac{\varepsilon}{2^{m+1}}
<\varepsilon.
$$

$x\in E\setminus B$ なら、各 $m$ について $x\notin A_{m,N_m}$ です。従って

$$
n\ge N_m
\quad\Longrightarrow\quad
|f_n(x)-f(x)|<\frac1m
$$

が **全ての** $x\in E\setminus B$ について同時に成り立ちます。

任意の $\delta>0$ に対して $1/m<\delta$ となる $m$ を選べば、$n\ge N_m$ で

$$
\sup_{x\in E\setminus B}|f_n(x)-f(x)|<\delta.
$$

よって一様収束です。$\square$
<!-- proof-end -->

### 有限測度性は本当に必要

$E=\mathbb R$ で

$$
f_n=1_{[n,\infty)}
$$

とすると各点で $f_n\to0$ です。しかし $\mu(B)<\infty$ の集合を一つ除いて一様収束することはできません。

もし $\mathbb R\setminus B$ 上で一様収束するなら、ある $N$ 以降は

$$
\sup_{x\notin B}f_N(x)<\frac12
$$

でなければなりません。$f_N$ は0か1しか取らないので、これは $[N,\infty)\subset B$ を意味しますが、その集合は無限測度です。矛盾です。

---

## 7. Lusin の定理

Egorov が「a.e.収束をほぼ一様収束へ改善する」定理なら、Lusin は「可測関数をほぼ連続関数として見る」定理です。

ここからは一般測度空間ではなく、**実数直線上の Lebesgue 測度**へ戻ります。

<a id="thm-mt1-lusin"></a>
<!-- formal-statement-start -->
### 定理（Lusin）

$E\subset\mathbb R$ を Lebesgue 可測集合、$\lambda(E)<\infty$ とし、

$$
f:E\to\mathbb R
$$

を実数値 Lebesgue 可測関数とする。このとき任意の $\varepsilon>0$ に対して compact 集合 $K\subset E$ が存在し、

$$
\boxed{\lambda(E\setminus K)<\varepsilon}
$$

かつ

$$
\boxed{f|_K:K\to\mathbb R\text{ は連続}}
$$

となる。
<!-- formal-statement-end -->

### 7.1 最初に大値部分を捨てる

$f$ は実数値ですが有界とは限りません。

$$
H_M=\{x\in E:|f(x)|>M\}
$$

と置くと、$f(x)\in\mathbb R$ なので

$$
H_M\downarrow\varnothing\qquad(M\to\infty).
$$

ここで $\lambda(E)<\infty$ だから[上からの連続性](#thm-mt1-continuity-from-above-finite)を使えて

$$
\lambda(H_M)\downarrow0.
$$

従って $M$ を十分大きく取れば

$$
\lambda(H_M)<\frac\varepsilon2.
$$

$$
F=E\setminus H_M
$$

と置けば、$f|_F$ は有界です。

この切断が必要です。**一般の非有界可測関数を有限値単関数で一様近似することはできません。**

### 7.2 有界部分を有限単関数で一様近似する

[MT0 の有限単関数一様近似](../MT0/index.md#thm-mt0-bounded-simple-uniform) により、有限値可測単関数 $s_n:F\to\mathbb R$ を

$$
\|s_n-f\|_{L^\infty(F)}<2^{-n}
$$

となるように取れます。

各 $n$ で

$$
s_n=\sum_{j=1}^{r_n}a_{n,j}1_{A_{n,j}}
$$

と、$F$ の有限可測分割 $A_{n,1},\ldots,A_{n,r_n}$ を使って表します。

### 7.3 各単関数を大部分で連続にする

$\delta_n=\varepsilon/2^{n+1}$ とします。[MT0 の有限分割のコンパクト近似](../MT0/index.md#cor-mt0-finite-partition-compactification) により、各 $A_{n,j}$ の中に compact 集合 $K_{n,j}$ を取り、

$$
\sum_{j=1}^{r_n}\lambda(A_{n,j}\setminus K_{n,j})<\delta_n
$$

とできます。

$$
K_n=\bigcup_{j=1}^{r_n}K_{n,j}
$$

と置けば $K_n$ は compact で

$$
\lambda(F\setminus K_n)<\delta_n.
$$

しかも $s_n|_{K_n}$ は連続です。実際、$K_{n,j}$ は互いに素な compact 集合です。有限個しかないので、異なる二集合間の距離の最小値は正です。従って各 $K_{n,j}$ は $K_n$ の相対位相で開かつ閉になり、$s_n$ は各相対開集合 $K_{n,j}$ 上で定数です。

### 7.4 一つの compact 集合にまとめる

$$
K=\bigcap_{n=1}^\infty K_n
$$

と置きます。$K\subset K_1$ で、各 $K_n$ は閉だから $K$ は compact です。また

$$
F\setminus K
=
\bigcup_{n=1}^\infty(F\setminus K_n),
$$

従って

$$
\lambda(F\setminus K)
\le
\sum_{n=1}^\infty\delta_n
=
\frac\varepsilon2.
$$

大値部分と合わせて

$$
\lambda(E\setminus K)
\le
\lambda(E\setminus F)+\lambda(F\setminus K)
<\frac\varepsilon2+\frac\varepsilon2
=\varepsilon.
$$

各 $s_n|_K$ は $s_n|_{K_n}$ の制限なので連続です。さらに

$$
\sup_{x\in K}|s_n(x)-f(x)|
\le
\sup_{x\in F}|s_n(x)-f(x)|
<2^{-n},
$$

したがって $s_n|_K\to f|_K$ は一様収束します。連続関数列の一様極限は連続なので $f|_K$ は連続です。

これで Lusin の定理が証明されました。$\square$

### どこで何を使ったか

- $\lambda(E)<\infty$：非有界な $f$ の大値部分 $\{|f|>M\}$ を小測度へ追い出すため。その論証はこの章で導いた[上からの連続性](#thm-mt1-continuity-from-above-finite)を使う。
- $f$ の可測性：大値集合と有限単関数のレベル集合を可測にするため。
- [MT0 の一様近似](../MT0/index.md#thm-mt0-bounded-simple-uniform)：$f$ を有限個のレベル集合へ落とすため。ここ自体には有限測度性不要。
- [Lebesgue 測度の内正則性](../MT0/index.md#thm-mt0-inner-regularity-finite)：各レベル集合をほとんど失わず compact に縮めるため。
- compact 性：有限個の互いに素な compact レベル集合を正の距離で分離し、単関数の制限を連続にするため。
- 一様収束：連続な $s_n|_K$ の極限 $f|_K$ の連続性を得るため。

### 例：Dirichlet関数でも Lusin は壊れない

$E=[0,1]$、

$$
f=1_{\mathbb Q\cap[0,1]}
$$

とします。$f$ は $[0,1]$ の全点で不連続です。それでも Lusin に矛盾しません。

$A=[0,1]\setminus\mathbb Q$ は測度1です。[内正則性](../MT0/index.md#thm-mt0-inner-regularity-finite)により、任意の $\varepsilon>0$ に対して compact $K\subset A$ で

$$
\lambda(K)>1-\varepsilon
$$

とできます。$K$ 上では $f\equiv0$ なので $f|_K$ は連続です。

Lusin が言う「連続」は、元の $E$ 上での連続性ではなく **残した compact 集合 $K$ の相対位相での連続性**です。

---

## 8. 含意図を反例込みで読む

有限測度空間では

$$
a.e.\Longrightarrow in\ measure,
$$

一般の測度空間では

$$
L^p\Longrightarrow in\ measure,
\qquad
in\ measure\Longrightarrow a.e.\text{ convergent subsequence}.
$$

しかし逆向きは一般には成り立ちません。

| 成り立たない逆向き | 反例 | 失われる機構 |
|---|---|---|
| in measure $\Rightarrow$ a.e.（列全体） | dyadic typewriter | 悪い集合が点の上を移動できる |
| a.e. $\Rightarrow L^p$ | $n^{1/p}1_{(0,1/n)}$ | 高さ・積分質量の制御がない |
| a.e. $\Rightarrow$ in measure（無限測度） | $1_{[n,n+1]}$ on $\mathbb R$ | 上からの連続性に必要な有限性がない |
| Egorov（無限測度） | $1_{[n,\infty)}$ on $\mathbb R$ | 一様化に除くべき尾部が無限測度 |

反例は「結論が偽」というだけでなく、証明のどの歯車が失われたかまで対応させて覚えると再利用できます。

---

## 9. 練習問題

### 問1

$f_n\to f$ in measure とする。任意の部分列 $(f_{n_j})$ から、さらに a.e. で $f$ に収束する部分列を取れることを示してください。

### 解答

元の列が測度収束するなら任意の部分列も測度収束します。実際、固定した $\varepsilon>0$ について

$$
\mu(|f_{n_j}-f|>\varepsilon)
$$

は元の数列 $\mu(|f_n-f|>\varepsilon)\to0$ の部分列だから0へ収束します。従って [測度収束から a.e.収束部分列を取る定理](#thm-mt1-measure-subsequence-ae) を $(f_{n_j})$ に適用すればよいです。

### 問2

Egorov の証明で、$m$ ごとに単に $\mu(A_{m,N_m})<\varepsilon$ と選ぶだけでは不十分な理由を説明してください。

### 解答

最終的には全ての精度 $1/m$ に対応する悪い集合を

$$
\bigcup_{m=1}^\infty A_{m,N_m}
$$

として一度に除きます。各集合の測度を $\varepsilon$ 未満としか抑えなければ、その可算和は有限とは限りません。そこで

$$
\mu(A_{m,N_m})<\varepsilon2^{-(m+1)}
$$

のように可算和可能な予算を割り振り、合計を $\varepsilon$ 未満にします。

### 問3

Lusin の証明で、一つの有限単関数 $s$ を $f$ に近づけて、その $s$ が連続になる大きな compact 集合を取るだけではなぜ不十分でしょうか。

### 解答

一つの $s$ について得られるのは

$$
\|f-s\|_\infty<\eta
$$

という近似であって、$f$ 自身の連続性ではありません。連続関数に一様に「近い」だけの関数は連続とは限りません。$\eta\to0$ となる**列** $s_n$ を用意し、それら全てが連続になる一つの compact 集合 $K$ を作って、最後に「連続関数列の一様極限は連続」を使う必要があります。
