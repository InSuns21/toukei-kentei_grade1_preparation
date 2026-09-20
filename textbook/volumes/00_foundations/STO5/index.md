# STO5：continuous local martingale・quadratic variation・semimartingale

<!-- definition-example-audit: strict -->

STO4 までで Brown 運動を構成し、strong Markov property と hitting time まで閉じました。ここから連続時間の確率解析へ入ります。

Brown 運動の標本路は連続ですが、通常の微積分で扱う滑らかな曲線とは決定的に違います。時間幅を $\Delta t$ とすると Brownian increment は典型的に $\sqrt{\Delta t}$ の大きさなので、

$$
(\Delta B)^2
$$

は $\Delta t$ と同じ次数で残ります。

本章の中心線は

$$
\boxed{
\text{localization}
\to
\text{quadratic variation}
\to
\text{covariation}
\to
\text{semimartingale}
\to
\text{Lévy characterization}
}
$$

です。

STO6 では stochastic integral を単純過程から構成します。その前に、積分される側の process がどのような二次変分を持つかを先に固定します。後続理論を使って本章を証明することはしません。

---

## 1. continuous-time martingale と localization

離散時間 martingale の条件

$$
E[M_n\mid\mathcal F_m]=M_m
\qquad(m\le n)
$$

を、連続時間へそのまま延ばします。

<a id="def-sto5-continuous-local-martingale"></a>

<!-- formal-statement-start -->
> **定義（continuous-time martingale と continuous local martingale）**  
> usual conditions を満たす filtration $(\mathcal F_t)_{t\ge0}$ 上の adapted process $M=(M_t)_{t\ge0}$ が **continuous-time martingale** であるとは、各 $t\ge0$ で $E|M_t|<\infty$ かつ、全ての $0\le s\le t$ について

$$
E[M_t\mid\mathcal F_s]=M_s
$$

> が almost surely 成り立つことをいう。
>
> さらに $M$ の標本路が almost surely 連続であり、stopping time 列 $(\tau_n)$ が存在して

$$
\tau_n\uparrow\infty
\quad\text{almost surely},
$$

> かつ各 stopped process

$$
M^{\tau_n}_t:=M_{t\wedge\tau_n}
$$

> が continuous-time martingale になるとき、$M$ を **continuous local martingale** という。この $(\tau_n)$ を localizing sequence という。
<!-- formal-statement-end -->

local martingale の “local” は、時間の短い区間という意味ではありません。stopping により暴走する領域を切り落とすと、各段階では真の martingale になるという意味です。

典型的には

$$
\tau_n
=
\inf\{t\ge0:|M_t|\ge n\}\wedge n
$$

のように、値が大きくなる前に止めます。

<!-- definition-example-start: def-sto5-continuous-local-martingale -->
### 直接例：Brown 運動は continuous martingale

**定義の確認**

STO4 の Brown 運動 $B$ を、その usual augmented natural filtration で考えます。

$0\le s<t$ なら

$$
B_t=B_s+(B_t-B_s),
$$

かつ $B_t-B_s$ は $\mathcal F_s$ と独立で平均 0 です。従って

$$
E[B_t\mid\mathcal F_s]
=
B_s+E[B_t-B_s]
=
B_s.
$$

また

$$
E|B_t|
\le
\sqrt{E[B_t^2]}
=
\sqrt t<\infty.
$$

標本路は連続なので、$B$ は continuous martingale、従って continuous local martingale です。localizing sequence として単に $\tau_n=n$ を取れます。
<!-- definition-example-end -->

<a id="prop-sto5-brownian-martingale"></a>

<!-- formal-statement-start -->
> **命題（Brown 運動は continuous martingale）**  
> standard Brownian motion $B$ は、その usual augmented natural filtration に関して平方可積分な continuous martingale である。
<!-- formal-statement-end -->

<!-- proof-start -->
### 証明

上の直接例で martingale 条件を確認しました。平方可積分性は

$$
E[B_t^2]=t
$$

から従います。usual augmentation で追加される null set は条件付き期待値の almost-sure identity を変えません。
<!-- proof-end -->

<a id="thm-sto5-bounded-optional-sampling"></a>

<!-- formal-statement-start -->
> **定理（bounded stopping による continuous martingale の停止）**  
> $M$ を連続標本路を持つ continuous-time martingale とし、$\sigma\le\tau$ を有界な stopping time とする。このとき

$$
E[M_\tau\mid\mathcal F_\sigma]=M_\sigma
$$

> が almost surely 成り立つ。特に任意の有界 stopping time $\tau$ に対し、stopped process $M^\tau$ は continuous-time martingale である。
<!-- formal-statement-end -->

### 証明の見取り図

STO2 の bounded optional sampling は離散時間の定理でした。ここでは stopping time を右側 dyadic grid へ丸め、各 grid 上で STO2 を適用し、最後に標本路の連続性と一様可積分性で極限へ戻します。

<!-- proof-start -->
### 証明

$\sigma,\tau\le T$ almost surely とします。$\delta_n=2^{-n}$ と置き、

$$
\sigma_n=\delta_n\left\lceil\frac{\sigma}{\delta_n}\right\rceil,
\qquad
\tau_n=\delta_n\left\lceil\frac{\tau}{\delta_n}\right\rceil
$$

と定めます。すると $\sigma_n,\tau_n$ は dyadic grid に値を取る stopping time で、

$$
\sigma_n\le\tau_n,
\qquad
\sigma_n\downarrow\sigma,
\qquad
\tau_n\downarrow\tau.
$$

整数 $R>T+1$ を固定します。離散時間 process

$$
M^{(n)}_k=M_{k\delta_n}
$$

を $0\le k\le R/\delta_n$ で見ると、これは martingale です。STO2 の bounded optional sampling を grid-valued stopping times $\sigma_n/\delta_n$、$\tau_n/\delta_n$ に適用すると、任意の $A\in\mathcal F_\sigma\subset\mathcal F_{\sigma_n}$ について

$$
E[1_A M_{\tau_n}]
=
E[1_A M_{\sigma_n}]
$$

を得ます。

標本路の連続性から

$$
M_{\tau_n}\to M_\tau,
\qquad
M_{\sigma_n}\to M_\sigma
$$

almost surely です。

さらに同じ離散時間 optional sampling を terminal time $R$ まで使えば

$$
M_{\tau_n}
=
E[M_R\mid\mathcal F_{\tau_n}],
\qquad
M_{\sigma_n}
=
E[M_R\mid\mathcal F_{\sigma_n}].
$$

固定した integrable random variable $M_R$ の conditional expectations の族は一様可積分なので、上の almost-sure convergence は $L^1$ convergence へ強化されます。従って $n\to\infty$ として

$$
E[1_A M_\tau]
=
E[1_A M_\sigma].
$$

$A\in\mathcal F_\sigma$ は任意だから

