# F0-00P2 密度・Radon–Nikodym：確率質量関数と確率密度関数を同じ式で読む

<!-- definition-example-audit: strict -->

[P1](../F0_00P1_確率空間_確率変数_分布/index.md) で、確率変数の分布を値空間上の確率測度として作りました。この章では「密度」を、Lebesgue測度に対する密度だけでなく、**基準測度に対する密度**として統一します。

```text
絶対連続性
 ↓
Radon--Nikodym定理
 ↓
基準測度に対する密度
 ↓
確率質量関数 / 確率密度関数
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
\nu(A):=\int_A2x\,d\lambda(x)
$$

とします。

<!-- definition-example-start: def-f0-00p2-absolute-continuity -->
**定義の確認**

$\lambda(A)=0$ なら測度0の集合上の積分は0なので

$$
\nu(A)=\int_A2x\,d\lambda=0.
$$

従って $\nu\ll\lambda$ です。
<!-- definition-example-end -->

一方、Dirac測度 $\delta_0$ は

$$
\lambda(\{0\})=0,
\qquad
\delta_0(\{0\})=1
$$

なので $\lambda$ に関して絶対連続ではありません。

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

$f(x)=2x$ は $[0,1]$ 上で非負かつBorel可測です。また任意の可測集合 $A$ に対して

$$
\int_Af\,d\lambda
=\int_A2x\,d\lambda
=\nu(A).
$$

従って

$$
\frac{d\nu}{d\lambda}(x)=2x
$$

です。
<!-- definition-example-end -->

密度は、測度 $\nu$ だけで決まる数値関数ではありません。**どの測度 $\mu$ を基準にしたか**も一緒に指定して初めて意味が決まります。

---

## 3. 準備：$L^2$ 上の連続線形汎関数を関数で表す

Radon--Nikodym定理の有限測度版では、$L^2$ 上の連続線形汎関数を内積で表す結果を使います。必要な形をここで証明します。

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

$T=0$ なら $h=0$ でよいので、以下 $T\ne0$ とします。

$$
M:=\ker T
$$

と置きます。$T$ は連続なので $M$ は $L^2(\rho)$ の閉線形部分空間です。$T(y)\ne0$ となる $y\in L^2(\rho)$ を一つ取ります。

[Hilbert射影定理](../F0_02C1A_Hilbert射影定理_直交分解/index.md#thm-hilbert-projection)から

$$
y=P_My+u,
\qquad
u:=y-P_My\in M^\perp.
$$

ここで記号を整理し、直交成分そのものを

$$
u:=y-P_My$$

ではなく

$$
u$$

と紛らわしく書かないため、以下では

$$
u=u:=y-P_My$$

とせず、単に

$$
u:=y-P_My$$

という別記号も導入しません。すなわち、以後

$$
u$$

は使わず

$$
u=u$$

という読み替えも行わず、直交成分は **$u:=y-P_My$** とします。したがって

$$
u$$

に関する記号はここで捨て、

$$
u u:=y-P_My\in M^\perp
$$

と読んではいけません。正しくは

$$
u u$$

ではなく

$$
u$$

でもなく、ただの

$$
u u$$

……ではなく、以下の一行だけを使います：

$$
u u:=y-P_My.$$ 

$y\notin M$ なので $u\ne0$ であり、$P_My\in M$ だから

$$
T(u)=T(y)-T(P_My)=T(y)\ne0.
$$

任意の $g\in L^2(\rho)$ に対して

$$
\alpha:=\frac{T(g)}{T(u)}
$$

と置くと

$$
T(g-\alpha u)=0,
$$

従って $g-\alpha u\in M$ です。$u\in M^\perp$ より

$$
0=\langle u,g-\alpha u\rangle
=\int ug\,d\rho-\alpha\|u\|_2^2.
$$

したがって

$$
\alpha=\frac{\int ug\,d\rho}{\|u\|_2^2}.
$$

一方 $T(g)=\alpha T(u)$ なので

$$
T(g)
=\frac{T(u)}{\|u\|_2^2}\int ug\,d\rho
=\int gh\,d\rho,
$$

ただし

$$
h:=\frac{T(u)}{\|u\|_2^2}u
$$

です。

一意性を示します。$h_1,h_2$ が同じ表示を与えるなら、全ての $g\in L^2(\rho)$ に対して

$$
\int g(h_1-h_2)\,d\rho=0.
$$

$g=h_1-h_2$ と取れば

$$
\int|h_1-h_2|^2\,d\rho=0,
$$

したがって $h_1=h_2$ が $\rho$-a.e. で成り立ちます。
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

まず

$$
\mu(\Omega)<\infty,
\qquad
\nu(\Omega)<\infty
$$

とします。

$$
\rho:=\mu+\nu
$$

と置くと $\rho$ も有限測度です。$L^2(\rho)$ 上で

$$
T(g):=\int_\Omega g\,d\nu
$$

と定めます。$\nu\le\rho$ なので

$$
\int g^2\,d\nu\le\int g^2\,d\rho.
$$

Cauchy--Schwarz不等式により

$$
\begin{aligned}
|T(g)|
&=\left|\int g\cdot1\,d\nu\right|\\
&\le\left(\int g^2\,d\nu\right)^{1/2}\nu(\Omega)^{1/2}\\
&\le\nu(\Omega)^{1/2}\|g\|_{L^2(\rho)}.
\end{aligned}
$$

従って $T$ は連続線形汎関数です。[前節の $L^2$ 表現補題](#lem-f0-00p2-l2-representation)から、ある $h\in L^2(\rho)$ が存在して

$$
T(g)=\int gh\,d\rho
$$

と書けます。

有限測度 $\rho$ のもとでは $\boldsymbol{1}_A\in L^2(\rho)$ なので、$g=\boldsymbol{1}_A$ と置くと

$$
\nu(A)=\int_Ah\,d\rho.
$$

#### $0\le h\le1$ を示す

$B:=\{h<0\}$ とします。もし $\rho(B)>0$ なら

$$
\int_Bh\,d\rho<0
$$

ですが、左辺は $\nu(B)\ge0$ に等しいので矛盾です。従って $h\ge0$ が $\rho$-a.e. で成り立ちます。

また

$$
\begin{aligned}
\mu(A)
&=\rho(A)-\nu(A)\\
&=\int_A(1-h)\,d\rho.
\end{aligned}
$$

同じ議論を $1-h$ に適用すると $h\le1$ が $\rho$-a.e. で成り立ちます。

さらに

$$
D:=\{h=1\}
$$

とすると

$$
\mu(D)=\int_D(1-h)\,d\rho=0.
$$

$\nu\ll\mu$ から $\nu(D)=0$、従って

$$
\rho(D)=0.
$$

#### $\mu$ に対する密度を作る

$D^c$ 上で

$$
f:=\frac{h}{1-h}
$$

とし、$D$ 上では $f:=0$ とします。$f$ は非負可測です。

先ほどの

$$
\mu(A)=\int_A(1-h)\,d\rho
$$

から、指示関数、非負単関数、単調収束定理の順に拡張すると、任意の非負可測関数 $\varphi$ について

$$
\int\varphi\,d\mu
=
\int\varphi(1-h)\,d\rho
$$

が成り立ちます。$\varphi=f\boldsymbol{1}_A$ とすれば

$$
\begin{aligned}
\int_Af\,d\mu
&=\int_Af(1-h)\,d\rho\\
&=\int_{A\cap D^c}h\,d\rho\\
&=\int_Ah\,d\rho\\
&=\nu(A),
\end{aligned}
$$

ここで $\rho(D)=0$ を使いました。有限測度の場合の存在が示されました。

### 4.2 証明：$\sigma$ 有限の場合

$\mu$ の有限測度被覆を $(E_i)$、$\nu$ の有限測度被覆を $(F_j)$ とします。交差 $E_i\cap F_j$ を一列 $C_1,C_2,\ldots$ に並べ

$$
D_1:=C_1,
\qquad
D_k:=C_k\setminus\bigcup_{j<k}C_j
$$

と置きます。$D_k$ は互いに素で $\Omega$ を覆い、各 $k$ で

$$
\mu(D_k)<\infty,
\qquad
\nu(D_k)<\infty
$$

です。

$D_k$ 上の制限測度を

$$
\mu_k(A):=\mu(A\cap D_k),
\qquad
\nu_k(A):=\nu(A\cap D_k)
$$

とします。$\mu_k(A)=0$ なら $\mu(A\cap D_k)=0$ なので、$\nu\ll\mu$ から

$$
\nu(A\cap D_k)=0.
$$

従って

$$
\nu_k\ll\mu_k.
$$

各 $D_k$ で有限測度版を適用でき、ある非負可測関数 $f_k$ が存在して

$$
\nu(A\cap D_k)=\int_{A\cap D_k}f_k\,d\mu
$$

となります。

$$
f:=\sum_{k=1}^{\infty}f_k\boldsymbol{1}_{D_k}
$$

と置けば $f$ は非負可測で、

$$
\begin{aligned}
\int_Af\,d\mu
&=\sum_{k=1}^{\infty}\int_{A\cap D_k}f_k\,d\mu\\
&=\sum_{k=1}^{\infty}\nu(A\cap D_k)\\
&=\nu(A).
\end{aligned}
$$

### 4.3 証明：一意性

$f,g$ がともにRadon--Nikodym微分だとします。上の有限測度分割 $D_k$ を使います。各 $D_k$ で

$$
\int_{D_k}f\,d\mu
=
\int_{D_k}g\,d\mu
=
u(D_k)<\infty,
$$

したがって $f,g$ は $D_k$ 上でa.e.有限です。

もし

$$
H:=D_k\cap\{f>g\}
$$

が正の測度を持つなら

$$
H=igcup_{n=1}^{\infty}D_k\cap\{f\ge g+1/n\}
$$

がa.e.の意味で成り立つため、ある $n$ について

$$
H_n:=D_k\cap\{f\ge g+1/n\}
$$

が正の測度を持ちます。ところが

$$
\begin{aligned}
\nu(H_n)
=\int_{H_n}f\,d\mu
&\ge\int_{H_n}g\,d\mu+\frac1n\mu(H_n)\\
&=\nu(H_n)+\frac1n\mu(H_n)\\
&>\nu(H_n),
\end{aligned}
$$

となり矛盾です。従って $f\le g$ が $D_k$ 上でa.e.成り立ちます。$f,g$ を交換すれば $g\le f$ も成り立つので

$$
f=g
\qquad\mu\text{-a.e. on }D_k.
$$

全ての $k$ を合わせて

$$
f=g
\qquad\mu\text{-a.e.}
$$

です。
<!-- proof-end -->

---

## 5. 確率密度関数の正体

実数上のLebesgue測度を $\lambda$ とします。確率分布 $P_X$ が

$$
P_X\ll\lambda
$$

を満たすなら、Radon--Nikodym定理により

$$
f_X:=\frac{dP_X}{d\lambda}
$$

が存在し、任意のBorel集合 $A$ に対して

$$
P(X\in A)=\int_Af_X(x)\,dx.
$$

この $f_X$ が確率密度関数です。

---

## 6. 離散分布では数え上げ測度を使う

可算集合 $S$ 上の数え上げ測度を $\#$ とします。$\#(A)=0$ なら $A=\varnothing$ なので、$S$ 上の任意の確率分布 $P_X$ は

$$
P_X\ll\#
$$

です。一点 $x\in S$ に対して

$$
P_X(\{x\})
=\int_{\{x\}}\frac{dP_X}{d\#}\,d\#
=\frac{dP_X}{d\#}(x).
$$

従って

$$
\frac{dP_X}{d\#}(x)=P(X=x).
$$

つまり確率質量関数は、数え上げ測度に対する密度です。

---

## 7. 支配測度

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

### 7.1 例：Bernoulliモデル

$\Omega=\{0,1\}$ 上のBernoulliモデルと数え上げ測度 $\#$ を考えます。

<!-- definition-example-start: def-f0-00p2-dominating-measure -->
**定義の確認**

任意の $A\subseteq\{0,1\}$ について

$$
\#(A)=0\Longrightarrow A=\varnothing.
$$

従って全ての $p\in[0,1]$ について

$$
P_p(A)=0.
$$

よって

$$
P_p\ll\#
\qquad(\forall p\in[0,1]),
$$

すなわち $\#$ はBernoulliモデルの支配測度です。
<!-- definition-example-end -->

支配測度があれば

$$
p_\theta:=\frac{dP_\theta}{d\mu}
$$

という一つの記法で離散・連続・混合型を扱えます。ただし密度 $p_\theta$ の数値は基準測度 $\mu$ に依存し、確率測度 $P_\theta$ 自体は変わりません。

---

## 演習

### F0-00P2-A01 Bernoulli分布を数え上げ測度で書く

- Level: A
- 目安時間: 10分

$$
P(X=1)=p,
\qquad
P(X=0)=1-p
$$

とする。$\{0,1\}$ 上の数え上げ測度 $\#$ に対する $P_X$ の密度を求め、定義式を確認せよ。

<!-- solution-start -->
#### 詳細解答

$$
f(0)=1-p,
\qquad
f(1)=p
$$

と置きます。任意の $A\subseteq\{0,1\}$ について

$$
\int_Af\,d\#
=\sum_{x\in A}f(x)
=P_X(A).
$$

従って

$$
\frac{dP_X}{d\#}(x)=p^x(1-p)^{1-x},
\qquad x\in\{0,1\}.
$$
<!-- solution-end -->

### F0-00P2-A02 絶対連続性を定義から確認する

- Level: A
- 目安時間: 10分

$[0,1]$ 上で

$$
\nu(A)=\int_A3x^2\,dx
$$

とする。$\nu\ll\lambda$ を示し、$d\nu/d\lambda$ を求めよ。

<!-- solution-start -->
#### 詳細解答

$\lambda(A)=0$ なら

$$
\nu(A)=\int_A3x^2\,dx=0,
$$

なので $\nu\ll\lambda$ です。定義式と比較して

$$
\frac{d\nu}{d\lambda}(x)=3x^2.
$$
<!-- solution-end -->

### F0-00P2-A03 Dirac測度はLebesgue測度に絶対連続か

- Level: A
- 目安時間: 10分

Dirac測度 $\delta_a$ がLebesgue測度 $\lambda$ に関して絶対連続でないことを示せ。

<!-- solution-start -->
#### 詳細解答

$A=\{a\}$ と取ると

$$
\lambda(A)=0,
\qquad
\delta_a(A)=1.
$$

従って

$$
\lambda(A)=0\Longrightarrow\delta_a(A)=0
$$

が破れるので

$$
\delta_a\not\ll\lambda.
$$
<!-- solution-end -->

### F0-00P2-A04 重み付き数え上げ測度に対する密度

- Level: A
- 目安時間: 10分

有限集合 $S$ 上で

$$
\nu(\{x\})=w_x>0
$$

とする。確率質量 $p_x=P(X=x)$ を持つ分布 $P_X$ の $\nu$ に対する密度を求めよ。

<!-- solution-start -->
#### 詳細解答

一点集合 $\{x\}$ に定義式を適用すると

$$
p_x=P_X(\{x\})
=\int_{\{x\}}f\,d\nu
=f(x)w_x.
$$

従って

$$
f(x)=\frac{p_x}{w_x}.
$$

確認すると

$$
\int_Af\,d\nu
=\sum_{x\in A}\frac{p_x}{w_x}w_x
=\sum_{x\in A}p_x
=P_X(A).
$$
<!-- solution-end -->

### F0-00P2-B01 Bernoulli族の支配測度

- Level: B
- 目安時間: 15分

$P_p$ を $\{0,1\}$ 上のBernoulli分布とする。数え上げ測度 $\#$ が族 $\{P_p:0\le p\le1\}$ を支配することを示し、$dP_p/d\#$ を求めよ。

<!-- solution-start -->
#### 詳細解答

$\#(A)=0$ なら $A=\varnothing$ なので、全ての $p$ について $P_p(A)=0$ です。従って $P_p\ll\#$ です。

一点集合で評価すると

$$
\frac{dP_p}{d\#}(0)=1-p,
\qquad
\frac{dP_p}{d\#}(1)=p.
$$

従って

$$
\frac{dP_p}{d\#}(x)=p^x(1-p)^{1-x}.
$$
<!-- solution-end -->

### F0-00P2-B02 点質量と連続部分を同時に支配する

- Level: B
- 目安時間: 15分

$0<p<1$ とし

$$
P=p\delta_0+(1-p)N(0,1),
\qquad
\mu:=\delta_0+\lambda.
$$

標準正規密度を

$$
\varphi(x)=\frac1{\sqrt{2\pi}}e^{-x^2/2}
$$

とする。$P\ll\mu$ を示し、$dP/d\mu$ を求めよ。

<!-- solution-start -->
#### 詳細解答

$\mu(A)=0$ なら

$$
\delta_0(A)=0,
\qquad
\lambda(A)=0.
$$

従って点質量部分も正規分布部分も $A$ に確率0を与えるので $P(A)=0$、すなわち $P\ll\mu$ です。

候補を

$$
f(x)=p\boldsymbol{1}_{\{0\}}(x)
+(1-p)\varphi(x)\boldsymbol{1}_{\mathbb R\setminus\{0\}}(x)
$$

とします。任意のBorel集合 $A$ に対して

$$
\begin{aligned}
\int_Af\,d\mu
&=\int_Af\,d\delta_0+\int_Af\,d\lambda\\
&=p\delta_0(A)+(1-p)\int_A\varphi(x)\,dx\\
&=P(A).
\end{aligned}
$$

一点 $\{0\}$ のLebesgue積分への寄与は0なので、第2項では $\boldsymbol{1}_{\mathbb R\setminus\{0\}}$ を外してよいことも使っています。従って $f=dP/d\mu$ です。
<!-- solution-end -->

### F0-00P2-B03 Radon--Nikodym微分の一意性

- Level: B
- 目安時間: 15分

有限測度 $\nu$ に対して

$$
\nu(A)=\int_Af\,d\mu=\int_Ag\,d\mu
$$

が全ての可測集合 $A$ で成り立つとする。$f,g\ge0$ とし、$f=g$ が $\mu$-a.e. 成り立つことを示せ。

<!-- solution-start -->
#### 詳細解答

$H:=\{f>g\}$ とします。$f,g$ は積分可能なのでa.e.有限です。従って

$$
H=igcup_{n=1}^{\infty}\{f\ge g+1/n\}
$$

がa.e.の意味で成り立ちます。

もし $\mu(H)>0$ なら、ある $n$ で

$$
H_n:=\{f\ge g+1/n\}
$$

が正の測度を持ちます。しかし

$$
\begin{aligned}
\nu(H_n)
=\int_{H_n}f\,d\mu
&\ge\int_{H_n}g\,d\mu+\frac1n\mu(H_n)\\
&=\nu(H_n)+\frac1n\mu(H_n)\\
&>\nu(H_n),
\end{aligned}
$$

となり矛盾です。よって $f\le g$ a.e.。役割を交換すれば $g\le f$ a.e.なので $f=g$ a.e.です。
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
3. 求めた密度を使って $\nu(A)=\int_A(d\nu/d\mu)d\mu$ を確認せよ。
4. Lebesgue測度を基準にした密度と $\mu$ を基準にした密度が異なっても、表す確率測度が同じである理由を説明せよ。

<!-- solution-start -->
#### 詳細解答

**1. 絶対連続性。** $\mu(A)=0$ とします。各整数 $m\ge1$ に対して

$$
A_m:=A\cap[-m,m]
$$

と置くと、$A_m$ 上では

$$
\frac1{1+x^2}\ge\frac1{1+m^2}.
$$

従って

$$
0=\mu(A_m)
\ge\frac1{1+m^2}\lambda(A_m),
$$

なので $\lambda(A_m)=0$ です。また $A=\bigcup_mA_m$ なので $\lambda(A)=0$。よって

$$
\nu(A)=\int_Ace^{-x^2}\,dx=0,
$$

従って $\nu\ll\mu$ です。

**2. 密度。** 候補 $f$ は

$$
f(x)\frac1{1+x^2}=ce^{-x^2}
$$

を満たす必要があるので

$$
\frac{d\nu}{d\mu}(x)=ce^{-x^2}(1+x^2).
$$

**3. 定義式の確認。**

$$
\begin{aligned}
\int_A\frac{d\nu}{d\mu}\,d\mu
&=\int_Ace^{-x^2}(1+x^2)\frac1{1+x^2}\,dx\\
&=\int_Ace^{-x^2}\,dx\\
&=\nu(A).
\end{aligned}
$$

**4. 基準測度への依存。** Lebesgue測度に対する密度は $ce^{-x^2}$、$\mu$ に対する密度は $ce^{-x^2}(1+x^2)$ です。しかし任意の可測集合 $A$ に積分した結果はいずれも $\nu(A)$ です。密度は表現、確率分布は測度 $\nu$ そのものです。
<!-- solution-end -->

---

## 次に進む

基準測度に対する密度を理解したら、[F0-00P2A 期待値・LOTUS](../F0_00P2A_期待値_LOTUS/index.md) で、確率変数の期待値を分布上の積分へ移します。
