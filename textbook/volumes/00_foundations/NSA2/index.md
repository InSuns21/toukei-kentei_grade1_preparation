# NSA2 移送のための最小一階論理

<!-- definition-example-audit: strict -->

NSA1 では、自由超フィルターを使って実数列の商

$$
{}^*\mathbb R=\mathbb R^{\mathbb N}/\!\sim_{\mathcal U}
$$

を作り、加法・乗法・順序を直接定義しました。個別の性質なら、この商構成へ戻って確かめられます。しかし、実数で成り立つ性質を一つずつ同じ方法で証明し直すだけでは、超実数を使うたびに同じ議論を繰り返すことになります。

そこで次に必要なのは、「実数について書いた数学的主張」を、超冪へ運べる形の対象として正確に取り出すことです。

この章では、NSA3 で Łoś の定理を証明するために必要な一階論理だけを導入します。完全な数理論理の講義には広げません。式を組み立てる規則、変数を量化する規則、記号へ意味を与える方法、真偽を判定する方法、式の構成に沿って証明する方法を順に準備し、最後に「一階で書ける主張」と「そのままでは書けない外部的な言い回し」を区別します。

---

## 1. 式の形と、その式が真であることを分ける

例えば

$$
x^2+1>0
$$

という文字列だけでは、まだ真偽は決まりません。$x$ が何を走るか、$+$ や $<$ を何として解釈するか、$x$ を固定するか量化するかを決める必要があります。

この「式を作る規則」と「式を数学的対象の上で読む規則」を分けます。前者が構文、後者が意味論です。

まず、実数の四則演算と順序を記述する最小限の言語を用意します。

<a id="def-nsa2-first-order-language"></a>
<!-- formal-statement-start -->
### 定義（一階言語）

**一階言語** $\mathcal L$ は、次の記号を指定したものとする。

- 定数記号
- 各自然数 $k\ge1$ に対する $k$ 項関数記号
- 各自然数 $k\ge1$ に対する $k$ 項関係記号

これらに変数記号、等号、論理結合子、量化記号を組み合わせて項と論理式を作る。
<!-- formal-statement-end -->

<!-- definition-example-start: def-nsa2-first-order-language -->
**定義の確認**。この章では主に

$$
\mathcal L_{\mathrm{of}}
=
\{0,1,+,\cdot,-,<\}
$$

を使います。$0,1$ は定数記号、$+,\cdot$ は2項関数記号、$-$ は1項関数記号、$<$ は2項関係記号です。等号 $=$ は論理側に備わる記号として扱います。
<!-- definition-example-end -->

ここでは記号の形だけを指定しています。例えば $+$ は、まだ実数の加法そのものではありません。実際の意味は構造を与えたときに決まります。

---

## 2. 値を表す式：項

等号や不等号の左右に置く「値を表す式」を先に作ります。

<a id="def-nsa2-term"></a>
<!-- formal-statement-start -->
### 定義（項）

一階言語 $\mathcal L$ の**項**を次の規則で作る。

1. 各変数は項である。
2. 各定数記号は項である。
3. $f$ が $k$ 項関数記号で、$t_1,\ldots,t_k$ が項なら

$$
f(t_1,\ldots,t_k)
$$

も項である。

以上を有限回繰り返して得られるものだけを項とする。
<!-- formal-statement-end -->

<!-- definition-example-start: def-nsa2-term -->
**定義の確認**。$\mathcal L_{\mathrm{of}}$ では

$$
(x+1)\cdot(-y)
$$

は項です。$x,y$ は変数、$1$ は定数記号なので項であり、そこへ関数記号 $+$、$-$、$\cdot$ を順に適用して全体を作れます。

一方

$$
x<y
$$

は項ではありません。関係記号 $<$ を使って真偽を述べる式なので、次節で別の種類の式として扱います。
<!-- definition-example-end -->

項を木として見ると、葉に変数・定数があり、その上に関数記号が積み重なっています。後でこの式を具体的な要素へ評価するときも、この木を下から上へたどります。

---

## 3. 真偽を持つ最小単位から論理式を作る

項だけでは値は表せても、まだ「正しい・誤り」を問いません。二つの項が等しい、あるいは項の組がある関係を満たす、というところで初めて真偽を持つ最小単位が現れます。

<a id="def-nsa2-atomic-formula"></a>
<!-- formal-statement-start -->
### 定義（原子論理式）

一階言語 $\mathcal L$ の**原子論理式**は、次のいずれかの形の式とする。

1. 項 $t,u$ に対する等式

$$
t=u.
$$

2. $R$ が $k$ 項関係記号で、$t_1,\ldots,t_k$ が項であるときの式

$$
R(t_1,\ldots,t_k).
$$
<!-- formal-statement-end -->

<!-- definition-example-start: def-nsa2-atomic-formula -->
**定義の確認**。$\mathcal L_{\mathrm{of}}$ では

$$
x+1=y
$$

と

$$
x\cdot x<y
$$

はいずれも原子論理式です。前者は等式、後者は関係記号 $<$ を二つの項へ適用した形です。
<!-- definition-example-end -->

原子論理式から、否定・論理積・論理和・量化を使って複雑な論理式を作ります。

<a id="def-nsa2-first-order-formula"></a>
<!-- formal-statement-start -->
### 定義（一階論理式）

一階言語 $\mathcal L$ の**一階論理式**を次の規則で作る。

1. 原子論理式は一階論理式である。
2. $\varphi,\psi$ が一階論理式なら

$$
\neg\varphi,\qquad
(\varphi\land\psi),\qquad
(\varphi\lor\psi)
$$

