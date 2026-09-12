# LAX1 線形代数・院試／編入 計算演習

<!-- definition-example-audit: strict -->

線形代数は、定理を理解していても、行基本変形・行列式・固有値計算・直交化を紙上で安定して回せなければ試験では点になりません。特に数学系の大学院入試・編入試験では、3次元前後の具体的な行列を短時間で処理し、その途中で階数・固有空間・対角化可能性などを判断する力が要求されます。

この章では [LA1](../LA1/index.md)、[LA2](../LA2/index.md)、[LA3C](../LA3C/index.md)、[LA4](../LA4/index.md)、[LA5](../LA5/index.md)、[LA6](../LA6/index.md) の理論を、院試・編入で典型的な手計算へ変換します。新しい理論を増やすのではなく、**問題を見た直後に何を計算し、どこで場合分けし、どの量を検算に使うか**を反復するためのドリルです。

## 1. 計算ルート早見

```text
連立一次方程式・核・像
  → 行基本変形
  → pivot 列と自由変数を読む

パラメータ付き問題
  → 途中で割る前に「0 になり得る係数」を分離
  → rank(A) と rank(A|b) を比較

基底変換
  → 基底ベクトルを列に並べた行列 B, C を作る
  → [T]_{C←B}=C^{-1}[T]_{std}B

行列式
  → 0 の多い行・列なら Laplace 展開
  → それ以外は基本変形で三角化

固有値・対角化
  → det(λI-A)
  → 各 λ で ker(A-λI)
  → 固有空間の次元を確認

行列の冪
  → 対角化できれば A=PDP^{-1}
  → できなければ最小多項式・Jordan構造を見る

直交化・最小二乗
  → Gram–Schmidt で Q
  → R=Q^*A
  → 最小二乗は A^*Ax=A^*b または QR

SVD
  → A^*A または AA^* の小さい方を対角化
  → 固有値の平方根が特異値

二次形式
  → 対称/Hermitian 行列を直交/unitary対角化
  → 固有値の符号・最大最小を読む
```

---

## 2. 演習

### Level A：標準計算を確実に取る

<a id="ex-lax1-a01"></a>
#### LAX1-A01 行基本変形から階数・核・像を読む
- Level: A

線形写像 $T:\mathbb R^4\to\mathbb R^3$ の標準基底に関する行列を

$$
A=
\begin{pmatrix}
1&2&-1&1\\
2&4&1&5\\
-1&-2&2&-1
\end{pmatrix}
$$

とする。$\operatorname{rank}A$、$\ker T$ の基底、$\operatorname{Im}T$ の基底を求めよ。

<!-- solution-start -->
**解答**：まず第1列を消します。

$$
\begin{pmatrix}
1&2&-1&1\\
2&4&1&5\\
-1&-2&2&-1
\end{pmatrix}
\xrightarrow[\,R_3\leftarrow R_3+R_1\,]{\,R_2\leftarrow R_2-2R_1\,}
\begin{pmatrix}
1&2&-1&1\\
0&0&3&3\\
0&0&1&0
\end{pmatrix}.
$$

第3列の pivot を扱いやすくするため第2行と第3行を入れ替え、下を消します。

$$
\begin{pmatrix}
1&2&-1&1\\
0&0&3&3\\
0&0&1&0
\end{pmatrix}
\xrightarrow{R_2\leftrightarrow R_3}
\begin{pmatrix}
1&2&-1&1\\
0&0&1&0\\
0&0&3&3
\end{pmatrix}
\xrightarrow{R_3\leftarrow R_3-3R_2}
\begin{pmatrix}
1&2&-1&1\\
0&0&1&0\\
0&0&0&3
\end{pmatrix}.
$$

最後に第4列を正規化し、第1行の第3・第4成分を消すと

$$
\begin{pmatrix}
1&2&-1&1\\
0&0&1&0\\
0&0&0&3
\end{pmatrix}
\xrightarrow{R_3\leftarrow \frac13R_3}
\begin{pmatrix}
1&2&-1&1\\
0&0&1&0\\
0&0&0&1
\end{pmatrix}
\xrightarrow[\,R_1\leftarrow R_1-R_3\,]{\,R_1\leftarrow R_1+R_2\,}
\begin{pmatrix}
1&2&0&0\\
0&0&1&0\\
0&0&0&1
\end{pmatrix}.
$$

pivot は3個なので

$$
\boxed{\operatorname{rank}A=3}.
$$

$Ax=0$ は簡約後の行列から

$$
x_1+2x_2=0,\qquad x_3=0,\qquad x_4=0
$$

となります。$x_2=t$ と置けば $x_1=-2t$ なので

$$
(x_1,x_2,x_3,x_4)=t(-2,1,0,0),
$$

したがって

$$
\boxed{\ker T=\operatorname{span}\{(-2,1,0,0)^T\}}.
$$

像の基底は、簡約後の列ではなく**元の行列で pivot に対応する第1,3,4列**から取ります。よって

$$
\boxed{
\operatorname{Im}T=
\operatorname{span}\left\{
\begin{pmatrix}1\\2\\-1\end{pmatrix},
\begin{pmatrix}-1\\1\\2\end{pmatrix},
\begin{pmatrix}1\\5\\-1\end{pmatrix}
\right\}.}
$$

検算すると、rank-nullity は

$$
\dim\operatorname{Im}T+\dim\ker T=3+1=4=\dim\mathbb R^4
$$

を満たします。
<!-- solution-end -->

<a id="ex-lax1-a02"></a>
#### LAX1-A02 パラメータ付き連立一次方程式
- Level: A

実数 $a$ に対し

$$
\begin{pmatrix}
1&1&1\\
1&a&2\\
1&2&a
\end{pmatrix}
\begin{pmatrix}x\\y\\z\end{pmatrix}
=
\begin{pmatrix}1\\0\\2\end{pmatrix}
$$

を考える。解が一意に存在する場合、無数に存在する場合、存在しない場合を分類し、存在する場合は解を求めよ。

<!-- solution-start -->
**解答**：係数行列を $A_a$ とします。第1行を第2・第3行から引けば

$$
\det A_a
=
\det
\begin{pmatrix}
1&1&1\\
0&a-1&1\\
0&1&a-1
\end{pmatrix}
=(a-1)^2-1
=a(a-2).
$$

したがって $a\neq0,2$ では $\det A_a\neq0$ なので一意解があります。この場合、拡大係数行列に同じ消去を行うと

