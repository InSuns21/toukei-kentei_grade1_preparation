# SP5 有限 Markov 連鎖の収束・周期性・結合

[有限既約連鎖の正再帰性](../SP4/index.md#thm-sp4-finite-irreducible)により、有限既約連鎖には一意の不変確率分布があります。しかし、不変であることは、ある状態から出発した分布がその分布へ近づくことを意味しません。例えば $0\to1\to0$ を確率 $1$ で繰り返す連鎖は、$(1/2,1/2)$ を不変分布に持ちながら、時刻分布は振動し続けます。

この障害を「周期」で捉え、分布の距離を測る方法と二本の連鎖を同じ乱数で動かす方法を用いて、有限・既約・非周期の下での収束を証明します。行列の固有値の一般論を先取りせず、読者が確率計算を追える形にします。

## 1. 周期とは何か

$S$ を空でない有限状態空間、$P=(p(i,j))$ を行確率行列、$p^{(n)}(i,j)$ を $n$ 歩遷移確率とします。行 $i$・列 $j$ の成分 $p(i,j)$ は $i$ から $j$ への一歩遷移確率であり、初期分布を行ベクトル $\mu$ で表すと $n$ 歩後の分布は $\mu P^n$ です。$p^{(0)}(i,j)=\boldsymbol{1}_{\{i=j\}}$ です。これらは [Markov 連鎖の定義](../../STO/STO2A/index.md#def-sto2a-markov)と [Chapman–Kolmogorov の式](../../STO/STO2A/index.md#eq-sto2a-chapman-kolmogorov)から計算できます。

帰還できる時刻が偶数に限られる状態は、奇数時刻にはその状態へ戻れません。帰還可能な正の時刻の最大公約数で、その繰り返し方を表します。

<a id="def-sp5-period"></a>

<!-- formal-statement-start -->
> **定義（Markov 連鎖の周期）**  
> 有限状態空間 $S$ 上の時間一様 Markov 連鎖の遷移行列 $P$ と状態 $i\in S$ について、正の帰還可能時刻の集合を

$$
R_i=\{n\ge1:p^{(n)}(i,i)>0\}
$$

> と置く。$R_i\ne\varnothing$ なら $d(i)=\gcd R_i$ を状態 $i$ の**周期**とし、$d(i)=1$ のとき**非周期**という。既約な連鎖で周期が $1$ のものを**既約非周期連鎖**という。
<!-- formal-statement-end -->

<!-- definition-example-start: def-sp5-period -->
### 直接例：交互連鎖と自己ループ

**定義の確認**

$p(0,1)=p(1,0)=1$ なら、どちらの状態も帰還可能時刻は $2,4,6,\ldots$ なので周期 $2$ です。一方、$p(0,0)=p(0,1)=1/2$、$p(1,0)=1$ なら $0$ は一歩で帰還でき、周期 $1$ です。$1$ は二歩 $1\to0\to1$ と三歩 $1\to0\to0\to1$ で帰還できるので $\gcd(2,3)=1$、周期 $1$ です。自己ループがない状態も非周期になり得ます。
<!-- definition-example-end -->

[通信クラス](../SP3/index.md#def-sp3-communication)の定義を使うと、通信する状態の周期が一致することを示せます。

<a id="prop-sp5-class-period"></a>

<!-- formal-statement-start -->
> **命題（周期は通信クラスで共通）**  
> 有限状態空間 $S$ 上の時間一様 Markov 連鎖で、状態 $i,j$ が相互到達可能かつ $R_i,R_j\ne\varnothing$ なら、$d(i)=d(j)$ である。特に有限既約連鎖では全状態の周期が一致する。
<!-- formal-statement-end -->

### 証明の見取り図

$i$ から $j$ へ行って戻る経路と、途中で $j$ から $j$ への $n$ 歩帰還を挟む経路の長さの差を比較します。

<!-- proof-start -->
### 証明

$i\to j$ の正確率経路の長さを $a\ge0$、$j\to i$ のものを $b\ge0$ とします。任意の $n\in R_j$ に対し、[Chapman–Kolmogorov の式](../../STO/STO2A/index.md#eq-sto2a-chapman-kolmogorov)から

$$
p^{(a+b)}(i,i)\ge p^{(a)}(i,j)p^{(b)}(j,i)>0,
$$

$$
p^{(a+n+b)}(i,i)\ge
p^{(a)}(i,j)p^{(n)}(j,j)p^{(b)}(j,i)>0.
$$

$d(i)$ は $a+b$ と $a+n+b$ を割るため、その差 $n$ も割ります。全 $n\in R_j$ に成り立つので $d(i)\mid d(j)$。逆向きにも同じ議論をすると $d(j)\mid d(i)$ であり、両者は等しいです。有限既約性の下ではどの状態にも正確率の巡回路が存在して $R_i\ne\varnothing$ です。
<!-- proof-end -->

## 2. 分布全体の距離を測る

時刻分布 $\mu P^n$ と不変分布 $\pi$ の差は、ある一状態だけではなく、どの事象を見ても小さくなる必要があります。

<a id="def-sp5-total-variation"></a>

<!-- formal-statement-start -->
> **定義（有限集合上の全変動距離）**  
> 空でない有限集合 $S$ 上の二つの確率分布 $\mu,\nu$ に対し、次の値を距離として定める。

$$
\|\mu-\nu\|_{\mathrm{TV}}
=\max_{A\subset S}|\mu(A)-\nu(A)|,
\qquad \mu(A)=\sum_{i\in A}\mu_i,\quad \nu(A)=\sum_{i\in A}\nu_i
$$

> と定義する。
<!-- formal-statement-end -->

<a id="prop-sp5-tv-contraction"></a>

<!-- formal-statement-start -->
> **命題（全変動距離の和表示と縮小）**  
> 空でない有限集合 $S$ 上の確率分布 $\mu,\nu$ と行確率行列 $P$ に対し、

$$
\|\mu-\nu\|_{\mathrm{TV}}
=\frac12\sum_{i\in S}|\mu_i-\nu_i|,
\qquad
\|\mu P-\nu P\|_{\mathrm{TV}}
\le\|\mu-\nu\|_{\mathrm{TV}}
$$

> が成り立つ。
<!-- formal-statement-end -->

### 証明の見取り図

正の差と負の差の総量は等しく、正の差だけを集めた事象が最大値を達成します。遷移では流入確率が混ざるので、三角不等式によって距離は増えません。

<!-- proof-start -->
### 証明

$\Delta_i=\mu_i-\nu_i$ と置くと $\sum_i\Delta_i=0$ です。$A_+=\{i:\Delta_i>0\}$ とすれば

$$
\sum_{i\in A_+}\Delta_i
=-\sum_{i\notin A_+}\Delta_i
=\frac12\sum_i|\Delta_i|.
$$

任意の $A$ について $\sum_{i\in A}\Delta_i\le\sum_{i\in A_+}\Delta_i$ であり、負の場合には補集合を取って同じ上界を得るため、最初の等式が成立します。次に、遷移後の差の $j$ 成分は $\sum_i\Delta_i p(i,j)$ なので、

$$
\begin{aligned}
2\|\mu P-\nu P\|_{\mathrm{TV}}
&=\sum_j\left|\sum_i\Delta_i p(i,j)\right|\\
&\le\sum_j\sum_i|\Delta_i|p(i,j)
=\sum_i|\Delta_i|\sum_jp(i,j)\\
&=\sum_i|\Delta_i|.
\end{aligned}
$$

ここで $p(i,j)\ge0$ と各行の和が $1$ であることを使いました。
<!-- proof-end -->

<!-- definition-example-start: def-sp5-total-variation -->
### 直接例：三状態

**定義の確認**

$\mu=(1/2,1/4,1/4)$、$\nu=(1/4,1/2,1/4)$ では、和表示から距離は $\frac12(1/4+1/4)=1/4$ です。事象 $A=\{0\}$ を取ると $\mu(A)-\nu(A)=1/4$ で、最大を実現します。
<!-- definition-example-end -->

## 3. 結合：同じ乱数で二本を比較する

この距離は、二本の確率変数を同じ確率空間に置いて「異なる値になる確率」で上から抑えられます。二本が独立である必要はありません。ここで $P(U=i)$ の $P$ は事象の確率を表し、遷移行列 $P=(p(i,j))$ とは引数で区別します。

<a id="def-sp5-coupling"></a>

<!-- formal-statement-start -->
> **定義（結合）**  
> 有限集合 $S$ 上の確率分布 $\mu,\nu$ に対し、同じ確率空間上で定義された $S$ 値確率変数 $(U,V)$ が、すべての $i\in S$ について

$$
P(U=i)=\mu_i,\qquad P(V=i)=\nu_i
$$

> を満たすとき、$(U,V)$ を二分布の**結合**という。
<!-- formal-statement-end -->

<!-- definition-example-start: def-sp5-coupling -->
### 直接例：同じ一様乱数

**定義の確認**

状態空間を $S=\{0,1\}$ とし、$W$ を $[0,1]$ 上の一様乱数とします。$W\le3/4$ のとき $U=0$、それ以外は $U=1$ とし、$W\le1/4$ のとき $V=0$、それ以外は $V=1$ とします。結合の定義で必要な周辺分布を、両状態で確認します。

$$
\begin{aligned}
&P(U=0)=\tfrac34,\quad P(U=1)=\tfrac14,\\
&P(V=0)=\tfrac14,\quad P(V=1)=\tfrac34.
\end{aligned}
$$

従って $U$ は $(3/4,1/4)$、$V$ は $(1/4,3/4)$ の分布を持ち、結合の条件をすべて満たします。また $U\ne V$ は $1/4<W\le3/4$ のときだけなので $P(U\ne V)=1/2$ です。
<!-- definition-example-end -->

<a id="lem-sp5-coupling-inequality"></a>

<!-- formal-statement-start -->
> **補題（結合不等式）**  
> 有限集合 $S$ 上の確率分布 $\mu,\nu$ の任意の結合 $(U,V)$ に対し、

$$
\|\mu-\nu\|_{\mathrm{TV}}\le P(U\ne V)
$$

> が成り立つ。
<!-- formal-statement-end -->

<!-- proof-start -->
### 証明

$U=V$ なら任意の事象 $A\subset S$ への所属が一致するため、

$$
\begin{aligned}
|\mu(A)-\nu(A)|
&=\left|E[\boldsymbol{1}_{\{U\in A\}}-\boldsymbol{1}_{\{V\in A\}}]\right|\\
&\le E|\boldsymbol{1}_{\{U\in A\}}-\boldsymbol{1}_{\{V\in A\}}|
\le P(U\ne V).
\end{aligned}
$$

$A$ に関する最大を取って結論を得ます。
<!-- proof-end -->

## 4. 非周期性から一様な正確率へ

既約性は「出発地と到着地ごとに**何歩かで**行ける」、非周期性は「帰還時刻の最大公約数が $1$」という意味です。収束のためには、両者を合わせ「**共通の歩数** $m$ で、すべての状態対を正確率で結べる」ことを証明します。

<a id="lem-sp5-large-returns"></a>

<!-- formal-statement-start -->
> **補題（十分長い非周期帰還時刻）**  
> 有限状態空間 $S$ 上の時間一様 Markov 連鎖と状態 $o\in S$ を考える。正の帰還可能時刻の集合が

$$
R_o=\{n\ge1:p^{(n)}(o,o)>0\},\qquad \gcd R_o=1
$$

> を満たすとき、ある整数 $N\ge1$ が存在し、すべての整数 $n\ge N$ で次が成り立つ。

$$
p^{(n)}(o,o)>0.
$$
<!-- formal-statement-end -->

### 証明の見取り図

正確率の帰還経路は何本でもつなげられます。最大公約数 $1$ を作る有限個の帰還経路から、十分大きなあらゆる整数を帰還経路の長さとして作ります。

<!-- proof-start -->
### 証明

$R_o$ の帰還長を $a_1,a_2,\ldots$ と順に取り、$g_k=\gcd(a_1,\ldots,a_k)$ とします。$g_{k+1}$ は $g_k$ を割る正整数なので、$g_k$ はやがて一定値 $g$ になります。$g$ はすべての $a_k$ を割り、逆に全 $a_k$ の共通約数は各 $g_k$ を割るため、$g=\gcd R_o=1$ です。従って有限個の $a_1,\ldots,a_\ell\in R_o$ で $\gcd(a_1,\ldots,a_\ell)=1$ と選べます。$a=a_1$ とします。

各帰還長 $a_k$ を $a$ で割った余り（法 $a$ の剰余）で比較し、それらの非負整数係数の和で作れる剰余全体を $H$ とします。ここで $x\pmod a$ は $x$ を $a$ で割った余りを表します。

$$
H=\left\{\sum_{k=1}^{\ell}c_ka_k\pmod a:c_k\in\mathbb Z_{\ge0}\right\}.
$$

$H$ は $0$ を含み、加法について閉じています。法 $a$ の剰余 $h$ を $a$ 回足すと $ah$ は $0$ に合同です。そのため、負号を持つ剰余も非負整数回の加法で作れます。

$$
-h\equiv(a-1)h\pmod a.
$$

従って整数係数で作れる剰余はすべて $H$ に属します。$\gcd(a_1,\ldots,a_\ell)=1$ なので、Euclid の互除法の各余りを整数係数の式に書き戻すと、整数 $z_1,\ldots,z_\ell$ により $1=\sum_k z_ka_k$ と表せます（Bézout の等式）。従って剰余 $1$ が作れます。その剰余を繰り返し加えると、法 $a$ のすべての剰余が $H$ に含まれます。

各剰余 $r\in\{0,\ldots,a-1\}$ に、$a_k$ の非負整数係数和として作れる整数 $b_r\ge0$ を一つ選べます。帰還経路をつなぐと [Chapman–Kolmogorov の式](../../STO/STO2A/index.md#eq-sto2a-chapman-kolmogorov)から $p^{(b_r)}(o,o)>0$ です。$b_r=0$ の場合は $p^{(0)}(o,o)=1$ と解釈します。

$N=\max(1,b_0,\ldots,b_{a-1})$ と置き、$n\ge N$ が $r$ に合同なら $n=b_r+ka$ で $k\ge0$ です。$b_r$ 歩の帰還の後に $a$ 歩の帰還を $k$ 本つなげれば、$p^{(n)}(o,o)>0$ となります。
<!-- proof-end -->

<a id="thm-sp5-eventual-positivity"></a>

<!-- formal-statement-start -->
> **定理（有限既約非周期連鎖の一様な正値性）**  
> 空でない有限状態空間 $S$ 上の時間一様 Markov 連鎖の遷移行列 $P$ が既約かつ非周期なら、ある整数 $m\ge1$ が存在し、すべての $i,j\in S$ について $p^{(m)}(i,j)>0$ となる。
<!-- formal-statement-end -->

### 証明の見取り図

基準状態 $o$ を一つ選び、$i\to o$、十分長い $o\to o$ の帰還、$o\to j$ の三本をつなげます。出発地・到着地の組が有限個しかないことが、共通の歩数 $m$ を選べる理由です。

<!-- proof-start -->
### 証明

基準状態 $o\in S$ を固定します。既約性から各 $i$ の $i\to o$ の正確率経路の長さを $a_i\ge0$、各 $j$ の $o\to j$ の長さを $b_j\ge0$ と選べます。$i=o$、$j=o$ では長さ $0$ の経路を使います。[周期が通信クラスで共通](#prop-sp5-class-period)なので $d(o)=1$。[十分長い非周期帰還時刻](#lem-sp5-large-returns)から $n\ge N$ なら $p^{(n)}(o,o)>0$ です。

有限個の $i,j$ の組に対して一つの整数

$$
m\ge1+\max_{i,j\in S}(a_i+b_j+N)
$$

を選べば、$m-a_i-b_j\ge N$ です。従って [Chapman–Kolmogorov の式](../../STO/STO2A/index.md#eq-sto2a-chapman-kolmogorov)を二回適用すると

$$
p^{(m)}(i,j)\ge
p^{(a_i)}(i,o)\,
p^{(m-a_i-b_j)}(o,o)\,
p^{(b_j)}(o,j)>0.
$$

よってすべての状態対で同時に正になります。
<!-- proof-end -->

$s=|S|$ と置き、正の値の有限個の最小値を $\varepsilon_0=\min_{i,j}p^{(m)}(i,j)>0$ とします。$\alpha=s\varepsilon_0$ とすると各行の和が $1$ なので $0<\alpha\le1$ です。一様分布 $u_j=1/s$ に対して

$$
p^{(m)}(i,j)\ge\varepsilon_0=\alpha u_j
$$

が、**出発状態 $i$ に関係なく**成立します。すなわち、$m$ 歩後の分布には共通の割合 $\alpha$ の一様分布が含まれます。

## 5. 結合による収束定理

$K=P^m$ とします。$0<\alpha<1$ なら

$$
K(i,j)=\alpha u_j+(1-\alpha)R(i,j),
\qquad R(i,j)=\frac{K(i,j)-\alpha u_j}{1-\alpha}
$$

と分解できます。$R(i,j)\ge0$ であり、$\sum_j R(i,j)=(1-\alpha)/(1-\alpha)=1$ なので $R$ も行確率行列です。$\alpha=1$ なら $K(i,j)=u_j$ であり、出発状態は $m$ 歩で完全に忘れられます。

<a id="thm-sp5-finite-convergence"></a>

<!-- formal-statement-start -->
> **定理（有限既約非周期 Markov 連鎖の収束）**  
> 空でない有限状態空間 $S$ 上の時間一様 Markov 連鎖の遷移行列 $P$ が既約非周期なら、一意の不変確率分布 $\pi$ が存在し、すべての $i\in S$ について $\pi_i>0$ である。さらにある整数 $m\ge1$ と $\alpha\in(0,1]$ が存在し、任意の初期分布 $\mu$、整数 $n\ge0$ に対して

$$
\|\mu P^n-\pi\|_{\mathrm{TV}}
\le(1-\alpha)^{\lfloor n/m\rfloor}
$$

> が成立する。指数 $0$ のとき右辺を $1$ と読み、$\alpha=1$ かつ指数が正のとき右辺を $0$ と読む。特に $\mu P^n$ は $\pi$ にこの距離で収束する。
<!-- formal-statement-end -->

### 証明の見取り図

不変分布の存在・一意性は [既約可算連鎖の正再帰性と不変確率分布](../SP4/index.md#thm-sp4-positive-recurrence-characterization)と[有限既約連鎖の定理](../SP4/index.md#thm-sp4-finite-irreducible)から従います。新しい部分は収束です。$m$ 歩ごとに二本の連鎖を比べ、割合 $\alpha$ で同じ一様乱数の値に移して一致させます。一度一致したら、共通乱数で一致を保てます。

<!-- proof-start -->
### 証明

有限既約性から [SP4 の有限既約連鎖定理](../SP4/index.md#thm-sp4-finite-irreducible)によって正再帰です。[SP4 の正再帰性と不変分布の同値](../SP4/index.md#thm-sp4-positive-recurrence-characterization)から一意の不変確率分布 $\pi$ があり、各 $\pi_i>0$ です。

[一様な正値性](#thm-sp5-eventual-positivity)から $m,\alpha,u,R$ を直前の通りに選びます。$m$ 歩ごとの二本の連鎖を一方の初期分布 $\mu$、もう一方の初期分布 $\pi$ で始めます。

$0<\alpha<1$ の場合、二本が状態 $i,k$ で**異なる**とき、確率 $\alpha$ で同じ $u$ 分布の値 $J$ を使って両方を $J$ へ移します。それ以外は二本をそれぞれ $R(i,\cdot),R(k,\cdot)$ に従って移します。各周辺分布は

$$
\alpha u_j+(1-\alpha)R(i,j)=K(i,j),
\quad
\alpha u_j+(1-\alpha)R(k,j)=K(k,j)
$$

なので、もとの $m$ 歩遷移を保っています。すでに二本が同じ状態なら、一つの $K(i,\cdot)$ の値を共有して次も一致させます。

$k$ ブロック後に二本が異なる事象を $D_k$ とすると、異なる場合でも共通成分を選べば必ず一致するので

$$
P(D_{k+1})\le(1-\alpha)P(D_k),
\qquad
P(D_k)\le(1-\alpha)^k.
$$

[結合不等式](#lem-sp5-coupling-inequality)を適用します。他方の周辺分布は不変性から $\pi K^k=\pi$ なので、

$$
\|\mu P^{mk}-\pi\|_{\mathrm{TV}}
\le P(D_k)\le(1-\alpha)^k.
$$

$n=mk+r$、$0\le r<m$ と書けば、[全変動距離の和表示と縮小](#prop-sp5-tv-contraction)を $r$ 回適用して

$$
\begin{aligned}
\|\mu P^{mk+r}-\pi\|_{\mathrm{TV}}
&=\|(\mu P^{mk})P^r-\pi P^r\|_{\mathrm{TV}}\\
&\le\|\mu P^{mk}-\pi\|_{\mathrm{TV}}
\le(1-\alpha)^k.
\end{aligned}
$$

$\alpha=1$ では全 $i$ で $K(i,\cdot)=u$ なので最初のブロックで確実に一致させられ、$k\ge1$ なら距離は $0$ です。$k=0$ なら距離は高々 $1$。以上からどの場合も $n\to\infty$ で右辺は $0$ となります。
<!-- proof-end -->

周期性が残ると、この証明の共通正値成分を作れません。以下の $\delta_i$ は状態 $i$ に確率 $1$ を置く分布です。この記法は [SP4 の有限既約連鎖の定理](../SP4/index.md#thm-sp4-finite-irreducible)の証明でも用いました。$\delta_iP^n$ は状態 $i$ から始めた $n$ 歩後の分布を表します。

<a id="prop-sp5-periodic-obstruction"></a>

<!-- formal-statement-start -->
> **命題（周期的既約連鎖の非収束）**  
> 空でない有限状態空間上の時間一様既約 Markov 連鎖が周期 $d>1$ を持ち、その一意の不変確率分布が $\pi$ であるとする。任意の状態 $i$ と、$d$ で割り切れない任意の整数 $n\ge1$ について

$$
\|\delta_iP^n-\pi\|_{\mathrm{TV}}\ge\pi_i>0
$$

> である。従って $\delta_iP^n$ は $\pi$ に収束しない。
<!-- formal-statement-end -->

<!-- proof-start -->
### 証明

$d=\gcd R_i$ なので、$d$ で割り切れない $n$ では $p^{(n)}(i,i)=0$ です。[既約可算連鎖の正再帰性と不変確率分布](../SP4/index.md#thm-sp4-positive-recurrence-characterization)から $\pi_i>0$ であり、距離の定義で事象 $A=\{i\}$ を取ると

$$
\|\delta_iP^n-\pi\|_{\mathrm{TV}}\ge
|p^{(n)}(i,i)-\pi_i|=\pi_i.
$$

$d\nmid n$ となる正整数は無限にあるため、距離は $0$ に収束しません。
<!-- proof-end -->

交互二状態連鎖 $P=\begin{pmatrix}0&1\\1&0\end{pmatrix}$ は周期 $2$、不変分布 $(1/2,1/2)$ を持ちますが、$\delta_0P^{2k}=\delta_0$、$\delta_0P^{2k+1}=\delta_1$ で、いずれも不変分布からの距離は $1/2$ です。

## 6. 収束までに必要な歩数

収束が分かっても、実際に必要な歩数は別問題です。初期状態のうち収束が最も遅いものを基準にします。状態 $i$ の周期 $d(i)$ と混同しないよう、時刻 $n$ の最悪初期状態からの距離を $D(n)$ と書きます。

<a id="def-sp5-mixing-time"></a>

<!-- formal-statement-start -->
> **定義（有限 Markov 連鎖の混合時間）**  
> 空でない有限状態空間 $S$ 上の既約非周期 Markov 連鎖の遷移行列を $P$、その一意の不変確率分布を $\pi$ とする。$0<\eta<1$ に対し

$$
D(n)=\max_{i\in S}\|\delta_iP^n-\pi\|_{\mathrm{TV}},
\qquad
t_{\mathrm{mix}}(\eta)
=\min\{n\ge0:D(n)\le\eta\}
$$

> を、それぞれ最悪初期状態からの距離と、精度 $\eta$ の**有限 Markov 連鎖の混合時間**という。
<!-- formal-statement-end -->

[有限既約非周期 Markov 連鎖の収束](#thm-sp5-finite-convergence)から $t_{\mathrm{mix}}(\eta)$ は有限です。そこで得られた $m,\alpha$ で $0<\alpha<1$ なら

$$
t_{\mathrm{mix}}(\eta)
\le m\left\lceil\frac{\log\eta}{\log(1-\alpha)}\right\rceil;
$$

$\alpha=1$ なら $t_{\mathrm{mix}}(\eta)\le m$ です。共通成分 $\alpha$ の下界は粗いこともあり、この式は必ずしも鋭い評価ではありません。

<!-- definition-example-start: def-sp5-mixing-time -->
### 直接例：二状態連鎖の正確な距離

**定義の確認**

$0<a,b<1$ とします。行が出発状態、列が到着状態なので、$a$ は $0\to1$、$b$ は $1\to0$ の一歩遷移確率です。

$$
P=\begin{pmatrix}1-a&a\\b&1-b\end{pmatrix}.
$$

両向きの遷移と各状態の自己ループが正確率なので既約非周期です。不変方程式から $a\pi_0=b\pi_1$、$\pi_0+\pi_1=1$、従って

$$
\pi=\left(\frac b{a+b},\frac a{a+b}\right).
$$

$v_n=(\mu P^n)_0$ とすると、次の一歩を場合分けして

$$
v_{n+1}=(1-a)v_n+b(1-v_n)=b+(1-a-b)v_n.
$$

不変分布の第0成分も $\pi_0=b+(1-a-b)\pi_0$ を満たすので、差を取ると

$$
v_n-\pi_0=(1-a-b)^n(\mu_0-\pi_0).
$$

[全変動距離の和表示](#prop-sp5-tv-contraction)によれば、二状態では両成分の差の絶対値が等しいので、この距離は一成分の差の絶対値と一致します。従って、

$$
\|\mu P^n-\pi\|_{\mathrm{TV}}
=|1-a-b|^n|\mu_0-\pi_0|.
$$

$a=1/5$、$b=3/10$ なら $\pi=(3/5,2/5)$、$|1-a-b|=1/2$ です。最悪初期状態は $1$ なので $D(n)=(3/5)2^{-n}$。従って $D(2)=3/20>1/10$、$D(3)=3/40<1/10$ から $t_{\mathrm{mix}}(1/10)=3$ です。
<!-- definition-example-end -->

## 7. 演習 A：定義を具体的に確認する

<a id="ex-sp5-a01"></a>

### SP5-A01 交互連鎖の周期と定常性

- Level: A

$S=\{0,1\}$、$p(0,1)=p(1,0)=1$ とする。各状態の周期、不変確率分布 $\pi$、$X_0=0$ の場合の全時刻 $n\ge0$ での $\|\delta_0P^n-\pi\|_{\mathrm{TV}}$ を求めよ。

<!-- solution-start -->
### 詳細解答

$P^2=I$ より帰還可能な正の時刻は $2,4,6,\ldots$。両状態の周期は $2$ です。不変方程式 $\pi P=\pi$ は $\pi_0=\pi_1$、正規化は $\pi_0+\pi_1=1$ なので $\pi=(1/2,1/2)$。

偶数時刻は $\delta_0P^{2k}=(1,0)$、奇数時刻は $\delta_0P^{2k+1}=(0,1)$ です。[全変動距離の和表示と縮小](#prop-sp5-tv-contraction)からどちらの場合も

$$
\|\delta_0P^n-\pi\|_{\mathrm{TV}}
=\frac12\left(\frac12+\frac12\right)=\frac12.
$$

不変分布への収束は成立しません。
<!-- solution-end -->

<a id="ex-sp5-a02"></a>

### SP5-A02 分布の距離と最良の結合

- Level: A

$S=\{0,1,2\}$、$\mu=(1/2,1/4,1/4)$、$\nu=(1/4,1/2,1/4)$ とする。両分布間の距離を求め、$P(U\ne V)$ がその値と等しい結合を具体的に一つ与えよ。

<!-- solution-start -->
### 詳細解答

[全変動距離の和表示と縮小](#prop-sp5-tv-contraction)によって

$$
\|\mu-\nu\|_{\mathrm{TV}}
=\frac12\left(\frac14+\frac14+0\right)=\frac14.
$$

$(U,V)=(0,0),(1,1),(2,2),(0,1)$ の四つの値にそれぞれ確率 $1/4$ を与えます。$U$ の値 $0,1,2$ の確率は $(2/4,1/4,1/4)=\mu$、$V$ の確率は $(1/4,2/4,1/4)=\nu$ です。食い違うのは $(0,1)$ の場合だけなので $P(U\ne V)=1/4$ であり、[結合不等式](#lem-sp5-coupling-inequality)は等号となります。
<!-- solution-end -->

<a id="ex-sp5-a03"></a>

### SP5-A03 三状態で一つだけ自己ループ

- Level: A

$S=\{0,1,2\}$、$p(0,0)=p(0,1)=1/2$、$p(1,2)=p(2,0)=1$、他は $0$ とする。既約性と各状態の周期を示せ。

<!-- solution-start -->
### 詳細解答

$0\to1\to2\to0$ の正確率経路により、任意の二状態間に到達可能な経路があり、[通信クラス](../SP3/index.md#def-sp3-communication)の定義から既約です。$p(0,0)=1/2>0$ なので $1\in R_0$、従って $d(0)=1$。

$1$ からは $1\to2\to0\to1$ の三歩帰還と $1\to2\to0\to0\to1$ の四歩帰還が正確率なので、$\gcd(3,4)=1$ から $d(1)=1$。$2$ からも $2\to0\to1\to2$ の三歩、$2\to0\to0\to1\to2$ の四歩があり $d(2)=1$。または [周期の通信クラス不変性](#prop-sp5-class-period)を用いて $d(0)=1$ から全状態に伝えてもよいです。
<!-- solution-end -->

<a id="ex-sp5-a04"></a>

### SP5-A04 不変分布と一歩後の距離

- Level: A

$P=\begin{pmatrix}3/5&2/5\\1/5&4/5\end{pmatrix}$ の不変確率分布を求め、初期分布 $\delta_0$ からの時刻 $0,1$ の分布間距離を計算せよ。

<!-- solution-start -->
### 詳細解答

$\pi P=\pi$ の第0成分を整理すると $(2/5)\pi_0=(1/5)\pi_1$ です。従って $\pi_1=2\pi_0$ であり、$\pi=(1/3,2/3)$ です。確認すると

$$
(\pi P)_0=\frac13\frac35+\frac23\frac15
=\frac15+\frac2{15}=\frac13
$$

で、他方は行和 $1$ により $2/3$ です。

[全変動距離の和表示](#prop-sp5-tv-contraction)から二状態分布のこの距離は一成分の差の絶対値に等しいので、時刻 $0$ では $|1-1/3|=2/3$、時刻 $1$ では $\delta_0P=(3/5,2/5)$ なので

$$
\|\delta_0P-\pi\|_{\mathrm{TV}}
=\left|\frac35-\frac13\right|=\frac4{15}.
$$

[遷移縮小](#prop-sp5-tv-contraction)と整合します。
<!-- solution-end -->

<a id="ex-sp5-a05"></a>

### SP5-A05 二状態連鎖の混合に必要な歩数

- Level: A

$P=\begin{pmatrix}4/5&1/5\\3/10&7/10\end{pmatrix}$ に対し、最悪初期状態からの距離 $D(n)$ と $t_{\mathrm{mix}}(1/10)$ を求めよ。

<!-- solution-start -->
### 詳細解答

二状態モデルの不変分布は $a=1/5,b=3/10$ を使って $\pi=(3/5,2/5)$、差分の倍率は $1-a-b=1/2$ です。初期状態 $0$ では第0成分の差が $1-3/5=2/5$、初期状態 $1$ では $0-3/5=-3/5$ なので

$$
\|\delta_0P^n-\pi\|_{\mathrm{TV}}=\frac25\,2^{-n},
\qquad
\|\delta_1P^n-\pi\|_{\mathrm{TV}}=\frac35\,2^{-n}.
$$

従って $D(n)=\frac35\,2^{-n}$。$D(2)=3/20>1/10$、$D(3)=3/40<1/10$ なので [有限 Markov 連鎖の混合時間](#def-sp5-mixing-time)より $t_{\mathrm{mix}}(1/10)=3$ です。
<!-- solution-end -->

## 8. 演習 B：証明と仮定を使い分ける

<a id="ex-sp5-b01"></a>

### SP5-B01 自己ループがない状態でも非周期

- Level: B

$0<a<1$、$p(0,0)=a$、$p(0,1)=1-a$、$p(1,0)=1$ の二状態連鎖について、両状態の周期を帰還時刻から求め、既約非周期を示せ。

<!-- solution-start -->
### 詳細解答

$p(0,0)=a>0$ なので $1\in R_0$、従って $d(0)=1$ です。$1$ からは $1\to0\to1$ の確率 $1-a>0$ の二歩帰還があるため $2\in R_1$。また $1\to0\to0\to1$ の確率は $a(1-a)>0$ であり、$3\in R_1$ です。従って $d(1)$ は $2,3$ の両方を割り $d(1)=1$。$0\to1$、$1\to0$ とも正確率だから既約です。$p(1,1)=0$ でも周期が $2$ になるとは限りません。
<!-- solution-end -->

<a id="ex-sp5-b02"></a>

### SP5-B02 共通成分の具体的な分解

- Level: B

$P=\begin{pmatrix}3/5&2/5\\1/5&4/5\end{pmatrix}$ の $m=1$ に対し、一様分布 $u=(1/2,1/2)$ と $\alpha=2\min_{i,j}p(i,j)$ を使って $P(i,j)=\alpha u_j+(1-\alpha)R(i,j)$ を満たす行確率行列 $R$ を求めよ。異なる状態から出発した二本が一歩後も異なる確率の上界を求めよ。

<!-- solution-start -->
### 詳細解答

$\min_{i,j}p(i,j)=1/5$ だから $\alpha=2/5$、共通部分は各成分で $\alpha u_j=1/5$ です。残差を $1-\alpha=3/5$ で割ると、

$$
R=\begin{pmatrix}
(3/5-1/5)/(3/5)&(2/5-1/5)/(3/5)\\
(1/5-1/5)/(3/5)&(4/5-1/5)/(3/5)
\end{pmatrix}
=\begin{pmatrix}2/3&1/3\\0&1\end{pmatrix}.
$$

非負で各行の和が $1$ です。二本が異なる場合、確率 $2/5$ で同じ一様乱数の値へ移し、残りの確率 $3/5$ で各自の $R$ の行から遷移させます。共通部分では必ず一致するため、一歩後も異なる確率は高々 $3/5$。残差側でも偶然一致し得るので、等号とは限りません。これは [結合による収束定理の証明](#thm-sp5-finite-convergence)で用いた、周辺分布を保った同時遷移の具体例です。
<!-- solution-end -->

<a id="ex-sp5-b03"></a>

### SP5-B03 二状態連鎖の一般公式

- Level: B

$0<a,b<1$ に対して $P=\begin{pmatrix}1-a&a\\b&1-b\end{pmatrix}$ とする。任意の初期分布 $\mu$ からの $\mu P^n$ を成分で求め、この距離で $\pi$ に収束することを証明せよ。$a+b=1$ の場合を別途説明せよ。

<!-- solution-start -->
### 詳細解答

不変方程式 $a\pi_0=b\pi_1$ と $\pi_0+\pi_1=1$ を解くと

$$
\pi_0=\frac b{a+b},\qquad\pi_1=\frac a{a+b}.
$$

$v_n=(\mu P^n)_0$ とすると、次に $0$ にいる場合を $X_n=0,1$ に分けて

$$
v_{n+1}=(1-a)v_n+b(1-v_n)=b+(1-a-b)v_n.
$$

不変方程式を同じ形 $\pi_0=b+(1-a-b)\pi_0$ で書いて差を取れば、$v_{n+1}-\pi_0=(1-a-b)(v_n-\pi_0)$。$v_0=\mu_0$ から帰納的に

$$
\mu P^n=
\left(\pi_0+(1-a-b)^n(\mu_0-\pi_0),\ 
\pi_1-(1-a-b)^n(\mu_0-\pi_0)\right).
$$

[全変動距離の和表示と縮小](#prop-sp5-tv-contraction)より

$$
\|\mu P^n-\pi\|_{\mathrm{TV}}
=|1-a-b|^n|\mu_0-\pi_0|.
$$

$0<a+b<2$ だから $|1-a-b|<1$ で収束します。$a+b=1$ では両行が同じ分布 $\pi$ であり、任意の初期分布から一歩後にちょうど $\pi$ になります。$n=0$ は初期分布そのもので、$0^0$ の解釈を必要としません。
<!-- solution-end -->

<a id="ex-sp5-b04"></a>

### SP5-B04 既約性がない場合の不変分布

- Level: B

$S=\{0,1,2\}$、$0<q<1$ とし、状態 $0,1$ はそれぞれ吸収状態、$p(2,0)=q$、$p(2,1)=1-q$ とする。不変確率分布をすべて求め、$2$ から出発した時刻分布の極限と、初期状態に依存しない一意の極限が存在しない理由を述べよ。

<!-- solution-start -->
### 詳細解答

どこからも $2$ へ入る遷移がないので、不変方程式の $2$ 成分は $\pi_2=0$ です。残る不変方程式は $\pi_0,\pi_1$ に条件を課さず、正規化 $\pi_0+\pi_1=1$ だけが残ります。従って

$$
\pi^{(\theta)}=(\theta,1-\theta,0),\qquad0\le\theta\le1
$$

が全ての不変分布です。$2$ からは一歩後に $0,1$ に移って吸収されるため、全 $n\ge1$ で $\delta_2P^n=(q,1-q,0)$。一方 $\delta_0P^n=\delta_0$、$\delta_1P^n=\delta_1$ なので、極限は初期状態によります。[既約性の定義](../SP3/index.md#def-sp3-communication)が破れ、[SP4 の既約連鎖の不変分布一意性](../SP4/index.md#thm-sp4-positive-recurrence-characterization)は全体に適用できません。
<!-- solution-end -->

## 9. 演習 C：三状態サイクルの混合

<a id="ex-sp5-c01"></a>

### SP5-C01 自己ループ付きサイクルの収束

- Level: C

$S=\{0,1,2\}$、$C$ を $0\to1\to2\to0$ の一方向サイクルの遷移行列とする。$0\le s\le1$ に対して $P_s=sI+(1-s)C$ と置く。

1. $0<s<1$ で既約性・非周期性を確認し、不変確率分布を求めよ。
2. $P_s^2$ の各行の三成分を計算し、$m=2$ の共通一様成分の割合 $\alpha$ を $s$ で求めよ。
3. $s=1/2$ の場合、任意の初期分布からの分布間距離を結合で評価し、$t_{\mathrm{mix}}(1/16)$ の上界を求めよ。
4. $s=0$ と $s=1$ で破れる仮定、不変分布、時刻分布の挙動をそれぞれ調べよ。

<!-- solution-start -->
### 詳細解答

**第1問。** $0<s<1$ なら時計回りに進む確率 $1-s>0$ なので、どの状態からも他の状態へ到達でき、既約です。各状態には $p_s(i,i)=s>0$ の一歩帰還があり、周期は $1$。各列は一つの自己ループと一つのサイクル流入からなり、列和 $s+(1-s)=1$ です。従って $\pi=(1/3,1/3,1/3)$ は

$$
(\pi P_s)_j=\frac13\sum_i p_s(i,j)=\frac13
$$

を満たします。[既約可算連鎖の正再帰性と不変確率分布](../SP4/index.md#thm-sp4-positive-recurrence-characterization)から一意です。

**第2問。** $C$ の行 $i$・列 $j$ は、$i$ から時計回りに一歩で $j$ へ移る確率です。行列積 $(C^2)_{ij}=\sum_k C_{ik}C_{kj}$ は二歩後の遷移確率を表し、[Chapman–Kolmogorov の式](../../STO/STO2A/index.md#eq-sto2a-chapman-kolmogorov)と一致します。$IC=CI=C$、$C^3=I$ だから、積を一項ずつ展開すると

$$
P_s^2=(sI+(1-s)C)^2
=s^2I+2s(1-s)C+(1-s)^2C^2.
$$

各行で自分自身への確率は $s^2$、時計回り一歩先へ $2s(1-s)$、二歩先へ $(1-s)^2$ です。$0<s<1$ なら全て正で、和は

$$
s^2+2s(1-s)+(1-s)^2=(s+1-s)^2=1.
$$

よって $\varepsilon_0=\min\{s^2,2s(1-s),(1-s)^2\}$、共通一様成分は $\alpha=3\varepsilon_0$ です。

**第3問。** $s=1/2$ では三つの値が $1/4,1/2,1/4$、従って $\alpha=3/4$、$m=2$ です。二歩ごとに確率 $3/4$ で両連鎖を同じ一様乱数へ移し、すでに一致していれば共通の遷移を使います。食い違いの確率は一ブロックごとに高々 $1/4$ 倍になり、[有限既約非周期 Markov 連鎖の収束](#thm-sp5-finite-convergence)から

$$
\|\mu P_{1/2}^n-\pi\|_{\mathrm{TV}}
\le(1/4)^{\lfloor n/2\rfloor}.
$$

$n=4$ で右辺は $1/16$ なので、$t_{\mathrm{mix}}(1/16)\le4$。これは最小の必要歩数の厳密値ではなく上界です。

**第4問。** $s=0$ では $P_0=C$。既約で一様分布は不変ですが、各状態への正の帰還可能時刻は $3,6,9,\ldots$ で周期 $3$ です。$0$ からの時刻分布は $\delta_0,\delta_1,\delta_2$ を巡回し、距離は各時刻で $2/3$ なので収束しません。$P_0^m$ の各行には必ず零成分があり、共通正成分を構成できません。

$s=1$ では $P_1=I$。各状態の周期は $1$ ですが、異なる状態へ到達できず既約性が破れます。全ての確率分布が不変で $\mu P_1^n=\mu$ なので、初期状態に依存しない一意の極限はありません。$P_1^m$ にも零成分が残り、共通正成分は取れません。
<!-- solution-end -->

## 10. 章末の確認

- [有限既約連鎖の正再帰性](../SP4/index.md#thm-sp4-finite-irreducible)は不変分布の存在を保証しますが、時刻分布の収束までは保証しません。
- 周期は正の帰還可能時刻の最大公約数で、同じ通信クラスでは一致します。周期的なら定常分布があっても分布は振動し得ます。
- 二分布の距離は事象確率の差の最大値であり、行確率行列を作用させても増えません。結合不等式では二本が食い違う確率がその上界です。
- **有限・既約・非周期**なら共通歩数の全正成分が作れ、結合によって定常分布への幾何的収束と、混合に必要な歩数の初歩的上界が得られます。

次はランダムウォークの境界到達と破産問題を扱い、有限区間の境界条件から到達確率と平均時間を計算します。