も一階論理式である。
3. $\varphi$ が一階論理式で $x$ が変数なら

$$
\exists x\,\varphi,\qquad
\forall x\,\varphi
$$

も一階論理式である。

以上を有限回繰り返して得られるものだけを一階論理式とする。
<!-- formal-statement-end -->

<!-- definition-example-start: def-nsa2-first-order-formula -->
**定義の確認**。

$$
\forall x\,
\bigl(
x\ne0
\to
\exists y\;(x\cdot y=1)
\bigr)
$$

を考えます。$x\ne0$ は $\neg(x=0)$ の略記、$\varphi\to\psi$ は $\neg\varphi\lor\psi$ の略記です。したがって原子論理式から否定・論理和・存在量化・全称量化を有限回使って作られた一階論理式です。
<!-- definition-example-end -->

この章では

$$
t\ne u,\quad
t\le u,\quad
t>u,\quad
t\ge u,\quad
\varphi\to\psi,\quad
\varphi\leftrightarrow\psi
$$

を通常の略記として使います。

### 3.1 自由に残る変数と量化された変数

量化記号を付けると、外から値を与える必要がある変数と、論理式の内部で量化される変数が分かれます。この区別を式の見た目ではなく、量化記号の作用域から再帰的に記録します。

<a id="def-nsa2-free-variables"></a>
<!-- formal-statement-start -->
### 定義（自由変数集合）

論理式 $\varphi$ の**自由変数集合** $\operatorname{FV}(\varphi)$ を再帰的に定める。

- 原子論理式では、そこに現れる変数全体を自由変数とする。
- 否定では自由変数集合を変えない。
- 論理積・論理和では二つの自由変数集合の和集合を取る。
- 量化では

$$
\operatorname{FV}(\exists x\,\varphi)
=
\operatorname{FV}(\varphi)\setminus\{x\},
$$

$$
\operatorname{FV}(\forall x\,\varphi)
=
\operatorname{FV}(\varphi)\setminus\{x\}
$$

とする。

量化記号の作用域に入り、その量化記号によって捕捉される変数の出現を**束縛された出現**という。
<!-- formal-statement-end -->

<!-- definition-example-start: def-nsa2-free-variables -->
**定義の確認**。

$$
\varphi(x)=\exists y\;(x+y=0)
$$

では、量化前の原子論理式の自由変数は $x,y$ です。$\exists y$ を付けると $y$ が自由変数集合から除かれるので

$$
\operatorname{FV}(\varphi)=\{x\}.
$$

$x$ は自由に残り、$y$ の出現は $\exists y$ によって束縛されています。
<!-- definition-example-end -->

同じ文字でも、出現ごとに自由か束縛かが変わることがあります。例えば

$$
x=0\land\forall x\;(x=x)
$$

では左側の $x$ は自由、右側の $x$ は束縛されています。

自由変数が一つも残らなければ、外から変数の値を指定しなくても構造だけで真偽を問えます。その種の論理式を区別しておきます。

<a id="def-nsa2-sentence"></a>
<!-- formal-statement-start -->
### 定義（文）

自由変数を持たない一階論理式、すなわち

$$
\operatorname{FV}(\varphi)=\varnothing
$$

を満たす論理式 $\varphi$ を**文**という。
<!-- formal-statement-end -->

<!-- definition-example-start: def-nsa2-sentence -->
**定義の確認**。

$$
\forall x\,
\bigl(
x=0
\lor
\exists y\;(x\cdot y=1)
\bigr)
$$

では外側の $\forall x$ が $x$ を、内側の $\exists y$ が $y$ を束縛します。自由変数は残らないので文です。
<!-- definition-example-end -->

---

## 4. 記号へ意味を与える：構造と変数割当て

同じ論理式でも、記号を何として読むかで真偽が変わります。

<a id="def-nsa2-structure"></a>
<!-- formal-statement-start -->
### 定義（一階言語の構造）

一階言語 $\mathcal L$ の**構造** $\mathcal M$ は、空でない集合 $M$ を台集合として、言語の各記号に次を対応させたものとする。

- 各定数記号 $c$ に元

$$
c^{\mathcal M}\in M.
$$

- 各 $k$ 項関数記号 $f$ に写像

$$
f^{\mathcal M}:M^k\to M.
$$

- 各 $k$ 項関係記号 $R$ に部分集合

$$
R^{\mathcal M}\subseteq M^k.
$$
<!-- formal-statement-end -->

<!-- definition-example-start: def-nsa2-structure -->
**定義の確認**。

$$
\mathbb R_{\mathrm{of}}
=
(\mathbb R;0,1,+,\cdot,-,<)
$$

を考えます。台集合は $\mathbb R$、各記号を通常の実数 $0,1$、加法、乗法、符号反転、狭義順序として解釈します。これで一つの $\mathcal L_{\mathrm{of}}$-構造が得られます。
<!-- definition-example-end -->

同じ言語を

$$
\mathbb Q_{\mathrm{of}}
=
(\mathbb Q;0,1,+,\cdot,-,<)
$$

で解釈することもできます。例えば

$$
\forall x\,
\bigl(
0<x
\to
\exists y\;(y\cdot y=x)
\bigr)
$$

は $\mathbb R_{\mathrm{of}}$ では真ですが、$\mathbb Q_{\mathrm{of}}$ では $x=2$ に対する有理数の平方根がないため偽です。

構造を固定しても、自由変数を含む論理式の真偽はまだ決まりません。そこで、自由変数へ実際の値を渡す仕組みを用意します。

