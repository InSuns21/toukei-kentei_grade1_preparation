# F0-00F1 固有空間・実対称行列・スペクトル定理・PSD

F0-00Fで線形写像のkernelとimageを準備しました。この講義では自己写像の固有方向から、実対称行列の正規直交固有基底とPSDまでを組み立てます。

$$\boxed{\text{固有空間}\to\text{対称性}\to\text{Rayleigh商}\to\text{スペクトル定理}\to\text{PSD}}$$

---

## 1. 固有値と固有空間

<a id="def-eigenvalue-eigenvector-eigenspace"></a>

<!-- formal-statement-start -->
> **定義（固有値・固有ベクトル・固有空間）**  
> 線形自己写像 $T:V\to V$ に対し、$v\ne0$ とスカラー $\lambda$ が
$$
T(v)=\lambda v
$$
> を満たすとき、$\lambda$ を $T$ の **固有値**、$v$ を $\lambda$ に属する **固有ベクトル** という。また
$$
E_\lambda=\ker(T-\lambda I)
$$
> を固有値 $\lambda$ に対応する **固有空間** という。
<!-- formal-statement-end -->

<!-- definition-example-start: def-eigenvalue-eigenvector-eigenspace -->
### 1.1 例：$2\times2$ 対称行列の固有空間

**定義の確認**

$$
A=\begin{pmatrix}2&1\\1&2\end{pmatrix},
\qquad
v=\begin{pmatrix}1\\1\end{pmatrix}
$$

とします。$v\ne0$ で

$$
Av
=\begin{pmatrix}3\\3\end{pmatrix}
=3v
$$

なので、定義より $3$ は固有値、$v$ は固有値 $3$ に属する固有ベクトルです。また

$$
A-3I
=\begin{pmatrix}-1&1\\1&-1\end{pmatrix}
$$

だから

$$
E_3
=\ker(A-3I)
=\operatorname{span}\left\{\begin{pmatrix}1\\1\end{pmatrix}\right\}.
$$

「非零ベクトルが $Av=\lambda v$ を満たすこと」と「固有空間が $\ker(A-\lambda I)$ であること」の両方を直接確認しています。
<!-- definition-example-end -->

重要なのは、固有空間は1本のベクトルではなく部分空間だということです。

行列 $A$ なら

$$
(A-\lambda I)v=0
$$

が非零解を持つ必要があるので

$$
\boxed{
\det(A-\lambda I)=0
}
$$

が固有値方程式になります。

---

## 2. 不変部分空間

<a id="def-invariant-subspace"></a>

<!-- formal-statement-start -->
> **定義（不変部分空間）**  
> 線形自己写像 $T:V\to V$ と部分空間 $M\subset V$ に対して
$$
T(M)\subset M
$$
> が成り立つとき、$M$ を $T$ の **不変部分空間** という。
<!-- formal-statement-end -->

<!-- definition-example-start: def-invariant-subspace -->
### 2.1 例：固有ベクトルが張る直線は不変

**定義の確認**

上の行列 $A$ と

$$
M=\operatorname{span}\left\{\begin{pmatrix}1\\1\end{pmatrix}\right\}
$$

を考えます。任意の $z\in M$ は $z=c(1,1)^{\mathsf T}$ と書けるので

$$
Az
=3c\begin{pmatrix}1\\1\end{pmatrix}
\in M.
$$

したがって全ての $z\in M$ に対して $Az\in M$、すなわち

$$
A(M)\subset M
$$

です。これは不変部分空間の定義そのものを確認しています。
<!-- definition-example-end -->

固有空間 $E_\lambda$ は不変部分空間です。

不変部分空間があると、写像を小さな空間に制限して考えられます。

スペクトル定理の証明では、1本の固有ベクトルを見つけた後、その直交補空間が再び不変になることを使って次の固有ベクトルを探します。

---

## 3. 対称行列は内積と相性がよい

実対称行列

$$
A^{\mathsf T}=A
$$

では

$$
\boxed{
\langle Ax,y\rangle
=
\langle x,Ay\rangle
}
$$

が成り立ちます。

実際

$$
\langle Ax,y\rangle
=(Ax)^{\mathsf T}y
=x^{\mathsf T}A^{\mathsf T}y
=x^{\mathsf T}Ay.
$$

この性質が、関数解析における **自己共役作用素** の有限次元版です。

---

## 4. 異なる固有値の固有ベクトルは直交する

$A$ を実対称とし、

