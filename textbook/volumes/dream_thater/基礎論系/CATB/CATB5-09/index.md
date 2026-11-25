# CATB5-09 幾何学的射

<!-- definition-example-audit: strict -->

## 1. 空間の写像を層の圏の写像へ

前講の[初等トポスのBarr-正確性](../CATB5-08/index.md#thm-catb5-08-exact)により、一つのトポスの中で像や同値関係の商を扱えるようになった。今度は異なるトポスを結ぶ写像を考えたい。例えば連続写像 $f:X\to Y$ があれば、$Y$ 上の局所データを $X$ へ運ぶ操作と、逆に $X$ 上の局所データを $Y$ の開集合ごとにまとめる操作がある。

前者は有限個の条件を同時に課す操作と両立してほしい。また、局所データを運んだ後に写像を与えることと、運ぶ前に対応する写像を与えることが同じになると便利である。この二条件を、空間の点を前提としない形で表す。

以下、集合値の層を扱う。位相空間 $X$ の開集合を包含射で結んだ圏を $\mathcal O(X)$ とし、[開集合圏のGrothendieck位相](../CATB5-02/index.md#thm-catb5-02-open-site)を入れる。このsite上の層の圏を $\operatorname{Sh}(X)$、前層圏を $\operatorname{PSh}(X)$ と略記する。[開集合圏の層条件との同値性](../CATB5-03/index.md#thm-catb5-03-open-equivalence)により、層の切断は開被覆上の整合族から一意に貼り合わさる。空被覆から $F(\varnothing)$ は一元集合である。

開集合 $V'\subseteq V$ に対する制限写像の値を $s|_{V'}$ と書く。合成は右から左に書く。

## 2. 幾何学的射の向き

[初等トポス](../CATB5-06/index.md#def-catb5-06-elementary-topos)は有限極限を持つ。そこで、二つのトポスを結ぶ関手のうち、有限極限を保存する[左完全関手](../CATB5-05/index.md#def-catb5-05-left-exact)に注目する。さらに[随伴と転置](../../CAT/CAT2-08/index.md#def-cat2-08-adjunction)を使い、逆向きの関手に写像の情報を移せることを要求する。

<a id="def-catb5-09-geometric-morphism"></a>

<!-- formal-statement-start -->
> **定義（幾何学的射）**
>
> 初等トポス $\mathcal E,\mathcal F$ の間の幾何学的射 $g:\mathcal E\to\mathcal F$ は、関手の対

$$
g^*:\mathcal F\to\mathcal E,\qquad
g_*:\mathcal E\to\mathcal F
$$

> で、$g^*$ が $g_*$ の左随伴であり、かつ $g^*$ が左完全であるものをいう。随伴を表す自然な全単射は

$$
\mathcal E(g^*A,B)\cong\mathcal F(A,g_*B)
$$

> である。$g^*$ を逆像関手、$g_*$ を直像関手と呼ぶ。
<!-- formal-statement-end -->

<!-- definition-example-start: def-catb5-09-geometric-morphism -->
**定義の確認**。離散二点空間の層は二つの集合 $B_1,B_2$ によって決まり、二点全体での切断は $B_1\times B_2$ となる。これは二つの単点の開被覆と空の重なりに層条件を適用して得られる。したがって集合の対と成分ごとの写像の圏 $\operatorname{Set}\times\operatorname{Set}$ は、この層圏と同値である。

$\mathcal E=\operatorname{Set}\times\operatorname{Set}$、$\mathcal F=\operatorname{Set}$ として

$$
g^*(A)=(A,A),\qquad g_*(B_1,B_2)=B_1\times B_2
$$

を取る。射にはそれぞれ同じ写像を二成分に置く操作と、写像の直積を作用させる操作を用いる。恒等射・合成を成分ごとに保存するので関手である。

$g^*A\to(B_1,B_2)$ は写像の対 $(u_1,u_2)$ であり、対応する写像 $A\to B_1\times B_2$ は $a\mapsto(u_1(a),u_2(a))$ である。逆向きには二つの射影と合成すれば元の対を得る。前合成と後合成はこの成分操作と交換するので自然な全単射である。

有限図式 $D$ の極限を $L$ とすると、対の圏の極限は両成分で独立に普遍性を満たすため、$g^*D$ の極限は $(L,L)$ である。これは空図式の極限 $(1,1)$ も含む。よって左完全性が成り立ち、この対は幾何学的射を与える。
<!-- definition-example-end -->

射の向きは $g_*$ の向きと同じで、$g^*$ は逆向きである。左随伴という条件だけでは不十分である。例えば対の圏から集合への余積関手 $(A,B)\mapsto A\amalg B$ は対角関手の左随伴だが、終対象 $(1,1)$ を二元集合に送るため左完全でない。

<a id="prop-catb5-09-composition"></a>

<!-- formal-statement-start -->
> **命題（幾何学的射の合成）**
>
> 初等トポスの間の幾何学的射 $g:\mathcal E\to\mathcal F$ と $h:\mathcal F\to\mathcal G$ に対し、次の対は幾何学的射 $h\circ g:\mathcal E\to\mathcal G$ を与える。

$$
(h\circ g)^*=g^*h^*,\qquad
(h\circ g)_*=h_*g_*.
$$

> 恒等関手の対は恒等の幾何学的射を与える。
<!-- formal-statement-end -->

逆像の順序が反転する理由は、まず $\mathcal G$ の対象を $\mathcal F$ へ運び、その後 $\mathcal E$ へ運ぶからである。

<!-- proof-start -->
### 証明

$A\in\mathcal G$ と $B\in\mathcal E$ に対し、[随伴と転置](../../CAT/CAT2-08/index.md#def-cat2-08-adjunction)をまず $g$、次に $h$ へ適用する。

$$
\mathcal E(g^*h^*A,B)
\cong\mathcal F(h^*A,g_*B)
\cong\mathcal G(A,h_*g_*B).
$$

各対応は両変数について自然なので合成も自然である。有限図式 $D$ に対して、$h^*$ は極限錐を極限錐に送り、その錐を $g^*$ も極限錐に送る。空図式にも同じ議論が適用できる。したがって逆像の合成は左完全である。

恒等関手の対ではHom集合の対応は恒等写像であり、全ての有限極限錐をそのまま保つ。従って定義を満たす。
<!-- proof-end -->

## 3. 連続写像に沿って切断をまとめる

連続写像 $f:X\to Y$ を固定する。$Y$ の開集合 $V$ を選ぶと、その逆像 $f^{-1}(V)$ は $X$ の開集合である。したがって $X$ 上の層の切断をその開集合で評価できる。これが直像を作る最も簡単な方法である。

<a id="def-catb5-09-sheaf-direct-image"></a>

<!-- formal-statement-start -->
> **定義（層の直像関手）**
>
> 連続写像 $f:X\to Y$ と $X$ 上の集合値層 $G$ に対し、直像 $f_*G$ は $Y$ の開集合 $V$ で

$$
(f_*G)(V)=G(f^{-1}(V))
$$

> とし、制限は逆像開集合の包含に沿う $G$ の制限とする。層の射 $\beta:G\to H$ に対しては、$V$ での成分を $\beta_{f^{-1}(V)}$ とする。
<!-- formal-statement-end -->

<!-- definition-example-start: def-catb5-09-sheaf-direct-image -->
**定義の確認**。$X=\{p,q\}$ を離散空間、$Y=\{y\}$ を一点空間として $f$ を唯一の写像とする。$G$ の単点での切断集合を $G(\{p\})=\{0,1\}$、$G(\{q\})=\{a,b,c\}$ とする。層条件により全体の切断はこの二集合の直積である。

$$
(f_*G)(Y)=G(X)=\{0,1\}\times\{a,b,c\}.
$$

空集合では $f^{-1}(\varnothing)=\varnothing$ なので一元集合である。全体から空集合への制限は唯一の写像となる。一点空間の層条件は、空でない開集合の被覆がその開集合自身を含むことと、空集合の切断が一意であることから満たされる。よってこの直像は六元集合に対応する層である。単点の切断集合の写像の対を変更すれば、直像の射はそれらの直積写像となり、制限とも交換する。
<!-- definition-example-end -->

<a id="prop-catb5-09-direct-image-sheaf"></a>

<!-- formal-statement-start -->
> **命題（直像の層性）**
>
> 連続写像 $f:X\to Y$ に沿う層の直像は層となり、上の構成は関手 $f_*:\operatorname{Sh}(X)\to\operatorname{Sh}(Y)$ を与える。
<!-- formal-statement-end -->

<!-- proof-start -->
### 証明

$V=\bigcup_i V_i$ を開被覆とする。集合の逆像は合併と交差を保存するので

$$
f^{-1}(V)=\bigcup_i f^{-1}(V_i),\qquad
f^{-1}(V_i\cap V_j)=f^{-1}(V_i)\cap f^{-1}(V_j).
$$

$(f_*G)(V_i)$ の整合族は、この式と直像の定義により $G$ の開被覆上の整合族に一致する。$G$ の[開集合圏の層条件](../CATB5-03/index.md#thm-catb5-03-open-equivalence)を適用すれば、$G(f^{-1}(V))$ に一意の貼り合わせがある。空被覆でも $G(\varnothing)$ は一元集合である。

$\beta$ の自然性は逆像開集合の包含に沿う自然性をそのまま使える。恒等射の成分は恒等写像であり、二射の合成の成分は成分写像の合成なので、関手の公理を満たす。
<!-- proof-end -->

## 4. 逆方向にはなぜ層化が必要なのか

$Y$ 上の層 $F$ から $X$ 上の層を作りたい。だが開集合 $U\subseteq X$ の像 $f(U)$ は開集合とは限らないので、$F(f(U))$ という切断集合は一般には定義されていない。代わりに $f(U)$ を含む全ての開集合での切断を集め、十分小さい開集合に制限すると一致する切断を同じものとして扱う。

開集合 $U$ に対して $\mathcal N_f(U)$ を、$f(U)\subseteq V$ を満たす $Y$ の開集合 $V$ を対象とし、$V'\subseteq V$ のとき $V\to V'$ を射とする圏とする。$Y$ が対象なので空でなく、二対象 $V,W$ には $V\cap W$ への射がある。平行射は高々一本なので[フィルター圏](../CATB3-01/index.md#def-catb3-01-filtered)の三条件を満たす。

$F$ の制限写像はこの圏上の集合の図式となる。その[フィルター余極限](../CATB3-01/index.md#def-catb3-01-filtered-colimit)を取る。添字圏が小さいことは位相が開集合の集合であることから従う。

<a id="def-catb5-09-inverse-presheaf"></a>

<!-- formal-statement-start -->
> **定義（逆像前層）**
>
> 連続写像 $f:X\to Y$ と $Y$ 上の集合値前層 $F$ に対し、逆像前層 $P_fF$ は各開集合 $U\subseteq X$ で

$$
(P_fF)(U)=\operatorname{colim}_{V\in\mathcal N_f(U)}F(V)
$$

> と定める。$U'\subseteq U$ への制限は添字圏の包含 $\mathcal N_f(U)\subseteq\mathcal N_f(U')$ による写像である。前層の射には各余極限を誘導する写像を作用させる。
<!-- formal-statement-end -->

具体的に $[V,s]$ を切断 $s\in F(V)$ の類とする。二つの代表元が等しいための条件は、$f(U)\subseteq W\subseteq V\cap V'$ を満たす開集合 $W$ が存在して

$$
s|_W=s'|_W
$$

となることである。[フィルター余極限の同一段階での判定](../CATB3-01/index.md#ref-catb3-01-same-stage)を、この逆包含順序の圏に適用した形である。制限は $[V,s]\mapsto[V,s]$ となる。同じ $W$ が $f(U')$ も含むため代表元の選択に依存しない。自然変換 $\alpha:F\to F'$ は $[V,s]\mapsto[V,\alpha_V(s)]$ を誘導する。$\alpha$ が制限と交換するためこれも代表元に依存しない。どちらの操作も恒等射と合成を保存し、互いに交換する。従って前層および前層間の関手が定まる。

<!-- definition-example-start: def-catb5-09-inverse-presheaf -->
**定義の確認**。再び離散二点空間 $X=\{p,q\}$ から一点空間 $Y$ への写像を使う。$F(Y)=A=\{0,1\}$、$F(\varnothing)=1$ とする。空でない $U$ では $\mathcal N_f(U)$ の対象は $Y$ だけなので $(P_fF)(U)=A$ である。$U=\varnothing$ では $\varnothing$ が添字圏の終対象なので $(P_fF)(\varnothing)=1$ となる。

二つの空でない開集合の間の制限は $[Y,a]\mapsto[Y,a]$、空集合への制限は唯一の写像となる。恒等射・合成もこの二種類の写像で保たれる。$A\to A'$ を変更した場合も全ての空でない開集合で同じ写像が誘導される。

しかし $X$ の被覆 $\{\{p\},\{q\}\}$ 上の整合族 $(0,1)$ は、全体の切断 $a\in A$ の制限 $(a,a)$ では得られない。この前層は層でない。
<!-- definition-example-end -->

そこで[層化関手](../CATB5-05/index.md#def-catb5-05-sheafification)を適用して、局所的に得られた切断の貼り合わせを可能にする。$a_X$ を $X$ 上の層化関手、$i_Y$ を $Y$ 上の層から前層への包含と書く。

<a id="def-catb5-09-sheaf-inverse-image"></a>

<!-- formal-statement-start -->
> **定義（層の逆像関手）**
>
> 連続写像 $f:X\to Y$ に対して、集合値層の逆像関手は逆像前層に層化を施す関手

$$
f^*=a_XP_fi_Y:\operatorname{Sh}(Y)\to\operatorname{Sh}(X)
$$

> である。
<!-- formal-statement-end -->

<!-- definition-example-start: def-catb5-09-sheaf-inverse-image -->
**定義の確認**。直前の離散二点空間の例で、層化した層 $H$ は $H(\{p\})=H(\{q\})=A$、$H(X)=A\times A$、$H(\varnothing)=1$ となる。全体からの制限は二つの射影である。このデータは開被覆の整合族の存在・一意性を満たす。例えば全体を含まない被覆は二単点を含むので、任意の二つの切断から唯一の対ができる。

前層からの射は単点では恒等写像、全体では対角写像 $a\mapsto(a,a)$ とする。任意の層 $G$ への前層の射が与えられれば、単点での二つの写像を使って $H(X)=A\times A$ の各対を $G(X)$ に一意に貼り合わせられる。全体での値も自然性によってこれと一致し、空集合では唯一の写像である。この延長は一意だから[層化と包含の随伴](../CATB5-05/index.md#thm-catb5-05-adjunction)の普遍性を満たす。よって $H$ は逆像前層の層化であり、逆像関手は集合の対角関手に対応する。
<!-- definition-example-end -->

## 5. 逆像と直像は随伴する

逆像前層の切断の代表元 $[V,s]$ は、$Y$ の切断を $X$ の開集合上へ移すためのデータである。直像の切断 $G(f^{-1}(V))$ を使うと、この代表元を $G(U)$ へ送れる。逆に逆像前層からの射があれば、$U=f^{-1}(V)$ と選ぶことで直像への射を復元できる。

<a id="thm-catb5-09-image-adjunction"></a>

<!-- formal-statement-start -->
> **定理（層の逆像と直像の随伴）**
>
> 位相空間の連続写像 $f:X\to Y$ に沿う層の逆像関手は直像関手の左随伴である。集合値層 $F$（$Y$ 上）と $G$（$X$ 上）について自然な全単射

$$
\operatorname{Sh}(X)(f^*F,G)
\cong\operatorname{Sh}(Y)(F,f_*G)
$$

> が存在する。
<!-- formal-statement-end -->

証明の核心は、層化の前に代表元の段階で全単射を作ることにある。層化の普遍性を最後に適用すれば、層の間の射へ移せる。

<!-- proof-start -->
### 証明

以下、包含関手を省略して層を前層として扱う。まず自然変換 $\alpha:F\to f_*G$ を取る。開集合 $U\subseteq X$ で

$$
\Phi(\alpha)_U([V,s])
=\alpha_V(s)|_U
$$

と定める。$f(U)\subseteq V$ より $U\subseteq f^{-1}(V)$ であるから、右辺の制限が定義される。

代表元が等しいとき、ある開集合 $W$ が $f(U)$ を含み、$V,V'$ の両方に含まれ、そこで切断が一致する。$\alpha$ の自然性より

$$
\alpha_V(s)|_{f^{-1}(W)}
=\alpha_W(s|_W)
=\alpha_W(s'|_W)
=\alpha_{V'}(s')|_{f^{-1}(W)}.
$$

$U\subseteq f^{-1}(W)$ へさらに制限すれば値が一致する。従って $\Phi(\alpha)_U$ は類の上で定まる。$U'\subseteq U$ に対して $\Phi(\alpha)_U([V,s])|_{U'}=\alpha_V(s)|_{U'}$ であり、これは $\Phi(\alpha)_{U'}([V,s])$ と等しい。よって $\Phi(\alpha):P_fF\to G$ は前層の射である。

逆に前層の射 $\psi:P_fF\to G$ を取る。$Y$ の開集合 $V$ において

$$
\Psi(\psi)_V(s)=\psi_{f^{-1}(V)}([V,s])
$$

と定める。$f(f^{-1}(V))\subseteq V$ なので代表元は適切な余極限に属する。$V'\subseteq V$ に対し $f^{-1}(V')\subseteq f^{-1}(V)$ であり、$\psi$ の自然性と代表元の同値関係から

$$
\Psi(\psi)_V(s)|_{f^{-1}(V')}
=\psi_{f^{-1}(V')}([V,s])
$$

$$
=\psi_{f^{-1}(V')}([V',s|_{V'}])
=\Psi(\psi)_{V'}(s|_{V'}).
$$

したがって $\Psi(\psi)$ は $F\to f_*G$ の自然変換である。

両対応が互いに逆であることを確認する。$\alpha$ に対して

$$
\Psi(\Phi(\alpha))_V(s)
=\alpha_V(s)|_{f^{-1}(V)}
=\alpha_V(s).
$$

$\psi$ に対しては、$U\subseteq f^{-1}(V)$ に沿う自然性から

$$
\Phi(\Psi(\psi))_U([V,s])
=\psi_{f^{-1}(V)}([V,s])|_U
=\psi_U([V,s]).
$$

さらに $F'\to F$ を前合成すると、どちらの対応でも代表元の切断 $s'$ にその成分写像を作用させる。$G\to G'$ を後合成する場合はその成分が制限と交換する。従って両変数について自然である。

最後に[層化と包含の随伴](../CATB5-05/index.md#thm-catb5-05-adjunction)を $P_fF$ と層 $G$ に適用する。

$$
\operatorname{Sh}(X)(a_XP_fF,G)
\cong\operatorname{PSh}(X)(P_fF,G)
$$

であり、右辺を上の $\Psi$ によって $\operatorname{Sh}(Y)(F,f_*G)$ と自然に同一視できる。左辺は定義により $\operatorname{Sh}(X)(f^*F,G)$ である。
<!-- proof-end -->

例えば単点への写像の場合、$F$ が集合 $A$ に対応し $G$ が二集合 $(B,C)$ に対応すれば、定理は $A\to B\times C$ と写像の対 $(A\to B,A\to C)$ の対応に帰着する。

## 6. 逆像は有限極限を保存する

逆像前層の値はフィルター余極限で与えられた。有限個の切断に関する条件なら、有限個の開近傍を交差させて全ての条件を一つの開近傍で比較できる。この有限性が極限の保存に効く。

<a id="thm-catb5-09-inverse-left-exact"></a>

<!-- formal-statement-start -->
> **定理（層の逆像の左完全性）**
>
> 位相空間の連続写像 $f:X\to Y$ に沿う集合値層の逆像関手 $f^*$ は左完全である。有限図式 $D$ の極限に対する比較射は同型となる。

$$
f^*(\lim D)\cong\lim(f^*D).
$$
<!-- formal-statement-end -->

証明には、[層の極限の点ごとの構成](../CATB5-05/index.md#thm-catb5-05-sheaf-limits)、[集合におけるフィルター余極限と有限極限の交換](../CATB3-01/index.md#thm-catb3-01-commute)、[層化の左完全性](../CATB5-05/index.md#thm-catb5-05-sheafification-left-exact)の三結果を順に使う。

<!-- proof-start -->
### 証明

有限圏 $I$ を添字とする層の図式 $D:I\to\operatorname{Sh}(Y)$ を取る。$L$ をその極限、$D_j$ を $j\in I$ での対象とする。

任意の開集合 $U$ に対し $\mathcal N_f(U)$ は第4節で確かめた通り小フィルター圏である。[層の極限の点ごとの構成](../CATB5-05/index.md#thm-catb5-05-sheaf-limits)を $L$ に適用し、各開集合 $V\in\mathcal N_f(U)$ で $L(V)\cong\lim_{j\in I}D_j(V)$ を得る。従って

$$
(P_fL)(U)\cong
\operatorname{colim}_{V\in\mathcal N_f(U)}
\lim_{j\in I} D_j(V).
$$

ここで[集合におけるフィルター余極限と有限極限の交換](../CATB3-01/index.md#thm-catb3-01-commute)を、フィルター圏 $\mathcal N_f(U)$、有限圏 $I$、集合の二変数図式 $(V,j)\mapsto D_j(V)$ に適用する。

$$
(P_fL)(U)\cong
\lim_{j\in I}
\operatorname{colim}_{V\in\mathcal N_f(U)} D_j(V)
=\lim_{j\in I}(P_fD_j)(U).
$$

この対応は極限射影 $p_j:L\to D_j$ を用いて

$$
[V,s]\longmapsto([V,p_{j,V}(s)])_{j\in I}
$$

と表される。制限 $U'\subseteq U$ は両側の代表元を同じものとして送るので、比較射の成分は制限と交換する。各成分が全単射なので、その逆写像も自然である。[関手圏の極限の点ごとの構成](../../CAT/CAT2-07/index.md#thm-cat2-07-pointwise-limit)により、前層として $P_fL\cong\lim_j P_fD_j$ を得る。

空図式でも成立する。各 $V$ に一元集合があり、$\mathcal N_f(U)$ が空でなく任意の二対象が共通の行き先を持つので、それらの余極限は一元集合になる。

最後に[層化の左完全性](../CATB5-05/index.md#thm-catb5-05-sheafification-left-exact)を有限前層図式 $(P_fD_j)$ に適用する。

$$
f^*L=a_XP_fL
\cong a_X(\lim_j P_fD_j)
\cong\lim_j a_XP_fD_j
=\lim_j f^*D_j.
$$

これらの同型の各成分は元の極限射影に $P_f$、$a_X$ を順に適用した射であるため、[比較射による保存判定](../../CAT/CAT2-11/index.md#prop-cat2-11-comparison)の比較射そのものである。よって左完全性が示された。
<!-- proof-end -->

<a id="thm-catb5-09-continuous-geometric"></a>

<!-- formal-statement-start -->
> **定理（連続写像が誘導する幾何学的射）**
>
> 位相空間の任意の連続写像 $f:X\to Y$ は、層の直像と逆像の対によって幾何学的射

$$
\operatorname{Sh}(f):\operatorname{Sh}(X)\to\operatorname{Sh}(Y)
$$

> を誘導する。恒等写像と連続写像の合成に対応する幾何学的射は、各関手の自然同型を除いて恒等と合成に一致する。
<!-- formal-statement-end -->

<!-- proof-start -->
### 証明

[層圏の初等トポス性](../CATB5-07/index.md#thm-catb5-07-sheaf-topos)により、両側の層圏は初等トポスである。[層の逆像と直像の随伴](#thm-catb5-09-image-adjunction)と[層の逆像の左完全性](#thm-catb5-09-inverse-left-exact)を合わせれば、[幾何学的射の定義](#def-catb5-09-geometric-morphism)の二条件を満たす。

別の連続写像 $h:Y\to Z$ を取る。$Z$ の開集合 $W$ と $X$ 上の層 $G$ について

$$
((h\circ f)_*G)(W)
=G(f^{-1}(h^{-1}(W)))
=(h_*f_*G)(W).
$$

制限写像と層の射の成分も同じ開集合で評価しているので一致する。

逆像はこの同じ直像の左随伴である。一方、[幾何学的射の合成](#prop-catb5-09-composition)から $f^*h^*$ も左随伴になる。任意の層 $A$（$Z$ 上）と $B$（$X$ 上）について

$$
\operatorname{Sh}(X)((h\circ f)^*A,B)
\cong\operatorname{Sh}(X)(f^*h^*A,B)
$$

が $B$ について自然である。この対応を恒等射に適用すると両対象の間の互いに逆な射が得られる。実際、$P=(h\circ f)^*A$、$Q=f^*h^*A$ と書き、全単射 $\theta_B:\operatorname{Hom}(P,B)\to\operatorname{Hom}(Q,B)$ を用いる。$u=\theta_P(1_P):Q\to P$、$v=\theta_Q^{-1}(1_Q):P\to Q$ とすれば、自然性から $\theta_Q(v)=vu=1_Q$ となる。逆対応の自然性を $u$ に適用すると $uv=1_P$ となる。$A$ についての自然性も元の随伴対応の自然性から従う。

恒等写像の直像は恒等関手であり、逆像についても同じ自然な全単射を恒等関手と比較することで自然同型が得られる。
<!-- proof-end -->

## 7. 像と商はどう移るか

幾何学的射の逆像は左完全なので核対を保存する。さらに左随伴なので、存在する余等化子を[左随伴の余極限保存](../../CAT/CAT2-11/index.md#thm-cat2-11-left-preserves)によって保存する。これらを組み合わせると前講の像分解を別のトポスへ移すことができる。

<a id="thm-catb5-09-image-preservation"></a>

<!-- formal-statement-start -->
> **定理（幾何学的射の逆像による像と有効商の保存）**
>
> 初等トポス間の幾何学的射 $g:\mathcal E\to\mathcal F$ の逆像関手 $g^*$ は、モノ射、エピ射、正則エピ射とモノ射からなる像分解、および内部同値関係の有効商を保存する。
<!-- formal-statement-end -->

<!-- proof-start -->
### 証明

モノ射 $m:M\to N$ の核対の二射影を $p_1,p_2:M\times_N M\to M$ とする。$m$ のモノ性から $p_1=p_2$ であり、対角射 $M\to M\times_N M$ はこの射影と互いに逆になる。左完全性によりこの核対と対角射は $g^*m$ の核対と対角射へ移る。従って $g^*m$ の核対の二射影も一致する。もし $g^*m\,u=g^*m\,v$ なら核対への媒介射に二射影を合成して $u=v$ を得る。よって $g^*m$ はモノ射である。

次にエピ射 $e:A\to B$ を取る。[初等トポスのエピ射の正則性](../CATB5-08/index.md#thm-catb5-08-epi-regular)より、$e$ は核対の余等化子である。[左随伴の余極限保存](../../CAT/CAT2-11/index.md#thm-cat2-11-left-preserves)により $g^*e$ はその二射の像の余等化子となる。余等化子の普遍性により右消去律が成り立つからエピ射である。

[初等トポスの像分解](../CATB5-08/index.md#thm-catb5-08-image)を $u:A\to B$ に適用し、エピ射 $e:A\to I$ とモノ射 $m:I\to B$ の分解を取る。

$$
g^*u=(g^*m)(g^*e).
$$

上の二段階から右辺はエピ射の後にモノ射を置く分解になる。[初等トポスのエピ射の正則性](../CATB5-08/index.md#thm-catb5-08-epi-regular)により $g^*e$ は核対の余等化子である。この分解が最小の部分対象を与える理由を確認する。別の分解 $g^*u=nw$ があり $n$ がモノ射なら、$g^*e$ の核対の二射 $r,s$ に対し

$$
nwr=g^*u\,r=g^*u\,s=nws
$$

なので $wr=ws$ である。余等化子の普遍性から一意の $k$ が存在して $k g^*e=w$ を満たす。さらに $nk g^*e=g^*u=g^*m g^*e$ とエピ性から $nk=g^*m$ である。従って $g^*m$ が像を表す。

最後に内部同値関係 $R\rightrightarrows A$ とその有効商 $q:A\to Q$ を取る。有効とは $q$ が二射の余等化子で、$R$ が $q$ の核対でもあることを意味する。[初等トポスのBarr-正確性](../CATB5-08/index.md#thm-catb5-08-exact)によってこの商は存在する。左完全性により $g^*R$ は $g^*q$ の核対となり、左随伴の余極限保存により $g^*q$ はその二射の余等化子となる。従って移した関係は核対として同値関係であり、その商は有効である。
<!-- proof-end -->

ここで有限極限と余極限という二種類の保存を両方使った。一般の幾何学的射の逆像が指数対象や部分対象分類子まで保存するとは定義からは言えない。例えば一点の包含 $f:\{p\}\hookrightarrow Y$ を考え、$Y=\{p,q\}$ に開集合 $\varnothing,\{p\},Y$ を持つ位相を入れる。$Y$ 上の部分対象分類子の $Y$ での切断は三つの開集合だが、$\{p\}$ での切断は二つの開集合であり、この包含の場合には後者が逆像である。逆に閉点 $q$ の包含なら $q$ の開近傍は $Y$ のみなので、逆像の分類子の切断は三元集合になる。一点空間自身の分類子は二元集合であり、同型でない。ここで開集合による分類子の記述は[層圏の部分対象分類子](../CATB5-07/index.md#thm-catb5-07-sheaf-classifier)において、開集合 $V$ の閉篩がその始域の合併である開部分集合に対応することから得られる。

## 8. 演習と詳細解答

### CATB5-09-A01 射の向きと合成

- Level: A

幾何学的射 $g:\mathcal E\to\mathcal F$、$h:\mathcal F\to\mathcal G$ がある。合成の逆像・直像の始域と終域を書き、Hom集合の対応を示せ。

<!-- solution-start -->
**詳細解答**

$g^*$ は $\mathcal F$ から $\mathcal E$ へ、$h^*$ は $\mathcal G$ から $\mathcal F$ へ向かう。よって $g^*h^*:\mathcal G\to\mathcal E$ である。直像は $h_*g_*:\mathcal E\to\mathcal G$ となる。

$A\in\mathcal G$、$B\in\mathcal E$ を固定する。[幾何学的射の定義](#def-catb5-09-geometric-morphism)の随伴を二回使って

$$
\mathcal E(g^*h^*A,B)
\cong\mathcal F(h^*A,g_*B)
\cong\mathcal G(A,h_*g_*B)
$$

となる。二回とも自然な対応なので合成も自然である。有限極限錐は $h^*$ と $g^*$ で順に保存されるから、合成も幾何学的射である。
<!-- solution-end -->

### CATB5-09-A02 離散空間の直像

- Level: A

離散空間 $X=\{a,b,c\}$、$Y=\{0,1\}$ に対し、$f(a)=f(b)=0$、$f(c)=1$ とする。$X$ 上の層 $G$ の単点での切断集合の大きさが順に $2,3,4$ である。$(f_*G)(\{0\})$、$(f_*G)(\{1\})$、$(f_*G)(Y)$ の大きさを求め、制限写像を記述せよ。

<!-- solution-start -->
**詳細解答**

単点の切断集合を $A,B,C$ とする。離散空間の各開集合はその単点の互いに素な開被覆を持つため、層条件から全体の切断は単点の切断の直積となる。

[層の直像関手](#def-catb5-09-sheaf-direct-image)の式に $V=\{0\},\{1\},Y$ を順に代入する。

$$
(f_*G)(\{0\})=G(\{a,b\})\cong A\times B,
$$

$$
(f_*G)(\{1\})=G(\{c\})=C,
$$

$$
(f_*G)(Y)=G(X)\cong A\times B\times C.
$$

従って大きさは順に $2\cdot3=6$、$4$、$2\cdot3\cdot4=24$ である。$Y$ から $\{0\}$ への制限は $(x,y,z)\mapsto(x,y)$、$\{1\}$ への制限は $(x,y,z)\mapsto z$、空集合への制限は唯一の写像である。
<!-- solution-end -->

### CATB5-09-A03 逆像前層と層の違い

- Level: A

離散三点空間 $X$ から一点空間 $Y$ への唯一の写像を $f$ とする。$F(Y)=\{0,1,2\}$ の層について、逆像前層と逆像層の全体での切断数を求めよ。貼り合わせ不能な整合族を一つ挙げよ。

<!-- solution-start -->
**詳細解答**

空でない $U$ では $f(U)=Y$ なので添字圏は対象 $Y$ 一つである。[逆像前層](#def-catb5-09-inverse-presheaf)から $(P_fF)(U)=\{0,1,2\}$ となる。空集合での切断は一元集合である。従って全体の切断数は3である。

三単点の被覆では重なりが空であり、任意の三つの切断が整合する。逆像前層の全体からの制限は対角写像 $s\mapsto(s,s,s)$ なので、例えば $(0,1,2)$ は貼り合わせられない。

層化後の層は開集合ごとに単点の切断の直積を取る。前層からの写像は定数の族を対応させる。任意の層への前層の射は、各単点での像を一意に貼り合わせて延長できるので、[層化と包含の随伴](../CATB5-05/index.md#thm-catb5-05-adjunction)の普遍性を満たす。従って $(f^*F)(X)=\{0,1,2\}^3$ となり切断数は27である。
<!-- solution-end -->

### CATB5-09-A04 左随伴だけでは足りない

- Level: A

関手 $L:\operatorname{Set}\times\operatorname{Set}\to\operatorname{Set}$ を $L(A,B)=A\amalg B$ とする。その右随伴を示し、幾何学的射の逆像となれないことを証明せよ。

<!-- solution-start -->
**詳細解答**

余積への二つの包含を $i_A,i_B$ とすると、写像 $u:A\amalg B\to C$ を $(ui_A,ui_B)$ に送ることは全単射である。逆向きは、$A$ 上で第1の写像、$B$ 上で第2の写像を取る。前合成・後合成はこの制限と交換する。

$$
\operatorname{Set}(L(A,B),C)
\cong(\operatorname{Set}\times\operatorname{Set})((A,B),(C,C)).
$$

従って右随伴は対角関手である。しかし対の圏の終対象は $(1,1)$ であり、その像は二元集合である。二元集合への写像は一元集合から二通りあるので終対象でない。[幾何学的射の定義](#def-catb5-09-geometric-morphism)では空図式の極限も保存する必要があるから、この $L$ は逆像関手となれない。
<!-- solution-end -->

### CATB5-09-B01 開部分空間への逆像

- Level: B

$X\subseteq Y$ を開部分空間、$j:X\hookrightarrow Y$ を包含とする。任意の $Y$ 上の層 $F$ について $(j^*F)(U)\cong F(U)$ が $X$ の全ての開集合 $U$ に対して成立することを示せ。

<!-- solution-start -->
**詳細解答**

$X$ が $Y$ の開集合なので $U$ は $Y$ でも開集合である。$\mathcal N_j(U)$ の対象は $U$ を含む開集合であり、逆包含順序で $U$ が終対象となる。各 $V$ から $U$ への唯一の射に沿って制限できるため、余極限は $F(U)$ となる。具体的な全単射は

$$
[V,s]\longmapsto s|_U,\qquad
t\longmapsto[U,t].
$$

一方の合成は $t|_U=t$、他方の合成は $[U,s|_U]=[V,s]$ である。$U'\subseteq U$ に対して制限の合成則によりこの対応は自然である。

$X$ の開被覆はそのまま $Y$ の開被覆であるから、この前層は $F$ の層条件を満たす。層の層化は[層化と包含の随伴](../CATB5-05/index.md#thm-catb5-05-adjunction)の普遍性により元の層と同型である。よって求める自然同型が得られる。
<!-- solution-end -->

### CATB5-09-B02 随伴の単位に対応する写像

- Level: B

連続写像 $f:X\to Y$ と $Y$ 上の層 $F$ を取る。逆像前層の層化への標準射を $\eta:P_fF\to f^*F$ とする。随伴 $f^*\dashv f_*$ において $1_{f^*F}$ に対応する射 $F\to f_*f^*F$ の成分を求め、制限と交換することを直接示せ。

<!-- solution-start -->
**詳細解答**

[層の逆像と直像の随伴](#thm-catb5-09-image-adjunction)の証明で、$G=f^*F$、$\psi=\eta$ とする。恒等射を層化の普遍性で前層の射へ移すと $\eta$ になる。従って求める射 $\lambda$ の $V$ 成分は

$$
\lambda_V(s)=\eta_{f^{-1}(V)}([V,s]).
$$

$V'\subseteq V$ について、$\eta$ の自然性から

$$
\lambda_V(s)|_{f^{-1}(V')}
=\eta_{f^{-1}(V')}([V,s]).
$$

余極限の代表元は $\mathcal N_f(f^{-1}(V'))$ の中で $[V,s]=[V',s|_{V'}]$ となる。実際 $f(f^{-1}(V'))\subseteq V'\subseteq V$ なので、$W=V'$ が同値を示す開集合である。従って

$$
\lambda_V(s)|_{f^{-1}(V')}
=\eta_{f^{-1}(V')}([V',s|_{V'}])
=\lambda_{V'}(s|_{V'}).
$$

これで自然性が直接確認できた。
<!-- solution-end -->

### CATB5-09-B03 二つの代表元の等しさ

- Level: B

$Y=\{p,q\}$ に開集合 $\varnothing,\{p\},Y$ の位相を入れる。層 $F$ が $F(Y)=\{a,b,c\}$、$F(\{p\})=\{0,1\}$ で、制限が $a,b\mapsto0$、$c\mapsto1$ であるとする。単点空間から $p$ および $q$ へ向かう二つの連続写像 $i_p,i_q$ に沿う逆像の全体での切断を求めよ。

<!-- solution-start -->
**詳細解答**

まず空集合の切断を一元集合とすれば、非空の開集合の任意の開被覆はその開集合自身を含むので、貼り合わせはその切断で一意に決まる。従って与えられたデータは層を定める。

一点空間の全体を $T$ とする。$p$ の開近傍は $Y$ と $\{p\}$ である。[逆像前層](#def-catb5-09-inverse-presheaf)の添字圏は $Y\to\{p\}$ であり、終対象 $\{p\}$ がある。従って $[Y,a]=[Y,b]=[\{p\},0]$、$[Y,c]=[\{p\},1]$ となる。二つの類は $\{p\}$ より小さい $p$ の開近傍がないので異なる。

$q$ の開近傍は $Y$ だけなので $[Y,a],[Y,b],[Y,c]$ は全て異なる。空集合ではいずれも余極限の終対象が $\varnothing$ となり一元集合である。従って二つの逆像前層は既に一点空間の層であり、層化で変わらない。

$$
(i_p^*F)(T)\cong\{0,1\},\qquad
(i_q^*F)(T)\cong\{a,b,c\}.
$$

<!-- solution-end -->

### CATB5-09-B04 核対と商の保存

- Level: B

離散二点空間 $X$ から一点空間 $Y$ への写像 $f$ を取る。$Y$ 上の層に対応する全射 $q:\{a,b,c\}\to\{0,1\}$ が $a,b$ を0へ、$c$ を1へ送る。核対の元を全て列挙し、逆像後の商と核対を単点ごとに求めよ。

<!-- solution-start -->
**詳細解答**

核対は同じ値に写る順序対の集合である。元は

$$
R=\{(a,a),(a,b),(b,a),(b,b),(c,c)\}.
$$

$q$ のファイバーは $\{a,b\}$ と $\{c\}$ の二つであり、関係 $R$ の二射影を余等化する写像はこの二集合の内部で一定である。従ってその値を0と1に割り当てれば、唯一の写像を通じて $q$ を経由する。

$f^*$ は第4節の計算から集合を同じ集合の対に送る。従って逆像後の射は $(q,q)$ であり、二つの単点でそれぞれ上に列挙した五元集合 $R$ が核対となる。逆像後の商の切断は各単点で $\{0,1\}$、全体で $\{0,1\}\times\{0,1\}$ となる。

二点全体での核対も $R\times R$ となる。これは二つの順序対がそれぞれ同じ値に写るという条件を同時に満たすからである。[幾何学的射の逆像による像と有効商の保存](#thm-catb5-09-image-preservation)を具体的に確認できた。
<!-- solution-end -->

### CATB5-09-C01 非開写像での逆像と直像

- Level: C

$Y=\{p,q\}$ に開集合 $\varnothing,\{p\},Y$ の位相を入れる。$X=\{x,z\}$ は離散空間とし、$f(x)=p$、$f(z)=q$ とする。$Y$ 上の層 $F$ のデータは集合 $A=F(Y)$、$B=F(\{p\})$ と制限 $r:A\to B$ である。$X$ 上の層 $G$ の単点での切断集合を $C,D$ とする。

1. $f$ が連続だが開写像ではないことを確認せよ。
2. $(P_fF)(X)$、$(P_fF)(\{x\})$、$(P_fF)(\{z\})$ と制限を求め、逆像層を構成せよ。
3. 直像層を求め、随伴の全単射を集合の写像として再構成せよ。
4. 有限極限保存をこの表示から確認せよ。

<!-- solution-start -->
**詳細解答**

1. 開集合の逆像は順に $\varnothing,\{x\},X$ であり、全て $X$ で開いている。従って連続である。しかし開集合 $\{z\}$ の像 $\{q\}$ は $Y$ で開いていないので開写像ではない。

2. $Y$ の開近傍を逆包含順に調べる。$f(X)=Y$ を含む開集合は $Y$ のみなので $(P_fF)(X)=A$ である。$f(\{x\})=\{p\}$ を含む開集合の圏には終対象 $\{p\}$ があり、余極限は $B$ になる。$f(\{z\})=\{q\}$ を含む開集合は $Y$ のみなので余極限は $A$ になる。

$$
(P_fF)(\{x\})=B,\qquad(P_fF)(\{z\})=A.
$$

全体からの制限は $x$ 側で $r$、$z$ 側で恒等写像である。従って全体の切断 $a$ の制限の対は $(r(a),a)$ である。

層化すると $H(\{x\})=B$、$H(\{z\})=A$、$H(X)=B\times A$、$H(\varnothing)=1$ となる。層化への射は単点で恒等写像、全体で $a\mapsto(r(a),a)$ であり、制限と交換する。任意の層への前層の射は単点の写像で全体への延長が決まり、全体での元の射と一致する。実際、元の射の全体での値は自然性によって二つの単点での値に制限され、層条件でそれらから一意に決まるからである。よって[層化と包含の随伴](../CATB5-05/index.md#thm-catb5-05-adjunction)の普遍性を満たし、$H=f^*F$ とみなせる。

3. [層の直像関手](#def-catb5-09-sheaf-direct-image)より

$$
(f_*G)(Y)=C\times D,\qquad
(f_*G)(\{p\})=C.
$$

制限は第1射影 $\pi_C$ である。$F\to f_*G$ は写像 $u:A\to C\times D$ と $v:B\to C$ の対であり、自然性は $\pi_C u=vr$ である。この条件から $w=\pi_Du:A\to D$ とすれば $u(a)=(v(r(a)),w(a))$ となる。

一方 $f^*F\to G$ は離散空間上の層の射なので、単点での写像 $v:B\to C$ と $w:A\to D$ で一意に決まる。逆に任意の対 $(v,w)$ から上の式で $u$ を構成すると $\pi_C u=vr$ を満たす。二方向は互いに逆であり、前合成・後合成と交換するから自然な全単射である。

4. $Y$ 上の層の有限図式を $F_j$ とし、データを $A_j,B_j,r_j$ と書く。[層の極限の点ごとの構成](../CATB5-05/index.md#thm-catb5-05-sheaf-limits)により極限のデータは $\lim_j A_j,\lim_j B_j$ と、各 $r_j$ が誘導する制限である。これを逆像すると単点の切断の対は

$$
(\lim_j B_j,\lim_j A_j)
$$

となる。一方 $f^*F_j$ の単点の切断は $(B_j,A_j)$ であり、離散空間の層圏の極限も単点ごとに計算できるので、極限の対は同じ式となる。各単点での比較射は極限射影の族から得られる恒等的な対応で、全体では二つの比較射の直積になる。空図式でも $(1,1)$ となる。従って左完全性が直接確認できた。
<!-- solution-end -->

## 9. 次の問い

連続写像から層の圏を結ぶ幾何学的射を構成できた。ここまでの議論は、空間そのものよりも、その上の局所データと貼り合わせが重要なことを示している。次講では、異なるsiteが同じ層の圏を記述する場合に、どのように局所データを比較できるかを考える。
