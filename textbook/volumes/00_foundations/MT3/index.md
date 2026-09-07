# MT3 標準測度論：Radon–Nikodym 定理・Lebesgue 分解

この章では、測度の絶対連続性を「零集合を共有する」という定性的条件から、

$$
\nu(E)=\int_E f\,d\mu
$$

という **密度による表示**へ引き上げます。

証明は関数解析の Riesz 表現定理を使いません。[MT2](../MT2/index.md) で構成した Hahn 分解を使い、測度論の内部だけで Radon–Nikodym 定理を証明します。

```text
MT2：Hahn–Jordan・全変動
          ↓
有限正測度版 Radon–Nikodym
          ↓
σ-finite 版へ局所化
          ↓
符号付き測度版
          ↓
変数測度の積分公式・chain rule
          ↓
Lebesgue 分解
```

---

## 1. σ-finite 性と Radon–Nikodym 微分

<a id="def-mt3-sigma-finite"></a>
<!-- formal-statement-start -->
### 定義（σ-finite 測度）

正の測度 $\mu$ が σ-finite であるとは、可測集合列 $(X_n)$ が存在して

$$
\boxed{
X=\bigcup_{n=1}^{\infty}X_n,
\qquad
\mu(X_n)<\infty\quad(n\ge1)}
$$

となることをいう。
<!-- formal-statement-end -->

有限測度は σ-finite ですが、逆は一般に成り立ちません。Lebesgue 測度は $\mathbb R=\bigcup_n[-n,n]$ により σ-finite です。

<a id="def-mt3-rn-derivative"></a>
<!-- formal-statement-start -->
### 定義（Radon–Nikodym 微分）

正の測度 $\nu,\mu$ に対し、可測関数 $f\ge0$ が

$$
\boxed{
\nu(E)=\int_E f\,d\mu
\qquad(E\in\mathcal F)}
$$

を満たすとき、$f$ を $\nu$ の $\mu$ に関する Radon–Nikodym 微分と呼び、

$$
\boxed{f=\frac{d\nu}{d\mu}}
$$

と書く。
<!-- formal-statement-end -->

密度は点ごとには一意でなく、$\mu$-a.e. の意味で一意です。

---

## 2. 有限正測度版 Radon–Nikodym 定理

最初に有限測度だけで核心を閉じます。ここが証明の本体です。

<a id="thm-mt3-rn-finite"></a>
<!-- formal-statement-start -->
### 定理（Radon–Nikodym：有限正測度版）

$\mu,\nu$ を $(X,\mathcal F)$ 上の有限正測度とし、

$$
\nu\ll\mu
$$

とする。このとき非負可測関数 $f$ が存在して

$$
\boxed{
\nu(E)=\int_E f\,d\mu
\qquad(E\in\mathcal F)}
$$

となる。

さらにこの $f$ は $\mu$-a.e. に一意であり、

$$
\int_X f\,d\mu=\nu(X)<\infty.
$$
<!-- formal-statement-end -->

### 証明の見取り図

「$\nu$ を超えない密度」を全部集めます。

$$
\mathcal C
=
\left\{
 f\ge0:\
 \int_E f\,d\mu\le\nu(E)\quad\forall E\in\mathcal F
\right\}.
$$

その中で全積分が最大になる $g$ を作ります。もし残差

$$
\lambda(E)=\nu(E)-\int_Eg\,d\mu
$$

が残っていれば、$\lambda-c\mu$ の Hahn 正集合上で $g$ を $c>0$ だけ持ち上げられ、最大性に矛盾します。

ここで Hahn 分解が **RN の前提**として働きます。

<!-- proof-start -->
### 証明

#### 2.1 候補密度の族

$$
\mathcal C
=
\left\{
 f:X\to[0,\infty]\text{ measurable}:
 \int_E f\,d\mu\le\nu(E)
 \text{ for every }E\in\mathcal F
\right\}
$$

と置きます。$0\in\mathcal C$ なので空ではありません。また $f\in\mathcal C$ なら $E=X$ として

$$
\int_Xf\,d\mu\le\nu(X)<\infty.
$$

従って

$$
\alpha
:=
sup_{f\in\mathcal C}\int_Xf\,d\mu
$$

は有限です。

#### 2.2 候補族は最大値を取っても閉じる

$f,g\in\mathcal C$ とし

$$
A=\{f\ge g\}
$$

と置きます。任意の $E\in\mathcal F$ に対し

$$
\int_E\max(f,g)\,d\mu
=
\int_{E\cap A}f\,d\mu
+
\int_{E\setminus A}g\,d\mu.
$$

$f,g\in\mathcal C$ なので

$$
\int_{E\cap A}f\,d\mu\le\nu(E\cap A),
$$

$$
\int_{E\setminus A}g\,d\mu\le\nu(E\setminus A).
$$

二つを足して

$$
\int_E\max(f,g)\,d\mu\le\nu(E),
$$

