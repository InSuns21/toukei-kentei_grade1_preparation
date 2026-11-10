# CAT2-07 関手圏と前層圏の極限

## 1. 対象ごとに作った極限は、関手になるか

[小図式の極限](../CAT2-01/index.md#def-cat2-01-limit)と[余極限](../CAT2-05/index.md#def-cat2-05-colimit)は、対象と射の間に成立する普遍性で定義された。[関手圏](../CAT1-08/index.md#def-cat1-08-functor-category)では、対象が関手、射が自然変換に置き換わる。そこで次の問いが生じる。

例えば、二つの関手 $F,G:\mathcal A\to\mathbf{Set}$ の積を作るとき、各 $a\in\mathcal A$ に集合 $F(a)\times G(a)$ を置くだけで十分だろうか。そうではない。射 $u:a\to b$ に沿う写像も必要であり、さらに射影が自然変換となり、任意の自然変換の組から媒介する自然変換がただ一つ定まらなければならない。

この講義では、値域の圏に（余）極限が存在するとき、関手圏の（余）極限を各対象で計算できることを証明する。そのために次の三つを分ける。

1. **対象ごとの構成**：値域の圏で極限対象や余極限対象を選ぶ。
2. **射に沿った整合性**：それらを関手へ組み立て、脚を自然変換にする。
3. **関手圏での普遍性**：媒介射が自然変換となり、存在・一意性を満たす。

添字圏 $\mathcal J$ と関手の定義域 $\mathcal A$ は、役割が異なる。前者は「どの関手を（余）極限で集めるか」、後者は「その関手をどの対象で評価するか」を表す。どちらも小さい圏とし、値域 $\mathcal C$ は局所小圏とする。これにより、[関手圏の局所小性](../CAT1-08/index.md#prop-cat1-08-size)が保証される。

## 2. 一つの対象で評価する関手

$a\in\mathcal A$ を固定すると、関手 $F$ は対象 $F(a)$ を、自然変換 $\alpha:F\Rightarrow G$ は成分 $\alpha_a:F(a)\to G(a)$ を与える。この取り出し操作が恒等射と合成も保存するように定義する。

<a id="def-cat2-07-evaluation"></a>

<!-- formal-statement-start -->
> **定義（評価関手）**
> $\mathcal A$ を小さい圏、$\mathcal C$ を局所小圏、$a\in\operatorname{Ob}(\mathcal A)$ とする。評価関手

$$
\operatorname{ev}_a:[\mathcal A,\mathcal C]\longrightarrow\mathcal C
$$

> は、対象 $F$ に $F(a)$、射 $\alpha:F\Rightarrow G$ に $\alpha_a$ を対応させる。
<!-- formal-statement-end -->

<!-- definition-example-start: def-cat2-07-evaluation -->
**定義の確認**

**一本の矢印での評価。** $\mathcal A$ を対象 $0,1$ と非恒等射 $u:0\to1$ からなる圏とする。[関手圏の矢印図式の例](../CAT1-08/index.md#def-cat1-08-functor-category)では、$F$ は $f:X\to Y$、自然変換 $\alpha$ は可換四角形 $(s:X\to X',t:Y\to Y')$ に相当する。このとき $\operatorname{ev}_0(F)=X$、$\operatorname{ev}_0(\alpha)=s$ である。

恒等自然変換では $(1_F)_0=1_X$ だから恒等射を保存する。合成可能な自然変換 $\alpha,\beta$ では[垂直合成](../CAT1-08/index.md#def-cat1-08-vertical)の定義から

$$
\operatorname{ev}_0(\beta\cdot\alpha)
=(\beta\cdot\alpha)_0
=\beta_0\circ\alpha_0
=\operatorname{ev}_0(\beta)\circ\operatorname{ev}_0(\alpha).
$$

従って評価は本当に関手である。$1$ での評価でも同じ公理を成分 $t$ で確かめられる。
<!-- definition-example-end -->

図式 $D:\mathcal J\to[\mathcal A,\mathcal C]$ を考える。各 $j\in\mathcal J$ の像は関手 $D(j):\mathcal A\to\mathcal C$ であり、各射 $t:j\to k$ の像は自然変換 $D(t):D(j)\Rightarrow D(k)$ である。$a$ における評価を合成すると

$$
D_a=\operatorname{ev}_a\circ D:\mathcal J\longrightarrow\mathcal C,
\quad
D_a(j)=D(j)(a),\quad D_a(t)=D(t)_a.
$$

これは値域 $\mathcal C$ の通常の図式になる。以下では $D_j=D(j)$ と略す。$D_j(u)$ は関手が射 $u$ に与える像、$D(t)_a$ は自然変換の $a$ 成分を表す。また合成 $v\circ u$ を $vu$ とも書く。

添字圏の射 $t:j\to k$ と定義域の射 $u:a\to b$ が交差するときに使う自然性の等式は

$$
D_k(u)\circ D(t)_a=D(t)_b\circ D_j(u)
\qquad(t:j\to k,\ u:a\to b).
$$

これが点ごとの構成を関手へ戻す鍵である。

## 3. 極限は点ごとに組み立てられる

まず $\mathcal C$ が、各 $a$ で小図式 $D_a$ の極限を持つと仮定しよう。極限錐 $(L(a),p_{j,a})$ を選ぶ。$p_{j,a}:L(a)\to D_j(a)$ は $j$ に関して整合する脚である。しかし $a\mapsto L(a)$ を関手にするには、$u:a\to b$ に対応する射 $L(u):L(a)\to L(b)$ をまだ作らねばならない。

任意の $j$ について、二射の合成

$$
L(a)\xrightarrow{p_{j,a}}D_j(a)\xrightarrow{D_j(u)}D_j(b)
$$

を考える。$t:j\to k$ に対する自然性から、これらの合成は $D_b$ への錐となる。従って $L(b)$ の極限性が、$L(u)$ をただ一つ決める。

<a id="thm-cat2-07-pointwise-limit"></a>

<!-- formal-statement-start -->
> **定理（関手圏の極限の点ごとの構成）**
> $\mathcal A,\mathcal J$ を小さい圏、$\mathcal C$ を局所小圏、$D:\mathcal J\to[\mathcal A,\mathcal C]$ を図式とする。すべての $a\in\mathcal A$ について、図式 $D_a:\mathcal J\to\mathcal C$ の極限錐 $(L(a),p_{j,a})$ が存在すると仮定する。このとき次が成り立つ。
>
> **（1）** 各 $u:a\to b$ に対して、すべての $j$ で次式を満たす唯一の $L(u)$ があり、$a\mapsto L(a)$ は関手 $L:\mathcal A\to\mathcal C$ となる。

$$
p_{j,b}\circ L(u)=D_j(u)\circ p_{j,a}.
$$

> **（2）** $p_j=(p_{j,a})_a:L\Rightarrow D_j$ は自然変換であり、$(L,p_j)$ は $[\mathcal A,\mathcal C]$ における $D$ の極限錐である。
>
> 特に、$\mathcal C$ が[完備圏](../CAT2-04/index.md#def-cat2-04-complete)なら $[\mathcal A,\mathcal C]$ も完備圏である。
<!-- formal-statement-end -->

### 証明の見取り図

各 $u$ を通した脚は自然性によって錐となる。[極限錐の普遍性](../CAT2-01/index.md#def-cat2-01-limit)が与える射の一意性を使って $L(u)$、関手公理、射影の自然性を順に作る。最後に、関手圏から来る任意の錐を各 $a$ で媒介させ、成分の一意性から媒介射そのものの自然性を導く。

<!-- proof-start -->
### 証明

**（1）射の構成。** $u:a\to b$ を固定する。任意の $t:j\to k$ について、$D(t)$ の自然性と $p_{j,a}$ の錐条件を順に使うと

$$
\begin{aligned}
D(t)_b\circ(D_j(u)p_{j,a})
&=D_k(u)\circ D(t)_a\circ p_{j,a}\\
&=D_k(u)\circ p_{k,a}.
\end{aligned}
$$

従って $(D_j(u)p_{j,a})_j$ は $D_b$ への錐である。[極限の普遍性](../CAT2-01/index.md#def-cat2-01-limit)によって、定理の等式を満たす $L(u):L(a)\to L(b)$ がただ一つ存在する。

**（2）関手公理。** $u=1_a$ のとき、$p_{j,a}\circ 1_{L(a)}=D_j(1_a)p_{j,a}=p_{j,a}$。従って同じ脚を与える射の一意性から $L(1_a)=1_{L(a)}$ である。$a\xrightarrow{u}b\xrightarrow{v}c$ なら

$$
\begin{aligned}
p_{j,c}\circ(L(v)L(u))
&=D_j(v)\,p_{j,b}L(u)\\
&=D_j(v)D_j(u)p_{j,a}\\
&=D_j(vu)p_{j,a}
=p_{j,c}L(vu).
\end{aligned}
$$

$L(c)$ の極限錐の脚に対する一意性より $L(vu)=L(v)L(u)$。よって $L$ は関手である。

**（3）極限錐。** $p_{j,b}L(u)=D_j(u)p_{j,a}$ は $p_j$ の自然性そのものである。また $t:j\to k$ に対し、各 $a$ で $D(t)_a p_{j,a}=p_{k,a}$ が成り立つ。したがって自然変換として $D(t)\cdot p_j=p_k$ となり、$(p_j)_j$ は関手圏での錐である。

**（4）媒介自然変換。** 任意の関手圏の錐 $(N,q_j:N\Rightarrow D_j)$ を取る。各 $a$ で $(q_{j,a})_j$ は $D_a$ への錐なので、ただ一つの

$$
h_a:N(a)\longrightarrow L(a),
\qquad p_{j,a}h_a=q_{j,a}
$$

がある。$u:a\to b$ に対して、二つの射 $L(u)h_a$ と $h_bN(u)$ は、すべての $j$ について

$$
\begin{aligned}
p_{j,b}L(u)h_a
&=D_j(u)p_{j,a}h_a=D_j(u)q_{j,a}\\
&=q_{j,b}N(u)=p_{j,b}h_bN(u)
\end{aligned}
$$

を満たす。中央の等号は $q_j$ の自然性である。極限性による一意性から $L(u)h_a=h_bN(u)$、すなわち $h=(h_a)_a:N\Rightarrow L$ は自然変換になる。各 $j$ で $p_j\cdot h=q_j$ である。

他の自然変換 $h'$ が全ての等式を満たすなら、各 $a$ で $p_{j,a}h'_a=q_{j,a}$ となるので $h'_a=h_a$。全成分が等しいから $h'=h$。これで関手圏の極限の存在・一意性が示された。$\mathcal C$ が完備なら、任意の小さい $\mathcal J,D$ に対し仮定が満たされる。$\square$
<!-- proof-end -->

**直接例：関手の積。** $\mathcal C=\mathbf{Set}$、$F,G:\mathcal A\to\mathbf{Set}$ とすると、離散な二対象の添字圏に上の定理を適用できる。[二対象の積の普遍性](../CAT2-02/index.md#def-cat2-02-binary-product)から

$$
(F\times G)(a)=F(a)\times G(a),
\quad
(F\times G)(u)(x,y)=(F(u)(x),G(u)(y))
$$

となる。恒等射の保存は成分ごとに成立し、$u,v$ の合成も

$$
(F\times G)(vu)(x,y)
=(F(v)F(u)(x),G(v)G(u)(y))
$$

だから関手である。射影 $\pi_{F,a}(x,y)=x$ は、任意の $(x,y)\in F(a)\times G(a)$ について

$$
\pi_{F,b}(F\times G)(u)(x,y)=F(u)(x)
=F(u)\pi_{F,a}(x,y)
$$

を満たす。第二射影についても両辺は $G(u)(y)$ となるので、両射影は自然変換である。自然変換 $\alpha:N\Rightarrow F$、$\beta:N\Rightarrow G$ から $h_a(z)=(\alpha_a(z),\beta_a(z))$ を作ると、$u:a\to b$ に対し

$$
\begin{aligned}
(F\times G)(u)h_a(z)
&=(F(u)\alpha_a(z),G(u)\beta_a(z))\\
&=(\alpha_bN(u)(z),\beta_bN(u)(z))\\
&=h_bN(u)(z)
\end{aligned}
$$

であり、$\alpha,\beta$ の自然性から $h$ も自然変換となる。各成分の積の普遍性により、両射影との合成が $\alpha,\beta$ になる $h_a$ はこれ以外にない。単なる集合の積ではなく、関手圏の積を直接確認した。

## 4. 余極限も点ごとに組み立てられる

今度は各 $D_a$ の余極限余錐 $(Q(a),i_{j,a}:D_j(a)\to Q(a))$ を選ぶ。$u:a\to b$ の行き先である $Q(b)$ へ、各 $D_j(a)$ から

$$
D_j(a)\xrightarrow{D_j(u)}D_j(b)\xrightarrow{i_{j,b}}Q(b)
$$

を作る。これらは $D_a$ からの余錐になるため、$Q(a)$ の余極限性が $Q(u)$ を一意に作る。**極限では終点 $L(b)$ の普遍性、余極限では始点 $Q(a)$ の普遍性を使う**という向きの違いに注意する。

<a id="thm-cat2-07-pointwise-colimit"></a>

<!-- formal-statement-start -->
> **定理（関手圏の余極限の点ごとの構成）**
> $\mathcal A,\mathcal J$ を小さい圏、$\mathcal C$ を局所小圏、$D:\mathcal J\to[\mathcal A,\mathcal C]$ を図式とする。各 $a\in\mathcal A$ に $D_a$ の余極限余錐 $(Q(a),i_{j,a})$ が存在すれば、すべての $u:a\to b$ と $j$ について

$$
Q(u)\circ i_{j,a}=i_{j,b}\circ D_j(u)
$$

> を満たす唯一の $Q(u)$ によって関手 $Q:\mathcal A\to\mathcal C$ が定まり、自然変換 $i_j:D_j\Rightarrow Q$ は $D$ の関手圏での余極限余錐をなす。特に $\mathcal C$ が[余完備圏](../CAT2-05/index.md#def-cat2-05-cocomplete)なら $[\mathcal A,\mathcal C]$ も余完備圏である。
<!-- formal-statement-end -->

### 証明の見取り図

余錐条件を $D(t)$ の自然性で確認し、$Q(u)$ を定める。恒等射と合成は余極限の一意性で示す。関手圏の任意の余錐を各成分から媒介するとき、自然性も余極限の「出ていく射の一意性」から従う。

<!-- proof-start -->
### 証明

**（1）射の構成。** $t:j\to k$ に対して

$$
\begin{aligned}
(i_{k,b}D_k(u))D(t)_a
&=i_{k,b}D(t)_bD_j(u)\\
&=i_{j,b}D_j(u)
\end{aligned}
$$

である。最初の等号は $D(t)$ の自然性、次は $i_{j,b}$ の余錐条件による。よって $(i_{j,b}D_j(u))_j$ は $D_a$ から $Q(b)$ への余錐となる。[余極限の普遍性](../CAT2-05/index.md#def-cat2-05-colimit)から表示した $Q(u)$ が一意に存在する。

**（2）関手公理と余錐。** $Q(1_a)$ と $1_{Q(a)}$ はいずれも $i_{j,a}$ との合成が $i_{j,a}$ なので一致する。$a\xrightarrow u b\xrightarrow v c$ では

$$
\begin{aligned}
Q(v)Q(u)i_{j,a}
&=Q(v)i_{j,b}D_j(u)\\
&=i_{j,c}D_j(v)D_j(u)\\
&=i_{j,c}D_j(vu)=Q(vu)i_{j,a}.
\end{aligned}
$$

余極限性による一意性から $Q(vu)=Q(v)Q(u)$。定義式 $Q(u)i_{j,a}=i_{j,b}D_j(u)$ は $i_j$ の自然性であり、各 $a$ で $i_{k,a}D(t)_a=i_{j,a}$ だから $i_k\cdot D(t)=i_j$ である。

**（3）媒介自然変換。** 関手圏での任意の余錐 $q_j:D_j\Rightarrow N$ を取る。各 $a$ で余極限の普遍性より唯一の $h_a:Q(a)\to N(a)$ が存在し

$$
h_ai_{j,a}=q_{j,a}
$$

を満たす。任意の $u:a\to b$ について

$$
\begin{aligned}
N(u)h_ai_{j,a}
&=N(u)q_{j,a}=q_{j,b}D_j(u)\\
&=h_bi_{j,b}D_j(u)=h_bQ(u)i_{j,a}.
\end{aligned}
$$

余極限の一意性で $N(u)h_a=h_bQ(u)$ が従い、$h:Q\Rightarrow N$ は自然変換である。各 $j$ で $h\cdot i_j=q_j$ が成立し、他の媒介自然変換も各成分で $h_a$ に等しい。よって余極限の普遍性が成り立つ。余完備性の場合は任意の小さい $\mathcal J$ で同じ構成ができる。$\square$
<!-- proof-end -->

**直接例：関手の余積。** $\mathbf{Set}$ 値の二関手の余積はタグ付き非交和である。$u:a\to b$ と $x\in F(a),y\in G(a)$ を取り、$\iota_{F,a}:F(a)\to F(a)\amalg G(a)$、$\iota_{G,a}:G(a)\to F(a)\amalg G(a)$ を標準包含とする。添字 $a$ が明らかなときは $\iota_F(x),\iota_G(y)$ とも書く。このとき

$$
(F\amalg G)(a)=F(a)\amalg G(a),
\qquad
(F\amalg G)(u)(\iota_F(x))=\iota_F(F(u)(x)),
\qquad
(F\amalg G)(u)(\iota_G(y))=\iota_G(G(u)(y))
$$

と定まる。第一標準包含の自然性の等式

$$
(F\amalg G)(u)\iota_{F,a}(x)=\iota_{F,b}F(u)(x)
$$

は上の定義式そのものであり、第二標準包含も同じように確認できる。自然変換 $\alpha:F\Rightarrow N$、$\beta:G\Rightarrow N$ があれば、各 $a$ で

$$
h_a\iota_{F,a}=\alpha_a,\qquad
h_a\iota_{G,a}=\beta_a
$$

となる $h_a:F(a)\amalg G(a)\to N(a)$ を定める。[集合の余積](../CAT2-05/index.md#def-cat2-05-coproduct)の普遍性により一意である。さらに

$$
\begin{aligned}
h_b(F\amalg G)(u)\iota_{F,a}(x)
&=h_b\iota_{F,b}F(u)(x)\\
&=\alpha_bF(u)(x)=N(u)\alpha_a(x)\\
&=N(u)h_a\iota_{F,a}(x)
\end{aligned}
$$

であり、$G$ 側も $\beta$ の自然性から同じ等式を満たす。二つの包含の像が余積の全要素を尽くすので $h_b(F\amalg G)(u)=N(u)h_a$ である。こうして関手圏の余積の普遍性も直接確認できる。

## 5. 前層圏：矢印の向きを反転しても点ごとに計算する

既習の[集合値前層と前層圏の定義](../CAT1-12/index.md#def-cat1-12-presheaf)を思い出そう。集合値前層は、元の圏の射 $u:a\to b$ に対して、逆向きの写像 $P(b)\to P(a)$ を割り当てる。

これは[反対圏](../CAT1-04/index.md#def-cat1-04-opposite)の射 $u^{\mathrm{op}}:b\to a$ を集合の圏へ送る共変関手として表現される。以下では $P(u)$ を $P(u^{\mathrm{op}})$ の略記とし、$b$ のデータを $a$ へ**制限する写像**と読む。制限写像の型と合成の順序を改めて書けば

$$
P(u):P(b)\to P(a),\quad
P(1_a)=1_{P(a)},\quad P(vu)=P(u)\circ P(v)
\quad(a\xrightarrow u b\xrightarrow v c)
$$

である。この章では前層圏を $\widehat{\mathcal A}=[\mathcal A^{\mathrm{op}},\mathbf{Set}]$ と記す。その射は制限写像と可換な自然変換である。

**具体例（一本道の制限）**。$\mathcal A$ は $0\xrightarrow{u}1$ と恒等射だけを持つ圏とする。前層 $P$ を

$$
P(0)=\{r,b\},\quad P(1)=\{s\},\quad P(u)(s)=r
$$

で定める。$P(u):P(1)\to P(0)$ と**向きが反転**している。恒等射を恒等写像へ送り、非恒等射を二本続ける合成が存在しないから、すべての関手公理が成り立つ。別の前層 $Q$ を $Q(0)=\{0,1\}, Q(1)=\{t\}, Q(u)(t)=0$ とすると、成分 $\eta_1(s)=t,\eta_0(r)=0,\eta_0(b)=1$ は

$$
Q(u)\eta_1(s)=0=\eta_0P(u)(s)
$$

を満たし、$\eta:P\Rightarrow Q$ という自然変換になる。ここでは $P(0)$ の $b$ は制限の像に入らないが、前層の定義は全射性を要求しない。

<a id="cor-cat2-07-presheaf-bicomplete"></a>

<!-- formal-statement-start -->
> **系（前層圏の完備性・余完備性）**
> 小さい圏 $\mathcal A$ に対し、前層圏 $\widehat{\mathcal A}=[\mathcal A^{\mathrm{op}},\mathbf{Set}]$ は完備かつ余完備である。任意の小さい図式 $D:\mathcal J\to\widehat{\mathcal A}$ の（余）極限は、各 $a\in\mathcal A$ で集合の（余）極限を計算して得られる。制限写像は各成分の普遍性で一意に決まる。
<!-- formal-statement-end -->

### 証明の見取り図

反対圏も小さく、集合の圏は小図式の極限・余極限を持つ。したがって、二つの点ごとの構成定理にそのまま代入できる。

<!-- proof-start -->
### 証明

$\mathcal A$ が小さいので $\mathcal A^{\mathrm{op}}$ も同じ対象・射の集合を持ち小さい。[集合の圏の完備性](../CAT2-04/index.md#thm-cat2-04-completeness)と[余完備性](../CAT2-05/index.md#thm-cat2-05-cocompleteness)を使う。対象とする図式は小さい $\mathcal J$ から前層圏への関手である。

そこで[関手圏の極限の点ごとの構成](#thm-cat2-07-pointwise-limit)には値域 $\mathcal C=\mathbf{Set}$、関手の定義域には $\mathcal A^{\mathrm{op}}$ を代入する。[関手圏の余極限の点ごとの構成](#thm-cat2-07-pointwise-colimit)にも同じ値を代入できる。任意の $a$ で集合の（余）極限が存在し、前層の制限写像、自然変換、普遍性まで両定理が保証する。$\square$
<!-- proof-end -->

**前層の積を手で確かめる。** 先ほどの $P,Q$ について、積 $P\times Q$ は

$$
(P\times Q)(1)=\{(s,t)\},\quad
(P\times Q)(0)=\{r,b\}\times\{0,1\}
$$

を持ち、制限は $(s,t)\mapsto(r,0)$ である。この写像は

$$
(\pi_P)_0(r,0)=r=P(u)(s)=P(u)(\pi_P)_1(s,t)
$$

となる。第二射影でも

$$
(\pi_Q)_0(r,0)=0=Q(u)(t)=Q(u)(\pi_Q)_1(s,t)
$$

となる。さらに $P\times Q$ の恒等射と合成は各成分の制限写像のそれから従うので、両射影は前層の自然変換である。余積 $P\amalg Q$ では $(P\amalg Q)(1)$ の元は $\iota_P(s)$、$\iota_Q(t)$ の二つであり、制限先はそれぞれ $\iota_P(r),\iota_Q(0)$。タグを忘れて $r$ と $0$ を同一視してはいけない。

## 6. 評価が保存するものと、仮定の境界

上の二定理は、関手圏の（余）極限の各 $a$ 成分が値域での（余）極限になっていることを述べる。従って値域の各評価図式に（余）極限があるという仮定の下で、評価関手はここで構成した（余）極限を**保存**する。ただし一つの評価 $\operatorname{ev}_a$ だけを知っても、他の対象での値や射の作用は復元できない。「保存する」を「一成分から全体を作れる」と読み替えない。

<a id="prop-cat2-07-evaluation-preserves"></a>

<!-- formal-statement-start -->
> **命題（評価関手による極限・余極限の保存）**
> $\mathcal A,\mathcal J$ を小さい圏、$\mathcal C$ を局所小圏とする。$\mathcal C$ が $D:\mathcal J\to[\mathcal A,\mathcal C]$ の各評価図式 $D_a$ の極限（それぞれ余極限）を持ち、前二定理の点ごとの構成を行ったとき、任意の $a\in\mathcal A$ について $\operatorname{ev}_a$ はその極限錐（それぞれ余極限余錐）を $\mathcal C$ の極限錐（それぞれ余極限余錐）へ送る。
<!-- formal-statement-end -->

### 証明の見取り図

点ごとの構成の定義に戻り、評価後の頂点と脚を実際に書き出せば、選んだ値域の（余）極限と一致する。

<!-- proof-start -->
### 証明

[点ごとの極限の構成](#thm-cat2-07-pointwise-limit)では $\operatorname{ev}_a(L)=L(a)$ で、評価した脚は $\operatorname{ev}_a(p_j)=p_{j,a}$ である。これらは定理の仮定で選んだ $D_a$ の極限錐そのものである。余極限の場合にも[点ごとの余極限の構成](#thm-cat2-07-pointwise-colimit)から評価後の頂点・脚が $(Q(a),i_{j,a})$ となり、$D_a$ の余極限余錐である。$\square$
<!-- proof-end -->

**存在仮定を落とせない例。** $\mathcal A$ を対象一つ・射は恒等射だけの小さい圏とする。このとき $[\mathcal A,\mathbf{FinSet}]$ は有限集合の圏 $\mathbf{FinSet}$ と同じ形をしている。しかし $\mathbf{FinSet}$ に可算個の二元集合の積があると仮定すると、[小さい積の普遍性](../CAT2-04/index.md#def-cat2-04-small-product)を始域 $\{*\}$ に適用して、積 $P$ と一元集合の間の写像全体は

$$
\operatorname{Hom}_{\mathbf{FinSet}}(\{*\},P)
\cong\prod_{n\in\mathbb N}
\operatorname{Hom}_{\mathbf{FinSet}}(\{*\},\{0,1\})
\cong\{0,1\}^{\mathbb N}
$$

となる。左辺は有限集合 $P$ の元の集合なので有限、右辺は $n$ 番目だけが $1$ になる列を無限個含むため無限であり、矛盾する。失った仮定は値域の小図式の極限の存在であり、**各成分 $L(a)$ を選ぶ最初の段階**が止まる。有限極限が存在することだけでは可算極限を保証しない。

また、$\mathcal J$ を小さい圏とすることは「小図式」についての定理であることを明確にする。値域がある種の大きい図式の（余）極限を持つかどうかは、ここで証明した小図式全体についての存在性とは別の問いである。

## 7. 演習：成分の普遍性を自然変換へ戻す

### CAT2-07-A01 評価関手の合成保存

- Level: A

小さい $\mathcal A$ と局所小な $\mathcal C$、任意の $a\in\mathcal A$、$F\xRightarrow{\alpha}G\xRightarrow{\beta}H$ を取る。$\operatorname{ev}_a$ が恒等射・合成を保存することを示せ。

<!-- solution-start -->
**詳細解答。** 恒等自然変換 $1_F$ の $a$ 成分は $1_{F(a)}$ だから、$\operatorname{ev}_a(1_F)=1_{\operatorname{ev}_a(F)}$ である。[垂直合成の定義](../CAT1-08/index.md#def-cat1-08-vertical)を使うと

$$
\operatorname{ev}_a(\beta\cdot\alpha)
=(\beta\cdot\alpha)_a
=\beta_a\circ\alpha_a
=\operatorname{ev}_a(\beta)\circ\operatorname{ev}_a(\alpha).
$$

二つの関手公理が確認できた。
<!-- solution-end -->

### CAT2-07-A02 積関手の射への作用

- Level: A

$F,G:\mathcal A\to\mathbf{Set}$ に対して $(F\times G)(a)=F(a)\times G(a)$、$(F\times G)(u)(x,y)=(F(u)x,G(u)y)$ と置く。恒等射・合成の保存を確認せよ。

<!-- solution-start -->
**詳細解答。** $1_a$ の像は

$$
(F\times G)(1_a)(x,y)
=(F(1_a)x,G(1_a)y)=(x,y).
$$

$a\xrightarrow u b\xrightarrow v c$ に対して

$$
\begin{aligned}
(F\times G)(v)(F\times G)(u)(x,y)
&=(F(v)F(u)x,G(v)G(u)y)\\
&=(F(vu)x,G(vu)y)\\
&=(F\times G)(vu)(x,y).
\end{aligned}
$$

各成分が関手なので中央の等号が成立する。したがって積関手も関手である。
<!-- solution-end -->

### CAT2-07-A03 前層の制限方向

- Level: A

$\mathcal A$ を $0\xrightarrow u1$ と恒等射だけからなる圏とする。$P(0)=\{a,b\}$、$P(1)=\{z\}$、$P(u)(z)=b$ とする。このデータが前層になること、および $P(u)$ の始域・終域を説明せよ。

<!-- solution-start -->
**詳細解答。** [反対圏の定義](../CAT1-04/index.md#def-cat1-04-opposite)では $u^{\mathrm{op}}:1\to0$ になる。従って写像の型は $P(u):\{z\}\to\{a,b\}$ であり、指定した値はこの型に合う。各恒等射を恒等写像へ送る。$\mathcal A^{\mathrm{op}}$ に非恒等射二本の合成はないため、合成の保存で確認すべき残りは恒等射との合成のみで、どちらも $P(u)$ になる。よって関手、すなわち前層である。
<!-- solution-end -->

### CAT2-07-A04 前層の余積のタグ

- Level: A

上と同じ矢印圏の前層 $P,Q$ について $P(1)=\{z\},P(0)=\{a\}$、$Q(1)=\{w\},Q(0)=\{a\}$ とし、各制限写像は唯一の写像とする。$(P\amalg Q)(1)$ と $(P\amalg Q)(0)$ と制限写像を具体的に書け。

<!-- solution-start -->
**詳細解答。** 同じ記号 $a$ でも異なる前層の元なので、集合の[タグ付き余積](../CAT2-05/index.md#def-cat2-05-coproduct)を使う。

$$
(P\amalg Q)(1)=\{\iota_P(z),\iota_Q(w)\},
\quad
(P\amalg Q)(0)=\{\iota_P(a),\iota_Q(a)\}.
$$

制限は $\iota_P(z)\mapsto\iota_P(a)$、$\iota_Q(w)\mapsto\iota_Q(a)$。例えば $u:0\to1$ に対して、前層の制限を $R=P\amalg Q$ と書けば

$$
R(u)\iota_{P,1}(z)=\iota_{P,0}P(u)(z)=\iota_{P,0}(a)
$$

であり、$Q$ 側でも $R(u)\iota_{Q,1}(w)=\iota_{Q,0}Q(u)(w)$ となる。これが二つの標準包含との自然性交換式であり、同じ記号 $a$ の元を同一視しない。これは[点ごとの余極限定理](#thm-cat2-07-pointwise-colimit)の二項余積の場合である。
<!-- solution-end -->

### CAT2-07-A05 射影の自然性

- Level: A

$F,G:\mathcal A\to\mathbf{Set}$ の積関手に対し、各 $a$ での第一射影 $\pi_{F,a}$ が自然変換 $F\times G\Rightarrow F$ を定めることを、任意の $u:a\to b$ について証明せよ。

<!-- solution-start -->
**詳細解答。** 射影の型は $\pi_{F,a}:F(a)\times G(a)\to F(a)$。任意の $(x,y)$ について

$$
\begin{aligned}
\pi_{F,b}(F\times G)(u)(x,y)
&=\pi_{F,b}(F(u)x,G(u)y)\\
&=F(u)x\\
&=F(u)\pi_{F,a}(x,y).
\end{aligned}
$$

従って二つの合成写像は同じであり、[自然変換の定義](../CAT1-07/index.md#def-cat1-07-natural-transformation)を満たす。
<!-- solution-end -->

### CAT2-07-B01 極限媒介射はなぜ自然か

- Level: B

定理の記号を用い、錐 $q_j:N\Rightarrow D_j$ から各 $a$ で $p_{j,a}h_a=q_{j,a}$ を満たす $h_a$ を取る。$h_bN(u)=L(u)h_a$ を、両辺に $p_{j,b}$ を合成して導け。

<!-- solution-start -->
**詳細解答。** 任意の $j$ で

$$
p_{j,b}h_bN(u)=q_{j,b}N(u)
=D_j(u)q_{j,a}
=D_j(u)p_{j,a}h_a
=p_{j,b}L(u)h_a.
$$

二番目の等号は $q_j$ の自然性、最後は[点ごとの極限の構成](#thm-cat2-07-pointwise-limit)で決めた $L(u)$ の定義式による。両辺は $N(a)\to L(b)$ という同じ型の射である。$L(b)$ の極限錐で媒介射は一意なので両者は等しい。これが $h$ の自然性である。
<!-- solution-end -->

### CAT2-07-B02 余極限媒介射はなぜ自然か

- Level: B

余極限定理の記号を用い、余錐 $q_j:D_j\Rightarrow N$ から $h_ai_{j,a}=q_{j,a}$ を取る。$N(u)h_a=h_bQ(u)$ を、各 $i_{j,a}$ との合成によって示せ。

<!-- solution-start -->
**詳細解答。** 任意の $j$ で

$$
\begin{aligned}
(N(u)h_a)i_{j,a}
&=N(u)q_{j,a}\\
&=q_{j,b}D_j(u)\\
&=h_bi_{j,b}D_j(u)\\
&=(h_bQ(u))i_{j,a}.
\end{aligned}
$$

二番目は $q_j$ の自然性、最後は[点ごとの余極限の構成](#thm-cat2-07-pointwise-colimit)における $Q(u)$ の定義式である。余極限 $Q(a)$ からの射は $i_{j,a}$ と合成した値で一意に決まるので、$N(u)h_a=h_bQ(u)$。自然変換の向きも $h:Q\Rightarrow N$ と確定する。
<!-- solution-end -->

### CAT2-07-B03 前層の点ごとの引き戻し

- Level: B

小さい $\mathcal A$ 上の前層 $P,Q,R$ と自然変換 $f:P\Rightarrow R$、$g:Q\Rightarrow R$ を取る。各 $a$ で

$$
T(a)=\{(x,y)\in P(a)\times Q(a)\mid f_a(x)=g_a(y)\}
$$

と定める。射 $u:a\to b$ に対する制限 $T(u)$ を構成し、well-defined 性と前層の引き戻しの普遍性を説明せよ。

<!-- solution-start -->
**詳細解答。** $u:a\to b$ のとき、元 $(x,y)\in T(b)$ に対して

$$
T(u)(x,y)=(P(u)x,Q(u)y)
$$

と置く。$f,g$ の自然性から

$$
\begin{aligned}
f_a(P(u)x)
&=R(u)f_b(x)\\
&=R(u)g_b(y)\\
&=g_a(Q(u)y)
\end{aligned}
$$

となるので像は $T(a)$ に入る。恒等射では $T(1_a)(x,y)=(x,y)$。また $a\xrightarrow u b\xrightarrow v c$ と $(x,y)\in T(c)$ について

$$
\begin{aligned}
T(u)T(v)(x,y)
&=(P(u)P(v)x,Q(u)Q(v)y)\\
&=(P(vu)x,Q(vu)y)=T(vu)(x,y).
\end{aligned}
$$

よって $T$ は前層である。二つの射影は $\pi_{P,a}(x,y)=x$、$\pi_{Q,a}(x,y)=y$ であり、自然性は

$$
\begin{aligned}
\pi_{P,a}T(u)(x,y)&=P(u)x=P(u)\pi_{P,b}(x,y),\\
\pi_{Q,a}T(u)(x,y)&=Q(u)y=Q(u)\pi_{Q,b}(x,y)
\end{aligned}
$$

で確認できる。さらに $f_a(x)=g_a(y)$ が $T(a)$ の定義条件なので $f\pi_P=g\pi_Q$ が各成分で成立する。

任意の前層 $N$ と自然変換 $s:N\Rightarrow P,t:N\Rightarrow Q$ が $fs=gt$ を満たすなら、$h_a(z)=(s_a(z),t_a(z))$ は $T(a)$ に入る。制限について

$$
T(u)h_b(z)
=(P(u)s_b(z),Q(u)t_b(z))
=(s_aN(u)(z),t_aN(u)(z))
=h_aN(u)(z)
$$

なので $h:N\Rightarrow T$ であり、二射影との合成は $s,t$。両射影が成分で $h_a$ を一意に決めるから、普遍性が示された。[引き戻しの定義](../CAT2-03/index.md#def-cat2-03-pullback)を前層圏でも直接検証できた。
<!-- solution-end -->

### CAT2-07-B04 有限集合の圏で失敗する可算積

- Level: B

$\mathcal A$ を一対象・恒等射のみの圏とする。$[\mathcal A,\mathbf{FinSet}]$ に可算個の二元集合の積が存在しないことを、始域が一元集合の Hom 集合の個数から証明せよ。

<!-- solution-start -->
**詳細解答。** この関手圏の対象は有限集合一つを選ぶこと、射は集合の写像を選ぶことと同値である。積 $P$ があると仮定すると、[小さい積の普遍性](../CAT2-04/index.md#def-cat2-04-small-product)を始域 $\{*\}$ で適用して

$$
\operatorname{Hom}(\{*\},P)
\cong\prod_{n\in\mathbb N}\operatorname{Hom}(\{*\},\{0,1\})
\cong\{0,1\}^{\mathbb N}.
$$

右辺には、各 $m$ ごとに $m$ 番目だけ $1$ とする相異なる列があるため無限個の元が存在する。一方左辺の元は $P$ の元と一対一対応し、$P$ は有限集合なので有限である。矛盾。点ごとの構成の[値域の完備性という仮定](#thm-cat2-07-pointwise-limit)を外すと、必要な積対象がない場合がある。
<!-- solution-end -->

### CAT2-07-C01 前層の余等化子を商と制限から構成する

- Level: C

$\mathcal A$ を小さい圏、$F,G:\mathcal A^{\mathrm{op}}\to\mathbf{Set}$ を前層、$\alpha,\beta:F\Rightarrow G$ を自然変換とする。各 $a$ で、対 $(\alpha_a(x),\beta_a(x))$（$x\in F(a)$）が生成する最小同値関係を $\sim_a$ とし、$Q(a)=G(a)/{\sim_a}$ と置く。

1. $u:a\to b$ の制限が $Q(u)([y])=[G(u)(y)]$ で定義できることを証明せよ。
2. 商写像 $q:G\Rightarrow Q$ が自然変換で、$q\alpha=q\beta$ を満たすことを示せ。
3. 任意の自然変換 $h:G\Rightarrow N$ が $h\alpha=h\beta$ を満たすとき、ただ一つの自然変換 $\bar h:Q\Rightarrow N$ に分解することを示せ。

<!-- solution-start -->
**詳細解答。** まず[集合の余等化子の商構成](../CAT2-05/index.md#thm-cat2-05-set-coequalizer)から、$q_a:G(a)\to Q(a)$ は各 $a$ で $\alpha_a,\beta_a$ の余等化子である。

**（1）well-defined 性。** 自然性により、$u:a\to b$ と $x\in F(b)$ に対して

$$
\begin{aligned}
G(u)(\alpha_b(x))&=\alpha_a(F(u)x),\\
G(u)(\beta_b(x))&=\beta_a(F(u)x).
\end{aligned}
$$

従って $G(u)$ は $\sim_b$ の各生成対を $\sim_a$ の生成対に移す。等号、逆向きの対、有限鎖をそれぞれ保つので、$y\sim_b y'$ なら $G(u)y\sim_a G(u)y'$。ゆえに $Q(u)([y])=[G(u)y]$ は代表元の選び方に依存しない。

**（2）前層と余等化の条件。** 恒等射について $Q(1_a)([y])=[G(1_a)y]=[y]$。合成 $a\xrightarrow u b\xrightarrow v c$ と $[z]\in Q(c)$ に対して

$$
Q(u)Q(v)([z])=[G(u)G(v)z]=[G(vu)z]=Q(vu)([z]).
$$

よって $Q$ は前層である。任意の $u:a\to b$ について

$$
Q(u)q_b(y)=[G(u)y]=q_aG(u)(y),
$$

だから $q$ は自然変換。また $q_a\alpha_a(x)=q_a\beta_a(x)$ は $\sim_a$ の生成対の定義から成り立ち、成分ごとに $q\alpha=q\beta$。

**（3）自然な媒介射。** $h\alpha=h\beta$ なら各 $h_a$ は生成対の像を一致させる。等号・対称・推移に従って任意の $y\sim_a y'$ の像も一致するから

$$
\bar h_a:Q(a)\to N(a),\qquad
\bar h_a([y])=h_a(y)
$$

がwell-definedで、$\bar h_aq_a=h_a$ を満たす。$u:a\to b$ に対し

$$
\bar h_aQ(u)([y])
=h_aG(u)y
=N(u)h_b(y)
=N(u)\bar h_b([y]).
$$

よって $\bar h$ は自然変換である。$q_a$ は全射だから、$\bar h'_aq_a=h_a$ を満たす別の成分 $\bar h'_a$ は各 $[y]=q_a(y)$ 上で $\bar h'_a([y])=h_a(y)$ を強制される。従って $\bar h'=\bar h$。自然変換としての余等化子の普遍性が証明できた。$\square$
<!-- solution-end -->

## 8. 次に進む：随伴を Hom 集合で捉える

関手圏では極限と余極限が成分ごとに計算できることを証明した。次のCAT2-08「随伴のHom集合による定義」では、「各対象からの射の集合が自然に対応する」という別の普遍性を扱う。そこでは自然性が二変数にわたるため、この講義で成分と射の向きを追った経験が役に立つ。
