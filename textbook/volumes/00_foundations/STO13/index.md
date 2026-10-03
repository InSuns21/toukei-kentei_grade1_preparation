# STO13 ポアソン過程・連続時間マルコフ連鎖・ランダム測度

<!-- definition-example-audit: strict -->

> **既出概念への参照**：[マルチンゲール](../STO2/index.md#def-sto2-martingale)、[予測可能過程](../STO1/index.md#def-sto1-predictable)、[積測度](../F0_00D2C_積測度_Tonelli_Fubini/index.md#def-f0-00d2c-01) を直接参照します。一般の [マルコフ半群](../STO11/index.md#def-sto11-markov-semigroup)・[生成作用素](../STO11/index.md#def-sto11-generator) は後で対応関係を確認するための補助参照であり、本章の証明 prerequisite にはしません。

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

本章では最初に「何回起きたか」だけを記録する基本的な計数モデルを作り、次に「どの状態へ飛んだか」を持つ有限状態の跳躍モデルへ進みます。最後に跳躍へ印を付けて、

$$
\boxed{
\text{時刻}
\times
\text{跳躍 の種類}
}
$$

を一つのランダム測度として記録します。

中心線は

$$
\boxed{
\text{計数モデル}
\to
\text{平均成分の補正}
\to
\text{有限状態の跳躍モデル}
\to
\text{時刻と印の点配置}
\to
\text{中心化されたランダム測度}
}
$$

です。

STO14 では、このランダム測度を使う跳躍型の積分理論と Lévy 理論へ進みます。本章ではそこまで逆輸入しません。

---

### 本章で使うマルチンゲールの範囲

[STO2 のマルチンゲール](../STO2/index.md#def-sto2-martingale)は離散時間で定義しました。本章では同じ条件を連続時間添字へそのまま拡張し、

$$
E|M_t|<\infty,
\qquad
E[M_t\mid\mathcal F_s]=M_s
\quad(0\le s\le t)
$$

を満たす適合過程をマルチンゲールと呼びます。

本章で必要なのはこの条件付き期待値の等式を具体的に検証することだけです。連続局所マルチンゲールや Doob--Meyer 分解の一般論は使いません。

## 1. 独立定常増分を持つ計数モデル

率 $\lambda>0$ を固定します。

<a id="def-sto13-poisson-process"></a>

<!-- formal-statement-start -->
> **定義（ポアソン過程）**  
> $\lambda>0$ とし、フィルトレーション付き確率空間
>
$$
(\Omega,\mathcal F,(\mathcal F_t)_{t\ge0},P)
$$
>
> 上の適合過程 $N=(N_t)_{t\ge0}$ を考える。$N$ が率 $\lambda$ のポアソン過程であるとは、次を満たすことをいう。
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

<!-- definition-example-start: def-sto13-poisson-process -->
### 直接例：短い時間では「0 回」か「1 回」が支配的

**定義の確認**

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

これが後で有限状態の跳躍モデルに現れる短時間遷移

$$
P_h(i,j)
=
\delta_{ij}+q_{ij}h+o(h)
$$

へ一般化されます。
<!-- definition-example-end -->

---

## 2. 到着時刻と指数待ち時間

$n$ 回目の跳躍時刻を

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
> $N$ を率 $\lambda$ のポアソン過程とする。$n\ge1$ に対し到着時刻と待ち時間を
>
$$
T_n
=
\inf\{t\ge0:N_t\ge n\},
\qquad
T_0=0,
$$
>
$$
W_n=T_n-T_{n-1}
$$
>
> と定める。このとき
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

一般の独立性は、順序付き到着時刻の同時密度 を独立増分から求め、待ち時間変数 へ変数変換すると 積へ分解されることから出します。

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

小さい $h_1,\ldots,h_n>0$ を取り、各区間 $[t_k,t_k+h_k)$ にちょうど 1 跳躍 があり、$[0,t_n+h_n]$ のそれ以外の部分に 跳躍 がない事象を考えます。

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

従って 順序付き到着時刻の同時密度 は

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

同時密度が各変数の密度の積へ分解されたので、

$$
W_1,\ldots,W_n
$$

は独立で各々 $\operatorname{Exp}(\lambda)$ に従います。

$n$ は任意なので全列が独立同分布です。

最後に $T_n=\sum_{k=1}^nW_k$ の密度を、独立な和の密度を表す積分から確認します。$n=1$ では

$$
f_{T_1}(t)
=
\lambda e^{-\lambda t},
\qquad
t>0.
$$

$n$ で

$$
f_{T_n}(t)
=
\frac{\lambda^n t^{n-1}}{(n-1)!}e^{-\lambda t}
$$

と仮定すると、$T_n$ と $W_{n+1}$ は独立なので

$$
\begin{aligned}
f_{T_{n+1}}(t)
&=
\int_0^t
f_{T_n}(u)
\lambda e^{-\lambda(t-u)}du\\
&=
\frac{\lambda^{n+1}e^{-\lambda t}}{(n-1)!}
\int_0^t u^{n-1}du\\
&=
\frac{\lambda^{n+1}t^n}{n!}e^{-\lambda t}.
\end{aligned}
$$

従って帰納法により

$$
f_{T_n}(t)
=
\frac{\lambda^n t^{n-1}}{(n-1)!}e^{-\lambda t},
\qquad
t>0.
$$

これは 形状母数 $n$、率 $\lambda$ のガンマ分布の密度です。
<!-- proof-end -->

この定理により、ポアソン過程は

$$
\boxed{
\text{計数の側}
\leftrightarrow
\text{指数待ち時間 の側}
}
$$

の二つの見方を持ちます。

---

## 3. 補償ポアソン過程

ポアソン過程の平均は

$$
E[N_t]=\lambda t.
$$

したがって平均成分を差し引いた過程

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

この $\lambda t$ は単に平均を引くための項ではなく、予測可能な平均蓄積分を差し引く役割を持ちます。次節でこの構造を定義します。

---

## 4. 予測可能な平均成分を差し引く

ポアソン過程では $\lambda t$ を引くとマルチンゲールが残りました。一般の計数過程では、平均の蓄積速度が一定とは限りません。そこで「過去の情報から予測できる非減少な蓄積量」を $A$ として切り出し、$N-A$ が平均0の揺らぎになることを要求します。

<a id="def-sto13-compensator"></a>

<!-- formal-statement-start -->
> **定義（計数過程の補償過程）**  
> フィルトレーション $(\mathcal F_t)_{t\ge0}$ に適合した計数過程 $N$ が各 $t$ で可積分であるとする。
>
> 適合過程 $A=(A_t)_{t\ge0}$ が $N$ の **補償過程** であるとは、
>
> 1. $A_0=0$,
> 2. $A$ は予測可能で非減少,
> 3. 各 $t$ で $E[A_t]<\infty$,
> 4. $N-A$ が $(\mathcal F_t)$-マルチンゲール,
>
> を満たすことをいう。
<!-- formal-statement-end -->

<!-- definition-example-start: def-sto13-compensator -->
### 直接例：ポアソン過程では $A_t=\lambda t$

**定義の確認**

$A_t=\lambda t$ は決定論的連続過程なので予測可能で、非減少です。また $E[A_t]=\lambda t<\infty$ です。

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

「観測された計数」から「予測可能な平均蓄積量」を引くことで、マルチンゲールとしての揺らぎが残る、と読めます。
<!-- definition-example-end -->

ここでは可積分な計数過程に対する基本形だけを扱っています。一般の局所マルチンゲール補償や Doob--Meyer 理論は本章の prerequisite にしません。

一般の点過程 では $A_t$ は 決定論的とは限りません。

例えば時刻 $t$ 直前の情報に依存する 強度過程 $\lambda_t$ を持つ場合、適切な条件下で

$$
A_t=\int_0^t\lambda_s\,ds
$$

が補償過程になります。

本章では一般の Doob--Meyer 理論までは証明せず、ポアソン過程と後の有限状態跳躍モデルで補償の具体形を追います。

---

## 5. 有限状態の連続時間跳躍モデル

ポアソン過程は「何回起きたか」を数えますが、各事象の後に **どの状態へ移ったか** は記録しません。有限個の状態を行き来する系を扱うには、現在の状態 $i$ ごとに「次に $j$ へ跳ぶ速さ」を持たせる必要があります。

そこで有限状態空間

$$
S=\{1,\ldots,m\}
$$

を固定し、状態間の跳躍率を一つの行列へまとめます。

<a id="def-sto13-ctmc-qmatrix"></a>

<!-- formal-statement-start -->
> **定義（有限状態 Q-行列と連続時間マルコフ連鎖）**  
> 有限状態空間を
>
$$
S=\{1,\ldots,m\}
$$
>
> とする。行列
>
$$
Q=(q_{ij})_{i,j\in S}
$$
>
> が Q-行列であるとは、
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
> を状態 $i$ からの **総跳躍率** と呼ぶ。
>
> $S$-値 càdlàg 過程 $X=(X_t)$ がこの Q-行列を持つ連続時間マルコフ連鎖であるとは、時間一様なマルコフ性を持ち、その遷移確率
>
$$
P_h(i,j)
:=
P_i(X_h=j)
$$
>
> が各 $i,j\in S$ について
>
$$
P_h(i,j)
=
\delta_{ij}+q_{ij}h+o(h)
\qquad
(h\downarrow0)
$$
>
> を満たすことをいう。ここで $P_i$ は $X_0=i$ から出発する法則を表す。
<!-- formal-statement-end -->

<!-- definition-example-start: def-sto13-ctmc-qmatrix -->
### 直接例：二状態 二状態切替過程

**定義の確認**

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
P_h(1,2)
=
\alpha h+o(h),
$$

$$
P_h(1,1)
=
1-\alpha h+o(h).
$$

状態2についても短時間遷移を直接書くと

$$
P_h(2,1)=\beta h+o(h),
\qquad
P_h(2,2)=1-\beta h+o(h).
$$

従って $q_1=\alpha$、$q_2=\beta$ です。

「同じ状態にとどまる確率」の一次項が対角成分、「別状態へ跳ぶ確率」の一次項が非対角成分に対応します。
<!-- definition-example-end -->

以下では連続時間マルコフ連鎖（continuous-time Markov chain）を **CTMC** と略記します。

---

## 6. 跳躍連鎖と滞在時間

Q-行列から、離散時間の跳躍連鎖 と各状態での滞在時間を読み出せます。

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

$q_i=0$ の状態は吸収状態 とし、

$$
p_{ii}=1
$$

とします。

<a id="thm-sto13-ctmc-construction"></a>

<!-- formal-statement-start -->
> **定理（有限状態 CTMC の跳躍連鎖・滞在時間構成）**  
> 有限状態空間 $S=\{1,\ldots,m\}$ 上の Q-行列 $Q=(q_{ij})_{i,j\in S}$ を与え、
>
$$
q_i=-q_{ii}=\sum_{j\ne i}q_{ij}
$$
>
> と置く。$q_i>0$ なら
>
$$
p_{ij}
=
\frac{q_{ij}}{q_i}
\quad(j\ne i),
\qquad
p_{ii}=0,
$$
>
> $q_i=0$ なら $p_{ii}=1$ とし、他の $p_{ij}=0$ とする。この遷移行列 $P=(p_{ij})$ を持つ離散時間マルコフ連鎖
>
$$
Y_0,Y_1,\ldots
$$
>
> を取る。
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
> このとき有限時間内に無限個の跳躍 は起こらず、$X$ は Q-行列$Q$ を持つ時間一様な連続時間マルコフ連鎖である。
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

右辺の和は無限大へ発散するため、有限時間内に無限回の跳躍は起きません。

マルコフ性を支えるのは指数分布の無記憶性です。

<!-- proof-start -->
### 証明

まず

$$
q_*=\max_{i\in S}q_i<\infty
$$

です。

$q_*=0$ なら全ての状態が吸収状態 であり、標本路は一定なので非爆発性もマルコフ性も自明です。以下では $q_*>0$ とします。

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
と置きます。任意の $a>0$ について マルコフ inequality を $e^{-S_n}$ に使うと
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

よって有限時間内に無限個の跳躍 は起こりません。

次に現在状態 が $i$ であるとします。

その状態での残り滞在時間は指数分布の無記憶性により、すでに滞在した時間に依存せず再び $\operatorname{Exp}(q_i)$ に従います。

跳躍が起きたときの次状態は、現在状態 $i$ を固定すると確率 $p_{ij}$ で選ばれ、構成に使った離散時間マルコフ連鎖の性質から、それ以前の履歴には依存しません。

従って「次の跳躍までの時間」と「次の状態」の条件付き法則は現在状態 $i$ だけで決まり、時間一様なマルコフ性が成り立ちます。

最後に短時間 $h$ の遷移を計算します。

$i\ne j$ に対し、$i$ から最初の跳躍 が $[0,h]$ に起こり、その行き先が $j$ である確率は

$$
\left(1-e^{-q_i h}\right)p_{ij}
=
q_i h\,p_{ij}+o(h)
=
q_{ij}h+o(h).
$$

二回以上の跳躍 が起こる確率は $O(h^2)$ です。

実際、各 滞在時間 は $E/q_*$ 以上なので、二回 跳躍 する事象は独立 $\operatorname{Exp}(q_*)$ 二個の和が $h$ 以下である事象に含まれ、その確率は $O(h^2)$ です。

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

したがって $X$ の Q-行列は $Q$ です。
<!-- proof-end -->

---

## 7. 生成作用素としての $Q$

関数

$$
f:S\to\mathbb R
$$

を列ベクトルと同一視します。

Q-行列の作用は

$$
(Qf)(i)
=
\sum_{j\in S}q_{ij}f(j)
$$

です。

各行の和が 0 なので

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

この形は「状態 $i$ から $j$ へ 率 $q_{ij}$ で跳躍 するときの $f$ の変化率」の総和です。

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

これは [STO11 の一般の生成作用素](../STO11/index.md#def-sto11-generator) の有限状態版そのものです。

---

## 8. Kolmogorov 後退・前進方程式

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
> 有限状態空間 $S=\{1,\ldots,m\}$ 上の Q-行列 $Q$ を持つ CTMC $X$ を考える。各 $i,j\in S$ に対し
>
$$
P_t(i,j)
:=
P_i(X_t=j)
$$
>
> と置き、遷移行列を $P_t=(P_t(i,j))_{i,j\in S}$ とする。このとき $(P_t)_{t\ge0}$ は
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
> を満たす。これを Kolmogorov 後退方程式 と呼ぶ。
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
> も満たす。これを Kolmogorov 前進方程式 と呼ぶ。

<!-- formal-statement-end -->

### 証明の見取り図

マルコフ性から 半群則

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

マルコフ性 より

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

一方 半群則 を

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

以上で後退方程式と前進方程式の両方が得られました。
<!-- proof-end -->

有限次元では、この時間発展を級数から直接書けます。まず

$$
R_t
:=
\sum_{n=0}^\infty
\frac{t^nQ^n}{n!}
$$

と置きます。行列ノルムを一つ固定します。$|t|\le T$ なら

$$
\left\|
\frac{t^nQ^n}{n!}
\right\|
\le
\frac{T^n\|Q\|^n}{n!},
$$

また $n\ge1$ では微分後の項について

$$
\left\|
\frac{t^{n-1}Q^n}{(n-1)!}
\right\|
\le
\|Q\|
\frac{T^{n-1}\|Q\|^{n-1}}{(n-1)!}.
$$

右辺を $n$ について足した級数はそれぞれ

$$
e^{T\|Q\|},
\qquad
\|Q\|e^{T\|Q\|}
$$

で有限です。従って行列の各成分について通常のべき級数と同じように項別微分でき、

$$
R_t'
=
QR_t
=
R_tQ,
\qquad
R_0=I
$$

を得ます。同様に

$$
\frac{d}{dt}R_{-t}
=
-QR_{-t}.
$$

$R_t$ と $R_{-t}$ はどちらも $Q$ のべき級数なので $Q$ と可換です。従って

$$
\begin{aligned}
\frac{d}{dt}(R_{-t}R_t)
&=
(-QR_{-t})R_t+R_{-t}(QR_t)\\
&=
0.
\end{aligned}
$$

$t=0$ では $R_0R_0=I$ だから

$$
R_{-t}R_t=I.
$$

一方、上で証明した後退方程式 $P_t'=QP_t$ を使うと

$$
\begin{aligned}
\frac{d}{dt}(R_{-t}P_t)
&=
(-QR_{-t})P_t+R_{-t}(QP_t)\\
&=
0.
\end{aligned}
$$

$t=0$ で $R_0P_0=I$ なので

$$
R_{-t}P_t=I.
$$

左から $R_t$ を掛けると

$$
P_t=R_t.
$$

この級数を通常の記法で $e^{tQ}$ と書けば

$$
\boxed{
P_t=e^{tQ}
}
$$

です。短時間の一次変化 $Q$ が、級数を通して全時間の遷移 $P_t$ を決めていることが分かります。

<a id="prop-sto13-ctmc-generator-martingale"></a>

<!-- formal-statement-start -->
> **命題（有限状態 CTMC の生成作用素マルチンゲール）**  
> 有限状態空間 $S$ 上の Q-行列 $Q$ を持つ CTMC $X$ と関数 $f:S\to\mathbb R$ を考える。自然なフィルトレーションを
>
$$
\mathcal F_t^X
=
\sigma(X_u:0\le u\le t)
$$
>
> とする。このとき
>
$$
M_t^f
=
f(X_t)-f(X_0)
-
\int_0^t(Qf)(X_s)\,ds
$$
>
> は $(\mathcal F_t^X)$-マルチンゲールである。
<!-- formal-statement-end -->

### 証明の見取り図

有限状態なので $f$ と $Qf$ は 有界 です。マルコフ性 と Kolmogorov 前進方程式 を使うと、時刻 $s$ 以後の $f(X)$ の平均変化と $Qf$ の時間積分の平均が同じになります。

<!-- proof-start -->
### 証明

$0\le s<t$ とします。マルコフ性 より

$$
E[f(X_t)\mid\mathcal F_s^X]
=
(P_{t-s}f)(X_s).
$$

従って

$$
E[f(X_t)-f(X_s)\mid\mathcal F_s^X]
=
(P_{t-s}f-f)(X_s).
$$

一方、有限状態なので $Qf$ は 有界 です。したがって 条件付き Fubini が使え、

$$
\begin{aligned}
E\left[
\int_s^t(Qf)(X_r)\,dr
\middle|
\mathcal F_s
\right]
&=
\int_s^t
E[(Qf)(X_r)\mid\mathcal F_s^X]\,dr\\
&=
\int_0^{t-s}
(P_uQf)(X_s)\,du.
\end{aligned}
$$

前節の 前進方程式

$$
\frac{d}{du}P_u=P_uQ
$$

から

$$
\frac{d}{du}(P_uf)=P_uQf.
$$

よって

$$
\int_0^{t-s}P_uQf\,du
=
P_{t-s}f-f.
$$

したがって

$$
E[M_t^f-M_s^f\mid\mathcal F_s^X]=0.
$$

$f,Qf$ は 有界 なので $M_t^f$ は可積分です。従って $M^f$ はマルチンゲールです。
<!-- proof-end -->


---

## 9. 二状態連鎖 を完全に解く

前の例

$$
Q=
\begin{pmatrix}
-\alpha & \alpha\\
\beta & -\beta
\end{pmatrix}
$$

を解きます。

定常分布は

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

と置くと 前進方程式 から

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

$t\to\infty$ では各行が $\pi$ へ収束します。

連続時間でも「生成作用素の固有値が 緩和率 を決める」という線形代数構造がそのまま現れています。

---

## 10. ポアソン過程は純粋出生 CTMC である

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

この連鎖は 状態 $n$ に $\operatorname{Exp}(\lambda)$ 時間滞在して必ず $n+1$ へ跳躍 します。

したがって 跳躍計数自身が 率 $\lambda$ のポアソン過程です。

有限状態 CTMC の議論をそのまま 可算状態へ移すには爆発 の検討が必要ですが、この例では 滞在時間が独立同分布 $\operatorname{Exp}(\lambda)$ なので

$$
T_n=W_1+\cdots+W_n\to\infty
$$

a.s. であり、有限時間内に無限回の跳躍は起きません。

---

## 11. 可算状態 Q-行列では 爆発 があり得る

有限状態では跳躍率に共通の有限上界があるため、有限時間内に無限回の跳躍は起こりませんでした。

可算状態では違います。

状態空間を

$$
S=\{1,2,3,\ldots\}
$$

とし、初期状態を $X_0=1$ とします。純粋出生過程の跳躍率を

$$
q_{n,n+1}=n^2,
\qquad
q_{nn}=-n^2
\qquad
(n\ge1)
$$

とします。

状態 $n$ での滞在時間 $H_n$ は

$$
H_n\sim\operatorname{Exp}(n^2)
$$

で

$$
E[H_n]=\frac1{n^2}.
$$

従って爆発時刻

$$
T_\infty
=
\sum_{n=1}^\infty H_n
$$

について [Tonelli の定理](../F0_00D2C_積測度_Tonelli_Fubini/index.md#thm-tonelli) により

$$
E[T_\infty]
=
\sum_{n=1}^\infty\frac1{n^2}
<\infty.
$$

$T_\infty$ は $[0,\infty]$-値の非負確率変数です。もし $P(T_\infty=\infty)>0$ なら $E[T_\infty]=\infty$ となるので、上の有限期待値と矛盾します。従って

$$
T_\infty<\infty
\qquad\text{a.s.}
$$

です。

つまり有限時間内に無限個の跳躍 が起こります。

したがって

$$
\boxed{
\text{可算状態 Q-行列}
\not\Rightarrow
\text{非爆発過程が自動的に得られる}
}
$$

です。

これが本章で CTMC の核心定理を有限状態で閉じる理由です。

---

## 12. 時刻と印を数えるランダム測度

計数 $N_t$ だけでは、跳躍の大きさや種類を記録できません。

印空間 $(E,\mathcal E)$ と $\sigma$-有限測度 $\nu$ を取ります。

時間と印の積空間

$$
(0,\infty)\times E
$$

の可測集合 $B$ ごとに「$B$ の中に何個の点が入ったか」を数えるランダム計数測度を考えます。これにより、時刻だけでなく跳躍の種類も一緒に記録できます。

<a id="def-sto13-poisson-random-measure"></a>

<!-- formal-statement-start -->
> **定義（ポアソンランダム測度）**  
> $(E,\mathcal E,\nu)$ を $\sigma$-有限測度空間とする。$(0,\infty)\times E$ 上のランダム計数測度 $N$、すなわち各 $\omega$ について
>
$$
B\longmapsto N(\omega,B)
$$
>
> が計数測度で、各可測集合 $B$ に対して $\omega\mapsto N(\omega,B)$ が可測であるものを考える。
>
> $N(ds,dz)$ が強度測度
>
$$
ds\,\nu(dz)
$$
>
> を持つポアソンランダム測度であるとは、有限強度を持つ可測集合
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
> かつ有限強度の互いに素な可測集合
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

**定義の確認**

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

一方、符号付き跳躍和

$$
X_t=N_t^+-N_t^-
$$

は $+1$ 跳躍と $-1$ 跳躍 の両方を記録します。

単なる計数から印付き跳躍過程へ進む最小例です。
<!-- definition-example-end -->

任意の $A\in\mathcal E$ で $\nu(A)<\infty$ なら

$$
N_t(A)
=
N((0,t]\times A)
$$

は 率 $\nu(A)$ のポアソン過程です。

---

## 13. 平均強度を差し引いたランダム測度

ポアソン過程では $N_t-\lambda t$ がマルチンゲールになりました。ポアソンランダム測度でも同じ発想で、各領域 $B$ の実際の点数 $N(B)$ から、その領域で期待される平均点数 $(\operatorname{Leb}\times\nu)(B)$ を差し引きます。

ただし $\nu(E)=\infty$ の場合、空間全体では「無限個 − 無限大」という差を取れません。まず有限強度集合上で定義し、一般の場合は後で積分として拡張します。

<a id="def-sto13-compensated-prm"></a>

<!-- formal-statement-start -->
> **定義（補償ポアソンランダム測度）**  
> $(E,\mathcal E,\nu)$ を $\sigma$-有限測度空間とし、$N(ds,dz)$ を $(0,\infty)\times E$ 上の強度測度 $ds\,\nu(dz)$ のポアソンランダム測度とする。
>
> 有限強度の可測集合 $B$ に対して
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
> この中心化されたランダム測度を補償ポアソンランダム測度と呼び、形式的に
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
> 無限強度の集合では右辺を点ごとの測度の差としてではなく、可積分な被積分関数に対する積分として解釈する。
<!-- formal-statement-end -->

<!-- definition-example-start: def-sto13-compensated-prm -->
### 直接例：有限印空間の中心化計数

**定義の確認**

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

補償は「各印について期待される平均跳躍数を引く」操作になっています。
<!-- definition-example-end -->

---

## 14. 単関数型被積分関数に対する補償積分

STO14 の一般の跳躍型確率積分へ進む前に、決定論的な単関数型被積分関数で核心を確認します。

互いに素な有限強度の可測集合

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

この単関数に対する積分を

$$
\int_{(0,T]\times E}
f(s,z)\widetilde N(ds,dz)
:=
\sum_{k=1}^r
c_k\widetilde N(B_k)
$$

と置きます。

<a id="thm-sto13-prm-simple-isometry"></a>

<!-- formal-statement-start -->
> **定理（補償ポアソンランダム測度の単関数 $L^2$ 等長性）**  
> $(E,\mathcal E,\nu)$ を $\sigma$-有限測度空間とし、$N(ds,dz)$ を $(0,\infty)\times E$ 上の強度測度 $ds\,\nu(dz)$ のポアソンランダム測度、$\widetilde N$ をその補償ポアソンランダム測度とする。
>
> 互いに素な有限強度の可測集合
>
$$
B_1,\ldots,B_r
\subset
(0,T]\times E
$$
>
> と実数 $c_1,\ldots,c_r$ を取り、
>
$$
f(s,z)
=
\sum_{k=1}^r c_k1_{B_k}(s,z)
$$
>
> とする。補償積分を
>
$$
\int_{(0,T]\times E}
f(s,z)\widetilde N(ds,dz)
:=
\sum_{k=1}^r c_k\widetilde N(B_k)
$$
>
> と定める。また自然なフィルトレーションを
>
$$
\mathcal F_t^N
=
\sigma\left(
N(C):
C\in\mathcal B((0,t])\otimes\mathcal E,\
(\operatorname{Leb}\times\nu)(C)<\infty
\right)
$$
>
> とする。このとき
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
:=
\sum_{k=1}^r
c_k\widetilde N\left(
B_k\cap((0,t]\times E)
\right),
\qquad
0\le t\le T,
$$
>
> と置くと、$M$ は $(\mathcal F_t^N)$ に関する二乗可積分マルチンゲールである。
<!-- formal-statement-end -->

### 証明の見取り図

互いに素な集合上のポアソン計数は独立です。

ポアソン確率変数 $K\sim\operatorname{Poisson}(\mu)$ について

$$
E[K-\mu]=0,
\qquad
\operatorname{Var}(K)=\mu.
$$

したがって中心化計数どうしの交差項が消え、分散だけが強度測度と一致します。

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

一方 $B_k$ は互いに素なので

$$
\int f^2\,ds\,\nu(dz)
=
\sum_{k=1}^r
c_k^2\mu_k.
$$

従って等長性が示されました。

また

$$
E\left[
\int f\,d\widetilde N
\right]
=
\sum_{k=1}^r
c_k E[\widetilde N(B_k)]
=
0
$$

なので、平均0も確認できました。

最後に $0\le s<t\le T$ とします。

増分

$$
M_t-M_s
$$

は各 $B_k\cap((s,t]\times E)$ 上の補償計数の有限線形結合です。

過去の情報を生成する有限個の計数

$$
N((0,u_1]\times A_1),\ldots,
N((0,u_m]\times A_m),
\qquad
u_j\le s,
$$

を固定します。各未来集合 $B_k\cap((s,t]\times E)$ は、全ての過去集合 $(0,u_j]\times A_j$ と互いに素です。ポアソンランダム測度の独立性から、未来の計数ベクトルはこの有限個の過去計数ベクトルと独立です。

従って $M_t-M_s$ は、$\mathcal F_s^N$ を生成する有限次元 cylinder 事象の全てと独立です。独立性を満たす過去事象の族は monotone class で閉じるため、$M_t-M_s$ は $\mathcal F_s^N$ 全体と独立です。

また各補償計数の平均は0なので

$$
E[M_t-M_s]=0.
$$

したがって

$$
E[M_t-M_s\mid\mathcal F_s^N]=0,
$$

つまり

$$
E[M_t\mid\mathcal F_s^N]=M_s.
$$

二乗可積分性は 等長性 から従います。
<!-- proof-end -->

STO14 ではこの等長性を完備化に使い、ランダムな予測可能被積分関数まで拡張します。

ブラウン積分の STO6 と全く同じ設計思想が再登場することに注目してください。

---

## 15. 有限強度の印付き跳躍から STO14 へ

$\nu(E)<\infty$ のとき、ポアソンランダム測度の各点に印を付けて跳躍幅を足し合わせると、STO14 で扱う 複合ポアソン過程が得られます。

ただし、複合ポアソン過程の詳しい分布論と Lévy 理論での位置付けは **STO14 の正本範囲** とします。本章ではポアソンランダム測度とその中心化までで止めます。

---

## 16. 二つの「生成作用素」を同じ目で見る

### ポアソン計数

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

どちらも

$$
\boxed{
\text{跳躍率}
\times
\text{跳躍後と跳躍前の関数値の差}
}
$$

を足し合わせています。

これは「短時間の条件付き平均変化率」という [STO11 の一般の生成作用素](../STO11/index.md#def-sto11-generator) と同じ見方です。

印に依存する跳躍幅を持つ生成作用素は STO14 で Lévy 過程とともに正本化します。

---

## 17. 仮定を外すとどこが壊れるか

### 17.1 独立増分を外す

各 $N_t$ の 周辺分布が

$$
N_t\sim\operatorname{Poisson}(\lambda t)
$$

であっても、それだけでは ポアソン過程 ではありません。

時間方向の依存 があれば

$$
E[N_t-N_s\mid\mathcal F_s]
=
\lambda(t-s)
$$

とは限らず、

$$
N_t-\lambda t
$$

の マルチンゲール性 も壊れます。

### 17.2 Q-行列だけでは 可算状態連鎖 の 大域的存在 は出ない

前節の $q_n=n^2$ 純粋出生過程 では 有限時間内に無限回の跳躍が起こります。

したがって 可算状態で生成作用素を与えるときは 非爆発条件が別に必要です。

### 17.3 補償測度を点ごとに引き算しない

$\nu(E)=\infty$ なら

$$
N((0,t]\times E)
$$

も 強度 も無限になり得ます。

このとき

$$
N-dt\,\nu
$$

を「$\infty-\infty$」という点ごとの符号付き測度と読むのは誤りです。

可積分性条件を満たす被積分関数に対して補償積分を定義する必要があります。

STO14 の $L^2$ 構成はまさにこの問題を処理します。

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

をランダムな予測可能被積分過程 $H$ へ拡張します。

そこから

- 複合ポアソン過程
- Lévy 過程
- 無限分解可能分布
- Lévy--Khintchine 公式
- Lévy 測度
- 有限活動度 / 無限活動度
- Lévy--Itô 分解
- 跳躍を含む確率解析

へ進みます。

本章の 単関数に対する $L^2$ 等長性 は、その拡張の出発点です。

---

## 19. 演習

#### STO13-A01 ポアソン計数と待ち時間
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

は時刻 $t$ まで 跳躍 が 1 回もない事象なので

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

これは 率 $\lambda$ の 指数分布 の survival function です。

3. 非負 確率変数 の 尾積分公式 より

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

したがって 指数待ち時間 は 無記憶 です。
<!-- solution-end -->

#### STO13-A02 補償ポアソンマルチンゲール
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

3. 決定論的な項 は variance に影響しないので

$$
\operatorname{Var}(M_t)
=
\operatorname{Var}(N_t).
$$

ポアソン確率変数 の 分散は平均 と同じだから

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

1. 滞在時間分布 を各状態 で答えよ。
2. 跳躍連鎖の 遷移行列 を求めよ。
3. $p(t)=P_1(X_t=1)$ が満たす微分関係を書け。
4. $p(t)$ を解け。

<!-- solution-start -->
### 詳細解答

1. 状態 1 の 総跳躍率 は

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

3. 前進方程式 から

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

4. 定常値は

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

#### STO13-A04 有限印空間のポアソンランダム測度
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

1. 集合 $(0,t]\times\{a\}$ の 強度 は

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

2. 集合 $(0,t]\times\{b\}$ の強度は

$$
t\nu(\{b\})=\lambda_b t
$$

なので

$$
N_t^b
\sim
\operatorname{Poisson}(\lambda_b t).
$$

3. 集合

$$
(0,t]\times\{a\},
\qquad
(0,t]\times\{b\}
$$

は 互いに素 です。

PRM の定義より、その計数は独立です。

4. 独立なポアソン確率変数の和は平均の和を持つポアソン確率変数 なので

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

#### STO13-B01 Q-行列から 跳躍 construction
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

1. 各状態 の 総跳躍率 $q_i$ を求めよ。
2. 跳躍連鎖 遷移行列 $P$ を求めよ。
3. 状態 1 から最初の跳躍 までの平均時間を求めよ。
4. 状態 1 から最初の跳躍 が 状態 3 へ行く確率を求めよ。
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

2. 非対角跳躍率を総跳躍率で割るので

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

4. 最初の跳躍の行き先は跳躍連鎖の第1行に従うので

$$
P(Y_1=3\mid Y_0=1)
=
\frac23.
$$

5. 最初の跳躍 が $h$ までに起こる確率は

$$
1-e^{-3h}
=
3h+o(h).
$$

その行き先が 3 である 条件付き確率 は $2/3$ です。

したがって 1回跳躍による寄与 は

$$
(3h+o(h))\frac23
=
2h+o(h).
$$

二回以上 跳躍 する確率は $O(h^2)=o(h)$ なので

$$
\boxed{
P(X_h=3\mid X_0=1)
=
2h+o(h).
}
$$
<!-- solution-end -->

#### STO13-B02 Kolmogorov 方程式と 定常分布
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

3. $t\to\infty$ で 指数項 は 0 へ行くので

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

4. 定常値からの偏差は

$$
P_t(1,1)-\pi_1
=
\frac{\alpha}{\alpha+\beta}
e^{-(\alpha+\beta)t}.
$$

従って 減衰率 は

$$
\boxed{
\alpha+\beta
}
$$

です。

生成作用素 $Q$ の固有値は $0$ と $-(\alpha+\beta)$ であり、非零固有値が 緩和率 を与えています。
<!-- solution-end -->

#### STO13-B03 補償ポアソンランダム測度の等長性
- Level: B
- 目安時間: 30分

互いに素な有限強度集合 $B_1,B_2$ と

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

1. $\int f\,d\widetilde N$ を 中心化計数 で書け。
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

3. $B_1,B_2$ は 互いに素 なので 計数s は独立です。

従って 中心化計数 も独立で 交差項 の期待値は 0 です。

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

4. 互いに素であること から

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

#### STO13-C01 有限状態 CTMC の生成作用素マルチンゲールを再構成する
- Level: C
- 目安時間: 50分

有限状態 CTMC $X$ の 生成作用素を

$$
Q=
\begin{pmatrix}
-2&2&0\\
1&-3&2\\
0&1&-1
\end{pmatrix}
$$

とし、

$$
f(1)=0,
\qquad
f(2)=1,
\qquad
f(3)=3
$$

とする。

1. $Qf$ を各状態 で計算せよ。
2. マルコフ性から
   $$
   E[f(X_t)\mid\mathcal F_s]
   =
   (P_{t-s}f)(X_s)
   $$
   を書け。
3. Kolmogorov 前進方程式 を使って
   $$
   \int_0^uP_rQf\,dr
   =
   P_uf-f
   $$
   を導け。
4.
   $$
   M_t
   =
   f(X_t)-f(X_0)
   -
   \int_0^t(Qf)(X_r)\,dr
   $$
   が マルチンゲール であることを、条件付き期待値を直接計算して示せ。
5. $X_0=1$ とし、$E[M_t]=0$ から
   $$
   E_1[f(X_t)]
   =
   f(1)
   +
   E_1\int_0^t(Qf)(X_r)\,dr
   $$
   を導き、この式が 有限状態の Dynkin 公式 であることを説明せよ。

<!-- solution-start -->
### 詳細解答

1. ベクトル

$$
f=
\begin{pmatrix}
0\\
1\\
3
\end{pmatrix}
$$

に $Q$ を掛けます。

$$
(Qf)(1)
=
-2\cdot0+2\cdot1
=
2,
$$

$$
(Qf)(2)
=
1\cdot0-3\cdot1+2\cdot3
=
3,
$$

$$
(Qf)(3)
=
0\cdot0+1\cdot1-1\cdot3
=
-2.
$$

従って

$$
\boxed{
Qf=
\begin{pmatrix}
2\\
3\\
-2
\end{pmatrix}.
}
$$

跳躍-difference 形式でも

$$
(Qf)(i)
=
\sum_{j\ne i}q_{ij}(f(j)-f(i))
$$

となることを確認できます。

2. 時刻 $s$ までの履歴を条件にしても、未来の分布は現在状態 $X_s$ だけで決まります。従って

$$
\begin{aligned}
E[f(X_t)\mid\mathcal F_s]
&=
E_{X_s}[f(X_{t-s})]\\
&=
\boxed{(P_{t-s}f)(X_s)}.
\end{aligned}
$$

3. Kolmogorov 前進方程式 は

$$
\frac{d}{dr}P_r=P_rQ
$$

です。

$f$ を右から掛けると

$$
\frac{d}{dr}(P_rf)
=
P_rQf.
$$

$0$ から $u$ まで積分して

$$
P_uf-P_0f
=
\int_0^uP_rQf\,dr.
$$

$P_0=I$ なので

$$
\boxed{
\int_0^uP_rQf\,dr
=
P_uf-f.
}
$$

4. $0\le s<t$ とします。

2 より

$$
E[f(X_t)-f(X_s)\mid\mathcal F_s]
=
(P_{t-s}f-f)(X_s).
$$

また $S$ は有限なので $Qf$ は 有界 です。条件付き Fubini と マルコフ性 により

$$
\begin{aligned}
&E\left[
\int_s^t(Qf)(X_r)\,dr
\middle|
\mathcal F_s
\right]\\
&=
\int_s^t
E[(Qf)(X_r)\mid\mathcal F_s]\,dr\\
&=
\int_0^{t-s}
(P_uQf)(X_s)\,du.
\end{aligned}
$$

3 を $u=t-s$ に適用すると、最後の式は

$$
(P_{t-s}f-f)(X_s)
$$

です。

従って二つの条件付き平均が打ち消し合い、

$$
E[M_t-M_s\mid\mathcal F_s]=0.
$$

よって

$$
\boxed{
M_t
=
f(X_t)-f(X_0)
-
\int_0^t(Qf)(X_r)\,dr
}
$$

は マルチンゲール です。

5. $X_0=1$ なら $f(X_0)=f(1)=0$ です。

マルチンゲール性 から

$$
E_1[M_t]=E_1[M_0]=0.
$$

従って

$$
E_1[f(X_t)]
-
f(1)
-
E_1\int_0^t(Qf)(X_r)\,dr
=
0.
$$

すなわち

$$
\boxed{
E_1[f(X_t)]
=
f(1)
+
E_1\int_0^t(Qf)(X_r)\,dr.
}
$$

これは 有限状態 CTMC について、観測量 $f$ の平均変化を 生成作用素 の時間積分で表す Dynkin 公式 です。

STO11 では拡散過程 を含む一般のマルコフ過程 に対して同じ構造を扱いました。本問では有限状態性のおかげで 定義域や可積分性 の技術を持ち込まず、行列 $Q$ だけから同じ式を再構成できました。
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

連続 標本路の世界では ブラウン運動 と 二次変分 が中心でした。

跳躍 標本路の世界では

$$
\boxed{
\text{計数}
+
\text{率}
+
\text{印}
+
\text{補償}
}
$$

が基本語彙になります。

次の STO14 では、この語彙を Lévy 過程と 跳躍 確率解析 へ持ち上げます。
