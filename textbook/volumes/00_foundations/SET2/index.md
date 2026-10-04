# SET2 順序数：整列の位置を集合で表す

<!-- definition-example-audit: strict -->

整列集合では「最初の元」「その次の元」「その次の元」と順番に進めます。有限集合なら 0,1,2,3 という番号で十分ですが、無限に進んだあとにも

- 自然数を全部通過した位置、
- その次の位置、
- さらにその先

を区別したくなります。

外から番号札を貼るのではなく、**位置そのものを集合として作る**のが von Neumann 順序数です。

基本形は

$$
0=\varnothing,
\qquad
1=\{0\},
\qquad
2=\{0,1\},
\qquad
3=\{0,1,2\}.
$$

ここでは「小さい順序数が大きい順序数の元になる」ように作られています。したがって

$$
\beta<\alpha
\quad\Longleftrightarrow\quad
\beta\in\alpha
$$

という非常に強い表現が可能になります。

---

## 1. まず「下に閉じた集合」を定義する

順序数では、ある位置 $\alpha$ より前にあるものを全て $\alpha$ 自身の元として持たせます。この性質を集合論の言葉で表したものが推移的集合です。

<a id="def-set2-transitive-set"></a>
<!-- formal-statement-start -->
### 定義（推移的集合）

集合 $T$ が **推移的** であるとは、

$$
x\in y\in T
\Longrightarrow
x\in T
$$

が成り立つことをいう。

同値に、

$$
y\in T
\Longrightarrow
y\subseteq T
$$

である。
<!-- formal-statement-end -->

<!-- definition-example-start: def-set2-transitive-set -->
**定義の確認。**

$$
2=\{0,1\}
=
\{\varnothing,\{\varnothing\}\}
$$

を考えます。

$0=\varnothing$ には元がありません。$1=\{0\}$ の唯一の元 $0$ は $2$ に入っています。従って $2$ は推移的です。

一方

$$
A=\bigl\{\{0\}\bigr\}=\{1\}
$$

では $0\in1\in A$ ですが $0\notin A$ なので、$A$ は推移的ではありません。
<!-- definition-example-end -->

---

## 2. von Neumann 順序数

前章までに「整列」は、全順序であり、任意の非空部分集合が最小元を持つ順序として定義しました。

ここでは集合 $\alpha$ の元同士を、所属関係 $\in$ そのもので並べます。

<a id="def-set2-ordinal"></a>
<!-- formal-statement-start -->
### 定義（von Neumann 順序数）

集合 $\alpha$ に対し、$\alpha$ 上の関係 $\preceq_\alpha$ を

$$
\beta\preceq_\alpha\gamma
\quad\Longleftrightarrow\quad
\beta=\gamma
\ \text{または}\ 
\beta\in\gamma
$$

で定める。

$\alpha$ が **順序数** であるとは、

1. $\alpha$ が推移的であり、
2. $\preceq_\alpha$ が $\alpha$ 上の整列を与える

ことをいう。

このとき厳密な大小は

$$
\beta<\gamma
\quad\Longleftrightarrow\quad
\beta\in\gamma
$$

と書く。
<!-- formal-statement-end -->

<!-- definition-example-start: def-set2-ordinal -->
**定義の確認：$3$。**

$$
3=\{0,1,2\}
$$

です。

まず $0\subseteq3$, $1=\{0\}\subseteq3$, $2=\{0,1\}\subseteq3$ なので $3$ は推移的です。

厳密な大小は所属関係で

$$
0\in1,\qquad
0\in2,\qquad
1\in2
$$

となります。したがって $\preceq_3$ は

$$
0\preceq_3 1\preceq_3 2
$$

という全順序を与えます。非空部分集合
$\{0,2\}$ の最小元は $0$、
$\{1,2\}$ の最小元は $1$ です。

従って $3$ は順序数です。
<!-- definition-example-end -->

順序数 $\alpha$ では、$\alpha$ より前の全ての順序数を $\alpha$ の元として持つことになります。そのためには、まず「順序数の元も順序数」であることを証明する必要があります。

---

## 3. 順序数の元は順序数

<a id="thm-set2-element-is-ordinal"></a>
<!-- formal-statement-start -->
### 定理（順序数の元は順序数）

$\alpha$ を順序数とし、

$$
\beta\in\alpha
$$

とする。このとき $\beta$ も順序数である。
<!-- formal-statement-end -->

