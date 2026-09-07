# MT0 標準測度論：Lebesgue測度の正則性と有限単関数近似

[F0-00D2A](../F0_00D2A_単関数_Lebesgue積分_構成/index.md) では一般の非負可測関数を単関数で**下から単調に**近似しました。[F0-00D4](../F0_00D4_Lebesgue測度_Borel集合_拡張定理/index.md) では実数直線上の Lebesgue 測度を構成しました。

この章では、後続の Lusin の定理で必要になる二つの道具を正本化します。

```text
有界可測関数
  ↓ 値域を有限個の区間に切る
有限値単関数による一様近似

Lebesgue可測集合 A⊂R, λ(A)<∞
  ↓ 外側から開集合で近似
外正則性
  ↓ 有界区間内で補集合を取る
内正則性：内側からコンパクト集合で近似
```

重要なのは、**この二つは別の仮定を使う**ことです。有限値単関数による一様近似には測度の有限性すら不要です。一方、ここで証明する内正則性は実数直線上の Lebesgue 測度の構造を使います。

---

## 1. 有界可測関数は有限値単関数で一様近似できる

<a id="thm-mt0-bounded-simple-uniform"></a>
<!-- formal-statement-start -->
### 定理（有界可測関数の有限単関数による一様近似）

可測空間 $(X,\mathcal F)$ 上の有界可測関数

$$
f:X\to\mathbb R
$$

に対し、任意の $\varepsilon>0$ について有限個の値しか取らない可測単関数 $s$ が存在して

$$
\boxed{\sup_{x\in X}|f(x)-s(x)|<\varepsilon}
$$

となる。

したがって、有限値単関数列 $(s_n)$ を

$$
\|f-s_n\|_\infty\to0
$$

となるように取れる。
<!-- formal-statement-end -->

### 証明の見取り図

$f$ が有界なら値域は有限区間 $[-M,M]$ に入ります。この有限区間を幅 $\varepsilon$ 未満の有限個の小区間に切り、各点 $x$ で $f(x)$ が入った区間の左端を $s(x)$ とします。

- 小区間は有限個なので $s$ は有限個の値しか取らない。
- 各レベル集合は $f$ による区間の逆像なので可測。
- 同じ小区間の中で丸めるので誤差は一様に $\varepsilon$ 未満。

ここでは $\mu(X)<\infty$ のような測度条件を一切使いません。

<!-- proof-start -->
### 証明

$|f|\le M$ とします。$N\in\mathbb N$ を

$$
\frac{2M}{N}<\varepsilon
$$

となるように取り、

$$
t_j=-M+\frac{2Mj}{N}\qquad(j=0,\ldots,N)
$$

と置きます。$j=0,\ldots,N-2$ について

$$
A_j=\{x:t_j\le f(x)<t_{j+1}\},
$$

最後だけ

$$
A_{N-1}=\{x:t_{N-1}\le f(x)\le t_N\}
$$

とします。$f$ は可測なので全ての $A_j$ は可測で、これらは $X$ を有限分割します。

そこで

$$
s(x)=\sum_{j=0}^{N-1}t_j1_{A_j}(x)
$$

と定めます。$s$ は有限値可測単関数です。$x\in A_j$ なら

$$
0\le f(x)-s(x)\le t_{j+1}-t_j=\frac{2M}{N}<\varepsilon,
$$

最後の区間でも同じ評価が成り立ちます。従って

$$
\sup_{x\in X}|f(x)-s(x)|<\varepsilon.
$$

$\varepsilon=2^{-n}$ として各 $n$ で $s_n$ を選べば $\|f-s_n\|_\infty\to0$ です。$\square$
<!-- proof-end -->

### 何が D2A の単調近似と違うか

