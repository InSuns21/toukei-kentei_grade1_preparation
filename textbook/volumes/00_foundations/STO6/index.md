# STO6：stochastic integral — 単純予測可能過程から局所 martingale まで

<!-- definition-example-audit: strict -->

STO5 では、Brown 運動や一般の continuous local martingale が持つ二次変分を先に作りました。ここでようやく

$$
\int_0^t H_s\,dM_s
$$

を数学的対象として構成します。

普通の Riemann 積分のように「各標本路について微小量を足す」と考えるのではありません。Brown 運動の標本路は almost surely finite variation ではないため、pathwise な Riemann--Stieltjes 積分を主役にはできないからです。

代わりに、

$$
\boxed{
\text{simple predictable integrand}
\to
\text{増分和}
\to
\text{Itô isometry}
\to
L^2\text{ completion}
\to
\text{localization}
}
$$

という順で作ります。

この構成で最も大切なのは二点です。

1. 係数は未来の increment を見ないこと。
2. 積分の誤差を pathwise variation ではなく二乗平均と bracket で測ること。

STO7 の Itô formula は、この章で積分が完成して初めて厳密に書けるようになります。

---

## 1. simple predictable integrand

まず有限個の時間区間だけで値が変わる process から始めます。

<a id="def-sto6-simple-predictable"></a>

<!-- formal-statement-start -->
> **定義（simple predictable integrand）**  
> deterministic partition
>
> $$
> 0=t_0<t_1<\cdots<t_n=T
> $$
>
> と、各 $k=0,\ldots,n-1$ について bounded な $\mathcal F_{t_k}$-measurable random variable $\xi_k$ を取る。
>
> $$
> H_t
> =
> \sum_{k=0}^{n-1}
> \xi_k\,1_{(t_k,t_{k+1}]}(t)
> $$
>
> と表される process $H$ を、$[0,T]$ 上の **simple predictable integrand** という。
<!-- formal-statement-end -->

区間 $(t_k,t_{k+1}]$ に入る瞬間には、係数 $\xi_k$ はすでに $\mathcal F_{t_k}$ で決まっています。これが predictable の最小模型です。

<!-- definition-example-start: def-sto6-simple-predictable -->
### 直接例：過去の Brownian 値を次の区間の係数にする

$0<s<T$ を固定し、

$
\xi_s:=1_{\{B_s\ge0\}},
\qquad
H_t
=
1_{(0,s]}(t)
+
\xi_s\,1_{(s,T]}(t)
$

とします。

最初の係数 $1$ は $\mathcal F_0$-measurable、二つ目の係数 $\xi_s$ は bounded かつ $\mathcal F_s$-measurable です。従って定義どおり $H$ は simple predictable です。

重要なのは、二つ目の区間で $B_T-B_s$ を積分するとき、その係数 $\xi_s$ は increment が始まる時点ですでに分かっていることです。
<!-- definition-example-end -->

---

## 2. simple stochastic integral

continuous martingale $M$ に対して、simple integrand の積分は増分和で定義できます。

<a id="def-sto6-simple-integral"></a>

<!-- formal-statement-start -->
> **定義（simple stochastic integral）**  
> $M=(M_t)_{0\le t\le T}$ を continuous martingale、$H$ を
>
> $$
> H_t=\sum_{k=0}^{n-1}\xi_k1_{(t_k,t_{k+1}]}(t)
> $$
>
> と表される simple predictable integrand とする。
>
> $$
> (H\cdot M)_t
> :=
> \sum_{k=0}^{n-1}
> \xi_k
> \left(
> M_{t\wedge t_{k+1}}-M_{t\wedge t_k}
> \right),
> \qquad 0\le t\le T
> $$
>
> を $H$ の $M$ に関する **simple stochastic integral** といい、
>
> $$
> \int_0^t H_s\,dM_s
> $$
>
> とも書く。
<!-- formal-statement-end -->

この定義は representation に依存しません。分割を細かくして同じ process を書き直しても、同じ増分を小分けしているだけだからです。

各項は continuous なので $(H\cdot M)_t$ も continuous です。また $t$ までに現れる係数と increment は $\mathcal F_t$-measurable なので adapted です。

<!-- definition-example-start: def-sto6-simple-integral -->
### 直接例：二段階の Brownian stochastic integral

前節の

$
H_t
=
1_{(0,s]}(t)+1_{\{B_s\ge0\}}1_{(s,T]}(t)
$

を Brown 運動 $B$ に対して積分すると、

$
(H\cdot B)_t
=
B_{t\wedge s}
+
1_{\{B_s\ge0\}}
\left(B_t-B_s\right)1_{\{t>s\}}.
$

特に $t=T$ では

$
\int_0^T H_u\,dB_u
=
B_s+1_{\{B_s\ge0\}}(B_T-B_s).
$

第二項の条件付き期待値は

$
E[1_{\{B_s\ge0\}}(B_T-B_s)\mid\mathcal F_s]
=
1_{\{B_s\ge0\}}E[B_T-B_s\mid\mathcal F_s]
=0.
$

predictability が martingale cancellation を保っていることが見えます。
<!-- definition-example-end -->

---

## 3. bracket を測度として読む

stochastic integral は $M$ の増分だけで定義されるため、$M_0\neq0$ でも
$
\widetilde M_t:=M_t-M_0
$
へ置き換えれば積分は変わりません。また $[\widetilde M]=[M]$ です。したがって $L^2$ 構成では、必要な箇所で $M_0=0$ と正規化しても一般性を失いません。

STO5 で continuous local martingale $M$ に対する increasing process $[M]$ を構成しました。

固定した $T$ で $M$ が square-integrable martingale、$M_0=0$ なら

$$
E[M]_T=E[M_T^2].
$$

この等式を一度確認しておきます。

$M$ と $[M]$ を同時に bounded にする stopping time $\tau_n$ を取り、STO5 の

$$
M^2-[M]
$$

が local martingale であることを停止後に使うと

$$
E[M]_{T\wedge\tau_n}
=
E[M_{T\wedge\tau_n}^2].
$$

左辺は monotone convergence で $E[M]_T$ へ行きます。

一方、STO5 の bounded stopping theorem から

$$
M_{T\wedge\tau_n}
=
E[M_T\mid\mathcal F_{T\wedge\tau_n}],
$$

なので Jensen により

$$
E[M_{T\wedge\tau_n}^2]\le E[M_T^2].
$$

逆向きは almost-sure convergence と Fatou から得られます。従って等号です。

このため

$$
\mu_M(A)
:=
E\left[
\int_0^T1_A(\omega,t)\,d[M]_t
\right]
$$

