# LREP8 二つのスピンの合成

<!-- definition-example-audit: strict -->

一つの粒子に対する[角運動量の量子数と昇降公式](../LREP7/index.md#thm-lrep7-spin-spectrum)は、スピン $j$ の状態 $|j,m\rangle$ を記述しました。二つの粒子を同時に回転すると、それぞれの角運動量が加わります。しかし「スピン $j$ と $k$ を足す」といっても、答えは一般に一つの $j+k$ だけではありません。どのスピンが何回現れ、その状態を元の積状態でどう書けるでしょうか。

本講では、[テンソル積表現](../LREP4/index.md#def-lrep4-tensor-product)の中から全角運動量の既約部分空間を取り出します。有限次元複素ユニタリ $SU(2)$ 表現だけを扱い、$\hbar=1$ とします。

## 1. 二つの回転から全角運動量を作る

スピン $j$ と $k$ の表現空間をそれぞれ $V_j,V_k$ と書きます。これは[前講の $V_n$](../LREP6/index.md#thm-lrep6-polynomial-model)を $n=2j,2k$ で言い直した記法です。直積基底の記号

$$
|m,n\rangle=|j,m\rangle\otimes|k,n\rangle
$$

を使います。$m=-j,\dots,j$、$n=-k,\dots,k$ はそれぞれ1刻みです。両者は正規直交基底で、そのテンソル積にも積内積
$\langle v\otimes w,v'\otimes w'\rangle=\langle v,v'\rangle\langle w,w'\rangle$
を入れます。

全角運動量とは、両方の因子に**同時に同じ回転**を作用させたときの無限小生成子です。[テンソル積表現の微分公式](../LREP4/index.md#prop-lrep4-tensor-differential)を使えば、微分が二項の和になる理由も分かります。

<a id="def-lrep8-total-spin"></a>

<!-- formal-statement-start -->
> **定義（全角運動量と積状態）**  
> $j,k\in\{0,\frac12,1,\frac32,\dots\}$ とし、$V_j,V_k$ をそれぞれスピン $j,k$ の有限次元複素ユニタリ $SU(2)$ 既約表現とする。$V_j\otimes_{\mathbb C}V_k$ の対角的な群作用を $D_j(U)\otimes D_k(U)$ とし、全角運動量演算子を

$$
T_a=J_a^{(j)}\otimes I_{V_k}+I_{V_j}\otimes J_a^{(k)}
\quad(a=1,2,3)
$$

> と定める。$T_\pm=T_1\pm iT_2$、$T^2=T_1^2+T_2^2+T_3^2$ と書く。$|m,n\rangle=|j,m\rangle\otimes|k,n\rangle$ を**積状態**と呼び、$M=m+n$ を全磁気量子数と呼ぶ。
<!-- formal-statement-end -->

<!-- definition-example-start: def-lrep8-total-spin -->
**定義の確認。** $j=k=\frac12$ なら $\dim(V_{1/2}\otimes V_{1/2})=2\cdot2=4$ です。$|\uparrow\rangle=|\frac12,\frac12\rangle$、$|\downarrow\rangle=|\frac12,-\frac12\rangle$ と書くと、[前講の固有値公式](../LREP7/index.md#thm-lrep7-spin-spectrum)より

$$
T_3|\uparrow\downarrow\rangle
=\left(\frac12-\frac12\right)|\uparrow\downarrow\rangle=0,\qquad
T_3|\uparrow\uparrow\rangle=|\uparrow\uparrow\rangle.
$$

二つの項はそれぞれ第一因子、第二因子の演算子であり、定義上の $T_3$ が実際に量子数を加算することを確認できます。
<!-- definition-example-end -->

この節の $J_a^{(j)}$ は $V_j$ 上の自己共役演算子であり、テンソル積上で別の粒子に作用する二項は可換です。ここを区別すると合成角運動量の交換関係が計算できます。

<a id="lem-lrep8-total-commutators"></a>

<!-- formal-statement-start -->
> **補題（全角運動量の昇降作用）**  
> [全角運動量の定義](#def-lrep8-total-spin)の $T_a$ は自己共役であり、

$$
[T_a,T_b]=i\sum_c\varepsilon_{abc}T_c,\qquad
[T_3,T_\pm]=\pm T_\pm,\qquad [T_+,T_-]=2T_3.
$$

> また $T_3|m,n\rangle=(m+n)|m,n\rangle$ であり、$T_\pm$ はそれぞれ片側だけを昇降させた二項の和として作用する。
<!-- formal-statement-end -->

**証明の見取り図。** [個々のスピンの交換関係](../LREP7/index.md#lem-lrep7-commutators)を二つの因子に適用し、異なる因子の項が可換であることを利用します。

<!-- proof-start -->
### 証明

$A_a=J_a^{(j)}\otimes I$、$B_a=I\otimes J_a^{(k)}$ とおくと $[A_a,B_b]=0$ です。したがって

$$
\begin{aligned}
[T_a,T_b]&=[A_a+B_a,A_b+B_b]\\
&=[A_a,A_b]+[B_a,B_b]\\
&=i\sum_c\varepsilon_{abc}(A_c+B_c)
=i\sum_c\varepsilon_{abc}T_c.
\end{aligned}
$$

$A_a,B_a$ は自己共役なのでその和も自己共役です。$T_\pm=J_\pm^{(j)}\otimes I+I\otimes J_\pm^{(k)}$ を代入すると

$$
\begin{aligned}
T_+|m,n\rangle
={}&\sqrt{(j-m)(j+m+1)}\,|m+1,n\rangle\\
&+\sqrt{(k-n)(k+n+1)}\,|m,n+1\rangle,\\
T_-|m,n\rangle
={}&\sqrt{(j+m)(j-m+1)}\,|m-1,n\rangle\\
&+\sqrt{(k+n)(k-n+1)}\,|m,n-1\rangle.
\end{aligned}
$$

ここでは[前講の昇降公式](../LREP7/index.md#thm-lrep7-spin-spectrum)を二つの因子へ別々に適用しました。$T_3$ の作用は二項の固有値を足すだけです。$T_\pm$ の交換子は最初に得た $[T_a,T_b]$ から従います。$\square$
<!-- proof-end -->

## 2. どのスピンが含まれるか

$T_3$ の固有値が同じ積状態は複数あります。例えば二つのスピン $\frac12$ では $|\uparrow\downarrow\rangle$ と $|\downarrow\uparrow\rangle$ はどちらも $M=0$ です。この重複の増減から、含まれる既約表現を数えられます。

[コンパクト群の有限次元表現の完全可約性](../LREP2/index.md#thm-lrep2-complete-reducibility)により、$V_j\otimes V_k$ は既約表現の直和に分解されます。$SU(2)$ では[既約表現の分類](../LREP6/index.md#thm-lrep6-classification)から、各成分はあるスピン $\ell$ の $V_\ell$ です。

<a id="thm-lrep8-clebsch-gordan"></a>

<!-- formal-statement-start -->
> **定理（SU(2)のClebsch–Gordan分解）**  
> $j,k\in\{0,\frac12,1,\frac32,\dots\}$ とする。二つの有限次元複素既約ユニタリ $SU(2)$ 表現の対角テンソル積は、表現として

$$
V_j\otimes V_k\cong
\bigoplus_{\ell=|j-k|}^{j+k}V_\ell
\qquad(\ell\ \text{は1刻み})
$$

> と分解する。各 $V_\ell$ の重複度はちょうど1であり、ほかの既約成分は現れない。
<!-- formal-statement-end -->

**証明の見取り図。** [完全可約性](../LREP2/index.md#thm-lrep2-complete-reducibility)で既約成分の存在を先に保証します。次に $T_3$ のウェイト $M$ の次元を積状態から数え、隣り合うウェイトの次元差で最高ウェイトの個数を求めます。[スピン $\ell$ のウェイト構造](../LREP7/index.md#thm-lrep7-spin-spectrum)が鍵です。

<!-- proof-start -->
### 証明

$j\ge k$ としてよく、$j<k$ なら二因子の交換 $v\otimes w\mapsto w\otimes v$ が群作用と可換な線形同型だからです。$J=j+k$ と書き、$M$ に対して

$$
W_M=\{v\in V_j\otimes V_k:T_3v=Mv\},\qquad
w(M)=\dim W_M
$$

と定めます。積基底を $m=j-a$、$n=k-b$ と書くと

$$
a=0,\dots,2j,\qquad b=0,\dots,2k,\qquad
M=J-(a+b).
$$

$M\ge0$ で取り得るウェイトは $J,J-1,\dots$（零を越えるまで）の格子に限られます。$r=J-M$ とすると $0\le r\le J\le2j$ です。$a+b=r$ を満たす整数組を数えます。

- $0\le r\le2k$ なら $b=0,\dots,r$ の各値に $a=r-b$ が対応し、$w(M)=r+1$。
- $2k\le r\le J$ なら $b=0,\dots,2k$ の各値に $a=r-b$ が対応し、$w(M)=2k+1$。この範囲では $0\le a\le2j$ も成立します。

したがって

$$
w(M)=
\begin{cases}
J-M+1,&j-k\le M\le J,\\
2k+1,&0\le M\le j-k.
\end{cases}
$$

端点 $M=j-k$ では二式がともに $2k+1$ になります。$M=J+1$ は現れず $w(J+1)=0$ と置きます。ここで $J$ と同じ整数・半整数格子上の $M\ge0$ だけを考えています。

[完全可約性](../LREP2/index.md#thm-lrep2-complete-reducibility)と[スピンの量子化](../LREP7/index.md#thm-lrep7-spin-spectrum)から、テンソル積はある重複度 $a_\ell\in\mathbb Z_{\ge0}$ を使い $\bigoplus_\ell V_\ell^{\oplus a_\ell}$ と書けます。$-I_2$ は $V_j\otimes V_k$ 上で[一周の符号公式](../LREP7/index.md#thm-lrep7-rotation-parity)により $(-1)^{2(j+k)}I$ として作用します。したがって出現する $\ell$ は $j+k$ と同じ整数・半整数の格子に限られます。

各 $V_\ell$ の $T_3$ ウェイトには $-\ell,-\ell+1,\dots,\ell$ が重複なしで現れます。ゆえに同じ格子の $M\ge0$ に対して

$$
w(M)=\sum_{\ell\ge M}a_\ell,\qquad
a_M=w(M)-w(M+1).
$$

先ほどの $w$ の式をこの差に代入すると、$M=j-k,j-k+1,\dots,j+k$ で $a_M=1$、それ以外で $a_M=0$ です。したがって $|j-k|$ から $j+k$ までの全既約成分が一度ずつ現れます。$\square$
<!-- proof-end -->

**次元の独立検算。** $j\ge k$ の場合、右辺には $2k+1$ 個のスピンがあり

$$
\begin{aligned}
\sum_{\ell=j-k}^{j+k}(2\ell+1)
&=\sum_{r=0}^{2k}\bigl(2(j-k+r)+1\bigr)\\
&=(2k+1)(2j-2k+1)+2k(2k+1)\\
&=(2j+1)(2k+1)=\dim(V_j\otimes V_k).
\end{aligned}
$$

これは証明とは別の次元検算です。次元だけが一致しても既約成分を同定したことにはならず、上のウェイト差が必要でした。

## 3. 積状態を全角運動量の基底に直す

分解の存在だけでは、具体的な状態が分かりません。各既約成分の $T^2$ と $T_3$ の共同固有ベクトルを $|\ell,M\rangle$ と書きます。上の定理で重複度は1なので、各状態は位相を除いて決まります。位相の選択は係数の符号を変えますが、物理的な分解・固有値には影響しません。

<a id="def-lrep8-cg-coefficients"></a>

<!-- formal-statement-start -->
> **定義（Clebsch–Gordan係数）**  
> スピン $j,k$ の正規直交積基底 $|j,m\rangle\otimes|k,n\rangle$ と、[Clebsch–Gordan分解](#thm-lrep8-clebsch-gordan)の各スピン $\ell$ の正規直交全角運動量基底 $|\ell,M\rangle$ に対し、

$$
C^{\ell M}_{jm,kn}
=\langle j,m;k,n\mid\ell,M\rangle
$$

> を**Clebsch–Gordan係数**と呼ぶ。合成基底は次の式で復元できる。

$
|\ell,M\rangle=\sum_{m,n} C^{\ell M}_{jm,kn}|j,m;k,n\rangle.
$

> また $m+n\ne M$ なら係数は零となる。各 $\ell$ の最高状態の位相を選ぶと係数が定まる。
<!-- formal-statement-end -->

<!-- definition-example-start: def-lrep8-cg-coefficients -->
**定義の確認。** $j=k=\frac12$ のとき、$|1,1\rangle=|\uparrow\uparrow\rangle$ を最高状態として位相を選びます。[全昇降作用](#lem-lrep8-total-commutators)から

$$
T_-|\uparrow\uparrow\rangle
=|\downarrow\uparrow\rangle+|\uparrow\downarrow\rangle,\qquad
\|T_-|\uparrow\uparrow\rangle\|^2=2.
$$

一方[スピン1の昇降係数](../LREP7/index.md#thm-lrep7-spin-spectrum)は $\sqrt2$ です。したがって

$$
|1,0\rangle=\frac{|\uparrow\downarrow\rangle+|\downarrow\uparrow\rangle}{\sqrt2},
\quad
C^{1,0}_{\frac12\frac12,\frac12-\frac12}
=C^{1,0}_{\frac12-\frac12,\frac12\frac12}
=\frac1{\sqrt2}.
$$

内積で係数を計算したので、定義の展開式・$M=0$ の選択則・正規化を実際に確認できました。
<!-- definition-example-end -->

<a id="thm-lrep8-singlet-triplet"></a>

<!-- formal-statement-start -->
> **定理（二つのスピン1/2の一重項と三重項）**  
> $V_{1/2}\otimes V_{1/2}$ の対角 $SU(2)$ 表現は $V_1\oplus V_0$ に分解する。$|\uparrow\rangle,|\downarrow\rangle$ を各因子の $J_3$ 固有値 $\pm\frac12$ の規格化状態とする。次の正規直交基底で全角運動量 $T^2,T_3$ が同時対角化される。

$$
\begin{aligned}
|1,1\rangle&=|\uparrow\uparrow\rangle,\\
|1,0\rangle&=(|\uparrow\downarrow\rangle+|\downarrow\uparrow\rangle)/\sqrt2,\\
|1,-1\rangle&=|\downarrow\downarrow\rangle,\\
|0,0\rangle&=(|\uparrow\downarrow\rangle-|\downarrow\uparrow\rangle)/\sqrt2.
\end{aligned}
$$

> 上の三つは $T^2=2I$ の三重項、最後は $T^2=0$ の一重項である。
<!-- formal-statement-end -->

**証明の見取り図。** 最高状態から [昇降公式](#lem-lrep8-total-commutators)で三重項を作り、直交補空間のベクトルが一重項になることを演算子の作用で確認します。

<!-- proof-start -->
### 証明

$|\uparrow\uparrow\rangle$ は $T_3$ の固有値1を持ち、$T_+$ で消えます。[最高ウェイトの分類](../LREP7/index.md#thm-lrep7-spin-spectrum)から、この状態から生じる既約成分はスピン1です。[全昇降作用](#lem-lrep8-total-commutators)で

$$
T_-|\uparrow\uparrow\rangle
=|\downarrow\uparrow\rangle+|\uparrow\downarrow\rangle
=\sqrt2\,|1,0\rangle
$$

を得ます。さらに

$$
\begin{aligned}
T_-(|\uparrow\downarrow\rangle+|\downarrow\uparrow\rangle)
&=|\downarrow\downarrow\rangle+|\downarrow\downarrow\rangle\\
&=2|\downarrow\downarrow\rangle
=\sqrt2(\sqrt2\,|1,-1\rangle).
\end{aligned}
$$

$|1,-1\rangle=|\downarrow\downarrow\rangle$ となります。四つの積基底を使った内積を計算するとこの三状態は互いに直交し、各ノルムは1です。

残りの $M=0$ の直交ベクトルとして

$$
s=(|\uparrow\downarrow\rangle-|\downarrow\uparrow\rangle)/\sqrt2
$$

を取ります。$\langle s,s\rangle=1$、$\langle1,0|s\rangle=(1-1)/2=0$ です。また $T_3s=0$ であり、

$$
T_+s=(|\uparrow\uparrow\rangle-|\uparrow\uparrow\rangle)/\sqrt2=0,\quad
T_-s=(|\downarrow\downarrow\rangle-|\downarrow\downarrow\rangle)/\sqrt2=0.
$$

ゆえに $T_1s=(T_++T_-)s/2=0$、$T_2s=(T_+-T_-)s/(2i)=0$ で、$T^2s=0$。三重項上の $T^2$ は[スピン1のCasimir固有値](../LREP7/index.md#thm-lrep7-spin-spectrum)より $1(1+1)=2$ です。三重項3次元と一重項1次元の和は積空間の4次元に一致し、全部を張ります。$\square$
<!-- proof-end -->

### 交換で見える対称性

二つの因子が同じ表現なので、入れ替え $P(v\otimes w)=w\otimes v$ は元の空間への線形演算子です。$P^2=I$、$P(D(U)\otimes D(U))=(D(U)\otimes D(U))P$ です。上の四つの基底に作用させると

$$
P|1,M\rangle=+|1,M\rangle,\qquad
P|0,0\rangle=-|0,0\rangle.
$$

したがって三重項は対称テンソル、 一重項は交代テンソルです。$P$ の固有値と $T^2$ の固有値がこの例では対応していますが、これだけで任意の $j,k$ の入れ替え対称性を結論してはいけません。$j\ne k$ では入れ替えは $V_j\otimes V_k$ から $V_k\otimes V_j$ への写像です。

## 4. スピン1とスピン1/2の合成

もう一つの例で、係数の平方根が単なる暗記ではなく昇降と直交条件で決まることを見ます。$j=1,k=\frac12$ に[分解定理](#thm-lrep8-clebsch-gordan)を適用すると

$$
V_1\otimes V_{1/2}\cong V_{3/2}\oplus V_{1/2},
\qquad 3\cdot2=4+2.
$$

$|a,\uparrow\rangle=|1,a\rangle\otimes|\frac12,\frac12\rangle$、$|a,\downarrow\rangle=|1,a\rangle\otimes|\frac12,-\frac12\rangle$ とします。最高状態は $|\frac32,\frac32\rangle=|1,\uparrow\rangle$ です。実際に下降させると

$$
\begin{aligned}
T_-|1,\uparrow\rangle
&=\sqrt2\,|0,\uparrow\rangle+|1,\downarrow\rangle,\\
\sqrt3\,|\tfrac32,\tfrac12\rangle
&=\sqrt2\,|0,\uparrow\rangle+|1,\downarrow\rangle.
\end{aligned}
$$

したがって

$$
|\tfrac32,\tfrac12\rangle
=\sqrt{\tfrac23}|0,\uparrow\rangle+
\sqrt{\tfrac13}|1,\downarrow\rangle.
$$

この状態と直交し、ノルム1である $M=\frac12$ の残りのベクトルとして、位相を選んで

$$
|\tfrac12,\tfrac12\rangle
=\sqrt{\tfrac13}|0,\uparrow\rangle-
\sqrt{\tfrac23}|1,\downarrow\rangle
$$

を取れます。内積は $\sqrt{2/9}-\sqrt{2/9}=0$、ノルム二乗は $1/3+2/3=1$ です。さらに $T_+$ を作用させると

$$
T_+|\tfrac12,\tfrac12\rangle
=\sqrt{\tfrac13}\sqrt2\,|1,\uparrow\rangle
-\sqrt{\tfrac23}|1,\uparrow\rangle=0
$$

であり、確かにスピン $\frac12$ 成分の最高状態です。$T_-$ で残りの二つの $M<0$ 状態も求められます。

## 5. 演習

### Level A

<a id="ex-lrep8-a01"></a>
#### LREP8-A01 全磁気量子数
- Level: A

$j=1,k=\frac12$ の積状態 $|m,n\rangle$ を六つ列挙し、$T_3$ の固有値とその重複度を求めよ。

<!-- solution-start -->
**詳細解答。** [全角運動量の定義](#def-lrep8-total-spin)から $T_3|m,n\rangle=(m+n)|m,n\rangle$ です。$m=1,0,-1$、$n=\frac12,-\frac12$ を一つずつ足すと

$$
\begin{array}{c|rrrrrr}
(m,n)&(1,\frac12)&(1,-\frac12)&(0,\frac12)&(0,-\frac12)&(-1,\frac12)&(-1,-\frac12)\\
M&\frac32&\frac12&\frac12&-\frac12&-\frac12&-\frac32
\end{array}
$$

となります。重複度は $M=\pm3/2$ でそれぞれ1、$M=\pm1/2$ でそれぞれ2です。和 $1+2+2+1=6$ は $\dim(V_1\otimes V_{1/2})=3\cdot2$ と一致します。
<!-- solution-end -->

<a id="ex-lrep8-a02"></a>
#### LREP8-A02 三重項の下降
- Level: A

$j=k=\frac12$ とし、$|\uparrow\uparrow\rangle$ に $T_-$ を一回、二回作用させよ。規格化した $|1,0\rangle,|1,-1\rangle$ を求めよ。

<!-- solution-start -->
**詳細解答。** [全角運動量の昇降作用](#lem-lrep8-total-commutators)から

$$
T_-|\uparrow\uparrow\rangle
=|\downarrow\uparrow\rangle+|\uparrow\downarrow\rangle.
$$

二項は直交する規格化ベクトルなのでノルムは $\sqrt2$ です。よって $|1,0\rangle=(|\downarrow\uparrow\rangle+|\uparrow\downarrow\rangle)/\sqrt2$ です。もう一度下げると

$$
T_-|1,0\rangle
=\frac{|\downarrow\downarrow\rangle+|\downarrow\downarrow\rangle}{\sqrt2}
=\sqrt2\,|\downarrow\downarrow\rangle.
$$

[スピン1の下降係数](../LREP7/index.md#thm-lrep7-spin-spectrum)も $\sqrt2$ なので、$|1,-1\rangle=|\downarrow\downarrow\rangle$ です。
<!-- solution-end -->

<a id="ex-lrep8-a03"></a>
#### LREP8-A03 一重項が回転で不変である理由
- Level: A

$s=(|\uparrow\downarrow\rangle-|\downarrow\uparrow\rangle)/\sqrt2$ について、$T_3s=T_+s=T_-s=0$ を確かめ、$SU(2)$ の対角作用が $s$ を固定する理由を述べよ。

<!-- solution-start -->
**詳細解答。** 各積状態の $M$ は零なので $T_3s=0$。[全昇降式](#lem-lrep8-total-commutators)から

$$
T_+s=\frac{|\uparrow\uparrow\rangle-|\uparrow\uparrow\rangle}{\sqrt2}=0,\qquad
T_-s=\frac{|\downarrow\downarrow\rangle-|\downarrow\downarrow\rangle}{\sqrt2}=0.
$$

$T_1=(T_++T_-)/2$、$T_2=(T_+-T_-)/(2i)$ より全 $T_a$ が $s$ を零へ写します。[指数曲線に沿った群表現公式](../LREP3/index.md#thm-lrep3-differentiation)を使うと各 $\exp(tA_a)$ は $s$ に恒等作用します。$SU(2)$ はこれらの回転で生成されるため、すべての $U\in SU(2)$ で $(D(U)\otimes D(U))s=s$ です。
<!-- solution-end -->

<a id="ex-lrep8-a04"></a>
#### LREP8-A04 合成スピンの候補と次元
- Level: A

$j=2,k=\frac12$ の既約成分のスピン、次元、総次元を求めよ。

<!-- solution-start -->
**詳細解答。** [分解定理](#thm-lrep8-clebsch-gordan)の下端は $|2-\frac12|=\frac32$、上端は $2+\frac12=\frac52$ なので、$\ell=\frac32,\frac52$ です。次元はそれぞれ $2(\frac32)+1=4$、$2(\frac52)+1=6$。和は10で、元の積空間の次元 $(2\cdot2+1)(2\cdot\frac12+1)=5\cdot2=10$ に一致します。
<!-- solution-end -->

### Level B

<a id="ex-lrep8-b01"></a>
#### LREP8-B01 直交条件から合成係数を求める
- Level: B

$j=1,k=\frac12$ で $|\frac32,\frac32\rangle=|1,\uparrow\rangle$ を最高状態とする。$M=\frac12$ の二つの規格化された合成状態を $|0,\uparrow\rangle,|1,\downarrow\rangle$ で表し、後者が $T_+$ で消えることを検算せよ。

<!-- solution-start -->
**詳細解答。** [全昇降作用](#lem-lrep8-total-commutators)から

$$
T_-|1,\uparrow\rangle=\sqrt2|0,\uparrow\rangle+|1,\downarrow\rangle.
$$

そのノルム二乗は $2+1=3$ なので、[昇降係数](../LREP7/index.md#thm-lrep7-spin-spectrum)を使い

$$
|\tfrac32,\tfrac12\rangle
=\sqrt{\tfrac23}|0,\uparrow\rangle+\sqrt{\tfrac13}|1,\downarrow\rangle.
$$

直交補空間の候補を $a|0,\uparrow\rangle+b|1,\downarrow\rangle$ とすると、直交条件は $\sqrt{2/3}a+\sqrt{1/3}b=0$ で $b=-\sqrt2a$ です。規格化 $|a|^2+|b|^2=1$ から $|a|=1/\sqrt3$。$a$ を正実数に選び

$$
|\tfrac12,\tfrac12\rangle
=\tfrac1{\sqrt3}|0,\uparrow\rangle-\sqrt{\tfrac23}|1,\downarrow\rangle.
$$

$T_+|0,\uparrow\rangle=\sqrt2|1,\uparrow\rangle$、$T_+|1,\downarrow\rangle=|1,\uparrow\rangle$ なので、$T_+$ の像の係数は $\sqrt{2/3}-\sqrt{2/3}=0$ です。これは $\ell=1/2$ の最高状態の条件です。
<!-- solution-end -->

<a id="ex-lrep8-b02"></a>
#### LREP8-B02 Casimirを行列で検証する
- Level: B

$j=k=\frac12$ の $M=0$ 部分空間を順序付き基底 $(|\uparrow\downarrow\rangle,|\downarrow\uparrow\rangle)$ で表す。$T^2$ の行列を計算して固有値と固有ベクトルを求めよ。

<!-- solution-start -->
**詳細解答。** [角運動量のCasimir](../LREP7/index.md#def-lrep7-casimir)と [全角運動量の定義](#def-lrep8-total-spin)を展開すると

$$
T^2=\tfrac32I+
2\sum_{a=1}^3 J_a^{(1/2)}\otimes J_a^{(1/2)}.
$$

ここで $\sum_a J_a\otimes J_a=J_3\otimes J_3+(J_+\otimes J_-+J_-\otimes J_+)/2$ です。$M=0$ の基底上では $J_3\otimes J_3=-I/4$ であり、交換項が基底の二つを互いに移します。よって

$$
[T^2]_{M=0}=
\tfrac32I-\tfrac12I+
\begin{pmatrix}0&1\\1&0\end{pmatrix}
=\begin{pmatrix}1&1\\1&1\end{pmatrix}.
$$

固有方程式は $(1-\lambda)^2-1=\lambda(\lambda-2)=0$。$\lambda=2$ の規格化固有ベクトルは $(1,1)/\sqrt2$、$\lambda=0$ は $(1,-1)/\sqrt2$ です。これは[一重項と三重項](#thm-lrep8-singlet-triplet)で得た $|1,0\rangle,|0,0\rangle$ に一致します。
<!-- solution-end -->

<a id="ex-lrep8-b03"></a>
#### LREP8-B03 ウェイトの差から既約成分を復元する
- Level: B

$j=\frac32,k=1$ の正の全磁気量子数ごとの重複度を積状態で数え、どの $\ell$ が現れるかを求め、次元を検算せよ。

<!-- solution-start -->
**詳細解答。** $M=m+n$ で $m=3/2,1/2,-1/2,-3/2$、$n=1,0,-1$ を列挙すると、$M=5/2$ は $(3/2,1)$ の1通り、$M=3/2$ は $(3/2,0),(1/2,1)$ の2通り、$M=1/2$ は $(3/2,-1),(1/2,0),(-1/2,1)$ の3通りです。$w(7/2)=0$ とおくと[分解定理のウェイト差](#thm-lrep8-clebsch-gordan)から

$$
a_{5/2}=1-0=1,\quad
a_{3/2}=2-1=1,\quad
a_{1/2}=3-2=1.
$$

他は零です。したがって $V_{5/2}\oplus V_{3/2}\oplus V_{1/2}$ が現れ、次元は $6+4+2=12$。元の空間の次元 $4\cdot3=12$ と一致します。
<!-- solution-end -->

<a id="ex-lrep8-b04"></a>
#### LREP8-B04 中心元と回転群への降下
- Level: B

二つのスピンのテンソル積上で $SU(2)$ の中心元 $-I_2$ がどう作用するかを求め、$(j,k)=(\frac12,\frac12), (1,\frac12), (1,1)$ の場合に $SO(3)$ の通常表現へ降りるかを判断せよ。スピンの混合直和との違いも述べよ。

<!-- solution-start -->
**詳細解答。** [一周の符号公式](../LREP7/index.md#thm-lrep7-rotation-parity)から各因子で $D_j(-I_2)=(-1)^{2j}I$ です。[テンソル積表現](../LREP4/index.md#def-lrep4-tensor-product)によって、積ではスカラーが掛かり

$$
(D_j\otimes D_k)(-I_2)=(-1)^{2j+2k}I.
$$

$(\frac12,\frac12)$ では指数2なので $+I$、$(1,\frac12)$ では指数3なので $-I$、$(1,1)$ では指数4なので $+I$ です。[被覆核による降下判定](../LREP3/index.md#thm-lrep3-descent-criterion)から最初と最後は通常表現へ降り、中間は降りません。ただし中間でも中心元は全空間上で同じスカラー $-1$ なので、射影類を用いる表現は定まります。一方、整数・半整数スピンを**直和**した場合には中心元の符号がブロックごとに異なり、全空間のスカラーにすらならない場合があることを[前講の例](../LREP7/index.md#thm-lrep7-rotation-parity)と比べてください。
<!-- solution-end -->

### Level C

<a id="ex-lrep8-c01"></a>
#### LREP8-C01 二つのスピン1の完全分解
- Level: C

$j=k=1$ に対して以下を示せ。

1. 既約成分のスピンと次元を求めよ。
2. $|2,2\rangle=|1,1;1,1\rangle$、$|1,1\rangle=(|1,1;1,0\rangle-|1,0;1,1\rangle)/\sqrt2$ が、それぞれスピン2・1の最高状態であると確かめよ。
3. $s=(|1,1;1,-1\rangle-|1,0;1,0\rangle+|1,-1;1,1\rangle)/\sqrt3$ がスピン0の状態であることを示せ。
4. 三成分の直和が全9次元を張る理由を説明せよ。

<!-- solution-start -->
**詳細解答。**

**設問1。** [分解定理](#thm-lrep8-clebsch-gordan)で $|1-1|=0$ から $1+1=2$ まで、$\ell=0,1,2$ がそれぞれ一度現れます。次元は $1,3,5$ です。

**設問2。** $T_3|1,1;1,1\rangle=2|1,1;1,1\rangle$、$T_+$ は両因子で上端に達しているため零です。正規化済みで最高ウェイト2です。一方、差の二項は直交してノルム二乗は $(1+1)/2=1$、$T_3$ の固有値は両方1です。[全昇降作用](#lem-lrep8-total-commutators)を使うと

$$
T_+|1,1;1,0\rangle=\sqrt2|1,1;1,1\rangle,\quad
T_+|1,0;1,1\rangle=\sqrt2|1,1;1,1\rangle.
$$

差を取ると消えます。したがって固有値1で $T_+$ により消える規格化状態なので、スピン1の最高状態です。

**設問3。** 三つの積状態は互いに直交し、それぞれ全磁気量子数0です。よって $\|s\|^2=(1+1+1)/3=1$、$T_3s=0$。それぞれに $T_+$ を作用させると

$$
\begin{aligned}
T_+|1,1;1,-1\rangle&=\sqrt2|1,1;1,0\rangle,\\
T_+|1,0;1,0\rangle&=\sqrt2|1,1;1,0\rangle+\sqrt2|1,0;1,1\rangle,\\
T_+|1,-1;1,1\rangle&=\sqrt2|1,0;1,1\rangle.
\end{aligned}
$$

係数 $(+1,-1,+1)/\sqrt3$ を掛けて足すと零です。$T_-$ に対しては

$$
\begin{aligned}
T_-|1,1;1,-1\rangle&=\sqrt2|1,0;1,-1\rangle,\\
T_-|1,0;1,0\rangle&=\sqrt2|1,-1;1,0\rangle+\sqrt2|1,0;1,-1\rangle,\\
T_-|1,-1;1,1\rangle&=\sqrt2|1,-1;1,0\rangle,
\end{aligned}
$$

なのでこちらも消えます。$T_a s=0$ が全ての $a$ で成立し $T^2s=0$、スピン0の状態です。

**設問4。** [完全可約性と分解定理](#thm-lrep8-clebsch-gordan)により、ここで見つけた互いに異なる最高ウェイトの成分は直和となり、それぞれ次元5・3・1です。$5+3+1=9=(2\cdot1+1)^2$ で、これらが積空間を尽くします。スピン1成分を一つの最高状態だけで終わらせず、その下降鎖が三次元を張ることは[スピンの昇降定理](../LREP7/index.md#thm-lrep7-spin-spectrum)から従います。
<!-- solution-end -->

## 6. まとめと次講

二つのスピンの合成は、積空間の対角 $SU(2)$ 表現を既約成分へ分ける操作です。スピン $\ell$ は $|j-k|$ から $j+k$ まで1刻みで各一回現れます。Clebsch–Gordan係数は積基底と全角運動量基底の間の変換係数で、昇降・正規化・直交条件から計算できます。

次の **LREP9「Lorentz Lie環の回転とboost」** では、回転生成子にboost生成子を加えると交換関係がどう変わるかを調べます。
