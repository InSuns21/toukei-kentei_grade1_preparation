# F0-00D3A π–λ定理：π系・Dynkin族・測度の一意性

D2 では、少数の集合から最小の σ 代数 $\sigma(\mathcal P)$ を生成する考え方を導入しました。ところが、実際の証明では次の壁にぶつかります。

例えば区間や長方形のような単純な集合では、二つの測度が一致することを直接計算できるとします。最終的には、その集合族が生成する Borel σ 代数や積 σ 代数の **全ての集合** で一致してほしい。

しかし $\sigma(\mathcal P)$ の元には、「補集合を1回、和集合を2回取れば作れる」という有限の作り方があるとは限りません。したがって、生成元から集合演算の回数について単純に帰納する方法では届きません。

そこで、次の役割分担を使います。

~~~text
単純な生成元では有限交差を保つ          → π系
性質が保存される集合全体は
補集合と互いに素な可算和で閉じやすい  → Dynkin族
両者をつないで生成σ代数全体へ広げる   → π–λ定理
~~~

この章の中心問いは、

> **生成元で確認できた性質を、途中の無限個の集合演算を逐一たどらずに、生成 σ 代数全体へどう広げるか。**

です。

---

## 1. π系：有限交差で壊れない生成元

区間や長方形では、二つを交差させても同じ種類の集合が得られます。測度の一意性や積測度では、この「交差しても生成元の世界から出ない」ことが重要です。

<a id="def-f0-00d3a-pi-system"></a>

<!-- formal-statement-start -->
### 定義（π系）

全体集合 $\Omega$ の部分集合からなる族 $\mathcal P$ が **π系（π-system）** であるとは、任意の $A,B\in\mathcal P$ に対して

$$
A\cap B\in\mathcal P
$$

が成り立つことをいう。
<!-- formal-statement-end -->

二集合の交差で閉じるので、帰納的に有限個の交差でも閉じます。ただし、補集合や一般の和集合で閉じることは要求していません。π系は σ 代数よりかなり弱い条件です。

<!-- definition-example-start: def-f0-00d3a-pi-system -->
### 例：可測長方形はπ系

$\mathcal A,\mathcal B$ をそれぞれ $X,Y$ 上の σ 代数とし、

$$
\mathcal P
=
\{A\times B:A\in\mathcal A,\ B\in\mathcal B\}
$$

とします。二つの長方形を取ると

$$
(A_1\times B_1)\cap(A_2\times B_2)
=
(A_1\cap A_2)\times(B_1\cap B_2).
$$

$\mathcal A,\mathcal B$ は σ 代数なので有限交差で閉じ、

$$
A_1\cap A_2\in\mathcal A,
\qquad
B_1\cap B_2\in\mathcal B.
$$

従って右辺は再び $\mathcal P$ に属します。よって可測長方形の族はπ系です。
<!-- definition-example-end -->

この例は積測度でそのまま使います。

---

## 2. Dynkin族：測度の等式が保存されやすい閉性

次に、二つの有限測度 $\mu,\nu$ が一致する集合全体

$$
\mathcal D
=
\{A:\mu(A)=\nu(A)\}
$$

を考えてみます。

$A$ 上で一致すれば、全体集合の測度も一致している状況では補集合 $A^c$ でも一致を示しやすい。また互いに素な集合列で一致していれば、可算加法性によってその和集合でも一致します。

一方、**重なりのある一般の可算和**については、最初から閉性を確認するのは面倒です。そこで、測度の計算と相性のよい最小限の閉性だけを取り出します。

<a id="def-f0-00d3a-dynkin-system"></a>

<!-- formal-statement-start -->
### 定義（Dynkin族 / λ系）

全体集合 $\Omega$ の部分集合からなる族 $\mathcal D$ が **Dynkin族（λ系、λ-system）** であるとは、次の3条件を満たすことをいう。

1. $\Omega\in\mathcal D$。
2. $A\in\mathcal D$ なら $A^c\in\mathcal D$。
3. $A_1,A_2,\ldots\in\mathcal D$ が互いに素なら

$$
\bigcup_{n=1}^{\infty}A_n\in\mathcal D.
$$
<!-- formal-statement-end -->