$$
\left(
\begin{array}{ccc|c}
1&1&1&1\\
1&a&2&0\\
1&2&a&2
\end{array}
\right)
\xrightarrow[\,R_3\leftarrow R_3-R_1\,]{\,R_2\leftarrow R_2-R_1\,}
\left(
\begin{array}{ccc|c}
1&1&1&1\\
0&a-1&1&-1\\
0&1&a-1&1
\end{array}
\right).
$$

下2行は

$$
(a-1)y+z=-1,\qquad y+(a-1)z=1
$$

です。第1式から $z=-1-(a-1)y$ として第2式へ代入すると

$$
y+(a-1)\{-1-(a-1)y\}=1,
$$

$$
\{1-(a-1)^2\}y=a,
$$

$$
-a(a-2)y=a.
$$

ここでは $a\neq0,2$ なので割ることができ、

$$
y=-\frac1{a-2}.
$$

これを $(a-1)y+z=-1$ に戻すと

$$
z=-1+\frac{a-1}{a-2}=\frac1{a-2}.
$$

さらに第1行 $x+y+z=1$ で $y+z=0$ だから $x=1$。従って

$$
\boxed{(x,y,z)=\left(1,-\frac1{a-2},\frac1{a-2}\right)}
\qquad(a\neq0,2).
$$

次に、割り算をしてはいけない特別な値を個別に調べます。

$a=0$ では

$$
\left(
\begin{array}{ccc|c}
1&1&1&1\\
1&0&2&0\\
1&2&0&2
\end{array}
\right)
\sim
\left(
\begin{array}{ccc|c}
1&0&2&0\\
0&1&-1&1\\
0&0&0&0
\end{array}
\right).
$$

したがって

$$
x+2z=0,\qquad y-z=1.
$$

$z=t$ と置けば

$$
\boxed{(x,y,z)=(-2t,1+t,t),\qquad t\in\mathbb R},
$$

で、解は無数にあります。

$a=2$ では、第1行を第2・第3行から引いた時点で

$$
\left(
\begin{array}{ccc|c}
1&1&1&1\\
0&1&1&-1\\
0&1&1&1
\end{array}
\right)
\xrightarrow{R_3\leftarrow R_3-R_2}
\left(
\begin{array}{ccc|c}
1&1&1&1\\
0&1&1&-1\\
0&0&0&2
\end{array}
\right).
$$

最後の行は $0=2$ を意味するので不整合です。以上より

$$
\boxed{
\begin{cases}
a\neq0,2 &: \text{一意解},\\
a=0 &: \text{無数の解},\\
a=2 &: \text{解なし}.
\end{cases}}
$$

パラメータ問題では、$a$ や $a-2$ で割る前に、それらが0になる場合を先に分離するのが重要です。
<!-- solution-end -->

<a id="ex-lax1-a03"></a>
#### LAX1-A03 非標準基底での表現行列
- Level: A

$T:\mathbb R^3\to\mathbb R^3$ の標準基底に関する行列を

$$
M=
\begin{pmatrix}
1&1&0\\
0&1&1\\
1&0&1
\end{pmatrix}
$$

とする。定義域の基底 $B=(b_1,b_2,b_3)$ と値域の基底 $C=(c_1,c_2,c_3)$ を

$$
b_1=(1,1,0)^T,\quad b_2=(1,0,1)^T,\quad b_3=(0,1,1)^T,
$$

$$
c_1=(1,0,0)^T,\quad c_2=(1,1,0)^T,\quad c_3=(1,1,1)^T
$$

とする。$[T]_{C\leftarrow B}$ を求めよ。

<!-- solution-start -->
**解答**：基底ベクトルを標準座標で列に並べると

$$
B=
\begin{pmatrix}
1&1&0\\
1&0&1\\
0&1&1
\end{pmatrix},\qquad
C=
\begin{pmatrix}
1&1&1\\
0&1&1\\
0&0&1
\end{pmatrix}.
$$

$B$ 座標 $[x]_B$ から標準座標へは $x=B[x]_B$、標準座標で $T$ を作用させると $T(x)=MB[x]_B$、最後に $C$ 座標へ直すには $C^{-1}$ を掛けます。従って

$$
[T]_{C\leftarrow B}=C^{-1}MB.
$$

まず $MB$ を列ごとに計算します。

$$
Mb_1=
\begin{pmatrix}2\\1\\1\end{pmatrix},\qquad
Mb_2=
\begin{pmatrix}1\\1\\2\end{pmatrix},\qquad
Mb_3=
\begin{pmatrix}1\\2\\1\end{pmatrix},
$$

よって

$$
MB=
\begin{pmatrix}
2&1&1\\
1&1&2\\
1&2&1
\end{pmatrix}.
$$

また $C$ は上三角なので、$CC^{-1}=I$ を満たすように後退代入すると

$$
C^{-1}=
\begin{pmatrix}
1&-1&0\\
0&1&-1\\
0&0&1
\end{pmatrix}.
$$

したがって

$$
C^{-1}MB
=
\begin{pmatrix}
1&-1&0\\
0&1&-1\\
0&0&1
\end{pmatrix}
\begin{pmatrix}
2&1&1\\
1&1&2\\
1&2&1
\end{pmatrix}
=
\begin{pmatrix}
2-1&1-1&1-2\\
1-1&1-2&2-1\\
1&2&1
\end{pmatrix}.
$$

従って

$$
\boxed{
[T]_{C\leftarrow B}=
\begin{pmatrix}
1&0&-1\\
0&-1&1\\
1&2&1
\end{pmatrix}.}
$$
<!-- solution-end -->

<a id="ex-lax1-a04"></a>
#### LAX1-A04 4次行列式を基本変形で落とす
- Level: A

$$
D=
\det
\begin{pmatrix}
1&1&1&1\\
1&2&3&4\\
1&3&6&10\\
1&4&10&20
\end{pmatrix}
$$

を、余因子展開を力任せに使わず求めよ。

<!-- solution-start -->
**解答**：下から順に隣り合う行の差を取ります。すべて「ある行に別の行の倍を加える」操作なので、行列式の値は変わりません。

$$
R_4\leftarrow R_4-R_3,\qquad
R_3\leftarrow R_3-R_2,\qquad
R_2\leftarrow R_2-R_1
$$

より

