# LAX1 追加演習：Level B / C

このページは「線形代数・院試／編入 計算演習」の追加セットです。既存の Level A 8題・Level B 5題・Level C 2題に続き、**Level B を5題、Level C を2題**追加します。理論を増やすのではなく、院試・編入で頻出する「場合分け→計算法の選択→検算」までを紙上で完遂する練習に絞ります。

## Level B：複数概念をつないで処理する

<a id="ex-lax1-b06"></a>
### LAX1-B06 パラメータ付き対称行列と連立方程式
- Level: B

実数 $a$ に対し

$$
A_a=
\begin{pmatrix}
1&a&a\\
a&1&a\\
a&a&1
\end{pmatrix},
\qquad
b=\begin{pmatrix}1\\0\\-1\end{pmatrix}
$$

とする。

1. $A_a$ の固有値とその重複度を求めよ。
2. $A_a$ が可逆でない $a$ をすべて求め、そのときの階数を求めよ。
3. $A_ax=b$ の解を $a$ によって分類し、解が存在する場合は解全体を求めよ。

<!-- solution-start -->
**解答**：$(1,1,1)^T$ は固有値 $1+2a$ の固有ベクトルです。また

$$
V=\{x\in\mathbb R^3:x_1+x_2+x_3=0\}
$$

上では $A_ax=(1-a)x$ なので、固有値は

$$
\boxed{1+2a\ (1\text{重}),\qquad 1-a\ (2\text{重})}.
$$

したがって

$$
\det A_a=(1+2a)(1-a)^2
$$

より、可逆でないのは

$$
\boxed{a=1,\ -\frac12}.
$$

$a=1$ では階数1、$a=-1/2$ では階数2です。

$b$ は成分和が0なので $b\in V$ です。よって $a\neq1$ なら $V$ 上で

$$
A_a=(1-a)I
$$

として作用します。さらに $a\neq-1/2$ なら一意解で

$$
\boxed{x=\frac1{1-a}(1,0,-1)^T}.
$$

$a=-1/2$ では $\ker A_a=\operatorname{span}\{(1,1,1)^T\}$ なので

$$
\boxed{x=\frac23(1,0,-1)^T+t(1,1,1)^T,\qquad t\in\mathbb R}.
$$

$a=1$ では像が $\operatorname{span}\{(1,1,1)^T\}$ であり $b$ はそこに属さないため解なしです。
<!-- solution-end -->

<a id="ex-lax1-b07"></a>
### LAX1-B07 双対基底と annihilator を手計算する
- Level: B

$\mathbb R^3$ の基底

$$
b_1=(1,1,0)^T,\qquad
b_2=(1,0,1)^T,\qquad
b_3=(0,1,1)^T
$$

に対する双対基底 $\varphi_1,\varphi_2,\varphi_3\in(\mathbb R^3)^*$ を求めよ。さらに

$$
U=\operatorname{span}\{b_1,b_2\}
$$

の annihilator $U^\circ$ の基底を求めよ。

<!-- solution-start -->
**解答**：基底行列を

$$
B=\begin{pmatrix}1&1&0\\1&0&1\\0&1&1\end{pmatrix}
$$

とすると、双対基底の係数は $B^{-1}$ の各行です。

$$
B^{-1}=\frac12
\begin{pmatrix}
1&1&-1\\
1&-1&1\\
-1&1&1
\end{pmatrix}.
$$

したがって $x=(x_1,x_2,x_3)^T$ に対し

$$
\boxed{\varphi_1(x)=\frac{x_1+x_2-x_3}{2}},
$$

$$
\boxed{\varphi_2(x)=\frac{x_1-x_2+x_3}{2}},
$$

$$
\boxed{\varphi_3(x)=\frac{-x_1+x_2+x_3}{2}}.
$$

実際 $\varphi_i(b_j)=\delta_{ij}$ です。

$U$ 上で消える汎関数は $b_1,b_2$ の係数を拾わない $\varphi_3$ の倍なので

$$
\boxed{U^\circ=\operatorname{span}\{\varphi_3\}}.
$$
<!-- solution-end -->

<a id="ex-lax1-b08"></a>
### LAX1-B08 複素 Hermitian 行列の unitary 対角化
- Level: B

$$
A=\begin{pmatrix}1&i\\-i&1\end{pmatrix}
$$

について、固有値と正規直交固有基底を求め、unitary 行列 $Q$ により $Q^*AQ$ を対角化せよ。さらに整数 $n\ge1$ に対する $A^n$ を求めよ。

