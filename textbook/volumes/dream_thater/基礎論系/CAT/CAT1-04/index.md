# CAT1-04 反対圏と双対原理

## 1. なぜ射をすべて逆にするのか

前講では、射 $f:A\to B$ について、[モノ射](../CAT1-03/index.md#def-cat1-03-monomorphism)は $f\circ u=f\circ v$ から $u=v$ を導く性質、[エピ射](../CAT1-03/index.md#def-cat1-03-epimorphism)は $r\circ f=s\circ f$ から $r=s$ を導く性質と定義した。二つはよく似ているが、$f$ を合成する側が反対である。

ここで、単独の射の矢印だけを反転させても、合成の仕方を定めなければ圏にはならない。**圏全体の射を反転し、合成の順序も整合的に逆転させる**構成を作ろう。そうすれば、一つの証明から別の向きの証明を得る仕組みを、文字の置き換えでなく厳密な論証として理解できる。

本講の到達点は次の六つである。

1. 射を反転した新しい圏を実際に構成し、圏の公理を検算する。
2. 二度反対にすると元に戻ることを示す。
3. モノ射とエピ射、片側逆とその双対を、射の型から証明する。
4. あらゆる対象へ向かう射、またはあらゆる対象から来る射の**存在かつ一意性**で、特別な二種類の対象を定義する。
5. それら二種類の対象の双対性と、一意同型を証明する。
6. 集合・順序圏・一対象圏で一般形を手で判定する。

## 2. 反対圏：矢印を逆にしたときの合成

まず二点鎖 $0<1$ から作る[半順序圏](../CAT1-02/index.md#prop-cat1-02-order-category)では、非恒等射は $0\to1$ だけである。矢印を逆にした図式には $1\to0$ が現れる。これが今から定義する構成の最小例である。

一般の[圏の定義](../CAT1-01/index.md#def-cat1-01-category)では、合成の入力と出力の型が一致する必要がある。圏 $\mathcal C$ の射 $f:A\to B$ を逆向きに読んだ射を $f^{\mathrm{op}}:B\to A$ と書く。これは元の射の**逆射**ではない。逆射は[同型射](../CAT1-03/index.md#def-cat1-03-isomorphism)にしか存在しないが、ここでの $f^{\mathrm{op}}$ はすべての射に対応する、別の圏の射である。

<a id="def-cat1-04-opposite"></a>

<!-- formal-statement-start -->
> **定義（反対圏）**  
> 圏 $\mathcal C$ に対し、その**反対圏** $\mathcal C^{\mathrm{op}}$ を次のように定める。
>
> **（O1）対象**。$\mathcal C$ と同じものとする。
>
> **（O2）射**。任意の対象 $A,B$ に対し、射の集まりは

$$
\operatorname{Hom}_{\mathcal C^{\mathrm{op}}}(A,B)
=\operatorname{Hom}_{\mathcal C}(B,A)
$$

> とする。右辺の射 $f:B\to A$ を左辺の射 $f^{\mathrm{op}}:A\to B$ と表す。
>
> **（O3）恒等射**。対象 $A$ の恒等射を $(1_A)^{\mathrm{op}}$ とする。
>
> **（O4）合成**。$\mathcal C$ で $f:A\to B$, $g:B\to C$ が合成できるとき、反対圏の合成を

$$
f^{\mathrm{op}}\circ_{\mathrm{op}}g^{\mathrm{op}}
:=(g\circ f)^{\mathrm{op}}
$$

> と定める。左辺の射の向きは $C\to B\to A$ である。
<!-- formal-statement-end -->

定義の最後の式には、右辺で $g\circ f$ と書き、左辺で $f^{\mathrm{op}}\circ_{\mathrm{op}}g^{\mathrm{op}}$ と書く、**順序の反転**が含まれている。$\circ_{\mathrm{op}}$ は反対圏内の合成で、通常の $\circ$ は元の圏内の合成である。両者を同じ記号 $\circ$ で書く場合もあるが、最初は区別して追おう。

Hom の等号は、元の射 $f:B\to A$ と反対圏の射 $f^{\mathrm{op}}:A\to B$ を一対一に対応させて同一視する記法である。両者を別々の圏の射として読むため、元の圏で $A\to B$ という逆向きの射が新しく存在するわけではない。

<!-- definition-example-start: def-cat1-04-opposite -->
**定義の確認**（二点鎖）。$\mathcal C$ に対象 $0,1$、恒等射 $1_0,1_1$、非恒等射 $a:0\to1$ があるとする。反対圏には $a^{\mathrm{op}}:1\to0$ があり、各Homは次のようになる。

$$
\begin{aligned}
\operatorname{Hom}_{\mathcal C^{\mathrm{op}}}(1,0)&=\{a^{\mathrm{op}}\},\\
\operatorname{Hom}_{\mathcal C^{\mathrm{op}}}(0,1)&=\varnothing,\\
\operatorname{Hom}_{\mathcal C^{\mathrm{op}}}(i,i)&=\{(1_i)^{\mathrm{op}}\}
\quad(i=0,1).
\end{aligned}
$$

例えば $\mathcal C$ で $a\circ1_0=a$ なので、反対圏では

$$
(1_0)^{\mathrm{op}}\circ_{\mathrm{op}}a^{\mathrm{op}}
=(a\circ1_0)^{\mathrm{op}}=a^{\mathrm{op}}.
$$

同様に $a^{\mathrm{op}}\circ_{\mathrm{op}}(1_1)^{\mathrm{op}}=a^{\mathrm{op}}$。恒等射との両側合成も定義の式から検査できる。
<!-- definition-example-end -->

### 2.1 本当に圏になるか

<a id="prop-cat1-04-opposite-axioms"></a>

<!-- formal-statement-start -->
> **命題（反対圏の公理と二重反対圏）**  
> 任意の圏 $\mathcal C$ に対し、上記の対象・射・合成は圏 $\mathcal C^{\mathrm{op}}$ を定める。さらに、対応する射と合成を元へ戻す自然な同一視の下で

$$
(\mathcal C^{\mathrm{op}})^{\mathrm{op}}=\mathcal C
$$

> が成り立つ。
<!-- formal-statement-end -->

### 証明の見取り図

反対圏の三本の射を元の圏へ戻すと、合成可能な三本の列が逆順に並ぶ。両方の括弧付けを元の圏で計算し、[結合則](../CAT1-01/index.md#def-cat1-01-category)で比較する。恒等射も元の単位律から従う。二度逆転するとHomの向きも合成順序も元に戻る。

<!-- proof-start -->
### 証明

まず反対圏の射 $u^{\mathrm{op}}:A\to B$ と $v^{\mathrm{op}}:B\to C$ は、元の圏では $u:B\to A$, $v:C\to B$ に対応する。従って $u\circ v:C\to A$ は合成可能であり、

$$
v^{\mathrm{op}}\circ_{\mathrm{op}}u^{\mathrm{op}}
=(u\circ v)^{\mathrm{op}}:A\to C
$$

も正しい型の射である。この合成は元の合成から一意に定まる。

結合則を調べる。元の圏で $f:D\to C$, $g:C\to B$, $h:B\to A$ とすると、反対圏では $h^{\mathrm{op}}:A\to B$, $g^{\mathrm{op}}:B\to C$, $f^{\mathrm{op}}:C\to D$ である。定義を二回使うと

$$
\begin{aligned}
(f^{\mathrm{op}}\circ_{\mathrm{op}}g^{\mathrm{op}})
\circ_{\mathrm{op}}h^{\mathrm{op}}
&=(g\circ f)^{\mathrm{op}}\circ_{\mathrm{op}}h^{\mathrm{op}}\\
&=(h\circ(g\circ f))^{\mathrm{op}},\\
f^{\mathrm{op}}\circ_{\mathrm{op}}
(g^{\mathrm{op}}\circ_{\mathrm{op}}h^{\mathrm{op}})
&=f^{\mathrm{op}}\circ_{\mathrm{op}}(h\circ g)^{\mathrm{op}}\\
&=((h\circ g)\circ f)^{\mathrm{op}}.
\end{aligned}
$$

$\mathcal C$ の結合則で $h\circ(g\circ f)=(h\circ g)\circ f$ なので両辺は一致する。

単位律は、元の圏の任意の $f:A\to B$ に対し、反対圏では $f^{\mathrm{op}}:B\to A$ であることに注意する。左から合成する単位は $(1_A)^{\mathrm{op}}$、右から合成する単位は $(1_B)^{\mathrm{op}}$ なので、

$$
\begin{aligned}
(1_A)^{\mathrm{op}}\circ_{\mathrm{op}}f^{\mathrm{op}}
&=(f\circ1_A)^{\mathrm{op}}=f^{\mathrm{op}},\\
f^{\mathrm{op}}\circ_{\mathrm{op}}(1_B)^{\mathrm{op}}
&=(1_B\circ f)^{\mathrm{op}}=f^{\mathrm{op}}.
\end{aligned}
$$

従って単位律が成立する。

最後に二度反対を取ると、対象は変わらず、任意の $A,B$ について

$$
\operatorname{Hom}_{(\mathcal C^{\mathrm{op}})^{\mathrm{op}}}(A,B)
=\operatorname{Hom}_{\mathcal C^{\mathrm{op}}}(B,A)
=\operatorname{Hom}_{\mathcal C}(A,B).
$$

合成についても、逆転を二度行うと $g\circ f$ に戻る。恒等射も元のものに戻るから、指定した同一視で同じ圏となる。$\square$
<!-- proof-end -->

反対圏を計算するとき、定義の合成式をうっかり普通の合成へ置き換えると、元の圏で合成不可能な式が現れる。型を書いてから括弧を外す癖が役に立つ。

### 2.2 小さい圏かどうかは変わらない

<a id="prop-cat1-04-size"></a>

<!-- formal-statement-start -->
> **命題（反対圏と大きさ）**  
> 圏 $\mathcal C$ が[小さい圏](../CAT1-02/index.md#def-cat1-02-size)であることと $\mathcal C^{\mathrm{op}}$ が小さい圏であることは同値である。同様に、[局所小圏](../CAT1-02/index.md#def-cat1-02-size)であることも反対圏を取る前後で同値である。
<!-- formal-statement-end -->

### 証明の見取り図

対象・射全体は反対を取っても一対一に対応する。各Homは添字を交換した同じ集合だから、局所小性も双方向に保たれる。

<!-- proof-start -->
### 証明

反対圏の対象全体は $\mathcal C$ と同じであり、射全体は $f\leftrightarrow f^{\mathrm{op}}$ の全単射で対応する。従って両者で対象と射の集まりが集合であることは同値である。任意の $A,B$ について

$$
\operatorname{Hom}_{\mathcal C^{\mathrm{op}}}(A,B)
=\operatorname{Hom}_{\mathcal C}(B,A)
$$

だから、左辺がすべて集合である条件は右辺がすべて集合である条件と同値である。$\square$
<!-- proof-end -->

## 3. 双対原理：一つの証明を反転する

「反対圏で成立する」は「同じ圏で逆向きの射が実在する」という意味ではない。元の圏と反対圏の**二つの圏を分けて**考えれば、反転の規則が明確になる。

<a id="def-cat1-04-dual-statement"></a>

<!-- formal-statement-start -->
> **定義（双対命題）**  
> 圏について、対象・射・恒等射・合成の型と等式だけで記述した命題 $P$ に対し、すべての射の向き、合成順序、始域・終域を交換して得る命題を **双対命題** $P^{\mathrm{op}}$ と呼ぶ。追加仮定があるときは、仮定も同じ規則で反転する。
<!-- formal-statement-end -->

<!-- definition-example-start: def-cat1-04-dual-statement -->
**定義の確認**。「$f:A\to B$ の左側で合成して消せる」という[モノ射の定義](../CAT1-03/index.md#def-cat1-03-monomorphism)を反転すると、「$f^{\mathrm{op}}:B\to A$ の右側で合成して消せる」という[エピ射の定義](../CAT1-03/index.md#def-cat1-03-epimorphism)になる。ここでは元の圏の $f$ が、反対圏の $f^{\mathrm{op}}$ に変わっていることが重要である。次節で式をすべて書いて検証する。
<!-- definition-example-end -->

この操作を証明済みの普遍命題へ適用できるという一般原則には、次の名前を付ける。

<a id="def-cat1-04-dual-principle"></a>

<!-- formal-statement-start -->
> **定義（双対原理）**  
> 任意の圏に対して圏の公理から証明できる命題 $P$ に対し、その双対命題 $P^{\mathrm{op}}$ も任意の圏について証明できる、という推論規則を **双対原理** と呼ぶ。特定の追加仮定の下でしか成立しない命題では、その仮定も双対に置き換える。
<!-- formal-statement-end -->

<!-- definition-example-start: def-cat1-04-dual-principle -->
**定義の確認**。元の圏で $f$ の左消去律をすべての圏について証明できる条件が与えられたなら、対応する反対圏で右消去律が成り立つことが結論となる。ただし「特定の圏で左消去律が成り立つ射がある」だけでは、元の圏に逆向きの射を構成できたことにはならない。
<!-- definition-example-end -->

<a id="prop-cat1-04-duality"></a>

<!-- formal-statement-start -->
> **命題（普遍命題の双対化）**  
> 圏の公理だけから任意の圏 $\mathcal C$ について証明できる命題 $P(\mathcal C)$ の双対命題 $P^{\mathrm{op}}(\mathcal C)$ も、任意の圏 $\mathcal C$ で成立する。ただし射の向きに関わる追加仮定を置いた命題では、その仮定も反転させる。
<!-- formal-statement-end -->

### 証明の見取り図

任意の圏 $\mathcal C$ について $\mathcal C^{\mathrm{op}}$ も圏だから、元の定理を $\mathcal C^{\mathrm{op}}$ へ適用できる。その主張を $\mathcal C$ の言葉へ翻訳すれば双対命題になる。

<!-- proof-start -->
### 証明

任意の圏 $\mathcal C$ を固定する。[反対圏の公理](#prop-cat1-04-opposite-axioms)から $\mathcal D:=\mathcal C^{\mathrm{op}}$ は圏である。$P$ はすべての圏で成立すると仮定したので $P(\mathcal D)$ が成り立つ。

$P(\mathcal D)$ にある射 $A\to B$ は $\mathcal C$ では $B\to A$、合成 $g\circ_{\mathcal D}f$ は $\mathcal C$ で対応する射の逆順合成になる。従って $P(\mathcal D)$ を $\mathcal C$ の記法で書き直したものが $P^{\mathrm{op}}(\mathcal C)$ である。$\mathcal C$ は任意なので結論が得られる。

もし $P$ の証明が特定の追加仮定 $H(\mathcal D)$ を用いるなら、ここから言えるのは $H^{\mathrm{op}}(\mathcal C)$ の下での $P^{\mathrm{op}}(\mathcal C)$ である。仮定を反転させずに結論だけを反転することはできない。$\square$
<!-- proof-end -->

例えば「どの圏にも特別な対象が存在する」という未証明の主張から、その向きを反転した存在を結論できるわけではない。また、集合の圏 $\mathbf{Set}$ とその反対圏を同一視してよいわけでもない。[双対原理](#def-cat1-04-dual-principle)は**普遍的な証明の反転**であって、任意の具体的な圏が自己双対だという主張ではない。

## 4. モノ射とエピ射が入れ替わる

ここでは定義中のすべての射の型を揃え、双対性を直接証明する。$f:A\to B$ を $\mathcal C$ の射とし、反対圏では $f^{\mathrm{op}}:B\to A$ と読む。

<a id="prop-cat1-04-mono-epi"></a>

<!-- formal-statement-start -->
> **命題（モノ射とエピ射の双対性）**  
> 任意の圏 $\mathcal C$ の射 $f:A\to B$ に対して、次の二つはそれぞれ同値である。
>
> 1. $f$ が $\mathcal C$ でモノ射であること $\Longleftrightarrow$ $f^{\mathrm{op}}:B\to A$ が $\mathcal C^{\mathrm{op}}$ でエピ射であること。
> 2. $f$ が $\mathcal C$ でエピ射であること $\Longleftrightarrow$ $f^{\mathrm{op}}:B\to A$ が $\mathcal C^{\mathrm{op}}$ でモノ射であること。
<!-- formal-statement-end -->

### 証明の見取り図

モノ射では試験射 $u,v:X\to A$ に左から $f$ を合成する。反対圏では $u^{\mathrm{op}},v^{\mathrm{op}}:A\to X$ に右から $f^{\mathrm{op}}$ を合成することになり、まさにエピ射の条件に変わる。

<!-- proof-start -->
### 証明

$\mathcal C$ の射 $f$ が[モノ射](../CAT1-03/index.md#def-cat1-03-monomorphism)である条件を定義に戻すと、任意の $X$ と $u,v:X\to A$ について

$$
f\circ u=f\circ v\quad\Longrightarrow\quad u=v
$$

が成立することである。反対圏では $u^{\mathrm{op}},v^{\mathrm{op}}:A\to X$ となり、[反対圏の合成](#def-cat1-04-opposite)を代入すると

$$
\begin{aligned}
u^{\mathrm{op}}\circ_{\mathrm{op}}f^{\mathrm{op}}
&=(f\circ u)^{\mathrm{op}},\\
v^{\mathrm{op}}\circ_{\mathrm{op}}f^{\mathrm{op}}
&=(f\circ v)^{\mathrm{op}}.
\end{aligned}
$$

射を逆向きに読む対応は一対一なので、二つの右辺が等しいことと $f\circ u=f\circ v$ は同値、結論 $u^{\mathrm{op}}=v^{\mathrm{op}}$ と $u=v$ も同値である。これは反対圏における[エピ射の右消去律](../CAT1-03/index.md#def-cat1-03-epimorphism)そのものである。各 $X,u,v$ をすべて量化しているため、両方向の含意が成立する。

次に $\mathcal C$ のエピ射性では、任意の $Y$ と $r,s:B\to Y$ について $r\circ f=s\circ f$ から $r=s$ を要請する。反対圏では $r^{\mathrm{op}},s^{\mathrm{op}}:Y\to B$ であり、

$$
\begin{aligned}
f^{\mathrm{op}}\circ_{\mathrm{op}}r^{\mathrm{op}}
&=(r\circ f)^{\mathrm{op}},\\
f^{\mathrm{op}}\circ_{\mathrm{op}}s^{\mathrm{op}}
&=(s\circ f)^{\mathrm{op}}.
\end{aligned}
$$

従って反対圏での左消去律は、元の圏での右消去律と同値になる。こちらがモノ射の条件であり、二つ目も証明された。$\square$
<!-- proof-end -->

**具体例**。集合と写像の圏で包含 $i:\{0\}\hookrightarrow\{0,1\}$ は[集合でのモノ射の特徴づけ](../CAT1-03/index.md#prop-cat1-03-set-characterization)によりモノ射だが全射でなく、エピ射ではない。対応する射 $i^{\mathrm{op}}:\{0,1\}\to\{0\}$ は $\mathbf{Set}^{\mathrm{op}}$ でエピ射だがモノ射ではない。反対圏の射を元の集合写像と見間違え、そこでの「全射だからエピ射」と推論してはいけない。

### 4.1 同型と分裂性はどうなるか

片側だけの逆射も双対に入れ替わる。元の圏で左逆 $\ell:B\to A$ を持つ射 $f:A\to B$ を考えると、$\ell\circ f=1_A$ を反対に読んで

$$
f^{\mathrm{op}}\circ_{\mathrm{op}}\ell^{\mathrm{op}}
=(\ell\circ f)^{\mathrm{op}}=(1_A)^{\mathrm{op}}
$$

となる。反対圏では $f^{\mathrm{op}}$ の**右逆**が $\ell^{\mathrm{op}}$ である。

<a id="prop-cat1-04-iso-split"></a>

<!-- formal-statement-start -->
> **命題（同型射と分裂射の双対性）**  
> 任意の圏 $\mathcal C$ と射 $f:A\to B$ について、次の三つの対応が成り立つ。
>
> 1. $f$ が同型射であることと、反対圏の $f^{\mathrm{op}}$ が同型射であることは同値である。
> 2. $f$ が分裂モノ射であることと、反対圏の $f^{\mathrm{op}}$ が分裂エピ射であることは同値である。
> 3. $f$ が分裂エピ射であることと、反対圏の $f^{\mathrm{op}}$ が分裂モノ射であることは同値である。
<!-- formal-statement-end -->

### 証明の見取り図

[逆射と片側逆](../CAT1-03/index.md#def-cat1-03-split)の等式をそれぞれ反転する。右逆も同じように左逆へ移る。双方向性は二重反対圏で元へ戻ることから従う。

<!-- proof-start -->
### 証明

$\ell:B\to A$ が $f$ の左逆、すなわち $\ell\circ f=1_A$ なら、上に計算した通り

$$
f^{\mathrm{op}}\circ_{\mathrm{op}}\ell^{\mathrm{op}}
=(1_A)^{\mathrm{op}}
$$

なので $\ell^{\mathrm{op}}:A\to B$ は $f^{\mathrm{op}}:B\to A$ の右逆である。逆に反対圏で右逆があれば、その等式を元の圏へ戻すと左逆が得られる。

同様に $r:B\to A$ が $f\circ r=1_B$ を満たすとき、

$$
r^{\mathrm{op}}\circ_{\mathrm{op}}f^{\mathrm{op}}
=(f\circ r)^{\mathrm{op}}=(1_B)^{\mathrm{op}}
$$

なので $r^{\mathrm{op}}$ は左逆である。逆向きも同様に元へ戻せる。最後に同型射は[両側の逆射を持つ射](../CAT1-03/index.md#def-cat1-03-isomorphism)だから、二つの等式を一緒に反転すれば同型性が保たれる。$\square$
<!-- proof-end -->

## 5. 始対象と終対象：射がただ一本という普遍性

集合の圏では、空集合から任意の集合への写像がただ一本ある。一方、任意の集合から一元集合への写像もただ一本ある。この「すべての対象に対して一意な射がある」という条件を、出発点と到着点で区別する。

**存在と一意性は別々の条件**である。例えば空でない集合から空集合への写像は存在しない。他方、二元集合への写像は通常複数ある。従って、図式に矢印を一本描いただけでは普遍性を示したことにならない。

<a id="def-cat1-04-initial-terminal"></a>

<!-- formal-statement-start -->
> **定義（始対象・終対象）**  
> 圏 $\mathcal C$ の対象 $I$ が**始対象**であるとは、任意の対象 $X$ に対して射 $I\to X$ がちょうど一本存在することをいう。
>
> 対象 $T$ が**終対象**であるとは、任意の対象 $X$ に対して射 $X\to T$ がちょうど一本存在することをいう。すなわち、それぞれ

$$
\begin{aligned}
I\text{ が始対象}
&\ \Longleftrightarrow\
\forall X,\ |\operatorname{Hom}_{\mathcal C}(I,X)|=1,\\
T\text{ が終対象}
&\ \Longleftrightarrow\
\forall X,\ |\operatorname{Hom}_{\mathcal C}(X,T)|=1
\end{aligned}
$$

> である。ここで $|\operatorname{Hom}|=1$ は、Homがちょうど一射からなるという意味である。
<!-- formal-statement-end -->

<!-- definition-example-start: def-cat1-04-initial-terminal -->
**定義の確認**（集合の圏）。任意の集合 $X$ について、空集合を定義域に持つ写像 $\varnothing\to X$ は空のグラフに限られるから、存在しかつ一意である。従って $\varnothing$ は $\mathbf{Set}$ の始対象である。

一元集合 $T=\{*\}$ に対して任意の集合 $X$ からの写像は、すべての $x\in X$ を $*$ へ送るものしかない。$X=\varnothing$ でもその唯一の写像が存在する。従って $T$ は終対象である。

二元集合 $\{0,1\}$ は終対象でない。一元集合 $X=\{a\}$ から $a\mapsto0$ と $a\mapsto1$ の二写像があるため、一意性が失われる。空でない集合は始対象でない。例えばその集合から $\{0,1\}$ への二つの定値写像が異なるためである。
<!-- definition-example-end -->

<a id="prop-cat1-04-initial-terminal-dual"></a>

<!-- formal-statement-start -->
> **命題（始対象と終対象の双対性）**  
> 任意の圏 $\mathcal C$ の対象 $I$ について、$I$ が $\mathcal C$ の始対象であることと、$I$ が $\mathcal C^{\mathrm{op}}$ の終対象であることは同値である。同様に、$\mathcal C$ の終対象は $\mathcal C^{\mathrm{op}}$ の始対象であり、その逆も成り立つ。
<!-- formal-statement-end -->

### 証明の見取り図

始対象を判定するHomの一意性と、反対圏における終対象を判定するHomの一意性は、**同じHomの集まり**を別の順で書いているだけである。

<!-- proof-start -->
### 証明

任意の対象 $X$ について[反対圏のHom](#def-cat1-04-opposite)を代入すると

$$
\operatorname{Hom}_{\mathcal C^{\mathrm{op}}}(X,I)
=\operatorname{Hom}_{\mathcal C}(I,X).
$$

左辺がすべての $X$ について一元である条件は、右辺がすべての $X$ について一元である条件に等しい。[始対象](#def-cat1-04-initial-terminal)と[終対象](#def-cat1-04-initial-terminal)の各条件を適用すると、$I$ は元の圏の始対象であることと反対圏の終対象であることが同値となる。終対象の場合も

$$
\operatorname{Hom}_{\mathcal C^{\mathrm{op}}}(T,X)
=\operatorname{Hom}_{\mathcal C}(X,T)
$$

と計算すれば、反対圏で始対象となることと同値である。$\square$
<!-- proof-end -->

始対象・終対象が存在するとは限らない。例えば異なる二対象 $p,q$ の恒等射だけを持つ離散圏では、$p\to q$ も $q\to p$ もないので、どちらの対象も始対象でも終対象でもない。双対原理は**非存在を存在へ変える操作ではない**。

### 5.1 「一意な対象」ではなく「一意な同型まで」

<a id="prop-cat1-04-initial-terminal-unique"></a>

<!-- formal-statement-start -->
> **命題（始対象・終対象の一意同型）**  
> 任意の圏 $\mathcal C$ で二つの始対象 $I,J$ が存在するとき、$I\to J$ の唯一の射は同型射であり、その逆射は $J\to I$ の唯一の射である。二つの終対象 $T,U$ にも同じ結論が成り立つ。
<!-- formal-statement-end -->

### 証明の見取り図

始対象からはどの対象へもただ一本の射がある。二つの始対象間の行き帰りを合成すると自己射になるが、恒等射も自己射だから、それらは一致する。終対象については[普遍命題の双対化](#prop-cat1-04-duality)を適用できる。

<!-- proof-start -->
### 証明

$I,J$ を始対象とすると、始対象の定義から一意な $f:I\to J$ と $g:J\to I$ がある。合成 $g\circ f:I\to I$ は存在する。一方、$1_I:I\to I$ も存在し、始対象 $I$ に対して $\operatorname{Hom}(I,I)$ は一元なので

$$
g\circ f=1_I.
$$

同様に $J$ も始対象で $\operatorname{Hom}(J,J)$ は一元だから

$$
f\circ g=1_J.
$$

従って[同型射の定義](../CAT1-03/index.md#def-cat1-03-isomorphism)から $f,g$ は互いに逆射であり、各向きの射も一意である。

終対象 $T,U$ に対しては、[始対象と終対象の双対性](#prop-cat1-04-initial-terminal-dual)により $T,U$ は $\mathcal C^{\mathrm{op}}$ の始対象となる。いま証明した結論を反対圏に適用すると、そこでの唯一の二射は互いに逆射である。[同型射の双対性](#prop-cat1-04-iso-split)によって $\mathcal C$ でも互いに逆射となる。$\square$
<!-- proof-end -->

「始対象は一つ」と言う場合、これは一般に対象の等号を意味しない。$\mathbf{Set}$ では互いに異なる一元集合 $\{0\}$ と $\{1\}$ はどちらも終対象だが同じ集合ではなく、一意な同型で結ばれる。

## 6. 順序圏と一対象圏で向きを検査する

### 6.1 半順序圏では最小元と最大元を交換する

[半順序圏](../CAT1-02/index.md#prop-cat1-02-order-category)で $x\to y$ がある条件は $x\preceq y$ である。その反対圏で $x\to y$ がある条件は $y\preceq x$。従って反対圏は、反対順序 $x\preceq^{\mathrm{op}}y\iff y\preceq x$ の順序圏となる。

このHomは存在するとき必ず一元である。よって元の順序圏で $m$ が始対象であることは、すべての $x$ に対して $m\preceq x$、つまり $m$ が**最小元**であることと同値である。終対象はすべての $x$ に対し $x\preceq M$ を満たす**最大元**に対応する。反対順序では両者が入れ替わる。

ここで $x\prec y$ は $x\preceq y$ かつ $x\ne y$ を表す厳密な順序記号とする。三点鎖 $0\prec1\prec2$ では始対象と終対象がそれぞれ $0,2$ であり、反対圏では $2,0$ に入れ替わる。反対圏を取っても、対象の名前そのものは変わらない。

**注意**。「極小元」と「最小元」は異なる。比較できない二点の離散順序では各点は極小元かつ極大元だが、始対象も終対象もない。すべての対象と比較できるという全称条件が抜けると、証明に必要な射そのものが消える。

### 6.2 一対象圏では積の順序が逆になる

[モノイドから作る一対象圏](../CAT1-02/index.md#prop-cat1-02-one-object)を考える。モノイドの積を $xy$ と書き、元の圏で合成 $x\circ y$ を積 $xy$ に対応させる。反対圏では新しい積を

$$
x\star y:=yx
$$

と定めた一対象圏になる。結合法則は

$$
(x\star y)\star z=z(yx)=(zy)x
=x\star(y\star z)
$$

で検証でき、元の単位元 $e$ は

$$
e\star x=xe=x,\qquad x\star e=ex=x
$$

を満たす。積が非可換なら、一般に $x\star y\ne xy$ である。「一対象だから反対圏は同じ」と思い込むのは誤りである。

また、一対象圏で唯一の対象が始対象となるのは、その自己Hom、すなわちモノイドの元が**ただ一つ**のときに限る。終対象についても同じである。単位元を持つだけでは始対象・終対象を保証しない。

## 7. 演習：双対性を自分で再構成する

### CAT1-04-A01 合成の向きを検算する

- Level: A

圏 $\mathcal C$ の射 $f:A\to B$, $g:B\to C$, $h:C\to D$ を取る。反対圏でこれらの射の始域・終域を明記し、$f^{\mathrm{op}}\circ_{\mathrm{op}}g^{\mathrm{op}}$ と $(f^{\mathrm{op}}\circ_{\mathrm{op}}g^{\mathrm{op}})\circ_{\mathrm{op}}h^{\mathrm{op}}$ を元の圏の合成で表せ。

<!-- solution-start -->
**詳細解答**。反対圏では

$$
f^{\mathrm{op}}:B\to A,\quad
g^{\mathrm{op}}:C\to B,\quad
h^{\mathrm{op}}:D\to C.
$$

従って左から書いた合成の出発点は $C$、到着点は $A$ である。[反対圏の定義](#def-cat1-04-opposite)を代入して

$$
f^{\mathrm{op}}\circ_{\mathrm{op}}g^{\mathrm{op}}
=(g\circ f)^{\mathrm{op}}:C\to A
$$

を得る。さらに $h^{\mathrm{op}}:D\to C$ が右に付くので、

$$
\begin{aligned}
(f^{\mathrm{op}}\circ_{\mathrm{op}}g^{\mathrm{op}})
\circ_{\mathrm{op}}h^{\mathrm{op}}
&=(g\circ f)^{\mathrm{op}}\circ_{\mathrm{op}}h^{\mathrm{op}}\\
&=(h\circ(g\circ f))^{\mathrm{op}}:D\to A.
\end{aligned}
$$

元の圏では $A\to B\to C\to D$ の順に合成している。
<!-- solution-end -->

### CAT1-04-A02 反対順序の全Homを列挙する

- Level: A

三点鎖 $0\prec1\prec2$ の順序圏 $\mathcal P$ に対し、$\mathcal P^{\mathrm{op}}$ の空でないHomをすべて列挙し、始対象と終対象を判定せよ。

<!-- solution-start -->
**詳細解答**。この三点鎖の順序を $\preceq$ と書けば、元の圏では $i\to j$ があるのは $i\preceq j$ のときである。反対圏では $i\to j$ があるのは $j\preceq i$ のときなので、空でないHomは

$$
\operatorname{Hom}(0,0),\
\operatorname{Hom}(1,1),\
\operatorname{Hom}(2,2),\
\operatorname{Hom}(1,0),\
\operatorname{Hom}(2,1),\
\operatorname{Hom}(2,0)
$$

で、それぞれ一元である。$2$ からは $0,1,2$ のすべてへちょうど一射があるから $2$ が始対象。$0,1,2$ のすべてから $0$ へちょうど一射があるから $0$ が終対象である。[始対象・終対象の定義](#def-cat1-04-initial-terminal)の全対象について確かめた。
<!-- solution-end -->

### CAT1-04-A03 恒等射の単位律を反対圏で示す

- Level: A

元の圏で $f:A\to B$ とする。反対圏で $f^{\mathrm{op}}:B\to A$ の左右に合成するべき恒等射をそれぞれ指定し、式を計算せよ。

<!-- solution-start -->
**詳細解答**。反対圏の射 $f^{\mathrm{op}}$ の終域が $A$ なので左から合成する恒等射は $(1_A)^{\mathrm{op}}:A\to A$、始域が $B$ なので右から合成する恒等射は $(1_B)^{\mathrm{op}}:B\to B$ である。[反対圏の合成](#def-cat1-04-opposite)と元の単位律を用いると

$$
\begin{aligned}
(1_A)^{\mathrm{op}}\circ_{\mathrm{op}}f^{\mathrm{op}}
&=(f\circ1_A)^{\mathrm{op}}=f^{\mathrm{op}},\\
f^{\mathrm{op}}\circ_{\mathrm{op}}(1_B)^{\mathrm{op}}
&=(1_B\circ f)^{\mathrm{op}}=f^{\mathrm{op}}.
\end{aligned}
$$

左からの単位と右からの単位で添字が異なる点を確認できた。
<!-- solution-end -->

### CAT1-04-A04 空集合と一元集合の普遍性を直接調べる

- Level: A

$\mathbf{Set}$ で $\varnothing$ が始対象、$\{*\}$ が終対象であることを、任意の集合 $X$ に対する射の存在と一意性を分けて示せ。$\varnothing$ が終対象でないことも反証せよ。

<!-- solution-start -->
**詳細解答**。$\varnothing\to X$ の写像は、定義域に元がないため空のグラフであり、写像の条件を満たす。二つの空のグラフは等しいので一意である。

$X\to\{*\}$ の写像は $x\mapsto *$ により構成でき、任意の写像 $u$ もすべての $x\in X$ に対し $u(x)=*$ なので一意。$X=\varnothing$ でも空写像が唯一のものとして存在する。

一方、$X=\{0\}$ とすると $\{0\}\to\varnothing$ の写像は存在しない。従って終対象の定義で要求する射が欠け、$\varnothing$ は終対象ではない。
<!-- solution-end -->

### CAT1-04-A05 モノ射の双対を射の型から示す

- Level: A

$f:A\to B$ が $\mathcal C$ でモノ射であるとする。$\mathcal C^{\mathrm{op}}$ の射 $u^{\mathrm{op}},v^{\mathrm{op}}:A\to X$ に対する等式から、$f^{\mathrm{op}}$ がエピ射であることを示せ。

<!-- solution-start -->
**詳細解答**。反対圏のエピ射を調べるため、任意の対象 $X$ と $u^{\mathrm{op}},v^{\mathrm{op}}:A\to X$ を取り、

$$
u^{\mathrm{op}}\circ_{\mathrm{op}}f^{\mathrm{op}}
=v^{\mathrm{op}}\circ_{\mathrm{op}}f^{\mathrm{op}}
$$

と仮定する。元の圏では $u,v:X\to A$ だから、[反対圏の合成則](#def-cat1-04-opposite)により $(f\circ u)^{\mathrm{op}}=(f\circ v)^{\mathrm{op}}$。対応の一対一性から $f\circ u=f\circ v$ となる。[元のモノ射性](../CAT1-03/index.md#def-cat1-03-monomorphism)により $u=v$、従って $u^{\mathrm{op}}=v^{\mathrm{op}}$。$X,u,v$ は任意なので、[エピ射の定義](../CAT1-03/index.md#def-cat1-03-epimorphism)を満たす。
<!-- solution-end -->

### CAT1-04-B01 分裂射を両方向に反転する

- Level: B

圏 $\mathcal C$ に $f:A\to B$、$\ell,r:B\to A$ がある。$\ell\circ f=1_A$ と $f\circ r=1_B$ の各条件を反対圏の式へ変換し、$f^{\mathrm{op}}$ のどの片側逆を表すか説明せよ。両条件が成り立てば $\ell=r$ も導け。

<!-- solution-start -->
**詳細解答**。一つ目を[反対圏の合成則](#def-cat1-04-opposite)で変換すると

$$
f^{\mathrm{op}}\circ_{\mathrm{op}}\ell^{\mathrm{op}}
=(\ell\circ f)^{\mathrm{op}}=(1_A)^{\mathrm{op}}.
$$

従って $\ell^{\mathrm{op}}:A\to B$ は $f^{\mathrm{op}}:B\to A$ の右逆である。二つ目は

$$
r^{\mathrm{op}}\circ_{\mathrm{op}}f^{\mathrm{op}}
=(f\circ r)^{\mathrm{op}}=(1_B)^{\mathrm{op}}
$$

となるので、$r^{\mathrm{op}}$ は左逆である。両方なら元の圏で

$$
\ell=\ell\circ1_B=\ell\circ(f\circ r)
=(\ell\circ f)\circ r=1_A\circ r=r.
$$

これは[分裂射の両側逆一致](../CAT1-03/index.md#prop-cat1-03-split-cancel)を直接再導出した式である。元の圏でも反対圏でも両側逆が一致し、同型となる。
<!-- solution-end -->

### CAT1-04-B02 始対象の射を合成して一意同型を作る

- Level: B

圏 $\mathcal C$ に始対象 $I,J$ がある。$I\to J$ と $J\to I$ の射の存在・一意性を示し、その合成が恒等射になることを証明せよ。終対象についても、どの圏に同じ証明を適用すればよいか述べよ。

<!-- solution-start -->
**詳細解答**。[始対象の定義](#def-cat1-04-initial-terminal)から、$X=J$ を選べば唯一の $f:I\to J$ があり、$X=I$ を始対象 $J$ に適用すれば唯一の $g:J\to I$ がある。

$g\circ f:I\to I$ と $1_I:I\to I$ はともに $\operatorname{Hom}_{\mathcal C}(I,I)$ に属する。始対象の条件でこのHomは一元なので $g\circ f=1_I$。同じ操作を $J$ に行えば $f\circ g=1_J$。よって互いに逆射である。

終対象 $T,U$ の場合は、[始対象と終対象の双対性](#prop-cat1-04-initial-terminal-dual)で $\mathcal C^{\mathrm{op}}$ における始対象と読み替え、そこで今の証明を適用する。[同型射の双対性](#prop-cat1-04-iso-split)から元の圏へ戻しても同型である。
<!-- solution-end -->

### CAT1-04-B03 二点離散圏の失敗を診断する

- Level: B

異なる二対象 $p,q$ と各恒等射だけを持つ圏 $\mathcal D$ を考える。$\mathcal D$ に始対象・終対象がないことを証明し、$\mathcal D^{\mathrm{op}}$ でもないことを示せ。「始対象・終対象は双対」という命題と矛盾しない理由を説明せよ。

<!-- solution-start -->
**詳細解答**。$\operatorname{Hom}_{\mathcal D}(p,q)=\operatorname{Hom}_{\mathcal D}(q,p)=\varnothing$ である。$p$ が始対象なら $p\to q$ が一つ必要だが存在せず、$q$ が始対象なら $q\to p$ が必要だが存在しない。よって始対象はない。

終対象についても、$p$ が終対象なら $q\to p$、$q$ が終対象なら $p\to q$ がそれぞれ必要だが、どちらもない。

反対圏では空のHomが向きを変えるだけで、異なる二対象間にはやはり射がない。従って両者とも存在しない。[始対象と終対象の双対性](#prop-cat1-04-initial-terminal-dual)は「元に始対象が存在すれば反対圏に終対象が存在する」という同値であり、何も存在しない両側は同時に偽で、矛盾しない。証明が破れる原因は一意性でなく、必要な射そのものが**存在しないこと**である。
<!-- solution-end -->

### CAT1-04-B04 一対象圏で逆積と普遍性を比較する

- Level: B

集合 $M$ の結合的な積 $xy$ と単位元 $e$ がモノイドをなすとし、これを合成とする一対象圏を $\mathcal M$ とする。反対圏に対応する積 $x\star y$ を構成して全公理を確認し、唯一の対象が始対象または終対象になる条件を求めよ。

<!-- solution-start -->
**詳細解答**。反対圏の射の元集合は $M$ のままで、合成の順序が逆になるため

$$
x\star y:=yx
$$

と定める。任意の $x,y,z\in M$ について

$$
(x\star y)\star z=z(yx)=(zy)x
=x\star(y\star z)
$$

となり、元の積の結合則から $\star$ は結合的である。また

$$
e\star x=xe=x,\qquad x\star e=ex=x
$$

なので同じ $e$ が単位元である。

唯一の対象を $*$ とすると $\operatorname{Hom}_{\mathcal M}(*,*)=M$ である。[始対象・終対象の定義](#def-cat1-04-initial-terminal)ではこの唯一のHomが一元であることを要求する。従って $M=\{e\}$ の場合に限り $*$ は始対象であり、同時に終対象である。$|M|>1$ なら、恒等射以外の自己射が存在し一意性が破れる。
<!-- solution-end -->

### CAT1-04-C01 三つの圏を横断して双対性を検証する

- Level: C

次の圏と射について答えよ。

1. 集合の圏 $\mathbf{Set}$ の包含 $i:\{0\}\hookrightarrow\{0,1\}$。
2. 二点鎖 $0\prec1$ の順序圏 $\mathcal P$ の射 $a:0\to1$。
3. 二点離散圏 $\mathcal D$（対象 $p,q$、恒等射のみ）。

それぞれ元の圏と反対圏について、該当する射のモノ射・エピ射・同型射を判定せよ（$\mathcal D$ では恒等射を判定せよ）。さらに、三つの圏それぞれの始対象・終対象の有無を判定せよ。単純に「矢印を逆にすると同型になる」と考えてよいか、失敗する理由も説明せよ。

<!-- solution-start -->
**詳細解答**。

**（1）集合の圏**。包含 $i$ は単射だが全射でないので、[集合での特徴づけ](../CAT1-03/index.md#prop-cat1-03-set-characterization)からモノ射であり、エピ射でも同型射でもない。

[モノ射とエピ射の双対性](#prop-cat1-04-mono-epi)から $i^{\mathrm{op}}$ は $\mathbf{Set}^{\mathrm{op}}$ でエピ射だがモノ射でない。[同型の双対性](#prop-cat1-04-iso-split)により同型でもない。

$\mathbf{Set}$ では空集合が始対象、一元集合が終対象で、$\mathbf{Set}^{\mathrm{op}}$ では空集合が終対象、一元集合が始対象となる。

**（2）二点鎖**。[半順序圏の射の判定](../CAT1-03/index.md#prop-cat1-03-poset-bimorphism)によれば $a$ はモノ射かつエピ射だが、逆方向の射がないため同型ではない。反対圏の $a^{\mathrm{op}}:1\to0$ も、[モノ射とエピ射の双対性](#prop-cat1-04-mono-epi)からモノ射かつエピ射で、[同型の双対性](#prop-cat1-04-iso-split)から非同型である。

元の圏では最小元 $0$ が始対象、最大元 $1$ が終対象で、反対圏では $1$ が始対象、$0$ が終対象となる。

**（3）離散圏**。各恒等射 $1_p$, $1_q$ は自身が両側逆射なので同型である。[同型射はモノ射かつエピ射](../CAT1-03/index.md#prop-cat1-03-iso-mono-epi)より両方の消去律を満たす。反対圏も恒等射だけなので同様である。一方 $p\to q$ も $q\to p$ も存在しないため、元の圏でも反対圏でも始対象・終対象はない。

まとめると、反対圏は各射の**向きを読み替える新しい圏**であり、元の圏に欠けていた逆射を元の圏の中に作りはしない。$\mathcal P$ の $a$ は非同型のまま、$\mathcal D$ では異対象間の射が存在しないままである。$\square$
<!-- solution-end -->

## 8. 次の講義へ

反対圏はHomと合成順序を一緒に逆転させる構成であり、圏の公理・大きさ・二重反転を検証できた。[双対原理](#def-cat1-04-dual-principle)を使う際は、結論だけでなく量化と仮定も反転させる。モノ射とエピ射、分裂モノ射と分裂エピ射、始対象と終対象はその基本例である。

次の **CAT1-05「部分圏・積圏・スライス圏」** では、射の向きを反転するだけでなく、対象や射を制限・組み合わせ・一つの対象への射で分類して、別の圏を構成する。