$$
E[M_\tau\mid\mathcal F_\sigma]=M_\sigma.
$$

次に fixed $0\le s\le t$ と $A\in\mathcal F_s$ を取ります。事象を

$$
A_1=A\cap\{\tau\le s\},
\qquad
A_2=A\cap\{\tau>s\}
$$

へ分けます。

$A_1$ 上では

$$
t\wedge\tau=s\wedge\tau=\tau
$$

なので、対応する期待値は最初から一致します。

$A_2$ については

$$
\rho=(t\wedge\tau)\vee s
$$

と置きます。$\rho$ は bounded stopping time で $s\le\rho$ ですから、今証明した bounded optional sampling を deterministic stopping time $s$ と $\rho$ に適用して

$$
E[M_\rho\mid\mathcal F_s]=M_s
$$

を得ます。

$A_2\in\mathcal F_s$ であり、$A_2$ 上では $\rho=t\wedge\tau$ かつ $s\wedge\tau=s$ なので

$$
E[1_{A_2}M_{t\wedge\tau}]
=
E[1_{A_2}M_{s\wedge\tau}].
$$

$A_1$ 上の自明な等式と足し合わせると

$$
E[1_A M_{t\wedge\tau}]
=
E[1_A M_{s\wedge\tau}].
$$

$A\in\mathcal F_s$ は任意だから

$$
E[M_{t\wedge\tau}\mid\mathcal F_s]
=
M_{s\wedge\tau}.
$$

従って $M^\tau$ は martingale です。
<!-- proof-end -->

---

## 2. process の極限を「有限時間区間上で一様に」見る

quadratic variation は各固定時刻だけでなく、process 全体として収束させます。

<a id="def-sto5-ucp"></a>

<!-- formal-statement-start -->
> **定義（ucp convergence）**  
> process 列 $X^{(n)}$ が process $X$ へ **ucp**（uniformly on compacts in probability）で収束するとは、任意の $T>0$ と $\varepsilon>0$ に対し

$$
P\left(
\sup_{0\le t\le T}
|X_t^{(n)}-X_t|
>
\varepsilon
\right)
\longrightarrow0
$$

> が成り立つことをいう。
<!-- formal-statement-end -->

<!-- definition-example-start: def-sto5-ucp -->
### 直接例：$X_t^{(n)}=t/n$ は 0 へ ucp 収束する

**定義の確認**

$X_t^{(n)}=t/n$、$X_t=0$ とします。各 $T>0$ について

$$
\sup_{0\le t\le T}|X_t^{(n)}|
=
\frac Tn
\to0.
$$

従って任意の $\varepsilon>0$ について十分大きい $n$ では問題の確率は 0 であり、$X^{(n)}\to0$ ucp です。
<!-- definition-example-end -->

固定時刻ごとの確率収束だけでは、途中の時刻で大きく外れる可能性を抑えられません。STO6 以降では停止・積分と process 極限を交換するため、ucp が自然な収束様式になります。

---

## 3. finite variation は「一次変分」で測る

<a id="def-sto5-finite-variation"></a>

<!-- formal-statement-start -->
> **定義（continuous finite-variation process）**  
> continuous adapted process $A=(A_t)_{t\ge0}$ が **finite variation** であるとは、almost surely 全ての $T>0$ について

$$
V_T(A)
:=
\sup_{\pi}
\sum_{k=1}^m
|A_{t_k}-A_{t_{k-1}}|
<
\infty
$$

> が成り立つことをいう。supremum は $[0,T]$ の全ての有限分割
>
> $\pi=\{0=t_0<t_1<\cdots<t_m=T\}$
>
> について取る。
<!-- formal-statement-end -->

<!-- definition-example-start: def-sto5-finite-variation -->
### 直接例：絶対連続な drift

**定義の確認**

$A_t=\int_0^t a_s\,ds$ とし、各有限 $T$ で

$$
\int_0^T|a_s|\,ds<\infty
$$

とします。任意の分割に対し

$$
\begin{aligned}
\sum_k|A_{t_k}-A_{t_{k-1}}|
&=
\sum_k
\left|
\int_{t_{k-1}}^{t_k}a_s\,ds
\right|\\
&\le
\sum_k
\int_{t_{k-1}}^{t_k}|a_s|\,ds\\
&=
\int_0^T|a_s|\,ds.
\end{aligned}
$$

従って $A$ は finite variation です。
<!-- definition-example-end -->

smooth drift は一次変分を持ちます。Brownian noise は後で見るように二次変分を持ち、この違いが semimartingale 分解の意味になります。

---

## 4. quadratic variation

$[0,T]$ の分割

$$
\pi=\{0=t_0<t_1<\cdots<t_m=T\}
$$

に対し mesh を

$$
|\pi|=\max_k(t_k-t_{k-1})
$$

と書きます。

process $X$ に対する二次変分和を、分割点まで完成した increment の step process として

$$
Q_t^{\pi}(X)
=
\sum_{k:\,t_k\le t}
\left(
X_{t_k}-X_{t_{k-1}}
\right)^2,
\qquad 0\le t\le T
$$

とします。$t$ が分割点の間にあるとき最後の未完成区間は足しません。この定義なら $Q^\pi(X)$ は $t$ について増加します。continuous $X$ では、最後の未完成 increment を含める流儀との差は mesh $\to0$ で一様に消えます。

<a id="def-sto5-quadratic-variation"></a>

<!-- formal-statement-start -->
> **定義（quadratic variation）**  
> continuous process $X$ に対し、continuous increasing adapted process $[X]=([X]_t)_{t\ge0}$、$[X]_0=0$ が存在し、任意の deterministic partition 列 $(\pi_n)$ で各 compact interval 上
>
> $|\pi_n|\to0$
>
> を満たすものに対して

$$
Q^{\pi_n}(X)
\longrightarrow
[X]
\qquad\text{ucp}
$$

> が成り立つとき、$[X]$ を $X$ の **quadratic variation** という。
<!-- formal-statement-end -->

<!-- definition-example-start: def-sto5-quadratic-variation -->
### 直接例：$C^1$ 関数の quadratic variation は 0

**定義の確認**

$f\in C^1([0,T])$ を決定論的 process とみなします。平均値の定理から

$$
|f(t_k)-f(t_{k-1})|
\le
\|f'\|_\infty(t_k-t_{k-1}).
$$

従って

$$
\begin{aligned}
Q_T^\pi(f)
&\le
\|f'\|_\infty^2
\sum_k(t_k-t_{k-1})^2\\
&\le
\|f'\|_\infty^2
T|\pi|
\to0.
\end{aligned}
$$

smooth function では二次の増分は消えます。
<!-- definition-example-end -->

<a id="prop-sto5-finite-variation-zero-qv"></a>

