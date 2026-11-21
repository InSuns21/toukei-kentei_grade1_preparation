# GBG5 ゲージ変換群は何に作用するか

[GBG3 の局所section変更](../GBG3/index.md#thm-gbg3-transition-change)では、同じ主束の点を異なる基準点で表示した。[GBG4 の結合束](../GBG4/index.md#def-gbg4-associated-bundle)では、同じ物質場の局所成分が基準点に応じて変化した。しかし「座標の呼び替え」と「束の各点を実際に別の点へ送る写像」は違う。後者のうち、基底点と右作用を保存するものをまとめて考えたい。

この問いに答えるには、主束の自己同型を一つずつ調べるだけでなく、それらを基底多様体上のデータとして表す方法が必要になる。そのため、群元を共役で貼り合わせて、基底上のデータから束の自己同型を復元する。本講では、ゲージ変換の合成則から局所共役の整合条件を導き、物質場とLie環値の場への作用を計算する。

以下、$M$ は Hausdorff・第二可算な有限次元滑らかな多様体、$G$ は有限次元 Lie 群、$\pi:P\to M$ は滑らかな右主 $G$ 束とする。$G$ の単位元を $e$、Lie 環を $\mathfrak g=T_eG$ とする。

局所section $s_i:U_i\to P$ とその遷移関数は $s_j=s_i g_{ij}$ と書く。主束の[自由・推移性](../GBG2/index.md#prop-gbg2-free-transitive)から、$p=s_i(x)k$ の群元 $k$ は一意である。

必要となる共役 $h\mapsto ghg^{-1}$ と、その微分 $\operatorname{Ad}_g:\mathfrak g\to\mathfrak g$ は、それぞれ[LIE2 の共役自己同型](../../../代数系/LIE/LIE2/index.md#def-lie2-conjugation-automorphism)、[随伴表現](../../../代数系/LIE/LIE2/index.md#def-lie2-adjoint-representation)で学んだ。特に $\operatorname{Ad}_{gh}=\operatorname{Ad}_g\operatorname{Ad}_h$ である。

<!-- definition-example-audit: strict -->

## 1. 座標を変えるのではなく束の点を動かす

局所sectionの変更 $s'_i=s_i h_i$ は、初めから束上の写像 $P\to P$ を与えるわけではない。例えば積主束 $M\times G$ では、群値関数 $a:M\to G$ を使い
$$
F_a(x,k)=(x,a(x)k)
$$
とすれば、$F_a$ は基底点を動かさず、右からの $g$ の作用とも可換になる。この**左からの乗法**が重要であり、一般の $G$ に対する $(x,k)\mapsto(x,ka(x))$ は右作用と可換とは限らない。

<a id="def-gbg5-gauge-automorphism"></a>

<!-- formal-statement-start -->
> **定義（ゲージ変換とゲージ群）**  
> 同じ滑らかな右主 $G$ 束 $\pi:P\to M$ の滑らかな自己同型 $F:P\to P$ で
$$
\pi\circ F=\pi,\qquad F(pg)=F(p)g
$$
> を全ての $p\in P,\ g\in G$ で満たすものを **ゲージ変換** という。その全体を $\mathcal G(P)$ と書き、写像の合成を積とする集合を **ゲージ群** という。
<!-- formal-statement-end -->

この定義は[GBG2 の基底を固定した主束同型](../GBG2/index.md#def-gbg2-bundle-isomorphism)を、始域と終域が同じ $P$ の場合に限定したものである。別の主束 $Q$ への同型 $P\to Q$ は、この $\mathcal G(P)$ の元ではない。また $M$ 上の恒等写像以外を覆う自己同型も、ここでのゲージ変換には含めない。

<!-- definition-example-start: def-gbg5-gauge-automorphism -->
**定義の確認**。$P=\mathbb R\times GL(2,\mathbb R)$、$a(x)=\left(\begin{smallmatrix}1&x\\0&1\end{smallmatrix}\right)$ と置く。$\det a(x)=1$ であり、$a,a^{-1}$ は滑らかである。$F_a(x,k)=(x,a(x)k)$ は射影を保存し、
$$
F_a((x,k)g)=(x,a(x)kg)=F_a(x,k)g
$$
を満たす。逆は $(x,k)\mapsto(x,a(x)^{-1}k)$ で滑らかだから、ゲージ変換の全条件が成立する。対して $R_b(x,k)=(x,kb)$ を定数 $b\in G$ で定めても、一般には $R_b((x,k)g)=(x,kgb)$ と $R_b(x,k)g=(x,kbg)$ が異なり、ゲージ変換にならない。
<!-- definition-example-end -->

<a id="thm-gbg5-gauge-group"></a>

<!-- formal-statement-start -->
> **定理（ゲージ変換は合成で群をなす）**  
> 滑らかな右主 $G$ 束 $\pi:P\to M$ に対し、$\mathcal G(P)$ は写像の合成で群をなす。単位元は $\operatorname{id}_P$、$F$ の逆元は $F^{-1}$ である。さらに、滑らかな写像 $F:P\to P$ が射影保存と右 $G$ 同変性を満たすだけで、$F$ は自動的に滑らかな逆を持つ。
<!-- formal-statement-end -->

### 証明の見取り図

各ファイバーを局所sectionを基準に群 $G$ と同一視すると、同変写像は $(x,k)\mapsto(x,a_i(x)k)$ の形に限られる。この形は左乗法なので逆を持ち、局所逆が大域的に貼り合わさる。

<!-- proof-start -->
### 証明

$F$ が射影保存・右同変な滑らかな写像であるとする。$x\in U_i$ について、$F(s_i(x))$ は $s_i(x)$ と同じファイバーに属する。[局所自明化](../GBG3/index.md#thm-gbg3-section-trivialization)により
$$
F(s_i(x))=s_i(x)a_i(x)
$$
となる一意な $a_i(x)\in G$ があり、$a_i$ は $F\circ s_i$ の群座標なので滑らかである。任意の $p=s_i(x)k$ に対し
$$
F(p)=F(s_i(x)k)=F(s_i(x))k=s_i(x)a_i(x)k.
$$
従ってこの局所座標では $F(x,k)=(x,a_i(x)k)$ であり、逆は $(x,\ell)\mapsto(x,a_i(x)^{-1}\ell)$ である。逆元写像は Lie 群上で滑らかなので局所逆も滑らか。各ファイバーで $F$ は全単射だから、これらは同じ集合論的逆写像の局所表示であり、大域的な滑らかな $F^{-1}$ を与える。これは[GBG2 の同変写像の同型定理](../GBG2/index.md#thm-gbg2-equivariant-isomorphism)の局所計算でもある。

恒等写像は両条件を満たす。$F,H$ が両条件を満たすとき
$$
\pi(F(H(p)))=\pi(H(p))=\pi(p),\quad
F(H(pg))=F(H(p)g)=F(H(p))g
$$
なので $F\circ H$ も同条件を満たす。さらに $F(pg)=F(p)g$ に $p=F^{-1}(q)$ を代入すると
$$
F(F^{-1}(q)g)=qg,\quad
F^{-1}(qg)=F^{-1}(q)g
$$
となり、逆も右同変で射影を保存する。写像合成の結合律から群の全公理が成立する。
<!-- proof-end -->

ここで「群」と言っても $\mathcal G(P)$ が有限次元 Lie 群であると主張したわけではない。例えば積束では任意の滑らかな $a:M\to G$ が候補となり、通常は無限次元の集まりになる。

## 2. 共役によって貼り合わさる二つの束

同じファイバー内で $p$ から $pg$ へ基準を替えると、$p$ を固定して記録した群元 $h$ は $g^{-1}hg$ に変わる。この規則で群元を貼り合わせた束を作れば、ゲージ変換を局所的な群値関数として取り出せる。

まず $G$ 自身への**共役左作用** $C_g(h)=ghg^{-1}$ を使う。$C_{gk}=C_g\circ C_k$ なのでこれは群の左作用であり、滑らかな群自己同型でもある。$G$ を表現のベクトル空間の代わりに用いる点を除けば、構成は[GBG4 の結合束](../GBG4/index.md#def-gbg4-associated-bundle)に対応する。

<a id="def-gbg5-adjoint-group-bundle"></a>

<!-- formal-statement-start -->
> **定義（随伴群束）**  
> 滑らかな右主 $G$ 束 $P\to M$ に対して、$P\times G$ 上の右作用
$$
(p,h)\cdot g=(pg,g^{-1}hg)
$$
> の軌道を $[p,h]$ と書く商
$$
\operatorname{Ad}(P)=(P\times G)/G
$$
> を **随伴群束** という。射影は $[p,h]\mapsto\pi(p)$ で、同値関係は
$$
[pg,h]=[p,ghg^{-1}]
$$
> とも書ける。同一ファイバーの積は、同じ $p$ で表したとき $[p,h][p,k]=[p,hk]$ と定める。
<!-- formal-statement-end -->

<!-- definition-example-start: def-gbg5-adjoint-group-bundle -->
**定義の確認**。積主束 $P=M\times G$ の場合、
$$
J([\, (x,k),h\,])=(x,khk^{-1})
$$
は代表元に依存しない。実際、$(x,k)$ を $(x,kg)$ に替え、$h$ を $g^{-1}hg$ に替えると
$$
(kg)(g^{-1}hg)(kg)^{-1}=khk^{-1}.
$$
逆写像 $(x,b)\mapsto[(x,e),b]$ も滑らかなので、$\operatorname{Ad}(P)\simeq M\times G$ である。ファイバー内の積について $J([p,h][p,k])=J([p,h])J([p,k])$ も成り立つ。これが単なる集合の束ではなく、群の演算を備えた束であることを示している。
<!-- definition-example-end -->

この構成では群元だけでなく、その単位元での接ベクトルを貼り合わせることもできる。Lie 環の元は、後にゲージ変換を微小に変化させる方向を考えるときに使う。ただしここでは各ファイバーの Lie 環を作るのであって、ゲージ群全体に無限次元 Lie 群構造を導入するわけではない。

<a id="def-gbg5-adjoint-lie-bundle"></a>

<!-- formal-statement-start -->
> **定義（随伴Lie環束）**  
> $P\to M$ を滑らかな右主 $G$ 束、$\mathfrak g=T_eG$ をその Lie 環とする。[随伴表現](../../../代数系/LIE/LIE2/index.md#def-lie2-adjoint-representation)による右作用
$$
(p,\xi)\cdot g=(pg,\operatorname{Ad}_{g^{-1}}\xi)
$$
> の商
$$
\operatorname{ad}(P)=P\times_{\operatorname{Ad}}\mathfrak g
$$
> を **随伴Lie環束** という。射影は $[p,\xi]\mapsto\pi(p)$ で、同値関係は $[pg,\xi]=[p,\operatorname{Ad}_g\xi]$。各ファイバーの Lie 括弧は $[[p,\xi],[p,\eta]]=[p,[\xi,\eta]]$ で定める。
<!-- formal-statement-end -->

<!-- definition-example-start: def-gbg5-adjoint-lie-bundle -->
**定義の確認**。$G=U(1)$ なら全ての元が可換だから $ghg^{-1}=h$ であり、さらにその単位元での微分は $\operatorname{Ad}_g\xi=\xi$ となる。したがって、たとえ $P$ が非自明でも
$$
\operatorname{Ad}(P)\simeq M\times U(1),\qquad
\operatorname{ad}(P)\simeq M\times i\mathbb R
$$
である。$i\mathbb R=T_1U(1)$ は可換 Lie 環で、括弧は常に $0$。この例では主束自体の自明性を仮定していない。
<!-- definition-example-end -->

<a id="prop-gbg5-adjoint-bundle-operations"></a>

<!-- formal-statement-start -->
> **命題（随伴束のファイバー演算と局所成分）**  
> 上記の $P$ と $s_j=s_i g_{ij}$ に対し、$\operatorname{Ad}(P)$ は群 $G$ をファイバーとする滑らかな群束、$\operatorname{ad}(P)$ は Lie 環 $\mathfrak g$ をファイバーとする滑らかなベクトル束である。それぞれの切断の局所成分 $b_i:U_i\to G$ と $\xi_i:U_i\to\mathfrak g$ は、重なりで
$$
b_j=g_{ij}^{-1}b_i g_{ij},\qquad
\xi_j=\operatorname{Ad}_{g_{ij}^{-1}}\xi_i
$$
> を満たす。逆に、滑らかな局所成分がこの条件を満たせば、それぞれ一意な大域切断に貼り合わさる。
<!-- formal-statement-end -->

### 証明の見取り図

同じ幾何学的な点を $[s_i,b_i]=[s_j,b_j]$ と書く。$s_j=s_i g_{ij}$ を代入すると、群座標は逆元による共役を受ける。共役が群積を保ち、その微分が線形変換と Lie 括弧を保つことを用いる。

<!-- proof-start -->
### 証明

まず $P\times G$ の右作用を検査する。$((p,h)\cdot g)\cdot k$ は
$$
(pgk,k^{-1}g^{-1}hgk)
=(p(gk),(gk)^{-1}h(gk))
=(p,h)\cdot(gk)
$$
であり、単位元も恒等作用である。主束の自由性によって各局所sectionを基準にした表示 $[s_i(x),h]$ は一意で、その局所座標は $(x,h)$。変換は
$$
[s_j(x),b_j]=[s_i(x),g_{ij}b_jg_{ij}^{-1}],
\qquad b_i=g_{ij}b_jg_{ij}^{-1}
$$
なので $b_j=g_{ij}^{-1}b_i g_{ij}$ を得る。共役は滑らかな群自己同型であるから、局所座標の貼り合わせは滑らかで各ファイバーの群積・単位元・逆元も基準点に依存しない。実際、代表元を $pg$ に替えた二元の積は
$$
(g^{-1}hg)(g^{-1}kg)=g^{-1}(hk)g
$$
となり、$hk$ を代表元変換した結果と一致する。

$\mathfrak g$ については[LIE2 の随伴表現の準同型性](../../../代数系/LIE/LIE2/index.md#thm-lie2-adjoint-homomorphism)から $\operatorname{Ad}_{g^{-1}}$ が可逆線形かつ滑らかである。よって[GBG4 の結合ベクトル束構成](../GBG4/index.md#thm-gbg4-associated-vector-bundle)を $V=\mathfrak g$、$\rho=\operatorname{Ad}$ に適用でき、局所成分は $\xi_j=\operatorname{Ad}_{g_{ij}^{-1}}\xi_i$ となる。さらに共役自己同型の単位元での微分は Lie 環自己同型なので
$$
[\operatorname{Ad}_g\xi,\operatorname{Ad}_g\eta]
=\operatorname{Ad}_g[\xi,\eta].
$$
従ってファイバーの Lie 括弧は代表元の変更に依存しない。

逆向きには $[s_i(x),b_i(x)]$、$[s_i(x),\xi_i(x)]$ を各 $U_i$ 上で定める。上記の重なり条件を使うとどちらも $U_{ij}$ 上で一致する。局所座標では滑らかであり、一意な大域切断になる。これは[GBG4 の局所貼り合わせ](../GBG4/index.md#prop-gbg4-local-section-gluing)と同じ仕組みである。
<!-- proof-end -->

$\operatorname{Ad}(P)$ と $\operatorname{ad}(P)$ は別物である。前者のファイバーは群で、乗法と逆元を持つ。後者のファイバーはベクトル空間で、線形結合と Lie 括弧を持つ。$G$ が行列群であっても、群元 $h$ と Lie 環元 $\xi$ は混同しない。

## 3. ゲージ群を随伴群束の切断として記述する

$F\in\mathcal G(P)$ に対し、各点 $p$ で $F(p)=p\,u(p)$ と書ける。$u(p)$ は[ファイバー上の自由・推移性](../GBG2/index.md#prop-gbg2-free-transitive)によって一意であり、局所自明化を通せば滑らかである。この $u$ に何の条件が必要かを調べる。

右同変性 $F(pg)=F(p)g$ の両辺を直接表すと
$$
F(pg)=pg\,u(pg),\qquad F(p)g=p\,u(p)g
$$
だから、左から $p$ を消去する[自由性](../GBG2/index.md#prop-gbg2-free-transitive)により
$$
u(pg)=g^{-1}u(p)g
$$
が必要十分である。これは $u:P\to G$ が**共役に関して同変**であるという条件であり、随伴群束の切断を表す。

<a id="def-gbg5-conjugation-equivariant"></a>

<!-- formal-statement-start -->
> **定義（共役同変なゲージ関数）**  
> 滑らかな右主 $G$ 束 $P\to M$ 上の滑らかな写像 $u:P\to G$ が **共役同変** であるとは、全ての $p\in P,\ g\in G$ に対し
$$
u(pg)=g^{-1}u(p)g
$$
> を満たすことをいう。
<!-- formal-statement-end -->

<!-- definition-example-start: def-gbg5-conjugation-equivariant -->
**定義の確認**。$P=M\times G$ とし、滑らかな $a:M\to G$ を選ぶと
$$
u(x,k)=k^{-1}a(x)k
$$
は滑らかで、
$$
u((x,k)g)=(kg)^{-1}a(x)(kg)
=g^{-1}u(x,k)g
$$
だから共役同変である。$G=GL(2,\mathbb R)$、$a=\operatorname{diag}(2,1)$ では $k$ に依存するので、単なる $M$ 上の関数を $P$ に引き戻したものとは限らない。
<!-- definition-example-end -->

以下、束 $B\to M$ の滑らかな大域切断全体を $\Gamma^\infty(B)$ と書く。随伴群束の切断は、同じ基底点のファイバーにある群元の積で掛ける。

<a id="thm-gbg5-gauge-sections"></a>

<!-- formal-statement-start -->
> **定理（ゲージ群と随伴群束の切断の同型）**  
> 滑らかな右主 $G$ 束 $P\to M$ に対し、$\mathcal G(P)$ は随伴群束 $\operatorname{Ad}(P)$ の滑らかな大域切断全体 $\Gamma^\infty(\operatorname{Ad}(P))$ と、切断の点ごとの積について群同型である。具体的には、共役同変な滑らかな $u:P\to G$ を介して
$$
F_u(p)=p\,u(p),\qquad
\alpha_u(x)=[p,u(p)]\quad(\pi(p)=x)
$$
> で対応し、$F_u\circ F_v=F_{uv}$ が成立する。
<!-- formal-statement-end -->

### 証明の見取り図

$u$ の共役同変性は $F_u$ の右同変性と、$\alpha_u$ の代表元非依存性を同時に保証する。逆向きには切断を固定した $p$ に基づく唯一の群元として読む。最後に合成の順序を計算する。

<!-- proof-start -->
### 証明

**1. 共役同変関数から自己同型へ。** 共役同変な滑らかな $u$ に対して $F_u(p)=pu(p)$ と置くと、$\pi(F_u(p))=\pi(p)$ である。また
$$
F_u(pg)=pg\,u(pg)
=pg(g^{-1}u(p)g)
=pu(p)g=F_u(p)g.
$$
$F_u$ は滑らかなので、[同じ基底上の同変写像の同型定理](../GBG2/index.md#thm-gbg2-equivariant-isomorphism)によりゲージ変換である。逆にゲージ変換 $F$ から定めた $u(p)$ は既述の式で共役同変、かつ局所座標で滑らかである。

**2. 共役同変関数から切断へ。** $x=\pi(p)$ とし $\alpha_u(x)=[p,u(p)]$ と置く。$p'=pg$ に変更しても
$$
[pg,u(pg)]=[p,g\,u(pg)g^{-1}]
=[p,g(g^{-1}u(p)g)g^{-1}]=[p,u(p)]
$$
だから well-defined。局所section $s_i$ を使うと $\alpha_u(x)=[s_i(x),u(s_i(x))]$ であり、局所成分は滑らかなので $\alpha_u$ も滑らかである。

逆に随伴群束の滑らかな切断 $\alpha$ が与えられたら、各 $p$ に対し $\alpha(\pi(p))=[p,u(p)]$ と表す $u(p)$ は、[随伴束の局所表示の一意性](#prop-gbg5-adjoint-bundle-operations)により唯一存在する。$p'=pg$ で同じ切断を表せば
$$
[p,u(p)]=[pg,u(pg)]=[p,g\,u(pg)g^{-1}]
$$
より $u(pg)=g^{-1}u(p)g$。$p=s_i(x)k$、$\alpha(x)=[s_i(x),a_i(x)]$ なら
$$
[p,u(p)]=[s_i(x),k\,u(p)k^{-1}]
=[s_i(x),a_i(x)],
\qquad u(s_i(x)k)=k^{-1}a_i(x)k,
$$
なので $u$ は滑らか。双方の構成を戻すと、唯一性により元の切断・関数へ戻る。

**3. 積と合成。** $\alpha_u(x)\alpha_v(x)=[p,u(p)v(p)]=\alpha_{uv}(x)$ である。一方、$u,v$ の共役同変性から
$$
\begin{aligned}
F_u(F_v(p))
&=F_u(pv(p))
=pv(p)\,u(pv(p))\\
&=pv(p)\,[v(p)^{-1}u(p)v(p)]\\
&=p\,u(p)v(p)=F_{uv}(p).
\end{aligned}
$$
従って $u\mapsto F_u\mapsto\alpha_u$ は群同型。単位元は $u(p)=e$、逆元は $u(p)^{-1}$ に対応する。
<!-- proof-end -->

**重要な帰結**。$G=U(1)$ なら共役が恒等なので、任意の主 $U(1)$ 束に対して
$$
\mathcal G(P)\simeq C^\infty(M,U(1))
$$
となる。ここで右辺は滑らかな写像全体の点ごとの積である。$P$ が自明かどうかはこの同型には影響しない。一方、非可換群では各パッチの群値関数を好き勝手に選んでよいわけではない。

## 4. 局所ゲージ関数は共役で整合する

同じ $F$ を各パッチの基準点で読むと $F(s_i)=s_i a_i$ となる。右同変性を重なりで使うと
$$
F(s_j)=F(s_i g_{ij})=s_i a_i g_{ij}
=s_j(g_{ij}^{-1}a_i g_{ij}).
$$
従って、ゲージ変換の局所データには共役整合が必要である。

<a id="thm-gbg5-local-gauge"></a>

<!-- formal-statement-start -->
> **定理（局所ゲージ関数の整合条件と再構成）**  
> $P\to M$ を滑らかな右主 $G$ 束、$s_j=s_i g_{ij}$ を滑らかな局所sectionとする。$F\in\mathcal G(P)$ の局所ゲージ関数 $a_i:U_i\to G$ を $F(s_i)=s_i a_i$ で定めると
$$
a_j=g_{ij}^{-1}a_i g_{ij}
$$
> が全ての $U_{ij}$ で成り立つ。逆に、滑らかな群値関数族 $(a_i)$ がこの整合条件を満たせば、一意な $F\in\mathcal G(P)$ が存在し、その局所表示は
$$
F(s_i(x)k)=s_i(x)a_i(x)k.
$$
> また、同じ $F$ を $s'_i=s_i h_i$ で表示すれば $a'_i=h_i^{-1}a_i h_i$ である。
<!-- formal-statement-end -->

### 証明の見取り図

十分性が大切である。$p$ をどのパッチで書いても同じ $F(p)$ になることを、$s_j=s_i g_{ij}$ と共役整合条件から直接確認する。

<!-- proof-start -->
### 証明

必要性は直前の計算から従い、群元の一意性は[GBG2 の自由・推移性](../GBG2/index.md#prop-gbg2-free-transitive)による。

十分性を示す。$p=s_i(x)k_i=s_j(x)k_j$ なら $s_j=s_i g_{ij}$ より
$$
k_i=g_{ij}k_j.
$$
$i$ 側から定義した値は
$$
\begin{aligned}
s_i a_i k_i
&=s_i a_i g_{ij}k_j\\
&=s_i g_{ij}(g_{ij}^{-1}a_i g_{ij})k_j\\
&=s_j a_j k_j,
\end{aligned}
$$
なのでパッチに依存しない。各局所座標で $(x,k)\mapsto(x,a_i(x)k)$ は滑らかな可逆写像で、逆は $(x,k)\mapsto(x,a_i(x)^{-1}k)$。この局所表示が貼り合わさって滑らかな大域自己同型 $F$ が得られ、$\pi\circ F=\pi$ と $F(pg)=F(p)g$ が直接成立する。局所sectionが各ファイバー全体を生成するため一意性も従う。

最後に $s'_i=s_i h_i$ とすれば
$$
F(s'_i)=F(s_i h_i)=s_i a_i h_i
=s'_i(h_i^{-1}a_i h_i)
$$
となるので $a'_i=h_i^{-1}a_i h_i$。なお[GBG3 の遷移変換](../GBG3/index.md#thm-gbg3-transition-change)で $g'_{ij}=h_i^{-1}g_{ij}h_j$ に変わる場合も、
$$
(g'_{ij})^{-1}a'_i g'_{ij}
=h_j^{-1}g_{ij}^{-1}a_i g_{ij}h_j
=h_j^{-1}a_j h_j=a'_j
$$
で整合条件が保存される。
<!-- proof-end -->

### 非可換な行列を実際に掛ける

基底 $M=\mathbb R$ を $U_0=U_1=\mathbb R$ で覆い、積主束 $P=M\times GL(2,\mathbb R)$ 上で $s_0(x)=(x,I)$、$s_1=s_0g_{01}$ とする。ここで $I$ は単位行列である。遷移関数と局所ゲージ関数を全ての $x\in\mathbb R$ で
$$
g_{01}(x)=H(x)=\begin{pmatrix}1&x\\0&1\end{pmatrix},
\qquad
a_0(x)=D=\begin{pmatrix}2&0\\0&1\end{pmatrix}
$$
とする。$\det H=1$、$\det D=2$ なので両方とも群値である。整合条件から
$$
\begin{aligned}
a_1(x)&=H(x)^{-1}DH(x)\\
&=\begin{pmatrix}1&-x\\0&1\end{pmatrix}
\begin{pmatrix}2&0\\0&1\end{pmatrix}
\begin{pmatrix}1&x\\0&1\end{pmatrix}\\
&=\begin{pmatrix}2&x\\0&1\end{pmatrix}.
\end{aligned}
$$
これは $a_0$ と同じ行列ではないが、同じ大域ゲージ変換を表す。$D$ と $H$ が可換だと仮定して $a_1=D$ とするのは誤りである。

**表示変更との境界**。[局所sectionの取り替え](../GBG3/index.md#def-gbg3-section-change)では任意の滑らかな $h_i$ を選べる。その場合、通常は $g'_{ij}=h_i^{-1}g_{ij}h_j$ へ遷移関数も変化する。これに対して固定した $P$ のゲージ変換 $F$ から $s'_i=F(s_i)=s_i a_i$ を作ったなら、上の整合条件により
$$
g'_{ij}=a_i^{-1}g_{ij}a_j
=a_i^{-1}g_{ij}(g_{ij}^{-1}a_i g_{ij})=g_{ij}.
$$
つまり、任意の局所section変更がゲージ変換とは限らず、**元の遷移関数を保つ**局所変更に限って一つの大域自己同型になる。

## 5. ゲージ変換は場にどう作用するか

物質場は[GBG4 の結合ベクトル束](../GBG4/index.md#def-gbg4-associated-bundle) $E=P\times_\rho V$ の切断である。$G$ が $V$ に滑らかな左線形表現 $\rho$ で作用するとき、$F$ が $P$ の点を動かしたなら、その作用を $E$ へ移せる。

<a id="thm-gbg5-associated-action"></a>

<!-- formal-statement-start -->
> **定理（ゲージ群の結合束への作用）**  
> $P\to M$ を滑らかな右主 $G$ 束、$\rho:G\to GL_{\mathbb F}(V)$ を滑らかな左線形表現、$E=P\times_\rho V$ とする。任意の $F\in\mathcal G(P)$ は、ファイバーごとに線形な滑らかな束自己同型
$$
F_E:E\to E,\qquad F_E([p,v])=[F(p),v]
$$
> を誘導する。切断 $\sigma$ への作用は $(F\cdot\sigma)(x)=F_E(\sigma(x))$ である。$F(s_i)=s_i a_i$、$\sigma(x)=[s_i(x),v_i(x)]$ なら、作用後の局所成分は
$$
(F\cdot v)_i=\rho(a_i)v_i.
$$
> これは重なり条件 $(F\cdot v)_j=\rho(g_{ij}^{-1})(F\cdot v)_i$ と両立する。
<!-- formal-statement-end -->

### 証明の見取り図

代表元を $[pg,v]=[p,\rho(g)v]$ と替えても $F_E$ が同じ値を与えることを右同変性で確認する。局所成分の変換は $[s_i a_i,v_i]=[s_i,\rho(a_i)v_i]$ から出る。

<!-- proof-start -->
### 証明

[結合束の同値関係](../GBG4/index.md#def-gbg4-associated-bundle)から $[pg,v]=[p,\rho(g)v]$。$F$ の右同変性より
$$
[F(pg),v]=[F(p)g,v]
=[F(p),\rho(g)v],
$$
なので $F_E$ は well-defined。$F$ が基底を保存するから $F_E$ も基底を保存する。逆は $(F^{-1})_E$ であり、局所座標では $(x,v)\mapsto(x,\rho(a_i(x))v)$ とその逆になる。$\rho$ は滑らかな線形表現なので両写像は滑らかでファイバー線形。さらに $(F\circ H)_E=F_E\circ H_E$ は各 $[p,v]$ で直接成立する。

切断の局所表示から
$$
F_E([s_i,v_i])=[s_i a_i,v_i]
=[s_i,\rho(a_i)v_i]
$$
を得る。$a_j=g_{ij}^{-1}a_i g_{ij}$ と[GBG4 の局所成分変換](../GBG4/index.md#thm-gbg4-component-transformation) $v_j=\rho(g_{ij}^{-1})v_i$ を代入すると
$$
\begin{aligned}
\rho(a_j)v_j
&=\rho(g_{ij}^{-1}a_i g_{ij})\rho(g_{ij}^{-1})v_i\\
&=\rho(g_{ij}^{-1})\rho(a_i)\rho(g_{ij})\rho(g_{ij}^{-1})v_i\\
&=\rho(g_{ij}^{-1})\rho(a_i)v_i.
\end{aligned}
$$
従って作用後も一つの滑らかな大域切断を表す。これは群の作用である。
<!-- proof-end -->

同じ場を局所section $s'_i=s_i h_i$ で読み替えると、[GBG4 の局所成分変換](../GBG4/index.md#thm-gbg4-component-transformation)から $v'_i=\rho(h_i^{-1})v_i$ となる。

一方、今回の $F$ による作用は局所sectionを固定したまま場の値を $v_i\mapsto\rho(a_i)v_i$ に移す。逆元が現れる側を混ぜると、場の変換の向きが反転する。

随伴Lie環束の切断については、[随伴表現](../../../代数系/LIE/LIE2/index.md#def-lie2-adjoint-representation)を $\rho$ として同じ定理を適用できる。

<a id="prop-gbg5-adjoint-action"></a>

<!-- formal-statement-start -->
> **命題（随伴Lie環値の場への共役作用）**  
> $F\in\mathcal G(P)$ の局所ゲージ関数を $a_i$ とする。随伴Lie環束 $\operatorname{ad}(P)$ の滑らかな切断 $\xi$ の局所成分 $\xi_i$ は、$F$ の誘導する束自己同型により
$$
\xi_i\longmapsto\operatorname{Ad}_{a_i}\xi_i
$$
> と変わる。この変換は局所重なりで両立し、各ファイバーの Lie 括弧を保存する。随伴群束の切断 $b_i$ に対しては $b_i\mapsto a_i b_i a_i^{-1}$ である。
<!-- formal-statement-end -->

### 証明の見取り図

随伴群束でも Lie 環束でも、同一視関係 $[pg,w]=[p,g\cdot w]$ に $F(s_i)=s_i a_i$ を代入する。括弧保存は共役の微分が Lie 環自己同型であることから従う。

<!-- proof-start -->
### 証明

Lie 環束では
$$
F_{\operatorname{ad}}([s_i,\xi_i])
=[F(s_i),\xi_i]
=[s_i a_i,\xi_i]
=[s_i,\operatorname{Ad}_{a_i}\xi_i]
$$
となる。重なりで $\xi_j=\operatorname{Ad}_{g_{ij}^{-1}}\xi_i$、$a_j=g_{ij}^{-1}a_i g_{ij}$ を使うと
$$
\begin{aligned}
\operatorname{Ad}_{a_j}\xi_j
&=\operatorname{Ad}_{g_{ij}^{-1}}\operatorname{Ad}_{a_i}
\operatorname{Ad}_{g_{ij}}\operatorname{Ad}_{g_{ij}^{-1}}\xi_i\\
&=\operatorname{Ad}_{g_{ij}^{-1}}(\operatorname{Ad}_{a_i}\xi_i).
\end{aligned}
$$
また
$$
[\operatorname{Ad}_{a_i}\xi_i,\operatorname{Ad}_{a_i}\eta_i]
=\operatorname{Ad}_{a_i}[\xi_i,\eta_i]
$$
だから括弧を保存する。

群束では $[s_i a_i,b_i]=[s_i,a_i b_i a_i^{-1}]$。重なりでも
$$
a_j b_j a_j^{-1}
=(g_{ij}^{-1}a_i g_{ij})(g_{ij}^{-1}b_i g_{ij})
(g_{ij}^{-1}a_i^{-1}g_{ij})
=g_{ij}^{-1}(a_i b_i a_i^{-1})g_{ij}
$$
と整合する。
<!-- proof-end -->

$G$ が可換なら、随伴群束・随伴Lie環束上のこの共役作用は恒等になる。ただし[結合束への作用](#thm-gbg5-associated-action)は表現 $\rho$ に依存し、例えば[GBG4 で導入した $U(1)$ の整数重み $q$ の表現](../GBG4/index.md#def-gbg4-representation)では、一般に $\rho_q(a_i)=a_i^q$ が非自明に作用する。

---

## 6. 演習と詳細解答

### Level A：群の向きと局所式を確かめる

<a id="ex-gbg5-a01"></a>
#### GBG5-A01 積主束の左乗法と右乗法
- Level: A

$P=\mathbb R\times GL(2,\mathbb R)$、$a(x)=\left(\begin{smallmatrix}1&x\\0&1\end{smallmatrix}\right)$ とし、$F(x,k)=(x,a(x)k)$ と置く。$F$ がゲージ変換であることを定義の全条件から示し、その逆を具体的に求めよ。定数 $b=\operatorname{diag}(2,1)$ について $R_b(x,k)=(x,kb)$ がゲージ変換でないことを一組の $k,g$ を用いて示せ。

<!-- solution-start -->
**詳細解答**。$\det a(x)=1$ で、$a^{-1}(x)=\left(\begin{smallmatrix}1&-x\\0&1\end{smallmatrix}\right)$。両者とも全実数で滑らかである。$F$ は第一成分を保存し、$F((x,k)g)=(x,a(x)kg)=F(x,k)g$ なので[定義](#def-gbg5-gauge-automorphism)の二条件を満たす。逆写像は $F^{-1}(x,k)=(x,a(x)^{-1}k)$、実際 $a^{-1}(ak)=k$、$a(a^{-1}k)=k$ で滑らかな逆である。

$R_b$ では $k=I$、$g=\left(\begin{smallmatrix}1&1\\0&1\end{smallmatrix}\right)$ と取ると
$$
gb=\begin{pmatrix}2&1\\0&1\end{pmatrix},
\qquad bg=\begin{pmatrix}2&2\\0&1\end{pmatrix}
$$
となる。前者は $R_b((x,I)g)$ の第二成分、後者は $R_b(x,I)g$ の第二成分なので右同変性に反する。
<!-- solution-end -->

<a id="ex-gbg5-a02"></a>
#### GBG5-A02 共役による局所ゲージ関数
- Level: A

$g_{01}=H(x)=\left(\begin{smallmatrix}1&x\\0&1\end{smallmatrix}\right)$、$a_0=D=\operatorname{diag}(2,1)$ とする。$a_1$ を計算し、$H a_1=D H$ を成分ごとに確認せよ。

<!-- solution-start -->
**詳細解答**。[局所整合定理](#thm-gbg5-local-gauge)により $a_1=H^{-1}DH$ である。$H^{-1}=\left(\begin{smallmatrix}1&-x\\0&1\end{smallmatrix}\right)$ なので
$$
H^{-1}D=\begin{pmatrix}2&-x\\0&1\end{pmatrix},
\quad
a_1=\begin{pmatrix}2&x\\0&1\end{pmatrix}.
$$
$\det a_1=2$ だから全 $x$ で群元である。実際、
$$
H a_1=\begin{pmatrix}1&x\\0&1\end{pmatrix}
\begin{pmatrix}2&x\\0&1\end{pmatrix}
=\begin{pmatrix}2&2x\\0&1\end{pmatrix}
=D H.
$$
この式は $F(s_1)=F(s_0H)$ を両側から計算したときの一致である。
<!-- solution-end -->

<a id="ex-gbg5-a03"></a>
#### GBG5-A03 非自明な主束でも可換群なら
- Level: A

$P\to M$ を任意の滑らかな主 $U(1)$ 束とする。各パッチで $a_i(x)=e^{it_i(x)}$ と書ける局所ゲージ関数が大域ゲージ変換を定める条件を求めよ。また任意の滑らかな $a:M\to U(1)$ が $F(p)=p\,a(\pi(p))$ を定めることを確かめよ。

<!-- solution-start -->
**詳細解答**。$U(1)$ は可換なので[局所整合条件](#thm-gbg5-local-gauge)は
$$
a_j=g_{ij}^{-1}a_i g_{ij}=a_i
$$
となる。ゆえに $e^{it_i(x)}=e^{it_j(x)}$ が各重なりで必要十分である。$t_i=t_j$ 自体を要求する必要はなく、差が $2\pi$ の整数倍でもよい。一致する $a_i$ は滑らかな大域関数 $a:M\to U(1)$ に貼り合わさる。

任意の $a$ から $u(p)=a(\pi(p))$ と置くと、$\pi(pg)=\pi(p)$ だから
$$
u(pg)=a(\pi(pg))=a(\pi(p))
=g^{-1}u(p)g.
$$
したがって[ゲージ群と切断の対応](#thm-gbg5-gauge-sections)より $F(p)=pu(p)$ はゲージ変換である。$P$ に大域sectionが存在することは仮定していない。
<!-- solution-end -->

<a id="ex-gbg5-a04"></a>
#### GBG5-A04 Lie 環の共役と括弧
- Level: A

$G=GL(2,\mathbb R)$、$A=\operatorname{diag}(2,1)$、
$$
X=\begin{pmatrix}0&1\\0&0\end{pmatrix},
\qquad Y=\begin{pmatrix}0&0\\1&0\end{pmatrix}
$$
とする。$\operatorname{Ad}_A X$、$\operatorname{Ad}_A Y$、$[X,Y]$ を計算し、$\operatorname{Ad}_A[X,Y]=[\operatorname{Ad}_A X,\operatorname{Ad}_A Y]$ を確認せよ。

<!-- solution-start -->
**詳細解答**。[LIE2 の行列群における随伴表現](../../../代数系/LIE/LIE2/index.md#def-lie2-adjoint-representation)では $\operatorname{Ad}_A Z=AZA^{-1}$ である。$A^{-1}=\operatorname{diag}(1/2,1)$ だから
$$
AXA^{-1}=2X,\qquad AYA^{-1}=\frac12 Y.
$$
積を順に計算すると
$$
XY=\begin{pmatrix}1&0\\0&0\end{pmatrix},
\quad
YX=\begin{pmatrix}0&0\\0&1\end{pmatrix},
\quad
[X,Y]=XY-YX=\begin{pmatrix}1&0\\0&-1\end{pmatrix}.
$$
$A$ は対角行列なので $\operatorname{Ad}_A[X,Y]=[X,Y]$。他方
$$
[2X,\tfrac12Y]
=(2X)(\tfrac12Y)-(\tfrac12Y)(2X)
=XY-YX=[X,Y].
$$
従って[随伴Lie環束の括弧保存](#prop-gbg5-adjoint-bundle-operations)をこの例で確認できた。
<!-- solution-end -->

### Level B：貼り合わせと作用を証明する

<a id="ex-gbg5-b01"></a>
#### GBG5-B01 sectionの変更はいつゲージ変換か
- Level: B

二つの局所sectionが $s'_i=s_i h_i$ で結ばれ、元の遷移関数が $s_j=s_i g_{ij}$ であるとする。$s'_i=F(s_i)$ を満たす一つのゲージ変換 $F$ が存在するための必要十分条件を $h_i$ と $g_{ij}$ で表し、証明せよ。

<!-- solution-start -->
**詳細解答**。必要十分条件は
$$
h_j=g_{ij}^{-1}h_i g_{ij}
$$
である。必要性は $F$ の右同変性から
$$
F(s_j)=F(s_i g_{ij})=F(s_i)g_{ij}
=s_i h_i g_{ij}
$$
となる一方、$F(s_j)=s_j h_j=s_i g_{ij}h_j$ であり、[自由性](../GBG2/index.md#prop-gbg2-free-transitive)から $h_i g_{ij}=g_{ij}h_j$、すなわち表示式を得る。

十分性では $F(s_i(x)k)=s_i(x)h_i(x)k$ と置く。$s_i k_i=s_j k_j$ なら $k_i=g_{ij}k_j$、したがって
$$
s_i h_i k_i=s_i h_i g_{ij}k_j
=s_i g_{ij}h_j k_j=s_j h_j k_j.
$$
よって定義はパッチに依存せず、局所的に滑らかで逆を持ち、右同変で基底を保存する。[再構成定理](#thm-gbg5-local-gauge)によって一意なゲージ変換になる。任意の $h_i$ を単なる表示変更に使えることと、この条件を課すことは別である。
<!-- solution-end -->

<a id="ex-gbg5-b02"></a>
#### GBG5-B02 二つのゲージ変換を合成する
- Level: B

積主束 $P=M\times GL(2,\mathbb R)$ 上の定数ゲージ変換 $F_a,F_b$ を、$a=\left(\begin{smallmatrix}1&1\\0&1\end{smallmatrix}\right)$、$b=\operatorname{diag}(2,1)$ で定める。$F_a\circ F_b$ と $F_b\circ F_a$ の局所行列を求め、標準表現の結合束 $E$ 上のベクトル $v=(0,1)^{\mathsf T}$ への作用を両順序で計算せよ。

<!-- solution-start -->
**詳細解答**。$F_a(x,k)=(x,ak)$、$F_b(x,k)=(x,bk)$ なので
$$
F_a(F_b(x,k))=(x,abk),\quad
F_b(F_a(x,k))=(x,bak).
$$
積は
$$
ab=\begin{pmatrix}2&1\\0&1\end{pmatrix},
\qquad
ba=\begin{pmatrix}2&2\\0&1\end{pmatrix}
$$
であり、等しくない。[結合束への作用](#thm-gbg5-associated-action)は標準表現では行列積そのものだから
$$
(ab)v=\begin{pmatrix}1\\1\end{pmatrix},
\qquad
(ba)v=\begin{pmatrix}2\\1\end{pmatrix}.
$$
従って能動的ゲージ変換の合成順序も物質場の作用順序も非可換性を反映する。
<!-- solution-end -->

<a id="ex-gbg5-b03"></a>
#### GBG5-B03 定数右乗法が許される条件
- Level: B

空でない滑らかな基底多様体 $M$（連結性は仮定しない）上の主 $G$ 束 $P$ と固定元 $h\in G$ について $R_h(p)=ph$ を考える。$R_h$ がゲージ変換であるための必要十分条件が $h\in Z(G)$ であることを示せ。ここで、$G$ の中心は
$$
Z(G)=\{z\in G: zg=gz\ \text{for all }g\in G\}
$$
である。

<!-- solution-start -->
**詳細解答**。右作用によって $R_h$ は滑らかな全単射で、逆は $R_{h^{-1}}$、射影も保存する。残る条件は右同変性だけである。任意の $p,g$ について
$$
R_h(pg)=pgh,\qquad R_h(p)g=phg.
$$
$M$ が空でなく $\pi:P\to M$ が全射なので、少なくとも一つの $p\in P$ を取れる。その $p$ に対する主作用の[自由性](../GBG2/index.md#prop-gbg2-free-transitive)により、これらが等しいことは $gh=hg$ と同値である。

$g$ は任意だから $h\in Z(G)$ が必要十分である。ただし $G$ 非可換でも、積主束における $F_a(x,k)=(x,a(x)k)$ は任意の滑らかな $a$ についてゲージ変換である。左からの作用と右からの作用を混同してはならない。
<!-- solution-end -->

<a id="ex-gbg5-b04"></a>
#### GBG5-B04 随伴群束上の共役作用と不変性
- Level: B

$P=M\times GL(2,\mathbb R)$ で、$a(x)=\left(\begin{smallmatrix}1&x\\0&1\end{smallmatrix}\right)$ とする。随伴群束の切断 $b(x)=\operatorname{diag}(2,1)$ が $F_a$ でどの切断へ移るかを求めよ。変換の前後で行列式と跡が変わらないことを直接検算せよ。また局所群値関数 $a(x)$ と $b(x)$ が可換でない場所を特定せよ。

<!-- solution-start -->
**詳細解答**。[随伴群束への作用](#prop-gbg5-adjoint-action)から $b'(x)=a(x)b(x)a(x)^{-1}$ である。まず
$$
a(x)b(x)=\begin{pmatrix}2&x\\0&1\end{pmatrix},
\quad
a(x)^{-1}=\begin{pmatrix}1&-x\\0&1\end{pmatrix}
$$
なので
$$
b'(x)=\begin{pmatrix}2&-x\\0&1\end{pmatrix}.
$$
$\det b' =2\cdot1-0=2=\det b$、$\operatorname{tr}b'=2+1=3=\operatorname{tr}b$。これは共役で行列の固有多項式が保たれることの低次元での確認である。$a(x)b(x)=\left(\begin{smallmatrix}2&x\\0&1\end{smallmatrix}\right)$、$b(x)a(x)=\left(\begin{smallmatrix}2&2x\\0&1\end{smallmatrix}\right)$ だから、両者が可換なのは $x=0$ に限る。
<!-- solution-end -->

### Level C：局所ゲージ群と物質場を一続きに調べる

<a id="ex-gbg5-c01"></a>
#### GBG5-C01 非可換な二枚の束での全工程
- Level: C

$M=\mathbb R$ を $U_0=U_1=\mathbb R$ で覆い、右主 $GL(2,\mathbb R)$ 束の局所sectionを $s_1=s_0H$、$H(x)=\left(\begin{smallmatrix}1&x\\0&1\end{smallmatrix}\right)$ で指定する。標準表現による結合束の切断の成分を $v_0(x)=(x,1)^{\mathsf T}$ とし、ゲージ関数 $a_0(x)=D=\operatorname{diag}(2,1)$ を与える。

1. $a_1,v_1$ を求め、局所データからゲージ変換 $F$ が一意に定まることを示せ。$F(s_0K)$ と $F(s_1L)$ が同じ点を表す条件も計算せよ。
2. $F$ が作用した場の成分 $w_0,w_1$ を求め、$w_1=H^{-1}w_0$ を直接確認せよ。
3. $s'_0=s_0B(x)$、$B(x)=\left(\begin{smallmatrix}1&0\\x&1\end{smallmatrix}\right)$、$s'_1=s_1$ に基準を変更する。新しい遷移関数 $g'_{01}$、同じ $F$ のゲージ関数 $a'_0,a'_1$ を求め、$a'_1=(g'_{01})^{-1}a'_0g'_{01}$ を検算せよ。

<!-- solution-start -->
**詳細解答**。

**第1問**。$\det H=1$、$\det D=2$ だからともに可逆で滑らかである。$H^{-1}=\left(\begin{smallmatrix}1&-x\\0&1\end{smallmatrix}\right)$ より
$$
a_1=H^{-1}DH=\begin{pmatrix}2&x\\0&1\end{pmatrix},
\qquad
v_1=H^{-1}v_0=\begin{pmatrix}0\\1\end{pmatrix}.
$$
$g_{10}=H^{-1}$、$g_{00}=g_{11}=I$ と置けば、二枚の[三重重なりのcocycle条件](../GBG1/index.md#def-gbg1-cocycle)は $HH^{-1}=H^{-1}H=I$ から成立する。$a_1=H^{-1}a_0H$ も成り立つ。[局所ゲージ関数の整合条件と再構成](#thm-gbg5-local-gauge)を適用すれば、一意な $F$ がある。

$p=s_0K=s_1L=s_0HL$ なら自由性から $K=HL$。そこで
$$
F(s_0K)=s_0DK=s_0DHL,\qquad
F(s_1L)=s_1a_1L=s_0H(H^{-1}DH)L=s_0DHL.
$$
等しいことが直接分かる。逆写像は各局所座標で $a_i^{-1}$ を左から掛ける。

**第2問**。[結合束上の作用](#thm-gbg5-associated-action)から
$$
w_0=Dv_0=\begin{pmatrix}2x\\1\end{pmatrix},
\qquad
w_1=a_1v_1
=\begin{pmatrix}2&x\\0&1\end{pmatrix}
\begin{pmatrix}0\\1\end{pmatrix}
=\begin{pmatrix}x\\1\end{pmatrix}.
$$
一方、
$$
H^{-1}w_0
=\begin{pmatrix}1&-x\\0&1\end{pmatrix}
\begin{pmatrix}2x\\1\end{pmatrix}
=\begin{pmatrix}x\\1\end{pmatrix}=w_1.
$$
従って作用後も同じ大域切断の二つの局所表示になっている。

**第3問**。$\det B=1$ で $B^{-1}=\left(\begin{smallmatrix}1&0\\-x&1\end{smallmatrix}\right)$。 [GBG3 の遷移変換定理](../GBG3/index.md#thm-gbg3-transition-change)に $h_0=B,h_1=I$ を入れると
$$
g'_{01}=B^{-1}H
=\begin{pmatrix}1&x\\-x&1-x^2\end{pmatrix}.
$$
同じ $F$ の局所ゲージ関数は[共役変換則](#thm-gbg5-local-gauge)より
$$
a'_0=B^{-1}DB
=\begin{pmatrix}2&0\\-x&1\end{pmatrix},
\qquad
a'_1=a_1=\begin{pmatrix}2&x\\0&1\end{pmatrix}.
$$
最後に、逆行列の積の順序を保って
$$
\begin{aligned}
(g'_{01})^{-1}a'_0g'_{01}
&=(B^{-1}H)^{-1}(B^{-1}DB)(B^{-1}H)\\
&=H^{-1}B B^{-1}D B B^{-1}H\\
&=H^{-1}DH=a_1=a'_1.
\end{aligned}
$$
局所sectionの表示変更と、固定したゲージ変換 $F$ の作用は別操作であるが、このように互いに矛盾しない。
<!-- solution-end -->

## 7. 次章へ

固定した主束のゲージ群は $\Gamma^\infty(\operatorname{Ad}(P))$ として記述でき、局所データは $a_j=g_{ij}^{-1}a_i g_{ij}$ で貼り合わさる。ゲージ変換は結合束上の物質場に $\rho(a_i)$、随伴Lie環値の場に $\operatorname{Ad}_{a_i}$ として作用する。表示だけの変更 $s_i\mapsto s_i h_i$ と、同じ $P$ の自己同型 $F$ の作用を分けたことが重要である。

次の **GBG6** では、ゲージ場を微分するための出発点として、主束の接空間をファイバーに沿う垂直方向と、それを補う水平方向へ分ける。
