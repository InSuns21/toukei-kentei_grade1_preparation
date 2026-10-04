# SET6 基数：順序の長さと集合の大きさを分ける

<!-- definition-example-audit: strict -->

SET2〜SET4 では順序数を扱いました。順序数は、

> 元をどの順番で並べるか

を記録する量です。

一方、共通基礎 SET-U3 で学んだ濃度は、

> 全単射で対応できるか

だけを見て、並び順を忘れた「大きさ」です。

例えば

$$
\omega
$$

と

$$
\omega+1
$$

は順序数としては異なります。しかし集合としてはどちらも可算無限で、全単射を作れます。

そこで、同じ大きさを持つ順序数の中から **最初のもの** を代表に選びます。これが基数です。

この章では選択公理をまだ使いません。そのため、

> 任意の集合が必ずある順序数と同じ大きさになる

とは仮定しません。これは「任意の集合が整列可能」という主張と結び付いており、選択公理の領域です。

---

## 1. 初期順序数としての基数

<a id="def-set6-cardinal"></a>
<!-- formal-statement-start -->
### 定義（基数・初期順序数）

順序数 $\kappa$ が **基数**、または **初期順序数** であるとは、どの $\alpha<\kappa$ に対しても

$$
\alpha\not\cong\kappa
$$

であることをいう。

ここで $\cong$ は集合として全単射が存在することを表す。
<!-- formal-statement-end -->

<!-- definition-example-start: def-set6-cardinal -->
**定義の確認。**

有限順序数

$$
0,1,2,\ldots
$$

は全て基数です。例えば $3$ と同じ大きさの、それより小さい順序数はありません。

また $\omega$ も基数です。$\alpha<\omega$ は有限順序数なので、無限集合 $\omega$ と全単射にはなれません。
<!-- definition-example-end -->

一方 $\omega+1$ は基数ではありません。実際、

$$
f:\omega+1\to\omega
$$

を例えば

$$
f(\omega)=0,
\qquad
f(n)=n+1
\quad(n<\omega)
$$

と置けば全単射です。

したがって

$$
\omega
\cong
\omega+1
$$

ですが、同じ濃度を表す基数は小さい方の $\omega$ です。

---

## 2. 整列可能な集合の濃度を基数で代表する

任意の集合 $X$ が順序数と全単射になるとは、$X$ が整列可能であることと同値です。

<a id="thm-set6-wellorderable-cardinal"></a>
<!-- formal-statement-start -->
### 定理（整列可能な集合の基数代表）

集合 $X$ が整列可能であるとする。

このとき $X$ と全単射になる基数 $\kappa$ が一意に存在する。
<!-- formal-statement-end -->

### 証明

$X$ は整列可能なので、ある整列 $\prec$ を入れられます。

SET4 の順序型定理から、ある順序数 $\alpha$ が存在して

$$
X\cong\alpha.
$$

$\alpha$ と全単射になる順序数全体のうち、$\alpha+1$ の中にあるものだけを考えます。

$$
A=
\{\beta\le\alpha:\beta\cong\alpha\}.
$$

$\alpha\in A$ なので $A$ は非空です。順序数 $\alpha+1$ は整列されているため、$A$ は最小元 $\kappa$ を持ちます。

$\kappa\cong\alpha\cong X$ です。

もし $\gamma<\kappa$ で $\gamma\cong\kappa$ なら、推移性により

$$
\gamma\cong\kappa\cong\alpha
$$

なので $\gamma\in A$ となり、$\kappa$ の最小性に反します。

従って $\kappa$ は基数です。

一意性を示します。基数 $\kappa,\lambda$ がともに $X$ と全単射なら

$$
\kappa\cong\lambda.
$$

順序数の三分律から $\kappa<\lambda$, $\kappa=\lambda$, $\lambda<\kappa$ のどれかです。

もし $\kappa<\lambda$ なら、$\lambda$ は自分より小さい順序数 $\kappa$ と全単射になり、$\lambda$ が基数であることに反します。逆も同様です。

従って

$$
\kappa=\lambda.
$$

$\square$
<!-- proof-end -->

