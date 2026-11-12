# AQFT2 Haag–Kastler net

[AQFT1の因果補集合](../AQFT1/index.md#def-aqft1-causal-complement)により、二つの領域が光信号でも結ばれないという幾何学的条件を判定できました。しかし、幾何学だけでは「そこで測る量が互いに干渉しない」ことは言えません。今度は領域に**観測量の代数**を割り当て、因果関係を代数の言葉へ移します。

領域が大きくなれば使える観測量は減らないはずです。空間的に分離した場所での観測量は交換するはずです。また、時空全体をPoincaré変換しても、割当ては同じ規則に従ってほしいはずです。この三つがそれぞれ **isotony（包含単調性）**、**Einstein局所性**、**Poincaré共変性**です。本講では定義するだけでなく、それぞれを満たす模型と、一つだけ破る模型を計算します。

本講の舞台は計量 $(-+++)$ の四次元Minkowski時空 $M=\mathbb R^{1,3}$ です。開集合全体を $\mathcal O(M)$ と書きます。既習の[単位的C*-環](../../OA/OA3/index.md#def-oa3-cstar-algebra)では、積 $AB$ と随伴 $A^*$ が観測量の合成と複素共役に相当する操作を記述します。時空領域の[空間的分離](../AQFT1/index.md#def-aqft1-separated-regions)が、次の割当ての条件に登場します。

## 1. 領域ごとに何を割り当てるか

まず一つの単位的C*-環 $\mathfrak B$ を、すべての局所代数を収める容器とします。各開集合 $O$ に $\mathfrak B$ の**単位元を共有する閉じたC*-部分環** $\mathfrak A(O)$ を割り当てます。つまり $1_{\mathfrak B}\in\mathfrak A(O)$、$A,B\in\mathfrak A(O)$ なら $A+B,AB,A^*\in\mathfrak A(O)$ であり、ノルム極限でも閉じています。これは後に無限個の観測量を極限で扱うためです。

行列 $M_2(\mathbb C)$ の例なら、対角行列の集合
$$
D=\left\{\begin{pmatrix}a&0\\0&b\end{pmatrix}:a,b\in\mathbb C\right\}
$$
は単位元 $I_2$ を含むC*-部分環です。対角行列同士は交換しますが、$M_2(\mathbb C)$ 全体では一般に交換しません。したがって**同じ容器の中でも割り当てる部分環が違えば、可換性は変わる**のです。

<a id="def-aqft2-local-assignment"></a>

<!-- formal-statement-start -->
> **定義（局所C*-代数の割当て）**  
> $M=\mathbb R^{1,3}$、$\mathcal O(M)$ を開集合全体、$\mathfrak B$ を単位的C*-環とする。各 $O\in\mathcal O(M)$ に同じ単位元をもつ単位的C*-部分環
>
$$
\mathfrak A(O)\subset\mathfrak B
$$
>
> を対応させる写像 $O\mapsto\mathfrak A(O)$ を局所C*-代数の割当てという。本講では $\mathfrak A(\varnothing)=\mathbb C1$ と規約する。
<!-- formal-statement-end -->

<!-- definition-example-start: def-aqft2-local-assignment -->
### 直接例：二つの部分環

$\mathfrak B=M_2(\mathbb C)$ に対し、すべての非空開集合 $O$ に $\mathfrak A(O)=D$、空集合には $\mathbb CI_2$ と割り当てれば定義を満たします。$D$ は和・積・随伴で閉じ、行列ノルムで閉、単位元 $I_2$ を共有するからです。これはまだ三つの物理的条件を課す**前**の割当てです。
<!-- definition-example-end -->

$\mathfrak B$ に作用する**自己同型**は、積・和・随伴・単位元を保存する全単射 $\alpha:\mathfrak B\to\mathfrak B$ です。[単位的*-準同型の定義](../../OA/OA3/index.md#def-oa3-unital-star-hom)の全単射の場合であり、逆写像も*-準同型になります。Poincaré群 $G=\mathcal P_+^\uparrow$ は $F(p)=\Lambda p+a$ の形の、時間向きと空間向きを保つ等長変換の群とします。群の作用とは、各 $F\in G$ に自己同型 $\alpha_F$ があり、
$$
\alpha_{\mathrm{id}}=\mathrm{id},\qquad
\alpha_{F_1F_2}=\alpha_{F_1}\circ\alpha_{F_2}
$$
を満たすことです。群作用そのものと、それが局所代数を正しく運ぶかどうかは**別条件**です。

## 2. 包含を観測量の包含にする：isotony

小さい実験室で測れる量は、それを含む大きい実験室でも測れるべきです。例えば[AQFT1のdouble cone](../AQFT1/index.md#def-aqft1-double-cone)は $r<R$ なら $D_r\subset D_R$ でした。この方向の包含を代数にも要求します。

<a id="def-aqft2-isotony"></a>

<!-- formal-statement-start -->
> **定義（isotony／包含単調性）**  
> 局所C*-代数の割当て $O\mapsto\mathfrak A(O)$ が isotony を満たすとは、任意の開集合 $O_1,O_2\subset M$ に対し、
>
$$
O_1\subset O_2\quad\Longrightarrow\quad
\mathfrak A(O_1)\subset\mathfrak A(O_2)
$$
>
> が成り立つことをいう。代数の包含は同一の容器 $\mathfrak B$ の部分集合としての包含である。
<!-- formal-statement-end -->

<!-- definition-example-start: def-aqft2-isotony -->
### 直接例：二つの観測地点

異なる点 $p_1,p_2\in M$ を選び、$\mathfrak B=M_2(\mathbb C)\otimes M_2(\mathbb C)$ とします。$p_1$ だけを含む領域へ $M_2(\mathbb C)\otimes\mathbb CI_2$、両点を含む領域へ $\mathfrak B$ を割り当てます。小さい方に属する $A\otimes I_2$ は大きい方にも属します。点を一つも含まない領域には $\mathbb CI_4$ を割り当てます。これを一般の開集合で厳密に定めるのは第5節です。
<!-- definition-example-end -->

isotony は「空間的に離れている」ことをまだ使っていません。また $O_1\subset O_2$ から**等号** $\mathfrak A(O_1)=\mathfrak A(O_2)$ を主張してはいません。

## 3. 因果関係を交換子にする：Einstein局所性

二つの領域が空間的に分離していれば、どちらの順に可観測量を掛けても結果が等しいという条件を置きます。代数の元 $A,B$ の**交換子**は $[A,B]=AB-BA$ です。可換性を要求するのは空間的に分離した領域の**すべての元の組**についてであり、各領域の代数そのものが可換である必要はありません。

<a id="def-aqft2-locality"></a>

<!-- formal-statement-start -->
> **定義（Einstein局所性）**  
> 局所C*-代数の割当てが Einstein局所性を満たすとは、任意の空間的に分離した開領域 $O_1,O_2$ と任意の $A\in\mathfrak A(O_1)$、$B\in\mathfrak A(O_2)$ に対し、
>
$$
[A,B]=AB-BA=0
$$
>
> が成り立つことをいう。ここで空間的分離とは、全ての $p\in O_1,q\in O_2$ について $g(p-q,p-q)>0$ であることを指す。
<!-- formal-statement-end -->

<!-- definition-example-start: def-aqft2-locality -->
### 直接例：別々の行列因子

二地点の行列模型で $A=A_1\otimes I_2$、$B=I_2\otimes B_2$ とすると、
$$
AB=(A_1\otimes I_2)(I_2\otimes B_2)=A_1\otimes B_2
$$
および
$$
BA=(I_2\otimes B_2)(A_1\otimes I_2)=A_1\otimes B_2
$$
ですから $[A,B]=0$ です。ここでは $A_1$ と別の $A'_1$ が非可換でも構いません。**同一地点の量は非可換、離れた地点の量は可換**という区別を表せます。
<!-- definition-example-end -->

[AQFT1の因果補集合の定義](../AQFT1/index.md#def-aqft1-causal-complement)を使えば、開領域 $O_1\subset O_2^\perp$ のとき Einstein局所性を適用できます。$\mathfrak A(O_2)$ と交換する容器内の元全体を
$$
\mathfrak A(O_2)'_{\mathfrak B}
=\{X\in\mathfrak B:XB=BX\ \text{for all }B\in\mathfrak A(O_2)\}
$$
と書きます。これは**$\mathfrak B$ 内での相対可換子**であり、Hilbert空間表示後の可換子とは区別してください。

<a id="prop-aqft2-complement-commutation"></a>

<!-- formal-statement-start -->
> **命題（因果補集合と相対可換子）**  
> Einstein局所性を満たす局所C*-代数の割当てについて、開領域 $O_1,O_2$ が $O_1\subset O_2^\perp$ を満たすなら
>
$$
\mathfrak A(O_1)\subset\mathfrak A(O_2)'_{\mathfrak B}
$$
>
> が成り立つ。さらに isotony があれば $\mathfrak A(O_2^\perp)\subset\mathfrak A(O_2)'_{\mathfrak B}$ である。
<!-- formal-statement-end -->

### 証明の見取り図

領域の包含をまず点対の分離へ翻訳し、次にすべての観測量の交換へ翻訳します。等号は導けないことに注意してください。

<!-- proof-start -->
### 証明

$O_1\subset O_2^\perp$ とし、$p\in O_1$、$q\in O_2$ を任意に取ります。[因果補集合の定義](../AQFT1/index.md#def-aqft1-causal-complement)より $p\in O_2^\perp\subset C_{\mathrm{sp}}(O_2)$ なので $g(p-q,p-q)>0$ です。したがって二領域は空間的に分離しています。[Einstein局所性](#def-aqft2-locality)から全ての $A\in\mathfrak A(O_1)$、$B\in\mathfrak A(O_2)$ に対し $AB=BA$ です。$A$ の任意性により定義通り相対可換子への包含が従います。

$O_2^\perp$ は開集合なので、最初の主張で $O_1=O_2^\perp$ を取れます。あるいは isotony によって $O_1\subset O_2^\perp$ の任意の小領域から結論を得ても構いません。$\square$
<!-- proof-end -->

最後の包含は実は isotony を仮定せずとも第1文から従います。ここに isotony を添えたのは、一般の小領域から因果補集合全体へ観測量を拡大する見方も確認するためです。この包含から Haag双対性の**等号**を導くことはできません。

## 4. 時空を動かしても割当てを保つ：Poincaré共変性

座標系を変えたことで、物理的に同じ配置の観測量が別の規則に従うのは不自然です。Poincaré変換 $F$ で領域 $O$ を $F(O)$ へ動かすとき、代数上の自己同型 $\alpha_F$ が観測量も動かすように要求します。このとき $\alpha_F(A)$ が作用する先は「元の領域」ではなく「移した領域」です。

<a id="def-aqft2-covariance"></a>

<!-- formal-statement-start -->
> **定義（Poincaré共変性）**  
> $G=\mathcal P_+^\uparrow$ が単位的C*-環 $\mathfrak B$ に*-自己同型の群作用 $F\mapsto\alpha_F$ として作用しているとする。局所C*-代数の割当てがこの作用についてPoincaré共変であるとは、全ての開領域 $O$ と $F\in G$ について
>
$$
\alpha_F(\mathfrak A(O))=\mathfrak A(F(O))
$$
>
> が成り立つことをいう。ここで左辺は $\{\alpha_F(A):A\in\mathfrak A(O)\}$ を表す。
<!-- formal-statement-end -->

<!-- definition-example-start: def-aqft2-covariance -->
### 直接例：関数を移動させる

各 $O$ に、$O$ の内側に台を持つ連続関数から生成される代数を割り当てることを考えます。例えば $f$ が $D_1$ の内側だけで非零なら、平行移動 $F(p)=p+a$ のもとで $f\circ F^{-1}$ は $F(D_1)$ の内側だけで非零です。写像 $\alpha_F(f)=f\circ F^{-1}$ は積・複素共役・単位関数を保つため、単なる「領域の名前の付け替え」でなく代数の自己同型です。完全な構成とノルム閉包は第5節で確認します。
<!-- definition-example-end -->

<a id="def-aqft2-haag-kastler"></a>

<!-- formal-statement-start -->
> **定義（Haag–Kastler型の局所C*-net）**  
> 四次元Minkowski時空 $M$ の全開集合 $O$ に、単位的C*-環 $\mathfrak B$ 内の単位的C*-部分環 $\mathfrak A(O)$ を割り当て、$\mathfrak A(\varnothing)=\mathbb C1$ とする。$G=\mathcal P_+^\uparrow$ が $\mathfrak B$ に*-自己同型 $\alpha_F$ で作用するとする。この組が、次の三条件を満たすとき、本講の意味でHaag–Kastler型の局所C*-netとする。
>
> 1. **isotony**：$O_1\subset O_2$ なら $\mathfrak A(O_1)\subset\mathfrak A(O_2)$。
> 2. **Einstein局所性**：$O_1,O_2$ が空間的に分離するとき、$[\mathfrak A(O_1),\mathfrak A(O_2)]=0$。
> 3. **Poincaré共変性**：$\alpha_F(\mathfrak A(O))=\mathfrak A(F(O))$。
>
> ここで集合の交換子が零とは、双方から選んだ全ての元の交換子が零であるという意味である。
<!-- formal-statement-end -->

本講では三条件を**まとめて**netの基本要件としていますが、文献によっては局所netを isotony だけで定義し、局所性・共変性を別公理として付けます。いずれの流儀でも、次に現れる**状態**、**スペクトル条件**、**真空の存在・一意性**、**time-slice**、**加法性**、**Haag双対性**、**split property** はこの三条件から自動的には出ません。特にこの段階でHilbert空間・非有界場・量子真空を必要条件として持ち込みません。

## 5. 二つの小模型を本当に検査する

### 5.1 Poincaré共変な可換net

$\mathfrak B=C_b(M)$ を $M$ 上の有界複素連続関数全体（上限ノルム、点ごとの積と複素共役）の単位的C*-環とします。$C_c(O)$ は $M$ 上の連続関数で、台が $O$ に含まれるコンパクト集合となるものの全体です。$\mathbb C1+C_c(O)$ は積・和・随伴で閉じる*-代数なので、その上限ノルム閉包を
$$
\mathfrak A_{\mathrm{cl}}(O)
=\overline{\mathbb C1+C_c(O)}^{\|\cdot\|_\infty}
\subset C_b(M)
$$
とします。$O=\varnothing$ では $C_c(O)=\{0\}$ です。

<a id="thm-aqft2-commutative-model"></a>

<!-- formal-statement-start -->
> **定理（可換関数netの三公理）**  
> 上の $\mathfrak A_{\mathrm{cl}}(O)$ と
>
$$
(\alpha_F f)(p)=f(F^{-1}p),\qquad F\in\mathcal P_+^\uparrow
$$
>
> は、[Haag–Kastler型の局所C*-net](#def-aqft2-haag-kastler)の三条件を全て満たす。任意の非空開領域 $O$ には非定数の局所観測量が存在する。
<!-- formal-statement-end -->

### 証明の見取り図

関数の台は領域の包含に追随し、点ごとの積は交換します。変換後の台が $F(O)$ に移ることを示し、最後にノルム閉包へ延長します。

<!-- proof-start -->
### 証明

まず $\mathbb C1+C_c(O)$ は $f,g\in C_c(O)$ に対し $fg$ の台が $\operatorname{supp}f\cap\operatorname{supp}g$ に含まれることから積で閉じ、複素共役も台を変えません。閉包は $C_b(M)$ の単位的C*-部分環になります。

(1) $O_1\subset O_2$ なら $C_c(O_1)\subset C_c(O_2)$ なので $\mathbb C1+C_c(O_1)\subset\mathbb C1+C_c(O_2)$ です。閉包をとれば $\mathfrak A_{\mathrm{cl}}(O_1)\subset\mathfrak A_{\mathrm{cl}}(O_2)$ です。

(2) $C_b(M)$ の積は点ごとなので $fg=gf$ です。したがって任意の二つの局所部分環の元も交換します。これは空間的分離のときに限らず成立するので Einstein局所性を満たします。

(3) $F$ は逆写像を持つ連続なPoincaré変換です。$f\mapsto f\circ F^{-1}$ は線形・積・随伴を保ち、逆は $\alpha_{F^{-1}}$ です。合成を直接計算すると
$$
\begin{aligned}
\alpha_{F_1}(\alpha_{F_2}f)(p)
&=(\alpha_{F_2}f)(F_1^{-1}p)\\
&=f(F_2^{-1}F_1^{-1}p)
=f((F_1F_2)^{-1}p),
\end{aligned}
$$
すなわち群作用です。また
$$
\|\alpha_F f\|_\infty
=\sup_{p\in M}|f(F^{-1}p)|
=\sup_{q\in M}|f(q)|
=\|f\|_\infty
$$
で等長です。$f\in C_c(O)$ なら $\operatorname{supp}(\alpha_Ff)=F(\operatorname{supp}f)\subset F(O)$ で、逆変換でも同様です。ゆえに $\alpha_F(C_c(O))=C_c(F(O))$ です。定数関数は不変で、等長写像は閉包と交換しますから $\alpha_F(\mathfrak A_{\mathrm{cl}}(O))=\mathfrak A_{\mathrm{cl}}(F(O))$ です。

(4) $O$ は非空開集合なので、点 $p_0\in O$ の周りに十分小さい閉じたEuclid球が $O$ に入ります。その球の中心で1、球の外で0となる連続な山型関数を作れば、その台は $O$ に含まれ、非定数です。$\square$
<!-- proof-end -->

この模型は三条件を満たすにもかかわらず**可換**です。三公理だけで量子力学特有の非可換性が生まれるわけではありません。

### 5.2 二地点の非可換模型：局所性と共変性を分ける

$p_1=(0,(0,0,0))$、$p_2=(0,(4,0,0))$ を固定し、
$$
\mathfrak B=M_2(\mathbb C)\otimes M_2(\mathbb C)
$$
とします。$S(O)=\{j\in\{1,2\}:p_j\in O\}$ を定義し、$\mathfrak A_{\mathrm{site}}(O)$ を $S(O)$ に入る番号の行列因子が生成する単位的C*-部分環とします。具体的には
$$
\begin{array}{c|c}
S(O)&\mathfrak A_{\mathrm{site}}(O)\\ \hline
\varnothing&\mathbb CI_4\\
\{1\}&M_2(\mathbb C)\otimes \mathbb CI_2\\
\{2\}&\mathbb CI_2\otimes M_2(\mathbb C)\\
\{1,2\}&M_2(\mathbb C)\otimes M_2(\mathbb C).
\end{array}
$$

<a id="prop-aqft2-two-site"></a>

<!-- formal-statement-start -->
> **命題（二地点模型のisotonyと局所性）**  
> 上の $\mathfrak A_{\mathrm{site}}(O)$ は isotony と Einstein局所性を満たす。$\alpha_F=\mathrm{id}_{\mathfrak B}$ とした群作用ではPoincaré共変性を満たさない。
<!-- formal-statement-end -->

### 証明の見取り図

領域包含から含まれる地点の集合が増えること、空間的に分離した領域が同じ地点を共有しないこと、の二点を分けて使います。

<!-- proof-start -->
### 証明

$O_1\subset O_2$ なら、$p_j\in O_1$ であれば $p_j\in O_2$ です。したがって $S(O_1)\subset S(O_2)$ となり、生成元である行列因子が包含されるので $\mathfrak A_{\mathrm{site}}(O_1)\subset\mathfrak A_{\mathrm{site}}(O_2)$ です。

$O_1,O_2$ が空間的に分離しているとします。もし $j\in S(O_1)\cap S(O_2)$ なら $p_j\in O_1\cap O_2$ ですが、同一点の計量間隔は $g(p_j-p_j,p_j-p_j)=0$ であり、正であるという空間的分離の定義と矛盾します。従って $S(O_1)\cap S(O_2)=\varnothing$ です。異なるテンソル因子上の行列は
$$
(A\otimes I_2)(I_2\otimes B)
=A\otimes B=(I_2\otimes B)(A\otimes I_2)
$$
を満たし、線形結合にも拡張できるため局所性が成立します。

一方 $O=D_{1/4}(p_1)$ とし、空間方向への平行移動 $F(t,\boldsymbol x)=(t,\boldsymbol x+(1,0,0))$ を取ります。$S(O)=\{1\}$ ですが、$F(O)$ はどちらの地点も含まないので $\mathfrak A_{\mathrm{site}}(F(O))=\mathbb CI_4$ です。$\alpha_F=\mathrm{id}$ なら $\alpha_F(\mathfrak A_{\mathrm{site}}(O))=M_2(\mathbb C)\otimes\mathbb CI_2$ で、両者は一致しません。$\square$
<!-- proof-end -->

この模型で共変性が破れるのは、二つの**固定された地点**を時空の特別な場所として選んだからです。この例をPoincaré共変な量子場の構成と取り違えないでください。

## 6. 三つの公理はそれぞれ独立である

ここからは三つのうち**二つだけ**を満たす割当てを構成します。全て同じ四次元Minkowski時空の開集合族上に定義します。共変性を試す際の作用は明示したものに固定します。

<a id="prop-aqft2-independent-axioms"></a>

<!-- formal-statement-start -->
> **命題（三条件の独立性）**  
> 局所C*-代数の割当てと指定されたPoincaré群作用の組について、isotony、Einstein局所性、Poincaré共変性のいずれの一つも、残る二つからは従わない。
<!-- formal-statement-end -->

### 証明の見取り図

各条件を一つだけ失う三つの行列模型を作ります。可換な部分環を使えば局所性が自動的に満たされるので、isotonyと共変性の反例を個別に設計できます。

<!-- proof-start -->
### 証明

**(I) isotonyだけを破る模型。** $\mathfrak B=M_2(\mathbb C)$、$D\subset\mathfrak B$ を対角行列の部分環とし、$\alpha_F=\mathrm{id}$ とします。非空開領域の幾何量を
$$
\delta(O)=\sup_{p,q\in O}|g(p-q,p-q)|\in[0,\infty]
$$
と定義し、
$$
\mathfrak A_I(O)=
\begin{cases}
D,&O\ne\varnothing,\ \delta(O)<1,\\
\mathbb CI_2,&O=\varnothing\ \text{または}\ \delta(O)\ge1
\end{cases}
$$
と置きます。どの局所代数も可換な $D$ の部分環なので Einstein局所性が成立します。[Lorentz変換による計量の不変性](../../../物理系/SREL/SREL2/index.md#thm-srel2-interval-invariance)から $\delta(FO)=\delta(O)$ です。$\alpha_F=\mathrm{id}$ は群作用なので $\alpha_F(\mathfrak A_I(O))=\mathfrak A_I(FO)$ が成立します。

しかし $O_1=D_{1/10}(0,\boldsymbol0)\subset O_2=D_2(0,\boldsymbol0)$ を取ると、$p,q\in O_1$ について $|t_p-t_q|<1/5$、$|\boldsymbol x_p-\boldsymbol x_q|<1/5$ です。よって
$$
|g(p-q,p-q)|
=\left||\boldsymbol x_p-\boldsymbol x_q|^2-(t_p-t_q)^2\right|
<1/25<1,
$$
従って $\delta(O_1)<1$ です。他方 $O_2$ は $(0,(1,0,0))$ と $(0,(-1,0,0))$ を含み、その間隔の二乗は $4$ なので $\delta(O_2)\ge4$ です。従って $\mathfrak A_I(O_1)=D\not\subset\mathbb CI_2=\mathfrak A_I(O_2)$ です。

**(II) Einstein局所性だけを破る模型。** すべての非空領域に $\mathfrak A_L(O)=M_2(\mathbb C)$、空集合には $\mathbb CI_2$ を割り当て、$\alpha_F=\mathrm{id}$ とします。isotony と共変性は割当てが領域によらないので満たされます。しかし $O_1=D_{1/10}(0,\boldsymbol0)$ と $O_2=D_{1/10}(0,(1,0,0))$ は[二つのdouble coneの分離定理](../AQFT1/index.md#thm-aqft1-double-cone-separation)で空間的に分離します。双方の代数に属する
$$
X=\begin{pmatrix}0&1\\1&0\end{pmatrix},\qquad
Z=\begin{pmatrix}1&0\\0&-1\end{pmatrix}
$$
について
$$
XZ=\begin{pmatrix}0&-1\\1&0\end{pmatrix},\qquad
ZX=\begin{pmatrix}0&1\\-1&0\end{pmatrix},
$$
したがって
$$
[X,Z]=\begin{pmatrix}0&-2\\2&0\end{pmatrix}\ne0.
$$
局所性は破れます。

**(III) Poincaré共変性だけを破る模型。** 時空の原点 $p_*=(0,\boldsymbol0)$ を固定し、$\mathfrak B=M_2(\mathbb C)$、$\alpha_F=\mathrm{id}$ として
$$
\mathfrak A_C(O)=
\begin{cases}
D,&p_*\in O,\\
\mathbb CI_2,&p_*\notin O
\end{cases}
$$
とします。$O_1\subset O_2$ のとき、$p_*\in O_1$ なら $p_*\in O_2$ なので $D\subset D$、そうでなければ $\mathbb CI_2$ はどちらの候補にも含まれます。よって isotony です。どちらも可換な $D$ に含まれるため局所性も成立します。

$O=D_{1/10}(p_*)$ を $x^1$ 方向へ1だけ移動する平行移動 $F$ では $p_*\in O$、$p_*\notin F(O)$ です。従って
$$
\alpha_F(\mathfrak A_C(O))=D
\ne\mathbb CI_2=\mathfrak A_C(F(O)),
$$
となり共変性が破れます。

三模型は失う条件がそれぞれ異なるので、独立性が示されました。$\square$
<!-- proof-end -->

上の (I) で $\delta$ に数値の閾値を設けたのは**反例を作るため**です。観測量にそのような閾値が物理的に存在すると主張しているわけではありません。

## 7. 無限に多くの局所観測量を一つへまとめる

領域ごとの代数から大きな代数を作るには、包含に沿って観測量を集め、ノルムで閉じます。$D_n=\{(t,\boldsymbol x):|t|+|\boldsymbol x|<n\}$ とすると $D_n\subset D_{n+1}$ で、全ての点は十分大きい $D_n$ に属します。

<a id="prop-aqft2-quasilocal"></a>

<!-- formal-statement-start -->
> **命題（quasilocal C*-環の構成）**  
> isotony を満たす局所C*-代数の割当てについて
>
$$
\mathfrak A_{\mathrm{ql}}
=\overline{\bigcup_{n\ge1}\mathfrak A(D_n)}^{\|\cdot\|_{\mathfrak B}}
$$
>
> は単位的C*-部分環である。さらにPoincaré共変性を満たすなら、任意の $F\in G$ について $\alpha_F(\mathfrak A_{\mathrm{ql}})=\mathfrak A_{\mathrm{ql}}$ が成り立つ。
<!-- formal-statement-end -->

### 証明の見取り図

増大列の和集合では、二つの元が別々の段階から来ても大きい方の一段階へ移せます。共変性については、変換後の有界領域が十分大きいdouble coneへ入ることを使います。

<!-- proof-start -->
### 証明

isotony より $\mathfrak A(D_n)\subset\mathfrak A(D_{n+1})$ です。和集合から $A\in\mathfrak A(D_m)$、$B\in\mathfrak A(D_n)$ を取ると、$N=\max(m,n)$ に対し $A,B\in\mathfrak A(D_N)$ です。よって和、積、随伴、スカラー倍は全て同じ $\mathfrak A(D_N)$ に入ります。各段階が単位元を含むので、和集合は単位的*-部分代数です。そのノルム閉包はC*-部分環となります。

$F$ は連続アフィン変換なので、有界な $D_n$ の像 $F(D_n)$ も有界です。従ってある整数 $m$ が存在して $F(D_n)\subset D_m$ です。共変性と isotony から
$$
\alpha_F(\mathfrak A(D_n))
=\mathfrak A(F(D_n))
\subset\mathfrak A(D_m)\subset\mathfrak A_{\mathrm{ql}}.
$$
任意の $n$ で成り立ち、$\alpha_F$ はC*-環の*-自己同型として等長で連続なので、ノルム閉包へ延長して $\alpha_F(\mathfrak A_{\mathrm{ql}})\subset\mathfrak A_{\mathrm{ql}}$ です。同じ議論を $F^{-1}$ に適用すれば逆向きの包含も得ます。$\square$
<!-- proof-end -->

なお、この構成は一つの共通容器に全ての局所代数を埋めた本講の設定で述べています。抽象的な帰納極限から出発する一般化では、その構成のwell-defined性を別途確認します。

## 8. 演習

### Level A：三公理を具体的に読む

<a id="ex-aqft2-a01"></a>
#### AQFT2-A01 行列と可換子
- Level: A

$X,Z$ を第6節の行列とし、$D=\{\operatorname{diag}(a,b)\}$ とする。(1) $D$ が $M_2(\mathbb C)$ の単位的C*-部分環であることを検証せよ。(2) $[X,Z]$ と $[Z,\operatorname{diag}(2,3)]$ を計算し、$M_2(\mathbb C)$ が可換でないことを確認せよ。

<!-- solution-start -->
**詳細解答**。(1) 対角行列の和と積は
$$
\operatorname{diag}(a,b)+\operatorname{diag}(c,d)=\operatorname{diag}(a+c,b+d),
\quad
\operatorname{diag}(a,b)\operatorname{diag}(c,d)=\operatorname{diag}(ac,bd)
$$
で、随伴は $\operatorname{diag}(\overline a,\overline b)$ です。$I_2=\operatorname{diag}(1,1)$ を含み、有限次元線形部分空間なのでノルム閉です。(2) $[X,Z]=\begin{pmatrix}0&-2\\2&0\end{pmatrix}$。$T=\operatorname{diag}(2,3)$ とすると
$$
ZT=\operatorname{diag}(2,-3)=TZ,\qquad [Z,T]=0.
$$
全ての行列が交換するのでなく、**対角行列同士だけ**が交換することを区別します。
<!-- solution-end -->

<a id="ex-aqft2-a02"></a>
#### AQFT2-A02 領域の包含と代数
- Level: A

二地点模型で $O_1$ が $p_1$ のみを含み、$O_2$ が $p_1,p_2$ の両方を含むとする。$O_1\subset O_2$ としたとき、対応する代数を求め、isotony を行列で示せ。

<!-- solution-start -->
**詳細解答**。$S(O_1)=\{1\}$、$S(O_2)=\{1,2\}$ なので
$$
\mathfrak A(O_1)=M_2(\mathbb C)\otimes\mathbb CI_2,\qquad
\mathfrak A(O_2)=M_2(\mathbb C)\otimes M_2(\mathbb C).
$$
前者の任意の元は $A\otimes I_2$ の形で、後者では $A\otimes I_2\in M_2\otimes M_2$ です。従って包含が成立します。$I_2\otimes Z$ は後者に属しますが前者には属しないので、包含は一般に真です。
<!-- solution-end -->

<a id="ex-aqft2-a03"></a>
#### AQFT2-A03 関数netの共変性
- Level: A

$F(t,\boldsymbol x)=(t,\boldsymbol x+(a,0,0))$、$f$ を $D_1(0,\boldsymbol0)$ 内にコンパクトな台を持つ連続関数とする。$\alpha_Ff=f\circ F^{-1}$ の台を求め、$\|\alpha_Ff\|_\infty=\|f\|_\infty$ を示せ。

<!-- solution-start -->
**詳細解答**。$F^{-1}(t,\boldsymbol x)=(t,\boldsymbol x-(a,0,0))$ なので
$$
(\alpha_Ff)(t,\boldsymbol x)=f(t,\boldsymbol x-(a,0,0)).
$$
したがって $\operatorname{supp}(\alpha_Ff)=F(\operatorname{supp}f)$ であり、$D_1(0,(a,0,0))$ に含まれます。また $F^{-1}$ は $M$ 上の全単射なので
$$
\sup_{p\in M}|f(F^{-1}p)|=\sup_{q\in M}|f(q)|.
$$
これは変換が**台とノルムを両方**保存することの確認です。
<!-- solution-end -->

<a id="ex-aqft2-a04"></a>
#### AQFT2-A04 空間的分離を代数へ翻訳
- Level: A

$O_1=D_{1/4}(0,\boldsymbol0)$、$O_2=D_{1/4}(0,(2,0,0))$ とする。二領域が空間的に分離することを示し、Einstein局所性が要求する代数の式を書け。代数がそれぞれ非可換であっても矛盾しない理由を述べよ。

<!-- solution-start -->
**詳細解答**。中心間距離2は半径和 $1/4+1/4=1/2$ より大きいので、[二つのdouble coneの分離定理](../AQFT1/index.md#thm-aqft1-double-cone-separation)より空間的に分離します。したがって任意の $A\in\mathfrak A(O_1)$、$B\in\mathfrak A(O_2)$ に対し $AB=BA$ が必要です。一方 $A,A'\in\mathfrak A(O_1)$ の間で $AA'=A'A$ を要求してはいないため、同一領域の代数が非可換でも構いません。
<!-- solution-end -->

### Level B：仮定と失敗機構を追う

<a id="ex-aqft2-b01"></a>
#### AQFT2-B01 isotony の独立性を再構成
- Level: B

第6節 (I) の $\delta(O)$ を用い、$\mathfrak A_I(D_{1/10})=D$、$\mathfrak A_I(D_2)=\mathbb CI_2$ を不等式から検証せよ。なぜ局所性と共変性はなお保たれるか説明せよ。

<!-- solution-start -->
**詳細解答**。$D_r$ の任意の点は $|t|<r$、$|\boldsymbol x|<r$ なので二点差の時間成分・空間成分はいずれも $2r$ 未満です。従って
$$
|g(p-q,p-q)|\le\max\{|t_p-t_q|^2,|\boldsymbol x_p-\boldsymbol x_q|^2\}<(2r)^2.
$$
$r=1/10$ なら $\delta(D_r)\le1/25<1$ で $D$ が割り当てられます。$r=2$ では $(0,(\pm1,0,0))$ が領域内で、この二点の差は空間成分が2なので $\delta(D_2)\ge4$ です。$D\not\subset\mathbb CI_2$（例えば $\operatorname{diag}(1,-1)$ はスカラーでない）ので isotony を破ります。一方、すべての候補は可換な $D$ の部分環なので局所性を満たし、$\delta(FO)=\delta(O)$ はLorentz計量の不変性で成立するため自明な群作用でも共変です。
<!-- solution-end -->

<a id="ex-aqft2-b02"></a>
#### AQFT2-B02 共変性に必要な全称条件
- Level: B

原点 $p_*$ を使う第6節 (III) の割当てで isotony と局所性を証明し、空間平行移動 $F$ によって共変性が破れることを、具体的な $O$ と元を示して確認せよ。

<!-- solution-start -->
**詳細解答**。$O_1\subset O_2$ なら $p_*\in O_1$ は $p_*\in O_2$ を含意するので $D$ が割り当てられる場合は $D\subset D$、その他は $\mathbb CI_2\subset D$ または $\mathbb CI_2\subset\mathbb CI_2$ です。全ての部分環が対角行列に含まれ、任意の二元が交換するので局所性も成立します。$O=D_{1/10}(p_*)$、$F(t,\boldsymbol x)=(t,\boldsymbol x+(1,0,0))$ なら $\mathfrak A(O)=D$、$\mathfrak A(F(O))=\mathbb CI_2$ です。元 $T=\operatorname{diag}(1,-1)\in D$ は $\alpha_F(T)=T\notin\mathbb CI_2$ なので、共変性で要求する等号は成り立ちません。
<!-- solution-end -->

<a id="ex-aqft2-b03"></a>
#### AQFT2-B03 非可換な各地点と可換な地点間
- Level: B

二地点模型で $p_1,p_2$ をそれぞれ含む、互いに空間的に分離した小さいdouble coneを取る。$X_1=X\otimes I_2$、$Z_1=Z\otimes I_2$、$Z_2=I_2\otimes Z$ として、$[X_1,Z_1]$ と $[X_1,Z_2]$ を求めよ。またこの計算だけでPoincaré共変性まで証明したことになるか判定せよ。

<!-- solution-start -->
**詳細解答**。$p_1,p_2$ の空間距離は4ですから、半径を $1/4$ とすれば和 $1/2<4$ であり、[double coneの分離判定](../AQFT1/index.md#thm-aqft1-double-cone-separation)の仮定を満たします。同じ第1因子の行列は
$$
[X_1,Z_1]=(XZ-ZX)\otimes I_2
=\begin{pmatrix}0&-2\\2&0\end{pmatrix}\otimes I_2\ne0.
$$
異なる因子については
$$
[X_1,Z_2]=(X\otimes I_2)(I_2\otimes Z)
-(I_2\otimes Z)(X\otimes I_2)
=X\otimes Z-X\otimes Z=0.
$$
この計算は局所性の仕組みを確認したにすぎません。変換後の領域の代数と $\alpha_F$ の対応を調べていないため共変性の証明ではありません。実際、自明な作用では第5節の反例があります。
<!-- solution-end -->

<a id="ex-aqft2-b04"></a>
#### AQFT2-B04 ノルム閉包まで交換子を保つ
- Level: B

$\mathfrak B$ の二つの*-部分代数 $S,T$ の全ての元が交換すると仮定する。それぞれのノルム閉包 $\overline S,\overline T$ も互いに交換することを証明せよ。この事実が関数netや局所代数の構成でなぜ必要か述べよ。

<!-- solution-start -->
**詳細解答**。$A\in\overline S$、$B\in\overline T$ を選び、$A_n\in S$、$B_n\in T$ で $A_n\to A$、$B_n\to B$ とします。収束列 $(A_n)$ はノルム有界です。$A_nB_n=B_nA_n$ と
$$
\|A_nB_n-AB\|
\le\|A_n\|\|B_n-B\|+\|A_n-A\|\|B\|\to0
$$
から $A_nB_n\to AB$ が従います。同じ評価を逆順の積へ適用して $B_nA_n\to BA$ です。両列は各 $n$ で等しいので $AB=BA$ です。有限個の生成元だけで局所性を確かめた後、ノルム閉包で完成したC*-環へ性質を移す際にこの議論が必要です。
<!-- solution-end -->

### Level C：三公理を同時に判定する

<a id="ex-aqft2-c01"></a>
#### AQFT2-C01 同じ時空で三模型を比較
- Level: C

$\mathfrak B=M_2(\mathbb C)$、$D$ を対角部分環、$\alpha_F=\mathrm{id}$ とする。全開集合上の次の割当てを考える（空領域ではいずれも $\mathbb CI_2$ とする）。

1. 非空領域に常に $M_2(\mathbb C)$ を割り当てる模型。
2. 原点 $p_*$ を含むとき $D$、含まないとき $\mathbb CI_2$ を割り当てる模型。
3. 非空領域の $\delta(O)=\sup_{p,q\in O}|g(p-q,p-q)|$ が1未満なら $D$、それ以外は $\mathbb CI_2$ を割り当てる模型。

各模型について isotony、Einstein局所性、Poincaré共変性の成否をすべて判定し、失敗するものには明示的な領域・行列・変換を挙げよ。最後に「三条件を満たすと局所代数は非可換になる」という主張の真偽を判定せよ。

<!-- solution-start -->
**詳細解答**。

(1) $O_1\subset O_2$ なら非空の場合は $M_2\subset M_2$、$O_1=\varnothing$ の場合は $\mathbb CI_2\subset\mathfrak A(O_2)$ で isotony は成立します。変換は空集合・非空集合の別を保つので自明な $\alpha_F$ について共変です。しかし $D_{1/10}(0,\boldsymbol0)$ と $D_{1/10}(0,(1,0,0))$ は中心距離1、半径和 $1/5$ より空間的に分離します。双方の元 $X,Z$ は
$$
[X,Z]=\begin{pmatrix}0&-2\\2&0\end{pmatrix}\ne0
$$
なので局所性に失敗します。

(2) $O_1\subset O_2$ で $p_*\in O_1$ なら双方 $D$、そうでないなら小領域はスカラー環です。従って isotony。どちらの局所代数も可換な $D$ に含まれるので局所性も成立します。ところが $O=D_{1/10}(p_*)$ を1だけ空間方向に平行移動すると、元 $T=\operatorname{diag}(1,-1)\in\mathfrak A(O)$ は $\alpha_F(T)=T$ ですが $\mathfrak A(FO)=\mathbb CI_2$ に属しません。共変性は失敗します。

(3) $\delta(FO)=\delta(O)$ は[AQFT1で使ったLorentz計量の不変性](../../../物理系/SREL/SREL2/index.md#thm-srel2-interval-invariance)により成立するため共変です。全ての局所代数は $D$ の部分環なので局所性を満たします。しかし $D_{1/10}\subset D_2$ に対し
$$
\delta(D_{1/10})\le1/25<1,\qquad
\delta(D_2)\ge4>1
$$
であり、$D\not\subset\mathbb CI_2$ なので isotony に失敗します。

従って各模型の成否を順に（isotony、局所性、共変性）で記せば、(1) は（成立、不成立、成立）、(2) は（成立、成立、不成立）、(3) は（不成立、成立、成立）です。最後の主張は**偽**です。[可換関数netの定理](#thm-aqft2-commutative-model)が三条件を満たしつつ各局所代数は可換であるという反例になります。$\square$
<!-- solution-end -->

## 9. この先に必要な仮定

今回は領域とC*-環の対応を規則化しただけです。**三公理は状態を一つも選びません。** 正エネルギー、真空の不変性・一意性、加法性、time-slice条件などを結論へ忍ばせてはいけません。例えば可換関数netでは局所性が成り立っても「量子真空が存在する」という結論は出てきません。

次の **AQFT3「状態・共変表現・正エネルギー真空」** では、[OA5で学んだ状態とGNS構成](../../OA/OA5/index.md#thm-oa5-gns-construction)を局所netへ適用し、Poincaré群の表現とエネルギーのスペクトル条件を**追加の仮定として**導入します。