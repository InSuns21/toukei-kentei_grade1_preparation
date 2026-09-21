# STO4A：Brown 運動の標本路幾何

STO4 で Brown 運動を構成し、STO5 で quadratic variation、STO8 で local time を得ました。

ここでは、それらを「一本の標本路は幾何学的にどれほど粗いのか」という問いへまとめます。

Brown 運動は連続ですが、

- ほとんど確実に nowhere differentiable、
- 任意の $\alpha<1/2$ では Hölder だが、$\alpha>1/2$ ではそうならない、
- total variation は無限、
- quadratic variation は時間そのもの、
- 零点集合は Lebesgue measure 0 なのに Hausdorff dimension $1/2$

という、通常の滑らかな曲線とは全く違う標本路を持ちます。

この章の主役は

$$
\text{regularity}
\longleftrightarrow
\text{variation}
\longleftrightarrow
\text{fractal geometry}
$$

の三者です。

---

## 1. Brown increment の高次 moment

standard Brown motion $B$ について

$$
B_t-B_s\sim N(0,t-s).
$$

従って $p>0$ に対し

$$
E|B_t-B_s|^p
=
E|Z|^p\,|t-s|^{p/2},
\qquad
Z\sim N(0,1).
$$

<a id="prop-sto4a-gaussian-moment"></a>

<!-- formal-statement-start -->
> **命題（Brown increment の高次 moment）**  
> 任意の $p>0$ に対し
>
$$
E|B_t-B_s|^p
=
c_p|t-s|^{p/2},
\qquad
c_p=E|Z|^p<\infty.
$$
<!-- formal-statement-end -->

Brown 標本路 regularity のほとんどは、この scaling

$$
|t-s|^{1/2}
$$

から始まります。

---

## 2. 任意の $\alpha<1/2$ で Hölder

