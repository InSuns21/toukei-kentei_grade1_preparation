# CATB7-03 擬同型と局所化

## 1. コホモロジーを変えない射を逆にする

[余鎖ホモトピーの同値性とコホモロジー不変性](../CATB7-02/index.md#thm-catb7-02-homotopy-invariance)によって、微分で説明できる差を消してもコホモロジーは変わらない。しかし、整数加群の複体

$$
\mathbb Z\xrightarrow{2}\mathbb Z\xrightarrow{p}\mathbb Z/2\mathbb Z
$$

は完全なのに可縮でない。ここで $p(x)=[x]_2$ であり、次数は左から0,1,2である。コホモロジーだけを考えるなら零複体と同一視したいが、ホモトピーだけではそれができない。本講ではこの差を埋めるため、コホモロジー上で同型となる射に形式的な逆射を与える。

以下、局所小な[アーベル圏](../CATB1-04/index.md#def-catb1-04-abelian-category) $\mathcal A$ を考える。集合の大きさを固定するため、$\mathcal A$ の対象・射の全体が集合となる十分大きな宇宙を一つ選び、その中で複体・射・同値類を作る。余鎖次数は整数、微分は次数を1上げ、合成は右から左へ行う。零対象を $0$ と書く。

## 2. ホモトピーで射を割る

複体を対象として保ち、射だけを[余鎖ホモトピー](../CATB7-02/index.md#def-catb7-02-cochain-homotopy)の同値類に置き換えると、余鎖写像の細かい差を忘れた圏を作れる。

<a id="def-catb7-03-homotopy-category"></a>

<!-- formal-statement-start -->
> **定義（余鎖複体のホモトピー圏）**
>
> アーベル圏 $\mathcal A$ の余鎖複体のホモトピー圏 $K(\mathcal A)$ は余鎖複体を対象とし、射集合・合成・恒等射を次で定める。

$$
\begin{gathered}
\operatorname{Hom}_{K(\mathcal A)}(C,D)
=\operatorname{Hom}_{\operatorname{Ch}(\mathcal A)}(C,D)/{\simeq},\\
[g][f]=[gf],\qquad 1_C=[1_C].
\end{gathered}
$$

> ここで $\operatorname{Ch}(\mathcal A)$ は余鎖複体と余鎖写像の圏、$\simeq$ は余鎖ホモトピーによる同値関係である。
<!-- formal-statement-end -->

[余鎖ホモトピーの同値性とコホモロジー不変性](../CATB7-02/index.md#thm-catb7-02-homotopy-invariance)により代表元を変えても合成と和は変わらない。結合律と単位律は余鎖写像のそれらから従う。各次数のコホモロジーも $[f]\mapsto H^n(f)$ と置くことでこの圏上の関手になる。

<!-- definition-example-start: def-catb7-03-homotopy-category -->
**定義の確認。** 次数0,1の複体 $C=(\mathbb Z\xrightarrow{3}\mathbb Z)$ では、4倍写像と恒等写像の差は3倍である。次数1から0への恒等射をホモトピーに取ると、次数0で $hd=3$、次数1で $dh=3$、他の次数で零となる。よって $[4]=[1]$。また $[2][4]=[8]=[2]$ である。最後の等号は差6倍が次数1から0への2倍写像で説明できるためである。
<!-- definition-example-end -->

$[f]$ がこの圏で逆射 $[g]$ を持つことをホモトピー同値と呼ぶ。すなわち $gf\simeq1_C$ と $fg\simeq1_D$ が成立することを意味する。

## 3. コホモロジーで同型になる射

複体そのものの同型は各次数の対象を同型にする。ホモトピー同値なら各次数の対象が同型である必要はないが、コホモロジー上には逆射が誘導される。この最後の性質だけを取り出す。

<a id="def-catb7-03-quasi-isomorphism"></a>

<!-- formal-statement-start -->
> **定義（擬同型）**
>
> アーベル圏の余鎖写像 $f:C\to D$ が擬同型であるとは、全整数 $n$ で誘導射

$$
H^n(f):H^n(C)\longrightarrow H^n(D)
$$

> が同型となることである。ホモトピー類 $[f]$ に対しても同じ条件を用いる。
<!-- formal-statement-end -->

<!-- definition-example-start: def-catb7-03-quasi-isomorphism -->
**定義の確認。** 整数 $m\ge2$ とする。次数 $-1,0$ の複体 $P=(\mathbb Z\xrightarrow{m}\mathbb Z)$ から次数0だけに $\mathbb Z/m\mathbb Z$ を持つ複体 $M$ へ、次数0で剰余射、他の次数で零射となる $s:P\to M$ を作る。$s^0d_P^{-1}(x)=[mx]_m=0$ なので余鎖写像である。

[コホモロジーの構成](../CATB7-01/index.md#def-catb7-01-cohomology)より $H^{-1}(P)=0$（整数の $m$ 倍は単射）、$H^0(P)=\mathbb Z/m\mathbb Z$（像は $m\mathbb Z$）。$M$ のコホモロジーも同じ二次数でそれぞれ零と $\mathbb Z/m\mathbb Z$ である。次数0の誘導射は $[x]_m\mapsto[x]_m$ で恒等射、他は零対象の恒等射である。したがって $s$ は擬同型である。
<!-- definition-example-end -->

一方、$s$ は次数 $-1$ で非零対象から零対象へ移るので複体の同型ではない。さらに任意の余鎖写像 $g:M\to P$ は次数0で群準同型 $\mathbb Z/m\mathbb Z\to\mathbb Z$ を持つ。$m g^0([1]_m)=0$ なので $g^0([1]_m)=0$、従って $g=0$。もし $sg\simeq1_M$ ならコホモロジー上で零射と恒等射が一致するが、$H^0(M)\ne0$ なので矛盾する。よって擬同型は一般にホモトピー同値ではない。

<a id="thm-catb7-03-two-of-three"></a>

<!-- formal-statement-start -->
> **定理（擬同型の2-out-of-3性質）**
>
> アーベル圏の余鎖複体間の合成可能な二射 $f:C\to D$、$g:D\to E$ に対し、$f,g,gf$ のうち二つが擬同型なら残る一つも擬同型である。恒等射も擬同型である。
<!-- formal-statement-end -->

核心は、複体の射を各次数でコホモロジー上の射へ移すと、逆射の計算ができることである。

<!-- proof-start -->
### 証明

[コホモロジーの関手性](../CATB7-01/index.md#thm-catb7-01-cohomology-functor)から、各整数 $n$ に対して $H^n(gf)=H^n(g)H^n(f)$。この三射を順に $F,G,T$ と書く。

$F,G$ が同型なら $T=GF$ の逆は $F^{-1}G^{-1}$ である。$F,T$ が同型なら $G=TF^{-1}$ の逆は $FT^{-1}$。$G,T$ が同型なら $F=G^{-1}T$ の逆は $T^{-1}G$ である。いずれも前後の合成が対応する恒等射になる。恒等射は関手によって恒等射に移る。$n$ は任意なので結論を得る。
<!-- proof-end -->

擬同型かどうかは、写像を一つの複体にまとめて判定することもできる。

<a id="thm-catb7-03-cone-test"></a>

<!-- formal-statement-start -->
> **定理（写像錐による擬同型判定）**
>
> アーベル圏の余鎖写像 $f:C\to D$ は、全整数 $n$ で $H^n(\operatorname{Cone}(f))=0$ となることと同値に擬同型である。
<!-- formal-statement-end -->

見取り図：[写像錐の短完全列](../CATB7-02/index.md#prop-catb7-02-cone-complex)から得られる長完全列で、元の写像が同型であることと、間に挟まる項が消えることを結び付ける。

<!-- proof-start -->
### 証明

[コホモロジー長完全列](../CATB7-02/index.md#thm-catb7-02-long-exact)を写像錐の短完全列に適用する。前講で確認した接続射の符号に従い、$E=\operatorname{Cone}(f)$ とすると

$$
\begin{gathered}
H^n(C)\xrightarrow{H^n(f)}H^n(D)
\xrightarrow{i}H^n(E)\\
\xrightarrow{p}H^{n+1}(C)
\xrightarrow{H^{n+1}(f)}H^{n+1}(D)
\end{gathered}
$$

は完全である。

$f$ が擬同型なら $H^n(f)$ はエピ射だから $i=0$。また $H^{n+1}(f)$ はモノ射だから $\operatorname{im}p=0$、従って $p=0$。中央での完全性より $H^n(E)=\ker p=\operatorname{im}i=0$ となる（部分対象としての等式）。

逆に全次数で $H^n(E)=0$ なら、$H^{n-1}(E)$ から $H^n(C)$ への像は零であり、完全性より $H^n(f)$ の核は零。また $H^n(D)\to H^n(E)$ は零射なので $H^n(f)$ の像は $H^n(D)$ 全体である。アーベル圏ではモノ射かつエピ射なら同型である（[像と余像の比較同型](../CATB1-05/index.md#thm-catb1-05-image-coimage)）。全次数で同型となる。
<!-- proof-end -->

例として次数0だけに整数を持つ複体上の $m$ 倍写像の錐は、次数 $-1,0$ の $\mathbb Z\xrightarrow{m}\mathbb Z$ となる。$m\ge2$ なら次数0のコホモロジーが $\mathbb Z/m\mathbb Z\ne0$ なので擬同型ではない。先の $s:P\to M$ とは異なる写像である点に注意する。

## 4. 分母をそろえるための二つの構成

以降 $K=K(\mathcal A)$ とし、擬同型全体を $S$ と書く。$K$ の射についての等式は余鎖ホモトピー類の等式である。通常の分数のように、左向きの矢印 $s$ を分母にした図式

$$
X\xleftarrow{s}U\xrightarrow{a}Y,\qquad s\in S
$$

で $a s^{-1}$ を表したい。二つの分数を合成するには、中間の対象に入る矢印をそろえる必要がある。また、分母をそろえた後の等式が選択に依存しないようにしなければならない。

<a id="lem-catb7-03-fraction-calculus"></a>

<!-- formal-statement-start -->
> **補題（擬同型の分母調整と消去）**
>
> アーベル圏の余鎖複体のホモトピー圏 $K$ とその擬同型のクラス $S$ について、次が成立する。
>
> **（1）分母調整。** $f:X\to Y$ と $s:Z\to Y$ があり $s\in S$ なら、$p:W\to X$ と $q:W\to Z$ が存在して $p\in S$ かつ

$$
fp=sq
$$

> となる。
>
> **（2）消去。** 平行射 $f,g:X\to Y$ と $s:Y\to Z$ があり、$s\in S$ かつ $sf=sg$ なら、ある $p:W\to X$ が存在して $p\in S$ かつ $fp=gp$ となる。
<!-- formal-statement-end -->

見取り図：（1）は $f$ と $s$ の差を微分に組み込んだ写像錐を1次数戻すことで、差がホモトピーで消えるようにする。（2）は $s$ との合成で消えた差を、コホモロジーが零の錐を経由する射に変換し、その差自体を消す。

<!-- proof-start -->
### 証明

以下では $K$ の射の代表である余鎖写像を同じ文字で書く。複体の双積の射は[双積の射の行列表示](../CATB1-03/index.md#thm-catb1-03-matrix)を使う。添字を省略した式は各次数で成立するものとする。

（1）$u=(f,-s):X\oplus Z\to Y$ と置き、[写像錐](../CATB7-02/index.md#def-catb7-02-cone)と[余鎖複体のシフト](../CATB7-02/index.md#def-catb7-02-shift)から $W=\operatorname{Cone}(u)[-1]$ を作る。具体的に

$$
\begin{gathered}
W^n=Y^{n-1}\oplus X^n\oplus Z^n,\\
d_W^n=
\begin{pmatrix}
-d_Y^{n-1}&-f^n&s^n\\
0&d_X^n&0\\
0&0&d_Z^n
\end{pmatrix}.
\end{gathered}
$$

射影 $p:W\to X$ と $q:W\to Z$ は余鎖写像である。実際、第2、第3行を読むと $p^{n+1}d_W^n=d_X^np^n$ および $q^{n+1}d_W^n=d_Z^nq^n$ を得る。

第1成分への負の射影 $h^n=-\pi_Y^n:W^n\to Y^{n-1}$ について、

$$
d_Y^{n-1}h^n+h^{n+1}d_W^n=f^np^n-s^nq^n.
$$

左辺の第1成分の二項は $-d_Y^{n-1}$ と $+d_Y^{n-1}$ なので相殺する。従って [余鎖ホモトピー](../CATB7-02/index.md#def-catb7-02-cochain-homotopy)の等式を満たし、$fp=sq$ が $K$ で成立する。

$p$ の核に当たる部分複体は $L^n=Y^{n-1}\oplus Z^n$ で、微分は

$$
d_L^n=
\begin{pmatrix}-d_Y^{n-1}&s^n\\0&d_Z^n\end{pmatrix}.
$$

よって $L=\operatorname{Cone}(-s)[-1]$ である。包含は第1・第3成分への挿入で余鎖写像となり、射影 $p$ の核と一致する。各次数で $p$ は双積の射影なのでエピ射である。従って $0\to L\to W\to X\to0$ は各次数で短完全である。$-s$ もコホモロジー上で $-H^n(s)$ という同型を誘導するから、[写像錐による擬同型判定](#thm-catb7-03-cone-test)とシフトのコホモロジーの公式より全次数で $H^n(L)=0$。

[コホモロジー長完全列](../CATB7-02/index.md#thm-catb7-02-long-exact)の部分

$$
0=H^n(L)\to H^n(W)\xrightarrow{H^n(p)}
H^n(X)\to H^{n+1}(L)=0
$$

から $H^n(p)$ は同型となる。

（2）$v=f-g$ と置く。$sv=0$ が $K$ で成立するため、ある $h^n:X^n\to Z^{n-1}$ があり、

$$
s^nv^n=d_Z^{n-1}h^n+h^{n+1}d_X^n
$$

を満たす。$L=\operatorname{Cone}(s)[-1]$ と置く。その微分は

$$
d_L^n=
\begin{pmatrix}-d_Z^{n-1}&-s^n\\0&d_Y^n\end{pmatrix}.
$$

$a^n=(-h^n,v^n)^{\mathsf T}:X^n\to L^n$ と置くと

$$
d_L^na^n=
\binom{d_Z^{n-1}h^n-s^nv^n}{d_Y^nv^n}
=\binom{-h^{n+1}d_X^n}{v^{n+1}d_X^n}
=a^{n+1}d_X^n.
$$

従って $a$ は余鎖写像で、第2成分の射影 $b:L\to Y$ により $ba=v$。判定定理から $L$ のコホモロジーは全て零である。

（1）を $a:X\to L$ と零複体からの擬同型 $0\to L$ に適用すると、擬同型 $p:W\to X$ で $ap=0$ となるものが得られる。よって $vp=bap=0$、すなわち $fp=gp$ が $K$ で成立する。
<!-- proof-end -->

例えば $s:P\to M$ を第3節の剰余射、$f=1_M$ とする。（1）の分母調整は $W=P$、$p=s$、$q=1_P$ だけでも実現できる。重要なのは、任意の $f,s$ に対しても複体を作り直せば調整できる点である。

## 5. roofで射を作る

左向きの擬同型と右向きの射を組にした図式を roof と呼ぶ。同じ分数を表すためには、共通の複体から両方の分母・分子を比較する。

<a id="def-catb7-03-roof"></a>

<!-- formal-statement-start -->
> **定義（roofと共通細分）**
>
> $K=K(\mathcal A)$ において $X$ から $Y$ への roof は図式

$$
X\xleftarrow{s}U\xrightarrow{a}Y,\qquad s\in S
$$

> である。これを $(s,a)$ と書く。二つの roof $(s,a),(t,b)$ が同値であるとは、共通の複体 $V$ からの射 $r:V\to U$、$r':V\to U'$ が存在し、

$$
sr=tr'\in S,\qquad ar=br'
$$

> となることをいう。等式は $K$ における等式である。
<!-- formal-statement-end -->

<!-- definition-example-start: def-catb7-03-roof -->
**定義の確認。** $s:P\to M$ を第3節の擬同型とすると、$M\xleftarrow{s}P\xrightarrow{s}M$ と $M\xleftarrow{1_M}M\xrightarrow{1_M}M$ は同値である。共通の複体を $P$ とし、$r=1_P$、$r'=s$ とすれば分母も分子も $s$ になり、分母は擬同型である。
<!-- definition-example-end -->

roof の分母が擬同型だからといって、任意の圏でこの同値関係や合成が成立するわけではない。前節の補題がそのために必要となる。

<a id="thm-catb7-03-roof-category"></a>

<!-- formal-statement-start -->
> **定理（roofの合成）**
>
> アーベル圏のホモトピー圏 $K$ で、roof の共通細分による関係は同値関係である。同値類を射、元の複体を対象として圏 $L$ が得られる。
>
> 合成は roof $(s,a):X\to Y$ と $(t,b):Y\to Z$ に対し、$ap=tq$ となる $p:W\to U$、$q:W\to V$（$p\in S$）を選んで

$$
[(t,b)]\circ[(s,a)]=[(sp,bq)]
$$

> と定める。恒等射は $[(1_X,1_X)]$ である。
<!-- formal-statement-end -->

見取り図：分母調整で合成を作り、消去で別々に選んだ調整を一致させる。共通細分で比較するため、分子・分母に同じ擬同型を右から掛けても同じ射になる。

<!-- proof-start -->
### 証明

まず[2-out-of-3性質](#thm-catb7-03-two-of-three)より、共通細分の射 $r,r'$ はそれ自身が $S$ に入る。反射性は恒等射による細分、対称性は二つの射を交換することで従う。

推移性を示す。三つの roof の中間対象を $U_1,U_2,U_3$ とする。最初の同値を与える細分を $A$、次を与える細分を $B$ とし、その射を

$$
A\xrightarrow{r_1}U_1,\quad A\xrightarrow{r_2}U_2,
\quad B\xrightarrow{v_2}U_2,\quad B\xrightarrow{v_3}U_3
$$

とする。$r_2,v_2$ は擬同型である。[分母調整と消去](#lem-catb7-03-fraction-calculus)の（1）より $i:T\to A$、$j:T\to B$ があり、$i\in S$ かつ $r_2i=v_2j$。この等式と2-out-of-3性質から $j\in S$ でもある。分母について

$$
s_1r_1i=s_2r_2i=s_2v_2j=s_3v_3j\in S.
$$

分子についても

$$
a_1r_1i=a_2r_2i=a_2v_2j=a_3v_3j.
$$

従って $r_1i,v_3j$ が所望の細分である。

合成が存在するのは分母調整（1）を $a:U\to Y$ と $t:V\to Y$ に適用でき、$sp\in S$ となるからである。

**調整の選択独立性。** もう一組 $p':W'\to U$、$q':W'\to V$ が $ap'=tq'$ を満たすとする。$p,p'$ を（1）で調整して $i:T\to W$、$j:T\to W'$ を取り、$pi=p'j$、$i,j\in S$ とする。すると

$$
tqi=api=ap'j=tq'j.
$$

（2）より $k:T'\to T$ を擬同型として $qik=q'jk$ とできる。二つの合成 roof は

$$
spik=sp'jk,\qquad bqik=bq'jk
$$

を満たし、共通分母は擬同型である。

**代表の選択独立性。** 同値な二つの roof は共通細分による同じ roof へ置き換えられる。そこで、片方を擬同型で細分した場合だけ確認する。

第1の roof を $r:U'\to U$ で細分したとする。$p$ と $r$ を（1）で調整して $i:T\to W$、$j:T\to U'$ を取り、$pi=rj$、$i,j\in S$ とする。すると $(ar)j=tqi$ であり、細分後の合成を $(srj,bqi)$ と選べる。これは $(sp,bq)$ を $i$ で細分した roof である。

第2の roof を $r:V'\to V$ で細分した場合は、$q$ と $r$ を（1）で調整し $i:T\to W$ を擬同型、$j:T\to V'$ として $qi=rj$ とする。$api=trj$ なので合成は $(spi,brj)=(spi,bqi)$ と選べる。これも元の合成の細分である。調整の選択独立性と合わせ、代表をどちらも交換できる。

**結合律。** 三つの roof を $(s,a),(t,b),(u,c)$ とする。まず $ap=tq$、$bi=uj$ を満たす調整を取り、$p:P\to U$、$q:P\to V$、$i:Q\to V$、$j:Q\to R$ とする。$p,i$ は擬同型である。$q$ と $i$ を調整して $k:T\to P$、$l:T\to Q$ を取り、$k\in S$、$qk=il$ とする。すると

$$
bqk=bil=ujl,\qquad apk=tqk=til.
$$

前者は最初の二つの合成 $(sp,bq)$ と第3の roof の調整、後者は第1の roof と後ろ二つの合成 $(ti,cj)$ の調整である。どちらの括り方でも同じ roof $(spk,cjl)$ を得る。$pk$ は擬同型なので有効な調整である。

最後に右側へ恒等 roof を合成する場合は $p=1_U,q=a$、左側から恒等 roof を合成する場合は $p=s,q=1_U$ と選べる。いずれも元の roof に戻る。
<!-- proof-end -->

この合成では、集合の引き戻しのような厳密な等式を複体の段階で要求せず、ホモトピーの意味で十分である。

## 6. 局所化の普遍性

元の圏から roof の圏へは、各射を分母が恒等射の roof にして送れる。これによって全ての擬同型が可逆になるだけでなく、擬同型を可逆にする任意の関手はこの操作を経由できる。

<a id="def-catb7-03-localization"></a>

<!-- formal-statement-start -->
> **定義（圏の局所化）**
>
> 圏 $K$ とその射のクラス $S$ に対する局所化は、圏 $L$ と関手 $Q:K\to L$ の組であって、次の条件を満たすものとする。
>
> 1. 各 $s\in S$ に対し $Q(s)$ は同型である。
> 2. 任意の圏 $\mathcal B$ と、$S$ の全射を同型へ送る関手 $F:K\to\mathcal B$ に対し、$F=\bar F Q$ を満たす関手 $\bar F:L\to\mathcal B$ が一意に存在する。
>
> ここでは対象を変えない局所化モデルの厳密な因子化を用いる。
<!-- formal-statement-end -->

<!-- definition-example-start: def-catb7-03-localization -->
**定義の確認。** 恒等射だけを集めた $S$ なら $L=K,Q=1_K$ が局所化になる。恒等射は同型であり、どの $F$ についても $\bar F1_K=F$ は $\bar F=F$ を意味する。したがって存在と一意性の双方が成り立つ。
<!-- definition-example-end -->

<a id="thm-catb7-03-localization"></a>

<!-- formal-statement-start -->
> **定理（擬同型を逆にする局所化）**
>
> アーベル圏 $\mathcal A$ のホモトピー圏 $K=K(\mathcal A)$ と擬同型全体 $S$ に対し、roof の圏 $L$ と対象上恒等、射上

$$
Q(f)=[(1_X,f)]\qquad(f:X\to Y)
$$

> である関手 $Q:K\to L$ は局所化をなす。
<!-- formal-statement-end -->

見取り図：roof を $Q(a)Q(s)^{-1}$ と読む。任意の関手 $F$ が擬同型を逆にできるなら、同じ読み方で $\bar F$ が決まり、分母調整の等式で合成を検証できる。

<!-- proof-start -->
### 証明

$Q(g)Q(f)$ の調整は $p=1_X,q=f$ と選べるので $Q(gf)$ に一致する。恒等射も恒等 roof に移る。

$s:U\to X$ が擬同型なら $[(s,1_U)]:X\to U$ を逆射候補とする。$Q(s)$ の後にこの候補を合成するには両方の中間射が $s$ なので恒等射で調整でき、$(1_U,1_U)$ を得る。逆順の合成は $(s,s)$ となり、定義例の細分により $(1_X,1_X)$ と同値である。従って逆射である。一般の roof は

$$
[(s,a)]=Q(a)Q(s)^{-1}
$$

と書ける（調整に二つの恒等射を選ぶ）。

任意の $F:K\to\mathcal B$ が $S$ を同型へ送るとする。対象上 $\bar F(X)=F(X)$ とし、射上

$$
\bar F([(s,a)])=F(a)F(s)^{-1}
$$

と定める。共通細分 $r,r'$ によって $sr=tr'$、$ar=br'$ が成立するなら、$r,r'$ も擬同型である。従って

$$
F(a)F(s)^{-1}
=F(ar)F(sr)^{-1}
=F(br')F(tr')^{-1}
=F(b)F(t)^{-1}.
$$

よって代表元に依存しない。合成の調整 $ap=tq$ では $F(t)$ と $F(p)$ が同型なので、

$$
F(t)^{-1}F(a)=F(q)F(p)^{-1}.
$$

この式を代入すると

$$
\begin{aligned}
F(b)F(t)^{-1}F(a)F(s)^{-1}
&=F(b)F(q)F(p)^{-1}F(s)^{-1}\\
&=F(bq)F(sp)^{-1}.
\end{aligned}
$$

これは合成 roof の値と一致する。恒等 roof の値は恒等射であり、$\bar FQ=F$ となる。

一意性は、全ての対象が $Q(X)$ で、全ての射が $Q(a)Q(s)^{-1}$ と書けることから従う。関手は同型の逆射をその像の逆射へ送るため、$\bar F$ の値は上の式に強制される。
<!-- proof-end -->

特に $H^n:K\to\mathcal A$ は擬同型を全て同型へ送るから、局所化の後にもコホモロジーを計算できる。局所化はコホモロジーを捨てる操作ではなく、コホモロジーを変えない射を逆にできるようにする操作である。次講でこの圏を導来圏として扱い、シフトと完全三角形を調べる。

## 7. 演習

### CATB7-03-A01 ホモトピー圏の射

- Level: A

次数0,1に $\mathbb Z\xrightarrow{5}\mathbb Z$ を置いた複体で11倍写像と恒等写像はホモトピー圏で一致するか。16倍写像と恒等写像についても答えよ。

<!-- solution-start -->
[余鎖ホモトピー](../CATB7-02/index.md#def-catb7-02-cochain-homotopy)の条件から、整数 $t$ 倍の $h^1$ を用いると差は両次数で $5t$ 倍になる。他の $h^n$ は零である。11倍と恒等射の差は10倍なので $t=2$、16倍との差は15倍なので $t=3$ とできる。いずれも次数0で $h^1d^0=5t$、次数1で $d^0h^1=5t$、他で零となり、一致する。
<!-- solution-end -->

### CATB7-03-A02 剰余射の判定

- Level: A

次数 $-1,0$ に $\mathbb Z\xrightarrow{4}\mathbb Z$ を置く複体 $P$ から次数0だけに $\mathbb Z/4\mathbb Z$ を持つ $M$ へ、次数0で剰余射となる写像 $s$ を考える。擬同型か判定せよ。

<!-- solution-start -->
$s^0d^{-1}(x)=[4x]_4=0$ なので余鎖写像である。$4x=0$ なら $x=0$、従って $H^{-1}(P)=0$。次数0の微分は零で、その前の微分の像は $4\mathbb Z$ なので $H^0(P)=\mathbb Z/4\mathbb Z$。$M$ のコホモロジーは次数0で $M^0$、他で零である。誘導射は次数0で $[x]_4\mapsto[x]_4$、他で零対象の恒等射である。[擬同型](#def-catb7-03-quasi-isomorphism)の条件を満たす。
<!-- solution-end -->

### CATB7-03-A03 合成から逆算する

- Level: A

$f:C\to D$ と $gf:C\to E$ が擬同型であるとする。$H^n(g)$ の逆射を具体的に式で与えよ。

<!-- solution-start -->
$F=H^n(f)$、$G=H^n(g)$、$T=H^n(gf)$ と置く。[2-out-of-3性質](#thm-catb7-03-two-of-three)の計算を使うと $G=TF^{-1}$。候補 $FT^{-1}:H^n(E)\to H^n(D)$ は

$$
GFT^{-1}=TT^{-1}=1_{H^n(E)},\qquad
FT^{-1}G=FF^{-1}=1_{H^n(D)}
$$

を満たす。従って逆射は $H^n(f)H^n(gf)^{-1}$ である。
<!-- solution-end -->

### CATB7-03-A04 roofの恒等射

- Level: A

擬同型 $s:U\to X$ に対して $(s,s)$ と $(1_X,1_X)$ の同値を示せ。

<!-- solution-start -->
[roofと共通細分](#def-catb7-03-roof)の定義に従い共通の複体を $U$、細分の射を $1_U$ と $s$ とする。分母は $s1_U=1_Xs=s\in S$、分子も $s1_U=1_Xs=s$。両条件が成立するので同値である。
<!-- solution-end -->

### CATB7-03-B01 擬同型とホモトピー同値の差

- Level: B

次数0,1,2の複体 $E=(\mathbb Z\xrightarrow{3}\mathbb Z\xrightarrow{p}\mathbb Z/3\mathbb Z)$ について、零複体への写像は擬同型だがホモトピー同値ではないことを示せ。

<!-- solution-start -->
$p(3x)=0$ で複体となる。次数0の核は零、次数1の核 $3\mathbb Z$ は前の微分の像に等しく、次数2への像は全体である。よって全次数でコホモロジーが零となり、零複体への射は[擬同型](#def-catb7-03-quasi-isomorphism)である。

逆射候補は零複体からの零射しかない。ホモトピー同値なら $1_E\simeq0$ なので [可縮余鎖複体](../CATB7-02/index.md#def-catb7-02-contractible)の条件が成立する。次数2では $ps^2=1$ が必要である。しかし $s^2:\mathbb Z/3\mathbb Z\to\mathbb Z$ について $3s^2([1]_3)=0$ だから $s^2([1]_3)=0$。従って $ps^2([1]_3)=0\ne[1]_3$。矛盾する。完全性には剰余射を分裂させる条件が含まれない。
<!-- solution-end -->

### CATB7-03-B02 錐での判定

- Level: B

次数0のみの複体 $\mathbb Z^2$ 上の写像 $f(x,y)=(x,2y)$ は擬同型か。写像錐から判定せよ。

<!-- solution-start -->
[写像錐](../CATB7-02/index.md#def-catb7-02-cone)の定義により非零次数は $-1,0$ で、微分は $f$ そのものである。$f(x,y)=(0,0)$ なら $x=0$ と $2y=0$、従って核は零。像は $\mathbb Z\oplus2\mathbb Z$ なので、

$$
H^{-1}=0,\qquad
H^0=\mathbb Z^2/(\mathbb Z\oplus2\mathbb Z)
\cong\mathbb Z/2\mathbb Z.
$$

同型は $(x,y)$ の類を $[y]_2$ へ送るもので、全射かつ核が零である。従って[写像錐による擬同型判定](#thm-catb7-03-cone-test)から擬同型ではない。
<!-- solution-end -->

### CATB7-03-B03 roofの分母調整を具体化する

- Level: B

次数0の整数複体 $X$ と次数0の剰余群複体 $M=\mathbb Z/3\mathbb Z$ の間の剰余射を $f:X\to M$ とする。$P=(\mathbb Z\xrightarrow{3}\mathbb Z)$ を次数 $-1,0$ に置き、擬同型 $s:P\to M$ を剰余射とする。$fp=sq$ を満たす擬同型 $p:W\to X$ と射 $q:W\to P$ を一つ構成せよ。

<!-- solution-start -->
$W=X$、$p=1_X$、$q^0=1_{\mathbb Z}$ とし他の成分を零とする。$q$ の余鎖写像条件は次数 $-1$ で $d_P^{-1}q^{-1}=3\cdot0=0=q^0d_W^{-1}$、次数0で両辺が零、他も零なので成立する。$sq$ は次数0で $[x]_3$、他で零だから $sq=f=fp$ である。$p$ は恒等射なので擬同型である。この例では[分母調整](#lem-catb7-03-fraction-calculus)を錐を使わずに直接実現できた。
<!-- solution-end -->

### CATB7-03-B04 局所化での値

- Level: B

第3節の $s:P\to M$ を用い、roof $M\xleftarrow{s}P\xrightarrow{a}P$ の右側を $a=2\cdot1_P$ とする。局所化後の次数0のコホモロジー上の射を求めよ。

<!-- solution-start -->
[擬同型を逆にする局所化](#thm-catb7-03-localization)により、コホモロジー関手の因子化で roof の値は $H^0(a)H^0(s)^{-1}$。$H^0(P)=\mathbb Z/m\mathbb Z$、$H^0(M)=\mathbb Z/m\mathbb Z$ で $H^0(s)$ は $[x]_m\mapsto[x]_m$ となる。従って逆射も恒等射であり、求める射は

$$
[x]_m\longmapsto[2x]_m.
$$

例えば $m=2$ なら零射で、$m=3$ なら逆射も2倍である（$2\cdot2\equiv1\bmod3$）。局所化で分母を逆にしても分子が自動的に可逆になるわけではない。
<!-- solution-end -->

### CATB7-03-C01 異なるroofの等式判定

- Level: C

$K=K(\mathcal A)$ で $f,g:X\to Y$ とする。局所化後に $Q(f)=Q(g)$ となることと、ある擬同型 $p:W\to X$ により $fp=gp$ が $K$ で成立することが同値であると示せ。さらに $s:Y\to Z$ が擬同型で $sf=sg$ の場合にこの条件が成立することを示せ。

<!-- solution-start -->
[擬同型を逆にする局所化](#thm-catb7-03-localization)の定義で $Q(f)=[(1_X,f)]$、$Q(g)=[(1_X,g)]$ である。両者が等しいなら[roofの共通細分](#def-catb7-03-roof)によりある $r,r':W\to X$ が存在し

$$
1_Xr=1_Xr'\in S,\qquad fr=gr'
$$

となる。第1式から $r=r'=p\in S$、第2式から $fp=gp$ が得られる。逆にそのような $p$ があれば両方の細分射を $p$ と選べば共通分母と分子が一致し、roof は同値になる。

最後の仮定では[分母調整と消去](#lem-catb7-03-fraction-calculus)の（2）をそのまま使える。そこで差 $v=f-g$ は $\operatorname{Cone}(s)[-1]$ を経由した。これはコホモロジー零の複体なので、擬同型 $p:W\to X$ により $vp=0$ とできる。従って $fp=gp$ であり、前半の必要十分条件によって $Q(f)=Q(g)$ が従う。
<!-- solution-end -->

## 8. まとめ

複体の同型ならホモトピー同値であり、ホモトピー同値なら擬同型である。逆向きはいずれも一般には成り立たない。前者は非零な可縮複体と零複体、後者は剰余群への擬同型を思い出せばよい。写像錐のコホモロジーによる判定を使うと、擬同型の分母調整と消去を構成でき、roof の同値類の圏と局所化の普遍性が得られる。
