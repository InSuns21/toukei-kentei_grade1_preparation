# CATB1-05 像・余像・完全列

## 1. 射が伝える情報を二つの側から見る

整数の加法を保つ射 $f:\mathbb Z^2\to\mathbb Z$ を $f(x,y)=2(x-y)$ とする。前講の[加群の圏における核と余核の構成](../CATB1-04/index.md#thm-catb1-04-module-category)を適用すると、核の対象は $\{(t,t):t\in\mathbb Z\}$、余核の対象は $\mathbb Z/2\mathbb Z$ である。

核の分だけ入力の違いを無視すれば、残る情報は整数 $x-y$ である。一方、実際に出力に現れるのは偶数 $2(x-y)$ である。入力側に残る整数と出力側の偶数は、倍写像によって一対一に対応する。

元を使えない圏でもこの対応は成立するだろうか。それを確かめると、複数の射をつないだとき、前の射から届く情報と次の射で消える情報が一致するかを調べられる。

以下、$\mathcal C$ は局所小な[アーベル圏](../CATB1-04/index.md#def-catb1-04-abelian-category)とし、合成を $gf=g\circ f$ と書く。零対象を $O$、型が明らかな零射を $0$ と書く。核・余核の記号は対象だけでなく射を含む。加群の具体例では包含射を核、剰余類への射を余核として選ぶ。

## 2. 余像と像の比較射

入力側の不要な違いは [核](../CATB1-04/index.md#def-catb1-04-kernel) によって抽出できる。それを零と同一視する操作は核射の [余核](../CATB1-04/index.md#def-catb1-04-cokernel) を取ればよい。この入力側の商を余像と呼ぶ。

<a id="def-catb1-05-coimage"></a>

<!-- formal-statement-start -->
> **定義（余像）**
>
> アーベル圏の射 $f:A\to B$ の核を $k:K\to A$ とする。$k$ の余核 $q:A\to Q$ を $f$ の余像といい、対象 $Q$ を $\operatorname{Coim}f$ と書く。
<!-- formal-statement-end -->

<!-- definition-example-start: def-catb1-05-coimage -->
**定義の確認**

冒頭の射について $k(t)=(t,t)$ とし、$q(x,y)=x-y$ と置く。$qk(t)=0$ である。任意の加法を保つ射 $w:\mathbb Z^2\to T$ が $wk=0$ を満たすとき、

$$
(x,y)=(x-y,0)+(y,y)
$$

なので $w(x,y)=w(x-y,0)$ となる。$z(s)=w(s,0)$ は加法を保ち、$zq=w$。$q(s,0)=s$ から $z$ は一意である。従って $q$ は $k$ の余核で、余像の対象は $\mathbb Z$ と選べる。
<!-- definition-example-end -->

出力側では余核の核を取り、消してよい出力の部分を取り出す。これが前々講までに学んだ[圏論的な像](../CATB1-01/index.md#def-catb1-01-image)、すなわち射が経由する最小のモノ射になることを以下で証明する。

$f:A\to B$ に対して射を次のように選ぶ。

$$
k:K\to A,\quad q:A\to Q=\operatorname{Coim}f,
$$

$$
c:B\to C=\operatorname{coker}f,\quad m:I\to B,\quad m=\ker c.
$$

$fk=0$ なので $q=\operatorname{coker}k$ の普遍性から $f=u q$ となる $u:Q\to B$ が一意に存在する。また $cf=0$ である。よって $cuq=0$、余核射 $q$ の[エピ射性](../CATB1-04/index.md#prop-catb1-04-kernel-cokernel-uniqueness)から $cu=0$ となる。核 $m$ の普遍性を $u$ に適用すると、$u=ma$ となる $a:Q\to I$ が一意に存在する。

$$
A\xrightarrow{q}Q\xrightarrow{a}I\xrightarrow{m}B,\qquad f=maq.
$$

この $a$ が余像から像への比較射である。$maq=ma'q$ なら $m$ のモノ射性と $q$ のエピ射性で順に消去して $a=a'$ となる。

<a id="thm-catb1-05-image-coimage"></a>

<!-- formal-statement-start -->
> **定理（像と余像の比較同型）**
>
> アーベル圏の任意の射 $f:A\to B$ について、$q:A\to Q$ を核の余核、$m:I\to B$ を余核の核とする。$f=maq$ を満たす唯一の比較射 $a:Q\to I$ は同型射である。
>
> さらに $(aq,m)$ は $f$ の圏論的な像である。特に $f$ はエピ射とモノ射の合成に分解される。
<!-- formal-statement-end -->

見取り図：まず $f$ が $m$ を経由するときの射 $h:A\to I$ がエピ射であることを示す。もし $h$ がもっと小さいモノ射を経由できるなら、$m$ の最小性に反する。次に $h$ と $f$ の核が同じであることから $h$ と $q$ が同じ普遍性を持つと分かる。

<!-- proof-start -->
### 証明

**最小性。** $f=mh$ と分解する。$h=aq$ と取れる。別の分解 $f=ng$（$n:J\to B$ はモノ射、$g:A\to J$）を取る。$d:B\to D$ を $n$ の余核とすれば $df=dng=0$ だから、$c$ の[余核の普遍性](../CATB1-04/index.md#def-catb1-04-cokernel)により $d=vc$ となる $v:C\to D$ が存在する。従って $dm=vcm=0$ である。

アーベル圏では $n$ は正規モノ射なので、[正規射の核・余核による復元](../CATB1-04/index.md#prop-catb1-04-normal-recovery)により $n=\ker d$ と見なせる。よって $m=nb$ を満たす $b:I\to J$ が一意に存在する。さらに

$$
nbh=mh=f=ng.
$$

$n$ のモノ射性より $bh=g$。従って $(h,m)$ は[圏論的な像の定義](../CATB1-01/index.md#def-catb1-01-image)を満たす。

**$h$ がエピ射であること。** $s:I\to S$ を $h$ の余核とし、$l:L\to I$ を $s$ の核とする。$sh=0$ より $h=lt$ となる $t:A\to L$ が存在する。$m$ と $l$ は核なのでモノ射、従って $ml:L\to B$ もモノ射である。実際 $mlv=mlw$ なら $m,l$ を順に消去できる。

$f=(ml)t$ に最小性を適用すると $mlb'=m$ となる $b':I\to L$ が存在する。$m$ を消去して $lb'=1_I$。したがって

$$
s=s1_I=slb'=0.
$$

任意の $w:I\to T$ で $wh=0$ なら余核の普遍性により $w=zs$ となり、$s=0$ から $w=0$ である。[零射によるエピ射の判定](../CATB1-04/index.md#prop-catb1-04-zero-test)により $h$ はエピ射となる。

**比較同型。** $fk=0$ と $f=mh$ から $mhk=0$、$m$ のモノ射性により $hk=0$ である。任意の $v:T\to A$ で $hv=0$ なら $fv=mhv=0$。従って $k$ の[核の普遍性](../CATB1-04/index.md#def-catb1-04-kernel)で $v$ は $k$ を通じて一意に分解される。よって $k$ は $h$ の核でもある。

$h$ はエピ射なので、アーベル圏の正規性と[正規射の復元](../CATB1-04/index.md#prop-catb1-04-normal-recovery)から $h$ は $k$ の余核である。$q$ も同じ $k$ の余核である。$h=aq$ に加えて余核の普遍性から $q=bh$ となる $b:I\to Q$ が一意に存在する。

$$
baq=bh=q,\qquad abh=aq=h.
$$

$q,h$ のエピ射性で右消去して $ba=1_Q,\ ab=1_I$。従って $a$ は同型射である。先に $(h,m)$ が像であることを示したので $I$ を $\operatorname{Im}f$ と書ける。
<!-- proof-end -->

冒頭の例では $c(n)=[n]_2$、$m:2\mathbb Z\hookrightarrow\mathbb Z$ である。$cm=0$ であり、任意の $v:T\to\mathbb Z$ で $cv=0$ なら値が偶数に限られるので、同じ値を $2\mathbb Z$ に取る射が一意に定まる。よって $m=\ker c$。比較射は $a(s)=2s$、逆射は $2s\mapsto s$ で、どちらも加法を保つ。

この結果により、像の対象を値全体として定義できない圏でも、核と余核だけで像を作れる。以後、像は $m_f=\ker(\operatorname{coker}f)$ と選ぶ。

## 3. 完全性：前から来るものと次で消えるもの

三つの対象を射でつなぐ。

$$
A\xrightarrow{f}B\xrightarrow{g}C.
$$

$gf=0$ なら $f$ の値は $g$ の核に入る。しかし整数の倍写像 $f(n)=4n$ と剰余類への射 $g(n)=[n]_2$ では、$4\mathbb Z$ は $2\mathbb Z$ の一部分にすぎない。例えば $2$ は $g$ で零になるが $f$ では到達できない。完全性はこの不足がないことを表す。この条件を各中間対象で満たす列が完全列である。

抽象的な圏では部分集合の等号の代わりに、二つのモノ射の始域を同型で結び、終域への射が一致することを要求する。

<a id="def-catb1-05-exact"></a>

<!-- formal-statement-start -->
> **定義（完全列）**
>
> アーベル圏の二射 $f:A\to B$ と $g:B\to C$ が $B$ で完全であるとは、$f$ の像 $m:I\to B$ と $g$ の核 $k:K\to B$ に対して、$k\theta=m$ を満たす同型射 $\theta:I\to K$ が存在することをいう。
>
> 射の列が各中間対象でこの条件を満たすとき、完全列という。
<!-- formal-statement-end -->

<!-- definition-example-start: def-catb1-05-exact -->
**定義の確認**

可換群の圏で $f(n)=2n$、$g(n)=[n]_2$ とする。[像と余像の比較同型](#thm-catb1-05-image-coimage)と加群の核・余核の構成から、像は $2\mathbb Z\hookrightarrow\mathbb Z$、核も同じ包含射として選べる。$\theta=1_{2\mathbb Z}$ は同型で $k\theta=m$ を満たす。従って $\mathbb Z\xrightarrow{f}\mathbb Z\xrightarrow{g}\mathbb Z/2\mathbb Z$ は中央で完全である。$f(n)=4n$ に変えると $\theta$ は包含 $4\mathbb Z\hookrightarrow2\mathbb Z$ に強制され、$2$ が値にならないので同型ではない。
<!-- definition-example-end -->

完全性が成立すれば $gf=gk\theta h=0$ となる（$f=mh$）。逆は上の反例で成立しない。次の判定は $gf=0$ から何を追加すればよいかを示す。

<a id="prop-catb1-05-exactness-test"></a>

<!-- formal-statement-start -->
> **命題（完全性の判定）**
>
> アーベル圏で $f:A\to B$、$g:B\to C$ が $gf=0$ を満たすとする。$k:K\to B$ を $g$ の核、$v:A\to K$ を $f=kv$ を満たす唯一の射とする。
>
> この二射が $B$ で完全であることと、$v$ がエピ射であることは同値である。
<!-- formal-statement-end -->

見取り図：核への射がエピ射なら、そこで分解が完結している。像の最小性を使えば核を像と同一視できる。

<!-- proof-start -->
### 証明

$gf=0$ に[核の普遍性](../CATB1-04/index.md#def-catb1-04-kernel)を適用して $v$ を得る。[像と余像の比較同型](#thm-catb1-05-image-coimage)による分解を $f=mh$ とし、$h:A\to I$ はエピ射、$m:I\to B$ は像とする。

完全なら $m=k\theta$ となる同型射がある。従って $f=k\theta h=kv$、モノ射 $k$ を消去して $v=\theta h$。任意の $a,b:K\to T$ で $av=bv$ なら $a\theta h=b\theta h$、$h$ を消去し、$\theta^{-1}$ を右から合成して $a=b$。従って $v$ はエピ射である。

逆に $v$ がエピ射なら、アーベル圏では正規エピ射なのである射 $s:D\to A$ の余核である。余核は $s$ と零射の余等化子であるから $v$ は[正則エピ射](../CATB1-01/index.md#def-catb1-01-regular-epi)である。$k$ は核なのでモノ射。よって[正則エピ・モノ分解は像を与える定理](../CATB1-01/index.md#thm-catb1-01-regular-epi-mono-image)を $f=kv$ に適用すると $(v,k)$ も像となる。像の一意性により $k\theta=m$ となる同型射が存在し、完全である。
<!-- proof-end -->

加群ではエピ射は全射であるから、この命題は $g(b)=0$ となる任意の $b\in B$ に対し $f(a)=b$ となる $a\in A$ が存在するという判定になる。抽象的なアーベル圏で元を使う必要はない。

## 4. 短完全列：部分と商を一緒に記録する

完全性を端にも課すため、零対象からの射と零対象への射を付ける。これで左端に単射に相当する条件、右端に全射に相当する条件を表せる。この三箇所の完全性をまとめて扱うのが短完全列である。

<a id="def-catb1-05-short-exact"></a>

<!-- formal-statement-start -->
> **定義（短完全列）**
>
> アーベル圏で $O$ を零対象とする。次の列が $A,B,C$ のすべてで完全であるとき、短完全列という。

$$
O\longrightarrow A\xrightarrow{f}B\xrightarrow{g}C\longrightarrow O.
$$
<!-- formal-statement-end -->

<!-- definition-example-start: def-catb1-05-short-exact -->
**定義の確認**

可換群の圏で $f(n)=3n$、$g(n)=[n]_3$ とする。$O\to\mathbb Z$ の像は零部分群であり、$3n=0$ なら $n=0$ なので $f$ の核も零部分群である。中央では像と核はいずれも $3\mathbb Z$ の包含。右端では全ての剰余類が $g(n)$ で得られるので $g$ の像は $\mathbb Z/3\mathbb Z$ 全体、後続の零射の核は恒等射である。それぞれのモノ射を一致させる恒等同型を選べるので、三箇所すべてで完全である。
<!-- definition-example-end -->

<a id="thm-catb1-05-short-exact-test"></a>

<!-- formal-statement-start -->
> **定理（短完全列の特徴づけ）**
>
> アーベル圏の二射 $f:A\to B$ と $g:B\to C$ に対し、次の条件は同値である。
>
> 1. $O\to A\xrightarrow{f}B\xrightarrow{g}C\to O$ が短完全列である。
> 2. $f$ がモノ射、$g$ がエピ射で、列が $B$ で完全である。
> 3. $f$ が $g$ の核であり、$g$ が $f$ の余核である。
<!-- formal-statement-end -->

見取り図：端の完全性を零対象と恒等射の核・像で読み替える。中央の完全性と端の消去性を組み合わせると、両射が互いの核・余核になる。

<!-- proof-start -->
### 証明

(1) と (2) の同値を示す。$O\to A$ の像は零対象からの射である。実際 $O\to A$ の余核は $1_A$、その核は $O\to A$ となる。$C\to O$ の核は $1_C$ である（いずれも[核](../CATB1-04/index.md#def-catb1-04-kernel)・[余核](../CATB1-04/index.md#def-catb1-04-cokernel)の普遍性で分解射が一意に定まる）。

従って $A$ での完全性は $f$ の核の対象が零対象であることと同値で、[零射によるモノ射の判定](../CATB1-04/index.md#prop-catb1-04-zero-test)から $f$ のモノ射性と同値。$C$ での完全性は $g$ の像 $m_g:I_g\to C$ が同型であることと同値である。$g$ がエピ射ならその余核は $C\to O$ なので $m_g$ は恒等射と同型。逆に $m_g$ が同型なら[像分解](#thm-catb1-05-image-coimage)で $g=m_gh_g$（$h_g$ はエピ射）となり $g$ はエピ射である。中央の条件は同じだから (1) と (2) は同値。

(2) を仮定する。$f$ がモノ射なので正規性と[正規射の復元](../CATB1-04/index.md#prop-catb1-04-normal-recovery)から $f=\ker(\operatorname{coker}f)$、つまり $f$ 自身を像として選べる。中央の完全性により $g$ の核 $k:K\to B$ と同型射 $\theta:A\to K$ があり $f=k\theta$。任意の $v:T\to B$ で $gv=0$ なら $v=ku$ となる $u:T\to K$ が一意に存在する。$v=f\theta^{-1}u$ となり、$f$ のモノ射性で分解は一意である。よって $f$ は $g$ の核である。$g$ は正規エピ射であるから正規射の復元により $g$ は自身の核 $f$ の余核である。従って (3)。

(3) を仮定すれば[核と余核の消去性](../CATB1-04/index.md#prop-catb1-04-kernel-cokernel-uniqueness)から $f$ はモノ射、$g$ はエピ射。$m_f=\ker(\operatorname{coker}f)=\ker g$ と選べるので中央で完全である。よって (2) が従う。
<!-- proof-end -->

短完全列は、真ん中の対象を部分と商に分けて記録する。必ずしも真ん中が二つの対象の双積になるわけではない。例えば定義の確認に使った列では、$g$ の右逆射 $s:\mathbb Z/3\mathbb Z\to\mathbb Z$ があれば $3s([1])=s([0])=0$ から $s([1])=0$。しかし $gs([1])=[1]$ が必要なので矛盾する。完全性と片側逆射の存在を混同してはいけない。

## 5. 演習

### CATB1-05-A01 余像と像の具体計算

- Level: A

可換群の圏で $f:\mathbb Z^2\to\mathbb Z$ を $f(x,y)=3(x+2y)$ とする。核、余像、余核、像の対象と比較同型を求めよ。

<!-- solution-start -->
**詳細解答。** $f(x,y)=0$ は整数で $x=-2y$ と同値なので核は $K=\{(-2t,t):t\in\mathbb Z\}$ の包含。$q(x,y)=x+2y$ は全射で、その核は $K$。任意の $w$ が $K$ を零にすれば $(x,y)=(x+2y,0)+(-2y,y)$ より $w(x,y)=w(x+2y,0)$。$z(s)=w(s,0)$ が唯一の分解なので余像は $\mathbb Z$、射は $q$。

値は $3\mathbb Z$ 全体（$f(s,0)=3s$）だから[加群の余核構成](../CATB1-04/index.md#thm-catb1-04-module-category)で余核は $\mathbb Z/3\mathbb Z$ への商射。その核は $3\mathbb Z$ の包含で像になる。[比較同型の定理](#thm-catb1-05-image-coimage)の $a$ は $a(s)=3s$ であり、$maq(x,y)=3(x+2y)$。逆射 $3s\mapsto s$ は整数 $s$ の一意性から定義でき、互いの合成が恒等射である。
<!-- solution-end -->

### CATB1-05-A02 合成が零でも完全でない例

- Level: A

可換群の圏で $f(n)=6n$、$g(n)=[n]_3$ とする。中央で完全か判定せよ。

<!-- solution-start -->
**詳細解答。** $gf(n)=[6n]_3=[0]$。像の包含は $6\mathbb Z\hookrightarrow\mathbb Z$、核の包含は $3\mathbb Z\hookrightarrow\mathbb Z$（[加群の核・余核](../CATB1-04/index.md#thm-catb1-04-module-category)と[像の構成](#thm-catb1-05-image-coimage)）。$3\in3\mathbb Z$ だが $6n=3$ の整数解はない。両包含と両立する射は包含 $6\mathbb Z\hookrightarrow3\mathbb Z$ のみであり全射でない。従って[完全列の定義](#def-catb1-05-exact)を満たさない。
<!-- solution-end -->

### CATB1-05-A03 モノ射とエピ射の比較同型

- Level: A

任意のアーベル圏で、$f:A\to B$ がモノ射の場合には余像の対象を $A$、エピ射の場合には像の対象を $B$ と選べることを示せ。

<!-- solution-start -->
**詳細解答。** モノ射なら[零射による判定](../CATB1-04/index.md#prop-catb1-04-zero-test)より核は $O\to A$。この射の余核は $1_A$ である。実際任意の $w:A\to T$ は $O$ からの射との合成が零で、$w=z1_A$ の解は $z=w$ のみ。従って余像は $A$。

エピ射なら同じ判定より余核は $B\to O$。任意の $v:T\to B$ はこれと合成して零になり、$1_Bu=v$ の解は $u=v$ のみ。従って余核の核は $1_B$、[像の構成](#thm-catb1-05-image-coimage)から像の対象は $B$。
<!-- solution-end -->

### CATB1-05-A04 短完全列の端を検査する

- Level: A

可換群の圏で $O\to\mathbb Z\xrightarrow{f}\mathbb Z\xrightarrow{g}\mathbb Z/5\mathbb Z\to O$、$f(n)=5n$、$g(n)=[n]_5$ とする。短完全列であることを示せ。

<!-- solution-start -->
**詳細解答。** $5n=5m$ なら $5(n-m)=0$ より $n=m$、$f$ は単射。$g$ は任意の剰余類 $[r]_5$ を $r$ から得るので全射。[加群の圏の定理](../CATB1-04/index.md#thm-catb1-04-module-category)からそれぞれモノ射、エピ射である。$f$ の像と $g$ の核は同じ $5\mathbb Z$ の包含で、中央で完全。[短完全列の特徴づけ](#thm-catb1-05-short-exact-test)の条件2がすべて成立する。
<!-- solution-end -->

### CATB1-05-B01 核への誘導射を計算する

- Level: B

可換群の圏で $f:\mathbb Z^2\to\mathbb Z^2$ を $f(x,y)=(x+y,2x+2y)$、$g:\mathbb Z^2\to\mathbb Z$ を $g(a,b)=b-2a$ とする。$gf=0$ を確かめ、核の対象を $\mathbb Z$ と選んで完全性を判定せよ。

<!-- solution-start -->
**詳細解答。** $gf(x,y)=2x+2y-2(x+y)=0$。$g(a,b)=0$ は $b=2a$ なので $k(t)=(t,2t)$ と置く。$gk=0$ かつ任意の $u:T\to\mathbb Z^2$ で $gu=0$ なら $u=(u_1,2u_1)=ku_1$、第一成分から分解は一意。ゆえに $k$ は核である。

$f=kv$ の解は $v(x,y)=x+y$。任意の $t$ について $v(t,0)=t$ なので $v$ は全射、[加群の圏の定理](../CATB1-04/index.md#thm-catb1-04-module-category)よりエピ射。[完全性の判定](#prop-catb1-05-exactness-test)で中央は完全となる。ただし $f(1,-1)=(0,0)$ なので $f$ はモノ射でない。この列に零対象を付けても左端の完全性は成立しない。
<!-- solution-end -->

### CATB1-05-B02 比較同型の選択独立性

- Level: B

アーベル圏で同じ射 $f:A\to B$ に対し、二組の余像射 $q:A\to Q,\ q':A\to Q'$ と像射 $m:I\to B,\ m':I'\to B$ を選ぶ。両余像射を結ぶ同型 $u:Q\to Q'$ と両像射を結ぶ同型 $v:I\to I'$ が $q'=uq,\ m=m'v$ を満たすとき、比較同型 $a:Q\to I,\ a':Q'\to I'$ が $va=a'u$ を満たすことを示せ。

<!-- solution-start -->
**詳細解答。** [比較同型の定理](#thm-catb1-05-image-coimage)により $maq=f=m'a'q'$。仮定を代入して

$$
m'vaq=maq=f=m'a'uq.
$$

$m'$ は核なのでモノ射である。左消去して $vaq=a'uq$。さらに $q$ は余核なのでエピ射であり、右消去して $va=a'u$ を得る。余像や像の対象を選び直しても、比較射はこれらの同型による移し替えと両立する。
<!-- solution-end -->

### CATB1-05-B03 完全でも右逆射は存在しない

- Level: B

可換群の圏で $O\to\mathbb Z\xrightarrow{d}\mathbb Z\xrightarrow{p}\mathbb Z/4\mathbb Z\to O$、$d(n)=4n$、$p(n)=[n]_4$ とする。短完全列であること、$p$ に右逆射が存在しないことを示せ。

<!-- solution-start -->
**詳細解答。** $d$ は整数で単射、$p$ は各剰余類を代表元から得られるので全射。中央で像と核は $4\mathbb Z$ の包含になる。[短完全列の特徴づけ](#thm-catb1-05-short-exact-test)により短完全列である。

仮に加法を保つ $s:\mathbb Z/4\mathbb Z\to\mathbb Z$ が $ps=1_{\mathbb Z/4\mathbb Z}$ を満たすとする。$4[1]_4=[0]_4$ より $4s([1]_4)=s([0]_4)=0$。整数では $4t=0$ なら $t=0$ だから $s([1]_4)=0$。すると $ps([1]_4)=[0]_4$ だが恒等射なら $[1]_4$ となる。矛盾。短完全列の右側はエピ射だが右逆射を持つとは限らない。
<!-- solution-end -->

### CATB1-05-B04 余核で完全性を調べる

- Level: B

アーベル圏の射 $f:A\to B$、$g:B\to C$ が $gf=0$ を満たすとし、$c:B\to D$ を $f$ の余核とする。$g=wc$ を満たす $w:D\to C$ がモノ射であることと、$B$ で完全であることの同値性を示せ。

<!-- solution-start -->
**詳細解答。** $gf=0$ から[余核の普遍性](../CATB1-04/index.md#def-catb1-04-cokernel)により $w$ が一意に得られる。$m=\ker c$ は[像の構成](#thm-catb1-05-image-coimage)による $f$ の像。$w$ がモノ射なら任意の $v:T\to B$ で $gv=wcv=0$ のとき $cv=0$ となる。逆に $cv=0$ なら $gv=0$ である。従って $m$ の核としての普遍性は $g$ に対しても成立し、中央で完全。

逆に完全なら $k=\ker g$ と $m$ は同型で、$m$ 自身も $g$ の核となる。$g$ の像分解を $g=nh$ とすれば $n$ のモノ射性から $m$ は $h$ の核でもある（$hv=0$ と $gv=0$ が同値）。$h$ はエピ射なので[正規射の復元](../CATB1-04/index.md#prop-catb1-04-normal-recovery)より $h$ は $m$ の余核である。一方 $c$ は余核、従ってエピ射であり、$m=\ker c$ だから同じ復元命題により $c$ も $m$ の余核である。[余核の同型一意性](../CATB1-04/index.md#prop-catb1-04-kernel-cokernel-uniqueness)より $h=jc$ となる同型 $j:D\to\operatorname{Im}g$ が存在する。$wc=g=njc$ から $c$ を右消去して $w=nj$。$n$ はモノ射、$j$ は同型なので $w$ はモノ射である。
<!-- solution-end -->

### CATB1-05-C01 対象の制限と比較射

- Level: C

対象を $\mathbb Z^n$（$n\geq0$）に限定し、射を加法を保つ写像とする加法圏を考える。$d:\mathbb Z\to\mathbb Z$、$d(n)=2n$ について、核・余核と余像射・余核の核を構成し、比較射が同型か判定せよ。全可換群の圏と比較し、定理のどの仮定が必要だったか述べよ。

<!-- solution-start -->
**詳細解答。** この圏では任意の $u:\mathbb Z^n\to\mathbb Z$ で $du=0$ なら各 $u(t)$ が $2u(t)=0$ を満たすので $u=0$。従って核は $O\to\mathbb Z$。任意の $w:\mathbb Z\to\mathbb Z^n$ で $wd=0$ なら $2w(1)=0$ だから整数の各成分が零。$w(t)=tw(1)=0$ より余核は $\mathbb Z\to O$。どちらも零対象を経由する分解は一意である。

核の余核は $1_{\mathbb Z}$、余核の核も $1_{\mathbb Z}$。実際、零射と合成すると常に零になり、恒等射を経由する分解は元の射そのもので一意だからである。よって $d=1_{\mathbb Z}a1_{\mathbb Z}$ の比較射は $a=d$。逆射 $b$ があれば $2b(1)=1$ が必要だが整数解はない。

$d$ は単射なのでモノ射である。上で $wd=0$ なら $w=0$ を示したので、[零射によるエピ射の判定](../CATB1-04/index.md#prop-catb1-04-zero-test)によりエピ射でもある。ところが正規エピ射なら自身の核の余核でなければならない（[正規射の復元](../CATB1-04/index.md#prop-catb1-04-normal-recovery)）。その余核は恒等射と同型なので $d$ は同型となるはずであり矛盾する。従ってアーベル圏の正規性公理が失われている。

全可換群の圏では $d$ の核は同じだが余核は $\mathbb Z\to\mathbb Z/2\mathbb Z$。その核は $2\mathbb Z$ の包含であり、比較射 $\mathbb Z\to2\mathbb Z$、$t\mapsto2t$ は逆射 $2t\mapsto t$ を持つ。制限した圏では偶奇を区別する商が対象にならず、比較射の証明で必要だった正規性を使えない。このため[像と余像の比較同型](#thm-catb1-05-image-coimage)は加法圏という仮定だけでは成立しない。
<!-- solution-end -->

## 6. 次の講義へ

像と余像の比較同型によって、完全性を核へのエピ射、または余核からのモノ射で判定できるようになった。短完全列は部分と商を記録する。次講では短完全列を二段に並べた可換図式から、核と余核の間に新しい射を構成し、完全性がどう引き継がれるかを調べる。
