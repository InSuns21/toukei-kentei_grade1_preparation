# CAT1-09 圏の同値と圏同型

## 1. 「同じ圏」とは何を保つことか

これまでに[関手](../CAT1-06/index.md#def-cat1-06-functor)で圏の対象と射を運び、[自然同型](../CAT1-07/index.md#def-cat1-07-natural-isomorphism)で二つの関手の値を、射と両立する形で比較できるようになった。しかし「二つの圏が同じ」と言うには、強さの異なる二つの答えがある。

例えば、対象 $a,b$ を持ち、どの二対象の間にも射がちょうど一本ある圏 $\mathcal E$ を考える（恒等射と合成は唯一の可能性で定める）。$a$ と $b$ は異なる対象だが、唯一の $a\to b$ と $b\to a$ の合成は各 Hom 集合の唯一の恒等射だから、[同型](../CAT1-03/index.md#def-cat1-03-isomorphism)である。一方、対象 $*$ と恒等射だけを持つ圏 $\mathbf 1$ には対象が一つしかない。

すべての射が逆射を持つ圏を **亜群（groupoid）** と呼ぶ。$\mathcal E$ では $x\to y$ の唯一の射 $u_{xy}$ に対し $u_{yx}$ が逆射なので、$\mathcal E$ は亜群の最小例の一つである。

$\mathcal E$ の二対象を一つの対象 $*$ へ送る関手は、対象集合の全単射にはなり得ない。それでも、どの二対象の間の射が何本あるか、どの射を合成できるかという情報は失わない。「同型な対象を重複して数えるかどうか」を区別するために、まず厳密に元へ戻す条件を、次により柔軟な比較を定義する。

以下の関手はすべて共変とする。$\mathcal C,\mathcal D$ は特に断らなければ局所小圏とし、$\operatorname{Hom}_{\mathcal C}(X,Y)$ は $X\to Y$ の射全体の集合を表す。大きな圏についても同じ式を使うが、代表対象を一斉に選ぶ場面では選択に関する仮定を明示する。

## 2. 圏同型：戻すと対象も射も厳密に一致する

一つの圏の中の[同型射](../CAT1-03/index.md#def-cat1-03-isomorphism)は、二つの対象を行き来して恒等射に戻す。圏そのものの間でも、関手を両方向へ合成して恒等**関手**そのものに戻る、という強い条件を考えられる。

<a id="def-cat1-09-category-isomorphism"></a>

<!-- formal-statement-start -->
> **定義（圏同型）**
>
> 圏 $\mathcal C,\mathcal D$ の間の関手 $F:\mathcal C\to\mathcal D$ が **圏同型** であるとは、関手 $G:\mathcal D\to\mathcal C$ が存在して
>
$$
GF=1_{\mathcal C},\qquad FG=1_{\mathcal D}
$$
>
> が対象上・射上で厳密に等しいことをいう。このとき $F,G$ は互いに逆関手であり、二つの圏を同型な圏と呼ぶ。
<!-- formal-statement-end -->

<!-- definition-example-start: def-cat1-09-category-isomorphism -->
**定義の確認**。一元集合 $\{*\}$ を対象とする圏と、一元集合 $\{0\}$ を対象とする圏は、どちらも射が恒等射だけなら圏同型である。$F(*)=0$、$F(1_*)=1_0$、$G(0)=*$、$G(1_0)=1_*$ と定めると、各圏で対象一つと射一つの双方に $GF=1$ と $FG=1$ が成立する。集合 $*$ と $0$ の名前が等しい必要はない。
<!-- definition-example-end -->

逆に、冒頭の $\mathcal E$ と $\mathbf 1$ は圏同型ではない。もし $GF=1_{\mathcal E}$ なら対象上で $F(a)=F(b)=*$ から

$$
a=G(F(a))=G(*)=G(F(b))=b
$$

となるが、$a\ne b$ に反する。ここで壊れたのは射の合成ではなく、**対象を一つずつ区別して戻す**という厳密な等号である。

## 3. 関手が射と対象の情報をどの程度保つか

単に対象を数える代わりに、対象 $X,Y$ を固定したときの射の写り方を調べる。[関手の合成保存](../CAT1-06/index.md#def-cat1-06-functor)により、関手 $F:\mathcal C\to\mathcal D$ は各組 $X,Y$ について写像

$$
F_{X,Y}:\operatorname{Hom}_{\mathcal C}(X,Y)
\longrightarrow \operatorname{Hom}_{\mathcal D}(FX,FY),
\qquad f\longmapsto F(f)
$$

を定める。異なる射を区別できることと、像側の射をすべて表現できることは別の条件である。

<a id="def-cat1-09-fully-faithful"></a>

<!-- formal-statement-start -->
> **定義（忠実・充満・充満忠実）**
>
> 局所小圏 $\mathcal C,\mathcal D$ と関手 $F:\mathcal C\to\mathcal D$ に対して、すべての対象 $X,Y\in\mathcal C$ について
>
> - $F_{X,Y}$ が単射なら $F$ は **忠実**（faithful）、
> - $F_{X,Y}$ が全射なら $F$ は **充満**（full）、
> - $F_{X,Y}$ が全単射なら $F$ は **充満忠実**（fully faithful）
>
> という。条件は対象の**すべての順序付き組**に課す。
<!-- formal-statement-end -->

<!-- definition-example-start: def-cat1-09-fully-faithful -->
**定義の確認**。$\mathcal E\to\mathbf 1$ の唯一の関手 $P$ を取る。$\mathcal E$ の任意の対象 $x,y$ に対して

$$
\operatorname{Hom}_{\mathcal E}(x,y)=\{u_{xy}\},
\qquad
\operatorname{Hom}_{\mathbf 1}(Px,Py)=\{1_*\}
$$

であり、$P_{x,y}(u_{xy})=1_*$ は一元集合間の全単射である。$x=y$ でも $x\ne y$ でも同じ検査が成立し、$P$ は充満忠実である。対象写像は単射でないが、**充満忠実は対象写像の単射性を要求しない**。
<!-- definition-example-end -->

対照的に、対象 $0,1$ と恒等射だけの離散圏 $\mathcal A$ から $\mathcal E$ へ、対象をそのまま移す関手 $J$ を取る。$x\ne y$ の Hom 写像は

$$
\varnothing=\operatorname{Hom}_{\mathcal A}(x,y)
\longrightarrow\operatorname{Hom}_{\mathcal E}(x,y)=\{u_{xy}\}
$$

であり、単射だが全射でない。$x=y$ では一元集合間の全単射なので、$J$ は忠実であって充満ではない。異なる対象の間の射を**新たに作り出してしまう**ことが充満性の失敗である。

射の情報だけでは、移し先の圏に「どんな対象が残っているか」は分からない。ただし、圏では[同型な対象](../CAT1-03/index.md#def-cat1-03-isomorphism)を区別しない比較が自然である。そこで、像として厳密に現れない対象も、像の対象と同型なら到達したものとみなす。

<a id="def-cat1-09-essentially-surjective"></a>

<!-- formal-statement-start -->
> **定義（本質的全射）**
>
> 圏 $\mathcal C,\mathcal D$ の間の関手 $F:\mathcal C\to\mathcal D$ が **本質的全射**（essentially surjective on objects）であるとは、任意の $D\in\mathcal D$ に対して対象 $X\in\mathcal C$ と同型射 $\alpha:FX\xrightarrow{\sim}D$ が存在することをいう。
<!-- formal-statement-end -->

<!-- definition-example-start: def-cat1-09-essentially-surjective -->
**定義の確認**。$\mathcal E\to\mathbf 1$ の $P$ は $* = P(a)$ だから、$X=a$ と $\alpha=1_*$ を選べば本質的全射である。逆方向の包含 $I:\mathbf 1\to\mathcal E$ を $I(*)=a$ と定めても、$D=a$ なら $1_a:a\to a$、$D=b$ なら唯一の $u_{ab}:a\to b$ がそれぞれ同型射なので本質的全射である。特に $I$ は対象上の通常の全射ではない。
<!-- definition-example-end -->

一方、二対象 $0,1$ の離散圏への一対象部分圏の包含は、対象 $1$ が対象 $0$ と同型でないため本質的全射ではない。「対象が足りない」と「同型な対象が二重にある」を区別できるのがこの条件である。

## 4. 圏の同値：自然同型の範囲で戻せればよい

圏同型では $GF$ が恒等関手と**等しい**必要があった。$\mathcal E$ の二対象を一対象へまとめるなら、戻した対象は元の対象と等しくなくても、各元の対象へ自然な同型射で戻れれば十分である。

<a id="def-cat1-09-equivalence"></a>

<!-- formal-statement-start -->
> **定義（圏の同値と準逆関手）**
>
> 圏 $\mathcal C,\mathcal D$ と関手 $F:\mathcal C\to\mathcal D$ に対し、関手 $G:\mathcal D\to\mathcal C$ および自然同型
>
$$
\eta:1_{\mathcal C}\xRightarrow{\sim}GF,
\qquad
\varepsilon:FG\xRightarrow{\sim}1_{\mathcal D}
$$
>
> が存在するとき、$F$ は **圏の同値**（equivalence of categories）、$G$ は $F$ の **準逆関手** と呼ぶ。$\mathcal C$ と $\mathcal D$ は同値な圏であるという。$\eta_X:X\to GFX$、$\varepsilon_D:FGD\to D$ は各対象で同型射であり、すべての射について自然性を満たす。
<!-- formal-statement-end -->

<!-- definition-example-start: def-cat1-09-equivalence -->
**定義の確認**。先ほどの $P:\mathcal E\to\mathbf 1$ と $I:\mathbf 1\to\mathcal E$（$I(*)=a$）について $PI=1_{\mathbf 1}$ である。$IP:\mathcal E\to\mathcal E$ は両対象を $a$ に移す。$\eta_x:x\to a$ を $x=a,b$ それぞれの唯一の射とすれば、逆向きの射 $a\to x$ があるので各成分は同型である。

さらに任意の射 $u_{xy}:x\to y$ について、$\eta_y\circ u_{xy}$ と $IP(u_{xy})\circ\eta_x$ はともに $x\to a$ の唯一の射である。ゆえに $\eta$ は自然同型である。$\varepsilon_*=1_*$ は $PI\Rightarrow1_{\mathbf 1}$ の自然同型なので、$P$ と $I$ は準逆関手である。ところが $IP(b)=a\ne b$、したがって圏同型ではない。
<!-- definition-example-end -->

<a id="prop-cat1-09-iso-equivalence"></a>

<!-- formal-statement-start -->
> **命題（圏同型は圏の同値を与える）**
>
> 圏同型 $F:\mathcal C\to\mathcal D$ は圏の同値である。逆は一般には成立しない。
<!-- formal-statement-end -->

### 証明の見取り図

厳密な逆関手があれば、二つの自然同型として恒等自然変換を選べる。逆向きは $\mathcal E$ と $\mathbf 1$ の対象数を比較する。

<!-- proof-start -->
### 証明

[圏同型](#def-cat1-09-category-isomorphism)の逆関手を $G$ とすると $GF=1_{\mathcal C}$、$FG=1_{\mathcal D}$ である。各対象 $X,D$ で $\eta_X=1_X$、$\varepsilon_D=1_D$ と置くと、恒等射と合成の単位律から任意の $f:X\to Y$ で $\eta_Y\circ f=f=GF(f)\circ\eta_X$、任意の $h:D\to E$ で $h\circ\varepsilon_D=h=\varepsilon_E\circ FG(h)$ を満たす。各成分は同型なので[圏の同値](#def-cat1-09-equivalence)である。逆が偽なのは、上の $P:\mathcal E\to\mathbf 1$ が同値だが対象集合の全単射を持たず圏同型でないからである。$\square$
<!-- proof-end -->

この違いは「二対象が同型である」と「二対象が等号で同じである」の違いである。準逆関手は、同型で重複した対象を捨てた後にも圏の射と合成を復元できる。

## 5. 充満忠実関手は同型射を見落とさない

次の同値判定に向けて、重要な小道具を証明する。関手は[同型射を同型射へ送る](../CAT1-06/index.md#prop-cat1-06-preservation)が、任意の関手が同型を逆向きに検出できるわけではない。充満なら逆射の候補を持ち上げられ、忠実なら逆射の二つの恒等式を取り戻せる。

<a id="prop-cat1-09-reflect-iso"></a>

<!-- formal-statement-start -->
> **命題（充満忠実関手は同型射を反映する）**
>
> 局所小圏 $\mathcal C,\mathcal D$ の間の充満忠実関手 $F:\mathcal C\to\mathcal D$ と射 $f:X\to Y$ に対し、$F(f)$ が $\mathcal D$ の同型射なら、$f$ は $\mathcal C$ の同型射である。
<!-- formal-statement-end -->

### 証明の見取り図

$F(f)^{-1}$ は $FY\to FX$ の射なので、充満性によって $Y\to X$ の射へ持ち上げる。その射が $f$ の両側逆であることは忠実性から戻す。

<!-- proof-start -->
### 証明

$h:FY\to FX$ を $F(f)$ の逆射とする。[充満性](#def-cat1-09-fully-faithful)を対象組 $(Y,X)$ へ適用すると $g:Y\to X$ で $F(g)=h$ を満たすものが存在する。関手の合成保存から

$$
F(g\circ f)=F(g)\circ F(f)=h\circ F(f)=1_{FX}=F(1_X).
$$

同様に $F(f\circ g)=F(1_Y)$。[忠実性](#def-cat1-09-fully-faithful)を $(X,X)$ と $(Y,Y)$ に適用すると、それぞれ $g\circ f=1_X$、$f\circ g=1_Y$ を得る。[同型射の定義](../CAT1-03/index.md#def-cat1-03-isomorphism)から $f$ は同型である。$\square$
<!-- proof-end -->

## 6. 圏の同値の実用判定

準逆関手を最初から思い付くのは難しいことがある。一方、充満・忠実・本質的全射なら Hom 写像と対象の像を直接調べられる。実はこの三条件が、準逆関手を持つことと（通常の選択の下で）同値になる。

<a id="thm-cat1-09-equivalence-criterion"></a>

<!-- formal-statement-start -->
> **定理（圏の同値の判定）**
>
> 小さい圏 $\mathcal C,\mathcal D$ と共変関手 $F:\mathcal C\to\mathcal D$ に対して、次は同値である。
>
> 1. $F$ は[圏の同値](#def-cat1-09-equivalence)、すなわち準逆関手と二つの自然同型を持つ。
> 2. $F$ は[充満忠実](#def-cat1-09-fully-faithful)かつ[本質的全射](#def-cat1-09-essentially-surjective)である。
>
> ここでは通常の集合の[選択公理](../../../基礎科目/F0/F0-00A2/index.md#axiom-choice)を用いる。大きな局所小圏でも、各 $D\in\mathcal D$ に対象 $X_D\in\mathcal C$ と同型 $FX_D\cong D$ を一斉に選んだデータが与えられれば、同じ構成が成立する。
<!-- formal-statement-end -->

### 証明の見取り図

**準逆 $\Rightarrow$ 三条件**。自然同型で $GF$ を恒等関手へ戻すと、Hom 写像の合成 $G_{FX,FY}\circ F_{X,Y}$ が全単射になる。加えて $FG$ が恒等関手と自然同型なので $G$ 自身が忠実であり、$F$ の Hom 写像も全単射と分かる。

**三条件 $\Rightarrow$ 準逆**。各 $D$ に像の代表 $FX_D$ と同型 $\alpha_D:FX_D\to D$ を選ぶ。任意の $h:D\to E$ を $\alpha_E^{-1}h\alpha_D$ で像の対象間の射へ移し、充満忠実性で一意に持ち上げれば関手 $G$ が作れる。二つの自然同型はこの選択から構成する。

<!-- proof-start -->
### 証明

**（1）$\Rightarrow$（2）：本質的全射。** 準逆関手 $G:\mathcal D\to\mathcal C$ と自然同型 $\eta:1_{\mathcal C}\Rightarrow GF$、$\varepsilon:FG\Rightarrow1_{\mathcal D}$ を取る。任意の $D\in\mathcal D$ に対し $X=G(D)$ と $\alpha=\varepsilon_D:FGD\to D$ を選べるから、$F$ は本質的全射である。

**（1）$\Rightarrow$（2）：$G$ は忠実。** $u,v:D\to E$ が $G(u)=G(v)$ を満たすなら $FG(u)=FG(v)$ である。$\varepsilon$ の[自然性](../CAT1-07/index.md#def-cat1-07-natural-transformation)から

$$
u\circ\varepsilon_D=\varepsilon_E\circ FG(u)
=\varepsilon_E\circ FG(v)=v\circ\varepsilon_D.
$$

$\varepsilon_D$ は同型なので右から逆射を合成して $u=v$ となる。したがって $G$ は忠実である。

**（1）$\Rightarrow$（2）：$F$ は充満忠実。** 任意の $X,Y\in\mathcal C$ に対し $\eta$ の自然性は

$$
GF(f)\circ\eta_X=\eta_Y\circ f
\quad(f:X\to Y)
$$

である。よって $GF$ の Hom 写像は

$$
f\longmapsto\eta_Y\circ f\circ\eta_X^{-1}
$$

に等しい。この対応は両側で同型射を合成する操作であり、逆写像は $k\mapsto\eta_Y^{-1}\circ k\circ\eta_X$ だから全単射である。特に $F(f)=F(g)$ なら $GF(f)=GF(g)$ であるため $f=g$、すなわち $F$ は忠実。

さらに任意の $h:FX\to FY$ に対して

$$
f:=\eta_Y^{-1}\circ G(h)\circ\eta_X:X\to Y
$$

と定める。$\eta$ の自然性を**この $f$** に適用すると

$$
G(F(f))=\eta_Y\circ f\circ\eta_X^{-1}=G(h).
$$

直前に示した $G$ の忠実性を射 $F(f),h:FX\to FY$ に適用して $F(f)=h$ を得る。よって $F$ は充満でもある。

**（2）$\Rightarrow$（1）：対象の選択。** 任意の $D\in\mathcal D$ に対し、[本質的全射](#def-cat1-09-essentially-surjective)によって対象 $X_D\in\mathcal C$ と同型射

$$
\alpha_D:F(X_D)\xrightarrow{\sim}D
$$

を一組選ぶ。$\mathcal D$ は小さいので、選択公理を用いてすべての $D$ に対して同時に選べる。$G(D):=X_D$ と置く。

**射の選択と関手性。** 任意の $h:D\to E$ に対して

$$
\alpha_E^{-1}\circ h\circ\alpha_D:
F(X_D)\longrightarrow F(X_E)
$$

は像の対象間の射である。$F$ が充満忠実なので、**ただ一つ**の $G(h):X_D\to X_E$ が存在して

$$
F(G(h))=\alpha_E^{-1}\circ h\circ\alpha_D
$$

を満たす。この射を持ち上げる等式を、以下では「持ち上げ式」と呼ぶ。

$h=1_D$ なら右辺は $\alpha_D^{-1}\alpha_D=1_{FX_D}=F(1_{X_D})$。忠実性から $G(1_D)=1_{X_D}$ となる。また $h:D\to E$, $k:E\to T$ について

$$
\begin{aligned}
F(G(k)\circ G(h))
&=F(G(k))\circ F(G(h))\\
&=(\alpha_T^{-1}\circ k\circ\alpha_E)
  \circ(\alpha_E^{-1}\circ h\circ\alpha_D)\\
&=\alpha_T^{-1}\circ(k\circ h)\circ\alpha_D\\
&=F(G(k\circ h)).
\end{aligned}
$$

忠実性より $G(k\circ h)=G(k)\circ G(h)$。従って $G:\mathcal D\to\mathcal C$ は関手である。

**$\varepsilon$ の自然性。** 各 $D$ で $\varepsilon_D:=\alpha_D:FGD\to D$ と置く。持ち上げ式に左から $\alpha_E$ を合成すると

$$
\varepsilon_E\circ FG(h)
=\alpha_E\circ(\alpha_E^{-1}\circ h\circ\alpha_D)
=h\circ\varepsilon_D.
$$

各 $\varepsilon_D$ は同型射だから $\varepsilon:FG\Rightarrow1_{\mathcal D}$ は自然同型である。

**$\eta$ の構成と自然性。** 任意の $X\in\mathcal C$ に対し、$D=FX$ とすると $\alpha_{FX}:FGFX\to FX$ は同型である。充満忠実性により

$$
F(\eta_X)=\alpha_{FX}^{-1}:FX\longrightarrow FGFX
$$

を満たすただ一つの $\eta_X:X\to GFX$ が存在する。[同型反映](#prop-cat1-09-reflect-iso)から各 $\eta_X$ は同型である。

任意の $f:X\to Y$ について、左辺と右辺を $F$ で送って比べると

$$
F(\eta_Y\circ f)=\alpha_{FY}^{-1}\circ F(f),
$$

および持ち上げ式を $h=F(f):FX\to FY$ に適用して

$$
\begin{aligned}
F(GF(f)\circ\eta_X)
&=F(GF(f))\circ F(\eta_X)\\
&=(\alpha_{FY}^{-1}\circ F(f)\circ\alpha_{FX})
  \circ\alpha_{FX}^{-1}\\
&=\alpha_{FY}^{-1}\circ F(f).
\end{aligned}
$$

忠実性により $\eta_Y\circ f=GF(f)\circ\eta_X$。これで $\eta:1_{\mathcal C}\Rightarrow GF$ も自然同型となり、$G$ が準逆関手である。$\square$
<!-- proof-end -->

**大きさに関する注意**。この証明の選択は「各 $D$ に一組の代表を選ぶ」操作である。大きい圏の対象が真の類をなす場合、通常の集合の選択公理だけで類全体の同時選択を正当化することはできない。したがって大きな圏で本定理の逆向きを使う際は、上に書いた選択データ、またはそれを保証する基礎付けを明示する。すでに準逆関手がある方向には、この追加の選択は必要ない。

### 6.1 実際の判定手順

関手 $F$ が与えられたら、次の順に検査すると準逆を当て推量しなくて済む。

1. 任意の $X,Y$ について $F_{X,Y}$ を書き、単射と全射を別々に調べる。
2. その後、任意の $D$ が像の対象 $FX$ と**同型**かを調べる。
3. 三条件が成立したら、$\alpha_D$ を選び、証明中の持ち上げ式に従って $G$ を構成する。

「すべての射が像から来る」と「すべての対象が像と同型である」は異なる量化であり、一方から他方を推測してはいけない。

## 7. 同値でも同型とは限らない理由を広げる

### 7.1 半順序圏では同値が圏同型まで強くなる

[半順序圏](../CAT1-02/index.md#prop-cat1-02-order-category)では二つの対象が同型なら、反対称律によって等しい。従って対象の「同型による重複」は初めから存在しない。この性質のため、同値は圏同型へ強まる。

<a id="prop-cat1-09-poset-rigidity"></a>

<!-- formal-statement-start -->
> **命題（半順序圏の同値は圏同型である）**
>
> 小さい半順序集合 $P,Q$ をそれぞれ圏とみなし、関手 $F:P\to Q$ が圏の同値なら、$F$ は圏同型である。
<!-- formal-statement-end -->

### 証明の見取り図

本質的全射と「同型なら等しい」から対象写像の全射性を得る。充満忠実性は、順序関係を両方向へ保存・反映するので対象写像の単射性と逆関手の存在を与える。

<!-- proof-start -->
### 証明

[同値判定](#thm-cat1-09-equivalence-criterion)により $F$ は充満忠実かつ本質的全射である。任意の $q\in Q$ は $F(p)\cong q$ となる $p\in P$ を持つ。半順序圏では同型は等号だから $F(p)=q$。よって対象写像は全射。

もし $F(p)=F(p')$ なら $Q$ には両方向の恒等射がある。充満性を $(p,p')$、$(p',p)$ に適用すると $p\le p'$ と $p'\le p$ の射が存在し、$P$ の反対称律から $p=p'$。よって対象写像は単射。

対象写像の逆を $G:Q\to P$ の対象部分とする。$q\le q'$ なら $F(Gq)=q$、$F(Gq')=q'$ なので、$Q$ の唯一の射 $q\to q'$ を充満性で $Gq\to Gq'$ に持ち上げられる。これは $P$ の順序関係の存在を意味し、射は各 Hom で高々一本なので恒等射・合成を保つ。対象写像の逆性と Hom の一意性により $GF=1_P$、$FG=1_Q$ が射についても成り立ち、[圏同型](#def-cat1-09-category-isomorphism)である。$\square$
<!-- proof-end -->

### 7.2 三条件を一つずつ外すと何が壊れるか

- **充満性を外す**：二対象離散圏 $\mathcal A\to\mathcal E$ の $J$ は忠実・本質的全射である。だが $\operatorname{Hom}_{\mathcal A}(0,1)=\varnothing$ から $\operatorname{Hom}_{\mathcal E}(0,1)=\{u_{01}\}$ への写像は全射でない。$\mathcal E$ で存在する $0\cong1$ の射を $\mathcal A$ に戻せず、準逆は存在しない。
- **忠実性を外す**：対象一つ・射二つ $e,z$ を持つ圏 $\mathcal M$ を取り、合成を $e$ は単位、$z\circ z=z$ と定める。[一対象圏の構成](../CAT1-02/index.md#prop-cat1-02-one-object)から圏となる。唯一の関手 $\mathcal M\to\mathbf 1$ は二元 Hom を一元 Hom に写すので全射だが単射でない。対象上も全射なので充満・本質的全射だが同値でない。$e$ と $z$ が区別不能になっている。
- **本質的全射性を外す**：一対象離散圏 $\mathbf 1$ を二対象離散圏 $\mathcal A$ の対象 $0$ へ含める関手は唯一の Hom 写像が全単射なので充満忠実。しかし $1$ は $0$ と同型でないため本質的全射ではない。

三条件を一つの「だいたい全単射」という印象にまとめず、射の消失・射の追加・到達できない対象という三つの失敗を別々に検査する。

## 8. 演習：Hom、対象、準逆を別々に検証する

### CAT1-09-A01 一元 Hom の全単射

- Level: A

対象 $a,b$ を持ち、すべての順序付き組 $(x,y)$ に射が一本ずつある圏 $\mathcal E$ と一対象圏 $\mathbf 1$ を考える。唯一の $P:\mathcal E\to\mathbf 1$ について Hom 写像 $P_{a,a},P_{a,b},P_{b,a},P_{b,b}$ を列挙し、充満・忠実を判定せよ。

<!-- solution-start -->
**詳細解答**。射を $u_{xy}:x\to y$ と書く。任意の $x,y\in\{a,b\}$ について

$$
P_{x,y}:\{u_{xy}\}\to\{1_*\},\qquad u_{xy}\mapsto1_*.
$$

$x=y$ の二つは $u_{xx}=1_x$ に対応し、$x\ne y$ の二つは逆向きの同型射に対応する。四つとも定義域と値域が一元集合であるから単射かつ全射。従って[充満忠実の定義](#def-cat1-09-fully-faithful)の全対象組を満たす。
<!-- solution-end -->

### CAT1-09-A02 通常の全射でなくてもよい

- Level: A

$I:\mathbf 1\to\mathcal E$ を $I(*)=a$ とする。$I$ が対象上全射でないこと、本質的全射であることを、対象 $a,b$ のそれぞれに対する同型射を挙げて説明せよ。

<!-- solution-start -->
**詳細解答**。像の対象は $a$ だけで $b\notin\{I(*)\}$ なので、対象写像は通常の全射でない。任意の $D\in\mathcal E$ を検査する。$D=a$ には $\alpha_a=1_a:I(*)\to a$ を、$D=b$ には $\alpha_b=u_{ab}:I(*)\to b$ を選ぶ。$\alpha_b$ の逆射は $u_{ba}$ で、$u_{ba}\circ u_{ab}=1_a$、$u_{ab}\circ u_{ba}=1_b$ である。よってどちらの $D$ も像の対象と同型であり、[本質的全射](#def-cat1-09-essentially-surjective)である。
<!-- solution-end -->

### CAT1-09-A03 準逆の自然性を二本で検査する

- Level: A

$P,I$ を上記の通りとし、$\eta_x=u_{xa}:x\to a=IP(x)$ と定める。非恒等射 $u_{ab}:a\to b$、$u_{ba}:b\to a$ のそれぞれについて $\eta_y\circ u_{xy}=IP(u_{xy})\circ\eta_x$ を直接計算せよ。

<!-- solution-start -->
**詳細解答**。$IP(u_{xy})=1_a$ は $a\to a$ の射である。$u_{ab}$ には

$$
\eta_b\circ u_{ab}=u_{ba}\circ u_{ab}=1_a
=1_a\circ1_a=IP(u_{ab})\circ\eta_a.
$$

$u_{ba}$ には

$$
\eta_a\circ u_{ba}=1_a\circ u_{ba}=u_{ba}
=1_a\circ u_{ba}=IP(u_{ba})\circ\eta_b.
$$

恒等射での自然性は単位律で成立する。すべての成分 $u_{xa}$ は逆向きの $u_{ax}$ を持つので、これは[自然同型](../CAT1-07/index.md#def-cat1-07-natural-isomorphism)である。
<!-- solution-end -->

### CAT1-09-A04 同型反映で逆射を持ち上げる

- Level: A

充満忠実関手 $F:\mathcal C\to\mathcal D$、射 $f:X\to Y$ と $h:FY\to FX$ が $hF(f)=1_{FX}$、$F(f)h=1_{FY}$ を満たすとする。$g:Y\to X$ の存在と $gf=1_X$、$fg=1_Y$ を、それぞれどの条件で導くか明記せよ。

<!-- solution-start -->
**詳細解答**。[充満性](#def-cat1-09-fully-faithful)を Hom$(Y,X)$ に適用して $F(g)=h$ となる $g$ を得る。すると $F(gf)=F(g)F(f)=hF(f)=1_{FX}=F(1_X)$。忠実性を Hom$(X,X)$ に適用して $gf=1_X$ と分かる。逆側も $F(fg)=F(f)F(g)=F(f)h=1_{FY}=F(1_Y)$ に忠実性を Hom$(Y,Y)$ で適用して $fg=1_Y$。従って $f$ の逆射は $g$ である。
<!-- solution-end -->

### CAT1-09-A05 二対象の離散圏の包含

- Level: A

二対象 $0,1$ の離散圏 $\mathcal A$ と一対象 $0$ の充満部分圏 $\mathcal B$ を考える。包含 $K:\mathcal B\to\mathcal A$ の充満・忠実・本質的全射の真偽を調べよ。

<!-- solution-start -->
**詳細解答**。$\mathcal B$ の対象組は $(0,0)$ だけで、$K_{0,0}:\{1_0\}\to\{1_0\}$ は全単射。よって充満かつ忠実である。対象 $1\in\mathcal A$ は、離散圏には $0\to1$ の射がないため $K(0)=0$ と同型でない。したがって本質的全射ではない。これは Hom の全単射性が、移し先の未到達対象まで保証しない例である。
<!-- solution-end -->

### CAT1-09-B01 三つの欠損を異なる例で示す

- Level: B

次の関手の充満・忠実・本質的全射をすべて判定し、それぞれ同値でない理由を述べよ。

1. 二対象離散圏 $\mathcal A$ から二対象の薄い連結亜群 $\mathcal E$ への対象恒等関手 $J$。
2. 射が $e,z$ で $e$ が単位・$z^2=z$ の一対象圏 $\mathcal M$ から $\mathbf 1$ への唯一の関手 $Q$。
3. 一対象離散圏 $\mathbf 1$ から $\mathcal A$ への包含 $K$。

<!-- solution-start -->
**詳細解答**。

1. $J$ は、異なる対象への Hom 写像 $\varnothing\to\{u_{xy}\}$ が単射・非全射、同一対象への写像は一元集合間の全単射なので忠実だが充満でない。$\mathcal E$ の両対象は自分自身が $J$ の像なので本質的全射である。像にない射 $u_{ab}$ を戻せない。
2. $Q_{*,*}:\{e,z\}\to\{1_*\}$ は全射だが $Q(e)=Q(z)$ で単射でない。対象は一つで $Q(*)=*$ なので本質的全射。従って充満・本質的全射だが忠実でない。異なる射 $e\ne z$ がつぶれる。
3. $K_{*,*}:\{1_*\}\to\{1_0\}$ は全単射で充満忠実。だが $\mathcal A$ の $1$ は $0$ と同型でないので本質的全射ではない。像の対象では表せない対象が残る。

[同値判定](#thm-cat1-09-equivalence-criterion)によりいずれも同値ではない。三例はそれぞれ異なる一条件を落としている。
<!-- solution-end -->

### CAT1-09-B02 準逆から Hom の全射性を再構成する

- Level: B

圏同値 $F:\mathcal C\to\mathcal D$、準逆 $G$、自然同型 $\eta:1_{\mathcal C}\Rightarrow GF$, $\varepsilon:FG\Rightarrow1_{\mathcal D}$ を与える。任意の $h:FX\to FY$ に対し $f=\eta_Y^{-1}G(h)\eta_X$ と置き、$F(f)=h$ を証明せよ。$\varepsilon$ の自然性を使う箇所を明確にせよ。

<!-- solution-start -->
**詳細解答**。$G(h):GFX\to GFY$ なので合成 $f:X\xrightarrow{\eta_X}GFX\xrightarrow{G(h)}GFY\xrightarrow{\eta_Y^{-1}}Y$ は型が合う。$\eta$ の自然性を $f:X\to Y$ に適用すると

$$
G(F(f))=\eta_Y\circ f\circ\eta_X^{-1}
=\eta_Y(\eta_Y^{-1}G(h)\eta_X)\eta_X^{-1}
=G(h).
$$

$F(f),h:FX\to FY$ を $G$ によって送った射が一致した。$G$ の忠実性は $\varepsilon$ の自然性 $u\varepsilon_D=\varepsilon_EFG(u)$ を二射 $u,v:D\to E$ について比較し、$G(u)=G(v)$ なら $u\varepsilon_D=v\varepsilon_D$、同型 $\varepsilon_D$ の逆を右合成して $u=v$ と証明できる。これを $F(f),h$ に適用して $F(f)=h$。ここでは $\varepsilon$ は $G$ の忠実性の証明に使われる。
<!-- solution-end -->

### CAT1-09-B03 代表の選択で合成が保たれる

- Level: B

小さい圏の充満忠実・本質的全射関手 $F:\mathcal C\to\mathcal D$ を取る。各 $D$ に $X_D$ と $\alpha_D:FX_D\to D$ を選び、$F(Gh)=\alpha_E^{-1}h\alpha_D$ で $G(h)$ を定める。$G(1_D)=1_{X_D}$ と $G(kh)=G(k)G(h)$ を証明し、$\alpha_D$ がなぜ自然同型の成分になるか説明せよ。

<!-- solution-start -->
**詳細解答**。充満性により右辺を射 $Gh:X_D\to X_E$ へ持ち上げられ、忠実性によりその持ち上げは一意である。恒等射には

$$
F(G(1_D))=\alpha_D^{-1}1_D\alpha_D
=1_{FX_D}=F(1_{X_D})
$$

なので忠実性から $G(1_D)=1_{X_D}$。$h:D\to E$, $k:E\to T$ には

$$
\begin{aligned}
F(G(k)G(h))
&=(\alpha_T^{-1}k\alpha_E)(\alpha_E^{-1}h\alpha_D)\\
&=\alpha_T^{-1}kh\alpha_D=F(G(kh)).
\end{aligned}
$$

忠実性から $G(k)G(h)=G(kh)$。また式を $\alpha_E$ で左合成すると $\alpha_EFG(h)=h\alpha_D$ となり、これは $\alpha:FG\Rightarrow1_{\mathcal D}$ の自然性そのものである。すべての $\alpha_D$ は選択時点で同型だったので自然同型である。
<!-- solution-end -->

### CAT1-09-B04 半順序圏の剛性

- Level: B

有限半順序集合 $P,Q$ を圏とし、関手 $F:P\to Q$ は充満忠実かつ本質的全射とする。$F(p)=F(p')$ なら $p=p'$、任意の $q\in Q$ はある $F(p)$ に等しいことを個別に証明し、逆写像が順序を保存する理由を示せ。

<!-- solution-start -->
**詳細解答**。$F(p)=F(p')$ なら $Q$ で二方向の恒等射がある。充満性により $P$ には $p\to p'$ と $p'\to p$ が存在するので $p\le p'$、$p'\le p$。半順序の反対称律で $p=p'$。任意の $q$ は本質的全射性により $F(p)\cong q$ となるが、半順序圏で同型なら二方向の不等式が成り立つから $F(p)=q$。従って対象写像は全単射。$q\le q'$ なら対応する対象 $p=F^{-1}(q)$、$p'=F^{-1}(q')$ の間へ、充満性により射 $p\to p'$ を持ち上げられるので $p\le p'$。これで逆写像も順序を保存する。Hom が高々一元なので逆関手は射上も厳密な逆を与える。
<!-- solution-end -->

### CAT1-09-C01 同型類から亜群の代表を選ぶ

- Level: C

小さい亜群（groupoid）$\mathcal G$（すべての射が同型射である圏）を考える。各対象の同型類から代表を一つずつ選んだ対象全体を $R$ とし、$R$ 上の充満部分圏 $\mathcal S$ を取る。包含 $I:\mathcal S\to\mathcal G$ について次をすべて示せ。

1. $I$ の充満性と忠実性。
2. $I$ の本質的全射性。
3. 各 $x\in\mathcal G$ に代表 $r_x\in R$ と同型 $s_x:r_x\to x$ を選び、$H(x)=r_x$、$H(f)=s_y^{-1}fs_x$ で $H:\mathcal G\to\mathcal S$ を構成できること。
4. $H$ が $I$ の準逆であること。可能なら $r\in R$ では $r_r=r$, $s_r=1_r$ と選び、$HI=1_{\mathcal S}$ を確かめよ。

<!-- solution-start -->
**詳細解答**。

**1. Hom の全単射。** 充満部分圏の定義により、任意の $r,t\in R$ について

$$
\operatorname{Hom}_{\mathcal S}(r,t)
=\operatorname{Hom}_{\mathcal G}(r,t).
$$

包含は射をそのまま送るから $I_{r,t}$ は恒等写像で、単射かつ全射である。よって充満忠実。

**2. 本質的全射。** 各 $x$ の同型類には、選んだ代表 $r_x$ がある。同型類の意味から同型射 $s_x:r_x\to x$ が存在し、$I(r_x)=r_x$ なので本質的全射の定義を満たす。亜群であることは、対象間のすべての射が逆射を持つことを保証する。

**3. 関手の構成。** $f:x\to y$ に対し $s_y^{-1}:y\to r_y$、$s_x:r_x\to x$ なので

$$
H(f)=s_y^{-1}\circ f\circ s_x:r_x\to r_y
$$

は $\mathcal S$ の射である（充満部分圏だから元の Hom と同じ）。恒等射には $H(1_x)=s_x^{-1}1_xs_x=1_{r_x}$。$f:x\to y$、$g:y\to z$ には

$$
\begin{aligned}
H(g)\circ H(f)
&=(s_z^{-1}gs_y)(s_y^{-1}fs_x)\\
&=s_z^{-1}g(s_ys_y^{-1})fs_x\\
&=s_z^{-1}(g\circ f)s_x=H(g\circ f).
\end{aligned}
$$

したがって $H$ は関手。

**4. 二つの自然同型。** 各 $x$ で $s_x:IH(x)\to x$ は同型であり、

$$
s_y\circ IH(f)=s_y(s_y^{-1}fs_x)=f\circ s_x
$$

なので $s:IH\Rightarrow1_{\mathcal G}$ は自然同型。代表 $r$ に対して $r_r=r$、$s_r=1_r$ と選ぶと $HI(r)=r$、任意の $f:r\to t$ に対して $HI(f)=1_t^{-1}f1_r=f$ なので $HI=1_{\mathcal S}$。恒等自然変換 $1_{\mathcal S}\Rightarrow HI$ と $s$ が二つの必要な自然同型である。一般の選択でも $r\to r_r$ の同型から $1_{\mathcal S}\Rightarrow HI$ を作れるが、代表上で恒等を選ぶと厳密な等号になる。
<!-- solution-end -->

### CAT1-09-C02 非自明な射を持つ二対象亜群の同値

- Level: C

群 $(H,\cdot,e)$ を任意に一つ取り、対象 $0,1$ の圏 $\mathcal T_H$ を次のように定める。各 $i,j\in\{0,1\}$ の Hom$(i,j)$ は $H$ のコピーであり、その元を $(i,j,h)$ と書く。合成は

$$
(j,k,g)\circ(i,j,h)=(i,k,g\cdot h)
$$

とし、$1_i=(i,i,e)$ とする。一対象圏 $\mathcal B_H$ は Hom$(*,*)=H$、合成が群の積である。$F:\mathcal T_H\to\mathcal B_H$ を $F(i)=*$、$F(i,j,h)=h$ と定める。次をすべて示せ。

1. $\mathcal T_H$ が圏であり、すべての射が同型であること。
2. $F$ は充満忠実かつ本質的全射であること。
3. $G(*)=0$、$G(h)=(0,0,h)$ とした $G$ が準逆であり、$\eta_i=(i,0,e)$、$\varepsilon_*=e$ が必要な自然同型を与えること。
4. $\mathcal T_H$ と $\mathcal B_H$ は圏同型でないこと。

<!-- solution-start -->
**詳細解答**。

**1. 圏公理と逆射。** $i\xrightarrow{h}j\xrightarrow{g}k\xrightarrow{t}\ell$ に対し

$$
t\circ(g\circ h)\ \leftrightarrow\ t\cdot(g\cdot h)
=(t\cdot g)\cdot h\ \leftrightarrow\ (t\circ g)\circ h
$$

は群の結合律で一致する。単位は $e\cdot h=h=h\cdot e$ から左右とも成立する。射 $(i,j,h)$ の逆射は $(j,i,h^{-1})$ であり、両合成のラベルは $h^{-1}h=e=hh^{-1}$ だからそれぞれ $1_i,1_j$ になる。

**2. 三条件。** $F$ は恒等射を $e$ に、合成 $g h$ を $F(g)F(h)$ に送るから関手である。任意の $(i,j)$ で

$$
F_{i,j}:\{(i,j,h):h\in H\}\to H,\qquad(i,j,h)\mapsto h
$$

は逆写像 $h\mapsto(i,j,h)$ を持ち、全単射。対象 $*$ は $F(0)$ そのものなので本質的全射である。

**3. 準逆。** $G$ は $e$ と群積をそのまま $\mathcal T_H$ の Hom$(0,0)$ へ送るので関手である。$FG=1_{\mathcal B_H}$ が対象・射の双方で成立する。$GF$ は対象 $i$ を $0$ へ、$(i,j,h)$ を $(0,0,h)$ へ送る。各 $\eta_i=(i,0,e):i\to0$ は逆射 $(0,i,e)$ を持つ。自然性を $f=(i,j,h)$ に対して計算すると

$$
\begin{aligned}
GF(f)\circ\eta_i&=(0,0,h)\circ(i,0,e)=(i,0,h),\\
\eta_j\circ f&=(j,0,e)\circ(i,j,h)=(i,0,h).
\end{aligned}
$$

従って $\eta:1_{\mathcal T_H}\Rightarrow GF$ は自然同型。$\varepsilon_*=e$ は $FG=1_{\mathcal B_H}$ の恒等自然変換である。よって $G$ は準逆となる。

**4. 圏同型でない理由。** $\mathcal T_H$ は異なる対象二つ、$\mathcal B_H$ は一つ。圏同型なら対象写像に両側逆が存在し全単射でなければならない。しかし二元集合から一元集合への全単射はなく、圏同型ではない。$H$ が自明群でも非自明群でもこの区別は変わらない。
<!-- solution-end -->

## 9. 次の講義へ

圏同型は対象も射も厳密に戻すのに対し、圏の同値は自然同型の範囲で戻す。充満忠実性は Hom の全単射、本質的全射性は像との同型で、三条件から準逆関手を実際に構成できた。次は、対象 $A$ を「$A$ から、または $A$ への射の集合」を使って認識する**表現可能関手と普遍元**を学ぶ。
