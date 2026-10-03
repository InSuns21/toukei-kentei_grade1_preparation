# LA6 スペクトル・二次形式・極分解・複素特異値分解

LA5 では複素内積・随伴・Hermitian 作用素・ユニタリ作用素・正規作用素を導入し、正規作用素を正規直交固有基底で対角化できることまで進みました。F0-00F2 では実行列の特異値分解を、入力方向と出力方向を分ける方法として学びました。

ここでは、この2本の流れをつなぎます。まず Hermitian 作用素が定める二次形式の符号を座標変換に依らず読む方法を作り、その符号情報から半正定値平方根を構成します。次に任意の複素行列を **ユニタリ部分と非負の伸縮部分** に分ける極分解を導き、最後に複素特異値分解と作用素ノルムへ接続します。

---

## 1. Hermitian二次形式

実対称行列では $x^{\mathsf T}Ax$ の符号を調べることで、正定値・半正定値を判定しました。複素数上では転置だけではなく共役転置が必要なので、同じ役割を持つ量として
$$
\langle x,Ax\rangle=x^*Ax
$$
を考えます。Hermitian 性を仮定すると、この値が常に実数になり、「正・負・零」という符号を意味のある形で議論できます。

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

[複素正規作用素のスペクトル定理](../LA5/index.md#thm-la5-normal-spectral)と[Hermitian作用素の固有値は実数](../LA5/index.md#thm-la5-hermitian-real-eigenvalues)から、ある正規直交基底で
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

## 2. 相似変換と合同変換

作用素そのものを別の基底で表すときは
$$
A\mapsto S^{-1}AS
$$
という **相似変換** が現れます。これは「同じ線形写像の表現行列を変える」操作なので、固有値を保ちます。

一方、二次形式では入力ベクトルの座標を $x=Sy$ と取り替えると
$$
\begin{aligned}
q_A(Sy)
&=(Sy)^*A(Sy)\\
&=y^*S^*ASy.
\end{aligned}
$$
従って係数行列は
$$
A\mapsto S^*AS
$$
と変わります。こちらは固有値そのものではなく、二次形式の符号構造を保つ変換です。

<a id="def-la6-congruence"></a>
<!-- formal-statement-start -->
> **定義（合同変換 / congruence）**  
> Hermitian行列 $A,B$ が、ある可逆行列 $S$ によって
$$
B=S^*AS
$$
> と表されるとき、$A$ と $B$ は **合同** であるという。
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
合同変換は固有値そのものを保存しませんが、この例では変換前後のどちらも正定値です。
<!-- definition-example-end -->

---

## 3. Sylvesterの慣性法則

合同変換で固有値の大きさ自体は変わるため、「二次形式の本質的な符号情報として何が残るか」を切り出したくなります。Hermitian 行列では、正の方向・負の方向・零方向の本数がその答えになります。

Hermitian行列 $A$ をユニタリ対角化し、正の固有値を $\lambda_1,\dots,\lambda_p$、負の固有値を $\lambda_{p+1},\dots,\lambda_{p+q}$ とします。零固有値の個数を
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
とし、
$$
A=Q\operatorname{diag}(\lambda_i)Q^*
$$
に対して $S=QD$ と置きます。$D$ は実対角行列なので $D^*=D$ であり、
$$
\begin{aligned}
S^*AS
&=DQ^*\,Q\operatorname{diag}(\lambda_i)Q^*\,QD\\
&=D\operatorname{diag}(\lambda_i)D\\
&=\operatorname{diag}(I_p,-I_q,0_r).
\end{aligned}
$$
従ってこの標準形は必ず存在します。

<a id="thm-la6-inertia"></a>
<!-- formal-statement-start -->
> **定理（Sylvesterの慣性法則）**  
> Hermitian二次形式を合同変換で
$$
\operatorname{diag}(I_p,-I_q,0_r)
$$
> へ変形したとき、三つ組 $(p,q,r)$ は変換の選び方によらず一意である。
<!-- formal-statement-end -->

### 証明の見取り図

零方向の本数 $r$ は核の次元として読み、可逆変換で核の次元が変わらないことから示します。正方向の本数 $p$ は「二次形式が正定値になる部分空間の最大次元」として特徴付け、合同変換が部分空間の次元と正定値性を同時に保つことを使います。負方向 $q$ は $-q_A$ に同じ議論を適用します。

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
よって零方向の個数 $r$ は合同変換で不変です。

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

ここで合同変換でこの最大次元が保存されることを確認します。$B=S^*AS$ なら、その二次形式は
$$
q_B(x)=x^*Bx=(Sx)^*A(Sx)=q_A(Sx)
$$
です。$S$ は可逆なので、$L\mapsto S(L)$ は部分空間全体の間の次元を保つ全単射です。また
$$
q_B|_L\text{ が正定値}
\iff
q_A|_{S(L)}\text{ が正定値}.
$$
従って正定値部分空間の最大次元は合同変換で変わらず、標準形で求めた値 $p$ は変換の選び方によらず一意です。

同じ議論を $-h$ に適用すると
$$
q=\max\{\dim L:h|_L\text{ が負定値}\}
$$
であり、負定値部分空間の最大次元も同じ写像 $L\mapsto S(L)$ で保存されるので $q$ も一意です。従って $(p,q,r)$ は一意です。$\square$
<!-- proof-end -->

---

## 4. Hermitian 半正定値作用素と平方根

極分解や複素特異値分解では $A^*A$ が中心になります。この作用素は常に Hermitian で、さらに
$$
\langle x,A^*Ax\rangle=\|Ax\|^2\ge0
$$
という非負性を持ちます。そこで、まず Hermitian 作用素のうち二次形式が常に非負になるものを名前付きで扱い、その平方根を固有値ごとに構成します。

<a id="def-la6-psd"></a>
<!-- formal-statement-start -->
> **定義（Hermitian 半正定値作用素）**  
> Hermitian作用素 $A$ が
$$
\langle x,Ax\rangle\ge0
\qquad(x\in V)
$$
> を満たすとき、$A$ を **Hermitian 半正定値作用素** という。以後、必要に応じて PSD と略記する。
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
なので Hermitian 半正定値です。
<!-- definition-example-end -->

Hermitian作用素を正規直交固有基底で対角化すると
$$
\langle x,Ax\rangle=\sum_i\lambda_i|x_i|^2.
$$
従って
$$
A\text{ が半正定値}
\iff
\lambda_i\ge0\quad(i=1,\dots,n).
$$
実際、半正定値なら各単位固有ベクトル $v_i$ に対して
$$
\lambda_i
=
\lambda_i\langle v_i,v_i\rangle
=
\langle v_i,Av_i\rangle
\ge0.
$$
逆に全ての $\lambda_i\ge0$ なら、任意の $x$ について
$$
\langle x,Ax\rangle
=
\sum_i\lambda_i|x_i|^2
\ge0,
$$
なので $A$ は半正定値です。

<a id="thm-la6-psd-square-root"></a>
<!-- formal-statement-start -->
> **定理（Hermitian 半正定値平方根定理）**  
> Hermitian 半正定値作用素 $A$ に対し、Hermitian 半正定値作用素 $B$ で
$$
B^2=A
$$
> を満たすものが一意に存在する。これを $A^{1/2}$ と書く。
<!-- formal-statement-end -->

### 証明の見取り図

存在は、正規直交固有基底で各非負固有値 $\lambda_i$ を $\sqrt{\lambda_i}$ に置き換えて構成します。一意性は、別の半正定値平方根 $C$ があれば $C$ と $A=C^2$ が可換するため、$A$ の各固有空間上で $C$ を対角化でき、その固有値が非負の平方根 $\sqrt\lambda$ に強制されることから示します。

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
と置けば $B$ は Hermitian 半正定値で $B^2=A$ です。

一意性を示します。Hermitian 半正定値作用素 $C$ が $C^2=A$ を満たすとします。
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
$C|_{E_\lambda}$ も Hermitian 半正定値なので正規直交対角化でき、その固有値 $\mu$ は
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

### 矩形行列でも $A^*A$ は Hermitian 半正定値

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
よって $A^*A$ は Hermitian 半正定値です。

---

## 5. 極分解

特異値分解では、行列を「入力側の基底変更 → 非負の伸縮 → 出力側の基底変更」と分けました。正方行列では、このうち回転・位相変化に相当する部分と、非負の伸縮に相当する部分を二つの作用素へ直接まとめられます。

$A^*A$ は Hermitian 半正定値なので、その平方根
$$
P=(A^*A)^{1/2}
$$
を「伸縮部分」とみなします。残りを内積を保つユニタリ作用素として補えることを示すのが極分解です。

<a id="thm-la6-polar"></a>
<!-- formal-statement-start -->
> **定理（極分解 / polar decomposition）**  
> 任意の複素正方行列 $A\in\mathbb C^{n\times n}$ に対し、ユニタリ行列 $U$ と Hermitian 半正定値行列
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

### 証明の見取り図

まず $P=(A^*A)^{1/2}$ と置くと、$P$ と $A$ は全てのベクトルを同じ長さへ送ることが分かります。そのため、$Px$ を $Ax$ へ送る写像
$$
U_0(Px)=Ax
$$
は $\operatorname{Im}P$ 上で内積を保つように定まります。これを正規直交基底の延長で全空間のユニタリ作用素 $U$ へ拡張し、$A=UP$ を得ます。

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
と定めます。$Px=Py$ なら $P(x-y)=0$、従って $A(x-y)=0$ です。よって $Ax=Ay$ となり、$U_0(Px)$ は代表元 $x$ の選び方に依らず良定義です。

線形性も、$a,b\in\mathbb C$ に対して
$$
\begin{aligned}
U_0(aPx+bPy)
&=U_0(P(ax+by))\\
&=A(ax+by)\\
&=aU_0(Px)+bU_0(Py)
\end{aligned}
$$
なので、$U_0$ は線形です。

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
と定めれば、$U$ は正規直交基底を正規直交基底へ送るのでユニタリです。任意の $x$ について $Px\in\operatorname{Im}P$ であり、その部分空間上では $U=U_0$ なので
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

## 6. 複素特異値分解

F0-00F2 では実行列に対して $A^{\mathsf T}A$ を使いました。複素行列では転置の代わりに共役転置を使うと
$$
A^*A
$$
が必ず Hermitian 半正定値になります。そこで実数版と同じ構成を、[LA5 の複素正規作用素のスペクトル定理](../LA5/index.md#thm-la5-normal-spectral)を使って一段ずつ組み直します。

<a id="thm-la6-complex-svd"></a>
<!-- formal-statement-start -->
> **定理（複素特異値分解）**  
> 任意の $A\in\mathbb C^{m\times n}$ に対し、ユニタリ行列 $U\in\mathbb C^{m\times m}$、$V\in\mathbb C^{n\times n}$ と、非負実数を対角に持つ $m\times n$ 行列 $\Sigma$ が存在して
$$
A=U\Sigma V^*
$$
> と書ける。$\Sigma$ の正の対角成分は $A^*A$ の正の固有値の平方根である。
<!-- formal-statement-end -->

### 証明の見取り図

$A^*A$ を正規直交固有基底で対角化し、正の固有値 $\lambda_i$ から $\sigma_i=\sqrt{\lambda_i}$ を作ります。対応する入力方向 $v_i$ を $A$ で送って $\sigma_i$ で割ると出力側の正規直交系 $u_i$ が得られます。零固有値の方向は $A$ で0へ送られるので、最後に両側の基底を行列へ並べれば分解式になります。

<!-- proof-start -->
### 証明

$A^*A$ は直前に示した通り Hermitian 半正定値です。[複素正規作用素のスペクトル定理](../LA5/index.md#thm-la5-normal-spectral)により、$\mathbb C^n$ の正規直交基底
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
を $\mathbb C^m$ の正規直交基底へ延長します。$U$ を $u_i$ を列に持つユニタリ行列、$V$ を $v_i$ を列に持つユニタリ行列とします。

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

特異値分解は正規でない行列や長方形行列にも使えます。$A$ 自身ではなく、必ず Hermitian 半正定値になる $A^*A$ を対角化するからです。

---

## 7. 複素行列の作用素ノルム

F0-00F2 では実行列について「単位入力を最大で何倍に伸ばすか」を2-作用素ノルムとして定義しました。複素行列でも同じ問いを考え、複素 Euclid ノルム
$$
\|x\|^2=\sum_j|x_j|^2
$$
に対する最大伸長率を定義します。

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
> **補題（作用素ノルムのユニタリ不変性）**  
> ユニタリ行列 $U,V$ に対し
$$
\|UMV\|_2=\|M\|_2.
$$
<!-- formal-statement-end -->

<!-- proof-start -->
### 証明

ユニタリ行列はノルムを保存するので
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
> **補題（可逆な左右乗算は階数を変えない）**  
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
$P$ は可逆なので $\operatorname{Im}M$ と $P(\operatorname{Im}M)$ は線形同型で、次元が等しいため階数も等しいです。$\square$
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

特異値分解 $A=U\Sigma V^*$ に[作用素ノルムのユニタリ不変性](#lem-la6-unitary-norm-invariance)と[矩形対角行列の作用素ノルム](#lem-la6-diagonal-operator-norm)を使えば
$$
\|A\|_2=\|\Sigma\|_2=\sigma_1.
$$
特異値分解の構成では
$$
\lambda_1\ge\cdots\ge\lambda_r>0
$$
と並べ、
$$
\sigma_i=\sqrt{\lambda_i}
$$
と定めたので
$$
\sigma_1\ge\cdots\ge\sigma_r>0.
$$
したがって $\sigma_1$ は最大特異値であり、「作用素ノルムは最大特異値」という公式がここで得られます。

---

## 8. スペクトル定理・Jordan・特異値分解の使い分け

| 対象 | 分解 | 基底 | 何が見えるか |
|---|---|---|---|
| 一般の複素自己写像 | Jordan標準形 | 一般基底 | 一般化固有構造・冪零部分 |
| 複素正規作用素 | ユニタリ対角化 | 正規直交基底 | 固有方向が直交して完全分解 |
| Hermitian作用素 | ユニタリ対角化 | 正規直交基底 | 実固有値・二次形式の符号 |
| 任意の長方形行列 | 特異値分解 | 入出力で別の正規直交基底 | 方向別の非負伸縮 |
| 任意の正方行列 | 極分解 | 基底に依らない作用素分解 | ユニタリ部分 × 半正定値伸縮 |

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
#### LA6-A02 半正定値平方根
- Level: A

$$
A=\operatorname{diag}(4,9,0)
$$
の半正定値平方根を求めよ。

<!-- solution-start -->
**解答**：
$$
A^{1/2}=\operatorname{diag}(2,3,0).
$$
各固有値の非負平方根を取ったもので、[半正定値平方根定理](#thm-la6-psd-square-root)の一意性から、これが唯一の半正定値平方根です。
<!-- solution-end -->

<a id="ex-la6-a03"></a>
#### LA6-A03 極分解
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
[上の定理](#thm-la6-complex-svd)から特異値はその固有値の非負平方根なので、降順に
$$
2,1,1
$$
です。
<!-- solution-end -->

### Level B

<a id="ex-la6-b01"></a>
#### LA6-B01 相似変換と合同変換
- Level: B

$A=I_2$, $S=\operatorname{diag}(2,1)$ とする。$S^{-1}AS$ と $S^*AS$ を計算し、両変換の違いを確認せよ。

<!-- solution-start -->
**解答**：
$$
S^{-1}AS=I_2,
\qquad
S^*AS=\operatorname{diag}(4,1).
$$
相似変換では固有値を保ちます。合同変換では固有値の値は変わりますが、[Sylvesterの慣性法則](#thm-la6-inertia)により慣性 $(2,0,0)$ は保たれます。
<!-- solution-end -->

<a id="ex-la6-b02"></a>
#### LA6-B02 極分解と特異値分解
- Level: B

正方可逆行列 $A$ の特異値分解
$$
A=U\Sigma V^*
$$
に対し
$$
P=V\Sigma V^*,
\qquad
W=UV^*
$$
と置くと $A=WP$ が極分解になることを示せ。

<!-- solution-start -->
**解答**：$U,V$ はユニタリなので
$$
W^*W=VU^*UV^*=I,
$$
従って $W$ はユニタリです。$A$ は可逆なので $\Sigma$ の対角成分は全て正で、$P$ は Hermitian 半正定値です。

また
$$
P^2=V\Sigma^2V^*,
$$
一方
$$
A^*A=V\Sigma^2V^*.
$$
従って $P^2=A^*A$。半正定値平方根の一意性から
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
#### LA6-C01 特異値分解から最良階数 $k$ 近似を読む
- Level: C

$A=U\Sigma V^*$ の正の特異値を
$$
\sigma_1\ge\cdots\ge\sigma_r>0
$$
とし、$0\le k<r$ とする。階数 $\le k$ の任意の行列 $B$ に対して
$$
\|A-B\|_2\ge\sigma_{k+1}
$$
を示し、上位 $k$ 個の特異値だけ残した打切り特異値分解で等号が達成されることを示せ。

<!-- solution-start -->
**解答**：[作用素ノルムのユニタリ不変性](#lem-la6-unitary-norm-invariance)から
$$
\|A-B\|_2
=\|\Sigma-C\|_2,
\qquad
C=U^*BV.
$$
[可逆な左右乗算は階数を変えない](#lem-la6-rank-invertible-invariance)から
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
定義式
$$
\|M\|_2=\sup_{\|y\|=1}\|My\|
$$
を $M=\Sigma-C$ に適用すると
$$
\|A-B\|_2
=\|\Sigma-C\|_2
\ge\|(\Sigma-C)x\|
=\|\Sigma x\|
\ge\sigma_{k+1}.
$$

上位 $k$ 個だけ残した $\Sigma_k$ と
$$
A_k=U\Sigma_kV^*
$$
を取ります。$\operatorname{rank}A_k\le k$ で、[作用素ノルムのユニタリ不変性](#lem-la6-unitary-norm-invariance)から
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

## 10. この章でつながったこと

ここまでで、線形代数の主要な分解は次の役割分担として見通せるようになりました。

```text
一般の複素自己写像
  → Jordan 標準形：一般化固有構造を見る

正規作用素・Hermitian作用素
  → ユニタリ対角化：直交する固有方向へ分ける

任意の長方形行列
  → 特異値分解：入力方向ごとの非負伸縮へ分ける

任意の複素正方行列
  → 極分解：ユニタリ部分と半正定値伸縮へ分ける
```

どの分解を使うかは、「固有構造を見たいのか」「直交性を保ちたいのか」「長方形行列の伸縮を見たいのか」で決まります。ここまでの道具が、数値線形代数・最適化・多変量解析・関数解析で行列や作用素を扱う土台になります。
