# F0-00SP2 Encore IV：martingale・optional sampling・Doob分解

filtrationが「時刻ごとの情報」を表すと、条件付き期待値を時間方向に比較できます。その中心がmartingaleです。

この章では、optional stoppingを「公平ゲームだから当然」で済ませず、

```text
martingale差分の条件付き平均 = 0
  ↓
停止するかどうかは過去情報で決まる
  ↓
停止した差分を足しても条件付き平均 = 0
  ↓
有界optional sampling
  ↓
UI + Vitaliで非有界停止時刻へ極限
```

という証明鎖まで閉じます。

---

## 1. martingale

<a id="def-f0-00sp2-martingale"></a>

<!-- formal-statement-start -->
> **定義（martingale）**  
> filtration $(\mathcal F_n)_{n\ge0}$ に対し、確率過程 $(M_n)_{n\ge0}$ が次の3条件を満たすときmartingaleと呼びます。
>
> 1. $M_n$ は $\mathcal F_n$-可測である。
> 2. $E|M_n|<\infty$ である。
> 3. 各 $n$ について $E[M_{n+1}\mid\mathcal F_n]=M_n$ a.s. である。
<!-- formal-statement-end -->

### 1.1 例：公平ランダムウォーク

独立な可積分確率変数 $\xi_k$ が $E\xi_k=0$ を満たし

$$
S_n=\sum_{k=1}^n\xi_k,
\qquad
\mathcal F_n=\sigma(\xi_1,\dots,\xi_n)
$$

とします。

<!-- definition-example-start: def-f0-00sp2-martingale -->
**定義の確認**  
$S_n$ は $\mathcal F_n$-可測で、三角不等式から $E|S_n|<\infty$ です。また独立性と平均0から

$$
E[S_{n+1}\mid\mathcal F_n]
=S_n+E[\xi_{n+1}\mid\mathcal F_n]
=S_n.
$$

従って3条件をすべて満たし、$(S_n)$ はmartingaleです。
<!-- definition-example-end -->

martingale性を反復すると、$m\ge n$ に対しtower propertyから

$$
E[M_m\mid\mathcal F_n]=M_n.
$$

特に

$$
E[M_n]=E[M_0]
$$

です。ただし平均一定だけではmartingaleとは限りません。条件付き平均が本質です。

---

## 2. submartingaleとsupermartingale

<a id="def-f0-00sp2-submartingale"></a>

<!-- formal-statement-start -->
> **定義（submartingale）**  
> adaptedかつ可積分な過程 $(X_n)$ が

$$
E[X_{n+1}\mid\mathcal F_n]\ge X_n
$$

> を各 $n$ で満たすときsubmartingaleと呼びます。
<!-- formal-statement-end -->

<a id="def-f0-00sp2-supermartingale"></a>

<!-- formal-statement-start -->
> **定義（supermartingale）**  
> adaptedかつ可積分な過程 $(X_n)$ が

$$
E[X_{n+1}\mid\mathcal F_n]\le X_n
$$

> を各 $n$ で満たすときsupermartingaleと呼びます。
<!-- formal-statement-end -->

### 2.1 例：二乗はsubmartingale、符号反転はsupermartingale

平方可積分martingale $(M_n)$ を考えます。条件付きJensen不等式から

$$
M_n^2
=\{E[M_{n+1}\mid\mathcal F_n]\}^2
\le E[M_{n+1}^2\mid\mathcal F_n].
$$

<!-- definition-example-start: def-f0-00sp2-submartingale, def-f0-00sp2-supermartingale -->
**定義の確認**  
$M_n^2$ はadaptedで可積分、上の条件付き不等式を満たすためsubmartingaleです。従って $-M_n^2$ は

$$
E[-M_{n+1}^2\mid\mathcal F_n]\le -M_n^2
$$

を満たしsupermartingaleです。
<!-- definition-example-end -->

公平ランダムウォークで $E\xi_k^2=\sigma^2$ なら

$$
S_n^2-n\sigma^2
$$

はmartingaleです。「予測可能な平均増加分」を引く発想は後のDoob分解へつながります。

---

## 3. 条件付き期待値が作るmartingale

$X\in L^1$ とし、増加する情報列 $(\mathcal F_n)$ に対して

$$
M_n:=E[X\mid\mathcal F_n]
$$

と置きます。tower propertyから

$$
E[M_{n+1}\mid\mathcal F_n]
=E[E[X\mid\mathcal F_{n+1}]\mid\mathcal F_n]
=M_n.
$$

これはmartingaleです。