<!-- solution-start -->
**解答**：

$$
\det(\lambda I-A)=\lambda(\lambda-2)
$$

なので固有値は $0,2$ です。対応する単位固有ベクトルとして

$$
q_0=\frac1{\sqrt2}\begin{pmatrix}-i\\1\end{pmatrix},
\qquad
q_2=\frac1{\sqrt2}\begin{pmatrix}i\\1\end{pmatrix}
$$

を取れます。$q_0^*q_2=0$ なので

$$
Q=(q_0,q_2)
$$

は unitary で

$$
\boxed{Q^*AQ=\operatorname{diag}(0,2)}.
$$

したがって $n\ge1$ では

$$
A^n=Q\operatorname{diag}(0,2^n)Q^*=2^{n-1}A.
$$

よって

$$
\boxed{A^n=2^{n-1}\begin{pmatrix}1&i\\-i&1\end{pmatrix}}.
$$

検算として $A^2=2A$ が直ちに確認できます。
<!-- solution-end -->

<a id="ex-lax1-b09"></a>
### LAX1-B09 Schur 分解と対角化不可能性
- Level: B

$$
A=\begin{pmatrix}1&1\\-1&3\end{pmatrix}
$$

について、直交行列 $Q$ を一つ構成して

$$
Q^TAQ=T
$$

が上三角になる Schur 分解を求めよ。さらに $A$ が対角化不可能であること、および normal でないことを確認せよ。

<!-- solution-start -->
**解答**：特性多項式は

$$
\det(\lambda I-A)=(\lambda-2)^2.
$$

固有値2の固有ベクトルとして $(1,1)^T$ を取り、

$$
q_1=\frac1{\sqrt2}(1,1)^T,
\qquad
q_2=\frac1{\sqrt2}(-1,1)^T
$$

とします。すると

$$
Q=\frac1{\sqrt2}
\begin{pmatrix}
1&-1\\
1&1
\end{pmatrix}
$$

は直交行列で、直接計算すると

$$
\boxed{Q^TAQ=
\begin{pmatrix}
2&2\\
0&2
\end{pmatrix}}.
$$

一方

$$
\ker(A-2I)=\operatorname{span}\{(1,1)^T\}
$$

は1次元なので、代数的重複度2に対して固有ベクトルが不足し、$A$ は対角化不可能です。

また

$$
A^TA=\begin{pmatrix}2&-2\\-2&10\end{pmatrix},
\qquad
AA^T=\begin{pmatrix}2&2\\2&10\end{pmatrix}
$$

で一致しないため normal ではありません。
<!-- solution-end -->

<a id="ex-lax1-b10"></a>
### LAX1-B10 polar decomposition を具体的に構成する
- Level: B

$$
A=\begin{pmatrix}0&-2\\1&0\end{pmatrix}
$$

について、$A=UP$、$P=(A^TA)^{1/2}$ となる polar decomposition を求めよ。さらに $U^TU=I$ を確認し、特異値も求めよ。

<!-- solution-start -->
**解答**：

$$
A^TA=\begin{pmatrix}1&0\\0&4\end{pmatrix}
$$

より

$$
\boxed{P=(A^TA)^{1/2}=\begin{pmatrix}1&0\\0&2\end{pmatrix}}.
$$

$P$ は可逆なので

$$
U=AP^{-1}
=\begin{pmatrix}0&-1\\1&0\end{pmatrix}.
$$

したがって

$$
\boxed{A=UP},
\qquad
\boxed{U^TU=I}.
$$

$A^TA$ の固有値は $1,4$ なので特異値は

$$
\boxed{2,1}.
$$

この問題では「まず $A^TA$、次に正の平方根 $P$、最後に $U=AP^{-1}$」の順に計算すると迷いません。
<!-- solution-end -->

## Level C：構造を復元してから計算する

<a id="ex-lax1-c03"></a>
### LAX1-C03 Jordan 鎖を自力で作り $A^n$ を求める
- Level: C

$$
A=
\begin{pmatrix}
2&1&1\\
0&2&1\\
0&0&2
\end{pmatrix}
$$

について次を求めよ。

1. 特性多項式と最小多項式。
2. $A$ の Jordan 鎖 $v_1,v_2,v_3$（$(A-2I)v_1=0$, $(A-2I)v_2=v_1$, $(A-2I)v_3=v_2$）。
3. $P^{-1}AP=J_3(2)$ を満たす $P$。
4. $n\ge2$ に対する $A^n$。

<!-- solution-start -->
**解答**：$N=A-2I$ とすると

