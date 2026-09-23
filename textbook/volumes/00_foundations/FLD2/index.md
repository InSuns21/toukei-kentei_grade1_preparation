# FLD2 抽象代数 XII：多項式の全ての根を一つの体で見る

<!-- definition-example-audit: strict -->

[FLD1](../FLD1/index.md) では、既約多項式から一つの根を持つ単純拡大を作りました。しかし Galois 理論で必要なのは、一つの根だけではありません。多項式の**全ての根を同じ体に集め、その根どうしが基礎体から見てどう対応するか**を追うことです。

例えば

$$
x^3-2
$$

に実根 $\alpha=\sqrt[3]{2}$ を一つ加えても、残る二根

$$
\omega\alpha,\qquad \omega^2\alpha,
\qquad
\omega^2+\omega+1=0
$$

はまだ見えていません。そこで本章では

$$
\text{分解体}
\longrightarrow
\text{体の埋め込み}
\longrightarrow
\text{分解体の一意性}
\longrightarrow
\text{体拡大の分離性}
\longrightarrow
\text{体拡大の正規性}
$$

という順に進みます。

> **この章の停止線**
>
> 本章では「根が重ならないこと」と「共役な根を全て含むこと」を別々の性質として閉じます。自己同型群、固定体、有限 Galois 理論の基本定理は FLD4 へ送り、有限体に固有の Frobenius 写像は FLD3 へ送ります。

---

## 1. 全ての根を入れた最小の体

体 $F$ 上の非定数多項式

$$
f(x)\in F[x]
$$

を考えます。ある拡大体 $L/F$ で

$$
f(x)=a\prod_{j=1}^n(x-\alpha_j)
$$

と一次式の積に分解できる状況を考えます。

<a id="def-fld2-splitting-field"></a>
<!-- formal-statement-start -->
> **定義（分解体）**
>
> $F$ を体、$f\in F[x]$ を非定数多項式とする。
>
> 拡大体 $L/F$ が $f$ の **分解体**であるとは、
>
> 1. $f$ が $L[x]$ で一次式の積に分解し、
> 2. $L$ が $f$ の全ての根によって $F$ 上生成される
>
> ことをいう。
>
> すなわち $f$ の根を $\alpha_1,\dots,\alpha_r$ とすれば
>
$$
L=F(\alpha_1,\dots,\alpha_r)
$$
>
> である。
<!-- formal-statement-end -->

二つ目の条件が「余分な元を入れない」という最小性です。単に $f$ が分解する大きな体なら、分解体とは限りません。

<!-- definition-example-start: def-fld2-splitting-field -->
**定義の確認**

### 1.1 定義の確認：$x^2-2$

$\mathbb Q$ 上で

$$
f(x)=x^2-2
$$

を考えます。根は

$$
\sqrt2,\qquad -\sqrt2
$$

です。両方とも $\mathbb Q(\sqrt2)$ に入り、

$$
x^2-2=(x-\sqrt2)(x+\sqrt2)
$$

と分解します。

さらに二根から生成される体は

$$
\mathbb Q(\sqrt2,-\sqrt2)=\mathbb Q(\sqrt2)
$$

です。従って

$$
\boxed{\mathbb Q(\sqrt2)\text{ は }x^2-2\text{ の }\mathbb Q\text{ 上の分解体}}
$$

です。

一方 $\mathbb C$ でも $x^2-2$ は分解しますが、$\mathbb C$ は二根だけでは生成されないので分解体ではありません。
<!-- definition-example-end -->

### 1.2 具体例：$x^3-2$

$\alpha=\sqrt[3]{2}$、$\omega$ を

$$
\omega^2+\omega+1=0,
\qquad
\omega\ne1
$$

を満たす複素数とします。すると

$$
x^3-2
=
(x-\alpha)(x-\omega\alpha)(x-\omega^2\alpha).
$$

従って分解体は

$$
L=\mathbb Q(\alpha,\omega)
$$

です。

