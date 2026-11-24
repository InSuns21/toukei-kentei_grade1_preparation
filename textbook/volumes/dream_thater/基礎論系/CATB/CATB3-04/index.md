# CATB3-04 正則基数とλ-表示対象

## 1. 有限から可算へ

有限集合から余極限への写像は一つの段階に戻せた（[集合の有限表示性](../CATB3-02/index.md#thm-catb3-02-set)）。自然数全体から自然数全体への恒等写像は、有限初期区間のどれも経由しない。しかし段階の側が可算個のデータまで一度に集められるなら、自然数全体からの写像も一段階で作れるはずである。

そこで、許すデータの個数を基数で指定し、その個数に対応する合流条件と対象の表示性を定める。以下は選択公理を仮定し、集合は固定した宇宙内で、添字圏は小さいものとして扱う。

## 2. 正則性：小さいものを小さい個数だけ集める

[基数・初期順序数](../../SET/SET6/index.md#def-set6-cardinal)は集合の大きさの代表である。選択公理のもとで任意の集合は整列可能なので、[整列可能な集合の基数](../../SET/SET6/index.md#def-set6-cardinality-wellorderable)を $|S|$ と書ける。$|S|<\lambda$ は基数としての厳密な不等号であり、$\lambda=\aleph_0$ なら有限、$\lambda=\aleph_1$ なら高々可算という意味になる。ここで $\aleph_0$ は最小の無限基数、$\aleph_1$ はその[次の基数](../../SET/SET7/index.md#cor-set7-successor-cardinal)である。

小さい部分集合を合併しても引き続き小さい、という性質を以下の意味で正則性と呼ぶ。

<a id="def-catb3-04-regular"></a>

<!-- formal-statement-start -->
> **定義（正則基数）**
>
> 無限基数 $\lambda$ が正則であるとは、任意の集合 $A$ と集合族 $(S_a)_{a\in A}$ について、次の含意が成立することをいう。

$$
|A|<\lambda,\quad
(\forall a\in A)\ |S_a|<\lambda
\quad\Longrightarrow\quad
\left|\bigcup_{a\in A}S_a\right|<\lambda.
$$
<!-- formal-statement-end -->

<!-- definition-example-start: def-catb3-04-regular -->
**定義の確認。** $\aleph_0$ について、$A$ は有限集合であり、各 $S_a$ も有限集合である。合併の元の個数は

$$
\left|\bigcup_{a\in A} S_a\right|
\leq \sum_{a\in A}|S_a|
$$

で上から抑えられ、右辺は有限である。空族なら合併は空集合である。従って $\aleph_0$ は無限基数で、正則性の条件を満たす。

$\aleph_1$ についても確認する。空族は自明なので $A$ が非空で高々可算とする。単射 $j:A\to\mathbb N$ と、各 $a$ に対する単射 $e_a:S_a\to\mathbb N$ を選ぶ（単射の族の選択に選択公理を使う）。合併に属する $x$ に対して、$x\in S_a$ となる $a$ のうち $j(a)$ が最小のものを $a(x)$ とする。

$$
x\longmapsto (j(a(x)),e_{a(x)}(x))
$$

は $\mathbb N\times\mathbb N$ への単射である。二成分が等しければ最初の成分から同じ添字、次の成分から同じ元と分かる。自然数の対は対角線順に列挙できるので高々可算であり、合併も高々可算である。従って $\aleph_1$ も正則である。
<!-- definition-example-end -->

対照的に、$\kappa_0<\kappa_1<\cdots$ を無限基数の狭義増加列とし、$\kappa=\sup_n\kappa_n$ とする。順序数としての和集合 $\bigcup_n\kappa_n$ が $\kappa$ であり、これは基数でもある。実際、$\alpha<\kappa$ ならある $n$ で $\alpha<\kappa_n$。もし $\alpha$ と $\kappa$ が全単射なら $\kappa_n\subseteq\kappa$ から $\kappa_n$ が $\alpha$ に単射でき、[基数の順序と単射](../../SET/SET6/index.md#thm-set6-cardinal-injection-order)および初期順序数の性質に反する。

ここでは $|\mathbb N|<\kappa$ かつ各 $|\kappa_n|<\kappa$ だが

$$
\left|\bigcup_n\kappa_n\right|=\kappa
$$

となる。このように正則でない無限基数を特異基数という。有限個の合併が小さいという事実だけでは一般の基数に対する正則性を保証しない。

## 3. λ個未満のデータを合流させる

[フィルター性の有限図式による特徴付け](../CATB3-01/index.md#thm-catb3-01-finite-cocones)では、有限個の対象と射からなる図式に余錐が存在することが重要だった。有限という制約を置き換える。圏 $J$ の射全体を $\operatorname{Mor}J$ と書く。各対象の恒等射が相異なるため、射集合の基数が $\lambda$ 未満なら対象集合の基数も $\lambda$ 未満である。

<a id="def-catb3-04-filtered"></a>

<!-- formal-statement-start -->
> **定義（λ-フィルター圏）**
>
> 正則無限基数 $\lambda$ と小さい圏 $I$ に対し、$I$ が λ-フィルター圏であるとは、任意の小さい圏 $J$ で $|\operatorname{Mor}J|<\lambda$ を満たすもの、および任意の関手 $E:J\to I$ に対して、$E$ が $I$ 内に余錐を持つことをいう。
<!-- formal-statement-end -->

<!-- definition-example-start: def-catb3-04-filtered -->
**定義の確認。** 集合 $X$ の高々可算な部分集合を対象とする包含順序圏を考える。これは冪集合の部分集合を対象とし、各二対象間の射は高々一本だから小さい。$\lambda=\aleph_1$ とし、射が高々可算な任意の図式 $E:J\to I$ を取る。対象も高々可算なので、$U=\bigcup_{a\in\operatorname{Ob}J}E(a)$ は[正則性](#def-catb3-04-regular)により高々可算で、空図式なら $U=\varnothing$ である。各 $E(a)\subseteq U$ が脚を与える。射 $u:a\to b$ に対し $E(a)\subseteq E(b)\subseteq U$ であり、二つの合成経路は同じ包含だから余錐の整合性を満たす。全ての図式に対し条件が成立する。
<!-- definition-example-end -->

図式の添字圏が λ-フィルター圏である余極限を λ-フィルター余極限と呼ぶ。特に $\lambda=\aleph_0$ の場合は前講までの[フィルター余極限](../CATB3-01/index.md#def-catb3-01-filtered-colimit)と一致する。一般の $\lambda$ でも有限圏の射の個数は $\lambda$ 未満なので、λ-フィルター圏はフィルター圏である。

任意の前順序圏では、余錐の脚があれば整合性は自動的である。従って λ-フィルター性は「$\lambda$ 個未満の任意の対象族に共通上界がある」ことと同値である。逆向きの確認には、その対象族を恒等射だけの離散圏からの図式にすればよい。空族も含むため非空性が要求される。

一般に集合 $X$ に対して

$$
[X]^{<\lambda}=\{S\subseteq X:|S|<\lambda\}
$$

を包含順序で圏にすると、正則性によって任意の $\lambda$ 個未満の対象の合併が上界になる。よって λ-フィルター圏である。先ほどの増加列の例で $\lambda$ を特異基数 $\kappa$ に置き換えると、部分集合 $\kappa_n$ の可算族に上界がない。上界があればその合併 $\kappa$ を含むが、上界の大きさは $\kappa$ 未満でなければならないからである。

### 同じ段階で多数の等式を成立させる

集合値の図式 $D:I\to\mathbf{Set}$ の余極限を $X$、構造写像を $c_i:D_i\to X$ と書く。λ-フィルター圏は通常のフィルター圏でもあるので、[有限データの段階表示](../CATB1-08/index.md#lem-catb1-08-finite-witness)が使える。特に全ての元は $c_i(x)$ と表せ、二つの代表は共通段階で等しければ、かつそのときに限り、余極限で等しい。

<a id="lem-catb3-04-simultaneous"></a>

<!-- formal-statement-start -->
> **補題（λ個未満の等式の同時実現）**
>
> 正則無限基数 $\lambda$、小さい λ-フィルター圏 $I$、図式 $D:I\to\mathbf{Set}$ を取る。段階 $i$ と添字集合 $A$ で $|A|<\lambda$ を満たすものを固定する。各 $a\in A$ に対して $x_a,y_a\in D_i$ が余極限で $c_i(x_a)=c_i(y_a)$ を満たすなら、ある一つの射 $h:i\to k$ が存在し、全ての $a$ に対して次が成立する。

$$
D(h)(x_a)=D(h)(y_a).
$$
<!-- formal-statement-end -->

見取り図：等式ごとの実現先を先に選び、その移行射を含む星形図式に余錐を取る。個別の移行射を単に共通の終域へ送るだけでなく、始域からの合成も一致させることが重要である。

<!-- proof-start -->
### 証明

[同一段階での等号判定](../CATB3-01/index.md#ref-catb3-01-same-stage)により、各 $a$ に対して $h_a:i\to k_a$ を選び、

$$
D(h_a)(x_a)=D(h_a)(y_a)
$$

とできる。

中心対象 $*$ と、各 $a\in A$ に対する別々の対象 $v_a$ を用意し、非恒等射を $u_a:*\to v_a$ だけとする圏 $J$ を作る。非恒等射同士は合成できず、恒等射の合成だけを定めれば圏になる。その射集合は $1+2|A|$ 個で、有限個の $\lambda$ 未満の集合の合併だから[正則性](#def-catb3-04-regular)により $\lambda$ 未満である。

$E(*)=i$、$E(v_a)=k_a$、$E(u_a)=h_a$ と置けば関手となる。[λ-フィルター性](#def-catb3-04-filtered)により余錐が存在し、中心からの脚を $h:i\to k$、葉からの脚を $q_a:k_a\to k$ とすれば余錐条件は $q_a h_a=h$ である。

従って各 $a$ について

$$
\begin{gathered}
D(h)(x_a)=D(q_a)D(h_a)(x_a),\\
D(h)(y_a)=D(q_a)D(h_a)(y_a).
\end{gathered}
$$

右辺が等しいので結論を得る。空族の場合も中心だけの図式となり、恒等射を選べばよい。
<!-- proof-end -->

この方法では無限個の等式を順に処理して「最後の段階」があると仮定する必要がない。可算個の等式なら $\aleph_1$-フィルター性で全てを同時に成立させられる。

## 4. Hom が λ-フィルター余極限を保存する

[局所小圏](../../CAT/CAT1-02/index.md#def-cat1-02-size) $\mathcal C$ で対象 $P$ を固定する。$\mathcal C(P,-)$ は $P$ から出る射の集合を取り、移行射 $u$ に後合成する関手である。図式 $D:I\to\mathcal C$ の余極限を $(X,c_i)$ とすると、余錐条件 $c_jD(u)=c_i$ により、段階の射 $f:P\to D_i$ を $c_if$ に送る写像族は整合する。[余極限の普遍性](../../CAT/CAT2-05/index.md#def-cat2-05-colimit)によって次の比較写像が定まる。

$$
\theta:\operatorname{colim}_i\mathcal C(P,D_i)
\longrightarrow \mathcal C(P,X).
$$

有限表示対象の場合と同様、この写像が全単射となることを要求するが、試す図式を λ-フィルター図式に限定する。

<a id="def-catb3-04-presentable"></a>

<!-- formal-statement-start -->
> **定義（λ-表示対象）**
>
> 正則無限基数 $\lambda$ と、全ての小さい λ-フィルター余極限を持つ局所小圏 $\mathcal C$ を取る。対象 $P$ が λ-表示対象であるとは、任意の小さい λ-フィルター圏 $I$ と図式 $D:I\to\mathcal C$ に対し、余極限 $(X,c_i)$ から得られる比較写像

$$
\theta:\operatorname{colim}_i\mathcal C(P,D_i)
\longrightarrow \mathcal C(P,X),
\qquad [i,f]\longmapsto c_i f
$$

> が全単射であることをいう。
<!-- formal-statement-end -->

<!-- definition-example-start: def-catb3-04-presentable -->
**定義の確認。** $\lambda=\aleph_1$ として $P=\mathbb N$ を集合の圏の対象とする。集合間の写像全体は集合であり、集合の圏は[小さい余極限を持つ](../../CAT/CAT2-05/index.md#thm-cat2-05-cocompleteness)。任意の小さい $\aleph_1$-フィルター図式の余極限への写像 $g:\mathbb N\to X$ を取る。各 $g(n)$ の代表 $x_n\in D_{i_n}$ を選ぶ。可算個の対象 $i_n$ を離散図式にすると[λ-フィルター性](#def-catb3-04-filtered)により共通段階 $k$ と脚 $p_n:i_n\to k$ が得られる。

$$
f(n)=D(p_n)(x_n)
$$

と置けば $c_k f(n)=g(n)$ が全ての $n$ で成立する。従って $\theta$ は全射である。

二つの代表 $[i,f],[j,f']$ の像が等しいとする。共通段階 $k$ への射 $p:i\to k,q:j\to k$ を選ぶと、各 $n$ について $D(p)f(n)$ と $D(q)f'(n)$ の余極限での像が等しい。[λ個未満の等式の同時実現](#lem-catb3-04-simultaneous)により一つの射 $h:k\to m$ で全ての値を一致させられる。

$$
D(hp)f=D(hq)f'.
$$

[有限データの段階表示](../CATB1-08/index.md#lem-catb1-08-finite-witness)を Hom の集合値図式に適用すると二つの代表が等しい。従って $\theta$ は単射でもあり、任意の図式について条件が成立する。
<!-- definition-example-end -->

この $P$ は有限表示対象ではない。有限初期区間の包含図式では恒等写像が一つの段階に戻らないからである。試す図式の種類を少なくすると、表示対象の範囲は広がる。

<a id="prop-catb3-04-stage"></a>

<!-- formal-statement-start -->
> **命題（λ-表示性の段階判定）**
>
> 正則無限基数 $\lambda$ と全ての小さい λ-フィルター余極限を持つ局所小圏 $\mathcal C$ において、対象 $P$ が λ-表示対象であることと、任意の小さい λ-フィルター図式 $D:I\to\mathcal C$ の余極限 $(X,c_i)$ について次の条件が成立することは同値である。
>
> 1. 任意の射 $g:P\to X$ はある $i$ と射 $f:P\to D_i$ によって $g=c_i f$ と書ける。
> 2. 射 $f:P\to D_i,f':P\to D_j$ が $c_i f=c_j f'$ を満たすなら、ある $k$ と射 $p:i\to k,q:j\to k$ で $D(p)f=D(q)f'$ が成立する。
<!-- formal-statement-end -->

<!-- proof-start -->
### 証明

[λ-表示対象の定義](#def-catb3-04-presentable)の比較写像の始域は集合のフィルター余極限なので、[有限データの段階表示](../CATB1-08/index.md#lem-catb1-08-finite-witness)により全ての元は $[i,f]$ と表される。従って比較写像の全射性は第1条件そのものである。同じ補題を Hom の集合値図式に適用すると、代表の等号は共通段階での等号と同値である。

$$
[i,f]=[j,f']
\iff
\exists k,p,q:\ D(p)f=D(q)f'.
$$

比較写像による像の等号は $c_if=c_jf'$ であるから、単射性は第2条件と同値である。両方が成立することと全単射性が同値なので結論を得る。
<!-- proof-end -->

## 5. 集合の大きさによる特徴付け

<a id="thm-catb3-04-set"></a>

<!-- formal-statement-start -->
> **定理（集合のλ-表示性）**
>
> 正則無限基数 $\lambda$ に対し、集合と写像の圏 $\mathbf{Set}$ の対象 $P$ が λ-表示対象であることと $|P|<\lambda$ であることは同値である。
<!-- formal-statement-end -->

見取り図：小さい集合からの写像は小さい個数の値で決まる。値の代表を一段階へ運び、二射の等号も一段階へ戻す。逆向きでは小さい部分集合の包含図式に恒等写像を戻す。

<!-- proof-start -->
### 証明

$|P|<\lambda$ とする。任意の小さい λ-フィルター図式 $D:I\to\mathbf{Set}$ と余極限 $(X,c_i)$ を取る。射 $g:P\to X$ に対して、各 $s\in P$ の像の代表 $x_s\in D_{i_s}$ を[有限データの段階表示](../CATB1-08/index.md#lem-catb1-08-finite-witness)で選ぶ。対象集合 $P$ の離散圏は恒等射だけを持つため射集合の基数が $\lambda$ 未満である。これを $s\mapsto i_s$ と写す図式に余錐を取れば、共通段階 $k$ と脚 $p_s:i_s\to k$ が存在する。

$$
f:P\to D_k,\qquad f(s)=D(p_s)(x_s)
$$

と定めると $c_k f(s)=c_{i_s}(x_s)=g(s)$。全ての元で一致するので $c_k f=g$ である。$P$ が空でも空図式の余錐によって段階が選べ、空写像で同じ結論となる。

二射 $f:P\to D_i,f':P\to D_j$ が $c_i f=c_jf'$ を満たすとする。共通段階 $k$ への射 $p,q$ を取る。各 $s\in P$ で $c_kD(p)f(s)=c_kD(q)f'(s)$ が成り立つ。[λ個未満の等式の同時実現](#lem-catb3-04-simultaneous)により、一つの $h:k\to m$ で

$$
D(h)D(p)f(s)=D(h)D(q)f'(s)
$$

が全ての $s$ で成立する。従って $D(hp)f=D(hq)f'$。空集合の場合も二つの空写像は一致する。[段階判定](#prop-catb3-04-stage)の二条件が得られ、$P$ は λ-表示対象である。

逆に $P$ が λ-表示対象とする。小さい順序圏 $I=[P]^{<\lambda}$ は[正則性](#def-catb3-04-regular)によって λ-フィルター圏である。包含図式 $S\mapsto S$ の余極限は $P$ となる。構造写像を $\iota_S:S\to P$ とすると、任意の整合する余錐 $b_S:S\to Y$ に対し

$$
b(s)=b_{\{s\}}(s)
$$

で写像 $b:P\to Y$ を定められる。単集合は小さく、$s\in S$ なら $\{s\}\subseteq S$ から $b(s)=b_S(s)$。従って $b\iota_S=b_S$。別の媒介写像も単集合上で同じ値を取るから一意である。$P$ が空の場合も空写像は一意である。

[段階判定](#prop-catb3-04-stage)の第1条件を恒等写像 $1_P$ に適用する。ある $S\in I$ と $f:P\to S$ により

$$
\iota_S f=1_P
$$

となる。任意の $s\in P$ は $f(s)$ の包含像なので $S$ に属する。よって $P=S$ であり $|P|<\lambda$ となる。
<!-- proof-end -->

### 基数を大きくすると何が起きるか

正則無限基数 $\lambda\leq\mu$ を取る。$\mu$-フィルター圏は $\lambda$ 個未満の射を持つ図式についても余錐を持つので λ-フィルター圏である。全ての小さい λ-フィルター余極限を持つ局所小圏では、λ-表示対象の Hom はその一部である全ての小さい $\mu$-フィルター余極限も保存する。従って λ-表示対象は $\mu$-表示対象となる。逆は集合 $P=\mathbb N$ と $\lambda=\aleph_0,\mu=\aleph_1$ の例により成立しない。

## 6. 演習

### CATB3-04-A01 有限の合併

- Level: A

$\lambda=\aleph_0$、$S_0=\{a,b\}$、$S_1=\{b,c\}$、$S_2=\varnothing$ とする。添字の大きさ、各集合の大きさ、合併の大きさを求め、正則性の含意を具体的に確認せよ。

<!-- solution-start -->
**詳細解答。** 添字集合は $\{0,1,2\}$ で3個、各集合の大きさは順に2、2、0である。合併は $\{a,b,c\}$ で3個になる。全ての個数が有限なので $\aleph_0$ 未満であり、[正則性](#def-catb3-04-regular)の仮定と結論の双方を確認できた。重複する $b$ があるので個数の和4は上界であって合併の個数そのものではない。
<!-- solution-end -->

### CATB3-04-A02 自然数の段階

- Level: A

自然数の通常の順序圏がフィルター圏だが $\aleph_1$-フィルター圏ではないことを示せ。

<!-- solution-start -->
**詳細解答。** 任意の有限非空族の最大値が共通上界となり、空族には任意の自然数を選べる。平行射は高々一本である。従って[λ-フィルター性](#def-catb3-04-filtered)で $\lambda=\aleph_0$ の条件を満たす。一方、全ての自然数を対象とする離散圏から各自然数をそのまま送る図式の射集合は可算で $\aleph_1$ 未満である。余錐の頂点 $k$ があれば全ての $n$ で $n\le k$ となるが $k+1\le k$ は成立しない。従ってこの図式には余錐がない。
<!-- solution-end -->

### CATB3-04-A03 共通上界の構成

- Level: A

$X=\mathbb N\times\mathbb N$ とし、$S_n=\{n\}\times\mathbb N$ とする。$[X]^{<\aleph_1}$ において全ての $S_n$ の共通上界を求めよ。

<!-- solution-start -->
**詳細解答。** $m\mapsto(n,m)$ は自然数から $S_n$ への全単射なので各 $S_n$ は可算である。添字 $n$ も可算であり、[正則性](#def-catb3-04-regular)により合併 $U=\bigcup_n S_n$ も高々可算である。任意の $(n,m)\in X$ は $S_n$ に含まれるため $U=X$。従って $X$ 自体がこの順序圏の対象であり、全ての包含 $S_n\subseteq X$ が余錐の脚を与える。
<!-- solution-end -->

### CATB3-04-A04 基数による判定

- Level: A

集合の圏における空集合、三元集合、自然数全体、基数 $\aleph_1$ の集合のそれぞれについて、$\aleph_0$-表示対象および $\aleph_1$-表示対象かを判定せよ。

<!-- solution-start -->
**詳細解答。** [集合のλ-表示性](#thm-catb3-04-set)では基数との厳密な不等号が条件である。空集合と三元集合の基数は0と3であり、どちらも両基数より小さいから両方で表示対象となる。自然数全体は基数 $\aleph_0$ であり $\aleph_0<\aleph_1$ だが $\aleph_0<\aleph_0$ ではないので $\aleph_1$-表示対象だけとなる。基数 $\aleph_1$ の集合はどちらよりも真に小さくないので、いずれでも表示対象ではない。
<!-- solution-end -->

### CATB3-04-B01 経路の一致が必要な理由

- Level: B

段階 $i$ にある二元の等式をそれぞれ射 $h_1:i\to k_1,h_2:i\to k_2$ で成立させたとする。星形図式への余錐によって一つの射で両等式を成立させる手順を示せ。

<!-- solution-start -->
**詳細解答。** 二つの等式を $D(h_a)(x_a)=D(h_a)(y_a)$ と書く。中心と二つの葉を持つ圏は恒等射3本と中心からの射2本を持つため射集合の基数は5である。無限基数 $\lambda$ より小さいので[λ-フィルター性](#def-catb3-04-filtered)を適用できる。余錐の脚を $h:i\to k$、$q_a:k_a\to k$ と取れば $q_ah_a=h$。従って

$$
D(h)(x_a)=D(q_a)D(h_a)(x_a)
=D(q_a)D(h_a)(y_a)=D(h)(y_a).
$$

$a=1,2$ の両方で同じ $h$ が使える。ただ終域を揃えただけでは $q_1h_1$ と $q_2h_2$ が同じ射になるとは限らない。余錐条件がその不足を埋める。
<!-- solution-end -->

### CATB3-04-B02 特異基数では上界が失われる

- Level: B

第2節の増加列 $\kappa_n$ とその上限 $\kappa$ を取る。集合 $\kappa$ の $\kappa$ 未満の部分集合の包含順序圏について、可算個の対象に共通上界があるとは限らないことを示せ。

<!-- solution-start -->
**詳細解答。** $S_n=\kappa_n\subseteq\kappa$ とすれば各 $|S_n|=\kappa_n<\kappa$。添字集合の大きさは $\aleph_0<\kappa$ である。もし共通上界 $T$ があれば全ての $n$ で $S_n\subseteq T$ なので

$$
\kappa=\bigcup_n S_n\subseteq T\subseteq\kappa.
$$

従って $T=\kappa$ となるが、対象の条件 $|T|<\kappa$ に反する。正則な基数での部分集合図式の合流の証明は、この合併を再び対象として使えることに依存している。
<!-- solution-end -->

### CATB3-04-B03 大きな基数への移行

- Level: B

正則無限基数 $\lambda\leq\mu$ と、全ての小さい λ-フィルター余極限を持つ局所小圏 $\mathcal C$ を取る。λ-表示対象 $P$ が $\mu$-表示対象であることを段階判定から示せ。

<!-- solution-start -->
**詳細解答。** 任意の小さい $\mu$-フィルター圏 $I$ を取る。射集合の大きさが $\lambda$ 未満の圏 $J$ は $\mu$ 未満でもあるので、任意の図式 $J\to I$ が余錐を持つ。従って $I$ は λ-フィルター圏でもある。任意の図式 $D:I\to\mathcal C$ の余極限は仮定により存在する。$P$ の[λ-表示性の段階判定](#prop-catb3-04-stage)をこの図式に適用できるため、任意の射は一段階を経由し、像が等しい二射は共通段階で等しくなる。全ての $\mu$-フィルター図式について二条件が成立するので、同じ判定を $\mu$ に適用して結論を得る。
<!-- solution-end -->

### CATB3-04-C01 積と余極限の交換

- Level: C

正則無限基数 $\lambda$、小さい λ-フィルター圏 $I$、集合 $A$ で $|A|<\lambda$ を満たすものを取る。各 $a\in A$ について集合値図式 $D^a:I\to\mathbf{Set}$ を与える。次の比較写像が全単射となることを証明し、$A=\mathbb N$、$I=\mathbb N$ の通常の順序圏でこの結論が失敗する図式を構成せよ。

$$
\Phi:\operatorname{colim}_i\prod_{a\in A}D^a_i
\longrightarrow
\prod_{a\in A}\operatorname{colim}_i D^a_i.
$$

<!-- solution-start -->
**詳細解答。** 各余極限を $X_a$、構造写像を $c_{i,a}$ とする。段階の積の移行写像は各成分に $D^a(p)$ を作用させる。恒等射と合成が成分ごとに保たれるので図式を定める。構造写像を成分ごとに作用させる写像族は整合するため、余極限の普遍性で

$$
\Phi([i,(x_a)_a])=(c_{i,a}(x_a))_a
$$

が定まる。

全射性を示す。右辺の組 $(y_a)_a$ を取る。各 $y_a$ の代表 $x_a\in D^a_{i_a}$ を選ぶ。離散図式 $a\mapsto i_a$ の射数は $\lambda$ 未満なので、[λ-フィルター性](#def-catb3-04-filtered)によって脚 $p_a:i_a\to k$ を取れる。$z_a=D^a(p_a)(x_a)$ と置けば各 $c_{k,a}(z_a)=y_a$ なので $\Phi([k,(z_a)_a])=(y_a)_a$ となる。空族でも非空の $I$ から段階を選び、空の組を取ればよい。

単射性を示す。二代表 $[i,(x_a)_a]$ と $[j,(x'_a)_a]$ の像が等しいとする。共通段階 $k$ への射 $p,q$ を選び、$z_a=D^a(p)(x_a)$、$w_a=D^a(q)(x'_a)$ と置く。各 $a$ で $c_{k,a}(z_a)=c_{k,a}(w_a)$ だから、[同一段階での等号判定](../CATB3-01/index.md#ref-catb3-01-same-stage)を個々の図式 $D^a$ に適用して射 $h_a:k\to k_a$ を選ぶ。

$$
D^a(h_a)(z_a)=D^a(h_a)(w_a).
$$

[同時実現の補題の星形図式](#lem-catb3-04-simultaneous)と同じく、中心 $k$、葉 $k_a$、射 $h_a$ の図式は $\lambda$ 未満の射しか持たない。余錐の脚 $h:k\to m$、$q_a:k_a\to m$ は $h=q_ah_a$ を満たす。従って

$$
D^a(h)(z_a)=D^a(h)(w_a)
$$

が全成分で成り立つ。積の二代表は共通段階 $m$ への射 $hp,hq$ で一致する。[有限データの段階表示](../CATB1-08/index.md#lem-catb1-08-finite-witness)を積の図式に適用すれば元の代表は等しい。空積でも共通段階で空の組は一致する。よって比較写像は全単射である。

反例として全ての $a\in\mathbb N$ について $D^a_i=\{0,\ldots,i\}$、移行写像を包含とする。各成分の余極限は非負整数全体である。右辺は全ての自然数列を含み、特に列 $(a)_{a\in\mathbb N}$ を含む。一方、左辺の代表はある固定された $i$ で全成分が $i$ 以下の組である。その像の第 $i+1$ 成分も $i$ 以下だから、列 $(a)_a$ にはならない。従って比較写像は全射でない。$\aleph_1$ に対してこの添字圏は λ-フィルター性を満たさず、$\aleph_0$ に対しては積の添字の大きさが $\lambda$ 未満でない。いずれの選択でも定理の仮定から外れている。
<!-- solution-end -->

## 7. 次に向けて

有限という制約を正則無限基数で置き換えることで、合流できるデータの個数と、Hom が余極限を保存する対象の範囲を同時に調整できた。次講では λ-表示対象を小さい材料の集合として固定し、λ-フィルター余極限で圏全体を生成するという条件を扱う。
