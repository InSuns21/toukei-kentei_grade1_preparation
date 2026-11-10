# CAT2-09 単位・余単位と三角恒等式

## 1. Hom集合の全単射を二つの自然変換に圧縮する

[前講の随伴の定義](../CAT2-08/index.md#def-cat2-08-adjunction)は、二つの局所小圏 $\mathcal C,\mathcal D$ と関手 $F:\mathcal C\to\mathcal D$、$G:\mathcal D\to\mathcal C$ に対して、各対象 $c,d$ の組ごとに自然な全単射

$$
\Phi_{c,d}:\operatorname{Hom}_{\mathcal D}(Fc,d)
\xrightarrow{\ \cong\ }\operatorname{Hom}_{\mathcal C}(c,Gd)
$$

を要求した。$\Phi$ は任意の射を別の圏の射へ移す「転置」の規則である。しかし全対象の組で指定するのは大仕事に見える。**恒等射を一度だけ転置した情報から、すべての転置を復元できないか**、というのが本講の問いである。

たとえば[自由モノイドと忘却関手の随伴](../CAT2-08/index.md#thm-cat2-08-free-monoid) $W\dashv U$ では、文字 $x$ を一文字の単語 $(x)$ にする操作と、単語をモノイド内で掛け合わせて評価する操作がある。前者は集合 $X$ ごと、後者はモノイド $M$ ごとに定まる。この二つが、すべてのHom全単射を制御する。

以下、関手の合成は $GF=G\circ F$、射の合成は右から左へ読む。$\mathbf 1_{\mathcal C}$ は恒等関手を表す。[自然変換](../CAT1-07/index.md#def-cat1-07-natural-transformation) $\alpha:H\Rightarrow K$ の成分は $\alpha_x:Hx\to Kx$ と書く。$F\dashv G$ を記す場合、対応 $\Phi$ まで指定したものとする。

## 2. 恒等射の転置が単位・余単位になる

まず各 $c\in\mathcal C$ について $1_{Fc}:Fc\to Fc$ を転置する。すると始域が $c$、終域が $GFc$ の射が得られる。これは「$c$ をいったん $F$ の世界へ送り、$G$ で戻す」際の比較射である。

<a id="def-cat2-09-unit"></a>

<!-- formal-statement-start -->
> **定義（随伴の単位）**
> 局所小圏 $\mathcal C,\mathcal D$、関手 $F:\mathcal C\to\mathcal D$、$G:\mathcal D\to\mathcal C$、二変数自然な全単射 $\Phi$ により $F\dashv G$ が与えられたとする。各 $c\in\mathcal C$ について

$$
\eta_c:=\Phi_{c,Fc}(1_{Fc}):c\longrightarrow GFc
$$

> と定める。これらの成分がなす自然変換 $\eta:\mathbf 1_{\mathcal C}\Rightarrow GF$ を**単位**という。
<!-- formal-statement-end -->

自然変換になることは第4節で証明する。ここで $\eta_c$ の始域は $Fc$ ではなく $c$ である。添字 $(c,Fc)$ を決めてからHom対応へ代入すれば、射の向きを取り違えない。

<!-- definition-example-start: def-cat2-09-unit -->
**定義の確認**（自由モノイド）。$W:\mathbf{Set}\to\mathbf{Mon}$ は有限語の関手、$U$ は忘却関手である。まず一文字を長さ1の単語にする集合写像を

$$
\iota_X:X\longrightarrow U(W(X)),\qquad x\longmapsto(x)
$$

と置く。[前講の具体的なHom対応](../CAT2-08/index.md#thm-cat2-08-free-monoid)は準同型 $h:W(X)\to M$ を集合写像 $U(h)\circ\iota_X:X\to U(M)$ へ送る。ここで $M=W(X)$、$h=1_{W(X)}$ を選ぶと

$$
\eta_X(x)=U(1_{W(X)})(\iota_X(x))=(x)\in U(W(X)).
$$

任意の集合写像 $u:X\to Y$ について、$UW(u)(\eta_X(x))=UW(u)((x))=(u(x))=\eta_Y(u(x))$。従って各成分は集合写像で、自然性の式 $UW(u)\eta_X=\eta_Yu$ も直接確認できる。
<!-- definition-example-end -->

今度は $d\in\mathcal D$ について $1_{Gd}:Gd\to Gd$ を**逆向きに**転置する。$\Phi_{Gd,d}^{-1}$ の入力は $\operatorname{Hom}_{\mathcal C}(Gd,Gd)$ なので、対応する射は $FGd\to d$ となる。

<a id="def-cat2-09-counit"></a>

<!-- formal-statement-start -->
> **定義（随伴の余単位）**
> 局所小圏 $\mathcal C,\mathcal D$、関手 $F:\mathcal C\to\mathcal D$、$G:\mathcal D\to\mathcal C$、二変数自然な全単射 $\Phi$ により $F\dashv G$ が与えられたとする。各 $d\in\mathcal D$ について

$$
\varepsilon_d:=\Phi_{Gd,d}^{-1}(1_{Gd}):
FGd\longrightarrow d
$$

> と定める。これらの成分がなす自然変換 $\varepsilon:FG\Rightarrow\mathbf 1_{\mathcal D}$ を**余単位**という。
<!-- formal-statement-end -->

単位は $c\to GFc$、余単位は $FGd\to d$ であり、一般には逆射でも同型射でもない。$GF$ と $FG$ は異なる圏の自己関手だから、単に「二つが互いに逆」とは書けない。

<!-- definition-example-start: def-cat2-09-counit -->
**定義の確認**（自由語の評価）。モノイド $M$ に対し、$W(UM)$ の文字は $M$ の元である。[前講の逆Hom対応](../CAT2-08/index.md#thm-cat2-08-free-monoid)に $1_{UM}$ を入力すると

$$
\varepsilon_M((m_1,\ldots,m_n))
=m_1\cdots m_n,\qquad
\varepsilon_M(\text{空語})=e_M.
$$

空語を $M$ の単位元へ送り、連結語は積の結合律により積へ送るため、$\varepsilon_M:W(UM)\to M$ はモノイド準同型である。準同型 $k:M\to N$ に対し、単語 $w=(m_1,\ldots,m_n)$ の上で

$$
k(\varepsilon_M(w))
=k(m_1)\cdots k(m_n)
=\varepsilon_N(WU(k)(w))
$$

が成立し、空語でも $k(e_M)=e_N$ で一致する。よって自然性 $k\varepsilon_M=\varepsilon_NWU(k)$ も満たす。
<!-- definition-example-end -->

## 3. 転置は単位・余単位だけで書ける

任意の射 $h:Fc\to d$ を考える。$1_{Fc}$ から $h$ への後合成を、[Hom対応の第二変数での自然性](../CAT2-08/index.md#prop-cat2-08-separate-naturality)へ入力すると、$\eta_c$ に $G(h)$ を後合成することになる。逆方向では $f:c\to Gd$ を $F$ で送ってから $\varepsilon_d$ を合成する。

<a id="prop-cat2-09-transpose"></a>

<!-- formal-statement-start -->
> **命題（転置と逆転置の公式）**
> 局所小圏 $\mathcal C,\mathcal D$ の随伴 $F:\mathcal C\rightleftarrows\mathcal D:G$ を $F\dashv G$ とし、Hom対応を $\Phi$、それから得た単位・余単位を $\eta,\varepsilon$ とする。すべての $c\in\mathcal C,d\in\mathcal D$ と射 $h:Fc\to d$、$f:c\to Gd$ に対して

$$
\boxed{\Phi_{c,d}(h)=G(h)\circ\eta_c},
\qquad
\boxed{\Phi_{c,d}^{-1}(f)=\varepsilon_d\circ F(f)}
$$

> が成立する。第一式の右辺は $c\to GFc\to Gd$、第二式の右辺は $Fc\to FGd\to d$ である。
<!-- formal-statement-end -->

### 証明の見取り図

第一式は $h\circ1_{Fc}=h$ に[自然性](../CAT2-08/index.md#prop-cat2-08-separate-naturality)を適用する。第二式は $\varepsilon_d$ の転置が $1_{Gd}$ であることと、始域側の自然性から確かめる。

<!-- proof-start -->
### 証明

$h:Fc\to d$ をHom対応の第二変数へ入れると

$$
\begin{aligned}
\Phi_{c,d}(h)
&=\Phi_{c,d}(h\circ1_{Fc})\\
&=G(h)\circ\Phi_{c,Fc}(1_{Fc})\\
&=G(h)\circ\eta_c.
\end{aligned}
$$

次に $f:c\to Gd$ とする。$\varepsilon_d:FGd\to d$ の定義により $\Phi_{Gd,d}(\varepsilon_d)=1_{Gd}$ である。第一変数の自然性へ $f:c\to Gd$ を入力すると

$$
\begin{aligned}
\Phi_{c,d}(\varepsilon_d\circ F(f))
&=\Phi_{Gd,d}(\varepsilon_d)\circ f\\
&=1_{Gd}\circ f=f.
\end{aligned}
$$

$\Phi_{c,d}$ は全単射なので、$\varepsilon_dF(f)$ が $f$ の唯一の逆転置である。$\square$
<!-- proof-end -->

この二式を覚える際は、$\eta$ が $F$ の**前**から、$\varepsilon$ が $F$ の**後**から現れる射の型を必ず確認する。あとで三角恒等式が、この二式が本当に互いに逆となる条件だと分かる。

## 4. 二つの自然変換が満たす三角恒等式

任意の二つの自然変換 $\eta:\mathbf1_{\mathcal C}\Rightarrow GF$ と $\varepsilon:FG\Rightarrow\mathbf1_{\mathcal D}$ を与えただけでは、随伴は得られない。先ほどの二つの転置式を連続して使った際、元の射へ戻る必要がある。そこに現れる二つの合成の恒等性を**三角恒等式**と呼ぶ。

<a id="def-cat2-09-triangle-data"></a>

<!-- formal-statement-start -->
> **定義（三角恒等式を満たす随伴データ）**
> 圏 $\mathcal C,\mathcal D$、関手 $F:\mathcal C\to\mathcal D$、$G:\mathcal D\to\mathcal C$、自然変換 $\eta:\mathbf1_{\mathcal C}\Rightarrow GF$ と $\varepsilon:FG\Rightarrow\mathbf1_{\mathcal D}$ を考える。次の二つが全対象について成立するとき、$(F,G,\eta,\varepsilon)$ は**三角恒等式**を満たすという。

$$
\boxed{\varepsilon_{Fc}\circ F(\eta_c)=1_{Fc}}
\quad(c\in\mathcal C),
$$

$$
\boxed{G(\varepsilon_d)\circ\eta_{Gd}=1_{Gd}}
\quad(d\in\mathcal D).
$$

> 第一式は $Fc\to FGFc\to Fc$、第二式は $Gd\to GFGd\to Gd$ という合成である。
<!-- formal-statement-end -->

<!-- definition-example-start: def-cat2-09-triangle-data -->
**定義の確認**（恒等関手）。任意の圏 $\mathcal C$ で $F=G=\mathbf1_{\mathcal C}$、$\eta_c=\varepsilon_c=1_c$ とする。恒等射の族は任意の $u:c\to c'$ について $u1_c=1_{c'}u$ を満たす自然変換である。第一の三角合成は $1_c\circ1_c=1_c$、第二も同じである。**自然変換であることと、二本の三角式で恒等射へ戻ることの双方**を確認した。
<!-- definition-example-end -->

<a id="thm-cat2-09-hom-to-triangles"></a>

<!-- formal-statement-start -->
> **定理（Hom対応からの自然性と三角恒等式）**
> 局所小圏 $\mathcal C,\mathcal D$ と関手 $F:\mathcal C\to\mathcal D$、$G:\mathcal D\to\mathcal C$ に対して二変数自然なHom全単射 $\Phi$ が与えられ、$F\dashv G$ とする。第2節の恒等射の転置から得る $\eta_c,\varepsilon_d$ は自然変換をなし、$(F,G,\eta,\varepsilon)$ は二つの三角恒等式を満たす。
<!-- formal-statement-end -->

### 証明の見取り図

自然性は恒等射の転置を**前合成と後合成の二通り**で計算する。三角恒等式は、恒等射とその転置を逆向きに転置し直すことで得る。

<!-- proof-start -->
### 証明

**単位の自然性。** $u:c\to c'$ に対し $F(u):Fc\to Fc'$ を転置する。[第一変数と第二変数の自然性](../CAT2-08/index.md#prop-cat2-08-separate-naturality)をそれぞれ使うと

$$
\begin{aligned}
\Phi_{c,Fc'}(F(u))
&=\Phi_{c,Fc'}(1_{Fc'}\circ F(u))
=\Phi_{c',Fc'}(1_{Fc'})\circ u
=\eta_{c'}\circ u,\\
\Phi_{c,Fc'}(F(u))
&=\Phi_{c,Fc'}(F(u)\circ1_{Fc})
=GF(u)\circ\Phi_{c,Fc}(1_{Fc})
=GF(u)\circ\eta_c.
\end{aligned}
$$

両辺は $c\to GFc'$ だから、$GF(u)\eta_c=\eta_{c'}u$ が成り立つ。従って $\eta$ は自然変換である。

**余単位の自然性。** $v:d\to d'$ を取り、次の二つの射 $FGd\to d'$ を $\Phi_{Gd,d'}$ で比較する。第3節の[転置公式](#prop-cat2-09-transpose)と二変数自然性より

$$
\begin{aligned}
\Phi_{Gd,d'}(v\circ\varepsilon_d)
&=G(v)\circ\Phi_{Gd,d}(\varepsilon_d)
=G(v),\\
\Phi_{Gd,d'}(\varepsilon_{d'}\circ FG(v))
&=\Phi_{Gd',d'}(\varepsilon_{d'})\circ G(v)
=G(v).
\end{aligned}
$$

全単射 $\Phi_{Gd,d'}$ の単射性から $v\varepsilon_d=\varepsilon_{d'}FG(v)$。よって $\varepsilon$ も自然変換である。

**第一の三角式。** $\eta_c=\Phi_{c,Fc}(1_{Fc})$ だから、[逆転置公式](#prop-cat2-09-transpose)によって

$$
\varepsilon_{Fc}\circ F(\eta_c)
=\Phi_{c,Fc}^{-1}(\eta_c)
=\Phi_{c,Fc}^{-1}(\Phi_{c,Fc}(1_{Fc}))
=1_{Fc}.
$$

**第二の三角式。** $\varepsilon_d=\Phi_{Gd,d}^{-1}(1_{Gd})$ だから、[転置公式](#prop-cat2-09-transpose)によって

$$
G(\varepsilon_d)\circ\eta_{Gd}
=\Phi_{Gd,d}(\varepsilon_d)
=\Phi_{Gd,d}(\Phi_{Gd,d}^{-1}(1_{Gd}))
=1_{Gd}.
$$

これで自然性と二式をともに示した。$\square$
<!-- proof-end -->

## 5. 逆方向：三角恒等式からHom全単射を復元する

今度は出発点を逆にする。Hom対応を知らず、二つの自然変換だけが手元にあるとする。第3節の二式を**新しく転置の候補として定義**する。式を二回続けて適用したとき、自然性と三角恒等式がどう働くかを計算しよう。

<a id="thm-cat2-09-triangles-to-hom"></a>

<!-- formal-statement-start -->
> **定理（三角恒等式からHom対応を復元する）**
> 局所小圏 $\mathcal C,\mathcal D$、関手 $F:\mathcal C\to\mathcal D$、$G:\mathcal D\to\mathcal C$ と自然変換 $\eta:\mathbf1_{\mathcal C}\Rightarrow GF$、$\varepsilon:FG\Rightarrow\mathbf1_{\mathcal D}$ が与えられ、[三角恒等式](#def-cat2-09-triangle-data)を満たすとする。このとき任意の $c\in\mathcal C,d\in\mathcal D$ について

$$
\begin{aligned}
\Phi_{c,d}(h)&:=G(h)\circ\eta_c
&& (h:Fc\to d),\\
\Psi_{c,d}(f)&:=\varepsilon_d\circ F(f)
&& (f:c\to Gd)
\end{aligned}
$$

> は互いに逆の全単射であり、$\Phi$ は両変数について自然である。従って $F\dashv G$ が成立する。
<!-- formal-statement-end -->

### 証明の見取り図

最初に自然性を確認する。$\eta$ の自然性は始域側の前合成、$G$ の関手性は終域側の後合成を扱う。逆写像の検算では一方の三角式だけでは足りない。$\Psi\Phi$ に第一の三角式、$\Phi\Psi$ に第二の三角式を使う。

<!-- proof-start -->
### 証明

まず $h:Fc\to d$ に対して $G(h)\eta_c:c\to Gd$、$f:c\to Gd$ に対して $\varepsilon_dF(f):Fc\to d$ となるので、二つの写像は各Hom集合の間で**型が合っている**。

**$\Phi$ の二変数自然性。** $u:c'\to c$、$v:d\to d'$、$h:Fc\to d$ を取る。$F,G$ の合成保存と $\eta$ の自然性 $GF(u)\eta_{c'}=\eta_cu$ より

$$
\begin{aligned}
\Phi_{c',d'}(v\circ h\circ F(u))
&=G(v\circ h\circ F(u))\circ\eta_{c'}\\
&=G(v)\circ G(h)\circ GF(u)\circ\eta_{c'}\\
&=G(v)\circ G(h)\circ\eta_c\circ u\\
&=G(v)\circ\Phi_{c,d}(h)\circ u.
\end{aligned}
$$

これが[随伴の定義](../CAT2-08/index.md#def-cat2-08-adjunction)の要求する二変数自然性である。また逆方向の写像 $\Psi$ についても、$\varepsilon$ の自然性 $\varepsilon_{d'}FG(v)=v\varepsilon_d$ を使えば

$$
\begin{aligned}
\Psi_{c',d'}(G(v)\circ f\circ u)
&=\varepsilon_{d'}\circ F(G(v)\circ f\circ u)\\
&=\varepsilon_{d'}\circ FG(v)\circ F(f)\circ F(u)\\
&=v\circ\varepsilon_d\circ F(f)\circ F(u)\\
&=v\circ\Psi_{c,d}(f)\circ F(u).
\end{aligned}
$$

**$\Psi\Phi=1$。** $h:Fc\to d$ に対し

$$
\begin{aligned}
\Psi_{c,d}(\Phi_{c,d}(h))
&=\varepsilon_d\circ F(G(h)\circ\eta_c)\\
&=\varepsilon_d\circ FG(h)\circ F(\eta_c)\\
&=h\circ\varepsilon_{Fc}\circ F(\eta_c)\\
&=h\circ1_{Fc}=h.
\end{aligned}
$$

第三行は $\varepsilon$ の自然性を $h:Fc\to d$ へ適用したもの、第四行は第一の三角恒等式である。

**$\Phi\Psi=1$。** $f:c\to Gd$ に対し

$$
\begin{aligned}
\Phi_{c,d}(\Psi_{c,d}(f))
&=G(\varepsilon_d\circ F(f))\circ\eta_c\\
&=G(\varepsilon_d)\circ GF(f)\circ\eta_c\\
&=G(\varepsilon_d)\circ\eta_{Gd}\circ f\\
&=1_{Gd}\circ f=f.
\end{aligned}
$$

第三行は $\eta$ の自然性を $f:c\to Gd$ へ適用したもの、第四行は第二の三角恒等式である。よって両写像は互いに逆で、各Hom集合で全単射となる。$\square$
<!-- proof-end -->

<a id="cor-cat2-09-equivalence"></a>

<!-- formal-statement-start -->
> **系（随伴の二つの記述と一意性）**
> 局所小圏 $\mathcal C,\mathcal D$ と関手 $F:\mathcal C\to\mathcal D$、$G:\mathcal D\to\mathcal C$ を固定する。二変数自然なHom全単射を与えることと、自然変換 $\eta:\mathbf1_{\mathcal C}\Rightarrow GF$、$\varepsilon:FG\Rightarrow\mathbf1_{\mathcal D}$ で三角恒等式を満たす組を与えることは、一対一に対応する。**指定したHom対応**から $\eta,\varepsilon$ は一意に定まり、逆に**指定した組**からHom対応は一意に定まる。
<!-- formal-statement-end -->

### 証明の見取り図

二つの[構成](#thm-cat2-09-hom-to-triangles)と[逆構成](#thm-cat2-09-triangles-to-hom)を続ける。Hom対応へ戻るときは[転置公式](#prop-cat2-09-transpose)が元の $\Phi$ と一致させる。$\eta,\varepsilon$ へ戻るときは恒等射を代入する。

<!-- proof-start -->
### 証明

Hom対応から得た組を逆構成へ入れれば、[転置公式](#prop-cat2-09-transpose)により全ての $c,d,h$ で元の $\Phi_{c,d}(h)$ が得られる。一方、任意の三角恒等式を満たす組から定理により作ったHom対応を $\Phi$、その逆を $\Psi$ とする。恒等射を転置すると

$$
\Phi_{c,Fc}(1_{Fc})
=G(1_{Fc})\eta_c=\eta_c,
$$

$$
\Psi_{Gd,d}(1_{Gd})
=\varepsilon_dF(1_{Gd})=\varepsilon_d.
$$

両方向の合成が恒等であるから、一対一対応と指定データに関する一意性が成立する。$\square$
<!-- proof-end -->

**注意。** $F,G$ を固定しただけで単位・余単位の選び方が必ず一つになる、と言っているわけではない。どのHom対応（またはどの自然変換の組）を選んだかまで固定したときの一意性である。

## 6. 具体例で二つの三角式を検算する

### 6.1 自由モノイド：挿入して評価すると元へ戻る

[自由モノイドの随伴](../CAT2-08/index.md#thm-cat2-08-free-monoid) $W\dashv U$ では、すでに

$$
\eta_X:x\longmapsto(x),
\qquad
\varepsilon_M:(m_1,\ldots,m_n)\longmapsto m_1\cdots m_n
$$

を構成した。第一の三角式を $w=(x_1,\ldots,x_n)\in W(X)$ に適用する。$W(\eta_X)$ は**各文字**を一文字語へ置き換えるので

$$
\begin{aligned}
w=(x_1,\ldots,x_n)
&\xmapsto{W(\eta_X)}
((x_1),\ldots,(x_n))\\
&\xmapsto{\varepsilon_{W(X)}}
(x_1,\ldots,x_n)=w.
\end{aligned}
$$

空語も空語へ戻る。第二の三角式は $m\in UM$ で

$$
m\xmapsto{\eta_{UM}}(m)
\xmapsto{U(\varepsilon_M)}m.
$$

評価を先にしてから一文字語を作ると誤ってはいけない。二つの三角式では、関手を挟む順序が異なる。

<a id="ref-cat2-09-diagonal-product"></a>

### 6.2 対角と積：対角写像と二つの射影

[対角関手と積関手の随伴](../CAT2-08/index.md#thm-cat2-08-diagonal-product) $\Delta\dashv\Pi$ を集合の圏で考える。$\Delta X=(X,X)$、$\Pi(A,B)=A\times B$ である。[前講のHom対応](../CAT2-08/index.md#def-cat2-08-adjunction)は射の組 $(f,g)$ を $x\mapsto(f(x),g(x))$ へ送る。

したがって単位は対角写像

$$
\eta_X=\delta_X:X\to X\times X,\qquad
\delta_X(x)=(x,x),
$$

余単位は射影の組

$$
\varepsilon_{(A,B)}
=(\pi_A,\pi_B):
(A\times B,A\times B)\longrightarrow(A,B).
$$

第一の三角式は $\Delta X=(X,X)$ 上の射の組であり

$$
\varepsilon_{\Delta X}\circ\Delta(\eta_X)
=(\pi_1\delta_X,\pi_2\delta_X)
=(1_X,1_X)=1_{\Delta X}.
$$

第二の三角式は $A\times B$ 上の写像である。$(a,b)\in A\times B$ に対して

$$
\begin{aligned}
(a,b)
&\xmapsto{\eta_{A\times B}}
((a,b),(a,b))\\
&\xmapsto{\Pi(\varepsilon_{(A,B)})}
(\pi_A(a,b),\pi_B(a,b))=(a,b).
\end{aligned}
$$

集合が空である場合も、両辺は同じ定義域・終域の写像であり、射影の普遍性によって一致する。

### 6.3 余積と対角：包含してから畳み込む

[余積と対角の随伴](../CAT2-08/index.md#thm-cat2-08-coproduct-diagonal) $\Sigma\dashv\Delta$ では $\Sigma(A,B)=A\sqcup B$ とする。二つの包含 $i_A:A\to A\sqcup B$、$i_B:B\to A\sqcup B$ と、二つのコピーを元の集合に戻す折り畳み写像 $[1_X,1_X]:X\sqcup X\to X$ がある。

$$
\eta_{(A,B)}=(i_A,i_B):(A,B)\longrightarrow
(A\sqcup B,A\sqcup B),
\qquad
\varepsilon_X=[1_X,1_X]:X\sqcup X\to X.
$$

第一の三角合成の始域・終域は $A\sqcup B$ である。左側の元を $(0,a)$、右側の元を $(1,b)$ とタグ付きで書く。$\Sigma(\eta_{(A,B)})$ は元のタグを保ったまま、その元を **二つのコピーのどちらへ送ったか** を外側のタグで記録する。続いて $\varepsilon_{\Sigma(A,B)}$ が外側のタグだけを忘れるので

$$
\begin{aligned}
(0,a)&\xmapsto{\Sigma(\eta_{(A,B)})}(0,(0,a))
\xmapsto{\varepsilon_{\Sigma(A,B)}}(0,a),\\
(1,b)&\xmapsto{\Sigma(\eta_{(A,B)})}(1,(1,b))
\xmapsto{\varepsilon_{\Sigma(A,B)}}(1,b).
\end{aligned}
$$

空集合の場合も定義域の元が存在しない側についての条件は空虚に成立する。第二の三角合成は $(X,X)$ 上の射の組であり、$\eta_{\Delta X}=(i_1,i_2)$ の後で $\Delta(\varepsilon_X)$ を適用する。各成分で

$$
\Delta(\varepsilon_X)\eta_{\Delta X}
=([1_X,1_X]i_1,[1_X,1_X]i_2)
=(1_X,1_X)=1_{\Delta X}
$$

となる。二つの三角式は同じ「包含を畳み込む」計算の異なる型である。

### 6.4 半順序圏：三角式は一意な射の合成になる

[半順序圏の随伴判定](../CAT2-08/index.md#thm-cat2-08-poset)で $F:P\to Q$、$G:Q\to P$ が $Fp\le q\iff p\le Gq$ を満たすとする。恒等関係 $Fp\le Fp$ を転置すると単位 $p\le GFp$、$Gq\le Gq$ を逆転置すると余単位 $FGq\le q$ が得られる。

第一の三角合成では単位 $p\le GFp$ という射に関手 $F$ を適用し、続けて余単位を対象 $Fp$ で使う。第二の三角合成では単位を対象 $Gq$ で使い、続けて余単位 $FGq\le q$ という射に関手 $G$ を適用する。従ってそれぞれ

$$
Fp\xrightarrow{F(\eta_p)}FGFp\xrightarrow{\varepsilon_{Fp}}Fp,
\qquad
Gq\xrightarrow{\eta_{Gq}}GFGq\xrightarrow{G(\varepsilon_q)}Gq
$$

という射の合成である。半順序圏では始域・終域が同じ射は恒等射しかないから、両者とも恒等射となる。

特に $I:\mathbb Z\hookrightarrow\mathbb R$ と床関数 $R(x)=\lfloor x\rfloor$ の随伴 $I\dashv R$ では

$$
\eta_n:n\le\lfloor n\rfloor=n,\qquad
\varepsilon_x:\lfloor x\rfloor\le x.
$$

ここで等式であるのは前者だけで、非整数 $x$ では $\varepsilon_x$ は同型射ではない。一般圏では**自然変換が存在するだけ**では三角恒等式は従わない。半順序圏で自動的に成立するのは、両端を固定した射が高々一つという特別な理由による。

### 6.5 三角式がないと失敗する

対象が一つ $*$ だけで、射を非負整数 $\mathbb N_0=\{0,1,2,\ldots\}$、合成を加法 $m\circ n=m+n$、恒等射を $0$ とする圏 $\mathcal N$ を考える。加法は結合的で $0$ は単位元なので圏であり、Homは集合 $\mathbb N_0$ である。$F=G=\mathbf1_{\mathcal N}$ とする。

成分 $\eta_*=1$、$\varepsilon_*=0$ はどちらも自然変換を定める。任意の射 $n$ に対する自然性は $n+1=1+n$、$n+0=0+n$ だから成立する。しかし第一・第二の三角合成はともに $0+1=1$ であり、恒等射 $0$ と異なる。この組から[復元公式](#thm-cat2-09-triangles-to-hom)を真似て作る写像は

$$
\Phi_{*,*}:\mathbb N_0\to\mathbb N_0,\qquad
n\longmapsto n+1.
$$

$0$ が像にないため全単射ではない。**失った仮定は三角恒等式であり、壊れた機構は転置後の逆転置が恒等射に戻らないこと**である。

## 7. 演習

### 問題1：単位・余単位の射の型

- Level: A

局所小圏 $\mathcal C,\mathcal D$、随伴 $F:\mathcal C\to\mathcal D\dashv G:\mathcal D\to\mathcal C$ とその単位 $\eta$、余単位 $\varepsilon$ を考える。$c\in\mathcal C,d\in\mathcal D$ に対し、$\eta_c$、$F(\eta_c)$、$\varepsilon_{Fc}$、$\eta_{Gd}$、$G(\varepsilon_d)$ の始域・終域を列挙し、二つの三角合成の型を確認せよ。

<!-- solution-start -->
**詳細解答。** [単位](#def-cat2-09-unit)の成分は $\eta_c:c\to GFc$。$F$ を適用すれば $F(\eta_c):Fc\to FGFc$ である。一方、余単位を対象 $Fc\in\mathcal D$ で取ると $\varepsilon_{Fc}:FGFc\to Fc$ だから、合成 $\varepsilon_{Fc}F(\eta_c)$ は $Fc\to Fc$ となる。

次に $\eta_{Gd}:Gd\to GFGd$、$\varepsilon_d:FGd\to d$ より $G(\varepsilon_d):GFGd\to Gd$。合成 $G(\varepsilon_d)\eta_{Gd}$ は $Gd\to Gd$ となる。両合成の恒等性が[三角恒等式](#def-cat2-09-triangle-data)である。$\square$
<!-- solution-end -->

### 問題2：自由語の三角合成

- Level: A

$W:\mathbf{Set}\to\mathbf{Mon}$ を有限語の関手、$U$ を忘却関手とし、$W\dashv U$ とする。$X=\{p,q\}$、$M=(\mathbb Z,+,0)$ とする。$\eta_X(p)$、$\varepsilon_M((2,-1,2))$ を求め、$w=(p,q,p)$ 上の $\varepsilon_{W(X)}W(\eta_X)$ と $m=-3$ 上の $U(\varepsilon_M)\eta_{UM}$ を直接計算せよ。

<!-- solution-start -->
**詳細解答。** [単位の定義例](#def-cat2-09-unit)より $\eta_X(p)=(p)$。[余単位の定義例](#def-cat2-09-counit)を $M=(\mathbb Z,+,0)$ に適用すると、語の連結は整数の加法へ移るので $\varepsilon_M((2,-1,2))=2+(-1)+2=3$ である。第一の合成は

$$
(p,q,p)\xmapsto{W(\eta_X)}((p),(q),(p))
\xmapsto{\varepsilon_{W(X)}}(p,q,p).
$$

第二の合成は $-3\xmapsto{\eta_{UM}}(-3)\xmapsto{U(\varepsilon_M)}-3$。途中の $(-3)$ は整数 $-3$ を一文字とする単語であって、整数の括弧とは役割が異なる。いずれも元の入力に戻る。$\square$
<!-- solution-end -->

### 問題3：対角と積の三角合成

- Level: A

$\Delta:\mathbf{Set}\to\mathbf{Set}\times\mathbf{Set}$、$\Pi(A,B)=A\times B$ とし、$\Delta\dashv\Pi$ とする。$X=\{0,1\}$、$A=\{a,b\}$、$B=\{u\}$ に対し、$\eta_X(1)$ と $\varepsilon_{(A,B)}$ の二つの成分を記せ。$(b,u)$ に第二の三角合成 $\Pi(\varepsilon_{(A,B)})\eta_{A\times B}$ を適用して確かめよ。

<!-- solution-start -->
**詳細解答。** [対角と積の例](#ref-cat2-09-diagonal-product)で使う単位は $\eta_X(1)=(1,1)$ である。[積の射影](../CAT2-02/index.md#def-cat2-02-binary-product)から $\varepsilon_{(A,B)}=(\pi_A,\pi_B)$、ここで $\pi_A(a',u)=a'$、$\pi_B(a',u)=u$。よって

$$
(b,u)\xmapsto{\eta_{A\times B}}((b,u),(b,u))
\xmapsto{\pi_A\times\pi_B}
(\pi_A(b,u),\pi_B(b,u))=(b,u).
$$

最初の写像の終域は $(A\times B)\times(A\times B)$、最後は $A\times B$ である。$\square$
<!-- solution-end -->

### 問題4：床関数の単位と余単位

- Level: A

通常の大小関係を圏とみなし、包含 $I:\mathbb Z\to\mathbb R$ と床関数 $R:\mathbb R\to\mathbb Z$ について $I\dashv R$ を用いる。$n=-2$、$x=-1.2$ で単位と余単位を不等式で表し、$IR I(n)\to I(n)$、$RIR(x)\to R(x)$ を終域とする三角合成が恒等射になる理由を説明せよ。

<!-- solution-start -->
**詳細解答。** [半順序圏の随伴判定](../CAT2-08/index.md#thm-cat2-08-poset)では $I(n)\le x$ と $n\le R(x)$ が同値である。単位は $n\le R(I(n))=\lfloor n\rfloor=n$、従って $-2\le-2$。余単位は $I(R(x))=\lfloor x\rfloor\le x$、従って $-2\le-1.2$ である。

第一の三角合成は $I(n)=-2\le IR I(n)=-2\le I(n)=-2$。第二は $R(x)=-2\le RIR(x)=-2\le R(x)=-2$。どちらも始域・終域が同じで、半順序圏にそのような射は恒等射一本しかない。$\square$
<!-- solution-end -->

### 問題5：積の転置公式を二方向に使う

- Level: A

$\Delta\dashv\Pi$ とし、集合写像 $f:X\to A$、$g:X\to B$ を考える。$h=(f,g):\Delta X\to(A,B)$ に対し、$\Phi(h)=\Pi(h)\eta_X$ が $x\mapsto(f(x),g(x))$ を与えることを示せ。また任意の $k:X\to A\times B$ に対し、$\Psi(k)=\varepsilon_{(A,B)}\Delta(k)$ の二成分を求めよ。

<!-- solution-start -->
**詳細解答。** $\Pi(h)=f\times g:X\times X\to A\times B$ は $(x_1,x_2)\mapsto(f(x_1),g(x_2))$、$\eta_X(x)=(x,x)$ であるから

$$
\Phi(h)(x)=(f\times g)(x,x)=(f(x),g(x)).
$$

逆向きに $\Delta(k)=(k,k):(X,X)\to(A\times B,A\times B)$ であり、$\varepsilon_{(A,B)}=(\pi_A,\pi_B)$。よって

$$
\Psi(k)=(\pi_A,\pi_B)\circ(k,k)
=(\pi_A\circ k,\pi_B\circ k).
$$

二つは[転置公式](#prop-cat2-09-transpose)そのもので、$\Psi(\Phi(f,g))=(f,g)$ も射影から確認できる。$\square$
<!-- solution-end -->

### 問題6：二通りの恒等射転置から自然性を証明する

- Level: B

$F:\mathcal C\to\mathcal D$、$G:\mathcal D\to\mathcal C$ を局所小圏の随伴 $F\dashv G$ とし、二変数自然なHom対応を $\Phi$ とする。$u:c\to c'$ に対し $\Phi_{c,Fc'}(F(u))$ を、$1_{Fc'}$ の前合成と $1_{Fc}$ の後合成のそれぞれから計算し、$\eta$ の自然性を証明せよ。さらに $v:d\to d'$ に対し $\varepsilon$ の自然性を証明せよ。

<!-- solution-start -->
**詳細解答。** $F(u)=1_{Fc'}F(u)=F(u)1_{Fc}$ である。[二変数自然性の分解](../CAT2-08/index.md#prop-cat2-08-separate-naturality)の第一式と第二式をそれぞれ適用すると

$$
\begin{aligned}
\Phi_{c,Fc'}(1_{Fc'}F(u))
&=\Phi_{c',Fc'}(1_{Fc'})u=\eta_{c'}u,\\
\Phi_{c,Fc'}(F(u)1_{Fc})
&=GF(u)\Phi_{c,Fc}(1_{Fc})=GF(u)\eta_c.
\end{aligned}
$$

よって $\eta_{c'}u=GF(u)\eta_c$。余単位については $\Phi_{Gd,d}(\varepsilon_d)=1_{Gd}$ と $\Phi_{Gd',d'}(\varepsilon_{d'})=1_{Gd'}$ を使う。$v\varepsilon_d$ の転置は $G(v)1_{Gd}=G(v)$、$\varepsilon_{d'}FG(v)$ の転置は $1_{Gd'}G(v)=G(v)$。全単射の単射性から $v\varepsilon_d=\varepsilon_{d'}FG(v)$ となる。前者は $c\to GFc'$、後者は $FGd\to d'$ の等式なので型も正しい。$\square$
<!-- solution-end -->

### 問題7：余積の包含と折り畳み

- Level: B

集合の余積関手 $\Sigma:\mathbf{Set}\times\mathbf{Set}\to\mathbf{Set}$ と対角関手 $\Delta$ に対し $\Sigma\dashv\Delta$ とする。$\eta_{(A,B)}=(i_A,i_B)$ と $\varepsilon_X=[1_X,1_X]$ を、Hom全単射の恒等射転置から導き、任意の $A,B,X$ について二つの三角恒等式をタグ付き元で確かめよ。

<!-- solution-start -->
**詳細解答。** [余積のHom対応](../CAT2-08/index.md#thm-cat2-08-coproduct-diagonal)は $h:A\sqcup B\to X$ を $(hi_A,hi_B)$ へ送る。$X=A\sqcup B$、$h=1_{A\sqcup B}$ とすれば $\eta_{(A,B)}=(i_A,i_B)$。逆向きに $X$ で恒等射 $(1_X,1_X):\Delta X\to\Delta X$ を転置すると、タグ付き両コピーで恒等になる $\varepsilon_X=[1_X,1_X]$ を得る。

第一の三角式では $(0,a)\in A\sqcup B$ に対し

$$
(0,a)\xmapsto{\Sigma(\eta_{(A,B)})}(0,(0,a))
\xmapsto{\varepsilon_{A\sqcup B}}(0,a).
$$

同様に $(1,b)$ の場合は $(1,b)\mapsto(1,(1,b))\mapsto(1,b)$。両タグの全元を尽くしたため合成は恒等写像である。第二の三角式は $\Delta X=(X,X)$ 上の射の組であり

$$
\Delta(\varepsilon_X)\eta_{\Delta X}
=([1_X,1_X]i_1,[1_X,1_X]i_2)
=(1_X,1_X).
$$

よって両方成立する。$\square$
<!-- solution-end -->

### 問題8：合成した随伴の単位・余単位

- Level: B

局所小圏の関手 $F:\mathcal A\to\mathcal B$、$G:\mathcal B\to\mathcal A$、$F':\mathcal B\to\mathcal E$、$G':\mathcal E\to\mathcal B$ に対し、$F\dashv G$ の単位・余単位を $\eta,\varepsilon$、$F'\dashv G'$ のものを $\eta',\varepsilon'$ とする。二段階のHom対応で得る合成随伴 $F'F\dashv GG'$ の単位 $\eta^*$ と余単位 $\varepsilon^*$ を恒等射の転置から求め、各合成の型を確認せよ。

<!-- solution-start -->
**詳細解答。** 合成随伴のHom対応は

$$
\operatorname{Hom}_{\mathcal E}(F'Fa,e)
\xrightarrow{\ \Phi'_{Fa,e}\ }
\operatorname{Hom}_{\mathcal B}(Fa,G'e)
\xrightarrow{\ \Phi_{a,G'e}\ }
\operatorname{Hom}_{\mathcal A}(a,GG'e).
$$

単位は $e=F'Fa$、$h=1_{F'Fa}$ を順に転置する。まず $\Phi'_{Fa,F'Fa}(1)=\eta'_{Fa}:Fa\to G'F'Fa$。次に[転置公式](#prop-cat2-09-transpose)から

$$
\eta^*_a=G(\eta'_{Fa})\circ\eta_a:
a\longrightarrow GFa\longrightarrow GG'F'Fa.
$$

余単位は $a=GG'e$、$f=1_{GG'e}$ を逆順に転置する。まず $\Phi^{-1}_{GG'e,G'e}(1)=\varepsilon_{G'e}:FGG'e\to G'e$、その後 $\Phi'^{-1}_{FGG'e,e}$ を使うので

$$
\varepsilon^*_e
=\varepsilon'_e\circ F'(\varepsilon_{G'e}):
F'FGG'e\longrightarrow F'G'e\longrightarrow e.
$$

二変数自然な全単射の合成は前講で検証した形であり、[随伴の二つの記述の同値](#cor-cat2-09-equivalence)により、求めた組は二つの三角恒等式を満たす。$\square$
<!-- solution-end -->

### 問題9：自然変換だけでは足りない

- Level: B

一対象圏 $\mathcal N$ の射を $\mathbb N_0=\{0,1,2,\ldots\}$、合成を加法、恒等射を $0$ とし、$F=G=\mathbf1_{\mathcal N}$ とする。$\eta_*=2$、$\varepsilon_*=0$ が自然変換を定めることを確認し、三角恒等式と、それから作る転置候補の全射性を判定せよ。$\eta_*=0,\varepsilon_*=0$ とした場合と比較せよ。

<!-- solution-start -->
**詳細解答。** 任意の射 $n\in\mathbb N_0$ に対し $n+2=2+n$、$n+0=0+n$ だから、それぞれ恒等関手間の自然変換となる。$F,G$ は恒等関手なので、両三角合成は加法で $0+2=2$。しかし恒等射は $0$ なので三角式は両方とも不成立である。[復元式](#thm-cat2-09-triangles-to-hom)を形式的に使うと

$$
\Phi(n)=G(n)\circ\eta_*=n+2.
$$

これは $0,1$ を像に含まず全射でない。反対に $\eta_*=\varepsilon_*=0$ なら自然性は同様に成立し、両三角合成は $0+0=0$、$\Phi(n)=n$、$\Psi(n)=n$ となり互いに逆の全単射を与える。破綻原因は自然性ではなく三角恒等式の欠如である。$\square$
<!-- solution-end -->

### 問題10：像と逆像の随伴、単位・余単位が同型になる条件

- Level: C

集合写像 $f:X\to Y$ に対し、べき集合 $\mathcal P(X)$、$\mathcal P(Y)$ を包含順序の圏とする。$L:\mathcal P(X)\to\mathcal P(Y)$ を $L(A)=f(A)$、$R:\mathcal P(Y)\to\mathcal P(X)$ を $R(B)=f^{-1}(B)$ とする。ここで $f^{-1}(B)=\{x\in X\mid f(x)\in B\}$ は逆像であり、$f$ が逆写像を持つという意味ではない。

1. $L\dashv R$ を包含関係から証明し、単位 $\eta_A$ と余単位 $\varepsilon_B$ を具体的な包含として求めよ。
2. 二つの三角恒等式を、集合の等式 $f(f^{-1}(f(A)))=f(A)$ と $f^{-1}(f(f^{-1}(B)))=f^{-1}(B)$ を証明して確認せよ。
3. 全ての $A$ で $\eta_A$ が同型射となる条件が $f$ の単射性、全ての $B$ で $\varepsilon_B$ が同型射となる条件が $f$ の全射性であることを証明せよ。
4. $X=\{a,b\}$、$Y=\{0,1\}$、$f(a)=f(b)=0$ とし、$A=\{a\}$、$B=\{1\}$ で単位と余単位が同型か判定せよ。

<!-- solution-start -->
**詳細解答。**

**（1）随伴と二つの成分。** $f(A)\subseteq B$ とは、すべての $x\in A$ の像 $f(x)$ が $B$ に入ることだから

$$
\begin{aligned}
L(A)\subseteq B
&\Longleftrightarrow (\forall x\in A)\ f(x)\in B\\
&\Longleftrightarrow (\forall x\in A)\ x\in f^{-1}(B)\\
&\Longleftrightarrow A\subseteq R(B).
\end{aligned}
$$

両写像は包含を保存するので関手であり、[半順序圏の随伴判定](../CAT2-08/index.md#thm-cat2-08-poset)から $L\dashv R$。恒等包含 $L(A)\subseteq L(A)$ の転置は

$$
\eta_A:A\subseteq f^{-1}(f(A)),
$$

恒等包含 $R(B)\subseteq R(B)$ の逆転置は

$$
\varepsilon_B:f(f^{-1}(B))\subseteq B.
$$

前者は $x\in A$ なら $f(x)\in f(A)$ であること、後者は $y=f(x)$ かつ $f(x)\in B$ なら $y\in B$ であることから正しい。

**（2）二つの三角式。** 任意の $A\subseteq X$ に対し $f(A)\subseteq f(f^{-1}(f(A)))$ は、$A\subseteq f^{-1}(f(A))$ に $f$ を作用させて得る。逆に $f(f^{-1}(f(A)))\subseteq f(A)$ は、$f^{-1}(f(A))$ の各元の像が $f(A)$ にあることから従う。従って

$$
f(f^{-1}(f(A)))=f(A).
$$

第二の式についても両包含を確認する。$f(f^{-1}(B))\subseteq B$ の逆像を取ると

$$
f^{-1}(f(f^{-1}(B)))\subseteq f^{-1}(B)
$$

を得る。逆向きには $x\in f^{-1}(B)$ を任意に取ると、$f(x)\in B$ であり、$f(x)$ は $f^{-1}(B)$ の元 $x$ の像でもある。従って

$$
x\in f^{-1}(B)
\ \Longrightarrow\ f(x)\in f(f^{-1}(B))
\ \Longrightarrow\ x\in f^{-1}(f(f^{-1}(B)))
$$

となる。これで逆向きの包含も成立し、

$$
f^{-1}(f(f^{-1}(B)))=f^{-1}(B).
$$

順序圏では同じ始域・終域の射が一本しかない。両等式により、$L(\eta_A)$ の後に $\varepsilon_{L(A)}$ を、$\eta_{R(B)}$ の後に $R(\varepsilon_B)$ を合成した射はそれぞれ恒等射である。

**（3）同型性の条件。** 包含順序の圏で同型射とは両向きの包含、すなわち集合の等号である。$f$ が単射なら $f^{-1}(f(A))=A$ が任意の $A$ で成立する。逆に単射でなければ異なる $x,x'\in X$ で $f(x)=f(x')$ があり、$A=\{x\}$ とすると $x'\in f^{-1}(f(A))\setminus A$。従って全成分 $\eta_A$ が同型であることと $f$ の単射性は同値。

また $f$ が全射なら任意の $B$ の各 $y\in B$ は $f(x)=y$ と書けるため $f(f^{-1}(B))=B$。逆に全射でなければ $y\in Y\setminus f(X)$ があり、$B=\{y\}$ で $f(f^{-1}(B))=\varnothing\ne B$。従って全成分 $\varepsilon_B$ が同型であることと $f$ の全射性が同値。

**（4）有限集合の確認。** $f(A)=\{0\}$、$f^{-1}(\{0\})=\{a,b\}$ だから、単位 $\{a\}\subsetneq\{a,b\}$ は同型でない。他方 $f^{-1}(\{1\})=\varnothing$、$f(\varnothing)=\varnothing$ だから、余単位 $\varnothing\subsetneq\{1\}$ も同型でない。いずれも三角恒等式の成立とは矛盾しない。$\square$
<!-- solution-end -->

## 8. 次講への準備

Hom集合の自然な全単射と、単位・余単位の自然変換＋三角恒等式は、同じ随伴を二通りに記述する。次の **CAT2-10「普遍射とcomma圏」** では、単位の各成分を「$c$ から $G$ を通じた対象への普遍的な射」として見直し、随伴の存在を対象ごとの普遍性から判定する。
