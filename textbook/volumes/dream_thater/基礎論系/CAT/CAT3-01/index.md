# CAT3-01 モナドと随伴

## 1. 自由に作ってから忘れると、何が残るか

[自由モノイドと忘却関手の随伴](../CAT2-08/index.md#thm-cat2-08-free-monoid)では、集合 $X$ から語全体のモノイド $W(X)$ を作り、モノイドの演算を忘れて集合に戻す。集合から見れば、$X$ に「有限個の要素を並べた語」を付け加える操作

$$
T(X)=U(W(X))
$$

だけが残る。ただの自己関手より情報が多い。元 $x$ は一文字の語 $[x]$ に入れられ、語を要素とする語 $[[x,y],[z]]$ は $[x,y,z]$ に平らにできる。さらに「語の語の語」を平らにする順序が結果を変えてはならない。

この三つ、すなわち**自己関手**、**一段入れる操作**、**二段を一段に戻す操作**を整合的な公理にまとめたい。単なる集合上のプログラミングの構文ではなく、どの圏にも定義できる構造を次節で与える。

以下、$\mathcal C$ は[局所小圏](../CAT1-02/index.md#def-cat1-02-size)とし、必要に応じて別の圏 $\mathcal D$ を用いる。圏全体を小さいとは仮定しない。[関手の合成](../CAT1-06/index.md#def-cat1-06-composition)は $ST=S\circ T$、射の合成は右から左に読む。$1_{\mathcal C}$ は恒等関手、$1_X$ は対象 $X$ の恒等射であり、両者を区別する。

## 2. 自己関手と二つの自然変換

自己関手とは同じ圏から同じ圏への[共変関手](../CAT1-06/index.md#def-cat1-06-functor) $T:\mathcal C\to\mathcal C$ である。$T^2=TT$、$T^3=TTT$ と書き、例えば $T^2 X=T(TX)$ と読む。

各対象 $X$ について $X\to TX$ を与えるだけでは、射 $f:X\to Y$ と整合する保証がない。[自然変換](../CAT1-07/index.md#def-cat1-07-natural-transformation) $\eta:1_{\mathcal C}\Rightarrow T$ を要求すると、各 $f$ に対して

$$
Tf\circ\eta_X=\eta_Y\circ f
$$

が成り立つ。同様に $\mu:T^2\Rightarrow T$ なら

$$
Tf\circ\mu_X=\mu_Y\circ T^2f
$$

となる。$\eta$ を**単位**、$\mu$ を**乗法**という。ただし乗法は二つの数を掛ける写像ではなく、$T^2X\to TX$ という自然変換である。

一段入れてから平らにすると元に戻るはずだが、$TX$ を一つの要素として入れる道と、$X$ の要素をそれぞれ入れる道の**二つ**がある。

<a id="def-cat3-01-monad"></a>

<!-- formal-statement-start -->
> **定義（モナド）**
> 圏 $\mathcal C$ 上のモナドとは、自己関手 $T:\mathcal C\to\mathcal C$、自然変換 $\eta:1_{\mathcal C}\Rightarrow T$ および $\mu:T^2\Rightarrow T$ の三つ組 $(T,\eta,\mu)$ で、すべての対象 $X$ について次を満たすものである。
>
> **左右単位律**：$\mu_X\circ\eta_{TX}=1_{TX}$、$\mu_X\circ T\eta_X=1_{TX}$。
>
> **結合律**：$\mu_X\circ\mu_{TX}=\mu_X\circ T\mu_X$。
>
> 単位律の両辺は $TX\to TX$、結合律の両辺は $T^3X\to TX$ の射である。
<!-- formal-statement-end -->

ここで $\eta_{TX}:TX\to T^2X$ は**対象 $TX$ での $\eta$ の成分**、$T\eta_X:TX\to T^2X$ は**射 $\eta_X$ を関手 $T$ で写したもの**であり、一般に同じ射ではない。$\mu_{TX}:T^3X\to T^2X$ と $T\mu_X:T^3X\to T^2X$ も区別する。

<!-- definition-example-start: def-cat3-01-monad -->
**定義の確認**（恒等モナド）。$T=1_{\mathcal C}$、$\eta_X=1_X$、$\mu_X=1_X$ とする。任意の $f:X\to Y$ について $Tf=f$ なので、$f1_X=1_Yf$ かつ $f1_X=1_Yf$ から $\eta$、$\mu$ は自然である。また $T^2X=T^3X=X$ であり、二つの単位律も結合律も $1_X\circ1_X=1_X$ になる。自己関手性、自然性、三公理の**すべて**を確認した。
<!-- definition-example-end -->

以下で「モナドを作った」と主張するときは、単なる写像の提示にとどまらず、この自然性と三つの等式を検算する。

## 3. 随伴から単位と乗法を作る

[単位・余単位と三角恒等式](../CAT2-09/index.md#def-cat2-09-triangle-data)を持つ随伴 $F:\mathcal C\to\mathcal D$、$G:\mathcal D\to\mathcal C$、$F\dashv G$ を固定する。随伴の単位と余単位を

$$
\eta:1_{\mathcal C}\Rightarrow GF,\qquad
\varepsilon:FG\Rightarrow1_{\mathcal D}
$$

と記す。$GF$ は $\mathcal C$ の自己関手なので、$T=GF$ と置ける。$T^2X=GFGFX$ から $TX=GFX$ への射を作るには、真ん中の $FG$ を余単位で縮約すればよい：

$$
GFGFX\xrightarrow{\ G\varepsilon_{FX}\ }GFX.
$$

したがって $\mu_X=G\varepsilon_{FX}$ と定義する。一般に $\varepsilon_X$ とは書けない。余単位の成分を取る対象は $FX\in\mathcal D$ だからである。

<a id="thm-cat3-01-adjunction-monad"></a>

<!-- formal-statement-start -->
> **定理（随伴が誘導するモナド）**
> 圏 $\mathcal C,\mathcal D$ と随伴 $F:\mathcal C\to\mathcal D\dashv G:\mathcal D\to\mathcal C$ が、自然変換 $\eta:1_{\mathcal C}\Rightarrow GF$、$\varepsilon:FG\Rightarrow1_{\mathcal D}$ および二つの三角恒等式を備えるとする。このとき
>
> $T=GF$、$\eta:1_{\mathcal C}\Rightarrow T$、$\mu_X=G\varepsilon_{FX}:T^2X\to TX$
>
> は $\mathcal C$ 上のモナドをなす。
<!-- formal-statement-end -->

### 証明の見取り図

$\eta$ は元の随伴の単位なので自然性は既知である。$\mu$ の自然性は $\varepsilon$ の自然性を $Ff$ に適用して確認する。二つの単位律は**異なる二つの三角恒等式**から出る。結合律は $\varepsilon$ の自然性を射 $\varepsilon_{FX}$ そのものに適用する。

<!-- proof-start -->
### 証明

まず $F,G$ の関手性から $T=GF$ は自己関手であり、$\eta$ は既に自然変換である。$f:X\to Y$ について余単位の自然性を $Ff:FX\to FY$ に適用すると

$$
\varepsilon_{FY}\circ FG(Ff)=Ff\circ\varepsilon_{FX}
$$

となる。$G$ を適用して

$$
\underbrace{G\varepsilon_{FY}}_{\mu_Y}\circ\underbrace{GFGFf}_{T^2f}
=\underbrace{GFf}_{Tf}\circ\underbrace{G\varepsilon_{FX}}_{\mu_X}.
$$

よって $\mu:T^2\Rightarrow T$ は自然である。

次に[三角恒等式](../CAT2-09/index.md#def-cat2-09-triangle-data)の **$FX\in\mathcal D$** に関する側を読むと

$$
G\varepsilon_{FX}\circ\eta_{GFX}=1_{GFX}
$$

となる。$TX=GFX$ だからこれは $\mu_X\eta_{TX}=1_{TX}$、第一の単位律である。もう一方を **$X\in\mathcal C$** に適用すると

$$
\varepsilon_{FX}\circ F\eta_X=1_{FX}.
$$

両辺に $G$ を適用すれば

$$
G\varepsilon_{FX}\circ GF\eta_X=1_{GFX},
$$

すなわち $\mu_X\,T\eta_X=1_{TX}$ となる。

最後に $\varepsilon$ の自然性を射 $\varepsilon_{FX}:FGFX\to FX$ に適用する。このとき自然性の両経路は $FGFGFX\to FX$ で、

$$
\varepsilon_{FX}\circ FG(\varepsilon_{FX})
=\varepsilon_{FX}\circ\varepsilon_{FGFX}
$$

である。$G$ を適用して

$$
\underbrace{G\varepsilon_{FX}}_{\mu_X}
\circ\underbrace{GFG\varepsilon_{FX}}_{T\mu_X}
=\underbrace{G\varepsilon_{FX}}_{\mu_X}
\circ\underbrace{G\varepsilon_{FGFX}}_{\mu_{TX}}.
$$

両辺の型は $GFGFGFX=T^3X\to GFX=TX$ であり、結合律が従う。従って三公理を満たす。$\square$
<!-- proof-end -->

この証明は随伴の全単射を毎回持ち出さずに、[単位・余単位の記述とHomによる随伴の同値](../CAT2-09/index.md#cor-cat2-09-equivalence)を利用している。後続では逆向きに、モナドから随伴を作る圏を構成する。

## 4. 語のモナド：二重の語を連結する

前節の定理を[自由モノイド随伴](../CAT2-08/index.md#thm-cat2-08-free-monoid) $W\dashv U$ に適用する。集合 $X$ に対し $TX$ は有限語全体（空語 $[]$ も含む）で、写像 $f:X\to Y$ は各文字に $f$ を適用する $Tf:X^*\to Y^*$ を与える。$T^2X$ の元は「各文字が $X$ の語になっている語」である。

<a id="prop-cat3-01-list-monad"></a>

<!-- formal-statement-start -->
> **命題（自由モノイドから得る語のモナド）**
> 集合の圏 $\mathbf{Set}$ で $TX=X^*$（有限語集合）とし、$Tf$ を文字ごとに $f$ を作用させる写像とする。単位と乗法を

$$
\eta_X(x)=[x],\qquad
\mu_X([w_1,\dots,w_n])=w_1\mathbin{+\!+}\cdots\mathbin{+\!+}w_n
$$

> で定める。右辺は語の連結であり、$n=0$ なら空語とする。このとき $(T,\eta,\mu)$ はモナドであり、$W\dashv U$ が誘導するモナドに一致する。
<!-- formal-statement-end -->

### 証明の見取り図

自由モノイドの余単位は「語を、文字の像を順に掛けて評価する」準同型なので、$U\varepsilon_{WX}$ は語の語を連結する。随伴の定理で三公理が保証されるが、有限語の値で自然性・単位律・結合律を直接確認する。

<!-- proof-start -->
### 証明

$W$ は語を自由に作り、$U$ は積を忘れる。[自由モノイドの随伴](../CAT2-08/index.md#thm-cat2-08-free-monoid)における単位は $x\mapsto[x]$ である。$W(UX^*)$ の語 $[w_1,\ldots,w_n]$ に余単位 $\varepsilon_{WX}$ を適用すると、自由モノイド $WX$ 内で文字 $w_i$ を順に掛ける。これは語を順番につなぐ演算だから $\mu_X=U\varepsilon_{WX}$ と一致する。

直接の確認も行う。写像 $f:X\to Y$ と語 $[x_1,\ldots,x_n]$ について

$$
Tf(\eta_X(x))=[f(x)]=\eta_Y(f(x)),
$$

また $[w_1,\ldots,w_k]\in T^2X$ について

$$
Tf(\mu_X([w_i]_{i=1}^k))
=Tf(w_1)\mathbin{+\!+}\cdots\mathbin{+\!+}Tf(w_k)
=\mu_Y(T^2f([w_i]_{i=1}^k))
$$

なので二つの自然性を満たす。$w=[x_1,\ldots,x_n]\in TX$ に対し

$$
\mu_X(\eta_{TX}(w))=\mu_X([w])=w,
\qquad
\mu_X(T\eta_X(w))=\mu_X([[x_1],\ldots,[x_n]])=w.
$$

最後に $v=[v_1,\ldots,v_k]\in T^3X$ とし、各 $v_i=[w_{i1},\ldots,w_{i n_i}]$、各 $w_{ij}\in TX$ とする。$\mu_{TX}(v)$ は語 $w_{ij}$ をすべて一列に並べ、$T\mu_X(v)$ はまず各 $v_i$ 内を連結する。どちらへ $\mu_X$ を続けても、もとの $w_{11},w_{12},\ldots,w_{kn_k}$ を順に連結する同じ語になる。空語を含む場合も空の列の連結は空語という規約で同じ。$\square$
<!-- proof-end -->

たとえば $T^2\{a,b,c\}$ の元 $[[a,b],[],[c]]$ は $\mu$ により $[a,b,c]$ へ移る。$\eta_{T X}([a,b])=[[a,b]]$ と $T\eta_X([a,b])=[[a],[b]]$ は**異なる語**だが、どちらも平らにすれば $[a,b]$ である。この違いが二つの単位律を要する理由である。

## 5. 冪集合のモナド：集合族の合併

語を連結する構造が唯一の例ではない。集合 $X$ の冪集合 $\mathcal P(X)$ に対して、写像 $f:X\to Y$ から像集合を取る $\mathcal P f:\mathcal P X\to\mathcal P Y$ が得られる。$\mathcal P^2X$ の元は $X$ の部分集合の**集合**なので、合併によって一段にできる。

<a id="prop-cat3-01-powerset-monad"></a>

<!-- formal-statement-start -->
> **命題（冪集合モナド）**
> $\mathbf{Set}$ で $TX=\mathcal P(X)$、$Tf(A)=f[A]$ とする。集合 $X$ の元 $x$ と、$X$ の部分集合からなる集合族 $\mathcal A\subseteq\mathcal P(X)$ について、単位と乗法を

$$
\eta_X(x)=\{x\},\qquad
\mu_X(\mathcal A)=\bigcup_{A\in\mathcal A}A
$$

> で定めると $(T,\eta,\mu)$ はモナドである。空族の合併は空集合とする。
<!-- formal-statement-end -->

### 証明の見取り図

まず像集合が恒等写像・合成を保つことを確かめる。自然性は「像と合併が交換する」こと、単位律は一要素の集合族・一要素部分集合の合併、結合律は三段の集合族での二通りの合併を計算する。

<!-- proof-start -->
### 証明

$\mathcal P(1_X)(A)=A$、$\mathcal P(gf)(A)=(gf)[A]=g[f[A]]=(\mathcal P g)(\mathcal P f)(A)$ から $T$ は自己関手である。$f:X\to Y$、$x\in X$ について

$$
Tf(\eta_X(x))=f[\{x\}]=\{f(x)\}=\eta_Y(f(x))
$$

より $\eta$ は自然である。$\mathcal A\in\mathcal P^2(X)$ について

$$
\begin{aligned}
Tf(\mu_X(\mathcal A))
&=f\left[\bigcup_{A\in\mathcal A}A\right]
=\bigcup_{A\in\mathcal A}f[A]\\
&=\mu_Y\bigl(\{f[A]\mid A\in\mathcal A\}\bigr)
=\mu_Y(T^2f(\mathcal A)).
\end{aligned}
$$

よって $\mu$ も自然である。任意の $A\subseteq X$ について

$$
\mu_X(\eta_{TX}(A))=\bigcup\{A\}=A,
\qquad
\mu_X(T\eta_X(A))=\bigcup_{x\in A}\{x\}=A.
$$

三段の元 $\mathfrak A\in\mathcal P^3(X)$ を取る。$\mathfrak A$ の各元 $\mathcal A$ は部分集合の族、各 $A\in\mathcal A$ は $X$ の部分集合である。そこで

$$
\begin{aligned}
(\mu_X\circ\mu_{TX})(\mathfrak A)
&=\bigcup_{\mathcal A\in\mathfrak A}\ \bigcup_{A\in\mathcal A}A,\\
(\mu_X\circ T\mu_X)(\mathfrak A)
&=\bigcup\left\{\bigcup_{A\in\mathcal A}A\mid\mathcal A\in\mathfrak A\right\}
=\bigcup_{\mathcal A\in\mathfrak A}\ \bigcup_{A\in\mathcal A}A.
\end{aligned}
$$

両式は同じ元 $x\in X$ が「ある $\mathcal A\in\mathfrak A$ と $A\in\mathcal A$ に対し $x\in A$」となることを表す。結合律も成立する。$\square$
<!-- proof-end -->

例えば $X=\{a,b\}$、$\mathcal A=\{\varnothing,\{a\},\{a,b\}\}$ では $\mu_X(\mathcal A)=\{a,b\}$ である。語のモナドでは順序と重複を保つが、冪集合のモナドでは順序と重複を区別しない。この相違は自己関手の選び方に既に刻まれている。

## 6. $M\times-$：公理が何を要求するか

モナドの三公理は「ほぼ似た操作」を排除する。集合 $M$ に二項演算 $\star:M\times M\to M$ と指定元 $e\in M$ があるとする。$X$ の元に「印」$m\in M$ を添える操作 $TX=M\times X$ を考える。$M$ の演算がどの性質を要するかをモナド公理から逆に導こう。

<a id="prop-cat3-01-writer-criterion"></a>

<!-- formal-statement-start -->
> **命題（印付き集合のモナド判定）**
> 空でない集合 $M$、元 $e\in M$、二項演算 $\star$ を固定する。$\mathbf{Set}$ の自己関手を $TX=M\times X$、$Tf(m,x)=(m,f(x))$ とし、
>
> $\eta_X(x)=(e,x)$、$\mu_X(m,(n,x))=(m\star n,x)$
>
> とする。この三つ組がモナドとなる必要十分条件は、$e\star m=m=m\star e$ が任意の $m\in M$ で成り立ち、$\star$ が結合的なことである。つまり $(M,\star,e)$ がモノイドであることに等しい。
<!-- formal-statement-end -->

### 証明の見取り図

$T$ は第二成分にだけ写像を作用させるので関手性・自然性は演算の性質に依存しない。単位律を $(m,x)$ に、結合律を $(m,(n,(p,x)))$ に適用する。逆方向だけでなく必要性も $X=\{*\}$ で読み取る。

<!-- proof-start -->
### 証明

$T(1_X)(m,x)=(m,x)$、$T(gf)(m,x)=(m,g(f(x)))=Tg(Tf(m,x))$ である。写像 $f:X\to Y$ に対して

$$
Tf(\eta_X(x))=(e,f(x))=\eta_Y(f(x)),
$$

$$
Tf(\mu_X(m,(n,x)))=(m\star n,f(x))
=\mu_Y(T^2f(m,(n,x)))
$$

なので自然性も常に成立する。一方、単位律の二経路は

$$
\mu_X\eta_{TX}(m,x)=(e\star m,x),\qquad
\mu_X T\eta_X(m,x)=(m\star e,x).
$$

それぞれ $(m,x)$ に等しい必要十分条件は $e$ が左右の単位元であることである。結合律の二経路は

$$
\begin{aligned}
\mu_X\mu_{TX}(m,(n,(p,x)))&=((m\star n)\star p,x),\\
\mu_X T\mu_X(m,(n,(p,x)))&=(m\star(n\star p),x).
\end{aligned}
$$

全 $X,m,n,p,x$ について一致する十分条件は結合性であり、必要性は $X=\{*\}$ を選べば任意の $m,n,p$ に対する等式として読み取れる。従って必要十分条件が示された。$\square$
<!-- proof-end -->

「単位があるからモナドだろう」とは言えない。次の具体的な二項演算は $e$ を左右単位元に持つが、結合的でない。

| $\star$ | $e$ | $a$ | $b$ |
| --- | --- | --- | --- |
| $e$ | $e$ | $a$ | $b$ |
| $a$ | $a$ | $b$ | $e$ |
| $b$ | $b$ | $b$ | $a$ |

実際 $(a\star a)\star a=b\star a=b$、$a\star(a\star a)=a\star b=e$ だから結合律が破れる。$M\times-$ の $\eta,\mu$ は自然で二つの単位律を満たしても、結合律がないためモナドではない。この例は結合律を削除すると失うものが、**三段の印を処理する順序からの独立性**であると示している。

## 7. 演習：自然性と三公理を別々に検証する

### 問題1：二つの「一段入れる」を区別する

- Level: A
- 問題ID: CAT3-01-UNIT-TYPES

[冪集合モナド](#prop-cat3-01-powerset-monad)について $X=\{a,b\}$、$A=\{a,b\}\in TX$ とする。$\eta_{TX}(A)$ と $T\eta_X(A)$ を実際に書き、いずれも $T^2X$ に入ること、$\mu_X$ の像が一致することを示せ。

<!-- solution-start -->
**詳細解答**：$TX=\mathcal P(X)$、$T^2X=\mathcal P(\mathcal P(X))$ である。$\eta_{TX}$ は**集合 $TX$ の元 $A$** を一要素集合へ入れるから

$$
\eta_{TX}(A)=\{\{a,b\}\}.
$$

一方、$T\eta_X$ は写像 $\eta_X:X\to\mathcal P(X)$ の像集合を取るから

$$
T\eta_X(A)=\{\eta_X(a),\eta_X(b)\}=\{\{a\},\{b\}\}.
$$

両者はいずれも $X$ の部分集合を要素とする集合で、$T^2X$ に属するが互いには等しくない。[乗法の定義](#prop-cat3-01-powerset-monad)により

$$
\mu_X(\{\{a,b\}\})=\{a,b\},\qquad
\mu_X(\{\{a\},\{b\}\})=\{a\}\cup\{b\}=\{a,b\}.
$$

二つの単位律が同じ結論を持つ別の等式であると確認できた。$\square$
<!-- solution-end -->

### 問題2：語の自然性を有限集合で調べる

- Level: A
- 問題ID: CAT3-01-LIST-NATURALITY

$X=\{a,b\}$、$Y=\{0\}$ とし、$f(a)=f(b)=0$ とする。[語のモナド](#prop-cat3-01-list-monad)で $v=[[a,b],[],[b]]\in T^2X$ について $Tf(\mu_X(v))$ と $\mu_Y(T^2f(v))$ を両側から計算せよ。$[]$ と $[[]]$ を区別せよ。

<!-- solution-start -->
**詳細解答**：まず $\mu_X(v)=[a,b,b]$ なので

$$
Tf(\mu_X(v))=Tf([a,b,b])=[0,0,0].
$$

逆向きは $T^2f(v)=[[0,0],[],[0]]$ である。各内側の語へ $Tf$ を適用するので、中央の空語は変わらない。したがって

$$
\mu_Y(T^2f(v))=[0,0]\mathbin{+\!+}[]\mathbin{+\!+}[0]=[0,0,0].
$$

$[]$ は外側も内側も長さ $0$ の語、$[[]]$ は長さ $1$ で要素が空語である語で、前者に $\mu$ をかければ空語、後者にも $\mu$ をかければ空語だが、**入力は異なる**。$\square$
<!-- solution-end -->

### 問題3：空集合を含む集合族の合併

- Level: A
- 問題ID: CAT3-01-POWERSET-FLATTEN

$X=\{1,2,3\}$ とし、$\mathcal A=\{\varnothing,\{1,2\},\{2,3\}\}\in T^2X$ とする。$\mu_X(\mathcal A)$ を求めよ。また $\eta_{TX}(\varnothing)$ と $T\eta_X(\varnothing)$ を書き、それぞれ $\mu_X$ を作用させよ。

<!-- solution-start -->
**詳細解答**：乗法は集合族の合併だから

$$
\mu_X(\mathcal A)=\varnothing\cup\{1,2\}\cup\{2,3\}=\{1,2,3\}.
$$

$\varnothing$ は $TX$ の一つの元なので、$\eta_{TX}(\varnothing)=\{\varnothing\}$ は**空集合だけを要素とする集合族**である。一方、空集合の写像による像は常に空なので $T\eta_X(\varnothing)=\varnothing$ は**空の集合族**である。よって異なる二元に対し

$$
\mu_X(\{\varnothing\})=\varnothing,\qquad
\mu_X(\varnothing)=\varnothing.
$$

いずれも二つの単位律の要求に一致する。$\square$
<!-- solution-end -->

### 問題4：加法による印の合成

- Level: A
- 問題ID: CAT3-01-WRITER-Z2

$M=\{0,1\}$、$m\star n$ を $2$ で割った剰余としての $m+n$、$e=0$ とする。$TX=M\times X$ について $\mu_X(1,(1,x))$ と、$v=(1,(0,(1,x)))\in T^3X$ に対する $\mu_X\mu_{TX}(v)$ と $\mu_X T\mu_X(v)$ を型に注意して求め、三公理を満たす理由を説明せよ。

<!-- solution-start -->
**詳細解答**：最初は $T^2X$ の元なので

$$
\mu_X(1,(1,x))=(1+1\bmod 2,x)=(0,x).
$$

次の $(1,(0,(1,x)))$ は $T^3X$ の元である。$\mu_{TX}$ を先に作用させると $(1,(1,x))$、続けて $\mu_X$ で $(0,x)$ になる。$T\mu_X$ を先に作用させると $(1,(1,x))$、続けて $\mu_X$ でも $(0,x)$ となる。

$0+m=m+0=m\pmod2$ なので二つの単位律が成立する。また剰余加法は $(m+n)+p\equiv m+(n+p)\pmod2$ なので[印付き集合の判定命題](#prop-cat3-01-writer-criterion)の結合律条件も満たす。自然性と自己関手性は同命題の証明で任意の $\star$ に対し確認済みだから、これはモナドである。$\square$
<!-- solution-end -->

### 問題5：余単位の自然性から乗法の自然性へ

- Level: B
- 問題ID: CAT3-01-MULTIPLICATION-NATURAL

$F:\mathcal C\to\mathcal D$、$G:\mathcal D\to\mathcal C$ が随伴で、余単位 $\varepsilon:FG\Rightarrow1_{\mathcal D}$ を持つとする。$f:X\to Y$ について $\mu_X=G\varepsilon_{FX}$ が自然変換 $T^2\Rightarrow T$（$T=GF$）になることを、関手 $G$ を作用させる前と後の二段で再導出せよ。

<!-- solution-start -->
**詳細解答**：まず $Ff:FX\to FY$ は $\mathcal D$ の射である。[余単位の自然性](../CAT2-09/index.md#def-cat2-09-counit)の自然性正方形をこの射へ適用すると、始域 $FGFX$、終域 $FY$ を持つ二経路について

$$
Ff\circ\varepsilon_{FX}=\varepsilon_{FY}\circ FG(Ff)
$$

を得る。ここでは $FG(Ff)$ の始域は $FGFX$、終域は $FGFY$ である。次に関手 $G$ を適用し、合成保存を使うと

$$
GFf\circ G\varepsilon_{FX}=G\varepsilon_{FY}\circ GFGFf.
$$

$GFf=Tf$、$G\varepsilon_{FX}=\mu_X$、$G\varepsilon_{FY}=\mu_Y$、$GFGFf=T^2f$ だから、これは $Tf\circ\mu_X=\mu_Y\circ T^2f$ である。両辺は $T^2X\to TY$ の射で、自然性を満たす。$\square$
<!-- solution-end -->

### 問題6：三段の冪集合の合併

- Level: B
- 問題ID: CAT3-01-POWERSET-ASSOCIATIVITY

$X=\{p,q\}$、$\mathcal A=\{\{p\},\varnothing\}$、$\mathcal B=\{\{q\}\}$、$\mathfrak A=\{\mathcal A,\mathcal B\}\in T^3X$ とする。$\mu_{TX}(\mathfrak A)$ と $T\mu_X(\mathfrak A)$ を別々に求め、さらに $\mu_X$ を作用させよ。二つの途中結果は等しくなくてもよいことを確認せよ。

<!-- solution-start -->
**詳細解答**：$\mathcal A,\mathcal B$ は $TX$ の部分集合、$\mathfrak A$ はそれらからなる集合なので確かに $T^3X=\mathcal P(\mathcal P(\mathcal P X))$ の元である。$\mu_{TX}$ は $TX$ の部分集合たちの合併を取るから

$$
\mu_{TX}(\mathfrak A)
=\mathcal A\cup\mathcal B
=\{\{p\},\varnothing,\{q\}\}.
$$

次に $T\mu_X$ は $\mathcal A$ と $\mathcal B$ をそれぞれ $\mu_X$ で写してから集合を取るので

$$
T\mu_X(\mathfrak A)
=\{\mu_X(\mathcal A),\mu_X(\mathcal B)\}
=\{\{p\},\{q\}\}.
$$

途中結果は前者には $\varnothing$ が含まれ、後者には含まれないため等しくない。しかし両者へ $\mu_X$ を適用すると

$$
\{p\}\cup\varnothing\cup\{q\}=\{p,q\}
=\{p\}\cup\{q\}.
$$

従って結合律が要求するのは**二回平らにした最終結果**の一致であり、一回目の結果の一致ではない。$\square$
<!-- solution-end -->

### 問題7：自由モノイド随伴での単位と評価

- Level: B
- 問題ID: CAT3-01-FREE-MONOID-TRIANGLES

$W:\mathbf{Set}\to\mathbf{Mon}$ を自由モノイド関手、$U:\mathbf{Mon}\to\mathbf{Set}$ を忘却関手とする。モノイド $N$ の元 $n$ と集合 $X$ の語 $[x_1,\ldots,x_k]$ に対し、$U\varepsilon_N\circ\eta_{UN}$ と $\varepsilon_{WX}\circ W\eta_X$ をそれぞれ計算して恒等射になることを示せ。前者では余単位を $N$ で、後者では $WX$ で評価すること。

<!-- solution-start -->
**詳細解答**：$\eta_{UN}:UN\to UWUN$ は $n$ を一文字の語 $[n]$ に移す。一方、$\varepsilon_N:WUN\to N$ は語 $[n_1,\dots,n_k]$ を $N$ 内の積 $n_1\cdots n_k$ へ送る。従って

$$
(U\varepsilon_N\circ\eta_{UN})(n)=U\varepsilon_N([n])=n.
$$

これが $1_{UN}$ である。もう一方では $W\eta_X:WX\to W(UWX)$ は語を一文字ずつ一要素の語へ置き換え、

$$
W\eta_X([x_1,\ldots,x_k])=[[x_1],\ldots,[x_k]].
$$

$\varepsilon_{WX}$ は $WX$ 内の積すなわち連結を行うから

$$
(\varepsilon_{WX}\circ W\eta_X)([x_1,\ldots,x_k])
=[x_1]\mathbin{+\!+}\cdots\mathbin{+\!+}[x_k]
=[x_1,\ldots,x_k].
$$

$k=0$ の場合も両方が空語を保つ。従って二つの[三角恒等式](../CAT2-09/index.md#def-cat2-09-triangle-data)が確かに成立し、これらから前節の語のモナドの単位律が従う。$\square$
<!-- solution-end -->

### 問題8：定数一元集合のモナドと失敗例

- Level: B
- 問題ID: CAT3-01-CONSTANT-TERMINAL

$\mathbf{Set}$ 上の関手 $T$ がすべての集合を一元集合 $1=\{*\}$ へ、すべての写像を $1_1$ へ送るとする。自然変換 $\eta:1_{\mathbf{Set}}\Rightarrow T$ と $\mu:T^2\Rightarrow T$ を構成して三公理を確かめよ。さらに、すべての集合を空集合へ送る定数関手 $Z$ については $1_{\mathbf{Set}}\Rightarrow Z$ が存在しない理由を説明せよ。

<!-- solution-start -->
**詳細解答**：各 $X$ について $\eta_X:X\to1$ は唯一の写像 $x\mapsto*$ とする。$T^2X=T1=1$ なので $\mu_X:1\to1$ は唯一の写像 $1_1$ とする。任意の $f:X\to Y$ で

$$
Tf\,\eta_X=1_1\eta_X=\eta_X=\eta_Yf
$$

である。$T^2f=1_1$ より $Tf\,\mu_X=1_1=\mu_Y T^2f$ でもある。単位律は $TX=T^2X=1$ の恒等射どうしの合成になり、結合律も $1_1=1_1$ となる。従ってモナドである（$X=\varnothing$ でも $\eta_X$ は唯一の空写像として存在する）。

一方 $X=\{x\}$ を選ぶと $Z X=\varnothing$ で、$x$ の像を指定できる $X\to\varnothing$ は存在しない。従って $Z$ 自体は恒等写像・合成を保つ自己関手だが、**単位に必要な自然変換の成分すら作れない**。公理の成否以前に型の条件が失われている。$\square$
<!-- solution-end -->

### 問題9：単位律があっても結合律が壊れる

- Level: C
- 問題ID: CAT3-01-NONASSOCIATIVE-WRITER

$M=\{e,a,b\}$ に対して次の二項演算を与える。

| $\star$ | $e$ | $a$ | $b$ |
| --- | --- | --- | --- |
| $e$ | $e$ | $a$ | $b$ |
| $a$ | $a$ | $b$ | $e$ |
| $b$ | $b$ | $b$ | $a$ |

$TX=M\times X$、$Tf(m,x)=(m,f(x))$、$\eta_X(x)=(e,x)$、$\mu_X(m,(n,x))=(m\star n,x)$ と定める。このデータについて次を示せ。

1. 自己関手性と二つの自然性。
2. 左右単位律。
3. $X=\{*\}$ の元を使った結合律の不成立。

最後に「自然な乗法がある」だけでは随伴由来と結論できない理由を述べよ。

<!-- solution-start -->
**詳細解答**：(i) 任意の $f:X\to Y$、$g:Y\to Z$ に対し、

$$
T1_X(m,x)=(m,x),\qquad Tg(Tf(m,x))=(m,g(f(x)))=T(gf)(m,x).
$$

よって $T$ は自己関手である。$Tf(\eta_X(x))=(e,f(x))=\eta_Y(f(x))$ だから $\eta$ は自然。さらに $T^2f(m,(n,x))=(m,(n,f(x)))$ で、

$$
\mu_Y(T^2f(m,(n,x)))=(m\star n,f(x))
=Tf(\mu_X(m,(n,x)))
$$

なので $\mu$ も自然である。この確認には $\star$ の結合性を用いていない。

(ii) 表の $e$ の行と列から $e\star m=m=m\star e$ である。任意の $(m,x)\in TX$ について

$$
\mu_X\eta_{TX}(m,x)=(e\star m,x)=(m,x),
\qquad
\mu_X T\eta_X(m,x)=(m\star e,x)=(m,x).
$$

ゆえに左右単位律はともに成り立つ。

(iii) $X=\{*\}$、$v=(a,(a,(a,*)))\in T^3X$ を取る。まず $\mu_{TX}(v)=(a\star a,(a,*))=(b,(a,*))$ なので

$$
(\mu_X\mu_{TX})(v)=(b\star a,*)=(b,*).
$$

逆に $T\mu_X(v)=(a,(a\star a,*))=(a,(b,*))$ だから

$$
(\mu_X T\mu_X)(v)=(a\star b,*)=(e,*).
$$

$b\ne e$ なので二つの射 $T^3X\to TX$ は一致しない。従って結合律を欠き、この三つ組は[モナドの定義](#def-cat3-01-monad)を満たさない。[随伴が誘導するモナドの定理](#thm-cat3-01-adjunction-monad)では随伴の余単位から作った乗法は必ず結合律を満たす。したがってこのデータ全体が**その形で随伴から誘導されたもの**であるとは結論できず、実際にそうではない（同じ自己関手が別の構造で随伴に関係する可能性まで否定するものではない）。$\square$
<!-- solution-end -->

## 8. 次講へ：なぜモナドから圏を作るのか

モナドは随伴から構成できたが、抽象的な $(T,\eta,\mu)$ を与えられたとき、どのような随伴が背後にあるのかはまだ説明していない。次講 **CAT3-02「Kleisli圏」** では、$X\to TY$ という射を $X\to Y$ の代わりに使い、$\mu$ を合成へ組み込む。そこで合成の結合律と単位律が、まさに今回の三公理から従うことを証明する。

