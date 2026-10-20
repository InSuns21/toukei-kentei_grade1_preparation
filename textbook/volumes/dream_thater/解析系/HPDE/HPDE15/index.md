# HPDE15 局所解から大域解への貼り合わせ

[局所Cauchy存在](../HPDE11/index.md#thm-hpde11-local-cauchy)は、各初期点の周りで波動方程式を解けることを保証しました。しかし「各点に解がある」から「一枚の時空上に解がある」へは、もう一段の論証が必要です。別々に構成された解は重なりで等しいのでしょうか。また、時間方向へ解の定義域を伸ばすとき、何が保証されるのでしょうか。

鍵は、**重なりでの一意性を使って解そのものを同一視する**ことです。分割関数で解を足す方法は通常うまくいきません。本章では局所の貼り合わせと有限時間の延長を分けて証明し、HPDE16で行う大域Cauchy問題の構成へ進む準備をします。

## 1. 前提：どの初期面上の情報を共有するか

$(M,g)$ を境界のない時間向き付き滑らかな大域双曲Lorentz多様体（符号 $(-,+,\ldots,+)$）、$E\to M$ を有限ランクの滑らかな実または複素ベクトル束、$P:\Gamma(E)\to\Gamma(E)$ を滑らかなnormally hyperbolic作用素とします。[HPDE5の接続表示](../HPDE5/index.md#thm-hpde5-unique-connection)による接続を $\nabla^P$ とします。$f\in\Gamma(M,E)$ は滑らかな源です。形式的自己随伴性は仮定しません。

[LORG20の滑らかな時空分割](../../../幾何系/LORG/LORG20/index.md#thm-lorg20-orthogonal-splitting)を選び、各 $\Sigma_s=t^{-1}(s)$ がCauchy超曲面である滑らかな時間関数 $t$ を固定します。$\Sigma=\Sigma_0$、未来向き単位法線を $N$ と書きます。各点の因果曲線が $\Sigma$ と一度だけ交わることは、[Cauchy超曲面の定義](../../../幾何系/LORG/LORG15/index.md#def-lorg15-cauchy)の役割です。

$\Sigma$ 上の滑らかなデータ $(u_0,u_1)$ を初期変位と法線方向の接続微分とします。解 $u$ は次の三条件を満たします。

$$
Pu=f,\qquad
u|_\Sigma=u_0,\qquad
\nabla^P_Nu|_\Sigma=u_1.
$$

ここで、初期面の開部分集合 $A\subset\Sigma$ から因果的に決定される領域 $D(A)$ は[LORG13の依存領域](../../../幾何系/LORG/LORG13/index.md#def-lorg13-dependence)です。大域双曲時空の中で、$D(A)$ を「すべての過去・未来非延長因果曲線が $A$ を通る点の集合」として扱います。開いた $A$ の場合は、必要に応じて $D(A)$ の内部を使用します。

二つの開集合 $A,B\subset\Sigma$ と点 $q$ について、$q\in D(A)\cap D(B)$ なら、$q$ を通る任意の非延長因果曲線が $\Sigma$ と交わる唯一の点は $A$ にも $B$ にも属します。従ってその点は $A\cap B$ にあり、

$$
D(A)\cap D(B)=D(A\cap B)
$$

となります。この集合恒等式は、重なりの一意性の**適用先**を与えます。ただし局所解がその領域の必要部分に定義されているかは、別に確かめなければなりません。

### 最小模型：右へも左へも伝わる

$1+1$ 次元の平坦波動 $P=\partial_t^2-\partial_x^2$ では、$\Sigma=\{t=0\}$ の区間 $A=(a,b)$ について、定義域の中心部分は

$$
D(A)=\{(t,x):a+|t|<x<b-|t|\}.
$$

これは[d'Alembert公式](../../PDE/PDE4/index.md#thm-pde4-dalembert)からも読み取れます。$u(t,x)$ は初期時刻の $[x-|t|,x+|t|]$ 内のデータにしか依存しないからです。例えば $A=(-2,1)$、$B=(-1,3)$ なら $A\cap B=(-1,1)$ であり、両局所解を一致させられる確実な領域は $|t|<1-|x|$ です。「座標箱の重なり」だけではなく、**その点へ届く初期データの重なり**を見なければなりません。

## 2. 初期面から立ち上がる局所パッチ

貼り合わせで使うパッチは、時空内の任意の開集合ではありません。初期面の開集合 $A$ と、その依存領域の中の短い時間近傍を組にします。そこでは各点へ至る因果曲線を初期面までさかのぼれるので、零データ一意性を適用できます。

<a id="def-hpde15-cauchy-patch"></a>
<!-- formal-statement-start -->
> **定義（Cauchyパッチ）**  
> $(M,g)$ を時間向き付きの滑らかな大域双曲Lorentz時空、$t:M\to\mathbb R$ を各水準面が滑らかな空間的Cauchy超曲面となる滑らかな時間関数、$\Sigma=t^{-1}(0)$ とする。$\Sigma$ の開集合 $A$ と正数 $\varepsilon$ に対し、
>
$$
V(A,\varepsilon)=\operatorname{int}D(A)\cap t^{-1}((-\varepsilon,\varepsilon))
$$
>
> と定める。$E\to M$ を有限ランクの滑らかな実または複素ベクトル束、$P:\Gamma(M,E)\to\Gamma(M,E)$ を滑らかなnormally hyperbolic作用素、$f\in\Gamma(M,E)$ を滑らかな源とする。
> $\Sigma$ 上に滑らかなCauchyデータ $u_0,u_1\in\Gamma(\Sigma,E|_\Sigma)$ を与える。
> $N$ を未来向き単位法線とし、[HPDE5で一意に定まる接続](../HPDE5/index.md#thm-hpde5-unique-connection)に沿う微分を $\nabla^P_N$ と記す。
> $V(A,\varepsilon)$ 上の滑らかな切断 $u_A$ が次を満たすとする。

$$
Pu_A=f,\qquad u_A|_A=u_0|_A,\qquad
\nabla^P_Nu_A|_A=u_1|_A.
$$

> このとき $(A,\varepsilon,u_A)$ を与えられたデータの **Cauchyパッチ**という。
<!-- formal-statement-end -->

<!-- definition-example-start: def-hpde15-cauchy-patch -->
**定義の確認**。Minkowski平面 $(\mathbb R^{1,1},-dt^2+dx^2)$ と自明な実直線束で $P=\partial_t^2-\partial_x^2$、$t$ を標準時間座標、$A=(-2,2)$、$f=0$、$u_0(x)=x$、$u_1(x)=1$ とします。この $P$ の接続は通常の微分で、$t=0$ の未来向き単位法線は $N=\partial_t$ なので、定義の法線条件は $\nabla^P_Nu_A=\partial_tu_A$ として判定できます。

点 $(t,x)$ から初期面へ至る因果曲線の足跡は区間 $[x-|t|,x+|t|]$ に収まります。この区間全体が $A$ に含まれる条件は $-2<x-|t|$ かつ $x+|t|<2$、すなわち $|x|+|t|<2$ です。従って

$
V(A,1)=\{(t,x):|t|<1,\ |x|+|t|<2\}.
$

$u_A(t,x)=x+t$ と置くと、この開領域上で滑らかであり、

$
Pu_A=\partial_t^2(x+t)-\partial_x^2(x+t)=0,\quad
u_A(0,x)=x,\quad
\nabla_N^Pu_A(0,x)=\partial_t(x+t)=1.
$

こうして、**領域が依存領域の短時間帯であること、源の方程式、初期変位、法線方向の接続微分**を定義の各条件と照合できました。
<!-- definition-example-end -->

<a id="lem-hpde15-patch-intersection"></a>
<!-- formal-statement-start -->
> **補題（Cauchyパッチの重なり）**  
> 同じ大域双曲時空 $(M,g)$、同じ滑らかなnormally hyperbolic作用素 $P$、同じ源 $f$、同じ初期データ $(u_0,u_1)$ から得られた二つのCauchyパッチ $(A,\varepsilon_A,u_A)$、$(B,\varepsilon_B,u_B)$ を考える。その定義域の共通部分では $u_A=u_B$ が成り立つ。
<!-- formal-statement-end -->

### 証明の見取り図

二つの解の差 $w=u_A-u_B$ は斉次方程式を満たし、$A\cap B$ で初期変位・法線微分とも零です。重なりは $\operatorname{int}D(A\cap B)$ の短い時間帯なので、[依存領域での一致](../HPDE10/index.md#cor-hpde10-domain-uniqueness)を差 $w$ に適用します。

<!-- proof-start -->
### 証明

$T=\min(\varepsilon_A,\varepsilon_B)$ と置くと、定義域の共通部分は

$$
V(A,\varepsilon_A)\cap V(B,\varepsilon_B)
=\operatorname{int}D(A\cap B)\cap t^{-1}((-T,T)).
$$

$w=u_A-u_B$ はその領域で $Pw=f-f=0$、初期面 $A\cap B$ 上で $w=0$ かつ $\nabla^P_Nw=0$ です。$q$ を共通部分から取り、まず $t(q)\ge0$ とします。$q\in D^+(A\cap B)$ です。任意の $r\in J^-(q)\cap J^+(\Sigma)$ と、$r$ から過去へ延ばした因果曲線を考えます。$r$ から $q$ への因果曲線をその前に連結すると、$q$ から過去へ非延長な因果曲線が得られるため、初期面との交点は $A\cap B$ にあります。従って $r\in D^+(A\cap B)$ です。また $0\le t(r)\le t(q)<T$ なので、因果的な足跡全体 $C_q=J^-(q)\cap J^+(\Sigma)$ は両解の共通定義域に含まれます。

これで[HPDE10の依存領域一致定理](../HPDE10/index.md#cor-hpde10-domain-uniqueness)の「源が $C_q$ 上で一致し、初期面の足跡上で二つのCauchyデータが一致する」という適用条件が確認でき、$w(q)=0$ です。$t(q)\le0$ なら因果の向きを逆にした同じ論証を使います。$q$ は任意なので重なり全体で一致します。$\square$
<!-- proof-end -->

**なぜ「同じ初期値」だけでは足りないか。** 初期値が等しいのが $A\cap B$ の外側であっても、$q$ の足跡がそこまで達すれば、重なりでの等しさは結論できません。一方、上の補題は $D(A)\cap D(B)$ へ領域を縮めることで不足を取り除きます。

## 3. コンパクト部分の上では有限個のパッチで足りる

任意の初期点での[HPDE11の局所存在](../HPDE11/index.md#thm-hpde11-local-cauchy)から、最初は点ごとに異なる小さい時空近傍 $W_p$ 上でしか解がありません。$p$ を含む相対コンパクトな初期面開集合 $A_p$ を十分縮め、$D(A_p)$ の短い帯が $W_p$ に含まれるように選べます。ここでは $W_p$ が開き、時間座標と因果速度がその小さい座標箱上で有界であることを使います。

この縮小の意味をもう少し詳しく確かめます。$W_p$ 内に、$p$ を囲む小さい閉座標箱と、その周りのより大きい開箱を取ります。小箱内では滑らかな計量の局所特性速度が上から $c_p$ で抑えられます。

$A_p$ の閉包を小箱の初期面内部に選び、時間幅 $\varepsilon_p$ を次のように選びます。

$$
c_p\varepsilon_p<\text{小箱から大きい開箱の境界までの空間的余裕}.
$$

すると $D(A_p)$ 内の必要な短時間部分に沿う初期面への因果曲線が $W_p$ を出ず、$u_p$ をそこへ制限できます。速度の上界は**この一つのコンパクト箱についてだけ**使っています。

<a id="thm-hpde15-compact-collar"></a>
<!-- formal-statement-start -->
> **定理（コンパクトな初期面部分の貼り合わせ）**  
> $(M,g)$ を滑らかな時間向き付き大域双曲Lorentz多様体、$\Sigma=t^{-1}(0)$ を滑らかなCauchy超曲面、$P$ を有限ランク滑らかな束 $E\to M$ 上のnormally hyperbolic作用素とする。$f\in\Gamma(M,E)$ と $\Sigma$ 上の滑らかなCauchyデータ $(u_0,u_1)$ を与え、$L\subset\Sigma$ をコンパクト集合とする。
>
> このとき有限個の比較的小さい開集合 $A_1,\ldots,A_m\subset\Sigma$、正数 $\varepsilon>0$ とCauchyパッチ $u_i$ が存在し、$L\subset\bigcup_i A_i$、各 $u_i$ は $V(A_i,\varepsilon)$ 上で定義される。パッチは重なりで一致するので、
>
$$
V_L=\bigcup_{i=1}^m V(A_i,\varepsilon)
$$
>
> 上の滑らかな切断 $u$ へ一意に貼り合わされ、$Pu=f$ と所定の初期データを満たす。ここで「一意」とは、この有限パッチに関する貼り合わせ値の一意性をいう。
<!-- formal-statement-end -->

### 証明の見取り図

点ごとの局所存在から $A_p,\varepsilon_p,u_p$ を得ます。コンパクトな $L$ に対しては有限部分被覆を選べるため、時間幅の最小値が正になります。重なりでの一致には前節の[重なり補題](#lem-hpde15-patch-intersection)を使い、分割関数は使いません。

<!-- proof-start -->
### 証明

各 $p\in L$ に対し、局所存在定理を $\Sigma$ の小片へ適用して $W_p$ と解 $u_p$ を得ます。前段の局所速度の評価から $p\in A_p$、$\overline A_p$ が小さい座標箱に含まれるよう $A_p$ を選び、正数 $\varepsilon_p$ を選んで $V(A_p,\varepsilon_p)\subset W_p$ とします。$u_p$ を制限すればCauchyパッチです。

$\{A_p:p\in L\}$ は $L$ の開被覆なので、コンパクト性より有限個 $A_{p_1},\ldots,A_{p_m}$ で覆えます。$\varepsilon=\min_i\varepsilon_{p_i}>0$ と置き、$u_i=u_{p_i}|_{V(A_{p_i},\varepsilon)}$ とします。

点 $q\in V_L$ を取ります。$q\in V(A_i,\varepsilon)$ となる添字 $i$ を一つ選び、$u(q)=u_i(q)$ と定めます。別の $j$ でも $q\in V(A_j,\varepsilon)$ なら、[重なりの補題](#lem-hpde15-patch-intersection)によって $u_i(q)=u_j(q)$ です。従って定義は選択に依存しません。各点の近傍では $u$ が滑らかな $u_i$ と等しいので滑らかです。同様に $Pu=Pu_i=f$ が成立し、$\Sigma\cap V_L=\bigcup_i A_i$ 上で二つの初期条件を満たします。

別の貼り合わせ $v$ が各パッチと一致するとすれば、各 $q$ で $v(q)=u_i(q)=u(q)$ です。よって唯一です。$\square$
<!-- proof-end -->

この定理は **任意のコンパクトな $L$ に対する短時間帯の解** を与えます。$L$ が非コンパクトな $\Sigma$ 全体なら、点ごとの $\varepsilon_p$ に正の共通下限があるとは限りません。したがって、この段階で $\Sigma\times(-\varepsilon,\varepsilon)$ 全体の解を得た、と宣言してはいけません。

## 4. 分割関数で解を加算すると何が壊れるか

分割関数は滑らかな開被覆を組み合わせるときに便利な道具です。ここで滑らかな**1の分割**とは、開被覆の各要素内に支持を持ち、各点近くでは有限個だけ非零（局所有限）で、非負かつ和が恒等的に1となる滑らかな関数族 $(\chi_i)$ のことです。しかし、**解を加重平均しても微分方程式は保存されない**点には注意が必要です。$P=-\operatorname{tr}_g\nabla^2+B$ とし、滑らかなスカラー関数 $\chi$ と束切断 $v$ を考えます。

<a id="lem-hpde15-partition-commutator"></a>
<!-- formal-statement-start -->
> **補題（分割関数と作用素の交換子）**  
> $(M,g)$ を滑らかなLorentz多様体とし、$(E,\nabla)$ を滑らかな接続付き束とする。
> 束自己準同型 $B$ と作用素 $P=-\operatorname{tr}_g\nabla^2+B$ を与える。
> 滑らかなスカラー関数 $\chi$ と滑らかな束切断 $v$ に対し、
>
$$
P(\chi v)=\chi Pv+[P,\chi]v,\qquad
[P,\chi]v=-(\Box_g\chi)v-2\nabla_{\operatorname{grad}\chi}v
$$
>
> が成立する。同じ源 $f$ を持つ局所解 $u_i$ を考える。
> 局所有限な1の分割 $(\chi_i)$ による加重和が定義できれば、

$$
v=\sum_i\chi_i u_i,\qquad Pv=f+\sum_i[P,\chi_i]u_i
$$

> が成り立つ。
<!-- formal-statement-end -->

### 証明の見取り図

一次のLeibniz則を二回使います。$B(\chi v)=\chi Bv$ なので零次項は残りません。[HPDE14の同じ交換子](../HPDE14/index.md#lem-hpde14-cutoff-commutator)を任意の滑らかな分割関数に適用した形です。

<!-- proof-start -->
### 証明

局所添字を $a,b$ とすると

$$
\nabla_a(\chi v)=(\partial_a\chi)v+\chi\nabla_a v.
$$

さらに接続の二階微分とChristoffel補正を展開して縮約すると

$$
\begin{aligned}
\operatorname{tr}_g\nabla^2(\chi v)
&=g^{ab}\bigl((\nabla_a\nabla_b\chi)v
+(\partial_b\chi)\nabla_a v\\
&\qquad+(\partial_a\chi)\nabla_bv
+\chi(\nabla^2v)_{ab}\bigr)\\
&=(\Box_g\chi)v+2\nabla_{\operatorname{grad}\chi}v
+\chi\operatorname{tr}_g\nabla^2v.
\end{aligned}
$$

ここで $g^{ab}=g^{ba}$ により二つの混合項が一致します。$B(\chi v)=\chi Bv$ を加え、$\chi Pv$ を引くと主張が従います。局所有限和の場合、各点近くで有限個しか非零でないため $P$ と和を交換でき、$\sum_i\chi_i=1$ より $\sum_i\chi_i f=f$ です。$\square$
<!-- proof-end -->

**誤証明を実際に壊す**。平坦な $1+1$ 次元で $P=\partial_t^2-\partial_x^2$、二つの斉次解 $u_1=0,\ u_2=x$ を取り、$\chi_1=1-\chi(x)$、$\chi_2=\chi(x)$ とします。$\chi$ が定数でない滑らかな関数なら、

$$
P(\chi(x)x)
=-\partial_x^2(\chi(x)x)
=-(x\chi''(x)+2\chi'(x)),
$$

一般には零ではありません。この二解は**初期データが異なる**ので、本章の重なり一致補題は適用できません。逆に同じ初期データのCauchyパッチなら、重なりで $u_i=u$ となるため、

$$
\sum_i[P,\chi_i]u_i
=\sum_i[P,\chi_i]u=[P,1]u=0.
$$

つまり加重和が解になるのは、**先に一致を証明したから**です。分割関数そのものが誤差を消してくれるわけではありません。

<a id="prop-hpde15-corrected-partition"></a>
<!-- formal-statement-start -->
> **命題（加重和の残差と局所補正）**  
> 開集合 $W$ 上の滑らかなnormally hyperbolic作用素 $P$ と滑らかな源 $f$ を考える。
> 開被覆上に同じ源を満たす滑らかな局所解 $Pu_i=f$ があるとする。
> 局所有限な1の分割 $(\chi_i)$ は、各 $\chi_i$ の支持が $u_i$ の定義域に含まれるように選ぶ。
> 加重和 $v$ と残差 $R$ を次で定める。

$$
v=\sum_i\chi_i u_i,\qquad R=\sum_i[P,\chi_i]u_i.
$$

> このとき $Pv=f+R$。さらに小さいCauchyパッチ上で滑らかな $w$ が $Pw=-R$ を満たせば、

$$
P(v+w)=f
$$

> が成立する。
<!-- formal-statement-end -->

証明は前の補題の式と線形性から $P(v+w)=f+R-R=f$ と計算するだけです。ただし $w$ の存在を言うには、$R$ が滑らかであることと、適切な局所Cauchyデータを与えて[局所存在](../HPDE11/index.md#thm-hpde11-local-cauchy)を使う必要があります。**補正なしの単純和を大域解とすることはできません。**

## 5. ある時間スライスから次のスライスへ

貼り合わせのもう一つの方向は時間です。$u^-$ が $\Sigma_s$ より少し未来まで既に解として存在し、$\Sigma_s$ 上の $(u^-,\nabla_N^Pu^-)$ から新しい局所解 $u^+$ を作るとします。同じ源の下では、$\Sigma_s$ 近くの重なりで二解が一致します。**値だけを合わせるのではなく、法線微分も合わせる**ことが重要です。

<a id="thm-hpde15-slab-continuation"></a>
<!-- formal-statement-start -->
> **定理（有限個のパッチによる時間スライス延長）**  
> $(M,g)$ を滑らかな時間向き付き大域双曲時空、$(\Sigma_s)_{s\in\mathbb R}$ を滑らかな空間的Cauchyスライス、$P$ を滑らかなnormally hyperbolic作用素、$f$ を滑らかな源とする。$s\in\mathbb R$ とコンパクト集合 $L\subset\Sigma_s$ を固定し、既存の滑らかな解 $u^-$ が $L$ を含む $\Sigma_s$ の開近傍の両側に定義され、$Pu^-=f$ を満たすとする。
>
> このとき $L$ を覆う有限個の小さいCauchyパッチを、初期データ $(u^-|_{\Sigma_s},\nabla_N^Pu^-|_{\Sigma_s})$ と源 $f$ から構成できる。十分小さい共通時間幅 $\delta>0$ に対し、新しいパッチ同士、また各パッチと $u^-$ は、双方の初期面への因果的足跡が共通の定義域に含まれる重なりで一致する。**既存解の定義域を $L$ の近くでこの比較条件が成り立つ小近傍に制限してから**新パッチと接合すれば、滑らかな解が得られる。比較条件を満たさない既存解の遠方の定義域まで、無条件に接合できるとは主張しない。$\delta$ は $L$ と局所係数に依存し、非コンパクトな $\Sigma_s$ 全体について一定とは主張しない。
<!-- formal-statement-end -->

### 証明の見取り図

$\Sigma_s$ を新しい初期面として第3節の有限被覆構成を繰り返します。既存解と新しい解の差は、重なりの初期面上で二種類のデータとも零です。局所因果円錐内の一意性を適用することが接着の要です。

<!-- proof-start -->
### 証明

まず $L$ の各点 $p$ の周囲で、既存解の二つのトレースを初期データとして[HPDE11の局所Cauchy存在](../HPDE11/index.md#thm-hpde11-local-cauchy)を適用します。点ごとの解 $v_p$ を得たら、前節と同じ速度上界により初期面開集合 $A_p$ と小さい時間幅 $\delta_p>0$ を選びます。有限個で $L$ を覆い、$\delta=\min\delta_{p_i}>0$ とします。

パッチ間の差 $v_i-v_j$ は同じ $f$ を打ち消す斉次解で、$\Sigma_s$ の $A_i\cap A_j$ 上で零変位かつ零法線微分です。[重なり補題](#lem-hpde15-patch-intersection)の証明を $t-s$ に平行移動して適用すると、依存領域の共通帯で零となります。

同様に、既存解とパッチとの差 $u^--v_i$ は $\Sigma_s$ 上で零データです。各 $p_i$ で既存解の定義域内に小さい座標箱を選び、初期面側の開集合と時間幅を縮めます。二解の重なりのうち、各点から $\Sigma_s$ への因果的足跡全体がこの箱に入る領域では、差に[HPDE10の局所零データ一意性](../HPDE10/index.md#lem-hpde10-local-cone)を適用でき、$u^-=v_i$ です。コンパクトな $L$ は有限個のこうした比較領域で覆えます。

既存解は、この一致を確かめた $L$ の近くの開領域へいったん制限します。新パッチとの共通部分が比較可能な領域内にあるよう接合領域を取れば、[パッチの重なり補題](#lem-hpde15-patch-intersection)と直前の一致から接合値は一意です。各点近くで既存解またはパッチのどちらかと等しいので滑らかで、局所性から $Pu=f$ を満たします。元の既存解の**定義域全体**と接合できるかは、別途その全重なりでの一致を調べる必要があります。$\square$
<!-- proof-end -->

時間方向の切断関数でも同じことを確認できます。重なりにおいて $u^-=u^+$ なら、$0\le\beta(t)\le1$ を使った

$$
u=(1-\beta(t))u^-+\beta(t)u^+
$$

はこの領域で単に $u=u^-=u^+$ です。ゆえに $[P,\beta](u^+-u^-)=0$。逆に、二つの解が重なりで一致していないなら、この交換子が現れます。

**値だけをつなぐ反例**。$P=\partial_t^2-\partial_x^2$ とし、$u^-(t,x)=0$（$t<0$）、$u^+(t,x)=t$（$t>0$）とすれば各側で斉次方程式を満たし、境界では両者の値が零です。しかし $u(t,x)=\max(t,0)$ は $\partial_tu$ が $0$ から $1$ へ跳ぶため、分布として $\partial_t^2u=\delta_0(t)$ を生じます。これは法線微分を合わせなかった結果です。

## 6. 因果ダイヤモンドと有限伝播が支えるもの

任意のコンパクト集合 $K_-,K_+\subset M$ に対し、二つの因果集合の共通部分

$$
Q=J^+(K_-)\cap J^-(K_+)
$$

は、大域双曲性の下でコンパクトです。なぜ二点の[因果ダイヤモンドのコンパクト性](../../../幾何系/LORG/LORG16/index.md#def-lorg16-global-hyperbolicity)からコンパクト集合を端点とする場合へ進めるかも確かめます。$K_-$ の各点より時間的に過去にある点 $r_i$ を有限個選び、$K_-\subset\bigcup_i I^+(r_i)$ とします。同様に $K_+\subset\bigcup_j I^-(s_j)$ とします。これは時間的未来・過去が開集合であり、両 $K_\pm$ がコンパクトだから可能です。任意の $z\in Q$ には $p\in K_-$、$q\in K_+$ があって $p\le z\le q$ なので、適当な $i,j$ について

$
r_i\ll p\le z\le q\ll s_j,\qquad
Q\subset\bigcup_{i,j}\bigl(J^+(r_i)\cap J^-(s_j)\bigr).
$

右辺は有限個のコンパクトな二点間ダイヤモンドの和です。また $z_n\in Q$ が $z$ へ収束するとき、$p_n\in K_-$、$q_n\in K_+$ を $p_n\le z_n\le q_n$ と取れます。コンパクト性から部分列で $p_n\to p\in K_-$、$q_n\to q\in K_+$ とでき、[因果到達関係の閉性](../../../幾何系/LORG/LORG16/index.md#lem-lorg16-closed-causal-relation)より $p\le z\le q$ です。従って $Q$ は閉集合で、有限個のコンパクト集合の和の閉部分集合としてコンパクトです。

このような有限の因果ダイヤモンド内では、局所解を比較するための座標箱、係数上界、分割関数の台を有限個にでき、[HPDE10の有限伝播](../HPDE10/index.md#thm-hpde10-finite-propagation)で、外側のデータの変更が内側へ影響しない範囲を判定できます。

ただし $Q$ がコンパクトであることだけから、**すべての時間スライスを越える解の存在**は従いません。必要なのは、その都度の初期値の滑らかさ、局所存在を再適用するための定義域、重なりの一意性、延長の過程での整合性です。この反復を時空全体へ完成させるのが次章の課題です。

<a id="prop-hpde15-diamond-consistency"></a>
<!-- formal-statement-start -->
> **命題（因果ダイヤモンド上の整合性）**  
> $(M,g)$ を時間向き付きの滑らかな大域双曲時空とする。
> $\Sigma$ を滑らかなCauchy超曲面、$P$ を滑らかなnormally hyperbolic作用素とする。
> コンパクト集合 $K_-,K_+\subset M$ に対する因果ダイヤモンドを

$$
Q=J^+(K_-)\cap J^-(K_+)
$$

> と定める。$Q$ 内を覆う局所Cauchy解の族が、同じ滑らかな源と初期データに由来するとする。
> 各重なりに含まれる初期面への因果的足跡上で、二解を比較できると仮定する。
>
> このとき、重なり上で局所解は一致し、合併領域上の滑らかな解として貼り合わされる。別の比較可能なパッチ族で構成しても、共通して比較できる部分では解は一致する。
<!-- formal-statement-end -->

この命題で**比較可能**を仮定した理由を確認します。$Q$ の外側で任意に作った局所斉次解を置いただけでは、その初期データがそろっていません。具体的には $P=\partial_t^2-\partial_x^2$ の $u=0$ と $v=x$ はともに局所解でも、同じCauchyデータを持ちません。「因果ダイヤモンド内にある」ことだけで二解が等しくなるわけではないのです。

<!-- proof-start -->
### 証明

同じ源の二解の差 $w$ は共通定義域で $Pw=0$ です。仮定された比較可能な重なりで、初期面への因果的足跡は両解の領域内にあり、初期変位・法線微分の差は零です。[局所零データ一意性](../HPDE10/index.md#lem-hpde10-local-cone)を初期面から目的点まで適用して $w=0$ を得ます。

従って任意の点でどの局所解を採用しても同じ値となり、局所有限な貼り合わせではなく、共通値による開集合上の通常の接合で滑らかな解が得られます。別の族との一致も二族のパッチの共通部分で同じ議論を用います。コンパクト性は有限個の比較領域へ整理する際に利用できるもので、一意性そのものは局所的な主張です。$\square$
<!-- proof-end -->

### 局所点源核との接続

**4次元の場合**、[HPDE14の真の局所点源基本解](../HPDE14/index.md#thm-hpde14-true-local)は、十分小さい因果凸領域内で $P_xE_+(x,y)=\delta_y\operatorname{id}_{E_y}$ を満たします。滑らかでコンパクト支持の源をこの局所核に積分し、同じ領域の過去スライス上に零データがあるなら、得られた解と[HPDE11の局所Cauchy解](../HPDE11/index.md#thm-hpde11-local-cauchy)との差は零データ斉次解になります。この領域の[一意性](../HPDE10/index.md#lem-hpde10-local-cone)が二つの**構成法の整合性**を保証します。ここで大域Green作用素の存在を仮定しているわけではありません。

## 7. 演習：貼り合わせを手で追う

### Level A

<a id="ex-hpde15-a01"></a>
#### HPDE15-A01 依存領域の交わり

$1+1$ 次元Minkowski時空で $\Sigma=\{t=0\}$、$A=(-3,2)$、$B=(-1,4)$ とする。$D(A)\cap D(B)$ を不等式で書き、点 $(t,x)=(1/2,0)$ が属するか調べよ。
- Level: A

<!-- solution-start -->
**詳細解答**。区間 $(a,b)$ の依存領域は $a+|t|<x<b-|t|$ です。交わりは両区間の端点を共通部分へ合わせればよいので、$A\cap B=(-1,2)$ から

$$
D(A)\cap D(B)=\{(t,x):-1+|t|<x<2-|t|\}.
$$

$(1/2,0)$ に代入すると $-1+1/2=-1/2<0<3/2=2-1/2$ となり、含まれます。区間の共通部分を取らずに $A$ のみを使うと誤ります。
<!-- solution-end -->

<a id="ex-hpde15-a02"></a>
#### HPDE15-A02 Cauchyパッチの条件

$P=\partial_t^2-\partial_x^2$、$A=(-1,1)$、$0<\varepsilon<1$、$u(t,x)=x^2+t^2$ とする。$u$ が $V(A,\varepsilon)$ 上のCauchyパッチとなる源 $f$、初期変位 $u_0$、初期速度 $u_1$ を求め、各条件を確認せよ。
- Level: A

<!-- solution-start -->
**詳細解答**。$\partial_tu=2t$、$\partial_t^2u=2$、$\partial_xu=2x$、$\partial_x^2u=2$ より

$$
Pu=2-2=0,\quad u(0,x)=x^2,\quad\partial_tu(0,x)=0.
$$

従って $f=0,u_0=x^2,u_1=0$ です。$u$ は多項式で滑らか、$V(A,\varepsilon)=\{|t|<\varepsilon,\ |x|+|t|<1\}$ 上でも定義できます。域、源、二つの初期条件が揃っています。
<!-- solution-end -->

<a id="ex-hpde15-a03"></a>
#### HPDE15-A03 交換子の直接検算

$P=\partial_t^2-\partial_x^2$、$\chi=\chi(x)$、$v=x^2$ に対して $[P,\chi]v$ を二つの方法で求めよ。
- Level: A

<!-- solution-start -->
**詳細解答**。積を展開して

$$
P(\chi x^2)=-\partial_x^2(\chi x^2)
=-(\chi''x^2+4\chi'x+2\chi).
$$

他方 $\chi Pv=-2\chi$ なので差は $[P,\chi]v=-\chi''x^2-4\chi'x$ です。一般式で使う波動作用素は、計量 $g=-dt^2+dx^2$ に対し $\Box_g=-\partial_t^2+\partial_x^2$ です。従って $\Box_g\chi=\chi''$、$\operatorname{grad}\chi=\chi'\partial_x$、$\nabla_{\operatorname{grad}\chi}v=2x\chi'$ となり、

$
-(\Box_g\chi)v-2\nabla_{\operatorname{grad}\chi}v
=-\chi''x^2-4\chi'x
$

と積の直接微分と一致します。$P=-\Box_g$ なので、$\Box_g$ と $P$ の符号を取り違えないことが重要です。
<!-- solution-end -->

<a id="ex-hpde15-a04"></a>
#### HPDE15-A04 有限個の時間幅

コンパクト集合 $L$ が三つの開集合 $A_i$ で覆われ、それぞれのCauchyパッチが時間幅 $\varepsilon_1=1/4,\varepsilon_2=1/6,\varepsilon_3=1/5$ で与えられた。共通時間幅を決め、なぜ非コンパクトな無限被覆で同じ操作が失敗し得るか述べよ。
- Level: A

<!-- solution-start -->
**詳細解答**。$\varepsilon=\min(1/4,1/6,1/5)=1/6>0$ とすれば全パッチを $|t|<1/6$ に制限できます。無限列 $\varepsilon_i=1/i$ なら各幅は正でも $\inf_i\varepsilon_i=0$ なので、一つの正の幅を取れません。有限被覆の役割は、最小値が正となる点にあります。
<!-- solution-end -->

### Level B

<a id="ex-hpde15-b01"></a>
#### HPDE15-B01 誤った加重和を修正する

$P=\partial_t^2-\partial_x^2$ の二つの斉次解 $u_1=0$、$u_2=x$ を $\chi(x)$ で加算して $v=\chi(x)x$ とする。$R=Pv$ を求め、$w=-v$ が $Pw=-R$ を満たすことを確認せよ。これはなぜCauchyデータを保つ補正の一般的構成にはならないか。
- Level: B

<!-- solution-start -->
**詳細解答**。積の微分から

$$
R=Pv=-(\chi''x+2\chi'),\qquad
Pw=-Pv=\chi''x+2\chi'=-R.
$$

従って $P(v+w)=P0=0$。しかし $w=-\chi x$ は初期面上で一般に零でなく、$v+w$ の初期変位は常に零になります。もし保存したい初期変位が $\chi x$ なら、この補正はそれを破壊します。正しいCauchy補正では、必要に応じて $w$ に**零の初期変位と法線速度**を課して局所存在を使う必要があります。
<!-- solution-end -->

<a id="ex-hpde15-b02"></a>
#### HPDE15-B02 二解が一致する領域の検証

$\Sigma=\{t=0\}$、$A=(-2,2)$、$B=(-1,3)$ とし、$P=\partial_t^2-\partial_x^2$ の二局所解が同じ滑らかな源と $A\cap B$ 上で同じ初期変位・速度を持つとする。$D(A)\cap D(B)$ の点で解が一致する理由をd'Alembert公式の斉次解表示から示せ。
- Level: B

<!-- solution-start -->
**詳細解答**。差 $w$ は $Pw=0$ で、初期変位 $\phi$、速度 $\psi$ が $A\cap B=(-1,2)$ で零です。[d'Alembert公式](../../PDE/PDE4/index.md#thm-pde4-dalembert)を差に適用すると

$$
w(t,x)=\frac{\phi(x-t)+\phi(x+t)}2
+\frac12\int_{x-t}^{x+t}\psi(y)\,dy
$$

です（$t<0$ のとき積分の向きも式どおり）。$q=(t,x)\in D((-1,2))$ なら $-1<x-|t|\le x+|t|<2$ で、両端と積分区間がすべて $(-1,2)$ に入ります。従って右辺の三項は零、$w(q)=0$ です。単に「重なるから同じ」ではなく、**足跡が同じ初期データの領域へ入る**ことを確かめました。
<!-- solution-end -->

<a id="ex-hpde15-b03"></a>
#### HPDE15-B03 時間スライスでの跳び

$P=\partial_t^2-\partial_x^2$、$a,b\in\mathbb R$ とし、$t<0$ で $u^-=a t$、$t>0$ で $u^+=b t$ とする。$t=0$ で値が一致するにもかかわらず、貼り合わせが斉次解になるのはいつか。分布微分で確かめよ。
- Level: B

<!-- solution-start -->
**詳細解答**。貼り合わせは $u(t,x)=a t+(b-a)tH(t)$ と書けます。分布の積微分では $\partial_t(tH(t))=H(t)+t\delta_0=H(t)$（$t\delta_0=0$）であり、

$$
\partial_tu=a+(b-a)H(t),\qquad
\partial_t^2u=(b-a)\delta_0(t).
$$

空間微分は零なので $Pu=(b-a)\delta_0(t)$。斉次解になるのは $a=b$ のとき、すなわち法線方向速度が一致するときに限ります。
<!-- solution-end -->

<a id="ex-hpde15-b04"></a>
#### HPDE15-B04 二つのパッチ族の比較

同じ滑らかな源と初期データから得られたCauchyパッチ $(A_i,\varepsilon_i,u_i)$ と $(B_j,\delta_j,v_j)$ を考える。両方の族が同じ初期面コンパクト集合 $L$ を覆っているとき、ある点 $q$ で $q\in V(A_i,\varepsilon_i)\cap V(B_j,\delta_j)$ なら両解が一致することを示し、別々の分割関数で構成したことが答えへ影響しない理由を説明せよ。
- Level: B

<!-- solution-start -->
**詳細解答**。$q$ は $\operatorname{int}D(A_i)\cap\operatorname{int}D(B_j)=\operatorname{int}D(A_i\cap B_j)$ 内にあり、時間幅は $\min(\varepsilon_i,\delta_j)$ に制限されます。差 $z=u_i-v_j$ はその共通域で $Pz=f-f=0$、初期面の $A_i\cap B_j$ 上で $z=\nabla_N^Pz=0$。初期面までの因果的足跡は共通域に含まれるので、[局所一意性](../HPDE10/index.md#lem-hpde10-local-cone)を適用すると $z(q)=0$ です。分割関数は貼り合わせの値を定めるために不要で、どのパッチを選んでも共通域では同じ値になります。
<!-- solution-end -->

### Level C

<a id="ex-hpde15-c01"></a>
#### HPDE15-C01 コンパクト貼り合わせと誤差の消滅

滑らかな大域双曲時空 $(M,g)$ のCauchy面 $\Sigma$ と滑らかなnormally hyperbolic作用素 $P=-\operatorname{tr}_g\nabla^2+B$ を考える。滑らかな源 $f$ と初期データ $(u_0,u_1)$ を与える。

コンパクト集合 $L\subset\Sigma$ 上で局所存在から有限個のパッチを作り、次の4点を順に示せ。

**(i)** 重なりで局所解が一致する。

**(ii)** 合併上で滑らかな解 $u$ が定義できる。

**(iii)** 合併内の局所有限な1の分割 $(\chi_i)$ について、加重和の交換子誤差は零となる。

$$
\sum_i[P,\chi_i]u_i=0.
$$

**(iv)** この議論だけから、非コンパクトな $\Sigma$ 全体に共通する正の延長時間は導けない。
- Level: C

<!-- solution-start -->
**詳細解答**。各 $p\in L$ で[局所存在](../HPDE11/index.md#thm-hpde11-local-cauchy)を適用し、点 $p$ の周りに解 $u_p$ と時空近傍 $W_p$ を得ます。$p\in A_p\subset\Sigma$ と $\varepsilon_p>0$ を十分小さく選び、$V(A_p,\varepsilon_p)\subset W_p$ とします。コンパクト性によって $L\subset A_{p_1}\cup\cdots\cup A_{p_m}$ とでき、$\varepsilon=\min_i\varepsilon_{p_i}>0$ です。

(i) $i,j$ の共通パッチ域は $\operatorname{int}D(A_i\cap A_j)\cap\{|t|<\varepsilon\}$ です。差 $u_i-u_j$ はそこにおいて斉次方程式を満たし、共通初期面では二つのCauchyデータとも零です。[依存領域一意性](../HPDE10/index.md#cor-hpde10-domain-uniqueness)から $u_i=u_j$。

(ii) $V_L=\bigcup_iV(A_i,\varepsilon)$ に対し $q\in V(A_i,\varepsilon)$ のとき $u(q)=u_i(q)$ と定義します。(i)が選択独立性を保証します。$q$ の近傍では $u_i$ と同じ滑らかな関数なので $u$ は滑らか、局所性より $Pu=f$ です。初期面上で $u=u_0,\nabla_N^Pu=u_1$ も成立します。

(iii) $\operatorname{supp}\chi_i$ を各パッチの内側に取れば、パッチ内で $u_i=u$ です。[交換子補題](#lem-hpde15-partition-commutator)より

$$
\begin{aligned}
\sum_i[P,\chi_i]u_i
&=\sum_i[P,\chi_i]u\\
&=-\left(\sum_i\Box_g\chi_i\right)u
-2\nabla_{\sum_i\operatorname{grad}\chi_i}u\\
&=-(\Box_g1)u-2\nabla_{\operatorname{grad}1}u=0.
\end{aligned}
$$

和と微分の交換は局所有限性で正当化できます。

(iv) $\varepsilon$ を正にできたのは有限個の $\varepsilon_i$ を取ったからです。$\Sigma$ 非コンパクトの場合、無限個のパッチ幅が零へ近づく可能性があり、共通の正時間幅は保証されません。さらに任意の有限時間スラブへの延長には新しいスライス上で局所構成と一意性を繰り返す必要があります。この点は(iv)の結論とは別で、[時間スライス延長](#thm-hpde15-slab-continuation)が次の手段です。
<!-- solution-end -->

## 8. 次章へ

本章で確定したのは、局所解が**共通の因果的足跡を持つ領域では一致する**こと、コンパクトな初期面部分を覆う有限パッチは共通の短時間幅で貼り合うこと、そして時間スライスで二種類のデータを一致させれば滑らかに延長できることです。

次章ではこれらを組み合わせ、コンパクト支持初期データ・源の影響を因果的に追いながら任意の有限時間区間へ伸ばし、大域Cauchy問題の存在一意性を完成させます。