[Kolmogorov--Chentsov continuity theorem](../STO3/index.md#thm-sto3-kolmogorov-chentsov) に

$$
E|B_t-B_s|^p
=
c_p|t-s|^{p/2}
$$

を入れます。

$p>2$ なら

$$
\frac p2
=
1+\left(\frac p2-1\right).
$$

従って同定理から得られる Hölder exponent は

$$
\gamma
<
\frac{p/2-1}{p}
=
\frac12-\frac1p.
$$

$p$ をいくらでも大きくできるので $1/2$ 未満の任意の指数まで近づけます。

<a id="thm-sto4a-holder-below-half"></a>

<!-- formal-statement-start -->
> **定理（Brown 標本路の Hölder 正則性：指数 1/2 未満）**  
> standard Brown motion $B$ に対し、ほとんど確実に、任意の $T<\infty$ と任意の
>
$$
0<\alpha<\frac12
$$
>
> について、ある有限な random constant $C_{\alpha,T}(\omega)$ が存在して
>
$$
|B_t-B_s|
\le
C_{\alpha,T}(\omega)|t-s|^\alpha
\qquad
(s,t\in[0,T])
$$
>
> が成り立つ。
<!-- formal-statement-end -->

<!-- proof-start -->
### 証明

固定した $T$ と $\alpha<1/2$ を取ります。

$$
\alpha<\frac12-\frac1p
$$

となる $p>2$ を選べます。前節の moment formula と Kolmogorov--Chentsov theorem から、Brown motion のある continuous modification は $\alpha$-Hölder です。

STO4 で採用している Brownian version はすでに continuous です。[continuous modifications are indistinguishable](../STO3/index.md#prop-sto3-continuous-modifications-indistinguishable) なので、この Hölder 性は既存の continuous Brown 標本路 に移せます。

最後に rational な $T>0$ と rational な $\alpha<1/2$ について可算交差を取り、任意の $T,\alpha$ へ単調性で拡張します。

<!-- proof-end -->

---

## 3. $1/2$ より滑らかにはなれない

$\alpha>1/2$ の Hölder 標本路 $f$ を考えます。

非退化区間 $[a,b]$ を $n$ 等分し、

$$
t_k=a+\frac{k(b-a)}{n}
$$

とします。

もし

$$
|f(t)-f(s)|
\le
C|t-s|^\alpha
$$

なら

$$
\sum_{k=0}^{n-1}
|f(t_{k+1})-f(t_k)|^2
\le
nC^2\left(\frac{b-a}{n}\right)^{2\alpha}
=
C^2(b-a)^{2\alpha}n^{1-2\alpha}.
$$

$\alpha>1/2$ なので右辺は0へ行きます。

一方 Brown motion では [quadratic variation](../STO5/index.md#thm-sto5-brownian-qv) が

$$
[B]_b-[B]_a=b-a
$$

です。

<a id="thm-sto4a-no-holder-above-half"></a>

<!-- formal-statement-start -->
> **定理（Brown 標本路の Hölder 臨界指数：1/2 より大きい指数は不可）**  
> ほとんど確実に、Brown 標本路 はどの非退化区間上でも、どの $\alpha>1/2$ に対しても $\alpha$-Hölder ではない。
<!-- formal-statement-end -->

<!-- proof-start -->
### 証明

固定した rational endpoints $a<b$ と rational $\alpha>1/2$ を取ります。

$A$ を「$B$ が $[a,b]$ 上で $\alpha$-Hölder」である事象とします。

上の deterministic estimate から $A$ 上では、等分 partition に沿う quadratic sum $Q_n$ は

$$
Q_n\to0
$$

です。

一方 STO5 の Brownian [quadratic variation theorem](../STO5/index.md#thm-sto5-local-martingale-qv) から

$$
Q_n\to b-a
$$

in probability です。

確率収束列からは a.s. 収束する部分列を取れるので、ある subsequence $n_j$ で

$$
Q_{n_j}\to b-a
\qquad\text{a.s.}
$$

となります。

もし $P(A)>0$ なら、$A$ 上では同じ subsequence が0へも収束しなければならず矛盾します。従って $P(A)=0$ です。

rational $a,b,\alpha$ は可算なので可算和を取れます。任意の実数 $\alpha>1/2$ に対する local Hölder 性があれば、それより小さい rational $\beta>1/2$ に対しても同じ区間で Hölder になるため、結論が従います。
<!-- proof-end -->

---

## 4. $1/2$ は「二次変分が残る」臨界指数

前節の計算は、なぜ quadratic variation が Brownian geometry の自然な尺度なのかも説明します。

- $\alpha>1/2$ なら二乗増分和は0へ行く。
- Brown motion では二乗増分和は $t$ へ行く。
- したがって Brown motion は $1/2$ より滑らかにはなれない。

さらに [Brownian paths have infinite total variation](../STO5/index.md#cor-sto5-brownian-infinite-variation) から

$$
\operatorname{TV}_{[0,T]}(B)=\infty
\qquad\text{a.s.}
$$

です。

<a id="prop-sto4a-critical-variation"></a>

<!-- formal-statement-start -->
> **命題（Brown 標本路 の variation scale）**  
> 任意の $T>0$ に対し、ほとんど確実に
>
$$
\operatorname{TV}_{[0,T]}(B)=\infty,
\qquad
[B]_T=T.
$$
>
> 従って Brown 標本路 は一次変分では粗すぎる一方、二次変分では有限で非退化な量を持つ。
<!-- formal-statement-end -->

---

## 5. nowhere differentiable を dyadic increments で直接示す

Hölder exponent の議論だけでは「一点だけで微分可能」という可能性を排除できません。

そこで微分可能性そのものを dyadic increments で潰します。

<a id="thm-sto4a-nowhere-differentiable"></a>

<!-- formal-statement-start -->
> **定理（Brown 標本路 は nowhere differentiable）**  
> standard Brown motion の標本路は、ほとんど確実に $[0,1]$ のどの点でも有限な微分係数を持たない。端点では片側微分も存在しない。
<!-- formal-statement-end -->

### 証明の見取り図

時刻 $t$ で微分可能なら、その近くでは

$$
|B_s-B_t|\le M|s-t|
$$

という局所 Lipschitz bound が成り立ちます。

すると $t$ を含む dyadic interval とその左右の3本の increment が全て $O(1/n)$ になります。

しかし Brownian increment の典型サイズは $1/\sqrt n$ です。3本が同時に $O(1/n)$ まで小さくなる確率は $O(n^{-3/2})$。候補 interval は $n$ 個なので、どこかで起こる確率は $O(n^{-1/2})$ です。

dyadic $n=2^m$ なら和が有限になり、Borel--Cantelli が使えます。

<!-- proof-start -->
### 証明

まず interior point を扱います。

$n=2^m$ とし

$$
\Delta_k^{(n)}
=
B_{(k+1)/n}-B_{k/n}.
$$

各 $\Delta_k^{(n)}$ は独立で

$$
\Delta_k^{(n)}
\sim
N(0,1/n).
$$

固定した整数 $M\ge1$ について、ある $k\in\{1,\ldots,n-2\}$ で

$$
|\Delta_{k-1}^{(n)}|,
|\Delta_k^{(n)}|,
|\Delta_{k+1}^{(n)}|
\le
\frac{4M}{n}
$$

となる事象を $A_{n,M}$ とします。

$Z\sim N(0,1)$ の密度は $1/\sqrt{2\pi}$ 以下なので

$$
P\left(
|\Delta_k^{(n)}|\le\frac{4M}{n}
\right)
=
P\left(
|Z|\le\frac{4M}{\sqrt n}
\right)
\le
\frac{8M}{\sqrt{2\pi n}}.
$$

3本は独立なので、固定 $k$ で3本全部が小さい確率は

$$
\le
C_M n^{-3/2}.
$$

候補 $k$ は高々 $n$ 個なので

$$
P(A_{n,M})
\le
C_Mn^{-1/2}.
$$

$n=2^m$ に限れば

$$
\sum_{m=1}^{\infty}P(A_{2^m,M})
<
\infty.
$$

Borel--Cantelli lemma から、固定 $M$ について $A_{2^m,M}$ はほとんど確実に有限回しか起きません。

ところが、もしある interior point $t\in(0,1)$ で $B$ が微分可能なら、ある整数 $M$ と $\delta>0$ が存在して

$$
|B_s-B_t|
\le
M|s-t|
\qquad
(|s-t|<\delta)
$$

となります。

十分大きい dyadic $n$ で $t\in[k/n,(k+1)/n]$ とすれば、$k-1,k,k+1$ の3本の increment の両端は全て $t$ から距離 $2/n<\delta$ 以内です。

従って各 increment は

$$
|\Delta_j^{(n)}|
\le
|B_{(j+1)/n}-B_t|
+
|B_{j/n}-B_t|
\le
\frac{4M}{n}.
$$

つまり $A_{n,M}$ が全ての十分大きい dyadic $n$ で起きます。これは Borel--Cantelli の結論に矛盾します。

よって interior point では微分できません。

端点 $0$ について、有限な右微分が存在すれば、ある $M$ で十分大きい dyadic $n$ に対し

$$
|B_{1/n}|
\le
\frac{M}{n}
$$

です。

しかし

$$
P\left(
|B_{1/n}|\le\frac{M}{n}
\right)
=
P\left(
|Z|\le\frac{M}{\sqrt n}
\right)
\le
CMn^{-1/2}.
$$

dyadic $n$ では和が有限なので Borel--Cantelli に反します。

$t=1$ も

$$
B_1-B_{1-1/n}
$$

に同じ議論を適用します。

最後に $M=1,2,\ldots$ について可算和を取れば、どの点でも有限な微分係数を持たないことが従います。
<!-- proof-end -->

---

## 6. 零点集合は閉じているが時間長さは0

零点集合を

$$
Z
=
\{t\in[0,1]:B_t=0\}
$$

とします。

<a id="prop-sto4a-zero-set-basic"></a>

<!-- formal-statement-start -->
> **命題（Brownian zero set の基本性質）**  
> ほとんど確実に、
>
> 1. $Z$ は閉集合、
> 2. $Z$ は孤立点を持たない、
> 3. Lebesgue measure は
>
$$
|Z|=0
$$
>
> である。
<!-- formal-statement-end -->

### 閉性

$t\mapsto B_t$ は連続なので

$$
Z=B^{-1}(\{0\})
$$

は閉です。

### Lebesgue measure 0

これは STO8 の [Brown 運動の level set が Lebesgue 時間0である命題](../STO8/index.md#prop-sto8-level-set-zero-time) の $a=0,T=1$ です。

### 孤立点がないこと

まず Brown motion starting at 0 は、任意の $\varepsilon>0$ の間に正の値と負の値の両方を取ります。

実際 [reflection principle](../STO4/index.md#thm-sto4-reflection-principle) から

$$
\max_{0\le s\le\varepsilon}B_s
$$

は原点に atom を持たず、ほとんど確実に正です。対称性から minimum はほとんど確実に負です。

従って連続性により、0の直後に再び零点があります。

任意の rational $a\in[0,1)$ に対し

$$
\tau_a
=
\inf\{t\ge a:B_t=0\}
$$

を考えます。これは [Brown 運動の到達時刻](../STO4/index.md#def-sto4-hitting-time) と同じ停止時刻性の議論で stopping time です。

$\tau_a<1$ の上で [Brownian strong Markov property](../STO4/index.md#thm-sto4-brownian-strong-markov) を使うと、$\tau_a$ の直後の process は0から始まる Brown motion です。従って $\tau_a$ の右側には零点が任意に近く存在します。

もし孤立零点 $t\in(0,1)$ があれば、その左側で十分近い rational $a<t$ を取り、$(a,t)$ に零点がないようにできます。そのとき $\tau_a=t$ ですが、$\tau_a$ の直後には零点があるため矛盾します。

0も上の「直後に零点がある」性質で孤立せず、1が零点なら左側について time reversal または同じ argument を逆向きに適用できます。

従って $Z$ は孤立点を持ちません。

---

## 7. 零点集合の Hausdorff dimension：上界

目標は

$$
\dim_H Z=\frac12
$$

です。

まず

$$
\dim_H Z\le\frac12
$$

を示します。

$n=2^m$, $h=1/n$ とし、dyadic intervals

$$
I_{k,n}
=
[kh,(k+1)h],
\qquad
0\le k<n
$$

のうち $Z$ と交わるものの個数を $N_n$ とします。

### 1区間が零点を含む確率

$k\ge1$ とします。

時刻 $kh$ で $B_{kh}=x$ と条件付けると、その後長さ $h$ の間に0へ到達する確率は STO4 の hitting-time law / [reflection principle](../STO4/index.md#thm-sto4-reflection-principle) から

$$
P_x(T_0\le h)
=
2\left(
1-\Phi\left(\frac{|x|}{\sqrt h}\right)
\right).
$$

ここで $Z_0\sim N(0,1)$ とします。

<a id="lem-sto4a-gaussian-tail"></a>

<!-- formal-statement-start -->
> **補題（Gaussian tail の簡単な上界）**  
> $y\ge0$ に対し
>
$$
2(1-\Phi(y))
\le
e^{-y^2/2}.
$$
<!-- formal-statement-end -->

<!-- proof-start -->
### 証明

$$
g(y)
=
e^{-y^2/2}-2(1-\Phi(y))
$$

と置きます。$g(0)=0$, $g(y)\to0$ as $y\to\infty$ で、

$$
g'(y)
=
e^{-y^2/2}
\left(
\sqrt{\frac2\pi}-y
\right).
$$

従って $g$ は最初増加し、その後単調減少して0へ戻るため $g(y)\ge0$ です。

<!-- proof-end -->

---

$B_{kh}/\sqrt h\sim N(0,k)$ なので

$$
\begin{aligned}
P(I_{k,n}\cap Z\ne\varnothing)
&\le
E\left[
\exp\left(
-\frac{B_{kh}^2}{2h}
\right)
\right]\\
&=
E[e^{-kZ_0^2/2}]\\
&=
\frac1{\sqrt{1+k}}.
\end{aligned}
$$

最後の等式は Gaussian integral です。

従って

$$
E[N_n]
\le
1+
\sum_{k=1}^{n-1}\frac1{\sqrt{k+1}}
\le
C\sqrt n.
$$

<a id="thm-sto4a-zero-dim-upper"></a>

<!-- formal-statement-start -->
> **定理（Brownian zero set の dimension 上界）**  
> ほとんど確実に
>
$$
\dim_HZ\le\frac12.
$$
<!-- formal-statement-end -->

<!-- proof-start -->
### 証明

$s>1/2$ を固定します。

$Z$ と交わる dyadic interval だけを残せば $Z$ の $1/n$-cover になります。従ってその $s$-cost は

$$
Y_n
=
N_n n^{-s}.
$$

期待値は

$$
E[Y_n]
\le
Cn^{1/2-s}.
$$

dyadic $n=2^m$ に限ると

$$
\sum_{m=1}^{\infty}
E[Y_{2^m}]
\le
C
\sum_{m=1}^{\infty}
2^{-m(s-1/2)}
<
\infty.
$$

非負変数なので [Tonelli](../F0_00D2C_積測度_Tonelli_Fubini/index.md#thm-tonelli) により

$$
\sum_{m=1}^{\infty}Y_{2^m}
<
\infty
\qquad\text{a.s.}
$$

従って

$$
Y_{2^m}\to0
\qquad\text{a.s.}
$$

各 $m$ で $Y_{2^m}$ は実際の dyadic cover の $s$-cost なので

$$
\mathcal H^s(Z)=0
$$

です。

任意の rational $s>1/2$ について可算交差を取れば

$$
\dim_HZ\le\frac12.
$$
<!-- proof-end -->

---

## 8. local time は時間変数について $1/2$ 未満 Hölder

下界には local time を「零点集合に載った measure」として使います。

Tanaka formula から、$0\le s<t\le1$ について

$$
L_t^0-L_s^0
=
|B_t|-|B_s|
-
\int_s^t\operatorname{sgn}(B_u)\,dB_u.
$$

<a id="thm-sto4a-local-time-temporal-holder"></a>

<!-- formal-statement-start -->
> **定理（Brownian local time の時間 Hölder regularity）**  
> 任意の
>
$$
0<\alpha<\frac12
$$
>
> に対し、ほとんど確実にある有限 random constant $C_\alpha$ が存在して
>
$$
|L_t^0-L_s^0|
\le
C_\alpha|t-s|^\alpha
\qquad
(s,t\in[0,1])
$$
>
> が成り立つ。
<!-- formal-statement-end -->

### 証明の見取り図

Tanaka formula の右辺は

1. Brown increment 型の項、
2. stochastic integral の項

です。

両方とも $p$-th moment が $|t-s|^{p/2}$ で抑えられるため、Kolmogorov--Chentsov theorem を使えます。

<!-- proof-start -->
### 証明

$p\ge2$ を固定します。

まず

$$
\bigl||B_t|-|B_s|\bigr|
\le
|B_t-B_s|
$$

なので Gaussian moment formula から

$$
E\bigl||B_t|-|B_s|\bigr|^p
\le
C_p|t-s|^{p/2}.
$$

次に

$$
M_{s,t}
=
\int_s^t
\operatorname{sgn}(B_u)\,dB_u
$$

とします。

[BDG inequality](../STO6/index.md#thm-sto6-bdg) により

$$
E|M_{s,t}|^p
\le
C_p
E\left[
\left(
\int_s^t
\operatorname{sgn}(B_u)^2\,du
\right)^{p/2}
\right].
$$

STO8 の [level set has zero Lebesgue time](../STO8/index.md#prop-sto8-level-set-zero-time) により $B_u=0$ である時間の長さは0です。従って

$$
\int_s^t
\operatorname{sgn}(B_u)^2\,du
=
t-s
\qquad\text{a.s.}
$$

です。

よって

$$
E|M_{s,t}|^p
\le
C_p|t-s|^{p/2}.
$$

Tanaka formula と

$$
|x+y|^p
\le
2^{p-1}(|x|^p+|y|^p)
$$

から

$$
E|L_t^0-L_s^0|^p
\le
C'_p|t-s|^{p/2}.
$$

$p>2$ なら Kolmogorov--Chentsov theorem から任意の

$$
\alpha
<
\frac{p/2-1}{p}
=
\frac12-\frac1p
$$

で Hölder continuous version を取れます。

STO8 の local time はすでに continuous version として構成されているため continuous-modification uniqueness により同じ version にこの regularity を移せます。

$p$ を大きくすれば任意の $\alpha<1/2$ を得ます。
<!-- proof-end -->

---

## 9. local time measure は零点集合に載る

continuous increasing function $t\mapsto L_t^0$ が定める Stieltjes measure を

$$
\mu_L((s,t])
=
L_t^0-L_s^0
$$

とします。

STO8 の [local time が level set の外では増加しない命題](../STO8/index.md#prop-sto8-local-time-level-increase) により

$$
\operatorname{supp}\mu_L
\subset
Z.
$$

さらに $\mu_L([0,1])=L_1^0>0$ a.s. です。

実際 STO8 の [reflection representation](../STO8/index.md#thm-sto8-reflection-local-time) から

$$
L_1^0
\overset d=
-\min_{0\le s\le1}B_s.
$$

[reflection principle](../STO4/index.md#thm-sto4-reflection-principle) と対称性から Brown motion は時刻0の直後に負の値を取るので

$$
-\min_{0\le s\le1}B_s>0
\qquad\text{a.s.}
$$

です。

---

## 10. 零点集合の Hausdorff dimension：下界

固定した $\alpha<1/2$ を取ります。

local time の temporal Hölder estimate から、ほとんど確実に

$$
L_t^0-L_s^0
\le
C_\alpha|t-s|^\alpha.
$$

任意の集合 $U\subset[0,1]$ は長さ $\operatorname{diam}U$ の区間に含まれるため、$\mu_L^*$ を Stieltjes measure $\mu_L$ から作る外測度とすると

$$
\mu_L^*(U)
\le
C_\alpha(\operatorname{diam}U)^\alpha.
$$

<a id="thm-sto4a-zero-dim-lower"></a>

<!-- formal-statement-start -->
> **定理（Brownian zero set の dimension 下界）**  
> ほとんど確実に
>
$$
\dim_HZ\ge\frac12.
$$
<!-- formal-statement-end -->

<!-- proof-start -->
### 証明

固定した rational $\alpha<1/2$ を取ります。

$\mu_L$ は $Z$ に集中し、

$$
\mu_L(Z)
=
L_1^0
>
0
$$

a.s. です。

また temporal Hölder estimate から

$$
\mu_L^*(U)
\le
C_\alpha(\operatorname{diam}U)^\alpha
$$

が全ての $U\subset[0,1]$ について成り立ちます。

従って MT8 の [質量分布原理](../MT8/index.md#thm-mt8-mass-principle) を適用して

$$
\mathcal H^\alpha(Z)
\ge
\frac{L_1^0}{C_\alpha}
>
0.
$$

よって

$$
\dim_HZ\ge\alpha.
$$

任意の rational $\alpha<1/2$ について成り立つので

$$
\dim_HZ\ge\frac12.
$$
<!-- proof-end -->

---

## 11. Brownian zero set の次元は $1/2$

<a id="thm-sto4a-zero-set-dimension"></a>

<!-- formal-statement-start -->
> **定理（Brownian zero set の Hausdorff dimension）**  
> standard Brown motion $B$ の
>
$$
Z=\{t\in[0,1]:B_t=0\}
$$
>
> に対し
>
$$
\boxed{
\dim_HZ=\frac12
}
$$
>
> がほとんど確実に成り立つ。
<!-- formal-statement-end -->

<!-- proof-start -->
### 証明

上界定理から

$$
\dim_HZ\le\frac12,
$$

下界定理から

$$
\dim_HZ\ge\frac12.
$$

両者を合わせれば結論です。

この結果は

$$
|Z|=0
$$

と全く矛盾しません。Lebesgue measure は一次元の尺度なので、dimension $1/2$ の集合は長さ0です。

一方、可算集合の Hausdorff dimension は0です。従って Brownian zero set は「長さは0だが、可算集合よりはるかに大きい」fractallike set です。

<!-- proof-end -->

---

## 12. 何が $1/2$ を繰り返し生むのか

本章では $1/2$ が三つの場所に現れました。

### 標本路正則性

$$
|B_t-B_s|
\approx
|t-s|^{1/2}.
$$

### quadratic variation

時間幅 $1/n$ の increment は大きさ $n^{-1/2}$ なので、その二乗を $n$ 個足すと

$$
n\times n^{-1}
\approx1.
$$

### zero-set dimension

時間幅 $h$ の interval が zero set と交わる個数は期待値で

$$
h^{-1/2}
$$

程度です。

従って cover cost は

$$
h^{-1/2}h^s
=
h^{s-1/2},
$$

ここでも threshold は $s=1/2$ です。

同じ指数が、increment scaling、variation、fractal dimension に違う姿で現れています。

---

## 13. この章では止めるもの

Brownian geometry はさらに深く続きます。

- law of the iterated logarithm
- exact modulus of continuity
- graph の Hausdorff dimension $3/2$
- planar Brown 標本路 の dimension 2
- intersection exponents
- frontier dimension
- multifractal analysis

これらは本章の直接目的を越えるため扱いません。

特に graph dimension $3/2$ は「標本路 が $\alpha<1/2$ Hölder」だけから上界の雰囲気は見えますが、厳密な下界にはエネルギー評価など別系統の手法が必要です。ここでは名前だけの theorem を置かず、停止線として明示します。

---

# 14. 演習 A

<a id="ex-sto4a-a01"></a>

## STO4A-A01 Gaussian moment から Hölder exponent を読む

- Level: A

$p=8$ を使うと Kolmogorov--Chentsov theorem から Brown motion に対してどこまでの Hölder exponent が得られるか。

<!-- solution-start -->
### 詳細解答

Brown increment は

$$
E|B_t-B_s|^8
=
c_8|t-s|^4.
$$

Kolmogorov--Chentsov theorem の形

$$
E|X_t-X_s|^\alpha
\le
C|t-s|^{1+\beta}
$$

と比べると

$$
\alpha=8,
\qquad
1+\beta=4,
\qquad
\beta=3.
$$

得られる Hölder exponent は

$$
\gamma<\frac{\beta}{\alpha}
=
\frac38.
$$

従って $p=8$ だけなら任意の $\gamma<3/8$ までです。

$1/2$ に近づけるには $p$ をさらに大きくします。
<!-- solution-end -->

<a id="ex-sto4a-a02"></a>

## STO4A-A02 $\alpha>1/2$ と quadratic variation

- Level: A

$f$ が $[0,1]$ で $\alpha$-Hölder、$\alpha>1/2$ とする。等分 partition に沿う

$$
Q_n
=
\sum_{k=0}^{n-1}
|f((k+1)/n)-f(k/n)|^2
$$

が0へ収束することを示せ。

<!-- solution-start -->
### 詳細解答

Hölder 定数を $C$ とすると

$$
|f((k+1)/n)-f(k/n)|
\le
C n^{-\alpha}.
$$

従って

$$
Q_n
\le
n C^2n^{-2\alpha}
=
C^2n^{1-2\alpha}.
$$

$\alpha>1/2$ なので

$$
1-2\alpha<0.
$$

従って

$$
Q_n\to0.
$$

Brown motion では quadratic variation が1へ行くので、この regularity は持てません。
<!-- solution-end -->

<a id="ex-sto4a-a03"></a>

## STO4A-A03 zero set の閉性と Lebesgue measure

- Level: A

Brownian zero set

$$
Z=\{t\in[0,1]:B_t=0\}
$$

が閉で、Lebesgue measure 0 である理由をそれぞれ説明せよ。

<!-- solution-start -->
### 詳細解答

Brown 標本路 は連続です。singleton $\{0\}\subset\mathbb R$ は閉なので、その逆像

$$
Z=B^{-1}(\{0\})
$$

は閉です。

Lebesgue measure については STO8 の Brownian level-set zero-time theorem を $a=0,T=1$ に適用して

$$
\int_0^1 1_{\{B_t=0\}}\,dt
=
0
\qquad\text{a.s.}
$$

です。

左辺は $Z$ の Lebesgue measure そのものなので

$$
|Z|=0.
$$
<!-- solution-end -->

<a id="ex-sto4a-a04"></a>

## STO4A-A04 dyadic interval の hitting probability

- Level: A

$h=1/n$, $k\ge1$ とし

$$
I_k=[kh,(k+1)h].
$$

Gaussian tail bound

$$
2(1-\Phi(y))\le e^{-y^2/2}
$$

を使って

$$
P(I_k\cap Z\ne\varnothing)
\le
\frac1{\sqrt{k+1}}
$$

を示せ。

<!-- solution-start -->
### 詳細解答

$B_{kh}=x$ で条件付けます。Markov property と [reflection principle](../STO4/index.md#thm-sto4-reflection-principle) から、次の長さ $h$ の時間で0へ到達する確率は

$$
2\left(
1-\Phi\left(\frac{|x|}{\sqrt h}\right)
\right).
$$

tail bound から

$$
\le
\exp\left(-\frac{x^2}{2h}\right).
$$

従って

$$
P(I_k\cap Z\ne\varnothing)
\le
E\left[
e^{-B_{kh}^2/(2h)}
\right].
$$

$B_{kh}/\sqrt h\sim N(0,k)$ なので

$$
\frac{B_{kh}}{\sqrt h}
=
\sqrt{k}Z_0
$$

と書けます。従って

$$
E[e^{-kZ_0^2/2}]
=
\frac1{\sqrt{2\pi}}
\int_{\mathbb R}
e^{-(k+1)x^2/2}\,dx
=
\frac1{\sqrt{k+1}}.
$$
<!-- solution-end -->

# 15. 演習 B

<a id="ex-sto4a-b01"></a>

## STO4A-B01 nowhere differentiability の3増分論法

- Level: B

$n=2^m$ とする。ある dyadic cell の左右を含む3本の Brownian increments が全て $4M/n$ 以下になる事象の確率を $O(n^{-1/2})$ と評価し、それが differentiability を排除する理由を説明せよ。

<!-- solution-start -->
### 詳細解答

各 increment は $N(0,1/n)$ です。従って

$$
P\left(
|\Delta|\le\frac{4M}{n}
\right)
=
P\left(
|Z|\le\frac{4M}{\sqrt n}
\right)
\le
C M n^{-1/2}.
$$

3本は独立なので、固定 cell の3増分が同時に小さい確率は

$$
\le
C_Mn^{-3/2}.
$$

候補 cell は高々 $n$ 個なので [union bound](../F0_00P2A_期待値_LOTUS/index.md#thm-f0-00p2a-union-bound) から

$$
P(A_{n,M})
\le
C_Mn^{-1/2}.
$$

dyadic $n=2^m$ なら

$$
\sum_mP(A_{2^m,M})
\le
C_M\sum_m2^{-m/2}
<
\infty.
$$

従って Borel--Cantelli により、この事象はほとんど確実に有限回しか起こりません。

一方、ある interior point $t$ で微分可能なら局所 Lipschitz estimate

$$
|B_s-B_t|\le M|s-t|
$$

が成り立ちます。十分細かい dyadic mesh では $t$ を含む cell と左右の3増分の両端は $t$ から $O(1/n)$ 以内なので、3増分全てが $4M/n$ 以下になります。

従って bad event が全ての十分大きい dyadic scale で起こる必要があり、Borel--Cantelli と矛盾します。
<!-- solution-end -->

<a id="ex-sto4a-b02"></a>

## STO4A-B02 zero-set dimension の上界

- Level: B

dyadic mesh $n=2^m$ で zero set と交わる interval 数を $N_n$ とし

$$
E[N_n]\le C\sqrt n
$$

が分かっているとする。任意の $s>1/2$ に対し $\mathcal H^s(Z)=0$ を示せ。

<!-- solution-start -->
### 詳細解答

zero set と交わる dyadic intervals だけで $Z$ を覆えます。一個の直径は $1/n$ なので cover cost は

$$
Y_n=N_nn^{-s}.
$$

期待値は

$$
E[Y_n]
\le
Cn^{1/2-s}.
$$

dyadic $n=2^m$ に限れば

$$
\sum_mE[Y_{2^m}]
\le
C\sum_m2^{-m(s-1/2)}
<
\infty.
$$

[Tonelli](../F0_00D2C_積測度_Tonelli_Fubini/index.md#thm-tonelli) theorem により

$$
\sum_mY_{2^m}<\infty
\qquad\text{a.s.}
$$

従って $Y_{2^m}\to0$ a.s.

各 $Y_{2^m}$ は mesh $2^{-m}$ の具体的 cover cost なので

$$
\mathcal H^s(Z)=0.
$$

したがって

$$
\dim_HZ\le s.
$$

任意の $s>1/2$ で成り立つため

$$
\dim_HZ\le\frac12.
$$
<!-- solution-end -->

<a id="ex-sto4a-b03"></a>

## STO4A-B03 local time measure から dimension 下界へ

- Level: B

ある $\alpha<1/2$ について

$$
|L_t^0-L_s^0|
\le
C_\alpha|t-s|^\alpha
$$

が成り立ち、Stieltjes measure $\mu_L=dL^0$ が zero set $Z$ に集中し、$L_1^0>0$ とする。

[質量分布原理](../MT8/index.md#thm-mt8-mass-principle) から $\dim_HZ\ge\alpha$ を示せ。

<!-- solution-start -->
### 詳細解答

任意の $U\subset[0,1]$ を取ります。

$U$ は長さ $\operatorname{diam}U$ の閉区間 $I$ に含まれます。従って $\mu_L^*$ を外測度とすれば

$$
\mu_L^*(U)
\le
\mu_L(I).
$$

Hölder estimate から

$$
\mu_L(I)
\le
C_\alpha(\operatorname{diam}I)^\alpha
=
C_\alpha(\operatorname{diam}U)^\alpha.
$$

また $\mu_L$ は $Z$ に集中し

$$
\mu_L(Z)=L_1^0>0.
$$

MT8 の [質量分布原理](../MT8/index.md#thm-mt8-mass-principle) から

$$
\mathcal H^\alpha(Z)
\ge
\frac{L_1^0}{C_\alpha}
>
0.
$$

従って

$$
\dim_HZ\ge\alpha.
$$
<!-- solution-end -->

# 16. 演習 C

<a id="ex-sto4a-c01"></a>

## STO4A-C01 Brownian zero set の Hausdorff dimension を再構成する

- Level: C

standard Brown motion の

$$
Z=\{t\in[0,1]:B_t=0\}
$$

について、次の流れで

$$
\dim_HZ=\frac12
$$

を再構成せよ。

1. dyadic interval $I_{k,n}$ が $Z$ と交わる確率を $C/\sqrt{k+1}$ で抑える。
2. $E[N_n]\le C\sqrt n$ を導く。
3. $s>1/2$ で dyadic cover の $s$-cost が0へ行くことを示す。
4. Tanaka formula と [BDG inequality](../STO6/index.md#thm-sto6-bdg) から
   $$
   E|L_t^0-L_s^0|^p
   \le
   C_p|t-s|^{p/2}
   $$
   を示す。
5. $\alpha<1/2$ に対し local time が temporal $\alpha$-Hölder であることを導く。
6. $dL^0$ が $Z$ に集中し総質量 $L_1^0>0$ であることを使い、[質量分布原理](../MT8/index.md#thm-mt8-mass-principle) から下界を出す。
7. 上下界を合わせる。

<!-- solution-start -->
### 詳細解答

1. $h=1/n$ とします。$B_{kh}=x$ で条件付けると、次の時間 $h$ 内に0へ hit する確率は

   $$
   2\left(
   1-\Phi\left(\frac{|x|}{\sqrt h}\right)
   \right).
   $$

   Gaussian tail bound から

   $$
   \le
   e^{-x^2/(2h)}.
   $$

   $B_{kh}/\sqrt h\sim N(0,k)$ なので

   $$
   P(I_{k,n}\cap Z\ne\varnothing)
   \le
   E[e^{-kZ_0^2/2}]
   =
   \frac1{\sqrt{k+1}}.
   $$

2. $k=0$ の interval は0を含むので必ず hit します。従って

   $$
   E[N_n]
   \le
   1+\sum_{k=1}^{n-1}\frac1{\sqrt{k+1}}
   \le
   C\sqrt n.
   $$

3. zero-hit interval だけで $Z$ を覆うと

   $$
   \mathcal H_{1/n}^s(Z)
   \le
   N_nn^{-s}.
   $$

   dyadic $n=2^m$ について

   $$
   \sum_mE[N_{2^m}2^{-ms}]
   \le
   C\sum_m2^{-m(s-1/2)}
   <
   \infty.
   $$

   [Tonelli](../F0_00D2C_積測度_Tonelli_Fubini/index.md#thm-tonelli) により cover cost は a.s. 0へ行くため

   $$
   \mathcal H^s(Z)=0
   $$

   で、

   $$
   \dim_HZ\le\frac12.
   $$

4. Tanaka formula から

   $$
   L_t^0-L_s^0
   =
   |B_t|-|B_s|
   -
   \int_s^t\operatorname{sgn}(B_u)\,dB_u.
   $$

   第1項は absolute value が 1-Lipschitz なので

   $$
   E\bigl||B_t|-|B_s|\bigr|^p
   \le
   C_p|t-s|^{p/2}.
   $$

   第2項は [BDG inequality](../STO6/index.md#thm-sto6-bdg) から

   $$
   E\left|
   \int_s^t\operatorname{sgn}(B_u)\,dB_u
   \right|^p
   \le
   C_p
   E\left[
   \left(
   \int_s^t\operatorname{sgn}(B_u)^2du
   \right)^{p/2}
   \right].
   $$

   Brownian zero set has Lebesgue time 0 なので bracket は $t-s$。従ってこちらも

   $$
   \le
   C_p|t-s|^{p/2}.
   $$

   よって

   $$
   E|L_t^0-L_s^0|^p
   \le
   C'_p|t-s|^{p/2}.
   $$

5. Kolmogorov--Chentsov theorem により

   $$
   \alpha<\frac12-\frac1p
   $$

   の Hölder exponent が得られます。$p$ を十分大きく選べば任意の $\alpha<1/2$ を得ます。

6. STO8 により $dL^0$ は $Z$ の外に質量を持ちません。また reflection representation から

   $$
   L_1^0
   \overset d=
   -\min_{0\le t\le1}B_t
   >0
   \qquad\text{a.s.}
   $$

   local time Hölder estimate から任意の $U\subset[0,1]$ に対し

   $$
   \mu_L^*(U)
   \le
   C_\alpha(\operatorname{diam}U)^\alpha.
   $$

   [質量分布原理](../MT8/index.md#thm-mt8-mass-principle) で

   $$
   \mathcal H^\alpha(Z)
   \ge
   \frac{L_1^0}{C_\alpha}
   >0.
   $$

   従って

   $$
   \dim_HZ\ge\alpha.
   $$

   任意の $\alpha<1/2$ について成り立つので

   $$
   \dim_HZ\ge\frac12.
   $$

7. 上界と下界を合わせて

   $$
   \boxed{
   \dim_HZ=\frac12
   }
   $$

   です。

この証明では、上界は **hit する dyadic cells の個数**、下界は **zero set 上に載る local-time measure** が担当しています。MT8 の「cover と measure の二方向」が Brownian geometry でそのまま再現されています。
<!-- solution-end -->

---

## 17. 章末チェック

- [ ] Gaussian increment moments から $1/2$ 未満 Hölder regularity を導ける。
- [ ] $\alpha>1/2$ Hölder 標本路 の quadratic variation が0になることを示せる。
- [ ] Brownian quadratic variation が $1/2$ を critical exponent にする理由を説明できる。
- [ ] dyadic triple increments と Borel--Cantelli から nowhere differentiability を証明できる。
- [ ] zero set が closed、perfect、Lebesgue-null になる理由を説明できる。
- [ ] dyadic hit intervals の期待個数が $O(\sqrt n)$ になる計算を再現できる。
- [ ] zero set の Hausdorff dimension 上界 $1/2$ を cover から出せる。
- [ ] Tanaka + BDG から local time の temporal Hölder regularity を導ける。
- [ ] local-time Stieltjes measure と [質量分布原理](../MT8/index.md#thm-mt8-mass-principle) から dimension 下界を出せる。
- [ ] Brownian zero set の Hausdorff dimension $1/2$ の上下証明を再構成できる。