は predictable sigma-field 上の有限測度になります。stochastic integral の integrand は、この測度に関する $L^2$ 空間で完成させます。

---

## 4. Itô isometry

<a id="thm-sto6-ito-isometry-simple"></a>

<!-- formal-statement-start -->
> **定理（Itô isometry：simple predictable integrand）**  
> $M$ を $M_0=0$ の continuous square-integrable martingale とし、$H$ を bounded simple predictable integrand とする。このとき
>
> $$
> E\left[
> \left(
> \int_0^T H_s\,dM_s
> \right)^2
> \right]
> =
> E\left[
> \int_0^T H_s^2\,d[M]_s
> \right].
> $$
>
> 特に Brown 運動 $B$ では $[B]_t=t$ なので
>
> $$
> E\left[
> \left(
> \int_0^T H_s\,dB_s
> \right)^2
> \right]
> =
> E\left[
> \int_0^T H_s^2\,ds
> \right].
> $$
<!-- formal-statement-end -->

### 証明の見取り図

simple integral は

$$
\sum_k\xi_k\Delta_kM
$$

です。異なる時間区間の項は martingale increment の直交性で消えます。対角項だけが残り、

$$
E[\xi_k^2(\Delta_kM)^2]
$$

を bracket increment

$$
E[\xi_k^2\Delta_k[M]]
$$

へ置き換えます。

<!-- proof-start -->
### 証明

$H_t=\sum_{k=0}^{n-1}\xi_k1_{(t_k,t_{k+1}]}(t)$ と書きます。

終端値は

$$
I_T
=
\sum_{k=0}^{n-1}\xi_k\Delta_kM,
\qquad
\Delta_kM=M_{t_{k+1}}-M_{t_k}.
$$

従って

$$
E[I_T^2]
=
\sum_kE[\xi_k^2(\Delta_kM)^2]
+
2\sum_{i<j}
E[\xi_i\xi_j\Delta_iM\Delta_jM].
$$

$i<j$ なら

$$
\xi_i\xi_j\Delta_iM
$$

は $\mathcal F_{t_j}$-measurable です。よって

$$
\begin{aligned}
E[\xi_i\xi_j\Delta_iM\Delta_jM]
&=
E\left[
\xi_i\xi_j\Delta_iM\,
E[\Delta_jM\mid\mathcal F_{t_j}]
\right]\\
&=0.
\end{aligned}
$$

次に STO5 の quadratic variation theorem により

$$
M_t^2-[M]_t
$$

は local martingale です。$[0,T]$ 上で必要な停止を施して integrability を確保し、最後に localization を外せば

$$
E\left[
(\Delta_kM)^2-\Delta_k[M]
\mid\mathcal F_{t_k}
\right]
=0.
$$

従って $\xi_k^2$ が $\mathcal F_{t_k}$-measurable であることから

$$
E[\xi_k^2(\Delta_kM)^2]
=
E[\xi_k^2\Delta_k[M]].
$$

よって

$$
E[I_T^2]
=
\sum_kE[\xi_k^2\Delta_k[M]]
=
E\left[
\int_0^T H_s^2\,d[M]_s
\right].
$$

Brown 運動では $d[B]_s=ds$ なので最後の式は通常の時間積分になります。
<!-- proof-end -->

この定理が construction のエンジンです。積分そのものをまだ一般 process に対して定義していなくても、simple integrand の距離

$$
\|H\|_{M,T}^2
=
E\int_0^T H_s^2\,d[M]_s
$$

と積分結果の $L^2$ 距離が一致します。

---

## 5. $L^2(M)$ integrand と simple process の稠密性

<a id="def-sto6-l2m"></a>

<!-- formal-statement-start -->
> **定義（L2(M) integrand）**  
> $M$ を $M_0=0$ の continuous square-integrable martingale とする。predictable process $H$ が
>
> $$
> E\int_0^T H_s^2\,d[M]_s<\infty
> $$
>
> を満たすとき、$H$ を $[0,T]$ 上の **$L^2(M)$ integrand** という。
>
> $d\mu_M=dP\,d[M]$ に関して同値な process は同一視する。
<!-- formal-statement-end -->

<!-- definition-example-start: def-sto6-l2m -->
### 直接例：Brown 運動と deterministic integrand

$h\in L^2([0,T])$ を deterministic とします。deterministic Borel process は predictable なので

$$
E\int_0^T h(s)^2\,d[B]_s
=
\int_0^T h(s)^2\,ds
<\infty.
$$

従って $h$ は $L^2(B)$ integrand です。

この場合 stochastic integral は後で

$$
\int_0^T h(s)\,dB_s
$$

として構成され、平均 0、分散 $\int_0^T h^2$ の Gaussian random variable になります。
<!-- definition-example-end -->

<a id="lem-sto6-simple-density"></a>

<!-- formal-statement-start -->
> **補題（simple predictable integrands の L2 density）**  
> 固定した $T$ で、bounded simple predictable integrands は
>
> $$
> L^2(\Omega\times(0,T],\mathcal P,\mu_M)
> $$
>
> に稠密である。ここで $\mathcal P$ は predictable sigma-field、
>
> $$
> \mu_M(A)=E\int_0^T1_A\,d[M]
> $$
>
> である。
<!-- formal-statement-end -->

### なぜ稠密なのか

predictable sigma-field は

$$
A\times(s,t],
\qquad
A\in\mathcal F_s,
$$

型の rectangle と時刻 0 の情報から生成されます。

その indicator は

$$
1_A(\omega)1_{(s,t]}(u)
$$

で、simple predictable integrand そのものです。

$\mu_M$ は有限測度なので、一般の $L^2(\mu_M)$ predictable function は

1. 値を $[-r,r]$ に切り詰めて bounded にし、
2. bounded measurable function を simple function で近似し、
3. measurable set の indicator を生成 algebra の有限和で近似する

ことで simple predictable integrand へ近似できます。

<!-- proof-start -->
### 証明

まず $H\in L^2(\mu_M)$ に対し

$$
H^{(r)}
=
(-r)\vee H\wedge r
$$

と値を $[-r,r]$ に切り詰めると

$$
\|H^{(r)}-H\|_{L^2(\mu_M)}\to0
$$

です。従って bounded predictable function だけを考えれば十分です。

bounded predictable function は predictable sigma-field 上の simple measurable functions で $L^2$ 近似できます。

残るのは predictable set の indicator を simple predictable rectangles で近似することです。

simple predictable rectangles の有限和で作る algebra を $\mathcal A$ とします。$\mathcal A$ は predictable sigma-field $\mathcal P$ を生成します。

有限測度 $\mu_M$ のもとで、

