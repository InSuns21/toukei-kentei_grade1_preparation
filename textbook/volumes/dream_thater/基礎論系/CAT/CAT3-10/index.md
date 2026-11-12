# CAT3-10 密度定理とKan拡張

## 1. どんな前層も表現可能な前層から作れるか

[Yoneda埋め込み](../CAT1-12/index.md#def-cat1-12-yoneda-embedding)によって、圏の対象 $a$ は、そこへ入る射を集めた前層 $h^a=\operatorname{Hom}_{\mathcal A}(-,a)$ として扱える。[反変Yonedaの補題](../CAT1-11/index.md#thm-cat1-11-contravariant-yoneda)によれば、前層 $P$ の元 $x\in P(a)$ は自然変換 $h^a\to P$ を一つ定める。

しかし $P$ 自身が表現可能とは限らない。たとえば離散二対象圏では、前層は任意の二つの集合 $(X,Y)$ であり、その片方が一元集合・もう片方が空集合である表現可能前層だけでは、両方に多数の元を持つ $(X,Y)$ を一つの表現可能前層として表せない。

そこで、一つずつの元に対応する $h^a\to P$ を全て集め、射に沿う重複を貼り合わせる。これが**密度定理**の考え方である。集合を元から組み立てる操作の、圏論版だと考えるとよい。

本講を通じて $\mathcal A$ は**小さい圏**とする。[集合値前層圏](../CAT1-12/index.md#def-cat1-12-presheaf)を
$$
\widehat{\mathcal A}=[\mathcal A^{\mathrm{op}},\mathbf{Set}]
$$
と書き、$y:\mathcal A\to\widehat{\mathcal A}$ をYoneda埋め込みとする。

各 $P(a)$ は集合であり、[前層圏の余極限](../CAT2-07/index.md#thm-cat2-07-pointwise-colimit)は対象ごとに計算できる。合成 $gf$ は $f$ の後に $g$ を行う。

## 2. 前層の元を対象とする圏

### 2.1 なぜ射に条件が要るのか

元 $x\in P(a)$ に付随する写像 $\iota_{a,x}:h^a\to P$ は、各 $c$ で射 $f:c\to a$ を $P(f)(x)$ に送る。射 $u:a\to b$ と $y\in P(b)$ があり $x=P(u)(y)$ なら、$h^a\xrightarrow{h^u}h^b\xrightarrow{\iota_{b,y}}P$ は $\iota_{a,x}$ に等しい。実際、$f:c\to a$ を代入すると
$$
(\iota_{b,y})_c(h^u_c(f))=P(uf)(y)
=P(f)(P(u)(y))=(\iota_{a,x})_c(f).
$$
このように貼り合わせるべき組 $(a,x)$ と、それらを結ぶ射 $u$ を新しい圏にまとめる。

<a id="def-cat3-10-elements"></a>

<!-- formal-statement-start -->
> **定義（前層の元の圏）**
> 小圏 $\mathcal A$ と集合値前層 $P:\mathcal A^{\mathrm{op}}\to\mathbf{Set}$ に対し、元の圏 $\int_{\mathcal A}P$ を次のように定める。
>
> - 対象は組 $(a,x)$、ただし $a\in\operatorname{Ob}\mathcal A$、$x\in P(a)$。
> - 射 $(a,x)\to(b,y)$ は $u:a\to b$ であって $P(u)(y)=x$ を満たすもの。
> - 恒等射・合成は $\mathcal A$ におけるものを用いる。
>
> 射影 $\pi:\int_{\mathcal A}P\to\mathcal A$ は $(a,x)\mapsto a$、$u\mapsto u$ とする。
<!-- formal-statement-end -->

<!-- definition-example-start: def-cat3-10-elements -->
**定義の確認**。$\mathcal A=\mathbf2$ を $0\xrightarrow{u}1$ の圏とし、$P(0)=\{p,q\}$、$P(1)=\{r\}$、$P(u)(r)=p$ とする。元の圏は $(0,p),(0,q),(1,r)$ の三対象を持ち、非恒等射は $(0,p)\xrightarrow{u}(1,r)$ の一本だけである。$(0,q)$ から $(1,r)$ への射は $P(u)(r)=p\ne q$ のため存在しない。恒等射では $P(1_a)(x)=x$、連続した射 $u:a\to b$、$v:b\to c$ に対して $P(vu)(z)=P(u)P(v)(z)=x$ となるので合成も閉じる。恒等律・結合律は元の圏から継承され、$\pi$ は恒等射・合成を保つ。
<!-- definition-example-end -->

$\mathcal A$ の対象と射の集合、各 $P(a)$ が集合なので、$\int P$ も小さい圏となる。ここで小ささを省くと、以下の「小さい余極限」の存在仮定を適用できなくなる。

### 2.2 表現可能前層を貼る図式

射 $u:(a,x)\to(b,y)$ には、射の後合成による自然変換 $h^u:h^a\to h^b$ が対応する。具体的に $(h^u)_c(f)=uf$ である。従って関手
$$
D_P:\int_{\mathcal A}P\longrightarrow\widehat{\mathcal A},
\qquad (a,x)\longmapsto h^a,\quad u\longmapsto h^u
$$
を得る。$(h^v)(h^u)=h^{vu}$、$h^{1_a}=1_{h^a}$ なので関手の公理も満たす。

<a id="def-cat3-10-canonical-cocone"></a>

<!-- formal-statement-start -->
> **定義（元に付随する標準余錐）**
> 上記の $D_P$ に対し、各 $(a,x)$ の射 $\iota_{a,x}:h^a\to P$ を
$$
> (\iota_{a,x})_c(f)=P(f)(x)\qquad(f:c\to a)
$$
> と定める。この射の族を標準余錐という。
<!-- formal-statement-end -->

<!-- definition-example-start: def-cat3-10-canonical-cocone -->
**定義の確認**。先ほどの矢印圏で $(0,p)\xrightarrow{u}(1,r)$ を取る。$h^0(0)=\{1_0\}$、$h^1(0)=\{u\}$ なので
$$
(\iota_{1,r})_0(h^u_0(1_0))
=(\iota_{1,r})_0(u)=P(u)(r)=p
=(\iota_{0,p})_0(1_0).
$$
対象 $1$ では $h^0(1)=\varnothing$ のため等式は空集合上の唯一の写像の等式になる。どの $c$ でも $f:c\to a$、$v:d\to c$ に対して $P(v)P(f)(x)=P(fv)(x)$ だから $\iota_{a,x}$ は自然変換であり、上の2.1節の計算は任意の $u$ に対する余錐条件 $\iota_{b,y}h^u=\iota_{a,x}$ を示す。
<!-- definition-example-end -->

## 3. 余極限から元の前層を復元する

各 $c$ で、余極限の代表元を $[(a,x),f]$ と書く。ここで $x\in P(a)$、$f:c\to a$ である。射 $u:(a,x)\to(b,y)$ は
$$
[(a,x),f]=[(b,y),uf]
\quad\text{ただし}\quad x=P(u)(y)
$$
という同一視を与える。これは[余等化子としての余極限](../CAT2-05/index.md#def-cat2-05-colimit)の具体的な商関係である。

<a id="thm-cat3-10-density"></a>

<!-- formal-statement-start -->
> **定理（Yonedaの密度定理）**
> $\mathcal A$ を小さい圏、$P:\mathcal A^{\mathrm{op}}\to\mathbf{Set}$ を前層とする。$D_P:\int_{\mathcal A}P\to\widehat{\mathcal A}$ は前節の関手、$\iota_{a,x}:h^a\to P$ は標準余錐である。この余錐は余極限余錐であり、自然な同型
$$
> \kappa_P:\operatorname*{colim}_{(a,x)\in\int_{\mathcal A}P}h^a\xrightarrow{\ \cong\ }P,
> \qquad
> \kappa_{P,c}([(a,x),f])=P(f)(x)
$$
> が存在する。同型は $P$ に関しても自然である。
<!-- formal-statement-end -->

### 証明の見取り図

商集合の各元を「前層の元 $x$ と射 $f$」から作る。$P(f)(x)$ へ送る写像と、$z\in P(c)$ を $[(c,z),1_c]$ へ戻す写像が互いに逆になることを示す。合成条件がちょうど商関係の整合性を保証する。

<!-- proof-start -->
### 証明

**1. 小さい余極限の存在。** $\int P$ は小さい圏である。前層圏では小さい余極限を対象ごとに作れるので、$L_P=\operatorname*{colim}D_P$ が存在する。各 $c$ で $L_P(c)$ は互いに異なる対象 $(a,x)$ にわたる $h^a(c)$ の直和集合を、上記の射 $u$ に伴う関係で割った集合となる。

**2. 写像とそのwell-defined性。** $[(a,x),f]\in L_P(c)$ に対して $\kappa_{P,c}([(a,x),f])=P(f)(x)$ と定める。生成関係 $x=P(u)(y)$ に対して
$$
P(f)(x)=P(f)P(u)(y)=P(uf)(y)
$$
なので、等しいと宣言した代表元の像は一致する。従って生成関係が作る同値関係全体でも像は一定であり、商集合上の写像が定まる。

**3. 明示的な逆写像。** $z\in P(c)$ に対し
$$
s_c(z)=[(c,z),1_c]\in L_P(c)
$$
と置く。まず $\kappa_{P,c}s_c(z)=P(1_c)(z)=z$。逆向きは、$f:c\to a$ と $x\in P(a)$ に対し $z=P(f)(x)$ と置くと、定義から $f:(c,z)\to(a,x)$ は $\int P$ の射である。従って余極限の関係により
$$
s_c\kappa_{P,c}([(a,x),f])
=[(c,P(f)(x)),1_c]=[(a,x),f].
$$
両側の合成が恒等写像なので $\kappa_{P,c}$ は全単射。

**4. 前層としての自然性。** $v:d\to c$ を取る。$L_P(v)$ は $[(a,x),f]$ を $[(a,x),fv]$ に送る。よって
$$
\kappa_{P,d}(L_P(v)([(a,x),f]))
=P(fv)(x)=P(v)P(f)(x)
=P(v)\kappa_{P,c}([(a,x),f]).
$$
全代表元について成り立つので $\kappa_P$ は前層の自然同型。

**5. $P$ に関する自然性。** 自然変換 $t:P\Rightarrow Q$ に対し、$J_t:\int P\to\int Q$ を $(a,x)\mapsto(a,t_a(x))$、射 $u\mapsto u$ と置ける。実際
$$
Q(u)(t_b(y))=t_a(P(u)(y))=t_a(x).
$$
これは図式間の比較を与え、余極限への誘導射 $L(t):L_P\to L_Q$ は $[(a,x),f]\mapsto[(a,t_a(x)),f]$。従って
$$
\kappa_{Q,c}L(t)_c([(a,x),f])
=Q(f)t_a(x)=t_cP(f)(x)
=t_c\kappa_{P,c}([(a,x),f]).
$$
よって $\kappa$ は $P$ に自然である。
<!-- proof-end -->

密度定理は「各前層が表現可能である」という主張ではない。**表現可能な前層の小さい余極限として表せる**という主張である。対象そのものを一つ選ぶのではなく、必要なすべての $h^a$ とそれらの間の関係を使う。

### 3.1 二対象の直接計算

$\mathcal A$ が対象 $p,q$ の離散圏なら、$P$ は二つの集合 $(X,Y)$、$h^p=(\{*\},\varnothing)$、$h^q=(\varnothing,\{*\})$ である。$\int P$ に非恒等射はなく、$X$ の各元は $h^p$ を、$Y$ の各元は $h^q$ を一つずつ提供する。対象ごとに余積を取ると
$$
\coprod_{x\in X}h^p\ \amalg\
\coprod_{y\in Y}h^q
\cong(X,Y).
$$
たとえば $X=\{s,t\}$、$Y=\{w\}$ なら、$p$ 成分に二つ、$q$ 成分に一つの元が残る。異なる添字に射がないため追加の同一視はない。

## 4. coend表示と「元による座標」

前講の[反変co-Yoneda公式](../CAT3-09/index.md#thm-cat3-09-contravariant-coyoneda)は、固定した $c$ に対し次を与える。ここでは第一因子 $P(a)$ は反変、第二因子 $\operatorname{Hom}(c,a)$ は共変である。

<a id="prop-cat3-10-coend-density"></a>

<!-- formal-statement-start -->
> **命題（密度定理のcoend表示）**
> 小圏 $\mathcal A$ の任意の前層 $P$ と $c\in\mathcal A$ に対し
$$
> \int^{a\in\mathcal A}P(a)\times\operatorname{Hom}_{\mathcal A}(c,a)
> \ \cong\ P(c)
$$
> が $c$ と $P$ に関して自然に成立する。左辺の商関係は、$u:a\to b$、$y\in P(b)$、$f:c\to a$ について
$$
> [P(u)(y),f]_a=[y,uf]_b
$$
> で生成される。
<!-- formal-statement-end -->

### 証明の見取り図

商の元と逆写像は密度定理と同じ。ただしここでは[coendの余等化子表示](../CAT3-09/index.md#prop-cat3-09-coend-coequalizer)の二本の射がちょうど上の関係を作ることを確認する。

<!-- proof-start -->
### 証明

二変数関手 $H(b,a)=P(b)\times\operatorname{Hom}(c,a)$ を取る。射 $u:a\to b$ に対して $H(b,a)$ の元 $(y,f)$ は、第一変数の作用で $(P(u)(y),f)\in H(a,a)$ に、第二変数の作用で $(y,uf)\in H(b,b)$ に送られる。従って前講の[coendの余等化子表示](../CAT3-09/index.md#prop-cat3-09-coend-coequalizer)は指定した商関係を与える。

写像 $[x,f]_a\mapsto P(f)(x)$ は $P(f)P(u)=P(uf)$ からwell-definedで、$z\mapsto[z,1_c]_c$ が逆である。逆向きの合成では $f:(c,P(f)(x))\to(a,x)$ に対応する生成関係を使う。$v:d\to c$ について $[x,f]_a\mapsto[x,fv]_a$ と $P(v)$ が可換で、$P$ の自然変換に対しても各 $x$ への作用と可換であることは[密度定理](#thm-cat3-10-density)の第4・5段の計算と一致する。
<!-- proof-end -->

coendは $P$ を「射と元の組」から再構築する公式である。一方、密度定理は**それらの集合を $c$ ごとに計算するだけでなく、前層全体を自然に余極限として復元する**点まで述べる。

## 5. Yoneda埋め込みに沿う左Kan拡張

ここでKan拡張と接続しよう。[左Kan拡張の普遍性](../CAT3-06/index.md#def-cat3-06-left-kan)は、$K:\mathcal A\to\mathcal B$ に沿って関手 $F:\mathcal A\to\mathcal C$ を $\mathcal B$ へ延長する最も普遍的な方法を定める。[点ごとの左Kan拡張](../CAT3-07/index.md#thm-cat3-07-pointwise)では、$b$ での値を $(K\downarrow b)$ 上の余極限から作った。

$K=y$ とすると、$(y\downarrow P)$ の対象は自然変換 $h^a\to P$ である。[Yonedaの補題](../CAT1-11/index.md#thm-cat1-11-contravariant-yoneda)でこれは元 $x\in P(a)$ に一意に対応する。さらに射 $h^a\xrightarrow{h^u}h^b$ が $P$ への写像と可換であることは $x=P(u)(y)$ と同値である。したがって
$$
(y\downarrow P)\cong\int_{\mathcal A}P
$$
であり、両方の圏は小さい。$\widehat{\mathcal A}$ 自体は一般に小さくないが、この特定のcomma圏の小ささは上記の構成で確保できる。

<a id="thm-cat3-10-yoneda-kan"></a>

<!-- formal-statement-start -->
> **定理（密度定理とYonedaに沿う左Kan拡張）**
> $\mathcal A$ が小さい圏なら、Yoneda埋め込み $y:\mathcal A\to\widehat{\mathcal A}$ に沿う $y$ の点ごとの左Kan拡張が存在し、自然同型
$$
> \operatorname{Lan}_{y}y\cong1_{\widehat{\mathcal A}}
$$
> が成り立つ。点 $P$ における同型は[密度定理](#thm-cat3-10-density)の $\kappa_P$ である。
> また $x\in P(a)$ に対応する自然変換 $\widehat{x}:h^a\to P$ の成分は、$f:c\to a$ に対し
>
$$
(\widehat{x})_c(f)=P(f)(x)
$$
>
> と定まる。
<!-- formal-statement-end -->

### 証明の見取り図

comma圏を元の圏へ置き換えると、Kan拡張の点ごとの余極限はまさに密度定理の左辺になる。どの自然変換がKan拡張の単位になるかも、元 $1_a\in h^a(a)$ から確認する。

<!-- proof-start -->
### 証明

まず各 $P$ で $(y\downarrow P)\cong\int P$ を具体的に確かめる。$h^a\to P$ はYonedaにより $x\in P(a)$ を指定し、$h^a\to h^b$ は[Yoneda埋め込みの充満忠実性](../CAT1-12/index.md#thm-cat1-12-full-faithful)で一意に $u:a\to b$ と書ける。三角形の可換条件
$$
\widehat{y}\,h^u=\widehat{x}
$$
を $a$ で $1_a$ に適用すると $P(u)(y)=x$ が得られる。逆にこの等式があれば、任意の $f:c\to a$ について $P(uf)(y)=P(f)(x)$ なので三角形は全成分で可換である。合成と恒等射も双方で同じ $u$ を使う。

従って点ごとのKan公式の図式は $D_P$ である。前層圏の小さい余極限が存在するので、$L_P=\operatorname*{colim}D_P$ を構成でき、射 $t:P\to Q$ の作用は[密度定理](#thm-cat3-10-density)の証明第5段の $L(t)$ と一致する。$\kappa_P:L_P\to P$ は $P$ に自然な同型だから $L\cong1_{\widehat{\mathcal A}}$ となる。

ここで $\widehat{\mathcal A}$ 自体は大きい圏であるため、[小圏間の点ごとのKan定理](../CAT3-07/index.md#thm-cat3-07-pointwise)の仮定をそのまま適用せず、**普遍性も直接証明する**。単位 $\eta_a:h^a\to L_{h^a}$ は $(a,1_a)$ の標準余錐射とする。$u:a\to b$ に対して $h^u:h^a\to h^b$ を考えると、$L(h^u)\eta_a$ と $\eta_b h^u$ はともに $(a,h^u)$ の標準余錐射であり、一致する。したがって $\eta:y\Rightarrow Ly$ は自然変換である。

任意の関手 $H:\widehat{\mathcal A}\to\widehat{\mathcal A}$ と自然変換 $\beta:y\Rightarrow Hy$ を取る。各 $P$ と $(a,x)\in\int P$ に対し
$$
q^P_{a,x}=H(\iota_{a,x})\,\beta_a:
h^a\longrightarrow H(P)
$$
と定める。$u:(a,x)\to(b,y)$ なら $\iota_{b,y}h^u=\iota_{a,x}$、かつ $\beta_b h^u=H(h^u)\beta_a$ だから
$$
q^P_{b,y}h^u
=H(\iota_{b,y})\beta_b h^u
=H(\iota_{b,y}h^u)\beta_a
=q^P_{a,x}.
$$
従って余錐であり、一意の $\theta_P:L_P\to H(P)$ が存在し
$$
\theta_Pj^P_{a,x}=H(\iota_{a,x})\beta_a
$$
を満たす（$j^P_{a,x}:h^a\to L_P$ は余極限の標準射）。$t:P\to Q$ の場合
$$
H(t)\theta_Pj^P_{a,x}
=H(t\iota_{a,x})\beta_a
=H(\iota_{a,t_a(x)})\beta_a
=\theta_QL(t)j^P_{a,x}
$$
だから、すべての標準余錐射との合成で両辺は一致する。[余極限の普遍性](../CAT2-05/index.md#def-cat2-05-colimit)による媒介射の一意性から $H(t)\theta_P=\theta_QL(t)$。よって $\theta:L\Rightarrow H$ は自然変換である。

$P=h^a$、$(a,1_a)$ に上式を適用すると、$\iota_{a,1_a}=1_{h^a}$ であり
$$
\theta_{h^a}\eta_a=H(1_{h^a})\beta_a=\beta_a.
$$
逆に $\theta'$ が同じ単位等式を満たすなら、各元 $x\in P(a)$ に対応する $\iota_{a,x}:h^a\to P$ に対し $L(\iota_{a,x})\eta_a=j^P_{a,x}$ なので
$$
\theta'_Pj^P_{a,x}
=\theta'_P L(\iota_{a,x})\eta_a
=H(\iota_{a,x})\theta'_{h^a}\eta_a
=H(\iota_{a,x})\beta_a.
$$
全ての余極限の脚で $\theta'$ と $\theta$ が一致するため $\theta'=\theta$。これは[左Kan拡張の定義](../CAT3-06/index.md#def-cat3-06-left-kan)そのものであり、一般に大きい $\widehat{\mathcal A}$ に対しても必要な普遍性が閉じた。

最後に $\kappa_{h^a}\eta_a$ の $c$ 成分は $f:c\to a$ を $h^a(f)(1_a)=f$ に送るので、密度同型は単位を $1_y$ に対応させる。
<!-- proof-end -->

### 5.1 任意の関手を表現可能前層から延長する

Kan拡張で延長する関手が $y$ そのものではなく $F:\mathcal A\to\mathcal C$ なら、同じ添字圏で $h^a$ の代わりに $F(a)$ を貼り合わせる。$\mathcal C$ が小さい余極限を持つ（余完備）と仮定する。

<a id="thm-cat3-10-free-extension"></a>

<!-- formal-statement-start -->
> **定理（Yonedaに沿う左Kan拡張の計算式）**
> $\mathcal A$ を小さい圏、$\mathcal C$ を局所小かつ余完備な圏、$F:\mathcal A\to\mathcal C$ を関手とする。このとき $\operatorname{Lan}_yF:\widehat{\mathcal A}\to\mathcal C$ が存在し、各前層 $P$ において
$$
> (\operatorname{Lan}_yF)(P)\cong
> \operatorname*{colim}_{(a,x)\in\int_{\mathcal A}P}F(a).
$$
> 自然変換 $t:P\to Q$ による作用は $(a,x)\mapsto(a,t_a(x))$ の誘導射で与えられる。
<!-- formal-statement-end -->

### 証明の見取り図

元の圏 $\int P$ は既に小さい。射影 $\pi:\int P\to\mathcal A$ と $F$ を合成し、$F\pi$ の余極限を取る。普遍性は[点ごとの左Kan拡張の定理](../CAT3-07/index.md#thm-cat3-07-pointwise)にそのまま適用できるが、単位と射の作用を明記する。

<!-- proof-start -->
### 証明

$\int P$ は小さく、$\mathcal C$ は余完備なので余極限 $M(P)=\operatorname*{colim}_{\int P}F\pi$ が存在する。$t:P\to Q$ に対する $J_t:\int P\to\int Q$ は[密度定理](#thm-cat3-10-density)の証明第5段の通り定義できる。$F\pi J_t=F\pi$ なので、$M(Q)$ の余錐を $\int P$ へ制限して、余極限の普遍性から一意の $M(t):M(P)\to M(Q)$ を得る。各 $F(a)$ からの標準射を $j_{a,x}^P$ とすると
$$
M(t)j_{a,x}^P=j_{a,t_a(x)}^Q.
$$
$t=1_P$ および $s:Q\to R$ に対して、両辺を全ての $j_{a,x}^P$ と合成して比較すると $M(1_P)=1_{M(P)}$、$M(st)=M(s)M(t)$ が従う。従って $M$ は関手である。

$\eta_a=j^{h^a}_{a,1_a}:F(a)\to M(h^a)$ と定める。$u:a\to b$ のとき、$(a,h^u)\to(b,1_b)$ が $\int h^b$ の射である。この射に関する余錐の可換性と $M(h^u)$ の構成から
$$
M(h^u)\eta_a=j^{h^b}_{a,h^u}
=j^{h^b}_{b,1_b}F(u)=\eta_bF(u)
$$
を得る。よって $\eta:F\Rightarrow My$ は自然変換である。

普遍性を省略せず確認する。任意の $H:\widehat{\mathcal A}\to\mathcal C$ と自然変換 $\beta:F\Rightarrow Hy$ を取る。各 $(a,x)\in\int P$ の射 $\iota_{a,x}:h^a\to P$ を使い
$$
q^P_{a,x}=H(\iota_{a,x})\beta_a:F(a)\to H(P)
$$
と置く。$u:(a,x)\to(b,y)$ について
$$
q^P_{b,y}F(u)
=H(\iota_{b,y})\beta_bF(u)
=H(\iota_{b,y})H(h^u)\beta_a
=H(\iota_{a,x})\beta_a
=q^P_{a,x}
$$
だから余錐になる。余極限から一意の $\theta_P:M(P)\to H(P)$ が存在し、$\theta_Pj^P_{a,x}=q^P_{a,x}$ を満たす。射 $t:P\to Q$ について
$$
H(t)\theta_Pj^P_{a,x}
=H(t\iota_{a,x})\beta_a
=H(\iota_{a,t_a(x)})\beta_a
=\theta_QM(t)j^P_{a,x}
$$
なので $\theta$ は自然変換である。$P=h^a$、$(a,1_a)$ を入れると $\theta_{h^a}\eta_a=\beta_a$。逆にこの条件を満たす $\theta'$ は $M(\iota_{a,x})\eta_a=j^P_{a,x}$ と自然性により
$$
\theta'_Pj^P_{a,x}
=\theta'_PM(\iota_{a,x})\eta_a
=H(\iota_{a,x})\theta'_{h^a}\eta_a
=q^P_{a,x}
$$
を満たす。余極限の普遍性から全 $P$ で $\theta'_P=\theta_P$。ゆえに $(M,\eta)$ は[左Kan拡張の定義](../CAT3-06/index.md#def-cat3-06-left-kan)を満たす。
<!-- proof-end -->

この定理の条件で必要なのは、値域 $\mathcal C$ に**小さい余極限**があることである。任意の大きい図式の余極限を仮定しているわけではない。

## 6. 密度定理の応用：余極限保存関手は生成元上で決まる

もし $H:\widehat{\mathcal A}\to\mathcal C$ が小さい余極限を保存するなら、[密度定理](#thm-cat3-10-density)で $P$ を表現可能前層の余極限として書いた後、$H$ を通しても余極限が保たれる。

<a id="prop-cat3-10-determination"></a>

<!-- formal-statement-start -->
> **命題（余極限保存関手の表現可能対象による決定）**
> $\mathcal A$ を小さい圏、$\mathcal C$ を局所小かつ余完備な圏とし、$H:\widehat{\mathcal A}\to\mathcal C$ が小さい余極限を保存するとする。このとき各前層 $P$ について、自然な同型
$$
> H(P)\cong\operatorname*{colim}_{(a,x)\in\int_{\mathcal A}P}H(h^a)
$$
> がある。さらに $H$ と別の小余極限保存関手 $G$ の間の自然変換は、$h^a$ 上の成分が与えられれば高々一つであり、$H\simeq\operatorname{Lan}_y(Hy)$ である。
<!-- formal-statement-end -->

### 証明の見取り図

元の圏の射に沿う余錐を $H$ で送ると、保存性から $H(P)$ を再び余極限として特徴付けられる。自然変換の成分は余極限への標準射との合成で一意に決まる。

<!-- proof-start -->
### 証明

[密度定理](#thm-cat3-10-density)は $P\cong\operatorname*{colim}_{\int P}h^a$ を与える。$H$ は小さい余極限を保存するため
$$
H(P)\cong H\!\left(\operatorname*{colim}_{\int P}h^a\right)
\cong\operatorname*{colim}_{\int P}H(h^a).
$$
各 $a,x$ の射 $H(\iota_{a,x}):H(h^a)\to H(P)$ がこの余極限余錐である。

自然変換 $\alpha:H\Rightarrow G$ が与えられたとき、自然性により
$$
\alpha_P\,H(\iota_{a,x})
=G(\iota_{a,x})\,\alpha_{h^a}
$$
である。左側の $H(\iota_{a,x})$ は余極限余錐であるから、右辺を全 $(a,x)$ について指定すれば $\alpha_P$ は高々一つに決まる（与えられた成分の任意の族が延長できるとは主張していない）。

最後に[左Kan拡張の計算式](#thm-cat3-10-free-extension)に $F=Hy$ を代入すると、右辺は上の余極限と同じである。構成が自然で単位とも両立するため $H\simeq\operatorname{Lan}_y(Hy)$。
<!-- proof-end -->

**反例で仮定を見る。** $\mathcal A$ を一対象の離散圏とすると $\widehat{\mathcal A}\cong\mathbf{Set}$、表現可能前層は一元集合 $1$ である。自己関手 $H(X)=X\times X$ と $G(X)=X$ は $H(1)\cong G(1)\cong1$ だが、$H(\{0,1\})$ は4元、$G(\{0,1\})$ は2元である。$H$ が二項余積を保存しないことは $H(1\amalg1)$ が4元、$H(1)\amalg H(1)$ が2元であることから分かる。したがって**生成元上の値からの復元**で余極限保存の仮定を外せない。一般に対象上の値だけでは、射上の作用も決まらない。

## 7. 演習：前層を構成し、Kan拡張に戻す

### 問題1：元の圏の射を数える

- Level: A
- 問題ID: CAT3-10-ELEMENTS-ARROW

$\mathcal A=\mathbf2$、$P(0)=\{p,q\}$、$P(1)=\{r,s\}$、$P(u)(r)=p$、$P(u)(s)=p$ とする。$\int P$ の対象と非恒等射を全て挙げ、$(0,q)$ が射の始点となれるか判定せよ。

<!-- solution-start -->
**詳細解答。** 対象は $(0,p),(0,q),(1,r),(1,s)$ の4個。非恒等射の候補は基底圏の $u:0\to1$ のみで、元の圏の[射の条件](#def-cat3-10-elements)は $P(u)(y)=x$ である。$y=r,s$ のどちらでも像は $p$ なので $(0,p)\xrightarrow{u}(1,r)$ と $(0,p)\xrightarrow{u}(1,s)$ の二本。$P(u)(r),P(u)(s)$ のいずれも $q$ ではないから $(0,q)$ からの非恒等射はない。各対象の恒等射は4本あり、他の非恒等射の合成は存在しない。
<!-- solution-end -->

### 問題2：余錐の自然性

- Level: A
- 問題ID: CAT3-10-COCONE-ARROW

問題1の圏で $\iota_{1,r}:h^1\to P$ と $\iota_{0,p}:h^0\to P$ を、対象 $0,1$ でそれぞれ計算し、$\iota_{1,r}h^u=\iota_{0,p}$ を確認せよ。

<!-- solution-start -->
**詳細解答。** $h^1(0)=\{u\}$、$h^1(1)=\{1_1\}$、$h^0(0)=\{1_0\}$、$h^0(1)=\varnothing$。定義から $(\iota_{1,r})_0(u)=P(u)(r)=p$、$(\iota_{1,r})_1(1_1)=r$、$(\iota_{0,p})_0(1_0)=p$。$h^u_0(1_0)=u$ なので $0$ 成分はどちらも $p$。$1$ 成分は空集合から $P(1)$ への唯一の写像で等しい。両成分が一致したため自然変換の等式が成立する。$s$ の場合にも $P(u)(s)=p$ により同じ余錐条件を得る。
<!-- solution-end -->

### 問題3：離散圏の密度

- Level: A
- 問題ID: CAT3-10-DISCRETE-GENERATORS

$\mathcal A$ は対象 $p,q$ の離散圏、$P(p)=\{a,b\}$、$P(q)=\{c\}$。表現可能前層 $h^p,h^q$ と $\int P$ を記述し、密度定理の余極限を各対象で計算せよ。

<!-- solution-start -->
**詳細解答。** 非恒等射がないため $h^p=(1,\varnothing)$、$h^q=(\varnothing,1)$。$\int P$ は $(p,a),(p,b),(q,c)$ だけを持つ離散三対象圏となる。余極限は $h^p\amalg h^p\amalg h^q$ で、$p$ 成分は二つの一元集合の直和 $\{a,b\}$、$q$ 成分は空集合二つと一元集合の直和 $\{c\}$。追加の同一視は生じず、各 $[(p,a),1_p]$、$[(p,b),1_p]$、$[(q,c),1_q]$ はそれぞれ $a,b,c$ へ送られる。
<!-- solution-end -->

### 問題4：逆写像の定義

- Level: A
- 問題ID: CAT3-10-INVERSE-QUOTIENT

小圏 $\mathcal A$、前層 $P$、$f:c\to a$、$x\in P(a)$ を取る。$z=P(f)(x)$ に対して $[(a,x),f]=[(c,z),1_c]$ を余極限の生成関係から証明し、$f$ を逆向きに置いてはいけない理由を述べよ。

<!-- solution-start -->
**詳細解答。** $z=P(f)(x)$ だから、元の圏の[定義](#def-cat3-10-elements)により $f:(c,z)\to(a,x)$ が射である。この射が余極限に誘導する同一視は $h^f_c(1_c)=f$ を用いて
$$
[(c,z),1_c]=[(a,x),h^f_c(1_c)]=[(a,x),f].
$$
$f$ は $c\to a$ である。$a\to c$ と誤って置けば $P(f)$ の向きは $P(c)\to P(a)$ となって $P(f)(x)$ を定義できない。反変性が逆向きの誤記を排除する。
<!-- solution-end -->

### 問題5：coendの商関係

- Level: A
- 問題ID: CAT3-10-COEND-RELATION

$\mathcal A=\mathbf2$、$c=0$、$P(0)=\{p,q\}$、$P(1)=\{r\}$、$P(u)(r)=p$ とする。$\int^a P(a)\times\operatorname{Hom}(0,a)$ の元と同一視を直接調べ、$P(0)$ との全単射を確認せよ。

<!-- solution-start -->
**詳細解答。** $a=0$ から $(p,1_0),(q,1_0)$、$a=1$ から $(r,u)$ の計3個が商前の元となる。$u:0\to1$ に関する[商関係](#prop-cat3-10-coend-density)は
$$
[P(u)(r),1_0]_0=[r,u1_0]_1,
\quad\text{すなわち}\quad [p,1_0]_0=[r,u]_1.
$$
$q$ を含む関係はないから二つの同値類が残る。評価写像は前者を $p$、$[q,1_0]$ を $q$ に送り全単射で、逆は $p\mapsto[p,1_0]$、$q\mapsto[q,1_0]$。
<!-- solution-end -->

### 問題6：自然変換と元の圏

- Level: B
- 問題ID: CAT3-10-TRANSFORMATION-ELEMENTS

$\mathcal A=\mathbf2$、$P(0)=\{p,q\}$、$P(1)=\{r\}$、$P(u)(r)=p$ とする。前層 $Q$ への自然変換 $t:P\to Q$ が、$z_p,z_q\in Q(0)$ と $z_r\in Q(1)$ で $z_p=Q(u)(z_r)$ を満たすものと一対一に対応することを証明せよ。

<!-- solution-start -->
**詳細解答。** 自然変換 $t$ が与えられれば $z_p=t_0(p)$、$z_q=t_0(q)$、$z_r=t_1(r)$ と置く。自然性
$$
t_0P(u)=Q(u)t_1
$$
を $r$ に適用すると $t_0(p)=Q(u)(t_1(r))$、すなわち指定条件。逆に指定された三元から $t_0(p)=z_p$、$t_0(q)=z_q$、$t_1(r)=z_r$ と定める。$P(u)$ の定義域は一元集合なので、指定条件が成り立てば $t_0P(u)=Q(u)t_1$ は全元で成立する。恒等射については自動的に可換である。二方向の構成は各元の像を変えないから互いに逆。これは[密度定理](#thm-cat3-10-density)の余極限からの射が各表現可能前層からの写像に対応する具体例でもある。
<!-- solution-end -->

### 問題7：左Kan拡張の二対象計算

- Level: B
- 問題ID: CAT3-10-LAN-DISCRETE

$\mathcal A$ は対象 $p,q$ の離散圏、$F(p)=S$、$F(q)=T$ は集合とする。前層 $P=(X,Y)$ における $(\operatorname{Lan}_yF)(P)$ を求め、前層射 $(u,v):(X,Y)\to(X',Y')$ の作用を明記せよ。

<!-- solution-start -->
**詳細解答。** $\int P$ は $X$ 個の $(p,x)$ と $Y$ 個の $(q,y)$ を持つ離散圏。よって[Yonedaに沿う左Kan拡張の計算式](#thm-cat3-10-free-extension)から
$$
(\operatorname{Lan}_yF)(X,Y)=
\left(\coprod_{x\in X}S\right)\amalg
\left(\coprod_{y\in Y}T\right).
$$
要素を左側で $(x,s)$、右側で $(y,t)$ とタグ付けすれば、射 $(u,v)$ による写像は $(x,s)\mapsto(u(x),s)$、$(y,t)\mapsto(v(y),t)$ である。恒等射ではタグが変わらず、続く射 $(u',v')$ との合成では $(x,s)\mapsto(u'u(x),s)$、$(y,t)\mapsto(v'v(y),t)$ となるので関手律を満たす。
<!-- solution-end -->

### 問題8：表現可能前層の元の圏

- Level: B
- 問題ID: CAT3-10-REPRESENTABLE-TERMINAL

小圏 $\mathcal A$ と $b\in\mathcal A$ に対し $P=h^b$ とする。$\int h^b$ に終対象があることを証明し、任意の $F:\mathcal A\to\mathcal C$ の $\operatorname{Lan}_yF$ について $(\operatorname{Lan}_yF)(h^b)\cong F(b)$ を示せ（必要な余極限の存在を仮定してよい）。

<!-- solution-start -->
**詳細解答。** $\int h^b$ の対象 $(a,f)$ は射 $f:a\to b$ を表す。$(b,1_b)$ に向かう射 $u$ の条件は
$$
h^b(u)(1_b)=1_bu=u=f.
$$
従って $u=f:a\to b$ が唯一の候補であり、実際に条件を満たす。よって $(b,1_b)$ は終対象である。

次に図式 $F\pi$ の余極限を直接検証する。各 $(a,f)$ に余錐射 $F(f):F(a)\to F(b)$ を与える。射 $u:(a,f)\to(a',f')$ は $f'u=f$ を満たすため
$$
F(f')F(u)=F(f'u)=F(f).
$$
任意の余錐 $q_{a,f}:F(a)\to Z$ が与えられたとき、媒介射は $q_{b,1_b}:F(b)\to Z$ に強制される。実際
$$
q_{a,f}=q_{b,1_b}F(f)
$$
が $(a,f)\to(b,1_b)$ の余錐条件である。この式が存在と一意性を同時に示すので、余極限は $F(b)$。[Yonedaに沿う左Kan拡張の計算式](#thm-cat3-10-free-extension)に代入して $(\operatorname{Lan}_yF)(h^b)\cong F(b)$ を得る。
<!-- solution-end -->

### 問題9：保存仮定の失敗

- Level: B
- 問題ID: CAT3-10-FAILURE-COPRODUCT

$\widehat{\mathcal A}=\mathbf{Set}$ において $H(X)=X\times X$ とする。$X=\{a\}$、$Y=\{b\}$ に対し、余積比較写像 $H(X)\amalg H(Y)\to H(X\amalg Y)$ を具体的に書き、なぜ同型でないか説明せよ。

<!-- solution-start -->
**詳細解答。** 左辺 $H(X)\amalg H(Y)$ は、$(a,a)$ と $(b,b)$ に由来するタグ付き2元集合である。一方、右辺は
$$
H(X\amalg Y)=\{(a,a),(a,b),(b,a),(b,b)\}
$$
という4元集合である。

比較射はそれぞれの包含 $X\hookrightarrow X\amalg Y$ と $Y\hookrightarrow X\amalg Y$ に $H$ を適用して生じる。従って左辺の2元は $(a,a)$ と $(b,b)$ へ送られる。$(a,b)$ と $(b,a)$ は像に含まれず、比較射は全射ではない。

一元集合の余積を作ってから $H$ を通すと、異なる元の組が新しく現れる。これは[余極限保存による決定命題](#prop-cat3-10-determination)から保存性の仮定を削れない理由である。
<!-- solution-end -->

### 問題10：余極限保存関手を復元する

- Level: C
- 問題ID: CAT3-10-COLIMIT-PRESERVING-CLASSIFY

$\mathcal A$ は二対象 $p,q$ を持つ離散圏とする。$\widehat{\mathcal A}\cong\mathbf{Set}\times\mathbf{Set}$ から $\mathbf{Set}$ への小余極限保存関手 $H$ を取る。$S=H(h^p)$、$T=H(h^q)$ と置く。次を示せ。

1. 任意の $(X,Y)$ について、自然な同型 $H(X,Y)\cong(X\times S)\amalg(Y\times T)$ を示せ。
2. 別の小余極限保存関手 $G$ と $S'=G(h^p)$、$T'=G(h^q)$ を取り、自然変換 $H\Rightarrow G$ が二つの写像 $S\to S'$、$T\to T'$ と一対一に対応することを証明せよ。
3. 任意の二集合 $S,T$ からこのような小余極限保存関手を構成し、1の保存仮定を外せないことを例で示せ。

<!-- solution-start -->
**詳細解答。**

**(1) 対象の復元。** [密度定理](#thm-cat3-10-density)の離散圏の場合、$(X,Y)$ は $X$ 個の $h^p$ と $Y$ 個の $h^q$ の余積である。$H$ の保存性により
$$
H(X,Y)\cong\left(\coprod_{x\in X}H(h^p)\right)
\amalg\left(\coprod_{y\in Y}H(h^q)\right)
\cong(X\times S)\amalg(Y\times T).
$$
射 $(u,v)$ に関して左辺の構造写像 $H(h^p)\to H(X,Y)$ は $x$ を $u(x)$ に送り、右辺の表現でも $(x,s)\mapsto(u(x),s)$ となるから同型は自然である。$q$ 成分も同じ計算で $v$ が働く。

**(2) 自然変換。** $\alpha:H\Rightarrow G$ に対して $f=\alpha_{h^p}:S\to S'$、$g=\alpha_{h^q}:T\to T'$ を取る。自然性を各余積への標準射で使うと、$\alpha_{(X,Y)}$ は
$$
(x,s)\longmapsto(x,f(s)),\qquad
(y,t)\longmapsto(y,g(t))
$$
を満たす必要があり、余積の普遍性で唯一となる。逆に任意の $f,g$ から上式を定めれば、$(u,v)$ と合成した左辺は $(u(x),f(s))$ と $(v(y),g(t))$、右辺も全く同じになる。したがって自然変換であり、二つの構成は互いに逆である。

**(3) 存在と仮定。** 関手を
$$
H_{S,T}(X,Y)=(X\times S)\amalg(Y\times T)
$$
で定める。射 $(u,v)$ では $(x,s)\mapsto(u(x),s)$、$(y,t)\mapsto(v(y),t)$ とする。恒等射・合成についてはタグと第二成分を保つので関手律が成立する。

小余極限の保存を証明するため、集合 $Z$ に
$$
R(Z)=(Z^S,Z^T)
$$
を対応させる。写像 $(X\times S)\amalg(Y\times T)\to Z$ を与えることは、各 $x\in X$ に写像 $S\to Z$ を、各 $y\in Y$ に写像 $T\to Z$ を与えることと同値である。具体的に $f(x,s)$ は $x\mapsto(s\mapsto f(x,s))$ に対応する。従って自然な全単射
$$
\operatorname{Hom}_{\mathbf{Set}}(H_{S,T}(X,Y),Z)
\cong\operatorname{Hom}_{\mathbf{Set}\times\mathbf{Set}}((X,Y),R(Z))
$$
が存在する。これは $H_{S,T}\dashv R$ の[随伴のHom条件](../CAT2-08/index.md#def-cat2-08-adjunction)である。ゆえに[左随伴の余極限保存](../CAT2-11/index.md#thm-cat2-11-left-preserves)を適用でき、$H_{S,T}$ は全ての小さい余極限を保存する。

仮定を外したときの反例は $H(X,Y)=X\times X$ と $G(X,Y)=X$。両者は $h^p$ で一元集合、$h^q$ で空集合を値に持つが、$(\{a,b\},\varnothing)$ では4元と2元になり、同型でない。余積から作り直す段階で $H$ は混合対を追加してしまうため、(1) の結論は成立しない。
<!-- solution-end -->

## 8. 何を得たか

どの前層 $P$ も、その全ての元に対応する表現可能前層 $h^a$ の**小さい余極限**である。密度定理はこの復元を具体的な商集合と逆写像で証明し、[左Kan拡張](#thm-cat3-10-yoneda-kan)は同じ構成の普遍的意味を与えた。

次の圏論IVでは、対象を組み合わせる操作そのものが関手的に振る舞う「モノイダル圏」へ進む。ここまでの「普遍性で構成を制御する」という視点が、テンソルと内部Homの議論にも引き継がれる。
