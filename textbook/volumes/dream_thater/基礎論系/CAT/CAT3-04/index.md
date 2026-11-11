# CAT3-04 モナド性を判定するための条件

## 1. モナドが同じでも、もとの圏は同じとは限らない

[比較関手](../CAT3-03/index.md#def-cat3-03-comparison)は、随伴 $L:\mathcal C\rightleftarrows\mathcal D:R$ から得たモナド $T=RL$ の代数圏 $\mathcal C^T$ へ、$\mathcal D$ の対象を送る。しかし比較関手が圏の同値になるとは限らない。代数として見た射が、もとの $\mathcal D$ の射からすべて得られるかどうかすら、まだ分からない。

例えば集合と集合の組の圏 $\mathbf{Set}\times\mathbf{Set}$ から第二成分だけを忘れる関手は、第一成分の射の違いを見分けられない。このような忘却と、モノイドの演算だけを忘れる関手とを区別したい。そのために、忘却した後で確かめられる「特別な余等化子」と、忘却関手が同型を見落とさない条件を用意する。

本講で使う基本図式は、平行二射 $f,g:A\to B$ の[余等化子](../CAT2-05/index.md#def-cat2-05-coequalizer)である。すなわち $q:B\to Q$ は $qf=qg$ を満たし、$hf=hg$ である任意の $h:B\to X$ が一意に $q$ を通って分解する。以下の合成は右から左へ読み、圏と関手には必要な箇所で局所小性を仮定する。

## 2. 分解の写像が付いた余等化子

通常の余等化子では、$Q$ の元を $B$ へ戻す操作は指定されない。これに対し、$Q$ から $B$ への戻し方 $s$ と、$B$ から $A$ への補助写像 $t$ があり、互いにうまく整合していれば、余等化子の普遍性を**式だけで**証明できる。

<a id="def-cat3-04-split-coequalizer"></a>

<!-- formal-statement-start -->
> **定義（分裂余等化子）**
> 圏 $\mathcal C$ の平行二射 $f,g:A\to B$ に対し、射 $q:B\to Q$ と補助射 $s:Q\to B$、$t:B\to A$ があり、次の四条件を満たすとき、$(q,s,t)$ を $f,g$ の**分裂余等化子**（split coequalizer）のデータという。

$$
\begin{aligned}
qf&=qg:A\to Q, & qs&=1_Q:Q\to Q,\\
ft&=1_B:B\to B, & gt&=sq:B\to B.
\end{aligned}
$$

> ここでは $q$ が普遍的であることを定義に追加せず、この四条件から証明する。
<!-- formal-statement-end -->

<!-- definition-example-start: def-cat3-04-split-coequalizer -->
**定義の確認**（二点を一つにする）。集合 $A=\{u,v\}$、$B=\{0,1\}$、$Q=\{*\}$ として

$$
\begin{aligned}
&f(u)=0,\quad f(v)=1,\qquad g(u)=g(v)=0,\\
&q(0)=q(1)=*,\quad s(*)=0,\quad t(0)=u,\quad t(1)=v
\end{aligned}
$$

とする。$qf=qg$ は $u,v$ の両方で値 $*$ を持ち、$qs=1_Q$ である。また $ft(0)=0,\ ft(1)=1$ だから $ft=1_B$。最後に $gt(0)=gt(1)=0=sq(0)=sq(1)$ である。**四条件をすべて検査した**ので分裂データを得た。この例では $q$ は二点を一つに同一視する。
<!-- definition-example-end -->

<a id="prop-cat3-04-absolute"></a>

<!-- formal-statement-start -->
> **命題（分裂余等化子の普遍性と絶対保存性）**
> 任意の圏 $\mathcal C$ で、$f,g:A\to B$ と $q,s,t$ が[分裂余等化子の四条件](#def-cat3-04-split-coequalizer)を満たすなら、$q$ は $f,g$ の余等化子である。さらに任意の関手 $F:\mathcal C\to\mathcal E$ に対し $Fq$ は $Ff,Fg$ の余等化子である。この性質を、分裂余等化子が**絶対的に保存される**という。
<!-- formal-statement-end -->

### 証明の見取り図

$hf=hg$ を満たす射 $h:B\to X$ に対し、求める $Q\to X$ は $hs$ しかあり得ない。実際、分裂の二つの式を順に使うと $h=hsq$ が得られる。関手で写した後も四条件がそのまま残ることが要点である。

<!-- proof-start -->
### 証明

$hf=hg$ とすると

$$
h=h(ft)=(hf)t=(hg)t=h(gt)=h(sq)=(hs)q.
$$

従って $hs:Q\to X$ が求める分解である。もし $kq=h$ なら $qs=1_Q$ より

$$
k=k(qs)=(kq)s=hs
$$

となり一意性も従う。ゆえに[余等化子の定義](../CAT2-05/index.md#def-cat2-05-coequalizer)を満たす。

任意の関手 $F$ は恒等射・合成を保存するので

$$
(Fq)(Ff)=(Fq)(Fg),\quad
(Fq)(Fs)=1_{FQ},\quad
(Ff)(Ft)=1_{FB},\quad
(Fg)(Ft)=(Fs)(Fq).
$$

よって $Fq,Fs,Ft$ も四条件を満たす。証明の前半を $\mathcal E$ 内で適用すれば $Fq$ は余等化子となる。$\square$
<!-- proof-end -->

**分裂は通常の余等化子より強い。** $A=\varnothing$、$B=\{b\}$、$f,g:\varnothing\to B$ を唯一の写像とすれば、$1_B$ は余等化子である。しかし $t:B\to\varnothing$ は存在しないので分裂余等化子ではない。したがって一般の余等化子に対して、どの関手でも保存すると主張したわけではない。

## 3. 忘却した先で分裂する平行二射

随伴の右側の関手 $R:\mathcal D\to\mathcal C$ があるとき、$\mathcal D$ 内の余等化子があらかじめ分裂している必要はない。$\mathcal C$ へ写した**後で**分裂することが重要になる。

<a id="def-cat3-04-u-split"></a>

<!-- formal-statement-start -->
> **定義（R-分裂平行二射）**
> 関手 $R:\mathcal D\to\mathcal C$ と平行二射 $f,g:D_1\to D_0$ に対して、$Rf,Rg:RD_1\to RD_0$ が $\mathcal C$ で分裂余等化子

$$
RD_1\ \substack{\xrightarrow{\ Rf\ }\\[-2pt]\xrightarrow[\ Rg\ ]{}}\ RD_0
\xrightarrow{\ q\ } Q
$$

> を持つとき、$(f,g)$ を**$R$-分裂**（$R$-split）という。分裂の補助射は $\mathcal C$ にあればよく、$\mathcal D$ の射へ持ち上がるとは仮定しない。
<!-- formal-statement-end -->

<!-- definition-example-start: def-cat3-04-u-split -->
**定義の確認**（恒等関手）。$R=1_{\mathbf{Set}}$ とし、前節の二点の例を用いる。$Rf=f,\ Rg=g$ であり、実際に $q,s,t$ の四条件を調べたので $(f,g)$ は $R$-分裂である。一方、空集合から一元集合への二本の写像は、余等化子自体はあるが $t$ が存在せず、$R$-分裂ではない。
<!-- definition-example-end -->

分裂余等化子が像の圏で存在しても、その商に元の圏で必要な構造が入る保証はない。この構造を一意に復元できる性質を次に区別する。

<a id="def-cat3-04-creates"></a>

<!-- formal-statement-start -->
> **定義（R-分裂余等化子の創出）**
> 関手 $R:\mathcal D\to\mathcal C$ が**$R$-分裂平行二射の余等化子を創出する**とは、任意の $R$-分裂対 $f,g:D_1\to D_0$ と、その像に対して選んだ任意の分裂余等化子 $q:RD_0\to Q$ に対し、$R\bar Q=Q$、$R\bar q=q$ を満たす余等化子 $\bar q:D_0\to\bar Q$ が存在し、この指定された像の上での持ち上げが一意であることをいう。

> 等号は選んだ対象・射を厳密に固定する表記である。圏を同型まで扱う場合には、持ち上げの一意性も対応する一意同型として読む。
<!-- formal-statement-end -->

<!-- definition-example-start: def-cat3-04-creates -->
**定義の確認**（恒等関手）。$R=1_{\mathcal C}$ なら、任意の $R$-分裂対と選んだ $q$ に対し $\bar Q=Q,\ \bar q=q$ と置く。前節の[絶対保存性](#prop-cat3-04-absolute)により $q$ は余等化子である。さらに $R\bar Q=Q,\ R\bar q=q$ は他の対象・射の選択を許さないので、指定された像の上で一意である。
<!-- definition-example-end -->

**保存と創出の違い。** 「保存」はすでにある余等化子を写す方向の主張であり、「創出」は像で与えられた余等化子に構造を付けて戻す方向の主張である。$R$-分裂と呼んでも、$f,g$ 自身が $\mathcal D$ で分裂するわけではない。

## 4. 同型を見落とさないこと

忘却関手が射の同型性を見落とせば、比較関手が圏の同値であることは期待できない。例えば積圏 $\mathbf{Set}\times\mathbf{Set}$ の射は二成分の写像であり、第二成分だけの検査では第一成分の可逆性が分からない。

<a id="def-cat3-04-conservative"></a>

<!-- formal-statement-start -->
> **定義（同型を反映する関手）**
> 関手 $R:\mathcal D\to\mathcal C$ が**同型を反映する**（conservative）とは、$\mathcal D$ の任意の射 $u:D\to E$ について、$Ru$ が $\mathcal C$ の同型射なら $u$ 自身が $\mathcal D$ の同型射であることをいう。
<!-- formal-statement-end -->

<!-- definition-example-start: def-cat3-04-conservative -->
**定義の確認**（第二射影の失敗）。$R=\pi_2:\mathbf{Set}\times\mathbf{Set}\to\mathbf{Set}$ とする。射

$$
u=(\{0\}\hookrightarrow\{0,1\},\,1_{\{*\}})
:(\{0\},\{*\})\longrightarrow(\{0,1\},\{*\})
$$

は第二成分 $Ru=1_{\{*\}}$ が同型である。しかし第一成分の包含には逆写像がなく、$u$ も同型でない。したがって $\pi_2$ は同型を反映しない。
<!-- definition-example-end -->

<a id="prop-cat3-04-forgetful-conservative"></a>

<!-- formal-statement-start -->
> **命題（代数忘却関手は同型を反映する）**
> 任意の局所小圏 $\mathcal C$ 上のモナド $T$ に対し、[Eilenberg–Moore圏](../CAT3-03/index.md#def-cat3-03-em)の忘却関手 $U^T:\mathcal C^T\to\mathcal C$ は同型を反映する。
<!-- formal-statement-end -->

### 証明の見取り図

代数射 $f:(A,a)\to(B,b)$ の元の射に逆 $f^{-1}$ があるなら、代数射の等式を逆写像で挟んで、その逆も評価を保つと示す。

<!-- proof-start -->
### 証明

代数射の条件は

$$
fa=bTf:TA\longrightarrow B
$$

である。$f$ が $\mathcal C$ で同型なら、両辺の左から $f^{-1}$ を、右から $T(f^{-1}):TB\to TA$ を合成して

$$
\begin{aligned}
f^{-1}b
&=f^{-1}b(Tf)(Tf^{-1})\\
&=f^{-1}(fa)(Tf^{-1})
=a\,T(f^{-1})
\end{aligned}
$$

を得る。ここで $Tf\circ Tf^{-1}=T1_B=1_{TB}$ と関手性を使った。これは $f^{-1}:(B,b)\to(A,a)$ が代数射である条件である。ゆえに $f$ は $\mathcal C^T$ でも同型である。$\square$
<!-- proof-end -->

## 5. 代数忘却関手は分裂余等化子を創出する

$U^T$ にとって、像の圏で分裂余等化子を取ったとき、商対象上に代数構造を作れるだろうか。分裂余等化子は任意の関手で保存されるので、$Tq$ も余等化子である。これは $TB$ 上の評価を $TQ$ 上の評価へ降ろすための正確な道具になる。

<a id="thm-cat3-04-em-creates"></a>

<!-- formal-statement-start -->
> **定理（Eilenberg–Moore忘却関手による創出）**
> 局所小圏 $\mathcal C$ 上のモナド $(T,\eta,\mu)$ に対し、$U^T:\mathcal C^T\to\mathcal C$ は $U^T$-分裂平行二射の余等化子を創出する。すなわち代数射 $f,g:(A,a)\to(B,b)$ の元の射が、選んだ分裂余等化子 $q:B\to Q$ を持つなら、$Q$ 上にただ一つの代数構造 $c:TQ\to Q$ が入り、$q:(B,b)\to(Q,c)$ が $\mathcal C^T$ における余等化子となる。
<!-- formal-statement-end -->

### 証明の見取り図

代数射の条件から $qb$ は $Tf,Tg$ を余等化する。[絶対保存性](#prop-cat3-04-absolute)で $Tq$ が余等化子となるため、$cTq=qb$ を満たす $c$ が一意に定まる。$q$、$Tq$、$T^2q$ はいずれも右逆を持つためエピ射であり、これらとの合成で代数の二公理と普遍性を確かめる。

<!-- proof-start -->
### 証明

**代数構造の構成。** $q:B\to Q$ に分裂データ $s,t$ があるとする。$f,g$ は[代数射](../CAT3-03/index.md#def-cat3-03-morphism)だから

$$
qb\,Tf=qf\,a=qg\,a=qb\,Tg.
$$

$Tq:TB\to TQ$ は[絶対保存性](#prop-cat3-04-absolute)により $Tf,Tg$ の余等化子である。従って一意な $c:TQ\to Q$ が存在して

$$
c\,Tq=qb:TB\to Q
$$

となる。$Tq$ には右逆 $Ts$ があるので $c$ の一意性は射の等式としても確認できる。

**単位律。** $\eta$ の自然性 $Tq\,\eta_B=\eta_Qq$ と $b\eta_B=1_B$ から

$$
c\eta_Qq=c\,Tq\,\eta_B=qb\eta_B=q.
$$

$q$ は $qs=1_Q$ を満たすためエピ射である。従って $c\eta_Q=1_Q$。

**結合律。** $\mu$ の自然性 $\mu_QT^2q=Tq\,\mu_B$ を用いて、二つの射 $T^2Q\to Q$ を $T^2q$ の後で比較する。

$$
\begin{aligned}
c\mu_Q\,T^2q
&=c\,Tq\,\mu_B=qb\mu_B,\\
cTc\,T^2q
&=c\,T(c\,Tq)=c\,T(qb)\\
&=c\,Tq\,Tb=qb\,Tb.
\end{aligned}
$$

$b\mu_B=bTb$ は $(B,b)$ の代数公理なので右辺は一致する。$T^2q$ は $T^2s$ を右逆に持ちエピ射だから、$c\mu_Q=cTc$ が従う。よって $(Q,c)$ は代数で、$cTq=qb$ により $q$ は代数射である。

**余等化子の普遍性。** 代数射 $h:(B,b)\to(D,d)$ が $hf=hg$ を満たすとする。$q$ は $\mathcal C$ で余等化子なので、唯一の $u:Q\to D$ があり $uq=h$ となる。$u$ が代数射であることを、$Tq$ の後で確認する。

$$
\begin{aligned}
uc\,Tq&=u(qb)=hb,\\
dTu\,Tq&=dT(uq)=dTh=hb.
\end{aligned}
$$

最後は $h$ が代数射であることによる。$Tq$ はエピ射なので $uc=dTu$。従って $u$ は代数射であり、$uq=h$ の一意性も $\mathcal C$ での一意性から従う。最後に別の $c'$ でも $q$ が代数射なら $c'Tq=qb=cTq$ なので $c'=c$。$\square$
<!-- proof-end -->

**有限語の例。** [有限語モナドの代数](../CAT3-03/index.md#prop-cat3-03-list-monoids)として加法モノイド $(\mathbb N,+,0)$ を考える。語 $w=[2,3]$ なら評価は $a(w)=5$。代数から生じる平行二射 $\mu_{\mathbb N},\,Ta:T^2\mathbb N\to T\mathbb N$ に対して、二重の語 $[[2,3],[4]]$ は

$$
\mu_{\mathbb N}([[2,3],[4]])=[2,3,4],\quad
Ta([[2,3],[4]])=[5,4]
$$

となるが、どちらを評価しても $9$ になる。この組の分裂データを次節で一般的に構成する。

## 6. 比較関手の充満忠実性は余単位の余等化子で測る

比較関手 $K:\mathcal D\to\mathcal C^T$ の射が欠けていないかを確かめるには、任意の代数射 $b:KD\to KE$ から、元の射 $D\to E$ を一意に復元できればよい。[随伴の転置](../CAT2-09/index.md#prop-cat2-09-transpose)を使うと、$b:RD\to RE$ は $v=\varepsilon_E Lb:LRD\to E$ に対応する。問題は、この $v$ が余単位 $\varepsilon_D:LRD\to D$ を通って分解するか、である。

以下、$L:\mathcal C\rightleftarrows\mathcal D:R$ を局所小圏間の随伴とし、単位を $\eta$、余単位を $\varepsilon$、$T=RL$ とする。$D\in\mathcal D$ に付随する代数構造を

$$
a_D=R\varepsilon_D:T(RD)\to RD
$$

と置く（[比較関手の構成](../CAT3-03/index.md#thm-cat3-03-comparison)）。

<a id="lem-cat3-04-counit-pair"></a>

<!-- formal-statement-start -->
> **補題（余単位の標準平行二射）**
> 随伴 $L:\mathcal C\rightleftarrows\mathcal D:R$ と対象 $D\in\mathcal D$ に対し、平行二射

$$
p_D=\varepsilon_{LRD},\qquad
r_D=LR\varepsilon_D:LRLRD\rightrightarrows LRD
$$

> は $\varepsilon_D:LRD\to D$ によって余等化される。その $R$ による像は $\mu_{RD},\,T a_D:T^2(RD)\rightrightarrows T(RD)$ であり、$a_D:T(RD)\to RD$ はこの像の分裂余等化子である。従って $(p_D,r_D)$ は $R$-分裂である。
<!-- formal-statement-end -->

### 証明の見取り図

$\varepsilon$ の自然性が $\varepsilon_Dp_D=\varepsilon_Dr_D$ を与える。像ではモナド代数の結合律と単位律が、分裂の四条件にちょうど一致する。

<!-- proof-start -->
### 証明

$\varepsilon:LR\Rightarrow1_{\mathcal D}$ の自然性を射 $\varepsilon_D:LRD\to D$ に適用して

$$
\varepsilon_D\varepsilon_{LRD}
=\varepsilon_D LR\varepsilon_D
$$

を得る。$R$ を適用すると $Rp_D=R\varepsilon_{LRD}=\mu_{RD}$、$Rr_D=RLR\varepsilon_D=Ta_D$、$R\varepsilon_D=a_D$ である。

分裂の補助射を

$$
s=\eta_{RD}:RD\to TRD,\qquad
t=\eta_{TRD}:TRD\to T^2RD
$$

と取る。四条件は順に

$$
\begin{aligned}
a_D\mu_{RD}&=a_DTa_D &&\text{（代数結合律）},\\
a_D\eta_{RD}&=1_{RD} &&\text{（代数単位律）},\\
\mu_{RD}\eta_{TRD}&=1_{TRD} &&\text{（モナドの単位律）},\\
Ta_D\,\eta_{TRD}&=\eta_{RD}a_D &&\text{（単位の自然性）}
\end{aligned}
$$

であり、型もそれぞれ分裂余等化子の定義と一致する。$\square$
<!-- proof-end -->

<a id="lem-cat3-04-algebra-morphism-transpose"></a>

<!-- formal-statement-start -->
> **補題（代数射の転置判定）**
> 上の随伴と対象 $D,E\in\mathcal D$ に対し、射 $b:RD\to RE$ の随伴転置を $v=\varepsilon_E Lb:LRD\to E$ とする。このとき、$b:KD\to KE$ が $T$-代数射であることと

$$
vp_D=vr_D:LRLRD\to E
$$

> とは同値である。
<!-- formal-statement-end -->

### 証明の見取り図

$vp_D$ と $vr_D$ の始域は $L(TRD)$ である。両者を随伴転置して $TRD\to RE$ の射へ直すと、代数射の条件の左右になる。

<!-- proof-start -->
### 証明

$v=\varepsilon_E Lb$ の $R$ による像は

$$
Rv=R\varepsilon_E\,RLb=a_E\,Tb:TRD\to RE.
$$

$vp_D$ の転置は、[三角恒等式](../CAT2-09/index.md#def-cat2-09-triangle-data)により

$$
R(vp_D)\eta_{TRD}
=Rv\,R\varepsilon_{LRD}\eta_{TRD}
=Rv\,\mu_{RD}\eta_{TRD}
=Rv=a_E\,Tb.
$$

一方、$vr_D$ の転置では、$\eta$ の自然性を射 $a_D:TRD\to RD$ に適用する。

$$
\begin{aligned}
R(vr_D)\eta_{TRD}
&=Rv\,T a_D\,\eta_{TRD}\\
&=Rv\,\eta_{RD}\,a_D
=b\,a_D.
\end{aligned}
$$

最後は $Rv\eta_{RD}=b$ という転置の等式である。[Homの自然全単射](../CAT2-08/index.md#def-cat2-08-adjunction)は二射の等しさを反映するから、$vp_D=vr_D$ と $a_ETb=ba_D$ は同値である。後者が[代数射の条件](../CAT3-03/index.md#def-cat3-03-morphism)である。$\square$
<!-- proof-end -->

<a id="thm-cat3-04-full-faithfulness"></a>

<!-- formal-statement-start -->
> **定理（比較関手の充満忠実性の判定）**
> 局所小圏間の随伴 $L:\mathcal C\rightleftarrows\mathcal D:R$ の比較関手 $K:\mathcal D\to\mathcal C^T$（$T=RL$）について、次は同値である。
>
> 1. $K$ は充満忠実である。
> 2. すべての $D\in\mathcal D$ で、余単位 $\varepsilon_D:LRD\to D$ は平行二射 $\varepsilon_{LRD},\,LR\varepsilon_D:LRLRD\rightrightarrows LRD$ の $\mathcal D$ における余等化子である。
>
> いずれかが成立するとき、$R$ は同型を反映する。
<!-- formal-statement-end -->

### 証明の見取り図

**2から1へ**は、[転置判定](#lem-cat3-04-algebra-morphism-transpose)で任意の代数射 $b$ を $v:LRD\to E$ に変え、余等化子を使って $D\to E$ へ降ろす。**1から2へ**は、[代数忘却関手の創出](#thm-cat3-04-em-creates)を標準平行二射に使い、代数圏内の余等化子を比較関手の充満忠実性で戻す。

<!-- proof-start -->
### 証明

**2から1へ。** $D,E\in\mathcal D$ と代数射 $b:KD\to KE$ を任意に取る。基底の射は $b:RD\to RE$ で、転置 $v=\varepsilon_E Lb:LRD\to E$ を作る。[転置判定](#lem-cat3-04-algebra-morphism-transpose)により $vp_D=vr_D$。仮定2の余等化子から唯一の $k:D\to E$ が存在して $k\varepsilon_D=v$ となる。

$$
Rk=Rk\,a_D\eta_{RD}
=R(k\varepsilon_D)\eta_{RD}
=Rv\eta_{RD}=b.
$$

最初の等号は $a_D\eta_{RD}=1_{RD}$、最後の等号は随伴転置による。従って $Kk=b$ であり $K$ は充満である。

さらに $Kk=Kk'$ なら $Rk=Rk'$。余単位の自然性から

$$
k\varepsilon_D=\varepsilon_E LRk
=\varepsilon_E LRk'=k'\varepsilon_D.
$$

余等化子 $\varepsilon_D$ はエピ射である（$x\varepsilon_D=y\varepsilon_D$ なら、その二射は同じ因子分解を与える）。よって $k=k'$ となり $K$ は忠実である。

**1から2へ。** [標準平行二射](#lem-cat3-04-counit-pair)の像は、$T$-代数 $(RD,a_D)$ の自由代数からの二射

$$
F^T(TRD)\ \substack{\xrightarrow{\ \mu_{RD}\ }\\[-2pt]\xrightarrow[\ Ta_D\ ]{}}\ F^T(RD)
\xrightarrow{\ a_D\ }(RD,a_D)
$$

に一致する。これは underlying な $\mathcal C$ で分裂余等化子だから、[代数忘却関手の創出](#thm-cat3-04-em-creates)により $\mathcal C^T$ で余等化子である。実際、余等化子の代数構造は $a_D$ を代数射にするものとして一意であり、既に $(RD,a_D)$ がその条件を満たす。

[比較関手の構成](../CAT3-03/index.md#thm-cat3-03-comparison)より $KL=F^T$、$K\varepsilon_D=a_D$、$Kp_D=\mu_{RD}$、$Kr_D=Ta_D$。射 $h:LRD\to E$ が $hp_D=hr_D$ を満たすとする。$Kh$ は代数圏で $Kp_D,Kr_D$ を余等化するので、唯一の代数射 $b:KD\to KE$ が存在して

$$
b\,K\varepsilon_D=Kh.
$$

$K$ の充満性で $b=Kk$ となる射 $k:D\to E$ を取ると、忠実性から $k\varepsilon_D=h$。この因子分解は $K$ の忠実性と代数圏での一意性によって一意である。ゆえに $\varepsilon_D$ は余等化子となる。

**同型の反映。** $Ru$ が同型なら、[代数忘却関手による同型の反映](#prop-cat3-04-forgetful-conservative)から $Ku$ は同型である。充満忠実な関手は同型を反映する。実際、$Ku$ の逆を充満性で $Kv$ と書けば $K(vu)=1$、$K(uv)=1$、忠実性から $vu=1$、$uv=1$ である。従って $u$ は同型で、$R$ も同型を反映する。$\square$
<!-- proof-end -->

この定理の重要な点は、同型の反映が欠かせない性質であっても、それだけでは比較関手の充満性を証明していないことである。次に考えるべき問いは、$R$-分裂した任意の対について、像で作れる商を元の圏へ持ち上げられるかどうかである。

## 7. 射の情報を失う例を、余単位から見抜く

$\mathcal D=\mathbf{Set}\times\mathbf{Set}$、$\mathcal C=\mathbf{Set}$ とし、$R=\pi_2$ を第二射影とする。$L(X)=(\varnothing,X)$ と置くと

$$
\operatorname{Hom}_{\mathcal D}((\varnothing,X),(A,B))
\cong\operatorname{Hom}_{\mathbf{Set}}(X,B)
$$

である。第一成分の射 $\varnothing\to A$ は唯一だから、この全単射は両変数で自然であり $L\dashv R$。従って $T=RL=1_{\mathbf{Set}}$ で、[恒等モナドの代数圏](../CAT3-03/index.md#def-cat3-03-em)は $\mathbf{Set}$ と同型である。

比較関手は $K(A,B)=B$ であり、第一成分の射の違いを消してしまう。例えば $A=A'=\{0,1\}$、$B=\{b\}$ とする。第一成分の恒等写像と定数写像は異なるが、第二成分をどちらも $1_B$ とした二つの射は、$K$ の下で同じ $1_B$ に送られる。したがって $K$ は忠実でない。

余単位は

$$
\varepsilon_{(A,B)}:(\varnothing,B)\longrightarrow(A,B)
$$

で、第一成分は $\varnothing\to A$、第二成分は $1_B$ である。$p_D=r_D=1_{(\varnothing,B)}$ だが、$A\ne\varnothing$ なら $\varepsilon_D$ はこの対の余等化子ではない。実際 $h=1_{(\varnothing,B)}$ は $hp_D=hr_D$ を満たすものの、$h=k\varepsilon_D$ とする $k:(A,B)\to(\varnothing,B)$ は第一成分に $A\to\varnothing$ を要求し存在しない。[充満忠実性の判定](#thm-cat3-04-full-faithfulness)の失敗を、商の普遍性そのものから読み取れた。

## 8. 演習：分裂の四条件から比較関手まで

### 問題1：有限集合の分裂データ

- Level: A
- 問題ID: CAT3-04-SPLIT-SET

$A=\{u,v\}$、$B=\{0,1\}$、$f(u)=0,f(v)=1$、$g(u)=g(v)=0$ とする。$Q=\{*\}$、$q:B\to Q$ を唯一の写像とし、$s(*)=0$、$t(0)=u,t(1)=v$ を取る。分裂余等化子の四条件を一つずつ確認し、$hf=hg$ を満たす任意の $h:B\to X$ の一意な分解を求めよ。

<!-- solution-start -->
**詳細解答**：$qf(u)=qg(u)=*$、$qf(v)=qg(v)=*$ なので $qf=qg$。$qs(*)=q(0)=*$ より $qs=1_Q$。$ft(0)=f(u)=0$、$ft(1)=f(v)=1$ より $ft=1_B$。$gt(0)=g(u)=0$、$gt(1)=g(v)=0$ で、$sq$ も $0,1$ の両方を $0$ に送るから $gt=sq$。

$hf=hg$ を $v$ に適用すると $h(1)=h(0)$。従って $\bar h(*)=h(0)$ と置けば $\bar hq=h$。別の $\ell:Q\to X$ も $\ell q=h$ なら $\ell(*)=\ell(q(0))=h(0)=\bar h(*)$ なので一意である。これは一般の式 $\bar h=hs$ の具体形である。
<!-- solution-end -->

### 問題2：なぜ通常の余等化子では足りないか

- Level: A
- 問題ID: CAT3-04-NONSPLIT

$A=\varnothing$、$B=\{b\}$、$f,g:A\to B$ を唯一の写像とする。$1_B$ が余等化子であることを証明し、この対に分裂データが存在しない理由を述べよ。

<!-- solution-start -->
**詳細解答**：任意の $h:B\to X$ について、空集合上の二写像 $hf,hg$ は一致する。$h=\bar h1_B$ を満たす写像は $\bar h=h$ だけなので $1_B$ は[余等化子](../CAT2-05/index.md#def-cat2-05-coequalizer)である。しかし分裂データには $t:B\to A=\varnothing$ が必要である。$B$ には元 $b$ がある一方、$t(b)$ の値となる元は空集合に存在しない。従って $t$ は存在せず、分裂余等化子でない。
<!-- solution-end -->

### 問題3：標準平行二射の四条件

- Level: A
- 問題ID: CAT3-04-ALGEBRA-SPLIT

モナド $(T,\eta,\mu)$ の代数 $(A,a)$ に対し $f=\mu_A$、$g=Ta:T^2A\to TA$、$q=a:TA\to A$ とする。$s=\eta_A$、$t=\eta_{TA}$ による分裂の四条件を記し、それぞれ使う公理・自然性を答えよ。

<!-- solution-start -->
**詳細解答**：$qf=qg$ は $a\mu_A=aTa$ で代数の結合律。$qs=a\eta_A=1_A$ は代数の単位律。$ft=\mu_A\eta_{TA}=1_{TA}$ はモナドの左側単位律。最後の $gt=Ta\,\eta_{TA}=\eta_Aa=sq$ は自然変換 $\eta:1\Rightarrow T$ の射 $a:TA\to A$ における自然性である。

式の型を確認すると、第一式は $T^2A\to A$、第二式は $A\to A$、残る二式は $TA\to TA$ である。従って四条件のどれも異なる型の射を混同していない。
<!-- solution-end -->

### 問題4：代数射の逆

- Level: A
- 問題ID: CAT3-04-REFLECT-ISO

代数射 $f:(A,a)\to(B,b)$ の基底の射 $f:A\to B$ が同型であるとする。$f^{-1}$ が代数射となる式を導け。また $U^T$ が忠実であることを説明し、忠実であることと同型を反映することを混同しないよう述べよ。

<!-- solution-start -->
**詳細解答**：[代数射の条件](../CAT3-03/index.md#def-cat3-03-morphism)は $fa=bTf$。$Tf$ は関手性により逆 $Tf^{-1}$ を持つ。左右に逆を合成すると

$$
f^{-1}b=f^{-1}(fa)(Tf^{-1})=aTf^{-1},
$$

ゆえに $f^{-1}$ も代数射である。$U^T$ は二つの代数の間のHom集合を $\mathcal C$ のHom集合の部分集合として埋め込むので、異なる代数射を同じ射へ送らず忠実である。同型を反映することは、逆射が元の代数圏でも存在するという別の条件であり、上の計算がその追加の証明となる。
<!-- solution-end -->

### 問題5：絶対保存性をもう一度証明する

- Level: B
- 問題ID: CAT3-04-ABSOLUTE

圏 $\mathcal C$ の分裂データ $(q,s,t)$ と関手 $F:\mathcal C\to\mathcal E$ を取る。$Ff,Fg$ を余等化する任意の射 $h:FB\to X$ に対し、$Fq$ を通る分解を具体的に作れ。分解が一意なことまで四条件だけで示せ。

<!-- solution-start -->
**詳細解答**：$hFf=hFg$ が仮定である。$FfFt=F1_B=1_{FB}$、$FgFt=FsFq$ を用いると

$$
h=hFfFt=hFgFt=hFsFq.
$$

従って $\bar h=hFs:FQ\to X$ は $\bar hFq=h$ を満たす。別の $k:FQ\to X$ にも $kFq=h$ があれば、$FqFs=F1_Q=1_{FQ}$ から

$$
k=kFqFs=hFs=\bar h
$$

となる。また $FqFf=FqFg$ は関手性で保たれる。これにより $Fq$ は[余等化子](../CAT2-05/index.md#def-cat2-05-coequalizer)であり、$F$ に保存性を別途仮定する必要はない。
<!-- solution-end -->

### 問題6：商上の代数構造の一意性

- Level: B
- 問題ID: CAT3-04-CREATE-ALGEBRA

局所小圏 $\mathcal C$ 上のモナド $T$ について、代数射 $f,g:(A,a)\to(B,b)$ の underlying な平行二射が分裂余等化子 $q:B\to Q$ を持つとする。$cTq=qb$ により $c:TQ\to Q$ を定める理由を述べ、$c\eta_Q=1_Q$ と $c\mu_Q=cTc$ を、エピ射である写像を明記して証明せよ。

<!-- solution-start -->
**詳細解答**：$fa=bTf$、$ga=bTg$ と $qf=qg$ から

$$
qbTf=qfa=qga=qbTg.
$$

$Tq$ は[分裂余等化子の絶対保存性](#prop-cat3-04-absolute)により $Tf,Tg$ の余等化子なので、唯一の $c$ が $cTq=qb$ を満たす。単位の自然性から

$$
c\eta_Qq=cTq\eta_B=qb\eta_B=q.
$$

$q$ は右逆 $s$ を持つエピ射ゆえ $c\eta_Q=1_Q$。一方 $\mu$ の自然性、$cTq=qb$、$b\mu_B=bTb$ から

$$
\begin{aligned}
c\mu_Q T^2q&=cTq\mu_B=qb\mu_B,\\
cTcT^2q&=cT(qb)=cTqTb=qbTb.
\end{aligned}
$$

$T^2q$ も右逆 $T^2s$ を持つエピ射だから $c\mu_Q=cTc$。$c'$ も $q$ を代数射にするなら $c'Tq=qb=cTq$ なので $Tq$ のエピ性により $c'=c$ である。
<!-- solution-end -->

### 問題7：転置と代数射の対応

- Level: B
- 問題ID: CAT3-04-TRANSPOSE-TEST

随伴 $L\dashv R$、$T=RL$、$D,E\in\mathcal D$ とし、$a_D=R\varepsilon_D$、$a_E=R\varepsilon_E$ とする。$b:RD\to RE$ の転置 $v=\varepsilon_E Lb$ に対し、$vp_D$ と $vr_D$ の転置をそれぞれ計算せよ。$b$ が $KD\to KE$ の代数射となる必要十分条件を結論せよ。

<!-- solution-start -->
**詳細解答**：両合成の始域は $L(TRD)$ だから、転置は $TRD\to RE$ の射である。[三角恒等式](../CAT2-09/index.md#def-cat2-09-triangle-data)と $\mu_{RD}=R\varepsilon_{LRD}$ を使うと

$$
R(vp_D)\eta_{TRD}
=Rv\mu_{RD}\eta_{TRD}=Rv=a_ETb.
$$

他方 $r_D=LR\varepsilon_D$ なので

$$
\begin{aligned}
R(vr_D)\eta_{TRD}
&=Rv\,Ta_D\,\eta_{TRD}\\
&=Rv\eta_{RD}a_D=ba_D.
\end{aligned}
$$

二つ目は $\eta$ の自然性、最後は $Rv\eta_{RD}=b$ による。随伴転置は全単射だから、$vp_D=vr_D$ と $a_ETb=ba_D$ は同値。後者が[代数射の定義](../CAT3-03/index.md#def-cat3-03-morphism)である。
<!-- solution-end -->

### 問題8：余単位から忠実性を導く

- Level: B
- 問題ID: CAT3-04-COUNIT-FAITHFUL

随伴 $L\dashv R$ で、各 $\varepsilon_D:LRD\to D$ が標準対 $p_D,r_D$ の余等化子であるとする。$Rk=Rk'$ となる二射 $k,k':D\to E$ が等しいことを証明せよ。その後、代数射 $b:KD\to KE$ が任意なら、なぜ $D\to E$ に持ち上がるかを説明せよ。

<!-- solution-start -->
**詳細解答**：余単位の自然性より

$$
k\varepsilon_D=\varepsilon_E LRk
=\varepsilon_E LRk'=k'\varepsilon_D.
$$

[余等化子](../CAT2-05/index.md#def-cat2-05-coequalizer)はエピ射なので $k=k'$。従って $R$、ひいては $K$ は忠実である。

代数射 $b$ に対して $v=\varepsilon_E Lb$ を作ると、[転置判定](#lem-cat3-04-algebra-morphism-transpose)から $vp_D=vr_D$。余等化子の普遍性により $k\varepsilon_D=v$ を満たす $k:D\to E$ が存在する。$a_D\eta_{RD}=1$ と転置公式により

$$
Rk=Rk\,a_D\eta_{RD}
=R(k\varepsilon_D)\eta_{RD}
=Rv\eta_{RD}=b.
$$

これで代数射 $b$ が $Kk$ として持ち上がり、充満性も得られる。
<!-- solution-end -->

### 問題9：第二射影がモナド的でない理由を追う

- Level: C
- 問題ID: CAT3-04-PROJECTION-OBSTRUCTION

$\mathcal D=\mathbf{Set}\times\mathbf{Set}$、$\mathcal C=\mathbf{Set}$、$R(A,B)=B$、$L(X)=(\varnothing,X)$ とする。

1. $L\dashv R$ をHom集合で示し、誘導するモナドを求めよ。
2. $D=(A,B)$ で $A\ne\varnothing$ のとき、$p_D,r_D,\varepsilon_D$ の二成分を求め、$\varepsilon_D$ が $p_D,r_D$ の余等化子でないことを普遍性から証明せよ。
3. $R$ が同型を反映しない射を具体的に示し、比較関手が充満忠実でない理由を2と結び付けよ。

<!-- solution-start -->
**詳細解答**：

1. $\operatorname{Hom}_{\mathcal D}((\varnothing,X),(A,B))$ の元は組 $(\varnothing\to A,\,X\to B)$ である。第一成分は唯一なので第二成分を取る操作が $\operatorname{Hom}_{\mathbf{Set}}(X,B)$ との自然な全単射を与え、$L\dashv R$。[随伴によるモナド](../CAT3-01/index.md#thm-cat3-01-adjunction-monad)は $T=RL$ だから $T(X)=X$、射にも恒等的に作用する。単位と乗法も恒等写像であり、恒等モナドを得る。
2. $LR(A,B)=(\varnothing,B)$ で、もう一度 $LR$ を施しても同じ対象である。従って

$$
p_D=r_D=1_{(\varnothing,B)},\qquad
\varepsilon_D=(\varnothing\to A,\,1_B).
$$

   $h=1_{(\varnothing,B)}$ は $hp_D=hr_D$ を満たす。もし $h=k\varepsilon_D$ となる $k:(A,B)\to(\varnothing,B)$ が存在すれば、その第一成分に写像 $A\to\varnothing$ が必要である。しかし $A\ne\varnothing$ なので不可能。ゆえに普遍性が破れる。
3. $u:(\{0\},\{*\})\to(\{0,1\},\{*\})$ を第一成分が包含、第二成分が恒等写像の組とする。$Ru$ は同型だが $u$ の第一成分は全射でなく、$u$ は同型でない。[比較関手の充満忠実性の判定](#thm-cat3-04-full-faithfulness)により、2で $\varepsilon_D$ が余等化子でない以上 $K$ は充満忠実ではない。実際 $K(A,B)=B$ となり第一成分の射情報を失う。3は必要条件の失敗、2はその背後にある余等化子の失敗を直接示している。
<!-- solution-end -->

ここまでで、モナド代数の商を一意に持ち上げられること、同型を反映すること、余単位が標準平行二射の余等化子になることの関係が見えた。次の講義で扱う Beck のモナド性定理では、これらを比較関手の**圏の同値**まで結び付ける条件を扱う。