<a id="def-nsa2-assignment"></a>
<!-- formal-statement-start -->
### 定義（変数割当て）

$\mathcal L$-構造 $\mathcal M$ の台集合を $M$ とする。全ての変数から $M$ への写像

$$
s:\operatorname{Var}\to M
$$

を**変数割当て**という。

変数 $x$ だけを $a\in M$ へ変更した割当てを $s[x\mapsto a]$ と書く。
<!-- formal-statement-end -->

<!-- definition-example-start: def-nsa2-assignment -->
**定義の確認**。$\mathbb R_{\mathrm{of}}$ で

$$
s(x)=2,\qquad s(y)=-3
$$

とします。他の変数にも実数を割り当てれば変数割当てになります。

$s[y\mapsto5]$ では $y$ の値だけを5へ変更するので

$$
s[y\mapsto5](x)=2,
\qquad
s[y\mapsto5](y)=5.
$$
<!-- definition-example-end -->

---

## 5. 項を実際の値へ評価する

言語の記号を構造で解釈し、変数へ値を割り当てたので、項を一つの具体的な台集合の要素へ落とせます。項の構成順をそのまま評価順として使います。

<a id="def-nsa2-term-evaluation"></a>
<!-- formal-statement-start -->
### 定義（項の値）

$\mathcal L$-構造 $\mathcal M$ と変数割当て $s$ を固定する。項 $t$ の値 $t^{\mathcal M}[s]$ を次のように再帰的に定める。

- 変数 $x$ なら

$$
x^{\mathcal M}[s]=s(x).
$$

- 定数記号 $c$ なら

$$
c^{\mathcal M}[s]=c^{\mathcal M}.
$$

- $t=f(t_1,\ldots,t_k)$ なら

$$
t^{\mathcal M}[s]
=
f^{\mathcal M}
\bigl(
t_1^{\mathcal M}[s],\ldots,t_k^{\mathcal M}[s]
\bigr).
$$
<!-- formal-statement-end -->

<!-- definition-example-start: def-nsa2-term-evaluation -->
**定義の確認**。$\mathbb R_{\mathrm{of}}$ で

$$
t=(x+1)\cdot(-y),
\qquad
s(x)=2,\quad s(y)=-3
$$

とします。

まず

$$
(x+1)^{\mathbb R_{\mathrm{of}}}[s]=2+1=3,
$$

$$
(-y)^{\mathbb R_{\mathrm{of}}}[s]=-(-3)=3.
$$

したがって

$$
t^{\mathbb R_{\mathrm{of}}}[s]=3\cdot3=9.
$$
<!-- definition-example-end -->

<a id="prop-nsa2-term-depends-on-occurring-variables"></a>
<!-- formal-statement-start -->
### 命題（項の値は項に現れる変数だけに依存する）

$\mathcal L$-構造 $\mathcal M$、項 $t$、変数割当て $s,r$ を取る。

$s$ と $r$ が項 $t$ に現れる全ての変数で一致するなら

$$
t^{\mathcal M}[s]
=
t^{\mathcal M}[r].
$$
<!-- formal-statement-end -->

### 証明の見取り図

項の作り方に沿って確認します。変数なら仮定そのもの、定数なら割当てに依存しません。複合項では、各部分項の値が同じなら同じ関数を適用した結果も同じです。

<!-- proof-start -->
### 証明

項の構成に関して帰納法を行います。

$t=x$ が変数なら、仮定から $s(x)=r(x)$ なので結論が従います。

$t=c$ が定数記号なら

$$
t^{\mathcal M}[s]
=
c^{\mathcal M}
=
t^{\mathcal M}[r].
$$

最後に

$$
t=f(t_1,\ldots,t_k)
$$

とします。各 $t_i$ に現れる変数は全て $t$ にも現れるため、帰納法の仮定から

$$
t_i^{\mathcal M}[s]
=
t_i^{\mathcal M}[r]
\qquad
(i=1,\ldots,k).
$$

したがって

$$
\begin{aligned}
t^{\mathcal M}[s]
&=
f^{\mathcal M}
\bigl(
t_1^{\mathcal M}[s],\ldots,t_k^{\mathcal M}[s]
\bigr)\\
&=
f^{\mathcal M}
\bigl(
t_1^{\mathcal M}[r],\ldots,t_k^{\mathcal M}[r]
\bigr)\\
&=
t^{\mathcal M}[r].
\end{aligned}
$$

以上で示されました。
<!-- proof-end -->

---

## 6. 「論理式が真である」を再帰的に定める

項の値が決まれば、原子論理式の真偽を判定できます。さらに否定・論理結合・量化へ同じ手続きを広げ、論理式全体の「真である」を一つの再帰的な関係として定めます。

<a id="def-nsa2-satisfaction"></a>
<!-- formal-statement-start -->
### 定義（充足）

$\mathcal L$-構造 $\mathcal M$ と変数割当て $s$ に対し、

$$
\mathcal M,s\models\varphi
$$

を「$\mathcal M$ は割当て $s$ の下で論理式 $\varphi$ を**充足する**」と読む。充足関係を次の規則で再帰的に定める。

**等号**

$$
\mathcal M,s\models(t=u)
\iff
t^{\mathcal M}[s]=u^{\mathcal M}[s].
$$

**関係記号**

$$
\mathcal M,s\models R(t_1,\ldots,t_k)
$$

であることを

$$
\bigl(
t_1^{\mathcal M}[s],\ldots,t_k^{\mathcal M}[s]
\bigr)
\in
R^{\mathcal M}
$$

