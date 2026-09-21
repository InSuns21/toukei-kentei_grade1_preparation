# STO10：weak solution と Girsanov — noise を固定せず law を作る

<!-- definition-example-audit: strict -->

STO9 では

$$
dX_t=b(X_t)\,dt+\sigma(X_t)\,dW_t
$$

に対し、初期値と Brown 運動を先に固定し、その同じ noise の上で解を作りました。

しかし存在問題には、もう一つ自然な自由度があります。

$$
\boxed{
\text{確率空間も Brown 運動もこちらで選んでよいなら、
SDE の law は作れるか}
}
$$

これが weak solution の発想です。

本章ではさらに、確率空間そのものを変えずに **同じ標本集合へ別の確率測度を載せる** 方法を使います。

中心線は

$$
\boxed{
\text{weak solution}
\to
\text{change of measure}
\to
\text{stochastic exponential}
\to
\text{Novikov}
\to
\text{Girsanov}
\to
\text{drift removal}
\to
\text{weak existence}
}
$$

です。

最後に pathwise uniqueness と uniqueness in law を整理し、Yamada--Watanabe theorem が strong / weak の二つの世界をどこで結ぶかを明確にします。

本章の Girsanov 部分は有限時間区間 $[0,T]$ を固定して扱います。これは単なる書きやすさではありません。有限時間ごとの同値性と無限時間全体での同値性は別問題です。

---

## 1. strong solution では何を先に固定していたか

