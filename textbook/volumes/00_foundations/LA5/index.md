# LA5 標準線形代数 V：複素内積・有限次元随伴・normal operator

[F0-00E1](../F0_00E1_内積_Gram_Schmidt_射影_QR/index.md) では実内積空間を扱いました。複素数上では単なる転置では長さや直交性を正しく扱えず、**複素共役を伴う内積と共役転置**が必要です。

この章では内積の規約を
$$
\langle x,y\rangle=x^*y
$$
に合わせ、**第1変数で共役線形、第2変数で線形** と固定します。

実数版のGram–Schmidtを「共役を入れれば同じ」と既習扱いすると、随伴の存在証明で未構成の正規直交基底を先取りしてしまいます。そこで複素Gram–Schmidtを随伴より前に構成し、その後のSchur・スペクトル定理まで依存順序を閉じます。

---

## 1. 複素内積と複素Gram–Schmidt

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
と定めます。

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
和が0なら各 $|x_j|^2=0$ なので $x=0$。逆向きは明らかです。従って標準式は複素内積です。
<!-- definition-example-end -->

ノルムを
$$
\|x\|=\sqrt{\langle x,x\rangle}
$$
と書きます。$\alpha\in\mathbb C$ に対して
$$
\|\alpha x\|^2
=\langle \alpha x,\alpha x\rangle
=\overline\alpha\alpha\langle x,x\rangle
=|\alpha|^2\|x\|^2,
$$
従って
$$
\|\alpha x\|=|\alpha|\|x\|.
$$

<a id="thm-la5-complex-gram-schmidt"></a>
<!-- formal-statement-start -->
> **定理（複素Gram–Schmidt直交化）**  
> 一次独立なベクトル $v_1,\dots,v_k$ に対し、正規直交系 $q_1,\dots,q_k$ を構成でき、各 $m=1,\dots,k$ について
$$
\operatorname{span}(q_1,\dots,q_m)
=
\operatorname{span}(v_1,\dots,v_m)
$$
> が成り立つ。
<!-- formal-statement-end -->

<!-- proof-start -->
### 証明

まず
$$
z_1=v_1,
\qquad
q_1=\frac{z_1}{\|z_1\|}
$$
とします。$v_1\ne0$ なので定義できます。

$q_1,\dots,q_{m-1}$ まで構成できたとして
$$
z_m
=v_m-\sum_{j=1}^{m-1}\langle q_j,v_m\rangle q_j
$$
と置きます。係数が $\langle q_j,v_m\rangle$ であるのは、本章の規約では第2変数が線形だからです。

まず $z_m\ne0$ を示します。もし $z_m=0$ なら
$$
v_m
=\sum_{j=1}^{m-1}\langle q_j,v_m\rangle q_j.
$$
帰納法の仮定から
$$
q_j\in\operatorname{span}(v_1,\dots,v_j)
\subset\operatorname{span}(v_1,\dots,v_{m-1}),
$$
従って $v_m$ も前の $v_1,\dots,v_{m-1}$ のspanに入り、一次独立性に反します。よって
$$
q_m=\frac{z_m}{\|z_m\|}
$$
と定義できます。

$i<m$ に対して
$$
\begin{aligned}
\langle q_i,z_m\rangle
&=\langle q_i,v_m\rangle
-\sum_{j=1}^{m-1}\langle q_j,v_m\rangle\langle q_i,q_j\rangle\\
&=\langle q_i,v_m\rangle
-\langle q_i,v_m\rangle\\
&=0.
\end{aligned}
$$
従って $q_m$ はそれ以前の全ての $q_i$ と直交し、定義から $\|q_m\|=1$ です。

最後にspanの一致を示します。$z_m$ の定義から
$$
q_m\in\operatorname{span}(v_1,\dots,v_m),
$$
一方
$$
v_m
=z_m+\sum_{j=1}^{m-1}\langle q_j,v_m\rangle q_j
\in\operatorname{span}(q_1,\dots,q_m).
$$
帰納法の仮定と合わせて両包含が得られます。これを $m=1,\dots,k$ まで繰り返せば結論を得ます。$\square$
<!-- proof-end -->

