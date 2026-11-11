# CAT3-03 Eilenberg–Moore圏と比較関手

## 1. 計算を合成するだけでなく、結果を解釈したい

前講の[Kleisli圏](../CAT3-02/index.md#def-cat3-02-kleisli)では、モナド $(T,\eta,\mu)$ の射 $X\to TY$ を「効果付き計算」として合成した。しかし計算を重ねた後、その効果を受け取る対象をどう記述するかはまだ扱っていない。

例えば有限語モナド $TX=X^*$ では、語の連結は定まっているが、語 $[x_1,\ldots,x_n]$ を一つの値に**評価する規則**は一意に決まらない。整数の語なら和、積、最大値など、評価先の構造に応じた規則を選べる。任意に選んだ評価では、二重の語を「先に各語を評価する」場合と「先に連結する」場合で答えが違うかもしれない。

そこで、評価写像 $a:TA\to A$ に、単位を入れても変わらないことと、二段の効果をどちらの順序で解消しても同じことを要求する。このような対象と、評価を保つ射を集めて新しい圏を構成したい。

以下、$\mathcal C$ は局所小圏、$(T,\eta,\mu)$ は $\mathcal C$ 上の[モナド](../CAT3-01/index.md#def-cat3-01-monad)とする。合成は右から左へ読む。$T^2A=T(TA)$ であり、等式はつねに $\mathcal C$ の射の等式である。

## 2. モナド代数：二通りの評価を一致させる

値 $x\in A$ を $\eta_A$ で効果付きの値に変換してから $a$ で評価しても、元の値が戻るべきである。また、二重の効果 $T^2A$ について、$\mu_A$ で一段にしてから $a$ を適用することと、内側を $Ta$ で評価してから $a$ を適用することが一致してほしい。この二つは射の型がそれぞれ $A\to A$、$T^2A\to A$ と揃う条件である。

<a id="def-cat3-03-algebra"></a>

<!-- formal-statement-start -->
> **定義（モナド代数）**
> 局所小圏 $\mathcal C$ 上のモナド $(T,\eta,\mu)$ に対し、モナド代数（$T$-代数）は対象 $A\in\mathcal C$ と射 $a:TA\to A$ の組 $(A,a)$ で、次の単位律と結合律を満たすものとする。

$$
a\circ\eta_A=1_A,
\qquad
a\circ\mu_A=a\circ Ta:T^2A\longrightarrow A.
$$
<!-- formal-statement-end -->

<!-- definition-example-start: def-cat3-03-algebra -->
**定義の確認**（恒等モナド）。$T=1_{\mathcal C}$、$\eta_A=\mu_A=1_A$ とする。このとき $a:TA=A\to A$ であり、単位律は $a1_A=1_A$、従って $a=1_A$ を要求する。この唯一の候補について結合律は $1_A1_A=1_A1_A$ となる。したがって各対象 $A$ に代数 $(A,1_A)$ がただ一つ対応する。単位律を省いてよいわけではない。
<!-- definition-example-end -->

有限語の評価規則でこれを読むと、$a([x])=x$ が単位律であり、語の語 $[w_1,\ldots,w_k]$ に対して

$$
a(w_1\mathbin{+\!+}\cdots\mathbin{+\!+}w_k)
=a([a(w_1),\ldots,a(w_k)])
$$

が結合律である。空語を含めて成立するこの等式を、後でモノイドの公理へ結び付ける。

別の評価規則を持つ対象の間で、評価を保つ写像を考える。$f:A\to B$ が代数の射となる条件は、入力 $TA$ を先に $a$ で評価して $f$ で送る経路と、$Tf$ で効果付きのまま送って $b$ で評価する経路が同じ、というものである。

<a id="def-cat3-03-morphism"></a>

<!-- formal-statement-start -->
> **定義（モナド代数の射）**
> $T$-代数 $(A,a)$、$(B,b)$ の間の代数射 $f:(A,a)\to(B,b)$ は、$\mathcal C$ の射 $f:A\to B$ で次の等式を満たすものとする。

$$
f\circ a=b\circ Tf:TA\longrightarrow B.
$$
<!-- formal-statement-end -->

<!-- definition-example-start: def-cat3-03-morphism -->
**定義の確認**（恒等モナド）。先ほどの二代数 $(A,1_A)$ と $(B,1_B)$ の間では、任意の $f:A\to B$ に対し

$$
f1_A=f=1_Bf=1_B(Tf)
$$

が成り立つ。従って元の圏の射がすべて代数射になる。後の有限語の例では、この条件が任意の写像をモノイド準同型へ絞る。
<!-- definition-example-end -->

対象と射を用意したので、恒等射と合成が本当に代数射の条件を保つか確かめる。

<a id="def-cat3-03-em"></a>

<!-- formal-statement-start -->
> **定義（Eilenberg–Moore圏）**
> 局所小圏 $\mathcal C$ 上のモナド $(T,\eta,\mu)$ の Eilenberg–Moore圏 $\mathcal C^T$ は、対象をすべての $T$-代数 $(A,a)$ とし、Hom集合を

$$
\operatorname{Hom}_{\mathcal C^T}((A,a),(B,b))
=\{f\in\operatorname{Hom}_{\mathcal C}(A,B)\mid fa=bTf\}
$$

> とする。恒等射と合成は、$\mathcal C$ の恒等射と合成をそのまま用いる。
<!-- formal-statement-end -->

<!-- definition-example-start: def-cat3-03-em -->
**定義の確認**（恒等モナド）。各 $A$ の代数構造は $1_A$ のみであり、上の Hom は $\operatorname{Hom}_{\mathcal C}(A,B)$ に一致する。恒等射・合成も元の圏と同じなので、対象 $(A,1_A)$ を $A$ に対応させると圏同型が得られる。
<!-- definition-example-end -->

<a id="thm-cat3-03-em-category"></a>

<!-- formal-statement-start -->
> **定理（Eilenberg–Moore圏の圏公理）**
> 局所小圏 $\mathcal C$ 上の任意のモナド $(T,\eta,\mu)$ に対し、$\mathcal C^T$ は局所小圏である。代数射の恒等射と合成は上の定義に従い、単位律と結合律を満たす。
<!-- formal-statement-end -->

### 証明の見取り図

代数射かどうかは一つの可換条件で判定できる。$f:(A,a)\to(B,b)$ と $g:(B,b)\to(D,d)$ なら、二つの可換条件をつなぎ、関手 $T$ の合成保存を使えば $gf$ に対する条件が得られる。圏公理は元の圏から引き継ぐ。

<!-- proof-start -->
### 証明

$1_Aa=a=a1_{TA}=aT1_A$ より恒等射 $1_A$ は $(A,a)$ の代数射である。

代数射 $f$、$g$ はそれぞれ $fa=bTf$、$gb=dTg$ を満たす。従って

$$
\begin{aligned}
(gf)a&=g(fa)=g(bTf)\\
&=(gb)Tf=(dTg)Tf\\
&=d(Tg\circ Tf)=dT(gf).
\end{aligned}
$$

最後の式は[関手の合成保存](../CAT1-06/index.md#def-cat1-06-functor)による。従って合成は代数射で閉じる。恒等射と合成は元の圏から制限しただけなので、単位律と結合律も成立する。

Homは $\operatorname{Hom}_{\mathcal C}(A,B)$ の部分集合であり、$\mathcal C$ の局所小性から集合である。よって $\mathcal C^T$ は局所小圏となる。$\square$
<!-- proof-end -->

## 3. 自由代数と忘却関手：元のモナドが戻る

すべての対象に代数構造が存在するとは限らない。しかし $X$ に一度モナドを適用した $TX$ には、乗法 $\mu_X:T^2X\to TX$ がすでにある。これは自由な代数を与える。**自由**とは、任意の射 $f:X\to A$ が、代数射 $TX\to A$ に一意に延長できるという意味であり、単に「生成元を付けた」という比喩ではない。

<a id="thm-cat3-03-free-adjunction"></a>

<!-- formal-statement-start -->
> **定理（自由代数・忘却随伴）**
> 局所小圏 $\mathcal C$ 上のモナド $(T,\eta,\mu)$ に対し、自由代数関手 $F^T:\mathcal C\to\mathcal C^T$ と忘却関手 $U^T:\mathcal C^T\to\mathcal C$ を

$$
\begin{aligned}
F^T(X)&=(TX,\mu_X),&F^T(u)&=Tu,\\
U^T(A,a)&=A,&U^T(f)&=f
\end{aligned}
$$

> と定められる。$F^T\dashv U^T$ であり、各対象 $X\in\mathcal C$ と代数 $(A,a)$ について自然な全単射がある。

$$
\operatorname{Hom}_{\mathcal C^T}(F^TX,(A,a))
\ \cong\ \operatorname{Hom}_{\mathcal C}(X,A).
$$

> 対応は $h\mapsto h\eta_X$、逆対応は $f\mapsto aTf$ である。単位は $\eta_X$、余単位の $(A,a)$ での成分は $a:(TA,\mu_A)\to(A,a)$。誘導するモナドは元の $(T,\eta,\mu)$ に一致する。
<!-- formal-statement-end -->

### 証明の見取り図

$\mu_X$ 自身が代数の二公理を満たすことは[モナドの公理](../CAT3-01/index.md#def-cat3-01-monad)そのものである。逆対応 $f\mapsto aTf$ が代数射となる理由は、$\mu$ の自然性と $a$ の結合律にある。互いに逆であることは $a\eta_A=1_A$ と $\mu_XT\eta_X=1_{TX}$ で示せる。

<!-- proof-start -->
### 証明

**自由代数と関手性。** $F^TX=(TX,\mu_X)$ において $\mu_X\eta_{TX}=1_{TX}$ は単位律、$\mu_X\mu_{TX}=\mu_XT\mu_X$ は結合律である。

$u:X\to Y$ に対する $\mu$ の自然性は

$$
Tu\circ\mu_X=\mu_Y\circ T^2u
$$

なので $F^T(u)=Tu:(TX,\mu_X)\to(TY,\mu_Y)$ は代数射である。$T1_X=1_{TX}$ と $T(vu)=Tv\,Tu$ が関手性を与える。$U^T$ は代数射の underlying な射だけを取り出すので、恒等射・合成を保つ。

**Hom全単射。** 任意の $f:X\to A$ に対し $\widehat f=aTf:TX\to A$ を定める。$a$ の結合律と $f$ に対する $\mu$ の自然性を順に用いると

$$
\begin{aligned}
\widehat f\mu_X
&=aTf\mu_X=a\mu_A T^2f\\
&=aTa\,T^2f=aT(aTf)=aT\widehat f.
\end{aligned}
$$

従って $\widehat f$ は代数射である。単位律と $\eta$ の自然性より

$$
\widehat f\eta_X=aTf\eta_X=a\eta_A f=f.
$$

逆に代数射 $h:(TX,\mu_X)\to(A,a)$ なら $h\mu_X=aTh$ であり、モナドの右単位律を使うと

$$
\begin{aligned}
aT(h\eta_X)
&=aTh\,T\eta_X\\
&=h\mu_X\,T\eta_X=h.
\end{aligned}
$$

これで二つの対応は互いに逆である。$u:X'\to X$ と代数射 $k:(A,a)\to(B,b)$ に対して

$$
\widehat{fu}=aTf\,Tu=\widehat f\,F^Tu,
$$

$$
\widehat{kf}=bTk\,Tf=k\,aTf=k\widehat f
$$

が成り立つので、全単射は両変数で自然である。従って[Hom集合による随伴の定義](../CAT2-08/index.md#def-cat2-08-adjunction)から $F^T\dashv U^T$。

**単位・余単位・誘導モナド。** [転置公式](../CAT2-09/index.md#prop-cat2-09-transpose)で $1_{F^TX}$ の逆転置は $\eta_X$ である。また $(A,a)$ の恒等射 $1_A$ を自由代数からの射へ転置すると $\widehat {1_A}=aT1_A=a$ なので、余単位は $a$ となる。[随伴が誘導する乗法](../CAT3-01/index.md#thm-cat3-01-adjunction-monad)は

$$
U^T\varepsilon_{F^TX}=\mu_X:T^2X\longrightarrow TX
$$

である。$U^TF^T=T$ は対象・射で一致し、単位と乗法も $\eta,\mu$ に等しい。$\square$
<!-- proof-end -->

ここでの自由代数は $TX$ であり、一般の代数 $(A,a)$ と同じとは限らない。この差が次の二つの圏の比較に効いてくる。

## 4. 任意の随伴から比較関手を作る

任意の随伴 $L:\mathcal C\to\mathcal D$、$R:\mathcal D\to\mathcal C$ に対して、[随伴が誘導するモナド](../CAT3-01/index.md#thm-cat3-01-adjunction-monad)は $T=RL$、乗法 $\mu_X=R\varepsilon_{LX}$ を持つ。$\mathcal D$ の対象 $D$ からも $RD\in\mathcal C$ を得るが、その上には余単位 $\varepsilon_D:LRD\to D$ を $R$ で送った写像 $R\varepsilon_D:RLRD\to RD$ が自然にある。

この構造を付けて $\mathcal D$ の対象・射をモナド代数へ送ると、二つの圏を比べる関手が得られるはずである。以下 $\mathcal C,\mathcal D$ は局所小圏とする。

<a id="def-cat3-03-comparison"></a>

<!-- formal-statement-start -->
> **定義（比較関手）**
> 局所小圏の間の随伴 $L:\mathcal C\rightleftarrows\mathcal D:R$、単位 $\eta$、余単位 $\varepsilon$ から得るモナド $T=RL$ に対し、比較関手の候補 $K:\mathcal D\to\mathcal C^T$ は

$$
K(D)=(RD,R\varepsilon_D),\qquad
K(k:D\to D')=Rk
$$

> で与えられる。この組が実際に代数と代数射になることを、次の定理で確認する。
<!-- formal-statement-end -->

<!-- definition-example-start: def-cat3-03-comparison -->
**定義の確認**（恒等随伴）。$L=R=1_{\mathcal C}$、$\eta=\varepsilon=1$ の場合、$T=1_{\mathcal C}$ であり $K(D)=(D,1_D)$、$K(k)=k$。前節の恒等モナドの代数公理と代数射条件がすべて成立するので、この場合の $K$ は圏同型である。
<!-- definition-example-end -->

<a id="thm-cat3-03-comparison"></a>

<!-- formal-statement-start -->
> **定理（比較関手の構成）**
> 局所小圏 $\mathcal C,\mathcal D$ の間の随伴 $L\dashv R$ が単位 $\eta$ と余単位 $\varepsilon$ を持つとする。$T=RL$、$\mu_X=R\varepsilon_{LX}$ と置くと、上の $K:\mathcal D\to\mathcal C^T$ は well-defined な関手となる。さらに

$$
U^TK=R,\qquad KL=F^T
$$

> が対象と射の両方で成立する。
<!-- formal-statement-end -->

### 証明の見取り図

$R\varepsilon_D$ の単位律は[三角恒等式](../CAT2-09/index.md#def-cat2-09-triangle-data)の片方である。結合律は、余単位の自然性を射 $\varepsilon_D:LRD\to D$ に適用すると現れる。代数射の条件では同じ自然性を任意の $k:D\to D'$ に適用する。対象・射・関手性を混同しない。

<!-- proof-start -->
### 証明

$a_D:=R\varepsilon_D:T(RD)=RLRD\to RD$ と置く。随伴の三角恒等式は

$$
a_D\eta_{RD}=R\varepsilon_D\eta_{RD}=1_{RD}
$$

を与える。次に $\varepsilon:LR\Rightarrow1_{\mathcal D}$ の自然性を $\varepsilon_D:LRD\to D$ に適用すると

$$
\varepsilon_D\circ\varepsilon_{LRD}
=\varepsilon_D\circ LR\varepsilon_D
$$

である。両辺に $R$ を適用すると、左辺の第2因子は $\mu_{RD}=R\varepsilon_{LRD}$、右辺の第2因子は $Ta_D=RL(R\varepsilon_D)$ なので

$$
a_D\mu_{RD}=a_DTa_D.
$$

よって $K(D)$ は $T$-代数である。

$k:D\to D'$ に対する余単位の自然性 $\varepsilon_{D'}LRk=k\varepsilon_D$ を $R$ で送れば

$$
(Rk)\,a_D
=R(k\varepsilon_D)
=R(\varepsilon_{D'}LRk)
=a_{D'}\,T(Rk)
$$

となる。従って $K(k)=Rk$ は代数射である。$R$ が恒等射と合成を保つことから $K$ は関手となる。

$U^TK=R$ は定義から対象・射で直ちに確認できる。一方、$X\in\mathcal C$ に対し

$$
K(LX)=(RLX,R\varepsilon_{LX})=(TX,\mu_X)=F^TX.
$$

射 $u:X\to Y$ では $K(Lu)=R(Lu)=Tu=F^T(u)$ なので $KL=F^T$ も成立する。$\square$
<!-- proof-end -->

定理は比較関手の**存在**を示したのであって、一般に充満・忠実・本質的全射とは主張していない。比較関手が圏の同値となるための条件は、次の二講で検討する。

## 5. Kleisli圏は自由代数の部分だけを捉える

[Kleisli随伴](../CAT3-02/index.md#thm-cat3-02-adjunction)では、同じ $T$ から圏 $\mathcal C_T$ を作った。Kleisli射 $f:X\to TY$ を $f^\sharp=\mu_YTf:TX\to TY$ に持ち上げれば、自由代数の射になるはずである。

<a id="prop-cat3-03-kleisli-em"></a>

<!-- formal-statement-start -->
> **命題（Kleisli圏の自由代数への埋め込み）**
> 局所小圏 $\mathcal C$ 上の任意のモナド $(T,\eta,\mu)$ について、関手

$$
J:\mathcal C_T\longrightarrow\mathcal C^T,\qquad
J(X)=(TX,\mu_X),\qquad J(f:X\to TY)=f^\sharp
$$

> は完全忠実である。その本質像は自由代数 $(TX,\mu_X)$ に同型な代数全体である。
<!-- formal-statement-end -->

### 証明の見取り図

[Kleisli持ち上げの三法則](../CAT3-02/index.md#prop-cat3-02-extension-laws)が関手性を保証し、[自由代数の随伴](#thm-cat3-03-free-adjunction)のHom全単射が各Homでの全単射を保証する。特に $f^\sharp$ の逆対応は $f^\sharp\eta_X=f$ である。

<!-- proof-start -->
### 証明

任意の $f:X\to TY$ に対して、[自由代数のHom対応](#thm-cat3-03-free-adjunction)を代数 $(TY,\mu_Y)$ に適用すると、$f^\sharp=\mu_YTf$ は代数射である。

$J(1_X^{\mathcal C_T})=(\eta_X)^\sharp=1_{TX}$ である。Kleisli射 $f:X\to TY$、$g:Y\to TZ$ に対して

$$
J(g\star f)=(g^\sharp f)^\sharp=g^\sharp f^\sharp
=J(g)\circ J(f).
$$

ここでそれぞれ [Kleisli持ち上げの第1・第3法則](../CAT3-02/index.md#prop-cat3-02-extension-laws)を使った。従って $J$ は関手である。

固定した $X,Y$ に対して

$$
\operatorname{Hom}_{\mathcal C_T}(X,Y)
=\operatorname{Hom}_{\mathcal C}(X,TY)
\xrightarrow[\cong]{\,f\mapsto f^\sharp\,}
\operatorname{Hom}_{\mathcal C^T}(F^TX,F^TY)
$$

は [自由代数のHom全単射](#thm-cat3-03-free-adjunction)そのものであり、逆写像は $h\mapsto h\eta_X$。これにより $J$ は忠実かつ充満である。対象の像は定義から自由代数であり、本質像はそれと同型な代数全体である。$\square$
<!-- proof-end -->

すべての代数が自由とは限らない。従って**完全忠実**と**圏の同値**は別である。この区別を具体的にするため、語を評価する例へ戻ろう。

## 6. 有限語を評価できることとモノイドを持つことは同じ

ここでは $\mathcal C=\mathbf{Set}$、$TX=X^*$ とし、$\eta_X(x)=[x]$、$\mu_X$ は二重の語を連結する[有限語モナド](../CAT3-01/index.md#prop-cat3-01-list-monad)を用いる。

モノイドは、集合 $A$ に結合的な二項演算 $\cdot:A\times A\to A$ と両側単位元 $e\in A$ を備えた構造である。語の評価写像 $a:A^*\to A$ があれば、空語の値 $a([])$ を単位元、二文字語の値 $a([x,y])$ を積とみなせそうである。これが正しいために、代数の二公理は何を保証するのだろうか。

<a id="prop-cat3-03-list-monoids"></a>

<!-- formal-statement-start -->
> **命題（有限語モナドの代数とモノイド）**
> 集合上の有限語モナド $T(X)=X^*$ に対し、$T$-代数 $(A,a)$ を与えることは、集合 $A$ にモノイド構造 $(A,\cdot,e)$ を与えることと同値である。対応は

$$
e=a([]),\qquad x\cdot y=a([x,y]),\qquad
a([x_1,\ldots,x_n])=x_1\cdots x_n
$$

> と与えられ、$n=0$ の右辺は $e$ とする。代数射はちょうどモノイド準同型であり、Eilenberg–Moore圏 $\mathbf{Set}^T$ はモノイドの圏と同型である。
<!-- formal-statement-end -->

### 証明の見取り図

代数の結合律を二重の語 $[[x,y],[z]]$ と $[[x],[y,z]]$ に適用すると積の結合律が現れ、空語を含めると単位元が得られる。逆向きでは、モノイドの積で語を評価すれば、語を先に連結しても内側から評価しても同じになる。空語と一文字語まで確かめて初めて同値が言える。

<!-- proof-start -->
### 証明

**代数からモノイドへ。** $a\eta_A=1_A$ より、任意の $x\in A$ について

$$
a([x])=x.
$$

空語を $[]$ と書き $e=a([])$、$x\cdot y=a([x,y])$ と置く。二重の語 $[[],[x]]$ に代数の結合律 $a\mu_A=aTa$ を適用すると

$$
a([x])=a([a([]),a([x])])=a([e,x])=e\cdot x.
$$

$[[x],[]]$ に適用すると $x\cdot e=x$ も得る。次に $[[x,y],[z]]$ に適用して

$$
a([x,y,z])=a([a([x,y]),a([z])])=(x\cdot y)\cdot z
$$

を得る。一方 $[[x],[y,z]]$ に適用すると

$$
a([x,y,z])=a([a([x]),a([y,z])])=x\cdot(y\cdot z).
$$

したがって $\cdot$ は結合的で $e$ は両側単位元である。

さらに任意の語 $w=[x_1,\ldots,x_n]$ に対して $a(w)$ はこのモノイドの積に一致する。$n=0,1$ はすでに確認した。長さ $n-1$ の語 $v$ に帰納法の仮定を置き、二重の語 $[v,[x_n]]$ に結合律を適用すると

$$
a(v\mathbin{+\!+}[x_n])
=a([a(v),a([x_n])])=a(v)\cdot x_n.
$$

従って長さ $n$ でも成立する。

**モノイドから代数へ。** モノイド $(A,\cdot,e)$ から、空語の評価を $e$、非空語の評価を左からの積 $a([x_1,\ldots,x_n])=x_1\cdots x_n$ と定める。単位律 $a([x])=x$ は長さ1の積の定義から成り立つ。二重の語 $[w_1,\ldots,w_k]$ に対し、語を連結してから評価したものは、結合法則と単位元の性質により、各 $a(w_i)$ を順に掛けたものに等しい。つまり

$$
a\mu_A([w_1,\ldots,w_k])
=a(w_1)\cdots a(w_k)
=aTa([w_1,\ldots,w_k]).
$$

$k=0$ と各 $w_i=[]$ の場合も両辺は、空語の積を $e$ とする規約と $e\cdot x=x=x\cdot e$ により一致する。

**射の対応。** $f:(A,a)\to(B,b)$ が代数射なら、空語と二文字語を代数射条件 $fa=bTf$ に代入して

$$
f(e_A)=e_B,\qquad
f(x\cdot_A y)=f(x)\cdot_B f(y)
$$

を得る。逆に $f$ がこれらを満たすなら、語長について帰納することで

$$
f(a([x_1,\ldots,x_n]))
=b([f(x_1),\ldots,f(x_n)])
$$

となり、これは $fa=bTf$ にほかならない。対象・射の対応とその逆が恒等射・合成を保つので圏同型となる。$\square$
<!-- proof-end -->

**代数の直接計算**。$A=\{0,1\}$ に積を論理和 $\lor$、単位元を $0$ として入れると、$a([])=0$、$a([1,0,1])=1\lor0\lor1=1$ である。二重の語 $[[1,0],[],[0,1]]$ では、先に連結すると $[1,0,0,1]$ の評価 $1$、先に内側を評価すると $[1,0,1]$ の評価 $1$ となる。一般の場合も上の証明により一致する。この二元モノイドは自由ではない。実際、$X=\varnothing$ なら $X^*$ は一元集合、$X\ne\varnothing$ なら一つの文字 $x$ だけでも $[],[x],[x,x],\ldots$ がすべて異なり無限集合になるため、二元集合の自由モノイドは存在しない。

よって有限語モナドについて $\mathcal C_T$ の像は自由モノイドに限られる一方、$\mathcal C^T$ は上の二元モノイドも含む。これは[完全忠実な埋め込み](#prop-cat3-03-kleisli-em)が一般には圏の同値でない直接の理由である。

さらに自由モノイド関手 $L:\mathbf{Set}\to\mathbf{Mon}$ と忘却関手 $R:\mathbf{Mon}\to\mathbf{Set}$ の随伴を考えると、$R\varepsilon_M:(RM)^*\to RM$ は語を $M$ の演算で評価する写像である。したがって[比較関手](#def-cat3-03-comparison)はモノイド $M$ をその評価代数へ写す。上の命題によって、**この随伴の比較関手は圏同型**になる。比較関手が同値になる例と、[Kleisli随伴](../CAT3-02/index.md#thm-cat3-02-adjunction)からの比較関手が同値にならない例を同じモナドで比較できる。

## 7. 例外を受け取る代数は指定された値を持つ

集合 $E$ を固定し、[例外モナド](../CAT3-02/index.md#prop-cat3-02-exception) $TX=X\sqcup E$ を考える。$TA$ の通常値はそのまま返す必要があるが、例外タグ $e\in E$ はどの値へ戻すかを決めればよい。この選択を写像 $p:E\to A$ として記録できる。

<a id="prop-cat3-03-exception"></a>

<!-- formal-statement-start -->
> **命題（例外モナドの代数）**
> 集合 $E$ を固定した例外モナド $TX=X\sqcup E$ の代数は、集合 $A$ と写像 $p:E\to A$ の組に一対一に対応する。対応する構造写像は

$$
a(\operatorname{inl}x)=x,\qquad
a(\operatorname{inr}e)=p(e).
$$

> 二つの代数 $(A,p)$、$(B,q)$ の間の代数射は、$f:A\to B$ で $fp=q$ を満たすものとちょうど一致する。
<!-- formal-statement-end -->

### 証明の見取り図

単位律が成功側の値を固定する。結合律は $(A\sqcup E)\sqcup E$ の三種類のタグで全件確認でき、例外側の値 $p(e)$ にはこれ以上の制約を課さない。射では成功側の条件が自動で成立し、例外側が $fp=q$ となる。

<!-- proof-start -->
### 証明

例外モナドの単位は $\eta_A(x)=\operatorname{inl}x$ だから、$a\eta_A=1_A$ は $a(\operatorname{inl}x)=x$ と同値である。従って $a$ の残りの値は $p(e):=a(\operatorname{inr}e)$ で一意に指定される。

逆に任意の $p:E\to A$ から表示した $a$ を作る。$T^2A=(A\sqcup E)\sqcup E$ の元は三種類あり、$a\mu_A=aTa$ をそれぞれ確かめる。

1. $z=\operatorname{inl}(\operatorname{inl}x)$ の場合、$\mu_A(z)=\operatorname{inl}x$ と $Ta(z)=\operatorname{inl}x$ なので両辺は $x$。
2. $z=\operatorname{inl}(\operatorname{inr}e)$ の場合、$\mu_A(z)=\operatorname{inr}e$ と $Ta(z)=\operatorname{inl}(p(e))$ なので両辺は $p(e)$。
3. $z=\operatorname{inr}e$ の場合、$\mu_A(z)=\operatorname{inr}e$ と $Ta(z)=\operatorname{inr}e$ なので両辺は $p(e)$。

以上で結合律も成立する。

代数射 $f:A\to B$ の条件 $fa=bTf$ を $\operatorname{inl}x$ に適用すると左右とも $f(x)$。$\operatorname{inr}e$ に適用すると左辺は $f(p(e))$、右辺は $q(e)$。従って必要十分条件は $fp=q$ である。$\square$
<!-- proof-end -->

例えば $E=\{\mathrm{timeout},\mathrm{missing}\}$、$A=\{0,1,2\}$ とすると、$p(\mathrm{timeout})=0$、$p(\mathrm{missing})=2$ は一つの代数を定める。二種類の例外を別々に処理できる点が、単一の「失敗値」へ潰す場合との違いである。

## 8. 演習：代数の公理を射から再構成する

### 問題1：代数公理の型と恒等モナド

- Level: A
- 問題ID: CAT3-03-ALGEBRA-AXIOMS

局所小圏 $\mathcal C$ 上のモナド $(T,\eta,\mu)$ と射 $a:TA\to A$ を考える。代数の単位律・結合律を記し、両辺の始域・終域を答えよ。また恒等モナドで代数がただ一つに定まることを証明せよ。

<!-- solution-start -->
**詳細解答**：単位律は

$$
a\eta_A=1_A:A\to A
$$

である。$\eta_A:A\to TA$ なので左辺は $A\to A$ で型が合う。結合律は

$$
a\mu_A=aTa:T^2A\to A
$$

である。左辺は $\mu_A:T^2A\to TA$ と $a:TA\to A$ の合成、右辺は $Ta:T^2A\to TA$ と $a$ の合成である。

恒等モナドでは $TA=A$、$\eta_A=\mu_A=1_A$ だから単位律は $a1_A=1_A$、すなわち $a=1_A$ を強制する。この $a$ を代入すると結合律も $1_A1_A=1_A1_A$ と成り立つ。従って唯一の代数は $(A,1_A)$ である。$\square$
<!-- solution-end -->

### 問題2：自由語を評価する唯一の代数射

- Level: A
- 問題ID: CAT3-03-FREE-ALGEBRA

有限語モナドで $X=\{p,q\}$ とし、モノイド $(\mathbb N,+,0)$ を語の和で評価する代数 $(\mathbb N,a)$ とする。$f:X\to\mathbb N$ を $f(p)=2$、$f(q)=3$ としたとき、対応する代数射 $\widehat f:X^*\to\mathbb N$ を求め、$[p,q,p]$ と空語の像を計算せよ。代数射として一意な理由も説明せよ。

<!-- solution-start -->
**詳細解答**：[自由代数のHom対応](#thm-cat3-03-free-adjunction)を $A=\mathbb N$ に適用する。語 $w=[x_1,\ldots,x_n]$ に対し $Tf(w)=[f(x_1),\ldots,f(x_n)]$ であり、$a$ は語の各項を加える。よって

$$
\widehat f(w)=a(Tf(w))=\sum_{i=1}^n f(x_i).
$$

特に

$$
\widehat f([p,q,p])=2+3+2=7,\qquad
\widehat f([])=0.
$$

$\widehat f\,\eta_X(x)=\widehat f([x])=f(x)$。逆に代数射 $h:X^*\to\mathbb N$ が $h\eta_X=f$ を満たせば、$h\mu_X=aTh$ と $\mu_XT\eta_X=1_{TX}$ から

$$
h=h\mu_XT\eta_X=aThT\eta_X=aT(h\eta_X)=aTf=\widehat f.
$$

従ってこの代数射は一意である。$\square$
<!-- solution-end -->

### 問題3：代数射である写像とそうでない写像

- Level: A
- 問題ID: CAT3-03-ALGEBRA-MORPHISMS

有限語モナドの代数として $(\mathbb N,+,0)$ と $(\mathbb Z/2\mathbb Z,+,\overline0)$ を考える。写像 $f(n)=\overline n$ と $g(n)=\overline{n+1}$ のどちらが代数射か、空語と二文字語の評価も用いて判定せよ。

<!-- solution-start -->
**詳細解答**：[有限語代数とモノイドの対応](#prop-cat3-03-list-monoids)により、代数射は単位元と積を保つ写像である。$f(0)=\overline0$ であり、任意の $m,n\in\mathbb N$ に対して

$$
f(m+n)=\overline{m+n}=\overline m+\overline n
$$

なので $f$ は代数射である。例えば二文字語 $[2,3]$ に対して、先に和を評価して $f(5)=\overline1$、先に各文字を写して評価して $\overline2+\overline3=\overline1$ と一致する。空語も $f(0)=\overline0$。

一方 $g(0)=\overline1\ne\overline0$ であり、すでに空語の条件が破れる。二文字語 $[0,0]$ でも、先に評価すれば $g(0+0)=\overline1$、先に各文字を写せば $\overline1+\overline1=\overline0$ で一致しない。従って $g$ は代数射でない。$\square$
<!-- solution-end -->

### 問題4：比較関手の射の向き

- Level: A
- 問題ID: CAT3-03-COMPARISON-TYPES

随伴 $L:\mathcal C\rightleftarrows\mathcal D:R$ の単位を $\eta$、余単位を $\varepsilon$ とし、$T=RL$ とする。$D\in\mathcal D$ と $k:D\to D'$ に対し、$R\varepsilon_D$、$\mu_{RD}$、$T(R\varepsilon_D)$、$Rk$、$T(Rk)$ の型を列挙し、$Rk$ が代数射であるときの可換式を書け。

<!-- solution-start -->
**詳細解答**：$\varepsilon_D:LRD\to D$ に $R$ を適用するので

$$
R\varepsilon_D:RLRD\to RD.
$$

$T=RL$ を代入すれば $\mu_{RD}:T^2(RD)=RLRLRD\to RLRD$、$T(R\varepsilon_D):RLRLRD\to RLRD$ である。また

$$
Rk:RD\to RD',\qquad T(Rk):RLRD\to RLRD'.
$$

従って代数射条件は

$$
Rk\circ R\varepsilon_D
=R\varepsilon_{D'}\circ T(Rk):
RLRD\longrightarrow RD'
$$

である。これは余単位の自然性 $\varepsilon_{D'}LRk=k\varepsilon_D$ に $R$ を適用した式であり、型がすべて揃う。$\square$
<!-- solution-end -->

### 問題5：空語と三文字語からモノイド公理を復元する

- Level: B
- 問題ID: CAT3-03-LIST-ALGEBRA

集合 $A$ と有限語モナドの代数 $a:A^*\to A$ が与えられたとする。$e=a([])$、$x\cdot y=a([x,y])$ と置く。代数の二公理だけを使い、$e\cdot x=x=x\cdot e$ と $(x\cdot y)\cdot z=x\cdot(y\cdot z)$ をそれぞれ二重の語から示せ。また $a([x,y,z])$ をこの演算で表せ。

<!-- solution-start -->
**詳細解答**：単位律 $a\eta_A=1_A$ から $a([x])=x$。二重の語 $[[],[x]]$ に結合律 $a\mu_A=aTa$ を適用すると、左辺は $a([x])=x$、右辺は

$$
a([a([]),a([x])])=a([e,x])=e\cdot x.
$$

従って $e\cdot x=x$。$[[x],[]]$ に同じ計算をすると $x\cdot e=x$ が得られる。

次に同じ三文字語 $[x,y,z]$ を二通りに分割する。$[[x,y],[z]]$ に結合律を使うと

$$
a([x,y,z])=a([a([x,y]),a([z])])
=(x\cdot y)\cdot z.
$$

$[[x],[y,z]]$ からは

$$
a([x,y,z])=a([a([x]),a([y,z])])
=x\cdot(y\cdot z).
$$

両左辺は同じなので積の結合律が成立する。したがって $a([x,y,z])$ は括弧のどちらの付け方でも同じ積である。$\square$
<!-- solution-end -->

### 問題6：例外のラベルを区別する代数射

- Level: B
- 問題ID: CAT3-03-EXCEPTION-ALGEBRA

$E=\{r,s\}$、$A=\{0,1,2\}$、$B=\{u,v\}$ とする。例外モナドの代数 $(A,p)$、$(B,q)$ を $p(r)=0,p(s)=2$ および $q(r)=u,q(s)=v$ で定める。写像 $f:A\to B$ が代数射となる条件を列挙し、少なくとも二つの異なる代数射を与えよ。$p$ の二つの値が同じだった場合、$q(r)\ne q(s)$ のままで代数射は存在するか。

<!-- solution-start -->
**詳細解答**：[例外代数の射の特徴付け](#prop-cat3-03-exception)を $e=r,s$ へ適用する。必要十分条件は

$$
f(p(r))=q(r),\qquad f(p(s))=q(s),
$$

すなわち $f(0)=u$、$f(2)=v$ である。残る $f(1)$ は任意だから、$f_1(1)=u$ とした写像と $f_2(1)=v$ とした写像が二つの異なる代数射である。各 $f_i$ について成功側では $f_i(a)=f_i(a)$、例外側では指定された二式が成立する。

もし $p(r)=p(s)=a_0$ なら代数射条件は同じ値 $f(a_0)$ が $u$ と $v$ の両方に等しいことを要求する。$u\ne v$ なので不可能である。これは写像の存在が、ラベルの評価を保つ条件で制限される具体例である。$\square$
<!-- solution-end -->

### 問題7：Kleisli射を自由代数射へ持ち上げる

- Level: B
- 問題ID: CAT3-03-KLEISLI-EMBEDDING

有限語モナドで $X=\{x\}$、$Y=\{p,q\}$ とし、Kleisli射 $f:X\to Y^*$ を $f(x)=[p,q,p]$ とする。$Jf:X^*\to Y^*$ を求め、$[x,x]$ と空語の像を計算せよ。また任意の自由代数射 $h:X^*\to Y^*$ が $f=h\eta_X$ で一意に定まる理由を説明せよ。

<!-- solution-start -->
**詳細解答**：前講で定義した[Kleisli持ち上げ](../CAT3-02/index.md#def-cat3-02-extension)を使う。[埋め込み命題](#prop-cat3-03-kleisli-em)でこれが自由代数の射を与えることも確認済みである。具体的な写像は

$$
Jf=f^\sharp=\mu_YTf:X^*\to Y^*
$$

である。$Tf$ は語の各文字をその語の像で置き換えるため、

$$
Tf([x,x])=[[p,q,p],[p,q,p]]
$$

となる。乗法 $\mu_Y$ は二重の語を連結するので

$$
Jf([x,x])=[p,q,p,p,q,p].
$$

空語については $Tf([])=[]$、$\mu_Y([])=[]$ より $Jf([])=[]$。

逆に自由代数射 $h:(X^*,\mu_X)\to(Y^*,\mu_Y)$ があれば、$f=h\eta_X:X\to Y^*$ を作ることができる。代数射条件とモナドの右単位律により

$$
f^\sharp
=\mu_YT(h\eta_X)
=\mu_YTh\,T\eta_X
=h\mu_XT\eta_X=h.
$$

ゆえに $h=Jf$ であり、この構成は $h$ と $f$ の間の逆対応を与える。$\square$
<!-- solution-end -->

### 問題8：自由モノイド随伴の比較関手

- Level: B
- 問題ID: CAT3-03-COMPARISON-ADJUNCTION

集合から自由モノイドを作る関手 $L:\mathbf{Set}\to\mathbf{Mon}$ と忘却関手 $R:\mathbf{Mon}\to\mathbf{Set}$ の随伴を考える。モノイド $M$ に対する余単位 $\varepsilon_M:L(RM)\to M$ は語の積評価である。このとき比較関手 $K(M)$ の代数構造写像を明示し、$K$ が圏同型となる理由を対象・射について説明せよ。

<!-- solution-start -->
**詳細解答**：誘導モナドは $TX=X^*$ であり、$\varepsilon_M$ は自由モノイド $(RM)^*$ から $M$ へ語を積として評価する準同型である。忘却関手 $R$ は underlying な集合と写像を取るので

$$
K(M)=(RM,a_M),\qquad
a_M([m_1,\ldots,m_n])=m_1\cdots m_n,
\quad a_M([])=e_M.
$$

これは [有限語代数の特徴付け](#prop-cat3-03-list-monoids)のモノイドから代数への対応そのものである。逆に代数 $(A,a)$ から $e=a([])$ と $x\cdot y=a([x,y])$ を作ると、証明した単位律・結合律によりモノイドになり、その語評価が元の $a$ に等しい。従って $K$ は対象について逆構成を持つ。

さらに比較関手はモノイド準同型 $k:M\to N$ を underlying な写像 $Rk$ に送る。モノイド準同型は空語と有限積を保つから代数射である。逆に代数射は空語と二文字語への適用から単位元・積を保つのでモノイド準同型である。従ってHom集合でも互いに逆な対応になり、恒等射と合成は同じ写像として保たれる。これにより $K$ は圏同型となる。$\square$
<!-- solution-end -->

### 問題9：冪集合モナドにおける非自由な代数

- Level: C
- 問題ID: CAT3-03-NONFREE-COMPARISON

集合上の[冪集合モナド](../CAT3-01/index.md#prop-cat3-01-powerset-monad) $TX=\mathcal P(X)$ を考える。単位は $x\mapsto\{x\}$、乗法は集合族の合併である。次を証明せよ。

1. 代数 $a:\mathcal P(A)\to A$ に対して $x\le y$ を $a(\{x,y\})=y$ で定めると、$\le$ は半順序であり、任意の部分集合 $S\subseteq A$ の上限は $a(S)$ である。
2. 逆にすべての部分集合の上限を持つ半順序集合 $(A,\le)$ から $a(S)=\sup S$ と置くと $T$-代数になる。また代数射は任意の上限を保つ写像と一致する。
3. 三点鎖 $0<1<2$ は $T$-代数だが自由代数と同型でない。従ってこのモナドの Kleisli圏から Eilenberg–Moore圏への関手 $J$ は完全忠実でも本質的全射でない。

<!-- solution-start -->
**詳細解答**：

**（1）半順序と上限。** 単位律から $a(\{x\})=x$。結合律を集合族 $\mathscr S\subseteq\mathcal P(A)$ で書けば

$$
a\left(\bigcup_{S\in\mathscr S}S\right)
=a(\{a(S)\mid S\in\mathscr S\})
$$

である。反射律は $a(\{x,x\})=a(\{x\})=x$ で成立する。$x\le y$ かつ $y\le x$ なら同一集合 $\{x,y\}$ の評価が $y$ と $x$ の両方に等しく、$x=y$ となる。

推移律は $x\le y$、$y\le z$ を仮定して示す。結合律を $\mathscr S_1=\{\{x,y\},\{z\}\}$ に適用すると

$$
a(\{x,y,z\})=a(\{a(\{x,y\}),z\})=a(\{y,z\})=z.
$$

一方 $\mathscr S_2=\{\{x\},\{y,z\}\}$ に適用すると

$$
a(\{x,y,z\})=a(\{x,a(\{y,z\})\})=a(\{x,z\}).
$$

従って $a(\{x,z\})=z$、すなわち $x\le z$。よって半順序である。

任意の $S\subseteq A$ と $x\in S$ に対し、$\mathscr S=\{\{x\},S\}$ に結合律を適用すると

$$
a(S)=a(\{a(\{x\}),a(S)\})=a(\{x,a(S)\}),
$$

すなわち $x\le a(S)$。従って $a(S)$ は上界である。

他の上界 $b$ を任意に取る。全 $x\in S$ について $a(\{x,b\})=b$ である。集合族

$$
\mathscr F=\{\{x,b\}\mid x\in S\}\cup\{\{b\}\}
$$

では $\bigcup\mathscr F=S\cup\{b\}$ であり、各要素を $a$ で評価した集合は $\{b\}$ である。結合律から $a(S\cup\{b\})=a(\{b\})=b$。他方、集合族 $\{S,\{b\}\}$ に結合律を適用すると

$$
a(S\cup\{b\})=a(\{a(S),b\}).
$$

従って $a(\{a(S),b\})=b$、すなわち $a(S)\le b$。これで $a(S)=\sup S$ を示した。$S=\varnothing$ の場合も $\mathscr F=\{\{b\}\}$ なので議論は成立し、$a(\varnothing)$ は最小元となる。

**（2）逆構成と射。** すべての部分集合に上限があるなら、単集合の上限はその唯一の元だから $a(\{x\})=x$。集合族 $\mathscr S$ に対して左辺の上限 $\sup(\bigcup\mathscr S)$ と右辺の上限 $\sup\{\sup S\mid S\in\mathscr S\}$ は、どちらも

$$
\text{すべての }S\in\mathscr S\text{ のすべての元以上である最小の元}
$$

という同一の普遍性を持つ。よって等しく、代数の結合律が成立する。

写像 $f:A\to B$ の代数射条件は、各 $S\subseteq A$ について

$$
f(a(S))=b(\mathcal P(f)(S))
\quad\Longleftrightarrow\quad
f(\sup_A S)=\sup_B f[S]
$$

である。これは空集合も含む任意上限の保存そのものである。

**（3）非自由な例。** 三点鎖の任意の部分集合は有限であり、その上限は空集合なら $0$、非空なら最大元として存在する。従って（2）から代数が得られる。しかし自由代数は $(\mathcal P(X),\bigcup)$ の形である。$X=\varnothing$ なら $|\mathcal P(X)|=1$、$|X|=1$ なら2、$|X|\ge2$ なら4以上なので、三点集合との集合の全単射は存在しない。代数同型は underlying な集合の全単射を必要とするため、三点鎖はどの自由代数とも同型でない。

[埋め込み命題](#prop-cat3-03-kleisli-em)によって $J$ は完全忠実だが、その本質像は自由代数に同型なものに限られる。三点鎖が像に入らないので、$J$ は本質的全射ではない。$\square$
<!-- solution-end -->

---

Kleisli圏が効果付きの計算を、Eilenberg–Moore圏が効果を評価する代数を扱うことを、同じモナドから確かめた。次講では、一般の比較関手が単なる関手を超えて完全忠実・本質的全射となるために、どの余等化子と同型判定が必要になるかを調べる。