STO9 の [strong solution](../STO9/index.md#def-sto9-strong-solution) では、

- 確率空間
- 初期値
- Brown 運動
- それらが作る filtration

を先に固定しました。

その上で $X$ を同じ情報の上に構成します。

量化の順序を強調すると

$$
\boxed{
(\Omega,\mathcal F,(\mathcal F_t),P,\xi,W)
\text{ を先に固定}
\quad\Longrightarrow\quad
X\text{ を探す}
}
$$

です。

weak solution ではこの順序を変えます。

---

## 2. weak solution：確率空間と Brown 運動も解の一部

<a id="def-sto10-weak-solution"></a>

<!-- formal-statement-start -->
> **定義（weak solution）**  
> $b:\mathbb R^d\to\mathbb R^d$、$\sigma:\mathbb R^d\to\mathbb R^{d\times m}$ を Borel 可測とし、初期分布 $\mu$ を $\mathbb R^d$ 上の確率測度とする。
>
> 時間区間 $[0,T]$ 上の **weak solution** とは、
>
> 1. filtered probability space
>
> $$
> (\Omega,\mathcal F,(\mathcal F_t)_{0\le t\le T},P),
> $$
>
> 2. この filtration に関する $m$ 次元 Brown 運動 $W$,
> 3. continuous adapted $\mathbb R^d$-値 process $X$
>
> の組であって、
>
> $$
> \mathcal L_P(X_0)=\mu,
> $$
>
> 各 $t\le T$ について
>
> $$
> \int_0^t
> \left(
> |b(X_s)|
> +
> \|\sigma(X_s)\|_{\mathrm F}^2
> \right)ds
> <
> \infty
> \qquad P\text{-a.s.},
> $$
>
> かつ
>
> $$
> X_t
> =
> X_0
> +
> \int_0^t b(X_s)\,ds
> +
> \int_0^t\sigma(X_s)\,dW_s
> $$
>
> が全ての $t\in[0,T]$ で $P$-a.s. 成り立つものをいう。
<!-- formal-statement-end -->

strong solution との違いは、方程式そのものではありません。

weak solution では

$$
\boxed{
(\Omega,\mathcal F,(\mathcal F_t),P,W,X)
\text{ をまとめて探せる}
}
$$

ことが本質です。

<!-- definition-example-start: def-sto10-weak-solution -->
### 直接例：定数係数なら weak solution の全要素を手で確認できる

$d=m=1$ とし

$$
dX_t=\mu\,dt+\sigma\,dW_t,
\qquad
X_0=x
$$

を考えます。

standard Brown 運動 $W$ を持つ任意の usual filtered probability space を一つ取り、

$$
X_t=x+\mu t+\sigma W_t
$$

と置きます。

**定義の確認**

1. $W$ は選んだ filtration に関する Brown 運動です。
2. $X$ は $W$ の連続関数なので continuous adapted です。
3. 係数は定数なので

$$
\int_0^T
\left(
|\mu|+\sigma^2
\right)ds
=
T(|\mu|+\sigma^2)
<
\infty.
$$

4. 積分表示は

$$
x+\int_0^t\mu\,ds+\int_0^t\sigma\,dW_s
=
x+\mu t+\sigma W_t
=
X_t.
$$

従って、確率空間・Brown 運動・process $X$ を合わせたこの組は weak solution です。
<!-- definition-example-end -->

weak という語は「近似が粗い」「方程式を近似的にしか満たさない」という意味ではありません。

積分方程式は同じように $P$-a.s. 満たします。違うのは **何を先に固定するか** です。

---

## 3. strong solution は自動的に weak solution である

<a id="prop-sto10-strong-implies-weak"></a>

<!-- formal-statement-start -->
> **命題（strong solution は weak solution を与える）**  
> STO9 の意味で、ある filtered probability space 上に初期値 $\xi$、Brown 運動 $W$、strong solution $X$ が与えられているとする。
>
> このとき、その同じ
>
> $$
> (\Omega,\mathcal F,(\mathcal F_t),P,W,X)
> $$
>
> を用いれば $X$ は weak solution でもある。
<!-- formal-statement-end -->

### 証明の見取り図

weak solution は確率空間を「選んでよい」と言っているだけです。

strong solution ですでに使える確率空間が一つ与えられているなら、それをそのまま選べばよいだけです。

<!-- proof-start -->
### 証明

strong solution の定義から、

- $W$ は指定 filtration に関する Brown 運動
- $X$ は continuous adapted
- 必要な時間積分と stochastic integral は well-defined
- SDE の積分表示を満たす

ことが既に成立しています。

さらに $X_0=\xi$ なので初期分布は $\mathcal L_P(\xi)$ です。

したがって weak solution の全条件を満たします。
<!-- proof-end -->

逆向きは自明ではありません。

weak solution では、解を作るために都合のよい確率空間や Brown 運動を選べるからです。

この「逆向き」を pathwise uniqueness と結び付けるのが章末の Yamada--Watanabe theorem です。

---

## 4. 確率測度を変えるとは何か

ここから有限時間 $T<\infty$ を固定します。

同じ可測空間 $(\Omega,\mathcal F_T)$ 上に二つの確率測度 $P,Q$ を置きます。

絶対連続性と Radon--Nikodym 微分は [F0-00P2](../F0_00P2_密度_期待値_Radon_Nikodym/index.md#def-f0-00p2-absolute-continuity) で構成済みです。

<a id="def-sto10-equivalent-measures"></a>

<!-- formal-statement-start -->
> **定義（同値な確率測度）**  
> $(\Omega,\mathcal F_T)$ 上の確率測度 $P,Q$ が
>
> $
> P\ll Q
> \qquad\text{かつ}\qquad
> Q\ll P
> $
>
> を満たすとき、$P,Q$ は **equivalent** であるといい
>
> $
> P\sim Q
> $
>
> と書く。
<!-- formal-statement-end -->

<a id="def-sto10-density-process"></a>

<!-- formal-statement-start -->
> **定義（density process）**  
> $Q\ll P$ とし、
>
> $
> Z_T
> :=
> \frac{dQ}{dP}
> $
>
> とする。filtration $(\mathcal F_t)_{0\le t\le T}$ に対して
>
> $
> Z_t
> :=
> E_P[Z_T\mid\mathcal F_t]
> $
>
> を **density process** と呼ぶ。
<!-- formal-statement-end -->

$P\sim Q$ は「全ての事象の確率が同じ」という意味ではありません。

同じなのは零確率事象です。

$$
P(A)=0
\quad\Longleftrightarrow\quad
Q(A)=0.
$$

したがって almost sure な性質は共有しますが、

- 平均
- 分布
- martingale 性
- Brownian motion であること

は測度を変えると変わり得ます。

### 直接例：二点空間で測度と density process を直接確認する

$$
\Omega=\{a,b\}
$$

とし

$$
P(a)=P(b)=\frac12,
\qquad
Q(a)=\frac13,
\quad
Q(b)=\frac23
$$

とします。

<!-- definition-example-start: def-sto10-equivalent-measures -->
**同値性の確認**

両測度は $a,b$ に正の質量を持つので、零確率になるのは空集合だけです。従って

$$
P\ll Q,
\qquad
Q\ll P,
$$

すなわち

$$
P\sim Q.
$$
<!-- definition-example-end -->

密度 $Z_T=dQ/dP$ は一点集合で

$$
Q(\{\omega\})
=
Z_T(\omega)P(\{\omega\})
$$

を満たすため

$$
Z_T(a)=\frac{1/3}{1/2}=\frac23,
\qquad
Z_T(b)=\frac{2/3}{1/2}=\frac43.
$$

実際

$$
E_P[Z_T]
=
\frac12\frac23+\frac12\frac43
=
1.
$$

<!-- definition-example-start: def-sto10-density-process -->
**density process の確認**

filtration を

$$
\mathcal F_0=\{\varnothing,\Omega\},
\qquad
\mathcal F_T=2^\Omega
$$

とします。

定義から

$$
Z_0
=
E_P[Z_T]
=
1,
$$

一方、終端時刻では $Z_T$ 自身が $\mathcal F_T$-可測なので

$$
E_P[Z_T\mid\mathcal F_T]
=
Z_T.
$$

従ってこの二時点 filtration に対する density process は

$$
Z_0=1,
\qquad
Z_T(a)=\frac23,
\quad
Z_T(b)=\frac43.
$$
<!-- definition-example-end -->

また任意の確率変数 $Y$ について

$$
E_Q[Y]
=
E_P[Z_TY].
$$

同じ二点でも重みを変えれば平均は変わります。

---

## 5. density process は martingale になる

<a id="prop-sto10-density-martingale"></a>

<!-- formal-statement-start -->
> **命題（density process の martingale 性）**  
> $Q\ll P$ とし
>
> $$
> Z_T=\frac{dQ}{dP},
> \qquad
> Z_t=E_P[Z_T\mid\mathcal F_t]
> $$
>
> とする。このとき $(Z_t)_{0\le t\le T}$ は非負 $P$-martingale で
>
> $$
> E_P[Z_t]=1
> $$
>
> を満たす。
>
> さらに $Y$ が $\mathcal F_t$-可測で $Q$-可積分なら
>
> $$
> E_Q[Y]
> =
> E_P[Z_tY].
> $$
<!-- formal-statement-end -->

### 証明の見取り図

martingale 性は条件付き期待値の tower property そのものです。

期待値変換は Radon--Nikodym 密度の定義

$$
E_Q[Y]=E_P[Z_TY]
$$

から、$Y$ が時刻 $t$ で既知であることを使って $Z_T$ を $Z_t$ へ戻します。

<!-- proof-start -->
### 証明

$0\le s\le t\le T$ とします。

[F0-00P3A の tower property](../F0_00P3A_条件付き期待値_Radon_Nikodym/index.md#thm-f0-00p3a-tower) から

$$
\begin{aligned}
E_P[Z_t\mid\mathcal F_s]
&=
E_P[
E_P[Z_T\mid\mathcal F_t]
\mid\mathcal F_s
]\\
&=
E_P[Z_T\mid\mathcal F_s]\\
&=
Z_s.
\end{aligned}
$$

従って $Z$ は $P$-martingale です。

また

$$
E_P[Z_t]
=
E_P[Z_T]
=
Q(\Omega)
=
1.
$$

$Y$ が $\mathcal F_t$-可測なら、Radon--Nikodym 表示と既知量の取り出しから

$$
\begin{aligned}
E_Q[Y]
&=
E_P[Z_TY]\\
&=
E_P[
E_P[Z_TY\mid\mathcal F_t]
]\\
&=
E_P[
Y E_P[Z_T\mid\mathcal F_t]
]\\
&=
E_P[Z_tY].
\end{aligned}
$$
<!-- proof-end -->

この命題は、測度変換を process の言葉へ持ち込む入口です。

---

## 6. Girsanov に使いたい density は stochastic exponential

$W=(W^1,\ldots,W^m)$ を $P$ の下の $m$ 次元 Brown 運動とします。

progressively measurable $\mathbb R^m$-値 process $\theta$ が

$$
\int_0^T|\theta_s|^2\,ds<\infty
\qquad P\text{-a.s.}
$$

を満たすとします。

continuous local martingale

$$
M_t
=
-\int_0^t\theta_s^\top dW_s
$$

を作ります。

STO6 の bracket formula から

$$
[M]_t
=
\int_0^t|\theta_s|^2\,ds.
$$

[STO7 の stochastic exponential](../STO7/index.md#def-sto7-stochastic-exponential) は

$$
\begin{aligned}
Z_t
&=
\mathcal E(M)_t\\
&=
\exp\left(
-\int_0^t\theta_s^\top dW_s
-\frac12\int_0^t|\theta_s|^2\,ds
\right).
\end{aligned}
$$

です。

[基本恒等式](../STO7/index.md#prop-sto7-stochastic-exponential-identity) から

$$
dZ_t
=
-Z_t\theta_t^\top dW_t.
$$

したがって $Z$ は正の continuous local martingale です。

ここで重要な落とし穴があります。

$$
\boxed{
\text{positive local martingale}
\not\Rightarrow
\text{martingale with }E[Z_T]=1
}
$$

です。

非負 local martingale は supermartingale なので

$$
E_P[Z_T]\le1
$$

までは言えます。

もし厳密に

$$
E_P[Z_T]<1
$$

なら

$$
Q(A):=E_P[Z_T\mathbf1_A]
$$

としても

$$
Q(\Omega)<1
$$

となり、確率測度を作れません。

したがって Girsanov の前に「stochastic exponential が真の martingale である」ことを保証する条件が必要です。

---

## 7. まず bounded quadratic energy なら完全に閉じる

一般の Novikov condition の前に、機構が目で追える場合を証明します。

<a id="lem-sto10-bounded-energy-exponential"></a>

<!-- formal-statement-start -->
> **補題（bounded quadratic energy なら stochastic exponential は真の martingale）**  
> $M$ を $M_0=0$ の continuous local martingale とし、ある定数 $C<\infty$ に対して
>
> $$
> [M]_T\le C
> \qquad P\text{-a.s.}
> $$
>
> とする。
>
> このとき
>
> $$
> Z_t=\mathcal E(M)_t
> $$
>
> は $[0,T]$ 上の真の martingale で、
>
> $$
> E_P[Z_t]=1
> $$
>
> を満たす。
<!-- formal-statement-end -->

### 証明の見取り図

local martingale $Z$ を bounded stopping time で止めて真の martingale にします。

核心は stopped family に一様な $L^2$ bound を作ることです。

恒等式

$$
Z_t^2
=
\mathcal E(2M)_t\,e^{[M]_t}
$$

と

$$
[M]_T\le C
$$

から

$$
E[Z^2]\le e^C
$$

が出ます。

$L^2$ boundedness は一様可積分性を与えるので、localization を外せます。

<!-- proof-start -->
### 証明

$Z=\mathcal E(M)$ は正の continuous local martingale です。

$$
\tau_n
=
\inf\{t\le T:Z_t\ge n\}\wedge T
$$

と置きます。

continuity により

$$
0<Z_{t\wedge\tau_n}\le n
$$

なので $Z^{\tau_n}$ は bounded local martingale、従って真の martingale です。

次に

$$
\begin{aligned}
Z_{t\wedge\tau_n}^2
&=
\exp\left(
2M_{t\wedge\tau_n}
-
[M]_{t\wedge\tau_n}
\right)\\
&=
\exp\left(
2M_{t\wedge\tau_n}
-
2[M]_{t\wedge\tau_n}
\right)
\exp\left(
[M]_{t\wedge\tau_n}
\right)\\
&=
\mathcal E(2M^{\tau_n})_t
\exp\left(
[M]_{t\wedge\tau_n}
\right).
\end{aligned}
$$

非負 local martingale は supermartingale なので

$$
E_P[\mathcal E(2M^{\tau_n})_t]\le1.
$$

さらに

$$
[M]_{t\wedge\tau_n}\le C.
$$

従って

$$
\begin{aligned}
E_P[Z_{t\wedge\tau_n}^2]
&\le
e^C
E_P[\mathcal E(2M^{\tau_n})_t]\\
&\le e^C.
\end{aligned}
$$

したがって family

$$
\{Z_{t\wedge\tau_n}:n\ge1\}
$$

は $L^2$ bounded であり、[F0-00P4A の $L^p$ boundedness から UI](../F0_00P4A_一様可積分性_Vitali/index.md#thm-f0-00p4a-lp-ui) により一様可積分です。

$n\to\infty$ で

$$
Z_{t\wedge\tau_n}\to Z_t
\qquad P\text{-a.s.}
$$

なので一様可積分性から $L^1$ 収束し、

$$
E_P[Z_t]
=
\lim_{n\to\infty}
E_P[Z_{t\wedge\tau_n}]
=
1.
$$

同じ $L^1$ 極限を

$$
E_P[Z_{t\wedge\tau_n}\mid\mathcal F_s]
=
Z_{s\wedge\tau_n}
$$

へ適用すれば

$$
E_P[Z_t\mid\mathcal F_s]=Z_s.
$$

従って $Z$ は真の martingale です。
<!-- proof-end -->

特に $\theta$ が bounded なら

$$
[M]_T
=
\int_0^T|\theta_s|^2ds
\le
T\|\theta\|_\infty^2,
$$

なのでこの補題だけで十分です。

---

## 8. Novikov condition：random energy でも density を保つ

bounded $\theta$ は便利ですが、Girsanov を使いたい場面では

$$
\int_0^T|\theta_s|^2ds
$$

自体が random で unbounded なことがあります。

<a id="thm-sto10-novikov"></a>

<!-- formal-statement-start -->
> **定理（Novikov condition）**  
> $W$ を $P$-Brownian motion とし、progressively measurable $\theta$ が
>
> $$
> \int_0^T|\theta_s|^2ds<\infty
> \qquad P\text{-a.s.}
> $$
>
> を満たすとする。
>
> さらに
>
> $$
> \boxed{
> E_P\left[
> \exp\left(
> \frac12
> \int_0^T|\theta_s|^2ds
> \right)
> \right]
> <
> \infty
> }
> $$
>
> と仮定する。
>
> このとき
>
> $$
> Z_t
> =
> \exp\left(
> -\int_0^t\theta_s^\top dW_s
> -
> \frac12\int_0^t|\theta_s|^2ds
> \right)
> $$
>
> は $[0,T]$ 上の一様可積分な $P$-martingale であり
>
> $$
> E_P[Z_T]=1.
> $$
<!-- formal-statement-end -->

Novikov condition は **十分条件**です。

これを満たさないからといって、stochastic exponential が martingale でないとは限りません。

### 証明の見取り図

まず energy stopping

$$
\rho_n
=
\inf\left\{
t:
\int_0^t|\theta_s|^2ds\ge n
\right\}
\wedge T
$$

を入れます。

停止後は前節の bounded-energy lemma により

$$
Z^{\rho_n}
$$

は真の martingale です。

残る仕事は

$$
\{Z_{\rho_n}\}_{n\ge1}
$$

の一様可積分性を示して、停止を外すことです。

Novikov の指数積分条件は、まさにこの「mass が遠方へ逃げない」ことを保証します。

<!-- proof-start -->
### 証明

$M_t=-\int_0^t\theta_s^\top dW_s$ と置けば

$$
[M]_t=\int_0^t|\theta_s|^2ds.
$$

energy stopping $\rho_n$ に対して

$$
[M]_{T\wedge\rho_n}\le n
$$

なので、[bounded-energy lemma](#lem-sto10-bounded-energy-exponential) から

$$
Z^{\rho_n}=\mathcal E(M^{\rho_n})
$$

は真の martingale です。

一般の Novikov criterion の核心は、仮定

$$
E_P[e^{[M]_T/2}]<\infty
$$

から、この stopped exponential family が一様可積分であることを示す martingale-UI lemma です。

この UI lemma の完全証明は、停止区間を細分して指数積分可能性を局所化し、各区間で exponential martingale の $L^1$ mass を繰り返し制御する技術論を要します。本章では **Novikov criterion のこの UI lemma を標準的な技術的入力**として用います。bounded-energy の場合に同じ機構が $L^2$ estimate で閉じることは前節で完全証明しました。

UI lemma により

$$
Z_{t\wedge\rho_n}\to Z_t
$$

が $L^1$ で成り立ちます。各 $n$ で

$$
E_P[Z_{t\wedge\rho_n}]=1
$$

なので極限を取って

$$
E_P[Z_t]=1.
$$

さらに stopped martingale identity の $L^1$ 極限から $Z$ 自身が martingale です。
<!-- proof-end -->

ここで黒箱にしたのは **Novikov の UI criterion の技術部分だけ**です。

次の Girsanov theorem で起きる drift cancellation は章内で完全に証明します。

---

## 9. measure change で local martingale はどう変わるか

Girsanov の Brownian 版をいきなり計算するより、まず continuous local martingale の一般形を一段だけ証明します。

$M$ を $P$-continuous local martingale とし

$$
Z=\mathcal E(M)
$$

が正の真の martingale で

$$
E_P[Z_T]=1
$$

を満たすとします。

$$
\frac{dQ}{dP}=Z_T
$$

で $Q$ を作ります。

<a id="lem-sto10-girsanov-local-martingale"></a>

<!-- formal-statement-start -->
> **補題（Girsanov local-martingale transform）**  
> 上の設定で $N$ を continuous $P$-local martingale とする。
>
> このとき
>
> $$
> \widetilde N_t
> :=
> N_t-[N,M]_t
> $$
>
> は continuous $Q$-local martingale である。
<!-- formal-statement-end -->

### 証明の見取り図

積

$$
Z\widetilde N
$$

を Itô product rule で微分します。

$\widetilde N$ の finite-variation correction

$$
-d[N,M]
$$

と、product rule の covariation

$$
d[Z,N]
$$

が正確に打ち消し合います。

この cancellation が Girsanov theorem の代数的心臓部です。

<!-- proof-start -->
### 証明

[STO7 の product rule](../STO7/index.md#cor-sto7-product-rule) を使います。

$Z=\mathcal E(M)$ なので

$$
dZ_t=Z_t\,dM_t.
$$

また

$$
d\widetilde N_t
=
dN_t-d[N,M]_t.
$$

finite-variation process は covariation に寄与しないため

$$
[Z,\widetilde N]=[Z,N].
$$

さらに $Z$ の local martingale part は $\int Z\,dM$ なので stochastic integral の covariation formula から

$$
d[Z,N]_t
=
Z_t\,d[M,N]_t.
$$

従って

$$
\begin{aligned}
d(Z_t\widetilde N_t)
&=
\widetilde N_t\,dZ_t
+
Z_t\,d\widetilde N_t
+
d[Z,\widetilde N]_t\\
&=
\widetilde N_tZ_t\,dM_t
+
Z_t\,dN_t
-
Z_t\,d[N,M]_t
+
Z_t\,d[M,N]_t\\
&=
\widetilde N_tZ_t\,dM_t
+
Z_t\,dN_t.
\end{aligned}
$$

最後の二項は local martingale 項です。

したがって $Z\widetilde N$ は $P$-local martingale です。

localizing sequence をさらに止め、$Z\widetilde N$ と $\widetilde N$ が必要な可積分性を持つ区間を取ります。その停止区間では $0\le s\le t$ と bounded $\mathcal F_s$-可測 $H$ に対して

$$
E_P[Z_tH\widetilde N_t]
=
E_P[Z_sH\widetilde N_s].
$$

density process の命題から

$$
E_Q[H\widetilde N_t]
=
E_P[Z_tH\widetilde N_t],
$$

$$
E_Q[H\widetilde N_s]
=
E_P[Z_sH\widetilde N_s].
$$

よって

$$
E_Q[H\widetilde N_t]
=
E_Q[H\widetilde N_s].
$$

従って停止した $\widetilde N$ は $Q$-martingale です。

localization を外せば $\widetilde N$ は $Q$-local martingale です。
<!-- proof-end -->

この補題は

$$
\boxed{
P\text{-local martingale}
\quad\longrightarrow\quad
Q\text{-local martingale}
}
$$

で何を補正すべきかを直接示しています。

---

## 10. Girsanov theorem：drift を足した Brown 運動が新しい Brown 運動になる

<a id="thm-sto10-girsanov"></a>

<!-- formal-statement-start -->
> **定理（Girsanov theorem：Brownian drift shift）**  
> $W=(W^1,\ldots,W^m)$ を filtered probability space
>
> $$
> (\Omega,\mathcal F,(\mathcal F_t)_{0\le t\le T},P)
> $$
>
> 上の $m$ 次元 Brown 運動とする。
>
> progressively measurable $\mathbb R^m$-値 process $\theta$ が Novikov condition
>
> $$
> E_P\left[
> \exp\left(
> \frac12\int_0^T|\theta_s|^2ds
> \right)
> \right]
> <\infty
> $$
>
> を満たすとする。
>
> $$
> Z_T
> =
> \exp\left(
> -\int_0^T\theta_s^\top dW_s
> -
> \frac12\int_0^T|\theta_s|^2ds
> \right)
> $$
>
> とし
>
> $$
> Q(A)=E_P[Z_T\mathbf1_A],
> \qquad
> A\in\mathcal F_T
> $$
>
> で $Q$ を定める。
>
> このとき $P\sim Q$ であり
>
> $$
> \boxed{
> W_t^Q
> :=
> W_t+\int_0^t\theta_s\,ds
> }
> $$
>
> は $Q$ の下で $m$ 次元 Brown 運動である。
<!-- formal-statement-end -->

### なぜ測度は equivalent なのか

Novikov theorem により

$$
E_P[Z_T]=1,
$$

したがって $Q$ は確率測度です。

さらに exponential は常に正なので

$$
Z_T>0
\qquad P\text{-a.s.}
$$

です。

よって $Q\ll P$ に加えて

$$
Q(A)=0
\Longrightarrow
E_P[Z_T\mathbf1_A]=0
\Longrightarrow
P(A)=0.
$$

したがって

$$
P\sim Q.
$$

### 証明の見取り図

$$
M_t=-\int_0^t\theta_s^\top dW_s
$$

と置きます。

各成分 $W^i$ に前節の local-martingale transform を適用すると

$$
W^i-[W^i,M]
$$

が $Q$-local martingale です。

ところが

$$
[W^i,M]_t
=
-\int_0^t\theta_s^i\,ds.
$$

したがって

$$
W^{Q,i}
=
W^i+\int\theta^i ds
$$

が $Q$-local martingale になります。

あとは finite-variation shift は quadratic variation を変えないため

$$
[W^{Q,i},W^{Q,j}]_t
=
\delta_{ij}t.
$$

[STO5 の Lévy characterization](../STO5/index.md#thm-sto5-levy-characterization) が Brown 運動を同定します。

<!-- proof-start -->
### 証明

Novikov theorem から $Z=\mathcal E(M)$ は真の $P$-martingale で

$$
E_P[Z_T]=1.
$$

従って上で確認した通り $Q$ は $P$ と同値な確率測度です。

各 $i=1,\ldots,m$ に対して

$$
N_t=W_t^i
$$

と置きます。

$W^i$ は continuous $P$-local martingale です。

また stochastic integral の covariation から

$$
\begin{aligned}
[W^i,M]_t
&=
\left[
W^i,
-\sum_{j=1}^m
\int_0^\cdot\theta_s^j\,dW_s^j
\right]_t\\
&=
-\sum_{j=1}^m
\int_0^t
\theta_s^j\,d[W^i,W^j]_s\\
&=
-\int_0^t\theta_s^i\,ds.
\end{aligned}
$$

したがって [Girsanov local-martingale transform](#lem-sto10-girsanov-local-martingale) により

$$
\begin{aligned}
\widetilde N_t
&=
W_t^i-[W^i,M]_t\\
&=
W_t^i+\int_0^t\theta_s^i\,ds\\
&=
W_t^{Q,i}
\end{aligned}
$$

は $Q$-local martingale です。

vector として $W^Q$ は continuous $Q$-local martingale で $W_0^Q=0$ です。

次に

$$
A_t^i=\int_0^t\theta_s^i\,ds
$$

は continuous finite variation です。

STO5 の finite-variation zero quadratic variation から

$$
[A^i,A^j]=0,
\qquad
[W^i,A^j]=0.
$$

従って

$$
\begin{aligned}
[W^{Q,i},W^{Q,j}]_t
&=
[W^i+A^i,W^j+A^j]_t\\
&=
[W^i,W^j]_t\\
&=
\delta_{ij}t.
\end{aligned}
$$

Lévy characterization を $Q$ の下で適用すると、$W^Q$ は $m$ 次元 standard Brownian motion です。
<!-- proof-end -->

ここで重要なのは、同じ path

$$
\omega\mapsto W(\omega)
$$

を見ていても、

- $P$ の下では $W$ が Brown 運動
- $Q$ の下では $W+\int\theta ds$ が Brown 運動

になることです。

確率測度を変えると「典型的な path の重み」が変わります。

---

## 11. 最小例：Brown 運動へ定数 drift を付ける

$\mu\in\mathbb R$ を定数とします。

$P$ の下で $W$ を standard Brown 運動とし

$$
\theta_t=-\mu
$$

と置きます。

すると

$$
\int_0^T\theta_s^2ds
=
\mu^2T
$$

なので Novikov condition は

$$
E_P[e^{\mu^2T/2}]
=
e^{\mu^2T/2}
<
\infty
$$

と直ちに確認できます。

density は

$$
\begin{aligned}
Z_T
&=
\exp\left(
-\int_0^T(-\mu)\,dW_s
-
\frac12\mu^2T
\right)\\
&=
\exp\left(
\mu W_T-\frac12\mu^2T
\right).
\end{aligned}
$$

これは [STO7 の Brownian exponential martingale](../STO7/index.md#prop-sto7-brownian-exponential-martingale) そのものです。

Girsanov theorem から

$$
B_t
:=
W_t-\mu t
$$

は $Q$-Brownian motion です。

従って同じ coordinate process $W$ は $Q$ の下で

$$
W_t=\mu t+B_t
$$

と書けます。

つまり

$$
\boxed{
P:\ dW_t=dB_t
\qquad\longrightarrow\qquad
Q:\ dW_t=\mu\,dt+dB_t
}
$$

です。

この例は Girsanov の符号を確認する最も安全な基準です。

---

## 12. SDE の drift removal

Girsanov は Brownian motion の drift shift ですが、SDE へ代入すると drift を消せます。

<a id="cor-sto10-drift-removal"></a>

<!-- formal-statement-start -->
> **系（Girsanov による drift removal）**  
> $P$ の下で
>
> $$
> dX_t
> =
> b_t\,dt+\sigma_t\,dW_t
> $$
>
> が成り立つとする。ここで $W$ は $m$ 次元 Brown 運動、
>
> $$
> b_t\in\mathbb R^d,
> \qquad
> \sigma_t\in\mathbb R^{d\times m}
> $$
>
> とする。
>
> progressively measurable $\theta_t\in\mathbb R^m$ が
>
> $$
> b_t=\sigma_t\theta_t
> $$
>
> を満たし、$\theta$ が $[0,T]$ 上で Novikov condition を満たすとする。
>
> $$
> \frac{dQ}{dP}
> =
> \exp\left(
> -\int_0^T\theta_s^\top dW_s
> -
> \frac12\int_0^T|\theta_s|^2ds
> \right)
> $$
>
> と置けば
>
> $$
> W_t^Q
> =
> W_t+\int_0^t\theta_sds
> $$
>
> は $Q$-Brownian motion であり、$Q$ の下で
>
> $$
> \boxed{
> dX_t=\sigma_t\,dW_t^Q
> }
> $$
>
> が成り立つ。
<!-- formal-statement-end -->

### 証明の見取り図

Girsanov から

$$
dW_t
=
dW_t^Q-\theta_tdt.
$$

これを元の SDE へ代入するだけです。

drift は

$$
b_t-\sigma_t\theta_t
$$

となり、仮定 $b_t=\sigma_t\theta_t$ で消えます。

<!-- proof-start -->
### 証明

Girsanov theorem により $W^Q$ は $Q$-Brownian motion です。

定義から

$$
dW_t=dW_t^Q-\theta_tdt.
$$

したがって

$$
\begin{aligned}
dX_t
&=
b_tdt+\sigma_t(dW_t^Q-\theta_tdt)\\
&=
(b_t-\sigma_t\theta_t)dt
+\sigma_tdW_t^Q\\
&=
\sigma_tdW_t^Q.
\end{aligned}
$$
<!-- proof-end -->

$\sigma_t$ が正方可逆なら

$$
\theta_t=\sigma_t^{-1}b_t
$$

と選べます。

一般の長方形行列では、drift removal が可能であるためには

$$
b_t\in\operatorname{Im}\sigma_t
$$

が必要です。

Girsanov は「任意の drift を魔法のように消す」のではなく、**noise が動かせる方向にある drift を測度へ移す** 定理です。

---

## 13. weak existence を Girsanov で作る

ここまでの drift removal は、すでに $P$ の下で SDE がある場合の書き換えでした。

今度は逆に使います。

まず簡単な Brown 運動を用意し、測度を変えて目的の drift を作ります。

<a id="thm-sto10-bounded-borel-weak-existence"></a>

<!-- formal-statement-start -->
> **定理（bounded Borel drift SDE の finite-horizon weak existence）**  
> $b:\mathbb R^d\to\mathbb R^d$ を bounded Borel 関数とし、$x\in\mathbb R^d$、$T<\infty$ とする。
>
> このとき
>
> $$
> dX_t=b(X_t)\,dt+dB_t,
> \qquad
> X_0=x,
> \qquad
> 0\le t\le T
> $$
>
> は weak solution を持つ。
<!-- formal-statement-end -->

これは STO9 の Picard theorem より仮定が弱いです。

$b$ に Lipschitz continuity を要求していません。

### 証明の見取り図

$P$ の下で最初から解こうとせず、

$$
X_t=x+W_t
$$

と置きます。

つまり最初は drift 0 の process を使います。

目的の drift $b(X_t)$ を作るため

$$
\theta_t=-b(X_t)
$$

と選びます。

$b$ は bounded なので Novikov condition は自動的に成立します。

Girsanov 後の Brown 運動は

$$
B_t
=
W_t-\int_0^tb(X_s)ds.
$$

従って

$$
X_t=x+W_t
=
x+\int_0^tb(X_s)ds+B_t.
$$

これで weak solution が完成します。

<!-- proof-start -->
### 証明

$P$ の下で $d$ 次元 Brown 運動 $W$ を一つ取ります。

$$
X_t=x+W_t
$$

と置きます。

$X$ は continuous adapted です。

$b$ は Borel、$X$ は adapted continuous なので

$$
b(X_t)
$$

は progressively measurable です。

boundedness から、ある $K<\infty$ が存在して

$$
|b(y)|\le K
\qquad
(\forall y\in\mathbb R^d).
$$

ここで

$$
\theta_t=-b(X_t)
$$

と置きます。

すると

$$
\int_0^T|\theta_s|^2ds
=
\int_0^T|b(X_s)|^2ds
\le
K^2T.
$$

従って

$$
E_P\left[
\exp\left(
\frac12\int_0^T|\theta_s|^2ds
\right)
\right]
\le
e^{K^2T/2}
<
\infty.
$$

Novikov condition が成立します。

density を

$$
\begin{aligned}
Z_T
&=
\exp\left(
-\int_0^T\theta_s^\top dW_s
-\frac12\int_0^T|\theta_s|^2ds
\right)\\
&=
\exp\left(
\int_0^Tb(X_s)^\top dW_s
-\frac12\int_0^T|b(X_s)|^2ds
\right)
\end{aligned}
$$

とし

$$
dQ=Z_T\,dP
$$

と置きます。

Girsanov theorem から

$$
\begin{aligned}
B_t
&=
W_t+\int_0^t\theta_sds\\
&=
W_t-\int_0^tb(X_s)ds
\end{aligned}
$$

は $Q$ の下で $d$ 次元 Brown 運動です。

したがって

$$
W_t
=
B_t+\int_0^tb(X_s)ds.
$$

$X_t=x+W_t$ へ代入すると

$$
X_t
=
x
+
\int_0^tb(X_s)ds
+
B_t.
$$

さらに boundedness から

$$
\int_0^T|b(X_s)|ds
\le KT<\infty.
$$

したがって

$$
(\Omega,\mathcal F,(\mathcal F_t),Q,B,X)
$$

は目的の SDE の weak solution です。
<!-- proof-end -->

ここで非常に重要な点があります。

$b$ が discontinuous でも bounded Borel なら、上の weak existence construction は動きます。

一方 STO9 の global Lipschitz Picard theorem はそのような $b$ へ直接適用できません。

したがって

$$
\boxed{
\text{weak existence}
\text{ は }
\text{STO9 の strong Picard construction}
\text{ より柔軟}
}
$$

であることを実例で確認できました。

ただし、この事実だけから strong solution が存在しないとは言えません。

weak construction ができることと strong existence の否定は別の主張です。

---

## 14. 直接例：不連続 drift でも weak solution を作れる

1 次元で

$$
b(x)=\lambda\mathbf1_{\{x\ge0\}},
\qquad
\lambda\in\mathbb R
$$

とします。

$b$ は $0$ で discontinuous なので global Lipschitz ではありません。

しかし

$$
|b(x)|\le|\lambda|
$$

です。

$P$-Brownian motion $W$ に対し

$$
X_t=x+W_t
$$

と置き

$$
Z_T
=
\exp\left(
\int_0^T
\lambda\mathbf1_{\{X_s\ge0\}}\,dW_s
-
\frac12
\int_0^T
\lambda^2\mathbf1_{\{X_s\ge0\}}\,ds
\right)
$$

とします。

指数内の energy は

$$
\int_0^T
\lambda^2\mathbf1_{\{X_s\ge0\}}\,ds
\le
\lambda^2T.
$$

したがって Novikov condition が成立します。

新しい測度 $Q$ の下で

$$
B_t
=
W_t
-
\int_0^t
\lambda\mathbf1_{\{X_s\ge0\}}\,ds
$$

は Brown 運動です。

よって

$$
\boxed{
X_t
=
x
+
\int_0^t
\lambda\mathbf1_{\{X_s\ge0\}}\,ds
+
B_t
}
$$

となり、

$$
dX_t
=
\lambda\mathbf1_{\{X_t\ge0\}}dt+dB_t
$$

の weak solution が得られました。

「係数が滑らかでないから SDE が存在しない」とは限らないことが分かります。

---

## 15. uniqueness in law：noise を比較せず law を比較する

weak solution は確率空間自体が違ってよいので、二つの weak solutions を pathwise に

$$
X_t(\omega)=Y_t(\omega)
$$

と比較すること自体が意味を持たない場合があります。

そこで path の確率法則を比較します。

<a id="def-sto10-uniqueness-in-law"></a>

<!-- formal-statement-start -->
> **定義（uniqueness in law）**  
> 初期分布 $\mu$ を固定する。
>
> 同じ Brownian SDE に対する任意の二つの weak solutions
>
> $$
> (\Omega,\mathcal F,(\mathcal F_t),P,W,X),
> $$
>
> $$
> (\widetilde\Omega,\widetilde{\mathcal F},
> (\widetilde{\mathcal F}_t),\widetilde P,
> \widetilde W,\widetilde X)
> $$
>
> が
>
> $$
> \mathcal L_P(X_0)
> =
> \mathcal L_{\widetilde P}(\widetilde X_0)
> =
> \mu
> $$
>
> を満たすとき、path space
>
> $$
> C([0,T],\mathbb R^d)
> $$
>
> 上で
>
> $$
> \boxed{
> \mathcal L_P(X)
> =
> \mathcal L_{\widetilde P}(\widetilde X)
> }
> $$
>
> が必ず成り立つなら、その SDE は **uniqueness in law** を持つという。
<!-- formal-statement-end -->

<!-- definition-example-start: def-sto10-uniqueness-in-law -->
### 直接例：定数係数 SDE は law が一意

$$
dX_t=\mu\,dt+\Sigma\,dW_t,
\qquad
X_0=x
$$

の任意の weak solution は積分表示から

$$
X_t=x+\mu t+\Sigma W_t
$$

を満たします。

したがって任意の時刻列

$$
0\le t_1<\cdots<t_n\le T
$$

に対し

$$
(X_{t_1},\ldots,X_{t_n})
$$

の分布は Brownian motion の Gaussian law だけで決まります。

さらに path は continuous なので、path-space law もこの Brownian image として一意です。

ここでは確率空間が違っても $X$ の law は変わりません。
<!-- definition-example-end -->

---

## 16. 三つの「存在・一意性」を混ぜない

ここまでの用語を表にすると次のようになります。

| 性質 | 比較するとき何を固定するか | 主張 |
|---|---|---|
| strong existence | Brown 運動と確率空間を先に固定 | その noise 上に解を作れる |
| weak existence | 確率空間と Brown 運動も選べる | どこかに解を作れる |
| pathwise uniqueness | 同じ空間・同じ Brown 運動・同じ初期値 | 二つの解は indistinguishable |
| uniqueness in law | 初期分布だけ共通 | 解 $X$ の path-space law が同じ |

特に

$$
\text{pathwise uniqueness}
$$

と

$$
\text{uniqueness in law}
$$

は別物です。

前者は同じ noise の上での比較、後者は異なる確率空間をまたいだ分布の比較です。

---

## 17. Yamada--Watanabe theorem は strong / weak の橋

<a id="thm-sto10-yamada-watanabe"></a>

<!-- formal-statement-start -->
> **定理（Yamada--Watanabe theorem の位置付け）**  
> Euclidean Brownian SDE
>
> $$
> dX_t=b(X_t)\,dt+\sigma(X_t)\,dW_t
> $$
>
> を通常の filtered probability space の枠組みで考え、係数は積分方程式が意味を持つ Borel 可測係数とする。
>
> ある指定初期分布について
>
> 1. weak solution が存在し、
> 2. pathwise uniqueness が成り立つ
>
> なら、その初期分布に対して strong solution が存在し、さらに uniqueness in law が成り立つ。
<!-- formal-statement-end -->

この定理は

$$
\boxed{
\text{weak existence}
+
\text{pathwise uniqueness}
\Longrightarrow
\text{strong existence}
+
\text{uniqueness in law}
}
$$

という橋です。

### なぜ本章では完全証明を黒箱化するのか

この定理の完全証明は、単なる Itô 計算の延長ではありません。

異なる確率空間上の weak solutions を共通の空間へ持ち上げ、

- regular conditional distribution
- path space 上の coupling
- noise を固定した条件付き law
- measurable selection / measurable functional representation

を精密に扱う必要があります。

これらは STO10 の主題である「Girsanov による measure change」とは別の大きな論証系です。

したがって本章では Yamada--Watanabe theorem を **strong / weak theory の接続定理として明示的な技術的入力**とし、完全証明は独立した確率論補講の規模になるため扱いません。

重要なのは、定理の向きを誤らないことです。

weak existence だけから strong existence は出ません。

pathwise uniqueness だけでも existence は出ません。

二つを組み合わせたときに橋が架かります。

---

## 18. 仮定を外すとどこが壊れるか

### 18.1 stochastic exponential が true martingale でなければ測度を作れない

$Z=\mathcal E(M)$ が正の local martingale でも

$$
E_P[Z_T]<1
$$

なら

$$
Q(\Omega)=E_P[Z_T]<1.
$$

したがって確率測度 $Q$ ではありません。

Girsanov の density に stochastic exponential を書くだけでは不十分で、Novikov condition などにより

$$
E_P[Z_T]=1
$$

を保証する必要があります。

壊れる機構は **probability mass の loss** です。

### 18.2 drift が diffusion の像に入らなければ単純な drift removal はできない

$$
dX_t=b_tdt+\sigma_tdW_t
$$

で Girsanov が Brownian motion に加えられるのは

$$
\sigma_t\theta_tdt
$$

という方向だけです。

したがって

$$
b_t\notin\operatorname{Im}\sigma_t
$$

なら

$$
b_t=\sigma_t\theta_t
$$

を解けず、前節の drift removal は使えません。

壊れるのは measure-change theorem ではなく、**消したい drift と noise direction の線形代数的対応**です。

### 18.3 finite horizon の同値性を無限時間へ自動延長しない

本章では $[0,T]$ を固定しました。

各有限 $T$ で

$$
P|_{\mathcal F_T}\sim Q|_{\mathcal F_T}
$$

でも、それだけから

$$
P|_{\mathcal F_\infty}\sim Q|_{\mathcal F_\infty}
$$

とは言えません。

無限時間では density martingale の長時間極限と一様可積分性を別途調べる必要があります。

---

## 19. 演習

#### STO10-A01 二点空間の equivalent change of measure
- Level: A
- 目安時間: 12分

$\Omega=\{a,b\}$ とし

$$
P(a)=\frac14,
\qquad
P(b)=\frac34,
$$

$$
Q(a)=\frac12,
\qquad
Q(b)=\frac12
$$

とする。

1. $P\sim Q$ を確認せよ。
2. $Z=dQ/dP$ を求めよ。
3. $E_P[Z]=1$ を確認せよ。
4. $Y(a)=0,Y(b)=2$ として $E_Q[Y]=E_P[ZY]$ を確認せよ。

<!-- solution-start -->
### 詳細解答

1. $P,Q$ はともに $a,b$ の一点集合へ正の確率を与えます。従って零確率事象は空集合だけで、

$$
P\ll Q,
\qquad
Q\ll P.
$$

よって

$$
P\sim Q.
$$

2. 一点ごとに

$$
Q(\{\omega\})
=
Z(\omega)P(\{\omega\})
$$

を使います。

$a$ では

$$
\frac12
=
Z(a)\frac14
$$

なので

$$
Z(a)=2.
$$

$b$ では

$$
\frac12
=
Z(b)\frac34
$$

なので

$$
Z(b)=\frac23.
$$

従って

$$
\boxed{
Z
=
2\mathbf1_{\{a\}}
+
\frac23\mathbf1_{\{b\}}
}.
$$

3.

$$
\begin{aligned}
E_P[Z]
&=
\frac14\cdot2
+
\frac34\cdot\frac23\\
&=
\frac12+\frac12\\
&=1.
\end{aligned}
$$

4. まず $Q$ で直接計算すると

$$
E_Q[Y]
=
0\cdot\frac12
+
2\cdot\frac12
=
1.
$$

一方

$$
\begin{aligned}
E_P[ZY]
&=
\frac14\cdot2\cdot0
+
\frac34\cdot\frac23\cdot2\\
&=
1.
\end{aligned}
$$

よって

$$
E_Q[Y]=E_P[ZY].
$$
<!-- solution-end -->

#### STO10-A02 constant drift の density と Novikov condition
- Level: A
- 目安時間: 15分

$W$ を $P$-Brownian motion、$\mu\in\mathbb R$、$T<\infty$ とする。

$$
\theta_t=-\mu
$$

と置く。

1. Novikov condition を確認せよ。
2. density $Z_T$ を明示せよ。
3. STO7 の Brownian exponential martingale を使って $E_P[Z_T]=1$ を確認せよ。
4. $Q$ の下で Brown 運動になる process を書け。

<!-- solution-start -->
### 詳細解答

1.

$$
\int_0^T|\theta_s|^2ds
=
\int_0^T\mu^2ds
=
\mu^2T.
$$

従って

$$
E_P\left[
\exp\left(
\frac12\int_0^T|\theta_s|^2ds
\right)
\right]
=
e^{\mu^2T/2}
<
\infty.
$$

Novikov condition が成立します。

2.

$$
\begin{aligned}
Z_T
&=
\exp\left(
-\int_0^T(-\mu)dW_s
-
\frac12\mu^2T
\right)\\
&=
\boxed{
\exp\left(
\mu W_T-\frac12\mu^2T
\right)
}.
\end{aligned}
$$

3. [STO7 の Brownian exponential martingale](../STO7/index.md#prop-sto7-brownian-exponential-martingale) を parameter $\mu$ で使えます。

その命題の仮定は $W$ が standard Brownian motion、$\mu$ が定数であることです。本問では両方を満たします。

従って

$$
E_P[Z_T]=1.
$$

4. Girsanov theorem から

$$
W_t^Q
=
W_t+\int_0^t(-\mu)ds
=
\boxed{W_t-\mu t}
$$

が $Q$-Brownian motion です。
<!-- solution-end -->

#### STO10-A03 drift removal の符号を確認する
- Level: A
- 目安時間: 15分

1 次元 SDE

$$
dX_t=b_tdt+\sigma_tdW_t
$$

で $\sigma_t\ne0$ とし

$$
\theta_t=\frac{b_t}{\sigma_t}
$$

が Novikov condition を満たすとする。

1. Girsanov 後の Brown 運動 $W^Q$ を書け。
2. $dW_t$ を $dW_t^Q$ で表せ。
3. 元の SDE へ代入し drift が消えることを一行ずつ確認せよ。

<!-- solution-start -->
### 詳細解答

1. 本章の符号規約では density は

$$
Z_T
=
\exp\left(
-\int_0^T\theta_sdW_s
-\frac12\int_0^T\theta_s^2ds
\right)
$$

です。

このとき

$$
\boxed{
W_t^Q
=
W_t+\int_0^t\theta_sds
}
$$

が $Q$-Brownian motion です。

2. 微分表示では

$$
dW_t^Q=dW_t+\theta_tdt.
$$

従って

$$
\boxed{
dW_t=dW_t^Q-\theta_tdt
}.
$$

3. 代入すると

$$
\begin{aligned}
dX_t
&=
b_tdt+\sigma_t(dW_t^Q-\theta_tdt)\\
&=
(b_t-\sigma_t\theta_t)dt+\sigma_tdW_t^Q.
\end{aligned}
$$

$\theta_t=b_t/\sigma_t$ なので

$$
\sigma_t\theta_t=b_t.
$$

したがって

$$
\boxed{
dX_t=\sigma_tdW_t^Q
}.
$$
<!-- solution-end -->

#### STO10-A04 四つの概念を分類する
- Level: A
- 目安時間: 15分

次の各主張が何を述べているか、strong existence / weak existence / pathwise uniqueness / uniqueness in law から選び、理由を述べよ。

1. 「同じ確率空間、同じ Brown 運動、同じ初期値で作った二つの解は indistinguishable である。」
2. 「確率空間と Brown 運動をこちらで選べば、少なくとも一組の解が作れる。」
3. 「初期分布が同じ任意の二つの weak solutions は、$X$ の path-space law が一致する。」
4. 「先に与えられた Brown 運動と初期値が生成する情報の上で解を構成できる。」

<!-- solution-start -->
### 詳細解答

1. **pathwise uniqueness** です。

比較時に「同じ確率空間・同じ Brown 運動・同じ初期値」を固定し、二つの解そのものを標本路ごとに比較しています。

2. **weak existence** です。

確率空間と Brown 運動も解の一部として選べる、という量化順序になっています。

3. **uniqueness in law** です。

異なる確率空間にいる解同士を直接比較せず、path space 上の law を比較しています。

4. **strong existence** です。

noise と初期値が先に固定され、その情報上に解を構成することを要求しています。
<!-- solution-end -->

#### STO10-B01 density process の途中時刻公式
- Level: B
- 目安時間: 22分

$Q\ll P$ on $\mathcal F_T$ とし

$$
Z_T=\frac{dQ}{dP},
\qquad
Z_t=E_P[Z_T\mid\mathcal F_t]
$$

とする。

$0\le s\le t\le T$ と bounded $\mathcal F_s$-可測確率変数 $H$ に対し

$$
E_Q[H Z_t^{-1}]
$$

を考える。ただし $P\sim Q$ で $Z_t>0$ a.s. とする。

1. $E_Q[Y]=E_P[Z_tY]$ が $\mathcal F_t$-可測 $Y$ に対して成立することを導け。
2. $Y=H/Z_t$ を代入して $E_Q[H/Z_t]=E_P[H]$ を示せ。
3. この式が「逆向きの密度」が $1/Z_t$ になることと整合する理由を説明せよ。

<!-- solution-start -->
### 詳細解答

1. $Y$ が $\mathcal F_t$-可測なら

$$
E_Q[Y]
=
E_P[Z_TY].
$$

条件付き期待値を時刻 $t$ で取ると

$$
\begin{aligned}
E_P[Z_TY]
&=
E_P[
E_P[Z_TY\mid\mathcal F_t]
]\\
&=
E_P[
Y E_P[Z_T\mid\mathcal F_t]
]\\
&=
E_P[YZ_t].
\end{aligned}
$$

従って

$$
\boxed{
E_Q[Y]=E_P[Z_tY]
}.
$$

2. $H$ は $\mathcal F_s$-可測で $s\le t$ なので $\mathcal F_t$-可測です。

$Z_t>0$ a.s. なので

$$
Y=\frac{H}{Z_t}
$$

を代入できます。

したがって

$$
\begin{aligned}
E_Q\left[\frac{H}{Z_t}\right]
&=
E_P\left[
Z_t\frac{H}{Z_t}
\right]\\
&=
\boxed{E_P[H]}.
\end{aligned}
$$

3. 時刻 $t$ 上で

$$
dQ=Z_t\,dP
$$

と読むなら、同値性により逆向きは

$$
dP=\frac1{Z_t}\,dQ
$$

です。

従って

$$
E_P[H]
=
E_Q\left[
\frac{H}{Z_t}
\right]
$$

は Radon--Nikodym 密度の逆変換そのものです。
<!-- solution-end -->

#### STO10-B02 bounded Borel drift の weak existence を再構成する
- Level: B
- 目安時間: 30分

$b:\mathbb R^d\to\mathbb R^d$ が

$$
|b(x)|\le K
$$

を満たす Borel 関数とする。

$P$-Brownian motion $W$ に対して

$$
X_t=x+W_t
$$

と置く。

1. $\theta_t=-b(X_t)$ が Novikov condition を満たすことを示せ。
2. density $Z_T$ を $b(X)$ と $W$ で書け。
3. $Q$ の下で Brown 運動となる $B$ を書け。
4. $X$ が

$$
X_t=x+\int_0^tb(X_s)ds+B_t
$$

を満たすことを導け。
5. なぜこれは strong existence の証明ではなく weak existence の証明なのか説明せよ。

<!-- solution-start -->
### 詳細解答

1. boundedness から

$$
|\theta_t|
=
|b(X_t)|
\le K.
$$

従って

$$
\int_0^T|\theta_s|^2ds
\le
K^2T.
$$

ゆえに

$$
\begin{aligned}
E_P\left[
\exp\left(
\frac12\int_0^T|\theta_s|^2ds
\right)
\right]
&\le
E_P[e^{K^2T/2}]\\
&=
e^{K^2T/2}\\
&<\infty.
\end{aligned}
$$

Novikov condition が成立します。

2. $\theta=-b(X)$ なので

$$
-\int_0^T\theta_s^\top dW_s
=
\int_0^Tb(X_s)^\top dW_s.
$$

また

$$
|\theta_s|^2=|b(X_s)|^2.
$$

従って

$$
\boxed{
Z_T
=
\exp\left(
\int_0^Tb(X_s)^\top dW_s
-
\frac12\int_0^T|b(X_s)|^2ds
\right)
}.
$$

3. Girsanov theorem から

$$
\begin{aligned}
B_t
&=
W_t+\int_0^t\theta_sds\\
&=
\boxed{
W_t-\int_0^tb(X_s)ds
}
\end{aligned}
$$

が $Q$-Brownian motion です。

4. 前式を変形すると

$$
W_t
=
B_t+\int_0^tb(X_s)ds.
$$

$X_t=x+W_t$ へ代入して

$$
\begin{aligned}
X_t
&=
x+B_t+\int_0^tb(X_s)ds\\
&=
\boxed{
x+\int_0^tb(X_s)ds+B_t
}.
\end{aligned}
$$

5. 最初に与えられた Brown 運動の上で target SDE の解を直接構成したのではありません。

まず $P$ の下で driftless process $X=x+W$ を置き、その後に確率測度を $Q$ へ変更して、新しい Brown 運動 $B$ と target equation を得ました。

つまり

$$
(\Omega,\mathcal F,(\mathcal F_t),Q,B,X)
$$

という解の組をこちらで選んでいます。

これは weak existence の量化順序です。
<!-- solution-end -->

#### STO10-B03 Yamada--Watanabe の論理を読む
- Level: B
- 目安時間: 20分

ある Brownian SDE について次が分かっているとする。

- weak solution は少なくとも一つ存在する。
- pathwise uniqueness が成立する。

1. Yamada--Watanabe theorem から何が従うか。
2. uniqueness in law は何を比較する性質か。
3. 「weak solution が存在するから strong solution も存在する」とだけ言うのが誤りである理由を説明せよ。
4. STO9 の global Lipschitz theorem では、なぜ Yamada--Watanabe を使わなくても strong existence が得られていたか。

<!-- solution-start -->
### 詳細解答

1. Yamada--Watanabe theorem から

$$
\boxed{
\text{strong existence}
+
\text{uniqueness in law}
}
$$

が従います。

入力は weak existence **だけではなく** pathwise uniqueness との組です。

2. uniqueness in law は、同じ初期分布を持つ任意の weak solutions に対して

$$
\mathcal L(X)
$$

という path-space law が一致することを比較します。

確率空間や Brown 運動そのものを同一視する必要はありません。

3. weak existence では、解を作るために確率空間と Brown 運動を選んでよいという自由があります。

strong existence は、先に固定された noise の情報上で解を作るという追加要求です。

したがって weak existence 単独では量化順序の差を埋められません。

Yamada--Watanabe では pathwise uniqueness がその差を埋める追加入力になります。

4. STO9 では global Lipschitz 係数に対して Picard iteration を **最初から指定された Brown 運動上で**回しました。

従って strong solution を直接構成しています。

Yamada--Watanabe を介して weak から strong へ持ち上げる必要がありませんでした。
<!-- solution-end -->

#### STO10-C01 discontinuous bounded drift を Girsanov で作る
- Level: C
- 目安時間: 40分

$\lambda\in\mathbb R$ とし

$$
b(x)
=
\lambda\mathbf1_{\{x\ge0\}}
$$

を考える。

有限時間 $T<\infty$ で

$$
dX_t
=
\lambda\mathbf1_{\{X_t\ge0\}}dt+dB_t,
\qquad
X_0=x
$$

の weak solution を Girsanov で構成せよ。

次を順に行うこと。

1. $P$-Brownian motion $W$ から出発し $X_t=x+W_t$ と置く。
2. target drift を作るための $\theta_t$ を選ぶ。
3. $\theta$ の progressive measurability と Novikov condition を確認する。
4. density $Z_T$ を明示する。
5. $Q$-Brownian motion $B$ を明示する。
6. target SDE の積分表示を導く。
7. STO9 の global Lipschitz theorem をこの $b$ に直接適用できない理由と、それでも本問の weak construction が動く理由を説明する。

<!-- solution-start -->
### 詳細解答

1. standard Brown 運動 $W$ を持つ filtered probability space を一つ取ります。

$$
X_t=x+W_t
$$

と置きます。

$X$ は continuous adapted です。

2. weak existence theorem の符号に合わせ

$$
\boxed{
\theta_t
=
-b(X_t)
=
-\lambda\mathbf1_{\{X_t\ge0\}}
}
$$

と選びます。

3. $X$ は adapted continuous process なので progressively measurable です。

写像

$$
y\mapsto\mathbf1_{\{y\ge0\}}
$$

は Borel measurable です。

従ってその合成

$$
(t,\omega)
\mapsto
\mathbf1_{\{X_t(\omega)\ge0\}}
$$

も progressively measurable であり、$\theta$ も progressively measurable です。

さらに

$$
|\theta_t|
\le|\lambda|.
$$

したがって

$$
\int_0^T\theta_s^2ds
\le
\lambda^2T.
$$

よって

$$
\begin{aligned}
E_P\left[
\exp\left(
\frac12\int_0^T\theta_s^2ds
\right)
\right]
&\le
e^{\lambda^2T/2}\\
&<\infty.
\end{aligned}
$$

Novikov condition が成立します。

4. density は

$$
Z_T
=
\exp\left(
-\int_0^T\theta_sdW_s
-
\frac12\int_0^T\theta_s^2ds
\right).
$$

$\theta_s=-\lambda\mathbf1_{\{X_s\ge0\}}$ を代入すると

$$
\boxed{
Z_T
=
\exp\left(
\lambda
\int_0^T
\mathbf1_{\{X_s\ge0\}}\,dW_s
-
\frac{\lambda^2}{2}
\int_0^T
\mathbf1_{\{X_s\ge0\}}\,ds
\right)
}.
$$

指示関数は二乗しても同じなので second term は上の形になります。

Novikov theorem から

$$
E_P[Z_T]=1.
$$

従って

$$
dQ=Z_TdP
$$

で確率測度 $Q$ を作れます。

5. Girsanov theorem から

$$
\begin{aligned}
B_t
&=
W_t+\int_0^t\theta_sds\\
&=
W_t
-
\lambda
\int_0^t
\mathbf1_{\{X_s\ge0\}}ds
\end{aligned}
$$

が $Q$-Brownian motion です。

6. これを変形すると

$$
W_t
=
B_t
+
\lambda
\int_0^t
\mathbf1_{\{X_s\ge0\}}ds.
$$

$X_t=x+W_t$ なので

$$
\begin{aligned}
X_t
&=
x
+
B_t
+
\lambda
\int_0^t
\mathbf1_{\{X_s\ge0\}}ds\\
&=
\boxed{
x
+
\int_0^t
\lambda\mathbf1_{\{X_s\ge0\}}ds
+
B_t
}.
\end{aligned}
$$

従って

$$
(\Omega,\mathcal F,(\mathcal F_t),Q,B,X)
$$

は target SDE の weak solution です。

7. drift

$$
b(x)=\lambda\mathbf1_{\{x\ge0\}}
$$

は $x=0$ で discontinuous です。

したがって global Lipschitz ではなく、STO9 の global Lipschitz Picard theorem の仮定を満たしません。

一方 Girsanov construction で必要だったのは、本問では主に

- Borel measurability
- boundedness
- それによる Novikov condition

です。

実際

$$
|b(x)|\le|\lambda|
$$

なので energy を deterministic constant で抑えられました。

したがって Picard theorem が直接使えないことと weak existence が失敗することは同義ではありません。
<!-- solution-end -->

---

## 20. この章で何が閉じたか

STO9 では

$$
\boxed{
\text{noise を固定}
\to
\text{strong solution}
}
$$

という世界を作りました。

STO10 では量化順序を広げ

$$
\boxed{
\text{probability space / noise も選ぶ}
\to
\text{weak solution}
}
$$

を定義しました。

さらに measure change について

$$
\boxed{
\frac{dQ}{dP}=Z_T
\quad\Longrightarrow\quad
E_Q[Y]=E_P[Z_tY]
}
$$

を確認し、stochastic exponential

$$
Z_t
=
\exp\left(
-\int_0^t\theta_s^\top dW_s
-
\frac12\int_0^t|\theta_s|^2ds
\right)
$$

が density になるために true martingale 性が必要であることを見ました。

Novikov condition はその代表的十分条件です。

Girsanov theorem の核心は

$$
\boxed{
W_t^Q
=
W_t+\int_0^t\theta_sds
}
$$

が $Q$-Brownian motion になることでした。

証明は

$$
\text{product rule}
\to
\text{covariation cancellation}
\to
Q\text{-local martingale}
\to
\text{same quadratic variation}
\to
\text{Lévy characterization}
$$

で閉じました。

そして

$$
b=\sigma\theta
$$

なら

$$
dX=b\,dt+\sigma\,dW
\quad\longrightarrow\quad
dX=\sigma\,dW^Q
$$

と drift を測度側へ移せます。

逆向きに使えば bounded Borel drift について

$$
dX_t=b(X_t)dt+dB_t
$$

の weak solution を Brown 運動から構成できます。

最後に

$$
\boxed{
\text{weak existence}
+
\text{pathwise uniqueness}
\overset{\text{Yamada--Watanabe}}{\Longrightarrow}
\text{strong existence}
+
\text{uniqueness in law}
}
$$

という strong / weak theory の橋を位置付けました。

---

## 21. 次章への橋

Girsanov は「測度を変えると drift がどう動くか」を教えました。

次の STO11 では、今度は process を **時間発展作用素**から読みます。

中心となる問いは

$$
\boxed{
E_x[f(X_t)]
\text{ を }t\text{ の作用素として見たとき、
SDE の局所的な構造はどこに入るか}
}
$$

です。

次章では

- Markov process
- transition kernel
- Markov semigroup
- generator
- Dynkin formula
- backward Kolmogorov equation
- forward equation / Fokker--Planck equation
- Feynman--Kac formula
- martingale problem

へ進みます。

STO9 の SDE と Encore II / III の PDE が、STO11 で本格的に再合流します。
