# CAT2-02 終対象と積

## 1. 二つの対象を一度に扱う

前講では、[図式の極限](../CAT2-01/index.md#def-cat2-01-limit)を、図式への錐の中で全ての錐を一意に受けるものとして定めた。空の図式なら[終対象](../CAT1-04/index.md#def-cat1-04-initial-terminal)が現れ、二対象の離散図式なら集合の直積 $A\times B$ が現れる。しかし、一般の圏では対象を「元の組」として作れるとは限らない。そこで、積を元でなく**射に対する一意性**で特徴付ける。

目標は次の四つである。

1. 終対象・二対象の積を、空図式・二対象離散図式の極限として判定する。
2. 積の射影から任意の二射の組を束ね、存在と一意性を証明する。
3. 一つの対象を二回並べる射、積への射、積の結合の入れ替えを普遍性だけから構成する。
4. 空の場合を含む全ての**有限**離散図式の極限が存在する条件を確定する。

## 2. 終対象は空個の積

[終対象の定義](../CAT1-04/index.md#def-cat1-04-initial-terminal)を思い出す。$T$ が終対象とは、どの $X\in\mathcal C$ に対しても $X\to T$ がちょうど一本あることをいう。この一意な射を $!_X:X\to T$ と書く。例えば $X\xrightarrow{f}Y$ なら $!_Yf$ と $!_X$ はともに $X\to T$ なので

$$
!_Y\circ f=!_X.
$$

この式には $f$ の単射性・全射性などの仮定はない。終対象が二つあっても[ただ一つの同型で結ばれる](../CAT1-04/index.md#prop-cat1-04-initial-terminal-unique)ので、「終対象を一つ選ぶ」ことと、それが文字どおり唯一の対象であることは違う。

空の添字圏を $\varnothing$ と書こう。空図式 $D:\varnothing\to\mathcal C$ に対して、任意の対象 $X$ からの[図式への錐](../CAT2-01/index.md#def-cat2-01-cone)は脚のない空族ただ一つである。従って次の対応が成り立つ。

<a id="prop-cat2-02-empty-product"></a>

<!-- formal-statement-start -->
> **命題（空図式の極限と終対象）**
> 任意の圏 $\mathcal C$ において、対象 $T$ が空図式 $\varnothing\to\mathcal C$ の極限であることと、$T$ が $\mathcal C$ の終対象であることは同値である。存在するとき、これを**空個の積**と呼ぶ。
<!-- formal-statement-end -->

### 証明の見取り図

空図式への錐の脚保存条件には検査する脚がない。だから極限の一意な媒介射は、ちょうど終対象への一意な射になる。

<!-- proof-start -->
### 証明

$T$ を空図式の極限とし、任意の $X$ を取る。$X$ の空錐は一つなので、[極限の普遍性](../CAT2-01/index.md#def-cat2-01-limit)からそれを媒介する $h:X\to T$ がただ一つある。脚の整合等式は空だから、これは $\operatorname{Hom}_{\mathcal C}(X,T)$ に射がちょうど一つあるという条件そのものである。

逆に $T$ が終対象なら任意の $X$ に一意な $!_X$ があり、唯一の空錐は $!_X$ を経由する。条件を満たす別の射も終対象の一意性により $!_X$ と一致する。従って $T$ は空図式の極限である。$\square$
<!-- proof-end -->

**直接例と非例。** $\mathbf{Set}$ の一元集合 $\{*\}$ には空集合を含む全ての集合から唯一の写像がある。従って空個の積になる。他方、二対象 $a,b$ と恒等射のみの離散圏には終対象がない。$a$ から $b$ への射がないため、どちらも「全ての対象からの射が存在する」という条件を満たさない。空図式にも極限はない。

## 3. 積の普遍性：二つの脚を一つに束ねる

$A,B\in\mathcal C$ を固定する。$P$ から $A,B$ への二射 $p_A:P\to A$、$p_B:P\to B$ を**射影**と呼び、任意の $f:X\to A$、$g:X\to B$ が、ただ一つの $h:X\to P$ により同時に $f=p_Ah$、$g=p_Bh$ と表せるようにしたい。この「二本の射を一つへ束ねる」性質が積である。

<a id="def-cat2-02-binary-product"></a>

<!-- formal-statement-start -->
> **定義（圏論の二項積）**
> 圏 $\mathcal C$ の対象 $A,B$ の二項積とは、対象 $P$ と射影 $p_A:P\to A$、$p_B:P\to B$ の組であって、任意の対象 $X$ と任意の二射 $f:X\to A$、$g:X\to B$ に対し、ただ一つの射 $h:X\to P$ が存在して

$$
p_A\circ h=f,\qquad p_B\circ h=g
$$

> を満たすものをいう。選んだ積を $A\times B$、射影を $\pi_A,\pi_B$ と書き、媒介射 $h$ を $\langle f,g\rangle$ と記す。積は常に存在するとは限らない。
<!-- formal-statement-end -->

この定義を前講の言葉で読むと、二対象離散圏 $\{0,1\}$ の図式 $0\mapsto A,1\mapsto B$ に対する[図式への錐](../CAT2-01/index.md#def-cat2-01-cone)が二射の組 $(f,g)$、極限錐が $(P,p_A,p_B)$ である。そのため二項積とは、二対象離散図式の[極限](../CAT2-01/index.md#def-cat2-01-limit)にほかならない。値域 $\mathcal C$ が小さい必要も、[局所小](../CAT1-02/index.md#def-cat1-02-size)である必要もない。局所小性はHomを集合値関手として扱う場面で初めて必要になる。

<!-- definition-example-start: def-cat2-02-binary-product -->
**定義の確認**

**例：集合の直積。** 集合 $A,B$ に対し

$$
P=\{(a,b)\mid a\in A,\ b\in B\}
$$

とし、$\pi_A(a,b)=a$、$\pi_B(a,b)=b$ と置く。任意の集合 $X$ と写像 $f:X\to A,g:X\to B$ に対して

$$
h(x)=(f(x),g(x))
$$

は $X\to P$ として定まり、$\pi_Ah=f$、$\pi_Bh=g$ を満たす。別の $k:X\to P$ が両条件を満たすなら、どの $x\in X$ でも $k(x)$ の第1・第2成分がそれぞれ $f(x),g(x)$ なので $k(x)=h(x)$。空集合 $X$ に対しても唯一の空写像があり、同じ議論が成り立つ。$A$ または $B$ が空のとき $P$ も空となり、その場合には $f,g$ が同時に存在する $X$ は空集合だけである。全称条件はこの場合も正しく満たされる。
<!-- definition-example-end -->

### 射の組の三つの計算規則

媒介射の**存在**と**一意性**から、計算で繰り返し使う規則が得られる。$\pi_A,\pi_B$ は以下 $P=A\times B$ の射影とする。

<a id="prop-cat2-02-pairing-laws"></a>

<!-- formal-statement-start -->
> **命題（組の射の基本則）**
> 圏 $\mathcal C$ に $A,B$ の積 $(P,\pi_A,\pi_B)$ が存在するとする。任意の $f:X\to A$、$g:X\to B$、$u:Y\to X$ と $k:X\to P$ について

$$
\begin{aligned}
\pi_A\langle f,g\rangle&=f,&\pi_B\langle f,g\rangle&=g,\\
\langle\pi_Ak,\pi_Bk\rangle&=k,&
\langle f,g\rangle u&=\langle fu,gu\rangle
\end{aligned}
$$

> が成り立つ。従って二射 $k,\ell:X\to P$ が等しいことと、$\pi_Ak=\pi_A\ell$ かつ $\pi_Bk=\pi_B\ell$ は同値である。
<!-- formal-statement-end -->

### 証明の見取り図

最初の二式は、積へ媒介する射が満たすべき二つの等式。残りは、左右で射影との合成が一致することを示し、普遍性の一意性を適用する。

<!-- proof-start -->
### 証明

最初の二式は[積の定義](#def-cat2-02-binary-product)で要求した等式そのもの。$k:X\to P$ の二つの射影合成を $\pi_Ak,\pi_Bk$ と置くと、$k$ 自身がこの二射を媒介する。よって一意性から $\langle\pi_Ak,\pi_Bk\rangle=k$。

$\langle f,g\rangle u:Y\to P$ について、

$$
\pi_A(\langle f,g\rangle u)=(\pi_A\langle f,g\rangle)u=fu
$$

であり、$B$ 側も $\pi_B(\langle f,g\rangle u)=gu$。$\langle fu,gu\rangle$ も同じ二条件を満たすので一意性により等しい。最後に $\pi_Ak=\pi_A\ell,\pi_Bk=\pi_B\ell$ なら

$$
k=\langle\pi_Ak,\pi_Bk\rangle
=\langle\pi_A\ell,\pi_B\ell\rangle=\ell.
$$

逆方向は等しい射への合成で保たれる。$\square$
<!-- proof-end -->

この最終条件は「**射影が二本そろって射を識別する**」という意味であり、射影が各々[モノ射](../CAT1-03/index.md#def-cat1-03-monomorphism)だという意味ではない。例えば集合の $A\times B\to A$ は $B$ に二つ以上元があると単射でなく、モノ射ではない。

## 4. 対角射と積への射

ある対象 $A$ を二回選んだ積 $A\times A$ へ、$A$ の元を形式的に二回コピーする射を作る。集合では $a\mapsto(a,a)$ だが、一般の圏では元を使えない。代わりに二つの恒等射 $1_A:A\to A$ を束ねる。

<a id="def-cat2-02-diagonal"></a>

<!-- formal-statement-start -->
> **定義（対角射）**
> 圏 $\mathcal C$ の対象 $A$ に積 $(A\times A,\pi_1,\pi_2)$ が存在するとき、**対角射** $\delta_A:A\to A\times A$ を

$$
\delta_A:=\langle1_A,1_A\rangle
$$

> で定める。すなわち $\pi_1\delta_A=1_A=\pi_2\delta_A$ となるただ一つの射である。
<!-- formal-statement-end -->

<!-- definition-example-start: def-cat2-02-diagonal -->
**定義の確認**

$\mathbf{Set}$ で $A=\{0,1\}$ とする。$\delta_A(0)=(0,0)$、$\delta_A(1)=(1,1)$ と置けば、両射影との合成は各元をその元へ戻す恒等写像である。仮に別の $d:A\to A\times A$ が両射影に関して同じ条件を満たすなら、$d(a)$ の両成分はともに $a$ でなければならず、$d=\delta_A$。従って射の**存在・一意性**を共に確かめた。
<!-- definition-example-end -->

<a id="prop-cat2-02-diagonal-equality"></a>

<!-- formal-statement-start -->
> **命題（対角射による等式の判定）**
> 圏 $\mathcal C$ に $A\times A$ が存在するとする。射 $f,g:X\to A$ について、$f=g$ であることと、ある $h:X\to A$ が存在して次の等式を満たすことは同値である。

$$
\langle f,g\rangle=\delta_Ah.
$$

> このとき $h=f=g$ に限られる。さらに $\delta_A$ はモノ射である。
<!-- formal-statement-end -->

### 証明の見取り図

対角射へ合成したものの両射影は同じ $h$ になる。逆に $f=g$ なら組の射の一意性で等号を得る。モノ射性は $\pi_1\delta_A=1_A$ で左から射を打ち消せるためである。

<!-- proof-start -->
### 証明

$\langle f,g\rangle=\delta_Ah$ とすると $f=\pi_1\langle f,g\rangle=\pi_1\delta_Ah=h$、同じく $g=\pi_2\delta_Ah=h$ だから $f=g=h$。逆に $f=g$ なら[組の射の前合成則](#prop-cat2-02-pairing-laws)を $u=f:X\to A$ に適用して

$$
\delta_Af=\langle1_A,1_A\rangle f
=\langle1_Af,1_Af\rangle=\langle f,f\rangle=\langle f,g\rangle.
$$

最後に $u,v:Y\to A$ が $\delta_Au=\delta_Av$ を満たすなら、$\pi_1$ を前から合成して

$$
u=(\pi_1\delta_A)u=(\pi_1\delta_A)v=v.
$$

これは[モノ射の左消去条件](../CAT1-03/index.md#def-cat1-03-monomorphism)である。$\square$
<!-- proof-end -->

次は積をとる操作を射へ拡張する。$f:A\to A'$、$g:B\to B'$ とし、$A\times B$ および $A'\times B'$ が存在するとき、始域の射影に $f,g$ を合成すれば、終域の積の二成分へ送る射ができる。

<a id="prop-cat2-02-product-map"></a>

<!-- formal-statement-start -->
> **命題（積への射とその合成則）**
> 圏 $\mathcal C$ に対象 $A,B,A',B'$ の二項積 $A\times B$、$A'\times B'$ が選ばれているとする。射 $f:A\to A'$、$g:B\to B'$ に対し

$$
f\times g:=\langle f\pi_A,g\pi_B\rangle:A\times B\to A'\times B'
$$

> と定める。さらに射 $f':A'\to A''$、$g':B'\to B''$ が与えられ、二項積 $A''\times B''$ も選ばれているなら

$$
1_A\times1_B=1_{A\times B},\qquad
(f'\times g')(f\times g)=(f'f)\times(g'g)
$$

> が成り立つ。また、任意の射 $u:U\to V$ について二項積 $U\times U$、$V\times V$ が選ばれているなら

$$
(u\times u)\delta_U=\delta_Vu
$$

> である。
<!-- formal-statement-end -->

### 証明の見取り図

全ての等号を、終域の積の二本の射影と合成して確かめる。対角射の式は「先に複製してから $u$ を二回作用」しても「先に $u$ を作用してから複製」しても同じことを表す。

<!-- proof-start -->
### 証明

[積の定義](#def-cat2-02-binary-product)より $f\times g$ は存在・一意で、その終域の射影 $\pi_{A'},\pi_{B'}$ に対して

$$
\pi_{A'}(f\times g)=f\pi_A,\qquad
\pi_{B'}(f\times g)=g\pi_B
$$

となる。$A'=A,B'=B$ とし、$f=1_A,g=1_B$ を代入すれば両成分は $\pi_A,\pi_B$ で、$1_{A\times B}$ も同じ条件を満たすので等しい。合成については、終域 $A''\times B''$ の第1射影を左から合成すると

$$
\pi_{A''}(f'\times g')(f\times g)
=f'\pi_{A'}(f\times g)=f'f\pi_A.
$$

第2射影でも $g'g\pi_B$ を得る。これは $((f'f)\times(g'g))$ の二成分と一致するので、[組の射の一意性](#prop-cat2-02-pairing-laws)が等号を与える。最後に任意の $u:U\to V$ を取り、$V\times V$ の射影を $q_1,q_2$、$U\times U$ の射影を $p_1,p_2$ とする。$i=1,2$ のそれぞれについて

$$
q_i(u\times u)\delta_U=up_i\delta_U=u1_U=u,
\qquad q_i\delta_Vu=1_Vu=u.
$$

二射 $(u\times u)\delta_U,\delta_Vu:U\to V\times V$ の両射影が一致するので、再び[組の射の一意性](#prop-cat2-02-pairing-laws)から $(u\times u)\delta_U=\delta_Vu$。$\square$
<!-- proof-end -->

## 5. 有限個の積と括弧付け

二項積は対象を二つずつ結合するが、三対象の積を $(A\times B)\times C$ と $A\times(B\times C)$ のどちらで作るかは選択による。まず**有限添字集合** $I$ に対し、対象の族 $(A_i)_{i\in I}$ から任意の $X$ に射 $f_i:X\to A_i$ が与えられたとき、それらを全て一意に束ねる対象を考える。$I$ が空なら第2節、一元ならその対象自体、二元なら第3節になる。

<a id="def-cat2-02-finite-product"></a>

<!-- formal-statement-start -->
> **定義（有限積）**
> 圏 $\mathcal C$、有限集合 $I$、対象族 $(A_i)_{i\in I}$ に対し、**有限積**は対象 $P$ と射影 $p_i:P\to A_i$（$i\in I$）であって、任意の対象 $X$ と射族 $(f_i:X\to A_i)_{i\in I}$ に対してただ一つの $h:X\to P$ が存在し、全ての $i\in I$ について $p_ih=f_i$ を満たすものをいう。$I=\varnothing$ も含める。
<!-- formal-statement-end -->

<!-- definition-example-start: def-cat2-02-finite-product -->
**定義の確認**

**例：三元の添字集合。** $\mathbf{Set}$ で $I=\{1,2,3\}$ とし $P=A_1\times A_2\times A_3$ を三つ組の集合とする。$p_i(a_1,a_2,a_3)=a_i$ と置く。任意の $X$ と写像 $f_i:X\to A_i$ から $h(x)=(f_1(x),f_2(x),f_3(x))$ が定まり、各 $p_i h=f_i$。同条件を満たす $k$ は各 $x$ の三成分を全て固定されるので $k=h$。$X=\varnothing$ でも一意な空写像が条件を満たす。積の結合順序を集合の等号として決める必要はない。
<!-- definition-example-end -->

<a id="thm-cat2-02-finite-products"></a>

<!-- formal-statement-start -->
> **定理（有限積の存在判定）**
> 圏 $\mathcal C$ について次は同値である。
>
> 1. 全ての有限集合 $I$ と全ての対象族 $(A_i)_{i\in I}$ に有限積が存在する（空集合を含む）。
> 2. $\mathcal C$ に終対象が存在し、任意の二対象 $A,B$ に二項積が存在する。
>
> この条件の下、有限積は終対象から始めて二項積を繰り返しとることで構成でき、同じ族の二つの有限積は全射影を保つ一意な同型で結ばれる。
<!-- formal-statement-end -->

### 証明の見取り図

逆向きが要点である。空族は終対象、一元族は対象自身を使う。$n$ 個の積が得られたら、最後の一対象を二項積で付け足し、媒介射の一意性を二段に分けて証明する。

<!-- proof-start -->
### 証明

1から2は、[空図式の極限と終対象](#prop-cat2-02-empty-product)を $I=\varnothing$ に適用し、[二項積の定義](#def-cat2-02-binary-product)を $I=\{1,2\}$ に適用すればよい。

2から1を示す。有限集合 $I$ の元を $i_1,\ldots,i_n$ と列挙する。$n=0$ では仮定した終対象 $T$ を選べば、脚のない錐の一意な媒介射がある。$n=1$ では $P_1=A_{i_1}$、$p_1=1_{A_{i_1}}$ を選ぶ。任意の $f_1:X\to A_{i_1}$ を媒介する射 $h$ は $1h=f_1$ により $h=f_1$ と一意である。

$n\ge1$ で $(P_n,p_1,\ldots,p_n)$ が最初の $n$ 対象の積と仮定する。存在を仮定した二項積 $P_{n+1}:=P_n\times A_{i_{n+1}}$ の射影を $q:P_{n+1}\to P_n$、$r:P_{n+1}\to A_{i_{n+1}}$ とする。新たな族の射影は $p_jq$（$1\le j\le n$）と $r$ である。

任意の $f_j:X\to A_{i_j}$（$1\le j\le n+1$）を取る。帰納法の仮定からただ一つの $u:X\to P_n$ が $p_ju=f_j$（$j\le n$）を満たす。[二項積の普遍性](#def-cat2-02-binary-product)からただ一つの $h:=\langle u,f_{n+1}\rangle:X\to P_{n+1}$ が $qh=u$、$rh=f_{n+1}$ を満たす。従って

$$
(p_jq)h=p_j(qh)=p_ju=f_j\quad(1\le j\le n),
\qquad rh=f_{n+1}.
$$

もし $h':X\to P_{n+1}$ が同条件を満たすなら $p_j(qh')=f_j$ の全てから帰納法の一意性により $qh'=u$。また $rh'=f_{n+1}$。二項積の一意性を適用して $h'=\langle u,f_{n+1}\rangle=h$ となる。よって有限積が帰納的に得られる。

最後に同じ有限族の積を $(P,p_i),(Q,q_i)$ とする。$Q$ の普遍性から $u:P\to Q$、$P$ の普遍性から $v:Q\to P$ があり、$q_iu=p_i$、$p_iv=q_i$ を満たす。すると全ての $i$ で

$$
p_i(vu)=(p_iv)u=q_iu=p_i=p_i1_P.
$$

[有限積の普遍性](#def-cat2-02-finite-product)から $vu=1_P$（$I=\varnothing$ の場合も空の条件に対する射の一意性を使う）。同様に $uv=1_Q$。$u$ は全射影を保つ唯一の同型となる。$\square$
<!-- proof-end -->

**括弧付けと入れ替え。** 上の証明により $(A\times B)\times C$ と $A\times(B\times C)$ は、どちらも三対象 $A,B,C$ の積である。前者の三つの射影を順に書くと

$$
\pi_A\pi_{A\times B},\qquad\pi_B\pi_{A\times B},\qquad\pi_C,
$$

後者では

$$
\pi_A,\qquad\pi_B\pi_{B\times C},\qquad\pi_C\pi_{B\times C}
$$

となる。それぞれへの媒介射を二回作れば三本の脚を一意に束ねる。ゆえに[有限積の存在判定](#thm-cat2-02-finite-products)により、これらは三成分を保つ**一意な同型**で結ばれる。

また $A\times B$ と $B\times A$ には、$\langle\pi_B,\pi_A\rangle$ と逆向きの組の射がある。[組の射の基本則](#prop-cat2-02-pairing-laws)により、合成の両射影が恒等射の両射影と一致するため互いに逆射になる。ただし、いずれも文字どおり対象が等しいとは主張しない。

**境界条件。** 定理で必要なのは「二項積が**全ての組**にある」ことで、ある一組だけにあることではない。また、有限積の存在から無限添字族の積の存在は導けない。無限図式の一般の構成は後講で扱う。

## 6. 順序圏で「存在しない」を見抜く

[半順序集合を圏とみなす方法](../CAT1-02/index.md#prop-cat1-02-order-category)では $x\to y$ があるのは $x\le y$ のときだけで、存在すれば射は一意である。従って $p\to a,p\to b$ が存在することは $p$ が $a,b$ の**共通下界**であることを意味する。任意の共通下界 $x$ が一意に $p$ を経由する条件は $x\le p$ だから、積は**最大下界**（存在すれば）になる。

<a id="prop-cat2-02-poset-meet"></a>

<!-- formal-statement-start -->
> **命題（半順序圏の積）**
> 半順序集合 $(P,\le)$ を圏とみなす。$a,b\in P$ の二項積が存在することと、$a,b$ に最大下界 $a\wedge b$ が存在することは同値であり、積対象は $a\wedge b$ となる。また終対象が存在することと、$P$ が最大元を持つことは同値である。
<!-- formal-statement-end -->

### 証明の見取り図

射の存在を順序 $\le$ へ翻訳する。媒介射の一意性は半順序圏では「同じ向きの射が二本存在しない」ため自動的に満たされるが、**射の存在**は別途全称条件で確認する。

<!-- proof-start -->
### 証明

積 $(p,p\to a,p\to b)$ があれば $p\le a,b$。任意の共通下界 $x\le a,b$ について、二射 $x\to a,b$ を[積の普遍性](#def-cat2-02-binary-product)へ入れると射 $x\to p$ が存在し、$x\le p$。従って $p$ は最大下界である。逆に最大下界 $p$ があれば $p\le a,b$ なので射影があり、共通下界 $x$ について $x\le p$ から媒介射 $x\to p$ が存在する。射は高々一本なので媒介射は一意である。

終対象 $t$ なら各 $x$ から $t$ へ射が存在し $x\le t$。逆に最大元 $t$ があれば全ての $x$ に射 $x\to t$ が存在し、半順序圏なので一意である。$\square$
<!-- proof-end -->

**直接例。** $P=\{0,a,b,1\}$、$0<a<1$、$0<b<1$、$a,b$ は比較不能とする。この圏の終対象は $1$、$a,b$ の積は $0$。$a$ の共通下界ではない元 $a$ から $0$ への射は不要であり、**二つの脚を持つ頂点にだけ**媒介射を要求する。$P'=\{a,b,1\}$ では終対象 $1$ があるが、$a,b$ に共通下界がないため積は存在しない。従って終対象だけでは全有限積の存在は保証されない。

## 7. 演習：射影の式で組み立て、存在条件を検査する

### CAT2-02-A01 終対象への射と前合成

- Level: A

任意の圏 $\mathcal C$ に終対象 $T$ があり、$f:X\to Y$ がある。$!_Yf=!_X$ を示せ。$X$ が始対象だという仮定は必要か。

<!-- solution-start -->
**詳細解答。** [終対象の定義](../CAT1-04/index.md#def-cat1-04-initial-terminal)から $X\to T$ と $Y\to T$ はそれぞれちょうど一本ある。$!_Yf$ は $X\to T$ であり、$!_X$ も同じ型なので、$X\to T$ の一意性から等しい。$X$ が始対象であることは一切使わない。実際 $\mathbf{Set}$ で $X=\{0,1\}$ は始対象ではないが、この等式は任意の写像に成立する。
<!-- solution-end -->

### CAT2-02-A02 集合で組の射を計算する

- Level: A

$X=\{0,1\}$、$A=\{a,b\}$、$B=\{c,d\}$ とし、$f(0)=a,f(1)=b$、$g(0)=d,g(1)=d$ とする。$\langle f,g\rangle$ と、両射影との合成を元ごとに書け。

<!-- solution-start -->
**詳細解答。** [集合の直積の定義例](#def-cat2-02-binary-product)から $\langle f,g\rangle(0)=(a,d)$、$\langle f,g\rangle(1)=(b,d)$。第1射影との合成は $0\mapsto a,1\mapsto b$ で $f$ に等しく、第2射影との合成は両元を $d$ へ送るので $g$ に等しい。仮に $h$ も両条件を満たせば、$h(0)$ の二成分は $(a,d)$、$h(1)$ の二成分は $(b,d)$ に固定され、$h=\langle f,g\rangle$ である。
<!-- solution-end -->

### CAT2-02-A03 二射の等号を射影で確かめる

- Level: A

任意の圏で積 $P=A\times B$ があり、$k,\ell:X\to P$ が $\pi_Ak=\pi_A\ell$、$\pi_Bk=\pi_B\ell$ を満たすとする。$k=\ell$ を積の普遍性から示せ。射影がモノ射であるという仮定を使わないこと。

<!-- solution-start -->
**詳細解答。** $f:=\pi_Ak=\pi_A\ell$、$g:=\pi_Bk=\pi_B\ell$ と置く。$k,\ell$ はどちらも $p_Ah=f,p_Bh=g$ の二等式を満たす $X\to P$ の射である。[積の一意性](#def-cat2-02-binary-product)よりそのような射はただ一つだから $k=\ell$。射影のモノ射性は使わない。例えば $\mathbf{Set}$ で $|B|\ge2$ のとき $\pi_A$ は一般に単射でないので、モノ射性に置き換えるのは誤り。
<!-- solution-end -->

### CAT2-02-A04 対角射の具体的な像

- Level: A

$A=\{0,1,2\}$ として、$\delta_A:A\to A\times A$ の像を列挙せよ。写像 $h:A\to A\times A$ で $\pi_1h=1_A$、$\pi_2h=1_A$ を満たすものが一意であることを確認せよ。

<!-- solution-start -->
**詳細解答。** 像は $\{(0,0),(1,1),(2,2)\}$ である。$\pi_1h(a)=a$ より $h(a)$ の第1成分は $a$、$\pi_2h(a)=a$ より第2成分も $a$。したがって各 $a$ について $h(a)=(a,a)$ となり、$h=\delta_A$。この式で定めた写像は両射影条件を実際に満たすので、存在と一意性が確認できた。
<!-- solution-end -->

### CAT2-02-A05 順序圏で積を判定する

- Level: A

全順序集合 $0<1<2$ を圏とみなす。終対象と $1,2$ の積を決め、積の射影と任意の共通下界からの媒介射を指定せよ。

<!-- solution-start -->
**詳細解答。** 全ての $x$ に $x\le2$ が成り立つので、終対象は $2$。$1,2$ の共通下界は $0,1$ で、その最大元は $1$。従って[半順序圏の積の命題](#prop-cat2-02-poset-meet)から積は $1$。射影は $1\to1$ の恒等射と $1\to2$ の順序射。共通下界 $x=0$ には $0\to1$ の唯一の射、$x=1$ には $1_1$ があり、いずれも射影との合成は元の二脚になる。順序圏の射は各Homに高々一本なので媒介射も一意。
<!-- solution-end -->

### CAT2-02-B01 積の交換同型を構成する

- Level: B

圏 $\mathcal C$ の二対象 $A,B$ に両方の積 $A\times B,B\times A$ がある。$s=\langle\pi_B,\pi_A\rangle:A\times B\to B\times A$ と $t:B\times A\to A\times B$ を射影から定め、$ts=1$、$st=1$ を証明せよ。

<!-- solution-start -->
**詳細解答。** $B\times A$ から $B,A$ への射影を $\rho_B,\rho_A$ とし、$s=\langle\pi_B,\pi_A\rangle$（終域の順序は $B,A$）、$t=\langle\rho_A,\rho_B\rangle$（終域の順序は $A,B$）と定める。[組の射の規則](#prop-cat2-02-pairing-laws)により

$$
\pi_A(ts)=\rho_A s=\pi_A,\qquad
\pi_B(ts)=\rho_B s=\pi_B.
$$

一方 $\pi_A1=\pi_A,\pi_B1=\pi_B$ だから $ts=1_{A\times B}$。同様に $\rho_B(st)=\pi_Bt=\rho_B$ と $\rho_A(st)=\pi_At=\rho_A$ なので $st=1_{B\times A}$。よって $s$ は同型である。対象の等号 $A\times B=B\times A$ を使っていない。
<!-- solution-end -->

### CAT2-02-B02 対角射はモノ射だが射影はそうとは限らない

- Level: B

圏 $\mathcal C$ に $A\times A$ がある。$\delta_A$ がモノ射であることを定義から証明せよ。次に $\mathbf{Set}$ で $A=\{0\}$、$B=\{a,b\}$ として $\pi_A:A\times B\to A$ がモノ射でないことを具体的に示せ。

<!-- solution-start -->
**詳細解答。** 任意の $u,v:X\to A$ について $\delta_Au=\delta_Av$ を仮定すると、$\pi_1\delta_A=1_A$ を左から合成して $u=\pi_1\delta_Au=\pi_1\delta_Av=v$。これは[モノ射の定義](../CAT1-03/index.md#def-cat1-03-monomorphism)そのもの。後半では $X=\{*\}$ とし $u(* )=(0,a)$、$v(* )=(0,b)$ とする。$u\ne v$ だが $\pi_Au(*)=0=\pi_Av(*)$。従って $\pi_Au=\pi_Av$ でも $u=v$ とはならず、$\pi_A$ はモノ射でない。二本の射影を**同時に**使う場合の識別と区別する。
<!-- solution-end -->

### CAT2-02-B03 三項積の媒介射を二段で作る

- Level: B

$A\times B$ と $(A\times B)\times C$ が存在するとする。$X$ からの三射 $f:X\to A,g:X\to B,h:X\to C$ を与えたとき、三つの射影を同時に満たす射を構成し、一意性を証明せよ。

<!-- solution-start -->
**詳細解答。** $A\times B$ の射影を $p_A,p_B$、$(A\times B)\times C$ の射影を $q,r$ とする。[二項積の普遍性](#def-cat2-02-binary-product)により、まず $u=\langle f,g\rangle:X\to A\times B$ を作る。次に $w=\langle u,h\rangle:X\to(A\times B)\times C$ を作る。すると

$$
(p_Aq)w=p_A(qw)=p_Au=f,\quad
(p_Bq)w=p_Bu=g,\quad rw=h.
$$

別の $w'$ が三条件を満たすなら $p_A(qw')=f,p_B(qw')=g$ なので第1段の一意性から $qw'=u$。また $rw'=h$ なので第2段の一意性から $w'=\langle u,h\rangle=w$。これで三項積の存在と一意性が二項積だけから得られた。
<!-- solution-end -->

### CAT2-02-B04 事後の射への対角射の自然性

- Level: B

$A\times A$、$B\times B$ が存在し、$f:A\to B$ とする。$f\times f$ を射影から作り、$(f\times f)\delta_A=\delta_Bf$ を証明せよ。$f$ の可逆性は必要か。

<!-- solution-start -->
**詳細解答。** $B\times B$ の射影を $q_1,q_2$、$A\times A$ の射影を $p_1,p_2$ とする。$f\times f:=\langle fp_1,fp_2\rangle$ と定められる。[積の射の定義](#prop-cat2-02-product-map)により $q_i(f\times f)=fp_i$。よって

$$
q_i(f\times f)\delta_A=fp_i\delta_A=f1_A=f
\quad(i=1,2).
$$

他方 $q_i\delta_Bf=1_Bf=f$。[組の射の一意性](#prop-cat2-02-pairing-laws)により二射は等しい。使用したのは合成と普遍性だけで、$f$ の逆射は不要である。
<!-- solution-end -->

### CAT2-02-C01 終対象はあるが二項積がない圏

- Level: C

半順序集合 $P=\{a,b,1\}$ を $a<1,b<1$ とし、$a,b$ は比較不能とする。これを圏とみなす。

1. 全ての対象 $x$ から $1$ への射を検査し、$1$ が終対象であることを示せ。
2. $a,b$ に対する錐を持つ頂点があるか列挙し、二項積が存在しないことを示せ。
3. もし $0<a,0<b$ を満たす新しい元 $0$ を追加し、その他の順序は推移律で決めるなら、$a,b$ の積を求め、媒介射の存在と一意性を示せ。
4. この対比により「終対象が存在する」から「全ての有限積が存在する」を導けない理由を、[有限積の存在定理](#thm-cat2-02-finite-products)の仮定と照合せよ。

<!-- solution-start -->
**詳細解答。**

**1. 終対象。** $a\le1,b\le1,1\le1$ なので、それぞれ $a\to1,b\to1,1_1$ が存在する。[順序圏の定義](../CAT1-02/index.md#prop-cat1-02-order-category)では各Homは高々一元だから、各対象から $1$ への射はちょうど一本である。従って $1$ は終対象。

**2. 積の不存在。** $a,b$ への脚が存在する頂点 $x$ は $x\le a$ かつ $x\le b$ の共通下界でなければならない。候補 $x=a$ は $a\nleq b$、$x=b$ は $b\nleq a$、$x=1$ は $1\nleq a$ なので、いずれも二脚を持たない。積は射影を備える対象でなければならず、候補となる錐そのものが存在しない。媒介射の一意性を検査する以前に存在条件が失敗する。

**3. $0$ の追加。** 新しい圏では $0\le a,0\le b$ なので、射影 $0\to a,0\to b$ がある。共通下界の候補を $0,a,b,1$ から全て調べると、$a,b$ の両方以下となるのは $0$ のみ。任意の二脚を持つ $x$ は $x=0$ であり、媒介射は $1_0:0\to0$ しかない。その合成は元の二射影に等しいので、$0$ は $a,b$ の積となる。

**4. 仮定の区別。** 有限積の存在定理の逆向きには「終対象」と「**全ての二対象の**二項積」の両方が必要である。元の $P$ は前者を満たすが、$a,b$ の積が存在せず後者を満たさない。ゆえに空個の積は存在するが二対象離散図式の極限が存在せず、有限積を全て持つとは言えない。$\square$
<!-- solution-end -->

## 8. 次は等化子と引き戻し

終対象は空図式の極限、二項積は二対象離散図式の極限である。積の存在は暗黙の元の組ではなく、射影の族を一意に経由する条件にある。二項積と終対象が全て存在するとき、有限個の離散図式の極限を作れる。しかし、射の等式そのものを課す図式には追加の構成が必要になる。次の CAT2-03 では、その最初の道具である**等化子と引き戻し**を扱う。
