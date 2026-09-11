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
**解答**：行基本変形すると

$$
A\sim
\begin{pmatrix}
1&2&0&0\\
0&0&1&0\\
0&0&0&1
\end{pmatrix}.
$$

pivot 列は第1, 3, 4列なので

$$
\boxed{\operatorname{rank}A=3}.
$$

$Ax=0$ では $x_2=t$ が自由変数で

$$
(x_1,x_2,x_3,x_4)=t(-2,1,0,0).
$$

よって

$$
\boxed{\ker T=\operatorname{span}\{(-2,1,0,0)^T\}}.
$$

像の基底は、簡約後ではなく**元の行列の pivot 列**から取り

$$
\boxed{
\operatorname{Im}T=
\operatorname{span}\left\{
\begin{pmatrix}1\\2\\-1\end{pmatrix},
\begin{pmatrix}-1\\1\\2\end{pmatrix},
\begin{pmatrix}1\\5\\-1\end{pmatrix}
\right\}.}
$$

rank-nullity の検算は $3+1=4$ です。
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
**解答**：係数行列を $A_a$ とすると

$$
\det A_a=a(a-2).
$$

従って $a\neq0,2$ では一意解で、消去すると

$$
\boxed{(x,y,z)=\left(1,-\frac1{a-2},\frac1{a-2}\right)}.
$$

$a=0$ では拡大係数行列が

$$
\left(
\begin{array}{ccc|c}
1&0&2&0\\
0&1&-1&1\\
0&0&0&0
\end{array}
\right)
$$

まで簡約できるため

$$
\boxed{(x,y,z)=(-2t,1+t,t),\quad t\in\mathbb R}.
$$

$a=2$ では $(0\ 0\ 0\mid1)$ が現れ不整合です。よって

$$
\boxed{
\begin{cases}
a\neq0,2 &: \text{一意解},\\
a=0 &: \text{無数の解},\\
a=2 &: \text{解なし}.
\end{cases}}
$$

パラメータ問題では、$a$ や $a-2$ で割る前に零の場合を分離します。
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
**解答**：基底ベクトルを列に並べて

$$
B=
\begin{pmatrix}1&1&0\\1&0&1\\0&1&1\end{pmatrix},\qquad
C=
\begin{pmatrix}1&1&1\\0&1&1\\0&0&1\end{pmatrix}.
$$

したがって

$$
[T]_{C\leftarrow B}=C^{-1}MB.
$$

$$
MB=
\begin{pmatrix}2&1&1\\1&1&2\\1&2&1\end{pmatrix},\qquad
C^{-1}=
\begin{pmatrix}1&-1&0\\0&1&-1\\0&0&1\end{pmatrix}
$$

より

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
**解答**：

$$
R_4\leftarrow R_4-R_3,\quad
R_3\leftarrow R_3-R_2,\quad
R_2\leftarrow R_2-R_1
$$

により

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

さらに差を取って上三角化すると対角成分がすべて1になります。これらは他の行の倍を加える操作なので行列式は変わりません。従って

$$
\boxed{D=1}.
$$

行列式は「展開する前に0を作れるか」を確認するのが定石です。
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
**解答**：

$$
\det(\lambda I-A)
=(\lambda-4)((\lambda-2)^2-1)
=(\lambda-1)(\lambda-3)(\lambda-4).
$$

固有値と対応する固有ベクトルとして

$$
1:(1,-1,0)^T,\qquad
3:(1,1,0)^T,\qquad
4:(0,0,1)^T
$$

を取れます。従って

$$
P=
\begin{pmatrix}
1&1&0\\-1&1&0\\0&0&1
\end{pmatrix},\qquad
D=\operatorname{diag}(1,3,4)
$$

とすれば

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
**解答**：固有値は $3,1$ で、正規直交固有ベクトルを

$$
q_1=\frac1{\sqrt2}(1,1)^T,\qquad
q_2=\frac1{\sqrt2}(1,-1)^T
$$

と取れます。従って

$$
A=Q\operatorname{diag}(3,1)Q^T
$$

から

$$
\boxed{
A^n=
\frac12
\begin{pmatrix}
3^n+1&3^n-1\\
3^n-1&3^n+1
\end{pmatrix}.}
$$

$n=0$ で $I$、$n=1$ で $A$ に戻ることを検算します。
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
**解答**：列を $a_1,a_2,a_3$ とすると

$$
q_1=\frac1{\sqrt2}(1,1,0)^T.
$$

$$
u_2=a_2-(q_1^Ta_2)q_1
=\left(\frac12,-\frac12,1\right)^T
$$

なので

