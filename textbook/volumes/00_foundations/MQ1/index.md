# MQ1 微分作用素・Schrödinger 作用素と本質的自己共役性

[MQ0](../MQ0/index.md) では、古典 Hamiltonian を量子作用素へ移す規則を考えました。しかし、式を書くだけでは量子力学の時間発展は定まりません。例えば微分式 $-\Delta$ を $L^2$ 上で使うには、**どの関数を定義域とするか**を決め、その作用素が自己共役であることを示す必要があります。

この章の中心問いは、最初は滑らかな急減少関数上でしか計算していない微分式から、どうやって自己共役 Hamiltonian を一意に得るか、そしてポテンシャル $V$ を加えたとき何が保たれるか、です。[QM5 の自己共役性](../QM5/index.md#def-qm5-self-adjoint)、[QM6 の自由粒子のスペクトル表示](../QM6/index.md#prop-qm6-free-hamiltonian)、[EVOL1 の core](../EVOL1/index.md#def-evol1-core) を使います。一般理論をただ再掲するのでなく、自由粒子で閉包を**実際に構成**し、定義域の検証まで行います。

記号を固定します。$d\ge1$、質量 $m>0$、Planck 定数 $\hbar>0$ とし、複素 Hilbert 空間 $\mathcal H=L^2(\mathbb R^d,dx)$ の内積は第1変数について線形とします。$\mathcal S(\mathbb R^d)$ は Schwartz 空間、$\mathcal F$ はユニタリな Fourier 変換で、$\widehat\psi=\mathcal F\psi$ と書きます。$d$ 次元では

$$
\widehat\psi(\xi)=(2\pi)^{-d/2}\int_{\mathbb R^d}e^{-ix\cdot\xi}\psi(x)\,dx.
$$

$\mathcal S$ 上で微分を Fourier 変換すると、$\widehat{\partial_j\psi}(\xi)=i\xi_j\widehat\psi(\xi)$ です。$L^2$ への拡張には [FOU4 の一次元 $L^2$ Fourier 反転](../FOU4/index.md#thm-fou4-l2-inversion) を使います。ただし FOU4 の式は正規化前の一次元変換なので、**ここで使う $d$ 次元ユニタリ変換への橋渡し**も確認します。

一次元で $\mathcal F_1f=(2\pi)^{-1/2}\int e^{-ix\xi}f(x)\,dx$ と正規化すると、FOU4 の Plancherel 等式より $\|\mathcal F_1f\|_2=\|f\|_2$ であり、反転公式により全射です。$d$ 個の一次元 Schwartz 関数の積 $f(x)=\prod_{j=1}^df_j(x_j)$ なら、絶対可積分性と Fubini の定理で

$$
\mathcal F_df(\xi)=\prod_{j=1}^d(\mathcal F_1f_j)(\xi_j),
\quad
\|\mathcal F_df\|_2^2
=\prod_{j=1}^d\|\mathcal F_1f_j\|_2^2
=\prod_{j=1}^d\|f_j\|_2^2
=\|f\|_2^2.
$$

有限個の積の線形結合についても、内積を展開して一次元の内積保存を各変数に適用すれば同じ等式が成立します。こうした積の線形結合は $L^2(\mathbb R^d)$ に稠密です（各座標方向の単純関数の積で長方形の指示関数を近似できるため）。従って等長写像として $L^2$ 全体へ一意に延長できます。一次元変換が全射なので、その像は積の線形結合の稠密な集合を含み、等長写像の像は閉じているため、拡張も全射です。この意味で $\mathcal F_d$ はユニタリです。

## 1. 微分式と作用素は同じではない

位置変数 $x=(x_1,\ldots,x_d)$ に対し、$\partial_j=\partial/\partial x_j$、$\nabla=(\partial_1,\ldots,\partial_d)$、$\Delta=\sum_{j=1}^d\partial_j^2$ と書きます。形式的には

$$
P_j=-i\hbar\partial_j,\qquad
-\Delta=-\sum_{j=1}^d\partial_j^2,\qquad
H_{\mathrm{form}}=-\frac{\hbar^2}{2m}\Delta.
$$

いずれも $\mathcal S$ を $\mathcal S$ に写します。$f,g\in\mathcal S$ に部分積分を適用すると境界項が消え、

$$
\langle-\Delta f,g\rangle
=\sum_j\langle\partial_jf,\partial_jg\rangle
=\langle f,-\Delta g\rangle.
$$

したがって $-\Delta|_{\mathcal S}$ は稠密定義対称作用素です。しかし、[QM5 の対称性](../QM5/index.md#def-qm5-symmetric) は $A\subset A^*$ しか保証しません。$A=A^*$ まで示すには、閉包がどこまで定義されるかを計算します。

ここで本質的自己共役性の定義は [QM5](../QM5/index.md#def-qm5-essential-self-adjoint) を、core の定義は [EVOL1](../EVOL1/index.md#def-evol1-core) をそのまま使います。本質的自己共役とは、与えた対称作用素の**閉包が自己共役**となることです。core は、閉作用素 $A$ の定義域へグラフノルム $\|\psi\|_A=\|\psi\|_2+\|A\psi\|_2$ で稠密に近づける部分空間を意味します。

## 2. 自由 Hamiltonian の定義域を Fourier 側で決める

微分式を Fourier 変換すると $-\Delta$ は $|\xi|^2$ の乗算に変わります。そこで正の実数値関数

$$
h_0(\xi)=\frac{\hbar^2|\xi|^2}{2m}
$$

を使い、次を考えます。

<a id="thm-mq1-free-core"></a>

<!-- formal-statement-start -->
### 定理（自由 Hamiltonian の自己共役実現と Schwartz core）

$d\ge1$、$m,\hbar>0$ とし、$\mathcal H=L^2(\mathbb R^d)$ とする。$A_0:\mathcal S(\mathbb R^d)\to\mathcal H$ を

$$
A_0\psi=-\frac{\hbar^2}{2m}\Delta\psi
$$

で定める。また、$h_0(\xi)=\hbar^2|\xi|^2/(2m)$ として

$$
D(H_0)=\{\psi\in\mathcal H:h_0\widehat\psi\in L^2\},\qquad
H_0\psi=\mathcal F^{-1}(h_0\widehat\psi)
$$

と定める。このとき $H_0$ は自己共役、$A_0$ は本質的自己共役で、$\overline{A_0}=H_0$ である。特に $\mathcal S(\mathbb R^d)$ は $H_0$ の core であり、

$$
D(H_0)=\left\{\psi\in L^2:\int_{\mathbb R^d}|\xi|^4|\widehat\psi(\xi)|^2\,d\xi<\infty\right\}.
$$
<!-- formal-statement-end -->

**証明の見取り図。** 実数値関数を掛ける $M_{h_0}$ の自己共役性は [QM5](../QM5/index.md#prop-qm5-unitary-conjugation) のユニタリ共役で移せます。難所は、任意の $D(H_0)$ の元を Schwartz 関数で**関数と作用結果の両方**に関して近似することです。Fourier 側で周波数を切り、滑らかに近似すれば、この二つを同時に達成できます。

<!-- proof-start -->
### 証明

(1) **最大定義域での掛け算は自己共役。** $h_0$ は実数値なので $M_{h_0}f=h_0f$、$D(M_{h_0})=\{f\in L^2:h_0f\in L^2\}$ は対称です。逆に $g\in D(M_{h_0}^*)$、$M_{h_0}^*g=k$ とすると、全ての $f\in C_c^\infty(\mathbb R^d)\subset D(M_{h_0})$ について

$$
\int f(\xi)\overline{h_0(\xi)g(\xi)-k(\xi)}\,d\xi=0.
$$

$h_0g$ は各有界集合上で $L^1$ に属します（その集合上で $h_0$ は有界で、$g\in L^2$ に Cauchy–Schwarz の不等式を適用できるため）。よって試験関数による判定から $h_0g=k$ がほとんど至る所で成り立ちます。$k\in L^2$ より $g\in D(M_{h_0})$ となり、逆包含も得て $M_{h_0}^*=M_{h_0}$ です。Fourier 変換はユニタリなので

$$
H_0=\mathcal F^{-1}M_{h_0}\mathcal F
$$

も自己共役です。さらに $h_0^2=\hbar^4|\xi|^4/(4m^2)$ から定義域表示が従います。

(2) **微分式の制限であること。** $\psi\in\mathcal S$ に対し

$$
\widehat{A_0\psi}(\xi)
=-\frac{\hbar^2}{2m}\sum_j(i\xi_j)^2\widehat\psi(\xi)
=h_0(\xi)\widehat\psi(\xi).
$$

急減少性から $h_0\widehat\psi\in L^2$ なので、$\mathcal S\subset D(H_0)$、$A_0=H_0|_{\mathcal S}$ です。$H_0$ は閉じているので $\overline{A_0}\subset H_0$ です。

(3) **逆包含をグラフ近似で示す。** 任意の $\psi\in D(H_0)$ を固定し、$f=\widehat\psi$ とします。$f$ と $h_0f$ はともに $L^2$ です。$R\to\infty$ で $f_R=\mathbf1_{\{|\xi|\le R\}}f$ と切ると

$$
\|f-f_R\|_2^2=\int_{|\xi|>R}|f|^2\to0,\qquad
\|h_0(f-f_R)\|_2^2=\int_{|\xi|>R}h_0^2|f|^2\to0.
$$

固定した $R$ に対し、$f_R$ は有界集合に台を持つ $L^2$ 関数です。$C_c^\infty$ の $L^2$ 稠密性を使い、台が半径 $R+1$ の球に含まれる $g_{R,n}\in C_c^\infty$ を $f_R$ へ $L^2$ 近似します。この球上では $h_0\le\hbar^2(R+1)^2/(2m)=M_R$ なので

$$
\|h_0(g_{R,n}-f_R)\|_2\le M_R\|g_{R,n}-f_R\|_2\to0.
$$

ここで**二つの近似を一つの収束列にする操作**を省略しません。三角不等式と直前の有界性から

$$
\begin{aligned}
\|g_{R,n}-f\|_2
&\le\|g_{R,n}-f_R\|_2+\|f_R-f\|_2,\\
\|h_0(g_{R,n}-f)\|_2
&\le M_R\|g_{R,n}-f_R\|_2+\|h_0(f_R-f)\|_2.
\end{aligned}
$$

任意の整数 $k\ge1$ に対し、まず $R_k$ を十分大きく選び、

$$
\|f-f_{R_k}\|_2+\|h_0(f-f_{R_k})\|_2<\frac1{2k}
$$

とします。次に、**固定した $R_k$ に対して** $n_k$ を選び、

$$
\|g_{R_k,n_k}-f_{R_k}\|_2
<\frac1{2k(1+M_{R_k})}
$$

とします。この順で選ぶのは、$M_R$ が $R$ とともに大きくなるためです。$g_k:=g_{R_k,n_k}$ と書けば上の二つの評価を足し、

$$
\begin{aligned}
&\|g_k-f\|_2+\|h_0(g_k-f)\|_2\\
&\quad\le(1+M_{R_k})\|g_k-f_{R_k}\|_2
+\|f_{R_k}-f\|_2+\|h_0(f_{R_k}-f)\|_2\\
&\quad<\frac1k\longrightarrow0.
\end{aligned}
$$

こうして $g_k\in C_c^\infty$ を明示的な誤差条件で選びました。$\psi_k=\mathcal F^{-1}g_k$ は Schwartz 関数であり、Plancherel 等式より

$$
\|\psi_k-\psi\|_2=\|g_k-f\|_2,\qquad
\|A_0\psi_k-H_0\psi\|_2=\|h_0g_k-h_0f\|_2.
$$

したがって $(\psi,H_0\psi)$ は $A_0$ のグラフの閉包に属します。$H_0\subset\overline{A_0}$ が得られ、(2) と合わせて $\overline{A_0}=H_0$ です。$\square$
<!-- proof-end -->

### 具体例：定義域の違いを目で確かめる

一次元で Fourier 変換が $\widehat\psi(\xi)=(1+\xi^2)^{-s}$ に比例する関数を考えます（正規化定数はここでは省略）。$|\xi|\to\infty$ では $|\widehat\psi|^2$ が $|\xi|^{-4s}$ 程度なので、$\psi\in L^2$ の条件は $4s>1$ です。一方、$\psi\in D(H_0)$ には

$$
\int |\xi|^4|\widehat\psi|^2\,d\xi<\infty
$$

が必要で、無限遠での収束条件は $4s>5$ です。例えば $s=1$ なら $\psi\in L^2$ ですが、$H_0\psi$ は $L^2$ に入らず、作用素としては適用できません。

この定義域を Fourier 側の重みで表した空間は $H^2(\mathbb R^d)$ と書かれます。ここで必要なのは $∫(1+|\xi|^4)|\widehat\psi|^2<\infty$ という具体的な収束条件です。単に記号 $-\Delta$ を書くより、Fourier 側の重み付き条件の方が定義域を判定しやすくなります。

## 3. ポテンシャルを加えるときの安全な出発点

古典 Hamiltonian $p^2/(2m)+V(x)$ に対応する微分式は $-\hbar^2\Delta/(2m)+V(x)$ です。ただし任意の実関数 $V$ を加えてよいわけではありません。まず実数値で本質的に有界な可測関数の場合を確実に扱い、そのあと作用素として相対的に小さい摂動へ拡張します。

<a id="def-mq1-bounded-schrodinger"></a>

<!-- formal-statement-start -->
### 定義（有界ポテンシャルの Schrödinger 作用素）

$d\ge1$、$m,\hbar>0$ とする。実数値 $V\in L^\infty(\mathbb R^d)$ について、$L^2(\mathbb R^d)$ 上の自由 Hamiltonian $H_0=\mathcal F^{-1}M_{\hbar^2|\xi|^2/(2m)}\mathcal F$ を用い、

$$
D(H_V)=D(H_0),\qquad
H_V\psi=H_0\psi+V\psi
$$

と定める。$V\psi$ は点ごとの乗算作用である。
<!-- formal-statement-end -->

<!-- definition-example-start: def-mq1-bounded-schrodinger -->

**定義の確認** $V(x)=V_0\mathbf1_{\{|x|\le1\}}$（$V_0\in\mathbb R$）なら $V$ は実数値可測で $\|V\|_\infty=|V_0|$、任意の $\psi\in L^2$ について $\|V\psi\|_2\le |V_0|\|\psi\|_2$ です。したがって $\psi\in D(H_0)$ なら両項が $L^2$ に属し、定義は意味を持ちます。境界 $|x|=1$ で $V$ が不連続でも、作用素の定義は妨げられません。
<!-- definition-example-end -->

<a id="thm-mq1-bounded-potential"></a>

<!-- formal-statement-start -->
### 定理（有界実ポテンシャルは自己共役性と core を保つ）

$d\ge1$、$m,\hbar>0$、$V\in L^\infty(\mathbb R^d)$ は実数値とする。$h_0(\xi)=\hbar^2|\xi|^2/(2m)$ とし、$L^2(\mathbb R^d)$ 上に

$$
H_0=\mathcal F^{-1}M_{h_0}\mathcal F,\qquad
D(H_0)=\{\psi:h_0\widehat\psi\in L^2\}
$$

を定める。$M_V\psi=V\psi$ と書き、

$$
H_V=H_0+M_V,\qquad D(H_V)=D(H_0)
$$

と定める。このとき $H_V$ は自己共役であり、$\mathcal S(\mathbb R^d)$ はその core である。特に $\mathcal S$ への制限は本質的自己共役である。
<!-- formal-statement-end -->

**証明の見取り図。** 自己共役性は有界摂動のレゾルベントを Neumann 級数で構成します。core は、自由作用素のグラフノルムと摂動後のグラフノルムが同値になることから示します。

<!-- proof-start -->
### 証明

$B=M_V$ とします。実数値の $V$ から $B=B^*$、$\|B\|=\|V\|_\infty=:b$ です。$H_0$ は自己共役なので、任意の $t>0$ について $H_0\pm it:D(H_0)\to\mathcal H$ は全単射で

$$
\|(H_0\pm it)^{-1}\|\le t^{-1}
$$

です（[QM6 の値域判定](../QM6/index.md#thm-qm6-self-adjoint-range-criterion)）。$t>b$ を取ると

$$
\|B(H_0\pm it)^{-1}\|\le b/t<1.
$$

そこで

$$
H_V\pm it
=\bigl(I+B(H_0\pm it)^{-1}\bigr)(H_0\pm it)
$$

と因数分解します。左因子の逆作用素はノルム収束する級数 $\sum_{n=0}^\infty(-B(H_0\pm it)^{-1})^n$ で与えられます。よって $H_V\pm it$ はともに全射です。$H_V$ は $D(H_0)$ 上の対称作用素なので、QM6 の値域判定により自己共役です。

さらに $\psi\in D(H_0)$ に対し

$$
\begin{aligned}
\|\psi\|_2+\|H_V\psi\|_2
&\le(1+b)\|\psi\|_2+\|H_0\psi\|_2,\\
\|\psi\|_2+\|H_0\psi\|_2
&\le(1+b)\|\psi\|_2+\|H_V\psi\|_2.
\end{aligned}
$$

この二つの評価によりグラフノルムは同値です。第2節で $\mathcal S$ は $H_0$ の core と示したため、$H_V$ のグラフノルムでも稠密です。したがって $\overline{H_V|_{\mathcal S}}=H_V$ です。$\square$
<!-- proof-end -->

### 例：定数ポテンシャルはエネルギー原点をずらすだけ

$V(x)=c\in\mathbb R$ なら $H_V=H_0+cI$ であり、Fourier 側では $h_0(\xi)+c$ の乗算になります。この場合は $\sigma(H_V)=[c,\infty)$ と直接計算できます。これに対し、有限の井戸型ポテンシャルでは、自由作用素のスペクトル表示をそのまま流用できません。自己共役性が判明しても、固有値と固有関数を求める問題は別に残ります。

## 4. 相対作用素有界性と Kato–Rellich 型の議論

有界な $V$ だけでは、調和振動子の $V(x)=m\omega^2|x|^2/2$ や Coulomb 型ポテンシャルを扱い切れません。非有界摂動を許すときは、$B$ が $H_0$ に対してどれだけ大きいかを定量化します。

<a id="def-mq1-relative-bound"></a>

<!-- formal-statement-start -->
### 定義（作用素に関する相対有界性）

複素 Hilbert 空間 $\mathcal H$ 上の稠密定義作用素 $A$、線形作用素 $B$ が $D(A)\subset D(B)$ を満たすとする。ある $a,b\ge0$ に対して

$$
\|B\psi\|\le a\|A\psi\|+b\|\psi\|
\qquad(\psi\in D(A))
$$

が成立するとき、$B$ は $A$ に関して相対有界という。こうした評価が $a<1$ で成立する場合を、この章では「相対界が1未満」と表現する。
<!-- formal-statement-end -->

<!-- definition-example-start: def-mq1-relative-bound -->

**定義の確認** $A=H_0$、$B=M_V$ として実数値の $V\in L^\infty$ を取れば、$D(H_0)\subset D(B)=L^2$ で

$$
\|B\psi\|_2\le\|V\|_\infty\|\psi\|_2
=0\cdot\|H_0\psi\|_2+\|V\|_\infty\|\psi\|_2.
$$

したがって $a=0$、$b=\|V\|_\infty$ と選べます。一方、$V(x)=|x|^2$ はこの評価を満たしません。非零の $\phi\in C_c^\infty(\mathbb R^d)$ を取り、その台が半径 $r>0$ の球に含まれるとします。$\phi_R(x)=\phi(x-Re_1)$ と平行移動した関数を考えると、変数変換 $y=x-Re_1$ から

$$
\|\phi_R\|_2^2=\int|\phi(y)|^2dy=\|\phi\|_2^2.
$$

また $H_0=-\hbar^2\Delta/(2m)$ は定数係数の微分作用素なので $H_0\phi_R(x)=(H_0\phi)(x-Re_1)$ となり、$\|H_0\phi_R\|_2=\|H_0\phi\|_2$ です。しかし $R>r$ とすれば $\phi(y)\ne0$ の点では $|y+Re_1|\ge R-r$ であるため、

$$
\begin{aligned}
\||x|^2\phi_R\|_2^2
&=\int_{\mathbb R^d}|y+Re_1|^4|\phi(y)|^2\,dy\\
&\ge(R-r)^4\|\phi\|_2^2.
\end{aligned}
$$

従って

$$
\||x|^2\phi_R\|_2\ge(R-r)^2\|\phi\|_2\to\infty.
$$

もし相対有界性が成立すれば、左辺は全ての $R$ に対し $a\|H_0\phi\|_2+b\|\phi\|_2$ 以下になるはずですが、右辺は $R$ に依存しません。矛盾するため、相対有界性は成立しません。
<!-- definition-example-end -->

<a id="thm-mq1-relative-perturbation"></a>

<!-- formal-statement-start -->
### 定理（相対界1未満の対称摂動）

$\mathcal H$ 上の自己共役作用素 $A$ と、$D(A)\subset D(B)$ を満たす対称作用素 $B$ を考える。定数 $0\le a<1$、$b\ge0$ が存在し、

$$
\|B\psi\|\le a\|A\psi\|+b\|\psi\|
\qquad(\psi\in D(A))
$$

が成り立つなら、$A+B$ は定義域 $D(A)$ 上で自己共役である。また $A$ の core は $A+B$ の core でもある。
<!-- formal-statement-end -->

この定理は Kato–Rellich の定理の、この章で必要な形です。重要なのは**作用素ノルムについての評価**であり、単に $V(x)$ が実数値であることではありません。

<!-- proof-start -->
### 証明

$t>0$ を取り、自己共役な $A$ のスペクトル表示から

$$
\|(A\pm it)^{-1}\|\le t^{-1},\qquad
\|A(A\pm it)^{-1}\|\le1
$$

を使います。第2式は実数 $\lambda$ に対して $|\lambda/(\lambda\pm it)|\le1$ であることをスペクトル積分へ適用したものです。任意の $f\in\mathcal H$ に $\psi=(A\pm it)^{-1}f\in D(A)$ を代入すると

$$
\|B(A\pm it)^{-1}f\|
\le a\|A(A\pm it)^{-1}f\|+b\|(A\pm it)^{-1}f\|
\le(a+b/t)\|f\|.
$$

$a<1$ なので $t$ を十分大きく選べば $a+b/t<1$ です。第3節と同じ因数分解

$$
A+B\pm it=
\bigl(I+B(A\pm it)^{-1}\bigr)(A\pm it)
$$

から両方の値域が全空間となり、対称性と [自己共役性の値域判定](../QM6/index.md#thm-qm6-self-adjoint-range-criterion) により $A+B$ は自己共役です。

次に core を示します。$D(A)$ で

$$
\|(A+B)\psi\|\le(1+a)\|A\psi\|+b\|\psi\|.
$$

逆向きには

$$
\|A\psi\|\le\|(A+B)\psi\|+\|B\psi\|
\le\|(A+B)\psi\|+a\|A\psi\|+b\|\psi\|.
$$

よって

$$
(1-a)\|A\psi\|\le\|(A+B)\psi\|+b\|\psi\|.
$$

二つの不等式から $A$ と $A+B$ のグラフノルムは同値です。$A$ の core 上のグラフ近似は $A+B$ にも有効です。$\square$
<!-- proof-end -->

**どこで止まるか。** 無限遠で増大する二次ポテンシャルは上の $H_0$ 相対界を満たしません。また Coulomb 型の特異性も、実数値というだけでは扱えません。これらを「定理の名前が知られているから」で通さず、それぞれに適した形式評価・別の自己共役性証明が必要です。MQ3 の調和振動子 と MQ4 の水素原子 で具体的に取り組みます。

## 5. 作用素が可換に見えることと強可換性

自由粒子では $H_0$ と運動量 $P_j$ は微分演算として交換します。しかし非有界作用素について、共通の小さな領域で $[A,B]=0$ と計算しただけでは、全スペクトル射影が可換とはいえません。測定結果を同時に扱うために必要なのは、より強い条件です。

<a id="def-mq1-strong-commutativity"></a>

<!-- formal-statement-start -->
### 定義（自己共役作用素の強可換性）

複素 Hilbert 空間 $\mathcal H$ 上の自己共役作用素 $A,B$ のスペクトル射影をそれぞれ $E_A,E_B$ とする。任意の Borel 集合 $S,T\subset\mathbb R$ に対して

$$
E_A(S)E_B(T)=E_B(T)E_A(S)
$$

が成り立つとき、$A$ と $B$ は**強可換**であるという。
<!-- formal-statement-end -->

<!-- definition-example-start: def-mq1-strong-commutativity -->

**定義の確認** $L^2(\mathbb R)$ 上で $A=M_\xi$、$B=M_{\xi^2}$ とします。両者は実数値関数を掛ける作用として最大定義域上で自己共役で、任意の Borel 集合 $S,T$ に対して

$$
E_A(S)f=\mathbf1_S(\xi)f,\qquad
E_B(T)f=\mathbf1_T(\xi^2)f.
$$

その積は $\mathbf1_S(\xi)\mathbf1_T(\xi^2)f$ であり、指示関数の積は順序に依存しません。よって強可換性を**全てのスペクトル射影について**確認できました。
<!-- definition-example-end -->

<a id="prop-mq1-free-strong-commutativity"></a>

<!-- formal-statement-start -->
### 命題（自由 Hamiltonian と運動量の強可換性）

$d\ge1$、$m,\hbar>0$ とし、$L^2(\mathbb R^d)$ 上の自己共役運動量作用素

$$
P_j=\mathcal F^{-1}M_{\hbar\xi_j}\mathcal F
$$

と、自由 Hamiltonian $H_0=\mathcal F^{-1}M_{\hbar^2|\xi|^2/(2m)}\mathcal F$ を取る。$j=1,\ldots,d$ に対し、$P_j$ と $H_0$ は強可換であり、$P_j$ と $P_k$ も全て強可換である。
<!-- formal-statement-end -->

**証明の見取り図。** 微分式の交換子を計算する代わりに、[QM6 のスペクトル関数計算](../QM6/index.md#def-qm6-borel-functional-calculus) で射影そのものを Fourier 乗算として表示します。

<!-- proof-start -->
### 証明

Borel 集合 $S,T$ に対して、Fourier 空間で

$$
\mathcal F E_{P_j}(S)\mathcal F^{-1}
=M_{\mathbf1_S(\hbar\xi_j)},\qquad
\mathcal F E_{H_0}(T)\mathcal F^{-1}
=M_{\mathbf1_T(h_0(\xi))}.
$$

二つの射影の積を Fourier 変換すると

$$
M_{\mathbf1_S(\hbar\xi_j)}M_{\mathbf1_T(h_0)}
=M_{\mathbf1_S(\hbar\xi_j)\mathbf1_T(h_0)}
=M_{\mathbf1_T(h_0)}M_{\mathbf1_S(\hbar\xi_j)}.
$$

$\mathcal F$ で元の空間へ戻すと強可換性が従います。$P_j$ と $P_k$ についても、同じ積で $\mathbf1_T(h_0)$ を $\mathbf1_T(\hbar\xi_k)$ に替えるだけで全ての $S,T$ について成立します。$\square$
<!-- proof-end -->

この場合は自由粒子の運動量成分とエネルギーを同じ Fourier 変数 $\xi$ で記述できます。一方、位置に依存する一般の $V$ を加えると、運動量と $H_V$ の強可換性は通常失われます。

## 6. スペクトルの連続部分を見分ける

固有値が見つからなくても、自己共役作用素のスペクトルが空になるわけではありません。無限次元では、逆作用素が有界に存在しない値が、固有ベクトルを持たずにスペクトルに入ることがあります。

<a id="def-mq1-essential-spectrum"></a>

<!-- formal-statement-start -->
### 定義（離散スペクトルと本質スペクトル）

複素 Hilbert 空間上の自己共役作用素 $A$ に対し、$\sigma(A)$ の中で**孤立した固有値で固有空間が有限次元**であるもの全体を離散スペクトル $\sigma_{\mathrm{disc}}(A)$ とする。その補集合

$$
\sigma_{\mathrm{ess}}(A)=\sigma(A)\setminus\sigma_{\mathrm{disc}}(A)
$$

を本質スペクトルという。
<!-- formal-statement-end -->

<!-- definition-example-start: def-mq1-essential-spectrum -->

**定義の確認** $\ell^2(\mathbb N)$ 上の $A(x_n)=(nx_n)$ を、$D(A)=\{x:(nx_n)\in\ell^2\}$ に定めます。[EVOL1 のスペクトル計算](../EVOL1/index.md#prop-evol1-diagonal-spectrum) から $\sigma(A)=\{1,2,3,\ldots\}$ です。各 $n$ はほかのスペクトル点から正の距離だけ離れ、固有空間は $\operatorname{span}\{e_n\}$ の一次元です。したがって $\sigma_{\mathrm{disc}}(A)=\{1,2,3,\ldots\}$、$\sigma_{\mathrm{ess}}(A)=\varnothing$ です。スペクトルが非有界でも、本質スペクトルは空になり得ます。
<!-- definition-example-end -->

<a id="thm-mq1-free-spectrum"></a>

<!-- formal-statement-start -->
### 定理（自由 Hamiltonian は連続的なエネルギーを持つ）

$d\ge1$、$m,\hbar>0$ とし、$L^2(\mathbb R^d)$ 上の自己共役作用素

$$
H_0=\mathcal F^{-1}M_{\hbar^2|\xi|^2/(2m)}\mathcal F
$$

を最大乗算定義域で取る。このとき

$$
\sigma(H_0)=\sigma_{\mathrm{ess}}(H_0)=[0,\infty),
\qquad
\sigma_{\mathrm p}(H_0)=\varnothing.
$$

ここで $\sigma_{\mathrm p}$ は固有値全体を表す。
<!-- formal-statement-end -->

**証明の見取り図。** $z\notin[0,\infty)$ には Fourier 側で $(h_0-z)^{-1}$ を掛ける有界逆作用素があります。$\lambda\ge0$ には $h_0$ が $\lambda$ に近い周波数だけを使う正規化関数列を作り、$(H_0-\lambda)\psi$ を小さくします。一方、$h_0=\lambda$ の水準集合は Lebesgue 零集合なので、真の $L^2$ 固有ベクトルはありません。

<!-- proof-start -->
### 証明

$z\in\mathbb C\setminus[0,\infty)$ なら $\delta=\operatorname{dist}(z,[0,\infty))>0$ であり、$r_z(\xi)=1/(h_0(\xi)-z)$ は $\|r_z\|_\infty\le1/\delta$ を満たします。また $h_0r_z=1+zr_z$ も有界です。従って

$$
R_z=\mathcal F^{-1}M_{r_z}\mathcal F
$$

は $\mathcal H$ から $D(H_0)$ へ写し、

$$
(H_0-z)R_z=I,\qquad
R_z(H_0-z)\psi=\psi\quad(\psi\in D(H_0)).
$$

よって $z$ はレゾルベント集合に属します。

次に $\lambda\ge0$ を固定します。$h_0$ は連続で値域が $[0,\infty)$ なので、$\lambda$ に対応する $\xi_0$ を一つ取れます。各 $n$ について正測度を持つ小球 $B_n$ を $\xi_0$ の周囲に取り、そこで $|h_0(\xi)-\lambda|<1/n$ かつ $h_0$ が有界になるようにします。$f_n=|B_n|^{-1/2}\mathbf1_{B_n}$ とおけば $\|f_n\|_2=1$ で $f_n\in D(M_{h_0})$ です。$\psi_n=\mathcal F^{-1}f_n$ に対し

$$
\|(H_0-\lambda)\psi_n\|_2^2
=\int_{B_n}|h_0-\lambda|^2|f_n|^2\,d\xi
\le n^{-2}.
$$

もし $H_0-\lambda$ に有界な逆作用素が存在すれば

$$
1=\|\psi_n\|_2
\le\|(H_0-\lambda)^{-1}\|\,\|(H_0-\lambda)\psi_n\|_2\to0
$$

となり矛盾します。従って $\lambda\in\sigma(H_0)$ です。

最後に $H_0\psi=\lambda\psi$ なら $(h_0(\xi)-\lambda)\widehat\psi(\xi)=0$ がほとんど至る所で成立します。$\lambda<0$ では水準集合は空、$\lambda=0$ では $\{\xi=0\}$、$\lambda>0$ では半径 $\sqrt{2m\lambda}/\hbar$ の球面です。いずれも $d$ 次元 Lebesgue 測度は零です（$d=1$ では有限点集合）。ゆえに $\widehat\psi=0$ がほとんど至る所で、固有ベクトルは存在しません。離散スペクトルは固有値から成るので空、本質スペクトルは全スペクトルとなります。$\square$
<!-- proof-end -->

$\lambda>0$ で単色の平面波 $e^{ik\cdot x}$ は微分式の「形式固有関数」ですが、$\mathbb R^d$ 全域では $L^2$ に属しません。**形式固有関数と Hilbert 空間の固有ベクトルを混同しない**ことが、連続スペクトルを理解する最初の要点です。

## 7. 二次形式が必要になる場所

自己共役 $H_V$ が定まると、$\psi\in D(H_V)$ に対しては $\langle\psi,H_V\psi\rangle$ を計算できます。しかし、エネルギーを比較するには、$H_V\psi$ そのものが $L^2$ にない状態も試したくなります。そこで $H_0$ の「一階微分だけで評価できる」式を取り出します。

$\psi\in\mathcal S(\mathbb R^d)$ なら Plancherel と Fourier 微分則から

$$
\begin{aligned}
\langle\psi,H_0\psi\rangle
&=\frac{\hbar^2}{2m}\int_{\mathbb R^d}|\xi|^2|\widehat\psi(\xi)|^2\,d\xi\\
&=\frac{\hbar^2}{2m}\sum_{j=1}^d\|\partial_j\psi\|_2^2.
\end{aligned}
$$

ここで $V\in L^\infty$ を実数値とすると

$$
q_V[\psi]
=\frac{\hbar^2}{2m}\int |\xi|^2|\widehat\psi(\xi)|^2\,d\xi
+\int V(x)|\psi(x)|^2\,dx
$$

は $D(H_V)$ より大きい空間

$$
H^1(\mathbb R^d)
=\left\{\psi\in L^2:\int(1+|\xi|^2)|\widehat\psi(\xi)|^2\,d\xi<\infty\right\}
$$

の全ての元で有限です。実際、ポテンシャル項は $|\int V|\psi|^2|\le\|V\|_\infty\|\psi\|_2^2$ です。$q_V$ は $-\|V\|_\infty\|\psi\|_2^2$ 以上なので下に有界です。さらに

$$
q_V[\psi]+(\|V\|_\infty+1)\|\psi\|_2^2
$$

は $H^1$ の Fourier 重み付きノルムの二乗と同値になります。**この評価と閉性の間の計算**を確認します。$c=\hbar^2/(2m)>0$、$K=\|V\|_\infty\ge0$ とし、

$$
\|\psi\|_{H^1}^2
:=\int_{\mathbb R^d}(1+|\xi|^2)|\widehat\psi(\xi)|^2\,d\xi
$$

と置きます。ポテンシャルの評価 $-K\|\psi\|_2^2\le\int V|\psi|^2\le K\|\psi\|_2^2$ と Plancherel より、

$$
\begin{aligned}
q_V[\psi]+(K+1)\|\psi\|_2^2
&\ge c\int|\xi|^2|\widehat\psi|^2+\|\psi\|_2^2\\
&\ge\min\{c,1\}\|\psi\|_{H^1}^2,\\
q_V[\psi]+(K+1)\|\psi\|_2^2
&\le c\int|\xi|^2|\widehat\psi|^2+(2K+1)\|\psi\|_2^2\\
&\le\max\{c,2K+1\}\|\psi\|_{H^1}^2.
\end{aligned}
$$

従って形式ノルム $\|\psi\|_q=[q_V[\psi]+(K+1)\|\psi\|_2^2]^{1/2}$ と $\|\psi\|_{H^1}$ は同値です。$H^1$ の完備性も Fourier 側で確認できます。$\|\cdot\|_{H^1}$ に関して Cauchy な $\psi_n$ に対し、$(1+|\xi|^2)^{1/2}\widehat\psi_n$ は $L^2$ で Cauchy なので、ある $g\in L^2$ へ収束します。$f=g/(1+|\xi|^2)^{1/2}\in L^2$ と置いて $\psi=\mathcal F^{-1}f$ を取れば、

$$
\|\psi_n-\psi\|_{H^1}^2
=\|(1+|\xi|^2)^{1/2}\widehat\psi_n-g\|_2^2\to0.
$$

従って $H^1$ はこのノルムで完備です。ノルム同値性から $\|\cdot\|_q$ でも完備となり、下に有界な二次形式 $q_V$ は**閉形式**です。

この段階では、「$H^1$ の全ての状態へ微分作用素 $H_V$ を適用した」と言ってはいけません。**二次形式が定義できることと、作用素値が $L^2$ に存在することは別**です。この違いを MQ2 の変分原理 で活用します。

## 8. 演習

問題の各作用素は明記された定義域で考え、Fourier 変換は冒頭の規約とします。

### Level A

### A1. Fourier 記号と符号

$d=1$、$\psi\in\mathcal S(\mathbb R)$、$m,\hbar>0$ とする。$\mathcal F(\partial_x^2\psi)$ と $\mathcal F(-\hbar^2\partial_x^2\psi/(2m))$ を求め、後者の Fourier 記号が非負である理由を示せ。

- Level: A

<!-- solution-start -->
#### 詳細解答

Schwartz 関数の Fourier 微分則から $\widehat{\partial_x\psi}=i\xi\widehat\psi$ です。再び微分則を適用すると

$$
\widehat{\partial_x^2\psi}
=i\xi\,\widehat{\partial_x\psi}
=(i\xi)^2\widehat\psi
=-\xi^2\widehat\psi.
$$

したがって

$$
\mathcal F\left(-\frac{\hbar^2}{2m}\partial_x^2\psi\right)
=\frac{\hbar^2\xi^2}{2m}\widehat\psi.
$$

$m,\hbar>0$ かつ $\xi^2\ge0$ なので係数は非負です。二階微分の Fourier 記号には負号が付く点が重要です。
<!-- solution-end -->

### A2. 定義域の判定

$d=1$ の自由 Hamiltonian $H_0$ に対し、$\widehat\psi_s(\xi)=c_s(1+\xi^2)^{-s}$、$s>0$、$c_s\ne0$ とする。$\psi_s\in L^2$、$\psi_s\in D(H_0)$ の各条件を求めよ。正規化は問わない。

- Level: A

<!-- solution-start -->
#### 詳細解答

原点近くでは $(1+\xi^2)^{-2s}$ は有界です。無限遠で $|\widehat\psi_s|^2$ は $|\xi|^{-4s}$ と同程度なので

$$
\psi_s\in L^2\iff\int_1^\infty r^{-4s}\,dr<\infty
\iff4s>1.
$$

作用素定義域には $\xi^2\widehat\psi_s\in L^2$ が必要です。すなわち

$$
\int_{\mathbb R}\xi^4|\widehat\psi_s|^2\,d\xi<\infty.
$$

無限遠で積分核は $r^{4-4s}$ と同程度です。$4-4s<-1$ で収束するから

$$
\psi_s\in D(H_0)\iff s>5/4.
$$

等号 $s=1/4,5/4$ では $r^{-1}$ 型の対数発散が起こります。
<!-- solution-end -->

### A3. 有界ポテンシャルの相対界

$L^2(\mathbb R)$ 上の $H_0$ と、実数値 $V(x)=3\cos x$ を掛ける作用素 $B=M_V$ を取る。相対有界性の定義に使える $a,b$ を一組求め、$H_0+B$ の自己共役定義域を答えよ。

- Level: A

<!-- solution-start -->
#### 詳細解答

$|\cos x|\le1$ より $\|B\psi\|_2^2=\int9\cos^2x|\psi|^2\,dx\le9\|\psi\|_2^2$、従って

$$
\|B\psi\|_2\le0\cdot\|H_0\psi\|_2+3\|\psi\|_2.
$$

$a=0<1$、$b=3$ と選べます。$B$ は実数値の $V$ を掛けるため対称で、$H_0+B$ は相対界1未満の定理により自己共役です。その定義域は

$$
D(H_0+B)=D(H_0)=\{\psi:\xi^2\widehat\psi\in L^2\}.
$$

です。
<!-- solution-end -->

### A4. 離散スペクトルの定義確認

$\ell^2(\mathbb N)$ 上の $A(x_n)=(nx_n)$、$D(A)=\{x:(nx_n)\in\ell^2\}$ とする。固有値 $2$ が離散スペクトルに属することを、孤立性と固有空間次元から確認せよ。

- Level: A

<!-- solution-start -->
#### 詳細解答

$Ae_2=2e_2$ なので $2$ は固有値です。$Ax=2x$ なら成分ごとに $(n-2)x_n=0$ となり、$n\ne2$ の成分は全て零です。よって

$$
\ker(A-2I)=\operatorname{span}\{e_2\},\qquad
\dim\ker(A-2I)=1.
$$

スペクトルは $\{1,2,\ldots\}$ なので、例えば区間 $(3/2,5/2)$ には $2$ 以外のスペクトル点がありません。従って孤立した有限重複度の固有値として $2\in\sigma_{\mathrm{disc}}(A)$ です。
<!-- solution-end -->

### Level B

### B1. Schwartz core をグラフで確認する

$d=1$ とし、$H_0=\mathcal F^{-1}M_{c\xi^2}\mathcal F$、$c>0$ を最大乗算定義域で取る。$\widehat\psi(\xi)=(1+\xi^2)^{-2}$ の $\psi$ について、$f_R=\mathbf1_{[-R,R]}\widehat\psi$ が $H_0$ の Fourier 側グラフノルムで $\widehat\psi$ に収束することを式で示せ。$f_R$ 自身が $C_c^\infty$ ではないことにも注意せよ。

- Level: B

<!-- solution-start -->
#### 詳細解答

$\widehat\psi$ は二乗すると $(1+\xi^2)^{-4}$ となり、無限遠では $|\xi|^{-8}$ と同程度です。また $(c\xi^2)^2|\widehat\psi|^2$ は $c^2|\xi|^{-4}$ と同程度なので両方とも可積分です。

差は $f_R-\widehat\psi=-\mathbf1_{\{|\xi|>R\}}\widehat\psi$ であり、

$$
\|f_R-\widehat\psi\|_2^2
=\int_{|\xi|>R}(1+\xi^2)^{-4}\,d\xi\to0,
$$

$$
\|c\xi^2(f_R-\widehat\psi)\|_2^2
=c^2\int_{|\xi|>R}\xi^4(1+\xi^2)^{-4}\,d\xi\to0.
$$

二つの極限は可積分関数の尾部積分が零へ行くことによります。$f_R$ には $\pm R$ で跳びがあるため滑らかとは限りません。そこで $[-R,R]$ に台を持つ $L^2$ 関数を、台が $[-R-1,R+1]$ に入る滑らかな関数 $g_{R,n}$ で近似します。例えば滑らかな近似恒等族による畳み込みの幅を $1/n<1$ と選べば、この台の条件を保ちつつ $L^2$ 収束させられます。

固定区間上で $|\xi|^2\le(R+1)^2$ なので、

$$
\begin{aligned}
\|g_{R,n}-\widehat\psi\|_2
&\le\|g_{R,n}-f_R\|_2+\|f_R-\widehat\psi\|_2,\\
\|c\xi^2(g_{R,n}-\widehat\psi)\|_2
&\le c(R+1)^2\|g_{R,n}-f_R\|_2
+\|c\xi^2(f_R-\widehat\psi)\|_2.
\end{aligned}
$$

具体的に $\varepsilon>0$ を固定し、二つの尾部誤差の和が $\varepsilon/2$ 未満になる $R$ を最初に選びます。その後、同じ $R$ に対して

$$
\|g_{R,n}-f_R\|_2
<\frac{\varepsilon}{2\{1+c(R+1)^2\}}
$$

となる $n$ を選べば、二つのグラフ誤差の和が $\varepsilon$ 未満になります。$\varepsilon=1/k$ と選び直すと Schwartz 関数 $\mathcal F^{-1}g_{R,n}$ のグラフ近似列を作れます。
<!-- solution-end -->

### B2. 摂動後にも core が残る理由

自己共役 $A$、対称 $B$、$D(A)\subset D(B)$ に対し $\|B\psi\|\le\frac12\|A\psi\|+4\|\psi\|$ が全ての $\psi\in D(A)$ で成り立つとする。$D_0$ が $A$ の core なら $A+B$ の core であることをグラフノルム評価から示せ。

- Level: B

<!-- solution-start -->
#### 詳細解答

三角不等式で

$$
\|(A+B)\psi\|\le\|A\psi\|+\|B\psi\|
\le\frac32\|A\psi\|+4\|\psi\|.
$$

逆に

$$
\|A\psi\|\le\|(A+B)\psi\|+\|B\psi\|
\le\|(A+B)\psi\|+\frac12\|A\psi\|+4\|\psi\|.
$$

左辺の $\frac12\|A\psi\|$ を移して

$$
\|A\psi\|\le2\|(A+B)\psi\|+8\|\psi\|.
$$

したがって二つのグラフノルムは同値です。$D_0$ が $A$ の core なので、任意の $\psi\in D(A)$ に $\psi_n\in D_0$ で $\|\psi_n-\psi\|+\|A(\psi_n-\psi)\|\to0$ となるものを取れます。上の第一評価を $\psi_n-\psi$ へ適用すれば

$$
\|\psi_n-\psi\|+\|(A+B)(\psi_n-\psi)\|\to0.
$$

相対界 $\frac12<1$ によって $A+B$ は自己共役かつ閉であるため、この近似は $D_0$ が core であることを意味します。
<!-- solution-end -->

### B3. 強可換性を射影から調べる

$L^2(\mathbb R^2)$ 上で、Fourier 空間で関数を掛ける作用素 $A=M_{\xi_1}$、$B=M_{\xi_1^2+\xi_2^2}$ を最大定義域で考える。任意の Borel 集合 $S,T$ に対してスペクトル射影の積を書き、強可換性を証明せよ。

- Level: B

<!-- solution-start -->
#### 詳細解答

実数値関数を掛ける自己共役作用素なので、それぞれのスペクトル射影は

$$
E_A(S)=M_{\mathbf1_S(\xi_1)},\qquad
E_B(T)=M_{\mathbf1_T(\xi_1^2+\xi_2^2)}
$$

です。任意の $f\in L^2(\mathbb R^2)$ に対し

$$
(E_A(S)E_B(T)f)(\xi)
=\mathbf1_S(\xi_1)\mathbf1_T(\xi_1^2+\xi_2^2)f(\xi).
$$

逆順では二つの指示関数の積の順序が変わるだけです。両方とも有界な関数を掛ける作用素で全 $L^2$ 上に定義されているため、積を取る際に作用素定義域の追加条件はありません。ゆえに全ての $S,T$ で積が一致し、$A,B$ は強可換です。
<!-- solution-end -->

### B4. 形式的固有関数が固有状態ではない理由

$d=1$ の自由 Hamiltonian $H_0=-\hbar^2d^2/dx^2/(2m)$ に対し、$k\in\mathbb R$ と $\phi_k(x)=e^{ikx}$ を取る。微分方程式の意味でのエネルギーを求め、なぜ $\phi_k$ は $L^2(\mathbb R)$ 上の固有ベクトルにはならないか説明せよ。さらに Fourier 側でエネルギー $\hbar^2k^2/(2m)$ 近くへ集中する正規化関数列を構成せよ。

- Level: B

<!-- solution-start -->
#### 詳細解答

$\phi_k'(x)=ik\phi_k(x)$、$\phi_k''(x)=-k^2\phi_k(x)$ なので微分式を適用すると

$$
-\frac{\hbar^2}{2m}\phi_k''(x)
=\frac{\hbar^2k^2}{2m}\phi_k(x).
$$

一方、$|\phi_k(x)|^2=1$ で $\int_{\mathbb R}1\,dx=\infty$ だから $\phi_k\notin L^2(\mathbb R)$ です。固有ベクトルは Hilbert 空間の非零元でなければならず、形式式の解であるだけでは不足します。

$h_0(\xi)=\hbar^2\xi^2/(2m)$、$\lambda=h_0(k)$ とし、$I_n=(k-1/n,k+1/n)$、$f_n=(n/2)^{1/2}\mathbf1_{I_n}$ と取ると $\|f_n\|_2=1$ です。$f_n$ は有界区間に台を持つため最大定義域の掛け算の作用素に属します。$\psi_n=\mathcal F^{-1}f_n$ とすると

$$
\|(H_0-\lambda)\psi_n\|_2^2
=\frac n2\int_{I_n}|h_0(\xi)-h_0(k)|^2\,d\xi.
$$

$h_0$ の連続性によって $\sup_{\xi\in I_n}|h_0(\xi)-h_0(k)|\to0$ なので、このノルムは零へ収束します。しかし各 $\psi_n$ は真の固有ベクトルではありません。
<!-- solution-end -->

### Level C

### C1. 有界井戸の Hamiltonian を厳密に立てる

$d=1$、$m,\hbar,L>0$、$V_0>0$ とする。$\mathcal H=L^2(\mathbb R)$ 上で $V(x)=-V_0\mathbf1_{[-L,L]}(x)$ を考える。

1. Fourier 側から自由作用素 $H_0$ の定義域を示し、$\mathcal S(\mathbb R)$ が core である理由を、滑らかな周波数近似の順序まで含めて述べよ。
2. $H=H_0+M_V$ が自己共役であり、$\mathcal S$ 上の微分式が本質的自己共役であることを証明せよ。
3. $H$ が下に有界であることを、$\langle\psi,H\psi\rangle$ を用いて $\psi\in D(H)$ について示せ。
4. $\psi\in H^1(\mathbb R)$ に対して二次形式 $q_V[\psi]$ を書き、$\psi\in H^1$ だからといって常に $H\psi\in L^2$ と言えない理由を説明せよ。
5. この議論だけで負の固有値の存在やその個数が決定できるか、自己共役性とスペクトル解析の責務を分けて答えよ。

- Level: C

<!-- solution-start -->
#### 詳細解答

(1) $h_0(\xi)=\hbar^2\xi^2/(2m)$ として

$$
D(H_0)=\{\psi\in L^2:\xi^2\widehat\psi\in L^2\},\qquad
H_0\psi=\mathcal F^{-1}(h_0\widehat\psi).
$$

$M_{h_0}$ は最大定義域 $D(M_{h_0})=\{f\in L^2:h_0f\in L^2\}$ 上で実数値関数 $h_0$ を掛ける作用素なので自己共役であり、ユニタリ Fourier 共役も自己共役です。

$\psi\in D(H_0)$ に対し $f=\widehat\psi$ と置き、まず $f_R=\mathbf1_{\{|\xi|\le R\}}f$ で切ります。$f,h_0f\in L^2$ より

$$
\|f_R-f\|_2^2=\int_{|\xi|>R}|f|^2\to0,\qquad
\|h_0(f_R-f)\|_2^2=\int_{|\xi|>R}|h_0f|^2\to0.
$$

次に $f_R$ を台が $[-R-1,R+1]$ に含まれる $g_{R,n}\in C_c^\infty$ で $L^2$ 近似します。$c=\hbar^2/(2m)$ と書けば、この区間で $|h_0(\xi)|=c\xi^2\le c(R+1)^2$ です。よって

$$
\begin{aligned}
\|g_{R,n}-f\|_2+\|h_0(g_{R,n}-f)\|_2
&\le\bigl(1+c(R+1)^2\bigr)\|g_{R,n}-f_R\|_2\\
&\quad+\|f_R-f\|_2+\|h_0(f_R-f)\|_2.
\end{aligned}
$$

各 $k\ge1$ に対して先に $R_k$ を選び、右辺の後ろ二つの和を $1/(2k)$ 未満にします。次に $n_k$ を選んで $\|g_{R_k,n_k}-f_{R_k}\|_2<1/\{2k[1+c(R_k+1)^2]\}$ とします。すると右辺は $1/k$ 未満です。$\psi_k=\mathcal F^{-1}g_{R_k,n_k}\in\mathcal S$ について Plancherel により

$$
\|\psi_k-\psi\|_2+\|H_0\psi_k-H_0\psi\|_2
=\|g_{R_k,n_k}-f\|_2+\|h_0(g_{R_k,n_k}-f)\|_2\to0.
$$

従って $\mathcal S$ は $H_0$ の core です。

(2) $V$ は実数値で $\|V\|_\infty=V_0$ です。任意の $\psi\in D(H_0)$ に

$$
\|M_V\psi\|_2\le V_0\|\psi\|_2
=0\|H_0\psi\|_2+V_0\|\psi\|_2
$$

が成立します。相対界 $a=0<1$ の対称摂動定理を $A=H_0$、$B=M_V$ へ適用して、$D(H)=D(H_0)$ で自己共役性が成立します。さらに両方のグラフノルムの同値性から $\mathcal S$ は $H$ の core です。従って $\overline{H|_{\mathcal S}}=H$、すなわち微分式の最小実現は本質的自己共役です。

(3) $\psi\in D(H)$ なら Fourier 表現と $V(x)\ge -V_0$ から

$$
\begin{aligned}
\langle\psi,H\psi\rangle
&=\frac{\hbar^2}{2m}\int\xi^2|\widehat\psi(\xi)|^2\,d\xi
+\int V(x)|\psi(x)|^2\,dx\\
&\ge0-V_0\|\psi\|_2^2.
\end{aligned}
$$

従って $H$ は下に有界で $\inf\sigma(H)\ge -V_0$ です。最後のスペクトル下界は自己共役作用素のスペクトル積分で $\langle\psi,H\psi\rangle\ge -V_0\|\psi\|^2$ を読むことで得ます。

(4) 形式は

$$
q_V[\psi]=\frac{\hbar^2}{2m}\int\xi^2|\widehat\psi(\xi)|^2\,d\xi
-V_0\int_{-L}^{L}|\psi(x)|^2\,dx
$$

で、$H^1$ の定義から第1項が有限、第二項は $V_0\|\psi\|_2^2$ 以下です。しかし $D(H)=H^2$ には Fourier 側で $\int\xi^4|\widehat\psi|^2<\infty$ が必要であり、$H^1$ の $\int\xi^2|\widehat\psi|^2<\infty$ だけでは保証されません。例えば $\widehat\psi=(1+\xi^2)^{-1}$ は $H^1$ に属しますが、$H^2$ には属しません。

(5) 自己共役性と下界は、定義域が適切でエネルギー測定・ユニタリ時間発展が定まることを保証します。しかし負の固有値の存在、個数、対応する波動関数は、この証明では求めていません。固有値の存在には変分法など追加のスペクトル解析が必要です。
<!-- solution-end -->

## 9. まとめと次章

- 微分式の対称性だけでは自己共役性を保証しません。自由粒子では Fourier 空間での掛け算を最大定義域で構成し、Schwartz 空間のグラフノルム稠密性を示して初めて本質的自己共役性を証明しました。
- 実有界ポテンシャルや相対界1未満の対称摂動では自己共役性と core が保たれます。ただし二次の閉じ込めポテンシャルや Coulomb 型の特異性には別の議論が必要です。
- 自由粒子のスペクトルは $[0,\infty)$ の全てが本質スペクトルで、$L^2$ 固有ベクトルはありません。ポテンシャルによる離散固有値はさらに調べる課題です。
- 二次形式は作用素定義域より広い $H^1$ で定まります。[MQ2](../MQ2/index.md) では、この性質からスペクトル下端と基底状態を変分的に調べます。
