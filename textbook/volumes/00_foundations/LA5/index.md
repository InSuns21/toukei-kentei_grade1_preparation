# LA5 標準線形代数 V：複素内積・有限次元随伴・normal operator

実内積空間では転置 $A^{\mathsf T}$ が自然に現れました。複素数上では、単なる転置では長さや角度を正しく扱えません。必要なのは **共役転置** です。

この章では内積の規約を
$$
\langle x,y\rangle=x^*y
$$
に合わせ、**第1変数で共役線形、第2変数で線形** と固定します。

---

## 1. 複素内積

<a id="def-la5-complex-inner-product"></a>
<!-- formal-statement-start -->
> **定義（複素内積）**  
> 複素ベクトル空間 $V$ 上の写像
$$
\langle\cdot,\cdot\rangle:V\times V\to\mathbb C
$$
> が、任意の $x,y,z\in V$ と $\alpha,\beta\in\mathbb C$ に対して
>
> 1. $\langle x,\alpha y+\beta z\rangle=\alpha\langle x,y\rangle+\beta\langle x,z\rangle$
> 2. $\langle x,y\rangle=\overline{\langle y,x\rangle}$
> 3. $\langle x,x\rangle\ge0$ かつ $\langle x,x\rangle=0\iff x=0$
>
> を満たすとき、これを複素内積という。
<!-- formal-statement-end -->

共役対称性から第1変数では
$$
\langle \alpha x+\beta y,z\rangle
=\overline\alpha\langle x,z\rangle
+\overline\beta\langle y,z\rangle
$$
となります。

<!-- definition-example-start: def-la5-complex-inner-product -->
**定義の確認**：$\mathbb C^n$ では
$$
\langle x,y\rangle
=x^*y
=\sum_{j=1}^n\overline{x_j}y_j
$$
が標準複素内積です。特に
$$
\langle x,x\rangle=\sum_j|x_j|^2\ge0.
$$
<!-- definition-example-end -->

実内積空間のCauchy–Schwarz不等式・Gram–Schmidt・直交射影は、共役を正しく入れれば同じ証明で複素内積空間にも拡張できます。

---

## 2. 有限次元随伴

<a id="def-la5-adjoint"></a>
<!-- formal-statement-start -->
> **定義（有限次元随伴）**  
> 有限次元複素内積空間 $V$ 上の線形自己写像 $T:V\to V$ に対し
$$
\langle Tx,y\rangle
=
\langle x,T^*y\rangle
\qquad(x,y\in V)
$$
> を満たす線形写像 $T^*:V\to V$ を $T$ の有限次元随伴という。
<!-- formal-statement-end -->

<a id="thm-la5-adjoint-existence"></a>
<!-- formal-statement-start -->
> **定理（有限次元随伴の存在一意性）**  
> 有限次元複素内積空間上の任意の線形自己写像 $T$ に対して、有限次元随伴 $T^*$ は一意に存在する。正規直交基底で $T$ の行列が $A$ なら、$T^*$ の行列は共役転置
$$
A^*=\overline A^{\mathsf T}
$$
> である。
<!-- formal-statement-end -->

<!-- proof-start -->
### 証明

正規直交基底を取り、ベクトルを座標列 $x,y$ で表します。$T$ の行列を $A$ とすると
$$
\langle Tx,y\rangle
=(Ax)^*y
=x^*A^*y
=\langle x,A^*y\rangle.
$$
したがって $A^*$ が条件を満たす写像を与え、存在します。

もし $S_1,S_2$ がともに条件を満たすなら
$$
\langle x,(S_1-S_2)y\rangle=0
$$
が全ての $x$ で成り立ちます。$x=(S_1-S_2)y$ と取ればノルム平方が0になり、$S_1y=S_2y$。よって一意です。$\square$
<!-- proof-end -->

ここでLA3の双対写像とは区別してください。

- 代数的双対写像：基底表示は $A^{\mathsf T}$
- 有限次元随伴：正規直交基底表示は $A^*$