$$
q_2=\frac1{\sqrt6}(1,-1,2)^T.
$$

さらに $a_3$ から $q_1,q_2$ 成分を除くと

$$
q_3=\frac1{\sqrt3}(-1,1,1)^T.
$$

従って

$$
Q=
\begin{pmatrix}
\frac1{\sqrt2}&\frac1{\sqrt6}&-\frac1{\sqrt3}\\
\frac1{\sqrt2}&-\frac1{\sqrt6}&\frac1{\sqrt3}\\
0&\frac2{\sqrt6}&\frac1{\sqrt3}
\end{pmatrix},
$$

$$
R=Q^TA=
\begin{pmatrix}
\sqrt2&\frac1{\sqrt2}&\frac1{\sqrt2}\\
0&\frac{\sqrt6}{2}&\frac1{\sqrt6}\\
0&0&\frac2{\sqrt3}
\end{pmatrix}.
$$

よって $\boxed{A=QR}$。検算は $Q^TQ=I$ と $QR=A$ です。
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
**解答**：正規方程式

$$
A^TA\hat x=A^Tb
$$

は

$$
\begin{pmatrix}3&3\\3&5\end{pmatrix}\hat x
=\begin{pmatrix}5\\6\end{pmatrix}.
$$

従って

$$
\boxed{\hat x=(7/6,1/2)^T}.
$$

$$
\boxed{A\hat x=(7/6,5/3,13/6)^T},
$$

$$
\boxed{r=(-1/6,1/3,-1/6)^T}.
$$

実際 $A^Tr=0$ で、残差は列空間に直交しています。また $\|r\|_2^2=1/6$ です。
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
**解答**：

$$
(1,1,0)^T,\quad(1,-1,0)^T,\quad e_3
$$

はそれぞれ固有値

$$
\boxed{a+1,\quad a-1,\quad2}
$$

の固有ベクトルです。固有値が一致するときは対応する固有方向の和がその固有空間になります。

$$
\det A_a=2(a^2-1)
$$

なので可逆でないのは

$$
\boxed{a=\pm1},
$$

どちらも階数は2です。

正規直交化した

$$
q_1=\frac1{\sqrt2}(1,1,0)^T,\quad
q_2=\frac1{\sqrt2}(1,-1,0)^T,\quad
q_3=e_3
$$

を列にもつ $Q$ なら、全ての $a$ で

$$
\boxed{Q^TA_aQ=\operatorname{diag}(a+1,a-1,2)}.
$$

固有値が重複するのは $a=1$ と $a=3$ です。
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
**解答**：基底ベクトルを並べて

$$
S=
\begin{pmatrix}
1&0&1\\
1&1&0\\
0&1&1
\end{pmatrix}.
$$

$\det S=2\neq0$ なので確かに直和です。この基底では射影は

$$
D=\operatorname{diag}(1,1,0)
$$

なので

$$
P=SDS^{-1}.
$$

計算すると

$$
\boxed{
P=
\frac12
\begin{pmatrix}
1&1&-1\\
0&2&0\\
-1&1&1
\end{pmatrix}.}
$$

直接掛けて $P^2=P$、また $Pu=u$ $(u\in U)$、$Pw=0$ $(w\in W)$ を確認できます。一方

$$
P^T\neq P
$$

なので直交射影ではありません。射影だからといって対称行列になるとは限りません。
<!-- solution-end -->

<a id="ex-lax1-b03"></a>
#### LAX1-B03 Householder 変換を構成する
- Level: B

$x=(1,2,2)^T$ を $3e_1=(3,0,0)^T$ へ写す Householder 行列 $H$ を求めよ。さらに $H^TH=I$ と $Hx=3e_1$ を確認せよ。

<!-- solution-start -->
**解答**：$\|x\|=3$ なので

$$
v=x-3e_1=(-2,2,2)^T.
$$

定数倍を落として $v=(-1,1,1)^T$ としてよく、

$$
H=I-2\frac{vv^T}{v^Tv}.
$$

$v^Tv=3$ より

$$
\boxed{
H=
\frac13
\begin{pmatrix}
1&2&2\\
2&1&-2\\
2&-2&1
\end{pmatrix}.}
$$

$H^T=H$ かつ $H^2=I$ なので $H^TH=I$。また直接計算して

$$
\boxed{Hx=(3,0,0)^T}.
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
**解答**：小さい方の

$$
AA^T=
\begin{pmatrix}2&1\\1&2\end{pmatrix}
$$

を対角化します。固有値は $3,1$ なので

$$
\boxed{\sigma_1=\sqrt3,\qquad\sigma_2=1}.
$$

左特異ベクトルを

