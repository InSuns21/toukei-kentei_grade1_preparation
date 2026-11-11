# CAT2-11 随伴の極限・余極限保存

## 1. 随伴があると、構成を移してもよいのか

[随伴のHom全単射](../CAT2-08/index.md#def-cat2-08-adjunction)は、$F:\mathcal C\to\mathcal D$ と $G:\mathcal D\to\mathcal C$ に対し、$Fc\to d$ と $c\to Gd$ を対応させる。この対応が、複数の射を一度に束ねる[極限](../CAT2-01/index.md#def-cat2-01-limit)にも通用するだろうか。

たとえば積は、二つの対象への射を一組にまとめる。$\mathcal D$ に $d_1\times d_2$ があれば、$G(d_1\times d_2)$ が $Gd_1$ と $Gd_2$ の積になることを期待する。ただし関手が一般に積を保存するとは限らない。特別な理由が必要で、その理由が**右随伴**である。

対になるのは[余極限](../CAT2-05/index.md#def-cat2-05-colimit)である。二つの対象から出る射を束ねる余積は、**左随伴**と相性がよい。以下では両者を射の向きから証明する。その後、「保存」と「反映」、さらに「創出」は別の主張であることを実例で確かめる。

本講で $\mathcal C,\mathcal D$ は[局所小圏](../CAT1-02/index.md#def-cat1-02-size)、$\mathcal J$ は**小さい**添字圏とする（[小さい添字圏と図式](../CAT2-01/index.md#def-cat2-01-diagram)）。特にHomは集合であり、$\mathcal J$ の対象と射の集合を添字に使える。随伴 $F\dashv G$ を用いる節では、二変数自然な全単射を

$$
\Phi_{c,d}:\operatorname{Hom}_{\mathcal D}(Fc,d)
\xrightarrow{\ \cong\ }\operatorname{Hom}_{\mathcal C}(c,Gd)
$$

と記す。合成は右から左に読む。図式の極限・余極限の**存在は個別に仮定**するので、すべての圏にすべての極限があるとは主張しない。

## 2. 保存とは何を確認することか

関手 $T:\mathcal C\to\mathcal D$ と図式 $A:\mathcal J\to\mathcal C$ を取る。$A$ の極限錐を $\lambda_j:L\to A_j$ と書けば、各 $\alpha:i\to j$ に $A(\alpha)\lambda_i=\lambda_j$ が成り立つ。関手性から $T(A(\alpha))T(\lambda_i)=T(\lambda_j)$ なので、$(T L,T\lambda_j)$ は確かに $TA$ への脚の整合条件を満たす。しかし、それが任意の錐を一意に受ける**極限錐**かどうかは別の問いである。

<a id="def-cat2-11-preserve-limit"></a>

<!-- formal-statement-start -->
> **定義（極限の保存）**  
> 関手 $T:\mathcal C\to\mathcal D$ が形 $\mathcal J$ の極限を**保存する**とは、任意の図式 $A:\mathcal J\to\mathcal C$ と、$\mathcal C$ に存在する任意の極限錐 $(L,\lambda_j:L\to A_j)$ に対し、像の錐

$$
(T L,\;T\lambda_j:T L\to TA_j)
$$

> が $\mathcal D$ で図式 $TA$ の極限錐になることをいう。**すべての小さい極限を保存する**とは、任意の小さい $\mathcal J$ に対してこの性質を持つことである。
<!-- formal-statement-end -->

<!-- definition-example-start: def-cat2-11-preserve-limit -->
**定義の確認**（恒等関手）。$T=1_{\mathbf{Set}}$ とする。集合の図式 $A$ の極限 $(L,\lambda_j)$ について、$TL=L$、$T\lambda_j=\lambda_j$ であり、任意の錐 $(X,x_j)$ を媒介する唯一の写像 $X\to L$ は像の錐でも同じ写像である。単に錐の等式が保たれるだけでなく、存在・一意性も保たれたので、恒等関手はすべての小さい極限を保存する。
<!-- definition-example-end -->

余極限は脚が逆向きである。$\iota_j:A_j\to Q$ が余極限余錐なら $T\iota_j:TA_j\to TQ$ は余錐になるが、普遍性は改めて確認する。

<a id="def-cat2-11-preserve-colimit"></a>

<!-- formal-statement-start -->
> **定義（余極限の保存）**  
> 関手 $T:\mathcal C\to\mathcal D$ が形 $\mathcal J$ の余極限を**保存する**とは、任意の図式 $A:\mathcal J\to\mathcal C$ と、その余極限余錐 $(Q,\iota_j:A_j\to Q)$ に対し、$(TQ,T\iota_j)$ が $TA$ の余極限余錐になることをいう。
<!-- formal-statement-end -->

<!-- definition-example-start: def-cat2-11-preserve-colimit -->
**定義の確認**（恒等関手と集合の非交和）。$T=1_{\mathbf{Set}}$、$A$ を二つの集合 $X,Y$ の離散図式とする。$Q=X\sqcup Y$ には包含 $\iota_X,\iota_Y$ があり、任意の $u:X\to Z$、$v:Y\to Z$ から一意な $[u,v]:Q\to Z$ が作れる（[余積](../CAT2-05/index.md#def-cat2-05-coproduct)）。像の余錐は同じ $Q,\iota_X,\iota_Y$ で、媒介射も同じ $[u,v]$ である。従って余極限保存の「一意性」まで実際に確認できる。
<!-- definition-example-end -->

注意すべき量化順序は「**もとの圏に存在する**極限を像へ移す」である。保存の定義だけから、もとの圏に新しい極限が生じるとはいえない。

## 3. 右随伴は極限を保存する

$F\dashv G$ で、$\mathcal D$ の図式 $D:\mathcal J\to\mathcal D$ に極限 $(L,\lambda_j)$ があるとする。任意の $c\in\mathcal C$ から $GD_j$ への錐を与えれば、各脚を随伴で $Fc\to D_j$ に**転置**できる。その脚が錐の整合条件を満たすことが核心である。

<a id="thm-cat2-11-right-preserves"></a>

<!-- formal-statement-start -->
> **定理（右随伴の極限保存）**  
> 局所小圏 $\mathcal C,\mathcal D$ の関手 $F:\mathcal C\to\mathcal D$ と $G:\mathcal D\to\mathcal C$ に随伴 $F\dashv G$ があるとする。小さい圏 $\mathcal J$ で添字付けた図式 $D:\mathcal J\to\mathcal D$ が極限錐 $(L,\lambda_j:L\to D_j)$ を持つなら、

$$
(GL,\;G\lambda_j:GL\to GD_j)
$$

> は図式 $GD:\mathcal J\to\mathcal C$ の極限錐である。従って $G$ は $\mathcal D$ に存在するすべての小さい極限を保存する。
<!-- formal-statement-end -->

### 証明の見取り図

$(c,q_j:c\to GD_j)$ を任意の錐とする。脚を $\bar q_j=\Phi_{c,D_j}^{-1}(q_j)$ と転置する。[随伴の二変数自然性](../CAT2-08/index.md#def-cat2-08-adjunction)が、$q_j$ の可換条件を $\bar q_j$ の可換条件に変える。$\mathcal D$ の極限によりただ一つの $Fc\to L$ ができ、もう一度転置するとただ一つの $c\to GL$ が得られる。

<!-- proof-start -->
### 証明

まず関手性から、任意の $\alpha:i\to j$ について

$$
GD(\alpha)\circ G\lambda_i
=G(D(\alpha)\circ\lambda_i)
=G\lambda_j
$$

なので $(GL,G\lambda_j)$ は錐である。

任意の錐 $(c,q_j)$ を取る。すなわち $q_j:c\to GD_j$ で、すべての $\alpha:i\to j$ に対して

$$
GD(\alpha)\circ q_i=q_j
$$

を満たす。$\bar q_j=\Phi_{c,D_j}^{-1}(q_j):Fc\to D_j$ と定義する。[随伴の終域変数に関する自然性](../CAT2-08/index.md#prop-cat2-08-separate-naturality)から

$$
\begin{aligned}
\Phi_{c,D_j}(D(\alpha)\circ\bar q_i)
&=GD(\alpha)\circ\Phi_{c,D_i}(\bar q_i)\\
&=GD(\alpha)\circ q_i=q_j\\
&=\Phi_{c,D_j}(\bar q_j).
\end{aligned}
$$

$\Phi_{c,D_j}$ は単射だから $D(\alpha)\bar q_i=\bar q_j$、よって $(Fc,\bar q_j)$ は $D$ への錐である。$(L,\lambda_j)$ の極限性により一意な $h:Fc\to L$ が存在し、

$$
\lambda_j\circ h=\bar q_j\quad(\forall j)
$$

となる。$u=\Phi_{c,L}(h):c\to GL$ と置けば、同じ自然性によって

$$
G\lambda_j\circ u
=\Phi_{c,D_j}(\lambda_jh)
=\Phi_{c,D_j}(\bar q_j)=q_j.
$$

一意性も示す。$v:c\to GL$ がすべての $j$ に対し $G\lambda_j v=q_j$ を満たすなら、$\bar v=\Phi_{c,L}^{-1}(v)$ は

$$
\lambda_j\bar v
=\Phi_{c,D_j}^{-1}(G\lambda_jv)
=\bar q_j.
$$

$L$ の極限性により $\bar v=h$、従って $v=\Phi_{c,L}(h)=u$ である。空の $\mathcal J$ でもこの議論は成立し、錐の条件が空であることから終対象を得る。$\square$
<!-- proof-end -->

この定理が主張するのは、**与えられた極限錐全体の普遍性**であって、脚の等式だけではない。

### 具体例：積・等化子・終対象

1. [対角関手と積関手の随伴](../CAT2-08/index.md#thm-cat2-08-diagonal-product) $\Delta\dashv\Pi$ に定理を適用する。  
   $\Pi:\mathbf{Set}\times\mathbf{Set}\to\mathbf{Set}$ は $(A,B)\mapsto A\times B$ とする積関手である。  
   二つの図式 $X,Y:\mathcal J\to\mathbf{Set}$ を取り、$X_j=X(j)$、$Y_j=Y(j)$ と書く。  
   射 $\alpha:i\to j$ に対し、$X(\alpha):X_i\to X_j$、$Y(\alpha):Y_i\to Y_j$ である。  
   $\mathbf{Set}\times\mathbf{Set}$ の図式 $j\mapsto(X_j,Y_j)$ の極限が $(\lim_j X_j,\lim_j Y_j)$ なら、

$$
\left(\lim_jX_j\right)\times\left(\lim_jY_j\right)
\cong\lim_j(X_j\times Y_j).
$$

各成分の対応は $( (x_j)_j,(y_j)_j)\mapsto((x_j,y_j))_j$ であり、両側とも $X(\alpha)x_i=x_j$ と $Y(\alpha)y_i=y_j$ が必要十分である。ここでは積を取る関手が**右随伴**であることを確認した。

2. [等化子](../CAT2-03/index.md#def-cat2-03-equalizer) $e:E\to D_0$ が $f,g:D_0\rightrightarrows D_1$ を等化するなら、$Ge:GE\to GD_0$ は $Gf,Gg$ の等化子になる。実際、$x:c\to GD_0$ で $Gfx=Ggx$ のとき、転置 $\bar x:Fc\to D_0$ は $f\bar x=g\bar x$ であり、一意に $E$ を経由する。

3. 空図式の極限は[終対象](../CAT2-02/index.md#prop-cat2-02-empty-product)である。$\mathcal D$ に終対象 $1_{\mathcal D}$ があれば、任意の $c\in\mathcal C$ に対して

$$
\operatorname{Hom}_{\mathcal C}(c,G1_{\mathcal D})
\cong\operatorname{Hom}_{\mathcal D}(Fc,1_{\mathcal D})
\cong\{\ast\}.
$$

よって $G1_{\mathcal D}$ は終対象である。

## 4. 左随伴は余極限を保存する

今度は $\mathcal C$ に $A:\mathcal J\to\mathcal C$ の余極限 $(Q,\iota_j:A_j\to Q)$ があるとする。余錐 $v_j:FA_j\to d$ を転置すると、脚 $A_j\to Gd$ は $\mathcal C$ の余錐になる。極限の場合と逆向きの操作をすべて書き下す。

<a id="thm-cat2-11-left-preserves"></a>

<!-- formal-statement-start -->
> **定理（左随伴の余極限保存）**  
> 局所小圏の随伴 $F:\mathcal C\rightleftarrows\mathcal D:G$、$F\dashv G$ に対し、小さい図式 $A:\mathcal J\to\mathcal C$ が余極限 $(Q,\iota_j:A_j\to Q)$ を持つなら、

$$
(FQ,\;F\iota_j:FA_j\to FQ)
$$

> は $FA:\mathcal J\to\mathcal D$ の余極限余錐である。従って $F$ は $\mathcal C$ に存在するすべての小さい余極限を保存する。
<!-- formal-statement-end -->

### 証明の見取り図

余錐の脚 $v_j:FA_j\to d$ を $\Phi_{A_j,d}(v_j):A_j\to Gd$ に移す。今度は二変数自然性の**第1変数**を用いて可換性を確かめる。余極限の一意な射 $Q\to Gd$ を逆転置すれば答えになる。

<!-- proof-start -->
### 証明

$(FQ,F\iota_j)$ は、$F\iota_j\circ FA(\alpha)=F\iota_i$ により余錐である。任意の $FA$ の余錐 $v_j:FA_j\to d$ を取る。$\alpha:i\to j$ なら

$$
v_j\circ FA(\alpha)=v_i.
$$

$w_j=\Phi_{A_j,d}(v_j):A_j\to Gd$ と定める。[随伴全単射の第1変数の自然性](../CAT2-08/index.md#prop-cat2-08-separate-naturality)から

$$
\begin{aligned}
w_j\circ A(\alpha)
&=\Phi_{A_i,d}(v_j\circ FA(\alpha))\\
&=\Phi_{A_i,d}(v_i)=w_i.
\end{aligned}
$$

よって $w_j$ は $A$ の余錐である。$Q$ の余極限性によりただ一つの $t:Q\to Gd$ が存在し、$t\iota_j=w_j$ を満たす。逆転置 $h=\Phi_{Q,d}^{-1}(t):FQ\to d$ に対し、

$$
\Phi_{A_j,d}(h\circ F\iota_j)
=\Phi_{Q,d}(h)\circ\iota_j
=t\iota_j=w_j
=\Phi_{A_j,d}(v_j).
$$

全単射の単射性から $hF\iota_j=v_j$。別の $h':FQ\to d$ も同じ条件を満たすなら、その転置 $t'=\Phi_{Q,d}(h')$ は $t'\iota_j=w_j$ であり、$Q$ の余極限性で $t'=t$、従って $h'=h$。空図式では $F$ が始対象を保存することも従う。$\square$
<!-- proof-end -->

### 具体例：自由モノイドと余積

[自由モノイド随伴](../CAT2-08/index.md#thm-cat2-08-free-monoid) $W:\mathbf{Set}\to\mathbf{Mon}$、$W\dashv U$ を使う。$X,Y$ の非交和は集合の余積なので、

$$
W(X\sqcup Y)\cong W(X)\sqcup_{\mathbf{Mon}} W(Y).
$$

左辺の文字は $X$ 側か $Y$ 側から来る。任意のモノイド $M$ と準同型 $u:W(X)\to M$、$v:W(Y)\to M$ は、文字を $u((x))$ または $v((y))$ に送る写像を定め、語の連結に沿ってただ一つの準同型 $W(X\sqcup Y)\to M$ を定める。すなわち表示された同型は、単なる集合の非交和との同一視ではなく、**モノイドでの余積**という普遍性から得られる。

始対象についても、$W(\varnothing)$ は空語だけの一元モノイドである。任意のモノイドへ単位を単位に送る準同型がただ一つあるので始対象となる。なお一元モノイドは同時に終対象だが、定理で使ったのは**始対象性**である。

## 5. 比較射を作れば保存を検査できる

極限が両側に存在するとき、像の錐から「比較射」を一意に作れる。[極限錐の同型一意性](../CAT2-01/index.md#thm-cat2-01-limit-uniqueness)が、比較射の同型性と保存性を結び付ける。

<a id="prop-cat2-11-comparison"></a>

<!-- formal-statement-start -->
> **命題（比較射による保存判定）**  
> $T:\mathcal C\to\mathcal D$、$A:\mathcal J\to\mathcal C$ とする。
>
> **（1）極限**：$\mathcal C$ に $(L,\lambda_j)=\lim A$、$\mathcal D$ に $(K,p_j)=\lim(TA)$ があるとき、唯一の比較射 $\kappa:TL\to K$ が存在して

$$
p_j\circ\kappa=T\lambda_j
$$

> を満たす。$T$ がこの極限を保存することと $\kappa$ が同型であることは同値である。
>
> **（2）余極限**：$\mathcal C$ に $(Q,\iota_j)=\operatorname{colim}A$、$\mathcal D$ に $(R,r_j)=\operatorname{colim}(TA)$ があるとき、唯一の比較射 $\gamma:R\to TQ$ が存在して

$$
\gamma\circ r_j=T\iota_j
$$

> を満たす。$T$ がこの余極限を保存することと $\gamma$ が同型であることは同値である。
<!-- formal-statement-end -->

### 証明の見取り図

極限は「任意の錐から極限へ」なので $TL\to K$、余極限は「余極限から任意の余錐へ」なので $R\to TQ$ と矢印の向きが逆になる。比較射が同型なら普遍性を運べる。

<!-- proof-start -->
### 証明

（1）$T\lambda_j$ は錐なので $K$ の普遍性により一意な $\kappa$ が存在する。$T$ が極限を保存すれば $(TL,T\lambda_j)$ も極限錐であり、[極限錐の一意性](../CAT2-01/index.md#thm-cat2-01-limit-uniqueness)から脚を保つ一意な同型 $\kappa$ を得る。逆に $\kappa$ が同型なら、任意の $TA$ の錐 $x_j:X\to TA_j$ に対して唯一の $a:X\to K$ が $p_ja=x_j$ を満たす。$u=\kappa^{-1}a:X\to TL$ は

$$
T\lambda_j u=p_j\kappa\kappa^{-1}a=x_j.
$$

別の $u'$ も同じ脚を与えるなら $p_j\kappa u'=x_j$、$K$ の一意性より $\kappa u'=a$、従って $u'=u$ となる。

（2）$T\iota_j$ が余錐なので $R$ の普遍性から $\gamma$ を得る。保存すれば[余極限の同型一意性](../CAT2-05/index.md#thm-cat2-05-uniqueness)で $\gamma$ は同型。逆に $\gamma$ が同型なら、任意の $TA$ の余錐 $x_j:TA_j\to X$ に対する唯一の $a:R\to X$ を用い、$u=a\gamma^{-1}:TQ\to X$ と置く。すると $uT\iota_j=ar_j=x_j$。別の $u'$ では $u'\gamma:R\to X$ が同じ余錐を媒介するので $u'\gamma=a$、従って $u'=u$。$\square$
<!-- proof-end -->

比較射の向きを誤ると、単なる存在証明から破綻する。右随伴の定理では $\kappa:G(\lim D)\to\lim(GD)$ が同型となり、左随伴の定理では $\gamma:\operatorname{colim}(FA)\to F(\operatorname{colim}A)$ が同型となる。

## 6. 保存・反映・創出は同じではない

**保存**は「もとの極限を像へ送る」。**反映**は逆に「像が極限なら、もとの錐も極限だと判定する」。この逆向きは随伴の保存定理からは出ない。

<a id="def-cat2-11-reflect-limit"></a>

<!-- formal-statement-start -->
> **定義（極限の反映）**  
> 関手 $T:\mathcal C\to\mathcal D$ が形 $\mathcal J$ の極限を**反映する**とは、任意の図式 $A:\mathcal J\to\mathcal C$ とその任意の錐 $(L,\lambda_j)$ に対し、$(TL,T\lambda_j)$ が $TA$ の極限錐なら $(L,\lambda_j)$ 自身が $A$ の極限錐であることをいう。
<!-- formal-statement-end -->

<!-- definition-example-start: def-cat2-11-reflect-limit -->
**定義の確認**（恒等関手）。$T=1_{\mathbf{Set}}$ なら、像の錐が極限であるという仮定は元の錐が極限であるという仮定と完全に同じである。任意の別の錐からの媒介射の存在・一意性も一致するので、恒等関手は極限を反映する。保存の確認とは論理的な向きが逆である。
<!-- definition-example-end -->

次の「創出」は、像の圏で構成した極限を、元の圏へ**構造ごと一意に持ち上げる**性質である。忘却関手の場合は、集合の極限に演算を一意に入れられるという意味になる。

<a id="def-cat2-11-create-limit"></a>

<!-- formal-statement-start -->
> **定義（極限の創出）**  
> 関手 $T:\mathcal C\to\mathcal D$ が形 $\mathcal J$ の極限を**創出する**とは、任意の $A:\mathcal J\to\mathcal C$ と、任意に選んだ $TA$ の極限錐 $(K,q_j:K\to TA_j)$ に対し、$TL=K$、$T\lambda_j=q_j$ を満たす錐 $(L,\lambda_j)$ が一意に持ち上がり、しかもその持ち上げが $A$ の極限錐となることをいう。ここで一意性は指定した像の錐のもとでの一意性であり、極限対象が選び方によらず字義どおり等しいという意味ではない。
<!-- formal-statement-end -->

<!-- definition-example-start: def-cat2-11-create-limit -->
**定義の確認**（恒等関手）。$T=1_{\mathbf{Set}}$ と $TA=A$ の極限錐 $(K,q_j)$ を任意に選ぶ。$L=K$、$\lambda_j=q_j$ を選べば条件を満たす。$TL=K$ と $T\lambda_j=q_j$ を満たす別候補は、恒等関手では $L=K$、$\lambda_j=q_j$ そのものなので一意である。元の圏でも極限である。
<!-- definition-example-end -->

<a id="prop-cat2-11-monoid-creates"></a>

<!-- formal-statement-start -->
> **命題（モノイドの忘却関手による極限創出）**  
> 忘却関手 $U:\mathbf{Mon}\to\mathbf{Set}$ は、すべての小さい極限を創出する。従って $U$ はそれらを保存し、反映もする。
<!-- formal-statement-end -->

### 証明の見取り図

集合の極限は整合する成分の族で実現できる。各対象がモノイドで、図式の射が準同型なら、成分ごとの積・単位元は整合条件を壊さない。任意に与えられた集合の極限には、この構造を同型で移す。

<!-- proof-start -->
### 証明

小さい図式 $M:\mathcal J\to\mathbf{Mon}$ を固定する。まず集合の図式 $UM$ の標準的な極限を

$$
P=\left\{(x_j)_j\in\prod_{j\in\operatorname{Ob}\mathcal J}UM_j
\ \middle|\ U(M(\alpha))(x_i)=x_j\quad(\alpha:i\to j)\right\}
$$

とする（[小積と等化子による極限構成](../CAT2-04/index.md#thm-cat2-04-construction)）。$p_j:P\to UM_j$ は成分射影である。二つの整合族 $x,y\in P$ に対し $(xy)_j=x_jy_j$ と置く。$M(\alpha)$ が準同型なので

$$
M(\alpha)(x_i y_i)
=M(\alpha)(x_i)M(\alpha)(y_i)=x_jy_j.
$$

よって $xy\in P$。単位族 $(e_{M_j})_j$ も $M(\alpha)(e_{M_i})=e_{M_j}$ により $P$ に属する。結合律と単位律は各成分のモノイド公理で成立し、$P$ はモノイドとなる。射影 $p_j$ は定義された積と単位を保つ。

モノイド $N$ からの任意の錐 $f_j:N\to M_j$ について、集合の極限性で唯一の写像 $f:UN\to P$ が $p_jf=Uf_j$ を満たす。任意の $a,b\in N$ について

$$
p_j(f(ab))=f_j(ab)=f_j(a)f_j(b)
=p_j(f(a)f(b)).
$$

すべての射影 $p_j$ による成分が等しいので $f(ab)=f(a)f(b)$。単位元についても各 $p_j$ の値が $e_{M_j}$ だから $f(e_N)=e_P$。従って $f$ は準同型であり、唯一の錐の媒介射となる。

標準集合極限 $(P,p_j)$ と任意に選んだ集合極限 $(K,q_j)$ には、[極限錐の同型一意性](../CAT2-01/index.md#thm-cat2-01-limit-uniqueness)から脚を保つ一意な全単射 $s:K\to P$ がある。$K$ 上に $ab=s^{-1}(s(a)s(b))$、$e_K=s^{-1}(e_P)$ と定めると、$s$ はモノイド同型になり、$q_j=p_js$ は準同型になる。任意のモノイド錐 $f_j:N\to M_j$ を取ると、上で構成した一意な媒介準同型 $f:N\to P$ を使い、$s^{-1}f:N\to K$ は準同型であり

$
q_j\circ s^{-1}\circ f=p_j\circ f=f_j
$

を満たす。別の準同型 $g:N\to K$ が同じ脚を与えれば $sg:N\to P$ は $f$ と同じ脚を持つので $sg=f$、従って $g=s^{-1}f$ である。これで $(K,q_j)$ もモノイドの極限錐となる。もし $K$ に別のモノイド構造があり全 $q_j$ が準同型なら、各 $a,b$ について

$$
q_j(ab)=q_j(a)q_j(b)
$$

が全 $j$ で成立する。$q_j$ は集合極限の脚なので共同で単射であり、積は一意である。単位も同様に一意。従って任意に選んだ集合極限錐に、一意なモノイド極限錐が持ち上がる。

$U$ による極限保存はこの構成で確かめた。反映については、モノイド内の任意の錐 $(N,n_j)$ の像が集合極限なら、上と同じ「成分ごとの等式」から、任意のモノイド錐の集合上の媒介射が準同型となる。従って元の錐も極限である。$\square$
<!-- proof-end -->

<a id="prop-cat2-11-not-reflect"></a>

<!-- formal-statement-start -->
> **命題（保存と反映は異なる）**  
> 右随伴であって、すべての小さい極限を保存するが、空図式の極限を反映しない関手が存在する。
<!-- formal-statement-end -->

### 証明の見取り図

$\mathbf 1$ を一対象・一射だけの圏とする。$G:\mathbf{Set}\to\mathbf 1$ はすべての集合を唯一の対象へ送る。$\mathbf 1$ はどの対象も（唯一の対象なので）終対象だが、$\mathbf{Set}$ では二元集合は終対象でない。

<!-- proof-start -->
### 証明

$F:\mathbf 1\to\mathbf{Set}$ を唯一の対象 $\ast$ を空集合 $\varnothing$ に送る関手とする。任意の集合 $X$ に対し

$$
\operatorname{Hom}_{\mathbf{Set}}(F\ast,X)
=\operatorname{Hom}_{\mathbf{Set}}(\varnothing,X)
\cong\{\ast\}
=\operatorname{Hom}_{\mathbf 1}(\ast,GX).
$$

両辺は一元集合であり、その対応は両変数で自然なので $F\dashv G$。従って[右随伴の極限保存](#thm-cat2-11-right-preserves)により $G$ はすべての小さい極限を保存する。

空図式に対する錐は対象一つを選ぶことに等しい。$\mathbf{Set}$ で $X=\{0,1\}$ を選ぶと、$X$ は終対象ではない。例えば一元集合から $X$ への写像が二つある。一方 $GX=\ast$ は $\mathbf1$ の終対象である。よって像は極限錐だが元は極限錐でなく、$G$ は空図式の極限を反映しない。$\square$
<!-- proof-end -->

<a id="prop-cat2-11-opposite-fails"></a>

<!-- formal-statement-start -->
> **命題（反対向きの保存は一般に成立しない）**  
> 自由モノイド関手 $W:\mathbf{Set}\to\mathbf{Mon}$ は左随伴だが、二項積を保存しない。またその右随伴 $U:\mathbf{Mon}\to\mathbf{Set}$ は、二項余積を保存しない。
<!-- formal-statement-end -->

### 証明の見取り図

$W$ は語の連結を記録する。二つの文字集合を積にしてから語を作ると、両成分の語の長さが常に一致する。逆にモノイドの余積では、異なる側からの文字を交互に並べられる。

<!-- proof-start -->
### 証明

$X=\{a\}$、$Y=\{b\}$ とする。$W(X\times Y)$ の語は $(a,b)$ を $n$ 回繰り返したもの（$n\ge0$）だけである。積の射影から来る比較準同型

$$
\rho:W(X\times Y)\longrightarrow W(X)\times W(Y)
$$

は $(a,b)^n\mapsto(a^n,b^n)$ を満たす。右辺の $(\text{空語},b)$ はどの $n$ の像でもないので、$\rho$ は全射でなく同型でない。[比較射による判定](#prop-cat2-11-comparison)から、$W$ はこの二項積を保存しない。

次に $\mathbf{Mon}$ における $W(X),W(Y)$ の余積は $W(\{a,b\})$ である。実際、二つの準同型を指定することは $a,b$ の像を指定することと同じで、それらは任意のモノイドへ語の連結に沿って一意に延長される。集合余積から来る比較写像

$$
UW(X)\sqcup UW(Y)\longrightarrow U(W(\{a,b\}))
$$

の像には $a$ のみの語と $b$ のみの語しかなく、混合語 $ab$ がない。従って比較写像は全射でなく、$U$ は二項余積を保存しない。$\square$
<!-- proof-end -->

ここまでを整理すると、右随伴は極限、左随伴は余極限を**必ず保存する**。反映・創出、そして反対向きの保存は個別の追加性質である。

## 7. 演習：向き・存在・一意性を自力で検証する

### 問題1：平行二射の錐を転置する

- Level: A
- 問題ID: CAT2-11-TRANSPOSED-CONE

$F\dashv G$、$f,g:d_0\to d_1$ とし、$x:c\to Gd_0$ を取る。$\bar x=\Phi_{c,d_0}^{-1}(x)$ とする。$Gf\circ x=Gg\circ x$ と $f\circ\bar x=g\circ\bar x$ が同値であることを示せ。

<!-- solution-start -->
**詳細解答**：右辺の二射は $Fc\to d_1$、左辺は $c\to Gd_1$ という型を持つ。[終域変数の自然性](../CAT2-08/index.md#prop-cat2-08-separate-naturality)をそれぞれに適用すると

$$
\Phi_{c,d_1}(f\bar x)=Gf\circ x,\qquad
\Phi_{c,d_1}(g\bar x)=Gg\circ x.
$$

$\Phi_{c,d_1}$ は全単射、特に単射であるから、右辺同士が等しいことと左辺の入力同士が等しいことは同値である。錐の整合性が転置後も成り立つのはこの単射性による。
<!-- solution-end -->

### 問題2：終対象は右随伴で保たれる

- Level: A
- 問題ID: CAT2-11-TERMINAL

$F\dashv G$ で $\mathcal D$ に終対象 $1$ があるとき、$G1$ が $\mathcal C$ の終対象であることを、空図式という言葉を使わずHom集合で証明せよ。

<!-- solution-start -->
**詳細解答**：任意の $c\in\mathcal C$ に対して $Fc$ は $\mathcal D$ の対象なので、終対象の定義から $\operatorname{Hom}_{\mathcal D}(Fc,1)$ にはただ一つの射がある。[随伴のHom全単射](../CAT2-08/index.md#def-cat2-08-adjunction)より

$$
\operatorname{Hom}_{\mathcal C}(c,G1)
\cong\operatorname{Hom}_{\mathcal D}(Fc,1)
$$

も一元集合である。すべての $c$ に対して $c\to G1$ が唯一なので $G1$ は終対象である。$\mathcal C$ に終対象があらかじめあるとは仮定していない。
<!-- solution-end -->

### 問題3：積への唯一の射

- Level: A
- 問題ID: CAT2-11-PRODUCT

$G$ を右随伴とし、$\mathcal D$ に $d_1\times d_2$ があるとする。任意の $x_i:c\to Gd_i$ から $c\to G(d_1\times d_2)$ を一意に作り、二つの射影と合成すると $x_i$ になることを示せ。

<!-- solution-start -->
**詳細解答**：$\bar x_i=\Phi_{c,d_i}^{-1}(x_i):Fc\to d_i$ とする。[積の普遍性](../CAT2-02/index.md#def-cat2-02-binary-product)により $h=\langle\bar x_1,\bar x_2\rangle:Fc\to d_1\times d_2$ がただ一つ存在し、$\pi_i h=\bar x_i$ となる。$u=\Phi_{c,d_1\times d_2}(h)$ なら

$$
G\pi_i\circ u=\Phi_{c,d_i}(\pi_i h)
=\Phi_{c,d_i}(\bar x_i)=x_i.
$$

別の $v:c\to G(d_1\times d_2)$ でも同じなら、逆転置 $\bar v$ は $\pi_i\bar v=\bar x_i$ を満たす。積の一意性から $\bar v=h$、従って $v=u$。
<!-- solution-end -->

### 問題4：始対象と二項余積を左随伴で運ぶ

- Level: A
- 問題ID: CAT2-11-INITIAL-COPRODUCT

$F\dashv G$ とする。$\mathcal C$ に始対象 $0$ と二項余積 $a\sqcup b$ があれば、$F0$ は始対象、$F(a\sqcup b)$ は $Fa$ と $Fb$ の余積であることを示せ。

<!-- solution-start -->
**詳細解答**：任意の $d\in\mathcal D$ に対し

$$
\operatorname{Hom}_{\mathcal D}(F0,d)
\cong\operatorname{Hom}_{\mathcal C}(0,Gd)
\cong\{\ast\},
$$

なので $F0$ は始対象。次に任意の $u:Fa\to d$、$v:Fb\to d$ を転置して $\bar u:a\to Gd$、$\bar v:b\to Gd$ とする。[余積の普遍性](../CAT2-05/index.md#def-cat2-05-coproduct)から一意な $t:a\sqcup b\to Gd$ が $t\iota_a=\bar u$、$t\iota_b=\bar v$ を満たす。逆転置 $h=\Phi^{-1}_{a\sqcup b,d}(t):F(a\sqcup b)\to d$ は第1変数の自然性で $hF\iota_a=u$、$hF\iota_b=v$。別の $h'$ は転置後に同じ二本の脚を持つため $t$ に等しく、$h'=h$。従って二項余積である。
<!-- solution-end -->

### 問題5：自由モノイドの積の失敗

- Level: A
- 問題ID: CAT2-11-FREE-MONOID-PRODUCT

$X=\{x\}$、$Y=\{y\}$ で $W(X\times Y)\to W(X)\times W(Y)$ の像を完全に決定せよ。左随伴が積を保存しなくても保存定理と矛盾しない理由を述べよ。

<!-- solution-start -->
**詳細解答**：左辺の語は $(x,y)^n$（$n\ge0$）の形に限られ、射影による準同型はそれを $(x^n,y^n)$ に送る。従って像は正確に

$$
\{(x^n,y^n)\mid n\ge0\}
$$

である。$(x,y^2)$ は像に含まれないため比較射は同型ではなく、二項積を保存しない。[左随伴の定理](#thm-cat2-11-left-preserves)が保証するのは**余極限**の保存であり、積は極限なので矛盾はない。
<!-- solution-end -->

### 問題6：等化子保存の証明を組み立てる

- Level: B
- 問題ID: CAT2-11-EQUALIZER

$F\dashv G$ とし、$e:E\to d_0$ は $f,g:d_0\to d_1$ の等化子とする。$Ge$ が $Gf,Gg$ の等化子であることを、$c\to Gd_0$ の任意の射から媒介射を構成して証明せよ。

<!-- solution-start -->
**詳細解答**：$fe=ge$ だから $GfGe=GgGe$。任意の $x:c\to Gd_0$ が $Gfx=Ggx$ を満たすとする。問題1の転置計算（[随伴の終域変数に関する自然性](../CAT2-08/index.md#prop-cat2-08-separate-naturality)）から

$$
f\,\Phi^{-1}_{c,d_0}(x)
=g\,\Phi^{-1}_{c,d_0}(x).
$$

$\bar x=\Phi^{-1}_{c,d_0}(x):Fc\to d_0$ と書けば、等化子の普遍性から一意の $h:Fc\to E$ が $eh=\bar x$ を満たす。$u=\Phi_{c,E}(h):c\to GE$ は

$$
Ge\,u=\Phi_{c,d_0}(eh)
=\Phi_{c,d_0}(\bar x)=x.
$$

$v:c\to GE$ も $Ge\,v=x$ なら、その逆転置 $\bar v$ は $e\bar v=\bar x$。等化子の一意性から $\bar v=h$、ゆえに $v=u$。存在・一意性がそろったので $Ge$ は等化子である。
<!-- solution-end -->

### 問題7：モノイドの引き戻し

- Level: B
- 問題ID: CAT2-11-MONOID-PULLBACK

モノイド準同型 $f:M\to P$、$g:N\to P$ に対し、

$$
K=\{(m,n)\in M\times N\mid f(m)=g(n)\}
$$

を考える。$K$ が成分ごとの積でモノイドとなること、射影が準同型となること、$K$ が $\mathbf{Mon}$ で引き戻しを与えることを証明せよ。

<!-- solution-start -->
**詳細解答**：$(m,n),(m',n')\in K$ なら準同型性により

$$
f(mm')=f(m)f(m')=g(n)g(n')=g(nn'),
$$

従って $(mm',nn')\in K$。また $f(e_M)=e_P=g(e_N)$ なので $(e_M,e_N)\in K$。結合律と単位律は両成分で成立し、射影 $\pi_M,\pi_N$ は積・単位を保つ。

任意のモノイド $H$ と準同型 $u:H\to M$、$v:H\to N$ が $fu=gv$ を満たすとする。$h:H\to K$ を $h(z)=(u(z),v(z))$ と置けば条件により値が $K$ に入り、

$$
h(zz')=(u(z)u(z'),v(z)v(z'))=h(z)h(z'),\quad
h(e_H)=(e_M,e_N).
$$

ゆえに $h$ は準同型で $\pi_Mh=u$、$\pi_Nh=v$。この二条件を満たす $h'$ は各 $z$ に対し両成分が $u(z),v(z)$ と決まるため $h'=h$。これは[引き戻し](../CAT2-03/index.md#def-cat2-03-pullback)の存在・一意性の両方である。
<!-- solution-end -->

### 問題8：比較射の向きと同型

- Level: B
- 問題ID: CAT2-11-COMPARISON-MAPS

$T:\mathcal C\to\mathcal D$、図式 $A:\mathcal J\to\mathcal C$ について、両圏の極限と余極限が存在すると仮定する。極限の比較射と余極限の比較射の向きを記し、どちらも同型なら $T$ がその図式の極限・余極限をそれぞれ保存することを、媒介射の式を使って証明せよ。

<!-- solution-start -->
**詳細解答**：$\lambda_j:L\to A_j$、$p_j:K\to TA_j$ を極限錐とすれば、$T\lambda_j$ は $TA$ の錐だから普遍性で得られるのは

$$
\kappa:TL\to K,\qquad p_j\kappa=T\lambda_j.
$$

$\kappa$ が同型なら、任意の錐 $x_j:X\to TA_j$ の唯一の媒介射 $a:X\to K$ に対し、$u=\kappa^{-1}a:X\to TL$ とする。$T\lambda_j u=p_j a=x_j$。別の $u'$ があれば $p_j\kappa u'=x_j$ だから $\kappa u'=a$、ゆえに $u'=u$。

余極限 $\iota_j:A_j\to Q$、$r_j:TA_j\to R$ では向きが逆になり、

$$
\gamma:R\to TQ,\qquad \gamma r_j=T\iota_j.
$$

$\gamma$ が同型なら、任意の余錐 $x_j:TA_j\to X$ の唯一の媒介射 $b:R\to X$ から $v=b\gamma^{-1}:TQ\to X$ を得る。$vT\iota_j=br_j=x_j$。別の $v'$ では $v'\gamma$ が $R$ からの同じ媒介射なので $v'\gamma=b$、$v'=v$。これで両方の保存を確認できた。
<!-- solution-end -->

### 問題9：右随伴でも反映しない

- Level: B
- 問題ID: CAT2-11-NONREFLECTION

$\mathbf1$ を一対象圏とし、$G:\mathbf{Set}\to\mathbf1$ を唯一の関手とする。$G$ が右随伴であるための左随伴 $F$ を構成せよ。そのうえで、$G$ が空図式の極限を保存するが反映しないことを、二元集合を使って説明せよ。

<!-- solution-start -->
**詳細解答**：$F(\ast)=\varnothing$ とする。$\mathbf1$ の射は恒等射だけなので $F$ は関手になる。任意の $X$ に対し

$$
\operatorname{Hom}_{\mathbf{Set}}(\varnothing,X)
=\{\varnothing\to X\}
\cong\operatorname{Hom}_{\mathbf1}(\ast,\ast)
$$

は一元集合の自然全単射であり $F\dashv G$。空図式の極限は終対象で、$\mathbf{Set}$ の終対象は任意の一元集合、$\mathbf1$ の終対象は $\ast$ である。$G$ は一元集合を $\ast$ に送り、保存する。

一方 $X=\{0,1\}$ は終対象でない。$\{z\}\to X$ に $z\mapsto0$ と $z\mapsto1$ の二射があるからである。それでも $GX=\ast$ は終対象なので、像が極限であるのに元は極限でない。ゆえに反映しない。
<!-- solution-end -->

### 問題10：創出・反映・非保存を一緒に判定する

- Level: C
- 問題ID: CAT2-11-CREATION-ALL-SMALL

$U:\mathbf{Mon}\to\mathbf{Set}$ とその左随伴 $W$ を考える。小さい図式 $M:\mathcal J\to\mathbf{Mon}$ の集合極限を、整合する族として構成し、それを用いて次をすべて証明せよ。

1. 任意に選んだ集合極限の頂点に、一意にモノイド構造を導入でき、$U$ はその極限を創出する。
2. $U$ は極限を反映する。
3. $X=\{a\}$、$Y=\{b\}$ について、$U$ は $W(X),W(Y)$ のモノイド余積を集合の余積として保存しない。これは1・2と矛盾しない。

<!-- solution-start -->
**詳細解答**：まず $\mathcal J$ の対象集合が小さいので

$$
P=\{(x_j)_j\in\prod_j UM_j\mid
UM(\alpha)(x_i)=x_j\;(\alpha:i\to j)\}
$$

は集合であり、[小さい図式の極限構成](../CAT2-04/index.md#thm-cat2-04-construction)に従う集合の極限となる。各 $M(\alpha)$ が準同型であることから

$$
M(\alpha)(x_iy_i)
=M(\alpha)(x_i)M(\alpha)(y_i)
=x_jy_j
$$

なので $P$ は成分積で閉じる。単位族も整合し、結合律は成分ごとに成立する。射影は準同型となり、任意のモノイド錐 $f_j:N\to M_j$ からの集合媒介射 $f:N\to P$ は、すべての射影による値を比較して $f(ab)=f(a)f(b)$、$f(e_N)=e_P$ を満たす。従って $P$ はモノイドの極限である。

**1.** 任意に選んだ集合極限 $(K,q_j)$ には、両錐の普遍性を互いに適用して、全脚を保つ写像 $s:K\to P$ と $r:P\to K$ が得られる。$rs$ と $sr$ はそれぞれ恒等射と同じ脚を持つので、[極限錐の同型一意性](../CAT2-01/index.md#thm-cat2-01-limit-uniqueness)により $rs=1_K$、$sr=1_P$。従って $s$ は全単射である。

$a\cdot_K b=s^{-1}(s(a)s(b))$、$e_K=s^{-1}(e_P)$ により $K$ をモノイドにできる。別のモノイド積 $\star$ で全 $q_j$ が準同型なら、任意の $a,b$ とすべての $j$ に対して $q_j(a\star b)=q_j(a)q_j(b)=q_j(a\cdot_K b)$。$q_j$ は共同単射なので $\star=\cdot_K$。単位も一意。

さらに任意のモノイド錐 $h_j:H\to M_j$ から $P$ への一意な媒介準同型 $f:H\to P$ に $s^{-1}$ を後合成すると、$q_js^{-1}f=p_jf=h_j$ を満たす準同型 $H\to K$ を得る。別の媒介準同型 $g$ は $sg=f$ となるから一意である。従って $(K,q_j)$ はモノイド極限であり、選んだ集合極限を一意に持ち上げられる。$\mathcal J$ が空でも積集合 $P$ は一元集合であり、唯一のモノイド構造を持つ。

**2.** モノイド錐 $(N,n_j)$ の像が集合の極限なら、任意のモノイド錐 $(H,h_j)$ の集合媒介射 $t:UH\to UN$ は、各 $n_j$ が準同型であり共同単射だから

$$
n_j(t(ab))=h_j(ab)
=h_j(a)h_j(b)
=n_j(t(a)t(b))
$$

により $t(ab)=t(a)t(b)$ を満たす。単位も同様で、$t$ は唯一のモノイド媒介射。従って反映する。

**3.** $W(X)\sqcup_{\mathbf{Mon}}W(Y)$ は自由モノイド $W(\{a,b\})$ に同型である。集合の比較写像 $UW(X)\sqcup UW(Y)\to UW(\{a,b\})$ の像には一方の文字だけからなる語しかない。$ab$ は像に入らないので余積は保存されない。1・2は**極限**についての結論であり、余積は**余極限**なので矛盾しない。さらに右随伴である $U$ が保証されるのも極限の保存だけである。
<!-- solution-end -->

## 8. 次講へ：保存から存在の判定へ

この講では、随伴が**既に存在するとき**に、その左右が何を保存するかを完全に証明した。次の CAT2-12「一般随伴関手定理」では問いが反転する。極限を保存する関手から随伴の**存在**まで導くには、保存だけで足りず、完備性・局所小性・解集合条件を適切に組み合わせる必要がある。