$$
D=
\det
\begin{pmatrix}
1&1&1&1\\
0&1&2&3\\
0&1&3&6\\
0&1&4&10
\end{pmatrix}.
$$

もう一度、下から差を取ります。

$$
R_4\leftarrow R_4-R_3,\qquad
R_3\leftarrow R_3-R_2
$$

とすると

$$
D=
\det
\begin{pmatrix}
1&1&1&1\\
0&1&2&3\\
0&0&1&3\\
0&0&1&4
\end{pmatrix}.
$$

最後に

$$
R_4\leftarrow R_4-R_3
$$

として

$$
D=
\det
\begin{pmatrix}
1&1&1&1\\
0&1&2&3\\
0&0&1&3\\
0&0&0&1
\end{pmatrix}.
$$

上三角行列の行列式は対角成分の積なので

$$
\boxed{D=1\cdot1\cdot1\cdot1=1}.
$$

途中で行交換や定数倍を使っていないため、符号や倍率の補正も不要です。行列式は「展開する前に0を作れるか」を確認するのが定石です。
<!-- solution-end -->

<a id="ex-lax1-a05"></a>
#### LAX1-A05 固有値・固有ベクトル・対角化
- Level: A

$$
A=
\begin{pmatrix}
2&1&0\\
1&2&0\\
0&0&4
\end{pmatrix}
$$

について固有値と各固有空間を求め、$A=PDP^{-1}$ の形に対角化せよ。

<!-- solution-start -->
**解答**：まず特性多項式を計算します。

$$
\det(\lambda I-A)
=
\det
\begin{pmatrix}
\lambda-2&-1&0\\
-1&\lambda-2&0\\
0&0&\lambda-4
\end{pmatrix}.
$$

第3成分が分離しているので

$$
\det(\lambda I-A)
=(\lambda-4)\{(\lambda-2)^2-1\}
=(\lambda-4)(\lambda-1)(\lambda-3).
$$

従って固有値は $1,3,4$ です。

$\lambda=1$ では

$$
(A-I)x=0
\iff
\begin{pmatrix}
1&1&0\\
1&1&0\\
0&0&3
\end{pmatrix}
\begin{pmatrix}x\\y\\z\end{pmatrix}=0,
$$

すなわち $x+y=0$, $z=0$。よって

$$
E_1=\ker(A-I)=\operatorname{span}\{(1,-1,0)^T\}.
$$

$\lambda=3$ では

$$
(A-3I)x=0
\iff
\begin{pmatrix}
-1&1&0\\
1&-1&0\\
0&0&1
\end{pmatrix}
\begin{pmatrix}x\\y\\z\end{pmatrix}=0,
$$

より $y=x$, $z=0$。したがって

$$
E_3=\operatorname{span}\{(1,1,0)^T\}.
$$

$\lambda=4$ では

$$
(A-4I)x=0
\iff
\begin{pmatrix}
-2&1&0\\
1&-2&0\\
0&0&0
\end{pmatrix}
\begin{pmatrix}x\\y\\z\end{pmatrix}=0.
$$

$-2x+y=0$ と $x-2y=0$ を同時に満たすには $x=y=0$ で、$z$ は自由です。よって

$$
E_4=\operatorname{span}\{(0,0,1)^T\}.
$$

各固有空間から1本ずつ取って列に並べると

$$
P=
\begin{pmatrix}
1&1&0\\
-1&1&0\\
0&0&1
\end{pmatrix},\qquad
D=\operatorname{diag}(1,3,4).
$$

実際

$$
P^{-1}=
\begin{pmatrix}
\frac12&-\frac12&0\\
\frac12&\frac12&0\\
0&0&1
\end{pmatrix}
$$

であり、各列 $p_i$ が $Ap_i=\lambda_i p_i$ を満たすので $AP=PD$。右から $P^{-1}$ を掛けて

$$
\boxed{A=PDP^{-1}}.
$$
<!-- solution-end -->

<a id="ex-lax1-a06"></a>
#### LAX1-A06 対角化から $A^n$ を求める
- Level: A

$$
A=
\begin{pmatrix}2&1\\1&2\end{pmatrix}
$$

について、整数 $n\ge0$ に対する $A^n$ を求めよ。

<!-- solution-start -->
**解答**：特性多項式は

$$
\det(\lambda I-A)
=(\lambda-2)^2-1
=(\lambda-3)(\lambda-1),
$$

なので固有値は $3,1$ です。対応する正規直交固有ベクトルを

$$
q_1=\frac1{\sqrt2}(1,1)^T,\qquad
q_2=\frac1{\sqrt2}(1,-1)^T
$$

と取ります。これらを列に並べて

$$
Q=\frac1{\sqrt2}
\begin{pmatrix}
1&1\\
1&-1
\end{pmatrix}
$$

とすれば $Q^TQ=I$ で、

$$
A=Q
\begin{pmatrix}3&0\\0&1\end{pmatrix}
Q^T.
$$

従って、$Q^TQ=I$ を用いると中間の $Q^TQ$ がすべて消え、

$$
A^n
=Q
\begin{pmatrix}3^n&0\\0&1\end{pmatrix}
Q^T.
$$

実際に掛け戻すと

$$
A^n
=\frac12
\begin{pmatrix}
1&1\\
1&-1
\end{pmatrix}
\begin{pmatrix}
3^n&0\\
0&1
\end{pmatrix}
\begin{pmatrix}
1&1\\
1&-1
\end{pmatrix}
$$

$$
=\frac12
\begin{pmatrix}
3^n&1\\
3^n&-1
\end{pmatrix}
\begin{pmatrix}
1&1\\
1&-1
\end{pmatrix}
=\boxed{
\frac12
\begin{pmatrix}
3^n+1&3^n-1\\
3^n-1&3^n+1
\end{pmatrix}}.
$$

$n=0$ では $I$、$n=1$ では $A$ に戻り、式の検算ができます。
<!-- solution-end -->

<a id="ex-lax1-a07"></a>
#### LAX1-A07 Gram–Schmidt 法と QR 分解
- Level: A

$$
A=
\begin{pmatrix}
1&1&0\\
1&0&1\\
0&1&1
\end{pmatrix}
$$

の列ベクトルに Gram–Schmidt 法を適用し、$A=QR$ を求めよ。ただし $R$ の対角成分は正とする。

<!-- solution-start -->
**解答**：列を