$$
u_1=\frac1{\sqrt2}(1,1)^T,\qquad
u_2=\frac1{\sqrt2}(-1,1)^T
$$

と取ります。$Av_i=\sigma_i u_i$ を満たす右特異ベクトルとして

$$
v_1=\frac1{\sqrt6}(1,2,1)^T,\qquad
v_2=\frac1{\sqrt2}(-1,0,1)^T
$$

を取れます。さらに

$$
v_3=\frac1{\sqrt3}(1,-1,1)^T
$$

は核の単位ベクトルです。従って

$$
U=(u_1,u_2),\quad
V=(v_1,v_2,v_3),\quad
\Sigma=
\begin{pmatrix}\sqrt3&0&0\\0&1&0\end{pmatrix}
$$

として

$$
\boxed{A=U\Sigma V^T}.
$$

最大特異値から

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
**解答**：固有値と正規直交固有ベクトルは

$$
3:\frac1{\sqrt2}(1,1,0)^T,\qquad
1:\frac1{\sqrt2}(1,-1,0)^T,\qquad
-1:(0,0,1)^T.
$$

これらを列にもつ $Q$ に対して

$$
\boxed{Q^TAQ=\operatorname{diag}(3,1,-1)}.
$$

正の固有値2個、負の固有値1個なので $q$ は不定値です。

$y=Q^Tx$ と置けば $\|y\|=1$ かつ

$$
q(x)=3y_1^2+y_2^2-y_3^2.
$$

従って

$$
\boxed{\max q=3},\qquad
x=\pm\frac1{\sqrt2}(1,1,0)^T,
$$

$$
\boxed{\min q=-1},\qquad
x=\pm(0,0,1)^T.
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
**解答**：上三角行列なので

$$
\chi_A(t)=(t-2)^3(t+1).
$$

固有値2の最初の3成分について $N=A-2I$ とすれば

$$
N^2\neq0,\qquad N^3=0.
$$

従って

$$
\boxed{m_A(t)=(t-2)^3(t+1)}.
$$

$$
\ker(A-2I)=\operatorname{span}\{e_1\},\qquad
\ker(A+I)=\operatorname{span}\{e_4\}.
$$

固有値2の代数的重複度3に対し固有空間次元は1なので、大きさ3の Jordan block が1個です。この行列自体が

$$
\boxed{J_3(2)\oplus(-1)}
$$

になっています。

$J_3(2)=2I+N$、$N^3=0$ なので

$$
(2I+N)^n
=2^nI+n2^{n-1}N+\binom n2 2^{n-2}N^2.
$$

従って $n\ge2$ で

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

最小多項式に重根があるため

$$
\boxed{A\text{ は対角化不可能}}.
$$
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
**解答**：次の3本は正規直交固有ベクトルです。

$$
v_3=\frac1{\sqrt6}(1,1,2)^T,\qquad Av_3=3v_3,
$$

$$
v_1=\frac1{\sqrt2}(-1,1,0)^T,\qquad Av_1=v_1,
$$

$$
v_0=\frac1{\sqrt3}(-1,-1,1)^T,\qquad Av_0=0.
$$

従って固有値は $3,1,0$。$A$ は対称かつ半正定値なので特異値も

$$
\boxed{3,1,0},\qquad
\boxed{\operatorname{rank}A=2}.
$$

$b$ をこの基底で分解すると

$$
b=\frac3{\sqrt6}v_3+\frac1{\sqrt2}v_1-\sqrt3\,v_0.
$$

$x=\alpha v_3+\beta v_1+\gamma v_0$ と書けば

$$
Ax=3\alpha v_3+\beta v_1.
$$

従って残差を最小にするには

$$
3\alpha=\frac3{\sqrt6},\qquad
\beta=\frac1{\sqrt2}
$$

とすればよく、$\gamma$ は任意です。標準座標へ戻すと

$$
\boxed{
x=
\begin{pmatrix}-1/3\\2/3\\1/3\end{pmatrix}
+t
\begin{pmatrix}-1\\-1\\1\end{pmatrix},\qquad t\in\mathbb R.}
$$

最初のベクトルは $\ker A$ に直交しているため、この中で $\|x\|_2$ が最小の解は

$$
\boxed{x_{\min}=(-1/3,2/3,1/3)^T}.
$$

このとき

$$
Ax_{\min}=(0,1,1)^T,\qquad
r=b-Ax_{\min}=(1,1,-1)^T.
$$

従って

$$
\boxed{\min_x\|Ax-b\|_2^2=3}.
$$

直交固有分解を使うと、階数落ちした正規方程式を無理に逆行列で解かずに済みます。
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