<a id="thm-la5-orthonormal-extension"></a>
<!-- formal-statement-start -->
> **系（正規直交基底の存在と正規直交系の延長）**  
> 有限次元複素内積空間は正規直交基底を持つ。また任意の有限正規直交系は空間全体の正規直交基底へ延長できる。
<!-- formal-statement-end -->

<!-- proof-start -->
### 証明

任意の基底へ[複素Gram–Schmidt直交化](#thm-la5-complex-gram-schmidt)を適用すれば正規直交基底を得ます。

次に正規直交系 $q_1,\dots,q_r$ が与えられたとします。これは一次独立なので通常の基底延長により
$$
q_1,\dots,q_r,w_{r+1},\dots,w_n
$$
という基底へ延長できます。この基底へGram–Schmidtを先頭から適用します。最初の $r$ 本は既に正規直交なので、$j\le r$ では前のベクトルへの射影係数が0で $z_j=q_j$、しかも $\|q_j\|=1$ です。従って最初の $r$ 本は変化せず、残りだけが直交化されます。よって元の正規直交系を保ったまま正規直交基底へ延長できます。$\square$
<!-- proof-end -->

---

## 2. 有限次元随伴

<a id="def-la5-adjoint"></a>
<!-- formal-statement-start -->
> **定義（有限次元随伴）**  
> 有限次元複素内積空間 $V$ 上の線形自己写像 $T:V\to V$ に対し
$$
\langle Tx,y\rangle
=\langle x,T^*y\rangle
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
が定める写像を考えます。共役転置は
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
従ってこの例では随伴は行列 $A^*$ で表されます。
<!-- definition-example-end -->

<a id="thm-la5-adjoint-existence"></a>
<!-- formal-statement-start -->
> **定理（有限次元随伴の存在一意性）**  
> 有限次元複素内積空間上の任意の線形自己写像 $T$ に対して随伴 $T^*$ は一意に存在する。正規直交基底で $T$ の行列が $A$ なら、$T^*$ の行列は
$$
A^*=\overline A^{\mathsf T}
$$
> である。
<!-- formal-statement-end -->

<!-- proof-start -->
### 証明

[正規直交基底の存在](#thm-la5-orthonormal-extension)により正規直交基底 $q_1,\dots,q_n$ を取れます。ベクトルを
$$
x=\sum_i x_iq_i,
\qquad
y=\sum_j y_jq_j
$$
と書くと
$$
\begin{aligned}
\langle x,y\rangle
&=\sum_{i,j}\overline{x_i}y_j\langle q_i,q_j\rangle\\
&=\sum_i\overline{x_i}y_i\\
&=x^*y.
\end{aligned}
$$
従って正規直交基底では抽象内積が標準座標内積になります。

$T$ の表現行列を $A$ とすると
$$
\begin{aligned}
\langle Tx,y\rangle
&=(Ax)^*y\\
&=x^*A^*y\\
&=\langle x,A^*y\rangle.
\end{aligned}
$$
従って座標で $y\mapsto A^*y$ と表される線形写像が随伴の条件を満たし、存在が示されます。

一意性を示します。$S_1,S_2$ がともに随伴なら
$$
\langle x,S_1y\rangle
=\langle Tx,y\rangle
=\langle x,S_2y\rangle.
$$
従って全ての $x,y$ で
$$
\langle x,(S_1-S_2)y\rangle=0.
$$
$x=(S_1-S_2)y$ と取ると
$$
\|(S_1-S_2)y\|^2=0.
$$
正定値性から $(S_1-S_2)y=0$。全ての $y$ で成り立つので $S_1=S_2$ です。$\square$
<!-- proof-end -->

<a id="thm-la5-adjoint-rules"></a>
<!-- formal-statement-start -->
> **定理（随伴の計算規則）**  
> 線形自己写像 $S,T$ と $\alpha\in\mathbb C$ に対し
$$
(S+T)^*=S^*+T^*,
$$
$$
(\alpha T)^*=\overline\alpha\,T^*,
$$
$$
(ST)^*=T^*S^*,
$$
$$
(T^*)^*=T.
$$
<!-- formal-statement-end -->

<!-- proof-start -->
### 証明

任意の $x,y$ に対して
$$
\begin{aligned}
\langle(S+T)x,y\rangle
&=\langle Sx,y\rangle+\langle Tx,y\rangle\\
&=\langle x,S^*y\rangle+\langle x,T^*y\rangle\\
&=\langle x,(S^*+T^*)y\rangle.
\end{aligned}
$$
随伴の一意性から $(S+T)^*=S^*+T^*$ です。

また第1変数は共役線形なので
$$
\begin{aligned}
\langle \alpha Tx,y\rangle
&=\overline\alpha\langle Tx,y\rangle\\
&=\overline\alpha\langle x,T^*y\rangle\\
&=\langle x,\overline\alpha T^*y\rangle,
\end{aligned}
$$
従って $(\alpha T)^*=\overline\alpha T^*$。

積については
$$
\begin{aligned}
\langle STx,y\rangle
&=\langle Tx,S^*y\rangle\\
&=\langle x,T^*S^*y\rangle,
\end{aligned}
$$
従って $(ST)^*=T^*S^*$ です。

最後に随伴の定義と共役対称性から
$$
\begin{aligned}
\langle T^*x,y\rangle
&=\overline{\langle y,T^*x\rangle}\\
&=\overline{\langle Ty,x\rangle}\\
&=\langle x,Ty\rangle.
\end{aligned}
$$
従って $T$ は $T^*$ の随伴であり、一意性から $(T^*)^*=T$ です。$\square$
<!-- proof-end -->

LA3の代数的双対写像とは区別します。

- 代数的双対写像：基底表示は $A^{\mathsf T}$
- 有限次元随伴：**正規直交基底**表示は $A^*$

共役が入るのは内積を使っているからです。

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
$$
D=\operatorname{diag}(1,i)
$$
を考えます。
$$
D^*=\operatorname{diag}(1,-i),
$$
従って
$$
D^*D=DD^*=I.
$$
よって $D$ はunitaryで、特にnormalです。一方 $D^*\ne D$ なのでHermitianではありません。

Hermitianなら
$$
T^*T=T^2=TT^*,
$$
unitaryなら
$$
T^*T=I=TT^*,
$$
なので、いずれもnormalの特別な場合です。
<!-- definition-example-end -->

unitary作用素は内積を保存します。実際
$$
\langle Tx,Ty\rangle
=\langle x,T^*Ty\rangle
=\langle x,y\rangle.
$$
従ってノルムも保存します。

---

## 4. Hermitian作用素の固有値は実数

<a id="thm-la5-hermitian-real-eigenvalues"></a>
<!-- formal-statement-start -->
> **定理（Hermitian作用素の固有値は実数）**  
> Hermitian作用素 $T$ の固有値は全て実数である。
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
\langle\lambda v,v\rangle
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
$v\ne0$ なので $\langle v,v\rangle>0$。よって
$$
\lambda=\overline\lambda,
$$
すなわち $\lambda\in\mathbb R$ です。$\square$
<!-- proof-end -->

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
\|Tv\|=\|v\|.
$$
一方
$$
\|Tv\|
=\|\lambda v\|
=|\lambda|\|v\|.
$$
$\|v\|>0$ なので
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
> 有限次元複素内積空間上の任意の線形自己写像 $T$ に対し、ある正規直交基底が存在して、その基底での表現行列は上三角になる。行列表現では任意の $A\in\mathbb C^{n\times n}$ に対しunitary行列 $Q$ と上三角行列 $R$ が存在して
$$
A=QRQ^*
$$
> と書ける。
<!-- formal-statement-end -->

<!-- proof-start -->
### 証明

次元 $n$ に関する帰納法で示します。$n=1$ なら自明です。

$n\ge2$ とします。LA4で明示した[代数学の基本定理という証明境界](../LA4/index.md#note-la4-fta-boundary)により、$n$ 次の特性多項式 $\chi_T$ は複素数の根 $\lambda$ を持ちます。LA4の[固有値と特性多項式の根](../LA4/index.md#thm-la4-eigenvalue-characteristic-root)から $\lambda$ は $T$ の固有値です。従って非零固有ベクトル $v$ が存在し
$$
q_1=\frac{v}{\|v\|}
$$
とすれば単位固有ベクトルになります。

[正規直交系の延長](#thm-la5-orthonormal-extension)により
$$
q_1,q_2,\dots,q_n
$$
を正規直交基底へ延長します。Gram–Schmidtの係数・非零性・直交性は本章第1節で既に証明したので、ここではその定理を依存先として使います。

この基底で $T$ の行列を $M$ とします。
$$
Tq_1=\lambda q_1
$$
なので第1列は
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
と書けます。$B$ は $(n-1)\times(n-1)$ 複素行列です。

帰納法の仮定を $B$ に適用するとunitary行列 $Q_1$ と上三角行列 $R_1$ が存在して
$$
B=Q_1R_1Q_1^*.
$$
$$
\widetilde Q=
\begin{pmatrix}
1&0\\
0&Q_1
\end{pmatrix}
$$
と置けば $\widetilde Q$ はunitaryで
$$
\begin{aligned}
\widetilde Q^*M\widetilde Q
&=
\begin{pmatrix}
\lambda&r^*Q_1\\
0&Q_1^*BQ_1
\end{pmatrix}\\
&=
\begin{pmatrix}
\lambda&r^*Q_1\\
0&R_1
\end{pmatrix},
\end{aligned}
$$
右辺は上三角です。最初の正規直交基底への基底変換もunitaryなので、二つを合成すれば元の行列に対してunitary行列 $Q$ と上三角行列 $R$ が得られ
$$
A=QRQ^*.
$$
$\square$
<!-- proof-end -->

Schur三角化はJordan標準形より弱い分解ですが、正規直交基底を保てる点が強みです。

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

まず
$$
A=QDQ^*
$$
とunitary対角化できるとします。[随伴の計算規則](#thm-la5-adjoint-rules)から
$$
A^*=QD^*Q^*.
$$
従って
$$
A^*A=QD^*DQ^*,
\qquad
AA^*=QDD^*Q^*.
$$
$D,D^*$ は対角行列で可換なので
$$
D^*D=DD^*,
$$
よって $A$ はnormalです。

逆に $A$ をnormalとします。[Schur三角化](#thm-la5-schur)により
$$
A=QRQ^*
$$
と書けます。
$$
R=Q^*AQ,
\qquad
R^*=Q^*A^*Q
$$
なので
$$
R^*R=Q^*A^*AQ,
\qquad
RR^*=Q^*AA^*Q.
$$
$A$ がnormalなので
$$
R^*R=RR^*.
$$
従って $R$ もnormalです。

あとは「上三角normal行列は対角行列」を示します。サイズについて帰納法を使います。$1\times1$ は自明です。

$n\times n$ の上三角normal行列 $R=(R_{ij})$ について $(1,1)$ 成分を比較します。
$$
(R^*R)_{11}
=\sum_{k=1}^n|R_{k1}|^2.
$$
上三角なので $R_{k1}=0$（$k>1$）、従って
$$
(R^*R)_{11}=|R_{11}|^2.
$$
一方
$$
(RR^*)_{11}
=\sum_{k=1}^n|R_{1k}|^2
=|R_{11}|^2+\sum_{k=2}^n|R_{1k}|^2.
$$
normal性から両者は等しいので
$$
\sum_{k=2}^n|R_{1k}|^2=0.
$$
各項は非負実数だから
$$
R_{1k}=0
\qquad(k=2,\dots,n).
$$
従って
$$
R=
\begin{pmatrix}
r_{11}&0\\
0&B
\end{pmatrix}.
$$
normal性を代入すると
$$
B^*B=BB^*,
$$
従って $B$ も上三角normalです。帰納法の仮定から $B$ は対角行列なので $R$ 全体も対角行列です。

従ってSchur分解
$$
A=QRQ^*
$$
は実はunitary対角化であり、normal operatorは正規直交固有基底を持ちます。$\square$
<!-- proof-end -->

これが実対称行列のスペクトル定理を包む複素版です。

- Hermitian作用素：normal、かつ固有値は実数
- unitary作用素：normal、かつ固有値は単位円上
- 一般のnormal operator：正規直交固有基底を持ち、固有値は任意の複素数

---

## 8. normalならJordanブロックは育たない

[複素normal operatorのスペクトル定理](#thm-la5-normal-spectral)からnormal operatorは対角化可能です。LA4の[最小多項式による対角化判定](../LA4/index.md#thm-la4-diagonalizable-criterion)では最小多項式に重複一次因子がないことと同値であり、Jordan標準形では全てのブロックが $1\times1$ であることと同値です。

normal性
$$
T^*T=TT^*
$$
という一つの可換条件から

> 一般化固有ベクトルが不要で、しかも固有基底を正規直交に取れる

という強い構造が得られます。

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
\overline A=
\begin{pmatrix}
1&-i\\
2&1+i
\end{pmatrix},
$$
さらに転置して
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
A^*
=\begin{pmatrix}2&i\\-i&3\end{pmatrix}
=A.
$$
従って定義通りHermitianです。
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
U^*U=UU^*=I.
$$
よってunitaryです。
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
D^*D
=\operatorname{diag}(|d_1|^2,\dots,|d_n|^2)
=DD^*.
$$
従ってnormalです。
<!-- solution-end -->

<a id="ex-la5-a05"></a>
#### LA5-A05 複素Gram–Schmidt
- Level: A

$\mathbb C^2$ の標準内積で
$$
v_1=\begin{pmatrix}1\\i\end{pmatrix},
\qquad
v_2=\begin{pmatrix}1\\0\end{pmatrix}
$$
をGram–Schmidt直交化せよ。

<!-- solution-start -->
**解答**：まず
$$
\|v_1\|=\sqrt{|1|^2+|i|^2}=\sqrt2,
$$
従って
$$
q_1=\frac1{\sqrt2}\begin{pmatrix}1\\i\end{pmatrix}.
$$
本章の規約では射影係数は $\langle q_1,v_2\rangle$ なので
$$
\langle q_1,v_2\rangle
=\frac1{\sqrt2}.
$$
従って
$$
z_2
=v_2-\langle q_1,v_2\rangle q_1
=\begin{pmatrix}1\\0\end{pmatrix}
-\frac12\begin{pmatrix}1\\i\end{pmatrix}
=\frac12\begin{pmatrix}1\\-i\end{pmatrix}.
$$
$\|z_2\|=1/\sqrt2$ なので
$$
q_2=\frac1{\sqrt2}\begin{pmatrix}1\\-i\end{pmatrix}.
$$
実際
$$
\langle q_1,q_2\rangle
=\frac12(1+\overline i(-i))
=\frac12(1-1)=0.
$$
<!-- solution-end -->

### Level B

<a id="ex-la5-b01"></a>
#### LA5-B01 unitaryと内積保存
- Level: B

$T$ がunitaryなら $\langle Tx,Ty\rangle=\langle x,y\rangle$ を示し、逆に内積を保存する線形自己写像もunitaryであることを示せ。

<!-- solution-start -->
**解答**：unitaryなら
$$
\langle Tx,Ty\rangle
=\langle x,T^*Ty\rangle
=\langle x,y\rangle.
$$

逆に内積保存を仮定します。随伴の定義から
$$
\langle x,T^*Ty\rangle
=\langle Tx,Ty\rangle
=\langle x,y\rangle.
$$
従って
$$
\langle x,(T^*T-I)y\rangle=0
$$
が全ての $x,y$ で成り立ちます。$x=(T^*T-I)y$ と取れば
$$
\|(T^*T-I)y\|^2=0,
$$
よって $T^*T=I$。

$Tx=0$ なら
$$
\|x\|^2
=\langle x,T^*Tx\rangle=0,
$$
従って $x=0$。有限次元自己写像なので $T$ は可逆です。$T^*T=I$ の右から $T^{-1}$ を掛けて
$$
T^*=T^{-1},
$$
従って
$$
TT^*=I.
$$
よってunitaryです。
<!-- solution-end -->

<a id="ex-la5-b02"></a>
#### LA5-B02 Hermitianの異なる固有空間は直交
- Level: B

Hermitian作用素 $T$ の固有ベクトル $u,v$ が異なる固有値 $\lambda\ne\mu$ に属するとき $u\perp v$ を示せ。

<!-- solution-start -->
**解答**：[Hermitian作用素の固有値は実数](#thm-la5-hermitian-real-eigenvalues)なので $\overline\lambda=\lambda$。さらに
$$
\begin{aligned}
\lambda\langle u,v\rangle
&=\overline\lambda\langle u,v\rangle\\
&=\langle\lambda u,v\rangle\\
&=\langle Tu,v\rangle\\
&=\langle u,Tv\rangle\\
&=\mu\langle u,v\rangle.
\end{aligned}
$$
従って
$$
(\lambda-\mu)\langle u,v\rangle=0.
$$
$\lambda\ne\mu$ なので $\langle u,v\rangle=0$ です。
<!-- solution-end -->

<a id="ex-la5-b03"></a>
#### LA5-B03 normalだがHermitianでない例
- Level: B

$$
A=\begin{pmatrix}0&-1\\1&0\end{pmatrix}
$$
を複素行列とみなす。normalであるがHermitianでないことを示し、固有値を求めよ。

<!-- solution-start -->
**解答**：
$$
A^*=A^{\mathsf T}=-A,
$$
なのでHermitianではありません。一方
$$
A^*A=(-A)A=-A^2=I,
$$
$$
AA^*=A(-A)=-A^2=I,
$$
従ってunitary、特にnormalです。

LA4の[固有値と特性多項式の根](../LA4/index.md#thm-la4-eigenvalue-characteristic-root)を使うと
$$
\chi_A(t)=t^2+1=(t-i)(t+i),
$$
従って固有値は $\pm i$ です。
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
=\langle x,S^*Sx\rangle,
$$
$$
\|S^*x\|^2
=\langle x,SS^*x\rangle.
$$
従って $S^*S=SS^*$ なら
$$
\|Sx\|=\|S^*x\|.
$$

ここで
$$
S=T-\lambda I
$$
と置きます。[随伴の計算規則](#thm-la5-adjoint-rules)から
$$
S^*=T^*-\overline\lambda I.
$$
また
$$
\begin{aligned}
S^*S
&=T^*T-\lambda T^*-\overline\lambda T+|\lambda|^2I,\\
SS^*
&=TT^*-\overline\lambda T-\lambda T^*+|\lambda|^2I.
\end{aligned}
$$
$T$ がnormalなので $S$ もnormalです。

$Tv=\lambda v$ から $Sv=0$。従って
$$
0=\|Sv\|=\|S^*v\|.
$$
正定値性により
$$
S^*v=0,
$$
すなわち
$$
T^*v=\overline\lambda v.
$$
<!-- solution-end -->

---

## 10. 次に進む

複素有限次元作用素のスペクトル理論が閉じました。最後にHermitian二次形式・慣性・polar decomposition・複素特異値分解を一つの橋にまとめます。