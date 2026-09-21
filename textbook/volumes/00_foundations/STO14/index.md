# STO14：独立定常増分と跳躍型確率解析 — 無限個の小跳躍を補償して積分する

<!-- definition-example-audit: strict -->

> **既出概念への参照**：[予測可能過程](../STO1/index.md#def-sto1-predictable)、[Doob 最大不等式](../STO2/index.md#thm-sto2-doob-maximal)、[多次元 Itô 公式](../STO7/index.md#thm-sto7-multidimensional-ito)、[ポアソンランダム測度](../STO13/index.md#def-sto13-poisson-random-measure)、[補償ポアソンランダム測度](../STO13/index.md#def-sto13-compensated-prm)、[単関数 L2 等長性](../STO13/index.md#thm-sto13-prm-simple-isometry)、[$L^2$ の完備性](../F0_00D2E_L2完備性_Riesz_Fischer/index.md#thm-f0-00d2e-01)、[特性関数](../F0_00P6_特性関数_中心極限定理/index.md#def-f0-00p6-characteristic-function) を直接使います。

STO13 では、跳躍の「時刻」と「印」をポアソンランダム測度

$$
N(ds,dz)
$$

へまとめ、有限強度集合上では

$$
\widetilde N(ds,dz)
=
N(ds,dz)-ds\,\nu(dz)
$$

という補償が平均 0 の揺らぎを取り出すことを見ました。

しかし、本章で扱う独立定常増分過程では、原点の近くに無限個の小跳躍が集まる場合があります。このとき

$$
\sum_{0<s\le t}\Delta X_s
$$

を絶対収束する普通の和として扱うことはできません。

本章の中心線は

$$
\boxed{
\text{有限個の跳躍}
\to
\text{独立定常増分}
\to
\text{無限分解可能性}
\to
\text{Lévy 測度}
\to
\text{小跳躍の補償}
\to
L^2\text{ 完備化}
\to
\text{Lévy--Itô 分解}
\to
\text{跳躍 Itô 公式}
}
$$

です。

「無限個の小跳躍」を無理に点ごとへ並べるのではなく、

$$
\boxed{
\text{閾値付き近似}
+
\text{中心化}
+
\text{二乗平均極限}
}
$$

で確率積分として作ることが、本章の核心です。

---

## 1. 最初の模型：Poisson 個数に跳躍幅を付ける

率 $\lambda>0$ のポアソン過程 $N$ と、実確率変数列

$$
Y_1,Y_2,\ldots
$$

を考えます。$Y_k$ は独立同分布で、$N$ とも独立とします。

<a id="def-sto14-compound-poisson"></a>

<!-- formal-statement-start -->
> **定義（複合 Poisson 過程）**  
> $N$ を率 $\lambda$ のポアソン過程、$(Y_k)_{k\ge1}$ を共通分布 $\mu$ を持つ独立同分布列とし、$N$ と $(Y_k)$ は独立とする。
>
> $X_0=0$ とし、
>
$$
X_t
=
\sum_{k=1}^{N_t}Y_k
$$
>
> と定める。この $X=(X_t)_{t\ge0}$ を、率 $\lambda$、跳躍幅分布 $\mu$ の **複合 Poisson 過程**という。
<!-- formal-statement-end -->

<!-- definition-example-start: def-sto14-compound-poisson -->
### 直接例：跳躍幅が常に 2 の場合

**定義の確認**

$Y_k\equiv2$ とします。このとき

$$
X_t=2N_t.
$$

したがって $X$ は $0,2,4,\ldots$ の値を取り、各跳躍の大きさは必ず 2 です。

$s<t$ では

$$
X_t-X_s
=
2(N_t-N_s),
$$

なので、増分の分布は区間長 $t-s$ だけで決まり、互いに素な時間区間上の増分は独立です。

複合 Poisson 過程は「Poisson 計数に跳躍幅を付けたもの」という定義を、そのまま手で確認できる最小例です。
<!-- definition-example-end -->

<a id="thm-sto14-compound-poisson-cf"></a>

<!-- formal-statement-start -->
> **定理（複合 Poisson 過程の Lévy 性と特性関数）**  
> $X$ を率 $\lambda$、跳躍幅分布 $\mu$ の複合 Poisson 過程とする。
>
> このとき $X$ は独立定常増分を持ち、確率連続である。
>
> 跳躍幅 $Y_1$ の特性関数を
>
$$
\widehat\mu(u)
=
E[e^{iuY_1}]
$$
>
> と書けば、
>
$$
\boxed{
E[e^{iuX_t}]
=
\exp\left\{
\lambda t\left(\widehat\mu(u)-1\right)
\right\}.
}
$$
<!-- formal-statement-end -->

### 証明の見取り図

時刻区間 $(s,t]$ に入る跳躍だけを取り出すと、その個数は

$$
N_t-N_s
\sim
\operatorname{Poisson}(\lambda(t-s))
$$

です。

条件付き特性関数を Poisson 個数について平均すると、指数関数が現れます。

<!-- proof-start -->
### 証明

$0\le s<t$ とします。

$(s,t]$ に生じる跳躍幅を、時刻順に

$$
Y^{(s,t]}_1,\ldots,Y^{(s,t]}_{N_t-N_s}
$$

と書きます。Poisson 過程の独立増分と、跳躍幅列の独立性から、

$$
X_t-X_s
=
\sum_{j=1}^{N_t-N_s}Y^{(s,t]}_j
$$

の分布は $t-s$ のみに依存し、互いに素な時間区間に対応する増分は独立です。

次に $N_t=n$ を条件にすると

$$
X_t
=
Y_1+\cdots+Y_n.
$$

従って

$$
E[e^{iuX_t}\mid N_t=n]
=
\widehat\mu(u)^n.
$$

全期待値を取ると

$$
\begin{aligned}
E[e^{iuX_t}]
&=
\sum_{n=0}^{\infty}
\widehat\mu(u)^n
e^{-\lambda t}
\frac{(\lambda t)^n}{n!}\\
&=
e^{-\lambda t}
\exp\left(\lambda t\widehat\mu(u)\right)\\
&=
\exp\left\{
\lambda t(\widehat\mu(u)-1)
\right\}.
\end{aligned}
$$

最後に確率連続性を確認します。

$\varepsilon>0$ に対し、

$$
\{|X_{t+h}-X_t|>\varepsilon\}
\subset
\{N_{t+h}-N_t\ge1\}.
$$

したがって

$$
P(|X_{t+h}-X_t|>\varepsilon)
\le
1-e^{-\lambda h}
\to0
\qquad(h\downarrow0).
$$

よって $X$ は確率連続です。
<!-- proof-end -->

この特性関数はすでに

$$
\boxed{
\text{時間 }t
\text{ が特性関数の指数へ線形に入る}
}
$$

という Lévy 理論の基本形を示しています。

---

## 2. 独立定常増分を持つ過程

<a id="def-sto14-levy-process"></a>

<!-- formal-statement-start -->
> **定義（Lévy 過程）**  
> 実数値過程 $X=(X_t)_{t\ge0}$ が **Lévy 過程**であるとは、次を満たすことをいう。
>
> 1. $X_0=0$ a.s.
> 2. 任意の $0\le t_0<t_1<\cdots<t_n$ に対し、
>
$$
X_{t_1}-X_{t_0},
\ldots,
X_{t_n}-X_{t_{n-1}}
$$
>
> は独立である。
> 3. $0\le s<t$ に対し、$X_t-X_s$ の分布は $t-s$ のみに依存する。
> 4. $h\to0$ のとき
>
$$
X_{t+h}-X_t
\to0
\qquad\text{確率収束で}
$$
>
> が各 $t\ge0$ で成り立つ。
>
> 本章では標準的な càdlàg 修正版、すなわち右連続で左極限を持つ版を選んで扱う。
<!-- formal-statement-end -->

確率連続性を持つ独立定常増分過程が càdlàg 修正版を持つことは、過程の正則化に関する標準定理です。本章の主題は跳躍分解なので、この正則化定理の完全証明は技術的入力とします。

<!-- definition-example-start: def-sto14-levy-process -->
### 直接例：ドリフト付きブラウン運動

**定義の確認**

定数 $b\in\mathbb R$、$\sigma\ge0$ とブラウン運動 $B$ に対し

$$
X_t=bt+\sigma B_t
$$

と置きます。

$X_0=0$ です。

また

$$
X_t-X_s
=
b(t-s)+\sigma(B_t-B_s)
$$

なので、増分の独立性と定常性はブラウン運動から従います。

さらに

$$
E[(X_{t+h}-X_t)^2]
=
b^2h^2+\sigma^2|h|
\to0.
$$

従って [チェビシェフの不等式](../F0_00P2A_期待値_LOTUS/index.md#thm-f0-00p2a-chebyshev)から確率連続です。

よってドリフト付きブラウン運動は Lévy 過程です。

前節の複合 Poisson 過程も同じ定義を満たします。Lévy 過程は

$$
\boxed{
\text{連続な揺らぎ}
\quad\text{と}\quad
\text{跳躍}
}
$$

の両方を同じ枠組みへ入れます。
<!-- definition-example-end -->

---

## 3. なぜ「無限分解可能」が現れるのか

<a id="def-sto14-infinitely-divisible"></a>

<!-- formal-statement-start -->
> **定義（無限分解可能分布）**  
> 確率分布 $\mu$ が **無限分解可能**であるとは、任意の正整数 $n$ に対して確率分布 $\mu_n$ が存在し、$\mu_n$ に従う独立同分布確率変数
>
$$
Z_1,\ldots,Z_n
$$
>
> を取ると
>
$$
Z_1+\cdots+Z_n
\sim\mu
$$
>
> となることをいう。
<!-- formal-statement-end -->

<!-- definition-example-start: def-sto14-infinitely-divisible -->
### 直接例：正規分布

**定義の確認**

$$
X\sim N(m,v)
$$

とします。

任意の $n\ge1$ に対して

$$
Z_k\sim N\left(\frac mn,\frac vn\right)
$$

を独立に取れば、

$$
Z_1+\cdots+Z_n
\sim
N(m,v).
$$

したがって正規分布は無限分解可能です。

Poisson 分布も

$$
\operatorname{Poisson}(\lambda)
=
\operatorname{Poisson}(\lambda/n)^{*n}
$$

なので無限分解可能です。
<!-- definition-example-end -->

<a id="prop-sto14-levy-infinitely-divisible"></a>

<!-- formal-statement-start -->
> **命題（Lévy 過程の周辺分布は無限分解可能）**  
> $X$ を Lévy 過程とする。
>
> 任意の $t>0$ について $X_t$ の分布は無限分解可能である。
<!-- formal-statement-end -->

<!-- proof-start -->
### 証明

$n\ge1$ を固定します。

時間区間 $[0,t]$ を長さ $t/n$ の $n$ 個の区間へ分割すると

$$
X_t
=
\sum_{k=1}^{n}
\left(
X_{kt/n}-X_{(k-1)t/n}
\right).
$$

Lévy 過程の独立増分性から各項は独立です。

定常増分性から各項は共通して $X_{t/n}$ と同じ分布を持ちます。

従って $X_t$ は、$X_{t/n}$ と同じ分布を持つ独立な確率変数 $n$ 個の和として表されます。

$n$ は任意なので $X_t$ の分布は無限分解可能です。
<!-- proof-end -->

この短い証明が、

$$
\boxed{
\text{Lévy 過程}
\Longrightarrow
\text{無限分解可能分布}
}
$$

という対応の出発点です。

---

## 4. 時間半群から特性指数が出る

$X$ を Lévy 過程とし、

$$
\varphi_t(u)
=
E[e^{iuX_t}]
$$

とします。

独立定常増分から

$$
X_{s+t}
=
X_s+(X_{s+t}-X_s)
$$

で、二項は独立、第二項は $X_t$ と同分布です。したがって

$$
\varphi_{s+t}(u)
=
\varphi_s(u)\varphi_t(u).
$$

<a id="prop-sto14-levy-exponent"></a>

<!-- formal-statement-start -->
> **命題（Lévy 過程の特性関数半群と Lévy 指数）**  
> $X$ を Lévy 過程とし、
>
$$
\varphi_t(u)=E[e^{iuX_t}]
$$
>
> とする。
>
> 各固定 $u\in\mathbb R$ に対し
>
$$
\varphi_{s+t}(u)
=
\varphi_s(u)\varphi_t(u),
\qquad
\varphi_0(u)=1,
$$
>
> であり、$t\mapsto\varphi_t(u)$ は連続である。
>
> さらに $\varphi_t(u)\neq0$ であり、ただ一つの連続関数 $\psi:\mathbb R\to\mathbb C$ が存在して
>
$$
\boxed{
\varphi_t(u)
=
e^{t\psi(u)}
}
$$
>
> と書ける。$\psi$ を **Lévy 指数**という。
<!-- formal-statement-end -->

### 証明の見取り図

ゼロにならないことが重要です。

もし $\varphi_t(u)=0$ なら

$$
\varphi_{t/n}(u)^n=0
$$

なので全ての $n$ で $\varphi_{t/n}(u)=0$ です。しかし確率連続性から $X_{t/n}\to0$ 確率収束で なので、特性関数は $1$ へ近づき、矛盾します。

<!-- proof-start -->
### 証明

半群性は上の独立増分計算から従います。

確率連続性より $h\to0$ で

$$
X_h\to0
\qquad\text{確率収束で}.
$$

$|e^{iuX_h}|=1$ なので、任意の部分列からほとんど確実収束する部分列を取り、有界収束を使えば

$$
\varphi_h(u)
=
E[e^{iuX_h}]
\to1.
$$

半群性から一般の $t$ でも連続性が従います。

次に $t>0$ で $\varphi_t(u)=0$ と仮定します。

任意の $n$ に対し

$$
\varphi_t(u)
=
\varphi_{t/n}(u)^n
$$

なので

$$
\varphi_{t/n}(u)=0.
$$

しかし $t/n\downarrow0$ だから

$$
\varphi_{t/n}(u)\to1,
$$

となり矛盾です。

従って $\varphi_t(u)\neq0$ です。

固定した $u$ について、連続な乗法半群

$$
t\mapsto\varphi_t(u)
$$

は 0 を通らず $\varphi_0(u)=1$ から出発します。したがって原点から連続に選んだ対数を用いて

$$
g_u(t)=\log\varphi_t(u)
$$

と書けます。

半群性から

$$
g_u(s+t)=g_u(s)+g_u(t).
$$

連続な Cauchy 方程式の解は線形なので

$$
g_u(t)=t g_u(1).
$$

よって

$$
\psi(u):=g_u(1)
$$

と置けば

$$
\varphi_t(u)=e^{t\psi(u)}.
$$
<!-- proof-end -->

複合 Poisson 過程では

$$
\psi(u)
=
\lambda(\widehat\mu(u)-1).
$$

ブラウン運動付きドリフト

$$
X_t=bt+\sigma B_t
$$

では

$$
\psi(u)
=
ibu-\frac12\sigma^2u^2.
$$

後で導く一般の特性指数表示は、この二つを「任意個の小跳躍」まで含めて統合します。

---

## 5. 原点近くで無限になり得る跳躍強度

<a id="def-sto14-levy-measure"></a>

<!-- formal-statement-start -->
> **定義（Lévy 測度）**  
> $\mathbb R\setminus\{0\}$ 上の測度 $\nu$ が **Lévy 測度**であるとは、
>
$$
\nu(\{0\})=0
$$
>
> かつ
>
$$
\boxed{
\int_{\mathbb R\setminus\{0\}}
(1\wedge z^2)\,\nu(dz)
<
\infty
}
$$
>
> を満たすことをいう。
<!-- formal-statement-end -->

この条件は二つに分かれます。

$$
\int_{|z|\le1}z^2\,\nu(dz)<\infty,
$$

$$
\nu(|z|>1)<\infty.
$$

つまり大跳躍は有限個しか現れませんが、小跳躍は総数が無限でもかまいません。必要なのは

$$
\boxed{
\text{小跳躍の二乗和を平均的に制御できること}
}
$$

です。

<!-- definition-example-start: def-sto14-levy-measure -->
### 直接例：stable 型の小跳躍密度

**定義の確認**

$0<\alpha<2$、$c>0$ とし、

$$
\nu(dz)
=
c|z|^{-1-\alpha}\,dz
\qquad(z\neq0)
$$

を考えます。

原点近くでは

$$
\int_{|z|\le1}
z^2\nu(dz)
=
2c\int_0^1z^{1-\alpha}\,dz.
$$

$1-\alpha>-1$、すなわち $\alpha<2$ なので有限です。

一方、

$$
\nu(|z|\le1)
=
2c\int_0^1z^{-1-\alpha}\,dz
=
\infty.
$$

したがってこれは Lévy 測度ですが、小跳躍の総強度は無限です。

大きい側は

$$
\nu(|z|>1)
=
2c\int_1^\infty z^{-1-\alpha}\,dz
=
\frac{2c}{\alpha}
<
\infty.
$$

よって

$$
\boxed{
\text{大跳躍は有限個}
\quad\text{だが}\quad
\text{小跳躍は無限個}
}
$$

という典型例です。
<!-- definition-example-end -->

<a id="def-sto14-activity"></a>

<!-- formal-statement-start -->
> **定義（有限活動度と無限活動度）**  
> Lévy 測度 $\nu$ に対し
>
$$
\nu(\mathbb R\setminus\{0\})<\infty
$$
>
> なら **有限活動度**、
>
$$
\nu(\mathbb R\setminus\{0\})=\infty
$$
>
> なら **無限活動度**という。
<!-- formal-statement-end -->

<!-- definition-example-start: def-sto14-activity -->
### 直接例：複合 Poisson 過程は有限活動度

**定義の確認**

複合 Poisson 過程の跳躍幅分布を $\mu$ とし、$\mu(\{0\})=0$ とします。

Lévy 測度は

$$
\nu(dz)=\lambda\mu(dz)
$$

です。

従って

$$
\nu(\mathbb R\setminus\{0\})
=
\lambda<\infty.
$$

有限時間 $[0,T]$ の跳躍回数は

$$
N_T\sim\operatorname{Poisson}(\lambda T)
$$

であり、ほとんど確実に有限です。
<!-- definition-example-end -->

### 大跳躍が必ず有限強度になる理由

任意の $\varepsilon>0$ について

$$
1\wedge z^2
\ge
1\wedge\varepsilon^2
\qquad(|z|>\varepsilon).
$$

したがって

$$
(1\wedge\varepsilon^2)\nu(|z|>\varepsilon)
\le
\int(1\wedge z^2)\nu(dz)
<
\infty.
$$

よって

$$
\boxed{
\nu(|z|>\varepsilon)<\infty
\qquad(\varepsilon>0).
}
$$

原点から少しでも離れた跳躍は有限強度です。無限個になり得るのは、原点へ蓄積する小跳躍だけです。

---

## 6. 独立定常増分の特性指数を分類する

<a id="thm-sto14-levy-khintchine"></a>

<!-- formal-statement-start -->
> **定理（Lévy--Khintchine の公式）**  
> $X$ を実数値 Lévy 過程とする。
>
> このとき一意な $\sigma\ge0$、Lévy 測度 $\nu$ と、規約
>
$$
h(z)=z1_{\{|z|\le1\}}
$$
>
> に対応する一意な $b\in\mathbb R$ が存在し、Lévy 指数は
>
$$
\boxed{
\psi(u)
=
ibu
-\frac12\sigma^2u^2
+
\int_{\mathbb R\setminus\{0\}}
\left(
e^{iuz}
-1
-iuz1_{\{|z|\le1\}}
\right)\nu(dz).
}
$$
>
> 逆に、任意の三つ組 $(b,\sigma,\nu)$ から右辺で定まる特性関数
>
$$
e^{t\psi(u)}
$$
>
> を持つ Lévy 過程が存在する。
<!-- formal-statement-end -->

### なぜ小跳躍だけ一次項を引くのか

$|z|\le1$ で Taylor 展開すると

$$
e^{iuz}
=
1+iuz+O(z^2).
$$

したがって

$$
e^{iuz}-1-iuz
=
O(z^2).
$$

Lévy 測度は

$$
\int_{|z|\le1}z^2\nu(dz)<\infty
$$

を満たすので、この補正後の積分は原点近くで可積分です。

一方、大跳躍側は

$$
\nu(|z|>1)<\infty
$$

なので一次補正は不要です。

### 補正規約を変えるとドリフトも変わる

たとえば $h$ を別の有界な補正関数へ変えると、積分中の一次項が変わります。その差は $u$ に線形なので $b$ へ吸収されます。

従って

$$
\boxed{
b\text{ 単独には補正規約依存性がある}
}
$$

一方、Lévy 過程の法則そのものは変わりません。

### 意図的黒箱の境界

この定理のうち、

$$
\boxed{
\text{任意の Lévy 過程}
\Longrightarrow
\text{一意な三つ組 }(b,\sigma,\nu)
}
$$

という分類方向の完全証明は、本章では技術的入力とします。

理由は、一般 Lévy 過程の微小時間分布から

- Gaussian 成分
- 原点から離れた跳躍強度
- 補償された小跳躍
- ドリフト

を同時に抽出し、確率法則の相対コンパクト性と弱収束を制御する必要があり、無限分解可能分布の一般構造論そのものになるためです。

ただし逆方向、

$$
\boxed{
(b,\sigma,\nu)
\Longrightarrow
\text{Lévy 過程を実際に構成する}
}
$$

は本章で閉じます。

その構成を、後でドリフト・連続揺らぎ・小跳躍・大跳躍の四成分へまとめます。

---

## 7. ランダムな予測可能係数を Poisson 積分へ入れる

STO13 では決定論的単関数

$$
f(s,z)
$$

に対する積分だけを作りました。

SDE や Itô 公式では、過去の状態 $X_{s-}$ に依存する

$$
H(s,z,\omega)
$$

を積分したくなります。

ここで必要なのが予測可能性です。

<a id="def-sto14-simple-predictable-poisson-integrand"></a>

<!-- formal-statement-start -->
> **定義（単純予測可能 Poisson 被積分過程）**  
> $N(ds,dz)$ を強度 $ds\,\nu(dz)$ のポアソンランダム測度とし、$(\mathcal F_t)$ は $N$ の自然なフィルトレーションの通常拡大とする。したがって、時刻 $t$ より後の互いに素な時間領域上の Poisson 増分は $\mathcal F_t$ と独立である。
>
> $0=t_0<\cdots<t_m=T$、$\nu(A_j)<\infty$ を満たす可測集合 $A_j$、および有界な $\mathcal F_{t_k}$-可測確率変数 $\xi_{kj}$ を用いて
>
$$
H(s,z)
=
\sum_{k,j}
\xi_{kj}
1_{(t_k,t_{k+1}]}(s)
1_{A_j}(z)
$$
>
> と書ける $H$ を **単純予測可能 Poisson 被積分過程**という。
<!-- formal-statement-end -->

<!-- definition-example-start: def-sto14-simple-predictable-poisson-integrand -->
### 直接例：直前の符号で次の跳躍を重み付けする

**定義の確認**

時刻 $a<b$、$\nu(A)<\infty$ とし、$\xi$ を有界な $\mathcal F_a$-可測確率変数とします。

たとえば

$$
\xi=1_{\{X_a\ge0\}}
$$

と置けば

$$
H(s,z)
=
\xi1_{(a,b]}(s)1_A(z)
$$

です。

区間 $(a,b]$ に入る前の時刻 $a$ で $\xi$ はすでに決まっています。したがって未来の Poisson 増分を見て係数を変えておらず、予測可能な単純被積分過程です。
<!-- definition-example-end -->

単一ブロックでは

$$
\int_{(0,t]\times E}
H(s,z)\widetilde N(ds,dz)
=
\xi\,
\widetilde N((a,t\wedge b]\times A)
$$

と定義します。有限和は線形に定義します。

<a id="thm-sto14-prm-l2-integral"></a>

<!-- formal-statement-start -->
> **定理（補償 Poisson ランダム測度の L2 等長性と拡張）**  
> $H$ を単純予測可能 Poisson 被積分過程とする。
>
> このとき
>
$$
M_t
=
\int_{(0,t]\times E}
H(s,z)\widetilde N(ds,dz)
$$
>
> は二乗可積分マルチンゲールであり、
>
$$
\boxed{
E[M_t^2]
=
E\int_0^t\int_E
H(s,z)^2\,\nu(dz)\,ds.
}
$$
>
> さらに、右辺が有限である予測可能過程全体へ、$L^2$ 完備化により積分は一意に拡張される。
<!-- formal-statement-end -->

### 証明の見取り図

決定論的係数なら STO13 の等長性でした。

ランダム係数 $\xi$ が入っても、$\xi$ は区間開始時刻の情報で決まり、その後の Poisson 増分と独立です。

したがって条件付き二乗平均を取れば、同じ等長性が残ります。

<!-- proof-start -->
### 証明

まず一つのブロック

$$
H(s,z)
=
\xi1_{(a,b]}(s)1_A(z)
$$

を考えます。

$t\ge a$ とし、

$$
J_t
=
\widetilde N((a,t\wedge b]\times A)
$$

と置きます。

Poisson ランダム測度の独立増分から、$J_t$ は $\mathcal F_a$ より後の増分だけで決まり、

$$
E[J_t\mid\mathcal F_a]=0,
$$

$$
E[J_t^2\mid\mathcal F_a]
=
(t\wedge b-a)^+\nu(A).
$$

したがって

$$
E[\xi J_t\mid\mathcal F_a]=0
$$

であり、

$$
\begin{aligned}
E[(\xi J_t)^2]
&=
E\left[
\xi^2E[J_t^2\mid\mathcal F_a]
\right]\\
&=
E[\xi^2]\,(t\wedge b-a)^+\nu(A).
\end{aligned}
$$

一方、

$$
E\int_0^t\int_EH(s,z)^2\nu(dz)ds
=
E[\xi^2]\,(t\wedge b-a)^+\nu(A).
$$

よって単一ブロックで等長性が成り立ちます。

一般の単純過程では、時間区間と印集合を共通細分して互いに素なブロックへ分けます。

異なる未来ブロックの交差項は、後のブロックの増分をその開始時刻で条件付けすると 0 になります。

従って対角項だけが残り、

$$
E[M_t^2]
=
E\int_0^t\int_EH(s,z)^2\nu(dz)ds.
$$

同じ条件付き期待値計算から

$$
E[M_t\mid\mathcal F_s]=M_s
$$

も従うので $M$ は二乗可積分マルチンゲールです。

最後に

$$
\|H\|_{\mathcal H_T}^2
:=
E\int_0^T\int_EH(s,z)^2\nu(dz)ds
$$

と置きます。

ここで単純予測可能過程が、二乗可積分な予測可能過程全体に稠密であることを確認します。予測可能 $\sigma$-fieldは

$$
A\times(s,t],
\qquad
A\in\mathcal F_s,
$$

型の集合と $A\times\{0\}$ 型の集合から生成されます。印空間を掛けた予測可能 $\sigma$-fieldは、さらに有限 $\nu$-測度の $B\in\mathcal E$ を用いる

$$
A\times(s,t]\times B
$$

型の集合で生成できます。

$\nu$ は $\sigma$-有限なので

$$
E_1\subset E_2\subset\cdots,
\qquad
\nu(E_n)<\infty,
\qquad
\bigcup_nE_n=E
$$

と取れます。任意の二乗可積分な予測可能 $H$ は、まず

$$
H^{[n]}
=
(-n)\vee(H\wedge n)
\,1_{E_n}(z)
$$

で値を有界化し、印空間を有限測度部分へ制限すれば $L^2$ で近似できます。

各近似後は有限測度空間上の可測関数なので、生成集合の有限和からなる単関数で $L^2$ 近似できます。係数付き指示関数

$$
\xi\,1_{(s,t]}1_B,
\qquad
\xi\in L^\infty(\mathcal F_s),
$$

の有限和へ書き直せるため、これは本章の単純予測可能 Poisson 被積分過程です。

従って単純予測可能過程は二乗可積分な予測可能過程全体に $\mathcal H_T$-ノルムで稠密です。

[$L^2$ の完備性](../F0_00D2E_L2完備性_Riesz_Fischer/index.md#thm-f0-00d2e-01)と等長性から

$$
\left\|
\int H^{(n)}d\widetilde N
-
\int H^{(m)}d\widetilde N
\right\|_{L^2(\Omega)}
=
\|H^{(n)}-H^{(m)}\|_{\mathcal H_T}.
$$

従って $H^{(n)}$ が被積分空間で Cauchy なら積分も $L^2(\Omega)$ で Cauchy です。

極限を

$$
\int_0^T\int_EH(s,z)\widetilde N(ds,dz)
$$

と定義すれば、近似列に依存せず、等長性も極限へ保たれます。
<!-- proof-end -->

<a id="def-sto14-prm-l2-integral"></a>

<!-- formal-statement-start -->
> **定義（補償 Poisson ランダム測度に関する L2 確率積分）**  
> 予測可能過程 $H$ が
>
$$
E\int_0^T\int_E
H(s,z)^2\nu(dz)ds
<
\infty
$$
>
> を満たすとする。
>
> 単純予測可能過程 $H^{(n)}$ を
>
$$
E\int_0^T\int_E
|H^{(n)}-H|^2\nu(dz)ds
\to0
$$
>
> となるように取り、
>
$$
\int_0^t\int_EH(s,z)\widetilde N(ds,dz)
$$
>
> を単純積分の $L^2$ 極限として定める。
<!-- formal-statement-end -->

<!-- definition-example-start: def-sto14-prm-l2-integral -->
### 直接例：小跳躍そのものを積分する

**定義の確認**

Lévy 測度 $\nu$ に対し

$$
H(s,z)=z1_{\{|z|\le1\}}
$$

とします。

決定論的なので予測可能です。

さらに Lévy 測度の条件から

$$
\int_{|z|\le1}z^2\nu(dz)<\infty.
$$

従って任意の $T<\infty$ で

$$
E\int_0^T\int
H(s,z)^2\nu(dz)ds
=
T\int_{|z|\le1}z^2\nu(dz)
<
\infty.
$$

よって

$$
\int_0^t\int_{|z|\le1}
z\,\widetilde N(ds,dz)
$$

は $L^2$ 確率積分として定義できます。

これが後で四成分分解へ入る小跳躍部分です。
<!-- definition-example-end -->

---

## 8. càdlàg マルチンゲールの L2 最大評価

小跳躍を「終端時刻だけ」でなく $[0,T]$ 全体で近づけるため、Doob の $L^2$ 最大評価を跳躍マルチンゲールにも使います。

<a id="lem-sto14-cadlag-doob-l2"></a>

<!-- formal-statement-start -->
> **補題（càdlàg マルチンゲールの Doob L2 最大評価）**  
> $M=(M_t)_{0\le t\le T}$ を càdlàg な二乗可積分マルチンゲールとする。
>
> このとき
>
$$
\boxed{
E\left[
\sup_{0\le t\le T}|M_t|^2
\right]
\le
4E[|M_T|^2].
}
$$
<!-- formal-statement-end -->

<!-- proof-start -->
### 証明

各 $n$ について二進格子

$$
D_n
=
\{kT2^{-n}:k=0,\ldots,2^n\}
$$

上へ $M$ を制限します。

これは離散時間マルチンゲールです。

$M$ を格子 $D_n$ 上へ制限し、
$$
M_n^*
=
\max_{t\in D_n}|M_t|
$$
と書きます。$|M|$ は劣マルチンゲールなので、STO2 の [Doob 最大不等式](../STO2/index.md#thm-sto2-doob-maximal) の停止時刻による証明をそのまま格子上で使うと、任意の $\lambda>0$ に対して
$$
\lambda P(M_n^*\ge\lambda)
\le
E\left[
|M_T|1_{\{M_n^*\ge\lambda\}}
\right]
$$
を得ます。

非負確率変数の 裾積分公式と [Tonelli の定理](../F0_00D2C_積測度_Tonelli_Fubini/index.md#thm-tonelli)から
$$
\begin{aligned}
E[(M_n^*)^2]
&=
2\int_0^\infty
\lambda P(M_n^*\ge\lambda)\,d\lambda\\
&\le
2E\left[
|M_T|
\int_0^\infty
1_{\{M_n^*\ge\lambda\}}d\lambda
\right]\\
&=
2E[|M_T|M_n^*].
\end{aligned}
$$

[Hölder の不等式](../F0_00D2D_Lp_Holder_Minkowski/index.md#thm-f0-00d2d-01)を指数 $2,2$ で使うと
$$
E[(M_n^*)^2]
\le
2\|M_T\|_2\|M_n^*\|_2.
$$
$\|M_n^*\|_2=0$ なら結論は自明で、それ以外なら両辺を $\|M_n^*\|_2$ で割って
$$
\|M_n^*\|_2
\le
2\|M_T\|_2.
$$
従って
$$
E\left[
\max_{t\in D_n}|M_t|^2
\right]
\le
4E[|M_T|^2].
$$

二進格子の合併は $[0,T]$ で稠密です。

càdlàg 関数は右連続なので、

$$
\sup_{0\le t\le T}|M_t|
=
\sup_{t\in\cup_nD_n}|M_t|.
$$

また $D_n\subset D_{n+1}$ なので格子上最大値は単調増加します。

単調収束により

$$
E\left[
\sup_{0\le t\le T}|M_t|^2
\right]
=
\lim_{n\to\infty}
E\left[
\max_{t\in D_n}|M_t|^2
\right]
\le
4E[|M_T|^2].
$$
<!-- proof-end -->

連続性は不要で、càdlàg 性だけで十分です。これが STO6 の連続マルチンゲール版から 跳躍の場合 へ必要になる変更点です。

---

## 9. 無限個の小跳躍を閾値極限で作る

$\nu$ を Lévy 測度、$N(ds,dz)$ を強度 $ds\,\nu(dz)$ のポアソンランダム測度とします。

$\varepsilon\in(0,1)$ に対して

$$
M_t^{(\varepsilon)}
=
\int_0^t\int_{\varepsilon<|z|\le1}
z\,\widetilde N(ds,dz)
$$

と置きます。

$\nu(|z|>\varepsilon)<\infty$ なので、各 $\varepsilon>0$ では有限個の跳躍だけを扱っています。

<a id="thm-sto14-small-jump-limit"></a>

<!-- formal-statement-start -->
> **定理（補償小跳躍積分の閾値極限）**  
> 任意の $T<\infty$ に対し、
>
$$
M^{(\varepsilon)}_t
=
\int_0^t\int_{\varepsilon<|z|\le1}
z\,\widetilde N(ds,dz)
$$
>
> は $\varepsilon\downarrow0$ で
>
$$
L^2\left(
\Omega;
\sup_{0\le t\le T}|\cdot|
\right)
$$
>
> の意味で Cauchy である。
>
> 従って càdlàg 二乗可積分マルチンゲール $M$ が存在して
>
$$
\boxed{
M_t
=
\int_0^t\int_{|z|\le1}
z\,\widetilde N(ds,dz)
}
$$
>
> と書ける。
<!-- formal-statement-end -->

### 証明の核心

$\delta<\varepsilon$ なら差は

$$
M_t^{(\delta)}-M_t^{(\varepsilon)}
=
\int_0^t
\int_{\delta<|z|\le\varepsilon}
z\,\widetilde N(ds,dz).
$$

等長性が、その差の大きさを Lévy 測度の二次モーメントへ直接変えます。

<!-- proof-start -->
### 証明

$\delta<\varepsilon<1$ とします。

[補償 Poisson ランダム測度の L2 確率積分](#thm-sto14-prm-l2-integral)の等長性から

$$
E\left[
|M_T^{(\delta)}-M_T^{(\varepsilon)}|^2
\right]
=
T
\int_{\delta<|z|\le\varepsilon}
z^2\nu(dz).
$$

差は càdlàg 二乗可積分マルチンゲールです。

従って [càdlàg マルチンゲールの Doob L2 最大評価](#lem-sto14-cadlag-doob-l2)から

$$
\begin{aligned}
&E\left[
\sup_{0\le t\le T}
|M_t^{(\delta)}-M_t^{(\varepsilon)}|^2
\right]\\
&\le
4T
\int_{\delta<|z|\le\varepsilon}
z^2\nu(dz).
\end{aligned}
$$

Lévy 測度の条件により

$$
\int_{|z|\le1}z^2\nu(dz)<\infty.
$$

したがって $\delta,\varepsilon\downarrow0$ で右辺は 0 へ行きます。

よって $M^{(\varepsilon)}$ は sup ノルムの二乗平均で Cauchy です。

ここで過程空間の極限も明示しておきます。$\varepsilon_n\downarrow0$ を十分速く取り、

$$
\sum_n
E\left[
\sup_{t\le T}
|M_t^{(\varepsilon_{n+1})}
-
M_t^{(\varepsilon_n)}|^2
\right]
<
\infty.
$$

Markov の不等式と [Borel--Cantelli 第1補題](../F0_00P4_収束_Borel_Cantelli_一様可積分性/index.md#thm-f0-00p4-borel-cantelli-1)により、この部分列は $[0,T]$ 上一様にほとんど確実収束するように取れます。

各 $M^{(\varepsilon_n)}$ は càdlàg で、càdlàg 関数の一様極限も càdlàg です。従ってある càdlàg 過程 $M$ へ一様にほとんど確実収束します。

さらに任意の $\varepsilon>0$ に対し、上で得た Cauchy 評価と [Fatou の補題](../F0_00D2B_単調収束_Fatou_優収束/index.md#lem-f0-00d2b-01)を使えば

$$
E\left[
\sup_{t\le T}
|M_t^{(\varepsilon)}-M_t|^2
\right]
\to0.
$$

したがって閾値付き近似族全体が sup ノルムの二乗平均で $M$ へ収束します。

各固定 $t$ でも $L^2$ 収束するため、条件付き期待値へ極限を通せば $M$ は二乗可積分マルチンゲールです。
<!-- proof-end -->

ここで「無限個の小跳躍」を一個ずつ足していません。

代わりに

$$
\boxed{
\varepsilon\text{ より大きい跳躍だけ}
\to
\text{平均を引く}
\to
L^2\text{ 極限}
}
$$

としています。

これが補償の本当の役割です。

---

## 10. ドリフト・連続揺らぎ・小跳躍・大跳躍への分解

大跳躍側では

$$
\nu(|z|>1)<\infty
$$

なので、

$$
\int_0^t\int_{|z|>1}
z\,N(ds,dz)
$$

は有限個の跳躍の和として普通に定義できます。

小跳躍側は前節の補償積分で作れます。

<a id="thm-sto14-levy-ito"></a>

<!-- formal-statement-start -->
> **定理（Lévy--Itô 分解）**  
> 実数値 Lévy 過程 $X$ の Lévy--Khintchine 三つ組 を $(b,\sigma,\nu)$ とする。
>
> 適切な確率空間上でブラウン運動 $B$ と、強度 $ds\,\nu(dz)$ のポアソンランダム測度 $N$ を取り、
>
$$
\boxed{
\begin{aligned}
X_t
={}&
bt
+\sigma B_t\\
&+
\int_0^t\int_{|z|\le1}
z\,\widetilde N(ds,dz)\\
&+
\int_0^t\int_{|z|>1}
z\,N(ds,dz).
\end{aligned}
}
$$
>
> と表せる。
>
> 逆に、右辺は Lévy 過程で、その Lévy 指数は
>
$$
ibu-\frac12\sigma^2u^2
+
\int
\left(
e^{iuz}-1-iuz1_{\{|z|\le1\}}
\right)\nu(dz)
$$
>
> である。
<!-- formal-statement-end -->

### まず構成側を閉じる

本章では右辺から過程を作り、その Lévy 性と特性指数を確認する部分を証明します。

「任意の Lévy 過程がこの形へ分解される」という一般分類方向は、前節で明示した Lévy--Khintchine 構造定理を技術的入力とします。

<!-- proof-start -->
### 証明：三つ組から過程を構成する方向

$$
X_t^{(\varepsilon)}
=
bt+\sigma B_t
+
\int_0^t\int_{\varepsilon<|z|\le1}
z\,\widetilde N(ds,dz)
+
\int_0^t\int_{|z|>1}
z\,N(ds,dz)
$$

と置きます。

各 $\varepsilon>0$ では

$$
\nu(|z|>\varepsilon)<\infty
$$

なので、Poisson 部分は有限活動度です。

ブラウン運動、$(\varepsilon,1]$ の補償跳躍、$|z|>1$ の跳躍 を独立に取れば、各成分は独立定常増分を持ちます。従って $X^{(\varepsilon)}$ も独立定常増分を持ちます。

前節から、小跳躍マルチンゲールは $[0,T]$ 上 sup ノルムの二乗平均で収束します。したがって

$$
X^{(\varepsilon)}
\to X
$$

が各有限時間区間で一様確率収束し、$X$ は càdlàg 版を持ちます。

独立定常増分性は有限個の時点の同時特性関数へ移せるため極限へ保たれます。

確率連続性も直接確認できます。$h\downarrow0$ に対して、ドリフトは $|b|h\to0$、ブラウン部分は二乗平均で 0 へ収束します。補償小跳躍部分は等長性から

$$
E\left[
\left|
\int_t^{t+h}\int_{|z|\le1}
z\,\widetilde N(ds,dz)
\right|^2
\right]
=
h\int_{|z|\le1}z^2\nu(dz)
\to0.
$$

大跳躍が $(t,t+h]$ に一度でも起こる確率は

$$
1-e^{-h\nu(|z|>1)}
\to0.
$$

従って $X_{t+h}-X_t\to0$ は確率収束であり、構成した $X$ は Lévy 過程です。

次に特性関数を計算します。

ブラウン部分について

$$
E[e^{iu\sigma B_t}]
=
e^{-\frac12\sigma^2u^2t}.
$$

大跳躍部分は複合 Poisson の計算から

$$
\exp\left\{
t\int_{|z|>1}
(e^{iuz}-1)\nu(dz)
\right\}.
$$

閾値付き小跳躍部分では、補償により

$$
\begin{aligned}
&E\exp\left(
iu\int_0^t\int_{\varepsilon<|z|\le1}
z\,\widetilde N(ds,dz)
\right)\\
&=
\exp\left\{
t
\int_{\varepsilon<|z|\le1}
(e^{iuz}-1-iuz)\nu(dz)
\right\}.
\end{aligned}
$$

各成分を独立に取ったので特性関数は積になります。

従って

$$
E[e^{iuX_t^{(\varepsilon)}}]
=
\exp\{t\psi_\varepsilon(u)\},
$$

ただし

$$
\begin{aligned}
\psi_\varepsilon(u)
={}&
ibu-\frac12\sigma^2u^2\\
&+
\int_{\varepsilon<|z|\le1}
(e^{iuz}-1-iuz)\nu(dz)\\
&+
\int_{|z|>1}
(e^{iuz}-1)\nu(dz).
\end{aligned}
$$

$|z|\le1$ では Taylor の評価から

$$
|e^{iuz}-1-iuz|
\le
C_u z^2.
$$

Lévy 測度条件により $z^2$ は小跳躍域で $\nu$-可積分です。

従って [Lebesgue の優収束定理](../F0_00D2B_単調収束_Fatou_優収束/index.md#thm-f0-00d2b-01)により

$$
\psi_\varepsilon(u)
\to
ibu-\frac12\sigma^2u^2
+
\int
\left(
e^{iuz}-1-iuz1_{\{|z|\le1\}}
\right)\nu(dz).
$$

一方 $X_t^{(\varepsilon)}\to X_t$ 確率収束で なので特性関数も収束します。

以上から

$$
E[e^{iuX_t}]
=
e^{t\psi(u)}
$$

であり、$X$ は指定された三つ組 を持つ Lévy 過程です。
<!-- proof-end -->

### 4 つの成分を読み分ける

Lévy--Itô 分解は

$$
\boxed{
\text{ドリフト}
+
\text{Gaussian}
+
\text{補償小跳躍}
+
\text{大跳躍}
}
$$

という分解です。

- $bt$：有限変動の決定論的成分。
- $\sigma B_t$：連続なランダム揺らぎ。
- $\int_{|z|\le1}z\,d\widetilde N$：無限個でもよい小跳躍の中心化された揺らぎ。
- $\int_{|z|>1}z\,dN$：有限個の大跳躍。

ブラウン運動と跳躍 を同じセミマルチンゲール計算へ入れる準備が整いました。

---

## 11. 跳躍があると普通の連鎖律は何を落とすか

連続過程なら、Itô 公式は「一次項 + 二次変分項」でした。

しかし $X$ が時刻 $s$ で

$$
X_{s-}
\to
X_s=X_{s-}+\Delta X_s
$$

と跳ぶと、関数値は

$$
f(X_s)-f(X_{s-})
$$

だけ一気に変わります。

一次近似

$$
f'(X_{s-})\Delta X_s
$$

だけでは足りません。

差

$$
\boxed{
f(X_s)-f(X_{s-})
-
f'(X_{s-})\Delta X_s
}
$$

が 跳躍補正 です。

有限活動度なら、これは跳躍時刻ごとに普通に足せます。

無限活動度では、小跳躍に対して Taylor の二次 剰余項 が

$$
O((\Delta X_s)^2)
$$

になることが、Lévy 測度の

$$
\int_{|z|\le1}z^2\nu(dz)<\infty
$$

と噛み合います。

---

## 12. 跳躍を含む関数変換公式

<a id="thm-sto14-jump-ito"></a>

<!-- formal-statement-start -->
> **定理（Lévy 過程に対する跳躍 Itô 公式）**  
> $X$ を 三つ組 $(b,\sigma,\nu)$ を持つ実数値 Lévy 過程とし、Lévy--Itô 分解
>
$$
\begin{aligned}
X_t
={}&
X_0+bt+\sigma B_t\\
&+
\int_0^t\int_{|z|\le1}z\,\widetilde N(ds,dz)
+
\int_0^t\int_{|z|>1}z\,N(ds,dz)
\end{aligned}
$$
>
> を取る。
>
> $f\in C_b^2(\mathbb R)$、すなわち $f,f',f''$ が有界な $C^2$ 関数とする。
>
> このとき
>
$$
\boxed{
\begin{aligned}
f(X_t)
={}&
f(X_0)
+
\int_0^t
f'(X_{s-})b\,ds\\
&+
\int_0^t
f'(X_{s-})\sigma\,dB_s
+
\frac12
\int_0^t
f''(X_{s-})\sigma^2\,ds\\
&+
\int_0^t\int_{|z|\le1}
\left(
f(X_{s-}+z)-f(X_{s-})
\right)
\widetilde N(ds,dz)\\
&+
\int_0^t\int_{|z|\le1}
\left(
f(X_{s-}+z)-f(X_{s-})-f'(X_{s-})z
\right)
\nu(dz)\,ds\\
&+
\int_0^t\int_{|z|>1}
\left(
f(X_{s-}+z)-f(X_{s-})
\right)
N(ds,dz).
\end{aligned}
}
$$
<!-- formal-statement-end -->

### 証明の見取り図

まず $\varepsilon<|z|$ の跳躍だけ残します。

この閾値付き過程は有限活動度なので、跳躍時刻と跳躍時刻の間では STO7 の連続 Itô 公式を使えます。

跳躍時刻では

$$
f(X_s)-f(X_{s-})
$$

をそのまま足します。

最後に $\varepsilon\downarrow0$ とし、

- 一次跳躍部分は補償 Poisson 積分の $L^2$ 等長性、
- 剰余項 は $C^2$ Taylor 評価と $\int z^2\nu(dz)<\infty$

で極限へ送ります。

<!-- proof-start -->
### 証明

$\varepsilon\in(0,1)$ とし、

$$
\begin{aligned}
X_t^{(\varepsilon)}
={}&
X_0+bt+\sigma B_t\\
&+
\int_0^t\int_{\varepsilon<|z|\le1}
z\,\widetilde N(ds,dz)\\
&+
\int_0^t\int_{|z|>1}
z\,N(ds,dz).
\end{aligned}
$$

とします。

$\nu(|z|>\varepsilon)<\infty$ なので $X^{(\varepsilon)}$ は有限活動度の跳躍 を持ちます。

跳躍時刻の間では

$$
dX_t^{(\varepsilon)}
=
b\,dt+\sigma\,dB_t
-
\left(
\int_{\varepsilon<|z|\le1}z\,\nu(dz)
\right)dt
$$

という連続 Itô 過程です。

各連続区間で [多次元 Itô 公式](../STO7/index.md#thm-sto7-multidimensional-ito) の一次元版を適用し、全区間を足し合わせると、

$$
\begin{aligned}
f(X_t^{(\varepsilon)})
={}&
f(X_0)
+
\int_0^t
f'(X_{s-}^{(\varepsilon)})b\,ds\\
&+
\int_0^t
f'(X_{s-}^{(\varepsilon)})\sigma\,dB_s
+
\frac12\int_0^t
f''(X_{s-}^{(\varepsilon)})\sigma^2ds\\
&+
\sum_{0<s\le t}
\Bigl[
f(X_s^{(\varepsilon)})
-f(X_{s-}^{(\varepsilon)})
\Bigr]\\
&-
\int_0^t
f'(X_{s-}^{(\varepsilon)})
\left(
\int_{\varepsilon<|z|\le1}z\nu(dz)
\right)ds,
\end{aligned}
$$

ここで和は $|z|>\varepsilon$ の跳躍についてだけ取ります。

跳躍和をランダム測度で書くと

$$
\begin{aligned}
&\sum_{0<s\le t}
\Bigl[
f(X_s^{(\varepsilon)})
-f(X_{s-}^{(\varepsilon)})
\Bigr]\\
&=
\int_0^t\int_{|z|>\varepsilon}
\left(
f(X_{s-}^{(\varepsilon)}+z)
-f(X_{s-}^{(\varepsilon)})
\right)N(ds,dz).
\end{aligned}
$$

$\varepsilon<|z|\le1$ の部分で

$$
N(ds,dz)
=
\widetilde N(ds,dz)+ds\,\nu(dz)
$$

を代入します。

すると補償ドリフト の一次項と組み合わさり、

$$
\begin{aligned}
&
\int_{\varepsilon<|z|\le1}
\left(
f(x+z)-f(x)
\right)N(ds,dz)\\
&\quad
-
f'(x)
\int_{\varepsilon<|z|\le1}
z\nu(dz)ds\\
&=
\int_{\varepsilon<|z|\le1}
\left(
f(x+z)-f(x)
\right)\widetilde N(ds,dz)\\
&\quad+
\int_{\varepsilon<|z|\le1}
\left(
f(x+z)-f(x)-f'(x)z
\right)\nu(dz)ds.
\end{aligned}
$$

これで閾値付き版の公式が得られます。

次に $\varepsilon\downarrow0$ とします。

前節の小跳躍収束から

$$
X^{(\varepsilon)}
\to X
$$

は $[0,T]$ 上一様に probability で収束します。

したがって部分列を取れば一様にほとんど確実収束させられます。$f',f''$ は有界かつ連続なので、時間積分の被積分関数は有界収束で極限へ送れます。また
$$
f'(X_{s-}^{(\varepsilon)})\sigma
\to
f'(X_{s-})\sigma
$$
は $ds\times P$ に関する $L^2$ でも収束するため、ブラウン確率積分は Itô 等長性によって極限へ送れます。

小跳躍の補償ランダム測度項について、平均値の定理から

$$
|f(x+z)-f(x)|
\le
\|f'\|_\infty|z|.
$$

従って差の integrand は $L^2(ds\,\nu)$ で支配され、補償 Poisson 積分の等長性により極限へ送れます。

補償ドリフト剰余項には [Taylor の定理](../RA3/index.md#thm-ra3-taylor)から

$$
|f(x+z)-f(x)-f'(x)z|
\le
\frac12\|f''\|_\infty z^2.
$$

右辺は $|z|\le1$ で $\nu$-可積分です。

したがって [Lebesgue の優収束定理](../F0_00D2B_単調収束_Fatou_優収束/index.md#thm-f0-00d2b-01)によりドリフト剰余項も極限へ送れます。

$|z|>1$ は有限活動度なので、有限個の跳躍に対する項は閾値の影響を受けません。

以上で $C_b^2$ 関数について公式が得られます。

一般の $C^2$ 関数へ拡張するときは、$X_{t-}$ だけでなく大跳躍による着地点も同時に制御する停止時刻を取り、停止後の各確率積分が可積分であることを確認してから議論を進めます。本章では後続計算に必要な $C_b^2$ 版を正本とします。
<!-- proof-end -->

### 有限活動度なら何が簡単になるか

複合 Poisson 過程では有限時間内の跳躍 が有限個なので、

$$
\sum_{0<s\le t}
\left[
f(X_s)-f(X_{s-})-f'(X_{s-})\Delta X_s
\right]
$$

を普通の有限和として直接書けます。

無限活動度では、この補正項 の二次 剰余項 が Lévy 測度条件によって可積分になることが本質です。

---

## 13. Lévy 過程の生成作用素

[STO11 の生成作用素](../STO11/index.md#def-sto11-generator)では

$$
Lf
=
\lim_{t\downarrow0}
\frac{P_tf-f}{t}
$$

として導入しました。

Lévy 過程では [跳躍 Itô 公式](#thm-sto14-jump-ito)から生成作用素を直接読めます。

<a id="cor-sto14-levy-generator"></a>

<!-- formal-statement-start -->
> **系（Lévy 過程の生成作用素マルチンゲール）**  
> $X$ を 三つ組 $(b,\sigma,\nu)$ を持つ Lévy 過程とする。
>
> $f\in C_c^2(\mathbb R)$ に対して
>
$$
\boxed{
Lf(x)
=
bf'(x)
+
\frac12\sigma^2f''(x)
+
\int_{\mathbb R\setminus\{0\}}
\left(
f(x+z)-f(x)-zf'(x)1_{\{|z|\le1\}}
\right)\nu(dz).
}
$$
>
> このとき
>
$$
\boxed{
f(X_t)-f(X_0)-\int_0^tLf(X_{s-})\,ds
}
$$
>
> はマルチンゲールである。
<!-- formal-statement-end -->

<!-- proof-start -->
### 証明

[跳躍 Itô 公式](#thm-sto14-jump-ito)へ $f$ を適用します。

右辺のうち

$$
\int_0^tf'(X_{s-})\sigma\,dB_s
$$

は局所マルチンゲールです。

また

$$
\int_0^t\int_{|z|\le1}
\left(
f(X_{s-}+z)-f(X_{s-})
\right)\widetilde N(ds,dz)
$$

も補償 Poisson ランダム測度に関する局所マルチンゲールです。

$f\in C_c^2$ なら必要な係数は有界で、大跳躍強度も有限なので局所化後の期待値評価から真のマルチンゲールとして扱えます。

大跳躍項は $\nu(|z|>1)<\infty$ なので
$$
N(ds,dz)
=
\widetilde N(ds,dz)+ds\,\nu(dz)
$$
と分けられます。補償後の大跳躍積分はマルチンゲールであり、残る補償項
$$
\int_0^t\int_{|z|>1}
\left(
f(X_{s-}+z)-f(X_{s-})
\right)\nu(dz)ds
$$
は有限変動です。

有限変動のドリフト部分をまとめると

$$
\int_0^tLf(X_{s-})ds
$$

になります。

従って残りはマルチンゲールです。
<!-- proof-end -->

### 指数関数を入れると Lévy--Khintchine が戻る

上の公式は実部・虚部へ別々に適用すれば複素数値 $C_b^2$ 関数にも成分ごとに拡張できます。従って

$$
f(x)=e^{iux}
$$

を入れると

$$
Lf(x)
=
\psi(u)e^{iux}.
$$

すなわち Lévy 指数は生成作用素の Fourier symbol です。

ここで

$$
\boxed{
\text{確率過程}
\leftrightarrow
\text{生成作用素}
\leftrightarrow
\text{Lévy--Khintchine 指数}
}
$$

が一つにつながります。

---

## 14. 拡散・跳躍 SDE への橋

Lévy 過程そのものより一般に、状態に依存する係数を持つ

$$
\begin{aligned}
dX_t
={}&
b(X_{t-})\,dt
+
\sigma(X_{t-})\,dB_t\\
&+
\int_{|z|\le1}
\gamma(X_{t-},z)\widetilde N(dt,dz)\\
&+
\int_{|z|>1}
\Gamma(X_{t-},z)N(dt,dz)
\end{aligned}
$$

を考えられます。

重要なのは

$$
\boxed{
X_t
\text{ ではなく }
X_{t-}
}
$$

が係数に入ることです。

時刻 $t$ の跳躍 $\Delta X_t$ を積分係数が先に見てしまうと、予測可能性が壊れます。

càdlàg 過程の左極限

$$
X_{t-}
$$

は、標準条件の下で予測可能な過程になります。

したがって

$$
\gamma(X_{t-},z)
$$

は「跳躍が起きる直前の情報だけで係数を決める」形です。

存在一意性や数値解法は別章の課題ですが、本章で

- ブラウン確率積分
- 補償 Poisson 確率積分
- 大跳躍の有限和
- [跳躍 Itô 公式](#thm-sto14-jump-ito)

という必要な解析部品は揃いました。

---

## 15. 仮定を外すとどこが壊れるか

### 15.1 小跳躍を補償せず全部足す

$\nu(|z|\le1)=\infty$ なら、任意の有限時間区間にも小跳躍が無限個現れ得ます。

このとき

$$
\int_{|z|\le1}z\,N(ds,dz)
$$

が絶対収束するとは限りません。

Lévy 測度条件が保証するのは

$$
\int_{|z|\le1}z^2\nu(dz)<\infty
$$

であって

$$
\int_{|z|\le1}|z|\nu(dz)<\infty
$$

ではありません。

したがって二乗平均で扱うには補償が必要です。

### 15.2 $X_t$ を積分係数に使う

跳躍時刻 $t$ で $X_t$ は 跳躍後の値です。

それを同じ時刻の $N(dt,dz)$ の係数に使うと、現在の跳躍 を係数が見た形になり得ます。

確率積分では左極限 $X_{t-}$ を使い、予測可能性を守ります。

### 15.3 連続 Itô 公式をそのまま使う

連続 Itô 公式だけなら 跳躍時刻で

$$
f(X_s)-f(X_{s-})
$$

という有限差分を再現できません。

失われる項は

$$
f(X_s)-f(X_{s-})-f'(X_{s-})\Delta X_s.
$$

跳躍補正を落とすと、たとえば $f(x)=x^2$ ですぐ

$$
(\Delta X_s)^2
$$

が欠けます。

### 15.4 補正規約を変えたのにドリフトを固定する

Lévy--Khintchine の一次補正

$$
z1_{\{|z|\le1\}}
$$

は規約です。

補正関数を変えるなら、その差をドリフト $b$ へ移さなければ同じ法則になりません。

---

## 16. 演習

#### STO14-A01 複合 Poisson 過程の特性関数と平均・分散
- Level: A
- 目安時間: 20分

率 $\lambda$ のポアソン過程 $N$ と、$N$ と独立な独立同分布列 $(Y_k)$ を用いて

$$
X_t=\sum_{k=1}^{N_t}Y_k
$$

とする。$E[Y_1]=m$、$E[Y_1^2]=q<\infty$ とする。

1. $E[e^{iuX_t}]$ を求めよ。
2. $E[X_t]$ を求めよ。
3. $\operatorname{Var}(X_t)$ を求めよ。
4. $Y_k\equiv c$ の場合に結果を確認せよ。

<!-- solution-start -->
### 詳細解答

1. $N_t=n$ を条件にすると

$$
E[e^{iuX_t}\mid N_t=n]
=
\widehat\mu(u)^n.
$$

従って

$$
\begin{aligned}
E[e^{iuX_t}]
&=
\sum_{n=0}^\infty
\widehat\mu(u)^n
e^{-\lambda t}\frac{(\lambda t)^n}{n!}\\
&=
\boxed{
\exp\{\lambda t(\widehat\mu(u)-1)\}.
}
\end{aligned}
$$

2. 条件付き期待値から

$$
E[X_t\mid N_t]
=
N_t m.
$$

したがって

$$
E[X_t]
=
mE[N_t]
=
\boxed{\lambda tm}.
$$

3. 全分散公式を使います。

$$
\operatorname{Var}(X_t)
=
E[\operatorname{Var}(X_t\mid N_t)]
+
\operatorname{Var}(E[X_t\mid N_t]).
$$

$N_t=n$ のとき

$$
\operatorname{Var}(X_t\mid N_t=n)
=
n\operatorname{Var}(Y_1)
=
n(q-m^2).
$$

従って第一項は

$$
\lambda t(q-m^2).
$$

第二項は

$$
\operatorname{Var}(N_tm)
=
m^2\lambda t.
$$

よって

$$
\boxed{
\operatorname{Var}(X_t)
=
\lambda tq.
}
$$

4. $Y_k\equiv c$ なら $m=c$、$q=c^2$ なので

$$
E[X_t]=\lambda tc,
\qquad
\operatorname{Var}(X_t)=\lambda tc^2.
$$

実際 $X_t=cN_t$ だから同じ結果になります。
<!-- solution-end -->

#### STO14-A02 stable 型 Lévy 測度の活動度
- Level: A
- 目安時間: 20分

$0<\alpha<2$、$c>0$ とし

$$
\nu(dz)
=
c|z|^{-1-\alpha}dz
$$

を考える。

1. $\int_{|z|\le1}z^2\nu(dz)$ を計算せよ。
2. $\nu(|z|>1)$ を計算せよ。
3. $\nu(|z|\le1)$ を判定せよ。
4. 有限活動度か無限活動度か答えよ。

<!-- solution-start -->
### 詳細解答

1. 対称性から

$$
\begin{aligned}
\int_{|z|\le1}z^2\nu(dz)
&=
2c\int_0^1z^{1-\alpha}dz\\
&=
\boxed{\frac{2c}{2-\alpha}}.
\end{aligned}
$$

$\alpha<2$ が有限性に必要です。

2.

$$
\begin{aligned}
\nu(|z|>1)
&=
2c\int_1^\infty z^{-1-\alpha}dz\\
&=
\boxed{\frac{2c}{\alpha}}.
\end{aligned}
$$

$\alpha>0$ なので有限です。

3.

$$
\nu(|z|\le1)
=
2c\int_0^1z^{-1-\alpha}dz.
$$

原点で発散するため

$$
\boxed{\nu(|z|\le1)=\infty}.
$$

4. 全質量は無限なので

$$
\boxed{\text{無限活動度}}
$$

です。

ただし二乗重み付き積分は有限なので、補償小跳躍積分は $L^2$ で構成できます。
<!-- solution-end -->

#### STO14-A03 予測可能なランダム係数を持つ補償 Poisson 積分
- Level: A
- 目安時間: 20分

$a<b$、$\nu(A)<\infty$ とし、$\xi$ を有界な $\mathcal F_a$-可測確率変数とする。

$$
H(s,z)
=
\xi1_{(a,b]}(s)1_A(z)
$$

と置く。

1. $H$ が単純予測可能被積分過程であることを確認せよ。
2. $M_t=\int H\,d\widetilde N$ を具体的に書け。
3. $E[M_t]=0$ を示せ。
4. $E[M_t^2]$ を求め、等長性を確認せよ。

<!-- solution-start -->
### 詳細解答

1. 時間係数 $\xi$ は区間 $(a,b]$ が始まる時点 $a$ の情報 $\mathcal F_a$ で可測です。また $A$ は有限強度集合です。従って定義どおり単純予測可能です。

2.

$$
M_t
=
\xi
\widetilde N((a,t\wedge b]\times A).
$$

$t\le a$ なら $M_t=0$ です。

3. $t>a$ とします。Poisson 独立増分から

$$
E[
\widetilde N((a,t\wedge b]\times A)
\mid\mathcal F_a
]
=
0.
$$

したがって

$$
E[M_t]
=
E\left[
\xi
E[\widetilde N(\cdots)\mid\mathcal F_a]
\right]
=
\boxed{0}.
$$

4. 条件付き分散は

$$
E[
\widetilde N((a,t\wedge b]\times A)^2
\mid\mathcal F_a
]
=
(t\wedge b-a)^+\nu(A).
$$

従って

$$
\boxed{
E[M_t^2]
=
E[\xi^2]\,(t\wedge b-a)^+\nu(A).
}
$$

一方

$$
\begin{aligned}
E\int_0^t\int H(s,z)^2\nu(dz)ds
&=
E[\xi^2]
\int_a^{t\wedge b}ds
\int_A\nu(dz)\\
&=
E[\xi^2]\,(t\wedge b-a)^+\nu(A).
\end{aligned}
$$

一致しました。
<!-- solution-end -->

#### STO14-A04 $f(x)=x^2$ に対する 跳躍補正
- Level: A
- 目安時間: 20分

有限活動度の càdlàg 過程 $X$ を考える。連続部分について通常の Itô 公式が使えるとする。

1. 跳躍時刻 $s$ で
   $$
   X_s^2-X_{s-}^2
   $$
   を展開せよ。
2. 一次項 $2X_{s-}\Delta X_s$ との差を求めよ。
3. 跳躍補正 が $(\Delta X_s)^2$ になることを確認せよ。
4. これが連続二次変分だけでは捉えられない理由を説明せよ。

<!-- solution-start -->
### 詳細解答

1.

$$
X_s=X_{s-}+\Delta X_s
$$

なので

$$
\begin{aligned}
X_s^2-X_{s-}^2
&=
(X_{s-}+\Delta X_s)^2-X_{s-}^2\\
&=
2X_{s-}\Delta X_s+(\Delta X_s)^2.
\end{aligned}
$$

2. 一次近似との差は

$$
\boxed{
X_s^2-X_{s-}^2-2X_{s-}\Delta X_s
=
(\Delta X_s)^2.
}
$$

3. $f(x)=x^2$ では $f'(x)=2x$ なので 跳躍補正 の一般形

$$
f(X_s)-f(X_{s-})-f'(X_{s-})\Delta X_s
$$

は確かに

$$
(\Delta X_s)^2
$$

です。

4. 連続 Itô 公式の二次項は連続マルチンゲール部分の二次変分から生じます。

jump では一回の有限差分そのものが二次以上の寄与を持つため、連続部分だけの二次変分項では

$$
(\Delta X_s)^2
$$

を自動的には回収できません。そこで 跳躍補正 を別に足す必要があります。
<!-- solution-end -->

#### STO14-B01 特性関数半群から Lévy 指数を再構成する
- Level: B
- 目安時間: 30分

Lévy 過程 $X$ について

$$
\varphi_t(u)=E[e^{iuX_t}]
$$

とする。

1. $\varphi_{s+t}(u)=\varphi_s(u)\varphi_t(u)$ を示せ。
2. $\varphi_t(u)\neq0$ を示せ。
3. 連続な対数を用いて $\varphi_t(u)=e^{t\psi(u)}$ を導け。
4. $X_t=bt+\sigma B_t$ の $\psi(u)$ を求めよ。

<!-- solution-start -->
### 詳細解答

1.

$$
X_{s+t}
=
X_s+(X_{s+t}-X_s).
$$

二項は独立で、第二項は $X_t$ と同分布です。従って

$$
\begin{aligned}
\varphi_{s+t}(u)
&=
E[e^{iuX_s}]
E[e^{iu(X_{s+t}-X_s)}]\\
&=
\boxed{\varphi_s(u)\varphi_t(u)}.
\end{aligned}
$$

2. もしある $t>0$ で $\varphi_t(u)=0$ なら

$$
0
=
\varphi_t(u)
=
\varphi_{t/n}(u)^n.
$$

したがって全ての $n$ で

$$
\varphi_{t/n}(u)=0.
$$

しかし確率連続性から $X_{t/n}\to0$ 確率収束で であり、$e^{iuX_{t/n}}\to1$ 確率収束で です。絶対値は 1 なので期待値も 1 へ収束し、

$$
\varphi_{t/n}(u)\to1.
$$

矛盾です。

3. $t\mapsto\varphi_t(u)$ は 0 を通らない連続曲線で、$\varphi_0(u)=1$ です。原点から連続に対数を選び

$$
g(t)=\log\varphi_t(u)
$$

とします。

半群性から

$$
g(s+t)=g(s)+g(t).
$$

連続 Cauchy 方程式より

$$
g(t)=t g(1).
$$

したがって

$$
\boxed{
\varphi_t(u)=e^{t\psi(u)},
\qquad
\psi(u)=g(1).
}
$$

4.

$$
E[e^{iu(bt+\sigma B_t)}]
=
e^{iubt}
e^{-\frac12u^2\sigma^2t}.
$$

従って

$$
\boxed{
\psi(u)
=
ibu-\frac12\sigma^2u^2.
}
$$
<!-- solution-end -->

#### STO14-B02 stable 型小跳躍の閾値誤差
- Level: B
- 目安時間: 35分

$0<\alpha<2$ とし、$|z|\le1$ で

$$
\nu(dz)
=
c|z|^{-1-\alpha}dz
$$

とする。

$$
M_t^{(\varepsilon)}
=
\int_0^t\int_{\varepsilon<|z|\le1}
z\,\widetilde N(ds,dz)
$$

と置く。

$0<\delta<\varepsilon<1$ とする。

1. $E[|M_T^{(\delta)}-M_T^{(\varepsilon)}|^2]$ を求めよ。
2. 積分を明示的に計算せよ。
3. $\delta,\varepsilon\downarrow0$ で Cauchy になることを示せ。
4. Doob L2 最大評価で $[0,T]$ 上一様な二乗平均誤差を評価せよ。

<!-- solution-start -->
### 詳細解答

1. 等長性より

$$
E[|M_T^{(\delta)}-M_T^{(\varepsilon)}|^2]
=
T
\int_{\delta<|z|\le\varepsilon}
z^2\nu(dz).
$$

2. 対称性から

$$
\begin{aligned}
\int_{\delta<|z|\le\varepsilon}
z^2\nu(dz)
&=
2c\int_\delta^\varepsilon
z^{1-\alpha}dz\\
&=
\frac{2c}{2-\alpha}
\left(
\varepsilon^{2-\alpha}
-\delta^{2-\alpha}
\right).
\end{aligned}
$$

したがって

$$
\boxed{
E[|M_T^{(\delta)}-M_T^{(\varepsilon)}|^2]
=
\frac{2cT}{2-\alpha}
\left(
\varepsilon^{2-\alpha}
-\delta^{2-\alpha}
\right).
}
$$

3. $2-\alpha>0$ なので、$\delta,\varepsilon\downarrow0$ で右辺は 0 へ行きます。

従って閾値付き近似族は終端時刻の $L^2$ で Cauchy です。

4. 差は càdlàg 二乗可積分マルチンゲールなので

$$
\begin{aligned}
&E\left[
\sup_{0\le t\le T}
|M_t^{(\delta)}-M_t^{(\varepsilon)}|^2
\right]\\
&\le
4E[|M_T^{(\delta)}-M_T^{(\varepsilon)}|^2]\\
&=
\boxed{
\frac{8cT}{2-\alpha}
\left(
\varepsilon^{2-\alpha}
-\delta^{2-\alpha}
\right).
}
\end{aligned}
$$

従って過程全体でも Cauchy です。
<!-- solution-end -->

#### STO14-B03 Lévy 生成作用素を計算する
- Level: B
- 目安時間: 35分

Lévy 三つ組 が $(b,\sigma,\nu)$ で、$\nu$ は有限測度とする。

$$
Lf(x)
=
bf'(x)
+
\frac12\sigma^2f''(x)
+
\int
\left(
f(x+z)-f(x)-zf'(x)1_{\{|z|\le1\}}
\right)\nu(dz)
$$

とする。

1. $f(x)=x$ に対する $Lf(x)$ を求めよ。ただし $\int_{|z|>1}|z|\nu(dz)<\infty$ とする。
2. $f(x)=x^2$ に対する $Lf(x)$ を求めよ。ただし $\int z^2\nu(dz)<\infty$ とする。
3. $\nu$ が $|z|\le1$ に支持され対称なら結果を簡単化せよ。
4. $f(x)=e^{iux}$ に対して $Lf(x)=\psi(u)e^{iux}$ となることを確認せよ。

<!-- solution-start -->
### 詳細解答

1. $f'(x)=1$、$f''(x)=0$ なので

$$
\begin{aligned}
Lf(x)
&=
b+
\int
\left(
z-z1_{\{|z|\le1\}}
\right)\nu(dz)\\
&=
\boxed{
b+\int_{|z|>1}z\nu(dz).
}
\end{aligned}
$$

これは補正規約の下での平均ドリフトです。

2. $f'(x)=2x$、$f''(x)=2$ です。

また

$$
(x+z)^2-x^2-2xz1_{\{|z|\le1\}}
=
\begin{cases}
z^2,& |z|\le1,\\
2xz+z^2,& |z|>1.
\end{cases}
$$

したがって

$$
\boxed{
Lf(x)
=
2bx+\sigma^2
+
\int_{|z|\le1}z^2\nu(dz)
+
\int_{|z|>1}(2xz+z^2)\nu(dz).
}
$$

3. $\nu$ が $|z|\le1$ に支持され対称なら大跳躍項はなく、対称性により一次跳躍ドリフト もありません。

従って

$$
Lx=b,
$$

$$
\boxed{
L(x^2)
=
2bx+\sigma^2+\int z^2\nu(dz).
}
$$

4.

$$
f'(x)=iue^{iux},
\qquad
f''(x)=-u^2e^{iux}.
$$

また

$$
f(x+z)-f(x)
=
e^{iux}(e^{iuz}-1).
$$

従って

$$
\begin{aligned}
Lf(x)
&=
e^{iux}
\Biggl[
ibu-\frac12\sigma^2u^2\\
&\qquad+
\int
\left(
e^{iuz}-1-iuz1_{\{|z|\le1\}}
\right)\nu(dz)
\Biggr]\\
&=
\boxed{
\psi(u)e^{iux}.
}
\end{aligned}
$$
<!-- solution-end -->

#### STO14-C01 跳躍 Itô 公式から Lévy--Khintchine 指数を回収する
- Level: C
- 目安時間: 55分

$X$ を 三つ組 $(b,\sigma,\nu)$ を持つ Lévy 過程とする。

$$
f_u(x)=e^{iux}
$$

を考える。

必要なら局所化して [跳躍 Itô 公式](#thm-sto14-jump-ito)を使ってよい。

1. $f_u'(x)$、$f_u''(x)$ を求めよ。
2. [跳躍 Itô 公式](#thm-sto14-jump-ito)へ代入し、有限変動部分をまとめよ。
3. 有限変動係数が
   $$
   \psi(u)
   =
   ibu-\frac12\sigma^2u^2
   +
   \int
   \left(
   e^{iuz}-1-iuz1_{\{|z|\le1\}}
   \right)\nu(dz)
   $$
   になることを示せ。
4.
   $$
   M_t
   =
   e^{iuX_t}
   -
   1
   -
   \int_0^t
   \psi(u)e^{iuX_{s-}}ds
   $$
   がマルチンゲールであることを説明せよ。
5. $m(t)=E[e^{iuX_t}]$ が
   $$
   m(t)=1+\int_0^t\psi(u)m(s)ds
   $$
   を満たすことを導き、
   $$
   m(t)=e^{t\psi(u)}
   $$
   を得よ。

<!-- solution-start -->
### 詳細解答

1.

$$
f_u'(x)
=
iue^{iux},
$$

$$
f_u''(x)
=
-u^2e^{iux}.
$$

2. [跳躍 Itô 公式](#thm-sto14-jump-ito)のドリフトと連続二次変分部分は

$$
e^{iuX_{s-}}
\left(
ibu-\frac12\sigma^2u^2
\right)ds.
$$

小 jump の補償ドリフト は

$$
\begin{aligned}
&\int_{|z|\le1}
\left[
e^{iu(X_{s-}+z)}
-e^{iuX_{s-}}
-iuz e^{iuX_{s-}}
\right]\nu(dz)ds\\
&=
e^{iuX_{s-}}
\int_{|z|\le1}
(e^{iuz}-1-iuz)\nu(dz)ds.
\end{aligned}
$$

大跳躍項を補償部分とマルチンゲール部分へ分けると、その drift は

$$
e^{iuX_{s-}}
\int_{|z|>1}
(e^{iuz}-1)\nu(dz)ds.
$$

3. 以上を合わせると有限変動部分は

$$
e^{iuX_{s-}}\psi(u)ds
$$

で、

$$
\boxed{
\psi(u)
=
ibu-\frac12\sigma^2u^2
+
\int
\left(
e^{iuz}-1-iuz1_{\{|z|\le1\}}
\right)\nu(dz).
}
$$

4. 残る ブラウン確率積分、小 jump の補償 Poisson 積分、大 jump を補償した有限強度 Poisson 積分は、局所化後にすべてマルチンゲールです。

したがって

$$
\boxed{
M_t
=
e^{iuX_t}
-
1
-
\int_0^t
\psi(u)e^{iuX_{s-}}ds
}
$$

はマルチンゲールです。

5. 期待値を取ると $E[M_t]=0$ なので

$$
m(t)
=
1+
\int_0^t
\psi(u)E[e^{iuX_{s-}}]ds.
$$

固定時刻 $s$ では Lévy 過程は確率的に固定時刻で跳躍しません。実際 $h\downarrow0$ で

$$
X_s-X_{s-h}
\to0
\qquad\text{確率収束で}
$$

であり、càdlàg 性から左辺はほとんど確実に $X_s-X_{s-}=\Delta X_s$ へ収束します。

任意の $\eta>0$ について
$$
\begin{aligned}
P(|\Delta X_s|>\eta)
&\le
P\left(
|\Delta X_s-(X_s-X_{s-h})|>\frac\eta2
\right)\\
&\quad+
P\left(
|X_s-X_{s-h}|>\frac\eta2
\right).
\end{aligned}
$$
第一項はほとんど確実収束から 0 へ、第二項は確率連続性から 0 へ収束します。従って
$$
P(|\Delta X_s|>\eta)=0.
$$
$\eta>0$ は任意なので
$$
P(\Delta X_s\neq0)=0.
$$

従って

よって

$$
E[e^{iuX_{s-}}]
=
E[e^{iuX_s}]
=
m(s).
$$

したがって

$$
m(t)
=
1+\int_0^t\psi(u)m(s)ds.
$$

これは

$$
m'(t)=\psi(u)m(t),
\qquad
m(0)=1
$$

の積分形です。

従って

$$
\boxed{
E[e^{iuX_t}]
=
m(t)
=
e^{t\psi(u)}.
}
$$

これにより、[跳躍 Itô 公式](#thm-sto14-jump-ito)から Lévy--Khintchine 指数と特性関数半群を逆向きに回収できました。
<!-- solution-end -->

---

## 17. まとめ

本章の核心は次の 6 本です。

複合 Poisson 過程では

$$
\boxed{
E[e^{iuX_t}]
=
\exp\{\lambda t(\widehat\mu(u)-1)\}.
}
$$

Lévy 過程の各時刻分布は

$$
\boxed{
\text{無限分解可能}
}
$$

です。

その特性関数は

$$
\boxed{
E[e^{iuX_t}]
=
e^{t\psi(u)}.
}
$$

Lévy--Khintchine の公式は

$$
\boxed{
\psi(u)
=
ibu-\frac12\sigma^2u^2
+
\int
\left(
e^{iuz}-1-iuz1_{\{|z|\le1\}}
\right)\nu(dz).
}
$$

小跳躍は

$$
\boxed{
\int_{|z|\le1}z\,\widetilde N(ds,dz)
=
L^2\text{ 閾値極限}
}
$$

として構成されます。

そして Lévy--Itô 分解は

$$
\boxed{
\text{ドリフト}
+
\text{ブラウン運動}
+
\text{補償小跳躍}
+
\text{大跳躍}
}
$$

です。

[跳躍 Itô 公式](#thm-sto14-jump-ito)により、連続確率解析の

$$
\text{二次変分}
$$

と、跳躍型確率解析の

$$
\text{有限差分補正}
$$

が一つの連鎖律へ統合されました。

これで Encore IV の確率解析主線 STO1--STO14 は、filtration から Lévy / 跳躍型確率解析 まで一巡します。

次は時系列枝 TSA1「定常過程・Hilbert 予測」へ進めます。
