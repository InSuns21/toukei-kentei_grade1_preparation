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
となります。実際
$$
\begin{aligned}
\langle \alpha x+\beta y,z\rangle
&=\overline{\langle z,\alpha x+\beta y\rangle}\\
&=\overline{\alpha\langle z,x\rangle+\beta\langle z,y\rangle}\\
&=\overline\alpha\langle x,z\rangle
+\overline\beta\langle y,z\rangle.
\end{aligned}
$$

<!-- definition-example-start: def-la5-complex-inner-product -->
**定義の確認**：$\mathbb C^n$ で
$$
\langle x,y\rangle
=x^*y
=\sum_{j=1}^n\overline{x_j}y_j
$$
と定めます。定義の3条件を順に確認します。

第2変数の線形性は
$$
\begin{aligned}
\langle x,\alpha y+\beta z\rangle
&=\sum_j\overline{x_j}(\alpha y_j+\beta z_j)\\
&=\alpha\langle x,y\rangle+\beta\langle x,z\rangle.
\end{aligned}
$$
共役対称性は
$$
\overline{\langle y,x\rangle}
=\overline{\sum_j\overline{y_j}x_j}
=\sum_j\overline{x_j}y_j
=\langle x,y\rangle.
$$
正定値性は
$$
\langle x,x\rangle
=\sum_j|x_j|^2\ge0.
$$
さらに和が0なら各 $|x_j|^2=0$ なので全ての $x_j=0$、従って $x=0$ です。逆に $x=0$ なら内積は0です。よって標準式は複素内積の定義を全て満たします。
<!-- definition-example-end -->

実内積空間のCauchy–Schwarz不等式・Gram–Schmidt・直交射影は、共役を正しく入れれば複素内積空間にも拡張できます。

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

<!-- definition-example-start: def-la5-adjoint -->
**定義の確認**：$V=\mathbb C^2$、標準内積を使い
$$
A=
\begin{pmatrix}
1&i\\
2&3
\end{pmatrix}
$$
が定める写像 $T(x)=Ax$ を考えます。共役転置は
$$
A^*=
\begin{pmatrix}
1&2\\
-i&3
\end{pmatrix}.
$$
任意の座標列 $x,y$ に対して
$$
\langle Ax,y\rangle
=(Ax)^*y
=x^*A^*y
=\langle x,A^*y\rangle.
$$
したがって、この例では $T^*$ は行列 $A^*$ で表されます。
<!-- definition-example-end -->

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

正規直交基底を取り、ベクトルを座標列 $x,y$ で表します。$T$ の表現行列を $A$ とすると
$$
\begin{aligned}
\langle Tx,y\rangle
&=\langle Ax,y\rangle\\
&=(Ax)^*y\\
&=x^*A^*y\\
&=\langle x,A^*y\rangle.
\end{aligned}
$$
したがって、座標で $y\mapsto A^*y$ と表される線形写像が随伴の条件を満たし、存在が示されます。

一意性を示します。$S_1,S_2$ がともに随伴の条件を満たすとします。任意の $x,y$ に対して
$$
\langle x,S_1y\rangle
=\langle Tx,y\rangle
=\langle x,S_2y\rangle.
$$
従って
$$
\langle x,(S_1-S_2)y\rangle=0
$$
が全ての $x$ で成り立ちます。ここで
$$
x=(S_1-S_2)y
$$
と取ると
$$
\|(S_1-S_2)y\|^2=0.
$$
正定値性から $(S_1-S_2)y=0$。これは全ての $y$ で成り立つので $S_1=S_2$ です。$\square$
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
**定義の確認**：対角行列
$$
D=\operatorname{diag}(1,i)
$$
を考えます。共役転置は
$$
D^*=\operatorname{diag}(1,-i).
$$
従って
$$
D^*D
=\operatorname{diag}(1,(-i)i)
=I,
$$
$$
DD^*
=\operatorname{diag}(1,i(-i))
=I.
$$
よって $D$ はunitaryであり、特に
$$
D^*D=DD^*
$$
なのでnormalです。一方
$$
D^*=\operatorname{diag}(1,-i)\ne D
$$
なのでHermitianではありません。

またHermitian作用素なら $T^*=T$ なので
$$
T^*T=T^2=TT^*,
$$
unitary作用素なら定義から
$$
T^*T=I=TT^*,
$$
です。従ってHermitianとunitaryはいずれもnormalの特別な場合です。
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

