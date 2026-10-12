# CM1-04 (1,0)・(0,1)接空間への複素化分解

<!-- definition-example-audit: strict -->

## 1. 実接空間に二種類の複素方向が現れる

[前章の概複素構造](../CM1-03/index.md#def-cm1-03-almost-complex)は、実接空間の各点で $J^2=-I$ を満たす。従って $J$ は方向を90度回すように働く。しかし実ベクトルだけを使う限り、$Jv=iv$ と書くことはできない。右辺の $i$ 倍は実接空間のスカラー倍ではないからである。

そこで **実接空間のスカラーを複素数に広げる**。すると $J$ は固有値 $i$ と $-i$ を持ち、複素化した接空間が二つの固有空間に分かれる。この分解により、後に複素形式を $(p,q)$ 型に分ける準備ができる。一方、固有空間が存在するという線形代数的事実だけでは、それらを正則座標の方向として積分できるとは限らない。

## 2. 複素化と実ベクトルの復元

$V$ を実次元 $2n$ の実ベクトル空間とする。実基底 $e_1,\ldots,e_{2n}$ を固定すると、各 $v\in V$ は実係数で表示される。係数を複素数に広げた空間を考える。

<a id="def-cm1-04-complexification"></a>
<!-- formal-statement-start -->
> **定義（実ベクトル空間の複素化）**  
> 実ベクトル空間 $V$ のスカラーを複素数へ拡張して得られる空間

$$
V_{\mathbb C}=V\otimes_{\mathbb R}\mathbb C
$$

> を複素化という。$V$ の実基底 $e_1,\ldots,e_d$ は複素化後も基底になる。$V_{\mathbb C}$ の任意の元は $u+iv$（$u,v\in V$）と一意に書ける。この表現に対し共役を次で定める。

$$
\overline{u+iv}=u-iv.
$$

> ここで $zv$ はテンソル $v\otimes z$ の略記である。
<!-- formal-statement-end -->

<!-- definition-example-start: def-cm1-04-complexification -->
**定義の確認**。$V=\mathbb R^2$ の基底を $e_x,e_y$ とすると $V_{\mathbb C}\cong\mathbb C^2$ である。例えば $w=(2+i)e_x+(1-3i)e_y$ は
$$
w=(2e_x+e_y)+i(e_x-3e_y)
$$
と一意に表され、$\overline w=(2-i)e_x+(1+3i)e_y$ となる。共役で変わらない元は、虚部が零の元、すなわち元の $V$ に限る。
<!-- definition-example-end -->

複素化は「$V$ に新しい点を加える」のでなく、同じ実基底に対して複素係数を許す構成である。特に $\dim_{\mathbb C}V_{\mathbb C}=\dim_{\mathbb R}V=2n$ であり、複素次元が $n$ になるわけではない。次に半分の次元を持つ二つの部分空間へ分ける。

## 3. $J$ の固有空間と二つの射影

実線形写像 $J:V\to V$ が $J^2=-I$ を満たすとする。複素化上での作用を
$$
J_{\mathbb C}(u+iv)=Ju+iJv
$$
と定める。これは複素線形で、$J_{\mathbb C}^2=-I$ を満たす。以後、混乱がなければ $J_{\mathbb C}$ を $J$ と書く。

固有値 $i$ の方向を $(1,0)$ 型、固有値 $-i$ の方向を $(0,1)$ 型として区別したい。

<a id="def-cm1-04-type-spaces"></a>
<!-- formal-statement-start -->
> **定義（概複素構造の二つの固有空間）**  
> $V$ を実次元 $2n$ の実ベクトル空間、$J:V\to V$ を $J^2=-I$ を満たす実線形写像とする。$V_{\mathbb C}$ において
>
$$
V^{1,0}=\{w\in V_{\mathbb C}:J_{\mathbb C}w=iw\},
\qquad
V^{0,1}=\{w\in V_{\mathbb C}:J_{\mathbb C}w=-iw\}
$$
>
> と定める。$(1,0)$ と $(0,1)$ は固有値による **型** の名前であり、二つの空間はともに複素ベクトル空間である。
<!-- formal-statement-end -->

<!-- definition-example-start: def-cm1-04-type-spaces -->
**定義の確認**。$V=\mathbb R^2$、$Je_x=e_y$、$Je_y=-e_x$ とする。$Z=(e_x-ie_y)/2$ に作用させると
$$
JZ=(e_y+ie_x)/2=i(e_x-ie_y)/2=iZ.
$$
よって $Z\in V^{1,0}$。一方 $\overline Z=(e_x+ie_y)/2$ は $J\overline Z=-i\overline Z$ を満たすから $V^{0,1}$ に属する。
<!-- definition-example-end -->

任意の複素化ベクトルをこの二種類へ機械的に分けるには射影を使う。

<a id="thm-cm1-04-splitting"></a>
<!-- formal-statement-start -->
> **定理（複素化の型分解と射影公式）**  
> $V$ を実次元 $2n$ の実ベクトル空間、$J:V\to V$ を実線形かつ $J^2=-I$ とする。$V_{\mathbb C}$ 上の複素線形写像
>
$$
P^{1,0}=\frac12(I-iJ_{\mathbb C}),\qquad
P^{0,1}=\frac12(I+iJ_{\mathbb C})
$$
>
> はそれぞれ $V^{1,0},V^{0,1}$ への射影であり、
>
$$
V_{\mathbb C}=V^{1,0}\oplus V^{0,1},
\qquad
\dim_{\mathbb C}V^{1,0}
=\dim_{\mathbb C}V^{0,1}=n.
$$
>
> さらに $\overline{V^{1,0}}=V^{0,1}$ であり、実ベクトル $v$ は $v=P^{1,0}v+P^{0,1}v$ により復元される。
<!-- formal-statement-end -->

### 証明の見取り図

$J^2=-I$ を二つの射影の積に代入すると、交差する方向が消え、和は恒等写像になる。固有値が反対符号であるため交わりは零で、共役が二つを交換するため次元は等しい。

<!-- proof-start -->
### 証明

$J=J_{\mathbb C}$ と略記する。$J^2=-I$ から
$$
\begin{aligned}
(P^{1,0})^2
&=\tfrac14(I-2iJ+i^2J^2)
=\tfrac14(2I-2iJ)=P^{1,0},\\
(P^{0,1})^2
&=\tfrac14(I+2iJ+i^2J^2)
=\tfrac14(2I+2iJ)=P^{0,1},\\
P^{1,0}P^{0,1}
&=\tfrac14(I-iJ)(I+iJ)
=\tfrac14(I+J^2)=0,\\
P^{1,0}+P^{0,1}&=I.
\end{aligned}
$$

$JP^{1,0}=\frac12(J-iJ^2)=\frac12(J+iI)=iP^{1,0}$ なので $\operatorname{im}P^{1,0}\subset V^{1,0}$。逆に $Jw=iw$ なら
$$
P^{1,0}w=\tfrac12(w-i(iw))=w.
$$
ゆえに $\operatorname{im}P^{1,0}=V^{1,0}$。$JP^{0,1}=-iP^{0,1}$ と $Jw=-iw\Rightarrow P^{0,1}w=w$ も同じ式を符号を反転して確かめられる。

任意の $w$ は $w=P^{1,0}w+P^{0,1}w$ と分解できる。もし $w$ が両方の固有空間に属するなら $iw=Jw=-iw$ より $2iw=0$、従って $w=0$。これが直和である。

$J$ は実係数なので $\overline{Jw}=J\overline w$。$Jw=iw$ の共役を取ると
$$
J\overline w=\overline{Jw}=\overline{iw}=-i\overline w.
$$
共役は可逆な反線形写像なので二つの固有空間を互いに移す。よって複素次元は等しい。それらの次元の和は $\dim_{\mathbb C}V_{\mathbb C}=2n$ だから両方とも $n$。実 $v$ に対する復元式も射影の和から従う。$\square$
<!-- proof-end -->

**符号を間違えない確認**。$P^{1,0}v=(v-iJv)/2$ には固有値 $+i$ が対応する。式中の $-i$ と固有値の $+i$ は反対符号になる。共役を取ると
$$
\overline{P^{1,0}v}=P^{0,1}v
$$
となる。$P^{1,0}v=0$ かつ $v$ が実なら、共役により $P^{0,1}v=0$ でもあるから $v=0$。従って実方向はどちらの型にも単独では入らない。

## 4. 接束への貼り合わせと複素座標の基底

$(M,J)$ を[概複素多様体](../CM1-03/index.md#def-cm1-03-almost-complex)とし、各点で $V=T_pM$ と置く。各 $p$ における射影を $P_p^{1,0},P_p^{0,1}$ とする。

<a id="def-cm1-04-tangent-subbundles"></a>
<!-- formal-statement-start -->
> **定義（型別複素接束）**  
> 実次元 $2n$ の滑らかな概複素多様体 $(M,J)$ に対し、複素化接束
>
$$
T_{\mathbb C}M=TM\otimes_{\mathbb R}\mathbb C
$$
>
> の各点で $(T_pM)^{1,0}$ および $(T_pM)^{0,1}$ を集めたものを、それぞれ $T^{1,0}M,T^{0,1}M$ と記す。
<!-- formal-statement-end -->

<!-- definition-example-start: def-cm1-04-tangent-subbundles -->
**定義の確認**。$M=\mathbb R^2$、$J=R$ を全点で同じ行列とすると、各点の $(1,0)$ 型は複素ベクトル $Z=(\partial_x-i\partial_y)/2$ の複素数倍全体になる。$Z$ は全点で滑らかに定義され、$(0,1)$ 型はその共役の複素数倍全体である。
<!-- definition-example-end -->

<a id="prop-cm1-04-smooth-bundles"></a>
<!-- formal-statement-start -->
> **命題（型別接束の滑らかさ）**  
> $(M,J)$ が実次元 $2n$ の滑らかな概複素多様体なら、$T^{1,0}M$ と $T^{0,1}M$ はともに複素階数 $n$ の滑らかな複素ベクトル部分束であり、各点での型分解は束の直和
>
$$
T_{\mathbb C}M=T^{1,0}M\oplus T^{0,1}M
$$
>
> を与える。ここでは正則座標の存在を仮定しない。
<!-- formal-statement-end -->

### 証明の見取り図

[GEO2の接束の滑らかな構造](../../GEO/GEO2/index.md#thm-geo2-tangent-bundle-smooth)を使い、実接束の局所基底を射影して複素化接束の局所基底を作る。$J$ が滑らかなので射影の係数も滑らかであり、点で独立な像は近傍でも独立である。

<!-- proof-start -->
### 証明

$p\in M$ で実ベクトル $e_1,\ldots,e_n$ を選び、$e_1,Je_1,\ldots,e_n,Je_n$ が $T_pM$ の実基底となるようにする。この選択は、$J$ を複素数 $i$ の作用と見て基底を取る通常の有限次元線形代数による。

[GEO2の接束の局所自明化](../../GEO/GEO2/index.md#thm-geo2-tangent-bundle-smooth)により、点 $p$ の各 $e_k$ を近傍の各点へ滑らかに延長できる。得られる接ベクトルを $E_k$ と書く。例えば、実座標基底に対する各 $e_k$ の係数を一定に保てばよい。

$J$ は滑らかなので $JE_k$ も滑らかに変化する。点 $p$ ではこれらが実基底だったから、近傍を縮めると

$$
E_1,JE_1,\ldots,E_n,JE_n
$$

はすべての点で実基底となる。

$$
Z_k=P^{1,0}E_k=\tfrac12(E_k-iJE_k),
\qquad
\overline Z_k=P^{0,1}E_k=\tfrac12(E_k+iJE_k)
$$

は $J$ の滑らかさにより各点で滑らかに変化する複素化接ベクトルとなる。もし $\sum_k a_kZ_k=0$（$a_k\in\mathbb C$）なら、その共役基底も加えた全体が $T_qM\otimes\mathbb C$ の基底であることから $a_k=0$。実際、この全体は
$$
E_k=Z_k+\overline Z_k,\qquad
JE_k=iZ_k-i\overline Z_k
$$
という可逆な基底変換で実基底の複素化から得られる。従って各型は複素階数 $n$ の滑らかな部分束になる。点ごとの直和性は[型分解定理](#thm-cm1-04-splitting)による。$\square$
<!-- proof-end -->

複素多様体 $X$ の[標準概複素構造](../CM1-03/index.md#thm-cm1-03-induced-j)を用いると、この複素接基底は特に分かりやすい。複素座標 $z^k=x^k+iy^k$ で
$$
\frac{\partial}{\partial z^k}
=\frac12\left(\frac{\partial}{\partial x^k}
-i\frac{\partial}{\partial y^k}\right),
\qquad
\frac{\partial}{\partial\overline z^k}
=\frac12\left(\frac{\partial}{\partial x^k}
+i\frac{\partial}{\partial y^k}\right)
$$
と置く。これは **実接空間内の方向微分ではなく、複素化した接空間の基底ベクトル** である。$J\partial_{x^k}=\partial_{y^k}$、$J\partial_{y^k}=-\partial_{x^k}$ を代入すると
$$
J\frac{\partial}{\partial z^k}
=i\frac{\partial}{\partial z^k},
\qquad
J\frac{\partial}{\partial\overline z^k}
=-i\frac{\partial}{\partial\overline z^k}.
$$

逆変換は
$$
\partial_{x^k}=\partial_{z^k}+\partial_{\overline z^k},
\qquad
\partial_{y^k}=i\partial_{z^k}-i\partial_{\overline z^k}.
$$
この公式は微分作用素にも作用させられる。実 $C^1$ 級の複素値関数 $f$ について $\partial_{z^k}f=(\partial_{x^k}f-i\partial_{y^k}f)/2$ などであり、$z^j$ に作用させれば $\partial_{z^k}z^j=\delta_{kj}$、$\partial_{\overline z^k}z^j=0$ となる。

## 5. 正則写像が保存するのはどちらの方向か

[前章の正則写像の可換条件](../CM1-03/index.md#thm-cm1-03-holomorphic-intertwining)を、固有空間の言葉で読み直す。実線形写像の複素化は、複素線形になることに注意する。

<a id="thm-cm1-04-type-preservation"></a>
<!-- formal-statement-start -->
> **定理（概複素構造との可換条件と型の保存）**  
> $(M,J_M),(N,J_N)$ を滑らかな概複素多様体とし、$f:M\to N$ を実 $C^1$ 級写像とする。各点 $p$ における $df_p$ の複素化を $d_{\mathbb C}f_p$ とする。次は同値である。
>
> 1. $df_pJ_M=J_Ndf_p$ がすべての $p$ で成り立つ。
> 2. $d_{\mathbb C}f_p((T_pM)^{1,0})\subset (T_{f(p)}N)^{1,0}$ と $d_{\mathbb C}f_p((T_pM)^{0,1})\subset (T_{f(p)}N)^{0,1}$ がすべての $p$ で成り立つ。
>
> $M,N$ が複素多様体の標準構造を持つ場合、これらは $f$ が正則であることと同値である。
<!-- formal-statement-end -->

### 証明の見取り図

可換条件があれば $i$ 固有ベクトルの像も $i$ 固有ベクトルになる。逆は、複素化が二つの固有空間の直和であることを使い、各成分で可換性を確かめてから実ベクトルへ戻す。

<!-- proof-start -->
### 証明

(1) を仮定し、$J_Mw=iw$ とする。実微分の可換式を複素化して
$$
J_N(d_{\mathbb C}f_p w)
=d_{\mathbb C}f_p(J_Mw)
=d_{\mathbb C}f_p(iw)
=i\,d_{\mathbb C}f_p w
$$
となるので $(1,0)$ 型は保存される。$J_Mw=-iw$ なら最後の符号だけ反転し、$(0,1)$ 型も保存される。

(2) を仮定する。[複素化の型分解と射影公式](#thm-cm1-04-splitting)を点 $p$ の接空間へ適用する。任意の $w\in T_pM\otimes\mathbb C$ は $w=w_++w_-$ と一意に分解できる。$d_{\mathbb C}f_p w_+$ は $i$ 固有空間に、$d_{\mathbb C}f_p w_-$ は $-i$ 固有空間に入るため
$$
\begin{aligned}
J_Nd_{\mathbb C}f_p(w)
&=i\,d_{\mathbb C}f_p(w_+)-i\,d_{\mathbb C}f_p(w_-)\\
&=d_{\mathbb C}f_p(iw_+-iw_-)
=d_{\mathbb C}f_p(J_Mw).
\end{aligned}
$$
特に $w$ を実接ベクトルとすれば元の可換条件が成立する。複素多様体の場合の正則性との同値性は[前章の定理](../CM1-03/index.md#thm-cm1-03-holomorphic-intertwining)による。$\square$
<!-- proof-end -->

逆に複素共役写像 $c(z)=\overline z$ は標準の $J$ に対して $dc\,J=-J\,dc$ を満たす。従って $i$ 固有空間を $-i$ 固有空間へ送る。**型の入れ替えと型の保存を混同しない**ことが大切である。

## 6. 二つの限界と次章への接続

ここまでで、任意の滑らかな概複素構造は接空間を二つの型へ分解することが分かった。しかしこの結果は点ごとの線形代数と滑らかな束の構成であり、$T^{1,0}M$ が正則座標の $\partial/\partial z^k$ によって大域的・局所的に生成されることまでは主張していない。座標由来の $J$ と任意の $J$ の違いを消してはいけない。

複素座標が既にある場合は、その間の[正則遷移写像](../CM1-01/index.md#def-cm1-01-atlas)の微分が型を保つ。次章では、この型別基底が重なりでどの行列によって変換されるかを調べる。

## 7. 演習

$J$ の作用を複素線形に拡張してから計算すること。特に $1/2$、$i$ の符号、型保存の始点と終点を明示する。

### Level A

<a id="ex-cm1-04-a01"></a>
#### CM1-04-A01 複素化と共役
- Level: A

$V=\mathbb R^2$ で $w=(1+2i)e_1+(3-i)e_2$ を $u+iv$ に分け、$\overline w$ と $(w+\overline w)/2$ を計算せよ。

<!-- solution-start -->
**詳細解答**。実部と虚部の係数を分けると
$$
u=e_1+3e_2,\qquad v=2e_1-e_2,\qquad w=u+iv.
$$
[複素化の定義](#def-cm1-04-complexification)より $\overline w=u-iv=(1-2i)e_1+(3+i)e_2$。従って $(w+\overline w)/2=u=e_1+3e_2$ は元の実ベクトル空間の元である。
<!-- solution-end -->

<a id="ex-cm1-04-a02"></a>
#### CM1-04-A02 射影の符号
- Level: A

$Je_x=e_y$、$Je_y=-e_x$ に対して $P^{1,0}e_x$ と $P^{0,1}e_x$ を求め、各固有値を直接確かめよ。

<!-- solution-start -->
**詳細解答**。[射影公式](#thm-cm1-04-splitting)に $v=e_x$ を代入すると
$$
P^{1,0}e_x=\frac12(e_x-i e_y),\qquad
P^{0,1}e_x=\frac12(e_x+i e_y).
$$
前者へ $J$ を掛けると $(e_y+i e_x)/2=i(e_x-i e_y)/2$、後者へ掛けると $(e_y-i e_x)/2=-i(e_x+i e_y)/2$。よって順に固有値 $i,-i$ を持つ。
<!-- solution-end -->

<a id="ex-cm1-04-a03"></a>
#### CM1-04-A03 共役と型
- Level: A

$w\in V^{1,0}$ に対し $\overline w\in V^{0,1}$ を、$J$ の実線形性だけから示せ。また $V^{1,0}\cap V$ を求めよ。

<!-- solution-start -->
**詳細解答**。$Jw=iw$ を共役にすると
$$
J\overline w=\overline{Jw}=\overline{iw}=-i\overline w.
$$
従って共役は型を交換する。$w\in V^{1,0}\cap V$ なら $\overline w=w$ なので両型に属する。[直和定理](#thm-cm1-04-splitting)より交わりは $\{0\}$ だから $w=0$。
<!-- solution-end -->

<a id="ex-cm1-04-a04"></a>
#### CM1-04-A04 複素座標の微分
- Level: A

$\mathbb C$ の $z=x+iy$ に対して $\partial_z z$、$\partial_{\bar z}z$、$\partial_z\bar z$、$\partial_{\bar z}\bar z$ を導け。

<!-- solution-start -->
**詳細解答**。定義から $\partial_z=(\partial_x-i\partial_y)/2$、$\partial_{\bar z}=(\partial_x+i\partial_y)/2$。$\partial_x z=1$、$\partial_yz=i$ を代入して
$$
\partial_z z=\tfrac12(1-i^2)=1,\qquad
\partial_{\bar z}z=\tfrac12(1+i^2)=0.
$$
$\partial_x\bar z=1$、$\partial_y\bar z=-i$ を代入すると
$$
\partial_z\bar z=\tfrac12(1-i(-i))=0,\qquad
\partial_{\bar z}\bar z=\tfrac12(1+i(-i))=1.
$$
<!-- solution-end -->

<a id="ex-cm1-04-a05"></a>
#### CM1-04-A05 二つの型の次元
- Level: A

$V=\mathbb R^6$ が $J^2=-I$ を満たすとき、$V_{\mathbb C}$、$V^{1,0}$、$V^{0,1}$ の複素次元を求め、理由を述べよ。

<!-- solution-start -->
**詳細解答**。実基底6個は複素化後も複素基底だから $\dim_{\mathbb C}V_{\mathbb C}=6$。共役写像が両型を交換するので次元が等しく、[型分解定理](#thm-cm1-04-splitting)から両次元の和が6である。よって各型は複素次元3となる。複素化そのものを3次元とするのは誤りである。
<!-- solution-end -->

### Level B

<a id="ex-cm1-04-b01"></a>
#### CM1-04-B01 一般の実ベクトルの型分解
- Level: B

標準構造 $Je_x=e_y$、$Je_y=-e_x$ を持つ $V=\mathbb R^2$ で、$v=3e_x-2e_y$ を $v^{1,0}+v^{0,1}$ に分解し、共役と直和を確認せよ。

<!-- solution-start -->
**詳細解答**。まず $Jv=3e_y+2e_x$ である。[射影公式](#thm-cm1-04-splitting)へ代入すると
$$
\begin{aligned}
v^{1,0}&=\frac12(v-iJv)
=\frac12\{(3-2i)e_x+(-2-3i)e_y\},\\
v^{0,1}&=\frac12(v+iJv)
=\frac12\{(3+2i)e_x+(-2+3i)e_y\}.
\end{aligned}
$$
係数を共役すると $\overline{v^{1,0}}=v^{0,1}$。和を取ると $e_x$ の係数は $3$、$e_y$ の係数は $-2$ で、元の $v$ を復元する。また両者がそれぞれ $i,-i$ 固有ベクトルであることは射影公式の証明から従う。
<!-- solution-end -->

<a id="ex-cm1-04-b02"></a>
#### CM1-04-B02 ねじれた実座標の固有方向
- Level: B

$\mathbb R^2$ の実座標 $(u,v)=(2x,y)$ において、[複素多様体から誘導される標準概複素構造](../CM1-03/index.md#thm-cm1-03-induced-j)の共役表示を使うと
$$
J=\begin{pmatrix}0&-2\\1/2&0\end{pmatrix}
$$
となる。$\partial_u$ を型分解し、$J$ の固有方向を見つけよ。$\partial_u$ 自体を $(1,0)$ 型と呼べない理由も述べよ。

<!-- solution-start -->
**詳細解答**。行列を $\partial_u=(1,0)^T$ に適用すると $J\partial_u=\frac12\partial_v$。従って
$$
P^{1,0}\partial_u
=\frac12\partial_u-\frac{i}{4}\partial_v,\qquad
P^{0,1}\partial_u
=\frac12\partial_u+\frac{i}{4}\partial_v.
$$
前者を $Z$ と置き、行列を使って
$$
JZ=\frac14\partial_v-\frac{i}{4}(-2\partial_u)
=\frac{i}{2}\partial_u+\frac14\partial_v=iZ
$$
と確認できる。後者は共役だから固有値 $-i$ を持つ。$\partial_u$ は実ベクトルかつ零でないので、[型分解定理](#thm-cm1-04-splitting)により片方の固有空間だけには属さない。実座標の基底と複素化の固有基底を取り違えてはいけない。
<!-- solution-end -->

<a id="ex-cm1-04-b03"></a>
#### CM1-04-B03 正則写像の型保存を直接計算
- Level: B

$f:\mathbb C^2\to\mathbb C$、$f(z^1,z^2)=z^1+(z^2)^2$ とする。標準複素構造について、$d_{\mathbb C}f(\partial_{z^1})$、$d_{\mathbb C}f(\partial_{z^2})$、$d_{\mathbb C}f(\partial_{\bar z^1})$、$d_{\mathbb C}f(\partial_{\bar z^2})$ を終点の基底で求めよ。

<!-- solution-start -->
**詳細解答**。終点座標を $w=f(z^1,z^2)$ とし、複素化微分は実関数の連鎖律を $\mathbb C$ 線形に拡張したものである。$w$ と $\bar w$ の偏微分係数を並べると
$$
d_{\mathbb C}f(\partial_{z^k})
=(\partial_{z^k}w)\partial_w
+(\partial_{z^k}\bar w)\partial_{\bar w}.
$$
$w=z^1+(z^2)^2$、$\bar w=\bar z^1+(\bar z^2)^2$ より
$$
\partial_{z^1}w=1,\quad
\partial_{z^2}w=2z^2,\quad
\partial_{z^k}\bar w=0.
$$
よって
$$
d_{\mathbb C}f(\partial_{z^1})=\partial_w,\qquad
d_{\mathbb C}f(\partial_{z^2})=2z^2\partial_w.
$$
同様に $\partial_{\bar z^k}w=0$、$\partial_{\bar z^1}\bar w=1$、$\partial_{\bar z^2}\bar w=2\bar z^2$ だから
$$
d_{\mathbb C}f(\partial_{\bar z^1})=\partial_{\bar w},\qquad
d_{\mathbb C}f(\partial_{\bar z^2})=2\bar z^2\partial_{\bar w}.
$$
[型保存定理](#thm-cm1-04-type-preservation)どおり、$(1,0)$ 型の像には $\partial_{\bar w}$ 成分がない。
<!-- solution-end -->

<a id="ex-cm1-04-b04"></a>
#### CM1-04-B04 型を入れ替える実線形写像
- Level: B

$f:\mathbb C\to\mathbb C$、$f(z)=\bar z$ とする。$d_{\mathbb C}f$ が $\partial_z$ と $\partial_{\bar z}$ を交換することを直接計算し、正則写像の型保存との違いを説明せよ。

<!-- solution-start -->
**詳細解答**。始点 $z=x+iy$、終点 $w=s+it$ とすると $s=x$、$t=-y$。従って
$$
df(\partial_x)=\partial_s,\qquad
df(\partial_y)=-\partial_t.
$$
複素線形に拡張すると
$$
\begin{aligned}
d_{\mathbb C}f(\partial_z)
&=\tfrac12(\partial_s+i\partial_t)=\partial_{\bar w},\\
d_{\mathbb C}f(\partial_{\bar z})
&=\tfrac12(\partial_s-i\partial_t)=\partial_w.
\end{aligned}
$$
$(1,0)$ の像が $(0,1)$ に入り逆も同様なので、[型保存定理](#thm-cm1-04-type-preservation)の条件(2)を満たさない。これは実 $C^\infty$ 級写像だが正則ではない。実微分の可逆性だけでは型は保存されない。
<!-- solution-end -->

### Level C

<a id="ex-cm1-04-c01"></a>
#### CM1-04-C01 二つの概複素構造と型の保存の総合
- Level: C

始点 $M=\mathbb R^2$ に $J_M=R=\begin{pmatrix}0&-1\\1&0\end{pmatrix}$、終点 $N=\mathbb R^2$ に
$$
J_N=ARA^{-1},\qquad A=\begin{pmatrix}2&0\\0&1\end{pmatrix}
$$
を与える。実線形写像 $f(x,y)=A(x,y)=(2x,y)$ について次を求めよ。

1. $J_N$ と $df$ を求め、$J_N^2=-I$、$dfJ_M=J_Ndf$ を行列で示す。
2. 始点の $Z=P_M^{1,0}e_x$ と終点の $W=P_N^{1,0}e_u$ を求め、$d_{\mathbb C}f(Z)$ が $W$ の複素数倍であることを確かめる。
3. $d_{\mathbb C}f(\overline Z)$ を求め、その型を判定する。
4. 終点の構造を誤って $R$ に置いた場合の可換条件を検査し、この誤りが何を意味するか説明する。

<!-- solution-start -->
**詳細解答**。

**1. 二つの実構造と微分**。行列積を順に計算すると
$$
AR=\begin{pmatrix}0&-2\\1&0\end{pmatrix},\qquad
A^{-1}=\begin{pmatrix}1/2&0\\0&1\end{pmatrix},
\qquad
J_N=ARA^{-1}=\begin{pmatrix}0&-2\\1/2&0\end{pmatrix}.
$$
従って
$$
J_N^2=\begin{pmatrix}-1&0\\0&-1\end{pmatrix},\quad
df= A,\quad
dfJ_M=AR=\begin{pmatrix}0&-2\\1&0\end{pmatrix},
$$
また $J_Ndf=ARA^{-1}A=AR$ なので可換条件を満たす。

**2. $(1,0)$ 型の像**。始点の基底 $e_x,e_y$、終点の基底 $e_u,e_v$ を区別する。[射影公式](#thm-cm1-04-splitting)より
$$
Z=P_M^{1,0}e_x=\tfrac12(e_x-ie_y).
$$
終点では $J_Ne_u=\tfrac12e_v$ なので
$$
W=P_N^{1,0}e_u=\tfrac12e_u-\tfrac{i}{4}e_v.
$$
一方 $df(e_x)=2e_u$、$df(e_y)=e_v$ である。従って
$$
d_{\mathbb C}f(Z)
=\tfrac12(2e_u-ie_v)
=e_u-\tfrac{i}{2}e_v
=2W.
$$
像は $(1,0)$ 型であり、[型保存定理](#thm-cm1-04-type-preservation)と一致する。

**3. 共役型の像**。$df$ は実係数なので共役と可換であり
$$
d_{\mathbb C}f(\overline Z)
=\overline{d_{\mathbb C}f(Z)}
=2\overline W=e_u+\tfrac{i}{2}e_v.
$$
$\overline W$ は終点の $-i$ 固有ベクトルだから、像は $(0,1)$ 型に属する。

**4. 終点の取り違え**。もし終点の構造を $R$ と置けば
$$
R\,df=RA=\begin{pmatrix}0&-1\\2&0\end{pmatrix},
\qquad
df\,R=AR=\begin{pmatrix}0&-2\\1&0\end{pmatrix},
$$
で不一致となる。この失敗は写像 $f$ の型保存が壊れたという意味ではなく、終点で指定された $J_N$ の代わりに別の構造 $R$ を使ってしまったことによる。始点・終点それぞれの固有空間を照合する必要がある。
<!-- solution-end -->

---

## 8. 次章で使う道具

本章で作った二つの射影、固有空間の直和、複素座標での $\partial_{z^k}$ と $\partial_{\bar z^k}$ は、型の違いを座標に依存せず記述するための道具である。次の CM1-05 では正則座標を変えた際、これらの基底が複素Jacobi行列に従って変換されることを確かめる。

理解の核は **複素化で次元は $2n$ のまま、$i$ と $-i$ の固有空間がそれぞれ複素次元 $n$ になること**、および **正則性が二つの型の保存として表現されること** である。
