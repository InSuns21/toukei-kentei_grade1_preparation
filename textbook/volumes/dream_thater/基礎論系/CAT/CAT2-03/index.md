# CAT2-03 等化子と引き戻し

## 1. 二本の射に同時に従う対象を作る

前講の[圏論の二項積](../CAT2-02/index.md#def-cat2-02-binary-product)は、二つの対象への射を一つに束ねた。だが、二つの射が同じ値を与えるという**条件**までは課していない。例えば二写像 $f,g:A\to B$ が異なるとき、「$f(x)=g(x)$ を満たす $x$ の集まり」を作りたい。また $f:A\to C$ と $g:B\to C$ があるときは、「$f(a)=g(b)$ を満たす組 $(a,b)$」を作りたい。

集合では条件を満たす元を抜き出せる。しかし群や位相空間では、できた集合に演算や位相を入れ、そこからの写像が元の構造を保つかも確認しなければならない。圏一般では元に頼ることさえできない。そこで、条件を満たす**すべての射が一意に経由する**という性質を使う。

この章で行うことは次の通りである。

1. 平行な二射が一致する範囲を普遍性で定義し、集合・群・位相空間で構成する。
2. 共通の行き先を持つ二射を整合させる構成を定義し、三つの圏で確かめる。
3. その構成を[積](../CAT2-02/index.md#def-cat2-02-binary-product)と二射の一致を表す道具から作り、逆向きには対角射を用いる。
4. 射の向き、存在、一意性、そしてモノ射性がどの仮定から出るかを区別する。

## 2. 等化子：二本の射が一致する範囲

$f,g:A\to B$ は始域も終域も同じ二射とする。この二本を**平行な射**という。対象 $X$ から $A$ への射 $u:X\to A$ が条件 $fu=gu$ を満たすなら、$u$ の像に相当する部分では二射を区別できない。そうした $u$ を一つ残らずまとめる受け皿を定義したい。以下、$fu$ は $f\circ u$ の略記とする。

<a id="def-cat2-03-equalizer"></a>

<!-- formal-statement-start -->
> **定義（等化子）**
> 圏 $\mathcal C$ と平行な射 $f,g:A\to B$ に対し、**等化子**（equalizer）とは、対象 $E$ と射 $e:E\to A$ の組で、まず

$$
f\circ e=g\circ e
$$

> が成り立ち、さらに任意の対象 $X$ と射 $u:X\to A$ が $fu=gu$ を満たすとき、ただ一つの射 $h:X\to E$ が存在して $eh=u$ となるものである。等化子は全ての圏で存在するとは限らない。
<!-- formal-statement-end -->

ここで $e$ を通ったあとに $f,g$ を施すと等しい、という第一条件を省けない。第二条件の「ただ一つ」は、$X$ の選び方に関係なく要求される。[錐と極限](../CAT2-01/index.md#def-cat2-01-limit)の観点では、二対象と二本の平行矢印を持つ小さい添字圏の図式 $A\rightrightarrows B$ の極限である。頂点 $X$ の錐は $u:X\to A$ と $v:X\to B$ の組で $v=fu=gu$ を満たすため、$u$ 一つで決まる。

<!-- definition-example-start: def-cat2-03-equalizer -->
**定義の確認**

**例：集合の等化子。** $A=\{0,1,2\}$、$B=\{0,1\}$ とし、$f(a)$ を $a$ の偶奇、$g(a)=0$ とする。まず

$$
E=\{0,2\},\qquad e:E\hookrightarrow A
$$

を選ぶ。ここで $\hookrightarrow$ は包含写像である。$x\in E$ は偶数だから $f(e(x))=0=g(e(x))$ であり、第一条件が成り立つ。任意の集合 $X$ と写像 $u:X\to A$ が $fu=gu$ を満たせば、各 $x\in X$ で $u(x)$ は偶数となる。従って $h(x)=u(x)$ として $X\to E$ を定められ、$eh=u$。他の $h'$ が $eh'=u$ を満たすなら、包含写像のもとで各元の値が同じなので $h'=h$。空集合 $X$ でも空写像について同じ議論が成立する。これで全称条件を実際に確認した。
<!-- definition-example-end -->

<a id="prop-cat2-03-equalizer-unique-mono"></a>

<!-- formal-statement-start -->
> **命題（等化子の一意性とモノ射性）**
> 圏 $\mathcal C$ の平行な二射 $f,g:A\to B$ に等化子 $(E,e)$ が存在すれば、$e$ はモノ射である。また、$(E',e')$ も同じ二射の等化子なら、$e'\alpha=e$ を満たす同型 $\alpha:E\to E'$ がただ一つ存在する。
<!-- formal-statement-end -->

### 証明の見取り図

二射 $a,b:X\to E$ が $ea=eb$ を満たせば、いずれも等化子への同じ射の媒介となる。一意性を使えばモノ射性が出る。二つの等化子は互いに一意な媒介射を送り合い、その合成を恒等射と比較する。

<!-- proof-start -->
### 証明

$ea=eb=:u$ とする。$f u=f e a=g e a=g u$ だから、$u:X\to A$ は等化条件を満たす。$a,b:X\to E$ はともに $e$ と合成すると $u$ になる。等化子の媒介射の一意性により $a=b$。これは[モノ射の定義](../CAT1-03/index.md#def-cat1-03-monomorphism)そのものである。

次に $fe=ge$ なので、$(E',e')$ の普遍性から一意な $\alpha:E\to E'$ が存在し、$e'\alpha=e$。同様に $fe'=ge'$ から一意な $\beta:E'\to E$ が存在し、$e\beta=e'$。すると

$$
e(\beta\alpha)=(e\beta)\alpha=e'\alpha=e=e1_E.
$$

$e$ がモノ射だから $\beta\alpha=1_E$。逆向きにも $e'(\alpha\beta)=e'=e'1_{E'}$ なので $\alpha\beta=1_{E'}$。よって $\alpha$ は逆 $\beta$ を持つ同型で、条件 $e'\alpha=e$ を満たす射は最初の普遍性で一意である。$\square$
<!-- proof-end -->

**非存在例。** 元が空でない集合とその間の写像だけからなる圏 $\mathbf{Set}_{\ne\varnothing}$ を考える。$A=B=\{0,1\}$ とし、$f$ は常に $0$、$g$ は常に $1$ を返すとする。任意の非空集合 $E$ から $A$ への射 $e$ は少なくとも一つの元を送り、その元で $fe\ne ge$ となる。従って第一条件を満たす $e$ 自体が存在しない。$\mathbf{Set}$ では空集合 $\varnothing\to A$ が等化子になるが、この圏では空集合が対象でないことが失敗の理由である。

## 3. 等化子を集合・群・位相空間で構成する

集合の場合、定義例の偶奇という特殊事情に依存しない。任意の写像 $f,g:A\to B$ に対して

$$
E=\{a\in A\mid f(a)=g(a)\}
$$

とし、包含 $e:E\hookrightarrow A$ を取る。$fe=ge$ は各 $a\in E$ の定義から成り立つ。$fu=gu$ なら任意の $x\in X$ の像 $u(x)$ が $E$ に属し、$h(x)=u(x)$ は写像 $X\to E$ で $eh=u$ を満たす。包含の単射性から $h$ は一意。これにより $\mathbf{Set}$ では全ての平行二射に等化子が存在する。

群の場合は、単なる部分集合を群として扱えるかが追加の問題になる。[群準同型](../../../代数系/GRP/GRP2/index.md#def-grp2-homomorphism) $f,g:G\to H$ に対して同じ集合

$$
E=\{x\in G\mid f(x)=g(x)\}
$$

を取る。[部分群の判定法](../../../代数系/GRP/GRP1/index.md#thm-grp1-subgroup-test)を使うため、単位元・積・逆元を調べる。群準同型が単位元と積を保つので、

$$
f(1_G)=1_H=g(1_G),\qquad
f(xy)=f(x)f(y)=g(x)g(y)=g(xy)
$$

が $x,y\in E$ で成り立つ。さらに $f(x^{-1})=f(x)^{-1}=g(x)^{-1}=g(x^{-1})$。従って $E$ は部分群。包含 $e:E\to G$ は準同型で $fe=ge$。任意の群準同型 $u:K\to G$ が $fu=gu$ を満たすなら、像が $E$ に入るから $h(k)=u(k)$ と置ける。これは $h(kk')=u(k)u(k')=h(k)h(k')$ により群準同型であり、$eh=u$、一意性は包含の単射性による。

具体的に加法群 $\mathbb Z$ から $\mathbb Z/2\mathbb Z$ への剰余写像 $f(n)=\overline n$ と零準同型 $g(n)=\overline0$ の等化子は $2\mathbb Z\hookrightarrow\mathbb Z$ である。写像 $u:K\to\mathbb Z$ の全ての値が偶数なら、$u$ は唯一の準同型 $K\to2\mathbb Z$ を通る。これは「核に似た集合」という名前だけの説明でなく、媒介射の群準同型性まで保証する構成である。

位相空間では、連続写像 $f,g:X\to Y$ に対して、条件を満たす集合

$$
E=\{x\in X\mid f(x)=g(x)\}
$$

に **$X$ からの部分空間位相**を入れる。[部分空間位相の普遍性](../../../基礎科目/TOP/TOP1/index.md#prop-top1-subspace-universal)によれば、$h:Z\to E$ が連続であることと $e\circ h:Z\to X$ が連続であることは同値である。

ゆえに $fu=gu$ を満たす連続写像 $u:Z\to X$ の値域を $E$ に制限した $h$ は連続で、$eh=u$ を満たす。包含写像 $e$ の単射性が一意性を与える。なお、$E$ が閉集合であるとは限らない。$Y$ に Hausdorff 性を仮定しなくても等化子は存在する。

## 4. 引き戻し：二つの対象の情報を整合させる

今度は平行射でなく、共通の終域を持つ二射 $f:A\to C$、$g:B\to C$ を考える。$A$ と $B$ の側で選んだ情報が $C$ で一致する組を作りたい。$P$ からの脚 $p:P\to A$ と $q:P\to B$ が $fp=gq$ を満たし、任意の整合した脚の組を一意に受けるなら、そのような二本の脚を持つ普遍対象を、これから定義する。

<a id="def-cat2-03-pullback"></a>

<!-- formal-statement-start -->
> **定義（引き戻し）**
> 圏 $\mathcal C$ の二射 $f:A\to C$、$g:B\to C$ の**引き戻し**とは、対象 $P$ と射 $p:P\to A$、$q:P\to B$ であって、

$$
f\circ p=g\circ q
$$

> を満たし、かつ任意の対象 $X$ と二射 $u:X\to A$、$v:X\to B$ が $fu=gv$ を満たすとき、ただ一つの射 $h:X\to P$ が存在して

$$
p\circ h=u,\qquad q\circ h=v
$$

> となるものをいう。存在するとき $P=A\times_C B$ と書くことがある。引き戻しは図式 $A\xrightarrow{f}C\xleftarrow{g}B$ の極限である。
<!-- formal-statement-end -->

この定義は[図式への錐](../CAT2-01/index.md#def-cat2-01-cone)を直接使っている。脚 $p,q$ に加えて $C$ への脚 $fp=gq$ を入れると錐になり、媒介射の存在一意性は[極限](../CAT2-01/index.md#def-cat2-01-limit)の条件と一致する。$f$ と $g$ を入れ替えても、脚の名前を交換した同型な構成になる。

<!-- definition-example-start: def-cat2-03-pullback -->
**定義の確認**

**例：有限集合の引き戻し。** $A=\{0,1,2\}$、$B=\{a,b\}$、$C=\{0,1\}$ とし、$f(0)=0,f(1)=1,f(2)=0$、$g(a)=0,g(b)=1$ とする。条件を満たす組は

$$
P=\{(0,a),(1,b),(2,a)\}\subseteq A\times B.
$$

射 $p(a',b')=a'$、$q(a',b')=b'$ は各組で $fp=gq$ を満たす。任意の集合 $X$ と写像 $u:X\to A$、$v:X\to B$ が $fu=gv$ を満たすなら、$h(x)=(u(x),v(x))$ はどの $x$ でも $P$ に入り、$ph=u,qh=v$。別の媒介写像は第一・第二成分がこの二値に固定されるので $h$ と等しい。空の $X$ も含めて全称条件を確認できた。
<!-- definition-example-end -->

一般の集合でも同じく

$$
A\times_C B=\{(a,b)\in A\times B\mid f(a)=g(b)\}
$$

に座標射影を制限すれば、同じ存在・一意性の証明が成り立つ。条件を満たす組が一つもなければ引き戻しは空集合でよい。

## 5. 積と等化子から引き戻しを作る

抽象的な圏では「条件を満たす元の組」と言えない。しかし前講の[積の普遍性](../CAT2-02/index.md#def-cat2-02-binary-product)で二射 $u,v$ を束ね、束ねた射に等化条件を課すという方法がある。

<a id="thm-cat2-03-pullback-construction"></a>

<!-- formal-statement-start -->
> **定理（積と等化子による引き戻しの構成）**
> 圏 $\mathcal C$ の対象 $A,B,C$ と射 $f:A\to C$、$g:B\to C$ を取る。$A,B$ の二項積 $(A\times B,\pi_A,\pi_B)$ と、平行射

$$
f\pi_A,\ g\pi_B:A\times B\longrightarrow C
$$

> の等化子 $e:P\to A\times B$ が存在するなら、$p=\pi_Ae$、$q=\pi_Be$ は $f,g$ の引き戻しをなす。
<!-- formal-statement-end -->

### 証明の見取り図

まず $f\pi_Ae=g\pi_Be$ が引き戻しの可換条件そのものである。整合する $u,v$ を[組の射](../CAT2-02/index.md#prop-cat2-02-pairing-laws) $\langle u,v\rangle$ にすると、これが二射を等化する。等化子を経由する唯一の射が、求める引き戻しの媒介射になる。

<!-- proof-start -->
### 証明

等化子の第一条件から

$$
fp=f\pi_Ae=g\pi_Be=gq.
$$

任意の $X$ と $u:X\to A$、$v:X\to B$ を取り、$fu=gv$ と仮定する。積の普遍性でただ一つの $w=\langle u,v\rangle:X\to A\times B$ が存在し、$\pi_Aw=u,\pi_Bw=v$。従って

$$
(f\pi_A)w=fu=gv=(g\pi_B)w.
$$

$w$ は二射を等化するので、[等化子の定義](#def-cat2-03-equalizer)から一意な $h:X\to P$ が存在し $eh=w$。これを射影に合成すると

$$
ph=\pi_Aeh=\pi_Aw=u,\qquad
qh=\pi_Beh=\pi_Bw=v.
$$

もし別の $k:X\to P$ が $pk=u,qk=v$ を満たせば、$\pi_Aek=u,\pi_Bek=v$ となる。[組の射の一意性](../CAT2-02/index.md#prop-cat2-02-pairing-laws)から $ek=w$。等化子の一意性により $k=h$。これで引き戻しの存在と一意性が示された。$\square$
<!-- proof-end -->

**何を仮定したか。** この定理は「全ての圏に引き戻しがある」とは言わない。必要なのは指定した $A,B$ の積と、指定した平行射 $f\pi_A,g\pi_B$ の等化子の存在だけである。逆に全ての二項積と全ての等化子がある圏には全ての引き戻しがある。CAT2-04 ではこの構成を任意の小図式へ広げる。

## 6. 群と位相空間の引き戻し

**群。** 群準同型 $f:G\to K$、$g:H\to K$ を取る。[群の直積](../../../代数系/GRP/GRP1/index.md#prop-grp1-direct-product) $G\times H$ が群の圏でも二項積となることを、前節の定理を使う前に確かめる。成分ごとの積で定めた $G\times H$ の座標射影 $\pi_G,\pi_H$ は準同型である。任意の群 $L$ と準同型 $u:L\to G$、$v:L\to H$ に対し、$w(\ell)=(u(\ell),v(\ell))$ と置けば

$$
w(\ell\ell')=(u(\ell)u(\ell'),v(\ell)v(\ell'))
=w(\ell)w(\ell'),\qquad
\pi_Gw=u,\quad\pi_Hw=v.
$$

よって $w$ は準同型であり、二つの射影後の値が指定されると各成分が固定されるため一意である。これは[圏論の二項積の定義](../CAT2-02/index.md#def-cat2-02-binary-product)そのものである。従って $G\times H$ 上の平行な準同型 $f\pi_G,g\pi_H$ に第3節の群の等化子を取り、前節の[積と等化子による引き戻しの構成定理](#thm-cat2-03-pullback-construction)を適用すると

$$
P=\{(x,y)\in G\times H\mid f(x)=g(y)\}
$$

が引き戻しになる。ここでは条件集合が部分群であることも直接分かる。条件を満たす $(x,y),(x',y')$ について

$$
f(xx')=f(x)f(x')=g(y)g(y')=g(yy'),
$$

逆元も $f(x^{-1})=f(x)^{-1}=g(y)^{-1}=g(y^{-1})$、単位元も $f(1_G)=g(1_H)=1_K$ で閉じる。任意の群準同型 $u:L\to G,v:L\to H$ が $fu=gv$ なら、$h(\ell)=(u(\ell),v(\ell))$ は $L\to P$ の準同型で、座標射影の条件から一意である。

**位相空間。** 連続写像 $f:X\to Z$、$g:Y\to Z$ に対し、$X\times Y$ に[積位相](../../../基礎科目/TOP/TOP1/index.md#def-top1-product-topology)を入れる。その部分集合

$$
P=\{(x,y)\in X\times Y\mid f(x)=g(y)\}
$$

には部分空間位相を入れる。[積位相の普遍性](../../../基礎科目/TOP/TOP1/index.md#thm-top1-product-universal)によって、連続な $u:T\to X,v:T\to Y$ に対する組の写像 $w=(u,v):T\to X\times Y$ は連続である。

$fu=gv$ なら $w(T)\subseteq P$ なので、[部分空間位相の普遍性](../../../基礎科目/TOP/TOP1/index.md#prop-top1-subspace-universal)から制限写像 $h:T\to P$ は連続となる。座標射影との合成は $ph=u,qh=v$ であり、二つの座標値で各点の像が決まるから $h$ は一意である。

例えば $X=(0,1)$、$Y=Z=\mathbb R$、$f(x)=x$、$g(t)=t^2$ とする。引き戻しの点は $(x,t)$ で $x=t^2\in(0,1)$ を満たし、$t\in(-1,0)\cup(0,1)$ と一対一に対応する。写像 $t\mapsto(t^2,t)$ と第二射影 $q(x,t)=t$ は互いに逆で、いずれも上の位相の構成から連続である。したがって引き戻しは位相空間として $(-1,0)\cup(0,1)$ と、互いに逆の連続写像で結ばれる。単なる点集合の対応より強い結論である。

## 7. 引き戻しの性質と等化子への逆向きの構成

引き戻しの脚 $p,q$ は、**二本そろうと**媒介射を識別する。実際 $h,k:T\to P$ について $ph=pk,qh=qk$ なら、同じ整合した脚の組を媒介しているので[引き戻しの一意性](#def-cat2-03-pullback)から $h=k$。これだけでは $p$ または $q$ が個別にモノ射とは言えない。

<a id="prop-cat2-03-pullback-mono"></a>

<!-- formal-statement-start -->
> **命題（モノ射の引き戻し）**
> 圏 $\mathcal C$ の引き戻し $(P,p,q)$ が射 $f:A\to C$ と $g:B\to C$ に対して存在するとする。$f$ がモノ射なら $q:P\to B$ もモノ射である。対称的に $g$ がモノ射なら $p:P\to A$ もモノ射である。
<!-- formal-statement-end -->

### 証明の見取り図

$q$ の後で等しくなる二射を取る。可換条件を使えば $f$ の後でも等しくなるため、$f$ の左消去性で $p$ の後でも等しい。二本の脚がそろった一意性へ戻る。

<!-- proof-start -->
### 証明

$a,b:T\to P$ に対し $qa=qb$ とする。$fp=gq$ なので

$$
f(pa)=(fp)a=(gq)a=(gq)b=(fp)b=f(pb).
$$

$f$ は[モノ射](../CAT1-03/index.md#def-cat1-03-monomorphism)だから $pa=pb$。従って $pa=pb$ と $qa=qb$ の両方が成り立ち、引き戻しの普遍性の一意性から $a=b$。よって $q$ はモノ射。対称的に $g$ がモノ射で $pa=pb$ なら

$$
g(qa)=(gq)a=(fp)a=(fp)b=(gq)b=g(qb)
$$

であり、$g$ の左消去性から $qa=qb$ が出る。再び二本の脚についての一意性を使って $a=b$ なので、$p$ もモノ射である。$\square$
<!-- proof-end -->

**反例で仮定を確かめる。** $C=\{*\}$、$A=\{0,1\}$、$B=\{*\}$ とし、$f:A\to C$、$g:B\to C$ を一意な写像とする。$f$ は単射でない。引き戻し $P=A\times B$ から $B$ への射 $q$ は二元集合を一点へ送るので、[集合におけるモノ射の特徴づけ](../CAT1-03/index.md#prop-cat1-03-set-characterization)によりモノ射ではない。証明で $f(pa)=f(pb)$ から $pa=pb$ と消去する段階が失われる。

等化子と引き戻しは反対方向にもつながる。[対角射](../CAT2-02/index.md#def-cat2-02-diagonal) $\delta_B:B\to B\times B$ は $b\mapsto(b,b)$ に相当する。二射 $f,g:A\to B$ を組にして $\langle f,g\rangle:A\to B\times B$ を作り、対角射に沿って引き戻すと、等化子が現れる。

<a id="prop-cat2-03-equalizer-as-pullback"></a>

<!-- formal-statement-start -->
> **命題（対角射の引き戻しによる等化子）**
> 圏 $\mathcal C$ に $B\times B$ が存在し、平行二射 $f,g:A\to B$ に対して $\langle f,g\rangle:A\to B\times B$ と $\delta_B:B\to B\times B$ の引き戻し $(P,e,t)$ が存在するとする。このとき $e:P\to A$ は $f,g$ の等化子である。
<!-- formal-statement-end -->

### 証明の見取り図

$\langle f,g\rangle e=\delta_Bt$ を二つの射影で読むと $fe=t=ge$。逆に $fu=gu$ なら $t'=fu:X\to B$ を選び、対角射との可換条件を作る。引き戻しの一意な媒介射を等化子の条件へ移す。

<!-- proof-start -->
### 証明

引き戻しの可換条件 $\langle f,g\rangle e=\delta_Bt$ を $B\times B$ の第一射影と合成すると $fe=t$、第二射影と合成すると $ge=t$。ゆえに $fe=ge$。

$fu=gu$ を満たす任意の $u:X\to A$ に対して $v=fu=gu:X\to B$ を置く。[組の射の基本則](../CAT2-02/index.md#prop-cat2-02-pairing-laws)を使うと

$$
\langle f,g\rangle u=\langle fu,gu\rangle
=\langle v,v\rangle=\delta_Bv.
$$

引き戻しの普遍性から一意な $h:X\to P$ が存在し、$eh=u,th=v$。もし $eh'=u$ を満たす別の $h'$ があれば、$th'=feh'=fu=v$ でもある。従って $h'$ も同じ二本の脚を媒介し、引き戻しの一意性から $h'=h$。$\square$
<!-- proof-end -->

特別な場合として $1_C:C\to C$ と $g:B\to C$ の引き戻しは $B$ 自身で、脚は $(g,1_B)$ になる。実際 $1_Cu=gv$ なら $u=gv$ だから、媒介射は $h=v$ と一意に決まる。

また $A\to T\leftarrow B$ の両射が[終対象](../CAT1-04/index.md#def-cat1-04-initial-terminal) $T$ への一意な射なら、引き戻し条件は全ての脚の組について自動的に成り立つ。従って、この引き戻しは[圏論の二項積](../CAT2-02/index.md#def-cat2-02-binary-product)そのものである。積、等化子、引き戻しが「別々の記号」ではなく、同じ極限の言葉で結び付いている。

## 8. 演習：整合条件から媒介射を再構成する

### CAT2-03-A01 集合で等化子を列挙する

- Level: A
- 問題: $A=\{0,1,2,3,4\}$、$B=\{0,1\}$ とし、$f:A\to B$ を偶奇写像、$g:A\to B$ を定値 $1$ とする。等化子の集合と包含射を求め、任意の $u:X\to A$ に対する媒介射の条件を説明せよ。

<!-- solution-start -->
**詳細解答**。$f(a)=1$ となるのは $a=1,3$ だから $E=\{1,3\}$、$e:E\hookrightarrow A$ を取る。どの $z\in E$ でも $fe(z)=1=ge(z)$。$fu=gu$ なら各 $x\in X$ で $f(u(x))=1$ だから $u(x)\in E$。そこで $h(x)=u(x)$ と置けば $h:X\to E$、$eh=u$。別の $k$ が $ek=u$ を満たすなら $k(x)=u(x)=h(x)$ が全ての $x$ で成り立つので $k=h$。$\square$
<!-- solution-end -->

### CAT2-03-A02 空の等化子

- Level: A
- 問題: $A=\{a\}$、$B=\{0,1\}$、$f(a)=0$、$g(a)=1$ とする。$\mathbf{Set}$ で等化子を求め、$\mathbf{Set}_{\ne\varnothing}$ で存在しない理由を述べよ。

<!-- solution-start -->
**詳細解答**。$f(a)\ne g(a)$ なので等化条件を満たす元はなく、$E=\varnothing$、$e:\varnothing\to A$ が候補となる。$fe=ge$ は空の定義域上の写像として成立する。$fu=gu$ を満たす $u:X\to A$ があるなら、$X$ に元 $x$ があれば $f(u(x))=0\ne1=g(u(x))$ と矛盾するため $X=\varnothing$。このとき $X\to E$ は空写像ただ一つで、媒介の存在一意性が成立する。非空集合だけを対象とする圏では候補 $E$ が対象でなく、非空 $E'$ なら $fe'\ne ge'$ となるため等化子は存在しない。$\square$
<!-- solution-end -->

### CAT2-03-A03 偶数部分群を媒介する

- Level: A
- 問題: 加法群 $\mathbb Z$ の準同型 $f:\mathbb Z\to\mathbb Z/2\mathbb Z$、$f(n)=\overline n$ と零準同型 $g$ の等化子を求めよ。また $u:\mathbb Z\to\mathbb Z$、$u(n)=6n$ の媒介準同型を求めよ。

<!-- solution-start -->
**詳細解答**。$f(n)=g(n)$ は $n$ が偶数であることと同値なので、等化子は包含 $e:2\mathbb Z\hookrightarrow\mathbb Z$。$2\mathbb Z$ は加法で閉じ、$0$ と加法逆元を持つ部分群である。$u(n)=6n$ は $f(u(n))=\overline0=g(u(n))$ を満たす。従って $h:\mathbb Z\to2\mathbb Z$、$h(n)=6n$ と置くと $eh=u$。$h(m+n)=6m+6n=h(m)+h(n)$ なので準同型である。$eh'=u$ を満たす $h'$ は包含後の値が全て一致するから $h'=h$。$\square$
<!-- solution-end -->

### CAT2-03-A04 集合の引き戻しを列挙する

- Level: A
- 問題: $A=\{0,1,2\}$、$B=\{a,b\}$、$C=\{0,1\}$ とする。$f(0)=f(2)=0,f(1)=1$、$g(a)=0,g(b)=1$ の引き戻しを列挙し、$X=\{x,y\}$、$u(x)=2,u(y)=1$ に整合する $v:X\to B$ と媒介射 $h$ を求めよ。

<!-- solution-start -->
**詳細解答**。$f(a')=g(b')$ を各組で検査すると $P=\{(0,a),(1,b),(2,a)\}$。$fu(x)=0$ なので $g(v(x))=0$ を満たす $v(x)=a$、$fu(y)=1$ なので $v(y)=b$。媒介射は $h(x)=(2,a)$、$h(y)=(1,b)$。両射影 $p,q$ に対し $ph=u,qh=v$。他の $h'$ も両成分が同じなので、各点で $h'=h$ となる。$\square$
<!-- solution-end -->

### CAT2-03-A05 恒等射に沿う引き戻し

- Level: A
- 問題: 任意の圏 $\mathcal C$ と射 $g:B\to C$ について、$1_C:C\to C$ と $g$ の引き戻しが $(B,g,1_B)$ であることを証明せよ。

<!-- solution-start -->
**詳細解答**。まず $1_Cg=g=g1_B$ だから可換条件を満たす。任意の $u:X\to C,v:X\to B$ が $1_Cu=gv$ を満たせば $u=gv$。$h=v:X\to B$ を選ぶと $gh=gv=u$、$1_Bh=v$。別の $k$ で $1_Bk=v$ なら $k=v=h$。存在と一意性が成立する。$\square$
<!-- solution-end -->

### CAT2-03-B01 等化子のモノ射性を二方向で使う

- Level: B
- 問題: 圏 $\mathcal C$ の平行射 $f,g:A\to B$ の等化子 $(E,e)$ について、射 $r,s:X\to E$ が $er=es$ なら $r=s$ を証明せよ。さらに別の等化子 $(E',e')$ との間の射 $\alpha:E\to E'$ が同型になる過程を、逆射の構成から示せ。

<!-- solution-start -->
**詳細解答**。$u=er=es$ と置くと $fu=fer=ger=gu$。$r,s$ はともに等化子 $(E,e)$ に $u$ を媒介するため、一意性から $r=s$。別の等化子の普遍性に $e:E\to A$ を入力し、$e'\alpha=e$ を満たす一意な $\alpha$ を得る。逆に $e$ の普遍性へ $e'$ を入力して $e\beta=e'$ の $\beta:E'\to E$ を得る。$e\beta\alpha=e'\alpha=e=e1_E$ だから第一段の左消去性で $\beta\alpha=1_E$。同様に $e'\alpha\beta=e'1_{E'}$ から $\alpha\beta=1_{E'}$。したがって互いに逆の射であり、$\alpha$ は同型である。$\square$
<!-- solution-end -->

### CAT2-03-B02 合同条件から群の引き戻しを作る

- Level: B
- 問題: 加法群の二つの剰余準同型 $f,g:\mathbb Z\to\mathbb Z/2\mathbb Z$、$f(n)=\overline n,g(m)=\overline m$ の引き戻し $P$ を求めよ。部分群であることと、任意の整合する群準同型 $u,v:L\to\mathbb Z$ に対する媒介射を直接証明せよ。

<!-- solution-start -->
**詳細解答**。条件 $\overline n=\overline m$ は $n-m$ が偶数であることと同値なので

$$
P=\{(n,m)\in\mathbb Z^2\mid n-m\in2\mathbb Z\}.
$$

$(0,0)\in P$。$(n,m),(n',m')\in P$ なら $(n+n')-(m+m')=(n-m)+(n'-m')$ は偶数で、$(-n)-(-m)=-(n-m)$ も偶数だから $P$ は部分群。座標射影は加法準同型で $fp=gq$。整合する $u,v$ には $u(\ell)-v(\ell)$ が全て偶数という条件があり、$h(\ell)=(u(\ell),v(\ell))\in P$ と置く。$h(\ell+\ell')=h(\ell)+h(\ell')$ なので準同型で $ph=u,qh=v$。両成分が固定されるため、他の媒介準同型は存在しない。$\square$
<!-- solution-end -->

### CAT2-03-B03 位相空間の引き戻しと連続な逆写像

- Level: B
- 問題: $X=(0,1)$、$Y=Z=\mathbb R$ に通常の位相を入れ、$f:X\to Z,f(x)=x$、$g:Y\to Z,g(t)=t^2$ とする。引き戻しの集合を求め、第二射影 $q:P\to(-1,0)\cup(0,1)$ が連続な逆写像を持つことを示せ。

<!-- solution-start -->
**詳細解答**。条件 $f(x)=g(t)$ は $x=t^2$。$0<x<1$ を代入すると $0<t^2<1$ だから、$t\in U=(-1,0)\cup(0,1)$。従って引き戻しの集合は

$$
P=\{(t^2,t)\mid t\in U\}
$$

であり、$X\times Y$ からの部分空間位相を入れる。第二射影 $P\to\mathbb R$ は連続で像が $U$ に含まれる。[部分空間位相の普遍性](../../../基礎科目/TOP/TOP1/index.md#prop-top1-subspace-universal)から、値域を $U$ とした $q:P\to U$ も連続である。

逆写像候補 $j:U\to P$ は $j(t)=(t^2,t)$。$t\mapsto t^2$ と恒等写像は連続だから、[積位相の普遍性](../../../基礎科目/TOP/TOP1/index.md#thm-top1-product-universal)により $U\to X\times Y$ への組の写像が連続。像は $P$ に含まれるため、[部分空間位相の普遍性](../../../基礎科目/TOP/TOP1/index.md#prop-top1-subspace-universal)から $j$ も連続になる。

最後に $qj(t)=t$、$jq(t^2,t)=(t^2,t)$ を直接確かめられるので、二写像は互いに逆である。$\square$
<!-- solution-end -->

### CAT2-03-B04 引き戻しにおけるモノ射の保存

- Level: B
- 問題: 引き戻し $(P,p,q)$ の $f:A\to C$ がモノ射なら $q:P\to B$ もモノ射であることを証明せよ。$f$ がモノ射でない場合に $q$ もそうならない集合の反例を構成し、証明のどの操作が失敗するかを述べよ。

<!-- solution-start -->
**詳細解答**。$a,b:T\to P$ が $qa=qb$ を満たすとする。可換条件 $fp=gq$ を二つの射に合成すると

$$
fpa=gqa=gqb=fpb.
$$

$f$ のモノ射性により $pa=pb$。これと $qa=qb$ に対して引き戻しの媒介射の一意性を使うと $a=b$。従って $q$ はモノ射である。

反例は $A=\{0,1\},B=C=\{*\}$、$f,g$ をそれぞれ一意な写像とする。$P=A\times B$ は二元集合で $q$ は定値写像だから、[集合での特徴づけ](../CAT1-03/index.md#prop-cat1-03-set-characterization)によりモノ射ではない。上の証明では $fpa=fpb$ から $pa=pb$ へ進む消去が使えなくなる。$\square$
<!-- solution-end -->

### CAT2-03-C01 二つの普遍構成の同値

- Level: C
- 問題: 圏 $\mathcal C$ に全ての二項積があるとする。次の二つを証明せよ。
  1. 全ての平行二射の等化子が存在すれば、全ての $A\to C\leftarrow B$ の引き戻しが存在する。
  2. 全ての引き戻しが存在すれば、全ての平行二射の等化子が存在する。
  どちらの方向でも、媒介射の存在だけでなく一意性を示し、必要な積を具体的に指定せよ。

<!-- solution-start -->
**詳細解答**。

**1. 等化子から引き戻しへ。** $f:A\to C,g:B\to C$ を固定する。仮定の二項積 $A\times B$ を取って射影を $\pi_A,\pi_B$ とする。平行二射 $f\pi_A,g\pi_B:A\times B\to C$ の等化子 $e:P\to A\times B$ を取り、$p=\pi_Ae,q=\pi_Be$ とする。等化条件から $fp=gq$。整合する $u:X\to A,v:X\to B$ には $w=\langle u,v\rangle:X\to A\times B$ があり、

$$
(f\pi_A)w=fu=gv=(g\pi_B)w.
$$

等化子の一意な媒介射 $h:X\to P$ が $eh=w$ を満たし、$ph=u,qh=v$。別の $k$ が両条件を満たせば、積の射影で $ek=w$、続いて等化子の一意性から $k=h$。したがって引き戻しがある。

**2. 引き戻しから等化子へ。** $f,g:A\to B$ に対して、積 $B\times B$ を選ぶ。[組の射](../CAT2-02/index.md#prop-cat2-02-pairing-laws) $\langle f,g\rangle:A\to B\times B$ と[対角射](../CAT2-02/index.md#def-cat2-02-diagonal) $\delta_B:B\to B\times B$ の引き戻しを $(P,e,t)$ とする。可換条件を二つの射影で読むと $fe=t=ge$ となり、等化の条件が得られる。

$fu=gu$ を満たす任意の $u:X\to A$ には $v=fu=gu$ を置く。[組の射の基本則](../CAT2-02/index.md#prop-cat2-02-pairing-laws)により

$$
\langle f,g\rangle u=\langle fu,gu\rangle
=\langle v,v\rangle=\delta_Bv.
$$

引き戻しの普遍性から一意な $h:X\to P$ が存在し、$eh=u,th=v$ を満たす。$eh'=u$ を満たす別解があれば、$th'=feh'=fu=v$ なので、引き戻しの一意性により $h'=h$。従って $e$ は等化子である。二方向とも、必要なのは明示した積と引き戻し／等化子の存在である。$\square$
<!-- solution-end -->

## 9. 次は小さい図式の極限へ

等化子は平行射の等式を、引き戻しは共通の終域への二射の整合性を、それぞれ媒介射の存在一意性で表した。集合・群・位相空間の例では同じ条件式に見えても、群の部分群性や位相の連続性を確認する段階が必要だった。積と等化子から引き戻しを構成する方法は、次の CAT2-04 で**小さい積と等化子から任意の小図式の極限を構成する**議論の基礎になる。
