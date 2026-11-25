# CATB6-02 量化子の随伴表示

<!-- definition-example-audit: strict -->

## 1. 述語から変数を一つ消す

[部分対象のHeyting代数性](../CATB6-01/index.md#thm-catb6-01-subobject-heyting)によって、同じ対象上の二つの述語の連言や含意を計算できた。今度は、二つの変数を持つ述語から一つの変数を消し、残った変数だけで成立を判定したい。

集合 $X$ を入力、集合 $Y$ を候補の集合とし、部分集合 $R\subseteq X\times Y$ を考える。例えば $X=\{a,b,c\}$、$Y=\{0,1\}$ として、

$$
R=\{(a,0),(a,1),(b,0)\}
$$

と置く。$(x,y)\in R$ を述語 $R(x,y)$ が真であることと読む。$x=a$ では両候補が成立し、$x=b$ では一つだけ成立し、$x=c$ ではどちらも成立しない。

従って存在量化と全称量化の成立域は順に $\{a,b\}$ と $\{a\}$ になる。

変数が値を取る対象を型といい、値の指定が残る変数を自由変数、量化によって値の指定が不要になる変数を束縛変数という。ここでは $y$ が束縛され、$x$ が自由なままである。存在量化と全称量化を、単なる論理記号ではなく部分対象間の操作として表そう。

以下、局所小な[初等トポス](../CATB5-06/index.md#def-catb5-06-elementary-topos) $\mathcal E$ を固定する。[分類射と部分対象の自然な対応](../CATB5-06/index.md#thm-catb5-06-classifier-bijection)により、対象 $X$ の部分対象順序 $\operatorname{Sub}(X)$ は集合である。

[部分対象](../CATB4-07/index.md#def-catb4-07-subobject) $A=[m:M\to X]$ はモノ射の同型類であり、$A\le B$ は $A$ の代表が $B$ の代表を経由することを表す。合成は右から左に書く。

## 2. 変数を増やす操作と減らす操作

順序を保つ写像を順序関手と呼ぶ。射 $f:U\to V$ に沿う[部分対象の逆像](../CATB4-07/index.md#thm-catb4-07-inverse-image)は、引き戻しで定める順序関手である。

$$
f^*:\operatorname{Sub}(V)\longrightarrow\operatorname{Sub}(U).
$$

集合なら $f^*B=f^{-1}(B)=\{u\in U\mid f(u)\in B\}$ である。$f^{-1}(B)$ は部分集合 $B$ の逆像であり、逆写像の存在を仮定しない。$f^*$ は部分対象に作用する関手、$f^{-1}(B)$ は集合の場合のその値を表す。射影 $\pi:X\times Y\to X$ なら、$B$ を逆像に取ると $B\times Y$ になる。つまり、$x$ だけの述語に、判定に使わない変数 $y$ を加える操作である。

逆に、$U$ 上の述語 $A$ から $V$ 上の述語を作るには、$f$ の同じ値に対応する複数の入力をまとめる必要がある。どれか一つが成立する場合と、全部が成立する場合では、包含の向きが変わる。これを[半順序圏の随伴判定](../../CAT/CAT2-08/index.md#thm-cat2-08-poset)で表す。

$L\dashv R$ は $L$ が左随伴、$R$ が右随伴であることを表す。$\exists_f A$ と $\forall_f A$ の添字 $f$ は、どの射に沿って $U$ 上の部分対象 $A$ を $V$ 上へ送るかを指定する。

<a id="def-catb6-02-quantifiers"></a>

<!-- formal-statement-start -->
> **定義（射に沿う量化子）**
>
> 部分対象の逆像 $f^*$ が存在する射 $f:U\to V$ を考える。存在量化子 $\exists_f$ と全称量化子 $\forall_f$ は、いずれも次の型の順序関手である。

$$
\operatorname{Sub}(U)\longrightarrow\operatorname{Sub}(V).
$$

> 任意の $A\in\operatorname{Sub}(U)$ と $B\in\operatorname{Sub}(V)$ について、存在量化子は第一の同値、全称量化子は第二の同値で特徴付けられる。

$$
\exists_f A\le B\iff A\le f^*B,
$$

$$
f^*B\le A\iff B\le\forall_f A.
$$

> すなわち $\exists_f\dashv f^*\dashv\forall_f$ である。各量化子は、該当する随伴が存在するときに定義される。
<!-- formal-statement-end -->

左の条件は $A$ を含む逆像に対応する最小の $B$ を選び、右の条件は逆像が $A$ に含まれる最大の $B$ を選ぶ。実際、左随伴条件に $B=\exists_f A$、右随伴条件に $B=\forall_f A$ を代入すると、それぞれ $A\le f^*\exists_f A$ と $f^*\forall_f A\le A$ が得られる。他の候補 $B$ との比較は同じ随伴条件が与える。最小元・最大元は反対称性によって一意である。

<!-- definition-example-start: def-catb6-02-quantifiers -->
**定義の確認**

集合 $U=\{1,2,3\}$、$V=\{a,b,c\}$ とし、$f(1)=f(2)=a$、$f(3)=b$ と置く。値 $v$ に対するファイバーとは $f^{-1}(\{v\})$ である。三つのファイバーはそれぞれ $\{1,2\},\{3\},\varnothing$ である。

任意の部分集合 $A\subseteq U$ に対して

$$
E(A)=\{v\in V\mid f^{-1}(\{v\})\cap A\ne\varnothing\},
$$

$$
F(A)=\{v\in V\mid f^{-1}(\{v\})\subseteq A\}
$$

と置く。$A\subseteq A'$ なら、空でない共通部分は空でないままであり、包含されていたファイバーは依然として包含される。従って $E,F$ は順序を保つ。

$E(A)\subseteq B$ なら、任意の $u\in A$ について $f(u)\in E(A)\subseteq B$ なので $u\in f^*B$ である。逆に $A\subseteq f^*B$ なら、$v\in E(A)$ に対する証人 $u\in A$ は $f(u)=v$ を満たし、$u\in f^*B$ より $v\in B$ となる。

また $f^*B\subseteq A$ なら、$v\in B$ に対して $f(u)=v$ を満たす全ての $u$ は $f^*B$ に属する。従ってそのファイバーは $A$ に含まれ、$v\in F(A)$ である。逆に $B\subseteq F(A)$ なら、$u\in f^*B$ に対して $f(u)\in B$ であるから、そのファイバーの元 $u$ は $A$ に属する。

以上は任意の $A,B$ について両随伴条件を確認したので、$E=\exists_f$、$F=\forall_f$ である。

特に $A=\{1\}$ では、$a$ のファイバーは $A$ と交わるが $A$ に含まれず、$b$ のファイバーは交わらず含まれない。$c$ のファイバーは空なので $A$ に含まれる。

$$
\exists_f A=\{a\},\qquad \forall_f A=\{c\}.
$$

空ファイバーでは存在量化は偽、全称量化は真になる。全称量化の真は証人の存在を主張しない。
<!-- definition-example-end -->

## 3. 初等トポスでは二つの量化子が存在する

集合ではファイバーを元の集まりとして検査したが、一般のトポスでは終対象 $1$ からの射（大域的な元）だけで部分対象の包含を判定できるとは限らない。そこで任意の試験対象 $T$ からの射 $b:T\to V$ を使う。通常のファイバーに相当する対象は [引き戻し](../../CAT/CAT2-03/index.md#def-cat2-03-pullback) $T\times_V U$ である。その $U$ への射影が $m:M\to U$ を経由するとは、その射影が $m$ とある射の合成になることであり、ファイバー全体が $A=[m]$ に含まれる条件を表す。ここで [射の像](../CATB5-08/index.md#thm-catb5-08-image) は、その射が経由する最小の部分対象である。

<a id="thm-catb6-02-quantifier-existence"></a>

<!-- formal-statement-start -->
> **定理（初等トポスの量化子の存在）**
>
> 局所小な初等トポスの任意の射 $f:U\to V$ に対し、部分対象の逆像には左随伴と右随伴が存在する。

$$
\exists_f\dashv f^*\dashv\forall_f.
$$

> $A=[m:M\to U]$ に対し、左随伴は合成 $fm$ の像を与える。右随伴は、任意の射 $u:T\to V$ がその代表モノ射を経由することと、引き戻し $T\times_V U$ の $U$ への射影が $m$ を経由することが同値になる部分対象を与える。
<!-- formal-statement-end -->

見取り図：存在量化には像の最小性を使う。全称量化にはファイバー全体が述語に入る条件を表す等化子を使う。どちらも「代表モノ射を経由する」という判定に帰着する。

<!-- proof-start -->
### 証明

[初等トポスのBarr-正確性](../CATB5-08/index.md#thm-catb5-08-exact)により $\mathcal E$ は [Barr-正確圏](../CATB1-02/index.md#def-catb1-02-barr-exact) であり、その定義から正則圏である。部分対象順序が集合であることは第1節で確認したので、[部分対象の像と逆像の随伴](../CATB4-07/index.md#thm-catb4-07-image-adjoint)を $f$ と $m$ に適用できる。$\exists_f A=[\operatorname{im}(fm)]$ と置けば

$$
\exists_f A\le B\iff A\le f^*B
$$

を得る。

次に[ファイバー包含条件の表現](../CATB5-08/index.md#lem-catb5-08-fiber-condition)を次の対応で適用する。

$$
g=f,\quad C=U,\quad B=V,\quad S=M.
$$

補題の構成では、$V\times U$ の二つの射影を $\pi_V,\pi_U$ とし、$\pi_V$ と $f\pi_U$ の [等化子](../../CAT/CAT2-03/index.md#def-cat2-03-equalizer) を部分対象 $D$ とする。これは集合の言葉では $v=f(u)$ を表す。さらに $D$ と $V\times M$（モノ射 $1_V\times m$ で表す）の共通部分を $D'$ とする。

[部分対象分類子](../CATB5-06/index.md#def-catb5-06-classifier) の対象を $\Omega$、$D,D'$ の分類射を $\chi_D,\chi_{D'}:V\times U\to\Omega$ と書く。[冪対象](../CATB5-08/index.md#def-catb5-08-power-object) $\Omega^U$ への転置 $\widehat{\chi_D},\widehat{\chi_{D'}}:V\to\Omega^U$ の等化子 $n:N\to V$ を取る。転置とは、評価射との合成によって元の分類射を復元する射である。

補題により任意の $b:T\to V$ について

$$
b\text{ が }n\text{ を経由する}
\iff
(T\times_V U\to U)\text{ が }m\text{ を経由する}.
$$

ここで一般の試験射 $b$ を、任意の部分対象 $B=[b:T\to V]$ を表すモノ射の場合に限定する。$b$ はモノ射なので、引き戻しの射影 $p:T\times_V U\to U$ は [モノ射の引き戻し](../../CAT/CAT2-03/index.md#prop-cat2-03-pullback-mono)によってモノ射であり、$[p]=f^*B$ である。従って上の同値は

$$
B\le[n]\iff f^*B\le A
$$

となる。よって $\forall_f A=[n]$ と置けば所望の右随伴条件を得る。

値の一意性は[量化子の定義](#def-catb6-02-quantifiers)に続く反対称性の議論から従い、代表や引き戻しの選択によらない。順序保存も確かめる。$A\le A'$ とすると、右随伴条件に $B=\forall_f A$ を代入して

$$
f^*\forall_f A\le A\le A'
$$

を得る。もう一度右随伴条件を $A'$ に適用すれば $\forall_f A\le\forall_f A'$ である。左随伴は引用した定理で順序保存が示されている。これで両方が順序関手となり、二つの随伴が成立する。
<!-- proof-end -->

例えば $f:U\to V$ が集合の包含 $U\subseteq V$ なら、$v\in U$ のファイバーは $\{v\}$、$v\notin U$ のファイバーは空集合である。[量化子の集合例](#def-catb6-02-quantifiers)の判定を使うと、存在量化は $v\in A$ のときだけ真となる。一方、全称量化は $v\in A$ または $v\notin U$ のとき真となる。

$$
\exists_f A=A,\qquad \forall_f A=A\cup(V\setminus U).
$$

この差は次節で量化を論理として読む際にも重要になる。

## 4. 射影に沿う量化と自由変数

$X,Y$ を初等トポスの対象とし、$\pi:X\times Y\to X$ を第一射影とする。$X\times Y$ の部分対象 $R$ を、型 $X$ の変数 $x$ と型 $Y$ の変数 $y$ を持つ述語と読む。$x$ だけを自由変数として残す二つの述語を

$$
(\exists y:Y)\,R(x,y):=\exists_\pi R,
$$

$$
(\forall y:Y)\,R(x,y):=\forall_\pi R
$$

と書く。右辺はいずれも $\operatorname{Sub}(X)$ の元である。逆像 $\pi^*B$ は、$x$ だけに依存する述語 $B$ を $X\times Y$ 上に戻したものである。従って $R$ と $B$ を直接比較するのではなく、同じ型の部分対象同士を比較する。

<a id="prop-catb6-02-projection-quantification"></a>

<!-- formal-statement-start -->
> **命題（集合の射影量化）**
>
> 集合 $X,Y$ と部分集合 $R\subseteq X\times Y$ に対し、第一射影 $\pi$ に沿う量化子は次で与えられる。

$$
\exists_\pi R=\{x\in X\mid \exists y\in Y,\ (x,y)\in R\},
$$

$$
\forall_\pi R=\{x\in X\mid \forall y\in Y,\ (x,y)\in R\}.
$$
<!-- formal-statement-end -->

見取り図：射影のファイバーは $\{x\}\times Y$ である。そこに $R$ の元があるか、全部が $R$ に入るかを調べる。

<!-- proof-start -->
### 証明

各 $x\in X$ について $\pi^{-1}(\{x\})=\{x\}\times Y$ である。[量化子の集合例](#def-catb6-02-quantifiers)で確認した随伴条件を $\pi$ に適用すると、存在量化は

$$
x\in\exists_\pi R
\iff (\{x\}\times Y)\cap R\ne\varnothing.
$$

右辺は $(x,y)\in R$ となる $y\in Y$ の存在と同値である。全称量化についても

$$
x\in\forall_\pi R
\iff \{x\}\times Y\subseteq R
$$

であり、右辺は各 $y\in Y$ について $(x,y)\in R$ であることと同値である。
<!-- proof-end -->

第1節の $R$ では $a,b$ の行に少なくとも一つ成立する組があり、$a$ の行だけ全て成立する。$Y=\varnothing$ に変えると $X\times Y=\varnothing$、$R=\varnothing$ なので

$$
\exists_\pi R=\varnothing,\qquad \forall_\pi R=X.
$$

ここで型 $X$ が空になるわけではない。$y$ の候補だけがなくなる。

## 5. 随伴から推論の向きを読む

量化の前後でどの不等式が成立するかを確認する。これによって、量化後にどの情報が保存されるかが分かる。

随伴 $L\dashv R$ の [単位](../../CAT/CAT2-09/index.md#def-cat2-09-unit) と [余単位](../../CAT/CAT2-09/index.md#def-cat2-09-counit) は、恒等射を随伴対応で移した射から作られる。半順序圏では射の存在が不等式を表すので、単位の成分は $P\le RLP$、余単位の成分は $LRQ\le Q$ となる。ここで $P$ は $L$ の定義域の元、$Q$ は $R$ の定義域の元である。$\exists_f\dashv f^*$ と $f^*\dashv\forall_f$ の二つの随伴があるため、合計四つの不等式が得られる。

<a id="prop-catb6-02-quantifier-rules"></a>

<!-- formal-statement-start -->
> **命題（量化子の単位と余単位）**
>
> 局所小な初等トポスの射 $f:U\to V$ と部分対象 $A$（$U$ 上）、$B$（$V$ 上）について次が成り立つ。

$$
A\le f^*\exists_f A,\qquad \exists_f f^*B\le B,
$$

$$
B\le\forall_f f^*B,\qquad f^*\forall_f A\le A.
$$
<!-- formal-statement-end -->

見取り図：随伴の同値の一方を反射律によって真にすれば、他方に欲しい不等式が現れる。

<!-- proof-start -->
### 証明

[射に沿う量化子](#def-catb6-02-quantifiers)の左随伴条件に $B=\exists_f A$ を代入する。左辺は $\exists_f A\le\exists_f A$ なので、右辺 $A\le f^*\exists_f A$ が成立する。

同じ条件に $A=f^*B$ を代入すると、右辺 $f^*B\le f^*B$ が成立するため、左辺 $\exists_f f^*B\le B$ を得る。

右随伴条件に $A=f^*B$ を代入すると、左辺 $f^*B\le f^*B$ より右辺 $B\le\forall_f f^*B$ が成立する。最後に $B=\forall_f A$ を代入すれば、右辺 $\forall_f A\le\forall_f A$ より左辺 $f^*\forall_f A\le A$ が成立する。
<!-- proof-end -->

射影の場合、最初の不等式は具体的な証人 $y$ が得られれば存在量化を主張できることを表す。最後の不等式は全称量化が成立すれば、任意の $y$ に対して元の述語が成立することを表す。

逆に $\forall_f A\le\exists_f A$ は一般には成立しない。第2節では $\forall_f A=\{c\}$ と $\exists_f A=\{a\}$ であり、$c$ が反例になる。集合の場合、各ファイバーが空でないことは $\forall_f A\subseteq\exists_f A$ の必要十分条件である。空のファイバーがあれば、その点はどの $A$ に対しても全称量化には属するが存在量化には属さない。逆にファイバーが空でなく $A$ に含まれれば、少なくとも一つの元が $A$ に属するからである。

## 6. 二つの変数を順に消す

さらに $g:V\to W$ があるとき、$U$ 上の述語を一度に $W$ へ送る方法と、$V$ を経由する方法を比較する。随伴の一意性を使えば、余分な計算をせずに比較できる。

<a id="thm-catb6-02-quantifier-composition"></a>

<!-- formal-statement-start -->
> **定理（量化子の合成）**
>
> 局所小な初等トポスの射 $f:U\to V$、$g:V\to W$ に対して、次が順序関手の等式として成立する。

$$
\exists_{gf}=\exists_g\exists_f,\qquad
\forall_{gf}=\forall_g\forall_f.
$$
<!-- formal-statement-end -->

見取り図：[部分対象の逆像の合成則](../CATB4-07/index.md#thm-catb4-07-inverse-image)により、合成射の逆像は逆順に合成する。包含の同値を一段ずつ適用することで、合成量化子が要求される随伴条件を満たす。

<!-- proof-start -->
### 証明

$C\in\operatorname{Sub}(W)$ の代表モノ射を $c:C_0\to W$ とする。[部分対象の逆像の合成則](../CATB4-07/index.md#thm-catb4-07-inverse-image)を適用する。初等トポスには引き戻しが存在し、部分対象順序は第1節で確認したように集合なので、この定理の仮定を満たす。

具体的には $c$ を $g$ で引き戻した射を $r:Q\to V,\ s:Q\to C_0$、さらに $r$ を $f$ で引き戻した射を $p:P\to U,\ t:P\to Q$ とする。可換条件は $gr=cs$ と $fp=rt$ だから、

$$
gfp=grt=cst.
$$

任意の $u:T\to U,\ z:T\to C_0$ が $gfu=cz$ を満たすとき、最初の引き戻しから $rv=fu,\ sv=z$ を満たす唯一の $v:T\to Q$ が得られる。次の引き戻しから $ph=u,\ th=v$ を満たす唯一の $h:T\to P$ が得られ、$sth=z$ である。

別の $h':T\to P$ が $ph'=u,\ sth'=z$ を満たすとすれば $rth'=fph'=fu$ なので、第一の普遍性から $th'=v$、第二の普遍性から $h'=h$ となる。このように二段の引き戻しは合成射 $gf$ の [引き戻しの普遍性](../../CAT/CAT2-03/index.md#def-cat2-03-pullback) を満たす。従って部分対象の同型類として

$$
(gf)^*C=f^*g^*C
$$

となる。

任意の $A\in\operatorname{Sub}(U)$ に対し、[量化子の定義](#def-catb6-02-quantifiers)を $g,f$ の順に使う。

$$
\begin{aligned}
\exists_g\exists_f A\le C
&\iff \exists_f A\le g^*C\\
&\iff A\le f^*g^*C\\
&\iff A\le(gf)^*C.
\end{aligned}
$$

従って $\exists_g\exists_f$ は $(gf)^*$ の左随伴である。右随伴については

$$
\begin{aligned}
C\le\forall_g\forall_f A
&\iff g^*C\le\forall_f A\\
&\iff f^*g^*C\le A\\
&\iff(gf)^*C\le A.
\end{aligned}
$$

従って $\forall_g\forall_f$ は $(gf)^*$ の右随伴である。[量化子の存在](#thm-catb6-02-quantifier-existence)と順序随伴の値の一意性によって、どちらも所望の等式が従う。
<!-- proof-end -->

例えば $(X\times Y)\times Z\to X\times Y\to X$ の射影を順に取れば、存在量化を二度行うことは組 $(y,z)$ を一度に存在量化することと一致する。全称量化についても同じである。しかし異なる種類の量化を交換できるわけではない。

$Y=Z=\{0,1\}$ で $R(y,z)$ を $y=z$ とする。各 $y$ に対して $z=y$ を選べるので、次は真である。

$$
\forall y\,\exists z\,R(y,z).
$$

一つの $z$ が $0,1$ の両方に等しいことはないため、次は偽である。

$$
\exists z\,\forall y\,R(y,z).
$$

前者の証人は $y$ に依存してよいが、後者では同じ証人を使う必要がある。

## 7. 演習

### CATB6-02-A01 ファイバーごとの判定

- Level: A

集合 $U=\{1,2,3,4\}$、$V=\{a,b,c\}$ とし、$f(1)=f(2)=a$、$f(3)=f(4)=b$、$A=\{1,3,4\}$ とする。両量化子の値を求めよ。

<!-- solution-start -->
**詳細解答**

[射に沿う量化子の集合例](#def-catb6-02-quantifiers)に従い、三つのファイバーを列挙する。

$$
f^{-1}(\{a\})=\{1,2\},\quad f^{-1}(\{b\})=\{3,4\},
\quad f^{-1}(\{c\})=\varnothing.
$$

$A$ との共通部分は順に $\{1\},\{3,4\},\varnothing$。全体が $A$ に含まれるのは第二と第三だけである。従って

$$
\exists_f A=\{a,b\},\qquad \forall_f A=\{b,c\}.
$$
<!-- solution-end -->

### CATB6-02-A02 随伴の両側を確認する

- Level: A

A01 と同じ $f,A$ について $B=\{b,c\}$ とする。二つの随伴同値の左右の真偽をそれぞれ確認せよ。

<!-- solution-start -->
**詳細解答**

$f^*B=\{3,4\}$ である。左随伴条件の左辺 $\{a,b\}\subseteq\{b,c\}$ は $a$ のため偽。右辺 $\{1,3,4\}\subseteq\{3,4\}$ も $1$ のため偽である。

右随伴条件の左辺 $\{3,4\}\subseteq\{1,3,4\}$ は真。右辺 $\{b,c\}\subseteq\{b,c\}$ も真である。従って[量化子の二つの同値](#def-catb6-02-quantifiers)はこの入力でどちらも成立する。
<!-- solution-end -->

### CATB6-02-A03 自由変数と型

- Level: A

$X=\{a,b\}$、$Y=\{0,1,2\}$ とし、$R=\{(a,0),(a,1),(b,0),(b,1),(b,2)\}$ とする。$y$ を量化した二述語の型と成立域、およびそれらの射影による逆像を求めよ。

<!-- solution-start -->
**詳細解答**

[集合の射影量化](#prop-catb6-02-projection-quantification)によれば、$y$ は束縛変数で $x$ が自由変数として残る。従って型はどちらも $X$ 上の部分対象である。$a$ には二つの証人、$b$ には三つの証人がある。全ての $y$ で成立するのは $b$ だけなので

$$
\exists_\pi R=\{a,b\},\qquad \forall_\pi R=\{b\}.
$$

逆像は $Y$ の全候補を付け加える操作だから

$$
\pi^*\exists_\pi R=X\times Y,\qquad
\pi^*\forall_\pi R=\{b\}\times Y.
$$

前者には $(a,2)$ も加わるが、後者は全て $R$ に含まれる。
<!-- solution-end -->

### CATB6-02-A04 空の型

- Level: A

空集合から一元集合 $V=\{v\}$ への唯一の写像 $f:\varnothing\to V$ を考える。唯一の部分集合 $A=\varnothing$ に対する量化子と、$B=V$ に対する逆像を求めよ。全称から存在を導けるか。

<!-- solution-start -->
**詳細解答**

唯一のファイバーは空集合なので $A$ と交わらず、しかし $A$ には含まれる。[集合の量化子](#def-catb6-02-quantifiers)から

$$
\exists_f A=\varnothing,\quad \forall_f A=V,\quad f^*V=\varnothing.
$$

従って $\forall_f A\not\subseteq\exists_f A$。$v$ について全称量化は真でも存在量化は偽である。
<!-- solution-end -->

### CATB6-02-B01 単位と余単位から等式を導く

- Level: B

任意の初等トポスの射 $f:U\to V$ と $A\in\operatorname{Sub}(U)$ に対して

$$
\exists_f f^*\exists_f A=\exists_f A,\qquad
\forall_f f^*\forall_f A=\forall_f A
$$

を示せ。局所小性を仮定する。

<!-- solution-start -->
**詳細解答**

[量化子の単位と余単位](#prop-catb6-02-quantifier-rules)から $A\le f^*\exists_f A$。左随伴は順序を保つため

$$
\exists_f A\le\exists_f f^*\exists_f A.
$$

一方、同命題の第二の不等式に $B=\exists_f A$ を代入すると

$$
\exists_f f^*\exists_f A\le\exists_f A.
$$

両向きの包含から第一の等式が得られる。

第四の不等式 $f^*\forall_f A\le A$ に順序を保つ $\forall_f$ を適用すると

$$
\forall_f f^*\forall_f A\le\forall_f A.
$$

第三の不等式に $B=\forall_f A$ を代入すると逆向きの包含が得られ、第二の等式も成立する。
<!-- solution-end -->

### CATB6-02-B02 全射と全称量化

- Level: B

集合の写像 $f:U\to V$ について、次の三条件が同値であることを示せ。

1. $f$ は全射である。
2. 任意の $B\subseteq V$ で $\exists_f f^*B=B$。
3. 任意の $B\subseteq V$ で $\forall_f f^*B=B$。

<!-- solution-start -->
**詳細解答**

[集合の量化子](#def-catb6-02-quantifiers)を用いる。$v\in V$ のファイバーを $U_v$ と置く。$v\in B$ なら $U_v\subseteq f^*B$ であり、$v\notin B$ なら $U_v\cap f^*B=\varnothing$。

全射なら各 $U_v$ は空でない。従って $U_v\cap f^*B$ が空でないことと $v\in B$ が同値である。また $U_v\subseteq f^*B$ であることも $v\in B$ と同値である。これで条件1から2、3が従う。

条件2を仮定し $B=V$ と置く。$f^*V=U$ だから $\exists_f U=V$ となり、全てのファイバーが空でない。

条件3を仮定し $B=\varnothing$ と置く。$f^*B=\varnothing$ なので $\forall_f\varnothing=\varnothing$。左辺は空ファイバーを持つ点の集合であるから、空ファイバーは存在しない。これで条件2、3のそれぞれから1が従った。
<!-- solution-end -->

### CATB6-02-B03 全称量化と連言

- Level: B

局所小な初等トポスの射 $f:U\to V$ と $A,A'\in\operatorname{Sub}(U)$ に対して

$$
\forall_f(A\wedge A')=\forall_f A\wedge\forall_f A'
$$

を示せ。ここで $\wedge$ は部分対象の最大下界である。

<!-- solution-start -->
**詳細解答**

任意の $B\in\operatorname{Sub}(V)$ を取る。[量化子の右随伴条件](#def-catb6-02-quantifiers)と[部分対象の最大下界の性質](../CATB6-01/index.md#prop-catb6-01-subobject-meet)を適用すると

$$
\begin{aligned}
B\le\forall_f(A\wedge A')
&\iff f^*B\le A\wedge A'\\
&\iff f^*B\le A,\ f^*B\le A'\\
&\iff B\le\forall_f A,\ B\le\forall_f A'\\
&\iff B\le\forall_f A\wedge\forall_f A'.
\end{aligned}
$$

この同値に $B=\forall_f(A\wedge A')$ を代入すれば左の部分対象が右以下、$B=\forall_f A\wedge\forall_f A'$ を代入すれば右が左以下である。反対称性から等式が従う。
<!-- solution-end -->

### CATB6-02-B04 合成量化を二通りで計算する

- Level: B

集合 $U=\{1,2,3\}$、$V=\{a,b,c\}$、$W=\{p,q,r\}$ とする。写像 $f:U\to V$ は $f(1)=f(2)=a$、$f(3)=b$、写像 $g:V\to W$ は $g(a)=g(c)=p$、$g(b)=q$ で定める。$A=\{1,2\}$ とする。両量化子について、合成射に沿う一段の計算と二段の計算が一致することを確かめよ。

<!-- solution-start -->
**詳細解答**

[射に沿う量化子](#def-catb6-02-quantifiers)の集合例に従う。$f$ のファイバーは $\{1,2\},\{3\},\varnothing$ である。$A$ と交わるのは $a$ のファイバーだけであり、$A$ に含まれるのは $a,c$ のファイバーである。

$$
\exists_f A=\{a\},\qquad\forall_f A=\{a,c\}.
$$

次に $g$ のファイバーを $p,q,r$ の順に並べると $\{a,c\},\{b\},\varnothing$ となる。$\{a\}$ と交わるのは第一のファイバーだけであり、$\{a,c\}$ に含まれるのは第一と第三である。従って

$$
\exists_g\exists_f A=\{p\},\qquad
\forall_g\forall_f A=\{p,r\}.
$$

一段の計算では $gf(1)=gf(2)=p$、$gf(3)=q$ なので、合成射のファイバーは $\{1,2\},\{3\},\varnothing$ である。$A$ と交わるのは第一だけ、$A$ に含まれるのは第一と第三である。

$$
\exists_{gf}A=\{p\},\qquad\forall_{gf}A=\{p,r\}.
$$

よって[量化子の合成](#thm-catb6-02-quantifier-composition)の二つの等式を確認した。途中の $c$ の空ファイバーを全称量化で除外してしまうと、第二段で $p$ が誤って除外される。
<!-- solution-end -->

### CATB6-02-C01 量化の順序と証人の依存

- Level: C

$X=Y=Z=\{0,1\}$ とし、三変数述語を

$$
R(x,y,z)\iff z=x+y\pmod 2
$$

で定める。

(1) $(X\times Y)\times Z\to X\times Y\to X$ の射影に沿って、先に $z$ を存在量化し、次に $y$ を全称量化せよ。各段階の部分対象を求めよ。

(2) 先に $y$ を全称量化し、次に $z$ を存在量化せよ。各段階の型と部分対象を求めよ。

(3) (1) と (2) の結果が異なる理由を述べよ。

<!-- solution-start -->
**詳細解答**

(1) $z$ を忘れる射影に[集合の射影量化](#prop-catb6-02-projection-quantification)を適用する。$(x,y)=(0,0),(0,1),(1,0),(1,1)$ の証人は順に $0,1,1,0$ である。全ての組に証人があるため、最初の量化結果は $X\times Y$ 上の全体である。

次に $X\times Y\to X$ に沿う全称量化を取る。$x=0$ の場合も $x=1$ の場合も、二つの $y$ が両方ともその全体部分対象に入る。従って

$$
\{x\in X\mid\forall y\in Y,\ \exists z\in Z,\ R(x,y,z)\}=X.
$$

(2) 今度は $y$ を忘れる写像 $q:(X\times Y)\times Z\to X\times Z$ に沿う全称量化を取る。ここで $q((x,y),z)=(x,z)$ と定め、三つ組の略記 $(x,y,z)$ は $((x,y),z)$ を表す。結果は $X\times Z$ の部分対象である。

[量化子の集合例](#def-catb6-02-quantifiers)に従うと、固定した $(x,z)$ のファイバーは

$$
q^{-1}(\{(x,z)\})=\{((x,y),z)\mid y\in Y\}.
$$

この全体が $R$ に含まれるかを調べる。

二つの $y$ の値に対応する条件は次のとおりである。

$$
y=0:\ z=x,\qquad y=1:\ z=1-x.
$$

$x=0,1$ のどちらでも $x\ne1-x$ なので、両方を満たす $z$ は存在しない。第一段階は空集合である。

次の写像 $X\times Z\to X$ に沿って存在量化する。どの $x$ についても空集合には証人がないので

$$
\{x\in X\mid\exists z\in Z,\ \forall y\in Y,\ R(x,y,z)\}
=\varnothing.
$$

(3) (1) の証人 $z$ は各 $x,y$ に依存して選んでよい。(2) では $x$ を固定した後の一つの $z$ が全ての $y$ に通用する必要がある。この条件の違いが全体と空集合という差を生む。[量化子の合成](#thm-catb6-02-quantifier-composition)は同種の量化子をまとめる結果であり、異種の量化子の交換を保証しない。
<!-- solution-end -->

## 8. まとめ

- 述語を部分対象とみなすと、逆像は変数の代入や不要な変数の追加を表す。
- 存在量化は逆像の左随伴、全称量化は右随伴である。初等トポスでは像とファイバー包含条件によって両者を構成できる。
- 射影に沿う量化は変数を束縛し、残った変数の型の上に述語を作る。
- 空ファイバー、随伴の不等式、同種の量化子の合成は、量化の推論を正確に扱うために重要である。

次の講義では、変数の代入と量化の順序を変えたときに結果が一致する条件、および連言と存在量化を交換できる条件を調べる。