### 証明の見取り図

$\alpha$ は推移的なので $\beta\subseteq\alpha$ です。従って $\alpha$ 上の整列を $\beta$ に制限できます。残る問題は $\beta$ 自身が推移的かどうかです。これは $\in$ が $\alpha$ 上で推移的な順序関係であることから従います。

<!-- proof-start -->
### 証明

$\alpha$ が推移的で $\beta\in\alpha$ なので、

$$
\beta\subseteq\alpha.
$$

したがって $\preceq_\alpha$ を $\beta$ に制限した関係は、定義から $\preceq_\beta$ です。したがって $\beta$ 上でも全順序で、任意の非空部分集合は $\alpha$ 上の整列によって最小元を持ちます。

次に $\beta$ が推移的であることを示します。

$$
x\in y\in\beta
$$

とします。$\beta\subseteq\alpha$ なので $y\in\alpha$、また $\beta\in\alpha$ です。

$\preceq_\alpha$ は推移的です。ここで $x\in y$ と $y\in\beta$ はそれぞれ $x\prec_\alpha y$ と $y\prec_\alpha\beta$ を意味するので、

$$
x\in y,\qquad y\in\beta
$$

から

$$
x\in\beta.
$$

よって $\beta$ は推移的です。

以上より $\beta$ は順序数です。$\square$
<!-- proof-end -->

この定理により、順序数 $\alpha$ は「自分より前の順序数を全部集めた集合」として読めます。

---

## 4. 後続順序数

自然数で $n$ の次を作った

$$
S(n)=n\cup\{n\}
$$

という操作は、任意の順序数にそのまま拡張できます。

<a id="def-set2-successor-ordinal"></a>
<!-- formal-statement-start -->
### 定義（後続順序数）

順序数 $\alpha$ に対し、

$$
S(\alpha)
=
\alpha\cup\{\alpha\}
$$

を $\alpha$ の **後続順序数** という。
<!-- formal-statement-end -->

<!-- definition-example-start: def-set2-successor-ordinal -->
**定義の確認。**

$$
S(2)
=
2\cup\{2\}
=
\{0,1,2\}
=
3.
$$

また自然数を全て含む順序数 $\omega$ に対して

$$
S(\omega)=\omega\cup\{\omega\}
$$

は $\omega$ 自身を新しい最後の元として追加します。これは通常 $\omega+1$ と書きます。
<!-- definition-example-end -->

<a id="thm-set2-successor-ordinal"></a>
<!-- formal-statement-start -->
### 定理（順序数の後続は順序数）

$\alpha$ が順序数なら

$$
S(\alpha)=\alpha\cup\{\alpha\}
$$

も順序数である。
<!-- formal-statement-end -->

<!-- proof-start -->
### 証明

まず $S(\alpha)$ が推移的であることを示します。

$x\in y\in S(\alpha)$ とします。$y\in\alpha$ なら $\alpha$ の推移性から $x\in\alpha\subseteq S(\alpha)$ です。

$y=\alpha$ なら $x\in\alpha\subseteq S(\alpha)$ です。

したがって $S(\alpha)$ は推移的です。

次に $\preceq_{S(\alpha)}$ が $S(\alpha)$ を整列することを確認します。$\alpha$ 上への制限は $\preceq_\alpha$ なので既に整列です。また全ての $\beta\in\alpha$ について

$$
\beta\in\alpha,
$$

つまり新しい元 $\alpha$ はそれまでの全元より後ろに来ます。

非空部分集合 $A\subseteq S(\alpha)$ を取ります。$A\cap\alpha$ が非空なら、$\alpha$ の整列性から $A\cap\alpha$ に最小元があり、それが $A$ の最小元です。

$A\cap\alpha=\varnothing$ なら、$A$ の元は $\alpha$ しかないので $A=\{\alpha\}$ であり、最小元は $\alpha$ です。

従って $\preceq_{S(\alpha)}$ は $S(\alpha)$ を整列し、$S(\alpha)$ は順序数です。$\square$
<!-- proof-end -->

---

## 5. 順序数どうしは必ず比較できる

順序数が本当に「位置の標準形」になるには、任意の二つが比較可能でなければなりません。

まず一つ補題を示します。

<a id="lem-set2-transitive-subset-initial"></a>
<!-- formal-statement-start -->
### 補題（順序数の推移的部分集合は初期部分）

