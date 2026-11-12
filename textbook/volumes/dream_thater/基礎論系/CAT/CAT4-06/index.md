# CAT4-06 型付きラムダ計算の圏論的意味

## 1. プログラムの式と射はどう結び付くか

前講では、[Cartesian閉圏](../CAT4-05/index.md#def-cat4-05-cartesian-closed)で、二引数の射を一引数の射へ移す[評価とカリー化](../CAT4-05/index.md#thm-cat4-05-evaluation-curry)を学んだ。集合上の関数 $f(x,a)$ に対する $x\mapsto(a\mapsto f(x,a))$ は、その一例だった。

プログラムでも、変数を受け取る式から関数を作り、その関数に実引数を渡す。しかし「関数を作って直ちに適用する」操作が元の式への変数の代入と等しいのはなぜか。さらに、引数を取り出して直ちに関数を作り直しても、元の関数と同じなのはなぜか。これらを型付きの構文と圏論の両方で確認する。

この章では基底型を一種類 $\mathsf o$ に絞った**型付きラムダ計算**を扱う。型付き項の等式には外延的な $\beta\eta$ 則を採用する。計算の停止性や型推論アルゴリズムを仮定しない。一般の圏の射の合成は右から左へ読む。

## 2. 型・文脈・項を作る

### 2.1 型は積と関数型で組み立てる

型は「式がどの種類の値を表すか」を示す記号である。$1$ は値を一つだけ持つ単位型、$A\times B$ は対の型、$A\Rightarrow B$ は $A$ を受けて $B$ を返す関数型を表す。ここでは $\mathsf o$ を基底型とし、他の型を有限回の構成で作る。

<a id="def-cat4-06-simple-types"></a>

<!-- formal-statement-start -->
> **定義（単純型）**  
> 型の集合 $\mathrm{Ty}$ を、記号 $\mathsf o,1$ を含み、$A,B\in\mathrm{Ty}$ なら $A\times B$ と $A\Rightarrow B$ も含む最小の集合とする。構文規則は次のとおりである。

$$
A,B::=\mathsf o\mid 1\mid A\times B\mid A\Rightarrow B.
$$

> 括弧を省くとき、$\Rightarrow$ は右結合とする。
<!-- formal-statement-end -->

<!-- definition-example-start: def-cat4-06-simple-types -->
**定義の確認。** $\mathsf o$ は出発記号なので型である。これに関数型の構成規則を二度使えば $\mathsf o\Rightarrow(\mathsf o\Rightarrow\mathsf o)$ も型になる。一方、$\mathsf o\Rightarrow$ は右側の型がないので構文規則から作れない。$A\Rightarrow B$ の括弧は、$(A\Rightarrow B)\Rightarrow C$ と $A\Rightarrow(B\Rightarrow C)$ を区別する。
<!-- definition-example-end -->

### 2.2 文脈と型付け

「$x$ が型 $A$ の変数である」という仮定を並べた有限列を**文脈** $\Gamma$ と呼ぶ。文脈の変数名は重複させない。$\Gamma\vdash t:A$ は、文脈中の仮定の下で項 $t$ が型 $A$ を持つ、という判定を意味する。ラムダ抽象 $\lambda x:A.t$ では、変数 $x$ は関数の引数として束縛される。束縛変数名だけを変えた式は同じ構文として扱う（$\alpha$ 変換）。

<a id="def-cat4-06-typing"></a>

<!-- formal-statement-start -->
> **定義（単純型付き項と型付け）**  
> 文脈 $\Gamma$ は相異なる変数への型宣言の有限列である。型付き項 $\Gamma\vdash t:A$ は、次の規則を有限回適用して得られるものとする。$\Gamma,x:A$ では $x$ を新しい変数名とする。

$$
\frac{x:A\in\Gamma}{\Gamma\vdash x:A}
\qquad
\frac{}{\Gamma\vdash *:1}
$$

$$
\frac{\Gamma\vdash u:A\quad\Gamma\vdash v:B}
{\Gamma\vdash\langle u,v\rangle:A\times B}
\qquad
\frac{\Gamma\vdash p:A\times B}{\Gamma\vdash\pi_1p:A}
\qquad
\frac{\Gamma\vdash p:A\times B}{\Gamma\vdash\pi_2p:B}
$$

$$
\frac{\Gamma,x:A\vdash t:B}
{\Gamma\vdash\lambda x:A.t:A\Rightarrow B}
\qquad
\frac{\Gamma\vdash f:A\Rightarrow B\quad\Gamma\vdash u:A}
{\Gamma\vdash f\,u:B}.
$$
<!-- formal-statement-end -->

<!-- definition-example-start: def-cat4-06-typing -->
**定義の確認。** $\Gamma=(x:A)$ とし、新しい $y:B$ を加える。変数規則から $\Gamma,y:B\vdash x:A$、単位項規則から $\Gamma,y:B\vdash *:1$、対の規則から $\Gamma,y:B\vdash\langle x,*\rangle:A\times1$ を得る。最後に抽象規則を適用して

$$
x:A\vdash\lambda y:B.\langle x,*\rangle:B\Rightarrow(A\times1)
$$

が導出される。ここでは $y$ が実際に使われなくても抽象できる。一方、$x:A\vdash x\,x:B$ は一般には導出できない。関数として適用する項の型と実引数の型を一致させる規則がないからである。
<!-- definition-example-end -->

## 3. 変数を代入するときに何を守るか

項の中の自由変数 $x$ を、同じ型を持つ項 $u$ で置き換える操作が代入である。注意点は、代入先のラムダ抽象に束縛された変数が、$u$ の自由変数を新たに捕まえてはいけないことだ。その場合は先に束縛変数を新鮮な名前へ $\alpha$ 変換する。

<a id="def-cat4-06-substitution"></a>

<!-- formal-statement-start -->
> **定義（捕獲を避ける同時代入）**  
> 文脈 $\Gamma$ と $\Delta$ を取る。$\Gamma$ の宣言を次のように並べる。

$
\Gamma=(x_1:A_1,\ldots,x_n:A_n).
$

> 各変数に対し、$\Delta$ で次の型付き項が与えられたとする。

$
\Delta\vdash s_i:A_i\qquad(i=1,\ldots,n).
$

> この列を $\sigma:\Delta\Rightarrow\Gamma$ と記す。$\Gamma\vdash t:B$ の自由変数を対応する $s_i$ に同時に置き換え、束縛変数の捕獲を $\alpha$ 変換で避けた項を $t[\sigma]$ とする。結果は次の型を持つ。

$
\Delta\vdash t[\sigma]:B.
$
<!-- formal-statement-end -->

<!-- definition-example-start: def-cat4-06-substitution -->
**定義の確認。** $x,y:\mathsf o$ の名前を区別し、$x:\mathsf o\vdash\lambda y:\mathsf o.x:\mathsf o\Rightarrow\mathsf o$ とする。$x$ に自由変数 $y$ を代入する場合、先に束縛側の $y$ を新しい $z$ に改名する。

$$
(\lambda y:\mathsf o.x)[x:=y]
=_{\alpha}\lambda z:\mathsf o.y.
$$

$y$ を改名せず $\lambda y:\mathsf o.y$ とすると、代入する項の自由変数が束縛され、意味が変わってしまう。新しい結果は文脈 $y:\mathsf o$ で型 $\mathsf o\Rightarrow\mathsf o$ を持つ。
<!-- definition-example-end -->

単一の代入 $t[u/x]$ は、$x$ だけを $u$ に置き換える同時代入の略記である。$x$ 以外の自由変数はそのまま残す。$\Gamma,x:A\vdash t:B$、$\Gamma\vdash u:A$ なら、$t[u/x]$ は $\Gamma$ で型 $B$ を持つ。

### 3.1 計算の等号：$\beta$ 則と $\eta$ 則

対を作って成分を取れば元の成分に戻る。関数を作って適用すれば、引数を代入した結果になる。反対方向には、対を二つの射影から再構成でき、関数を「新しい引数へ適用して再抽象」しても同じになる。この後半が外延性を表す $\eta$ 則である。

<a id="def-cat4-06-beta-eta"></a>

<!-- formal-statement-start -->
> **定義（外延的βη等式理論）**  
> 上の型付き項の間の等号 $\equiv_{\beta\eta}$ を、$\alpha$ 変換を同一視し、以下の等式を含み、反射律・対称律・推移律、項の各構成子についての合同律、型の合う代入についての合同律で閉じた最小の等式関係とする。すべての式は型の合う文脈で解釈し、関数 $\eta$ 則の $x$ は $f$ に自由に現れない新しい変数とする。

$$
\begin{aligned}
\pi_1\langle u,v\rangle&\equiv_{\beta\eta}u,&
\pi_2\langle u,v\rangle&\equiv_{\beta\eta}v,\\
\langle\pi_1p,\pi_2p\rangle&\equiv_{\beta\eta}p,&
(\lambda x:A.t)\,u&\equiv_{\beta\eta}t[u/x],\\
\lambda x:A.(f\,x)&\equiv_{\beta\eta}f,&
w&\equiv_{\beta\eta}*\quad(w:1).
\end{aligned}
$$
<!-- formal-statement-end -->

<!-- definition-example-start: def-cat4-06-beta-eta -->
**定義の確認。** $x:A$ の文脈で $\lambda y:B.x:B\Rightarrow A$ と $v:B$ が与えられると、関数 $\beta$ 則から $(\lambda y:B.x)\,v\equiv_{\beta\eta}x$。他方、$f:A\Rightarrow B$ を変数に持つ文脈では、新しい $y:A$ を使って $\lambda y:A.f\,y\equiv_{\beta\eta}f$。前者は代入の計算、後者は関数を全入力で観察したときの外延的同一性であり、向きが異なる。
<!-- definition-example-end -->

## 4. 文脈を積、項を射として読む

[終対象と二項積](../CAT2-02/index.md#def-cat2-02-binary-product)のある圏では、変数に値を与える環境を積の対象として扱える。さらに[指数対象](../CAT4-05/index.md#def-cat4-05-exponential)がすべて存在すれば、ラムダ抽象と適用を射として翻訳できる。

<a id="def-cat4-06-denotation"></a>

<!-- formal-statement-start -->
> **定義（Cartesian閉圏における項の解釈）**  
> 局所小Cartesian閉圏 $\mathcal C$ で終対象 $1_{\mathcal C}$、二項積、指数対象をそれぞれ選び、基底型 $\mathsf o$ に対象 $O$ を割り当てる。型の解釈を帰納的に

$$
\begin{aligned}
\llbracket\mathsf o\rrbracket&=O,&
\llbracket1\rrbracket&=1_{\mathcal C},\\
\llbracket A\times B\rrbracket&=\llbracket A\rrbracket\times\llbracket B\rrbracket,&
\llbracket A\Rightarrow B\rrbracket&=\llbracket B\rrbracket^{\llbracket A\rrbracket}
\end{aligned}
$$

> で定める。文脈は $\llbracket\varnothing\rrbracket=1_{\mathcal C}$ と $\llbracket\Gamma,x:A\rrbracket=\llbracket\Gamma\rrbracket\times\llbracket A\rrbracket$ で解釈する。各導出 $\Gamma\vdash t:A$ の解釈は射 $\llbracket t\rrbracket_\Gamma:\llbracket\Gamma\rrbracket\to\llbracket A\rrbracket$ であり、変数は積の対応する射影、単位項は終対象への一意な射、対と射影は積の普遍性、抽象と適用は次の式で帰納的に定める。

$$
\begin{aligned}
\llbracket\lambda x:A.t\rrbracket_\Gamma
&=\Lambda(\llbracket t\rrbracket_{\Gamma,x:A}),\\
\llbracket f\,u\rrbracket_\Gamma
&=\operatorname{ev}\circ
\langle\llbracket f\rrbracket_\Gamma,\llbracket u\rrbracket_\Gamma\rangle.
\end{aligned}
$$
<!-- formal-statement-end -->

ここで $\Lambda$ は[指数対象のカリー化](../CAT4-05/index.md#thm-cat4-05-evaluation-curry)であり、$\operatorname{ev}:B^A\times A\to B$ は対応する評価射である。文脈が右へ伸びるたびに右側の変数の射影は $\pi_2$、以前の変数の射影にはさらに $\pi_1$ を前合成する。$1_{\mathcal C}\times A$ と $A$ は通常等号でなく正準同型で結ばれる点にも注意する。

<!-- definition-example-start: def-cat4-06-denotation -->
**定義の確認（集合の二値型）。** $\mathcal C=\mathbf{Set}$、$O=\{0,1\}$ と置く。閉じた項

$$
k=\lambda x:\mathsf o.\lambda y:\mathsf o.x
$$

は型 $\mathsf o\Rightarrow(\mathsf o\Rightarrow\mathsf o)$ を持つ。内側の文脈は $1\times O\times O$（左から順に括弧を付ける）であり、$x$ の射は $\pi_2\pi_1$、$y$ の射は $\pi_2$ である。$x$ の射をまず $y$ についてカリー化し、さらに $x$ についてカリー化するため、

$$
\llbracket k\rrbracket(*)(a)(b)=a
\qquad(a,b\in O).
$$

例えば $a=1,b=0$ なら結果は $1$。型の翻訳、文脈の射影、二回のカリー化、評価の等式をそれぞれ直接確認できた。
<!-- definition-example-end -->

### 4.1 すべての型付き項に射が割り当てられる

<a id="prop-cat4-06-well-typed"></a>

<!-- formal-statement-start -->
> **命題（型付けと射の型の一致）**  
> 上で指定したCartesian閉圏 $\mathcal C$ と基底対象 $O$ の下で、すべての型付け導出 $\Gamma\vdash t:A$ に対し、定義で与えた $\llbracket t\rrbracket_\Gamma$ は始域 $\llbracket\Gamma\rrbracket$、終域 $\llbracket A\rrbracket$ の射として定まる。
<!-- formal-statement-end -->

### 証明の見取り図

構文の最後に使った規則ごとに確かめる。ラムダ抽象の前では文脈が一つ長くなり、始域は $\llbracket\Gamma\rrbracket\times\llbracket A\rrbracket$。その射をカリー化できることが核心である。

<!-- proof-start -->
### 証明

導出の長さに関する帰納法を行う。変数については積の射影を必要な回数合成し、$*$ については終対象への一意な射を取るため、始域と終域が合う。対の場合は帰納法で $u:X\to A$、$v:X\to B$ が得られ、[二項積の普遍性](../CAT2-02/index.md#def-cat2-02-binary-product)から $\langle u,v\rangle:X\to A\times B$ が存在する。射影の場合は $\pi_i$ を後合成すればよい。

抽象の場合、帰納法で

$$
f=\llbracket t\rrbracket_{\Gamma,x:A}:
\llbracket\Gamma\rrbracket\times\llbracket A\rrbracket\to\llbracket B\rrbracket
$$

が定まる。Cartesian閉性から $\Lambda(f):\llbracket\Gamma\rrbracket\to\llbracket B\rrbracket^{\llbracket A\rrbracket}$ が存在するので、抽象の型に一致する。適用の場合は帰納法から $g:X\to B^A$、$u:X\to A$ が得られ、$\langle g,u\rangle:X\to B^A\times A$ と評価射 $B^A\times A\to B$ を合成できる。これですべての規則を尽くした。
<!-- proof-end -->

## 5. 置換はなぜ射の合成になるか

項の等号を圏の中で検証するには、構文的な代入を射の合成に置き換える補題が必要である。$\sigma=(s_1,\dots,s_n):\Delta\Rightarrow\Gamma$ について、各項の解釈を積に束ねた射を $\llbracket\sigma\rrbracket:\llbracket\Delta\rrbracket\to\llbracket\Gamma\rrbracket$ とする。$\Gamma$ が空なら終対象への唯一の射、末尾へ $x:A$ を加える場合は既存の射と $\llbracket s\rrbracket$ を対にすることで帰納的に作る。

<a id="lem-cat4-06-substitution"></a>

<!-- formal-statement-start -->
> **補題（置換補題）**  
> Cartesian閉圏 $\mathcal C$、基底対象の割当て、文脈 $\Gamma,\Delta$、型付き同時代入 $\sigma:\Delta\Rightarrow\Gamma$、項 $\Gamma\vdash t:B$ を取る。捕獲を避ける代入の解釈は次を満たす。

$$
\llbracket t[\sigma]\rrbracket_\Delta
=\llbracket t\rrbracket_\Gamma\circ\llbracket\sigma\rrbracket.
$$
<!-- formal-statement-end -->

### 証明の見取り図

変数と対は積の普遍性で直ちに追える。抽象では、新しい束縛変数を同時代入の対象から除く。$\llbracket\sigma\rrbracket$ を $A$ に関する恒等射と積にしたものが、ラムダの内部を解釈する文脈写像になる。ここでカリー化の自然性を使う。

<!-- proof-start -->
### 証明

型付き項 $t$ の構成について帰納法を行う。変数 $x_i$ では $\llbracket x_i\rrbracket_\Gamma$ は第 $i$ 射影なので、$\llbracket x_i\rrbracket_\Gamma\llbracket\sigma\rrbracket=\llbracket s_i\rrbracket_\Delta$ が、対による $\llbracket\sigma\rrbracket$ の定義から成立する。$*$ では終対象への射の一意性から等しい。対では帰納法と[組の射の前合成則](../CAT2-02/index.md#prop-cat2-02-pairing-laws)を用いる。

$$
\begin{aligned}
\llbracket\langle u,v\rangle[\sigma]\rrbracket
&=\langle\llbracket u[\sigma]\rrbracket,\llbracket v[\sigma]\rrbracket\rangle\\
&=\langle\llbracket u\rrbracket\llbracket\sigma\rrbracket,
\llbracket v\rrbracket\llbracket\sigma\rrbracket\rangle\\
&=\langle\llbracket u\rrbracket,\llbracket v\rrbracket\rangle\llbracket\sigma\rrbracket.
\end{aligned}
$$

射影については帰納法で得た等式の両辺に $\pi_i$ を後合成する。適用の場合も $\langle-,-\rangle$ の前合成則を使い、

$$
\begin{aligned}
\llbracket(f\,u)[\sigma]\rrbracket
&=\operatorname{ev}\langle
\llbracket f\rrbracket\llbracket\sigma\rrbracket,
\llbracket u\rrbracket\llbracket\sigma\rrbracket\rangle\\
&=\operatorname{ev}\langle\llbracket f\rrbracket,\llbracket u\rrbracket\rangle
\llbracket\sigma\rrbracket.
\end{aligned}
$$

最後に $t=\lambda x:A.v$ とする。$x$ が代入項の自由変数と衝突する場合は、先に $\alpha$ 変換して新鮮な名前にする。$\Delta,x:A$ から $\Gamma,x:A$ への拡張された代入 $\sigma^\uparrow$ は、元の代入項を第一射影で弱化し、最後の $x$ は変えない。その解釈は

$$
\llbracket\sigma^\uparrow\rrbracket
=\langle\llbracket\sigma\rrbracket\pi_1,\pi_2\rangle
=\llbracket\sigma\rrbracket\times1_{\llbracket A\rrbracket}.
$$

ここで右辺の積は二射の直積であり、始域は $\llbracket\Delta\rrbracket\times\llbracket A\rrbracket$、終域は $\llbracket\Gamma\rrbracket\times\llbracket A\rrbracket$。帰納法と[カリー化の自然性](../CAT4-05/index.md#thm-cat4-05-evaluation-curry)から

$$
\begin{aligned}
\llbracket(\lambda x:A.v)[\sigma]\rrbracket_\Delta
&=\Lambda(\llbracket v[\sigma^\uparrow]\rrbracket)\\
&=\Lambda\bigl(\llbracket v\rrbracket
(\llbracket\sigma\rrbracket\times1_{\llbracket A\rrbracket})\bigr)\\
&=\Lambda(\llbracket v\rrbracket)\llbracket\sigma\rrbracket.
\end{aligned}
$$

最後の式は $\operatorname{ev}(\Lambda(f)\times1_A)=f$ と積の前合成則を適用して、両辺を評価へ戻し、転置の一意性で比較すれば得られる。全構文の場合を尽くした。
<!-- proof-end -->

## 6. $\beta\eta$ 則の健全性

構文上の等号が、どのCartesian閉圏でも解釈後に等しい射になることを**健全性**と呼ぶ。「集合の値として等しい」という主張より強く、元を持たない圏にも通用する。

<a id="thm-cat4-06-soundness"></a>

<!-- formal-statement-start -->
> **定理（βη等式の健全性）**  
> 任意の局所小Cartesian閉圏 $\mathcal C$ と基底対象 $O$ について、同じ文脈と型を持つ項 $\Gamma\vdash t,u:A$ が $t\equiv_{\beta\eta}u$ を満たすなら、

$$
\llbracket t\rrbracket_\Gamma=\llbracket u\rrbracket_\Gamma
$$

> が $\operatorname{Hom}_{\mathcal C}(\llbracket\Gamma\rrbracket,\llbracket A\rrbracket)$ で成立する。
<!-- formal-statement-end -->

### 証明の見取り図

$\beta$ は「作ってから使う」、$\eta$ は「使ってから作り直す」。積では射影と組の射の普遍性、関数では評価とカリー化の相互逆性が両方向を保証する。等号の閉包に必要な代入の保存は置換補題で担う。

<!-- proof-start -->
### 証明

まず生成する等式を個別に検証する。$f:X\times A\to B$ を抽象される $t$ の解釈、$a:X\to A$ を引数 $u$ の解釈とする。関数 $\beta$ の左辺は

$$
\operatorname{ev}\langle\Lambda(f),a\rangle
=\operatorname{ev}(\Lambda(f)\times1_A)\langle1_X,a\rangle
=f\langle1_X,a\rangle.
$$

中段では $\langle\Lambda(f),a\rangle=(\Lambda(f)\times1_A)\langle1_X,a\rangle$ を両射影で確認した。[置換補題](#lem-cat4-06-substitution)を $x:=u$ に適用すると、右辺は $\llbracket t[u/x]\rrbracket$ に一致する。

関数 $\eta$ では $\Gamma\vdash g:A\Rightarrow B$、$x$ は新しい変数とする。$\Gamma,x:A$ での $g\,x$ の解釈は

$$
\operatorname{ev}\langle\llbracket g\rrbracket\pi_1,\pi_2\rangle
=\operatorname{ev}(\llbracket g\rrbracket\times1_A).
$$

これを転置すると[カリー化の一意性](../CAT4-05/index.md#thm-cat4-05-evaluation-curry)により $\llbracket g\rrbracket$ に戻る。

対の $\beta$ 則は $\pi_i\langle f,g\rangle=f$ または $g$、対の $\eta$ 則は $\langle\pi_1h,\pi_2h\rangle=h$ で、いずれも[積の基本則](../CAT2-02/index.md#prop-cat2-02-pairing-laws)である。単位型の $\eta$ 則は、任意の $X$ から終対象への射が一つだけであることによる。

最後に、射の等号は反射・対称・推移を保ち、対・射影・適用の各構成子は合成と組の射を用いるため等しい入力を等しい出力へ写す。抽象の場合も転置が全単射なので等しい射の転置は等しい。代入の合同律は[置換補題](#lem-cat4-06-substitution)で等しい射の合成へ移る。$\alpha$ 変換は射影の束縛名に依存しない。したがって等式関係の全生成規則と閉包規則で結論が保たれる。
<!-- proof-end -->

**失敗例の所在。** Cartesian積だけが存在する圏で「関数型」を自由に追加することはできない。[基点付き集合の反例](../CAT4-05/index.md#prop-cat4-05-pointed-not-ccc)では指数対象が一般に存在せず、抽象の解釈を作る段階で止まる。$\beta$ の計算だけを形式的に宣言しても、不足した右随伴を補うことにはならない。

## 7. 構文そのものから圏を作る

圏から項の意味へ進む逆方向として、項の等号だけから圏を構成できる。「射の合成が代入」という見方を定義として採用したとき、圏の公理と閉性を本当に証明できるだろうか。

<a id="def-cat4-06-syntactic-category"></a>

<!-- formal-statement-start -->
> **定義（βη構文圏）**  
> 単純型付きラムダ計算の型を対象とし、対象 $A,B$ の間の射を、一変数の判定 $x:A\vdash t:B$ の項の $\alpha\beta\eta$ 等式類とする。恒等射は $x:A\vdash x:A$、射 $[t]:A\to B$ と $[u]:B\to C$ の合成は $u[t/y]$ の等式類と定める。得られる構造を $\mathcal S$ と書く。
<!-- formal-statement-end -->

**定義の確認。** $A=\mathsf o$ とすると、$x:A\vdash\langle x,*\rangle:A\times1$ は $\mathcal S$ の射 $A\to A\times1$ を表す。その後に第一射影 $z:A\times1\vdash\pi_1z:A$ を合成すると $\pi_1\langle x,*\rangle\equiv_{\beta\eta}x$ だから、$\mathcal S$ の恒等射に一致する。型と合成先が一致することを確かめて初めて射として扱える。

<a id="thm-cat4-06-syntactic-ccc"></a>

<!-- formal-statement-start -->
> **定理（構文圏はCartesian閉圏）**  
> 上で定義した外延的単純型付きラムダ計算の構文圏 $\mathcal S$ は、終対象 $1$ と二項積 $A\times B$ を持ち、任意の $A,B$ の指数対象として $A\Rightarrow B$ を持つ。射の合成は捕獲を避ける代入で与えられ、これらの普遍性は型付き $\beta\eta$ 等式から従う。
<!-- formal-statement-end -->

### 証明の見取り図

代入の結合性が圏の結合律を作る。対の $\beta$ 則が積への射の存在、$\eta$ 則が一意性を保証する。関数の $\beta$ 則が転置後の評価を元の射へ戻し、関数の $\eta$ 則が転置の一意性を保証する。

<!-- proof-start -->
### 証明

**圏の公理。** 型の合う代入を二回実施した結果と、代入項を先に代入してから一回実施した結果は、$\alpha$ 変換を除いて一致する。三つの型付き項を順に合成する場合、その主張は

$
v[u/z][t/y]\equiv_\alpha v[u[t/y]/z]
$

という代入の結合性である。変数の項なら代入先を追うことで確かめられる。対・射影・適用では帰納法を部分項に適用し、抽象では束縛名を代入項の自由変数から避けて改名してから、内部の項に帰納法を適用する。これで合成の結合律が従う。

恒等代入は変数の像を変えず、単一変数への代入は元の項を再現するため、左右単位律が成立する。また、等式理論は代入に関する合同律で閉じているから、代表元を取り替えても合成の等式類は変わらない。

**終対象。** 任意の $x:A\vdash t:1$ は単位型の $\eta$ 則により $t\equiv_{\beta\eta}*$。従って $A\to1$ はただ一つである。

**積。** 射影は $z:A\times B\vdash\pi_1z:A$ と $z:A\times B\vdash\pi_2z:B$。$f:C\to A$、$g:C\to B$ の代表を $x:C\vdash f(x):A$、$x:C\vdash g(x):B$ とすると、$\langle f(x),g(x)\rangle:C\to A\times B$ が媒介する。二つの射影後は対の $\beta$ 則から $f,g$ に等しい。別の $h:C\to A\times B$ も二つの射影後が等しければ、対の $\eta$ 則により

$$
h=\langle\pi_1h,\pi_2h\rangle=\langle f,g\rangle
$$

となるので一意である。

**指数。** $E=A\Rightarrow B$、評価射を

$$
z:E\times A\vdash(\pi_1z)(\pi_2z):B
$$

で表す。射 $f:C\times A\to B$ を $w:C\times A\vdash t(w):B$ と表したとき、$c:C$ と新しい $a:A$ を取り、

$$
c:C\vdash\lambda a:A.\,t(\langle c,a\rangle):A\Rightarrow B
$$

を転置 $\Lambda(f)$ とする。評価と合成して展開すると

$$
\begin{aligned}
\operatorname{ev}\langle\Lambda(f)\pi_1,\pi_2\rangle
&\equiv_{\beta\eta}
(\lambda a:A.t(\langle\pi_1w,a\rangle))(\pi_2w)\\
&\equiv_{\beta\eta}t(\langle\pi_1w,\pi_2w\rangle)\\
&\equiv_{\beta\eta}t(w),
\end{aligned}
$$

となる。最初の等号は評価の定義、次は関数 $\beta$、最後は対の $\eta$ である。逆に $h:C\to E$ が同じ評価等式を満たすなら、その等式を $w=\langle c,a\rangle$ に代入し、関数を抽象して

$$
\begin{aligned}
\Lambda(f)(c)
&\equiv_{\beta\eta}\lambda a:A.\,f(\langle c,a\rangle)\\
&\equiv_{\beta\eta}\lambda a:A.\,(h(c))\,a\\
&\equiv_{\beta\eta}h(c)
\end{aligned}
$$

を得る。最後の行は $a$ が $h(c)$ に自由に現れないことによる関数 $\eta$ である。これで指数の普遍性を満たす。終対象・積・指数をすべて構成したから $\mathcal S$ はCartesian閉圏である。
<!-- proof-end -->

各基底型の解釈を指定すると、構文上の型・項は前節の方法で任意のCartesian閉圏へ解釈できる。[健全性](#thm-cat4-06-soundness)により等式類の取り方によらない。構文圏は、選んだ積・指数について正準同型による違いを許せば、基底型から作る自由なCartesian閉圏の役割を果たす。ただし「任意の圏で構文上の等式が逆にすべて証明できる」という完全性を、単独のモデルについて主張したわけではない。

## 8. 集合以外の解釈と学修上の境界

[二元順序圏の指数](../CAT4-05/index.md#prop-cat4-05-two-poset)を使い、$P=\{0\le1\}$ で基底型を $O=0$ とする。型 $\mathsf o\Rightarrow\mathsf o$ の解釈は $0^0=1$。これは文字どおりの関数集合ではなく、順序圏の対象である。$\lambda x:\mathsf o.x$ は終対象 $1$ から指数対象 $1$ への唯一の射へ解釈される。$\beta\eta$ 則が成り立つ理由は、元の値を列挙できることではなく、指数の普遍性が成立するためである。

積と指数による構文の解釈ができても、さらに加法、零射、核、鎖複体、弱同値、ホモトピーの情報が自動的に付与されるわけではない。Abel圏や導来圏には加法的な構造と核・余核、複体と局所化などが別途要り、$A_\infty$-圏には高次合成と整合条件、高次圏には高次の射・整合性が要る。本章のCartesian閉性は、それらを暗黙のうちに構成したことを意味しない。

## 9. 演習：型・代入・普遍性を自力でつなぐ

### CAT4-06-A01 定数関数の型付け

- Level: A
- ID: CAT4-06-A01

文脈 $x:A$ から $k=\lambda y:B.x$ の型を、使用した規則とともに導け。また $k\,v$ を $\beta$ 簡約せよ。ただし $x:A\vdash v:B$ とする。

<!-- solution-start -->
**詳細解答。** $x:A,y:B$ の下では変数規則から $x:A$ である。抽象規則を $y:B$ に使って $x:A\vdash k:B\Rightarrow A$。次に適用規則で $x:A\vdash k\,v:A$。$\beta$ 則により

$$
(\lambda y:B.x)\,v\equiv_{\beta\eta}x[v/y]=x.
$$

$x$ は $y$ を自由変数に含まないため、代入しても変わらない。
<!-- solution-end -->

### CAT4-06-A02 文脈の射影

- Level: A
- ID: CAT4-06-A02

$\Gamma=(x:A,y:B,z:C)$ を右から伸ばす文脈解釈で、$x,y,z$ のそれぞれの射の始域・終域と、射影の合成式を示せ。

<!-- solution-start -->
**詳細解答。** 文脈の解釈は $X=((1_{\mathcal C}\times A)\times B)\times C$。$z$ は最後の因子なので $\pi_2:X\to C$。$y$ は最終積の左側の第2成分なので $\pi_2\pi_1:X\to B$。$x$ はさらに一段左にあるので $\pi_2\pi_1\pi_1:X\to A$。順に右から作用し、例えば $\pi_1:X\to(1_{\mathcal C}\times A)\times B$ の後に $\pi_1$、最後に $\pi_2$ を適用するので、各合成の型が合う。
<!-- solution-end -->

### CAT4-06-A03 関数の $\beta\eta$ と自由変数

- Level: A
- ID: CAT4-06-A03

$\Gamma\vdash f:A\Rightarrow B$ とし、$x:A$ が $f$ に自由に現れないとする。$\lambda x:A.f\,x$ の型と等式を述べ、$x$ が自由に現れる場合に同じ $\eta$ 則を無条件に使えない理由を述べよ。

<!-- solution-start -->
**詳細解答。** 弱化した $\Gamma,x:A$ で $f:A\Rightarrow B$、$x:A$ なので適用は型 $B$。従って抽象は型 $A\Rightarrow B$ となる。$x$ が $f$ に自由に現れないから関数 $\eta$ 則で $\lambda x:A.f\,x\equiv_{\beta\eta}f$。例えば $f$ 自体が自由な $x$ に依存する場合、抽象するとその $x$ が束縛され、右辺と自由変数の集合が変わる。そもそも右辺を同じ $\Gamma$ の項として比較できないので、前提を外せない。
<!-- solution-end -->

### CAT4-06-A04 積の二つの法則

- Level: A
- ID: CAT4-06-A04

$\Gamma\vdash u:A,v:B,p:A\times B$ について、対の $\beta$ 則二本と $\eta$ 則一本を書き、それぞれどの積の等式に対応するか説明せよ。

<!-- solution-start -->
**詳細解答。** 二つの $\beta$ は $\pi_1\langle u,v\rangle\equiv_{\beta\eta}u$、$\pi_2\langle u,v\rangle\equiv_{\beta\eta}v$。解釈では $\pi_i\circ\langle\llbracket u\rrbracket,\llbracket v\rrbracket\rangle$ が対応する成分となる。$\eta$ は $\langle\pi_1p,\pi_2p\rangle\equiv_{\beta\eta}p$。解釈では $\langle\pi_1\llbracket p\rrbracket,\pi_2\llbracket p\rrbracket\rangle=\llbracket p\rrbracket$。前二式は媒介射の存在条件、最後は同じ二射影を持つ媒介射の一意性を用いる。
<!-- solution-end -->

### CAT4-06-A05 捕獲を避ける代入

- Level: A
- ID: CAT4-06-A05

$x:\mathsf o\vdash\lambda y:\mathsf o.x$ に対して、$x$ に自由変数 $y:\mathsf o$ を代入する正しい結果を書き、誤った結果と区別せよ。

<!-- solution-start -->
**詳細解答。** $\lambda y:\mathsf o.x$ の束縛変数 $y$ を、新しい名前 $z$ に $\alpha$ 変換する。そこで自由な $x$ を $y$ で置き換えると

$$
(\lambda y:\mathsf o.x)[x:=y]
\equiv_\alpha\lambda z:\mathsf o.y.
$$

結果の自由変数は $y$ である。誤って $\lambda y:\mathsf o.y$ とすれば $y$ は束縛され、自由変数が消える。例えば集合の二値解釈で前者は外側の $y$ の値を返す定数関数、後者は恒等関数なので区別できる。
<!-- solution-end -->

### CAT4-06-B01 代入補題の抽象の場合

- Level: B
- ID: CAT4-06-B01

$\sigma:\Delta\Rightarrow\Gamma$ と $\Gamma,x:A\vdash t:B$ を取る。$\sigma^\uparrow$ の解釈の型と式を書き、カリー化の自然性から $\lambda x:A.t$ に対する置換補題を導け。

<!-- solution-start -->
**詳細解答。** $\sigma^\uparrow$ は $x$ を固定し、$\Gamma$ の変数だけを $\sigma$ の各項で置換する。文脈解釈を $D=\llbracket\Delta\rrbracket$、$G=\llbracket\Gamma\rrbracket$、$E=\llbracket A\rrbracket$ と置くと

$$
\llbracket\sigma^\uparrow\rrbracket
=\langle\llbracket\sigma\rrbracket\pi_1,\pi_2\rangle:
D\times E\to G\times E.
$$

$F=\llbracket t\rrbracket_{\Gamma,x:A}:G\times E\to\llbracket B\rrbracket$ とする。帰納法の仮定で、代入後の内部項の解釈は $F\circ(\llbracket\sigma\rrbracket\times1_E)$。これをカリー化すれば

$$
\begin{aligned}
\llbracket(\lambda x:A.t)[\sigma]\rrbracket_\Delta
&=\Lambda(F\circ(\llbracket\sigma\rrbracket\times1_E))\\
&=\Lambda(F)\circ\llbracket\sigma\rrbracket\\
&=\llbracket\lambda x:A.t\rrbracket_\Gamma\circ
\llbracket\sigma\rrbracket.
\end{aligned}
$$

二行目は、両辺の逆転置が $F(\llbracket\sigma\rrbracket\times1_E)$ になるため[転置の一意性](../CAT4-05/index.md#thm-cat4-05-evaluation-curry)から成り立つ。
<!-- solution-end -->

### CAT4-06-B02 関数 $\beta$ と $\eta$ の両向きを検証する

- Level: B
- ID: CAT4-06-B02

局所小Cartesian閉圏で $f:X\times A\to B$、$g:X\to B^A$ とする。評価と転置から

$$
\operatorname{ev}\circ(\Lambda(f)\times1_A)=f,
\qquad
\Lambda(\operatorname{ev}\circ(g\times1_A))=g
$$

を証明し、二式がそれぞれどの構文等式に対応するか述べよ。

<!-- solution-start -->
**詳細解答。** 第一式は[指数対象の評価の普遍性](../CAT4-05/index.md#thm-cat4-05-evaluation-curry)が要求する転置の定義式である。始域は $X\times A$、終域は $B$。第二式では $g:X\to B^A$ 自身が、射 $\operatorname{ev}(g\times1_A):X\times A\to B$ の転置に要求される評価等式を満たす。転置は一意なので $\Lambda(\operatorname{ev}(g\times1_A))=g$。第一式は $(\lambda x.t)\,u=t[u/x]$ の根拠、第二式は $\lambda x.g\,x=g$（$x$ は $g$ に自由に現れない）の根拠である。
<!-- solution-end -->

### CAT4-06-B03 弱化と対角の構造射

- Level: B
- ID: CAT4-06-B03

$X,A$ がCartesian閉圏の対象、$u:X\to A$ とする。文脈へ未使用の変数を追加する操作を $X\times A\to X$、同じ変数を二度使う操作を $X\to X\times X$ という射で表せ。続いて $(u\circ\pi_1)\circ\langle1_X,u\rangle=u$ を証明せよ。

<!-- solution-start -->
**詳細解答。** 未使用変数の追加では、古い文脈の値だけを取り出す第一射影 $\pi_1:X\times A\to X$ を前合成する。例えば $f:X\to B$ の弱化は $f\pi_1:X\times A\to B$。同じ値を二度使うには $\Delta_X=\langle1_X,1_X\rangle:X\to X\times X$ を用い、各射影で $\pi_i\Delta_X=1_X$ が成立する。最後の等式は積の基本則から

$$
(u\pi_1)\langle1_X,u\rangle
=u(\pi_1\langle1_X,u\rangle)
=u1_X=u.
$$

$\langle1_X,u\rangle:X\to X\times A$ は、引数 $u$ を付加する代入の文脈写像である。弱化と代入が元の項を戻すことが、この射の等式で確認できる。
<!-- solution-end -->

### CAT4-06-B04 順序圏と基点付き集合の比較

- Level: B
- ID: CAT4-06-B04

二元順序圏 $P=\{0\le1\}$ で基底型を $0$ とした場合の $\llbracket\mathsf o\Rightarrow\mathsf o\rrbracket$ を求めよ。また、基点付き集合の圏で基底型を基点付き二点集合とすると、一般のラムダ抽象を解釈できない理由を示せ。

<!-- solution-start -->
**詳細解答。** [二元順序圏の指数](../CAT4-05/index.md#prop-cat4-05-two-poset)では $b^a=1$（$a=0$ の場合）なので $0^0=1$。従って関数型の解釈は対象 $1$ であり、実際の二点集合上の関数の集合ではない。

基点付き集合では一元基点集合が終対象で、積は基点を座標ごとに選んだ直積である。しかし基点付き二点集合 $A=B$ の間には基点保存射が二本あり、もし指数 $B^A$ が存在すれば

$$
\operatorname{Hom}_*(1\times A,B)
\cong\operatorname{Hom}_*(1,B^A)
$$

となる。左辺は二元集合、右辺は終対象 $1$ からの基点保存射が一本しかないので一元集合となり矛盾する。失われたのは指数の普遍性であり、ラムダ抽象を射 $X\to B^A$ へ送る段階が定義できない。
<!-- solution-end -->

### CAT4-06-C01 構文圏を構成して閉性を証明する

- Level: C
- ID: CAT4-06-C01

外延的単純型付きラムダ計算について、型を対象、一変数項の $\alpha\beta\eta$ 等式類を射とし、合成を代入とする構文圏を考える。(1) 恒等律・結合律と合成のwell-defined性を説明せよ。(2) 単位型と積型の普遍性を証明せよ。(3) 関数型の評価射とカリー化を具体的な項で作り、$\beta$ と $\eta$ の両方を使って指数の普遍性を示せ。

<!-- solution-start -->
**詳細解答。**

**(1) 合成の公理。** $f:A\to B$ を $x:A\vdash t:B$、$g:B\to C$ を $y:B\vdash u:C$ で表す。合成は $g\circ f=[u[t/y]]$。型付き置換だから $x:A\vdash u[t/y]:C$ となる。等式理論は合同律と代入で閉じているので、$t$ や $u$ の等式類の代表を取り替えても合成は変わらない。恒等射 $[x]$ を代入すれば $t[x/x]\equiv_\alpha t$、反対向きも $y[t/y]=t$。三つの射の合成では

$$
v[u/z][t/y]\equiv_\alpha
v[u[t/y]/z]
$$

が代入の結合性として成立する。抽象の内部では束縛名を新鮮に改名してから帰納法を適用するので捕獲は起こらない。

**(2) 終対象と積。** $x:A\vdash *:1$ は常にあり、任意の $x:A\vdash q:1$ は単位型 $\eta$ 則で $q\equiv_{\beta\eta}*$。従って終対象。積 $A\times B$ の射影は $\pi_1z,\pi_2z$。$f:C\to A$ と $g:C\to B$ に対して $\langle f,g\rangle:C\to A\times B$ を作る。射影後が $f,g$ となることは二つの積 $\beta$ 則で分かる。別の $h$ が同じ射影を持つなら

$$
h\equiv_{\beta\eta}\langle\pi_1h,\pi_2h\rangle
\equiv_{\beta\eta}\langle f,g\rangle.
$$

最初の等式は積 $\eta$ 則であり、媒介射が一意となる。

**(3) 指数。** $E=A\Rightarrow B$ と置く。評価射は

$$
z:E\times A\vdash(\pi_1z)(\pi_2z):B.
$$

$f:C\times A\to B$ を $w:C\times A\vdash t(w):B$ で表したら、カリー化は $c:C\vdash\lambda a:A.t(\langle c,a\rangle):E$。$w:C\times A$ に戻して評価すると

$$
\begin{aligned}
\operatorname{ev}(\Lambda(f)\times1_A)(w)
&\equiv_{\beta\eta}
(\lambda a:A.t(\langle\pi_1w,a\rangle))(\pi_2w)\\
&\equiv_{\beta\eta}t(\langle\pi_1w,\pi_2w\rangle)\\
&\equiv_{\beta\eta}t(w).
\end{aligned}
$$

二行目は関数 $\beta$、三行目は積 $\eta$。逆に $h:C\to E$ の評価との合成が $f$ なら、$w=\langle c,a\rangle$ とおき、$c$ に依存する関数として抽象して

$$
\Lambda(f)(c)
\equiv_{\beta\eta}\lambda a:A.(h(c))\,a
\equiv_{\beta\eta}h(c).
$$

最後の等式は $a$ が $h(c)$ に自由に現れないことを確認した上での関数 $\eta$。よってカリー化も一意であり、構文圏はCartesian閉圏である。
<!-- solution-end -->

## 10. 何を得たか

単純型は積と指数の反復として、型付き項は環境から値への射として解釈できる。変数の代入は射の合成、関数の $\beta$ 則は評価後の復元、$\eta$ 則は転置の一意性から導かれる。逆に項の等式類から作る構文圏もCartesian閉圏になる。この往復が、プログラムの等式と圏論的普遍性をつなぐ基本例である。

**次の分野への橋渡し。** ここで得た閉構造は関数と積の計算を説明するが、加法・核・複体・高次の合成を自動的に与えない。さらに豊かな圏を学ぶときは、何が新しい構造で、どの普遍性を追加するのかを一つずつ確認する。