と定める。

**否定**

$$
\mathcal M,s\models\neg\varphi
\iff
\mathcal M,s\not\models\varphi.
$$

**論理積・論理和**

$$
\mathcal M,s\models(\varphi\land\psi)
$$

であることを、$\mathcal M,s\models\varphi$ かつ $\mathcal M,s\models\psi$ であることと定める。

$$
\mathcal M,s\models(\varphi\lor\psi)
$$

であることを、$\mathcal M,s\models\varphi$ または $\mathcal M,s\models\psi$ であることと定める。

**存在量化**

$$
\mathcal M,s\models\exists x\,\varphi
$$

であることを、ある $a\in M$ が存在して

$$
\mathcal M,s[x\mapsto a]\models\varphi
$$

となることと定める。

**全称量化**

$$
\mathcal M,s\models\forall x\,\varphi
$$

であることを、全ての $a\in M$ について

$$
\mathcal M,s[x\mapsto a]\models\varphi
$$

となることと定める。
<!-- formal-statement-end -->

<!-- definition-example-start: def-nsa2-satisfaction -->
**定義の確認**。$\mathbb R_{\mathrm{of}}$ で

$$
\varphi(x)=\exists y\;(x+y=0)
$$

を考え、$s(x)=2$ とします。

存在量化の定義により、ある $a\in\mathbb R$ を選んで

$$
\mathbb R_{\mathrm{of}},s[y\mapsto a]
\models
x+y=0
$$

とすればよいです。$a=-2$ を選ぶと $2+(-2)=0$ なので

$$
\mathbb R_{\mathrm{of}},s\models\exists y\;(x+y=0).
$$

存在量化では、台集合から witness を実際に一つ選び、その値へ割当てを変更して内側の論理式を評価します。
<!-- definition-example-end -->

この witness の見方は NSA3 でそのまま使います。Łoś の定理の存在量化の場合には、添字ごとの witness を並べて一つの代表列を作ることになります。

---

## 7. 論理式の形に沿って証明する：構文帰納法

一階論理式は、原子論理式から決まった構成規則を有限回使って作られます。そこで全ての論理式について性質を示すとき、論理式の構成に沿う帰納法を使います。

<a id="thm-nsa2-structural-induction"></a>
<!-- formal-statement-start -->
### 定理（論理式に関する構文帰納法）

一階論理式 $\varphi$ に関する性質 $P(\varphi)$ を考える。次を仮定する。

1. 全ての原子論理式 $\varphi$ について $P(\varphi)$ が成り立つ。
2. $P(\varphi)$ から $P(\neg\varphi)$ が従う。
3. $P(\varphi)$ と $P(\psi)$ から

$$
P(\varphi\land\psi),
\qquad
P(\varphi\lor\psi)
$$

が従う。
4. $P(\varphi)$ から任意の変数 $x$ について

$$
P(\exists x\,\varphi),
\qquad
P(\forall x\,\varphi)
$$

が従う。

このとき全ての一階論理式 $\varphi$ について $P(\varphi)$ が成り立つ。
<!-- formal-statement-end -->

### 証明の見取り図

論理式に構成の深さを付け、深さについて通常の自然数の帰納法を使います。深さ0を原子論理式とし、否定・論理結合・量化を一段追加するごとに深さを増やします。

<!-- proof-start -->
### 証明

論理式の深さ $d(\varphi)$ を次で定めます。原子論理式では $d(\varphi)=0$ とします。

否定では

$$
d(\neg\varphi)=d(\varphi)+1.
$$

二項結合では

$$
d(\varphi\land\psi)
=
d(\varphi\lor\psi)
=
1+\max\{d(\varphi),d(\psi)\}.
$$

量化では

$$
d(\exists x\,\varphi)
=
d(\forall x\,\varphi)
=
d(\varphi)+1.
$$

深さ $n$ 以下の全ての論理式について $P$ が成り立つことを $n$ に関して帰納法で示します。

$n=0$ では原子論理式なので仮定1から従います。

深さ $n+1$ の論理式 $\theta$ は、構成規則により

$$
\neg\varphi,\quad
\varphi\land\psi,\quad
\varphi\lor\psi,\quad
\exists x\,\varphi,\quad
\forall x\,\varphi
$$

のいずれかです。各部分論理式の深さは $n$ 以下なので帰納法の仮定を使えます。そこへ仮定2--4を対応する形で適用すれば $P(\theta)$ が従います。

従って全ての一階論理式について $P$ が成り立ちます。
<!-- proof-end -->

NSA3 の Łoś の定理では、この構文帰納法で原子論理式、否定、論理積・論理和、存在量化、全称量化を順に処理します。

---

## 8. 充足は自由変数の値だけを見ている

<a id="prop-nsa2-satisfaction-depends-on-free-variables"></a>
<!-- formal-statement-start -->
### 命題（充足は自由変数の値だけに依存する）

$\mathcal L$-構造 $\mathcal M$、一階論理式 $\varphi$、二つの変数割当て $s,r$ を取る。

全ての

$$
x\in\operatorname{FV}(\varphi)
$$

について $s(x)=r(x)$ なら

$$
\mathcal M,s\models\varphi
\iff
\mathcal M,r\models\varphi.
$$
<!-- formal-statement-end -->

### 証明の見取り図

原子論理式では項の値が同じことを使います。論理結合子では帰納法の仮定を組み合わせます。

核心は量化です。$\exists x\,\psi$ で $s$ 側の witness $a$ を選んだら、$r$ 側でも同じ $a$ を使います。そのために