$\alpha$ を順序数、$T\subseteq\alpha$ を推移的集合とする。

このとき

$$
T=\alpha
$$

または、ある $\gamma\in\alpha$ に対して

$$
T=\gamma
$$

である。
<!-- formal-statement-end -->

<!-- proof-start -->
### 証明

$T\ne\alpha$ とします。差集合

$$
\alpha\setminus T
$$

は非空なので、$\in$ による整列性から最小元 $\gamma$ を持ちます。

まず $T\subseteq\gamma$ を示します。$x\in T$ とします。$\alpha$ 上では $x$ と $\gamma$ は比較可能です。

もし $\gamma\in x$ なら、$T$ の推移性と $x\in T$ から $\gamma\in T$ となり、$\gamma\notin T$ に反します。$x=\gamma$ も $\gamma\notin T$ に反します。従って

$$
x\in\gamma.
$$

よって $T\subseteq\gamma$。

逆に $x\in\gamma$ とします。$\gamma$ は $\alpha$ の元で、$\alpha$ は推移的なので $x\in\alpha$ です。もし $x\notin T$ なら $x\in\alpha\setminus T$ ですが、

$$
x\in\gamma
$$

なので $\gamma$ が差集合の最小元であることに反します。従って $x\in T$。

よって $\gamma\subseteq T$ であり、

$$
T=\gamma.
$$

$\square$
<!-- proof-end -->

<a id="thm-set2-ordinal-trichotomy"></a>
<!-- formal-statement-start -->
### 定理（順序数の三分律）

任意の順序数 $\alpha,\beta$ に対し、次のうちちょうど一つが成り立つ。

$$
\alpha\in\beta,
\qquad
\alpha=\beta,
\qquad
\beta\in\alpha.
$$
<!-- formal-statement-end -->

<!-- proof-start -->
### 証明

共通部分

$$
T=\alpha\cap\beta
$$

を考えます。$\alpha,\beta$ は推移的なので $T$ も推移的です。

補題を $\alpha$ に適用すると、

$$
T=\alpha
$$

または

$$
T\in\alpha.
$$

同様に、

$$
T=\beta
$$

または

$$
T\in\beta.
$$

もし $T$ が $\alpha,\beta$ の両方で真に小さいなら

$$
T\in\alpha,\qquad T\in\beta
$$

なので

$$
T\in\alpha\cap\beta=T,
$$

となります。しかし順序数は自分自身を元に持たないため不可能です。

従って少なくとも一方で共通部分が全体に一致します。

- $T=\alpha=\beta$ なら $\alpha=\beta$。
- $T=\alpha\ne\beta$ なら補題を $\beta$ に適用して $\alpha=T\in\beta$。
- $T=\beta\ne\alpha$ なら $\beta\in\alpha$。

三つは互いに排他的です。$\square$
<!-- proof-end -->

この定理により、順序数では

$$
\alpha<\beta
\quad\Longleftrightarrow\quad
\alpha\in\beta
$$

と定められます。また

$$
\alpha\le\beta
\quad\Longleftrightarrow\quad
\alpha\subseteq\beta
$$

と読めます。

---


## 6. 無限公理から $\omega$ を取り出す

SET1 の無限公理は「ある帰納的集合が存在する」とだけ言いました。その中には余分な元が入っている可能性があります。そこで、全ての帰納的部分集合に共通する部分だけを取ります。

<a id="def-set2-inductive-set"></a>
<!-- formal-statement-start -->
### 定義（帰納的集合）

集合 $I$ が **帰納的** であるとは、

$$
\varnothing\in I
$$

かつ

$$
x\in I
\Longrightarrow
S(x)\in I
$$

を満たすことをいう。
<!-- formal-statement-end -->

<!-- definition-example-start: def-set2-inductive-set -->
**定義の確認。** 無限公理は、少なくとも一つ帰納的集合が存在することを保証します。帰納的集合 $I$ があれば、$0\in I$ から順に

$$
1=S(0)\in I,\quad
2=S(1)\in I,\quad
3=S(2)\in I,\ldots
$$

と全ての有限 von Neumann 順序数が $I$ に入ります。
<!-- definition-example-end -->

<a id="thm-set2-omega-exists"></a>
<!-- formal-statement-start -->
### 定理（最小の帰納的集合 $\omega$）

ZF では、包含関係で最小の帰納的集合 $\omega$ が存在する。

