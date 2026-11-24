# CATB2-07 分配子とcoendによる合成

## 1. 一つの行き先を選ばずに関係を運ぶ

関手 $F:\mathcal A\to\mathcal B$ は各 $a$ に一つの対象 $Fa$ を指定する。しかし、$a$ と複数の $b$ の間に異なる対応の仕方があり、それぞれを記録したい場合もある。

例えば二つの集合を離散圏（恒等射だけを持つ圏）とみなすと、各組 $(a,b)$ に対応の集合を割り当てることができる。さらに二つの対応を中間の対象 $b$ を通じてつなぎたい。

中間圏に恒等射以外があれば、単に対応の組をすべて数えるだけでは、同じ中間の射を左右どちらで処理するかによって重複する。既習の[coendの普遍性](../../CAT/CAT3-09/index.md#def-cat3-09-coend)がこの重複を整える。前講の豊穣Kan拡張でも二変数のHom対象が重みとして現れた。本講はそのような対応自体を合成する道具を作る。

## 2. 分配子：二方向の作用を持つ対応

以下では $P:\mathcal A\rightsquigarrow\mathcal B$ の値を $P(b,a)$ と書く。最初の引数が到着側で反変、第二の引数が出発側で共変である。この向きでは関手 $F$ は $\mathcal B(b,Fa)$ を与える。

基底 $\mathcal V$ は局所小な[対称モノイダル圏](../../CAT/CAT4-03/index.md#def-cat4-03-symmetric)で、[右閉](../../CAT/CAT4-05/index.md#def-cat4-05-right-closed)であるとする。単位対象を $I$ と書く。対称性と[Mac Laneの整合性定理](../../CAT/CAT4-02/index.md#thm-cat4-02-coherence)を使い、テンソル因子の明示した並べ替えと括弧・単位子の省略を許す。圏は[豊穣圏](../CATB2-01/index.md#def-catb2-01-enriched-category)とし、各対象集合は小さい。基底の[自己豊穣化](../CATB2-04/index.md#thm-catb2-04-self-enrichment)により、基底値の豊穣関手を考えられる。二つの豊穣圏のテンソル積は対象対を持ち、Homは各Hom対象のテンソル積、合成は対称性で因子を並べ替えてから各圏で合成する。反対圏 $\mathcal B^{\mathrm{op}}$ では Hom を $\mathcal B^{\mathrm{op}}(b,b')=\mathcal B(b',b)$ とし、合成順を対称性で反転する。従って積の $(b,a)$ から $(b',a')$ への Hom 対象は $\mathcal B(b',b)\otimes\mathcal A(a,a')$ である。

この積から基底の自己豊穣化への[豊穣関手](../CATB2-03/index.md#def-catb2-03-enriched-functor)として二方向の作用を持つ対応を定める。記号 $\rightsquigarrow$ はこの対応を表し、通常の関手の矢印と区別する。

<a id="def-catb2-07-distributor"></a>

<!-- formal-statement-start -->
> **定義（分配子）**
>
> 局所小な対称右閉モノイダル圏 $\mathcal V$ 上の小さい対象集合を持つ豊穣圏 $\mathcal A,\mathcal B$ に対して、分配子（プロ関手）とは豊穣関手

$$
P:\mathcal B^{\mathrm{op}}\otimes\mathcal A\longrightarrow\underline{\mathcal V}
$$

> のことである。転置して書けば、各組の値 $P(b,a)$ と作用射

$$
\begin{aligned}
P(b,a)\otimes\mathcal B(b',b)&\longrightarrow P(b',a),\\
\mathcal A(a,a')\otimes P(b,a)&\longrightarrow P(b,a')
\end{aligned}
$$

> を持ち、各作用が単位と合成を保ち、二作用が互いに可換である。
<!-- formal-statement-end -->

作用の式は、[豊穣関手の構造射](../CATB2-03/index.md#def-catb2-03-enriched-functor)

$$
\mathcal B(b',b)\otimes\mathcal A(a,a')
\longrightarrow [P(b,a),P(b',a')]
$$

を[評価射とカリー化](../../CAT/CAT4-05/index.md#thm-cat4-05-evaluation-curry)で逆転置して得る。角括弧は基底の内部Homである。右端に $P(b,a)$ をテンソルし、評価すれば $P(b',a')$ に至る。片方のHom因子に単位射 $I\to\mathcal A(a,a)$ または $I\to\mathcal B(b,b)$ を入れ、必要なら対称性で因子を交換すると、定義中の二作用が復元される。

以後、反変作用を $p\cdot v$（$v:b'\to b$）、共変作用を $u\cdot p$（$u:a\to a'$）と略記する。集合値では元への作用であり、一般の基底ではそれぞれの Hom 因子と $P(b,a)$ を入力とする作用射を表す。例えば可換性とは、同じ三因子を入力とする二経路が一致すること、すなわち

$$
u\cdot(p\cdot v)=(u\cdot p)\cdot v
$$

である。逆に二作用から逆転置した構造射をこの共通の経路で作り、転置して内部Homへの射を得る。単位律は二作用の単位律から従う。合成保存について、さらに $v':b''\to b'$、$u':a'\to a''$ を入力すると

$$
\begin{aligned}
u'\cdot((u\cdot(p\cdot v))\cdot v')
&=u'\cdot(u\cdot((p\cdot v)\cdot v'))\\
&=(u'u)\cdot(p\cdot(vv')).
\end{aligned}
$$

第一等号は二作用の可換性、第二等号は各作用の合成則である。一般の基底でもこれは同じ五つのテンソル因子を適切に並べ替えた射の等式であり、元で射が決まるとは仮定しない。自己豊穣化の合成は連続評価の転置なので、転置の一意性により豊穣関手の合成保存式を得る。

<!-- definition-example-start: def-catb2-07-distributor -->
**定義の確認**。 [集合値の豊穣圏と通常の圏の対応](../CATB2-01/index.md#prop-catb2-01-set-enrichment)により、集合を基底とし通常の関手で作用を確認する。$\mathcal A$ を一対象・恒等射のみの圏、$\mathcal B$ を $0\to1$ の矢印圏とし、$F$ が $1$ を選ぶとする。分配子の各値は

$$
P(b,*)=\operatorname{Hom}_{\mathcal B}(b,1),\qquad
P(0,*)=\{f\},\quad P(1,*)=\{1_1\}.
$$

射 $f:0\to1$ による反変作用は $1_1\mapsto1_1 f=f$。一般に $P(v)(h)=hv$ と置けば、恒等射と合成について

$$
h1=h,\qquad (hv)w=h(vw)
$$

となる。出発側の作用は恒等写像だけなので単位・合成を保ち、反変作用とも可換である。従って分配子である。
<!-- definition-example-end -->

一般の豊穣関手 $F:\mathcal A\to\mathcal B$ についても $\mathcal B(b,Fa)$ は分配子になる。作用は前合成と、$F$ のHom上の構造射で送った射による後合成である。これを $F(u)$ と略記する。各作用の単位・合成保存は $\mathcal B$ の単位律・結合律と豊穣関手 $F$ の単位・合成保存から従う。二作用の可換性は結合律

$$
(F(u)h)v=F(u)(hv)
$$

から従う。ここで文字による合成式は、豊穣の場合には対応するテンソル積上の射の等式を表す。

## 3. 中間の射をどちら側で処理しても同じにする

$P:\mathcal A\rightsquigarrow\mathcal B$ と $Q:\mathcal B\rightsquigarrow\mathcal C$ を取る。$P(b,a)$ と $Q(c,b)$ は同じ $b$ を介してつながる。中間の射 $v:b\to b'$ は $P$ の反変作用では $b'$ から $b$ へ、$Q$ の共変作用では $b$ から $b'$ へ情報を移す。

まず集合値の場合を考える。$p'\in P(b',a)$ と $q\in Q(c,b)$ があるとき、二つのつなぎ方

$$
(q,P(v)p'),\qquad (Q(v)q,p')
$$

を同一視したい。前者の中間対象は $b$、後者は $b'$ である。この関係は中間対象の選択を忘れるだけでなく、射による情報の移動を商に組み込む。

一般の基底では元の同値関係を直接使う代わりに、二射を等しくする普遍射を作る。存在の構成に備え、基底に[小余積](../../CAT/CAT2-05/index.md#def-cat2-05-coproduct)と[余等化子](../../CAT/CAT2-05/index.md#def-cat2-05-coequalizer)が存在すると仮定する。釣り合いcoend自体は、以下の普遍性を満たす対象と射の族として定義する。以下の式では $P$ の中間反変作用と $Q$ の中間共変作用をそれぞれ $r_P,l_Q$ と書く。例えば反変作用は

$$
r_P:P(b',a)\otimes\mathcal B(b,b')\to P(b,a)
$$

である。

<a id="def-catb2-07-balanced-coend"></a>

<!-- formal-statement-start -->
> **定義（豊穣分配子の釣り合いcoend）**
>
> 局所小な対称右閉モノイダル圏 $\mathcal V$ と、その上の小さい対象集合を持つ豊穣圏 $\mathcal A,\mathcal B,\mathcal C$ を取る。分配子 $P:\mathcal A\rightsquigarrow\mathcal B$ と $Q:\mathcal B\rightsquigarrow\mathcal C$ に対し、対象 $a\in\mathcal A,c\in\mathcal C$ を固定する。釣り合いcoendとは、基底の対象 $D$ と、各 $b\in\mathcal B$ に対する射の族

$$
i_b:Q(c,b)\otimes P(b,a)\to D
$$

> の組であって、射の族が次の条件を満たし、基底の任意の対象 $T$ への同条件を満たす任意の族 $j_b:Q(c,b)\otimes P(b,a)\to T$ が唯一の射 $h:D\to T$ によって $j_b=hi_b$ と因子分解されるものである。条件は定義域

$$
Q(c,b)\otimes\mathcal B(b,b')\otimes P(b',a)
$$

> 上の等式

$$
i_b(1\otimes r_P)\sigma
=i_{b'}(l_Q\otimes1)\tau
$$

> である。ここで $r_P:P(b',a)\otimes\mathcal B(b,b')\to P(b,a)$ は反変作用、$l_Q:\mathcal B(b,b')\otimes Q(c,b)\to Q(c,b')$ は共変作用である。$\sigma$ は第二・第三因子の交換、$\tau$ は第一・第二因子の交換であり、$1$ は残りの因子の恒等射を表す。この $D$ を

$$
\int^{b\in\mathcal B}Q(c,b)\otimes P(b,a)
$$

> と書く。
<!-- formal-statement-end -->

<!-- definition-example-start: def-catb2-07-balanced-coend -->
**定義の確認**。 集合値で $\mathcal A,\mathcal C$ は一対象・恒等射のみの圏、$\mathcal B$ は $0\xrightarrow{v}1$ とする。$P(0,*)=\{x,y\}$、$P(1,*)=\{z\}$、$P(v)(z)=x$。$Q(*,0)=\{s\}$、$Q(*,1)=\{t,u\}$、$Q(v)(s)=t$ とする。恒等射は恒等写像として作用する。非恒等射どうしの合成は存在せず、恒等射との合成は各写像を変えない。外側は恒等作用のみなので中間の作用とも可換であり、両者は[分配子](#def-catb2-07-distributor)になる。対角の組は

$$
(s,x),\ (s,y),\ (t,z),\ (u,z).
$$

$v$ に対する条件は $i_0(s,x)=i_1(t,z)$ であり、恒等射から新しい条件は生じない。三元集合 $D$ を作り、第一と第三の組を同じ元へ、残り二組をそれぞれ別の元へ送る。

任意の釣り合う族 $j_0,j_1$ は第一と第三に同じ値を与えるため、三元それぞれの像をその値で定めれば唯一の $h$ が得られる。普遍性まで確認できた。
<!-- definition-example-end -->

## 4. 合成が存在する条件と構成

小ささは中間の対象対を集合として列挙するために必要である。通常圏の場合の[coendの余等化子表示](../../CAT/CAT3-09/index.md#prop-cat3-09-coend-coequalizer)では射ごとに余積を取った。豊穣の場合は射の集まり自体が基底の対象なので、中間のHom対象をテンソル因子として入れる。

<a id="thm-catb2-07-composition"></a>

<!-- formal-statement-start -->
> **定理（分配子のcoend合成）**
>
> $\mathcal V$ を局所小な対称右閉モノイダル圏とし、小余積と余等化子が存在するとする。$\mathcal A,\mathcal B,\mathcal C$ を小さい対象集合を持つ豊穣圏とする。任意の分配子 $P:\mathcal A\rightsquigarrow\mathcal B$ と $Q:\mathcal B\rightsquigarrow\mathcal C$ に対して

$$
(Q\odot P)(c,a)=\int^{b\in\mathcal B}Q(c,b)\otimes P(b,a)
$$

> が存在する。これは外側の変数に関して分配子 $\mathcal A\rightsquigarrow\mathcal C$ をなす。
<!-- formal-statement-end -->

### 証明の見取り図

すべての対角の組を余積に入れ、Hom対象から生じる二経路を余等化する。外側の作用は各余積成分に先に作用させることで定める。閉性がテンソル積による余等化子・余積の保存を保証するので、作用を商に降ろせる。

<!-- proof-start -->
### 証明

$a,c$ を固定し、次の二対象を作る。

$$
\begin{aligned}
S&=\coprod_{b,b'}Q(c,b)\otimes\mathcal B(b,b')\otimes P(b',a),\\
T&=\coprod_b Q(c,b)\otimes P(b,a).
\end{aligned}
$$

小さい対象集合と小余積の仮定によって存在する。$S\rightrightarrows T$ の二射 $s,t$ を、$(b,b')$ 成分で次のように定める。$\operatorname{in}_b$ は $T$ の第 $b$ 成分からの余積への挿入射、$s|_{b,b'}$ は $S$ の当該成分の挿入射との合成を表す。

$$
\begin{aligned}
s|_{b,b'}&=\operatorname{in}_b(1\otimes r_P)\sigma,\\
t|_{b,b'}&=\operatorname{in}_{b'}(l_Q\otimes1)\tau
\end{aligned}
$$

$e:T\to D$ を[余等化子](../../CAT/CAT2-05/index.md#def-cat2-05-coequalizer)とし、$i_b=e\operatorname{in}_b$ とする。$es=et$ を各成分に制限すると釣り合い条件となる。

逆に釣り合う族 $j_b$ は[余積の普遍性](../../CAT/CAT2-05/index.md#def-cat2-05-coproduct)から一意な $k:T\to U$ を与え、$ks=kt$ が各成分で成立する。余等化子の普遍性から唯一の $h:D\to U$ が存在し、

$$
hi_b=he\operatorname{in}_b=k\operatorname{in}_b=j_b
$$

となる。任意の候補は余積と余等化子の一意性で $h$ に一致する。

次に外側の反変作用を構成する。$X=\mathcal C(c',c)$ と置く。[右閉性](../../CAT/CAT4-05/index.md#def-cat4-05-right-closed)と対称性から $-\otimes X$ は左随伴である。

[左随伴の余極限保存](../../CAT/CAT2-11/index.md#thm-cat2-11-left-preserves)により、$e\otimes1_X$ は $s\otimes1_X,t\otimes1_X$ の余等化子であり、$T\otimes X$ と $S\otimes X$ も対応する成分の余積になる。特に $D\otimes X$ からの射は、全ての $i_b\otimes1_X$ との合成で一意に決まる。実際、余積の挿入射上で一致すれば $e\otimes1_X$ との合成が一致し、余等化子の一意性から元の射も一致する。

以降、$q,p,v,w,u$ を用いる式はテンソル因子の入力位置を示す記号であり、一般の基底で単位からの元が射を識別すると仮定しない。各成分の射を合成した等式をこの記法で表す。

外側の $Q$ の反変作用を $q\cdot w$ と書く。$D'=(Q\odot P)(c',a)$ の脚を $i'_b$ とすれば、$T\otimes X$ からの射を成分で $i'_b(q\cdot w,p)$ と定められる。$v$ を中間のHom因子とすると、二経路は

$$
\begin{aligned}
i'_b(q\cdot w,p'\cdot v)
&=i'_{b'}(v\cdot(q\cdot w),p')\\
&=i'_{b'}((v\cdot q)\cdot w,p').
\end{aligned}
$$

ここで $q,p',v,w$ の入力位置はそれぞれ $Q(c,b),P(b',a),\mathcal B(b,b'),X$ である。第一等号は $D'$ の[釣り合い条件](#def-catb2-07-balanced-coend)、第二等号は $Q$ の[二作用の可換性](#def-catb2-07-distributor)である。よって余等化子から唯一の射 $D\otimes X\to D'$ が得られる。

外側の共変作用について $Y=\mathcal A(a,a')$ を取る。$Y\otimes-$ も左随伴なので同じ余積・余等化子を保存する。$D''=(Q\odot P)(c,a')$ の脚を $i''_b$ とすると、候補の成分は $i''_b(q,u\cdot p)$ である。中間のHom因子 $v$ に関する二経路は

$$
\begin{aligned}
i''_b(q,u\cdot(p'\cdot v))
&=i''_b(q,(u\cdot p')\cdot v)\\
&=i''_{b'}(v\cdot q,u\cdot p').
\end{aligned}
$$

ここでは $u$ の入力位置が $Y$ であり、$q,p',v$ は先ほどと同じ位置の因子である。第一等号は $P$ の[二作用の可換性](#def-catb2-07-distributor)、第二等号は $D''$ の[釣り合い条件](#def-catb2-07-balanced-coend)である。従って $Y\otimes D\to D''$ が得られる。

単位・合成と二作用の可換性を確認する。テンソル積でパラメータを加えても余等化子表示が保たれるので、二つの射がすべての脚上で一致することを示せばよい。例えば反変作用の二段の合成では $w:c'\to c$、$w':c''\to c'$ のHom因子を入力とし、比較する始域は $D\otimes\mathcal C(c',c)\otimes\mathcal C(c'',c')$ である。各脚で

$$
i_b((q\cdot w)\cdot w',p)=i_b(q\cdot(ww'),p)
$$

となる（左辺と右辺の脚は同じ最終対象における脚）。共変作用では

$$
i_b(q,u'\cdot(u\cdot p))=i_b(q,(u'u)\cdot p)
$$

である。単位を入れると $q\cdot1=q$、$1\cdot p=p$ により元の脚に戻る。両外側作用の二順序はともに $i_b(q\cdot w,u\cdot p)$ となる。以上は [分配子の作用条件](#def-catb2-07-distributor) を満たすので、外側の二変数について豊穣関手をなす。
<!-- proof-end -->

集合値ではテンソル積が直積であり、上の余等化子は[coendの商表示](../../CAT/CAT3-09/index.md#prop-cat3-09-coend-coequalizer)そのものになる。

$$
(Q\odot P)(c,a)=
\left(\coprod_b Q(c,b)\times P(b,a)\right)/{\sim}.
$$

同値関係 $\sim$ は $(q,p'\cdot v)\sim(v\cdot q,p')$ を含む最小の同値関係である。以下、$[q,p]$ は中間対象 $b$ のタグ付きの組 $(q,p)\in Q(c,b)\times P(b,a)$ の同値類を表す。中間が離散圏なら恒等射しかなく、同一視は増えない。例えば中間二対象で組の数がそれぞれ $2\cdot3$ と $4\cdot1$ なら合成には10元が残る。第3節の矢印圏では4組が3元に減った。

## 5. 通常の射の合成との接続

集合値で関手 $F:\mathcal A\to\mathcal B$ と $G:\mathcal B\to\mathcal C$ から $P(b,a)=\operatorname{Hom}_{\mathcal B}(b,Fa)$、$Q(c,b)=\operatorname{Hom}_{\mathcal C}(c,Gb)$ を作る。すると $q:c\to Gb$ と $p:b\to Fa$ を $G(p)q$ に送れる。

<a id="prop-catb2-07-representable-composition"></a>

<!-- formal-statement-start -->
> **命題（関手から生じる分配子の合成）**
>
> 小圏 $\mathcal A,\mathcal B,\mathcal C$ と関手 $F:\mathcal A\to\mathcal B$、$G:\mathcal B\to\mathcal C$ を取る。$P(b,a)=\operatorname{Hom}_{\mathcal B}(b,Fa)$、$Q(c,b)=\operatorname{Hom}_{\mathcal C}(c,Gb)$ を、前合成および $F,G$ で送った射による後合成を作用とする集合値分配子とする。任意の $a\in\mathcal A,c\in\mathcal C$ に対して、その合成には二変数で自然な全単射

$$
\int^b\operatorname{Hom}_{\mathcal C}(c,Gb)
\times\operatorname{Hom}_{\mathcal B}(b,Fa)
\cong\operatorname{Hom}_{\mathcal C}(c,GFa)
$$

> があり、$[q,p]\mapsto G(p)q$ で与えられる。
<!-- formal-statement-end -->

### 証明の見取り図

中間の射の移動は関手 $G$ の合成律に吸収される。既に到着点 $Fa$ へ達した表示を選べば、逆写像も作れる。

<!-- proof-start -->
### 証明

[共変co-Yoneda公式](../../CAT/CAT3-09/index.md#thm-cat3-09-coyoneda)において添字圏を $\mathcal B$、共変関手を $b\mapsto\operatorname{Hom}_{\mathcal C}(c,Gb)$、固定対象を $Fa$ とし、直積因子を交換する。

公式は $[q,p]\mapsto G(p)q$ を与える。直接に計算すると $v:b\to b'$、$p':b'\to Fa$ について

$$
G(p'v)q=G(p')G(v)q.
$$

これは商関係の二側の像が一致する式である。逆は $h\mapsto[h,1_{Fa}]$。評価すると $G(1_{Fa})h=h$ であり、逆の合成は商関係で $v=p$、$p'=1_{Fa}$ として

$$
[G(p)q,1_{Fa}]=[q,p].
$$

外側の射 $w:c'\to c$、$u:a\to a'$ に対して、商側では $[q,p]\mapsto[qw,F(u)p]$。その像は

$$
G(F(u)p)qw=GF(u)G(p)qw
$$

となり、右辺のHomの二作用と一致する。従って自然である。
<!-- proof-end -->

この命題は関手の合成が分配子の合成の特殊例であることを示す。分配子全体の結合律は、次に学ぶ双圏の構造として扱う。

## 6. 仮定を外すと何が起こるか

小さい対象集合の条件がなければ、集合値で中間を真のクラスの対象を持つ離散圏、両側の値を一元集合とすると、対角の組の集まりは真のクラスになる。仮に集合 $D$ が普遍対象なら、任意の異なる二対象を区別する二元集合値の族から因子分解を得られるため、両者の脚の像は異なる。したがって真のクラスから $D$ への単射が必要となり矛盾する（同一の集合論的宇宙内で考える）。

また、小余積・余等化子の存在は対象 $D$ を作る条件である。有限集合の圏では、無限個の対象を持つ離散中間圏に一元集合の値を置けば、任意個の脚を区別する必要があり有限集合の中に収まらない。閉性は外側の作用を構成する際の保存性に用いた。基底の全余完備性は十分条件であり、個別の合成が存在するための必要条件と主張しているわけではない。

## 7. 演習

### CATB2-07-A01 向きの確認

- Level: A

分配子 $P:\mathcal A\rightsquigarrow\mathcal B$ で $v:b'\to b$、$u:a\to a'$ とする。集合値の場合、$p\in P(b,a)$ に二つの作用を施した値はどの集合に入るか。

<!-- solution-start -->
**詳細解答。** [分配子の定義](#def-catb2-07-distributor)から、各作用の値は

$$
p\cdot v\in P(b',a),\qquad u\cdot p\in P(b,a')
$$

である。続けて作用させると

$$
u\cdot(p\cdot v),\quad (u\cdot p)\cdot v\in P(b',a')
$$

となる。積圏で $(v^{\mathrm{op}},1)$ と $(1,u)$ はどちらの順序でも同じ射 $(v^{\mathrm{op}},u)$ を与え、関手は合成を保つので二つの値は等しい。
<!-- solution-end -->

### CATB2-07-A02 離散中間圏

- Level: A

集合値で中間圏が三対象 $0,1,2$ の離散圏とする。固定 $a,c$ において $P(b,a)$ の元数が順に $2,0,3$、$Q(c,b)$ の元数が $3,5,2$ である。合成の元数を求めよ。

<!-- solution-start -->
**詳細解答。** [coend合成](#thm-catb2-07-composition)の商関係は恒等射からしか生じず、$P(1_b)$ と $Q(1_b)$ は恒等写像なので異なる元を同一視しない。

対角成分の直積の元数は順に

$$
3\cdot2=6,\quad 5\cdot0=0,\quad 2\cdot3=6.
$$

余積はタグ付きの和集合であり成分が交わらないから $6+0+6=12$ 元である。
<!-- solution-end -->

### CATB2-07-A03 空の中間圏

- Level: A

中間圏が空圏であるとき、集合値分配子の合成の値と外側の作用を求めよ。

<!-- solution-start -->
**詳細解答。** [余等化子による合成](#thm-catb2-07-composition)では $S,T$ はどちらも空余積であるため空集合。二射は唯一の空写像であり、その余等化子は空集合への恒等写像である。従って各値は空集合である。外側の各射に対する作用は唯一の空写像であり、どの恒等射・合成・二作用に対しても結果は唯一の写像なので分配子の条件を満たす。
<!-- solution-end -->

### CATB2-07-A04 関手に由来する対応

- Level: A

集合値で $F:\mathcal A\to\mathcal B$ とし、$P(b,a)=\operatorname{Hom}_{\mathcal B}(b,Fa)$ と置く。$h:b\to Fa$、$v:b'\to b$、$u:a\to a'$ への二作用と、その可換性を示せ。

<!-- solution-start -->
**詳細解答。** 二つの作用は

$$
h\cdot v=hv:b'\to Fa,\qquad
u\cdot h=F(u)h:b\to Fa'
$$

である。両方を施すと結合律から

$$
F(u)(hv)=(F(u)h)v
$$

となる。反変作用と共変作用の合成則は、それぞれ

$$
(hv)w=h(vw),\qquad
F(u')F(u)h=F(u'u)h
$$

である。恒等射の作用は $h1=h$ と $F(1)h=h$ である。従って [分配子](#def-catb2-07-distributor) の全作用条件が成立する。
<!-- solution-end -->

### CATB2-07-B01 矢印圏で商を作る

- Level: B

中間圏は $0\xrightarrow{v}1$、外側は一対象・恒等射のみの圏とする。$P(0)=\{x,y\}$、$P(1)=\{z,w\}$ で $P(v)$ は両元を $x$ に送る。$Q(0)=\{s\}$、$Q(1)=\{t\}$、$Q(v)(s)=t$ とする。全同値類を求め、任意の釣り合う族からの因子分解を確認せよ。

<!-- solution-start -->
**詳細解答。** [釣り合いcoend](#def-catb2-07-balanced-coend)の対角成分を列挙すると

$$
(s,x),\quad (s,y),\quad (t,z),\quad (t,w)
$$

となる。非恒等射の入力は $(s,v,z)$ と $(s,v,w)$ の二つである。釣り合い関係は

$$
(s,x)\sim(t,z),\qquad (s,x)\sim(t,w)
$$

なので、推移性で $(t,z)\sim(t,w)$。他の生成関係は恒等射に由来し、$(s,y)$ にはつながらない。全同値類は

$$
\{(s,x),(t,z),(t,w)\},\qquad \{(s,y)\}
$$

である。釣り合う族 $j_0,j_1$ は

$$
j_0(s,x)=j_1(t,z)=j_1(t,w)
$$

を満たす。第一類の像を $j_0(s,x)$、第二類の像を $j_0(s,y)$ とすれば写像が得られる。各類に代表元があり、その像は指定済みなので一意である。
<!-- solution-end -->

### CATB2-07-B02 線形な釣り合い

- Level: B

基底を全ての実ベクトル空間と線形写像の圏とし、テンソル積を用いる。[一対象の豊穣圏とモノイド対象の対応](../CATB2-01/index.md#prop-catb2-01-one-object)により、中間圏は一対象でHom対象が $\mathbb R[t]/(t^2)$ とする。これは基底 $1,t$ を持つ二次元実ベクトル空間に、積

$$
1t=t1=t,\qquad t^2=0
$$

を双線形に延長した代数である（単位は $1$）。

外側は各一対象でHom対象 $\mathbb R$ とする。$P,Q$ はともに $\mathbb R^2$ で、それぞれの標準基底を $e_1,e_2$ と書く。$P$ の反変作用と $Q$ の共変作用で $t$ はともに

$$
N(e_1)=0,\qquad N(e_2)=e_1
$$

と作用する。合成の次元と基底を求めよ。

<!-- solution-start -->
**詳細解答。** [ベクトル空間の閉構造](../../CAT/CAT4-05/index.md#thm-cat4-05-vector-spaces)を用いる。$N$ は指定された基底上の値を線形に延長した写像であり、$I$ はここでは $\mathbb R^2$ の恒等写像を表す。$N^2(e_1)=0,N^2(e_2)=N(e_1)=0$ だから $N^2=0$。Hom代数の元 $\alpha+\beta t$ の作用を $\alpha I+\beta N$ とすれば

$$
\begin{aligned}
(\alpha I+\beta N)(\gamma I+\delta N)
&=\alpha\gamma I+(\alpha\delta+\beta\gamma)N\\
(\alpha+\beta t)(\gamma+\delta t)
&=\alpha\gamma+(\alpha\delta+\beta\gamma)t.
\end{aligned}
$$

よって積を保ち、$1$ の作用は $I$ である。代数は可換なので反変側の積の順序反転にも適合する。外側の作用はスカラー倍であり、線形性から $N(\lambda p)=\lambda N(p)$ となるので中間作用と可換である。

[分配子のcoend合成](#thm-catb2-07-composition)の余等化子は $Q\otimes P$ を、次の差の張る部分空間で割る。

$$
q\otimes Np-Nq\otimes p
$$

実際、二つの線形射を等しくする写像はそれらの差の像を零に送る必要がある。逆にその像を零に送る写像は商空間から一意に因子分解される。

単位 $1$ による差は零、任意の $\alpha+\beta t$ の差は $t$ による差の $\beta$ 倍である。また $q=\sum_i q_i e_i$、$p=\sum_j p_j e_j$ とすれば双線形性によって

$$
q\otimes Np-Nq\otimes p
=\sum_{i,j=1}^2 q_i p_j
(e_i\otimes Ne_j-Ne_i\otimes e_j).
$$

従って基底の四組だけを確認すればよい。[有限次元テンソル積の存在と基底](../../../基礎科目/LA/LA3E/index.md#thm-la3e-tensor-product-existence-basis)から $E_{ij}=e_i\otimes e_j$（第一因子は $Q$、第二因子は $P$）は $Q\otimes P$ の四元の基底である。各入力に対する差は

$$
\begin{array}{c|c}
(i,j)&e_i\otimes Ne_j-Ne_i\otimes e_j\\
\hline
(1,1)&0\\
(1,2)&E_{11}\\
(2,1)&-E_{11}\\
(2,2)&E_{21}-E_{12}
\end{array}
$$

差の張る空間は $E_{11}$ と $E_{21}-E_{12}$ の張る空間である。$E_{11}$ と $E_{21}$ の係数を比較すればこの二元は線形独立なので、その次元は $2$ である。従って商の次元は $4-2=2$。$[E_{12}],[E_{22}]$ は張る（$[E_{11}]=0,[E_{21}]=[E_{12}]$）。両者の線形結合が差の空間に入るなら、$E_{22}$ と $E_{21}$ の係数比較から両係数が零になるため、商の基底である。
<!-- solution-end -->

### CATB2-07-B03 外側の作用が商に降りる理由

- Level: B

集合値で $u:a\to a'$ と $v:b\to b'$ に対し、$[q,p]\mapsto[q,u\cdot p]$ が合成の同値類上の写像となることを示せ。$P$ の二作用の可換性を使う箇所も示せ。

<!-- solution-start -->
**詳細解答。** [coend合成の商表示](#thm-catb2-07-composition)による生成関係は $[q,p'\cdot v]=[v\cdot q,p']$ である。左側の像は

$$
[q,u\cdot(p'\cdot v)]
=[q,(u\cdot p')\cdot v]
=[v\cdot q,u\cdot p'].
$$

第一等号は $P$ の二作用の可換性、第二等号は新しい出発対象 $a'$ における生成関係である。右側の像と一致するので生成関係を保つ。逆向きの関係も保ち、生成関係を有限回つないだ列の各隣接対の像が同値になるため、その両端の像も同値になる。よって商上の写像が定まる。

恒等射では $1\cdot p=p$ なので恒等写像、二射 $u,u'$ の連続作用は $[q,u'\cdot(u\cdot p)]=[q,(u'u)\cdot p]$ となるため合成も保つ。
<!-- solution-end -->

### CATB2-07-C01 二つの表現可能な対応の合成

- Level: C

$\mathcal A$ は一対象・恒等射のみの圏、$\mathcal B$ は $0\xrightarrow{v}1$、$\mathcal C$ は二対象 $c,d$ と平行二射 $f,g:c\to d$ および恒等射のみを持つ圏とする。$F(*)=1$、$G(0)=c,G(1)=d,G(v)=f$ とする。$P(b,*)=\operatorname{Hom}_{\mathcal B}(b,F*)$ と $Q(z,b)=\operatorname{Hom}_{\mathcal C}(z,Gb)$ の合成を $z=c,d$ で計算し、外側の $f,g$ による反変作用を求め、$\operatorname{Hom}_{\mathcal C}(z,d)$ との対応を確認せよ。

<!-- solution-start -->
**詳細解答。** $P(0,*)=\{v\}$、$P(1,*)=\{1_1\}$ で $P(v)(1_1)=v$。$z=c$ では $Q(c,0)=\{1_c\}$、$Q(c,1)=\{f,g\}$。$Q(c,v)$ は $1_c\mapsto f$ なので、[釣り合いcoend](#def-catb2-07-balanced-coend)の対角の三組

$$
(1_c,v),\ (f,1_1),\ (g,1_1)
$$

のうち第一と第二が同一視される。第三は別の類である。$z=d$ では $Q(d,0)=\varnothing$、$Q(d,1)=\{1_d\}$ だから唯一の類 $[1_d,1_1]$ が残る。$f:c\to d$ による外側の反変作用は [coend合成の外側作用](#thm-catb2-07-composition) により $Q$ の前合成なので

$$
[1_d,1_1]\longmapsto[f,1_1].
$$

$g$ による作用は $[1_d,1_1]\mapsto[g,1_1]$ である。[関手から生じる分配子の合成](#prop-catb2-07-representable-composition)の全単射を具体的に計算すると

$$
[1_c,v]\mapsto f1_c=f,\qquad
[f,1_1]\mapsto f,\qquad [g,1_1]\mapsto g,
$$

および $[1_d,1_1]\mapsto1_d$ となる。二対象とも全単射であり、$f,g$ による外側作用は $1_d$ の前合成と一致する。恒等射の作用も恒等写像であるから、二つの関手は自然に同型である。

特に $f,g$ は同じ対象対をつなぐが、商では二つの別の対応として残る。
<!-- solution-end -->

## 8. 次に向けて

本講で対応の合成を一つずつ作れるようになった。三つ以上の分配子を合成するときには括弧の違いを比較する同型が必要になる。次講はこの種の合成を扱える双圏を導入する。
