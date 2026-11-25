# CATB5-03 site上の層条件

<!-- definition-example-audit: strict -->

## 1. 局所情報を一つの切断に戻す

[開被覆上の整合族](../CATB5-01/index.md#def-catb5-01-matching-family)では、各開集合で得た値が重なり上で一致すれば、全体へ貼り合わせられるかを調べた。前講の[Grothendieck位相](../CATB5-02/index.md#def-catb5-02-grothendieck-topology)によって、点や開集合のない圏でも、どの射の集まりを被覆とみなすかが決まった。

例えば $U$ への二つの射が、別の対象 $W$ からの二通りの合成で同じ射になるとする。二つの経路から $W$ に引き戻した値は一致してほしい。一般の圏では交差に相当する対象が存在するとは限らないが、同じ合成射を比較することはできる。今回はこの方法で整合性を表す。

以下 $(\mathcal C,J)$ は[小圏](../../CAT/CAT1-02/index.md#def-cat1-02-size)に[Grothendieck位相](../CATB5-02/index.md#def-catb5-02-grothendieck-topology) $J$ を入れたsiteとし、$F:\mathcal C^{\mathrm{op}}\to\mathbf{Set}$ は[集合値前層](../../CAT/CAT1-12/index.md#def-cat1-12-presheaf)とする。射 $f:V\to U$ に対して $F(f):F(U)\to F(V)$ であり、$s\in F(U)$ を $U$ 上の切断と呼ぶ。

## 2. 篩の上で整合するデータ

[篩](../CATB5-02/index.md#def-catb5-02-sieve) $S$ を対象 $U$ 上に取る。篩に属する各 $f:V\to U$ に対して局所値 $s_f\in F(V)$ を記録する。$f$ をさらに $g:W\to V$ で調べた値と、初めから $fg=f\circ g$ を使った値が一致するようにしたい。

<a id="def-catb5-03-sieve-matching"></a>

<!-- formal-statement-start -->
> **定義（篩上の整合族）**
>
> 小圏 $\mathcal C$ 上の集合値前層 $F$ と対象 $U$ 上の篩 $S$ に対して、篩上の整合族は、各 $f:V\to U$ ($f\in S$) に対する元 $s_f\in F(V)$ の族であり、任意の $g:W\to V$ に対して

$$
F(g)(s_f)=s_{fg}
$$

> を満たすものとする。その全体の集合を $\operatorname{Match}(S,F)$ と書く。
<!-- formal-statement-end -->

<!-- definition-example-start: def-catb5-03-sieve-matching -->
**定義の確認**。離散二点空間 $X=\{a,b\}$ の開集合圏で、$S$ は $\{a\},\{b\}$ から $X$ への包含が作る[生成篩](../CATB5-02/index.md#def-catb5-02-generated-sieve)とする。開集合圏では終域を固定すると射は始域で決まるため、ここでは射を始域で表す。生成射に因子分解する始域は $\varnothing,\{a\},\{b\}$ だけである。

$F(V)=\{0,1\}^{V}$ は $V$ から $\{0,1\}$ への写像全体を表す。包含 $g:W\hookrightarrow V$ に対する $F(g)$ は $s\mapsto s|_W$ である。恒等射の制限は恒等写像で、二度の制限は一度の制限に等しいので前層である。

$\{a\}$ 上で値 $0$、$\{b\}$ 上で値 $1$、空集合上で空写像を選ぶ。この表記では $s_V$ が包含 $V\hookrightarrow X$ に対応する成分であり、整合条件は $W\subseteq V$ に対して $s_V|_W=s_W$ となる。非恒等射による比較は次の二つだけである。

$$
s_{\{a\}}|_{\varnothing}=s_{\varnothing},
\qquad
s_{\{b\}}|_{\varnothing}=s_{\varnothing}.
$$

どちらも空写像であり、恒等射による比較も成立するので整合族である。空写像は唯一であり、二つの点での値はそれぞれ2通りなので、整合族は $2^2=4$ 個である。
<!-- definition-example-end -->

### 自然変換への翻訳

[反変Hom関手](../../CAT/CAT1-06/index.md#def-cat1-06-hom-functors) $h_U=\operatorname{Hom}_{\mathcal C}(-,U)$ の各値の中に、次の部分集合を取る。

$$
S(V)=\{f\in S\mid \operatorname{dom}f=V\}.
$$

篩の前合成閉性により $S(g)(f)=fg$ は $S(W)$ に属する。恒等則と結合則によって $S$ は前層になる。

包含を $i:S\Rightarrow h_U$ と書く。$h_U(g)(f)=fg$ だから包含は制限と可換であり、[自然変換](../../CAT/CAT1-07/index.md#def-cat1-07-natural-transformation)になる。ここで $h_U$ は既習の反変表現可能関手の記法 $h^U$ と同じ関手である。

前層 $P,Q$ の間の自然変換全体を $\operatorname{Nat}(P,Q)$ と書く。小圏上の集合値前層なので、この全体は集合である。

<a id="prop-catb5-03-match-nat"></a>

<!-- formal-statement-start -->
> **命題（整合族と自然変換の対応）**
>
> 小圏 $\mathcal C$ 上の集合値前層 $F$ と対象 $U$ 上の篩 $S$ に対して、次の対応は全単射である。

$$
\operatorname{Nat}(S,F)\longrightarrow \operatorname{Match}(S,F),
\qquad \alpha\longmapsto(\alpha_V(f))_{f:V\to U,\ f\in S}.
$$
<!-- formal-statement-end -->

成分写像の自然性が、そのまま各局所値の整合性になる。

<!-- proof-start -->
### 証明

[自然変換](../../CAT/CAT1-07/index.md#def-cat1-07-natural-transformation) $\alpha:S\Rightarrow F$ の成分は $\alpha_V:S(V)\to F(V)$ である。$g:W\to V$ での自然性に $f\in S(V)$ を代入すると、

$$
F(g)(\alpha_V(f))=\alpha_W(S(g)(f))=\alpha_W(fg).
$$

従って $s_f=\alpha_V(f)$ は整合族になる。逆に整合族から $\alpha_V(f)=s_f$ と定めると、各値の型は正しく、整合条件によって任意の $g$ について上の等式が成立する。よって自然変換である。二つの対応を続けると元の各成分または各 $s_f$ がそのまま戻るから互いに逆である。
<!-- proof-end -->

[最大篩](../CATB5-02/index.md#def-catb5-02-sieve) $M_U$ なら $1_U$ が含まれる。整合条件で篩の元として恒等射を取り、任意の $f:V\to U$ で前合成すると、

$$
s_f=s_{1_Uf}=F(f)(s_{1_U}).
$$

これに対し、最大篩でない篩は $1_U$ を含まない（含めば前合成閉性によって最大篩になる）。局所情報だけから切断を復元できるかは前層の性質となる。

## 3. 被覆篩上の一意延長

切断 $s\in F(U)$ は各 $f$ に沿って制限できる。これを $\rho_S(s)=(F(f)(s))_{f\in S}$ と置く。[反変関手の合成則](../../CAT/CAT1-06/index.md#def-cat1-06-contravariant)より $F(g)F(f)(s)=F(fg)(s)$ なので値は整合族である。異なる切断を区別できることと、すべての整合族を復元できることを分けて考える。[被覆篩](../CATB5-02/index.md#def-catb5-02-grothendieck-topology)すべてについて両方を要求するのが層条件である。

<a id="def-catb5-03-site-sheaf"></a>

<!-- formal-statement-start -->
> **定義（site上の層）**
>
> 小site $(\mathcal C,J)$ 上の集合値前層 $F$ が層であるとは、任意の対象 $U$ と被覆篩 $S\in J(U)$ について次の制限写像が全単射であることをいう。

$$
\rho_S:F(U)\longrightarrow\operatorname{Match}(S,F),
\qquad s\longmapsto(F(f)(s))_{f\in S}.
$$

> 単射性のみを要求する場合は、siteに関する分離条件を満たすという。
<!-- formal-statement-end -->

<!-- definition-example-start: def-catb5-03-site-sheaf -->
**定義の確認**。第2節の二点空間に[開集合圏のGrothendieck位相](../CATB5-02/index.md#thm-catb5-02-open-site)を入れる。$F(V)=\{0,1\}^{V}$ を取る。任意の開集合 $U$ と被覆篩 $S$ について、その始域の合併は $U$ である。

整合族に対し各 $x\in U$ を含む $V$ の局所写像から値を取る。二つの $V,W$ が $x$ を含めば、開集合 $\{x\}$ は両方に含まれる。篩の前合成閉性により $\{x\}\hookrightarrow U$ も $S$ に入る。両写像の $\{x\}$ への制限は同じ成分なので値は一致する。

従って写像 $s:U\to\{0,1\}$ が得られる。各 $V$ で値が一致するので $\rho_S(s)$ は元の族である。

また二つの切断が同じ族を与えるなら、各点を含む始域で値が一致するので同じ写像である。$U=\varnothing$ の空被覆では、空写像が唯一の切断であり空の族も唯一である。したがってすべての被覆篩について全単射である。
<!-- definition-example-end -->

層条件の単射性が一致条件、全射性が貼り合わせの存在条件に対応する。次に、切断の制限を自然変換の制限に置き換える。$i^*$ は包含 $i$ との合成で自然変換を制限する写像である。これは射に沿って篩を引き戻す記法 $f^*S$ とは作用対象が異なる。

<a id="thm-catb5-03-extension"></a>

<!-- formal-statement-start -->
> **定理（被覆篩からの自然変換の延長）**
>
> 小site $(\mathcal C,J)$ 上の集合値前層 $F$ が層であることと、任意の対象 $U$ と被覆篩 $S\in J(U)$ について、包含 $i:S\Rightarrow h_U$ に沿う制限

$$
i^*:\operatorname{Nat}(h_U,F)\longrightarrow
\operatorname{Nat}(S,F),\qquad \beta\longmapsto\beta\circ i
$$

> が全単射であることは同値である。
<!-- formal-statement-end -->

全体の切断と最大篩からの自然変換を結びつければ、二つの全単射条件を比較できる。

<!-- proof-start -->
### 証明

[反変Yonedaの補題](../../CAT/CAT1-11/index.md#thm-cat1-11-contravariant-yoneda)を対象 $U$ と反変関手 $F$ に適用する。[小圏は局所小](../../CAT/CAT1-02/index.md#prop-cat1-02-small-local)であり、$F$ は集合値であるから適用できる。対応は

$$
F(U)\longrightarrow\operatorname{Nat}(h_U,F),
\qquad s\longmapsto\beta^s,\qquad
\beta^s_V(f)=F(f)(s)
$$

で、その逆は $\beta\mapsto\beta_U(1_U)$ である。[整合族と自然変換の対応](#prop-catb5-03-match-nat)により、$\beta^s\circ i$ の局所値は

$$
(\beta^s\circ i)_V(f)=\beta^s_V(f)=F(f)(s).
$$

よって上の二つの全単射の間で $i^*$ は $\rho_S$ に一致する。従って $\rho_S$ が全単射であることと $i^*$ が全単射であることは同値である。すべての被覆篩について適用すれば結論を得る。
<!-- proof-end -->

例えば二対象 $0,1$ と非恒等射 $u:0\to1$ を持つ圏で、$0$ では最大篩だけ、$1$ では最大篩と $0\to1$ が生成する篩を被覆とする。

最大篩の公理は成立する。[篩の引き戻しの合成則](../CATB5-02/index.md#prop-catb5-02-sieve-pullback-laws)により最大篩の引き戻しは最大篩であり、非最大の被覆篩 $\{u\}$ を $u$ で引き戻しても最大篩 $M_0$ となる。恒等射では変わらない。

推移律で非最大の被覆篩を使う場合、$0\to1$ に沿う引き戻しが最大ならその射自身が調べている篩に入るため、その篩も被覆となる。最大篩を使う場合は恒等射での条件がそのまま結論となる。

前層は写像 $r:F(1)\to F(0)$ で決まる。非最大の被覆篩は $\{u\}$ であり、$0$ に入る射は恒等射だけなので整合条件は $F(1_0)(s_u)=s_u$ のみである。したがって整合族は $F(0)$ の元一つと対応し、制限写像はこの対応の下で $r$ になる。

層条件は $r$ が全単射であることに等しい。例えば $r:\{0,1\}\to\{*\}$ は全射だが単射でない。一方 $r:\varnothing\to\{*\}$ は単射だが全射でない。前者は一意性、後者は存在が壊れる。

最大篩では常に延長できるので、被覆篩の選び方が層条件の強さを決める。

## 4. 生成射だけで整合族を作る

[生成篩](../CATB5-02/index.md#def-catb5-02-generated-sieve)には生成射の全ての前合成が入る。生成射ごとに局所値を決めたら、その前合成上の値は強制される。しかし一つの射が複数の因子分解を持つ可能性がある。

<a id="prop-catb5-03-generator-test"></a>

<!-- formal-statement-start -->
> **命題（生成篩上の整合族の判定）**
>
> 小圏 $\mathcal C$ 上の集合値前層 $F$、射族 $(u_i:U_i\to U)_{i\in I}$、その生成篩 $S=\langle u_i:i\in I\rangle$ を取る。ただし $I$ は集合とする。整合族は、各 $s_i\in F(U_i)$ であって、任意の $i,j\in I$ と $v:W\to U_i,\ w:W\to U_j$ について

$$
u_iv=u_jw\ \Longrightarrow\ F(v)(s_i)=F(w)(s_j)
$$

> を満たす族と全単射に対応する。
<!-- formal-statement-end -->

核心は、同じ射を二通りに因子分解しても値が変わらないことにある。

<!-- proof-start -->
### 証明

[篩上の整合族](#def-catb5-03-sieve-matching)から $s_i=s_{u_i}$ と置く。共通の始域 $W$ を持つ $v,w$ で合成が等しければ、整合条件から

$$
F(v)(s_i)=s_{u_iv}=s_{u_jw}=F(w)(s_j)
$$

となる。

逆に条件を満たす族を取る。[生成篩](../CATB5-02/index.md#def-catb5-02-generated-sieve)の定義から、任意の $f:W\to U$ ($f\in S$) は $f=u_iv$ と書ける。$s_f=F(v)(s_i)$ と置く。仮定により因子分解の選択に依存しない。$g:Z\to W$ に対し $fg=u_i(vg)$ だから

$$
s_{fg}=F(vg)(s_i)=F(g)(F(v)(s_i))=F(g)(s_f).
$$

よって整合族である。元の生成射で $v=1_{U_i}$ を選ぶと $s_{u_i}=F(1_{U_i})(s_i)=s_i$ が戻る。逆方向も整合条件により任意の $f=u_iv$ で元の $s_f$ が戻る。
<!-- proof-end -->

同じ $i=j$ の場合も必要である。例えば一対象の加法モノイドの圏では合成が加算なので $u_i+v=u_i+w$ は $v=w$ を強制するが、一般の射にはそのような消去則はない。

## 5. 通常の開被覆による層条件との同値性

開集合圏では共通の始域 $W$ を持つ二つの射は、$W\subseteq U_i\cap U_j$ を意味する。交差上の一致を調べれば、さらに小さな $W$ 上での一致も自動的に得られる。

<a id="thm-catb5-03-open-equivalence"></a>

<!-- formal-statement-start -->
> **定理（開集合圏の層条件との同値性）**
>
> 位相空間 $X$ の開集合圏 $\mathcal O(X)$ に、開集合の合併によって被覆篩を指定するGrothendieck位相 $J$ を入れる。集合値前層 $F$ がsite $(\mathcal O(X),J)$ 上の層であることと、任意の開集合 $U$ と任意の開被覆 $(U_i)_{i\in I}$ について、交差上で一致する局所切断族が $F(U)$ の一意な切断から得られることは同値である。空集合の空被覆も含める。
<!-- formal-statement-end -->

開被覆からは生成篩を作り、逆に被覆篩からは全始域を集めて開被覆を作る。この二方向で整合族の対応を調べる。

<!-- proof-start -->
### 証明

[開集合圏のGrothendieck位相](../CATB5-02/index.md#thm-catb5-02-open-site)では、篩の始域の合併が $U$ であることが被覆性であった。

まず開被覆の包含 $u_i:U_i\hookrightarrow U$ から生成篩 $S$ を取る。各 $U_i$ が始域として含まれ、全始域は $U$ の部分集合だからその合併は $U$。よって被覆篩である。[生成篩上の整合族の判定](#prop-catb5-03-generator-test)を適用すると、整合族は局所切断 $s_i\in F(U_i)$ で、任意の開集合 $W\subseteq U_i\cap U_j$ について

$$
s_i|_W=s_j|_W
$$

となるものに対応する。ここで $s_i|_W$ は包含に対する $F$ の作用を表す。特に $W=U_i\cap U_j$ を選べる。逆に交差上で一致するなら、$W\subseteq U_i\cap U_j$ の包含に沿って制限する。[反変関手の合成則](../../CAT/CAT1-06/index.md#def-cat1-06-contravariant)により、

$$
s_i|_W=(s_i|_{U_i\cap U_j})|_W
=(s_j|_{U_i\cap U_j})|_W=s_j|_W.
$$

従って整合族は通常の[開被覆上の整合族](../CATB5-01/index.md#def-catb5-01-matching-family)に一致する。[siteの層条件](#def-catb5-03-site-sheaf)をこの被覆篩に適用すると、一意な大域切断が得られる。

逆に[通常の開被覆による層条件](../CATB5-01/index.md#def-catb5-01-topological-sheaf)を仮定する。被覆篩 $S$ を任意に取れば、全始域の族 $(V)_{V\to U\in S}$ は開被覆である。$S$ の整合族 $(s_V)$ に対し、$V,W$ の交差への包含を前合成すると $V\cap W\to U$ も篩に属する。従って

$$
s_V|_{V\cap W}=s_{V\cap W}=s_W|_{V\cap W}.
$$

通常の層条件によって一意な $s\in F(U)$ が存在し、すべての $V\to U\in S$ について $s|_V=s_V$ を満たす。これは $\rho_S(s)$ が元の整合族であることを意味し、一意性もそのまま従う。

空被覆の場合は生成篩が空で、整合族は空の族ただ一つである。両条件とも $F(\varnothing)$ が一元集合であることを要求する。従って空の場合も同値である。
<!-- proof-end -->

この同値性から、[連続写像の層](../CATB5-01/index.md#thm-catb5-01-continuous-sheaf)は開集合圏のsiteの層にもなる。一方、局所的な値を持つ任意の前層が層になるわけではない。次講では整合族を使って前層を層へ近づける。

## 6. 演習

### CATB5-03-A01 最大篩

- Level: A

任意の前層 $F$ について、最大篩 $M_U$ に対する $\rho_{M_U}$ の逆写像を書け。

<!-- solution-start -->
**詳細解答**

整合族 $(s_f)$ に対して $s_{1_U}\in F(U)$ を返す。$f:V\to U$ について[整合条件](#def-catb5-03-sieve-matching)を $1_U$ と $f$ に適用すると、

$$
F(f)(s_{1_U})=s_{1_Uf}=s_f.
$$

逆に $s$ から作った族の $1_U$ 成分は $F(1_U)(s)=s$。よって両方向の合成は恒等写像であり、逆写像は $(s_f)\mapsto s_{1_U}$ である。
<!-- solution-end -->

### CATB5-03-A02 空篩

- Level: A

空篩が $U$ の被覆篩であるとき、$F(U)=\{0,1\}$、$F(U)=\varnothing$ のそれぞれについて $\rho_S$ の単射性・全射性を判定せよ。

<!-- solution-start -->
**詳細解答**

[篩上の整合族](#def-catb5-03-sieve-matching)では空篩に対する条件は空虚に成立し、空の族一つだけがあるので、終域は $\{()\}$ である。前者は $0,1$ の両方が $()$ に写るから全射だが単射でない。後者は異なる元がないので単射だが、$()$ に逆像がなく全射でない。層条件は $F(U)$ が一元集合であるときに限り成立する。
<!-- solution-end -->

### CATB5-03-A03 開被覆の数え上げ

- Level: A

離散三点空間 $X=\{a,b,c\}$ で $U_1=\{a,b\}$、$U_2=\{b,c\}$ とし、$F(V)=\{0,1\}^V$ とする。この被覆が生成する篩上の整合族の個数を求めよ。

<!-- solution-start -->
**詳細解答**

[生成篩上の整合族の判定](#prop-catb5-03-generator-test)と交差上の制限により、$s_1(a),s_1(b),s_2(b),s_2(c)$ の四つの値に $s_1(b)=s_2(b)$ という制約が付く。自由な値は $a,b,c$ の三つで各2通り、従って $2^3=8$ 個である。大域写像は各点にその自由な値を割り当てたものに一意に決まる。
<!-- solution-end -->

### CATB5-03-A04 自然性の確認

- Level: A

$S$ を $U$ 上の篩、$s\in F(U)$ とする。$\alpha_V(f)=F(f)(s)$ が $S\Rightarrow F$ の自然変換となることを、任意の $g:W\to V$ で確かめよ。

<!-- solution-start -->
**詳細解答**

$f\in S(V)$ なら $fg\in S(W)$ である。[反変関手の合成則](../../CAT/CAT1-06/index.md#def-cat1-06-contravariant)から $F(g)\circ F(f)=F(fg)$。従って

$$
F(g)(\alpha_V(f))=F(g)F(f)(s)
=F(fg)(s)=\alpha_W(S(g)(f)).
$$

すべての $g,f$ で成立するので自然性を満たす。
<!-- solution-end -->

### CATB5-03-B01 被覆と表現可能な前層

- Level: B

第3節の二対象のsiteで $h_0=\operatorname{Hom}_{\mathcal C}(-,0)$ と $h_1=\operatorname{Hom}_{\mathcal C}(-,1)$ を取り、どちらが層か判定せよ。

<!-- solution-start -->
**詳細解答**

[反変Hom関手](../../CAT/CAT1-06/index.md#def-cat1-06-hom-functors)の定義から、対象ごとの値は次の通りである。

$$
h_0(0)=\{1_0\},\qquad h_0(1)=\varnothing,
$$

$$
h_1(0)=\{u\},\qquad h_1(1)=\{1_1\}.
$$

$1$ の非最大被覆上の整合族は $0$ 上の値一つで決まる。$h_0(u)$ は空集合から一元集合への写像で全射でない。$h_1(u)$ は前合成による $1_1\mapsto 1_1u=u$ という全単射である。最大篩に関する制限は A01 の計算で常に全単射であるから、$h_1$ は層、$h_0$ は層でない。従ってsiteの公理だけから表現可能な前層が層になるとはいえない。
<!-- solution-end -->

### CATB5-03-B02 同じ生成射の二つの因子分解

- Level: B

二点集合 $D=\{a,b\}$ の全写像を射とする一対象圏を取り、合成を関数合成とする。前層 $F$ の値を $D$ から $\{0,1\}$ への写像全体、射への作用を前合成とする。全ての点を $a$ に送る定数射 $c_a$ が生成する篩上の整合族を求めよ。

<!-- solution-start -->
**詳細解答**

$c_a:D\to D$ はすべての点を $a$ に送る写像である。任意の射 $v$ で $c_av=c_a$ だから、[生成篩](../CATB5-02/index.md#def-catb5-02-generated-sieve)は $\{c_a\}$ である。前合成による作用は $F(v)(s)=s\circ v$ で、整合族は成分 $s=s_{c_a}$ 一つで決まる。[整合条件](#def-catb5-03-sieve-matching)は全ての $v$ に対して

$$
s\circ v=s_{c_av}=s
$$

となることを要求する。特に $v=c_a$ とし、両辺を $b$ で評価すると

$$
s(b)=(s\circ c_a)(b)=s(a)
$$

となる。逆に定数写像なら任意の前合成で値が変わらない。よって整合族は値 $0$ または値 $1$ の定数写像の2個である。生成射が一つでも自己比較が必要だと分かる。
<!-- solution-end -->

### CATB5-03-B03 分離性と存在の違い

- Level: B

離散空間 $\mathbb N$ の開集合圏に第5節のGrothendieck位相を入れる。前層の値 $F(V)$ を有限個の値しか取らない写像 $V\to\mathbb N$ の集合とする。siteに関する分離条件を満たすが層でないことを示せ。

<!-- solution-start -->
**詳細解答**

写像を制限しても像が増えないので前層となる。[開集合圏のGrothendieck位相](../CATB5-02/index.md#thm-catb5-02-open-site)では、$V$ 上の被覆篩の始域の合併は $V$ である。二つの写像の各制限が一致するなら、各点を含む始域上で値を比較できるので各点で一致する。空集合には空写像一つしかない。従ってすべての $\rho_S$ は単射である。

一方 $\mathbb N$ の一元集合による開被覆上で $s_{\{n\}}(n)=n$ と置く。異なる一元集合の交差は空集合だから制限は空写像で一致し、自分自身との比較も成立する。任意の共通の始域は交差に含まれるので、その上でも一致する。[生成篩上の整合族の判定](#prop-catb5-03-generator-test)で整合族となる。

延長 $s$ は全ての $n$ で $s(n)=n$ となるので無限個の値を取り、$F(\mathbb N)$ に属さない。全射性が失敗する。
<!-- solution-end -->

### CATB5-03-B04 大域切断を使わない比較

- Level: B

$S\subseteq T$ を同じ対象 $U$ 上の篩とし、$S$ が被覆であるとする。$F$ が層なら、$T$ 上の整合族の $S$ への制限が全単射になることを示せ。

<!-- solution-start -->
**詳細解答**

[被覆篩の上方閉性](../CATB5-02/index.md#prop-catb5-02-cover-closure)により $T$ も被覆である。制限写像を $q:\operatorname{Match}(T,F)\to\operatorname{Match}(S,F)$ とする。$T$ 上の整合族から $S$ の射の成分だけを残す。$S$ は前合成で閉じるので、残った族も整合条件を満たす。

任意の切断 $s\in F(U)$ と $f\in S$ について

$$
q(\rho_T(s))_f=F(f)(s)=\rho_S(s)_f.
$$

従って $q\circ\rho_T=\rho_S$。[層条件](#def-catb5-03-site-sheaf)で $\rho_S,\rho_T$ は全単射であるため、

$$
q=\rho_S\circ\rho_T^{-1},
\qquad q^{-1}=\rho_T\circ\rho_S^{-1}.
$$

よって $q$ も全単射である。特に $S$ 上の族は大きい篩にも一意に拡張される。
<!-- solution-end -->

### CATB5-03-C01 加法モノイドでの層条件

- Level: C

一対象圏の射を非負整数 $\mathbb N_0=\{0,1,2,\ldots\}$、合成を加算、恒等射を $0$ とする。被覆篩を

$$
S_a=\{n\in\mathbb N_0\mid n\ge a\}
\quad(a\in\mathbb N_0)
$$

全体とする。この指定がGrothendieck位相を与えることも確認せよ。集合 $E$ と写像 $t:E\to E$ から、唯一の対象での値を $E$ とし、射への作用を $F(n)=t^n$ と定める。ここで $t^n$ は $t$ の $n$ 回合成であり、$t^0=1_E$ とする。すべての被覆篩について層条件を具体化し、$F$ が層となるための必要十分条件を示せ。

<!-- solution-start -->
**詳細解答**

各 $S_a$ は $n\ge a$ と $k\in\mathbb N_0$ から $n+k\ge a$ が従うため、[篩](../CATB5-02/index.md#def-catb5-02-sieve)である。

まず[Grothendieck位相の三公理](../CATB5-02/index.md#def-catb5-02-grothendieck-topology)を確認する。最大篩は $S_0$。[篩の引き戻し](../CATB5-02/index.md#def-catb5-02-sieve-pullback)により、任意の射 $m$ に沿う引き戻しは $m+k\ge a$ となる非負整数 $k$ の篩である。従って

$$
m^*S_a=S_{\max(0,a-m)}
$$

となり、被覆である。

推移律では被覆篩 $S_a$ と篩 $R$ を取る。すべての $m\in S_a$ で $m^*R$ が被覆なら、特に $a^*R$ は非空なので、ある $k$ について $a+k\in R$。よって $R$ は非空である。

非空篩 $R$ は非負整数の部分集合なので最小元 $b$ を持つ。最小性から $R\subseteq S_b$。逆に $n\ge b$ なら $n=b+(n-b)$ で、$n-b\in\mathbb N_0$ だから前合成閉性より $n\in R$ である。従って $S_b\subseteq R$ でもあり、$R=S_b$ となる。従って $R$ も被覆であり三公理が成立する。

$t^0=1_E$ であり、任意の $m,n\in\mathbb N_0$ に対して $t^{m+n}=t^n\circ t^m$ なので[反変関手の合成則](../../CAT/CAT1-06/index.md#def-cat1-06-contravariant)を満たす。

[篩上の整合族](#def-catb5-03-sieve-matching)の定義で、射 $f$ を $n\ge a$、前合成する射 $g$ を $k\in\mathbb N_0$ と読み替える。整合族は元 $s_n\in E$ の族であって、

$$
s_{n+k}=t^k(s_n)
\quad(n\ge a,\ k\in\mathbb N_0)
$$

を満たすものである。特に $n=a$ とすると全成分は $s_{a+k}=t^k(s_a)$ に強制される。逆に任意の $x\in E$ に対して $s_{a+k}=t^k(x)$ と置けば、

$$
t^\ell(s_{a+k})=t^\ell t^k(x)
=t^{k+\ell}(x)=s_{a+k+\ell}.
$$

従って整合族になり、$s_a$ を取る操作とこの構成は互いに逆である。$\operatorname{Match}(S_a,F)$ は $E$ と全単射に対応する。

大域切断 $y\in E$ の局所値は $s_n=t^n(y)$ である。整合族から $a$ 成分を取り出す上の全単射を $\theta_a:\operatorname{Match}(S_a,F)\to E$ と書くと、

$$
(\theta_a\circ\rho_{S_a})(y)=t^a(y).
$$

ゆえに制限写像 $\rho_{S_a}$ の全単射性は $t^a$ の全単射性に一致する。すべての $a$ で成立するなら特に $a=1$ で $t$ は全単射である。逆に $t$ が全単射なら $t^0=1_E$ と任意の有限回の合成 $t^a$ は全単射である。結論として $F$ は層であることと $t$ が全単射であることは同値である。分離条件だけなら同じ論法で $t$ の単射性に一致する。
<!-- solution-end -->

## 7. まとめ

篩上の整合族は前合成との可換性を要求し、それは篩から前層への自然変換と同じデータである。siteの層条件は、被覆篩上の整合族が大域切断から一意に復元できること、または自然変換が一意に延長できることを表す。開集合圏では生成射の比較が交差上の比較に戻るので通常の層条件と一致する。次講では、整合族同士をさらに細かい被覆篩で比較することによって、新しい前層を構成する。
