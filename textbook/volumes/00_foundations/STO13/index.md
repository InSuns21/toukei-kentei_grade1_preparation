# STO13：ポアソン過程・連続時間マルコフ連鎖・ランダム測度 — 跳躍を「回数」と「印」で記述する

<!-- definition-example-audit: strict -->

> **既出概念への参照**：[マルチンゲール](../STO2/index.md#def-sto2-martingale)、[予測可能過程](../STO1/index.md#def-sto1-predictable)、[積測度](../F0_00D2C_積測度_Tonelli_Fubini/index.md#def-f0-00d2c-01) を直接参照します。一般の [マルコフ半群](../STO11/index.md#def-sto11-印ov-semigroup)・[生成作用素](../STO11/index.md#def-sto11-生成作用素) は後で対応関係を確認するための補助参照であり、本章の証明 prerequisite にはしません。

ブラウン運動では、非常に短い時間でも標本路は連続に揺れ続けます。

一方、電話の着信、故障、注文、放射性崩壊、保険事故のような現象では、

$$
\boxed{
\text{何も起こらない時間}
\quad\text{と}\quad
\text{突然の 跳躍}
}
$$

を分けて記述した方が自然です。

本章では最初に「何回起きたか」だけを記録するポアソン過程を作り、次に「どの状態へ飛んだか」を持つ連続時間マルコフ連鎖へ進みます。最後に 跳躍 に 印 を付けて、

$$
\boxed{
\text{時刻}
\times
\text{跳躍の種類}
}
$$

を一つのランダム測度として記録します。

中心線は

$$
\boxed{
\text{Poisson 計数ing}
\to
\text{compensator}
\to
\text{CTMC / }Q\text{-matrix}
\to
\text{ポアソンランダム測度}
\to
\text{補償ランダム測度}
}
$$

です。

STO14 では、このランダム測度を使って 跳躍型確率積分、Lévy 過程、Lévy--Itô 分解、跳躍を含む Itô 公式へ進みます。本章ではそこまで逆輸入しません。

---

## 1. ポアソン過程

率 $\lambda>0$ を固定します。

<a id="def-sto13-poisson-過程"></a>

<!-- formal-statement-start -->
> **定義（率 $\lambda$ のポアソン過程）**  
> 適合過程 $N=(N_t)_{t\ge0}$ が率 $\lambda$ のポアソン過程であるとは、次を満たすことをいう。
>
> 1. $N_0=0$ a.s.
> 2. 各標本路は右連続で非減少、値は $\mathbb Z_{\ge0}$ に属する。
> 3. $0\le t_0<t_1<\cdots<t_m$ に対し、増分
>
$$
N_{t_1}-N_{t_0},\ldots,N_{t_m}-N_{t_{m-1}}
$$
>
> は独立である。
> 4. $0\le s<t$ に対し
>
$$
N_t-N_s
\sim
\operatorname{Poisson}(\lambda(t-s)),
$$
>
> すなわち $k=0,1,2,\ldots$ に対して
>
$$
P(N_t-N_s=k)
=
e^{-\lambda(t-s)}
\frac{(\lambda(t-s))^k}{k!}.
$$
<!-- formal-statement-end -->

<!-- definition-example-start: def-sto13-poisson-過程 -->
### 直接例：短い時間では「0 回」か「1 回」が支配的

$h\downarrow0$ とします。

定義から

$$
P(N_{t+h}-N_t=0)=e^{-\lambda h}
=1-\lambda h+o(h),
$$

$$
P(N_{t+h}-N_t=1)
=
e^{-\lambda h}\lambda h
=
\lambda h+o(h),
$$

さらに

$$
P(N_{t+h}-N_t\ge2)
=
1-e^{-\lambda h}(1+\lambda h)
=
o(h).
$$

したがって infinitesimal な時間幅では

$$
\boxed{
0\text{ 回}:1-\lambda h+o(h),
\qquad
1\text{ 回}:\lambda h+o(h)
}
$$

であり、2 回以上は一次より小さい確率です。

これが後で CTMC の短時間遷移

$$
P_h(i,j)
=
\delta_{ij}+q_{ij}h+o(h)
$$

へ一般化されます。
<!-- definition-example-end -->

---

## 2. 到着時刻と exponential 待ち時間

$n$ 回目の 跳躍 時刻を

$$
T_n
=
\inf\{t\ge0:N_t\ge n\},
\qquad
T_0=0
$$

と置き、待ち時間を

$$
W_n=T_n-T_{n-1}
$$

と定めます。

<a id="thm-sto13-exponential-waiting"></a>

<!-- formal-statement-start -->
> **定理（ポアソン過程の待ち時間）**  
> $N$ を率 $\lambda$ のポアソン過程とする。
>
> このとき
>
$$
W_1,W_2,\ldots
$$
>
> は独立同分布で
>
$$
W_n\sim\operatorname{Exp}(\lambda),
$$
>
> すなわち $w\ge0$ について
>
$$
P(W_n>w)=e^{-\lambda w}.
$$
>
> また
>
$$
T_n=W_1+\cdots+W_n
$$
>
> の密度は
>
$$
f_{T_n}(t)
=
\frac{\lambda^n t^{n-1}}{(n-1)!}e^{-\lambda t},
\qquad t>0.
$$
<!-- formal-statement-end -->

### 証明の見取り図

まず

$$
\{T_1>t\}
=
\{N_t=0\}
$$

なので $W_1=T_1$ は exponential です。

一般の独立性は、順序付けた到着時刻 の 同時密度 を独立増分から求め、gap variables へ変数変換すると 積に分解 することから出します。

<!-- proof-start -->
### 証明

最初の待ち時間について

$$
\begin{aligned}
P(W_1>t)
&=
P(T_1>t)\\
&=
P(N_t=0)\\
&=
e^{-\lambda t}.
\end{aligned}
$$

したがって

$$
W_1\sim\operatorname{Exp}(\lambda).
$$

次に $0<t_1<\cdots<t_n$ を固定します。

小さい $h_1,\ldots,h_n>0$ を取り、各区間 $[t_k,t_k+h_k)$ にちょうど 1 跳躍があり、$[0,t_n+h_n]$ のそれ以外の部分に 跳躍がない事象を考えます。

独立増分より、その確率は

$$
\begin{aligned}
&
e^{-\lambda(t_n+o(1))}
\prod_{k=1}^n
\left(
\lambda h_k+o(h_k)
\right)\\
&=
\lambda^n e^{-\lambda t_n}
\prod_{k=1}^n h_k
+
o\left(\prod_{k=1}^n h_k\right).
\end{aligned}
$$

従って 順序付けた到着時刻 の 同時密度 は

$$
f_{T_1,\ldots,T_n}(t_1,\ldots,t_n)
=
\lambda^n e^{-\lambda t_n},
\qquad
0<t_1<\cdots<t_n.
$$

ここで

$$
w_1=t_1,
\qquad
w_k=t_k-t_{k-1}
\quad(k\ge2)
$$

と変数変換します。Jacobian は 1 で、

$$
t_n=w_1+\cdots+w_n.
$$

したがって

$$
\begin{aligned}
f_{W_1,\ldots,W_n}(w_1,\ldots,w_n)
&=
\lambda^n
e^{-\lambda(w_1+\cdots+w_n)}\\
&=
\prod_{k=1}^n
\lambda e^{-\lambda w_k},
\qquad
w_k>0.
\end{aligned}
$$

同時密度 が各変数の密度の積へ 積に分解 したので、

$$
W_1,\ldots,W_n
$$

は独立で各々 $\operatorname{Exp}(\lambda)$ に従います。

$n$ は任意なので全列が独立同分布です。

最後に $T_n=\sum_{k=1}^nW_k$ なので、独立 exponential の convolution から

$$
f_{T_n}(t)
=
\frac{\lambda^n t^{n-1}}{(n-1)!}e^{-\lambda t}.
$$

これは shape $n$、率 $\lambda$ の gamma density です。
<!-- proof-end -->

この定理により、ポアソン過程は

$$
\boxed{
\text{計数の側}
\leftrightarrow
\text{exponential 待ち時間 の側}
}
$$

の二つの見方を持ちます。

---

## 3. 補償ポアソン過程

ポアソン過程の平均は

$$
E[N_t]=\lambda t.
$$

したがって 中心化 過程

$$
M_t=N_t-\lambda t
$$

を考えるのが自然です。

<a id="prop-sto13-compensated-poisson-martingale"></a>

<!-- formal-statement-start -->
> **命題（補償ポアソン過程はマルチンゲール）**  
> $N$ を率 $\lambda$ のポアソン過程とし、
>
$$
\mathcal F_t^N
=
\sigma(N_s:0\le s\le t)
$$
>
> を自然なフィルトレーションとする。
>
> このとき
>
$$
M_t=N_t-\lambda t
$$
>
> は $(\mathcal F_t^N)$-マルチンゲールである。
<!-- formal-statement-end -->

<!-- proof-start -->
### 証明

$s<t$ とします。

独立増分より

$$
N_t-N_s
$$

は $\mathcal F_s^N$ と独立で、

$$
E[N_t-N_s]
=
\lambda(t-s).
$$

従って

$$
\begin{aligned}
E[M_t\mid\mathcal F_s^N]
&=
E[N_t-\lambda t\mid\mathcal F_s^N]\\
&=
N_s
+
E[N_t-N_s\mid\mathcal F_s^N]
-\lambda t\\
&=
N_s+\lambda(t-s)-\lambda t\\
&=
N_s-\lambda s\\
&=
M_s.
\end{aligned}
$$

また $E|M_t|<\infty$ は $E[N_t]=\lambda t<\infty$ から従います。

したがって $M$ はマルチンゲールです。
<!-- proof-end -->

この $\lambda t$ は「平均を引いただけ」に見えますが、確率解析ではより構造的に **compensator** と呼びます。

---

## 4. 計数過程の補償過程

<a id="def-sto13-compensator"></a>

<!-- formal-statement-start -->
> **定義（計数過程の補償過程）**  
> $N$ を適合した計数過程とする。
>
> $A=(A_t)_{t\ge0}$ が $N$ の **補償過程** であるとは、
>
> 1. $A_0=0$,
> 2. $A$ は予測可能で非減少,
> 3. $N-A$ が局所マルチンゲール,
>
> を満たすことをいう。
<!-- formal-statement-end -->

<!-- definition-example-start: def-sto13-compensator -->
### 直接例：ポアソン過程では $A_t=\lambda t$

$A_t=\lambda t$ は deterministic continuous 過程 なので予測可能で、非減少です。

前節で

$$
N_t-\lambda t
$$

が実際にマルチンゲールであることを証明しました。

したがって

$$
\boxed{
A_t=\lambda t
}
$$

は率 $\lambda$ のポアソン過程の補償過程です。

「観測計数」から「予測可能な平均蓄積量」を引くことで martingale noise が残る、と読めます。
<!-- definition-example-end -->

一般の point 過程 では $A_t$ は deterministic とは限りません。

例えば時刻 $t$ 直前の情報に依存する 強度 $\lambda_t$ を持つ場合、適切な条件下で

$$
A_t=\int_0^t\lambda_s\,ds
$$

が補償過程になります。

本章では一般の Doob--Meyer 理論までは証明せず、ポアソン過程と後の有限状態 CTMC で補償の具体形を追います。

---

## 5. 連続時間マルコフ連鎖と Q-matrix

ここから有限状態空間

$$
S=\{1,\ldots,m\}
$$

を固定します。

<a id="def-sto13-ctmc-qmatrix"></a>

<!-- formal-statement-start -->
> **定義（有限状態 Q-matrix と連続時間マルコフ連鎖）**  
> 行列
>
$$
Q=(q_{ij})_{i,j\in S}
$$
>
> が Q-matrix であるとは、
>
$$
q_{ij}\ge0
\qquad(i\ne j),
$$
>
> かつ
>
$$
q_{ii}
=
-\sum_{j\ne i}q_{ij}
$$
>
> を満たすことをいう。
>
> 率
>
$$
q_i:=-q_{ii}
=
\sum_{j\ne i}q_{ij}
$$
>
> を 状態 $i$ からの total 跳躍率 と呼ぶ。
>
> $S$-値 càdlàg 過程 $X=(X_t)$ がこの Q-matrix を持つ連続時間マルコフ連鎖であるとは、時間一様 Markov property を持ち、短時間遷移が
>
$$
P(X_{t+h}=j\mid X_t=i)
=
\delta_{ij}+q_{ij}h+o(h)
$$
>
> を満たすことをいう。
<!-- formal-statement-end -->

<!-- definition-example-start: def-sto13-ctmc-qmatrix -->
### 直接例：二状態 switching chain

$$
S=\{1,2\},
\qquad
Q=
\begin{pmatrix}
-\alpha & \alpha\\
\beta & -\beta
\end{pmatrix},
\qquad
\alpha,\beta>0
$$

とします。

状態 1 では 率 $\alpha$ で 2 へ移り、状態 2 では 率 $\beta$ で 1 へ戻ります。

短時間 $h$ では

$$
P(X_{t+h}=2\mid X_t=1)
=
\alpha h+o(h),
$$

$$
P(X_{t+h}=1\mid X_t=1)
=
1-\alpha h+o(h).
$$

したがって $q_1=\alpha$、$q_2=\beta$ です。

この「stay probability の一次項が 対角、跳躍確率 の一次項が 非対角」という構造が Q-matrix の意味です。
<!-- definition-example-end -->

---

## 6. 跳躍連鎖 と 滞在時間

Q-matrix から、離散時間の 跳躍連鎖 と各状態での滞在時間を読み出せます。

$q_i>0$ のとき

$$
p_{ij}
=
\frac{q_{ij}}{q_i}
\qquad(j\ne i),
\qquad
p_{ii}=0
$$

と置きます。

$q_i=0$ の 状態 は absorbing とし、

$$
p_{ii}=1
$$

とします。

<a id="thm-sto13-ctmc-construction"></a>

<!-- formal-statement-start -->
> **定理（有限状態 CTMC の 跳躍-chain / holding-time 構成）**  
> 有限状態 Q-matrix $Q$ を与える。
>
> 遷移確率 $P=(p_{ij})$ を上の式で定め、離散時間 Markov chain
>
$$
Y_0,Y_1,\ldots
$$
>
> を 遷移行列 $P$ で取る。
>
> 独立な $\operatorname{Exp}(1)$ 変数 $E_0,E_1,\ldots$ を $Y$ と独立に取り、
>
$$
H_n=
\begin{cases}
E_n/q_{Y_n}, & q_{Y_n}>0,\\
+\infty, & q_{Y_n}=0
\end{cases}
$$
>
> とする。
>
> 跳躍時刻
>
$$
T_0=0,
\qquad
T_{n+1}=T_n+H_n
$$
>
> を定め、
>
$$
X_t=Y_n
\qquad
(T_n\le t<T_{n+1})
$$
>
> と置く。
>
> このとき有限時間内に無限個の 跳躍は起こらず、$X$ は Q-matrix $Q$ を持つ時間一様連続時間マルコフ連鎖である。
<!-- formal-statement-end -->

### 証明の見取り図

有限状態なので

$$
q_*=\max_i q_i<\infty.
$$

各 滞在時間 は 率 が高々 $q_*$ なので、共通の $\operatorname{Exp}(1)$ 変数を使えば

$$
H_n\ge E_n/q_*.
$$

右辺の和は無限大へ発散するため explosion は起きません。

Markov property は exponential distribution の 無記憶性 が担います。

<!-- proof-start -->
### 証明

まず

$$
q_*=\max_{i\in S}q_i<\infty
$$

です。

$q_{Y_n}>0$ なら

$$
H_n
=
\frac{E_n}{q_{Y_n}}
\ge
\frac{E_n}{q_*}.
$$

したがって

$$
T_n
=
\sum_{k=0}^{n-1}H_k
\ge
\frac1{q_*}\sum_{k=0}^{n-1}E_k.
$$

ここで
$$
S_n=\sum_{k=0}^{n-1}E_k
$$
と置きます。任意の $a>0$ について Markov inequality を $e^{-S_n}$ に使うと
$$
\begin{aligned}
P(S_n\le a)
&=
P(e^{-S_n}\ge e^{-a})\\
&\le
e^aE[e^{-S_n}]\\
&=
e^a\left(E[e^{-E_0}]\right)^n\\
&=
e^a2^{-n}.
\end{aligned}
$$
従って固定した $a$ について
$$
P\left(\sup_nS_n\le a\right)
=
\lim_{n\to\infty}P(S_n\le a)
=
0.
$$
$a=1,2,\ldots$ の可算和を取れば
$$
S_n\to\infty
\qquad\text{a.s.}
$$
です。よって
$$
T_n\ge \frac{S_n}{q_*}\to\infty
\qquad\text{a.s.}
$$
です。

よって有限時間内に無限個の 跳躍は起こりません。

次に現在 状態 が $i$ であるとします。

その 状態 での残り 滞在時間 は exponential distribution の 無記憶性 により、経過時間に依存せず再び $\operatorname{Exp}(q_i)$ です。

跳躍が起きたとき次 状態 は $p_{ij}$ で選ばれ、過去とは条件付き独立です。

したがって未来の分布は現在 状態 $i$ のみに依存し、時間一様 Markov property が成り立ちます。

最後に短時間 $h$ の遷移を計算します。

$i\ne j$ に対し、$i$ から最初の 跳躍が $[0,h]$ に起こり、その行き先が $j$ である確率は

$$
\left(1-e^{-q_i h}\right)p_{ij}
=
q_i h\,p_{ij}+o(h)
=
q_{ij}h+o(h).
$$

二回以上の 跳躍が起こる確率は $O(h^2)$ です。

実際、各 滞在時間 は $E/q_*$ 以上なので、二回 跳躍する事象は独立 $\operatorname{Exp}(q_*)$ 二個の和が $h$ 以下である事象に含まれ、その確率は $O(h^2)$ です。

従って

$$
P(X_h=j\mid X_0=i)
=
q_{ij}h+o(h)
\qquad(i\ne j).
$$

一方

$$
P(X_h=i\mid X_0=i)
=
1-q_i h+o(h)
=
1+q_{ii}h+o(h).
$$

よって

$$
P(X_h=j\mid X_0=i)
=
\delta_{ij}+q_{ij}h+o(h).
$$

したがって $X$ の Q-matrix は $Q$ です。
<!-- proof-end -->

---

## 7. 生成作用素としての Q

関数

$$
f:S\to\mathbb R
$$

を column vector と同一視します。

Q-matrix の作用は

$$
(Qf)(i)
=
\sum_{j\in S}q_{ij}f(j)
$$

です。

行和 が 0 なので

$$
\begin{aligned}
(Qf)(i)
&=
\sum_{j\ne i}q_{ij}f(j)
-q_i f(i)\\
&=
\sum_{j\ne i}
q_{ij}
\bigl(f(j)-f(i)\bigr).
\end{aligned}
$$

この形は「状態 $i$ から $j$ へ 率 $q_{ij}$ で 跳躍するときの $f$ の変化率」の総和です。

短時間式から

$$
\begin{aligned}
E_i[f(X_h)]
&=
\sum_j
\left(
\delta_{ij}+q_{ij}h+o(h)
\right)f(j)\\
&=
f(i)+h(Qf)(i)+o(h),
\end{aligned}
$$

従って

$$
\boxed{
(Qf)(i)
=
\lim_{h\downarrow0}
\frac{E_i[f(X_h)]-f(i)}{h}
}
$$

です。

これは [STO11 の一般の生成作用素](../STO11/index.md#def-sto11-生成作用素) の有限状態版そのものです。

---

## 8. Kolmogorov backward / forward equations

遷移確率を

$$
P_t(i,j)
=
P(X_t=j\mid X_0=i)
$$

と書き、行列

$$
P_t=(P_t(i,j))_{i,j\in S}
$$

を考えます。

<a id="thm-sto13-kolmogorov-equations"></a>

<!-- formal-statement-start -->
> **定理（有限状態 CTMC の Kolmogorov 方程式）**  
> 有限状態 Q-matrix $Q$ を持つ CTMC の 遷移行列 $(P_t)_{t\ge0}$ は
>
$$
P_0=I
$$
>
> と
>
$$
\boxed{
\frac{d}{dt}P_t
=
QP_t
}
$$
>
> を満たす。これを Kolmogorov backward equation と呼ぶ。
>
> また
>
$$
\boxed{
\frac{d}{dt}P_t
=
P_tQ
}
$$
>
> も満たす。これを Kolmogorov forward equation と呼ぶ。
>
> 従って
>
$$
\boxed{
P_t=e^{tQ}
=
\sum_{n=0}^\infty
\frac{t^nQ^n}{n!}.
}
$$
<!-- formal-statement-end -->

### 証明の見取り図

Markov property から semigroup law

$$
P_{s+t}=P_sP_t
$$

が成り立ちます。

短時間展開

$$
P_h=I+hQ+o(h)
$$

を左から入れるか右から入れるかで backward / forward の二式が出ます。

<!-- proof-start -->
### 証明

Markov property より

$$
P_{t+h}=P_hP_t.
$$

したがって

$$
\begin{aligned}
\frac{P_{t+h}-P_t}{h}
&=
\frac{P_h-I}{h}P_t.
\end{aligned}
$$

短時間遷移式から

$$
\frac{P_h-I}{h}\to Q
\qquad(h\downarrow0),
$$

よって

$$
\frac{d}{dt}P_t=QP_t.
$$

一方 semigroup law を

$$
P_{t+h}=P_tP_h
$$

と書けば

$$
\frac{P_{t+h}-P_t}{h}
=
P_t\frac{P_h-I}{h},
$$

なので

$$
\frac{d}{dt}P_t=P_tQ.
$$

有限次元の線形 ODE

$$
P_t'=QP_t,
\qquad
P_0=I
$$

の一意解は 行列指数関数

$$
e^{tQ}
=
\sum_{n=0}^\infty\frac{t^nQ^n}{n!}
$$

です。

実際 項別微分 により

$$
\frac{d}{dt}e^{tQ}
=
Qe^{tQ},
\qquad
e^{0Q}=I.
$$

したがって

$$
P_t=e^{tQ}.
$$

行列指数関数 は $Q$ と可換なので

$$
Qe^{tQ}=e^{tQ}Q
$$

となり、forward equation も同じ解で満たされます。
<!-- proof-end -->

---

## 9. 二状態 chain を完全に解く

前の例

$$
Q=
\begin{pmatrix}
-\alpha & \alpha\\
\beta & -\beta
\end{pmatrix}
$$

を解きます。

定常ベクトル は

$$
\pi
=
\left(
\frac{\beta}{\alpha+\beta},
\frac{\alpha}{\alpha+\beta}
\right)
$$

です。

初期状態 1 について

$$
p(t)=P_1(X_t=1)
$$

と置くと forward equation から

$$
p'(t)
=
-\alpha p(t)+\beta(1-p(t))
=
\beta-(\alpha+\beta)p(t).
$$

$p(0)=1$ なので

$$
p(t)
=
\frac{\beta}{\alpha+\beta}
+
\frac{\alpha}{\alpha+\beta}
e^{-(\alpha+\beta)t}.
$$

従って

$$
P_t
=
\begin{pmatrix}
\frac{\beta}{\alpha+\beta}
+
\frac{\alpha}{\alpha+\beta}e^{-ct}
&
\frac{\alpha}{\alpha+\beta}(1-e^{-ct})
\\
\frac{\beta}{\alpha+\beta}(1-e^{-ct})
&
\frac{\alpha}{\alpha+\beta}
+
\frac{\beta}{\alpha+\beta}e^{-ct}
\end{pmatrix},
$$

ただし

$$
c=\alpha+\beta.
$$

$t\to\infty$ では各 行 が $\pi$ へ収束します。

連続時間でも「生成作用素 の固有値が 緩和率 を決める」という線形代数構造がそのまま現れています。

---

## 10. ポアソン過程は pure-birth CTMC である

状態空間を

$$
S=\mathbb Z_{\ge0}
$$

とし、

$$
q_{n,n+1}=\lambda,
\qquad
q_{nn}=-\lambda
$$

以外を 0 とします。

すると

$$
(Qf)(n)
=
\lambda
\bigl(f(n+1)-f(n)\bigr).
$$

この chain は 状態 $n$ に $\operatorname{Exp}(\lambda)$ 時間滞在して必ず $n+1$ へ 跳躍 します。

したがって 跳躍回数 自身が 率 $\lambda$ のポアソン過程です。

有限状態 CTMC の議論をそのまま 計数able 状態 へ移すには explosion の検討が必要ですが、この例では 滞在時間 が iid $\operatorname{Exp}(\lambda)$ なので

$$
T_n=W_1+\cdots+W_n\to\infty
$$

a.s. であり、explosion は起きません。

---

## 11. 可算状態 Q-matrix では explosion があり得る

有限状態では 率 が一様有界だったため、自動的に non-explosive でした。

計数able 状態 では違います。

pure-birth rates

$$
q_{n,n+1}=n^2,
\qquad
q_{nn}=-n^2
$$

を考えます。

状態 $n$ での 滞在時間 $H_n$ は

$$
H_n\sim\operatorname{Exp}(n^2)
$$

で

$$
E[H_n]=\frac1{n^2}.
$$

従って explosion time

$$
T_\infty
=
\sum_{n=1}^\infty H_n
$$

について Tonelli により

$$
E[T_\infty]
=
\sum_{n=1}^\infty\frac1{n^2}
<\infty.
$$

非負 random variable が有限期待値を持つので

$$
T_\infty<\infty
\qquad\text{a.s.}
$$

です。

つまり有限時間内に無限個の 跳躍が起こります。

したがって

$$
\boxed{
\text{可算状態 Q-matrix}
\not\Rightarrow
\text{自動的 non-explosive 過程}
}
$$

です。

これが本章で CTMC の核心定理を有限状態で閉じる理由です。

---

## 12. ポアソンランダム測度

計数 $N_t$ だけでは、跳躍の大きさや種類を記録できません。

印空間 $(E,\mathcal E)$ と $\sigma$-finite measure $\nu$ を取ります。

時間と 印 の積空間

$$
(0,\infty)\times E
$$

上に random 計数ing measure を置きます。

<a id="def-sto13-poisson-random-measure"></a>

<!-- formal-statement-start -->
> **定義（ポアソンランダム測度）**  
> $(E,\mathcal E,\nu)$ を $\sigma$-finite measure space とする。
>
> ランダム測度 $N(ds,dz)$ が 強度測度
>
$$
ds\,\nu(dz)
$$
>
> を持つポアソンランダム測度であるとは、有限 強度 を持つ可測集合
>
$$
B\subset(0,\infty)\times E,
\qquad
(\operatorname{Leb}\times\nu)(B)<\infty
$$
>
> に対して
>
$$
N(B)
\sim
\operatorname{Poisson}
\left(
(\operatorname{Leb}\times\nu)(B)
\right),
$$
>
> かつ pairwise disjoint な有限 強度 sets
>
$$
B_1,\ldots,B_k
$$
>
> に対して
>
$$
N(B_1),\ldots,N(B_k)
$$
>
> が独立であることをいう。
<!-- formal-statement-end -->

<!-- definition-example-start: def-sto13-poisson-random-measure -->
### 直接例：印 が $+1$ と $-1$ だけの場合

$$
E=\{-1,+1\}
$$

とし、

$$
\nu(\{+1\})=\lambda p,
\qquad
\nu(\{-1\})=\lambda(1-p)
$$

とします。

すると

$$
N_t^+
=
N((0,t]\times\{+1\}),
$$

$$
N_t^-
=
N((0,t]\times\{-1\})
$$

はそれぞれ 率 $\lambda p$ と $\lambda(1-p)$ の独立ポアソン過程です。

総計数

$$
N_t^++N_t^-
$$

は 率 $\lambda$ のポアソン過程です。

一方 signed 跳躍和

$$
X_t=N_t^+-N_t^-
$$

は $+1$ 跳躍と $-1$ 跳躍の両方を記録します。

単なる 計数 から 印ed 跳躍過程 へ進む最小例です。
<!-- definition-example-end -->

任意の $A\in\mathcal E$ で $\nu(A)<\infty$ なら

$$
N_t(A)
=
N((0,t]\times A)
$$

は 率 $\nu(A)$ のポアソン過程です。

---

## 13. 補償ポアソンランダム測度

<a id="def-sto13-compensated-prm"></a>

<!-- formal-statement-start -->
> **定義（補償ポアソンランダム測度）**  
> $N(ds,dz)$ を 強度 $ds\,\nu(dz)$ のポアソンランダム測度とする。
>
> 有限 強度 set $B$ に対して
>
$$
\widetilde N(B)
=
N(B)
-
(\operatorname{Leb}\times\nu)(B)
$$
>
> と置く。
>
> この 中心化 ランダム測度 を補償ポアソンランダム測度と呼び、形式的に
>
$$
\boxed{
\widetilde N(ds,dz)
=
N(ds,dz)-ds\,\nu(dz)
}
$$
>
> と書く。
>
> 無限 強度 set では右辺を 各点ごと な差としてではなく、可積分な integrand に対する積分として解釈する。
<!-- formal-statement-end -->

<!-- definition-example-start: def-sto13-compensated-prm -->
### 直接例：有限 印 set の 中心化した計数

前節の $E=\{-1,+1\}$ では

$$
\widetilde N_t^+
=
N_t^+-\lambda pt,
$$

$$
\widetilde N_t^-
=
N_t^--\lambda(1-p)t
$$

です。

それぞれ前半で証明した補償ポアソンマルチンゲールです。

したがって

$$
\widetilde X_t
=
\widetilde N_t^+
-
\widetilde N_t^-
$$

もマルチンゲールで、

$$
\widetilde X_t
=
X_t
-
\lambda(2p-1)t.
$$

補償は「各 印 の平均 跳躍 流量を引く」操作になっています。
<!-- definition-example-end -->

---

## 14. 単関数型被積分関数 に対する compensated integral

STO14 の一般 跳躍型確率積分へ進む前に、決定論的単関数型被積分関数 で核心を確認します。

互いに素な有限 強度 sets

$$
B_1,\ldots,B_r
\subset
(0,T]\times E
$$

と係数 $c_1,\ldots,c_r\in\mathbb R$ を取り、

$$
f(s,z)
=
\sum_{k=1}^r
c_k1_{B_k}(s,z)
$$

とします。

積分を

$$
\int_{(0,T]\times E}
f(s,z)\widetilde N(ds,dz)
:=
\sum_{k=1}^r
c_k\widetilde N(B_k)
$$

と定義します。

<a id="thm-sto13-prm-simple-等長性"></a>

<!-- formal-statement-start -->
> **定理（補償ポアソンランダム測度の 単関数に対する $L^2$ 等長性）**  
> 上の deterministic 単関数型 $f$ に対し
>
$$
E\left[
\int f\,d\widetilde N
\right]
=
0,
$$
>
> かつ
>
$$
\boxed{
E\left[
\left(
\int f\,d\widetilde N
\right)^2
\right]
=
\int_{(0,T]\times E}
f(s,z)^2\,ds\,\nu(dz).
}
$$
>
> さらに
>
$$
M_t
=
\int_{(0,t]\times E}
f(s,z)\widetilde N(ds,dz)
$$
>
> は自然なフィルトレーションに関する二乗可積分マルチンゲールである。
<!-- formal-statement-end -->

### 証明の見取り図

disjoint sets 上の Poisson 計数 は独立です。

Poisson variable $K\sim\operatorname{Poisson}(\mu)$ について

$$
E[K-\mu]=0,
\qquad
\operatorname{Var}(K)=\mu.
$$

したがって 中心化した計数 の 交差項s が消え、分散だけが 強度測度 と一致します。

<!-- proof-start -->
### 証明

$$
\mu_k
=
(\operatorname{Leb}\times\nu)(B_k)
$$

と置きます。

すると

$$
N(B_k)\sim\operatorname{Poisson}(\mu_k)
$$

なので

$$
E[\widetilde N(B_k)]=0,
$$

$$
E[\widetilde N(B_k)^2]
=
\mu_k.
$$

また $B_k$ が互いに素なので

$$
\widetilde N(B_1),\ldots,\widetilde N(B_r)
$$

は独立です。

従って $k\ne\ell$ では

$$
E[\widetilde N(B_k)\widetilde N(B_\ell)]
=
0.
$$

よって

$$
\begin{aligned}
E\left[
\left(
\sum_{k=1}^r
c_k\widetilde N(B_k)
\right)^2
\right]
&=
\sum_{k=1}^r
c_k^2
E[\widetilde N(B_k)^2]\\
&=
\sum_{k=1}^r
c_k^2\mu_k.
\end{aligned}
$$

一方 $B_k$ は disjoint なので

$$
\int f^2\,ds\,\nu(dz)
=
\sum_{k=1}^r
c_k^2\mu_k.
$$

従って 等長性 が示されました。

平均 0 も各項の平均 0 から直ちに従います。

最後に $0\le s<t\le T$ とします。

increment

$$
M_t-M_s
$$

は $(s,t]\times E$ 上の compensated 計数 の有限線形結合であり、$[0,s]\times E$ から生成される過去の情報と独立、かつ平均 0 です。

したがって

$$
E[M_t-M_s\mid\mathcal F_s]=0,
$$

つまり

$$
E[M_t\mid\mathcal F_s]=M_s.
$$

二乗可積分性は 等長性 から従います。
<!-- proof-end -->

STO14 ではこの 等長性 を 完備化 に使い、ランダムな予測可能被積分関数 まで拡張します。

ブラウン積分の STO6 と全く同じ設計思想が再登場することに注目してください。

---

## 15. 複合ポアソン過程 は ランダム測度 integral で書ける

$\nu(E)=\lambda<\infty$ とします。

probability measure

$$
\mu(dz)
=
\frac{\nu(dz)}{\lambda}
$$

を 印の分布 と考えます。

$$
X_t
=
\int_{(0,t]\times E}
z\,N(ds,dz)
$$

と置くと、これは 率 $\lambda$ の 跳躍時刻 ごとに iid 印 $Z_k\sim\mu$ を足す 過程 です。

つまり

$$
X_t
=
\sum_{k=1}^{N_t}Z_k.
$$

<a id="prop-sto13-compound-poisson"></a>

<!-- formal-statement-start -->
> **命題（複合ポアソン過程 の特性関数と補償）**  
> $\nu(E)<\infty$ とし、
>
$$
X_t
=
\int_{(0,t]\times E}
z\,N(ds,dz)
$$
>
> とする。
>
> 任意の $u\in\mathbb R$ について
>
$$
\boxed{
E[e^{iuX_t}]
=
\exp\left(
t\int_E
(e^{iuz}-1)\nu(dz)
\right).
}
$$
>
> さらに
>
$$
\int_E|z|\,\nu(dz)<\infty
$$
>
> なら
>
$$
\boxed{
X_t
-
t\int_E z\,\nu(dz)
}
$$
>
> はマルチンゲールである。
<!-- formal-statement-end -->

<!-- proof-start -->
### 証明

$\lambda=\nu(E)$ とし、$\mu=\nu/\lambda$ とします。

$N_t\sim\operatorname{Poisson}(\lambda t)$ とし、印 $Z_k$ は iid $\mu$ です。

$$
\varphi_Z(u)
=
E[e^{iuZ_1}]
=
\int_E e^{iuz}\mu(dz)
$$

と置きます。

$N_t=n$ で条件付けると

$$
E[e^{iuX_t}\mid N_t=n]
=
\varphi_Z(u)^n.
$$

従って

$$
\begin{aligned}
E[e^{iuX_t}]
&=
\sum_{n=0}^\infty
e^{-\lambda t}
\frac{(\lambda t)^n}{n!}
\varphi_Z(u)^n\\
&=
\exp\left(
\lambda t(\varphi_Z(u)-1)
\right).
\end{aligned}
$$

ここで

$$
\lambda\varphi_Z(u)
=
\int_E e^{iuz}\nu(dz)
$$

なので

$$
\lambda(\varphi_Z(u)-1)
=
\int_E(e^{iuz}-1)\nu(dz).
$$

したがって

$$
E[e^{iuX_t}]
=
\exp\left(
t\int_E(e^{iuz}-1)\nu(dz)
\right).
$$

次に $\int|z|\,d\nu<\infty$ とします。

$0\le s<t$ では increment

$$
X_t-X_s
$$

は $(s,t]\times E$ の ポアソンランダム測度 だけで決まり、過去と独立です。

また

$$
E[X_t-X_s]
=
(t-s)\int_E z\,\nu(dz).
$$

従って

$$
\begin{aligned}
&E\left[
X_t-t\int_Ez\,\nu(dz)
\mid\mathcal F_s
\right]\\
&=
X_s
+
E[X_t-X_s]
-
t\int_Ez\,\nu(dz)\\
&=
X_s
-
s\int_Ez\,\nu(dz).
\end{aligned}
$$

よって compensated 過程 はマルチンゲールです。
<!-- proof-end -->

この 特性指数 は STO14 の Lévy--Khintchine formula の finite-activity 部分になります。

---

## 16. 三つの「生成作用素」を同じ目で見る

ここまでの三例を並べます。

### ポアソン 計数

$$
(Qf)(n)
=
\lambda(f(n+1)-f(n)).
$$

### 有限状態 CTMC

$$
(Qf)(i)
=
\sum_{j\ne i}
q_{ij}(f(j)-f(i)).
$$

### 複合ポアソン 跳躍過程

形式的には

$$
(Lf)(x)
=
\int_E
\left(
f(x+z)-f(x)
\right)\nu(dz).
$$

いずれも

$$
\boxed{
\text{跳躍率}
\times
\text{跳躍後と 跳躍前の function value の差}
}
$$

を足し合わせています。

ブラウン拡散の 生成作用素

$$
Lf
=
b\cdot\nabla f
+
\frac12
\operatorname{tr}(aD^2f)
$$

とは見た目が大きく違いますが、「短時間の条件付き平均変化率」という定義は共通です。

これが STO11 の 生成作用素理論 と STO14 の Lévy 生成作用素 をつなぐ接点です。

---

## 17. 仮定を外すとどこが壊れるか

### 17.1 独立増分 を外す

各 $N_t$ の marginal distribution が

$$
N_t\sim\operatorname{Poisson}(\lambda t)
$$

であっても、それだけでは ポアソン過程 ではありません。

時間方向の dependence があれば

$$
E[N_t-N_s\mid\mathcal F_s]
=
\lambda(t-s)
$$

とは限らず、

$$
N_t-\lambda t
$$

の martingale property も壊れます。

### 17.2 Q-matrix だけでは 可算状態 chain の global existence は出ない

前節の $q_n=n^2$ pure-birth chain では explosion が起こります。

したがって 計数able 状態 で 生成作用素 を与えるときは non-explosion 条件が別に必要です。

### 17.3 補償 measure を 各点ごと に引き算しない

$\nu(E)=\infty$ なら

$$
N((0,t]\times E)
$$

も 強度 も無限になり得ます。

このとき

$$
N-dt\,\nu
$$

を「$\infty-\infty$」の 各点ごと signed measure と読むのは誤りです。

可積分性 条件を満たす integrand に対して compensated integral を定義する必要があります。

STO14 の $L^2$ construction はまさにこの問題を処理します。

---

## 18. STO14 への橋

本章で得た道具は

$$
\widetilde N(ds,dz)
=
N(ds,dz)-ds\,\nu(dz)
$$

までです。

次章では

$$
\int_0^t\int_E
H(s,z)\widetilde N(ds,dz)
$$

を random predictable $H$ へ拡張します。

そこから

- 複合ポアソン過程
- Lévy 過程
- infinitely divisible law
- Lévy--Khintchine formula
- Lévy measure
- finite / infinite activity
- Lévy--Itô decomposition
- 跳躍セミマルチンゲール の Itô formula

へ進みます。

本章の 単関数に対する $L^2$ 等長性 は、その拡張の出発点です。

---

## 19. 演習

#### STO13-A01 Poisson 計数 と 待ち時間
- Level: A
- 目安時間: 15分

率 $\lambda>0$ のポアソン過程 $N$ について次を示せ。

1. $P(N_t=0)=e^{-\lambda t}$。
2. 最初の 到着時刻 $T_1$ は $\operatorname{Exp}(\lambda)$ に従う。
3. $E[T_1]=1/\lambda$。
4. $P(T_1>s+t\mid T_1>s)=P(T_1>t)$ を確認せよ。

<!-- solution-start -->
### 詳細解答

1. 定義で $N_t\sim\operatorname{Poisson}(\lambda t)$ なので

$$
P(N_t=0)
=
e^{-\lambda t}.
$$

2. 事象

$$
\{T_1>t\}
$$

は時刻 $t$ まで 跳躍が 1 回もない事象なので

$$
\{T_1>t\}
=
\{N_t=0\}.
$$

従って

$$
P(T_1>t)
=
e^{-\lambda t}.
$$

これは 率 $\lambda$ の exponential distribution の 生存関数 です。

3. 非負 random variable の tail integral formula より

$$
E[T_1]
=
\int_0^\infty
P(T_1>t)\,dt
=
\int_0^\infty
e^{-\lambda t}\,dt
=
\frac1\lambda.
$$

4.

$$
\begin{aligned}
P(T_1>s+t\mid T_1>s)
&=
\frac{e^{-\lambda(s+t)}}{e^{-\lambda s}}\\
&=
e^{-\lambda t}\\
&=
P(T_1>t).
\end{aligned}
$$

したがって exponential 待ち時間 は 無記憶 です。
<!-- solution-end -->

#### STO13-A02 compensated Poisson martingale
- Level: A
- 目安時間: 15分

率 $\lambda$ のポアソン過程 $N$ と

$$
M_t=N_t-\lambda t
$$

を考える。

1. $E[M_t]=0$ を示せ。
2. $0\le s<t$ について $E[M_t\mid\mathcal F_s^N]=M_s$ を示せ。
3. $\operatorname{Var}(M_t)=\lambda t$ を求めよ。

<!-- solution-start -->
### 詳細解答

1.

$$
E[M_t]
=
E[N_t]-\lambda t
=
\lambda t-\lambda t
=
0.
$$

2. 独立増分より

$$
N_t-N_s
$$

は $\mathcal F_s^N$ と独立で

$$
E[N_t-N_s]
=
\lambda(t-s).
$$

従って

$$
\begin{aligned}
E[M_t\mid\mathcal F_s^N]
&=
N_s+\lambda(t-s)-\lambda t\\
&=
N_s-\lambda s\\
&=
M_s.
\end{aligned}
$$

3. deterministic term は variance に影響しないので

$$
\operatorname{Var}(M_t)
=
\operatorname{Var}(N_t).
$$

Poisson variable の variance は mean と同じだから

$$
\boxed{
\operatorname{Var}(M_t)=\lambda t.
}
$$
<!-- solution-end -->

#### STO13-A03 二状態 CTMC
- Level: A
- 目安時間: 20分

$$
Q=
\begin{pmatrix}
-\alpha & \alpha\\
\beta & -\beta
\end{pmatrix}
$$

を考える。

1. 滞在時間分布 を各 状態 で答えよ。
2. 跳躍連鎖 の 遷移行列 を求めよ。
3. $p(t)=P_1(X_t=1)$ が満たす ODE を書け。
4. $p(t)$ を解け。

<!-- solution-start -->
### 詳細解答

1. 状態 1 の total 跳躍率 は

$$
q_1=\alpha,
$$

状態 2 では

$$
q_2=\beta.
$$

従って 滞在時間 はそれぞれ

$$
\operatorname{Exp}(\alpha),
\qquad
\operatorname{Exp}(\beta)
$$

です。

2. 状態 1 からは 跳躍 すれば必ず 2 へ、状態 2 からは必ず 1 へ行くので

$$
P=
\begin{pmatrix}
0&1\\
1&0
\end{pmatrix}.
$$

3. forward equation から

$$
p'(t)
=
-\alpha p(t)+\beta(1-p(t))
=
\beta-(\alpha+\beta)p(t).
$$

初期状態 1 なので

$$
p(0)=1.
$$

4. 平衡 value は

$$
p_*=\frac{\beta}{\alpha+\beta}.
$$

したがって

$$
p'(t)
=
-(\alpha+\beta)(p(t)-p_*).
$$

よって

$$
p(t)-p_*
=
(1-p_*)e^{-(\alpha+\beta)t}.
$$

従って

$$
\boxed{
p(t)
=
\frac{\beta}{\alpha+\beta}
+
\frac{\alpha}{\alpha+\beta}
e^{-(\alpha+\beta)t}.
}
$$
<!-- solution-end -->

#### STO13-A04 finite 印空間 の PRM
- Level: A
- 目安時間: 18分

$$
E=\{a,b\},
\qquad
\nu(\{a\})=\lambda_a,
\qquad
\nu(\{b\})=\lambda_b
$$

とする。

1. $N_t^a=N((0,t]\times\{a\})$ の分布を求めよ。
2. $N_t^b$ の分布を求めよ。
3. $N_t^a,N_t^b$ が独立であることを説明せよ。
4. $N_t=N_t^a+N_t^b$ の分布を求めよ。

<!-- solution-start -->
### 詳細解答

1. set $(0,t]\times\{a\}$ の 強度 は

$$
t\nu(\{a\})
=
\lambda_a t.
$$

よって

$$
N_t^a
\sim
\operatorname{Poisson}(\lambda_a t).
$$

2. 同様に

$$
N_t^b
\sim
\operatorname{Poisson}(\lambda_b t).
$$

3. sets

$$
(0,t]\times\{a\},
\qquad
(0,t]\times\{b\}
$$

は disjoint です。

PRM の定義より、その 計数 は独立です。

4. 独立 Poisson variables の和は mean の和を持つ Poisson variable なので

$$
\boxed{
N_t
\sim
\operatorname{Poisson}
((\lambda_a+\lambda_b)t).
}
$$

また PRM の定義から直接

$$
N_t
=
N((0,t]\times E)
$$

の 強度 が $(\lambda_a+\lambda_b)t$ と読むこともできます。
<!-- solution-end -->

#### STO13-B01 Q-matrix から 跳躍 construction
- Level: B
- 目安時間: 30分

$$
S=\{1,2,3\},
\qquad
Q=
\begin{pmatrix}
-3&1&2\\
4&-4&0\\
0&5&-5
\end{pmatrix}
$$

とする。

1. 各 状態 の total 跳躍率 $q_i$ を求めよ。
2. 跳躍連鎖 遷移行列 $P$ を求めよ。
3. 状態 1 から最初の 跳躍 までの平均時間を求めよ。
4. 状態 1 から最初の 跳躍が 状態 3 へ行く確率を求めよ。
5. 短時間で $P(X_h=3\mid X_0=1)=2h+o(h)$ となることを確認せよ。

<!-- solution-start -->
### 詳細解答

1.

$$
q_1=3,
\qquad
q_2=4,
\qquad
q_3=5.
$$

2. 非対角 rates を total 率 で割るので

$$
P=
\begin{pmatrix}
0&1/3&2/3\\
1&0&0\\
0&1&0
\end{pmatrix}.
$$

3. 状態 1 の 滞在時間 は $\operatorname{Exp}(3)$ なので

$$
E[H_0\mid Y_0=1]
=
\frac13.
$$

4. 最初の 跳躍の行き先は 跳躍連鎖 の 第1行 に従うので

$$
P(Y_1=3\mid Y_0=1)
=
\frac23.
$$

5. 最初の 跳躍が $h$ までに起こる確率は

$$
1-e^{-3h}
=
3h+o(h).
$$

その行き先が 3 である 条件付き確率 は $2/3$ です。

したがって one-跳躍 contribution は

$$
(3h+o(h))\frac23
=
2h+o(h).
$$

二回以上 跳躍する確率は $O(h^2)=o(h)$ なので

$$
\boxed{
P(X_h=3\mid X_0=1)
=
2h+o(h).
}
$$
<!-- solution-end -->

#### STO13-B02 Kolmogorov 方程式と stationary law
- Level: B
- 目安時間: 30分

二状態 生成作用素

$$
Q=
\begin{pmatrix}
-\alpha & \alpha\\
\beta & -\beta
\end{pmatrix}
$$

について、

1. 定常分布 $\pi=(\pi_1,\pi_2)$ を $\pi Q=0$ と $\pi_1+\pi_2=1$ から求めよ。
2. $P_t(1,2)$ を求めよ。
3. $t\to\infty$ で $P_t(1,\cdot)\to\pi$ を確認せよ。
4. 緩和率 が $\alpha+\beta$ であることを説明せよ。

<!-- solution-start -->
### 詳細解答

1.

$$
\pi Q=0
$$

から

$$
-\alpha\pi_1+\beta\pi_2=0.
$$

従って

$$
\alpha\pi_1=\beta\pi_2.
$$

正規化条件と合わせると

$$
\boxed{
\pi_1=\frac{\beta}{\alpha+\beta},
\qquad
\pi_2=\frac{\alpha}{\alpha+\beta}.
}
$$

2. 前の exercise で

$$
P_t(1,1)
=
\frac{\beta}{\alpha+\beta}
+
\frac{\alpha}{\alpha+\beta}
e^{-(\alpha+\beta)t}
$$

を得ました。

行和 は 1 なので

$$
\begin{aligned}
P_t(1,2)
&=
1-P_t(1,1)\\
&=
\frac{\alpha}{\alpha+\beta}
\left(
1-e^{-(\alpha+\beta)t}
\right).
\end{aligned}
$$

3. $t\to\infty$ で exponential term は 0 へ行くので

$$
P_t(1,1)\to
\frac{\beta}{\alpha+\beta}
=
\pi_1,
$$

$$
P_t(1,2)\to
\frac{\alpha}{\alpha+\beta}
=
\pi_2.
$$

4. 平衡 からの偏差は

$$
P_t(1,1)-\pi_1
=
\frac{\alpha}{\alpha+\beta}
e^{-(\alpha+\beta)t}.
$$

従って 減衰指数 は

$$
\boxed{
\alpha+\beta
}
$$

です。

生成作用素 $Q$ の固有値は $0$ と $-(\alpha+\beta)$ であり、非零固有値が 緩和率 を与えています。
<!-- solution-end -->

#### STO13-B03 compensated PRM の 等長性
- Level: B
- 目安時間: 30分

互いに disjoint な finite-強度 sets $B_1,B_2$ と

$$
f=c_1 1_{B_1}+c_2 1_{B_2}
$$

を考える。

$$
\mu_k
=
(\operatorname{Leb}\times\nu)(B_k)
$$

とする。

1. $\int f\,d\widetilde N$ を 中心化した計数 で書け。
2. その期待値が 0 であることを示せ。
3. その二乗平均を求めよ。
4. $\int f^2\,ds\,\nu(dz)$ と一致することを確認せよ。

<!-- solution-start -->
### 詳細解答

1. 定義から

$$
\int f\,d\widetilde N
=
c_1\widetilde N(B_1)
+
c_2\widetilde N(B_2).
$$

また

$$
\widetilde N(B_k)
=
N(B_k)-\mu_k.
$$

2.

$$
E[N(B_k)]=\mu_k
$$

なので

$$
E[\widetilde N(B_k)]=0.
$$

従って

$$
E\left[\int f\,d\widetilde N\right]
=
0.
$$

3. $B_1,B_2$ は disjoint なので 計数 は独立です。

従って 中心化した計数 も独立で 交差項 の期待値は 0 です。

また

$$
E[\widetilde N(B_k)^2]
=
\operatorname{Var}(N(B_k))
=
\mu_k.
$$

よって

$$
\boxed{
E\left[
\left(
\int f\,d\widetilde N
\right)^2
\right]
=
c_1^2\mu_1+c_2^2\mu_2.
}
$$

4. disjointness から

$$
f^2
=
c_1^2 1_{B_1}
+
c_2^2 1_{B_2}.
$$

したがって

$$
\int f^2\,ds\,\nu(dz)
=
c_1^2\mu_1+c_2^2\mu_2.
$$

前問と一致します。
<!-- solution-end -->

#### STO13-C01 複合ポアソン過程 を ランダム測度 から再構成する
- Level: C
- 目安時間: 50分

$\nu(E)=\lambda<\infty$ とし、$\mu=\nu/\lambda$ とする。

$N(ds,dz)$ を 強度 $ds\,\nu(dz)$ の PRM とし、

$$
X_t
=
\int_{(0,t]\times E}
z\,N(ds,dz)
$$

とする。

さらに

$$
\int_E z^2\,\nu(dz)<\infty
$$

を仮定する。

1. total 跳躍回数
   $$
   K_t=N((0,t]\times E)
   $$
   が 率 $\lambda$ の ポアソン過程 であることを示せ。
2. 条件付きで $K_t=n$ で、$X_t$ が iid $\mu$ 印 の和として表されることを説明せよ。
3. 特性関数
   $$
   E[e^{iuX_t}]
   $$
   を計算せよ。
4. 
   $$
   m=\int_Ez\,\nu(dz)
   $$
   と置き、
   $$
   M_t=X_t-tm
   $$
   が martingale であることを示せ。
5. 
   $$
   E[M_t^2]
   =
   t\int_E z^2\,\nu(dz)
   $$
   を示せ。

<!-- solution-start -->
### 詳細解答

1. set $(0,t]\times E$ の 強度 は

$$
(\operatorname{Leb}\times\nu)
\bigl((0,t]\times E\bigr)
=
t\nu(E)
=
\lambda t.
$$

したがって

$$
K_t
\sim
\operatorname{Poisson}(\lambda t).
$$

また disjoint time intervals の rectangles は disjoint なので increments は独立です。

よって $(K_t)$ は 率 $\lambda$ の ポアソン過程 です。

2. 有限強度 PRM では、各 point の 印の分布 は normalized 強度

$$
\mu(dz)
=
\frac{\nu(dz)}{\lambda}
$$

です。

したがって $K_t=n$ の条件下で 印 を $Z_1,\ldots,Z_n$ と書けば

$$
Z_1,\ldots,Z_n
\stackrel{\mathrm{iid}}{\sim}
\mu
$$

で

$$
X_t
=
\sum_{k=1}^{n}Z_k.
$$

つまり 無条件では には

$$
X_t
=
\sum_{k=1}^{K_t}Z_k.
$$

3.

$$
\varphi_Z(u)
=
E[e^{iuZ_1}]
=
\int_Ee^{iuz}\mu(dz)
$$

と置きます。

条件付きで $K_t=n$ では

$$
E[e^{iuX_t}\mid K_t=n]
=
\varphi_Z(u)^n.
$$

従って

$$
\begin{aligned}
E[e^{iuX_t}]
&=
\sum_{n=0}^\infty
e^{-\lambda t}
\frac{(\lambda t)^n}{n!}
\varphi_Z(u)^n\\
&=
\exp\left(
\lambda t(\varphi_Z(u)-1)
\right).
\end{aligned}
$$

さらに

$$
\lambda\varphi_Z(u)
=
\int_Ee^{iuz}\nu(dz)
$$

なので

$$
\boxed{
E[e^{iuX_t}]
=
\exp\left(
t\int_E
(e^{iuz}-1)\nu(dz)
\right).
}
$$

4. $0\le s<t$ とします。

increment

$$
X_t-X_s
$$

は $(s,t]\times E$ 上の PRM だけで決まり、$\mathcal F_s$ と独立です。

期待値は

$$
E[X_t-X_s]
=
(t-s)\int_Ez\,\nu(dz)
=
(t-s)m.
$$

従って

$$
\begin{aligned}
E[M_t\mid\mathcal F_s]
&=
X_s+(t-s)m-tm\\
&=
X_s-sm\\
&=
M_s.
\end{aligned}
$$

よって $M$ は martingale です。

5. 補償ランダム測度 を使えば

$$
M_t
=
\int_{(0,t]\times E}
z\,\widetilde N(ds,dz).
$$

まず $z$ を deterministic 単関数 で $L^2(\nu)$ 近似します。

単関数型 等長性 から近似列 $f_n$ に対し

$$
E\left[
\left(
\int f_n\,d\widetilde N
\right)^2
\right]
=
\int f_n^2\,ds\,\nu(dz).
$$

両辺で $L^2$ limit を取ると

$$
E[M_t^2]
=
\int_0^t\int_E z^2\,\nu(dz)\,ds.
$$

したがって

$$
\boxed{
E[M_t^2]
=
t\int_Ez^2\,\nu(dz).
}
$$

ここで使った 完備化 は deterministic $L^2$ integrand に限る最小限のものです。ランダムな予測可能被積分関数 への一般拡張は STO14 で行います。
<!-- solution-end -->

---

## 20. まとめ

本章で得た最小構造は次です。

$$
\boxed{
N_t-\lambda t
\text{ はマルチンゲール}
}
$$

$$
\boxed{
Qf(i)
=
\sum_{j\ne i}
q_{ij}(f(j)-f(i))
}
$$

$$
\boxed{
P_t=e^{tQ},
\qquad
P_t'=QP_t=P_tQ
}
$$

$$
\boxed{
\widetilde N(ds,dz)
=
N(ds,dz)-ds\,\nu(dz)
}
$$

$$
\boxed{
E\left[
\left(
\int f\,d\widetilde N
\right)^2
\right]
=
\int f^2\,ds\,\nu(dz)
}
$$

連続 path の世界では Brownian motion と quadratic variation が中心でした。

跳躍 path の世界では

$$
\boxed{
\text{計数}
+
\text{rate}
+
\text{印}
+
\text{compensation}
}
$$

が基本語彙になります。

次の STO14 では、この語彙を Lévy 過程 と 跳躍 stochastic calculus へ持ち上げます。