共役が入るのは、内積を使っているからです。

---

## 3. Hermitian・unitary・normal

<a id="def-la5-hermitian"></a>
<!-- formal-statement-start -->
> **定義（Hermitian作用素）**  
> 有限次元随伴について
$$
T^*=T
$$
> を満たす作用素をHermitian作用素という。
<!-- formal-statement-end -->

<a id="def-la5-unitary"></a>
<!-- formal-statement-start -->
> **定義（unitary作用素）**  
> 有限次元随伴について
$$
T^*T=TT^*=I
$$
> を満たす作用素をunitary作用素という。
<!-- formal-statement-end -->

<a id="def-la5-normal"></a>
<!-- formal-statement-start -->
> **定義（normal operator）**  
> 有限次元随伴について
$$
T^*T=TT^*
$$
> を満たす作用素をnormal operatorという。
<!-- formal-statement-end -->

<!-- definition-example-start: def-la5-hermitian, def-la5-unitary, def-la5-normal -->
**定義の確認**：

- $A=A^*$ ならHermitian。
- $U^*U=I$ ならunitary。
- 対角行列 $D=\operatorname{diag}(1,i)$ は $D^*D=DD^*=I$ なのでunitaryかつnormalですが、$D^*\ne D$ なのでHermitianではありません。

したがってnormalはHermitianやunitaryを含むより広いクラスです。
<!-- definition-example-end -->

unitary作用素は内積を保存します。実際
$$
\langle Tx,Ty\rangle
=\langle x,T^*Ty\rangle
=\langle x,y\rangle.
$$
特にノルムも保存します。

---

## 4. Hermitian作用素の固有値は実数

<a id="thm-la5-hermitian-real-eigenvalues"></a>
<!-- formal-statement-start -->
> **定理（Hermitian作用素の固有値は実数）**  
> Hermitian作用素 $T$ の固有値はすべて実数である。
<!-- formal-statement-end -->

<!-- proof-start -->
### 証明

$Tv=\lambda v$, $v\ne0$ とします。Hermitian性から
$$
\langle Tv,v\rangle
=\langle v,Tv\rangle.
$$
左辺は第1変数が共役線形なので
$$
\langle \lambda v,v\rangle
=\overline\lambda\langle v,v\rangle,
$$
右辺は第2変数が線形なので
$$
\langle v,\lambda v\rangle
=\lambda\langle v,v\rangle.
$$
$\langle v,v\rangle>0$ より $\lambda=\overline\lambda$、したがって $\lambda\in\mathbb R$。$\square$
<!-- proof-end -->

規約を逆に採る教科書では途中の共役の位置が逆になりますが、結論は同じです。

---

## 5. unitary作用素の固有値は単位円上にある

<a id="thm-la5-unitary-eigenvalues"></a>
<!-- formal-statement-start -->
> **定理（unitary作用素の固有値は絶対値1）**  
> unitary作用素 $T$ の固有値 $\lambda$ は
$$
|\lambda|=1
$$
> を満たす。
<!-- formal-statement-end -->

<!-- proof-start -->
### 証明

$Tv=\lambda v$, $v\ne0$ とします。unitary作用素はノルムを保存するので
$$
\|v\|=\|Tv\|=\|\lambda v\|=|\lambda|\,\|v\|.
$$
$\|v\|>0$ だから $|\lambda|=1$。$\square$
<!-- proof-end -->

---

## 6. Schurのユニタリ三角化

一般の複素行列はunitary対角化できるとは限りません。しかしunitary**三角化**なら常に可能です。

<a id="thm-la5-schur"></a>
<!-- formal-statement-start -->
> **定理（Schurのユニタリ三角化定理）**  
> 有限次元複素内積空間上の任意の線形自己写像 $T$ に対し、ある正規直交基底が存在して、その基底での表現行列は上三角になる。行列表現では、任意の $A\in\mathbb C^{n\times n}$ に対しunitary行列 $Q$ と上三角行列 $R$ が存在して
$$
A=QRQ^*
$$
> と書ける。
<!-- formal-statement-end -->

