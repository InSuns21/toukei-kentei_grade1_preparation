# CATB2-09 Profの双圏

## 1. 対応を何回でもつなぐ

[分配子のcoend合成](../CATB2-07/index.md#thm-catb2-07-composition)により、中間の射を左右どちらで処理しても同じとみなして二つの対応をつなげられた。しかし三つの対応をつなぐと、どちらの二つを先に合成するかで商集合の作り方が異なる。前講の[双圏](../CATB2-08/index.md#def-catb2-08-bicategory)の考え方を使い、括弧の違いを比較し、単位と整合させよう。

以下、小圏は固定した集合論的宇宙に関して小さいとし、圏全体や関手の圏は必要に応じてより大きな宇宙で扱う。値は集合とし、前講までの一般の豊穣基底とは区別する。

## 2. 分配子どうしの射

[分配子](../CATB2-07/index.md#def-catb2-07-distributor) $P:A\rightsquigarrow B$ の集合値の場合は通常の関手

$$
P:B^{\mathrm{op}}\times A\to\mathbf{Set}
$$

である。$v:b'\to b$ の作用を $p\cdot v$、$u:a\to a'$ の作用を $u\cdot p$ と書く。二方向の作用が可換である。対応を比較するには各集合の写像だけでなく、この作用との両立を要求する。

<a id="def-catb2-09-distributor-map"></a>

<!-- formal-statement-start -->
> **定義（分配子の射）**
>
> 小圏 $A,B$ と集合値分配子 $P,P':A\rightsquigarrow B$ に対し、分配子の射は自然変換 $\alpha:P\Rightarrow P'$ とする。すなわち各成分
>
$$
\alpha_{b,a}:P(b,a)\to P'(b,a)
$$

> が任意の $p\in P(b,a)$ と射 $v:b'\to b$、$u:a\to a'$ に対して
>
$$
\begin{aligned}
\alpha_{b',a}(p\cdot v)&=\alpha_{b,a}(p)\cdot v,\\
\alpha_{b,a'}(u\cdot p)&=u\cdot\alpha_{b,a}(p)
\end{aligned}
$$

> を満たす。恒等射と合成は成分ごとの恒等写像と合成で与える。
<!-- formal-statement-end -->

<!-- definition-example-start: def-catb2-09-distributor-map -->
**定義の確認。** $A$ は一対象・恒等射のみの圏、$B$ は $0\xrightarrow{v}1$ とする。第二引数を省略し、二つの反変関手を次で定める。

$$
\begin{array}{c|cc}
&0&1\\
P&\{z\}&\{x,y\}\\
P'&\{Z,W\}&\{X,Y\}
\end{array}
$$

$P(v)$ は両元を $z$ に送り、$P'(v)$ は $X\mapsto Z,Y\mapsto W$ と作用する。恒等射は恒等写像で、非恒等射どうしは合成できず、出発側も恒等作用のみなので分配子の条件を満たす。

次の成分写像を取る。

$$
\alpha_1(x)=\alpha_1(y)=X,\qquad \alpha_0(z)=Z.
$$

任意の $s\in\{x,y\}$ について

$$
\alpha_0(P(v)s)=Z=P'(v)\alpha_1(s)
$$

である。共変作用と恒等射との両立は恒等写像なので成立する。一方 $\alpha_0(z)=W$ に変えると左辺が $W$、右辺が $Z$ となり、射にならない。
<!-- definition-example-end -->

この条件は各変数での自然性であり、両方の射を同時に作用させる自然性は二式の連続適用から得られる。従って Hom 圏を既習の[関手圏](../../CAT/CAT1-08/index.md#def-cat1-08-functor-category)として扱える。

## 3. 合成を射にも作用させる

$P:A\rightsquigarrow B$ と $Q:B\rightsquigarrow C$ の合成は

$$
(Q\odot P)(c,a)=\int^b Q(c,b)\times P(b,a).
$$

[分配子のcoend合成](../CATB2-07/index.md#thm-catb2-07-composition)の集合値の商表示では、$[q,p]_b$ はタグ $b$ を持つ組の同値類であり、$v:b\to b'$ に対する関係

$$
[q,p'\cdot v]_b=[v\cdot q,p']_{b'}
$$

で生成される同値関係で割る。外側の作用は $w:c'\to c$ と $u:a\to a'$ に対して $[q\cdot w,u\cdot p]_b$ である。

<a id="prop-catb2-09-horizontal"></a>

<!-- formal-statement-start -->
> **命題（分配子の水平合成）**
>
> 小圏 $A,B,C$ を取る。集合値分配子 $P,P':A\rightsquigarrow B$ と $Q,Q':B\rightsquigarrow C$ のcoend合成は、分配子の射 $\alpha:P\Rightarrow P'$ と $\beta:Q\Rightarrow Q'$ に
>
$$
(\beta*\alpha)_{c,a}([q,p]_b)
=[\beta_{c,b}(q),\alpha_{b,a}(p)]_b
$$

> を対応させることで、Hom圏の積からHom圏への関手をなす。
<!-- formal-statement-end -->

### 証明の見取り図

代表元の変更が自然性で吸収されることを示し、その後で外側の自然性と二段の射の合成を確かめる。

<!-- proof-start -->
### 証明

生成関係の左側の像を計算する。成分の添字は入力の型から復元できるので省く。

$$
\begin{aligned}
[\beta(q),\alpha(p'\cdot v)]_b
&=[\beta(q),\alpha(p')\cdot v]_b\\
&=[v\cdot\beta(q),\alpha(p')]_{b'}\\
&=[\beta(v\cdot q),\alpha(p')]_{b'}.
\end{aligned}
$$

第一・第三等号は[分配子の射](#def-catb2-09-distributor-map)の自然性、第二等号は合成先の商関係である。生成関係の両端の像が等しいので、その関係を逆向きにたどっても、有限回つないでも像は変わらない。従って同値類の代表元の選択によらず写像が定まる。

外側の射 $w,u$ に対して像は

$$
[\beta(q\cdot w),\alpha(u\cdot p)]_b
=[\beta(q)\cdot w,u\cdot\alpha(p)]_b.
$$

従って自然変換である。恒等射の組の作用は $[q,p]_b$ を変えない。さらに $\alpha':P'\Rightarrow P''$ と $\beta':Q'\Rightarrow Q''$ を取ると

$$
\begin{aligned}
(\beta'*\alpha')([\beta(q),\alpha(p)]_b)
&=[\beta'(\beta(q)),\alpha'(\alpha(p))]_b\\
&=[(\beta'\beta)(q),(\alpha'\alpha)(p)]_b.
\end{aligned}
$$

これは垂直合成を先に行った結果であり、合成の関手性（[双圏の交換法則](../CATB2-08/index.md#def-catb2-08-bicategory)）を与える。
<!-- proof-end -->

## 4. 恒等分配子と単位子

通常の恒等関手は対象をそのまま選ぶ。分配子では到着側 $a'$ から出発側 $a$ への射全体を値とすることが対応する恒等になる。これを恒等分配子 $I_A$ と呼び、

$$
I_A(a',a)=\operatorname{Hom}_A(a',a)
$$

と置く。[分配子の定義](../CATB2-07/index.md#def-catb2-07-distributor)の二作用は前合成と後合成である。射 $h:a'\to a$ に対し、前合成の射を $v:a''\to a'$、$v':a'''\to a''$ とし、後合成の射を $u:a\to a_1$、$u':a_1\to a_2$ とする。恒等射は $h$ を変えず、合成則は

$$
(hv)v'=h(vv'),\qquad u'(uh)=(u'u)h
$$

であり、両作用は $u(hv)=(uh)v$ により可換である。

例えば矢印圏 $0\to1$ では $I_A(0,1)$ は一元、$I_A(1,0)$ は空である。恒等分配子でも異なる対象間の値を捨ててはいけない。射を記録しているからこそ、作用を使って余分な中間変数を消せる。

<a id="thm-catb2-09-unitors"></a>

<!-- formal-statement-start -->
> **定理（Profの単位子）**
>
> 小圏 $A,B$ 間の集合値分配子 $P:A\rightsquigarrow B$ に対し、恒等分配子 $I_A,I_B$ を各圏のHom関手とすると自然同型
>
$$
l_P:I_B\odot P\to P,\qquad r_P:P\odot I_A\to P
$$

> が存在する。成分は
>
$$
l_P([h,p])=p\cdot h,\qquad r_P([p,k])=k\cdot p
$$

> であり、ここで $h:b'\to b$、$p\in P(b,a)$ は左の場合、$p\in P(b',a')$、$k:a'\to a$ は右の場合である。これらは分配子の射についても自然である。
<!-- formal-statement-end -->

### 証明の見取り図

射を作用させれば値が一つに定まり、恒等射を添えれば元の値を復元できる。この二つの操作が共変・反変それぞれのco-Yoneda公式である。

<!-- proof-start -->
### 証明

$b',a$ を固定する。左の合成は

$$
\int^b\operatorname{Hom}_B(b',b)\times P(b,a).
$$

[反変co-Yoneda公式](../../CAT/CAT3-09/index.md#thm-cat3-09-contravariant-coyoneda)に圏 $B$、反変関手 $P(-,a)$、固定対象 $b'$ を代入し、積の二因子を交換する。評価と逆は

$$
[h,p]\mapsto p\cdot h,\qquad x\mapsto[1_{b'},x]
$$

である。生成関係で $h:b'\to b$ を中間射とすると

$$
[h,p]_b=[1_{b'},p\cdot h]_{b'}.
$$

従って逆写像との二合成は恒等写像である。

右の合成は

$$
\int^{a'} P(b',a')\times\operatorname{Hom}_A(a',a)
$$

である。[共変co-Yoneda公式](../../CAT/CAT3-09/index.md#thm-cat3-09-coyoneda)に圏 $A$、共変関手 $P(b',-)$、固定対象 $a$ を代入し、因子を交換する。逆は $x\mapsto[x,1_a]$。商関係により

$$
[p,k]_{a'}=[k\cdot p,1_a]_a.
$$

恒等射の作用は恒等写像なので右も互いに逆になる。

外側の $w:b''\to b'$、$u:a\to a_1$ に関する自然性は、それぞれ

$$
\begin{aligned}
(u\cdot p)\cdot(hw)&=u\cdot((p\cdot h)\cdot w),\\
(uk)\cdot(p\cdot w)&=u\cdot((k\cdot p)\cdot w)
\end{aligned}
$$

である。第一式は反変作用の合成則と二作用の可換性、第二式は共変作用の合成則と可換性を使った。成分が全単射である自然変換の逆は、自然性の等式の両側に逆写像を合成すれば自然になる。

最後に $\alpha:P\Rightarrow P'$ について左の二経路は $\alpha(p\cdot h)=\alpha(p)\cdot h$、右の二経路は $\alpha(k\cdot p)=k\cdot\alpha(p)$。よって分配子の射についても自然である。
<!-- proof-end -->

## 5. 二重coendの順序を交換する

三つの分配子 $P:A\rightsquigarrow B$、$Q:B\rightsquigarrow C$、$R:C\rightsquigarrow D$ をつなぐ。外側の $d,a$ を固定すると、括弧を付ける前の代表元は

$$
(r,q,p)\in R(d,c)\times Q(c,b)\times P(b,a).
$$

中間の $b$ に関する関係と $c$ に関する関係を別々に課すことができる。二つの商を取る順番を交換しても、得られる集合には同じ三つ組による自然な対応があることを示す。

<a id="thm-catb2-09-fubini"></a>

<!-- formal-statement-start -->
> **定理（二重coendのFubini型交換）**
>
> 小圏 $A,B,C,D$ を取る。集合値分配子 $P:A\rightsquigarrow B$、$Q:B\rightsquigarrow C$、$R:C\rightsquigarrow D$ に対し、二つのcoend合成の括弧には自然同型
>
$$
a_{R,Q,P}:(R\odot Q)\odot P
\to R\odot(Q\odot P)
$$

> が存在し、成分は
>
$$
[[r,q]_c,p]_b\longmapsto[r,[q,p]_b]_c
$$

> で与えられる。これは外側の対象の射と三つの分配子の射について自然である。
<!-- formal-statement-end -->

### 証明の見取り図

先に $c$ で商を取る場合も、先に $b$ で取る場合も、タグ付き三つ組の同じ二種類の関係で割った集合に対応する。共通の商を通すことで代表元の選び方に依存しない全単射を構成する。

<!-- proof-start -->
### 証明

$d,a$ を固定し、集合

$$
T=\coprod_{b,c} R(d,c)\times Q(c,b)\times P(b,a)
$$

を作る。小ささによりこの余積は集合である。$v:b\to b'$、$s:c\to c'$ に対し次の二関係を課す。

$$
\begin{aligned}
(r,q,p'\cdot v)_{c,b}
&\sim (r,v\cdot q,p')_{c,b'},\\
(r,q'\cdot s,p)_{c,b}
&\sim (s\cdot r,q',p)_{c',b}.
\end{aligned}
$$

第一式の入力は $r\in R(d,c),q\in Q(c,b),p'\in P(b',a)$、第二式では $r\in R(d,c),q'\in Q(c',b),p\in P(b,a)$ である。両関係を含む最小の同値関係で割った集合を $U$ とする。

左括弧から $U$ への写像を $[[r,q]_c,p]_b\mapsto[r,q,p]$ と置く。内側の代表元変更は第二関係で吸収される。外側の生成関係

$$
[[r,q]_c,p'\cdot v]_b
=[[r,v\cdot q]_c,p']_{b'}
$$

は第一関係で吸収される。内側の共変作用の式は[分配子のcoend合成](../CATB2-07/index.md#thm-catb2-07-composition)で得た外側作用である。従って写像は定義できる。逆に三つ組から左括弧の類を作る写像は、第一関係を外側の商、第二関係を内側の商により保つから $U$ に降りる。二合成はすべての代表元で元の類を返す。

右括弧への写像 $[r,q,p]\mapsto[r,[q,p]_b]_c$ について、第一関係は内側の商で吸収される。第二関係の像は

$$
[r,[q'\cdot s,p]_b]_c
=[s\cdot r,[q',p]_b]_{c'}
$$

であり、内側の反変作用を用いた外側の商関係である。逆に右括弧から三つ組の類を返す写像は、内側・外側の生成関係をそれぞれ第一・第二関係で保つ。ここでも二合成は恒等写像となる。二つの全単射をつないだものが主張の結合子である。

外側の射 $w:d'\to d$、$u:a\to a'$ による作用は、どちらの括弧でも共通の商では

$$
[r,q,p]\mapsto[r\cdot w,q,u\cdot p].
$$

従って外側の自然性が成立する。三つの分配子の射 $\gamma:R\Rightarrow R'$、$\beta:Q\Rightarrow Q'$、$\alpha:P\Rightarrow P'$ について、[分配子の水平合成](#prop-catb2-09-horizontal)を二回適用すると、共通の商上で両経路とも

$$
[r,q,p]\mapsto[\gamma(r),\beta(q),\alpha(p)]
$$

になる。これで結合子の自然性も成立する。
<!-- proof-end -->

中間圏がともに一対象・恒等射のみなら、$U$ は三つの集合の直積であり、結合子は通常の括弧の付け替えになる。中間圏に非恒等射があっても、二種類の同一視が保たれることを上の証明で確認した点が重要である。

## 6. 整合性：Profが双圏になる

単位子も結合子も構成できた。残る問題は、四つの対応の括弧を変える経路と、途中の恒等分配子を消す経路が一致するかである。

<a id="thm-catb2-09-prof"></a>

<!-- formal-statement-start -->
> **定理（集合値分配子の双圏 Prof）**
>
> 小圏を対象、集合値分配子を1-射、分配子の射を2-射とし、coend合成を合成、Hom関手を恒等1-射とする。[二重coendのFubini型交換](#thm-catb2-09-fubini)の結合子と[Profの単位子](#thm-catb2-09-unitors)を用いると双圏 $\mathbf{Prof}$ が得られる。
<!-- formal-statement-end -->

### 証明の見取り図

各Hom圏と合成関手は既に構成した。五角形は四つ組の順序を変えないこと、三角形は中間の射を左右どちらに作用させても同じ類になることを使う。

<!-- proof-start -->
### 証明

Hom圏は第2節の関手圏である。[分配子のcoend合成](../CATB2-07/index.md#thm-catb2-07-composition)と[分配子の水平合成](#prop-catb2-09-horizontal)で合成関手が得られ、[Profの単位子](#thm-catb2-09-unitors)と[二重coendのFubini型交換](#thm-catb2-09-fubini)で必要な自然同型を得る。

四つ目の分配子 $S:D\rightsquigarrow E$ を取り、外側の対象を $e,a$ と固定する。各代表元の型は $t\in S(e,d),r\in R(d,c),q\in Q(c,b),p\in P(b,a)$ である。添字を省き、[双圏の五角形条件](../CATB2-08/index.md#def-catb2-08-bicategory)の二経路を計算する。

$$
\begin{aligned}
[[[t,r],q],p]&\mapsto[[t,r],[q,p]]\\
&\mapsto[t,[r,[q,p]]],\\
[[[t,r],q],p]&\mapsto[[t,[r,q]],p]\\
&\mapsto[t,[[r,q],p]]\\
&\mapsto[t,[r,[q,p]]].
\end{aligned}
$$

各写像は結合子または恒等2-射との水平合成である。どの元もこの形の代表元を持ち、すべての写像は既に商上で定義済みなので、二経路は写像として一致する。

三角形の始域は $(Q\odot I_B)\odot P$ である。代表元 $[[q,h],p]$ の型は $q\in Q(c,b')$、$h:b'\to b$、$p\in P(b,a)$。右単位子を先に用いる経路と、結合子を通って左単位子を用いる経路は

$$
\begin{aligned}
[[q,h],p]&\mapsto[h\cdot q,p],\\
[[q,h],p]&\mapsto[q,[h,p]]\\
&\mapsto[q,p\cdot h]
\end{aligned}
$$

である。両経路はともに定義され、[釣り合いcoend](../CATB2-07/index.md#def-catb2-07-balanced-coend)の生成関係

$$
[h\cdot q,p]_b=[q,p\cdot h]_{b'}
$$

により一致する。従って三角形も成立し、双圏のすべての公理が満たされる。
<!-- proof-end -->

恒等分配子を対角上の一元集合、非対角上の空集合とするだけでは一般に関手にもならない。例えば $0\to1$ の圏で反変作用には対角の一元集合から非対角の空集合への写像が必要になる。Hom関手を単位にすることは単なる記号の選択ではない。

## 7. 演習

### CATB2-09-A01 分配子の射の個数

- Level: A

第2節の定義例で、可能な分配子の射 $P\Rightarrow P'$ をすべて求めよ。

<!-- solution-start -->
**詳細解答。** [分配子の射](#def-catb2-09-distributor-map)の条件は

$$
\alpha_0(z)=\alpha_1(x)\cdot v=\alpha_1(y)\cdot v
$$

である。$X,Y$ の反変作用先がそれぞれ異なる $Z,W$ なので、$\alpha_1(x),\alpha_1(y)$ は同じ元でなければならない。

両方 $X$ なら $\alpha_0(z)=Z$、両方 $Y$ なら $\alpha_0(z)=W$。いずれも他の作用は恒等なので自然性を満たす。従ってちょうど2個である。
<!-- solution-end -->

### CATB2-09-A02 離散圏での合成

- Level: A

外側は一対象・恒等射のみ、中間 $B$ は離散二点とする。$P(0),P(1)$ の元数は $2,3$、$Q(0),Q(1)$ は $4,1$ とする。合成の元数を求めよ。

<!-- solution-start -->
**詳細解答。** [分配子のcoend合成](../CATB2-07/index.md#thm-catb2-07-composition)の生成関係は恒等射に由来するものだけで、異なる組は同一視されない。タグ0の組は $4\times2=8$ 個、タグ1は $1\times3=3$ 個。タグが異なる組も区別されるので $8+3=11$ 個である。
<!-- solution-end -->

### CATB2-09-A03 左単位子を計算する

- Level: A

$A$ は一対象・恒等射のみ、$B$ は $0\xrightarrow{v}1$。$P(0)=\{x\}$、$P(1)=\{y,z\}$ で $P(v)$ は両元を $x$ に送る。$(I_B\odot P)(0)$ の全同値類とその単位子の像を求めよ。

<!-- solution-start -->
**詳細解答。** 対角の組は次の三つである。

$$
[1_0,x]_0,\quad [v,y]_1,\quad [v,z]_1.
$$

中間射 $v$ に対し後二者はそれぞれ

$$
[v,y]_1=[1_0,P(v)y]_0=[1_0,x]_0,
$$

$$
[v,z]_1=[1_0,P(v)z]_0=[1_0,x]_0
$$

となるので一類である。[Profの単位子](#thm-catb2-09-unitors)はこれを $x$ に送る。逆は $x\mapsto[1_0,x]_0$ である。
<!-- solution-end -->

### CATB2-09-A04 右単位子を計算する

- Level: A

$A$ は $0\xrightarrow{v}1$、$B$ は一対象・恒等射のみ。$P(0)=\{x,y\}$、$P(1)=\{z,w\}$ で $P(v)$ は両元を $z$ に送る。$(P\odot I_A)(1)$ の全同値類を求めよ。

<!-- solution-start -->
**詳細解答。** 対角成分は

$$
[x,v]_0,\quad[y,v]_0,\quad[z,1_1]_1,\quad[w,1_1]_1.
$$

生成関係に $v$ を入れると最初の二組はともに $[z,1_1]_1$ と同一視される。非恒等射は $v$ だけなので $[w,1_1]_1$ を他と結ぶ関係はない。

二類の像は[Profの単位子](#thm-catb2-09-unitors)によりそれぞれ $z,w$ となる。
<!-- solution-end -->

### CATB2-09-B01 水平合成の商上の計算

- Level: B

外側は一対象・恒等射のみ、$B$ は $0\xrightarrow{v}1$ とする。$P(0)=\{x\},P(1)=\{y\}$、$P(v)y=x$。$Q(0)=\{s\},Q(1)=\{t,u\}$、$Q(v)s=t$ とする。$Q'$ は $Q'(0)=\{s'\},Q'(1)=\{t'\}$ で $Q'(v)s'=t'$ とする。自然変換 $\beta:Q\Rightarrow Q'$ の各成分を定め、$Q\odot P\to Q'\odot P$ を計算せよ。

<!-- solution-start -->
**詳細解答。** 成分は唯一の写像であり、

$$
\beta_1(Q(v)s)=\beta_1(t)=t'=Q'(v)\beta_0(s)
$$

だから自然である。元の合成には $[s,x]_0=[t,y]_1$ と $[u,y]_1$ の二類がある。像の合成は $[s',x]_0=[t',y]_1$ の一類である。

[分配子の水平合成](#prop-catb2-09-horizontal)で $\alpha=1_P$ とすると、第一類の二代表元の像は

$$
[s',x]_0=[t',y]_1
$$

で同じ。第二類も $[t',y]_1$ に写る。従って二元を一元へ潰す写像になる。
<!-- solution-end -->

### CATB2-09-B02 二種類の商関係

- Level: B

外側 $A,D$ は一対象・恒等射のみ、$B,C$ はそれぞれ矢印圏 $0\to1$ とする。$P$ は両対象で一元集合、$R$ も両対象で一元集合とし、$Q(c,b)$ はすべて $\{0,1\}$ とする。

$B$ の非恒等射の作用は両元を0に送る定値写像、$C$ の非恒等射の反変作用も両元を0に送るとする。三つ組の商を求めよ。

<!-- solution-start -->
**詳細解答。** $Q$ の二方向の作用は恒等写像または0への定値写像で、二つの定値写像の合成も0への定値写像だから可換である。各変数の非恒等射は一つで、恒等射との合成も保つ。従って分配子になる。

一元の因子を省略して三つ組を $(c,b,i)$ と表す。[二重coendのFubini型交換](#thm-catb2-09-fubini)の第一関係は

$$
(c,0,i)\sim(c,1,0)
$$

で、第二関係は

$$
(0,b,0)\sim(1,b,i)
$$

である（$i=0,1$）。四つの $i=0$ の元は両関係でつながる。

$i=1$ のうち $b=0$ の二元は第一関係、$c=1$ の二元は第二関係で0の類につながる。残る $(0,1,1)$ はどの生成関係の端点にも現れない。したがって7元の類と一元の類の二類である。どちらの順序で商を取ってもこの二類が残る。
<!-- solution-end -->

### CATB2-09-B03 関手に由来する分配子と単位

- Level: B

関手 $F:A\to B$ に由来する $P(b,a)=\operatorname{Hom}_B(b,Fa)$ について、左単位子と右単位子を射の合成で表せ。外側の射 $u:a\to a_1$ について左単位子の自然性を確かめよ。

<!-- solution-start -->
**詳細解答。** 反変作用は前合成、共変作用は $F$ で送った射による後合成である（[関手から生じる分配子の構成](../CATB2-07/index.md#def-catb2-07-distributor)）。

$h:b'\to b$ と $p:b\to Fa$ に対する[Profの単位子](#thm-catb2-09-unitors)の左成分は

$$
[h,p]\mapsto ph.
$$

右成分は $k:a'\to a$ と $p:b'\to Fa'$ に対し

$$
[p,k]\mapsto F(k)p
$$

となる。左で先に $u$ を作用させる経路と単位子を先に使う経路をそれぞれ計算すると

$$
\begin{aligned}
[h,p]&\mapsto[h,F(u)p]\mapsto(F(u)p)h,\\
[h,p]&\mapsto ph\mapsto F(u)(ph).
\end{aligned}
$$

圏の合成の結合律で一致する。
<!-- solution-end -->

### CATB2-09-C01 三角形が商を必要とする理由

- Level: C

$A,C$ は一対象・恒等射のみ、$B$ は $0\xrightarrow{v}1$ とする。$P(0)=\{x\},P(1)=\{y\}$、$P(v)y=x$、$Q(0)=\{s\},Q(1)=\{t\}$、$Q(v)s=t$。$(Q\odot I_B)\odot P$ の代表元 $[[s,v],y]$ に三角形の二経路を適用し、商を取らない場合に何が壊れるか説明せよ。

さらに五つの圏がすべて一対象・恒等射のみで、四つの分配子の値がそれぞれ $\{p\},\{q\},\{r\},\{t\}$ である場合、五角形の短い経路と長い経路を代表元から書き下せ。

<!-- solution-start -->
**詳細解答。** $s$ は $Q(0)$ の元、$v:0\to1$ は $I_B(0,1)$ の元、$y$ は $P(1)$ の元なので型は一致する。[Profの単位子](#thm-catb2-09-unitors)の右単位子を $Q$ に適用する経路では

$$
[[s,v],y]\mapsto[v\cdot s,y]_1=[t,y]_1.
$$

[二重coendのFubini型交換](#thm-catb2-09-fubini)と左単位子を用いる経路では

$$
[[s,v],y]\mapsto[s,[v,y]]
\mapsto[s,y\cdot v]_0=[s,x]_0.
$$

[分配子のcoend合成](../CATB2-07/index.md#thm-catb2-07-composition)の生成関係は $[s,x]_0=[t,y]_1$ である。従って二経路は等しい。商を取る前のタグ付き余積では $(s,x)_0$ と $(t,y)_1$ は異なる元である。中間の射による同一視を省くと三角形のこの二経路は一致せず、Hom関手を単位とする構成が壊れる。

後半では各中間圏の非恒等射が存在しないので、各商に残る元は括弧付きの組ただ一つである。[二重coendのFubini型交換](#thm-catb2-09-fubini)の結合子を2回用いると

$
[[[t,r],q],p]\mapsto[[t,r],[q,p]]\mapsto[t,[r,[q,p]]].
$

長い経路では左の三因子を先に組み直し、次いで外側、最後に右の三因子を組み直す。

$
\begin{aligned}
[[[t,r],q],p]&\mapsto[[t,[r,q]],p]\\
&\mapsto[t,[[r,q],p]]\\
&\mapsto[t,[r,[q,p]]].
\end{aligned}
$

両写像は一元集合の唯一の元を同じ元へ送るから等しい。一般の場合の五角形もこの代表元計算を各同値類に適用したものである。
<!-- solution-end -->

## 8. 次に向けて

関手が選んだ対象に由来する分配子だけでなく、一般の分配子も合成できるようになった。次講では、冪等射を分裂させる構成を学び、分配子と対象による表現の関係をさらに調べる。
