# QFT19 Gaussian・Grassmann積分と生成汎関数

[QFT9のWickの定理](../QFT9/index.md#thm-qft9-boson-wick)では、多数の自由場の真空期待値を二点関数の積へ分解しました。ただし、場を一つ増やすたびにすべての収縮を数え上げるのは大変です。また、フェルミオンでは場を交換するたびに符号が生じます。

この講義の中心問いは、**二点関数を一つの積分に記録し、微分または係数抽出だけで多点関数を求められるか**です。まず有限個の実変数でGaussian積分を厳密に計算し、次に反交換する記号を使うGrassmann/Berezin積分を作ります。双方を比較すると、ボース場には逆行列式の平方根、フェルミオンには行列式が現れる理由と、Wick収縮の符号の違いが見えます。

以下はすべて**有限次元での代数・積分**から始めます。連続時空の場は一般に各点で通常の関数ではなく、[QFT4の作用素値分布](../QFT4/index.md#prop-qft4-operator-distribution)や[QFT8のDirac場](../QFT8/index.md#def-qft8-field)として扱う対象です。有限次元の式を記号的に無限個の変数へ拡張しただけで、無限次元のLebesgue測度や相互作用を含む量子場を構成したことにはなりません。

## 1. 実Gaussian積分から二点関数を取り出す

実数ベクトル $x=(x_1,\ldots,x_n)^T$ の二次式 $x^TAx$ を考えます。$A$ が実対称正定値なら、原点から遠ざかると指数が減衰して積分が収束します。正定値とは $x\ne0$ なら $x^TAx>0$ という条件です。$A^{-1}$ はこの二次形式が許す揺らぎの大きさを記録します。

<a id="def-qft19-gaussian-weight"></a>

<!-- formal-statement-start -->
> **定義（正定値Gaussian重みと期待値）**  
> 整数 $n\ge1$ と実対称正定値行列 $A\in\mathbb R^{n\times n}$ に対し、$x\in\mathbb R^n$ の積分の規格化定数と、多項式 $F(x)$ のGaussian期待値を

$$
Z_B(0)=\int_{\mathbb R^n}e^{-\frac12x^TAx}\,d^nx,\qquad
\langle F\rangle_B=\frac{1}{Z_B(0)}
\int_{\mathbb R^n}F(x)e^{-\frac12x^TAx}\,d^nx
$$

> と定義する。正定値性によって $0<Z_B(0)<\infty$ であり、多項式の全次数の積分は有限である。添字 $B$ はボース型の可換変数を表す。
<!-- formal-statement-end -->

<!-- definition-example-start: def-qft19-gaussian-weight -->
### 例：二変数の重みが積に分かれる条件

**定義の確認**：$A=\operatorname{diag}(2,3)$ とすると

$$
x^TAx=2x_1^2+3x_2^2.
$$

$x\ne0$ なら少なくとも一方の平方が正なので $x^TAx>0$ です。したがって重みは $e^{-x_1^2}e^{-3x_2^2/2}$ と因数分解し、それぞれの一変数積分が有限です。単に対角行列であるからでなく、**対角成分がともに正**であることが収束の根拠です。
<!-- definition-example-end -->

積分で $x_i$ を何度も掛ける代わりに、各変数へ線形に結合する係数 $J_i\in\mathbb R$ を用意します。$J=(J_1,\ldots,J_n)^T$ を変化させれば、$J_i$ での微分によって指数から $x_i$ が一つ現れ、多点関数をまとめて取り出せます。

<a id="def-qft19-bosonic-source"></a>

<!-- formal-statement-start -->
> **定義（ボース生成汎関数）**  
> $A\in\mathbb R^{n\times n}$ を実対称正定値、$J\in\mathbb R^n$ を各変数へ線形結合させる実ソースとする。有限次元のボース生成汎関数とその規格化版を

$$
Z_B(J)=\int_{\mathbb R^n}
\exp\!\left(-\frac12x^TAx+J^Tx\right)d^nx,\qquad
\mathcal Z_B(J)=\frac{Z_B(J)}{Z_B(0)}
$$

> と定義する。$Z_B(0)$ は零ソースでの値で、$\mathcal Z_B(0)=1$ となる。
<!-- formal-statement-end -->

<!-- definition-example-start: def-qft19-bosonic-source -->
### 例：ソース微分は変数の挿入になる

**定義の確認**：$n=1$、$A=(a)$、$a>0$ では、任意の有限な $J$ について平方完成により積分が収束します。その範囲で微分すると

$$
\frac{dZ_B}{dJ}
=\int_{\mathbb R}x\,e^{-ax^2/2+Jx}\,dx,\qquad
\frac{d^2Z_B}{dJ^2}
=\int_{\mathbb R}x^2e^{-ax^2/2+Jx}\,dx.
$$

微分と積分の交換は、$J$ の小区間で指数を $e^{-ax^2/4+C}$ に多項式因子を掛けた可積分関数で抑えられるため正当化できます。よって零ソースでの二階微分を $Z_B(0)$ で割ると $\langle x^2\rangle_B$ です。
<!-- definition-example-end -->

<a id="thm-qft19-gaussian"></a>

<!-- formal-statement-start -->
> **定理（有限次元Gaussian生成公式）**  
> 実対称正定値 $A\in\mathbb R^{n\times n}$、実ソース $J\in\mathbb R^n$ に対し、$G=A^{-1}$ と書く。このとき

$$
Z_B(J)=\frac{(2\pi)^{n/2}}{\sqrt{\det A}}
\exp\!\left(\frac12J^TGJ\right),
\qquad
\mathcal Z_B(J)=\exp\!\left(\frac12J^TGJ\right).
$$

> さらに $\langle x_i\rangle_B=0$、$\langle x_ix_j\rangle_B=G_{ij}$ である。
<!-- formal-statement-end -->

### 証明の見取り図

$x$ を $GJ$ だけ平行移動すると、ソースを含む項は積分の外へ出ます。残った二次形式を直交対角化し、固有値ごとに一変数Gaussian積分を掛けます。二点関数はソース微分を二回行ってから $J=0$ とします。

<!-- proof-start -->
### 証明

実対称行列の直交対角化により、実直交行列 $U$ と実固有値 $\lambda_1,\ldots,\lambda_n$ について $A=U\operatorname{diag}(\lambda_i)U^T$ と書けます。各単位固有ベクトル $u_r$ に対して $u_r^TAu_r=\lambda_r>0$ なので、固有値は全て正です。したがって $A$ は可逆で、$G=A^{-1}$ は対称、$AG=I_n$ です。まず

$$
\begin{aligned}
-\frac12x^TAx+J^Tx
&=-\frac12(x-GJ)^TA(x-GJ)+\frac12J^TGJ,\\
(x-GJ)^TA(x-GJ)
&=x^TAx-2J^Tx+J^TGJ
\end{aligned}
$$

を確かめます。$y=U^T(x-GJ)$ と変数変換するとJacobianの絶対値は $|\det U|=1$ なので

$$
\begin{aligned}
Z_B(J)
&=e^{J^TGJ/2}
\prod_{r=1}^{n}\int_{\mathbb R}e^{-\lambda_ry_r^2/2}\,dy_r\\
&=e^{J^TGJ/2}\prod_{r=1}^{n}\sqrt{\frac{2\pi}{\lambda_r}}
=\frac{(2\pi)^{n/2}}{\sqrt{\prod_r\lambda_r}}e^{J^TGJ/2}.
\end{aligned}
$$

一変数積分は $\lambda_r>0$ による置換 $t=\sqrt{\lambda_r}\,y_r$ と $\int_{\mathbb R}e^{-t^2/2}dt=\sqrt{2\pi}$ から得ます。後者は積分を二乗し、平面の極座標で $\int_0^\infty e^{-r^2/2}r\,dr=1$ を計算して示せます。$\prod_r\lambda_r=\det A$ です。

次に $Q(J)=J^TGJ/2$ と置くと、対称性から

$$
\partial_{J_i}\mathcal Z_B=(GJ)_i\mathcal Z_B,\quad
\partial_{J_j}\partial_{J_i}\mathcal Z_B
=\bigl[G_{ij}+(GJ)_i(GJ)_j\bigr]\mathcal Z_B.
$$

$J=0$ を代入して一階微分は零、二階微分は $G_{ij}$ です。[生成汎関数の定義](#def-qft19-bosonic-source)の下で微分と積分を交換できるので、これらが期待値に一致します。
<!-- proof-end -->

この結果の便利な点は、$n$ 個の変数について一度 $A^{-1}$ を求めれば、あとはソース微分で任意次数の積分を計算できることです。相関を生むのは $A$ 自体ではなく**その逆行列**です。

ソースを非零にすると $\langle x_ix_j\rangle$ には、揺らぎだけでなく平均値どうしの積が含まれます。後で相互作用を加えて「つながった寄与」を取り出すため、ここでその差を固定しておきます。

<a id="def-qft19-connected-two-point"></a>

<!-- formal-statement-start -->
> **定義（連結二点関数）**  
> 有限で非零の $Z_B(J)$ を持つ実Gaussian重みのソース付き平均を

$$
\langle F\rangle_J
=\frac1{Z_B(J)}\int_{\mathbb R^n}
F(x)e^{-x^TAx/2+J^Tx}\,d^nx
$$

> とする。$x_i,x_j$ の連結二点関数を、二点の平均から一変数平均の積を引いた量

$$
\langle x_ix_j\rangle_{J,c}
=\langle x_ix_j\rangle_J-\langle x_i\rangle_J\langle x_j\rangle_J
$$

> と定義する。添字 $c$ は「連結」を表す。
<!-- formal-statement-end -->

<!-- definition-example-start: def-qft19-connected-two-point -->
### 例：一変数で平均の寄与を引く

**定義の確認**：$A=(a)$、$a>0$ なら[有限次元Gaussian生成公式](#thm-qft19-gaussian)から $Z_B(J)=\sqrt{2\pi/a}\,e^{J^2/(2a)}$ です。$J$ で一階・二階微分して各々 $Z_B(J)$ で割ると、平均は $J/a$、二乗の平均は $1/a+J^2/a^2$ です。よって

$$
\langle x^2\rangle_{J,c}
=\left(\frac1a+\frac{J^2}{a^2}\right)-\left(\frac Ja\right)^2
=\frac1a.
$$

$J\ne0$ でも平均の積を除けば、もとの揺らぎの大きさが残ります。
<!-- definition-example-end -->

## 2. 可換変数では収縮のすべての対合を足す

[QFT9のボースWick定理](../QFT9/index.md#thm-qft9-boson-wick)は演算子の生成・消滅部分と交換関係から導きました。ここでの有限次元公式は、その組合せ構造を普通の積分と微分から再現します。ただし、ここでの二点期待値 $G$ をMinkowski時空の時間順序伝播関数と無条件に同一視してはいけません。

<a id="thm-qft19-boson-wick"></a>

<!-- formal-statement-start -->
> **定理（ボースGaussianのWick対合公式）**  
> 実対称正定値 $A\in\mathbb R^{n\times n}$、$G=A^{-1}$、$x\in\mathbb R^n$ に対し、奇数個の積のGaussian期待値は零である。偶数個 $2r$ の添字 $i_1,\ldots,i_{2r}\in\{1,\ldots,n\}$ について

$$
\left\langle\prod_{a=1}^{2r}x_{i_a}\right\rangle_B
=\sum_{P}\prod_{\{a,b\}\in P}G_{i_ai_b}
$$

> が成り立つ。和は $\{1,\ldots,2r\}$ の全ての対合（2要素の組への分割）にわたる。特に

$$
\langle x_ix_jx_kx_l\rangle_B
=G_{ij}G_{kl}+G_{ik}G_{jl}+G_{il}G_{jk}.
$$
<!-- formal-statement-end -->

### 証明の見取り図

[有限次元Gaussian生成公式](#thm-qft19-gaussian)を一回微分すると $(GJ)_i$ が現れます。その後さらに微分するとき、どこかでこの一次式を微分して定数 $G_{ij}$ を作らなければ $J=0$ で消えます。最初の添字の相手を一つ選び、残りにも同じ操作を繰り返すと全対合が一度ずつ得られます。

<!-- proof-start -->
### 証明

$F(J)=e^{J^TGJ/2}$ とし、$\partial_{J_i}F=(GJ)_iF$ を使います。$2r$ 回の微分を取った値を $J=0$ で評価します。積の微分法則により、最初の微分でできる $(GJ)_{i_1}$ を残りの微分のうちちょうど一つ、例えば $\partial_{J_{i_s}}$ が微分して $G_{i_1i_s}$ を作らなければ、その因子は $J=0$ で零になります。

従って残りの $2r-2$ 個の微分を $F$ に作用させる値を $M$ と書けば

$$
M(i_1,\ldots,i_{2r})
=\sum_{s=2}^{2r}G_{i_1i_s}
M(i_2,\ldots,\widehat{i_s},\ldots,i_{2r}),
\qquad M(\varnothing)=1.
$$

帽子はその添字を除く意味です。この漸化式は「位置1の相手を選び、残りを対合する」全ての場合を重複なく数えます。奇数回なら最後に一次式 $(GJ)_i$ が残り零になります。$2r=4$ のとき相手 $s=2,3,4$ が三項を与えます。
<!-- proof-end -->

### 例：同じ変数四個を数える

$n=1$、$A=(a)$、$a>0$ なら $G=1/a$ です。四個の場所を結ぶ対合は3通りなので

$$
\langle x^4\rangle_B=3G^2=\frac{3}{a^2}.
$$

「添字の値が同じだから対合は一つ」としてはいけません。収縮する**位置**は区別し、同じ数値の項が3回現れます。

## 3. 反交換する変数とBerezin積分

[QFT8の正準反交換関係](../QFT8/index.md#thm-qft8-car)ではフェルミオンの演算子を交換すると負号が生じました。経路積分の有限次元模型でもこの符号を保つため、通常の複素数ではなく、互いに反交換する**Grassmann生成子**を導入します。これは反交換する数の代数であって、フェルミオンのHilbert空間演算子そのものではありません。

<a id="def-qft19-grassmann"></a>

<!-- formal-statement-start -->
> **定義（Grassmann代数）**  
> $2n$ 個の独立な形式的生成子 $\theta_1,\ldots,\theta_n,\bar\theta_1,\ldots,\bar\theta_n$ を考える。複素係数を持つ多項式に、任意の二つの生成子 $u,v$ に対して

$$
uv=-vu
$$

> を課して得る結合代数をGrassmann代数とする。特に $u^2=0$ である。生成子の個数が有限なので、各元は生成子の異なる積の有限和に一意に整理できる。$\bar\theta_i$ は $\theta_i$ と独立な生成子を表し、複素共役を意味しない。
<!-- formal-statement-end -->

<!-- definition-example-start: def-qft19-grassmann -->
### 例：反交換性が多項式を有限にする

**定義の確認**：$n=1$ なら $\theta\bar\theta=-\bar\theta\theta$、$\theta^2=\bar\theta^2=0$ です。したがって任意の式は

$$
f=a+b\theta+c\bar\theta+d\theta\bar\theta
$$

に整理できます。例えば $(\theta+\bar\theta)^2=\theta\bar\theta+\bar\theta\theta=0$ です。普通の可換変数では最後の二項が足されるので、この差がフェルミオンの符号の源です。
<!-- definition-example-end -->

Grassmann生成子については無限範囲の通常積分を定義しません。$\theta$ を含む係数を選び出す**線形操作**を積分と呼びます。その際、微分・積分の順序に依存して符号が変わるので、規約を先に固定します。

<a id="def-qft19-berezin"></a>

<!-- formal-statement-start -->
> **定義（Berezin積分と積分順序）**  
> 一つのGrassmann生成子 $u$ について、$u$ に依存しない係数 $a,b$ を用い、$u$ を左端に置いた $a+ub$ に対し

$$
\int du\,(a+ub)=b,\qquad \int du\,1=0,\qquad \int du\,u=1
$$

> とする。係数が別の奇生成子を含むときも、$u$ を左端へ反交換で移し、その**右にある係数を抽出する**。$n$ 組の積分順序は

$$
D(\bar\theta,\theta)
=d\bar\theta_n\,d\theta_n\cdots d\bar\theta_1\,d\theta_1
$$

> と固定し、右端から順に作用させる。この規約では

$$
\int D(\bar\theta,\theta)\,
\theta_1\bar\theta_1\cdots\theta_n\bar\theta_n=1.
$$
<!-- formal-statement-end -->

<!-- definition-example-start: def-qft19-berezin -->
### 例：積分順序を逆にすると負号が出る

**定義の確認**：一組なら右端の $d\theta$ から作用させて

$$
\int d\bar\theta\,d\theta\,\theta\bar\theta
=\int d\bar\theta\,\bar\theta=1.
$$

一方、$d\theta\,d\bar\theta$ の順では $\theta\bar\theta=-\bar\theta\theta$ と並べ替えるので結果は $-1$ です。順序を指定せずに「Grassmann積分は係数を取り出す」とだけ書くと、行列式の符号が決まりません。
<!-- definition-example-end -->

反交換する変数に二次式を作る際、$\bar\theta_i A_{ij}\theta_j$ は偶次数なので、異なる項同士は可換です。指数関数は有限次数で打ち切られる多項式になります。この性質が厳密な有限次元Gaussian積分を可能にします。

<a id="thm-qft19-berezin-det"></a>

<!-- formal-statement-start -->
> **定理（Berezin Gaussianの行列式公式）**  
> $A\in\mathbb C^{n\times n}$ を任意の複素行列とし、独立なGrassmann生成子 $\theta_i,\bar\theta_i$ に対して[積分順序](#def-qft19-berezin)を用いる。このとき

$$
\int D(\bar\theta,\theta)\,
\exp\!\left(-\sum_{i,j=1}^n\bar\theta_iA_{ij}\theta_j\right)
=\det A.
$$

> $A$ に正定値性は不要であり、行列が特異なら積分は零になる。
<!-- formal-statement-end -->

### 証明の見取り図

指数は高々 $n$ 次までしか残りません。積分に寄与するのは $\theta_i$ と $\bar\theta_i$ が全て一回ずつ現れる項だけです。$\bar\theta$ の各添字に異なる $\theta$ を割り当てる選び方は置換であり、反交換による符号がその置換の符号になります。

<!-- proof-start -->
### 証明

$X=-\sum_{ij}\bar\theta_iA_{ij}\theta_j$ とします。$X$ は生成子を二個ずつ含み、同じ生成子を二回含む項は零です。全 $2n$ 個の生成子を含むのは

$$
e^X=1+X+\frac{X^2}{2!}+\cdots+\frac{X^n}{n!}
$$

の最終項だけです。$n$ 個の偶次数因子は互いに交換できるため、$1/n!$ はそれらの並べ方 $n!$ 通りを消します。残るのは、各 $\bar\theta_i$ をちょうど一回使い、$\theta_{\sigma(i)}$ を重複なく選ぶ置換 $\sigma\in S_n$ の項です。

各項で反交換性から

$$
-\bar\theta_i A_{i,\sigma(i)}\theta_{\sigma(i)}
=A_{i,\sigma(i)}\theta_{\sigma(i)}\bar\theta_i
$$

と直せます。したがって選んだ $n$ 因子の積は、偶次数因子同士の並べ替えによる符号を伴わず、

$$
\left(\prod_{i=1}^n A_{i,\sigma(i)}\right)
\theta_{\sigma(1)}\bar\theta_1\cdots\theta_{\sigma(n)}\bar\theta_n
=\operatorname{sgn}(\sigma)
\left(\prod_{i=1}^n A_{i,\sigma(i)}\right)
\theta_1\bar\theta_1\cdots\theta_n\bar\theta_n
$$

となります。後半の符号は、$\bar\theta_i$ の位置を保って $\theta$ の割当を基準順へ戻すときの、[反交換する因子の入れ替え回数](../QFT9/index.md#thm-qft9-fermion-wick)で決まります。交換が偶数回なら正号、奇数回なら負号です。基準積の積分が1なので

$$
\int D(\bar\theta,\theta)e^X
=\sum_{\sigma\in S_n}\operatorname{sgn}(\sigma)
\prod_{i=1}^{n}A_{i,\sigma(i)}
=\det A.
$$

ここで対角項の符号は $-\bar\theta_iA_{ii}\theta_i=+A_{ii}\theta_i\bar\theta_i$ となることによって固定されています。
<!-- proof-end -->

### 例：二組で行列式の負項を見届ける

$A=\begin{pmatrix}a&b\\c&d\end{pmatrix}$ とします。対角選択の寄与は $ad\,\theta_1\bar\theta_1\theta_2\bar\theta_2$ です。非対角選択では二つの $\theta$ の割当が入れ替わり、$-bc\,\theta_1\bar\theta_1\theta_2\bar\theta_2$ となります。よって積分は $ad-bc$ です。積分が確率の期待値ではないので、負の行列式も許されます。

## 4. フェルミオンソースを足し、符号付き収縮を生成する

ボースの場合の $J_i$ は可換な実数でした。一方、Grassmann生成子へ線形に結合するソースは、指数を偶次数に保つためそれ自身も反交換する変数とします。$\eta_i,\bar\eta_i$ は $\theta,\bar\theta$ とも互いに反交換し、行列 $A$ の複素成分とは可換です。

<a id="def-qft19-fermion-source"></a>

<!-- formal-statement-start -->
> **定義（フェルミオン生成汎関数）**  
> $A\in\mathbb C^{n\times n}$ を可逆とし、$\theta_i,\bar\theta_i,\eta_i,\bar\eta_i$ を独立なGrassmann生成子とする。外部ソースを積分せず、$\theta,\bar\theta$ だけを[固定順序](#def-qft19-berezin)で積分する。フェルミオン生成汎関数とその規格化版を

$$
\begin{aligned}
Z_F(\bar\eta,\eta)
&=\int D(\bar\theta,\theta)
\exp(-\bar\theta A\theta+\bar\eta\theta+\bar\theta\eta),\\
\mathcal Z_F(\bar\eta,\eta)
&=\frac{Z_F(\bar\eta,\eta)}{Z_F(0,0)}
\end{aligned}
$$

> と定義する。積は行列積、例えば $\bar\eta\theta=\sum_i\bar\eta_i\theta_i$ とし、$\bar\eta$ と $\eta$ をこの順で記す。$Z_F(0,0)=\det A\ne0$ である。
<!-- formal-statement-end -->

<!-- definition-example-start: def-qft19-fermion-source -->
### 例：一組のソース積の符号を確認する

**定義の確認**：$n=1$、$A=(a)$、$a\ne0$ とすると

$$
Z_F(\bar\eta,\eta)
=\int d\bar\theta\,d\theta\,
e^{-a\bar\theta\theta+\bar\eta\theta+\bar\theta\eta}.
$$

指数は偶次数なので三因子の指数へ分けられます。$\theta\bar\theta$ の係数は $a$ と、ソースを二つ使う積

$$
(\bar\eta\theta)(\bar\theta\eta)
=\theta\bar\theta\,\bar\eta\eta
$$

から得る $\bar\eta\eta$ です。したがって $Z_F=a+\bar\eta\eta$、$\mathcal Z_F=1+a^{-1}\bar\eta\eta$ です。$\bar\eta\eta=-\eta\bar\eta$ なのでソースの順序を入れ替えれば係数の符号が変わります。
<!-- definition-example-end -->

<a id="thm-qft19-fermion-source"></a>

<!-- formal-statement-start -->
> **定理（フェルミオンGaussianのソース公式）**  
> 可逆な複素 $n$ 次正方行列 $A$ と独立なGrassmannソース $\eta,\bar\eta$ に対し、$G=A^{-1}$ とおく。[フェルミオン生成汎関数](#def-qft19-fermion-source)は

$$
Z_F(\bar\eta,\eta)=\det A\,
\exp(\bar\eta G\eta),\qquad
\mathcal Z_F(\bar\eta,\eta)=\exp(\bar\eta G\eta)
$$

> を満たす。ソース指数は高々 $n$ 次で打ち切られる有限多項式である。
<!-- formal-statement-end -->

### 証明の見取り図

ボースの平方完成と同様に $\theta$ と $\bar\theta$ を別々に平行移動します。Grassmann変数では積の順序を変えないこと、Berezin積分が奇定数による平行移動で不変であることを確かめます。

<!-- proof-start -->
### 証明

$G=A^{-1}$ とし、次の積を展開します。

$$
\begin{aligned}
&-(\bar\theta-\bar\eta G)A(\theta-G\eta)
+\bar\eta G\eta\\
&=-\bar\theta A\theta+\bar\theta AG\eta
+\bar\eta GA\theta-\bar\eta GAG\eta+\bar\eta G\eta\\
&=-\bar\theta A\theta+\bar\theta\eta+\bar\eta\theta.
\end{aligned}
$$

並べ替えは不要で、$AG=GA=I_n$ と $GAG=G$ だけを使いました。Grassmann変数の平行移動 $\theta'=\theta-G\eta$、$\bar\theta'=\bar\theta-\bar\eta G$ は、最高次数の係数を変えません。例えば一変数で $f(\theta+c)$ の $\theta$ の係数は $f(\theta)$ と同じであり、複数変数でも一変数ずつこれを適用できます。従って積分は

$$
\begin{aligned}
Z_F(\bar\eta,\eta)
&=e^{\bar\eta G\eta}
\int D(\bar\theta',\theta')e^{-\bar\theta'A\theta'}\\
&=e^{\bar\eta G\eta}\det A.
\end{aligned}
$$

最後に[Berezin Gaussianの行列式公式](#thm-qft19-berezin-det)を使いました。可逆性は $G$ と規格化 $\mathcal Z_F$ を定義するために必要です。
<!-- proof-end -->

生成汎関数を実際の収縮に戻しましょう。ソース微分には左右の規約の問題があるため、ここでは挿入するGrassmann変数の**積の順序そのもの**を固定して、有限次元積分の式として結果を述べます。

<a id="prop-qft19-fermion-wick"></a>

<!-- formal-statement-start -->
> **命題（フェルミオンの二点・四点収縮）**  
> 可逆な $A\in\mathbb C^{n\times n}$、$G=A^{-1}$、[Berezin積分](#def-qft19-berezin)の順序を用い、Grassmann偶多項式 $F$ の規格化積分を

$$
\langle F\rangle_F
=\frac{1}{\det A}\int D(\bar\theta,\theta)\,
F(\theta,\bar\theta)e^{-\bar\theta A\theta}
$$

> とする。このとき

$$
\begin{aligned}
\langle\theta_i\bar\theta_j\rangle_F&=G_{ij},\\
\langle\theta_i\bar\theta_j\theta_k\bar\theta_l\rangle_F
&=G_{ij}G_{kl}-G_{il}G_{kj}.
\end{aligned}
$$

> 一般に $r$ 組をこの順で並べた積の期待値は $\det(G_{i_a j_b})_{a,b=1}^{r}$ であり、同種生成子だけの積は零である。
<!-- formal-statement-end -->

### 証明の見取り図

行列 $A_{ji}$ を微分すると、指数の中の $-\bar\theta_j\theta_i$ から $+\theta_i\bar\theta_j$ が現れます。行列式を微分した式と照合することで、符号を推測せずに二点・四点の公式を得ます。一般の場合は異なる行・列を選ぶ小行列式になります。

<!-- proof-start -->
### 証明

以下、$\partial/\partial A_{ji}$ は、複素行列の各成分 $A_{uv}$ を独立な変数として、他の成分を固定する多項式（可逆行列上では有理式）の微分です。$e_j$ を標準基底の第 $j$ 列ベクトル、$E_{ji}=e_je_i^T$ を $(j,i)$ 成分だけが $1$ の行列とします。

[Berezin Gaussianの行列式公式](#thm-qft19-berezin-det)を $A_{ji}$ で微分すると、有限多項式の微分と積分は交換でき、

$$
\frac{\partial}{\partial A_{ji}}\det A
=\int D(\bar\theta,\theta)\,
(-\bar\theta_j\theta_i)e^{-\bar\theta A\theta}
=\int D(\bar\theta,\theta)\,
\theta_i\bar\theta_j e^{-\bar\theta A\theta}.
$$

一方、$G=A^{-1}$ を用いて $A+tE_{ji}=A(I+tGe_je_i^T)$ と因数分解します。行列式の列に関する多重線形性から $\det(I+tuv^T)=1+t\,v^Tu$ なので、

$$
\det(A+tE_{ji})=(\det A)(1+tG_{ij}),
\qquad
\frac{\partial\det A}{\partial A_{ji}}=(\det A)G_{ij}.
$$

積分側と比較して二点式を得ます。逆行列の微分は $AG=I$ を $A_{ji}$ で微分して

$$
\frac{\partial G_{ab}}{\partial A_{ji}}
=-\sum_{u,v}G_{au}(E_{ji})_{uv}G_{vb}
=-G_{aj}G_{ib}.
$$

従って二点式の非規格化版をさらに $A_{lk}$ で微分すると

$$
\begin{aligned}
\frac{\partial^2\det A}
{\partial A_{ji}\partial A_{lk}}
&=\frac{\partial}{\partial A_{lk}}
\bigl[(\det A)G_{ij}\bigr]\\
&=(\det A)\bigl[G_{kl}G_{ij}-G_{il}G_{kj}\bigr].
\end{aligned}
$$

積分側では二つの偶次数因子 $\theta_i\bar\theta_j$ と $\theta_k\bar\theta_l$ が現れるので、この順で並べた四点式です。

一般の $r$ 組も出発点から確かめます。添字列 $I=(i_1,\ldots,i_r)$ と $K=(j_1,\ldots,j_r)$ を固定し、列ベクトルを並べた行列 $U,V$ と対角行列 $T$ を

$$
U=(e_{j_1},\ldots,e_{j_r}),\qquad
V=(e_{i_1},\ldots,e_{i_r}),\qquad
T=\operatorname{diag}(t_1,\ldots,t_r)
$$

と置きます。$t_a$ は互いに独立な可換な補助変数です。次のブロック行列を二通りの順序で消去すると

$$
\begin{aligned}
\det\begin{pmatrix}A&U\\-TV^T&I_r\end{pmatrix}
&=\det(A+UTV^T)\\
&=(\det A)\det(I_r+TV^TGU)
\end{aligned}
$$

を得ます（最初は右下の $I_r$、次は左上の可逆な $A$ を使う）。ここで $UTV^T=\sum_a t_aE_{j_ai_a}$、$(V^TGU)_{ab}=G_{i_aj_b}$ です。右辺で $t_1\cdots t_r$ を含むには、行列式の各行から $t_a(V^TGU)_{ab}$ 側を選ぶしかないので、その係数は

$$
[t_1\cdots t_r]\det(A+UTV^T)
=(\det A)\det(G_{i_aj_b})_{a,b=1}^r.
$$

一方、左辺の同じ係数は、$A_{j_ai_a}$ について $r$ 回微分した値です。積分表示を各回微分すると偶次数の $\theta_{i_a}\bar\theta_{j_a}$ がこの順で挿入されるため、

$$
[t_1\cdots t_r]\det(A+UTV^T)
=\int D(\bar\theta,\theta)\,
\left(\prod_{a=1}^r\theta_{i_a}\bar\theta_{j_a}\right)e^{-\bar\theta A\theta}.
$$

二つの係数を等置し、$\det A\ne0$ で割ると一般の行列式公式が従います。添字が重複する場合も、左辺のGrassmann積は零、右辺の行列式は同じ行または列を持つため零です。同種生成子だけの積も、積分で必要な $\theta$・$\bar\theta$ の個数が釣り合わないので零になります。これが[QFT9のフェルミオンWick符号](../QFT9/index.md#thm-qft9-fermion-wick)の有限次元版です。
<!-- proof-end -->

### 例：二組で符号の違いを測る

$A=\begin{pmatrix}2&1\\1&2\end{pmatrix}$ なら $\det A=3$、

$$
G=A^{-1}=\frac13\begin{pmatrix}2&-1\\-1&2\end{pmatrix}.
$$

フェルミオンの四点積は

$$
\langle\theta_1\bar\theta_1\theta_2\bar\theta_2\rangle_F
=\frac{2}{3}\frac{2}{3}
-\left(-\frac13\right)\left(-\frac13\right)
=\frac13.
$$

一方、同じ $A$ を実Gaussian重みとして使うと、[ボースGaussianのWick対合公式](#thm-qft19-boson-wick)では $\langle x_1^2x_2^2\rangle_B=4/9+2/9=2/3$ です。同じ逆行列から出発しても、交換か反交換かで四点関数の組合せが異なります。

## 5. 有限格子から場の生成汎関数へ

有限個の格子点 $x_1,\ldots,x_N$ に実変数 $\phi_a$ を一つずつ割り当て、差分で離散化した正定値二次形式を考えます。この $\phi_a$ は連続場 $\phi(x)$ の近似値であり、$a$ は時空の添字でなく**格子点の番号**です。ソース $J_a$ は積分測度の格子重みを含むように取ります。

<a id="def-qft19-lattice-functional"></a>

<!-- formal-statement-start -->
> **定義（有限格子からの形式的場の生成汎関数）**  
> 有限個 $N$ の格子点における実場値を $\phi\in\mathbb R^N$、実対称正定値の離散作用行列を $A_N$、ソースを $J_N\in\mathbb R^N$ とする。規格化した有限格子のEuclid生成汎関数を

$$
\mathcal Z_{E,N}[J_N]
=\frac{\int_{\mathbb R^N}
e^{-\frac12\phi^TA_N\phi+J_N^T\phi}\,d^N\phi}
{\int_{\mathbb R^N}e^{-\frac12\phi^TA_N\phi}\,d^N\phi}
$$

> と定義する。さらに格子幅 $h\downarrow0$ と体積拡大などの極限でこの式が適切に収束するとき、その極限を連続場の生成汎関数と呼ぶ。極限の存在を仮定せず記号 $\int\mathcal D\phi$ を書くだけの場合は**形式的経路積分**と呼び、有限次元の通常積分とは区別する。
<!-- formal-statement-end -->

<!-- definition-example-start: def-qft19-lattice-functional -->
### 例：格子二点の差分エネルギー

**定義の確認**：二点の値 $\phi_1,\phi_2$ と $m>0$ に対し

$$
\frac12(\phi_1-\phi_2)^2+\frac{m^2}{2}(\phi_1^2+\phi_2^2)
=\frac12\phi^TA_2\phi,
\quad
A_2=\begin{pmatrix}1+m^2&-1\\-1&1+m^2\end{pmatrix}.
$$

$\phi^TA_2\phi=(\phi_1-\phi_2)^2+m^2(\phi_1^2+\phi_2^2)>0$（$\phi\ne0$）なので正定値です。$m=0$ なら $\phi_1=\phi_2\ne0$ で二次形式が零となる**零モード**があり、定義の有限積分は発散します。連続極限より前に、有限格子での収束条件を検査する必要があります。
<!-- definition-example-end -->

<a id="prop-qft19-lattice-covariance"></a>

<!-- formal-statement-start -->
> **命題（有限格子の二点関数と形式的連続核）**  
> 実対称正定値 $A_N$ を持つ有限格子のEuclid生成汎関数について $G_N=A_N^{-1}$ とすると

$$
\mathcal Z_{E,N}[J_N]
=\exp\!\left(\frac12J_N^TG_NJ_N\right),
\qquad
\langle\phi_a\phi_b\rangle_{E,N}=(G_N)_{ab}.
$$

> 格子点間の関数 $G_N$ とソースの離散双線形形式が、指定した試験関数に対して連続核 $G_E(x,y)$ と二重積分へ収束する場合に限り、形式的に

$$
\mathcal Z_E[j]
=\exp\!\left(\frac12\int d^dx\,d^dy\,
j(x)G_E(x,y)j(y)\right)
$$

> と記せる。この結論は極限の存在や反射陽性を一般に保証しない。
<!-- formal-statement-end -->

### 証明の見取り図

有限格子では[有限次元Gaussian生成公式](#thm-qft19-gaussian)の $x,A,J$ を $\phi,A_N,J_N$ に置き換えるだけです。連続核への移行では何が収束するかを、形式的な測度ではなく、ソースを入れた二次形式と試験関数の評価で指定します。

<!-- proof-start -->
### 証明

$A_N$ は正定値なので[有限次元Gaussian生成公式](#thm-qft19-gaussian)を $n=N$ として適用でき、規格化定数 $(2\pi)^{N/2}/\sqrt{\det A_N}$ が分子・分母で消えます。$J_{N,a}$ と $J_{N,b}$ の微分を零ソースで評価すると $(G_N)_{ab}$ です。

例えばセル体積 $h^d$ を持つ格子点 $x_a$ で $J_{N,a}=h^d j(x_a)$ と置き、離散Green行列と二重和が適切な意味で収束するなら

$$
\frac12J_N^TG_NJ_N
=\frac12\sum_{a,b}h^{2d}j(x_a)(G_N)_{ab}j(x_b)
\longrightarrow
\frac12\int d^dx\,d^dy\,j(x)G_E(x,y)j(y).
$$

ここで $A_N$ の格子重みは、逆行列 $G_N$ が連続核の値へ対応するよう選ぶ必要があります。右辺の存在・境界条件・紫外極限の可否は別途検証が必要で、有限次元の式だけからは従いません。
<!-- proof-end -->

フェルミオンの有限格子でも、複素行列 $D_N$ が可逆であれば[フェルミオンGaussianのソース公式](#thm-qft19-fermion-source)により規格化生成汎関数は $\exp(\bar\eta D_N^{-1}\eta)$ です。ボースの $\det(A_N)^{-1/2}$ に対してフェルミオンは $\det D_N$ が現れます。ゲージ対称性などのため二次形式に零モードがある場合には、先にその非可逆方向の扱いを決めなければ、正定値Gaussian公式を適用できません。

また、Minkowski時空で形式的に書く $e^{iS}$ は一般に絶対可積分な正の重みではありません。[QFT6のFeynman二点関数](../QFT6/index.md#def-qft6-feynman-two-point)に対応する極の処方や、Euclid化できる条件を別途指定する必要があります。ここで構成したのは**有限次元で正確に計算できる代数的な橋**であり、無限次元測度の存在・Wick回転・相互作用理論の非摂動構成を一度に証明するものではありません。

## 6. 演習

### 演習 QFT19-A1：対角Gaussianのソース

- Level: A
- 問題：$A=\operatorname{diag}(2,3)$、$J=(s,t)^T$ とする。$\mathcal Z_B(J)$ と $\langle x_1^2\rangle_B$、$\langle x_2^2\rangle_B$、$\langle x_1x_2\rangle_B$ を求めよ。

<!-- solution-start -->
**詳細解答**

$A$ の固有値は正なので[有限次元Gaussian生成公式](#thm-qft19-gaussian)を使えます。$G=\operatorname{diag}(1/2,1/3)$ から

$$
\frac12J^TGJ=\frac{s^2}{4}+\frac{t^2}{6},
\qquad
\mathcal Z_B(s,t)=e^{s^2/4+t^2/6}.
$$

各二階微分を $s=t=0$ で評価すると

$$
\langle x_1^2\rangle_B=\frac12,\quad
\langle x_2^2\rangle_B=\frac13,\quad
\langle x_1x_2\rangle_B=0.
$$

最後の零は独立性を言葉だけで仮定したのではなく、逆行列の非対角成分 $G_{12}=0$ を計算して確かめた結果です。
<!-- solution-end -->

### 演習 QFT19-A2：四個の同じボース変数

- Level: A
- 問題：$a>0$ とし、規格化重み $e^{-ax^2/2}$ の下で $\langle x^3\rangle_B$ と $\langle x^4\rangle_B$ を求めよ。四点の係数3の出所を説明せよ。

<!-- solution-start -->
**詳細解答**

[有限次元Gaussian生成公式](#thm-qft19-gaussian)は $\mathcal Z_B(J)=e^{J^2/(2a)}$ です。この指数は $J$ の偶関数だから三階微分の零での値は0です。四階微分は展開

$$
e^{J^2/(2a)}
=1+\frac{J^2}{2a}+\frac{J^4}{8a^2}+O(J^6)
$$

の $J^4$ 係数を $4!$ 倍するので

$$
\langle x^3\rangle_B=0,\qquad
\langle x^4\rangle_B=\frac{4!}{8a^2}=\frac3{a^2}.
$$

別解として[Wick対合公式](#thm-qft19-boson-wick)で四つの位置の対合 $(12)(34),(13)(24),(14)(23)$ が三つあり、各項は $1/a^2$ です。
<!-- solution-end -->

### 演習 QFT19-A3：Berezin積分の順序

- Level: A
- 問題：二つのGrassmann生成子 $\theta,\bar\theta$ に対し $f=\alpha+\beta\theta+\gamma\bar\theta+\delta\theta\bar\theta$ とする。$\int d\bar\theta\,d\theta\,f$ と $\int d\theta\,d\bar\theta\,f$ を求めよ。係数は複素数とする。

<!-- solution-start -->
**詳細解答**

[Berezin積分の定義](#def-qft19-berezin)では右端の積分記号から作用させ、対象の生成子を左へ移して右係数を取り出します。最初の順序なら

$$
\int d\theta\,f=\beta+\delta\bar\theta,\qquad
\int d\bar\theta\,(\beta+\delta\bar\theta)=\delta.
$$

逆順では $\delta\theta\bar\theta=-\delta\bar\theta\theta$ なので

$$
\int d\bar\theta\,f=\gamma-\delta\theta,\qquad
\int d\theta\,(\gamma-\delta\theta)=-\delta.
$$

符号が変わるのは変数の順序を一回交換したためです。
<!-- solution-end -->

### 演習 QFT19-A4：二組のGrassmann Gaussian

- Level: A
- 問題：$A=\begin{pmatrix}2&1\\1&2\end{pmatrix}$ とし、[QFT19の積分順序](#def-qft19-berezin)で $\int D(\bar\theta,\theta)e^{-\bar\theta A\theta}$ を計算せよ。非対角項の符号も示せ。

<!-- solution-start -->
**詳細解答**

指数の二次式を $X=-2\bar\theta_1\theta_1-\bar\theta_1\theta_2-\bar\theta_2\theta_1-2\bar\theta_2\theta_2$ と置きます。積分に残るのは $X^2/2$ のうち全四生成子を含む項です。対角の二項を選ぶと

$$
(-2\bar\theta_1\theta_1)(-2\bar\theta_2\theta_2)
=4\theta_1\bar\theta_1\theta_2\bar\theta_2.
$$

非対角の二項を選ぶと $\theta_1,\theta_2$ の割当が逆転して

$$
(-\bar\theta_1\theta_2)(-\bar\theta_2\theta_1)
=-\theta_1\bar\theta_1\theta_2\bar\theta_2.
$$

偶次数の二項は交換でき、$2!$ が二通りの積順序を相殺します。したがって積分は $4-1=3=\det A$ です。[Berezin Gaussianの行列式公式](#thm-qft19-berezin-det)とも一致します。
<!-- solution-end -->

### 演習 QFT19-A5：一組のフェルミオンソース

- Level: A
- 問題：$a\in\mathbb C\setminus\{0\}$ とし、$\int d\bar\theta\,d\theta\,e^{-a\bar\theta\theta+\bar\eta\theta+\bar\theta\eta}$ を計算せよ。$\bar\eta\eta$ を $\eta\bar\eta$ に並べ替えた場合の符号も答えよ。

<!-- solution-start -->
**詳細解答**

全ての指数の二次単項式は偶次数で相互に可換です。したがって積分に必要な $\theta\bar\theta$ の係数だけを取ると

$$
-a\bar\theta\theta=a\theta\bar\theta,\qquad
(\bar\eta\theta)(\bar\theta\eta)
=\theta\bar\theta\,\bar\eta\eta.
$$

それ以外のソースだけの一次項は $\theta$ と $\bar\theta$ を両方含まないので積分で消えます。結果は

$$
Z_F=a+\bar\eta\eta
=a\left(1+\frac{\bar\eta\eta}{a}\right)
=a\,e^{\bar\eta\eta/a}.
$$

ここで $(\bar\eta\eta)^2=0$ です。$\bar\eta\eta=-\eta\bar\eta$ のため、逆順で表せば係数は $-\eta\bar\eta$ となります。
<!-- solution-end -->

### 演習 QFT19-B1：相関した二変数Gaussian

- Level: B
- 問題：$A=\begin{pmatrix}2&-1\\-1&2\end{pmatrix}$ とし、$\langle x_1x_2\rangle_B$、$\langle x_1^2x_2^2\rangle_B$ を求めよ。$A$ の正定値性と四点の三つの対合を明示せよ。

<!-- solution-start -->
**詳細解答**

固有値は $1,3$（固有ベクトル方向 $(1,1)$ と $(1,-1)$）なので正定値です。逆行列は

$$
G=\frac13\begin{pmatrix}2&1\\1&2\end{pmatrix}.
$$

したがって[二点公式](#thm-qft19-gaussian)から $\langle x_1x_2\rangle_B=G_{12}=1/3$ です。四点では添字の順を $1,1,2,2$ として[Wick対合公式](#thm-qft19-boson-wick)を適用し、

$$
\begin{aligned}
\langle x_1^2x_2^2\rangle_B
&=G_{11}G_{22}+G_{12}G_{12}+G_{12}G_{12}\\
&=\frac49+\frac19+\frac19=\frac23.
\end{aligned}
$$

異なる位置を結ぶ二通りを落とすと $2/3$ は得られません。
<!-- solution-end -->

### 演習 QFT19-B2：零モードと正則化

- Level: B
- 問題：$A_0=\operatorname{diag}(1,0)$ を持つ二変数の実二次形式が規格化できない理由を示せ。$\varepsilon>0$ に対し $A_\varepsilon=\operatorname{diag}(1,\varepsilon)$ と置き、$Z_{B,\varepsilon}(0)$、$\langle x_2^2\rangle_{B,\varepsilon}$、$\mathcal Z_{B,\varepsilon}(J_1,J_2)$ と $\varepsilon\downarrow0$ の振る舞いを求めよ。

<!-- solution-start -->
**詳細解答**

$A_0$ では指数が $x_2$ に依存しないので、$x_2$ 方向の $\int_{\mathbb R}dx_2$ が無限大です。[Gaussian積分の定義](#def-qft19-gaussian-weight)の分母が有限でなく、期待値を定義できません。

$A_\varepsilon$ の固有値は $1,\varepsilon>0$ なので[生成公式](#thm-qft19-gaussian)を適用できます。

$$
\begin{aligned}
Z_{B,\varepsilon}(0)&=\frac{2\pi}{\sqrt\varepsilon},\\
G_\varepsilon&=\operatorname{diag}(1,\varepsilon^{-1}),\\
\langle x_2^2\rangle_{B,\varepsilon}&=\varepsilon^{-1},\\
\mathcal Z_{B,\varepsilon}(J_1,J_2)
&=\exp\!\left(\frac{J_1^2}{2}+\frac{J_2^2}{2\varepsilon}\right).
\end{aligned}
$$

$\varepsilon\downarrow0$ で規格化定数と第二成分の分散は発散し、固定 $J_2\ne0$ ではソース付き比も発散します。$\mathcal Z(0)=1$ という一点だけでは極限の生成汎関数が存在するとはいえません。
<!-- solution-end -->

### 演習 QFT19-B3：フェルミオン四点と逆行列

- Level: B
- 問題：$A=\begin{pmatrix}2&1\\1&2\end{pmatrix}$ に対して $\langle\theta_1\bar\theta_1\theta_2\bar\theta_2\rangle_F$ を (i) 積分の直接計算と (ii) 二点収縮の二項から求め、比較せよ。

<!-- solution-start -->
**詳細解答**

まず[Berezin Gaussianの行列式公式](#thm-qft19-berezin-det)より分母は $\det A=3$ です。積 $\theta_1\bar\theta_1\theta_2\bar\theta_2$ は既に全生成子を含むので、指数を掛けても定数項 $1$ 以外は重複生成子によって零になります。従って分子は1、期待値は $1/3$ です。

他方、$G=A^{-1}=\frac13\begin{pmatrix}2&-1\\-1&2\end{pmatrix}$ なので[四点収縮の命題](#prop-qft19-fermion-wick)から

$$
G_{11}G_{22}-G_{12}G_{21}
=\frac49-\frac19=\frac13.
$$

二通りの方法が一致します。ボース型なら二つの交差対合も正号になるため、これと異なる値です。
<!-- solution-end -->

### 演習 QFT19-B4：ソースを入れた平均と連結二点

- Level: B
- 問題：実対称正定値 $A$、$G=A^{-1}$ に対し、ソース $J$ の下での規格化平均 $\langle F\rangle_J=Z_B(J)^{-1}\int F(x)e^{-x^TAx/2+J^Tx}\,d^nx$ を考える。$\mu_i=\langle x_i\rangle_J$ と $\langle x_ix_j\rangle_J-\mu_i\mu_j$ を求め、$\log Z_B(J)$ の二階微分と比較せよ。

<!-- solution-start -->
**詳細解答**

[有限次元Gaussian生成公式](#thm-qft19-gaussian)から $\log Z_B(J)=\log Z_B(0)+J^TGJ/2$ です。$Z_B(J)$ を一階微分して $Z_B(J)$ で割ると

$$
\mu_i=\partial_{J_i}\log Z_B(J)=(GJ)_i.
$$

さらに $Z_B$ の二階微分を割った値は

$$
\langle x_ix_j\rangle_J=G_{ij}+(GJ)_i(GJ)_j.
$$

したがって

$$
\langle x_ix_j\rangle_J-\mu_i\mu_j=G_{ij}
=\partial_{J_i}\partial_{J_j}\log Z_B(J).
$$

単なる二点関数と、平均の積を引いた[連結二点関数](#def-qft19-connected-two-point)が異なることを、$J\ne0$ の例でも確かめられました。[QFT9の真空bubble規格化](../QFT9/index.md#prop-qft9-vacuum-bubbles)とも、規格化で切り離される寄与を意識する点で接続します。
<!-- solution-end -->

### 演習 QFT19-C1：四次相互作用と真空規格化の相殺

- Level: C
- 問題：$A=\begin{pmatrix}2&-1\\-1&2\end{pmatrix}$ とする。$\lambda\ge0$ に対し

$$
Z_\lambda=\int_{\mathbb R^2}
\exp\!\left(-\frac12x^TAx-\frac{\lambda}{4!}x_1^4\right)d^2x,\quad
\langle F\rangle_\lambda=\frac1{Z_\lambda}
\int_{\mathbb R^2}F(x)
e^{-x^TAx/2-\lambda x_1^4/4!}d^2x
$$

  と定める。$\lambda\downarrow0$ の一次まで、(i) $Z_\lambda/Z_0$、(ii) $\langle x_2^2\rangle_\lambda$ を求めよ。後者について、分母に由来する項がどの収縮を相殺するかを説明せよ。

<!-- solution-start -->
**詳細解答**

$A$ の固有値は $1,3$ で正定値、$G=A^{-1}=\frac13\begin{pmatrix}2&1\\1&2\end{pmatrix}$ です。$\lambda\ge0$ なら四次項も減衰を強めるので積分は有限です。$\lambda=0$ でのGaussian期待値を $\langle\cdot\rangle_0$ と書きます。

**(i)** 指数を一次展開して

$$
\frac{Z_\lambda}{Z_0}
=1-\frac{\lambda}{24}\langle x_1^4\rangle_0+O(\lambda^2).
$$

[ボースGaussianのWick対合公式](#thm-qft19-boson-wick)から $\langle x_1^4\rangle_0=3G_{11}^2=3(2/3)^2=4/3$ なので

$$
\frac{Z_\lambda}{Z_0}=1-\frac{\lambda}{18}+O(\lambda^2).
$$

**(ii)** 分子にも同じ展開を使い、分母の逆数を $(1-\lambda a)^{-1}=1+\lambda a+O(\lambda^2)$ と展開すると

$$
\begin{aligned}
\langle x_2^2\rangle_\lambda
&=\frac{\langle x_2^2\rangle_0-\frac{\lambda}{24}
\langle x_2^2x_1^4\rangle_0+O(\lambda^2)}
{1-\frac{\lambda}{24}\langle x_1^4\rangle_0+O(\lambda^2)}\\
&=G_{22}-\frac{\lambda}{24}
\bigl[\langle x_2^2x_1^4\rangle_0-G_{22}\langle x_1^4\rangle_0\bigr]
+O(\lambda^2).
\end{aligned}
$$

六つの位置の完全対合を分類します。二つの $x_2$ が互いに組になり、残り四つの $x_1$ が三通りで組になる寄与は $3G_{22}G_{11}^2$ です。二つの $x_2$ がそれぞれ別の $x_1$ と組になる場合は $4\cdot3=12$ 通りで、残り二つの $x_1$ が一組となるので $12G_{21}^2G_{11}$ です。したがって

$$
\begin{aligned}
\langle x_2^2x_1^4\rangle_0
&=3G_{22}G_{11}^2+12G_{21}^2G_{11},\\
\langle x_2^2x_1^4\rangle_0
-G_{22}\langle x_1^4\rangle_0
&=12G_{21}^2G_{11}.
\end{aligned}
$$

最初の $3G_{22}G_{11}^2$ は外部の $x_2$ と離れて閉じた四次頂点の寄与であり、分母からの項と相殺されます。[QFT9の真空bubble相殺](../QFT9/index.md#prop-qft9-vacuum-bubbles)の有限次元での直接計算です。残るのは

$$
\boxed{
\langle x_2^2\rangle_\lambda
=\frac23-\frac{\lambda}{2}\left(\frac13\right)^2
\left(\frac23\right)+O(\lambda^2)
=\frac23-\frac{\lambda}{27}+O(\lambda^2).
}
$$

最後の中間式の二つの括弧はそれぞれ $G_{21}$ と $G_{11}$ 由来です。$O(\lambda^2)$ は $\lambda\downarrow0$ の片側漸近で、二次のTaylor剰余は $x_1^8$ などの有限Gaussianモーメントによって支配できます。$\lambda<0$ への積分の延長は発散するため、無条件の両側展開とはしません。
<!-- solution-end -->

## 7. まとめ

- 実対称正定値行列 $A$ のGaussian生成汎関数は $\exp(J^TA^{-1}J/2)$ で、多点関数は**正符号の全対合**から得られます。
- Grassmann生成子は反交換し、Berezin積分は指定順序の係数抽出です。有限次元のフェルミオンGaussian積分は $\det A$、ソース付きの規格化版は $\exp(\bar\eta A^{-1}\eta)$ となります。
- フェルミオン四点関数には置換の負号が現れます。この有限次元の符号計算が、[QFT9のフェルミオンWickの定理](../QFT9/index.md#thm-qft9-fermion-wick)の組合せを支えます。
- 格子の有限次元積分は厳密ですが、連続極限とMinkowskiの経路積分は別の数学的問題です。生成汎関数を導入した次は、連結関数・有効作用と、ループで現れる発散を具体的に扱えるようになります。
