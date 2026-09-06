# LA6 標準線形代数 VI：スペクトル・二次形式・polar decomposition・特異値分解（Singular Value Decomposition; SVD）

ここまでで、一般作用素のJordan構造と、normal operatorのunitary対角化を扱いました。この章では既存の [実対称スペクトル定理・PSD](../F0_00F1_固有空間_スペクトル定理_PSD/index.md) と [特異値分解（SVD）](../F0_00F2_SVD_特異値_作用素ノルム/index.md) を再利用し、二次形式・polar decomposition・複素特異値分解（SVD）を一つの線にまとめます。

---

## 1. Hermitian二次形式

<a id="def-la6-hermitian-quadratic-form"></a>
<!-- formal-statement-start -->
> **定義（Hermitian二次形式）**  
> 有限次元複素内積空間 $V$ とHermitian作用素 $A$ に対し
$$
q_A(x)=\langle x,Ax\rangle
$$
> を $A$ が定めるHermitian二次形式という。
<!-- formal-statement-end -->

Hermitian性から
$$
\begin{aligned}
\overline{q_A(x)}
&=\overline{\langle x,Ax\rangle}\\
&=\langle Ax,x\rangle\\
&=\langle x,A^*x\rangle\\
&=\langle x,Ax\rangle
=q_A(x),
\end{aligned}
$$
したがって $q_A(x)$ は実数です。

<!-- definition-example-start: def-la6-hermitian-quadratic-form -->
**定義の確認**：
$$
A=\begin{pmatrix}2&0\\0&-1\end{pmatrix}
$$
なら $A^*=A$ なのでHermitianです。$x=(x_1,x_2)^T$ に対し
$$
Ax=(2x_1,-x_2)^T
$$
だから
$$
\begin{aligned}
q_A(x)
&=x^*Ax\\
&=\overline{x_1}(2x_1)+\overline{x_2}(-x_2)\\
&=2|x_1|^2-|x_2|^2.
\end{aligned}
$$
例えば $x=e_1$ では $q_A(x)=2>0$、$x=e_2$ では $q_A(x)=-1<0$ なので、正の方向と負の方向が混在する不定値二次形式です。
<!-- definition-example-end -->

