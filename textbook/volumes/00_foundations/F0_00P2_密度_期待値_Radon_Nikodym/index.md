# F0-00P2 密度・Radon–Nikodym：pmfとpdfを同じ式で読む

<!-- definition-example-audit: strict -->

P1で分布を確率測度として定義しました。この講義では「密度」をLebesgue密度だけに限定せず、**基準測度に対するRadon--Nikodym微分**として統一します。

```text
絶対連続性
 ↓
Radon--Nikodym定理
 ↓
Radon--Nikodym微分
 ↓
pmf / pdf
```

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

$([0,1],\mathcal B([0,1]))$ 上のLebesgue測度を $\lambda$ とし

$$
\nu(A)=\int_A2x\,d\lambda(x)
$$

とします。

<!-- definition-example-start: def-f0-00p2-absolute-continuity -->
**定義の確認**  
$\lambda(A)=0$ なら測度0の集合上の積分は0なので

$$
\nu(A)=\int_A2x\,d\lambda(x)=0.
$$

従って $\nu\ll\lambda$ です。
<!-- definition-example-end -->

一方、点質量 $\delta_0$ は

$$
\lambda(\{0\})=0,
\qquad
\delta_0(\{0\})=1
$$

なので $\lambda$ に関して絶対連続ではありません。

---

## 2. Radon--Nikodym微分

<a id="def-f0-00p2-rn-derivative"></a>

<!-- formal-statement-start -->
> **定義（Radon--Nikodym微分）**  
> 非負測度 $\mu,\nu$ に対して非負可測関数 $f$ が

$$
\nu(A)=\int_A f\,d\mu
\qquad(\forall A\in\mathcal F)
$$

> を満たすとき、$f$ を $\nu$ の $\mu$ に関するRadon--Nikodym微分と呼び、$f=d\nu/d\mu$ と書きます。
<!-- formal-statement-end -->

### 2.1 例：先ほどの測度

<!-- definition-example-start: def-f0-00p2-rn-derivative -->
**定義の確認**  
$f(x)=2x$ は $[0,1]$ 上で非負かつBorel可測です。また任意の可測集合 $A$ に対して

$$
\int_Af\,d\lambda
=\int_A2x\,d\lambda
=\nu(A).
$$

従って

$$
\boxed{\frac{d\nu}{d\lambda}(x)=2x}.
$$
<!-- definition-example-end -->

---

## 3. Radon--Nikodym定理

<a id="thm-f0-00p2-radon-nikodym"></a>

<!-- formal-statement-start -->
> **定理（Radon--Nikodym定理）**  
> $(\Omega,\mathcal F)$ 上の $\sigma$ 有限な非負測度 $\mu,\nu$ が $\nu\ll\mu$ を満たすとします。このとき非負可測関数 $f$ が存在し、任意の $A\in\mathcal F$ に対して

$$
\nu(A)=\int_Af\,d\mu
$$

> が成り立ちます。さらに $f$ は $\mu$-a.e. の意味で一意です。
<!-- formal-statement-end -->

以下では [F0-02C2のRiesz表現定理](../F0_02C2_線形汎関数_双対空間_Riesz/index.md) を使います。

<!-- proof-start -->
### 3.1 証明：有限測度の場合

まず

$$
\mu(\Omega)<\infty,
\qquad
\nu(\Omega)<\infty
$$

とし

$$
\rho=\mu+\nu
$$

と置きます。Hilbert空間 $L^2(\rho)$ 上の線形汎関数

$$
T(g)=\int_\Omega g\,d\nu
$$

についてCauchy--Schwarzより

$$
|T(g)|
\le\nu(\Omega)^{1/2}\left(\int g^2\,d\nu\right)^{1/2}
\le\nu(\Omega)^{1/2}\|g\|_{L^2(\rho)}.
$$

従って $T$ は連続です。Riesz表現定理から、ある $h\in L^2(\rho)$ が存在して

$$
T(g)=\int gh\,d\rho
\qquad(\forall g\in L^2(\rho))
$$

と書けます。$g=\mathbf1_A$ とすれば

$$
\nu(A)=\int_Ah\,d\rho.
$$

### 3.2 証明：$0\le h\le1$

$B=\{h<0\}$ に正の $\rho$-測度があれば $\nu(B)=\int_Bh\,d\rho<0$ となり矛盾します。従って $h\ge0$ a.e. です。

また

$$
\mu(A)=\rho(A)-\nu(A)=\int_A(1-h)\,d\rho.
$$

同様に $\{h>1\}$ は $\rho$-測度0なので $h\le1$ a.e. です。さらに $D=\{h=1\}$ について

$$
\mu(D)=0.
$$

$\nu\ll\mu$ より $\nu(D)=0$ でもあるので $\rho(D)=0$。従って $h<1$ が $\rho$-a.e. で成り立ちます。

### 3.3 証明：密度を作る

$D^c$ 上で

$$
f=\frac{h}{1-h}
$$

とし、$D$ 上では $f=0$ とします。$f$ は非負可測です。また

$$
d\mu=(1-h)\,d\rho
$$

という積分表示から

$$
\begin{aligned}
\int_Af\,d\mu
&=\int_Af(1-h)\,d\rho\\
&=\int_Ah\,d\rho\\
&=\nu(A).
\end{aligned}
$$

有限測度の場合の存在が示されました。

### 3.4 証明：$\sigma$ 有限の場合

$\mu,\nu$ が $\sigma$ 有限なので、$\Omega$ を互いに素な可測集合 $D_1,D_2,\dots$ に分けて

$$
\mu(D_k)<\infty,
\qquad
\nu(D_k)<\infty
$$