したがって

$$
\max(f,g)\in\mathcal C.
$$

#### 2.3 最大候補 $g$ を作る

$\alpha$ の定義から、各 $n$ について $f_n\in\mathcal C$ を

$$
\int_Xf_n\,d\mu>\alpha-2^{-n}
$$

となるように選びます。

$$
g_n=\max(f_1,\ldots,f_n)
$$

と置けば、前項から $g_n\in\mathcal C$ で、

$$
g_1\le g_2\le\cdots.
$$

また

$$
\alpha-2^{-n}
<
\int_Xf_n\,d\mu
\le
\int_Xg_n\,d\mu
\le\alpha.
$$

従って

$$
\int_Xg_n\,d\mu\to\alpha.
$$

$$
g=\lim_{n\to\infty}g_n
$$

と置きます。単調収束定理より

$$
\int_Xg\,d\mu
=
\lim_n\int_Xg_n\,d\mu
=
\alpha.
$$

さらに任意の $E$ について

$$
\int_Eg\,d\mu
=
\lim_n\int_Eg_n\,d\mu
\le\nu(E),
$$

よって $g\in\mathcal C$ です。つまり上限 $\alpha$ は実際に $g$ で達成されました。

#### 2.4 残差測度を0にする

$$
\rho(E)=\int_Eg\,d\mu,
\qquad
\lambda(E)=\nu(E)-\rho(E)
$$

と置きます。$g\in\mathcal C$ なので $\lambda(E)\ge0$。$\rho$ は有限正測度であり、有限測度の差の可算加法性から $\lambda$ も有限正測度です。

また $\mu(E)=0$ なら $\nu(E)=0$ かつ $\rho(E)=0$ なので

$$
\lambda\ll\mu.
$$

$\lambda(X)>0$ と仮定して矛盾を導きます。

$\mu(X)=0$ なら $\nu\ll\mu$ から $\nu(X)=0$、したがって $\lambda(X)=0$ なので、今は $\mu(X)>0$ としてよいです。$\mu(X)<\infty$ だから十分大きい $n$ を取れば

$$
c:=\frac1n,
\qquad
c\mu(X)<\lambda(X)
$$

となります。

有限符号付き測度

$$
\eta=\lambda-c\mu
$$

