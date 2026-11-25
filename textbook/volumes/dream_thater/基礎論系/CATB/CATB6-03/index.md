# CATB6-03 Beck–ChevalleyとFrobenius

## 1. 代入と量化をどちらから行うか

[射に沿う量化子](../CATB6-02/index.md#def-catb6-02-quantifiers)を使うと、述語から変数を消せる。例えば、地域 $x$ に属する施設 $u$ が条件 $A$ を満たすかを調べるとき、存在量化は条件を満たす施設がある地域を、全称量化は全施設が条件を満たす地域を選ぶ。

地域の区分を別の地域名に対応させて観察したいとする。先に地域ごとの判定を済ませて新しい地域名に代入する方法と、先に新しい地域名ごとに施設を集め直して判定する方法は一致するだろうか。鍵は、新しい地域名に対応する施設を漏れなく、余分なく取り出すことである。これを引き戻しで表す。

以下では局所小な[初等トポス](../CATB5-06/index.md#def-catb5-06-elementary-topos)を固定する。$\operatorname{Sub}(X)$ は対象 $X$ の[部分対象](../CATB4-07/index.md#def-catb4-07-subobject)の順序集合であり、$\le$ は部分対象の包含を表す。[初等トポスの量化子の存在](../CATB6-02/index.md#thm-catb6-02-quantifier-existence)により、各射 $f:X\to Y$ に対して

$$
\exists_f\dashv f^*\dashv\forall_f
$$

が存在する。合成は右から左へ読む。

## 2. 基底変換と存在量化

射 $f:X\to Y$ と $g:Y'\to Y$ を取り、その[引き戻し](../../CAT/CAT2-03/index.md#def-cat2-03-pullback)を $X'$ とする。射影を $h:X'\to X$、$f':X'\to Y'$ と書く。

| | 左側 | 右側 |
| --- | --- | --- |
| 新しい基底 | $X'$ | $Y'$ |
| 元の基底 | $X$ | $Y$ |

横方向の射は上段が $f'$、下段が $f$、縦方向は左が $h$、右が $g$ であり、$fh=gf'$ である。引き戻しであることは、この可換性に加えて、任意の $u:T\to X$ と $v:T\to Y'$ が $fu=gv$ を満たすとき、両射を成分とする $T\to X'$ が一意に存在することを要求する。

集合では $X'=\{(x,y')\mid f(x)=g(y')\}$ として実現できる。つまり新しい基底 $y'$ の下には、元の基底 $g(y')$ の下にあった $x$ がちょうど一つずつ現れる。

部分対象 $A$ を $X$ 上に取る。二つの操作はともに $\operatorname{Sub}(X)$ から $\operatorname{Sub}(Y')$ へ向かう。量化してから逆像を取るか、逆像を取ってから量化するかの等式を Beck–Chevalley 等式という。存在量化の場合はすでに [部分対象のBeck–Chevalley等式](../CATB4-07/index.md#thm-catb4-07-beck-chevalley) として証明した。

$$
g^*\exists_f A=\exists_{f'}h^*A.
$$

適用条件を確認しよう。[初等トポスのBarr-正確性](../CATB5-08/index.md#thm-catb5-08-exact) によって初等トポスは正則圏であり、[分類射と部分対象の自然な対応](../CATB5-06/index.md#thm-catb5-06-classifier-bijection) により部分対象順序は集合である。よって引用した定理の仮定を満たす。$A=[m:M\to X]$ とすると、$\exists_f A$ は $fm$ の像である。$h$ に沿う $m$ の引き戻しを $\ell:L\to X'$、$d:L\to M$ とすれば、

$$
fmd=fh\ell=gf'\ell.
$$

この二段の引き戻しは $fm$ と $g$ の引き戻しを与える。従って [正則圏の像分解とその引き戻し安定性](../CATB1-02/index.md#thm-catb1-02-regular-factorization) により、$f'\ell$ の像は $fm$ の像の $g$ による逆像と一致する。存在量化を基底変換の前後で交換できる理由は、この像の安定性にある。

## 3. 全称量化の基底変換

全称量化では証人が一つあるかではなく、ファイバー全体が述語を満たすかを調べる。集合の場合、引き戻しによってファイバーが一対一に対応するので全称量化についても期待する等式が成立する。一般のトポスで元を列挙せずに証明するためには、包含の判定を随伴で順に移す。

<a id="thm-catb6-03-universal-beck-chevalley"></a>

<!-- formal-statement-start -->
> **定理（全称量化のBeck–Chevalley等式）**
>
> 局所小な初等トポスで $f:X\to Y$ と $g:Y'\to Y$ の引き戻しを $X'$ とし、その射影を $h:X'\to X$、$f':X'\to Y'$ とする。このとき次は順序関手の等式である。

$$
g^*\forall_f=\forall_{f'}h^*:
\operatorname{Sub}(X)\to\operatorname{Sub}(Y').
$$
<!-- formal-statement-end -->

見取り図：任意の $Y'$ 上の部分対象 $B'$ が左辺に含まれる条件を考える。まず $g^*$ の左随伴で $Y$ へ移し、次に $\forall_f$ の左随伴で $X$ へ移す。そこで引き戻しの四角形を横と縦を入れ替えて見れば、既習の存在量化の等式が使える。

<!-- proof-start -->
### 証明

[量化子の存在](../CATB6-02/index.md#thm-catb6-02-quantifier-existence) によって四射に沿う随伴が存在する。引き戻しの普遍性では二つの射を対称に扱うため、$g:Y'\to Y$ を下辺に、$f:X\to Y$ を右辺に置き直しても同じ引き戻しになる。その場合、左辺は $f'$、上辺は $h$ である。[部分対象のBeck–Chevalley等式](../CATB4-07/index.md#thm-catb4-07-beck-chevalley) をこの対応で適用すると

$$
f^*\exists_g B'=\exists_h(f')^*B'
$$

を得る。ここで両辺は $X$ 上の部分対象である。

任意の $A\in\operatorname{Sub}(X)$ と $B'\in\operatorname{Sub}(Y')$ を取る。[射に沿う量化子の随伴条件](../CATB6-02/index.md#def-catb6-02-quantifiers) を順に適用する。

$$
\begin{aligned}
B'\le g^*\forall_f A
&\iff \exists_g B'\le\forall_f A\\
&\iff f^*\exists_g B'\le A\\
&\iff \exists_h(f')^*B'\le A\\
&\iff (f')^*B'\le h^*A\\
&\iff B'\le\forall_{f'}h^*A.
\end{aligned}
$$

第三の同値では先ほどの存在量化の等式を代入した。第一と第四は左随伴条件、第二と第五は右随伴条件である。各段階の比較対象は順に $Y',Y,X,X,X',Y'$ 上の部分対象であり、異なる基底の部分対象を直接比較していない。

$B'=g^*\forall_f A$ を代入すると左辺から右辺への包含を得る。$B'=\forall_{f'}h^*A$ を代入すると逆向きの包含を得る。部分対象順序の反対称性により両者は等しい。任意の $A$ で一致し、順序圏の射は端点で一意に定まるので関手も一致する。
<!-- proof-end -->

### 有限集合で二つの等式を確認する

$X=\{1,2,3\}$、$Y=\{a,b,c\}$ とし、$f(1)=f(2)=a$、$f(3)=b$ とする。$Y'=\{p,q,r,s\}$ とし、$g(p)=g(q)=a$、$g(r)=b$、$g(s)=c$ とする。$A=\{1,2\}$ について、引き戻しは

$$
X'=\{(1,p),(2,p),(1,q),(2,q),(3,r)\}.
$$

二射影は $h(x,y')=x$、$f'(x,y')=y'$ である。条件 $f(x)=g(y')$ を満たす組を全て取っているため、可換性だけでなく普遍性も満たす。実際、$fu=gv$ となる任意の二写像から $t\mapsto(u(t),v(t))$ が定まり、二成分を指定すると他の写像は存在しない。

[集合での量化子の計算](../CATB6-02/index.md#def-catb6-02-quantifiers) では $\exists_f A=\{a\}$、$\forall_f A=\{a,c\}$ である。従って

$$
g^*\exists_f A=\{p,q\},\qquad
g^*\forall_f A=\{p,q,s\}.
$$

逆の順序で計算すると $h^*A$ は $X'$ から $(3,r)$ を除いた四組である。新しいファイバーは $p,q$ では二組ずつ、$r$ では一組、$s$ では空集合である。存在量化では $p,q$、全称量化では $p,q,s$ が残り、両経路が一致する。$s$ は証人がないが、反例もないので全称量化では真になる。

## 4. 可換性だけではなぜ不足するか

引き戻しを仮定せず、四射が $fh=gf'$ を満たすだけとする。この場合にも一方向の比較はできる。

<a id="prop-catb6-03-comparison"></a>

<!-- formal-statement-start -->
> **命題（可換四角形の量化子比較）**
>
> 局所小な初等トポスで $fh=gf'$ を満たす四射 $f:X\to Y$、$g:Y'\to Y$、$h:X'\to X$、$f':X'\to Y'$ を取る。任意の $A\in\operatorname{Sub}(X)$ について

$$
\exists_{f'}h^*A\le g^*\exists_f A,
\qquad
g^*\forall_f A\le\forall_{f'}h^*A.
$$
<!-- formal-statement-end -->

見取り図：逆像の合成則と随伴の単位・余単位だけで得られる向きである。

<!-- proof-start -->
### 証明

[量化子の単位と余単位](../CATB6-02/index.md#prop-catb6-02-quantifier-rules) によって

$$
A\le f^*\exists_f A,\qquad f^*\forall_f A\le A.
$$

順序を保つ $h^*$ を第一の不等式に適用する。[部分対象の逆像の合成則](../CATB4-07/index.md#thm-catb4-07-inverse-image) と可換性から

$$
h^*A\le h^*f^*\exists_f A=(f')^*g^*\exists_f A.
$$

[量化子の左随伴条件](../CATB6-02/index.md#def-catb6-02-quantifiers) により第一の結論を得る。第二については

$$
(f')^*g^*\forall_f A=h^*f^*\forall_f A\le h^*A
$$

であるから、同じ定義の右随伴条件により第二の結論が得られる。
<!-- proof-end -->

集合で $X=Y=Y'=\{0\}$、$f=g=1_{\{0\}}$、$X'=\varnothing$ と置く。$h,f'$ は唯一の空写像で可換性を満たすが、引き戻しではない。$A=X$ とすると左から量化した値 $g^*\exists_f A=\{0\}$ に対して $\exists_{f'}h^*A=\varnothing$ となる。全称側は $A=\varnothing$ とすると $g^*\forall_f A=\varnothing$ だが $\forall_{f'}h^*A=\{0\}$ となる。

欠けているのは、元の $0$ と新しい $0$ を結ぶ組である。普遍性があれば一元集合からの二つの恒等写像に対して $X'$ への射が必要だが、空集合へそのような写像はない。存在量化は証人を失い、全称量化は反例を失ったため、異なる向きの真の包含になる。

## 5. 連言を量化の内側から外側へ移す

$A$ を $X$ 上の述語、$B$ を $Y$ 上の述語とする。$f(x)$ が $B$ を満たすことは $X$ 上では $f^*B$ と書く。[部分対象の最大元と共通部分](../CATB6-01/index.md#prop-catb6-01-subobject-meet) により、連言は最大下界 $\wedge$ で表される。

例えば「条件 $A$ を満たす施設がある、かつその地域が $B$ に属する」という判定では、$B$ は施設の選び方に依存しない。従って施設を量化する前に地域の条件で絞っても、量化してから絞ってもよい。この交換を Frobenius の相互法則と呼ぶ。

<a id="thm-catb6-03-frobenius"></a>

<!-- formal-statement-start -->
> **定理（存在量化のFrobenius相互法則）**
>
> 局所小な初等トポスの射 $f:X\to Y$、部分対象 $A\in\operatorname{Sub}(X)$ と $B\in\operatorname{Sub}(Y)$ に対して

$$
\exists_f(A\wedge f^*B)=\exists_f A\wedge B.
$$
<!-- formal-statement-end -->

見取り図：$A$ の像を作る正則エピ・モノ分解を、$B$ の代表モノ射に沿って引き戻す。像の代表モノ射の引き戻しが、右辺の共通部分を与える。

<!-- proof-start -->
### 証明

$A=[m:M\to X]$、$B=[n:N\to Y]$ とする。[初等トポスのBarr-正確性](../CATB5-08/index.md#thm-catb5-08-exact) により正則圏なので $fm=ie$ と正則エピ射 $e:M\to I$、モノ射 $i:I\to Y$ に分解できる。

$P=M\times_Y N$ を $fm,n$ の引き戻しとして、射影を $a:P\to M$、$b:P\to N$ とする。$n$ の引き戻しである $a$ はモノ射である（[モノ射の引き戻し](../../CAT/CAT2-03/index.md#prop-cat2-03-pullback-mono)）。合成 $ma:P\to X$ は $A\wedge f^*B$ を表すことを確認する。

任意の射 $u:T\to X$ が $m$ を経由し、かつ $fu$ が $n$ を経由すると仮定する。つまり $u=mv$、$fu=nw$ となる $v:T\to M$、$w:T\to N$ がある。このとき $fmv=nw$ だから [引き戻しの普遍性](../../CAT/CAT2-03/index.md#def-cat2-03-pullback) により $ak=v,bk=w$ を満たす唯一の $k:T\to P$ を得る。逆に $u=mak$ なら $u$ は $m$ を経由し、$fu=fmak=nbk$ も $n$ を経由する。これは共通部分の普遍性であり、$[ma]=A\wedge f^*B$ である。

次に $Q=I\times_Y N$ を $i,n$ の引き戻しとし、射影を $c:Q\to I$、$d:Q\to N$ とする。$iea=fma=nb$ より $ct=ea,dt=b$ となる唯一の射 $t:P\to Q$ が存在する。

この $t$ は $e$ の $c$ による引き戻しである。実際、$v:T\to M$ と $q:T\to Q$ が $ev=cq$ を満たすとき、

$$
fmv=iev=icq=ndq
$$

なので $ak=v,bk=dq$ となる唯一の $k:T\to P$ が存在する。$ctk=eak=ev=cq$、$dtk=bk=dq$ だから $Q$ の普遍性から $tk=q$。逆に $ak=v,tk=q$ なら $bk=dtk=dq$ が強制されるので $k$ は一意である。

[正則圏の像分解とその引き戻し安定性](../CATB1-02/index.md#thm-catb1-02-regular-factorization) によって $t$ は正則エピ射である。$c$ はモノ射の引き戻しなのでモノ射であり、$ic$ もモノ射である。

$$
fma=iea=ict.
$$

従って [正則エピ・モノ分解は像を与える](../CATB1-01/index.md#thm-catb1-01-regular-epi-mono-image) により $fma$ の像は $ic$ である。[部分対象の最大元と共通部分](../CATB6-01/index.md#prop-catb6-01-subobject-meet) によって $[ic]=[i]\wedge[n]$ である。存在量化が像を与えることを [量化子の存在定理](../CATB6-02/index.md#thm-catb6-02-quantifier-existence) から用いれば

$$
\exists_f(A\wedge f^*B)=[ic]=\exists_f A\wedge B.
$$
<!-- proof-end -->

集合の例として $X=\{1,2,3\}$、$Y=\{a,b,c\}$、$f(1)=f(2)=a$、$f(3)=b$、$A=\{1,3\}$、$B=\{b,c\}$ とする。$f^*B=\{3\}$ なので $A\cap f^*B=\{3\}$、その像は $\{b\}$ である。一方 $f(A)=\{a,b\}$ なので $f(A)\cap B=\{b\}$ となる。

ここで $f^*B$ を任意の $X$ 上の述語に置き換えることはできない。$X=\{1,2\}$、$Y=\{a\}$、$f(1)=f(2)=a$、$A=\{1\}$、$C=\{2\}$ なら

$$
\exists_f(A\wedge C)=\varnothing,\qquad
\exists_f A\wedge\exists_f C=\{a\}.
$$

二つの存在量化の証人は異なり、同一の証人で連言を満たせない。$C=f^*B$ であれば、同じファイバー内で $C$ の真偽が変わらないためこの障害がない。

## 6. 射影の場合の論理的な読み方

$R$ を $X\times Z$ 上の部分対象、$B$ を $X$ 上の部分対象、$\pi:X\times Z\to X$ を射影とする。写像 $g:X'\to X$ による代入では $h=g\times 1_Z$、$\pi':X'\times Z\to X'$ を使う。

この四角形は引き戻しになる。実際、$u:T\to X\times Z$、$v:T\to X'$ が $\pi u=gv$ を満たせば、$u$ の第二成分を $z:T\to Z$ と書くと、[積の普遍性](../../CAT/CAT2-04/index.md#def-cat2-04-small-product) から成分 $(v,z)$ を持つ唯一の射 $T\to X'\times Z$ が得られる。この射を $h$ と合成した成分は $(gv,z)$ なので $u$ と一致する。

[存在量化の基底変換](../CATB4-07/index.md#thm-catb4-07-beck-chevalley) と [全称量化の基底変換](#thm-catb6-03-universal-beck-chevalley) を適用する。

$$
g^*\exists_\pi R=\exists_{\pi'}h^*R,\qquad
g^*\forall_\pi R=\forall_{\pi'}h^*R.
$$

集合で $h^*R(x',z)$ は $R(g(x'),z)$ を意味する。従って、自由変数 $x$ に $g(x')$ を代入することと、束縛変数 $z$ を量化することを交換できる。

また [Frobenius相互法則](#thm-catb6-03-frobenius) を射影に適用すれば

$$
\exists_\pi(R\wedge\pi^*B)=\exists_\pi R\wedge B.
$$

これは、$z$ に依存しない条件 $B(x)$ を存在量化の外に出せることを表す。両法則は次講で圏の構造から論理の推論を解釈する基礎になる。

## 7. 演習

### CATB6-03-A01 引き戻しを列挙する

- Level: A

$X=\{1,2,3\}$、$Y=\{a,b\}$、$Y'=\{p,q\}$ とし、$f(1)=f(2)=a$、$f(3)=b$、$g(p)=g(q)=b$ とする。引き戻し集合と二射影を求め、普遍性を確認せよ。

<!-- solution-start -->
**詳細解答**

[引き戻しの定義](../../CAT/CAT2-03/index.md#def-cat2-03-pullback) に従い $f(x)=g(y')$ となる組を探す。$p,q$ とも値が $b$ で、$f(x)=b$ となるのは $x=3$ だけである。

$$
X'=\{(3,p),(3,q)\}.
$$

$h(3,p)=h(3,q)=3$、$f'(3,p)=p$、$f'(3,q)=q$ とすれば $fh=gf'$ である。任意の集合 $T$ と $fu=gv$ を満たす写像 $u:T\to X$、$v:T\to Y'$ に対し、各 $t$ について $u(t)=3$ なので $(3,v(t))\in X'$ となる。これを値とする写像は両射影を復元し、その二成分を指定すれば一意である。
<!-- solution-end -->

### CATB6-03-A02 存在量化を二経路で計算する

- Level: A

$X=\{1,2,3\}$、$Y=\{a,b,c\}$、$Y'=\{p,q,r\}$、$f(1)=f(2)=a$、$f(3)=b$、$g(p)=a,g(q)=b,g(r)=c$ とする。$A=\{2,3\}$ に対し引き戻し四角形で存在量化の等式を計算せよ。

<!-- solution-start -->
**詳細解答**

$X'=\{(1,p),(2,p),(3,q)\}$ である。[集合の量化子](../CATB6-02/index.md#def-catb6-02-quantifiers) から $\exists_f A=\{a,b\}$ なので $g^*\exists_f A=\{p,q\}$ となる。一方 $h^*A=\{(2,p),(3,q)\}$ であり、第二射影の像は $\{p,q\}$ である。従って [存在量化の基底変換](../CATB4-07/index.md#thm-catb4-07-beck-chevalley) の両辺が一致する。
<!-- solution-end -->

### CATB6-03-A03 全称量化と空ファイバー

- Level: A

A02 の写像を全て明示し直すと、$f:\{1,2,3\}\to\{a,b,c\}$ は $1,2\mapsto a,3\mapsto b$、$g:\{p,q,r\}\to\{a,b,c\}$ は $p\mapsto a,q\mapsto b,r\mapsto c$ である。$A=\{2,3\}$ に対し引き戻し四角形で全称量化を二経路で計算せよ。

<!-- solution-start -->
**詳細解答**

元のファイバーは $\{1,2\},\{3\},\varnothing$ で、第二と第三だけが $A$ に含まれる。従って $\forall_f A=\{b,c\}$、$g^*\forall_f A=\{q,r\}$。引き戻しは $\{(1,p),(2,p),(3,q)\}$ で、$h^*A=\{(2,p),(3,q)\}$ となる。$p$ のファイバーには $(1,p)$ があり失敗し、$q$ の唯一の組は含まれる。$r$ のファイバーは空なので含まれる。よって $\forall_{f'}h^*A=\{q,r\}$ となり、[全称量化の基底変換](#thm-catb6-03-universal-beck-chevalley) を確認した。
<!-- solution-end -->

### CATB6-03-A04 連言の型と計算

- Level: A

$f:\{1,2,3,4\}\to\{a,b\}$ を $1,2\mapsto a,3,4\mapsto b$ とする。$A=\{1,2,4\}$、$B=\{b\}$ について Frobenius の等式を確認せよ。

<!-- solution-start -->
**詳細解答**

$A$ は始域、$B$ は終域上の部分集合であるため先に逆像を取る。$f^*B=\{3,4\}$、$A\cap f^*B=\{4\}$ なのでその像は $\{b\}$ である。逆順では $f(A)=\{a,b\}$、これと $B$ の共通部分は $\{b\}$ となる。[Frobenius相互法則](#thm-catb6-03-frobenius) の両辺は終域上の同じ部分集合である。
<!-- solution-end -->

### CATB6-03-B01 可換四角形の真の包含

- Level: B

$X=\{1,2\}$、$Y=Y'=\{a\}$、$f$ は定値写像、$g$ は恒等写像、$X'=\{1\}$、$h$ は包含、$f'=fh$ とする。$A=\{2\}$ で存在量化の比較が真の包含となり、$A=\{1\}$ で全称量化の比較が真の包含になることを示せ。引き戻しでない理由も述べよ。

<!-- solution-start -->
**詳細解答**

$g f'=f'=fh$ なので可換である。$A=\{2\}$ では $h^*A=\varnothing$、従って $\exists_{f'}h^*A=\varnothing$。一方 $f(2)=a$ なので $g^*\exists_f A=\{a\}$。$A=\{1\}$ では元のファイバー $\{1,2\}$ は $A$ に含まれないので $g^*\forall_f A=\varnothing$。新しいファイバー $\{1\}$ は $h^*A=\{1\}$ に含まれるため $\forall_{f'}h^*A=\{a\}$。[可換四角形の量化子比較](#prop-catb6-03-comparison) の両方向がそれぞれ真の包含となる。

一元集合から $2$ を選ぶ写像と、$a$ を選ぶ写像は $f,g$ の下で一致する。しかし $h$ の値は $1$ に限られるため媒介射が存在しない。引き戻しの普遍性が失われている。
<!-- solution-end -->

### CATB6-03-B02 全称量化を随伴で移す

- Level: B

局所小な初等トポスで $f:X\to Y$、$g:Y'\to Y$ の引き戻し $X'$ の射影を $h:X'\to X$、$f':X'\to Y'$ とする。$A\in\operatorname{Sub}(X)$、$D\in\operatorname{Sub}(Y')$ に対し $g^*\forall_f A\ge D$ と $h^*A\ge(f')^*D$ の同値を、全称量化の基底変換そのものを引用せずに示せ。

<!-- solution-start -->
**詳細解答**

[量化子の随伴条件](../CATB6-02/index.md#def-catb6-02-quantifiers) の左随伴条件を $g$、右随伴条件を $f$ に適用する。

$$
D\le g^*\forall_f A
\iff \exists_g D\le\forall_f A
\iff f^*\exists_g D\le A.
$$

[f と g を入れ替えた存在量化の基底変換](../CATB4-07/index.md#thm-catb4-07-beck-chevalley) により $f^*\exists_g D=\exists_h(f')^*D$ である。従って残る条件は $\exists_h(f')^*D\le A$。左随伴条件を $h$ に適用すると $(f')^*D\le h^*A$ となる。全て同値変形なので逆方向も成立する。
<!-- solution-end -->

### CATB6-03-B03 Frobenius から像の制限を読む

- Level: B

局所小な初等トポスで射 $f:X\to Y$ と $B\in\operatorname{Sub}(Y)$ を取る。$\top_X$ は $1_X$ が表す最大部分対象とする。$\exists_f f^*B=\exists_f\top_X\wedge B$ を示し、$f$ が正則エピ射の場合の値を求めよ。

<!-- solution-start -->
**詳細解答**

[部分対象の最大元と共通部分](../CATB6-01/index.md#prop-catb6-01-subobject-meet) により $\top_X\wedge f^*B=f^*B$ である。[Frobenius相互法則](#thm-catb6-03-frobenius) に $A=\top_X$ を代入すると

$$
\exists_f f^*B=\exists_f(\top_X\wedge f^*B)
=\exists_f\top_X\wedge B.
$$

[量化子の存在](../CATB6-02/index.md#thm-catb6-02-quantifier-existence) から $\exists_f\top_X$ は $f1_X=f$ の像である。$f$ が正則エピ射なら $f=1_Y f$ が正則エピ・モノ分解である。[正則エピ・モノ分解は像を与える](../CATB1-01/index.md#thm-catb1-01-regular-epi-mono-image) によりその像は $\top_Y$ となる。従って $\exists_f f^*B=\top_Y\wedge B=B$。
<!-- solution-end -->

### CATB6-03-B04 全称量化と連言を混同しない

- Level: B

集合の包含 $f:\{1\}\to\{1,2\}$、$A=\{1\}$、$B=\{1\}$ に対して $\forall_f(A\cap f^*B)$ と $\forall_f A\cap B$ を計算せよ。Frobenius の式で存在量化を全称量化に置き換えると失敗する理由を述べよ。

<!-- solution-start -->
**詳細解答**

$f^*B=\{1\}$ なので $A\cap f^*B=\{1\}$ である。[集合の量化子](../CATB6-02/index.md#def-catb6-02-quantifiers) により $1$ のファイバー $\{1\}$ も $2$ の空ファイバーもこの集合に含まれる。従って $\forall_f(A\cap f^*B)=\{1,2\}$。$\forall_f A$ も $\{1,2\}$ だが、それと $B$ の共通部分は $\{1\}$ であり一致しない。$2$ には調べる元がないため全称量化の内側の連言は空虚に真となるが、外側に置いた $B$ は偽となる。
<!-- solution-end -->

### CATB6-03-C01 基底変換と連言の連続使用

- Level: C

局所小な初等トポスで $f:X\to Y$、$g:Y'\to Y$ の引き戻し $X'$ の射影を $h:X'\to X$、$f':X'\to Y'$ とする。$A$ を $X$ 上、$D$ を $Y'$ 上の部分対象とする。

(1) 次の等式を示せ。

$$
\exists_{f'}(h^*A\wedge(f')^*D)=g^*\exists_f A\wedge D.
$$

(2) 集合で $X=\{1,2,3\}$、$Y=\{a,b\}$、$Y'=\{p,q,r\}$、$f(1)=f(2)=a,f(3)=b$、$g(p)=g(q)=a,g(r)=b$、$A=\{2,3\}$、$D=\{q,r\}$ として両辺を計算せよ。

<!-- solution-start -->
**詳細解答**

(1) $h^*A$ と $(f')^*D$ はともに $X'$ 上の部分対象である。[Frobenius相互法則](#thm-catb6-03-frobenius) において射を $f'$、始域上の述語を $h^*A$、終域上の述語を $D$ とすれば

$$
\exists_{f'}(h^*A\wedge(f')^*D)=\exists_{f'}h^*A\wedge D.
$$

次に仮定の四角形は引き戻しなので、[存在量化の基底変換](../CATB4-07/index.md#thm-catb4-07-beck-chevalley) により $\exists_{f'}h^*A=g^*\exists_f A$ を代入できる。これで結論を得る。

(2) 引き戻しは

$$
X'=\{(1,p),(2,p),(1,q),(2,q),(3,r)\}.
$$

逆像は $h^*A=\{(2,p),(2,q),(3,r)\}$ と $(f')^*D=\{(1,q),(2,q),(3,r)\}$ である。共通部分は $\{(2,q),(3,r)\}$ となる。その第二成分の集合は $\{q,r\}$。右辺では $\exists_f A=\{a,b\}$、$g^*\exists_f A=\{p,q,r\}$ なので、$D$ との共通部分は $\{q,r\}$ となる。新しい基底上でのみ与えられた $D$ で絞る場合にも、量化前後の二つの操作が一致している。
<!-- solution-end -->

## 8. まとめ

- 引き戻しは基底変更後に元のファイバーを漏れなく再現する。存在量化の基底変換は正則圏の像の安定性から、全称量化の基底変換は向きを入れ替えた存在量化の等式と随伴から従う。
- 可換性だけでも一方向の比較はできるが、逆向きの包含には引き戻し等の追加条件が必要である。
- Frobenius 相互法則により、量化する変数に依存しない連言を存在量化の内外で交換できる。任意の連言や全称量化に無条件で拡張することはできない。

次講では、これらの操作を有限積・等号・存在量化・有限選言を持つ論理の推論へ結び付ける。
