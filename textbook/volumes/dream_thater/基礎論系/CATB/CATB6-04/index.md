# CATB6-04 正則論理と整合論理

## 1. どの論理演算にどの圏の構造が必要か

前講までに、述語を部分対象として表し、量化を逆像の随伴として扱った。例えば「施設が存在し、その施設は地域に属している」という文は、地域と施設の組の中で関係を満たす部分から、地域への射影の像を取れば表せる。ここには全称量化も否定も必要ない。

では初等トポスほど豊かな構造がなくても、どこまで論理を扱えるだろうか。本講では、まず連言と存在量化を中心とする式の作り方を学び、次に有限選言を加えた場合を考える。選言の解釈には単に上限が存在するだけでなく、代入によって上限が保たれることが必要になる。

以下、局所小圏で各対象の部分対象全体が集合となる場合を考える。合成は右から左へ読む。

## 2. 式を作る規則と式の意味

対象の種類を指定する名前をソートといい、各ソートの変数を有限個並べたリストを文脈とする。関数記号には入力ソートのリストと出力ソート、関係記号には入力ソートのリストが指定される。これらの記号の指定を言語とする。項は変数から関数記号を有限回適用して作る。原子式は同じソートの二項の等号、または関係記号に適切な型の項を入力した式である。

$\top$ は常に真という条件、$\varphi\wedge\psi$ は両条件が成立するという条件、$\exists y\,\varphi$ はソートを指定された変数 $y$ の証人が存在するという条件を表す。自由変数は量化記号で束縛されていない変数である。

<a id="def-catb6-04-regular-logic"></a>

<!-- formal-statement-start -->
> **定義（正則論理）**
>
> ソート、関数記号、関係記号を指定した言語で、原子式と真の定数 $\top$ から、有限連言と存在量化を有限回適用して作る式を正則式とする。空連言は $\top$ とする。正則論理の判断は、両式の自由変数を含む同一の文脈において一方から他方が従うことを表す。
>
> 文脈を $\Gamma$ とした判断（シークエント）の表記は次である。

$$
\varphi\vdash_\Gamma\psi.
$$
<!-- formal-statement-end -->

<!-- definition-example-start: def-catb6-04-regular-logic -->
**定義の確認**。地域のソート $X$、施設のソート $Y$、所属関数 $f:Y\to X$、営業中の施設を表す一項関係 $P$ を取る。文脈 $x:X$ で

$$
\exists y:Y\, (f(y)=x\wedge P(y))
$$

は正則式である。$f(y)$ と $x$ は同じソートの項、$P(y)$ は原子式で、二式の連言の後で $y$ を束縛している。残る自由変数は $x$ のみである。

これを前件、$\top$ を後件に取れば同じ文脈の判断になる。一方 $\neg P(y)$ は指定された構成規則には含まれない。
<!-- definition-example-end -->

各ソートに圏の対象を割り当てる。文脈 $\Gamma=(x_1:S_1,\ldots,x_n:S_n)$ は、各変数のソート対象を順に並べた積 $G=S_1\times\cdots\times S_n$ で表す。同じソートの変数が二つあれば、その対象も二度積に現れる。以下、ソート名とその解釈対象には同じ記号を使う。関数記号は積から出力対象への射、関係記号は入力の積の部分対象として割り当てる。こうした割り当てを解釈と呼ぶ。空の文脈には終対象を用いる。以下、積の選択を固定し、括弧の差は積の普遍性による標準同型で識別する。

