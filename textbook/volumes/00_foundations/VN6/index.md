# VN6 可換 von Neumann 環と $L^\infty$

<!-- definition-example-audit: strict -->

> **既出概念**：[F0-00D2D の $L^\infty$ 空間](../F0_00D2D_Lp_Holder_Minkowski/index.md#def-f0-00d2d-04)と[本質的上限](../F0_00D2D_Lp_Holder_Minkowski/index.md#def-f0-00d2d-03)、[F0-00D2E の $L^2$ Hilbert 空間](../F0_00D2E_L2完備性_Riesz_Fischer/index.md)、[OA4 の可換 Gelfand--Naimark 定理](../OA4/index.md#thm-oa4-commutative-gelfand-naimark)、[VN2 の von Neumann 環](../VN2/index.md#def-vn2-von-neumann-algebra)と[二重可換子定理](../VN2/index.md#thm-vn2-bicommutant)、[VN5 の正規状態](../VN5/index.md#def-vn5-normal-state)を使います。

OA4 では、可換単位的 $C^*$-環がコンパクト Hausdorff 空間 $K$ 上の連続関数環

$$
C(K)
$$

として理解できることを学びました。ここでは「可換な作用素環なら、結局は連続関数を見るのか」という疑問が残ります。

von Neumann 環では答えが変わります。代表例は連続関数ではなく、本質的有界な可測関数

$$
L^\infty(X,\mu)
$$

です。

違いを生むのは、何で閉じるかです。

$$
\begin{array}{c}
C^*\text{-環}\\
\text{作用素ノルムで閉じる}
\end{array}
\qquad\Longrightarrow\qquad
\begin{array}{c}
\text{連続関数が自然}\\
C(K)
\end{array}
$$

に対して、

$$
\begin{array}{c}
\text{von Neumann 環}\\
\text{WOT/SOT で閉じる}
\end{array}
\qquad\Longrightarrow\qquad
\begin{array}{c}
\text{可測関数が自然}\\
L^\infty(X,\mu)
\end{array}
$$

という違いが現れます。

本章ではこの差を、抽象表現定理だけで済ませず、$L^2(X,\mu)$ 上の**乗算作用素**

$$
(M_f\xi)(x)=f(x)\xi(x)
$$

として直接見ます。

主要定理は、証明を自力で閉じられるよう

$$
0<\mu(X)<\infty
$$

を仮定して示します。この仮定なら定数関数 $1$ が $L^2$ に入り、可換子を具体的に計算できます。一般の $\sigma$-有限測度空間への拡張は有限測度集合への分割で行えますが、本章では一般表現定理の完全版までは扱いません。

本章の流れは

$$
L^\infty
\longrightarrow
\text{乗算作用素}
\longrightarrow
\text{可換子の計算}
\longrightarrow
\text{von Neumann 環}
\longrightarrow
\text{可測集合 modulo 零集合}
\longrightarrow
\text{射影}
\longrightarrow
C(K)\text{ との閉包の差}
$$

です。

---

## 1. 可測関数を作用素へ変える

$L^\infty$ の元は a.e. 同値類です。したがって一点だけ値を変えても同じ元です。

一方、作用素 $M_f$ も $L^2$ の a.e. 同値類へ作用します。ここで両者の「零集合を無視する」という構造がぴったり一致します。

<a id="def-vn6-multiplication-operator"></a>

<!-- formal-statement-start -->
### 定義（乗算作用素）

$(X,\Sigma,\mu)$ を有限測度空間とし、

$$
H=L^2(X,\mu)
$$

とする。

$f\in L^\infty(X,\mu)$ に対して

$$
M_f:H\to H
$$

を

$$
(M_f\xi)(x)=f(x)\xi(x)
\qquad
\text{a.e. }x\in X
$$

で定める。

この $M_f$ を $f$ による **乗算作用素** という。
<!-- formal-statement-end -->

<!-- definition-example-start: def-vn6-multiplication-operator -->

### **定義の確認**：$f(x)=2x$ は $L^2([0,1])$ 上で掛け算をする

$X=[0,1]$、$\mu$ を Lebesgue 測度とし、

$$
f(x)=2x
$$

とします。

$f$ は本質的有界で

$$
\|f\|_\infty=2.
$$

$\xi(x)=1-x$ に作用させると

$$
(M_f\xi)(x)
=
2x(1-x).
$$

さらに

$$
|2x(1-x)|^2
\le
4|1-x|^2
$$

なので

$$
M_f\xi\in L^2([0,1]).
$$

乗算作用素とは、関数を抽象的な作用素へ変換する新しい演算ではなく、**点ごとの掛け算を Hilbert 空間上の線形作用素として読むもの**です。

<!-- definition-example-end -->

まず、この作用素が本当に有界であることと、そのノルムが元の $L^\infty$ ノルムを完全に記憶することを示します。

<a id="prop-vn6-multiplication-norm-adjoint"></a>

<!-- formal-statement-start -->
### 命題（乗算作用素のノルム・積・随伴）

$(X,\Sigma,\mu)$ を有限測度空間とし、$f,g\in L^\infty(X,\mu)$ とする。

このとき

$$
M_f\in B(L^2(X,\mu))
$$

であり、

$$
\boxed{
\|M_f\|=\|f\|_\infty
}
$$

が成り立つ。

さらに

$$
\boxed{
M_fM_g=M_{fg},
\qquad
M_f^*=M_{\overline f},
\qquad
M_1=I.
}
$$
<!-- formal-statement-end -->

### 証明の見取り図

上からの評価は

$$
|f\xi|\le\|f\|_\infty|\xi|
$$

を積分すれば得られます。

逆向きでは、本質的上限の定義を使います。$\|f\|_\infty$ より少し小さい値を超える集合には正の測度があり、その指示関数を入力すれば作用素ノルムが下から読めます。

随伴は $L^2$ 内積へ代入して確認します。

<!-- proof-start -->
### 証明

まず任意の $\xi\in L^2(X,\mu)$ に対して

$$
|f(x)\xi(x)|^2
\le
\|f\|_\infty^2|\xi(x)|^2
$$

が a.e. に成り立つので、

$$
\begin{aligned}
\|M_f\xi\|_2^2
&=
\int_X|f\xi|^2\,d\mu\\
&\le
\|f\|_\infty^2
\int_X|\xi|^2\,d\mu\\
&=
\|f\|_\infty^2\|\xi\|_2^2.
\end{aligned}
$$

したがって

$$
\|M_f\|
\le
\|f\|_\infty.
$$

逆向きを示します。

$f=0$ a.e. なら両辺は0なので、以下

$$
a:=\|f\|_\infty>0
$$

とします。

任意の $\varepsilon>0$ に対して

$$
E_\varepsilon
=
\{x:|f(x)|>a-\varepsilon\}
$$

と置きます。

本質的上限の定義から

$$
\mu(E_\varepsilon)>0.
$$

また $\mu(X)<\infty$ なので

$$
1_{E_\varepsilon}\in L^2(X,\mu).
$$

よって

$$
\begin{aligned}
\|M_f1_{E_\varepsilon}\|_2^2
&=
\int_{E_\varepsilon}|f|^2\,d\mu\\
&\ge
(a-\varepsilon)^2\mu(E_\varepsilon)\\
&=
(a-\varepsilon)^2
\|1_{E_\varepsilon}\|_2^2.
\end{aligned}
$$

したがって

$$
\|M_f\|
\ge
a-\varepsilon.
$$

$\varepsilon\downarrow0$ として

$$
\|M_f\|
\ge
a
=
\|f\|_\infty.
$$

上からの評価と合わせて

$$
\boxed{
\|M_f\|=\|f\|_\infty
}.
$$

次に任意の $\xi\in L^2$ に対して

$$
M_fM_g\xi
=
f(g\xi)
=
(fg)\xi
=
M_{fg}\xi
$$

なので

$$
M_fM_g=M_{fg}.
$$

随伴について、$\xi,\eta\in L^2$ に対し

$$
\begin{aligned}
\langle M_f\xi,\eta\rangle
&=
\int_X f\xi\overline{\eta}\,d\mu\\
&=
\int_X \xi\,
\overline{\overline f\,\eta}\,d\mu\\
&=
\langle \xi,M_{\overline f}\eta\rangle.
\end{aligned}
$$

したがって

$$
M_f^*=M_{\overline f}.
$$

最後に

$$
M_1\xi=\xi
$$

なので

$$
M_1=I.
$$
<!-- proof-end -->

この命題により

$$
f\longmapsto M_f
$$

はノルムも積も随伴も保ちます。

特に、$L^\infty$ の a.e. 同値類が異なれば対応する作用素も異なります。なぜなら

$$
M_f=M_g
$$

なら

$$
0
=
\|M_f-M_g\|
=
\|f-g\|_\infty
$$

だからです。

---

## 2. $L^\infty$ を作用素環としてまとめる

一つの $M_f$ ではなく、全ての本質的有界可測関数を一度に作用素へ移します。

<a id="def-vn6-linfty-multiplication-algebra"></a>

<!-- formal-statement-start -->
### 定義（$L^\infty$ 乗算環）

$(X,\Sigma,\mu)$ を有限測度空間とし、

$$
H=L^2(X,\mu)
$$

とする。

$$
\mathcal M_\mu
:=
\{M_f:f\in L^\infty(X,\mu)\}
\subset B(H)
$$

を **$L^\infty$ 乗算環** と呼ぶ。
<!-- formal-statement-end -->

<!-- definition-example-start: def-vn6-linfty-multiplication-algebra -->

### **定義の確認**：有限集合では対角行列になる

$$
X=\{1,2,3\}
$$

に数え上げ測度を入れます。

このとき

$$
L^2(X)\cong\mathbb C^3,
\qquad
L^\infty(X)\cong\mathbb C^3.
$$

$f=(a,b,c)$ に対応する乗算作用素は

$$
M_f
=
\begin{pmatrix}
a&0&0\\
0&b&0\\
0&0&c
\end{pmatrix}.
$$

したがって $\mathcal M_\mu$ は

$$
\boxed{
\text{全ての対角 }3\times3\text{ 行列}
}
$$

です。

有限集合では「可換 von Neumann 環は対角行列」という線形代数の像がそのまま見えています。

一般の測度空間では、座標番号 $1,2,3$ の代わりに点 $x\in X$ があり、対角成分 $(a,b,c)$ の代わりに可測関数 $f(x)$ がある、と考えられます。

<!-- definition-example-end -->

前節から $\mathcal M_\mu$ は単位元を含む可換 $*$-部分代数です。

しかし von Neumann 環であるためには WOT 閉性が必要です。ここで VN2 の二重可換子定理が効きます。

---

## 3. 可換子を直接計算すると、もう一度 $L^\infty$ が出てくる

有限次元の対角行列では、「全ての対角行列と可換する行列」はまた対角行列です。

同じことが $L^2(X,\mu)$ 上でも起きます。

<a id="thm-vn6-linfty-commutant"></a>

<!-- formal-statement-start -->
### 定理（$L^\infty$ 乗算環は自分自身の可換子である）

$(X,\Sigma,\mu)$ を

$$
0<\mu(X)<\infty
$$

を満たす有限測度空間とし、

$$
\mathcal M_\mu
=
\{M_f:f\in L^\infty(X,\mu)\}
\subset B(L^2(X,\mu))
$$

とする。

このとき

$$
\boxed{
\mathcal M_\mu'
=
\mathcal M_\mu
}
$$

が成り立つ。

従って

$$
\mathcal M_\mu''=\mathcal M_\mu
$$

であり、$\mathcal M_\mu$ は可換 von Neumann 環である。
<!-- formal-statement-end -->

### 証明の見取り図

可換性から

$$
\mathcal M_\mu\subset\mathcal M_\mu'
$$

はすぐです。

難しいのは逆向きです。

$\mu(X)<\infty$ なので定数関数 $1$ が $L^2$ に入ります。$T\in\mathcal M_\mu'$ に対して

$$
g:=T1
$$

と置きます。

$T$ は全ての指示関数による乗算作用素 $M_{1_E}$ と可換するので、

$$
T1_E=1_Eg
$$

となります。

つまり $T$ が単関数へどう作用するかは、たった一つの関数 $g=T1$ で決まります。

最後に $T$ の有界性から $g\in L^\infty$ を示し、単関数の稠密性で

$$
T=M_g
$$

まで延長します。

<!-- proof-start -->
### 証明

まず $f,g\in L^\infty$ に対して

$$
M_fM_g=M_{fg}=M_{gf}=M_gM_f
$$

なので $\mathcal M_\mu$ は可換です。

従って

$$
\mathcal M_\mu
\subset
\mathcal M_\mu'.
$$

逆に

$$
T\in\mathcal M_\mu'
$$

とします。

$\mu(X)<\infty$ なので定数関数 $1$ は $L^2(X,\mu)$ に入ります。

$$
g:=T1
$$

と置きます。最初は $g\in L^2$ しか分かりません。

任意の可測集合 $E\in\Sigma$ に対して

$$
1_E\in L^\infty(X,\mu)
$$

なので

$$
M_{1_E}\in\mathcal M_\mu.
$$

$T$ は $\mathcal M_\mu$ と可換するため

$$
\begin{aligned}
T1_E
&=
T(M_{1_E}1)\\
&=
M_{1_E}(T1)\\
&=
1_Eg.
\end{aligned}
$$

次に単関数

$$
s
=
\sum_{j=1}^{m}c_j1_{E_j}
$$

を取ると、線形性から

$$
Ts
=
\sum_{j=1}^{m}c_jT1_{E_j}
=
\sum_{j=1}^{m}c_j1_{E_j}g
=
gs.
$$

ここで $g$ が本質的有界であることを示します。

もし

$$
\|g\|_\infty>\|T\|
$$

なら、ある $c>\|T\|$ について

$$
E_c
=
\{x:|g(x)|>c\}
$$

が正の測度を持ちます。

$\mu(X)<\infty$ なので $1_{E_c}\in L^2$ です。上で示した式を使うと

$$
T1_{E_c}=g1_{E_c}.
$$

従って

$$
\begin{aligned}
\|T\|\,\|1_{E_c}\|_2
&\ge
\|T1_{E_c}\|_2\\
&=
\|g1_{E_c}\|_2\\
&>
c\|1_{E_c}\|_2.
\end{aligned}
$$

$\mu(E_c)>0$ なので

$$
\|1_{E_c}\|_2>0.
$$

よって

$$
\|T\|>c,
$$

となり $c>\|T\|$ に矛盾します。

従って

$$
g\in L^\infty(X,\mu),
\qquad
\|g\|_\infty\le\|T\|.
$$

したがって $M_g\in\mathcal M_\mu$ です。

単関数は $L^2(X,\mu)$ に稠密で、単関数 $s$ では

$$
Ts=M_gs
$$

を示しました。

$T$ と $M_g$ はともに有界なので、稠密部分空間上の一致から

$$
T=M_g.
$$

従って

$$
T\in\mathcal M_\mu.
$$

よって

$$
\mathcal M_\mu'
\subset
\mathcal M_\mu.
$$

両包含を合わせて

$$
\boxed{
\mathcal M_\mu'=\mathcal M_\mu
}.
$$

さらに

$$
\mathcal M_\mu''
=
(\mathcal M_\mu')'
=
\mathcal M_\mu'
=
\mathcal M_\mu.
$$

[VN2 の二重可換子定理](../VN2/index.md#thm-vn2-bicommutant)から、$\mathcal M_\mu$ は WOT 閉な単位的 $*$-部分代数、すなわち von Neumann 環です。
<!-- proof-end -->

この証明は、可換 von Neumann 環の重要な原型を与えます。

$$
\boxed{
\text{対角行列}
\quad\rightsquigarrow\quad
\text{可測関数による乗算作用素}
}
$$

です。

---

## 4. 零集合を無視した可測集合が、そのまま射影になる

$L^\infty$ では関数を a.e. で同一視しました。

特に指示関数について

$$
1_E=1_F
\quad\text{a.e.}
$$

であることは

$$
\mu(E\triangle F)=0
$$

と同値です。

したがって射影を分類するときにも、集合そのものではなく「零集合だけ違う集合」を同じものと見る必要があります。

<a id="def-vn6-measure-algebra"></a>

<!-- formal-statement-start -->
### 定義（測度代数）

測度空間 $(X,\Sigma,\mu)$ に対し、可測集合 $E,F\in\Sigma$ の間に

$$
E\sim F
\quad\Longleftrightarrow\quad
\mu(E\triangle F)=0
$$

と定める。

この同値関係による商

$$
\Sigma/{\sim}
$$

を、この章では **測度代数** と呼ぶ。
<!-- formal-statement-end -->

<!-- definition-example-start: def-vn6-measure-algebra -->

### **定義の確認**：一点の違いは消える

$X=[0,1]$ に Lebesgue 測度を入れ、

$$
E=[0,1/2],
\qquad
F=[0,1/2]\cup\{3/4\}
$$

とします。

対称差は

$$
E\triangle F=\{3/4\}
$$

なので

$$
\mu(E\triangle F)=0.
$$

従って測度代数では

$$
[E]=[F].
$$

実際、

$$
1_E=1_F
\quad\text{a.e.}
$$

なので

$$
M_{1_E}=M_{1_F}.
$$

集合側で零集合を潰す操作と、作用素側で同じ射影になることが一致しています。

<!-- definition-example-end -->

次の定理で、この対応が全射影を尽くすことまで示します。

<a id="thm-vn6-projection-measure-algebra"></a>

<!-- formal-statement-start -->
### 定理（測度代数と $L^\infty$ 乗算環の射影の対応）

$(X,\Sigma,\mu)$ を有限測度空間とし、

$$
\mathcal M_\mu
=
\{M_f:f\in L^\infty(X,\mu)\}
$$

とする。

可測集合の同値類 $[E]\in\Sigma/{\sim}$ に対して

$$
[E]
\longmapsto
P_E:=M_{1_E}
$$

と対応させる。

これは測度代数と $\mathcal M_\mu$ の射影全体との一対一対応を与える。

さらに

$$
\boxed{
P_EP_F=P_{E\cap F},
\qquad
I-P_E=P_{E^c}
}
$$

であり、

$$
\boxed{
P_E\le P_F
\quad\Longleftrightarrow\quad
\mu(E\setminus F)=0
}
$$

が成り立つ。
<!-- formal-statement-end -->

### 証明の見取り図

$1_E^2=1_E$ と $\overline{1_E}=1_E$ なので $P_E$ が射影であることはすぐです。

逆に $\mathcal M_\mu$ の射影 $P=M_f$ を取ると、

$$
P^2=P
$$

から

$$
f^2=f
\quad\text{a.e.}
$$

が出ます。

複素数方程式

$$
z^2=z
$$

の解は $0,1$ だけなので、$f$ は a.e. に指示関数です。

<!-- proof-start -->
### 証明

まず $E\in\Sigma$ とします。

$$
1_E^2=1_E
$$

かつ

$$
\overline{1_E}=1_E
$$

なので、乗算作用素の積と随伴の公式から

$$
P_E^2
=
M_{1_E}^2
=
M_{1_E^2}
=
M_{1_E}
=
P_E
$$

および

$$
P_E^*
=
M_{\overline{1_E}}
=
P_E.
$$

従って $P_E$ は直交射影です。

また

$$
P_E=P_F
$$

なら

$$
0
=
\|P_E-P_F\|
=
\|1_E-1_F\|_\infty.
$$

従って

$$
1_E=1_F
\quad\text{a.e.},
$$

すなわち

$$
\mu(E\triangle F)=0.
$$

逆向きも同様に $1_E=1_F$ a.e. から $P_E=P_F$ です。

よって $[E]\mapsto P_E$ は well-defined で単射です。

次に $\mathcal M_\mu$ の任意の射影 $P$ を取ります。

ある $f\in L^\infty$ が存在して

$$
P=M_f.
$$

$P^2=P$ なので

$$
M_{f^2}=M_f.
$$

乗算表示の単射性から

$$
f^2=f
\quad\text{a.e.}
$$

です。

方程式

$$
z^2=z
$$

は

$$
z(z-1)=0
$$

なので、複素数での解は $0$ と $1$ だけです。

従ってある可測集合

$$
E=\{x:f(x)=1\}
$$

を取り直せば

$$
f=1_E
\quad\text{a.e.}
$$

となります。

よって

$$
P=P_E.
$$

したがって対応は全射です。

積については

$$
P_EP_F
=
M_{1_E1_F}
=
M_{1_{E\cap F}}
=
P_{E\cap F}.
$$

補集合については

$$
I-P_E
=
M_1-M_{1_E}
=
M_{1-1_E}
=
M_{1_{E^c}}
=
P_{E^c}.
$$

最後に、可換する射影では

$$
P_E\le P_F
$$

と

$$
P_EP_F=P_E
$$

は同値です。

一方

$$
P_EP_F=P_E
$$

は

$$
1_{E\cap F}=1_E
\quad\text{a.e.}
$$

と同値で、これは

$$
\mu(E\setminus F)=0
$$

と同値です。

従って

$$
\boxed{
P_E\le P_F
\Longleftrightarrow
\mu(E\setminus F)=0
}.
$$
<!-- proof-end -->

ここで、von Neumann 環の射影が「部分空間への射影」だけでなく、可換な場合には**可測集合の論理**そのものを持っていることが見えます。

---

## 5. 正規状態は可測集合へ確率を与える

VN5 では、単位ベクトル $\xi$ が

$$
\omega_\xi(A)=\langle A\xi,\xi\rangle
$$

という正規状態を作ることを確認しました。

これを $\mathcal M_\mu$ に制限すると、積分がそのまま出ます。

<a id="prop-vn6-vector-state-integral"></a>

<!-- formal-statement-start -->
### 命題（$L^\infty$ 乗算環上のベクトル状態の積分表示）

$(X,\Sigma,\mu)$ を有限測度空間とし、

$$
\mathcal M_\mu
=
\{M_f:f\in L^\infty(X,\mu)\}
$$

とする。

$\xi\in L^2(X,\mu)$ が

$$
\|\xi\|_2=1
$$

を満たすとき、

$$
\omega_\xi(M_f)
:=
\langle M_f\xi,\xi\rangle
$$

は $\mathcal M_\mu$ 上の正規状態であり、

$$
\boxed{
\omega_\xi(M_f)
=
\int_X f|\xi|^2\,d\mu
}
$$

と書ける。

特に射影 $P_E=M_{1_E}$ に対して

$$
\boxed{
\omega_\xi(P_E)
=
\int_E|\xi|^2\,d\mu
}
$$

である。
<!-- formal-statement-end -->

### 確認

積分表示は内積へ代入すれば

$$
\begin{aligned}
\omega_\xi(M_f)
&=
\langle M_f\xi,\xi\rangle\\
&=
\int_X f\xi\overline{\xi}\,d\mu\\
&=
\int_X f|\xi|^2\,d\mu
\end{aligned}
$$

です。

正規性は、VN5 で示した「ベクトル汎関数は正規」であることから従います。$\|\xi\|_2=1$ なので

$$
\omega_\xi(I)=1.
$$

また $M_f\ge0$ なら $f\ge0$ a.e. なので積分は非負です。

したがって

$$
|\xi|^2\,d\mu
$$

は、射影に値を入れるときの確率密度として働きます。

### 具体例

$X=[0,1]$ とし、

$$
\xi(x)
=
\sqrt2\,1_{[0,1/2]}(x)
$$

とします。

$$
\|\xi\|_2^2
=
\int_0^{1/2}2\,dx
=
1
$$

なので単位ベクトルです。

$E=[0,1/4]$ なら

$$
\omega_\xi(P_E)
=
\int_0^{1/4}2\,dx
=
\frac12.
$$

可測集合 $E$ が射影 $P_E$ へ、正規状態が確率へ変わることで

$$
\boxed{
\text{測度論}
\longleftrightarrow
\text{可換 von Neumann 環}
}
$$

という対応が具体化されます。

---

## 6. $C(K)$ と $L^\infty$ は何が違うのか

ここまでで、OA4 と本章の役割を比較できます。

| 観点 | $C(K)$ | $L^\infty(X,\mu)$ |
|---|---|---|
| 関数 | 連続関数 | 本質的有界な可測関数 |
| 同一視 | 点ごとに一致 | a.e. に一致 |
| ノルム | $\sup |f|$ | $\operatorname*{ess\,sup}|f|$ |
| 自然な環 | 可換 $C^*$-環 | 可換 von Neumann 環の代表モデル |
| 射影 | clopen 集合の指示関数 | 可測集合 modulo 零集合の指示関数 |
| 閉性 | 作用素ノルム | WOT/SOT |

特に点評価の違いは重要です。

$C(K)$ では

$$
f\longmapsto f(x)
$$

が意味を持ちます。

しかし $L^\infty$ では一点の値を変えても同じ元なので、一般には

$$
[f]\longmapsto f(x)
$$

は well-defined ではありません。

可換 $C^*$-環では「点」が前面に出ますが、可換 von Neumann 環では「可測集合 modulo 零集合」と射影が前面に出ます。

---

## 7. ノルム閉包では入らない射影が、SOT では入る

閉包の違いを $[0,1]$ で直接見ます。

$$
H=L^2([0,1])
$$

とし、

$$
\mathcal A
=
\{M_f:f\in C([0,1])\}
$$

を考えます。

乗算作用素のノルム公式から

$$
\|M_f-M_g\|
=
\|f-g\|_\infty.
$$

したがって $C([0,1])$ が一様ノルムで完備であることから、$\mathcal A$ は作用素ノルムで閉じています。

一方、

$$
p=1_{[0,1/2]}
$$

は不連続なので

$$
M_p\notin\mathcal A.
$$

しかし SOT では $M_p$ を連続関数から近似できます。

<a id="prop-vn6-continuous-to-measurable-sot"></a>

<!-- formal-statement-start -->
### 命題（連続乗算作用素の SOT 極限として現れる可測射影）

$H=L^2([0,1])$ とし、

$$
p=1_{[0,1/2]}.
$$

$n\ge3$ に対して連続関数 $f_n\in C([0,1])$ を

$$
f_n(x)
=
\begin{cases}
1,
&
0\le x\le \frac12-\frac1n,
\\
\frac n2\left(\frac12+\frac1n-x\right),
&
\frac12-\frac1n<x<\frac12+\frac1n,
\\
0,
&
\frac12+\frac1n\le x\le1
\end{cases}
$$

で定める。

このとき

$$
\boxed{
M_{f_n}\xrightarrow{\mathrm{SOT}}M_p
}
$$

だが、

$$
\boxed{
\|M_{f_n}-M_p\|
=
\frac12
}
$$

であり、作用素ノルムでは収束しない。
<!-- formal-statement-end -->

### 証明の見取り図

各 $x\ne1/2$ では

$$
f_n(x)\to p(x)
$$

で、しかも

$$
0\le f_n\le1.
$$

したがって任意の $\xi\in L^2$ に対し

$$
|f_n-p|^2|\xi|^2
\le
|\xi|^2
$$

として優収束定理が使えます。

ノルム収束しないことは、本質的上限を見るだけです。

<!-- proof-start -->
### 証明

任意の

$$
x\ne\frac12
$$

を固定します。

十分大きい $n$ では $x$ は遷移区間

$$
\left(
\frac12-\frac1n,
\frac12+\frac1n
\right)
$$

の外に出るので

$$
f_n(x)\to p(x).
$$

また全ての $n$ で

$$
0\le f_n\le1,
\qquad
0\le p\le1
$$

だから

$$
|f_n-p|^2\le1.
$$

任意の $\xi\in L^2([0,1])$ に対し

$$
\begin{aligned}
\|(M_{f_n}-M_p)\xi\|_2^2
&=
\int_0^1|f_n-p|^2|\xi|^2\,dx.
\end{aligned}
$$

被積分関数は a.e. に0へ収束し、

$$
|f_n-p|^2|\xi|^2
\le
|\xi|^2
$$

で、$|\xi|^2$ は可積分です。

優収束定理から

$$
\|(M_{f_n}-M_p)\xi\|_2^2
\to0.
$$

$\xi$ は任意なので

$$
M_{f_n}\xrightarrow{\mathrm{SOT}}M_p.
$$

一方、乗算作用素のノルム公式から

$$
\|M_{f_n}-M_p\|
=
\|f_n-p\|_\infty.
$$

遷移区間の左半分では $p=1$ で $f_n$ は1から $1/2$ まで下がり、右半分では $p=0$ で $f_n$ は $1/2$ から0まで下がります。

従って

$$
\operatorname*{ess\,sup}|f_n-p|
=
\frac12.
$$

よって

$$
\boxed{
\|M_{f_n}-M_p\|
=
\frac12
}
$$

で、作用素ノルム収束はしません。
<!-- proof-end -->

この一例だけで、$C^*$-環と von Neumann 環の閉包の違いが目で見えます。

$$
\boxed{
\text{ノルム閉包では連続性が残るが、
SOT/WOT 閉包では可測な射影が入ってくる}
}
$$

ということです。

---

## 8. 可換 von Neumann 環の一般論はどこまで言えるか

本章で証明したのは

$$
L^\infty(X,\mu)
\longrightarrow
B(L^2(X,\mu))
$$

という具体的な乗算表示が von Neumann 環を作ることです。

これは「可換 von Neumann 環は測度空間上の $L^\infty$ で理解される」という一般論の代表モデルです。

ただし、一般の可換 von Neumann 環の表現定理を完全な形で述べるには、

- 測度空間側の適切な完全性
- predual の性質
- 表現の faithful 性
- 必要に応じた分解

を丁寧に扱う必要があります。

したがって本章では、

$$
\boxed{
\text{全ての可換 von Neumann 環を無条件に
一つの素朴な有限測度空間の }L^\infty\text{ と同一視する}
}
$$

とは主張しません。

ここで得た完成像は次です。

1. $L^\infty$ は乗算作用素として $B(L^2)$ に入る。
2. その作用素ノルムは本質的上限に一致する。
3. 有限測度空間では、その乗算環の可換子は自分自身である。
4. 従って乗算環は可換 von Neumann 環である。
5. 射影は可測集合 modulo 零集合と一対一対応する。
6. 正規ベクトル状態は密度 $|\xi|^2$ による積分になる。
7. $C(K)$ と $L^\infty$ の差は、連続/可測だけでなく、ノルム閉包と SOT/WOT 閉包の差として現れる。

次の VN7 では、可換性を外して

$$
Z(M)=M\cap M'
$$

という中心を取り出し、中心が最小になる **factor** へ進みます。

可換 von Neumann 環では

$$
Z(M)=M
$$

でした。factor では逆に

$$
Z(M)=\mathbb CI
$$

まで中心を縮めます。

この両端を見ることで、型 I / II / III 分類への入口が見えるようになります。

---

# 演習

## Level A

### A1. 有限集合の乗算作用素

$$
X=\{1,2,3\}
$$

に数え上げ測度を入れ、

$$
f=(2,-1,i)
$$

とする。

1. $L^2(X)\cong\mathbb C^3$ の標準基底で $M_f$ の行列を求めよ。
2. $\|M_f\|$ を求めよ。
3. $M_f^*$ を求めよ。
4. $M_f$ が正規作用素であることを示せ。

- Level: A

#### 詳細解答

標準基底を $e_1,e_2,e_3$ とすると、点ごとの掛け算なので

$$
M_fe_1=2e_1,
\qquad
M_fe_2=-e_2,
\qquad
M_fe_3=ie_3.
$$

従って

$$
\boxed{
M_f
=
\begin{pmatrix}
2&0&0\\
0&-1&0\\
0&0&i
\end{pmatrix}
}.
$$

$L^\infty$ ノルムは

$$
\|f\|_\infty
=
\max\{2,1,1\}
=
2.
$$

乗算作用素のノルム公式から

$$
\boxed{
\|M_f\|=2
}.
$$

随伴は複素共役を取ればよいので

$$
\boxed{
M_f^*
=
M_{\overline f}
=
\begin{pmatrix}
2&0&0\\
0&-1&0\\
0&0&-i
\end{pmatrix}
}.
$$

最後に

$$
M_fM_f^*
=
M_{f\overline f}
=
M_{\overline f f}
=
M_f^*M_f.
$$

従って

$$
\boxed{
M_f\text{ は正規作用素}
}.
$$

---

### A2. 可測集合が作る射影

$X=[0,1]$、Lebesgue 測度とし、

$$
E=[0,1/3].
$$

1. $P_E=M_{1_E}$ が直交射影であることを示せ。
2. $\operatorname{Ran}P_E$ を記述せよ。
3.
   $$
   F=E\cup\{3/4\}
   $$
   としたとき $P_E=P_F$ を示せ。
4. $E$ と $F$ が測度代数で同じ元になる理由を述べよ。

- Level: A

#### 詳細解答

$$
1_E^2=1_E,
\qquad
\overline{1_E}=1_E
$$

なので

$$
P_E^2
=
M_{1_E^2}
=
M_{1_E}
=
P_E
$$

かつ

$$
P_E^*
=
M_{\overline{1_E}}
=
P_E.
$$

従って

$$
\boxed{
P_E\text{ は直交射影}
}.
$$

任意の $\xi\in L^2([0,1])$ に対して

$$
(P_E\xi)(x)
=
1_E(x)\xi(x)
$$

なので、像は $E$ の外で0になる関数全体です。

従って

$$
\boxed{
\operatorname{Ran}P_E
=
\{\eta\in L^2:\eta=0\text{ a.e. on }E^c\}
}.
$$

次に

$$
E\triangle F=\{3/4\}
$$

で一点集合は零集合だから

$$
1_E=1_F
\quad\text{a.e.}
$$

です。

よって

$$
\boxed{
P_E=M_{1_E}=M_{1_F}=P_F
}.
$$

同じ理由で

$$
\mu(E\triangle F)=0
$$

だから

$$
\boxed{
[E]=[F]\in\Sigma/{\sim}
}.
$$

---

### A3. ベクトル状態が作る確率

$X=[0,1]$ とし、

$$
\xi
=
\sqrt2\,1_{[0,1/2]}.
$$

1. $\|\xi\|_2=1$ を示せ。
2. $f(x)=x$ に対して $\omega_\xi(M_f)$ を求めよ。
3.
   $$
   E=[0,1/4]
   $$
   に対して $\omega_\xi(P_E)$ を求めよ。
4.
   $$
   F=[3/4,1]
   $$
   に対して $\omega_\xi(P_F)$ を求めよ。

- Level: A

#### 詳細解答

まず

$$
\|\xi\|_2^2
=
\int_0^{1/2}2\,dx
=
1.
$$

従って

$$
\boxed{
\|\xi\|_2=1
}.
$$

$f(x)=x$ に対して

$$
\begin{aligned}
\omega_\xi(M_f)
&=
\int_0^1x|\xi(x)|^2\,dx\\
&=
2\int_0^{1/2}x\,dx\\
&=
2\left[\frac{x^2}{2}\right]_0^{1/2}\\
&=
\frac14.
\end{aligned}
$$

したがって

$$
\boxed{
\omega_\xi(M_f)=\frac14
}.
$$

$E=[0,1/4]$ では

$$
\omega_\xi(P_E)
=
\int_E|\xi|^2\,dx
=
2\cdot\frac14
=
\boxed{\frac12}.
$$

一方 $F=[3/4,1]$ では $\xi=0$ a.e. なので

$$
\boxed{
\omega_\xi(P_F)=0
}.
$$

---

### A4. SOT では収束するがノルムでは収束しない

本文の $p=1_{[0,1/2]}$ と $f_n$ を使う。

1. 各 $x\ne1/2$ で $f_n(x)\to p(x)$ を確認せよ。
2. $\xi=1$ に対して
   $$
   \|(M_{f_n}-M_p)1\|_2\to0
   $$
   を示せ。
3. 任意の $\xi\in L^2$ でも同じ結論が成り立つ理由を述べよ。
4.
   $$
   \|M_{f_n}-M_p\|=\frac12
   $$
   を確認し、ノルム収束しないことを説明せよ。

- Level: A

#### 詳細解答

$x<1/2$ を固定すると、十分大きい $n$ で

$$
x\le\frac12-\frac1n
$$

となるので

$$
f_n(x)=1=p(x).
$$

$x>1/2$ なら、十分大きい $n$ で

$$
x\ge\frac12+\frac1n
$$

となるので

$$
f_n(x)=0=p(x).
$$

従って

$$
f_n(x)\to p(x)
$$

が $x\ne1/2$ で成り立ちます。

$\xi=1$ では

$$
\|(M_{f_n}-M_p)1\|_2^2
=
\int_0^1|f_n-p|^2\,dx.
$$

差が非零なのは長さ $2/n$ の遷移区間だけで、$|f_n-p|\le1/2$ だから

$$
\|(M_{f_n}-M_p)1\|_2^2
\le
\frac{2}{n}\cdot\frac14
=
\frac1{2n}.
$$

よって

$$
\boxed{
\|(M_{f_n}-M_p)1\|_2\to0
}.
$$

一般の $\xi\in L^2$ では

$$
|f_n-p|^2|\xi|^2
\le
|\xi|^2
$$

で、左辺は a.e. に0へ収束するため優収束定理から

$$
\boxed{
\|(M_{f_n}-M_p)\xi\|_2\to0
}.
$$

従って SOT 収束です。

一方

$$
\|M_{f_n}-M_p\|
=
\|f_n-p\|_\infty
=
\frac12.
$$

したがって

$$
\boxed{
M_{f_n}\text{ は }M_p\text{ へ作用素ノルム収束しない}
}.
$$

---

## Level B

### B1. 有限次元の「可換子＝対角」を再構成する

$\mathcal D_n\subset M_n(\mathbb C)$ を全ての対角行列の集合とする。

$$
T=(t_{jk})\in M_n(\mathbb C)
$$

が全ての $D\in\mathcal D_n$ と可換すると仮定する。

$$
T\in\mathcal D_n
$$

を示せ。

- Level: B

#### 詳細解答

各 $r=1,\ldots,n$ に対して、$r$ 番目の対角成分だけが1で他が0の行列

$$
P_r
=
\operatorname{diag}(0,\ldots,0,1,0,\ldots,0)
$$

を取ります。

仮定から

$$
TP_r=P_rT.
$$

$(j,k)$ 成分を比べます。

$TP_r$ は $r$ 列だけを残すので

$$
(TP_r)_{jk}
=
t_{jr}\,\delta_{kr}.
$$

一方 $P_rT$ は $r$ 行だけを残すので

$$
(P_rT)_{jk}
=
\delta_{jr}\,t_{rk}.
$$

$k=r$、$j\ne r$ とすると

$$
t_{jr}=0.
$$

$j=r$、$k\ne r$ とすると

$$
t_{rk}=0.
$$

$r$ は任意なので全ての非対角成分が0です。

従って

$$
\boxed{
T\in\mathcal D_n
}.
$$

よって

$$
\boxed{
\mathcal D_n'=\mathcal D_n
}.
$$

これは本文の

$$
\mathcal M_\mu'=\mathcal M_\mu
$$

の有限次元版です。

---

### B2. $T1$ から可換子を復元する

$(X,\Sigma,\mu)$ を

$$
0<\mu(X)<\infty
$$

を満たす有限測度空間とし、

$$
\mathcal M_\mu
=
\{M_f:f\in L^\infty(X,\mu)\}
$$

とする。

$T\in\mathcal M_\mu'$ と仮定し、

$$
g=T1
$$

と置く。

1.
   $$
   T1_E=1_Eg
   $$
   を示せ。
2. 任意の単関数 $s$ に対して $Ts=gs$ を示せ。
3. $g\in L^\infty$ と $\|g\|_\infty\le\|T\|$ を示せ。
4. $T=M_g$ を結論せよ。

- Level: B

#### 詳細解答

可測集合 $E$ に対して

$$
M_{1_E}\in\mathcal M_\mu.
$$

$T$ は $\mathcal M_\mu$ と可換するので

$$
\begin{aligned}
T1_E
&=
T(M_{1_E}1)\\
&=
M_{1_E}(T1)\\
&=
1_Eg.
\end{aligned}
$$

従って

$$
\boxed{
T1_E=1_Eg
}.
$$

単関数

$$
s=\sum_{j=1}^{m}c_j1_{E_j}
$$

では

$$
\begin{aligned}
Ts
&=
\sum_{j=1}^{m}c_jT1_{E_j}\\
&=
\sum_{j=1}^{m}c_j1_{E_j}g\\
&=
gs.
\end{aligned}
$$

次に $c>\|T\|$ とし、

$$
E_c=\{|g|>c\}
$$

を考えます。

もし $\mu(E_c)>0$ なら

$$
\|T1_{E_c}\|_2
=
\|g1_{E_c}\|_2
>
c\|1_{E_c}\|_2.
$$

一方、作用素ノルムの定義から

$$
\|T1_{E_c}\|_2
\le
\|T\|\|1_{E_c}\|_2.
$$

これは $c>\|T\|$ に矛盾します。

従って全ての $c>\|T\|$ で

$$
\mu(E_c)=0.
$$

よって

$$
\boxed{
\|g\|_\infty\le\|T\|
}
$$

であり

$$
g\in L^\infty.
$$

単関数は $L^2$ に稠密で、単関数上では

$$
T=M_g
$$

でした。

両作用素は有界なので稠密性から全 $L^2$ 上で一致します。

従って

$$
\boxed{
T=M_g\in\mathcal M_\mu
}.
$$

---

### B3. 増大する可測集合と SOT 収束

可測集合列が

$$
E_1\subset E_2\subset\cdots
$$

を満たし、

$$
E=\bigcup_{n=1}^{\infty}E_n
$$

とする。

$$
P_n=M_{1_{E_n}},
\qquad
P=M_{1_E}
$$

と置く。

1. $P_n\le P_{n+1}\le P$ を示せ。
2. 任意の $\xi\in L^2$ に対して
   $$
   \|(P-P_n)\xi\|_2^2
   =
   \int_{E\setminus E_n}|\xi|^2\,d\mu
   $$
   を示せ。
3.
   $$
   P_n\xrightarrow{\mathrm{SOT}}P
   $$
   を示せ。
4. この結果が「集合の単調増加」と「射影の単調増加」を対応させていることを説明せよ。

- Level: B

#### 詳細解答

$E_n\subset E_{n+1}$ なので

$$
1_{E_n}1_{E_{n+1}}
=
1_{E_n}
$$

です。

従って

$$
P_nP_{n+1}
=
P_n.
$$

可換する射影の順序判定から

$$
P_n\le P_{n+1}.
$$

同様に $E_n\subset E$ だから

$$
P_n\le P.
$$

次に

$$
(P-P_n)\xi
=
(1_E-1_{E_n})\xi
=
1_{E\setminus E_n}\xi.
$$

よって

$$
\boxed{
\|(P-P_n)\xi\|_2^2
=
\int_{E\setminus E_n}|\xi|^2\,d\mu
}.
$$

各点 $x$ について

$$
1_{E\setminus E_n}(x)\downarrow0
$$

です。

また

$$
0
\le
1_{E\setminus E_n}|\xi|^2
\le
|\xi|^2
$$

で $|\xi|^2$ は可積分です。

優収束定理から

$$
\int_{E\setminus E_n}|\xi|^2\,d\mu
\to0.
$$

従って

$$
\boxed{
P_n\xrightarrow{\mathrm{SOT}}P
}.
$$

つまり

$$
E_n\uparrow E
$$

という測度論の単調極限が

$$
P_{E_n}\uparrow P_E
$$

という von Neumann 環の射影極限へそのまま移っています。

---

### B4. $L^1$ 密度から正規状態を作る

有限測度空間 $(X,\Sigma,\mu)$ 上で

$$
h\in L^1(X,\mu),
\qquad
h\ge0,
\qquad
\int_Xh\,d\mu=1
$$

とする。

$$
\xi=\sqrt h
$$

と置き、

$$
\varphi_h(M_f)
=
\int_Xfh\,d\mu
$$

と定める。

1. $\xi\in L^2$ かつ $\|\xi\|_2=1$ を示せ。
2.
   $$
   \varphi_h(M_f)
   =
   \langle M_f\xi,\xi\rangle
   $$
   を示せ。
3. $\varphi_h$ が正規状態であることを説明せよ。
4. 射影 $P_E$ に対して
   $$
   \varphi_h(P_E)=\int_Eh\,d\mu
   $$
   を示せ。

- Level: B

#### 詳細解答

$h\ge0$ なので $\sqrt h$ は可測です。

さらに

$$
\int_X|\sqrt h|^2\,d\mu
=
\int_Xh\,d\mu
=
1.
$$

従って

$$
\boxed{
\xi=\sqrt h\in L^2,
\qquad
\|\xi\|_2=1
}.
$$

次に

$$
\begin{aligned}
\langle M_f\xi,\xi\rangle
&=
\int_X f\xi\overline{\xi}\,d\mu\\
&=
\int_X f|\xi|^2\,d\mu\\
&=
\int_Xfh\,d\mu\\
&=
\varphi_h(M_f).
\end{aligned}
$$

従って $\varphi_h$ は単位ベクトル $\xi$ が作るベクトル状態です。

VN5 よりベクトル状態は正規なので

$$
\boxed{
\varphi_h\text{ は正規状態}
}.
$$

最後に $P_E=M_{1_E}$ を代入すると

$$
\begin{aligned}
\varphi_h(P_E)
&=
\int_X1_Eh\,d\mu\\
&=
\boxed{
\int_Eh\,d\mu
}.
\end{aligned}
$$

したがって可換 von Neumann 環上の正規状態は、少なくともこの形では通常の確率密度と全く同じ式で射影へ確率を与えます。

---

## Level C

### C1. $C([0,1])$ から $L^\infty([0,1])$ へ：閉包・射影・状態を一つにつなぐ

$$
H=L^2([0,1])
$$

とし、

$$
\mathcal A
=
\{M_f:f\in C([0,1])\},
\qquad
\mathcal M
=
\{M_g:g\in L^\infty([0,1])\}
$$

とする。

また

$$
E=[0,1/2],
\qquad
P=M_{1_E},
$$

および

$$
h=2\,1_E
$$

とする。

以下を示せ。

1. $\mathcal A$ は作用素ノルムで閉じた可換 $C^*$-部分環である。
2. $P\in\mathcal M$ は非自明な射影だが $P\notin\mathcal A$ である。
3. 本文の連続関数 $f_n$ を使って
   $$
   M_{f_n}\xrightarrow{\mathrm{SOT}}P
   $$
   を示し、$\mathcal A$ が SOT 閉でないことを結論せよ。
4. $\mathcal M'=\mathcal M$ を示す証明を $T1$ から再構成せよ。
5.
   $$
   \varphi(M_g)
   =
   \int_0^1g(x)h(x)\,dx
   $$
   が $\mathcal M$ 上の正規状態であることを示せ。
6.
   $$
   \varphi(P)
   $$
   を求めよ。
7. この例から、$C^*$-環と von Neumann 環で「可換関数環」の姿が変わる理由を説明せよ。

- Level: C

#### 詳細解答

まず $f\mapsto M_f$ は

$$
\|M_f\|=\|f\|_\infty
$$

を満たし、積・随伴・単位元を保ちます。

$C([0,1])$ は一様ノルムで完備なので、その像 $\mathcal A$ は作用素ノルムで閉じています。

また積は点ごとなので可換です。

従って

$$
\boxed{
\mathcal A\text{ は可換 }C^*\text{-部分環}
}.
$$

次に

$$
P=M_{1_E}
$$

は $1_E\in L^\infty$ なので

$$
P\in\mathcal M.
$$

さらに

$$
P^2=P=P^*
$$

だから射影です。

$E$ と $E^c$ はどちらも正の測度を持つので

$$
P\ne0,
\qquad
P\ne I.
$$

一方 $1_E$ は $x=1/2$ で不連続です。

もし $P=M_f$ となる連続関数 $f$ が存在すれば

$$
\|f-1_E\|_\infty
=
\|M_f-P\|
=
0
$$

なので

$$
f=1_E
\quad\text{a.e.}
$$

です。

しかし連続関数が $[0,1/2)$ で a.e. に1、$(1/2,1]$ で a.e. に0なら、連続性から左側全体で1、右側全体で0となり、$1/2$ で連続に接続できません。

従って

$$
\boxed{
P\notin\mathcal A
}.
$$

本文の $f_n$ は a.e. に $1_E$ へ収束し、

$$
|f_n-1_E|\le1.
$$

任意の $\xi\in L^2$ に対して

$$
\|(M_{f_n}-P)\xi\|_2^2
=
\int_0^1|f_n-1_E|^2|\xi|^2\,dx.
$$

優収束定理から右辺は0へ収束します。

従って

$$
\boxed{
M_{f_n}\xrightarrow{\mathrm{SOT}}P
}.
$$

各 $M_{f_n}\in\mathcal A$ なのに $P\notin\mathcal A$ なので

$$
\boxed{
\mathcal A\text{ は SOT 閉でない}
}.
$$

次に $\mathcal M'=\mathcal M$ を示します。

$\mathcal M$ は可換なので

$$
\mathcal M\subset\mathcal M'.
$$

逆に $T\in\mathcal M'$ を取り、

$$
g=T1
$$

と置きます。

任意の可測集合 $F$ について

$$
T1_F
=
T(M_{1_F}1)
=
M_{1_F}T1
=
1_Fg.
$$

従って単関数 $s$ では

$$
Ts=gs.
$$

$c>\|T\|$ に対して

$$
F_c=\{|g|>c\}
$$

が正の測度を持つと仮定すると

$$
\|T1_{F_c}\|_2
=
\|g1_{F_c}\|_2
>
c\|1_{F_c}\|_2
$$

ですが、有界性から

$$
\|T1_{F_c}\|_2
\le
\|T\|\|1_{F_c}\|_2.
$$

矛盾です。

従って

$$
g\in L^\infty,
\qquad
\|g\|_\infty\le\|T\|.
$$

単関数の稠密性から

$$
T=M_g\in\mathcal M.
$$

よって

$$
\boxed{
\mathcal M'=\mathcal M
}.
$$

次に

$$
h=2\,1_E
$$

について

$$
h\ge0
$$

かつ

$$
\int_0^1h\,dx
=
2\cdot\frac12
=
1.
$$

$$
\xi=\sqrt h
=
\sqrt2\,1_E
$$

と置けば

$$
\|\xi\|_2=1.
$$

さらに

$$
\begin{aligned}
\varphi(M_g)
&=
\int_0^1gh\,dx\\
&=
\int_0^1g|\xi|^2\,dx\\
&=
\langle M_g\xi,\xi\rangle.
\end{aligned}
$$

従って $\varphi$ は単位ベクトル状態の $\mathcal M$ への制限です。

VN5 よりベクトル状態は正規なので

$$
\boxed{
\varphi\text{ は正規状態}
}.
$$

$P=M_{1_E}$ に対して

$$
\begin{aligned}
\varphi(P)
&=
\int_0^11_Eh\,dx\\
&=
\int_E2\,dx\\
&=
2\cdot\frac12\\
&=
\boxed{1}.
\end{aligned}
$$

最後に構造をまとめます。

$\mathcal A$ では作用素ノルム閉性だけを見るため、連続関数という点ごとの構造が保たれます。

一方 SOT では、各ベクトル $\xi$ に掛けた後の $L^2$ 誤差だけが0になればよいので、狭い遷移領域の不連続性は極限で消せます。

その結果、可測集合の指示関数が射影として入ってきます。

従って

$$
\boxed{
C(K)
\text{ から }
L^\infty
\text{ への移行は、}
\text{連続}\to\text{可測}
\text{ というだけでなく、}
\text{ノルム閉包}\to\text{作用素位相閉包}
\text{ の移行}
}
$$

と理解できます。

これが作用素環論 I の可換 $C^*$-環と、作用素環論 II の可換 von Neumann 環を分ける核心です。