$$
Au=\lambda u,
\qquad
Av=\mu v,
\qquad
\lambda\ne\mu
$$

とします。

対称性から

$$
\langle Au,v\rangle
=
\langle u,Av\rangle.
$$

したがって

$$
\lambda\langle u,v\rangle
=
\mu\langle u,v\rangle.
$$

よって

$$
(\lambda-\mu)\langle u,v\rangle=0.
$$

$\lambda\ne\mu$ なので

$$
\boxed{
\langle u,v\rangle=0
}.
$$

つまり異なる固有空間は互いに直交します。

同じ固有値の固有空間の中では、F0-00E1のGram--Schmidtを使えば正規直交基底を作れます。

---

## 5. Rayleigh商

<a id="def-rayleigh-quotient"></a>

<!-- formal-statement-start -->
> **定義（Rayleigh商）**  
> 実対称行列 $A\in\mathbb R^{n\times n}$ と非零ベクトル $x\in\mathbb R^n$ に対して
$$
R_A(x)=\frac{x^{\mathsf T}Ax}{x^{\mathsf T}x}
$$
> を $A$ の $x$ における **Rayleigh商** という。
<!-- formal-statement-end -->

<!-- definition-example-start: def-rayleigh-quotient -->
### 5.1 例：対角行列でRayleigh商を計算する

**定義の確認**

$$
A=\begin{pmatrix}2&0\\0&5\end{pmatrix},
\qquad
x=\begin{pmatrix}0\\2\end{pmatrix}
$$

とします。$x\ne0$ なのでRayleigh商を定義でき、

$$
x^{\mathsf T}Ax=20,
\qquad
x^{\mathsf T}x=4
$$

より

$$
R_A(x)
=\frac{x^{\mathsf T}Ax}{x^{\mathsf T}x}
=5.
$$

分子・分母を定義式へそのまま代入して確認しています。この $x$ は固有値 $5$ の固有ベクトルでもあるため、後述する $R_A(x)=\lambda$ とも一致します。
<!-- definition-example-end -->

$x$ が固有ベクトルで

$$
Ax=\lambda x
$$

なら

$$
R_A(x)=\lambda.
$$

Rayleigh商は、「方向 $x$ に沿って二次形式がどれだけ伸びるか」を表します。

単位ベクトル $\|x\|=1$ なら

$$
R_A(x)=x^{\mathsf T}Ax.
$$

---

## 6. 対称行列には少なくとも1本の実固有ベクトルがある

単位球面

$$
S^{n-1}
=
\{x\in\mathbb R^n:\|x\|=1\}
$$

を考えます。

これは閉かつ有界なので、F0-00C1のHeine--Borelによりコンパクトです。

連続関数

$$
f(x)=x^{\mathsf T}Ax
$$

は、コンパクト集合上で最大値を取ります。

最大点を $q_1$ とし

$$
\|q_1\|=1
$$

とします。

ここで「球面上の極値なら勾配が半径方向を向く」という、今回必要なラグランジュ未定乗数法の形を先に証明します。

<a id="thm-f0-00f1-sphere-lagrange"></a>

<!-- formal-statement-start -->
> **定理（球面制約に対するLagrange必要条件）**  
> $f$ を単位球面 $S^{n-1}=\{x:\|x\|=1\}$ の近傍で $C^1$ 級とする。$q\in S^{n-1}$ が $f|_{S^{n-1}}$ の局所極値点なら、ある $\lambda\in\mathbb R$ が存在して

$$
\boxed{\nabla f(q)=2\lambda q}
$$

> が成り立つ。これは制約 $g(x)=x^{\mathsf T}x-1=0$ に対する $\nabla f(q)=\lambda\nabla g(q)$ の形そのものである。
<!-- formal-statement-end -->

<!-- proof-start -->
### 証明：接方向の微分が全て0になる

$q$ に直交する任意の $v\in q^\perp$ を取ります。$v=0$ なら自明なので $v\ne0$ とします。

$$
\gamma(t)=\frac{q+tv}{\|q+tv\|}
$$

と置けば、十分小さい $t$ で $\gamma(t)\in S^{n-1}$ かつ $\gamma(0)=q$ です。また $q^{\mathsf T}v=0$ なので

$$
\|q+tv\|=\sqrt{1+t^2\|v\|^2}
$$

であり、$t=0$ で微分すると $\gamma'(0)=v$ です。

$q$ は球面上の局所極値点なので、一変数関数 $t\mapsto f(\gamma(t))$ は $t=0$ で局所極値を取り、従って

