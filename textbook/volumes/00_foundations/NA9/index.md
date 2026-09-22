# NA9 数値解析 IX：数値線形代数 II—反復法・Krylov 法

NA8 では、連立一次方程式

$$
Ax=b
$$

を有限回の演算で解く直接法として、Gauss 消去法、LU 分解、Cholesky 分解、Householder 反射による QR 分解を扱いました。

しかし、行列が巨大でしかも疎な場合、行列全体を分解すること自体が重くなります。そこでこの章では、近似解 $x^{(0)}$ から出発し、

$$
x^{(0)},x^{(1)},x^{(2)},\dots
$$

を更新しながら解へ近づく **反復法**へ進みます。

中心となる流れは

~~~text
定常反復
  ↓
誤差伝播行列の固有値
  ↓
成分更新型の反復
  ↓
部分空間による探索
  ↓
SPD 系の反復解法
  ↓
条件数の改善
~~~

です。

直接の前提は、[NA1 の残差・条件数](../NA1/index.md#def-na1-residual)、[NA8 の直接法](../NA8/index.md)、[NA4 の Chebyshev 多項式](../NA4/index.md#thm-na4-chebyshev-minimax)、[LA4 の作用素多項式・Jordan 標準形](../LA4/index.md#thm-la4-jordan-form)、[F0-00F1 の実対称正定値行列](../F0_00F1_固有空間_スペクトル定理_PSD/index.md#def-f0-00f1-positive-semidefinite)です。

---

## 0. 「分解して一度で解く」から「安い更新を繰り返す」へ

直接法では、たとえば

$$
PA=LU
$$

を作ってから三角連立方程式を解きました。

反復法では、各反復を安くし、

$$
r_k=b-Ax_k
$$

という残差を監視しながら解へ近づきます。

ここで重要なのは、反復回数そのものではありません。

- 1回の更新がどれだけ安いか
- 誤差が何倍ずつ減るか
- 行列の疎性を保てるか
- 残差が小さいとき、解誤差も小さいか

を分けて考えます。

特に大規模疎行列では、行列を分解して新しい非零要素を大量に作るより、

$$
v\longmapsto Av
$$

という行列ベクトル積だけを繰り返す方が有利なことがあります。Krylov 法はこの発想を体系化したものです。

---

## 1. 行列分解から定常反復を作る

$A$ を

$$
A=M-N
$$

と分解し、$M$ は容易に解ける可逆行列だとします。

元の方程式

$$
(M-N)x=b
$$

は

$$
Mx=Nx+b
$$

と同値です。

右辺の $x$ を一つ前の反復値で置き換えると、

$$
Mx^{(k+1)}
=
Nx^{(k)}+b
$$

を得ます。

<a id="def-na9-stationary-iteration"></a>
<!-- formal-statement-start -->
### 定義（定常反復法）

可逆行列 $A\in\mathbb R^{n\times n}$ を

$$
A=M-N
$$

と分解し、$M$ を可逆とする。

$$
G=M^{-1}N,
\qquad
c=M^{-1}b
$$

と置き、

$$
\boxed{
x^{(k+1)}
=
Gx^{(k)}+c
}
\qquad(k=0,1,2,\dots)
$$

で近似解を更新する方法を **定常反復法**という。$G$ を反復行列という。
<!-- formal-statement-end -->

<!-- definition-example-start: def-na9-stationary-iteration -->
### 例：反復式から固定点を確認する

**定義の確認**。次の反復を考えます。

$$
G=
\begin{pmatrix}
0&1/2\\
1/3&0
\end{pmatrix},
\qquad
c=
\begin{pmatrix}
1\\0
\end{pmatrix}.
$$

反復は

$$
x^{(k+1)}
=
Gx^{(k)}+c
$$

です。

もし $x^{(k)}$ がある極限 $x^*$ へ収束すれば、極限を取って

$$
x^*=Gx^*+c
$$

です。従って

$$
(I-G)x^*=c.
$$

ここで

$$
I-G
=
\begin{pmatrix}
1&-1/2\\
-1/3&1
\end{pmatrix}
$$

は可逆なので、固定点は一意です。

定常反復法とは、同じ $G$ と $c$ を毎回使い、この固定点を求める方法だと分かります。
<!-- definition-example-end -->

真の解を $x$ とし、誤差を

$$
e^{(k)}=x-x^{(k)}
$$

と置きます。

真の解も

$$
x=Gx+c
$$

を満たすので、差を取れば

$$
\boxed{
e^{(k+1)}
=
Ge^{(k)}
}
$$

です。

従って

$$
\boxed{
e^{(k)}
=
G^k e^{(0)}
}
$$

となります。

つまり、定常反復法の収束問題は

$$
G^k\longrightarrow0
$$

となるかどうかへ帰着します。

また残差は

$$
r_k=b-Ax^{(k)}
=A(x-x^{(k)})
=Ae^{(k)}
$$

なので、

$$
\boxed{
r_k=Ae^{(k)}
}
$$

です。

誤差は直接観測できませんが、残差は計算できます。この違いが停止判定で重要になります。

---

## 2. 反復行列の固有値が収束を支配する

<a id="def-na9-spectral-radius"></a>
<!-- formal-statement-start -->
### 定義（スペクトル半径）

正方行列 $G\in\mathbb C^{n\times n}$ の固有値を

$$
\lambda_1,\dots,\lambda_n
$$

とする。

$$
\boxed{
\rho(G)
=
\max_{1\le i\le n}|\lambda_i|
}
$$

を $G$ の **スペクトル半径**という。
<!-- formal-statement-end -->

<!-- definition-example-start: def-na9-spectral-radius -->
### 例：2次対角行列のスペクトル半径

$$
G=
\begin{pmatrix}
1/2&0\\
0&-1/3
\end{pmatrix}
$$

の固有値は

$$
\frac12,\qquad -\frac13
$$

です。

従って

$$
\rho(G)
=
\max\left\{
\frac12,\frac13
\right\}
=
\frac12.
$$

固有方向ごとの誤差はそれぞれ $(1/2)^k$、$(-1/3)^k$ 倍されるので、どちらも0へ収束します。
<!-- definition-example-end -->

定常反復が任意の初期値から収束するかどうかは、スペクトル半径だけで完全に判定できます。

<a id="thm-na9-stationary-convergence"></a>
<!-- formal-statement-start -->
### 定理（定常反復法のスペクトル半径による収束判定）

定常反復法

$$
x^{(k+1)}=Gx^{(k)}+c
$$

が一意な固定点 $x$ を持つとする。

次は同値である。

1. 任意の初期値 $x^{(0)}$ に対して $x^{(k)}\to x$。
2. $G^k\to0$。
3. $\rho(G)<1$。
<!-- formal-statement-end -->

### 証明の見取り図

誤差は

$$
e^{(k)}=G^k e^{(0)}
$$

なので、1と2の同値は直接です。

2から3は、固有ベクトルへ $G^k$ を作用させれば分かります。

3から2では、行列が対角化できない場合も扱う必要があります。そこで [LA4 の Jordan 標準形](../LA4/index.md#thm-la4-jordan-form)を使い、Jordan ブロックの冪を「指数減衰 $\times$ 多項式成長」として評価します。

<!-- proof-start -->
### 証明

まず1と2を示します。

$$
e^{(k)}
=
G^k e^{(0)}
$$

なので、任意の $e^{(0)}$ に対して $e^{(k)}\to0$ であることと、線形写像として $G^k\to0$ であることは同値です。

次に2なら3を示します。

$Gv=\lambda v$、$v\ne0$ とします。すると

$$
G^k v=\lambda^k v.
$$

$G^k\to0$ なら左辺は0へ収束するので、

$$
|\lambda|^k\|v\|\to0.
$$

$v\ne0$ だから $|\lambda|<1$ です。全固有値について成り立つため

$$
\rho(G)<1.
$$

最後に3なら2を示します。

実行列も複素数体上で考えればよいので、[Jordan 標準形定理](../LA4/index.md#thm-la4-jordan-form)により

$$
G=SJS^{-1}
$$

と書けます。従って

$$
G^k=SJ^kS^{-1}.
$$

各 Jordan ブロックは

$$
J_\lambda
=
\lambda I+N
$$

と書け、$N$ はある $m$ に対して $N^m=0$ を満たす冪零行列です。

$\lambda\ne0$ なら二項展開により

$$
J_\lambda^k
=
\sum_{j=0}^{m-1}
\binom{k}{j}
\lambda^{k-j}N^j.
$$

$\rho(G)<1$ なので $|\lambda|<1$ です。固定した $j$ に対し

$$
\binom{k}{j}|\lambda|^{k-j}
$$

は「$k$ の多項式程度の増加」と「$|\lambda|^k$ の指数減衰」の積なので0へ収束します。

より直接には、任意の $q$ を

$$
|\lambda|<q<1
$$

と取ると、十分大きい $k$ で

$$
k^j|\lambda|^k
=
k^j\left(\frac{|\lambda|}{q}\right)^k q^k
\le q^k
$$

となるため0へ収束します。

$\lambda=0$ の Jordan ブロックでは

$$
J_0=N
$$

であり、$N^m=0$ だから十分大きい $k$ で $J_0^k=0$ です。

従って全 Jordan ブロックで

$$
J_\lambda^k\to0.
$$

よって

$$
J^k\to0,
\qquad
G^k=SJ^kS^{-1}\to0.
$$

以上で同値性が示されました。
<!-- proof-end -->

この定理で大切なのは、

> 行列 $A$ が可逆であることと、反復行列 $G$ のスペクトル半径が1未満であることは別問題

だという点です。

元の連立方程式に一意解があっても、反復法が発散することはあります。

---

## 3. Jacobi 法と Gauss--Seidel 法

行列 $A=(a_{ij})$ を

$$
A=D+L+U
$$

と分解します。

- $D$：対角部分
- $L$：狭義下三角部分
- $U$：狭義上三角部分

です。

### 3.1 Jacobi 法

<a id="def-na9-jacobi"></a>
<!-- formal-statement-start -->
### 定義（Jacobi 法）

$A=D+L+U$ とし、対角成分がすべて非零、すなわち $D$ が可逆とする。

$$
\boxed{
Dx^{(k+1)}
=
b-(L+U)x^{(k)}
}
$$

すなわち

$$
\boxed{
x^{(k+1)}
=
-D^{-1}(L+U)x^{(k)}
+
D^{-1}b
}
$$

で更新する方法を **Jacobi 法**という。

反復行列は

$$
G_J=-D^{-1}(L+U)
$$

である。
<!-- formal-statement-end -->

<!-- definition-example-start: def-na9-jacobi -->
### 例：2次系で Jacobi 更新を実行する

$$
A=
\begin{pmatrix}
2&-1\\
-1&2
\end{pmatrix},
\qquad
b=
\begin{pmatrix}
1\\0
\end{pmatrix}
$$

を考えます。

方程式は

$$
2x_1-x_2=1,
\qquad
-x_1+2x_2=0.
$$

Jacobi 法では右辺に現れる他成分を一つ前の反復から取るので、

$$
x_1^{(k+1)}
=
\frac{1+x_2^{(k)}}2,
$$

$$
x_2^{(k+1)}
=
\frac{x_1^{(k)}}2.
$$

従って

$$
G_J=
\begin{pmatrix}
0&1/2\\
1/2&0
\end{pmatrix}.
$$

$x^{(0)}=(0,0)^{\mathsf T}$ から始めると

$$
x^{(1)}
=
\begin{pmatrix}
1/2\\0
\end{pmatrix},
\qquad
x^{(2)}
=
\begin{pmatrix}
1/2\\1/4
\end{pmatrix},
$$

$$
x^{(3)}
=
\begin{pmatrix}
5/8\\1/4
\end{pmatrix}.
$$

$G_J$ の固有値は $\pm1/2$ なので

$$
\rho(G_J)=\frac12<1.
$$

従って任意の初期値から収束します。
<!-- definition-example-end -->

### 3.2 Gauss--Seidel 法

Jacobi 法は各成分を「前の反復」だけから同時更新します。

Gauss--Seidel 法では、第 $i$ 成分を計算するとき、その反復ですでに求めた第1成分から第 $i-1$ 成分までの新しい値を使います。

<a id="def-na9-gauss-seidel"></a>
<!-- formal-statement-start -->
### 定義（Gauss--Seidel 法）

$A=D+L+U$ とし、$D+L$ が可逆とする。

$$
\boxed{
(D+L)x^{(k+1)}
=
b-Ux^{(k)}
}
$$

すなわち

$$
\boxed{
x^{(k+1)}
=
-(D+L)^{-1}Ux^{(k)}
+
(D+L)^{-1}b
}
$$

で更新する方法を **Gauss--Seidel 法**という。

反復行列は

$$
G_{GS}=-(D+L)^{-1}U
$$

である。
<!-- formal-statement-end -->

<!-- definition-example-start: def-na9-gauss-seidel -->
### 例：新しく得た成分をすぐ使う

先ほどと同じ

$$
2x_1-x_2=1,
\qquad
-x_1+2x_2=0
$$

を考えます。

Gauss--Seidel 法では

$$
x_1^{(k+1)}
=
\frac{1+x_2^{(k)}}2
$$

を先に計算し、その新しい値を使って

$$
x_2^{(k+1)}
=
\frac{x_1^{(k+1)}}2
$$

とします。

従って

$$
G_{GS}
=
\begin{pmatrix}
0&1/2\\
0&1/4
\end{pmatrix}.
$$

$x^{(0)}=(0,0)^{\mathsf T}$ なら

$$
x^{(1)}
=
\begin{pmatrix}
1/2\\1/4
\end{pmatrix},
$$

$$
x^{(2)}
=
\begin{pmatrix}
5/8\\5/16
\end{pmatrix}.
$$

固有値は $0,1/4$ だから

$$
\rho(G_{GS})=\frac14.
$$

この例では Jacobi 法の $\rho=1/2$ より小さく、誤差の漸近減衰も速くなります。

ただし「Gauss--Seidel 法は常に Jacobi 法より速い」という一般定理ではありません。収束速度は行列構造に依存します。
<!-- definition-example-end -->

### 3.3 狭義行優対角なら Jacobi 法は収束する

<a id="prop-na9-jacobi-diagonal-dominance"></a>
<!-- formal-statement-start -->
### 命題（狭義行優対角行列に対する Jacobi 法の収束）

$A=(a_{ij})\in\mathbb R^{n\times n}$ が各行で

$$
\boxed{
|a_{ii}|
>
\sum_{j\ne i}|a_{ij}|
}
\qquad(i=1,\dots,n)
$$

を満たすとする。

このとき Jacobi 法の反復行列 $G_J$ は

$$
\rho(G_J)<1
$$

を満たし、Jacobi 法は任意の初期値から収束する。
<!-- formal-statement-end -->

<!-- proof-start -->
### 証明

Jacobi 法の反復行列は

$$
G_J=-D^{-1}(L+U)
$$

です。

第 $i$ 行の絶対値行和は

$$
\sum_{j=1}^n |(G_J)_{ij}|
=
\frac{1}{|a_{ii}|}
\sum_{j\ne i}|a_{ij}|.
$$

狭義行優対角性から各行でこれは1未満です。従って最大行和ノルムについて

$$
\|G_J\|_\infty
=
\max_i
\frac{\sum_{j\ne i}|a_{ij}|}{|a_{ii}|}
<1.
$$

$G_Jv=\lambda v$、$v\ne0$ とすると

$$
|\lambda|\|v\|_\infty
=
\|G_Jv\|_\infty
\le
\|G_J\|_\infty\|v\|_\infty.
$$

よって

$$
|\lambda|
\le
\|G_J\|_\infty<1.
$$

全固有値に対して成り立つので

$$
\rho(G_J)<1.
$$

[スペクトル半径による収束判定](#thm-na9-stationary-convergence)から Jacobi 法は任意の初期値に対して収束します。
<!-- proof-end -->

### 反例：可逆でも Jacobi 法は発散する

$$
A=
\begin{pmatrix}
1&2\\
2&1
\end{pmatrix},
\qquad
b=
\begin{pmatrix}
1\\1
\end{pmatrix}
$$

とします。

$$
\det A=-3\ne0
$$

なので $A$ は可逆です。

しかし Jacobi 反復行列は

$$
G_J
=
\begin{pmatrix}
0&-2\\
-2&0
\end{pmatrix}
$$

で、固有値は $2,-2$ です。

従って

$$
\rho(G_J)=2>1.
$$

$x^{(0)}=0$ なら

$$
x^{(1)}
=
\begin{pmatrix}
1\\1
\end{pmatrix},
\qquad
x^{(2)}
=
\begin{pmatrix}
-1\\-1
\end{pmatrix},
\qquad
x^{(3)}
=
\begin{pmatrix}
3\\3
\end{pmatrix}.
$$

反復値は発散します。

ここで失われた仮定は「$A$ の可逆性」ではなく、

$$
\rho(G_J)<1
$$

を保証する構造です。可逆性は真の解の存在一意性を保証するだけで、特定の反復法の安定性までは保証しません。

---

## 4. Krylov 部分空間：行列ベクトル積だけから探索空間を育てる

定常反復では、反復行列 $G$ を固定しました。

より柔軟な方法として、初期残差

$$
r_0=b-Ax_0
$$

から

$$
r_0,\ Ar_0,\ A^2r_0,\dots
$$

を生成し、その張る空間の中で良い補正を探します。

<a id="def-na9-krylov-subspace"></a>
<!-- formal-statement-start -->
### 定義（Krylov 部分空間）

正方行列 $A$ とベクトル $r$ に対し、

$$
\boxed{
\mathcal K_m(A,r)
=
\operatorname{span}
\{r,Ar,A^2r,\dots,A^{m-1}r\}
}
\qquad(m\ge1)
$$

を **第 $m$ Krylov 部分空間**という。その次元は高々 $m$ であり、生成ベクトルが一次従属なら $m$ より小さくなる。

また

$$
\mathcal K_0(A,r)=\{0\}
$$

とする。
<!-- formal-statement-end -->

<!-- definition-example-start: def-na9-krylov-subspace -->
### 例：2回の行列ベクトル積で平面全体になる

$$
A=
\begin{pmatrix}
1&0\\
0&3
\end{pmatrix},
\qquad
r=
\begin{pmatrix}
1\\1
\end{pmatrix}
$$

とします。

$$
Ar=
\begin{pmatrix}
1\\3
\end{pmatrix}.
$$

従って

$$
\mathcal K_1(A,r)
=
\operatorname{span}
\left\{
\begin{pmatrix}
1\\1
\end{pmatrix}
\right\}.
$$

一方、

$$
\det
\begin{pmatrix}
1&1\\
1&3
\end{pmatrix}
=2\ne0
$$

なので $r$ と $Ar$ は一次独立です。

従って

$$
\mathcal K_2(A,r)=\mathbb R^2.
$$

Krylov 部分空間は、行列を分解しなくても $A$ をベクトルへ作用させるだけで広がっていきます。
<!-- definition-example-end -->

Krylov 法では

$$
x_m\in x_0+\mathcal K_m(A,r_0)
$$

という形の近似解を探します。

このとき残差は「$A$ の多項式」として表せます。

<a id="prop-na9-krylov-residual-polynomial"></a>
<!-- formal-statement-start -->
### 命題（Krylov 反復の残差多項式表示）

$A$ を可逆とし、

$$
r_0=b-Ax_0.
$$

ベクトル $x_m$ が

$$
x_m\in x_0+\mathcal K_m(A,r_0)
$$

を満たすことと、その残差

$$
r_m=b-Ax_m
$$

が

$$
\boxed{
r_m=q_m(A)r_0
}
$$

と表されることは同値である。

ここで $q_m$ は

$$
\deg q_m\le m,
\qquad
q_m(0)=1
$$

を満たす多項式である。
<!-- formal-statement-end -->

<!-- proof-start -->
### 証明

まず

$$
x_m\in x_0+\mathcal K_m(A,r_0)
$$

とします。

ある $\deg s\le m-1$ の多項式 $s$ が存在して

$$
x_m=x_0+s(A)r_0
$$

と書けます。

従って

$$
\begin{aligned}
r_m
&=b-Ax_m\\
&=r_0-As(A)r_0\\
&=(I-As(A))r_0.
\end{aligned}
$$

$$
q_m(t)=1-ts(t)
$$

と置けば

$$
\deg q_m\le m,
\qquad
q_m(0)=1
$$

で、

$$
r_m=q_m(A)r_0.
$$

逆に

$$
r_m=q_m(A)r_0,
\qquad
q_m(0)=1
$$

とします。

$q_m(0)=1$ だから

$$
1-q_m(t)
$$

は $t=0$ を根に持ちます。従ってある $\deg s\le m-1$ の多項式 $s$ が存在して

$$
1-q_m(t)=ts(t)
$$

です。

そこで

$$
x_m=x_0+s(A)r_0
$$

と置けば

$$
\begin{aligned}
b-Ax_m
&=r_0-As(A)r_0\\
&=q_m(A)r_0\\
&=r_m.
\end{aligned}
$$

$A$ は可逆なので、残差が同じなら近似解も同じです。

従って

$$
x_m\in x_0+\mathcal K_m(A,r_0).
$$
<!-- proof-end -->

この命題から、Krylov 法は

> $q(0)=1$ という制約の下で、$q(A)r_0$ を小さくする多項式を暗黙に選ぶ方法

と読めます。

固有値がどこに並ぶかが収束速度へ直結する理由も、ここから見えてきます。

---

## 5. 対称正定値行列が新しい幾何を作る

ここから共役勾配法へ進みます。

共役勾配法は一般の可逆行列に使う方法ではありません。基本形では

$$
A^{\mathsf T}=A,
\qquad
x^{\mathsf T}Ax>0\quad(x\ne0)
$$

という実対称正定値性が必要です。

<a id="def-na9-a-inner-product"></a>
<!-- formal-statement-start -->
### 定義（A-内積と A-共役性）

$A\in\mathbb R^{n\times n}$ を実対称正定値行列とする。

$$
\boxed{
\langle u,v\rangle_A
=
u^{\mathsf T}Av
}
$$

を $A$-内積といい、

$$
\boxed{
\|u\|_A
=
\sqrt{u^{\mathsf T}Au}
}
$$

を $A$-ノルムという。

二つのベクトル $p,q$ が

$$
\boxed{
p^{\mathsf T}Aq=0
}
$$

を満たすとき、$p,q$ は **$A$-共役**であるという。
<!-- formal-statement-end -->

<!-- definition-example-start: def-na9-a-inner-product -->
### 例：通常は直交しなくても A-共役になり得る

$$
A=
\begin{pmatrix}
2&-1\\
-1&2
\end{pmatrix},
\qquad
p=
\begin{pmatrix}
1\\1
\end{pmatrix},
\qquad
q=
\begin{pmatrix}
1\\-1
\end{pmatrix}.
$$

まず

$$
Aq
=
\begin{pmatrix}
3\\-3
\end{pmatrix}.
$$

従って

$$
p^{\mathsf T}Aq
=
(1,1)
\begin{pmatrix}
3\\-3
\end{pmatrix}
=0.
$$

よって $p$ と $q$ は $A$-共役です。

また実対称正定値性により

$$
u^{\mathsf T}Au>0
\qquad(u\ne0)
$$

なので、$\langle\cdot,\cdot\rangle_A$ は本当に内積の正定値性を満たします。
<!-- definition-example-end -->

<a id="prop-na9-a-conjugate-independent"></a>
<!-- formal-statement-start -->
### 命題（非零 A-共役方向の線形独立性）

$A$ を実対称正定値行列とする。

非零ベクトル

$$
p_0,\dots,p_m
$$

が互いに $A$-共役、すなわち

$$
p_i^{\mathsf T}Ap_j=0
\qquad(i\ne j)
$$

を満たすなら、$p_0,\dots,p_m$ は線形独立である。
<!-- formal-statement-end -->

<!-- proof-start -->
### 証明

$$
\sum_{i=0}^m c_i p_i=0
$$

とします。

左から $p_j^{\mathsf T}A$ を掛けると

$$
\sum_{i=0}^m
c_i p_j^{\mathsf T}Ap_i
=0.
$$

互いに $A$-共役なので $i\ne j$ の項は0です。従って

$$
c_j p_j^{\mathsf T}Ap_j=0.
$$

$p_j\ne0$ で $A$ は正定値だから

$$
p_j^{\mathsf T}Ap_j>0.
$$

従って

$$
c_j=0.
$$

任意の $j$ について成り立つので、すべての係数が0です。よって線形独立です。
<!-- proof-end -->

この命題が「共役勾配法は有限次元なら高々 $n$ 回で終了する」という性質を支えます。

---

## 6. 共役勾配法

<a id="def-na9-cg"></a>
<!-- formal-statement-start -->
### 定義（共役勾配法）

$A\in\mathbb R^{n\times n}$ を実対称正定値行列とし、

$$
Ax=b
$$

を解く。

初期値 $x_0$ を選び、

$$
r_0=b-Ax_0,
\qquad
p_0=r_0
$$

とする。

$r_k\ne0$ である間、

$$
\boxed{
\alpha_k
=
\frac{r_k^{\mathsf T}r_k}
{p_k^{\mathsf T}Ap_k}
}
$$

$$
\boxed{
x_{k+1}
=
x_k+\alpha_k p_k
}
$$

$$
\boxed{
r_{k+1}
=
r_k-\alpha_k Ap_k
}
$$

と更新する。

$r_{k+1}=0$ なら終了する。そうでなければ

$$
\boxed{
\beta_k
=
\frac{r_{k+1}^{\mathsf T}r_{k+1}}
{r_k^{\mathsf T}r_k}
}
$$

$$
\boxed{
p_{k+1}
=
r_{k+1}+\beta_kp_k
}
$$

とし、反復を続ける。

この方法を **共役勾配法**という。
<!-- formal-statement-end -->

<!-- definition-example-start: def-na9-cg -->
### 例：2次 SPD 系は2反復以内で解ける

$$
A=
\begin{pmatrix}
4&1\\
1&3
\end{pmatrix},
\qquad
b=
\begin{pmatrix}
1\\2
\end{pmatrix},
\qquad
x_0=
\begin{pmatrix}
0\\0
\end{pmatrix}
$$

とします。

$A$ は対称です。また任意の $z=(z_1,z_2)^{\mathsf T}\ne0$ に対して

$$
\begin{aligned}
z^{\mathsf T}Az
&=
4z_1^2+2z_1z_2+3z_2^2\\
&=
4\left(z_1+\frac14z_2\right)^2
+
\frac{11}{4}z_2^2
>0.
\end{aligned}
$$

従って定義から $A$ は正定値です。

まず

$$
r_0=p_0=
\begin{pmatrix}
1\\2
\end{pmatrix}.
$$

$$
Ap_0=
\begin{pmatrix}
6\\7
\end{pmatrix}
$$

なので

$$
\alpha_0
=
\frac{1^2+2^2}{1\cdot6+2\cdot7}
=
\frac5{20}
=
\frac14.
$$

従って

$$
x_1
=
\begin{pmatrix}
1/4\\1/2
\end{pmatrix},
$$

$$
r_1
=
\begin{pmatrix}
1\\2
\end{pmatrix}
-
\frac14
\begin{pmatrix}
6\\7
\end{pmatrix}
=
\begin{pmatrix}
-1/2\\1/4
\end{pmatrix}.
$$

次に

$$
r_1^{\mathsf T}r_1
=
\frac14+\frac1{16}
=
\frac5{16}
$$

なので

$$
\beta_0
=
\frac{5/16}{5}
=
\frac1{16}.
$$

従って

$$
p_1
=
\begin{pmatrix}
-1/2\\1/4
\end{pmatrix}
+
\frac1{16}
\begin{pmatrix}
1\\2
\end{pmatrix}
=
\begin{pmatrix}
-7/16\\3/8
\end{pmatrix}.
$$

さらに

$$
Ap_1
=
\begin{pmatrix}
-11/8\\11/16
\end{pmatrix},
$$

$$
p_1^{\mathsf T}Ap_1
=
\frac{55}{64}.
$$

よって

$$
\alpha_1
=
\frac{5/16}{55/64}
=
\frac4{11}.
$$

したがって

$$
x_2
=
x_1+\frac4{11}p_1
=
\begin{pmatrix}
1/11\\7/11
\end{pmatrix}.
$$

実際

$$
A
\begin{pmatrix}
1/11\\7/11
\end{pmatrix}
=
\begin{pmatrix}
1\\2
\end{pmatrix}
=b.
$$

従って

$$
r_2=0.
$$

2次元なので、丸め誤差のない理想計算では高々2反復で終了するという性質が、この例で実際に見えています。
<!-- definition-example-end -->

正定値性は単なる飾りではありません。

$r_k\ne0$ なら $p_k\ne0$ であり、

$$
p_k^{\mathsf T}Ap_k>0
$$

だから $\alpha_k$ の分母が消えません。

この構造が失われると、後で見るように共役勾配法そのものが定義できなくなる場合があります。

---

## 7. なぜ共役勾配法は Krylov 法になるのか

共役勾配法の核心は、残差が互いに直交し、探索方向が互いに $A$-共役になることです。

<a id="thm-na9-cg-structure"></a>
<!-- formal-statement-start -->
### 定理（共役勾配法の直交性・A-共役性・有限回終了）

$A\in\mathbb R^{n\times n}$ を実対称正定値行列とし、共役勾配法を丸め誤差のない厳密演算で実行する。

反復がまだ終了していない範囲で、次が成り立つ。

1. 残差は互いに直交する。
   $$
   r_i^{\mathsf T}r_j=0
   \qquad(i\ne j).
   $$
2. 探索方向は互いに $A$-共役である。
   $$
   p_i^{\mathsf T}Ap_j=0
   \qquad(i\ne j).
   $$
3. 各 $k\ge1$ について
   $$
   \boxed{
   \operatorname{span}\{p_0,\dots,p_{k-1}\}
   =
   \mathcal K_k(A,r_0)
   }
   $$
   である。
4. $r_k$ は
   $$
   \mathcal K_k(A,r_0)
   $$
   に直交する。
5. 高々 $n$ 回の反復で厳密解に到達する。
<!-- formal-statement-end -->

### 証明の見取り図

$\alpha_k$ は、新しい残差 $r_{k+1}$ が現在の探索方向 $p_k$ と直交するように選ばれています。

一方 $\beta_k$ は、新しい探索方向 $p_{k+1}$ が $p_k$ と $A$-共役になるように働きます。

一度この直交構造ができると、過去の全方向に対する直交性・共役性も帰納的に保たれます。

<!-- proof-start -->
### 証明

帰納法で示します。

$k=0$ では

$$
p_0=r_0
$$

なので

$$
\operatorname{span}\{p_0\}
=
\mathcal K_1(A,r_0).
$$

まず一般の $k$ で、これまで

- $r_0,\dots,r_k$ が互いに直交する
- $p_0,\dots,p_k$ が互いに $A$-共役である
- $\operatorname{span}\{p_0,\dots,p_k\}=\mathcal K_{k+1}(A,r_0)$

と仮定します。

帰納法の仮定から $r_k$ は $p_0,\dots,p_{k-1}$ に直交します。また

$$
p_k=r_k+\beta_{k-1}p_{k-1}
$$

なので

$$
r_k^{\mathsf T}p_k
=
r_k^{\mathsf T}r_k.
$$

新しい残差は

$$
r_{k+1}
=
r_k-\alpha_kAp_k.
$$

従って

$$
\begin{aligned}
r_{k+1}^{\mathsf T}p_k
&=
r_k^{\mathsf T}p_k
-
\alpha_k p_k^{\mathsf T}Ap_k\\
&=
r_k^{\mathsf T}r_k
-
\frac{r_k^{\mathsf T}r_k}
{p_k^{\mathsf T}Ap_k}
p_k^{\mathsf T}Ap_k\\
&=0.
\end{aligned}
$$

$j<k$ なら

$$
\begin{aligned}
r_{k+1}^{\mathsf T}p_j
&=
r_k^{\mathsf T}p_j
-
\alpha_k p_k^{\mathsf T}Ap_j\\
&=0-0\\
&=0.
\end{aligned}
$$

したがって

$$
r_{k+1}
\perp
\operatorname{span}\{p_0,\dots,p_k\}.
$$

ここで

$$
p_0=r_0,
\qquad
p_j=r_j+\beta_{j-1}p_{j-1}
\quad(j\ge1)
$$

なので、三角形の関係を順に解けば

$$
\operatorname{span}\{p_0,\dots,p_k\}
=
\operatorname{span}\{r_0,\dots,r_k\}.
$$

従って

$$
r_{k+1}^{\mathsf T}r_j=0
\qquad(j=0,\dots,k).
$$

これで残差の相互直交性が一段進みます。

次に新しい探索方向

$$
p_{k+1}
=
r_{k+1}+\beta_kp_k
$$

の $A$-共役性を示します。

$j<k$ なら

$$
Ap_j
=
\frac{r_j-r_{j+1}}{\alpha_j}.
$$

$r_{k+1}$ は $r_j,r_{j+1}$ の両方に直交するので

$$
r_{k+1}^{\mathsf T}Ap_j=0.
$$

また帰納法の仮定から

$$
p_k^{\mathsf T}Ap_j=0.
$$

従って

$$
p_{k+1}^{\mathsf T}Ap_j=0.
$$

$j=k$ については

$$
Ap_k
=
\frac{r_k-r_{k+1}}{\alpha_k}
$$

なので

$$
r_{k+1}^{\mathsf T}Ap_k
=
-\frac{r_{k+1}^{\mathsf T}r_{k+1}}{\alpha_k}.
$$

一方、

$$
\alpha_k
=
\frac{r_k^{\mathsf T}r_k}{p_k^{\mathsf T}Ap_k}
$$

だから

$$
\beta_kp_k^{\mathsf T}Ap_k
=
\frac{r_{k+1}^{\mathsf T}r_{k+1}}
{r_k^{\mathsf T}r_k}
\cdot
\frac{r_k^{\mathsf T}r_k}{\alpha_k}
=
\frac{r_{k+1}^{\mathsf T}r_{k+1}}{\alpha_k}.
$$

よって

$$
p_{k+1}^{\mathsf T}Ap_k
=
r_{k+1}^{\mathsf T}Ap_k
+
\beta_kp_k^{\mathsf T}Ap_k
=0.
$$

従って $p_{k+1}$ は過去のすべての探索方向と $A$-共役です。

次に Krylov 部分空間との一致を示します。

帰納法の仮定で

$$
p_k\in\mathcal K_{k+1}(A,r_0).
$$

従って

$$
Ap_k\in\mathcal K_{k+2}(A,r_0).
$$

また $r_k\in\mathcal K_{k+1}(A,r_0)$ なので

$$
r_{k+1}=r_k-\alpha_kAp_k
\in
\mathcal K_{k+2}(A,r_0).
$$

したがって

$$
p_{k+1}
=
r_{k+1}+\beta_kp_k
\in
\mathcal K_{k+2}(A,r_0).
$$

反復が終了していないなら $p_0,\dots,p_{k+1}$ は非零です。しかも互いに $A$-共役なので、[非零 A-共役方向の線形独立性](#prop-na9-a-conjugate-independent)から一次独立です。

従って

$$
\dim\operatorname{span}\{p_0,\dots,p_{k+1}\}=k+2.
$$

一方

$$
\dim\mathcal K_{k+2}(A,r_0)\le k+2.
$$

包含関係と次元が一致するので

$$
\operatorname{span}\{p_0,\dots,p_{k+1}\}
=
\mathcal K_{k+2}(A,r_0).
$$

これで帰納法が閉じます。

最後に有限回終了を示します。

もし $n$ 回を超えて終了しないなら、$\mathbb R^n$ に $n+1$ 本以上の非零で互いに $A$-共役な探索方向が存在することになります。

しかしそれらは線形独立なので、これは $\dim\mathbb R^n=n$ に矛盾します。

従って高々 $n$ 回である $r_k=0$ が生じます。

$r_k=0$ は

$$
b-Ax_k=0
$$

なので、$x_k$ は厳密解です。
<!-- proof-end -->

実際の浮動小数点計算では、丸め誤差により残差の完全な直交性や探索方向の完全な $A$-共役性は徐々に崩れます。

したがって「高々 $n$ 回で必ず厳密終了」は理論上の構造であり、大規模計算では通常、許容残差に達したところで停止します。

---

## 8. 共役勾配法は Krylov 空間内で A-ノルム誤差を最小にする

真の解を $x_*$ とし、

$$
e_k=x_*-x_k
$$

と置きます。

残差は

$$
r_k=b-Ax_k=Ae_k
$$

です。

[前節の定理](#thm-na9-cg-structure)から

$$
r_k\perp \mathcal K_k(A,r_0).
$$

従って任意の $z\in\mathcal K_k(A,r_0)$ に対して

$$
e_k^{\mathsf T}Az
=
r_k^{\mathsf T}z
=0.
$$

これは $e_k$ が Krylov 部分空間に $A$-内積で直交していることを意味します。

<a id="thm-na9-cg-best-approx"></a>
<!-- formal-statement-start -->
### 定理（共役勾配法の A-ノルム最良近似性）

$A$ を実対称正定値行列とし、$x_*$ を $Ax=b$ の厳密解とする。

共役勾配法の第 $k$ 反復 $x_k$ は、

$$
x_0+\mathcal K_k(A,r_0)
$$

の中で $x_*$ に対する $A$-ノルム誤差を最小にする。

すなわち任意の

$$
y\in x_0+\mathcal K_k(A,r_0)
$$

に対して

$$
\boxed{
\|x_*-x_k\|_A
\le
\|x_*-y\|_A
}
$$

であり、最小点は一意である。
<!-- formal-statement-end -->

<!-- proof-start -->
### 証明

任意の

$$
y\in x_0+\mathcal K_k(A,r_0)
$$

を取ります。

$x_k$ も同じアフィン空間に属するので、ある

$$
z\in\mathcal K_k(A,r_0)
$$

が存在して

$$
y=x_k+z.
$$

従って

$$
x_*-y=e_k-z.
$$

前節で示したように

$$
e_k^{\mathsf T}Az=0.
$$

よって $A$-内積における Pythagoras の等式から

$$
\begin{aligned}
\|x_*-y\|_A^2
&=
\|e_k-z\|_A^2\\
&=
\|e_k\|_A^2+\|z\|_A^2\\
&\ge
\|e_k\|_A^2.
\end{aligned}
$$

従って

$$
\|x_*-x_k\|_A
\le
\|x_*-y\|_A.
$$

等号には $\|z\|_A=0$ が必要です。

$A$ は正定値なので

$$
\|z\|_A=0
\Longrightarrow
z=0.
$$

従って等号は $y=x_k$ のときだけで、最小点は一意です。
<!-- proof-end -->

NA12 では、この同じ構造を「二次関数の最小化」という最適化の言葉で再解釈します。

ここではその理論を先取りせず、**線形方程式を Krylov 部分空間で解く射影法**としての意味を正本にします。

---

## 9. 条件数が CG の収束速度へ現れる理由

共役勾配法は高々 $n$ 回で終了します。しかし $n$ が数百万なら、「高々 $n$ 回」は実用的な評価ではありません。

そこで、数回でどれだけ誤差が減るかを調べます。

$A$ の固有値を

$$
0<a=\lambda_{\min}
\le
\lambda_i
\le
\lambda_{\max}=b
$$

とします。

実対称正定値行列では

$$
\kappa_2(A)
=
\frac{b}{a}.
$$

<a id="thm-na9-cg-chebyshev"></a>
<!-- formal-statement-start -->
### 定理（共役勾配法の Chebyshev 収束評価）

$A$ を実対称正定値行列とし、

$$
\kappa
=
\kappa_2(A)
=
\frac{\lambda_{\max}}{\lambda_{\min}}
$$

とする。

共役勾配法の誤差 $e_k=x_*-x_k$ は、任意の $k\ge1$ に対して

$$
\boxed{
\|e_k\|_A
\le
2
\left(
\frac{\sqrt\kappa-1}{\sqrt\kappa+1}
\right)^k
\|e_0\|_A
}
$$

を満たす。
<!-- formal-statement-end -->

### 証明の見取り図

Krylov 空間内の候補 $y$ の誤差は

$$
q(A)e_0
$$

という形に書けます。

従って、固有値区間上で

$$
q(0)=1
$$

を保ちながら $|q(\lambda)|$ を小さくする多項式を作ればよいことになります。

その役割を [NA4 の Chebyshev 多項式](../NA4/index.md#thm-na4-chebyshev-minimax)が担います。

<!-- proof-start -->
### 証明

任意の

$$
y\in x_0+\mathcal K_k(A,r_0)
$$

は、ある $\deg s\le k-1$ の多項式 $s$ を用いて

$$
y=x_0+s(A)r_0
$$

と書けます。

$r_0=Ae_0$ なので

$$
\begin{aligned}
x_*-y
&=
e_0-s(A)Ae_0\\
&=
q(A)e_0,
\end{aligned}
$$

ここで

$$
q(t)=1-ts(t),
\qquad
\deg q\le k,
\qquad
q(0)=1.
$$

共役勾配法の最良近似性から

$$
\|e_k\|_A
\le
\|q(A)e_0\|_A
$$

が任意のそのような $q$ に対して成り立ちます。

[実対称行列のスペクトル定理](../F0_00F1_固有空間_スペクトル定理_PSD/index.md#thm-real-symmetric-spectral)により

$$
A=Q\Lambda Q^{\mathsf T}.
$$

$z=Q^{\mathsf T}e_0$ と置くと

$$
\begin{aligned}
\|q(A)e_0\|_A^2
&=
\sum_{i=1}^n
\lambda_i q(\lambda_i)^2 z_i^2\\
&\le
\left(
\max_{\lambda\in[a,b]}|q(\lambda)|
\right)^2
\sum_{i=1}^n\lambda_i z_i^2\\
&=
\left(
\max_{\lambda\in[a,b]}|q(\lambda)|
\right)^2
\|e_0\|_A^2.
\end{aligned}
$$

従って

$$
\|e_k\|_A
\le
\min_{\substack{\deg q\le k\\q(0)=1}}
\max_{\lambda\in[a,b]}|q(\lambda)|
\,
\|e_0\|_A.
$$

まず $\kappa=1$ なら $a=b$ です。実対称行列のスペクトル定理より全固有値が同じ $a>0$ なので

$$
A=aI.
$$

$r_0\ne0$ の場合、

$$
\alpha_0
=
\frac{r_0^{\mathsf T}r_0}
{r_0^{\mathsf T}Ar_0}
=
\frac1a
$$

となり、

$$
r_1
=
r_0-\frac1aAr_0
=0.
$$

従って $k\ge1$ では $e_k=0$ であり、定理の評価は成り立ちます。

以下では $\kappa>1$、従って $a<b$ とします。

ここで

$$
z(\lambda)
=
\frac{a+b-2\lambda}{b-a}
$$

と置きます。

$\lambda\in[a,b]$ なら

$$
z(\lambda)\in[-1,1].
$$

また

$$
z(0)
=
\frac{a+b}{b-a}
>1.
$$

NA4 で導入した Chebyshev 多項式 $T_k$ を用いて

$$
q_k(\lambda)
=
\frac{
T_k(z(\lambda))
}{
T_k(z(0))
}
$$

と置きます。

これは次数 $k$ 以下で、

$$
q_k(0)=1.
$$

また $\lambda\in[a,b]$ では

$$
|T_k(z(\lambda))|\le1.
$$

従って

$$
\max_{\lambda\in[a,b]}
|q_k(\lambda)|
\le
\frac1{|T_k(z(0))|}.
$$

$x>1$ とし、

$$
w=x+\sqrt{x^2-1}
$$

と置きます。このとき

$$
w^{-1}=x-\sqrt{x^2-1},
\qquad
w+w^{-1}=2x.
$$

そこで

$$
S_k(x)
=
\frac12(w^k+w^{-k})
$$

と置くと、

$$
S_0(x)=1,
\qquad
S_1(x)=x
$$

であり、

$$
S_{k+1}(x)
=
2xS_k(x)-S_{k-1}(x).
$$

NA4 で導いた Chebyshev 多項式も同じ初期値と同じ漸化式を満たすので、帰納法により

$$
T_k(x)=S_k(x).
$$

従って

$$
T_k(x)
=
\frac12
\left[
\left(x+\sqrt{x^2-1}\right)^k
+
\left(x-\sqrt{x^2-1}\right)^k
\right].
$$

両項は正なので

$$
T_k(x)
\ge
\frac12
\left(x+\sqrt{x^2-1}\right)^k.
$$

ここで

$$
\kappa=\frac ba
$$

とすると

$$
z(0)
=
\frac{\kappa+1}{\kappa-1}.
$$

直接計算して

$$
z(0)+\sqrt{z(0)^2-1}
=
\frac{\sqrt\kappa+1}{\sqrt\kappa-1}.
$$

よって

$$
\frac1{|T_k(z(0))|}
\le
2
\left(
\frac{\sqrt\kappa-1}{\sqrt\kappa+1}
\right)^k.
$$

以上を最良近似評価へ代入すれば

$$
\|e_k\|_A
\le
2
\left(
\frac{\sqrt\kappa-1}{\sqrt\kappa+1}
\right)^k
\|e_0\|_A.
$$
<!-- proof-end -->

この評価から、

$$
\kappa\approx1
$$

なら急速に収束し、

$$
\kappa\gg1
$$

なら最悪評価は遅くなると分かります。

ただしこれは固有値を区間 $[a,b]$ だけで囲った最悪評価です。

固有値が少数のクラスターへ集まる場合、実際の CG はこの上界よりかなり速く収束することがあります。残差多項式は「区間全体で小さい」必要はなく、実際の固有値の位置で小さければよいからです。

---

## 10. 残差から誤差をどう読むか

反復法では、真の誤差

$$
e_k=x_*-x_k
$$

は未知です。

一方、残差

$$
r_k=b-Ax_k
$$

は計算できます。

SPD 系では両者の間に特にきれいな関係があります。

<a id="prop-na9-residual-a-norm"></a>
<!-- formal-statement-start -->
### 命題（残差と A-ノルム誤差の双対関係）

$A$ を実対称正定値行列とし、

$$
e_k=x_*-x_k,
\qquad
r_k=b-Ax_k
$$

とする。

このとき

$$
\boxed{
r_k=Ae_k
}
$$

であり、

$$
\boxed{
\|e_k\|_A^2
=
r_k^{\mathsf T}A^{-1}r_k
}
$$

である。

右辺を

$$
\|r_k\|_{A^{-1}}^2
$$

と書けば、

$$
\boxed{
\|e_k\|_A
=
\|r_k\|_{A^{-1}}
}
$$

である。
<!-- formal-statement-end -->

<!-- proof-start -->
### 証明

$Ax_*=b$ なので

$$
r_k
=
b-Ax_k
=
A(x_*-x_k)
=
Ae_k.
$$

従って

$$
e_k=A^{-1}r_k.
$$

よって

$$
\begin{aligned}
\|e_k\|_A^2
&=
e_k^{\mathsf T}Ae_k\\
&=
(A^{-1}r_k)^{\mathsf T}
A
(A^{-1}r_k).
\end{aligned}
$$

$A$ は実対称正定値なので $A^{-1}$ も対称です。したがって

$$
\|e_k\|_A^2
=
r_k^{\mathsf T}A^{-1}r_k.
$$
<!-- proof-end -->

実装では通常、$A^{-1}$ を計算してこの式を評価するわけではありません。

停止判定ではたとえば

$$
\frac{\|r_k\|_2}{\|b\|_2}
\le \text{tolerance}
$$

を使います。

ただし NA1 の [前方誤差と条件数の評価](../NA1/index.md#cor-na1-forward-backward-condition)から、

$$
\frac{\|e_k\|_2}{\|x_*\|_2}
\le
\kappa_2(A)
\frac{\|r_k\|_2}{\|b\|_2}
$$

です。

したがって

~~~text
残差が小さい
  ↓
近い右辺に対してはよく解けている

条件数も小さい
  ↓
真の解にも近い
~~~

という NA1 の二段階評価は、反復法でも変わりません。

---

## 11. 前処理：同じ解を、反復法から見やすい問題へ変える

CG の収束上界には

$$
\kappa_2(A)
$$

が現れました。

そこで元の解を変えずに、反復法が見る行列の条件数や固有値分布を改善することを考えます。

<a id="def-na9-preconditioning"></a>
<!-- formal-statement-start -->
### 定義（前処理と前処理行列）

$A$ を実対称正定値行列とする。

実対称正定値行列 $M$ を選び、その Cholesky 分解を

$$
M=CC^{\mathsf T}
$$

とする。

変数変換

$$
y=C^{\mathsf T}x
$$

により

$$
Ax=b
$$

を

$$
\boxed{
C^{-1}AC^{-\mathsf T}y
=
C^{-1}b
}
$$

へ変換することを **対称前処理**という。

$M$ は、$M^{-1}$ の作用、または $C,C^{\mathsf T}$ による三角連立方程式を十分安く解けるように選ぶ。この $M$ を前処理行列という。
<!-- formal-statement-end -->

<!-- definition-example-start: def-na9-preconditioning -->
### 例：対角前処理で条件数を100から4へ下げる

$$
A=
\operatorname{diag}(1,4,25,100)
$$

を考えます。

SPD で、

$$
\kappa_2(A)=100.
$$

前処理行列を

$$
M=
\operatorname{diag}(1,1,25,25)
$$

とします。

$$
C=
\operatorname{diag}(1,1,5,5)
$$

なら

$$
M=CC^{\mathsf T}.
$$

前処理後の行列は

$$
C^{-1}AC^{-\mathsf T}
=
\operatorname{diag}(1,4,1,4).
$$

従って

$$
\kappa_2(C^{-1}AC^{-\mathsf T})
=
4.
$$

元の系の条件数100に対して、前処理後は4です。

ただし、この改善を得るために毎反復で極端に高価な連立方程式を解くなら意味がありません。

前処理では

$$
\boxed{
\text{反復回数の減少}
\quad\text{対}\quad
\text{1反復あたりの追加コスト}
}
$$

の釣り合いを見る必要があります。
<!-- definition-example-end -->

前処理後の行列も SPD です。

実際、$z\ne0$ に対して

$$
z^{\mathsf T}
C^{-1}AC^{-\mathsf T}
z
=
(C^{-\mathsf T}z)^{\mathsf T}
A
(C^{-\mathsf T}z)
>0.
$$

従って、前処理後の系へ通常の CG 理論を適用できます。

---

## 12. どの反復法を使うか、どこで壊れるか

### 12.1 Jacobi / Gauss--Seidel

長所は構造が単純なことです。

- 成分更新が明示的
- 疎行列の局所構造を使いやすい
- より高度な反復法の前処理・平滑化の考え方にもつながる

一方、収束は

$$
\rho(G)<1
$$

という反復行列の性質に依存します。

可逆性だけでは足りません。

### 12.2 共役勾配法

CG は

- 実対称
- 正定値

の両方が基本仮定です。

正定値性を失うと、アルゴリズムの分母が消えることがあります。

たとえば

$$
A=
\begin{pmatrix}
1&0\\
0&-1
\end{pmatrix},
\qquad
b=
\begin{pmatrix}
1\\1
\end{pmatrix},
\qquad
x_0=0
$$

とします。

$A$ は可逆で対称ですが正定値ではありません。

$$
r_0=p_0=b
$$

に対して

$$
p_0^{\mathsf T}Ap_0
=
(1,1)
\begin{pmatrix}
1\\-1
\end{pmatrix}
=0.
$$

従って

$$
\alpha_0
=
\frac{r_0^{\mathsf T}r_0}
{p_0^{\mathsf T}Ap_0}
$$

が定義できません。

ここで壊れた証明機構は明確です。

正定値性があれば

$$
p^{\mathsf T}Ap>0
\qquad(p\ne0)
$$

でしたが、それが失われたため分母の正値性が消えました。

### 12.3 直接法との使い分け

概略としては

~~~text
小〜中規模の密行列
  → LU / Cholesky / QR

非常に大きい疎行列
  → 反復法・Krylov 法

SPD の大規模疎系
  → CG + 前処理
~~~

です。

ただし同じ行列で多数の右辺を解く場合は、直接分解を一度作って再利用する方が有利なこともあります。

「反復法が常に直接法より優れる」のではなく、行列サイズ・疎性・構造・必要精度・右辺の本数まで含めて選びます。

---

## 13. 演習

### NA9-A01 定常反復とスペクトル半径

- Level: A
- 目安時間: 12分

定常反復

$$
x^{(k+1)}
=
Gx^{(k)}+c,
$$

$$
G=
\begin{pmatrix}
0&1/3\\
1/2&0
\end{pmatrix},
\qquad
c=
\begin{pmatrix}
1\\0
\end{pmatrix}
$$

を考える。

1. $G^2$ を求めよ。
2. $G$ の固有値とスペクトル半径を求めよ。
3. 任意の初期値から収束することを示せ。
4. 固定点 $x^*$ を求めよ。

<!-- solution-start -->
#### 詳細解答

まず

$$
G^2
=
\begin{pmatrix}
0&1/3\\
1/2&0
\end{pmatrix}^2
=
\begin{pmatrix}
1/6&0\\
0&1/6
\end{pmatrix}
=
\frac16 I.
$$

従って2反復ごとに誤差は $1/6$ 倍されます。

次に固有方程式は

$$
\det(\lambda I-G)
=
\det
\begin{pmatrix}
\lambda&-1/3\\
-1/2&\lambda
\end{pmatrix}
=
\lambda^2-\frac16.
$$

従って固有値は

$$
\lambda
=
\pm\frac1{\sqrt6}.
$$

よって

$$
\boxed{
\rho(G)=\frac1{\sqrt6}<1
}.
$$

[定常反復法のスペクトル半径による収束判定](#thm-na9-stationary-convergence)から、任意の初期値に対して固定点へ収束します。

固定点は

$$
x^*=Gx^*+c
$$

を満たします。

成分で書けば

$$
x_1^*
=
1+\frac13x_2^*,
$$

$$
x_2^*
=
\frac12x_1^*.
$$

第2式を第1式へ代入して

$$
x_1^*
=
1+\frac16x_1^*.
$$

従って

$$
\frac56x_1^*=1,
\qquad
x_1^*=\frac65.
$$

よって

$$
x_2^*
=
\frac12\cdot\frac65
=
\frac35.
$$

したがって

$$
\boxed{
x^*
=
\begin{pmatrix}
6/5\\
3/5
\end{pmatrix}
}.
$$
<!-- solution-end -->

### NA9-A02 Jacobi 法と Gauss--Seidel 法

- Level: A
- 目安時間: 15分

$$
A=
\begin{pmatrix}
2&-1\\
-1&2
\end{pmatrix},
\qquad
b=
\begin{pmatrix}
1\\0
\end{pmatrix},
\qquad
x^{(0)}=0
$$

とする。

1. Jacobi 法の反復行列を求め、$x^{(1)},x^{(2)},x^{(3)}$ を計算せよ。
2. Gauss--Seidel 法の反復行列を求め、$x^{(1)},x^{(2)}$ を計算せよ。
3. 両反復行列のスペクトル半径を比較せよ。
4. 厳密解を求め、反復値がどちらへ近づくか確認せよ。

<!-- solution-start -->
#### 詳細解答

方程式は

$$
2x_1-x_2=1,
$$

$$
-x_1+2x_2=0.
$$

Jacobi 法は

$$
x_1^{(k+1)}
=
\frac{1+x_2^{(k)}}2,
\qquad
x_2^{(k+1)}
=
\frac{x_1^{(k)}}2.
$$

従って

$$
G_J
=
\begin{pmatrix}
0&1/2\\
1/2&0
\end{pmatrix}.
$$

$x^{(0)}=0$ から

$$
x^{(1)}
=
\begin{pmatrix}
1/2\\0
\end{pmatrix}.
$$

次に

$$
x^{(2)}
=
\begin{pmatrix}
1/2\\1/4
\end{pmatrix}.
$$

さらに

$$
x^{(3)}
=
\begin{pmatrix}
5/8\\1/4
\end{pmatrix}.
$$

$G_J$ の固有値は

$$
\pm\frac12
$$

なので

$$
\rho(G_J)=\frac12.
$$

Gauss--Seidel 法では

$$
x_1^{(k+1)}
=
\frac{1+x_2^{(k)}}2
$$

を先に求め、

$$
x_2^{(k+1)}
=
\frac{x_1^{(k+1)}}2
$$

とします。

したがって

$$
x_2^{(k+1)}
=
\frac14+\frac14x_2^{(k)}.
$$

よって

$$
G_{GS}
=
\begin{pmatrix}
0&1/2\\
0&1/4
\end{pmatrix}.
$$

$x^{(0)}=0$ から

$$
x^{(1)}
=
\begin{pmatrix}
1/2\\1/4
\end{pmatrix},
$$

$$
x^{(2)}
=
\begin{pmatrix}
5/8\\5/16
\end{pmatrix}.
$$

$G_{GS}$ は上三角なので固有値は対角成分

$$
0,\qquad\frac14.
$$

従って

$$
\rho(G_{GS})=\frac14.
$$

この例では

$$
\rho(G_{GS})
<
\rho(G_J).
$$

厳密解は第2式から

$$
x_1=2x_2
$$

なので、第1式へ代入して

$$
4x_2-x_2=1.
$$

従って

$$
x_2=\frac13,
\qquad
x_1=\frac23.
$$

よって

$$
\boxed{
x_*=
\begin{pmatrix}
2/3\\1/3
\end{pmatrix}
}.
$$

どちらの反復列もこの解へ近づきます。
<!-- solution-end -->

### NA9-A03 Krylov 部分空間と残差多項式

- Level: A
- 目安時間: 12分

$$
A=
\begin{pmatrix}
1&0\\
0&3
\end{pmatrix},
\qquad
r_0=
\begin{pmatrix}
1\\1
\end{pmatrix}
$$

とする。

1. $\mathcal K_1(A,r_0)$ と $\mathcal K_2(A,r_0)$ を求めよ。
2. 
   $$
   q_2(t)
   =
   (1-t)\left(1-\frac t3\right)
   $$
   が $q_2(0)=1$ を満たすことを確認せよ。
3. $q_2(A)r_0$ を計算し、この2次元問題で2段階以内に残差を0にできる理由を説明せよ。

<!-- solution-start -->
#### 詳細解答

まず

$$
\mathcal K_1(A,r_0)
=
\operatorname{span}
\left\{
\begin{pmatrix}
1\\1
\end{pmatrix}
\right\}.
$$

次に

$$
Ar_0
=
\begin{pmatrix}
1\\3
\end{pmatrix}.
$$

$r_0$ と $Ar_0$ を列に並べると

$$
\det
\begin{pmatrix}
1&1\\
1&3
\end{pmatrix}
=2\ne0.
$$

従って両者は一次独立で、

$$
\boxed{
\mathcal K_2(A,r_0)=\mathbb R^2
}.
$$

多項式は

$$
q_2(t)
=
(1-t)\left(1-\frac t3\right)
$$

なので

$$
q_2(0)=1.
$$

また $A$ の固有値は1と3だから

$$
q_2(1)=0,
\qquad
q_2(3)=0.
$$

$A$ は対角行列なので

$$
q_2(A)
=
\begin{pmatrix}
q_2(1)&0\\
0&q_2(3)
\end{pmatrix}
=
0.
$$

したがって

$$
\boxed{
q_2(A)r_0=0
}.
$$

[残差多項式表示](#prop-na9-krylov-residual-polynomial)より、$q_2(0)=1$ で次数2以下の多項式が残差を0にできるため、

$$
x_2\in x_0+\mathcal K_2(A,r_0)
$$

の中に厳密解が存在します。
<!-- solution-end -->

### NA9-A04 共役勾配法を2回実行する

- Level: A
- 目安時間: 20分

$$
A=
\begin{pmatrix}
4&1\\
1&3
\end{pmatrix},
\qquad
b=
\begin{pmatrix}
1\\2
\end{pmatrix},
\qquad
x_0=0
$$

に共役勾配法を適用する。

$\alpha_0,r_1,\beta_0,p_1,\alpha_1,x_2$ を順に計算し、$r_2=0$ を確認せよ。

<!-- solution-start -->
#### 詳細解答

初期残差と探索方向は

$$
r_0=p_0=
\begin{pmatrix}
1\\2
\end{pmatrix}.
$$

$$
Ap_0=
\begin{pmatrix}
6\\7
\end{pmatrix}.
$$

従って

$$
r_0^{\mathsf T}r_0
=
1+4=5,
$$

$$
p_0^{\mathsf T}Ap_0
=
6+14=20.
$$

よって

$$
\boxed{
\alpha_0=\frac14
}.
$$

したがって

$$
x_1
=
x_0+\frac14p_0
=
\begin{pmatrix}
1/4\\1/2
\end{pmatrix}.
$$

残差は

$$
r_1
=
r_0-\frac14Ap_0
=
\begin{pmatrix}
1\\2
\end{pmatrix}
-
\begin{pmatrix}
3/2\\7/4
\end{pmatrix}
=
\boxed{
\begin{pmatrix}
-1/2\\1/4
\end{pmatrix}
}.
$$

その二乗ノルムは

$$
r_1^{\mathsf T}r_1
=
\frac14+\frac1{16}
=
\frac5{16}.
$$

従って

$$
\boxed{
\beta_0
=
\frac{5/16}{5}
=
\frac1{16}
}.
$$

よって

$$
p_1
=
r_1+\frac1{16}p_0
$$

より

$$
p_1
=
\begin{pmatrix}
-1/2+1/16\\
1/4+2/16
\end{pmatrix}
=
\boxed{
\begin{pmatrix}
-7/16\\3/8
\end{pmatrix}
}.
$$

次に

$$
Ap_1
=
\begin{pmatrix}
4&1\\
1&3
\end{pmatrix}
\begin{pmatrix}
-7/16\\3/8
\end{pmatrix}
=
\begin{pmatrix}
-11/8\\11/16
\end{pmatrix}.
$$

従って

$$
\begin{aligned}
p_1^{\mathsf T}Ap_1
&=
\left(-\frac7{16}\right)
\left(-\frac{11}{8}\right)
+
\frac38\cdot\frac{11}{16}\\
&=
\frac{77}{128}+\frac{33}{128}\\
&=
\frac{55}{64}.
\end{aligned}
$$

よって

$$
\boxed{
\alpha_1
=
\frac{5/16}{55/64}
=
\frac4{11}
}.
$$

したがって

$$
\begin{aligned}
x_2
&=
x_1+\frac4{11}p_1\\
&=
\begin{pmatrix}
1/4\\1/2
\end{pmatrix}
+
\frac4{11}
\begin{pmatrix}
-7/16\\3/8
\end{pmatrix}\\
&=
\boxed{
\begin{pmatrix}
1/11\\7/11
\end{pmatrix}
}.
\end{aligned}
$$

最後に

$$
Ax_2
=
\begin{pmatrix}
4/11+7/11\\
1/11+21/11
\end{pmatrix}
=
\begin{pmatrix}
1\\2
\end{pmatrix}
=b.
$$

従って

$$
\boxed{
r_2=b-Ax_2=0
}.
$$
<!-- solution-end -->

### NA9-B01 狭義行優対角と Jacobi 法

- Level: B
- 目安時間: 18分

$A=(a_{ij})$ が

$$
|a_{ii}|
>
\sum_{j\ne i}|a_{ij}|
\qquad(i=1,\dots,n)
$$

を満たすとする。

Jacobi 反復行列 $G_J$ について

$$
\|G_J\|_\infty<1
$$

を示し、

$$
\rho(G_J)<1
$$

を導け。

最後に、これが任意の初期値からの収束を意味する理由を述べよ。

<!-- solution-start -->
#### 詳細解答

Jacobi 法では

$$
G_J=-D^{-1}(L+U).
$$

第 $i$ 行の対角成分は0で、$j\ne i$ に対して

$$
(G_J)_{ij}
=
-\frac{a_{ij}}{a_{ii}}.
$$

従って第 $i$ 行の絶対値行和は

$$
\sum_j |(G_J)_{ij}|
=
\frac{\sum_{j\ne i}|a_{ij}|}{|a_{ii}|}.
$$

仮定より

$$
\sum_{j\ne i}|a_{ij}|
<
|a_{ii}|,
$$

だから

$$
\frac{\sum_{j\ne i}|a_{ij}|}{|a_{ii}|}
<1.
$$

したがって

$$
\boxed{
\|G_J\|_\infty
=
\max_i
\sum_j |(G_J)_{ij}|
<1
}.
$$

次に $G_Jv=\lambda v$、$v\ne0$ とします。

誘導ノルムの性質から

$$
|\lambda|\|v\|_\infty
=
\|G_Jv\|_\infty
\le
\|G_J\|_\infty\|v\|_\infty.
$$

$v\ne0$ なので $\|v\|_\infty>0$ です。従って

$$
|\lambda|
\le
\|G_J\|_\infty
<1.
$$

全固有値について成り立つので

$$
\boxed{
\rho(G_J)<1
}.
$$

[定常反復法の収束判定](#thm-na9-stationary-convergence)より、

$$
\rho(G_J)<1
$$

なら

$$
G_J^k\to0.
$$

誤差は

$$
e^{(k)}
=
G_J^k e^{(0)}
$$

なので、任意の初期誤差 $e^{(0)}$ に対して

$$
e^{(k)}\to0.
$$

従って Jacobi 法は任意の初期値から収束します。
<!-- solution-end -->

### NA9-B02 最小多項式と Krylov 法の有限回終了

- Level: B
- 目安時間: 22分

$A$ を可逆行列とし、$r_0\ne0$ とする。

$r_0$ に作用させたとき0になる非零多項式のうち次数最小のものを $\mu$ とし、

$$
\mu(A)r_0=0,
\qquad
\deg\mu=d
$$

とする。

1. $\mu(0)\ne0$ を示せ。
2. 
   $$
   q(t)=\frac{\mu(t)}{\mu(0)}
   $$
   が $q(0)=1$ を満たし、$q(A)r_0=0$ となることを示せ。
3. $x_0+\mathcal K_d(A,r_0)$ の中に厳密解が存在することを示せ。

<!-- solution-start -->
#### 詳細解答

まず $\mu(0)=0$ と仮定して矛盾を導きます。

$\mu(0)=0$ なら多項式 $\mu$ は $t$ を因子に持つので、

$$
\mu(t)=t\nu(t)
$$

と書けます。

ここで

$$
\deg\nu=d-1.
$$

仮定

$$
\mu(A)r_0=0
$$

へ代入すると

$$
A\nu(A)r_0=0.
$$

$A$ は可逆なので、両辺へ $A^{-1}$ を作用させて

$$
\nu(A)r_0=0.
$$

しかし $\nu$ は $\mu$ より低次数の非零多項式です。

これは $\mu$ の次数最小性に矛盾します。

従って

$$
\boxed{
\mu(0)\ne0
}.
$$

そこで

$$
q(t)
=
\frac{\mu(t)}{\mu(0)}
$$

と置けます。

すると

$$
q(0)=1
$$

であり、

$$
q(A)r_0
=
\frac1{\mu(0)}
\mu(A)r_0
=0.
$$

また

$$
\deg q=d.
$$

[残差多項式表示](#prop-na9-krylov-residual-polynomial)より、次数 $d$ 以下で $q(0)=1$ を満たす残差多項式が残差を0にできるなら、

$$
x_d\in x_0+\mathcal K_d(A,r_0)
$$

の中に

$$
b-Ax_d=0
$$

を満たす点が存在します。

$A$ は可逆なのでこの点は一意な厳密解です。

従って

$$
\boxed{
x_*\in x_0+\mathcal K_d(A,r_0)
}.
$$

これは Krylov 法の有限回終了が、全空間の次元 $n$ だけでなく、初期残差から見た最小多項式の次数によって早まる場合があることを示します。
<!-- solution-end -->

### NA9-B03 前処理と条件数

- Level: B
- 目安時間: 18分

$$
A=
\operatorname{diag}(1,4,25,100)
$$

に対し、

$$
M=
\operatorname{diag}(1,1,25,25)
$$

を前処理行列として用いる。

1. $\kappa_2(A)$ を求めよ。
2. $M=CC^{\mathsf T}$ を満たす対角行列 $C$ を求めよ。
3. 前処理後の行列
   $$
   \widetilde A
   =
   C^{-1}AC^{-\mathsf T}
   $$
   と $\kappa_2(\widetilde A)$ を求めよ。
4. CG の Chebyshev 評価に現れる1反復あたりの係数
   $$
   \frac{\sqrt\kappa-1}{\sqrt\kappa+1}
   $$
   を、前処理前後で比較せよ。

<!-- solution-start -->
#### 詳細解答

$A$ は SPD 対角行列で、最小固有値は1、最大固有値は100です。

従って

$$
\boxed{
\kappa_2(A)=100
}.
$$

次に

$$
M=
\operatorname{diag}(1,1,25,25)
$$

なので

$$
\boxed{
C=
\operatorname{diag}(1,1,5,5)
}
$$

とすれば

$$
CC^{\mathsf T}=M.
$$

$C$ は対角なので

$$
C^{-1}
=
\operatorname{diag}
\left(
1,1,\frac15,\frac15
\right).
$$

従って

$$
\begin{aligned}
\widetilde A
&=
C^{-1}AC^{-\mathsf T}\\
&=
\operatorname{diag}(1,4,1,4).
\end{aligned}
$$

よって

$$
\boxed{
\kappa_2(\widetilde A)=4
}.
$$

前処理前は

$$
\sqrt\kappa=10
$$

なので係数は

$$
\boxed{
\frac{10-1}{10+1}
=
\frac9{11}
}.
$$

前処理後は

$$
\sqrt\kappa=2
$$

なので

$$
\boxed{
\frac{2-1}{2+1}
=
\frac13
}.
$$

したがって Chebyshev 型の最悪評価では、前処理により幾何減衰係数が

$$
\frac9{11}
\quad\text{から}\quad
\frac13
$$

へ大きく改善します。

ただしこれはあくまで条件数だけを使った上界です。

実際の収束は固有値の分布やクラスターにも依存し、また前処理を適用する計算コストも必要です。したがって「条件数だけ小さければ前処理は常に得」とは限りません。
<!-- solution-end -->

### NA9-C01 3次 SPD 系で CG の直交構造を追う

- Level: C
- 目安時間: 35分

$$
A=
\begin{pmatrix}
2&-1&0\\
-1&2&-1\\
0&-1&2
\end{pmatrix},
\qquad
b=
\begin{pmatrix}
1\\0\\0
\end{pmatrix},
\qquad
x_0=0
$$

とする。

1. $A$ が正定値であることを確認せよ。
2. 共役勾配法を $r_3=0$ となるまで実行し、$x_1,x_2,x_3$ を求めよ。
3. $r_0,r_1,r_2$ が互いに直交することを確認せよ。
4. $p_0,p_1,p_2$ が互いに $A$-共役であることを確認せよ。
5. 厳密解を求め、$x_3$ と一致することを確認せよ。

<!-- solution-start -->
#### 詳細解答

まず正定値性を定義から確認します。

任意の

$$
z=
\begin{pmatrix}
z_1\\z_2\\z_3
\end{pmatrix}
$$

に対して

$$
\begin{aligned}
z^{\mathsf T}Az
&=
2z_1^2-2z_1z_2+2z_2^2-2z_2z_3+2z_3^2\\
&=
z_1^2+(z_1-z_2)^2+(z_2-z_3)^2+z_3^2.
\end{aligned}
$$

右辺は非負項の和です。これが0なら

$$
z_1=0,\qquad
z_1-z_2=0,\qquad
z_2-z_3=0,\qquad
z_3=0
$$

なので $z=0$ です。

従って $z\ne0$ なら

$$
z^{\mathsf T}Az>0.
$$

また $A^{\mathsf T}=A$ なので、定義により $A$ は実対称正定値です。

ここから CG を実行します。

初期値は

$$
r_0=p_0=
\begin{pmatrix}
1\\0\\0
\end{pmatrix}.
$$

$$
Ap_0
=
\begin{pmatrix}
2\\-1\\0
\end{pmatrix}.
$$

従って

$$
\alpha_0
=
\frac{r_0^{\mathsf T}r_0}
{p_0^{\mathsf T}Ap_0}
=
\frac12.
$$

よって

$$
\boxed{
x_1=
\begin{pmatrix}
1/2\\0\\0
\end{pmatrix}
}.
$$

残差は

$$
r_1
=
r_0-\frac12Ap_0
=
\begin{pmatrix}
1\\0\\0
\end{pmatrix}
-
\begin{pmatrix}
1\\-1/2\\0
\end{pmatrix}
=
\boxed{
\begin{pmatrix}
0\\1/2\\0
\end{pmatrix}
}.
$$

$$
\beta_0
=
\frac{r_1^{\mathsf T}r_1}
{r_0^{\mathsf T}r_0}
=
\frac14.
$$

従って

$$
p_1
=
r_1+\frac14p_0
=
\boxed{
\begin{pmatrix}
1/4\\1/2\\0
\end{pmatrix}
}.
$$

次に

$$
Ap_1
=
\begin{pmatrix}
0\\3/4\\-1/2
\end{pmatrix}.
$$

$$
p_1^{\mathsf T}Ap_1
=
\frac12\cdot\frac34
=
\frac38.
$$

また

$$
r_1^{\mathsf T}r_1=\frac14.
$$

従って

$$
\alpha_1
=
\frac{1/4}{3/8}
=
\frac23.
$$

よって

$$
\begin{aligned}
x_2
&=
x_1+\frac23p_1\\
&=
\begin{pmatrix}
1/2\\0\\0
\end{pmatrix}
+
\begin{pmatrix}
1/6\\1/3\\0
\end{pmatrix}\\
&=
\boxed{
\begin{pmatrix}
2/3\\1/3\\0
\end{pmatrix}
}.
\end{aligned}
$$

残差は

$$
\begin{aligned}
r_2
&=
r_1-\frac23Ap_1\\
&=
\begin{pmatrix}
0\\1/2\\0
\end{pmatrix}
-
\begin{pmatrix}
0\\1/2\\-1/3
\end{pmatrix}\\
&=
\boxed{
\begin{pmatrix}
0\\0\\1/3
\end{pmatrix}
}.
\end{aligned}
$$

$$
\beta_1
=
\frac{r_2^{\mathsf T}r_2}
{r_1^{\mathsf T}r_1}
=
\frac{1/9}{1/4}
=
\frac49.
$$

従って

$$
p_2
=
r_2+\frac49p_1
$$

より

$$
p_2
=
\boxed{
\begin{pmatrix}
1/9\\2/9\\1/3
\end{pmatrix}
}.
$$

次に

$$
Ap_2
=
\begin{pmatrix}
0\\0\\4/9
\end{pmatrix}.
$$

従って

$$
p_2^{\mathsf T}Ap_2
=
\frac13\cdot\frac49
=
\frac4{27}.
$$

また

$$
r_2^{\mathsf T}r_2=\frac19.
$$

よって

$$
\alpha_2
=
\frac{1/9}{4/27}
=
\frac34.
$$

したがって

$$
\begin{aligned}
x_3
&=
x_2+\frac34p_2\\
&=
\begin{pmatrix}
2/3\\1/3\\0
\end{pmatrix}
+
\begin{pmatrix}
1/12\\1/6\\1/4
\end{pmatrix}\\
&=
\boxed{
\begin{pmatrix}
3/4\\1/2\\1/4
\end{pmatrix}
}.
\end{aligned}
$$

残差は

$$
r_3
=
r_2-\frac34Ap_2
=
\begin{pmatrix}
0\\0\\1/3
\end{pmatrix}
-
\begin{pmatrix}
0\\0\\1/3
\end{pmatrix}
=0.
$$

次に残差の直交性を確認します。

$$
r_0=
\begin{pmatrix}
1\\0\\0
\end{pmatrix},
\qquad
r_1=
\begin{pmatrix}
0\\1/2\\0
\end{pmatrix},
\qquad
r_2=
\begin{pmatrix}
0\\0\\1/3
\end{pmatrix}.
$$

従って

$$
r_0^{\mathsf T}r_1
=
r_0^{\mathsf T}r_2
=
r_1^{\mathsf T}r_2
=0.
$$

探索方向については

$$
Ap_0=
\begin{pmatrix}
2\\-1\\0
\end{pmatrix},
$$

$$
Ap_1=
\begin{pmatrix}
0\\3/4\\-1/2
\end{pmatrix},
$$

$$
Ap_2=
\begin{pmatrix}
0\\0\\4/9
\end{pmatrix}.
$$

よって

$$
p_1^{\mathsf T}Ap_0
=
\frac14\cdot2+\frac12(-1)
=0,
$$

$$
p_2^{\mathsf T}Ap_0
=
\frac19\cdot2+\frac29(-1)
=0,
$$

$$
p_2^{\mathsf T}Ap_1
=
\frac29\cdot\frac34
+
\frac13\left(-\frac12\right)
=
\frac16-\frac16
=0.
$$

従って

$$
p_0,p_1,p_2
$$

は互いに $A$-共役です。

最後に

$$
Ax=b
$$

を直接解きます。

第3行から

$$
-x_2+2x_3=0
\quad\Longrightarrow\quad
x_2=2x_3.
$$

第2行は

$$
-x_1+2x_2-x_3=0.
$$

$x_2=2x_3$ を代入すると

$$
x_1=3x_3.
$$

第1行は

$$
2x_1-x_2=1.
$$

従って

$$
6x_3-2x_3=1
$$

なので

$$
x_3=\frac14.
$$

よって

$$
x_2=\frac12,
\qquad
x_1=\frac34.
$$

したがって厳密解は

$$
\boxed{
x_*=
\begin{pmatrix}
3/4\\1/2\\1/4
\end{pmatrix}
=x_3
}.
$$

3次元で、互いに $A$-共役な3本の探索方向を作った時点で厳密解へ到達したことが、数値だけでなく直交構造からも確認できます。
<!-- solution-end -->

---

## 14. この章の要点

1. 定常反復法では
   $$
   e^{(k+1)}=Ge^{(k)}
   $$
   となり、収束は反復行列の冪で決まる。
2. 任意の初期値からの収束条件は
   $$
   \boxed{\rho(G)<1}
   $$
   である。
3. Jacobi 法・Gauss--Seidel 法は行列分解から得られる定常反復法であり、元の行列が可逆なだけでは収束は保証されない。
4. Krylov 法では
   $$
   \mathcal K_k(A,r_0)
   =
   \operatorname{span}\{r_0,Ar_0,\dots,A^{k-1}r_0\}
   $$
   を探索空間とする。
5. Krylov 反復の残差は
   $$
   r_k=q_k(A)r_0,
   \qquad
   q_k(0)=1
   $$
   という多項式で表される。
6. SPD 行列では $A$-内積が使え、CG の探索方向は互いに $A$-共役、残差は互いに直交する。
7. CG は
   $$
   x_0+\mathcal K_k(A,r_0)
   $$
   の中で $A$-ノルム誤差を最小にする。
8. 最悪収束評価は
   $$
   \|e_k\|_A
   \le
   2
   \left(
   \frac{\sqrt\kappa-1}{\sqrt\kappa+1}
   \right)^k
   \|e_0\|_A
   $$
   で、条件数の平方根が現れる。
9. 前処理は解を変えず、反復法から見た固有値分布を改善する。ただし反復回数と1反復コストの両方を見る。
10. CG の SPD 仮定を失うと、$p^{\mathsf T}Ap>0$ が壊れ、更新式自体が定義できないことがある。

次の NA10 では、線形方程式を解くのではなく、行列の固有値・固有ベクトルそのものを数値的に求める方法へ進みます。