さらに $\omega$ は順序数である。
<!-- formal-statement-end -->

<!-- proof-start -->
### 証明

無限公理から帰納的集合 $I$ を一つ取ります。

冪集合公理で $\mathcal P(I)$ を作り、分出公理図式により

$$
\mathcal C
=
\{J\in\mathcal P(I):J\text{ は帰納的}\}
$$

を作ります。$I\in\mathcal C$ なので $\mathcal C$ は非空です。

$\mathcal C$ の共通部分を

$$
\omega
=
\{x\in I:\forall J\in\mathcal C,\ x\in J\}
$$

と分出で作ります。

$0=\varnothing$ は全ての帰納的集合に入るので $0\in\omega$ です。また $x\in\omega$ なら、全ての $J\in\mathcal C$ で $x\in J$ だから $S(x)\in J$ です。従って $S(x)\in\omega$。よって $\omega$ は帰納的です。

定義から任意の帰納的集合 $J\subseteq I$ に対して $\omega\subseteq J$ です。また任意の帰納的集合 $K$ について $I\cap K$ は帰納的なので $\omega\subseteq I\cap K\subseteq K$。従って $\omega$ は全ての帰納的集合に含まれる最小の帰納的集合です。

次に $\omega$ の各元が有限 von Neumann 順序数であることを確認します。順序数である元全体を

$$
A=\{n\in\omega:n\text{ は順序数}\}
$$

とします。$0$ は順序数であり、順序数の後続も順序数なので、$A$ は帰納的です。$\omega$ の最小性から

$$
A=\omega.
$$

従って $\omega$ の全ての元は順序数です。

さらに

$$
T=\{n\in\omega:n\subseteq\omega\}
$$

と置くと $0\in T$ であり、$n\in T$ なら

$$
S(n)=n\cup\{n\}\subseteq\omega
$$

なので $S(n)\in T$ です。よって $T$ も帰納的であり、最小性から $T=\omega$。したがって $\omega$ は推移的です。