<!-- formal-statement-start -->
> **命題（continuous finite-variation process の quadratic variation は 0）**  
> $A$ を continuous finite-variation process とする。このとき

$$
[A]_t=0
\qquad(t\ge0).
$$
<!-- formal-statement-end -->

### 証明の見取り図

二乗和の一つを「最大増分」、もう一つを total variation として分けます。

<!-- proof-start -->
### 証明

固定した $T$ と分割 $\pi$ について

$$
\begin{aligned}
Q_T^\pi(A)
&=
\sum_k|\Delta_kA|^2\\
&\le
\left(\max_k|\Delta_kA|\right)
\sum_k|\Delta_kA|\\
&\le
\left(\max_k|\Delta_kA|\right)V_T(A).
\end{aligned}
$$

$A$ は $[0,T]$ 上連続なので一様連続です。従って $|\pi|\to0$ なら

$$
\max_k|\Delta_kA|\to0
$$

almost surely。一方 $V_T(A)<\infty$ almost surely なので

$$
Q_T^\pi(A)\to0
$$

almost surely です。

同じ評価を各 $t\le T$ までに完成した increment の和へ適用すると

$$
\sup_{0\le t\le T}Q_t^\pi(A)
\le
\left(\max_k|\Delta_kA|\right)V_T(A)
\to0
$$

almost surely。従って ucp 収束し、$[A]\equiv0$ です。
<!-- proof-end -->

---

## 5. Brown 運動の quadratic variation は時間

<a id="thm-sto5-brownian-qv"></a>

<!-- formal-statement-start -->
> **定理（Brown 運動の quadratic variation）**  
> $B$ を standard Brownian motion とする。任意の $T>0$ と deterministic partition
>
> $\pi=\{0=t_0<\cdots<t_m=T\}$
>
> に対して

$$
Q_T^\pi(B)
=
\sum_{k=1}^m(B_{t_k}-B_{t_{k-1}})^2
$$

> と置く。このとき $|\pi|\to0$ なら

$$
Q_T^\pi(B)
\longrightarrow T
$$

> が $L^2$ で成り立つ。さらに process として

$$
[B]_t=t
$$

> である。
<!-- formal-statement-end -->

### 証明の見取り図

各増分は独立な Gaussian です。二乗和の平均は時間幅の総和 $T$、分散は mesh に比例して 0 へ行きます。

<!-- proof-start -->
### 証明

$$
\Delta_kB=B_{t_k}-B_{t_{k-1}},
\qquad
\Delta_kt=t_k-t_{k-1}
$$

と置きます。

Brownian increments から

$$
\Delta_kB\sim N(0,\Delta_kt)
$$

で、異なる $k$ の増分は独立です。従って

$$
E[(\Delta_kB)^2]=\Delta_kt,
$$

よって

$$
E[Q_T^\pi(B)]
=
\sum_k\Delta_kt
=
T.
$$

$Z\sim N(0,\sigma^2)$ なら

$$
E[Z^4]=3\sigma^4
$$

なので

$$
\operatorname{Var}(Z^2)
=
3\sigma^4-\sigma^4
=
2\sigma^4.
$$

従って独立性から

$$
\begin{aligned}
\operatorname{Var}(Q_T^\pi(B))
&=
2\sum_k(\Delta_kt)^2\\
&\le
2|\pi|\sum_k\Delta_kt\\
&=
2T|\pi|.
\end{aligned}
$$

したがって

$$
E|Q_T^\pi(B)-T|^2
\le
2T|\pi|
\to0.
$$

任意の固定 $t\le T$ に対して同じ計算が使えます。さらに $Q_t^\pi(B)$ は $t$ について増加し、極限候補 $t$ は連続です。有限個の時間格子で固定時刻収束を取り、格子間の差を単調性と $t$ の一様連続性で挟むと

$$
\sup_{0\le t\le T}|Q_t^\pi(B)-t|
\to0
$$

in probability を得ます。従って $[B]_t=t$ です。
<!-- proof-end -->

ここで初めて

$$
(dB_t)^2=dt
$$

という記号の数学的な中身が見えます。これは微分形式の恒等式ではなく、細分割した二乗増分の極限を短く書いた記憶法です。

---

## 6. continuous local martingale の quadratic variation theorem

Brown 運動では独立 Gaussian increments を直接使えました。一般の continuous local martingale には独立増分はありません。それでも quadratic variation は存在します。

<a id="thm-sto5-local-martingale-qv"></a>

<!-- formal-statement-start -->
> **定理（continuous local martingale の quadratic variation theorem）**  
> $M$ を continuous local martingale とする。このとき一意な continuous increasing adapted process $[M]$、$[M]_0=0$ が存在し、
>
> 1. 任意の deterministic partition 列で mesh が compact interval 上 0 へ行くとき

$$
Q^{\pi_n}(M)\to[M]
\qquad\text{ucp},
$$

> 2. process

$$
M_t^2-[M]_t
$$

> は continuous local martingale、
>
> 3. stopping time $\tau$ に対し

$$
[M^\tau]_t=[M]_{t\wedge\tau}
$$

> が成り立つ。
<!-- formal-statement-end -->

### 何が難しいのか

Brownian proof で使った「二乗増分が独立」という武器は一般 martingale では消えます。存在証明では、$M^2$ が submartingale であることから増加部分を抽出する **continuous-time Doob--Meyer theorem** と、離散分割上の martingale difference estimate を使います。

continuous-time Doob--Meyer theorem の一般証明は class D、regularization、predictable compensator を独立に展開する大きな理論です。この Encore IV 主線ではそれ自体を別章化していないため、**本定理の存在部分だけはその定理を技術的入力として使います**。一方、本章で必要な特徴付け・一意性・stopping・covariation・semimartingale への帰結は以下で閉じます。

### 存在証明の構造

localizing sequence でまず bounded continuous martingale へ落とします。continuous-time Doob--Meyer theorem を $M^2$ に適用すると

$$
M_t^2=M_0^2+N_t+A_t
$$

と分解でき、$N$ は continuous martingale、$A$ は continuous predictable increasing process、$A_0=0$ です。

細分割上では

$$
(\Delta M)^2
=
\Delta(M^2)-2M_{\mathrm{left}}\Delta M.
$$

右辺の martingale difference 部分を離散時間の二乗平均評価で制御すると、二乗増分和は $A$ へ ucp 収束します。この $A$ を $[M]$ と置きます。stopping した process では同じ構成が停止前だけ残るため

$$
[M^\tau]=[M]^\tau
$$

です。

異なる localizing sequence で構成しても、共通停止時刻 $\tau_n\wedge\sigma_m$ 上では bounded martingale の一意性により一致します。$n,m\to\infty$ として global process が貼り合わさります。

この技術的入力は STO6 の stochastic integral を仮定していません。むしろ STO6 が本定理を使います。

---

## 7. bracket の一意性と finite variation local martingale