$$
0=\frac{d}{dt}f(\gamma(t))\bigg|_{t=0}=\nabla f(q)^{\mathsf T}v.
$$

これは全ての $v\in q^\perp$ に対して成り立つので

$$
\nabla f(q)\in(q^\perp)^\perp=\operatorname{span}\{q\}.
$$

従ってある実数 $c$ が存在して $\nabla f(q)=cq$。$c=2\lambda$ と書けば結論です。
<!-- proof-end -->

この定理を $f(x)=x^{\mathsf T}Ax$ へ適用します。$A$ は対称なので $\nabla f(x)=2Ax$。したがって最大点 $q_1$ では

$$
2Aq_1=2\lambda q_1,
$$

すなわち

$$
\boxed{Aq_1=\lambda q_1}.
$$

つまり最大点は固有ベクトルです。

さらに

$$
\lambda=q_1^{\mathsf T}Aq_1
$$

なので、この固有値はRayleigh商の最大値です。

---

## 7. 固有ベクトルの直交補空間は不変になる

$Aq_1=\lambda_1q_1$ とし、

$$
M=q_1^\perp
$$

とします。

$x\in M$ なら

$$
\langle x,q_1\rangle=0.
$$

対称性より

$$
\langle Ax,q_1\rangle
=
\langle x,Aq_1\rangle
=
\lambda_1\langle x,q_1\rangle
=0.
$$

したがって

$$
Ax\in q_1^\perp=M.
$$

よって $M$ は $A$ の不変部分空間です。

ここがスペクトル定理の帰納法の鍵です。

---

## 8. 実対称行列のスペクトル定理

まず単位固有ベクトル $q_1$ を1本取ります。

その直交補空間

$$
q_1^\perp
$$

は $A$ に対して不変です。

この空間の次元は $n-1$ なので、同じ議論を制限写像へ繰り返します。

すると互いに直交する単位固有ベクトル

$$
q_1,\dots,q_n
$$

を得ます。

これらは $\mathbb R^n$ の正規直交基底です。

列に並べて

$$
Q
=
\begin{pmatrix}
q_1&\cdots&q_n
\end{pmatrix}
$$

とすると

$$
Q^{\mathsf T}Q=QQ^{\mathsf T}=I.
$$

また

$$
Aq_i=\lambda_iq_i
$$

なので

$$
AQ=Q\Lambda,
$$

$$
\Lambda
=\operatorname{diag}(\lambda_1,\dots,\lambda_n).
$$

右から $Q^{\mathsf T}$ を掛けて

$$
\boxed{
A=Q\Lambda Q^{\mathsf T}
}.
$$

<a id="thm-real-symmetric-spectral"></a>

<!-- formal-statement-start -->
> **定理（実対称行列のスペクトル定理）**  
> 実対称行列 $A\in\mathbb R^{n\times n}$ に対して、$\mathbb R^n$ には $A$ の固有ベクトルからなる正規直交基底が存在する。したがって、ある直交行列 $Q$ と実対角行列 $\Lambda$ が存在して
$$
A=Q\Lambda Q^{\mathsf T}
$$
> と表せる。
<!-- formal-statement-end -->

F0-00で使った「直交対角化できる」は、この定理の結論です。

---

## 9. 二次形式が固有値だけで読める理由

$$
A=Q\Lambda Q^{\mathsf T}
$$

とし、

$$
z=Q^{\mathsf T}x
$$

と置きます。

$Q$ は直交行列なので

$$
\|z\|=\|x\|.
$$

二次形式は

$$
\begin{aligned}
x^{\mathsf T}Ax
&=x^{\mathsf T}Q\Lambda Q^{\mathsf T}x\\
&=z^{\mathsf T}\Lambda z\\
&=\boxed{\sum_{i=1}^n\lambda_i z_i^2}.
\end{aligned}
$$

したがって

$$
\lambda_{\min}\|x\|^2
\le
x^{\mathsf T}Ax
\le
\lambda_{\max}\|x\|^2.
$$

特に $\|x\|=1$ なら

$$
\boxed{
\lambda_{\min}
\le
x^{\mathsf T}Ax
\le
\lambda_{\max}
}.
$$

---

## 10. 正定値・半正定値

対称行列 $A$ が **正定値** であるとは

$$
x^{\mathsf T}Ax>0
\qquad(x\ne0)
$$

です。

スペクトル分解から

$$
x^{\mathsf T}Ax
=\sum_i\lambda_i z_i^2
$$