最後に $\preceq_\omega$ が整列であることを示します。$m,n\in\omega$ はともに順序数なので、前節の[順序数の三分律](#thm-set2-ordinal-trichotomy)から

$$
m\in n,
\qquad
m=n,
\qquad
n\in m
$$

のいずれか一つが成り立ちます。従って $\preceq_\omega$ は全順序です。

非空部分集合 $A\subseteq\omega$ を取ります。正則性公理から、ある $m\in A$ が

$$
m\cap A=\varnothing
$$

を満たします。任意の $n\in A$ について三分律を使うと、もし $n\in m$ なら $n\in m\cap A$ となって矛盾するため、

$$
m=n
\quad\text{または}\quad
m\in n.
$$

したがって $m\preceq_\omega n$ であり、$m$ は $A$ の最小元です。

よって $\preceq_\omega$ は整列で、$\omega$ は順序数です。$\square$
<!-- proof-end -->

---

## 7. 極限順序数

$\omega$ は、どれか一つの順序数の「すぐ次」ではありません。

<a id="def-set2-limit-ordinal"></a>
<!-- formal-statement-start -->
### 定義（極限順序数）

順序数 $\lambda$ が

$$
\lambda\ne0
$$

であり、どの順序数 $\alpha$ に対しても

$$
\lambda\ne S(\alpha)
$$

であるとき、$\lambda$ を **極限順序数** という。
<!-- formal-statement-end -->

<!-- definition-example-start: def-set2-limit-ordinal -->
**定義の確認：$\omega$ は極限順序数。**

$\omega\ne0$ です。

もし $\omega=S(n)$ となる $n\in\omega$ があれば、$S(n)\in\omega$ なので

$$
\omega=S(n)\in\omega
$$

となります。しかし順序数は自分自身を元に持ちません。従ってそのような $n$ はありません。

自然数段階を全て通過した最初の極限段階が $\omega$ です。
<!-- definition-example-end -->

<a id="prop-set2-zero-successor-limit"></a>
<!-- formal-statement-start -->
### 命題（順序数の三分類）

任意の順序数 $\alpha$ は、

1. $0$、
2. 後続順序数、
3. 極限順序数

のいずれかちょうど一つである。
<!-- formal-statement-end -->

<!-- proof-start -->
### 証明

$\alpha=0$ なら第1の場合です。

$\alpha\ne0$ とします。ある順序数 $\beta$ に対して

$
\alpha=S(\beta)
$

と書けるなら第2の場合です。

そのような $\beta$ が存在しなければ、$\alpha$ は非零で後続順序数ではないため、極限順序数の定義から第3の場合です。

三つの条件は定義上互いに排他的なので、ちょうど一つだけが成り立ちます。$\square$
<!-- proof-end -->

SET3 では、この三分類が超限帰納法の「初期・後続・極限」の三段階に対応します。

---

## 8. 順序型との接続

整列集合 $(X,\prec)$ に対し、「それと順序同型な唯一の順序数」を順序型と呼びたくなります。

ただし、一般の整列集合に対してその順序数を**実際に構成する存在証明**には、各 $x\in X$ へ「それ以前の点の順序型」を割り当てる超限再帰が自然に現れます。

したがってこの章では、

- 順序数同士の比較、
- 有限順序数、
- $\omega$、
- 後続順序数と極限順序数

までを閉じます。

一般の整列集合が一意な順序数と順序同型になる定理は、SET4 で証明します。後続理論を現在章へ逆輸入しないための境界です。

---

## 9. 演習

### Level A

<a id="ex-set2-a01"></a>
#### SET2-A01 0,1,2,3 を所属関係で並べる
- Level: A

$0,1,2,3$ を von Neumann 順序数として書き、$0\in1$, $1\in2$, $2\in3$ を直接確認せよ。

<!-- solution-start -->
#### 詳細解答

$$
0=\varnothing,
$$

$$
1=\{0\},
$$

$$
2=\{0,1\},
$$

$$
3=\{0,1,2\}.
$$

従って $0$ は $1$ の唯一の元なので $0\in1$。

$2$ の元は $0,1$ なので $1\in2$。

$3$ の元は $0,1,2$ なので $2\in3$。

順序数では「前にある」という順序が所属関係そのものになっています。
<!-- solution-end -->

<a id="ex-set2-a02"></a>
#### SET2-A02 推移的集合かを判定する
- Level: A

次の集合が推移的か判定せよ。

$$
A=\{0,1,2\},
\qquad
B=\{1,2\}.
$$

<!-- solution-start -->
#### 詳細解答

$A=3$ です。

$0\subseteq A$、$1=\{0\}\subseteq A$、$2=\{0,1\}\subseteq A$ なので $A$ は推移的です。

一方 $B=\{1,2\}$ では $0\in1$ かつ $1\in B$ ですが $0\notin B$ です。従って推移性

$$
x\in y\in B\Longrightarrow x\in B
$$

が破れ、$B$ は推移的ではありません。
<!-- solution-end -->

<a id="ex-set2-a03"></a>
#### SET2-A03 後続順序数を計算する
- Level: A

$S(0),S(1),S(2)$ を求めよ。

<!-- solution-start -->
#### 詳細解答

定義

$$
S(\alpha)=\alpha\cup\{\alpha\}
$$

を使います。

$$
S(0)
=
\varnothing\cup\{\varnothing\}
=
\{0\}
=
1.
$$

同様に

$$
S(1)
=
\{0\}\cup\{1\}
=
\{0,1\}
=
2,
$$

$$
S(2)
=
\{0,1\}\cup\{2\}
=
\{0,1,2\}
=
3.
$$
<!-- solution-end -->

<a id="ex-set2-a04"></a>
#### SET2-A04 $\omega$ と $S(\omega)$ の違い
- Level: A

$\omega\in\omega$ が偽である一方、

$$
\omega\in S(\omega)
$$

が真であることを説明せよ。

<!-- solution-start -->
#### 詳細解答

$\omega$ は順序数なので、自分自身を元に持ちません。従って

$$
\omega\notin\omega.
$$

一方

$$
S(\omega)=\omega\cup\{\omega\}.
$$

右辺には一元集合 $\{\omega\}$ が加わっているため、

$$
\omega\in S(\omega).
$$

つまり $S(\omega)$ は、自然数を全て含む $\omega$ の後ろに新しい一点 $\omega$ を加えた順序数です。
<!-- solution-end -->

### Level B

<a id="ex-set2-b01"></a>
#### SET2-B01 順序数の元が部分集合になる
- Level: B

$\alpha$ を順序数、$\beta\in\alpha$ とする。

$$
\beta\subseteq\alpha
$$

を示し、この事実がどの定義条件から出るか説明せよ。

<!-- solution-start -->
#### 詳細解答

順序数 $\alpha$ は定義により推移的です。

推移的集合の同値な条件は

$$
y\in\alpha
\Longrightarrow
y\subseteq\alpha
$$

です。

ここで $y=\beta$ と置けば、仮定 $\beta\in\alpha$ から直接

$$
\beta\subseteq\alpha
$$

が従います。

これは整列性ではなく、順序数の定義のうち **推移性** を使った結論です。
<!-- solution-end -->

<a id="ex-set2-b02"></a>
#### SET2-B02 共通部分から順序数を比較する
- Level: B

順序数 $\alpha,\beta$ に対し $T=\alpha\cap\beta$ と置く。$T=\alpha$ かつ $T\ne\beta$ なら

$$
\alpha\in\beta
$$

であることを示せ。

<!-- solution-start -->
#### 詳細解答

$T=\alpha\cap\beta$ は推移的です。

$T=\alpha$ なので

$$
\alpha\subseteq\beta.
$$

しかも $T\ne\beta$ だから $\alpha\ne\beta$ です。

本文の「順序数の推移的部分集合は初期部分」補題を $\beta$ と推移的部分集合 $\alpha$ に適用します。$\alpha\ne\beta$ なので、補題の第二の場合が成り立ち、

$$
\alpha\in\beta.
$$
<!-- solution-end -->

<a id="ex-set2-b03"></a>
#### SET2-B03 $\omega$ が後続順序数でない理由
- Level: B

$\omega=S(\alpha)$ となる順序数 $\alpha$ は存在しないことを、$\omega$ の最小帰納性を使って説明せよ。

<!-- solution-start -->
#### 詳細解答

$\omega=S(\alpha)$ と仮定します。

$S(\alpha)=\alpha\cup\{\alpha\}$ なので $\alpha\in\omega$ です。

$\omega$ は帰納的なので、$\alpha\in\omega$ なら

$$
S(\alpha)\in\omega.
$$

仮定 $S(\alpha)=\omega$ を代入すると

$$
\omega\in\omega
$$

となります。

しかし $\omega$ は順序数であり、自分自身を元に持ちません。矛盾です。

従って $\omega$ は後続順序数ではなく、非零なので極限順序数です。
<!-- solution-end -->

### Level C

<a id="ex-set2-c01"></a>
#### SET2-C01 順序数の三分律を補題から再構成する
- Level: C

順序数 $\alpha,\beta$ に対し、

$$
T=\alpha\cap\beta
$$

を用いて

$$
\alpha\in\beta,
\qquad
\alpha=\beta,
\qquad
\beta\in\alpha
$$

のちょうど一つが成り立つことを証明せよ。

<!-- solution-start -->
#### 詳細解答

$\alpha,\beta$ は推移的なので $T=\alpha\cap\beta$ も推移的です。

本文の補題より、$T$ は $\alpha$ に対して

$$
T=\alpha
\quad\text{または}\quad
T\in\alpha
$$

のどちらかです。同様に $\beta$ に対して

$$
T=\beta
\quad\text{または}\quad
T\in\beta
$$

です。

もし $T\in\alpha$ かつ $T\in\beta$ なら、

$$
T\in\alpha\cap\beta=T
$$

となります。しかし順序数は自己所属しないので不可能です。

従って少なくとも一方で $T$ は全体に一致します。

両方で一致すれば

$$
\alpha=T=\beta.
$$

$T=\alpha$ で $T\ne\beta$ なら、$\beta$ に対する補題から

$$
T\in\beta,
$$

すなわち

$$
\alpha\in\beta.
$$

対称的に $T=\beta\ne\alpha$ なら

$$
\beta\in\alpha.
$$

最後に二つが同時に成り立たないことを確認します。例えば $\alpha\in\beta$ と $\beta\in\alpha$ が同時なら所属関係に2-cycleが生じ、SET1 の正則性に反します。等号との同時成立も自己所属を生じます。

従って三つのうちちょうど一つが成り立ちます。
<!-- solution-end -->

---

## 10. 次章への接続

自然数上の帰納法では、

$$
0\to1\to2\to\cdots
$$

という後続段階だけを意識すれば足りました。

しかし順序数には $\omega$ のような極限段階があります。そこで次章では、

$$
\boxed{
\text{初期段階}
\;+\;
\text{後続段階}
\;+\;
\text{極限段階}
}
$$

を区別して、任意の順序数上へ数学的帰納法を拡張します。