$$
a_1=(1,1,0)^T,\qquad a_2=(1,0,1)^T,\qquad a_3=(0,1,1)^T
$$

とします。

まず

$$
\|a_1\|=\sqrt2,\qquad
q_1=\frac{a_1}{\|a_1\|}=\frac1{\sqrt2}(1,1,0)^T.
$$

次に $a_2$ から $q_1$ 方向を引きます。

$$
q_1^Ta_2=\frac1{\sqrt2},
$$

$$
u_2=a_2-(q_1^Ta_2)q_1
=\begin{pmatrix}1\\0\\1\end{pmatrix}
-\frac1{\sqrt2}\frac1{\sqrt2}
\begin{pmatrix}1\\1\\0\end{pmatrix}
=\begin{pmatrix}\frac12\\-\frac12\\1\end{pmatrix}.
$$

その長さは

$$
\|u_2\|
=\sqrt{\frac14+\frac14+1}
=\frac{\sqrt6}{2},
$$

したがって

$$
q_2=\frac{u_2}{\|u_2\|}
=\frac1{\sqrt6}(1,-1,2)^T.
$$

最後に $a_3$ から $q_1,q_2$ の両成分を引きます。

$$
q_1^Ta_3=\frac1{\sqrt2},\qquad
q_2^Ta_3=\frac{-1+2}{\sqrt6}=\frac1{\sqrt6}.
$$

よって

$$
u_3
=a_3-(q_1^Ta_3)q_1-(q_2^Ta_3)q_2
$$

$$
=\begin{pmatrix}0\\1\\1\end{pmatrix}
-\begin{pmatrix}\frac12\\\frac12\\0\end{pmatrix}
-\begin{pmatrix}\frac16\\-\frac16\\\frac13\end{pmatrix}
=\begin{pmatrix}-\frac23\\\frac23\\\frac23\end{pmatrix}.
$$

したがって

$$
\|u_3\|=\frac2{\sqrt3},\qquad
q_3=\frac1{\sqrt3}(-1,1,1)^T.
$$

以上より

$$
Q=
\begin{pmatrix}
\frac1{\sqrt2}&\frac1{\sqrt6}&-\frac1{\sqrt3}\\
\frac1{\sqrt2}&-\frac1{\sqrt6}&\frac1{\sqrt3}\\
0&\frac2{\sqrt6}&\frac1{\sqrt3}
\end{pmatrix}.
$$

$R=Q^TA$ の成分は $r_{ij}=q_i^Ta_j$ です。上で計算した内積と

$$
q_1^Ta_1=\sqrt2,\qquad
q_2^Ta_2=\frac{\sqrt6}{2},\qquad
q_3^Ta_3=\frac2{\sqrt3}
$$

をまとめると

$$
R=
\begin{pmatrix}
\sqrt2&\frac1{\sqrt2}&\frac1{\sqrt2}\\
0&\frac{\sqrt6}{2}&\frac1{\sqrt6}\\
0&0&\frac2{\sqrt3}
\end{pmatrix}.
$$

従って

$$
\boxed{A=QR}.
$$

検算では、まず $Q^TQ=I$ を確認し、次に $QR$ の第 $j$ 列が $a_j$ に戻ることを確認します。
<!-- solution-end -->

<a id="ex-lax1-a08"></a>
#### LAX1-A08 最小二乗解と直交射影
- Level: A

$$
A=
\begin{pmatrix}
1&0\\
1&1\\
1&2
\end{pmatrix},\qquad
b=
\begin{pmatrix}1\\2\\2\end{pmatrix}
$$

とする。$\|Ax-b\|_2$ を最小にする $\hat x$、射影 $A\hat x$、残差 $r=b-A\hat x$ を求めよ。

<!-- solution-start -->
**解答**：$x=(x_1,x_2)^T$ とすると

$$
Ax-b=
\begin{pmatrix}
x_1-1\\
x_1+x_2-2\\
x_1+2x_2-2
\end{pmatrix}.
$$

従って、平方ノルム

$$
f(x_1,x_2)
=(x_1-1)^2+(x_1+x_2-2)^2+(x_1+2x_2-2)^2
$$

を最小化すればよいです。偏微分すると

$$
\frac{\partial f}{\partial x_1}
=2\{(x_1-1)+(x_1+x_2-2)+(x_1+2x_2-2)\}
=2(3x_1+3x_2-5),
$$

$$
\frac{\partial f}{\partial x_2}
=2(x_1+x_2-2)+4(x_1+2x_2-2)
=2(3x_1+5x_2-6).
$$

両方を0と置くと

$$
3x_1+3x_2=5,\qquad
3x_1+5x_2=6,
$$

すなわち正規方程式

$$
\begin{pmatrix}3&3\\3&5\end{pmatrix}
\begin{pmatrix}x_1\\x_2\end{pmatrix}
=
\begin{pmatrix}5\\6\end{pmatrix}
$$

を得ます。第2式から第1式を引けば

$$
2x_2=1,\qquad x_2=\frac12.
$$

これを $3x_1+3x_2=5$ に代入して

$$
3x_1=5-\frac32=\frac72,\qquad x_1=\frac76.
$$

したがって

$$
\boxed{\hat x=\begin{pmatrix}7/6\\1/2\end{pmatrix}}.
$$

射影は

$$
A\hat x
=
\begin{pmatrix}
7/6\\
7/6+1/2\\
7/6+1
\end{pmatrix}
=
\boxed{\begin{pmatrix}7/6\\5/3\\13/6\end{pmatrix}}.
$$

残差は

$$
r=b-A\hat x
=
\begin{pmatrix}1\\2\\2\end{pmatrix}
-
\begin{pmatrix}7/6\\5/3\\13/6\end{pmatrix}
=
\boxed{\begin{pmatrix}-1/6\\1/3\\-1/6\end{pmatrix}}.
$$

検算すると

$$
A^Tr
=
\begin{pmatrix}
1&1&1\\
0&1&2
\end{pmatrix}
\begin{pmatrix}-1/6\\1/3\\-1/6\end{pmatrix}
=
\begin{pmatrix}0\\0\end{pmatrix},
$$

確かに残差は $\operatorname{Im}A$ に直交しています。また

$$
\|r\|_2^2=\frac1{36}+\frac19+\frac1{36}=\frac16.
$$
<!-- solution-end -->

### Level B：場合分けと複数手法をつなぐ

<a id="ex-lax1-b01"></a>
#### LAX1-B01 パラメータ付き固有値問題
- Level: B

