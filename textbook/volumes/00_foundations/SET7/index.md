# SET7 Hartogs の補題：選択公理なしで大きすぎる順序数を作る

<!-- definition-example-audit: strict -->

任意の集合 $X$ に対して、

> $X$ へ単射できない順序数は存在するか

を考えます。

もし $X$ が整列可能なら、$X$ 自身をある順序数と同一視し、その先の順序数を考えればよさそうです。しかしそれでは「$X$ が整列可能」という、まさに後で選択公理から導きたい事実を先に使ってしまいます。

Hartogs の補題の巧妙な点は、$X$ 自身を整列しません。

代わりに、

1. $X$ の **部分集合** に置ける全ての整列を集める。
2. それぞれの順序型を順序数として集める。
3. それら全部より先へ進んだ順序数を作る。

という方法を取ります。

この証明は ZF の内部で閉じ、選択公理を使いません。

---

## 1. $X$ の部分集合上の整列は一つの集合に収まる

関係 $r$ が $A\subseteq X$ 上の二項関係なら

$$
r\subseteq A\times A\subseteq X\times X.
$$

したがって候補となる関係は全て

$$
\mathcal P(X\times X)
$$

の中に入ります。

<a id="def-set7-wellorders-on-subsets"></a>
<!-- formal-statement-start -->
### 定義（$X$ の部分集合上の整列の集合）

集合 $X$ に対し、

$$
\mathcal W_X
=
\{
(A,r)
:
A\subseteq X,\ 
r\subseteq A\times A,\ 
r\text{ が }A\text{ を整列する}
\}
$$

と置く。
<!-- formal-statement-end -->

<!-- definition-example-start: def-set7-wellorders-on-subsets -->
**定義の確認。** $X=\{a,b\}$ なら、

- 空集合上の整列、
- $\{a\}$ 上の整列、
- $\{b\}$ 上の整列、
- $\{a,b\}$ を $a<b$ と並べる整列、
- $\{a,b\}$ を $b<a$ と並べる整列

などが $\mathcal W_X$ に入ります。

同じ部分集合でも異なる整列を持てるため、$A$ だけでなく関係 $r$ もデータに含めます。
<!-- definition-example-end -->

$\mathcal P(X)$ と $\mathcal P(X\times X)$ は集合なので、その直積も集合です。そこから分出公理図式で条件を満たす組だけを切り出せば、$\mathcal W_X$ は集合です。

---

## 2. 順序型を全部集めるところで Replacement を使う