<a id="def-set6-cardinality-wellorderable"></a>
<!-- formal-statement-start -->
### 定義（整列可能な集合の基数）

整列可能な集合 $X$ と全単射になる一意な基数を

$$
|X|
$$

と書く。
<!-- formal-statement-end -->

<!-- definition-example-start: def-set6-cardinality-wellorderable -->
**定義の確認。**

$$
|\omega|=\omega,
$$

また $\omega+1$ は整列可能で $\omega$ と全単射なので

$$
|\omega+1|=\omega.
$$

順序型と基数はここで分離します。
<!-- definition-example-end -->

### 選択公理なしでの注意

ZF だけでは、**任意の集合 $X$ が整列可能とは限りません**。

したがってこの章で「$|X|$ を初期順序数として取る」ときは、

- $X$ が整列可能であることが分かっている、
- または後で ZFC を仮定している

ことを確認します。

SET-U3 で使った「$X$ と $Y$ は同じ濃度」「$X$ から $Y$ へ単射がある」という比較自体は、整列可能性なしでも意味を持ちます。

---

## 3. 基数の大小

<a id="thm-set6-cardinal-injection-order"></a>
<!-- formal-statement-start -->
### 定理（基数の順序と単射）

基数 $\kappa,\lambda$ に対して、

$$
\kappa\le\lambda
$$

であることと、

$$
\kappa\hookrightarrow\lambda
$$

という単射が存在することは同値である。
<!-- formal-statement-end -->

### 証明

$\kappa\le\lambda$ なら、順序数として

$$
\kappa\subseteq\lambda
$$

なので包含写像が単射です。

逆に単射

$$
f:\kappa\to\lambda
$$

があるとします。

順序数の三分律から、もし $\lambda<\kappa$ なら包含写像

$$
\lambda\hookrightarrow\kappa
$$

も存在します。

二方向の単射があるので SET-U3 の Cantor--Bernstein の定理から

$$
\kappa\cong\lambda.
$$

しかし $\lambda<\kappa$ なので、これは $\kappa$ が初期順序数であることに反します。

従って $\lambda<\kappa$ は不可能で、

$$
\kappa\le\lambda.
$$

$\square$
<!-- proof-end -->

基数に限定すると、単射による濃度比較と順序数としての大小が一致します。

---

## 4. $\aleph_0$

<a id="def-set6-aleph-zero"></a>
<!-- formal-statement-start -->
### 定義（$\aleph_0$）

最小の無限基数 $\omega$ を

$$
\aleph_0
$$

と書く。
<!-- formal-statement-end -->

<!-- definition-example-start: def-set6-aleph-zero -->
**定義の確認。**

SET-U2 で整数 $\mathbb Z$ と有理数 $\mathbb Q$ は可算であることを示しました。従って

$$
|\mathbb Z|
=
|\mathbb Q|
=
\aleph_0.
$$

順序構造は大きく違っても、集合としての大きさは同じです。
<!-- definition-example-end -->

$\aleph_1$ は「$\aleph_0$ より大きい最小の基数」として定義したくなります。

ただし、そのような「次の基数」が存在することをこの時点で無条件に使いません。SET7 の Hartogs の補題が、選択公理なしで「任意の順序数より大きい基数」を作れることを保証します。そこで $\aleph_1$ 以降の存在を回収します。

---

## 5. 基数の加法と乗法

有限集合の大きさと同じく、互いに交わらない和と直積から新しい大きさを作れます。

<a id="def-set6-cardinal-addition"></a>
<!-- formal-statement-start -->
### 定義（基数の加法）

基数 $\kappa,\lambda$ に対し、

$$
(\kappa\times\{0\})
\cup
(\lambda\times\{1\})
$$

の基数を、基数としての和とする。
<!-- formal-statement-end -->

<!-- definition-example-start: def-set6-cardinal-addition -->
**定義の確認。** 有限基数では通常の足し算と一致します。

例えば $2$ と $3$ の互いに素なコピーを合わせれば5点なので、基数として

$$
2+3=5.
$$
<!-- definition-example-end -->