<!-- proof-start -->
### 証明

$\mathbb C$ 上では特性多項式が一次因子を持つので、$T$ は固有値 $\lambda$ と単位固有ベクトル $q_1$ を持ちます。$q_1$ を正規直交基底へ延長すると、この基底で $Tq_1=\lambda q_1$ だから行列の第1列は
$$
(\lambda,0,\dots,0)^{\mathsf T}
$$
です。したがって行列は
$$
\begin{pmatrix}
\lambda&*\\
0&B
\end{pmatrix}
$$
の形になります。

$(n-1)\times(n-1)$ 行列 $B$ に帰納法を適用し、残りの基底だけをunitary変換すれば全体を上三角化できます。$\square$
<!-- proof-end -->

Schur三角化はJordan標準形より弱い分解ですが、基底を正規直交に保てる点が強みです。

---

## 7. normal operatorのスペクトル定理

<a id="thm-la5-normal-spectral"></a>
<!-- formal-statement-start -->
> **定理（複素normal operatorのスペクトル定理）**  
> 有限次元複素内積空間上の線形自己写像 $T$ について、次は同値である。
>
> 1. $T$ はnormal operatorである。
> 2. $T$ は正規直交基底で対角化できる。
>
> 行列で言えば
$$
A^*A=AA^*
$$
> と、あるunitary行列 $Q$ と対角行列 $D$ が存在して
$$
A=QDQ^*
$$
> と書けることは同値である。
<!-- formal-statement-end -->

<!-- proof-start -->
### 証明

まず $A=QDQ^*$ なら
$$
A^*A=QD^*DQ^*,
\qquad
AA^*=QDD^*Q^*.
$$
対角行列は $D^*D=DD^*$ なのでnormalです。

逆に $A$ をnormalとします。Schur三角化により
$$
A=QRQ^*
$$
とでき、unitary相似はnormal性を保存するので $R$ もnormalです。上三角normal行列は対角行列であることを示せば十分です。

第1列のノルムと第1行のノルムを比べます。normal性 $R^*R=RR^*$ の $(1,1)$ 成分から
$$
\sum_k|R_{k1}|^2
=
\sum_k|R_{1k}|^2.
$$
上三角なので左辺は $|R_{11}|^2$ だけです。したがって第1行の非対角成分は全て0。残る右下ブロックもnormalとなるので帰納法で全非対角成分が0です。よって $R$ は対角。$\square$
<!-- proof-end -->

これが実対称行列のスペクトル定理を包む複素版です。

- Hermitian作用素：normal + 固有値が実数
- unitary作用素：normal + 固有値が単位円上
- 一般のnormal operator：normal + 固有値は任意の複素数

---

## 8. normalならJordanブロックは育たない

スペクトル定理からnormal operatorは対角化可能です。したがってLA4の言葉では、Jordanブロックは全て $1\times1$ です。

normal性は
$$
T^*T=TT^*
$$
という一見局所的な式ですが、その帰結は

> 一般化固有ベクトルが不要で、正規直交固有基底まで取れる

という非常に強い構造です。

---

## 9. 演習

### Level A

<a id="ex-la5-a01"></a>
#### LA5-A01 共役転置
- Level: A

$$
A=\begin{pmatrix}1&i\\2&1-i\end{pmatrix}
$$
の $A^*$ を求めよ。

<!-- solution-start -->
**解答**：
$$
A^*=\begin{pmatrix}1&2\\-i&1+i\end{pmatrix}.
$$
<!-- solution-end -->

<a id="ex-la5-a02"></a>
#### LA5-A02 Hermitian判定
- Level: A

$$
A=\begin{pmatrix}2&i\\-i&3\end{pmatrix}
$$
がHermitianであることを確認せよ。

