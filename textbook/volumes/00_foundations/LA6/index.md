# LA6 標準線形代数 VI：スペクトル・二次形式・polar decomposition・特異値分解（SVD）

ここまでで、一般作用素のJordan構造とnormal operatorのunitary対角化を標準コア内で構成しました。本章ではそれらを正本として、**Hermitian二次形式・慣性・PSD平方根・polar decomposition・複素特異値分解（SVD）・作用素ノルム** を一つの依存鎖にまとめます。

[F0-00F1](../F0_00F1_固有空間_スペクトル定理_PSD/index.md) や [F0-00F2](../F0_00F2_SVD_特異値_作用素ノルム/index.md) は計算上の先行プレビューとして参照できますが、本章の証明では「速習章に公式があるから既知」とは扱いません。必要な構造はLA5の複素スペクトル定理と本章内の補題から導きます。

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
&=\langle x,Ax\rangle,
\end{aligned}
$$
したがって $q_A(x)$ は実数です。

<!-- definition-example-start: def-la6-hermitian-quadratic-form -->
**定義の確認**：
$$
A=\begin{pmatrix}2&0\\0&-1\end{pmatrix}
$$
なら
$$
q_A(x)=2|x_1|^2-|x_2|^2.
$$
$x=e_1$ では正、$x=e_2$ では負なので不定値です。
<!-- definition-example-end -->

