# F0-00F1 スペクトル定理・PSD

F0-00Fで線形写像のkernelとimageを準備しました。この講義では自己写像の固有方向から、実対称行列の正規直交固有基底とPSDまでを組み立てます。

$\boxed{\text{固有空間}\to\text{対称性}\to\text{実固有対の存在}\to\text{直交補空間}\to\text{直交対角化}\to\text{PSD}}$

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

固有ベクトル1本だけを見ても、次の固有方向をどこで探せばよいかはまだ分かりません。そこで「この部分空間の中から外へ出ない」という性質を切り出し、写像をそこへ制限して同じ問題を小さい次元で繰り返せるようにします。

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

実対称行列を直交対角化する証明では、1本の固有ベクトルを見つけた後、その固有ベクトルに直交する部分空間が再び不変になることを使って次の固有ベクトルを探します。

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

## 4. 対称性が異なる固有方向を直交させる

<a id="thm-f0-00f1-distinct-eigenspaces-orthogonal"></a>

<!-- formal-statement-start -->
> **定理（実対称行列の異なる固有空間は直交する）**  
> 実対称行列 $A\in\mathbb R^{n\times n}$ の固有ベクトル $u,v\ne0$ が

$$
Au=\lambda u,
\qquad
Av=\mu v,
\qquad
\lambda\ne\mu
$$

> を満たすなら、$\langle u,v\rangle=0$ である。
<!-- formal-statement-end -->

対称性から

$$
\langle Au,v\rangle
=
\langle u,Av\rangle.
$$

固有方程式を代入すると

$$
\lambda\langle u,v\rangle
=
\mu\langle u,v\rangle,
$$

従って

$$
(\lambda-\mu)\langle u,v\rangle=0.
$$

$\lambda\ne\mu$ なので $\langle u,v\rangle=0$ です。

