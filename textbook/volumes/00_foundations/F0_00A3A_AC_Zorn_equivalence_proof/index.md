# F0-00A3A 選択公理とZornの補題の同値性

[F0-00A2](../F0_00A2_選択公理_Zorn_極大原理/index.md) では、非空集合族から一斉に元を選ぶ選択公理を学びました。[F0-00A3](../F0_00A3_半順序_Zorn_極大延長/index.md#thm-zorn) では、鎖ごとに上界を作れる半順序集合から極大元を得る [Zorn の補題](../F0_00A3_半順序_Zorn_極大延長/index.md#thm-zorn)を学びました。

見かけ上は、

- 「各集合から一つずつ選ぶ」
- 「これ以上延長できない候補を得る」

という別の問題です。この章の目的は、両者の間で**何を候補に取り、どの順序を入れ、どこで停止を保証するか**を実際に追い、

$$
\boxed{\mathrm{AC}\iff\mathrm{Zorn}}
$$

を方向ごとの構成として理解することです。

A2 では、この証明には超限的な集合論が必要になるため後送しました。ここでは、その追加道具を先に説明してから証明へ進みます。

---

## 0. この補講で追加して使う集合論の道具

自然数だけを添字にする帰納法では、任意の集合の元を「全部選び終わるまで」並べるには足りない場合があります。そこで、自然数より長い段階も一つの順序で扱える添字が必要です。

この役割を担うのが **順序数**です。この補講では、順序数について次を標準的な ZF の結果として使います。

- 各順序数 $\alpha$ は、それ自身が整列集合である。
- $\beta<\alpha$ は「$\beta$ が $\alpha$ より前の段階である」と読める。
- 任意の整列集合は、ただ一つの順序数と順序同型である。

したがって、整列集合を

$$
\{p_\alpha:\alpha<\kappa\}
$$

のように「順序数 $\kappa$ までの段階」で番号付けできます。

もう一つ必要なのが **超限再帰**です。通常の再帰では $n$ 番目までの値から $n+1$ 番目を決めます。超限再帰では、段階 $\beta$ の値を、それ以前の全ての値

$$
\{x_\xi:\xi<\beta\}
$$

から決めます。極限段階では、それまでの全段階をまとめて次へ進みます。この補講では「各段階の値が、それ以前の値から一意に定まるなら、その構成を順序数に沿って実行できる」という超限再帰定理を使います。

さらに [Hartogs の補題](#lem-f0-00a3a-hartogs)の証明では **置換公理図式（Replacement schema）**を使います。必要なのは、「集合の各要素に一意に対応する対象を割り当てたとき、その像全体も集合になる」という形です。

これらはすべて ZF の中で証明できる道具です。選択公理そのものを途中で使ってはいけない方向では、選択公理を密輸入しません。

証明全体は

$$
\boxed{
\mathrm{Zorn}
\Longrightarrow
\mathrm{AC}
\Longrightarrow
\text{整列可能定理}
\Longrightarrow
\mathrm{Zorn}
}
$$

という三段階で進みます。

---

## 1. Zorn の補題から選択公理へ

非空集合からなる添字付き集合族

$$
\{A_i\}_{i\in I},
\qquad
A_i\ne\varnothing\quad(i\in I)
$$

を任意に取ります。目標は

$$
f(i)\in A_i
\qquad(i\in I)
$$

を満たす選択関数 $f$ を作ることです。

一度に全て選べないなら、まず「一部の添字についてだけ選択済み」という候補を集め、[Zorn の補題](../F0_00A3_半順序_Zorn_極大延長/index.md#thm-zorn)でこれ以上延長できない候補を取る、という発想を使います。

### 証明の見取り図

候補を $(J,f)$ とし、$J\subseteq I$ 上だけ選択済みであることを表します。定義域が広い候補ほど大きいと順序付けます。候補の鎖は関数グラフの合併で上から押さえられるので [Zorn の補題](../F0_00A3_半順序_Zorn_極大延長/index.md#thm-zorn)が使えます。最後に、極大候補の定義域が $I$ 全体でなければ、未選択の添字を一つ追加して延長できるため矛盾します。

<!-- proof-start -->
### 証明

#### 1.1 候補集合と半順序を作る

$J\subseteq I$ とし、

$$
f:J\to\bigcup_{i\in I}A_i,
\qquad
f(i)\in A_i\quad(i\in J)
$$

を満たす組 $(J,f)$ 全体を $P$ とします。空関数 $(\varnothing,\varnothing)$ が候補になるので $P$ は空ではありません。

二つの候補について

$$
(J,f)\preceq(K,g)
$$

を

$$
J\subseteq K,
\qquad
g|_J=f
$$

で定めます。これは「$(K,g)$ が $(J,f)$ を延長する」という関係です。

この関係が半順序であることも確認します。反射律は $J\subseteq J$ と $f|_J=f$ から従います。両方向に

$$
(J,f)\preceq(K,g),
\qquad
(K,g)\preceq(J,f)
$$

なら $J=K$ かつ $f=g$ なので反対称律が成り立ちます。また

$$
(J,f)\preceq(K,g),
\qquad
(K,g)\preceq(L,h)
$$

なら $J\subseteq K\subseteq L$ であり、

$$
h|_J
=
(h|_K)|_J
=
g|_J
=
f
$$

なので $(J,f)\preceq(L,h)$ です。従って推移律も成り立ち、$(P,\preceq)$ は半順序集合です。

#### 1.2 候補の鎖に上界を作る

$\mathcal C\subseteq P$ を任意の鎖とします。定義域と関数グラフをそれぞれ合併して

$$
J_*:=\bigcup_{(J,f)\in\mathcal C}J,
\qquad
f_*:=\bigcup_{(J,f)\in\mathcal C}f
$$

と置きます。

まず $f_*$ が関数になることを確認します。同じ添字 $i$ に対して

$$
(i,a)\in f_1,
\qquad
(i,b)\in f_2
$$

となる二つの候補 $(J_1,f_1),(J_2,f_2)\in\mathcal C$ を取ります。$\mathcal C$ は鎖なので二候補は比較可能です。例えば

$$
(J_1,f_1)\preceq(J_2,f_2)
$$

なら $f_2|_{J_1}=f_1$ です。$i\in J_1$ なので

$$
a=f_1(i)=f_2(i)=b.
$$

従って同じ入力に異なる値は割り当てられず、$f_*$ は一価な関数です。

次に $i\in J_*$ を取ります。定義から、ある $(J,f)\in\mathcal C$ が存在して $i\in J$ です。この候補は選択済みなので

$$
f_*(i)=f(i)\in A_i.
$$

よって $(J_*,f_*)$ も $P$ の候補です。

さらに各 $(J,f)\in\mathcal C$ について

$$
J\subseteq J_*,
\qquad
f_*|_J=f
$$

なので

$$
(J,f)\preceq(J_*,f_*).
$$

従って $(J_*,f_*)$ は $\mathcal C$ の上界です。

#### 1.3 極大候補は全域である

$P$ の任意の鎖が上界を持つことを確認したので、[Zorn の補題](../F0_00A3_半順序_Zorn_極大延長/index.md#thm-zorn)から極大元 $(J^*,f^*)$ を取れます。

もし $J^*\ne I$ なら、ある

$$
i_0\in I\setminus J^*
$$

を取れます。仮定 $A_{i_0}\ne\varnothing$ から、一つの元

$$
a_0\in A_{i_0}
$$

を取ります。ここでは一つの固定された非空集合から一つの元を取るだけなので、選択公理は使っていません。

そこで

$$
\widetilde J:=J^*\cup\{i_0\}
$$

とし、

$$
\widetilde f(i)
=
\begin{cases}
f^*(i),& i\in J^*,\\
a_0,& i=i_0
\end{cases}
$$

と定めます。すると $(\widetilde J,\widetilde f)\in P$ であり、

$$
(J^*,f^*)\prec(\widetilde J,\widetilde f)
$$

です。これは $(J^*,f^*)$ の極大性に反します。

従って $J^*=I$ で、$f^*$ は元の集合族全体の選択関数です。よって

$$
\boxed{\mathrm{Zorn}\Longrightarrow\mathrm{AC}}
$$

が示されました。
<!-- proof-end -->

---

## 2. なぜ選択を続ければ整列が得られるとはまだ言えないのか

選択公理を使えば、空でない部分集合 $S\subseteq X$ ごとに「次に取る元」$c(S)\in S$ を指定できます。しかし、任意の集合 $X$ に対して

> 残りから一つ選ぶ操作を続ければ、いつか $X$ 全体を選び尽くす

と自然数段階だけで言うことはできません。

必要なのは、$X$ より「長く選び続けることはできない」順序数を一つ用意することです。その停止保証を与えるのが [Hartogs の補題](#lem-f0-00a3a-hartogs)です。

<a id="lem-f0-00a3a-hartogs"></a>

<!-- formal-statement-start -->
> **補題（Hartogs の補題）**  
> 任意の集合 $X$ に対して、$X$ へ単射できない順序数 $\alpha$ が存在する。
<!-- formal-statement-end -->

### 証明の見取り図

$X$ の部分集合に入れられる全ての整列を集め、その順序型を順序数として集めます。その全てより真に大きい順序数 $\alpha$ を作ります。もし $\alpha$ から $X$ へ単射できたなら、像に $\alpha$ の順序を移すことで、$X$ の部分集合上に順序型 $\alpha$ の整列を作れてしまいます。ところが $\alpha$ は「現れる全順序型より大きい」と作ったので矛盾します。

<!-- proof-start -->
### 証明

$A\subseteq X$ と、$A$ を整列する関係 $R$ の組 $(A,R)$ を全て考えます。各 $R$ は $X\times X$ の部分集合として表せるので、そのような組全体はべき集合と分離公理を使って一つの集合として集められます。

各整列集合 $(A,R)$ には、一意な順序型

$$
\operatorname{ot}(A,R)
$$

があり、これは順序数です。置換公理図式により、それらの順序型全体

$$
\mathcal O
:=
\{\operatorname{ot}(A,R):(A,R)\text{ は }X\text{ の部分集合上の整列}\}
$$

も集合です。

各 $\beta\in\mathcal O$ の後者 $\beta+1$ を取り、それらを全て含む順序数を和集合で

$$
\alpha
:=
\bigcup_{\beta\in\mathcal O}(\beta+1)
$$

と置きます。順序数の和集合は順序数なので $\alpha$ は順序数です。また $\beta\in\beta+1\subseteq\alpha$ だから

$$
\beta<\alpha
\qquad(\beta\in\mathcal O).
$$

ここで単射

$$
j:\alpha\to X
$$

が存在すると仮定します。像を

$$
A:=j[\alpha]\subseteq X
$$

とします。$j:\alpha\to A$ は全単射なので、$A$ 上の順序 $\prec_j$ を

$$
a\prec_j b
\quad\Longleftrightarrow\quad
j^{-1}(a)<j^{-1}(b)
$$

で定められます。この順序は $\alpha$ の整列を $A$ へそのまま移したものなので、$(A,\prec_j)$ は整列集合で、その順序型は $\alpha$ です。

従って $\alpha\in\mathcal O$ です。しかし $\mathcal O$ の任意の元 $\beta$ は $\beta<\alpha$ を満たすので、$\beta=\alpha$ を代入すると

$$
\alpha<\alpha
$$

となり矛盾します。

よって $X$ へ単射できない順序数 $\alpha$ が存在します。$\square$
<!-- proof-end -->

[Hartogs の補題](#lem-f0-00a3a-hartogs)では選択公理を使っていません。停止保証に必要な順序数を ZF の中だけで作れることが重要です。

---

## 3. 選択公理から整列可能定理へ

A2 では「選択公理を仮定すると任意の集合は整列可能である」という [整列可能定理](../F0_00A2_選択公理_Zorn_極大原理/index.md#thm-well-ordering)を結果として使いました。ここではその証明を閉じます。

### 証明の見取り図

空でない残集合 $S\subseteq X$ から次の元 $c(S)$ を選ぶ関数を選択公理で用意します。[Hartogs の補題](#lem-f0-00a3a-hartogs)で $X$ へ単射できない順序数 $\alpha$ を取り、$\alpha$ の各段階で未選択元を一つずつ取ります。もし $\alpha$ の全段階で選び続けられたら $\alpha\to X$ の単射ができて矛盾するので、途中で $X$ を尽くします。最後に「選ばれた時刻」で $X$ を順序付けます。

<!-- proof-start -->
### 証明

$X=\varnothing$ なら空集合上の空順序が整列なので明らかです。以下では $X\ne\varnothing$ とします。

空でない部分集合全体を

$$
I:=\mathcal P(X)\setminus\{\varnothing\}
$$

と置きます。各 $S\in I$ に対して

$$
A_S:=S
$$

とすれば、$\{A_S\}_{S\in I}$ は非空集合からなる添字付き集合族です。選択公理をこの集合族へ適用すると、選択関数

$$
c:I\to X,
\qquad
c(S)\in S
$$

が存在します。

[Hartogs の補題](#lem-f0-00a3a-hartogs)により、$X$ へ単射できない順序数 $\alpha$ を一つ取ります。また $X\in I$ なので

$$
x_*:=c(X)\in X
$$

を固定します。

超限再帰で、$\beta<\alpha$ に対して、それ以前に選んだ元を除いた残集合

$$
R_\beta
:=
X\setminus\{x_\xi:\xi<\beta\}
$$

を考え、

$$
x_\beta
:=
\begin{cases}
c(R_\beta),&R_\beta\ne\varnothing,\\
x_*,&R_\beta=\varnothing
\end{cases}
$$

と定めます。右辺は $\{x_\xi:\xi<\beta\}$ だけから決まるので、超限再帰定理を適用できます。

もし全ての $\beta<\alpha$ で $R_\beta\ne\varnothing$ だったと仮定します。このとき

$$
x_\beta=c(R_\beta)\in R_\beta
$$

なので、任意の $\xi<\beta$ に対して

$$
x_\beta\ne x_\xi.
$$

従って写像

$$
j:\alpha\to X,
\qquad
j(\beta)=x_\beta
$$

は単射です。これは $\alpha$ の選び方に反します。

よって、ある $\beta_0<\alpha$ で

$$
R_{\beta_0}=\varnothing
$$

となります。最小のそのような $\beta_0$ を取ると、$\xi<\beta_0$ では $R_\xi\ne\varnothing$ なので $x_\xi$ は互いに異なり、

$$
X=\{x_\xi:\xi<\beta_0\}
$$

です。

そこで $X$ 上の順序 $\prec$ を

$$
x_\xi\prec x_\eta
\quad\Longleftrightarrow\quad
\xi<\eta
$$

で定めます。各元の添字は一意なので、これは $\beta_0$ の整列を $X$ へ移した全順序です。

最後に、任意の非空部分集合 $B\subseteq X$ を取ります。対応する添字集合

$$
J_B
:=
\{\xi<\beta_0:x_\xi\in B\}
$$

は非空です。$\beta_0$ は順序数なので $J_B$ は最小元 $\xi_0$ を持ちます。すると任意の $x_\eta\in B$ について $\xi_0\le\eta$ だから

$$
x_{\xi_0}\preceq x_\eta.
$$

従って $x_{\xi_0}$ は $B$ の最小元です。

任意の非空部分集合が最小元を持つので、$\prec$ は $X$ の整列です。よって選択公理から[整列可能定理](../F0_00A2_選択公理_Zorn_極大原理/index.md#thm-well-ordering)が従います。$\square$
<!-- proof-end -->

---

## 4. 整列から極大鎖を作る

[Zorn の補題](../F0_00A3_半順序_Zorn_極大延長/index.md#thm-zorn)を導くには、半順序集合の中でまず極大な鎖を一つ作ります。A3 では [Zorn の補題](../F0_00A3_半順序_Zorn_極大延長/index.md#thm-zorn)を使って極大鎖を得ましたが、ここでそれを使うと循環します。代わりに、[整列可能定理](../F0_00A2_選択公理_Zorn_極大原理/index.md#thm-well-ordering)で半順序集合の元を一列に並べ、順番に採用する方法を使います。

### 証明の見取り図

整列順に元を見て、それまで採用した全ての元と比較可能なときだけ採用します。採用済みの元は削除しません。極限段階では、それまでの採用集合を全部合併します。この手続きは各段階で鎖性を保ちます。また不採用になった元には、その時点ですでに比較不能な採用済み元があるため、後から追加することもできません。

<!-- proof-start -->
### 証明：構成と確認

半順序集合 $(P,\le)$ を取ります。[整列可能定理](../F0_00A2_選択公理_Zorn_極大原理/index.md#thm-well-ordering)により、ある順序数 $\kappa$ を使って

$$
P=\{p_\alpha:\alpha<\kappa\}
$$

と整列順に番号付けできます。

超限再帰で、$\alpha\le\kappa$ に対する採用集合 $C_\alpha$ を定めます。まず

$$
C_0:=\varnothing.
$$

$\alpha<\kappa$ とし、$C_\alpha$ が定まっているとします。$p_\alpha$ が $C_\alpha$ の全ての元と比較可能なら

$$
C_{\alpha+1}:=C_\alpha\cup\{p_\alpha\},
$$

そうでなければ

$$
C_{\alpha+1}:=C_\alpha
$$

とします。極限順序数 $\lambda\le\kappa$ では

$$
C_\lambda
:=
\bigcup_{\alpha<\lambda}C_\alpha
$$

とします。

この構成は一度採用した元を削除しないので、

$$
\alpha\le\beta
\quad\Longrightarrow\quad
C_\alpha\subseteq C_\beta
$$

です。

各 $C_\alpha$ が鎖であることを超限帰納法で確認します。$C_0$ は空集合なので鎖です。$C_\alpha$ が鎖で、$p_\alpha$ を追加する場合には、追加条件により $p_\alpha$ は $C_\alpha$ の全要素と比較可能です。従って $C_{\alpha+1}$ も鎖です。追加しない場合は $C_{\alpha+1}=C_\alpha$ なので同様です。

極限段階 $\lambda$ で $x,y\in C_\lambda$ を取ると、ある $\alpha,\beta<\lambda$ があって

$$
x\in C_\alpha,
\qquad
y\in C_\beta
$$

です。順序数は比較可能なので、例えば $\alpha\le\beta$ とします。すると $C_\alpha\subseteq C_\beta$ だから $x,y\in C_\beta$ です。$C_\beta$ は鎖なので $x,y$ は比較可能です。従って $C_\lambda$ も鎖です。

最終的に

$$
C:=C_\kappa
$$

と置けば $C$ は鎖です。

さらに $C$ が極大鎖であることを示します。$q\in P\setminus C$ を任意に取ります。$P=\{p_\alpha:\alpha<\kappa\}$ なので、ある $\alpha<\kappa$ があって $q=p_\alpha$ です。$q$ が最終集合 $C$ に入っていない以上、段階 $\alpha$ で採用されませんでした。従って、ある $c\in C_\alpha$ が存在して $c$ と $q$ は比較不能です。

構成は元を削除しないので

$$
c\in C_\alpha\subseteq C.
$$

従って $C\cup\{q\}$ は鎖ではありません。任意の $q\notin C$ を追加できないので、$C$ は包含関係について極大な鎖です。$\square$
<!-- proof-end -->

---

## 5. 極大鎖の上界から極大元を得る

ここまでで、[整列可能定理](../F0_00A2_選択公理_Zorn_極大原理/index.md#thm-well-ordering)だけから極大鎖 $C$ を作れました。[Zorn の補題](../F0_00A3_半順序_Zorn_極大延長/index.md#thm-zorn)の仮定は「全ての鎖が上界を持つ」ことなので、この $C$ に上界を取れば、最後は半順序の議論だけで極大元へ進めます。

### 証明の見取り図

極大鎖 $C$ の上界を $u$ とすると、$u$ は $C$ の全要素と比較可能なので $C\cup\{u\}$ も鎖です。極大性から $u$ 自身が $C$ に入ります。もし $u$ より真に大きい $v$ があれば、$v$ も $C$ の全要素より上にあるため $C$ へ追加でき、極大性に反します。

<!-- proof-start -->
### 証明

半順序集合 $(P,\le)$ の任意の鎖が $P$ 内に上界を持つと仮定します。前節で構成した極大鎖 $C$ に対し、仮定から上界 $u\in P$ を取れます。

任意の $c\in C$ について

$$
c\le u
$$

なので、$u$ は $C$ の全ての元と比較可能です。従って $C\cup\{u\}$ は鎖です。$C$ は包含関係について極大なので

$$
C\cup\{u\}=C,
$$

従って $u\in C$ です。

$u$ が $P$ の極大元でないと仮定します。すると、ある $v\in P$ が存在して

$$
u\le v,
\qquad
u\ne v
$$

です。

$u$ は $C$ の上界なので、任意の $c\in C$ について

$$
c\le u\le v.
$$

従って $v$ も $C$ の全ての元と比較可能で、$C\cup\{v\}$ は鎖です。$C$ の極大性から $v\in C$ です。

しかし $u$ は $C$ の上界であり $v\in C$ なので

$$
v\le u.
$$

一方 $u\le v$ でもあるので、反対称律から $u=v$ となり、$u\ne v$ に矛盾します。

従って $u$ は $P$ の極大元です。よって

$$
\boxed{
\text{整列可能定理}
\Longrightarrow
\mathrm{Zorn}
}
$$

が示されました。$\square$
<!-- proof-end -->

---

## 6. 選択公理と Zorn の補題は同値である

ここまでで

$$
\mathrm{Zorn}
\Longrightarrow
\mathrm{AC}
$$

と

$$
\mathrm{AC}
\Longrightarrow
\text{整列可能定理}
\Longrightarrow
\mathrm{Zorn}
$$

の両方向を構成しました。

<a id="thm-f0-00a3a-ac-zorn-equivalence"></a>

<!-- formal-statement-start -->
> **定理（選択公理とZornの補題の同値性）**  
> ZF を仮定する。このとき、選択公理と [Zorn の補題](../F0_00A3_半順序_Zorn_極大延長/index.md#thm-zorn)は同値である。
<!-- formal-statement-end -->

### 証明の見取り図

Zorn から選択公理へは、部分的な選択を候補として極大化しました。逆向きでは、選択公理から整列を作り、その整列順に極大鎖を構成し、鎖の上界を極大元へ変換しました。両方向とも、どこで選択原理を使ったかを局所的に確認できます。

<!-- proof-start -->
### 証明

第1節で

$$
\mathrm{Zorn}\Longrightarrow\mathrm{AC}
$$

を示しました。

第3節で、選択公理と [Hartogs の補題](#lem-f0-00a3a-hartogs)・超限再帰を使って[整列可能定理](../F0_00A2_選択公理_Zorn_極大原理/index.md#thm-well-ordering)を示しました。第4節と第5節で、その整列から極大鎖を作り、全鎖が上界を持つという仮定の下で極大元を得ました。従って

$$
\mathrm{AC}\Longrightarrow\mathrm{Zorn}
$$

です。

以上より

$$
\boxed{
\mathrm{AC}
\iff
\mathrm{Zorn}
}
$$

が成り立ちます。$\square$
<!-- proof-end -->

### 6.1 循環していないことを確認する

逆向きの証明で使った

- 順序数の基本性質
- 置換公理図式
- 超限再帰定理
- [Hartogs の補題](#lem-f0-00a3a-hartogs)

は ZF で証明できる標準結果です。

特に、整列から極大鎖を作る第4節では [Zorn の補題](../F0_00A3_半順序_Zorn_極大延長/index.md#thm-zorn)を使っていません。整列順に超限再帰で候補を採用しただけです。また [Hartogs の補題](#lem-f0-00a3a-hartogs)の証明でも選択公理を使っていません。

したがって

$$
\mathrm{AC}
\Longrightarrow
\mathrm{Zorn}
$$

の途中で、結論である [Zorn の補題](../F0_00A3_半順序_Zorn_極大延長/index.md#thm-zorn)を暗黙に使う循環はありません。

---

## 7. 演習

### F0-00A3A-A01 鎖に沿う関数の合併が関数になる理由

- Level: A
- 目安時間: 10分

非空集合族 $\{A_i\}_{i\in I}$ に対する候補 $(J,f)$ を第1節と同じように延長関係で順序付ける。$\mathcal C$ を候補の鎖とし、

$$
f_*:=\bigcup_{(J,f)\in\mathcal C}f
$$

と置く。$f_*$ が一価な関数になる理由を示せ。

<!-- solution-start -->
#### 詳細解答

同じ入力 $i$ に対して、二つの候補 $(J_1,f_1),(J_2,f_2)\in\mathcal C$ から値が与えられたとします。つまり

$$
i\in J_1\cap J_2.
$$

$\mathcal C$ は鎖なので、二候補は延長関係で比較可能です。例えば

$$
(J_1,f_1)\preceq(J_2,f_2)
$$

なら $f_2|_{J_1}=f_1$ です。従って

$$
f_1(i)=f_2(i).
$$

逆向きに比較される場合も同じです。よって、どの候補から $i$ の値を読んでも一致し、グラフの合併 $f_*$ は一価な関数になります。
<!-- solution-end -->

### F0-00A3A-A02 単射で順序を像へ移す

- Level: A
- 目安時間: 10分

順序数 $\alpha$ と集合 $X$ に対して単射 $j:\alpha\to X$ があるとする。像 $A=j[\alpha]$ 上に

$$
a\prec_j b
\iff
j^{-1}(a)<j^{-1}(b)
$$

と定めると、$(A,\prec_j)$ の順序型が $\alpha$ になる理由を説明せよ。

<!-- solution-start -->
#### 詳細解答

$j$ は $\alpha$ から像 $A=j[\alpha]$ への全単射です。定義した $\prec_j$ は、

$$
\xi<\eta
\iff
j(\xi)\prec_j j(\eta)
$$

を満たします。従って $j$ は $(\alpha,<)$ と $(A,\prec_j)$ の順序同型です。

$\alpha$ 自身は順序数なので $<$ により整列されています。順序同型は整列構造を保つため、$(A,\prec_j)$ も整列され、その順序型は $\alpha$ です。
<!-- solution-end -->

### F0-00A3A-A03 選択公理を非空部分集合全体へ適用する

- Level: A
- 目安時間: 8分

$X\ne\varnothing$ とする。

$$
I:=\mathcal P(X)\setminus\{\varnothing\}
$$

と置き、各 $S\in I$ に $A_S=S$ を対応させる。この集合族へ選択公理を適用すると

$$
c(S)\in S
\qquad(S\in I)
$$

を満たす関数 $c$ が得られることを、添字集合・各集合・値域を明示して説明せよ。

<!-- solution-start -->
#### 詳細解答

添字集合は

$$
I=\mathcal P(X)\setminus\{\varnothing\}
$$

です。各添字 $S\in I$ 自身が $X$ の非空部分集合なので、

$$
A_S:=S
$$

と置けば $A_S\ne\varnothing$ です。

したがって選択公理を添字付き集合族 $\{A_S\}_{S\in I}$ へ適用できます。すると

$$
c:I\to\bigcup_{S\in I}A_S
$$

で

$$
c(S)\in A_S=S
$$

を満たす選択関数が存在します。$X\ne\varnothing$ なので $X\in I$ であり、

$$
\bigcup_{S\in I}A_S=X.
$$

よって $c:I\to X$ と書けます。
<!-- solution-end -->

### F0-00A3A-A04 未選択集合から取れば既出の元と重ならない

- Level: A
- 目安時間: 8分

ある段階 $\beta$ で

$$
R_\beta
=
X\setminus\{x_\xi:\xi<\beta\}
$$

が非空であり、$x_\beta:=c(R_\beta)$ とする。任意の $\xi<\beta$ に対して $x_\beta\ne x_\xi$ であることを示せ。

<!-- solution-start -->
#### 詳細解答

選択関数の定義から

$$
x_\beta=c(R_\beta)\in R_\beta.
$$

一方、

$$
R_\beta
=
X\setminus\{x_\xi:\xi<\beta\}
$$

なので、$R_\beta$ の元はそれ以前に選ばれた $x_\xi$ のどれとも一致しません。

従って任意の $\xi<\beta$ に対して

$$
x_\beta\ne x_\xi.
$$
<!-- solution-end -->

### F0-00A3A-B01 Zorn の補題から選択公理を導く

- Level: B
- 目安時間: 18分

非空集合族 $\{A_i\}_{i\in I}$ に対し、部分的に選択済みの候補 $(J,f)$ を自分で定義し、[Zorn の補題](../F0_00A3_半順序_Zorn_極大延長/index.md#thm-zorn)から全域選択関数を構成せよ。候補集合、半順序、鎖の上界、極大元が全域になる理由を順に示すこと。

<!-- solution-start -->
#### 詳細解答

候補集合 $P$ を、

$$
J\subseteq I,
\qquad
f:J\to\bigcup_{i\in I}A_i,
\qquad
f(i)\in A_i
$$

を満たす組 $(J,f)$ 全体とします。順序は

$$
(J,f)\preceq(K,g)
\iff
J\subseteq K
\ \text{かつ}\
g|_J=f
$$

とします。反射律・反対称律・推移律は第1節と同じ確認で成り立つので半順序です。

候補の鎖 $\mathcal C$ に対して

$$
J_*:=\bigcup_{(J,f)\in\mathcal C}J,
\qquad
f_*:=\bigcup_{(J,f)\in\mathcal C}f
$$

と置きます。鎖内の二候補は延長関係で比較可能なので、共通定義域では値が一致します。従って $f_*$ は関数です。また $i\in J_*$ なら、ある候補で $i\in J$ だから

$$
f_*(i)=f(i)\in A_i.
$$

従って $(J_*,f_*)\in P$ で、各候補を延長するので $\mathcal C$ の上界です。

[Zorn の補題](../F0_00A3_半順序_Zorn_極大延長/index.md#thm-zorn)から極大元 $(J^*,f^*)$ を取ります。もし $J^*\ne I$ なら $i_0\in I\setminus J^*$ を一つ取り、$A_{i_0}\ne\varnothing$ から $a_0\in A_{i_0}$ を一つ取れます。$f^*$ に $f(i_0)=a_0$ を追加すると定義域を真に広げられ、極大性に反します。

従って $J^*=I$ で、$f^*$ は全域選択関数です。
<!-- solution-end -->

### F0-00A3A-B02 Hartogs の補題が停止を保証する理由

- Level: B
- 目安時間: 15分

$X$ へ単射できない順序数 $\alpha$ を取り、各 $\beta<\alpha$ で残集合 $R_\beta$ が非空なら $x_\beta\in R_\beta$ を選ぶとする。なぜ $\alpha$ の全段階で $R_\beta\ne\varnothing$ のまま選び続けることはできないか示せ。

<!-- solution-start -->
#### 詳細解答

全ての $\beta<\alpha$ で $R_\beta\ne\varnothing$ と仮定します。各段階で

$$
x_\beta\in
X\setminus\{x_\xi:\xi<\beta\}
$$

なので、$\xi<\beta$ なら

$$
x_\beta\ne x_\xi.
$$

従って

$$
j:\alpha\to X,
\qquad
j(\beta)=x_\beta
$$

は単射です。

しかし $\alpha$ は [Hartogs の補題](#lem-f0-00a3a-hartogs)により「$X$ へ単射できない順序数」として選んでいます。これは矛盾です。

従って、ある $\beta_0<\alpha$ で $R_{\beta_0}=\varnothing$ となり、それ以前に $X$ の全要素を選び尽くします。
<!-- solution-end -->

### F0-00A3A-B03 整列可能定理から Zorn の補題を導く

- Level: B
- 目安時間: 20分

任意の集合が整列可能であると仮定する。半順序集合 $(P,\le)$ の任意の鎖が $P$ 内に上界を持つとき、整列順の逐次構成で極大鎖を作り、そこから $P$ の極大元を得よ。

<!-- solution-start -->
#### 詳細解答

整列可能性により、ある順序数 $\kappa$ を使って

$$
P=\{p_\alpha:\alpha<\kappa\}
$$

と並べます。

整列順に $p_\alpha$ を調べ、それまで採用した全ての元と比較可能な場合だけ採用します。極限段階ではそれまでの採用集合を合併します。各段階で、新しく加える元は既採用元の全てと比較可能なので鎖性が保たれます。極限段階でも採用集合は包含関係で増大しているため、二元は十分後の同じ段階に入り比較可能です。従って最終集合 $C$ は鎖です。

$q=p_\alpha\notin C$ なら、段階 $\alpha$ で不採用になったので、ある既採用元 $c\in C_\alpha$ と $q$ が比較不能です。$c$ は後で削除されないため $c\in C$ です。従って $q$ を $C$ に追加できません。よって $C$ は極大鎖です。

仮定から $C$ は上界 $u\in P$ を持ちます。任意の $c\in C$ について $c\le u$ なので $C\cup\{u\}$ は鎖です。極大性から $u\in C$ です。

もし $u$ が極大元でなければ、ある $v\in P$ が $u\le v$ かつ $u\ne v$ を満たします。すると全ての $c\in C$ について

$$
c\le u\le v,
$$

なので $C\cup\{v\}$ も鎖です。極大性から $v\in C$ ですが、$u$ は $C$ の上界なので $v\le u$ です。反対称律から $u=v$ となり矛盾します。

従って $u$ は極大元であり、[Zorn の補題](../F0_00A3_半順序_Zorn_極大延長/index.md#thm-zorn)の結論が得られます。
<!-- solution-end -->

### F0-00A3A-C01 選択公理から Zorn の補題までを一続きに再構成する

- Level: C
- 目安時間: 30分

ZF と選択公理を仮定する。半順序集合 $(P,\le)$ の任意の鎖が $P$ 内に上界を持つとする。[Hartogs の補題](#lem-f0-00a3a-hartogs)と超限再帰を用いて $P$ を整列し、その整列から極大鎖を構成し、最後に $P$ の極大元を得るまでを一続きに示せ。

<!-- solution-start -->
#### 詳細解答

まず選択公理から任意の集合が整列可能であることを示します。

任意の集合 $X$ を取ります。$X=\varnothing$ なら明らかなので $X\ne\varnothing$ とします。空でない部分集合全体

$$
I=\mathcal P(X)\setminus\{\varnothing\}
$$

を添字集合とし、$A_S=S$ と置きます。選択公理から

$$
c(S)\in S
\qquad(S\in I)
$$

を満たす選択関数 $c$ が得られます。

[Hartogs の補題](#lem-f0-00a3a-hartogs)により $X$ へ単射できない順序数 $\alpha$ を取ります。超限再帰で、残集合

$$
R_\beta
=
X\setminus\{x_\xi:\xi<\beta\}
$$

が非空なら $x_\beta=c(R_\beta)$ と選びます。もし全ての $\beta<\alpha$ で残集合が非空なら、各 $x_\beta$ は以前の全ての $x_\xi$ と異なるので

$$
\beta\longmapsto x_\beta
$$

が $\alpha$ から $X$ への単射になり、[Hartogs の補題](#lem-f0-00a3a-hartogs)に反します。

従って、ある最小の $\beta_0<\alpha$ で $R_{\beta_0}=\varnothing$ となります。よって

$$
X=\{x_\xi:\xi<\beta_0\}.
$$

$x_\xi\prec x_\eta$ を $\xi<\eta$ で定めれば、$\beta_0$ の整列が $X$ へ移ります。非空部分集合 $B\subseteq X$ に対し

$$
\{\xi<\beta_0:x_\xi\in B\}
$$

は非空で最小元を持つので、$B$ も最小元を持ちます。従って $X$ は整列可能です。

これを $X=P$ に適用し、

$$
P=\{p_\gamma:\gamma<\kappa\}
$$

と整列します。整列順に $p_\gamma$ を見て、それまで採用した全元と比較可能な場合だけ採用し、極限段階では採用集合を合併します。各段階で鎖性が保たれるので最終集合 $C$ は鎖です。

$q=p_\gamma\notin C$ なら、段階 $\gamma$ で既採用のある $c$ と比較不能だったため不採用になっています。その $c$ は最終的にも $C$ に残るので $q$ を追加できません。従って $C$ は極大鎖です。

仮定から $C$ は上界 $u\in P$ を持ちます。$c\le u$ が全ての $c\in C$ で成り立つので $C\cup\{u\}$ は鎖です。極大性から $u\in C$ です。

もし $u$ が極大元でなければ、$u\le v$ かつ $u\ne v$ を満たす $v\in P$ が存在します。このとき任意の $c\in C$ について

$$
c\le u\le v
$$

なので $C\cup\{v\}$ も鎖です。極大性から $v\in C$。しかし $u$ は $C$ の上界なので $v\le u$ です。反対称律から $u=v$ となり矛盾します。

従って $u$ は $P$ の極大元です。よって選択公理から [Zorn の補題](../F0_00A3_半順序_Zorn_極大延長/index.md#thm-zorn)が導かれました。
<!-- solution-end -->

---

## 8. 章末チェック

この章を終えた時点で、次を紙上で再現できるか確認してください。

1. [Zorn の補題](../F0_00A3_半順序_Zorn_極大延長/index.md#thm-zorn)から選択公理を導くとき、候補集合・半順序・鎖の上界・極大性の矛盾を順に書ける。
2. [Hartogs の補題](#lem-f0-00a3a-hartogs)で、なぜ「$X$ に現れる整列型より大きい順序数」を作れるか説明できる。
3. 選択公理を $\mathcal P(X)\setminus\{\varnothing\}$ へ適用し、未選択集合から元を選ぶ関数を作れる。
4. [Hartogs の補題](#lem-f0-00a3a-hartogs)が「選択を続ける過程の停止保証」としてどう働くか説明できる。
5. 整列順の超限再帰で極大鎖を作る際、後者段階と極限段階の両方で鎖性を確認できる。
6. 極大鎖の上界が極大元になるまでを、極大性・上界・反対称律を使って再現できる。
7. AC から Zorn への証明で、どこまでが ZF の標準結果で、どこで選択公理を使ったか区別できる。
