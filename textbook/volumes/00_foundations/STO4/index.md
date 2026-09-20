# STO4：Brown 運動・到達時刻・strong Markov property

<!-- definition-example-audit: strict -->

STO3 では、整合的な有限次元分布から確率過程を作り、moment estimate から連続な modification を得るところまで閉じました。

この章では、その二つを最初に本格的に使います。目標は「Brown 運動があると仮定して公式を使う」ことではありません。

$$
\boxed{
\text{covariance }\min(s,t)
\to
\text{Gaussian finite-dimensional laws}
\to
\text{Kolmogorov extension}
\to
\text{continuous modification}
\to
\text{Brownian motion}
}
$$

と構成し、その後

$$
\boxed{
\text{independent increments}
\to
\text{Markov}
\to
\text{strong Markov}
\to
\text{reflection}
\to
\text{hitting time}
\to
\text{1 次元 recurrence}
}
$$

までを一つの論理線として追います。

反射原理を strong Markov property より先に置くと、停止時刻で経路を反射した後の独立増分を暗黙に仮定してしまいます。本章ではその循環を避け、**停止時刻を右側の dyadic grid で近似して strong Markov property を先に証明**してから反射原理へ進みます。

---

## 1. Gaussian process は有限個の時刻を同時に Gaussian とする

<a id="def-sto4-gaussian-process"></a>

<!-- formal-statement-start -->
> **定義（Gaussian process）**  
> 実数値確率過程 $X=(X_t)_{t\in T}$ が **Gaussian process** であるとは、任意の有限個の時刻
>
$$
t_1,\ldots,t_m\in T
$$
>
> に対し、確率ベクトル
>
$$
(X_{t_1},\ldots,X_{t_m})
$$
>
> が多変量 Gaussian 分布を持つことをいう。退化した Gaussian 分布も許す。
<!-- formal-statement-end -->

Gaussian process では、平均関数

$$
m(t)=E[X_t]
$$

と covariance kernel

$$
K(s,t)
=
\operatorname{Cov}(X_s,X_t)
$$

が有限次元分布を決めます。

<!-- definition-example-start: def-sto4-gaussian-process -->
### 直接例：$X_t=tZ$ は Gaussian だが Brown 運動ではない

**定義の確認**

$Z\sim N(0,1)$ とし

$$
X_t=tZ
$$

と置きます。任意の $t_1,\ldots,t_m$ について

$$
(X_{t_1},\ldots,X_{t_m})
=
Z(t_1,\ldots,t_m)
$$

は一つの Gaussian 変数の線形像なので、多変量 Gaussian です。

従って $X$ は Gaussian process です。

一方、

$$
X_t-X_s=(t-s)Z
$$

なので、異なる時間区間の増分は同じ $Z$ を共有しており独立ではありません。

Gaussian であることだけでは Brown 運動には足りません。
<!-- definition-example-end -->

<a id="def-sto4-brownian-motion"></a>

<!-- formal-statement-start -->
> **定義（standard Brownian motion）**  
> 実数値過程 $B=(B_t)_{t\ge0}$ が standard Brownian motion であるとは、次を満たすことをいう。
>
> 1. $B_0=0$ almost surely.
> 2. $0\le t_0<t_1<\cdots<t_m$ に対し、
>
$$
B_{t_1}-B_{t_0},\ldots,B_{t_m}-B_{t_{m-1}}
$$
>
> は独立である。
> 3. $0\le s<t$ に対し
>
$$
B_t-B_s\sim N(0,t-s).
$$
>
> 4. ほとんど全ての $\omega$ について $t\mapsto B_t(\omega)$ は連続である。
<!-- formal-statement-end -->

2 と 3 はそれぞれ independent increments と stationary Gaussian increments を表します。

---

## 2. covariance $\min(s,t)$ から Brown 運動を構成する

Brown 運動の covariance は、定義から形式的に計算すると

$$
E[B_sB_t]=\min(s,t)
$$

になるはずです。逆に、この covariance を持つ centered Gaussian process を作れば Brown 運動になります。

<a id="thm-sto4-brownian-construction"></a>