<a id="def-set6-cardinal-multiplication"></a>
<!-- formal-statement-start -->
### 定義（基数の乗法）

基数 $\kappa,\lambda$ に対し、直積

$$
\kappa\times\lambda
$$

の基数を、基数としての積とする。
<!-- formal-statement-end -->

<!-- definition-example-start: def-set6-cardinal-multiplication -->
**定義の確認。**

SET-U2 で $\omega\times\omega$ は可算であることを示したので、

$$
\aleph_0\cdot\aleph_0
=
\aleph_0.
$$
<!-- definition-example-end -->

二つの整列可能集合の互いに素な和と有限直積は辞書式順序などで整列できるため、これらの基数代表は ZF で取れます。

---

## 6. 冪と $2^\kappa$ では選択原理に注意する

関数全体の集合

$$
{}^\kappa\lambda
=
\{f:f:\kappa\to\lambda\}
$$

の大きさを $\lambda^\kappa$ と書きたくなります。

特に

$$
{}^\kappa 2
$$

は $\kappa$ の各元に0か1を割り当てる関数全体です。各関数を「1になる場所」の部分集合へ送ると、

$$
{}^\kappa2
\cong
\mathcal P(\kappa).
$$

従って

$$
2^\kappa
$$

は通常 $\mathcal P(\kappa)$ の濃度を表します。

<a id="prop-set6-power-set-larger"></a>
<!-- formal-statement-start -->
### 命題（Cantor の定理による冪集合の増大）

任意の基数 $\kappa$ に対し、

$$
\kappa
\hookrightarrow
\mathcal P(\kappa)
$$

だが、

$$
\mathcal P(\kappa)
\not\hookrightarrow
\kappa
$$

である。

従って冪集合は $\kappa$ より真に大きい。
<!-- formal-statement-end -->

### 証明

単射

$$
\kappa\to\mathcal P(\kappa),
\qquad
\alpha\mapsto\{\alpha\}
$$

があります。

一方、もし単射

$$
\mathcal P(\kappa)\to\kappa
$$

があれば、上の単射と Cantor--Bernstein により

$$
\kappa\cong\mathcal P(\kappa)
$$

となります。

しかし SET-U3 の Cantor の定理は、どの集合もその冪集合と全単射にならないことを示しています。矛盾です。$\square$
<!-- proof-end -->

### 重要な境界

ZF では、$\mathcal P(\kappa)$ が必ず整列可能とは限りません。

したがって

$$
2^\kappa
$$

を「ある初期順序数」として扱うには、その関数集合が整列可能であることが必要です。ZFC では全ての集合が整列可能になるので、通常の基数冪として一意な基数代表を取れます。

この区別を消してしまうと、知らないうちに選択公理を使うことになります。

---

## 7. 連続体仮説の主張

実数全体は SET-U3 で

$$
\mathbb R
\cong
\mathcal P(\omega)
$$

と同じ濃度であることを学びました。

したがって連続体の大きさは

$$
2^{\aleph_0}
$$

と書かれます。

**連続体仮説**は、可算無限と連続体の間に中間の大きさがない、という主張です。

SET7 で $\aleph_1$ の存在を得たあと、ZFC の通常の表記では

$$
2^{\aleph_0}=\aleph_1
$$

と書けます。

この系列では主張の意味までを扱い、独立性証明は行いません。CH の独立性には構成可能宇宙や forcing など、別系列の数理論理が必要です。

---

## 8. 演習

### Level A

<a id="ex-set6-a01"></a>
#### SET6-A01 $\omega+1$ が基数でないこと
- Level: A

$\omega+1$ と $\omega$ の間に全単射を一つ構成し、$\omega+1$ が基数でないことを示せ。

<!-- solution-start -->
#### 詳細解答

写像

$$
f:\omega+1\to\omega
$$

を

$$
f(\omega)=0,
$$

$$
f(n)=n+1
\qquad(n<\omega)
$$

と定めます。

異なる自然数は異なる正整数へ送られ、$\omega$ だけが0へ送られるので単射です。

また0は $f(\omega)$、正整数 $m$ は $f(m-1)$ として得られるため全射です。

