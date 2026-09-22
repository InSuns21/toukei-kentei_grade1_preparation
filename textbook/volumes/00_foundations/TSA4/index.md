# TSA4 Encore IV 時系列解析 IV：線形フィルタ・ARMA / ARIMA・周波数領域

<!-- definition-example-audit: strict -->

TSA3 では、二次定常過程を [周波数領域の確率積分表示](../TSA3/index.md#thm-tsa3-spectral-representation)

$$
X_t=\int_{\mathbb T}e^{it\lambda}Z(d\lambda)
$$

で表し、自己共分散とスペクトル測度が Fourier 変換の関係にあることを示しました。本章では、この表現へ**時間方向の線形演算**を作用させます。

中心となる考えは単純です。時間領域で

$$
Y_t=\sum_j h_jX_{t-j}
$$

と重み付き和を取ると、周波数領域では

$$
dF_Y(\lambda)
=
|H(\lambda)|^2\,dF_X(\lambda)
$$

と、周波数ごとに振幅を掛ける操作になります。ここで $H$ はフィルタ係数 $(h_j)$ の Fourier 級数です。

この一本の対応から、ARMA の因果表現・駆動雑音の復元条件、スペクトル密度、ARIMA の差分、季節差分、自己相関関数と偏自己相関関数の切れ方までを一つの言葉で整理します。

---

## 1. 後退作用素と線形フィルタ

<a id="def-tsa4-backshift"></a>

<!-- formal-statement-start -->
> **定義（後退作用素）**  
> 両側時系列 $(X_t)_{t\in\mathbb Z}$ に対して、後退作用素 $B$ を
>
> $$
> BX_t:=X_{t-1}
> $$
>
> で定義します。従って $B^jX_t=X_{t-j}$ です。
<!-- formal-statement-end -->

<!-- definition-example-start: def-tsa4-backshift -->
**定義の確認**  
例えば $B^2X_t=X_{t-2}$ です。また多項式 $a(z)=1-2z+z^2$ に対して

$$
a(B)X_t
=
X_t-2X_{t-1}+X_{t-2}.
$$

後退作用素の多項式は、時間シフトの有限線形結合そのものです。
<!-- definition-example-end -->

後退作用素を使うと、有限個の係数 $a_0,\dots,a_m$ による線形結合は

$$
a(B)X_t
:=
\sum_{j=0}^m a_jB^jX_t
=
\sum_{j=0}^m a_jX_{t-j}
$$

と書けます。

### 1.1 例：一階差分

$$
\Delta X_t
:=
X_t-X_{t-1}
=
(1-B)X_t.
$$

したがって差分は特別な線形フィルタです。

<a id="def-tsa4-linear-timeseries-operation"></a>

<!-- formal-statement-start -->
> **定義（絶対可算和可能な線形フィルタ）**  
> $(X_t)$ を $E|X_t|^2<\infty$ を満たす二次定常過程とし、複素係数列 $(h_j)_{j\in\mathbb Z}$ が
>
> $$
> \sum_{j\in\mathbb Z}|h_j|<\infty
> $$
>
> を満たすとします。このとき
>
> $$
> Y_t
> :=
> L^2\text{-}\sum_{j\in\mathbb Z}h_jX_{t-j}
> $$
>
> を $(h_j)$ による線形フィルタの出力と呼びます。
<!-- formal-statement-end -->

<!-- definition-example-start: def-tsa4-linear-timeseries-operation -->
**定義の確認**  
一階差分は $h_0=1,h_1=-1$、他は 0 の線形フィルタです。係数の絶対和は

$$
\sum_j|h_j|=2<\infty
$$

なので、この定義に含まれます。有限フィルタは自動的に絶対可算和可能です。
<!-- definition-example-end -->

### 1.2 なぜ $L^2$ 極限が存在するか

二次定常性から $\|X_{t-j}\|_2=\|X_0\|_2$ です。有限集合 $J$ に対して

$$
\left\|
\sum_{j\in J}h_jX_{t-j}
\right\|_2
\le
\sum_{j\in J}|h_j|\,\|X_0\|_2.
$$

従って係数が絶対可算和可能なら有限打切り列は $L^2$ Cauchy 列です。$L^2$ の完備性により極限が存在します。

<a id="prop-tsa4-linear-stationary"></a>

<!-- formal-statement-start -->
> **命題（線形フィルタは二次定常性を保つ）**  
> $(X_t)$ を平均 $\mu$、自己共分散 $\gamma_X$ を持つ二次定常過程とし、$(h_j)$ を絶対可算和可能とします。上の線形フィルタ出力 $(Y_t)$ は二次定常であり、
>
> $$
> E[Y_t]
> =
> \mu\sum_jh_j
> $$
>
> および
>
> $$
> \boxed{
> \gamma_Y(k)
> =
> \sum_{j,\ell}
> h_j\overline{h_\ell}\,
> \gamma_X(k-j+\ell)
> }
> $$
>
> を満たします。二重級数は絶対収束します。
<!-- formal-statement-end -->

<!-- proof-start -->
### 証明

平均については $L^2$ 収束から $L^1$ 収束も従うので期待値を極限と交換でき、

$$
E[Y_t]
=
\sum_j h_jE[X_{t-j}]
=
\mu\sum_jh_j
$$

です。

共分散では中心化してよいので $E[X_t]=0$ とします。有限打切り

$$
Y_t^{(N)}
=
\sum_{|j|\le N}h_jX_{t-j}
$$

を考えると

$$
E[
Y_{t+k}^{(N)}
\overline{Y_t^{(M)}}
]
=
\sum_{|j|\le N}
\sum_{|\ell|\le M}
h_j\overline{h_\ell}
\gamma_X(k-j+\ell).
$$

[TSA1 の自己共分散の有界性](../TSA1/index.md#prop-tsa1-covariance-kernel)から

$$
|\gamma_X(r)|
\le
\gamma_X(0)
$$

なので、

$$
\sum_{j,\ell}
|h_j|\,|h_\ell|\,|\gamma_X(k-j+\ell)|
\le
\gamma_X(0)
\left(\sum_j|h_j|\right)^2
<
\infty.
$$

従って二重級数は絶対収束し、$N,M\to\infty$ を送れます。また右辺は $t$ に依存しません。よって $(Y_t)$ は二次定常で、表示式が従います。$\square$
<!-- proof-end -->

---

## 2. 伝達関数：時間方向の係数合成を周波数の積へ移す

<a id="def-tsa4-transfer-function"></a>

<!-- formal-statement-start -->
> **定義（伝達関数）**  
> 絶対可算和可能なフィルタ係数 $(h_j)$ に対して
>
> $$
> \boxed{
> H(\lambda)
> :=
> \sum_{j\in\mathbb Z}
> h_je^{-ij\lambda},
> \qquad
> \lambda\in\mathbb T
> }
> $$
>
> を伝達関数（transfer function）と呼びます。
<!-- formal-statement-end -->

絶対可算和可能性から、この Fourier 級数は一様絶対収束するので $H$ は連続です。

### 2.1 例：二点移動平均

$$
Y_t
=
\frac12X_t+\frac12X_{t-1}
$$

では

$$
H(\lambda)
=
\frac12(1+e^{-i\lambda})
=
e^{-i\lambda/2}\cos\frac{\lambda}{2}.
$$

したがって利得は

$$
|H(\lambda)|^2
=
\cos^2\frac{\lambda}{2}.
$$

$\lambda=\pi$ では 0 なので、符号が一時点ごとに交互に変わる最高周波数成分を完全に消します。

<!-- definition-example-start: def-tsa4-transfer-function -->
**定義の確認**  
係数は $h_0=h_1=1/2$、他は 0 なので確かに $\sum_j|h_j|=1$ です。定義通り Fourier 級数を作れば上の $H$ になり、時間領域の単純平均が周波数依存の減衰へ変換されます。
<!-- definition-example-end -->

<a id="thm-tsa4-frequency-transform"></a>

<!-- formal-statement-start -->
> **定理（線形フィルタによるスペクトル測度の変換）**  
> 平均0の二次定常過程 $(X_t)$ がスペクトル測度 $F_X$ を持ち、
>
> $$
> Y_t
> =
> L^2\text{-}\sum_jh_jX_{t-j},
> \qquad
> \sum_j|h_j|<\infty
> $$
>
> とします。伝達関数を
>
> $$
> H(\lambda)=\sum_jh_je^{-ij\lambda}
> $$
>
> とすると、$(Y_t)$ のスペクトル測度は
>
> $$
> \boxed{
> F_Y(d\lambda)
> =
> |H(\lambda)|^2F_X(d\lambda)
> }
> $$
>
> です。特に $F_X(d\lambda)=f_X(\lambda)d\lambda$ なら
>
> $$
> \boxed{
> f_Y(\lambda)
> =
> |H(\lambda)|^2f_X(\lambda)
> }.
> $$
<!-- formal-statement-end -->

### 証明の見取り図

TSA3 の [スペクトル表現定理](../TSA3/index.md#thm-tsa3-spectral-representation)へフィルタを代入します。絶対可算和可能性により有限打切りから $L^2$ 極限へ進めるので、時間シフト $X_{t-j}$ に付く因子 $e^{-ij\lambda}$ がそのまま $H(\lambda)$ にまとまります。

<!-- proof-start -->
### 証明

TSA3 より

$$
X_t
=
\int_{\mathbb T}e^{it\lambda}Z(d\lambda)
$$

と書けます。有限打切りでは

$$
\begin{aligned}
\sum_{|j|\le N}h_jX_{t-j}
&=
\sum_{|j|\le N}
h_j
\int e^{i(t-j)\lambda}Z(d\lambda)\\
&=
\int e^{it\lambda}
\left(
\sum_{|j|\le N}h_je^{-ij\lambda}
\right)
Z(d\lambda).
\end{aligned}
$$

部分伝達関数を $H_N$ とすると、絶対可算和可能性から $H_N\to H$ 一様です。TSA3 の [スペクトル確率積分](../TSA3/index.md#def-tsa3-spectral-integral)の等長性により

$$
E\left|
\int e^{it\lambda}(H_N-H)Z(d\lambda)
\right|^2
=
\int|H_N-H|^2\,F_X(d\lambda)
\to0.
$$

従って

$$
Y_t
=
\int e^{it\lambda}H(\lambda)Z(d\lambda).
$$

よって自己共分散は

$$
\begin{aligned}
\gamma_Y(k)
&=
E[Y_{t+k}\overline{Y_t}]\\
&=
\int
e^{ik\lambda}
|H(\lambda)|^2
F_X(d\lambda).
\end{aligned}
$$

Herglotz 表現の一意性により

$$
F_Y(d\lambda)
=
|H(\lambda)|^2F_X(d\lambda).
$$

密度を持つ場合は Radon--Nikodym 密度を比較すれば

$$
f_Y
=
|H|^2f_X
$$

です。$\square$
<!-- proof-end -->

この定理が本章の中心です。以後、ARMA も差分も「どの $H$ を掛けているか」を見れば周波数領域の挙動が読めます。

---

## 3. 因果フィルタと逆フィルタ

<a id="def-tsa4-causal-linear-operation"></a>

<!-- formal-statement-start -->
> **定義（因果線形フィルタ）**  
> 線形フィルタ
>
> $$
> Y_t=\sum_{j\in\mathbb Z}h_jX_{t-j}
> $$
>
> が因果的であるとは
>
> $$
> h_j=0
> \qquad(j<0)
> $$
>
> であることです。従って $Y_t$ は現在と過去の $X_t,X_{t-1},\dots$ だけから作られます。
<!-- formal-statement-end -->

<!-- definition-example-start: def-tsa4-causal-linear-operation -->
**定義の確認**  
$Y_t=X_t+\frac12X_{t-1}+\frac14X_{t-2}+\cdots$ では $h_j=2^{-j}$ $(j\ge0)$、$h_j=0$ $(j<0)$ です。従って

$$
\sum_{j\ge0}|h_j|=2
$$

で、現在と過去だけを使う因果フィルタです。
<!-- definition-example-end -->

<a id="def-tsa4-causal-inverse-operation"></a>

<!-- formal-statement-start -->
> **定義（絶対可算和可能な逆フィルタ）**  
> 因果フィルタ
>
> $$
> Y_t=\sum_{j\ge0}h_jX_{t-j}
> $$
>
> に対し、絶対可算和可能な係数 $(g_j)_{j\ge0}$ が存在して
>
> $$
> X_t
> =
> \sum_{j\ge0}g_jY_{t-j}
> $$
>
> と復元できるとき、そのフィルタは因果的に可逆であるといいます。
<!-- formal-statement-end -->

<!-- definition-example-start: def-tsa4-causal-inverse-operation -->
**定義の確認**  
$Y_t=X_t+\theta X_{t-1}$、$|\theta|<1$ なら

$$
X_t
=
Y_t-\theta Y_{t-1}+\theta^2Y_{t-2}-\cdots.
$$

逆フィルタ係数は $g_j=(-\theta)^j$ であり、

$$
\sum_{j\ge0}|g_j|
=
\frac1{1-|\theta|}
<
\infty.
$$

従ってこの有限移動平均フィルタは因果的に可逆です。
<!-- definition-example-end -->

多項式やべき級数では、係数列の合成は積になるため

$$
H(z)=\sum_{j\ge0}h_jz^j,
\qquad
G(z)=\sum_{j\ge0}g_jz^j
$$

に対して

$$
G(z)H(z)=1
$$

が逆フィルタの条件です。

---

## 4. ARMA を多項式で書く

<a id="def-tsa4-arma"></a>

<!-- formal-statement-start -->
> **定義（ARMA 過程）**  
> $(Z_t)$ を平均0、分散 $\sigma^2>0$ の弱ホワイトノイズとします。
>
> $$
> \phi(z)
> =
> 1-\phi_1z-\cdots-\phi_pz^p,
> $$
>
> $$
> \theta(z)
> =
> 1+\theta_1z+\cdots+\theta_qz^q
> $$
>
> と置きます。二次定常過程 $(X_t)$ が
>
> $$
> \boxed{
> \phi(B)X_t
> =
> \theta(B)Z_t
> }
> $$
>
> を満たすとき、$(X_t)$ を ARMA$(p,q)$ 過程と呼びます。
<!-- formal-statement-end -->

ここでは $\phi_0=\theta_0=1$ に規格化しています。

### 4.1 例：AR(1)

<!-- definition-example-start: def-tsa4-arma -->
**定義の確認**  
AR(1)

$$
X_t=\phi X_{t-1}+Z_t
$$

は

$$
(1-\phi B)X_t=Z_t
$$

です。

$|\phi|<1$ なら

$$
\frac1{1-\phi z}
=
\sum_{j=0}^{\infty}\phi^jz^j
$$

が $|z|\le1$ で絶対収束し、

$$
X_t
=
\sum_{j=0}^{\infty}\phi^jZ_{t-j}.
$$

これは TSA2 で確認した Wold 表示と一致します。
<!-- definition-example-end -->

---

## 5. 根条件はなぜ因果性を表すのか

<a id="thm-tsa4-polynomial-inverse"></a>

<!-- formal-statement-start -->
> **定理（単位円外の零点と絶対可算和可能な逆べき級数）**  
> 多項式 $a(z)$ が $a(0)=1$ を満たすとします。次が同値です。
>
> 1. 任意の $|z|\le1$ に対して $a(z)\neq0$。
> 2. ある $r>1$ と係数列 $(c_j)_{j\ge0}$ が存在して
>
>    $$
>    \frac1{a(z)}
>    =
>    \sum_{j=0}^{\infty}c_jz^j
>    \qquad(|z|<r),
>    $$
>
>    かつ
>
>    $$
>    \sum_{j=0}^{\infty}|c_j|<\infty
>    $$
>
>    となる。
<!-- formal-statement-end -->

<!-- proof-start -->
### 証明

まず 1 を仮定します。$a(0)=1$ なので 0 は零点ではありません。複素数体上で

$$
a(z)
=
\prod_{\nu=1}^m
\left(1-\frac{z}{r_\nu}\right)^{m_\nu}
$$

と因数分解できます。仮定より全ての零点は

$$
|r_\nu|>1.
$$

各因子について

$$
\left(1-\frac{z}{r_\nu}\right)^{-m_\nu}
=
\sum_{n=0}^{\infty}
\binom{n+m_\nu-1}{m_\nu-1}
r_\nu^{-n}z^n.
$$

係数は多項式次数 $m_\nu-1$ の増加しか持たず、$|r_\nu|^{-n}$ は指数減衰するので絶対可算和可能です。有限個の絶対可算和可能列を係数合成して得る列も絶対可算和可能です。従って $1/a(z)$ の係数列 $(c_j)$ は

$$
\sum_j|c_j|<\infty
$$

を満たします。

逆に 2 を仮定します。べき級数

$$
g(z)=\sum_{j\ge0}c_jz^j
$$

は少なくとも $|z|<r$ で収束し、

$$
a(z)g(z)=1
$$

です。もし $|z_0|\le1$ で $a(z_0)=0$ なら、$|z_0|<r$ なので左辺は 0、右辺は 1 となり矛盾します。従って単位円閉円板に零点はありません。$\square$
<!-- proof-end -->

<a id="thm-tsa4-arma-causality"></a>

<!-- formal-statement-start -->
> **定理（ARMA の因果性）**  
> ARMA$(p,q)$ 方程式
>
> $$
> \phi(B)X_t=\theta(B)Z_t
> $$
>
> において
>
> $$
> \phi(z)\neq0
> \qquad(|z|\le1)
> $$
>
> とします。このとき
>
> $$
> \frac{\theta(z)}{\phi(z)}
> =
> \sum_{j=0}^{\infty}\psi_jz^j
> $$
>
> の係数は絶対可算和可能であり、
>
> $$
> \boxed{
> X_t
> =
> \sum_{j=0}^{\infty}\psi_jZ_{t-j}
> }
> $$
>
> が $L^2$ で成立します。従って解は駆動ホワイトノイズの現在・過去だけから作られる因果解です。
<!-- formal-statement-end -->

<!-- proof-start -->
### 証明

[単位円外の零点と逆べき級数](index.md#thm-tsa4-polynomial-inverse)より

$$
\frac1{\phi(z)}
=
\sum_{j\ge0}a_jz^j,
\qquad
\sum_j|a_j|<\infty.
$$

$\theta$ は有限次数多項式なので

$$
\frac{\theta(z)}{\phi(z)}
=
\theta(z)\sum_{j\ge0}a_jz^j
=
\sum_{j\ge0}\psi_jz^j
$$

の係数 $(\psi_j)$ も有限個のシフト付き和であり、絶対可算和可能です。

したがって

$$
X_t
:=
\sum_{j\ge0}\psi_jZ_{t-j}
$$

は $L^2$ で定義できます。絶対可算和可能な係数列の合成則から

$$
\phi(B)X_t
=
\theta(B)Z_t
$$

が成立します。$\square$
さらに、このクラスで因果解は一意です。実際、二つの因果解の差 $D_t$ は $\phi(B)D_t=0$ を満たします。絶対可算和可能な逆フィルタ $1/\phi(B)$ を作用させると $D_t=0$ です。

<!-- proof-end -->

<a id="thm-tsa4-arma-invertibility"></a>

<!-- formal-statement-start -->
> **定理（ARMA の可逆性）**  
> 因果 ARMA$(p,q)$ 過程が
>
> $$
> \theta(z)\neq0
> \qquad(|z|\le1)
> $$
>
> を満たすとします。このとき
>
> $$
> \frac{\phi(z)}{\theta(z)}
> =
> \sum_{j=0}^{\infty}\pi_jz^j,
> \qquad
> \sum_{j\ge0}|\pi_j|<\infty,
> $$
>
> かつ
>
> $$
> \boxed{
> Z_t
> =
> \sum_{j=0}^{\infty}\pi_jX_{t-j}
> }.
> $$
>
> 従って駆動ホワイトノイズは観測系列の現在・過去から復元できます。
<!-- formal-statement-end -->

<!-- proof-start -->
### 証明

仮定より $\theta(z)$ は閉単位円板上で零点を持ちません。[単位円外の零点と絶対可算和可能な逆べき級数](index.md#thm-tsa4-polynomial-inverse)を $a=\theta$ に適用すると、

$$
\frac1{\theta(z)}
=
\sum_{j=0}^{\infty}b_jz^j,
\qquad
\sum_{j\ge0}|b_j|<\infty.
$$

$\phi$ は有限次数多項式なので

$$
\frac{\phi(z)}{\theta(z)}
=
\phi(z)\sum_{j\ge0}b_jz^j
=
\sum_{j=0}^{\infty}\pi_jz^j
$$

の係数 $(\pi_j)$ も絶対可算和可能です。

ARMA 方程式

$$
\phi(B)X_t=\theta(B)Z_t
$$

の両辺へ因果逆フィルタ $1/\theta(B)$ を作用させます。絶対可算和可能な係数列どうしを合成しても絶対可算和可能であり、$L^2$ で和の結合を正当化できるので

$$
Z_t
=
\frac{\phi(B)}{\theta(B)}X_t
=
\sum_{j=0}^{\infty}\pi_jX_{t-j}.
$$

これで駆動雑音が観測系列の現在と過去から復元されました。$\square$
<!-- proof-end -->

### 5.1 因果性と駆動雑音の復元条件は別条件

ARMA では

- $\phi$ の零点条件が因果性、
- $\theta$ の零点条件が駆動雑音を過去の観測から復元できる条件

を支配します。

例えば MA(1)

$$
X_t=Z_t+\theta Z_{t-1}
$$

は常に有限和として因果的ですが、逆表示

$$
Z_t
=
X_t-\theta X_{t-1}+\theta^2X_{t-2}-\cdots
$$

が安定に成立するには $|\theta|<1$、すなわち $\theta(z)=1+\theta z$ の零点 $-1/\theta$ が単位円外にあることが必要です。

### 5.2 共通因子と識別可能性

$\phi$ と $\theta$ が共通因子 $c$ を持つと

$$
\frac{\theta(z)}{\phi(z)}
=
\frac{\theta(z)/c(z)}{\phi(z)/c(z)}
$$

なので、同じ入出力関係をより低次数で表せます。

<a id="def-tsa4-coprime-arma"></a>

<!-- formal-statement-start -->
> **定義（既約 ARMA 表現）**  
> ARMA 多項式 $\phi,\theta$ が非定数の共通因子を持たないとき、その ARMA 表現を既約と呼びます。
<!-- formal-statement-end -->

<!-- definition-example-start: def-tsa4-coprime-arma -->
**定義の確認**  
例えば

$$
\phi(z)=1-0.5z,
\qquad
\theta(z)=1+0.3z
$$

は零点が異なるので共通の非定数因子を持たず、既約です。一方

$$
\phi(z)=\theta(z)=1-0.5z
$$

は同じ因子を持ち、比 $\theta/\phi=1$ まで相殺されるので既約ではありません。
<!-- definition-example-end -->

因果性と駆動雑音の復元可能性だけでは次数の一意性は保証されません。既約性が「余分な AR と MA を相殺していない」ことを保証します。

---

## 6. ARMA のスペクトル密度

<a id="thm-tsa4-arma-frequency-density"></a>

<!-- formal-statement-start -->
> **定理（因果 ARMA のスペクトル密度）**  
> $(Z_t)$ を分散 $\sigma^2$ の弱ホワイトノイズとし、因果 ARMA$(p,q)$
>
> $$
> \phi(B)X_t=\theta(B)Z_t
> $$
>
> を考えます。$\phi(z)\neq0$ for $|z|\le1$ とすると、$(X_t)$ はスペクトル密度
>
> $$
> \boxed{
> f_X(\lambda)
> =
> \frac{\sigma^2}{2\pi}
> \frac{
> |\theta(e^{-i\lambda})|^2
> }{
> |\phi(e^{-i\lambda})|^2
> }
> }
> $$
>
> を持ちます。
<!-- formal-statement-end -->

<!-- proof-start -->
### 証明

[TSA3 の弱ホワイトノイズのスペクトル密度](../TSA3/index.md#def-tsa3-spectral-density)は

$$
f_Z(\lambda)
=
\frac{\sigma^2}{2\pi}.
$$

ARMA の因果表現の伝達関数は

$$
H(\lambda)
=
\frac{\theta(e^{-i\lambda})}{\phi(e^{-i\lambda})}.
$$

[線形フィルタによるスペクトル測度の変換](index.md#thm-tsa4-frequency-transform)を適用すると

$$
f_X(\lambda)
=
|H(\lambda)|^2f_Z(\lambda)
=
\frac{\sigma^2}{2\pi}
\frac{
|\theta(e^{-i\lambda})|^2
}{
|\phi(e^{-i\lambda})|^2
}.
$$

$\square$
<!-- proof-end -->

### 6.1 AR(1) の山はどこに立つか

$$
X_t=\phi X_{t-1}+Z_t,
\qquad
|\phi|<1
$$

なら

$$
f_X(\lambda)
=
\frac{\sigma^2}{2\pi}
\frac1{|1-\phi e^{-i\lambda}|^2}
=
\frac{\sigma^2}{2\pi}
\frac1{1+\phi^2-2\phi\cos\lambda}.
$$

- $\phi>0$ では $\lambda=0$ 付近が大きく、ゆっくり変動する低周波成分が強い。
- $\phi<0$ では $\lambda=\pi$ 付近が大きく、符号が交互に変わる高周波成分が強い。

これは時間領域で

$$
\rho(h)=\phi^{|h|}
$$

となる事実の周波数側の姿です。

---

## 7. 自己相関関数と偏自己相関関数

自己相関関数は

$$
\rho(h)
=
\frac{\gamma(h)}{\gamma(0)}
$$

です。

偏自己相関は「中間のラグを線形予測で取り除いた後に残る端点間の線形関係」を表します。

<a id="def-tsa4-pacf"></a>

<!-- formal-statement-start -->
> **定義（偏自己相関関数）**  
> 平均0の二次定常過程について、各 $k\ge1$ で
>
> $$
> P_{\operatorname{span}\{X_{t-1},\dots,X_{t-k}\}}X_t
> =
> \sum_{j=1}^{k}a_{k,j}X_{t-j}
> $$
>
> とします。対応する分散共分散行列が正定値で係数が一意に定まるとき、
>
> $$
> \boxed{
> \alpha(k):=a_{k,k}
> }
> $$
>
> をラグ $k$ の偏自己相関と呼びます。
<!-- formal-statement-end -->

<!-- definition-example-start: def-tsa4-pacf -->
**定義の確認**  
AR(1) $X_t=\phi X_{t-1}+Z_t$ で $Z_t$ が標準イノベーションなら、一段の射影は

$$
P_{\operatorname{span}\{X_{t-1}\}}X_t
=
\phi X_{t-1}.
$$

従って定義から $\alpha(1)=\phi$ です。後で示す命題により $\alpha(k)=0$ $(k\ge2)$ となります。
<!-- definition-example-end -->

これは TSA1 の [有限過去の正規方程式](../TSA1/index.md#thm-tsa1-finite-normal-equations)の最後の係数です。

<a id="prop-tsa4-acf-pacf-cutoff"></a>

<!-- formal-statement-start -->
> **命題（MA の自己相関打切りと AR の偏自己相関打切り）**  
> 1. MA$(q)$
>
>    $$
>    X_t=\sum_{j=0}^{q}\theta_jZ_{t-j},
>    \qquad
>    \theta_0=1
>    $$
>
>    では $\gamma(h)=0$ for $|h|>q$。従って自己相関関数も $q$ より先で 0 です。
> 2. 因果 AR$(p)$
>
>    $$
>    X_t=\phi_1X_{t-1}+\cdots+\phi_pX_{t-p}+Z_t
>    $$
>
>    で $Z_t$ が標準イノベーション、有限過去の分散共分散行列が正定値とします。このとき
>
>    $$
>    \alpha(k)=0
>    \qquad(k>p).
>    $$
>
>    さらに $\phi_p\neq0$ なら $\alpha(p)=\phi_p$。
<!-- formal-statement-end -->

<!-- proof-start -->
### 証明

1. $h>q$ とします。$X_{t+h}$ は

   $$
   Z_{t+h},\dots,Z_{t+h-q}
   $$

   の線形結合で、$X_t$ は

   $$
   Z_t,\dots,Z_{t-q}
   $$

   の線形結合です。$h>q$ なら二つの添字集合は交わりません。弱ホワイトノイズの異時点共分散は 0 なので

   $$
   \gamma(h)=E[X_{t+h}X_t]=0.
   $$

   偶対称性から $h<-q$ でも 0 です。

2. $k\ge p$ とします。AR 方程式より

   $$
   X_t
   =
   \phi_1X_{t-1}
   +\cdots+
   \phi_pX_{t-p}
   +Z_t.
   $$

   $Z_t$ は標準イノベーションなので、[過去空間](../TSA1/index.md#def-tsa1-past-space)全体に直交します。特に

   $$
   Z_t
   \perp
   \operatorname{span}
   \{X_{t-1},\dots,X_{t-k}\}.
   $$

   従って上式の最初の $p$ 項が $X_t$ のこの有限過去空間への直交射影です。係数の一意性より

   $$
   a_{k,j}
   =
   \begin{cases}
   \phi_j,&1\le j\le p,\\
   0,&p<j\le k.
   \end{cases}
   $$

   よって $k>p$ なら $a_{k,k}=0$、$k=p$ なら $a_{p,p}=\phi_p$ です。$\square$
<!-- proof-end -->

この「MA は ACF が切れ、AR は PACF が切れる」という判別則は、有限次数モデル特有の時間領域の指紋です。一方、周波数領域では同じモデルが有理関数

$$
\frac{|\theta(e^{-i\lambda})|^2}
{|\phi(e^{-i\lambda})|^2}
$$

として見えます。

---

## 8. 差分と ARIMA

定常 ARMA は平均・自己共分散が時間に依存しないモデルです。しかしトレンドを持つ系列はそのままでは二次定常でないことがあります。

<a id="def-tsa4-difference"></a>

<!-- formal-statement-start -->
> **定義（通常差分と季節差分）**  
> 通常差分作用素と周期 $s\ge2$ の季節差分作用素を
>
> $$
> \Delta:=1-B,
> \qquad
> \Delta_s:=1-B^s
> $$
>
> と定義します。従って
>
> $$
> \Delta X_t=X_t-X_{t-1},
> $$
>
> $$
> \Delta_sX_t=X_t-X_{t-s}.
> $$
<!-- formal-statement-end -->

<!-- definition-example-start: def-tsa4-difference -->
**定義の確認**  
線形トレンド $X_t=a+bt$ に通常差分を作用させると

$$
\Delta X_t
=
[a+bt]-[a+b(t-1)]
=
b.
$$

一次の決定論的トレンドは一回差分で定数へ落ちます。
<!-- definition-example-end -->

<a id="def-tsa4-arima"></a>

<!-- formal-statement-start -->
> **定義（ARIMA 過程）**  
> 整数 $d\ge0$ に対し
>
> $$
> Y_t:=\Delta^dX_t
> $$
>
> が因果 ARMA$(p,q)$
>
> $$
> \phi(B)Y_t=\theta(B)Z_t
> $$
>
> となるとき、$(X_t)$ を ARIMA$(p,d,q)$ 過程と呼びます。
<!-- formal-statement-end -->

<!-- definition-example-start: def-tsa4-arima -->
**定義の確認**  
ランダムウォーク

$$
X_t=X_{t-1}+Z_t
$$

では

$$
\Delta X_t=Z_t.
$$

差分後は ARMA$(0,0)$、すなわち弱ホワイトノイズなので、$X$ は ARIMA$(0,1,0)$ の基本例です。
<!-- definition-example-end -->

重要なのは、$d>0$ のとき **$X_t$ 自身が通常の二次定常過程とは限らない**ことです。従って TSA3 の意味でのスペクトル密度を $X$ へそのまま割り当ててはいけません。スペクトル密度を持つのは定常化された

$$
Y_t=\Delta^dX_t
$$

です。

### 8.1 差分の周波数応答

通常差分の伝達関数は

$$
H_\Delta(\lambda)
=
1-e^{-i\lambda}.
$$

従って利得は

$$
\boxed{
|H_\Delta(\lambda)|^2
=
|1-e^{-i\lambda}|^2
=
4\sin^2\frac{\lambda}{2}
}.
$$

特に

$$
H_\Delta(0)=0.
$$

差分は 0 周波数、すなわち非常にゆっくりした成分を抑えます。

$d$ 回差分なら

$$
|H_{\Delta^d}(\lambda)|^2
=
\left(
4\sin^2\frac{\lambda}{2}
\right)^d.
$$

### 8.2 季節差分

$$
H_{\Delta_s}(\lambda)
=
1-e^{-is\lambda},
$$

したがって

$$
|H_{\Delta_s}(\lambda)|^2
=
4\sin^2\frac{s\lambda}{2}.
$$

これは

$$
\lambda
=
\frac{2\pi k}{s},
\qquad
k=0,1,\dots,s-1
$$

で 0 です。

つまり季節差分は、周期 $s$ に対応する季節周波数を狙って消すフィルタです。

---

## 9. ランダムウォークを差分すると何が起こるか

### 9.1 例：ARIMA(0,1,0)

$$
X_t=X_{t-1}+Z_t
$$

なら

$$
\Delta X_t=Z_t.
$$

従って $X_t$ 自身はレベルが累積していく非定常過程ですが、差分系列は弱ホワイトノイズです。

もし形式的に

$$
X_t
=
\frac1{1-B}Z_t
$$

と書くと、伝達関数候補は

$$
\frac1{1-e^{-i\lambda}}
$$

で $\lambda=0$ において分母が 0 になります。

この非可積分な挙動は「低周波成分を無限に増幅する」ことを表し、通常の定常スペクトル密度が存在しないことと整合します。

---

## 10. ARMA と差分を周波数領域で一枚にまとめる

定常化後の系列

$$
Y_t
=
\Delta^d\Delta_s^D X_t
$$

が ARMA$(p,q)$

$$
\phi(B)Y_t
=
\theta(B)Z_t
$$

を満たすとします。

このとき $Y$ のスペクトル密度は

$$
f_Y(\lambda)
=
\frac{\sigma^2}{2\pi}
\frac{
|\theta(e^{-i\lambda})|^2
}{
|\phi(e^{-i\lambda})|^2
}.
$$

一方、差分操作そのものは

$$
Y_t
=
(1-B)^d(1-B^s)^DX_t
$$

です。$X$ が定常である特別な場合には

$$
f_Y(\lambda)
=
|1-e^{-i\lambda}|^{2d}
|1-e^{-is\lambda}|^{2D}
f_X(\lambda).
$$

非定常 ARIMA ではこの式を逆向きに使って $X$ の「通常のスペクトル密度」を定義してはいけません。分母が季節周波数で 0 になり、有限測度にならないのがまさに積分性を失った徴候です。

---

## 11. 有理周波数因数分解の入口

ARMA のスペクトル密度は

$$
f_X(\lambda)
=
\frac{\sigma^2}{2\pi}
\left|
\frac{
\theta(e^{-i\lambda})
}{
\phi(e^{-i\lambda})
}
\right|^2.
$$

これは非負関数を「絶対値二乗」に分解した形です。

<a id="def-tsa4-spectral-factor"></a>

<!-- formal-statement-start -->
> **定義（スペクトル因子）**  
> 非負スペクトル密度 $f$ に対し、ある関数 $\Psi$ と定数 $\sigma^2>0$ が
>
> $$
> f(\lambda)
> =
> \frac{\sigma^2}{2\pi}
> |\Psi(e^{-i\lambda})|^2
> $$
>
> を満たすとき、$\Psi$ を $f$ のスペクトル因子と呼びます。
<!-- formal-statement-end -->

<!-- definition-example-start: def-tsa4-spectral-factor -->
**定義の確認**  
安定 AR(1) では

$$
f_X(\lambda)
=
\frac{\sigma^2}{2\pi}
\left|
\frac1{1-\phi e^{-i\lambda}}
\right|^2.
$$

従って

$$
\Psi(z)=\frac1{1-\phi z}
$$

はスペクトル因子です。
<!-- definition-example-end -->

因果かつ可逆な ARMA では

$$
\Psi(z)
=
\frac{\theta(z)}{\phi(z)}
$$

が単位円内に零点・極を持たない有理スペクトル因子になります。

### 11.1 TSA2 の Wold 分解との接続

TSA2 の [Wold 分解](../TSA2/index.md#thm-tsa2-wold)では純非決定論成分が

$$
X_t
=
\sum_{j=0}^{\infty}\psi_j\varepsilon_{t-j}
$$

と表されました。もし係数が絶対可算和可能なら

$$
\Psi(z)=\sum_{j\ge0}\psi_jz^j
$$

を作れて、

$$
f_X(\lambda)
=
\frac{\sigma_\varepsilon^2}{2\pi}
|\Psi(e^{-i\lambda})|^2
$$

です。

一般の純非決定論過程で「どの正のスペクトル密度が因果的な Wold 因子を持つか」を完全に特徴付けるには Kolmogorov--Szegő 型の理論が必要です。本章ではその一般定理を証明せず、**ARMA の有理関数の場合には因子を明示的に構成できる**ところまでを正本とします。

---

## 12. 時間領域と周波数領域を行き来する辞書

同じ二次構造を二つの言葉で見ています。

| 時間領域 | 周波数領域 |
|---|---|
| 自己共分散 $\gamma(h)$ | スペクトル測度の Fourier 係数 |
| 線形フィルタの直列合成 | 伝達関数の乗算 |
| AR 多項式 $\phi(B)$ | $\phi(e^{-i\lambda})$ |
| MA 多項式 $\theta(B)$ | $\theta(e^{-i\lambda})$ |
| 差分 $1-B$ | 0 周波数の零点 |
| 季節差分 $1-B^s$ | 季節周波数の零点 |
| 長く続く正の自己相関 | 0 周波数付近への質量集中 |
| 交互符号の自己相関 | $\pi$ 付近への質量集中 |
| MA$(q)$ の ACF 打切り | 分子が有限多項式 |
| AR$(p)$ の PACF 打切り | 有限次数予測方程式 |

ただし最後の二つは単純な Fourier 変換だけで相互に変換される主張ではありません。ACF/PACF の打切りは有限次数モデルの予測構造、スペクトル密度の有理形はフィルタ構造を表し、**同じ ARMA モデルを異なる角度から特徴付ける**ものです。

---

# 演習

## TSA4-A01 二点移動平均の自己共分散とスペクトル密度

- Level: A
- 目安時間: 15分

$(Z_t)$ を分散 $\sigma^2$ の弱ホワイトノイズとし、

$$
X_t
=
\frac12Z_t+\frac12Z_{t-1}
$$

とする。

1. $\gamma_X(0),\gamma_X(1),\gamma_X(h)$ $(|h|\ge2)$ を求めよ。
2. 伝達関数 $H(\lambda)$ を求めよ。
3. スペクトル密度を求め、$\lambda=\pi$ で 0 になることを確認せよ。

<!-- solution-start -->
### 詳細解答

1. 分散は

   $$
   \gamma_X(0)
   =
   E[X_t^2]
   =
   \frac14\sigma^2+\frac14\sigma^2
   =
   \frac{\sigma^2}{2}.
   $$

   ラグ 1 では共通する雑音は $Z_t$ 一つだけなので

   $$
   \gamma_X(1)
   =
   E[X_{t+1}X_t]
   =
   \frac14\sigma^2.
   $$

   $|h|\ge2$ では二つの有限雑音集合が重ならないので

   $$
   \gamma_X(h)=0.
   $$

2. 係数 $h_0=h_1=1/2$ から

   $$
   H(\lambda)
   =
   \frac12(1+e^{-i\lambda}).
   $$

3. 弱ホワイトノイズの密度は $\sigma^2/(2\pi)$ です。従って

   $$
   \begin{aligned}
   f_X(\lambda)
   &=
   \frac{\sigma^2}{2\pi}
   \left|
   \frac12(1+e^{-i\lambda})
   \right|^2\\
   &=
   \frac{\sigma^2}{2\pi}
   \cos^2\frac{\lambda}{2}.
   \end{aligned}
   $$

   $\lambda=\pi$ では $\cos(\pi/2)=0$ なので

   $$
   f_X(\pi)=0.
   $$

   時間領域の二点平均が、交互符号の最高周波数を消していることが分かります。
<!-- solution-end -->

## TSA4-A02 AR(1) の因果表示とスペクトル密度

- Level: A
- 目安時間: 18分

$$
X_t=\phi X_{t-1}+Z_t,
\qquad
|\phi|<1
$$

とする。$(Z_t)$ は分散 $\sigma^2$ の弱ホワイトノイズとする。

1. 因果表示を導け。
2. 伝達関数を求めよ。
3. スペクトル密度を求めよ。
4. $\phi>0$ と $\phi<0$ でスペクトル密度の最大位置がどう変わるか説明せよ。

<!-- solution-start -->
### 詳細解答

1. 方程式は

   $$
   (1-\phi B)X_t=Z_t.
   $$

   $|\phi|<1$ なので

   $$
   \frac1{1-\phi z}
   =
   \sum_{j=0}^{\infty}\phi^jz^j
   $$

   であり、

   $$
   \boxed{
   X_t
   =
   \sum_{j=0}^{\infty}\phi^jZ_{t-j}
   }.
   $$

2. 従って

   $$
   H(\lambda)
   =
   \frac1{1-\phi e^{-i\lambda}}.
   $$

3. よって

   $$
   \boxed{
   f_X(\lambda)
   =
   \frac{\sigma^2}{2\pi}
   \frac1{1+\phi^2-2\phi\cos\lambda}
   }.
   $$

4. $\phi>0$ なら分母は $\cos\lambda=1$、すなわち $\lambda=0$ で最小です。従って低周波側が最大です。

   $\phi<0$ なら $-2\phi\cos\lambda$ のため $\cos\lambda=-1$、すなわち $\lambda=\pi$ で分母が最小です。従って高周波側が最大です。
<!-- solution-end -->

## TSA4-A03 MA(1) の駆動雑音復元

- Level: A
- 目安時間: 18分

$$
X_t=Z_t+\theta Z_{t-1}
$$

とする。

1. $Z_t$ を $X_t,X_{t-1},\dots$ で逐次展開せよ。
2. $|\theta|<1$ のとき可逆表示を示せ。
3. $|\theta|\ge1$ では、同じ展開が絶対可算和可能な因果逆フィルタにならないことを説明せよ。
4. MA 多項式の零点との対応を確認せよ。

<!-- solution-start -->
### 詳細解答

1. まず

   $$
   Z_t=X_t-\theta Z_{t-1}.
   $$

   さらに

   $$
   Z_{t-1}=X_{t-1}-\theta Z_{t-2}
   $$

   を代入すると

   $$
   Z_t
   =
   X_t-\theta X_{t-1}+\theta^2Z_{t-2}.
   $$

   反復して

   $$
   Z_t
   =
   \sum_{j=0}^{n-1}(-\theta)^jX_{t-j}
   +
   (-\theta)^nZ_{t-n}.
   $$

2. $|\theta|<1$ なら

   $$
   \|(-\theta)^nZ_{t-n}\|_2
   =
   |\theta|^n\sigma
   \to0.
   $$

   従って

   $$
   \boxed{
   Z_t
   =
   \sum_{j=0}^{\infty}(-\theta)^jX_{t-j}
   }.
   $$

   また

   $$
   \sum_{j\ge0}|(-\theta)^j|
   =
   \frac1{1-|\theta|}
   <
   \infty.
   $$

3. $|\theta|\ge1$ では係数 $|\theta|^j$ が 0 へ行かず、絶対可算和可能ではありません。したがってこの因果逆フィルタは安定に定義できません。

4. MA 多項式は

   $$
   \theta(z)=1+\theta z.
   $$

   零点は

   $$
   z=-\frac1{\theta}.
   $$

   これが単位円外にある条件

   $$
   \left|-\frac1\theta\right|>1
   $$

   はちょうど $|\theta|<1$ です。
<!-- solution-end -->

## TSA4-A04 差分と季節差分の周波数応答

- Level: A
- 目安時間: 18分

1. 通常差分 $\Delta=1-B$ の利得 $|H_\Delta(\lambda)|^2$ を求めよ。
2. 周期 $s$ の季節差分 $\Delta_s=1-B^s$ の零点周波数を全て求めよ。
3. $s=12$ のとき、どの角周波数が消されるか書け。
4. 線形トレンド $X_t=a+bt$ に通常差分を作用させよ。

<!-- solution-start -->
### 詳細解答

1.

   $$
   H_\Delta(\lambda)
   =
   1-e^{-i\lambda}
   $$

   なので

   $$
   \begin{aligned}
   |H_\Delta(\lambda)|^2
   &=
   (1-e^{-i\lambda})(1-e^{i\lambda})\\
   &=
   2-2\cos\lambda\\
   &=
   4\sin^2\frac{\lambda}{2}.
   \end{aligned}
   $$

2.

   $$
   1-e^{-is\lambda}=0
   $$

   は

   $$
   s\lambda=2\pi k
   $$

   と同値です。従って円周上で

   $$
   \boxed{
   \lambda=\frac{2\pi k}{s},
   \quad
   k=0,\dots,s-1
   }.
   $$

3. $s=12$ では

   $$
   \lambda
   =
   0,\frac{2\pi}{12},\frac{4\pi}{12},\dots,\frac{22\pi}{12}
   \pmod{2\pi}.
   $$

4.

   $$
   \Delta X_t
   =
   a+bt-[a+b(t-1)]
   =
   b.
   $$

   一次トレンドは一回差分で定数へ落ちます。
<!-- solution-end -->

## TSA4-B01 一般 ARMA の因果表現と駆動雑音復元

- Level: B
- 目安時間: 30分

ARMA$(p,q)$

$$
\phi(B)X_t=\theta(B)Z_t
$$

を考える。

1. $\phi$ の全零点が単位円外なら、$\theta/\phi$ のべき級数係数が絶対可算和可能になる理由を示せ。
2. 因果表示を導け。
3. $\theta$ の全零点も単位円外なら、逆表示を導け。
4. $\phi$ と $\theta$ が共通因子を持つ場合、次数が識別できない理由を説明せよ。

<!-- solution-start -->
### 詳細解答

1. $\phi(0)=1$ なので

   $$
   \phi(z)
   =
   \prod_{\nu}
   \left(1-\frac z{r_\nu}\right)^{m_\nu}
   $$

   と書けます。全て $|r_\nu|>1$ です。

   各逆因子の係数は

   $$
   \binom{n+m_\nu-1}{m_\nu-1}r_\nu^{-n}
   $$

   で、指数減衰が多項式増加を上回るため絶対可算和可能です。有限個のそのような級数の積の係数も絶対可算和可能です。

   さらに $\theta$ は有限次数多項式なので

   $$
   \frac{\theta(z)}{\phi(z)}
   $$

   の係数も絶対可算和可能です。

2. 従って

   $$
   \frac{\theta(z)}{\phi(z)}
   =
   \sum_{j\ge0}\psi_jz^j
   $$

   と書け、

   $$
   \boxed{
   X_t=\sum_{j\ge0}\psi_jZ_{t-j}
   }
   $$

   が因果表示です。

3. $\theta$ の全零点も単位円外なので、[単位円外の零点と絶対可算和可能な逆べき級数](index.md#thm-tsa4-polynomial-inverse)を $a=\theta$ に適用すると

   $$
   \frac1{\theta(z)}
   =
   \sum_{j\ge0}b_jz^j,
   \qquad
   \sum_{j\ge0}|b_j|<\infty.
   $$

   $\phi$ は有限次数多項式なので、有限個のシフト付き和を取ることで

   $$
   \frac{\phi(z)}{\theta(z)}
   =
   \sum_{j\ge0}\pi_jz^j,
   \qquad
   \sum_{j\ge0}|\pi_j|<\infty.
   $$

   ARMA 方程式の両辺へこの因果逆フィルタを作用させると

   $$
   \boxed{
   Z_t=\sum_{j\ge0}\pi_jX_{t-j}
   }.
   $$

   したがって駆動雑音は観測系列の現在・過去から $L^2$ で復元できます。

4. 共通因子 $c$ があれば

   $$
   \frac{\theta}{\phi}
   =
   \frac{\theta/c}{\phi/c}.
   $$

   従って同じ伝達関数、同じ因果入出力関係をより低次数の ARMA で表せます。元の $(p,q)$ は一意な構造次数ではありません。これが既約性を要求する理由です。
<!-- solution-end -->

## TSA4-B02 MA の ACF と AR の PACF の打切り

- Level: B
- 目安時間: 28分

1. MA$(q)$ では $\gamma(h)=0$ for $|h|>q$ を直接証明せよ。
2. 因果 AR$(p)$ で駆動雑音が標準イノベーションなら、$k>p$ に対する有限過去予測
   $$
   P_{\operatorname{span}\{X_{t-1},\dots,X_{t-k}\}}X_t
   $$
   の係数を求めよ。
3. そこから偏自己相関が $p$ より先で 0 になることを示せ。
4. 「AR の ACF も $p$ で 0 になる」とは一般には言えないことを AR(1) で確認せよ。

<!-- solution-start -->
### 詳細解答

1. MA$(q)$ は

   $$
   X_t
   =
   \sum_{j=0}^{q}\theta_jZ_{t-j}.
   $$

   $h>q$ なら $X_{t+h}$ に現れる雑音添字
   $t+h,t+h-1,\dots,t+h-q$ と、
   $X_t$ に現れる
   $t,t-1,\dots,t-q$ は交わりません。

   従って全ての積の共分散が 0 となり、

   $$
   \gamma(h)=0.
   $$

2. AR 方程式は

   $$
   X_t
   =
   \sum_{j=1}^{p}\phi_jX_{t-j}+Z_t.
   $$

   $Z_t$ は過去空間へ直交するので、$k\ge p$ に対する射影は

   $$
   P X_t
   =
   \sum_{j=1}^{p}\phi_jX_{t-j}.
   $$

   一意性より係数は

   $$
   a_{k,j}
   =
   \phi_j
   \quad(1\le j\le p),
   \qquad
   a_{k,j}=0
   \quad(p<j\le k).
   $$

3. $k>p$ なら最後の係数は

   $$
   \alpha(k)
   =
   a_{k,k}
   =
   0.
   $$

4. AR(1) では

   $$
   \rho(h)=\phi^{|h|}.
   $$

   $\phi\neq0$ なら任意の有限 $h$ で一般に 0 ではありません。従って AR の特徴は ACF の打切りではなく PACF の打切りです。
<!-- solution-end -->

## TSA4-B03 フィルタの直列接続とスペクトル密度

- Level: B
- 目安時間: 28分

$(X_t)$ をスペクトル密度 $f_X$ を持つ二次定常過程とする。

第一フィルタの伝達関数を $H_1$、第二フィルタを $H_2$ とし、

$$
Y=H_1(B)X,
\qquad
W=H_2(B)Y
$$

とする。両フィルタの係数は絶対可算和可能とする。

1. 合成フィルタの伝達関数が $H_2(\lambda)H_1(\lambda)$ であることを示せ。
2. $W$ のスペクトル密度を求めよ。
3. $H_1(0)=0$ なら、$f_X(0)$ が有限であっても $f_Y(0)=0$ となることを示せ。
4. 第一フィルタが差分、第二フィルタが安定 AR(1) の逆フィルタ
   $$
   H_2(\lambda)=\frac1{1-\phi e^{-i\lambda}}
   $$
   のとき、合成利得を書け。

<!-- solution-start -->
### 詳細解答

1. 係数列を $(h_j)$、$(g_j)$ とします。すると

   $$
   W_t
   =
   \sum_k g_k
   \sum_jh_jX_{t-k-j}.
   $$

   絶対可算和可能性により和の順序を交換でき、合成係数は Cauchy 型の係数合成

   $$
   c_n
   =
   \sum_{k+j=n}g_kh_j
   $$

   です。従って

   $$
   \begin{aligned}
   H_C(\lambda)
   &=
   \sum_nc_ne^{-in\lambda}\\
   &=
   \left(\sum_kg_ke^{-ik\lambda}\right)
   \left(\sum_jh_je^{-ij\lambda}\right)\\
   &=
   H_2(\lambda)H_1(\lambda).
   \end{aligned}
   $$

2. フィルタ定理を二回使うと

   $$
   \boxed{
   f_W(\lambda)
   =
   |H_2(\lambda)H_1(\lambda)|^2
   f_X(\lambda)
   }.
   $$

3.

   $$
   f_Y(0)
   =
   |H_1(0)|^2f_X(0)
   =
   0.
   $$

4. 差分の伝達関数は $1-e^{-i\lambda}$ です。従って

   $$
   \boxed{
   |H_C(\lambda)|^2
   =
   \frac{
   |1-e^{-i\lambda}|^2
   }{
   |1-\phi e^{-i\lambda}|^2
   }
   }.
   $$
<!-- solution-end -->

## TSA4-C01 ARIMA・季節差分・有理スペクトル密度を統合する

- Level: C
- 目安時間: 45分

$(Z_t)$ を分散 $\sigma^2$ の弱ホワイトノイズとし、観測系列 $(X_t)$ が

$$
(1-\phi B)(1-B)(1-B^{12})X_t
=
(1+\theta B)Z_t
$$

を満たすとする。$|\phi|<1$、$|\theta|<1$ とする。

1. 
   $$
   Y_t:=(1-B)(1-B^{12})X_t
   $$
   と置いたとき、$Y_t$ がどの ARMA モデルに従うか答えよ。
2. $Y_t$ の因果表示の伝達関数を求めよ。
3. $Y_t$ のスペクトル密度を求めよ。
4. $X_t$ 自身について TSA3 の意味で通常のスペクトル密度を機械的に定義してはいけない理由を説明せよ。
5. 差分フィルタ
   $$
   (1-B)(1-B^{12})
   $$
   が消す周波数を求めよ。
6. $\phi$ と $-\theta$ が同じ値になり、AR 多項式と MA 多項式に共通因子が生じる場合、定常化後の ARMA 表現がどう簡約されるか説明せよ。

<!-- solution-start -->
### 詳細解答

1. 定義より

   $$
   (1-\phi B)Y_t
   =
   (1+\theta B)Z_t.
   $$

   従って

   $$
   \boxed{
   Y_t\text{ は ARMA}(1,1)
   }.
   $$

2. $|\phi|<1$ なので AR 多項式 $1-\phi z$ の零点 $1/\phi$ は単位円外です。従って因果表示は

   $$
   Y_t
   =
   \frac{1+\theta B}{1-\phi B}Z_t
   $$

   で、伝達関数は

   $$
   \boxed{
   H_Y(\lambda)
   =
   \frac{1+\theta e^{-i\lambda}}
   {1-\phi e^{-i\lambda}}
   }.
   $$

3. 弱ホワイトノイズの密度 $\sigma^2/(2\pi)$ にフィルタ定理を適用して

   $$
   \boxed{
   f_Y(\lambda)
   =
   \frac{\sigma^2}{2\pi}
   \frac{
   |1+\theta e^{-i\lambda}|^2
   }{
   |1-\phi e^{-i\lambda}|^2
   }
   }.
   $$

4. $X_t$ から $Y_t$ への差分フィルタの伝達関数は

   $$
   D(\lambda)
   =
   (1-e^{-i\lambda})
   (1-e^{-i12\lambda}).
   $$

   形式的に逆に戻すと

   $$
   f_X(\lambda)
   \stackrel{\mathrm{formal}}{=}
   \frac{f_Y(\lambda)}
   {|D(\lambda)|^2}
   $$

   ですが、$D$ は 0 周波数と季節周波数で 0 になります。そのため右辺はそこで特異になり、一般に有限積分を持ちません。

   TSA3 のスペクトル測度は有限測度でなければならず、その全質量は分散に等しいので、この非可積分な特異挙動は $X_t$ が二次定常でないことと整合します。従って非定常 $X$ へ通常のスペクトル密度を機械的に割り当ててはいけません。

5. 第一因子 $1-e^{-i\lambda}$ は

   $$
   \lambda=0
   $$

   を消します。

   第二因子 $1-e^{-i12\lambda}$ は

   $$
   \lambda
   =
   \frac{2\pi k}{12},
   \qquad
   k=0,\dots,11
   $$

   を消します。

   合成フィルタの零点集合は後者を含み、特に 0 周波数では両因子が同時に 0 になります。

6. AR 多項式は

   $$
   \phi(z)=1-\phi z,
   $$

   MA 多項式は

   $$
   \theta(z)=1+\theta z.
   $$

   $\theta=-\phi$ なら

   $$
   \theta(z)=1-\phi z=\phi(z).
   $$

   従って共通因子が完全に相殺され、

   $$
   Y_t=Z_t
   $$

   まで簡約されます。

   元の ARMA$(1,1)$ という次数表示は既約でなく、同じ伝達関数 1 を ARMA$(0,0)$ として表せます。これは共通因子を除く既約性が識別に必要であることの具体例です。
<!-- solution-end -->

---

## 13. 本章のまとめ

本章で得た核心は次の一本の式です。

$$
\boxed{
F_Y(d\lambda)
=
|H(\lambda)|^2F_X(d\lambda)
}
$$

これにより、

- 線形フィルタは時間領域の係数合成と周波数領域の乗算を結ぶ。
- ARMA の因果性は AR 多項式 $\phi$ の単位円外根条件で決まる。
- ARMA で駆動雑音を観測過去から復元できるかは、MA 多項式 $\theta$ の単位円外根条件で決まる。
- 因果 ARMA のスペクトル密度は
  $$
  \frac{\sigma^2}{2\pi}
  \frac{|\theta|^2}{|\phi|^2}
  $$
  という有理形になる。
- MA$(q)$ は ACF が $q$ で切れ、AR$(p)$ は PACF が $p$ で切れる。
- 通常差分は 0 周波数、季節差分は季節周波数に零点を置く。
- ARIMA では差分後の系列が定常であり、非定常な元系列へ通常のスペクトル密度を機械適用しない。
- ARMA のスペクトル密度は Wold 表示の有理スペクトル因数分解になっている。

---

## 次に進む

TSA5 では、定常性だけでは標本平均や標本自己共分散の収束が保証されない問題へ進みます。定常シフト、エルゴード性、平均エルゴード定理、mixing の入口、従属系列の大数則・従属極限定理、標本自己共分散の一致性を扱います。