σ 代数との違いは3番目です。σ 代数は任意の可算和で閉じますが、Dynkin族が直接要求するのは **互いに素な可算和だけ** です。

<!-- definition-example-start: def-f0-00d3a-dynkin-system -->
### 例：Dynkin族だがσ代数ではない集合族

$\Omega=\{1,2,3,4\}$ とし、

$$
\mathcal D
=
\{A\subset\Omega:\#A\text{ が偶数}\}
$$

と置きます。具体的には、空集合、6個の二点集合、$\Omega$ からなる8個の集合です。

まず $\#\Omega=4$ なので $\Omega\in\mathcal D$。また $A\subset\Omega$ について

$$
\#A^c=4-\#A
$$

だから、$\#A$ が偶数なら $\#A^c$ も偶数です。

さらに互いに素な $A_n\in\mathcal D$ を取ると、$\Omega$ は有限集合なので非空な $A_n$ は高々有限個しかありません。その和集合の要素数は、互いに素であることから

$$
\#\left(\bigcup_nA_n\right)
=
\sum_n\#A_n
$$

となり、偶数の和なので再び偶数です。従って $\mathcal D$ はDynkin族です。

しかし

$$
\{1,2\},\{1,3\}\in\mathcal D
$$

である一方、

$$
\{1,2\}\cup\{1,3\}
=
\{1,2,3\}\notin\mathcal D.
$$

したがって $\mathcal D$ は一般の和集合で閉じず、σ代数ではありません。
<!-- definition-example-end -->

### 2.1 準備：Dynkin族では「大きい集合から小さい集合を引く」ことができる

後の証明で何度も使う一段を先に確認します。

Dynkin族 $\mathcal D$ で $B\subset A$ かつ $A,B\in\mathcal D$ とします。補集合閉性から $A^c\in\mathcal D$ です。$B$ と $A^c$ は互いに素なので

$$
B\cup A^c\in\mathcal D.
$$

もう一度補集合を取れば

$$
(B\cup A^c)^c
=
A\setminus B
\in\mathcal D.
$$

従って

$$
\boxed{
B\subset A,\ A,B\in\mathcal D
\Longrightarrow
A\setminus B\in\mathcal D
}
$$

です。Dynkin族が任意の差集合で閉じるわけではなく、**包含関係があるときの差**を作れることがポイントです。

---

## 3. なぜπ系とDynkin族を組み合わせるのか

測度の一意性証明では、最初から一致が分かっている集合族は区間・長方形・集合代数などで、有限交差に強いことが多いのでπ系になります。

一方、「二つの測度が一致する集合全体」のような、証明したい性質を満たす集合族は、補集合と互いに素な可算和で閉じることを測度の公理から示しやすく、Dynkin族になります。

したがって

~~~text
出発点 P：π系
      ↓ P 上では性質を直接確認
性質を満たす集合全体 D：Dynkin族
      ↓
目標 σ(P)：生成σ代数全体
~~~

という橋があれば、生成 σ 代数の各集合を一つずつ構成する必要がなくなります。その橋が π–λ 定理です。

---

## 4. π–λ定理

<a id="thm-f0-00d3a-pi-lambda"></a>

<!-- formal-statement-start -->
### 定理（π–λ定理 / Dynkinのπ–λ定理）

$\mathcal P$ を $\Omega$ 上のπ系、$\mathcal D$ を $\Omega$ 上のDynkin族とする。もし

$$
\mathcal P\subset\mathcal D
$$

なら

$$
\boxed{
\sigma(\mathcal P)\subset\mathcal D
}
$$

が成り立つ。
<!-- formal-statement-end -->

つまり、**π系上で確認した性質がDynkin族として保存されるなら、その性質は生成 σ 代数全体まで広がる**という定理です。

### 証明の見取り図

まず「$\mathcal P$ を含む最小のDynkin族」が存在することを確認します。$\mathcal P$ を含むDynkin族全体を考えると、少なくとも $2^\Omega$ がその一つです。その全ての共通部分を

$
\lambda(\mathcal P)
:=
\bigcap\{\mathcal D:\mathcal D\text{ は }\mathcal P\text{ を含むDynkin族}\}
$

と置きます。Dynkin族の三条件は共通部分を取っても保たれるので、$\lambda(\mathcal P)$ 自身もDynkin族です。また定義から、$\mathcal P$ を含む任意のDynkin族に含まれる最小のものです。

この $\lambda(\mathcal P)$ について、示したい核心は

$$
\lambda(\mathcal P)
=
\sigma(\mathcal P)
$$

です。

Dynkin族には一般の交差閉性がありません。そこで、いきなり二つの一般元を交差させるのではなく、

1. 左側を $A\in\mathcal P$ に固定して交差閉性を広げる。
2. そこで得た結果を使い、今度は左側も $\lambda(\mathcal P)$ 全体へ広げる。
3. 有限交差閉性を得たDynkin族から、一般の可算和閉性を作る。

という二段階の拡張を行います。

<!-- proof-start -->
### 証明

以下

$$
\mathcal L:=\lambda(\mathcal P)
$$

と書きます。$\mathcal L$ は $\mathcal P$ を含む最小のDynkin族です。

#### Step 1：左側を $A\in\mathcal P$ に固定する

固定した $A\in\mathcal P$ に対して

$$
\mathcal D_A
=
\{B\in\mathcal L:A\cap B\in\mathcal L\}
$$

と置きます。まず $\mathcal D_A$ がDynkin族であることを3条件から確認します。

**全体集合。** $A\in\mathcal P\subset\mathcal L$ なので

$$
A\cap\Omega=A\in\mathcal L.
$$

従って $\Omega\in\mathcal D_A$ です。

**補集合。** $B\in\mathcal D_A$ とします。定義から

$$
A\cap B\in\mathcal L.
$$

また $A\in\mathcal L$ で、$A\cap B\subset A$ です。2.1 の差集合の性質を $A$ と $A\cap B$ に適用すると

$$
A\setminus(A\cap B)
=
A\cap B^c
\in\mathcal L.
$$

従って $B^c\in\mathcal D_A$ です。

**互いに素な可算和。** 互いに素な $B_1,B_2,\ldots\in\mathcal D_A$ を取ります。各 $n$ について

$$
A\cap B_n\in\mathcal L.
$$

しかも $B_n$ が互いに素なので $A\cap B_n$ も互いに素です。$\mathcal L$ はDynkin族だから

$$
\bigcup_{n=1}^{\infty}(A\cap B_n)
\in\mathcal L.
$$

左辺は分配法則により

$$
A\cap\left(\bigcup_{n=1}^{\infty}B_n\right)
$$

です。従って $\bigcup_nB_n\in\mathcal D_A$ です。

以上から $\mathcal D_A$ はDynkin族です。

次に $B\in\mathcal P$ なら、$\mathcal P$ はπ系なので

$$
A\cap B\in\mathcal P\subset\mathcal L.
$$

従って $\mathcal P\subset\mathcal D_A$ です。$\mathcal L$ は $\mathcal P$ を含む最小のDynkin族だから

$$
\mathcal L\subset\mathcal D_A.
$$

よって

$$
A\in\mathcal P,\ B\in\mathcal L
\Longrightarrow
A\cap B\in\mathcal L.
\tag{1}
$$

#### Step 2：左側も $\mathcal L$ 全体へ広げる

今度は固定した $B\in\mathcal L$ に対して

$$
\mathcal E_B
=
\{A\in\mathcal L:A\cap B\in\mathcal L\}
$$

と置きます。再び3条件を確認します。

**全体集合。**

$$
\Omega\cap B=B\in\mathcal L
$$

なので $\Omega\in\mathcal E_B$ です。

**補集合。** $A\in\mathcal E_B$ なら $A\cap B\in\mathcal L$ です。また

$$
A\cap B\subset B,
\qquad
B\in\mathcal L.
$$

2.1 の差集合の性質から

$$
B\setminus(A\cap B)
=
A^c\cap B
\in\mathcal L.
$$

従って $A^c\in\mathcal E_B$ です。

**互いに素な可算和。** 互いに素な $A_1,A_2,\ldots\in\mathcal E_B$ なら $A_n\cap B\in\mathcal L$ で、これらも互いに素です。従って

$$
\bigcup_n(A_n\cap B)
=
\left(\bigcup_nA_n\right)\cap B
\in\mathcal L.
$$

よって $\bigcup_nA_n\in\mathcal E_B$ です。

従って $\mathcal E_B$ もDynkin族です。

Step 1 の式 (1) により、任意の $A\in\mathcal P$ について

$$
A\cap B\in\mathcal L.
$$

したがって $\mathcal P\subset\mathcal E_B$ です。最小性から

$$
\mathcal L\subset\mathcal E_B.
$$

$B\in\mathcal L$ は任意だったので

$$
A,B\in\mathcal L
\Longrightarrow
A\cap B\in\mathcal L.
$$

つまり $\mathcal L$ は有限交差で閉じました。

#### Step 3：$\mathcal L$ がσ代数であることを示す

$\mathcal L$ はDynkin族なので補集合で閉じています。有限交差閉性と De Morgan 則から有限和でも閉じます。

任意の列 $A_1,A_2,\ldots\in\mathcal L$ を取ります。一般の可算和を互いに素な可算和へ直すため

$$
C_1=A_1,
\qquad
C_n
=
A_n\setminus\bigcup_{k<n}A_k
\quad(n\ge2)
$$

と置きます。

$\bigcup_{k<n}A_k$ は有限和なので $\mathcal L$ に属します。補集合と有限交差で閉じているため

$$
C_n
=
A_n\cap
\left(\bigcup_{k<n}A_k\right)^c
\in\mathcal L.
$$

構成から $C_n$ は互いに素で、さらに

$$
\bigcup_{n=1}^{\infty}A_n
=
\bigsqcup_{n=1}^{\infty}C_n.
$$

$\mathcal L$ はDynkin族なので、右辺の互いに素な可算和は $\mathcal L$ に属します。従って任意の可算和で閉じ、$\mathcal L$ はσ代数です。

$\mathcal L$ は $\mathcal P$ を含むσ代数になったので、$\mathcal P$ を含む最小のσ代数の定義から

$$
\sigma(\mathcal P)
\subset
\mathcal L.
$$

逆に、任意のσ代数はDynkin族です。$\sigma(\mathcal P)$ は $\mathcal P$ を含むDynkin族でもあるため、$\mathcal L$ の最小性から

$$
\mathcal L
\subset
\sigma(\mathcal P).
$$

従って

$$
\boxed{
\lambda(\mathcal P)
=
\sigma(\mathcal P)
}.
$$

最後に、$\mathcal P\subset\mathcal D$ で $\mathcal D$ がDynkin族なら、$\lambda(\mathcal P)$ の最小性から

$$
\lambda(\mathcal P)\subset\mathcal D.
$$

したがって

$$
\sigma(\mathcal P)
=
\lambda(\mathcal P)
\subset\mathcal D.
$$

これでπ–λ定理が示されました。$\square$
<!-- proof-end -->

ここで重要なのは、π系の有限交差閉性を **二回に分けて** Dynkin族全体へ広げた点です。最初から $A,B\in\mathcal L$ として一言で済ませると、この二段階の論理が見えなくなります。

---

## 5. 後続章でどう使うか

### 5.1 有限測度の一意性

まず最も基本的な形を確認します。$\mu,\nu$ を $\sigma(\mathcal P)$ 上の有限測度とし、

$$
\mu(\Omega)=\nu(\Omega)<\infty
$$

かつ $\mathcal P$ 上で $\mu=\nu$ とします。

一致する集合全体を

$$
\mathcal D
=
\{A\in\sigma(\mathcal P):\mu(A)=\nu(A)\}
$$

と置きます。

- 全体集合では仮定から一致する。
- $A\in\mathcal D$ なら有限性を使って

  $$
  \mu(A^c)
  =
  \mu(\Omega)-\mu(A)
  =
  \nu(\Omega)-\nu(A)
  =
  \nu(A^c).
  $$

- 互いに素な $A_n\in\mathcal D$ なら可算加法性から

  $$
  \mu\left(\bigcup_nA_n\right)
  =
  \sum_n\mu(A_n)
  =
  \sum_n\nu(A_n)
  =
  \nu\left(\bigcup_nA_n\right).
  $$

従って $\mathcal D$ はDynkin族です。もともと $\mathcal P\subset\mathcal D$ なので π–λ 定理から

$$
\sigma(\mathcal P)\subset\mathcal D.
$$

つまり二つの測度は $\sigma(\mathcal P)$ 全体で一致します。

D4 の Carathéodory 拡張定理では、より一般の一意性条件を扱います。σ有限の場合には有限測度の場合を適切な有限部分へ局所化して使うので、「補集合で差を取るには有限性が必要だった」ことを覚えておくと証明の仮定が見えやすくなります。

### 5.2 積測度

可測長方形

$$
A\times B
$$

の族は1節で確認したようにπ系です。

積測度では、まず長方形上で公式を直接確認します。次に「その公式が成立する可測集合全体」を作ると、測度の可算加法性などからDynkin族になることを示せます。

すると

~~~text
長方形で確認
  ↓
公式が成り立つ集合全体がDynkin族
  ↓ π–λ定理
積σ代数全体へ拡張
~~~

と進めます。D2C の Tonelli・Fubini の準備でも、この「生成元で確認 → Dynkin族として閉じる → 生成 σ 代数へ広げる」という型が繰り返し現れます。

---

## 6. 演習

### F0-00D3A-A01 π系の確認

- Level: A
- 目安時間: 8分

$\mathcal A$ を $\Omega$ 上のσ代数とする。$\mathcal A$ がπ系であることを示せ。

<!-- solution-start -->
#### 詳細解答

$A,B\in\mathcal A$ を取ります。σ代数は補集合と可算和で閉じるので

$$
A^c,B^c\in\mathcal A,
\qquad
A^c\cup B^c\in\mathcal A.
$$

もう一度補集合を取ると

$$
(A^c\cup B^c)^c\in\mathcal A.
$$

De Morgan 則より

$$
(A^c\cup B^c)^c=A\cap B.
$$

従って $A\cap B\in\mathcal A$ であり、$\mathcal A$ はπ系です。
<!-- solution-end -->

### F0-00D3A-A02 Dynkin族だがσ代数ではない例

- Level: A
- 目安時間: 12分

$\Omega=\{1,2,3,4\}$ とし

$$
\mathcal D
=
\{A\subset\Omega:\#A\text{ が偶数}\}
$$

と置く。$\mathcal D$ がDynkin族であるがσ代数ではないことを示せ。

<!-- solution-start -->
#### 詳細解答

$\#\Omega=4$ は偶数なので $\Omega\in\mathcal D$ です。$A\in\mathcal D$ なら

$$
\#A^c=4-\#A
$$

も偶数なので $A^c\in\mathcal D$ です。

互いに素な $A_n\in\mathcal D$ については、$\Omega$ が4点しかないので非空なものは高々有限個です。互いに素だから

$$
\#\left(\bigcup_nA_n\right)
=
\sum_n\#A_n
$$

であり、右辺は偶数の和なので偶数です。従って和集合も $\mathcal D$ に属し、Dynkin族です。

一方、

$$
\{1,2\},\{1,3\}\in\mathcal D
$$

ですが

$$
\{1,2\}\cup\{1,3\}
=
\{1,2,3\}\notin\mathcal D.
$$

よって一般の和集合で閉じず、σ代数ではありません。
<!-- solution-end -->

### F0-00D3A-A03 Dynkin族の差集合

- Level: A
- 目安時間: 10分

$\mathcal D$ をDynkin族とし、$B\subset A$、$A,B\in\mathcal D$ とする。$A\setminus B\in\mathcal D$ を示せ。

<!-- solution-start -->
#### 詳細解答

補集合閉性から $A^c\in\mathcal D$ です。$B\subset A$ なので

$$
B\cap A^c=\varnothing.
$$

従って $B$ と $A^c$ は互いに素であり、Dynkin族の3番目の条件から

$$
B\cup A^c\in\mathcal D.
$$

さらに補集合を取れば

$$
(B\cup A^c)^c
=
A\setminus B
\in\mathcal D.
$$
<!-- solution-end -->

### F0-00D3A-A04 π系はσ代数とは限らない

- Level: A
- 目安時間: 8分

$\Omega=\{1,2,3\}$ とし

$$
\mathcal P
=
\{\varnothing,\{1\},\{2\},\Omega\}
$$

と置く。$\mathcal P$ がπ系であることと、σ代数ではないことを示せ。

<!-- solution-start -->
#### 詳細解答

$\mathcal P$ の二集合を交差させると、$\varnothing,\{1\},\{2\},\Omega$ のいずれかになり、全て $\mathcal P$ に残ります。従って $\mathcal P$ はπ系です。

しかし

$$
\{1\}\in\mathcal P
$$

に対して

$$
\{1\}^c=\{2,3\}\notin\mathcal P.
$$

補集合閉性を満たさないので、$\mathcal P$ はσ代数ではありません。
<!-- solution-end -->

### F0-00D3A-B01 一致集合族から一意性へ

- Level: B
- 目安時間: 18分

有限測度 $\mu,\nu$ が $\sigma(\mathcal P)$ 上に定義され、

$$
\mu(\Omega)=\nu(\Omega)<\infty
$$

かつπ系 $\mathcal P$ 上で一致するとする。

$$
\mathcal D
=
\{A\in\sigma(\mathcal P):\mu(A)=\nu(A)\}
$$

がDynkin族であることを示し、$\mu=\nu$ が $\sigma(\mathcal P)$ 全体で成り立つことを結論せよ。

<!-- solution-start -->
#### 詳細解答

まず

$$
\mu(\Omega)=\nu(\Omega)
$$

なので $\Omega\in\mathcal D$ です。

次に $A\in\mathcal D$ とします。有限測度だから差を取ることができ、

$$
\begin{aligned}
\mu(A^c)
&=\mu(\Omega)-\mu(A)\\
&=\nu(\Omega)-\nu(A)\\
&=\nu(A^c).
\end{aligned}
$$

従って $A^c\in\mathcal D$ です。

最後に、互いに素な $A_1,A_2,\ldots\in\mathcal D$ を取ります。可算加法性から

$$
\begin{aligned}
\mu\left(\bigcup_nA_n\right)
&=\sum_n\mu(A_n)\\
&=\sum_n\nu(A_n)\\
&=\nu\left(\bigcup_nA_n\right).
\end{aligned}
$$

従って $\bigcup_nA_n\in\mathcal D$ です。以上から $\mathcal D$ はDynkin族です。

仮定より $\mathcal P\subset\mathcal D$ なので、π–λ定理を

$$
\text{π系 }\mathcal P,
\qquad
\text{Dynkin族 }\mathcal D
$$

に適用して

$$
\sigma(\mathcal P)\subset\mathcal D
$$

を得ます。$\mathcal D$ の定義から、これは $\sigma(\mathcal P)$ の全ての集合で $\mu$ と $\nu$ が一致することを意味します。
<!-- solution-end -->

### F0-00D3A-B02 補助族 $\mathcal D_A$ がDynkin族になる理由

- Level: B
- 目安時間: 18分

$\mathcal P$ をπ系、$\mathcal L=\lambda(\mathcal P)$ とし、$A\in\mathcal P$ を固定する。

$$
\mathcal D_A
=
\{B\in\mathcal L:A\cap B\in\mathcal L\}
$$

がDynkin族であることを、全体集合・補集合・互いに素な可算和の3条件に分けて示せ。

<!-- solution-start -->
#### 詳細解答

$A\in\mathcal P\subset\mathcal L$ なので

$$
A\cap\Omega=A\in\mathcal L.
$$

従って $\Omega\in\mathcal D_A$ です。

次に $B\in\mathcal D_A$ なら $A\cap B\in\mathcal L$ です。しかも $A\cap B\subset A$ なので、A03 の差集合の結果から

$$
A\setminus(A\cap B)
=
A\cap B^c
\in\mathcal L.
$$

従って $B^c\in\mathcal D_A$ です。

互いに素な $B_n\in\mathcal D_A$ を取ると、$A\cap B_n\in\mathcal L$ で、これらも互いに素です。従って

$$
\bigcup_n(A\cap B_n)
=
A\cap\left(\bigcup_nB_n\right)
\in\mathcal L.
$$

よって $\bigcup_nB_n\in\mathcal D_A$ です。以上で $\mathcal D_A$ はDynkin族です。
<!-- solution-end -->

### F0-00D3A-B03 Dynkin族 + 有限交差閉性からσ代数へ

- Level: B
- 目安時間: 20分

$\mathcal L$ がDynkin族で、さらに有限交差で閉じているとする。$\mathcal L$ がσ代数であることを、任意の列 $A_1,A_2,\ldots\in\mathcal L$ を互いに素な列へ直して示せ。

<!-- solution-start -->
#### 詳細解答

Dynkin族なので補集合で閉じています。有限交差閉性と De Morgan 則から

$$
A\cup B=(A^c\cap B^c)^c
$$

も $\mathcal L$ に属するので、有限和で閉じています。

任意の $A_n\in\mathcal L$ に対して

$$
C_1=A_1,
\qquad
C_n
=
A_n\setminus\bigcup_{k<n}A_k
$$

と置きます。$\bigcup_{k<n}A_k$ は有限和なので $\mathcal L$ に属し、

$$
C_n
=
A_n\cap
\left(\bigcup_{k<n}A_k\right)^c
\in\mathcal L.
$$

$(C_n)$ は互いに素で、

$$
\bigcup_nA_n
=
\bigsqcup_nC_n.
$$

Dynkin族は互いに素な可算和で閉じるので、右辺は $\mathcal L$ に属します。従って任意の可算和で閉じ、$\mathcal L$ はσ代数です。
<!-- solution-end -->

### F0-00D3A-C01 半直線からBorel集合へ広げる

- Level: C
- 目安時間: 25分

$\mu,\nu$ を $(\mathbb R,\mathcal B(\mathbb R))$ 上の確率測度とし、全ての $a\in\mathbb R$ について

$$
\mu(( -\infty,a])
=
\nu(( -\infty,a])
$$

が成り立つとする。π–λ定理を使って

$$
\mu(B)=\nu(B)
\qquad
(B\in\mathcal B(\mathbb R))
$$

を示せ。

<!-- solution-start -->
#### 詳細解答

半直線の族

$$
\mathcal P
=
\{(-\infty,a]:a\in\mathbb R\}
$$

を考えます。二つの半直線の交差は

$$
(-\infty,a]\cap(-\infty,b]
=
(-\infty,\min(a,b)]
$$

なので、$\mathcal P$ はπ系です。

次に $\sigma(\mathcal P)=\mathcal B(\mathbb R)$ を確認します。各 $(-\infty,a]$ は閉集合なのでBorel集合であり、

$$
\sigma(\mathcal P)
\subset
\mathcal B(\mathbb R).
$$

逆向きには、$a<b$ に対して

$$
(a,b]
=
(-\infty,b]\setminus(-\infty,a]
\in\sigma(\mathcal P).
$$

さらに

$$
(a,b)
=
\bigcup_{n:,b-1/n>a}
\left(a,b-\frac1n\right]
$$

なので開区間も $\sigma(\mathcal P)$ に属します。任意の開集合 $G\subset\mathbb R$ は、その中に含まれる有理端点の開区間の可算和として書けるので $G\in\sigma(\mathcal P)$ です。従って全ての開集合が $\sigma(\mathcal P)$ に入り、

$$
\mathcal B(\mathbb R)
\subset
\sigma(\mathcal P).
$$

以上から

$$
\sigma(\mathcal P)=\mathcal B(\mathbb R).
$$

仮定より $\mu$ と $\nu$ は $\mathcal P$ 上で一致します。また両者は確率測度なので

$$
\mu(\mathbb R)=\nu(\mathbb R)=1<\infty.
$$

B01 の有限測度一意性を $\mathcal P$ に適用すると

$$
\mu(B)=\nu(B)
$$

が全ての $B\in\sigma(\mathcal P)=\mathcal B(\mathbb R)$ で成り立ちます。
<!-- solution-end -->

---

## 7. 次に進む

**次：[F0-00D4 Lebesgue測度・Borel集合・拡張定理](../F0_00D4_Lebesgue測度_Borel集合_拡張定理/index.md)**