$$
s[x\mapsto a],
\qquad
r[x\mapsto a]
$$

が $\psi$ の自由変数上で一致することを確認します。

<!-- proof-start -->
### 証明

論理式 $\varphi$ の構成に関して [構文帰納法](#thm-nsa2-structural-induction) を使います。

**原子論理式。** $\varphi=(t=u)$ とします。仮定から $s,r$ は $t,u$ に現れる全変数で一致します。[項の値は項に現れる変数だけに依存する命題](#prop-nsa2-term-depends-on-occurring-variables)により

$$
t^{\mathcal M}[s]=t^{\mathcal M}[r],
\qquad
u^{\mathcal M}[s]=u^{\mathcal M}[r].
$$

従って等号の真偽は一致します。関係記号 $R(t_1,\ldots,t_k)$ でも各項の値が同じなので、$R^{\mathcal M}$ に属するかどうかは一致します。

**否定。** $\varphi=\neg\psi$ なら自由変数集合は $\psi$ と同じです。帰納法の仮定から $\psi$ の真偽が一致するため、その否定の真偽も一致します。

**論理積・論理和。** 例えば $\varphi=\psi\land\theta$ なら

$$
\operatorname{FV}(\varphi)
=
\operatorname{FV}(\psi)\cup\operatorname{FV}(\theta).
$$

従って $s,r$ は両部分論理式の自由変数上で一致します。帰納法の仮定で各真偽が一致するため、論理積の真偽も一致します。論理和も同じです。

**存在量化。** $\varphi=\exists x\,\psi$ とし

$$
\mathcal M,s\models\exists x\,\psi
$$

を仮定します。充足の定義から、ある $a\in M$ が存在して

$$
\mathcal M,s[x\mapsto a]\models\psi.
$$

ここで

$$
\operatorname{FV}(\exists x\,\psi)
=
\operatorname{FV}(\psi)\setminus\{x\}.
$$

$z\in\operatorname{FV}(\psi)$ を取ります。$z=x$ なら

$$
s[x\mapsto a](x)
=
a
=
r[x\mapsto a](x).
$$

$z\ne x$ なら $z\in\operatorname{FV}(\exists x\,\psi)$ なので $s(z)=r(z)$ です。したがって

$$
s[x\mapsto a](z)
=
r[x\mapsto a](z).
$$

よって二つの変更後割当ては $\operatorname{FV}(\psi)$ 上で一致します。帰納法の仮定から

$$
\mathcal M,r[x\mapsto a]\models\psi.
$$

同じ $a$ を witness として

$$
\mathcal M,r\models\exists x\,\psi.
$$

逆向きは $s,r$ を入れ替えれば同じです。

**全称量化。** $\varphi=\forall x\,\psi$ とし

$$
\mathcal M,s\models\forall x\,\psi
$$

を仮定します。任意の $a\in M$ について

$$
\mathcal M,s[x\mapsto a]\models\psi.
$$

存在量化の場合と同じ確認で、二つの変更後割当ては $\operatorname{FV}(\psi)$ 上で一致します。帰納法の仮定から

$$
\mathcal M,r[x\mapsto a]\models\psi.
$$

$a$ は任意なので

$$
\mathcal M,r\models\forall x\,\psi.
$$

逆向きも同じです。

以上で全ての論理式について示されました。
<!-- proof-end -->

<a id="cor-nsa2-sentence-assignment-independent"></a>
<!-- formal-statement-start -->
### 系（文の真偽は変数割当てに依存しない）

$\varphi$ が文なら、任意の二つの変数割当て $s,r$ について

$$
\mathcal M,s\models\varphi
\iff
\mathcal M,r\models\varphi.
$$

従って文 $\varphi$ が $\mathcal M$ で真であることを

$$
\mathcal M\models\varphi
$$

と書ける。
<!-- formal-statement-end -->

<!-- proof-start -->
### 証明

文では

$$
\operatorname{FV}(\varphi)=\varnothing.
$$

従って「全ての自由変数で $s,r$ が一致する」という仮定は自動的に満たされます。[充足は自由変数の値だけに依存する命題](#prop-nsa2-satisfaction-depends-on-free-variables)から結論が従います。
<!-- proof-end -->

---

## 9. 「一階で書ける」とは、どの言語で書けることか

移送原理で危険なのは、日本語で自然に言える性質を、そのまま一階論理式だと思い込むことです。

### 9.1 順序体の言語で書ける例

加法の可換性は

$$
\forall x\forall y\;(x+y=y+x).
$$

非零元の逆元の存在は

$$
\forall x\,
\bigl(
x\ne0
\to
\exists y\;(x\cdot y=1)
\bigr).
$$

全順序性の一部は

$$
\forall x\forall y\;
(x<y\lor x=y\lor y<x).
$$

と書けます。どれも変数は台集合の元を走り、使う定数・関数・関係は $\mathcal L_{\mathrm{of}}$ に登録されています。

### 9.2 そのままでは書けない例

**「$x$ は標準実数である」**

$\mathcal L_{\mathrm{of}}$ には「標準である」という述語記号がありません。従ってこの日本語をそのまま $\mathcal L_{\mathrm{of}}$ の論理式にはできません。

**「$x$ は無限小である」**

超準解析でいう無限小は「全ての正の標準実数より絶対値が小さい」という条件です。「標準」という語彙がないため、そのままでは $\mathcal L_{\mathrm{of}}$ の論理式ではありません。

ここで

$$
\forall r\;(r>0\to |x|<r)
$$

と書いて代用してはいけません。超実数構造で $\forall r$ は全ての超実数を走ります。$x>0$ なら $r=x/2$ を選べるため、正の非零無限小を表す式にはなりません。

**「全ての非空有界部分集合は上限を持つ」**

通常の定式化は実数の部分集合そのものを量化します。一ソートの $\mathcal L_{\mathrm{of}}$ の変数は数しか走らないので、そのままでは書けません。

ここで述べているのは Dedekind 完備性についての一般的な非定義可能性定理ではなく、現在固定した一ソート順序体言語の構文では集合量化をそのまま書けない、ということです。

**「任意の関数 $f:\mathbb R\to\mathbb R$ について」**

$\mathcal L_{\mathrm{of}}$ では関数そのものを変数として量化できません。

ただし、ある固定関数 $f$ だけを扱いたいなら、言語へ1項関数記号 $f$ を追加し、構造で実際の関数として解釈できます。重要なのは、どの言語を使っているかを先に明示することです。

---

## 10. 集合や写像へ広げる多ソート一階言語

NSA3 以降では実数だけでなく、標準集合や標準写像の超準拡張も扱います。そこで、変数ごとに対象の種類を指定できる多ソート形式を使います。

<a id="def-nsa2-many-sorted-language"></a>
<!-- formal-statement-start -->
### 定義（多ソート一階言語）

**多ソート一階言語**では、変数や記号にソートを指定する。

- 各変数は一つのソートを持つ。
- 定数記号は値を取るソートを持つ。
- 関数記号 $f$ は型

$$
f:S_1\times\cdots\times S_k\to T
$$

を持つ。
- 関係記号 $R$ は型

$$
R\subseteq S_1\times\cdots\times S_k
$$

を持つ。
- 量化記号は指定したソートの変数を量化する。

多ソート構造では各ソート $S$ に空でない台集合 $M_S$ を対応させ、定数・関数・関係をその型に従って解釈する。項の値と充足は一ソートの場合と同じ再帰で、型を保って定める。
<!-- formal-statement-end -->

<!-- definition-example-start: def-nsa2-many-sorted-language -->
**定義の確認**。二つのソート

$$
R,
\qquad
\operatorname{Set}(R)
$$

を用意し、所属関係を

$$
\in\ \subseteq R\times\operatorname{Set}(R)
$$

という型にします。

標準構造で

$$
M_R=\mathbb R,
\qquad
M_{\operatorname{Set}(R)}=\mathcal P(\mathbb R)
$$

と解釈すれば

$$
\exists A^{\operatorname{Set}(R)}
\forall x^R\;
(x\in A\leftrightarrow x>0)
$$

は型の合った一階論理式です。

一方、$+$ が $R\times R\to R$ なら

$$
A+1
$$

は $A$ のソートが合わず、項として作れません。
<!-- definition-example-end -->

多ソート化しても一階であることは変わりません。各量化変数は、指定された一つのソートの要素を走ります。

この見方は、後の内部集合と外部集合の区別にも効きます。標準構造の集合ソートを $\mathcal P(\mathbb R)$ にし、そのソートごと超冪を取ると、超冪の集合ソートに現れるのは集合列の同値類として作られる内部集合です。外から見た $\;{}^*\mathbb R$ の全ての部分集合を自動的に量化しているわけではありません。

従って、「標準構造で集合について一階に書けた」ことと「超実数の任意の外部部分集合まで移送できる」ことは別です。

---

## 11. NSA3 へ持っていく確認順

Łoś の定理へ進む前に、移送したい主張を見たら次を確認します。

1. どの定数・関数・関係記号を使う言語か。
2. 変数はどのソートを走るか。
3. 自由変数と量化された変数はどれか。
4. 各記号をどの構造で何として解釈するか。
5. 量化範囲がその構造の全要素であることを確認したか。
6. 「標準」「無限小」など、言語にない外部語彙を紛れ込ませていないか。

NSA3 では各ソートの要素列を超フィルターで割った超冪について、

$$
\mathcal M^{\mathbb N}/\mathcal U
\models
\varphi([a_n^1],\ldots,[a_n^k])
$$

と

$$
\{n:
\mathcal M\models
\varphi(a_n^1,\ldots,a_n^k)
\}
\in\mathcal U
$$

が同値になる Łoś の定理を証明します。

この章で準備した項の評価、充足の再帰、構文帰納法、存在量化の witness が、その証明の各段階に対応します。

---

## 演習

### Level A

<a id="ex-nsa2-a01"></a>
#### NSA2-A01 項・原子論理式・文を分類する
- Level: A

$\mathcal L_{\mathrm{of}}=\{0,1,+,\cdot,-,<\}$ で次を分類せよ。

1. $(x+1)\cdot y$
2. $x+1<y$
3. $\exists y\;(x+y=0)$
4. $\forall x\;(x+0=x)$

<!-- solution-start -->
#### 詳細解答

1 は項です。変数と定数から始め、関数記号 $+$ と $\cdot$ を適用して作られています。

2 は原子論理式です。$x+1$ と $y$ という二つの項へ関係記号 $<$ を適用しています。自由変数 $x,y$ が残るため文ではありません。

3 は原子ではない一階論理式です。内側 $x+y=0$ は原子論理式ですが、全体には存在量化があります。$y$ は束縛され、$x$ は自由に残るため文ではありません。

4 は一階論理式であり文です。内側は原子論理式で、外側の $\forall x$ が唯一の変数 $x$ を束縛するため自由変数が残りません。
<!-- solution-end -->

<a id="ex-nsa2-a02"></a>
#### NSA2-A02 自由変数を作用域から判定する
- Level: A

次の論理式について自由変数集合を求めよ。

$$
\varphi
=
(x<y)
\land
\exists y\;
\bigl(
y<z
\land
\forall z\;(z=z)
\bigr).
$$

<!-- solution-start -->
#### 詳細解答

左側 $x<y$ の自由変数は $\{x,y\}$ です。

右側の括弧内では、$y<z$ の自由変数が $\{y,z\}$、$\forall z\;(z=z)$ の自由変数は空です。従って括弧内の自由変数は $\{y,z\}$ です。

外側の $\exists y$ により $y$ が除かれるので、右側全体の自由変数は $\{z\}$ です。したがって

$$
\operatorname{FV}(\varphi)
=
\{x,y\}\cup\{z\}
=
\{x,y,z\}.
$$

左側の $y$ は $\exists y$ の作用域外なので自由です。また右側の $z$ は $y<z$ では自由ですが、$\forall z\;(z=z)$ の内部では束縛されています。
<!-- solution-end -->

<a id="ex-nsa2-a03"></a>
#### NSA2-A03 項の値を内側から評価する
- Level: A

$\mathbb R_{\mathrm{of}}$ で

$$
t=(x+1)\cdot(y-1)
$$

を考える。ここで $y-1$ は $y+(-1)$ の略記とする。

$$
s(x)=2,\qquad s(y)=5
$$

のとき $t^{\mathbb R_{\mathrm{of}}}[s]$ を求めよ。

<!-- solution-start -->
#### 詳細解答

まず

$$
(x+1)^{\mathbb R_{\mathrm{of}}}[s]
=
2+1
=
3.
$$

次に

$$
(y-1)^{\mathbb R_{\mathrm{of}}}[s]
=
5-1
=
4.
$$

最後に乗法を評価して

$$
t^{\mathbb R_{\mathrm{of}}}[s]
=
3\cdot4
=
12.
$$
<!-- solution-end -->

<a id="ex-nsa2-a04"></a>
#### NSA2-A04 存在量化を witness で確認する
- Level: A

$\mathbb R_{\mathrm{of}}$ で

$$
\varphi(x)=\exists y\;(x\cdot y=1)
$$

を考える。

1. $s(x)=4$ のとき充足されることを示せ。
2. $s(x)=0$ のとき充足されないことを示せ。

<!-- solution-start -->
#### 詳細解答

1 では $a=1/4$ を witness に選びます。

$$
4\cdot\frac14=1
$$

なので

$$
\mathbb R_{\mathrm{of}},s[y\mapsto1/4]
\models
x\cdot y=1.
$$

従って

$$
\mathbb R_{\mathrm{of}},s\models\exists y\;(x\cdot y=1).
$$

2 では任意の $a\in\mathbb R$ について

$$
0\cdot a=0\ne1.
$$

どの $a$ でも内側の等式を充足しないため

$$
\mathbb R_{\mathrm{of}},s\not\models\exists y\;(x\cdot y=1).
$$
<!-- solution-end -->

### Level B

<a id="ex-nsa2-b01"></a>
#### NSA2-B01 日本語を一階論理式へ展開する
- Level: B

「正の数 $x$ には正の平方根が存在する」を、自由変数 $x$ を持つ $\mathcal L_{\mathrm{of}}$ の論理式として書け。

さらに $s(x)=9$ の下で $\mathbb R_{\mathrm{of}}$ により充足されることを witness を明示して確認せよ。

<!-- solution-start -->
#### 詳細解答

一つの書き方は

$$
0<x
\to
\exists y\;
\bigl(
0<y
\land
y\cdot y=x
\bigr).
$$

自由変数は $x$ だけです。

$s(x)=9$ とすると前件 $0<9$ は真です。後件では $y=3$ を witness に選びます。

$$
0<3,
\qquad
3\cdot3=9
$$

なので

$$
\mathbb R_{\mathrm{of}},s[y\mapsto3]
\models
0<y\land y\cdot y=x.
$$

従って与えた論理式は $s(x)=9$ の下で充足されます。
<!-- solution-end -->

<a id="ex-nsa2-b02"></a>
#### NSA2-B02 一階でそのまま書ける範囲を判定する
- Level: B

次の主張について、現在の一ソート言語 $\mathcal L_{\mathrm{of}}$ の一階論理式としてそのまま書けるか判定せよ。書けない場合は不足している語彙またはソートを説明せよ。

1. 加法は可換である。
2. 任意の非零元は乗法逆元を持つ。
3. $x$ は標準実数である。
4. $x$ は無限小である。
5. 全ての非空有界部分集合は上限を持つ。
6. 固定した関数 $f:\mathbb R\to\mathbb R$ について $f(0)=1$ である。

<!-- solution-start -->
#### 詳細解答

1 は

$$
\forall x\forall y\;(x+y=y+x)
$$

と書けます。

2 は

$$
\forall x\;
\bigl(
x\ne0
\to
\exists y\;(x\cdot y=1)
\bigr)
$$

と書けます。

3 はそのままでは書けません。$\mathcal L_{\mathrm{of}}$ には「標準である」を表す関係記号がありません。

4 もそのままでは書けません。無限小の定義には「全ての正の標準実数」という外部的な範囲指定が現れます。

5 は通常の定式化で部分集合そのものを量化する必要があります。一ソートの $\mathcal L_{\mathrm{of}}$ の変数は数しか走らないので、そのままでは書けません。

6 は現在の言語に $f$ という関数記号がないため、そのままでは書けません。ただし言語へ1項関数記号 $f$ を追加し、構造で実際の固定関数として解釈すれば

$$
f(0)=1
$$

は原子論理式として書けます。

判定の基準は日本語文の印象ではなく、固定した言語の記号とソートです。
<!-- solution-end -->

<a id="ex-nsa2-b03"></a>
#### NSA2-B03 多ソート言語で型を確認する
- Level: B

ソート $R$ と $\operatorname{Set}(R)$ を持ち、

$$
+:R\times R\to R,
\qquad
<\ \subseteq R\times R,
\qquad
\in\ \subseteq R\times\operatorname{Set}(R)
$$

を備えた多ソート言語を考える。

次を判定せよ。

1. $x^R+1$ は項か。
2. $x^R\in A^{\operatorname{Set}(R)}$ は論理式か。
3. $A^{\operatorname{Set}(R)}+1$ は項か。
4. 次は文か。

$$
\exists A^{\operatorname{Set}(R)}
\forall x^R\;
(x\in A\leftrightarrow0<x).
$$

<!-- solution-start -->
#### 詳細解答

1 は項です。$+$ の二つの入力はともに $R$ ソートで、$x^R$ と $1$ はその型に合っています。

2 は原子論理式です。所属関係の型は $R\times\operatorname{Set}(R)$ なので、第1入力 $x$ と第2入力 $A$ のソートが一致します。

3 は項ではありません。$+$ の入力は $R$ ソートでなければなりませんが、$A$ は集合ソートです。

4 は型の合った文です。内側の所属関係と大小関係はいずれも型が合っています。$\forall x^R$ が $x$ を、$\exists A^{\operatorname{Set}(R)}$ が $A$ を束縛するので自由変数は残りません。
<!-- solution-end -->

### Level C

<a id="ex-nsa2-c01"></a>
#### NSA2-C01 充足の自由変数依存性を構文帰納法で再構成する
- Level: C

$\mathcal L$-構造 $\mathcal M$ と一階論理式 $\varphi$ を取る。

二つの変数割当て $s,r$ が全ての

$$
x\in\operatorname{FV}(\varphi)
$$

について一致するとき

$$
\mathcal M,s\models\varphi
\iff
\mathcal M,r\models\varphi
$$

を構文帰納法で証明せよ。

特に $\varphi=\exists x\,\psi$ の場合、$s$ 側で得た witness $a$ を $r$ 側でも使える理由を、変更後割当てが $\operatorname{FV}(\psi)$ 上で一致することから説明せよ。

<!-- solution-start -->
#### 詳細解答

論理式の構成に関して帰納法を行います。

**原子論理式。** $\varphi=(t=u)$ なら、仮定から $s,r$ は $t,u$ に現れる全変数で一致します。従って項の変数依存性から

$$
t^{\mathcal M}[s]=t^{\mathcal M}[r],
\qquad
u^{\mathcal M}[s]=u^{\mathcal M}[r].
$$

よって等号の真偽は一致します。$R(t_1,\ldots,t_k)$ でも各項の値が一致するため、$R^{\mathcal M}$ への所属は一致します。

**否定。** $\varphi=\neg\psi$ なら自由変数集合は $\psi$ と同じです。帰納法の仮定から $\psi$ の真偽が一致し、その否定も一致します。

**論理積・論理和。** $\varphi=\psi\land\theta$ なら

$$
\operatorname{FV}(\varphi)
=
\operatorname{FV}(\psi)\cup\operatorname{FV}(\theta).
$$

従って $s,r$ は両部分論理式の自由変数上で一致します。帰納法の仮定から各真偽が一致するので論理積も一致します。論理和も同じです。

**存在量化。** $\varphi=\exists x\,\psi$ とし

$$
\mathcal M,s\models\exists x\,\psi
$$

を仮定します。ある $a\in M$ が存在して

$$
\mathcal M,s[x\mapsto a]\models\psi.
$$

また

$$
\operatorname{FV}(\exists x\,\psi)
=
\operatorname{FV}(\psi)\setminus\{x\}.
$$

$z\in\operatorname{FV}(\psi)$ を取ります。$z=x$ なら

$$
s[x\mapsto a](x)=a=r[x\mapsto a](x).
$$

$z\ne x$ なら $z\in\operatorname{FV}(\exists x\,\psi)$ なので $s(z)=r(z)$ です。従って

$$
s[x\mapsto a](z)
=
r[x\mapsto a](z).
$$

二つの変更後割当ては $\operatorname{FV}(\psi)$ 上で一致するので、帰納法の仮定から

$$
\mathcal M,r[x\mapsto a]\models\psi.
$$

同じ $a$ が $r$ 側でも witness になるため

$$
\mathcal M,r\models\exists x\,\psi.
$$

逆向きは $s,r$ を入れ替えれば同じです。

**全称量化。** $\varphi=\forall x\,\psi$ とします。$\mathcal M,s\models\forall x\,\psi$ なら任意の $a\in M$ について

$$
\mathcal M,s[x\mapsto a]\models\psi.
$$

存在量化の場合と同じ理由で変更後割当ては $\operatorname{FV}(\psi)$ 上で一致するため

$$
\mathcal M,r[x\mapsto a]\models\psi.
$$

$a$ は任意なので

$$
\mathcal M,r\models\forall x\,\psi.
$$

逆向きも同じです。

以上で示されました。存在量化で重要なのは、別の witness を探し直すのではなく、同じ $a$ を使った二つの変更後割当てを比較したことです。NSA3 の Łoś の定理でも、この構造が再び現れます。
<!-- solution-end -->
