# SP5 有限 Markov 連鎖の収束・周期性・結合

[有限既約連鎖の正再帰性](../SP4/index.md#thm-sp4-finite-irreducible)により、有限既約連鎖には一意の不変確率分布があります。しかし、不変であることは、ある状態から出発した分布がその分布へ近づくことを意味しません。例えば $0\to1\to0$ を確率 $1$ で繰り返す連鎖は、$(1/2,1/2)$ を不変分布に持ちながら、時刻分布は振動し続けます。

この障害を「周期」で捉え、距離を測る「全変動距離」と二本の連鎖を一緒に構成する「結合」を用いて、有限・既約・非周期の下での収束を証明します。行列の固有値の一般論を先取りせず、読者が確率計算を追える形にします。

## 1. 周期とは何か

$S$ を空でない有限状態空間、$P=(p(i,j))$ を行確率行列、$p^{(n)}(i,j)$ を $n$ 歩遷移確率とします。$p^{(0)}(i,j)=\boldsymbol{1}_{\{i=j\}}$ です。これらは [Markov 連鎖の定義](../../STO/STO2A/index.md#def-sto2a-markov)と [Chapman–Kolmogorov の式](../../STO/STO2A/index.md#eq-sto2a-chapman-kolmogorov)から計算できます。

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

$p(0,1)=p(1,0)=1$ なら、どちらの状態も帰還可能時刻は $2,4,6,\ldots$ なので周期 $2$ です。一方、$p(0,0)=p(0,1)=1/2$、$p(1,0)=1$ なら $0$ は一歩で帰還でき、周期 $1$ です。$1$ は二歩 $1\to0\to1$ と三歩 $1\to0\to0\to1$ で帰還できるので $\gcd(2,3)=1$、周期 $1$ です。自己ループがない状態も非周期になり得ます。
<!-- definition-example-end -->

[通信クラス・既約性の定義](../SP3/index.md#def-sp3-communication)を使うと、通信する状態の周期が一致することを示せます。

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

## 2. 全変動距離：分布全体を比較する

時刻分布 $\mu P^n$ と不変分布 $\pi$ の差は、ある一状態だけではなく、どの事象を見ても小さくなる必要があります。

<a id="def-sp5-total-variation"></a>

<!-- formal-statement-start -->
> **定義（有限集合上の全変動距離）**  
> 空でない有限集合 $S$ 上の二つの確率分布 $\mu,\nu$ に対し、全変動距離を

$$
\|\mu-\nu\|_{\mathrm{TV}}
=\max_{A\subset S}|\mu(A)-\nu(A)|,
\qquad \mu(A)=\sum_{i\in A}\mu_i
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

$\mu=(1/2,1/4,1/4)$、$\nu=(1/4,1/2,1/4)$ では、和表示から距離は $\frac12(1/4+1/4)=1/4$ です。事象 $A=\{0\}$ を取ると $\mu(A)-\nu(A)=1/4$ で、最大を実現します。
<!-- definition-example-end -->

## 3. 結合：同じ乱数で二本を比較する

全変動距離は、二本の確率変数を同じ確率空間に置いて「異なる値になる確率」で上から抑えられます。二本が独立である必要はありません。

<a id="def-sp5-coupling"></a>

<!-- formal-statement-start -->
> **定義（結合）**  
> 有限集合 $S$ 上の確率分布 $\mu,\nu$ に対し、同一の確率空間上の $S$ 値確率変数 $(U,V)$ で、全 $i\in S$ について $P(U=i)=\mu_i$、$P(V=i)=\nu_i$ を満たすものを、二分布の**結合**という。
<!-- formal-statement-end -->

<!-- definition-example-start: def-sp5-coupling -->
### 直接例：同じ一様乱数

$W$ を $[0,1]$ 上の一様乱数とし、$U=0$ を $W\le3/4$ のとき、$V=0$ を $W\le1/4$ のときとし、他は $1$ とします。$P(U=0)=3/4$、$P(V=0)=1/4$ であり、$U\ne V$ は $1/4<W\le3/4$ のときだけなので $P(U\ne V)=1/2$ です。二つの異なる周辺分布を正しく保っています。
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
> 有限状態空間 $S$ 上の時間一様 Markov 連鎖と状態 $o\in S$ について、$R_o=\{n\ge1:p^{(n)}(o,o)>0\}$ が空でなく $\gcd R_o=1$ なら、ある整数 $N\ge1$ が存在し、全整数 $n\ge N$ に対し $p^{(n)}(o,o)>0$ である。
<!-- formal-statement-end -->

### 証明の見取り図

正確率の帰還経路は何本でもつなげられます。最大公約数 $1$ を作る有限個の帰還経路から、十分大きなあらゆる整数を帰還経路の長さとして作ります。

<!-- proof-start -->
### 証明

$R_o$ の元を順に取り最大公約数を計算すると、最大公約数は正整数の非増加列であり、最終的に $\gcd R_o=1$ になります。従って有限個の $a_1,\ldots,a_\ell\in R_o$ で $\gcd(a_1,\ldots,a_\ell)=1$ と選べます。$a=a_1$ とします。

各 $a_k$ の剰余を法 $a$ で考え、それらの**非負整数係数による和**の剰余全体を $H\subset\mathbb Z/a\mathbb Z$ とします。$H$ は $0$ を含み加法について閉じます。有限群の元 $h$ はある $q\ge1$ について $qh=0$ だから、$-h=(q-1)h\in H$ です。従って $H$ は部分群です。$\gcd(a_1,\ldots,a_\ell)=1$ なので Bézout の整数係数表示により剰余 $1$ が生成され、$H$ は全剰余類を含みます。

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

基準状態 $o\in S$ を固定します。既約性から各 $i$ の $i\to o$ の正確率経路の長さを $a_i\ge0$、各 $j$ の $o\to j$ の長さを $b_j\ge0$ と選べます。$i=o$、$j=o$ では長さ $0$ の経路を使います。[周期が通信クラスで共通](#prop-sp5-class-period)なので $d(o)=1$。[十分長い帰還時刻の補題](#lem-sp5-large-returns)から $n\ge N$ なら $p^{(n)}(o,o)>0$ です。

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

> が成立する。指数 $0$ のとき右辺を $1$ と読み、$\alpha=1$ かつ指数が正のとき右辺を $0$ と読む。特に $\mu P^n$ は $\pi$ に全変動距離で収束する。
<!-- formal-statement-end -->

### 証明の見取り図

不変分布の存在・一意性は [SP4 の正再帰・不変分布の定理](../SP4/index.md#thm-sp4-positive-recurrence-characterization)と[有限既約連鎖の定理](../SP4/index.md#thm-sp4-finite-irreducible)から従います。新しい部分は収束です。$m$ 歩ごとに二本の連鎖を比べ、割合 $\alpha$ で同じ一様乱数の値に移して一致させます。一度一致したら、共通乱数で一致を保てます。

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

$n=mk+r$、$0\le r<m$ と書けば、[全変動距離の遷移縮小](#prop-sp5-tv-contraction)を $r$ 回適用して

$$
\begin{aligned}
\|\mu P^{mk+r}-\pi\|_{\mathrm{TV}}
&=\|(\mu P^{mk})P^r-\pi P^r\|_{\mathrm{TV}}\\
&\le\|\mu P^{mk}-\pi\|_{\mathrm{TV}}
\le(1-\alpha)^k.
\end{aligned}
$$

$\alpha=1$ では全 $i$ で $K(i,\cdot)=u$ なので最初のブロックで確実に一致させられ、$k\ge1$ なら距離は $0$ です。$k=0$ なら全変動距離は高々 $1$。以上からどの場合も $n\to\infty$ で右辺は $0$ となります。
<!-- proof-end -->

周期性が残ると、この証明の共通正値成分を作れません。

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

$d=\gcd R_i$ なので、$d$ で割り切れない $n$ では $p^{(n)}(i,i)=0$ です。[SP4 の正再帰・不変分布定理](../SP4/index.md#thm-sp4-positive-recurrence-characterization)から $\pi_i>0$ であり、全変動距離の事象 $A=\{i\}$ を取ると

$$
\|\delta_iP^n-\pi\|_{\mathrm{TV}}\ge
|p^{(n)}(i,i)-\pi_i|=\pi_i.
$$

$d\nmid n$ となる正整数は無限にあるため、距離は $0$ に収束しません。
<!-- proof-end -->

交互二状態連鎖 $P=\begin{pmatrix}0&1\\1&0\end{pmatrix}$ は周期 $2$、不変分布 $(1/2,1/2)$ を持ちますが、$\delta_0P^{2k}=\delta_0$、$\delta_0P^{2k+1}=\delta_1$ で、いずれも不変分布からの全変動距離は $1/2$ です。

## 6. 混合時間と二状態連鎖

収束が分かっても、実際に必要な歩数は別問題です。初期状態のうち収束が最も遅いものを基準にします。

<a id="def-sp5-mixing-time"></a>

<!-- formal-statement-start -->
> **定義（混合時間）**  
> 空でない有限状態空間 $S$ 上の既約非周期 Markov 連鎖の遷移行列を $P$、その一意の不変確率分布を $\pi$ とする。$0<\eta<1$ に対し

$$
d(n)=\max_{i\in S}\|\delta_iP^n-\pi\|_{\mathrm{TV}},
\qquad
t_{\mathrm{mix}}(\eta)
=\min\{n\ge0:d(n)\le\eta\}
$$

> を最悪初期状態からの距離と精度 $\eta$ の**混合時間**という。
<!-- formal-statement-end -->

[収束定理](#thm-sp5-finite-convergence)から混合時間は有限です。そこで得られた $m,\alpha$ で $0<\alpha<1$ なら

$$
t_{\mathrm{mix}}(\eta)
\le m\left\lceil\frac{\log\eta}{\log(1-\alpha)}\right\rceil;
$$

$\alpha=1$ なら $t_{\mathrm{mix}}(\eta)\le m$ です。共通成分 $\alpha$ の下界は粗いこともあり、この式は必ずしも鋭い評価ではありません。

<!-- definition-example-start: def-sp5-mixing-time -->
### 直接例：二状態連鎖の正確な距離

$0<a,b<1$ とし、

$$
P=\begin{pmatrix}1-a&a\\b&1-b\end{pmatrix}.
$$

両向きの遷移と各状態の自己ループが正確率なので既約非周期です。不変方程式から $a\pi_0=b\pi_1$、$\pi_0+\pi_1=1$、従って

$$
\pi=\left(\frac b{a+b},\frac a{a+b}\right).
$$

$u_n=(\mu P^n)_0$ とすると、次の一歩を場合分けして

$$
u_{n+1}=(1-a)u_n+b(1-u_n)=b+(1-a-b)u_n.
$$

不変分布の第0成分も $\pi_0=b+(1-a-b)\pi_0$ を満たすので、差を取ると

$$
u_n-\pi_0=(1-a-b)^n(\mu_0-\pi_0).
$$

二状態では全変動距離が一成分の差の絶対値と一致するため、

$$
\|\mu P^n-\pi\|_{\mathrm{TV}}
=|1-a-b|^n|\mu_0-\pi_0|.
$$

$a=1/5$、$b=3/10$ なら $\pi=(3/5,2/5)$、$|1-a-b|=1/2$ です。最悪初期状態は $1$ なので $d(n)=(3/5)2^{-n}$。従って $d(2)=3/20>1/10$、$d(3)=3/40<1/10$ から $t_{\mathrm{mix}}(1/10)=3$ です。
<!-- definition-example-end -->

