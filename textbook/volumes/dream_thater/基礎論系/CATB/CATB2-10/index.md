# CATB2-10 冪等分裂とCauchy完備化

## 1. 一度選んだ部分を対象として扱いたい

集合 $X=\{0,1,2\}$ 上で $e(0)=0,e(1)=1,e(2)=1$ とする。二度適用しても結果は変わらない。この写像が選び出す部分は $\{0,1\}$ である。集合の圏ではその部分も対象だが、対象を制限した圏では選び出した部分が圏内に存在するとは限らない。

前講で構成した[集合値分配子の双圏 Prof](../CATB2-09/index.md#thm-catb2-09-prof)では、対象間の射の集合を分配子として扱えた。今回は、既存の対象から切り出した部分を新しい対象として補い、この補い方が分配子の表現可能性とどう結び付くかを調べる。

以下、$\mathcal C$ は固定した宇宙に関して[小さい圏](../../CAT/CAT1-02/index.md#def-cat1-02-size)である通常の圏とする。関手の値を取る圏や関手圏は必要に応じてより大きな宇宙に置く。射の合成は右から左に読み、$gf=g\circ f$ と書く。$1_X$ は対象 $X$ の恒等射、$\operatorname{Hom}_{\mathcal C}(X,Y)$ は $X$ から $Y$ への射の集合である。自己射 $e$ の二回の合成は $e^2=ee$ と書く。

## 2. 二度適用しても変わらない射

冒頭の $e$ は自己射であり、$ee=e$ を満たす。この性質だけから、部分を選ぶという操作を抽象化する。既習の[分裂モノ射・分裂エピ射](../../CAT/CAT1-03/index.md#def-cat1-03-split)では片側の逆射を考えた。今回はそのような射の対が与えられた自己射を復元することまで要求する。

<a id="def-catb2-10-idempotent"></a>

<!-- formal-statement-start -->
> **定義（圏の冪等射と分裂）**
>
> 圏 $\mathcal C$ の自己射 $e:X\to X$ が $e^2=e$ を満たすとき、冪等射という。その分裂とは対象 $Y$ と射 $r:X\to Y$、$i:Y\to X$ であって

$$
ir=e,\qquad ri=1_Y
$$

> を満たす組 $(Y,r,i)$ である。
<!-- formal-statement-end -->

<!-- definition-example-start: def-catb2-10-idempotent -->
**定義の確認**。 冒頭の集合の写像では、

$$
e^2(0)=0,\qquad e^2(1)=1,\qquad e^2(2)=1
$$

なので冪等である。$Y=\{0,1\}$ とし、射を

$$
r(0)=0,\quad r(1)=r(2)=1,\qquad i(y)=y
$$

と取る。$ir$ は三つの元をそれぞれ $0,1,1$ に送るから $e$ に等しい。$ri$ は $0,1$ をそれぞれ自分に戻すから $1_Y$ に等しい。二条件をともに確認できた。
<!-- definition-example-end -->

逆に $ri=1_Y$ が成り立つ対から作る射は $(ir)^2=i(ri)r=ir$ となる。分裂があれば冪等になるが、冪等性だけでは $Y$ の存在を保証しない。

<a id="prop-catb2-10-splitting-unique"></a>

<!-- formal-statement-start -->
> **命題（冪等射の分裂の一意性）**
>
> 圏 $\mathcal C$ の冪等射 $e:X\to X$ の二つの分裂を $(Y,r,i)$、$(Z,s,j)$ とする。$hr=s$、$jh=i$ を満たす射 $h:Y\to Z$ がただ一つ存在し、それは同型射である。
<!-- formal-statement-end -->

### 証明の見取り図

一方の部分から元の対象 $X$ に戻り、もう一方の部分を選び直す。二回選び直す操作が元に戻ることを分裂の等式から確認する。

<!-- proof-start -->
### 証明

$h=si$、$k=rj$ と置く。分裂条件から $ei=iri=i$、$ej=jsj=j$、さらに $se=sjs=s$、$re=rir=r$ が成り立つ。従って

$$
hr=sir=se=s,\qquad jh=jsi=ei=i.
$$

二合成は

$$
kh=rjsi=rei=ri=1_Y,
$$

$$
hk=sirj=sej=sj=1_Z.
$$

よって $h$ は同型射である。他の射 $h'$ が $h'r=s$ を満たせば $h'=h'ri=si=h$ であり一意である。
<!-- proof-end -->

部分を取り出す具体的な実装が違っても、その部分の圏論的な役割は同型まで決まる。

## 3. すべての部分を取り出せる圏

集合の圏では任意の冪等射について、$Y=e(X)$、$i$ を包含写像、$r(x)=e(x)$ とすると分裂を得る。$y=e(x)$ なら $r(i(y))=e(e(x))=e(x)=y$ だからである。こうした性質を圏全体に要求する。

<a id="def-catb2-10-cauchy-complete"></a>

<!-- formal-statement-start -->
> **定義（通常圏のCauchy完備性）**
>
> 圏 $\mathcal C$ がCauchy完備（冪等完備）であるとは、$\mathcal C$ のすべての冪等射が $\mathcal C$ 内で分裂することをいう。
<!-- formal-statement-end -->

<!-- definition-example-start: def-catb2-10-cauchy-complete -->
**定義の確認**。 半順序集合を圏とした場合、各対象の自己射は恒等射だけである。任意の冪等射は $e=1_X$ に限られるので、$Y=X,r=i=1_X$ が二条件を満たす。従ってすべての半順序圏がCauchy完備である。
<!-- definition-example-end -->

一方、[一対象圏の構成](../../CAT/CAT1-02/index.md#prop-cat1-02-one-object)で、唯一の対象を $*$、自己射を $1,e$ とし、$1$ を単位とする。積を $ee=e$ で定め、$e\ne1$ とする。合成は $e$ が含まれれば $e$、含まれなければ $1$ となるため結合的である。

分裂対象も $*$ でなければならない。単位を与える積は $1$ と $1$ の積だけなので、

$$
ri=1\quad\Longrightarrow\quad r=i=1.
$$

ところが、この選択では

$$
ir=1\ne e.
$$

従ってこの圏はCauchy完備でない。問題は冪等性の不足ではなく、分裂に必要な対象が不足していることにある。

## 4. Karoubi包絡：不足した対象を形式的に補う

元の圏に存在しない部分を、自己射 $e$ と対象 $X$ の組として記録しよう。その部分から別の部分へ行く射は、出発側で $e$ を適用しても変わらず、到着側で選択操作を適用しても変わらない射に限る。射の合成にこの条件を課せば、部分自身の恒等射を $e$ とすることができる。

<a id="def-catb2-10-karoubi"></a>

<!-- formal-statement-start -->
> **定義（Karoubi包絡）**
>
> 小圏 $\mathcal C$ のKaroubi包絡 $\operatorname{Kar}(\mathcal C)$ の対象は $(X,e)$（$X$ は対象、$e:X\to X$ は冪等射）である。$(X,e)$ から $(Y,d)$ への射は $\mathcal C$ の射 $f:X\to Y$ で

$$
f=dfe
$$

> を満たすものとする。合成は $\mathcal C$ の合成、$(X,e)$ の恒等射は $e$ とする。
<!-- formal-statement-end -->

<!-- definition-example-start: def-catb2-10-karoubi -->
**定義の確認**。 第3節の二元の一対象圏では、対象は $A=(*,1)$ と $B=(*,e)$ の二つである。$f=dfe$ の右辺を計算すると、$A\to A$ の場合だけ $1,e$ がともに条件を満たす。他の三通りの始域・終域では $dfe=e$ なので $e$ だけが条件を満たす。

| 始域・終域 | 射の集合 | 恒等射（自己射の場合） |
| --- | --- | --- |
| $A\to A$ | $\{1,e\}$ | $1$ |
| $A\to B$ | $\{e\}$ | |
| $B\to A$ | $\{e\}$ | |
| $B\to B$ | $\{e\}$ | $e$ |

例えば $A\to B\to A$ の合成は $e^2=e$ で $A\to A$ の射となる。一方 $B\to A\to B$ の合成も $e^2=e$ だが、こちらは $B$ の恒等射である。全合成は元の二元モノイドの合成であり、少なくとも一方が $e$ なら結果は $e$、両方が $1$ なら $1$ である。始域・終域の表から閉性と恒等律も確認できる。元の圏で分裂しなかった射が、追加した $B$ を使って分裂する。
<!-- definition-example-end -->

<a id="thm-catb2-10-completion"></a>

<!-- formal-statement-start -->
> **定理（Karoubi包絡による冪等完備化）**
>
> 小圏 $\mathcal C$ に対し、$\operatorname{Kar}(\mathcal C)$ は小さいCauchy完備圏となる。次で定める関手 $J$ は充満忠実である。

$$
J:\mathcal C\to\operatorname{Kar}(\mathcal C),
\qquad JX=(X,1_X),\quad Jf=f.
$$

> 各対象 $(X,e)$ は $JX$ の冪等射 $e$ の分裂対象となる。
<!-- formal-statement-end -->

### 証明の見取り図

条件 $f=dfe$ を二つの条件 $df=f$ と $fe=f$ に分ければ、合成と恒等射を確認しやすい。さらに包絡内の冪等射も元の圏の冪等射であるから、同じ対象追加の仕組みで分裂させられる。

<!-- proof-start -->
### 証明

$f=dfe$ なら $df=d^2fe=f$、$fe=dfe^2=f$。逆に両条件から $dfe=df=f$ である。次の射 $g:(Y,d)\to(Z,c)$ について $cg=g$、$gd=g$ なので

$$
c(gf)e=(cg)(fe)=gf.
$$

従って合成は条件を保つ。$e^3=e$ だから $e$ は $(X,e)$ の自己射であり、$fe=f$、$df=f$ が左右の恒等律を与える。結合律は $\mathcal C$ の合成の結合律である。対象は小さい対象・射の集合から選び、射も元の小さい射集合に始域・終域の組を付けたものの部分集合なので小さい。

$J$ は恒等射と合成を保つ。$(X,1_X)$ から $(Y,1_Y)$ への射の条件は $f=1_Y f1_X$ であり、元のすべての射が該当する。従って各Hom集合上の写像は全単射で、[充満忠実関手](../../CAT/CAT1-09/index.md#def-cat1-09-fully-faithful)の条件を満たす。

$(X,e)$ から $JX$ への射 $i$、$JX$ から $(X,e)$ への射 $r$ をともに元の射 $e$ とする。条件はそれぞれ $1_Xee=e$、$ee1_X=e$。二合成は

$$
ir=e^2=e,\qquad ri=e^2=e=1_{(X,e)}.
$$

よって $JX$ 上の $e$ が分裂する。

最後に包絡内の任意の冪等自己射 $p:(X,e)\to(X,e)$ を取る。その条件は

$$
p^2=p,\qquad ep=pe=p.
$$

従って元の圏でも $p$ は冪等である。対象 $(X,p)$ を選び、両方向の射を $p$ とする。射条件は

$$
ppe=p,\qquad epp=p
$$

で確かめられる。両方向の合成はいずれも $p^2=p$ となる。一方は元の冪等自己射 $p$ に、他方は $1_{(X,p)}=p$ に等しい。従って包絡内の全冪等射が分裂する。
<!-- proof-end -->

この構成では $X$ の元を使っていない。従って集合や線形空間だけでなく任意の小圏で不足する分裂対象を補える。

## 5. 普遍性：完備な圏への関手は延長できる

包絡を作る別の方法があったとしても、元の圏の関手をどのように延長できるかで構成の役割を判定できる。冪等射を分裂できる圏へ関手を送ると、分裂対象の選び方以外に自由はないはずである。ここでは関手だけでなく自然変換も含めて、[関手圏](../../CAT/CAT1-08/index.md#def-cat1-08-functor-category)の間の同値として示す。関手圏を $\operatorname{Fun}(\mathcal A,\mathcal D)$ と書く（既習の $[\mathcal A,\mathcal D]$ と同じ意味）。制限とは $J$ を前合成する操作で、関手 $H$ を $HJ$ に、自然変換をその $JX$ 成分に送る。これを $J^*$ と書く。[本質的全射](../../CAT/CAT1-09/index.md#def-cat1-09-essentially-surjective)とは、到着側の任意の対象が像の対象と同型になることである。

<a id="thm-catb2-10-universal"></a>

<!-- formal-statement-start -->
> **定理（Karoubi包絡の普遍性）**
>
> 小圏 $\mathcal C$ とCauchy完備な[局所小圏](../../CAT/CAT1-02/index.md#def-cat1-02-size) $\mathcal D$ を取る。$\mathcal D$ の各冪等射の分裂が一斉に選ばれているとする（例えば、より大きな宇宙で $\mathcal D$ が小さく選択公理を用いる場合）。このとき制限関手

$$
J^*:\operatorname{Fun}(\operatorname{Kar}(\mathcal C),\mathcal D)
\longrightarrow\operatorname{Fun}(\mathcal C,\mathcal D)
$$

> は充満忠実かつ対象について本質的全射、すなわち圏同値である。
<!-- formal-statement-end -->

### 証明の見取り図

$F(e)$ の分裂を選ぶ。新しい対象間の射は「部分から元の対象へ戻る、$F(f)$ を作用させる、到着側の部分を取り出す」という三段で延長する。自然変換にもこの三段を適用する。

<!-- proof-start -->
### 証明

任意の関手 $F:\mathcal C\to\mathcal D$ を固定する。各 $F(e)$ は $F(e)^2=F(e^2)=F(e)$ を満たす。分裂を $(D_e,r_e,i_e)$ とし、$i_e r_e=F(e)$、$r_e i_e=1_{D_e}$ とする。$e=1_X$ には $D_e=FX$、$r_e=i_e=1_{FX}$ を選ぶ。

延長関手を

$$
\overline F(X,e)=D_e,\qquad
\overline F(f)=r_dF(f)i_e
$$

と定める。ここで $f:(X,e)\to(Y,d)$ であり、右辺の $F(f)$ は元の圏の射 $f:X\to Y$ に $F$ を適用したものである。合成の型は

$$
D_e\xrightarrow{i_e}FX\xrightarrow{F(f)}FY\xrightarrow{r_d}D_d.
$$

恒等射の像は

$$
\overline F(e)=r_eF(e)i_e
=r_ei_er_ei_e=1_{D_e}.
$$

$g:(Y,d)\to(Z,c)$ との合成について

$$
\begin{aligned}
\overline F(g)\overline F(f)
&=r_cF(g)i_dr_dF(f)i_e\\
&=r_cF(g)F(d)F(f)i_e\\
&=r_cF(gdf)i_e\\
&=r_cF(gf)i_e=\overline F(gf).
\end{aligned}
$$

最後は $df=f$ を使った。恒等冪等射の分裂の選択から $\overline FJ=F$ が成り立つ。従って制限は対象について本質的全射である。

次に包絡上の任意の関手 $H,K$ と自然変換 $\alpha:HJ\Rightarrow KJ$ を取る。[Karoubi包絡による冪等完備化](#thm-catb2-10-completion)で構成した射を $i_e:(X,e)\to JX$、$r_e:JX\to(X,e)$ と記す。今度は包絡内の射である。拡張成分の候補は

$$
\beta_{(X,e)}=K(r_e)\alpha_X H(i_e).
$$

$f:(X,e)\to(Y,d)$ に対し $J(f)$ は元の射 $f:X\to Y$ を $JX\to JY$ の射と見たものである。$fr_e=r_dJ(f)$、$J(f)i_e=i_df$ が $fe=df=f$ から得られる。従って

$$
\begin{aligned}
K(f)\beta_{(X,e)}
&=K(fr_e)\alpha_XH(i_e)\\
&=K(r_d)K(J(f))\alpha_XH(i_e)\\
&=K(r_d)\alpha_YH(J(f))H(i_e)\\
&=K(r_d)\alpha_YH(i_d)H(f)\\
&=\beta_{(Y,d)}H(f).
\end{aligned}
$$

第三等号は $\alpha$ の[自然変換の条件](../../CAT/CAT1-07/index.md#def-cat1-07-natural-transformation)である。従って $\beta$ は自然変換であり、$e=1_X$ では $\beta_{JX}=\alpha_X$ となる。

他の拡張 $\gamma$ も $r_e$ に関する自然性から

$$
\gamma_{(X,e)}H(r_e)=K(r_e)\alpha_X
$$

を満たす。右から $H(i_e)$ を合成し、$r_ei_e=1_{(X,e)}$ を用いると、

$$
\gamma_{(X,e)}=K(r_e)\alpha_XH(i_e)=\beta_{(X,e)}.
$$

これで制限が各自然変換の集合上の全単射を与えること、従って充満忠実であることが示された。

対象 $F$ ごとに先の選択から延長 $\overline F$ が決まり、$J^*(\overline F)=F$ である。[圏の同値の判定](../../CAT/CAT1-09/index.md#thm-cat1-09-equivalence-criterion)の大きな局所小圏に対する選択条件も満たすので、この制限関手は圏の同値となる。
<!-- proof-end -->

例えば第3節の一対象圏から集合の圏への関手は、集合 $S$ と冪等写像 $E:S\to S$ を選ぶことに対応する。包絡への延長は $A$ を $S$ に、$B$ を $E(S)$ に送る。$A\to B$ は $s\mapsto E(s)$、$B\to A$ は包含写像となる。この二方向の合成が $E$ と $1_{E(S)}$ になるため、第4節の合成表を保つ。

## 6. 分配子を対象で表現するための条件

[反変表現可能関手](../../CAT/CAT1-10/index.md#def-cat1-10-contra-representable)は対象 $a$ を固定し、$x$ に $\operatorname{Hom}_{\mathcal C}(x,a)$ を割り当てる関手と自然同型な関手である。冪等射 $e:a\to a$ があれば、そのうち $e$ を後合成しても変わらない射だけを取り出せる。この部分は前合成で閉じているので、反変関手になる。[集合値前層](../../CAT/CAT1-12/index.md#def-cat1-12-presheaf)とは小圏から集合の圏への反変関手のことだった。この部分も前層の一例になる。

<a id="prop-catb2-10-presheaf"></a>

<!-- formal-statement-start -->
> **命題（冪等射から得られる前層の表現可能性）**
>
> 小圏 $\mathcal C$ の冪等射 $e:a\to a$ に対し反変関手 $P_e:\mathcal C^{\mathrm{op}}\to\mathbf{Set}$ を

$$
P_e(x)=\{f:x\to a\mid ef=f\}
$$

> とし、射への作用を前合成とする。$P_e$ が $\mathcal C$ で表現可能であることと、$e$ が $\mathcal C$ 内で分裂することは同値である。また $P_e(x)$ は $\operatorname{Kar}(\mathcal C)$ の $Jx$ から $(a,e)$ へのHom集合である。
<!-- formal-statement-end -->

### 証明の見取り図

分裂があれば $f$ を分裂対象へ送る射と一対一に対応させる。逆向きは表現同型の恒等射の像と、$e$ 自身の逆像を使って分裂を作る。

<!-- proof-start -->
### 証明

$v:x'\to x$ なら $e(fv)=(ef)v=fv$ なので前合成は $P_e$ の値の中に留まる。恒等射と合成の保存は $\mathcal C$ の恒等律・結合律である。包絡の射条件は $f=ef1_x=ef$ だから最後の主張も成立する。

$e=ir$、$ri=1_b$ と分裂するとき、写像

$$
\operatorname{Hom}_{\mathcal C}(x,b)\to P_e(x),
\qquad h\mapsto ih
$$

は $eih=irih=ih$ なので定義される。逆は $f\mapsto rf$ であり、$r(ih)=h$、$i(rf)=ef=f$ から互いに逆である。$v:x'\to x$ に対して $i(hv)=(ih)v$ なので自然である。

逆に自然同型 $\theta_x:\operatorname{Hom}_{\mathcal C}(x,b)\to P_e(x)$ があるとする。$i=\theta_b(1_b):b\to a$ と置けば $ei=i$ である。$e\in P_e(a)$ なので $r=\theta_a^{-1}(e):a\to b$ が存在する。自然性に射 $h:x\to b$ を代入すると

$$
\theta_x(h)=P_e(h)(\theta_b(1_b))=ih.
$$

従って $ir=\theta_a(r)=e$。さらに

$$
\theta_b(ri)=iri=ei=i=\theta_b(1_b).
$$

$\theta_b$ は単射だから $ri=1_b$。分裂が得られた。
<!-- proof-end -->

第3節の一対象圏では $P_e(*)=\{e\}$ だが、唯一の対象が表すHom集合は $\{1,e\}$ である。元数が異なり自然同型以前に全単射がない。包絡で追加した $(*,e)$ の表現関手を $J$ に沿って元の圏へ制限すると、この一元の前層になる。

## 7. Profの単位と余単位から冪等射を取り出す

一対象・恒等射のみの圏を $\mathbf 1$ とする。[分配子](../CATB2-07/index.md#def-catb2-07-distributor) $P:\mathbf 1\rightsquigarrow\mathcal C$ は反変集合値関手 $P$ に、$Q:\mathcal C\rightsquigarrow\mathbf 1$ は共変集合値関手 $Q$ に相当する。第6節の $P_e$ はこの $P$ の例である。

通常の随伴の[単位・余単位と三角恒等式](../../CAT/CAT2-09/index.md#def-cat2-09-triangle-data)に倣い、分配子の合成に対しても単位と余単位を要求できる。ここでは $\mathbf 1$ が出発側の場合に限り、[Profの単位子](../CATB2-09/index.md#thm-catb2-09-unitors)と[二重coendのFubini型交換](../CATB2-09/index.md#thm-catb2-09-fubini)で括弧と恒等分配子を取り除いた元ごとの形を用いる。

まず単位と余単位の始域・終域を確認する。$I_{\mathcal A}$ は圏 $\mathcal A$ のHom関手を用いた恒等分配子、$\odot$ は[分配子のcoend合成](../CATB2-07/index.md#thm-catb2-07-composition)を表す。単位と余単位はそれぞれ

$$
I_{\mathbf 1}\longrightarrow Q\odot P,\qquad
P\odot Q\longrightarrow I_{\mathcal C}
$$

という分配子の射である。単位の始域は一元集合なので、その射は $Q\odot P$ の元を一つ選ぶことに相当する。ここで $Q\odot P$ はタグ付き直積の余積を商にした集合

$$
\int^a Q(a)\times P(a)
=
\left(\coprod_{a\in\operatorname{Ob}(\mathcal C)}Q(a)\times P(a)\right)/{\sim}
$$

である。$[q,p]_a$ は対象 $a$ の成分の組 $(q,p)$ の同値類を表す。射 $t:a\to a'$ に対し、$q\in Q(a)$、$p'\in P(a')$ について

$$
[q,P(t)(p')]_a=[Q(t)(q),p']_{a'}
$$

という関係で同一視する。$P\odot Q$ の中間圏は $\mathbf 1$ なので、$x,y$ 成分は単に $P(x)\times Q(y)$ である。

余単位の自然性とは、$v:x'\to x$、$w:y\to y'$、$u\in P(x)$、$q\in Q(y)$ に対し次を満たすことである。

$$
\varepsilon_{x',y}(P(v)(u),q)
=\varepsilon_{x,y}(u,q)v,
$$

$$
\varepsilon_{x,y'}(u,Q(w)(q))
=w\varepsilon_{x,y}(u,q).
$$

左の変数では前合成、右の変数では後合成になる。以下、成分の添字が射と元の型から決まるときは $\varepsilon(u,q)$ と略し、関手の作用も $P(v)(u)=P(v)u$ のように括弧を省く。

<a id="def-catb2-10-prof-adjoint"></a>

<!-- formal-statement-start -->
> **定義（点からの分配子の右随伴データ）**
>
> 小圏 $\mathcal C$ に対する反変集合値関手 $P$、共変集合値関手 $Q$ について、$P:\mathbf 1\rightsquigarrow\mathcal C$ の右随伴データは次の組からなる。
>
> - 単位：coend $\int^a Q(a)\times P(a)$ の元 $\eta$。
> - 余単位：$x,y$ に自然な写像

$$
\varepsilon_{x,y}:P(x)\times Q(y)\to
\operatorname{Hom}_{\mathcal C}(x,y).
$$

> $\eta=[q,p]_a$（$p\in P(a),q\in Q(a)$）を代表元で書くとき、任意の $x$、$u\in P(x)$、$v\in Q(x)$ に対して次の三角恒等式を要求する。

$$
P(\varepsilon_{x,a}(u,q))(p)=u,
$$

$$
Q(\varepsilon_{a,x}(p,v))(q)=v.
$$
<!-- formal-statement-end -->

第一の三角恒等式は $u\in P(x)$ に単位の代表元を添え、余単位で射 $h=\varepsilon_{x,a}(u,q):x\to a$ を作り、反変関手の写像 $P(h):P(a)\to P(x)$ を $p$ に適用して $u$ に戻す経路である。

第二は $v\in Q(x)$ に単位を添え、射 $k=\varepsilon_{a,x}(p,v):a\to x$ を作り、共変関手の写像 $Q(k):Q(a)\to Q(x)$ を $q$ に適用して $v$ に戻す経路である。

代表元を $[q,P(t)p']_a=[Q(t)q,p']_{a'}$（$t:a\to a'$）で変更した場合、第一式の左辺は

$$
P(\varepsilon(u,q))P(t)p'
=P(t\varepsilon(u,q))p'
=P(\varepsilon(u,Q(t)q))p'
$$

となる。第二式も余単位の反変自然性から

$$
Q(\varepsilon(P(t)p',v))q
=Q(\varepsilon(p',v)t)q
=Q(\varepsilon(p',v))Q(t)q.
$$

よって生成関係で二式の値は変わらず、同値類の代表元によらない。

<!-- definition-example-start: def-catb2-10-prof-adjoint -->
**定義の確認**。 $\mathcal C=\mathbf 1$ で $P(*)=\{p\}$、$Q(*)=\{q\}$ とする。作用は恒等写像だけなので両者は関手である。coendは一元集合で単位を $[q,p]$ とする。余単位は $(p,q)\mapsto1_*$ で、恒等射について自然性が成立する。二三角式はそれぞれ $P(1_*)p=p$、$Q(1_*)q=q$ なので成立する。逆に $P(*)$ が二元なら、第一の三角式の左辺は単位から選んだ固定の $p$ に等しく、すべての $u$ を復元できない。
<!-- definition-example-end -->

<a id="thm-catb2-10-prof-cauchy"></a>

<!-- formal-statement-start -->
> **定理（右随伴を持つ点分配子と冪等射）**
>
> 小圏 $\mathcal C$ と反変集合値関手 $P$ を取る。$P:\mathbf 1\rightsquigarrow\mathcal C$ が[右随伴データ](#def-catb2-10-prof-adjoint)を持つことと、ある対象 $a$ と冪等射 $e:a\to a$ に対して $P$ が $P_e$ と自然同型になることは同値である。特に $\mathcal C$ がCauchy完備なら、このような $P$ は表現可能である。
<!-- formal-statement-end -->

### 証明の見取り図

単位の代表元から $p,q$ を一組選ぶ。余単位で $p,q$ を射に戻したものが $e$ になる。三角恒等式は、任意の $P$ の元から射を作り、再び $P$ の元に戻せることを保証する。

<!-- proof-start -->
### 証明

右随伴データがあるとし、$\eta=[q,p]_a$ を選ぶ。[coend合成の商表示](../CATB2-07/index.md#thm-catb2-07-composition)により代表元が存在する。$e=\varepsilon_{a,a}(p,q)$ と置く。第一の三角式に $u=p$ を代入して $P(e)p=p$ を得る。余単位の第一変数の自然性を $e:a\to a$ に適用すると

$$
\varepsilon_{a,a}(P(e)p,q)
=\varepsilon_{a,a}(p,q)e=e^2.
$$

左辺は $e$ だから $e^2=e$ である。各 $x$ について

$$
\phi_x(u)=\varepsilon_{x,a}(u,q),
\qquad
\psi_x(f)=P(f)p
$$

と置く。ここで $\phi_x:P(x)\to\operatorname{Hom}_{\mathcal C}(x,a)$、$\psi_x:P_e(x)\to P(x)$ である。後者は $f:x\to a$ に対して $P(f):P(a)\to P(x)$ となるため定義できる。第二の三角式に $v=q$ を代入すれば $Q(e)q=q$。余単位の第二変数の自然性より

$$
e\phi_x(u)=\varepsilon_{x,a}(u,Q(e)q)
=\varepsilon_{x,a}(u,q)=\phi_x(u).
$$

従って $\phi_x$ の像は $P_e(x)$ に入る。第一の三角式から $\psi_x\phi_x(u)=u$、第一変数の自然性から

$$
\phi_x\psi_x(f)=\varepsilon_{x,a}(P(f)p,q)
=\varepsilon_{a,a}(p,q)f=ef=f.
$$

$v:x'\to x$ に対し $\phi_{x'}(P(v)u)=\phi_x(u)v$ であり、逆も $P(fv)p=P(v)P(f)p$ から自然である。これで自然同型を得た。

逆に $P=P_e$ の場合を考える。共変関手を

$$
Q_e(y)=\{g:a\to y\mid ge=g\}
$$

と置く。$w:y\to y'$ による後合成は $(wg)e=w(ge)=wg$ なのでこの集合を保ち、恒等律・結合律から関手である。単位を $[e,e]_a$、余単位を $(f,g)\mapsto gf$ とする。両方の $e$ がそれぞれ $P_e(a),Q_e(a)$ に属するのは $e^2=e$ による。余単位の自然性は

$$
g(fv)=(gf)v,\qquad (wg)f=w(gf)
$$

である。第一の三角式では $\varepsilon(f,e)=ef=f$、その射を $P_e$ の元 $e$ に作用させると $ef=f$ になる。第二では $\varepsilon(e,g)=ge=g$、それを $Q_e$ の元 $e$ に作用させると $ge=g$ となる。従って右随伴データを得る。

$P$ が $P_e$ と自然同型 $\lambda:P\to P_e$ を持つ場合は、単位を $[e,\lambda_a^{-1}(e)]_a$、余単位を $(u,g)\mapsto g\lambda_x(u)$ に置き換える。自然性により $\lambda_x(P(f)\lambda_a^{-1}(e))=P_e(f)e=f$ なので第一の三角式は $u$ に戻る。第二では $\lambda_a(\lambda_a^{-1}(e))=e$ だから $ge=g$ に戻る。余単位の自然性も $\lambda$ の自然性と先の結合律から従う。

最後に $\mathcal C$ がCauchy完備なら得られた $e$ が分裂するので、[冪等射から得られる前層の表現可能性](#prop-catb2-10-presheaf)により $P_e$ は表現可能であり、従って $P$ も表現可能である。
<!-- proof-end -->

第3節の一対象圏の $P_e$ と $Q_e$ はともに一元で、上の構成で右随伴データを持つ。しかし $P_e$ は元の圏で表現できない。Cauchy完備化が必要な理由はここにある。一般の豊穣基底では単位が集合の商の元とは限らず、上の代表元の選択をそのまま使うことはできない。

## 8. 演習

### CATB2-10-A01 有限集合で分裂を作る

- Level: A

$X=\{1,2,3,4\}$ 上で $e(1)=e(2)=2$、$e(3)=e(4)=3$ とする。冪等性を確認し分裂を構成せよ。

<!-- solution-start -->
**詳細解答。** $e(2)=2$、$e(3)=3$ なので、

$$
e^2(1)=e^2(2)=2,\qquad e^2(3)=e^2(4)=3.
$$

従って $e^2=e$ である。[冪等射の分裂](#def-catb2-10-idempotent)に従い $Y=\{2,3\}$、$r(x)=e(x)$、$i(y)=y$ と取る。$ir$ は全四元で $e$ と一致する。さらに

$$
ri(2)=2,\qquad ri(3)=3
$$

なので $ri=1_Y$ も成立する。
<!-- solution-end -->

### CATB2-10-A02 冪等な同型射

- Level: A

圏 $\mathcal C$ の冪等射 $e:X\to X$ が同型射でもあるとする。$e=1_X$ を示せ。

<!-- solution-start -->
**詳細解答。** [同型射](../../CAT/CAT1-03/index.md#def-cat1-03-isomorphism)の逆射を $e^{-1}$ と置く。$ee=e$ の左から $e^{-1}$ を合成すると

$$
e^{-1}(ee)=(e^{-1}e)e=e,\qquad
e^{-1}e=1_X.
$$

従って $e=1_X$。恒等射は $X$ 自身を分裂対象として $r=i=1_X$ により分裂する。
<!-- solution-end -->

### CATB2-10-A03 小さい圏での不足

- Level: A

対象がただ一つ $*$、射が $1,e,z$ の三元の圏で、$1$ は単位、$e^2=e$、$z$ を含む合成はすべて $z$ とする。$e,z$ は $1$ と異なり互いにも異なる。どの冪等射が分裂するか。

<!-- solution-start -->
**詳細解答。** $1^2=1,e^2=e,z^2=z$ で全三元が冪等である。$ri=1$ には $r=i=1$ が必要である。片方が $z$ なら積は $z$、$z$ を含まず片方が $e$ なら積は $e$ だからである。従って $ir=1$ しか実現できず、$1$ だけが分裂する。$e,z$ は冪等だが分裂しない。
<!-- solution-end -->

### CATB2-10-A04 包絡で射を列挙する

- Level: A

A03と同じ一対象圏の包絡で、$E=(*,e)$、$Z=(*,z)$ の間の四つのHom集合を求めよ。

<!-- solution-start -->
**詳細解答。** [Karoubi包絡](#def-catb2-10-karoubi)の条件 $f=dfe$ を使う。$E\to E$ では $e1e=e$、$eee=e$、$eze=z$ なので許されるのは $e,z$。$E\to Z$ と $Z\to E$ では $z$ が片側にあり積は常に $z$。$Z\to Z$ も同じである。従って

$$
\begin{array}{c|cc}
& E&Z\\ \hline
E&\{e,z\}&\{z\}\\
Z&\{z\}&\{z\}
\end{array}
$$

となる。恒等射はそれぞれ $e,z$ である。
<!-- solution-end -->

### CATB2-10-B01 分裂対象間の同型

- Level: B

有限集合 $X=\{0,1,2\}$ で $e(0)=0,e(1)=e(2)=1$ とする。分裂対象として $Y=\{0,1\}$ と $Z=\{a,b\}$ を取り、$r(0)=0,r(1)=r(2)=1$、$i$ は包含、$s(0)=a,s(1)=s(2)=b$、$j(a)=0,j(b)=1$ とする。分裂の条件と同型 $h:Y\to Z$ を確認せよ。

<!-- solution-start -->
**詳細解答。** $ir$ と $js$ は全三元を $0,1,1$ に送るのでともに $e$。$ri(0)=0,ri(1)=1$、$sj(a)=a,sj(b)=b$ である。[分裂の一意性](#prop-catb2-10-splitting-unique)の式 $h=si$ に代入すると $h(0)=a,h(1)=b$。逆 $k=rj$ は $k(a)=0,k(b)=1$ で二合成は恒等写像となる。$hr$ は $a,b,b$、$jh$ は $0,1$ を返すので二つの可換条件も成立する。
<!-- solution-end -->

### CATB2-10-B02 包絡への延長

- Level: B

A03の圏から集合の圏への関手 $F$ を $F(*)=\{0,1,2\}$、$F(1)$ は恒等、$F(e)(0)=0,F(e)(1)=F(e)(2)=1$、$F(z)$ は定値 $0$ として与える。関手性を確認し、包絡上の $E=(*,e)$ と $Z=(*,z)$ の間の射の像を求めよ。

<!-- solution-start -->
**詳細解答。** $F(e)$ は値 $0,1$ を固定するため冪等。$F(z)$ は定値 $0$ なので冪等であり、$F(e)(0)=0$ から $F(e)F(z)=F(z)$、定値性から $F(z)F(e)=F(z)$。恒等射との合成も保存するので関手である。

[Karoubi包絡の普遍性](#thm-catb2-10-universal)の構成で $D_e=\{0,1\}$、$D_z=\{0\}$ とし、$i_e,i_z$ は包含、$r_e(x)=F(e)(x)$、$r_z(x)=0$ とする。分裂条件を直接確認する。$i_er_e=F(e)$、$i_zr_z=F(z)$ は包含の定義から成り立つ。また $r_ei_e$ は $0,1$ を固定し、$r_zi_z$ は $0$ を固定するので、それぞれ $1_{D_e}$、$1_{D_z}$ である。

A04で求めた四つのHom集合を順に調べる。$E\to E$ の $e$ は $r_eF(e)i_e$ となり、$0,1$ を固定する。$E\to E$ の $z$ は $r_eF(z)i_e$ となり、両元を $0$ に送る。$Z\to Z$ の $z$ は $r_zF(z)i_z$ となり、唯一の元 $0$ を固定する。

$E\to Z$ の唯一の射 $z$ は $r_zF(z)i_e$ へ送られる。$0,1$ はともに $0$ へ送られる。$Z\to E$ の $z$ は $r_eF(z)i_z$ へ送られ、$0\mapsto0$ である。$Z\to E\to Z$ は一元集合の恒等写像、$E\to Z\to E$ は二元集合の定値 $0$ となり、元の合成 $zz=z$ と一致する。
<!-- solution-end -->

### CATB2-10-B03 冪等射を表す前層

- Level: B

有限集合の圏の[充満部分圏](../../CAT/CAT1-05/index.md#def-cat1-05-subcategory) $\mathcal C$ の対象を $X=\{0,1,2\}$ と $B=\{0,1\}$ の二つとする。$e:X\to X$ は $e(0)=0,e(1)=e(2)=1$ とする。$P_e(X),P_e(B)$ の元数を計算し、$B$ による表現同型を具体的に示せ。

<!-- solution-start -->
**詳細解答。** [冪等射から得られる前層](#prop-catb2-10-presheaf)の条件 $ef=f$ は各 $x$ に対して $f(x)$ が $e$ の固定点であることを意味する。固定点は $0,1$ なので $P_e(X)$ は各三元の入力に二通り、計 $2^3=8$ 個、$P_e(B)$ は $2^2=4$ 個である。

包含 $i:B\to X$ と $r:X\to B$（$r(x)=e(x)$）は分裂を与える。任意の対象 $T$ に対して $h:T\to B$ を $ih$ に送ると値は $0,1$ に留まり、$f\in P_e(T)$ は $rf:T\to B$ に送れる。$rih=h$、$irf=ef=f$ だから全単射である。任意の射 $v:T'\to T$ に対して $i(hv)=(ih)v$ が成り立つため、この全単射は自然である。
<!-- solution-end -->

### CATB2-10-C01 非表現可能な点分配子を完備化する

- Level: C

A03の一対象圏 $\mathcal C$ で冪等射 $e$ を取る。

1. $P_e(*)$ と $Q_e(*)$（$Q_e(y)=\{g:*\to y\mid ge=g\}$）を列挙し、各射による作用を求めよ。
2. $[e,e]_*$ を単位、積を余単位として右随伴データの二三角恒等式を検証せよ。
3. $P_e$ が $\mathcal C$ では表現可能でないことを示せ。
4. 包絡でどの対象が $P_e$ を表すかを、$J*$ からの射とその作用で確認せよ。

<!-- solution-start -->
**詳細解答。** (1) $e1=e,ee=e,ez=z$ なので $ef=f$ を満たすのは $e,z$。積は可換なので $ge=g$ も同じ二元を与える。$P_e(*)=Q_e(*)=\{e,z\}$ である。$1$ と $e$ による前合成・後合成は二元とも固定し、$z$ による合成はどちらの元も $z$ に送る。作用の合成は元のモノイドの積に従う。

(2) [右随伴データ](#def-catb2-10-prof-adjoint)の余単位は $\varepsilon(f,g)=gf$。$e,e$ の組だけが $e$ を与え、他はすべて $z$ となる。自然性は任意の射 $m$ に対して $g(fm)=(gf)m$、$(mg)f=m(gf)$ である。

第一の三角式では、$u=e$ と $u=z$ の場合を順に計算すると、

$$
P_e(\varepsilon(e,e))e=P_e(e)e=e,
$$

$$
P_e(\varepsilon(z,e))e=P_e(z)e=z.
$$

第二では $v=e$ と $v=z$ を代入して、

$$
Q_e(\varepsilon(e,e))e=Q_e(e)e=e,
$$

$$
Q_e(\varepsilon(e,z))e=Q_e(z)e=z.
$$

従って両式は全元で成立する。単位の組はcoendの直積成分に属するのでその同値類も存在する。

(3) $\mathcal C$ に対象は $*$ しかない。$\operatorname{Hom}_{\mathcal C}(*,*)$ は三元、$P_e(*)$ は二元であり、全単射が存在しない。従って表現可能ではない。

(4) [Karoubi包絡](#def-catb2-10-karoubi)の $E=(*,e)$ に対し、$J* = (*,1)$ からの射は $f=ef1=ef$ を満たす $e,z$ である。元の圏の射 $m$ を $Jm$ で前合成すると $f\mapsto fm$。これは (1) の $P_e$ の作用と一致する。従って $J$ に沿って制限した表現関手 $\operatorname{Hom}_{\operatorname{Kar}(\mathcal C)}(J-,E)$ は $P_e$ に等しい。新しい対象 $E$ が不足していた表現を実現した。
<!-- solution-end -->

## 9. 次に向けて

冪等射を分裂させると、既存の対象から取り出せる部分を再び対象として利用できる。Karoubi包絡は、そのような対象を普遍的に補う。分配子の側からは、単位・余単位が与える情報を冪等射に戻すことでこの補い方の意味を理解できる。次は、有限な情報から大きな対象を組み立てるために、フィルター圏とフィルター余極限を学ぶ。
