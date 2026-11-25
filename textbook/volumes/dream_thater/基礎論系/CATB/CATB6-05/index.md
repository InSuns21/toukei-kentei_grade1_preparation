# CATB6-05 トポスの内部言語

## 1. 射を論理の言葉で読む

前講では関係を部分対象、等号を対角の逆像、存在量化を像として解釈した。例えば地域を表す集合 $X$ と施設を表す集合 $Y$ があるとき、$R(x,y)$ は地域と施設の対応を表す部分集合である。「全施設が条件を満たす」「条件を満たす施設の集合を返す関数」も、同じ方法で表せるだろうか。

[初等トポス](../CATB5-06/index.md#def-catb5-06-elementary-topos)では有限極限、指数対象、部分対象分類子がそろう。これまで別々に学んだ道具を使って、項を射、述語を部分対象、推論を包含として一つの言語にまとめる。このような言語を Mitchell–Bénabou 型の内部言語として扱う。外部の集合の元を並べる代わりに、変数を動かす文脈そのものを圏の対象にするのが要点である。

## 2. 型・文脈と項

型は変数が属する対象を指定する。型 $A$ の変数 $x$ と型 $B$ の変数 $y$ が自由に動く範囲は積 $A\times B$ である。自由変数の並びを文脈と呼ぶ。文脈を $\Gamma$、それを表す対象を $G$ と書く。空文脈では終対象 $1$ を使う。積と指数対象の選択を固定し、積の括弧の差は標準同型で識別する。

型 $A$ から型 $B$ への関数を変数として扱うため、[指数対象](../../CAT/CAT4-05/index.md#def-cat4-05-exponential) $B^A$ を関数型に用いる。さらに型 $A$ の述語を変数として扱うため、[冪対象](../CATB5-08/index.md#def-catb5-08-power-object) $\Omega^A$ を使う。ここで $\Omega$ は部分対象分類子である。これらの型を追加すると、集合の関数や部分集合に似た操作を圏の内部で書ける。

入力変数を束縛して関数を返す操作 $\lambda x.t$ は、ラムダ抽象である。条件を表す有限の記号列を式と呼び、その条件を満たす入力の述語を返す項 $\{x:A\mid\theta\}$ を内包として扱う。例えば集合なら $\{x\mid n(x)=1\}$ は $n(x)=1$ となる入力の集合である。式から項を作る内包と、項から式を作る等号や所属を使うため、以下の二つの定義は有限の構文木を対象とする相互帰納的な定義である。内包の射としての意味は第3節で与える。

<a id="def-catb6-05-internal-terms"></a>

<!-- formal-statement-start -->
> **定義（内部言語の型と項）**
>
> 局所小な初等トポス $\mathcal E$ において、基本型に対象を、基本関数記号に入力型の積から出力型への射を割り当てる。単位型・積型・関数型・真理値型・冪型は、それぞれ終対象・積・指数対象・部分対象分類子・その指数対象で解釈する。
>
> 有限個の相異なる型付き変数の列を文脈とし、対応する積を文脈対象 $G$ とする。空文脈の対象は $1$ とする。
>
> 項は変数、基本関数の適用、単位項、対の形成と射影、関数適用、ラムダ抽象、式の内包によって有限回の構成で作る。項の意味は文脈対象からその型の対象への射である。変数は射影、基本関数適用は入力項の組との合成、単位項は終対象への射、対と射影は積の操作で解釈する。
>
> 関数項 $v$ の型を $B^A$、入力項 $u$ の型を $A$ とすると、関数適用の意味は評価射との合成である。

$$
[\![v(u)]\!]=\operatorname{ev}\langle[\![v]\!],[\![u]\!]\rangle:G\to B.
$$

> 文脈を新変数 $x:A$ で拡張したとき、型 $B$ の項 $t$ の意味を $q:G\times A\to B$ とする。抽象項 $\lambda x.t$ は型 $B^A$ を持ち、その意味は次を満たす唯一の射である。

$$
[\![\lambda x.t]\!]=\bar q:G\to B^A,\qquad
\operatorname{ev}(\bar q\times1_A)=q.
$$
<!-- formal-statement-end -->

<!-- definition-example-start: def-catb6-05-internal-terms -->
**定義の確認**。集合の圏で $A=B=\{0,1\}$ とする。基本関数 $n:A\to A$ は $n(0)=1,n(1)=0$ とする。文脈 $z:A$ において変数は $1_A$、単位項は一点集合への唯一の写像、項 $n(z)$ は $n1_A=n$ である。

対 $(z,n(z))$ は写像 $z\mapsto(z,n(z))$ で、第一射影との合成は $1_A$、第二射影との合成は $n$ になる。

文脈 $z:A,x:A$ で項 $t(z,x)$ を $z$ と $x$ の和を2で割った余りとする。これは二入力の基本関数の適用である。抽象項の値は $z=0$ なら恒等写像、$z=1$ なら $n$ になる。実際、評価すると

$$
\begin{aligned}
\operatorname{ev}(\bar t(0),x)&=x=t(0,x),\\
\operatorname{ev}(\bar t(1),x)&=1-x=t(1,x).
\end{aligned}
$$

全入力で評価値が決まったので、この関数値を持つ写像は一意である。真理値型は二元集合、冪型は二元集合値関数の集合で、例えば $n$ と同じ値を持つ述語は部分集合 $\{0\}$ を表す。内包の解釈は次節で確認する。
<!-- definition-example-end -->

関数を一つの値として返すことと、実際に入力を渡して計算することは、抽象と評価の対で結び付く。指数対象の普遍性がこの二つの操作を正当化する。

## 3. 式は文脈の部分対象になる

関係記号には入力型の積の部分対象を割り当てる。式の意味は、文脈のどの部分で条件が成立するかを表す。前講の連言・選言・存在量化に含意と全称量化を加える。含意の意味は「前件と共に成立すれば後件を導く最大の条件」であり、単に集合の補集合で作るわけではない。

型 $A$ の項が冪型の項に属するという式も用意する。冪対象の評価射は $\Omega^A\times A\to\Omega$ である。これを通して、述語を関数として評価できる。逆に式からその述語を値に持つ項を作る操作が内包である。例えば $\{x:A\mid R(z,x)\}$ は $z$ に依存する述語を表す項である。

<a id="def-catb6-05-internal-formulas"></a>

<!-- formal-statement-start -->
> **定義（トポスの内部言語の式と判断）**
>
> 局所小な初等トポスで型・項・関係記号の解釈を固定する。式は関係記号の適用、同じ型の項の等号、冪型の項への所属、真と偽、連言、選言、含意、存在量化と全称量化から有限回の構成で作る。否定は偽への含意とする。
>
> 文脈対象を $G$ とし、型 $A$ の束縛変数を加えた文脈の射影を $\pi:G\times A\to G$ とする。式の意味を部分対象 $[\![\varphi]\!]_G$ と書く。
>
> 関係式は入力項の組に沿う関係の逆像、等号は二項の組に沿う対角の逆像で解釈する。冪型の項 $S$ とその要素型の項 $u$ に対する所属式は、次の射が分類する部分対象とする。

$$
G\xrightarrow{\langle[\![S]\!],[\![u]\!]\rangle}
\Omega^A\times A\xrightarrow{\operatorname{ev}}\Omega.
$$

> 真と偽は最大元と最小元、連言・選言・含意は対応する部分対象の演算、量化は射影に沿う随伴で解釈する。

$$
\begin{aligned}
[\![\varphi\wedge\psi]\!]_G&=P\wedge Q,\\
[\![\varphi\vee\psi]\!]_G&=P\vee Q,\\
[\![\varphi\Rightarrow\psi]\!]_G&=P\Rightarrow Q,\\
[\![\exists x:A\,\theta]\!]_G&=\exists_\pi[\![\theta]\!]_{G\times A},\\
[\![\forall x:A\,\theta]\!]_G&=\forall_\pi[\![\theta]\!]_{G\times A}.
\end{aligned}
$$

> ここで $P,Q$ はそれぞれ $\varphi,\psi$ の意味である。内包項 $\{x:A\mid\theta\}$ の型は $\Omega^A$ とし、その意味は $[\![\theta]\!]_{G\times A}$ の分類射をカリー化した射とする。
>
> 同一文脈の判断 $\varphi\vdash_\Gamma\psi$ が成立するとは次を満たすことである。式が文脈で妥当であるとは真からその式への判断が成立することである。

$$
[\![\varphi]\!]_G\le [\![\psi]\!]_G.
$$
<!-- formal-statement-end -->

<!-- definition-example-start: def-catb6-05-internal-formulas -->
**定義の確認**。集合の圏で $G=\{a,b,c\}$、$A=\{0,1\}$ とし、関係を

$$
R=\{(a,0),(a,1),(b,1)\}
$$

とする。$P(z)$ の意味を $\{a,b\}$、$Q(z)$ の意味を $\{b,c\}$ とする。変数の組は恒等写像なので $R(z,x)$ は $R$ 自身である。等号 $x=x$ は対角を経由するため $G\times A$ 全体を表す。

真・偽は $G,\varnothing$ である。集合の部分集合の含意は、$D\cap P\subseteq Q$ を満たす最大の $D$ だから、$P$ の外側と $Q$ の和になる。

$$
\begin{aligned}
P\wedge Q&=\{b\},\\
P\vee Q&=G,\\
P\Rightarrow Q&=\{b,c\},\\
\neg P&=\{c\}.
\end{aligned}
$$

各 $z$ に対応する $R$ の行は順に $\{0,1\},\{1\},\varnothing$ である。[集合の射影量化](../CATB6-02/index.md#prop-catb6-02-projection-quantification)で存在量化は空でない行、全称量化は全入力を含む行を選ぶ。

$$
[\![\exists x\,R(z,x)]\!]=\{a,b\},\qquad
[\![\forall x\,R(z,x)]\!]=\{a\}.
$$

内包項 $S(z)=\{x\mid R(z,x)\}$ は三つの行をそれぞれ返す。所属式 $0\in S(z)$ は行が $0$ を含む $z$ の集合なので $\{a\}$ になる。従って $0\in S(z)$ から $P(z)$ への判断は $\{a\}\subseteq\{a,b\}$ によって成立するが、逆向きは成立しない。
<!-- definition-example-end -->

これらの解釈が存在する根拠を整理する。[初等トポスの部分対象のHeyting代数性](../CATB6-01/index.md#thm-catb6-01-subobject-heyting)は各文脈で論理結合の演算を与え、[初等トポスの量化子の存在](../CATB6-02/index.md#thm-catb6-02-quantifier-existence)は射影に沿う両随伴を与える。[分類射と部分対象の自然な対応](../CATB5-06/index.md#thm-catb5-06-classifier-bijection)によって各式は真理値型への射でも表せる。内包はこの射を指数対象の普遍性でカリー化するので一意に定まる。

項と式の定義は互いを参照するが、構文木の節点数について帰納的に解釈できる。例えば内包の節点ではその内部の式は既に解釈され、所属の節点ではその入力項は既に解釈されている。無限に展開される式を許しているわけではない。

## 4. 代入と基底変更

変数を別の項で置き換える操作は、文脈対象を変更する射として表現できる。例えば $z$ を $g(w)$ に置き換えると、先に述語を計算してから $g$ で逆像を取る方法と、各項を置き換えてから述語を計算する方法が一致するはずである。含意・全称量化・関数型を追加した後でもこの性質が成立することを確認する。

<a id="thm-catb6-05-internal-substitution"></a>

<!-- formal-statement-start -->
> **定理（内部言語の代入則）**
>
> 局所小な初等トポスにおける上記の内部言語で、文脈 $\Gamma$ の変数を文脈 $\Lambda$ の型の合う項で同時代入する。この代入を $\sigma$、対応する文脈対象間の射を $g:H\to G$ とする。束縛変数の名前を必要に応じて変更し、自由変数が意図せず束縛されることを避ける。
>
> 任意の項 $t$ と式 $\varphi$ に対して、次が成立する。

$$
[\![t[\sigma]]\!]=[\![t]\!]g,\qquad
[\![\varphi[\sigma]]\!]_H=g^*[\![\varphi]\!]_G.
$$
<!-- formal-statement-end -->

見取り図：項は射の合成、式は逆像の合成を使って追う。束縛変数を一つ加えると、代入射は $g\times1_A$ になる。抽象と内包ではカリー化の一意性、量化ではこの四角形が引き戻しになることが重要である。

<!-- proof-start -->
### 証明

構文木の節点数について項と式を同時に帰納する。変数では $g$ の対応する成分が代入した項の意味なので成立する。単位項では終対象への射の一意性から成立する。基本関数 $F$ に適用する項を $t_i$ とし、それらについて帰納仮定が成立するとする。[積の普遍性](../../CAT/CAT2-04/index.md#def-cat2-04-small-product)により

$$
\langle[\![t_i]\!]g\rangle_i
=\langle[\![t_i]\!]\rangle_i g.
$$

これに $F$ の解釈を合成すれば基本関数適用の場合になる。対の形成は上の等式そのもの、射影は射の合成の結合律で従う。関数適用も、帰納仮定を二成分に使うと

$$
\operatorname{ev}\langle[\![v]\!]g,[\![u]\!]g\rangle
=\operatorname{ev}\langle[\![v]\!],[\![u]\!]\rangle g.
$$

抽象では $q:G\times A\to B$ を本体の項の意味とする。拡張文脈における代入射は $h=g\times1_A$ であるから、帰納仮定で代入した本体の意味は $qh$ になる。評価すると

$$
\operatorname{ev}((\bar qg)\times1_A)
=\operatorname{ev}(\bar q\times1_A)h=qh.
$$

[指数対象の普遍性](../../CAT/CAT4-05/index.md#def-cat4-05-exponential)により $\bar qg$ は $qh$ の唯一のカリー化であり、抽象項にも代入則が成り立つ。

式の原子式では、項の帰納仮定と[部分対象の逆像](../CATB4-07/index.md#thm-catb4-07-inverse-image)の合成則を使う。例えば等号では

$$
\langle[\![t]\!]g,[\![u]\!]g\rangle^*\Delta
=g^*\langle[\![t]\!],[\![u]\!]\rangle^*\Delta.
$$

関係式は対角を関係部分対象に置き換え、項の組を任意の有限個の成分に拡張すれば同じ合成則になる。所属式では分類射が評価射と二つの項の組の合成である。代入後の組は元の組と $g$ の合成なので、分類射も元の分類射と $g$ の合成になる。[分類射の自然な対応](../CATB5-06/index.md#thm-catb5-06-classifier-bijection)から所属式の意味は元の部分対象の逆像である。

真と偽、連言・選言・含意については[部分対象のHeyting演算の逆像保存](../CATB6-01/index.md#thm-catb6-01-heyting-reindexing)を使う。例えば含意の代入後の意味は

$$
g^*P\Rightarrow g^*Q=g^*(P\Rightarrow Q).
$$

真と偽も保存され、連言・選言も同じ形の保存等式を満たす。否定は偽への含意なので含まれる。

量化では $\pi:G\times A\to G$、$\pi':H\times A\to H$ とする。$h=g\times1_A$ を上辺とする四角形が引き戻しであることを確認する。$\pi u=gv$ を満たす射 $u:T\to G\times A$ と $v:T\to H$ から、成分 $(v,\pi_Au)$ を持つ唯一の射 $k:T\to H\times A$ が存在する。$\pi'k=v$ であり、$hk$ の二成分は $(gv,\pi_Au)$ なので $hk=u$ となる。逆にこの二条件は $k$ の両成分を決める。

[部分対象のBeck–Chevalley等式](../CATB4-07/index.md#thm-catb4-07-beck-chevalley)と[全称量化のBeck–Chevalley等式](../CATB6-03/index.md#thm-catb6-03-universal-beck-chevalley)をこの四角形に適用する。$D=[\![\theta]\!]_{G\times A}$ とすると、帰納仮定で代入した本体の意味は $h^*D$ であり、

$$
\exists_{\pi'}h^*D=g^*\exists_\pi D,\qquad
\forall_{\pi'}h^*D=g^*\forall_\pi D.
$$

これで両量化子の場合が成立する。

最後に内包では $D$ の分類射を $d:G\times A\to\Omega$ とする。帰納仮定と[分類射の自然な対応](../CATB5-06/index.md#thm-catb5-06-classifier-bijection)により代入後の本体を分類する射は $dh$ である。抽象の場合と同じ評価の計算で、$dh$ のカリー化は $\bar d g$ となる。従って内包項にも代入則が成立する。

構成規則をすべて尽くしたので、項と式の結論が同時に従う。
<!-- proof-end -->

例えば第3節の関係で $H=\{p,q,r\}$、$g(p)=g(q)=a$、$g(r)=c$ とする。全称量化した結果 $\{a\}$ の逆像は $\{p,q\}$ である。一方、先に関係の逆像を取ると $p,q$ の行は両方とも $\{0,1\}$、$r$ の行は空になる。全称量化後に残るのは同じく $p,q$ である。

## 5. 推論を順序で検証する

判断が包含で表されるため、証明の仮定を追加することは文脈内の部分対象を狭めることに対応する。含意の導入と除去は最大下界に関する随伴、量化の導入と除去は逆像の左右の随伴で検証できる。

<a id="thm-catb6-05-intuitionistic-rules"></a>

<!-- formal-statement-start -->
> **定理（内部言語の含意と全称量化の健全性）**
>
> 局所小な初等トポスで $P,Q,D$ を文脈対象 $G$ の部分対象とし、$R$ を拡張文脈 $G\times A$ の部分対象とする。射影を $\pi:G\times A\to G$ とする。このとき含意の導入・除去と、束縛変数を含まない仮定からの全称量化の導入・除去は次の関係で表される。

$$
D\wedge P\le Q\iff D\le(P\Rightarrow Q).
$$

$$
\pi^*D\le R\iff D\le\forall_\pi R.
$$

> 型 $A$ の任意の項の意味を $t:G\to A$、そのグラフを $s=\langle1_G,t\rangle$ とすると、全称量化した条件からその項についての条件が従う。

$$
\forall_\pi R\le s^*R.
$$

> また成立する判断は型の合う任意の代入で保存される。
<!-- formal-statement-end -->

見取り図：含意は「連言して後件に含まれる最大条件」、全称量化は「射影で逆像を取って述語に含まれる最大条件」である。全称条件から特定の項を取り出すには射影の切断に沿って逆像を取る。

<!-- proof-start -->
### 証明

[部分対象の含意](../CATB6-01/index.md#thm-catb6-01-subobject-implication)の性質を $P,Q$ に適用すると、$P\Rightarrow Q$ は $D\wedge P\le Q$ となる $D$ の最大元であり、その条件と $D\le P\Rightarrow Q$ が同値になる。除去の典型として $D=P\Rightarrow Q$ を代入すれば

$$
(P\Rightarrow Q)\wedge P\le Q.
$$

[射に沿う量化子](../CATB6-02/index.md#def-catb6-02-quantifiers)の随伴条件を $\pi$ に適用すると、第二の同値が得られる。仮定 $D$ を拡張文脈に持ち上げたものが $\pi^*D$ であるため、仮定が束縛変数に依存しないという条件がここに現れる。

$D=\forall_\pi R$ と置けば、右辺は反射律により成立するので $\pi^*\forall_\pi R\le R$。逆像の単調性を $s$ に適用する。

$$
s^*\pi^*\forall_\pi R\le s^*R.
$$

[部分対象の逆像](../CATB4-07/index.md#thm-catb4-07-inverse-image)の合成則と $\pi s=1_G$ より左辺は $\forall_\pi R$ に等しい。これが特定の項への全称量化の除去である。

最後に判断 $[\![\varphi]\!]_G\le[\![\psi]\!]_G$ を $g$ で引き戻す。逆像は単調なので包含が保存され、[内部言語の代入則](#thm-catb6-05-internal-substitution)によって両辺は代入した式の意味になる。
<!-- proof-end -->

残りの真・連言・等号・存在量化の基本規則と有限選言の規則は、[正則論理の基本推論の健全性](../CATB6-04/index.md#thm-catb6-04-regular-rules)および[整合論理の選言と代入の健全性](../CATB6-04/index.md#thm-catb6-04-coherent-rules)で用いた包含の論証がそのまま使える。実際、[初等トポスのBarr-正確性](../CATB5-08/index.md#thm-catb5-08-exact)から正則性が従い、有限上限の存在と逆像保存は第3・4節の既習のHeyting演算の結果で保証される。ここで扱う論理は、これらの規則を含む直観主義的な型付き論理である。

## 6. 述語・関数・射を行き来する

内部言語の便利さは、圏論の対象を単に記号で置き換えるだけではなく、論理の式から圏の射を一意に作れる点にある。まず内包と所属が逆向きの操作になることを示す。

<a id="thm-catb6-05-comprehension"></a>

<!-- formal-statement-start -->
> **定理（内包と所属の対応）**
>
> 局所小な初等トポスで $G,A$ を対象とする。文脈 $G\times A$ の任意の部分対象 $R$ に対して、一意の射 $S:G\to\Omega^A$ が存在し、所属式の意味が $R$ になる。
>
> 具体的に $S$ は $R$ の分類射のカリー化である。任意の射 $u:G\to A$ に対して、$u$ が内包の述語に属する条件は次で与えられる。

$$
[\![u\in S]\!]_G=\langle1_G,u\rangle^*R.
$$

> さらに $S,T:G\to\Omega^A$ が定める $G\times A$ 上の所属部分対象が等しいことと、射 $S=T$ は同値である。
<!-- formal-statement-end -->

見取り図：関係を分類射へ、分類射を指数対象への射へ移す。どちらも全単射なので、関係から述語を返す射が一意に定まる。

<!-- proof-start -->
### 証明

[分類射と部分対象の自然な対応](../CATB5-06/index.md#thm-catb5-06-classifier-bijection)と[指数対象](../../CAT/CAT4-05/index.md#def-cat4-05-exponential)の普遍性は、順に全単射を与える。

$$
\operatorname{Sub}(G\times A)
\simeq\mathcal E(G\times A,\Omega)
\simeq\mathcal E(G,\Omega^A).
$$

$R$ の分類射を $d$ と置き、そのカリー化を $S$ とする。すると評価射との合成は $d$ である。

$$
\operatorname{ev}(S\times1_A)=d.
$$

拡張文脈で所属を評価する射はこの左辺であるから、分類する部分対象は $R$ になる。任意の $u:G\to A$ について、評価射と項の組の合成は

$$
\begin{aligned}
\operatorname{ev}\langle S,u\rangle
&=\operatorname{ev}(S\times1_A)\langle1_G,u\rangle\\
&=d\langle1_G,u\rangle.
\end{aligned}
$$

分類射の自然な対応により、右辺の分類する部分対象は $\langle1_G,u\rangle^*R$ である。

二つの射 $S,T$ について所属部分対象が等しければ、その分類射は一意なので

$$
\operatorname{ev}(S\times1_A)
=\operatorname{ev}(T\times1_A).
$$

指数対象の普遍性の一意性から $S=T$ である。逆に射が等しければ評価射との合成も同じであり、同じ部分対象を分類する。
<!-- proof-end -->

第3節の集合の例では、三つの行を返す関数が等しければ元の関係も等しい。一般のトポスでも同じ対応を、外部の点を数えることなく使える。

続いて射の性質を論理式に翻訳する。集合での単射・全射は元の存在と等号の条件で書けるが、一般の圏では大域的な元だけを調べても足りない。そこで変数を動かす対象全体で判断の成立を検査する。

<a id="thm-catb6-05-map-logic"></a>

<!-- formal-statement-start -->
> **定理（モノ射・エピ射の内部言語による判定）**
>
> 局所小な初等トポスの射 $f:A\to B$ を基本関数記号として内部言語に入れる。この射がモノ射であることと、文脈 $x:A,y:A$ で次の判断が成立することは同値である。

$$
f(x)=f(y)\vdash_{x,y}x=y.
$$

> この射がエピ射であることと、文脈 $b:B$ で次の式が妥当であることは同値である。

$$
\exists a:A\,(f(a)=b).
$$
<!-- formal-statement-end -->

見取り図：第一の判断は同じ値を持つ二つの入力が対角に含まれるという条件である。第二の式は $f$ のグラフを $B$ に射影した像が全体であるという条件である。

<!-- proof-start -->
### 証明

文脈 $A\times A$ で $f(x)=f(y)$ の部分対象は $(f\times f)^*\Delta_B$ であり、$x=y$ の部分対象は $\Delta_A$ である。判断は前者が後者に含まれることを表す。

$f$ がモノ射なら、前者の代表モノ射 $k:K\to A\times A$ に対し $f\pi_1k=f\pi_2k$ なので $\pi_1k=\pi_2k$ になる。従って $k=\Delta_A\pi_1k$ と対角を経由し、包含が成立する。逆に包含を仮定する。任意の射 $u,v:Z\to A$ が $fu=fv$ を満たせば、$\langle u,v\rangle$ は対角の引き戻し $(f\times f)^*\Delta_B$ を経由する。包含により $\Delta_A$ も経由するため $u=v$ となる。これはモノ射の条件である。

次に $B\times A$ における等号部分の代表を $k:K\to B\times A$ とする。$j=\langle f,1_A\rangle:A\to B\times A$ は等号条件を満たし、第二射影が左逆射なのでモノ射である。逆に $k$ の両成分は $f\pi_Ak,\pi_Ak$ なので

$$
k=j\pi_Ak.
$$

よって $j$ は等号部分を表す。存在量化は第一射影に沿う像であり、$\pi_B j=f$ だから式の意味は $f$ の像である。

[初等トポスの像分解](../CATB5-08/index.md#thm-catb5-08-image)により $f=me$ と分解する。$e$ はエピ射、$m$ は像を表すモノ射である。像が最大部分対象なら $m$ は同型なので $f$ はエピ射になる。逆に $f$ がエピ射なら $rm=sm$ を満たす任意の平行射について $rf=sf$ となり、$r=s$ が従う。従って $m$ もエピ射である。[初等トポスのモノ・エピ同型性](../CATB5-08/index.md#prop-catb5-08-bimorphism)を $m$ に適用すると同型になり、像は最大部分対象である。これで両方向が成立する。
<!-- proof-end -->

集合の圏ではこの定理は通常の単射と全射の条件に戻る。一般のトポスの存在量化は像を用いているため、存在式が妥当であることから、証人を選ぶ射が存在するとは直ちには言えない。

## 7. 排中律が一般には成立しない理由

局所的に成立する条件は、外部から見た単一の二値に還元できないことがある。小圏 $\mathcal C$ を二対象 $0,1$ と非恒等射 $0\to1$ からなる圏とする。[前層圏の初等トポス性](../CATB5-06/index.md#thm-catb5-06-presheaf-topos)によって、その集合値前層圏は初等トポスである。

終対象は両対象で一点集合を持つ前層である。[前層のモノ射の成分判定](../CATB5-06/index.md#prop-catb5-06-pointwise-mono)により、その部分対象は各対象の部分集合の組で表せる。制限写像の向きは $1$ から $0$ なので、$1$ に一点があるなら $0$ にも一点がなければならない。従って可能な組は次の三つだけである。

$$
O=(\varnothing,\varnothing),\quad
U=(\{*\},\varnothing),\quad
I=(\{*\},\{*\}).
$$

成分ごとの包含によって $O<U<I$ という鎖になる。共通部分は小さい方、和は大きい方である。[部分対象の含意](../CATB6-01/index.md#thm-catb6-01-subobject-implication)で $\neg U=U\Rightarrow O$ は $D\wedge U\le O$ となる最大の $D$ である。$D=U,I$ のとき共通部分は $U$ なので条件に反する。$D=O$ のときだけ成立する。

$$
\neg U=O,\qquad U\vee\neg U=U<I.
$$

空文脈の述語 $P$ に部分対象 $U$ を割り当てれば、$P\vee\neg P$ は妥当ではない。失われているのは部分対象が常に補元を持つという性質であり、論理結合や代入が定義できなくなったわけではない。$U$ が偽であるという外部の判断と、内部で否定が真であるという判断を区別する必要がある。

次講では、このような真理値が site の局所的なデータとどう結び付くかを調べる。

## 8. 演習

### CATB6-05-A01 文脈と抽象

- Level: A

集合 $A=\{0,1\}$ で $n(x)=1-x$ とする。文脈 $z:A,x:A$ における項 $n(x)$ と、文脈 $z:A$ における項 $\lambda x.n(x)$ の意味を求めよ。

<!-- solution-start -->
**詳細解答**

[内部言語の型と項](#def-catb6-05-internal-terms)により変数 $x$ は第二射影なので、本体の意味は $q=n\pi_2:A\times A\to A$ である。値は $q(z,0)=1,q(z,1)=0$ で $z$ に依存しない。

抽象項は $\bar q:A\to A^A$。各 $z$ で $n$ を返す定値写像であれば

$$
\operatorname{ev}(\bar q(z),x)=n(x)=q(z,x).
$$

全入力で値が指定されているので [指数対象](../../CAT/CAT4-05/index.md#def-cat4-05-exponential)の普遍性によりこの写像が一意の意味である。
<!-- solution-end -->

### CATB6-05-A02 含意と否定

- Level: A

集合 $G=\{1,2,3,4\}$、$P=\{1,2\}$、$Q=\{2,3\}$ に対し $P\Rightarrow Q$ と $\neg P$ を求めよ。

<!-- solution-start -->
**詳細解答**

[部分対象の含意](../CATB6-01/index.md#thm-catb6-01-subobject-implication)の条件は $D\cap P\subseteq Q$ である。$1$ は $P$ に属するが $Q$ に属さないので $D$ に入れられない。$2$ は $P,Q$ の両方に属し、$3,4$ は $P$ に属さないので入れられる。

最大の候補は $\{2,3,4\}$ で、その $P$ との共通部分は $\{2\}\subseteq Q$。よって

$$
P\Rightarrow Q=\{2,3,4\}.
$$

否定では $Q=\varnothing$ を代入する。$D\cap P=\varnothing$ となる最大集合は $\{3,4\}$ なので、$\neg P=\{3,4\}$。
<!-- solution-end -->

### CATB6-05-A03 空の型と量化

- Level: A

集合の圏で $G=\{a,b\}$、$A=\varnothing$ とし、$R$ を $G\times A$ の唯一の部分集合とする。$\exists_\pi R$ と $\forall_\pi R$ を求めよ。

<!-- solution-start -->
**詳細解答**

$G\times A=\varnothing$ なので $R=\varnothing$。第一射影の定義域も空であり、像は空になる。

全称量化では任意の $D\subseteq G$ に対して $\pi^{-1}(D)=\varnothing\subseteq R$ が成立する。[射に沿う量化子](../CATB6-02/index.md#def-catb6-02-quantifiers)の右随伴条件から、そのような $D$ の最大元は $G$ である。

$$
\exists_\pi R=\varnothing,\qquad
\forall_\pi R=G.
$$

存在には証人が必要だが、全称条件を破る入力が存在しないので全称式は妥当になる。
<!-- solution-end -->

### CATB6-05-A04 内包の評価

- Level: A

$G=\{a,b\}$、$A=\{0,1,2\}$ とし、関係 $R=\{(a,0),(a,2),(b,1)\}$ を考える。内包項 $S(z)=\{x\mid R(z,x)\}$ を求め、$2\in S(z)$ の意味を求めよ。

<!-- solution-start -->
**詳細解答**

[内包と所属の対応](#thm-catb6-05-comprehension)では分類射をカリー化する。$a$ の行は $0,2$ で真、$b$ の行は $1$ で真であるから、

$$
S(a)=\{0,2\},\qquad S(b)=\{1\}.
$$

定値項 $u(z)=2$ を取ると、$\langle1_G,u\rangle(z)=(z,2)$。その逆像は $(a,2)$ が $R$ に属し $(b,2)$ が属さないので $\{a\}$ になる。これが所属式の意味である。
<!-- solution-end -->

### CATB6-05-B01 代入と内包

- Level: B

局所小な初等トポスで $R\in\operatorname{Sub}(G\times A)$ に対応する内包項の射を $S:G\to\Omega^A$ とする。任意の $g:H\to G$ に対し、$R$ の $g\times1_A$ に沿う逆像に対応する射が $Sg$ になることを分類射の自然性と指数対象の普遍性から示せ。

<!-- solution-start -->
**詳細解答**

$d:G\times A\to\Omega$ を $R$ の分類射とする。[分類射と部分対象の自然な対応](../CATB5-06/index.md#thm-catb5-06-classifier-bijection)によって逆像の分類射は $d(g\times1_A)$ である。

[S による内包と所属の対応](#thm-catb6-05-comprehension)から $\operatorname{ev}(S\times1_A)=d$。従って

$$
\begin{aligned}
\operatorname{ev}((Sg)\times1_A)
&=\operatorname{ev}(S\times1_A)(g\times1_A)\\
&=d(g\times1_A).
\end{aligned}
$$

$Sg$ の評価が目的の分類射と一致した。指数対象の普遍性でそのカリー化は一意だから、逆像に対応する射は $Sg$ である。
<!-- solution-end -->

### CATB6-05-B02 全称量化と含意

- Level: B

局所小な初等トポスで $P,Q\in\operatorname{Sub}(G)$、$R\in\operatorname{Sub}(G\times A)$、$\pi:G\times A\to G$ とする。次の仮定から $Q\wedge P\le\forall_\pi R$ を示せ。

$$
Q\le(P\Rightarrow\forall_\pi R).
$$

さらに任意の $t:G\to A$ について、$Q\wedge P\le\langle1_G,t\rangle^*R$ を示せ。

<!-- solution-start -->
**詳細解答**

[内部言語の含意と全称量化の健全性](#thm-catb6-05-intuitionistic-rules)で $D=Q$、後件を $\forall_\pi R$ として含意の随伴条件を使う。仮定は

$$
Q\wedge P\le\forall_\pi R
$$

と同値なので第一の結論を得る。

$s=\langle1_G,t\rangle$ とする。右随伴条件から $\pi^*\forall_\pi R\le R$。これを $s$ で引き戻すと

$$
(\pi s)^*\forall_\pi R\le s^*R.
$$

$\pi s=1_G$ なので左辺は $\forall_\pi R$。第一の結論と推移律を使って $Q\wedge P\le s^*R$ が得られる。
<!-- solution-end -->

### CATB6-05-B03 射の論理的判定

- Level: B

集合 $A=\{0,1,2\}$、$B=\{a,b,c\}$、$f(0)=a,f(1)=a,f(2)=b$ とする。$f(x)=f(y)$ の意味と $\exists x:A\,(f(x)=z)$ の意味を求め、モノ射とエピ射の判定を行え。

<!-- solution-start -->
**詳細解答**

同じ値を取る入力の組は

$$
K=\{(0,0),(0,1),(1,0),(1,1),(2,2)\}.
$$

$A$ の対角には $(0,1)$ が含まれない。従って $K\not\subseteq\Delta_A$ であり、[モノ射・エピ射の内部言語による判定](#thm-catb6-05-map-logic)からモノ射ではない。

文脈 $B\times A$ での等号部分は $\{(a,0),(a,1),(b,2)\}$。第一射影の像は $\{a,b\}$ である。これは $B$ 全体ではないので存在式は妥当でなく、同じ定理によりエピ射でもない。
<!-- solution-end -->

### CATB6-05-B04 関数抽象の代入

- Level: B

局所小な初等トポスで $q:G\times A\to B$ と $g:H\to G$、$u:H\to A$ がある。抽象項に $g$ を代入し、その関数に $u$ を適用した結果が $q\langle g,u\rangle:H\to B$ になることを評価射の式から示せ。

<!-- solution-start -->
**詳細解答**

$q$ のカリー化を $\bar q:G\to B^A$ とする。[内部言語の代入則](#thm-catb6-05-internal-substitution)より代入した抽象項は $\bar qg$ である。適用の意味は

$$
\operatorname{ev}\langle\bar qg,u\rangle.
$$

積の普遍性から $\langle\bar qg,u\rangle=(\bar q\times1_A)\langle g,u\rangle$ である。従って評価の式は

$$
\begin{aligned}
\operatorname{ev}\langle\bar qg,u\rangle
&=\operatorname{ev}(\bar q\times1_A)\langle g,u\rangle\\
&=q\langle g,u\rangle.
\end{aligned}
$$

最後は[指数対象](../../CAT/CAT4-05/index.md#def-cat4-05-exponential)の定義による。文脈の変更後も抽象と適用が元の計算を再現する。
<!-- solution-end -->

### CATB6-05-C01 二重否定と含意の健全性

- Level: C

小圏 $0\to1$ の集合値前層圏で、終対象の部分対象 $O,U,I$ を第7節のように取る。

1. この三元順序で任意の二元 $P,Q$ の含意を求める一般式を導け。
2. $\neg\neg U$ を求め、判断 $\neg\neg P\vdash P$ が任意の述語 $P$ について妥当ではないことを示せ。
3. この反例でも $D\wedge P\le Q\iff D\le(P\Rightarrow Q)$ が成立する理由を説明せよ。

<!-- solution-start -->
**詳細解答**

[前層のモノ射の成分判定](../CATB5-06/index.md#prop-catb5-06-pointwise-mono)によって終対象の部分対象は、制限写像に関して閉じた三つの組に限られる。順序は $O<U<I$ で、共通部分は小さい方である。

[部分対象の含意](../CATB6-01/index.md#thm-catb6-01-subobject-implication)により $P\Rightarrow Q$ は $\min(D,P)\le Q$ を満たす最大の $D$ を求めればよい。$P\le Q$ ならどの $D$ も条件を満たすので最大値は $I$。$P>Q$ なら $D\le Q$ の場合は条件を満たすが、$D>Q$ の場合は $D,P$ の双方が $Q$ より大きいため、その小さい方も $Q$ より大きい。よって最大値は $Q$ である。

$$
P\Rightarrow Q=
\begin{cases}
I & (P\le Q),\\
Q & (P>Q).
\end{cases}
$$

$U>O$ より $\neg U=U\Rightarrow O=O$。次に $O\le O$ より

$$
\neg\neg U=O\Rightarrow O=I.
$$

空文脈の述語 $P$ に $U$ を割り当てると、二重否定除去の判断は $I\le U$ となり成立しない。

一方、第一の場合 $P\le Q$ では両辺の条件がすべての $D$ で成立する。第二の場合 $P>Q$ では両辺とも $D\le Q$ と同値である。従って含意の随伴条件はすべての場合で成立する。失われたのは二重否定を一般に消去できるという古典論理の規則であり、[内部言語の含意と全称量化の健全性](#thm-catb6-05-intuitionistic-rules)に使った順序の論証は壊れていない。
<!-- solution-end -->

## 9. まとめ

- 型と文脈を対象と積で表し、項を射として解釈する。
- 式は部分対象であり、含意はHeyting演算、全称量化と存在量化は逆像の右随伴・左随伴である。
- 代入を文脈射で表すと、項の意味は合成、式の意味は逆像と交換する。
- 内包と所属は部分対象分類子と指数対象で結び付く。モノ射とエピ射も内部の判断で記述できる。
- 一般のトポスでは排中律や二重否定除去は成立するとは限らない。
