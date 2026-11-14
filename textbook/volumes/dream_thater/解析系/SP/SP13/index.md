# SP13 CTMC の Kolmogorov 方程式・定常性・可逆性

[SP12 の Q 行列と一様化](../SP12/index.md#thm-sp12-uniformization)により、各状態で「どれだけ待って、どこへ跳ぶか」から連続時間 Markov 連鎖（CTMC）を作れるようになりました。しかし、その構成だけでは「時刻 $t$ にどの状態にいる確率がいくらか」、さらに「長く動かしたとき分布が変わらない状態は何か」をまだ計算できません。

この講義は **有限状態集合 $S$** 上で、遷移確率行列 $P_t$ の時間発展、定常分布、時間を逆に見たときの釣合いをつなぎます。可算無限状態について形式的な和と微分を無条件に交換しないため、有限状態という仮定を各定理に残します。

前提： [SP12 の短時間遷移](../SP12/index.md#prop-sp12-short-time)、[STO13 の Kolmogorov 方程式](../../STO/STO13/index.md#thm-sto13-kolmogorov-equations)、[SP5 の有限連鎖収束定理](../SP5/index.md#thm-sp5-finite-convergence)を必要な位置で用います。確率ベクトルは **行ベクトル** とし、行列の行 $i$ が出発状態、列 $j$ が到着状態です。

## 1. 短時間の率から時刻 $t$ の遷移行列へ

状態集合を $S=\{0,\ldots,m-1\}$、有限状態 Q 行列を $Q=(q_{ij})_{i,j\in S}$ とします。[有限状態 Q-行列と連続時間マルコフ連鎖の定義](../../STO/STO13/index.md#def-sto13-ctmc-qmatrix)から、$i\ne j$ では $q_{ij}\ge0$、$q_{ii}=-\sum_{j\ne i}q_{ij}$ です。初期状態を $i$ とした確率を $P_i$ と表し、

$$
P_t(i,j):=P_i(X_t=j),\qquad P_t=(P_t(i,j))_{i,j\in S}\quad(t\ge0)
$$

と置きます。$P_t$ の各成分は非負、各行和は $1$、$P_0=I$ です。$\mu$ を初期分布の行ベクトルとすれば、時刻 $t$ の分布は $\mu P_t$ です。

Markov 性と時刻の一様性から、中間時刻 $s$ で状態 $k$ を分けると

$$
P_{s+t}(i,j)=\sum_{k\in S}P_s(i,k)P_t(k,j),
\qquad P_{s+t}=P_sP_t.
$$

この有限和の等式は、時間を二つに分けても同じ遷移確率が得られること（半群則）を表しています。有限和なので、ここで和と極限を交換する問題はありません。

[SP12 の短時間遷移の命題](../SP12/index.md#prop-sp12-short-time)を各成分に適用すれば、

$$
P_h=I+hQ+O(h^2)\quad(h\downarrow0).
$$

ここで $O(h^2)$ は、有限個の成分それぞれの絶対値を共通定数で $Ch^2$ 以下に抑えられる、という意味です。

### 左から進めるか、右から進めるか

$P_{t+h}=P_hP_t$ と書くと、変化率は出発直後の状態 $i$ でまず跳ぶ率に依存します。一方 $P_{t+h}=P_tP_h$ と書くと、最後の短い時間で状態 $j$ へ流入する率に依存します。それぞれ **後退方程式**、**前進方程式** です。両者の定理と完全証明は既習の [有限状態 CTMC の Kolmogorov 方程式](../../STO/STO13/index.md#thm-sto13-kolmogorov-equations)にあります。

$$
\boxed{P'_t=QP_t\quad\text{（後退）}},\qquad
\boxed{P'_t=P_tQ\quad\text{（前進）}}.
$$

導出で使う具体的な代入は、後退なら

$$
\frac{P_{t+h}-P_t}{h}
=\frac{P_h-I}{h}P_t
\longrightarrow QP_t
$$

であり、前進なら

$$
\frac{P_{t+h}-P_t}{h}
=P_t\frac{P_h-I}{h}
\longrightarrow P_tQ
$$

です。有限状態では右辺の行列積も有限和で、各成分の極限を取り出せます。$t=0$ では右微分、$t>0$ では通常の微分です。

### 行列指数はなぜ確率を表すのか

ここで使う[行列指数の定義と基本性質](../../ODE/ODE3/index.md#def-ode3-matrix-exponential)は、正方行列 $A$ の指数関数を冪級数 $e^{tA}=\sum_{n\ge0}t^nA^n/n!$ で定めるものです。以下では、これを CTMC の跳躍時計からも直接導きます。

[SP12 の一様化定理](../SP12/index.md#thm-sp12-uniformization)で $L>\max_i(-q_{ii})$ を選び、確率行列 $R=I+Q/L$ と率 $L$ の Poisson 時計 $N_t$ を作りました。従って

$$
P_t=\sum_{n=0}^{\infty}P(N_t=n)R^n
=e^{-Lt}\sum_{n=0}^{\infty}\frac{(Lt)^n}{n!}R^n.
$$

$R^n$ は $n$ 回の時計の遷移行列であり、$n=0$ では $R^0=I$ です。各項はすべての成分が非負の行列で、Poisson 確率の和が $1$ なので、級数は確かに行和 $1$ の遷移行列です。さらに $LR=LI+Q$ で $I$ と $Q$ が可換なため、

$$
\begin{aligned}
P_t
&=e^{-Lt}\sum_{n=0}^{\infty}\frac{t^n(LI+Q)^n}{n!}\\
&=e^{-Lt}\,e^{t(LI+Q)}
=e^{tQ},\qquad
e^{tQ}:=\sum_{n=0}^{\infty}\frac{t^nQ^n}{n!}.
\end{aligned}
$$

最後の等式は可換な有限行列の指数級数の積について、絶対収束する二重級数を次数ごとにまとめ、二項定理を使ったものです。各 $T<\infty$ に対し、$0\le t\le T$ で項のノルムは $T^n\|Q\|^n/n!$ 以下なので、[一様収束と微分交換の条件](../../../基礎科目/RA/RA5/index.md#thm-ra5-derivative)を確認して項別微分もできます。このように行列指数は **単なる記号** ではなく、一様化で作った確率行列そのものです。

## 2. 二状態系を最後まで解く

故障と修理の二状態を $S=\{0,1\}$ とし、$0\to1$ の率を $2$、$1\to0$ の率を $3$ とします。

$$
Q=\begin{pmatrix}-2&2\\3&-3\end{pmatrix}.
$$

非対角成分は非負、行和は $-2+2=0$、$3-3=0$ なので Q 行列です。$X_0=0$ として $u(t):=P_t(0,0)$ を求めます。**前進方程式** の $(0,0)$ 成分は

$$
\begin{aligned}
u'(t)&=P_t(0,0)q_{00}+P_t(0,1)q_{10}\\
&=-2u(t)+3(1-u(t))=3-5u(t),\qquad u(0)=1.
\end{aligned}
$$

$u(t)-3/5$ を未知関数と見ると、その時間微分は $-5(u(t)-3/5)$ です。従って

$$
u(t)-\frac35=\left(u(0)-\frac35\right)e^{-5t}
=\frac25e^{-5t}.
$$

行和が $1$ なので $P_t(0,1)=1-u(t)$。初期状態 $1$ についても $v(t):=P_t(1,0)$ が $v'=3-5v$、$v(0)=0$ を満たします。よって

$$
P_t=
\begin{pmatrix}
\frac35+\frac25e^{-5t}&\frac25(1-e^{-5t})\\
\frac35(1-e^{-5t})&\frac25+\frac35e^{-5t}
\end{pmatrix}.
$$

$t=0$ では $P_0=I$、全ての $t\ge0$ で各行和が $1$、$t\to\infty$ では両行が $(3/5,2/5)$ に近づくことを直接確認できます。収束の速さ $5$ は二つの離脱率の和 $2+3$ です。

## 3. 分布が変わらない条件を Q だけで判定する

ある分布から出発して、どれだけ時間が経っても同じ分布なら、過程はその分布の下で **定常** です。時刻ごとの分布が同じということは、有限状態の時間一様 Markov 性の下では、任意の有限個の時刻における同時分布が時間の平行移動でも変わらないことにつながります。

<a id="def-sp13-stationary"></a>

<!-- formal-statement-start -->
> **定義（CTMC の定常分布）**  
> 有限状態 CTMC の遷移行列を $(P_t)_{t\ge0}$ とする。確率行ベクトル $\pi=(\pi_i)_{i\in S}$、すなわち $\pi_i\ge0$ かつ $\sum_i\pi_i=1$ が、全ての $t\ge0$ で

$$
\pi P_t=\pi
$$

> を満たすとき、$\pi$ を **CTMC の定常分布**（不変確率分布）と呼ぶ。
<!-- formal-statement-end -->

これは [帰還 cycle から得られる離散時間の不変測度](../../STO/STO2A/index.md#thm-sto2a-cycle-invariant)でも現れた $\pi P=\pi$ を、全ての経過時間に拡張した条件です。分布の行ベクトルに右から $P_t$ を掛けるのは「出発状態 $i$ の質量を到着状態 $j$ へ運ぶ」ためで、$(\pi P_t)_j=\sum_i\pi_iP_t(i,j)$ です。

<a id="thm-sp13-stationarity-criterion"></a>

<!-- formal-statement-start -->
> **定理（有限 CTMC の定常分布の判定）**  
> 空でない有限集合 $S$ 上の Q 行列 $Q$ を持つ CTMC の遷移行列を $P_t=e^{tQ}$ とする。確率行ベクトル $\pi$ が定常分布であることと

$$
\boxed{\pi Q=0}
$$

> は同値である。
<!-- formal-statement-end -->

### 証明の見取り図

全時刻で不変なら $t=0$ の変化率が零です。逆に Q を一回掛けて零なら、Q を何回掛けても零なので指数級数の定数項だけが残ります。

<!-- proof-start -->
### 証明

**必要性。** $\pi P_t=\pi$ が全ての $t\ge0$ で成立するとします。$P_0=I$ と、[Kolmogorov 前進方程式](../../STO/STO13/index.md#thm-sto13-kolmogorov-equations)の $t=0$ における右微分 $P'_0=Q$ を用いると、

$$
0=\lim_{h\downarrow0}\frac{\pi P_h-\pi P_0}{h}
=\pi\lim_{h\downarrow0}\frac{P_h-I}{h}
=\pi Q.
$$

**十分性。** $\pi Q=0$ とします。任意の整数 $n\ge1$ について $\pi Q^n=(\pi Q)Q^{n-1}=0$ です。有限行列の指数級数は絶対収束するので、左から $\pi$ を掛けて項別に計算でき、

$$
\pi P_t=\pi e^{tQ}
=\pi I+\sum_{n=1}^{\infty}\frac{t^n}{n!}\pi Q^n
=\pi.
$$

従って全ての $t\ge0$ で定常です。
<!-- proof-end -->

### 直接例：二状態で確率の「流入と流出」を比べる

第2節の $Q$ に対して $\pi=(a,1-a)$ と置けば

$$
\pi Q=(-2a+3(1-a),\,2a-3(1-a))
=(3-5a,\,5a-3).
$$

二成分とも零となるのは $a=3/5$ のときで、$\pi=(3/5,2/5)$ は非負で和 $1$ です。よって定常分布です。これは第2節で明示的に求めた $P_t$ の両行の極限とも一致します。ただし **「定常である」ことと「全初期分布がそこへ収束する」ことは別の主張** です。

## 4. 流入の総和より強い「一対一の釣合い」

$\pi Q=0$ の $j$ 成分は

$$
(\pi Q)_j
=\sum_{i\ne j}\pi_iq_{ij}-\pi_j\sum_{k\ne j}q_{jk}=0.
$$

左の第1項は状態 $j$ への総流入率、第2項は状態 $j$ からの総流出率です。これらの**総量**は釣り合っていても、状態 $i$ と $j$ の間の往復が一対一で釣り合うとは限りません。

<a id="def-sp13-detailed-balance"></a>

<!-- formal-statement-start -->
> **定義（CTMC の詳細釣合い）**  
> 有限状態 Q 行列 $Q=(q_{ij})$ と確率行ベクトル $\pi$ について、すべての $i,j\in S$ に対し

$$
\boxed{\pi_iq_{ij}=\pi_jq_{ji}}
$$

> が成り立つとき、$(\pi,Q)$ は **CTMC の詳細釣合い** を満たすという。$i=j$ の式は自動的に成り立つ。
<!-- formal-statement-end -->

離散時間での [詳細釣合い](../../STO/STO2A/index.md#def-sto2a-reversibility)と同じ「両方向の確率流が等しい」という考え方ですが、CTMC では一歩の確率 $p(i,j)$ ではなく **単位時間当たりの率** $q_{ij}$ を比較します。

### 直接例：二状態の往復

$\pi=(3/5,2/5)$ と第2節の $Q$ について、唯一の非自明な状態対は $\{0,1\}$ です。

$$
\pi_0q_{01}=\frac35\cdot2=\frac65,\qquad
\pi_1q_{10}=\frac25\cdot3=\frac65.
$$

両方向が等しく、対角の組は自明です。これで定義の全状態対を検査しました。定常分布の確認では総流入を見ましたが、詳細釣合いでは状態対ごとの流れを見ています。

### 時間反転と可逆性

定常分布 $\pi$ の下で時刻 $0$ から $t$ までを見ると、始点が $i$ で終点が $j$ の確率は $\pi_iP_t(i,j)$ です。時間を逆向きにたどるなら、逆方向の確率 $\pi_jP_t(j,i)$ と比較する必要があります。二時刻だけでなく、任意の有限個の観測時刻を逆順にした同時分布まで一致することが可逆性の意味です。有限状態の定常 CTMC では、これを二時刻の式から判定できます。

<a id="thm-sp13-reversibility"></a>

<!-- formal-statement-start -->
> **定理（詳細釣合いと CTMC の可逆性）**  
> 空でない有限状態空間 $S$ 上の Q 行列 $Q$ と確率行ベクトル $\pi$ に対し、$P_t=e^{tQ}$ とする。このとき次は同値である。
>
> 1. 全ての $i,j\in S$ について $\pi_iq_{ij}=\pi_jq_{ji}$ である。
> 2. 全ての $t\ge0$、$i,j\in S$ について $\pi_iP_t(i,j)=\pi_jP_t(j,i)$ である。
>
> これらが成り立つと $\pi$ は定常分布であり、$X_0\sim\pi$ で始めた CTMC の任意の有限個の時刻における同時分布は時間反転に対して不変（可逆）である。$\pi_i>0$ を全状態に仮定する必要はない。
<!-- formal-statement-end -->

### 証明の見取り図

行列 $D=\operatorname{diag}(\pi_0,\ldots,\pi_{m-1})$ を使うと、率の詳細釣合いは $DQ=Q^{\mathsf T}D$ と書けます。この等式を行列の各べき乗へ伝えて、指数級数の各係数の対称性を示します。逆方向は $t=0$ で微分します。

<!-- proof-start -->
### 証明

**(1) から定常性。** 状態 $j$ を固定し、すべての $i$ について詳細釣合いを足すと

$$
\begin{aligned}
(\pi Q)_j
&=\sum_i\pi_iq_{ij}
=\sum_i\pi_jq_{ji}
=\pi_j\sum_iq_{ji}
=0.
\end{aligned}
$$

最後の和は $Q$ の **行 $j$ の和** です。[定常分布の判定](#thm-sp13-stationarity-criterion)より $\pi P_t=\pi$ です。

**(1) から (2)。** $D_{ii}=\pi_i$、$D_{ij}=0$（$i\ne j$）と置きます。行列積の $(i,j)$ 成分は

$$
(DQ)_{ij}=\pi_iq_{ij},\qquad
(Q^{\mathsf T}D)_{ij}=q_{ji}\pi_j.
$$

従って詳細釣合いは $DQ=Q^{\mathsf T}D$ と同値です。右に $Q$ を掛け、等式を繰り返し使う帰納法で

$$
DQ^n=(Q^{\mathsf T})^nD\qquad(n=0,1,2,\ldots)
$$

が従います（$n=0$ は $D=D$、$n$ から $n+1$ は $DQ^{n+1}=(Q^{\mathsf T})^nDQ=(Q^{\mathsf T})^{n+1}D$）。ゆえに、有限行列の指数級数を各項で計算すると

$$
DP_t
=\sum_{n=0}^{\infty}\frac{t^n}{n!}DQ^n
=\sum_{n=0}^{\infty}\frac{t^n}{n!}(Q^{\mathsf T})^nD
=P_t^{\mathsf T}D.
$$

$(i,j)$ 成分を取れば $\pi_iP_t(i,j)=\pi_jP_t(j,i)$ です。$D$ の逆行列は使っていないので、$\pi_i=0$ でも成立します。

**(2) から (1)。** $i\ne j$ に対し、$P_0(i,j)=0$ と [短時間遷移](../SP12/index.md#prop-sp12-short-time) の $\lim_{h\downarrow0}P_h(i,j)/h=q_{ij}$ を使います。(2) を $h>0$ で割って右極限を取ると

$$
\pi_iq_{ij}
=\lim_{h\downarrow0}\frac{\pi_iP_h(i,j)}h
=\lim_{h\downarrow0}\frac{\pi_jP_h(j,i)}h
=\pi_jq_{ji}.
$$

$i=j$ の場合は両辺が一致します。

**有限個の時刻を逆向きにする。** $0=t_0<t_1<\cdots<t_r=T$、状態列 $i_0,\ldots,i_r$ を固定します。定常 CTMC の Markov 性より、$\Delta_k=t_k-t_{k-1}$ として

$$
P_\pi(X_{t_0}=i_0,\ldots,X_{t_r}=i_r)
=\pi_{i_0}\prod_{k=1}^{r}P_{\Delta_k}(i_{k-1},i_k).
$$

各隣接対について (2) を使い、重みを隣へ移すと

$$
\pi_{i_0}\prod_{k=1}^{r}P_{\Delta_k}(i_{k-1},i_k)
=\pi_{i_r}\prod_{k=1}^{r}P_{\Delta_k}(i_k,i_{k-1}).
$$

右辺は時刻 $T-t_r,\ldots,T-t_0$ に逆順の状態を観測する確率です。各重みの移動は等式の掛け算であり、$\pi_{i_k}$ による割り算を使わないため零質量の状態にも有効です。
<!-- proof-end -->

### 定常でも可逆でない三状態の輪

$S=\{0,1,2\}$ とし、時計回りにだけ率 $1$ で動く

$$
Q=\begin{pmatrix}
-1&1&0\\
0&-1&1\\
1&0&-1
\end{pmatrix}
$$

を考えます。非対角成分は非負、各行和は零です。さらに各 **列和も零** なので $\pi=(1/3,1/3,1/3)$ について $(\pi Q)_j=(1/3)\sum_iq_{ij}=0$、すなわち定常です。しかし

$$
\pi_0q_{01}=\frac13,\qquad
\pi_1q_{10}=0
$$

となり、詳細釣合いは破れます。これは「総流入＝総流出」でも、**輪の一方向の流れ** が残るためです。定常性の証明は総量を足して相殺できますが、時間反転の証明で必要な状態対の等式 $DQ=Q^{\mathsf T}D$ は成立しません。

## 5. 定常分布と長時間の収束は別問題

$Q=0$ の二状態 CTMC なら $P_t=I$ で、どの初期分布も定常です。初期分布 $(1,0)$ から始めた過程は $(0,1)$ へ決して近づきません。この例は「$\pi Q=0$ を解いたから任意の初期分布がその $\pi$ へ収束する」という推論の反例です。失われたのは状態間の **既約性** です。

一方、有限状態で状態間が正の率を持つ経路で互いに行き来できる場合（**既約な Q 行列**）、収束まで示せます。

<a id="thm-sp13-irreducible-convergence"></a>

<!-- formal-statement-start -->
> **定理（有限既約 CTMC の収束）**  
> 空でない有限集合 $S$ 上の Q 行列 $Q$ について、任意の $i,j\in S$ に $i$ から $j$ への正の遷移率を持つ有限経路が存在するとする。このとき一意の定常確率分布 $\pi$ が存在し、$\pi_i>0$（全 $i$）である。また任意の初期分布 $\mu$ に対し

$$
\lim_{t\to\infty}\mu P_t=\pi
$$

> が成分ごとに成立する。
<!-- formal-statement-end -->

### 証明の見取り図

[一様化](../SP12/index.md#thm-sp12-uniformization)で $L>\max_iq_i$ を取れば、$R=I+Q/L$ は正の自己ループを持つ離散時間遷移行列です。正率経路は $R$ に残るので既約です。これに [SP5 の有限既約非周期連鎖の収束定理](../SP5/index.md#thm-sp5-finite-convergence)を適用し、Poisson 時計の回数が無限に増える事実を組み合わせます。

<!-- proof-start -->
### 証明

$L>\max_i(-q_{ii})$ を取り $R=I+Q/L$ とします。$L>0$ と選べるので、$R_{ii}=1-q_i/L>0$ が全 $i$ で成り立ちます。また $q_{ij}>0$（$i\ne j$）なら $R_{ij}=q_{ij}/L>0$ です。従って $Q$ の正率経路をそのまま $R$ の正確率経路として使えて、$R$ は既約です。各状態に一歩の自己ループがあるので周期 $1$ です。

[SP5 の収束定理](../SP5/index.md#thm-sp5-finite-convergence)を有限・既約・非周期の $R$ に適用すると、一意な不変確率分布 $\pi$ が存在し、各成分が正で、全ての確率行ベクトル $\mu$ について $\mu R^n\to\pi$ です。$R=I+Q/L$ だから

$$
\pi R=\pi
\quad\Longleftrightarrow\quad
\pi+\frac1L\pi Q=\pi
\quad\Longleftrightarrow\quad
\pi Q=0.
$$

[有限 CTMC の定常分布の判定](#thm-sp13-stationarity-criterion)より、この $\pi$ が CTMC の定常分布で、他の定常分布も $R$ の不変分布となるため一意です。

収束を示します。任意の $\varepsilon>0$ と固定した成分 $j$ について、収束定理からある整数 $M$ が存在し、$n\ge M$ なら $|(\mu R^n)_j-\pi_j|<\varepsilon$ です。一様化の式で $N_t\sim\operatorname{Poisson}(Lt)$ とすると、

$$
\begin{aligned}
|(\mu P_t)_j-\pi_j|
&=\left|\sum_{n=0}^{\infty}P(N_t=n)\bigl((\mu R^n)_j-\pi_j\bigr)\right|\\
&\le\sum_{n<M}P(N_t=n)\cdot1
+\sum_{n\ge M}P(N_t=n)\varepsilon\\
&\le P(N_t<M)+\varepsilon.
\end{aligned}
$$

固定した $M$ について $P(N_t<M)=e^{-Lt}\sum_{n=0}^{M-1}(Lt)^n/n!\to0$ です。よって $\limsup_{t\to\infty}|(\mu P_t)_j-\pi_j|\le\varepsilon$、$\varepsilon$ は任意なので極限は零です。有限個の成分すべてで成り立ちます。
<!-- proof-end -->

この定理は非可逆な三状態の輪にも適用できます。**可逆性は収束の必要条件ではありません**。離散時間の輪が周期 $3$ で振動するのに対し、連続時間では一様化で自己ループを入れられ、Poisson 時計が歩数を混ぜる点が異なります。

## 6. 演習 Level A：記法と基本計算

<a id="ex-sp13-a01"></a>

#### SP13-A01 遷移行列の微小時間

- Level: A

$S=\{0,1\}$、$Q=\begin{pmatrix}-4&4\\1&-1\end{pmatrix}$ とする。$P_0$、$P'_0$、$P_h(0,1)$ と $P_h(1,1)$ の $h\downarrow0$ の一次近似を求めよ。各行の一次係数の和も確かめよ。

<!-- solution-start -->
### 詳細解答

$P_0=I$ です。[短時間遷移](../SP12/index.md#prop-sp12-short-time)で $P_h=I+hQ+O(h^2)$、従って $P'_0=Q$（右微分）です。成分を取り出すと

$$
P_h(0,1)=4h+O(h^2),\qquad
P_h(1,1)=1-h+O(h^2).
$$

他の二成分は $P_h(0,0)=1-4h+O(h^2)$、$P_h(1,0)=h+O(h^2)$。行ごとの一次係数は $-4+4=0$、$1-1=0$ となり、確率の行和 $1$ と整合します。
<!-- solution-end -->

<a id="ex-sp13-a02"></a>

#### SP13-A02 二状態の定常分布

- Level: A

$Q=\begin{pmatrix}-a&a\\b&-b\end{pmatrix}$（$a,b>0$）について、定常分布を求めよ。また詳細釣合いを全状態対で確認せよ。

<!-- solution-start -->
### 詳細解答

$\pi=(x,1-x)$ とすると $\pi Q=(-ax+b(1-x),\,ax-b(1-x))$ です。第1成分を零とする条件は $(a+b)x=b$ なので

$$
\pi=\left(\frac{b}{a+b},\frac{a}{a+b}\right).
$$

$a,b>0$ で両成分は正、和は $1$。[定常判定](#thm-sp13-stationarity-criterion)から定常です。非対角の状態対について

$$
\pi_0q_{01}=\frac{ab}{a+b}
=\pi_1q_{10}.
$$

$i=j$ の二組は自動的に一致し、逆向きの組はこの等式を反転したものなので、全状態対の [詳細釣合い](#def-sp13-detailed-balance)を検査しました。
<!-- solution-end -->

<a id="ex-sp13-a03"></a>

#### SP13-A03 三状態の総流入と総流出

- Level: A

$Q=\begin{pmatrix}-2&2&0\\0&-2&2\\2&0&-2\end{pmatrix}$ と $\pi=(1/3,1/3,1/3)$ について、$\pi Q$ を計算して定常性を判定し、$(0,1)$ における詳細釣合いを確認せよ。

<!-- solution-start -->
### 詳細解答

各列の和は $-2+0+2=0$、$2-2+0=0$、$0+2-2=0$ なので、

$$
\pi Q=\frac13(0,0,0)=(0,0,0).
$$

$\pi$ は確率ベクトルであり [定常判定](#thm-sp13-stationarity-criterion)から定常です。一方で $\pi_0q_{01}=2/3$、$\pi_1q_{10}=0$ なので詳細釣合いは不成立です。総流入と流出の釣合いだけでは可逆性は従いません。
<!-- solution-end -->

<a id="ex-sp13-a04"></a>

#### SP13-A04 左からと右からの掛け算

- Level: A

$Q=\begin{pmatrix}-1&1\\2&-2\end{pmatrix}$、$A=\begin{pmatrix}x&1-x\\y&1-y\end{pmatrix}$ とする。$(AQ)_{00}$ と $(QA)_{00}$ を別々に求め、それぞれ前進・後退方程式のどちらに現れるか示せ。

<!-- solution-start -->
### 詳細解答

行列積の出発側の添字を保って計算すると

$$
(AQ)_{00}=A_{00}q_{00}+A_{01}q_{10}
=-x+2(1-x)=2-3x,
$$

$$
(QA)_{00}=q_{00}A_{00}+q_{01}A_{10}
=-x+y.
$$

$P'_t=P_tQ$ が前進なので $(AQ)_{00}$ の形、$P'_t=QP_t$ が後退なので $(QA)_{00}$ の形です。一般の行列 $A$ では二つが異なりますが、$A=P_t=e^{tQ}$ では可換性により一致します。
<!-- solution-end -->

<a id="ex-sp13-a05"></a>

#### SP13-A05 非既約系と定常分布の非一意性

- Level: A

$Q=\begin{pmatrix}0&0\\0&0\end{pmatrix}$ の CTMC について、$P_t$ を求め、定常分布をすべて列挙せよ。初期分布 $(1,0)$ が $(0,1)$ に近づくかも述べよ。

<!-- solution-start -->
### 詳細解答

$Q^n=0$（$n\ge1$）より $P_t=e^{tQ}=I$。任意の $x\in[0,1]$ に対し $\pi=(x,1-x)$ は $\pi Q=0$ で、非負・和 $1$ の条件を満たすので定常です。従って定常分布はこの一族すべてです。$(1,0)P_t=(1,0)$ が全時刻で成り立つため $(0,1)$ には収束しません。状態間を結ぶ正率経路が存在せず、[有限既約 CTMC の収束定理](#thm-sp13-irreducible-convergence)の既約性が破れています。
<!-- solution-end -->

## 7. 演習 Level B：証明の橋渡しと反例

<a id="ex-sp13-b01"></a>

#### SP13-B01 詳細釣合いから定常性を自力で導く

- Level: B

有限状態 Q 行列 $Q$ と確率ベクトル $\pi$ が $\pi_iq_{ij}=\pi_jq_{ji}$ を満たすとする。$\pi Q=0$ を成分ごとに証明せよ。零質量 $\pi_j=0$ の場合にも成立する理由を述べよ。

<!-- solution-start -->
### 詳細解答

任意の到着状態 $j$ を固定します。和は有限で、詳細釣合いを各項に適用できます。

$$
(\pi Q)_j
=\sum_{i\in S}\pi_iq_{ij}
=\sum_{i\in S}\pi_jq_{ji}
=\pi_j\underbrace{\sum_{i\in S}q_{ji}}_{Q\text{ の行 }j\text{ の和 }=0}
=0.
$$

この式は各 $j$ で成り立つため $\pi Q=0$、[定常判定](#thm-sp13-stationarity-criterion)から $\pi P_t=\pi$。$\pi_j$ では一度も割っていません。$\pi_j=0$ なら第3式は $0$ となり、零質量の例外処理を必要としません。
<!-- solution-end -->

<a id="ex-sp13-b02"></a>

#### SP13-B02 ゼロ質量を含む可逆な吸収系

- Level: B

$Q=\begin{pmatrix}-a&a\\0&0\end{pmatrix}$（$a>0$）について、次を求めよ。

1. 定常分布をすべて求めよ。
2. 定常分布での詳細釣合いを判定せよ。
3. $X_0=0$ での分布の極限を求めよ。

さらに、$\pi_i>0$ が可逆性の定理の必要条件か論じよ。

<!-- solution-start -->
### 詳細解答

$\pi=(x,1-x)$ と置くと

$$
\pi Q=(-ax,ax)=0
\quad\Longleftrightarrow\quad x=0
$$

なので、定常分布は $\pi=(0,1)$ だけです。非自明な状態対では $\pi_0q_{01}=0\cdot a=0$、$\pi_1q_{10}=1\cdot0=0$。対角と逆向きの組も一致し、[詳細釣合いと CTMC の可逆性](#thm-sp13-reversibility)から定常の下で可逆です。

$X_0=0$ からの離脱時刻は [SP12 の初跳躍法則](../SP12/index.md#prop-sp12-first-jump)で率 $a$ の指数分布です。状態 $1$ は吸収状態なので

$$
P_t(0,0)=e^{-at},\qquad P_t(0,1)=1-e^{-at}.
$$

$t\to\infty$ で $(P_t(0,0),P_t(0,1))\to(0,1)=\pi$。定常性・詳細釣合いのどちらにも「全成分が正」という条件は不要です。ただし [既約な CTMC の定理](#thm-sp13-irreducible-convergence)の仮定はこの系では成立しません。
<!-- solution-end -->

<a id="ex-sp13-b03"></a>

#### SP13-B03 逆向きの三時刻確率

- Level: B

有限状態 CTMC に定常分布 $\pi$ があり、全ての $u\ge0$、$i,j$ で $\pi_iP_u(i,j)=\pi_jP_u(j,i)$ が成り立つとする。$0<s<t$、状態 $i,j,k$ に対し、

$$
P_\pi(X_0=i,X_s=j,X_t=k)
=P_\pi(X_0=k,X_{t-s}=j,X_t=i)
$$

を証明せよ。必要な確率の積を明記し、$\pi_j=0$ でも証明できるようにせよ。

<!-- solution-start -->
### 詳細解答

Markov 性と定常性により左辺は

$$
\pi_iP_s(i,j)P_{t-s}(j,k).
$$

二時刻釣合いをまず $(i,j)$、次に $(j,k)$ の組へ使います。途中で確率を割ることなく、

$$
\begin{aligned}
\pi_iP_s(i,j)P_{t-s}(j,k)
&=\pi_jP_s(j,i)P_{t-s}(j,k)\\
&=\pi_kP_{t-s}(k,j)P_s(j,i).
\end{aligned}
$$

右端は $X_0=k$、$X_{t-s}=j$、$X_t=i$ の同時確率です。$\pi_j=0$ の場合も等式の両辺は積として定義され、除算は一切ありません。[詳細釣合いと時間反転の定理](#thm-sp13-reversibility)を三時刻で具体化した形です。
<!-- solution-end -->

<a id="ex-sp13-b04"></a>

#### SP13-B04 Poisson 時計から有限 CTMC の収束を再構成する

- Level: B

有限既約 Q 行列 $Q$ に対し $L>\max_i(-q_{ii})$、$R=I+Q/L$ とする。$R$ が既約非周期であることを説明し、$\mu R^n\to\pi$ が既知なら $\mu P_t\to\pi$ が従うことを Poisson 確率の有限和と残りの和へ分割して示せ。

<!-- solution-start -->
### 詳細解答

$q_{ij}>0$ なら $R_{ij}=q_{ij}/L>0$、$R_{ii}=1-q_i/L>0$ です。元の有向経路は $R$ にもあり既約、各状態の正の自己ループから周期 $1$ で非周期です。そこで [SP5 の有限既約非周期連鎖の収束定理](../SP5/index.md#thm-sp5-finite-convergence)が適用できます。

$\mu R^n\to\pi$ と任意の $\varepsilon>0$ を固定し、全成分について差が $\varepsilon$ 未満となる $M$ を選びます。$N_t$ を率 $L$ の Poisson 計数過程の時刻 $t$ の値とします。[一様化](../SP12/index.md#thm-sp12-uniformization)から

$$
\mu P_t=\sum_{n=0}^{\infty}P(N_t=n)\mu R^n.
$$

成分 $j$ の差の絶対値を $n<M$ と $n\ge M$ に分けると

$$
|(\mu P_t)_j-\pi_j|
\le\sum_{n<M}P(N_t=n)\cdot1
+\sum_{n\ge M}P(N_t=n)\varepsilon
\le e^{-Lt}\sum_{n=0}^{M-1}\frac{(Lt)^n}{n!}+\varepsilon.
$$

有限多項式に $e^{-Lt}$ を掛けた第1項は $t\to\infty$ で零です。$\varepsilon$ を任意に小さくできるので成分ごとに収束します。
<!-- solution-end -->

## 8. 演習 Level C：非可逆 CTMC を総合解析する

<a id="ex-sp13-c01"></a>

#### SP13-C01 三状態の非対称な流れ

- Level: C

状態 $S=\{0,1,2\}$ 上で、各状態から時計回りの隣へ率 $2$、反時計回りの隣へ率 $1$ で跳ぶ CTMC を考える。行は出発状態、列は到着状態とし、$0\to1\to2\to0$ を時計回りとする。

1. Q 行列を作り、Q 行列の全条件を検査せよ。
2. 定常分布を求め、$\pi Q=0$ と正規化を直接確かめよ。この定常分布が一意である理由も示せ。
3. $(0,1)$ で詳細釣合いを検査し、定常なのに可逆でない理由を「総流入」と「状態対の流れ」の違いから説明せよ。
4. $X_0=0$ のとき $P_t(0,1)$ の $t^2$ までの展開を求めよ。また $P_t(0,1)-P_t(1,0)$ の一次係数を求め、時間反転対称性との関係を説明せよ。
5. 任意の初期分布が $\pi$ に収束することを、有限既約 CTMC の収束定理の仮定確認から示せ。

<!-- solution-start -->
### 詳細解答

**1. Q 行列。** $0\to1$、$1\to2$、$2\to0$ が率 $2$、その逆が率 $1$ なので

$$
Q=\begin{pmatrix}
-3&2&1\\
1&-3&2\\
2&1&-3
\end{pmatrix}.
$$

非対角成分 $1,2$ は全て非負で、各行は $-3+2+1=0$、$1-3+2=0$、$2+1-3=0$。従って [Q 行列の定義](../../STO/STO13/index.md#def-sto13-ctmc-qmatrix)を満たします。

**2. 定常分布と一意性。** 各列も $-3+1+2=0$、$2-3+1=0$、$1+2-3=0$ なので、$\pi=(1/3,1/3,1/3)$ に対し

$$
(\pi Q)_j=\frac13\sum_{i=0}^2q_{ij}=0,\qquad
\sum_{i=0}^2\pi_i=1.
$$

よって [定常判定](#thm-sp13-stationarity-criterion)から定常です。すべての異なる状態対で直接遷移率が正なので Q は既約。[有限既約 CTMC の収束定理](#thm-sp13-irreducible-convergence)によって定常分布は一意です。

**3. 可逆性。** 状態対 $\{0,1\}$ では

$$
\pi_0q_{01}=\frac23,\qquad
\pi_1q_{10}=\frac13.
$$

従って [詳細釣合いと CTMC の可逆性](#thm-sp13-reversibility)より可逆ではありません。それでも各状態への総流入率と総流出率は、ともに $\pi_j(2+1)=1$ で一致します。総流量が釣り合う条件より、各対の双方向が釣り合う条件の方が強いためです。

**4. 短時間展開。** 有限状態では $P_t=e^{tQ}=I+tQ+(t^2/2)Q^2+O(t^3)$。まず $(0,1)$ 成分について中間状態 $k=0,1,2$ を分け、

$$
(Q^2)_{01}
=q_{00}q_{01}+q_{01}q_{11}+q_{02}q_{21}
=(-3)\cdot2+2\cdot(-3)+1\cdot1=-11.
$$

従って

$$
P_t(0,1)=2t-\frac{11}{2}t^2+O(t^3).
$$

他方向の短時間一次項は $P_t(1,0)=q_{10}t+O(t^2)=t+O(t^2)$ なので

$$
P_t(0,1)-P_t(1,0)=t+O(t^2).
$$

$\pi_0=\pi_1=1/3$ のため、定常から出発した二時刻流も一次係数 $1/3$ の非対称性を持ちます。

**5. 長時間。** 任意の状態対の直接率が正なので既約で、有限状態です。従って [有限既約 CTMC の収束定理](#thm-sp13-irreducible-convergence)の全仮定を満たし、任意の初期分布 $\mu$ について $\mu P_t\to(1/3,1/3,1/3)$ です。収束は詳細釣合いを必要としません。
<!-- solution-end -->

---

**次講への接続**：率 $Q$ から時間発展 $P_t$、定常条件、時間反転まで調べました。SP14 では状態を個体数・分子数と読み替え、出生・死亡の率や吸収境界から定常分布と到達確率を計算します。特に無限状態では、本講の有限和・一様化上界をそのまま使えないことを意識します。