実数 $a$ に対し

$$
A_a=
\begin{pmatrix}
a&1&0\\
1&a&0\\
0&0&2
\end{pmatrix}
$$

とする。

1. 固有値と固有空間を求めよ。
2. $A_a$ が可逆でない $a$ と、そのときの階数を求めよ。
3. すべての $a$ について直交対角化を与え、固有値が重複する $a$ も明示せよ。

<!-- solution-start -->
**解答**：特性多項式は

$$
\det(\lambda I-A_a)
=(\lambda-2)
\det
\begin{pmatrix}
\lambda-a&-1\\
-1&\lambda-a
\end{pmatrix}
$$

$$
=(\lambda-2)\{(\lambda-a)^2-1\}
=(\lambda-2)(\lambda-a-1)(\lambda-a+1).
$$

したがって固有値は

$$
\boxed{a+1,\qquad a-1,\qquad2}.
$$

実際、

$$
A_a\begin{pmatrix}1\\1\\0\end{pmatrix}
=(a+1)\begin{pmatrix}1\\1\\0\end{pmatrix},
$$

$$
A_a\begin{pmatrix}1\\-1\\0\end{pmatrix}
=(a-1)\begin{pmatrix}1\\-1\\0\end{pmatrix},
$$

$$
A_ae_3=2e_3.
$$

固有値が相異なる場合の固有空間はそれぞれ

$$
E_{a+1}=\operatorname{span}\{(1,1,0)^T\},
$$

$$
E_{a-1}=\operatorname{span}\{(1,-1,0)^T\},
$$

$$
E_2=\operatorname{span}\{e_3\}.
$$

重複が起こるのは

$$
a+1=2\iff a=1,\qquad
a-1=2\iff a=3
$$

の2場合です。$a=1$ では固有値2の固有空間が

$$
E_2=\operatorname{span}\{(1,1,0)^T,e_3\},
$$

$a=3$ では

$$
E_2=\operatorname{span}\{(1,-1,0)^T,e_3\}
$$

となります。

可逆性は固有値の積、すなわち行列式から判定できます。

$$
\det A_a=2(a+1)(a-1)=2(a^2-1).
$$

よって可逆でないのは

$$
\boxed{a=\pm1}.
$$

$a=1$ の固有値は $2,0,2$、$a=-1$ の固有値は $0,-2,2$ なので、どちらも0固有値の重複度は1です。したがって

$$
\boxed{\operatorname{rank}A_{1}=\operatorname{rank}A_{-1}=2}.
$$

最後に、互いに直交する単位固有ベクトル

$$
q_1=\frac1{\sqrt2}(1,1,0)^T,\qquad
q_2=\frac1{\sqrt2}(1,-1,0)^T,\qquad
q_3=e_3
$$

を列にもつ

$$
Q=
\begin{pmatrix}
1/\sqrt2&1/\sqrt2&0\\
1/\sqrt2&-1/\sqrt2&0\\
0&0&1
\end{pmatrix}
$$

を取ります。$Q^TQ=I$ であり、各列が上記の固有ベクトルなので、すべての $a$ に対して

$$
\boxed{Q^TA_aQ=\operatorname{diag}(a+1,a-1,2)}.
$$

固有値が重複しても、この同じ $Q$ がそのまま直交対角化を与えます。
<!-- solution-end -->

<a id="ex-lax1-b02"></a>
#### LAX1-B02 直和分解から斜交射影を作る
- Level: B

$\mathbb R^3=U\oplus W$ とし

$$
U=\operatorname{span}\{(1,1,0)^T,(0,1,1)^T\},
$$

$$
W=\operatorname{span}\{(1,0,1)^T\}.
$$

$U$ への $W$ に沿った射影 $P$ の標準基底に関する行列を求めよ。さらに $P^2=P$ を確認し、この射影が直交射影ではないことも確認せよ。

<!-- solution-start -->
**解答**：

$$
u_1=(1,1,0)^T,\qquad u_2=(0,1,1)^T,\qquad w=(1,0,1)^T
$$

を列に並べて

$$
S=(u_1,u_2,w)
=
\begin{pmatrix}
1&0&1\\
1&1&0\\
0&1&1
\end{pmatrix}.
$$

行列式は

$$
\det S
=1\det\begin{pmatrix}1&0\\1&1\end{pmatrix}
+1\det\begin{pmatrix}1&1\\0&1\end{pmatrix}
=1+1=2\neq0,
$$

したがって3本は基底をなし、確かに $\mathbb R^3=U\oplus W$ です。

この基底で $x=\alpha u_1+\beta u_2+\gamma w$ と書けば、$U$ への $W$ に沿った射影は

$$
(\alpha,\beta,\gamma)^T\longmapsto(\alpha,\beta,0)^T
$$

です。従って、この基底での表現行列は

$$
D=\operatorname{diag}(1,1,0),
$$

標準基底では

$$
P=SDS^{-1}
$$

となります。

$S^{-1}$ は、

$$
\begin{cases}
x_1=\alpha+\gamma,\\
x_2=\alpha+\beta,\\
x_3=\beta+\gamma
\end{cases}
$$

を $\alpha,\beta,\gamma$ について解けば

$$
\alpha=\frac{x_1+x_2-x_3}{2},\qquad
\beta=\frac{-x_1+x_2+x_3}{2},\qquad
\gamma=\frac{x_1-x_2+x_3}{2},
$$

なので

$$
S^{-1}=\frac12
\begin{pmatrix}
1&1&-1\\
-1&1&1\\
1&-1&1
\end{pmatrix}.
$$

したがって

$$
SD
=
\begin{pmatrix}
1&0&0\\
1&1&0\\
0&1&0
\end{pmatrix},
$$

$$
P=SDS^{-1}
=\boxed{\frac12
\begin{pmatrix}
1&1&-1\\
0&2&0\\
-1&1&1
\end{pmatrix}}.
$$

$M=\begin{pmatrix}1&1&-1\\0&2&0\\-1&1&1\end{pmatrix}$ と置くと

$$
M^2=
\begin{pmatrix}
2&2&-2\\
0&4&0\\
-2&2&2
\end{pmatrix}=2M.
$$

よって

$$
P^2=\frac14M^2=\frac12M=P.
$$

また

$$
P^T=\frac12
\begin{pmatrix}
1&0&-1\\
1&2&1\\
-1&0&1
\end{pmatrix}\neq P
$$

