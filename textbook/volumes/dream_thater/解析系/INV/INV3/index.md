# INV3 特異系から可解性を判定できるか

<!-- definition-example-audit: strict -->

INV1 の[有限次元の最小ノルム解](../INV1/index.md#thm-inv1-minimum-norm)では、特異値ごとに観測成分を割ると復元できました。INV2 の[コンパクト作用素による不安定性](../INV2/index.md#thm-inv2-compact-instability)は、無限次元でその割り算が危険になる理由を示しました。

では、**正確な観測値が与えられたとき、そもそも元の未知量が存在するか**を、個々の特異値から判定できるでしょうか。

たとえば $\ell^2$ の対角観測

$$
(Dx)_n=\frac{x_n}{n}
$$

を考えます。データ $y=(1,1/2,1/3,\ldots)$ は $\sum_{n\ge1}1/n^2<\infty$ なので $\ell^2$ に属します。しかし $Dx=y$ とすると各成分で $x_n=n y_n=1$ が必要で、$(1,1,\ldots)\notin\ell^2$ です。**データ空間に入ることと、観測で実現できることは異なります。**

この講義では、コンパクト作用素の特異系を作り、核によって失われる情報と、特異値で割った係数の二乗和という二つの条件を導きます。さらに、有限項で復元したときに何が起こるかを具体的に検算します。

以降は **実 Hilbert 空間** $X,Y$ とコンパクト線形作用素 $A:X\to Y$ を考えます。$A^*:Y\to X$ は Hilbert 随伴であり、任意の $x\in X$、$y\in Y$ について

$$
\langle Ax,y\rangle_Y=\langle x,A^*y\rangle_X
$$

を満たします。存在と有界性は[Hilbert 随伴の定理](../../F0/F0-02C3B/index.md#thm-f0-02c3b-hilbert-adjoint)で既習です。以前の章では Hilbert 随伴を $A^\dagger$ と書く場合がありましたが、**本章は随伴を $A^*$ と書き、$A^\dagger$ を最小ノルムの一般化逆に限る**ことで区別します。

---


## 1. 見える方向と見えない方向を分ける

$Ax$ だけからは $\ker A$ の方向を識別できません。実際 $k\in\ker A$ なら $A(x+k)=Ax$ です。逆に核に直交する部分なら、観測を変えずに余計な成分を取り除けます。

まず次の二つの閉部分空間を導入します。

$$
X_0:=(\ker A)^\perp\subseteq X,
\qquad
Y_0:=\overline{\mathcal R(A)}\subseteq Y.
$$

$X_0$ は観測に寄与する未知量の方向、$Y_0$ は実現可能データの極限まで含めた方向です。一般には $\mathcal R(A)$ と $Y_0$ は一致しません。

随伴の定義に $Ax$ と $y$ を代入すると、次が分かります。

$$
\begin{aligned}
y\in\mathcal R(A)^\perp
&\Longleftrightarrow \langle Ax,y\rangle_Y=0\quad(\forall x\in X)\\
&\Longleftrightarrow \langle x,A^*y\rangle_X=0\quad(\forall x\in X)\\
&\Longleftrightarrow A^*y=0.
\end{aligned}
$$

従って $\mathcal R(A)^\perp=\ker A^*$ です。閉部分空間への[直交分解](../../F0/F0-02C1A/index.md#thm-f0-02c1a-orthogonal-decomposition)を $Y_0$ に適用すると

$$
Y=Y_0\oplus\ker A^*,
\qquad
Y_0=(\ker A^*)^\perp.
$$

ここで最初の障害が見えます。もし $Ax=y$ なら $y\in Y_0$、すなわち $y\perp\ker A^*$ が必要です。ただし、この直交条件だけではまだ足りません。

## 2. 特異値に沿って未知量を展開する

有限行列の[特異値分解](../../../基礎科目/F0/F0-00F2/index.md#thm-f0-00f2-svd)と同様、未知量の方向 $v_j$ を観測側の方向 $u_j$ に写し、倍率を正の数 $\sigma_j$ で表したいと考えます。

無限次元では特異ベクトルが空間全体の基底になるとは限りません。核の方向は特異値が零で、観測側にも到達しない方向があります。そこで、正の特異値に対応するベクトルがそれぞれ $X_0,Y_0$ を尽くすことを条件にします。

<a id="def-inv3-singular-system"></a>

<!-- formal-statement-start -->
> **定義（コンパクト作用素の完全特異系）**
> 実 Hilbert 空間 $X,Y$ の間のコンパクト作用素 $A:X\to Y$ に対し、有限個または可算無限個の組 $(\sigma_j,u_j,v_j)_{j\in J}$ が **完全特異系**であるとは、次をすべて満たすことをいう。
>
> 1. $\sigma_j>0$、$u_j\in Y$、$v_j\in X$ であり、$\|u_j\|_Y=\|v_j\|_X=1$。
> 2. $(u_j)_{j\in J}$ と $(v_j)_{j\in J}$ はそれぞれ正規直交系である。
> 3. 各 $j\in J$ に対して $Av_j=\sigma_j u_j$、$A^*u_j=\sigma_j v_j$。
> 4. $(v_j)_{j\in J}$ は $(\ker A)^\perp$ の、$(u_j)_{j\in J}$ は $\overline{\mathcal R(A)}$ の完全正規直交系である。
>
> $A=0$ なら $J$ は空集合とし、両閉部分空間は $\{0\}$ とする。無限個のときは特異値を重複度込みで $\sigma_1\ge\sigma_2\ge\cdots>0$ と並べる。
<!-- formal-statement-end -->

<!-- definition-example-start: def-inv3-singular-system -->
### 例：$\ell^2$ 対角観測の完全特異系

**定義の確認**：正値性・二組の正規直交性・随伴との関係・完全性を順に検査します。

標準基底 $e_j=(0,\ldots,0,1,0,\ldots)$ を使い、$D:\ell^2\to\ell^2$、$(Dx)_j=x_j/j$ とします。任意の $j$ について

$$
De_j=\frac1j e_j,\qquad
\langle Dx,y\rangle=\sum_j\frac{x_jy_j}{j}
=\langle x,Dy\rangle.
$$

よって $D^*=D$ です。$\sigma_j=1/j$、$u_j=v_j=e_j$ と置けば、正規直交性、正値性、$Dv_j=\sigma_ju_j$、$D^*u_j=\sigma_jv_j$ を直接確認できます。$\ker D=\{0\}$ なので $X_0=\ell^2$ です。また有限台の列 $z$ は $D(jz_j)_j=z$ と書け、有限台の列は $\ell^2$ に稠密なので $Y_0=\ell^2$ です。標準基底が両空間の完全正規直交系であることも確かめられました。

なお $1/j\to0$ だから[対角作用素のコンパクト性判定](../../FA/FA6/index.md#thm-fa6-diagonal-criterion)により $D$ はコンパクトです。これで定義の全条件を満たします。
<!-- definition-example-end -->

## 3. コンパクト性から完全特異系を作る

一般のコンパクト作用素 $A$ は自己共役とは限りません。そこで $A$ 自身を固有値分解しようとせず、同じ入力空間上の

$$
T:=A^*A:X\to X
$$

を考えます。[Hilbert随伴の定義](../../F0/F0-02C3A/index.md#def-f0-02c3a-hilbert-adjoint)を $A$ に適用すると、任意の $x,z\in X$ について

$$
\begin{aligned}
\langle Tx,x\rangle_X
&=\langle Ax,Ax\rangle_Y=\|Ax\|_Y^2\ge0,\\
\langle Tx,z\rangle_X
&=\langle Ax,Az\rangle_Y
=\langle x,A^*Az\rangle_X
=\langle x,Tz\rangle_X.
\end{aligned}
$$

です。$T$ は非負かつ自己共役です。さらに $A$ はコンパクト、$A^*$ は有界なので[コンパクト作用素の合成に関する定理](../../FA/FA6/index.md#thm-fa6-ideal-property)を $A^*\circ A$ に適用でき、$T$ もコンパクトです。したがって $T$ に[コンパクト自己共役作用素のスペクトル定理](../../FA/FA7/index.md#thm-fa7-compact-self-adjoint-spectral)を使えます。

<a id="thm-inv3-singular-expansion"></a>

<!-- formal-statement-start -->
> **定理（コンパクト作用素の特異系と展開）**
> $X,Y$ を実 Hilbert 空間、$A:X\to Y$ をコンパクト線形作用素とする。このとき $A$ は[完全特異系](#def-inv3-singular-system) $(\sigma_j,u_j,v_j)_{j\in J}$ を持つ。特異系が無限なら $\sigma_j\downarrow0$ である。各 $x\in X$、$y\in Y$ について

$$
Ax=\sum_{j\in J}\sigma_j\langle x,v_j\rangle_Xu_j,
\qquad
A^*y=\sum_{j\in J}\sigma_j\langle y,u_j\rangle_Yv_j
$$

> がそれぞれ $Y$ と $X$ のノルムで収束する。有限の $J$ と空の $J$ の場合は有限和・空和として読む。
<!-- formal-statement-end -->

### 証明の見取り図

$A^*A$ の正の固有値を $\sigma_j^2$ と置き、その固有ベクトルを $v_j$ とします。$Av_j$ を長さ $\sigma_j$ で割れば $u_j$ ができます。残る要点は、これらの方向が核の直交補と値域の閉包を本当に尽くすと示すことです。

<!-- proof-start -->
### 証明

$T=A^*A$ は前述の通りコンパクト・自己共役・非負です。[コンパクト自己共役作用素のスペクトル定理](../../FA/FA7/index.md#thm-fa7-compact-self-adjoint-spectral)により、非零固有値に属する固有ベクトルを重複度だけ数えて正規直交化し、$(\lambda_j,v_j)_{j\in J}$ と書けます。非零固有値は実数で、単位固有ベクトル $v_j$ に対し

$$
\lambda_j=\langle Tv_j,v_j\rangle_X
=\langle Av_j,Av_j\rangle_Y=\|Av_j\|_Y^2>0
$$

です。ここで $\sigma_j=\sqrt{\lambda_j}$ と置きます。$T$ の核については

$$
Tx=0\ \Longrightarrow\ \|Ax\|_Y^2=\langle Tx,x\rangle_X=0
\ \Longrightarrow\ Ax=0,
$$

逆向きは $Ax=0\Rightarrow Tx=A^*0=0$ より、$\ker T=\ker A$ です。従って先ほどの固有空間分解から $(v_j)$ は $X_0=(\ker A)^\perp$ を尽くします。無限個のとき $\lambda_j\to0$ なので $\sigma_j\to0$ です。

次に $u_j:=Av_j/\sigma_j$ と定めます。$j,k\in J$ について

$$
\begin{aligned}
\langle u_j,u_k\rangle_Y
&=\frac{\langle Av_j,Av_k\rangle_Y}{\sigma_j\sigma_k}\\
&=\frac{\langle A^*Av_j,v_k\rangle_X}{\sigma_j\sigma_k}\\
&=\frac{\lambda_j\langle v_j,v_k\rangle_X}{\sigma_j\sigma_k}
=\delta_{jk}.
\end{aligned}
$$

また

$$
Av_j=\sigma_ju_j,\qquad
A^*u_j=\frac{A^*Av_j}{\sigma_j}
=\sigma_jv_j.
$$

$(u_j)$ の完全性を示します。$y\in Y_0$ が全ての $u_j$ に直交すると仮定します。任意の $k\in\ker A$ に対して

$$
\langle A^*y,k\rangle_X=\langle y,Ak\rangle_Y=0
$$

だから $A^*y\in X_0$ です。他方、各 $v_j$ に対し

$$
\langle A^*y,v_j\rangle_X
=\langle y,Av_j\rangle_Y
=\sigma_j\langle y,u_j\rangle_Y=0.
$$

$(v_j)$ は $X_0$ を尽くすので $A^*y=0$、よって $y\in\ker A^*$ です。しかし $Y_0=(\ker A^*)^\perp$ でもあるから $y=0$。これで $(u_j)$ は $Y_0$ を尽くします。

最後に $x=x_0+k$（$x_0\in X_0$、$k\in\ker A$）と分解します。[直交分解](../../F0/F0-02C1A/index.md#thm-f0-02c1a-orthogonal-decomposition)と $(v_j)$ の完全性により

$$
x_0=\lim_{N\to\infty}\sum_{j=1}^N\langle x,v_j\rangle_Xv_j
$$

がノルム収束します。$A$ は有界なので極限を通過し、$Ak=0$ を使うと

$$
Ax=\lim_{N\to\infty}\sum_{j=1}^N
\langle x,v_j\rangle_XAv_j
=\sum_j\sigma_j\langle x,v_j\rangle_Xu_j.
$$

同様に $A^*y$ は $\ker A$ に直交し、$(v_j)$ によるノルム収束展開の各係数が

$$
\langle A^*y,v_j\rangle_X
=\sigma_j\langle y,u_j\rangle_Y
$$

なので第二の式も従います。有限・空の $J$ でも同じ議論が成立します。$\square$
<!-- proof-end -->

重要なのは、$A$ に自己共役性を仮定しなかったことです。$A^*A$ のスペクトルを介したため、異なる Hilbert 空間間の観測でも扱えます。

---

## 4. Picard 条件はなぜ二段構えか

観測 $y$ を完全特異系の方向ごとに $y_j:=\langle y,u_j\rangle_Y$ と測ります。もし $Ax=y$ なら[特異系の展開](#thm-inv3-singular-expansion)から

$$
y_j=\langle Ax,u_j\rangle_Y
=\langle x,A^*u_j\rangle_X
=\sigma_j\langle x,v_j\rangle_X.
$$

したがって元の係数は形式的に $y_j/\sigma_j$ です。しかし、各係数が計算できても、その列が Hilbert 空間の元になるとは限りません。さらに $u_j$ の張る空間の外のデータ成分は、どの $x$ からも生じません。

この二つの障害を同時に検査するのが Picard 条件です。

<a id="def-inv3-picard-condition"></a>

<!-- formal-statement-start -->
> **定義（Picard可解条件）**
> 実 Hilbert 空間間のコンパクト作用素 $A:X\to Y$ の完全特異系 $(\sigma_j,u_j,v_j)_{j\in J}$ に対し、データ $y\in Y$ が **Picard可解条件**を満たすとは、次の二条件がともに成り立つことをいう。
>
> **（P1）観測方向の整合性**：$y\perp\ker A^*$。
>
> **（P2）逆係数の二乗総和可能性**：

$$
\sum_{j\in J}
\frac{|\langle y,u_j\rangle_Y|^2}{\sigma_j^2}<\infty.
$$

> $J$ が空なら和は零とする。
<!-- formal-statement-end -->

<!-- definition-example-start: def-inv3-picard-condition -->
### 例：二乗総和できるデータでも逆係数は別

**定義の確認**：観測方向の整合性と逆係数の二乗総和を、それぞれ異なる検査として計算します。

先ほどの $D:\ell^2\to\ell^2$ では $\ker D^*=\{0\}$ なので全ての $y\in\ell^2$ が（P1）を満たします。$y_n=1/n^2$ とすると

$$
\sum_n\frac{|y_n|^2}{(1/n)^2}
=\sum_n\frac1{n^2}<\infty
$$

であり、（P2）も成立します。実際 $x_n=n y_n=1/n$ と置けば $x\in\ell^2$、$Dx=y$ です。

これに対し $z_n=1/n$ なら $z\in\ell^2$、（P1）も成立しますが、

$$
\sum_n\frac{|z_n|^2}{(1/n)^2}
=\sum_n1=\infty.
$$

よって（P2）が壊れます。条件を「観測係数 $\langle y,u_j\rangle$ 自体が二乗総和可能」と読み替えてはいけません。それは $y\in Y$ からすでに従う、ずっと弱い条件です。
<!-- definition-example-end -->

別の種類の障害も確認します。$H=\ell^2\oplus\mathbb R$ として

$$
B((x_n),t)=((x_n/n),0)
$$

と置きます。$B$ も定義の前提であるコンパクト性を満たします。最初の $N$ 座標だけを残す有限ランク作用素 $B_N$ について

$$
\|(B-B_N)((x_n),t)\|_H^2
=\sum_{n>N}\frac{|x_n|^2}{n^2}
\le\frac{\|((x_n),t)\|_H^2}{(N+1)^2}
$$

なので、$\|B-B_N\|\to0$ です。[有限ランク作用素のコンパクト性](../../FA/FA6/index.md#thm-fa6-finite-rank-compact)と[コンパクト作用素のノルム閉性](../../FA/FA6/index.md#thm-fa6-norm-closed)により $B$ はコンパクトです。

直交和内積を展開すると、任意の $((x_n),t),((z_n),s)\in H$ に対して

$$
\langle B((x_n),t),((z_n),s)\rangle_H
=\sum_{n\ge1}\frac{x_nz_n}{n}
=\langle ((x_n),t),B((z_n),s)\rangle_H
$$

となり、$B^*=B$ です。核と、正の特異値に対応するベクトルを具体的に書くと

$$
\ker B=\ker B^*=\{0\}\oplus\mathbb R,
\qquad
\sigma_j=\frac1j>0,\quad u_j=v_j=(e_j,0).
$$

標準基底の直交性から二組とも正規直交系であり、実際に

$$
Bv_j=\sigma_ju_j,\qquad B^*u_j=\sigma_jv_j
$$

を満たします。また $(\ker B)^\perp=\ell^2\oplus\{0\}$ で、$B$ の値域が含む有限台の列はこの空間に稠密です。従って二組とも、定義で必要な閉部分空間の完全正規直交系です。

データ $w=((1/n^2),1)$ では逆係数の二乗和は $\sum_n1/n^2<\infty$ ですが、

$$
\langle w,(0,1)\rangle_H=1\ne0
$$

なので（P1）を満たしません。観測 $B(x)$ の最後の座標は常に零だから、$Bx=w$ は解けません。これで（P1）と（P2）が独立した検査であることが見えます。

## 5. Picard の可解性判定と最小ノルム解

（P1）は観測の直交方向を排除し、（P2）は逆係数で作った無限和を実際の未知量にする条件です。どちらも必要であるだけでなく、二つを合わせれば十分です。

<a id="thm-inv3-picard-solvability"></a>

<!-- formal-statement-start -->
> **定理（Picardの可解性判定）**
> $X,Y$ を実 Hilbert 空間、$A:X\to Y$ をコンパクト線形作用素、$(\sigma_j,u_j,v_j)_{j\in J}$ を完全特異系とする。任意の $y\in Y$ について、$Ax=y$ を満たす $x\in X$ が存在する必要十分条件は

$$
y\perp\ker A^*,
\qquad
\sum_{j\in J}\frac{|\langle y,u_j\rangle_Y|^2}{\sigma_j^2}<\infty
$$

> である。成立する場合、

$$
x_0=\sum_{j\in J}
\frac{\langle y,u_j\rangle_Y}{\sigma_j}v_j
$$

> は $X$ のノルムで収束し、$Ax_0=y$、$x_0\perp\ker A$ を満たす。
<!-- formal-statement-end -->

### 証明の見取り図

必要性は、解 $x$ の係数が $\langle y,u_j\rangle/\sigma_j$ になることと、[Bessel の不等式](../../../基礎科目/F0/F0-00E2/index.md#thm-f0-00e2-bessel-inequality)から従います。十分性は、二乗和が有限なら $x_0$ がノルム収束で作れること、そして観測側の完全性から $Ax_0=y$ であることを順に示します。

<!-- proof-start -->
### 証明

まず $Ax=y$ とします。任意の $z\in\ker A^*$ について

$$
\langle y,z\rangle_Y
=\langle Ax,z\rangle_Y
=\langle x,A^*z\rangle_X=0
$$

だから（P1）が成立します。また各 $j$ について

$$
\frac{\langle y,u_j\rangle_Y}{\sigma_j}
=\frac{\langle x,A^*u_j\rangle_X}{\sigma_j}
=\langle x,v_j\rangle_X.
$$

$(v_j)$ は正規直交系なので[Bessel の不等式](../../../基礎科目/F0/F0-00E2/index.md#thm-f0-00e2-bessel-inequality)を $x$ に適用すると

$$
\sum_{j\in J}\frac{|\langle y,u_j\rangle_Y|^2}{\sigma_j^2}
=\sum_j|\langle x,v_j\rangle_X|^2
\le\|x\|_X^2<\infty.
$$

従って（P2）も必要です。

逆に両条件を仮定します。$c_j:=\langle y,u_j\rangle_Y/\sigma_j$ と置けば $\sum_j|c_j|^2<\infty$ です。有限和

$$
x_N:=\sum_{j=1}^Nc_jv_j
$$

に対して、$M>N$ のとき正規直交性から

$$
\|x_M-x_N\|_X^2=\sum_{j=N+1}^M|c_j|^2\longrightarrow0.
$$

従って $(x_N)$ は Cauchy 列です。$X$ の完備性により $x_N\to x_0\in X$ が存在します。各 $x_N$ は閉部分空間 $X_0$ に属するので $x_0\in X_0$ です。

$A$ は有界なので $Ax_N\to Ax_0$ です。一方、$Av_j=\sigma_ju_j$ を有限和の各項へ使うと

$$
Ax_N
=\sum_{j=1}^Nc_jAv_j
=\sum_{j=1}^N\langle y,u_j\rangle_Yu_j.
$$

（P1）から $y\in Y_0$ で、[特異系の完全性](#thm-inv3-singular-expansion)により右辺は $Y$ のノルムで $y$ に収束します。よって[極限の一意性](../../../基礎科目/F0/F0-00B/index.md#prop-f0-00b-01)から $Ax_0=y$ です。有限・空の $J$ では同じ議論を有限和・空和として読めます。$\square$
<!-- proof-end -->

解が存在したときも、核方向は観測から復元できません。しかしその中からノルムが最小の解は一意に選べます。

<a id="cor-inv3-minimum-norm"></a>

<!-- formal-statement-start -->
> **系（最小ノルム解と核の自由度）**
> 実 Hilbert 空間間のコンパクト作用素 $A:X\to Y$ と $y\in\mathcal R(A)$ について、[Picardの可解性判定](#thm-inv3-picard-solvability)で構成した $x_0\in(\ker A)^\perp$ は唯一の最小ノルム解であり、全ての解は

$$
\{x\in X:Ax=y\}=x_0+\ker A
$$

> と表される。特に $k\in\ker A$ について

$$
\|x_0+k\|_X^2=\|x_0\|_X^2+\|k\|_X^2.
$$
<!-- formal-statement-end -->

### 証明の見取り図

二つの解の差は核に属します。$x_0$ は核に直交するので、直交分解で長さを比較すれば、最小になるのは核成分を零にしたときだけです。

<!-- proof-start -->
### 証明

$Ax=y=Ax_0$ なら $A(x-x_0)=0$ なので $k=x-x_0\in\ker A$ です。逆に $k\in\ker A$ なら $A(x_0+k)=y$ です。これで解集合の表示が従います。

$x_0\in(\ker A)^\perp$ より $\langle x_0,k\rangle_X=0$ なので内積を展開すると

$$
\begin{aligned}
\|x_0+k\|_X^2
&=\langle x_0+k,x_0+k\rangle_X\\
&=\|x_0\|_X^2+2\langle x_0,k\rangle_X+\|k\|_X^2\\
&=\|x_0\|_X^2+\|k\|_X^2.
\end{aligned}
$$

等号で最小となるのは $k=0$ の場合だけです。$\square$
<!-- proof-end -->

逆に $y\notin\mathcal R(A)$ なら厳密解は存在しません。$y\in Y_0$ でも、（P2）が発散すれば極限の解は作れません。次節でこの差を目で追える列にします。

---

## 6. データが収束しても復元が発散する

$D:\ell^2\to\ell^2$、$(Dx)_n=x_n/n$ で、存在しないデータ $y=(1/n)_{n\ge1}$ を有限個だけ測れたとします。最初の $N$ 個を残すデータ $y^{(N)}$ は実現可能ですが、復元結果は別の振る舞いをします。

<a id="prop-inv3-truncation"></a>

<!-- formal-statement-start -->
> **命題（有限項復元と非閉値域の具体例）**
> $D:\ell^2\to\ell^2$ を $(Dx)_n=x_n/n$ とし、$y=(1/n)_{n\ge1}$、

$$
y^{(N)}=\sum_{n=1}^N\frac1n e_n,
\qquad
x^{(N)}=\sum_{n=1}^Ne_n
$$

> と置く。このとき全ての $N\ge1$ で $Dx^{(N)}=y^{(N)}$ であるが、

$$
y^{(N)}\to y\in\ell^2,\qquad
y\notin\mathcal R(D),\qquad
\|x^{(N)}\|_2=\sqrt N\to\infty.
$$
<!-- formal-statement-end -->

### 証明の見取り図

有限個の座標なら特異値で割れます。データの二乗誤差は $\sum_{n>N}1/n^2$ なので零へ近づきますが、復元係数は $N$ 個の 1 なので、その二乗ノルムは $N$ となります。

<!-- proof-start -->
### 証明

各 $n\le N$ で $(Dx^{(N)})_n=1/n$、$n>N$ で零なので $Dx^{(N)}=y^{(N)}$ です。さらに

$$
\|y-y^{(N)}\|_2^2
=\sum_{n=N+1}^\infty\frac1{n^2}\to0,
$$

これは収束する正項級数の尾部だからです。一方

$$
\|x^{(N)}\|_2^2=\sum_{n=1}^N1=N.
$$

もし $Dx=y$ なら全ての $n$ で $x_n/n=1/n$、すなわち $x_n=1$ が必要ですが、その列は $\ell^2$ に入りません。従って $y\notin\mathcal R(D)$ です。$\square$
<!-- proof-end -->

この例は INV2 の[非閉値域の判定](../INV2/index.md#prop-inv2-diagonal-range)を、完全特異系の逆係数から読み直したものです。有限項切断はデータの近似にはなっても、無条件に未知量の近似になるわけではありません。

実際の誤差増幅も同じ方向で起きます。正確なデータを零とし、観測誤差を $\eta^{(N)}=e_N/N$ とすると $\|\eta^{(N)}\|_2=1/N\to0$ ですが、

$$
D^{-1}\eta^{(N)}=e_N,\qquad\|e_N\|_2=1.
$$

ここで $D^{-1}$ は、単射 $D$ の値域 $\mathcal R(D)$ 上で定義される逆写像を表し、$\ell^2$ 全体で定義された有界な逆作用素ではありません。$\eta^{(N)}=D e_N$ はその定義域に入ります。従って、観測が正確に解ける場合ですら、逆に割る操作が一様安定でないことが分かります。次の INV4 では、誤差を増幅しすぎないように逆係数を制御する方法へ進みます。

---

## 演習

### Level A：特異系と二条件を直接確認する

<a id="ex-inv3-a01"></a>

### INV3-A01 核と観測方向を一つずつ数える
- Level: A

$A:\mathbb R^2\to\mathbb R^2$ を $A(x_1,x_2)=(2x_1,0)$ とする。完全特異系を示し、$\ker A$ と $\ker A^*$ を求めよ。データ $y=(a,b)$ が厳密に解ける条件も求めよ。

<!-- solution-start -->
#### 詳細解答

標準内積について

$$
\langle Ax,y\rangle=2x_1a
=\langle x,(2a,0)\rangle
$$

なので $A^*=A$ です。$\ker A=\operatorname{span}\{e_2\}$、$\ker A^*=\operatorname{span}\{e_2\}$。$\sigma_1=2$、$u_1=v_1=e_1$ と置くと $Av_1=2u_1$、$A^*u_1=2v_1$ が成立し、正規直交性も満たします。$X_0=Y_0=\operatorname{span}\{e_1\}$ なので完全です。

（P1）は $\langle (a,b),e_2\rangle=b=0$、（P2）は一項の和 $a^2/4<\infty$ で自動的に成立します。よって[Picardの可解性判定](#thm-inv3-picard-solvability)から $b=0$ が必要十分です。実際、全解は $(a/2,t)$（$t\in\mathbb R$）です。
<!-- solution-end -->

<a id="ex-inv3-a02"></a>

### INV3-A02 有限台データの復元
- Level: A

$D:\ell^2\to\ell^2$ を $(Dx)_n=x_n/n$ とし、$y=e_1+\frac13e_3$ とする。Picard 条件を検査して最小ノルム解とそのノルムを求めよ。

<!-- solution-start -->
#### 詳細解答

$D$ の[完全特異系の例](#def-inv3-singular-system)では $\ker D^*=\{0\}$ なので（P1）は成立します。非零の観測係数は $y_1=1$、$y_3=1/3$ だけで、特異値は $\sigma_1=1$、$\sigma_3=1/3$ です。従って

$$
\sum_j\frac{|y_j|^2}{\sigma_j^2}
=\frac{1^2}{1^2}+\frac{(1/3)^2}{(1/3)^2}=2<\infty.
$$

（P2）も満たすので $x_0=e_1+e_3$ が復元され、$Dx_0=e_1+e_3/3=y$ です。$\ker D=\{0\}$ だからこれが唯一の解でもあり、$\|x_0\|_2=\sqrt2$ です。
<!-- solution-end -->

<a id="ex-inv3-a03"></a>

### INV3-A03 観測係数と逆係数の違い
- Level: A

$D$ を前問と同じとし、$y_n=n^{-r}$（$r=1$ または $r=2$）を考える。各データが $\ell^2$ に属することと、Picard 条件の成否を判定せよ。

<!-- solution-start -->
#### 詳細解答

いずれも $2r>1$ なので $\sum_n n^{-2r}<\infty$ から $y\in\ell^2$ です。$\ker D^*=\{0\}$ より（P1）は成立します。（P2）は

$$
\sum_n\frac{n^{-2r}}{(1/n)^2}
=\sum_n n^{2-2r}
$$

です。$r=1$ では $\sum_n1=\infty$ で不可解です。$r=2$ では $\sum_n1/n^2<\infty$ で可解、解は $x_n=n^{1-2}=1/n$ です。$\ell^2$ データであるという判定だけでは足りません。
<!-- solution-end -->

<a id="ex-inv3-a04"></a>

### INV3-A04 観測できない座標の検査
- Level: A

$H=\ell^2\oplus\mathbb R$、$B((x_n),t)=((x_n/n),0)$ とする。$w=((n^{-2})_{n\ge1},2)$ に対し（P1）と（P2）を個別に検査せよ。

<!-- solution-start -->
#### 詳細解答

$B^*=B$ で $\ker B^*=\{0\}\oplus\mathbb R$ です。特異値 $\sigma_j=1/j$ と $u_j=(e_j,0)$ を使うと

$$
\sum_j\frac{|\langle w,u_j\rangle_H|^2}{\sigma_j^2}
=\sum_j\frac{j^{-4}}{j^{-2}}
=\sum_jj^{-2}<\infty.
$$

従って（P2）は成立します。しかし $z=(0,1)\in\ker B^*$ に対し $\langle w,z\rangle_H=2\ne0$ で（P1）は不成立です。実際、$B$ の出力の実数成分は必ず零なので、$Bx=w$ を満たす未知量はありません。
<!-- solution-end -->

<a id="ex-inv3-a05"></a>

### INV3-A05 特異値が一つもない場合
- Level: A

任意の実 Hilbert 空間 $X,Y$ 上の零作用素 $A=0:X\to Y$ について、完全特異系、Picard 条件、可解データ、最小ノルム解を述べよ。

<!-- solution-start -->
#### 詳細解答

$A^*=0$ なので $\ker A=X$、$\ker A^*=Y$ です。従って $X_0=Y_0=\{0\}$ で完全特異系は空です。（P2）は空和 $0<\infty$ なのでどの $y$ でも成立します。一方（P1）は $y\perp Y$ であり、$y=0$ と同値です。厳密解があるのは $y=0$ の場合だけで、そのとき全ての $x\in X$ が解、最小ノルム解は $x_0=0$ です。空の特異系でも[Picardの判定](#thm-inv3-picard-solvability)が例外なしに動きます。
<!-- solution-end -->

### Level B：可解性・射影・収束を結び付ける

<a id="ex-inv3-b01"></a>

### INV3-B01 減衰の指数で可解性を分類する
- Level: B

$p>0$ とし、$D_p:\ell^2\to\ell^2$、$(D_px)_n=x_n/n^p$ を考える。$q>1/2$ に対し $y^{(q)}_n=n^{-q}$ とする。$D_px=y^{(q)}$ の可解性の必要十分条件を $p,q$ で示し、解を求めよ。境界 $q=p+1/2$ を忘れずに調べよ。

<!-- solution-start -->
#### 詳細解答

$p>0$ で $n^{-p}\to0$ だから[対角コンパクト性判定](../../FA/FA6/index.md#thm-fa6-diagonal-criterion)により $D_p$ はコンパクトです。$D_p^*=D_p$ で単射なので（P1）は自動的に成立し、正の特異値は $\sigma_n=n^{-p}$ です。Picard 級数は

$$
\sum_{n=1}^\infty\frac{n^{-2q}}{n^{-2p}}
=\sum_{n=1}^\infty n^{-2(q-p)}.
$$

正項級数 $\sum_n n^{-s}$ が収束する条件は $s>1$ なので、必要十分条件は $2(q-p)>1$、すなわち

$$
q>p+\frac12
$$

です。等号 $q=p+1/2$ では級数は調和級数 $\sum_n1/n$ となり発散します。

可解の場合、各座標の方程式 $x_n/n^p=n^{-q}$ から $x_n=n^{p-q}$ です。この列の二乗和は上の Picard 級数に等しいため、確かに $\ell^2$ に属します。$D_p$ は単射なので解は一意です。
<!-- solution-end -->

<a id="ex-inv3-b02"></a>

### INV3-B02 長方形行列の完全特異系
- Level: B

$A:\mathbb R^3\to\mathbb R^2$ を $A(x_1,x_2,x_3)=(3x_1,x_2)$ とする。完全特異系、$\ker A$、$\ker A^*$ を求め、任意の $y=(a,b)$ の Picard 条件と全解・最小ノルム解を調べよ。

<!-- solution-start -->
#### 詳細解答

任意の $x\in\mathbb R^3$、$y\in\mathbb R^2$ について

$$
\langle Ax,y\rangle=3x_1a+x_2b
=\langle x,(3a,b,0)\rangle
$$

なので $A^*(a,b)=(3a,b,0)$ です。入力側の標準基底 $e_1,e_2,e_3$ に対して

$$
\begin{aligned}
A^*A(x_1,x_2,x_3)&=(9x_1,x_2,0),\\
A^*Ae_1&=9e_1,\quad A^*Ae_2=e_2,\quad A^*Ae_3=0.
\end{aligned}
$$

従って各列を $A^*Ae_j$ の座標とする行列表現は $\operatorname{diag}(9,1,0)$ で、正の固有値は $9,1$ です。対応する固有ベクトルを $v_1=e_1$、$v_2=e_2$ と選び、$u_j=Av_j/\sigma_j$ とすると

$$
(\sigma_1,u_1,v_1)=(3,(1,0),(1,0,0)),
\quad
(\sigma_2,u_2,v_2)=(1,(0,1),(0,1,0))
$$

が特異系です。$Av_j=\sigma_ju_j$ と $A^*u_j=\sigma_jv_j$ は各成分を代入すれば成り立ちます。$\ker A=\operatorname{span}\{(0,0,1)\}$、$\ker A^*=\{0\}$、二つの $v_j$ は $(\ker A)^\perp$ の基底、二つの $u_j$ は $\mathbb R^2=\overline{\mathcal R(A)}$ の基底なので完全です。

任意の $y$ について（P1）は自動的に成立し、（P2）は二項の和

$$
\frac{a^2}{9}+b^2<\infty
$$

で成立します。[Picardの定理](#thm-inv3-picard-solvability)と[最小ノルム解の系](#cor-inv3-minimum-norm)より

$$
x_0=(a/3,b,0),\qquad
\{x:Ax=y\}=\{(a/3,b,t):t\in\mathbb R\}.
$$

第三成分は観測から決まらず、最小ノルムのとき零になります。
<!-- solution-end -->

<a id="ex-inv3-b03"></a>

### INV3-B03 可解データでは有限項復元が収束する
- Level: B

実 Hilbert 空間間のコンパクト作用素 $A$ と無限完全特異系 $(\sigma_j,u_j,v_j)$ を考える。$y\in\mathcal R(A)$ に対して

$$
x_N=\sum_{j=1}^N
\frac{\langle y,u_j\rangle_Y}{\sigma_j}v_j
$$

と置く。$x_N$ が最小ノルム解 $x_0$ にノルム収束すること、および $Ax_N\to y$ をそれぞれ直接示せ。どちらの結論に Picard 級数の収束が必要かを述べよ。

<!-- solution-start -->
#### 詳細解答

$y\in\mathcal R(A)$ なので[Picardの可解性判定](#thm-inv3-picard-solvability)から

$$
\sum_j|c_j|^2<\infty,\qquad
c_j:=\frac{\langle y,u_j\rangle_Y}{\sigma_j}.
$$

[最小ノルム解](#cor-inv3-minimum-norm)は $x_0=\sum_jc_jv_j$ です。正規直交性から

$$
\|x_0-x_N\|_X^2=\sum_{j>N}|c_j|^2\to0.
$$

ここで初めて逆係数の二乗和収束が必要です。一方 $Av_j=\sigma_ju_j$ より

$$
Ax_N=\sum_{j=1}^N\langle y,u_j\rangle_Yu_j.
$$

$y\in\mathcal R(A)\subseteq Y_0$ で $(u_j)$ は $Y_0$ の完全正規直交系なので、

$$
\|y-Ax_N\|_Y^2
=\sum_{j>N}|\langle y,u_j\rangle_Y|^2\to0.
$$

この二つ目の収束は、$y\in Y_0$ であることと $y$ 自体の係数の二乗和収束から従い、逆係数の級数収束を直接には使いません。したがって $y\in Y_0\setminus\mathcal R(A)$ でもデータ側は収束し得るのに、復元側は発散し得ます。
<!-- solution-end -->

<a id="ex-inv3-b04"></a>

### INV3-B04 有限ランクでは何が変わるか
- Level: B

$P:\ell^2\to\ell^2$ を $Px=x_1e_1$ とする。コンパクト性、特異系と核・随伴の核を求め、Picard 条件を具体的に書け。さらに $x\in(\ker P)^\perp$ では下界評価を満たすことを示し、$\ell^2$ 全体では下界評価を持たない理由を説明せよ。

<!-- solution-start -->
#### 詳細解答

$P$ の値域は一次元なので[有限ランク作用素のコンパクト性](../../FA/FA6/index.md#thm-fa6-finite-rank-compact)からコンパクトです。内積恒等式

$$
\langle Px,y\rangle=x_1y_1=\langle x,Py\rangle
$$

により $P^*=P$。完全特異系は $\sigma_1=1$、$u_1=v_1=e_1$ の一組です。$\ker P=\ker P^*=\{x:x_1=0\}$、$X_0=Y_0=\operatorname{span}\{e_1\}$ です。

Picard 条件の（P1）は $y_n=0$（$n\ge2$）を要求しますが、（P2）は単一項 $|y_1|^2<\infty$ なので自動的に成立します。従って可解なデータは $y=y_1e_1$ に限られ、最小ノルム解は $x_0=y_1e_1$ です。

$x\in X_0$ なら $x=te_1$ なので $\|Px\|_2=|t|=\|x\|_2$、下界定数 $c=1$ が取れます。しかし $e_2\in\ker P$ で $\|Pe_2\|_2=0$、$\|e_2\|_2=1$ だから、$\ell^2$ 全体では正の下界定数は存在しません。有限ランクゆえ閉値域ですが、非単射性は残ります。
<!-- solution-end -->

### Level C：二つの障害と不安定性を一つの模型で結ぶ

<a id="ex-inv3-c01"></a>

### INV3-C01 観測不能成分・Picard級数・有限切断
- Level: C

$H=\ell^2\oplus\mathbb R$ に標準直交和内積を入れ、作用素 $B:H\to H$ を

$$
B((x_n),t)=((x_n/n),0)
$$

で定める。$q>1/2$、$b\in\mathbb R$ とし、$y^{(q,b)}=((n^{-q})_{n\ge1},b)\in H$ を観測データとする。次の各問を解け。

1. $B$ の有界性・コンパクト性・完全特異系・$\ker B,\ker B^*$ を示せ。
2. $Bx=y^{(q,b)}$ が可解となる $q,b$ の必要十分条件を求め、可解なら全解と最小ノルム解を求めよ。
3. $b=0$、$1/2<q\le3/2$ のとき、データの最初の $N$ 座標だけを残した $y^{(N)}$ に対して $Bx^{(N)}=y^{(N)}$ を満たす最小ノルム解を求めよ。データは $y^{(q,0)}$ に収束するのに、復元はノルム収束しないことを証明せよ。
4. 真のデータを $0\in H$ とし、$\eta^{(N)}=((e_N/N),0)$ を誤差とする。厳密に $Bx=\eta^{(N)}$ と解いた場合、最小ノルム解のノルムが零へ近づかないことを示せ。

<!-- solution-start -->
#### 詳細解答

**1. 作用素の性質と特異系。** 線形性は座標ごとに従います。$x=((x_n),t)$ に対して

$$
\|Bx\|_H^2=\sum_{n\ge1}\frac{|x_n|^2}{n^2}
\le\sum_{n\ge1}|x_n|^2
\le\|x\|_H^2
$$

なので $B$ は有界です。$B_N$ を最初の $N$ 座標だけを保つ有限ランク作用素とします。任意の $x\in H$ に対して

$$
\|(B-B_N)x\|_H^2
=\sum_{n>N}\frac{|x_n|^2}{n^2}
\le\frac1{(N+1)^2}\|x\|_H^2.
$$

従って $\|B-B_N\|\le1/(N+1)\to0$。各 $B_N$ は有限ランクでコンパクトなので、[コンパクト作用素のノルム閉性](../../FA/FA6/index.md#thm-fa6-norm-closed)から $B$ もコンパクトです。

内積を直接展開すると

$$
\langle B((x_n),t),((z_n),s)\rangle_H
=\sum_{n\ge1}\frac{x_nz_n}{n}
=\langle ((x_n),t),B((z_n),s)\rangle_H
$$

なので $B^*=B$ です。$\ker B=\ker B^*=\{0\}\oplus\mathbb R$ であり、

$$
\sigma_n=\frac1n,\qquad
u_n=v_n=(e_n,0)
$$

が完全特異系です。正規直交性と $Bv_n=\sigma_nu_n$、$B^*u_n=\sigma_nv_n$ は直接確かめられます。また、$(\ker B)^\perp=\ell^2\oplus\{0\}$ で、$B$ の値域はその空間に稠密です。これは有限台の列がすべて $B$ の値域に属するためで、特異系の完全性も確認できました。

**2. 可解性。** データ $y^{(q,b)}$ は $q>1/2$ より $H$ に属します。（P1）は

$$
\langle y^{(q,b)},(0,1)\rangle_H=b=0
$$

と同値です。（P2）は

$$
\sum_{n\ge1}\frac{n^{-2q}}{n^{-2}}
=\sum_{n\ge1}n^{2-2q}<\infty
\quad\Longleftrightarrow\quad q>\frac32
$$

です。最後の判定は $2q-2>1$ の場合に限って正項級数が収束することから従います。従って可解な必要十分条件は $b=0$ かつ $q>3/2$ です。このとき

$$
x_0=((n^{1-q})_{n\ge1},0),
\qquad
\{x:Bx=y^{(q,0)}\}
=\{((n^{1-q})_{n\ge1},t):t\in\mathbb R\}.
$$

最小ノルムは $t=0$ で一意に達成されます。

**3. 有限項打切り。** $b=0$、$1/2<q\le3/2$ とします。$y^{(N)}=((n^{-q}\boldsymbol{1}_{n\le N})_{n\ge1},0)$ と置くと

$$
x^{(N)}
=((n^{1-q}\boldsymbol{1}_{n\le N})_{n\ge1},0)
$$

が最小ノルム解です。実際、座標ごとに $n^{1-q}/n=n^{-q}$ で、核に直交します。データの誤差は

$$
\|y^{(q,0)}-y^{(N)}\|_H^2
=\sum_{n>N}n^{-2q}\to0
$$

です。$2q>1$ のためこの級数は収束し、その尾部は零へ向かいます。一方

$$
\|x^{(N)}\|_H^2
=\sum_{n=1}^Nn^{2-2q}\to\infty
$$

です。なぜなら $q\le3/2$ は $2q-2\le1$ を意味し、対応する正項級数が発散するからです。従って $(x^{(N)})$ は有界ですらなく、$H$ では収束しません。これは像の閉包にはあるが像にはないデータの例です。

**4. 微小な誤差の増幅。** $\|\eta^{(N)}\|_H=1/N\to0$ であり、$\eta^{(N)}$ は $B$ の像に属します。座標式を解くと最小ノルム解は

$$
x_\eta^{(N)}=((e_N),0),
\qquad
Bx_\eta^{(N)}=((e_N/N),0)=\eta^{(N)}.
$$

従って $\|x_\eta^{(N)}\|_H=1$ です。正確な零データに対する最小ノルム解は零なのに、観測誤差が零へ近づいても復元誤差は $1$ のままです。[INV2 の下界評価と安定性](../INV2/index.md#thm-inv2-closed-range)の観点でも、正の下界がないことと一致します。
<!-- solution-end -->
