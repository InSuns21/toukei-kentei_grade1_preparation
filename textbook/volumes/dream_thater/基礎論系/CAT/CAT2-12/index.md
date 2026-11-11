# CAT2-12 一般随伴関手定理

## 1. 極限の保存から、随伴の存在まで言えるか

前講では、[右随伴は極限を保存する](../CAT2-11/index.md#thm-cat2-11-right-preserves)ことを証明した。しかし、今手元にある関手 $G:\mathcal C\to\mathcal D$ が極限を保存するという情報だけで、左随伴を作れるだろうか。

[普遍射から左随伴を作る定理](../CAT2-10/index.md#thm-cat2-10-left-adjoint)を思い出す。各 $d\in\mathcal D$ について $d\to Gc$ という射を並べ、それらをすべて一意に受け持つ普遍的な射を一つ見つければよい。この「候補全体」は [comma圏](../CAT2-10/index.md#def-cat2-10-comma) $d\downarrow G$ になる。問題は、$d\downarrow G$ が大きい圏かもしれず、候補を無制限に積に取れないことである。

この講義で証明する存在定理は、次の三つの手掛かりを組み合わせる。

1. $\mathcal C$ の**完備性**：すべての小さい図式の極限を作れる。
2. $G$ の**極限保存**：その極限を $d\downarrow G$ へ移せる。
3. 大きな候補すべてへ射を送れる、小さい「出発点の集合」を選べること。

最初の二条件は圏の中で新しい対象を作る道具、三番目は「一度に扱う候補を集合の大きさに抑える」道具である。本講では、まず一般の圏の中で小さい出発点の集合から**始対象**を作り、次にその構成をcomma圏へ適用する。

以下、合成 $gf$ は「先に $f$、次に $g$」を意味する。[局所小圏](../CAT1-02/index.md#def-cat1-02-size)では任意のHomが集合である。[完備圏](../CAT2-04/index.md#def-cat2-04-complete)では空図式も含めて全小図式の極限が存在し、とくに終対象・小さい積・等化子がある。

## 2. 「射は存在する」と「射が一意」は違う

始対象 $I$ は各対象 $X$ へただ一つの射 $I\to X$ を持つ（[始対象](../CAT1-04/index.md#def-cat1-04-initial-terminal)）。存在だけを満たす対象を**弱始対象**と考えると、最初から始対象を得るより条件が弱い。さらに候補を一つに決めず、集合として持っておけばよい場合がある。

<a id="def-cat2-12-weak-initial-set"></a>

<!-- formal-statement-start -->
> **定義（弱始対象集合）**
> 圏 $\mathcal E$ の対象からなる**集合** $S=\{S_i\mid i\in I\}$ が弱始対象集合であるとは、任意の対象 $X\in\mathcal E$ に対し、ある $i\in I$ と射 $S_i\to X$ が存在することをいう。特に一対象からなる弱始対象集合 $\{P\}$ の $P$ を弱始対象という。射の一意性は要求しない。
<!-- formal-statement-end -->

<!-- definition-example-start: def-cat2-12-weak-initial-set -->
**定義の確認**：二点鎖 $0<1$ を圏と見る。射は順序関係に対応する（[順序から圏への構成](../CAT1-02/index.md#prop-cat1-02-order-category)）。

$0\to0$、$0\to1$ があるので $\{0\}$ は弱始対象集合であり、射が各対象へ一意なので $0$ は始対象でもある。

一方 $\{1\}$ から $0$ への射はなく、弱始対象集合ではない。集合 $\{0,1\}$ は弱始対象集合だが、集合のすべての要素が弱始対象である必要はない。
<!-- definition-example-end -->

この定義には「集合」と「すべての対象へ少なくとも一本」の二つの要点がある。集合であるため積を作れる。一方、積の射影は積から各因子へ向くため、弱始性と相性がよい。

<a id="thm-cat2-12-initial-from-weak"></a>

<!-- formal-statement-start -->
> **定理（弱始対象集合から始対象）**
> $\mathcal E$ を**局所小かつ完備**な圏とする。$\mathcal E$ に弱始対象集合が存在するなら、$\mathcal E$ は始対象を持つ。
<!-- formal-statement-end -->

### 証明の見取り図

弱始対象集合の**積** $P$ は弱始対象になる。次に $P$ のすべての自己射を同時に等化する部分対象 $e:I\to P$ を作る。局所小性により自己射の全体は集合だから、この等化子が小さい極限として存在する。弱始性から $P\to I$ が存在し、等化子の性質により $I$ の自己射は恒等射だけになる。最後に任意の平行二射 $I\rightrightarrows X$ を等化すると、その二射が等しいことまで示せる。

<!-- proof-start -->
### 証明

**（1）積から一つの弱始対象を得る。** 弱始対象集合を $(S_i)_{i\in I_0}$ とする。完備性から[小さい積](../CAT2-04/index.md#def-cat2-04-small-product)

$$
P=\prod_{i\in I_0}S_i,\qquad p_i:P\to S_i
$$

が存在する。任意の対象 $X$ について、弱始性から $S_i\to X$ が少なくとも一本あるので、その射に $p_i$ を合成すれば $P\to X$ が得られる。よって $P$ 自身が弱始対象である。$I_0$ が空の場合も、完備圏には終対象 $X$ があるため弱始性の全称条件を満たせず、もともと弱始対象集合の添字は空にはならない。

**（2）すべての自己射を同時に等化する。** 局所小性から

$$
H=\operatorname{Hom}_{\mathcal E}(P,P)
$$

は集合である。$H$ には $1_P$ が入る。完備性で積 $P^H=\prod_{\alpha\in H}P$ を取り、二射 $a,b:P\to P^H$ を各成分が

$$
\pi_\alpha a=1_P,\qquad \pi_\alpha b=\alpha
$$

となるように定義する。積の普遍性により二射が存在し、二射の[等化子](../CAT2-03/index.md#def-cat2-03-equalizer) $e:I\to P$ を取れる。従って、すべての $\alpha\in H$ に対し

$$
\alpha e=e\qquad(\alpha\in H).
$$

等化子 $e$ はモノ射である（[等化子のモノ性](../CAT2-03/index.md#prop-cat2-03-equalizer-unique-mono)）。弱始対象 $P$ から $I$ への射 $r:P\to I$ を一つ取る。$er:P\to P$ は $H$ の元だから、上の等式に $\alpha=er$ を代入して

$$
(er)e=e=1_Pe.
$$

$e$ のモノ性からではなく、上の式を $e(re)=e1_I$ と読み、$e:I\to P$ がモノ射であることを使うと

$$
re=1_I
$$

となる。ここで初めて $I$ が $P$ の引き込み（retract）であると分かった。

**（3）$I$ の自己射は恒等射だけ。** 任意の $t:I\to I$ に対して $etr:P\to P$ は $H$ の元である。再び全自己射を等化する性質を適用すると

$$
(etr)e=e,\qquad
et(re)=e,\qquad et=e.
$$

$e$ はモノ射なので $t=1_I$。

**（4）任意の $I\to X$ は一意。** 存在は $P$ の弱始性からの射 $u:P\to X$ を $e$ と合成すればよい。二射 $f,g:I\to X$ が与えられたら、その等化子 $q:Q\to I$ を取る。弱始性により $v:P\to Q$ が存在し、

$$
qve:I\longrightarrow I
$$

は $I$ の自己射なので、(3)より $qve=1_I$。特に $q$ は右逆 $ve$ を持つ。等化子 $q$ はモノ射でもあるから、$q$ は同型となる。等化条件 $fq=gq$ の両辺に $q^{-1}$ を合成して $f=g$ を得る。従って $I$ は始対象である。$\square$
<!-- proof-end -->

大切なのは、任意の射 $I\to X$ の一意性を「自己射が一意」だけから直接結論していないことである。$f,g$ の**等化子**を介し、弱始対象 $P$ からその等化子へ射を送り、$q$ が同型であることまで示して初めて一意性が閉じる。完備性は積と二種類の等化子に、局所小性は自己射の全体を一つの集合にする箇所に働いた。

## 3. 大きな候補から小さい出発点を選ぶ

今度は局所小圏 $\mathcal C,\mathcal D$ と関手 $G:\mathcal C\to\mathcal D$ を取る。$d\in\mathcal D$ ごとに、[comma圏](../CAT2-10/index.md#def-cat2-10-comma) $d\downarrow G$ の対象は $(c,u:d\to Gc)$、射 $(c,u)\to(c',u')$ は $\mathcal C$ の射 $h:c\to c'$ で

$$
G(h)\circ u=u'
$$

を満たすものだった。始対象があれば、どの $u$ へも**唯一の** $h$ がある。まずは唯一でなくてもよいから、各 $u$ に到達できる候補を集合として選べないだろうか。

<a id="def-cat2-12-solution-set"></a>

<!-- formal-statement-start -->
> **定義（解集合条件）**
> 局所小圏の関手 $G:\mathcal C\to\mathcal D$ が**解集合条件**を満たすとは、$\mathcal D$ の各対象 $d$ について、集合 $I_d$ で添字付けられた対象 $c_i\in\mathcal C$ と射 $u_i:d\to Gc_i$ の族が存在し、任意の $c\in\mathcal C$ と任意の射 $u:d\to Gc$ に対して、ある $i\in I_d$ と $h:c_i\to c$ が存在して

$$
u=G(h)\circ u_i
$$

となることをいう。$i$ と $h$ の一意性は要求しない。
<!-- formal-statement-end -->

<!-- definition-example-start: def-cat2-12-solution-set -->
**定義の確認**（恒等関手）。$G=1_{\mathbf{Set}}$ とし、集合 $d$ を固定する。$I_d=\{*\}$、$c_*=d$、$u_*=1_d$ と選ぶ。任意の $u:d\to c$ に対して $h=u:d\to c$ と置けば

$$
G(h)u_*=u1_d=u.
$$

一個の候補なので確かに集合であり、すべての $c,u$ を量化しても因子分解が成立する。これは $d\downarrow 1_{\mathbf{Set}}$ の対象 $(d,1_d)$ が実際には始対象である例でもある。
<!-- definition-example-end -->

<a id="prop-cat2-12-solution-comma"></a>

<!-- formal-statement-start -->
> **命題（解集合条件のcomma圏表示）**
> 局所小圏の関手 $G:\mathcal C\to\mathcal D$ と対象 $d\in\mathcal D$ について、解集合条件で要求される $d$ における族 $(c_i,u_i)$ が存在することと、comma圏 $d\downarrow G$ が弱始対象集合を持つことは同値である。
<!-- formal-statement-end -->

### 証明の見取り図

両方で要求しているのは、候補の集合と、任意の候補への射の存在である。実際に射の型と因子分解式を比較すればよい。

<!-- proof-start -->
### 証明

解集合条件の族 $(c_i,u_i)$ を $d\downarrow G$ の対象の集合とみなす。任意の対象 $(c,u)$ に対する因子分解 $u=G(h)u_i$ は、まさにcomma圏の射 $(c_i,u_i)\to(c,u)$ の定義である。従って弱始対象集合になる。逆に弱始対象集合の各要素を $(c_i,u_i)$ と書き、任意の $(c,u)$ への射 $h$ の定義式を読むと $u=G(h)u_i$ が得られる。$\square$
<!-- proof-end -->

解集合条件は「$d\to Gc$ の射全体が集合」という主張ではない。$\mathcal C$ の対象が真の類であっても、**因子分解の出発点**が集合個あればよいのである。

## 4. 極限保存はcomma圏に完備性を与える

前節で導入した[解集合条件](#def-cat2-12-solution-set)から弱始対象集合が得られても、[弱始対象集合から始対象を得る定理](#thm-cat2-12-initial-from-weak)を使うにはcomma圏が完備でなければならない。$\mathcal C$ の図式の極限を作り、その像に $d$ からの射をただ一つ足せることを確かめる。

<a id="prop-cat2-12-comma-complete"></a>

<!-- formal-statement-start -->
> **命題（comma圏の完備性）**
> $\mathcal C$ を完備圏、$\mathcal D$ を圏とし、関手 $G:\mathcal C\to\mathcal D$ が$\mathcal C$ のすべての小図式の極限を保存するとする。各 $d\in\mathcal D$ に対し、$d\downarrow G$ は完備である。さらに $\mathcal C$ が局所小なら $d\downarrow G$ も局所小である。
<!-- formal-statement-end -->

### 証明の見取り図

comma圏の図式を $\mathcal C$ へ写し、極限 $L$ を作る。$G$ がそれを保存するので、もとの各対象に付いていた $d\to Gc_j$ という脚が、ただ一つの $u:d\to GL$ に束ねられる。得られた $(L,u)$ の普遍性を $\mathcal C$ の極限性で確認する。

<!-- proof-start -->
### 証明

小さい添字圏 $\mathcal J$ と図式 $A:\mathcal J\to(d\downarrow G)$ を取る。各対象を $A_j=(c_j,u_j:d\to Gc_j)$、各射 $\alpha:i\to j$ の像を $a_\alpha:c_i\to c_j$ と書く。comma圏の射の条件から

$$
G(a_\alpha)u_i=u_j.
$$

忘却した $\mathcal C$ の図式 $j\mapsto c_j$ は、完備性により極限 $(L,p_j:L\to c_j)$ を持つ。[極限保存](../CAT2-11/index.md#def-cat2-11-preserve-limit)を $G$ とこの図式へ適用すると、$(GL,Gp_j)$ は $Gc_j$ の極限錐である。上の整合式によって $(u_j)$ は $d$ からの錐なので、極限の普遍性から一意の $u:d\to GL$ が存在し

$$
Gp_j\circ u=u_j\qquad(\forall j)
$$

となる。従って $(L,u)$ はcomma圏の対象で、$p_j:(L,u)\to(c_j,u_j)$ はcomma圏の射である。

任意のcomma圏の錐 $(c,v:d\to Gc)$、$q_j:(c,v)\to(c_j,u_j)$ を取る。$\mathcal C$ の極限性から一意の $h:c\to L$ が $p_jh=q_j$ を満たす。この $h$ がcomma圏の射であるには $Gh\,v=u$ が必要である。各 $j$ について

$$
Gp_j\circ Gh\circ v
=G(p_jh)v
=Gq_jv
=u_j
=Gp_j u.
$$

$(GL,Gp_j)$ は極限錐で、その脚は共同でモノだから $Gh\,v=u$。よって $h$ はcomma圏の射になり、元の一意性からcomma圏でも一意となる。空の $\mathcal J$ にも適用でき、終対象も得られる。

最後に二対象 $(c,u),(c',u')$ 間のcomma圏のHomは

$$
\{h\in\operatorname{Hom}_{\mathcal C}(c,c')\mid Gh\,u=u'\}
$$

という部分集合である。$\mathcal C$ が局所小ならこれも集合なので、comma圏は局所小である。$\square$
<!-- proof-end -->

ここで $\mathcal D$ 自身にすべての極限があるとは仮定していない。必要なのは、**実際に $\mathcal C$ で作った極限の像**が $\mathcal D$ の極限になることだけである。

## 5. Freydの一般随伴関手定理

ここまでの二つの構成を結合する。$G$ が右随伴であるための必要条件は既に前講で得た。逆方向では、解集合条件を $d\downarrow G$ の弱始対象集合へ読み替えてから、完備性を使う。

<a id="thm-cat2-12-freyd"></a>

<!-- formal-statement-start -->
> **定理（Freydの一般随伴関手定理）**
> $\mathcal C,\mathcal D$ を局所小圏とし、$\mathcal C$ は完備とする。関手 $G:\mathcal C\to\mathcal D$ に左随伴 $L:\mathcal D\to\mathcal C$ が存在するための必要十分条件は、以下の二条件である。
>
> 1. $G$ は $\mathcal C$ に存在するすべての小図式の極限を保存する。
> 2. $G$ は各 $d\in\mathcal D$ で解集合条件を満たす。
<!-- formal-statement-end -->

### 証明の見取り図

左随伴が存在すれば保存性は前講の定理、解集合は単位射一つから得る。逆に、各 $d$ のcomma圏は完備・局所小・弱始対象集合ありとなるので始対象 $(Ld,\eta_d)$ を持つ。[普遍射と左随伴の同値](../CAT2-10/index.md#thm-cat2-10-left-adjoint)を使えば $L\dashv G$ が構成できる。

<!-- proof-start -->
### 証明

**必要性。** $L\dashv G$ が存在するとする。[右随伴の極限保存](../CAT2-11/index.md#thm-cat2-11-right-preserves)から条件1が従う。各 $d$ における[単位射](../CAT2-09/index.md#def-cat2-09-unit)を $\eta_d:d\to GLd$ とする。[随伴の転置公式](../CAT2-09/index.md#prop-cat2-09-transpose)により、任意の $u:d\to Gc$ はただ一つの $h:Ld\to c$ に対し

$$
u=Gh\circ\eta_d
$$

と書ける。条件2の候補族として一個だけ $(Ld,\eta_d)$ を選べるので、解集合条件が成り立つ。

**十分性。** 条件1、2を仮定し、$d\in\mathcal D$ を任意に固定する。[comma圏の完備性](#prop-cat2-12-comma-complete)により $d\downarrow G$ は完備かつ局所小である。[解集合のcomma圏表示](#prop-cat2-12-solution-comma)により弱始対象集合を持つ。従って[弱始対象集合から始対象を得る定理](#thm-cat2-12-initial-from-weak)を適用でき、始対象 $(Ld,\eta_d:d\to GLd)$ が存在する。

この始対象性は、各 $u:d\to Gc$ に対して唯一の $h:Ld\to c$ が

$$
Gh\,\eta_d=u
$$

を満たすということである。したがって対応

$$
\Phi_{d,c}:\operatorname{Hom}_{\mathcal C}(Ld,c)
\longrightarrow\operatorname{Hom}_{\mathcal D}(d,Gc),
\qquad h\longmapsto Gh\,\eta_d
$$

は全単射である。

この対象ごとの対応から**関手**を作る点も確認する。射 $k:d\to d'$ に対し、$u=\eta_{d'}k:d\to GLd'$ として始対象性を使い、唯一の射 $Lk:Ld\to Ld'$ を

$$
G(Lk)\,\eta_d=\eta_{d'}k
$$

で定める。$k=1_d$ のとき $1_{Ld}$ がこの式を満たすので一意性で $L(1_d)=1_{Ld}$。$k:d\to d'$、$\ell:d'\to d''$ なら

$$
\begin{aligned}
G(L\ell\circ Lk)\eta_d
&=G(L\ell)\eta_{d'}k\\
&=\eta_{d''}\ell k
=G(L(\ell k))\eta_d.
\end{aligned}
$$

一意性により $L(\ell k)=L\ell\circ Lk$。さらに $h:Ld\to c$、$a:c\to c'$ では

$$
\Phi_{d,c'}(ah)=G(ah)\eta_d=Ga\,\Phi_{d,c}(h),
$$

また $k:d'\to d$ に対して

$$
\Phi_{d',c}(h\,Lk)
=Gh\,G(Lk)\eta_{d'}
=Gh\,\eta_d k
=\Phi_{d,c}(h)\,k.
$$

従って $\Phi$ は二変数で自然な全単射であり、[Hom集合による随伴](../CAT2-08/index.md#def-cat2-08-adjunction)の定義から $L\dashv G$ を得る。$\square$
<!-- proof-end -->

証明の「存在」段階では、$d$ ごとに選んだ始対象の候補が一意に等しい必要はない。[普遍射の同型一意性](../CAT2-10/index.md#prop-cat2-10-uniqueness)があるため、選び方を変えても同型を除いて同じ左随伴となる。

## 6. 使える形にする：小さい圏と冪集合の具体計算

### 小ささで解集合を確保する

<a id="prop-cat2-12-small"></a>

<!-- formal-statement-start -->
> **命題（小さい圏の解集合条件）**
> $\mathcal C$ が小さい圏、$\mathcal D$ が局所小圏なら、任意の関手 $G:\mathcal C\to\mathcal D$ は解集合条件を満たす。従って $\mathcal C$ がさらに完備なら、$G$ に左随伴があることと $G$ がすべての小さい極限を保存することは同値である。
<!-- formal-statement-end -->

### 証明の見取り図

すべての対 $(c,u:d\to Gc)$ を候補にしてよいほど $\mathcal C$ の対象が少なければ、因子分解は恒等射で済む。

<!-- proof-start -->
### 証明

各 $d\in\mathcal D$ に対し、$\operatorname{Ob}\mathcal C$ は集合で、各 $\operatorname{Hom}_{\mathcal D}(d,Gc)$ も集合だから

$$
I_d=\{(c,u)\mid c\in\operatorname{Ob}\mathcal C,\ u\in\operatorname{Hom}_{\mathcal D}(d,Gc)\}
$$

は集合である。任意の $(c,u)$ に対し、その対自身を選び $h=1_c$ とすれば $G(h)u=u$ となる。解集合条件を確認したので、$\mathcal C$ が完備なら[Freydの定理](#thm-cat2-12-freyd)を適用できる。$\square$
<!-- proof-end -->

圏が大きい場合には上の「全候補を集める」という操作は集合にならない。そのとき、もっと小さい出発点を探すことこそ解集合条件の役割になる。

### 冪集合の順序圏で手を動かす

集合 $S$ と部分集合 $A\subseteq S$ を固定する。冪集合 $\mathcal P(S)$ を包含で順序付けた圏では、射 $X\to Y$ は $X\subseteq Y$ を表す。[順序圏の極限](../CAT2-02/index.md#prop-cat2-02-poset-meet)は集合の共通部分で、空図式の極限は最大元 $S$ である。

関手 $G:\mathcal P(S)\to\mathcal P(S)$ を $G(X)=X\cup A$ と定める。これが右随伴なら左随伴は「$A$ にすでに含まれる要素を取り除く」操作になるはずである。

<a id="prop-cat2-12-powerset"></a>

<!-- formal-statement-start -->
> **命題（冪集合の和集合関手）**
> 集合 $S$ と $A\subseteq S$ に対し、包含順序の圏 $\mathcal P(S)$ の関手 $G(X)=X\cup A$ はすべての小さい極限を保存し、左随伴

$$
L(B)=B\setminus A
$$

> を持つ。随伴条件は任意の $B,X\subseteq S$ について

$$
L(B)\subseteq X\quad\Longleftrightarrow\quad B\subseteq G(X)
$$

> である。
<!-- formal-statement-end -->

### 証明の見取り図

共通部分と $A$ との和集合が分配し合うことを、添字集合が空のときまで確かめる。解集合条件は $\mathcal P(S)$ が小さいため自動的に成り立つ。最後に包含関係を二方向に展開して左随伴の式を直接確認する。

<!-- proof-start -->
### 証明

$G$ は包含を保つので関手である。任意の集合添字 $J$ と部分集合族 $(X_j)_{j\in J}$ に対し、任意の $s\in S$ について

$$
\begin{aligned}
s\in(\bigcap_{j\in J}X_j)\cup A
&\Longleftrightarrow (s\in A)\ \text{または}\ (\forall j,\ s\in X_j)\\
&\Longleftrightarrow \forall j,\ (s\in A\ \text{または}\ s\in X_j)\\
&\Longleftrightarrow s\in\bigcap_{j\in J}(X_j\cup A).
\end{aligned}
$$

$J=\varnothing$ なら両辺とも $S$ であり、空極限も保存する。順序圏の任意の小図式の極限は対象の共通部分なので、$G$ はすべての小極限を保存する。$\mathcal P(S)$ は対象も射も集合だから、[小さい圏の命題](#prop-cat2-12-small)で解集合条件も成立する。

さらに $L(B)=B\setminus A$ と置くと

$$
\begin{aligned}
B\setminus A\subseteq X
&\Longleftrightarrow \forall s\in B,\ (s\notin A\Rightarrow s\in X)\\
&\Longleftrightarrow \forall s\in B,\ (s\in A\ \text{または}\ s\in X)\\
&\Longleftrightarrow B\subseteq X\cup A.
\end{aligned}
$$

順序圏ではHom集合は空集合か一元集合なので、この条件の同値がHom集合の自然な全単射になる（[順序圏の随伴判定](../CAT2-08/index.md#thm-cat2-08-poset)）。よって $L\dashv G$。$\square$
<!-- proof-end -->

同じ $S$ で $G'(X)=X\cap A$ とすると、$A\ne S$ の場合には最大元 $S$ の像が $A$ で、終対象 $S$ ではない。$G'$ は**空図式の極限を保存しない**ので、左随伴を持たない。[右随伴の極限保存](../CAT2-11/index.md#thm-cat2-11-right-preserves)の必要条件が壊れる例である。有限個の共通部分だけを見て「極限を保存した」と判定してはいけない。

## 7. なぜ解集合条件を省略できないのか

すべての小さい極限を保存するだけでは、候補を集合の大きさへ縮められないことがある。サイズの問題を見える形にするため、[順序数](../../SET/SET2/index.md#def-set2-ordinal)の全体を使った順序圏を考える。[集合と真の類の区別](../CAT1-02/index.md#def-cat1-02-size)がここで効く。

<a id="prop-cat2-12-no-solution"></a>

<!-- formal-statement-start -->
> **命題（解集合条件を省けない）**
> すべての順序数を対象とし、$\alpha\to\beta$ が $\alpha\le\beta$ のときだけ存在する順序圏を $\mathbf{Ord}$ とする。その反対圏 $\mathcal C=\mathbf{Ord}^{\mathrm{op}}$ から一対象一射の圏 $\mathbf 1$ への唯一の関手 $G:\mathcal C\to\mathbf1$ は、局所小な完備圏 $\mathcal C$ のすべての小さい極限を保存するが、左随伴を持たず、解集合条件を満たさない。
<!-- formal-statement-end -->

### 証明の見取り図

順序数の任意の**集合**には上限があるので、$\mathbf{Ord}^{\mathrm{op}}$ には小極限がある。一方、この反対圏の始対象は「最大の順序数」でなければならず、存在しない。候補となる順序数の集合をいくつ選んでも、それらより大きい順序数へ届かない。

<!-- proof-start -->
### 証明

順序圏では任意のHom集合は空か一元集合なので、$\mathcal C$ は局所小である。小さい図式の対象順序数 $(\alpha_j)$ は集合をなし、その和集合

$$
\gamma=\bigcup_j\alpha_j=\sup_j\alpha_j
$$

は順序数である。実際、各順序数は推移的であり、和集合も推移的である。二つの元は添字の順序数のうち大きい方にともに属するので、元関係による整列性も引き継ぐ。従って $\gamma$ が上界をなし、任意の上界 $\beta$ には $\gamma\le\beta$ が成り立つ。このことから $\gamma$ は $\mathbf{Ord}$ の余極限である。空の図式では $\gamma=0$ が始対象になる。よって反対圏 $\mathcal C$ は完備である。

$\mathbf1$ ではすべての小さい図式の極限が唯一の対象で、$G$ はどの極限錐もその極限錐へ送るので、極限を保存する。

仮に $L:\mathbf1\to\mathcal C$ が $G$ の左随伴なら、$\mathbf1$ の唯一の対象 $\ast$ に対し

$$
\operatorname{Hom}_{\mathcal C}(L\ast,\alpha)
\cong\operatorname{Hom}_{\mathbf1}(\ast,G\alpha)
=\{\ast\}
$$

が全順序数 $\alpha$ で成り立つ。$\mathcal C$ で $L\ast\to\alpha$ があるとは、順序数の大小で $\alpha\le L\ast$ ということである。しかし順序数 $L\ast+1$ は $L\ast$ より大きく、矛盾する。よって左随伴は存在しない。

解集合条件を仮定すると、$d=\ast$ に対して順序数の集合 $S=\{\alpha_i\}$ が弱始対象集合になるはずである。集合 $S$ の上限を $\gamma=\sup_i\alpha_i$ とし、[後続順序数](../../SET/SET2/index.md#def-set2-successor-ordinal) $\beta=\gamma+1$ を取る。どの $\alpha_i$ についても $\alpha_i<\beta$ なので、$\mathcal C$ の射 $\alpha_i\to\beta$ は存在しない。これが弱始性に反する。従って解集合条件も成立しない。$\square$
<!-- proof-end -->

この反例では完備性・局所小性・極限保存は満たされている。壊れているのは**大きな候補圏に小さい弱始対象集合が存在する**という部分であり、まさに前節の積 $P$ を構成する出発点がない。

## 8. 演習：必要条件と存在構成を再現する

### 問題1：二点鎖で弱始性を判定する

- Level: A
- 問題ID: CAT2-12-WEAK-INITIAL-CHAIN

包含順序の二点鎖 $0<1$ を圏とする。$\{0\}$、$\{1\}$、$\{0,1\}$ のどれが弱始対象集合か判定し、始対象と弱始対象集合の相違を説明せよ。

<!-- solution-start -->
**詳細解答**：[弱始対象集合の定義](#def-cat2-12-weak-initial-set)は各対象 $x$ へ候補のどれかから射があることを要求する。

$0\le0$ と $0\le1$ なので $\{0\}$ は条件を満たす。$1\nleq0$ なので $\{1\}$ は満たさない。$\{0,1\}$ は $x=0$ に $0$、$x=1$ に $1$ を選べるので満たす。

始対象は各対象へ唯一の射を出す**単一の対象**の性質であり、この圏では $0$ である。弱始対象集合の要素 $1$ 自身は弱始対象でなくてもよい。$\square$
<!-- solution-end -->

### 問題2：恒等関手の解集合条件

- Level: A
- 問題ID: CAT2-12-SOLUTION-SET-IDENTITY

任意の局所小圏 $\mathcal C$ の恒等関手 $1_{\mathcal C}$ と対象 $d$ について、解集合条件を一個の対で満たすことを、すべての射の型を明記して示せ。

<!-- solution-start -->
**詳細解答**：候補を一個 $(c_*,u_*)=(d,1_d:d\to d)$ とする。これは一元集合で添字付けられている。任意の $c\in\mathcal C$ と $u:d\to1_{\mathcal C}(c)=c$ に対して $h=u:c_*=d\to c$ を選ぶ。すると

$$
1_{\mathcal C}(h)\circ u_*=u\circ1_d=u.
$$

従って[解集合条件](#def-cat2-12-solution-set)を満たす。さらに同じ式の一意解は $h=u$ なので $(d,1_d)$ はcomma圏 $d\downarrow1_{\mathcal C}$ の始対象でもある。$\square$
<!-- solution-end -->

### 問題3：積が弱始対象になる理由

- Level: A
- 問題ID: CAT2-12-WEAK-INITIAL-PRODUCT

完備圏 $\mathcal E$ の弱始対象集合 $(S_i)_{i\in I}$ と積 $P=\prod_iS_i$ を取る。任意の対象 $X$ への $P\to X$ を、積の射影を使って構成せよ。各 $S_i$ が弱始対象であると仮定してはならない。

<!-- solution-start -->
**詳細解答**：弱始対象集合の量化条件を対象 $X$ に適用すると、**ある** $i\in I$ と射 $f_i:S_i\to X$ が存在する。小さい積の普遍性で得られる射影 $p_i:P\to S_i$ により

$$
P\xrightarrow{p_i}S_i\xrightarrow{f_i}X
$$

と合成すれば $f_ip_i:P\to X$ が得られる。この構成に $j\ne i$ から $X$ への射は不要である。$I$ が空なら完備圏には少なくとも終対象があり、空族は弱始条件を満たし得ない。$\square$
<!-- solution-end -->

### 問題4：全自己射の等化子と引き込み

- Level: A
- 問題ID: CAT2-12-RETRACT-EQUALIZER

局所小な完備圏で弱始対象 $P$ を取り、その全自己射 $\alpha:P\to P$ を等化するモノ射 $e:I\to P$ があるとする。$P$ の弱始性から $r:P\to I$ を一つ取れる。$re=1_I$ と、任意の $t:I\to I$ が $1_I$ であることを示せ。

<!-- solution-start -->
**詳細解答**：全自己射の等化条件は $\alpha e=e$ である。$\alpha=er:P\to P$ と選ぶと $ere=e$、すなわち $e(re)=e1_I$。等化子 $e$ はモノ射だから $re=1_I$ である。次に任意の $t:I\to I$ に対し $\alpha=etr:P\to P$ を選ぶと

$$
e=etre=et(re)=et.
$$

再び $e$ のモノ性で $t=1_I$ を得る。$e$ がモノ射である点を飛ばすと、最後の打消しは正当化できない。$\square$
<!-- solution-end -->

### 問題5：comma圏の二項積

- Level: B
- 問題ID: CAT2-12-COMMA-PRODUCT

$G:\mathcal C\to\mathcal D$ が二項積を保存し、$\mathcal C$ に二項積があるとする。$d\downarrow G$ の二対象 $(c_1,u_1)$、$(c_2,u_2)$ の積を構成し、普遍性を示せ。$\mathcal D$ 全体が完備とは仮定しない。

<!-- solution-start -->
**詳細解答**：$\mathcal C$ の積を $(P,p_1,p_2)$ とする。$G$ の積保存により $(GP,Gp_1,Gp_2)$ は $Gc_1,Gc_2$ の積なので、$u_i:d\to Gc_i$ を一意に束ねる射 $u:d\to GP$ があり、

$$
Gp_i\,u=u_i\quad(i=1,2).
$$

従って $(P,u)$ と射影 $p_i$ はcomma圏の錐になる。別の錐 $(x,v)$、$q_i:(x,v)\to(c_i,u_i)$ を取る。$\mathcal C$ の積により一意の $h:x\to P$ が $p_ih=q_i$ を満たす。comma圏の射条件は $Gq_i v=u_i$ だから

$$
Gp_i(Gh\,v)=Gq_i v=u_i=Gp_i u.
$$

積の射影 $Gp_i$ は共同でモノなので $Gh\,v=u$。よって $h$ はcomma圏の媒介射で、一意性も $\mathcal C$ の積から従う。$\mathcal D$ ではこの二項積の存在だけを $G$ の保存性から得た。$\square$
<!-- solution-end -->

### 問題6：普遍射から左随伴の射への作用を導く

- Level: B
- 問題ID: CAT2-12-ADJOINT-FUNCTORIALITY

$G:\mathcal C\to\mathcal D$ に対し各 $d$ で $(Ld,\eta_d:d\to GLd)$ が $d\downarrow G$ の始対象だとする。$k:d\to d'$ から $Lk:Ld\to Ld'$ を定義し、$L(\ell k)=L\ell\,Lk$ を証明せよ。

<!-- solution-start -->
**詳細解答**：射 $\eta_{d'}k:d\to GLd'$ に $d$ の始対象性を適用すると、唯一の $Lk:Ld\to Ld'$ が

$$
G(Lk)\eta_d=\eta_{d'}k
$$

を満たす。この式の両辺は $d\to GLd'$。次に $\ell:d'\to d''$ とすると

$$
\begin{aligned}
G(L\ell\,Lk)\eta_d
&=G(L\ell)\,G(Lk)\eta_d\\
&=G(L\ell)\eta_{d'}k\\
&=\eta_{d''}\ell k.
\end{aligned}
$$

一方 $L(\ell k)$ も定義により同じ式を満たす。$d$ における始対象性が**唯一**の媒介射を保証するので $L(\ell k)=L\ell\,Lk$。また $k=1_d$ では $1_{Ld}$ が式を満たすので $L(1_d)=1_{Ld}$。よって $L$ は関手である。$\square$
<!-- solution-end -->

### 問題7：極限保存だけでは十分でない二つの理由

- Level: B
- 問題ID: CAT2-12-NECESSITY-COUNTEREXAMPLES

集合 $S$ と真部分集合 $A\subsetneq S$ に対し、冪集合の包含順序圏で $G'(X)=X\cap A$ が左随伴を持たない理由を示せ。また、$\mathbf{Ord}^{\mathrm{op}}\to\mathbf1$ が左随伴を持たない理由は同じか、異なるかを説明せよ。

<!-- solution-start -->
**詳細解答**：冪集合圏は完備であり、$G'$ は包含を保つ。しかし空図式の極限である最大元 $S$ は $G'(S)=A$ に送られる。$A\subsetneq S$ なので $A$ は最大元でなく、$G'$ は空極限を保存しない。[右随伴の極限保存](../CAT2-11/index.md#thm-cat2-11-right-preserves)の対偶により左随伴を持たない。

一方 $\mathbf{Ord}^{\mathrm{op}}\to\mathbf1$ は極限を保存する。$\mathbf{Ord}^{\mathrm{op}}$ に始対象があるには最大の順序数が必要だが、任意の $\alpha$ に $\alpha+1$ があるので存在しない。[解集合条件を省けない命題](#prop-cat2-12-no-solution)の通り、候補の集合は必ずより大きい順序数を取り逃がす。前者は**極限保存**の欠落、後者は**解集合条件**の欠落であり、失敗機構が異なる。$\square$
<!-- solution-end -->

### 問題8：有限冪集合での随伴を具体的に判定する

- Level: B
- 問題ID: CAT2-12-POWERSET-ADJOINT

$S=\{a,b,c\}$、$A=\{b\}$ とする。冪集合順序圏の $G(X)=X\cup A$ について、$B=\{a,b\}$ の解集合条件の候補として $(B\setminus A,\ B\subseteq G(B\setminus A))$ を一つ選べることを示せ。さらに $L(B)=B\setminus A$ に対する随伴条件をすべての $X\subseteq S$ で確認せよ。

<!-- solution-start -->
**詳細解答**：$B\setminus A=\{a\}$ であり、$G(\{a\})=\{a,b\}=B$ なので候補の射 $u_B:B\to G(\{a\})$ は包含として存在する。任意の $X\subseteq S$ と $u:B\to G(X)$（すなわち $B\subseteq X\cup\{b\}$）を取る。この包含には $a\in X$ が必要十分である。従って $\{a\}\subseteq X$、つまり $h:\{a\}\to X$ が存在する。順序圏では射があれば一意で、$Gh\circ u_B=u$ となる。

全 $X\subseteq S$ について、$\{a\}\subseteq X$ と $B\subseteq X\cup\{b\}$ はともに「$a\in X$」と同値なので、$L(B)\to X$ と $B\to G(X)$ のHomは同時に一元集合、そうでなければ同時に空集合である。一般の $B$ でも同じ要素別証明を行えば[冪集合の随伴](#prop-cat2-12-powerset)の式になる。$\square$
<!-- solution-end -->

### 問題9：巨大なcomma圏で解集合が存在しない

- Level: C
- 問題ID: CAT2-12-ORDINAL-OBSTRUCTION

順序数の圏 $\mathbf{Ord}$、$\mathcal C=\mathbf{Ord}^{\mathrm{op}}$、唯一の関手 $G:\mathcal C\to\mathbf1$ を考える。次を順に証明せよ。

1. $\mathcal C$ は局所小で完備である。
2. $G$ はすべての小さい極限を保存する。
3. $\ast\downarrow G$ の候補を任意の集合だけ選んでも弱始対象集合にならない。
4. $G$ に左随伴がないことを、Hom集合の全単射から直接示せ。

<!-- solution-start -->
**詳細解答**：

**（1）** 二順序数間には順序に応じて射が高々一つなのでHomは空集合か一元集合であり、局所小である。任意の小図式の対象順序数を $(\alpha_j)_{j\in J}$ とすると、その和集合 $\gamma=\bigcup_j\alpha_j$ は順序数である。和集合が推移的で、任意の二元が大きい方の添字順序数内で比較できるため、順序数の整列性を継承するからである。

これは上限 $\gamma=\sup_j\alpha_j$ なので各 $\alpha_j\le\gamma$ が余錐を与える。別の上界 $\beta$ はすべての $\alpha_j\le\beta$ を満たすから $\gamma\le\beta$ となり、射 $\gamma\to\beta$ は一意。$J=\varnothing$ では $\gamma=0$ が始対象である。反対圏のすべての小極限が存在する。

**（2）** $\mathbf1$ ではどんな小図式も唯一の対象を極限とする。$\mathcal C$ の極限錐を $G$ で写した結果もこの唯一の錐なので、極限保存が成立する。

**（3）** $\ast\downarrow G$ の対象は順序数 $\alpha$ と唯一の射 $\ast\to G\alpha$ の組であり、対象間の射は $\mathcal C$ の射と一致する。任意の候補集合 $(\alpha_i)_{i\in I}$ に対し

$$
\beta=\left(\sup_{i\in I}\alpha_i\right)+1
$$

を取る。全 $i$ で $\alpha_i<\beta$ なので、$\mathcal C$ には $\alpha_i\to\beta$ が存在しない。従って弱始性の「任意の対象へ」の条件が破れる。$I=\varnothing$ でも $\beta=1$ を選べる。

**（4）** 左随伴 $L$ があれば任意の順序数 $\alpha$ に対し

$$
\operatorname{Hom}_{\mathcal C}(L\ast,\alpha)
\cong \operatorname{Hom}_{\mathbf1}(\ast,G\alpha)
=\{\ast\}
$$

なので左辺も非空、すなわち $\alpha\le L\ast$ でなければならない。$\alpha=L\ast+1$ を代入すると $L\ast+1\le L\ast$ となって矛盾する。これは $G$ の極限保存だけで随伴の存在を導けないことを示す。$\square$
<!-- solution-end -->

## 9. 次講へ：随伴からモナドへ

ここまでに、随伴の定義・構成・保存性・存在判定を一通りつないだ。次の CAT3-01「モナドと随伴」では、随伴 $L\dashv G$ から自己関手 $GL$、単位、乗法が作られ、それらが満たす結合律と単位律を確かめる。