$$
\mathcal C
=
\left\{
C\in\mathcal P:
1_C
\text{ が }\mathcal A\text{-simple functions で }L^2(\mu_M)\text{ 近似可能}
\right\}
$$

と置きます。

$\mathcal C$ は $\mathcal A$ を含み、補集合と互いに素な可算和に対して閉じます。例えば $C_n\uparrow C$ なら

$$
\|1_C-1_{C_n}\|_{L^2(\mu_M)}^2
=
\mu_M(C\setminus C_n)\to0
$$

です。

従って monotone class theorem により $\mathcal C=\mathcal P$。よって predictable simple functions、さらに simple predictable integrands が $L^2(\mu_M)$ に稠密です。
<!-- proof-end -->

---

## 6. $L^2$ completion で stochastic integral を作る

<a id="thm-sto6-l2-construction"></a>

<!-- formal-statement-start -->
> **定理（L2 completion による stochastic integral の構成）**  
> $M$ を $M_0=0$ の continuous square-integrable martingale、$H\in L^2(M)$ とする。
>
> simple predictable $H^{(n)}$ で
>
> $$
> E\int_0^T|H_s^{(n)}-H_s|^2\,d[M]_s\to0
> $$
>
> となるものを取る。
>
> このとき simple stochastic integrals
>
> $$
> I_t^{(n)}
> =
> \int_0^tH_s^{(n)}\,dM_s
> $$
>
> は $[0,T]$ 上一様に probability で収束し、適切な subsequence では almost surely sup 距離で収束する。
>
> 極限 $I$ は近似列に依存せず、continuous square-integrable martingale となる。この $I$ を
>
> $$
> I_t=\int_0^tH_s\,dM_s
> $$
>
> と定義する。
>
> さらに各 $t\le T$ で
>
> $$
> E[I_t^2]
> =
> E\int_0^tH_s^2\,d[M]_s.
> $$
<!-- formal-statement-end -->

この定理には「なぜ終端値だけでなく process 全体が収束するのか」という一点があります。そこを埋めるのが continuous-time Doob $L^2$ inequality です。

---

## 7. continuous-time Doob $L^2$ inequality

<a id="thm-sto6-doob-l2"></a>

<!-- formal-statement-start -->
> **定理（continuous-time Doob L2 maximal inequality）**  
> $N=(N_t)_{0\le t\le T}$ を continuous square-integrable martingale とする。このとき
>
> $$
> E\left[
> \sup_{0\le t\le T}|N_t|^2
> \right]
> \le
> 4E[|N_T|^2].
> $$
<!-- formal-statement-end -->

### 証明の見取り図

STO2 の離散時間 Doob maximal inequality を dyadic time grid に適用し、grid を細かくします。連続性があるため grid 上最大値は 標本路 supremum へ増加します。

<!-- proof-start -->
### 証明

$n\ge1$ に対し dyadic grid

$$
D_n
=
\left\{
kT2^{-n}:k=0,\ldots,2^n
\right\}
$$

を取ります。

離散時間 martingale

$
N_{kT2^{-n}}
$

を考え、その最大値を

$
X_n^*
=
\max_{t\in D_n}|N_t|
$

と書きます。$|N|$ は submartingale なので、STO2 の Doob maximal inequality の stopping-time proof を事象 $\{X_n^*\ge\lambda\}$ まで保持すると

$
\lambda P(X_n^*\ge\lambda)
\le
E\left[
|N_T|1_{\{X_n^*\ge\lambda\}}
\right].
$

tail integral formula を使えば

$
\begin{aligned}
E[(X_n^*)^2]
&=
2\int_0^\infty
\lambda P(X_n^*\ge\lambda)\,d\lambda\\
&\le
2\int_0^\infty
E\left[
|N_T|1_{\{X_n^*\ge\lambda\}}
\right]d\lambda\\
&=
2E[|N_T|X_n^*].
\end{aligned}
$

Tonelli を使った最後の等式では

$
\int_0^\infty1_{\{X_n^*\ge\lambda\}}\,d\lambda=X_n^*
$

としました。Hölder inequality（指数 $2,2$）より

$
E[(X_n^*)^2]
\le
2\|N_T\|_2\|X_n^*\|_2.
$

$\|X_n^*\|_2=0$ なら結論は自明で、それ以外なら両辺を $\|X_n^*\|_2$ で割って

$
\|X_n^*\|_2
\le
2\|N_T\|_2.
$

従って

$
E[(X_n^*)^2]
\le
4E[|N_T|^2].
$

$D_n\subset D_{n+1}$ なので左辺の random variables は単調増加します。連続標本路では dyadic points が dense なので

$$
\max_{t\in D_n}|N_t|^2
\uparrow
\sup_{0\le t\le T}|N_t|^2.
$$

monotone convergence theorem により

$$
E\left[
\sup_{0\le t\le T}|N_t|^2
\right]
\le
4E[|N_T|^2].
$$
<!-- proof-end -->

この証明では STO2 の stopping-time argument から得られる tail inequality を実際に積分して $p=2$ 形まで導いたので、未証明の連続時間 maximal theorem は使っていません。

---

## 8. completion theorem の論証

<!-- proof-start -->
### 証明