を考え、[MT2 の Hahn 分解](../MT2/index.md#thm-mt2-hahn)を

$$
X=P\sqcup N
$$

と取ります。$N$ は $\eta$ の負集合なので

$$
\eta(N)\le0.
$$

一方

$$
\eta(X)=\lambda(X)-c\mu(X)>0.
$$

したがって

$$
\eta(P)=\eta(X)-\eta(N)>0.
$$

もし $\mu(P)=0$ なら $\lambda\ll\mu$ から $\lambda(P)=0$ で、$\eta(P)=0$ となり矛盾です。よって

$$
\mu(P)>0.
$$

$P$ は $\eta$ の正集合なので、任意の可測 $A\subset P$ に対して

$$
\lambda(A)-c\mu(A)=\eta(A)\ge0.
$$

すなわち

$$
c\mu(A)\le\lambda(A).
$$

ここで

$$
h=g+c1_P
$$

と置きます。任意の $E$ に対して

$$
\begin{aligned}
\int_Eh\,d\mu
&=
\int_Eg\,d\mu+c\mu(E\cap P)\\
&\le
\rho(E)+\lambda(E\cap P)\\
&\le
\rho(E)+\lambda(E)\\
&=\nu(E).
\end{aligned}
$$

従って $h\in\mathcal C$ です。しかし

$$
\int_Xh\,d\mu
=
\int_Xg\,d\mu+c\mu(P)
>
\alpha,
$$

となり $\alpha$ の定義に矛盾します。

したがって

$$
\lambda(X)=0.
$$

$\lambda$ は正測度なので全ての $E$ で $0\le\lambda(E)\le\lambda(X)=0$、従って $\lambda=0$ です。よって

$$
\nu(E)=\rho(E)=\int_Eg\,d\mu
$$

が全ての可測 $E$ で成り立ちます。

#### 2.5 一意性

$f,g\ge0$ がともに

$$
\nu(E)=\int_Ef\,d\mu=
\int_Eg\,d\mu
$$

を満たすとします。

$$
A_n=\{f\ge g+1/n\}
$$

と置くと、$\nu(X)<\infty$ なので $f,g\in L^1(\mu)$ であり、

$$
\int_{A_n}f\,d\mu
\ge
\int_{A_n}g\,d\mu+rac1n\mu(A_n).
$$

左辺と第1項は仮定により等しいので

$$
\mu(A_n)=0.
$$

同様に

$$
B_n=\{g\ge f+1/n\}
$$

も零集合です。ところが

$$
\{f\ne g\}
=
\bigcup_{n=1}^{\infty}(A_n\cup B_n),
$$

したがって

$$
f=g\qquad\mu\text{-a.e.}
$$

です。$\square$
<!-- proof-end -->

### 証明で何が働いたか

- $\nu(X)<\infty$：候補密度の全積分の上限 $\alpha$ を有限にする。
- $\mu(X)<\infty$：残差 $\lambda(X)>0$ なら $c\mu(X)<\lambda(X)$ となる $c>0$ を選ぶ。
- $\nu\ll\mu$：Hahn 正集合 $P$ が $\mu(P)>0$ を持つことを保証する。
- Hahn 分解：残差が残る場所で $\lambda\ge c\mu$ となる領域を一度に取り出す。
- MCT：最大化列 $g_n\uparrow g$ の極限を候補族の中へ残す。

---

## 3. σ-finite 版 Radon–Nikodym 定理

有限版を局所化すれば、標準形が得られます。

<a id="thm-mt3-rn-sigma-finite"></a>
<!-- formal-statement-start -->
### 定理（Radon–Nikodym：σ-finite 版）

$\mu,\nu$ を σ-finite な正測度とし、

$$
\nu\ll\mu
$$

とする。このとき非負可測関数 $f$ が存在して

$$
\boxed{
\nu(E)=\int_Ef\,d\mu
\qquad(E\in\mathcal F)}
$$

となる。

$f$ は $\mu$-a.e. に一意である。
<!-- formal-statement-end -->

<!-- proof-start -->
### 証明

σ-finite 性から

$$
X=\bigcup_{i=1}^{\infty}A_i,
\qquad
\mu(A_i)<\infty,
$$

$$
X=\bigcup_{j=1}^{\infty}B_j,
\qquad
\nu(B_j)<\infty
$$

となる可測集合列を取ります。

可算族 $(A_i\cap B_j)_{i,j}$ を一列

$$
D_1,D_2,\ldots
$$

に並べ、

$$
C_1=D_1,
\qquad
C_k=D_k\setminus\bigcup_{r<k}D_r
$$

と置きます。すると $(C_k)$ は互いに素で

$$
X=\bigsqcup_{k=1}^{\infty}C_k,
$$

かつ各 $C_k$ について

$$
\mu(C_k)<\infty,
\qquad
\nu(C_k)<\infty.
$$

$C_k$ 上の制限測度に有限版 RN 定理を適用すると、$C_k$ 上の非負可測関数 $f_k$ が存在して

$$
\nu(E\cap C_k)
=
\int_{E\cap C_k}f_k\,d\mu
$$

となります。

$$
f(x)=f_k(x)\qquad(x\in C_k)
$$

と定めます。互いに素な可測分割上の貼り合わせなので $f$ は可測です。

任意の $E$ について

$$
\nu(E)
=
\sum_{k=1}^{\infty}\nu(E\cap C_k)
=
\sum_{k=1}^{\infty}
\int_{E\cap C_k}f_k\,d\mu.
$$

一方

$$
f1_E
=
\sum_{k=1}^{\infty}f_k1_{E\cap C_k}
$$

は非負関数の互いに素な和です。有限部分和に MCT を適用すれば

$$
\int_Ef\,d\mu
=
\sum_{k=1}^{\infty}
\int_{E\cap C_k}f_k\,d\mu.
$$

従って $\nu(E)=\int_Ef\,d\mu$。

一意性も各 $C_k$ 上の有限版一意性を使えばよいです。二つの密度 $f,g$ があれば、各 $C_k$ 上で

$$
f=g\qquad\mu\text{-a.e. on }C_k.
$$

可算個の零集合の和集合は零集合なので $f=g$ $\mu$-a.e. on $X$ です。$\square$
<!-- proof-end -->

### σ-finite 性を外すと失敗する

$X=[0,1]$ とし、$\mu$ を **非可算集合上の counting measure**、$\nu$ を Lebesgue 測度とします。

$\mu(E)=0$ となるのは $E=\varnothing$ だけなので

$$
\nu\ll\mu
$$

は成立します。しかし $\mu$ は σ-finite ではありません。実際、$\mu$-有限集合は有限集合であり、その可算和は高々可算だから $[0,1]$ を覆えません。

もし

$$
\nu(E)=\int_Ef\,d\mu
$$

となる $f$ があれば、各 $x\in[0,1]$ について

$$
0=\nu(\{x\})=
\int_{\{x\}}f\,d\mu=f(x).
$$

従って $f\equiv0$。すると

$$
1=\nu([0,1])
\ne
\int_{[0,1]}f\,d\mu=0,
$$

矛盾です。

σ-finite 性は単なる技術的飾りではなく、絶対連続性から密度表示へ移るための局所有限化を保証しています。

---

## 4. 変数測度での積分公式

RN 密度が得られると、集合の測度だけでなく一般の関数の積分も密度へ移せます。

<a id="thm-mt3-change-measure"></a>
<!-- formal-statement-start -->
### 定理（測度変更の積分公式）

$\nu\ll\mu$ で

$$
f=\frac{d\nu}{d\mu}
$$

とする。任意の非負可測関数 $h$ に対して

$$
\boxed{
\int_Xh\,d\nu
=
\int_Xhf\,d\mu.}
$$

さらに $h\in L^1(\nu)$ なら右辺も絶対可積分で同じ等式が成り立つ。
<!-- formal-statement-end -->

<!-- proof-start -->
### 証明

まず単関数

$$
s=\sum_{j=1}^{m}a_j1_{E_j},
\qquad a_j\ge0
$$

について

$$
\int s\,d\nu
=
\sum_ja_j\nu(E_j)
=
\sum_ja_j\int_{E_j}f\,d\mu
=
\int sf\,d\mu.
$$

一般の $h\ge0$ については非負単関数列 $s_n\uparrow h$ を取り、両方の測度に関する MCT を使って

$$
\int h\,d\nu
=
\lim_n\int s_n\,d\nu
=
\lim_n\int s_nf\,d\mu
=
\int hf\,d\mu.
$$

$h\in L^1(\nu)$ の場合は $h=h^+-h^-$ に分け、

$$
\int |h|f\,d\mu
=
\int |h|\,d\nu<\infty
$$

なので正負部分の差を取れます。$\square$
<!-- proof-end -->

<a id="thm-mt3-chain-rule"></a>
<!-- formal-statement-start -->
### 系（Radon–Nikodym 微分の chain rule）

$\lambda\ll\nu\ll\mu$ で、必要な測度が σ-finite とする。このとき

$$
\boxed{
\frac{d\lambda}{d\mu}
=
\frac{d\lambda}{d\nu}
\frac{d\nu}{d\mu}
\qquad\mu\text{-a.e.}}
$$
<!-- formal-statement-end -->

<!-- proof-start -->
### 証明

$$
f=\frac{d\nu}{d\mu},
\qquad
g=\frac{d\lambda}{d\nu}
$$

と置きます。任意の $E$ について[測度変更の積分公式](#thm-mt3-change-measure)より

$$
\lambda(E)
=
\int_Eg\,d\nu
=
\int_Egf\,d\mu.
$$

従って $gf$ は $\lambda$ の $\mu$ に関する RN 密度です。一意性から結論が従います。$\square$
<!-- proof-end -->

---

## 5. 有限符号付き測度版 Radon–Nikodym 定理

MT2 の Jordan 分解で正測度へ還元します。

<a id="thm-mt3-rn-signed"></a>
<!-- formal-statement-start -->
### 定理（Radon–Nikodym：有限符号付き測度版）

$\mu$ を σ-finite 正測度、$\nu$ を有限符号付き測度とし

$$
\nu\ll\mu
$$

とする。このとき $f\in L^1(\mu)$ が存在して

$$
\boxed{
\nu(E)=\int_Ef\,d\mu
\qquad(E\in\mathcal F)}
$$

となる。

$f$ は $\mu$-a.e. に一意であり、さらに

$$
\boxed{
|\nu|(E)=\int_E|f|\,d\mu.}
$$
<!-- formal-statement-end -->

<!-- proof-start -->
### 証明

MT2 の Jordan 分解を

$$
\nu=\nu^+-\nu^-
$$

とします。[絶対連続性と Jordan 部分の同値](../MT2/index.md#thm-mt2-ac-variation)から

$$
\nu^+\ll\mu,
\qquad
\nu^-\ll\mu.
$$

$\nu^+,\nu^-$ は有限正測度なので σ-finite です。正測度版 RN 定理により非負可測関数 $f_+,f_-$ が存在して

$$
\nu^+(E)=\int_Ef_+\,d\mu,
\qquad
\nu^-(E)=\int_Ef_-\,d\mu.
$$

しかも

$$
\int_Xf_+\,d\mu=\nu^+(X)<\infty,
\qquad
\int_Xf_-\,d\mu=\nu^-(X)<\infty.
$$

従って

$$
f=f_+-f_-
$$

は $L^1(\mu)$ に属し、

$$
\nu(E)
=
\int_Ef_+\,d\mu-
\int_Ef_-\,d\mu
=
\int_Ef\,d\mu.
$$

MT2 の[密度付き符号付き測度の Jordan 分解](../MT2/index.md#thm-mt2-density-jordan)をこの $f$ に適用すれば

$$
|\nu|(E)=\int_E|f|\,d\mu.
$$

一意性について、$f,g\in L^1(\mu)$ が同じ $\nu$ を表すとします。$h=f-g$ と置けば

$$
\int_Eh\,d\mu=0
$$

が全ての $E$ で成り立ちます。$A=\{h>0\}$ とすれば

$$
0=\int_Ah\,d\mu=
\int_Ah^+\,d\mu
$$

なので $h^+=0$ a.e. 同様に $h^-=0$ a.e.。従って $f=g$ a.e. です。$\square$
<!-- proof-end -->

---

## 6. 特異性

<a id="def-mt3-singular-positive"></a>
<!-- formal-statement-start -->
### 定義（互いに特異な正測度）

正測度 $\sigma,\mu$ が互いに特異であることを

$$
\boxed{\sigma\perp\mu}
$$

と書き、ある可測集合 $S$ が存在して

$$
\mu(S)=0,
\qquad
\sigma(X\setminus S)=0
$$

となることをいう。
<!-- formal-statement-end -->

つまり $\sigma$ の全質量を $\mu$-零集合の上へ押し込められるという意味です。

<a id="def-mt3-singular-signed"></a>
<!-- formal-statement-start -->
### 定義（符号付き測度の特異性）

有限符号付き測度 $\eta$ が $\mu$ と特異であるとは

$$
\boxed{|\eta|\perp\mu}
$$

となることをいう。
<!-- formal-statement-end -->

<a id="thm-mt3-ac-and-singular-zero"></a>
<!-- formal-statement-start -->
### 補題（絶対連続かつ特異なら0）

有限符号付き測度 $\eta$ が

$$
\eta\ll\mu,
\qquad
\eta\perp\mu
$$

をともに満たすなら

$$
\boxed{\eta=0.}
$$
<!-- formal-statement-end -->

<!-- proof-start -->
### 証明

$\eta\perp\mu$ より、ある可測 $S$ で

$$
\mu(S)=0,
\qquad
|\eta|(X\setminus S)=0
$$

となります。

一方 $\eta\ll\mu$ なら MT2 の絶対連続性命題から

$$
|\eta|\ll\mu.
$$

従って $\mu(S)=0$ から $|\eta|(S)=0$。よって

$$
|\eta|(X)
=|\eta|(S)+|\eta|(X\setminus S)=0.
$$

したがって $\eta=0$ です。$\square$
<!-- proof-end -->

---

## 7. Lebesgue 分解：正測度版

<a id="thm-mt3-lebesgue-decomposition-positive"></a>
<!-- formal-statement-start -->
### 定理（Lebesgue 分解：σ-finite 正測度版）

$\mu,\nu$ を σ-finite 正測度とする。このとき正測度 $\nu_{\mathrm{ac}},\nu_{\mathrm{s}}$ が一意に存在して

$$
\boxed{
\nu=\nu_{\mathrm{ac}}+\nu_{\mathrm{s}},}
$$

$$
\boxed{
\nu_{\mathrm{ac}}\ll\mu,
\qquad
\nu_{\mathrm{s}}\perp\mu}
$$

となる。

さらに非負可測関数 $h$ が存在して

$$
\boxed{
\nu_{\mathrm{ac}}(E)=\int_Eh\,d\mu.}
$$
<!-- formal-statement-end -->

### 証明の見取り図

$\mu$ と $\nu$ のどちらも支配する

$$
\tau=\mu+\nu
$$

を作ります。RN 定理で

$$
\frac{d\mu}{d\tau}=g,
\qquad
\frac{d\nu}{d\tau}=f
$$

と書き、$g>0$ の場所と $g=0$ の場所へ分けます。

- $g=0$ の場所は $\mu$ から見れば零集合なので、そこに乗る $\nu$ は特異部分。
- $g>0$ の場所では $f/g$ が $\mu$ に関する密度になるので、そこが絶対連続部分。

<!-- proof-start -->
### 証明

#### 7.1 共通支配測度を作る

$$
\tau=\mu+\nu
$$

と置きます。$\mu,\nu$ が σ-finite なら $\tau$ も σ-finite です。

実際、$\mu(A_i)<\infty$ となる被覆 $(A_i)$ と $\nu(B_j)<\infty$ となる被覆 $(B_j)$ を取り、$A_i\cap B_j$ を並べれば各交わりで

$$
\tau(A_i\cap B_j)<\infty
$$

です。

明らかに

$$
\mu\ll\tau,
\qquad
\nu\ll\tau.
$$

RN 定理から非負可測 $f,g$ が存在して

$$
\nu(E)=\int_Ef\,d\tau,
\qquad
\mu(E)=\int_Eg\,d\tau.
$$

#### 7.2 $g=0$ と $g>0$ へ分ける

$$
S=\{g=0\},
\qquad
A=\{g>0\}
$$

と置きます。

$$
\mu(S)=\int_Sg\,d\tau=0.
$$

そこで

$$
\nu_{\mathrm{s}}(E)=\nu(E\cap S),
\qquad
\nu_{\mathrm{ac}}(E)=\nu(E\cap A)
$$

と定めます。明らかに

$$
\nu=\nu_{\mathrm{ac}}+\nu_{\mathrm{s}}.
$$

$\nu_{\mathrm{s}}$ は $S$ に集中し $\mu(S)=0$ なので

$$
\nu_{\mathrm{s}}\perp\mu.
$$

#### 7.3 絶対連続部分の密度を作る

$$
h=
\begin{cases}
 f/g,&g>0,\\
 0,&g=0
\end{cases}
$$

と置きます。$h$ は非負可測です。

$\mu(E)=\int_Eg\,d\tau$ なので[測度変更の積分公式](#thm-mt3-change-measure)を使うと

$$
\begin{aligned}
\int_Eh\,d\mu
&=
\int_Ehg\,d\tau\\
&=
\int_{E\cap A}f\,d\tau\\
&=
\nu(E\cap A)\\
&=
\nu_{\mathrm{ac}}(E).
\end{aligned}
$$

従って

$$
\nu_{\mathrm{ac}}\ll\mu.
$$

#### 7.4 一意性

別の分解

$$
\nu=\alpha+\sigma,
\qquad
\alpha\ll\mu,
\qquad
\sigma\perp\mu
$$

があるとします。

$\nu_{\mathrm{s}}$ と $\sigma$ が集中する $\mu$-零集合をそれぞれ $S_1,S_2$ とし

$$
T=S_1\cup S_2
$$

と置きます。$\mu(T)=0$ です。

$E\subset X\setminus T$ なら

$$
\nu_{\mathrm{s}}(E)=0,
\qquad
\sigma(E)=0,
$$

したがって

$$
\nu_{\mathrm{ac}}(E)=\nu(E)=\alpha(E).
$$

一方、$\nu_{\mathrm{ac}}\ll\mu$ と $\alpha\ll\mu$ から

$$
\nu_{\mathrm{ac}}(T)=\alpha(T)=0.
$$

任意の $E$ を $E\cap T$ と $E\setminus T$ に分ければ

$$
\nu_{\mathrm{ac}}(E)=\alpha(E).
$$

従って $\nu_{\mathrm{ac}}=\alpha$、残りも $\nu_{\mathrm{s}}=\sigma$ です。$\square$
<!-- proof-end -->

---

## 8. Lebesgue 分解：有限符号付き測度版

<a id="thm-mt3-lebesgue-decomposition-signed"></a>
<!-- formal-statement-start -->
### 定理（Lebesgue 分解：有限符号付き測度版）

$\mu$ を σ-finite 正測度、$\nu$ を有限符号付き測度とする。このとき有限符号付き測度

$$
\nu_{\mathrm{ac}},\nu_{\mathrm{s}}
$$

が一意に存在して

$$
\boxed{
\nu=\nu_{\mathrm{ac}}+\nu_{\mathrm{s}},}
$$

$$
\boxed{
\nu_{\mathrm{ac}}\ll\mu,
\qquad
\nu_{\mathrm{s}}\perp\mu}
$$

となる。

さらに一意な $f\in L^1(\mu)$（$\mu$-a.e. の意味で）が存在して

$$
\boxed{
\nu_{\mathrm{ac}}(E)=\int_Ef\,d\mu.}
$$
<!-- formal-statement-end -->

<!-- proof-start -->
### 証明

Jordan 分解

$$
\nu=\nu^+-\nu^-
$$

を取ります。正測度版 Lebesgue 分解をそれぞれに適用して

$$
\nu^+=\alpha_++\sigma_+,
\qquad
\nu^-=\alpha_-+\sigma_-,
$$

$$
\alpha_\pm\ll\mu,
\qquad
\sigma_\pm\perp\mu
$$

とします。

$$
\nu_{\mathrm{ac}}=\alpha_+-\alpha_-,
\qquad
\nu_{\mathrm{s}}=\sigma_+-\sigma_-
$$

と置けば

$$
\nu=\nu_{\mathrm{ac}}+\nu_{\mathrm{s}}.
$$

$\alpha_\pm\ll\mu$ なので $\nu_{\mathrm{ac}}\ll\mu$。

$\sigma_+,\sigma_-$ がそれぞれ集中する $\mu$-零集合 $S_+,S_-$ を取り

$$
S=S_+\cup S_-
$$

とすれば、$\nu_{\mathrm{s}}$ は $S$ の外で0です。従ってその全変動も $S$ の外で0となり

$$
\nu_{\mathrm{s}}\perp\mu.
$$

有限符号付き RN 定理から $f\in L^1(\mu)$ が存在して

$$
\nu_{\mathrm{ac}}(E)=\int_Ef\,d\mu.
$$

一意性を示します。別の分解

$$
\nu=\eta_{\mathrm{ac}}+\eta_{\mathrm{s}}
$$

が同じ条件を満たすなら

$$
\delta
:=
\nu_{\mathrm{ac}}-\eta_{\mathrm{ac}}
=
\eta_{\mathrm{s}}-\nu_{\mathrm{s}}.
$$

左の表示から $\delta\ll\mu$、右の表示から $\delta\perp\mu$ です。したがって[絶対連続かつ特異なら0](#thm-mt3-ac-and-singular-zero)より

$$
\delta=0.
$$

よって両部分は一意です。密度 $f$ の一意性は符号付き RN 定理の一意性から従います。$\square$
<!-- proof-end -->

---

## 9. 具体例

### 例1：密度だけからなる場合

$[0,1]$ 上で

$$
\nu(E)=\int_E(3x^2+1)\,dx
$$

とします。Lebesgue 測度 $\lambda$ に対して

$$
\nu\ll\lambda,
\qquad
\frac{d\nu}{d\lambda}=3x^2+1,
$$

特異部分は0です。

### 例2：Dirac 質量を混ぜる

$[0,1]$ 上で

$$
\nu(E)
=
\int_E x\,dx+2\delta_0(E)
$$

とします。Lebesgue 測度 $\lambda$ に対して

$$
\nu_{\mathrm{ac}}(E)=\int_E x\,dx,
\qquad
\nu_{\mathrm{s}}=2\delta_0,
$$

なので

$$
\frac{d\nu_{\mathrm{ac}}}{d\lambda}=x.
$$

$\{0\}$ は $\lambda$-零集合ですが $\delta_0$ の全質量が乗っているため、Dirac 部分は特異です。

### 例3：符号付き測度でも同じ二分法

$$
\nu(E)
=
\int_E(2x-1)\,dx
+3\delta_0(E)-\delta_1(E)
$$

とすると

$$
\nu_{\mathrm{ac}}(E)
=
\int_E(2x-1)\,dx,
$$

$$
\nu_{\mathrm{s}}
=3\delta_0-\delta_1.
$$

絶対連続部分は符号を持つ密度で表され、特異部分も符号付きで構いません。

---

## 10. よくある取り違え

| 取り違え | 正しい見方 |
|---|---|
| $\nu(E)=0$ なら $\mu(E)=0$ が $\nu\ll\mu$ | 逆。$\mu(E)=0\Rightarrow\nu(E)=0$ |
| RN 密度は各点で一意 | $\mu$-零集合上では自由に変えられる |
| $\nu\ll\mu$ だけで常に RN 密度がある | 一般形では σ-finite 性などの仮定が必要 |
| $\nu\perp\mu$ は互いの台が位相的に離れている | 必要なのは測度論的な零集合上への集中 |
| Lebesgue 分解の特異部分は「離散部分」 | Cantor 型の連続特異測度もある |
| 符号付き測度の RN は別理論 | Jordan 分解で正測度版へ還元できる |

---

## 11. 演習

### Level A

<a id="ex-mt3-a01"></a>
#### MT3-A01 RN 微分を直接読む
- Level: A

$[0,1]$ 上で

$$
\nu(E)=\int_E(1+x)\,dx
$$

とする。$d\nu/d\lambda$ と $\nu([0,1])$ を求めてください。

<!-- solution-start -->
**解答**：定義そのものから

$$
\frac{d\nu}{d\lambda}=1+x
\qquad\lambda\text{-a.e.}
$$

です。また

$$
\nu([0,1])
=
\int_0^1(1+x)dx
=\frac32.
$$
<!-- solution-end -->

<a id="ex-mt3-a02"></a>
#### MT3-A02 σ-finite 局所化
- Level: A

Lebesgue 測度 $\lambda$ が $\mathbb R$ 上で σ-finite であることを、定義から示してください。

<!-- solution-start -->
**解答**：

$$
\mathbb R=\bigcup_{n=1}^{\infty}[-n,n]
$$

であり

$$
\lambda([-n,n])=2n<\infty.
$$

従って定義通り σ-finite です。
<!-- solution-end -->

### Level B

<a id="ex-mt3-b01"></a>
#### MT3-B01 候補族が max で閉じる理由
- Level: B

有限版 RN 証明の候補族 $\mathcal C$ について、$f,g\in\mathcal C$ なら $\max(f,g)\in\mathcal C$ を再証明してください。

<!-- solution-start -->
**解答**：$A=\{f\ge g\}$ と置き、任意の $E$ を $E\cap A$ と $E\setminus A$ に分けます。

$$
\begin{aligned}
\int_E\max(f,g)d\mu
&=
\int_{E\cap A}f\,d\mu
+
\int_{E\setminus A}g\,d\mu\\
&\le
\nu(E\cap A)+\nu(E\setminus A)\\
&=\nu(E).
\end{aligned}
$$

従って $\max(f,g)$ も候補条件を満たします。単に $\int_X$ だけを比較するのではなく、**全ての可測 $E$ に対する支配条件**を保つためにこの分割が必要です。
<!-- solution-end -->

<a id="ex-mt3-b02"></a>
#### MT3-B02 chain rule
- Level: B

$\lambda\ll\nu\ll\mu$ とし

$$
f=\frac{d\nu}{d\mu},
\qquad
g=\frac{d\lambda}{d\nu}
$$

とする。$gf$ が $d\lambda/d\mu$ になることを、可測集合 $E$ 上の積分で示してください。

<!-- solution-start -->
**解答**：測度変更公式から

$$
\lambda(E)
=
\int_Eg\,d\nu
=
\int_Egf\,d\mu.
$$

従って RN 微分の定義により $gf$ は $d\lambda/d\mu$ の一つの版です。一意性から

$$
\frac{d\lambda}{d\mu}=gf
\qquad\mu\text{-a.e.}
$$

です。
<!-- solution-end -->

<a id="ex-mt3-b03"></a>
#### MT3-B03 Lebesgue 分解を計算する
- Level: B

$[0,1]$ 上で

$$
\nu(E)=\int_E(4x-2)\,dx+5\delta_{1/2}(E)
$$

とする。Lebesgue 測度 $\lambda$ に関する絶対連続部分、特異部分、絶対連続部分の RN 密度を求めてください。

<!-- solution-start -->
**解答**：

$$
\nu_{\mathrm{ac}}(E)=\int_E(4x-2)\,dx,
\qquad
\nu_{\mathrm{s}}=5\delta_{1/2}.
$$

したがって

$$
\frac{d\nu_{\mathrm{ac}}}{d\lambda}=4x-2
\qquad\lambda\text{-a.e.}
$$

です。$\delta_{1/2}$ は $\lambda$-零集合 $\{1/2\}$ に全質量を持つので特異です。
<!-- solution-end -->

### Level C

<a id="ex-mt3-c01"></a>
#### MT3-C01 RN 証明の残差矛盾を再構成する
- Level: C

有限版 RN 証明で最大候補 $g$ を得た後、残差

$$
\lambda=\nu-g\mu
$$

が非零なら矛盾する部分を、次だけを手掛かりに再構成してください。

1. $c\mu(X)<\lambda(X)$。
2. $\lambda-c\mu$ を Hahn 分解する。
3. Hahn 正集合 $P$ で $c\mu(A)\le\lambda(A)$。
4. $g+c1_P$ を候補に戻す。

<!-- solution-start -->
**解答**：$\lambda(X)>0$ と仮定し、有限性から $c>0$ を $c\mu(X)<\lambda(X)$ となるように選びます。

$$
\eta=\lambda-c\mu
$$

の Hahn 分解を $X=P\sqcup N$ とすると

$$
\eta(X)>0,
\qquad
\eta(N)\le0
$$

なので $\eta(P)>0$。$\lambda\ll\mu$ だから $\mu(P)=0$ なら $\eta(P)=0$ となって矛盾し、$\mu(P)>0$ です。

$P$ が正集合なので全ての $A\subset P$ で

$$
\lambda(A)-c\mu(A)\ge0.
$$

そこで $h=g+c1_P$ とすると任意の $E$ で

$$
\int_Eh\,d\mu
\le
\int_Eg\,d\mu+\lambda(E)
=\nu(E),
$$

よって $h$ も候補です。しかし

$$
\int h\,d\mu
=
\int g\,d\mu+c\mu(P)
>
\int g\,d\mu,
$$

最大性に矛盾します。従って残差は0です。
<!-- solution-end -->

<a id="ex-mt3-c02"></a>
#### MT3-C02 σ-finite 性なしで RN が失敗する例
- Level: C

$[0,1]$ 上の counting measure $\mu$ と Lebesgue 測度 $\lambda$ について、

1. $\lambda\ll\mu$、
2. $\mu$ は σ-finite でない、
3. $d\lambda/d\mu$ は存在しない

ことを示してください。

<!-- solution-start -->
**解答**：$\mu(E)=0$ となるのは $E=\varnothing$ のみなので、絶対連続性は自動的に成立します。

counting measure で有限測度を持つ集合は有限集合です。可算個の有限集合の和集合は可算なので、非可算集合 $[0,1]$ を覆えず、$\mu$ は σ-finite ではありません。

もし $\lambda(E)=\int_Ef\,d\mu$ なら、任意の一点集合で

$$
f(x)=\int_{\{x\}}f\,d\mu
=\lambda(\{x\})=0.
$$

従って $f\equiv0$ ですが、すると $\lambda([0,1])=1$ を表せません。よって RN 密度は存在しません。
<!-- solution-end -->

---

## 12. この章で閉じた依存

この章では、関数解析を先取りせず次を閉じました。

- 有限正測度版 Radon–Nikodym 定理の存在・a.e.一意性
- Hahn 分解を用いた残差消去
- σ-finite 版への可算局所化
- σ-finite 性を外したときの具体的反例
- 測度変更の積分公式と RN 微分の chain rule
- 有限符号付き測度版 RN 定理
- 正測度・有限符号付き測度の Lebesgue 分解
- 絶対連続部分と特異部分の一意性

次の解析では、RN 定理を「使える」とするだけでなく、どの有限化・Hahn 分解・単調収束が存在証明を支えているかまで戻れる状態になっています。