です。例えば $P_{12}=1/2$ に対し $P_{21}=0$ なので対称ではありません。従ってこの射影は直交射影ではなく、$W$ に沿った斜交射影です。
<!-- solution-end -->

<a id="ex-lax1-b03"></a>
#### LAX1-B03 Householder 変換を構成する
- Level: B

$x=(1,2,2)^T$ を $3e_1=(3,0,0)^T$ へ写す Householder 行列 $H$ を求めよ。さらに $H^TH=I$ と $Hx=3e_1$ を確認せよ。

<!-- solution-start -->
**解答**：まず

$$
\|x\|=\sqrt{1^2+2^2+2^2}=3.
$$

$x$ を $3e_1$ へ反射させるため

$$
v=x-3e_1=(-2,2,2)^T
$$

を取ります。Householder 行列

$$
H=I-2\frac{vv^T}{v^Tv}
$$

は $v$ の定数倍に依存しないので、簡単のため $v=(-1,1,1)^T$ としてよいです。このとき

$$
v^Tv=1+1+1=3,
$$

$$
vv^T=
\begin{pmatrix}
1&-1&-1\\
-1&1&1\\
-1&1&1
\end{pmatrix}.
$$

従って

$$
H
=I-\frac23
\begin{pmatrix}
1&-1&-1\\
-1&1&1\\
-1&1&1
\end{pmatrix}
=\boxed{\frac13
\begin{pmatrix}
1&2&2\\
2&1&-2\\
2&-2&1
\end{pmatrix}}.
$$

直交性を確認します。$P_v=vv^T/(v^Tv)$ と置くと

$$
P_v^2
=\frac{vv^Tvv^T}{(v^Tv)^2}
=\frac{v(v^Tv)v^T}{(v^Tv)^2}
=P_v.
$$

また $P_v^T=P_v$ なので $H^T=H$ であり、

$$
H^TH=H^2=(I-2P_v)^2
=I-4P_v+4P_v^2
=I.
$$

さらに

$$
Hx
=\frac13
\begin{pmatrix}
1&2&2\\
2&1&-2\\
2&-2&1
\end{pmatrix}
\begin{pmatrix}1\\2\\2\end{pmatrix}
$$

$$
=\frac13
\begin{pmatrix}
1+4+4\\
2+2-4\\
2-4+2
\end{pmatrix}
=\boxed{\begin{pmatrix}3\\0\\0\end{pmatrix}}.
$$
<!-- solution-end -->

<a id="ex-lax1-b04"></a>
#### LAX1-B04 2×3 行列の特異値分解
- Level: B

$$
A=
\begin{pmatrix}
1&1&0\\
0&1&1
\end{pmatrix}
$$

の特異値を求め、特異値分解 $A=U\Sigma V^T$ を一つ構成せよ。さらに $\|A\|_2$ を求めよ。

<!-- solution-start -->
**解答**：$A$ は $2\times3$ なので、小さい $2\times2$ 行列 $AA^T$ を対角化します。

$$
AA^T
=
\begin{pmatrix}
1&1&0\\
0&1&1
\end{pmatrix}
\begin{pmatrix}
1&0\\
1&1\\
0&1
\end{pmatrix}
=
\begin{pmatrix}2&1\\1&2\end{pmatrix}.
$$

その特性多項式は

$$
\det(AA^T-\lambda I)
=(2-\lambda)^2-1
=(\lambda-3)(\lambda-1).
$$

従って $AA^T$ の固有値は $3,1$ で、特異値はその正の平方根

$$
\boxed{\sigma_1=\sqrt3,\qquad\sigma_2=1}
$$

です。

$\lambda=3$ に対して $x=y$、$\lambda=1$ に対して $x=-y$ なので、左特異ベクトルを

$$
u_1=\frac1{\sqrt2}(1,1)^T,\qquad
u_2=\frac1{\sqrt2}(-1,1)^T
$$

と取ります。

右特異ベクトルは

$$
v_i=\frac1{\sigma_i}A^Tu_i
$$

から求めます。まず

$$
A^Tu_1
=
\begin{pmatrix}
1&0\\
1&1\\
0&1
\end{pmatrix}
\frac1{\sqrt2}\begin{pmatrix}1\\1\end{pmatrix}
=rac1{\sqrt2}egin{pmatrix}1\\2\\1\end{pmatrix},
$$

したがって

$$
v_1=\frac1{\sqrt3}A^Tu_1
=\frac1{\sqrt6}(1,2,1)^T.
$$

同様に

$$
A^Tu_2
=
\frac1{\sqrt2}egin{pmatrix}-1\\0\\1\end{pmatrix},
$$

$\sigma_2=1$ なので

$$
v_2=\frac1{\sqrt2}(-1,0,1)^T.
$$

残る $v_3$ は $\ker A$ の単位ベクトルに取ります。$Av=0$ は

$$
x+y=0,\qquad y+z=0
$$

なので $(x,y,z)=t(1,-1,1)$。従って

$$
v_3=\frac1{\sqrt3}(1,-1,1)^T.
$$

$v_1,v_2,v_3$ は互いに直交し、いずれも長さ1です。よって

$$
U=(u_1,u_2),\qquad
V=(v_1,v_2,v_3),\qquad
\Sigma=
\begin{pmatrix}
\sqrt3&0&0\\
0&1&0
\end{pmatrix}
$$

とすれば、$Av_1=\sqrt3u_1$, $Av_2=u_2$, $Av_3=0$ から

$$
\boxed{A=U\Sigma V^T}.
$$

作用素2-ノルムは最大特異値なので

$$
\boxed{\|A\|_2=\sqrt3}.
$$
<!-- solution-end -->

<a id="ex-lax1-b05"></a>
#### LAX1-B05 二次形式の直交対角化と球面上の最大・最小
- Level: B

$$
q(x)=x^TAx,
\qquad
A=
\begin{pmatrix}
2&1&0\\
1&2&0\\
0&0&-1
\end{pmatrix}
$$

とする。$A$ を直交対角化し、$q$ の符号型を判定せよ。さらに $\|x\|_2=1$ のもとで $q(x)$ の最大値・最小値と達成点を求めよ。

<!-- solution-start -->
**解答**：上左の $2\times2$ ブロックについて