$$
N=\begin{pmatrix}0&1&1\\0&0&1\\0&0&0\end{pmatrix},
\qquad
N^2=\begin{pmatrix}0&0&1\\0&0&0\\0&0&0\end{pmatrix},
\qquad N^3=0.
$$

よって

$$
\boxed{\chi_A(t)=(t-2)^3},
\qquad
\boxed{m_A(t)=(t-2)^3}.
$$

Jordan 鎖として

$$
v_1=e_1,
\qquad
v_2=e_2,
\qquad
v_3=(0,-1,1)^T
$$

を取れます。実際

$$
Nv_1=0,\qquad Nv_2=v_1,\qquad Nv_3=v_2.
$$

したがって

$$
P=(v_1,v_2,v_3)=
\begin{pmatrix}
1&0&0\\
0&1&-1\\
0&0&1
\end{pmatrix}
$$

とすれば

$$
\boxed{P^{-1}AP=J_3(2)}.
$$

$A=2I+N$ と $N^3=0$ から二項展開して

$$
A^n
=2^nI+n2^{n-1}N+\binom n2 2^{n-2}N^2.
$$

従って

$$
\boxed{
A^n=
\begin{pmatrix}
2^n&n2^{n-1}&n2^{n-1}+\binom n2 2^{n-2}\\
0&2^n&n2^{n-1}\\
0&0&2^n
\end{pmatrix}.}
$$
<!-- solution-end -->

<a id="ex-lax1-c04"></a>
### LAX1-C04 核の増え方から nilpotent の Jordan block を復元する
- Level: C

$$
N=
\begin{pmatrix}
0&1&0&0&0\\
0&0&0&0&1\\
0&0&0&1&0\\
0&0&0&0&0\\
0&0&0&0&0
\end{pmatrix}
$$

とする。

1. $\dim\ker N$, $\dim\ker N^2$, $\dim\ker N^3$ を求めよ。
2. Jordan block の個数と各 block の大きさを求めよ。
3. Jordan 基底を一つ具体的に与えよ。
4. $(I-N)^{-1}$ を求めよ。

<!-- solution-start -->
**解答**：$x=(x_1,\dots,x_5)^T$ とすると

$$
Nx=(x_2,x_5,x_4,0,0)^T.
$$

したがって

$$
\ker N=\{x:x_2=x_4=x_5=0\}
$$

より

$$
\boxed{\dim\ker N=2}.
$$

また

$$
N^2x=(x_5,0,0,0,0)^T,
\qquad N^3=0
$$

なので

$$
\boxed{\dim\ker N^2=4},
\qquad
\boxed{\dim\ker N^3=5}.
$$

$\dim\ker N=2$ から Jordan block は2個です。さらに

$$
\dim\ker N^2-\dim\ker N=2
$$

より長さ2以上の block が2個、

$$
\dim\ker N^3-\dim\ker N^2=1
$$

より長さ3以上の block が1個です。したがって block の大きさは

$$
\boxed{3\text{ と }2}.
$$

実際

$$
e_5\mapsto e_2\mapsto e_1\mapsto0,
\qquad
e_4\mapsto e_3\mapsto0
$$

が Jordan 鎖です。従って

$$
P=(e_1,e_2,e_5,e_3,e_4)
$$

とすれば

$$
\boxed{P^{-1}NP=J_3(0)\oplus J_2(0)}.
$$

最後に $N^3=0$ なので有限幾何級数から

$$
(I-N)^{-1}=I+N+N^2.
$$

よって

$$
\boxed{
(I-N)^{-1}=
\begin{pmatrix}
1&1&0&0&1\\
0&1&0&0&1\\
0&0&1&1&0\\
0&0&0&1&0\\
0&0&0&0&1
\end{pmatrix}.}
$$

検算は $(I-N)(I+N+N^2)=I-N^3=I$ です。
<!-- solution-end -->

---

## 仕上げチェック

- パラメータ付き行列では固有空間分解を使って階数と連立方程式を同時に処理できる。
- 双対基底は基底行列の逆行列の行として計算できる。
- 複素 Hermitian 行列を正規直交固有基底で unitary 対角化できる。
- Schur 分解と対角化可能性を混同しない。
- polar decomposition を $P=(A^*A)^{1/2}$ から構成できる。
- Jordan 鎖を方程式 $(A-\lambda I)v_{k+1}=v_k$ から作れる。
- $\dim\ker N^k$ の増え方から nilpotent の Jordan block の大きさを復元できる。