[複素normal operatorのスペクトル定理](../LA5/index.md#thm-la5-normal-spectral)と[Hermitian作用素の固有値は実数](../LA5/index.md#thm-la5-hermitian-real-eigenvalues)から、ある正規直交基底で
$$
A=\operatorname{diag}(\lambda_1,\dots,\lambda_n),
\qquad
\lambda_i\in\mathbb R.
$$
従って
$$
q_A(x)=\sum_{i=1}^n\lambda_i|x_i|^2.
$$
二次形式の符号構造は固有値の符号へ還元されます。

---

## 2. similarity と congruence

作用素の基底変換は
$$
A\mapsto S^{-1}AS
$$
というsimilarityです。一方、二次形式で $x=Sy$ と置くと
$$
q_A(Sy)=y^*S^*ASy
$$
なので、係数行列は $S^*AS$ と変わります。

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
**定義の確認**：$A=I_2$, $S=\operatorname{diag}(2,1)$ とすると
$$
S^{-1}AS=I_2,
$$
一方
$$
S^*AS=\operatorname{diag}(4,1).
$$
congruenceは固有値そのものを保存しませんが、どちらも正定値です。
<!-- definition-example-end -->

---

## 3. Sylvesterの慣性法則

Hermitian行列 $A$ をunitary対角化し、正の固有値を $\lambda_1,\dots,\lambda_p$、負の固有値を $\lambda_{p+1},\dots,\lambda_{p+q}$ とします。零固有値の個数を
$$
r=n-p-q
$$
と置きます。

$$
D=
\operatorname{diag}
\left(
\lambda_1^{-1/2},\dots,\lambda_p^{-1/2},
|\lambda_{p+1}|^{-1/2},\dots,|\lambda_{p+q}|^{-1/2},
1,\dots,1
\right)
$$
とし、$A=Q\operatorname{diag}(\lambda_i)Q^*$ に対して $S=QD$ と置けば
$$
S^*AS=\operatorname{diag}(I_p,-I_q,0_r).
$$
従ってこの標準形は必ず存在します。

<a id="thm-la6-inertia"></a>
<!-- formal-statement-start -->
> **定理（Sylvesterの慣性法則）**  
> Hermitian二次形式をcongruenceで
$$
\operatorname{diag}(I_p,-I_q,0_r)
$$
> へ変形したとき、三つ組 $(p,q,r)$ は変換の選び方によらず一意である。
<!-- formal-statement-end -->

<!-- proof-start -->
### 証明

まず $r$ を示します。$B=S^*AS$、$S$ 可逆なら $S^*$ も可逆なので
$$
Bx=0
\iff S^*ASx=0
\iff ASx=0.
$$
従って $x\mapsto Sx$ は $\ker B$ と $\ker A$ の線形同型で
$$
\dim\ker B=\dim\ker A.
$$
よって零方向の個数 $r$ はcongruenceで不変です。

次に標準形
$$
h(x)
=\sum_{i=1}^p|x_i|^2-
\sum_{i=p+1}^{p+q}|x_i|^2
$$
を考えます。
$$
P=\operatorname{span}(e_1,\dots,e_p)
$$
上では $h$ は正定値なので、正定値部分空間の最大次元は少なくとも $p$ です。

逆に $(p+1)$ 次元部分空間 $L$ を取ります。最初の $p$ 成分への射影
$$
\pi_+:L\to\mathbb C^p
$$
が単射なら、$L$ の基底 $p+1$ 本の像が $p$ 次元空間で一次独立になり矛盾します。従って非零 $x\in\ker\pi_+$ があり、その $x$ は正方向成分を持たないので
$$
h(x)\le0.
$$
したがって $(p+1)$ 次元以上の部分空間上で $h$ は正定値になれません。よって
$$
p=\max\{\dim L:h|_L\text{ が正定値}\}.
$$

ここでcongruenceでこの最大次元が保存されることを確認します。$B=S^*AS$ なら、その二次形式は
$$
q_B(x)=x^*Bx=(Sx)^*A(Sx)=q_A(Sx)
$$
です。$S$ は可逆なので、$L\mapsto S(L)$ は部分空間全体の間の次元を保つ全単射です。また
$$
q_B|_L\text{ が正定値}
\iff
q_A|_{S(L)}\text{ が正定値}.
$$
従って正定値部分空間の最大次元はcongruenceで変わらず、標準形で求めた値 $p$ は変換の選び方によらず一意です。

同じ議論を $-h$ に適用すると
$$
q=\max\{\dim L:h|_L\text{ が負定値}\}
$$
であり、負定値部分空間の最大次元も同じ写像 $L\mapsto S(L)$ で保存されるので $q$ も一意です。従って $(p,q,r)$ は一意です。$\square$
<!-- proof-end -->

---

## 4. Hermitian PSD作用素と平方根

<a id="def-la6-psd"></a>
<!-- formal-statement-start -->
> **定義（Hermitian PSD作用素）**  
> Hermitian作用素 $A$ が
$$
\langle x,Ax\rangle\ge0
\qquad(x\in V)
$$
> を満たすとき、$A$ をpositive semidefinite（PSD）という。
<!-- formal-statement-end -->

<!-- definition-example-start: def-la6-psd -->
**定義の確認**：
$$
A=\operatorname{diag}(4,0,2)
$$
なら
$$
\langle x,Ax\rangle=4|x_1|^2+2|x_3|^2\ge0
$$
なのでPSDです。
<!-- definition-example-end -->

Hermitian作用素を正規直交固有基底で対角化すると
$$
\langle x,Ax\rangle=\sum_i\lambda_i|x_i|^2.
$$
従って
$$
A\text{ がPSD}
\iff
\lambda_i\ge0\quad(i=1,\dots,n).
$$
必要性は単位固有ベクトル $v_i$ を代入して
$$
\lambda_i=\langle v_i,Av_i\rangle\ge0
$$
から、十分性は上の和から従います。

<a id="thm-la6-psd-square-root"></a>
<!-- formal-statement-start -->
> **定理（Hermitian PSD平方根定理）**  
> Hermitian PSD作用素 $A$ に対し、Hermitian PSD作用素 $B$ で
$$
B^2=A
$$
> を満たすものが一意に存在する。これを $A^{1/2}$ と書く。
<!-- formal-statement-end -->

<!-- proof-start -->
### 証明

スペクトル定理で
$$
A=Q\Lambda Q^*,
\qquad
\Lambda=\operatorname{diag}(\lambda_1,\dots,\lambda_n),
\qquad
\lambda_i\ge0
$$
とします。
$$
B=Q\operatorname{diag}(\sqrt{\lambda_1},\dots,\sqrt{\lambda_n})Q^*
$$
と置けば $B$ はHermitian PSDで $B^2=A$ です。

一意性を示します。Hermitian PSD作用素 $C$ が $C^2=A$ を満たすとします。
$$
CA=C^3=AC
$$
なので $C$ は $A$ と可換します。従って $A$ の固有空間
$$
E_\lambda=\ker(A-\lambda I)
$$
は $C$ で不変です。

$E_\lambda$ 上では
$$
C^2=\lambda I.
$$
$C|_{E_\lambda}$ もHermitian PSDなので正規直交対角化でき、その固有値 $\mu$ は
$$
\mu\ge0,
\qquad
\mu^2=\lambda
$$
を満たします。従って $\mu=\sqrt\lambda$ だけです。よって
$$
C|_{E_\lambda}=\sqrt\lambda I.
$$
$A$ の固有空間は全空間を直交直和に分解するので、$C$ は全空間で一意に決まり、上で構成した $B$ と一致します。$\square$
<!-- proof-end -->

### 矩形行列でも $A^*A$ はHermitian PSD

$A\in\mathbb C^{m\times n}$ に対し
$$
A^*=\overline A^{\mathsf T}\in\mathbb C^{n\times m}
$$
と定めます。成分計算から
$$
(BC)^*=C^*B^*,
\qquad
(A^*)^*=A.
$$
実際
$$
((BC)^*)_{ij}
=\overline{(BC)_{ji}}
=\sum_k\overline{C_{ki}}\,\overline{B_{jk}}
=(C^*B^*)_{ij}.
$$
また
$$
((A^*)^*)_{ij}=A_{ij}.
$$
従って
$$
(A^*A)^*=A^*A.
$$
さらに
$$
\langle x,A^*Ax\rangle
=(Ax)^*(Ax)
=\|Ax\|^2\ge0.
$$
よって $A^*A$ はHermitian PSDです。

---

## 5. polar decomposition

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

$$
P=(A^*A)^{1/2}
$$
と置きます。$P^*=P$, $P^2=A^*A$ なので
$$
\begin{aligned}
\|Px\|^2
&=\langle x,P^2x\rangle\\
&=\langle x,A^*Ax\rangle\\
&=\|Ax\|^2.
\end{aligned}
$$
従って
$$
\ker P=\ker A.
$$

$\operatorname{Im}P$ 上で
$$
U_0(Px)=Ax
$$
と定めます。$Px=Py$ なら $P(x-y)=0$、従って $A(x-y)=0$ なのでwell-definedです。

線形性も、$a,b\in\mathbb C$ に対して
$$
\begin{aligned}
U_0(aPx+bPy)
&=U_0(P(ax+by))\\
&=A(ax+by)\\
&=aU_0(Px)+bU_0(Py)
\end{aligned}
$$
から従います。

さらに
$$
\begin{aligned}
\langle U_0(Px),U_0(Py)\rangle
&=\langle Ax,Ay\rangle\\
&=\langle x,A^*Ay\rangle\\
&=\langle x,P^2y\rangle\\
&=\langle Px,Py\rangle.
\end{aligned}
$$
従って $U_0$ は内積を保存します。特に $U_0z=0$ なら
$$
\|z\|=\|U_0z\|=0
$$
なので単射です。また任意の $Ax\in\operatorname{Im}A$ は $Ax=U_0(Px)$ と書けるので全射です。よって
$$
U_0:\operatorname{Im}P\to\operatorname{Im}A
$$
は内積を保存する線形同型です。

$\operatorname{Im}P$ の正規直交基底を
$$
p_1,\dots,p_r
$$
と取ると
$$
U_0p_1,\dots,U_0p_r
$$
は $\operatorname{Im}A$ の正規直交基底です。LA5の[正規直交系の延長](../LA5/index.md#thm-la5-orthonormal-extension)により
$$
p_1,\dots,p_r,p_{r+1},\dots,p_n
$$
および
$$
U_0p_1,\dots,U_0p_r,a_{r+1},\dots,a_n
$$
をそれぞれ全空間の正規直交基底へ延長します。

$$
Up_i=U_0p_i\quad(i\le r),
\qquad
Up_i=a_i\quad(i>r)
$$
と定めれば、$U$ は正規直交基底を正規直交基底へ送るのでunitaryです。任意の $x$ について $Px\in\operatorname{Im}P$ であり、その部分空間上では $U=U_0$ なので
$$
UPx=U_0(Px)=Ax.
$$
従って $A=UP$ です。

$A$ が可逆なら $\ker P=\ker A=\{0\}$ なので $P$ も可逆です。従って
$$
U=AP^{-1}
$$
で一意に決まります。$\square$
<!-- proof-end -->

$A$ が特異なら、$\operatorname{Im}P$ の直交補上での $U$ の選び方に自由度が残ります。

---

## 6. 複素特異値分解（SVD）

速習章の実SVDを前提に「転置を共役転置へ替える」とはしません。矩形行列からHermitian PSD作用素 $A^*A$ を作り、LA5の複素スペクトル定理から直接構成します。

<a id="thm-la6-complex-svd"></a>
<!-- formal-statement-start -->
> **定理（複素特異値分解）**  
> 任意の $A\in\mathbb C^{m\times n}$ に対し、unitary行列 $U\in\mathbb C^{m\times m}$、$V\in\mathbb C^{n\times n}$ と、非負実数を対角に持つ $m\times n$ 行列 $\Sigma$ が存在して
$$
A=U\Sigma V^*
$$
> と書ける。$\Sigma$ の正の対角成分は $A^*A$ の正の固有値の平方根である。
<!-- formal-statement-end -->

<!-- proof-start -->
### 証明

$A^*A$ は直前に示した通りHermitian PSDです。[複素normal operatorのスペクトル定理](../LA5/index.md#thm-la5-normal-spectral)により、$\mathbb C^n$ の正規直交基底
$$
v_1,\dots,v_n
$$
を $A^*A$ の固有ベクトルとして取れます。
$$
A^*Av_i=\lambda_i v_i,
\qquad
\lambda_i\ge0.
$$
正の固有値を大きい順に先に並べ
$$
\lambda_1\ge\cdots\ge\lambda_r>0,
\qquad
\lambda_{r+1}=\cdots=\lambda_n=0
$$
とします。

$i=1,\dots,r$ に対して
$$
\sigma_i=\sqrt{\lambda_i},
\qquad
u_i=\frac{Av_i}{\sigma_i}
$$
と定めます。

すると
$$
\begin{aligned}
\|u_i\|^2
&=\frac1{\sigma_i^2}\langle Av_i,Av_i\rangle\\
&=\frac1{\sigma_i^2}\langle v_i,A^*Av_i\rangle\\
&=\frac{\lambda_i}{\sigma_i^2}\langle v_i,v_i\rangle\\
&=1.
\end{aligned}
$$
また $i\ne j$ なら
$$
\begin{aligned}
\langle u_i,u_j\rangle
&=\frac1{\sigma_i\sigma_j}\langle Av_i,Av_j\rangle\\
&=\frac1{\sigma_i\sigma_j}\langle v_i,A^*Av_j\rangle\\
&=\frac{\lambda_j}{\sigma_i\sigma_j}\langle v_i,v_j\rangle\\
&=0.
\end{aligned}
$$
従って
$$
u_1,\dots,u_r
$$
は $\mathbb C^m$ の正規直交系です。特に $r\le m$ です。

LA5の[正規直交系の延長](../LA5/index.md#thm-la5-orthonormal-extension)により
$$
u_1,\dots,u_r,u_{r+1},\dots,u_m
$$
を $\mathbb C^m$ の正規直交基底へ延長します。$U$ を $u_i$ を列に持つunitary行列、$V$ を $v_i$ を列に持つunitary行列とします。

$i\le r$ では定義から
$$
Av_i=\sigma_i u_i.
$$
$i>r$ では
$$
0=\lambda_i
=\langle v_i,A^*Av_i\rangle
=\|Av_i\|^2
$$
なので
$$
Av_i=0.
$$

$m\times n$ 行列 $\Sigma$ を
$$
\Sigma_{ii}=\sigma_i\quad(i=1,\dots,r)
$$
とし、その他の成分を0とします。各標準基底 $e_i$ について
$$
AVe_i=Av_i=U\Sigma e_i
$$
なので
$$
AV=U\Sigma.
$$
右から $V^*$ を掛けて
$$
A=U\Sigma V^*.
$$
また
$$
\sigma_1\ge\cdots\ge\sigma_r>0,
\qquad
\sigma_i=\sqrt{\lambda_i}
$$
なので、$\Sigma$ の正の対角成分は $A^*A$ の正の固有値の平方根を大きい順に並べたものです。$\square$
<!-- proof-end -->

SVDはnormalでない行列や長方形行列にも使えます。$A$ 自身ではなく、必ずHermitian PSDになる $A^*A$ を対角化するからです。

---

## 7. 作用素ノルムを標準コア内で構成する

<a id="def-la6-operator-norm"></a>
<!-- formal-statement-start -->
> **定義（Euclidノルムから誘導される作用素ノルム）**  
> $M\in\mathbb C^{m\times n}$ に対して
$$
\|M\|_2
=\sup_{x\ne0}\frac{\|Mx\|}{\|x\|}
=\sup_{\|x\|=1}\|Mx\|
$$
> と定める。
<!-- formal-statement-end -->

$\|x\|=1$ なら各 $|x_j|\le1$ なので
$$
|(Mx)_i|
\le\sum_j|m_{ij}|.
$$
従って
$$
\|Mx\|^2
\le\sum_i\left(\sum_j|m_{ij}|\right)^2,
$$
右辺は $x$ に依存しない有限定数です。よってsupは有限です。また $x\ne0$ に対して $y=x/\|x\|$ と置けば
$$
\frac{\|Mx\|}{\|x\|}=\|My\|,
$$
従って二つのsup表示は一致します。

<!-- definition-example-start: def-la6-operator-norm -->
**定義の確認**：
$$
D=\operatorname{diag}(3,1)
$$
なら $\|x\|=1$ に対し
$$
\|Dx\|^2
=9|x_1|^2+|x_2|^2
\le9.
$$
従って $\|D\|_2\le3$。$x=e_1$ で3を達成するので $\|D\|_2=3$ です。
<!-- definition-example-end -->

<a id="lem-la6-unitary-norm-invariance"></a>
<!-- formal-statement-start -->
> **補題（作用素ノルムのunitary不変性）**  
> unitary行列 $U,V$ に対し
$$
\|UMV\|_2=\|M\|_2.
$$
<!-- formal-statement-end -->

<!-- proof-start -->
### 証明

unitary行列はノルムを保存するので
$$
\|UMVx\|=\|MVx\|.
$$
また $V$ は単位球面を単位球面へ全単射に移すため
$$
\begin{aligned}
\|UMV\|_2
&=\sup_{\|x\|=1}\|MVx\|\\
&=\sup_{\|y\|=1}\|My\|\\
&=\|M\|_2.
\end{aligned}
$$
$\square$
<!-- proof-end -->

<a id="lem-la6-rank-invertible-invariance"></a>
<!-- formal-statement-start -->
> **補題（可逆な左右乗算はrankを変えない）**  
> 可逆行列 $P,Q$ に対し
$$
\operatorname{rank}(PMQ)=\operatorname{rank}M.
$$
<!-- formal-statement-end -->

<!-- proof-start -->
### 証明

$Q$ は全射なので
$$
\operatorname{Im}(MQ)=\operatorname{Im}M.
$$
従って
$$
\operatorname{Im}(PMQ)=P(\operatorname{Im}M).
$$
$P$ は可逆なので $\operatorname{Im}M$ と $P(\operatorname{Im}M)$ は線形同型で、次元が等しいためrankも等しいです。$\square$
<!-- proof-end -->

<a id="lem-la6-diagonal-operator-norm"></a>
<!-- formal-statement-start -->
> **補題（矩形対角行列の作用素ノルム）**  
> $D\in\mathbb C^{m\times n}$ が対角成分 $d_1,\dots,d_s$ 以外0なら
$$
\|D\|_2=\max_i|d_i|.
$$
<!-- formal-statement-end -->

<!-- proof-start -->
### 証明

$$
M=\max_i|d_i|
$$
とします。$\|x\|=1$ なら
$$
\|Dx\|^2
=\sum_{i=1}^s|d_i|^2|x_i|^2
\le M^2.
$$
従って $\|D\|_2\le M$。$|d_j|=M$ となる $j$ で $x=e_j$ と取れば等号を達成するので $\|D\|_2=M$ です。$\square$
<!-- proof-end -->

SVD $A=U\Sigma V^*$ にunitary不変性と対角行列の補題を使えば
$$
\|A\|_2=\|\Sigma\|_2=\sigma_1.
$$
ここで $\sigma_1$ が最大特異値であることは、SVDの構成時に $\lambda_1\ge\cdots\ge\lambda_r$ と並べたことから従います。つまり「作用素ノルムは最大特異値」という公式をここで回収できます。

---

## 8. スペクトル定理・Jordan・SVDの使い分け

| 対象 | 分解 | 基底 | 何が見えるか |
|---|---|---|---|
| 一般の複素自己写像 | Jordan標準形 | 一般基底 | 一般化固有構造・冪零部分 |
| complex normal | unitary対角化 | 正規直交基底 | 固有方向が直交して完全分解 |
| Hermitian | unitary対角化 | 正規直交基底 | 実固有値・二次形式の符号 |
| 任意の長方形行列 | SVD | 入出力で別の正規直交基底 | 方向別の非負伸縮 |
| 任意の正方行列 | polar decomposition | 基底不要な作用素分解 | unitary部分 × PSD伸縮 |

---

## 9. 演習

### Level A

<a id="ex-la6-a01"></a>
#### LA6-A01 Hermitian二次形式
- Level: A

$$
A=\operatorname{diag}(3,-2,0)
$$
の慣性を求めよ。

<!-- solution-start -->
**解答**：
$$
q_A(x)=3|x_1|^2-2|x_2|^2.
$$
正・負・零方向が1本ずつなので
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
**解答**：
$$
A^{1/2}=\operatorname{diag}(2,3,0).
$$
各固有値の非負平方根を取ったもので、[PSD平方根定理](#thm-la6-psd-square-root)の一意性からこれが唯一のPSD平方根です。
<!-- solution-end -->

<a id="ex-la6-a03"></a>
#### LA6-A03 polar decomposition
- Level: A

$$
A=\operatorname{diag}(2,-3i)
$$
について $P$ と $U$ を求めよ。

<!-- solution-start -->
**解答**：
$$
A^*A=\operatorname{diag}(4,9),
$$
従って
$$
P=(A^*A)^{1/2}=\operatorname{diag}(2,3).
$$
$A$ は可逆なので
$$
U=AP^{-1}=\operatorname{diag}(1,-i).
$$
実際 $U^*U=I$ かつ $UP=A$ です。
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
A^*A=\operatorname{diag}(1,1,4).
$$
[複素SVD](#thm-la6-complex-svd)から特異値はその固有値の非負平方根なので、降順に
$$
2,1,1
$$
です。
<!-- solution-end -->

### Level B

<a id="ex-la6-b01"></a>
#### LA6-B01 similarityとcongruence
- Level: B

$A=I_2$, $S=\operatorname{diag}(2,1)$ とする。$S^{-1}AS$ と $S^*AS$ を計算し、両変換の違いを確認せよ。

<!-- solution-start -->
**解答**：
$$
S^{-1}AS=I_2,
\qquad
S^*AS=\operatorname{diag}(4,1).
$$
similarityでは固有値を保ちます。congruenceでは固有値の値は変わりますが、[Sylvesterの慣性法則](#thm-la6-inertia)により慣性 $(2,0,0)$ は保たれます。
<!-- solution-end -->

<a id="ex-la6-b02"></a>
#### LA6-B02 polar分解とSVD
- Level: B

正方可逆行列 $A$ のSVD
$$
A=U\Sigma V^*
$$
に対し
$$
P=V\Sigma V^*,
\qquad
W=UV^*
$$
と置くと $A=WP$ がpolar decompositionになることを示せ。

<!-- solution-start -->
**解答**：$U,V$ はunitaryなので
$$
W^*W=VU^*UV^*=I,
$$
従って $W$ はunitaryです。$A$ は可逆なので $\Sigma$ の対角成分は全て正で、$P$ はHermitian PSDです。

また
$$
P^2=V\Sigma^2V^*,
$$
一方
$$
A^*A=V\Sigma^2V^*.
$$
従って $P^2=A^*A$。PSD平方根の一意性から
$$
P=(A^*A)^{1/2}.
$$
最後に
$$
WP=UV^*V\Sigma V^*=A.
$$
<!-- solution-end -->

<a id="ex-la6-b03"></a>
#### LA6-B03 慣性と正定値性
- Level: B

Hermitian行列 $A$ が正定値であることと、慣性が $(n,0,0)$ であることが同値であることを示せ。

<!-- solution-start -->
**解答**：正規直交固有基底で
$$
q_A(x)=\sum_i\lambda_i|x_i|^2.
$$
これが全ての非零 $x$ で正であるための必要十分条件は全ての $\lambda_i>0$ です。これは正方向が $n$ 本、負・零方向が0本、すなわち慣性 $(n,0,0)$ と同値です。
<!-- solution-end -->

### Level C

<a id="ex-la6-c01"></a>
#### LA6-C01 SVDから最良rank-$k$近似を読む
- Level: C

$A=U\Sigma V^*$ の正の特異値を
$$
\sigma_1\ge\cdots\ge\sigma_r>0
$$
とし、$0\le k<r$ とする。rank $\le k$ の任意の行列 $B$ に対して
$$
\|A-B\|_2\ge\sigma_{k+1}
$$
を示し、上位 $k$ 個の特異値だけ残した打切りSVDで等号が達成されることを示せ。

<!-- solution-start -->
**解答**：[作用素ノルムのunitary不変性](#lem-la6-unitary-norm-invariance)から
$$
\|A-B\|_2
=\|\Sigma-C\|_2,
\qquad
C=U^*BV.
$$
[可逆な左右乗算はrankを変えない](#lem-la6-rank-invertible-invariance)から
$$
\operatorname{rank}C\le k.
$$

$$
E=\operatorname{span}(e_1,\dots,e_{k+1})
$$
とします。もし $C|_E$ が単射なら $E$ の基底 $k+1$ 本の像が $\operatorname{Im}C$ で一次独立になりますが
$$
\dim\operatorname{Im}C\le k
$$
なので不可能です。従って単位ベクトル $x\in E$ で
$$
Cx=0
$$
となるものが存在します。

すると
$$
\|(\Sigma-C)x\|=\|\Sigma x\|.
$$
$x=\sum_{i=1}^{k+1}x_ie_i$、$\sum|x_i|^2=1$ なので
$$
\begin{aligned}
\|\Sigma x\|^2
&=\sum_{i=1}^{k+1}\sigma_i^2|x_i|^2\\
&\ge\sigma_{k+1}^2.
\end{aligned}
$$
作用素ノルムの定義から
$$
\|A-B\|_2
=\|\Sigma-C\|_2
\ge\sigma_{k+1}.
$$

上位 $k$ 個だけ残した $\Sigma_k$ と
$$
A_k=U\Sigma_kV^*
$$
を取ります。$\operatorname{rank}A_k\le k$ で、unitary不変性から
$$
\|A-A_k\|_2
=\|\Sigma-\Sigma_k\|_2.
$$
[矩形対角行列の作用素ノルム](#lem-la6-diagonal-operator-norm)より右辺は
$$
\sigma_{k+1}.
$$
従って下界が達成されます。
<!-- solution-end -->

---

## 10. Batch 3 の到達点

標準線形代数は

```text
実・複素線形空間
  ↓
直和・商空間
  ↓
代数的双対・通常行列式・抽象行列式
  ↓
多項式行列式・特性多項式・Cayley–Hamilton・Jordan
  ↓
複素Gram–Schmidt・有限次元随伴・normal
  ↓
二次形式・PSD平方根・polar decomposition・複素SVD・作用素ノルム
```

まで一巡しました。

この並びでは、計算章に先に現れた公式を標準コアの無証明前提として使わず、後続理論が必要とする具体構成をその場で正本化しています。位相コアは別章で実装済みなので、本章は標準線形代数の依存鎖を閉じるところで完結します。