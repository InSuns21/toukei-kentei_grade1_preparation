# STO6：確率積分 — 単純予測可能過程から局所マルチンゲールまで

<!-- definition-example-audit: strict -->

> **既出概念への参照**：[予測可能過程](../STO1/index.md#def-sto1-predictable)、[連続局所マルチンゲール](../STO5/index.md#def-sto5-continuous-local-martingale)、[二次変分](../STO5/index.md#def-sto5-quadratic-variation) を既知として使います。

STO5 では、ブラウン運動や一般の連続局所マルチンゲールが持つ二次変分を先に作りました。ここでようやく

$$
\int_0^t H_s\,dM_s
$$

を数学的対象として構成します。

普通の Riemann 積分のように「各標本路について微小量を足す」と考えるのではありません。ブラウン運動の標本路はほとんど確実に有限変動ではないため、標本路ごとの Riemann--Stieltjes 積分を主役にはできないからです。

代わりに、

$$
\boxed{
\text{単純予測可能被積分過程}
\to
\text{増分和}
\to
\text{Itô 等長性}
\to
L^2\text{ 完備化}
\to
\text{局所化}
}
$$

という順で作ります。

この構成で最も大切なのは二点です。

1. 係数は未来の増分を見ないこと。
2. 積分の誤差を標本路ごとの variation ではなく二乗平均とブラケットで測ること。

STO7 の Itô formula は、この章で積分が完成して初めて厳密に書けるようになります。

---

## 1. 係数を過去情報で固定する

まず有限個の時間区間だけで値が変わる過程から始めます。

<a id="def-sto6-simple-predictable"></a>

<!-- formal-statement-start -->
> **定義（単純予測可能被積分過程）**  
> 決定論的 partition
>
$$
0=t_0<t_1<\cdots<t_n=T
$$
>
> と、各 $k=0,\ldots,n-1$ について有界な $\mathcal F_{t_k}$-measurable random variable $\xi_k$ を取る。
>
$$
H_t
=
\sum_{k=0}^{n-1}
\xi_k\,1_{(t_k,t_{k+1}]}(t)
$$
>
> と表される過程 $H$ を、$[0,T]$ 上の **単純予測可能被積分過程** という。
<!-- formal-statement-end -->

区間 $(t_k,t_{k+1}]$ に入る瞬間には、係数 $\xi_k$ はすでに $\mathcal F_{t_k}$ で決まっています。これが予測可能の最小模型です。

<!-- definition-example-start: def-sto6-simple-predictable -->
### 直接例：過去のブラウン値を次の区間の係数にする

**定義の確認**

$0<s<T$ を固定し、

$$
\xi_s:=1_{\{B_s\ge0\}},
\qquad
H_t
=
1_{(0,s]}(t)
+
\xi_s\,1_{(s,T]}(t)
$$

とします。

最初の係数 $1$ は $\mathcal F_0$-measurable、二つ目の係数 $\xi_s$ は有界かつ $\mathcal F_s$-measurable です。従って定義どおり $H$ は単純予測可能です。

重要なのは、二つ目の区間で $B_T-B_s$ を積分するとき、その係数 $\xi_s$ は増分が始まる時点ですでに分かっていることです。
<!-- definition-example-end -->

---

## 2. マルチンゲール増分の有限和で積分を定める

continuous マルチンゲール $M$ に対して、単純被積分過程の積分は増分和で定義できます。

<a id="def-sto6-simple-integral"></a>

<!-- formal-statement-start -->
> **定義（単純確率積分）**  
> $M=(M_t)_{0\le t\le T}$ を continuous マルチンゲール、$H$ を
>
$$
H_t=\sum_{k=0}^{n-1}\xi_k1_{(t_k,t_{k+1}]}(t)
$$
>
> と表される単純予測可能被積分過程とする。
>
$$
(H\cdot M)_t
:=
\sum_{k=0}^{n-1}
\xi_k
\left(
M_{t\wedge t_{k+1}}-M_{t\wedge t_k}
\right),
\qquad 0\le t\le T
$$
>
> を $H$ の $M$ に関する **単純確率積分** といい、
>
$$
\int_0^t H_s\,dM_s
$$
>
> とも書く。
<!-- formal-statement-end -->

この定義は representation に依存しません。分割を細かくして同じ過程を書き直しても、同じ増分を小分けしているだけだからです。

各項は continuous なので $(H\cdot M)_t$ も continuous です。また $t$ までに現れる係数と増分は $\mathcal F_t$-measurable なので適合です。

<!-- definition-example-start: def-sto6-simple-integral -->
### 直接例：二段階のブラウン運動に関する確率積分

**定義の確認**

前節の

$$
H_t
=
1_{(0,s]}(t)+1_{\{B_s\ge0\}}1_{(s,T]}(t)
$$

をブラウン運動 $B$ に対して積分すると、

$$
(H\cdot B)_t
=
B_{t\wedge s}
+
1_{\{B_s\ge0\}}
\left(B_t-B_s\right)1_{\{t>s\}}.
$$

特に $t=T$ では

$$
\int_0^T H_u\,dB_u
=
B_s+1_{\{B_s\ge0\}}(B_T-B_s).
$$

第二項の条件付き期待値は

$$
E[1_{\{B_s\ge0\}}(B_T-B_s)\mid\mathcal F_s]
=
1_{\{B_s\ge0\}}E[B_T-B_s\mid\mathcal F_s]
=0.
$$

predictability がマルチンゲール cancellation を保っていることが見えます。
<!-- definition-example-end -->

---

## 3. ブラケットを測度として読む

確率積分は $M$ の増分だけで定義されるため、$M_0\neq0$ でも
$$
\widetilde M_t:=M_t-M_0
$$
へ置き換えれば積分は変わりません。また $[\widetilde M]=[M]$ です。したがって $L^2$ 構成では、必要な箇所で $M_0=0$ と正規化しても一般性を失いません。

STO5 で連続局所マルチンゲール $M$ に対する increasing 過程 $[M]$ を構成しました。

ただし次節の二乗平均の等長性では、STO5 の

$$
M^2-[M]
$$

が **局所** マルチンゲールであるだけでは足りません。square-integrable $M$ ではこれが真のマルチンゲールになり、ブラケット増分の条件付き平均を使えることを先に確認します。

<a id="lem-sto6-bracket-compensation"></a>

<!-- formal-statement-start -->
> **補題（square-integrable マルチンゲールのブラケット compensation）**  
> $M$ を $M_0=0$ の continuous square-integrable マルチンゲールとする。このとき
>
$$
E[M]_T=E[M_T^2]<\infty
$$
>
> であり、
>
$$
M_t^2-[M]_t
$$
>
> は $[0,T]$ 上の真のマルチンゲールである。従って $0\le s\le t\le T$ に対し
>
$$
E\left[
(M_t-M_s)^2-([M]_t-[M]_s)
\mid\mathcal F_s
\right]=0.
$$
<!-- formal-statement-end -->

<!-- proof-start -->
### 証明

STO5 から $L:=M^2-[M]$ は連続局所マルチンゲールです。

$|M|$ と $[M]$ を同時に止める increasing 停止時刻 $\tau_n\uparrow\infty$ を取り、$L^{\tau_n}$ を真のマルチンゲールにします。すると

$$
E[M_{T\wedge\tau_n}^2]
=
E[M]_{T\wedge\tau_n}.
$$

一方、STO5 の [有界停止操作 theorem](../STO5/index.md#thm-sto5-bounded-optional-sampling) と square-integrability から

$$
M_{T\wedge\tau_n}
=
E[M_T\mid\mathcal F_{T\wedge\tau_n}],
$$

よって conditional Jensen により

$$
E[M_{T\wedge\tau_n}^2]\le E[M_T^2].
$$

$[M]_{T\wedge\tau_n}\uparrow[M]_T$ なので monotone convergence により

$$
E[M]_T
=
\lim_nE[M]_{T\wedge\tau_n}
\le E[M_T^2].
$$

逆に $M_{T\wedge\tau_n}\to M_T$ ほとんど確実になので Fatou から

$$
E[M_T^2]
\le
\liminf_nE[M_{T\wedge\tau_n}^2]
=
E[M]_T.
$$

従って

$$
E[M]_T=E[M_T^2]<\infty.
$$

次に $L=M^2-[M]$ が真のマルチンゲールであることを示します。

上で使った局所化列 $\tau_n$ に対し、各固定 $t\le T$ で

$$
L_{t\wedge\tau_n}\to L_t
$$

ほとんど確実にです。しかも

$$
|L_{t\wedge\tau_n}|
\le
M_{t\wedge\tau_n}^2+[M]_{t\wedge\tau_n}.
$$

[有界停止操作 theorem](../STO5/index.md#thm-sto5-bounded-optional-sampling) から

$$
M_{t\wedge\tau_n}
=
E[M_t\mid\mathcal F_{t\wedge\tau_n}],
$$

したがって conditional Jensen により

$$
M_{t\wedge\tau_n}^2
\le
E[M_t^2\mid\mathcal F_{t\wedge\tau_n}].
$$

固定した integrable variable $M_t^2$ の conditional expectations は uniformly integrable なので、$\{M_{t\wedge\tau_n}^2\}_n$ も uniformly integrable です。

また

$$
0\le[M]_{t\wedge\tau_n}\le[M]_t,
\qquad
E[M]_t=E[M_t^2]<\infty,
$$

なので $\{[M]_{t\wedge\tau_n}\}_n$ も uniformly integrable です。従って $\{L_{t\wedge\tau_n}\}_n$ は uniformly integrable で、

$$
L_{t\wedge\tau_n}\to L_t
\qquad\text{in }L^1.
$$

$0\le s\le t\le T$ と $A\in\mathcal F_s$ を固定します。$L^{\tau_n}$ はマルチンゲールなので

$$
E[1_A L_{t\wedge\tau_n}]
=
E[1_A L_{s\wedge\tau_n}].
$$

両辺を $L^1$ 極限へ送ると

$$
E[1_A L_t]=E[1_A L_s].
$$

任意の $A\in\mathcal F_s$ について成り立つため、$L$ は真のマルチンゲールです。


最後に

$$
M_t^2-M_s^2
=
2M_s(M_t-M_s)+(M_t-M_s)^2.
$$

$M$ のマルチンゲール性から

$$
E[M_t-M_s\mid\mathcal F_s]=0.
$$

$L$ のマルチンゲール恒等式と上式を組み合わせれば

$$
E\left[
(M_t-M_s)^2-([M]_t-[M]_s)
\mid\mathcal F_s
\right]=0.
$$
<!-- proof-end -->

このため

$$
\mu_M(A)
:=
E\left[
\int_0^T1_A(\omega,t)\,d[M]_t
\right]
$$

は予測可能 sigma-field 上の有限測度になります。確率積分の被積分過程は、この測度に関する $L^2$ 空間で完成させます。

---

## 4. 二乗平均を保存する等長性

<a id="thm-sto6-ito-isometry-simple"></a>

<!-- formal-statement-start -->
> **定理（Itô 等長性：単純予測可能被積分過程）**  
> $M$ を $M_0=0$ の continuous square-integrable マルチンゲールとし、$H$ を有界単純予測可能被積分過程とする。このとき
>
$$
E\left[
\left(
\int_0^T H_s\,dM_s
\right)^2
\right]
=
E\left[
\int_0^T H_s^2\,d[M]_s
\right].
$$
>
> 特にブラウン運動 $B$ では $[B]_t=t$ なので
>
$$
E\left[
\left(
\int_0^T H_s\,dB_s
\right)^2
\right]
=
E\left[
\int_0^T H_s^2\,ds
\right].
$$
<!-- formal-statement-end -->

### 証明の見取り図

単純 integral は

$$
\sum_k\xi_k\Delta_kM
$$

です。異なる時間区間の項はマルチンゲール増分の直交性で消えます。対角項だけが残り、

$$
E[\xi_k^2(\Delta_kM)^2]
$$

をブラケット増分

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

[square-integrable マルチンゲールのブラケット compensation](#lem-sto6-bracket-compensation) から

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

ブラウン運動では $d[B]_s=ds$ なので最後の式は通常の時間積分になります。
<!-- proof-end -->

この定理が construction のエンジンです。積分そのものをまだ一般過程に対して定義していなくても、単純被積分過程の距離

$$
\|H\|_{M,T}^2
=
E\int_0^T H_s^2\,d[M]_s
$$

と積分結果の $L^2$ 距離が一致します。

---

## 5. $L^2(M)$ 被積分過程と単純過程の稠密性

<a id="def-sto6-l2m"></a>

<!-- formal-statement-start -->
> **定義（L2(M) 被積分過程）**  
> $M$ を $M_0=0$ の continuous square-integrable マルチンゲールとする。予測可能過程 $H$ が
>
$$
E\int_0^T H_s^2\,d[M]_s<\infty
$$
>
> を満たすとき、$H$ を $[0,T]$ 上の **$L^2(M)$ 被積分過程** という。
>
> $d\mu_M=dP\,d[M]$ に関して同値な過程は同一視する。
<!-- formal-statement-end -->

<!-- definition-example-start: def-sto6-l2m -->
### 直接例：ブラウン運動と決定論的被積分過程

**定義の確認**

$h\in L^2([0,T])$ を決定論的とします。決定論的 Borel 過程は予測可能なので

$$
E\int_0^T h(s)^2\,d[B]_s
=
\int_0^T h(s)^2\,ds
<\infty.
$$

従って $h$ は $L^2(B)$ 被積分過程です。

この場合確率積分は後で

$$
\int_0^T h(s)\,dB_s
$$

として構成され、平均 0、分散 $\int_0^T h^2$ のガウス random variable になります。
<!-- definition-example-end -->

<a id="lem-sto6-simple-density"></a>

<!-- formal-statement-start -->
> **補題（単純予測可能被積分過程の L2 稠密性）**  
> 固定した $T$ で、有界単純予測可能 integrands は
>
$$
L^2(\Omega\times(0,T],\mathcal P,\mu_M)
$$
>
> に稠密である。ここで $\mathcal P$ は予測可能 sigma-field、
>
$$
\mu_M(A)=E\int_0^T1_A\,d[M]
$$
>
> である。
<!-- formal-statement-end -->

### なぜ稠密なのか

予測可能 sigma-field は

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

で、単純予測可能被積分過程そのものです。

$\mu_M$ は有限測度なので、一般の $L^2(\mu_M)$ 予測可能 function は

1. 値を $[-r,r]$ に切り詰めて有界にし、
2. 有界 measurable function を単純 function で近似し、
3. measurable set の indicator を生成 algebra の有限和で近似する

ことで単純予測可能被積分過程へ近似できます。

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

です。従って有界予測可能 function だけを考えれば十分です。

有界予測可能 function は予測可能 sigma-field 上の単純 measurable functions で $L^2$ 近似できます。

残るのは予測可能 set の indicator を単純予測可能 rectangles で近似することです。

単純予測可能 rectangles の有限和で作る algebra を $\mathcal A$ とします。$\mathcal A$ は予測可能 sigma-field $\mathcal P$ を生成します。

有限測度 $\mu_M$ のもとで、

$$
\mathcal C
=
\left\{
C\in\mathcal P:
1_C
\text{ が }\mathcal A\text{-単純 functions で }L^2(\mu_M)\text{ 近似可能}
\right\}
$$

と置きます。

$\mathcal A$-単純 functions の $L^2(\mu_M)$ closure を $V$ と書くと、$V$ は vector space です。$\Omega\times(0,T]\in\mathcal A$ なので定数関数 $1$ は $V$ に属します。

$C\in\mathcal C$ なら $1_C\in V$ なので

$$
1_{C^c}=1-1_C\in V.
$$

従って $C^c\in\mathcal C$ です。

次に $C_1,C_2,\ldots\in\mathcal C$ が互いに素とします。有限和

$$
U_m=\bigcup_{j=1}^mC_j
$$

について

$$
1_{U_m}=\sum_{j=1}^m1_{C_j}\in V,
$$

よって $U_m\in\mathcal C$ です。$U=\bigcup_{j\ge1}C_j$ と置くと、有限測度性と連続性 from below から

$$
\|1_U-1_{U_m}\|_{L^2(\mu_M)}^2
=
\mu_M(U\setminus U_m)\to0.
$$

$V$ は閉空間なので $1_U\in V$、従って $U\in\mathcal C$ です。

以上より $\mathcal C$ は全体集合を含み、補集合と互いに素な可算和に閉じます。一方 $\mathcal A$ は algebra なので π-system でもあり、

$$
\sigma(\mathcal A)=\mathcal P.
$$

従って [π--λ theorem](../F0_00D3A_pi_lambda_Dynkin/index.md#thm-f0-00d3a-pi-lambda) により

$$
\mathcal P=\sigma(\mathcal A)\subset\mathcal C.
$$

逆包含は定義から明らかなので $\mathcal C=\mathcal P$。よって予測可能単純 functions、さらに単純予測可能 integrands が $L^2(\mu_M)$ に稠密です。
<!-- proof-end -->

---

## 6. $L^2$ 完備化で確率積分を作る

<a id="thm-sto6-l2-construction"></a>

<!-- formal-statement-start -->
> **定理（L2 完備化による確率積分の構成）**  
> $M$ を $M_0=0$ の continuous square-integrable マルチンゲール、$H\in L^2(M)$ とする。
>
> 単純予測可能 $H^{(n)}$ で
>
$$
E\int_0^T|H_s^{(n)}-H_s|^2\,d[M]_s\to0
$$
>
> となるものを取る。
>
> このとき単純 stochastic integrals
>
$$
I_t^{(n)}
=
\int_0^tH_s^{(n)}\,dM_s
$$
>
> は $[0,T]$ 上一様に probability で収束し、適切な subsequence ではほとんど確実に sup 距離で収束する。
>
> 極限 $I$ は近似列に依存せず、continuous square-integrable マルチンゲールとなる。この $I$ を
>
$$
I_t=\int_0^tH_s\,dM_s
$$
>
> と定義する。
>
> さらに各 $t\le T$ で
>
$$
E[I_t^2]
=
E\int_0^tH_s^2\,d[M]_s.
$$
<!-- formal-statement-end -->

この定理には「なぜ終端値だけでなく過程全体が収束するのか」という一点があります。そこを埋めるのが 連続時間 Doob $L^2$ 最大不等式 です。

---

## 7. 連続時間 Doob $L^2$ 最大不等式

<a id="thm-sto6-doob-l2"></a>

<!-- formal-statement-start -->
> **定理（連続時間 Doob L2 最大不等式）**  
> $N=(N_t)_{0\le t\le T}$ を continuous square-integrable マルチンゲールとする。このとき
>
$$
E\left[
\sup_{0\le t\le T}|N_t|^2
\right]
\le
4E[|N_T|^2].
$$
<!-- formal-statement-end -->

### 証明の見取り図

[STO2 の離散時間 Doob 最大不等式](../STO2/index.md#thm-sto2-doob-maximal)を dyadic time grid に適用し、grid を細かくします。連続性があるため grid 上最大値は標本路上の supremum へ増加します。

<!-- proof-start -->
### 証明

$n\ge1$ に対し二進格子

$$
D_n
=
\left\{
kT2^{-n}:k=0,\ldots,2^n
\right\}
$$

を取ります。

離散時間マルチンゲール

$$
N_{kT2^{-n}}
$$

を考え、その最大値を

$$
X_n^*
=
\max_{t\in D_n}|N_t|
$$

と書きます。$|N|$ は劣マルチンゲールなので、STO2 の [Doob 最大不等式](../STO2/index.md#thm-sto2-doob-maximal) の停止時刻 proof を事象 $\{X_n^*\ge\lambda\}$ まで保持すると

$$
\lambda P(X_n^*\ge\lambda)
\le
E\left[
|N_T|1_{\{X_n^*\ge\lambda\}}
\right].
$$

tail integral formula を使えば

$$
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
$$

[Tonelli theorem](../F0_00D2C_積測度_Tonelli_Fubini/index.md#thm-tonelli) を使った最後の等式では

$$
\int_0^\infty1_{\{X_n^*\ge\lambda\}}\,d\lambda=X_n^*
$$

としました。[Hölder inequality](../F0_00D2D_Lp_Holder_Minkowski/index.md#thm-f0-00d2d-01)（指数 $2,2$）より

$$
E[(X_n^*)^2]
\le
2\|N_T\|_2\|X_n^*\|_2.
$$

$\|X_n^*\|_2=0$ なら結論は自明で、それ以外なら両辺を $\|X_n^*\|_2$ で割って

$$
\|X_n^*\|_2
\le
2\|N_T\|_2.
$$

従って

$$
E[(X_n^*)^2]
\le
4E[|N_T|^2].
$$

$D_n\subset D_{n+1}$ なので左辺の random variables は単調増加します。連続標本路では dyadic points が dense なので

$$
\max_{t\in D_n}|N_t|^2
\uparrow
\sup_{0\le t\le T}|N_t|^2.
$$

[monotone convergence theorem](../F0_00D2B_単調収束_Fatou_優収束/index.md#ref-limit-integral-exchange) により

$$
E\left[
\sup_{0\le t\le T}|N_t|^2
\right]
\le
4E[|N_T|^2].
$$
<!-- proof-end -->

この証明では STO2 の停止時刻 argument から得られる tail inequality を実際に積分して $p=2$ 形まで導いたので、未証明の連続時間 maximal theorem は使っていません。

---

## 8. 完備化定理の論証

<!-- proof-start -->
### 証明

$H^{(n)}$ を [単純予測可能 density](#lem-sto6-simple-density) で選び、

$$
I^{(n)}=H^{(n)}\cdot M
$$

と置きます。

$n,m$ に対して [Itô 等長性](#thm-sto6-ito-isometry-simple) と [Doob $L^2$ inequality](#thm-sto6-doob-l2) から

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

右辺は 0 へ行くので、$I^{(n)}$ は標本路上の supremum の $L^2$ 距離で Cauchy です。

subsequence $(n_j)$ を

$$
\left(
E\sup_{t\le T}
|I_t^{(n_{j+1})}-I_t^{(n_j)}|^2
\right)^{1/2}
\le2^{-j}
$$

となるよう選べます。

[Hölder inequality](../F0_00D2D_Lp_Holder_Minkowski/index.md#thm-f0-00d2d-01)（指数 $2,2$）により

$$
E\left[
\sum_j
\sup_{t\le T}
|I_t^{(n_{j+1})}-I_t^{(n_j)}|
\right]
\le
\sum_j2^{-j}<\infty.
$$

従ってほとんど確実に

$$
\sum_j
\sup_{t\le T}
|I_t^{(n_{j+1})}-I_t^{(n_j)}|
<\infty.
$$

ゆえに subsequence はほとんど確実に sup 距離で Cauchy で、continuous limit $I$ を持ちます。

元の列全体についても先ほどの $L^2$ 評価と subsequence limit を使えば

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

従って $I$ はマルチンゲールです。

Itô 等長性も

$$
E[(I_t^{(n)})^2]
=
E\int_0^t(H_s^{(n)})^2\,d[M]_s
$$

へ $L^2$ convergence と $L^2(\mu_M)$ convergence を入れて極限を取れば得られます。

別の近似列を使っても、両者を交互に並べた近似列へ同じ評価を適用すれば極限差の supremum $L^2$ norm が 0 です。従って積分は近似列に依存しません。
<!-- proof-end -->

ここで $L^2$ 完備性は F0-00D2E の Riesz--Fischer 的な発想そのものです。今回は「確率変数の $L^2$」だけでなく、予測可能過程を random measure $d[M]$ で測った $L^2$ を使っています。

---

## 9. 確率積分の二次変分

確率積分が単にマルチンゲールになるだけではありません。ブラケットも被積分過程から直接読めます。

<a id="thm-sto6-integral-bracket"></a>

<!-- formal-statement-start -->
> **定理（確率積分の二次変分）**  
> $M$ を $M_0=0$ の continuous square-integrable マルチンゲール、$H\in L^2(M)$ とし、
>
$$
I_t=\int_0^tH_s\,dM_s
$$
>
> とする。このとき
>
$$
[I]_t
=
\int_0^tH_s^2\,d[M]_s,
\qquad
0\le t\le T.
$$
<!-- formal-statement-end -->

### 証明の見取り図

単純被積分過程なら、各区間で

$$
\Delta I=\xi_k\Delta M
$$

なので「二乗増分は係数の二乗倍」になります。

一般被積分過程では単純近似を使います。ただし partition limit を直接二重に追うのではなく、

$$
I^2-A
$$

がマルチンゲールになる increasing 過程 $A$ の一意性を STO5 から使う方がきれいです。

<!-- proof-start -->
### 証明

まず単純

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

第一項は予測可能な係数を掛けたマルチンゲール増分、第二項も STO5 の

$$
M^2-[M]
$$

のマルチンゲール増分からマルチンゲールです。

従って区間ごとに貼り合わせると

$$
I^2-A
$$

はマルチンゲールです。

一般の $H\in L^2(M)$ では単純 $H^{(n)}\to H$ を取り、

$$
I^{(n)}=H^{(n)}\cdot M,
\qquad
A_t^{(n)}
=
\int_0^t(H_s^{(n)})^2\,d[M]_s.
$$

完備化定理から

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

[Hölder inequality](../F0_00D2D_Lp_Holder_Minkowski/index.md#thm-f0-00d2d-01) を指数 $2,2$ で measure $\mu_M$ に対して使うと

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

マルチンゲール恒等式を $L^1$ 極限へ移すと

$$
I^2-A
$$

はマルチンゲールです。

$A$ は continuous increasing 適合過程、$A_0=0$ です。STO5 の二次変分 theorem におけるブラケットの一意性から

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

ブラウン運動なら

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

## 10. 停止操作と確率積分

<a id="prop-sto6-stopping"></a>

<!-- formal-statement-start -->
> **命題（停止操作と確率積分の交換）**  
> $\tau$ を停止時刻とする。積分が定義される範囲で
>
$$
(H\cdot M)^\tau
=
H\cdot M^\tau
=
(1_{(0,\tau]}H)\cdot M.
$$
>
> また
>
$$
[(H\cdot M)^\tau]_t
=
\int_0^{t\wedge\tau}H_s^2\,d[M]_s.
$$
<!-- formal-statement-end -->

### 証明の見取り図

単純被積分過程では stopped 増分を書き下すだけです。一般被積分過程では単純近似と Itô 等長性で極限を移します。

<!-- proof-start -->
### 証明

まず単純

$$
H=\sum_k\xi_k1_{(t_k,t_{k+1}]}
$$

を考えます。定義から

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

また $1_{(0,\tau]}$ は適合かつ $(0,\infty)$ 上 left-continuous なので予測可能です。

右側二進近似 $\tau_n\downarrow\tau$ を取ります。$\tau_n$ は grid-valued なので、単純 $H$ に対して

$$
1_{(0,\tau_n]}H
$$

は時間 grid を共通 refinement に取れば単純予測可能被積分過程です。従って [単純確率積分](#def-sto6-simple-integral) の定義から

$$
(1_{(0,\tau_n]}H)\cdot M
=
(H\cdot M)^{\tau_n}.
$$

右辺は標本路の連続性により、各有界 horizon 上

$$
(H\cdot M)^{\tau_n}
\to
(H\cdot M)^\tau
$$

uniformly ほとんど確実にです。

左辺は [Itô 等長性](#thm-sto6-ito-isometry-simple) から

$$
\begin{aligned}
&E\left|
\bigl((1_{(0,\tau_n]}-1_{(0,\tau]})H\bigr)\cdot M_T
\right|^2\\
&\qquad=
E\int_0^T
1_{(\tau,\tau_n]}(s)H_s^2\,d[M]_s.
\end{aligned}
$$

有界単純 $H$ なので、右辺は $[M]$ の標本路の連続性と $\tau_n\downarrow\tau$ から 0 へ行きます。必要なら $[M]_T$ を水準で止めて dominated convergence を使い、その後 monotone convergence で停止を外せます。

従って単純 $H$ について

$$
(H\cdot M)^\tau
=
(1_{(0,\tau]}H)\cdot M
=
H\cdot M^\tau.
$$

一般の $H\in L^2(M)$ では単純 $H^{(n)}\to H$ in $L^2(\mu_M)$ を取ります。Itô 等長性と

$$
[M^\tau]_t=[M]_{t\wedge\tau}
$$

から、各有界 horizon で

$$
H^{(n)}\cdot M^\tau\to H\cdot M^\tau,
$$

$$
(1_{(0,\tau]}H^{(n)})\cdot M
\to
(1_{(0,\tau]}H)\cdot M
$$

in $L^2$。Doob $L^2$ inequality で過程 supremum の $L^2$ convergence にも持ち上がります。

単純 case の等式を極限へ移して

$$
(H\cdot M)^\tau
=
H\cdot M^\tau
=
(1_{(0,\tau]}H)\cdot M
$$

を得ます。

ブラケット formula は [確率積分の二次変分](#thm-sto6-integral-bracket) と STO5 の停止操作 property から

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

この交換則は局所化の貼り合わせに使います。

---

## 11. 大域的 $L^2$ 条件を局所化で外す

大域的 $L^2$ 条件は便利ですが、SDE では係数が有界でないことが普通です。そこで停止操作で有限化します。

<a id="def-sto6-local-l2"></a>

<!-- formal-statement-start -->
> **定義（locally square-integrable 被積分過程）**  
> $M$ を連続局所マルチンゲール、$H$ を予測可能過程とする。
>
> 各 $t<\infty$ について
>
$$
\int_0^tH_s^2\,d[M]_s<\infty
\qquad\text{ほとんど確実に}
$$
>
> が成り立つとき、$H$ を $M$ に関して **locally square-integrable** という。
<!-- formal-statement-end -->

この標本路ごとの条件から、積分構成に必要な $L^2$ 停止操作 sequence は作れます。実際

$$
A_t:=\int_0^tH_s^2\,d[M]_s
$$

は continuous increasing 過程なので、

$$
\beta_n
=
\inf\{t\ge0:A_t\ge n\}\wedge n
$$

と置けば $\beta_n\uparrow\infty$ ほとんど確実にかつ

$$
A_{T\wedge\beta_n}\le n
$$

です。従って

$$
E\int_0^{T\wedge\beta_n}H_s^2\,d[M]_s
\le n.
$$

逆に increasing 停止操作 times $\beta_n\uparrow\infty$ があり、各 $n,T$ で stopped energy の期待値が有限なら、stopped energy 自体はほとんど確実に有限です。固定した $T$ ではほとんど確実に十分大きい $n$ で $\beta_n>T$ となるので、元の $A_T$ もほとんど確実に有限です。

<!-- definition-example-start: def-sto6-local-l2 -->
### 直接例：$H_t=e^{B_t^2}$ は局所化すれば積分できる

**定義の確認**

ブラウン運動 $B$ に対し

$$
H_t=e^{B_t^2}
$$

とします。continuous 適合過程は left-continuous 適合過程でもあるため、予測可能 sigma-field の定義から予測可能です。

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

は $t<1/4$ でのみ有限で、$t>1/4$ では発散します。従って十分長い時間区間では大域的 $L^2(B)$ 条件は失われます。

局所化は単なる形式ではなく、大域的モーメントが壊れる被積分過程を扱うために必要です。
<!-- definition-example-end -->

<a id="thm-sto6-local-integral"></a>

<!-- formal-statement-start -->
> **定理（局所確率積分）**  
> $M$ を連続局所マルチンゲール、$H$ を $M$ に関して locally square-integrable 予測可能過程とする。
>
> このとき一意な連続局所マルチンゲール
>
$$
H\cdot M
$$
>
> が存在する。さらに $M^{\tau_n}$ が square-integrable マルチンゲールとなり
>
$$
E\int_0^T1_{\{s\le\tau_n\}}H_s^2\,d[M]_s<\infty
$$
>
> を各 $n,T$ で満たす increasing 停止時刻列 $\tau_n\uparrow\infty$ を取れば、
>
$$
(H\cdot M)^{\tau_n}
=
(1_{(0,\tau_n]}H)\cdot M^{\tau_n}
$$
>
> が成り立つ。
>
> さらに
>
$$
[H\cdot M]_t
=
\int_0^tH_s^2\,d[M]_s.
$$
<!-- formal-statement-end -->

### 証明の見取り図

$M$ 自身の局所化列、$|M|$ の exit time、energy

$$
\int H^2\,d[M]
$$

の exit timeを同時に止めます。停止後は square-integrable theory が使えます。

異なる $n$ の積分は停止操作恒等式により重なる区間で一致するので、標本路を貼り合わせられます。

<!-- proof-start -->
### 証明

$M$ を真のマルチンゲールにする局所化列を $\rho_n$ とします。

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

すると $M^{\tau_n}$ は有界 continuous マルチンゲールなので square-integrable です。また

$$
E\int_0^T
1_{\{s\le\tau_n\}}H_s^2\,d[M]_s
\le n
$$

です。

従って大域的 $L^2$ theory を square-integrable マルチンゲール $M^{\tau_n}$ に適用し、

$$
I^{(n)}
:=
(1_{(0,\tau_n]}H)\cdot M^{\tau_n}
$$

と定義します。$M^{\tau_n}$ は $\tau_n$ 以後一定なので、$I^{(n)}$ も $\tau_n$ 以後一定です。

$m\ge n$ なら $\tau_n\le\tau_m$ であり、停止操作恒等式から

$$
\begin{aligned}
(I^{(m)})^{\tau_n}
&=
\left(
(1_{(0,\tau_m]}H)\cdot M^{\tau_m}
\right)^{\tau_n}\\
&=
(1_{(0,\tau_n]}H)\cdot M^{\tau_n}\\
&=
I^{(n)}.
\end{aligned}
$$

従って $t\le\tau_n$ では $I^{(m)}_t=I^{(n)}_t$。この compatibility により

$$
I_t=I_t^{(n)}
\quad\text{on }\{t\le\tau_n\}
$$

と定義できます。

$\tau_n\uparrow\infty$ ほとんど確実になので $I$ は全時間上で定まり、各 $I^{\tau_n}=I^{(n)}$ はマルチンゲール。従って $I$ は連続局所マルチンゲールです。

各停止区間上でブラケット formula が成り立つので

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

一意性も、任意の二つの候補が各 $\tau_n$ 上で同じ大域的 $L^2$ integral に一致することから従います。
<!-- proof-end -->

---

## 12. ブラウン運動に関する確率積分

ブラウン運動では

$$
[B]_t=t
$$

なので、全てが見慣れた Lebesgue 時間積分に変わります。

$H$ 予測可能で

$$
E\int_0^T H_s^2\,ds<\infty
$$

なら

$$
I_t=\int_0^tH_s\,dB_s
$$

は continuous square-integrable マルチンゲールで、

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

決定論的 $h\in L^2[0,T]$ なら単純決定論的 functions $h_n$ で近似できます。各

$$
\int_0^T h_n(s)\,dB_s
$$

はブラウン increments の有限線形結合なのでガウスです。

$L^2$ 極限の characteristic function を取れば

<a id="prop-sto6-deterministic-gaussian"></a>

<!-- formal-statement-start -->
> **命題（決定論的ブラウン integral はガウス）**  
> 決定論的 $h\in L^2([0,T])$ に対し
>
$$
\int_0^T h(s)\,dB_s
\sim
N\left(
0,
\int_0^T h(s)^2\,ds
\right).
$$
<!-- formal-statement-end -->

<!-- proof-start -->
### 証明

単純決定論的

$$
h_n=\sum_k a_{k,n}1_{(t_{k,n},t_{k+1,n}]}
$$

なら

$$
\int_0^T h_n\,dB
=
\sum_k a_{k,n}(B_{t_{k+1,n}}-B_{t_{k,n}})
$$

は独立 centered ガウスの線形結合なのでガウスで、分散は

$$
\sum_ka_{k,n}^2(t_{k+1,n}-t_{k,n})
=
\int_0^T h_n^2\,ds.
$$

$h_n\to h$ in $L^2[0,T]$ とすると [Itô 等長性](#thm-sto6-ito-isometry-simple) により

$$
X_n:=\int h_n\,dB
\to
X:=\int h\,dB
$$

in $L^2$ です。従って [Hölder inequality](../F0_00D2D_Lp_Holder_Minkowski/index.md#thm-f0-00d2d-01)（指数 $2,2$）により $E|X_n-X|\to0$ でもあります。任意の $\theta\in\mathbb R$ について

$$
\left|
E[e^{i\theta X_n}]
-
E[e^{i\theta X}]
\right|
\le
|\theta|E|X_n-X|
\to0.
$$

一方

$$
\int h_n^2\to\int h^2
$$

なので、$X_n$ のガウス characteristic function

$$
\exp\left(
-\frac12\theta^2\int h_n^2
\right)
$$

の極限は

$$
\exp\left(
-\frac12\theta^2\int h^2
\right).
$$

従って characteristic function の一意性から $X$ は主張した centered ガウス法則を持ちます。
<!-- proof-end -->

random 被積分過程のとき、積分は一般にはガウスではありません。この区別は重要です。

---

## 13. 最大過程とブラケットの高次モーメントを比較する

Doob $L^2$ inequality は終端値を通して標本路上の supremum を抑えました。次の定理はさらに最大過程をブラケットと直接比較します。

<a id="thm-sto6-bdg"></a>

<!-- formal-statement-start -->
> **定理（Burkholder--Davis--Gundy inequality）**  
> $p>0$ とする。$p$ のみに依存する定数 $0<c_p\le C_p<\infty$ が存在し、$N_0=0$ の任意の連続局所マルチンゲール $N$ と任意の停止時刻 $\tau$ に対し
>
$$
c_p\,
E\left([N]_\tau^{p/2}\right)
\le
E\left[
\sup_{0\le t\le\tau}|N_t|^p
\right]
\le
C_p\,
E\left([N]_\tau^{p/2}\right)
$$
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

局所マルチンゲールでは停止操作してから monotone convergence を使えば同じ比較が得られます。

### 一般 $p$ の証明境界

一般 $p$ の完全証明には停止時刻 decomposition、good-$\lambda$ inequality、または Burkholder function の議論が必要で、STO6 の learning objective である「確率積分の構成」から大きく外れます。

そのため本章では **一般 $p$ の BDG inequality 自体は標準定理として意図的 black box** とします。代わりに、

- $p=2$ は完全に証明する。
- 確率積分へどう適用するかは明示する。
- 後続 SDE で必要なモーメント評価の場所を示す。

という境界にします。

[確率積分のブラケット](#thm-sto6-integral-bracket) を代入すると

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

STO9 の SDE で Picard iteration や解のモーメント評価を標本路上の supremum まで持ち上げるとき、この形を使います。

---

## 14. なぜ予測可能でなければならないのか

もし未来の増分を見て係数を決めてよいなら、マルチンゲール cancellation は壊れます。

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

形式的に単純 integral と同じ和を書くと

$$
\sum_k\xi_k(B_{t_{k+1}}-B_{t_k})
=
\sum_k|B_{t_{k+1}}-B_{t_k}|.
$$

右辺は非負で、平均 0 のマルチンゲール増分 sum ではありません。さらに partition を細かくするとブラウン標本路の infinite variation が顔を出します。

つまり predictability は単なる technical convention ではなく、

$$
\boxed{
\text{係数を決める}
\quad\text{then}\quad
\text{新しい雑音増分が来る}
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

を確率積分へ、

$$
\sum f''(X)(\Delta X)^2
$$

をブラケット integral へ送る準備ができました。

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

という Itô formula を導きます。多次元版、積の公式、[確率指数関数](../STO7/index.md#def-sto7-stochastic-exponential)、ユークリッド空間での Stratonovich 積分まで進みます。

---

# 16. 演習

## STO6-A01 単純ブラウン integral を計算する

- Level: A
- 目安時間: 12分

$0<s<T$ とし、

$$
H_t=a1_{(0,s]}(t)+b1_{(s,T]}(t)
$$

とする。$a,b\in\mathbb R$ は定数とする。

1. $\int_0^T H_t\,dB_t$ をブラウン increments で書け。
2. 平均と分散を求めよ。
3. 二次変分 $[H\cdot B]_T$ を求めよ。

<!-- solution-start -->
### 詳細解答

1. [単純確率積分](#def-sto6-simple-integral) の定義から

$$
\int_0^T H_t\,dB_t
=
aB_s+b(B_T-B_s).
$$

2. $B_s$ と $B_T-B_s$ は独立 centered ガウスなので平均は 0。

分散は

$$
a^2\operatorname{Var}(B_s)
+
b^2\operatorname{Var}(B_T-B_s)
=
a^2s+b^2(T-s).
$$

Itô 等長性でも

$$
E\int_0^T H_t^2\,dt
=
a^2s+b^2(T-s)
$$

と同じ値が出ます。

3. ブラケット formula から

$$
[H\cdot B]_T
=
\int_0^T H_t^2\,dt
=
a^2s+b^2(T-s).
$$
<!-- solution-end -->

## STO6-A02 random 予測可能な係数の等長性

- Level: A
- 目安時間: 15分

$0<s<T$ とし、

$$
H_t=1_{\{B_s\ge0\}}1_{(s,T]}(t)
$$

とする。

1. $H$ が単純予測可能であることを確認せよ。
2. 積分を明示せよ。
3. [Itô 等長性](#thm-sto6-ito-isometry-simple) によりその二乗平均を求めよ。

<!-- solution-start -->
### 詳細解答

1. 係数 $1_{\{B_s\ge0\}}$ は有界かつ $\mathcal F_s$-measurable なので、定義どおり $(s,T]$ 上の単純予測可能な係数です。

2.

$$
\int_0^T H_t\,dB_t
=
1_{\{B_s\ge0\}}(B_T-B_s).
$$

3. [Itô 等長性](#thm-sto6-ito-isometry-simple) から

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

です。$s>0$ なら $B_s$ は centered nondegenerate ガウスなので対称性から
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

## STO6-A03 Doob $L^2$ 評価を積分へ適用する

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

$I$ は STO6 の construction theorem により continuous square-integrable マルチンゲールです。

従って Doob $L^2$ inequality から

$$
E\sup_{t\le T}|I_t|^2
\le
4E|I_T|^2.
$$

[Itô 等長性](#thm-sto6-ito-isometry-simple) により

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

## STO6-A04 停止操作恒等式を単純被積分過程で確認する

- Level: A
- 目安時間: 15分

$H_t=\xi1_{(a,b]}(t)$、$\xi\in L^\infty(\mathcal F_a)$ とし、$\tau$ を停止時刻とする。

$$
(H\cdot M)_{t\wedge\tau}
=
(H\cdot M^\tau)_t
$$

を定義から確認せよ。

<!-- solution-start -->
### 詳細解答

[単純確率積分](#def-sto6-simple-integral) の定義から

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

## STO6-B01 $L^2$ 近似から標本路の sup 距離による近似へ

- Level: B
- 目安時間: 20分

単純予測可能 $H^{(n)}$ が

$$
E\int_0^T|H_s^{(n)}-H_s|^2\,d[M]_s\to0
$$

を満たすとする。

$I^{(n)}=H^{(n)}\cdot M$ が

$$
E\sup_{t\le T}|I_t^{(n)}-I_t|^2\to0
$$

となる continuous マルチンゲール $I$ を持つことを、[Doob $L^2$ inequality](#thm-sto6-doob-l2) と [Itô 等長性](#thm-sto6-ito-isometry-simple) から説明せよ。

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

Itô 等長性を右辺へ使うと

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

ゆえにほとんど確実にこの級数は有限で、subsequence は sup 距離で収束します。各 $I^{(n_j)}$ は continuous なので極限 $I$ も continuous です。

元の列は supremum $L^2$ で Cauchy だったため、この $I$ へ列全体が supremum $L^2$ 収束します。

各固定時刻で $L^2$ 収束し、マルチンゲール恒等式も conditional expectation の $L^2$ 連続性で極限へ移るため、$I$ はマルチンゲールです。
<!-- solution-end -->

## STO6-B02 ブラケットを piecewise 被積分過程で計算する

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

ブラケット formula から

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

ブラウン運動なら $[M]_t=t$ なので

$$
[I]_t
=
\begin{cases}
a^2t,&t\le s,\\
a^2s+b^2(t-s),&t>s.
\end{cases}
$$
<!-- solution-end -->

## STO6-B03 大域的 $L^2$ が壊れても局所 integral は作れる

- Level: B
- 目安時間: 25分

ブラウン運動 $B$ と

$$
H_t=e^{B_t^2}
$$

を考える。

1. $H$ が予測可能であることを示せ。
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

1. $B$ は continuous 適合過程です。continuous 適合過程は left-continuous 適合過程でもあるので予測可能です。連続写像 $x\mapsto e^{x^2}$ を合成しても predictability は保たれるので $H$ は予測可能です。

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

3. $B_t\sim N(0,t)$ です。standard ガウス $Z$ に対し

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

[Tonelli theorem](../F0_00D2C_積測度_Tonelli_Fubini/index.md#thm-tonelli) により

$$
E\int_0^T H_t^2\,dt
=
\int_0^T E[e^{2B_t^2}]\,dt.
$$

$T>1/4$ なら positive measure の区間 $(1/4,T]$ で被積分過程が無限なので、全体も無限です。

したがって大域的 $L^2(B)$ 被積分過程ではありませんが、局所確率積分は構成できます。
<!-- solution-end -->

## STO6-C01 局所化に依存しないことを証明する

- Level: C
- 目安時間: 40分

$M$ を連続局所マルチンゲール、$H$ を locally square-integrable 予測可能過程とする。

二つの局所化列 $(\tau_n)$、$(\sigma_m)$ を使って局所確率積分を構成したとする。それぞれの候補を $I$、$J$ とする。

1. $\rho_{n,m}=\tau_n\wedge\sigma_m$ 上で $I$ と $J$ が一致することを示せ。
2. $I$ と $J$ が indistinguishable であることを示せ。
3. ブラケット恒等式
   $$
   [I]_t=\int_0^tH_s^2\,d[M]_s
   $$
   が大域的に成り立つことを示せ。

<!-- solution-start -->
### 詳細解答

1. $\rho_{n,m}$ で止めると、両方の構成は同じ被積分過程

$$
1_{(0,\rho_{n,m}]}H
$$

を同じ stopped マルチンゲール $M^{\rho_{n,m}}$ に対して積分した大域的 $L^2$ integral になります。

停止操作恒等式から

$$
I^{\rho_{n,m}}
=
(1_{(0,\rho_{n,m}]}H)\cdot M
=
J^{\rho_{n,m}}.
$$

従って $\rho_{n,m}$ 以前では両者は一致します。

2. ほとんど確実に

$$
\tau_n\uparrow\infty,
\qquad
\sigma_m\uparrow\infty.
$$

従って任意の決定論的 $T$ について、ほとんど全ての $\omega$ で十分大きい $n,m$ を取れば

$$
\rho_{n,m}(\omega)>T.
$$

1 の結果から、その $\omega$ について $[0,T]$ 全体で

$$
I_t(\omega)=J_t(\omega).
$$

$T=1,2,3,\ldots$ を可算個同時に取れば、probability one の event 上で全 $t\ge0$ について一致します。両過程は continuous なので indistinguishable です。

3. 各 $\tau_n$ 上では大域的 $L^2$ theory から

$$
[I]_{t\wedge\tau_n}
=
\int_0^{t\wedge\tau_n}H_s^2\,d[M]_s.
$$

固定 $t$ に対し $\tau_n\uparrow\infty$ なので、ほとんど確実に十分大きい $n$ では $t<\tau_n$。従って

$$
[I]_t
=
\int_0^tH_s^2\,d[M]_s.
$$

continuous 過程同士の等式なので、rational $t$ 上の probability-one event を取って連続性で全 $t$ へ延長できます。

これでブラケット恒等式は局所化列の選択に依存せず大域的に成立します。
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

- 単純過程の積分が $L^2$ 完備化できる
- continuous マルチンゲール limit が得られる
- 標本路上の supremum は Doob inequality で制御できる
- ブラケットは $\int H^2\,d[M]$
- 停止操作と integral が交換できる
- 局所化で局所マルチンゲールまで拡張できる
- BDG により higher モーメントの標本路評価へ進める

という構造が一本につながりました。

次は STO7 で、二次変分と確率積分を Taylor expansion に差し込み、multidimensional Itô calculus と Euclidean Stratonovich calculus を構成します。