$$
\det
\begin{pmatrix}
2-\lambda&1\\
1&2-\lambda
\end{pmatrix}
=(2-\lambda)^2-1
=(\lambda-3)(\lambda-1),
$$

第3成分は固有値 $-1$ です。従って $A$ の固有値は

$$
3,\qquad1,\qquad-1.
$$

対応する正規直交固有ベクトルは

$$
q_1=\frac1{\sqrt2}(1,1,0)^T,\qquad
q_2=\frac1{\sqrt2}(1,-1,0)^T,\qquad
q_3=(0,0,1)^T.
$$

これらを列に並べた $Q=(q_1,q_2,q_3)$ は $Q^TQ=I$ を満たし、

$$
\boxed{Q^TAQ=\operatorname{diag}(3,1,-1)}.
$$

正の固有値が2個、負の固有値が1個なので、$q$ は正定値でも負定値でもなく

$$
\boxed{q\text{ は不定値}}
$$

です。

$y=Q^Tx$ と置くと、$Q$ は直交行列なので

$$
\|y\|_2=\|x\|_2=1,\qquad
y_1^2+y_2^2+y_3^2=1.
$$

また

$$
q(x)=x^TAx
=y^T(Q^TAQ)y
=3y_1^2+y_2^2-y_3^2.
$$

最大値については

$$
q(x)\le3(y_1^2+y_2^2+y_3^2)=3.
$$

等号には $y_2=y_3=0$, $y_1=\pm1$ が必要なので

$$
\boxed{\max_{\|x\|=1}q(x)=3},\qquad
\boxed{x=\pm\frac1{\sqrt2}(1,1,0)^T}.
$$

最小値については

$$
q(x)+1
=4y_1^2+2y_2^2\ge0,
$$

よって $q(x)\ge-1$。等号には $y_1=y_2=0$, $y_3=\pm1$ が必要なので

$$
\boxed{\min_{\|x\|=1}q(x)=-1},\qquad
\boxed{x=\pm(0,0,1)^T}.
$$
<!-- solution-end -->

### Level C：院試で差がつく統合計算

<a id="ex-lax1-c01"></a>
#### LAX1-C01 Jordan 構造と行列の冪
- Level: C

$$
A=
\begin{pmatrix}
2&1&0&0\\
0&2&1&0\\
0&0&2&0\\
0&0&0&-1
\end{pmatrix}
$$

について、特性多項式、最小多項式、各固有空間、Jordan 標準形、$n\ge2$ に対する $A^n$ を求め、対角化可能性を判定せよ。

<!-- solution-start -->
**解答**：$A$ は上三角行列なので、対角成分から特性多項式は

$$
\boxed{\chi_A(t)=(t-2)^3(t+1)}.
$$

固有値2に対応する左上 $3\times3$ ブロックを

$$
J=\begin{pmatrix}
2&1&0\\
0&2&1\\
0&0&2
\end{pmatrix}
=2I_3+N,\qquad
N=egin{pmatrix}
0&1&0\\
0&0&1\\
0&0&0
\end{pmatrix}
$$

と書きます。この $N$ について

$$
N^2=
\begin{pmatrix}
0&0&1\\
0&0&0\\
0&0&0
\end{pmatrix}\neq0,\qquad
N^3=0.
$$

従って $J$ の最小多項式は $(t-2)^3$ です。残る1次元ブロックは $(-1)$ なので最小多項式は $t+1$。両者は互いに素だから全体では最小公倍数を取り

$$
\boxed{m_A(t)=(t-2)^3(t+1)}.
$$

次に固有空間を求めます。$\lambda=2$ では

$$
A-2I=
\begin{pmatrix}
0&1&0&0\\
0&0&1&0\\
0&0&0&0\\
0&0&0&-3
\end{pmatrix}.
$$

$(A-2I)x=0$ から $x_2=x_3=x_4=0$、$x_1$ が自由なので

$$
\boxed{E_2=\ker(A-2I)=\operatorname{span}\{e_1\}}.
$$

$\lambda=-1$ では

$$
A+I=
\begin{pmatrix}
3&1&0&0\\
0&3&1&0\\
0&0&3&0\\
0&0&0&0
\end{pmatrix}.
$$

下から解くと $x_3=0$, 次に $x_2=0$, 最後に $x_1=0$ で、$x_4$ が自由です。従って

$$
\boxed{E_{-1}=\operatorname{span}\{e_4\}}.
$$

固有値2の代数的重複度は3ですが、固有空間の次元は1です。従って固有値2には大きさ3の Jordan block が1個あり、この行列自体がすでに

$$
\boxed{J_3(2)\oplus(-1)}
$$

という Jordan 標準形になっています。

次に冪を求めます。$J=2I_3+N$ で $N^3=0$ だから、二項展開は第2次までで止まり、

$$
J^n
=(2I_3+N)^n
=2^nI_3+n2^{n-1}N+\binom n2 2^{n-2}N^2.
$$

各項を書き下すと

$$
J^n=
\begin{pmatrix}
2^n&0&0\\
0&2^n&0\\
0&0&2^n
\end{pmatrix}
+
\begin{pmatrix}
0&n2^{n-1}&0\\
0&0&n2^{n-1}\\
0&0&0
\end{pmatrix}
+
\begin{pmatrix}
0&0&\binom n2 2^{n-2}\\
0&0&0\\
0&0&0
\end{pmatrix}.
$$

従って $n\ge2$ では

$$
\boxed{
A^n=
\begin{pmatrix}
2^n&n2^{n-1}&\binom n2 2^{n-2}&0\\
0&2^n&n2^{n-1}&0\\
0&0&2^n&0\\
0&0&0&(-1)^n
\end{pmatrix}.}
$$

最後に、固有空間の次元の合計は $1+1=2<4$ なので固有ベクトルだけでは基底を作れません。従って

$$
\boxed{A\text{ は対角化不可能}}.
$$

同じことは、最小多項式に $(t-2)^3$ という重根が現れることからも判定できます。
<!-- solution-end -->

<a id="ex-lax1-c02"></a>
#### LAX1-C02 直交固有分解と階数落ち最小二乗
- Level: C

$$
A=
\begin{pmatrix}
1&0&1\\
0&1&1\\
1&1&2
\end{pmatrix},\qquad
b=
\begin{pmatrix}1\\2\\0\end{pmatrix}
$$

とする。

