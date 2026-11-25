# CATB5-08 トポスでの像と正確性

<!-- definition-example-audit: strict -->

## 1. 集合と同じ商を、元を使わずに作る

[正則圏](../CATB1-02/index.md#def-catb1-02-regular-category)では射の像が引き戻しで保たれ、[Barr-正確圏](../CATB1-02/index.md#def-catb1-02-barr-exact)では同値関係から商を作ると元の関係を復元できた。前二講では[初等トポス](../CATB5-06/index.md#def-catb5-06-elementary-topos)と、[層圏が初等トポスになること](../CATB5-07/index.md#thm-catb5-07-sheaf-topos)を学んだ。これらの構造だけから像と商を作れるだろうか。

集合では写像 $f:\{1,2,3\}\to\{a,b,c\}$ が $1,2$ を $a$ に、$3$ を $b$ に送るとき、像は $\{a,b\}$ である。これは $f$ の値を全て含む最小の部分集合である。また $1,2$ を同じとみなす商は $\{\{1,2\},\{3\}\}$ であり、商の核対は指定した同値関係に一致する。

一般のトポスでは終対象からの射だけでは対象を見分けられないことがある。そこで任意の試験対象 $T$ からの射を使う。合成は右から左に書き、$\langle u,v\rangle$ は積への媒介射を表す。部分対象を[モノ射](../../CAT/CAT1-03/index.md#def-cat1-03-monomorphism)の同型類として扱い、$M\le N$ は $M$ の包含が $N$ を経由することを表す。

以下、初等トポス $\mathcal E$ を固定する。終対象を $1$、[部分対象分類子](../CATB5-06/index.md#def-catb5-06-classifier)を $t:1\to\Omega$ とする。対象 $Z$ から $1$ への唯一の射を $!_Z$、常に真を表す射を $t_Z=t!_Z$ と書く。

## 2. 部分対象をまとめて扱う

部分対象を分類する射 $X\to\Omega$ が多数あるなら、それらを一つの対象に収納したい。集合ではこれは $X$ の冪集合に相当する。トポスでは[指数対象](../../CAT/CAT4-05/index.md#def-cat4-05-exponential)を用いる。

指数対象 $B^A$ の評価射を $\operatorname{ev}:B^A\times A\to B$ とする。任意の射 $h:T\times A\to B$ に対して、射 $\widehat h:T\to B^A$ で

$$
\operatorname{ev}(\widehat h\times1_A)=h
$$

を満たすものが一意に存在する。この射を $h$ の転置と呼ぶ。

<a id="def-catb5-08-power-object"></a>

<!-- formal-statement-start -->
> **定義（冪対象）**
>
> 初等トポスの対象 $X$ の冪対象とは、部分対象分類子 $\Omega$ を値域とする指数対象 $P(X)=\Omega^X$ である。
>
> 評価射を $\operatorname{ev}_X:P(X)\times X\to\Omega$ とする。
<!-- formal-statement-end -->

<!-- definition-example-start: def-catb5-08-power-object -->
**定義の確認**。集合の圏では $\Omega=\{0,1\}$、真は $1$ である。$X=\{a,b\}$ なら $P(X)$ の元は $X\to\{0,1\}$ の四写像である。

順に $a,b$ での値を並べると $(0,0),(1,0),(0,1),(1,1)$ となり、対応する部分集合は $\varnothing,\{a\},\{b\},X$ である。評価は写像と元を受け取ってその値を返す。

任意の集合 $T$ と写像 $h:T\times X\to\{0,1\}$ に対し、$\widehat h(s)(x)=h(s,x)$ と定める。これは各 $s$ を四写像のいずれかへ送る写像であり、評価により元の $h$ を復元する。他の写像が同じ評価を持てば各 $s,x$ で値が一致するので等しい。従ってこの四写像の集合と評価が指数対象の普遍性を満たすことを確認できた。四つの値の組は、固定した順序 $a,b$ での評価値であり、各写像を一意に決める。
<!-- definition-example-end -->

ここで $\operatorname{Hom}(T,Z)$ は $T$ から $Z$ への射の集合、$\operatorname{Sub}(Z)$ は $Z$ の部分対象の集合と書く。一般の $\mathcal E$ でも[指数対象の普遍性](../../CAT/CAT4-05/index.md#def-cat4-05-exponential)と[分類射と部分対象の自然な対応](../CATB5-06/index.md#thm-catb5-06-classifier-bijection)を組み合わせると

$$
\operatorname{Hom}(T,P(X))
\cong\operatorname{Hom}(T\times X,\Omega)
\cong\operatorname{Sub}(T\times X).
$$

従って $T\to P(X)$ は、$T$ をパラメータとする部分対象の族を表す。特に $T=1$ なら $X$ の部分対象一つを表す。

まず分類射から得られる消去性を確認する。モノ射 $m:M\to Y$ の分類射を $\chi_m$ とすれば、任意の $u:T\to Y$ について

$$
u\text{ が }m\text{ を経由する}
\iff \chi_m u=t_T.
$$

これは分類子を定める引き戻しの普遍性そのものである。この判定を使うと、集合での全単射に対応する性質を得られる。

<a id="prop-catb5-08-bimorphism"></a>

<!-- formal-statement-start -->
> **命題（初等トポスのモノ・エピ同型性）**
>
> 初等トポスの射がモノ射かつエピ射なら同型射である。
<!-- formal-statement-end -->

<!-- proof-start -->
### 証明

モノ射かつエピ射 $m:M\to Y$ を取る。上の分類射による判定から

$$
\chi_m m=t_M=t_Ym.
$$

[エピ射の右消去律](../../CAT/CAT1-03/index.md#def-cat1-03-epimorphism)より $\chi_m=t_Y$ である。よって分類子の引き戻しの普遍性により $1_Y$ は $m$ を経由する。すなわち $mr=1_Y$ を満たす $r:Y\to M$ が存在する。

$mrm=m$ なので $m$ のモノ射性から $rm=1_M$ となる。従って $r$ は $m$ の逆射である。
<!-- proof-end -->

集合の圏では単射かつ全射なら逆写像を持つという性質に一致する。初等トポスでは分類射がこの性質を支えている。

## 3. 最小の部分対象として像を作る

集合での像を「全ての値を含む部分集合の共通部分」と考え直す。冪対象があれば、候補となる部分対象をまとめて量り、その共通部分を有限極限で取り出せる。

<a id="thm-catb5-08-image"></a>

<!-- formal-statement-start -->
> **定理（初等トポスの像分解）**
>
> 初等トポスの任意の射 $f:X\to Y$ はエピ射 $e:X\to I$ とモノ射 $i:I\to Y$ に分解される。
>
> $i$ は $f$ が経由する最小の部分対象、すなわち圏論的な像である。
<!-- formal-statement-end -->

見取り図：$Y$ の部分対象を表す冪対象から、$f$ に沿って制限すると常に真になるものだけを等化子で取り出す。次に、それら全てで真になる点をもう一つの等化子で取り出す。大きな任意積を仮定する必要はない。

<!-- proof-start -->
### 証明

$P(Y)\to P(X)$ を、射

$$
P(Y)\times X\xrightarrow{1\times f}P(Y)\times Y
\xrightarrow{\operatorname{ev}_Y}\Omega
$$

の転置とする。これを $f^\sharp$ と書く。$1\times X\cong X$ を通じて $t_X$ を転置した射 $1\to P(X)$ を $\top_X$ と書く。

[等化子](../../CAT/CAT2-03/index.md#def-cat2-03-equalizer) $k:K\to P(Y)$ を次の二射から作る。

$$
f^\sharp,\quad \top_X!_{P(Y)}:P(Y)\to P(X).
$$

$K$ が表す条件は、$f$ に沿って評価すると常に真であることだ。$K\times Y$ 上の評価射を

$$
b=\operatorname{ev}_Y(k\times1_Y)
$$

と置く。$K$ の定義と転置の普遍性から

$$
b(1_K\times f)=t_{K\times X}.
$$

積の因子を交換して $b$ を $Y\times K\to\Omega$ とみなし、その転置を $h:Y\to\Omega^K$ とする。$i:I\to Y$ を $h$ と常に真の転置 $\top_K!_Y$ の等化子とする。

任意の $u:T\to Y$ について、等化子と転置の普遍性により

$$
u\text{ が }i\text{ を経由する}
\iff b(1_K\times u)=t_{K\times T}.
$$

先の $b(1_K\times f)$ の等式から $f$ は $i$ を経由する。従って $f=ie$ となる唯一の $e:X\to I$ が存在する。

次に $f$ が経由する任意のモノ射 $m:M\to Y$ を取る。分類射 $\chi_m$ は $\chi_m f=t_X$ を満たす。$\chi_m$ の転置 $1\to P(Y)$ は $K$ を経由するので、対応する射を $s:1\to K$ とする。

$I$ の定義から $b(1_K\times i)=t_{K\times I}$ である。これに $s\times1_I$ を前合成すると

$$
\chi_m i=t_I.
$$

よって分類子の引き戻しの普遍性から $i$ は $m$ を経由する。すなわち $mw=i$ となる射 $w:I\to M$ が存在する。

$f=ie=mg$ と書けば

$$
mwe=ie=mg.
$$

$m$ のモノ射性から $we=g$ が従う。また $mw'=i=mw$ なら $w'=w$ である。これで[圏論的な像](../CATB1-01/index.md#def-catb1-01-image)の普遍性（分解を保つ媒介射の存在と一意性）を確認した。

最後に $e$ のエピ射性を示す。$u,v:I\to Z$ が $ue=ve$ を満たすとし、$n:N\to I$ を両者の等化子とする。$e$ は $n$ を経由し、$f$ はモノ射 $in$ を経由する。$i$ の最小性により $i=inw$ となる $w:I\to N$ が存在する。

$i$ のモノ射性から $nw=1_I$、また等化子の条件 $un=vn$ から

$$
u=unw=vnw=v.
$$

ゆえに $e$ はエピ射である。
<!-- proof-end -->

集合の例では、候補 $K$ は $\{a,b\}$ と $\{a,b,c\}$ に対応する二つの述語である。両方で真になる $y$ は $a,b$ だけなので $I=\{a,b\}$ となる。

## 4. 観察対象を変えても全体を覆える

エピ射は「射を右から消去できる」という性質であり、集合の全射のように各元の原像を持つとは限らない。しかし像分解に用いるには、観察対象を引き戻しで変えてもエピ射であることが必要になる。

準備として $g:C\to B$ と部分対象 $m:S\to C$ を取る。集合では $b\in B$ のファイバーは $g^{-1}(\{b\})$ である。

一般の圏では試験対象 $T$ からの射 $u:T\to B$ に対し、[引き戻し](../../CAT/CAT2-03/index.md#def-cat2-03-pullback) $T\times_B C$ とその $C$ への射影でファイバーの族を表す。この射影が $m$ を経由することを、ファイバー全体が $S$ に入る条件とする。

$B\times C$ 上の部分対象 $D$ を、二射 $\pi_B$ と $g\pi_C$ の等化子とする。ここで $\pi_B,\pi_C$ は積の射影である。さらに $D'$ を $D$ と $B\times S$ の共通部分とする。

$B\times S$ の射 $1_B\times m$ はモノ射である。実際、これとの合成が等しい二射は $B$ 成分が等しく、$S$ 成分は $m$ のモノ射性で等しくなるため、二射は等しい。共通部分は両モノ射の[引き戻し](../../CAT/CAT2-03/index.md#def-cat2-03-pullback)で作る。

<a id="lem-catb5-08-fiber-condition"></a>

<!-- formal-statement-start -->
> **補題（ファイバー包含条件の表現）**
>
> 初等トポスの射 $g:C\to B$ とモノ射 $m:S\to C$ に対し、次の性質を持つ部分対象 $n:N\to B$ が存在する。
>
> 任意の射 $u:T\to B$ が $n$ を経由することと、引き戻し $T\times_B C$ から $C$ への射影が $m$ を経由することは同値である。
<!-- formal-statement-end -->

見取り図：等化子 $D$ は $b=g(c)$ という条件、$D'$ はそれに $c$ が $S$ に入るという条件を追加したものである。二つの分類射を転置し、等しくなる $b$ を選ぶ。

<!-- proof-start -->
### 証明

上記の $D,D'$ の分類射を $\chi_D,\chi_{D'}:B\times C\to\Omega$ とする。指数対象への転置を

$$
\widehat{\chi_D},\widehat{\chi_{D'}}:B\to\Omega^C
$$

とし、$n:N\to B$ をこの二射の等化子とする。

任意の $u:T\to B$ について、$u$ が $n$ を経由することは、転置の普遍性から次の等式と同値である。

$$
\chi_D(u\times1_C)=\chi_{D'}(u\times1_C).
$$

[分類射と部分対象の自然な対応](../CATB5-06/index.md#thm-catb5-06-classifier-bijection)より、これは $D,D'$ を $u\times1_C$ で引き戻した部分対象が等しいことを意味する。

$D$ の引き戻しは $T\times C$ のうち $u\pi_T=g\pi_C$ を満たす部分対象、すなわち $T\times_B C$ である。$D'$ の引き戻しは、その部分対象にさらに $\pi_C$ が $S$ を経由する条件を加えたものである。

両部分対象が等しいのは、$T\times_B C$ の射影が既に $m$ を経由するとき、かつそのときに限る。従って所望の同値が成立する。
<!-- proof-end -->

例えば集合で $B=\{a,b,c\}$、$C=\{1,2,3\}$ とし、$g(1)=g(2)=a,\ g(3)=b$、$S=\{1\}$ とする。$a$ のファイバーには $2$ が含まれ、$b$ のファイバーには $3$ が含まれる。$c$ のファイバーは空集合なので $S$ に含まれる。従って $N=\{c\}$ になる。

<a id="thm-catb5-08-epi-pullback"></a>

<!-- formal-statement-start -->
> **定理（初等トポスのエピ射の引き戻し安定性）**
>
> 初等トポスのエピ射 $e:A\to B$ と任意の射 $g:C\to B$ に対し、引き戻しの射影 $p:A\times_B C\to C$ はエピ射である。
<!-- formal-statement-end -->

見取り図：$p$ が経由する任意の部分対象について、ファイバー全体がそこに含まれるという条件を $B$ 上で表す。$e$ のエピ射性がその条件を $B$ 全体へ押し広げる。

<!-- proof-start -->
### 証明

$p$ が経由するモノ射 $m:S\to C$ を取る。[ファイバー包含条件の表現](#lem-catb5-08-fiber-condition)で $n:N\to B$ を作る。

$u=e$ とすると、仮定により $A\times_B C\to C$ は $m$ を経由する。従って $e$ は $n$ を経由する。

$n$ はモノ射であり、$e=nw$ がエピ射だから $n$ もエピ射である。実際、$vn=v'n$ なら $ve=v'e$ となるので $v=v'$ である。[初等トポスのモノ・エピ同型性](#prop-catb5-08-bimorphism)から $n$ は同型となる。

今度は補題で $u=1_B$ とする。これは $n$ を経由し、$B\times_B C$ の $C$ への射影は同型だから、$1_C$ が $m$ を経由する。従って $m$ は同型である。

$p$ を右から合成して等しくなる二射 $v,v':C\to Z$ を取る。等化子 $m:S\to C$ を作れば $p$ は $m$ を経由するから、直前の結果により $m$ は同型である。$vm=v'm$ に逆射を前合成して $v=v'$ を得る。よって $p$ はエピ射である。
<!-- proof-end -->

## 5. エピ射はちょうど核対による商である

集合の全射 $e:A\to B$ で、同じ $e$ の値を持つ入力に同じ値を与える写像 $h:A\to Z$ は $B$ 上の写像として一意に定まる。一般のトポスで同じ主張を示すには、値を代表元から選ぶ代わりにグラフを作る。[核対](../CATB1-01/index.md#def-catb1-01-kernel-pair)は同じ値を持つ二入力を表す引き戻しであり、[正則エピ射](../CATB1-01/index.md#def-catb1-01-regular-epi)は平行二射の余等化子となる射である。

<a id="thm-catb5-08-epi-regular"></a>

<!-- formal-statement-start -->
> **定理（初等トポスのエピ射の正則性）**
>
> 初等トポスの射 $e:A\to B$ がエピ射なら、その核対の二射影の余等化子である。
>
> 従って初等トポスではエピ射と正則エピ射が一致する。
<!-- formal-statement-end -->

見取り図：$B\times Z$ に $a$ を $(e(a),h(a))$ として送った像を作る。像から $B$ への射影が同型であることを示せば、$B\to Z$ が得られる。像を通じて局所的に入力を取り直し、その取り直しが結論を変えないことをエピ射の消去性で確認する。

<!-- proof-start -->
### 証明

[核対](../CATB1-01/index.md#def-catb1-01-kernel-pair)の二射影を $r_1,r_2:A\times_B A\to A$ とする。核対の可換条件は $er_1=er_2$ である。射 $h:A\to Z$ が $hr_1=hr_2$ を満たすと仮定する。

[初等トポスの像分解](#thm-catb5-08-image)を $\langle e,h\rangle$ に適用する。

$$
A\xrightarrow{d}G\xrightarrow{i}B\times Z.
$$

ここで $d$ はエピ射、$i$ はモノ射である。$p=\pi_Bi$ と $q=\pi_Zi$ と置けば $pd=e$、$qd=h$ となる。$e$ のエピ射性から $p$ はエピ射である。

$p$ のモノ射性を示す。$u,v:T\to G$ が $pu=pv$ を満たすとする。まず $d$ を $u$ に沿って引き戻し、射影 $s:T_1\to T$ と $a:T_1\to A$ を得る。次に $d$ を $vs:T_1\to G$ に沿って引き戻し、射影 $w:T_2\to T_1$ と $b:T_2\to A$ を得る。

引き戻しの可換性から

$$
daw=usw,\qquad db=vsw.
$$

[初等トポスのエピ射の引き戻し安定性](#thm-catb5-08-epi-pullback)より $s,w$ はエピ射であり、[エピ射は合成で閉じること](../../CAT/CAT1-03/index.md#prop-cat1-03-composition)から $sw$ もエピ射である。

二つの $A$ への射について

$$
eaw=pdaw=pusw=pvsw=pdb=eb.
$$

核対の普遍性から $r_1z=aw$、$r_2z=b$ となる射 $z:T_2\to A\times_B A$ が存在する。$h$ が二射影を余等化することから

$$
haw=hr_1z=hr_2z=hb.
$$

従って $q us w=h aw=h b=q vs w$ である。第一成分 $p$ も一致するので、積の普遍性から $iusw=ivsw$。$i$ のモノ射性と $sw$ のエピ射性を順に使えば $u=v$ になる。これで $p$ はモノ射でもある。

[初等トポスのモノ・エピ同型性](#prop-catb5-08-bimorphism)から $p$ は同型である。$k=qp^{-1}:B\to Z$ と置くと

$$
ke=qp^{-1}pd=qd=h.
$$

もし $k'e=h$ なら $ke=k'e$ であり、$e$ のエピ射性から $k=k'$ となる。以上で $e$ が核対の余等化子であることを示した。

逆に正則エピ射は[正則エピ射はエピ射](../CATB1-01/index.md#prop-catb1-01-regular-epi-is-epi)よりエピ射である。
<!-- proof-end -->

従って像分解のエピ射部分は正則エピ射である。任意の $f=ie$ に対して、$i$ のモノ射性により $fu=fv$ と $eu=ev$ が同値なので、$f$ と $e$ の核対は一致する。

これで[正則圏の三条件](../CATB1-02/index.md#def-catb1-02-regular-category)のうち、有限極限は初等トポスの定義から、核対の余等化子の存在は[初等トポスの像分解](#thm-catb5-08-image)と[初等トポスのエピ射の正則性](#thm-catb5-08-epi-regular)から、引き戻し安定性は[初等トポスのエピ射の引き戻し安定性](#thm-catb5-08-epi-pullback)と正則性から従う。[正則圏の像分解とその引き戻し安定性](../CATB1-02/index.md#thm-catb1-02-regular-factorization)を適用できる。

## 6. 同値関係を同値類の族に変える

[内部同値関係](../CATB1-02/index.md#def-catb1-02-internal-equivalence) $R\hookrightarrow X\times X$ は、反射・対称・推移の三操作を射として持つ。集合なら $x$ の同値類は $x$ と関係する元の集合である。冪対象はこの同値類の割当てを一般化する。

<a id="thm-catb5-08-exact"></a>

<!-- formal-statement-start -->
> **定理（初等トポスのBarr-正確性）**
>
> 任意の初等トポスは Barr-正確圏である。
>
> 特に任意の内部同値関係はその二射影の余等化子の核対として実現される。
<!-- formal-statement-end -->

見取り図：関係の分類射を転置して $c:X\to P(X)$ を作る。二つの元の同値類が一致する条件と、二つが関係する条件が同じであることを、任意の試験対象上で確認する。$c$ の像が商になる。

<!-- proof-start -->
### 証明

$R$ の分類射を $\chi_R:X\times X\to\Omega$、第一因子をパラメータとする転置を $c:X\to P(X)$ とする。

試験対象 $T$ と二射 $x,y:T\to X$ に対して、$x\mathrel{R} y$ という記号を、$\langle x,y\rangle:T\to X\times X$ が $R$ を経由することとする。反射・対称・推移の三操作によりこの関係は $\operatorname{Hom}(T,X)$ 上の同値関係である。例えば推移律では $x\mathrel{R} y$ と $y\mathrel{R} z$ を与える二つの媒介射の中間成分が一致するため、$R\times_X R$ への媒介射が得られ、内部の推移射を合成できる。この関係は任意の前合成でも保たれる。

転置の普遍性により $cx=cy$ は、次の二射が等しいことと同値である。

$$
\chi_R(x\times1_X),\quad\chi_R(y\times1_X):
T\times X\to\Omega.
$$

まず $x\mathrel{R} y$ とする。任意の $u:W\to T$ と $z:W\to X$ に対して $xu\mathrel{R} yu$ である。対称律と推移律から

$$
xu\mathrel{R} z\iff yu\mathrel{R} z.
$$

左辺から右辺には $yu\mathrel{R} xu$ と $xu\mathrel{R} z$ を、逆方向には $xu\mathrel{R} yu$ と $yu\mathrel{R} z$ を使う。

従って任意の $\langle u,z\rangle:W\to T\times X$ について、二つの分類射の表す部分対象を経由する条件は一致する。各部分対象の包含射自身を試験射に選べば、双方が互いを経由し、二つの部分対象は等しい。[分類射と部分対象の自然な対応](../CATB5-06/index.md#thm-catb5-06-classifier-bijection)から二つの分類射も等しい。転置に戻ると $cx=cy$ である。

逆に $cx=cy$ とする。二つの分類射が等しいので、それらに $\langle1_T,y\rangle:T\to T\times X$ を前合成する。

$$
\chi_R\langle x,y\rangle
=\chi_R\langle y,y\rangle=t_T.
$$

最後の等式は反射律による。従って分類子の引き戻しの普遍性から $x\mathrel{R} y$ である。

任意の試験対象でこの同値が成立するので、$R$ は $c$ の核対の普遍性を満たす。すなわち $cx=cy$ なら二成分が $x,y$ となる $T\to R$ が存在し、$R\to X\times X$ のモノ射性から一意である。

[初等トポスの像分解](#thm-catb5-08-image)を $c$ に適用し、$c=iq$ と書く。$i$ はモノ射だから $qx=qy$ と $cx=cy$ は同値であり、$R$ は $q$ の核対でもある。

$q$ はエピ射だから[初等トポスのエピ射の正則性](#thm-catb5-08-epi-regular)により核対の余等化子である。既に第5節で正則性を示したので、[Barr-正確圏](../CATB1-02/index.md#def-catb1-02-barr-exact)の全条件が成立する。
<!-- proof-end -->

集合 $X=\{1,2,3\}$ で $1,2$ を関係づけ、$3$ を単独にする場合を再訪しよう。

$$
c(1)=c(2)=\{1,2\},\qquad c(3)=\{3\}.
$$

冪集合の八元全てを商とするのではない。$c$ の像だけを取ると二元の商が得られる。$q$ が等しい値を取る組は $(1,1),(1,2),(2,1),(2,2),(3,3)$ の五対であり、元の関係と一致する。

## 7. 層では像を局所的に判定する

[Grothendieckトポス](../CATB5-07/index.md#def-catb5-07-grothendieck-topos)は小site上の層圏に同値な圏であり、前講の[層圏の初等トポス性](../CATB5-07/index.md#thm-catb5-07-sheaf-topos)から上の定理を適用できる。では層の像を各対象の集合として具体的に求めるにはどうすればよいだろうか。

[小site](../CATB5-02/index.md#def-catb5-02-grothendieck-topology) $(\mathcal C,J)$ 上の[層](../CATB5-03/index.md#def-catb5-03-site-sheaf)の射 $f:F\to G$ を取る。$J(U)$ は対象 $U$ 上の被覆篩の集合である。

射 $f$ の各対象での成分と、射 $r:V\to U$ による制限を、それぞれ次のように書く。

$$
\begin{aligned}
f_U&:F(U)\to G(U),\\
F(r)&:F(U)\to F(V),\\
G(r)&:G(U)\to G(V).
\end{aligned}
$$

$U$ 上の元 $y\in G(U)$ に対して、制限すると $f$ の値になる射を集める。

$$
L_y=\{r:V\to U\mid G(r)y\in f_V(F(V))\}.
$$

これが[篩](../CATB5-02/index.md#def-catb5-02-sieve)であることを、任意の射との前合成で閉じることから確認する。$G(r)y=f_V(x)$ なら、任意の $s:W\to V$ について自然性から

$$
G(rs)y=G(s)f_V(x)=f_W(F(s)x).
$$

従って $rs\in L_y$ である。この篩が被覆なら、$y$ は各局所領域で原像を持つ。ただしそれらの原像が互いに一致するとは限らない。

<a id="def-catb5-08-local-surjective"></a>

<!-- formal-statement-start -->
> **定義（局所全射）**
>
> 小site $(\mathcal C,J)$ 上の層の射 $f:F\to G$ が局所全射であるとは、任意の対象 $U$ と $y\in G(U)$ に対し、原像を持つ制限の篩
>
$$
L_y=\{r:V\to U\mid G(r)y\in f_V(F(V))\}
$$
>
> が $J(U)$ に属することをいう。
<!-- formal-statement-end -->

<!-- definition-example-start: def-catb5-08-local-surjective -->
**定義の確認**。位相空間 $X=\{a,b,c\}$ の開集合を

$$
\varnothing,\quad W=\{b\},\quad U=\{a,b\},
\quad V=\{b,c\},\quad X
$$

とする。各非空開集合は $b$ を含むので、非空開集合の中に互いに素な二つの非空開部分集合はない。

[開集合圏のGrothendieck位相](../CATB5-02/index.md#thm-catb5-02-open-site)を用いる。$F(O)$ を、$O$ から $\{0,1\}$ への局所定数写像で、値 $0$ の領域が $U$ に、値 $1$ の領域が $V$ に含まれるものの集合とする。局所定数とは各値の逆像が開集合になることを意味する。

制限は写像の制限である。開被覆上で一致する写像は点ごとに一意に貼り合わさる。値 $0,1$ の逆像は局所逆像の合併だから開であり、領域条件も局所的に保存される。従って $F$ は層である。

非空開集合で局所定数写像は定数なので

| 開集合 $O$ | $F(O)$ |
| --- | --- |
| $\varnothing$ | 空写像一つ |
| $W$ | 定数0、定数1 |
| $U$ | 定数0 |
| $V$ | 定数1 |
| $X$ | 空集合 |

$G=1$ を終対象の層（各成分一元集合）とし、$f:F\to1$ を唯一の射とする。$O\ne X$ なら $F(O)$ は非空なので、唯一の $y\in1(O)$ に対する $L_y$ は最大篩である。$O=X$ なら $L_y$ は $\varnothing,W,U,V$ からの包含射を含み、合併 $U\cup V=X$ だから被覆篩である。

これで全ての開集合・全ての元について局所全射の条件を確認した。一方 $F(X)=\varnothing$ なので $f_X$ は全射でない。$U,V$ の原像は $W$ でそれぞれ0と1に制限され、一致しないため貼り合わせられない。
<!-- definition-example-end -->

<a id="thm-catb5-08-sheaf-image"></a>

<!-- formal-statement-start -->
> **定理（層の局所像とエピ射の判定）**
>
> 小site $(\mathcal C,J)$ 上の層の射 $f:F\to G$ の像は次の部分層 $I\subseteq G$ で表される。
>
$$
I(U)=\{y\in G(U)\mid L_y\in J(U)\}.
$$

> ここで $L_y$ は $G(r)y$ が $f_V$ の値となる射 $r:V\to U$ の篩である。
>
> また $f$ がエピ射であることと、$f$ が局所全射であることは同値である。
<!-- formal-statement-end -->

見取り図：像に入る条件は局所的である。制限で保たれ、局所的に成立する条件はGrothendieck位相の推移律で大域的にも成立する。像を経由する射は局所全射となり、層の一意性によって右消去できる。

<!-- proof-start -->
### 証明

任意の射 $s:W\to U$ について、[篩の引き戻し](../CATB5-02/index.md#def-catb5-02-sieve-pullback)を $s^*L_y=\{r:V\to W\mid sr\in L_y\}$ と書く。前層の反変性 $G(r)G(s)=G(sr)$ より

$$
\begin{aligned}
r\in L_{G(s)y}
&\iff G(r)G(s)y\in f_V(F(V))\\
&\iff G(sr)y\in f_V(F(V))\\
&\iff sr\in L_y\\
&\iff r\in s^*L_y.
\end{aligned}
$$

従って $L_{G(s)y}=s^*L_y$ である。[Grothendieck位相の引き戻し安定性](../CATB5-02/index.md#def-catb5-02-grothendieck-topology)より $I$ は制限で閉じる。

被覆篩 $R\in J(U)$ 上の $I$ の整合族 $(y_r)$ を取る。$G$ の[層条件](../CATB5-03/index.md#def-catb5-03-site-sheaf)により $G$ 内の唯一の貼り合わせ $y\in G(U)$ がある。各 $r:V\to U$ が $R$ に入るとき

$$
r^*L_y=L_{y_r}\in J(V).
$$

[Grothendieck位相の推移律](../CATB5-02/index.md#def-catb5-02-grothendieck-topology)より $L_y\in J(U)$。ゆえに $y\in I(U)$ であり、一意性も $G$ の一意性から従う。よって $I$ は層である。

$f_U(x)$ に対する篩は最大篩だから $f$ は包含 $i:I\to G$ を経由する。得られる射 $e:F\to I$ は局所全射である。実際 $y\in I(U)$ を取ると $L_y$ 上の各 $r:V\to U$ で $G(r)y=f_V(x)$ となる $x\in F(V)$ が存在し、これは $I(V)$ 内での等式でもある。

一般に局所全射 $a:H\to K$ と二つの層の射 $b,c:K\to Z$ について $ba=ca$ とする。任意の $y\in K(U)$ とその原像篩の射 $r:V\to U$ を取る。$K(r)y=a_V(x)$ となる $x$ を用いて

$$
\begin{aligned}
Z(r)b_U(y)&=b_V(K(r)y)\\
&=b_V(a_V(x))\\
&=c_V(a_V(x))\\
&=Z(r)c_U(y).
\end{aligned}
$$

原像篩が被覆なので $Z$ の層条件の一意性から $b_U(y)=c_U(y)$。全対象・全元で成立するから $b=c$ である。

従って $e$ はエピ射であり、$i$ は[層のモノ射の成分判定](../CATB5-07/index.md#prop-catb5-07-sheaf-mono)によりモノ射である。[初等トポスのエピ射の正則性](#thm-catb5-08-epi-regular)と[正則エピ・モノ分解は像を与える](../CATB1-01/index.md#thm-catb1-01-regular-epi-mono-image)から $I$ は像を表す。

$f$ がエピ射なら $i$ もエピ射であり、[初等トポスのモノ・エピ同型性](#prop-catb5-08-bimorphism)から同型である。包含なので $I(U)=G(U)$ が全対象で成立し、$f$ は局所全射である。逆は既に上で示した。
<!-- proof-end -->

第7節の有限空間では集合としての成分像が $X$ 上で空なのに、局所像は $1$ 全体になる。前層として成分像だけを取ると $U,V$ 上の元が $W$ 上で一致するのに $X$ 上の貼り合わせが存在しない。従って成分像は層でなく、局所像が必要になる。

## 8. 層の商は成分商を層化して作る

層の像が点ごとの像とずれるように、商も点ごとの商だけでは層になるとは限らない。しかし[層化関手](../CATB5-05/index.md#def-catb5-05-sheafification) $a$ は前層を層に直し、[層化の左完全性](../CATB5-05/index.md#thm-catb5-05-sheafification-left-exact)により同時に有限極限を保つ。この二つの性質によって商の普遍性と核対を一緒に制御できる。

<a id="thm-catb5-08-sheaf-quotient"></a>

<!-- formal-statement-start -->
> **定理（層の同値関係の商の構成）**
>
> 小site上の層 $F$ の内部同値関係 $R\hookrightarrow F\times F$ を取る。各対象 $U$ で $Q_0(U)=F(U)/R(U)$ と置き、制限を同値類の制限で定める。
>
> この前層の層化 $aQ_0$ への自然な射 $q:F\to aQ_0$ は $R$ の二射影の余等化子であり、$R$ は $q$ の核対である。
<!-- formal-statement-end -->

見取り図：成分商は前層の圏で核対を正確に復元する。層化の随伴が余等化子の普遍性を、左完全性が核対の引き戻しを保つ。

<!-- proof-start -->
### 証明

[層のモノ射の成分判定](../CATB5-07/index.md#prop-catb5-07-sheaf-mono)により $R(U)$ を $F(U)^2$ の部分集合とみなせる。[層の極限の点ごとの構成](../CATB5-05/index.md#thm-catb5-05-sheaf-limits)から反射・対称・推移の射を成分で評価できる。反射射は各 $x$ に $(x,x)$ を、対称射は $(x,y)$ に $(y,x)$ を与える。

推移射の始域は引き戻し $R\times_F R$ なので、成分では $((x,y),(y,z))$ という組である。その像は $(x,z)$ となる。よって $R(U)$ は集合の同値関係である。

$r:V\to U$ に沿う制限は包含 $R\to F\times F$ の自然性によって関係を保存する。具体的には $(x,x')\in R(U)$ なら $(F(r)x,F(r)x')\in R(V)$ である。$[x]$ を $x$ の $R(U)$ による同値類と書く。従って

$$
Q_0(r)([x])=[F(r)x]
$$

は代表元によらない。恒等射と合成について、$s:W\to V$ を取ると

$$
\begin{aligned}
Q_0(1_U)([x])&=[F(1_U)x]=[x],\\
Q_0(s)Q_0(r)([x])&=[F(s)F(r)x]\\
&=[F(r\circ s)x]=Q_0(r\circ s)([x]).
\end{aligned}
$$

従って $Q_0$ は前層である。成分商写像 $(q_0)_U(x)=[x]$ について

$$
Q_0(r)(q_0)_U(x)=[F(r)x]=(q_0)_V F(r)x.
$$

従って $q_0:F\to Q_0$ は自然変換である。

前層の射 $h:F\to H$ が $R$ の二射影を余等化するとき、各成分で $k_U([x])=h_U(x)$ と定められる。関係の二成分で値が等しいので代表元によらない。任意の $r:V\to U$ に対して

$$
\begin{aligned}
H(r)k_U([x])&=H(r)h_U(x)\\
&=h_V(F(r)x)\\
&=k_V(Q_0(r)([x])).
\end{aligned}
$$

従って $k$ は自然であり、$kq_0=h$ である。各 $q_{0,U}$ が全射だから $k$ は一意である。

また前層として $R$ は $q_0$ の核対である。任意の前層 $T$ からの二射 $u,v:T\to F$ が $q_0u=q_0v$ を満たせば、各対象で $(u_U(z),v_U(z))$ は $R(U)$ に入る。これを媒介写像とすると制限と可換し、二成分で一意に定まる。

$a$ を[層化関手](../CATB5-05/index.md#def-catb5-05-sheafification)、$\eta:Q_0\to aQ_0$ をその標準写像とする。$q=\eta q_0$ と置く。

層 $H$ への射 $h:F\to H$ が二射影を余等化すれば、先の議論により前層の射 $k:Q_0\to H$ に一意に分解される。[層化と包含の随伴](../CATB5-05/index.md#thm-catb5-05-adjunction)から $k=\bar k\eta$ となる層の射 $\bar k:aQ_0\to H$ が一意に存在する。従って $\bar kq=h$ であり、一意性も二つの一意性から従う。

最後に[層化の左完全性](../CATB5-05/index.md#thm-catb5-05-sheafification-left-exact)を前層の核対へ適用すると

$$
aR\cong aF\times_{aQ_0}aF.
$$

$R,F$ は既に層だから標準写像によって $aR\cong R$、$aF\cong F$ である。層化の標準写像の自然性により、これらの同型で $aq_0$ を移すと $q=\eta q_0$ になる。二射影も対応するため

$$
R\cong F\times_{aQ_0}F.
$$

従って元の関係が核対として復元される。
<!-- proof-end -->

第7節の有限空間で $F\to1$ の核対を考える。

成分では $F(O)^2$ の全関係である。

$Q_0$ は $X$ 上で空集合、その他の開集合上で一元集合となる。

$U,V$ 上の同値類は $W$ で一致するが、成分商には $X$ 上の貼り合わせがない。

層化によってこの貼り合わせが追加される。

実際 $F\to1$ は局所全射なので[層の局所像とエピ射の判定](#thm-catb5-08-sheaf-image)と[初等トポスのエピ射の正則性](#thm-catb5-08-epi-regular)からその核対の余等化子であり、$aQ_0\cong1$ となる。

## 9. 演習

### CATB5-08-A01 冪対象と共通部分

- Level: A

集合 $Y=\{a,b,c\}$ への写像 $f:\{1,2\}\to Y$ が両方の元を $b$ へ送る。第3節の構成で、$K$ は $f$ の全ての値を含む部分集合の族、$I$ はその共通部分である。$K,I$ を求めよ。

<!-- solution-start -->
**詳細解答**

$P(Y)$ は八つの部分集合からなる。第3節の[初等トポスの像分解](#thm-catb5-08-image)では $K$ は $f$ の値全てで真になる述語の集合である。唯一の値は $b$ だから

$$
K=\{\{b\},\{a,b\},\{b,c\},Y\}.
$$

この四集合の共通部分を取る。$b$ は全てに入るが、$a,c$ は $\{b\}$ に入らない。従って $I=\{b\}$ となる。$e$ は両方を $b$ に送る全射であり、$i$ は包含である。
<!-- solution-end -->

### CATB5-08-A02 ファイバーの全体を調べる

- Level: A

$g:\{1,2,3,4\}\to\{a,b,c\}$ を $g(1)=g(2)=a$、$g(3)=g(4)=b$ とし、$S=\{1,2,4\}$ とする。ファイバー包含条件を表す部分集合 $N$ を求めよ。空ファイバーも調べよ。

<!-- solution-start -->
**詳細解答**

[ファイバー包含条件の表現](#lem-catb5-08-fiber-condition)で $D$ は $(b',x)$ が $b'=g(x)$ を満たす対である。$D'$ はさらに $x\in S$ を満たす対である。

各第一成分で取り出すと、$a$ では $D_a=D'_a=\{1,2\}$、$b$ では $D_b=\{3,4\}$ だが $D'_b=\{4\}$ である。$c$ では両方が空集合である。

従って等しいファイバーは $a,c$ であり、$N=\{a,c\}$ になる。空集合は任意の集合に含まれるため、$c$ を除外してはいけない。
<!-- solution-end -->

### CATB5-08-A03 同値類を値にする写像

- Level: A

$X=\{1,2,3,4,5\}$ の同値関係が $\{1,4\},\{2,3,5\}$ の二つの類を持つ。$c:X\to P(X)$ の値、像、核対の元の個数を求めよ。

<!-- solution-start -->
**詳細解答**

[初等トポスのBarr-正確性](#thm-catb5-08-exact)の構成では $c(x)$ は $x$ と関係する元の集合である。従って

$$
\begin{aligned}
c(1)=c(4)&=\{1,4\},\\
c(2)=c(3)=c(5)&=\{2,3,5\}.
\end{aligned}
$$

像はこの二つの集合を元とする集合である。核対の元は同じ類に入る順序対なので、第一の類では $2\times2=4$ 対、第二の類では $3\times3=9$ 対である。類をまたぐ対は含まれないため、合計 $13$ 対となる。
<!-- solution-end -->

### CATB5-08-A04 局所像を計算する

- Level: A

$X=\{a,b,c\}$ の開集合を $\varnothing,W=\{b\},U=\{a,b\},V=\{b,c\},X$ とし、通常の開被覆によるsiteを取る。前層 $H$ を、開集合 $O$ が $U$ に含まれるとき一元集合、そうでないとき空集合を割り当てるものとする。$H\to1$ の $X$ 上の原像篩と、各開集合上の像を求めよ。$H$ が層であることも確認せよ。

<!-- solution-start -->
**詳細解答**

制限が定義できるのは $O\subseteq U$ ならその部分開集合も $U$ に含まれるためである。被覆上に整合族が存在すれば全ての被覆開集合が $U$ に含まれ、その合併 $O$ も $U$ に含まれる。貼り合わせは一元集合の唯一の元である。よって $H$ は層である。

[局所全射の原像篩](#def-catb5-08-local-surjective)の定義では、$1(X)$ の唯一の元が制限先で原像を持つのは $H(O)$ が非空の場合である。従って $X$ 上の原像篩は $\varnothing,W,U$ からの包含射である。始域の合併は $U$ であり $X$ でないので被覆ではない。

一般の $O$ では原像篩の始域の合併は $O\cap U$。これは $O\subseteq U$ のときだけ $O$ に一致する。[層の局所像とエピ射の判定](#thm-catb5-08-sheaf-image)から像は $H$ 自身の包含であり、成分は $\varnothing,W,U$ で一元集合、$V,X$ で空集合である。
<!-- solution-end -->

### CATB5-08-B01 エピ射を経由する像

- Level: B

初等トポスで $d:A\to B$ がエピ射、$g:B\to C$ が任意の射とする。$gd$ の像と $g$ の像が同じ部分対象であることを、像の最小性と分類射だけから示せ。

<!-- solution-start -->
**詳細解答**

$g$ がモノ射 $m:M\to C$ を経由すれば $gd$ もそれを経由する。

逆に $gd$ が $m$ を経由するとする。[部分対象分類子](../CATB5-06/index.md#def-catb5-06-classifier)による $m$ の分類射を $\chi_m:C\to\Omega$ とすれば

$$
\chi_m gd=t_A=t_Bd.
$$

$d$ はエピ射なので右から消去して $\chi_m g=t_B$ を得る。分類子の引き戻しの普遍性より $g$ も $m$ を経由する。

よって両射が経由する部分対象の集合は同じである。[初等トポスの像分解](#thm-catb5-08-image)の最小性により双方の像が互いを経由し、同じ部分対象を表す。
<!-- solution-end -->

### CATB5-08-B02 局所全射を引き戻す

- Level: B

小site上の層の局所全射 $f:F\to G$ と層の射 $g:H\to G$ を取る。$P=F\times_G H$ とする。$P\to H$ が局所全射であることを、一般のトポスの引き戻し安定性を使わず原像篩で示せ。

<!-- solution-start -->
**詳細解答**

[層の極限の点ごとの構成](../CATB5-05/index.md#thm-catb5-05-sheaf-limits)より

$$
P(U)=\{(x,y)\in F(U)\times H(U)\mid f_U(x)=g_U(y)\}.
$$

$y\in H(U)$ を取る。射 $r:V\to U$ に沿った $H(r)y$ が射影 $P(V)\to H(V)$ の値になる条件は、ある $x\in F(V)$ について

$$
f_V(x)=g_V(H(r)y)=G(r)(g_U(y))
$$

が成立することである。二番目の等号は $g$ の自然性による。

従って射影の $y$ に対する原像篩は、$f$ の $g_U(y)$ に対する原像篩と完全に一致する。$f$ は[局所全射](#def-catb5-08-local-surjective)だから後者は被覆篩である。任意の $U,y$ について成立するので射影も局所全射である。
<!-- solution-end -->

### CATB5-08-B03 関係を同一視する射を降ろす

- Level: B

初等トポスのエピ射 $e:A\to B$ と $h:A\to Z$ が、$e$ の核対の二射影 $r_1,r_2$ に対し $hr_1=hr_2$ を満たす。$\langle e,h\rangle$ の像 $G\hookrightarrow B\times Z$ の射影 $p:G\to B$ がモノ射であることを、$G\times_B G$ 上で示せ。

<!-- solution-start -->
**詳細解答**

[初等トポスの像分解](#thm-catb5-08-image)によるエピ射を $d:A\to G$、像の包含を $i:G\to B\times Z$、もう一つの射影を $q=\pi_Zi:G\to Z$ とする。$pd=e$、$qd=h$ である。

$T=G\times_B G$ の射影を $u,v:T\to G$ とする。$d$ を $u$ に沿って引き戻し、$s:T_1\to T$ と $a:T_1\to A$ を得る。次に $d$ を $vs$ に沿って引き戻し、$w:T_2\to T_1$ と $b:T_2\to A$ を得る。

[初等トポスのエピ射の引き戻し安定性](#thm-catb5-08-epi-pullback)より $s,w$ はエピ射であり、[エピ射の合成閉性](../../CAT/CAT1-03/index.md#prop-cat1-03-composition)より $sw$ もエピ射である。引き戻しの等式は

$$
daw=usw,\qquad db=vsw.
$$

$pu=pv$ と $pd=e$ より

$$
eaw=pdaw=pusw=pvsw=pdb=eb.
$$

[核対](../CATB1-01/index.md#def-catb1-01-kernel-pair)の普遍性で $r_1z=aw,\ r_2z=b$ となる $z:T_2\to A\times_B A$ が存在する。仮定 $hr_1=hr_2$ と $qd=h$ より

$$
qusw=haw=hr_1z=hr_2z=hb=qvsw.
$$

第一成分 $pusw=pvsw$ も等しいので、積の普遍性より $iusw=ivsw$。$i$ のモノ射性から $usw=vsw$。

$sw$ を右消去すれば $u=v$ である。任意の二射 $x,y:L\to G$ が $px=py$ を満たすとき、引き戻しの普遍性から $u\ell=x,\ v\ell=y$ となる $\ell:L\to T$ が存在する。$u=v$ より $x=y$。これが $p$ のモノ射性である。
<!-- solution-end -->

### CATB5-08-B04 前層の商と層の商の違い

- Level: B

第7節と同じく $X=\{a,b,c\}$ の開集合を $\varnothing,W=\{b\},U=\{a,b\},V=\{b,c\},X$ とする。各開集合 $O$ に、値0の領域が $U$ に、値1の領域が $V$ に含まれる局所定数写像 $O\to\{0,1\}$ の集合 $F(O)$ を割り当てる層 $F$ を取る。$F(O)$ の全関係（全ての二元の組が関係する同値関係）による成分商 $Q_0(O)$ を求めよ。$Q_0$ が層でないことと、その層化が終対象の層になることを示せ。

<!-- solution-start -->
**詳細解答**

全関係は $F(O)\times F(O)$ なので、$F(O)$ が非空なら全ての元が一つの類に入り、空なら類は存在しない。

従って $Q_0(\varnothing),Q_0(W),Q_0(U),Q_0(V)$ は一元集合、$Q_0(X)$ は空集合である。$U,V$ 上の唯一の元は $W$ 上の唯一の元へ制限されるため整合するが、$X$ 上に貼り合わせはない。

第7節で $F\to1$ が局所全射であることを確認した。[層の局所像とエピ射の判定](#thm-catb5-08-sheaf-image)によりエピ射であり、[初等トポスのエピ射の正則性](#thm-catb5-08-epi-regular)により核対の余等化子である。その核対は $F\times F$ である。

[層の同値関係の商の構成](#thm-catb5-08-sheaf-quotient)から $F\to aQ_0$ も同じ二射影の余等化子である。二つの普遍性により互いに商射と可換する射が一意に存在し、合成は恒等射と同じ可換条件を持つので恒等射になる。従って $aQ_0\cong1$。
<!-- solution-end -->

### CATB5-08-C01 商と引き戻しを接続する

- Level: C

初等トポスの対象 $X$ の内部同値関係 $R$ と、その商 $q:X\to Q$ を取る。任意の $u:W\to Q$ について $P=X\times_Q W$、射影 $p:P\to W$ とする。

1. $p$ が正則エピ射であることを示せ。
2. $p$ の核対が $R\times_Q W$ と同型であることを示せ。ここで $R\to Q$ は $qr_1=qr_2$ で定める。
3. $p$ がこの関係の二射影の余等化子であることを示せ。

<!-- solution-start -->
**詳細解答**

(1) [初等トポスのBarr-正確性](#thm-catb5-08-exact)により $q$ は $R$ の二射影の余等化子である。[正則エピ射](../CATB1-01/index.md#def-catb1-01-regular-epi)の定義より $q$ は正則エピ射でありエピ射でもある。

[初等トポスのエピ射の引き戻し安定性](#thm-catb5-08-epi-pullback)を $q,u$ に適用して $p$ はエピ射を得る。[初等トポスのエピ射の正則性](#thm-catb5-08-epi-regular)より正則エピ射である。

(2) $P$ の $X$ への射影を $a:P\to X$ とし、$qa=up$ と書く。

任意の $T$ から $p$ の核対への射は、$v,v':T\to P$ で $pv=pv'$ を満たす二射に対応する。この二射から $x=av$、$x'=av'$、$w=pv=pv'$ を得る。

引き戻しの等式から

$$
qx=qav=upv=uw=upv'=qav'=qx'.
$$

[初等トポスのBarr-正確性](#thm-catb5-08-exact)より $R$ は $q$ の核対なので $r_1z=x$、$r_2z=x'$ となる $z:T\to R$ が一意に存在する。$qr_1z=uw$ だから $(z,w)$ は $R\times_Q W$ への射を一意に定める。

逆に $z:T\to R,\ w:T\to W$ が $qr_1z=uw$ を満たすとする。$qr_2z=qr_1z$ なので二つの組 $(r_1z,w),(r_2z,w)$ がそれぞれ $P$ への射 $v,v'$ を定める。両者の $W$ 成分は $w$ なので $pv=pv'$。

二つの操作を続けると、$X,W$ の成分と $R$ の二成分が元へ戻る。引き戻しと核対の一意性から、これらの対応は互いに逆である。特にそれぞれの対象自身の恒等射に対応する射を取れば、二対象は同型となる。

(3) (1)のエピ射性に[初等トポスのエピ射の正則性](#thm-catb5-08-epi-regular)を適用すれば、$p$ は自身の核対の余等化子である。(2)の同型は二射影を保存するため、$R\times_Q W$ の二射影の余等化子でもある。

従って関係を商にしてから引き戻した結果は、引き戻した関係を商にした結果と一致する。
<!-- solution-end -->

## 10. まとめ

- 冪対象で部分対象の族を表し、二段の等化子で像を構成できる。
- [ファイバー包含条件の表現](#lem-catb5-08-fiber-condition)によりエピ射が引き戻しで保たれ、像分解と核対からその正則性が従う。
- 関係の分類射を転置して同値類の族を作れば、初等トポスの同値関係は商の核対として復元できる。
- 層ではエピ射は局所全射に対応し、点ごとの全射とは異なる。層の商は成分商を層化して得られる。

次は層圏の間の写像を、有限極限を保つ逆像とその右随伴によって表す。