[SET2](../SET2/index.md#thm-set2-order-type) で、各整列集合 $(A,r)$ には一意な順序型

$$
\operatorname{otp}(A,r)
$$

が存在することを証明しました。

<a id="def-set7-order-types-realized-in-x"></a>
<!-- formal-statement-start -->
### 定義（$X$ 内で実現される順序型の集合）

$$
\mathcal O_X
=
\{
\operatorname{otp}(A,r)
:
(A,r)\in\mathcal W_X
\}
$$

と置く。
<!-- formal-statement-end -->

<!-- definition-example-start: def-set7-order-types-realized-in-x -->
**定義の確認。** $X=\{a,b\}$ では、空集合・1点集合・2点集合の整列しか作れないため、

$$
\mathcal O_X=\{0,1,2\}.
$$

3点の順序型 $3$ は実現できません。
<!-- definition-example-end -->

ここは Hartogs の証明で最も重要な集合形成の一つです。

各 $(A,r)\in\mathcal W_X$ に一意な順序数

$$
\operatorname{otp}(A,r)
$$

が対応します。

したがって SET1 の **置換公理図式** により、その像全体 $\mathcal O_X$ が集合として存在します。

「全ての順序型を集める」と言うだけでは不十分で、Replacement がこの集合化を保証しています。

---

## 3. 実現された全順序型より大きい順序数を作る

$\mathcal O_X$ は順序数の集合です。

各 $\alpha\in\mathcal O_X$ の後続 $S(\alpha)$ を置換で集め、

$$
\gamma_X
=
\bigcup_{\alpha\in\mathcal O_X}S(\alpha)
$$

と置きます。

順序数の集合の合併は順序数なので $\gamma_X$ は順序数です。

さらに各 $\alpha\in\mathcal O_X$ について

$$
\alpha\in S(\alpha)
\subseteq\gamma_X,
$$

従って

$$
\alpha<\gamma_X.
$$

<a id="lem-set7-gamma-no-injection"></a>
<!-- formal-statement-start -->
### 補題（$\gamma_X$ は $X$ へ単射できない）

上で構成した順序数 $\gamma_X$ に対して、

$$
\gamma_X\not\hookrightarrow X.
$$
<!-- formal-statement-end -->

<!-- proof-start -->
### 証明

反対に単射

$$
j:\gamma_X\to X
$$

があると仮定します。

像を

$$
A=j[\gamma_X]\subseteq X
$$

とします。置換公理図式により $A$ は集合です。

$A$ 上の関係 $r$ を、

$$
j(\xi)\ r\ j(\eta)
\quad\Longleftrightarrow\quad
\xi=\eta
\ \text{または}\ 
\xi\in\eta
$$

で定めます。

$j$ は $\gamma_X$ から $A$ への全単射で、この定義により順序同型です。従って $r$ は $A$ を整列し、

$$
\operatorname{otp}(A,r)=\gamma_X.
$$

よって

$$
(A,r)\in\mathcal W_X
$$

なので

$$
\gamma_X\in\mathcal O_X.
$$

しかし $\mathcal O_X$ の全ての元は $\gamma_X$ より小さいように構成したので、

$$
\gamma_X<\gamma_X
$$

となり矛盾です。

従って $\gamma_X$ から $X$ への単射は存在しません。$\square$
<!-- proof-end -->

---

## 4. Hartogs 数

$\gamma_X$ が一つ見つかったので、その中で「最初に $X$ へ単射できなくなる順序数」を取れます。

<a id="def-set7-hartogs-number"></a>
<!-- formal-statement-start -->
### 定義（Hartogs 数）

集合 $X$ に対し、

$$
H_X
=
\{
\alpha\le\gamma_X:
\alpha\not\hookrightarrow X
\}
$$

を考える。

$\gamma_X\in H_X$ なので非空である。順序数 $\gamma_X+1$ の整列性により $H_X$ は最小元を持つ。

その最小元を

$$
h(X)
$$

と書き、$X$ の **Hartogs 数** という。
<!-- formal-statement-end -->

<!-- definition-example-start: def-set7-hartogs-number -->
**定義の確認：有限集合。**

$X$ が $n$ 個の元を持つ有限集合なら、

$$
0,1,\ldots,n
$$

は $X$ へ単射できますが、

$$
n+1
$$

は単射できません。

従って

$$
h(X)=n+1.
$$
<!-- definition-example-end -->

<a id="thm-set7-hartogs"></a>
<!-- formal-statement-start -->
### 定理（Hartogs の補題）

任意の集合 $X$ に対して、$X$ へ単射できない順序数が存在する。

より正確には Hartogs 数 $h(X)$ が存在し、

$$
h(X)\not\hookrightarrow X,
$$

かつ全ての $\alpha<h(X)$ について

$$
\alpha\hookrightarrow X
$$

が成り立つ。
<!-- formal-statement-end -->

<!-- proof-start -->
### 証明

前節までで、順序数 $\gamma_X$ を ZF の公理だけから構成し、

$$
\gamma_X\not\hookrightarrow X
$$

を示しました。

したがって

$$
H_X
=
\{
\alpha\le\gamma_X:
\alpha\not\hookrightarrow X
\}
$$

は非空です。

$\gamma_X+1$ は順序数なので $\in$ で整列されています。従って非空部分集合 $H_X$ は最小元を持ちます。それを $h(X)$ と定義しました。

定義から

$$
h(X)\not\hookrightarrow X.
$$

また $\alpha<h(X)$ で $\alpha\not\hookrightarrow X$ なら $\alpha\in H_X$ となり、$h(X)$ の最小性に反します。

従って全ての $\alpha<h(X)$ について

$$
\alpha\hookrightarrow X.
$$

これで主張が示されました。$\square$
<!-- proof-end -->

### 選択公理を使っていないことを確認する

証明で使った主な道具は、

- 冪集合公理：関係候補を $\mathcal P(X\times X)$ に収める。
- 分出公理図式：整列関係だけを切り出す。
- [SET2 の順序型定理](../SET2/index.md#thm-set2-order-type)。
- 置換公理図式：各整列の順序型を集合 $\mathcal O_X$ に集める。
- 和集合公理：順序型の上限を作る。
- 順序数の整列性：最小の非単射順序数を取る。

です。

どの段階でも「任意の非空集合族から同時に一つずつ選ぶ」操作はしていません。

---

## 5. Hartogs 数は次の基数を作る

<a id="thm-set7-hartogs-cardinal"></a>
<!-- formal-statement-start -->
### 定理（順序数の Hartogs 数はより大きい基数）

$\alpha$ を順序数とする。

このとき $h(\alpha)$ は基数であり、

$$
\alpha<h(\alpha).
$$
<!-- formal-statement-end -->

<!-- proof-start -->
### 証明

まず任意の $\beta\le\alpha$ について包含写像

$$
\beta\hookrightarrow\alpha
$$

があります。

$h(\alpha)$ は $\alpha$ へ単射できない最小の順序数なので、

$$
h(\alpha)>\alpha.
$$

次に $h(\alpha)$ が基数であることを示します。

もしある $\beta<h(\alpha)$ が

$$
\beta\cong h(\alpha)
$$

を満たすとします。

Hartogs 数の最小性から $\beta<h(\alpha)$ なら単射

$$
\beta\hookrightarrow\alpha
$$

が存在します。

全単射

$$
h(\alpha)\to\beta
$$

と合成すれば

$$
h(\alpha)\hookrightarrow\alpha
$$

が得られ、Hartogs 数の定義に反します。

従って $h(\alpha)$ は自分より小さい順序数と全単射にならず、初期順序数、すなわち基数です。$\square$
<!-- proof-end -->

<a id="cor-set7-successor-cardinal"></a>
<!-- formal-statement-start -->
### 系（次の基数）

基数 $\kappa$ に対し、

$$
\kappa^+
=
h(\kappa)
$$

と置くと、$\kappa^+$ は $\kappa$ より大きい最小の基数である。
<!-- formal-statement-end -->

<!-- proof-start -->
### 証明

直前の定理から $\kappa^+$ は $\kappa$ より大きい基数です。

もし基数 $\lambda$ が

$$
\kappa<\lambda<\kappa^+
$$

を満たすなら、Hartogs 数の最小性から

$$
\lambda\hookrightarrow\kappa.
$$

一方 $\kappa<\lambda$ なので包含写像

$$
\kappa\hookrightarrow\lambda
$$

があります。

Cantor--Bernstein により

$$
\kappa\cong\lambda,
$$

これは $\lambda$ が初期順序数であることに反します。

従って中間の基数はありません。$\square$
<!-- proof-end -->

特に

$$
\aleph_1
=
\aleph_0^+
=
h(\omega)
$$

と定義できます。

ここで重要なのは、$\aleph_1$ の存在自体には選択公理が不要なことです。

---

## 6. AC から整列可能定理へ進むとき、Hartogs は「停止保証」になる

後で選択公理を仮定し、集合 $X$ の未選択部分から一つずつ元を取る超限再帰を考えます。

もし選択が永久に止まらず $h(X)$ の全段階まで続けば、

$$
h(X)\hookrightarrow X
$$

という単射が作れてしまいます。

しかし Hartogs の補題により、これは不可能です。

従って $h(X)$ より前のどこかで未選択部分が空になり、その時点までに選んだ順番が $X$ の整列を与えます。

つまり Hartogs の役割は、

$$
\boxed{
\text{「選び続ければいつか全部取り尽くす」を保証する上限}
}
$$

です。

選択公理は「残集合から次の一点を選ぶ規則」を与え、Hartogs は「その操作が $X$ を越えて続くことはない」と保証します。この二つの責務は別です。

---

## 7. 演習

### Level A

<a id="ex-set7-a01"></a>
#### SET7-A01 有限集合の Hartogs 数
- Level: A

$|X|=3$ のとき

$$
h(X)=4
$$

であることを示せ。

<!-- solution-start -->
#### 詳細解答

3点集合 $X$ へは

$$
0,1,2,3
$$

から単射できます。

特に $3$ からは全単射があります。

一方、4点集合である順序数 $4$ から3点集合 $X$ への単射は存在しません。

従って $X$ へ単射できない最小の順序数は $4$ です。

$$
h(X)=4.
$$
<!-- solution-end -->

<a id="ex-set7-a02"></a>
#### SET7-A02 なぜ整列関係候補は集合に収まるか
- Level: A

$A\subseteq X$ 上の整列関係 $r$ が

$$
r\in\mathcal P(X\times X)
$$

となる理由を説明せよ。

<!-- solution-start -->
#### 詳細解答

$A\subseteq X$ なので

$$
A\times A\subseteq X\times X.
$$

$r$ は $A$ 上の二項関係なので

$$
r\subseteq A\times A.
$$

従って

$$
r\subseteq X\times X.
$$

冪集合の定義から

$$
r\in\mathcal P(X\times X).
$$

したがって全ての関係候補を一つの集合の中で探索できます。
<!-- solution-end -->

<a id="ex-set7-a03"></a>
#### SET7-A03 Replacement の役割
- Level: A

$\mathcal W_X$ から

$$
\mathcal O_X
=
\{\operatorname{otp}(A,r):(A,r)\in\mathcal W_X\}
$$

を作るとき、なぜ置換公理図式が使えるか説明せよ。

<!-- solution-start -->
#### 詳細解答

[SET2 の順序型定理](../SET2/index.md#thm-set2-order-type)により、各 $(A,r)\in\mathcal W_X$ に対して

$$
\operatorname{otp}(A,r)
$$

という順序数が **一意に** 定まります。

したがって

$$
(A,r)
\longmapsto
\operatorname{otp}(A,r)
$$

は集合 $\mathcal W_X$ 上の一価な対応です。

置換公理図式は、集合の各元に一意な集合が対応するとき、その像全体も集合になることを保証します。

従って $\mathcal O_X$ は集合です。
<!-- solution-end -->

<a id="ex-set7-a04"></a>
#### SET7-A04 Hartogs 数より前は全部単射できる
- Level: A

$\alpha<h(X)$ なら

$$
\alpha\hookrightarrow X
$$

であることを $h(X)$ の最小性から説明せよ。

<!-- solution-start -->
#### 詳細解答

$h(X)$ は

$$
X\text{ へ単射できない順序数}
$$

の中で最小のものです。

もし $\alpha<h(X)$ なのに $\alpha\not\hookrightarrow X$ なら、$\alpha$ も「単射できない順序数」です。

すると $h(X)$ より小さい候補 $\alpha$ が存在することになり、$h(X)$ の最小性に反します。

従って

$$
\alpha<h(X)
\Longrightarrow
\alpha\hookrightarrow X.
$$
<!-- solution-end -->

### Level B

<a id="ex-set7-b01"></a>
#### SET7-B01 $\gamma_X$ が単射できないことを再証明する
- Level: B

$$
\gamma_X
=
\bigcup_{\alpha\in\mathcal O_X}S(\alpha)
$$

とする。単射 $j:\gamma_X\to X$ を仮定して矛盾を導け。

<!-- solution-start -->
#### 詳細解答

単射を仮定し、像を

$$
A=j[\gamma_X]\subseteq X
$$

とします。

$A$ 上に

$$
j(\xi)\ r\ j(\eta)
\iff
\xi\in\eta
$$

で関係 $r$ を入れます。

$j$ は $(\gamma_X,\preceq_{\gamma_X})$ から $(A,r)$ への順序同型なので、

$$
\operatorname{otp}(A,r)=\gamma_X.
$$

したがって

$$
\gamma_X\in\mathcal O_X.
$$

一方 $\gamma_X$ の定義から、全ての $\alpha\in\mathcal O_X$ について

$$
\alpha<\gamma_X.
$$

特に $\alpha=\gamma_X$ を代入すると

$$
\gamma_X<\gamma_X,
$$

矛盾です。

従って単射は存在しません。
<!-- solution-end -->

<a id="ex-set7-b02"></a>
#### SET7-B02 $h(\alpha)$ が基数であること
- Level: B

順序数 $\alpha$ に対し $h(\alpha)$ が初期順序数であることを証明せよ。

<!-- solution-start -->
#### 詳細解答

反対に $h(\alpha)$ が初期順序数でないとします。

するとある $\beta<h(\alpha)$ が存在して

$$
\beta\cong h(\alpha).
$$

Hartogs 数の最小性により、$\beta<h(\alpha)$ なら

$$
\beta\hookrightarrow\alpha
$$

です。

全単射

$$
h(\alpha)\to\beta
$$

とこの単射を合成すると

$$
h(\alpha)\hookrightarrow\alpha
$$

が得られます。

しかし $h(\alpha)$ は $\alpha$ へ単射できないように定義されています。矛盾です。

従って $h(\alpha)$ は初期順序数、すなわち基数です。
<!-- solution-end -->

<a id="ex-set7-b03"></a>
#### SET7-B03 $\aleph_1$ の存在は AC を使わない
- Level: B

$$
\aleph_1=h(\omega)
$$

と置ける理由と、その存在証明で選択公理を使っていない理由を説明せよ。

<!-- solution-start -->
#### 詳細解答

$\omega$ は順序数です。

Hartogs の補題から

$$
h(\omega)
$$

が存在し、$\omega$ へ単射できません。

また「順序数の Hartogs 数はより大きい基数」の定理から

$$
h(\omega)
$$

は $\omega$ より大きい基数です。

さらに「次の基数」の系から、$\omega$ と $h(\omega)$ の間に別の基数はありません。

したがって

$$
\aleph_1:=h(\omega)
$$

と定義できます。

Hartogs の証明で使ったのは冪集合・分出・置換・和集合・順序型など ZF の道具であり、選択公理は使用していません。
<!-- solution-end -->

### Level C

<a id="ex-set7-c01"></a>
#### SET7-C01 Hartogs の補題を公理使用箇所まで含めて再構成する
- Level: C

任意の集合 $X$ に対して $X$ へ単射できない順序数が存在することを、次の順で証明せよ。

1. $X$ の部分集合上の整列全体を集合 $\mathcal W_X$ にする。
2. 順序型を置換で $\mathcal O_X$ に集める。
3. 全順序型より大きい $\gamma_X$ を作る。
4. $\gamma_X\hookrightarrow X$ を仮定して、像へ整列を移して矛盾する。
5. 最小の非単射順序数 $h(X)$ を取る。
6. 選択公理を使った箇所がないことを確認する。

<!-- solution-start -->
#### 詳細解答

**1. 整列の候補を集合にする。**

$A\subseteq X$ なら $A\in\mathcal P(X)$、関係 $r$ は

$$
r\subseteq X\times X
$$

なので

$$
r\in\mathcal P(X\times X).
$$

したがって

$$
\mathcal P(X)\times\mathcal P(X\times X)
$$

という集合の中から「$r$ が $A$ を整列する」組だけを分出し、

$$
\mathcal W_X
$$

を作れます。

**2. 順序型を集める。**

各 $(A,r)\in\mathcal W_X$ には [SET2](../SET2/index.md#thm-set2-order-type) により一意な順序型があります。

一価な対応なので置換公理図式から

$$
\mathcal O_X
=
\{\operatorname{otp}(A,r):(A,r)\in\mathcal W_X\}
$$

は集合です。

**3. 上へ抜ける順序数。**

各 $\alpha\in\mathcal O_X$ の後続を置換で集め、

$$
\gamma_X
=
\bigcup_{\alpha\in\mathcal O_X}S(\alpha)
$$

とします。

すると各 $\alpha\in\mathcal O_X$ で

$$
\alpha<\gamma_X.
$$

**4. 単射を仮定して矛盾。**

$j:\gamma_X\to X$ が単射とします。

像 $A=j[\gamma_X]$ 上へ $\gamma_X$ の所属順序を移し、

$$
j(\xi)\ r\ j(\eta)
\iff
\xi\in\eta
$$

とします。

すると $(A,r)$ は $X$ の部分集合上の整列で、順序型は $\gamma_X$ です。

よって

$$
\gamma_X\in\mathcal O_X.
$$

しかし $\mathcal O_X$ の各元は $\gamma_X$ より小さいので

$$
\gamma_X<\gamma_X,
$$

矛盾です。

**5. 最小のものを取る。**

$\gamma_X$ 自身が単射できないので、

$$
H_X
=
\{\alpha\le\gamma_X:\alpha\not\hookrightarrow X\}
$$

は非空です。

順序数の整列性から最小元があり、それを $h(X)$ とします。

これが Hartogs 数です。

**6. AC の使用確認。**

証明では、

- 冪集合公理
- 分出公理図式
- 置換公理図式
- 和集合公理
- 順序数と順序型の理論

を使いました。

「非空集合族から一斉に元を選ぶ」選択公理は使っていません。

したがって Hartogs の補題は ZF で証明されています。
<!-- solution-end -->

---

## 8. 次のフェーズへの接続

これで、F0-00A3A の完全同値証明が暗黙に使っていた

- 順序数
- 置換公理図式
- 超限帰納法
- 超限再帰
- Hartogs の補題

に canonical な前段章が揃いました。

次の段階では既存の

- F0-00A2 選択公理
- F0-00A3 Zorn の補題
- F0-00A3A 選択公理と Zorn の補題の同値性

をこの系列へ接続し、

$$
\mathrm{AC}
\Longleftrightarrow
\text{整列可能定理}
\Longleftrightarrow
\mathrm{Zorn}
$$

を未習概念なしで追える形に整理します。