とできます。各 $D_k$ 上の制限測度に有限測度版を適用して

$$
\nu(A\cap D_k)=\int_{A\cap D_k}f_k\,d\mu
$$

となる $f_k$ を取ります。

$$
f=\sum_{k=1}^\infty f_k\mathbf1_{D_k}
$$

と置けば

$$
\int_Af\,d\mu
=\sum_{k=1}^\infty\nu(A\cap D_k)
=\nu(A).
$$

### 3.5 証明：一意性

$f,g$ がともにRadon--Nikodym微分だとします。各 $D_k$ 上では積分が有限です。もし $\{f>g\}\cap D_k$ が正の測度を持てば、ある $m,n$ について

$$
A_{m,n}=D_k\cap\{g\le m\}\cap\{f\ge g+1/n\}
$$

が正の測度を持ちます。この集合上では

$$
\int_{A_{m,n}}f\,d\mu
\ge
\int_{A_{m,n}}g\,d\mu
+\frac1n\mu(A_{m,n}),
$$

となり、両積分が等しいことに矛盾します。従って $f\le g$ a.e.。役割を交換すれば $g\le f$ a.e. なので

$$
\boxed{f=g\quad\mu\text{-a.e.}}
$$

です。
<!-- proof-end -->

---

## 4. pdfの正体

実数上のLebesgue測度を $\lambda$ とします。確率分布 $P_X$ が $P_X\ll\lambda$ なら

$$
f_X=\frac{dP_X}{d\lambda}
$$

が存在して

$$
\boxed{P(X\in A)=\int_Af_X(x)\,dx}
$$

です。これがpdfです。

---

## 5. 離散分布では数え上げ測度を使う

台 $S$ 上の数え上げ測度 $\#$ を使えば離散分布も $P_X\ll\#$ です。一点 $x\in S$ について

$$
P_X(\{x\})
=\int_{\{x\}}\frac{dP_X}{d\#}\,d\#
=\frac{dP_X}{d\#}(x),
$$

従って

$$
\boxed{\frac{dP_X}{d\#}(x)=P(X=x)}.
$$

Radon--Nikodym微分がpmfになります。

---

## 6. 支配測度

<a id="def-f0-00p2-dominating-measure"></a>

<!-- formal-statement-start -->
> **定義（支配測度）**  
> 同じ可測空間上の統計モデル $\{P_\theta:\theta\in\Theta\}$ に対し、測度 $\mu$ が

$$
P_\theta\ll\mu
\qquad(\forall\theta\in\Theta)
$$

> を満たすとき、$\mu$ をこの統計モデルの支配測度と呼びます。
<!-- formal-statement-end -->

### 6.1 例：Bernoulliモデル

$\Omega=\{0,1\}$ 上のBernoulliモデルと数え上げ測度 $\#$ を考えます。

<!-- definition-example-start: def-f0-00p2-dominating-measure -->
**定義の確認**  
任意の $A\subseteq\{0,1\}$ について

$$
\#(A)=0\Longrightarrow A=\varnothing.
$$

従って任意の $p\in[0,1]$ について $P_p(A)=0$ です。よって

$$
P_p\ll\#
\qquad(\forall p\in[0,1]),
$$

なので $\#$ はBernoulliモデルの支配測度です。
<!-- definition-example-end -->

支配測度があれば

$$
p_\theta=\frac{dP_\theta}{d\mu}
$$

を共通の記法で扱えます。

---

## 演習

### F0-00P2-A01 Bernoulli分布を数え上げ測度で書く

- Level: A
- 目安時間: 10分

$P(X=1)=p$, $P(X=0)=1-p$ とする。$\{0,1\}$ 上の数え上げ測度 $\#$ に対する $P_X$ のRadon--Nikodym微分を求め、定義式を確認せよ。

<!-- solution-start -->
#### 詳細解答
$f(0)=1-p$, $f(1)=p$ と置く。任意の $A\subseteq\{0,1\}$ について

$$
\int_Af\,d\#=\sum_{x\in A}f(x)=P_X(A),
$$

だから $f=dP_X/d\#$ である。

#### 本番答案
$$
\frac{dP_X}{d\#}(x)=p^x(1-p)^{1-x},\qquad x=0,1.
$$

#### 採点基準（20点）
- 2点での密度: 8点
- RN定義式の確認: 8点
- 結論: 4点
<!-- solution-end -->

### F0-00P2-B01 支配測度を変えても同じ分布

- Level: B
- 目安時間: 15分

有限集合 $S$ 上で $\nu(\{x\})=w_x>0$ とする。確率質量 $p_x=P(X=x)$ を持つ分布の $\nu$ に関するRadon--Nikodym微分 $f$ を求めよ。

<!-- solution-start -->
#### 詳細解答
一点集合で $p_x=f(x)w_x$ だから

$$
f(x)=\frac{p_x}{w_x}.
$$

従って

$$
\int_Af\,d\nu
=\sum_{x\in A}\frac{p_x}{w_x}w_x
=\sum_{x\in A}p_x
=P(X\in A).
$$

#### 本番答案
$$
f(x)=\frac{p_x}{w_x},
\qquad
\int_Af\,d\nu=P(X\in A).
$$

#### 採点基準（20点）
- 一点集合から密度を導く: 8点
- 積分計算: 8点
- 分布との一致: 4点
<!-- solution-end -->

---

## 次に進む

密度を統一したら [F0-00P2A 期待値・LOTUS](../F0_00P2A_期待値_LOTUS/index.md) で、確率変数の期待値を分布上の積分へ移します。
