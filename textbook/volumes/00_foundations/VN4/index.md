# VN4 trace class・predual・ultraweak 位相

<!-- definition-example-audit: strict -->

> **既出概念**：[VN3 の作用素の絶対値と極分解](../VN3/index.md#thm-vn3-polar-decomposition)、[FA7 のコンパクト自己共役作用素のスペクトル定理](../FA7/index.md)、[F0-02C2 の双対空間と Riesz 表現](../F0_02C2_線形汎関数_双対空間_Riesz/index.md)を使います。

VN1 と VN2 では、von Neumann 環を $B(H)$ の部分代数として見て、SOT・WOT と二重可換子定理を調べました。そこでは連続性を測る汎関数は

$$
A\longmapsto \langle Ax,y\rangle
$$

という**ベクトル汎関数**でした。

しかし von Neumann 環を双対空間として理解したいなら、有限個のベクトル汎関数だけでは足りません。たとえば無限次元 Hilbert 空間で

$$
D=\operatorname{diag}\left(\frac12,\frac14,\frac18,\ldots\right)
$$

を考えると、

$$
A\longmapsto \sum_{n=1}^{\infty}2^{-n}\langle Ae_n,e_n\rangle
$$

という無限和も自然に現れます。これは一個のベクトル汎関数ではありませんが、作用素 $A$ の「無限個の行列係数を、絶対収束する重みでまとめて読む」汎関数です。

この無限和を一つの作用素で管理するには、まず「特異値の総和が有限な作用素」を取り出す必要があります。その作用素を試験側に置くと、$B(H)$ 上の無限個の行列係数を絶対収束する形でまとめられます。

さらに、その作用素全体の Banach 空間を $X$ と書いたとき、

$$
B(H)\cong X^*
$$

という双対関係が成立することを示します。すると $B(H)$ には $X$ を使って定まる自然な弱*位相が入ります。

本章では Schatten 級全般へは広げません。極分解とコンパクト自己共役スペクトル定理から特異値を作り、

$$
\text{特異値の可算和}
\longrightarrow
\text{作用素トレース}
\longrightarrow
\text{双対空間表示}
\longrightarrow
\text{自然な弱*位相}
$$

という順に必要な道具を一つずつ定義します。

---

## 1. 特異値：作用素の「大きさ」を固有値として並べる

VN3 では

$$
|T|=(T^*T)^{1/2}
$$

を $T$ の絶対値と呼びました。$T$ がコンパクトなら $|T|$ もコンパクトで、しかも正の自己共役有界作用素です。

したがって FA7 のコンパクト自己共役スペクトル定理により、$|T|$ の非零固有値を重複度込みで並べられます。

<a id="def-vn4-singular-values"></a>

<!-- formal-statement-start -->
### 定義（コンパクト作用素の特異値）

$H$ を複素 Hilbert 空間、$T\in B(H)$ をコンパクト作用素とする。

$|T|=(T^*T)^{1/2}$ の非零固有値を重複度込みで

$$
s_1(T)\ge s_2(T)\ge\cdots>0
$$

と並べる。これらを $T$ の**特異値**と呼ぶ。

有限ランクの場合は、非零特異値の後ろを $0$ で補う。
<!-- formal-statement-end -->

<!-- definition-example-start: def-vn4-singular-values -->

### 直接例：2次行列の特異値

$$
T=
\begin{pmatrix}
0&2\\
0&0
\end{pmatrix}
$$

では VN3 で

$$
|T|=
\begin{pmatrix}
0&0\\
0&2
\end{pmatrix}
$$

を計算しました。

従って $|T|$ の固有値は $2,0$ なので

$$
\boxed{
s_1(T)=2,\qquad s_2(T)=0.
}
$$

行列 $T$ 自身の固有値は両方 $0$ ですが、特異値は $T$ が $e_2$ を長さ2のベクトルへ送ることを検出します。

<!-- definition-example-end -->

特異値は単なる「固有値の別名」ではありません。一般の $T$ が正規でなくても、正作用素 $|T|$ を通すことで大きさを測れます。

---

## 2. 特異値は最良有限ランク近似の誤差になる

この作用素クラスを作るには、「特異値の尾」が有限ランク近似の誤差をどう支配するかを先に理解する必要があります。そのためにまず、特異値と有限ランク近似の関係を確認します。

<a id="lem-vn4-best-rank-approximation"></a>

<!-- formal-statement-start -->
### 補題（特異値と最良有限ランク近似）

$T\in B(H)$ をコンパクト作用素とし、特異値を

$$
s_1(T)\ge s_2(T)\ge\cdots
$$

とする。

各 $N\ge0$ について

$$
\boxed{
s_{N+1}(T)
=
\inf_{\operatorname{rank}R\le N}\|T-R\|
}
$$

が成り立つ。
<!-- formal-statement-end -->

### 証明の見取り図

$|T|$ の固有ベクトルを大きい固有値から $e_1,e_2,\ldots$ と取り、極分解 $T=U|T|$ を使います。

最初の $N$ 個だけ残した作用素が誤差 $s_{N+1}(T)$ を達成します。逆に rank が $N$ 以下の作用素は、$N+1$ 次元空間を全部一対一には運べないので、最初の $N+1$ 本の特異方向のどれかを取り逃します。

<!-- proof-start -->
### 証明

まず $s_{N+1}(T)=0$ なら $\operatorname{rank}T\le N$ なので、$R=T$ と取れば右辺は0です。

以下 $s_{N+1}(T)>0$ とします。

FA7 のスペクトル定理により、$|T|$ の正規直交固有ベクトル $e_1,e_2,\ldots$ を

$$
|T|e_k=s_k(T)e_k
$$

となるように取れます。

$P_N$ を

$$
E_N=\operatorname{span}\{e_1,\ldots,e_N\}
$$

への直交射影とし、VN3 の極分解

$$
T=U|T|
$$

を使って

$$
R_N=U|T|P_N
$$

と置きます。

$R_N$ の像は $U(E_N)$ に含まれるので

$$
\operatorname{rank}R_N\le N.
$$

また

$$
T-R_N
=
U|T|(I-P_N).
$$

$U$ は $\overline{\operatorname{ran}|T|}$ 上で等長なので、

$$
\|T-R_N\|
=
\||T|(I-P_N)\|.
$$

$|T|(I-P_N)$ の最大固有値は $s_{N+1}(T)$ だから

$$
\boxed{
\|T-R_N\|=s_{N+1}(T).
}
$$

従って

$$
\inf_{\operatorname{rank}R\le N}\|T-R\|
\le
s_{N+1}(T).
$$

逆向きを示します。

$\operatorname{rank}R\le N$ とし、

$$
E_{N+1}
=
\operatorname{span}\{e_1,\ldots,e_{N+1}\}
$$

を考えます。

$E_{N+1}$ は $N+1$ 次元ですが、$R|_{E_{N+1}}$ の rank は $N$ 以下です。従って核は0次元ではなく、単位ベクトル

$$
x\in E_{N+1},
\qquad
Rx=0
$$

を取れます。

$x=\sum_{k=1}^{N+1}c_ke_k$ と書くと

$$
\sum_{k=1}^{N+1}|c_k|^2=1.
$$

さらに

$$
\||T|x\|^2
=
\sum_{k=1}^{N+1}s_k(T)^2|c_k|^2.
$$

各 $k\le N+1$ について

$$
s_k(T)\ge s_{N+1}(T)
$$

なので

$$
\||T|x\|^2
\ge
s_{N+1}(T)^2
\sum_{k=1}^{N+1}|c_k|^2
=
s_{N+1}(T)^2.
$$

$x$ は $|T|$ の支持上にあるため、極分解の部分等長作用素 $U$ は $x$ を通じた像上で長さを保ちます。したがって

$$
\|Tx\|
=
\||T|x\|
\ge
s_{N+1}(T).
$$

$Rx=0$ だから

$$
\|T-R\|
\ge
\|(T-R)x\|
=
\|Tx\|
\ge
s_{N+1}(T).
$$

$R$ は任意だったので

$$
\inf_{\operatorname{rank}R\le N}\|T-R\|
\ge
s_{N+1}(T).
$$

両向きを合わせて主張を得ます。
<!-- proof-end -->

この補題から、左右に有界作用素を掛けたときの特異値評価がすぐ出ます。

$A\in B(H)$ なら

$$
\boxed{
s_n(AT)\le \|A\|s_n(T).
}
$$

実際、rank $R\le n-1$ に対して rank $AR\le n-1$ なので

$$
s_n(AT)
=
\inf_{\operatorname{rank}S\le n-1}\|AT-S\|
\le
\|A(T-R)\|.
$$

右辺を $R$ について下限に取ればよいわけです。

右から掛ける場合も最良有限ランク近似を直接使えます。rank $R\le n-1$ なら rank $RA\le n-1$ なので

$$
\begin{aligned}
s_n(TA)
&=
\inf_{\operatorname{rank}S\le n-1}\|TA-S\|\\
&\le
\|(T-R)A\|\\
&\le
\|T-R\|\,\|A\|.
\end{aligned}
$$

$R$ について下限を取れば

$$
\boxed{
s_n(TA)\le\|A\|s_n(T).
}
$$

したがって左右どちらから有界作用素を掛けても、特異値は作用素ノルム倍より大きくはなりません。

---

## 3. 特異値の総和が有限な作用素

コンパクト作用素は特異値が0へ落ちます。しかし「0へ落ちる」だけでは、無限個の行列係数を絶対収束する形でまとめるには弱すぎます。

そこで特異値の**総和**まで有限であることを要求します。

<a id="def-vn4-トレース-class"></a>

<!-- formal-statement-start -->
### 定義（trace class とトレースノルム）

コンパクト作用素 $T\in B(H)$ が

$$
\sum_{n=1}^{\infty}s_n(T)<\infty
$$

を満たすとき、$T$ を **trace class（トレース級）** と呼ぶ。

trace class 作用素全体を

$$
S_1(H)
$$

と書く。

また

$$
\boxed{
\|T\|_1
=
\sum_{n=1}^{\infty}s_n(T)
}
$$

を $T$ の**トレースノルム**と呼ぶ。
<!-- formal-statement-end -->

<!-- definition-example-start: def-vn4-トレース-class -->

### 直接例：$\ell^2$ 上の対角作用素

$H=\ell^2(\mathbb N)$ とし、

$$
Te_n=2^{-n}e_n
$$

とします。

$T$ は正のコンパクト作用素で、特異値は

$$
s_n(T)=2^{-n}.
$$

従って

$$
\|T\|_1
=
\sum_{n=1}^{\infty}2^{-n}
=
1.
$$

したがって

$$
\boxed{T\in S_1(H)}.
$$

一方

$$
Se_n=\frac1n e_n
$$

では

$$
\sum_{n=1}^{\infty}\frac1n=\infty
$$

なので、$S$ はコンパクトですが trace class ではありません。

つまり

$$
\text{trace class}
\subsetneq
\text{compact}
$$

です。

<!-- definition-example-end -->

有限次元では全作用素が trace class です。$T\in M_n(\mathbb C)$ なら特異値は有限個しかないので

$$
\|T\|_1
=
s_1(T)+\cdots+s_n(T)
<\infty.
$$

---

## 4. trace class は Banach 空間で、有限ランク作用素が稠密

双対空間の一つ手前の Banach 空間として使うには、まず

$$
\|T\|_1=\sum_{n=1}^{\infty}s_n(T)
$$

が本当にノルムになることを確認する必要があります。特に三角不等式は、特異値を一つずつ見ただけでは出ません。

そこで有限個の特異値の和を、直交系に対する行列係数の最大値として読み替えます。

<a id="lem-vn4-ky-fan-variational"></a>

<!-- formal-statement-start -->
### 補題（Ky Fan 型変分公式）

$T\in B(H)$ をコンパクト作用素とし、$N\ge1$ とする。このとき

$$
\boxed{
\sum_{k=1}^{N}s_k(T)
=
\sup
\left\{
\left|
\sum_{j=1}^{N}\langle Tx_j,y_j\rangle
\right|
:
(x_j)_{j=1}^{N},(y_j)_{j=1}^{N}
\text{ は正規直交系}
\right\}.
}
$$

有限次元で $N>\dim H$ の場合は $N\le\dim H$ の範囲で読む。
<!-- formal-statement-end -->

### 証明の見取り図

極分解 $T=U|T|$ と $|T|$ の固有ベクトルを使うと、

$$
Tx
=
\sum_k s_k(T)\langle x,e_k\rangle f_k,
\qquad
f_k=Ue_k
$$

と書けます。

任意の二つの $N$ 本の正規直交系に対して Bessel の不等式を使うと、各特異方向が寄与できる重みは0以上1以下で、重みの総量は高々 $N$ です。したがって最大値は大きい方から $N$ 個の特異値へ重みを集中したときに達成されます。

<!-- proof-start -->
### 証明

$|T|$ の非零固有値に対応する正規直交固有ベクトルを $e_k$ とし、

$$
|T|e_k=s_k(T)e_k
$$

とします。

極分解 $T=U|T|$ に対し

$$
f_k=Ue_k
$$

と置くと、$(f_k)$ も正規直交系です。従って

$$
Tx
=
\sum_k s_k(T)\langle x,e_k\rangle f_k.
$$

任意の正規直交系

$$
x_1,\ldots,x_N,
\qquad
y_1,\ldots,y_N
$$

を取ります。このとき

$$
\sum_{j=1}^{N}\langle Tx_j,y_j\rangle
=
\sum_k s_k(T)
\sum_{j=1}^{N}
\langle x_j,e_k\rangle
\langle f_k,y_j\rangle.
$$

各 $k$ について

$$
a_k^2
=
\sum_{j=1}^{N}
|\langle x_j,e_k\rangle|^2,
\qquad
b_k^2
=
\sum_{j=1}^{N}
|\langle f_k,y_j\rangle|^2
$$

と置きます。

Bessel の不等式から

$$
0\le a_k\le1,
\qquad
0\le b_k\le1.
$$

また和の順序を入れ替えると

$$
\sum_k a_k^2
=
\sum_{j=1}^{N}
\sum_k|\langle x_j,e_k\rangle|^2
\le
N
$$

であり、同様に

$$
\sum_k b_k^2\le N.
$$

有限和に Cauchy--Schwarz の不等式を使うと

$$
\left|
\sum_{j=1}^{N}
\langle x_j,e_k\rangle
\langle f_k,y_j\rangle
\right|
\le
a_kb_k.
$$

さらに

$$
a_kb_k
\le
\frac{a_k^2+b_k^2}{2}.
$$

そこで

$$
c_k=\frac{a_k^2+b_k^2}{2}
$$

と置くと

$$
0\le c_k\le1,
\qquad
\sum_k c_k\le N.
$$

特異値は大きい順に並んでいるので、この条件を満たす重みについて

$$
\sum_k s_k(T)c_k
\le
\sum_{k=1}^{N}s_k(T)
$$

です。

実際、$s_N(T)$ を境に分ければ

$$
\sum_k s_k(T)c_k
\le
\sum_{k=1}^{N}s_k(T)c_k
+
s_N(T)\sum_{k>N}c_k.
$$

しかも

$$
\sum_{k>N}c_k
\le
N-\sum_{k=1}^{N}c_k
$$

だから

$$
\begin{aligned}
\sum_k s_k(T)c_k
&\le
\sum_{k=1}^{N}s_k(T)c_k
+
s_N(T)
\left(
N-\sum_{k=1}^{N}c_k
\right)\\
&=
\sum_{k=1}^{N}
\left[
s_N(T)
+
\bigl(s_k(T)-s_N(T)\bigr)c_k
\right]\\
&\le
\sum_{k=1}^{N}s_k(T).
\end{aligned}
$$

従って

$$
\left|
\sum_{j=1}^{N}\langle Tx_j,y_j\rangle
\right|
\le
\sum_{k=1}^{N}s_k(T).
$$

逆に $x_j=e_j$、$y_j=f_j$ と取れば

$$
\langle Te_j,f_j\rangle
=
s_j(T)
$$

なので

$$
\sum_{j=1}^{N}\langle Te_j,f_j\rangle
=
\sum_{j=1}^{N}s_j(T).
$$

rank が $N$ 未満なら、残りの特異値を0とみなし、正規直交系を補えば同じ結論です。

したがって主張の上限はちょうど

$$
\sum_{k=1}^{N}s_k(T)
$$

です。
<!-- proof-end -->

この補題を $S+T$ に適用します。任意の正規直交系に対して

$$
\left|
\sum_{j=1}^{N}\langle(S+T)x_j,y_j\rangle
\right|
\le
\left|
\sum_{j=1}^{N}\langle Sx_j,y_j\rangle
\right|
+
\left|
\sum_{j=1}^{N}\langle Tx_j,y_j\rangle
\right|.
$$

従って変分公式から

$$
\sum_{k=1}^{N}s_k(S+T)
\le
\sum_{k=1}^{N}s_k(S)
+
\sum_{k=1}^{N}s_k(T).
$$

$S,T\in S_1(H)$ なら $N\to\infty$ として

$$
\boxed{
\|S+T\|_1
\le
\|S\|_1+\|T\|_1.
}
$$

また

$$
\|\lambda T\|_1=|\lambda|\,\|T\|_1
$$

は特異値の定義から直ちに従います。さらに $\|T\|_1=0$ なら $s_1(T)=0$ であり、コンパクト作用素のスペクトル定理から $\|T\|=s_1(T)=0$、従って $T=0$ です。

よって $S_1(H)$ は線形空間で、$\|\cdot\|_1$ は実際にノルムです。

次に、このノルムについて完備であることと、$B(H)$ の両側イデアルになることを示します。

<a id="thm-vn4-トレース-class-banach-ideal"></a>

<!-- formal-statement-start -->
### 定理（trace class の Banach イデアル性と有限ランク稠密性）

$S_1(H)$ はトレースノルム $\|\cdot\|_1$ に関して Banach 空間である。

さらに $A,B\in B(H)$、$T\in S_1(H)$ に対して

$$
ATB\in S_1(H)
$$

であり、

$$
\boxed{
\|ATB\|_1
\le
\|A\|\,\|T\|_1\,\|B\|
}
$$

が成り立つ。

また有限ランク作用素は $S_1(H)$ で稠密である。
<!-- formal-statement-end -->

<!-- proof-start -->
### 証明

#### 1. イデアル評価

前節の特異値評価から

$$
s_n(AT)\le\|A\|s_n(T).
$$

従って

$$
\|AT\|_1
=
\sum_{n=1}^{\infty}s_n(AT)
\le
\|A\|
\sum_{n=1}^{\infty}s_n(T)
=
\|A\|\|T\|_1.
$$

同様に

$$
\|TB\|_1\le\|T\|_1\|B\|.
$$

二つを組み合わせると

$$
\boxed{
\|ATB\|_1
\le
\|A\|\,\|T\|_1\,\|B\|.
}
$$

特に $ATB$ の特異値総和は有限なので $ATB\in S_1(H)$ です。

#### 2. 有限ランク稠密性

$T\in S_1(H)$ とし、先ほどの固有ベクトル $e_n$ と射影 $P_N$ を使って

$$
T_N=U|T|P_N
$$

と置きます。

$T_N$ は rank が $N$ 以下です。

しかも $T-T_N$ の特異値は

$$
s_{N+1}(T),s_{N+2}(T),\ldots
$$

なので

$$
\|T-T_N\|_1
=
\sum_{n>N}s_n(T).
$$

$\sum_ns_n(T)$ は収束するから、その尾和は0へ収束します。従って

$$
\boxed{
\|T-T_N\|_1\to0.
}
$$

#### 3. 完備性

$(T_m)$ を $\|\cdot\|_1$ に関する Cauchy 列とします。

作用素ノルムについて

$$
\|T\|
=
s_1(T)
\le
\sum_{n=1}^{\infty}s_n(T)
=
\|T\|_1
$$

なので、$(T_m)$ は作用素ノルムでも Cauchy です。

$B(H)$ は作用素ノルムで完備だから、ある $T\in B(H)$ が存在して

$$
\|T_m-T\|\to0.
$$

各 $T_m$ はコンパクトであり、コンパクト作用素全体は作用素ノルム閉なので $T$ もコンパクトです。

特異値の最良近似表示から、任意の rank $R\le n-1$ に対して

$$
\|T_m-R\|
\le
\|T_m-T\|+\|T-R\|.
$$

$R$ について下限を取ると

$$
s_n(T_m)
\le
\|T_m-T\|+s_n(T).
$$

$T_m$ と $T$ を入れ替えれば逆向きも得られるので

$$
|s_n(T_m)-s_n(T)|
\le
\|T_m-T\|.
$$

したがって固定した $n$ ごとに

$$
s_n(T_m)\to s_n(T).
$$

ここで $\varepsilon>0$ を取ります。Cauchy 性より、ある $m_0$ が存在して $m\ge m_0$ なら

$$
\|T_m-T_{m_0}\|_1<\varepsilon.
$$

各 $N$ について

$$
\sum_{n=1}^{N}
s_n(T-T_{m_0})
=
\lim_{m\to\infty}
\sum_{n=1}^{N}
s_n(T_m-T_{m_0})
\le
\varepsilon.
$$

$N\to\infty$ とすると

$$
\|T-T_{m_0}\|_1\le\varepsilon.
$$

従って $T-T_{m_0}\in S_1(H)$ であり、$T\in S_1(H)$ です。

同じ議論を $m_0$ の代わりに十分大きな $m$ に適用すると

$$
\|T-T_m\|_1\to0.
$$

したがって $S_1(H)$ は完備です。
<!-- proof-end -->

この定理で、trace class は単なる集合ではなく

- 有界作用素を左右から掛けても残る
- 有限ランク作用素で近似できる
- Cauchy 列の極限も残る

という、後で双対空間の一つ手前として使うために必要な解析的構造を持つことが分かりました。

---

## 5. トレース：有限次元のトレース を連続拡張する

有限次元では行列の トレース は

$$
\operatorname{tr}F
=
\sum_j F_{jj}
$$

でした。

有限ランク作用素 $F$ でも、$\operatorname{ran}F+\operatorname{ran}F^*$ を含む有限次元部分空間へ制限すれば同じ有限次元 トレース を定義できます。

この有限ランクトレース はトレースノルムで連続です。

実際、有限ランク $F$ の極分解を

$$
F=U|F|
$$

とし、

$$
|F|e_k=s_k(F)e_k
$$

とします。すると

$$
\operatorname{tr}F
=
\sum_k s_k(F)\langle Ue_k,e_k\rangle.
$$

$|\langle Ue_k,e_k\rangle|\le1$ なので

$$
|\operatorname{tr}F|
\le
\sum_ks_k(F)
=
\|F\|_1.
$$

有限ランク作用素は $S_1(H)$ で稠密だったので、トレース を一意に連続延長できます。

<a id="def-vn4-トレース"></a>

<!-- formal-statement-start -->
### 定義（trace class 上のトレース）

有限ランク作用素上の通常のトレース を、トレースノルム連続に $S_1(H)$ 全体へ延長したものを

$$
\operatorname{Tr}:S_1(H)\to\mathbb C
$$

と書き、**トレース**と呼ぶ。
<!-- formal-statement-end -->

<!-- definition-example-start: def-vn4-トレース -->

### 直接例：有限次元では通常の行列トレース に戻る

$H=\mathbb C^2$ で

$$
T=
\begin{pmatrix}
2&1\\
0&-1
\end{pmatrix}
$$

とします。有限次元では $T$ 自身が有限ランクなので、上の連続拡張は通常の行列トレース と一致します。したがって

$$
\boxed{
\operatorname{Tr}(T)=2+(-1)=1.
}
$$

無限次元で導入した $\operatorname{Tr}$ は、有限次元のトレース を別物に置き換えるのではなく、その定義域を trace class まで広げたものです。

<!-- definition-example-end -->

<a id="prop-vn4-トレース-rank-one"></a>

<!-- formal-statement-start -->
### 命題（トレースの連続拡張と rank-one 公式）

$x,y\in H$ に対し

$$
\theta_{x,y}z
=
\langle z,y\rangle x
$$

と定める。

このとき $\theta_{x,y}$ は rank-one 作用素で、

$$
\boxed{
\|\theta_{x,y}\|_1=\|x\|\,\|y\|
}
$$

および

$$
\boxed{
\operatorname{Tr}(\theta_{x,y})=\langle x,y\rangle
}
$$

が成り立つ。

さらに $A\in B(H)$、$T\in S_1(H)$ に対して

$$
\boxed{
|\operatorname{Tr}(AT)|
\le
\|A\|\,\|T\|_1
}
$$

であり、

$$
\boxed{
\operatorname{Tr}(AT)=\operatorname{Tr}(TA)
}
$$

が成り立つ。
<!-- formal-statement-end -->

<!-- proof-start -->
### 証明

まず $x=0$ または $y=0$ なら自明です。以下 $x,y\ne0$ とします。

随伴は

$$
\theta_{x,y}^*=\theta_{y,x}
$$

なので

$$
\theta_{x,y}^*\theta_{x,y}
=
\theta_{y,x}\theta_{x,y}.
$$

任意の $z\in H$ に対して

$$
\theta_{y,x}\theta_{x,y}z
=
\theta_{y,x}\bigl(\langle z,y\rangle x\bigr)
=
\langle z,y\rangle\langle x,x\rangle y.
$$

従って $y$ 方向の唯一の非零固有値は

$$
\|x\|^2\|y\|^2.
$$

よって $\theta_{x,y}$ の唯一の非零特異値は

$$
\|x\|\,\|y\|.
$$

したがって

$$
\boxed{
\|\theta_{x,y}\|_1=\|x\|\,\|y\|.
}
$$

次に、$y/\|y\|$ を含む正規直交基底を取ります。rank-one 作用素のトレース をその基底で計算すると、$y^\perp$ 上では $\theta_{x,y}$ は対角寄与を持たないため

$$
\operatorname{Tr}(\theta_{x,y})
=
\left\langle
\theta_{x,y}\frac{y}{\|y\|},
\frac{y}{\|y\|}
\right\rangle.
$$

ここで

$$
\theta_{x,y}\frac{y}{\|y\|}
=
\left\langle\frac{y}{\|y\|},y\right\rangle x
=
\|y\|x.
$$

従って

$$
\operatorname{Tr}(\theta_{x,y})
=
\left\langle
\|y\|x,
\frac{y}{\|y\|}
\right\rangle
=
\boxed{\langle x,y\rangle}.
$$

$A\in B(H)$、$T\in S_1(H)$ についてはイデアル評価より

$$
AT\in S_1(H),
\qquad
\|AT\|_1\le\|A\|\|T\|_1.
$$

トレースの連続性から

$$
|\operatorname{Tr}(AT)|
\le
\|AT\|_1
\le
\|A\|\|T\|_1.
$$

最後に cyclicity を示します。

まず rank-one 作用素 $\theta_{x,y}$ について

$$
A\theta_{x,y}
=
\theta_{Ax,y},
$$

一方

$$
\theta_{x,y}A
=
\theta_{x,A^*y}.
$$

従って rank-one 作用素のトレース公式から

$$
\begin{aligned}
\operatorname{Tr}(A\theta_{x,y})
&=
\langle Ax,y\rangle,\\
\operatorname{Tr}(\theta_{x,y}A)
&=
\langle x,A^*y\rangle
=
\langle Ax,y\rangle.
\end{aligned}
$$

有限ランク作用素は rank-one 作用素の有限和なので、任意の有限ランク $F$ に対して

$$
\operatorname{Tr}(AF)=\operatorname{Tr}(FA).
$$

一般の $T\in S_1(H)$ に対し、有限ランク $F_n$ を

$$
\|F_n-T\|_1\to0
$$

となるように取ります。

すると

$$
|\operatorname{Tr}(A(F_n-T))|
\le
\|A\|\|F_n-T\|_1\to0
$$

であり、同様に

$$
|\operatorname{Tr}((F_n-T)A)|
\le
\|A\|\|F_n-T\|_1\to0.
$$

有限ランクでは $\operatorname{Tr}(AF_n)=\operatorname{Tr}(F_nA)$ なので、極限を取って

$$
\boxed{
\operatorname{Tr}(AT)=\operatorname{Tr}(TA)
}
$$

を得ます。
<!-- proof-end -->

特に

$$
A\theta_{x,y}
=
\theta_{Ax,y}
$$

なので、

$$
\boxed{
\operatorname{Tr}(A\theta_{x,y})
=
\langle Ax,y\rangle.
}
$$

これが WOT の行列係数と trace class をつなぐ基本公式です。

---

## 6. $B(H)$ は $S_1(H)$ の双対空間である

ここまでの準備で、本章の中心定理を証明できます。

$A\in B(H)$ に対し

$$
\Phi_A(T)=\operatorname{Tr}(AT)
\qquad
(T\in S_1(H))
$$

と置きます。

前節の評価から $\Phi_A$ は $S_1(H)$ 上の有界線形汎関数です。

<a id="thm-vn4-トレース-duality"></a>

<!-- formal-statement-start -->
### 定理（有界作用素環とトレース級の等長双対性）

写像

$$
J:B(H)\to S_1(H)^*,
\qquad
J(A)=\Phi_A
$$

は等長線形同型である。

すなわち

$$
\boxed{
B(H)\cong S_1(H)^*
}
$$

であり、

$$
\boxed{
\|\Phi_A\|=\|A\|.
}
$$
<!-- formal-statement-end -->

### 証明の見取り図

1. $\operatorname{Tr}(A\theta_{x,y})=\langle Ax,y\rangle$ を使うと、$\Phi_A$ のノルムから $A$ の作用素ノルムを回収できます。
2. 逆に任意の $f\in S_1(H)^*$ から
   $$
   b_f(x,y)=f(\theta_{x,y})
   $$
   という有界半双線形形式を作ります。
3. Riesz 表現により
   $$
   b_f(x,y)=\langle Ax,y\rangle
   $$
   と書ける $A\in B(H)$ が得られます。
4. rank-one 作用素上で $f=\Phi_A$ が一致し、有限ランク稠密性から $S_1(H)$ 全体で一致します。

<!-- proof-start -->
### 証明

まず $A\in B(H)$ とします。

既に

$$
|\Phi_A(T)|
=
|\operatorname{Tr}(AT)|
\le
\|A\|\|T\|_1
$$

を示したので

$$
\|\Phi_A\|\le\|A\|.
$$

逆向きの評価を出します。

$\|x\|=\|y\|=1$ なら

$$
\|\theta_{x,y}\|_1=1.
$$

従って

$$
|\langle Ax,y\rangle|
=
|\operatorname{Tr}(A\theta_{x,y})|
=
|\Phi_A(\theta_{x,y})|
\le
\|\Phi_A\|.
$$

単位ベクトル $x,y$ について上限を取ると

$$
\|A\|
=
\sup_{\|x\|=\|y\|=1}
|\langle Ax,y\rangle|
\le
\|\Phi_A\|.
$$

したがって

$$
\boxed{
\|\Phi_A\|=\|A\|.
}
$$

特に $J$ は単射です。

次に全射性を示します。

$f\in S_1(H)^*$ を任意に取ります。$x,y\in H$ に対し

$$
b_f(x,y)
=
f(\theta_{x,y})
$$

と置きます。

rank-one 作用素のトレース公式から

$$
|b_f(x,y)|
\le
\|f\|\,\|\theta_{x,y}\|_1
=
\|f\|\,\|x\|\,\|y\|.
$$

従って $b_f$ は有界な半双線形形式です。

固定した $x$ に対し $y\mapsto b_f(x,y)$ は連続な共役線形汎関数です。本教材の内積は第1変数について線形なので、Riesz 表現定理により、一意なベクトル $Ax\in H$ が存在して

$$
b_f(x,y)=\langle Ax,y\rangle
$$

を全ての $y$ について満たします。

さらに $b_f$ は第1変数について線形なので、$\alpha,\beta\in\mathbb C$ と $x_1,x_2,y\in H$ に対して

$$
\begin{aligned}
\langle A(\alpha x_1+\beta x_2),y\rangle
&=
b_f(\alpha x_1+\beta x_2,y)\\
&=
\alpha b_f(x_1,y)+\beta b_f(x_2,y)\\
&=
\langle \alpha Ax_1+\beta Ax_2,y\rangle.
\end{aligned}
$$

これは全ての $y$ について成り立つので

$$
A(\alpha x_1+\beta x_2)
=
\alpha Ax_1+\beta Ax_2.
$$

従って $A$ は線形です。

さらに

$$
|\langle Ax,y\rangle|
\le
\|f\|\,\|x\|\,\|y\|
$$

なので

$$
\|Ax\|\le\|f\|\,\|x\|.
$$

したがって $A$ は有界線形作用素で

$$
\|A\|\le\|f\|.
$$

rank-one 作用素について

$$
f(\theta_{x,y})
=
\langle Ax,y\rangle
=
\operatorname{Tr}(A\theta_{x,y})
=
\Phi_A(\theta_{x,y}).
$$

有限ランク作用素は rank-one 作用素の有限和なので、$f$ と $\Phi_A$ は全ての有限ランク作用素上で一致します。

有限ランク作用素は $S_1(H)$ で稠密であり、$f,\Phi_A$ は連続だから

$$
f(T)=\Phi_A(T)
$$

が全ての $T\in S_1(H)$ について成り立ちます。

よって $J$ は全射です。

以上から

$$
\boxed{
B(H)\cong S_1(H)^*
}
$$

が等長同型として成立します。
<!-- proof-end -->

この定理は $B(H)$ を「作用素の集合」としてだけでなく、**$S_1(H)$ の双対空間**として見られることを意味します。

---

## 7. 双対空間の一つ手前

通常の双対空間では

$$
X\longmapsto X^*
$$

と進みます。

ここでは逆向きに

$$
B(H)=S_1(H)^*
$$

と書けました。つまり $S_1(H)$ は $B(H)$ の「一つ手前の空間」です。

<a id="def-vn4-predual"></a>

<!-- formal-statement-start -->
### 定義（predual）

Banach 空間 $X$ に対し、ある Banach 空間 $X_*$ が存在して

$$
X\cong X_*^*
$$

と等長同型になるとき、$X_*$ を $X$ の **predual（前双対）** と呼ぶ。
<!-- formal-statement-end -->

<!-- definition-example-start: def-vn4-predual -->

### 直接例：$B(H)$ の predual

前節の定理から

$$
B(H)\cong S_1(H)^*.
$$

したがって

$$
\boxed{
B(H)_*=S_1(H)
}
$$

と取れます。

有限次元 $H=\mathbb C^n$ なら

$$
B(H)=M_n(\mathbb C),
\qquad
S_1(H)=M_n(\mathbb C)
$$

です。

このとき pairing は

$$
\langle A,T\rangle
=
\operatorname{Tr}(AT)
$$

で、有限次元では「行列空間が トレース対合 によって自分自身の双対になる」というおなじみの状況です。

<!-- definition-example-end -->

predual は単なる記号ではありません。**どの弱*位相を使うかを決めるデータ**です。

---

## 8. 双対構造が定める弱*位相

WOT は

$$
A\mapsto\langle Ax,y\rangle
$$

という全てのベクトル汎関数を連続にする最弱の位相でした。

今は

$$
\langle Ax,y\rangle
=
\operatorname{Tr}(A\theta_{x,y})
$$

なので、ベクトル汎関数は trace class のトレース対合 の特殊例です。

そこで rank-one だけでなく、trace class 全体を試験汎関数として使います。

<a id="def-vn4-ultraweak-topology"></a>

<!-- formal-statement-start -->
### 定義（ultraweak 位相）

$B(H)=S_1(H)^*$ とみなし、predual $S_1(H)$ による弱*位相

$$
\boxed{
\sigma(B(H),S_1(H))
}
$$

を **ultraweak 位相**と呼ぶ。

**$\sigma$-weak 位相**とも呼ぶ。

ネット $(A_\alpha)$ が $A$ に ultraweak 収束するとは、

$$
\boxed{
\operatorname{Tr}(A_\alpha T)
\longrightarrow
\operatorname{Tr}(AT)
\qquad
(\forall T\in S_1(H))
}
$$

が成り立つことをいう。
<!-- formal-statement-end -->

<!-- definition-example-start: def-vn4-ultraweak-topology -->

### 直接例：有限個ではなく無限個の対角成分をまとめて読む

$H=\ell^2(\mathbb N)$ とし、

$$
T=
\operatorname{diag}(2^{-1},2^{-2},2^{-3},\ldots).
$$

すると $T\in S_1(H)$ で $\|T\|_1=1$ です。

対角作用素

$$
A=\operatorname{diag}(a_1,a_2,\ldots)
$$

に対して

$$
\operatorname{Tr}(AT)
=
\sum_{n=1}^{\infty}2^{-n}a_n.
$$

WOT の一個のベクトル汎関数は行列係数を一つの内積として読みますが、ultraweak 位相ではこのような絶対収束する無限和も一つの連続汎関数として扱えます。

<!-- definition-example-end -->

---

## 9. WOT と ultraweak 位相は何が違うか

rank-one 作用素 $\theta_{x,y}$ は trace class で

$$
\operatorname{Tr}(A\theta_{x,y})
=
\langle Ax,y\rangle
$$

でした。

従って ultraweak 位相は WOT より多くの汎関数を連続にします。

<a id="prop-vn4-wot-ultraweak"></a>

<!-- formal-statement-start -->
### 命題（WOT と ultraweak 位相の比較）

$B(H)$ 上で次が成り立つ。

1. ultraweak 位相は WOT より強い。
2. 任意の作用素ノルム有界集合
   $$
   \{A:\|A\|\le C\}
   $$
   上では、WOT と ultraweak 位相は同じ相対位相を与える。
3. $H$ が無限次元なら、$B(H)$ 全体では ultraweak 位相は WOT より真に強い。
<!-- formal-statement-end -->

<!-- proof-start -->
### 証明

#### 1. ultraweak 収束なら WOT 収束

$A_\alpha\to A$ が ultraweak 収束するとします。

任意の $x,y\in H$ に対し $\theta_{x,y}\in S_1(H)$ なので

$$
\langle A_\alpha x,y\rangle
=
\operatorname{Tr}(A_\alpha\theta_{x,y})
\longrightarrow
\operatorname{Tr}(A\theta_{x,y})
=
\langle Ax,y\rangle.
$$

従って

$$
A_\alpha\xrightarrow{\mathrm{WOT}}A.
$$

よって ultraweak 位相は WOT より強いです。

#### 2. ノルム有界集合上では逆向きも成り立つ

$\|A_\alpha\|\le C$、$\|A\|\le C$ とし、

$$
A_\alpha\xrightarrow{\mathrm{WOT}}A
$$

とします。

$T\in S_1(H)$ を固定します。

有限ランク作用素がトレースノルムで稠密なので、任意の $\varepsilon>0$ に対して有限ランク $F$ を

$$
\|T-F\|_1
<
\frac{\varepsilon}{4C}
$$

となるように取れます。$C=0$ の場合は自明なので $C>0$ とします。

有限ランク $F$ は rank-one 作用素の有限和として

$$
F=\sum_{j=1}^{m}\theta_{x_j,y_j}
$$

と書けます。

従って

$$
\operatorname{Tr}((A_\alpha-A)F)
=
\sum_{j=1}^{m}
\langle (A_\alpha-A)x_j,y_j\rangle.
$$

WOT 収束より各項は0へ収束するので

$$
\operatorname{Tr}((A_\alpha-A)F)\to0.
$$

一方、

$$
\begin{aligned}
|\operatorname{Tr}((A_\alpha-A)(T-F))|
&\le
\|A_\alpha-A\|\,\|T-F\|_1\\
&\le
2C\|T-F\|_1\\
&<
\frac{\varepsilon}{2}.
\end{aligned}
$$

従って十分大きな $\alpha$ で

$$
|\operatorname{Tr}((A_\alpha-A)F)|
<
\frac{\varepsilon}{2}.
$$

二つを合わせると

$$
|\operatorname{Tr}((A_\alpha-A)T)|
<
\varepsilon.
$$

よって

$$
A_\alpha\xrightarrow{\mathrm{ultraweak}}A.
$$

したがって作用素ノルム有界集合上では WOT と ultraweak 位相は一致します。

#### 3. 無限次元では全体としては異なる

$H$ を無限次元とし、正規直交列 $(e_n)$ を取ります。

$$
D=
\sum_{n=1}^{\infty}2^{-n}\theta_{e_n,e_n}
$$

と置くと

$$
D\in S_1(H)
$$

であり、$D$ は無限 rank です。

汎関数

$$
\varphi_D(A)=\operatorname{Tr}(AD)
$$

は定義から ultraweak 連続です。

もし $\varphi_D$ が WOT 連続なら、WOT の0近傍は有限個の半ノルム

$$
A\mapsto|\langle Ax_j,y_j\rangle|
$$

で生成されるので、$\varphi_D$ は有限個のベクトル汎関数の線形結合になります。

従ってある有限ランク作用素 $F$ が存在して

$$
\varphi_D(A)=\operatorname{Tr}(AF)
$$

が全ての $A\in B(H)$ について成り立ちます。

しかし トレース双対性 の単射性から

$$
D=F
$$

となり、$D$ が無限 rank であることに矛盾します。

したがって $\varphi_D$ は WOT 連続ではありません。

よって無限次元では

$$
\boxed{
\mathrm{WOT}
\subsetneq
\text{ultraweak}.
}
$$
<!-- proof-end -->

ここで「ノルム有界集合上では同じなのに、全体では違う」ことが重要です。

実際、von Neumann 環の単位球や状態空間を扱うときには両位相が同じ収束を与える場面が多い一方、**双対空間としての構造を記録するには ultraweak 位相が必要**です。

---

## 10. 座標射影は ultraweak に0へ行くが、ノルムでは行かない

$H=\ell^2(\mathbb N)$ で

$$
P_n=\theta_{e_n,e_n}
$$

を $e_n$ 方向への rank-one 射影とします。

任意の $x,y\in\ell^2$ に対し

$$
\langle P_nx,y\rangle
=
\langle x,e_n\rangle\langle e_n,y\rangle.
$$

$\ell^2$ 列の各成分は0へ収束するので

$$
\langle P_nx,y\rangle\to0.
$$

従って

$$
P_n\xrightarrow{\mathrm{WOT}}0.
$$

しかも

$$
\|P_n\|=1
$$

なので $(P_n)$ はノルム有界です。

前節の命題から

$$
\boxed{
P_n\xrightarrow{\mathrm{ultraweak}}0.
}
$$

一方

$$
\|P_n\|=1
$$

のままなのでノルム収束はしません。

この例は

$$
\text{ノルム位相}
\quad\Longrightarrow\quad
\text{ultraweak}
\quad\Longrightarrow\quad
\mathrm{WOT}
$$

という強さの違いを具体的に示します。

---

## 11. 一般の von Neumann 環にも predual がある

$B(H)$ 自身では predual が $S_1(H)$ でした。

では具体的 von Neumann 環

$$
M\subset B(H)
$$

ではどうなるでしょうか。

$S_1(H)$ のうち、$M$ の全ての元を トレース対合 で0にする作用素を集めます。

$$
M_\perp
=
\left\{
T\in S_1(H):
\operatorname{Tr}(AT)=0
\quad
(\forall A\in M)
\right\}.
$$

これは $S_1(H)$ の閉部分空間です。

そこで商空間

$$
S_1(H)/M_\perp
$$

を考えます。

二つの trace class 作用素 $T_1,T_2$ が同じ剰余類を表すとは

$$
T_1-T_2\in M_\perp
$$

ということです。つまり $M$ の元に pairing したとき、$T_1$ と $T_2$ は全く区別できません。

### 商空間の双対を Banach 空間で使う準備

[LA3A の商空間の双対と零化空間](../LA3A/index.md#thm-la3a-quotient-dual-annihilator)では、標準商写像

$$
q:X\to X/Y
$$

に対して

$$
(X/Y)^*
\cong
Y^\perp
=
\{f\in X^*:f(y)=0\ (\forall y\in Y)\}
$$

となる線形同型を構成しました。

ここでは $X$ が Banach 空間、$Y$ が閉部分空間なので商ノルムも入っています。同じ写像

$$
g\longmapsto g\circ q
$$

が等長であることだけ確認します。

$q$ は

$$
\|q(x)\|
=
\inf_{y\in Y}\|x+y\|
\le
\|x\|
$$

を満たすので

$$
\|g\circ q\|\le\|g\|.
$$

逆に $z=q(x)$ と $\varepsilon>0$ に対して、商ノルムの定義から

$$
\|x+y\|<\|z\|+\varepsilon
$$

となる $y\in Y$ を取れます。すると

$$
|g(z)|
=
|(g\circ q)(x+y)|
\le
\|g\circ q\|
(\|z\|+\varepsilon).
$$

$\varepsilon\downarrow0$ として

$$
\|g\|\le\|g\circ q\|.
$$

従って

$$
\boxed{
\|g\circ q\|=\|g\|.
}
$$

つまり LA3A の線形同型は、この Banach 空間の状況では等長同型として使えます。

<a id="thm-vn4-von-neumann-predual"></a>

<!-- formal-statement-start -->
### 定理（具体的 von Neumann 環の predual）

$M\subset B(H)$ を von Neumann 環とし、

$$
M_\perp
=
\{T\in S_1(H):\operatorname{Tr}(AT)=0\ \forall A\in M\}
$$

とする。

このとき

$$
\boxed{
M_*
=
S_1(H)/M_\perp
}
$$

は $M$ の predual になり、

$$
\boxed{
M\cong M_*^*
}
$$

が等長同型として成り立つ。
<!-- formal-statement-end -->

### 証明の見取り図

Banach 空間の一般論では、閉部分空間 $Y\subset X$ に対して

$$
(X/Y)^*
\cong
Y^\perp
\subset X^*
$$

です。

ここで

$$
X=S_1(H),
\qquad
Y=M_\perp
$$

と置きます。

さらに

$$
S_1(H)^*=B(H)
$$

を使うと、$(M_\perp)^\perp$ は $B(H)$ の中で $M$ を ultraweak に閉じたものになります。

von Neumann 環 $M$ は WOT 閉で、ultraweak 位相は WOT より強いので、$M$ は ultraweak にも閉じています。

<!-- proof-start -->
### 証明

[LA3A の商空間の双対と零化空間](../LA3A/index.md#thm-la3a-quotient-dual-annihilator)を

$$
X=S_1(H),
\qquad
Y=M_\perp
$$

に適用すると

$$
\left(S_1(H)/M_\perp\right)^*
\cong
(M_\perp)^\perp
$$

を得ます。

ここで右辺は

$$
(M_\perp)^\perp
=
\left\{
A\in S_1(H)^*:
f_T(A)=0
\text{ for every }T\in M_\perp
\right\}
$$

です。

トレース双対性

$$
S_1(H)^*=B(H)
$$

を使えば

$$
(M_\perp)^\perp
=
\left\{
A\in B(H):
\operatorname{Tr}(AT)=0
\quad
(\forall T\in M_\perp)
\right\}.
$$

まず $M\subset(M_\perp)^\perp$ は定義から明らかです。

逆包含を示すため、$A\notin M$ と仮定します。$M$ は von Neumann 環なので WOT 閉であり、ultraweak 位相は WOT より強いので $M$ は ultraweak 位相でも閉です。

従って $A$ を含み $M$ と交わらない ultraweak 基本近傍が存在します。すなわち、ある

$$
T_1,\ldots,T_n\in S_1(H),
\qquad
\varepsilon>0
$$

が存在して、

$$
|\operatorname{Tr}((B-A)T_j)|<\varepsilon
\qquad
(j=1,\ldots,n)
$$

を全て満たす $B$ は $M$ に属しません。

線形写像

$$
L:B(H)\to\mathbb C^n,
\qquad
L(B)
=
\bigl(
\operatorname{Tr}(BT_1),\ldots,
\operatorname{Tr}(BT_n)
\bigr)
$$

を考えます。

もし $L(A)\in L(M)$ なら、ある $B\in M$ が存在して

$$
L(B)=L(A)
$$

となります。このとき全ての $j$ について

$$
\operatorname{Tr}((B-A)T_j)=0
$$

となり、上の基本近傍に $B\in M$ が入ってしまいます。これは矛盾です。

したがって

$$
L(A)\notin L(M).
$$

$L(M)$ は有限次元空間 $\mathbb C^n$ の線形部分空間なので、有限次元線形代数により、ある線形汎関数

$$
\lambda:\mathbb C^n\to\mathbb C
$$

が存在して

$$
\lambda|_{L(M)}=0,
\qquad
\lambda(L(A))\ne0
$$

となります。

$$
\lambda(z_1,\ldots,z_n)
=
\sum_{j=1}^{n}c_jz_j
$$

と書き、

$$
T=\sum_{j=1}^{n}c_jT_j\in S_1(H)
$$

と置きます。

任意の $B\in M$ に対し

$$
\operatorname{Tr}(BT)
=
\sum_{j=1}^{n}
c_j\operatorname{Tr}(BT_j)
=
\lambda(L(B))
=
0.
$$

従って

$$
T\in M_\perp.
$$

一方

$$
\operatorname{Tr}(AT)
=
\lambda(L(A))
\ne0.
$$

よって

$$
A\notin(M_\perp)^\perp.
$$

対偶から

$$
(M_\perp)^\perp\subset M.
$$

したがって

$$
\boxed{
(M_\perp)^\perp=M.
}
$$

したがって

$$
\boxed{
\left(S_1(H)/M_\perp\right)^*
\cong
M.
}
$$

つまり

$$
\boxed{
M_*=S_1(H)/M_\perp
}
$$

は $M$ の predual です。
<!-- proof-end -->

この定理で、具体的 von Neumann 環を

> WOT 閉な作用素代数

としてだけでなく、

> 自然な predual を持つ双対 Banach 空間

としても見られるようになりました。

抽象 $C^*$-環について「Banach 空間として predual を持つこと」が von Neumann 環を特徴付けるという深い結果が Sakai の定理です。本章ではその逆向きの一般証明までは使いません。ここで必要なのは、具体的 von Neumann 環 $M\subset B(H)$ に対して上の quotient から predual を実際に構成できることです。

---

## 12. 対角 von Neumann 環では $\ell^\infty$ と $\ell^1$ が現れる

$H=\ell^2(\mathbb N)$ とし、

$$
M=
\{
\operatorname{diag}(a_1,a_2,\ldots):
(a_n)\in\ell^\infty
\}
$$

を考えます。

この $M$ は可換 von Neumann 環です。

$T\in S_1(H)$ に対して

$$
d(T)
=
\bigl(
\langle Te_1,e_1\rangle,
\langle Te_2,e_2\rangle,
\ldots
\bigr)
$$

と置きます。

trace class の対角成分は絶対可算で、

$$
\sum_{n=1}^{\infty}
|\langle Te_n,e_n\rangle|
\le
\|T\|_1.
$$

したがって

$$
d(T)\in\ell^1.
$$

対角作用素

$$
A=\operatorname{diag}(a_n)
$$

に対して

$$
\operatorname{Tr}(AT)
=
\sum_{n=1}^{\infty}
a_n\langle Te_n,e_n\rangle.
$$

つまり $M$ から見れば、$T$ の off-diagonal 成分は全く見えません。

実際

$$
M_\perp
=
\{T\in S_1(H):\langle Te_n,e_n\rangle=0\ \forall n\}.
$$

従って quotient では対角成分だけが残り、

$$
\boxed{
M_*\cong\ell^1.
}
$$

一方

$$
M\cong\ell^\infty
$$

なので

$$
\boxed{
\ell^\infty\cong(\ell^1)^*
}
$$

という標準的な双対性が、von Neumann 環の predual としてそのまま現れます。

これは VN6 で $L^\infty$ を扱うときの最も離散的な模型になります。

---

## 13. この章で何が変わったか

VN1 では作用素列をベクトルごと・行列係数ごとに見ました。

VN2 では WOT 閉包と二重可換子から von Neumann 環を作りました。

VN3 では一つの作用素の内部構造を、支持射影・部分等長作用素・極分解で分解しました。

本章では視点をもう一度切り替えました。

$$
\boxed{
\text{作用素 }A
\text{ を直接見る}
}
$$

のではなく、

$$
\boxed{
T\in S_1(H)
\text{ を使って }
\operatorname{Tr}(AT)
\text{ を読む}
}
$$

ことで $B(H)$ を双対空間として捉えました。

その結果、

$$
\boxed{
B(H)=S_1(H)^*
}
$$

と

$$
\boxed{
M
=
\left(S_1(H)/M_\perp\right)^*
}
$$

が得られ、von Neumann 環に自然な弱*位相である ultraweak 位相が現れました。

次章 VN5 では、この predual の元を「汎関数」として直接見ます。特に

- 正規汎関数
- 正規状態
- ultraweak 連続性
- 密度作用素
- トレース

を結び、量子状態と von Neumann 環の双対構造を接続します。

---

# 演習

## Level A

### A1. $2\times2$ 行列の トレースノルム と トレース

$$
T=
\begin{pmatrix}
1&0\\
0&-2
\end{pmatrix}
$$

とする。

1. $|T|$ を求めよ。
2. 特異値 $s_1(T),s_2(T)$ を求めよ。
3. $\|T\|_1$ と $\operatorname{Tr}(T)$ を求めよ。
4.
   $$
   A=
   \begin{pmatrix}
   3&0\\
   0&4
   \end{pmatrix}
   $$
   とするとき $\operatorname{Tr}(AT)$ を求めよ。

- Level: A

#### 詳細解答

$T=T^*$ なので

$$
T^*T
=
T^2
=
\begin{pmatrix}
1&0\\
0&4
\end{pmatrix}.
$$

正の平方根を取ると

$$
|T|
=
(T^*T)^{1/2}
=
\boxed{
\begin{pmatrix}
1&0\\
0&2
\end{pmatrix}
}.
$$

従って特異値は $|T|$ の固有値を大きい順に並べて

$$
\boxed{
s_1(T)=2,
\qquad
s_2(T)=1.
}
$$

よって

$$
\|T\|_1
=
s_1(T)+s_2(T)
=
\boxed{3}.
$$

有限次元のトレース は対角和なので

$$
\operatorname{Tr}(T)
=
1+(-2)
=
\boxed{-1}.
$$

最後に

$$
AT
=
\begin{pmatrix}
3&0\\
0&4
\end{pmatrix}
\begin{pmatrix}
1&0\\
0&-2
\end{pmatrix}
=
\begin{pmatrix}
3&0\\
0&-8
\end{pmatrix}.
$$

従って

$$
\boxed{
\operatorname{Tr}(AT)=3-8=-5.
}
$$

---

### A2. rank-one 作用素のトレース class 計算

$x,y\in H$ に対して

$$
\theta_{x,y}z=\langle z,y\rangle x
$$

とする。

1. $\theta_{x,y}^*$ を求めよ。
2. $\theta_{x,y}^*\theta_{x,y}$ を計算せよ。
3. $\|\theta_{x,y}\|_1=\|x\|\|y\|$ を示せ。
4. $A\in B(H)$ に対して
   $$
   \operatorname{Tr}(A\theta_{x,y})
   =
   \langle Ax,y\rangle
   $$
   を示せ。

- Level: A

#### 詳細解答

任意の $u,v\in H$ に対し

$$
\langle\theta_{x,y}u,v\rangle
=
\langle u,y\rangle\langle x,v\rangle.
$$

一方

$$
\langle u,\theta_{y,x}v\rangle
=
\left\langle
u,
\langle v,x\rangle y
\right\rangle
=
\langle u,y\rangle\langle x,v\rangle.
$$

従って

$$
\boxed{
\theta_{x,y}^*=\theta_{y,x}.
}
$$

次に

$$
\theta_{x,y}^*\theta_{x,y}z
=
\theta_{y,x}\bigl(\langle z,y\rangle x\bigr)
=
\langle z,y\rangle\langle x,x\rangle y.
$$

したがって

$$
\theta_{x,y}^*\theta_{x,y}
=
\|x\|^2\theta_{y,y}.
$$

$y$ 方向の固有値を調べると

$$
\theta_{y,y}y
=
\langle y,y\rangle y
=
\|y\|^2y.
$$

よって唯一の非零固有値は

$$
\|x\|^2\|y\|^2.
$$

従って $\theta_{x,y}$ の唯一の非零特異値は

$$
\|x\|\|y\|.
$$

したがって

$$
\boxed{
\|\theta_{x,y}\|_1=\|x\|\|y\|.
}
$$

最後に

$$
A\theta_{x,y}z
=
A(\langle z,y\rangle x)
=
\langle z,y\rangle Ax
=
\theta_{Ax,y}z.
$$

従って

$$
A\theta_{x,y}
=
\theta_{Ax,y}.
$$

rank-one 作用素のトレース公式を使うと

$$
\operatorname{Tr}(A\theta_{x,y})
=
\operatorname{Tr}(\theta_{Ax,y})
=
\boxed{\langle Ax,y\rangle}.
$$

---

### A3. 対角 trace class

$H=\ell^2(\mathbb N)$ とし、

$$
Te_n=(-1)^{n-1}2^{-n}e_n
$$

とする。

1. $T$ が trace class であることを示せ。
2. $\|T\|_1$ を求めよ。
3. $\operatorname{Tr}(T)$ を求めよ。

- Level: A

#### 詳細解答

$T$ は対角作用素なので

$$
|T|e_n
=
|(-1)^{n-1}2^{-n}|e_n
=
2^{-n}e_n.
$$

従って特異値は

$$
s_n(T)=2^{-n}.
$$

よって

$$
\sum_{n=1}^{\infty}s_n(T)
=
\sum_{n=1}^{\infty}2^{-n}
=
1<\infty.
$$

したがって

$$
\boxed{T\in S_1(H)}.
$$

トレースノルムは

$$
\boxed{
\|T\|_1=1.
}
$$

トレース は対角成分の絶対収束級数として

$$
\operatorname{Tr}(T)
=
\sum_{n=1}^{\infty}
(-1)^{n-1}2^{-n}.
$$

これは初項 $1/2$、公比 $-1/2$ の等比級数なので

$$
\operatorname{Tr}(T)
=
\frac{1/2}{1-(-1/2)}
=
\frac{1/2}{3/2}
=
\boxed{\frac13}.
$$

---

### A4. rank-one 射影の ultraweak 収束

$H=\ell^2(\mathbb N)$ とし、

$$
P_n=\theta_{e_n,e_n}
$$

とする。

1. $P_n\xrightarrow{\mathrm{WOT}}0$ を示せ。
2. $\|P_n\|=1$ を示せ。
3. $P_n\xrightarrow{\mathrm{ultraweak}}0$ を示せ。
4. $P_n$ が作用素ノルムでは0へ収束しないことを確認せよ。

- Level: A

#### 詳細解答

$x=(x_k)$、$y=(y_k)$ とすると

$$
P_nx=x_ne_n.
$$

従って

$$
\langle P_nx,y\rangle
=
x_n\overline{y_n}.
$$

$\ell^2$ 列では各成分が0へ収束するので

$$
x_n\to0,
\qquad
y_n\to0.
$$

したがって

$$
\langle P_nx,y\rangle\to0.
$$

$x,y$ は任意だから

$$
\boxed{
P_n\xrightarrow{\mathrm{WOT}}0.
}
$$

また

$$
P_ne_n=e_n
$$

なので $\|P_n\|\ge1$ です。一方直交射影のノルムは1以下だから

$$
\boxed{\|P_n\|=1}.
$$

従って $(P_n)$ は作用素ノルム有界です。

ノルム有界集合上では WOT と ultraweak 位相が一致するので

$$
\boxed{
P_n\xrightarrow{\mathrm{ultraweak}}0.
}
$$

しかし

$$
\|P_n-0\|=1
$$

が全ての $n$ で成り立つので、作用素ノルムでは0へ収束しません。

---

## Level B

### B1. コンパクトだが trace class ではない作用素

$H=\ell^2(\mathbb N)$ で

$$
Te_n=\frac1n e_n
$$

とする。

1. $T$ がコンパクトであることを示せ。
2. $s_n(T)$ を求めよ。
3. $T$ が trace class でないことを示せ。
4. rank が $N$ 以下の作用素 $R$ に対する最小近似誤差
   $$
   \inf_{\operatorname{rank}R\le N}\|T-R\|
   $$
   を求めよ。

- Level: B

#### 詳細解答

$T$ は対角作用素で、対角成分 $1/n$ は0へ収束します。

$P_N$ を最初の $N$ 座標への射影とし

$$
T_N=TP_N
$$

と置くと $T_N$ は有限ランクです。

また

$$
(T-T_N)e_n
=
\begin{cases}
0,&n\le N,\\
n^{-1}e_n,&n>N.
\end{cases}
$$

なので

$$
\|T-T_N\|
=
\sup_{n>N}\frac1n
=
\frac1{N+1}
\to0.
$$

有限ランク作用素の作用素ノルム極限はコンパクトだから

$$
\boxed{T\text{ はコンパクト}}.
$$

$T$ は正なので $|T|=T$ です。従って特異値は

$$
\boxed{
s_n(T)=\frac1n.
}
$$

しかし

$$
\sum_{n=1}^{\infty}s_n(T)
=
\sum_{n=1}^{\infty}\frac1n
=
\infty.
$$

よって

$$
\boxed{
T\notin S_1(H).
}
$$

最後に[特異値と最良有限ランク近似](#lem-vn4-best-rank-approximation)から

$$
\inf_{\operatorname{rank}R\le N}\|T-R\|
=
s_{N+1}(T)
=
\boxed{\frac1{N+1}}.
$$

この問題は「コンパクトなら trace class」という誤解が成り立たないことを示しています。

---

### B2. trace class のイデアル性と cyclicity

$A\in B(H)$、$T\in S_1(H)$ とする。

1. $AT,TA\in S_1(H)$ を示せ。
2.
   $$
   \|AT\|_1\le\|A\|\|T\|_1,
   \qquad
   \|TA\|_1\le\|A\|\|T\|_1
   $$
   を示せ。
3.
   $$
   \operatorname{Tr}(AT)=\operatorname{Tr}(TA)
   $$
   を、有限ランク近似から示せ。

- Level: B

#### 詳細解答

特異値と最良有限ランク近似の関係から

$$
s_n(AT)\le\|A\|s_n(T).
$$

従って

$$
\sum_{n=1}^{\infty}s_n(AT)
\le
\|A\|
\sum_{n=1}^{\infty}s_n(T)
<
\infty.
$$

よって

$$
AT\in S_1(H)
$$

で、

$$
\boxed{
\|AT\|_1\le\|A\|\|T\|_1.
}
$$

随伴を取ると $T^*A^*$ について同じ評価が使えます。$T$ と $T^*$ は同じ特異値を持つので

$$
\|TA\|_1
=
\|A^*T^*\|_1
\le
\|A^*\|\|T^*\|_1
=
\|A\|\|T\|_1.
$$

従って

$$
\boxed{
TA\in S_1(H),
\qquad
\|TA\|_1\le\|A\|\|T\|_1.
}
$$

次に有限ランク $F_m$ を

$$
\|F_m-T\|_1\to0
$$

となるように取ります。

有限ランクでは通常の有限次元 トレース の cyclicity から

$$
\operatorname{Tr}(AF_m)
=
\operatorname{Tr}(F_mA).
$$

一方

$$
|\operatorname{Tr}(A(F_m-T))|
\le
\|A\|\|F_m-T\|_1
\to0
$$

であり、

$$
|\operatorname{Tr}((F_m-T)A)|
\le
\|A\|\|F_m-T\|_1
\to0.
$$

したがって $m\to\infty$ とすると

$$
\boxed{
\operatorname{Tr}(AT)=\operatorname{Tr}(TA).
}
$$

---

### B3. ノルム有界 WOT 収束から ultraweak 収束へ

$(A_\alpha)$ を $B(H)$ のネットとし、

$$
\|A_\alpha\|\le C,
\qquad
\|A\|\le C
$$

かつ

$$
A_\alpha\xrightarrow{\mathrm{WOT}}A
$$

とする。

有限ランク稠密性だけを使って

$$
A_\alpha\xrightarrow{\mathrm{ultraweak}}A
$$

を証明せよ。

- Level: B

#### 詳細解答

ultraweak 収束を示すには、任意の

$$
T\in S_1(H)
$$

について

$$
\operatorname{Tr}((A_\alpha-A)T)\to0
$$

を示せばよいです。

$\varepsilon>0$ を固定します。

有限ランク作用素は $S_1(H)$ で稠密なので、有限ランク $F$ を

$$
\|T-F\|_1
<
\frac{\varepsilon}{4C}
$$

となるように取ります。$C=0$ なら自明なので $C>0$ とします。

有限ランク $F$ は

$$
F=\sum_{j=1}^{m}\theta_{x_j,y_j}
$$

と rank-one 作用素の有限和で書けます。

従って

$$
\operatorname{Tr}((A_\alpha-A)F)
=
\sum_{j=1}^{m}
\operatorname{Tr}((A_\alpha-A)\theta_{x_j,y_j}).
$$

rank-one 作用素のトレース公式より

$$
\operatorname{Tr}((A_\alpha-A)\theta_{x_j,y_j})
=
\langle(A_\alpha-A)x_j,y_j\rangle.
$$

WOT 収束から各項は0へ収束し、有限和なので

$$
\operatorname{Tr}((A_\alpha-A)F)\to0.
$$

従って十分大きな $\alpha$ について

$$
|\operatorname{Tr}((A_\alpha-A)F)|
<
\frac{\varepsilon}{2}.
$$

残差については

$$
\begin{aligned}
|\operatorname{Tr}((A_\alpha-A)(T-F))|
&\le
\|A_\alpha-A\|\,\|T-F\|_1\\
&\le
2C\|T-F\|_1\\
&<
\frac{\varepsilon}{2}.
\end{aligned}
$$

したがって

$$
|\operatorname{Tr}((A_\alpha-A)T)|
<
\varepsilon.
$$

$T$ は任意なので

$$
\boxed{
A_\alpha\xrightarrow{\mathrm{ultraweak}}A.
}
$$

---

### B4. 対角 von Neumann 環の predual

$H=\ell^2(\mathbb N)$ とし、

$$
M=
\{
\operatorname{diag}(a_n):(a_n)\in\ell^\infty
\}
$$

とする。

$T\in S_1(H)$ に対して

$$
d(T)
=
(\langle Te_n,e_n\rangle)_{n\ge1}
$$

と置く。

1. $d(T)\in\ell^1$ を示せ。
2. $d:S_1(H)\to\ell^1$ が全射であることを示せ。
3.
   $$
   \ker d=M_\perp
   $$
   を示せ。
4. 商空間から
   $$
   M_*\cong\ell^1
   $$
   を導け。

- Level: B

#### 詳細解答

まず有限集合 $F\subset\mathbb N$ を固定します。

各 $n\in F$ について複素数 $\lambda_n$ を

$$
|\lambda_n|=1,
\qquad
\lambda_n\langle Te_n,e_n\rangle
=
|\langle Te_n,e_n\rangle|
$$

となるように選びます。

有限ランク作用素

$$
D_F
=
\sum_{n\in F}
\lambda_n\theta_{e_n,e_n}
$$

を取ると

$$
\|D_F\|\le1.
$$

したがって

$$
\begin{aligned}
\sum_{n\in F}
|\langle Te_n,e_n\rangle|
&=
\left|
\sum_{n\in F}
\lambda_n\langle Te_n,e_n\rangle
\right|\\
&=
|\operatorname{Tr}(D_FT)|\\
&\le
\|D_F\|\,\|T\|_1\\
&\le
\|T\|_1.
\end{aligned}
$$

有限集合 $F$ について上限を取ると

$$
\sum_{n=1}^{\infty}
|\langle Te_n,e_n\rangle|
\le
\|T\|_1.
$$

従って

$$
\boxed{
d(T)\in\ell^1.
}
$$

次に $(t_n)\in\ell^1$ を任意に取ります。

対角作用素

$$
Te_n=t_ne_n
$$

と定めると、特異値は $|t_n|$ を大きい順に並べたものです。従って

$$
\|T\|_1
=
\sum_{n=1}^{\infty}|t_n|
<
\infty.
$$

よって $T\in S_1(H)$ で、

$$
d(T)=(t_n).
$$

したがって $d$ は全射です。

次に

$$
A=\operatorname{diag}(a_n)\in M
$$

とします。

トレース対合 は

$$
\operatorname{Tr}(AT)
=
\sum_{n=1}^{\infty}
a_n\langle Te_n,e_n\rangle.
$$

したがって $d(T)=0$ なら全ての $A\in M$ に対し $\operatorname{Tr}(AT)=0$ なので

$$
T\in M_\perp.
$$

逆に $T\in M_\perp$ とします。$A=P_n=\theta_{e_n,e_n}$ を取れば $P_n\in M$ なので

$$
0
=
\operatorname{Tr}(P_nT)
=
\langle Te_n,e_n\rangle.
$$

全ての $n$ について成り立つから

$$
d(T)=0.
$$

従って

$$
\boxed{
\ker d=M_\perp.
}
$$

第一同型定理から

$$
S_1(H)/M_\perp
\cong
\ell^1.
$$

一般の predual 構成

$$
M_*=S_1(H)/M_\perp
$$

と合わせて

$$
\boxed{
M_*\cong\ell^1.
}
$$

---

## Level C

### C1. $B(H)=S_1(H)^*$ を rank-one 作用素から再構成する

$H$ を複素 Hilbert 空間とする。以下を順に示せ。

1. $x,y\in H$ に対する
   $$
   \theta_{x,y}z=\langle z,y\rangle x
   $$
   について
   $$
   \|\theta_{x,y}\|_1=\|x\|\|y\|,
   \qquad
   \operatorname{Tr}(A\theta_{x,y})=\langle Ax,y\rangle
   $$
   を示せ。
2. $A\in B(H)$ に対して
   $$
   \Phi_A(T)=\operatorname{Tr}(AT)
   $$
   と置くと
   $$
   \|\Phi_A\|=\|A\|
   $$
   を示せ。
3. 任意の $f\in S_1(H)^*$ に対し
   $$
   b_f(x,y)=f(\theta_{x,y})
   $$
   と置き、Riesz 表現定理から $A\in B(H)$ を構成して
   $$
   f=\Phi_A
   $$
   を示せ。
4. 以上から
   $$
   B(H)\cong S_1(H)^*
   $$
   を導け。
5. さらに
   $$
   M_\perp
   =
   \{T\in S_1(H):\operatorname{Tr}(AT)=0\ \forall A\in M\}
   $$
   を使い、具体的 von Neumann 環 $M\subset B(H)$ に対して
   $$
   M_*=S_1(H)/M_\perp
   $$
   が predual になる理由を説明せよ。

- Level: C

#### 詳細解答

まず rank-one 作用素を調べます。

$$
\theta_{x,y}^*=\theta_{y,x}
$$

なので

$$
\theta_{x,y}^*\theta_{x,y}z
=
\langle z,y\rangle\|x\|^2y.
$$

従って唯一の非零固有値は

$$
\|x\|^2\|y\|^2.
$$

よって唯一の非零特異値は

$$
\|x\|\|y\|.
$$

したがって

$$
\boxed{
\|\theta_{x,y}\|_1=\|x\|\|y\|.
}
$$

また

$$
A\theta_{x,y}
=
\theta_{Ax,y}.
$$

rank-one 作用素のトレース公式から

$$
\boxed{
\operatorname{Tr}(A\theta_{x,y})
=
\langle Ax,y\rangle.
}
$$

次に

$$
\Phi_A(T)=\operatorname{Tr}(AT)
$$

と置きます。

イデアル評価と トレース の連続性から

$$
|\Phi_A(T)|
\le
\|A\|\|T\|_1.
$$

従って

$$
\|\Phi_A\|\le\|A\|.
$$

逆に単位ベクトル $x,y$ を取ると

$$
\|\theta_{x,y}\|_1=1
$$

なので

$$
|\langle Ax,y\rangle|
=
|\Phi_A(\theta_{x,y})|
\le
\|\Phi_A\|.
$$

$x,y$ について上限を取ると

$$
\|A\|\le\|\Phi_A\|.
$$

よって

$$
\boxed{
\|\Phi_A\|=\|A\|.
}
$$

次に $f\in S_1(H)^*$ を任意に取ります。

$$
b_f(x,y)
=
f(\theta_{x,y})
$$

と置くと

$$
|b_f(x,y)|
\le
\|f\|\,\|\theta_{x,y}\|_1
=
\|f\|\,\|x\|\,\|y\|.
$$

従って $b_f$ は有界半双線形形式です。

固定した $x$ に対して $y\mapsto b_f(x,y)$ は連続な共役線形汎関数です。本教材の内積は第1変数について線形なので、Riesz 表現定理を適用すると、一意な $Ax\in H$ が存在して

$$
b_f(x,y)=\langle Ax,y\rangle
$$

となります。

$b_f$ は第1変数について線形なので、全ての $y$ について

$$
\begin{aligned}
\langle A(\alpha x_1+\beta x_2),y\rangle
&=
b_f(\alpha x_1+\beta x_2,y)\\
&=
\alpha b_f(x_1,y)+\beta b_f(x_2,y)\\
&=
\langle \alpha Ax_1+\beta Ax_2,y\rangle.
\end{aligned}
$$

従って

$$
A(\alpha x_1+\beta x_2)
=
\alpha Ax_1+\beta Ax_2,
$$

すなわち $A$ は線形です。

しかも

$$
|\langle Ax,y\rangle|
\le
\|f\|\,\|x\|\,\|y\|
$$

なので

$$
\|Ax\|\le\|f\|\,\|x\|.
$$

したがって

$$
A\in B(H).
$$

rank-one 作用素について

$$
f(\theta_{x,y})
=
\langle Ax,y\rangle
=
\operatorname{Tr}(A\theta_{x,y})
=
\Phi_A(\theta_{x,y}).
$$

有限ランク作用素は rank-one 作用素の有限和なので $f=\Phi_A$ が有限ランク作用素上で成り立ちます。

有限ランク作用素は $S_1(H)$ でトレースノルム稠密であり、両者は連続だから

$$
f=\Phi_A
$$

が $S_1(H)$ 全体で成り立ちます。

従って写像

$$
A\longmapsto\Phi_A
$$

は全射です。

先ほど

$$
\|\Phi_A\|=\|A\|
$$

も示したので

$$
\boxed{
B(H)\cong S_1(H)^*
}
$$

が等長同型として成立します。

最後に具体的 von Neumann 環 $M\subset B(H)$ を考えます。

$$
M_\perp
=
\{T\in S_1(H):\operatorname{Tr}(AT)=0\ \forall A\in M\}
$$

は $S_1(H)$ の閉部分空間です。

[LA3A の商空間の双対と零化空間](../LA3A/index.md#thm-la3a-quotient-dual-annihilator)から

$$
\left(S_1(H)/M_\perp\right)^*
\cong
(M_\perp)^\perp.
$$

ここで $S_1(H)^*=B(H)$ なので、$(M_\perp)^\perp$ は $M$ の ultraweak 閉包です。

von Neumann 環 $M$ は WOT 閉であり、ultraweak 位相は WOT より強いので $M$ は ultraweak にも閉じています。

従って

$$
(M_\perp)^\perp=M.
$$

よって

$$
\boxed{
\left(S_1(H)/M_\perp\right)^*
\cong M.
}
$$

したがって

$$
\boxed{
M_*=S_1(H)/M_\perp
}
$$

は $M$ の predual です。

この一問で、rank-one 作用素から トレース対合 を作り、$B(H)$ の双対表示を証明し、さらに一般の具体的 von Neumann 環の predual まで再構成できました。
