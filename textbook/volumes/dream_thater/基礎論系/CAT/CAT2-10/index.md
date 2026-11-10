# CAT2-10 普遍射とcomma圏

## 1. 随伴を「各対象から出る一つの射」で見つける

[Hom集合による随伴](../CAT2-08/index.md#def-cat2-08-adjunction)は、すべての対象 $c,d$ について、二変数自然な全単射を要求した。[前講の単位](../CAT2-09/index.md#def-cat2-09-unit) $\eta_c:c\to GFc$ は、その大量の対応のうち、恒等射 $1_{Fc}$ に対応する一つの射だった。

ここで問いを逆にする。ある関手 $G:\mathcal D\to\mathcal C$ と対象 $c\in\mathcal C$ に対し、$c\to Gd$ という射を**すべて**集め、その一つ $\eta_c:c\to GFc$ から、ほかのすべてがただ一通りに得られるとしたらどうか。これは、$c$ について最も自由な $G$ の像への入口を選んだことになる。

最小例は集合における自由モノイドである。[自由語の随伴](../CAT2-08/index.md#thm-cat2-08-free-monoid)では、集合 $X$ から文字を一文字語にする $\iota_X:X\to UW(X)$ を作った。任意のモノイド $M$ と集合写像 $f:X\to UM$ は、一意な準同型 $h:W(X)\to M$ を使って

$$
f=U(h)\circ\iota_X
$$

と書けた。この一意な分解こそ、本講の主役である。どの射を比較するかを圏にまとめると、始対象という既習の言葉で表せる。

以下、$\mathcal C,\mathcal D$ などは圏とし、随伴に関するHom全単射を扱うときは局所小圏を仮定する。[局所小圏](../CAT1-02/index.md#def-cat1-02-size)では各Homは集合であるが、対象全体が集合とは限らない。射の合成は右から左、$GF=G\circ F$ と読む。

## 2. comma圏：可換な四角形を射にする

[スライス圏・coslice圏](../CAT1-05/index.md#def-cat1-05-slice)では、固定した対象へ向かう射、あるいはそこから出る射を新しい対象にした。しかし自由モノイドの例では、終域は $UM$ という**関手の像**である。そこで二つの関手を挟んだ矢印を集める。

$T:\mathcal A\to\mathcal C$ と $S:\mathcal B\to\mathcal C$ を関手とする。$Ta\to Sb$ を選ぶたびに、組 $(a,b)$ が変わる。二組 $(a,b,f)$ と $(a',b',f')$ の間で $u:a\to a'$、$v:b\to b'$ を選ぶなら、$Ta\to Sb'$ の二つの経路が一致する必要がある。

<a id="def-cat2-10-comma"></a>

<!-- formal-statement-start -->
> **定義（comma圏）**  
> 圏 $\mathcal A,\mathcal B,\mathcal C$ と関手 $T:\mathcal A\to\mathcal C$、$S:\mathcal B\to\mathcal C$ に対し、**comma圏** $(T\downarrow S)$ を次のように定める。
>
> - 対象は三つ組 $(a,b,f)$。ここで $a\in\mathcal A$、$b\in\mathcal B$、$f:Ta\to Sb$ は $\mathcal C$ の射である。
> - $(a,b,f)$ から $(a',b',f')$ への射は組 $(u,v)$。ここで $u:a\to a'$、$v:b\to b'$ はそれぞれ $\mathcal A,\mathcal B$ の射で、

$$
S(v)\circ f=f'\circ T(u)
$$

> を満たす。
> - 恒等射は $(1_a,1_b)$、合成は $(u',v')\circ(u,v)=(u'u,v'v)$ とする。
<!-- formal-statement-end -->

この等式の左辺と右辺はともに $Ta\to Sb'$ である。特に $T$ と $S$ の**順序を入れ替えると一般には別の圏**になる。

<!-- definition-example-start: def-cat2-10-comma -->
**定義の確認**（恒等関手の例）。$\mathcal A$ を一対象一恒等射の圏とし、$T:\mathcal A\to\mathbf{Set}$ がその対象を $X=\{0\}$ に送るとする。$S=1_{\mathbf{Set}}$ とすれば、$(T\downarrow S)$ の対象は $(\ast,Y,f:X\to Y)$ である。たとえば $f(0)=a\in Y$、$f'(0)=b\in Y'$ とすると、射は $(1_\ast,v)$ であり、条件は $v(a)=b$ に帰着する。$v$ が $Y$ の残りの元をどう送るかは自由である。恒等射は $1_Y(a)=a$ を満たす。
<!-- definition-example-end -->

<a id="prop-cat2-10-comma-axioms"></a>

<!-- formal-statement-start -->
> **命題（comma圏の公理と局所小性）**  
> 上の $T,S$ による $(T\downarrow S)$ は圏である。さらに $\mathcal A,\mathcal B$ が局所小圏なら、$\mathcal C$ の局所小性を追加仮定しなくても $(T\downarrow S)$ は局所小圏である。
<!-- formal-statement-end -->

### 証明の見取り図

可換条件を二段につなぐと、中央の $S(v)$ と $T(u')$ を関手性でまとめられる。Hom集合は二つのHom集合の直積の部分集合である。

<!-- proof-start -->
### 証明

$(u,v):(a,b,f)\to(a',b',f')$ と $(u',v'):(a',b',f')\to(a'',b'',f'')$ について、可換条件と関手性から

$$
\begin{aligned}
S(v'v)f
&=S(v')S(v)f\\
&=S(v')f'T(u)\\
&=f''T(u')T(u)\\
&=f''T(u'u).
\end{aligned}
$$

従って $(u'u,v'v)$ は確かに射である。恒等射については

$$
S(1_b)f=1_{Sb}f=f1_{Ta}=fT(1_a).
$$

三つの連続する射の合成は $\mathcal A$ と $\mathcal B$ でそれぞれ結合的だから、組の合成も結合的である。両側の恒等律も成分ごとの恒等律による。

固定した二対象 $p=(a,b,f)$、$q=(a',b',f')$ の間の射の集合は

$$
\{(u,v)\in\operatorname{Hom}_{\mathcal A}(a,a')
\times\operatorname{Hom}_{\mathcal B}(b,b')\mid S(v)f=f'T(u)\}
$$

であり、局所小性から集合の部分集合である。対象全体が小さいとは主張していない。$\square$
<!-- proof-end -->

## 3. $c\downarrow G$ の始対象が普遍射になる

$c\in\mathcal C$ を固定し、$T$ を一対象圏から $c$ への定数関手、$S=G:\mathcal D\to\mathcal C$ とする。この特別なcomma圏を $(c\downarrow G)$ と記す。その対象は $(d,f:c\to Gd)$、射 $(d,f)\to(d',f')$ は $h:d\to d'$ で

$$
G(h)\circ f=f'
$$

を満たすものに等しい。つまり $c$ から見えるすべての $G$ の像への矢印を並べた圏である。

<a id="def-cat2-10-universal-to"></a>

<!-- formal-statement-start -->
> **定義（Gへの普遍射）**  
> 関手 $G:\mathcal D\to\mathcal C$ と対象 $c\in\mathcal C$ に対し、対象 $u\in\mathcal D$ と射 $\eta:c\to Gu$ の組 $(u,\eta)$ が **$c$ から $G$ への普遍射**であるとは、任意の $d\in\mathcal D$ と射 $f:c\to Gd$ に対して、ただ一つの $h:u\to d$ が存在し

$$
G(h)\circ\eta=f
$$

> を満たすことをいう。
<!-- formal-statement-end -->

これは [共変普遍元](../CAT1-10/index.md#def-cat1-10-cov-universal)の具体形でもある。すなわち $d\mapsto\operatorname{Hom}_{\mathcal C}(c,Gd)$ は $\mathcal D$ 上の共変集合値関手で、元 $\eta$ がすべての $f$ を一意に生む。次の例では定義の各条件を直接確認する。

<!-- definition-example-start: def-cat2-10-universal-to -->
**定義の確認**（自由語）。[自由モノイド](../CAT2-08/index.md#thm-cat2-08-free-monoid)の忘却関手 $U:\mathbf{Mon}\to\mathbf{Set}$、集合 $X=\{a,b\}$、有限語のモノイド $W(X)$ と一文字挿入 $\iota_X:X\to U(W(X))$ を取る。モノイド $M$ と $f:X\to UM$ を任意に選び、$f(a)=m_a,f(b)=m_b$ と書く。候補 $h:W(X)\to M$ は

$$
h((x_1,\ldots,x_n))=f(x_1)\cdots f(x_n),
\qquad h(\text{空語})=e_M
$$

と置ける。連結の評価は積の結合律で保たれ、$h((x))=f(x)$。任意の準同型 $k$ が $Uk\,\iota_X=f$ を満たすなら、連結表示と準同型性から $k((x_1,\ldots,x_n))=\prod_i f(x_i)=h((x_1,\ldots,x_n))$、空語でも $k(\text{空語})=e_M=h(\text{空語})$ となる。したがって存在と一意性があり、$(W(X),\iota_X)$ は普遍射である。
<!-- definition-example-end -->

双対も先に区別しよう。今度は $F:\mathcal C\to\mathcal D$ と $d\in\mathcal D$ を固定したcomma圏 $(F\downarrow d)$ を考える。対象は $(c,f:Fc\to d)$、射 $(c,f)\to(c',f')$ は $h:c\to c'$ で $f=f'F(h)$ を満たす。ここでは**終対象**を選ぶ。

<a id="def-cat2-10-universal-from"></a>

<!-- formal-statement-start -->
> **定義（Fからの普遍射）**  
> 関手 $F:\mathcal C\to\mathcal D$ と対象 $d\in\mathcal D$ に対し、対象 $u\in\mathcal C$ と射 $\varepsilon:Fu\to d$ の組 $(u,\varepsilon)$ が **$F$ から $d$ への普遍射**であるとは、任意の $c\in\mathcal C$ と射 $f:Fc\to d$ に対して、ただ一つの $h:c\to u$ が存在し

$$
\varepsilon\circ F(h)=f
$$

> を満たすことをいう。
<!-- formal-statement-end -->

<!-- definition-example-start: def-cat2-10-universal-from -->
**定義の確認**（恒等関手）。$F=1_{\mathbf{Set}}$、$d=\{0,1\}$、$u=d$、$\varepsilon=1_d$ とする。任意の集合 $c$ と写像 $f:c\to d$ には $h=f:c\to u$ を選べる。$1_dh=f$ を満たす別の $h'$ は $h'=f$ でなければならない。空集合を含め、任意の $c$ について存在・一意性が成立する。
<!-- definition-example-end -->

<a id="prop-cat2-10-initial-terminal"></a>

<!-- formal-statement-start -->
> **命題（普遍射とcomma圏の始対象・終対象）**  
> 関手 $G:\mathcal D\to\mathcal C$ と対象 $c$ に対し、$(u,\eta:c\to Gu)$ が $G$ への普遍射であることと、$(u,\eta)$ が $(c\downarrow G)$ の始対象であることは同値である。  
> 関手 $F:\mathcal C\to\mathcal D$ と対象 $d$ に対し、$(u,\varepsilon:Fu\to d)$ が $F$ からの普遍射であることと、$(u,\varepsilon)$ が $(F\downarrow d)$ の終対象であることは同値である。
<!-- formal-statement-end -->

### 証明の見取り図

[始対象・終対象の定義](../CAT1-04/index.md#def-cat1-04-initial-terminal)を、今定義したcomma圏に適用する。どちらも「一意なcomma圏の射」を書き下すだけだが、その向きが逆である。

<!-- proof-start -->
### 証明

$(c\downarrow G)$ で $(u,\eta)$ から任意の $(d,f)$ への射は、定義により $h:u\to d$ で $Gh\,\eta=f$ を満たすものそのものである。それが各 $(d,f)$ にただ一つ存在することは、[始対象の定義](../CAT1-04/index.md#def-cat1-04-initial-terminal)にも[普遍射の定義](#def-cat2-10-universal-to)にも一致する。

同様に $(F\downarrow d)$ で任意の $(c,f)$ から $(u,\varepsilon)$ への射は $h:c\to u$ で $f=\varepsilon Fh$ を満たすものそのものである。これが一意に存在することは終対象の条件であり、[双対の普遍射の定義](#def-cat2-10-universal-from)でもある。$\square$
<!-- proof-end -->

**注意（大きさ）。** $\mathcal D$ が大きいと $(c\downarrow G)$ の対象全体も大きい。それでも普遍射は定義できる。comma圏に始対象が存在すると**無条件に**仮定したり、対象全体を集合として列挙したりする必要はない。存在を証明するのが次節の目的である。

## 4. 一点ずつ選んだ普遍射から関手を組み立てる

普遍射が各対象 $c$ にあるだけでは、まだ左随伴**関手** $F$ は書かれていない。射 $u:c\to c'$ を $F(u):Fc\to Fc'$ へどう送るのかが重要である。

選んだ普遍射を $\eta_c:c\to GFc$ と書く。$c$ から $GFc'$ への射 $\eta_{c'}u$ に、$c$ の普遍性を使えば、一意な $F(u):Fc\to Fc'$ が生まれる。これは後で単位の自然性にもなる式である。

<a id="thm-cat2-10-left-adjoint"></a>

<!-- formal-statement-start -->
> **定理（対象ごとの普遍射と左随伴）**  
> $\mathcal C,\mathcal D$ を局所小圏、$G:\mathcal D\to\mathcal C$ を関手とする。次の二つは同値である。
>
> 1. $G$ に左随伴 $F:\mathcal C\to\mathcal D$ が存在する。
> 2. すべての $c\in\mathcal C$ に対して、$G$ への普遍射 $(Fc,\eta_c:c\to GFc)$ が**指定されている**。
>
> 2からは、射 $u:c\to c'$ に対し

$$
G(Fu)\circ\eta_c=\eta_{c'}\circ u
$$

> を満たす一意な射 $Fu:Fc\to Fc'$ を定めることで関手 $F$ が得られる。この $F$ について

$$
\Phi_{c,d}(h)=G(h)\circ\eta_c:
\operatorname{Hom}_{\mathcal D}(Fc,d)
\xrightarrow{\ \cong\ }
\operatorname{Hom}_{\mathcal C}(c,Gd)
$$

> は $c,d$ の双方に自然な全単射であり、$F\dashv G$ となる。
<!-- formal-statement-end -->

ここで「指定されている」と書いたのは、対象が真の類を成す場合に、対象ごとの存在から**一斉に選ぶ操作**を無条件に行わないためである。両圏が小さい場合には通常の選択公理のもとで指定できる。選んだあとの構成は普遍性によって一意に決まる。

### 証明の見取り図

射への作用 $Fu$ は普遍性で一意に指定する。恒等射・合成・単位の自然性をそれぞれ同じ一意性で証明し、最後に $h\mapsto Gh\,\eta_c$ の逆を普遍射の定義から得る。逆方向は、随伴の単位がこの一意分解を与える。

<!-- proof-start -->
### 証明

**2から1へ。** 各 $c$ について $(Fc,\eta_c)$ を選んだとする。射 $u:c\to c'$ について $\eta_{c'}u:c\to GFc'$ がある。[普遍射の定義](#def-cat2-10-universal-to)を $d=Fc'$、$f=\eta_{c'}u$ として適用すると、一意な $Fu:Fc\to Fc'$ が存在し、

$$
G(Fu)\eta_c=\eta_{c'}u
$$

を満たす。この構成条件によって $F$ の射への作用を定める。

恒等射 $1_c$ について、$G(1_{Fc})\eta_c=\eta_c=\eta_c1_c$ である。従って構成条件を満たす一意性から $F(1_c)=1_{Fc}$。

合成可能な $u:c\to c'$、$v:c'\to c''$ については、関手 $G$ の合成保存と同じ構成条件から

$$
\begin{aligned}
G(Fv\circ Fu)\eta_c
&=G(Fv)\,G(Fu)\eta_c\\
&=G(Fv)\eta_{c'}u\\
&=\eta_{c''}vu.
\end{aligned}
$$

$F(vu)$ も同じ式を満たすため、一意性から $F(vu)=F(v)F(u)$。よって $F$ は関手である。同時に構成条件が、各 $\eta_c$ が[自然変換](../CAT1-07/index.md#def-cat1-07-natural-transformation) $\eta:1_{\mathcal C}\Rightarrow GF$ をなすことを示している。

次に対象 $c,d$ を固定する。普遍性によって、各 $f:c\to Gd$ についてただ一つの $h:Fc\to d$ が $Gh\,\eta_c=f$ を満たす。この $h$ を $\Phi_{c,d}^{-1}(f)$ とすれば、$\Phi_{c,d}$ は全単射である。

二変数自然性も確認する。$u:c'\to c$、$h:Fc\to d$ のとき、

$$
\begin{aligned}
\Phi_{c',d}(hF(u))
&=G(h)G(Fu)\eta_{c'}\\
&=G(h)\eta_c u\\
&=\Phi_{c,d}(h)u.
\end{aligned}
$$

また $v:d\to d'$ について

$$
\begin{aligned}
\Phi_{c,d'}(vh)
&=G(vh)\eta_c\\
&=G(v)\,G(h)\eta_c\\
&=G(v)\Phi_{c,d}(h).
\end{aligned}
$$

したがって[随伴の定義](../CAT2-08/index.md#def-cat2-08-adjunction)により $F\dashv G$ である。

**1から2へ。** 既に $F\dashv G$ があれば、その[単位](../CAT2-09/index.md#def-cat2-09-unit)を $\eta_c:c\to GFc$ とする。任意の $f:c\to Gd$ に対し、[逆転置公式](../CAT2-09/index.md#prop-cat2-09-transpose)により $h=\Phi_{c,d}^{-1}(f):Fc\to d$ が存在し、$\Phi_{c,d}(h)=Gh\,\eta_c=f$。もし $h'$ も同じ条件を満たすなら $\Phi_{c,d}(h')=f$ なので全単射の単射性から $h'=h$。よって $(Fc,\eta_c)$ は普遍射である。$\square$
<!-- proof-end -->

同じ式 $G(Fu)\eta_c=\eta_{c'}u$ は、**関手 $F$ の構成**でも**単位の自然性**でもあった。普遍射は単なる存在する対象ではなく、変数 $c$ に沿って整合する構造を強制しているのである。

## 5. 終対象から右随伴を復元する

随伴 $F\dashv G$ の[余単位](../CAT2-09/index.md#def-cat2-09-counit)は $\varepsilon_d:FGd\to d$ である。これを任意の $f:Fc\to d$ の到着点にすれば、$f=\varepsilon_dF(h)$ となる一意な $h:c\to Gd$ を期待できる。これが第3節の**終対象版**だった。

<a id="thm-cat2-10-right-adjoint"></a>

<!-- formal-statement-start -->
> **定理（対象ごとの終普遍射と右随伴）**  
> $\mathcal C,\mathcal D$ を局所小圏、$F:\mathcal C\to\mathcal D$ を関手とする。$F$ に右随伴が存在することと、各 $d\in\mathcal D$ に対して $(F\downarrow d)$ の終対象 $(Gd,\varepsilon_d:FGd\to d)$ を**一斉に指定できること**は同値である。この選択から関手 $G:\mathcal D\to\mathcal C$ が得られ、各 $c,d$ の対応

$$
\Psi_{c,d}(h)=\varepsilon_d\circ F(h):
\operatorname{Hom}_{\mathcal C}(c,Gd)
\xrightarrow{\ \cong\ }
\operatorname{Hom}_{\mathcal D}(Fc,d)
$$

> は二変数自然な全単射である。
<!-- formal-statement-end -->

### 証明の見取り図

射 $v:d\to d'$ に対して、$v\varepsilon_d:FGd\to d'$ の一意な分解を使って $Gv:Gd\to Gd'$ を定める。可換式の向きが左随伴のときと違う点を確かめる。

<!-- proof-start -->
### 証明

各 $d$ で終対象 $(Gd,\varepsilon_d)$ を選ぶ。射 $v:d\to d'$ に対し $v\varepsilon_d:FGd\to d'$ がある。$d'$ における[終普遍射](#def-cat2-10-universal-from)を、$c=Gd$、$f=v\varepsilon_d$ に適用すると、ただ一つの $Gv:Gd\to Gd'$ が存在して

$$
\varepsilon_{d'}F(Gv)=v\varepsilon_d
$$

となる。$v=1_d$ とすれば $G(1_d)=1_{Gd}$。$v:d\to d'$、$w:d'\to d''$ なら

$$
\begin{aligned}
\varepsilon_{d''}F(Gw\circ Gv)
&=\varepsilon_{d''}F(Gw)F(Gv)\\
&=w\varepsilon_{d'}F(Gv)\\
&=wv\varepsilon_d,
\end{aligned}
$$

なので、$d''$ における一意性から $G(wv)=G(w)G(v)$。この構成条件は同時に $\varepsilon:FG\Rightarrow1_{\mathcal D}$ の自然性である。

任意の $f:Fc\to d$ に対して一意な $h:c\to Gd$ が $f=\varepsilon_dFh$ を満たすから、$\Psi$ は全単射である。$u:c'\to c$ について

$$
\Psi_{c',d}(hu)=\varepsilon_dF(h)F(u)=\Psi_{c,d}(h)F(u).
$$

$v:d\to d'$ については $\varepsilon$ の自然性の式を用いて

$$
\begin{aligned}
\Psi_{c,d'}(Gv\,h)
&=\varepsilon_{d'}F(Gv)F(h)\\
&=v\varepsilon_dF(h)=v\Psi_{c,d}(h).
\end{aligned}
$$

よって逆対応 $\Psi^{-1}$ は[随伴のHom全単射](../CAT2-08/index.md#def-cat2-08-adjunction)となり、$F\dashv G$。

逆向きには $F\dashv G$ の[余単位](../CAT2-09/index.md#def-cat2-09-counit)を用いる。[逆転置公式](../CAT2-09/index.md#prop-cat2-09-transpose)は各 $f:Fc\to d$ を $\varepsilon_dF(h)$ と一意に表し、$(Gd,\varepsilon_d)$ が終対象になる。$\square$
<!-- proof-end -->

<a id="prop-cat2-10-uniqueness"></a>

<!-- formal-statement-start -->
> **命題（普遍射の同型一意性）**  
> 同じ関手 $G:\mathcal D\to\mathcal C$、同じ対象 $c$ に対する二つの普遍射 $(u,\eta)$ と $(u',\eta')$ があれば、$G(a)\eta=\eta'$ を満たす同型 $a:u\to u'$ がただ一つ存在する。したがって、各 $c$ の普遍射の選択から作った二つの左随伴関手は自然同型で結ばれる。
<!-- formal-statement-end -->

### 証明の見取り図

二つの始対象から逆向きの射を作り、合成を一意性で恒等射と同定する。その射が $c$ に自然に動くことも普遍性で示す。

<!-- proof-start -->
### 証明

$(u,\eta)$ の普遍性を $f=\eta'$ へ適用して、ただ一つの $a:u\to u'$ を得る。同様に $(u',\eta')$ から $b:u'\to u$ を得て

$$
G(a)\eta=\eta',\qquad G(b)\eta'=\eta.
$$

すると $G(ba)\eta=G(b)\eta'=\eta=G(1_u)\eta$。$(u,\eta)$ の一意性から $ba=1_u$。同様に $ab=1_{u'}$ であり、$a$ は同型である。

各 $c$ で二つの選択を $(Fc,\eta_c)$、$(F'c,\eta'_c)$ と書き、上記の同型を $a_c:Fc\to F'c$ とする。$t:c\to c'$ について

$$
\begin{aligned}
G(F't\,a_c)\eta_c
&=G(F't)\eta'_c=\eta'_{c'}t,\\
G(a_{c'}\,Ft)\eta_c
&=G(a_{c'})\eta_{c'}t=\eta'_{c'}t.
\end{aligned}
$$

$(Fc,\eta_c)$ の一意性から $F't\,a_c=a_{c'}Ft$。従って $a:F\Rightarrow F'$ は自然同型である。$\square$
<!-- proof-end -->

## 6. 代数的な具体例を一から検証する

### 6.1 自由群：逆元の打消しを入れた語

[群の定義](../../../代数系/GRP/GRP1/index.md#def-grp1-group)では積・単位元・逆元が必要だった。自由モノイドの単語をそのまま群にすることはできない。たとえば一文字語 $(x)$ には連結に関する逆元がない。そこで文字 $x$ に形式的逆文字 $x^{-1}$ を加え、隣り合う $xx^{-1}$ と $x^{-1}x$ を空語と同一視する。

この同一視を積と両立させるには、ある二語を等しいとするとき、その左右へ別の語を連結しても等しいままでなければならない。まずこの条件を定義する。

<a id="def-cat2-10-congruence"></a>

<!-- formal-statement-start -->
> **定義（モノイド合同関係）**  
> モノイド $(M,\cdot,e)$ 上の同値関係 $\sim$ が**モノイド合同関係**であるとは、任意の $p,q,u,v\in M$ に対し

$$
p\sim q\ \Longrightarrow\ upv\sim uqv
$$

> が成立することをいう。
<!-- formal-statement-end -->

<!-- definition-example-start: def-cat2-10-congruence -->
**定義の確認**。非負整数の加法モノイド $(\mathbb N,+,0)$ に $a\sim b$ を $a-b$ が $3$ の倍数となることとして定める。同値関係の反射・対称・推移性は整数の等式から従う。また $a-b=3k$ なら $(u+a+v)-(u+b+v)=3k$ だから、左右への加算で関係が保たれる。この二条件を確認して初めてモノイド合同関係といえる。
<!-- definition-example-end -->

<a id="thm-cat2-10-free-group"></a>

<!-- formal-statement-start -->
> **定理（自由群の普遍射）**  
> 集合 $X$ に対し、記号集合 $X^+=\{x^+,x^-\mid x\in X\}$ 上の有限語のモノイド $W(X^+)$ を考える。各 $x$ について $x^+x^-$ と $x^-x^+$ を空語 $e$ と同一視する最小のモノイド合同関係 $\sim$ を取る。商集合

$$
L(X)=W(X^+)/{\sim}
$$

> は連結の誘導する積で群となる。写像 $j_X:X\to U(L(X))$ を $x\mapsto[x^+]$ とする。ただし $U:\mathbf{Grp}\to\mathbf{Set}$ は忘却関手とする。任意の群 $H$ と写像 $f:X\to UH$ に対し、ただ一つの群準同型 $\widehat f:L(X)\to H$ が存在し、

$$
U(\widehat f)\circ j_X=f
$$

> を満たす。従って $(L(X),j_X)$ は $X$ から $U$ への普遍射である。
<!-- formal-statement-end -->

### 証明の見取り図

自由群の語は、まず形式的逆記号を持つ自由**モノイド**の商として作る。どんな語 $w$ も、逆順にして各記号の正負を反転させた語 $\bar w$ を掛ければ空語に戻る。一方、群 $H$ へは正文字を $f(x)$、負文字を $f(x)^{-1}$ と読んで評価すればよい。

<!-- proof-start -->
### 証明

指定された二つの打消しを含む[モノイド合同関係](#def-cat2-10-congruence)は、すべてのそのような合同関係の共通部分で定まる。共通部分も合同関係なので、最小のものが存在する。

語の連結積はこの合同関係に関してwell-definedである。$p\sim p'$、$q\sim q'$ なら $pq\sim p'q\sim p'q'$ だから、$[p][q]=[pq]$ は代表元に依存しない。結合律と空語の単位律はモノイド $W(X^+)$ から降りる。

語 $w=t_1\cdots t_n$（各 $t_i$ は正または負の文字）に対し、正負を反転する操作を $t\mapsto t^{-1}$ と書き、

$$
\bar w=t_n^{-1}\cdots t_1^{-1}
$$

と置く。連結 $w\bar w$ の中央では $t_nt_n^{-1}\sim e$ が適用でき、残る語の中央でも順に打消しができる。$n$ 回の打消しにより $w\bar w\sim e$。$\bar ww\sim e$ も同じ議論で成り立つ。従って $[\bar w]$ は $[w]$ の両側逆元であり、$L(X)$ は群となる。

$H$ と $f:X\to UH$ を固定し、各記号へ

$$
\rho(x^+)=f(x),\qquad \rho(x^-)=f(x)^{-1}
$$

を割り当てる。語 $t_1\cdots t_n$ を $\rho(t_1)\cdots\rho(t_n)$ へ送り、空語を $e_H$ へ送る評価写像 $E:W(X^+)\to H$ は連結を積へ送る。さらに

$$
E(x^+x^-)=f(x)f(x)^{-1}=e_H,
\qquad E(x^-x^+)=e_H.
$$

核関係 $p\equiv_E q\Leftrightarrow E(p)=E(q)$ はモノイド合同関係で、指定された打消しを含む。最小性から $\sim$ は $\equiv_E$ に含まれる。従って $[w]\mapsto E(w)$ はwell-definedな群準同型 $\widehat f:L(X)\to H$ であり、$\widehat f([x^+])=f(x)$。

別の群準同型 $k$ が $k([x^+])=f(x)$ を満たすなら、逆元を保つから $k([x^-])=f(x)^{-1}$。任意の $[w]=[t_1]\cdots[t_n]$ で準同型性から $k([w])=\rho(t_1)\cdots\rho(t_n)=\widehat f([w])$、空語にも一致する。存在・一意性が証明された。$\square$
<!-- proof-end -->

**語を具体的に追う。** $X=\{x,y\}$ で $[x^+y^+x^-]$ は一般には $[y^+]$ と同じではない。$H=S_3$ として $f(x)=(12)$、$f(y)=(23)$ と置けば、置換の合成を右から左へ読んで

$$
\widehat f([x^+y^+x^-])
=(12)(23)(12)=(13),
\qquad
\widehat f([y^+])=(23).
$$

一方、$[x^+x^-y^+]=[y^+]$ は打消し関係から直接従う。群が一般に非可換であることと、隣接する逆元の打消しを混同しないことが重要である。

集合写像 $u:X\to Y$ に対して $j_Yu:X\to UL(Y)$ は一意の群準同型 $L(u):L(X)\to L(Y)$ を誘導する。第4節の構成により $L$ は関手で、$L\dashv U$ である。自由群の構成に任意の正規形定理を先取りする必要はない。

### 6.2 自由加群：有限台の係数を延長する

単位元を持つ（非可換でもよい）環 $R$ を固定し、左 $R$-加群の圏を $R\text{-}\mathbf{Mod}$ と書く。[自由加群の基底](../../../代数系/MOD/MOD1/index.md#def-mod1-free-module-basis)を持つ対象は、集合から左加群を作る典型例である。

<a id="prop-cat2-10-free-module"></a>

<!-- formal-statement-start -->
> **命題（自由加群の普遍射）**  
> 単位的環 $R$、集合 $X$ に対し、有限個を除き $0$ である写像 $a:X\to R$ 全体を $R^{(X)}$ とし、点ごとの加法・左スカラー倍で左 $R$-加群とする。$\delta_x$ は $x$ で $1_R$、他の点で $0$ を取る元とする。忘却関手 $U_R:R\text{-}\mathbf{Mod}\to\mathbf{Set}$ に対し、

$$
j_X:X\to U_R(R^{(X)}),\qquad x\longmapsto\delta_x
$$

> は $X$ から $U_R$ への普遍射である。従って $X\mapsto R^{(X)}$ は $U_R$ の左随伴になる。
<!-- formal-statement-end -->

### 証明の見取り図

各有限台の元は $\sum_x a_x\delta_x$ と一意に書ける。[自由加群の普遍性](../../../代数系/MOD/MOD1/index.md#thm-mod1-free-universal-property)を適用する前に、この具体的な基底表示と、写像を延長する公式を確認する。

<!-- proof-start -->
### 証明

$R^{(X)}$ の有限台は加法で有限和の合併に収まり、スカラー倍でも有限台のままなので、点ごとの加法と左 $R$ 作用で左加群をなす。各 $a\in R^{(X)}$ について、台 $S=\{x\mid a_x\ne0\}$ は有限であり、

$$
a=\sum_{x\in S}a_x\delta_x.
$$

係数を $x$ で評価すれば $a_x$ は一意に復元できるから、$(\delta_x)_{x\in X}$ は基底である。

任意の左 $R$-加群 $M$ と集合写像 $f:X\to UM$ を固定する。延長写像を

$$
\widehat f(a)=\sum_{x\in S}a_x f(x)
$$

と定める。有限和なので収束条件は要らない。$a,b$ の台の合併 $S'$ を取れば

$$
\widehat f(a+b)
=\sum_{x\in S'}(a_x+b_x)f(x)
=\widehat f(a)+\widehat f(b).
$$

また $r\in R$ に対し

$$
\widehat f(ra)
=\sum_x(ra_x)f(x)
=r\sum_xa_xf(x)
=r\widehat f(a)
$$

（和は有限台で取る）。従って $\widehat f$ は左 $R$-加群準同型で、$\widehat f(\delta_x)=1_Rf(x)=f(x)$。

別の準同型 $k$ が各 $\delta_x$ を $f(x)$ へ送るなら、任意の $a=\sum_xa_x\delta_x$ に対し

$$
k(a)=\sum_xa_xk(\delta_x)=\sum_xa_xf(x)=\widehat f(a).
$$

従って一意性も成り立ち、定義から普遍射である。[対象ごとの普遍射と左随伴](#thm-cat2-10-left-adjoint)により左随伴が得られる。$\square$
<!-- proof-end -->

**直接計算。** $R=\mathbb Z$、$X=\{p,q\}$、$M=\mathbb Z$ とし $f(p)=2,f(q)=-1$ と置く。$a=3\delta_p-2\delta_q$ に対して $\widehat f(a)=3\cdot2-2\cdot(-1)=8$。$a$ の係数は $\delta_p,\delta_q$ に対して一意に定まるため、別の線形延長が値 $8$ を変えることはできない。

### 6.3 普遍射がない：有限集合への押し込み

存在を期待するだけでは随伴は得られない。$\mathbf{FinSet}$ を有限集合と写像の圏、$J:\mathbf{FinSet}\to\mathbf{Set}$ を包含関手とする。有限集合 $X$ なら $(X,1_X)$ は $X$ から $J$ への普遍射だが、無限集合では事情が違う。

<a id="prop-cat2-10-finset"></a>

<!-- formal-statement-start -->
> **命題（有限集合の包含関手の障害）**  
> $\mathbf{FinSet}$ から $\mathbf{Set}$ への包含 $J$ に左随伴は存在しない。実際、任意の無限集合 $X$ に対し、$(X\downarrow J)$ は始対象を持たない。
<!-- formal-statement-end -->

### 証明の見取り図

もし $(A,\eta:X\to JA)$ が普遍なら、終域として二元集合 $2=\{0,1\}$ を選ぶ。$A$ は有限なので $A\to2$ の写像は有限個だが、$X\to2$ の写像は無限個ある。

<!-- proof-start -->
### 証明

無限集合 $X$ に普遍射 $(A,\eta:X\to JA)$ があると仮定する。$A$ は有限である。[普遍射の定義](#def-cat2-10-universal-to)により

$$
\operatorname{Hom}_{\mathbf{FinSet}}(A,2)
\longrightarrow\operatorname{Hom}_{\mathbf{Set}}(X,2),
\qquad h\longmapsto J(h)\eta
$$

は全単射となる。$|A|=n<\infty$ とすれば左辺の濃度は $2^n$ で有限。一方、$X$ の互いに異なる元 $x$ ごとに、その点だけを $1$、ほかを $0$ へ送る写像があり、右辺は無限集合である。従って全単射は存在しない。任意の無限 $X$ について普遍射がないから、[対象ごとの普遍射と左随伴](#thm-cat2-10-left-adjoint)により $J$ は左随伴を持たない。$\square$
<!-- proof-end -->

この障害は「始対象を選べていない」だけではない。**始対象がそもそも存在しない**のである。次講の随伴関手定理では、極限保存だけでは不十分な場合に、普遍射候補を適切に絞る条件が重要になる。

## 7. 演習：矢印の向きと一意性を自分で再現する

### 問題1：comma圏の合成

- Level: A

関手 $T:\mathcal A\to\mathcal C$、$S:\mathcal B\to\mathcal C$ と、comma圏の対象 $(a_i,b_i,f_i)$（$i=0,1,2$）を取る。$(u_1,v_1):(a_0,b_0,f_0)\to(a_1,b_1,f_1)$、$(u_2,v_2):(a_1,b_1,f_1)\to(a_2,b_2,f_2)$ が射であるとき、$S(v_2v_1)f_0=f_2T(u_2u_1)$ を途中式を示して証明せよ。

<!-- solution-start -->
**詳細解答。** [comma圏の定義](#def-cat2-10-comma)により

$$
S(v_1)f_0=f_1T(u_1),\qquad S(v_2)f_1=f_2T(u_2).
$$

第一式へ $S(v_2)$ を左から合成して、第二式を代入すると

$$
\begin{aligned}
S(v_2v_1)f_0
&=S(v_2)S(v_1)f_0\\
&=S(v_2)f_1T(u_1)\\
&=f_2T(u_2)T(u_1)\\
&=f_2T(u_2u_1).
\end{aligned}
$$

第一・最終行にはそれぞれ $S,T$ の関手性を使った。両辺は $Ta_0\to Sb_2$ なので型も整合する。$\square$
<!-- solution-end -->

### 問題2：恒等関手への普遍射

- Level: A

$I=1_{\mathbf{Set}}$、$X=\{0,1\}$ とする。$(X\downarrow I)$ の対象 $(X,1_X)$ が始対象であることを、任意の対象 $(Y,f:X\to Y)$ への射を具体的に一つ作り、唯一性を確認して示せ。

<!-- solution-start -->
**詳細解答。** [comma圏の特殊化](#def-cat2-10-universal-to)により、$(X,1_X)$ から $(Y,f)$ への射は写像 $h:X\to Y$ で $I(h)1_X=f$、すなわち $h=f$ を満たすもの。$h=f$ と置けば存在する。別の $h'$ も条件を満たせば $h'=h'1_X=f=h$ だから一意である。$Y$ が空なら $X$ から $Y$ への写像自体がなく、$(Y,f)$ という対象は存在しないので問題にならない。よって始対象である。$\square$
<!-- solution-end -->

### 問題3：終対象の向き

- Level: A

$F=1_{\mathbf{Set}}$、$d=\{a,b\}$ とする。$(F\downarrow d)$ の対象 $(d,1_d)$ が終対象であることを示せ。さらに $(c,f)$ から $(d,1_d)$ への射の向きと、逆向きの射が一般に存在しない理由を説明せよ。

<!-- solution-start -->
**詳細解答。** 任意の $(c,f:c\to d)$ に対して、[終普遍射の定義](#def-cat2-10-universal-from)による射は $h:c\to d$ で $1_dF(h)=f$、すなわち $h=f$ のものだけである。したがって $(d,1_d)$ は終対象。逆向きの射があるには $k:d\to c$ が $f\circ k=1_d$ を満たす必要がある。例えば $c=\{*\}$ で $f(*)=a$ とすれば、$fk$ は $d$ の二元をともに $a$ へ送るため $1_d$ に等しくできない。終対象の条件は逆向きの射を要求しない。$\square$
<!-- solution-end -->

### 問題4：自由モノイドの媒介射

- Level: A

$X=\{a,b\}$、$W(X)$ を語のモノイド、$M=(\mathbb N,+,0)$ とし、$f:X\to UM$ を $f(a)=2$、$f(b)=3$ で定める。$h:W(X)\to M$ で $Uh\,\iota_X=f$ を満たす準同型を求め、語 $(a,b,a)$ と空語で値を計算し、一意性を説明せよ。

<!-- solution-start -->
**詳細解答。** [自由語の普遍射](#def-cat2-10-universal-to)から、語の連結を加法に移す候補は

$$
h((x_1,\ldots,x_n))=\sum_{i=1}^nf(x_i),
\qquad h(\text{空語})=0.
$$

連結語 $uv$ には和の結合律から $h(uv)=h(u)+h(v)$、空語には $0$ を割り当てるのでモノイド準同型である。$h((a,b,a))=2+3+2=7$、$h(\text{空語})=0$。別の準同型 $k$ も $k((a))=2,k((b))=3$ を満たすなら、各語は一文字語の連結だから準同型性により $k(w)$ は同じ和へ強制される。$\square$
<!-- solution-end -->

### 問題5：自由加群の係数と有限台

- Level: A

$R=\mathbb Z$、$X=\{p,q,r\}$、$M=\mathbb Z^2$ とし、$f(p)=(1,0)$、$f(q)=(0,2)$、$f(r)=(-1,1)$ とする。$\widehat f:\mathbb Z^{(X)}\to M$ を求め、$a=2\delta_p-3\delta_q+\delta_r$ の像を計算せよ。加法・スカラー倍が保たれる理由も述べよ。

<!-- solution-start -->
**詳細解答。** [自由加群の普遍射](#prop-cat2-10-free-module)では、有限台の元 $a=\sum_x a_x\delta_x$ に対して

$$
\widehat f(a)=\sum_x a_x f(x).
$$

よって $\widehat f(2\delta_p-3\delta_q+\delta_r)=2(1,0)-3(0,2)+(-1,1)=(1,-5)$。

係数表示は一意であり、$a+b$ の各係数は $a_x+b_x$、$na$ の各係数は $na_x$。従って

$$
\begin{aligned}
\widehat f(a+b)&=\sum_x(a_x+b_x)f(x)=\widehat f(a)+\widehat f(b),\\
\widehat f(na)&=\sum_x(na_x)f(x)=n\widehat f(a).
\end{aligned}
$$

有限台だから和は有限和であり、$\widehat f$ は準同型である。$\square$
<!-- solution-end -->

### 問題6：普遍射からの関手性

- Level: B

関手 $G:\mathcal D\to\mathcal C$ への普遍射 $(Fc,\eta_c)$ が各 $c$ で選ばれているとする。$Fu$ を $G(Fu)\eta_c=\eta_{c'}u$ で定めたとき、$F(1_c)=1_{Fc}$ と、$u:c\to c'$、$v:c'\to c''$ に対する $F(vu)=F(v)F(u)$ を、各回どの普遍射の一意性を使うか明示して証明せよ。

<!-- solution-start -->
**詳細解答。** $G(1_{Fc})\eta_c=\eta_c=\eta_c1_c$ なので、$c$ で選んだ[普遍射](#def-cat2-10-universal-to)の一意性から $F(1_c)=1_{Fc}$。$u,v$ について

$$
\begin{aligned}
G(Fv Fu)\eta_c
&=G(Fv)G(Fu)\eta_c\\
&=G(Fv)\eta_{c'}u\\
&=\eta_{c''}vu.
\end{aligned}
$$

一方、$F(vu)$ は定義上この同じ合成式を満たす。ここでも**始域 $c$ の普遍射** $(Fc,\eta_c)$ の一意性を使って $F(vu)=Fv Fu$ を得る。$c'$ の普遍性を最後に用いるのではない。$\square$
<!-- solution-end -->

### 問題7：終普遍射の自然性

- Level: B

関手 $F:\mathcal C\to\mathcal D$ に対し、各 $d$ で終普遍射 $(Gd,\varepsilon_d)$ が選ばれたとする。$v:d\to d'$ に対する $Gv$ が $\varepsilon_{d'}F(Gv)=v\varepsilon_d$ を満たすことから、$\varepsilon:FG\Rightarrow1_{\mathcal D}$ が自然変換であると示せ。$G(wv)=Gw\,Gv$ も証明せよ。

<!-- solution-start -->
**詳細解答。** $v\varepsilon_d:FGd\to d'$ に[終普遍射](#def-cat2-10-universal-from)を適用すると、$Gv:Gd\to Gd'$ がただ一つ得られ、

$$
\varepsilon_{d'}FG(v)=v\varepsilon_d.
$$

左辺・右辺はいずれも $FGd\to d'$ で、これは $FG$ と恒等関手の間の自然性の四角形そのものである。

$w:d'\to d''$ に対して

$$
\begin{aligned}
\varepsilon_{d''}F(GwGv)
&=\varepsilon_{d''}F(Gw)F(Gv)\\
&=w\varepsilon_{d'}F(Gv)\\
&=wv\varepsilon_d.
\end{aligned}
$$

$G(wv)$ もこの分解を満たすため、**終域 $d''$ の終普遍射**の一意性から $G(wv)=GwGv$。同じ理由で $G(1_d)=1_{Gd}$ だから $G$ は関手である。$\square$
<!-- solution-end -->

### 問題8：自由群の語と群準同型

- Level: B

$X=\{x,y\}$ の[自由群](#thm-cat2-10-free-group) $L(X)$ と $H=S_3$ を取り、$f(x)=(12)$、$f(y)=(23)$ とする。形式的な語 $w=x^+y^+x^-x^+y^-$ と $w'=x^+y^+y^-x^-$ について、商 $L(X)$ での簡約を行い、各語の延長準同型による像を求めよ。置換の積は右から左へ作用する。

<!-- solution-start -->
**詳細解答。** 商の打消しは隣接する互いに逆の記号に適用する。$w$ では中央の $x^-x^+$ を消し、

$$
[w]=[x^+y^+y^-]=[x^+].
$$

従って $\widehat f([w])=(12)$。$w'$ は $y^+y^-$ を消した後 $x^+x^-$ も消せるので $[w']=[e]$、$\widehat f([w'])=1_{S_3}$。評価側でも

$$
\begin{aligned}
\widehat f([w])&=(12)(23)(12)^{-1}(12)(23)^{-1}\\
&=(12)(23)(23)^{-1}=(12),\\
\widehat f([w'])&=(12)(23)(23)^{-1}(12)^{-1}=1_{S_3}.
\end{aligned}
$$

打消しで得た同値関係を評価が保つことは[自由群の普遍性の証明](#thm-cat2-10-free-group)で検証済みである。$\square$
<!-- solution-end -->

### 問題9：二つの選択の同型が自然である理由

- Level: B

同じ $G:\mathcal D\to\mathcal C$ に対して二組の普遍射の選択 $(Fc,\eta_c)$、$(F'c,\eta'_c)$ がある。$\eta'_c=G(a_c)\eta_c$ を満たす一意な $a_c:Fc\to F'c$ が同型であること、さらに $u:c\to c'$ に対して $F'u\,a_c=a_{c'}Fu$ を示せ。

<!-- solution-start -->
**詳細解答。** $a_c$ は $(Fc,\eta_c)$ の普遍性で一意に得られる。逆向きにも $(F'c,\eta'_c)$ から $b_c:F'c\to Fc$ が得られ、$G(b_c)\eta'_c=\eta_c$。すると $G(b_ca_c)\eta_c=\eta_c=G(1_{Fc})\eta_c$ なので一意性で $b_ca_c=1_{Fc}$。対称的に $a_cb_c=1_{F'c}$、従って同型。

次に

$$
\begin{aligned}
G(F'u\,a_c)\eta_c
&=G(F'u)\eta'_c=\eta'_{c'}u,\\
G(a_{c'}Fu)\eta_c
&=G(a_{c'})\eta_{c'}u=\eta'_{c'}u.
\end{aligned}
$$

**同じ始域 $Fc$ から $F'c'$ への二射**について、$(Fc,\eta_c)$ の一意性を使えば $F'u\,a_c=a_{c'}Fu$。これが自然同型の条件である。$\square$
<!-- solution-end -->

### 問題10：局所的な存在は随伴を保証しない

- Level: C

$\mathbf{FinSet}$ を有限集合の圏、$J:\mathbf{FinSet}\to\mathbf{Set}$ を包含関手とする。

1. 有限集合 $X$ では $(X,1_X)$ が $(X\downarrow J)$ の始対象であることを証明せよ。
2. 無限集合 $X$ に対し、$J$ への普遍射を仮定して二元集合 $2$ への写像の個数を比較し、矛盾を導け。
3. 「任意の有限集合で普遍射がある」という事実が $J$ の左随伴の存在を示さない理由を述べよ。

<!-- solution-start -->
**詳細解答。** (1) 有限集合 $X$ は $\mathbf{FinSet}$ の対象である。任意の有限集合 $A$ と写像 $f:X\to JA$ に対し、$h=f:X\to A$ は有限集合間の射で $Jh\,1_X=f$ を満たす。別の $h'$ もこの式を満たすなら $h'=f=h$ なので一意。よって $(X,1_X)$ は始対象。

(2) 無限集合 $X$ に普遍射 $(A,\eta:X\to JA)$ があると仮定する。$A$ は有限で $n=|A|$ と置ける。[普遍射の定義](#def-cat2-10-universal-to)を $d=2=\{0,1\}$ に適用すると

$$
\operatorname{Hom}_{\mathbf{FinSet}}(A,2)
\simeq\operatorname{Hom}_{\mathbf{Set}}(X,2).
$$

左辺は $A$ の各点へ $0,1$ の二択を与えるので $2^n$ 個。一方、右辺には無限集合 $X$ の各点 $x$ ごとに $\chi_{\{x\}}$ があり、これらはすべて異なる。従って右辺は無限で、有限集合との全単射はない。

(3) [左随伴の判定](#thm-cat2-10-left-adjoint)では、$\mathbf{Set}$ の**全対象** $X$ に対する普遍射の選択が必要である。有限集合に限った普遍射は、その全称条件を満たさない。無限集合では(2)の障害があるから $J$ に左随伴は存在しない。$\square$
<!-- solution-end -->

## 8. 次講への準備

普遍射の「存在と一意性」が揃えば、随伴のHom全単射と関手性まで回復できる。しかし任意の $G$ に対して各 $(c\downarrow G)$ の始対象が存在するわけではない。次の **CAT2-11「随伴の極限・余極限保存」** では、随伴が既に存在するとき、そのHom全単射からどの（余）極限が保存されるかを導く。その先の一般随伴関手定理では、始対象の存在をどう保証するかを扱う。