[D2A の単関数近似](../F0_00D2A_単関数_Lebesgue積分_構成/index.md#thm-simple-function-approximation) は非負可測関数 $f$ に対して

$$
0\le\phi_n\uparrow f
$$

を作る定理です。非有界な $f$ まで扱えますが、一般には $\|f-\phi_n\|_\infty\to0$ とは限りません。

一方この章の定理は **有界性**と引き換えに一様近似を得ます。Lusin の証明で必要なのはこちらです。

---

## 2. Lebesgue測度の外正則性

以後は $(\mathbb R,\mathcal L,\lambda)$ を [D4](../F0_00D4_Lebesgue測度_Borel集合_拡張定理/index.md) で構成した Lebesgue 測度空間とします。

<a id="thm-mt0-outer-regularity-finite"></a>
<!-- formal-statement-start -->
### 定理（有限測度 Lebesgue 可測集合の外正則性）

$A\in\mathcal L$ が $\lambda(A)<\infty$ を満たすとする。このとき任意の $\varepsilon>0$ に対して開集合 $G\supset A$ が存在し、

$$
\boxed{\lambda(G\setminus A)<\varepsilon}
$$

となる。
<!-- formal-statement-end -->

<!-- proof-start -->
### 証明

Lebesgue 外測度の定義から、任意の $\varepsilon>0$ に対し開区間列 $(I_n)$ を

$$
A\subset\bigcup_{n=1}^\infty I_n,
\qquad
\sum_{n=1}^\infty |I_n|<\lambda(A)+\varepsilon
$$

となるように取れます。$G=\bigcup_n I_n$ と置けば $G$ は開で $A\subset G$ です。

外測度の劣加法性と、各区間の測度がその長さに等しいことから

$$
\lambda(G)\le\sum_n\lambda(I_n)=\sum_n|I_n|<\lambda(A)+\varepsilon.
$$

$A$ と $G\setminus A$ は互いに素な可測集合で $G=A\sqcup(G\setminus A)$ だから

$$
\lambda(G)=\lambda(A)+\lambda(G\setminus A).
$$

$\lambda(A)<\infty$ なので有限量を差し引けて、

$$
\lambda(G\setminus A)<\varepsilon.
$$

$\square$
<!-- proof-end -->

ここで有限測度性を使った場所は最後の差の計算です。$\infty<\infty+\varepsilon$ という形では情報が得られません。

---

## 3. Lebesgue測度の内正則性

<a id="thm-mt0-inner-regularity-finite"></a>
<!-- formal-statement-start -->
### 定理（有限測度 Lebesgue 可測集合の内正則性）

$A\in\mathcal L$ が $\lambda(A)<\infty$ を満たすとする。このとき任意の $\varepsilon>0$ に対してコンパクト集合 $K\subset A$ が存在し、

$$
\boxed{\lambda(A\setminus K)<\varepsilon}
$$

となる。
<!-- formal-statement-end -->

### 証明の見取り図

いきなり $A^c$ を外側から近似すると $A^c$ の測度が無限大かもしれません。そこで先に $A$ の遠方部分を小さくして、有限区間 $[-R,R]$ の中へほとんど全てを入れます。

その有限区間の中で

$$
C=[-R,R]\setminus A
$$

を開集合で外側から近似し、その補集合を取ればコンパクト集合が得られます。

<!-- proof-start -->
### 証明

$A_R=A\cap[-R,R]$ とします。$R\uparrow\infty$ で

$$
A_R\uparrow A.
$$

[D2 の測度の下からの連続性](../F0_00D2_測度_可測関数_Lebesgue積分_Lp/index.md#thm-f0-00d2-01)より

$$
\lambda(A_R)\uparrow\lambda(A).
$$

$\lambda(A)<\infty$ なので、十分大きい $R$ を取れば

$$
\lambda(A\setminus A_R)=\lambda(A)-\lambda(A_R)<\frac\varepsilon2.
$$

$H=[-R,R]$、$C=H\setminus A_R$ と置きます。$C$ は有限測度の Lebesgue 可測集合です。[外正則性](#thm-mt0-outer-regularity-finite)より、開集合 $G\supset C$ を

$$
\lambda(G\setminus C)<\frac\varepsilon2
$$

となるように取れます。

$$
K=H\setminus G
$$

と置きます。$H$ はコンパクトで $G$ は開なので $K$ はコンパクトです。また $C\subset G$ だから

$$
K\subset H\setminus C=A_R\subset A.
$$

さらに

$$
A_R\setminus K=A_R\cap G\subset G\setminus C,
$$

従って

$$
\lambda(A\setminus K)
\le
\lambda(A\setminus A_R)+\lambda(A_R\setminus K)
<\frac\varepsilon2+\frac\varepsilon2
=\varepsilon.
$$

$\square$
<!-- proof-end -->

### 系：有限個の可測集合を同時にコンパクト化する

<a id="cor-mt0-finite-partition-compactification"></a>
<!-- formal-statement-start -->
### 系（有限可測分割のコンパクト近似）

$A_1,\ldots,A_m\subset\mathbb R$ が互いに素な Lebesgue 可測集合で、それぞれ有限測度とする。任意の $\delta>0$ に対し、コンパクト集合 $K_j\subset A_j$ を

$$
\sum_{j=1}^m\lambda(A_j\setminus K_j)<\delta
$$

となるように取れる。
<!-- formal-statement-end -->

<!-- proof-start -->
### 証明

各 $j$ に [内正則性](#thm-mt0-inner-regularity-finite) を $\delta/m$ で適用して

$$
\lambda(A_j\setminus K_j)<\frac\delta m
$$

となるコンパクト $K_j\subset A_j$ を取ります。有限和を取れば結論です。$\square$
<!-- proof-end -->

この系は Lusin の証明で、有限値単関数の各レベル集合を「ほとんど失わずコンパクト集合へ縮める」ために使います。

---

## 4. 例：巨大で形の悪い可測集合でも内側から compact にできる

$A=[0,1]\setminus\mathbb Q$ とします。$A$ は開でも閉でもありませんが、

$$
\lambda(A)=1.
$$

内正則性により任意の $\varepsilon>0$ に対して compact $K\subset A$ で

$$
\lambda(K)>1-\varepsilon
$$

となるものが存在します。

ここで重要なのは、$K$ が区間である必要はないことです。稠密な可算集合 $\mathbb Q$ を完全に避けながら、測度では $[0,1]$ のほとんど全てを残せます。

---

## 5. 練習問題

### 問1

$f:X\to\mathbb R$ が可測だが非有界であるとき、「有限値単関数 $s_n$ が $f$ に一様収束する」と一般には言えない理由を示してください。

### 解答

各 $s_n$ は有限個の実数値しか取らないので有界です。もしある $s_n$ について

$$
\|f-s_n\|_\infty<1
$$

なら

$$
|f(x)|\le |s_n(x)|+1
$$

が全ての $x$ で成り立ち、$f$ も有界になって矛盾します。従って非有界関数を有限値単関数で一様近似することはできません。

### 問2

内正則性の証明で、なぜ最初から $A^c$ に外正則性を適用しなかったのでしょうか。

### 解答

$A$ が有限測度でも $A^c$ は無限測度かもしれず、この章で証明した外正則性は有限測度集合に対する形だからです。先に $A$ の大部分を有限区間 $H=[-R,R]$ に閉じ込めると、$C=H\setminus A_R$ は自動的に有限測度になります。そこで初めて外正則性を適用し、$H$ の中で補集合を取ることで compact 集合を得ています。

---

## 6. 次章への橋

次の [MT1](../MT1/index.md) では、

- a.e. 収束
- 測度収束
- $L^p$ 収束
- Egorov の定理
- Lusin の定理

を扱います。

Lusin で使う依存はこの章の二本だけです。

1. 有界可測関数 $\Rightarrow$ 有限値単関数による一様近似。
2. 有限測度 Lebesgue 可測集合 $\Rightarrow$ 内側から compact 集合で任意精度に近似。

これらを暗黙の「よく知られた事実」として使わず、ここを正本として参照します。
