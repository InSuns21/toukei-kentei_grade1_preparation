# QM3 射影・PVM・スペクトル定理

<!-- definition-example-audit: strict -->

> **既出概念への参照**：[QM2 の有限次元 Born 則](../QM2/index.md#axiom-qm2-born-rule)、[FA5 のスペクトル・レゾルベント](../FA5/index.md#def-fa5-resolvent-spectrum)、[FA7 の自己共役有界作用素](../FA7/index.md#def-fa7-self-adjoint)、[測度・Borel σ代数](../F0_00D2_測度_可測関数_Lebesgue積分_Lp/index.md)、[Lebesgue 積分](../F0_00D2A_単関数_Lebesgue積分_構成/index.md)、[単調収束・優収束](../F0_00D2B_単調収束_Fatou_優収束/index.md)、[Zorn の補題](../F0_00A3_半順序_Zorn_極大延長/index.md#thm-zorn)、[実 Stone--Weierstrass 定理](../RA8/index.md#thm-ra8-stone-weierstrass)、[Riesz--Markov 正汎関数版](../MT5/index.md#thm-mt5-riesz-markov-positive)を使います。

QM2 では、有限次元の観測量を

$$
A=\sum_{j=1}^m a_jP_j
$$

と書き、結果 $a_j$ の確率を

$$
\Pr_\psi(A=a_j)
=
\langle\psi,P_j\psi\rangle
$$

で与えました。

この式は非常に強力ですが、無限次元へ進むと一つ問題が生じます。

**一般の有界自己共役作用素は、固有値だけを並べても作用素全体を復元できない**からです。

たとえば $H=L^2([0,1])$ 上の座標乗算作用素

$$
(M_xf)(t)=t f(t)
$$

を考えます。$M_x$ は有界自己共役ですが、

$$
M_xf=\lambda f
$$

を満たす非零 $f\in L^2([0,1])$ は存在しません。実際、

$$
(t-\lambda)f(t)=0
$$

がほとんど至るところ成り立つため、$f$ は一点集合 $\{\lambda\}$ の外で0です。一点集合の Lebesgue 測度は0なので、$L^2$ の元として $f=0$ です。

それでも $M_x$ のスペクトルは

$$
\sigma(M_x)=[0,1]
$$

です。ここは固有値とは別に確認できます。

まず $z\notin[0,1]$ なら

$$
\delta
=
\operatorname{dist}(z,[0,1])
>0
$$

なので

$$
\frac1{t-z}
$$

は $[0,1]$ 上で有界です。従って

$$
(M_x-zI)^{-1}g
=
\frac{g(t)}{t-z}
$$

は有界作用素で、$z$ はレゾルベント集合に入ります。

逆に $\lambda\in[0,1]$ とします。$\lambda$ の近くの長さ $O(1/n)$ の区間に台を持つ単位ベクトル $f_n$ を取れば、その台上で

$$
|t-\lambda|
\le
\frac1n
$$

とできるため

$$
\|(M_x-\lambda I)f_n\|_2
\le
\frac1n.
$$

もし $M_x-\lambda I$ が有界逆を持てば、

$$
1
=
\|f_n\|_2
\le
\|(M_x-\lambda I)^{-1}\|
\,
\|(M_x-\lambda I)f_n\|_2
\to0
$$

となって矛盾です。従って $\lambda\in\sigma(M_x)$ です。

したがって、QM2 の

$$
\text{固有値 }a_j
\longleftrightarrow
\text{射影 }P_j
$$

という離散的な辞書を、

$$
\boxed{
\text{Borel 集合 }B\subset\mathbb R
\longleftrightarrow
\text{射影 }E_A(B)
}
$$

へ拡張する必要があります。

この $E_A$ が **射影値測度**です。本章では

$$
A=\int_{\sigma(A)}\lambda\,dE_A(\lambda)
$$

という有界自己共役作用素のスペクトル定理を構成し、

$$
\Pr_\psi(A\in B)
=
\langle\psi,E_A(B)\psi\rangle
$$

という一般の Born 則へ QM2 を拡張します。

---

## 1. 直交射影を「集合ごと」に割り当てる

有限次元で

$$
A=\sum_{j=1}^m a_jP_j
$$

と書けているとします。

Borel 集合 $B\subset\mathbb R$ に対し

$$
E_A(B)
=
\sum_{a_j\in B}P_j
$$

と置けば、$B$ に入る測定値に対応する固有空間をまとめて取り出せます。

たとえば

$$
A=
\begin{pmatrix}
-2&0&0\\
0&1&0\\
0&0&4
\end{pmatrix}
$$

で

$$
B=[0,2]
$$

なら、$B$ に入る固有値は $1$ だけなので

$$
E_A([0,2])
=
\begin{pmatrix}
0&0&0\\
0&1&0\\
0&0&0
\end{pmatrix}.
$$

一方、

$$
C=(-\infty,1]
$$

なら

$$
E_A(C)
=
\begin{pmatrix}
1&0&0\\
0&1&0\\
0&0&0
\end{pmatrix}.
$$

有限次元ではこのように、**集合に含まれる固有値の射影を足す**だけです。

一般化の目標は、この規則を固有値のない連続スペクトルにも意味を持つ形にすることです。

---

## 2. 射影値測度

射影値測度は、普通の測度の「非負実数値」を「直交射影値」に置き換えたものです。

ただし単に作用素値で可算加法的ならよいわけではありません。集合の共通部分が射影の積に対応することが重要です。

<a id="def-qm3-pvm"></a>

<!-- formal-statement-start -->
### 定義（射影値測度）

$H$ を複素 Hilbert 空間、$K\subset\mathbb R$ を Borel 集合とする。

$K$ の Borel σ代数 $\mathcal B(K)$ 上の **射影値測度**とは、各 $B\in\mathcal B(K)$ に直交射影

$$
E(B)\in\mathcal B(H)
$$

を対応させる写像

$$
E:\mathcal B(K)\to\mathcal B(H)
$$

で、次を満たすものである。

1. 正規化：
   $$
   E(\varnothing)=0,
   \qquad
   E(K)=I.
   $$

2. 交わりと積：
   $$
   E(B\cap C)=E(B)E(C)
   \qquad
   (B,C\in\mathcal B(K)).
   $$

3. 強可算加法性：互いに素な $B_1,B_2,\dots$ に対し、任意の $x\in H$ について
   $$
   E\left(\bigcup_{n=1}^{\infty}B_n\right)x
   =
   \sum_{n=1}^{\infty}E(B_n)x
   $$
   が $H$ のノルムで収束する。
<!-- formal-statement-end -->

### 直接例：有限次元の固有値分解は PVM になる

<!-- definition-example-start: def-qm3-pvm -->

QM2 の有限次元観測量

$$
A=\sum_{j=1}^m a_jP_j
$$

で、$P_jP_k=0$ $(j\ne k)$、$\sum_jP_j=I$ とします。

$$
E_A(B)
=
\sum_{a_j\in B}P_j
$$

と定めます。

まず

$$
E_A(\varnothing)=0,
\qquad
E_A(\mathbb R)=\sum_jP_j=I.
$$

また、ある $a_j$ が $B\cap C$ に入るのは $B$ と $C$ の両方に入るときだけなので、

$$
E_A(B)E_A(C)
=
\sum_{a_j\in B}
\sum_{a_k\in C}
P_jP_k
=
\sum_{a_j\in B\cap C}P_j
=
E_A(B\cap C).
$$

さらに固有値は有限個しかないので、互いに素な $B_n$ に対する可算和も実際には有限個の非零項しか持ちません。

従って $E_A$ は射影値測度です。

<!-- definition-example-end -->

ここで QM2 の射影測定は「有限個の原子だけを持つ PVM」だったと見直せます。

---

## 3. なぜ可算加法性は作用素ノルムではなく強収束なのか

普通の測度では

$$
\mu\left(\bigcup_nB_n\right)
=
\sum_n\mu(B_n)
$$

と数値で書けます。

PVM では右辺は作用素級数です。自然な収束は、各ベクトル $x$ に作用させた後の

$$
\sum_nE(B_n)x
$$

がノルム収束することです。

互いに素な $B_n$ なら

$$
E(B_n)E(B_m)=0
\qquad
(n\ne m)
$$

なので、$E(B_n)x$ は互いに直交します。

従って

$$
\left\|
\sum_{n=1}^N E(B_n)x
\right\|^2
=
\sum_{n=1}^N
\|E(B_n)x\|^2
\le
\|x\|^2.
$$

部分和は Cauchy になり、Hilbert 空間の完備性から強収束します。

一方、作用素ノルム収束は一般には強すぎます。無限個の互いに直交する非零射影があると、各射影のノルムは1なので、尾項が作用素ノルムで小さくなるとは限りません。

---

## 4. 射影値積分：まず単関数から作る

PVM があれば、数値測度に対する Lebesgue 積分と同じ発想で関数を積分できます。

まず

$$
s(\lambda)
=
\sum_{j=1}^m c_j\mathbf 1_{B_j}(\lambda)
$$

を、互いに素な Borel 集合 $B_j$ 上の有界単関数とします。

このとき

$$
\int s(\lambda)\,dE(\lambda)
$$

を

$$
\sum_{j=1}^m c_jE(B_j)
$$

と定義します。

<a id="def-qm3-spectral-integral"></a>

<!-- formal-statement-start -->
### 定義（有界 Borel 関数の射影値積分）

$E$ を $K\subset\mathbb R$ 上の射影値測度とする。

有界 Borel 関数 $f:K\to\mathbb C$ に対し、有界単関数列 $s_n$ を

$$
\|s_n-f\|_\infty\to0
$$

となるように取る。

単関数に対して

$$
\int_K s_n\,dE
=
\sum_j c_{n,j}E(B_{n,j})
$$

と定め、

$$
\int_K f\,dE
=
\lim_{n\to\infty}
\int_K s_n\,dE
$$

を作用素ノルム極限で定める。これを **射影値積分**という。
<!-- formal-statement-end -->

### 直接例：二値関数を積分する

<!-- definition-example-start: def-qm3-spectral-integral -->

$B\subset K$ を Borel 集合とし、

$$
f
=
3\mathbf 1_B-2\mathbf 1_{K\setminus B}
$$

とします。

これは既に単関数なので、

$$
\int_K f\,dE
=
3E(B)-2E(K\setminus B).
$$

PVM の規則から

$$
E(K\setminus B)=I-E(B)
$$

なので、

$$
\int_K f\,dE
=
5E(B)-2I.
$$

関数の値が集合ごとの射影の係数へそのまま移った形です。

<!-- definition-example-end -->

### ノルム評価

単関数

$$
s=\sum_jc_j\mathbf 1_{B_j}
$$

に対し、任意の $x\in H$ について

$$
\begin{aligned}
\left\|
\left(\int s\,dE\right)x
\right\|^2
&=
\left\|
\sum_j c_jE(B_j)x
\right\|^2\\
&=
\sum_j|c_j|^2\|E(B_j)x\|^2\\
&\le
\|s\|_\infty^2
\sum_j\|E(B_j)x\|^2\\
&\le
\|s\|_\infty^2\|x\|^2.
\end{aligned}
$$

従って

$$
\left\|
\int s\,dE
\right\|
\le
\|s\|_\infty.
$$

この評価により、一様近似する単関数列の積分は作用素ノルムで Cauchy になります。

---

## 5. 有界自己共役作用素から連続関数計算を作る

スペクトル定理の存在証明では、いきなり PVM を作るのではなく、まず多項式

$$
p(A)
$$

を連続関数

$$
f(A)
$$

へ拡張します。

### 5.1 自己共役作用素ではノルムとスペクトル半径が一致する

$S=S^*$ とします。

Hilbert 空間上の有界作用素では

$$
\|T^*T\|=\|T\|^2
$$

が成り立ちます。従って自己共役 $S$ では

$$
\|S^2\|
=
\|S^*S\|
=
\|S\|^2.
$$

これを繰り返すと

$$
\|S^{2^n}\|
=
\|S\|^{2^n}.
$$

FA5 のスペクトル半径公式

$$
r(S)
=
\lim_{m\to\infty}
\|S^m\|^{1/m}
$$

へ $m=2^n$ を入れると

$$
r(S)=\|S\|.
$$

自己共役 $A$ の実係数多項式 $p(A)$ も自己共役です。

複素係数多項式については $T=p(A)$ と置きます。$A$ と $A^*$ は同じ作用素なので $T$ と $T^*$ はともに $A$ の多項式となり、互いに可換です。従って $T$ は正規作用素です。

正規性から

$$
(T^n)^*T^n
=
(T^*T)^n.
$$

よって C*-恒等式と、正の自己共役作用素 $T^*T$ に対する先ほどの結果から

$$
\begin{aligned}
\|T^n\|^2
&=
\|(T^n)^*T^n\|\\
&=
\|(T^*T)^n\|.
\end{aligned}
$$

特に $n=2^k$ と取れば

$$
\|(T^*T)^{2^k}\|
=
\|T^*T\|^{2^k}
=
\|T\|^{2^{k+1}},
$$

したがって

$$
\|T^{2^k}\|
=
\|T\|^{2^k}.
$$

スペクトル半径公式へ $2^k$ 乗の部分列を入れて

$$
r(T)=\|T\|.
$$

従って

$$
\|p(A)\|
=
r(p(A))
$$

です。

さらに [FA5 の多項式スペクトル写像定理](../FA5/index.md#thm-fa5-polynomial-spectral-mapping)から

$$
\sigma(p(A))
=
p(\sigma(A)).
$$

従って

$$
\boxed{
\|p(A)\|
=
\max_{\lambda\in\sigma(A)}
|p(\lambda)|
}
$$

です。

### 5.2 多項式から連続関数へ

$sigma(A)$ は FA5 によりコンパクトで、自己共役性から $sigma(A)subsetmathbb R$ です。

ここでは [RA8 の実 Stone--Weierstrass 定理](../RA8/index.md#thm-ra8-stone-weierstrass)を使います。$sigma(A)$ 上の実多項式の制限全体は、

- 定数関数を含む。
- 和・積・実数倍で閉じる。
- 異なる $lambda,muinsigma(A)$ を、座標関数 $xmapsto x$ が分離する。

ので、$C(sigma(A),mathbb R)$ に一様ノルムで稠密です。

複素数値の $fin C(sigma(A))$ については

$$
f=operatorname{Re}f+ioperatorname{Im}f
$$

と分けます。実多項式列 $p_n,q_n$ を

$$
p_n	ooperatorname{Re}f,
qquad
q_n	ooperatorname{Im}f
$$

と一様近似するように取れば、

$$
p_n+i q_n	o f
$$

も一様収束します。

従って、任意の $fin C(sigma(A))$ は複素係数多項式で一様近似できます。

<a id="lem-qm3-continuous-functional-calculus"></a>

<!-- formal-statement-start -->
### 補題（有界自己共役作用素の連続関数計算）

$A$ を複素 Hilbert 空間 $H$ 上の有界自己共役作用素とする。

各 $f\in C(\sigma(A))$ に対し、多項式列 $p_n$ を

$$
\|p_n-f\|_{\infty,\sigma(A)}
\to0
$$

となるように選び、

$$
f(A)
=
\lim_{n\to\infty}p_n(A)
$$

と定める。

この極限は作用素ノルムで存在し、多項式近似列の選び方に依存しない。

さらに

$$
\|f(A)\|
=
\|f\|_{\infty,\sigma(A)},
$$

$$
(fg)(A)=f(A)g(A),
$$

$$
\overline f(A)=f(A)^*
$$

が成り立つ。
<!-- formal-statement-end -->

<!-- proof-start -->
### 証明

多項式 $p,q$ に対し、前節の等式から

$$
\|p(A)-q(A)\|
=
\|(p-q)(A)\|
=
\|p-q\|_{\infty,\sigma(A)}.
$$

従って $p_n\to f$ が一様収束すれば $p_n(A)$ は作用素ノルムで Cauchy です。$\mathcal B(H)$ は Banach 空間なので極限が存在します。

別の多項式列 $q_n\to f$ を取っても

$$
\|p_n(A)-q_n(A)\|
=
\|p_n-q_n\|_\infty
\to0
$$

だから極限は同じです。

また

$$
\|f(A)\|
=
\lim_n\|p_n(A)\|
=
\lim_n\|p_n\|_\infty
=
\|f\|_\infty.
$$

積については $p_n\to f$、$q_n\to g$ とすると

$$
p_nq_n\to fg
$$

が一様収束し、

$$
p_n(A)q_n(A)
=
(p_nq_n)(A).
$$

両辺を作用素ノルム極限へ送って

$$
f(A)g(A)=(fg)(A).
$$

随伴についても

$$
p_n(A)^*
=
\overline{p_n}(A)
$$

から極限を取れば

$$
f(A)^*=\overline f(A)
$$

を得ます。
<!-- proof-end -->

---

## 6. Riesz--Markov をスペクトルへつなぐ

PVM を構成するため、[MT5 の Riesz--Markov 正汎関数版](../MT5/index.md#thm-mt5-riesz-markov-positive)を使います。

MT5 の定理は局所コンパクト Hausdorff 空間 $X$ 上の $C_c(X)$ に対する結果です。本章では

$$
K=sigma(A)
$$

と置きます。$K$ は実数直線のコンパクト部分集合なので局所コンパクト Hausdorff であり、コンパクト空間上では

$$
C_c(K)=C(K)
$$

です。

従って、線形汎関数

$$
L:C(K)	omathbb C
$$

が

$$
fge0
quadLongrightarrowquad
L(f)ge0
$$

を満たせば、MT5 の定理をそのまま適用でき、一意な有限 Radon 測度、従って有限 Borel 測度 $mu$ が存在して

$$
L(f)
=
int_K f,dmu
$$

と表せます。

本章で新しく行うのは Riesz--Markov の再証明ではなく、この表現測度から cyclic subspace 上の乗算作用素模型と PVM を組み立てる部分です。

---

## 7. cyclic subspace では自己共役作用素は乗算作用素になる

$A$ を有界自己共役作用素、$u\in H$ を非零ベクトルとします。

$$
H_u
=
\overline{
\{p(A)u:
p\text{ は多項式}\}
}
$$

を $u$ が生成する cyclic subspace と呼びます。

まず

$$
L_u(f)
=
\langle u,f(A)u\rangle
\qquad
(f\in C(\sigma(A)))
$$

と置きます。

$f\ge0$ なら $\sqrt f$ も連続なので、

$$
f(A)
=
\sqrt f(A)^*\sqrt f(A)
$$

です。従って

$$
L_u(f)
=
\|\sqrt f(A)u\|^2
\ge0.
$$

つまり $L_u$ は線形で、非負関数を非負数へ送ります。

[MT5 の Riesz--Markov 正汎関数版](../MT5/index.md#thm-mt5-riesz-markov-positive)により、ある有限 Borel 測度 $\mu_u$ が一意に存在して

$$
\langle u,f(A)u\rangle
=
\int_{\sigma(A)}f(\lambda)\,d\mu_u(\lambda)
$$

となります。

特に $f=1$ とすると

$$
\mu_u(\sigma(A))
=
\|u\|^2.
$$

### 多項式模型の等長性

多項式 $p$ に対し

$$
W_u\bigl(p(A)u\bigr)
=
[p]
$$

と置きます。右辺は $L^2(\mu_u)$ における同値類です。

まず well-defined 性を確認します。もし

$$
p(A)u=q(A)u
$$

なら

$$
(p-q)(A)u=0.
$$

後で示すノルム等式から

$$
\|p-q\|_{L^2(\mu_u)}=0
$$

となるので、$p=q$ は $\mu_u$ ほとんど至るところ成り立ちます。従って $[p]=[q]$ で、$W_u$ は代表多項式の選び方に依存しません。

次に、この写像がノルムを保つことを確認します。

$$
\begin{aligned}
\|p(A)u\|^2
&=
\langle p(A)u,p(A)u\rangle\\
&=
\langle u,p(A)^*p(A)u\rangle\\
&=
\langle u,|p|^2(A)u\rangle\\
&=
\int_{\sigma(A)}
|p(\lambda)|^2\,d\mu_u(\lambda).
\end{aligned}
$$

従って

$$
\|p(A)u\|_H
=
\|p\|_{L^2(\mu_u)}.
$$

よって $W_u$ は等長写像です。

多項式は Weierstrass 近似により $C(\sigma(A))$ で稠密で、有限正則 Borel 測度に対して $C(\sigma(A))$ は $L^2(\mu_u)$ で稠密です。

したがって $W_u$ は閉包へ延長され、

$$
W_u:H_u\to L^2(\sigma(A),\mu_u)
$$

という unitary 作用素になります。

さらに

$$
W_u\bigl(Ap(A)u\bigr)
=
W_u\bigl((\lambda p)(A)u\bigr)
=
\lambda p.
$$

稠密部分空間上で成り立ち、両辺は有界なので全体へ延長して

$$
W_u A|_{H_u} W_u^{-1}
=
M_\lambda,
$$

ただし

$$
(M_\lambda g)(t)=t g(t)
$$

です。

つまり、**cyclic subspace 上では $A$ は座標関数による乗算作用素そのもの**です。

---

## 8. cyclic subspace は reducing になる

$H_u$ は $A$ で不変です。

実際、

$$
A p(A)u
=
(\lambda p)(A)u
$$

なので、多項式で生成される部分を $A$ は保ちます。有界性から閉包 $H_u$ も保ちます。

さらに $A=A^*$ なので、$H_u^\perp$ も不変です。

$x\in H_u^\perp$、$y\in H_u$ とすると

$$
\langle Ax,y\rangle
=
\langle x,Ay\rangle.
$$

$Ay\in H_u$ だから右辺は0です。従って

$$
Ax\in H_u^\perp.
$$

つまり

$$
H
=
H_u\oplus H_u^\perp
$$

の両方を $A$ が保ちます。このような部分空間を reducing subspace と呼びます。

---

## 9. Zorn の補題で Hilbert 空間全体を cyclic pieces に分ける

一般の $H$ が一つの cyclic vector で生成されるとは限りません。

そこで、互いに直交する cyclic reducing subspace の族

$$
\{H_{u_\alpha}\}_{\alpha\in I}
$$

を考えます。

このような族を包含で順序付けます。鎖に対しては、その族の合併を取れば再び互いに直交する cyclic reducing subspace の族なので上界があります。

[Zorn の補題](../F0_00A3_半順序_Zorn_極大延長/index.md#thm-zorn)から極大な族を取れます。

その直交和の閉包を

$$
M
=
\overline{
\bigoplus_{\alpha\in I}
H_{u_\alpha}
}
$$

とします。

もし

$$
M^\perp\ne\{0\}
$$

なら、非零 $v\in M^\perp$ を一つ取れます。$M^\perp$ は $A$ で不変なので、$v$ が生成する $H_v$ は $M^\perp$ に含まれます。

すると既存の族へ $H_v$ を追加でき、極大性に反します。

従って

$$
H
=
\bigoplus_{\alpha\in I}
H_{u_\alpha}.
$$

各成分は前節により $L^2(\mu_{u_\alpha})$ 上の乗算作用素へ unitary 同値です。

これで一般の自己共役作用素は「乗算作用素の直交和」として理解できます。

---

## 10. 乗算作用素から PVM を作る

$L^2(K,\mu)$ 上の乗算作用素

$$
(M_\lambda f)(t)=t f(t)
$$

を考えます。

Borel 集合 $B\subset K$ に対して

$$
(E(B)f)(t)
=
\mathbf 1_B(t)f(t)
$$

と置きます。

すると

$$
E(B)^2f
=
\mathbf 1_B^2f
=
\mathbf 1_Bf
=
E(B)f
$$

で、

$$
E(B)^*=E(B)
$$

です。従って $E(B)$ は直交射影です。

また

$$
\mathbf 1_B\mathbf 1_C
=
\mathbf 1_{B\cap C}
$$

なので

$$
E(B)E(C)=E(B\cap C).
$$

互いに素な $B_n$ については

$$
\mathbf 1_{\cup_nB_n}
=
\sum_n\mathbf 1_{B_n}
$$

が各点で成り立ちます。

有限部分和との差の $L^2$ ノルムは

$$
\begin{aligned}
&\left\|
\mathbf 1_{\cup_nB_n}f
-
\sum_{n=1}^N
\mathbf 1_{B_n}f
\right\|_2^2\\
&\qquad=
\int_K
\mathbf 1_{\cup_{n>N}B_n}
|f|^2
\,d\mu.
\end{aligned}
$$

被積分関数は各点で0へ収束し、常に $|f|^2$ 以下です。$|f|^2$ は可積分なので、[Lebesgue の優収束定理](../F0_00D2B_単調収束_Fatou_優収束/index.md#thm-f0-00d2b-01)から右辺は0へ収束します。

従って

$$
E\left(\bigcup_nB_n\right)f
=
\sum_nE(B_n)f
$$

が $L^2$ ノルムで成り立ちます。

従ってこれは PVM です。

各 cyclic subspace でこの PVM を作り、前節の unitary 写像で $H_{u_\alpha}$ へ戻し、最後に直交和を取れば $H$ 全体の PVM

$$
E_A
$$

が得られます。

---

## 11. 有界自己共役作用素のスペクトル定理

<a id="thm-qm3-bounded-self-adjoint-spectral"></a>

<!-- formal-statement-start -->
### 定理（有界自己共役作用素のスペクトル定理）

$H$ を複素 Hilbert 空間、$A\in\mathcal B(H)$ を自己共役作用素とする。

このとき $\sigma(A)\subset\mathbb R$ 上に一意な射影値測度

$$
E_A:\mathcal B(\sigma(A))\to\mathcal B(H)
$$

が存在し、

$$
\boxed{
A
=
\int_{\sigma(A)}
\lambda\,dE_A(\lambda)
}
$$

が成り立つ。

さらに任意の有界 Borel 関数 $f$ に対して

$$
f(A)
=
\int_{\sigma(A)}
f(\lambda)\,dE_A(\lambda)
$$

と定めることができる。
<!-- formal-statement-end -->

### 証明の見取り図

証明は次の5段階です。

1. 多項式 $p(A)$ を連続関数 $f(A)$ へ拡張する。
2. 各 cyclic subspace で正線形汎関数から [Riesz--Markov](../MT5/index.md#thm-mt5-riesz-markov-positive) により測度を得る。
3. cyclic subspace を $L^2$ 空間へ unitary 同値に移し、$A$ を座標乗算作用素にする。
4. [Zorn の補題](../F0_00A3_半順序_Zorn_極大延長/index.md#thm-zorn)で Hilbert 空間全体を cyclic subspace の直交和へ分解する。
5. 各 $L^2$ 上の指示関数乗算射影を直交和して $E_A$ を得る。

<!-- proof-start -->
### 証明

第5節から、$A$ には連続関数計算

$$
f\mapsto f(A)
$$

があります。

第7節により、任意の非零 $u$ が生成する cyclic subspace $H_u$ 上で

$$
A|_{H_u}
$$

は、ある有限 Borel 測度 $\mu_u$ に関する

$$
L^2(\sigma(A),\mu_u)
$$

上の座標乗算作用素 $M_\lambda$ と unitary 同値です。

第8節により各 $H_u$ は reducing subspace です。

第9節で [Zorn の補題](../F0_00A3_半順序_Zorn_極大延長/index.md#thm-zorn)を使うと、

$$
H
=
\bigoplus_{\alpha\in I}
H_{u_\alpha}
$$

と直交分解できます。

各成分で

$$
(E_\alpha(B)f)(t)
=
\mathbf 1_B(t)f(t)
$$

と定義し、unitary 写像で $H_{u_\alpha}$ へ戻します。

全体で

$$
E_A(B)
=
\bigoplus_{\alpha\in I}E_\alpha(B)
$$

と置きます。

各 $E_\alpha(B)$ は直交射影なので $E_A(B)$ も直交射影です。正規化と積の規則は成分ごとに成立するため全体でも成立します。

互いに素な $B_n$ に対し、任意の

$$
x=(x_\alpha)_\alpha\in H
$$

について各成分で

$$
E_\alpha\left(\bigcup_nB_n\right)x_\alpha
=
\sum_nE_\alpha(B_n)x_\alpha
$$

がノルム収束します。

有限部分和との差を

$$
d_{N,\alpha}
=
E_\alpha\left(\bigcup_nB_n\right)x_\alpha
-
\sum_{n=1}^NE_\alpha(B_n)x_\alpha
$$

と置くと、

$$
\|d_{N,\alpha}\|
\to0
$$

かつ

$$
\|d_{N,\alpha}\|
\le
\|x_\alpha\|.
$$

直交和のノルムから

$$
\left\|
E_A\left(\bigcup_nB_n\right)x
-
\sum_{n=1}^NE_A(B_n)x
\right\|^2
=
\sum_\alpha
\|d_{N,\alpha}\|^2.
$$

右辺は各 $\alpha$ で0へ収束し、$\|x_\alpha\|^2$ により支配され、

$$
\sum_\alpha\|x_\alpha\|^2
=
\|x\|^2
<\infty.
$$

従って右辺全体も0へ収束し、直交和全体で強可算加法性が成立します。

各 cyclic 成分では $A$ が $M_\lambda$ へ移るため、

$$
A|_{H_{u_\alpha}}
=
\int_{\sigma(A)}
\lambda\,dE_\alpha(\lambda).
$$

直交和を取れば

$$
A
=
\int_{\sigma(A)}
\lambda\,dE_A(\lambda).
$$

これで存在が示されました。

一意性を示します。

$E$ と $F$ がどちらも $A$ を表す PVM とします。多項式 $p$ に対して積分の積法則から

$$
p(A)
=
\int p(\lambda)\,dE(\lambda)
=
\int p(\lambda)\,dF(\lambda).
$$

Weierstrass 近似により、任意の連続関数 $f$ に対しても

$$
\int f\,dE
=
f(A)
=
\int f\,dF.
$$

任意の $x\in H$ に対して

$$
\mu_x^E(B)
=
\langle x,E(B)x\rangle,
\qquad
\mu_x^F(B)
=
\langle x,F(B)x\rangle
$$

と置きます。

すると全ての連続 $f$ に対して

$$
\int f\,d\mu_x^E
=
\left\langle x,\left(\int f\,dE\right)x\right\rangle
=
\left\langle x,\left(\int f\,dF\right)x\right\rangle
=
\int f\,d\mu_x^F.
$$

Riesz--Markov 表現の一意性から

$$
\mu_x^E=\mu_x^F
$$

です。従って任意の Borel 集合 $B$ と任意の $x$ に対して

$$
\langle x,E(B)x\rangle
=
\langle x,F(B)x\rangle.
$$

自己共役作用素の二次形式が全ての $x$ で一致すれば、偏極恒等式により作用素自身が一致します。

従って

$$
E(B)=F(B)
$$

であり、PVM は一意です。
<!-- proof-end -->

---

## 12. 状態から測定値の確率測度を作る

PVM $E_A$ が得られると、QM2 の有限個の確率を一つの確率測度へまとめられます。

<a id="def-qm3-state-spectral-measure"></a>

<!-- formal-statement-start -->
### 定義（状態に付随するスペクトル確率測度）

$A$ を有界自己共役作用素、$E_A$ をそのスペクトル PVM、$\psi\in H$ を

$$
\|\psi\|=1
$$

を満たす純粋状態の単位ベクトル代表とする。

Borel 集合 $B\subset\sigma(A)$ に対し

$$
\mu_\psi^A(B)
=
\langle\psi,E_A(B)\psi\rangle
$$

と定める。

これを $\psi$ における $A$ の **スペクトル確率測度**という。
<!-- formal-statement-end -->

### 直接例：$L^2([0,1])$ の一様状態

<!-- definition-example-start: def-qm3-state-spectral-measure -->

$$
H=L^2([0,1]),
\qquad
(Af)(t)=tf(t)
$$

とします。

単位ベクトル

$$
\psi(t)=1
$$

を取ります。実際、

$$
\|\psi\|_2^2
=
\int_0^1 1\,dt
=
1.
$$

この作用素の PVM は

$$
(E_A(B)f)(t)
=
\mathbf 1_B(t)f(t)
$$

です。

従って

$$
\begin{aligned}
\mu_\psi^A(B)
&=
\langle\psi,E_A(B)\psi\rangle\\
&=
\int_0^1
\overline{1}\,
\mathbf 1_B(t)\,
1\,dt\\
&=
\int_0^1
\mathbf 1_B(t)\,dt.
\end{aligned}
$$

つまり測定値分布は $[0,1]$ 上の一様分布です。

この例では固有値は一つもありませんが、測定値の確率分布は完全に定義されています。

<!-- definition-example-end -->

---

## 13. PVM による Born 則

<a id="prop-qm3-pvm-born"></a>

<!-- formal-statement-start -->
### 命題（PVM による Born 則）

$A$ を有界自己共役観測量、$E_A$ をそのスペクトル PVM、$\psi$ を単位ベクトルとする。

測定結果が Borel 集合 $B\subset\sigma(A)$ に入る確率を

$$
\boxed{
\Pr_\psi(A\in B)
=
\langle\psi,E_A(B)\psi\rangle
}
$$

で与える。

これは有限次元では QM2 の Born 則

$$
\Pr_\psi(A=a_j)
=
\langle\psi,P_j\psi\rangle
$$

を回収する。
<!-- formal-statement-end -->

<!-- proof-start -->
### 証明：有限次元公式の回収

有限次元で

$$
A=\sum_{j=1}^m a_jP_j
$$

なら

$$
E_A(B)
=
\sum_{a_j\in B}P_j.
$$

従って

$$
\begin{aligned}
\Pr_\psi(A\in B)
&=
\left\langle
\psi,
\sum_{a_j\in B}P_j\psi
\right\rangle\\
&=
\sum_{a_j\in B}
\langle\psi,P_j\psi\rangle\\
&=
\sum_{a_j\in B}
\Pr_\psi(A=a_j).
\end{aligned}
$$

特に $B=\{a_j\}$ とすれば QM2 の式そのものになります。
<!-- proof-end -->

### 本当に確率測度になっているか

非負性は

$$
\langle\psi,E_A(B)\psi\rangle
=
\|E_A(B)\psi\|^2
\ge0
$$

から従います。

全体集合では

$$
\mu_\psi^A(\sigma(A))
=
\langle\psi,I\psi\rangle
=
1.
$$

互いに素な $B_n$ について、PVM の強可算加法性から

$$
E_A\left(\bigcup_nB_n\right)\psi
=
\sum_nE_A(B_n)\psi.
$$

内積を $\psi$ と取れば

$$
\mu_\psi^A\left(\bigcup_nB_n\right)
=
\sum_n\mu_\psi^A(B_n).
$$

従って $\mu_\psi^A$ は本当に確率測度です。

---

## 14. 期待値と分散はスペクトル積分になる

QM2 では有限次元で

$$
\mathbb E_\psi[A]
=
\sum_ja_j
\Pr_\psi(A=a_j)
$$

でした。

一般の場合は和を積分に置き換えます。

<a id="prop-qm3-spectral-expectation-variance"></a>

<!-- formal-statement-start -->
### 命題（期待値と分散のスペクトル積分表示）

$A$ を有界自己共役作用素、$\psi$ を単位ベクトルとする。

$\mu_\psi^A$ を状態 $\psi$ に付随するスペクトル確率測度とすると、

$$
\mathbb E_\psi[A]
=
\int_{\sigma(A)}
\lambda\,d\mu_\psi^A(\lambda)
=
\langle\psi,A\psi\rangle
$$

が成り立つ。

さらに

$$
m
=
\langle\psi,A\psi\rangle
$$

とおけば、

$$
\operatorname{Var}_\psi(A)
=
\int_{\sigma(A)}
(\lambda-m)^2
\,d\mu_\psi^A(\lambda)
=
\langle\psi,(A-mI)^2\psi\rangle
$$

が成り立つ。
<!-- formal-statement-end -->

<!-- proof-start -->
### 証明

[本章の有界自己共役作用素のスペクトル定理](#thm-qm3-bounded-self-adjoint-spectral)から

$$
A
=
\int\lambda\,dE_A(\lambda).
$$

従って

$$
\begin{aligned}
\langle\psi,A\psi\rangle
&=
\left\langle
\psi,
\left(
\int\lambda\,dE_A(\lambda)
\right)\psi
\right\rangle\\
&=
\int
\lambda\,
d\langle\psi,E_A(\lambda)\psi\rangle\\
&=
\int
\lambda\,
d\mu_\psi^A(\lambda).
\end{aligned}
$$

分散について、関数

$$
f(\lambda)=(\lambda-m)^2
$$

を有界 Borel 関数計算へ入れると

$$
f(A)
=
(A-mI)^2.
$$

従って同じ計算から

$$
\begin{aligned}
\int
(\lambda-m)^2
\,d\mu_\psi^A(\lambda)
&=
\langle\psi,f(A)\psi\rangle\\
&=
\langle\psi,(A-mI)^2\psi\rangle.
\end{aligned}
$$
<!-- proof-end -->

---

## 15. FA7 のコンパクト自己共役スペクトル定理はどう見えるか

FA7 ではコンパクト自己共役作用素 $K$ に対し、

$$
Kx
=
\sum_j\lambda_jP_jx
$$

という固有値展開を得ました。

一般 PVM の言葉では、

$$
E_K(B)
=
P_{\ker K}\mathbf 1_{\{0\}\subset B}
+
\sum_{\lambda_j\in B}P_j
$$

という原子的 PVM になっています。

つまり FA7 ではスペクトル PVM が原子的だったため、射影値積分が級数へ縮退していました。

$$
\int\lambda\,dE_K(\lambda)
=
\sum_j\lambda_jP_j.
$$

一方、$M_x$ ではスペクトルが $[0,1]$ 全体に連続的に広がり、単なる固有値和では表せません。

この二つを一つの式で包むのが

$$
\boxed{
A=\int\lambda\,dE_A(\lambda)
}
$$

です。

---

## 16. 「スペクトルの点」と「その値が正の確率で出る」は同じではない

$M_x$ の例では

$$
\sigma(M_x)=[0,1]
$$

です。

しかし一様状態 $\psi=1$ なら任意の一点 $\{\lambda\}$ に対して

$$
\Pr_\psi(M_x=\lambda)
=
\mu_\psi^{M_x}(\{\lambda\})
=
0.
$$

それでも

$$
\Pr_\psi(M_x\in[0,1])=1.
$$

連続確率分布で「各一点の確率は0だが区間には正の確率がある」のと同じです。

ここで重要なのは、

- スペクトルは作用素自身の性質。
- スペクトル確率測度は作用素と状態 $\psi$ の両方に依存する。

という区別です。

同じ $A$ でも状態を変えれば測定値分布は変わります。

---

## 17. PVM は普通の確率測度ではない

PVM $E_A(B)$ 自体は確率ではありません。値は数ではなく直交射影です。

確率になるのは、状態 $\psi$ を入れて

$$
\mu_\psi^A(B)
=
\langle\psi,E_A(B)\psi\rangle
$$

とした後です。

この二段階を分けると、

$$
\boxed{
\text{観測量 }A
\longrightarrow
\text{PVM }E_A
\longrightarrow
\text{状態 }\psi
\longrightarrow
\text{確率測度 }\mu_\psi^A
}
$$

という構造が見えます。

QM4 では、二つの観測量 $A,B$ の PVM がどのように両立するかを考えます。そこで非可換性と不確定性関係が主役になります。

---

## 18. 演習

### Level A

<a id="ex-qm3-a01"></a>
#### QM3-A01 有限次元 PVM を作る
- Level: A

$$
A=
\begin{pmatrix}
-1&0&0&0\\
0&2&0&0\\
0&0&2&0\\
0&0&0&5
\end{pmatrix}
$$

とする。

1. $E_A(\{2\})$ を求めよ。
2. $E_A([0,3])$ を求めよ。
3. $E_A((-\infty,2])$ を求めよ。
4. $E_A(\{2\})E_A(\{5\})=0$ を確認せよ。

<!-- solution-start -->
**解答・解説**

固有値 $2$ の固有空間は第2・第3座標なので

$$
E_A(\{2\})
=
\begin{pmatrix}
0&0&0&0\\
0&1&0&0\\
0&0&1&0\\
0&0&0&0
\end{pmatrix}.
$$

$[0,3]$ に入る固有値も $2$ だけなので

$$
E_A([0,3])=E_A(\{2\}).
$$

$(-\infty,2]$ に入る固有値は $-1,2$ なので

$$
E_A((-\infty,2])
=
\begin{pmatrix}
1&0&0&0\\
0&1&0&0\\
0&0&1&0\\
0&0&0&0
\end{pmatrix}.
$$

また

$$
E_A(\{5\})
=
\begin{pmatrix}
0&0&0&0\\
0&0&0&0\\
0&0&0&0\\
0&0&0&1
\end{pmatrix}.
$$

二つは異なる固有空間への直交射影なので積は0です。行列積を直接取っても

$$
E_A(\{2\})E_A(\{5\})=0
$$

となります。
<!-- solution-end -->

<a id="ex-qm3-a02"></a>
#### QM3-A02 PVM から確率測度を作る
- Level: A

QM3-A01 の $A$ に対し

$$
\psi
=
\frac12
\begin{pmatrix}
1\\
1\\
1\\
1
\end{pmatrix}
$$

とする。

$$
\Pr_\psi(A\in[0,3])
$$

を求めよ。

<!-- solution-start -->
**解答・解説**

前問から

$$
E_A([0,3])
=
\operatorname{diag}(0,1,1,0).
$$

従って

$$
E_A([0,3])\psi
=
\frac12
\begin{pmatrix}
0\\
1\\
1\\
0
\end{pmatrix}.
$$

Born 則より

$$
\begin{aligned}
\Pr_\psi(A\in[0,3])
&=
\|E_A([0,3])\psi\|^2\\
&=
\frac14+\frac14\\
&=
\frac12.
\end{aligned}
$$
<!-- solution-end -->

<a id="ex-qm3-a03"></a>
#### QM3-A03 乗算作用素のスペクトル射影
- Level: A

$H=L^2([0,1])$、

$$
(Af)(t)=t f(t)
$$

とする。

$$
B=[0,1/3]
$$

に対する $E_A(B)$ を書き、$E_A(B)^2=E_A(B)$ を確認せよ。

<!-- solution-start -->
**解答・解説**

スペクトル射影は指示関数による乗算です。

$$
(E_A(B)f)(t)
=
\mathbf 1_{[0,1/3]}(t)f(t).
$$

従って

$$
\begin{aligned}
(E_A(B)^2f)(t)
&=
\mathbf 1_{[0,1/3]}(t)
\mathbf 1_{[0,1/3]}(t)
f(t)\\
&=
\mathbf 1_{[0,1/3]}(t)f(t)\\
&=
(E_A(B)f)(t).
\end{aligned}
$$

よって $E_A(B)^2=E_A(B)$ です。また指示関数は実数値なので自己共役でもあり、直交射影です。
<!-- solution-end -->

<a id="ex-qm3-a04"></a>
#### QM3-A04 一様状態の区間確率
- Level: A

前問の $A$ と

$$
\psi(t)=1
$$

に対して

$$
\Pr_\psi(A\in[1/4,3/4])
$$

を求めよ。

<!-- solution-start -->
**解答・解説**

$\psi$ は

$$
\|\psi\|_2^2
=
\int_0^1 1\,dt
=
1
$$

なので単位ベクトルです。

スペクトル確率測度は

$$
\mu_\psi^A(B)
=
\int_0^1\mathbf 1_B(t)\,dt
$$

です。

従って

$$
\begin{aligned}
\Pr_\psi(A\in[1/4,3/4])
&=
\int_0^1
\mathbf 1_{[1/4,3/4]}(t)\,dt\\
&=
\frac34-\frac14\\
&=
\frac12.
\end{aligned}
$$
<!-- solution-end -->

<a id="ex-qm3-a05"></a>
#### QM3-A05 射影値積分の単関数計算
- Level: A

PVM $E$ と Borel 集合 $B$ に対し、

$$
f
=
4\mathbf 1_B
-
\mathbf 1_{K\setminus B}
$$

とする。

$$
\int_Kf\,dE
$$

を $E(B)$ と $I$ で表せ。

<!-- solution-start -->
**解答・解説**

単関数の定義から

$$
\int_Kf\,dE
=
4E(B)-E(K\setminus B).
$$

PVM では

$$
E(K\setminus B)
=
I-E(B)
$$

なので

$$
\begin{aligned}
\int_Kf\,dE
&=
4E(B)-\{I-E(B)\}\\
&=
5E(B)-I.
\end{aligned}
$$
<!-- solution-end -->

### Level B

<a id="ex-qm3-b01"></a>
#### QM3-B01 密度 $2t$ を持つスペクトル分布
- Level: B

$H=L^2([0,1])$、

$$
(Af)(t)=tf(t)
$$

とし、

$$
\psi(t)=\sqrt{2t}
$$

とする。

1. $\psi$ が単位ベクトルであることを示せ。
2. $\mu_\psi^A$ の密度を求めよ。
3. $\mathbb E_\psi[A]$ を求めよ。

<!-- solution-start -->
**解答・解説**

まず

$$
\|\psi\|_2^2
=
\int_0^1 2t\,dt
=
1.
$$

従って単位ベクトルです。

任意の Borel 集合 $B\subset[0,1]$ に対し

$$
\begin{aligned}
\mu_\psi^A(B)
&=
\langle\psi,E_A(B)\psi\rangle\\
&=
\int_0^1
\mathbf 1_B(t)|\psi(t)|^2\,dt\\
&=
\int_B 2t\,dt.
\end{aligned}
$$

従って Lebesgue 測度に関する密度は

$$
2t
$$

です。

期待値は

$$
\begin{aligned}
\mathbb E_\psi[A]
&=
\int_0^1 t\cdot 2t\,dt\\
&=
2\int_0^1t^2\,dt\\
&=
\frac23.
\end{aligned}
$$

内積で確認すると

$$
\langle\psi,A\psi\rangle
=
\int_0^1
\sqrt{2t}\,
t\sqrt{2t}\,dt
=
\frac23
$$

で一致します。
<!-- solution-end -->

<a id="ex-qm3-b02"></a>
#### QM3-B02 連続スペクトルでは一点確率が0でもよい
- Level: B

QM3-B01 と同じ $A,\psi$ に対し、任意の $\lambda\in[0,1]$ について

$$
\Pr_\psi(A=\lambda)=0
$$

を示せ。

その一方で

$$
\Pr_\psi(A\in[1/2,1])
$$

を求めよ。

<!-- solution-start -->
**解答・解説**

一点集合 $\{\lambda\}$ の Lebesgue 測度は0なので

$$
\Pr_\psi(A=\lambda)
=
\int_{\{\lambda\}}2t\,dt
=
0.
$$

一方、

$$
\begin{aligned}
\Pr_\psi(A\in[1/2,1])
&=
\int_{1/2}^1 2t\,dt\\
&=
\left[t^2\right]_{1/2}^1\\
&=
1-\frac14\\
&=
\frac34.
\end{aligned}
$$

各一点の確率が0でも、区間全体には正の確率があります。これは連続分布と同じ構造です。
<!-- solution-end -->

<a id="ex-qm3-b03"></a>
#### QM3-B03 cyclic subspace が reducing になる理由
- Level: B

$A=A^*$、$u\in H$ とし

$$
H_u
=
\overline{\{p(A)u\}}
$$

とする。

1. $AH_u\subset H_u$ を示せ。
2. $AH_u^\perp\subset H_u^\perp$ を示せ。
3. 自己共役性がどこで使われたか説明せよ。

<!-- solution-start -->
**解答・解説**

まず多項式 $p$ に対して

$$
A p(A)u
=
(\lambda p)(A)u.
$$

右辺も多項式を $A$ に代入したベクトルなので、生成集合を $A$ は保ちます。

$A$ は有界だから、生成集合の閉包へ作用させても

$$
AH_u\subset H_u
$$

です。

次に $x\in H_u^\perp$、$y\in H_u$ とします。自己共役性から

$$
\langle Ax,y\rangle
=
\langle x,Ay\rangle.
$$

第1問より $Ay\in H_u$ なので、$x\perp H_u$ から

$$
\langle x,Ay\rangle=0.
$$

従って任意の $y\in H_u$ に対して

$$
\langle Ax,y\rangle=0,
$$

すなわち

$$
Ax\in H_u^\perp.
$$

自己共役性は

$$
\langle Ax,y\rangle
=
\langle x,Ay\rangle
$$

と $A$ を一方の変数から他方へ移す箇所で使われています。一般の有界作用素では不変部分空間の直交補が同じ作用素で不変になるとは限りません。
<!-- solution-end -->

### Level C

<a id="ex-qm3-c01"></a>
#### QM3-C01 有限次元と連続スペクトルを一つの PVM で比較する
- Level: C

次の二つの観測量を比較する。

1. $\mathbb C^2$ 上の
   $$
   A_1=
   \begin{pmatrix}
   -1&0\\
   0&1
   \end{pmatrix}.
   $$

2. $L^2([0,1])$ 上の
   $$
   (A_2f)(t)=tf(t).
   $$

次を行え。

1. それぞれの PVM $E_1,E_2$ を明示せよ。
2. $A_1=\int\lambda\,dE_1(\lambda)$ を有限和として確認せよ。
3. $A_2=\int\lambda\,dE_2(\lambda)$ が座標乗算作用素を与えることを[単関数近似](../F0_00D2A_単関数_Lebesgue積分_構成/index.md#thm-simple-function-approximation)の考え方から説明せよ。
4. なぜ $A_1$ では固有値の和で十分だが、$A_2$ では Borel 集合全体に対する PVM が必要か説明せよ。

<!-- solution-start -->
**解答・解説**

まず $A_1$ の固有射影は

$$
P_-=
\begin{pmatrix}
1&0\\
0&0
\end{pmatrix},
\qquad
P_+=
\begin{pmatrix}
0&0\\
0&1
\end{pmatrix}.
$$

従って

$$
E_1(B)
=
\mathbf 1_B(-1)P_-
+
\mathbf 1_B(1)P_+.
$$

射影値積分は原子的な和になり、

$$
\begin{aligned}
\int\lambda\,dE_1(\lambda)
&=
(-1)P_-+(1)P_+\\
&=
\begin{pmatrix}
-1&0\\
0&1
\end{pmatrix}\\
&=
A_1.
\end{aligned}
$$

次に $A_2$ では

$$
(E_2(B)f)(t)
=
\mathbf 1_B(t)f(t).
$$

座標関数 $\lambda$ を単関数 $s_n$ で一様近似します。たとえば $[0,1]$ を長さ $1/n$ の区間へ分け、各区間の左端値を取れば

$$
\|s_n-\lambda\|_\infty
\le
\frac1n.
$$

射影値積分では

$$
\left(
\int s_n\,dE_2
\right)f
=
s_nf.
$$

ノルム評価から

$$
\left\|
\int s_n\,dE_2
-
\int\lambda\,dE_2
\right\|
\le
\|s_n-\lambda\|_\infty
\to0.
$$

一方、

$$
\|s_nf-\lambda f\|_2
\le
\|s_n-\lambda\|_\infty\|f\|_2
\to0.
$$

従って

$$
\left(
\int\lambda\,dE_2(\lambda)
\right)f
=
\lambda f
=
A_2f.
$$

$A_1$ のスペクトルは二点

$$
\{-1,1\}
$$

だけなので、PVM は二つの原子射影 $P_-,P_+$ で完全に決まります。

一方、$A_2$ では固有値が存在せず、スペクトルは区間 $[0,1]$ 全体です。単一点への射影だけでは情報を取り出せないため、区間や一般の Borel 集合 $B$ に対する射影

$$
E_2(B)
$$

が必要になります。

この違いを統一する仕組みが PVM です。
<!-- solution-end -->

---

## 19. この章で何を得たか

QM2 では

$$
A=\sum_ja_jP_j
$$

という有限次元の射影測定を学びました。

本章ではそれを

$$
A
=
\int_{\sigma(A)}
\lambda\,dE_A(\lambda)
$$

へ拡張しました。

その結果、

- 固有値を持たない有界自己共役作用素も扱える。
- Borel 集合 $B$ ごとに「測定値が $B$ に入る成分」を射影 $E_A(B)$ で取り出せる。
- 状態 $\psi$ を与えると
  $$
  \mu_\psi^A(B)
  =
  \langle\psi,E_A(B)\psi\rangle
  $$
  という確率測度が得られる。
- 期待値と分散は有限和ではなくスペクトル積分で統一される。
- FA7 のコンパクト自己共役作用素の固有値展開は、原子的 PVM の特別な場合として回収される。

という一般理論が得られました。

次の QM4 では、一つの観測量のスペクトル分解から離れ、

$$
AB\ne BA
$$

となる二つの観測量を同時に考えます。

そこで初めて、

$$
\text{非可換性}
\longrightarrow
\text{同時測定可能性}
\longrightarrow
\text{Robertson 型不確定性関係}
$$

という問題へ進みます。