なので

$$
\boxed{
A\succ0
\Longleftrightarrow
\lambda_i>0\quad\forall i
}.
$$

同様に

$$
\boxed{
A\succeq0
\Longleftrightarrow
\lambda_i\ge0\quad\forall i
}.
$$

です。

共分散行列、Gram行列、Hessianなどで半正定値性が頻出する理由がここで統一されます。

---

## 11. PSD行列の平方根を構成する

$A\succeq0$ なら

$$
A=Q\Lambda Q^{\mathsf T},
\qquad
\lambda_i\ge0.
$$

そこで

$$
\Lambda^{1/2}
=\operatorname{diag}(\sqrt{\lambda_1},\dots,\sqrt{\lambda_n})
$$

とし

$$
\boxed{
A^{1/2}
=Q\Lambda^{1/2}Q^{\mathsf T}
}
$$

と定めます。

すると

$$
A^{1/2}A^{1/2}=A.
$$

多変量正規乱数の構成や共分散作用素の理解では、この平方根が重要です。

---

## 12. 演習

### F0-00F1-A01 対称行列の固有ベクトル直交性

- Level: A
- 目安時間: 10分

実対称行列 $A$ の固有ベクトル $u,v$ が異なる固有値 $\lambda,\mu$ に属するとき $u\perp v$ を示せ。

<!-- solution-start -->
#### 詳細解答
$\langle Au,v\rangle=\langle u,Av\rangle$ より $\lambda\langle u,v\rangle=\mu\langle u,v\rangle$。$\lambda\ne\mu$ なので内積は0。
#### 本番答案
$(\lambda-\mu)\langle u,v\rangle=0$ から従う。
#### 採点基準（20点）
- 対称性: 7点
- 固有方程式代入: 7点
- 結論: 6点
<!-- solution-end -->

### F0-00F1-B01 PSDと固有値

- Level: B
- 目安時間: 12分

実対称行列 $A=Q\Lambda Q^T$ に対し、$A\succeq0$ と全固有値 $\lambda_i\ge0$ が同値であることを示せ。

<!-- solution-start -->
#### 詳細解答
$z=Q^Tx$ とすると $x^TAx=\sum_i\lambda_i z_i^2$。全固有値非負なら右辺非負。逆にある $\lambda_j<0$ なら対応固有ベクトル $q_j$ に対し $q_j^TAq_j=\lambda_j<0$ でPSDに反する。
#### 本番答案
スペクトル座標で二次形式を $\sum_i\lambda_i z_i^2$ と書き、両方向を示す。
#### 採点基準（20点）
- 座標変換: 6点
- 十分性: 5点
- 必要性の反証: 7点
- 結論: 2点
<!-- solution-end -->

### F0-00F1-B02 Rayleigh商最大点が固有ベクトルになることを接方向から示す

- Level: B
- 目安時間: 15分

実対称行列 $A$ に対して $f(x)=x^{\mathsf T}Ax$ とし、単位球面上の局所最大点を $q$ とする。任意の $v\perp q$ に対し

$$
\gamma(t)=\frac{q+tv}{\|q+tv\|}
$$

を用いて $v^{\mathsf T}Aq=0$ を示し、$Aq=\lambda q$ を導け。

<!-- solution-start -->
#### 詳細解答
$q^{\mathsf T}v=0$ なので $\gamma'(0)=v$。球面上の極大性から

$$
0=(f\circ\gamma)'(0)=\nabla f(q)^{\mathsf T}v=2v^{\mathsf T}Aq.
$$

従って $Aq$ は全ての $v\in q^\perp$ と直交する。よって

$$
Aq\in(q^\perp)^\perp=\operatorname{span}\{q\},
$$

なので $Aq=\lambda q$。

#### 本番答案
$\gamma'(0)=v$ と球面上の極値条件から $0=2v^{\mathsf T}Aq$。全ての $v\perp q$ で成立するから $Aq\in\operatorname{span}\{q\}$、従って $Aq=\lambda q$。

#### 採点基準（20点）
- $\gamma'(0)=v$: 5点
- 接方向微分0: 6点
- $v^{\mathsf T}Aq=0$: 4点
- 直交補から固有方程式: 5点
<!-- solution-end -->

---

## 13. 次に進む

一般の長方形行列へ進むには、$A^TA$ のスペクトル分解を使います。

**次：[F0-00F2 SVD・特異値・作用素ノルム](../F0_00F2_SVD_特異値_作用素ノルム/index.md)**
