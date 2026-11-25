# CATB6-06 Kripke–Joyal意味論

## 1. 真理を観察する場所を変える

前講の[トポスの内部言語の式と判断](../CATB6-05/index.md#def-catb6-05-internal-formulas)では、式を文脈対象の部分対象として解釈した。ところが層の圏では、部分対象に属するかどうかを大域的な切断だけで調べても、局所的な情報を見落とす。

例えば二つの開集合でそれぞれ方程式を解けるとしても、重なりで解が一致するとは限らない。一方、「どの場所でも近くに解がある」という条件は成立し得る。この二つを区別しながら、内部言語の各論理記号を切断と被覆で計算したい。

## 2. 切断による強制関係

小site $(\mathcal C,J)$ を固定する。[Grothendieck位相とsite](../CATB5-02/index.md#def-catb5-02-grothendieck-topology)で $J(U)$ は対象 $U$ の被覆篩の集合である。[層圏の初等トポス性](../CATB5-07/index.md#thm-catb5-07-sheaf-topos)により層の圏で内部言語を解釈できる。

[内部言語の型と項](../CATB6-05/index.md#def-catb6-05-internal-terms)では文脈対象は自由変数の型の積であり、空文脈では終対象 $1$ である。文脈対象を層 $G$ とすると、$a\in G(U)$ は段階 $U$ での変数の値である。

射 $r:V\to U$ に沿う制限を $a|_r=G(r)(a)$ と書く。以下、射の合成は $rs=r\circ s$ と略す。$s:W\to V$ に対し、前層の反変関手性から

$$
G(rs)=G(s)\circ G(r),\qquad
(a|_r)|_s=a|_{rs}.
$$

開集合圏では $r:V\hookrightarrow U$ は包含射なので、同じ制限を $a|_V$ とも書ける。式の意味である部分対象は、[層のモノ射の成分判定](../CATB5-07/index.md#prop-catb5-07-sheaf-mono)によって部分層 $P\subseteq G$ とみなせる。

各 $U$ でモノ射の成分の像を $P(U)\subseteq G(U)$ と同一視し、制限は $G$ の制限写像をその部分集合に限ったものになる。

段階 $U$ でこの切断が述語に属することを「強制する」と呼ぶ。心理的な確信や時間の経過ではなく、数学的な所属条件である。$\varphi(a)$ は文脈の変数に段階 $U$ の切断 $a$ を入れて判定することを表し、$a$ が大域切断であることは要求しない。

<a id="def-catb6-06-forcing"></a>

<!-- formal-statement-start -->
> **定義（Kripke–Joyal意味論の強制関係）**
>
> 小site $(\mathcal C,J)$ 上の層圏で、内部言語の文脈対象を $G$、式 $\varphi$ の意味である部分層を $P\subseteq G$ とする。対象 $U$ と切断 $a\in G(U)$ に対して、強制関係を次で定める。

$$
U\Vdash\varphi(a)\iff a\in P(U).
$$

> 空文脈では $G=1$ として、唯一の切断を省略し $U\Vdash\varphi$ と書く。
<!-- formal-statement-end -->

<!-- definition-example-start: def-catb6-06-forcing -->
**定義の確認**。二点離散空間 $X=\{p,q\}$ に[開集合圏のGrothendieck位相](../CATB5-02/index.md#thm-catb5-02-open-site)を入れ、$G=1$ とする。[層の極限の点ごとの構成](../CATB5-05/index.md#thm-catb5-05-sheaf-limits)の空図式の場合より $1(U)=\{*\}$ である。$P$ を、$U\subseteq\{p\}$ なら $P(U)=\{*\}$、それ以外では $P(U)=\varnothing$ となる部分層とする。

制限先はより小さい開集合なので、$P(U)$ に元があれば制限先にも元がある。被覆上のすべての開集合が $\{p\}$ に含まれるなら、その和集合も $\{p\}$ に含まれる。

反対に $U$ が $\{p\}$ に含まれなければ、任意の開被覆に $\{p\}$ に含まれない開集合があり、その段階の切断が存在しないので整合族も存在しない。すなわち被覆 $(U_i)_i$ ごとに

$$
P(U)\ne\varnothing
\iff \bigcup_i U_i\subseteq\{p\}
\iff \text{全ての }i\text{ で }P(U_i)\ne\varnothing.
$$

切断が存在する場合は全て一点集合なので重なりで一致し、一意に貼り合わさる。存在しない場合は両側とも空である。空被覆では和集合が空で、$P(\varnothing)=\{*\}$ が空整合族の唯一の貼り合わせとなる。[開集合圏の層条件との同値性](../CATB5-03/index.md#thm-catb5-03-open-equivalence)から $P$ は層であり、成分ごとの包含 $P(U)\subseteq 1(U)$ は制限と可換である。

強制関係の右辺を各開集合で確認すると、$\{p\}$ と空集合では真、$\{q\}$ と $X$ では強制されない。$X$ で強制されないことは、まだ否定が強制されることを意味しない。
<!-- definition-example-end -->

制限によって既に成立する式は失われない。また、被覆の各部分で成立するなら全体でも成立する。後者は、証人そのものが貼り合わさるという主張ではなく、式の意味が部分層であることから従う。

<a id="thm-catb6-06-forcing-locality"></a>

<!-- formal-statement-start -->
> **定理（強制関係の制限安定性と局所性）**
>
> 小site $(\mathcal C,J)$ 上の層圏で、式 $\varphi$ の文脈対象を $G$ とする。$a\in G(U)$ と射 $r:V\to U$ に対し、次が成立する。

$$
U\Vdash\varphi(a)\Longrightarrow V\Vdash\varphi(a|_r).
$$

> 任意の被覆篩 $S\in J(U)$ に対して、次の同値が成立する。

$$
U\Vdash\varphi(a)
\iff
\text{全ての }(r:V\to U)\in S\text{ で }
V\Vdash\varphi(a|_r).
$$
<!-- formal-statement-end -->

見取り図：制限は部分層の制限写像で行い、逆方向は部分層の貼り合わせと元の層の一意性を使う。

<!-- proof-start -->
### 証明

$P$ を式の意味とする。$a\in P(U)$ なら部分層の制限写像が $a|_r\in P(V)$ を与えるので、第一の主張が成立する。これは第二の同値の順方向も与える。

逆方向では各 $r\in S$ に対して $a|_r\in P(V)$ を仮定する。任意の $s:W\to V$ について

$$
(a|_r)|_s=a|_{rs}
$$

となる。[篩の定義](../CATB5-02/index.md#def-catb5-02-sieve)から $rs\in S$ であり、これらは $P$ の[篩上の整合族](../CATB5-03/index.md#def-catb5-03-sieve-matching)である。

[site上の層](../CATB5-03/index.md#def-catb5-03-site-sheaf)の条件で唯一の貼り合わせ $b\in P(U)$ が得られる。

包含で $G(U)$ に移した $b$ は各 $r\in S$ で $a$ と同じ制限を持つ。

$G$ も層なので一意性より $a=b\in P(U)$。

空の被覆篩の場合も、空の整合族の一意な貼り合わせを使うため証明はそのまま成立する。
<!-- proof-end -->

## 3. 各論理記号を切断で計算する

式を組み立てるたびに部分層を抽象的に計算する代わりに、各段階で何を確かめればよいかを列挙する。連言は二つとも真であることを要求する。選言では被覆上の各部分でどちらか一方を確認する。含意では任意の制限先で前件を仮定する。存在量化は被覆上で証人を探し、全称量化は任意の制限先に現れるすべての入力を調べる。ここで型・項・関係記号と冪型の評価は[内部言語の型と項](../CATB6-05/index.md#def-catb6-05-internal-terms)および[式と判断](../CATB6-05/index.md#def-catb6-05-internal-formulas)の意味で用いる。

変数 $x$ を型 $A$ として追加すると文脈対象は $G\times A$ になり、段階 $V$ の入力は $(a|_r,b)$（$b\in A(V)$）である。

<a id="thm-catb6-06-forcing-clauses"></a>

<!-- formal-statement-start -->
> **定理（Kripke–Joyal意味論の強制条件）**
>
> 小site $(\mathcal C,J)$ 上の層圏で型と関係記号の解釈を固定する。文脈対象を $G$、切断を $a\in G(U)$ とする。$\varphi,\psi$ はこの文脈の式、$\theta$ は型 $A$ の新しい変数 $x$ を加えた文脈の式とする。
>
> **（真・偽・原子式）** 真は常に強制され、偽は空の篩が被覆である場合に限り強制される。

$$
U\Vdash\top,\qquad U\Vdash\bot\iff\varnothing\in J(U).
$$

> 等号は二項の値の一致、関係式は入力項をその段階で評価して得る切断の組が指定された関係部分層に属すること、所属式は冪型の評価射が分類する部分層への所属で判定する。
>
> **（連言）**

$$
U\Vdash(\varphi\wedge\psi)(a)
\iff U\Vdash\varphi(a)\text{ かつ }U\Vdash\psi(a).
$$

> **（選言）** $U\Vdash(\varphi\vee\psi)(a)$ であることと、ある $S\in J(U)$ が存在し、その各射 $r:V\to U$ について次が成立することは同値である。

$$
V\Vdash\varphi(a|_r)\text{ または }V\Vdash\psi(a|_r).
$$

> **（含意）** $U\Vdash(\varphi\Rightarrow\psi)(a)$ であることと、すべての射 $r:V\to U$ について次が成立することは同値である。

$$
V\Vdash\varphi(a|_r)\Longrightarrow V\Vdash\psi(a|_r).
$$

> 否定は $\psi=\bot$ とした場合である。
>
> **（存在量化）** $U\Vdash\exists x:A\,\theta(a,x)$ であることと、ある $S\in J(U)$ が存在し、その各射 $r:V\to U$ に対して次を満たす $b\in A(V)$ が存在することは同値である。

$$
V\Vdash\theta(a|_r,b).
$$

> **（全称量化）** $U\Vdash\forall x:A\,\theta(a,x)$ であることと、すべての射 $r:V\to U$ とすべての $b\in A(V)$ に対して次が成立することは同値である。

$$
V\Vdash\theta(a|_r,b).
$$
<!-- formal-statement-end -->

見取り図：式の意味を $P,Q\subseteq G$、束縛変数を含む式の意味を $D\subseteq G\times A$ とする。最小の部分層には局所性が必要で、選言も同様に局所化された和を使う。含意と全称量化は「条件を満たす最大の部分層」を具体的に作る。存在量化は[層の局所像とエピ射の判定](../CATB5-08/index.md#thm-catb5-08-sheaf-image)に帰着する。

<!-- proof-start -->
### 証明

[層の極限の点ごとの構成](../CATB5-05/index.md#thm-catb5-05-sheaf-limits)により、引き戻し、積、等化子を各段階の集合で計算できる。[部分対象の最大元と共通部分](../CATB6-01/index.md#prop-catb6-01-subobject-meet)より真は $G$ 全体である。

項 $t,u$ が同じ型 $A$ を持つとき、その意味を射 $t_G,u_G:G\to A$ と書き、それぞれの $U$ 成分を $t_{G,U},u_{G,U}$ と書く。等号の意味は対角に沿う逆像なので

$$
a\in(\langle t_G,u_G\rangle^*\Delta_A)(U)
\iff (t_{G,U}(a),u_{G,U}(a))\in\Delta_A(U)
\iff t_{G,U}(a)=u_{G,U}(a).
$$

関係式も入力項の組に沿う逆像なので、その段階の関係部分層への所属で判定できる。所属式については[内部言語の式と判断](../CATB6-05/index.md#def-catb6-05-internal-formulas)で指定された評価射に沿って真を引き戻す。共通部分は各段階で $P(U)\cap Q(U)$ となるから連言の条件も従う。

偽を計算するため、次の成分を持つ部分前層 $O$ を考える。

$$
O(U)=
\begin{cases}
G(U)&\varnothing\in J(U),\\
\varnothing&\text{それ以外}.
\end{cases}
$$

[Grothendieck位相とsite](../CATB5-02/index.md#def-catb5-02-grothendieck-topology)の引き戻し安定性から、空篩が $U$ を覆えばその引き戻しである空篩も任意の $V\to U$ を覆う。従って制限で閉じる。

被覆篩 $S$ 上の $O$ の整合族は $G$ で貼り合わさり、各 $r\in S$ の始域では、その整合族の成分が $O$ に属するため空篩が被覆である。

空篩の引き戻しがすべて被覆なので推移律から空篩が $U$ を覆う。貼り合わせは $O(U)$ に属する。一意性は $G$ の層条件から従う。よって $O$ は部分層である。

任意の部分層 $T\subseteq G$ に対し、空篩が $U$ を覆うとき $T(U)$ と $G(U)$ はともに一点集合である。空整合族の貼り合わせが一意だからである。包含はこの一点を対応させるので $O(U)\subseteq T(U)$。空篩が覆わない場合は空集合の包含である。

従って $O$ は最小部分層であり、[部分対象の最小元と有限和](../CATB6-01/index.md#thm-catb6-01-subobject-join)による偽の解釈を与える。

次に選言を考える。切断 $a\in G(U)$ について

$$
L_a=\{r:V\to U\mid a|_r\in P(V)\cup Q(V)\}
$$

と置く。制限で所属が保存されるので $L_a$ は篩である。$H(U)=\{a\in G(U)\mid L_a\in J(U)\}$ と定める。[篩の引き戻し](../CATB5-02/index.md#def-catb5-02-sieve-pullback)の定義を用いると、射 $s:W\to U$ と任意の $r:Z\to W$ に対し

$$
r\in L_{a|_s}\iff sr\in L_a,\qquad
L_{a|_s}=s^*L_a.
$$

従って被覆の引き戻し安定性で $H$ は制限に閉じる。

被覆篩 $S$ 上の $H$ の整合族を $G$ で $a$ に貼り合わせると、各 $s\in S$ に対し $s^*L_a=L_{a|_s}$ が被覆となる。

推移律で $L_a\in J(U)$ が従い、$a\in H(U)$。一意性は $G$ から継承するので $H$ は層である。

$a$ が $P(U)$ または $Q(U)$ に属するなら $L_a$ は最大篩であり、$P,Q\subseteq H$。

逆に $T$ が両者を含む部分層なら、$a\in H(U)$ の制限は $L_a$ 上で全て $T$ に属する。

[強制関係の局所性](#thm-catb6-06-forcing-locality)の貼り合わせの議論から $a\in T(U)$。よって $H$ は最小の上界であり、[部分対象の最小元と有限和](../CATB6-01/index.md#thm-catb6-01-subobject-join)による選言の意味である。

$L_a$ が被覆であることは、$L_a$ に含まれる被覆篩があることと同値である（[被覆篩の上方閉性](../CATB5-02/index.md#prop-catb5-02-cover-closure)）。

含意について、候補 $K(U)$ を、すべての $r:V\to U$ について $a|_r\in P(V)$ なら $a|_r\in Q(V)$ となる切断の集合とする。射を合成して調べられるので制限で閉じる。

被覆篩 $S$ 上で $K$ に属する整合族を $a$ に貼り合わせたとする。任意の $r:V\to U$ で $a|_r\in P(V)$ と仮定する。

引き戻し篩 $r^*S$ は被覆である。その任意の $s:W\to V$ について $rs\in S$ なので

$$
a|_{rs}\in K(W),\qquad a|_{rs}\in P(W).
$$

$K(W)$ の条件に恒等射を代入すれば $a|_{rs}\in Q(W)$ となる。[強制関係の局所性](#thm-catb6-06-forcing-locality)を $Q$ と被覆篩 $r^*S$ に適用すると $a|_r\in Q(V)$。

全ての $r$ について示せたので $a\in K(U)$。貼り合わせの一意性は $G$ から継承するので、これで $K$ が層になる。

恒等射の場合を取れば $K\cap P\subseteq Q$。逆に $T\cap P\subseteq Q$ となる部分層 $T$ の切断 $a\in T(U)$ を取る。

任意の制限先で $a|_r\in T(V)$ だから、$a|_r\in P(V)$ なら共通部分に属し $Q(V)$ に入る。従って $T\subseteq K$ である。[部分対象の含意](../CATB6-01/index.md#thm-catb6-01-subobject-implication)の最大性から $K=P\Rightarrow Q$。

存在量化では射影 $\pi:G\times A\to G$ を使う。[射に沿う量化子](../CATB6-02/index.md#def-catb6-02-quantifiers)の左随伴としての存在量化は $D\to G$ の像である。

実際、部分層 $T$ に像が含まれることは $D\to G$ が $T$ を経由すること、つまり $D\subseteq\pi^*T$ と同値である。

[層の局所像とエピ射の判定](../CATB5-08/index.md#thm-catb5-08-sheaf-image)にこの射を適用する。段階 $V$ における $a|_r$ の原像は、ちょうど

$$
\{(a|_r,b)\mid b\in A(V),\ (a|_r,b)\in D(V)\}
$$

である。原像を持つ射の篩が被覆になるという条件を、[被覆篩の上方閉性](../CATB5-02/index.md#prop-catb5-02-cover-closure)で書き換えれば存在量化の条件を得る。別々の射で選んだ $b$ の整合性は要求されない。

全称量化の候補 $M(U)$ は、すべての $r:V\to U$ と $b\in A(V)$ について $(a|_r,b)\in D(V)$ となる切断の集合とする。射の合成で制限安定性が従う。

被覆篩 $S$ 上の $M$ の整合族を $G$ で $a$ に貼り合わせる。

任意の $r:V\to U$ と $b\in A(V)$ を固定すると、被覆篩 $r^*S$ の各 $s:W\to V$ に対して

$$
a|_{rs}\in M(W),\qquad b|_s\in A(W).
$$

恒等射の場合の条件にこの二つの切断を代入して $(a|_{rs},b|_s)\in D(W)$。積の制限は成分ごとなので $(a|_r,b)|_s=(a|_{rs},b|_s)$ である。[強制関係の局所性](#thm-catb6-06-forcing-locality)を $D$ と被覆篩 $r^*S$ に適用して $(a|_r,b)\in D(V)$。

従って $a\in M(U)$ であり、貼り合わせの一意性は $G$ から継承するので $M$ は部分層である。

恒等射の場合から $\pi^*M\subseteq D$。逆に $\pi^*T\subseteq D$ と仮定すると、$a\in T(U)$ の任意の制限 $a|_r$ は $T(V)$ に属する。

よって任意の $b\in A(V)$ について $(a|_r,b)\in D(V)$ となり $T\subseteq M$。これは

$$
\pi^*T\subseteq D\iff T\subseteq M
$$

を証明したことになる。[射に沿う量化子](../CATB6-02/index.md#def-catb6-02-quantifiers)の右随伴の一意性から $M=\forall_\pi D$。

以上で全ての強制条件が、既習の部分対象による解釈と一致する。
<!-- proof-end -->

## 4. 開集合と前層で計算する

終対象の部分対象を部分終対象と呼ぶ。以下では空文脈の式とその意味である部分終対象を同じ記号で表す。

二点離散空間で $P$ は $\{p\}$ の上、$Q$ は $\{q\}$ の上で成立する部分終対象とする。

$X$ では $P,Q$ はどちらも強制されないが、開被覆 $\{\{p\},\{q\}\}$ 上でそれぞれ一方が成立する。生成された被覆篩に含まれる空開集合でも両方が成立する。

よって[選言の強制条件](#thm-catb6-06-forcing-clauses)から

$$
X\Vdash P\vee Q
$$

が従う。

一般の開集合圏で、開集合 $B$ に対応する部分終対象を $P_B$ と書く。第2節の定義例と同じ構成で

$$
P_B(U)=
\begin{cases}
\{*\}&U\subseteq B,\\
\varnothing&\text{それ以外}
\end{cases}
$$

と定める。従って[強制関係](#def-catb6-06-forcing)から

$$
U\Vdash P_B\iff U\subseteq B
$$

となる。

[偽と否定の強制条件](#thm-catb6-06-forcing-clauses)により、偽は空開集合で成立する。従って否定の条件は任意の開集合 $V\subseteq U$ について $V\subseteq B$ なら $V=\varnothing$ となること。$V=U\cap B$ を取れば

$$
U\Vdash\neg P_B\iff U\cap B=\varnothing.
$$

逆方向も $V\subseteq U\cap B$ から従う。従って否定に対応する開集合は補集合の内部 $\operatorname{int}(X\setminus B)$ である。

$X=\mathbb R$、$B=(0,\infty)$ なら否定は $(-\infty,0)$、二重否定は $(0,\infty)$。

$0$ の近傍では $P_B$ もその否定も強制されず、$P_B\vee\neg P_B$ は全体で強制されない。

次に対象 $0,1$、二つの恒等射と非恒等射 $0\to1$ だけを持つ小圏に最大篩だけを被覆とする位相を入れる。このとき任意の前層は層である。[site上の層](../CATB5-03/index.md#def-catb5-03-site-sheaf)の条件を調べると、最大篩上の整合族は恒等射における値で決まり、逆にその値の各制限で整合族を作れるためである。

$P(0)=\{*\},P(1)=\varnothing$ とする。$1$ で $P$ は強制されない。

しかし射 $0\to1$ の始域で $P$ が強制され、偽はどこでも強制されない。従って $1$ で $\neg P$ も強制されない。

この例では含意や全称量化を評価するとき、現在の段階だけでなく制限先も見る必要がある。

## 5. 演習

### CATB6-06-A01 制限と局所性

- Level: A

二点離散空間 $X=\{p,q\}$ で $P=P_{\{p\}}$ とする。全ての開集合で $P$ の強制関係を求めよ。$X$ を二点の開集合で覆うことは $X\Vdash P$ を示すか。

<!-- solution-start -->
**詳細解答**

[強制関係](#def-catb6-06-forcing)により $U\subseteq\{p\}$ が条件である。空集合と $\{p\}$ では成立し、$\{q\}$ と $X$ では成立しない。制限先は小さい開集合なのでこの真理は保存される。

被覆 $\{\{p\},\{q\}\}$ のうち $\{q\}$ で条件が失敗する。従って[強制関係の局所性](#thm-catb6-06-forcing-locality)の全称条件を満たさず、$X$ では強制されない。
<!-- solution-end -->

### CATB6-06-A02 選言と連言

- Level: A

A01の空間で $Q=P_{\{q\}}$ を追加する。$X$ で $P\vee Q$ と $P\wedge Q$ を判定せよ。

<!-- solution-start -->
**詳細解答**

[強制条件](#thm-catb6-06-forcing-clauses)の選言では、二つの一点開集合と空集合からなる被覆篩を取る。$\{p\}$ では $P$、$\{q\}$ では $Q$、空集合では両方が成立する。よって $X\Vdash P\vee Q$。

連言では $X$ 自身で両方が成立する必要がある。$X$ は $\{p\}$ にも $\{q\}$ にも含まれないから、どちらも成立せず、連言は強制されない。
<!-- solution-end -->

### CATB6-06-A03 空の被覆

- Level: A

開集合のsiteの空開集合では偽と存在式が強制されることを示せ。最大篩だけを被覆とする一対象一射のsiteでは、偽は強制されるか。

<!-- solution-start -->
**詳細解答**

空開集合は空の開被覆で覆えるので、生成される空篩も被覆である。[強制条件](#thm-catb6-06-forcing-clauses)より偽が強制される。存在式の条件にも空篩を選べる。その篩に属する射は一つもなく、各射に証人を要求する条件は空虚に成立する。

一対象一射のsiteでは最大篩は恒等射を含むので空篩と異なる。空篩が被覆ではないから偽は強制されない。
<!-- solution-end -->

### CATB6-06-A04 含意を開集合で求める

- Level: A

$\mathbb R$ で $P=P_{(0,2)}$、$Q=P_{(1,3)}$ とする。$P\Rightarrow Q$ に対応する最大の開集合を求めよ。

<!-- solution-start -->
**詳細解答**

[含意の強制条件](#thm-catb6-06-forcing-clauses)は、任意の開集合 $V\subseteq U$ が $(0,2)$ に含まれるなら $(1,3)$ にも含まれること。$V=U\cap(0,2)$ を代入すると必要条件は

$$
U\cap(0,2)\subseteq(1,3).
$$

逆にこの包含があれば任意の $V$ に対して $V\subseteq U\cap(0,2)\subseteq(1,3)$ なので十分である。除くべき集合は $(0,2)\setminus(1,3)=(0,1]$。開集合 $U$ の最大候補は補集合の内部

$$
(-\infty,0)\cup(1,\infty)
$$

となる。$0$ 自身は除くべき集合にはないが、どの近傍も $(0,1]$ と交わるので最大開集合には入らない。
<!-- solution-end -->

### CATB6-06-B01 全称量化と新しい切断

- Level: B

第4節の二対象圏で最大篩だけを被覆とする。層 $A$ を $A(1)=\varnothing,A(0)=\{b\}$ とする。空文脈で $\forall x:A\,\bot$ と $\exists x:A\,\top$ を両段階で判定せよ。

<!-- solution-start -->
**詳細解答**

制限写像 $A(1)\to A(0)$ は空集合からの唯一の写像なので前層を定める。最大篩だけの位相では層である。偽はどちらでも強制されない。

[全称量化の強制条件](#thm-catb6-06-forcing-clauses)では、段階 $0$ の恒等射と入力 $b$ が反例になる。段階 $1$ では自身の入力はないが、射 $0\to1$ と $b$ が反例になる。従って両段階で全称式は強制されない。

存在量化では最大篩を用いる。恒等射における証人が必要である。段階 $0$ では $b$ が証人であり、真は常に成立する。段階 $1$ では $A(1)=\varnothing$ のため証人がない。従って存在式は $0$ だけで強制される。全称式は現在の入力だけでは判定できない。
<!-- solution-end -->

### CATB6-06-B02 局所証人は貼り合わさらない

- Level: B

三点空間 $X=\{l,m,r\}$ に、開集合 $\varnothing,W=\{m\},U=\{l,m\},V=\{m,r\},X$ を持つ位相を入れる。前層 $A$ を次で与える。

$$
A(X)=\varnothing,\quad A(U)=\{u\},\quad
A(V)=\{v\},\quad A(W)=\{0,1\},\quad A(\varnothing)=\{*\}.
$$

$u|_W=0,\ v|_W=1$ とし、空集合への制限は唯一の写像とする。$A$ が層であることを確かめ、$X\Vdash\exists x:A\,\top$ を判定せよ。

<!-- solution-start -->
**詳細解答**

恒等射は恒等写像とする。$X$ からの制限は空集合からの写像、$U,V$ から空集合への二つの経路はいずれも唯一の写像なので、合成律を満たす。

$W,U,V$ の任意の開被覆はその開集合自身を含まなければならない。例えば $l$ を含む $U$ の部分開集合は $U$ だけである。この場合は自身の切断が整合族を一意に決める。空開集合の空整合族も一点に一意に貼り合わさる。

$X$ の被覆が $X$ 自身を含むなら整合族は存在しない。含まないなら $l,r$ を覆うため必ず $U,V$ を含む。しかし両方の唯一の切断の制限は $0\ne1$ なので整合族は存在しない。従ってこの場合も切断と整合族はともに空集合であり、層条件を満たす。[開集合圏の層条件との同値性](../CATB5-03/index.md#thm-catb5-03-open-equivalence)からsite上の層である。

[存在量化の強制条件](#thm-catb6-06-forcing-clauses)では $U,V$ の生成する被覆篩を使える。

$U,V$ では $u,v$、$W$ では $0$、空集合では $*$ を選べる。

真は全ての段階で成立するので $X\Vdash\exists x:A\,\top$。それでも $A(X)=\varnothing$。局所証人の選択は整合族ではなく、貼り合わせを要求できない。
<!-- solution-end -->

### CATB6-06-B03 二重否定と排中律

- Level: B

$\mathbb R$ の開集合siteで $P=P_{\mathbb R\setminus\{0\}}$ とする。$\neg P,\neg\neg P,P\vee\neg P$ を表す開集合を求めよ。

<!-- solution-start -->
**詳細解答**

[否定の強制条件](#thm-catb6-06-forcing-clauses)より、$U\Vdash\neg P$ は $U\cap(\mathbb R\setminus\{0\})=\varnothing$ と同値である。従って $U\subseteq\{0\}$。この条件を満たす開集合は空集合だけなので、否定は空集合に対応する。

その否定は、任意の開集合 $U$ が空集合と交わらないという条件になるから、二重否定は $\mathbb R$ に対応する。一方、選言は二つの開集合の和集合で表される。実際、$U$ の被覆の各開集合がいずれかの開集合に含まれれば $U$ はその和に含まれ、逆に和に含まれれば二つとの共通部分で覆える。従って

$$
P\vee\neg P\ \text{に対応する開集合}
=\mathbb R\setminus\{0\}.
$$

全体で二重否定は成立するが $P$ も排中律も成立しない。
<!-- solution-end -->

### CATB6-06-B04 原子式の等号と制限

- Level: B

第4節の二対象圏で最大篩だけを被覆とする。層 $A$ の成分を $A(1)=\{s,t\}, A(0)=\{b\}$ とし、制限は $s,t$ をともに $b$ に写す。

文脈 $x:A,y:A$ に切断 $(s,t)$ を代入する。

段階 $1$ とその制限先 $0$ で $x=y$ を判定し、段階 $1$ で $\neg(x=y)$ も判定せよ。

<!-- solution-start -->
**詳細解答**

制限は関数であり、非恒等射同士の合成はないので前層を定める。最大篩だけの位相なので層である。[層の極限の点ごとの構成](../CATB5-05/index.md#thm-catb5-05-sheaf-limits)から等号を表す対角部分層の成分は

$$
\Delta_A(1)=\{(s,s),(t,t)\},\qquad
\Delta_A(0)=\{(b,b)\}.
$$

[原子式の強制条件](#thm-catb6-06-forcing-clauses)より、$(s,t)\notin\Delta_A(1)$ なので段階 $1$ で等号は強制されない。制限した組は $(b,b)\in\Delta_A(0)$ なので段階 $0$ では等号が強制される。

否定は等号から偽への含意である。段階 $1$ からすべての制限先を調べると、射 $0\to1$ に沿った先では等号が成立し、空篩は被覆でないため偽が成立しない。従って段階 $1$ では否定も強制されない。切断が現在の段階で異なるだけでは内部の否定は結論できない。
<!-- solution-end -->

### CATB6-06-C01 局所存在から全称的な判断へ

- Level: C

任意の小site上で文脈切断 $a\in G(U)$ を取る。$\theta(a,x)$ は型 $A$ の変数を含む式、$\psi(a)$ はその変数を含まない式とする。次の二条件から $U\Vdash\psi(a)$ を直接強制条件で証明せよ。

$$
U\Vdash\exists x:A\,\theta(a,x),
$$

$$
U\Vdash\forall x:A\,(\theta(a,x)\Rightarrow\psi(a)).
$$

さらに第二条件が「$A(U)$ の各切断についてのみ含意を確認する」という条件に置き換わると成立しないことをB02の層で示せ。

<!-- solution-start -->
**詳細解答**

第一条件と[存在量化の強制条件](#thm-catb6-06-forcing-clauses)から、ある被覆篩 $S$ が存在し、各 $r:V\to U$ に対して証人 $b_r\in A(V)$ が存在する。

$$
V\Vdash\theta(a|_r,b_r).
$$

第二条件の全称量化の条件にこの $r,b_r$ を代入する。すると

$$
V\Vdash(\theta\Rightarrow\psi)(a|_r,b_r).
$$

含意の条件に恒等射 $1_V$ を代入すると、既に強制されている前件から拡張文脈での後件が強制される。$\psi$ は $x$ を自由変数に含まない。

拡張文脈での $\psi$ の意味は[内部言語の代入則](../CATB6-05/index.md#thm-catb6-05-internal-substitution)により、射影 $\pi:G\times A\to G$ に沿った逆像 $\pi^*[\![\psi]\!]_G$ である。したがって

$$
(a|_r,b_r)\in(\pi^*[\![\psi]\!]_G)(V)
\iff a|_r\in[\![\psi]\!]_G(V).
$$

従って $V\Vdash\psi(a|_r)$ であり、証人 $b_r$ の違いはこの結論に影響しない。従って全ての $r\in S$ で $\psi$ が強制される。[強制関係の局所性](#thm-catb6-06-forcing-locality)を使って $U\Vdash\psi(a)$ を得る。証人の整合性も大域的な証人も必要ない。

反例ではB02の $X$ と層 $A$ を使い、空文脈で $\theta=\top,\psi=\bot$ とする。B02で $X\Vdash\exists x:A\,\top$ を確認した。$A(X)=\varnothing$ のため、現在の段階の全入力について含意を確かめる条件は空虚に成立する。

しかし空篩は非空の開集合 $X$ を覆わないから $X$ で偽は強制されない。

本来の全称条件は $U\hookrightarrow X$ に沿って $u\in A(U)$ も調べる。$U$ は非空なので真は成立し偽は成立しない。恒等射を代入した含意の条件が失敗するため、本来の第二条件は強制されていない。
<!-- solution-end -->

## 6. まとめ

式を部分層として解釈すると、強制関係の制限安定性と局所性が得られる。選言と存在量化には被覆、含意と全称量化には任意の制限先が現れる。これで内部の論理記号とsite上の計算を結び付けられる。次講では、この局所的な意味論を踏まえ、理論のモデルを分類するトポスの考え方へ進む。