1. $A$ の固有値・正規直交固有基底を求め、特異値と階数を求めよ。
2. $\|Ax-b\|_2$ を最小にする $x$ をすべて求めよ。
3. その中で $\|x\|_2$ が最小の解を求めよ。
4. 最小残差平方を求めよ。

<!-- solution-start -->
**解答**：まず、次の3本を候補として直接作用させます。

$$
v_3=\frac1{\sqrt6}(1,1,2)^T,\qquad
Av_3
=\frac1{\sqrt6}\begin{pmatrix}3\\3\\6\end{pmatrix}
=3v_3,
$$

$$
v_1=\frac1{\sqrt2}(-1,1,0)^T,\qquad
Av_1
=\frac1{\sqrt2}\begin{pmatrix}-1\\1\\0\end{pmatrix}
=v_1,
$$

$$
v_0=\frac1{\sqrt3}(-1,-1,1)^T,\qquad
Av_0
=\frac1{\sqrt3}\begin{pmatrix}0\\0\\0\end{pmatrix}
=0.
$$

それぞれ長さ1で、内積も

$$
v_3^Tv_1=0,\qquad v_3^Tv_0=0,\qquad v_1^Tv_0=0
$$

です。従って $v_3,v_1,v_0$ は正規直交固有基底で、固有値は

$$
\boxed{3,1,0}.
$$

$A$ は実対称行列で固有値がすべて非負なので、特異値は固有値の絶対値と一致し

$$
\boxed{\sigma_1=3,\qquad\sigma_2=1,\qquad\sigma_3=0}.
$$

非零特異値が2個なので

$$
\boxed{\operatorname{rank}A=2}.
$$

次に $b$ をこの正規直交基底で分解します。係数は内積で求まり、

$$
v_3^Tb=\frac{1+2+0}{\sqrt6}=\frac3{\sqrt6},
$$

$$
v_1^Tb=\frac{-1+2}{\sqrt2}=\frac1{\sqrt2},
$$

$$
v_0^Tb=\frac{-1-2+0}{\sqrt3}=-\sqrt3.
$$

したがって

$$
b=\frac3{\sqrt6}v_3+\frac1{\sqrt2}v_1-\sqrt3\,v_0.
$$

任意の $x$ を

$$
x=\alpha v_3+\beta v_1+\gamma v_0
$$

と書くと、固有値を使って

$$
Ax=3\alpha v_3+\beta v_1.
$$

よって残差は

$$
Ax-b
=\left(3\alpha-\frac3{\sqrt6}\right)v_3
+\left(\beta-\frac1{\sqrt2}\right)v_1
+\sqrt3\,v_0.
$$

3本は正規直交しているので

$$
\|Ax-b\|_2^2
=\left(3\alpha-\frac3{\sqrt6}\right)^2
+\left(\beta-\frac1{\sqrt2}\right)^2
+3.
$$

従って最小化には

$$
3\alpha=\frac3{\sqrt6},\qquad
\beta=\frac1{\sqrt2}
$$

とすればよく、$\gamma$ は $Ax$ に現れないため任意です。すなわち

$$
\alpha=\frac1{\sqrt6},\qquad
\beta=\frac1{\sqrt2}.
$$

この2成分を標準座標へ戻すと

$$
\frac1{\sqrt6}v_3+\frac1{\sqrt2}v_1
=\frac16\begin{pmatrix}1\\1\\2\end{pmatrix}
+\frac12\begin{pmatrix}-1\\1\\0\end{pmatrix}
=\begin{pmatrix}-1/3\\2/3\\1/3\end{pmatrix}.
$$

また $\gamma v_0$ は $\ker A$ の任意成分です。パラメータを取り直せば、最小二乗解全体は

$$
\boxed{
x=
\begin{pmatrix}-1/3\\2/3\\1/3\end{pmatrix}
+t
\begin{pmatrix}-1\\-1\\1\end{pmatrix},\qquad t\in\mathbb R.}
$$

最初のベクトルは $v_3,v_1$ の線形結合であり、核方向 $v_0$ に直交しています。したがって Pythagoras より

$$
\left\|x_{\min}+t(-1,-1,1)^T\right\|_2^2
=\|x_{\min}\|_2^2+3t^2,
$$

なのでノルム最小の解は $t=0$、すなわち

$$
\boxed{x_{\min}=(-1/3,2/3,1/3)^T}.
$$

このとき

$$
Ax_{\min}
=
\begin{pmatrix}
-1/3+1/3\\
2/3+1/3\\
-1/3+2/3+2/3
\end{pmatrix}
=
\begin{pmatrix}0\\1\\1\end{pmatrix}.
$$

従って

$$
r=b-Ax_{\min}
=
\begin{pmatrix}1\\2\\0\end{pmatrix}
-
\begin{pmatrix}0\\1\\1\end{pmatrix}
=
\begin{pmatrix}1\\1\\-1\end{pmatrix},
$$

$$
\boxed{\min_x\|Ax-b\|_2^2
=1^2+1^2+(-1)^2=3}.
$$

これは上の直交分解で最後まで消せなかった $-\sqrt3\,v_0$ の平方ノルム $3$ とも一致します。
<!-- solution-end -->

---

## 3. 仕上げチェック

次を紙上で迷わず実行できれば、数学系の院試・編入試験で要求される線形代数の計算コアはかなり安定しています。

- 行基本変形後の pivot 列から rank を読み、自由変数から核の基底を書ける。
- 像の基底には簡約後ではなく元の行列の pivot 列を使える。
- パラメータで割る前に、その係数が0になる場合を分離できる。
- 非標準基底の表現行列を $C^{-1}MB$ の順序で計算できる。
- 行列式で、基本変形による符号・倍率の変化を追跡できる。
- 固有値を得たあと $\ker(A-\lambda I)$ の次元まで確認できる。
- 対角化から $A^n$ を掛け戻せる。
- Gram–Schmidt 法から QR 分解を作れる。
- 最小二乗の残差を $A^Tr=0$ で検算できる。
- 直交射影と斜交射影を区別できる。
- Householder 行列を $I-2vv^T/(v^Tv)$ から構成できる。
- 特異値分解では $A^*A$ と $AA^*$ の小さい方を選べる。
- 二次形式の球面上の最大最小を固有値へ落とせる。
- 重複固有値では幾何学的重複度・最小多項式・Jordan block の大きさを確認できる。
- 階数落ちした最小二乗問題で、解全体と $\|x\|_2$ が最小の解を区別できる。