同じ固有値の固有空間の中では、F0-00E1の[Gram--Schmidtの直交化](../F0_00E1_内積_Gram_Schmidt_射影_QR/index.md#thm-f0-00e1-gram-schmidt)を使えば正規直交基底を作れます。

---

## 5. Rayleigh商

固有ベクトルなら $Ax=\lambda x$ なので、二次形式 $x^{\mathsf T}Ax$ はその方向の倍率 $\lambda$ を読み取ります。任意の非零ベクトルでも同じ「方向ごとの倍率」を比較できるよう、長さの影響を割って正規化した量を導入します。

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

直交対角化を帰納的に作るには、最初の固有ベクトルを1本だけ確保できれば十分です。ここで必要なのは次の存在事実です。

<a id="lem-f0-00f1-real-symmetric-eigenpair"></a>

<!-- formal-statement-start -->
> **補題（実対称行列の実固有対の存在）**  
> 実対称行列 $A\in\mathbb R^{n\times n}$ に対して、ある実数 $\lambda\in\mathbb R$ と単位ベクトル $q\in\mathbb R^n$ が存在し
>
> $$
> Aq=\lambda q,
> \qquad
> \|q\|=1
> $$
>
> が成り立つ。
<!-- formal-statement-end -->

この補題の**主張**はここで使いますが、存在証明には「単位球面上で連続関数が最大値を取る」というコンパクト性の道具が必要です。線形代数の流れをそこで中断しないため、その証明は後でコンパクト性を学んだあとに [F0-00C2 の証明](../F0_00C2_コンパクト性の応用_最大最小_最近点/index.md#proof-f0-00f1-real-symmetric-eigenpair) として回収します。

ここで先送りするのは**最初の1本が存在することだけ**です。1本の単位固有ベクトル $q_1$ と固有値 $\lambda_1$ が得られれば、

$$
Aq_1=\lambda_1q_1
$$

から先の直交対角化は、この章の線形代数だけで最後まで証明できます。

Rayleigh商は後の存在証明で使われます。単位ベクトルでは

$$
R_A(x)=x^{\mathsf T}Ax
$$

なので、コンパクト性を学んだ後には「Rayleigh商が最大になる方向を1本選ぶ」ところからこの補題を証明します。

---

## 7. 固有ベクトルに直交する部分空間は不変になる

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

ここが直交対角化を帰納的に構成する鍵です。

---

## 8. 実対称行列の直交対角化

<a id="thm-real-symmetric-spectral"></a>

<!-- formal-statement-start -->
> **定理（実対称行列の直交対角化定理 / spectral theorem）**  
> 実対称行列 $A\in\mathbb R^{n\times n}$ に対して、$\mathbb R^n$ には $A$ の固有ベクトルからなる正規直交基底が存在する。従って、ある直交行列 $Q$ と実対角行列 $\Lambda$ が存在して

$$
A=Q\Lambda Q^{\mathsf T}
$$

> と表せる。
<!-- formal-statement-end -->

### 証明の見取り図

第6節の固有対存在補題から単位固有ベクトル $q_1$ を1本取り、第7節で $q_1^\perp$ が $A$ に対して不変になることを示しました。そこで次元を1つ落とした $q_1^\perp$ に同じ議論を繰り返します。

<!-- proof-start -->
### 証明

$n=1$ では明らかです。$n\ge2$ とし、次元 $n-1$ まで定理が成り立つと仮定します。

第6節の固有対存在補題により、$A$ には単位固有ベクトル $q_1$ が存在し、

$$
Aq_1=\lambda_1q_1
$$

と書けます。第7節より

$$
M=q_1^\perp
$$

は $A$ に対して不変です。

$A|_M:M\to M$ は $M$ 上でも対称です。実際 $x,y\in M$ に対して

$$
\langle A|_M x,y\rangle
=
\langle Ax,y\rangle
=
\langle x,Ay\rangle
=
\langle x,A|_M y\rangle.
$$

$\dim M=n-1$ なので帰納法の仮定を $A|_M$ に適用でき、$M$ には $A|_M$ の固有ベクトルからなる正規直交基底

$$
q_2,\dots,q_n
$$

が存在します。

$q_1\perp M$ なので $q_1,\dots,q_n$ は $\mathbb R^n$ の正規直交基底です。各 $q_i$ は $A$ の固有ベクトルで、

$$
Aq_i=\lambda_iq_i.
$$

列に並べて

$$
Q=(q_1\ \cdots\ q_n),
\qquad
\Lambda=\operatorname{diag}(\lambda_1,\dots,\lambda_n)
$$

と置けば

$$
AQ=Q\Lambda.
$$

$Q$ は直交行列なので $Q^{-1}=Q^{\mathsf T}$。従って

$$
A=Q\Lambda Q^{\mathsf T}.
$$
<!-- proof-end -->

この定理により、実対称行列の二次形式の符号や平方根は全て固有値ごとの1次元問題へ分解できます。

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

直交対角化できると、二次形式 $x^{\mathsf T}Ax$ の符号は各固有方向の係数へ分解できます。そこで「どの非零方向でも正になる」「どの方向でも負にならない」という性質を行列そのものの性質として名前を付けます。

<a id="def-f0-00f1-positive-semidefinite"></a>

<!-- formal-statement-start -->
> **定義（正定値・半正定値）**  
> 実対称行列 $A\in\mathbb R^{n\times n}$ について

$$
x^{\mathsf T}Ax>0
\qquad(x\ne0)
$$

> が成り立つとき $A$ は **正定値**、また

$$
x^{\mathsf T}Ax\ge0
\qquad(\forall x\in\mathbb R^n)
$$

> が成り立つとき $A$ は **半正定値** であるといいます。
<!-- formal-statement-end -->

<!-- definition-example-start: def-f0-00f1-positive-semidefinite -->
### 10.1 例：半正定値だが正定値ではない行列

**定義の確認**：上の定義条件をこの具体例で直接確認します。


$$
A=
\begin{pmatrix}
2&0\\
0&0
\end{pmatrix}
$$

なら

$$
x^{\mathsf T}Ax=2x_1^2\ge0
$$

なので半正定値です。一方 $x=(0,1)^{\mathsf T}\ne0$ では $x^{\mathsf T}Ax=0$ なので正定値ではありません。
<!-- definition-example-end -->

<a id="thm-f0-00f1-psd-eigenvalue-characterization"></a>

<!-- formal-statement-start -->
> **定理（正定値・半正定値の固有値判定）**  
> 実対称行列 $A$ の固有値を $\lambda_1,\dots,\lambda_n$ とする。このとき

$$
A\succ0
\Longleftrightarrow
\lambda_i>0\quad(\forall i),
$$

$$
A\succeq0
\Longleftrightarrow
\lambda_i\ge0\quad(\forall i).
$$
<!-- formal-statement-end -->

直交固有分解 $A=Q\Lambda Q^{\mathsf T}$ と $z=Q^{\mathsf T}x$ を使うと

$$
x^{\mathsf T}Ax
=
\sum_i\lambda_i z_i^2.
$$

全固有値が正または非負なら定義条件が従います。逆に $\lambda_j<0$ なら対応する単位固有ベクトル $q_j$ に対して

$$
q_j^{\mathsf T}Aq_j=\lambda_j<0,
$$

となり半正定値性に反します。正定値の場合も、固有値0があれば同じ $q_j$ で二次形式が0になるため正定値ではありません。

---

## 11. PSD行列の平方根を構成する

<a id="thm-f0-00f1-psd-square-root"></a>

<!-- formal-statement-start -->
> **定理（半正定値行列の平方根）**  
> 実対称半正定値行列 $A\in\mathbb R^{n\times n}$ に対して、実対称半正定値行列 $B$ で

$$
B^2=A
$$

> を満たすものが存在する。直交固有分解

$$
A=Q\Lambda Q^{\mathsf T},
\qquad
\Lambda=\operatorname{diag}(\lambda_1,\dots,\lambda_n)
$$

> に対して

$$
B=Q\Lambda^{1/2}Q^{\mathsf T},
\qquad
\Lambda^{1/2}=\operatorname{diag}(\sqrt{\lambda_1},\dots,\sqrt{\lambda_n})
$$

> と取れる。
<!-- formal-statement-end -->

半正定値性から $\lambda_i\ge0$ なので平方根は実数として定義できます。また

$$
\begin{aligned}
B^2
&=
Q\Lambda^{1/2}Q^{\mathsf T}
Q\Lambda^{1/2}Q^{\mathsf T}\\
&=
Q\Lambda Q^{\mathsf T}
=A.
\end{aligned}
$$

さらに任意の $x$ に対して

$$
x^{\mathsf T}Bx
=
\sum_i\sqrt{\lambda_i}\,z_i^2\ge0,
\qquad
z=Q^{\mathsf T}x,
$$

なので $B$ 自身も半正定値です。

統計で行列平方根を使う場面でも、この構成がそのまま働きます。

---

## 12. 演習

### F0-00F1-A01 固有ベクトルの直交性

- Level: A
- 目安時間: 10分

実対称行列 $A$ の固有ベクトル $u,v$ が異なる固有値 $\lambda,\mu$ に属するとき $u\perp v$ を示せ。

<!-- solution-start -->
#### 詳細解答

対称性から

$$
\langle Au,v\rangle=\langle u,Av\rangle.
$$

固有方程式を使うと

$$
\lambda\langle u,v\rangle
=
\mu\langle u,v\rangle.
$$

従って

$$
(\lambda-\mu)\langle u,v\rangle=0.
$$

$\lambda\ne\mu$ なので $\langle u,v\rangle=0$、すなわち $u\perp v$ です。
<!-- solution-end -->

### F0-00F1-A02

- Level: A
- 目安時間: 12分

$$
A=
\begin{pmatrix}
2&1\\
1&2
\end{pmatrix}
$$

について固有値と各固有空間を求め、それぞれが $A$ の不変部分空間であることを確認せよ。

<!-- solution-start -->
#### 詳細解答

固有値方程式は

$$
\det(A-\lambda I)
=(2-\lambda)^2-1
=(\lambda-3)(\lambda-1)=0.
$$

従って固有値は $3,1$ です。

$\lambda=3$ では

$$
E_3=\operatorname{span}\{(1,1)^{\mathsf T}\},
$$

$\lambda=1$ では

$$
E_1=\operatorname{span}\{(1,-1)^{\mathsf T}\}.
$$

$z\in E_\lambda$ なら $Az=\lambda z\in E_\lambda$ なので、各固有空間は定義通り不変部分空間です。
<!-- solution-end -->

### F0-00F1-A03 Rayleigh商

- Level: A
- 目安時間: 10分

$$
A=\operatorname{diag}(1,4),
\qquad
x=(\cos\theta,\sin\theta)^{\mathsf T}
$$

とする。$R_A(x)$ を求め、その最小値と最大値を求めよ。

<!-- solution-start -->
#### 詳細解答

$\|x\|=1$ なので

$$
R_A(x)
=x^{\mathsf T}Ax
=
\cos^2\theta+4\sin^2\theta
=
1+3\sin^2\theta.
$$

従って

$$
1\le R_A(x)\le4.
$$

最小値1は $\sin\theta=0$、すなわち固有値1の固有方向で達成され、最大値4は $\sin^2\theta=1$、すなわち固有値4の固有方向で達成されます。
<!-- solution-end -->

### F0-00F1-A04 正定値・半正定値の判定

- Level: A
- 目安時間: 10分

次の実対称行列を正定値、半正定値だが正定値でない、半正定値でない、のいずれかに分類せよ。

$$
A_1=\operatorname{diag}(2,3),
\quad
A_2=\operatorname{diag}(2,0),
\quad
A_3=\operatorname{diag}(2,-1).
$$

<!-- solution-start -->
#### 詳細解答

対角行列では対角成分がそのまま固有値です。

- $A_1$ の固有値は $2,3$ で全て正なので正定値です。
- $A_2$ の固有値は $2,0$ で全て非負ですが0を含むため、半正定値だが正定値ではありません。
- $A_3$ は固有値 $-1$ を持つため半正定値ではありません。実際 $x=e_2$ とすれば $x^{\mathsf T}A_3x=-1$ です。
<!-- solution-end -->

### F0-00F1-B01 PSDと固有値

- Level: B
- 目安時間: 12分

実対称行列 $A=Q\Lambda Q^{\mathsf T}$ に対し、$A\succeq0$ と全固有値 $\lambda_i\ge0$ が同値であることを示せ。

<!-- solution-start -->
#### 詳細解答

$z=Q^{\mathsf T}x$ と置くと

$$
x^{\mathsf T}Ax
=
z^{\mathsf T}\Lambda z
=
\sum_i\lambda_i z_i^2.
$$

全固有値が非負なら右辺は任意の $x$ に対して非負なので $A\succeq0$ です。

逆にある $\lambda_j<0$ があるとします。対応する単位固有ベクトルを $q_j$ とすると

$$
q_j^{\mathsf T}Aq_j
=
\lambda_j<0,
$$

となり半正定値の定義に反します。従って全固有値は非負です。
<!-- solution-end -->

### F0-00F1-B02 固有ベクトルに直交する部分空間の不変性

- Level: B
- 目安時間: 15分

実対称行列 $A\in\mathbb R^{n\times n}$ と単位固有ベクトル $q$ が

$$
Aq=\lambda q
$$

を満たすとする。$M=q^\perp$ と置く。

1. $M$ が $A$-不変であることを示せ。
2. 制限 $A|_M:M\to M$ が $M$ 上でも対称であることを示せ。
3. この2点が、実対称行列のスペクトル定理を次元帰納法で証明するために何を可能にするか説明せよ。

<!-- solution-start -->
#### 詳細解答

$x\in M$ とすると $\langle x,q\rangle=0$ です。$A$ は対称なので

$$
\langle Ax,q\rangle
=
\langle x,Aq\rangle
=
\lambda\langle x,q\rangle
=
0.
$$

従って $Ax\in q^\perp=M$ であり、$M$ は $A$-不変です。

次に $x,y\in M$ とすると、$Ax,Ay\in M$ なので $A|_M$ は $M$ から $M$ への線形写像として定義できます。また

$$
\langle A|_M x,y\rangle
=
\langle Ax,y\rangle
=
\langle x,Ay\rangle
=
\langle x,A|_M y\rangle.
$$

従って $A|_M$ も対称です。

さらに $\dim M=n-1$ です。したがって、次元 $n-1$ までスペクトル定理が成り立つと仮定すれば、$A|_M$ に帰納法の仮定を適用して $M$ の正規直交固有基底を得られます。そこへ $q$ を加えると、$\mathbb R^n$ 全体の正規直交固有基底になります。
<!-- solution-end -->

### F0-00F1-B03 直交固有分解の再構成

- Level: B
- 目安時間: 18分

$$
A=
\begin{pmatrix}
2&1\\
1&2
\end{pmatrix}
$$

の正規直交固有基底を求め、$A=Q\Lambda Q^{\mathsf T}$ を構成して積を計算し元の $A$ に戻ることを確認せよ。

<!-- solution-start -->
#### 詳細解答

固有値は $3,1$、対応する単位固有ベクトルを

$$
q_1=\frac1{\sqrt2}(1,1)^{\mathsf T},
\qquad
q_2=\frac1{\sqrt2}(1,-1)^{\mathsf T}
$$

と取れます。従って

$$
Q=\frac1{\sqrt2}
\begin{pmatrix}
1&1\\
1&-1
\end{pmatrix},
\qquad
\Lambda=
\begin{pmatrix}
3&0\\
0&1
\end{pmatrix}.
$$

計算すると

$$
Q\Lambda Q^{\mathsf T}
=
\frac12
\begin{pmatrix}
1&1\\
1&-1
\end{pmatrix}
\begin{pmatrix}
3&0\\
0&1
\end{pmatrix}
\begin{pmatrix}
1&1\\
1&-1
\end{pmatrix}
=
\begin{pmatrix}
2&1\\
1&2
\end{pmatrix}.
$$

従って直交固有分解が元の行列を再構成します。
<!-- solution-end -->

### F0-00F1-C01 直交対角化定理・Rayleigh商・平方根の統合

- Level: C
- 目安時間: 30分

$$
A=
\begin{pmatrix}
2&1&0\\
1&2&0\\
0&0&4
\end{pmatrix}
$$

について次を行え。

1. 固有値と正規直交固有基底を求め、直交固有分解を書け。
2. 単位ベクトル上のRayleigh商の最小値・最大値を求めよ。
3. $A$ が正定値であることを示せ。
4. 半正定値平方根 $A^{1/2}$ を構成せよ。

<!-- solution-start -->
#### 詳細解答

左上の $2\times2$ ブロックは固有値 $3,1$ を持ち、対応する単位固有ベクトルは

$$
q_1=\frac1{\sqrt2}(1,1,0)^{\mathsf T},
\qquad
q_2=\frac1{\sqrt2}(1,-1,0)^{\mathsf T}.
$$

さらに

$$
q_3=(0,0,1)^{\mathsf T}
$$

は固有値4の固有ベクトルです。従って、例えば列順を $q_1,q_2,q_3$ として

$$
Q=
\begin{pmatrix}
1/\sqrt2&1/\sqrt2&0\\
1/\sqrt2&-1/\sqrt2&0\\
0&0&1
\end{pmatrix},
\qquad
\Lambda=\operatorname{diag}(3,1,4),
$$

$$
A=Q\Lambda Q^{\mathsf T}.
$$

単位ベクトル $x$ に対して $z=Q^{\mathsf T}x$ と置けば $\sum_i z_i^2=1$ で、

$$
R_A(x)=3z_1^2+z_2^2+4z_3^2.
$$

従って最小値は1、最大値は4です。

全固有値 $3,1,4$ が正なので $A$ は正定値です。

平方根は

$$
A^{1/2}
=
Q\operatorname{diag}(\sqrt3,1,2)Q^{\mathsf T}.
$$

左上ブロックまで計算すると

$$
\boxed{
A^{1/2}
=
\begin{pmatrix}
(\sqrt3+1)/2&(\sqrt3-1)/2&0\\
(\sqrt3-1)/2&(\sqrt3+1)/2&0\\
0&0&2
\end{pmatrix}
}.
$$

固有基底上では各固有値を平方根へ置き換えているので、二乗すれば $A$ に戻ります。
<!-- solution-end -->
---

## 13. 次に進む

ここまでで、実対称行列を正規直交基底で対角化し、その二次形式と平方根まで読めるようになりました。

次はこの仕組みを長方形行列へ拡張し、入力方向ごとの伸縮として分解します。

**次：[F0-00F2 長方形行列の方向別分解](../F0_00F2_SVD_特異値_作用素ノルム/index.md)**