従って

$$
\omega+1\cong\omega.
$$

しかも

$$
\omega<\omega+1.
$$

よって $\omega+1$ は自分より小さい順序数と全単射であり、基数ではありません。
<!-- solution-end -->

<a id="ex-set6-a02"></a>
#### SET6-A02 $\aleph_0$ の具体例
- Level: A

SET-U2 の結果を使って

$$
|\mathbb Z|=|\mathbb Q|=\aleph_0
$$

を説明せよ。

<!-- solution-start -->
#### 詳細解答

SET-U2 で $\mathbb Z$ と $\mathbb Q$ はどちらも可算無限、すなわち $\omega$ と全単射になることを示しました。

$\omega$ は最小の無限基数で

$$
\aleph_0=\omega.
$$

したがって、それぞれの基数代表は

$$
|\mathbb Z|=\aleph_0,
\qquad
|\mathbb Q|=\aleph_0.
$$
<!-- solution-end -->

<a id="ex-set6-a03"></a>
#### SET6-A03 可算直積の有限版
- Level: A

$$
\aleph_0\cdot\aleph_0=\aleph_0
$$

が SET-U2 のどの結果に対応するか説明せよ。

<!-- solution-start -->
#### 詳細解答

基数の積は直積集合の濃度です。

$$
\aleph_0\cdot\aleph_0
=
|\omega\times\omega|.
$$

SET-U2 では $\mathbb N\times\mathbb N$ を対角線状に列挙し、$\omega\times\omega$ が可算無限であることを示しました。

従って

$$
|\omega\times\omega|
=
\aleph_0.
$$
<!-- solution-end -->

<a id="ex-set6-a04"></a>
#### SET6-A04 部分集合と0-1関数
- Level: A

$A\subseteq\kappa$ に対し指示関数

$$
\mathbf 1_A:\kappa\to2
$$

を対応させる写像が

$$
\mathcal P(\kappa)\cong{}^\kappa2
$$

を与えることを示せ。

<!-- solution-start -->
#### 詳細解答

$A\subseteq\kappa$ に対し

$$
\mathbf1_A(\alpha)
=
\begin{cases}
1,&\alpha\in A,\\
0,&\alpha\notin A
\end{cases}
$$

と定めます。

異なる部分集合 $A,B$ には、所属が異なる $\alpha$ があるため指示関数も異なります。従って単射です。

逆に任意の関数

$$
f:\kappa\to2
$$

に対して

$$
A_f=\{\alpha<\kappa:f(\alpha)=1\}
$$

と置けば

$$
f=\mathbf1_{A_f}.
$$

従って全射でもあり、全単射です。
<!-- solution-end -->

### Level B

<a id="ex-set6-b01"></a>
#### SET6-B01 基数間の単射と大小
- Level: B

基数 $\kappa,\lambda$ の間に単射 $\kappa\to\lambda$ があるなら

$$
\kappa\le\lambda
$$

であることを、Cantor--Bernstein と初期順序数の定義から証明せよ。

<!-- solution-start -->
#### 詳細解答

単射

$$
\kappa\hookrightarrow\lambda
$$

があるとします。

もし

$$
\lambda<\kappa
$$

なら、順序数として

$$
\lambda\subseteq\kappa
$$

なので包含写像

$$
\lambda\hookrightarrow\kappa
$$

もあります。

二方向の単射から Cantor--Bernstein により

$$
\kappa\cong\lambda.
$$

ところが $\lambda<\kappa$ なので、これは $\kappa$ が「自分より小さい順序数と全単射にならない」という初期順序数の定義に反します。

従って $\lambda<\kappa$ は不可能で、

$$
\kappa\le\lambda.
$$
<!-- solution-end -->

<a id="ex-set6-b02"></a>
#### SET6-B02 冪集合は真に大きい
- Level: B

Cantor の定理と一元集合写像を使って、

$$
\kappa<|\mathcal P(\kappa)|
$$

という意味の濃度比較を説明せよ。ただし ZF では右辺が初期順序数として表せるとは限らない点にも触れよ。

<!-- solution-start -->
#### 詳細解答