[continuous local martingale の quadratic variation theorem](#thm-sto5-local-martingale-qv) の

$$
M^2-[M]
$$

が local martingale という特徴付けは非常に強力です。

<a id="lem-sto5-fv-local-martingale-constant"></a>

<!-- formal-statement-start -->
> **補題（continuous local martingale かつ finite variation なら定数）**  
> $L$ が continuous local martingale かつ continuous finite-variation process なら

$$
L_t=L_0
\qquad\text{for all }t\ge0
$$

> almost surely.
<!-- formal-statement-end -->

<!-- proof-start -->
### 証明

finite variation なので [前節](#prop-sto5-finite-variation-zero-qv) から

$$
[L]\equiv0.
$$

[continuous local martingale の quadratic variation theorem](#thm-sto5-local-martingale-qv) により

$$
L_t^2-[L]_t=L_t^2
$$

は local martingale です。

$\widetilde L=L-L_0$ と置けば $\widetilde L_0=0$ で、$\widetilde L$ と $\widetilde L^2$ は local martingale です。

localizing sequence $(\tau_n)$ を、$|\widetilde L|$ も $\widetilde L^2$ も bounded になるようさらに止めて取ります。すると各 $t$ で

$$
E[(\widetilde L_{t\wedge\tau_n})^2]
=
E[(\widetilde L_0)^2]
=
0.
$$

従って

$$
\widetilde L_{t\wedge\tau_n}=0
$$

almost surely。$\tau_n\uparrow\infty$ と連続性から $\widetilde L_t=0$ です。
<!-- proof-end -->

この補題により bracket の特徴付けから一意性も出ます。もし increasing continuous process $A,C$ がともに $M^2-A$、$M^2-C$ を local martingale にするなら

$$
A-C
$$

は local martingale かつ finite variation です。従って定数で、$A_0=C_0=0$ なら $A=C$ です。

---

## 8. covariation は polarization で作る

<a id="def-sto5-covariation"></a>

<!-- formal-statement-start -->
> **定義（covariation）**  
> continuous local martingales $M,N$ に対し

$$
[M,N]
=
\frac14\left([M+N]-[M-N]\right)
$$

> を **covariation** または quadratic covariation という。
<!-- formal-statement-end -->

これは内積を norm から復元する polarization と同じ形です。

<!-- definition-example-start: def-sto5-covariation -->
### 直接例：$N=cB$ のとき

**定義の確認**

$M=B$、$N=cB$ とすると

$$
[M+N]_t=(1+c)^2t,
\qquad
[M-N]_t=(1-c)^2t.
$$

従って

$$
[B,cB]_t
=
\frac14\{(1+c)^2-(1-c)^2\}t
=
ct.
$$

特に

$$
[B,B]_t=t.
$$
<!-- definition-example-end -->

<a id="prop-sto5-covariation-product"></a>

<!-- formal-statement-start -->
> **命題（covariation と product local martingale）**  
> continuous local martingales $M,N$ に対し、
>
> 1. $[M,N]=[N,M]$,
> 2. $[aM+bN,L]=a[M,L]+b[N,L]$,
> 3. partition 上の cross increment sum

$$
\sum_k
(M_{t_k}-M_{t_{k-1}})
(N_{t_k}-N_{t_{k-1}})
$$

> は $[M,N]$ へ ucp 収束し、
> 4.

$$
MN-[M,N]
$$

> は continuous local martingale である。
<!-- formal-statement-end -->

<!-- proof-start -->
### 証明

恒等式

$$
4xy=(x+y)^2-(x-y)^2
$$

を各 increment に適用すると

$$
4\sum_k\Delta_kM\Delta_kN
=
Q^\pi(M+N)-Q^\pi(M-N).
$$

[continuous local martingale の quadratic variation theorem](#thm-sto5-local-martingale-qv) で右辺は ucp で

$$
[M+N]-[M-N]
$$

へ収束するため、cross sum は $[M,N]$ へ収束します。

対称性・双線形性は polarization と quadratic variation の二次性から従います。

最後に

$$
(M+N)^2-[M+N],
\quad
M^2-[M],
\quad
N^2-[N]
$$

はいずれも local martingale です。最初から後二つを引くと

$$
2MN-\{[M+N]-[M]-[N]\}
$$

が local martingale です。

$$
[M+N]-[M]-[N]
=
2[M,N]
$$

なので

$$
MN-[M,N]
$$

も local martingale です。
<!-- proof-end -->

---

## 9. continuous semimartingale

<a id="def-sto5-continuous-semimartingale"></a>

<!-- formal-statement-start -->
> **定義（continuous semimartingale）**  
> continuous adapted process $X$ が **continuous semimartingale** であるとは

$$
X_t=M_t+A_t
$$

> と表せ、$M$ が continuous local martingale、$A$ が continuous finite-variation process であることをいう。
>
> 分解を正規化するときは

$$
M_0=X_0,
\qquad
A_0=0
$$

> とする。
<!-- formal-statement-end -->

<!-- definition-example-start: def-sto5-continuous-semimartingale -->
### 直接例：Brownian motion + drift

**定義の確認**

$B$ を Brown 運動、

$$
A_t=\int_0^t b_s\,ds
$$

を continuous finite-variation process とします。このとき

$$
X_t=B_t+A_t
$$

は continuous semimartingale です。

noise $B$ と drift $A$ を同じ process の中で分離して扱えることが semimartingale の強みです。
<!-- definition-example-end -->

<a id="prop-sto5-fv-no-qv"></a>

<!-- formal-statement-start -->
> **命題（finite variation part は quadratic variation へ寄与しない）**  
> $X=M+A$ を continuous semimartingale decomposition とする。このとき

$$
[X]=[M].
$$

> さらに continuous local martingale $N$ に対し

$$
[X,N]=[M,N].
$$
<!-- formal-statement-end -->

### 証明の見取り図

$A$ 自身の二乗増分は 0 へ行き、$M$ と $A$ の cross increment も「$M$ の最大増分 × $A$ の total variation」で消えます。

<!-- proof-start -->
### 証明

固定 $T$ で

$$
Q_T^\pi(X)
=
Q_T^\pi(M)
+
2\sum_k\Delta_kM\Delta_kA
+
Q_T^\pi(A).
$$

最後の項は finite variation から 0 へ行きます。

cross term は

$$
\left|
\sum_k\Delta_kM\Delta_kA
\right|
\le
\left(\max_k|\Delta_kM|\right)
\sum_k|\Delta_kA|
\le
\left(\max_k|\Delta_kM|\right)V_T(A).
$$

$M$ は連続なので mesh が 0 へ行けば最大増分は almost surely 0 へ行きます。$V_T(A)<\infty$ なので cross term も almost surely 0 へ行きます。

従って

$$
Q^\pi(X)-Q^\pi(M)\to0
$$

ucp で、$[X]=[M]$ です。

$[X,N]$ も cross increment sum を展開し、$\sum\Delta A\Delta N$ を同じ評価で消せば $[M,N]$ が残ります。
<!-- proof-end -->

<a id="thm-sto5-semimartingale-uniqueness"></a>

<!-- formal-statement-start -->
> **定理（continuous semimartingale 分解の一意性）**  
> 正規化された二つの分解

$$
X=M+A=M'+A',
$$

> で $M,M'$ が continuous local martingale、$A,A'$ が continuous finite variation、かつ
>
> $M_0=M'_0=X_0$, $A_0=A'_0=0$
>
> とする。このとき

$$
M=M',
\qquad
A=A'
$$

> up to indistinguishability.
<!-- formal-statement-end -->

<!-- proof-start -->
### 証明

等式を移項すると

$$
M-M'=A'-A.
$$

左辺は continuous local martingale、右辺は continuous finite variation です。

従って共通の process は [finite variation local martingale は定数](#lem-sto5-fv-local-martingale-constant) という補題から定数です。初期値は

$$
(M_0-M'_0)=0
$$

なのでその定数は 0。従って $M=M'$、さらに $A=A'$ です。
<!-- proof-end -->

この一意性により「quadratic variation は semimartingale の noise part だけを見る」という言い方が分解の選び方に依存しません。

---

## 10. Brownian 標本路は finite variation ではない

<a id="cor-sto5-brownian-infinite-variation"></a>

<!-- formal-statement-start -->
> **系（Brownian 標本路は有限変動ではない）**  
> 任意の $T>0$ に対し、standard Brownian motion の標本路は almost surely $[0,T]$ 上 finite variation ではない。
<!-- formal-statement-end -->

<!-- proof-start -->
### 証明

dyadic partition $\pi_n$ を取り、

$$
Q_n=Q_T^{\pi_n}(B)
$$

と置きます。[Brown 運動の quadratic variation](#thm-sto5-brownian-qv) から

$$
Q_n\to T
$$

in probability です。従って subsequence $(n_j)$ を選べば

$$
Q_{n_j}\to T
$$

almost surely とできます。

一方、event

$$
E=\{V_T(B)<\infty\}
$$

上では、[finite-variation process の quadratic variation は 0](#prop-sto5-finite-variation-zero-qv) の pathwise estimate により、mesh が 0 へ行く任意の partition 列について

$$
Q_n\to0
$$

です。従って $E$ 上では同じ subsequence $Q_{n_j}$ が 0 と $T>0$ の両方へ収束することになります。

これは $Q_{n_j}\to T$ が成り立つ probability-one event 上では不可能なので

$$
P(E)=0.
$$

従って Brownian 標本路は almost surely $[0,T]$ 上 finite variation ではありません。
<!-- proof-end -->

連続なのに finite variation ではない。ここが通常の Riemann--Stieltjes calculus だけでは Brownian motion を扱えない理由です。

---

## 11. Lévy characterization：bracket が時間なら Brown 運動

quadratic variation は Brown 運動の結果であるだけでなく、Brown 運動を特徴付けます。

<a id="thm-sto5-levy-characterization"></a>

<!-- formal-statement-start -->
> **定理（Lévy characterization of Brownian motion）**  
> usual conditions を満たす filtration $(\mathcal F_t)$ 上で、$M$ を continuous local martingale とする。
>
> 仮定

$$
M_0=0,
\qquad
[M]_t=t
\quad(t\ge0)
$$

> が成り立つなら、$M$ は $(\mathcal F_t)$ に関する standard Brownian motion である。
<!-- formal-statement-end -->

### 証明の見取り図

目標は increment の conditional characteristic function を求めることです。

$$
E\left[
e^{i\theta(M_t-M_s)}
\mid\mathcal F_s
\right]
=
e^{-\theta^2(t-s)/2}
$$

を示せれば、右辺は $N(0,t-s)$ の characteristic function で、しかも過去情報に依存しません。従って increment は Gaussian かつ $\mathcal F_s$ と独立です。

この式を出すため、二次 Taylor 展開を細分割上で足します。一次項は martingale difference なので conditional expectation で消え、二次項だけが quadratic variation

$$
[M]_t-[M]_s=t-s
$$

を残します。これが Itô formula の最小原型です。

<!-- proof-start -->
### 証明

$\theta\in\mathbb R$ を固定します。local martingale を直接 bounded martingale と呼び替えるのではなく、停止後の bracket も同時に追います。

#### Step 1：bounded martingale へ localization する

元の localizing sequence と exit time を minimum で合わせ、

$$
\sigma_n
=
\rho_n
\wedge
\inf\{t\ge0:|M_t|\ge n\}
\wedge n
$$

と取ります。ここで $(\rho_n)$ は $M^{\rho_n}$ を真の martingale にする localizing sequence です。[bounded stopping theorem](#thm-sto5-bounded-optional-sampling) により $M^{\sigma_n}$ も bounded martingale です。

quadratic variation の stopping property と仮定 $[M]_t=t$ から

$$
[M^{\sigma_n}]_t
=
[M]_{t\wedge\sigma_n}
=
t\wedge\sigma_n.
$$

ここで

$$
A_t^{(n)}=t\wedge\sigma_n,
\qquad
X_t^{(n)}=M_{t\wedge\sigma_n}
$$

と書きます。

#### Step 2：停止した exponential process を作る

$$
F(a,x)
=
\exp\left(
i\theta x+\frac12\theta^2a
\right)
$$

と置き、

$$
Z_t^{(n)}
=
F(A_t^{(n)},X_t^{(n)})
$$

を考えます。$0\le t\le T$ なら

$$
|Z_t^{(n)}|
=
\exp\left(\frac12\theta^2A_t^{(n)}\right)
\le
\exp\left(\frac12\theta^2T\right),
$$

なので $Z^{(n)}$ は一様に bounded です。

$0\le s<t\le T$ を deterministic partition

$$
s=t_0<t_1<\cdots<t_m=t
$$

で細分し、

$$
\Delta_kX=X_{t_k}^{(n)}-X_{t_{k-1}}^{(n)},
\qquad
\Delta_kA=A_{t_k}^{(n)}-A_{t_{k-1}}^{(n)}
$$

と書きます。

二変数 Taylor 展開を各区間へ適用すると

$$
\begin{aligned}
\Delta_kF
&=
F_a(A_{t_{k-1}}^{(n)},X_{t_{k-1}}^{(n)})\Delta_kA\\
&\quad+
F_x(A_{t_{k-1}}^{(n)},X_{t_{k-1}}^{(n)})\Delta_kX\\
&\quad+
\frac12
F_{xx}(A_{t_{k-1}}^{(n)},X_{t_{k-1}}^{(n)})
(\Delta_kX)^2
+r_k.
\end{aligned}
$$

ここで

$$
F_a=\frac12\theta^2F,
\qquad
F_{xx}=-\theta^2F,
$$

したがって

$$
F_a+\frac12F_{xx}=0.
$$

全区間を足すと

$$
\begin{aligned}
Z_t^{(n)}-Z_s^{(n)}
&=
\sum_kF_x(A_{t_{k-1}}^{(n)},X_{t_{k-1}}^{(n)})\Delta_kX\\
&\quad+
\frac12
\sum_kF_{xx}(A_{t_{k-1}}^{(n)},X_{t_{k-1}}^{(n)})
\{(\Delta_kX)^2-\Delta_kA\}\\
&\quad+
\sum_kr_k.
\end{aligned}
$$

第一和の係数は $\mathcal F_{t_{k-1}}$-measurable で bounded です。$X^{(n)}$ は martingale なので、任意の $C\in\mathcal F_s$ に対し

$$
E\left[
1_C
\sum_kF_x(\cdots)\Delta_kX
\right]=0.
$$

一方、

$$
[X^{(n)}]=A^{(n)}
$$

なので [continuous local martingale の quadratic variation theorem](#thm-sto5-local-martingale-qv) により、各 coarse block $[u,v]$ で

$$
\sum_{u<t_k\le v}(\Delta_kX)^2
\longrightarrow
A_v^{(n)}-A_u^{(n)}
$$

in probability です。係数 $F_{xx}$ は $[0,T]\times[-n,n]$ 上一様連続かつ bounded なので、時間区間を先に有限個の coarse blocks へ分け、各 block の左端で係数を固定して上の収束を使い、その後 coarse mesh を 0 へ送ることで

$$
\sum_kF_{xx}(\cdots)
\{(\Delta_kX)^2-\Delta_kA\}
\to0
$$

in probability を得ます。

Taylor remainder についても、$F$ の二階導関数の一様連続性と $X^{(n)},A^{(n)}$ の連続性から

$$
\left|\sum_kr_k\right|
\le
\eta_\pi
\left(
\sum_k(\Delta_kX)^2+A_T^{(n)}
\right),
$$

ここで $\eta_\pi\to0$ in probability です。括弧内は quadratic variation convergence により bounded in probability なので、remainder は 0 へ行きます。

ここで「in probability だから期待値へそのまま移す」とはしません。$L^1$ 制御を確認します。

$X^{(n)}$ は bounded で $A_T^{(n)}\le T$ です。また

$$
(X_t^{(n)})^2-A_t^{(n)}
$$

は [continuous local martingale の quadratic variation theorem](#thm-sto5-local-martingale-qv) により local martingale で、$[0,T]$ 上 bounded なので真の martingale です。

従って deterministic partition $u=t_0<\cdots<t_m=v$ に対して martingale increments の直交性を使うと

$$
\begin{aligned}
E\left[
\sum_{k=1}^m(\Delta_kX)^2
\right]
&=
E[(X_v^{(n)})^2-(X_u^{(n)})^2]\\
&=
E[A_v^{(n)}-A_u^{(n)}].
\end{aligned}
$$

一方、[continuous local martingale の quadratic variation theorem](#thm-sto5-local-martingale-qv) から左辺の random sum 自体は $A_v^{(n)}-A_u^{(n)}$ へ in probability で収束します。両者は非負で期待値も極限の期待値へ一致しているので、この収束は $L^1$ convergence です。

したがって coarse block ごとの二次変分誤差は $L^1$ でも 0 へ行きます。$F_{xx}$ は bounded なので、先ほどの finite-block approximation をそのまま $L^1$ で行えて

$$
E\left|
\sum_kF_{xx}(\cdots)
\{(\Delta_kX)^2-\Delta_kA\}
\right|
\to0.
$$

さらに full interval の realized quadratic variation sum は bounded random variable $A_t^{(n)}-A_s^{(n)}\le T$ へ $L^1$ 収束するので、一様可積分です。Taylor remainder の評価

$$
\left|\sum_kr_k\right|
\le
\eta_\pi
\left(
\sum_k(\Delta_kX)^2+A_T^{(n)}
\right)
$$

で $\eta_\pi\to0$ in probability、かつ $\eta_\pi$ は compact set 上の導関数の modulus of continuity で一様に bounded です。従って右辺も $L^1$ で 0 へ行きます。

以上を各 partition の Taylor identity の期待値へ入れます。第一和の期待値は各段階でちょうど 0、残り二項は $L^1$ で 0 へ行くため

$$
E[1_C Z_t^{(n)}]
=
E[1_C Z_s^{(n)}]
$$

が全ての $C\in\mathcal F_s$ で成り立ち、$Z^{(n)}$ は martingale です。

#### Step 3：localization を外す

$\sigma_n\uparrow\infty$ almost surely なので、各固定 $t$ について

$$
A_t^{(n)}=t\wedge\sigma_n\to t,
\qquad
X_t^{(n)}=M_{t\wedge\sigma_n}\to M_t
$$

almost surely です。従って

$$
Z_t^{(n)}
\to
Z_t
:=
\exp\left(
i\theta M_t+\frac12\theta^2t
\right)
$$

almost surely。

また $0\le t\le T$ では

$$
|Z_t^{(n)}|
\le
e^{\theta^2T/2},
$$

なので dominated convergence により martingale identity を極限へ移せます。従って $Z$ も martingale です。

よって $0\le s<t$ に対し

$$
E\left[
e^{i\theta M_t+\theta^2t/2}
\mid\mathcal F_s
\right]
=
e^{i\theta M_s+\theta^2s/2}.
$$

整理すると

$$
E\left[
e^{i\theta(M_t-M_s)}
\mid\mathcal F_s
\right]
=
e^{-\theta^2(t-s)/2}.
$$

右辺は deterministic で、$N(0,t-s)$ の characteristic function です。全ての $\theta$ についてこの identity が成り立つので、characteristic function の一意性と monotone class argument により

$$
M_t-M_s\sim N(0,t-s)
$$

かつ $M_t-M_s$ は $\mathcal F_s$ と独立です。

$M_0=0$、標本路の連続性は仮定済みです。従って $M$ は $(\mathcal F_t)$ に関する standard Brownian motion です。
<!-- proof-end -->

Lévy characterization は重要です。「Brown 運動らしい increment law」を最初から仮定せず、**martingale 性 + 二次変分が時間**だけから Brown 運動を回収できます。

---

## 12. なぜ通常の連鎖律が壊れるのか

smooth function $x$ なら Taylor 展開

$$
f(x+\Delta x)-f(x)
=
f'(x)\Delta x
+
\frac12f''(x)(\Delta x)^2
+
o((\Delta x)^2)
$$

を足したとき、finite variation なら

$$
\sum(\Delta x)^2\to0
$$

なので二階項は消えます。

Brown 運動では

$$
\sum(\Delta B)^2\to t.
$$

従って二階項は消えません。

$$
\boxed{
\text{smooth calculus: }(dx)^2=0
\qquad
\text{Brownian calculus: }(dB)^2=dt
}
$$

この差が STO7 の Itô formula の補正項

$$
\frac12f''(X_t)\,d[X]_t
$$

を生みます。

ただし、まだ $\int H\,dM$ は定義していません。次の STO6 で simple predictable integrand から stochastic integral を構成し、そこで初めてこの differential notation を積分の等式へ変換します。

---

# 13. 演習

## STO5-A01 Brown 運動を exit time で localization する

- Level: A
- 目安時間: 12分

Brown 運動 $B$ に対し

$$
\tau_n
=
\inf\{t\ge0:|B_t|\ge n\}\wedge n
$$

とする。

1. $\tau_n$ が stopping time であることを説明せよ。
2. $B^{\tau_n}$ が bounded continuous martingale であることを示せ。
3. $\tau_n\uparrow\infty$ almost surely を説明せよ。

<!-- solution-start -->
### 詳細解答

1. $B$ は continuous adapted process です。closed set $(-\infty,-n]\cup[n,\infty)$ への hitting time は STO1 の closed-set hitting-time theorem から stopping time です。定数 $n$ との minimum も stopping time です。

2. $B$ は continuous martingale です。[bounded stopping theorem](#thm-sto5-bounded-optional-sampling) を $\tau_n$ に適用すると

$$
E[B_{t\wedge\tau_n}\mid\mathcal F_s]
=
B_{s\wedge\tau_n}
$$

を得ます。

また definition から

$$
|B_{t\wedge\tau_n}|\le n
$$

です。標本路の連続性も停止で保たれます。

3. 各標本路は compact interval $[0,T]$ 上 bounded です。従ってほとんど全ての標本路について、十分大きい $n$ では $n>T$ かつ

$$
\sup_{0\le t\le T}|B_t|<n.
$$

そのとき $\tau_n>T$ です。任意の $T$ で最終的に $\tau_n>T$ になるため、$\tau_n\uparrow\infty$ です。
<!-- solution-end -->

## STO5-A02 finite variation の quadratic variation

- Level: A
- 目安時間: 10分

continuous finite-variation function $a:[0,T]\to\mathbb R$ と分割 $\pi$ に対し

$$
\sum_k(\Delta_ka)^2
\le
\left(\max_k|\Delta_ka|\right)V_T(a)
$$

を示し、mesh が 0 へ行くと二乗和が 0 へ行くことを示せ。

<!-- solution-start -->
### 詳細解答

各 $k$ で

$$
|\Delta_ka|^2
\le
\left(\max_j|\Delta_ja|\right)|\Delta_ka|.
$$

和を取れば

$$
\sum_k|\Delta_ka|^2
\le
\left(\max_j|\Delta_ja|\right)
\sum_k|\Delta_ka|
\le
\left(\max_j|\Delta_ja|\right)V_T(a).
$$

$a$ は compact interval 上 continuous なので一様連続です。従って mesh $\to0$ なら最大増分は 0 へ行きます。$V_T(a)<\infty$ なので積も 0 へ行きます。
<!-- solution-end -->

## STO5-A03 Brownian quadratic variation の平均と分散

- Level: A
- 目安時間: 15分

$[0,T]$ の任意の deterministic partition $\pi$ に対し

$$
Q_T^\pi(B)=\sum_k(\Delta_kB)^2
$$

と置く。

$$
E[Q_T^\pi(B)]=T,
\qquad
\operatorname{Var}(Q_T^\pi(B))
\le2T|\pi|
$$

を導け。

<!-- solution-start -->
### 詳細解答

各 increment は独立で

$$
\Delta_kB\sim N(0,\Delta_kt).
$$

従って

$$
E[(\Delta_kB)^2]=\Delta_kt
$$

なので

$$
E[Q_T^\pi(B)]
=
\sum_k\Delta_kt=T.
$$

また Gaussian fourth moment から

$$
\operatorname{Var}((\Delta_kB)^2)
=
2(\Delta_kt)^2.
$$

独立性で分散は加算されるため

$$
\operatorname{Var}(Q_T^\pi(B))
=
2\sum_k(\Delta_kt)^2
\le
2|\pi|\sum_k\Delta_kt
=
2T|\pi|.
$$
<!-- solution-end -->

## STO5-A04 covariation の polarization

- Level: A
- 目安時間: 12分

Brown 運動 $B$ と定数 $a,b\in\mathbb R$ に対し

$$
M=aB,
\qquad
N=bB
$$

とする。$[M]$、$[N]$、$[M,N]$ を求めよ。

<!-- solution-start -->
### 詳細解答

quadratic variation の二次性から

$$
[M]_t=a^2[B]_t=a^2t,
\qquad
[N]_t=b^2t.
$$

また

$$
[M+N]_t=(a+b)^2t,
\qquad
[M-N]_t=(a-b)^2t.
$$

従って polarization から

$$
\begin{aligned}
[M,N]_t
&=
\frac14\{(a+b)^2-(a-b)^2\}t\\
&=
ab\,t.
\end{aligned}
$$
<!-- solution-end -->

## STO5-B01 finite variation local martingale は定数

- Level: B
- 目安時間: 20分

$L_0=0$ とし、$L$ が continuous local martingale かつ finite variation であるとする。$L\equiv0$ を証明せよ。

<!-- solution-start -->
### 詳細解答

finite variation から

$$
[L]\equiv0.
$$

[continuous local martingale の quadratic variation theorem](#thm-sto5-local-martingale-qv) により

$$
L^2-[L]=L^2
$$

も local martingale です。

$L$ と $L^2$ を同時に bounded にする localizing sequence $(\tau_n)$ を取ります。すると $L^{\tau_n}$ と $(L^{\tau_n})^2$ は真の martingale なので

$$
E[(L_{t\wedge\tau_n})^2]
=
E[L_0^2]
=
0.
$$

非負確率変数の期待値が 0 だから

$$
L_{t\wedge\tau_n}=0
$$

almost surely。$n\to\infty$ として $L_t=0$。有理時刻で同時に成立させ、標本路の連続性を使えば全ての $t$ で $L_t=0$ です。
<!-- solution-end -->

## STO5-B02 drifted Brownian motion の quadratic variation

- Level: B
- 目安時間: 18分

$$
X_t=B_t+\int_0^t b_s\,ds
$$

とする。各 $T$ で $\int_0^T|b_s|ds<\infty$ almost surely と仮定する。

1. $X$ が continuous semimartingale であることを示せ。
2. $[X]_t=t$ を示せ。
3. なぜ drift の大きさが quadratic variation に現れないか説明せよ。

<!-- solution-start -->
### 詳細解答

1. $B$ は continuous local martingale です。

$$
A_t=\int_0^tb_s\,ds
$$

は continuous で、

$$
V_T(A)
\le
\int_0^T|b_s|ds<\infty.
$$

従って $A$ は continuous finite variation で、$X=B+A$ は continuous semimartingale です。

2. finite variation part は quadratic variation へ寄与しないので

$$
[X]=[B].
$$

[Brown 運動の quadratic variation](#thm-sto5-brownian-qv) から

$$
[X]_t=t.
$$

3. 細分割上で drift increment は典型的に時間幅と同じ一次の大きさです。その二乗を足すと

$$
\sum O((\Delta t)^2)
$$

となり 0 へ消えます。Brownian increment は $O(\!\sqrt{\Delta t})$ なので二乗が $O(\Delta t)$ となり、和が有限に残ります。
<!-- solution-end -->

## STO5-B03 semimartingale 分解の一意性

- Level: B
- 目安時間: 20分

正規化された二つの分解

$$
X=M+A=M'+A'
$$

があるとする。$M,M'$ は continuous local martingale、$A,A'$ は continuous finite variation、$A_0=A'_0=0$ とする。

分解が一意であることを証明し、この一意性が $[X]=[M]$ という記述を well-defined にする理由を説明せよ。

<!-- solution-start -->
### 詳細解答

移項して

$$
L:=M-M'=A'-A
$$

と置きます。

$M-M'$ は continuous local martingale の差なので continuous local martingale です。一方 $A'-A$ は continuous finite variation です。

従って $L$ は local martingale かつ finite variation なので定数です。初期値は

$$
L_0=M_0-M'_0=0
$$

だから $L\equiv0$。従って $M=M'$ で、元の等式から $A=A'$ です。

したがって $X$ の local martingale part は正規化後一意です。よって

$$
[X]:=[M]
$$

と書いても分解の選択に依存しません。
<!-- solution-end -->

## STO5-C01 Lévy characterization を再構成する

- Level: C
- 目安時間: 35分

$M$ を continuous local martingale とし

$$
M_0=0,
\qquad
[M]_t=t
$$

とする。

1. $F(t,x)=\exp(i\theta x+\theta^2t/2)$ が

$$
F_t+\frac12F_{xx}=0
$$

を満たすことを確認せよ。
2. 細分割上の二次 Taylor 展開で一次項が conditional expectation により消え、二次項が $[M]_t-[M]_s=t-s$ と相殺する理由を説明せよ。
3.

$$
E[e^{i\theta(M_t-M_s)}\mid\mathcal F_s]
=
e^{-\theta^2(t-s)/2}
$$

を導き、$M$ が Brown 運動であることを結論せよ。

<!-- solution-start -->
### 詳細解答

1. 微分すると

$$
F_t=\frac12\theta^2F,
\qquad
F_x=i\theta F,
\qquad
F_{xx}=-\theta^2F.
$$

従って

$$
F_t+\frac12F_{xx}=0.
$$

2. ここで $M$ は local martingale なので、いきなり increment の conditional mean を 0 としてはいけません。まず localizing sequence $(\rho_n)$ と exit time を合わせて

$$
\sigma_n
=
\rho_n
\wedge
\inf\{r\ge0:|M_r|\ge n\}
\wedge n
$$

と置き、

$$
X_r=M_{r\wedge\sigma_n},
\qquad
A_r=r\wedge\sigma_n
$$

とします。すると $X$ は bounded martingale で、

$$
[X]_r=A_r
$$

です。

$F(a,x)=\exp(i\theta x+\theta^2a/2)$ と見て、$[s,t]$ の deterministic partition 上で Taylor 展開すると

$$
\begin{aligned}
F(A_t,X_t)-F(A_s,X_s)
&=
\sum_kF_x(A_{t_{k-1}},X_{t_{k-1}})\Delta_kX\\
&\quad+
\frac12
\sum_kF_{xx}(A_{t_{k-1}},X_{t_{k-1}})
\{(\Delta_kX)^2-\Delta_kA\}
+
R_\pi.
\end{aligned}
$$

第一和の係数は $\mathcal F_{t_{k-1}}$-measurable で bounded なので、conditional expectation では各 martingale increment が消えます。

また

$$
\sum_k(\Delta_kX)^2
\to
A_t-A_s
$$

は quadratic variation の定義です。係数 $F_{xx}$ を有限個の coarse blocks 上でほぼ一定に固定すれば、weighted quadratic-variation error も 0 へ行きます。

remainder $R_\pi$ は、最大 increment が 0 へ行き、二乗増分和が有限極限を持つことから 0 へ行きます。bounded localization の下では本文と同じ $L^1$ argument で期待値へ極限を移せます。

したがって

$$
Z_r^{(n)}
=
\exp\left(
i\theta M_{r\wedge\sigma_n}
+
\frac12\theta^2(r\wedge\sigma_n)
\right)
$$

は martingale です。

3. $\sigma_n\uparrow\infty$ almost surely で、固定 $T$ 上

$$
|Z_r^{(n)}|
\le e^{\theta^2T/2}
$$

です。dominated convergence で localization を外すと

$$
Z_r
=
\exp\left(
i\theta M_r+\frac12\theta^2r
\right)
$$

も martingale です。

従って $0\le s<t$ について

$$
E\left[
e^{i\theta M_t+\theta^2t/2}
\mid\mathcal F_s
\right]
=
e^{i\theta M_s+\theta^2s/2}.
$$

整理して

$$
E[e^{i\theta(M_t-M_s)}\mid\mathcal F_s]
=
e^{-\theta^2(t-s)/2}.
$$

右辺は $N(0,t-s)$ の characteristic function で、$\mathcal F_s$ に依存しません。従って $M_t-M_s$ は $N(0,t-s)$ に従い、$\mathcal F_s$ と独立です。

$M_0=0$ と標本路の連続性も仮定されているので、$M$ は standard Brownian motion です。
<!-- solution-end -->

---

## 章末チェック

- continuous martingale と local martingale の違いを stopping で説明できる。
- ucp convergence が固定時刻収束より強い process-level の収束であると説明できる。
- finite variation function の quadratic variation が 0 になる評価を書ける。
- Brownian quadratic variation $[B]_t=t$ を一般分割で $L^2$ 計算できる。
- continuous local martingale の quadratic variation theorem で、技術的入力と本章内で閉じた帰結を区別できる。
- polarization から covariation を構成し、$MN-[M,N]$ の local martingale 性を導ける。
- semimartingale の finite variation part が quadratic variation から消えることを証明できる。
- local martingale かつ finite variation なら定数、という事実から分解一意性を示せる。
- Lévy characterization の conditional characteristic function 証明を再構成できる。
- $(dB)^2=dt$ が differential の代数則ではなく quadratic variation の極限を表す記憶法だと説明できる。
