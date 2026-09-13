# F0-00P2 密度・Radon–Nikodym：確率質量関数と確率密度関数を同じ式で読む

<!-- definition-example-audit: strict -->

[P1](../F0_00P1_確率空間_確率変数_分布/index.md) で、確率変数の分布を値空間上の確率測度として作りました。この章では、確率質量関数と確率密度関数を**基準測度に対する密度**として統一します。

---

## 1. 測度の絶対連続性

<a id="def-f0-00p2-absolute-continuity"></a>

<!-- formal-statement-start -->
> **定義（測度の絶対連続性）**  
> 同じ可測空間 $(\Omega,\mathcal F)$ 上の非負測度 $\mu,\nu$ について、任意の $A\in\mathcal F$ に対して

$$
\mu(A)=0\Longrightarrow\nu(A)=0
$$

> が成り立つとき、$\nu$ は $\mu$ に関して絶対連続であるといい、$\nu\ll\mu$ と書きます。
<!-- formal-statement-end -->

### 1.1 例：密度 $2x$ から作った測度

$[0,1]$ 上のLebesgue測度を $\lambda$ とし

$$
\nu(A):=\int_A2x\,d\lambda(x)
$$

とします。

<!-- definition-example-start: def-f0-00p2-absolute-continuity -->
**定義の確認**

$\lambda(A)=0$ なら測度0の集合上の積分は0なので $\nu(A)=0$ です。従って $\nu\ll\lambda$ です。
<!-- definition-example-end -->

一方、Dirac測度 $\delta_0$ では

$$
\lambda(\{0\})=0,
\qquad
\delta_0(\{0\})=1,
$$

したがって $\delta_0\not\ll\lambda$ です。

---

## 2. 基準測度に対する密度

<a id="def-f0-00p2-rn-derivative"></a>

<!-- formal-statement-start -->
> **定義（Radon--Nikodym微分）**  
> 同じ可測空間 $(\Omega,\mathcal F)$ 上の非負測度 $\mu,\nu$ に対し、非負可測関数 $f$ が

$$
\nu(A)=\int_Af\,d\mu
\qquad(\forall A\in\mathcal F)
$$

> を満たすとき、$f$ を $\nu$ の $\mu$ に関するRadon--Nikodym微分と呼び、$f=d\nu/d\mu$ と書きます。
<!-- formal-statement-end -->

### 2.1 例：先ほどの測度

<!-- definition-example-start: def-f0-00p2-rn-derivative -->
**定義の確認**

$f(x)=2x$ は非負Borel可測で、任意の可測集合 $A$ に対して

$$
\int_Af\,d\lambda
=\int_A2x\,d\lambda
=\nu(A).
$$

従って

$$
\frac{d\nu}{d\lambda}(x)=2x.
$$
<!-- definition-example-end -->

密度は、測度だけでなく「何を基準測度にしたか」に依存します。

---

## 3. 準備：$L^2$ 表現補題

<a id="lem-f0-00p2-l2-representation"></a>

<!-- formal-statement-start -->
> **補題（$L^2$ 表現補題）**  
> 有限測度空間 $(\Omega,\mathcal F,\rho)$ 上で、$T:L^2(\rho)\to\mathbb R$ を連続線形汎関数とします。このとき、ある $h\in L^2(\rho)$ が存在して

$$
T(g)=\int gh\,d\rho
\qquad(\forall g\in L^2(\rho))
$$

> と書けます。$h$ は $\rho$-a.e. の意味で一意です。
<!-- formal-statement-end -->

<!-- proof-start -->
### 証明

$T=0$ なら $h=0$ でよいので、$T\ne0$ とします。

$$
M:=\ker T
$$

と置きます。$T$ は連続なので $M$ は $L^2(\rho)$ の閉線形部分空間です。$T(y)\ne0$ となる $y\in L^2(\rho)$ を一つ取ります。

