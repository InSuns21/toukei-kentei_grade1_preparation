# CAT2-06 押し出しと貼り合わせ

## 1. 二つの対象を「共通部分に沿って」つなぐ

前講では[余積](../CAT2-05/index.md#def-cat2-05-coproduct)によって $A$ と $B$ を区別して集め、[余等化子](../CAT2-05/index.md#def-cat2-05-coequalizer)によって平行な二射の像を等しくした。しかし「$A$ のこの部分と $B$ のこの部分を貼り合わせる」という要求には、その二段階を一つの操作として使いたい。

たとえば $A=\{a_0,a_1\}$ と $B=\{b_0,b_1\}$ のうち、$a_0$ と $b_0$ だけを同一視すると三元集合になる。ところが群の場合は積を壊さないように同一視せねばならず、位相空間の場合は貼った後の**開集合**も決めなければならない。三者に共通するのは「共通の出発点から来る二つの射を一致させた、普遍的な行き先」という条件である。

これから一般圏の条件を定め、集合・群・位相空間でそれを別々の仕組みから実現する。最後に、二つの可換正方形を横に並べたとき何が言えるかを調べる。

## 2. 共通の出発点と普遍的な正方形

まず、一つの対象 $C$ から二つの対象 $A,B$ へ射が出る図式を固定する。向きは $A\leftarrow C\to B$ であり、二つの射が $C$ に**入ってくる**形とは区別する。前講の[図式と余錐](../CAT2-05/index.md#def-cat2-05-cocone)を、この三対象の図式へ適用する準備である。

<a id="def-cat2-06-span"></a>

<!-- formal-statement-start -->
> **定義（スパン）**  
> 圏 $\mathcal C$ における**スパン**とは、対象 $A,B,C$ と二射 $f:C\to A$、$g:C\to B$ の図式

$$
A\xleftarrow{f}C\xrightarrow{g}B
$$

> をいう。スパンの**整合する射の組**とは、ある対象 $X$ に対する $u:A\to X$、$v:B\to X$ で $uf=vg$ を満たす組をいう。
<!-- formal-statement-end -->

<!-- definition-example-start: def-cat2-06-span -->
**定義の確認**

**例：一点を共有する二集合。** $C=\{*\}$、$A=\{a_0,a_1\}$、$B=\{b_0,b_1\}$、$f(*)=a_0$、$g(*)=b_0$ とする。$X=\{0,1\}$ への $u(a_0)=0,u(a_1)=1$ と $v(b_0)=0,v(b_1)=1$ は、$(uf)(*)=0=(vg)(*)$ なので整合する。一方、$v(b_0)=1$ に変えれば $uf\ne vg$ となり、整合しない。
<!-- definition-example-end -->

整合する組を受け取る対象 $P$ を作りたい。ただ「$uf=vg$ が成立する」だけなら $P$ を不必要に潰せてしまう。すべての整合する組へ、**ただ一つの射**が伸びることを要求する。

<a id="def-cat2-06-pushout"></a>

<!-- formal-statement-start -->
> **定義（押し出し）**  
> 圏 $\mathcal C$ のスパン $A\xleftarrow{f}C\xrightarrow{g}B$ の**押し出し**（pushout）とは、対象 $P$ と射 $i_A:A\to P$、$i_B:B\to P$ で $i_Af=i_Bg$ を満たし、さらに任意の対象 $X$ と任意の整合する組 $u:A\to X$、$v:B\to X$ に対し

$$
h i_A=u,\qquad h i_B=v
$$

> を満たす射 $h:P\to X$ が一意に存在するものをいう。存在するとき $P=A\amalg_C B$ と記すことがある。
<!-- formal-statement-end -->

<!-- definition-example-start: def-cat2-06-pushout -->
**定義の確認**

**例：一方が恒等射。** スパン $A\xleftarrow{1_A}A\xrightarrow{g}B$ に対し $P=B$、$i_A=g$、$i_B=1_B$ とする。$i_A1_A=g=1_Bg=i_Bg$。任意の整合する $u:A\to X,v:B\to X$ は $u=vg$ を満たす。$h=v:B\to X$ と取れば $hg=u$、$h1_B=v$ であり、後者の等式から $h$ は必ず $v$ に等しい。存在・一意性の両方を確かめたので押し出しである。
<!-- definition-example-end -->

この正方形では、上辺 $f:C\to A$、左辺 $g:C\to B$、右辺 $i_A:A\to P$、下辺 $i_B:B\to P$ が可換である。押し出しは[余極限](../CAT2-05/index.md#def-cat2-05-colimit)をスパンという特定の小図式に適用したものだから、存在する場合の同型一意性も同じ仕組みで成立する。

<a id="prop-cat2-06-uniqueness"></a>

<!-- formal-statement-start -->
> **命題（押し出しの同型一意性）**  
> 同じスパン $A\xleftarrow{f}C\xrightarrow{g}B$ の押し出しが $(P,i_A,i_B)$ と $(Q,j_A,j_B)$ の二つあるなら、$k i_A=j_A$、$k i_B=j_B$ を満たす同型 $k:P\to Q$ が一意に存在する。
<!-- formal-statement-end -->

### 証明の見取り図

二つの押し出しの普遍性を互いに適用して $k:P\to Q$、$\ell:Q\to P$ を作る。その合成は両方の脚を保存するので、恒等射との一意性比較で逆射と分かる。

<!-- proof-start -->
### 証明

$(j_A,j_B)$ は整合するので、$P$ の[押し出しの定義](#def-cat2-06-pushout)から一意な $k$ を得る。同様に $(i_A,i_B)$ を $Q$ の普遍性へ入力して $\ell$ を得る。すると

$$
(\ell k)i_A=\ell j_A=i_A,\qquad
(\ell k)i_B=\ell j_B=i_B.
$$

$P\to P$ で両脚を保存する射は普遍性から一意であり、恒等射 $1_P$ も保存する。ゆえに $\ell k=1_P$。$Q$ でも $(k\ell)j_A=j_A$、$(k\ell)j_B=j_B$ から $k\ell=1_Q$。したがって $k$ は同型である。一意性は最初の普遍性そのものである。$\square$
<!-- proof-end -->

## 3. 余積で集め、余等化子で貼る

押し出しの存在は定義だけでは保証されない。しかし $A\amalg B$ と、それに対する余等化子が作れる圏なら、具体的に組み立てられる。まず $A,B$ を[二項余積](../CAT2-05/index.md#def-cat2-05-coproduct) $S=A\amalg B$ の中で区別し、その標準射を $\iota_A,\iota_B$ とする。次に $C$ の各元（一般圏では各射）から見た二つの行き先

$$
\iota_A f,\ \iota_B g:C\rightrightarrows S
$$

を一致させればよい。

<a id="thm-cat2-06-coequalizer"></a>

<!-- formal-statement-start -->
> **定理（余積と余等化子による押し出し）**  
> 圏 $\mathcal C$ にスパン $A\xleftarrow f C\xrightarrow g B$ があるとする。二項余積 $(S,\iota_A,\iota_B)$ が存在し、平行二射 $\iota_Af,\iota_Bg:C\rightrightarrows S$ の余等化子 $q:S\to P$ が存在するなら、$i_A=q\iota_A$、$i_B=q\iota_B$ はこのスパンの押し出しをなす。
<!-- formal-statement-end -->

### 証明の見取り図

整合する $(u,v)$ から余積の一意な射 $w:S\to X$ を作ると $w\iota_Af=w\iota_Bg$。そのため $w$ は余等化子 $q$ を経由してただ一つの $h:P\to X$ へ降りる。逆に $h$ の一意性は余積射の一意性と余等化子の一意性を順に使う。

<!-- proof-start -->
### 証明

余等化子の等式 $q\iota_Af=q\iota_Bg$ から $i_Af=i_Bg$ である。任意の整合する $u:A\to X,v:B\to X$ を取る。[余積の普遍性](../CAT2-05/index.md#def-cat2-05-coproduct)より一意の $w:S\to X$ が $w\iota_A=u,w\iota_B=v$ を満たす。そこで

$$
w(\iota_A f)=(w\iota_A)f=uf
=vg=(w\iota_B)g=w(\iota_B g).
$$

[余等化子の普遍性](../CAT2-05/index.md#def-cat2-05-coequalizer)より一意の $h:P\to X$ が $hq=w$ を満たす。よって $hi_A=hq\iota_A=u$、$hi_B=v$。

もし $h':P\to X$ が同じ両等式を満たすなら、$(h'q)\iota_A=u$、$(h'q)\iota_B=v$。余積の一意性から $h'q=w=hq$。余等化子の一意性から $h'=h$ となる。$\square$
<!-- proof-end -->

この構成があるからといって、任意の圏に押し出しが存在するわけではない。[余完備性の存在判定](../CAT2-05/index.md#thm-cat2-05-cocompleteness)を使える圏では必ず存在するが、対象と射の制約が強い部分圏では必要な商がそこに残らないこともある。

## 4. 集合：最小の同値関係で貼り合わせる

$\mathbf{Set}$ では、まずタグ付き非交和 $S=(\{A\}\times A)\cup(\{B\}\times B)$ を作る。$a\in A$ と $b\in B$ の表記を区別するため、以下では $\iota_A(a)$ と $\iota_B(b)$ と記す。$c\in C$ ごとに $\iota_A(f(c))$ と $\iota_B(g(c))$ を同一視したいが、同値関係は対称性と推移性も満たさねばならない。

そこで各 $(\iota_A f(c),\iota_B g(c))$ を含む**最小の同値関係** $\sim$ を取る。これは「等号の向きを逆にすることと有限回つなぐことを許した有限鎖で到達できる」という条件で具体化できる。

<a id="thm-cat2-06-set"></a>

<!-- formal-statement-start -->
> **定理（集合の押し出しの商構成）**  
> 集合の写像 $f:C\to A$、$g:C\to B$ に対し、タグ付き非交和 $S=A\amalg B$ 上の $\iota_A(f(c))\sim\iota_B(g(c))$（$c\in C$）が生成する最小の同値関係を $\sim$ とする。このとき $P=S/{\sim}$ と射

$$
j_A(a)=[\iota_A(a)],\qquad
j_B(b)=[\iota_B(b)]
$$

> は $\mathbf{Set}$ における押し出しをなす。
<!-- formal-statement-end -->

### 証明の見取り図

整合する $u,v$ から和集合上の写像 $w$ を作る。生成関係の両端で $w$ の値が等しいため、等値関係を作る有限鎖の全体でも等しくなる。この事実が商上の写像の well-defined 性を保証する。

<!-- proof-start -->
### 証明

$j_Af(c)=[\iota_A f(c)]=[\iota_B g(c)]=j_Bg(c)$ で可換である。$uf=vg$ を満たす集合写像 $u:A\to X,v:B\to X$ から、タグに応じて

$$
w(\iota_A(a))=u(a),\qquad
w(\iota_B(b))=v(b)
$$

を定める。タグが異なるので $w:S\to X$ は関数であり、生成する各対の値は $w(\iota_A f(c))=uf(c)=vg(c)=w(\iota_B g(c))$。関数値の等しさは反射的・対称的・推移的なので、生成対と逆向きの生成対を有限回たどる任意の鎖の両端でも $w$ は同じ値となる。ゆえに

$$
h([s])=w(s)
$$

は代表元によらず well-defined である。$hj_A=u,hj_B=v$ は定義から従う。もし $h'$ も同じ二式を満たせば、任意の類 $[s]$ の代表元 $s$ は $A$ または $B$ のタグ付き元であり、そこで $h'([s])=h([s])$。全類について等しいから $h'=h$。$\square$
<!-- proof-end -->

**例：非単射な脚は反対側も潰す。** $C=\{0,1\}$、$A=\{a\}$、$B=\{b_0,b_1\}$、$f(0)=f(1)=a$、$g(k)=b_k$ とする。関係から

$$
\iota_B(b_0)\sim\iota_A(a)\sim\iota_B(b_1)
$$

となり、$P$ は一元集合である。$B$ 側はもともと二元あったのに $j_B$ は単射でない。これは「必ず二つの対象を部分集合として埋め込む」という素朴な貼り合わせ像が誤りであることを示す。逆に $f,g$ がともに単射なら、各 $c$ が別々の対応対を与え、鎖は異なる二対へ移れないので $j_A,j_B$ も単射である。

## 5. 群：同一視した後も積を保存させる

集合の商をそのまま群の押し出しには使えない。たとえば自明群 $C=\{e\}$ と二つの無限巡回群 $A=\langle a\rangle,B=\langle b\rangle$ では、群の押し出しには $ab$ や $aba^{-1}$ のような**異なる群からの積**も存在しなければならない。集合の非交和の商にはこれらの元を表す仕組みがない。

そのため、群の生成元を形式的な文字として並べる**語**から出発する。集合 $T$ の各元 $t$ に記号 $x_t$ と形式逆記号 $x_t^{-1}$ を用意し、有限列を連結する。隣り合う $x_tx_t^{-1}$ または $x_t^{-1}x_t$ を削除・挿入できる同値関係で割ると群 $F(T)$ を得る。積は列の連結、単位元は空列、逆元は語の順序を逆にし全記号の符号を反転した列である。

この構成ではすべての語を**既約語**（隣接する逆記号の組を含まない語）へ縮約できる。消去順序が重なるのは $x_tx_t^{-1}x_t$ とその逆型だけで、どちらを先に消しても残りは同じ一文字である。離れた二組の消去は順序を交換できるので、語の長さに関する帰納法で既約語は一意となる。特に $x_ax_b$ と $x_bx_a$（$a\ne b$）は異なる既約語である。任意の写像 $\phi:T\to H$ について、語の各記号を $\phi(t)^{\pm1}$ へ置き換えた積は消去で変わらず、$F(T)\to H$ の**一意な群準同型**を定める。これを語による自由群の普遍性という。

次は $T=(\{A\}\times A)\cup(\{B\}\times B)$ とし、元 $a\in A,b\in B$ を別々の文字 $x_{A,a}$、$x_{B,b}$ で表す。群 $A,B$ 内の積を保存させ、共通の $C$ の像を一致させるため、$F(T)$ に次の関係式を課す：

$$
\begin{gathered}
x_{A,a}x_{A,a'}=x_{A,aa'},\qquad x_{A,e_A}=e,\\
x_{B,b}x_{B,b'}=x_{B,bb'},\qquad x_{B,e_B}=e,\\
x_{A,f(c)}=x_{B,g(c)}\quad(c\in C).
\end{gathered}
$$

「関係式を課す」とは、各左辺と右辺の積の差を単位元へ送るような最小の**正規部分群** $N$（指定された元の共役と積と逆元で生成される部分群）で割ることをいう。[商群の構成](../../../代数系/GRP/GRP2/index.md#thm-grp2-quotient-well-defined)により $F(T)/N$ は群となる。

<a id="thm-cat2-06-group"></a>

<!-- formal-statement-start -->
> **定理（群の押し出しと融合自由積）**  
> 群準同型 $f:C\to A$、$g:C\to B$ が与えられたとする。$T$ を $A,B$ の台集合のタグ付き非交和、$F(T)$ を $T$ 上の自由群とする。$N$ は、$a,a'\in A$、$b,b'\in B$、$c\in C$ に対する次の元が生成する正規部分群とする。

$$
\begin{gathered}
x_{A,a}x_{A,a'}x_{A,aa'}^{-1},\quad x_{A,e_A},\\
x_{B,b}x_{B,b'}x_{B,bb'}^{-1},\quad x_{B,e_B},\\
x_{A,f(c)}x_{B,g(c)}^{-1}.
\end{gathered}
$$

> ここで $x_{A,a},x_{B,b}$ は対応するタグ付き元の自由生成元である。群 $P=F(T)/N$ への写像を

$$
j_A(a)=[x_{A,a}],\qquad j_B(b)=[x_{B,b}]
$$

> と置くと、これらは群準同型であり、$\mathbf{Grp}$ においてこのスパンの押し出しをなす。この群を**融合自由積** $A*_C B$ ともいう。
<!-- formal-statement-end -->

### 証明の見取り図

課した関係によって $j_A,j_B$ はそれぞれ積・単位元を保存し、$j_Af=j_Bg$ となる。任意の整合する準同型の組は、まず自由群 $F(T)$ 上へ一意に伸び、関係式をすべて単位元へ送るため、商群 $P$ を経由する。

<!-- proof-start -->
### 証明

$P$ の積で $j_A(a)j_A(a')=[x_{A,a}x_{A,a'}]=[x_{A,aa'}]=j_A(aa')$、また $j_A(e_A)=e_P$ が成立する。$j_B$ も同様で、逆元の保存は $aa^{-1}=e_A$ から従う。最後の関係式から各 $c\in C$ に対し $j_Af(c)=j_Bg(c)$。

整合する群準同型 $u:A\to H$、$v:B\to H$ を取る。$T$ 上の写像 $x_{A,a}\mapsto u(a)$、$x_{B,b}\mapsto v(b)$ を語に沿って延長すると、一意な群準同型 $\widehat w:F(T)\to H$ を得る。$u(aa')=u(a)u(a')$、$u(e_A)=e_H$、$v(bb')=v(b)v(b')$、$v(e_B)=e_H$ と $uf=vg$ により、上記の各関係式の左辺と右辺は $\widehat w$ で等しい。ゆえに関係式から作った元の共役・積・逆元も $\ker\widehat w$ に入り、$N\subseteq\ker\widehat w$ である。

したがって $h([z])=\widehat w(z)$ は商群 $P\to H$ 上で well-defined な準同型となり、$hj_A=u,hj_B=v$。もし別の $h'$ も両式を満たせば、全生成元の像について $h'[x_{A,a}]=u(a)=h[x_{A,a}]$、$h'[x_{B,b}]=v(b)=h[x_{B,b}]$。生成元の積と逆元で $P$ の全元を表せるので $h'=h$ である。$\square$
<!-- proof-end -->

**例：共通群が自明な場合。** $C=\{e\}$ なら最後の関係式はすでに各群の単位元関係から従う。$P=A*B$ は二群の自由積である。

とくに $A=B=\mathbb Z$（それぞれ $a,b$ で生成）なら、任意の群 $H$ への準同型 $\mathbb Z\to H$ は $1$ の像で一意に決まり、$P\to H$ の準同型は $a,b$ の像を自由に指定できる。二文字上の自由群 $F(\{a,b\})$ も同じ普遍性を持つ。そこで双方の生成元を対応させる射を往復に作ると、合成は各生成元を固定する。したがって

$$
P\cong F(\{a,b\}).
$$

既約語 $ab$ と $ba$ は異なるから $P$ は非可換である。一方、直積 $\mathbb Z\times\mathbb Z$ では $(1,0)+(0,1)=(0,1)+(1,0)$ なので、この押し出しではない。なお $f,g$ が単射でも一般の群の押し出しが単なる集合としての「和集合」になるわけではない。

## 6. 位相空間：集合の貼り合わせに位相を与える

位相空間 $A,B,C$ と連続写像 $f:C\to A,g:C\to B$ を取る。まず集合としての押し出し $P$ を[前節の商構成](#thm-cat2-06-set)で作る。ただし $\mathbf{Top}$ の射は連続写像であるから、同じ集合 $P$ に**どの位相を入れるか**が残る。

タグ付き非交和 $S=A\amalg B$ に、$U\subseteq S$ が開であることと $\iota_A^{-1}(U)$ が $A$ で開、$\iota_B^{-1}(U)$ が $B$ で開であることが同値となる位相（非交和位相）を入れる。空集合・全体、任意和、有限交叉についてこの判定条件が保たれるから、確かに位相である。そして $k:S\to X$ が連続である条件は、$k\iota_A,k\iota_B$ がともに連続であることに等しい：開集合 $V\subseteq X$ の逆像 $k^{-1}(V)$ を両タグへ制限して判定すればよい。

次に商写像 $q:S\to P$ に関する[商位相](../../../基礎科目/TOP/TOP1/index.md#def-top1-quotient-topology)、すなわち

$$
U\subseteq P\text{ が開}\quad\Longleftrightarrow\quad q^{-1}(U)\subseteq S\text{ が開}
$$

を入れる。これで $q$ は連続となる。

<a id="thm-cat2-06-top"></a>

<!-- formal-statement-start -->
> **定理（位相空間の押し出しと商位相）**  
> 位相空間と連続写像の圏 $\mathbf{Top}$ のスパン $A\xleftarrow f C\xrightarrow g B$ を取る。$S=A\amalg B$ に非交和位相を入れ、$\iota_Af(c)\sim\iota_Bg(c)$（$c\in C$）で生成される最小同値関係で割り、$P=S/{\sim}$ とする。商写像 $q:S\to P$ の商位相を $P$ に入れる。すると

$$
j_A=q\iota_A:A\to P,\qquad
j_B=q\iota_B:B\to P
$$

> は連続であり、$\mathbf{Top}$ の押し出しをなす。また任意の位相空間 $X$ と集合写像 $h:P\to X$ について、$h$ が連続であることと、$hj_A,hj_B$ がともに連続であることは同値である。
<!-- formal-statement-end -->

### 証明の見取り図

集合の普遍性で作った $h$ の連続性だけを改めて検査すればよい。非交和の逆像判定と、[商位相の普遍性](../../../基礎科目/TOP/TOP1/index.md#thm-top1-final-universal)を続けて使う。

<!-- proof-start -->
### 証明

$\iota_A,\iota_B$ は非交和位相の定義によって連続であり、商写像 $q$ も連続である。したがって $j_A,j_B$ は連続であり、集合の押し出しの関係から $j_Af=j_Bg$ である。

$u:A\to X,v:B\to X$ を整合する連続写像とする。[集合の押し出しの普遍性](#thm-cat2-06-set)から一意な集合写像 $h:P\to X$ が $hj_A=u,hj_B=v$ を満たす。任意の開集合 $V\subseteq X$ に対し

$$
\iota_A^{-1}(q^{-1}(h^{-1}(V)))=u^{-1}(V),\qquad
\iota_B^{-1}(q^{-1}(h^{-1}(V)))=v^{-1}(V).
$$

右辺はそれぞれ $A,B$ で開なので、非交和位相から $q^{-1}(h^{-1}(V))$ は $S$ で開。商位相から $h^{-1}(V)$ は $P$ で開、つまり $h$ は連続である。逆に $h$ が連続なら $j_A,j_B$ との合成も連続である。一意性は集合写像としてすでに成立するため、連続写像の中でも成立する。$\square$
<!-- proof-end -->

**例：二つの区間の端を結ぶ。** $C=\{*\}$、$A=B=[0,1]$、$f(*)=g(*)=0$ とする。$P$ は二つの区間の $0$ だけを合わせた空間である。写像 $h:P\to X$ が連続か調べるには、二つの区間上への制限 $u(t)=h(j_A(t))$、$v(t)=h(j_B(t))$ が連続で $u(0)=v(0)$ と確かめれば十分である。単に $u(0)=v(0)$ だけでは、ほかの点で不連続な $u$ も許してしまう。

**注意：貼り合わせ先で性質が失われることがある。** 二つの実直線 $A=B=\mathbb R$ を、$C=\mathbb R\setminus\{0\}$ からの包含写像に沿って貼る。商では $t\ne0$ に対応する点が一致し、二つの原点 $0_A,0_B$ は区別される。各原点の任意の開近傍を商から逆像で引くと、各コピーの $0$ の近傍を含むので、十分小さな $t\ne0$ の共通の類を含む。したがって二つの原点の開近傍を互いに交わらないように取れない。どちらの元空間も通常の実直線なのに、貼った後にこの分離性は失われる。

## 7. 押し出し正方形を続けて貼る

図式を段階的に組み立てるとき、「一段ずつ普遍的に貼ったなら全体も普遍的か」を確かめたい。次の可換な二正方形を考える。矢印は右向きと下向きである。

$$
\begin{matrix}
A&\xrightarrow{p}&B&\xrightarrow{q}&C\\
\downarrow r&&\downarrow t&&\downarrow v\\
D&\xrightarrow{s}&E&\xrightarrow{u}&F
\end{matrix}
$$

ここで $tp=sr$ と $vq=ut$。外側の長方形は $A\to C,A\to D,C\to F,D\to F$ からなる正方形とみなす。

<a id="thm-cat2-06-pasting"></a>

<!-- formal-statement-start -->
> **定理（押し出しの貼り合わせ補題）**  
> 圏 $\mathcal C$ で対象 $A,B,C,D,E,F$ と射 $p:A\to B,q:B\to C,r:A\to D,t:B\to E,v:C\to F,s:D\to E,u:E\to F$ が $tp=sr$、$vq=ut$ を満たすとする。この二つの正方形と外側の長方形について次が成立する。
>
> 1. 左右の小正方形がともに押し出しなら、外側の長方形も押し出しである。
> 2. 左の小正方形と外側の長方形が押し出しなら、右の小正方形も押し出しである。
<!-- formal-statement-end -->

### 証明の見取り図

両主張とも、目標の押し出しを試す相手 $X$ と整合する二本の射を取り、既知の正方形の普遍性を順に適用する。逆向きの主張では、外側から作った射が $E$ 上の指定射と一致することを、左正方形の**一意性**によって確かめる。

<!-- proof-start -->
### 証明

**(1)** 外側に整合する $\alpha:C\to X,\delta:D\to X$、すなわち $\alpha qp=\delta r$ を取る。まず $B\to X$ を $\beta=\alpha q$ と置くと $\beta p=\delta r$。左の押し出しから一意な $\varepsilon:E\to X$ が存在し

$$
\varepsilon t=\alpha q,\qquad \varepsilon s=\delta
$$

を満たす。次に右の押し出しへ $\alpha,\varepsilon$ を入力すると、一意な $\varphi:F\to X$ が $\varphi v=\alpha$、$\varphi u=\varepsilon$ を満たす。ゆえに $\varphi us=\varepsilon s=\delta$ で、外側への媒介射ができた。

別の $\varphi'$ が $\varphi'v=\alpha,\varphi'us=\delta$ を満たせば、$\varepsilon'=\varphi'u$ に対し $\varepsilon't=\varphi'vq=\alpha q$、$\varepsilon's=\delta$。左の一意性で $\varepsilon'=\varepsilon$、右の一意性で $\varphi'=\varphi$。したがって外側も押し出しである。

**(2)** 右の正方形に整合する $\alpha:C\to X,\varepsilon:E\to X$、すなわち $\alpha q=\varepsilon t$ を取る。$\delta=\varepsilon s:D\to X$ とすれば

$$
\alpha qp=\varepsilon tp=\varepsilon sr=\delta r.
$$

外側の押し出しから一意な $\varphi:F\to X$ が $\varphi v=\alpha,\varphi us=\delta$ を満たす。残る $\varphi u=\varepsilon$ は、両者を $E\to X$ として左の押し出しで比較すればよい：

$$
(\varphi u)t=\varphi vq=\alpha q=\varepsilon t,\qquad
(\varphi u)s=\delta=\varepsilon s.
$$

左の一意性から $\varphi u=\varepsilon$。もし $\varphi'$ も右で同じ条件を満たせば、$\varphi'v=\alpha,\varphi'us=\varepsilon s=\delta$ なので外側の一意性から $\varphi'=\varphi$。よって右も押し出しである。$\square$
<!-- proof-end -->

この補題は押し出しを繰り返す作業の順序を変えるときに使える。ただし「右と外側が押し出しなら左も押し出し」という**逆向きは一般には成立しない**。右側の操作が、左側の余計な同一視を見えなくすることがある。具体的な有限集合の反例を演習で作ろう。

## 8. 演習：どの射を一致させ、何を保存するか

### CAT2-06-A01 三元集合への貼り合わせ

- Level: A

$C=\{*\}$、$A=\{a_0,a_1\}$、$B=\{b_0,b_1\}$、$f(*)=a_0,g(*)=b_0$ とする。集合の押し出し $P$ の同値類をすべて書き、任意の $u:A\to X,v:B\to X$ が一意の $P\to X$ を誘導するための必要十分条件を求めよ。

<!-- solution-start -->
**詳細解答**

[集合の商構成](#thm-cat2-06-set)で生成される非自明な同一視は $\iota_A(a_0)\sim\iota_B(b_0)$ だけである。ほかの生成対がないため、同値類は

$$
\begin{gathered}
[\iota_A(a_0)]=\{\iota_A(a_0),\iota_B(b_0)\},\\
[\iota_A(a_1)]=\{\iota_A(a_1)\},\\
[\iota_B(b_1)]=\{\iota_B(b_1)\}.
\end{gathered}
$$

誘導射 $h$ の存在を仮定すると $u(a_0)=hj_Af(*)=hj_Bg(*)=v(b_0)$ が必要。逆にこれが成立すれば $h([\iota_A(a_k)])=u(a_k)$、$h([\iota_B(b_k)])=v(b_k)$ は共有する類に同じ値を与えるため well-defined。三類の像はすべて指定済みで一意である。ゆえに必要十分条件は $u(a_0)=v(b_0)$。
<!-- solution-end -->

### CAT2-06-A02 非単射な脚による崩壊

- Level: A

$C=\{0,1\}$、$A=\{a\}$、$B=\{b_0,b_1\}$ とし、$f$ は定数、$g(k)=b_k$ とする。押し出しの同値類の数を求め、標準射 $j_B:B\to P$ が単射か判定せよ。さらにこのスパンから一元集合 $X$ への整合する射がいくつあるか答えよ。

<!-- solution-start -->
**詳細解答**

$c=0$ から $\iota_A(a)\sim\iota_B(b_0)$、$c=1$ から $\iota_A(a)\sim\iota_B(b_1)$ が生成される。推移性から $[\iota_B(b_0)]=[\iota_B(b_1)]$ となり、$P$ の同値類は一つだけ。したがって $j_B(b_0)=j_B(b_1)$ なのに $b_0\ne b_1$ であり、$j_B$ は単射でない。$X$ が一元なら $A,B$ からの関数はそれぞれ一つだけで、両合成も唯一の $C\to X$ に一致するので整合する組は一組である。
<!-- solution-end -->

### CAT2-06-A03 恒等射を含むスパン

- Level: A

任意の圏の射 $g:C\to B$ に対し、$C\xleftarrow{1_C}C\xrightarrow{g}B$ の押し出しが $B$ になることを、媒介射の存在と一意性に分けて確かめよ。

<!-- solution-start -->
**詳細解答**

$P=B$、$i_C=g:C\to B$、$i_B=1_B$ と取る。可換性は $i_C1_C=g=1_Bg$。整合する $u:C\to X,v:B\to X$ は $u1_C=vg$、すなわち $u=vg$ を満たす。$h=v$ と取れば $hi_C=vg=u,hi_B=v1_B=v$ だから存在。別の $h'$ が両条件を満たせば $h'1_B=v$ から $h'=v=h$ となり一意である。
<!-- solution-end -->

### CAT2-06-A04 二本の区間の写像を貼る

- Level: A

$A=B=[0,1]$、$C=\{*\}$、$f(*)=g(*)=0$ の $\mathbf{Top}$ での押し出しを $P$ とする。$u(t)=t$、$v(t)=-t$ を実数への写像とし、$h:P\to\mathbb R$ で $hj_A=u,hj_B=v$ となる連続写像の存在・一意性を示せ。また $v(t)=1-t$ に置き換えたらなぜ存在しないか答えよ。

<!-- solution-start -->
**詳細解答**

$u$ と $v$ は通常位相に関して連続であり、$uf(*)=u(0)=0=v(0)=vg(*)$。したがって[位相空間の押し出しの普遍性](#thm-cat2-06-top)により一意な連続写像 $h$ が存在する。具体的には $h([\iota_A(t)])=t$、$h([\iota_B(t)])=-t$ と定める。共有する $0$ の類で値がともに $0$ なので関数として定まり、商位相の連続性判定を満たす。$v(t)=1-t$ では $v(0)=1\ne u(0)$ なので $hj_Af=hj_Bg$ が必要という可換条件に反し、連続性以前に集合写像としてもそのような $h$ は存在しない。
<!-- solution-end -->

### CAT2-06-A05 自明群からの二本の射

- Level: A

$C=\{e\}$、$A=\langle a\rangle\cong\mathbb Z$、$B=\langle b\rangle\cong\mathbb Z$ の群の押し出しについて、$ab$ と $ba$ が異なることを確認せよ。二群から可換群 $\mathbb Z$ へ $a\mapsto1,b\mapsto2$ と送る準同型が、押し出しからの準同型を一意に定めることも説明せよ。

<!-- solution-start -->
**詳細解答**

$C$ が自明なので、[群の押し出し構成](#thm-cat2-06-group)に追加される $C$ 由来の非自明な関係はない。二つの無限巡回群の自由積は上の例で示した二文字の自由群である。$A,B$ 内の整数べきの積をまとめると、押し出しの元は $a^{m_1}b^{n_1}a^{m_2}\cdots$ という交互の既約語で表される。$ab$ と $ba$ はともに長さ2の別の既約語だから異なる。

加法群 $\mathbb Z$ への準同型を $u(a^m)=m$、$v(b^n)=2n$ と定める。$C$ の唯一の元は双方で $0$ に移るので整合する。[押し出しの普遍性](#def-cat2-06-pushout)により一意な $h:P\to\mathbb Z$ が存在する。

具体的には交互語の指数を $a$ について係数1、$b$ について係数2で加えた値を返す。隣接する逆元の組は合計指数を変えないから語の縮約に依存せず、関係式も保つ。したがって $h$ は well-defined である。
<!-- solution-end -->

### CAT2-06-B01 余等化子の入力を型検査する

- Level: B

圏 $\mathcal C$ に二項余積と必要な余等化子があるとする。$f:C\to A,g:C\to B$ に対して、押し出しを作る平行二射の定義域と終域を書け。二つの普遍性を経由して、整合する $(u,v)$ から一意な $h:P\to X$ が出ることを証明せよ。

<!-- solution-start -->
**詳細解答**

二項余積の標準射を $\iota_A:A\to S=A\amalg B,\iota_B:B\to S$ とする。平行二射は $\iota_Af,\iota_Bg:C\rightrightarrows S$ であり、$f,g$ 自身は終域が違うからそのままでは余等化子に入力できない。余等化子 $q:S\to P$ を取れば $q\iota_Af=q\iota_Bg$。整合する $u:A\to X,v:B\to X$ に余積の普遍性を適用し、$w\iota_A=u,w\iota_B=v$ の一意な $w:S\to X$ を得る。

$$
w\iota_Af=uf=vg=w\iota_Bg
$$

なので余等化子から一意な $h:P\to X$ が $hq=w$ を満たす。よって $hq\iota_A=u,hq\iota_B=v$。別の $h'$ も同様なら $h'q$ と $w$ は余積の両脚上で一致し、余積の一意性で $h'q=w$。余等化子の一意性から $h'=h$ となる。これは[余積と余等化子による構成](#thm-cat2-06-coequalizer)を射の型から再構成したものである。
<!-- solution-end -->

### CAT2-06-B02 単射な二脚で何が保存されるか

- Level: B

集合のスパン $A\xleftarrow f C\xrightarrow g B$ で $f,g$ がともに単射なら、押し出しの標準射 $j_A,j_B$ も単射であることを証明せよ。その議論で、一方の脚が非単射だと破綻する箇所を明示せよ。

<!-- solution-start -->
**詳細解答**

生成対は $\iota_A(f(c))\sim\iota_B(g(c))$ である。$f$ の単射性から $c\ne c'$ なら $f(c)\ne f(c')$、$g$ の単射性から $g(c)\ne g(c')$。したがって、タグ付き集合 $S=A\amalg B$ の各元は高々一つの生成対にしか現れない（$A$ 側と $B$ 側のタグは異なる）。そのため最小同値関係の各類は、生成対をなす二元か、どの対にも現れない一元だけである。とくに同じタグから来る異なる二元は同じ類になれず、$j_A,j_B$ は単射。

例えば $f(0)=f(1)=a$、$g(0)=b_0\ne b_1=g(1)$ では $A$ 側の同じ元が**二つの生成対**に現れ、$b_0\sim a\sim b_1$ という二段の鎖が生じる。このため $j_B$ の単射性が壊れる。単に「商は単射を保存する」と一般化することはできない。
<!-- solution-end -->

### CAT2-06-B03 押し出しの貼り合わせ補題の右側を復元する

- Level: B

第7節の可換図式で左小正方形と外側が押し出しであるとする。右小正方形に整合する $\alpha:C\to X$ と $\varepsilon:E\to X$ を任意に取り、右側の媒介射 $\varphi:F\to X$ を構成せよ。とくに $\varphi u=\varepsilon$ の証明で使う一意性の対象を説明せよ。

<!-- solution-start -->
**詳細解答**

右の整合条件は $\alpha q=\varepsilon t$。$D\to X$ を $\delta=\varepsilon s$ とすれば、左の可換性 $tp=sr$ を使って

$$
\alpha qp=\varepsilon tp=\varepsilon sr=\delta r
$$

となる。外側の押し出しより $\varphi:F\to X$ が一意に存在して $\varphi v=\alpha,\varphi us=\delta$。$\varphi u$ と $\varepsilon$ はともに $E\to X$ で、$t:B\to E$ との合成は $\alpha q$、$s:D\to E$ との合成は $\delta$ で一致する。**左の**押し出しの一意性により $\varphi u=\varepsilon$。右への別の媒介射があれば $v$ と $us$ 上で外側の指定を満たすので、**外側の**一意性から同じ $\varphi$ になる。存在だけでなく二段階の一意性を使い分けた。
<!-- solution-end -->

### CAT2-06-B04 逆向きの貼り合わせは成立しない

- Level: B

第7節の図式を $\mathbf{Set}$ で考え、$A=D=\varnothing$、$B=\{b_1,b_2\}$、$C=E=F=\{*\}$ とし、存在するすべての射を唯一の関数で定める。このとき右の正方形と外側が押し出しだが、左の正方形は押し出しでないことを、各普遍性から示せ。

<!-- solution-start -->
**詳細解答**

右のスパンは $C\xleftarrow q B\xrightarrow t E$ で、$q,t$ はともに一元集合への定数写像である。整合する $u_C:C\to X,u_E:E\to X$ は $u_C(*)=u_E(*)$ と同値であり、一元集合 $F$ からのただ一つの媒介射を定める。したがって右は押し出し。

外側のスパンは $C\xleftarrow{qp}A\xrightarrow r D$ で $A=D=\varnothing$、$C=\{*\}$。任意の $C\to X$ に対し $D\to X$ は空関数で整合条件は空虚であり、$F=\{*\}$ からの媒介射は指定された $C\to X$ そのもので一意。ゆえに外側も押し出し。

一方、左のスパンは $B\leftarrow\varnothing\to\varnothing$ だから、押し出しは[余積の普遍性](../CAT2-05/index.md#def-cat2-05-coproduct)から $B$ の二元を独立に写せる対象でなければならない。ところが候補 $E=\{*\}$ は二元を同一視する。例えば $X=\{0,1\}$ と $u_B(b_1)=0,u_B(b_2)=1$ を選ぶと、空集合からの関数との整合条件は満たすが、$E\to X$ を経由する射は両元に同じ値を与えるため存在しない。よって左は押し出しでない。
<!-- solution-end -->

### CAT2-06-C01 三つの圏で同じ貼り合わせを比較する

- Level: C

次の三つのスパンを別々の圏で考える。各圏で押し出しの構成と射の普遍性を説明し、同じ「貼り合わせ」という語が何を保存するか比較せよ。

1. $\mathbf{Set}$：$C=\{*\}$、$A=B=\mathbb Z$（台集合のみ）、$f(*)=g(*)=0$。
2. $\mathbf{Top}$：同じ集合と写像にすべて離散位相を入れたもの。
3. $\mathbf{Grp}$：$C$ は自明群、$A=B=(\mathbb Z,+)$、脚は単位元への唯一の準同型。

とくに、(1) と (2) の押し出しで非零整数が何通り現れるか、(2) の押し出しが離散空間か、(3) が非可換である理由を示せ。

<!-- solution-start -->
**詳細解答**

**(1) 集合。** タグ付き非交和のうち $\iota_A(0)$ と $\iota_B(0)$ だけを同一視する。したがって類は

$$
\{[\iota_A(0)]\}
\ \cup\
\{[\iota_A(n)]:n\ne0\}
\ \cup\
\{[\iota_B(n)]:n\ne0\}.
$$

各非零整数 $n$ には二つの区別された類がある。整合する写像 $u,v$ は $u(0)=v(0)$ を満たすことであり、この条件から商へ唯一の写像が降りる。

**(2) 位相。** 非交和は離散空間である。商集合 $P$ の任意の部分集合 $U$ の逆像 $q^{-1}(U)$ は、離散空間の部分集合なので開である。ゆえに商位相ではすべての $U$ が開、すなわち $P$ も離散である。類の集合は (1) と同じで、非零整数は各二類。離散空間からのすべての写像は連続なので、整合条件 $u(0)=v(0)$ を満たす任意の連続な $u,v$ から一意な連続写像が降りることを直接確認できる。

**(3) 群。** $A,B$ の整数 $1$ をそれぞれ $a,b$ と書く。[群の押し出しの構成](#thm-cat2-06-group)より、押し出しは二つの無限巡回群の自由積であり、交互の $a,b$ と逆元からなる既約語の群である。$ab$ と $ba$ は異なる既約語なので非可換。

任意の群 $H$ と準同型 $u:A\to H,v:B\to H$ に対し、単位元は双方で $e_H$ へ写るため整合条件は自動的に満たされる。$a\mapsto u(1)$、$b\mapsto v(1)$ を語の積へ伸ばすと一意な準同型 $A*B\to H$ を得る。

三者とも「共通の像を一致させた射を一意に伸ばす」という[押し出しの定義](#def-cat2-06-pushout)を満たす。しかし集合は単に点の同一視、位相空間はさらに**連続性**、群はさらに**積と逆元の保存**を要求する。集合の二コピーの商からは混合積 $ab$ が生まれないし、群の自由積を直積へ置き換えると $ab=ba$ を余計に強制して普遍性を失う。
<!-- solution-end -->

## 9. 次に進む：関手圏で点ごとに貼り合わせる

この講義で、押し出しはスパンの余極限であり、集合・群・位相空間では違う構成を必要とすることが分かった。さらに[押し出しの貼り合わせ補題](#thm-cat2-06-pasting)により、複数の余極限を段階的に計算できる。次は **CAT2-07「関手圏と前層圏の極限」** へ進み、関手の各対象で極限・余極限を計算できる条件と、その結果が自然変換になる理由を調べる。
