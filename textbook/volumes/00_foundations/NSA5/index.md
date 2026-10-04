# NSA5 無限小・有限超実数・標準部

<!-- definition-example-audit: strict -->

NSA1 では正の非零無限小と無限大超実数を実際に作り、NSA4 では無限小全体と有限超実数全体が内部集合ではないことを確認しました。ここまでで「標準実数のすぐ近くに、標準実数ではない超実数が大量にある」ことは見えています。

しかし解析に使うには、もう一つ道具が必要です。例えば

$$
3+\varepsilon
$$

が $3$ に限りなく近いとしても、「限りなく近い」を記号化するだけでは通常の実数へ戻れません。無限小のずれを持つ有限超実数から、対応する標準実数を一意に取り出せることを証明する必要があります。

この章では

$$
\text{有限超実数}
\longrightarrow
\text{無限小近接 } \approx
\longrightarrow
\text{標準部 } \operatorname{st}
$$

という流れを作ります。核心は、有限超実数 $x$ に対して標準実数だけから集合を作り、**実数の上限性質**を使って $x$ に無限小だけ近い実数を構成することです。超実数体そのものが Dedekind 完備だとは仮定しません。

---

## 1. 有限超実数は「標準的な大きさの窓」に入る

NSA1 で定義した無限大超実数は、どの標準正実数よりも絶対値が大きい超実数でした。解析で標準部を取れるのは、その反対側にある「標準実数で大きさを抑えられる」超実数です。

<a id="def-nsa5-limited-hyperreal"></a>
<!-- formal-statement-start -->
### 定義（有限超実数）

超実数 $x\in{}^*\mathbb R$ が**有限超実数**であるとは、ある標準実数 $M>0$ が存在して

$$
|x|<M
$$

となることをいう。
<!-- formal-statement-end -->

<!-- definition-example-start: def-nsa5-limited-hyperreal -->
**定義の確認**。NSA1 の正の無限小

$$
\varepsilon=\left[\frac1{n+1}\right]
$$

を使います。

無限小性から特に

$$
|\varepsilon|<1.
$$

従って

$$
|3+\varepsilon|
\le 3+|\varepsilon|
<4.
$$

よって $3+\varepsilon$ は有限超実数です。

一方、

$$
H=[n+1]
$$

は任意の標準 $M>0$ より大きいので有限超実数ではありません。
<!-- definition-example-end -->

有限という語は「代表列が有界」という意味ではありません。例えば、ある集合 $E\in\mathcal U$ の上では $x_n=0$、補集合上では $x_n=n$ とした列は、超実数としては $0$ と同じ元を表します。有限性は**同値類としての超実数の性質**です。

<a id="prop-nsa5-limited-vs-infinite"></a>
<!-- formal-statement-start -->
### 命題（有限でない超実数は無限大である）

超実数 $x$ について、次は同値である。

1. $x$ は有限超実数ではない。
2. $x$ は NSA1 の意味で無限大超実数である。
<!-- formal-statement-end -->

### 証明の見取り図

有限でないとは「標準正実数による上界が一つもない」ということです。無限大の定義は「任意の標準正実数を越える」です。等号の可能性だけ、少し大きい標準数を挟んで除きます。

<!-- proof-start -->
### 証明

まず $x$ が無限大超実数なら、任意の標準 $M>0$ に対し

$$
|x|>M.
$$

従って $|x|<M$ となる標準 $M$ は存在せず、$x$ は有限ではありません。

逆に $x$ が有限でないとします。標準実数 $r>0$ を任意に取ります。

$r+1$ も標準正実数です。有限でないという仮定から

$$
|x|<r+1
$$

は成り立ちません。全順序性から

$$
|x|\ge r+1>r.
$$

従って任意の標準 $r>0$ に対して $|x|>r$ です。よって $x$ は無限大超実数です。
<!-- proof-end -->

これで超実数は

$$
\text{有限}
\qquad\text{または}\qquad
\text{無限大}
$$

のどちらかに分かれます。次に、有限超実数同士が「無限小だけ違う」ことを表す記号を導入します。

---

## 2. 無限小だけ違う二つの数を $x\approx y$ と書く

普通の等号では

$$
3+\varepsilon\ne3
$$

です。しかし差は無限小です。極限・連続・微分を超準的に書くとき、この関係を何度も使います。

<a id="def-nsa5-infinitesimal-closeness"></a>
<!-- formal-statement-start -->
### 定義（無限小近接）

超実数 $x,y\in{}^*\mathbb R$ に対し

$$
x\approx y
$$