[積の普遍性](../../CAT/CAT2-04/index.md#def-cat2-04-small-product)により、文脈の変数は射影、関数を適用した項は入力項を成分とする射と関数射の合成になる。項の意味は文脈対象 $G$ からその項のソート対象への射である。式の意味は $G$ の[部分対象](../CATB4-07/index.md#def-catb4-07-subobject)として表す。

部分対象全体を $\operatorname{Sub}(G)$、代表モノ射 $m:M\to G$ の同型類を $[m]$ と書く。$A\le B$ は代表射がもう一方を経由するという部分対象の順序であり、集合の場合は部分集合の包含 $A\subseteq B$ に対応する。射 $f:X\to Y$ に対する[逆像](../CATB4-07/index.md#thm-catb4-07-inverse-image)は $f^*:\operatorname{Sub}(Y)\to\operatorname{Sub}(X)$ と書く。集合での $f^{-1}(B)$ と同じ役割を果たし、逆射の存在は要求しない。

## 3. 正則圏での解釈

[正則圏](../CATB1-02/index.md#def-catb1-02-regular-category)には有限極限があり、[像分解とその引き戻し安定性](../CATB1-02/index.md#thm-catb1-02-regular-factorization)が成り立つ。解釈を一つ固定し、文脈対象 $G$ での式 $\varphi$ の意味である部分対象を $[\![\varphi]\!]_G$ と書く。二重括弧は式の解釈、単括弧 $[m]$ は代表モノ射の同型類を表す。

等号を解釈するため、対角射 $\Delta_S:S\to S\times S$ を使う。二つの射影との合成がともに $1_S$ なので、$\Delta_S u=\Delta_S v$ なら第一射影を合成して $u=v$ となり、対角射はモノ射である。

言語の解釈全体を $M$ と書き、関係記号 $R$ の解釈を入力対象の積の部分対象 $R_M$ とする。各項とその解釈射には同じ記号を使い、$t_i:G\to S_i$ と書く。$\langle t_1,\ldots,t_n\rangle$ はこれらを成分に持つ積への射である。関係式はこの射に沿う逆像、等号 $t=u$ は同じソート $S$ の項の解釈射 $t,u:G\to S$ の組に沿う対角の逆像で与える。[対角射の引き戻しによる等化子](../../CAT/CAT2-03/index.md#prop-cat2-03-equalizer-as-pullback)により、等号部分を経由する射 $v:T\to G$ はちょうど $tv=uv$ を満たす射である。

有限連言には部分対象の最大下界（共通部分）$A\wedge B$ を使う。文脈に変数 $y:S$ を加えたときの射影を $\pi:G\times S\to G$ とし、射影に沿う像を $\exists_\pi A$ と書く。これは[部分対象の像と逆像の随伴](../CATB4-07/index.md#thm-catb4-07-image-adjoint)の左随伴である。式の $\exists y$ は変数を束縛する記号、部分対象の $\exists_\pi$ は射に沿う操作であり、以下の規則で両者を結び付ける。

<a id="def-catb6-04-regular-semantics"></a>

<!-- formal-statement-start -->
> **定義（正則式の圏論的解釈）**
>
> 各部分対象全体が集合となる局所小な正則圏で言語の解釈を固定する。文脈対象を $G$、束縛する変数のソート対象を $S$、射影を $\pi:G\times S\to G$ とする。正則式の意味を次の帰納規則で与える。

$$
\begin{aligned}
[\![\top]\!]_G&=[1_G],\\
[\![t=u]\!]_G&=\langle t,u\rangle^*[\Delta_S],\\
[\![R(t_1,\ldots,t_n)]\!]_G&=\langle t_1,\ldots,t_n\rangle^*R_M,\\
[\![\varphi\wedge\psi]\!]_G&=[\![\varphi]\!]_G\wedge[\![\psi]\!]_G,\\
[\![\exists y:S\,\varphi]\!]_G&=\exists_\pi[\![\varphi]\!]_{G\times S}.
\end{aligned}
$$

> ここで二つの等号項は同一ソート $S$ に属し、$\exists_\pi A$ は代表モノ射と $\pi$ の合成の像である。判断がこの解釈で成立する条件は次の包含である。

$$
[\![\varphi]\!]_G\le[\![\psi]\!]_G.
$$
<!-- formal-statement-end -->

<!-- definition-example-start: def-catb6-04-regular-semantics -->
**定義の確認**。集合の圏は[正則圏の定義](../CATB1-02/index.md#def-catb1-02-regular-category)直後の例で正則性を確認した。

地域 $X=\{a,b,c\}$、施設 $Y=\{1,2,3\}$ とし、$f(1)=f(2)=a$、$f(3)=b$、$P=\{2\}$ とする。文脈 $X\times Y$ で真は九組すべてである。等号の逆像と関係の逆像は

$$
\begin{aligned}
E&=\{(a,1),(a,2),(b,3)\},\\
Q&=X\times\{2\}
=\{(a,2),(b,2),(c,2)\}.
\end{aligned}
$$

等号の二項は $f\pi_Y,\pi_X:X\times Y\to X$ で、対角に入るとは値が一致することである。集合では[部分対象の逆像](../CATB4-07/index.md#thm-catb4-07-inverse-image)が通常の逆像と一致するので、各組 $(x,y)$ に対し

$$
\begin{aligned}
(x,y)\in E&\iff (f(y),x)\in\Delta_X\iff f(y)=x,\\
(x,y)\in Q&\iff y\in P.
\end{aligned}
$$

連言は $E\cap Q=\{(a,2)\}$ になる。射影像の判定は

$$
x\in\exists_{\pi_X}(E\cap Q)
\iff \exists y\in Y,\ (x,y)\in E\cap Q.
$$

従って射影像は $\{a\}$ である。

従って地域の文脈で上の存在式から $\top$ への判断は $\{a\}\subseteq X$ として成立する。逆向きは $b,c$ に証人がないため成立しない。
<!-- definition-example-end -->

有限極限によって共通部分が作れる理由を確認する。二つの代表モノ射について、[モノ射の引き戻し](../../CAT/CAT2-03/index.md#prop-cat2-03-pullback-mono)により引き戻しの射影はモノ射であり、$G$ への合成もモノ射である。両方を経由する任意の射は引き戻しを一意に経由するので、この合成は最大下界を表す。最大元は恒等射である。存在量化は[部分対象の像と逆像の随伴](../CATB4-07/index.md#thm-catb4-07-image-adjoint)によって、正則圏で既に存在が保証されている。

### 代入は逆像になる

文脈 $\Gamma$ の変数を別の文脈 $\Lambda$ の項に置き換える。この同時代入を $\sigma$、代入後の式を $\varphi[\sigma]$ と書く。$\Gamma,\Lambda$ の文脈対象をそれぞれ $G,H$ とすると、各代入項の解釈を積の成分として集めた射は $g:H\to G$ になる。構文の置換と反対向きに、解釈射は代入後の文脈から代入前の文脈へ向かう。束縛変数の名前をあらかじめ変更し、代入する項に含まれる自由変数が量化によって誤って束縛されないようにする。

<a id="thm-catb6-04-regular-substitution"></a>

<!-- formal-statement-start -->
> **定理（正則式の代入則）**
>
> 各部分対象全体が集合となる局所小な正則圏で言語の解釈を固定する。文脈 $\Gamma$ から $\Lambda$ の項への型の合う代入 $\sigma$ の意味を $g:H\to G$ とする。任意の正則式 $\varphi$ に対して、自由変数への束縛を避けた代入は次を満たす。

$$
[\![\varphi[\sigma]]\!]_H=g^*[\![\varphi]\!]_G.
$$
<!-- formal-statement-end -->

見取り図：項を合成で表し、式を作った順に逆像が各操作と交換できることを確かめる。存在量化の段階だけは像の安定性が必要になる。具体的には[部分対象のBeck–Chevalley等式](../CATB4-07/index.md#thm-catb4-07-beck-chevalley)を使う。

<!-- proof-start -->
### 証明

まず項について、変数の代入後の射は $g$ の対応成分である。関数記号 $F$ を用いた項について、各入力項 $t_i$ の代入後の射が $t_i g$ だと仮定すると、積の普遍性から

$$
\langle t_1g,\ldots,t_ng\rangle
=\langle t_1,\ldots,t_n\rangle g.
$$

左辺に $F$ の解釈を合成すると、代入後の項は代入前の項の射と $g$ の合成になる。零項関数の場合も終対象への射が一意なので成立する。

式の構成について帰納する。真の逆像は最大部分対象である。等号について、[部分対象の逆像の合成則](../CATB4-07/index.md#thm-catb4-07-inverse-image)により

$$
\langle tg,ug\rangle^*[\Delta_S]
=g^*\langle t,u\rangle^*[\Delta_S].
$$

関係式についても項の組の等式を代入すると

$$
\langle t_1g,\ldots,t_ng\rangle^*R_M
=g^*\langle t_1,\ldots,t_n\rangle^*R_M.
$$

連言では逆像が共通部分を保つ。実際、$H$ への射 $v$ が両逆像を経由することは、$gv$ が元の二つのモノ射を経由することと同値である。後者は $gv$ が元の共通部分を経由することと同値なので、$v$ が共通部分の逆像を経由することと同値になる。

従って二つの部分対象は互いに経由し、等しい。帰納仮定と合わせれば連言の代入則が得られる。

存在量化では、$\pi:G\times S\to G$、$\pi':H\times S\to H$ とし、$h=g\times1_S$ と置く。この四角形は引き戻しである。実際、$\pi u=gv$ を満たす $u:T\to G\times S$、$v:T\to H$ から、成分 $(v,\pi_Su)$ を持つ唯一の射 $T\to H\times S$ が得られる。その $h$ による像は成分 $(gv,\pi_Su)$ を持つため $u$ と一致する。

束縛変数を新しい名前にして自由変数の捕獲を防いだ後、その変数 $y$ を固定したまま代入を拡張する。拡張した代入の意味は $h$ である。帰納仮定と[部分対象のBeck–Chevalley等式](../CATB4-07/index.md#thm-catb4-07-beck-chevalley)を用いて

$$
\begin{aligned}
[\![(\exists y\,\varphi)[\sigma]]\!]_H
&=\exists_{\pi'}h^*[\![\varphi]\!]_{G\times S}\\
&=g^*\exists_\pi[\![\varphi]\!]_{G\times S}\\
&=g^*[\![\exists y\,\varphi]\!]_G.
\end{aligned}
$$

全構成規則を確認したので結論が従う。
<!-- proof-end -->

例えば先ほどの地域の例で $H=\{p,q,r\}$、$g(p)=g(q)=a$、$g(r)=c$ とすると、先に存在量化した $\{a\}$ の逆像は $\{p,q\}$ である。先に代入すると営業中かつ所属が一致する組は $(p,2),(q,2)$ だけなので、射影像はやはり $\{p,q\}$ となる。

## 4. 推論を包含で検証する

判断の意味は包含なので、同じ式から同じ式を導くことは反射律、二つの判断をつなぐことは推移律で保証される。連言の導入・除去は最大下界の性質に対応する。等号の反射性は $\langle t,t\rangle=\Delta_S t$ から従い、等号による置換は、等化部分の上で二項の射が実際に一致することから従う。

存在量化では、証人を具体的に指定して存在を主張することと、証人を含む前件からその証人に依存しない結論を導くことを区別する。

<a id="thm-catb6-04-regular-rules"></a>

<!-- formal-statement-start -->
> **定理（正則論理の基本推論の健全性）**
>
> 各部分対象全体が集合となる局所小な正則圏において、正則式を圏論的に解釈する。恒等・推移・代入、真・連言の導入と除去、等号の反射性と置換、存在量化の証人による導入と証人に依存しない結論への除去は、成立する判断から成立する判断を導く。
>
> また、$\pi:G\times S\to G$、$A\in\operatorname{Sub}(G\times S)$、$B\in\operatorname{Sub}(G)$ に対して、証人に依存しない連言を量化の外へ移せる。

$$
\exists_\pi(A\wedge\pi^*B)=\exists_\pi A\wedge B.
$$
<!-- formal-statement-end -->

見取り図：包含の順序性、積と像の普遍性、逆像と像の随伴を用いる。最後の等式には正則エピ射の引き戻し安定性を使う。

<!-- proof-start -->
### 証明

恒等・推移は部分対象順序の公理、代入は[正則式の代入則](#thm-catb6-04-regular-substitution)と逆像の単調性で従う。真の導入は任意の部分対象が最大元以下であること、連言の導入・除去は $D\le A\wedge B$ と $D\le A$ かつ $D\le B$ の同値である。

等号について、$t,u:G\to S$ の等号部分の代表を $e:E\to G$ とすれば $te=ue$ である。

ソート $S$ の自由変数を持つ任意の正則式 $\theta$ への二つの代入射が、対応成分 $t,u$ 以外は同じとする。これらを $e$ と合成すれば全成分が一致する。積の普遍性から合成射が等しい。

式 $\theta$ の元の文脈対象を $K$、二つの代入射を $p,q:G\to K$、式の意味を $T\in\operatorname{Sub}(K)$ と書く。上の議論で $pe=qe$ である。[正則式の代入則](#thm-catb6-04-regular-substitution)と[逆像の合成則](../CATB4-07/index.md#thm-catb4-07-inverse-image)から

$$
e^*p^*T=(pe)^*T=(qe)^*T=e^*q^*T.
$$

共通部分 $[e]\wedge p^*T$ の代表モノ射を $d:D\to G$ とする。$d$ は $e$ を経由するので $d=ek$ と書ける。$d$ が $p^*T$ を経由することは、引き戻しの普遍性により $k$ が $e^*p^*T$ を経由することと同値である。上の等式から $k$ は $e^*q^*T$ を経由し、従って $d$ は $q^*T$ を経由する。よって

$$
[e]\wedge p^*T\le q^*T.
$$

反射性は $\langle t,t\rangle=\Delta_S t$ が対角を経由するので全体が等号部分になることから従う。

[部分対象の像と逆像の随伴](../CATB4-07/index.md#thm-catb4-07-image-adjoint)より

$$
\exists_\pi A\le B\quad\Longleftrightarrow\quad A\le\pi^*B.
$$

右辺から左辺への推論が、証人 $y$ を含まない結論 $B$ への存在量化の除去である。証人項 $t:G\to S$ を指定する導入では、$s=\langle1_G,t\rangle$ とすると $\pi s=1_G$。随伴の単位 $A\le\pi^*\exists_\pi A$ を $s$ で引き戻せば

$$
s^*A\le s^*\pi^*\exists_\pi A
=(\pi s)^*\exists_\pi A=\exists_\pi A.
$$

次に定理の最後の主張（Frobenius相互法則）を示す。前講の[初等トポスでのFrobenius相互法則](../CATB6-03/index.md#thm-catb6-03-frobenius)と同じ形だが、ここでは正則性だけを仮定して証明する。一般の射 $f:X\to Y$ と部分対象 $A\in\operatorname{Sub}(X)$、$B\in\operatorname{Sub}(Y)$ を取る。$A$ の代表を $m:M\to X$、$B$ の代表を $n:N\to Y$ とし、$fm=ie$ を[正則エピ・モノ分解](../CATB1-02/index.md#thm-catb1-02-regular-factorization)とする。ここで $e:M\to I$ は正則エピ射、$i:I\to Y$ はモノ射である。

二つの引き戻しを取る。

$$
P=M\times_Y N,\qquad Q=I\times_Y N.
$$

射影を $a:P\to M$、$b:P\to N$、$c:Q\to I$、$d:Q\to N$ と書く。$P$ から $X$ へのモノ射 $ma$ は $A\wedge f^*B$ を表す。なぜなら $X$ への射が $m$ を経由し、かつ $f$ との合成が $n$ を経由する条件は $P$ の普遍性と一致するからである。

$iea=nb$ なので次を満たす $t:P\to Q$ が一意に定まる。

$$
ct=ea,\qquad dt=b.
$$

この $t$ は $e$ の $c$ に沿う引き戻しである。実際 $v:T\to M$、$q:T\to Q$ が $ev=cq$ を満たすとする。

$$
fmv=ie v=icq=ndq.
$$

従って $ak=v,bk=dq$ を満たす唯一の $k:T\to P$ が存在する。

$$
ctk=ev=cq,\qquad dtk=dq.
$$

よって $Q$ の普遍性から $tk=q$ であり、$ak=v,tk=q$ から逆に $bk=dq$ が強制される。

[正則圏の像分解とその引き戻し安定性](../CATB1-02/index.md#thm-catb1-02-regular-factorization)より $t$ は正則エピ射である。また $c$ はモノ射 $n$ の引き戻しなので[モノ射の引き戻し](../../CAT/CAT2-03/index.md#prop-cat2-03-pullback-mono)によりモノ射である。

$fma=ict$ の像は [正則エピ・モノ分解は像を与える](../CATB1-01/index.md#thm-catb1-01-regular-epi-mono-image) により $ic$ であり、$ic$ は $[i]\wedge[n]$ を表す。従って

$$
\exists_f(A\wedge f^*B)=\exists_f A\wedge B.
$$

$f=\pi$ とすれば所望の等式を得る。
<!-- proof-end -->

例えば「営業中の施設があり、地域は沿岸である」という結論では、沿岸という条件は施設変数に依存しない。存在の前に沿岸地域だけに絞っても、存在を判定してから沿岸地域に絞ってもよい。ただし「営業中」と「駐車場あり」の証人が別施設であってよい場合、二つの存在を同じ施設の存在にまとめることはできない。

## 5. 有限選言を加えるための条件

正則式では「条件 $P$ または条件 $Q$」を直接作れない。集合なら二つの部分集合の和集合で表せるが、一般の圏では部分対象の最小上界が存在するとは限らない。また上界が存在しても代入で保存されなければ、選言の意味が変わってしまう。

$\varphi\vee\psi$ は少なくとも一方が成立する条件、$\bot$ は成立しない条件を表す。有限選言には空選言 $\bot$ も含める。

<a id="def-catb6-04-coherent-logic"></a>

<!-- formal-statement-start -->
> **定義（整合論理）**
>
> 正則式の構成規則に有限選言を追加し、有限回の構成で得られる式を整合式とする。空選言は $\bot$ とする。判断は正則論理の場合と同じく、共通の文脈で前件から後件が従うことを表す。
<!-- formal-statement-end -->

<!-- definition-example-start: def-catb6-04-coherent-logic -->
**定義の確認**。地域 $x:X$、施設 $y:Y$ に対して営業中 $P(y)$ と予約可能 $Q(y)$ を一項関係とする。

$$
\exists y:Y\, (f(y)=x\wedge(P(y)\vee Q(y)))
$$

は整合式である。二つの原子式を選言で結び、等号との連言を作り、$y$ を束縛したので、自由変数は $x$ のみである。空選言も式であるから、$\bot\vdash_{x:X}\exists y:Y\,(f(y)=x\wedge(P(y)\vee Q(y)))$ も判断になる。この構成には含意や全称量化を追加していない。
<!-- definition-example-end -->

次に、整合式を解釈できる圏の条件を定める。部分対象の順序に最小元があれば $\bot_X$、二元の最小上界があれば $A\vee B$ と書く。論理式の選言をこの上限に対応させるため、空の場合も含めて逆像で保存されることを要求する。

<a id="def-catb6-04-coherent-category"></a>

<!-- formal-statement-start -->
> **定義（整合圏）**
>
> 各部分対象全体が集合となる局所小な正則圏で、各対象 $X$ の部分対象順序が有限上限（空上限を含む）を持ち、任意の射 $f:X\to Y$ に沿う逆像がそれらを保存するとき、この圏を整合圏とする。

$$
f^*\bot_Y=\bot_X,\qquad
f^*(A\vee B)=f^*A\vee f^*B.
$$

> ここで $\bot_X$ は最小部分対象、$A\vee B$ は二部分対象の最小上界である。
<!-- formal-statement-end -->

<!-- definition-example-start: def-catb6-04-coherent-category -->
**定義の確認**。集合の圏の正則性は[正則圏の定義](../CATB1-02/index.md#def-catb1-02-regular-category)の例で確認済みである。[部分対象と部分集合の対応](../CATB4-07/index.md#def-catb4-07-subobject)により、集合 $Y$ の部分対象順序は部分集合の包含順序と同一視できる。空集合 $\varnothing$ はすべての部分集合に含まれるので空上限である。$A\cup B$ は $A,B$ を含み、両方を含む任意の部分集合 $D$ に対し $A\cup B\subseteq D$ だから二項上限である。

任意の写像 $f:X\to Y$ と二部分集合 $A,B\subseteq Y$ に対して

$$
\begin{aligned}
x\in f^{-1}(A\cup B)
&\iff f(x)\in A\text{ または } f(x)\in B\\
&\iff x\in f^{-1}(A)\cup f^{-1}(B).
\end{aligned}
$$

また $f(x)\in\varnothing$ となる元はないので空上限も保存される。有限上限はこれらの反復で得られる。よってすべての条件が満たされる。
<!-- definition-example-end -->

整合圏では、正則式の解釈に $[\![\bot]\!]_G=\bot_G$ と $[\![\varphi\vee\psi]\!]_G=[\![\varphi]\!]_G\vee[\![\psi]\!]_G$ を加える。

<a id="thm-catb6-04-coherent-rules"></a>

<!-- formal-statement-start -->
> **定理（整合論理の選言と代入の健全性）**
>
> 整合圏で言語の解釈を固定する。整合式の解釈は型の合う、自由変数の捕獲を避けた代入に対して逆像と交換する。空選言から任意の式を導く推論、選言の導入・場合分け、および連言の有限選言に対する分配が成立する。また任意の射 $f:X\to Y$ と $A,B\in\operatorname{Sub}(X)$ に対して、射に沿う存在量化は有限選言と空選言を保存する。

$$
\exists_f(A\vee B)=\exists_f A\vee\exists_f B,
\qquad
\exists_f\bot_X=\bot_Y.
$$
<!-- formal-statement-end -->

見取り図：代入は定義の安定性、場合分けは上限の普遍性、存在量化の保存性は左随伴条件から示す。分配には部分対象の包含射に沿う逆像を使う。

<!-- proof-start -->
### 証明

[正則式の代入則](#thm-catb6-04-regular-substitution)の帰納証明に二つの場合を加える。空選言は $g^*\bot_G=\bot_H$、二項選言は帰納仮定と $g^*(A\vee B)=g^*A\vee g^*B$ から代入則を得る。正則式の各構成に対する証明は部分式が整合式でも同じ等式で成立する。従って全構成規則を尽くした。

空選言からの推論は最小元の性質、選言導入は $A\le A\vee B$ と $B\le A\vee B$、場合分けは $A\vee B\le D$ と $A\le D$ かつ $B\le D$ の同値である。

分配について $m:M\to X$ を $C$ の代表モノ射とする。任意の部分対象 $D$ に対し、$m^*D$ の代表と $m$ の合成はモノ射で、$C\wedge D$ を表す。

従ってその像は $C\wedge D$ である。[部分対象の像と逆像の随伴](../CATB4-07/index.md#thm-catb4-07-image-adjoint)から任意の $E_1,E_2\in\operatorname{Sub}(M)$ と $D\in\operatorname{Sub}(X)$ について

$$
\begin{aligned}
\exists_m(E_1\vee E_2)\le D
&\iff E_1\vee E_2\le m^*D\\
&\iff E_1\le m^*D,\ E_2\le m^*D\\
&\iff \exists_m E_1\vee\exists_m E_2\le D.
\end{aligned}
$$

任意の $D$ で成立するので両部分対象は等しい。ここで $E_1=m^*A,E_2=m^*B$ と置き、逆像の有限上限保存を使うと

$$
\begin{aligned}
C\wedge(A\vee B)
&=\exists_m m^*(A\vee B)\\
&=\exists_m(m^*A\vee m^*B)\\
&=(C\wedge A)\vee(C\wedge B).
\end{aligned}
$$

空の場合も $m^*\bot_X=\bot_M$ で、$\exists_m\bot_M\le D$ は $\bot_M\le m^*D$ と同値で常に成立する。従って $C\wedge\bot_X=\bot_X$。

一般の射 $f$ でも上記の随伴による包含の同値は $m$ を $f$ に置換して成立する。つまり任意の $D\in\operatorname{Sub}(Y)$ について

$$
\begin{aligned}
\exists_f(A\vee B)\le D
&\iff A\vee B\le f^*D\\
&\iff A\le f^*D,\ B\le f^*D\\
&\iff \exists_f A\vee\exists_f B\le D.
\end{aligned}
$$

両辺自身を順に $D$ に取ると互いの包含を得る。空選言も $\exists_f\bot_X\le D\iff\bot_X\le f^*D$ が常に成立するので最小元に等しい。
<!-- proof-end -->

集合の例で営業中の施設が $P=\{1\}$、予約可能な施設が $Q=\{3\}$、所属が $f(1)=f(2)=a,f(3)=b$ なら $f(P\cup Q)=\{a,b\}$ である。先にそれぞれの存在を求めれば $f(P)=\{a\}$、$f(Q)=\{b\}$ となり、選言で同じ結果を得る。

## 6. 上限があっても代入できない例

三つの互いに比較不能な元 $a,b,c$ と最小元 $0$、最大元 $1$ からなる五元の順序集合を考える。異なる中間元の共通下界の最大は $0$、共通上界の最小は $1$ とする。

この順序を圏として見て、$x\le y$ のときに限り唯一の射 $x\to y$ を置く。射の集合は空または一元集合なので局所小である。

[正則圏の三条件](../CATB1-02/index.md#def-catb1-02-regular-category)を確認する。終対象は $1$、二項積は最大下界、平行射は必ず一致するので等化子は始域の恒等射である。[有限極限の存在判定](../../CAT/CAT2-04/index.md#thm-cat2-04-finite-criterion)により有限極限が存在する。

任意の射の[核対](../CATB1-01/index.md#def-catb1-01-kernel-pair)は始域自身と二つの恒等射になる（引き戻しは始域と始域の最大下界）。一致した二射の余等化子は恒等射であり、余等化子の一意性から他の余等化子も同型射になる。従って[正則エピ射](../CATB1-01/index.md#def-catb1-01-regular-epi)は同型射だけである。その引き戻しは同型射である（この順序圏では同型射は恒等射で、恒等射の引き戻しは恒等射）。各部分対象順序は有限である。

この順序圏では全ての射がモノ射であることに注意する。任意の二平行射は一致するため左消去律を満たすからである。

対象 $x$ の部分対象は $u\le x$ の元そのもので、$x\le y$ に沿う逆像は $u\mapsto x\wedge u$ となる。これは引き戻しが二元の最大下界になるためである。$x$ 以下の元の集まりには最小元 $0$ があり、二元の上限も $x$ 以下である（$x$ 自身が両者の上界だから）。従って各部分対象順序には空上限を含む有限上限が存在する。

$1$ 上の $b,c$ は上限 $1$ を持つ。しかし $a\to1$ で逆像を取ると

$$
a\wedge(b\vee c)=a\wedge1=a,
$$

一方で

$$
(a\wedge b)\vee(a\wedge c)=0\vee0=0.
$$

$a\ne0$ なので有限上限の保存が失敗する。式の代入としても失敗を確認しよう。ソート $U,V$ をそれぞれ対象 $1,a$ に解釈し、関数記号 $j:V\to U$ を唯一の射 $a\to1$ に解釈する。$U$ 上の一項関係 $P,Q$ をそれぞれ部分対象 $b,c$ に解釈する。文脈 $u:U$ での選言の意味は $b\vee c=1$ である。一方、文脈 $v:V$ で $u$ を $j(v)$ に代入すると

$$
[\![P(j(v))\vee Q(j(v))]\!]_a=0,
\qquad
j^*[\![P(u)\vee Q(u)]\!]_1=a.
$$

両者は異なる。正則性だけでは選言の安定性は従わない。

## 7. 演習

### CATB6-04-A01 式の構成と自由変数

- Level: A

ソート $X,Y$、関数 $f:Y\to X$、一項関係 $P,Q$ を $Y$ 上に持つ言語で、$\exists y:Y\,(f(y)=x\wedge P(y))$、$\exists y:Y\,(P(y)\vee Q(y))$、$\forall y:Y\,P(y)$ の構成規則と自由変数を判定せよ。

<!-- solution-start -->
**詳細解答**

[正則論理](#def-catb6-04-regular-logic)の構成規則から、第一式は等号と関係の原子式を連言し $y$ を束縛した正則式で、自由変数は $x$。第二式は二つの原子式を選言してから $y$ を束縛するので[整合論理](#def-catb6-04-coherent-logic)の式であるが正則式ではなく、自由変数はない。第三式の $\forall y:Y$ は「すべての $y$」を表し、$y$ を束縛するので自由変数はない。ただし全称量化はどちらの構成規則にもない。
<!-- solution-end -->

### CATB6-04-A02 等号と逆像

- Level: A

$X=\{0,1,2\}$、$S=\{a,b\}$、$t(0)=t(1)=a,t(2)=b$、$u(0)=a,u(1)=u(2)=b$ とする。$t=u$ の意味を対角の逆像として求めよ。

<!-- solution-start -->
**詳細解答**

[正則式の圏論的解釈](#def-catb6-04-regular-semantics)に従う。対角は $\{(a,a),(b,b)\}$ である。組の写像は $0\mapsto(a,a),1\mapsto(a,b),2\mapsto(b,b)$。従って対角に入るのは $0,2$ で、意味は $\{0,2\}$ となる。
<!-- solution-end -->

### CATB6-04-A03 関係と存在量化

- Level: A

$X=\{a,b,c\}$、$Y=\{1,2\}$、$R=\{(a,1),(b,2),(c,1)\}$、$P=\{2\}$ とする。$\exists y:Y\,(R(x,y)\wedge P(y))$ の意味を求めよ。

<!-- solution-start -->
**詳細解答**

文脈 $X\times Y$ における $P(y)$ は第二射影による逆像 $\{(a,2),(b,2),(c,2)\}$ である。$R$ との共通部分は $\{(b,2)\}$ だけになる。

[正則式の圏論的解釈](#def-catb6-04-regular-semantics)で存在量化は第一射影の像なので、答えは $\{b\}$ である。$a,c$ には $R$ の証人はあるが、$P$ も満たす証人はない。
<!-- solution-end -->

### CATB6-04-A04 選言と空選言

- Level: A

$X=\{1,2,3\}$、$Y=\{a,b,c\}$、$f(1)=a,f(2)=b,f(3)=a$、$A=\{a\},B=\{c\}$ とする。$f^*(A\vee B)$、$f^*A\vee f^*B$、$f^*\bot_Y$ を求めよ。

<!-- solution-start -->
**詳細解答**

$A\vee B=\{a,c\}$ であり、$f$ の値が $a$ または $c$ になる入力は $1,3$ だけである。従って第一の答えは $\{1,3\}$。別々に逆像を取れば $f^*A=\{1,3\}$、$f^*B=\varnothing$ なので第二も $\{1,3\}$。

$\bot_Y=\varnothing$ には値が入らないので第三は $\varnothing=\bot_X$。これは[整合圏](#def-catb6-04-coherent-category)の安定性の具体例である。
<!-- solution-end -->

### CATB6-04-B01 証人の指定と存在の推論

- Level: B

各部分対象全体が集合となる局所小な正則圏で $G,S$、$\pi:G\times S\to G$、$t:G\to S$、$A\in\operatorname{Sub}(G\times S)$ を取る。$s=\langle1_G,t\rangle$ とし、$D\in\operatorname{Sub}(G)$ が $D\le s^*A$ を満たすなら $D\le\exists_\pi A$ を示せ。逆が一般に成立しない集合の例を与えよ。

<!-- solution-start -->
**詳細解答**

[部分対象の像と逆像の随伴](../CATB4-07/index.md#thm-catb4-07-image-adjoint)で $\exists_\pi A\le\exists_\pi A$ を右側の条件に移すと $A\le\pi^*\exists_\pi A$。逆像は順序を保つので

$$
D\le s^*A\le s^*\pi^*\exists_\pi A
=(\pi s)^*\exists_\pi A=\exists_\pi A.
$$

最後は積の第一成分が $1_G$ であることと[逆像の合成則](../CATB4-07/index.md#thm-catb4-07-inverse-image)による。逆の反例として $G=\{a\}$、$S=\{1,2\}$、$A=\{(a,2)\}$、$t(a)=1$、$D=G$ を取る。

$\exists_\pi A=G$ だが $s^*A=\varnothing$。存在する証人は $2$ で、指定した $1$ ではない。
<!-- solution-end -->

### CATB6-04-B02 代入と存在量化

- Level: B

$G=\{a,b\}$、$H=\{p,q,r\}$、$S=\{0,1\}$、$g(p)=g(q)=a,g(r)=b$ とする。$A=\{(a,1),(b,0)\}$、$B=\{(a,1)\}$ を $G\times S$ の部分集合とする。$A\wedge B$ を存在量化してから $g$ で逆像を取る場合と、$g\times1_S$ で逆像を取ってから連言と存在量化を行う場合を比較せよ。

<!-- solution-start -->
**詳細解答**

$A\cap B=\{(a,1)\}$ なので第一射影の像は $\{a\}$。その逆像は $\{p,q\}$ である。$h=g\times1_S$ と置くと

$$
h^*A=\{(p,1),(q,1),(r,0)\},
\qquad h^*B=\{(p,1),(q,1)\}.
$$

共通部分は $(p,1),(q,1)$ だけで第一射影像は $\{p,q\}$。これは[正則式の代入則](#thm-catb6-04-regular-substitution)の連言と存在量化の段階を続けて計算した結果である。
<!-- solution-end -->

### CATB6-04-B03 分配と安定性

- Level: B

整合圏で $m:M\to X$ を $C$ の代表モノ射とし、$A,B$ を $X$ の部分対象とする。逆像が有限上限を保存する条件から $C\wedge(A\vee B)=(C\wedge A)\vee(C\wedge B)$ を導け。

<!-- solution-start -->
**詳細解答**

[部分対象の像と逆像の随伴](../CATB4-07/index.md#thm-catb4-07-image-adjoint)より、任意の $D\in\operatorname{Sub}(X)$ に対して $\exists_m m^*D$ は $m$ と逆像の代表モノ射の合成の像である。この合成はモノ射であり、引き戻しの普遍性から $C,D$ の共通部分を表す。

従って $\exists_m m^*D=C\wedge D$。

[整合圏の条件](#def-catb6-04-coherent-category)で $m^*(A\vee B)=m^*A\vee m^*B$。さらに任意の $T\in\operatorname{Sub}(X)$ について

$$
\begin{aligned}
\exists_m(m^*A\vee m^*B)\le T
&\iff m^*A\vee m^*B\le m^*T\\
&\iff m^*A\le m^*T,\ m^*B\le m^*T\\
&\iff \exists_m m^*A\vee\exists_m m^*B\le T.
\end{aligned}
$$

互いを $T$ に代入すれば両辺は等しい。$D=A\vee B,A,B$ について最初の等式を使うと、求める分配式を得る。
<!-- solution-end -->

### CATB6-04-B04 空文脈と証人の不在

- Level: B

集合の圏でソート $S=\varnothing$ とする。空文脈で $\exists y:S\,\top$ の意味を求め、$\top$ と同じか判定せよ。またソートを一元集合に変えた場合も計算せよ。

<!-- solution-start -->
**詳細解答**

空文脈は一元集合 $1=\{*\}$ である。[正則式の圏論的解釈](#def-catb6-04-regular-semantics)で量化前の文脈は $1\times S=\varnothing$、真はその全体 $\varnothing$。射影像は空集合なので、空文脈の $\top=1$ とは異なる。

$S=\{s\}$ なら量化前の真は $\{(*,s)\}$ で、射影像は $\{*\}=1$。真の定数を量化しても、証人の存在は別に必要である。
<!-- solution-end -->

### CATB6-04-C01 正則性と整合性を区別する

- Level: C

第6節の五元順序圏で、任意の射 $f:x\to y$ に沿う存在量化が $u\le x$ を同じ元 $u\le y$ に送ることを随伴条件から示せ。その後 $f:a\to1$ に沿う逆像について、$b,c$ の選言の代入則が成立しないことを示せ。

存在量化の基底変換まで失敗すると結論してよいか説明せよ。

<!-- solution-start -->
**詳細解答**

部分対象はそれぞれ $\{u\mid u\le x\}$ と $\{v\mid v\le y\}$ であり、逆像は $v\mapsto x\wedge v$。任意の $u\le x$ と $v\le y$ について

$$
u\le v\quad\Longleftrightarrow\quad u\le x\wedge v
$$

が成り立つ。右向きは $u\le x,u\le v$ から最大下界の性質、左向きは $x\wedge v\le v$ から従う。従って $u\mapsto u$ は逆像の左随伴であり、[部分対象の像と逆像の随伴](../CATB4-07/index.md#thm-catb4-07-image-adjoint)による存在量化と一致する。

$f:a\to1$ では $b\vee c=1$ なので $f^*(b\vee c)=a$。

一方 $f^*b=a\wedge b=0$、$f^*c=a\wedge c=0$ だから $f^*b\vee f^*c=0$。よって選言の代入則は失敗する。

しかし正則性は第6節で確認したので[部分対象のBeck–Chevalley等式](../CATB4-07/index.md#thm-catb4-07-beck-chevalley)は成立する。

実際 $x\to y$ と $z\to y$ の引き戻しは $x\wedge z$ である。$u\le x$ をまず $y$ に送ってから $z$ へ逆像を取れば $z\wedge u$。

逆順では引き戻しによって

$$
(x\wedge z)\wedge u=z\wedge u
$$

を得て、それをそのまま $z$ に送る。両者は一致する。失われたのは選言の代入に必要な有限上限の安定性であり、像の安定性ではない。
<!-- solution-end -->

## 8. まとめ

正則論理は有限連言、等号、存在量化を、有限極限と安定な像で解釈する。整合論理は有限選言を加え、逆像で保存される有限上限を要求する。式の代入は逆像に対応し、判断の成立は部分対象の包含で判定する。次講では初等トポスのさらに豊かな構造を使って、内部言語の項と式を解釈する。