<!-- solution-start -->
**解答**：共役転置すると同じ行列になるので $A^*=A$。
<!-- solution-end -->

<a id="ex-la5-a03"></a>
#### LA5-A03 unitary判定
- Level: A

$U=\operatorname{diag}(1,i,-1)$ がunitaryであることを示せ。

<!-- solution-start -->
**解答**：$U^*=\operatorname{diag}(1,-i,-1)$ なので $U^*U=I$。
<!-- solution-end -->

<a id="ex-la5-a04"></a>
#### LA5-A04 normal判定
- Level: A

任意の対角複素行列がnormalであることを示せ。

<!-- solution-start -->
**解答**：$D$ と $D^*$ はともに対角で可換だから $D^*D=DD^*$。
<!-- solution-end -->

### Level B

<a id="ex-la5-b01"></a>
#### LA5-B01 unitaryと内積保存
- Level: B

$T$ がunitaryなら $\langle Tx,Ty\rangle=\langle x,y\rangle$ を示し、逆に内積を保存する線形写像もunitaryであることを示せ。

<!-- solution-start -->
**解答**：unitaryなら本文の計算で保存する。逆に全ての $x,y$ で
$$
\langle Tx,Ty\rangle=\langle x,y\rangle
$$
なら
$$
\langle x,T^*Ty\rangle=\langle x,y\rangle
$$
なので非退化性から $T^*T=I$。有限次元ではこれは単射を意味し可逆なので $T^{-1}=T^*$、従って $TT^*=I$ も成り立つ。
<!-- solution-end -->

<a id="ex-la5-b02"></a>
#### LA5-B02 Hermitianの異なる固有空間は直交
- Level: B

Hermitian作用素 $T$ の固有ベクトル $u,v$ が異なる固有値 $\lambda\ne\mu$ に属するとき $u\perp v$ を示せ。

<!-- solution-start -->
**解答**：固有値は実数。さらに
$$
\overline\lambda\langle u,v\rangle
=\langle \lambda u,v\rangle
=\langle Tu,v\rangle
=\langle u,Tv\rangle
=\mu\langle u,v\rangle.
$$
$\lambda$ は実数なので $(\lambda-\mu)\langle u,v\rangle=0$。従って直交。
<!-- solution-end -->

<a id="ex-la5-b03"></a>
#### LA5-B03 normalだがHermitianでない例
- Level: B

$$
A=\begin{pmatrix}0&-1\\1&0\end{pmatrix}
$$
を複素行列とみなす。normalであるがHermitianでないことを示し、固有値を求めよ。

<!-- solution-start -->
**解答**：$A^* = A^{\mathsf T}=-A$ なので $A^*A=(-A)A=I=AA^*$、よってnormal。一方 $A^*\ne A$。特性方程式は $\lambda^2+1=0$ なので固有値は $\pm i$。
<!-- solution-end -->

### Level C

<a id="ex-la5-c01"></a>
#### LA5-C01 normalと固有ベクトルの随伴
- Level: C

normal operator $T$ と固有ベクトル $Tv=\lambda v$ に対して
$$
T^*v=\overline\lambda v
$$
を示せ。

<!-- solution-start -->
**解答**：normal性から任意の $x$ について
$$
\|Tx\|^2=\langle Tx,Tx\rangle=\langle x,T^*Tx\rangle
$$
と
$$
\|T^*x\|^2=\langle x,TT^*x\rangle
$$
が等しい。従って $T-\lambda I$ もnormalで
$$
\|(T-\lambda I)x\|=\|(T^*-\overline\lambda I)x\|.
$$
$x=v$ とすると左辺は0なので右辺も0。よって $T^*v=\overline\lambda v$。
<!-- solution-end -->

---

## 10. 次に進む

複素有限次元作用素のスペクトル理論が閉じました。最後に既存の実対称スペクトル定理・PSD・SVDを再利用し、**Hermitian二次形式・慣性・polar decomposition・複素SVD** を一つの橋にまとめます。