この特別なmartingaleについては [Lévy上昇定理](../F0_00P3C_Levy上昇定理_情報の増加/index.md#thm-f0-00p3c-levy-upward) が

$$
E[X\mid\mathcal F_n]
\to
E[X\mid\mathcal F_\infty]
$$

の $L^1$・a.s.収束まで与えます。

---

## 4. predictable processとmartingale transform

<a id="def-f0-00sp2-predictable"></a>

<!-- formal-statement-start -->
> **定義（離散時間predictable process）**  
> 過程 $(H_n)_{n\ge1}$ が各 $n\ge1$ で $\mathcal F_{n-1}$-可測であるとき、$H$ をpredictableと呼びます。
<!-- formal-statement-end -->

### 4.1 例：一つ前の符号で次の賭け額を決める

$S_n$ をランダムウォークとし

$$
H_n:=1_{\{S_{n-1}\ge0\}}
$$

とします。

<!-- definition-example-start: def-f0-00sp2-predictable -->
**定義の確認**  
$S_{n-1}$ は $\mathcal F_{n-1}$-可測なので $H_n$ も $\mathcal F_{n-1}$-可測です。従って $H$ はpredictableです。$H_n$ は第 $n$ 増分 $\Delta S_n$ を見る前に決まっています。
<!-- definition-example-end -->

<a id="prop-f0-00sp2-martingale-transform"></a>

<!-- formal-statement-start -->
> **命題（有界predictable transform）**  
> $(M_n)$ をmartingale、$(H_n)$ を有界predictable processとします。このとき

$$
G_n:=\sum_{k=1}^nH_k(M_k-M_{k-1})
$$

> は $G_0=0$ のmartingaleです。
<!-- formal-statement-end -->

<!-- proof-start -->
### 証明：次の増分の係数は一つ前に決まっている

$H_n$ は有界で $M_n-M_{n-1}$ は可積分だから $G_n$ は可積分です。またadaptednessは明らかです。さらに

$$
\begin{aligned}
E[G_{n+1}-G_n\mid\mathcal F_n]
&=E[H_{n+1}(M_{n+1}-M_n)\mid\mathcal F_n]\\
&=H_{n+1}E[M_{n+1}-M_n\mid\mathcal F_n]\\
&=0.
\end{aligned}
$$

従って $E[G_{n+1}\mid\mathcal F_n]=G_n$ です。
<!-- proof-end -->

---

## 5. stoppingしてもmartingale性は壊れない

<a id="thm-f0-00sp2-stopped-martingale"></a>

<!-- formal-statement-start -->
> **定理（stopped martingale）**  
> $(M_n)$ を $(\mathcal F_n)$-martingale、$\tau$ をstopping timeとします。このとき

$$
M_n^\tau:=M_{n\wedge\tau}
$$

> はmartingaleです。
<!-- formal-statement-end -->

<!-- proof-start -->
### 証明：停止後の増分を0にする

差分は

$$
M_{(n+1)\wedge\tau}-M_{n\wedge\tau}
=1_{\{\tau>n\}}(M_{n+1}-M_n).
$$

$\{\tau>n\}\in\mathcal F_n$ なので、右辺の係数は次の増分を見る前に決まっています。従って

$$
\begin{aligned}
&E[M_{(n+1)\wedge\tau}-M_{n\wedge\tau}\mid\mathcal F_n]\\
&\qquad=
1_{\{\tau>n\}}E[M_{n+1}-M_n\mid\mathcal F_n]
=0.
\end{aligned}
$$

また $M_{n\wedge\tau}$ は $M_0,\dots,M_n$ の有限混合なので可積分です。よってstopped processはmartingaleです。
<!-- proof-end -->

この結果だけで、各決定論的 $N$ について

$$
E[M_{\tau\wedge N}]=E[M_0]
$$

が得られます。難所は $N\to\infty$ で期待値を交換できるかです。

---

## 6. bounded optional sampling theorem

まず極限操作が不要な版を完全に証明します。

<a id="lem-f0-00sp2-stopped-value-measurable"></a>

<!-- formal-statement-start -->
> **補題（停止時刻で評価した値）**  
> $(M_n)$ がadaptedで、$\sigma$ が $0\le\sigma\le N$ を満たすbounded stopping timeなら、$M_\sigma$ は $\mathcal F_\sigma$-可測です。さらに $(M_n)$ が可積分なら $M_\sigma$ も可積分です。
<!-- formal-statement-end -->

<!-- proof-start -->
### 証明：有限個の時刻へ分解する

任意のBorel集合 $B$ と $n$ に対し

$$
\{M_\sigma\in B\}\cap\{\sigma\le n\}
=
\bigcup_{j=0}^{\min(n,N)}
\bigl(\{M_j\in B\}\cap\{\sigma=j\}\bigr).
$$

各項は $\mathcal F_n$ に属するので、$M_\sigma$ は $\mathcal F_\sigma$-可測です。また

$$
|M_\sigma|
\le\sum_{j=0}^N|M_j|1_{\{\sigma=j\}}
$$

より可積分性も従います。
<!-- proof-end -->

<a id="thm-f0-00sp2-bounded-optional-sampling"></a>

<!-- formal-statement-start -->
> **定理（bounded optional sampling）**  
> $(M_n)$ を $(\mathcal F_n)$-martingaleとし、$\sigma,\tau$ をstopping timesとします。ある決定論的 $N<\infty$ が存在して

$$
0\le\sigma\le\tau\le N
$$

> a.s. とします。このとき

$$
\boxed{
E[M_\tau\mid\mathcal F_\sigma]=M_\sigma
}
$$

> a.s. が成り立ちます。特に

$$
\boxed{E[M_\tau]=E[M_\sigma]=E[M_0]}.
$$
<!-- formal-statement-end -->

<!-- proof-start -->
### 証明：停止区間だけmartingale差分を足す

まず経路ごとに

$$
M_\tau-M_\sigma
=
\sum_{k=0}^{N-1}
1_{\{\sigma\le k<\tau\}}(M_{k+1}-M_k).
$$

を確認します。$\sigma$ から $\tau$ までの差分だけが1回ずつ足されるtelescoping sumです。

$A\in\mathcal F_\sigma$ を任意に取ります。[停止時刻情報の基本性質](../F0_00SP1_確率過程_filtration_stopping/index.md#lem-f0-00sp1-stopped-information)から

$$
A\cap\{\sigma\le k\}\in\mathcal F_k.
$$

さらに $\{\tau>k\}\in\mathcal F_k$ なので

$$
B_k:=A\cap\{\sigma\le k<\tau\}\in\mathcal F_k.
$$

従ってmartingale差分の条件付き平均0を使って

$$
\begin{aligned}
E[1_{B_k}(M_{k+1}-M_k)]
&=E\left[1_{B_k}E[M_{k+1}-M_k\mid\mathcal F_k]\right]\\
&=0.
\end{aligned}
$$

有限和なので

$$
E[1_A(M_\tau-M_\sigma)]=0.
$$

つまり全ての $A\in\mathcal F_\sigma$ に対し

$$
E[1_AM_\tau]=E[1_AM_\sigma].
$$

[停止時刻で評価した値](#lem-f0-00sp2-stopped-value-measurable)より $M_\sigma$ は $\mathcal F_\sigma$-可測かつ可積分なので、条件付き期待値の定義から

$$
E[M_\tau\mid\mathcal F_\sigma]=M_\sigma.
$$

$A=\Omega$ とすれば期待値等式を得ます。
<!-- proof-end -->

ここでは停止時刻が有界なので、極限と期待値の交換は一度も使っていません。

---

## 7. 非有界停止時刻：UIが極限交換を正当化する

<a id="thm-f0-00sp2-ui-optional-stopping"></a>

<!-- formal-statement-start -->
> **定理（UIによるoptional stopping）**  
> $(M_n)$ をmartingale、$\tau$ を $P(\tau<\infty)=1$ を満たすstopping timeとします。stopped family

$$
\{M_{\tau\wedge n}:n\ge0\}
$$

> が一様可積分なら $M_\tau\in L^1$ で

$$
\boxed{E[M_\tau]=E[M_0]}.
$$
<!-- formal-statement-end -->

<!-- proof-start -->
### 証明：bounded stoppingからVitaliへ渡す

[stopped martingale定理](#thm-f0-00sp2-stopped-martingale)から各 $n$ で

$$
E[M_{\tau\wedge n}]=E[M_0].
$$

$\tau<\infty$ a.s. なので各標本点で十分大きい $n$ では $\tau\wedge n=\tau$ となり

$$
M_{\tau\wedge n}\to M_\tau
\qquad\text{a.s.}
$$

です。従って確率収束もします。仮定した一様可積分性と [Vitali型収束定理](../F0_00P4A_一様可積分性_Vitali/index.md#thm-f0-00p4a-vitali) により

$$
E|M_{\tau\wedge n}-M_\tau|\to0.
$$

特に期待値も収束するので

$$
E[M_\tau]
=\lim_{n\to\infty}E[M_{\tau\wedge n}]
=E[M_0].
$$
<!-- proof-end -->

> bounded版と非bounded版の差は「公平性」ではなく **極限と期待値を交換できるか** にあります。

---

## 8. なぜ条件が必要か：倍賭けはoptional stoppingを破る

公平コインで、負けるたびに次の賭け額を

$$
1,2,4,8,\dots
$$

と倍にする戦略を考えます。最初の勝ちが出た時刻を $\tau$ とします。$\tau$ はstopping timeで

$$
P(\tau<\infty)=1.
$$

初期資産を0、各賭けの純損益を加えた資産を $G_n$ とすると、有限時刻ごとにはpredictable transformなのでmartingaleです。しかし最初に勝った瞬間までの累積損益は常に

$$
G_\tau=1.
$$

従って

$$
E[G_\tau]=1\ne0=E[G_0].
$$

矛盾ではありません。$\{G_{\tau\wedge n}\}$ は一様可積分ではなく、まれな長い連敗pathが巨大な負の値を持って期待値0を支え続けます。

---

## 9. Doob decomposition

<a id="thm-f0-00sp2-doob-decomposition"></a>

<!-- formal-statement-start -->
> **定理（離散時間Doob decomposition）**  
> $(X_n)_{n\ge0}$ を可積分submartingaleとします。このとき一意に

$$
X_n=M_n+A_n
$$

> と表せます。ここで $(M_n)$ はmartingale、$A_0=0$、$(A_n)$ は可積分・predictableでa.s.非減少です。
<!-- formal-statement-end -->

<!-- proof-start -->
### 証明：予測可能な平均増分を取り出す

$$
A_0:=0,
\qquad
A_n:=\sum_{k=1}^nE[X_k-X_{k-1}\mid\mathcal F_{k-1}]
$$

と置きます。submartingale性から各増分

$$
A_k-A_{k-1}
=E[X_k-X_{k-1}\mid\mathcal F_{k-1}]
\ge0
$$

です。また $A_n$ は $\mathcal F_{n-1}$-可測なのでpredictableです。

$M_n:=X_n-A_n$ と置くと

$$
\begin{aligned}
E[M_n-M_{n-1}\mid\mathcal F_{n-1}]
&=E[X_n-X_{n-1}\mid\mathcal F_{n-1}]\\
&\quad-(A_n-A_{n-1})\\
&=0,
\end{aligned}
$$

よって $M$ はmartingaleです。

一意性を示します。別の分解 $X=M'+A'$ があれば

$$
D_n:=M_n-M_n'=A_n'-A_n
$$

はmartingaleかつpredictableで $D_0=0$ です。$D_n$ は $\mathcal F_{n-1}$-可測なので

$$
D_n=E[D_n\mid\mathcal F_{n-1}]=D_{n-1}.
$$

帰納的に $D_n=0$ であり、二つの分解は一致します。
<!-- proof-end -->

---

# 10. 演習

## F0-00SP2-A01 二乗補正martingale

- Level: A
- 目安時間: 12分

独立な $\xi_k$ が $E\xi_k=0$, $E\xi_k^2=\sigma^2$ を満たし、$S_n=\sum_{k=1}^n\xi_k$ とする。

$$
M_n=S_n^2-n\sigma^2
$$

がmartingaleであることを示せ。

<!-- solution-start -->
### 詳細解答

$$
S_{n+1}^2=S_n^2+2S_n\xi_{n+1}+\xi_{n+1}^2.
$$

$S_n$ は $\mathcal F_n$-可測で、独立性から条件付き平均を取ると

$$
E[S_{n+1}^2\mid\mathcal F_n]=S_n^2+\sigma^2.
$$

従って $E[M_{n+1}\mid\mathcal F_n]=M_n$。可測性・可積分性も成立する。

### 本番答案

上の展開へ条件付き期待値を適用し、平均0と分散 $\sigma^2$ を代入する。

### 採点基準（20点）
- 二乗展開：6点
- 条件付き平均：8点
- martingale条件：6点
<!-- solution-end -->

## F0-00SP2-A02 stopped martingaleの差分

- Level: A
- 目安時間: 10分

stopping time $\tau$ に対して

$$
M_{(n+1)\wedge\tau}-M_{n\wedge\tau}
=1_{\{\tau>n\}}(M_{n+1}-M_n)
$$

を場合分けで確認し、stopped processがmartingaleになる理由を述べよ。

<!-- solution-start -->
### 詳細解答

$\tau\le n$ なら両辺0。$\tau>n$ なら整数値停止時刻なので $n\wedge\tau=n$, $(n+1)\wedge\tau=n+1$ となり両辺は $M_{n+1}-M_n$。さらに $1_{\{\tau>n\}}$ は $\mathcal F_n$-可測なので条件付き期待値を外へ出せる。

### 本番答案

$\tau\le n$ と $\tau>n$ に分けて差分恒等式を確認し、$E[\Delta M_{n+1}\mid\mathcal F_n]=0$ を使う。

### 採点基準（20点）
- 場合分け：8点
- 可測性：6点
- 条件付き平均：6点
<!-- solution-end -->

## F0-00SP2-B01 gambler's ruinをbounded optional samplingで解く

- Level: B
- 目安時間: 20分

単純対称ランダムウォーク $S_0=i$ $(0<i<a)$ を考え

$$
\tau=\inf\{n\ge0:S_n\in\{0,a\}\}.
$$

$\tau_N:=\tau\wedge N$ とする。bounded optional samplingを $S_n$ に適用して

$$
P_i(S_\tau=a)=\frac ia
$$

を導け。ただし $\tau<\infty$ a.s. と $S_{\tau_N}\to S_\tau$ a.s. を使ってよい。

<!-- solution-start -->
### 詳細解答

bounded optional samplingから

$$
E_i[S_{\tau_N}]=i.
$$

停止後も $0\le S_{\tau_N}\le a$ なのでDCTにより

$$
E_i[S_\tau]=i.
$$

一方 $S_\tau\in\{0,a\}$ だから

$$
E_i[S_\tau]=aP_i(S_\tau=a).
$$

従って $P_i(S_\tau=a)=i/a$。

### 本番答案

$E S_{\tau\wedge N}=i$、有界収束で $E S_\tau=i$、$S_\tau\in\{0,a\}$ より $aP(S_\tau=a)=i$。

### 採点基準（20点）
- bounded OST：7点
- 極限交換：7点
- 到達確率：6点
<!-- solution-end -->

## F0-00SP2-B02 UI extensionを証明する

- Level: B
- 目安時間: 18分

$\tau<\infty$ a.s. かつ $\{M_{\tau\wedge n}\}$ がUIであるとする。bounded stoppingとVitaliから $E[M_\tau]=E[M_0]$ を示せ。

<!-- solution-start -->
### 詳細解答

各 $n$ で $\tau\wedge n$ はboundedだから $E[M_{\tau\wedge n}]=E[M_0]$。また $\tau<\infty$ a.s. から $M_{\tau\wedge n}\to M_\tau$ a.s.。UIとVitaliにより $L^1$ 収束し、期待値を極限へ通せる。

### 本番答案

bounded OST + a.s.収束 + UI ⇒ Vitaliによる $L^1$ 収束、の3段で結論。

### 採点基準（20点）
- truncation：6点
- a.s.収束：5点
- Vitali：6点
- 結論：3点
<!-- solution-end -->

## F0-00SP2-B03 Doob decompositionを構成する

- Level: B
- 目安時間: 20分

可積分submartingale $X_n$ に対し

$$
A_n=\sum_{k=1}^nE[X_k-X_{k-1}\mid\mathcal F_{k-1}],
\qquad
M_n=X_n-A_n
$$

と置く。$A$ がpredictableかつ非減少、$M$ がmartingaleであることを示せ。

<!-- solution-start -->
### 詳細解答

各 $\Delta A_k$ は $\mathcal F_{k-1}$-可測で、submartingale性から非負。従って $A$ はpredictableで非減少。さらに

$$
E[\Delta M_k\mid\mathcal F_{k-1}]
=E[\Delta X_k\mid\mathcal F_{k-1}]-\Delta A_k=0.
$$

よって $M$ はmartingale。

### 本番答案

$\Delta A_k=E[\Delta X_k\mid\mathcal F_{k-1}]\ge0$ を使い、$\Delta M_k$ の条件付き平均が0であることを示す。

### 採点基準（20点）
- predictable：6点
- 非減少：5点
- martingale性：9点
<!-- solution-end -->

---

## 章末チェック

- martingale / submartingale / supermartingaleを条件付き期待値で判定できる。
- predictable processが「次の増分を見る前に決まる」ことを説明できる。
- stopped martingale theoremを差分恒等式から証明できる。
- bounded optional samplingを $\mathcal F_\sigma$ に関する条件付き等式まで証明できる。
- UIが非有界stopping timeで必要になる理由をVitaliと結びつけられる。
- 倍賭け反例で無条件のoptional stoppingが誤りだと説明できる。
- Doob decompositionを構成・証明できる。