一元集合写像

$$
\alpha\mapsto\{\alpha\}
$$

は

$$
\kappa\hookrightarrow\mathcal P(\kappa)
$$

という単射です。

Cantor の定理から

$$
\kappa\not\cong\mathcal P(\kappa).
$$

もし逆向きの単射

$$
\mathcal P(\kappa)\hookrightarrow\kappa
$$

があれば Cantor--Bernstein により全単射になってしまうため、逆向き単射も存在しません。

従って単射による比較の意味で $\mathcal P(\kappa)$ は $\kappa$ より真に大きいです。

ただし ZF だけでは $\mathcal P(\kappa)$ が整列可能とは限らないので、その濃度を必ず一つの初期順序数で表せるとは限りません。ZFC なら整列可能定理により基数代表を取れます。
<!-- solution-end -->

<a id="ex-set6-b03"></a>
#### SET6-B03 順序型と基数を区別する
- Level: B

$\omega$ と $\omega+1$ について、

1. 順序型として異なる理由
2. 基数として同じ理由

を説明せよ。

<!-- solution-start -->
#### 詳細解答

**1. 順序型。**

$$
\omega<\omega+1
$$

であり、異なる順序数です。$\omega+1$ には $\omega$ の全ての元の後に最後の元 $\omega$ が追加されています。

従って整列の形は異なります。

**2. 基数。**

一方、A01 で構成した全単射により

$$
\omega\cong\omega+1.
$$

したがって並び順を忘れて集合の大きさだけを見ると同じ可算無限です。

両者の基数代表は

$$
\aleph_0.
$$
<!-- solution-end -->

### Level C

<a id="ex-set6-c01"></a>
#### SET6-C01 整列可能な集合の基数代表の存在と一意性
- Level: C

整列可能な集合 $X$ に対して、$X$ と全単射な一意な基数 $\kappa$ が存在することを次の順で証明せよ。

1. SET4 の順序型定理で $X\cong\alpha$ となる順序数 $\alpha$ を得る。
2. $\alpha+1$ の中で $\alpha$ と全単射な順序数の最小元 $\kappa$ を取る。
3. $\kappa$ が初期順序数であることを示す。
4. 基数代表の一意性を示す。

<!-- solution-start -->
#### 詳細解答

$X$ は整列可能なので、整列 $\prec$ を一つ選びます。

SET4 の順序型定理から、ある順序数 $\alpha$ が存在して

$$
(X,\prec)\cong(\alpha,\in).
$$

特に集合として

$$
X\cong\alpha.
$$

次に

$$
A=
\{\beta\le\alpha:\beta\cong\alpha\}
$$

を考えます。$\alpha\in A$ なので非空です。$\alpha+1$ は整列されているため最小元 $\kappa$ を取れます。

$\kappa\cong\alpha\cong X$ です。

もし $\gamma<\kappa$ で

$$
\gamma\cong\kappa
$$

なら

$$
\gamma\cong\alpha
$$

でもあるため $\gamma\in A$ です。これは $\kappa$ が $A$ の最小元であることに反します。従って $\kappa$ は初期順序数、すなわち基数です。

最後に $\lambda$ も $X$ と全単射な基数とします。すると

$$
\kappa\cong X\cong\lambda.
$$

順序数の三分律で $\kappa<\lambda$ なら、$\lambda$ が自分より小さい順序数 $\kappa$ と全単射になり、$\lambda$ の初期性に反します。$\lambda<\kappa$ も同様です。

従って

$$
\kappa=\lambda.
$$

存在と一意性が示されました。
<!-- solution-end -->

---

## 9. 次章への接続

この章では「整列可能な集合には基数代表がある」ことを示しましたが、

> 任意の集合 $X$ に対して、$X$ より大きい順序数を選択公理なしで作れるか

という問いはまだ残っています。

SET7 では、$X$ の部分集合上に置ける **全ての整列** を一つの集合として集め、その順序型を置換公理図式で集約します。

その結果、

$$
\boxed{
X\text{ へ単射できない順序数}
}
$$

を ZF だけで構成します。これが Hartogs の補題です。
