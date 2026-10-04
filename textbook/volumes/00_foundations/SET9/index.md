# SET9 弱い選択原理と超フィルター

<!-- definition-example-audit: strict -->

F0-00A2 と F0-00A3A では、完全な選択公理

$$
\mathrm{AC}
$$

と [Zorn の補題](../F0_00A3_半順序_Zorn_極大延長/index.md#thm-zorn)・[整列可能定理](../F0_00A2_選択公理_Zorn_極大原理/index.md#thm-well-ordering)が ZF 上で同値であることを学びました。

しかし実際の数学では、「選択を使うか、全く使わないか」の二択だけでは粗すぎます。添字集合を可算に限ればよい問題、直前に選んだ値へ依存して次の値を選ぶ問題、フィルターを極大化すれば足りる問題では、必要な選択原理の形が異なります。

この章では

$$
\boxed{
\text{有限選択}
\;\longrightarrow\;
\text{可算選択}
\;\longrightarrow\;
\text{従属選択}
\;\longrightarrow\;
\text{完全な選択公理}
}
$$

を「何を選ぶ原理なのか」という視点で整理し、さらにフィルターの極大延長へ進みます。

フィルター自体は [TOP6 の定義](../TOP6/index.md#def-top6-filter)を正本として使います。TOP6 の Baire・net などをこの章で使うわけではありません。必要なのはフィルターの三条件だけです。

---

## 1. 有限個なら追加の選択公理はいらない

有限個の非空集合から一つずつ元を取るだけなら、ZF の通常の有限帰納法で処理できます。

<a id="thm-set9-finite-choice"></a>
<!-- formal-statement-start -->
### 定理（有限選択）

$n\in\mathbb N$ とし、

$$
A_0,\ldots,A_{n-1}
$$

を非空集合とする。

このとき

$$
f:\{0,\ldots,n-1\}\to\bigcup_{k<n}A_k
$$

で

$$
f(k)\in A_k
\qquad(k<n)
$$

を満たす関数 $f$ が存在する。
<!-- formal-statement-end -->

<!-- proof-start -->
### 証明

$n$ に関する帰納法を使います。

$n=0$ なら空関数でよいです。

$n$ 個の場合に選択関数

$$
f_n:\{0,\ldots,n-1\}\to\bigcup_{k<n}A_k
$$

が存在すると仮定します。

$A_n$ は非空なので、

$$
a_n\in A_n
$$

となる元を一つ取れます。ここでは一つの非空集合から一つの元を取っているだけで、集合族全体について一斉に選んでいるわけではありません。

そこで

$$
f_{n+1}
=
f_n\cup\{(n,a_n)\}
$$

と置けば、

$$
f_{n+1}(k)\in A_k
\qquad(k<n+1)
$$

です。

従って有限帰納法から任意の有限 $n$ で選択関数が存在します。$\square$
<!-- proof-end -->

有限回の「存在する元を一つ取る」を、可算無限回そのまま続けてよいとは限りません。可算無限族について一つの関数を作る主張が [可算選択公理](../F0_00A2_選択公理_Zorn_極大原理/index.md#axiom-countable-choice)です。

---

## 2. 従属選択：次の一点が直前の一点に依存する

可算選択では、最初から非空集合列

$$
A_0,A_1,A_2,\ldots
$$

が与えられ、各 $A_n$ から一点ずつ取ります。

別の型の問題では、次に選んでよい点が直前に選んだ点によって変わります。例えば、

> 現在の状態 $x$ が決まると、そこから進める次の状態 $y$ が少なくとも一つ存在する

という局所的な延長条件から、無限列を一本作りたい場合です。

<a id="axiom-set9-dependent-choice"></a>
<!-- formal-statement-start -->
### 公理（従属選択公理）

$X$ を非空集合、$R\subseteq X\times X$ を

$$
\forall x\in X\ \exists y\in X:\ xRy
$$

を満たす関係とする。

このとき任意の $x_0\in X$ に対し、列

$$
(x_n)_{n\in\mathbb N}
$$

が存在して

$$
x_nRx_{n+1}
\qquad(n\in\mathbb N)
$$

を満たす、という原理を **従属選択公理**（dependent choice; DC）という。
<!-- formal-statement-end -->

<!-- definition-example-start: axiom-set9-dependent-choice -->
**意味の確認。**

可算選択では第 $n$ 回の選択肢 $A_n$ が先に固定されています。

DC では第 $n+1$ 回に選べる集合は

$$
R[x_n]
=
\{y\in X:x_nRy\}
$$

のように、実際に選んだ $x_n$ に依存します。

「各段階で次へ進める」から「無限に進む一本の列がある」へ移る原理だと読むと役割が明確です。
<!-- definition-example-end -->

---

## 3. 完全な選択公理から DC を導く

<a id="thm-set9-ac-implies-dc"></a>
<!-- formal-statement-start -->
### 定理（AC は DC を導く）

ZF に完全な選択公理を加えると、従属選択公理 DC が成り立つ。
<!-- formal-statement-end -->

<!-- proof-start -->
### 証明

$X$ と $R$ が DC の仮定

$$
\forall x\in X\ \exists y\in X:\ xRy
$$

を満たすとします。

各 $x\in X$ に対して

$$
R[x]
=
\{y\in X:xRy\}
$$

と置くと、全ての $R[x]$ は非空です。

完全な[選択公理](../F0_00A2_選択公理_Zorn_極大原理/index.md#axiom-choice)を集合族

$$
\{R[x]:x\in X\}
$$

へ適用し、

$$
c(x)\in R[x]
$$

を満たす関数

$$
c:X\to X
$$

を取ります。定義から

$$
xRc(x)
\qquad(x\in X).
$$

初期点 $x_0\in X$ を固定し、自然数上の再帰で

$$
x_{n+1}=c(x_n)
$$

と定めます。

すると各 $n$ について

$$
x_nRx_{n+1}.
$$

よって DC が成り立ちます。$\square$
<!-- proof-end -->

この証明で AC がした仕事は、各点 $x$ に対して非空な次候補集合 $R[x]$ から **同時に** 一点を選び、単一の関数 $c$ にしたことです。

---

## 4. DC から可算選択を導く

<a id="thm-set9-dc-implies-countable-choice"></a>
<!-- formal-statement-start -->
### 定理（DC は可算選択を導く）

ZF に DC を加えると、可算選択公理が成り立つ。
<!-- formal-statement-end -->

<!-- proof-start -->
### 証明

非空集合列

$$
(A_n)_{n\in\mathbb N}
$$

を取ります。

有限段階までの選択を記録する集合

$$
X
=
\bigcup_{n\in\mathbb N}
\prod_{k<n}A_k
$$

を考えます。

$X$ の元は、ある $n$ までの有限選択列

$$
s=(s(0),\ldots,s(n-1))
$$

です。空列も $X$ に含めます。

$s$ の長さを $n$ とするとき、

$$
sRt
$$

を

> $t$ は $s$ を一項だけ延長し、$t(n)\in A_n$ を満たす

ことと定めます。

$A_n$ は非空なので、任意の有限列 $s$ には少なくとも一つ $R$-後続 $t$ が存在します。

DC を空列から適用すると、

$$
s_0Rs_1Rs_2R\cdots
$$

という列が得られます。各段階で長さが1ずつ増えるので、

$$
\operatorname{dom}(s_n)=\{0,\ldots,n-1\}.
$$

また $s_{n+1}$ は $s_n$ を延長するため、

$$
f
=
\bigcup_{n\in\mathbb N}s_n
$$

は関数です。

任意の $k$ について $s_{k+1}(k)\in A_k$ なので

$$
f(k)\in A_k.
$$

従って $f$ は可算集合族 $(A_n)$ の選択関数です。$\square$
<!-- proof-end -->

ここまでで

$$
\mathrm{AC}
\Longrightarrow
\mathrm{DC}
\Longrightarrow
\mathrm{AC}_\omega
$$

を実際に証明しました。

逆向きについては、この系列では証明しません。ZF のモデルを比較する独立性理論が必要になります。したがって「DC と AC は同じ」「可算選択があれば完全な AC も出る」とは扱いません。

---

## 5. フィルターの正本を再利用する

[TOP6](../TOP6/index.md#def-top6-filter) では、集合 $X$ 上のフィルターを

$$
\mathcal F\subseteq\mathcal P(X)
$$

で、

1. $\mathcal F\ne\varnothing$ かつ $\varnothing\notin\mathcal F$、
2. $A,B\in\mathcal F\Rightarrow A\cap B\in\mathcal F$、
3. $A\in\mathcal F,\ A\subseteq B\subseteq X\Rightarrow B\in\mathcal F$

を満たすものとして定義しました。

この定義は既に空集合を含まないので、本章でいうフィルターは文献で **真のフィルター（proper filter）** と呼ばれるものに対応します。ここでは重複定義を作りません。

---

## 6. 超フィルター：これ以上大きくできないフィルター

フィルターを包含関係で大きくしていくと、「真のフィルターのままこれ以上集合を追加できない」ところまで進めることがあります。

<a id="def-set9-ultrafilter"></a>
<!-- formal-statement-start -->
### 定義（超フィルター）

集合 $X$ 上のフィルター $\mathcal U$ が **超フィルター**（ultrafilter）であるとは、$\mathcal U$ を真に含む $X$ 上のフィルターが存在しないことをいう。
<!-- formal-statement-end -->

<!-- definition-example-start: def-set9-ultrafilter -->
**定義の確認。**

$x\in X$ を固定して

$$
\mathcal U_x
=
\{A\subseteq X:x\in A\}
$$

と置きます。

これは TOP6 の一点フィルターです。後で示す二者択一性から、任意の $A\subseteq X$ について $x\in A$ なら $A\in\mathcal U_x$、$x\notin A$ なら $X\setminus A\in\mathcal U_x$ なので、$\mathcal U_x$ は超フィルターです。
<!-- definition-example-end -->

<a id="thm-set9-ultrafilter-dichotomy"></a>
<!-- formal-statement-start -->
### 定理（超フィルターの二者択一）

$\mathcal U$ を $X$ 上のフィルターとする。

$\mathcal U$ が超フィルターであることと、任意の $A\subseteq X$ について

$$
A\in\mathcal U
\quad\text{または}\quad
X\setminus A\in\mathcal U
$$

が成り立つことは同値である。
<!-- formal-statement-end -->

<!-- proof-start -->
### 証明

まず $\mathcal U$ を超フィルターとします。

$A\notin\mathcal U$ と仮定します。もし全ての $B\in\mathcal U$ について

$$
B\cap A\ne\varnothing
$$

なら、

$$
\mathcal F_A
=
\{C\subseteq X:\exists B\in\mathcal U,\ B\cap A\subseteq C\}
$$

と置けます。

$\mathcal F_A$ は $\mathcal U$ を含み、$A\in\mathcal F_A$ です。また仮定により空集合は入りません。有限共通部分と上方閉性も定義から確認できるので、$\mathcal F_A$ は $\mathcal U$ を真に含むフィルターになります。

これは超フィルターの極大性に反します。

したがって、ある $B\in\mathcal U$ が存在して

$$
B\cap A=\varnothing.
$$

すると

$$
B\subseteq X\setminus A.
$$

フィルターの上方閉性から

$$
X\setminus A\in\mathcal U.
$$

よって二者択一が成り立ちます。

逆に二者択一を仮定し、$\mathcal U\subsetneq\mathcal F$ となるフィルター $\mathcal F$ があるとします。

$$
A\in\mathcal F\setminus\mathcal U
$$

を取ります。二者択一から

$$
X\setminus A\in\mathcal U\subseteq\mathcal F.
$$

するとフィルターの有限共通部分閉性から

$$
\varnothing
=
A\cap(X\setminus A)
\in\mathcal F,
$$

となりフィルターの定義に反します。

従って $\mathcal U$ は極大で、超フィルターです。$\square$
<!-- proof-end -->

---

## 7. 主超フィルターと自由超フィルター

超フィルターがどのように一点へ集中しているかを区別したい場面があります。最も単純なのは、ある一点 $x$ を含む集合を全部集めた場合です。まずこの型に名前を付け、その後で一点には集中しない超フィルターを分けます。

<a id="def-set9-principal-ultrafilter"></a>
<!-- formal-statement-start -->
### 定義（主超フィルター）

$x\in X$ に対して

$$
\mathcal U_x
=
\{A\subseteq X:x\in A\}
$$

の形で書ける超フィルターを **主超フィルター**という。
<!-- formal-statement-end -->

<!-- definition-example-start: def-set9-principal-ultrafilter -->
**定義の確認。**

$\mathcal U_x$ には一元集合

$$
\{x\}
$$

が入ります。

逆に超フィルター $\mathcal U$ が $\{x\}$ を含むなら、上方閉性から $x$ を含む全ての集合が $\mathcal U$ に入り、$x$ を含まない集合はその補集合が $x$ を含むので $\mathcal U$ に入れません。従って

$$
\mathcal U=\mathcal U_x.
$$
<!-- definition-example-end -->

一点から作る場合を除いた超フィルターは、無限集合上で「特定の一点ではなく大きな部分集合を選ぶ」役割を持ちます。そこで次の名前を付けます。

<a id="def-set9-free-ultrafilter"></a>
<!-- formal-statement-start -->
### 定義（自由超フィルター）

主超フィルターでない超フィルターを **自由超フィルター**という。
<!-- formal-statement-end -->

<!-- definition-example-start: def-set9-free-ultrafilter -->
**定義の確認。**

有限集合 $X$ 上では全ての超フィルターが主超フィルターです。

一方、無限集合では後で「有限個の例外を無視する」フィルターを極大まで延長すると自由超フィルターを得られます。ただし、この延長には選択原理が必要です。
<!-- definition-example-end -->

---

## 8. $\mathbb N$ 上で有限個の例外を無視する

自由超フィルターを作る出発点には、「有限個の例外を無視する」という最小限の大きさの概念が必要です。自然数上では、補集合が有限な集合をすべて集めると、その役割を持つフィルターになります。

<a id="def-set9-cofinite-filter"></a>
<!-- formal-statement-start -->
### 定義（余有限フィルター）

無限集合 $X$ に対して

$$
\mathcal F_{\mathrm{cof}}
=
\{A\subseteq X:X\setminus A\text{ が有限}\}
$$

と置く。

これを $X$ 上の **余有限フィルター** という。
<!-- formal-statement-end -->

<!-- definition-example-start: def-set9-cofinite-filter -->
**定義の確認：$\mathbb N$。**

$$
\{10,11,12,\ldots\}
$$

は補集合 $\{0,1,\ldots,9\}$ が有限なので余有限フィルターに入ります。

偶数全体の集合は補集合である奇数全体も無限なので、余有限フィルターには入りません。
<!-- definition-example-end -->

<a id="prop-set9-cofinite-is-filter"></a>
<!-- formal-statement-start -->
### 命題（余有限族はフィルターである）

無限集合 $X$ 上の $\mathcal F_{\mathrm{cof}}$ はフィルターである。
<!-- formal-statement-end -->

<!-- proof-start -->
### 証明

$X\setminus X=\varnothing$ は有限なので

$$
X\in\mathcal F_{\mathrm{cof}}.
$$

一方

$$
X\setminus\varnothing=X
$$

は無限なので

$$
\varnothing\notin\mathcal F_{\mathrm{cof}}.
$$

$A,B\in\mathcal F_{\mathrm{cof}}$ なら

$$
X\setminus(A\cap B)
=
(X\setminus A)\cup(X\setminus B).
$$

右辺は有限集合二つの和なので有限です。従って

$$
A\cap B\in\mathcal F_{\mathrm{cof}}.
$$

最後に

$$
A\in\mathcal F_{\mathrm{cof}},
\qquad
A\subseteq B\subseteq X
$$

なら

$$
X\setminus B
\subseteq
X\setminus A.
$$

有限集合の部分集合は有限なので

$$
B\in\mathcal F_{\mathrm{cof}}.
$$

よってフィルターの三条件を満たします。$\square$
<!-- proof-end -->

---

## 9. Zorn の補題でフィルターを超フィルターへ延長する

<a id="thm-set9-ultrafilter-lemma-from-zorn"></a>
<!-- formal-statement-start -->
### 定理（超フィルター拡張補題）

集合 $X$ 上のフィルター $\mathcal F_0$ に対して、$\mathcal F_0$ を含む超フィルター $\mathcal U$ が存在する。
<!-- formal-statement-end -->

この主張そのものを **超フィルター補題**（ultrafilter lemma）と呼びます。ここでは [Zorn の補題](../F0_00A3_半順序_Zorn_極大延長/index.md#thm-zorn)から導くため、ZFC では成立することが分かります。

<!-- proof-start -->
### 証明

$\mathcal F_0$ を含む $X$ 上のフィルター全体を

$$
P
=
\{
\mathcal F:
\mathcal F\text{ は }X\text{ 上のフィルター},\
\mathcal F_0\subseteq\mathcal F
\}
$$

とし、包含関係で順序付けます。

$\mathcal F_0\in P$ なので $P$ は非空です。

$C\subseteq P$ を鎖とします。

$$
\mathcal F_C
=
\bigcup_{\mathcal F\in C}\mathcal F
$$

と置きます。

まず $\varnothing$ はどの $\mathcal F\in C$ にも入らないので

$$
\varnothing\notin\mathcal F_C.
$$

$A,B\in\mathcal F_C$ とします。ある $\mathcal F_1,\mathcal F_2\in C$ が存在して

$$
A\in\mathcal F_1,
\qquad
B\in\mathcal F_2.
$$

$C$ は鎖なので、例えば

$$
\mathcal F_1\subseteq\mathcal F_2
$$

とできます。すると $A,B\in\mathcal F_2$ だから

$$
A\cap B\in\mathcal F_2\subseteq\mathcal F_C.
$$

上方閉性も、$A\in\mathcal F_C$ を含む一つのフィルターで確認すれば従います。

したがって $\mathcal F_C$ はフィルターです。また全ての $\mathcal F\in C$ を含むので鎖 $C$ の上界です。

よって $P$ の任意の鎖は上界を持ちます。[Zorn の補題](../F0_00A3_半順序_Zorn_極大延長/index.md#thm-zorn)から、$P$ は極大元 $\mathcal U$ を持ちます。

$\mathcal U$ を真に含むフィルターがあれば、それも $\mathcal F_0$ を含むので $P$ に属し、$\mathcal U$ の極大性に反します。

従って $\mathcal U$ は超フィルターです。$\square$
<!-- proof-end -->

### 論理的な強さについて

上の証明は [Zorn の補題](../F0_00A3_半順序_Zorn_極大延長/index.md#thm-zorn)、したがって完全な AC を使っています。

しかしこれは

> 超フィルター補題そのものが完全な AC と同値

という意味ではありません。

標準的な集合論では、超フィルター補題は Boolean prime ideal theorem と同値で、完全な AC より弱い選択原理として位置付けられます。その非同値性の証明はモデル理論を必要とするため、この系列では扱いません。

したがって、この章で安全に使う関係は

$$
\mathrm{AC}
\Longrightarrow
\mathrm{Zorn}
\Longrightarrow
\text{超フィルター補題}
$$

です。

---

## 10. $\mathbb N$ 上の自由超フィルター

<a id="thm-set9-free-ultrafilter-on-n"></a>
<!-- formal-statement-start -->
### 定理（自然数上の自由超フィルターの存在）

超フィルター補題を仮定すると、$\mathbb N$ 上に自由超フィルターが存在する。
<!-- formal-statement-end -->

<!-- proof-start -->
### 証明

$\mathbb N$ 上の余有限フィルター

$$
\mathcal F_{\mathrm{cof}}
$$

を考えます。

超フィルター補題により、

$$
\mathcal F_{\mathrm{cof}}
\subseteq
\mathcal U
$$

となる超フィルター $\mathcal U$ が存在します。

$\mathcal U$ が主超フィルターだと仮定します。するとある $n\in\mathbb N$ が存在して

$$
\{n\}\in\mathcal U.
$$

一方

$$
\mathbb N\setminus\{n\}
$$

は余有限集合なので

$$
\mathbb N\setminus\{n\}
\in
\mathcal F_{\mathrm{cof}}
\subseteq
\mathcal U.
$$

フィルターの有限共通部分閉性から

$$
\varnothing
=
\{n\}
\cap
(\mathbb N\setminus\{n\})
\in\mathcal U,
$$

となり矛盾です。

従って $\mathcal U$ は主ではなく、自由超フィルターです。$\square$
<!-- proof-end -->

この証明で大事なのは、

$$
\text{余有限フィルター}
\longrightarrow
\text{超フィルターへ延長}
\longrightarrow
\text{有限集合を含めない}
\longrightarrow
\text{自由}
$$

という各段階です。

「無限集合だから自由超フィルターが当然にある」とは言っていません。

---

## 11. ZF / ZF+DC / ZFC をどう読み分けるか

この章で実際に証明した含意は

$$
\mathrm{ZFC}
\Longrightarrow
\mathrm{ZF+DC}
\Longrightarrow
\mathrm{ZF+AC_\omega}.
$$

また ZFC では [Zorn の補題](../F0_00A3_半順序_Zorn_極大延長/index.md#thm-zorn)を通じて超フィルター補題も得られます。

一方、

- 可算選択から DC が出るか、
- DC から完全な AC が出るか、
- 超フィルター補題から完全な AC が出るか

については、この章の道具だけで肯定しません。

これらを区別するには「ある公理を満たし、別の公理を満たさないモデル」を作る独立性理論が必要です。ここでは、

> **どの定理の証明で、どの選択原理を明示的に呼んだか**

を記録することを目的にします。

---

## 12. 演習

### Level A

<a id="ex-set9-a01"></a>
#### SET9-A01 有限選択を帰納法で作る
- Level: A

非空集合 $A,B,C$ から一つずつ元を選ぶ関数の存在を、有限選択の証明に沿って説明せよ。

<!-- solution-start -->
#### 詳細解答

$A$ は非空なので $a\in A$ を一つ取ります。

次に $B$ は非空なので $b\in B$ を一つ取り、さらに $C$ は非空なので $c\in C$ を一つ取ります。

$$
f(0)=a,\qquad
f(1)=b,\qquad
f(2)=c
$$

と置けば、

$$
f(0)\in A,\quad
f(1)\in B,\quad
f(2)\in C.
$$

有限回の選択は有限帰納法で閉じるため、完全な選択公理を別に仮定する必要はありません。
<!-- solution-end -->

<a id="ex-set9-a02"></a>
#### SET9-A02 DC の「従属」を読む
- Level: A

$X=\mathbb N$ とし、

$$
mRn
\quad\Longleftrightarrow\quad
n>m
$$

とする。DC の仮定を満たすことを確認し、DC が与える列の性質を述べよ。

<!-- solution-start -->
#### 詳細解答

任意の $m\in\mathbb N$ に対して

$$
n=m+1
$$

と取れば $n>m$ なので

$$
mRn.
$$

従って

$$
\forall m\ \exists n:\ mRn
$$

を満たします。

DC は任意の初期値 $x_0$ から

$$
x_0<x_1<x_2<\cdots
$$

となる無限列を与えます。

この例では $x_{n+1}=x_n+1$ という明示的規則があるので実際には DC は不要ですが、DC の形式を確認する最小例になっています。
<!-- solution-end -->

<a id="ex-set9-a03"></a>
#### SET9-A03 余有限フィルターを判定する
- Level: A

$\mathbb N$ の次の部分集合が余有限フィルターに入るか判定せよ。

1. $\{100,101,102,\ldots\}$
2. 偶数全体
3. $\mathbb N\setminus\{2,5,11\}$

<!-- solution-start -->
#### 詳細解答

余有限フィルターに入る条件は、補集合が有限であることです。

1. 補集合は $\{0,\ldots,99\}$ で有限なので入ります。
2. 補集合は奇数全体で無限なので入りません。
3. 補集合は $\{2,5,11\}$ で有限なので入ります。
<!-- solution-end -->

<a id="ex-set9-a04"></a>
#### SET9-A04 主超フィルターの二者択一
- Level: A

$x\in X$ とし、

$$
\mathcal U_x=\{A\subseteq X:x\in A\}
$$

とする。任意の $A\subseteq X$ について

$$
A\in\mathcal U_x
\quad\text{または}\quad
X\setminus A\in\mathcal U_x
$$

が成り立つことを示せ。

<!-- solution-start -->
#### 詳細解答

任意の $A\subseteq X$ について、通常の排中律から

$$
x\in A
$$

または

$$
x\notin A
$$

です。

$x\in A$ なら定義から

$$
A\in\mathcal U_x.
$$

$x\notin A$ なら

$$
x\in X\setminus A
$$

なので

$$
X\setminus A\in\mathcal U_x.
$$

従って二者択一が成り立ち、本文の定理から $\mathcal U_x$ は超フィルターです。
<!-- solution-end -->

### Level B

<a id="ex-set9-b01"></a>
#### SET9-B01 AC から DC への選択関数を特定する
- Level: B

$R$ が

$$
\forall x\in X\ \exists y\in X:\ xRy
$$

を満たすとする。AC を使う対象となる集合族と、得られる選択関数を明示せよ。

<!-- solution-start -->
#### 詳細解答

各 $x\in X$ に対して

$$
R[x]=\{y\in X:xRy\}
$$

と置きます。

仮定から全ての $R[x]$ は非空です。

したがって AC を非空集合族

$$
\{R[x]:x\in X\}
$$

へ適用し、

$$
c(x)\in R[x]
$$

を満たす関数 $c$ を取ります。

これは

$$
xRc(x)
$$

を全ての $x$ で満たします。

あとは自然数上の通常の再帰で

$$
x_{n+1}=c(x_n)
$$

と定めれば DC の列を得ます。
<!-- solution-end -->

<a id="ex-set9-b02"></a>
#### SET9-B02 鎖のフィルターの合併
- Level: B

包含関係で鎖をなすフィルター族 $C$ に対し、

$$
\mathcal F_C=\bigcup_{\mathcal F\in C}\mathcal F
$$

がフィルターであることを示せ。特に有限共通部分閉性で鎖性を使う箇所を明示せよ。

<!-- solution-start -->
#### 詳細解答

空集合はどの $\mathcal F\in C$ にも入らないので

$$
\varnothing\notin\mathcal F_C.
$$

$A,B\in\mathcal F_C$ を取ります。

ある $\mathcal F_1,\mathcal F_2\in C$ があって

$$
A\in\mathcal F_1,\qquad
B\in\mathcal F_2.
$$

ここで $C$ が鎖なので、

$$
\mathcal F_1\subseteq\mathcal F_2
$$

または逆向きです。前者としてよいです。

すると $A,B$ は同じフィルター $\mathcal F_2$ に入り、

$$
A\cap B\in\mathcal F_2\subseteq\mathcal F_C.
$$

これが鎖性を使う核心です。

上方閉性は、$A$ を含む一つのフィルターに $A\subseteq B$ を適用すれば従います。

従って $\mathcal F_C$ はフィルターです。
<!-- solution-end -->

<a id="ex-set9-b03"></a>
#### SET9-B03 余有限フィルターの延長は自由
- Level: B

$\mathcal U$ が $\mathbb N$ 上の超フィルターで

$$
\mathcal F_{\mathrm{cof}}\subseteq\mathcal U
$$

を満たすとする。$\mathcal U$ が主超フィルターではないことを示せ。

<!-- solution-start -->
#### 詳細解答

反対に $\mathcal U=\mathcal U_n$ とします。

主超フィルターなので

$$
\{n\}\in\mathcal U.
$$

一方、$\mathbb N\setminus\{n\}$ は余有限集合なので

$$
\mathbb N\setminus\{n\}
\in
\mathcal F_{\mathrm{cof}}
\subseteq
\mathcal U.
$$

有限共通部分閉性から

$$
\varnothing
=
\{n\}\cap(\mathbb N\setminus\{n\})
\in\mathcal U,
$$

となりフィルターの定義に反します。

従って $\mathcal U$ は自由超フィルターです。
<!-- solution-end -->

### Level C

<a id="ex-set9-c01"></a>
#### SET9-C01 自由超フィルターの存在まで選択原理を監査する
- Level: C

$\mathbb N$ 上の自由超フィルターを得る構成を、

1. 余有限フィルターの構成
2. Zorn を適用する半順序集合
3. 鎖の上界
4. 極大元が超フィルターになる理由
5. 主でない理由

の順に再構成し、どこで選択原理を使ったかを明示せよ。

<!-- solution-start -->
#### 詳細解答

**1. 余有限フィルター。**

$$
\mathcal F_{\mathrm{cof}}
=
\{A\subseteq\mathbb N:\mathbb N\setminus A\text{ が有限}\}
$$

と置きます。

有限集合の和が有限であることから有限共通部分閉性が従い、上方閉性も補集合の包含から従います。ここでは選択公理を使いません。

**2. 半順序集合。**

$$
P
=
\{
\mathcal F:
\mathcal F\text{ は }\mathbb N\text{ 上のフィルター},
\ \mathcal F_{\mathrm{cof}}\subseteq\mathcal F
\}
$$

を包含関係で順序付けます。

**3. 鎖の上界。**

鎖 $C\subseteq P$ に対し

$$
\mathcal F_C
=
\bigcup_{\mathcal F\in C}\mathcal F
$$

と置きます。

$A,B$ が合併に入るとき、鎖性により両方を含む一方のフィルターを選べるため、

$$
A\cap B\in\mathcal F_C.
$$

従って $\mathcal F_C$ はフィルターで、$C$ の上界です。

**4. 極大元。**

ここで [Zorn の補題](../F0_00A3_半順序_Zorn_極大延長/index.md#thm-zorn)を使います。

$$
\mathcal U\in P
$$

という極大元が存在します。

$\mathcal U$ を真に含むフィルターがあれば、それも $\mathcal F_{\mathrm{cof}}$ を含むため $P$ の元となり、極大性に反します。従って $\mathcal U$ は超フィルターです。

**5. 自由性。**

もし $\mathcal U$ が $n$ による主超フィルターなら

$$
\{n\}\in\mathcal U.
$$

しかし余有限集合

$$
\mathbb N\setminus\{n\}
$$

も $\mathcal U$ に入ります。交わりが空集合なので矛盾です。

従って $\mathcal U$ は自由です。

**選択原理の監査。**

余有限フィルターの構成には選択公理を使っていません。

フィルターの鎖の合併が上界になる確認にも使っていません。

選択原理を使うのは、鎖上界条件から極大フィルターの存在を得る **[Zorn の補題](../F0_00A3_半順序_Zorn_極大延長/index.md#thm-zorn)の適用**です。

F0-00A3A により Zorn は完全な AC から導けます。一方、超フィルター拡張という結論自体は完全な AC より弱い選択原理として扱えるため、「この証明が AC を使った」ことと「この結論が AC と同値」であることは区別します。
<!-- solution-end -->

---

## 13. 次章への接続

この章で、選択原理を一枚岩として扱わず、

- 有限選択
- 可算選択
- 従属選択
- 完全な選択公理
- 超フィルター補題

を役割ごとに分けました。

次章ではこれを抽象論のまま終わらせず、既存の DREAM THEATER へ戻します。

Hamel 基底、Hahn--Banach、極大イデアル、Vitali 集合、Tychonoff 型の積コンパクト性、そして超準解析の自由超フィルターの入口で、

> **どこで何を選んでいるのか**

を一件ずつ監査します。
