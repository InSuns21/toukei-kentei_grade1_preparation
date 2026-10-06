# QM6 非有界自己共役作用素のスペクトル定理

<!-- definition-example-audit: strict -->

> **既出概念**：[QM3 の射影値測度と有界スペクトル積分](../QM3/index.md#def-qm3-pvm)、[QM3 の有界自己共役作用素のスペクトル定理](../QM3/index.md#thm-qm3-bounded-self-adjoint-spectral)、[QM5 の自己共役作用素](../QM5/index.md#def-qm5-self-adjoint)、[QM5 の位置・運動量作用素](../QM5/index.md)を使います。

QM3 では有界自己共役作用素 $A$ を

$$
A=\int \lambda\,dE_A(\lambda)
$$

と表しました。有界なら $|\lambda|\le \|A\|$ なので、この積分は全ての $x\in H$ に作用できます。

しかし QM5 の位置作用素

$$
(Q\psi)(x)=x\psi(x)
$$

や運動量作用素

$$
P=\mathcal F^{-1}(\hbar M_\xi)\mathcal F
$$

は非有界です。ここでは「スペクトル表示がある」だけでは足りません。どの $x$ に対して

$$
\int \lambda\,dE_A(\lambda)x
$$

が Hilbert 空間のベクトルとして収束するかまで決める必要があります。

本章の中心式は

$$
\boxed{
D(A)
=
\left\{
x\in H:
\int_{\mathbb R}\lambda^2\,d\mu_x^A(\lambda)<\infty
\right\}
}
$$

です。ここで

$$
\mu_x^A(B)=\langle x,E_A(B)x\rangle
$$

です。非有界性は、作用素の式ではなく**定義域を決める二次モーメント条件**として現れます。

---

## 1. PVM からベクトルごとの測度を作る

$E$ を $\mathbb R$ 上の PVM とします。QM3 と同じく、任意の $x\in H$ に対して

$$
\mu_x(B)
=
\langle x,E(B)x\rangle
=
\|E(B)x\|^2
$$

と置きます。

$\mu_x$ は有限正測度で、

$$
\mu_x(\mathbb R)=\|x\|^2
$$

です。

座標関数 $\lambda$ は非有界なので、そのまま QM3 の有界 Borel 関数積分へ入れられません。そこで

$$
a_N(\lambda)
=
\lambda\mathbf 1_{[-N,N]}(\lambda)
$$

と切断します。$a_N$ は有界なので

$$
T_N
=
\int_{\mathbb R}a_N(\lambda)\,dE(\lambda)
$$

は QM3 の意味で有界作用素です。

PVM の積分の等長性から

$$
\|T_Nx-T_Mx\|^2
=
\int_{\mathbb R}
|a_N(\lambda)-a_M(\lambda)|^2
\,d\mu_x(\lambda)
$$

が成り立ちます。

この式が、非有界積分の定義域を教えます。

---

## 2. 非有界スペクトル積分

座標関数の切断 $a_N$ に対して、$T_Nx$ が収束するためには

$$
\int \lambda^2\,d\mu_x(\lambda)<\infty
$$

が自然な条件です。

<a id="def-qm6-unbounded-spectral-integral"></a>

<!-- formal-statement-start -->
### 定義（非有界スペクトル積分）

$E$ を $\mathbb R$ 上の PVM とする。各 $x\in H$ に対し

$$
\mu_x(B)=\langle x,E(B)x\rangle
$$

と置く。

$$
D(T_E)
=
\left\{
x\in H:
\int_{\mathbb R}\lambda^2\,d\mu_x(\lambda)<\infty
\right\}
$$

と定め、$x\in D(T_E)$ に対し

$$
T_Ex
=
\lim_{N\to\infty}
\int_{\mathbb R}
\lambda\mathbf 1_{[-N,N]}(\lambda)
\,dE(\lambda)x
$$

と定める。

これを座標関数 $\lambda$ の **非有界スペクトル積分**と書き、

$$
T_E=\int_{\mathbb R}\lambda\,dE(\lambda)
$$

と表す。
<!-- formal-statement-end -->

<!-- definition-example-start: def-qm6-unbounded-spectral-integral -->

**定義の確認**

### 直接例：$\ell^2$ 上の対角 PVM

$H=\ell^2$ とし、Borel 集合 $B\subset\mathbb R$ に対して

$$
(E(B)x)_n
=
\mathbf 1_B(n)x_n
$$

とします。

すると

$$
\mu_x(B)
=
\sum_{n\in B}|x_n|^2
$$

なので

$$
\int_{\mathbb R}\lambda^2\,d\mu_x(\lambda)
=
\sum_{n=1}^{\infty}n^2|x_n|^2.
$$

従って

$$
D(T_E)
=
\left\{
x\in\ell^2:
(nx_n)\in\ell^2
\right\}.
$$

また

$$
\left(
\int
\lambda\mathbf 1_{[-N,N]}(\lambda)\,dE(\lambda)x
\right)_n
=
\begin{cases}
nx_n,&n\le N,\\
0,&n>N.
\end{cases}
$$

なので $N\to\infty$ で

$$
T_Ex=(nx_n).
$$

QM5 の最大実対角作用素の定義域と作用をそのまま回収しました。

<!-- definition-example-end -->

---

## 3. 二次モーメント条件は本当に収束条件になっている

<a id="prop-qm6-unbounded-integral-domain"></a>

<!-- formal-statement-start -->
### 命題（非有界スペクトル積分の定義域とノルム）

上の $T_E$ について、$x\in D(T_E)$ なら

$$
\boxed{
\|T_Ex\|^2
=
\int_{\mathbb R}\lambda^2\,d\mu_x(\lambda)
}
$$

が成り立つ。

また $D(T_E)$ は $H$ に稠密である。
<!-- formal-statement-end -->

<!-- proof-start -->
### 証明

まず $x\in D(T_E)$ とします。$N>M$ なら

$$
a_N-a_M
=
\lambda\mathbf 1_{\{M<|\lambda|\le N\}}.
$$

従って

$$
\begin{aligned}
\|T_Nx-T_Mx\|^2
&=
\int
|a_N-a_M|^2\,d\mu_x\\
&=
\int_{\{M<|\lambda|\le N\}}
\lambda^2\,d\mu_x.
\end{aligned}
$$

$\lambda^2$ は $\mu_x$ 可積分なので右辺は $M,N\to\infty$ で0へ収束します。よって $(T_Nx)$ は Cauchy 列であり、$H$ の完備性から収束します。

さらに

$$
\|T_Nx\|^2
=
\int_{[-N,N]}\lambda^2\,d\mu_x.
$$

右辺は $N$ とともに単調増加し、単調収束定理から

$$
\lim_{N\to\infty}\|T_Nx\|^2
=
\int_{\mathbb R}\lambda^2\,d\mu_x.
$$

一方 $T_Nx\to T_Ex$ なのでノルムの連続性より

$$
\|T_Ex\|^2
=
\int_{\mathbb R}\lambda^2\,d\mu_x.
$$

次に稠密性を示します。任意の $x\in H$ に対して

$$
x_N=E([-N,N])x
$$

と置きます。すると

$$
\int\lambda^2\,d\mu_{x_N}(\lambda)
=
\int_{[-N,N]}\lambda^2\,d\mu_x(\lambda)
\le
N^2\|x\|^2,
$$

なので $x_N\in D(T_E)$ です。

また $[-N,N]\uparrow\mathbb R$ だから PVM の強可算加法性から

$$
E([-N,N])x\to E(\mathbb R)x=x.
$$

従って $D(T_E)$ は $H$ に稠密です。$\square$
<!-- proof-end -->

---

## 4. 自己共役性を値域で判定する

後でスペクトル積分から作った作用素が自己共役であることを示すため、まず便利な判定法を作ります。

対称作用素 $A$ では

$$
\|(A\pm iI)x\|^2
=
\|Ax\|^2+\|x\|^2
$$

となります。虚数 $\pm i$ を足すと、$Ax$ と $x$ の交差項が対称性によって打ち消し合います。

<a id="thm-qm6-self-adjoint-range-criterion"></a>

<!-- formal-statement-start -->
### 定理（自己共役性の値域判定）

$A:D(A)\subset H\to H$ を稠密定義対称作用素とする。

このとき次は同値である。

1. $A$ は自己共役である。
2. 
   $$
   \operatorname{Ran}(A+iI)=H,
   \qquad
   \operatorname{Ran}(A-iI)=H.
   $$
<!-- formal-statement-end -->

<!-- proof-start -->
### 証明

まず $A$ が自己共役とします。

$x\in D(A)$ に対し、対称性から $\langle Ax,x\rangle$ は実数です。従って

$$
\begin{aligned}
\|(A+iI)x\|^2
&=
\|Ax\|^2+\|x\|^2
+\langle Ax,ix\rangle
+\langle ix,Ax\rangle\\
&=
\|Ax\|^2+\|x\|^2.
\end{aligned}
$$

同様に

$$
\|(A-iI)x\|^2
=
\|Ax\|^2+\|x\|^2.
$$

特に

$$
\|(A\pm iI)x\|\ge \|x\|.
$$

自己共役作用素は QM5 より閉作用素です。したがって $\operatorname{Ran}(A\pm iI)$ は閉じています。実際、$(A\pm iI)x_n$ が Cauchy なら上の評価で $x_n$ も Cauchy で、さらに

$$
Ax_n=(A\pm iI)x_n\mp ix_n
$$

も Cauchy です。$A$ の閉性から極限も $A$ のグラフに属します。

次に直交補を調べます。$y\perp\operatorname{Ran}(A-iI)$ なら

$$
\langle(A-iI)x,y\rangle=0
\qquad(x\in D(A)).
$$

これは

$$
\langle Ax,y\rangle
=
i\langle x,y\rangle
=
\langle x,-iy\rangle
$$

を意味するので

$$
y\in D(A^*),
\qquad
A^*y=-iy.
$$

自己共役性 $A^*=A$ から

$$
Ay=-iy.
$$

すると

$$
0
\le
\|Ay\|^2+\|y\|^2
=
\|(A+iI)y\|^2
=
0
$$

なので $y=0$ です。

従って $\operatorname{Ran}(A-iI)$ は稠密です。すでに閉じているので

$$
\operatorname{Ran}(A-iI)=H.
$$

符号を入れ替えれば

$$
\operatorname{Ran}(A+iI)=H
$$

も得られます。

逆に、二つの値域がともに $H$ とします。

$y\in D(A^*)$ を任意に取り、

$$
z=(A^*+iI)y
$$

と置きます。$\operatorname{Ran}(A+iI)=H$ なので、ある $x\in D(A)$ が存在して

$$
(A+iI)x=z
$$

です。

$A\subset A^*$ だから

$$
(A^*+iI)(y-x)=0.
$$

一方

$$
\ker(A^*+iI)
=
\operatorname{Ran}(A-iI)^\perp.
$$

仮定より $\operatorname{Ran}(A-iI)=H$ なので、この核は $\{0\}$ です。従って

$$
y=x\in D(A).
$$

よって

$$
D(A^*)\subset D(A).
$$

対称性から逆包含 $D(A)\subset D(A^*)$ は既に成り立つので

$$
A=A^*.
$$

したがって $A$ は自己共役です。$\square$
<!-- proof-end -->

---

## 5. PVM から作った実座標積分は自己共役である

<a id="thm-qm6-spectral-integral-self-adjoint"></a>

<!-- formal-statement-start -->
### 定理（実座標のスペクトル積分は自己共役）

$E$ を $\mathbb R$ 上の PVM とし、

$$
T_E=\int_{\mathbb R}\lambda\,dE(\lambda)
$$

を第2節の非有界スペクトル積分として定める。

このとき $T_E$ は稠密定義自己共役作用素である。
<!-- formal-statement-end -->

<!-- proof-start -->
### 証明

稠密性は第3節で示しました。

まず対称性を示します。切断作用素

$$
T_N=\int a_N\,dE
$$

は実数値関数 $a_N$ の有界関数計算なので自己共役です。

$x,y\in D(T_E)$ に対して

$$
T_Nx\to T_Ex,
\qquad
T_Ny\to T_Ey
$$

だから

$$
\begin{aligned}
\langle T_Ex,y\rangle
&=
\lim_N\langle T_Nx,y\rangle\\
&=
\lim_N\langle x,T_Ny\rangle\\
&=
\langle x,T_Ey\rangle.
\end{aligned}
$$

従って $T_E$ は対称です。

次に値域判定を使います。符号を一つ固定して

$$
r_\pm(\lambda)=\frac1{\lambda\pm i}
$$

と置きます。これは有界 Borel 関数で、

$$
|r_\pm(\lambda)|\le1.
$$

任意の $y\in H$ に対し

$$
x_\pm
=
\int r_\pm(\lambda)\,dE(\lambda)y
$$

と置きます。

このベクトルのスペクトル測度は $|r_\pm|^2$ の重みを受けるので

$$
\begin{aligned}
\int\lambda^2\,d\mu_{x_\pm}(\lambda)
&=
\int
\frac{\lambda^2}{\lambda^2+1}
\,d\mu_y(\lambda)\\
&\le
\|y\|^2.
\end{aligned}
$$

従って $x_\pm\in D(T_E)$ です。

さらにスペクトル積分の積の規則から

$$
\begin{aligned}
(T_E\pm iI)x_\pm
&=
\int
(\lambda\pm i)
\frac1{\lambda\pm i}
\,dE(\lambda)y\\
&=
\int 1\,dE(\lambda)y\\
&=
y.
\end{aligned}
$$

よって

$$
\operatorname{Ran}(T_E\pm iI)=H.
$$

第4節の値域判定から $T_E$ は自己共役です。$\square$
<!-- proof-end -->

---

## 6. 非有界作用素を有界なユニタリ作用素へ移す

非有界な $A$ を直接扱う代わりに、$A\pm iI$ の逆作用素を使って全空間上の有界作用素へ移します。

自己共役 $A$ なら前節の値域判定から $A+iI$ は全射であり、

$$
\|(A+iI)x\|\ge\|x\|
$$

なので

$$
(A+iI)^{-1}:H\to D(A)\subset H
$$

は有界です。

そこで

$$
(A-iI)(A+iI)^{-1}
$$

を考えます。次の定義でこの変換に名前を付けます。

<a id="def-qm6-cayley-transform"></a>

<!-- formal-statement-start -->
### 定義（Cayley 変換）

$A:D(A)\subset H\to H$ を自己共役作用素とする。

$$
U_A
=
(A-iI)(A+iI)^{-1}
$$

を $A$ の **Cayley 変換**という。
<!-- formal-statement-end -->

<!-- definition-example-start: def-qm6-cayley-transform -->

**定義の確認**

### 直接例：対角作用素

QM5 の

$$
Ae_n=ne_n
$$

を考えます。すると

$$
U_Ae_n
=
\frac{n-i}{n+i}e_n.
$$

係数の絶対値は

$$
\left|\frac{n-i}{n+i}\right|
=
1
$$

なので、各基底ベクトル上で長さを保ちます。

また

$$
\frac{n-i}{n+i}\ne1
$$

です。実直線上の $n$ が、単位円上の $1$ 以外の点へ送られています。

<!-- definition-example-end -->

<a id="prop-qm6-cayley-properties"></a>

<!-- formal-statement-start -->
### 命題（Cayley 変換の基本性質）

自己共役作用素 $A$ の Cayley 変換 $U=U_A$ はユニタリ作用素である。

さらに

$$
\ker(I-U)=\{0\},
$$

$$
\boxed{
D(A)=\operatorname{Ran}(I-U)
}
$$

であり、この定義域上で

$$
\boxed{
A=i(I+U)(I-U)^{-1}
}
$$

が成り立つ。
<!-- formal-statement-end -->

<!-- proof-start -->
### 証明

任意の $y\in H$ に対し

$$
x=(A+iI)^{-1}y
$$

と置けば $x\in D(A)$ で、

$$
y=(A+iI)x,
\qquad
Uy=(A-iI)x.
$$

対称性から

$$
\|(A+iI)x\|^2
=
\|Ax\|^2+\|x\|^2
=
\|(A-iI)x\|^2.
$$

従って

$$
\|Uy\|=\|y\|.
$$

よって $U$ は等長です。

さらに $A-iI$ も全射なので、任意の $z\in H$ に対し

$$
(A-iI)x=z
$$

となる $x\in D(A)$ を取れます。$y=(A+iI)x$ と置けば $Uy=z$ なので、$U$ は全射です。従って $U$ はユニタリです。

次に

$$
\begin{aligned}
I-U
&=
\{(A+iI)-(A-iI)\}(A+iI)^{-1}\\
&=
2i(A+iI)^{-1}.
\end{aligned}
$$

したがって $(A+iI)^{-1}$ は単射なので

$$
\ker(I-U)=\{0\}.
$$

また $(A+iI)^{-1}$ の値域は $D(A)$ だから

$$
\operatorname{Ran}(I-U)
=
D(A).
$$

同様に

$$
\begin{aligned}
I+U
&=
\{(A+iI)+(A-iI)\}(A+iI)^{-1}\\
&=
2A(A+iI)^{-1}.
\end{aligned}
$$

$x\in D(A)$ を

$$
x=(I-U)h
$$

と書くと、

$$
x=2i(A+iI)^{-1}h.
$$

従って

$$
\begin{aligned}
Ax
&=
2iA(A+iI)^{-1}h\\
&=
i(I+U)h\\
&=
i(I+U)(I-U)^{-1}x.
\end{aligned}
$$

これで全て示されました。$\square$
<!-- proof-end -->

---

## 7. ユニタリ作用素のスペクトル定理を橋にする

QM3 では有界**自己共役**作用素のスペクトル定理を証明しました。Cayley 変換後に現れる $U$ は一般には自己共役ではなくユニタリです。

ここで必要になるのは、有界正規作用素のスペクトル理論のうちユニタリ作用素に限った次の結果です。

<a id="thm-qm6-unitary-spectral"></a>

<!-- formal-statement-start -->
### 定理（ユニタリ作用素のスペクトル定理）

$U:H\to H$ を複素 Hilbert 空間上のユニタリ作用素とする。

このとき単位円

$$
\mathbb T=\{z\in\mathbb C:|z|=1\}
$$

上に一意な PVM $F$ が存在し、

$$
U
=
\int_{\mathbb T}z\,dF(z)
$$

と表せる。
<!-- formal-statement-end -->

本章ではこの定理を**橋渡し定理として用います**。QM3 で行った cyclic subspace・Riesz--Markov・PVM 構成を複素平面上の有界正規作用素へ拡張すると証明できますが、その一般化をここで繰り返すと非有界自己共役作用素の核心から外れます。

本章で新しく証明すべき部分は、この有界な定理から

- 実直線上の PVM を作ること
- 非有界積分の定義域を復元すること
- 元の作用素 $A$ と一致すること
- PVM の一意性を戻すこと

です。そこは以下で省略せずに行います。

---

## 8. 非有界自己共役作用素のスペクトル定理

Cayley 変換で実数 $\lambda$ は

$$
c(\lambda)
=
\frac{\lambda-i}{\lambda+i}
$$

へ送られます。

$c$ は

$$
\mathbb R
\longrightarrow
\mathbb T\setminus\{1\}
$$

の全単射で、逆写像は

$$
\phi(z)
=
i\frac{1+z}{1-z}.
$$

です。

<a id="thm-qm6-unbounded-self-adjoint-spectral"></a>

<!-- formal-statement-start -->
### 定理（非有界自己共役作用素のスペクトル定理）

$A:D(A)\subset H\to H$ を複素 Hilbert 空間上の自己共役作用素とする。

このとき $\mathbb R$ 上に一意な PVM $E_A$ が存在し、任意の $x\in H$ に対して

$$
\mu_x^A(B)
=
\langle x,E_A(B)x\rangle
$$

と置けば

$$
\boxed{
D(A)
=
\left\{
x\in H:
\int_{\mathbb R}\lambda^2
\,d\mu_x^A(\lambda)
<\infty
\right\}
}
$$

であり、$x\in D(A)$ に対して

$$
\boxed{
Ax
=
\int_{\mathbb R}\lambda\,dE_A(\lambda)x
}
$$

が成り立つ。

右辺は第2節の有界切断による非有界スペクトル積分である。
<!-- formal-statement-end -->

### 証明の見取り図

1. $A$ を Cayley 変換してユニタリ作用素 $U$ にする。
2. ユニタリ作用素のスペクトル定理で単位円上の PVM $F$ を得る。
3. $c^{-1}=\phi$ で $F$ を実直線へ戻して PVM $E$ を作る。
4. $E$ から作る非有界積分 $T$ の定義域が $\operatorname{Ran}(I-U)$ と一致することを示す。
5. Cayley 変換の式から $T=A$ を示す。
6. 最後に PVM の一意性を戻す。

<!-- proof-start -->
### 証明

$U=U_A$ を $A$ の Cayley 変換とします。第6節より $U$ はユニタリで、

$$
\ker(I-U)=\{0\}.
$$

ユニタリ作用素のスペクトル定理から、単位円上の一意な PVM $F$ が存在して

$$
U=\int_{\mathbb T}z\,dF(z)
$$

です。

$F(\{1\})$ の値域は $U$ の固有値1の固有空間です。実際、$y=F(\{1\})x$ なら

$$
Uy=y.
$$

逆に $Uy=y$ なら

$$
0
=
\|(U-I)y\|^2
=
\int_{\mathbb T}|z-1|^2\,d\mu_y^F(z)
$$

なので、$\mu_y^F$ は $\{1\}$ に集中し $y=F(\{1\})y$ です。

ところが $\ker(I-U)=\{0\}$ なので

$$
F(\{1\})=0.
$$

次に Borel 集合 $B\subset\mathbb R$ に対して

$$
E(B)=F(c(B))
$$

と置きます。$c$ は $\mathbb R$ と $\mathbb T\setminus\{1\}$ の Borel 同型で、$F(\{1\})=0$ なので $E$ は $\mathbb R$ 上の PVM です。

$E$ から第2節の非有界スペクトル積分

$$
T=\int_{\mathbb R}\lambda\,dE(\lambda)
$$

を作ります。第5節から $T$ は自己共役です。

ここで

$$
D(T)=\operatorname{Ran}(I-U)
$$

を示します。

まず $y=(I-U)h$ とします。単位円側では $I-U$ は関数 $1-z$ の関数計算です。従って

$$
\begin{aligned}
\int_{\mathbb R}\lambda^2\,d\mu_y^E(\lambda)
&=
\int_{\mathbb T}
|\phi(z)|^2|1-z|^2
\,d\mu_h^F(z)\\
&=
\int_{\mathbb T}
|i(1+z)|^2
\,d\mu_h^F(z)\\
&\le
4\|h\|^2.
\end{aligned}
$$

ここで

$$
\phi(z)(1-z)=i(1+z)
$$

を使いました。従って $y\in D(T)$ です。

逆に $y\in D(T)$ とします。

$$
h
=
\frac12(y-iTy)
$$

と置きます。$Ty\in H$ だから $h\in H$ です。

$c(\lambda)=(\lambda-i)/(\lambda+i)$ から

$$
1-c(\lambda)
=
\frac{2i}{\lambda+i}
$$

なので

$$
\frac{1-i\lambda}{2}
=
\frac1{1-c(\lambda)}.
$$

従ってスペクトル積分の積の規則から

$$
\begin{aligned}
(I-U)h
&=
\int
(1-c(\lambda))
\frac{1-i\lambda}{2}
\,dE(\lambda)y\\
&=
\int1\,dE(\lambda)y\\
&=
y.
\end{aligned}
$$

よって

$$
D(T)\subset\operatorname{Ran}(I-U).
$$

両包含から

$$
D(T)=\operatorname{Ran}(I-U).
$$

さらに $y=(I-U)h$ に対して

$$
\begin{aligned}
Ty
&=
\int
\phi(z)(1-z)\,dF(z)h\\
&=
i\int(1+z)\,dF(z)h\\
&=
i(I+U)h.
\end{aligned}
$$

第6節の Cayley 変換の復元式でも

$$
D(A)=\operatorname{Ran}(I-U),
$$

かつ

$$
A(I-U)h=i(I+U)h
$$

でした。従って

$$
D(T)=D(A),
\qquad
Ty=Ay
$$

であり、

$$
T=A.
$$

これで存在と定義域表示が示されました。

最後に一意性を示します。$G$ も同じ $A$ を表す PVM とします。

まず有界 Borel 関数

$
r(\lambda)=\frac1{\lambda+i}
$

を $G$ で積分し、

$
S=\int r(\lambda)\,dG(\lambda)
$

と置きます。

$
\frac{\lambda^2}{|\lambda+i|^2}
=
\frac{\lambda^2}{\lambda^2+1}
\le1
$

なので $Sx\in D(A)$ です。さらに

$
\begin{aligned}
(A+iI)Sx
&=
\int
(\lambda+i)\frac1{\lambda+i}
\,dG(\lambda)x\\
&=
x.
\end{aligned}
$

従って

$
S=(A+iI)^{-1}.
$

そこで

$
\widetilde U
=
\int
\frac{\lambda-i}{\lambda+i}
\,dG(\lambda)
$

と置くと、

$
\begin{aligned}
\widetilde U
&=
(A-iI)S\\
&=
(A-iI)(A+iI)^{-1}\\
&=
U.
\end{aligned}
$

従って $G$ を $c$ で単位円へ押し出した PVM は $U$ のスペクトル PVM です。ユニタリ作用素のスペクトル定理の一意性から、その押し出しは $F$ と一致します。

$c:\mathbb R\to\mathbb T\setminus\{1\}$ は全単射なので、元へ戻せば

$$
G=E.
$$

よって $E_A=E$ は一意です。$\square$
<!-- proof-end -->

---

## 9. 位置作用素では定義域が二次モーメントになる

QM5 の位置作用素

$$
(Q\psi)(x)=x\psi(x)
$$

を考えます。

そのスペクトル PVM は

$$
(E_Q(B)\psi)(x)
=
\mathbf 1_B(x)\psi(x)
$$

です。

従って

$$
\mu_\psi^Q(B)
=
\int_B|\psi(x)|^2\,dx.
$$

非有界スペクトル定理の定義域条件は

$$
\int_{\mathbb R}\lambda^2\,d\mu_\psi^Q(\lambda)
=
\int_{\mathbb R}x^2|\psi(x)|^2\,dx
<\infty.
$$

これは

$$
x\psi(x)\in L^2(\mathbb R)
$$

と同値なので、

$$
D(Q)
=
\{\psi:x\psi\in L^2\}
$$

を正確に回収します。

また

$$
\int\lambda\,dE_Q(\lambda)\psi
=
x\psi(x)
$$

です。

---

## 10. 運動量作用素では Fourier 空間の二次モーメントになる

QM5 では

$$
P
=
\mathcal F^{-1}(\hbar M_\xi)\mathcal F
$$

と構成しました。

したがって Borel 集合 $B\subset\mathbb R$ に対するスペクトル射影は

$$
\boxed{
E_P(B)
=
\mathcal F^{-1}
M_{\mathbf 1_B(\hbar\xi)}
\mathcal F
}
$$

です。

状態 $\psi$ に対して

$$
\mu_\psi^P(B)
=
\int_{\mathbb R}
\mathbf 1_B(\hbar\xi)
|\widehat\psi(\xi)|^2\,d\xi.
$$

従って

$$
\begin{aligned}
\int\lambda^2\,d\mu_\psi^P(\lambda)
&=
\int_{\mathbb R}
\hbar^2\xi^2
|\widehat\psi(\xi)|^2\,d\xi.
\end{aligned}
$$

有限である条件は

$$
\xi\widehat\psi(\xi)\in L^2
$$

であり、QM5 の

$$
D(P)
=
\{\psi:\xi\widehat\psi\in L^2\}
$$

を再び回収します。

---

## 11. 状態は観測量の定義域に入っていなくてもよい

ここは量子力学で重要な点です。

$A$ が非有界でも PVM $E_A(B)$ は**有界な直交射影**なので、任意の単位ベクトル $\psi\in H$ に対して

$$
\Pr_\psi(A\in B)
=
\langle\psi,E_A(B)\psi\rangle
$$

は定義できます。

一方、

$$
\psi\in D(A)
$$

は

$$
\int\lambda^2\,d\mu_\psi^A(\lambda)<\infty
$$

という追加条件です。

### 例：位置測定はできるが $Q\psi$ は定義できない状態

$$
\psi(x)
=
\frac1{\sqrt2(1+|x|)}
$$

とします。

まず

$$
\begin{aligned}
\|\psi\|_2^2
&=
\frac12
\int_{\mathbb R}
\frac{dx}{(1+|x|)^2}\\
&=
\int_0^\infty
\frac{dx}{(1+x)^2}\\
&=
1.
\end{aligned}
$$

なので単位ベクトルです。

しかし

$$
x^2|\psi(x)|^2
=
\frac{x^2}{2(1+|x|)^2}
$$

は $|x|\to\infty$ で $1/2$ に近づくため積分できません。従って

$$
\psi\notin D(Q).
$$

それでも位置が $[-R,R]$ に入る確率は

$$
\begin{aligned}
\Pr_\psi(|Q|\le R)
&=
\int_{-R}^{R}
|\psi(x)|^2\,dx\\
&=
\int_0^R\frac{dx}{(1+x)^2}\\
&=
1-\frac1{1+R}\\
&=
\frac{R}{1+R}.
\end{aligned}
$$

と完全に定義できます。

つまり

$$
\boxed{
\text{測定値分布が存在する}
\not\Rightarrow
\psi\in D(A)
}
$$

です。

---

## 12. 必要最小限の Borel 関数計算

QM7 では

$$
e^{-itA}
$$

を使って時間発展を作ります。そのため、座標関数 $\lambda$ だけでなく Borel 関数 $g(\lambda)$ を作用素へ入れる仕組みが必要です。

非有界 $g$ では、やはり定義域を同時に指定します。

<a id="def-qm6-borel-functional-calculus"></a>

<!-- formal-statement-start -->
### 定義（自己共役作用素の Borel 関数計算）

$A$ を自己共役作用素、$E_A$ をそのスペクトル PVM、$g:\mathbb R\to\mathbb C$ を Borel 関数とする。

$$
D(g(A))
=
\left\{
x\in H:
\int_{\mathbb R}|g(\lambda)|^2
\,d\mu_x^A(\lambda)
<\infty
\right\}
$$

と定める。

$$
g_N(\lambda)
=
g(\lambda)\mathbf 1_{\{|g(\lambda)|\le N\}}
$$

と切断し、$x\in D(g(A))$ に対して

$$
g(A)x
=
\lim_{N\to\infty}
\int_{\mathbb R}g_N(\lambda)\,dE_A(\lambda)x
$$

と定める。
<!-- formal-statement-end -->

<!-- definition-example-start: def-qm6-borel-functional-calculus -->

**定義の確認**

### 直接例：位相関数

$t\in\mathbb R$ に対し

$$
g_t(\lambda)=e^{-it\lambda}
$$

とします。

$$
|g_t(\lambda)|=1
$$

なので任意の $x\in H$ について

$$
\int|g_t|^2\,d\mu_x^A
=
\mu_x^A(\mathbb R)
=
\|x\|^2<\infty.
$$

従って

$$
D(g_t(A))=H.
$$

非有界な $A$ から、全空間上で定義された有界作用素

$$
e^{-itA}
=
\int e^{-it\lambda}\,dE_A(\lambda)
$$

が得られます。

<!-- definition-example-end -->

<a id="prop-qm6-spectral-phase-unitary"></a>

<!-- formal-statement-start -->
### 命題（スペクトル位相作用素はユニタリ）

自己共役作用素 $A$ と $t\in\mathbb R$ に対し

$$
U(t)
=
e^{-itA}
=
\int_{\mathbb R}e^{-it\lambda}\,dE_A(\lambda)
$$

と置く。

このとき $U(t)$ はユニタリで、

$$
U(t)^{-1}=U(-t)
$$

である。
<!-- formal-statement-end -->

<!-- proof-start -->
### 証明

有界 Borel 関数計算の積の規則から

$$
\begin{aligned}
U(t)U(-t)
&=
\int
e^{-it\lambda}e^{it\lambda}
\,dE_A(\lambda)\\
&=
\int1\,dE_A(\lambda)\\
&=
I.
\end{aligned}
$$

同様に

$$
U(-t)U(t)=I.
$$

また複素共役により

$$
U(t)^*
=
\int e^{it\lambda}\,dE_A(\lambda)
=
U(-t).
$$

従って

$$
U(t)^*U(t)=U(t)U(t)^*=I.
$$

よって $U(t)$ はユニタリです。$\square$
<!-- proof-end -->

ここではユニタリ性までを示しました。

$$
t\mapsto U(t)
$$

が強連続であること、逆に強連続1パラメータユニタリ群から自己共役生成作用素を回収できることは QM7 の Stone の定理で扱います。

---

## 13. 自由粒子 Hamiltonian

質量 $m>0$ の一次元自由粒子では、古典力学の運動エネルギー

$$
\frac{p^2}{2m}
$$

に対応して

$$
H_0=\frac{P^2}{2m}
$$

を考えます。

QM5 の Fourier 表現では $P$ は $\hbar\xi$ の乗算なので、$H_0$ は

$$
h(\xi)
=
\frac{\hbar^2\xi^2}{2m}
$$

の乗算作用素になります。

<a id="prop-qm6-free-hamiltonian"></a>

<!-- formal-statement-start -->
### 命題（自由粒子 Hamiltonian のスペクトル表示）

$m>0$ とし、

$$
h(\xi)
=
\frac{\hbar^2\xi^2}{2m}
$$

と置く。

$$
D(H_0)
=
\{\psi\in L^2:h\,\widehat\psi\in L^2\},
$$

$$
H_0
=
\mathcal F^{-1}M_h\mathcal F
$$

と定める。

このとき $H_0$ は自己共役で、そのスペクトル PVM は

$$
E_{H_0}(B)
=
\mathcal F^{-1}
M_{\mathbf 1_B(h(\xi))}
\mathcal F.
$$

さらに

$$
D(H_0)
=
\left\{
\psi:
\int_{\mathbb R}
h(\xi)^2
|\widehat\psi(\xi)|^2\,d\xi
<\infty
\right\}.
$$
<!-- formal-statement-end -->

<!-- proof-start -->
### 証明

$h(\xi)$ は実数値 Borel 関数です。QM5 の最大実乗算作用素と同じ議論により $M_h$ は自己共役です。

$\mathcal F$ はユニタリなので、QM5 の[ユニタリ共役による自己共役性の保存](../QM5/index.md#prop-qm5-unitary-conjugation)から

$$
H_0=\mathcal F^{-1}M_h\mathcal F
$$

も自己共役です。

$M_h$ のスペクトル射影は

$$
(E_{M_h}(B)f)(\xi)
=
\mathbf1_B(h(\xi))f(\xi)
$$

です。ユニタリ共役で戻すと

$$
E_{H_0}(B)
=
\mathcal F^{-1}
M_{\mathbf1_B(h(\xi))}
\mathcal F.
$$

さらに

$$
\mu_\psi^{H_0}(B)
=
\int
\mathbf1_B(h(\xi))
|\widehat\psi(\xi)|^2\,d\xi.
$$

従って非有界スペクトル定理から

$$
\begin{aligned}
\psi\in D(H_0)
&\iff
\int\lambda^2\,d\mu_\psi^{H_0}(\lambda)<\infty\\
&\iff
\int
h(\xi)^2
|\widehat\psi(\xi)|^2\,d\xi<\infty.
\end{aligned}
$$

これは $h\widehat\psi\in L^2$ と同値です。$\square$
<!-- proof-end -->

Fourier 側では

$$
P^2
\longleftrightarrow
\hbar^2\xi^2
$$

なので、この $H_0$ は作用素として $P^2/(2m)$ を与えます。

---

## 14. 演習

### Level A

<a id="ex-qm6-a01"></a>
#### QM6-A01 対角 PVM から定義域を復元する
- Level: A

$\ell^2$ 上で

$$
(E(B)x)_n=\mathbf1_B(n)x_n
$$

とする。

1. $\mu_x(B)$ を求めよ。
2. $D(T_E)$ を求めよ。
3. $T_Ex$ を求めよ。

<!-- solution-start -->
### 詳細解答

第$n$ 成分への射影なので

$$
E(B)x=(\mathbf1_B(n)x_n)_n.
$$

従って

$$
\mu_x(B)
=
\|E(B)x\|^2
=
\sum_{n\in B}|x_n|^2.
$$

よって

$$
\int\lambda^2\,d\mu_x(\lambda)
=
\sum_{n=1}^\infty n^2|x_n|^2.
$$

したがって

$$
D(T_E)
=
\left\{
x\in\ell^2:
\sum n^2|x_n|^2<\infty
\right\}
=
\{x:(nx_n)\in\ell^2\}.
$$

切断積分は

$$
T_Nx=(x_1,2x_2,\ldots,Nx_N,0,0,\ldots)
$$

なので、$x\in D(T_E)$ では

$$
\|T_Nx-(nx_n)\|^2
=
\sum_{n>N}n^2|x_n|^2
\to0.
$$

従って

$$
T_Ex=(nx_n).
$$
<!-- solution-end -->

<a id="ex-qm6-a02"></a>
#### QM6-A02 位置分布は存在するが $Q\psi$ は存在しない
- Level: A

$$
\psi(x)=\frac1{\sqrt2(1+|x|)}
$$

とする。

1. $\|\psi\|_2=1$ を示せ。
2. $\psi\notin D(Q)$ を示せ。
3. $\Pr_\psi(|Q|\le R)$ を求めよ。

<!-- solution-start -->
### 詳細解答

まず

$$
\begin{aligned}
\|\psi\|_2^2
&=
\frac12
\int_{\mathbb R}(1+|x|)^{-2}\,dx\\
&=
\int_0^\infty(1+x)^{-2}\,dx\\
&=
1.
\end{aligned}
$$

次に

$$
\int x^2|\psi(x)|^2\,dx
=
\int
\frac{x^2}{2(1+|x|)^2}\,dx.
$$

被積分関数は $|x|\to\infty$ で $1/2$ に収束するので積分は発散します。従って

$$
\psi\notin D(Q).
$$

一方

$$
\begin{aligned}
\Pr_\psi(|Q|\le R)
&=
\int_{-R}^R|\psi(x)|^2\,dx\\
&=
\int_0^R(1+x)^{-2}\,dx\\
&=
1-\frac1{1+R}\\
&=
\frac{R}{1+R}.
\end{aligned}
$$

$Q\psi$ が定義できなくても、PVM による位置測定分布は定義できます。
<!-- solution-end -->

<a id="ex-qm6-a03"></a>
#### QM6-A03 運動量のスペクトル射影
- Level: A

QM5 の

$$
P=\mathcal F^{-1}(\hbar M_\xi)\mathcal F
$$

に対し、Borel 集合 $B$ へのスペクトル射影 $E_P(B)$ を書け。また $\mu_\psi^P(B)$ を求めよ。

<!-- solution-start -->
### 詳細解答

Fourier 空間では $P$ は実関数 $\hbar\xi$ の乗算です。したがって

$$
M_{\hbar\xi}
$$

の $B$ へのスペクトル射影は

$$
M_{\mathbf1_B(\hbar\xi)}.
$$

ユニタリ Fourier 変換で元へ戻して

$$
E_P(B)
=
\mathcal F^{-1}
M_{\mathbf1_B(\hbar\xi)}
\mathcal F.
$$

よって

$$
\begin{aligned}
\mu_\psi^P(B)
&=
\langle\psi,E_P(B)\psi\rangle\\
&=
\langle\widehat\psi,
M_{\mathbf1_B(\hbar\xi)}
\widehat\psi\rangle\\
&=
\int
\mathbf1_B(\hbar\xi)
|\widehat\psi(\xi)|^2\,d\xi.
\end{aligned}
$$
<!-- solution-end -->

<a id="ex-qm6-a04"></a>
#### QM6-A04 $e^{-itA}$ のユニタリ性
- Level: A

自己共役作用素 $A$ と $t\in\mathbb R$ に対し

$$
U(t)=\int e^{-it\lambda}\,dE_A(\lambda)
$$

とする。$U(t)$ が全空間で定義され、$U(t)^{-1}=U(-t)$ であることを示せ。

<!-- solution-start -->
### 詳細解答

$$
|e^{-it\lambda}|=1
$$

なので任意の $x\in H$ について

$$
\int|e^{-it\lambda}|^2\,d\mu_x^A
=
\|x\|^2<\infty.
$$

従って $D(U(t))=H$ です。

有界関数計算の積の規則から

$$
\begin{aligned}
U(t)U(-t)
&=
\int
e^{-it\lambda}e^{it\lambda}
\,dE_A(\lambda)\\
&=
I.
\end{aligned}
$$

同様に $U(-t)U(t)=I$ なので

$$
U(t)^{-1}=U(-t).
$$

また $U(t)^*=U(-t)$ だから $U(t)$ はユニタリです。
<!-- solution-end -->

### Level B

<a id="ex-qm6-b01"></a>
#### QM6-B01 スペクトル積分が自己共役になる理由
- Level: B

$E$ を $\mathbb R$ 上の PVM とし

$$
T=\int\lambda\,dE(\lambda)
$$

を非有界スペクトル積分として定める。

1. $T$ が対称であることを切断作用素 $T_N$ から示せ。
2. 
   $$
   r_\pm(\lambda)=\frac1{\lambda\pm i}
   $$
   を使い $\operatorname{Ran}(T\pm iI)=H$ を示せ。
3. 自己共役性を結論せよ。

<!-- solution-start -->
### 詳細解答

切断

$$
a_N(\lambda)=\lambda\mathbf1_{[-N,N]}(\lambda)
$$

は実数値なので

$$
T_N=\int a_N\,dE
$$

は有界自己共役です。

$x,y\in D(T)$ に対し $T_Nx\to Tx$, $T_Ny\to Ty$ なので

$$
\langle Tx,y\rangle
=
\lim_N\langle T_Nx,y\rangle
=
\lim_N\langle x,T_Ny\rangle
=
\langle x,Ty\rangle.
$$

従って $T$ は対称です。

次に任意の $y\in H$ に対して

$$
x_\pm=\int r_\pm\,dE\,y
$$

と置きます。

$$
\int\lambda^2\,d\mu_{x_\pm}
=
\int
\frac{\lambda^2}{\lambda^2+1}
\,d\mu_y
\le\|y\|^2
$$

なので $x_\pm\in D(T)$ です。

そして

$$
\begin{aligned}
(T\pm iI)x_\pm
&=
\int
\frac{\lambda\pm i}{\lambda\pm i}
\,dE\,y\\
&=y.
\end{aligned}
$$

従って

$$
\operatorname{Ran}(T\pm iI)=H.
$$

自己共役性の値域判定を適用して $T$ は自己共役です。
<!-- solution-end -->

<a id="ex-qm6-b02"></a>
#### QM6-B02 Cayley 変換から定義域を取り戻す
- Level: B

自己共役 $A$ と

$$
U=(A-iI)(A+iI)^{-1}
$$

について、次を示せ。

1. $I-U=2i(A+iI)^{-1}$。
2. $D(A)=\operatorname{Ran}(I-U)$。
3. $A=i(I+U)(I-U)^{-1}$。

<!-- solution-start -->
### 詳細解答

まず

$$
\begin{aligned}
I-U
&=
\{(A+iI)-(A-iI)\}(A+iI)^{-1}\\
&=
2i(A+iI)^{-1}.
\end{aligned}
$$

$(A+iI)^{-1}$ は $H$ から $D(A)$ への全単射なので、その値域は $D(A)$ です。定数 $2i$ は0でないため

$$
\operatorname{Ran}(I-U)
=
D(A).
$$

次に

$$
\begin{aligned}
I+U
&=
\{(A+iI)+(A-iI)\}(A+iI)^{-1}\\
&=
2A(A+iI)^{-1}.
\end{aligned}
$$

$x\in D(A)$ を $x=(I-U)h$ と書くと

$$
x=2i(A+iI)^{-1}h.
$$

従って

$$
\begin{aligned}
Ax
&=
2iA(A+iI)^{-1}h\\
&=
i(I+U)h\\
&=
i(I+U)(I-U)^{-1}x.
\end{aligned}
$$

よって

$$
A=i(I+U)(I-U)^{-1}
$$

が $D(A)=\operatorname{Ran}(I-U)$ 上で成り立ちます。
<!-- solution-end -->

<a id="ex-qm6-b03"></a>
#### QM6-B03 自由粒子 Hamiltonian
- Level: B

$$
h(\xi)=\frac{\hbar^2\xi^2}{2m},
\qquad
H_0=\mathcal F^{-1}M_h\mathcal F
$$

とする。

1. $H_0$ が自己共役であることを示せ。
2. $E_{H_0}(B)$ を求めよ。
3. $D(H_0)$ を Fourier 変換を用いて書け。
4. $\sigma(H_0)\subset[0,\infty)$ となる理由を説明せよ。

<!-- solution-start -->
### 詳細解答

$h$ は実数値なので最大乗算作用素 $M_h$ は自己共役です。$\mathcal F$ はユニタリだから

$$
H_0=\mathcal F^{-1}M_h\mathcal F
$$

も自己共役です。

$M_h$ のスペクトル射影は

$$
M_{\mathbf1_B(h(\xi))}
$$

なので

$$
E_{H_0}(B)
=
\mathcal F^{-1}
M_{\mathbf1_B(h(\xi))}
\mathcal F.
$$

また

$$
\begin{aligned}
\psi\in D(H_0)
&\iff
h\widehat\psi\in L^2\\
&\iff
\int
\frac{\hbar^4\xi^4}{4m^2}
|\widehat\psi(\xi)|^2\,d\xi<\infty.
\end{aligned}
$$

最後に

$$
h(\xi)\ge0
$$

なので、$B\subset(-\infty,0)$ なら

$$
\mathbf1_B(h(\xi))=0
$$

が全ての $\xi$ で成り立ちます。従って

$$
E_{H_0}(B)=0.
$$

したがって負の実数はスペクトル測度の台に現れず、

$
\sigma(H_0)\subset[0,\infty)
$

です。
<!-- solution-end -->

### Level C

<a id="ex-qm6-c01"></a>
#### QM6-C01 非有界スペクトル定理を Cayley 変換から再構成する
- Level: C

自己共役作用素 $A$ に対して

$$
U=(A-iI)(A+iI)^{-1}
$$

とする。ユニタリ作用素のスペクトル定理

$$
U=\int_{\mathbb T}z\,dF(z)
$$

を使って、次を順に示せ。

1. $U$ はユニタリで $\ker(I-U)=\{0\}$。
2. $F(\{1\})=0$。
3. 
   $$
   c(\lambda)=\frac{\lambda-i}{\lambda+i}
   $$
   を用いて $E(B)=F(c(B))$ と置けば、$E$ は $\mathbb R$ 上の PVM になる。
4. $T=\int\lambda\,dE(\lambda)$ とすると
   $$
   D(T)=\operatorname{Ran}(I-U)
   $$
   である。
5. $T=A$ を示せ。
6. この PVM が一意であることを示せ。

<!-- solution-start -->
### 詳細解答

1. $y=(A+iI)x$ と書くと
   $$
   Uy=(A-iI)x.
   $$
   自己共役性から
   $$
   \|(A+iI)x\|^2
   =
   \|Ax\|^2+\|x\|^2
   =
   \|(A-iI)x\|^2,
   $$
   なので $U$ は等長です。$A-iI$ は全射なので $U$ も全射、従ってユニタリです。
   
   また
   $$
   I-U=2i(A+iI)^{-1}
   $$
   で、$(A+iI)^{-1}$ は単射なので
   $$
   \ker(I-U)=\{0\}.
   $$

2. ユニタリ作用素のスペクトル定理で
   $$
   U=\int z\,dF(z).
   $$
   $F(\{1\})$ の値域は $\ker(U-I)$ に等しいので、1より
   $$
   F(\{1\})=0.
   $$

3. $c$ は
   $$
   \mathbb R\to\mathbb T\setminus\{1\}
   $$
   の Borel 同型です。従って
   $$
   E(B)=F(c(B))
   $$
   は射影値で、交叉・補集合・互いに素な可算和を $F$ から引き継ぎます。$F(\{1\})=0$ なので
   $$
   E(\mathbb R)=F(\mathbb T\setminus\{1\})=I.
   $$
   よって $E$ は $\mathbb R$ 上の PVM です。

4. 逆写像
   $$
   \phi(z)=i\frac{1+z}{1-z}
   $$
   を使います。
   
   まず $y=(I-U)h$ なら
   $$
   \phi(z)(1-z)=i(1+z)
   $$
   だから
   $$
   \int\lambda^2\,d\mu_y^E
   =
   \int|\phi(z)|^2|1-z|^2\,d\mu_h^F
   \le4\|h\|^2.
   $$
   従って
   $$
   \operatorname{Ran}(I-U)\subset D(T).
   $$
   
   逆に $y\in D(T)$ とし
   $$
   h=\frac12(y-iTy)
   $$
   と置きます。
   $$
   \frac{1-i\lambda}{2}
   =
   \frac1{1-c(\lambda)}
   $$
   なので
   $$
   (I-U)h
   =
   \int
   (1-c(\lambda))
   \frac{1-i\lambda}{2}
   \,dE(\lambda)y
   =
   y.
   $$
   従って
   $$
   D(T)\subset\operatorname{Ran}(I-U).
   $$
   よって両者は等しいです。

5. $y=(I-U)h$ に対し
   $$
   \begin{aligned}
   Ty
   &=
   \int\phi(z)(1-z)\,dF(z)h\\
   &=
   i(I+U)h.
   \end{aligned}
   $$
   一方 Cayley 変換の復元式から
   $$
   D(A)=\operatorname{Ran}(I-U),
   \qquad
   A(I-U)h=i(I+U)h.
   $$
   従って
   $$
   D(T)=D(A),
   \qquad
   T=A.
   $$

6. $G$ も $A$ を表す PVM とします。Cayley 関数 $c$ は有界なので
   $$
   U=c(A)=\int c(\lambda)\,dG(\lambda).
   $$
   したがって $G$ の $c$ による押し出しは $U$ のスペクトル PVM です。ユニタリ作用素のスペクトル定理の一意性から、この押し出しは $F$ と一致します。
   
   $c$ は $\mathbb R$ と $\mathbb T\setminus\{1\}$ の全単射なので、実直線へ戻すと
   $$
   G=E.
   $$
   これで一意性まで示されました。
<!-- solution-end -->

---

## 15. まとめ

本章では、有界スペクトル定理を非有界自己共役作用素へ拡張しました。

- PVM $E$ に対する座標関数の積分は
  $$
  D\left(\int\lambda\,dE\right)
  =
  \left\{
  x:
  \int\lambda^2\,d\mu_x<\infty
  \right\}
  $$
  と定義域を伴って定まる。
- この実座標スペクトル積分は自己共役である。
- 対称作用素の自己共役性は
  $$
  \operatorname{Ran}(A\pm iI)=H
  $$
  で判定できる。
- Cayley 変換
  $$
  U=(A-iI)(A+iI)^{-1}
  $$
  は非有界自己共役作用素をユニタリ作用素へ移す。
- ユニタリ作用素のスペクトル定理から
  $$
  A=\int_{\mathbb R}\lambda\,dE_A(\lambda)
  $$
  を定義域込みで導ける。
- 位置作用素では
  $$
  D(Q)=\{\psi:x\psi\in L^2\},
  $$
  運動量作用素では
  $$
  D(P)=\{\psi:\xi\widehat\psi\in L^2\}
  $$
  が二次モーメント条件として回収される。
- $e^{-itA}$ は Borel 関数計算で全空間上のユニタリ作用素になる。
- 自由粒子 Hamiltonian は Fourier 空間で
  $$
  \hbar^2\xi^2/(2m)
  $$
  の乗算作用素としてスペクトル表示できる。

次の QM7 では

$$
U(t)=e^{-itH/\hbar}
$$

を単なる記号ではなく、強連続1パラメータユニタリ群として扱います。そして Stone の定理により

$$
\boxed{
\text{自己共役生成作用素}
\longleftrightarrow
\text{強連続ユニタリ時間発展}
}
$$

を証明し、Schrödinger 方程式へ接続します。