[RNG4 の Eisenstein の既約判定](../RNG4/index.md#thm-rng4-eisenstein)から $x^3-2$ は $\mathbb Q[x]$ で既約なので

$$
[\mathbb Q(\alpha):\mathbb Q]=3.
$$

また $\mathbb Q(\alpha)\subset\mathbb R$ ですが $\omega\notin\mathbb R$ なので

$$
\omega\notin\mathbb Q(\alpha).
$$

$\omega$ は $x^2+x+1$ の根だから

$$
[L:\mathbb Q(\alpha)]=2.
$$

[拡大次数の塔の公式](../FLD1/index.md#thm-fld1-tower-law)より

$$
\boxed{[L:\mathbb Q]=6}.
$$

「一つの根を加える次数」と「全ての根を入れる次数」は一般に一致しません。

---

## 2. 分解体は必ず作れる

FLD1 では既約多項式 $p\in F[x]$ から

$$
F[x]/(p)
$$

を作れば、$p$ の根を一つ含む体が得られることを示しました。それを根がなくなるまで繰り返せばよい、というのが存在証明の核心です。

<a id="thm-fld2-splitting-field-existence"></a>
<!-- formal-statement-start -->
> **定理（分解体の存在）**
>
> 体 $F$ と非定数多項式 $f\in F[x]$ に対し、$f$ の $F$ 上の分解体が存在する。
>
> さらにその分解体は $F$ 上有限拡大である。
<!-- formal-statement-end -->

### 証明の見取り図

$\deg f$ に関する帰納法を使います。

$f$ がすでに一次式へ分解していれば $F$ 自身で終わりです。そうでなければ、次数 $2$ 以上の既約因子 $p$ を一つ取り、FLD1 の商環構成で $p$ の根 $\alpha$ を持つ有限拡大 $E/F$ を作ります。

すると $E[x]$ では

$$
f(x)=(x-\alpha)g(x)
$$

となり、$\deg g=\deg f-1$ です。あとは $g$ の分解体を $E$ 上で作れば、そこでは $f$ も分解します。

<!-- proof-start -->
### 証明

$n=\deg f$ に関する帰納法で示します。

$n=1$ なら

$$
f(x)=a(x-\alpha),
\qquad
\alpha\in F
$$

なので $F$ 自身が分解体です。

$n\ge2$ とし、次数 $n-1$ 以下の多項式について主張が成り立つと仮定します。

もし $f$ が $F[x]$ ですでに一次式の積に分解しているなら、分解体は根で生成される $F$、すなわち $F$ 自身です。

そうでなければ、$f$ は次数 $2$ 以上の既約因子

$$
p(x)\in F[x]
$$

を持ちます。

[FLD1 の既約多項式による単純拡大の構成](../FLD1/index.md#prop-fld1-irreducible-quotient-construction)を使うと、有限拡大 $E/F$ と $\alpha\in E$ が存在して

$$
p(\alpha)=0
$$

となります。

$p\mid f$ なので $f(\alpha)=0$ です。従って $E[x]$ で多項式除法を使えば

$$
f(x)=(x-\alpha)g(x)
$$

となる $g\in E[x]$ が存在し、

$$
\deg g=n-1.
$$

帰納法の仮定により、$g$ は $E$ 上の有限な分解体 $L/E$ を持ちます。$L$ では $g$ が一次式の積に分解し、$\alpha\in E\subset L$ なので $f=(x-\alpha)g$ も一次式の積に分解します。

さらに $L$ は $E$ と $g$ の根で生成され、$E=F(\alpha)$ と取れるので、結局 $L$ は $f$ の根だけで $F$ 上生成されます。従って $L$ は $f$ の $F$ 上の分解体です。

各段は有限拡大であり、塔の公式を有限回使えば

$$
[L:F]<\infty
$$

です。

$\square$
<!-- proof-end -->

この証明は「解の公式」を一切使っていません。必要なのは

$$
\boxed{\text{既約因子の根を一つ商環で作り、次数を1つ下げる}}
$$

ことだけです。

---

## 3. 根をどこへ送れるか

分解体の「同型を除く一意性」を証明するには、根を別の根へ送る写像を制御する必要があります。

<a id="def-fld2-f-map"></a>
<!-- formal-statement-start -->
> **定義（基礎体を固定する体の埋め込み）**
>
> 体拡大 $K/F$、体 $\Omega$ を考える。
>
> 写像
>
$$
\sigma:K\to\Omega
$$
>
> が **基礎体 $F$ を固定する体の埋め込み**であるとは、$\sigma$ が体準同型であり、全ての $a\in F$ に対して
>
$$
\sigma(a)=a
$$
>
> を満たすことをいう。
>
> 体準同型は $1$ を $1$ へ送るものとする。
<!-- formal-statement-end -->

体準同型の核はイデアルです。体のイデアルは $0$ と全体しかなく、$1$ が $0$ へ送られないので核は $0$ です。従って体準同型は自動的に単射であり、「体の埋め込み」という名前と整合します。

<!-- definition-example-start: def-fld2-f-map -->
**定義の確認**

### 3.1 定義の確認：$\mathbb Q(\sqrt2)$ から $\mathbb C$ へ

写像

$$
\sigma_\pm(a+b\sqrt2)=a\pm b\sqrt2
$$

を考えます。

有理数 $a$ について

$$
\sigma_\pm(a)=a
$$

なので $\mathbb Q$ を固定します。

また

$$
(\pm\sqrt2)^2=2
$$

なので $\sqrt2$ が満たす関係 $x^2-2=0$ は保たれます。和と積も

$$
\sigma_\pm(u+v)=\sigma_\pm(u)+\sigma_\pm(v),
$$

$$
\sigma_\pm(uv)=\sigma_\pm(u)\sigma_\pm(v)
$$

と直接確認できます。

従って

$$
\boxed{\sigma_+,\sigma_-:\mathbb Q(\sqrt2)\to\mathbb C}
$$

は二つの $\mathbb Q$ を固定する体の埋め込みです。
<!-- definition-example-end -->

### 3.2 係数にも体の埋め込みを作用させる

$\sigma:K\to\Omega$ が体の埋め込みで、

$$
h(x)=a_0+a_1x+\cdots+a_nx^n\in K[x]
$$

なら

$$
\sigma(h)(x)
=
\sigma(a_0)+\sigma(a_1)x+\cdots+\sigma(a_n)x^n
$$

と定めます。

多項式の変数 $x$ は動かさず、係数だけを送ります。

---

## 4. 一つの根を別の根へ送る

<a id="lem-fld2-one-step-field-map"></a>
<!-- formal-statement-start -->
> **補題（一段の埋め込み延長）**
>
> $\sigma:K\to\Omega$ を体の埋め込みとし、$\alpha$ を $K$ 上代数的とする。
>
> $m_{\alpha,K}\in K[x]$ を $\alpha$ の **代数的元の最小多項式**とし、$\beta\in\Omega$ が
>
$$
\sigma(m_{\alpha,K})(\beta)=0
$$
>
> を満たすとする。
>
> このとき $\sigma$ を延長し、$\alpha$ を $\beta$ へ送る体の埋め込み
>
$$
\widetilde\sigma:K(\alpha)\to\Omega
$$
>
> がただ一つ存在する。
<!-- formal-statement-end -->

### 証明の見取り図

FLD1 で

$$
K(\alpha)\cong K[x]/(m_{\alpha,K})
$$

と表しました。したがって「$\alpha$ を $\beta$ へ送る」とは、多項式 $g(\alpha)$ を

$$
\sigma(g)(\beta)
$$

へ送ることです。

問題は $g(\alpha)$ の表し方が複数あっても像が同じになるか、すなわち well-defined 性です。差 $g-h$ が $\alpha$ で $0$ なら代数的元の最小多項式が $g-h$ を割り、その関係を $\sigma$ で送れば $\beta$ でも $0$ になります。

<!-- proof-start -->
### 証明

$K[\alpha]=K(\alpha)$ は [FLD1 の単純拡大の商多項式環表示](../FLD1/index.md#thm-fld1-simple-algebraic-quotient)から成り立ちます。

そこで

$$
\widetilde\sigma(g(\alpha))
=
\sigma(g)(\beta)
$$

と定めます。

まず well-defined 性を示します。

もし

$$
g(\alpha)=h(\alpha)
$$

なら

$$
(g-h)(\alpha)=0.
$$

[代数的元の最小多項式の存在・一意性と既約性](../FLD1/index.md#thm-fld1-minimal-polynomial)より

$$
m_{\alpha,K}\mid(g-h).
$$

従ってある $q\in K[x]$ が存在して

$$
g-h=q\,m_{\alpha,K}.
$$

係数へ $\sigma$ を作用させると

$$
\sigma(g)-\sigma(h)
=
\sigma(q)\sigma(m_{\alpha,K}).
$$

$\beta$ を代入し、仮定

$$
\sigma(m_{\alpha,K})(\beta)=0
$$

を使えば

$$
\sigma(g)(\beta)=\sigma(h)(\beta).
$$

よって定義は代表多項式によらず well-defined です。

係数ごとの加法・乗法保存から $\widetilde\sigma$ は体準同型であり、$a\in K$ について

$$
\widetilde\sigma(a)=\sigma(a),
$$

さらに

$$
\widetilde\sigma(\alpha)=\beta
$$

です。

体準同型で $1$ を $1$ へ送るので単射です。

最後に $K(\alpha)$ は $K$ と $\alpha$ で生成されます。従って $\sigma$ を延長し $\alpha$ を $\beta$ へ送る準同型があれば、全ての $g(\alpha)$ の像は強制的に $\sigma(g)(\beta)$ となるので一意です。

$\square$
<!-- proof-end -->

この補題は「代数的元の像は、その代数的元の最小多項式の根から自由に選べる。ただし選んだ根で写像全体が決まる」と読めます。

---

## 5. 拡大体全体と共通の根の世界

FLD1 では「一つの元が代数的である」ことを定義しました。ここからは拡大体全体について、その全ての元が代数的かをまとめて扱います。

<a id="def-fld2-algebraic-extension"></a>
<!-- formal-statement-start -->
> **定義（代数拡大）**
>
> 体拡大 $K/F$ の任意の元 $\alpha\in K$ が $F$ 上代数的であるとき、$K/F$ を **代数拡大**という。
<!-- formal-statement-end -->

[FLD1 の「有限拡大の元は代数的」](../FLD1/index.md#prop-fld1-finite-extension-algebraic)から、有限拡大は必ず代数拡大です。逆は一般には成り立ちません。

<!-- definition-example-start: def-fld2-algebraic-extension -->
**定義の確認**

### 5.1 定義の確認：$\mathbb Q(\sqrt2)/\mathbb Q$

任意の

$$
\alpha=a+b\sqrt2
\in\mathbb Q(\sqrt2)
$$

を取ります。

FLD1 で

$$
[\mathbb Q(\sqrt2):\mathbb Q]=2
$$

と確認しました。従ってこの拡大は有限拡大です。

有限拡大の任意の元は基礎体上代数的なので、全ての $\alpha\in\mathbb Q(\sqrt2)$ が $\mathbb Q$ 上代数的です。

よって

$$
\boxed{\mathbb Q(\sqrt2)/\mathbb Q\text{ は代数拡大}}
$$

です。
<!-- definition-example-end -->



写像を何段も延長するとき、次の根が必ず見つかる十分大きな体が欲しくなります。そこで、必要な非定数多項式の根を常に持つ体と、その最小限の拡大を次に定義します。

<a id="def-fld2-algebraic-closure"></a>
<!-- formal-statement-start -->
> **定義（代数閉体・代数閉包）**
>
> 体 $\Omega$ が **代数閉体**であるとは、$\Omega[x]$ の任意の非定数多項式が $\Omega$ に根を持つことをいう。
>
> 体 $F$ の拡大 $\overline F/F$ が **代数閉包**であるとは、
>
> 1. $\overline F$ が代数閉体であり、
> 2. $\overline F/F$ が代数拡大である
>
> ことをいう。
<!-- formal-statement-end -->

<!-- definition-example-start: def-fld2-algebraic-closure -->
**定義の確認**

### 5.2 定義の確認：代数閉体自身

$\Omega$ が代数閉体だとします。すると自明な拡大

$$
\Omega/\Omega
$$

では、任意の $\alpha\in\Omega$ が一次多項式

$$
x-\alpha
$$

の根なので全ての元が $\Omega$ 上代数的です。

さらに $\Omega$ は仮定から代数閉体です。従って

$$
\boxed{\Omega\text{ は }\Omega\text{ 自身の代数閉包}}
$$

です。
<!-- definition-example-end -->

> **意図的な黒箱**
>
> 任意の体 $F$ が代数閉包を持つこと自体は、本章では証明しません。その一般証明は集合論的な極大原理を用いるため、本章の範囲外とします。本章で有限個の多項式の根を作るだけなら、前節の分解体存在定理で十分です。ここでは体の写像を一つの共通の体へ入れて比較するためだけに代数閉包を固定します。

以後、必要に応じて一つの代数閉包 $\overline F$ を固定します。

<a id="thm-fld2-finite-field-map"></a>
<!-- formal-statement-start -->
> **定理（有限代数拡大上への埋め込み延長）**
>
> $F\subset K\subset L$ を体とし、$L/K$ を有限拡大とする。
>
> $\overline F$ を $F$ の代数閉包とし、
>
$$
\sigma:K\to\overline F
$$
>
> を基礎体 $F$ を固定する体の埋め込みとする。
>
> このとき $\sigma$ は基礎体 $F$ を固定する体の埋め込み
>
$$
\widetilde\sigma:L\to\overline F
$$
>
> へ延長できる。
<!-- formal-statement-end -->

### 証明の見取り図

有限拡大 $L/K$ は有限個の元

$$
L=K(\alpha_1,\dots,\alpha_r)
$$

で生成できます。

一つずつ $\alpha_j$ を加えます。現在の体の埋め込みで代数的元の最小多項式の係数を送ると、代数閉体 $\overline F$ ではその多項式に根があります。そこで [一段の埋め込み延長](#lem-fld2-one-step-field-map) を使います。

<!-- proof-start -->
### 証明

$L/K$ は有限次元なので、$K$-基底

$$
v_1,\dots,v_r
$$

を一つ取れば

$$
L=K(v_1,\dots,v_r)
$$

です。

実際、右辺は各 $v_j$ と $K$ を含む体なので、任意の

$$
a_1v_1+\cdots+a_rv_r,
\qquad
a_j\in K
$$

を含みます。基底の生成性からこれは $L$ 全体です。

そこで

$$
K_0=K,
\qquad
K_j=K(v_1,\dots,v_j)
$$

と置きます。

$\sigma_0=\sigma$ から始めます。

$\sigma_{j-1}:K_{j-1}\to\overline F$ が構成済みとします。$v_j$ は $L/K$ が有限であることから $K_{j-1}$ 上代数的です。その代数的元の最小多項式を

$$
m_j(x)\in K_{j-1}[x]
$$

とします。

$\overline F$ は代数閉体なので、非定数多項式

$$
\sigma_{j-1}(m_j)(x)
$$

はある根 $\beta_j\in\overline F$ を持ちます。

[一段の埋め込み延長](#lem-fld2-one-step-field-map)により $\sigma_{j-1}$ は

$$
\sigma_j:K_j\to\overline F
$$

へ延長できます。

これを $j=1,\dots,r$ まで繰り返すと

$$
\sigma_r:L\to\overline F
$$

が得られます。これが求める延長です。

$\square$
<!-- proof-end -->

---

## 6. 分解体は同型を除いて一意

「分解体の作り方」は根を加える順番に依存して見えます。しかし出来上がった体は、基礎体を固定する同型を除いて変わりません。

<a id="thm-fld2-splitting-field-uniqueness"></a>
<!-- formal-statement-start -->
> **定理（分解体の同型を除く一意性）**
>
> $F$ を体、$f\in F[x]$ を非定数多項式とする。
>
> $L/F$ と $M/F$ がともに $f$ の分解体なら、$F$ を各点で固定する体同型
>
$$
L\cong_F M
$$
>
> が存在する。
<!-- formal-statement-end -->

### 証明の見取り図

$L$ の根を一つずつ $M$ の対応する根へ送ります。

途中まで作った体の埋め込み

$$
\sigma:K\to M
$$

に対して、次の根 $\alpha$ の $K$ 上の代数的元の最小多項式は $f$ を割ります。係数を $\sigma$ で送った多項式も $f$ の因子になり、$M$ は $f$ を完全に分解するので、その多項式の根 $\beta$ が $M$ の中にあります。一段の延長補題で $\alpha\mapsto\beta$ とできます。

最後に像の中でも $f$ が完全に分解するため、$M$ の最小性から像は $M$ 全体です。

<!-- proof-start -->
### 証明

$L$ における $f$ の根を

$$
\alpha_1,\dots,\alpha_r
$$

とし、

$$
L=F(\alpha_1,\dots,\alpha_r)
$$

とします。

まず恒等写像

$$
\sigma_0:F\to M
$$

から始めます。

帰納的に

$$
K_j=F(\alpha_1,\dots,\alpha_j)
$$

上で基礎体 $F$ を固定する体の埋め込み

$$
\sigma_j:K_j\to M
$$

を作ります。

$\sigma_{j-1}$ が構成済みとします。$\alpha_j$ の $K_{j-1}$ 上の代数的元の最小多項式を $m_j$ とします。

$f(\alpha_j)=0$ なので、[代数的元の最小多項式の存在・一意性と既約性](../FLD1/index.md#thm-fld1-minimal-polynomial)から

$$
m_j\mid f
\qquad
\text{in }K_{j-1}[x].
$$

よって

$$
f=m_jq_j
$$

となる $q_j\in K_{j-1}[x]$ があります。

係数へ $\sigma_{j-1}$ を作用させます。$f$ の係数は $F$ にあり $\sigma_{j-1}$ は $F$ を固定するので

$$
f
=
\sigma_{j-1}(m_j)\sigma_{j-1}(q_j).
$$

$M$ では $f$ が一次式の積に分解しているので、その因子 $\sigma_{j-1}(m_j)$ も $M$ に根 $\beta_j$ を持ちます。

従って [一段の埋め込み延長](#lem-fld2-one-step-field-map)により

$$
\sigma_j:K_j\to M,
\qquad
\sigma_j(\alpha_j)=\beta_j
$$

へ延長できます。

これを全ての根について繰り返すと

$$
\sigma:L\to M
$$

という基礎体 $F$ を固定する体の埋め込みが得られます。

ここで $L$ では

$$
f(x)=a\prod_{j=1}^{n}(x-\gamma_j)
$$

と、重複度も込めて一次式の積に書けます。$\sigma$ を作用させると

$$
f(x)
=
a\prod_{j=1}^{n}(x-\sigma(\gamma_j)).
$$

従って $\sigma(L)$ の中ですでに $f$ は完全に分解します。

しかも $\sigma(L)$ は $F$ を含みます。$M$ は $f$ の根で生成される最小の体なので

$$
M\subset \sigma(L).
$$

一方 $\sigma(L)\subset M$ ですから

$$
\sigma(L)=M.
$$

よって $\sigma$ は全射でもあり、

$$
L\cong_F M.
$$

$\square$
<!-- proof-end -->

「一意」といっても、根をどの共役根へ送るかによって同型そのものは複数あり得ます。FLD4 では、その複数の同型が一つの群を作ることを調べます。

---

## 7. 重根を多項式から検出する

根が「全部ある」こととは別に、根が「重なっていない」ことを調べます。

<a id="def-fld2-formal-diff-multiplicity"></a>
<!-- formal-statement-start -->
> **定義（形式微分・根の重複度）**
>
> 体 $F$ と
>
$$
f(x)=a_0+a_1x+\cdots+a_nx^n\in F[x]
$$
>
> に対し、**形式微分**を
>
$$
f'(x)=a_1+2a_2x+\cdots+na_nx^{n-1}
$$
>
> と定める。
>
> 拡大体の元 $\alpha$ が $f$ の根で、ある整数 $m\ge1$ について
>
$$
(x-\alpha)^m\mid f,
\qquad
(x-\alpha)^{m+1}\nmid f
$$
>
> なら、$\alpha$ の **重複度**は $m$ であるという。
>
> $m=1$ の根を単根、$m\ge2$ の根を重根という。
<!-- formal-statement-end -->

<!-- definition-example-start: def-fld2-formal-diff-multiplicity -->
**定義の確認**

### 7.1 定義の確認

$$
f(x)=(x-1)^3(x+2)
$$

とします。

$(x-1)^3$ は $f$ を割りますが $(x-1)^4$ は割らないので、$1$ は重複度 $3$ の根です。

同様に $-2$ は重複度 $1$ の単根です。

展開すると

$$
f(x)=x^4-x^3-3x^2+5x-2
$$

なので形式微分は

$$
f'(x)=4x^3-3x^2-6x+5.
$$

解析学の極限を一切使わず、係数だけから定まっていることに注意してください。
<!-- definition-example-end -->

<a id="lem-fld2-formal-diff-product"></a>
<!-- formal-statement-start -->
> **補題（形式微分の積の微分則）**
>
> 任意の体 $F$ と $f,g\in F[x]$ に対し
>
$$
(fg)'=f'g+fg'
$$
>
> が成り立つ。
<!-- formal-statement-end -->

### 証明の見取り図

解析学の積の微分則を引用するのではなく、係数を比較します。$x^k$ の係数に微分で掛かる $k$ が

$$
k=i+j
$$

と分かれることが全てです。

<!-- proof-start -->
### 証明

$$
f=\sum_i a_ix^i,
\qquad
g=\sum_j b_jx^j
$$

とします。

積は

$$
fg=\sum_k\left(\sum_{i+j=k}a_ib_j\right)x^k
$$

なので

$$
(fg)'
=
\sum_{k\ge1}
k\left(\sum_{i+j=k}a_ib_j\right)x^{k-1}.
$$

一方

$$
f'g+fg'
=
\sum_{i,j}(i+j)a_ib_jx^{i+j-1}.
$$

$i+j=k$ ごとにまとめると

$$
f'g+fg'
=
\sum_{k\ge1}
k\left(\sum_{i+j=k}a_ib_j\right)x^{k-1}.
$$

従って

$$
(fg)'=f'g+fg'.
$$

$\square$
<!-- proof-end -->

<a id="thm-fld2-repeated-root-gcd"></a>
<!-- formal-statement-start -->
> **定理（重根の形式微分判定）**
>
> $F$ を体、$0\ne f\in F[x]$ とし、$\overline F$ を $F$ の代数閉包とする。
>
> $\alpha\in\overline F$ が $f$ の重根であることと
>
$$
f(\alpha)=f'(\alpha)=0
$$
>
> は同値である。
>
> 従って $f$ が重根を持たないことと
>
$$
\gcd(f,f')=1
$$
>
> は同値である。
<!-- formal-statement-end -->

### 証明の見取り図

$\alpha$ の重複度を $m$ として

$$
f=(x-\alpha)^mg,
\qquad
g(\alpha)\ne0
$$

と書きます。

積の微分則から

$$
f'
=
m(x-\alpha)^{m-1}g
+
(x-\alpha)^mg'
$$

です。$m=1$ なら $f'(\alpha)=g(\alpha)\ne0$、$m\ge2$ なら両項が $\alpha$ で $0$ になります。

最大公約元との同値は、「$f$ と $f'$ が共通根を持つ」ことを代数的元の最小多項式で $F[x]$ の共通因子へ戻します。

<!-- proof-start -->
### 証明

$\alpha$ を $f$ の根とします。重複度を $m\ge1$ とすれば

$$
f(x)=(x-\alpha)^mg(x),
\qquad
g(\alpha)\ne0
$$

と書けます。

積の微分則を使うと

$$
f'(x)
=
m(x-\alpha)^{m-1}g(x)
+
(x-\alpha)^mg'(x).
$$

$m=1$ なら

$$
f'(\alpha)=g(\alpha)\ne0.
$$

$m\ge2$ なら両項に少なくとも一つ $(x-\alpha)$ が残るので

$$
f'(\alpha)=0.
$$

従って

$$
\alpha\text{ が重根}
\iff
f(\alpha)=f'(\alpha)=0.
$$

次に最大公約元を考えます。

もし

$$
d=\gcd(f,f')
$$

が非定数なら、$\overline F$ は代数閉体なので $d$ はある根 $\alpha\in\overline F$ を持ちます。$d\mid f$ かつ $d\mid f'$ だから

$$
f(\alpha)=f'(\alpha)=0,
$$

従って $\alpha$ は重根です。

逆に $\alpha$ が重根なら

$$
f(\alpha)=f'(\alpha)=0.
$$

$\alpha$ の $F$ 上の代数的元の最小多項式を $m_\alpha$ とすると、[代数的元の最小多項式の存在・一意性と既約性](../FLD1/index.md#thm-fld1-minimal-polynomial)から

$$
m_\alpha\mid f,
\qquad
m_\alpha\mid f'.
$$

$m_\alpha$ は非定数なので $f$ と $f'$ は非定数共通因子を持ち、

$$
\gcd(f,f')\ne1.
$$

$\square$
<!-- proof-end -->

---

## 8. 共役根が重ならない条件

<a id="def-fld2-distinct-conjugates"></a>
<!-- formal-statement-start -->
> **定義（分離多項式・分離的な元・分離拡大）**
>
> 体 $F$ と非定数多項式 $f\in F[x]$ を考える。
>
> $f$ が分解体で重根を持たないとき、$f$ を **分離多項式**という。
>
> $F$ 上代数的な元 $\alpha$ の代数的元の最小多項式 $m_{\alpha,F}$ が分離多項式であるとき、$\alpha$ は $F$ 上 **分離的**であるという。
>
> 代数拡大 $K/F$ の全ての元が $F$ 上分離的であるとき、$K/F$ を **分離拡大**という。
<!-- formal-statement-end -->

分解体は同型を除いて一意なので、「ある分解体で重根がない」という性質は分解体の選び方に依存しません。

<!-- definition-example-start: def-fld2-distinct-conjugates -->
**定義の確認**

### 8.1 定義の確認：$x^2-2$

$\mathbb Q$ 上で

$$
x^2-2=(x-\sqrt2)(x+\sqrt2)
$$

です。

二根は

$$
\sqrt2\ne-\sqrt2
$$

なので重根を持ちません。従って $x^2-2$ は分離多項式です。

$\sqrt2$ の代数的元の最小多項式も $x^2-2$ なので

$$
\boxed{\sqrt2\text{ は }\mathbb Q\text{ 上分離的}}
$$

です。
<!-- definition-example-end -->

<a id="prop-fld2-irreducible-root-criterion"></a>
<!-- formal-statement-start -->
> **命題（既約多項式の分離性判定）**
>
> $F$ を体、$p\in F[x]$ を非定数既約多項式とする。
>
> このとき
>
$$
p\text{ が分離的}
\iff
p'\ne0.
$$
<!-- formal-statement-end -->

### 証明の見取り図

重根判定から、体拡大の分離性は

$$
\gcd(p,p')=1
$$

と同値です。

$p$ は既約なので、最大公約元は $1$ か $p$ のどちらかしかありません。$p'\ne0$ なら

$$
\deg p'<\deg p
$$

なので $p$ が $p'$ を割ることはできません。

<!-- proof-start -->
### 証明

[重根の形式微分判定](#thm-fld2-repeated-root-gcd)から

$$
p\text{ が分離的}
\iff
\gcd(p,p')=1.
$$

まず $p'\ne0$ とします。

$p$ は既約なので、$p$ と $p'$ の非単元共通因子が存在すれば、それは $p$ と同伴でなければなりません。従って $p\mid p'$ となります。

しかし

$$
\deg p'<\deg p
$$

なので、$p'\ne0$ のもとでは不可能です。

従って

$$
\gcd(p,p')=1,
$$

よって $p$ は分離的です。

逆に $p'=0$ なら

$$
\gcd(p,p')=\gcd(p,0)=p
$$

は非定数です。従って $p$ は重根を持ち、分離的ではありません。

$\square$
<!-- proof-end -->

<a id="cor-fld2-char-zero-algebraic"></a>
<!-- formal-statement-start -->
> **系（標数0の体上の代数拡大は分離的）**
>
> 体 $F$ が、全ての整数 $n\ge1$ に対して
>
$$
n\cdot1_F\ne0
$$
>
> を満たすとする。すなわち $F$ の標数が $0$ であるとする。
>
> このとき $F$ 上の任意の既約多項式は分離的である。
>
> 従って任意の代数拡大 $K/F$ は分離拡大である。
<!-- formal-statement-end -->

### 証明の見取り図

非定数多項式

$$
p(x)=a_nx^n+\cdots
$$

の形式微分の最高次項は

$$
na_nx^{n-1}.
$$

標数 $0$ では $n\ne0$ で、$a_n\ne0$ だから $na_n\ne0$ です。従って $p'\ne0$ です。

<!-- proof-start -->
### 証明

$p\in F[x]$ を非定数既約多項式とし、

$$
p(x)=a_nx^n+\cdots,
\qquad
a_n\ne0,
\quad
n\ge1
$$

とします。

形式微分は

$$
p'(x)=na_nx^{n-1}+\cdots.
$$

標数 $0$ の仮定から

$$
n\cdot1_F\ne0.
$$

体には零因子がないので

$$
na_n\ne0.
$$

従って

$$
p'\ne0.
$$

[既約多項式の分離性判定](#prop-fld2-irreducible-root-criterion)より $p$ は分離的です。

任意の $F$ 上代数的な元 $\alpha$ の代数的元の最小多項式は既約なので分離的です。従って任意の代数拡大 $K/F$ は分離拡大です。

$\square$
<!-- proof-end -->

### 8.2 正標数では何が壊れるか

素数 $p$ に対して

$$
p\cdot1_F=0
$$

となる体では、

$$
(x^p)'=px^{p-1}=0
$$

となり得ます。

つまり形式微分が多項式の次数を「見失う」ことがあります。これは単なる計算上の珍事ではなく、共役根が一つに重なる現象を生みます。具体例は次節の概念を導入した後で詳しく計算します。

---

## 9. 一つの共役根が入ったら全て入る条件

前節の条件が「根が重ならない」ことを表すのに対し、ここでは「共役な根を取りこぼさない」条件を定義します。

<a id="def-fld2-conjugate-root-closure"></a>
<!-- formal-statement-start -->
> **定義（正規拡大）**
>
> 代数拡大 $K/F$ が **正規拡大**であるとは、任意の既約多項式
>
$$
p\in F[x]
$$
>
> について、$p$ が $K$ に一つでも根を持つなら、$p$ が $K[x]$ で一次式の積に分解することをいう。
<!-- formal-statement-end -->

<!-- definition-example-start: def-fld2-conjugate-root-closure -->
**定義の確認**

### 9.1 定義の確認：$\mathbb Q(\sqrt2)/\mathbb Q$

$$
K=\mathbb Q(\sqrt2)
$$

とします。

$K$ の任意の元は

$$
\alpha=a+b\sqrt2,
\qquad
a,b\in\mathbb Q
$$

と書けます。

$\alpha\in\mathbb Q$ なら、その代数的元の最小多項式は一次式であり当然 $K$ 上で分解します。

$\alpha\notin\mathbb Q$ なら $b\ne0$ です。このとき

$$
\alpha^*=a-b\sqrt2\in K
$$

も $K$ に入ります。

二つを根とする多項式は

$$
(x-\alpha)(x-\alpha^*)
=
x^2-2ax+(a^2-2b^2)
\in\mathbb Q[x].
$$

$\alpha\notin\mathbb Q$ なので代数的元の最小多項式の次数は $2$ であり、上のモニック二次式が $m_{\alpha,\mathbb Q}$ です。従って代数的元の最小多項式は

$$
(x-\alpha)(x-\alpha^*)
$$

と $K$ 上で完全に分解します。

よって、$\mathbb Q$ 上既約な多項式が $K$ に一根を持てば、その代数的元の最小多項式の全ての根が $K$ に入ります。従って

$$
\boxed{\mathbb Q(\sqrt2)/\mathbb Q\text{ は正規拡大}}
$$

です。
<!-- definition-example-end -->

体拡大の正規性を分解体と結びつける前に、分解体への体の埋め込みが根の集合を保つことを確認します。

<a id="prop-fld2-splitting-field-map-stability"></a>
<!-- formal-statement-start -->
> **命題（分解体は基礎体固定埋め込みで保たれる）**
>
> $L/F$ を $f\in F[x]$ の分解体とし、$\overline F$ を $F$ の代数閉包で $L\subset\overline F$ とする。
>
> 任意の基礎体 $F$ を固定する体の埋め込み
>
$$
\sigma:L\to\overline F
$$
>
> に対して
>
$$
\sigma(L)=L
$$
>
> が成り立つ。
<!-- formal-statement-end -->

### 証明の見取り図

$L$ は $f$ の根で生成されています。$\sigma$ は $F$ を固定するので、$f$ の根 $\alpha$ に対し

$$
f(\sigma(\alpha))
=
\sigma(f(\alpha))
=
0.
$$

従って根は別の根へ移るだけです。よって $\sigma(L)\subset L$ です。

分解体は有限拡大なので、$F$-線形単射 $\sigma$ の像は $L$ と同じ有限次元を持ち、包含は等号になります。

<!-- proof-start -->
### 証明

$f$ の根を

$$
\alpha_1,\dots,\alpha_r
$$

とし、

$$
L=F(\alpha_1,\dots,\alpha_r)
$$

とします。

各 $j$ について

$$
f(\alpha_j)=0.
$$

$\sigma$ は $F$ の元を固定するので

$$
f(\sigma(\alpha_j))
=
\sigma(f(\alpha_j))
=
0.
$$

従って $\sigma(\alpha_j)$ も $f$ の根です。

しかし $L$ は $f$ の分解体なので、$f$ の全ての根は $L$ に入っています。従って

$$
\sigma(\alpha_j)\in L
$$

であり、

$$
\sigma(L)
=
F(\sigma(\alpha_1),\dots,\sigma(\alpha_r))
\subset L.
$$

[分解体の存在定理](#thm-fld2-splitting-field-existence)の構成から $L/F$ は有限拡大です。

$\sigma$ は $F$-線形単射なので

$$
[\sigma(L):F]=[L:F].
$$

有限次元 $F$-ベクトル空間として $\sigma(L)\subset L$ かつ次元が等しいため

$$
\sigma(L)=L.
$$

$\square$
<!-- proof-end -->

<a id="thm-fld2-finite-splitting-equivalence"></a>
<!-- formal-statement-start -->
> **定理（有限正規拡大と分解体）**
>
> 有限拡大 $K/F$ について、次は同値である。
>
> 1. $K/F$ は正規拡大である。
> 2. ある非定数多項式 $f\in F[x]$ が存在し、$K$ は $f$ の $F$ 上の分解体である。
<!-- formal-statement-end -->

### 証明の見取り図

正規 $\Rightarrow$ 分解体では、有限拡大の $F$-基底

$$
\alpha_1,\dots,\alpha_n
$$

を取り、それぞれの代数的元の最小多項式を全部掛けます。体拡大の正規性により各代数的元の最小多項式は $K$ で分解し、しかも基底元を全て含むので、その積の分解体は $K$ です。

分解体 $\Rightarrow$ 正規では、$K$ にある根 $\alpha$ の共役根 $\beta$ を代数閉包で一つ取ります。[一段の埋め込み延長](#lem-fld2-one-step-field-map)で $\alpha\mapsto\beta$ とし、それを $K$ 全体へ延長します。分解体への体の埋め込みの安定性から像は再び $K$ なので $\beta\in K$ です。

<!-- proof-start -->
### 証明

まず $K/F$ が有限正規拡大であるとします。

$K$ の $F$-基底を

$$
\alpha_1,\dots,\alpha_n
$$

とします。各 $\alpha_i$ は有限拡大の元なので [FLD1](../FLD1/index.md#prop-fld1-finite-extension-algebraic) により $F$ 上代数的です。

その代数的元の最小多項式を

$$
m_i(x)=m_{\alpha_i,F}(x)
$$

とし、

$$
f(x)=\prod_{i=1}^n m_i(x)\in F[x]
$$

と置きます。

各 $m_i$ は $F[x]$ で既約であり、根 $\alpha_i\in K$ を持ちます。体拡大の正規性から各 $m_i$ は $K[x]$ で一次式の積に分解します。従って $f$ も $K$ 上で完全に分解します。

一方、$f$ の分解体 $L$ を $K$ の中で取ると、各 $\alpha_i$ は $f$ の根なので

$$
F(\alpha_1,\dots,\alpha_n)\subset L.
$$

基底元から全ての $K$ の元を $F$-線形結合で作れるので

$$
K=F(\alpha_1,\dots,\alpha_n).
$$

従って

$$
K\subset L.
$$

しかし $L$ は $K$ の部分体として取ったので $L\subset K$ です。ゆえに $L=K$、すなわち $K$ は $f$ の分解体です。

逆に $K$ がある $f\in F[x]$ の分解体であるとします。

$p\in F[x]$ を既約多項式とし、$\alpha\in K$ が $p$ の根であるとします。$\overline F$ を $F$ の代数閉包で $K\subset\overline F$ とし、$\beta\in\overline F$ を $p$ の任意の根とします。

$p$ は既約で $p(\alpha)=0$ です。$p$ の先頭係数で割ってモニックに正規化した多項式が $m_{\alpha,F}$ です。単元倍は根を変えないので、以下では $p$ をモニックに取り直して

$$
p=m_{\alpha,F}
$$

としてよいです。恒等な体の埋め込み

$$
\operatorname{id}_F:F\to\overline F
$$

に対し、$\beta$ は $p$ の根なので [一段の埋め込み延長](#lem-fld2-one-step-field-map)から

$$
\tau:F(\alpha)\to\overline F,
\qquad
\tau(\alpha)=\beta
$$

という基礎体 $F$ を固定する体の埋め込みが存在します。

$K/F(\alpha)$ は有限拡大です。[有限代数拡大上への埋め込み延長](#thm-fld2-finite-field-map)により $\tau$ は

$$
\sigma:K\to\overline F
$$

へ延長できます。

[分解体は基礎体固定埋め込みで保たれる](#prop-fld2-splitting-field-map-stability)ので

$$
\sigma(K)=K.
$$

従って

$$
\beta=\sigma(\alpha)\in K.
$$

$\beta$ は $p$ の任意の根だったので、$p$ の全ての根が $K$ に入ります。よって $p$ は $K[x]$ で一次式の積に分解します。

従って $K/F$ は正規拡大です。

$\square$
<!-- proof-end -->

### 9.2 分離的だが正規でない例

$$
E=\mathbb Q(\sqrt[3]{2})
$$

を考えます。

$\mathbb Q$ は標数 $0$ なので $E/\mathbb Q$ は分離拡大です。

一方 $x^3-2$ は $\mathbb Q[x]$ で既約で、$E$ に実根 $\sqrt[3]{2}$ を持ちます。しかし $E\subset\mathbb R$ なので非実根

$$
\omega\sqrt[3]{2},
\qquad
\omega^2\sqrt[3]{2}
$$

を含みません。

従って

$$
\boxed{\mathbb Q(\sqrt[3]{2})/\mathbb Q\text{ は分離的だが正規でない}}.
$$

### 9.3 正規だが分離的でない例

素数 $p$ を取り、

$$
F=\mathbb F_p(t)
$$

を有理関数体とします。

$$
q(x)=x^p-t\in F[x]
$$

を考えます。

まず $\mathbb F_p[t]$ では $q$ は素元 $t$ に関する Eisenstein の条件を満たします。従って [RNG4 の Gauss の補題と Eisenstein の既約判定](../RNG4/index.md#thm-rng4-eisenstein)から、分数体 $F=\mathbb F_p(t)$ 上でも既約です。

しかし

$$
q'(x)=px^{p-1}=0
$$

です。[既約多項式の分離性判定](#prop-fld2-irreducible-root-criterion)から $q$ は分離的ではありません。

$\alpha$ を

$$
\alpha^p=t
$$

となる根として $K=F(\alpha)$ と置きます。

標数 $p$ では二項係数 $\binom pk$ が $1\le k\le p-1$ で $0$ になるので

$$
x^p-\alpha^p=(x-\alpha)^p.
$$

従って

$$
q(x)=x^p-t=(x-\alpha)^p
$$

と $K$ 上で分解します。しかも $K=F(\alpha)$ は根によって生成されるので $K$ は $q$ の分解体です。

[有限正規拡大と分解体](#thm-fld2-finite-splitting-equivalence)から $K/F$ は正規です。一方 $\alpha$ の代数的元の最小多項式 $q$ は分離的でないので $K/F$ は分離拡大ではありません。

従って

$$
\boxed{K/F\text{ は正規だが分離的でない}}.
$$

この例で失われたのは「形式微分が非零になり、重根を検出できる」という標数 $0$ 側の機構です。

---

## 10. 体拡大の正規性と体拡大の分離性は別の条件

ここまでを表にすると次のようになります。

| 拡大 | 分離的 | 正規 | 理由 |
|---|---:|---:|---|
| $\mathbb Q(\sqrt2)/\mathbb Q$ | はい | はい | 標数 $0$、$x^2-2$ の分解体 |
| $\mathbb Q(\sqrt[3]{2})/\mathbb Q$ | はい | いいえ | 標数 $0$ だが $x^3-2$ の非実根を欠く |
| $\mathbb F_p(t^{1/p})/\mathbb F_p(t)$ | いいえ | はい | $x^p-t=(x-t^{1/p})^p$ の分解体 |

FLD4 では、有限拡大について

$$
\boxed{\text{体拡大の正規性}+\text{体拡大の分離性}}
$$

が自己同型群と中間体をきれいに対応させる条件になることを学びます。

ここではまだ Galois 群を定義しません。先に二つの条件を別々に理解することが重要です。

---

## 11. どの仮定が何をしているか

### 11.1 分解体の存在では「有限次数」が根を有限回で集める

多項式の次数は有限です。一つ根を加えるたびに残りの因子の次数を $1$ 下げられるので、有限回で停止します。

### 11.2 体の埋め込みの延長では「代数閉」が次の根を保証する

一段の延長では、係数を送った代数的元の最小多項式

$$
\sigma(m_\alpha)
$$

の根が必要です。代数閉包を使う理由は、その根が必ず存在する共通の行き先を用意するためです。

### 11.3 体拡大の分離性では「形式微分が消えない」ことが重根を排除する

既約多項式 $p$ では

$$
p'\ne0
$$

なら次数が下がるため $p$ と $p'$ は共通非定数因子を持てません。

標数 $p>0$ では $x^p$ の微分が $0$ になり、この機構が壊れます。

### 11.4 体拡大の正規性では「共役根を一つ残らず入れる」

体拡大の正規性は重根の有無を要求しません。$x^p-t=(x-\alpha)^p$ のように同じ根が重なっていても、その多項式が拡大体で完全に分解していれば体拡大の正規性は成立し得ます。

---

## 12. 演習

### Level A

#### FLD2-A01 二次多項式の分解体
- Level: A

$\mathbb Q$ 上で

$$
f(x)=x^2-5
$$

を考える。

1. $f$ の分解体を求めよ。
2. 分解体の $\mathbb Q$ 上の次数を求めよ。
3. 「$\mathbb C$ は $f$ が分解する体だが分解体ではない」理由を説明せよ。

<!-- solution-start -->
##### 詳細解答

1. 根は

$$
\sqrt5,\qquad -\sqrt5
$$

です。

両方を含み、これらで生成される最小の体は

$$
L=\mathbb Q(\sqrt5)
$$

です。

実際

$$
x^2-5=(x-\sqrt5)(x+\sqrt5)
$$

と $L[x]$ で分解し、

$$
\mathbb Q(\sqrt5,-\sqrt5)=\mathbb Q(\sqrt5).
$$

従って

$$
\boxed{L=\mathbb Q(\sqrt5)}.
$$

2. $x^2-5$ は $\mathbb Q[x]$ で既約です。従って [単純代数拡大の次数公式](../FLD1/index.md#cor-fld1-simple-extension-degree)から

$$
\boxed{[L:\mathbb Q]=2}.
$$

3. $\mathbb C$ では $f$ はもちろん分解します。しかし分解体の定義には「根で生成される」ことも必要です。

根で生成される体は $\mathbb Q(\sqrt5)$ であり、

$$
\mathbb Q(\sqrt5)\ne\mathbb C.
$$

従って $\mathbb C$ は分解する体ではあっても、$f$ の $\mathbb Q$ 上の分解体ではありません。
<!-- solution-end -->

#### FLD2-A02 $\mathbb Q(\sqrt2)$ の二つの体の埋め込み
- Level: A

$\alpha=\sqrt2$ とし、

$$
K=\mathbb Q(\alpha).
$$

$\mathbb Q$ を固定する体の埋め込み

$$
\sigma:K\to\mathbb C
$$

を全て求めよ。

<!-- solution-start -->
##### 詳細解答

$\alpha$ の代数的元の最小多項式は

$$
m_{\alpha,\mathbb Q}(x)=x^2-2
$$

です。

$\mathbb Q$ を固定する体の埋め込みは $\mathbb Q$ を固定するので、$\alpha$ の像 $\sigma(\alpha)$ は

$$
0
=
\sigma(\alpha^2-2)
=
\sigma(\alpha)^2-2
$$

を満たします。

従って

$$
\sigma(\alpha)\in\{\sqrt2,-\sqrt2\}.
$$

逆に [一段の埋め込み延長](#lem-fld2-one-step-field-map)により、代数的元の最小多項式の各根を選ぶたびに一意な体の埋め込みが得られます。

従って二つだけあり、

$$
\boxed{
\sigma_+(a+b\alpha)=a+b\sqrt2,
\qquad
\sigma_-(a+b\alpha)=a-b\sqrt2
}.
$$
<!-- solution-end -->

#### FLD2-A03 最大公約元で重根を検出する
- Level: A

$\mathbb Q[x]$ で

$$
f(x)=x^4-2x^3+x^2
$$

とする。

1. $f'$ を求めよ。
2. $\gcd(f,f')$ をモニックに取れ。
3. 重根を全て求め、その重複度を答えよ。

<!-- solution-start -->
##### 詳細解答

まず

$$
f(x)=x^2(x-1)^2
$$

とも書けます。

1. 形式微分は

$$
f'(x)=4x^3-6x^2+2x.
$$

因数分解すると

$$
f'(x)
=
2x(2x^2-3x+1)
=
2x(2x-1)(x-1).
$$

2. $f=x^2(x-1)^2$ と比較すると、共通する非単元因子は $x$ と $x-1$ です。

モニック最大公約元は

$$
\boxed{\gcd(f,f')=x(x-1)}.
$$

3. [重根の形式微分判定](#thm-fld2-repeated-root-gcd)から、共通根

$$
0,\qquad 1
$$

が重根です。

元の因数分解

$$
f=x^2(x-1)^2
$$

を見ると、どちらも重複度 $2$ です。

従って

$$
\boxed{0,1\text{ はともに2重根}}.
$$
<!-- solution-end -->

#### FLD2-A04 $\mathbb F_3$ 上の分離多項式
- Level: A

$\mathbb F_3[x]$ で

$$
f(x)=x^3-x
$$

を考える。

1. $f'$ を求めよ。
2. $\gcd(f,f')$ を求め、$f$ が分離的であることを示せ。
3. 実際に $\mathbb F_3$ 上で一次式へ分解せよ。

<!-- solution-start -->
##### 詳細解答

1. 標数 $3$ なので

$$
f'(x)=3x^2-1=-1=2
$$

です。

従って

$$
\boxed{f'=2}.
$$

2. $2$ は $\mathbb F_3[x]$ の単元なので

$$
\gcd(f,f')=1.
$$

[重根の形式微分判定](#thm-fld2-repeated-root-gcd)から $f$ は重根を持たず、

$$
\boxed{f\text{ は分離的}}
$$

です。

3. $\mathbb F_3=\{0,1,2\}$ で

$$
f(0)=0,
\qquad
f(1)=0,
\qquad
f(2)=8-2=6=0.
$$

従って三つの異なる根を持ち、

$$
f(x)=x(x-1)(x-2)
$$

です。

$2=-1$ と書けば

$$
\boxed{x^3-x=x(x-1)(x+1)}.
$$
<!-- solution-end -->

### Level B

#### FLD2-B01 $x^4-2$ の分解体
- Level: B

$\alpha=\sqrt[4]{2}>0$ とする。

$\mathbb Q$ 上の

$$
f(x)=x^4-2
$$

について、

1. 全ての複素根を求めよ。
2. 分解体が $L=\mathbb Q(\alpha,i)$ であることを示せ。
3. $[L:\mathbb Q]$ を求めよ。
4. $L/\mathbb Q$ が正規かつ分離的であることを説明せよ。

<!-- solution-start -->
##### 詳細解答

1. $\alpha^4=2$ なので、四つの根は

$$
\alpha,\quad -\alpha,\quad i\alpha,\quad -i\alpha.
$$

2. $L=\mathbb Q(\alpha,i)$ は四根を全て含みます。

逆に四根を全て含む体は $\alpha$ と $i\alpha$ を含みます。$\alpha\ne0$ なので

$$
i=\frac{i\alpha}{\alpha}
$$

も含みます。

従って四根で生成される体はちょうど

$$
\boxed{L=\mathbb Q(\alpha,i)}.
$$

3. $x^4-2$ は素数 $2$ に関する [Eisenstein の既約判定](../RNG4/index.md#thm-rng4-eisenstein)により $\mathbb Q[x]$ で既約です。従って

$$
[\mathbb Q(\alpha):\mathbb Q]=4.
$$

$\alpha$ は実数なので

$$
\mathbb Q(\alpha)\subset\mathbb R.
$$

従って $i\notin\mathbb Q(\alpha)$ です。

$i$ は $x^2+1$ の根で、$\mathbb Q(\alpha)$ に根を持たない二次多項式なので $x^2+1$ は $\mathbb Q(\alpha)$ 上既約です。よって

$$
[L:\mathbb Q(\alpha)]=2.
$$

塔の公式から

$$
[L:\mathbb Q]
=
2\cdot4
=
\boxed8.
$$

4. $L$ は $x^4-2$ の分解体です。[有限正規拡大と分解体](#thm-fld2-finite-splitting-equivalence)より

$$
L/\mathbb Q
$$

は正規です。

また $\mathbb Q$ は標数 $0$ なので [標数 $0$ の体上の代数拡大は分離的](#cor-fld2-char-zero-algebraic)から $L/\mathbb Q$ は分離的です。

従って

$$
\boxed{L/\mathbb Q\text{ は正規かつ分離的}}.
$$
<!-- solution-end -->

#### FLD2-B02 正規だが分離的でない拡大
- Level: B

素数 $p$ と

$$
F=\mathbb F_p(t)
$$

を取り、

$$
q(x)=x^p-t\in F[x]
$$

とする。

1. $q$ が $F[x]$ で既約であることを、$\mathbb F_p[t]$ 上の [Eisenstein の既約判定](../RNG4/index.md#thm-rng4-eisenstein)から示せ。
2. $q'=0$ を示し、$q$ が分離的でないことを示せ。
3. $\alpha^p=t$ として $K=F(\alpha)$ と置くと、$K/F$ が正規であることを示せ。
4. どの証明機構が標数 $0$ の場合と違うか説明せよ。

<!-- solution-start -->
##### 詳細解答

1. $\mathbb F_p[t]$ は一変数多項式環なので一意分解整域です。

$q(x)=x^p-t$ を $x$ の多項式として見ます。素元 $t$ に対し、

- 最高次係数 $1$ は $t$ で割れない。
- 中間係数は全て $0$ なので $t$ で割れる。
- 定数項 $-t$ は $t$ で割れるが $t^2$ では割れない。

従って [Eisenstein の既約判定](../RNG4/index.md#thm-rng4-eisenstein)から $q$ は $\mathbb F_p[t][x]$ で既約です。

Gauss の補題による既約性の移送から、その分数体

$$
F=\mathbb F_p(t)
$$

上でも

$$
\boxed{q\text{ は既約}}
$$

です。

2. 標数 $p$ なので

$$
p\cdot1_F=0.
$$

従って

$$
q'(x)=px^{p-1}=0.
$$

$q$ は既約で $q'=0$ なので [既約多項式の分離性判定](#prop-fld2-irreducible-root-criterion)から

$$
\boxed{q\text{ は分離的でない}}.
$$

3. $\alpha^p=t$ とします。

標数 $p$ では

$$
(x-\alpha)^p=x^p-\alpha^p
$$

なので

$$
q(x)
=
x^p-t
=
x^p-\alpha^p
=
(x-\alpha)^p.
$$

従って $q$ は $K=F(\alpha)$ 上で完全に分解します。

しかも $K$ は根 $\alpha$ で生成されるので、$K$ は $q$ の分解体です。

[有限正規拡大と分解体](#thm-fld2-finite-splitting-equivalence)から

$$
\boxed{K/F\text{ は正規}}.
$$

4. 標数 $0$ では非定数既約多項式の形式微分は必ず非零でした。

ここでは

$$
(x^p)'=0
$$

となるため、代数的元の最小多項式の次数が正でも形式微分が完全に消えます。その結果

$$
q=(x-\alpha)^p
$$

と全ての共役根が同じ根へ重なります。

壊れた機構は

$$
\boxed{\text{非零形式微分 } \Rightarrow \gcd(q,q')=1}
$$

へ進む入口そのものです。
<!-- solution-end -->

#### FLD2-B03 $\mathbb Q(\sqrt[3]{2})$ の体の埋め込みと正規でないこと
- Level: B

$\alpha=\sqrt[3]{2}>0$、$\omega^2+\omega+1=0$、$\omega\ne1$ とする。

$$
E=\mathbb Q(\alpha)
$$

について、

1. $\mathbb Q$ を固定する体の埋め込み $E\to\mathbb C$ を全て求めよ。
2. それらが三つある理由を [一段の埋め込み延長](#lem-fld2-one-step-field-map) から説明せよ。
3. $E/\mathbb Q$ が分離的だが正規でないことを示せ。

<!-- solution-start -->
##### 詳細解答

1. $\alpha$ の代数的元の最小多項式は

$$
m_{\alpha,\mathbb Q}(x)=x^3-2.
$$

その三根は

$$
\alpha,\qquad \omega\alpha,\qquad \omega^2\alpha.
$$

従って候補は

$$
\sigma_k(\alpha)=\omega^k\alpha,
\qquad
k=0,1,2.
$$

$E=\mathbb Q(\alpha)$ なので、$\alpha$ の像を指定すれば体の埋め込み全体が一意に決まります。

従って

$$
\boxed{
\sigma_k(g(\alpha))=g(\omega^k\alpha),
\qquad
k=0,1,2
}
$$

が全ての $\mathbb Q$ を固定する体の埋め込みです。

2. [一段の埋め込み延長](#lem-fld2-one-step-field-map)において、基礎体の恒等な体の埋め込み

$$
\mathbb Q\to\mathbb C
$$

を考えます。

代数的元の最小多項式 $x^3-2$ の各根 $\alpha,\omega\alpha,\omega^2\alpha$ を $\alpha$ の像として選ぶたびに、一意な体の埋め込み

$$
\mathbb Q(\alpha)\to\mathbb C
$$

が得られます。

逆に体の埋め込みは代数的元の最小多項式の関係を保つため、$\alpha$ の像はこの三根以外に選べません。

従って体の埋め込みはちょうど三つです。

3. $\mathbb Q$ は標数 $0$ なので

$$
E/\mathbb Q
$$

は分離拡大です。

しかし $E\subset\mathbb R$ である一方、

$$
\omega\alpha,\qquad \omega^2\alpha
$$

は非実数です。

既約多項式 $x^3-2$ は $E$ に根 $\alpha$ を一つ持つのに、$E$ 上で完全には分解しません。

従って

$$
\boxed{E/\mathbb Q\text{ は分離的だが正規でない}}.
$$
<!-- solution-end -->

### Level C

#### FLD2-C01 $x^3-2$ の分解体を体の埋め込みまで追う
- Level: C

$\alpha=\sqrt[3]{2}>0$、$\omega^2+\omega+1=0$、$\omega\ne1$ とし、

$$
L=\mathbb Q(\alpha,\omega)
$$

とする。

1. $L$ が $x^3-2$ の分解体であることを示し、$[L:\mathbb Q]$ を求めよ。
2. $L/\mathbb Q$ が分離的かつ正規であることを示せ。
3. $\mathbb Q$ を固定する体の埋め込み $\sigma:L\to\mathbb C$ について、$\sigma(\alpha)$ と $\sigma(\omega)$ の可能性を全て挙げよ。
4. 実際に六つの組合せが体の埋め込みを与えることを説明せよ。
5. $E=\mathbb Q(\alpha)$ と比較し、「体拡大の分離性」と「体拡大の正規性」がそれぞれ何を保証しているか説明せよ。

<!-- solution-start -->
##### 詳細解答

1. $x^3-2$ の根は

$$
\alpha,\qquad
\omega\alpha,\qquad
\omega^2\alpha
$$

です。

$L=\mathbb Q(\alpha,\omega)$ は三根を全て含みます。

逆に三根を含む体は $\alpha$ と $\omega\alpha$ を含み、$\alpha\ne0$ なので

$$
\omega=\frac{\omega\alpha}{\alpha}
$$

も含みます。

従って三根で生成される体はちょうど $L$ であり、

$$
\boxed{L\text{ は }x^3-2\text{ の分解体}}
$$

です。

$x^3-2$ は $2$ に関する [Eisenstein の既約判定](../RNG4/index.md#thm-rng4-eisenstein)から $\mathbb Q[x]$ で既約です。従って

$$
[\mathbb Q(\alpha):\mathbb Q]=3.
$$

$\mathbb Q(\alpha)\subset\mathbb R$ ですが $\omega\notin\mathbb R$ なので

$$
\omega\notin\mathbb Q(\alpha).
$$

$\omega$ は二次多項式 $x^2+x+1$ の根なので

$$
[L:\mathbb Q(\alpha)]=2.
$$

塔の公式から

$$
\boxed{[L:\mathbb Q]=6}.
$$

2. $\mathbb Q$ は標数 $0$ なので [標数 $0$ の体上の代数拡大は分離的](#cor-fld2-char-zero-algebraic)から

$$
L/\mathbb Q
$$

は分離拡大です。

また $L$ は $x^3-2$ の分解体なので [有限正規拡大と分解体](#thm-fld2-finite-splitting-equivalence)から正規です。

従って

$$
\boxed{L/\mathbb Q\text{ は分離的かつ正規}}.
$$

3. $\alpha$ の代数的元の最小多項式は $x^3-2$ なので

$$
\sigma(\alpha)
\in
\{\alpha,\omega\alpha,\omega^2\alpha\}.
$$

$\omega$ の代数的元の最小多項式は $x^2+x+1$ なので

$$
\sigma(\omega)
\in
\{\omega,\omega^2\}.
$$

従って候補は

$$
3\cdot2=6
$$

組です。

4. まず $\alpha$ の像を三根のどれか一つに選びます。[一段の埋め込み延長](#lem-fld2-one-step-field-map)により

$$
\mathbb Q(\alpha)\to\mathbb C
$$

という体の埋め込みが得られます。

次に $\omega$ の代数的元の最小多項式は $x^2+x+1$ で、係数は全て $\mathbb Q$ にあるので、どの中間埋め込みの下でも係数は変わりません。その二根 $\omega,\omega^2$ のどちらを選んでも、再び [一段の埋め込み延長](#lem-fld2-one-step-field-map) により

$$
L=\mathbb Q(\alpha,\omega)\to\mathbb C
$$

へ延長できます。

従って六つの組合せ全てが実際に体の埋め込みを与えます。

また $L$ は分解体なので [分解体は基礎体固定埋め込みで保たれる](#prop-fld2-splitting-field-map-stability)から、どの埋め込みについても

$$
\sigma(L)=L.
$$

5. $E=\mathbb Q(\alpha)$ も標数 $0$ 上なので分離的です。従って代数的元の最小多項式 $x^3-2$ の三根は互いに異なり、$\alpha$ を送れる三つの体の埋め込みが存在します。

しかし $E$ は非実根を含まないので正規ではありません。実際、二つの体の埋め込みは $E$ を $E$ 自身の外へ送ります。

一方 $L$ は正規なので、全ての共役根を最初から含み、任意の $\mathbb Q$ を固定する体の埋め込みで $L$ 自身へ戻ります。

従って役割は

$$
\boxed{\text{体拡大の分離性：共役根が重ならない}},
\qquad
\boxed{\text{体拡大の正規性：共役根を全て拡大体の中に持つ}}.
$$

と整理できます。
<!-- solution-end -->

---

## 13. まとめ

本章の主線は次の通りです。

1. 一つの多項式の全ての根を最小限に集めた体が分解体である。
2. 分解体は、既約因子の根を一つずつ商環で添加することで必ず存在する。
3. 代数的元の像は、その代数的元の最小多項式の根を選ぶことで一意に延長できる。
4. 有限代数拡大上の体の埋め込みは代数閉包へ延長でき、これから分解体の同型を除く一意性が従う。
5. 重根は $f$ と形式微分 $f'$ の共通根として検出でき、$\gcd(f,f')=1$ が体拡大の分離性の判定になる。
6. 既約多項式では $p'\ne0$ と体拡大の分離性が同値で、標数 $0$ 上の代数拡大は全て分離的である。
7. 有限拡大が正規であることは、ある $F$ 係数多項式の分解体であることと同値である。
8. 体拡大の分離性と体拡大の正規性は別条件であり、FLD4 ではこの二つが同時に成り立つ有限拡大を自己同型群から調べる。

次の FLD3 では正標数側へ進み、有限体、Frobenius 写像、$x^{p^n}-x$、有限体の存在と一意性を扱います。
