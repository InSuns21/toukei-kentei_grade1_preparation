# CATB5-07 層の圏のトポス構造

<!-- definition-example-audit: strict -->

## 1. 局所的な真を貼り合わせる

前講では[前層の圏が初等トポスになること](../CATB5-06/index.md#thm-catb5-06-presheaf-topos)を示した。有限極限で条件を組み合わせ、指数対象で関数を扱い、部分対象分類子で条件の真偽を記録できた。層の圏でもこの三つを使いたい。しかし前層の真偽値をそのまま使うと、全ての局所領域で真なのに全体では真でないという値まで含まれる。層の貼り合わせはこの差を許さない。

以下、小site $(\mathcal C,J)$ を固定する。[Grothendieck位相とsite](../CATB5-02/index.md#def-catb5-02-grothendieck-topology)の三公理（最大篩・引き戻し安定性・推移律）を用いる。$J(U)$ は対象 $U$ の被覆篩の集合とする。

$yU=\mathcal C(-,U)$ は[表現可能前層](../../CAT/CAT1-12/index.md#def-cat1-12-yoneda-embedding)である。前層の圏を $\widehat{\mathcal C}$、層とその自然変換からなる充満部分圏を $\operatorname{Sh}(\mathcal C,J)$ と書く。

射 $f:V\to U$ に沿う前層の制限写像は

$$
F(f):F(U)\to F(V)
$$

と書く。合成は右から左に書く。

[site上の層](../CATB5-03/index.md#def-catb5-03-site-sheaf)では、被覆篩 $R$ 上の整合族 $x_r\in F(\operatorname{dom}r)$ に対し、それらを制限として持つ元 $x\in F(U)$ が唯一存在する。

ここで $\operatorname{dom}r$ は射 $r$ の始域である。

特に二つの元が被覆篩上で一致すれば等しい。この存在・一意性を以下の構成で繰り返し使う。空篩が被覆になる場合も含め、表現可能前層が層であるとは仮定しない。

## 2. 局所的に成立する篩を閉じる

開集合 $U$ の開被覆の全てである条件が成立するなら、$U$ でも成立してほしい。

射 $f:V\to U$ に対して、条件が $V$ の被覆上で成立するとは、[篩](../CATB5-02/index.md#def-catb5-02-sieve) $S$ の[引き戻し](../CATB5-02/index.md#def-catb5-02-sieve-pullback) $f^*S$ が被覆篩になることである。この局所判定と篩への所属が一致するようにする。

<a id="def-catb5-07-closed-sieve"></a>

<!-- formal-statement-start -->
> **定義（J閉篩）**
>
> 小site $(\mathcal C,J)$ の対象 $U$ 上の篩 $S$ が $J$ 閉であるとは、全ての射 $f:V\to U$ に対して次の含意が成り立つことをいう。

$$
f^*S\in J(V)\ \Longrightarrow\ f\in S.
$$

> このような篩を $J$ 閉篩と呼ぶ。
<!-- formal-statement-end -->

逆の含意はどんな篩でも成立する。$f\in S$ なら全ての $g:W\to V$ について $fg\in S$ だから $f^*S$ は最大篩である。

<!-- definition-example-start: def-catb5-07-closed-sieve -->
**定義の確認**。離散二点空間 $X=\{p,q\}$ の開集合圏に[開集合圏のGrothendieck位相](../CATB5-02/index.md#thm-catb5-02-open-site)を入れる。篩をその射の始域の集合で表す。

$$
S=\{\varnothing,\{p\}\}
$$

は $X$ 上の篩である。任意の開集合 $V\subseteq X$ に対する引き戻しは、$V$ の開部分集合のうち $S$ に入るものの族である。その合併は $V\cap\{p\}$ になる。従って

$$
V\cap\{p\}=V
\iff V\subseteq\{p\}
\iff V\in S.
$$

つまり引き戻しが被覆篩になるとき必ず元の射が篩に属する。よって全ての開集合について閉条件を満たす。

一方 $T=\{\varnothing,\{p\},\{q\}\}$ も篩だが、$1_X^*T=T$ の始域の合併は $X$ なので被覆篩である。それなのに $1_X$ に対応する $X$ が $T$ に入らない。従って $T$ は $J$ 閉でない。
<!-- definition-example-end -->

任意の篩から、局所的に成立する射を全て追加することで $J$ 閉篩を作れる。これを篩の $J$ 閉包といい、単なる位相空間内の集合の閉包とは区別する。

<a id="thm-catb5-07-sieve-closure"></a>

<!-- formal-statement-start -->
> **定理（篩のJ閉包）**
>
> 小site $(\mathcal C,J)$ の対象 $U$ 上の篩 $S$ に対し

$$
c_U(S)=\{f:V\to U\mid f^*S\in J(V)\}
$$

> は $S$ を含む最小の $J$ 閉篩である。任意の射 $u:W\to U$ に対して

$$
u^*c_U(S)=c_W(u^*S)
$$

> が成り立つ。
<!-- formal-statement-end -->

証明の鍵は、局所的に局所成立する条件が一段の局所成立に戻ることである。ここでGrothendieck位相の推移律が働く。

<!-- proof-start -->
### 証明

$f\in c_U(S)$ かつ $g:W\to V$ とする。

[篩の引き戻しの合成則](../CATB5-02/index.md#prop-catb5-02-sieve-pullback-laws)より $(fg)^*S=g^*(f^*S)$ であり、被覆篩 $f^*S$ の引き戻しなので被覆篩である。ゆえに $fg\in c_U(S)$、従って $c_U(S)$ は篩である。

$f\in S$ なら $f^*S$ が最大篩であるため $S\subseteq c_U(S)$ である。

次に $f:V\to U$ が $f^*c_U(S)\in J(V)$ を満たすとする。$g:W\to V$ がこの被覆篩に入れば $fg\in c_U(S)$ であるため

$$
g^*(f^*S)=(fg)^*S\in J(W).
$$

[Grothendieck位相の推移律](../CATB5-02/index.md#def-catb5-02-grothendieck-topology)を被覆篩 $f^*c_U(S)$ と篩 $f^*S$ に適用すると $f^*S\in J(V)$ になる。

よって $f\in c_U(S)$ であり、閉条件が成り立つ。

$S\subseteq Q$ かつ $Q$ が $J$ 閉であるとする。$f\in c_U(S)$ なら $f^*S\subseteq f^*Q$ である。

[被覆篩の上方閉性](../CATB5-02/index.md#prop-catb5-02-cover-closure)より $f^*Q$ も被覆篩であるから $f\in Q$。

よって $c_U(S)\subseteq Q$ となり、最小性を得る。

最後に $v:Z\to W$ を取る。合成則を用いると

$$
\begin{aligned}
v\in u^*c_U(S)
&\iff uv\in c_U(S)\\
&\iff (uv)^*S\in J(Z)\\
&\iff v^*(u^*S)\in J(Z)\\
&\iff v\in c_W(u^*S).
\end{aligned}
$$

両篩の全ての射について所属条件が等しい。
<!-- proof-end -->

閉篩 $S$ について $c_U(S)=S$ であり、閉包を二度取っても変わらない。また閉篩の引き戻しも閉篩となる。離散二点空間で先ほどの $T$ の閉包を取ると最大篩になる。局所成立を一つの真偽値へまとめる構成が得られた。

## 3. 閉篩そのものが層になる

各対象 $U$ に $J$ 閉篩の集合を割り当てる。制限は篩の引き戻しとする。この前層を $\Omega_J$ と書く。各成分は小さな射の集合の冪集合の部分集合であり集合である。[篩のJ閉包](#thm-catb5-07-sieve-closure)の引き戻しとの交換則により閉篩を制限しても閉篩で、恒等射・合成に関する関手性は[篩の引き戻しの合成則](../CATB5-02/index.md#prop-catb5-02-sieve-pullback-laws)から従う。

<a id="thm-catb5-07-closed-sieves-sheaf"></a>

<!-- formal-statement-start -->
> **定理（J閉篩の層）**
>
> 小site $(\mathcal C,J)$ 上で、各対象 $U$ の $J$ 閉篩の集合を $\Omega_J(U)$ とし、制限を篩の引き戻しとする前層 $\Omega_J$ は層である。
<!-- formal-statement-end -->

局所篩を合成で持ち上げて一つの篩にまとめ、閉包を取れば貼り合わせが得られる。局所篩が既に閉じているため、閉包を取っても局所制限が変わらない。

<!-- proof-start -->
### 証明

$R\in J(U)$ を被覆篩とし、各 $r:V\to U$（$r\in R$） に閉篩 $S_r$ が与えられ、全ての $k:W\to V$ について

$$
k^*S_r=S_{rk}
$$

を満たすとする。$T$ を、ある $r\in R$ と $h\in S_r$ の合成 $rh$ と書ける射の全体とする。$rh$ にさらに前合成しても $h$ の篩所属が保たれるので $T$ は篩である。

$r\in R$ について $r^*T=S_r$ を示す。$k\in S_r$ なら $rk\in T$ なので $k\in r^*T$。逆に $rk\in T$ なら $rk=r'h$ と書け、$r'\in R,\ h\in S_{r'}$ である。両辺の始域を $W$ とすると、$h\in S_{r'}$ より $1_W\in h^*S_{r'}$。整合条件から

$$
k^*S_r=S_{rk}=S_{r'h}=h^*S_{r'}.
$$

従って $1_W\in k^*S_r$ すなわち $k\in S_r$ となる。

$S=c_U(T)$ と置く。[篩のJ閉包](#thm-catb5-07-sieve-closure)より $S$ は閉篩であり、

$$
r^*S=c_V(r^*T)=c_V(S_r)=S_r.
$$

これが存在である。

一意性のため、同じ制限を持つ閉篩 $Q$ を取る。任意の $f:V\to U$ に対し $f^*R\in J(V)$。$g:W\to V$ が $f^*R$ に入ると $fg\in R$ なので

$$
(fg)^*Q=S_{fg}=(fg)^*S.
$$

$f\in S$ なら全てのこの $g$ について $fg\in S$、従って $1_W\in(fg)^*Q$ となる。

よって $f^*R\subseteq f^*Q$。被覆篩の上方閉性と $Q$ の閉条件から $f\in Q$。

$Q,S$ を交換して逆の包含も得る。ゆえに $Q=S$ である。被覆篩が空の場合も上方閉性と閉条件で同じ論証が成立する。
<!-- proof-end -->

離散二点空間では、$U$ 上の閉篩は開部分集合 $A\subseteq U$ に対する $\{V\mid V\subseteq A\}$ に尽きる。

実際、任意の篩 $S$ の始域の合併を $A$ とすれば、$V^*S$ の始域の合併は $V\cap A$ である（$V$ と $S$ の各始域との共通部分が $S$ に入る）。

閉条件より $V\in S$ と $V\subseteq A$ が同値になる。

制限は $A\mapsto A\cap V$ である。$p$ の上で真、$q$ の上で偽という整合族は $A=\{p\}$ に貼り合わさる。特に空開集合上では空の被覆が存在し、閉篩は最大篩一つだけになる。

## 4. 層の部分対象を分類する

層のモノ射が成分ごとの単射であることを確かめておこう。前層では $yU$ を試験対象として使えたが、一般のsiteでは $yU$ は層とは限らない。

代わりに[層化関手](../CATB5-05/index.md#def-catb5-05-sheafification) $a$ による $a(yU)$ を使う。

<a id="prop-catb5-07-sheaf-mono"></a>

<!-- formal-statement-start -->
> **命題（層のモノ射の成分判定）**
>
> 小site上の層の自然変換 $m:G\Rightarrow F$ が層の圏でモノ射であることと、全ての対象 $U$ で $m_U$ が単射であることは同値である。
<!-- formal-statement-end -->

<!-- proof-start -->
### 証明

全成分が単射とし、層 $Z$ から $G$ への二射 $b,b'$ が $mb=mb'$ を満たすとする。各対象 $U$ で $m_Ub_U=m_Ub'_U$ だから単射性より $b_U=b'_U$。従って $b=b'$ となる。

逆に $m$ が層の圏でモノ射であるとする。[層化と包含の随伴](../CATB5-05/index.md#thm-catb5-05-adjunction)と[反変Yonedaの補題](../../CAT/CAT1-11/index.md#thm-cat1-11-contravariant-yoneda)から任意の層 $H$ について自然な全単射

$$
\operatorname{Sh}(a(yU),H)
\cong\widehat{\mathcal C}(yU,H)
\cong H(U)
$$

を得る。$x,x'\in G(U)$ が $m_U(x)=m_U(x')$ を満たすとする。対応する射を $b,b':a(yU)\to G$ とすると、全単射の $H$ に関する自然性から $mb,mb'$ は等しい元 $m_U(x)=m_U(x')$ に対応する。従って $mb=mb'$。モノ射性で $b=b'$ となり、全単射を逆にたどると $x=x'$ となる。
<!-- proof-end -->

この命題により各成分の像を取れば、任意のモノ射は部分前層の包含 $S\subseteq F$ に同型である（[前層のモノ射の成分判定](../CATB5-06/index.md#prop-catb5-06-pointwise-mono)の直後の構成を適用する）。

$G$ と $S$ の成分全単射は自然であるため、$G$ の層条件が $S$ に移り、$S$ も層となる。このような部分前層を部分層という。

<a id="thm-catb5-07-sheaf-classifier"></a>

<!-- formal-statement-start -->
> **定理（層圏の部分対象分類子）**
>
> 小site $(\mathcal C,J)$ 上の層の圏で、$\Omega_J$ を $J$ 閉篩の層、$t:1\to\Omega_J$ を各対象で最大篩を選ぶ自然変換とする。$(\Omega_J,t)$ は部分対象分類子である。部分層 $S\subseteq F$ の分類射は

$$
\chi_{S,U}(x)=
\{f:V\to U\mid F(f)(x)\in S(V)\}
$$

> で与えられる。
<!-- formal-statement-end -->

前層の分類射と同じ式になる。ただし $S$ が層であることを使うと、値が閉篩に入る。

<!-- proof-start -->
### 証明

[層の極限の点ごとの構成](../CATB5-05/index.md#thm-catb5-05-sheaf-limits)によれば終対象 $1$ は各成分が一元集合である。

[J閉篩の層](#thm-catb5-07-closed-sieves-sheaf)により $\Omega_J$ は層であり、最大篩の引き戻しは最大篩で、最大篩は閉篩だから $t$ は層の射である。

$x\in F(U)$ を固定し、上式の篩を $Q$ とする。[前層圏の部分対象分類子](../CATB5-06/index.md#thm-catb5-06-presheaf-classifier)の構成より $Q$ は篩で、全ての篩への分類射は自然である。

$f:V\to U$ が $f^*Q\in J(V)$ を満たすとする。各射 $g:W\to V$ が被覆篩に入るとき、

$$
F(fg)x\in S(W)
$$

である。さらに $k:Z\to W$ による制限は $F(fgk)x$ であり、これは合成射に対応する局所元である。従ってこれらは部分前層の制限に関して整合族をなす。

$S$ の層条件から、貼り合わせ $s\in S(V)$ が存在し、その制限は全て $F(fg)x$ に等しい。一方、$F(f)x$ も $F$ 内で同じ局所元を持つ。$F$ の層条件の一意性から

$$
s=F(f)x\in S(V)
$$

となる。ここで貼り合わせを包含によって $F(V)$ の元とみなした。

従って $f\in Q$ であり、$Q$ は閉篩である。ゆえに分類射の値は $\Omega_J$ に入り、その自然性も前層での自然性を制限して得られる。

[層の極限の点ごとの構成](../CATB5-05/index.md#thm-catb5-05-sheaf-limits)より、$\chi_S$ と $t$ の引き戻しは成分ごとに最大篩を取る元の集合である。

$\chi_{S,U}(x)$ が最大篩であることは $1_U\in\chi_{S,U}(x)$、すなわち $x\in S(U)$ と同値なので、この引き戻しは $S$ である。

一意性について、別の層の射 $\psi:F\to\Omega_J$ が同じ引き戻しを与えるとする。自然性と点ごとの引き戻しから

$$
\begin{aligned}
f\in\psi_U(x)
&\iff 1_V\in f^*\psi_U(x)\\
&\iff \psi_V(F(f)x)\text{ が最大篩}\\
&\iff F(f)x\in S(V).
\end{aligned}
$$

よって $\psi=\chi_S$。一般のモノ射は[層のモノ射の成分判定](#prop-catb5-07-sheaf-mono)で得た部分層の包含に終域を固定して同型なので、その引き戻しも同じ分類射で表せる。
<!-- proof-end -->

例えば離散二点空間で $F(U)=\{0,1\}^{U}$ とし、$S(U)$ を値が全て1である関数の集合とする。いずれも点ごとの貼り合わせが存在し唯一なので層である。

$x(p)=1,x(q)=0$ なら $\chi_{S,X}(x)$ は開部分集合 $\{p\}$ に対応する閉篩になる。真偽値が真になる領域そのものを表す。

## 5. 層の間の関数を層として扱う

前講では[前層圏における指数対象](../CATB5-06/index.md#thm-catb5-06-presheaf-exponential)を自然変換の集合として構成した。二つの層 $F,G$ に対し同じ前層 $H=G^F$ を取ると、$H$ も層になる。点ごとの写像集合を取るのではなく、全ての制限と整合する写像を取ることが重要である。

<a id="thm-catb5-07-sheaf-exponential"></a>

<!-- formal-statement-start -->
> **定理（層圏の指数対象）**
>
> 小site $(\mathcal C,J)$ 上の二つの層 $F,G$ に対し、前層圏における指数対象

$$
H(U)=\widehat{\mathcal C}(yU\times F,G)
$$

> は層であり、前層圏の評価射とともに層の圏での指数対象をなす。
<!-- formal-statement-end -->

$H$ の元は各射 $f:V\to U$ と各 $x\in F(V)$ に対し $G(V)$ の元を指定する。局所的に与えられた写像を一つにするには、この値ごとに $G$ の層条件を使う。

<!-- proof-start -->
### 証明

被覆篩 $R\in J(U)$ 上の整合族 $h_r\in H(\operatorname{dom}r)$ を取る。各 $h_r:y(\operatorname{dom}r)\times F\to G$ は自然変換であり、$k:W\to\operatorname{dom}r$ に沿う制限が $h_{rk}$ になる。従って任意の $l:Z\to W$ と $x\in F(Z)$ について

$$
(h_{rk})_Z(l,x)=(h_r)_Z(kl,x).
$$

$h\in H(U)$ を構成する。$f:V\to U$ と $x\in F(V)$ を固定し、被覆篩 $f^*R$ の各 $g:W\to V$ に対して

$$
b_g=(h_{fg})_W(1_W,F(g)x)\in G(W)
$$

と置く。$k:Z\to W$ に対し $h_{fg}$ の自然性と整合条件から

$$
\begin{aligned}
G(k)b_g
&=(h_{fg})_Z(k,F(k)F(g)x)\\
&=(h_{fgk})_Z(1_Z,F(gk)x)\\
&=b_{gk}.
\end{aligned}
$$

よって整合族である。$G$ の層条件から全ての $g\in f^*R$ について $G(g)b=b_g$ となる唯一の $b\in G(V)$ が存在する。これを $h_V(f,x)$ とする。

この写像族の自然性を確かめる。$l:Z\to V$ に対し $k:W\to Z$ が $(fl)^*R$ に入るなら $lk\in f^*R$ だから

$$
G(k)G(l)h_V(f,x)
=(h_{flk})_W(1_W,F(lk)x).
$$

一方 $G(k)h_Z(fl,F(l)x)$ も構成によって $(h_{flk})_W(1_W,F(k)F(l)x)$ に等しい。$F(lk)=F(k)F(l)$ であり、$(fl)^*R$ は被覆篩なので $G$ の一意性から

$$
G(l)h_V(f,x)=h_Z(fl,F(l)x).
$$

従って $h:yU\times F\to G$ は自然変換である。

$r:V\to U$（$r\in R$） に沿う $h$ の制限を確かめる。任意の $f:W\to V$ と $x\in F(W)$ について $rf\in R$ であるため $(rf)^*R$ は最大篩であり、構成で $g=1_W$ を選べる。よって

$$
h_W(rf,x)=(h_{rf})_W(1_W,x)
=(h_r)_W(f,x).
$$

したがって制限は $h_r$ に等しい。別の貼り合わせ $h'$ については、$g\in f^*R$ に沿い自然性を使うと

$$
G(g)h'_V(f,x)
=h'_W(fg,F(g)x)
=(h_{fg})_W(1_W,F(g)x).
$$

この右辺は $b_g$ であり、$G$ の一意性から $h'_V(f,x)=h_V(f,x)$。全ての $V,f,x$ について成り立つため $h'=h$。ゆえに $H$ は層である。

[層の極限の点ごとの構成](../CATB5-05/index.md#thm-catb5-05-sheaf-limits)により積 $H\times F$ は前層での積と同じであり、前層圏の評価射 $\operatorname{ev}:H\times F\to G$ は層の射である。

任意の層 $Z$ と射 $b:Z\times F\to G$ に対し、[前層圏の指数対象の普遍性](../CATB5-06/index.md#thm-catb5-06-presheaf-exponential)から唯一の自然変換 $k:Z\to H$ が存在し、

$$
\operatorname{ev}(k\times1_F)=b
$$

を満たす。層の圏は充満部分圏なのでこの $k$ は層の射であり、一意性も保たれる。
<!-- proof-end -->

離散二点空間 $X=\{p,q\}$ の各点に集合 $A=\{0,1\}$、$B=\{a,b,c\}$ を置く。対応する層は

$$
F(U)=A^U,\qquad G(U)=B^U
$$

である。$H$ の元は各点に写像 $A\to B$ を指定した族になる。

実際、$yU(V)$ は $V\subseteq U$ のとき一元集合、そうでないとき空集合である。自然変換 $yU\times F\to G$ を一点開集合で評価すると各点の写像が得られる。任意の開部分集合において自然性により各座標はその写像の値に強制され、逆に座標ごとの写像は全ての制限と可換になる。

各点の写像は $3^2=9$ 通りある。従って全体上の指数対象の元の個数は

$$
|H(X)|=9^2=81.
$$

これに対し全体の切断間の全写像の集合は

$$
|G(X)|^{|F(X)|}=9^4=6561
$$

元であり、一般に指数対象の切断と一致しない。

## 6. Grothendieckトポスへの到達

<a id="thm-catb5-07-sheaf-topos"></a>

<!-- formal-statement-start -->
> **定理（層圏の初等トポス性）**
>
> 任意の小site $(\mathcal C,J)$ に対し、層の圏 $\operatorname{Sh}(\mathcal C,J)$ は初等トポスである。
<!-- formal-statement-end -->

<!-- proof-start -->
### 証明

自然変換は対象ごとの写像の集合の直積の部分集合である。小圏であることからこの直積は集合であり、層の圏は局所小である。[層の極限の点ごとの構成](../CATB5-05/index.md#thm-catb5-05-sheaf-limits)で全ての有限極限が存在する。[層圏の指数対象](#thm-catb5-07-sheaf-exponential)で任意の二層の指数対象が存在し、[層圏の部分対象分類子](#thm-catb5-07-sheaf-classifier)で部分対象分類子が存在する。これらは[初等トポスの定義](../CATB5-06/index.md#def-catb5-06-elementary-topos)の三条件そのものである。
<!-- proof-end -->

同じ圏が異なるsiteから得られることがある。siteの具体的な選択よりも、局所データを扱う層の圏そのものに注目するため、次の概念を導入する。ここで[圏の同値](../../CAT/CAT1-09/index.md#def-cat1-09-equivalence)とは、二方向の関手の合成がそれぞれ恒等関手と自然同型になることである。

<a id="def-catb5-07-grothendieck-topos"></a>

<!-- formal-statement-start -->
> **定義（Grothendieckトポス）**
>
> 圏 $\mathcal E$ がGrothendieckトポスであるとは、ある小site $(\mathcal C,J)$ が存在し、$\mathcal E$ が層の圏 $\operatorname{Sh}(\mathcal C,J)$ と圏同値であることをいう。
<!-- formal-statement-end -->

<!-- definition-example-start: def-catb5-07-grothendieck-topos -->
**定義の確認**。対象一つ、射は恒等射だけの小圏に最大篩だけを被覆とする位相を入れる。最大篩の引き戻しは最大篩で、推移律は恒等射に対する条件に帰着するのでGrothendieck位相である。前層は一つの集合 $A$ と恒等写像で決まり、最大篩上の整合族は一つの元 $a\in A$ である。唯一の貼り合わせは $a$ 自身であり、全ての前層が層になる。

層をその集合に送る関手と、集合をこの層に送る関手を取る。自然変換は一つの写像だけで決まり、合成・恒等射は集合の写像のものと一致する。二方向の合成は対象と射の両方で恒等関手になるため、集合の圏はこの小siteの層圏と同値である。従って $\mathbf{Set}$ はGrothendieckトポスである。
<!-- definition-example-end -->

一般の小siteの層圏は自分自身との恒等関手による同値を持つので、定義からGrothendieckトポスである。[層圏の初等トポス性](#thm-catb5-07-sheaf-topos)により、その具体的な三構造も得られた。Grothendieckトポスという語は、小siteによる表示を要求する点で初等トポスの定義と異なる。

## 7. 演習

### CATB5-07-A01 最大篩だけを被覆とする場合

- Level: A

任意の小圏で各対象の最大篩だけを被覆とする。これがGrothendieck位相であり、全ての篩が $J$ 閉となることを示せ。

<!-- solution-start -->
**詳細解答**

最大篩公理は定義から成立し、最大篩の引き戻しも最大篩である。

推移律で被覆篩 $R$ は最大篩なので $1_U\in R$。全ての $r\in R$ に対し $r^*S$ が被覆という仮定を $r=1_U$ に適用すれば $S$ が被覆になる。従って三公理を満たす。

任意の篩 $S$ に対し $f^*S$ が被覆なら最大篩だから $1_V\in f^*S$。すなわち $f\in S$ である。

[J閉篩の定義](#def-catb5-07-closed-sieve)を満たす。

この位相では最大篩上の整合族は恒等射での値により決まるため、前層は全て層となる。
<!-- solution-end -->

### CATB5-07-A02 閉包を計算する

- Level: A

離散二点空間 $X=\{p,q\}$ の開集合圏で通常の開被覆による位相を取る。$X$ 上の空篩 $\varnothing$ と篩 $T=\{\varnothing,\{p\},\{q\}\}$ の閉包を求めよ。篩の元は射の始域で表す。

<!-- solution-start -->
**詳細解答**

[篩のJ閉包](#thm-catb5-07-sieve-closure)によれば、開集合 $V$ が閉包に入るのは引き戻し篩の始域の合併が $V$ になるときである。

空篩の引き戻しは全ての $V$ で空であり、その合併は空集合である。従って $c_X(\varnothing)=\{\varnothing\}$ となる。右辺は空篩ではなく空開集合からの射一つを含む篩である。

$T$ について各 $V$ で $V\cap\{p\}$ と $V\cap\{q\}$ は $T$ に入る始域であり、その合併は $V$。従って全ての開集合が閉包に入り、$c_X(T)=\{\varnothing,\{p\},\{q\},X\}$ である。
<!-- solution-end -->

### CATB5-07-A03 閉篩の制限

- Level: A

離散二点空間 $X=\{p,q\}$ の開集合圏に通常の開被覆による位相を入れる。篩を射の始域で表し、閉篩 $S=\{\varnothing,\{p\}\}$ の $\{p\}$、$\{q\}$、$\varnothing$ への制限を求めよ。

<!-- solution-start -->
**詳細解答**

[篩の引き戻し](../CATB5-02/index.md#def-catb5-02-sieve-pullback)により、制限先の開部分集合で $S$ に入るものを列挙する。各制限を始域の族として書くと

$$
\begin{aligned}
S|_{\{p\}}&=\{\varnothing,\{p\}\},\\
S|_{\{q\}}&=\{\varnothing\},\\
S|_{\varnothing}&=\{\varnothing\}.
\end{aligned}
$$

第一と第三はそれぞれの制限先での最大篩である。第三の最大篩は空篩とは異なる。[J閉篩の定義](#def-catb5-07-closed-sieve)の局所条件は、空開集合では空被覆に対しても働く。
<!-- solution-end -->

### CATB5-07-A04 有限極限を点ごとに取る

- Level: A

離散二点空間 $X=\{p,q\}$ の通常の開集合site上で $F(U)=\{0,1\}^U$、$G(U)=\{a,b,c\}^U$ とする。積層の $X$、$\{p\}$、$\varnothing$ における元の個数を求め、制限が何をするか説明せよ。

<!-- solution-start -->
**詳細解答**

[層の極限の点ごとの構成](../CATB5-05/index.md#thm-catb5-05-sheaf-limits)によれば $(F\times G)(U)=F(U)\times G(U)$ である。

各開集合の点数を $n$ とすれば $2^n3^n=6^n$ 元となるので、順に $36,6,1$ 元である。

元 $(f,g)$ は各点に順序対 $(f(x),g(x))$ を指定する。$\{p\}$ への制限は $q$ の座標を忘れ、空集合への制限は両座標を忘れて唯一の空関数の組に送る。
<!-- solution-end -->

### CATB5-07-B01 部分前層では足りない

- Level: B

離散二点空間 $X=\{p,q\}$ の通常の開集合siteで終対象の層 $1$ を取る。$P(U)$ を $U\ne X$ なら一元集合、$U=X$ なら空集合とする部分前層 $P\subseteq1$ は層か。前層圏における分類射の $X$ 成分の値も求めよ。

<!-- solution-start -->
**詳細解答**

制限先が真部分開集合なら値は一元集合であり、$X$ での制限は空写像なので部分前層になる。

一方、$\{p\},\{q\}$ 上の唯一の元は共通部分 $\varnothing$ でも一致する。これらは被覆篩上の整合族になるが $P(X)=\varnothing$ のため貼り合わせがない。従って層ではない。

[前層圏の部分対象分類子](../CATB5-06/index.md#thm-catb5-06-presheaf-classifier)から、唯一の元 $*\in1(X)$ の分類篩は $P(V)$ が空でない始域を集めた

$$
T=\{\varnothing,\{p\},\{q\}\}
$$

となる。これは被覆篩なので

$$
1_X^*T=T\in J(X),\qquad 1_X\notin T
$$

である。従って閉条件を満たさず、[層圏の部分対象分類子](#thm-catb5-07-sheaf-classifier)で分類できない。部分対象を分類する証明で部分層の貼り合わせの存在を使う理由が分かる。
<!-- solution-end -->

### CATB5-07-B02 開集合の和と閉包

- Level: B

任意の位相空間 $X$ の開集合圏に通常の開被覆による位相を入れる。開集合 $U$ 上の篩 $S$ を始域の族で表し、$A=\bigcup_{W\in S}W$ とする。$c_U(S)$ が $A$ の開部分集合全体であることを示せ。

二つの閉篩に対応する開集合 $A,B$ に対し、篩の和集合の閉包と篩の共通部分に対応する開集合を求めよ。

<!-- solution-start -->
**詳細解答**

任意の開集合 $V\subseteq U$ に対し、引き戻し篩の始域は $V$ に含まれ、かつ $S$ に入る開集合である。その合併は $V\cap A$ に含まれる。

逆に $x\in V\cap A$ なら $x\in W$ となる $W\in S$ が存在する。$V\cap W$ は開集合であり、$W$ の部分集合なので篩の前合成閉性から $S$ に入る。

よって $x$ は引き戻し篩の始域の合併に属する。従って合併は $V\cap A$ に等しい。

[開集合圏のGrothendieck位相](../CATB5-02/index.md#thm-catb5-02-open-site)ではこの合併が $V$ に等しいときに被覆である。[篩のJ閉包](#thm-catb5-07-sieve-closure)を使うと $V\in c_U(S)$ と $V\subseteq A$ が同値である。

二つの閉篩を $S_A,S_B$ と書けば $S_A\cup S_B$ の始域の合併は $A\cup B$ だから閉包は $S_{A\cup B}$ になる。一方 $V\in S_A\cap S_B$ は $V\subseteq A$ かつ $V\subseteq B$ と同値であり、共通部分は $S_{A\cap B}$ となる。
<!-- solution-end -->

### CATB5-07-B03 指数対象の転置を計算する

- Level: B

離散二点空間 $X=\{p,q\}$ の通常の開集合siteで $F(U)=G(U)=\{0,1\}^U$ とし、射 $b:1\times F\to G$ を $p$ の値は反転し $q$ の値はそのままにする写像族で定める。

各開集合での値は存在する点のみに指定する。$b$ の自然性、$G^F$ の $X$ 成分の元の個数、$b$ の転置の $X$ における値を求めよ。

<!-- solution-start -->
**詳細解答**

$V\subseteq U$ に対して $b$ を適用してから $V$ に制限しても、先に $V$ に制限してから各点の操作を行っても、残る点の値は $p$ なら $1-f(p)$、$q$ なら $f(q)$ となる。従って $b$ は自然である。

[層圏の指数対象](#thm-catb5-07-sheaf-exponential)により $H(X)=\widehat{\mathcal C}(yX\times F,G)$。各点の写像は入力0と1に対する出力の組で表せ、四通りある。第5節の座標表示から $H(X)$ は四通りの写像の順序対なので $16$ 元である。

転置 $k:1\to H$ の $X$ での値は、$p$ では $(1,0)$、$q$ では $(0,1)$ という二写像の組になる。

制限はその点の写像を取り出すため自然であり、評価すると $p$ では $1-f(p)$、$q$ では $f(q)$ を返す。

従って $\operatorname{ev}(k\times1_F)=b$ が各成分で成立し、指数対象の一意性からこれが転置である。
<!-- solution-end -->

### CATB5-07-B04 層のモノ射を有限極限から判定する

- Level: B

小site上の層の射 $m:G\to F$ について、$P=G\times_FG$ を作り、対角射 $\delta:G\to P$ が同型であることと $m$ がモノ射であることが同値であると示せ。これを用いて $m_U$ の単射性を別の方法で証明せよ。

<!-- solution-start -->
**詳細解答**

$P$ の二射影を $p_1,p_2:P\to G$ とする。$m1_G=m1_G$ だから引き戻しの普遍性により $p_1\delta=p_2\delta=1_G$ を満たす唯一の $\delta$ がある。

$m$ がモノ射なら $mp_1=mp_2$ から $p_1=p_2$。従って

$$
p_1\delta p_1=p_1,\qquad p_2\delta p_1=p_1=p_2.
$$

引き戻しの一意性から $\delta p_1=1_P$ となり、既に $p_1\delta=1_G$ なので $\delta$ は同型である。

逆に $\delta$ が同型なら $p_1\delta=p_2\delta$ から $p_1=p_2$。任意の $b,b':Z\to G$ が $mb=mb'$ を満たすなら、引き戻しの普遍性から $p_1v=b,\ p_2v=b'$ となる $v:Z\to P$ が存在する。$p_1=p_2$ なので $b=b'$。よって $m$ はモノ射である。

[層の極限の点ごとの構成](../CATB5-05/index.md#thm-catb5-05-sheaf-limits)を使うと

$$
P(U)=\{(x,x')\in G(U)^2\mid m_U(x)=m_U(x')\},
\qquad \delta_U(x)=(x,x).
$$

$m$ がモノ射なら $\delta$ は同型であり、各成分で逆写像を持つ。

$m_U(x)=m_U(x')$ なら $(x,x')\in P(U)$。$\delta_U$ の全射性から $(x,x')=(z,z)$ となる $z$ があり、従って $x=x'$。

逆に全成分の単射性からモノ射性が従うことは[層のモノ射の成分判定](#prop-catb5-07-sheaf-mono)の順方向で確認した。これで層化した表現可能前層を使わずに成分判定を再構成できた。
<!-- solution-end -->

### CATB5-07-C01 局所的な述語の族を一つの射にする

- Level: C

小site上の層 $X,F$ と部分層 $S\subseteq X\times F$ を取る。$\Omega_J$ を閉篩の層とする。

$S$ に一意に対応する射 $k:X\to\Omega_J^F$ を構成し、$u:Y\to X$ に沿って引き戻した部分層に対応する射が $ku$ であることを示せ。

さらに離散二点空間 $U_0=\{p,q\}$ の通常の開集合siteでパラメータ層を $X=1$ とし、$F(U)=\{0,1\}^U$ とする。

積 $1\times F$ を $F$ と同一視して、$S(U)$ は $p\in U$ なら $f(p)=1$、$q\in U$ なら $f(q)=0$ を満たす関数の集合とするとき、空間全体 $U_0$ での $k_{U_0}(*)$ に対応する各点の写像を求めよ。

<!-- solution-start -->
**詳細解答**

[層圏の部分対象分類子](#thm-catb5-07-sheaf-classifier)で $S$ の分類射 $\chi_S:X\times F\to\Omega_J$ が得られる。

[層圏の指数対象](#thm-catb5-07-sheaf-exponential)を $G=\Omega_J$ に適用すると転置 $k:X\to\Omega_J^F$ が唯一存在して

$$
\operatorname{ev}(k\times1_F)=\chi_S
$$

となる。逆に任意の $k$ から評価で $\chi$ を作り、真の射 $t$ の引き戻しを取ると部分対象が得られる。分類射と転置の一意性から、二つの操作は終域を固定した同型による部分対象の同値類と射との間で互いに逆である。

$S'=(u\times1_F)^*S$ とする。[分類射と部分対象の自然な対応](../CATB5-06/index.md#thm-catb5-06-classifier-bijection)を層の圏で使えるのは有限極限と分類子が存在するためである。従って $\chi_{S'}=\chi_S(u\times1_F)$。[積への射とその合成則](../../CAT/CAT2-02/index.md#prop-cat2-02-product-map)より

$$
\begin{aligned}
\operatorname{ev}((ku)\times1_F)
&=\operatorname{ev}(k\times1_F)(u\times1_F)\\
&=\chi_S(u\times1_F)=\chi_{S'}.
\end{aligned}
$$

転置の一意性から $S'$ に対応する射は $ku$ である。

離散二点の例では各点で要求された値が固定されるので、$S(U)$ は全ての開集合で一元集合であり、制限と貼り合わせを満たす層である。各一点開集合上の $\Omega_J$ は偽（空開集合に対応する閉篩）と真（最大篩）の二元集合である。

$p$ で分類射は入力0に偽、1に真を割り当てる。$q$ では0に真、1に偽を割り当てる。従って転置はこの二写像の組である。

空間全体での入力 $(1,1)$ を評価すれば、条件を満たす開部分集合は $\{p\}$ となる。入力 $(1,0)$ なら空間全体が条件を満たす。局所的な述語を一つの層の射にまとめられた。
<!-- solution-end -->

## 8. まとめ

層圏の有限極限は点ごとに計算できる。指数対象は[前層圏における指数対象](../CATB5-06/index.md#thm-catb5-06-presheaf-exponential)を使い、その値の貼り合わせを終域の層条件で保証する。部分対象分類子は全ての篩ではなく $J$ 閉篩を集めた層になる。この三つの構造によって小siteの層圏は初等トポスとなり、Grothendieckトポスの具体例を与える。次講 CATB5-08 では像と正確性を調べる。
