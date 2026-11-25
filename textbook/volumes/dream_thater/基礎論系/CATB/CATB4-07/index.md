# CATB4-07 部分対象ファイブレーション

## 1. 部分集合を別の集合の上で観察する

写像 $f:X\to Y$ があるとき、$Y$ の部分集合 $B$ に入る点を $X$ 上で調べるには逆像を取る。逆に $X$ の部分集合 $A$ がどこへ送られるかを知るには像を取る。例えば $X=\{0,1,2\}$、$Y=\{a,b,c\}$ とし、$f(0)=f(1)=a$、$f(2)=b$ とする。$B=\{a,c\}$ の逆像は $\{0,1\}$、$A=\{1,2\}$ の像は $\{a,b\}$ である。

この二つの操作は別々に見えるが、「$A$ のすべての点が $B$ に送られる」という一つの条件を異なる側から書いている。前講の[前向き持ち上げと左随伴の対応](../CATB4-06/index.md#thm-catb4-06-opfibration-adjoint)を、今度は部分集合に相当する対象に適用したい。一般の圏には元がないことがあるので、逆像は[引き戻し](../../CAT/CAT2-03/index.md#def-cat2-03-pullback)で、像は[正則エピ・モノ分解](../CATB1-02/index.md#thm-catb1-02-regular-factorization)で表す。

以下、合成は右から左に書く。圏は[局所小圏](../../CAT/CAT1-02/index.md#def-cat1-02-size)（二対象を固定したとき射の集まりが集合になる圏）とする。さらに各対象を終域とするモノ射の、終域を固定した同型による同値類が集合をなすと仮定する。この小ささの仮定は、後で定める順序集合を通常の集合として扱うためであり、個々の普遍性の計算には不要である。

## 2. 部分集合をモノ射の同型類に置き換える

集合の部分集合はその包含写像で表せる。一方、単射 $m:M\to X$ の始域 $M$ 自体は $X$ の部分集合でなくてもよい。始域の名前だけを変えても、$X$ 内で表す部分は変わらない。そこで [モノ射](../../CAT/CAT1-03/index.md#def-cat1-03-monomorphism) を、終域を固定した[同型射](../../CAT/CAT1-03/index.md#def-cat1-03-isomorphism)で同一視する。

<a id="def-catb4-07-subobject"></a>

<!-- formal-statement-start -->
> **定義（部分対象）**
>
> 局所小圏の対象 $X$ へのモノ射 $m:M\to X$ と $n:N\to X$ に対し、同型射 $i:M\to N$ で $ni=m$ を満たすものが存在するとき、両者を同一視する。その同値類 $[m]$ を $X$ の部分対象とし、全体を $\operatorname{Sub}(X)$ と書く。
>
> 順序は、次の条件を満たす射 $h:M\to N$ が存在することによって定める。

$$
[m]\le [n]\quad\Longleftrightarrow\quad
\exists h:M\to N,\quad nh=m.
$$
<!-- formal-statement-end -->

<!-- definition-example-start: def-catb4-07-subobject -->
**定義の確認**。$X=\{a,b,c\}$ に対し、$m:\{0,1\}\to X$ を $m(0)=a,m(1)=c$、$n:\{a,c\}\to X$ を包含写像とする。どちらも単射なので[集合における三つの特徴づけ](../../CAT/CAT1-03/index.md#prop-cat1-03-set-characterization)によりモノ射である。$i(0)=a,i(1)=c$ と定めると、逆写像は $a\mapsto0,\ c\mapsto1$ である。従って同じ[集合における特徴づけ](../../CAT/CAT1-03/index.md#prop-cat1-03-set-characterization)から同型射である。二つの合成値を確認すると

$$
ni(0)=a=m(0),\qquad ni(1)=c=m(1).
$$

よって $ni=m$ である。従って同じ部分対象を表す。

さらに包含写像 $k:\{a\}\to X$ も単射なのでモノ射である。$h:\{a\}\to\{a,c\}$ を $h(a)=a$ と定めれば $nh=k$ なので $[k]\le[n]$ である。逆向きには $kh'=n$ を満たす $h':\{a,c\}\to\{a\}$ が必要だが、$h'(c)=a$ しかなく $kh'(c)=a\ne c=n(c)$ となる。順序は真の包含を識別する。
<!-- definition-example-end -->

同一視が同値関係になることも確認する。$m1_M=m$ なので反射的である。$ni=m$ なら $mi^{-1}=n$ なので対称的である。

推移性について、さらにモノ射 $o:O\to X$ と同型射 $j:N\to O$ が $oj=n$ を満たすとする。

$$
o(ji)=ni=m.
$$

[同型射の合成](../../CAT/CAT1-03/index.md#prop-cat1-03-composition)も同型なので推移的である。

順序の定義も代表元に依存しない。実際 $m=m'i$、$n=n'j$ で $i,j$ が同型なら、$nh=m$ から

$$
n'(jhi^{-1})=m'
$$

を得る。逆は $i,j$ の逆射を用いる。反射律は恒等射、推移律は因子射の合成による。

反対称性について、$nh=m$、$mk=n$ と仮定する。これらを互いに代入すると

$$
mkh=nh=m=m1_M,\qquad nhk=mk=n=n1_N.
$$

$m,n$ の[モノ射の左消去律](../../CAT/CAT1-03/index.md#def-cat1-03-monomorphism)から

$$
kh=1_M,\qquad hk=1_N
$$

となる。従って $h$ は同型で $[m]=[n]$ となる。

また $nh=m=nh'$ なら同じ左消去律から $h=h'$ なので、[順序圏](../../CAT/CAT1-02/index.md#prop-cat1-02-order-category)として見たとき各 Hom 集合は空または一元集合である。

集合では任意の単射 $m:M\to X$ に対し、値の集合 $S=\{m(x)\mid x\in M\}$ を取る。$M\to S,\ x\mapsto m(x)$ は全単射で、$S\to X$ を包含写像とするとその合成は $m$ である。よって $[m]$ は $S$ の包含写像の同型類に等しい。

二つの部分集合 $S,T$ の包含写像については、因子射が存在することと一方の部分集合が他方に含まれることが同値である。実際 $S\subseteq T$ なら包含写像 $S\to T$ を使え、逆に因子射があれば $S$ の各点は $T$ に属する。従って $\operatorname{Sub}(X)$ は部分集合の包含順序と同型である。

以降、集合の場合は包含写像の同型類を部分集合そのもので表す。一般の圏では $A,B,D$ などの大文字で部分対象の同型類を表し、代表射とは区別する。

## 3. 逆像の普遍性

$f:X\to Y$ とモノ射 $n:N\to Y$ を取る。$X$ 内で $f$ によって $N$ に入る部分を作るには、$f$ と $n$ の[引き戻し](../../CAT/CAT2-03/index.md#def-cat2-03-pullback)を用いる。射影を

$$
p:P\to X,\qquad q:P\to N,\qquad fp=nq
$$

と書く。[モノ射の引き戻し](../../CAT/CAT2-03/index.md#prop-cat2-03-pullback-mono)により $p$ はモノ射である。

その同型類を逆像 $f^*[n]$ と書く。上付きの $*$ は射 $f$ に沿う逆像操作を表し、$f$ の逆射が存在するという意味ではない。

集合で $B\subseteq Y$ の場合は

$$
f^*B=f^{-1}(B)=\{x\in X\mid f(x)\in B\}
$$

という通常の集合の逆像に対応する。実際、包含写像 $n:B\to Y$ に対する引き戻しの元は $(x,b)$ で $f(x)=b$ を満たすものだから、第一射影の値はちょうど $f(x)\in B$ を満たす $x$ である。各 $x$ に対応する $b$ は $f(x)$ の一つだけなので、第一射影はこの逆像への全単射になる。

<a id="thm-catb4-07-inverse-image"></a>

<!-- formal-statement-start -->
> **定理（部分対象の逆像）**
>
> 引き戻しを持ち各対象の部分対象全体が集合になる局所小圏で、射 $f:X\to Y$ に沿う部分対象の逆像は順序を保つ写像

$$
f^*:\operatorname{Sub}(Y)\to\operatorname{Sub}(X)
$$

> を定める。恒等射の逆像は恒等写像であり、$g:Y\to Z$ に対して $(gf)^*=f^*g^*$ が成立する。
<!-- formal-statement-end -->

見取り図：引き戻しの射影がモノ射であることを使い、因子射は引き戻しの媒介射に変換する。二回の逆像は二回の普遍性により一回の逆像になる。

<!-- proof-start -->
### 証明

[モノ射の引き戻し](../../CAT/CAT2-03/index.md#prop-cat2-03-pullback-mono)により $p$ はモノ射である。$n=n'i$ で $i$ が同型なら、$f,n$ の引き戻しから $f,n'$ の引き戻しへの媒介射は成分 $p,iq$ で与えられる。逆方向は $i^{-1}$ を使い、二つの合成は射影を変えないから普遍性の一意性で恒等射となる。引き戻しの選択の違いも両射影を保つ同型で吸収される。

一般に $n=n'h$ の場合も、$f,n'$ の引き戻しを $(P',p',q')$ とすれば

$$
fp=nq=n'hq
$$

なので $p'u=p,\ q'u=hq$ となる媒介射 $u:P\to P'$ が存在する。従って $[p]\le[p']$ となり、順序を保つ。

恒等射 $1_Y$ と $n$ の引き戻しには $P=N,p=n,q=1_N$ を使える。合成について、$k:K\to Z$ をモノ射とし、$g,k$ の引き戻しを $(Q,r:Q\to Y,s:Q\to K)$、$f,r$ の引き戻しを $(P,p:P\to X,t:P\to Q)$ とする。

$$
gfp=grt=kst.
$$

任意の $x:T\to X,\ z:T\to K$ が $gfx=kz$ を満たすなら、最初の引き戻しから $rv=fx,\ sv=z$ を満たす唯一の $v:T\to Q$ が得られる。次の引き戻しから $pu=x,\ tu=v$ を満たす唯一の $u:T\to P$ が得られ、$stu=z$ となる。別の $u'$ が $pu'=x,stu'=z$ を満たせば $rtu'=fx$ でもあるので $tu'=v$、続いて $u'=u$ となる。よって $(P,p,st)$ は $gf,k$ の引き戻しであり、同型類で $(gf)^*=f^*g^*$ が成立する。
<!-- proof-end -->

集合の例では $f^*\{a,c\}=\{0,1\}$ である。集合としての引き戻しは $\{(0,a),(1,a)\}$ だが、第一射影によって $\{0,1\}$ と全単射になるので同じ部分対象である。

## 4. すべての部分対象を一つの圏に集める

一つの $X$ の上では包含だけを比較した。異なる $X,Y$ の上の部分対象も、基底の射 $f:X\to Y$ を指定すれば比較できる。$[m]\le f^*[n]$ とは、$X$ 内の部分 $m$ が、$n$ に入る部分に含まれることを意味する。これを全圏の射として記録する。第3節の逆像の合成則を使えば圏を作ることができ、さらに[ファイブレーション](../CATB4-01/index.md#def-catb4-01-fibration)の条件、すなわち任意の基底射とその終点上の対象に対する[Cartesian持ち上げ](../CATB4-01/index.md#def-catb4-01-cartesian)の存在も調べられる。ここで基底射を指定すると全圏の射は存在するか否かのいずれかで、存在すれば一つに決まる。

<a id="def-catb4-07-subobject-fibration"></a>

<!-- formal-statement-start -->
> **定義（部分対象ファイブレーション）**
>
> 引き戻しを持ち各対象の部分対象全体が集合になる局所小圏 $\mathcal C$ について、部分対象の全圏の対象を $(X,A)$（$A\in\operatorname{Sub}(X)$）とする。$(X,A)$ から $(Y,B)$ への射は、次を満たす基底射 $f:X\to Y$ とする。

$$
A\le f^*B.
$$

> 合成と恒等射は基底圏のものを使い、射影 $p$ は対象 $(X,A)$ を $X$ に、射をその基底射に送る。この射影を部分対象ファイブレーションと呼ぶ（ファイブレーションであることは直後の定理で証明する）。
<!-- formal-statement-end -->

<!-- definition-example-start: def-catb4-07-subobject-fibration -->
**定義の確認**。第1節の写像 $f$ に対し、$A=\{0,1\}$、$B=\{a\}$ なら $A=f^*B$ なので射がある。$A'=\{0,2\}$ では $2\notin f^*B$ なので同じ基底射の上に射はない。恒等写像の上では $A\subseteq A$ によって恒等射がある。$g:Y\to\{z\}$ を定値写像とすると、$B\subseteq g^*\{z\}=Y$ だから $g$ の上に射があり、合成でも $A\subseteq(gf)^*\{z\}=X$ が成立する。射影は、この合成を $gf$ に、恒等射を $1_X$ に送る。

さらに $B=\{a\}$ の持ち上げとして $(X,\{0,1\})\to(Y,B)$ を取る。任意の写像 $u:W\to X$ と部分集合 $D\subseteq W$ に対し、$fu$ 上の射が存在するとは

$$
D\subseteq\{w\in W\mid f(u(w))=a\}
=\{w\in W\mid u(w)\in\{0,1\}\}
$$

ということである。従って $u$ 上の射 $(W,D)\to(X,\{0,1\})$ が存在する。基底射 $u$ が指定されているので一意であり、合成は元の $fu$ 上の射になる。この例でもCartesian射の存在と一意性を直接確認できた。
<!-- definition-example-end -->

一般にも[部分対象の逆像](#thm-catb4-07-inverse-image)によって $1_X^*A=A$ であり、$A\le f^*B$、$B\le g^*D$ から

$$
A\le f^*B\le f^*g^*D=(gf)^*D
$$

となる。従って恒等射・合成は定義でき、結合律と単位律は基底圏から従う。射影も合成と恒等射を保つ。

<a id="thm-catb4-07-cartesian"></a>

<!-- formal-statement-start -->
> **定理（部分対象のCartesian持ち上げ）**
>
> 引き戻しを持ち各対象の部分対象全体が集合になる局所小圏に対し、部分対象の全圏から基底圏への射影はファイブレーションである。基底射 $f:X\to Y$ と部分対象 $B$ に対し、$f$ 上の射

$$
(X,f^*B)\longrightarrow(Y,B)
$$

> はCartesian射である。$X$ 上のファイバー圏は $\operatorname{Sub}(X)$ を順序圏とみなしたものである。
<!-- formal-statement-end -->

見取り図：任意の射の存在条件を逆像の合成則で書き直すと、ちょうど持ち上げを経由する射の存在条件になる。基底射を固定すれば媒介射は高々一つである。

<!-- proof-start -->
### 証明

持ち上げの射は $f^*B\le f^*B$ によって存在する。[Cartesian射の定義](../CATB4-01/index.md#def-catb4-01-cartesian)に従い、対象 $(W,D)$、射 $u:W\to X$、$fu$ 上の射 $(W,D)\to(Y,B)$ を任意に取る。後者の存在条件を[部分対象の逆像の合成則](#thm-catb4-07-inverse-image)で書き直すと

$$
D\le (fu)^*B=u^*(f^*B)
$$

であるから、$u$ 上の射 $(W,D)\to(X,f^*B)$ が存在する。合成の基底射は $fu$ であり、始域と終域を固定した全圏の射は基底射だけで決まるので、元の射と一致する。同じ $u$ 上の別の媒介射はない。従ってCartesian射であり、任意の $f,B$ に対し構成できるため[ファイブレーションの定義](../CATB4-01/index.md#def-catb4-01-fibration)を満たす。

[ファイバー圏](../CATB4-01/index.md#def-catb4-01-fiber)の射は $1_X$ 上の射であり、存在条件は $A\le1_X^*B=B$ である。合成は順序の推移律で与えられるので、部分対象の順序圏そのものである。
<!-- proof-end -->

ここでは逆像を同型類で扱ったため、持ち上げの始域は恒等射や合成について厳密な等号を満たす。

## 5. 正則圏では像が逆像の左随伴になる

逆向きの移動だけなら引き戻しで十分である。前向きの移動には、$m:M\to X$ と $f:X\to Y$ の合成 $fm$ がモノ射とは限らないという障害がある。$fm$ をその値の範囲を表すモノ射に置き換えるため、[正則圏](../CATB1-02/index.md#def-catb1-02-regular-category)を仮定する。正則圏には有限極限があり、[正則圏の像分解とその引き戻し安定性](../CATB1-02/index.md#thm-catb1-02-regular-factorization)によって

$$
M\xrightarrow{e}I\xrightarrow{i}Y,\qquad fm=ie
$$

と分解できる。$e$ は[正則エピ射](../CATB1-01/index.md#def-catb1-01-regular-epi)、$i$ はモノ射である。$\exists_f[m]=[i]$ と書く。記号 $\exists_f$ の添字 $f$ は像を取る基底射を表す。

集合の場合に $A=[m]$ を部分集合として表せば、$\exists$ は次の存在条件を表す。

$$
f(A)=\{y\in Y\mid \exists x\in A,\ y=f(x)\}.
$$

実際、集合では合成 $fm$ をその値の集合への全射と包含写像に分解できる。[集合の正則エピ射と全射](../CATB1-01/index.md#thm-catb1-01-set-regular-epi)および[集合のモノ射と単射の対応](../../CAT/CAT1-03/index.md#prop-cat1-03-set-characterization)から、これが正則エピ・モノ分解になる。従って $\exists_f A$ は通常の集合の像 $f(A)$ に一致する。

<a id="thm-catb4-07-image-adjoint"></a>

<!-- formal-statement-start -->
> **定理（部分対象の像と逆像の随伴）**
>
> 各対象の部分対象全体が集合になる正則圏の射 $f:X\to Y$ に沿う像は順序を保つ写像 $\exists_f:\operatorname{Sub}(X)\to\operatorname{Sub}(Y)$ を定める。任意の $A\in\operatorname{Sub}(X)$、$B\in\operatorname{Sub}(Y)$ について

$$
\exists_f A\le B\quad\Longleftrightarrow\quad A\le f^*B.
$$

> 従って $\exists_f$ は $f^*$ の左随伴である。
<!-- formal-statement-end -->

見取り図：両側の不等式は、合成 $fm$ が $n:N\to Y$ を経由するという一条件と同値である。左側には像の最小性、右側には引き戻しの普遍性を使う。

<!-- proof-start -->
### 証明

$A=[m]$、$B=[n]$ とし、$fm=ie$ を上の分解とする。[正則エピ・モノ分解は像を与える](../CATB1-01/index.md#thm-catb1-01-regular-epi-mono-image)により $i$ は $fm$ が経由するモノ射の中で最小である。

$\exists_f A\le B$ なら $nk=i$ となる $k:I\to N$ が存在し、$fm=ie=nke$ なので $fm$ は $n$ を経由する。逆に $fm=nh$ なら像の最小性を $n$ に適用して $nk=i$ を得る。従って $\exists_f A\le B$ と $fm$ が $n$ を経由することは同値である。

$f,n$ の引き戻しを $(P,p:P\to X,q:P\to N)$ とする。$A\le f^*B$ なら $pu=m$ となる $u:M\to P$ が存在し、

$$
fm=fpu=nqu
$$

を得る。逆に $fm=nh$ なら[引き戻しの普遍性](../../CAT/CAT2-03/index.md#def-cat2-03-pullback)により $pu=m,qu=h$ となる $u$ が存在するので $A\le f^*B$ である。

像の最小性から像の同型類は分解の選択に依存しない。代表元を $m=m'j$ と同型 $j$ で変えても、$fm$ が任意のモノ射を経由することと $fm'$ が経由することは $j,j^{-1}$ で同値になる。よって同じ最小部分対象を得る。さらに $m=m'v$ なら $fm=fm'v$ だから、$fm'$ の像を $i'$ とすれば $fm$ も $i'$ を経由する。像の最小性から $\exists_f[m]\le\exists_f[m']$ となる。

以上より二写像は順序関手であり、[半順序圏の随伴判定](../../CAT/CAT2-08/index.md#thm-cat2-08-poset)に不等式の同値を適用すると $\exists_f\dashv f^*$ となる。
<!-- proof-end -->

例えば第1節の $A=\{1,2\}$ では $\exists_f A=\{a,b\}$ である。$B=\{a,c\}$ のとき左側は $b$ のため偽、右側も $2$ のため偽である。$B=\{a,b\}$ に変えると両側が真になる。一般にも $B=\exists_f A$ と $A=f^*B$ をそれぞれ代入すると、随伴の二つの不等式

$$
A\le f^*\exists_f A,\qquad \exists_f f^*B\le B
$$

を得る。前者は像を取って戻すと元の部分対象を含むこと、後者は逆像を取って送り返すと元の部分対象に含まれることを表す。

## 6. 観察する基底を変えても像の計算は一致するか

次の四射を考える。下辺 $f:X\to Y$、右辺 $g:Y'\to Y$、左辺 $h:X'\to X$、上辺 $f':X'\to Y'$ があり、$fh=gf'$ とする。さらに $X'$ は $f,g$ の引き戻しとする。$X$ の部分対象 $A$ を先に $Y$ に送って $Y'$ へ逆像で戻す方法と、先に $X'$ に戻してから $Y'$ へ送る方法を比較する。

<a id="thm-catb4-07-beck-chevalley"></a>

<!-- formal-statement-start -->
> **定理（部分対象のBeck–Chevalley等式）**
>
> 各対象の部分対象全体が集合になる正則圏において $f:X\to Y$ と $g:Y'\to Y$ の引き戻しを $X'$、その射影を $h:X'\to X$ と $f':X'\to Y'$ とする。このとき次の二つの順序関手は等しい。

$$
g^*\exists_f=\exists_{f'}h^*:
\operatorname{Sub}(X)\longrightarrow\operatorname{Sub}(Y').
$$
<!-- formal-statement-end -->

見取り図：$fm$ の像を取った後に $g$ で引き戻す。この分解を丸ごと引き戻すと、始域側は $h^*A$ を表し、モノ射側は $g^*\exists_f A$ を表す。正則エピ射が引き戻しで保たれることが核心である。

<!-- proof-start -->
### 証明

$A=[m:M\to X]$ とし、$fm=ie$ を正則エピ・モノ分解とする。$i:I\to Y$ と $g$ の引き戻しを $J$、射影を $j:J\to I,\ n:J\to Y'$ とする。$e:M\to I$ と $j$ の引き戻しを $P$、射影を $a:P\to M,\ b:P\to J$ とする。

$$
ij=gn,\qquad ea=jb.
$$

$n$ は[モノ射の引き戻し](../../CAT/CAT2-03/index.md#prop-cat2-03-pullback-mono)によりモノ射で、$b$ は[正則圏の定義](../CATB1-02/index.md#def-catb1-02-regular-category)の引き戻し安定性により正則エピ射である。従って[正則エピ・モノ分解は像を与える](../CATB1-01/index.md#thm-catb1-01-regular-epi-mono-image)により $nb$ の像は $n$ であり、$[n]=g^*[i]$ である。

次に $h,m$ の引き戻しを $L$、射影を $\ell:L\to X',\ d:L\to M$ と置く。$\ell$ は[モノ射の引き戻し](../../CAT/CAT2-03/index.md#prop-cat2-03-pullback-mono)によりモノ射で $h^*A=[\ell]$ である。$L$ と $P$ を比較する。

まず $P$ について

$$
fma=iea=ijb=gnb
$$

である。逆に任意の $v:T\to M,\ w:T\to Y'$ が $fmv=gw$ を満たせば、$iev=gw$ より $J$ への唯一の射 $s$ があり $js=ev,\ ns=w$ となる。次いで $P$ への唯一の射 $t$ があり $at=v,\ bt=s$ となる。別の $t'$ が $at'=v,\ nbt'=w$ を満たせば $jbt'=eat'=ev$ から $bt'=s$、さらに $t'=t$ である。よって $(P,a,nb)$ は $fm,g$ の引き戻しである。

一方、$h\ell=md$ と $fh=gf'$ から

$$
fmd=fh\ell=gf'\ell.
$$

同じ $v,w$ に対し、$X'$ の普遍性を $(mv,w)$ に適用して $hu=mv,\ f'u=w$ となる唯一の $u:T\to X'$ を得る。$L$ の普遍性を $(u,v)$ に適用して $\ell k=u,\ dk=v$ となる唯一の $k:T\to L$ を得る。もし $dk'=v,\ f'\ell k'=w$ なら $h\ell k'=mv$ から $\ell k'=u$、続いて $k'=k$ となる。

従って $(L,d,f'\ell)$ も $fm,g$ の引き戻しである。普遍性の一意性により $P$ と $L$ の間には両射影を保つ同型 $\theta:L\to P$ があり、

$$
f'\ell=nb\theta.
$$

$b\theta$ は[正則エピ射の定義](../CATB1-01/index.md#def-catb1-01-regular-epi)を満たす。実際 $b$ を二射 $r,s:R\to P$ の余等化子とすれば、$b\theta$ は $\theta^{-1}r,\theta^{-1}s$ の余等化子になる。両射を等化する $L$ からの射 $k$ に対し、$k\theta^{-1}$ が $r,s$ を等化するので $b$ を経由する唯一の射が得られ、$\theta$ を合成すれば $k$ の因子分解となる。

従って $f'\ell=n(b\theta)$ は正則エピ・モノ分解であり、[正則エピ・モノ分解は像を与える](../CATB1-01/index.md#thm-catb1-01-regular-epi-mono-image)により

$$
\exists_{f'}h^*A=[n]=g^*\exists_f A.
$$

任意の $A$ で成立する。順序圏では射は端点を指定すれば高々一つだから、関手としても等しい。
<!-- proof-end -->

集合で $Y'=\{p,q,r\}$、$g(p)=g(q)=a,\ g(r)=c$ とする。第1節の $f$ を用いると

$$
X'=\{(0,p),(0,q),(1,p),(1,q)\}.
$$

$A=\{1,2\}$ の像は $\{a,b\}$ だから $g^*\exists_f A=\{p,q\}$ である。逆順にすると $h^*A=\{(1,p),(1,q)\}$ となり、第二射影 $f'$ の像も $\{p,q\}$ となる。$2$ は基底変更後に対応先を持たないが、両経路で正しく除かれる。

単に可換な四角形だけでは等式にならない。$X=Y=Y'=\{0\}$、$f=g=1$、$X'=\varnothing$ として二つの空写像を取る。$A=X$ なら左辺は $\{0\}$、右辺は空集合である。欠けている仮定は引き戻しの普遍性であり、$T=\{0\}$ からの二つの恒等写像に対応する $T\to X'$ が存在しない。上の証明で $X'$ への媒介射 $u$ を得る段階が壊れる。

## 7. 演習

### CATB4-07-A01 同じ部分対象か

- Level: A

$X=\{1,2,3\}$ とし、$m:\{u,v\}\to X$ は $u\mapsto2,v\mapsto3$、$n:\{2,3\}\to X$ は包含、$k:\{1,2\}\to X$ は包含とする。$[m]=[n]$ を示し、$[k]\le[n]$ か判定せよ。

<!-- solution-start -->
**詳細解答**

三射とも単射なので[集合における三つの特徴づけ](../../CAT/CAT1-03/index.md#prop-cat1-03-set-characterization)からモノ射である。$i(u)=2,i(v)=3$ とすると逆写像は $2\mapsto u,3\mapsto v$ であり $ni=m$ となる。[部分対象の定義](#def-catb4-07-subobject)から $[m]=[n]$ である。

$[k]\le[n]$ なら $nh=k$ となる $h$ が存在する。$1$ に代入すると $n(h(1))=1$ が必要だが $n$ の値は $2,3$ に限られる。従って $[k]\not\le[n]$ である。
<!-- solution-end -->

### CATB4-07-A02 逆像の合成を計算する

- Level: A

$X=\{0,1,2\}$、$Y=\{a,b\}$、$Z=\{s,t\}$ とし、$f(0)=f(1)=a,f(2)=b$、$g(a)=t,g(b)=s$ とする。$C=\{t\}$ について $(gf)^*C$ と $f^*g^*C$ を求めよ。

<!-- solution-start -->
**詳細解答**

$gf(0)=gf(1)=t$、$gf(2)=s$ なので $(gf)^*C=\{0,1\}$。一方、$g(a)=t$ だけが $C$ に属するので $g^*C=\{a\}$。$f(0)=f(1)=a$ だけがこの集合に入るから $f^*g^*C=\{0,1\}$。これは[部分対象の逆像の合成則](#thm-catb4-07-inverse-image)を集合で検算したことになる。
<!-- solution-end -->

### CATB4-07-A03 全圏の射を判定する

- Level: A

$f:\{0,1,2\}\to\{a,b\}$ を $f(0)=a,f(1)=f(2)=b$ とする。$B=\{b\}$ に対し、$A=\{2\}$ と $A'=\{0,2\}$ からの $f$ 上の射の存在を判定し、Cartesian持ち上げの始域を求めよ。

<!-- solution-start -->
**詳細解答**

$f^*B=\{1,2\}$ である。[部分対象ファイブレーションの定義](#def-catb4-07-subobject-fibration)より $\{2\}\subseteq\{1,2\}$ なので $A$ からの射は存在する。$0\notin\{1,2\}$ なので $A'$ からの射は存在しない。[部分対象のCartesian持ち上げ](#thm-catb4-07-cartesian)の始域は $(\{0,1,2\},\{1,2\})$ である。
<!-- solution-end -->

### CATB4-07-A04 像と逆像を往復する

- Level: A

$f:\{0,1,2\}\to\{a,b,c\}$ を $f(0)=f(1)=a,f(2)=b$ とする。$A=\{0\}$、$B=\{a,c\}$ に対し、$f^*\exists_f A$ と $\exists_f f^*B$ を求め、随伴の二つの不等式が真の包含になることを確認せよ。

<!-- solution-start -->
**詳細解答**

$\exists_f A=\{a\}$ なので $f^*\exists_f A=\{0,1\}$。従って $A=\{0\}\subsetneq\{0,1\}$ である。逆方向は $f^*B=\{0,1\}$ なので $\exists_f f^*B=\{a\}\subsetneq\{a,c\}$ となる。最初は $1$ が新たに加わり、次は値に現れない $c$ が除かれる。
<!-- solution-end -->

### CATB4-07-B01 Cartesian射の逆向きの判定

- Level: B

部分対象の全圏で、$f$ 上の射 $(X,A)\to(Y,B)$ がCartesian射なら $A=f^*B$ となることを、Cartesian射の普遍性から直接示せ。

<!-- solution-start -->
**詳細解答**

射が存在するので[全圏の射の定義](#def-catb4-07-subobject-fibration)から $A\le f^*B$ である。

一方、$(X,f^*B)\to(Y,B)$ は $f^*B\le f^*B$ によって存在する。仮定のCartesian射に[Cartesian射の定義](../CATB4-01/index.md#def-catb4-01-cartesian)を適用する。入力はこの射、始域 $(X,f^*B)$、基底の媒介射 $1_X$ である。

$f1_X=f$ なので唯一の媒介射が得られる。その始域・終域と基底射は

$$
(X,f^*B)\longrightarrow(X,A),\qquad 1_X
$$

であり、存在条件は

$$
f^*B\le1_X^*A=A.
$$

最初の不等式と合わせて反対称性から $A=f^*B$ となる。
<!-- solution-end -->

### CATB4-07-B02 像の合成則を随伴から導く

- Level: B

正則圏で $f:X\to Y,\ g:Y\to Z$ に対し、$\exists_{gf}=\exists_g\exists_f$ を示せ。像の分解を二回構成する代わりに随伴と順序の反対称性を使え。

<!-- solution-start -->
**詳細解答**

任意の $A\in\operatorname{Sub}(X)$、$D\in\operatorname{Sub}(Z)$ に対し、[像と逆像の随伴](#thm-catb4-07-image-adjoint)をまず $g$、次に $f$ に適用する。

$$
\exists_g\exists_f A\le D
\quad\Longleftrightarrow\quad
\exists_f A\le g^*D
$$

$$
\quad\Longleftrightarrow\quad A\le f^*g^*D.
$$

[逆像の合成則](#thm-catb4-07-inverse-image)と $gf$ に対する随伴から最後の条件は $\exists_{gf}A\le D$ と同値である。$D=\exists_{gf}A$ を選ぶと $\exists_g\exists_f A\le\exists_{gf}A$、$D=\exists_g\exists_f A$ を選ぶと逆の不等式を得る。反対称性から等しい。任意の $A$ で成立し、順序圏の射は端点で決まるため関手としても等しい。
<!-- solution-end -->

### CATB4-07-B03 引き戻しでない四角形

- Level: B

正則圏で $fh=gf'$ を満たす可換四角形を考える。引き戻しとは仮定しない。任意の $A\in\operatorname{Sub}(X)$ について

$$
\exists_{f'}h^*A\le g^*\exists_f A
$$

を示せ。集合でこの不等式が真の包含となる例を、四つの基底集合をすべて非空として作れ。

<!-- solution-start -->
**詳細解答**

[像と逆像の随伴](#thm-catb4-07-image-adjoint)により $A\le f^*\exists_f A$ である。[逆像の順序保存と合成則](#thm-catb4-07-inverse-image)を使って

$$
h^*A\le h^*f^*\exists_f A
=(fh)^*\exists_f A
$$

$$
=(gf')^*\exists_f A=(f')^*g^*\exists_f A.
$$

$f'$ に対する[像と逆像の随伴](#thm-catb4-07-image-adjoint)に戻すと求める不等式になる。

$X=Y=Y'=\{0,1\}$、$f=g=1$、$X'=\{0\}$ とし、$h,f'$ をともに包含とする。可換性は $fh=h=f'=gf'$ から従う。$A=\{1\}$ なら $h^*A=\varnothing$ で左辺は空集合、右辺は $\{1\}$ となる。$T=\{1\}$ から $X,Y'$ への二つの包含が可換条件を満たすが、$X'$ への媒介射を作れないので四角形は引き戻しではない。
<!-- solution-end -->

### CATB4-07-C01 条件を保った集約

- Level: C

正則圏の射 $f:X\to Y$ と部分対象 $A=[m:M\to X]$、$B=[n:N\to Y]$ を取る。二つの部分対象の共通部分 $A\wedge D$ は、その代表モノ射同士の引き戻しから得られるモノ射の同型類とする。これが最大下界であることを確認し、次式を[部分対象のBeck–Chevalley等式](#thm-catb4-07-beck-chevalley)と像の最小性を用いて証明せよ。

$$
\exists_f(A\wedge f^*B)=(\exists_f A)\wedge B.
$$

<!-- solution-start -->
**詳細解答**

まず $D=[d:T\to X]$ とし、$m,d$ の引き戻しを $R$ とする。射影は

$$
r:R\to M,\qquad s:R\to T,\qquad mr=ds.
$$

$r$ は[モノ射の引き戻し](../../CAT/CAT2-03/index.md#prop-cat2-03-pullback-mono)でモノ射である。従って[モノ射の合成](../../CAT/CAT1-03/index.md#prop-cat1-03-composition)により $mr$ もモノ射である。二射影から $[mr]\le A$ かつ $[mr]\le D$ となる。

他の下界 $[k:K\to X]$ を取る。下界の条件から二つの射 $u:K\to M$ と $v:K\to T$ が存在し、

$$
mu=k=dv.
$$

[引き戻しの普遍性](../../CAT/CAT2-03/index.md#def-cat2-03-pullback)から $rw=u,\ sw=v$ を満たす $w:K\to R$ が得られる。すると

$$
mrw=mu=k
$$

となるので $[k]\le[mr]$。従って $[mr]$ は最大下界である。

次に $f,n$ の引き戻しを $X'$、射影を $h:X'\to X,\ f':X'\to N$ とする。$h$ は[モノ射の引き戻し](../../CAT/CAT2-03/index.md#prop-cat2-03-pullback-mono)によりモノ射で $[h]=f^*B$ である。$h,m$ の引き戻しを $L$、射影を $\ell:L\to X',d_L:L\to M$ とすれば、$h^*A=[\ell]$、先ほどの最大下界の構成から $A\wedge f^*B=[h\ell]$ である。

$f'\ell$ の正則エピ・モノ分解を $f'\ell=ie$（$i:I\to N$）とする。[部分対象のBeck–Chevalley等式](#thm-catb4-07-beck-chevalley)を $g=n$ の引き戻しに適用すると

$$
[i]=\exists_{f'}h^*A=n^*\exists_f A.
$$

$ni$ は[モノ射の合成](../../CAT/CAT1-03/index.md#prop-cat1-03-composition)によりモノ射である。また $fh\ell=nf'\ell=nie$ であり、$e$ は正則エピ射だから[正則エピ・モノ分解は像を与える](../CATB1-01/index.md#thm-catb1-01-regular-epi-mono-image)より

$$
\exists_f(A\wedge f^*B)=[ni].
$$

$k:K\to Y$ を $\exists_f A$ の代表とする。$n^*[k]$ は $n,k$ の引き戻しの $N$ への射影であり、その射影と $n$ の合成は最大下界の構成に一致する。$[i]=n^*[k]$ なので $[ni]=B\wedge[k]$ である。以上から目的の等式を得る。

集合なら、左辺は「$A$ に属し、かつ $f(x)\in B$ となる $x$ の像」、右辺は「$A$ の像のうち $B$ に属するもの」である。正則圏では元の代わりに引き戻しと像分解を用いてこの一致を証明できた。
<!-- solution-end -->

## 8. まとめ

部分対象はモノ射の同型類として扱う。引き戻しは逆像を与え、Cartesian持ち上げによって異なる基底上の部分対象を一つの圏にまとめられる。正則圏では像が逆像の左随伴となり、引き戻しに沿う像と逆像の交換が成立する。次講では局所的に与えた対象を基底上で貼り合わせて復元する問題へ進む。