$Tv=\lambda v$, $v\ne0$ とします。Hermitian性 $T^*=T$ と随伴の定義から
$$
\langle Tv,v\rangle
=\langle v,T^*v\rangle
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
従って
$$
(\overline\lambda-\lambda)\langle v,v\rangle=0.
$$
$v\ne0$ なので $\langle v,v\rangle>0$。よって $\lambda=\overline\lambda$、すなわち $\lambda\in\mathbb R$ です。$\square$
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

$Tv=\lambda v$, $v\ne0$ とします。unitary作用素は内積を保存するので
$$
\|Tv\|^2
=\langle Tv,Tv\rangle
=\langle v,v\rangle
=\|v\|^2.
$$
一方
$$
\|Tv\|=\|\lambda v\|=|\lambda|\,\|v\|.
$$
従って
$$
|\lambda|\,\|v\|=\|v\|.
$$
$v\ne0$ より $\|v\|>0$ なので
$$
|\lambda|=1.
$$
$\square$
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

次元 $n$ に関する帰納法で示します。$n=1$ では全ての $1\times1$ 行列がすでに上三角です。

$n\ge2$ とします。複素数上では特性多項式が一次因子を持つので、$T$ は固有値 $\lambda$ と非零固有ベクトルを持ちます。それを正規化して単位固有ベクトル $q_1$ を取ります。

$q_1$ をGram–Schmidtにより正規直交基底
$$
q_1,q_2,\dots,q_n
$$
へ延長します。この基底で $T$ の行列を $M$ とします。$Tq_1=\lambda q_1$ なので、$M$ の第1列は
$$
(\lambda,0,\dots,0)^{\mathsf T}.
$$
従って
$$
M=
\begin{pmatrix}
\lambda&r^*\\
0&B
\end{pmatrix}
$$
と書けます。ここで $B$ は $(n-1)\times(n-1)$ 複素行列です。

帰納法の仮定を $B$ に適用すると、ある $(n-1)\times(n-1)$ unitary行列 $Q_1$ と上三角行列 $R_1$ が存在して
$$
B=Q_1R_1Q_1^*.
$$
ここで
$$
\widetilde Q=
\begin{pmatrix}
1&0\\
0&Q_1
\end{pmatrix}
$$
と置きます。$\widetilde Q$ はunitaryであり
$$
\widetilde Q^*M\widetilde Q
=
\begin{pmatrix}
\lambda&r^*Q_1\\
0&Q_1^*BQ_1
\end{pmatrix}
=
\begin{pmatrix}
\lambda&r^*Q_1\\
0&R_1
\end{pmatrix}.
$$
右辺は上三角です。最初に基底 $q_1,\dots,q_n$ へ移した変換もunitaryなので、それと $\widetilde Q$ を合成すれば、元の $A$ に対してunitary行列 $Q$ と上三角行列 $R$ が得られ
$$
A=QRQ^*.
$$
$\square$
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

まず正規直交基底で対角化できるならnormalであることを示します。
$$
A=QDQ^*
$$
とし、$Q$ はunitary、$D$ は対角行列とします。すると
$$
A^*=QD^*Q^*
$$
なので
$$
A^*A=QD^*DQ^*,
\qquad
AA^*=QDD^*Q^*.
$$
$D$ と $D^*$ はともに対角行列なので可換し
$$
D^*D=DD^*.
$$
従って $A^*A=AA^*$ で $A$ はnormalです。

