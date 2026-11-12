# AQFT12 Reeh–Schlieder定理

[AQFT11の正エネルギー行列要素の一意性](../AQFT11/index.md#thm-aqft11-real-open-unique)では、実時空の開集合で消える行列要素が全時空で消えることを証明しました。しかし「行列要素が零になる」と「小さい領域の観測量が真空から全Hilbert空間を稠密に生成する」の間には、まだ橋が必要です。

本講では、**局所で真空に作用できる演算子が、なぜ大域の状態ベクトルを近似できるのか**を問います。答えは、正エネルギーに由来する解析的一意性と、局所演算子を全並進させたときの代数的生成条件を組み合わせることにあります。これが **Reeh–Schlieder定理** の一つの厳密な形です。

舞台は四次元Minkowski時空（計量符号 $(-,+,+,+)$）の有界なdouble coneです。内積は第2変数線形とします。[AQFT2の局所net](../AQFT2/index.md#def-aqft2-locality)と[AQFT9の局所von Neumann環](../AQFT9/index.md#def-aqft9-local-vn-net)を用い、真空の一意性、Haag双対性、局所von Neumann環の型などは仮定しません。

## 1. 全域で巡回的であることと局所で巡回的であること

全域の可観測代数について真空が巡回的でも、局所的に許される演算子の種類は少なくなります。[OA5の巡回ベクトルの定義](../../OA/OA5/index.md#def-oa5-star-representation)では、表現の像を真空に作用させた集合の閉包を考えました。ここでは同じ条件を、より小さい作用素環の包含表現に適用します。[OA5のGNS構成](../../OA/OA5/index.md#thm-oa5-gns)が与えるのは全域の巡回性であり、個々の小領域についてではありません。

複素Hilbert空間 $\mathcal H$ の単位ベクトル $\Omega$、単位元を含む作用素環 $\mathcal N\subset B(\mathcal H)$ を考えます。ここで $\mathcal N\Omega=\{A\Omega:A\in\mathcal N\}$ は線形部分空間です。なぜなら、$A,B\in\mathcal N$ と $\lambda,\mu\in\mathbb C$ に対し $(\lambda A+\mu B)\Omega=\lambda A\Omega+\mu B\Omega$ だからです。

<a id="def-aqft12-cyclic-vector"></a>

<!-- formal-statement-start -->
> **定義（作用素環に対する巡回ベクトルと局所巡回性）**  
> $\mathcal H$ を複素Hilbert空間、$\mathcal N\subset B(\mathcal H)$ を単位的な作用素環とする。ベクトル $\Omega\in\mathcal H$ が $\mathcal N$ に対して **巡回的** であるとは、
>
$$
\overline{\mathcal N\Omega}^{\,\|\cdot\|}=\mathcal H
$$
>
> が成り立つことをいう。[AQFT9で定義した局所von Neumann環](../AQFT9/index.md#def-aqft9-local-vn-net) $\mathcal M(O)$ に対してこの等式が成立する場合、$\Omega$ は領域 $O$ で **局所巡回的** であるという。全域環 $\mathcal M:=\pi(\mathfrak A)''$ に対する巡回性と、各 $\mathcal M(O)$ に対する局所巡回性は別の条件である。
<!-- formal-statement-end -->

<!-- definition-example-start: def-aqft12-cyclic-vector -->
### 直接例：二次元でも局所巡回性は自動ではない

$\mathcal H=\mathbb C^2$、$\Omega=(1,1)/\sqrt2$ とし、$D=\{\operatorname{diag}(a,b):a,b\in\mathbb C\}$ と置きます。基底は標準正規直交基底です。すると

$$
\operatorname{diag}(a,b)\Omega=(a,b)/\sqrt2.
$$

$a,b$ は独立に動けるので $D\Omega=\mathbb C^2$ です。一方、$\mathcal N=\mathbb CI_2$ なら $\mathcal N\Omega=\mathbb C\Omega$ は一次元で、例えば $(1,-1)/\sqrt2$ に直交します。したがって同じ $\Omega$ でも $D$ には巡回的、$\mathbb CI_2$ には巡回的ではありません。

**定義の確認**。前者では任意の目標ベクトル $(u,v)$ を $A=\operatorname{diag}(\sqrt2u,\sqrt2v)$ で厳密に作れ、後者では $\Omega$ に直交する非零ベクトルが存在するので閉包も全空間ではありません。
<!-- definition-example-end -->

局所巡回性は、局所演算子を使って遠方の測定結果を**任意に操作できる**という主張ではありません。$A\Omega$ の近似で用いる演算子のノルムや成功確率を制御するとは言っておらず、[Einstein局所性](../AQFT2/index.md#def-aqft2-locality)とも矛盾しません。

## 2. 小領域の全並進がどれだけの演算子を生むか

開集合 $O$ の内部に、閉包が $O$ に含まれる小さいdouble cone $Q$ を選びます。記号 $Q\Subset O$ は $\overline Q$ がコンパクトで、$\overline Q\subset O$ という意味です。[AQFT9の共変性](../AQFT9/index.md#prop-aqft9-vn-covariance)により、平行移動 $x\in\mathbb R^4$ に対して

$$
\alpha_x(A):=U(x)AU(-x),\qquad
\alpha_x(\mathcal M(Q))=\mathcal M(Q+x)
$$

と書けます。ここで $U(x)$ は真空を固定する強連続ユニタリ表現です。

小さい $Q$ を一度選んだ後、その全ての平行移動に属する演算子を積み重ねても、全域環に達するとは限りません。これを区別するため、全並進が生成する環について次の条件を導入します。

<a id="def-aqft12-weak-additivity"></a>

<!-- formal-statement-start -->
> **定義（弱加法性）**  
> $O\mapsto\mathcal M(O)\subset B(\mathcal H)$ を共変で包含単調な単位的局所von Neumann net、$\mathcal M=\pi(\mathfrak A)''$ をその全域環とする。任意の非空な有界double cone $Q$ について
>
$$
\left(\bigcup_{x\in\mathbb R^4}\mathcal M(Q+x)\right)''
=\mathcal M
$$
>
> が成り立つとき、このnetは **弱加法的** であるという。左辺の二重可換子は、すべての平行移動された局所von Neumann環が生成する最小のvon Neumann環を表す。単一の指定した $Q$ でだけ成立するときは、その $Q$ に関する生成条件という。
<!-- formal-statement-end -->

**なぜ二重可換子なのか。** 異なる領域の演算子を積にした $A_1\cdots A_n$ も必要です。まずそれらの有限線形結合を取り、さらに[VN2の二重可換子定理](../../VN/VN2/index.md#thm-vn2-bicommutant)による強作用素閉包を取ると、上の左辺になります。元の[AQFT3の加法性](../AQFT3/index.md#def-aqft3-additivity)は領域の被覆による局所代数の生成をいう別の条件で、語が似ていても同一視しません。

<!-- definition-example-start: def-aqft12-weak-additivity -->
### 直接例：定数の可換net

全域環を前節の対角行列環 $D\subset B(\mathbb C^2)$ とし、全ての非空領域に $\mathcal M(O)=D$ を割り当て、$U(x)=I_2$ とします。包含単調性は $D\subset D$、Einstein局所性は対角行列同士が可換なので成立します。平行移動共変性は $U(x)DU(-x)=D$ から成立します。

**定義の確認**。 任意の $Q$ と $x$ について $\mathcal M(Q+x)=D$ です。ここで[可換子の定義](../../VN/VN2/index.md#def-vn2-commutant)に戻り、$D$ に含まれる $P=\operatorname{diag}(1,0)$ と任意の $T=\begin{pmatrix}a&b\\c&d\end{pmatrix}$ について

$
TP-PT=\begin{pmatrix}0&-b\\c&0\end{pmatrix}
$

を計算します。$T$ が $D$ の全元と可換なら特に $P$ と可換なので $b=c=0$、すなわち $T$ は対角行列です。逆に対角行列同士は可換ですから $D'=D$、したがって $D''=D=\mathcal M$。これで弱加法性の生成条件を任意の $Q$ について確認できました。包含単調性・局所性・共変性は直前に確かめた通りです。前節の $\Omega$ はこのnetで各局所von Neumann環に巡回的です。
<!-- definition-example-end -->

この模型は自由場の代用品ではありません。**条件の論理関係を小さい行列で確認する模型**です。次にその条件と解析性から何が従うかを証明します。

## 3. 小さい領域で零なら全並進で零となる

まず領域の幾何を確かめます。$Q\Subset O$ なら $\overline Q$ と閉集合 $O^c$ のEuclid距離は正です（$\overline Q$ のコンパクト性を使います）。従ってある $\varepsilon>0$ が存在し、$|x|_{\mathrm E}<\varepsilon$ なら

$$
Q+x\subset O
$$

となります。四次元のEuclidノルム $|x|_{\mathrm E}$ は領域の微小移動を測るためにだけ使い、Minkowskiの因果的符号とは混同しません。

double cone $D_R=\{(t,\boldsymbol y):|t|+|\boldsymbol y|<R\}$ と $D_r$（$0<r<R$）ならさらに具体的です。$q\in D_r$、$|x^0|+|\boldsymbol x|<R-r$ に対して

$$
|q^0+x^0|+|\boldsymbol q+\boldsymbol x|
<r+(R-r)=R,
$$

ゆえに $D_r+x\subset D_R$ です。演算子の側では[局所von Neumann環の包含単調性](../AQFT9/index.md#thm-aqft9-isotony-locality)により $\alpha_x(\mathcal M(Q))\subset\mathcal M(O)$ となります。

<a id="lem-aqft12-local-zero-propagation"></a>

<!-- formal-statement-start -->
> **補題（局所での直交性の全並進への伝播）**  
> $O$ を非空開領域、$Q\Subset O$ を非空double coneとする。$\mathcal H$ 上の $U:\mathbb R^4\to\mathcal U(\mathcal H)$ は強連続、[AQFT3のスペクトル条件](../AQFT3/index.md#def-aqft3-spectrum)を満たし、$U(x)\Omega=\Omega$ とする。共変な局所von Neumann netが与えられ、$\psi\in\mathcal H$ は
>
$$
\langle\psi,A\Omega\rangle=0
\quad(A\in\mathcal M(O))
$$
>
> を満たすとする。このとき、任意の整数 $n\ge1$、任意の $A_1,\ldots,A_n\in\mathcal M(Q)$ と $x_1,\ldots,x_n\in\mathbb R^4$ に対し
>
$$
\left\langle\psi,
\alpha_{x_1}(A_1)\cdots\alpha_{x_n}(A_n)\Omega
\right\rangle=0
$$
>
> が成り立つ。
<!-- formal-statement-end -->

### 証明の見取り図

各 $x_j$ が零の近傍にあれば、平行移動後の $A_j$ はすべて $\mathcal M(O)$ に入るため、積もそこに入ります。その行列要素は近傍の直積上で零です。次に[AQFT11の複数変数の解析的一意性](../AQFT11/index.md#prop-aqft11-multipoint-tube)で **各平行移動変数を全域へ広げます**。弱加法性はこの補題には必要ありません。

<!-- proof-start -->
### 証明

$Q\Subset O$ から、ある $\varepsilon>0$ に対して $x\in N_\varepsilon:=\{x:|x|_{\mathrm E}<\varepsilon\}$ なら $Q+x\subset O$ です。固定した $A_j\in\mathcal M(Q)$ について[共変性](../AQFT9/index.md#prop-aqft9-vn-covariance)と[包含単調性](../AQFT9/index.md#thm-aqft9-isotony-locality)を順に使うと

$$
\alpha_{x_j}(A_j)\in\mathcal M(Q+x_j)
\subset\mathcal M(O)\quad(x_j\in N_\varepsilon).
$$

$\mathcal M(O)$ は積で閉じているため、$x_1,\ldots,x_n\in N_\varepsilon$ では

$$
F(x_1,\ldots,x_n):=
\left\langle\psi,
\alpha_{x_1}(A_1)\cdots\alpha_{x_n}(A_n)\Omega
\right\rangle=0.
$$

この $F$ を[AQFT11の命題](../AQFT11/index.md#prop-aqft11-multipoint-tube)へ入力する形に直します。$U(-x_n)\Omega=\Omega$ と $U(-x_j)U(x_{j+1})=U(x_{j+1}-x_j)$ から

$$
\begin{aligned}
F(x_1,\ldots,x_n)
&=\langle\psi,U(x_1)A_1U(-x_1)U(x_2)A_2\cdots
 U(x_n)A_nU(-x_n)\Omega\rangle\\
&=\langle\psi,U(y_1)A_1U(y_2)A_2\cdots
 U(y_n)A_n\Omega\rangle,
\end{aligned}
$$

ただし $y_1=x_1$、$y_j=x_j-x_{j-1}$（$2\le j\le n$）です。逆変換は

$$
x_j=y_1+\cdots+y_j\qquad(1\le j\le n)
$$

なので、これは $\mathbb R^{4n}$ の可逆線形変換です。従って開集合 $N_\varepsilon^n$ の像も非空開集合です。

作用素 $A_j$ は有界、$U$ は正エネルギーかつ強連続、$\Omega$ は不変です。よって[AQFT11の複数変数一意性](../AQFT11/index.md#prop-aqft11-multipoint-tube)の全仮定が揃い、$F$ がこの非空開集合で零なら全ての実変数 $y_1,\ldots,y_n$ で零です。逆変換により全 $x_1,\ldots,x_n$ で零となります。$\square$
<!-- proof-end -->

ここで重要なのは、**一つの並進変数に関する一意性だけで積の全てを済ませたことにしない**点です。二つ以上の局所演算子を扱うために、前講で複数変数版を準備しました。

## 4. 小領域の真空ベクトルはなぜ全空間に届くか

[AQFT9の全域環](../AQFT9/index.md#def-aqft9-local-vn-net)について真空が巡回的であることは、真空GNS表現では[OA5のGNS定理](../../OA/OA5/index.md#thm-oa5-gns)から得られます。いま必要なのは、それに[弱加法性](#def-aqft12-weak-additivity)を加えることです。

<a id="thm-aqft12-reeh-schlieder"></a>

<!-- formal-statement-start -->
> **定理（Reeh–Schlieder：弱加法性による局所巡回性）**  
> 四次元Minkowski時空の有界double coneに対し、包含単調で平行移動共変な単位的局所von Neumann net $O\mapsto\mathcal M(O)$ が同一のHilbert空間 $\mathcal H$ 上に与えられ、全域環を $\mathcal M$ とする。$U:\mathbb R^4\to\mathcal U(\mathcal H)$ は強連続な共変ユニタリ表現で、その共同スペクトルは未来閉光円錐 $\overline V_+$ に含まれるとする。単位ベクトル $\Omega$ は $U(x)\Omega=\Omega$ を満たし、全域環に対して巡回的であるとする。さらにnetが[弱加法性](#def-aqft12-weak-additivity)を満たすとする。
>
> このとき任意の非空な有界double cone $O$ について
>
$$
\overline{\mathcal M(O)\Omega}^{\,\|\cdot\|}=\mathcal H
$$
>
> すなわち真空 $\Omega$ は全てのそのような局所von Neumann環に対して巡回的である。
<!-- formal-statement-end -->

### 証明の見取り図

$\mathcal M(O)\Omega$ に直交する任意の $\psi$ を取ります。$Q\Subset O$ に属する演算子の任意の全並進積は、[前節の補題](#lem-aqft12-local-zero-propagation)によって $\psi$ と直交します。これらの有限線形結合が強作用素閉包で全域環を生成するのが弱加法性です。全域環に対する $\Omega$ の巡回性から $\psi=0$ を結論します。

<!-- proof-start -->
### 証明

$O$ の内部に非空double cone $Q\Subset O$ を選びます。閉部分空間 $K:=\overline{\mathcal M(O)\Omega}$ を置き、$\psi\in K^\perp$ とします。従って

$$
\langle\psi,A\Omega\rangle=0
\qquad(A\in\mathcal M(O)).
$$

[局所での直交性の全並進への伝播](#lem-aqft12-local-zero-propagation)により、任意の $n\ge1$、任意の $x_j\in\mathbb R^4$ と $A_j\in\mathcal M(Q)$ に対し

$$
\langle\psi,\alpha_{x_1}(A_1)\cdots
\alpha_{x_n}(A_n)\Omega\rangle=0.
$$

平行移動した各 $\mathcal M(Q+x)$ の元の有限個の演算子の積と、その有限線形結合からなる単位的 $*$-代数を $\mathcal B$ とします。各局所von Neumann環は随伴で閉じ、$\alpha_x$ も随伴を保つので、有限個の演算子の積の随伴は逆順の有限個の演算子の積です。よって $\mathcal B$ は確かに単位的 $*$-代数です。上の等式の線形性から

$$
\langle\psi,B\Omega\rangle=0
\qquad(B\in\mathcal B)
$$

が成立します（単位元も $\mathcal M(Q)$ に含まれます）。

[弱加法性](#def-aqft12-weak-additivity)から $\mathcal B''=\mathcal M$。ここで[von Neumann の二重可換子定理](../../VN/VN2/index.md#thm-vn2-bicommutant)によれば $\mathcal B$ の強作用素閉包は $\mathcal M$ です。従って任意の $T\in\mathcal M$ に対し $\mathcal B$ のネット $B_\lambda$ で、各 $\eta\in\mathcal H$ に対して $B_\lambda\eta\to T\eta$ となるものがあります。特に $\eta=\Omega$ を代入して

$$
\langle\psi,T\Omega\rangle
=\lim_\lambda\langle\psi,B_\lambda\Omega\rangle
=0.
$$

最後に全域巡回性 $\overline{\mathcal M\Omega}=\mathcal H$ を使います。$\psi$ は稠密な $\mathcal M\Omega$ に直交するので $\psi=0$、すなわち $K^\perp=\{0\}$ です。

ここで引用する[閉部分空間の直交分解](../../F0/F0-02C1A/index.md#thm-f0-02c1a-orthogonal-decomposition)は実Hilbert空間について述べられています。本章の複素Hilbert空間 $\mathcal H$ には $(v,w)_{\mathbb R}:=\operatorname{Re}\langle v,w\rangle$ を内積として実Hilbert空間の定理を適用します。$K$ は複素線形なので、実直交する $v$ は任意の $k\in K$ と $ik\in K$ に対して

$
0=\operatorname{Re}\langle v,k\rangle,\qquad
0=\operatorname{Re}\langle v,ik\rangle=-\operatorname{Im}\langle v,k\rangle
$

を満たし、複素内積でも $v\perp K$ です。従って実直交補と複素直交補は一致し、実Hilbert空間の直交分解 $\mathcal H=K\oplus K^\perp$ を本章にも適用できます。$K^\perp=\{0\}$ だから $K=\mathcal H$ となり、結論を得ます。$\square$
<!-- proof-end -->

この証明は「全域環の元を局所von Neumann環の元 **一個** で近似した」のではありません。全並進された局所演算子の**積の線形結合**を経由しています。積を許さなければ弱加法性を正しく利用できません。

<a id="cor-aqft12-local-cstar-cyclicity"></a>

<!-- formal-statement-start -->
> **系（局所C*環の像でも巡回的）**  
> 上の定理の局所von Neumann環が、[AQFT9の定義](../AQFT9/index.md#def-aqft9-local-vn-net)の通り $\mathcal M(O)=\pi(\mathfrak A(O))''$ であるとする。このとき、各非空有界double cone $O$ で
>
$$
\overline{\pi(\mathfrak A(O))\Omega}^{\,\|\cdot\|}
=\mathcal H
$$
>
> が成立する。
<!-- formal-statement-end -->

### 証明の見取り図

局所C*環の像は局所von Neumann環より小さいですが、強作用素位相で稠密です。強収束は固定した $\Omega$ へ作用させた後のノルム収束を意味するため、巡回部分空間の閉包は変わりません。

<!-- proof-start -->
### 証明

$S=\pi(\mathfrak A(O))$ と置きます。これは単位的 $*$-代数なので、[von Neumann の二重可換子定理](../../VN/VN2/index.md#thm-vn2-bicommutant)より $S$ の強作用素閉包は $S''=\mathcal M(O)$ です。任意の $T\in\mathcal M(O)$ に対して $S$ のネット $A_\lambda$ が存在し、$A_\lambda\Omega\to T\Omega$ です。したがって

$$
\mathcal M(O)\Omega
\subset\overline{S\Omega}^{\,\|\cdot\|}.
$$

逆向きは $S\subset\mathcal M(O)$ から従い、両辺の閉包は一致します。[Reeh–Schlieder：弱加法性による局所巡回性](#thm-aqft12-reeh-schlieder)より右辺は $\mathcal H$ です。$\square$
<!-- proof-end -->

## 5. どの仮定を落とすと結論が崩れるか

まず正エネルギーだけでは局所巡回性は保証されません。全域巡回性まであっても、[弱加法性](#def-aqft12-weak-additivity)がなければ失敗する例を構成します。

全域環を $D=\{\operatorname{diag}(a,b):a,b\in\mathbb C\}$、$\mathcal H=\mathbb C^2$、$\Omega=(1,1)/\sqrt2$、$U(x)=I_2$ とします。非空な開領域 $O$ について次のルールで局所von Neumann環を割り当てます。

- $O$ がMinkowskiの固有時間間隔が $2$ より大きい時間的に分離した二点を含むとき、$\mathcal M(O)=D$。
- そのような二点を含まないとき、$\mathcal M(O)=\mathbb CI_2$。

二点の変位を $b-a=(\tau,\boldsymbol z)$ とすると、時間的という条件は $\tau^2>|\boldsymbol z|^2$、固有時間間隔は $\sqrt{\tau^2-|\boldsymbol z|^2}$ です。これはLorentz変換で不変なので、この割当ては平行移動のみならずPoincaré変換についても $U=I_2$ で共変です。

**公理の確認。** $O_1\subset O_2$ で前者が上の二点を含めば後者も含むので、局所von Neumann環の包含は保たれます。全ての局所von Neumann環は同じ可換な作用素環 $D$ の部分環なので、空間的に分離した領域間の可換性も満たします。大きいdouble coneは条件を満たすので、その全域生成環は $D$ です。$U=I_2$ は強連続でスペクトルが $\{0\}\subset\overline V_+$、$\Omega$ は不変で $D\Omega=\mathbb C^2$ により全域巡回的です。

具体的には $Q=D_r=\{(t,\boldsymbol y):|t|+|\boldsymbol y|<r\}$ を $0<r\le1$ で選びます。任意の $a,b\in D_r$ に対して $|b^0-a^0|<2r\le2$。二点が時間的ならその固有時間間隔は

$
\sqrt{(b^0-a^0)^2-|\boldsymbol b-\boldsymbol a|^2}
\le |b^0-a^0|<2
$

なので $Q$ は閾値を超える二点を含みません。一方 $D_R$（$R>1$）では $1<t<R$ を選ぶと $(t,\boldsymbol0)$ と $(-t,\boldsymbol0)$ が入り、その固有時間間隔は $2t>2$ です。従って全域生成環は $D$ ですが、小さい $Q$ では

$$
\mathcal M(Q)\Omega=\mathbb C\Omega
\ne\mathbb C^2.
$$

そのような $Q$ をいくら並進しても大きさは変わらず、生成環は $\mathbb CI_2$ のままです。すなわち**失われた仮定は弱加法性**です。解析性は成立しても、局所で生成できない演算子を作り出すわけではありません。

全域巡回性も別途必要です。例えば全ての領域で $\mathcal M(O)=D$、$\mathcal M=D$、$U=I_2$ とし、$\Omega=e_1=(1,0)$ を選べば、弱加法性・正エネルギー・不変性はありますが、$D\Omega=\mathbb Ce_1$ で全域巡回性が失われ、当然局所巡回的でもありません。この表現は全域の真空GNS巡回表現にはなっていません。

最後に局所性は本講の巡回性証明では直接使っていません。局所性が必要になるのは、空間的補領域の巡回性を用いて局所演算子の核を制御する次講です。局所性と巡回性を同じ結論として扱わないようにします。

## 6. 演習と詳細解答

### Level A：定義と幾何を手で確認する

<a id="ex-aqft12-a01"></a>
#### AQFT12-A01 小領域が収まる並進範囲
- Level: A

$D_R=\{(t,\boldsymbol y):|t|+|\boldsymbol y|<R\}$ とする。$Q=D_1$、$O=D_3$ に対し、$|x^0|+|\boldsymbol x|<2$ なら $Q+x\subset O$ を示せ。さらに $x=(1,(1/2,0,0))$ について判定せよ。

<!-- solution-start -->
**詳細解答。** 任意の $q=(q^0,\boldsymbol q)\in D_1$ では $|q^0|+|\boldsymbol q|<1$ です。三角不等式を時間・空間にそれぞれ使うと

$$
\begin{aligned}
|q^0+x^0|+|\boldsymbol q+\boldsymbol x|
&\le |q^0|+|x^0|+|\boldsymbol q|+|\boldsymbol x|\\
&<1+2=3.
\end{aligned}
$$

従って $q+x\in D_3$、つまり $Q+x\subset O$ です。指定された $x$ は $|1|+|(1/2,0,0)|=3/2<2$ なので包含が成立します。
<!-- solution-end -->

<a id="ex-aqft12-a02"></a>
#### AQFT12-A02 巡回性を二次元で判定する
- Level: A

$\mathcal H=\mathbb C^2$、$\Omega=(1,1)/\sqrt2$、$D$ を対角行列全体とする。$D\Omega$ と $(\mathbb CI_2)\Omega$ を求め、それぞれの直交補を計算せよ。

<!-- solution-start -->
**詳細解答。** $D\Omega=\{(a,b)/\sqrt2:a,b\in\mathbb C\}=\mathbb C^2$ なので直交補は $\{0\}$ です。一方、$(\mathbb CI_2)\Omega=\mathbb C(1,1)$ であり、$v=(v_1,v_2)$ がこれに直交する条件は

$$
\langle(1,1),v\rangle=v_1+v_2=0.
$$

よって直交補は $\mathbb C(1,-1)$ で非零です。従って前者のみが巡回的です。
<!-- solution-end -->

<a id="ex-aqft12-a03"></a>
#### AQFT12-A03 定数netの弱加法性
- Level: A

全ての非空領域で $\mathcal M(O)=D\subset B(\mathbb C^2)$、$U(x)=I_2$ とする。任意のdouble cone $Q$ に対し弱加法性の両辺を求め、正エネルギー条件を確認せよ。

<!-- solution-start -->
**詳細解答。** 任意の $x$ に対し $\mathcal M(Q+x)=D$ なので、左辺は $D''$ です。$D$ と可換な行列は対角行列です。実際 $P=\operatorname{diag}(1,0)\in D$ と $T=(t_{ij})$ の可換条件 $TP=PT$ は $t_{12}=t_{21}=0$ を与えます。したがって $D'=D$、$D''=D=\mathcal M$ です。平行移動表現は $U(x)=I_2=e^{i0\cdot x}I_2$ で共同スペクトルは $\{0\}$。未来閉光円錐に含まれます。
<!-- solution-end -->

<a id="ex-aqft12-a04"></a>
#### AQFT12-A04 一個の作用素と積の違い
- Level: A

$\mathcal H=\mathbb C^2$、$P=\operatorname{diag}(1,0)$、$S=\begin{pmatrix}0&1\\1&0\end{pmatrix}$ とする。$P,S$ の線形結合だけでは行列単位 $E_{12}$ を作れないことを示し、積 $PS$ を計算せよ。弱加法性の証明で積が必要となる理由を述べよ。

<!-- solution-start -->
**詳細解答。** $aP+bS$ は行列として

$$
aP+bS=\begin{pmatrix}a&b\\b&0\end{pmatrix}
$$

です。非対角成分が常に等しいので、上右成分が $1$、下左成分が $0$ の $E_{12}$ にはなりません。一方、

$$
PS=\begin{pmatrix}1&0\\0&0\end{pmatrix}
\begin{pmatrix}0&1\\1&0\end{pmatrix}
=\begin{pmatrix}0&1\\0&0\end{pmatrix}=E_{12}.
$$

異なる局所von Neumann環の生成する代数には元同士の積が必要です。ただしこの行列例自体がMinkowski局所netを与えるわけではありません。
<!-- solution-end -->

### Level B：解析性・生成・反例を組み合わせる

<a id="ex-aqft12-b01"></a>
#### AQFT12-B01 二演算子積と増分座標
- Level: B

強連続正エネルギー表現 $U$ と不変単位ベクトル $\Omega$、有界作用素 $A,B$、$\psi\in\mathcal H$ を取る。$F(x_1,x_2)=\langle\psi,\alpha_{x_1}(A)\alpha_{x_2}(B)\Omega\rangle$ を増分変数に直し、$F$ が実開集合で零なら全実変数で零になる理由を示せ。

<!-- solution-start -->
**詳細解答。** $\alpha_x(A)=U(x)AU(-x)$ なので

$$
\begin{aligned}
F(x_1,x_2)
&=\langle\psi,U(x_1)AU(-x_1)U(x_2)BU(-x_2)\Omega\rangle\\
&=\langle\psi,U(x_1)AU(x_2-x_1)B\Omega\rangle.
\end{aligned}
$$

$y_1=x_1$、$y_2=x_2-x_1$ と置けば逆写像は $(x_1,x_2)=(y_1,y_1+y_2)$ です。可逆線形写像は非空開集合を非空開集合へ写します。有界な $A,B$、強連続でスペクトル条件を満たす $U$、不変な $\Omega$ が揃うので、[AQFT11の二変数を含む一意性命題](../AQFT11/index.md#prop-aqft11-multipoint-tube)を $n=2$ で適用できます。$y$ の開集合で零なら全 $y$ で零、逆変換により全 $x$ で零です。
<!-- solution-end -->

<a id="ex-aqft12-b02"></a>
#### AQFT12-B02 弱加法性からなぜ強近似ができるか
- Level: B

単位的 $*$-代数 $\mathcal B\subset B(\mathcal H)$ が $\mathcal B''=\mathcal M$ を満たすとする。$\Omega\in\mathcal H$、$\psi\in\mathcal H$ が $\langle\psi,B\Omega\rangle=0$（全 $B\in\mathcal B$）なら、全 $T\in\mathcal M$ に対しても $\langle\psi,T\Omega\rangle=0$ を証明せよ。

<!-- solution-start -->
**詳細解答。** [von Neumannの二重可換子定理](../../VN/VN2/index.md#thm-vn2-bicommutant)の適用条件は、$\mathcal B$ が単位元を含む $*$-代数であることです。よってその強作用素閉包は $\mathcal B''=\mathcal M$。任意の $T\in\mathcal M$ に対し、$\mathcal B$ のネット $(B_\lambda)$ で $B_\lambda\eta\to T\eta$（全 $\eta\in\mathcal H$）となるものがあります。特に $\eta=\Omega$ を選び、内積の連続性から

$$
\langle\psi,T\Omega\rangle
=\lim_\lambda\langle\psi,B_\lambda\Omega\rangle
=\lim_\lambda 0=0.
$$

ここで得たのは作用素ノルム近似ではなく、固定した各ベクトル上の強収束です。
<!-- solution-end -->

<a id="ex-aqft12-b03"></a>
#### AQFT12-B03 弱加法性がない正エネルギーnet
- Level: B

$\mathcal H=\mathbb C^2$、$D$ を対角行列環、$\Omega=(1,1)/\sqrt2$、$U=I_2$ とする。開領域が固有時間間隔 $>2$ の時間的に分離した二点を含むとき局所von Neumann環を $D$、含まないとき $\mathbb CI_2$ と割り当てる。包含単調性、共変性、全域巡回性を確認し、十分小さい $Q$ でReeh–Schlieder性が失敗する理由を示せ。

<!-- solution-start -->
**詳細解答。** 領域 $O_1\subset O_2$ で $O_1$ に該当二点があれば $O_2$ にもあります。従って $\mathbb CI_2\subset D$ に反する逆向きの変化は起こらず、包含単調性があります。固有時間間隔はPoincaré変換で不変であり、$U=I_2$ が各環を共変に保ちます。大きいdouble coneには例えば $(t,\boldsymbol0)$ と $(-t,\boldsymbol0)$ で $t>1$ の二点を取れるため、全域環は $D$。任意の $(u,v)\in\mathbb C^2$ は

$$
\operatorname{diag}(\sqrt2u,\sqrt2v)\Omega=(u,v)
$$

と表せるので全域巡回性があります。一方、$Q=D_r$（$0<r\le1$）を取ると、任意の $a,b\in Q$ で $|b^0-a^0|<2r\le2$ です。時間的な二点でも固有時間間隔は

$
\sqrt{(b^0-a^0)^2-|\boldsymbol b-\boldsymbol a|^2}
\le|b^0-a^0|<2
$

なので、$\mathcal M(Q)=\mathbb CI_2$。その作用は $\mathbb C\Omega$ に限られ、$\mathbb C^2$ に稠密ではありません。$U=I_2$ のスペクトルは $\{0\}$ で正エネルギーですが、$\mathcal M(Q+x)=\mathbb CI_2$ は全 $x$ で変わらず、弱加法性が失敗します。
<!-- solution-end -->

<a id="ex-aqft12-b04"></a>
#### AQFT12-B04 全域巡回性を落とした場合
- Level: B

全ての領域で $\mathcal M(O)=D\subset B(\mathbb C^2)$、$U=I_2$ とし、$\Omega=e_1$ とする。弱加法性、スペクトル条件、全域巡回性を判定し、前問の反例と失った仮定を比較せよ。

<!-- solution-start -->
**詳細解答。** 全ての $Q+x$ に対し $\mathcal M(Q+x)=D$ なので、$D''=D=\mathcal M$ で弱加法性が成立します。$U=I_2$ の共同スペクトルは $\{0\}$ なのでスペクトル条件も成立します。一方、

$$
D\Omega=\{\operatorname{diag}(a,b)e_1:a,b\in\mathbb C\}
=\mathbb Ce_1.
$$

$\mathbb Ce_1$ は $\mathbb C^2$ の真部分空間であり、$\Omega$ は全域巡回的ではありません。前問は**全域巡回性あり・弱加法性なし**、本問は**弱加法性あり・全域巡回性なし**です。どちらも局所巡回性が破れる理由が異なります。
<!-- solution-end -->

### Level C：定理を自力で組み立てる

<a id="ex-aqft12-c01"></a>
#### AQFT12-C01 Reeh–Schlieder証明の再構成
- Level: C

非空有界double cone $O$、$Q\Subset O$、真空不変な強連続正エネルギー共変表現 $U$、全域環 $\mathcal M$ に巡回的な単位ベクトル $\Omega$ を考える。$\mathcal M(O)$ は単位的局所von Neumann環、$\big(\bigcup_x\mathcal M(Q+x)\big)''=\mathcal M$ と仮定する。

1. $\psi\perp\mathcal M(O)\Omega$ なら任意の $n\ge1$、$A_j\in\mathcal M(Q)$ に対する $\langle\psi,\prod_j\alpha_{x_j}(A_j)\Omega\rangle$ が零の近傍で消える理由を示せ。
2. [AQFT11の複数変数一意性](../AQFT11/index.md#prop-aqft11-multipoint-tube)の仮定を一つずつ対応付け、全並進で零と証明せよ。
3. 弱加法性と全域巡回性をそれぞれ使う段階を特定して $\overline{\mathcal M(O)\Omega}=\mathcal H$ を結論せよ。

<!-- solution-start -->
**詳細解答。** **(1)** $Q\Subset O$ なのである $\varepsilon>0$ に対して $Q+x\subset O$ が $|x|_{\mathrm E}<\varepsilon$ で成立します。[局所netの共変性](../AQFT9/index.md#prop-aqft9-vn-covariance)と[包含単調性](../AQFT9/index.md#thm-aqft9-isotony-locality)から $\alpha_x(A_j)\in\mathcal M(O)$ です。従って $x_j$ がすべてこの球内なら、積 $\prod_j\alpha_{x_j}(A_j)\in\mathcal M(O)$。直交性から行列要素は零になります。

**(2)** $y_1=x_1$、$y_j=x_j-x_{j-1}$ と置くと

$$
\left\langle\psi,\prod_{j=1}^n\alpha_{x_j}(A_j)\Omega\right\rangle
=\langle\psi,U(y_1)A_1U(y_2)A_2\cdots U(y_n)A_n\Omega\rangle.
$$

使ったのは群性 $U(-x_{j-1})U(x_j)=U(x_j-x_{j-1})$ と $U(-x_n)\Omega=\Omega$ です。逆は $x_j=\sum_{k=1}^j y_k$。$U$ の強連続性とスペクトル条件、$A_j$ の有界性、$\Omega$ の不変性が[AQFT11の命題](../AQFT11/index.md#prop-aqft11-multipoint-tube)の仮定に対応します。$x$ の零の近傍の直積は $y$ への可逆線形変換で非空開集合に写るので、一意性命題から全 $y$、従って全 $x$ で行列要素が零です。

**(3)** 全並進した $\mathcal M(Q)$ の元を有限個掛け合わせ、その線形結合を取って得られる $*$-代数を $\mathcal B$ とします。(2) から

$$
\langle\psi,B\Omega\rangle=0
\qquad(B\in\mathcal B)
$$

が従います。弱加法性は $\mathcal B''=\mathcal M$ を意味します。[von Neumann の二重可換子定理](../../VN/VN2/index.md#thm-vn2-bicommutant)を単位的 $*$-代数 $\mathcal B$ に適用すると、任意の $T\in\mathcal M$ を強収束する $\mathcal B$ のネットで近似できます。特に $B_\lambda\Omega\to T\Omega$ なので、

$$
\langle\psi,T\Omega\rangle
=\lim_\lambda\langle\psi,B_\lambda\Omega\rangle=0.
$$

最後に全域巡回性を使います。

$$
\overline{\mathcal M\Omega}=\mathcal H
\quad\Longrightarrow\quad\psi=0.
$$

ゆえに $\mathcal M(O)\Omega$ の直交補は零で、その閉包は $\mathcal H$ です。**弱加法性は強近似の段階、全域巡回性は最後の直交補の段階**で使いました。
<!-- solution-end -->

## 7. 到達点と次講

Reeh–Schlieder定理は、**正エネルギーによる解析性 → 局所零の全並進への伝播 → 弱加法性による全域環への到達 → 全域巡回性**という四段階で得られました。証明に真空の一意性も局所von Neumann環の型も必要ありません。一方、弱加法性や全域巡回性を落とすと、具体的なnetで結論が破れます。

局所巡回性は $A\Omega=0$ なら $A=0$ という性質ではありません。後者を **分離性** と呼ぶ際には、空間的に分離した補領域の巡回性と局所性を別途利用します。次の **AQFT13「巡回性・分離性・局所性」** でその論理を扱います。

参考：C. J. Fewster and K. Rejzner, [*Algebraic Quantum Field Theory — an introduction*](https://arxiv.org/abs/1904.04051), §5.2；R. Haag, [*Local Quantum Physics*](https://link.springer.com/book/10.1007/978-3-642-97306-2)。