[複素normal operatorのスペクトル定理](../LA5/index.md#thm-la5-normal-spectral)によりHermitian作用素はunitary対角化できるので、ある正規直交基底で
$$
A=\operatorname{diag}(\lambda_1,\dots,\lambda_n),
\qquad \lambda_j\in\mathbb R.
$$
従って
$$
q_A(x)=\sum_{j=1}^n\lambda_j|x_j|^2.
$$
二次形式の幾何は固有値の符号へ還元されます。

---

## 2. similarity と congruence は別物

線形作用素 $T$ の基底変換では
$$
A\mapsto S^{-1}AS
$$
というsimilarityが現れます。これは「同じ作用素を別の基底で見る」変換です。

一方、二次形式では変数を $x=Sy$ と置くので
$$
\begin{aligned}
q_A(Sy)
&=(Sy)^*A(Sy)\\
&=y^*S^*ASy.
\end{aligned}
$$
従って二次形式の係数行列は $S^{-1}AS$ ではなく $S^*AS$ と変わります。

<a id="def-la6-congruence"></a>
<!-- formal-statement-start -->
> **定義（congruence）**  
> Hermitian行列 $A,B$ が、ある可逆行列 $S$ によって
$$
B=S^*AS
$$
> と表されるとき、$A$ と $B$ はcongruentであるという。
<!-- formal-statement-end -->

<!-- definition-example-start: def-la6-congruence -->
**定義の確認**：
$$
A=I_2,
\qquad
S=\operatorname{diag}(2,1)
$$
とします。similarityでは
$$
S^{-1}AS=S^{-1}S=I_2
$$
なので固有値は $1,1$ のままです。一方congruenceでは
$$
S^*AS
=S^*S
=\operatorname{diag}(4,1).
$$
固有値は $1,1$ から $4,1$ へ変わりました。したがってcongruenceは固有値そのものを保存しません。

しかし両方とも
$$
q(x)>0\qquad(x\ne0)
$$
で、正方向が2本、負方向・零方向が0本という性質は同じです。これが次の慣性法則で保存される量です。
<!-- definition-example-end -->

---

## 3. Sylvesterの慣性法則

Hermitian行列 $A$ はunitary対角化により
$$
A=Q\operatorname{diag}(\lambda_1,\dots,\lambda_n)Q^*
$$
と書けます。正の固有値を $\lambda_1,\dots,\lambda_p$、負の固有値を $\lambda_{p+1},\dots,\lambda_{p+q}$、残りを0とします。

対角行列
$$
D=
\operatorname{diag}
\left(
\lambda_1^{-1/2},\dots,\lambda_p^{-1/2},
|\lambda_{p+1}|^{-1/2},\dots,|\lambda_{p+q}|^{-1/2},
1,\dots,1
\right)
$$
を使うと
$$
D^*\operatorname{diag}(\lambda_1,\dots,\lambda_n)D
=\operatorname{diag}(I_p,-I_q,0_r).
$$
従って $S=QD$ のような可逆変換を使えば、任意のHermitian二次形式はこの標準形へcongruenceで移せます。

<a id="thm-la6-inertia"></a>
<!-- formal-statement-start -->
> **定理（Sylvesterの慣性法則）**  
> Hermitian二次形式をcongruenceで
$$
\operatorname{diag}(I_p,-I_q,0_r)
$$
> の形へ変形したとき、三つ組 $(p,q,r)$ は変換の選び方によらず一意である。この $(p,q,r)$ を形式の慣性という。
<!-- formal-statement-end -->

<!-- proof-start -->
### 証明

まず $r$ の一意性を示します。$B=S^*AS$、$S$ 可逆なら
$$
Bx=0
\iff S^*ASx=0.
$$
$S^*$ は可逆なので
$$
ASx=0.
$$
従って写像
$$
x\mapsto Sx
$$
は $\ker B$ から $\ker A$ への線形同型です。よって
$$
\dim\ker B=\dim\ker A.
$$
従って零方向の個数 $r$ はcongruenceで不変です。

次に $p$ の一意性を示します。標準形
$$
q(x)
=|x_1|^2+\cdots+|x_p|^2
-|x_{p+1}|^2-\cdots-|x_{p+q}|^2
$$
を考えます。部分空間
$$
P=\operatorname{span}(e_1,\dots,e_p)
$$
では、$x\ne0$ なら
$$
q(x)=|x_1|^2+\cdots+|x_p|^2>0.
$$
従って「$q$ が正定値になる部分空間の最大次元」は少なくとも $p$ です。

逆に、$L$ を任意の $(p+1)$ 次元部分空間とします。負・零方向からなる部分空間を
$$
N_0=\operatorname{span}(e_{p+1},\dots,e_n)
$$
と置くと
$$
\dim N_0=n-p.
$$
従って
$$
\dim L+\dim N_0=(p+1)+(n-p)=n+1>n.
$$
部分空間の次元公式
$$
\dim(L+N_0)=\dim L+\dim N_0-\dim(L\cap N_0)
$$
と $\dim(L+N_0)\le n$ から
$$
\dim(L\cap N_0)\ge1.
$$
よって非零な $x\in L\cap N_0$ が存在します。この $x$ は正方向成分を持たないので
$$
q(x)\le0.
$$
従って $L$ 上で $q$ は正定値ではありません。つまり正定値部分空間の次元は $p$ を超えられません。

以上から
$$
p=\max\{\dim L:q|_L\text{ が正定値}\}
$$
であり、これは座標表示ではなく二次形式そのものから決まる量です。従って $p$ は一意です。

同じ議論を $-q$ に適用すれば
$$
q=\max\{\dim L:q|_L\text{ が負定値}\}
$$
も形式そのものから一意に決まります。したがって $(p,q,r)$ は一意です。$\square$
<!-- proof-end -->

この定理により、「座標をどう選んでも正方向・負方向・零方向の本数は変わらない」と分かります。

---

## 4. Hermitian PSD作用素の平方根

Hermitian positive semidefinite（PSD）作用素 $A$ は
$$
\langle x,Ax\rangle\ge0
\qquad(x\in V)
$$
を満たすHermitian作用素です。スペクトル定理で対角化すると、これは全ての固有値が非負であることと同値です。

<a id="thm-la6-psd-square-root"></a>
<!-- formal-statement-start -->
> **定理（Hermitian PSD平方根定理）**  
> 有限次元複素内積空間上のHermitian PSD作用素 $A$ に対し、Hermitian PSD作用素 $B$ で
$$
B^2=A
$$
> を満たすものが一意に存在する。これを
$$
A^{1/2}
$$
> と書く。
<!-- formal-statement-end -->

<!-- proof-start -->
### 証明

まず存在を示します。[複素normal operatorのスペクトル定理](../LA5/index.md#thm-la5-normal-spectral)により、あるunitary行列 $Q$ を用いて
$$
A=Q\Lambda Q^*,
\qquad
\Lambda=\operatorname{diag}(\lambda_1,\dots,\lambda_n),
\qquad
\lambda_i\ge0
$$
と書けます。そこで
$$
\Lambda^{1/2}
=\operatorname{diag}(\sqrt{\lambda_1},\dots,\sqrt{\lambda_n})
$$
とし
$$
B=Q\Lambda^{1/2}Q^*
$$
と置きます。$\Lambda^{1/2}$ は実非負対角行列なのでHermitian PSDであり、unitary相似後の $B$ もHermitian PSDです。また
$$
\begin{aligned}
B^2
&=Q\Lambda^{1/2}Q^*Q\Lambda^{1/2}Q^*\\
&=Q\Lambda Q^*\\
&=A.
\end{aligned}
$$
よって存在します。

次に一意性を示します。Hermitian PSD作用素 $C$ が
$$
C^2=A
$$
を満たすとします。まず $C$ と $A$ は可換です。実際
$$
CA=C(C^2)=C^3=(C^2)C=AC.
$$

$A$ の固有値 $\lambda$ に対する固有空間を
$$
E_\lambda=\ker(A-\lambda I)
$$
とします。$x\in E_\lambda$ なら $Ax=\lambda x$ なので
$$
A(Cx)=C(Ax)=C(\lambda x)=\lambda Cx.
$$
従って
$$
Cx\in E_\lambda.
$$
つまり $C$ は各 $A$ の固有空間を保ちます。

そこで一つの $E_\lambda$ 上に制限して考えます。ここでは
$$
A=\lambda I
$$
なので
$$
C^2=\lambda I.
$$
また $C$ はHermitian PSDなので、[スペクトル定理](../F0_00F1_固有空間_スペクトル定理_PSD/index.md#thm-real-symmetric-spectral)により $E_\lambda$ の正規直交基底で対角化でき、固有値を $\mu$ とすれば
$$
\mu\ge0.
$$
$C^2=\lambda I$ から固有ベクトル $v$ に対して
$$
\mu^2v=C^2v=\lambda v,
$$
従って
$$
\mu^2=\lambda.
$$
$\mu\ge0$ なので
$$
\mu=\sqrt\lambda
$$
しかありません。従って $C$ は $E_\lambda$ 上で
$$
C=\sqrt\lambda I
$$
です。

$A$ の固有空間は全空間を直交直和に分解するので、全ての固有空間上で $C$ の作用は一意に決まり、先ほど構成した
$$
B=Q\Lambda^{1/2}Q^*
$$
と一致します。よってPSD平方根は一意です。$\square$
<!-- proof-end -->

一般の複素行列 $A$ に対して
$$
A^*A
$$
はHermitian PSDです。Hermitian性は
$$
(A^*A)^*=A^*A,
$$
PSD性は
$$
\langle x,A^*Ax\rangle
=\langle Ax,Ax\rangle
=\|Ax\|^2\ge0
$$
から分かります。そこで
$$
|A|=(A^*A)^{1/2}
$$
を行列の「絶対値」とみなせます。

---

## 5. polar decomposition

実数 $z$ を
$$
z=(\text{符号})\times |z|
$$
と分け、複素数 $z$ を
$$
z=e^{i\theta}|z|
$$
と分けるのと同様に、行列も「長さを変えない部分」と「非負の伸縮部分」へ分けられます。

<a id="thm-la6-polar"></a>
<!-- formal-statement-start -->
> **定理（polar decomposition）**  
> 任意の複素正方行列 $A\in\mathbb C^{n\times n}$ に対し、unitary行列 $U$ とHermitian PSD行列
$$
P=(A^*A)^{1/2}
$$
> が存在して
$$
A=UP
$$
> と書ける。$A$ が可逆なら $U$ は一意で
$$
U=AP^{-1}.
$$
<!-- formal-statement-end -->

<!-- proof-start -->
### 証明

まず
$$
P=(A^*A)^{1/2}
$$
と置きます。$P$ はHermitianなので $P^*=P$、かつ $P^2=A^*A$ です。任意の $x$ に対して
$$
\begin{aligned}
\|Px\|^2
&=\langle Px,Px\rangle\\
&=\langle x,P^*Px\rangle\\
&=\langle x,P^2x\rangle\\
&=\langle x,A^*Ax\rangle\\
&=\langle Ax,Ax\rangle\\
&=\|Ax\|^2.
\end{aligned}
$$
従って
$$
Px=0\iff Ax=0,
$$
すなわち
$$
\ker P=\ker A.
$$

$\operatorname{Im}P$ 上で写像 $U_0$ を
$$
U_0(Px)=Ax
$$
と定めます。まずwell-definedであることを確認します。$Px=Py$ なら
$$
P(x-y)=0.
$$
従って $x-y\in\ker P=\ker A$ なので
$$
Ax=Ay.
$$
よって代表 $x$ の選び方によらず $U_0(Px)$ が定まります。

次に $U_0$ は線形です。$a,b\in\mathbb C$ に対して
$$
\begin{aligned}
U_0(aPx+bPy)
&=U_0(P(ax+by))\\
&=A(ax+by)\\
&=aAx+bAy\\
&=aU_0(Px)+bU_0(Py).
\end{aligned}
$$
さらに先ほどの長さの等式から
$$
\|U_0(Px)\|
=\|Ax\|
=\|Px\|,
$$
なので $U_0$ は等長写像です。

像も確認します。任意の $Ax\in\operatorname{Im}A$ は
$$
Ax=U_0(Px)
$$
と書けるので
$$
\operatorname{Im}U_0=\operatorname{Im}A.
$$
従って
$$
U_0:\operatorname{Im}P\to\operatorname{Im}A
$$
は全射な等長同型です。

次に全空間へ延長します。rank-nullity theoremと $\ker P=\ker A$ から
$$
\dim\operatorname{Im}P
=n-\dim\ker P
=n-\dim\ker A
=\dim\operatorname{Im}A.
$$
従って直交補の次元も等しく
$$
\dim(\operatorname{Im}P)^\perp
=\dim(\operatorname{Im}A)^\perp.
$$
$\operatorname{Im}P$ の正規直交基底 $p_1,\dots,p_r$ を取ると、等長性から
$$
U_0p_1,\dots,U_0p_r
$$
は $\operatorname{Im}A$ の正規直交基底です。さらに
$$
p_{r+1},\dots,p_n
$$
を $(\operatorname{Im}P)^\perp$ の正規直交基底、
$$
a_{r+1},\dots,a_n
$$
を $(\operatorname{Im}A)^\perp$ の正規直交基底とします。

そこで
$$
Up_i=U_0p_i\quad(i\le r),
$$
$$
Up_i=a_i\quad(i>r)
$$
と定めます。正規直交基底を正規直交基底へ送る線形写像なので $U$ はunitaryです。また $Px\in\operatorname{Im}P$ では $U$ は $U_0$ と一致するため
$$
UPx=U_0(Px)=Ax
$$
が全ての $x$ で成り立ちます。よって
$$
A=UP.
$$

最後に $A$ が可逆な場合を考えます。このとき
$$
\ker A=\{0\}
$$
なので $\ker P=\{0\}$。有限次元正方行列 $P$ は可逆です。従って
$$
A=UP
$$
の右から $P^{-1}$ を掛けて
$$
U=AP^{-1}.
$$
よって $U$ はこの式で一意に決まります。$\square$
<!-- proof-end -->

$A$ が特異な場合、$\operatorname{Im}P$ の直交補上での $U$ の選び方には自由度があります。これが「存在するが一般には一意でない」理由です。

幾何的には

1. $P$ が主軸方向へ非負に伸縮する。
2. $U$ が長さを変えず回転・位相変換する。

という順序です。

---

## 6. 複素特異値分解（SVD）

実行列版の特異値分解は [F0-00F2](../F0_00F2_SVD_特異値_作用素ノルム/index.md#thm-f0-00f2-svd) で証明済みです。複素数上では転置を共役転置へ変えます。ただし、正規直交性を作る核心計算はここでも省略せず確認します。

<a id="thm-la6-complex-svd"></a>
<!-- formal-statement-start -->
> **定理（複素特異値分解）**  
> 任意の複素行列 $A\in\mathbb C^{m\times n}$ に対し、unitary行列 $U\in\mathbb C^{m\times m}$、$V\in\mathbb C^{n\times n}$ と、非負実数を対角に持つ $m\times n$ 行列 $\Sigma$ が存在して
$$
A=U\Sigma V^*
$$
> と書ける。$\Sigma$ の正の対角成分は $A^*A$ の正の固有値の平方根である。
<!-- formal-statement-end -->

<!-- proof-start -->
### 証明

まず $A^*A$ はHermitian PSDです。従って[複素normal operatorのスペクトル定理](../LA5/index.md#thm-la5-normal-spectral)により、$\mathbb C^n$ の正規直交基底
$$
v_1,\dots,v_n
$$
を $A^*A$ の固有ベクトルとして取れます。固有値を
$$
A^*Av_i=\lambda_i v_i,
\qquad
\lambda_i\ge0
$$
とします。正の固有値を持つものを先に並べ
$$
\lambda_1,\dots,\lambda_r>0,
\qquad
\lambda_{r+1}=\cdots=\lambda_n=0
$$
とします。

$i=1,\dots,r$ に対して
$$
\sigma_i=\sqrt{\lambda_i}>0,
\qquad
u_i=\frac{Av_i}{\sigma_i}
$$
と定めます。まず $u_i$ の長さを計算します。
$$
\begin{aligned}
\|u_i\|^2
&=\frac{1}{\sigma_i^2}\langle Av_i,Av_i\rangle\\
&=\frac{1}{\sigma_i^2}\langle v_i,A^*Av_i\rangle\\
&=\frac{1}{\lambda_i}\langle v_i,\lambda_i v_i\rangle\\
&=\langle v_i,v_i\rangle\\
&=1.
\end{aligned}
$$

次に $i\ne j$ について直交性を確認します。
$$
\begin{aligned}
\langle u_i,u_j\rangle
&=\frac{1}{\sigma_i\sigma_j}\langle Av_i,Av_j\rangle\\
&=\frac{1}{\sigma_i\sigma_j}\langle v_i,A^*Av_j\rangle\\
&=\frac{\lambda_j}{\sigma_i\sigma_j}\langle v_i,v_j\rangle\\
&=0,
\end{aligned}
$$
なぜなら $v_i,v_j$ は正規直交だからです。従って
$$
u_1,\dots,u_r
$$
は $\mathbb C^m$ の正規直交系です。

これを正規直交基底
$$
u_1,\dots,u_r,u_{r+1},\dots,u_m
$$
へ延長します。$U$ をこれら $u_i$ を列に持つ $m\times m$ unitary行列、$V$ を $v_1,\dots,v_n$ を列に持つ $n\times n$ unitary行列とします。

正の固有値に対しては定義から
$$
Av_i=\sigma_i u_i
\qquad(i\le r).
$$
零固有値に対しては
$$
0=\lambda_i
=\langle v_i,A^*Av_i\rangle
=\langle Av_i,Av_i\rangle
=\|Av_i\|^2
$$
なので
$$
Av_i=0
\qquad(i>r).
$$

そこで $m\times n$ 行列 $\Sigma$ を
$$
\Sigma_{ii}=\sigma_i\quad(i=1,\dots,r),
$$
その他の成分を0として定めます。各標準基底 $e_i$ に対して
$$
AVe_i=Av_i,
$$
一方
$$
U\Sigma e_i=
\begin{cases}
\sigma_i u_i,&i\le r,\\
0,&i>r.
\end{cases}
$$
なので全ての列について一致し
$$
AV=U\Sigma.
$$
右から $V^*$ を掛けると
$$
A=U\Sigma V^*.
$$
これで複素特異値分解が得られました。$\Sigma$ の正の対角成分は定義通り
$$
\sigma_i=\sqrt{\lambda_i}
$$
です。$\square$
<!-- proof-end -->

特異値分解（SVD）はnormalでない行列、長方形行列にも使えます。固有値分解より適用範囲が広い理由は、$A$ 自身ではなく必ずHermitian PSDになる $A^*A$ を対角化するからです。

---

## 7. スペクトル定理・Jordan・特異値分解（SVD）の使い分け

| 対象 | 分解 | 基底 | 何が見えるか |
|---|---|---|---|
| 一般の複素自己写像 | Jordan標準形 | 一般基底 | 一般化固有構造・冪零部分 |
| complex normal | unitary対角化 | 正規直交基底 | 固有方向が直交して完全分解 |
| Hermitian | unitary対角化 | 正規直交基底 | 実固有値・二次形式の符号 |
| 任意の長方形行列 | 特異値分解（SVD） | 入出力で別の正規直交基底 | 方向別の非負伸縮 |
| 任意の正方行列 | polar decomposition | 基底不要な作用素分解 | unitary部分 × PSD伸縮 |

「どの分解を使うか」は、対象がどこまで特殊かで決まります。

---

## 8. 演習

### Level A

<a id="ex-la6-a01"></a>
#### LA6-A01 Hermitian二次形式
- Level: A

$$
A=\operatorname{diag}(3,-2,0)
$$
の慣性を求めよ。

<!-- solution-start -->
**解答**：対応する二次形式は
$$
q(x)=3|x_1|^2-2|x_2|^2.
$$
正の固有値が1個、負の固有値が1個、零固有値が1個なので
$$
(p,q,r)=(1,1,1).
$$
<!-- solution-end -->

<a id="ex-la6-a02"></a>
#### LA6-A02 PSD平方根
- Level: A

$$
A=\operatorname{diag}(4,9,0)
$$
のPSD平方根を求めよ。

<!-- solution-start -->
**解答**：対角成分の非負平方根を取って
$$
A^{1/2}=\operatorname{diag}(2,3,0).
$$
実際
$$
(A^{1/2})^2=\operatorname{diag}(4,9,0)=A
$$
で、$A^{1/2}$ はHermitian PSDです。
<!-- solution-end -->

<a id="ex-la6-a03"></a>
#### LA6-A03 polar decomposition
- Level: A

$$
A=\operatorname{diag}(2,-3i)
$$
について $P=|A|$ と $U$ を求めよ。

<!-- solution-start -->
**解答**：
$$
A^*=\operatorname{diag}(2,3i),
$$
従って
$$
A^*A=\operatorname{diag}(4,9).
$$
そのPSD平方根は
$$
P=(A^*A)^{1/2}=\operatorname{diag}(2,3).
$$
$A$ は可逆なので
$$
U=AP^{-1}
=\operatorname{diag}(2,-3i)
\operatorname{diag}(1/2,1/3)
=\operatorname{diag}(1,-i).
$$
実際 $U^*U=I$ で
$$
UP=A.
$$
<!-- solution-end -->

<a id="ex-la6-a04"></a>
#### LA6-A04 特異値
- Level: A

$$
A=\operatorname{diag}(1,i,2)
$$
の特異値を求めよ。

<!-- solution-start -->
**解答**：
$$
A^*=\operatorname{diag}(1,-i,2)
$$
なので
$$
A^*A=\operatorname{diag}(1,1,4).
$$
特異値は $A^*A$ の固有値の非負平方根だから
$$
1,1,2.
$$
通常は大きい順に
$$
2,1,1
$$
と並べます。
<!-- solution-end -->

### Level B

<a id="ex-la6-b01"></a>
#### LA6-B01 similarityとcongruence
- Level: B

$A=I_2$, $S=\operatorname{diag}(2,1)$ とする。$S^{-1}AS$ と $S^*AS$ を計算し、両変換の違いを確認せよ。

<!-- solution-start -->
**解答**：
$$
S^{-1}=\operatorname{diag}(1/2,1)
$$
なのでsimilarityでは
$$
S^{-1}AS=S^{-1}S=I_2.
$$
一方 $S$ は実対角なので $S^*=S$ で
$$
S^*AS=S^2=\operatorname{diag}(4,1).
$$
従ってsimilarityは固有値 $1,1$ を保ちますが、congruenceでは固有値は $4,1$ へ変わります。ただしどちらも正定値で、正方向2・負方向0・零方向0という慣性は同じです。
<!-- solution-end -->

<a id="ex-la6-b02"></a>
#### LA6-B02 polar分解と特異値分解（SVD）
- Level: B

正方可逆行列 $A$ の特異値分解（SVD）
$$
A=U\Sigma V^*
$$
が与えられているとき
$$
P=V\Sigma V^*,
\qquad
W=UV^*
$$
と置くと $A=WP$ がpolar decompositionになることを示せ。

<!-- solution-start -->
**解答**：$U,V$ はunitaryなので
$$
W^*W
=VU^*UV^*
=VV^*
=I,
$$
同様に $WW^*=I$。従って $W$ はunitaryです。

また $\Sigma$ は正の対角行列なので $P=V\Sigma V^*$ はHermitian PSDです。さらに
$$
\begin{aligned}
P^2
&=V\Sigma V^*V\Sigma V^*\\
&=V\Sigma^2V^*.
\end{aligned}
$$
一方
$$
\begin{aligned}
A^*A
&=(U\Sigma V^*)^*(U\Sigma V^*)\\
&=V\Sigma U^*U\Sigma V^*\\
&=V\Sigma^2V^*.
\end{aligned}
$$
従って $P^2=A^*A$。$P$ はPSDなのでPSD平方根の一意性から
$$
P=(A^*A)^{1/2}.
$$
最後に
$$
WP
=UV^*V\Sigma V^*
=U\Sigma V^*
=A.
$$
よってpolar decompositionです。
<!-- solution-end -->

<a id="ex-la6-b03"></a>
#### LA6-B03 慣性と正定値性
- Level: B

Hermitian行列 $A$ が正定値であることと、慣性が $(n,0,0)$ であることが同値であることを示せ。

<!-- solution-start -->
**解答**：Hermitian作用素のスペクトル定理で正規直交基底を選ぶと
$$
q_A(x)=\sum_{i=1}^n\lambda_i|x_i|^2.
$$
全ての非零 $x$ で $q_A(x)>0$ となるための必要十分条件は全ての固有値が
$$
\lambda_i>0
$$
であることです。これは正方向が $n$ 個、負方向と零方向が0個、すなわち慣性が
$$
(n,0,0)
$$
であることと同値です。
<!-- solution-end -->

### Level C

<a id="ex-la6-c01"></a>
#### LA6-C01 特異値分解（SVD）から最良rank-k近似を読む
- Level: C

$A=U\Sigma V^*$ の特異値を $\sigma_1\ge\cdots\ge\sigma_r>0$ とする。rank $\le k$ の行列 $B$ に対し
$$
\|A-B\|_2\ge\sigma_{k+1}
$$
を示し、上位 $k$ 個の特異値だけ残した打切り特異値分解（SVD）で等号が達成されることを説明せよ。

<!-- solution-start -->
**解答**：[行列の作用素ノルム（スペクトルノルム）](../F0_00F2_SVD_特異値_作用素ノルム/index.md#def-f0-00f2-operator-norm) はunitary変換で不変なので
$$
\|A-B\|_2
=\|U^*(A-B)V\|_2
=\|\Sigma-C\|_2,
$$
ただし
$$
C=U^*BV.
$$
unitary行列はrankを変えないので
$$
\operatorname{rank}C=\operatorname{rank}B\le k.
$$

右特異ベクトル側の $(k+1)$ 次元部分空間
$$
E=\operatorname{span}(e_1,\dots,e_{k+1})
$$
を考えます。制限写像
$$
C|_E:E\to\mathbb C^m
$$
のrankも高々 $k$ なので、[rank-nullity theorem](../F0_00F_線形写像_固有空間_スペクトル定理_SVD/index.md#thm-f0-00f-01)から
$$
\dim\ker(C|_E)
\ge(k+1)-k=1.
$$
従って単位ベクトル $x\in E$ で
$$
Cx=0
$$
となるものを取れます。

すると
$$
\|(\Sigma-C)x\|
=\|\Sigma x\|.
$$
$x\in E$ なので
$$
x=\sum_{i=1}^{k+1}x_ie_i,
\qquad
\sum_{i=1}^{k+1}|x_i|^2=1.
$$
従って
$$
\begin{aligned}
\|\Sigma x\|^2
&=\sum_{i=1}^{k+1}\sigma_i^2|x_i|^2\\
&\ge\sigma_{k+1}^2\sum_{i=1}^{k+1}|x_i|^2\\
&=\sigma_{k+1}^2.
\end{aligned}
$$
よって
$$
\|A-B\|_2
=\|\Sigma-C\|_2
\ge\|(\Sigma-C)x\|
\ge\sigma_{k+1}.
$$

一方、$\Sigma$ の上位 $k$ 個の特異値だけ残した行列を $\Sigma_k$ とし
$$
A_k=U\Sigma_kV^*
$$
と置きます。$A_k$ のrankは高々 $k$ で
$$
A-A_k=U(\Sigma-\Sigma_k)V^*.
$$
従って
$$
\|A-A_k\|_2
=\|\Sigma-\Sigma_k\|_2.
$$
$\Sigma-\Sigma_k$ は対角成分が
$$
0,\dots,0,\sigma_{k+1},\sigma_{k+2},\dots
$$
なので、その作用素ノルムは最大対角成分
$$
\sigma_{k+1}
$$
です。従って下界が実際に達成されます。これは作用素ノルム版Eckart–Young定理です。
<!-- solution-end -->

---

## 9. Batch 3 の到達点

これで標準線形代数は

```text
実・複素線形空間
  ↓
直和・商空間
  ↓
代数的双対・抽象行列式
  ↓
最小多項式・Cayley–Hamilton・Jordan
  ↓
複素内積・有限次元随伴・normal
  ↓
二次形式・polar decomposition・複素特異値分解（SVD）
```

まで一巡しました。

既存の計算中心の線形代数を捨てるのではなく、その上に数学科標準の構造論を接続した形です。次の標準数学コアは **Batch 4：位相コア** です。