$H^{(n)}$ を [simple predictable density](#lem-sto6-simple-density) で選び、

$$
I^{(n)}=H^{(n)}\cdot M
$$

と置きます。

$n,m$ に対して [Itô isometry](#thm-sto6-ito-isometry-simple) と [Doob $L^2$ inequality](#thm-sto6-doob-l2) から

$$
\begin{aligned}
E\left[
\sup_{t\le T}|I_t^{(n)}-I_t^{(m)}|^2
\right]
&\le
4E\left[
|I_T^{(n)}-I_T^{(m)}|^2
\right]\\
&=
4E\int_0^T
|H_s^{(n)}-H_s^{(m)}|^2\,d[M]_s.
\end{aligned}
$$

右辺は 0 へ行くので、$I^{(n)}$ は 標本路 supremum の $L^2$ 距離で Cauchy です。

subsequence $(n_j)$ を

$$
\left(
E\sup_{t\le T}
|I_t^{(n_{j+1})}-I_t^{(n_j)}|^2
\right)^{1/2}
\le2^{-j}
$$

となるよう選べます。

Hölder inequality（指数 $2,2$）により

$$
E\left[
\sum_j
\sup_{t\le T}
|I_t^{(n_{j+1})}-I_t^{(n_j)}|
\right]
\le
\sum_j2^{-j}<\infty.
$$

従って almost surely

$$
\sum_j
\sup_{t\le T}
|I_t^{(n_{j+1})}-I_t^{(n_j)}|
<\infty.
$$

ゆえに subsequence は almost surely sup 距離で Cauchy で、continuous limit $I$ を持ちます。

元の列全体についても先ほどの $L^2$ estimate と subsequence limit を使えば

$$
E\sup_{t\le T}|I_t^{(n)}-I_t|^2\to0.
$$

特に各固定 $t$ で $I_t^{(n)}\to I_t$ in $L^2$ です。

$s\le t$ とすると

$$
E[I_t^{(n)}\mid\mathcal F_s]=I_s^{(n)}.
$$

conditional expectation は $L^2$ contraction なので極限を移せて

$$
E[I_t\mid\mathcal F_s]=I_s.
$$

従って $I$ は martingale です。

Itô isometry も

$$
E[(I_t^{(n)})^2]
=
E\int_0^t(H_s^{(n)})^2\,d[M]_s
$$

へ $L^2$ convergence と $L^2(\mu_M)$ convergence を入れて極限を取れば得られます。

別の近似列を使っても、両者を交互に並べた近似列へ同じ estimate を適用すれば極限差の supremum $L^2$ norm が 0 です。従って積分は近似列に依存しません。
<!-- proof-end -->

ここで $L^2$ 完備性は F0-00D2E の Riesz--Fischer 的な発想そのものです。今回は「確率変数の $L^2$」だけでなく、predictable process を random measure $d[M]$ で測った $L^2$ を使っています。

---

## 9. stochastic integral の quadratic variation

stochastic integral が単に martingale になるだけではありません。bracket も integrand から直接読めます。

<a id="thm-sto6-integral-bracket"></a>

<!-- formal-statement-start -->
> **定理（stochastic integral の quadratic variation）**  
> $M$ を $M_0=0$ の continuous square-integrable martingale、$H\in L^2(M)$ とし、
>
> $$
> I_t=\int_0^tH_s\,dM_s
> $$
>
> とする。このとき
>
> $$
> [I]_t
> =
> \int_0^tH_s^2\,d[M]_s,
> \qquad
> 0\le t\le T.
> $$
<!-- formal-statement-end -->

### 証明の見取り図

simple integrand なら、各区間で

$$
\Delta I=\xi_k\Delta M
$$

なので「二乗増分は係数の二乗倍」になります。

一般 integrand では simple approximation を使います。ただし partition limit を直接二重に追うのではなく、

$$
I^2-A
$$

が martingale になる increasing process $A$ の一意性を STO5 から使う方がきれいです。

<!-- proof-start -->
### 証明

まず simple

$$
H=\sum_k\xi_k1_{(t_k,t_{k+1}]}
$$

を考えます。

区間 $(t_k,t_{k+1}]$ 上では

$$
I_t-I_{t_k}
=
\xi_k(M_t-M_{t_k}).
$$

従って

$$
\begin{aligned}
I_t^2-I_{t_k}^2
&=
2I_{t_k}\xi_k(M_t-M_{t_k})\\
&\quad+
\xi_k^2(M_t-M_{t_k})^2.
\end{aligned}
$$

一方

$$
A_t-A_{t_k}
=
\xi_k^2([M]_t-[M]_{t_k}),
$$

ただし

$$
A_t=\int_0^tH_s^2\,d[M]_s.
$$

よって

$$
(I_t^2-A_t)-(I_{t_k}^2-A_{t_k})
$$

は

$$
2I_{t_k}\xi_k(M_t-M_{t_k})
+
\xi_k^2
\left\{
(M_t-M_{t_k})^2-([M]_t-[M]_{t_k})
\right\}.
$$

第一項は predictable coefficient を掛けた martingale increment、第二項も STO5 の

$$
M^2-[M]
$$

の martingale increment から martingale です。

従って区間ごとに貼り合わせると

$$
I^2-A
$$

は martingale です。

一般の $H\in L^2(M)$ では simple $H^{(n)}\to H$ を取り、

$$
I^{(n)}=H^{(n)}\cdot M,
\qquad
A_t^{(n)}
=
\int_0^t(H_s^{(n)})^2\,d[M]_s.
$$

completion theorem から

$$
I^{(n)}\to I
$$

in $L^2$ uniformly on $[0,T]$。

さらに

$$
\sup_{t\le T}|A_t^{(n)}-A_t|
\le
\int_0^T
|(H_s^{(n)})^2-H_s^2|\,d[M]_s.
$$

Hölder inequality を指数 $2,2$ で measure $\mu_M$ に対して使うと

$$
E\sup_{t\le T}|A_t^{(n)}-A_t|
\le
\|H^{(n)}-H\|_{M,T}
\left(
\|H^{(n)}\|_{M,T}+\|H\|_{M,T}
\right)
\to0.
$$

従って各固定時刻で

$$
(I_t^{(n)})^2-A_t^{(n)}
\to
I_t^2-A_t
$$

in $L^1$。

martingale identity を $L^1$ 極限へ移すと

$$
I^2-A
$$

は martingale です。

$A$ は continuous increasing adapted process、$A_0=0$ です。STO5 の quadratic variation theorem における bracket の一意性から

$$
[I]=A.
$$

従って

$$
[I]_t
=
\int_0^tH_s^2\,d[M]_s.
$$
<!-- proof-end -->

Brown 運動なら

$$
\boxed{
\left[
\int_0^\cdot H_s\,dB_s
\right]_t
=
\int_0^tH_s^2\,ds
}
$$

です。

---

## 10. stopping と stochastic integral

<a id="prop-sto6-stopping"></a>

<!-- formal-statement-start -->
> **命題（stopping と stochastic integral の交換）**  
> $\tau$ を stopping time とする。積分が定義される範囲で
>
> $$
> (H\cdot M)^\tau
> =
> H\cdot M^\tau
> =
> (1_{(0,\tau]}H)\cdot M.
> $$
>
> また
>
> $$
> [(H\cdot M)^\tau]_t
> =
> \int_0^{t\wedge\tau}H_s^2\,d[M]_s.
> $$
<!-- formal-statement-end -->

### 証明の見取り図

simple integrand では stopped increment を書き下すだけです。一般 integrand では simple approximation と Itô isometry で極限を移します。

<!-- proof-start -->
### 証明

simple $H=\sum_k\xi_k1_{(t_k,t_{k+1}]}$ なら

$$
\begin{aligned}
(H\cdot M^\tau)_t
&=
\sum_k\xi_k
\left(
M_{(t\wedge t_{k+1})\wedge\tau}
-
M_{(t\wedge t_k)\wedge\tau}
\right)\\
&=
(H\cdot M)_{t\wedge\tau}.
\end{aligned}
$$

従って

$$
H\cdot M^\tau=(H\cdot M)^\tau.
$$

次に

$$
1_{(0,\tau]}(s)
$$

は adapted left-continuous process なので predictable です。

$\tau$ を右側 dyadic stopping times $\tau_n\downarrow\tau$ で近似すると $1_{(0,\tau_n]}H$ は deterministic grid 上の simple predictable process で近似できます。Itô isometry と dominated convergence for the bracket measure から

$$
(1_{(0,\tau_n]}H)\cdot M
\to
(1_{(0,\tau]}H)\cdot M
$$

in $L^2$ on each bounded localization。

simple case の identity を極限へ移すと

$$
(H\cdot M)^\tau
=
(1_{(0,\tau]}H)\cdot M.
$$

bracket formula は [stochastic integral の quadratic variation](#thm-sto6-integral-bracket) と STO5 の stopping property から

$$
\begin{aligned}
[(H\cdot M)^\tau]_t
&=
[H\cdot M]_{t\wedge\tau}\\
&=
\int_0^{t\wedge\tau}H_s^2\,d[M]_s.
\end{aligned}
$$
<!-- proof-end -->

この交換則は localization の貼り合わせに使います。

---

## 11. locally square-integrable integrand

global $L^2$ 条件は便利ですが、SDE では係数が bounded でないことが普通です。そこで stopping で有限化します。

<a id="def-sto6-local-l2"></a>

<!-- formal-statement-start -->
> **定義（locally square-integrable integrand）**  
> $M$ を continuous local martingale、$H$ を predictable process とする。
>
> 各 $t<\infty$ について
>
> $$
> \int_0^tH_s^2\,d[M]_s<\infty
> \qquad\text{almost surely}
> $$
>
> が成り立つとき、$H$ を $M$ に関して **locally square-integrable** という。
>
> 同値に、stopping time 列 $\tau_n\uparrow\infty$ を選び、各 $n,T$ について
>
> $$
> E\int_0^{T\wedge\tau_n}H_s^2\,d[M]_s<\infty
> $$
>
> とできる。
<!-- formal-statement-end -->

<!-- definition-example-start: def-sto6-local-l2 -->
### 直接例：$H_t=e^{B_t^2}$ は局所化すれば積分できる

Brown 運動 $B$ に対し

$$
H_t=e^{B_t^2}
$$

とします。continuous adapted process は left-continuous adapted process でもあるため、predictable sigma-field の定義から predictable です。

exit time

$$
\tau_n
=
\inf\{t\ge0:|B_t|\ge n\}\wedge n
$$

で止めると

$$
H_{t\wedge\tau_n}^2
\le
e^{2n^2}.
$$

従って任意の $T$ で

$$
E\int_0^{T\wedge\tau_n}H_s^2\,ds
\le
Te^{2n^2}<\infty.
$$

よって $H$ は locally square-integrable です。

一方、

$$
E[e^{2B_t^2}]
=
(1-4t)^{-1/2}
$$

は $t<1/4$ でのみ有限で、$t>1/4$ では発散します。従って十分長い時間区間では global $L^2(B)$ 条件は失われます。

localization は単なる形式ではなく、global moment が壊れる integrand を扱うために必要です。
<!-- definition-example-end -->

<a id="thm-sto6-local-integral"></a>

<!-- formal-statement-start -->
> **定理（local stochastic integral）**  
> $M$ を continuous local martingale、$H$ を $M$ に関して locally square-integrable predictable process とする。
>
> このとき一意な continuous local martingale
>
> $$
> H\cdot M
> $$
>
> が存在し、任意の $L^2$ localizing sequence $\tau_n$ 上で
>
> $$
> (H\cdot M)^{\tau_n}
> =
> (1_{(0,\tau_n]}H)\cdot M
> $$
>
> となる。
>
> さらに
>
> $$
> [H\cdot M]_t
> =
> \int_0^tH_s^2\,d[M]_s.
> $$
<!-- formal-statement-end -->

### 証明の見取り図

$M$ 自身の localizing sequence、$|M|$ の exit time、energy

$$
\int H^2\,d[M]
$$

の exit timeを同時に止めます。停止後は square-integrable theory が使えます。

異なる $n$ の積分は stopping identity により重なる区間で一致するので、path を貼り合わせられます。

<!-- proof-start -->
### 証明

$M$ を真の martingale にする localizing sequenceを $\rho_n$ とします。

さらに

$$
\alpha_n
=
\inf\{t\ge0:|M_t|\ge n\}\wedge n,
$$

$$
\beta_n
=
\inf\left\{
t\ge0:
\int_0^tH_s^2\,d[M]_s\ge n
\right\}\wedge n
$$

とし、

$$
\tau_n=\rho_n\wedge\alpha_n\wedge\beta_n
$$

と置きます。

すると $M^{\tau_n}$ は bounded continuous martingale なので square-integrable です。また

$$
E\int_0^T
1_{\{s\le\tau_n\}}H_s^2\,d[M]_s
\le n
$$

です。

従って global $L^2$ theory により

$$
I^{(n)}
=
(1_{(0,\tau_n]}H)\cdot M
$$

が定義できます。

$m\ge n$ なら stopping identity から

$$
(I^{(m)})^{\tau_n}
=
(1_{(0,\tau_n]}H)\cdot M
=
I^{(n)}.
$$

従って $t\le\tau_n$ では $I^{(m)}_t=I^{(n)}_t$。この compatibility により

$$
I_t=I_t^{(n)}
\quad\text{on }\{t\le\tau_n\}
$$

と定義できます。

$\tau_n\uparrow\infty$ almost surely なので $I$ は全時間上で定まり、各 $I^{\tau_n}=I^{(n)}$ は martingale。従って $I$ は continuous local martingale です。

各停止区間上で bracket formula が成り立つので

$$
[I]_{t\wedge\tau_n}
=
\int_0^{t\wedge\tau_n}H_s^2\,d[M]_s.
$$

$n\to\infty$ として

$$
[I]_t
=
\int_0^tH_s^2\,d[M]_s.
$$

一意性も、任意の二つの候補が各 $\tau_n$ 上で同じ global $L^2$ integral に一致することから従います。
<!-- proof-end -->

---

## 12. Brownian stochastic integral

Brown 運動では

$$
[B]_t=t
$$

なので、全てが見慣れた Lebesgue 時間積分に変わります。

$H$ predictable で

$$
E\int_0^T H_s^2\,ds<\infty
$$

なら

$$
I_t=\int_0^tH_s\,dB_s
$$

は continuous square-integrable martingale で、

$$
E[I_t]=0,
$$

$$
E[I_t^2]
=
E\int_0^tH_s^2\,ds,
$$

$$
[I]_t
=
\int_0^tH_s^2\,ds.
$$

deterministic $h\in L^2[0,T]$ なら simple deterministic functions $h_n$ で近似できます。各

$$
\int_0^T h_n(s)\,dB_s
$$

は Brownian increments の有限線形結合なので Gaussian です。

$L^2$ 極限の characteristic function を取れば

<a id="prop-sto6-deterministic-gaussian"></a>

<!-- formal-statement-start -->
> **命題（deterministic Brownian integral は Gaussian）**  
> deterministic $h\in L^2([0,T])$ に対し
>
> $$
> \int_0^T h(s)\,dB_s
> \sim
> N\left(
> 0,
> \int_0^T h(s)^2\,ds
> \right).
> $$
<!-- formal-statement-end -->

<!-- proof-start -->
### 証明

simple deterministic

$$
h_n=\sum_k a_{k,n}1_{(t_{k,n},t_{k+1,n}]}
$$

なら

$$
\int_0^T h_n\,dB
=
\sum_k a_{k,n}(B_{t_{k+1,n}}-B_{t_{k,n}})
$$

は独立 centered Gaussian の線形結合なので Gaussian で、分散は

$$
\sum_ka_{k,n}^2(t_{k+1,n}-t_{k,n})
=
\int_0^T h_n^2\,ds.
$$

$h_n\to h$ in $L^2[0,T]$ とすると Itô isometry により

$
X_n:=\int h_n\,dB
\to
X:=\int h\,dB
$

in $L^2$ です。従って Hölder inequality（指数 $2,2$）により $E|X_n-X|\to0$ でもあります。任意の $\theta\in\mathbb R$ について

$
\left|
E[e^{i\theta X_n}]
-
E[e^{i\theta X}]
\right|
\le
|\theta|E|X_n-X|
\to0.
$

一方

$
\int h_n^2\to\int h^2
$

なので、$X_n$ の Gaussian characteristic function

$
\exp\left(
-\frac12\theta^2\int h_n^2
\right)
$

の極限は

$
\exp\left(
-\frac12\theta^2\int h^2
\right).
$

従って characteristic function の一意性から $X$ は主張した centered Gaussian law を持ちます。
<!-- proof-end -->

random integrand のとき、積分は一般には Gaussian ではありません。この区別は重要です。

---

## 13. BDG inequality：path の大きさと bracket の大きさ

Doob $L^2$ inequality は終端値を通して 標本路 supremum を抑えました。BDG inequality はさらに直接 bracket と比較します。

<a id="thm-sto6-bdg"></a>

<!-- formal-statement-start -->
> **定理（Burkholder--Davis--Gundy inequality）**  
> $p>0$ とする。$p$ のみに依存する定数 $0<c_p\le C_p<\infty$ が存在し、$N_0=0$ の任意の continuous local martingale $N$ と任意の stopping time $\tau$ に対し
>
> $$
> c_p\,
> E\left([N]_\tau^{p/2}\right)
> \le
> E\left[
> \sup_{0\le t\le\tau}|N_t|^p
> \right]
> \le
> C_p\,
> E\left([N]_\tau^{p/2}\right)
> $$
>
> が extended-real sense で成り立つ。
<!-- formal-statement-end -->

### $p=2$ はこの章の道具だけで閉じる

square-integrable case では

$$
E[N]_T=E[N_T^2].
$$

従って

$$
E[N]_T
=
E[N_T^2]
\le
E\sup_{t\le T}|N_t|^2.
$$

逆に Doob $L^2$ inequality から

$$
E\sup_{t\le T}|N_t|^2
\le
4E[N_T^2]
=
4E[N]_T.
$$

つまり $p=2$ なら

$$
E[N]_T
\le
E(N_T^*)^2
\le
4E[N]_T.
$$

local martingale では stopping してから monotone convergence を使えば同じ比較が得られます。

### 一般 $p$ の証明境界

一般 $p$ の完全証明には stopping-time decomposition、good-$\lambda$ inequality、または Burkholder function の議論が必要で、STO6 の learning objective である「stochastic integral の構成」から大きく外れます。

そのため本章では **一般 $p$ の BDG inequality 自体は標準定理として意図的 black box** とします。代わりに、

- $p=2$ は完全に証明する。
- stochastic integral へどう適用するかは明示する。
- 後続 SDE で必要な moment estimate の場所を示す。

という境界にします。

[stochastic integral の bracket](#thm-sto6-integral-bracket) を代入すると

$$
E\left[
\sup_{t\le T}
\left|
\int_0^tH_s\,dM_s
\right|^p
\right]
\asymp_p
E\left[
\left(
\int_0^T H_s^2\,d[M]_s
\right)^{p/2}
\right].
$$

STO9 の SDE で Picard iteration や解の moment estimate を 標本路 supremum まで持ち上げるとき、この形を使います。

---

## 14. なぜ predictable でなければならないのか

もし未来の increment を見て係数を決めてよいなら、martingale cancellation は壊れます。

partition

$$
0=t_0<t_1<\cdots<t_n=T
$$

に対し、未来を見て

$$
\xi_k
=
\operatorname{sgn}(B_{t_{k+1}}-B_{t_k})
$$

と選んだとします。

これは $\mathcal F_{t_k}$-measurable ではありません。

形式的に simple integral と同じ和を書くと

$$
\sum_k\xi_k(B_{t_{k+1}}-B_{t_k})
=
\sum_k|B_{t_{k+1}}-B_{t_k}|.
$$

右辺は非負で、平均 0 の martingale increment sum ではありません。さらに partition を細かくすると Brownian path の infinite variation が顔を出します。

つまり predictability は単なる technical convention ではなく、

$$
\boxed{
\text{係数を決める}
\quad\text{then}\quad
\text{新しい noise increment が来る}
}
$$

という因果順序を数学的に固定しています。

---

## 15. STO7 への橋

ここまでで

$$
\int H\,dM
$$

は記号ではなくなりました。

特に

$$
\left[
\int H\,dM
\right]
=
\int H^2\,d[M]
$$

が完成したため、Taylor expansion で

$$
\sum f'(X)\Delta X
$$

を stochastic integral へ、

$$
\sum f''(X)(\Delta X)^2
$$

を bracket integral へ送る準備ができました。

次の STO7 ではこの二つを合成して

$$
f(X_t)
=
f(X_0)
+
\int_0^t f'(X_s)\,dX_s
+
\frac12\int_0^t f''(X_s)\,d[X]_s
$$

という Itô formula を導きます。多次元版、積の公式、stochastic exponential、Euclidean Stratonovich まで進みます。

---

# 16. 演習

## STO6-A01 simple Brownian integral を計算する

- Level: A
- 目安時間: 12分

$0<s<T$ とし、

$$
H_t=a1_{(0,s]}(t)+b1_{(s,T]}(t)
$$

とする。$a,b\in\mathbb R$ は定数とする。

1. $\int_0^T H_t\,dB_t$ を Brownian increments で書け。
2. 平均と分散を求めよ。
3. quadratic variation $[H\cdot B]_T$ を求めよ。

<!-- solution-start -->
### 詳細解答

1. simple integral の定義から

$$
\int_0^T H_t\,dB_t
=
aB_s+b(B_T-B_s).
$$

2. $B_s$ と $B_T-B_s$ は独立 centered Gaussian なので平均は 0。

分散は

$$
a^2\operatorname{Var}(B_s)
+
b^2\operatorname{Var}(B_T-B_s)
=
a^2s+b^2(T-s).
$$

Itô isometry でも

$$
E\int_0^T H_t^2\,dt
=
a^2s+b^2(T-s)
$$

と同じ値が出ます。

3. bracket formula から

$$
[H\cdot B]_T
=
\int_0^T H_t^2\,dt
=
a^2s+b^2(T-s).
$$
<!-- solution-end -->

## STO6-A02 random predictable coefficient の isometry

- Level: A
- 目安時間: 15分

$0<s<T$ とし、

$$
H_t=1_{\{B_s\ge0\}}1_{(s,T]}(t)
$$

とする。

1. $H$ が simple predictable であることを確認せよ。
2. 積分を明示せよ。
3. Itô isometry によりその二乗平均を求めよ。

<!-- solution-start -->
### 詳細解答

1. 係数 $1_{\{B_s\ge0\}}$ は bounded かつ $\mathcal F_s$-measurable なので、定義どおり $(s,T]$ 上の simple predictable coefficient です。

2.

$$
\int_0^T H_t\,dB_t
=
1_{\{B_s\ge0\}}(B_T-B_s).
$$

3. Itô isometry から

$$
E\left[
1_{\{B_s\ge0\}}(B_T-B_s)^2
\right]
=
E\int_s^T1_{\{B_s\ge0\}}\,dt.
$$

右辺は

$$
(T-s)P(B_s\ge0)
=
\frac{T-s}{2},
$$

です。$s>0$ なら $B_s$ は centered nondegenerate Gaussian なので対称性から
$P(B_s\ge0)=1/2$ です。

独立増分を使って直接計算しても

$$
E[1_{\{B_s\ge0\}}]\,
E[(B_T-B_s)^2]
=
\frac12(T-s)
$$

となります。
<!-- solution-end -->

## STO6-A03 Doob $L^2$ estimate を積分へ適用する

- Level: A
- 目安時間: 10分

$H\in L^2(B)$ とし、

$$
I_t=\int_0^tH_s\,dB_s.
$$

次を示せ。

$$
E\left[
\sup_{0\le t\le T}|I_t|^2
\right]
\le
4E\int_0^T H_s^2\,ds.
$$

<!-- solution-start -->
### 詳細解答

$I$ は STO6 の construction theorem により continuous square-integrable martingale です。

従って Doob $L^2$ inequality から

$$
E\sup_{t\le T}|I_t|^2
\le
4E|I_T|^2.
$$

Itô isometry により

$$
E|I_T|^2
=
E\int_0^T H_s^2\,ds.
$$

二式を合わせて

$$
E\sup_{t\le T}|I_t|^2
\le
4E\int_0^T H_s^2\,ds.
$$
<!-- solution-end -->

## STO6-A04 stopping identity を simple integrand で確認する

- Level: A
- 目安時間: 15分

$H_t=\xi1_{(a,b]}(t)$、$\xi\in L^\infty(\mathcal F_a)$ とし、$\tau$ を stopping time とする。

$$
(H\cdot M)_{t\wedge\tau}
=
(H\cdot M^\tau)_t
$$

を定義から確認せよ。

<!-- solution-start -->
### 詳細解答

simple integral の定義から

$$
(H\cdot M)_{t\wedge\tau}
=
\xi
\left(
M_{(t\wedge\tau)\wedge b}
-
M_{(t\wedge\tau)\wedge a}
\right).
$$

minimum の交換律から

$$
(t\wedge\tau)\wedge b
=
(t\wedge b)\wedge\tau,
$$

$$
(t\wedge\tau)\wedge a
=
(t\wedge a)\wedge\tau.
$$

一方 $M^\tau_u=M_{u\wedge\tau}$ なので

$$
\begin{aligned}
(H\cdot M^\tau)_t
&=
\xi
\left(
M^\tau_{t\wedge b}
-
M^\tau_{t\wedge a}
\right)\\
&=
\xi
\left(
M_{(t\wedge b)\wedge\tau}
-
M_{(t\wedge a)\wedge\tau}
\right).
\end{aligned}
$$

従って両者は等しいです。
<!-- solution-end -->

## STO6-B01 $L^2$ approximation から 標本路の sup 距離による approximation へ

- Level: B
- 目安時間: 20分

simple predictable $H^{(n)}$ が

$$
E\int_0^T|H_s^{(n)}-H_s|^2\,d[M]_s\to0
$$

を満たすとする。

$I^{(n)}=H^{(n)}\cdot M$ が

$$
E\sup_{t\le T}|I_t^{(n)}-I_t|^2\to0
$$

となる continuous martingale $I$ を持つことを、Doob $L^2$ inequality と Itô isometry から説明せよ。

<!-- solution-start -->
### 詳細解答

$n,m$ に対し

$$
I^{(n)}-I^{(m)}
=
(H^{(n)}-H^{(m)})\cdot M.
$$

Doob $L^2$ inequality から

$$
E\sup_{t\le T}|I_t^{(n)}-I_t^{(m)}|^2
\le
4E|I_T^{(n)}-I_T^{(m)}|^2.
$$

Itô isometry を右辺へ使うと

$$
E\sup_{t\le T}|I_t^{(n)}-I_t^{(m)}|^2
\le
4E\int_0^T|H_s^{(n)}-H_s^{(m)}|^2\,d[M]_s.
$$

$H^{(n)}$ は $L^2(\mu_M)$ で Cauchy なので右辺は 0 へ行きます。

ここから subsequence $(n_j)$ を

$$
\left(
E\sup_{t\le T}
|I_t^{(n_{j+1})}-I_t^{(n_j)}|^2
\right)^{1/2}
\le2^{-j}
$$

と選べます。

従って

$$
E\sum_j
\sup_{t\le T}
|I_t^{(n_{j+1})}-I_t^{(n_j)}|
<\infty.
$$

ゆえに almost surely この級数は有限で、subsequence は sup 距離で収束します。各 $I^{(n_j)}$ は continuous なので極限 $I$ も continuous です。

元の列は supremum $L^2$ で Cauchy だったため、この $I$ へ列全体が supremum $L^2$ 収束します。

各固定時刻で $L^2$ 収束し、martingale identity も conditional expectation の $L^2$ continuity で極限へ移るため、$I$ は martingale です。
<!-- solution-end -->

## STO6-B02 bracket を piecewise integrand で計算する

- Level: B
- 目安時間: 18分

$0<s<T$、定数 $a,b$ に対し

$$
I_t
=
\int_0^t
\left(
a1_{(0,s]}(u)+b1_{(s,T]}(u)
\right)dM_u
$$

とする。

$[I]_t$ を $[M]$ で明示せよ。

<!-- solution-start -->
### 詳細解答

bracket formula から

$$
[I]_t
=
\int_0^t
\left(
a1_{(0,s]}(u)+b1_{(s,T]}(u)
\right)^2
d[M]_u.
$$

二つの区間は disjoint なので cross term はありません。

従って

$$
[I]_t
=
a^2[M]_{t\wedge s}
+
b^2\left(
[M]_t-[M]_{t\wedge s}
\right).
$$

場合分けすると

$$
[I]_t
=
\begin{cases}
a^2[M]_t,&t\le s,\\
a^2[M]_s+b^2([M]_t-[M]_s),&t>s.
\end{cases}
$$

Brown 運動なら $[M]_t=t$ なので

$$
[I]_t
=
\begin{cases}
a^2t,&t\le s,\\
a^2s+b^2(t-s),&t>s.
\end{cases}
$$
<!-- solution-end -->

## STO6-B03 global $L^2$ が壊れても local integral は作れる

- Level: B
- 目安時間: 25分

Brown 運動 $B$ と

$$
H_t=e^{B_t^2}
$$

を考える。

1. $H$ が predictable であることを示せ。
2. $\tau_n=\inf\{t:|B_t|\ge n\}\wedge n$ に対して
   $$
   E\int_0^{T\wedge\tau_n}H_t^2\,dt<\infty
   $$
   を示せ。
3. $T>1/4$ では
   $$
   E\int_0^T H_t^2\,dt=\infty
   $$
   であることを示せ。

<!-- solution-start -->
### 詳細解答

1. $B$ は continuous adapted process です。continuous adapted process は left-continuous adapted process でもあるので predictable です。連続写像 $x\mapsto e^{x^2}$ を合成しても predictability は保たれるので $H$ は predictable です。

2. $t\le\tau_n$ なら $|B_t|\le n$ です。従って

$$
H_t^2=e^{2B_t^2}\le e^{2n^2}.
$$

ゆえに

$$
E\int_0^{T\wedge\tau_n}H_t^2\,dt
\le
Te^{2n^2}<\infty.
$$

3. $B_t\sim N(0,t)$ です。standard Gaussian $Z$ に対し

$$
E[e^{cZ^2}]
=
(1-2c)^{-1/2}
$$

は $c<1/2$ のとき有限です。

$B_t=\sqrt t\,Z$ なので

$$
E[e^{2B_t^2}]
=
E[e^{2tZ^2}]
=
(1-4t)^{-1/2}
$$

は $t<1/4$ で有限、$t>1/4$ では無限です。

Tonelli により

$$
E\int_0^T H_t^2\,dt
=
\int_0^T E[e^{2B_t^2}]\,dt.
$$

$T>1/4$ なら positive measure の区間 $(1/4,T]$ で integrand が無限なので、全体も無限です。

したがって global $L^2(B)$ integrand ではありませんが、local stochastic integral は構成できます。
<!-- solution-end -->

## STO6-C01 localization に依存しないことを証明する

- Level: C
- 目安時間: 40分

$M$ を continuous local martingale、$H$ を locally square-integrable predictable process とする。

二つの localizing sequence $(\tau_n)$、$(\sigma_m)$ を使って local stochastic integral を構成したとする。それぞれの候補を $I$、$J$ とする。

1. $\rho_{n,m}=\tau_n\wedge\sigma_m$ 上で $I$ と $J$ が一致することを示せ。
2. $I$ と $J$ が indistinguishable であることを示せ。
3. bracket identity
   $$
   [I]_t=\int_0^tH_s^2\,d[M]_s
   $$
   が global に成り立つことを示せ。

<!-- solution-start -->
### 詳細解答

1. $\rho_{n,m}$ で止めると、両方の構成は同じ integrand

$$
1_{(0,\rho_{n,m}]}H
$$

を同じ stopped martingale $M^{\rho_{n,m}}$ に対して積分した global $L^2$ integral になります。

stopping identity から

$$
I^{\rho_{n,m}}
=
(1_{(0,\rho_{n,m}]}H)\cdot M
=
J^{\rho_{n,m}}.
$$

従って $\rho_{n,m}$ 以前では両者は一致します。

2. almost surely

$$
\tau_n\uparrow\infty,
\qquad
\sigma_m\uparrow\infty.
$$

従って任意の deterministic $T$ について、ほとんど全ての $\omega$ で十分大きい $n,m$ を取れば

$$
\rho_{n,m}(\omega)>T.
$$

1 の結果から、その $\omega$ について $[0,T]$ 全体で

$$
I_t(\omega)=J_t(\omega).
$$

$T=1,2,3,\ldots$ を可算個同時に取れば、probability one の event 上で全 $t\ge0$ について一致します。両 process は continuous なので indistinguishable です。

3. 各 $\tau_n$ 上では global $L^2$ theory から

$$
[I]_{t\wedge\tau_n}
=
\int_0^{t\wedge\tau_n}H_s^2\,d[M]_s.
$$

固定 $t$ に対し $\tau_n\uparrow\infty$ なので、almost surely 十分大きい $n$ では $t<\tau_n$。従って

$$
[I]_t
=
\int_0^tH_s^2\,d[M]_s.
$$

continuous process 同士の等式なので、rational $t$ 上の probability-one event を取って連続性で全 $t$ へ延長できます。

これで bracket identity は localizing sequence の選択に依存せず global に成立します。
<!-- solution-end -->

---

## 17. まとめ

この章の核心は

$$
\boxed{
E\left(\int H\,dM\right)^2
=
E\int H^2\,d[M]
}
$$

です。

この一式から

- simple process の積分が $L^2$ completion できる
- continuous martingale limit が得られる
- 標本路 supremum は Doob inequality で制御できる
- bracket は $\int H^2\,d[M]$
- stopping と integral が交換できる
- localization で local martingale まで拡張できる
- BDG により higher moment の path estimate へ進める

という構造が一本につながりました。

次は STO7 で、quadratic variation と stochastic integral を Taylor expansion に差し込み、multidimensional Itô calculus と Euclidean Stratonovich calculus を構成します。