逆に $A$ をnormalとします。[Schur三角化](#thm-la5-schur)により
$$
A=QRQ^*
$$
とでき、$Q$ はunitary、$R$ は上三角です。まず $R$ もnormalであることを確認します。
$$
R=Q^*AQ,
\qquad
R^*=Q^*A^*Q
$$
なので
$$
R^*R
=Q^*A^*QQ^*AQ
=Q^*A^*AQ,
$$
$$
RR^*
=Q^*AA^*Q.
$$
$A^*A=AA^*$ だから $R^*R=RR^*$ です。

従って「上三角normal行列は対角行列」を示せば十分です。これを行列サイズについて帰納法で示します。$1\times1$ なら自明です。

$n\times n$ の上三角normal行列 $R=(R_{ij})$ を考えます。normal性
$$
R^*R=RR^*
$$
の $(1,1)$ 成分を比較すると
$$
(R^*R)_{11}
=\sum_{k=1}^n\overline{R_{k1}}R_{k1}
=\sum_{k=1}^n|R_{k1}|^2,
$$
$$
(RR^*)_{11}
=\sum_{k=1}^nR_{1k}\overline{R_{1k}}
=\sum_{k=1}^n|R_{1k}|^2.
$$
上三角なので第1列では $R_{k1}=0$（$k>1$）であり
$$
\sum_k|R_{k1}|^2=|R_{11}|^2.
$$
従って
$$
|R_{11}|^2
=|R_{11}|^2+\sum_{k=2}^n|R_{1k}|^2.
$$
よって
$$
\sum_{k=2}^n|R_{1k}|^2=0.
$$
各項は非負なので
$$
R_{1k}=0\qquad(k=2,\dots,n).
$$
つまり第1行の非対角成分も全て0です。従って
$$
R=
\begin{pmatrix}
r_{11}&0\\
0&B
\end{pmatrix}
$$
とブロック対角に書けます。

この形をnormal性へ代入すると
$$
R^*R
=
\begin{pmatrix}
|r_{11}|^2&0\\
0&B^*B
\end{pmatrix},
$$
$$
RR^*
=
\begin{pmatrix}
|r_{11}|^2&0\\
0&BB^*
\end{pmatrix}.
$$
従って
$$
B^*B=BB^*,
$$
すなわち右下ブロック $B$ もnormalです。また $B$ は上三角です。帰納法の仮定から $B$ は対角行列。従って $R$ 全体も対角行列です。

したがって
$$
A=QRQ^*
$$
はunitary対角化であり、$A$ は正規直交固有基底を持ちます。$\square$
<!-- proof-end -->

これが実対称行列のスペクトル定理を包む複素版です。

- Hermitian作用素：normal + 固有値が実数
- unitary作用素：normal + 固有値が単位円上
- 一般のnormal operator：normal + 固有値は任意の複素数

---

## 8. normalならJordanブロックは育たない

[複素normal operatorのスペクトル定理](#thm-la5-normal-spectral)からnormal operatorは対角化可能です。したがってLA4の言葉では、Jordanブロックは全て $1\times1$ です。

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
**解答**：まず成分を複素共役して
$$
\overline A=
\begin{pmatrix}
1&-i\\
2&1+i
\end{pmatrix},
$$
さらに転置するので
$$
A^*=\overline A^{\mathsf T}
=
\begin{pmatrix}
1&2\\
-i&1+i
\end{pmatrix}.
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
**解答**：
$$
\overline A=
\begin{pmatrix}
2&-i\\i&3
\end{pmatrix}
$$
なので
$$
A^*=\overline A^{\mathsf T}
=
\begin{pmatrix}
2&i\\-i&3
\end{pmatrix}
=A.
$$
従ってHermitianです。
<!-- solution-end -->

<a id="ex-la5-a03"></a>
#### LA5-A03 unitary判定
- Level: A

$U=\operatorname{diag}(1,i,-1)$ がunitaryであることを示せ。

<!-- solution-start -->
**解答**：
$$
U^*=\operatorname{diag}(1,-i,-1).
$$
従って
$$
U^*U
=\operatorname{diag}(1,(-i)i,1)
=I,
$$
同様に $UU^*=I$。よってunitaryです。
<!-- solution-end -->

<a id="ex-la5-a04"></a>
#### LA5-A04 normal判定
- Level: A

任意の対角複素行列がnormalであることを示せ。

<!-- solution-start -->
**解答**：
$$
D=\operatorname{diag}(d_1,\dots,d_n)
$$
なら
$$
D^*=\operatorname{diag}(\overline d_1,\dots,\overline d_n).
$$
従って
$$
D^*D
=\operatorname{diag}(|d_1|^2,\dots,|d_n|^2)
=DD^*.
$$
よってnormalです。
<!-- solution-end -->

### Level B

<a id="ex-la5-b01"></a>
#### LA5-B01 unitaryと内積保存
- Level: B

$T$ がunitaryなら $\langle Tx,Ty\rangle=\langle x,y\rangle$ を示し、逆に内積を保存する線形写像もunitaryであることを示せ。

<!-- solution-start -->
**解答**：unitaryなら $T^*T=I$ なので
$$
\langle Tx,Ty\rangle
=\langle x,T^*Ty\rangle
=\langle x,y\rangle.
$$

逆に全ての $x,y$ で
$$
\langle Tx,Ty\rangle=\langle x,y\rangle
$$
とします。随伴の定義から
$$
\langle x,T^*Ty\rangle=\langle x,y\rangle,
$$
従って
$$
\langle x,(T^*T-I)y\rangle=0
$$
が全ての $x,y$ で成り立ちます。$x=(T^*T-I)y$ と取れば
$$
\|(T^*T-I)y\|^2=0
$$
なので $T^*T=I$。

これより $Tx=0$ なら
$$
0=\|Tx\|^2=\langle x,T^*Tx\rangle=\|x\|^2
$$
で $x=0$、従って $T$ は単射です。有限次元の自己写像なので全射でもあり可逆です。$T^*T=I$ の右から $T^{-1}$ を掛ければ
$$
T^*=T^{-1},
$$
従って
$$
TT^*=TT^{-1}=I.
$$
よってunitaryです。
<!-- solution-end -->

<a id="ex-la5-b02"></a>
#### LA5-B02 Hermitianの異なる固有空間は直交
- Level: B

Hermitian作用素 $T$ の固有ベクトル $u,v$ が異なる固有値 $\lambda\ne\mu$ に属するとき $u\perp v$ を示せ。

<!-- solution-start -->
**解答**：Hermitian作用素の固有値は実数なので
$$
\overline\lambda=\lambda.
$$
さらに
$$
\begin{aligned}
\lambda\langle u,v\rangle
&=\overline\lambda\langle u,v\rangle\\
&=\langle \lambda u,v\rangle\\
&=\langle Tu,v\rangle\\
&=\langle u,Tv\rangle\\
&=\mu\langle u,v\rangle.
\end{aligned}
$$
従って
$$
(\lambda-\mu)\langle u,v\rangle=0.
$$
$\lambda\ne\mu$ より
$$
\langle u,v\rangle=0.
$$
<!-- solution-end -->

<a id="ex-la5-b03"></a>
#### LA5-B03 normalだがHermitianでない例
- Level: B

$$
A=\begin{pmatrix}0&-1\\1&0\end{pmatrix}
$$
を複素行列とみなす。normalであるがHermitianでないことを示し、固有値を求めよ。

<!-- solution-start -->
**解答**：$A$ は実行列なので
$$
A^*=A^{\mathsf T}
=
\begin{pmatrix}0&1\\-1&0\end{pmatrix}
=-A.
$$
よって $A^*\ne A$ なのでHermitianではありません。一方
$$
A^*A=(-A)A=-A^2=I,
$$
$$
AA^*=A(-A)=-A^2=I,
$$
従ってnormalです。

固有値は
$$
\det(\lambda I-A)
=\det\begin{pmatrix}\lambda&1\\-1&\lambda\end{pmatrix}
=\lambda^2+1
$$
の零点なので
$$
\lambda=\pm i.
$$
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
**解答**：まずnormal作用素 $S$ では
$$
\|Sx\|^2
=\langle Sx,Sx\rangle
=\langle x,S^*Sx\rangle,
$$
$$
\|S^*x\|^2
=\langle S^*x,S^*x\rangle
=\langle x,SS^*x\rangle.
$$
normal性 $S^*S=SS^*$ から
$$
\|Sx\|=\|S^*x\|.
$$

ここで
$$
S=T-\lambda I
$$
と置きます。その随伴は
$$
S^*=T^*-\overline\lambda I.
$$
また
$$
\begin{aligned}
S^*S
&=(T^*-\overline\lambda I)(T-\lambda I)\\
&=T^*T-\lambda T^*-\overline\lambda T+|\lambda|^2I,
\end{aligned}
$$
$$
\begin{aligned}
SS^*
&=(T-\lambda I)(T^*-\overline\lambda I)\\
&=TT^*-\overline\lambda T-\lambda T^*+|\lambda|^2I.
\end{aligned}
$$
$T^*T=TT^*$ なので $S$ もnormalです。

$Tv=\lambda v$ より
$$
Sv=(T-\lambda I)v=0.
$$
従って
$$
0=\|Sv\|=\|S^*v\|.
$$
ノルムが0なので
$$
S^*v=(T^*-\overline\lambda I)v=0,
$$
すなわち
$$
T^*v=\overline\lambda v.
$$
<!-- solution-end -->

---

## 10. 次に進む

複素有限次元作用素のスペクトル理論が閉じました。最後に既存の実対称スペクトル定理・PSD・特異値分解を再利用し、**Hermitian二次形式・慣性・polar decomposition・複素特異値分解** を一つの橋にまとめます。