<!-- formal-statement-start -->
> **定理（Brown 運動の構成）**  
> 連続な standard Brownian motion は存在する。
>
> より具体的には、centered Gaussian process $B=(B_t)_{t\ge0}$ で
>
$$
E[B_sB_t]=\min(s,t)
$$
>
> を満たすものを [Kolmogorov 拡張定理](../STO3/index.md#thm-sto3-kolmogorov-extension)で構成し、[Kolmogorov--Chentsov continuity theorem](../STO3/index.md#thm-sto3-kolmogorov-chentsov)で連続な modification を取れば、その modification は standard Brownian motion である。
<!-- formal-statement-end -->

### 証明の見取り図

核心は三点です。

1. $K(s,t)=\min(s,t)$ が本当に covariance matrix を作れることを確認する。
2. Gaussian では **無相関な成分が独立**なので、disjoint increments の covariance が 0 なら independent increments が出る。
3. Gaussian increment の第4 moment
   $E|B_t-B_s|^4=3|t-s|^2$
   を STO3 の continuity theorem に入れる。

<!-- proof-start -->
### 証明

**Step 1：$K(s,t)=\min(s,t)$ は positive semidefinite。**

$0\le t_1<\cdots<t_m$、$a_1,\ldots,a_m\in\mathbb R$ とし、

$$
t_0=0,
\qquad
\Delta t_k=t_k-t_{k-1},
\qquad
c_k=\sum_{j=k}^m a_j
$$

と置きます。

すると

$$
\min(t_i,t_j)
=
\sum_{k=1}^{\min(i,j)}\Delta t_k
$$

なので、

$$
\begin{aligned}
\sum_{i=1}^m\sum_{j=1}^m
a_i a_j\min(t_i,t_j)
&=
\sum_{k=1}^m
\Delta t_k
\left(\sum_{i=k}^m a_i\right)
\left(\sum_{j=k}^m a_j\right)\\
&=
\sum_{k=1}^m\Delta t_k c_k^2
\ge0.
\end{aligned}
$$

従って任意の有限時刻集合で

$$
\Sigma_{ij}=\min(t_i,t_j)
$$

は covariance matrix になれます。

**Step 2：整合的 Gaussian finite-dimensional laws を作る。**

各有限集合 $I=\{t_1,\ldots,t_m\}$ に対し、平均 0、covariance matrix

$$
\Sigma_I=(\min(t_i,t_j))_{i,j}
$$

の Gaussian 分布 $\mu_I$ を取ります。

Gaussian vector の座標を一部捨てた周辺分布は、対応する平均ベクトルと covariance の部分行列を持つ Gaussian 分布です。

従って $I\subset J$ なら

$$
\mu_I
=
\mu_J\circ\pi_{J,I}^{-1}.
$$

よって finite-dimensional laws は整合的です。

[Kolmogorov 拡張定理](../STO3/index.md#thm-sto3-kolmogorov-extension)から、これらを持つ centered Gaussian process $X=(X_t)_{t\ge0}$ が存在します。

**Step 3：増分の分布を計算する。**

$0\le s<t$ なら

$$
\begin{aligned}
\operatorname{Var}(X_t-X_s)
&=
t+s-2\min(s,t)\\
&=
t-s.
\end{aligned}
$$

Gaussian vector の線形結合も Gaussian なので

$$
X_t-X_s\sim N(0,t-s).
$$

**Step 4：disjoint increments は独立。**

$0\le r<s\le u<v$ とすると

$$
\begin{aligned}
\operatorname{Cov}(X_s-X_r,X_v-X_u)
&=
\min(s,v)-\min(s,u)\\
&\quad-\min(r,v)+\min(r,u)\\
&=
s-s-r+r\\
&=0.
\end{aligned}
$$

複数の互いに交わらない区間の増分を同時に並べても Gaussian vector です。その covariance matrix は対角なので、成分は独立です。

従って $X$ は independent increments を持ちます。

**Step 5：連続な modification を取る。**

$Z\sim N(0,\sigma^2)$ なら

$$
E[Z^4]=3\sigma^4.
$$

従って

$$
E|X_t-X_s|^4
=
3|t-s|^2.
$$

これは STO3 の continuity theorem で

$$
\alpha=4,
\qquad
1+\beta=2,
\qquad
\beta=1
$$

に対応します。

よって $X$ には、任意の

$$
0<\gamma<\frac{\beta}{\alpha}
=
\frac14
$$

について compact 時間区間上で $\gamma$-Hölder continuous な modification $B$ が存在します。

modification は各固定時刻で元の過程と almost surely 一致するため、有限次元分布は変わりません。したがって $B$ も centered Gaussian process で covariance $\min(s,t)$ を持ち、Step 3, 4 の increment law と independence を保ちます。

最後に

$$
\operatorname{Var}(B_0)=0
$$

なので $B_0=0$ almost surely です。

以上より $B$ は standard Brownian motion です。
<!-- proof-end -->

<!-- definition-example-start: def-sto4-brownian-motion -->
### 直接例：構成した過程で Brown 運動の4条件を照合する

**定義の確認**

上の定理で得た $B$ は

- $B_0=0$ almost surely,
- disjoint increments が jointly Gaussian かつ covariance 0 なので独立,
- $B_t-B_s\sim N(0,t-s)$,
- continuous modification を選んだので path が almost surely 連続,

を全て満たします。

ここで「Gaussian process を作れた」と「連続 path を選べた」は別の仕事です。STO3 の二つの定理を別々に使ったことが重要です。
<!-- definition-example-end -->

---

## 3. scaling と Brownian filtration

<a id="prop-sto4-brownian-scaling"></a>

<!-- formal-statement-start -->
> **命題（Brownian scaling）**  
> $B$ を standard Brownian motion、$c>0$ とする。このとき
>
$$
\widetilde B_t
=
\frac{1}{\sqrt c}B_{ct},
\qquad t\ge0
$$
>
> も standard Brownian motion である。
<!-- formal-statement-end -->

<!-- proof-start -->
### 証明

$\widetilde B_0=0$ で、path の連続性は $B$ から従います。

$0\le s<t$ に対し

$$
\widetilde B_t-\widetilde B_s
=
\frac1{\sqrt c}(B_{ct}-B_{cs})
$$

なので

$$
\widetilde B_t-\widetilde B_s
\sim
N\left(0,\frac{c(t-s)}c\right)
=
N(0,t-s).
$$

また disjoint time intervals は $t\mapsto ct$ で disjoint intervals に移るため、増分の独立性も保たれます。
<!-- proof-end -->

<a id="def-sto4-brownian-filtration"></a>

<!-- formal-statement-start -->
> **定義（Brownian natural filtration）**  
> Brown 運動 $B$ に対し
>
$$
\mathcal F_t^B
=
\sigma(B_s:0\le s\le t)
$$
>
> を **natural filtration** という。
>
> null set を補い、必要に応じて右連続化した filtration を stochastic calculus では usual augmentation として用いる。本章の strong Markov property の核心証明では、情報の出所を明示するためまず raw natural filtration $(\mathcal F_t^B)$ で議論する。
<!-- formal-statement-end -->

<!-- definition-example-start: def-sto4-brownian-filtration -->
### 直接例：過去の事象と未来増分を分ける

**定義の確認**

事象

$$
A=\{B_{1/2}>0,\ B_1<1\}
$$

は $B_s$ の $s\le1$ の値だけで判定できるので

$$
A\in\mathcal F_1^B.
$$

一方、

$$
B_2-B_1
$$

は interval $(1,2]$ の increment であり、Brown 運動の independent increments から $\mathcal F_1^B$ と独立です。

実際、$\mathcal F_1^B$ は $B$ の $[0,1]$ 上の rational time values で生成でき、各有限個の過去値と $B_2-B_1$ は jointly Gaussian かつ covariance 0 です。
<!-- definition-example-end -->

---

## 4. deterministic time では Markov property は independent increments そのもの

<a id="thm-sto4-brownian-markov"></a>

<!-- formal-statement-start -->
> **定理（Brown 運動の Markov property）**  
> $B$ を standard Brownian motion、$(\mathcal F_t^B)$ を natural filtration とする。
>
> 任意の $s,t\ge0$ に対し
>
$$
B_{s+t}-B_s
$$
>
> は $\mathcal F_s^B$ と独立で、$N(0,t)$ に従う。
>
> 従って任意の bounded Borel function $f:\mathbb R\to\mathbb R$ について
>
$$
E[f(B_{s+t})\mid\mathcal F_s^B]
=
\int_{\mathbb R}
f(B_s+y)
\frac{e^{-y^2/(2t)}}{\sqrt{2\pi t}}\,dy
$$
>
> が almost surely 成り立つ。ただし $t=0$ では右辺を $f(B_s)$ と読む。
<!-- formal-statement-end -->

### 証明の見取り図

条件付き期待値の中で

$$
B_{s+t}=B_s+(B_{s+t}-B_s)
$$

と分けます。

$B_s$ は現在情報 $\mathcal F_s^B$ に含まれ、未来増分だけが独立な新しい Gaussian noise です。

<!-- proof-start -->
### 証明

まず $0\le r_1<\cdots<r_m\le s$ とします。

vector

$$
(B_{r_1},\ldots,B_{r_m},B_{s+t}-B_s)
$$

は Gaussian です。

各 $r_j\le s$ について

$$
\begin{aligned}
\operatorname{Cov}(B_{r_j},B_{s+t}-B_s)
&=
\min(r_j,s+t)-\min(r_j,s)\\
&=
r_j-r_j
=0.
\end{aligned}
$$

従って $B_{s+t}-B_s$ は任意の有限個の過去値と独立です。

natural filtration は rational time の過去値で生成できるので、monotone class argument により $\mathcal F_s^B$ 全体と独立です。

あとは $Y=B_{s+t}-B_s\sim N(0,t)$ と置けば、$Y$ は $\mathcal F_s^B$ と独立なので

$$
E[f(B_s+Y)\mid\mathcal F_s^B]
=
g(B_s),
$$

ただし

$$
g(x)=E[f(x+Y)]
$$

です。Gaussian density を書けば主張の積分表示になります。
<!-- proof-end -->

---

## 5. stopping time へ時刻を置き換える：strong Markov property

deterministic time $s$ なら、未来増分は「$s$ より前」と disjoint だから独立でした。

しかし stopping time $\tau$ は random です。

単に

$$
B_{\tau+t}-B_\tau
$$

を「未来の増分だから独立」と言うだけでは証明になりません。$\tau$ 自体が過去の path から選ばれているからです。

ここで STO1 の stopping time と $\mathcal F_\tau$ が働きます。

<a id="thm-sto4-brownian-strong-markov"></a>

<!-- formal-statement-start -->
> **定理（Brown 運動の strong Markov property）**  
> $B$ を standard Brownian motion、$(\mathcal F_t^B)$ を natural filtration とし、$\tau$ を almost surely finite な stopping time とする。
>
> このとき
>
$$
W_t
=
B_{\tau+t}-B_\tau,
\qquad t\ge0
$$
>
> は standard Brownian motion であり、$\mathcal F_\tau^B$ と独立である。
>
> 特に bounded Borel function $f$ に対し
>
$$
E[f(B_{\tau+t})\mid\mathcal F_\tau^B]
=
\int_{\mathbb R}
f(B_\tau+y)
\frac{e^{-y^2/(2t)}}{\sqrt{2\pi t}}\,dy
$$
>
> almost surely.
<!-- formal-statement-end -->

### 証明の見取り図

random time を直接扱わず、

$$
\tau_n
=
2^{-n}\left\lceil2^n\tau\right\rceil
$$

で右側の dyadic grid へ丸めます。

すると

$$
\tau_n\downarrow\tau.
$$

各 $\tau_n$ は countably many deterministic times しか取らないので、その値ごとに ordinary independent increments を使えます。

最後に Brownian path の連続性で

$$
B_{\tau_n+t}-B_{\tau_n}
\to
B_{\tau+t}-B_\tau
$$

とし、極限へ移します。

この「**離散化して deterministic-time の独立性を使い、path continuity で random time へ戻す**」のが strong Markov property の核心です。

<!-- proof-start -->
### 証明

#### Step 1：dyadic approximation は stopping time

$\delta_n=2^{-n}$ と書き

$$
\tau_n
=
\delta_n\lceil\tau/\delta_n\rceil
$$

とします。

$\tau_n$ は $\{0,\delta_n,2\delta_n,\ldots\}$ に値を取り、

$$
\tau\le\tau_n<\tau+\delta_n
$$

なので $\tau_n\downarrow\tau$ です。

また

$$
\{\tau_n=k\delta_n\}
=
\{(k-1)\delta_n<\tau\le k\delta_n\}
$$

は $\mathcal F_{k\delta_n}^B$ に属します。従って $\tau_n$ は stopping time です。

#### Step 2：countably-valued stopping time では主張が成り立つ

$\sigma$ が $0,\delta,2\delta,\ldots$ のみに値を取る stopping time とします。

任意の

$$
A\in\mathcal F_\sigma^B
$$

と、$0\le t_1<\cdots<t_m$、bounded Borel function
$g:\mathbb R^m\to\mathbb R$ を取ります。

$$
A_k
=
A\cap\{\sigma=k\delta\}
$$

と置くと、stopping-time sigma-field の定義から

$$
A_k\in\mathcal F_{k\delta}^B.
$$

deterministic-time independent increments により

$$
\left(
B_{k\delta+t_1}-B_{k\delta},
\ldots,
B_{k\delta+t_m}-B_{k\delta}
\right)
$$

は $\mathcal F_{k\delta}^B$ と独立で、law は

$$
(B_{t_1},\ldots,B_{t_m})
$$

と同じです。

したがって

$$
\begin{aligned}
&E\left[
1_{A_k}
g(
B_{\sigma+t_1}-B_\sigma,
\ldots,
B_{\sigma+t_m}-B_\sigma
)
\right]\\
&=
P(A_k)
E[g(B_{t_1},\ldots,B_{t_m})].
\end{aligned}
$$

$k$ について足し合わせると

$$
\begin{aligned}
&E\left[
1_A
g(
B_{\sigma+t_1}-B_\sigma,
\ldots,
B_{\sigma+t_m}-B_\sigma
)
\right]\\
&=
P(A)
E[g(B_{t_1},\ldots,B_{t_m})].
\end{aligned}
$$

です。

従って shifted finite-dimensional vector は $\mathcal F_\sigma^B$ と独立で、元の Brown 運動と同じ finite-dimensional distribution を持ちます。

#### Step 3：$\tau_n\downarrow\tau$ の極限を取る

$A\in\mathcal F_\tau^B$ とします。

$\tau\le\tau_n$ なので STO1 の stopping-time sigma-field の単調性から

$$
\mathcal F_\tau^B
\subset
\mathcal F_{\tau_n}^B.
$$

従って Step 2 を $\sigma=\tau_n$ に適用でき、

$$
\begin{aligned}
&E\left[
1_A
g(
B_{\tau_n+t_1}-B_{\tau_n},
\ldots,
B_{\tau_n+t_m}-B_{\tau_n}
)
\right]\\
&=
P(A)
E[g(B_{t_1},\ldots,B_{t_m})]
\end{aligned}
$$

を得ます。

まず $g$ を bounded continuous とします。

Brownian path の連続性と $\tau_n\downarrow\tau$ から各 $j$ について

$$
B_{\tau_n+t_j}-B_{\tau_n}
\to
B_{\tau+t_j}-B_\tau
$$

almost surely.

bounded convergence theorem により

$$
\begin{aligned}
&E\left[
1_A
g(
B_{\tau+t_1}-B_\tau,
\ldots,
B_{\tau+t_m}-B_\tau
)
\right]\\
&=
P(A)
E[g(B_{t_1},\ldots,B_{t_m})].
\end{aligned}
$$

bounded continuous functions から bounded Borel functions への拡張は monotone class theorem で行えます。

従って全ての shifted finite-dimensional vectors は $\mathcal F_\tau^B$ と独立で、Brownian finite-dimensional laws を持ちます。

さらに shifted path

$$
t\mapsto B_{\tau+t}-B_\tau
$$

は元の path の連続性から連続です。

よって $W_t=B_{\tau+t}-B_\tau$ は standard Brownian motion です。

連続 path は rational time values で決まるので、$W$ が生成する sigma-field 全体も $\mathcal F_\tau^B$ と独立です。
<!-- proof-end -->

usual augmentation を使う場合も、null set の completion 後に同じ conditional identity を almost-sure equality として読むのが標準です。後続 STO5 以降では usual conditions を備えた filtration を基本環境にします。

---

## 6. hitting time は stopping time である

<a id="def-sto4-hitting-time"></a>

<!-- formal-statement-start -->
> **定義（Brownian hitting time）**  
> $a\in\mathbb R$ に対し
>
$$
\tau_a
=
\inf\{t\ge0:B_t=a\}
$$
>
> を level $a$ の **hitting time** とする。集合が空なら $\tau_a=\infty$ とする。
<!-- formal-statement-end -->

<!-- definition-example-start: def-sto4-hitting-time -->
### 直接例：連続 path から stopping-time 性を確認する

**定義の確認**

$a>0$ とし

$$
M_t=\sup_{0\le s\le t}B_s
$$

と置きます。

path continuity により

$$
\{\tau_a\le t\}
=
\{M_t\ge a\}.
$$

さらに連続関数の supremum は rational points だけでも同じなので

$$
M_t
=
\sup_{q\in\mathbb Q\cap[0,t]}B_q.
$$

従って

$$
\{M_t\ge a\}
=
\bigcap_{n=1}^\infty
\bigcup_{q\in\mathbb Q\cap[0,t]}
\{B_q>a-1/n\}
\in
\mathcal F_t^B.
$$

よって $\tau_a$ は stopping time です。
<!-- definition-example-end -->

---

## 7. strong Markov から reflection principle を得る

<a id="thm-sto4-reflection-principle"></a>

<!-- formal-statement-start -->
> **定理（reflection principle）**  
> $B$ を standard Brownian motion、
>
$$
M_T=\sup_{0\le s\le T}B_s
$$
>
> とする。$a>0$、$b\le a$ に対し
>
$$
P(M_T\ge a,\ B_T\le b)
=
P(B_T\ge 2a-b).
$$
>
> 特に
>
$$
P(M_T\ge a)
=
2P(B_T\ge a)
=
2\left(
1-\Phi\left(\frac{a}{\sqrt T}\right)
\right),
$$
>
> ただし $\Phi$ は $N(0,1)$ の cumulative distribution function である。
<!-- formal-statement-end -->

### 証明の見取り図

level $a$ へ初めて到達した時点で、その後の increment の符号を反転します。

strong Markov property により、停止時刻の後ろは過去と独立な Brownian motion です。Brown 運動は $W$ と $-W$ が同じ law を持つので、反射後の process 全体も Brownian law を持ちます。

<!-- proof-start -->
### 証明

$\tau_a$ を level $a$ の hitting time とし、

$$
\sigma=\tau_a\wedge T
$$

と置きます。$\sigma\le T$ なので bounded stopping time です。

次の reflected process を考えます。

$$
\widetilde B_t
=
\begin{cases}
B_t, & t\le\sigma,\\
2B_\sigma-B_t, & t>\sigma.
\end{cases}
$$

strong Markov property から

$$
B_{\sigma+t}-B_\sigma
$$

は $\mathcal F_\sigma^B$ と独立な Brownian motion です。

その符号を反転した

$$
-(B_{\sigma+t}-B_\sigma)
$$

も同じ law の Brownian motion なので、$\widetilde B$ も standard Brownian motion と同じ law を持ちます。

event

$$
E=\{M_T\ge a,\ B_T\le b\}
$$

上では $\tau_a\le T$ なので $B_\sigma=a$ です。従って

$$
\widetilde B_T
=
2a-B_T
\ge
2a-b.
$$

逆に reflected path の終点が $2a-b\ge a$ なら continuity によりその path は時刻 $T$ までに level $a$ を通ります。反射操作は同じ hitting time で再度行うと元の path に戻る involution です。

したがって reflection は

$$
\{M_T\ge a,\ B_T\le b\}
$$

と

$$
\{B_T\ge 2a-b\}
$$

を確率を保って対応させます。

よって

$$
P(M_T\ge a,\ B_T\le b)
=
P(B_T\ge2a-b).
$$

$b=a$ とすると、$P(B_T=a)=0$ なので

$$
\begin{aligned}
P(M_T\ge a)
&=
P(B_T\ge a)
+
P(M_T\ge a,B_T<a)\\
&=
2P(B_T\ge a).
\end{aligned}
$$

最後に $B_T/\sqrt T\sim N(0,1)$ を使えば表示式を得ます。
<!-- proof-end -->

---

## 8. hitting time distribution と無限平均

<a id="thm-sto4-hitting-time-distribution"></a>

<!-- formal-statement-start -->
> **定理（Brownian hitting time の分布）**  
> $a>0$ とする。level $a$ の hitting time
>
$$
\tau_a=\inf\{t\ge0:B_t=a\}
$$
>
> に対し、$t>0$ で
>
$$
P(\tau_a\le t)
=
2\left(
1-\Phi\left(\frac{a}{\sqrt t}\right)
\right).
$$
>
> 従って $\tau_a$ は $(0,\infty)$ 上で density
>
$$
f_{\tau_a}(t)
=
\frac{a}{\sqrt{2\pi t^3}}
\exp\left(-\frac{a^2}{2t}\right)
$$
>
> を持つ。また
>
$$
P(\tau_a<\infty)=1,
\qquad
E[\tau_a]=\infty.
$$
<!-- formal-statement-end -->

<!-- proof-start -->
### 証明

path continuity から

$$
\{\tau_a\le t\}
=
\{M_t\ge a\}.
$$

reflection principle より

$$
P(\tau_a\le t)
=
2P(B_t\ge a)
=
2\left(
1-\Phi\left(\frac{a}{\sqrt t}\right)
\right).
$$

これを $t$ で微分します。

$$
\frac{d}{dt}
\left(
\frac{a}{\sqrt t}
\right)
=
-\frac{a}{2t^{3/2}}.
$$

標準正規 density を

$$
\phi(x)=\frac1{\sqrt{2\pi}}e^{-x^2/2}
$$

と書けば

$$
\begin{aligned}
f_{\tau_a}(t)
&=
2\phi\left(\frac a{\sqrt t}\right)
\frac{a}{2t^{3/2}}\\
&=
\frac{a}{\sqrt{2\pi t^3}}
\exp\left(-\frac{a^2}{2t}\right).
\end{aligned}
$$

$t\to\infty$ とすると $a/\sqrt t\to0$ なので

$$
P(\tau_a<\infty)
=
\lim_{t\to\infty}P(\tau_a\le t)
=
2(1-\Phi(0))
=
1.
$$

平均については tail integral を使います。

$$
E[\tau_a]
=
\int_0^\infty P(\tau_a>t)\,dt.
$$

$t\ge a^2$ なら $x=a/\sqrt t\in(0,1]$ で、

$$
\begin{aligned}
P(\tau_a>t)
&=
2\Phi(x)-1\\
&=
2\int_0^x\phi(u)\,du\\
&\ge
2\phi(1)x\\
&=
2\phi(1)\frac a{\sqrt t}.
\end{aligned}
$$

従って

$$
E[\tau_a]
\ge
2a\phi(1)
\int_{a^2}^\infty
t^{-1/2}\,dt
=
\infty.
$$

「almost surely 到達する」と「平均到達時間が有限」は全く別です。
<!-- proof-end -->

---

## 9. 1 次元 Brown 運動は point recurrent

<a id="thm-sto4-one-dimensional-recurrence"></a>

<!-- formal-statement-start -->
> **定理（1 次元 Brown 運動の基本的 recurrence）**  
> 1 次元 standard Brownian motion $B$ について、almost surely
>
$$
\limsup_{t\to\infty}B_t=+\infty,
\qquad
\liminf_{t\to\infty}B_t=-\infty.
$$
>
> 従って almost surely 全ての $x\in\mathbb R$ を少なくとも一度通る。
>
> さらに level $0$ へ無限回戻る。
<!-- formal-statement-end -->

### 証明の見取り図

各固定 level の hitting probability が 1 であることは前節で分かっています。

整数 level $\pm1,\pm2,\ldots$ は可算個なので、それら全てを hit する確率も 1 です。これで limsup / liminf が出ます。

無限回の return は strong Markov property を使って $+1,-1,+1,-1,\ldots$ と交互に hit させます。

<!-- proof-start -->
### 証明

$a>0$ なら前節から

$$
P(\tau_a<\infty)=1.
$$

$-B$ も Brownian motion なので

$$
P(\tau_{-a}<\infty)=1.
$$

従って各 $n\in\mathbb N$ に対して level $n$ と $-n$ を hit する event は確率 1 です。

可算交叉を取れば、almost surely 全ての整数 $\pm n$ を hit します。従って

$$
\limsup_{t\to\infty}B_t=+\infty,
\qquad
\liminf_{t\to\infty}B_t=-\infty.
$$

continuous path は $-n$ から $n$ へ移る途中で任意の $x\in[-n,n]$ を通るので、almost surely 全ての実数 level を hit します。

次に return を示します。

$\sigma_0=0$ とし、順に

$$
\sigma_1
=
\inf\{t\ge0:B_t=1\},
$$

$$
\sigma_2
=
\inf\{t\ge\sigma_1:B_t=-1\},
$$

$$
\sigma_3
=
\inf\{t\ge\sigma_2:B_t=1\},
$$

と交互に定めます。

$\sigma_k<\infty$ が成立したとします。strong Markov property により、$\sigma_k$ 後の shifted process は新しい Brownian motion です。

現在値から次の目標 level までの距離は 2 なので、前節の hitting probability 1 から

$$
P(\sigma_{k+1}<\infty\mid\mathcal F_{\sigma_k}^B)=1.
$$

帰納的に全ての $\sigma_k$ は finite almost surely です。

各 $+1$ から $-1$、または $-1$ から $+1$ への移動の途中で continuity により level 0 を通ります。

さらに連続関数は compact interval 上で一様連続なので、有限時間内に $+1$ と $-1$ を無限回交互に往復することはできません。従って

$$
\sigma_k\to\infty.
$$

よって level 0 への return は無限回起こります。
<!-- proof-end -->

---

## 10. time inversion：短時間と長時間を入れ替える

time inversion は後続計算の direct prerequisite ではありませんが、Brownian covariance の自己相似性がどれほど強いかを見る代表例です。

<a id="prop-sto4-time-inversion"></a>

<!-- formal-statement-start -->
> **命題（Brownian time inversion）**  
> $B$ を standard Brownian motion とし
>
$$
\widehat B_0=0,
\qquad
\widehat B_t=tB_{1/t}
\quad(t>0)
$$
>
> と置く。このとき $\widehat B$ も standard Brownian motion である。
<!-- formal-statement-end -->

### 証明の見取り図

$t>0$ だけなら Gaussian covariance を計算するだけです。

唯一の問題は $t\downarrow0$ で

$$
tB_{1/t}\to0
$$

を示すことです。これは

$$
\frac{B_u}{u}\to0
\qquad(u\to\infty)
$$

と同値です。

integer times は第4 moment と Borel--Cantelli、integer 間は reflection principle で抑えます。

<!-- proof-start -->
### 証明

まず $s,t>0$ とします。

$\widehat B$ は $B$ の有限個の値の線形変換なので Gaussian process です。

また centered で、

$$
\begin{aligned}
E[\widehat B_s\widehat B_t]
&=
st\,
E[B_{1/s}B_{1/t}]\\
&=
st\min(1/s,1/t)\\
&=
\min(s,t).
\end{aligned}
$$

従って $(0,\infty)$ 上の finite-dimensional laws は Brownian motion と一致します。

残るのは $0$ での continuity です。

まず $B_n\sim N(0,n)$ なので

$$
E[B_n^4]=3n^2.
$$

任意の $\varepsilon>0$ に対し Markov inequality から

$$
P(|B_n|>\varepsilon n)
\le
\frac{3}{\varepsilon^4n^2}.
$$

右辺は $n$ について可算和可能なので、Borel--Cantelli lemma により

$$
\frac{B_n}{n}\to0
$$

almost surely.

次に

$$
D_n
=
\sup_{0\le u\le1}|B_{n+u}-B_n|
$$

とします。

stationary increments と reflection principle から

$$
P(D_n>x)
\le
4P(B_1>x).
$$

さらに第4 moment を使えば

$$
P(D_n>\varepsilon n)
\le
\frac{12}{\varepsilon^4n^4}.
$$

これも可算和可能なので

$$
\frac{D_n}{n}\to0
$$

almost surely.

$t\in[n,n+1]$ なら

$$
\frac{|B_t|}{t}
\le
\frac{|B_n|+D_n}{n}.
$$

従って

$$
\frac{B_t}{t}\to0
\qquad(t\to\infty)
$$

almost surely.

$u=1/t$ と置けば

$$
tB_{1/t}
=
\frac{B_u}{u}
\to0
\qquad(t\downarrow0).
$$

よって $\widehat B$ は $0$ でも連続です。

したがって $\widehat B$ は covariance $\min(s,t)$ を持つ continuous centered Gaussian process であり、Brownian motion です。
<!-- proof-end -->

---

## 11. この章で何が閉じたか

Brown 運動について、次を同じ章の中で接続しました。

$$
\text{finite-dimensional Gaussian law}
\to
\text{existence}
\to
\text{continuous path}
\to
\text{Markov}
\to
\text{strong Markov}
\to
\text{reflection}
\to
\text{first passage}
\to
\text{recurrence}.
$$

特に strong Markov property は「Brown 運動だから成り立つ」という名前だけの事実ではなく、

$$
\boxed{
\text{stopping time を dyadic grid へ丸める}
+
\text{deterministic-time independent increments}
+
\text{path continuity}
}
$$

から出てくることを確認しました。

次の STO5 では、Brownian path が連続なのに通常の意味では極端に rough であることを quadratic variation で測ります。

---

# 演習

## Level A

### A1. covariance $\min(s,t)$ と独立増分

centered Gaussian process $X$ が

$$
E[X_sX_t]=\min(s,t)
$$

を満たすとします。

$0\le t_0<t_1<t_2<t_3$ に対し、

$$
Y_1=X_{t_1}-X_{t_0},
\qquad
Y_2=X_{t_3}-X_{t_2}
$$

が独立であることを示してください。

- Level: A

<!-- solution-start -->
### 詳細解答

$(Y_1,Y_2)$ は Gaussian vector の線形変換なので jointly Gaussian です。

従って covariance が 0 であることを示せば独立性が従います。

$$
\begin{aligned}
\operatorname{Cov}(Y_1,Y_2)
&=
E[(X_{t_1}-X_{t_0})(X_{t_3}-X_{t_2})]\\
&=
\min(t_1,t_3)-\min(t_1,t_2)\\
&\quad-\min(t_0,t_3)+\min(t_0,t_2).
\end{aligned}
$$

時刻の順序から

$$
\min(t_1,t_3)=t_1,
\quad
\min(t_1,t_2)=t_1,
$$

$$
\min(t_0,t_3)=t_0,
\quad
\min(t_0,t_2)=t_0.
$$

したがって

$$
\operatorname{Cov}(Y_1,Y_2)
=
t_1-t_1-t_0+t_0
=
0.
$$

jointly Gaussian な二変量が無相関なので、$Y_1,Y_2$ は独立です。
<!-- solution-end -->

### A2. Brownian scaling

$B$ を standard Brownian motion、$c>0$ とします。

$$
X_t=c^{-1/2}B_{ct}
$$

が standard Brownian motion であることを、定義の4条件を順に確認して示してください。

- Level: A

<!-- solution-start -->
### 詳細解答

まず

$$
X_0=c^{-1/2}B_0=0
$$

almost surely.

次に $0\le s<t$ に対し

$$
X_t-X_s
=
c^{-1/2}(B_{ct}-B_{cs}).
$$

Brownian increment の分布から

$$
B_{ct}-B_{cs}
\sim
N(0,c(t-s)).
$$

従って定数倍の Gaussian 分布の分散を計算すると

$$
X_t-X_s
\sim
N(0,t-s).
$$

また disjoint intervals は $t\mapsto ct$ でも disjoint のままなので、対応する $B$ の増分が独立であることから $X$ の増分も独立です。

最後に $t\mapsto ct$ と定数倍は連続性を保つので、$B$ の continuous path から $X$ も continuous path を持ちます。

よって $X$ は standard Brownian motion です。
<!-- solution-end -->

### A3. level hitting time は stopping time

$a>0$ とし

$$
\tau_a=\inf\{t\ge0:B_t=a\}
$$

とします。

path continuity を用いて $\tau_a$ が natural filtration $(\mathcal F_t^B)$ に関する stopping time であることを示してください。

- Level: A

<!-- solution-start -->
### 詳細解答

stopping time であることを示すには、任意の $t\ge0$ に対し

$$
\{\tau_a\le t\}\in\mathcal F_t^B
$$

を示せば十分です。

continuous path では level $a$ に時刻 $t$ までに到達することと、時刻 $t$ までの最大値が $a$ 以上になることは同値なので

$$
\{\tau_a\le t\}
=
\left\{
\sup_{0\le s\le t}B_s\ge a
\right\}.
$$

continuous function の supremum は dense subset 上の supremum と同じです。従って

$$
\sup_{0\le s\le t}B_s
=
\sup_{q\in\mathbb Q\cap[0,t]}B_q.
$$

よって

$$
\{\tau_a\le t\}
=
\bigcap_{n=1}^\infty
\bigcup_{q\in\mathbb Q\cap[0,t]}
\{B_q>a-1/n\}.
$$

各 $q\le t$ について $B_q$ は $\mathcal F_t^B$ 可測なので、右辺は $\mathcal F_t^B$ に属します。

従って $\tau_a$ は stopping time です。
<!-- solution-end -->

### A4. hitting time の累積分布関数

$a>0$ とします。

reflection principle を用いて

$$
P(\tau_a\le t)
=
2\left(
1-\Phi\left(\frac a{\sqrt t}\right)
\right)
$$

を導いてください。

- Level: A

<!-- solution-start -->
### 詳細解答

path continuity により

$$
\{\tau_a\le t\}
=
\left\{
\sup_{0\le s\le t}B_s\ge a
\right\}.
$$

reflection principle から

$$
P\left(
\sup_{0\le s\le t}B_s\ge a
\right)
=
2P(B_t\ge a).
$$

一方、

$$
\frac{B_t}{\sqrt t}
\sim
N(0,1).
$$

従って

$$
P(B_t\ge a)
=
P\left(
\frac{B_t}{\sqrt t}
\ge
\frac a{\sqrt t}
\right)
=
1-\Phi\left(\frac a{\sqrt t}\right).
$$

以上を合わせれば

$$
P(\tau_a\le t)
=
2\left(
1-\Phi\left(\frac a{\sqrt t}\right)
\right).
$$
<!-- solution-end -->

## Level B

### B1. finite-valued stopping time で strong Markov の核心を証明する

$\sigma$ が

$$
s_1<\cdots<s_r
$$

の有限個の値だけを取る stopping time とします。

$0\le t_1<\cdots<t_m$ と bounded Borel function
$g:\mathbb R^m\to\mathbb R$ に対し、

$$
g(
B_{\sigma+t_1}-B_\sigma,
\ldots,
B_{\sigma+t_m}-B_\sigma
)
$$

が $\mathcal F_\sigma^B$ と独立で、その期待値が

$$
E[g(B_{t_1},\ldots,B_{t_m})]
$$

に等しいことを示してください。

- Level: B

<!-- solution-start -->
### 詳細解答

$A\in\mathcal F_\sigma^B$ を任意に取ります。

各 $k$ について

$$
A_k=A\cap\{\sigma=s_k\}
$$

と置きます。

stopping-time sigma-field の定義から

$$
A_k\in\mathcal F_{s_k}^B.
$$

deterministic time $s_k$ の後の increments

$$
(B_{s_k+t_1}-B_{s_k},\ldots,B_{s_k+t_m}-B_{s_k})
$$

は $\mathcal F_{s_k}^B$ と独立で、stationary increments により

$$
(B_{t_1},\ldots,B_{t_m})
$$

と同じ law を持ちます。

従って

$$
\begin{aligned}
&E\left[
1_{A_k}
g(
B_{\sigma+t_1}-B_\sigma,
\ldots,
B_{\sigma+t_m}-B_\sigma
)
\right]\\
&=
P(A_k)E[g(B_{t_1},\ldots,B_{t_m})].
\end{aligned}
$$

$k=1,\ldots,r$ について足すと

$$
\begin{aligned}
&E\left[
1_A
g(
B_{\sigma+t_1}-B_\sigma,
\ldots,
B_{\sigma+t_m}-B_\sigma
)
\right]\\
&=
P(A)E[g(B_{t_1},\ldots,B_{t_m})].
\end{aligned}
$$

これは shifted vector と $\mathcal F_\sigma^B$ の独立性を表す積分等式です。
<!-- solution-end -->

### B2. time inversion の $t=0$ continuity

reflection principle と Borel--Cantelli lemma を用いて

$$
\frac{B_t}{t}\to0
\qquad(t\to\infty)
$$

almost surely を示し、

$$
\widehat B_t=tB_{1/t}
$$

が $t\downarrow0$ で 0 へ収束することを導いてください。

- Level: B

<!-- solution-start -->
### 詳細解答

まず integer times を見ると

$$
E[B_n^4]=3n^2.
$$

よって Markov inequality から

$$
P(|B_n|>\varepsilon n)
\le
\frac{3}{\varepsilon^4n^2}.
$$

右辺の和は収束するので Borel--Cantelli lemma により

$$
\frac{B_n}{n}\to0
$$

almost surely.

次に

$$
D_n=\sup_{0\le u\le1}|B_{n+u}-B_n|
$$

と置きます。

stationary increments と reflection principle から

$$
P(D_n>x)
\le
P\left(\sup_{0\le u\le1}B_u>x\right)
+
P\left(\inf_{0\le u\le1}B_u<-x\right)
=
4P(B_1>x).
$$

従って第4 moment による Markov inequality で

$$
P(D_n>\varepsilon n)
\le
\frac{12}{\varepsilon^4n^4}.
$$

これも可算和可能なので

$$
\frac{D_n}{n}\to0
$$

almost surely.

$t\in[n,n+1]$ なら

$$
\frac{|B_t|}{t}
\le
\frac{|B_n|+D_n}{n}.
$$

右辺は 0 へ収束するので

$$
\frac{B_t}{t}\to0.
$$

最後に $u=1/t$ と置けば

$$
tB_{1/t}
=
\frac{B_u}{u}.
$$

$t\downarrow0$ は $u\to\infty$ に対応するため

$$
tB_{1/t}\to0
$$

almost surely です。
<!-- solution-end -->

### B3. 0 へ無限回戻ることを strong Markov から示す

$+1,-1,+1,-1,\ldots$ を交互に hit する stopping times を構成し、Brownian motion が level 0 へ almost surely 無限回戻ることを示してください。

- Level: B

<!-- solution-start -->
### 詳細解答

まず

$$
\sigma_1=\inf\{t\ge0:B_t=1\}
$$

と置きます。

hitting time theorem から

$$
P(\sigma_1<\infty)=1.
$$

次に

$$
\sigma_2
=
\inf\{t\ge\sigma_1:B_t=-1\}.
$$

$\sigma_1<\infty$ 上で strong Markov property を使うと

$$
W_t=B_{\sigma_1+t}-B_{\sigma_1}
$$

は新しい Brownian motion です。

$B_{\sigma_1}=1$ なので、$B$ が $-1$ へ到達することは $W$ が $-2$ へ到達することと同値です。

$-W$ も Brownian motion であり level 2 の hitting probability は 1 なので

$$
P(\sigma_2<\infty\mid\mathcal F_{\sigma_1}^B)=1.
$$

同様に、$\sigma_3$ を $\sigma_2$ 後の $+1$ hitting time、以後交互に定義すると、帰納的に全ての $\sigma_n$ が finite almost surely です。

continuous path が $+1$ と $-1$ の間を移るたびに intermediate value theorem により level 0 を通ります。

もし $\sigma_n$ が有限時刻 $T$ に集積すれば、continuous function $B$ は compact interval $[0,T]$ 上で一様連続なのに、任意に短い時間間隔で値を 2 だけ変え続けることになり矛盾します。

従って

$$
\sigma_n\to\infty
$$

であり、その途中に level 0 への return が無限個存在します。
<!-- solution-end -->

## Level C

### C1. level hitting times の strong Markov 分解

$a,b>0$ とし

$$
\tau_a=\inf\{t\ge0:B_t=a\},
\qquad
\tau_{a+b}=\inf\{t\ge0:B_t=a+b\}
$$

とします。

1. $\tau_a<\infty$ almost surely を用いて、
   $\tau_{a+b}-\tau_a$ が $\mathcal F_{\tau_a}^B$ と独立であることを示してください。
2. $\tau_{a+b}-\tau_a$ の law が $\tau_b$ の law と同じであることを示してください。
3. 任意の $s,t>0$ に対し

$
P(
\tau_a\le s,\tau_{a+b}-\tau_a\le t
)
=
P(\tau_a\le s)P(\tau_b\le t)
$

を示し、右辺を $\Phi$ で明示してください。

- Level: C

<!-- solution-start -->
### 詳細解答

**1. strong Markov property を適用する。**

hitting time theorem から

$$
P(\tau_a<\infty)=1.
$$

従って strong Markov property を $\tau_a$ に適用できます。

$$
W_u
=
B_{\tau_a+u}-B_{\tau_a},
\qquad u\ge0
$$

は standard Brownian motion で、$\mathcal F_{\tau_a}^B$ と独立です。

**2. 次の level までの待ち時間を書き換える。**

$B_{\tau_a}=a$ almost surely なので

$$
\begin{aligned}
\tau_{a+b}-\tau_a
&=
\inf\{u\ge0:B_{\tau_a+u}=a+b\}\\
&=
\inf\{u\ge0:B_{\tau_a+u}-B_{\tau_a}=b\}\\
&=
\inf\{u\ge0:W_u=b\}.
\end{aligned}
$$

右辺は Brownian motion $W$ の level $b$ hitting time です。

したがって

$$
\tau_{a+b}-\tau_a
\overset{d}=\tau_b.
$$

しかも右辺を決める shifted process $W$ 全体が $\mathcal F_{\tau_a}^B$ と独立なので、

$$
\tau_{a+b}-\tau_a
$$

も $\mathcal F_{\tau_a}^B$ と独立です。

**3. joint probability を分解する。**

event $\{\tau_a\le s\}$ は $\mathcal F_{\tau_a}^B$ に属します。実際、任意の $u\ge0$ について

$
\{\tau_a\le s\}\cap\{\tau_a\le u\}
=
\{\tau_a\le \min(s,u)\}
\in
\mathcal F_u^B.
$

従って独立性から

$$
\begin{aligned}
&P(
\tau_a\le s,\tau_{a+b}-\tau_a\le t
)\\
&=
P(\tau_a\le s)
P(\tau_{a+b}-\tau_a\le t)\\
&=
P(\tau_a\le s)
P(\tau_b\le t).
\end{aligned}
$$

hitting time distribution を代入すると

$$
P(\tau_a\le s)
=
2\left(
1-\Phi\left(\frac a{\sqrt s}\right)
\right),
$$

$$
P(\tau_b\le t)
=
2\left(
1-\Phi\left(\frac b{\sqrt t}\right)
\right).
$$

従って

$$
\boxed{
P(
\tau_a\le s,\tau_{a+b}-\tau_a\le t
)
=
4
\left(
1-\Phi\left(\frac a{\sqrt s}\right)
\right)
\left(
1-\Phi\left(\frac b{\sqrt t}\right)
\right)
}.
$$

これは strong Markov property が「停止時刻の後ろを新しい独立な Brown 運動として再スタートできる」ことの具体的な計算例です。
<!-- solution-end -->