とは、差

$$
x-y
$$

が無限小であることをいう。
<!-- formal-statement-end -->

<!-- definition-example-start: def-nsa5-infinitesimal-closeness -->
**定義の確認**。$\varepsilon$ を正の非零無限小とすると

$$
3+\varepsilon\approx3
$$

です。実際、

$$
(3+\varepsilon)-3=\varepsilon
$$

が無限小だからです。

一方、

$$
3+\varepsilon\not\approx4.
$$

もし $3+\varepsilon\approx4$ なら

$$
1-\varepsilon
$$

が無限小になります。しかし $|\varepsilon|<1/2$ なので

$$
|1-\varepsilon|
\ge 1-|\varepsilon|
>\frac12,
$$

となり、無限小の定義に反します。
<!-- definition-example-end -->

無限小近接を計算で使うには、無限小の和や有限超実数との積が再び無限小になることを確認しておく必要があります。

<a id="lem-nsa5-infinitesimal-arithmetic"></a>
<!-- formal-statement-start -->
### 補題（無限小の基本演算）

$\alpha,\beta$ を無限小、$x$ を有限超実数とする。このとき

$$
\alpha+\beta,\qquad
-\alpha,\qquad
x\alpha
$$

はいずれも無限小である。
<!-- formal-statement-end -->

### 証明の見取り図

任意の標準誤差 $r>0$ を固定します。和には $r/2$、積には有限性から得た標準上界 $M$ を使って $r/M$ を無限小の定義へ入れます。

<!-- proof-start -->
### 証明

まず $\alpha+\beta$ を考えます。標準実数 $r>0$ を任意に取ります。

$\alpha,\beta$ は無限小なので、標準正実数 $r/2$ に対して

$$
|\alpha|<\frac r2,
\qquad
|\beta|<\frac r2.
$$

従って三角不等式から

$$
|\alpha+\beta|
\le|\alpha|+|\beta|
<r.
$$

$r$ は任意なので $\alpha+\beta$ は無限小です。

符号反転については

$$
|-\alpha|=|\alpha|
$$

なので直ちに無限小です。

最後に $x\alpha$ を考えます。$x$ は有限なので、ある標準 $M>0$ が存在して

$$
|x|<M.
$$

標準 $r>0$ に対し $r/M>0$ も標準実数です。$\alpha$ の無限小性から

$$
|\alpha|<\frac rM.
$$

従って

$$
|x\alpha|
=
|x||\alpha|
<
M\frac rM
=
r.
$$

$r$ は任意なので $x\alpha$ は無限小です。
<!-- proof-end -->

<a id="prop-nsa5-approx-equivalence"></a>
<!-- formal-statement-start -->
### 命題（無限小近接は同値関係である）

$\,{}^*\mathbb R$ 上の関係 $\approx$ は反射的・対称的・推移的である。
<!-- formal-statement-end -->

<!-- proof-start -->
### 証明

反射性は

$$
x-x=0
$$

が無限小であることから従います。

対称性は $x\approx y$ なら $x-y$ が無限小であり、補題から

$$
y-x=-(x-y)
$$

も無限小であることから従います。

推移性は $x\approx y$、$y\approx z$ のとき

$$
x-z=(x-y)+(y-z)
$$

が二つの無限小の和なので無限小であることから従います。
<!-- proof-end -->

---

## 3. monad は「一つの標準点の無限小近傍」

$x\approx a$ を満たす点をまとめて眺めると、標準実数 $a$ の周囲に無限小幅の雲があるように見えます。この集合を後続章で何度も使います。

<a id="def-nsa5-monad"></a>
<!-- formal-statement-start -->
### 定義（monad / halo）

標準実数 $a\in\mathbb R$ に対し

$$
\mu(a)
=
\{x\in{}^*\mathbb R:x\approx a\}
$$

を $a$ の**monad** または **halo** という。
<!-- formal-statement-end -->

<!-- definition-example-start: def-nsa5-monad -->
**定義の確認**。$\varepsilon$ が無限小なら

$$
a+2\varepsilon\in\mu(a)
$$

です。差は

$$
(a+2\varepsilon)-a=2\varepsilon
$$

であり、標準実数 $2$ は有限超実数なので、前節の補題から $2\varepsilon$ は無限小です。
<!-- definition-example-end -->

特に

$$
\mu(0)
$$

は NSA4 で外部集合だと示した無限小全体そのものです。また

$$
\mu(a)=a+\mu(0)
$$

なので、monad は通常の正半径近傍とは違い、内部集合として扱う対象ではありません。