[Hilbert射影定理](../F0_02C1A_Hilbert射影定理_直交分解/index.md#thm-hilbert-projection)により、直交成分を

$$
u:=y-P_My$$

ではなく、ここでは単に

$$
u$$

も導入せず、次の $u$ だけを使います。

$$
 u:=y-P_My.
$$

すると

$$
 u\in M^\perp,
\qquad
y=P_My+u.
$$

$y\notin M$ なので $u\ne0$ です。また $P_My\in M$ なので

$$
T(u)=T(y)-T(P_My)=T(y)\ne0.
$$

任意の $g\in L^2(\rho)$ に対して

$$
\alpha:=\frac{T(g)}{T(u)}
$$

と置くと $T(g-\alpha u)=0$ なので $g-\alpha u\in M$ です。$u\perp M$ より

$$
0=\langle u,g-\alpha u\rangle
=\int ug\,d\rho-\alpha\|u\|_2^2.
$$

従って

$$
\alpha=\frac{\int ug\,d\rho}{\|u\|_2^2}.
$$

したがって

$$
T(g)
=\frac{T(u)}{\|u\|_2^2}\int ug\,d\rho
=\int gh\,d\rho,
$$

ただし

$$
h:=\frac{T(u)}{\|u\|_2^2}u.
$$

もし $h_1,h_2$ が同じ表示を与えるなら

$$
\int g(h_1-h_2)\,d\rho=0
\qquad(\forall g\in L^2(\rho)).
$$

$g=h_1-h_2$ と取れば

$$
\|h_1-h_2\|_2^2=0,
$$

従って $h_1=h_2$ が $\rho$-a.e. で成り立ちます。
<!-- proof-end -->

---

## 4. Radon--Nikodym定理

<a id="thm-f0-00p2-radon-nikodym"></a>

<!-- formal-statement-start -->
> **定理（Radon--Nikodym定理）**  
> $(\Omega,\mathcal F)$ 上の $\sigma$ 有限な非負測度 $\mu,\nu$ が $\nu\ll\mu$ を満たすとします。このとき非負可測関数 $f$ が存在し、任意の $A\in\mathcal F$ に対して

$$
\nu(A)=\int_Af\,d\mu
$$

> が成り立ちます。さらに $f$ は $\mu$-a.e. の意味で一意です。
<!-- formal-statement-end -->

<!-- proof-start -->
### 4.1 証明：有限測度の場合

まず $\mu(\Omega)<\infty$, $\nu(\Omega)<\infty$ とし

$$
\rho:=\mu+\nu,
\qquad
T(g):=\int g\,d\nu
$$

と置きます。$\nu\le\rho$ とCauchy--Schwarz不等式から

$$
\begin{aligned}
|T(g)|
&\le\left(\int g^2\,d\nu\right)^{1/2}\nu(\Omega)^{1/2}\\
&\le\nu(\Omega)^{1/2}\|g\|_{L^2(\rho)}.
\end{aligned}
$$

従って $T$ は連続です。[前節の $L^2$ 表現補題](#lem-f0-00p2-l2-representation)から

$$
T(g)=\int gh\,d\rho
$$

となる $h\in L^2(\rho)$ が存在します。$\rho$ は有限なので $\boldsymbol{1}_A\in L^2(\rho)$ であり

$$
\nu(A)=\int_Ah\,d\rho.
$$

$B:=\{h<0\}$ が正の $\rho$-測度を持てば $\nu(B)=\int_Bh\,d\rho<0$ となるので、$h\ge0$ a.e.です。また

$$
\mu(A)=\rho(A)-\nu(A)=\int_A(1-h)\,d\rho
$$

から同様に $h\le1$ a.e.です。

$$
D:=\{h=1\}
$$

と置くと $\mu(D)=0$。$\nu\ll\mu$ から $\nu(D)=0$ でもあるので $\rho(D)=0$ です。

$D^c$ 上で $f:=h/(1-h)$、$D$ 上で $f:=0$ とします。

$$
\mu(A)=\int_A(1-h)\,d\rho
$$

を指示関数から非負単関数、さらに単調収束定理で非負可測関数へ拡張すると

$$
\int\varphi\,d\mu
=
\int\varphi(1-h)\,d\rho.
$$

$\varphi=f\boldsymbol{1}_A$ とすれば

$$
\begin{aligned}
\int_Af\,d\mu
&=\int_Af(1-h)\,d\rho\\
&=\int_{A\cap D^c}h\,d\rho\\
&=\int_Ah\,d\rho\\
&=\nu(A).
\end{aligned}
$$

有限測度の場合が示されました。

### 4.2 証明：$\sigma$ 有限の場合

$\mu$ の有限測度被覆 $(E_i)$ と $\nu$ の有限測度被覆 $(F_j)$ を取り、交差 $E_i\cap F_j$ を一列 $C_1,C_2,\ldots$ に並べます。

$$
D_1:=C_1,
\qquad
D_k:=C_k\setminus\bigcup_{j<k}C_j
$$

と置けば、$D_k$ は互いに素で $\Omega$ を覆い、各 $D_k$ 上で $\mu,\nu$ は有限です。

制限測度

$$
\mu_k(A):=\mu(A\cap D_k),
\qquad
\nu_k(A):=\nu(A\cap D_k)
$$

について、$\mu_k(A)=0$ なら $\mu(A\cap D_k)=0$ なので $\nu\ll\mu$ から $\nu_k(A)=0$。従って $\nu_k\ll\mu_k$ です。

各 $D_k$ に有限測度版を適用して密度 $f_k$ を取り

$$
f:=\sum_{k=1}^{\infty}f_k\boldsymbol{1}_{D_k}
$$

と置くと

$$
\begin{aligned}
\int_Af\,d\mu
&=\sum_k\int_{A\cap D_k}f_k\,d\mu\\
&=\sum_k\nu(A\cap D_k)\\
&=\nu(A).
\end{aligned}
$$

### 4.3 証明：一意性

$f,g$ がともにRadon--Nikodym微分だとします。各有限測度部分 $D_k$ で $f,g$ はa.e.有限です。

もし $H:=D_k\cap\{f>g\}$ が正の測度を持つなら

$$
H=\bigcup_{n=1}^{\infty}D_k\cap\{f\ge g+1/n\}
$$

がa.e.の意味で成り立つので、ある $n$ で $H_n:=D_k\cap\{f\ge g+1/n\}$ が正の測度を持ちます。しかし

$$
\begin{aligned}
\nu(H_n)
=\int_{H_n}f\,d\mu
&\ge\int_{H_n}g\,d\mu+\frac1n\mu(H_n)\\
&=\nu(H_n)+\frac1n\mu(H_n)\\
&>\nu(H_n),
\end{aligned}
$$

となり矛盾です。従って $f\le g$ a.e.。役割を交換すれば $g\le f$ a.e.なので $f=g$ a.e.です。
<!-- proof-end -->

---

## 5. 確率密度関数と確率質量関数

Lebesgue測度を $\lambda$ とすると、$P_X\ll\lambda$ のとき

$$
f_X:=\frac{dP_X}{d\lambda}
$$

が確率密度関数で

$$
P(X\in A)=\int_Af_X(x)\,dx.
$$

可算集合 $S$ 上の数え上げ測度を $\#$ とすれば、任意の $S$ 上の確率分布は $P_X\ll\#$ であり

$$
\frac{dP_X}{d\#}(x)=P(X=x).
$$

したがって確率質量関数も同じ枠組みの密度です。

---

## 6. 支配測度

<a id="def-f0-00p2-dominating-measure"></a>

<!-- formal-statement-start -->
> **定義（支配測度）**  
> 同じ可測空間上の確率測度族 $\{P_\theta:\theta\in\Theta\}$ に対し、測度 $\mu$ が

$$
P_\theta\ll\mu
\qquad(\forall\theta\in\Theta)
$$

> を満たすとき、$\mu$ をこの確率測度族の**支配測度**と呼びます。
<!-- formal-statement-end -->

### 6.1 例：Bernoulliモデル

<!-- definition-example-start: def-f0-00p2-dominating-measure -->
**定義の確認**

$\{0,1\}$ 上の数え上げ測度 $\#$ について $\#(A)=0$ なら $A=\varnothing$ です。従って任意のBernoulli分布 $P_p$ について $P_p(A)=0$。よって

$$
P_p\ll\#
\qquad(\forall p\in[0,1]).
$$

従って $\#$ はBernoulliモデルの支配測度です。
<!-- definition-example-end -->

---

## 演習

### F0-00P2-A01 Bernoulli分布を数え上げ測度で書く
- Level: A
- 目安時間: 10分

$P(X=1)=p$, $P(X=0)=1-p$ とする。数え上げ測度 $\#$ に対する $P_X$ の密度を求めよ。

<!-- solution-start -->
#### 詳細解答
$f(0)=1-p$, $f(1)=p$ と置けば

$$
\int_Af\,d\#=\sum_{x\in A}f(x)=P_X(A).
$$

従って $dP_X/d\#(x)=p^x(1-p)^{1-x}$ です。
<!-- solution-end -->

### F0-00P2-A02 絶対連続性を確認する
- Level: A
- 目安時間: 10分

$[0,1]$ 上で $\nu(A)=\int_A3x^2\,dx$ とする。$\nu\ll\lambda$ を示し、$d\nu/d\lambda$ を求めよ。

<!-- solution-start -->
#### 詳細解答
$\lambda(A)=0$ なら $\nu(A)=0$ なので $\nu\ll\lambda$ です。また

$$
\frac{d\nu}{d\lambda}(x)=3x^2.
$$
<!-- solution-end -->

### F0-00P2-A03 Dirac測度の絶対連続性
- Level: A
- 目安時間: 10分

$\delta_a\not\ll\lambda$ を示せ。

<!-- solution-start -->
#### 詳細解答
$A=\{a\}$ なら $\lambda(A)=0$ ですが $\delta_a(A)=1$ なので、絶対連続性の定義を満たしません。
<!-- solution-end -->

### F0-00P2-A04 重み付き数え上げ測度
- Level: A
- 目安時間: 10分

有限集合 $S$ 上で $\nu(\{x\})=w_x>0$ とする。$P_X(\{x\})=p_x$ のとき $dP_X/d\nu$ を求めよ。

<!-- solution-start -->
#### 詳細解答
一点集合で $p_x=f(x)w_x$ なので

$$
f(x)=\frac{p_x}{w_x}.
$$

さらに $\int_Af\,d\nu=\sum_{x\in A}p_x=P_X(A)$ です。
<!-- solution-end -->

### F0-00P2-B01 Bernoulli族の支配測度
- Level: B
- 目安時間: 15分

数え上げ測度 $\#$ がBernoulli族 $\{P_p:0\le p\le1\}$ を支配することを示し、$dP_p/d\#$ を求めよ。

<!-- solution-start -->
#### 詳細解答
$\#(A)=0$ なら $A=\varnothing$ なので全ての $p$ で $P_p(A)=0$。従って $P_p\ll\#$ です。また

$$
\frac{dP_p}{d\#}(0)=1-p,
\qquad
\frac{dP_p}{d\#}(1)=p.
$$
<!-- solution-end -->

### F0-00P2-B02 点質量と連続部分を同時に支配する
- Level: B
- 目安時間: 15分

$0<p<1$ とし $P=p\delta_0+(1-p)N(0,1)$、$\mu:=\delta_0+\lambda$ とする。標準正規密度を $\varphi$ として、$P\ll\mu$ を示し $dP/d\mu$ を求めよ。

<!-- solution-start -->
#### 詳細解答
$\mu(A)=0$ なら $\delta_0(A)=0$ かつ $\lambda(A)=0$ なので $P(A)=0$。従って $P\ll\mu$ です。

$$
f(x):=p\boldsymbol{1}_{\{0\}}(x)+(1-p)\varphi(x)\boldsymbol{1}_{\mathbb R\setminus\{0\}}(x)
$$

と置けば $\int_Af\,d\mu=P(A)$ なので $f=dP/d\mu$ です。
<!-- solution-end -->

### F0-00P2-B03 一意性を証明する
- Level: B
- 目安時間: 15分

有限測度 $\nu$ に対して $\nu(A)=\int_Af\,d\mu=\int_Ag\,d\mu$ が全ての可測集合 $A$ で成り立つとする。$f,g\ge0$ とし、$f=g$ が $\mu$-a.e. 成り立つことを示せ。

<!-- solution-start -->
#### 詳細解答
$H:=\{f>g\}$ とします。a.e.有限性から

$$
H=\bigcup_{n=1}^{\infty}\{f\ge g+1/n\}
$$

がa.e.の意味で成り立ちます。$\mu(H)>0$ なら、ある $n$ で $H_n:=\{f\ge g+1/n\}$ が正の測度を持ち

$$
\nu(H_n)=\int_{H_n}f\,d\mu
\ge\int_{H_n}g\,d\mu+\frac1n\mu(H_n)
>\nu(H_n),
$$

となり矛盾です。従って $f\le g$ a.e.。逆も同様なので $f=g$ a.e.です。
<!-- solution-end -->

### F0-00P2-C01 基準測度を変えて同じ分布を表す
- Level: C
- 目安時間: 25分

実数上で

$$
\mu(A)=\int_A\frac1{1+x^2}\,dx,
\qquad
\nu(A)=\int_Ace^{-x^2}\,dx
$$

とする。ただし $c>0$ は $\nu(\mathbb R)=1$ となる正規化定数である。

1. $\nu\ll\mu$ を示せ。
2. $d\nu/d\mu$ を求めよ。
3. 定義式を確認せよ。
4. 基準測度を変えると密度が変わっても、確率測度は変わらない理由を説明せよ。

<!-- solution-start -->
#### 詳細解答
**1.** $\mu(A)=0$ とします。$A_m:=A\cap[-m,m]$ 上では $(1+x^2)^{-1}\ge(1+m^2)^{-1}$ なので

$$
0=\mu(A_m)\ge\frac1{1+m^2}\lambda(A_m).
$$

従って $\lambda(A_m)=0$。$A=\bigcup_mA_m$ なので $\lambda(A)=0$、よって $\nu(A)=0$ です。

**2.**

$$
\frac{d\nu}{d\mu}(x)=ce^{-x^2}(1+x^2).
$$

**3.**

$$
\int_A\frac{d\nu}{d\mu}\,d\mu
=\int_Ace^{-x^2}\,dx
=\nu(A).
$$

**4.** 基準測度を変えると密度は変わりますが、任意の可測集合 $A$ に対して復元される値は同じ $\nu(A)$ です。密度は表現、分布は測度そのものです。
<!-- solution-end -->

---

## 次に進む

基準測度に対する密度を理解したら、[F0-00P2A 期待値・LOTUS](../F0_00P2A_期待値_LOTUS/index.md) で、期待値を分布上の積分へ移します。
