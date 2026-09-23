# FLD1 抽象代数 XI：体拡大・代数的元・最小多項式

<!-- definition-example-audit: strict -->

[RNG4](../RNG4/index.md) では、体 $F$ 上の多項式環 $F[x]$ が Euclid 整域であり、既約多項式を判定できるところまで進みました。本章では、その多項式を「方程式」ではなく**新しい数を作る設計図**として読みます。

たとえば $\mathbb Q$ の中には $x^2-2=0$ の解はありません。しかし $\sqrt2$ を含む体へ移れば解を持ちます。そこで問いたいのは次の三点です。

1. 体を大きくするとは何か。
2. 新しく加えた元が満たす最小の多項式は何か。
3. その元を加えてできる体を $F[x]$ の商としてどう作るか。

本章の主線は

$$
\text{体拡大}
\longrightarrow
\text{拡大次数}
\longrightarrow
\text{代数的元}
\longrightarrow
\text{最小多項式}
\longrightarrow
F[x]/(m_\alpha)
$$

です。

> **この章の停止線**
>
> 本章では一つの代数的元を添加する単純拡大までを閉じます。多項式の全ての根を同時に入れる分解体、分離性、正規性は FLD2 で扱います。

---

## 1. 体を大きくする

<a id="def-fld1-field-extension"></a>
<!-- formal-statement-start -->
> **定義（体拡大・中間体・拡大次数）**
>
> $F$ と $K$ を体とし、$F$ が $K$ の部分体であるとする。このとき $K/F$ を **体拡大**という。
>
> $F\subset E\subset K$ を満たす部分体 $E$ を $K/F$ の **中間体**という。
>
> $K$ を $F$-ベクトル空間とみた次元を **拡大次数**といい、
>
$$
[K:F]=\dim_F K
$$
>
> と書く。$[K:F]<\infty$ のとき $K/F$ を **有限拡大**という。
<!-- formal-statement-end -->

体 $K$ の加法と乗法はそのまま使い、$F$ の元を「スカラー」として $K$ に掛けると、$K$ は $F$-ベクトル空間になります。したがって体拡大には、線形代数の次元が自然に入ります。

<!-- definition-example-start: def-fld1-field-extension -->
### 1.1 定義の確認：$\mathbb Q(\sqrt2)/\mathbb Q$

集合

$$
\mathbb Q(\sqrt2)
=
\{a+b\sqrt2:a,b\in\mathbb Q\}
$$

を考えます。

和・差・積で閉じています。さらに $a+b\sqrt2\ne0$ なら

$$
(a+b\sqrt2)^{-1}
=
\frac{a-b\sqrt2}{a^2-2b^2}.
$$

分母が $0$ なら $a^2=2b^2$ です。$b\ne0$ なら $(a/b)^2=2$ となり $\sqrt2\in\mathbb Q$ を意味して矛盾するので、非零元の逆元も同じ集合に入ります。従ってこれは $\mathbb Q$ を含む体です。

また

$$
1,\sqrt2
$$

は $\mathbb Q$ 上一次独立です。実際

$$
a+b\sqrt2=0
$$

で $b\ne0$ なら $\sqrt2=-a/b\in\mathbb Q$ となるので $b=0$、続いて $a=0$ です。

よって

$$
\boxed{[\mathbb Q(\sqrt2):\mathbb Q]=2}.
$$
<!-- definition-example-end -->

「新しい元を一つ加えた」ことと「次数が1増える」ことは同じではありません。$\sqrt2$ 一個を加えた結果でも、次元は $2$ です。後で一般に、最小多項式の次数がこの次元になることを示します。

---

## 2. 拡大を二段に分けると次数は掛け算になる

中間体を経由するとき、全体の次元は各段の次元の積になります。これは Galois 理論まで繰り返し使う基本公式です。

<a id="thm-fld1-tower-law"></a>
<!-- formal-statement-start -->
> **定理（拡大次数の塔の公式）**
>
> 体
>
$$
F\subset K\subset L
$$
>
> を考え、$[K:F]$ と $[L:K]$ が有限であるとする。このとき
>
$$
[L:F]=[L:K][K:F].
$$
<!-- formal-statement-end -->

### 証明の見取り図

$K/F$ の基底を $\beta_1,\dots,\beta_m$、$L/K$ の基底を $\gamma_1,\dots,\gamma_n$ とします。

候補は全ての積

$$
\beta_i\gamma_j.
$$

です。$L$ の元をまず $\gamma_j$ で展開し、その係数をさらに $\beta_i$ で展開すれば生成性が出ます。一次独立性は逆順に、まず $\gamma_j$ の独立性、次に $\beta_i$ の独立性を使います。

<!-- proof-start -->
### 証明

$$
\{\beta_1,\dots,\beta_m\}
$$

を $K$ の $F$-基底、

$$
\{\gamma_1,\dots,\gamma_n\}
$$

を $L$ の $K$-基底とします。

まず積の族

$$
\mathcal B=
\{\beta_i\gamma_j:1\le i\le m,\ 1\le j\le n\}
$$

が $L$ を $F$ 上生成することを示します。

任意の $z\in L$ は $\gamma_j$ が $K$-基底なので

$$
z=\sum_{j=1}^n c_j\gamma_j,
\qquad c_j\in K
$$

と書けます。

各 $c_j$ は $\beta_i$ が $F$-基底なので

$$
c_j=\sum_{i=1}^m a_{ij}\beta_i,
\qquad a_{ij}\in F.
$$

従って

$$
z
=
\sum_{j=1}^n\sum_{i=1}^m
a_{ij}\beta_i\gamma_j,
$$

よって $\mathcal B$ は $L$ を生成します。

次に一次独立性を示します。

$$
\sum_{j=1}^n\sum_{i=1}^m
a_{ij}\beta_i\gamma_j=0,
\qquad a_{ij}\in F
$$

とします。

$j$ ごとにまとめると

$$
\sum_{j=1}^n
\left(\sum_{i=1}^m a_{ij}\beta_i\right)\gamma_j
=0.
$$

括弧内は $K$ の元です。$\gamma_1,\dots,\gamma_n$ は $K$ 上一次独立だから、各 $j$ について

$$
\sum_{i=1}^m a_{ij}\beta_i=0.
$$

さらに $\beta_1,\dots,\beta_m$ は $F$ 上一次独立なので

$$
a_{ij}=0
$$

が全ての $i,j$ について成り立ちます。

従って $\mathcal B$ は $F$-基底で、その元の個数は $mn$ です。ゆえに

$$
[L:F]=mn=[L:K][K:F].
$$

$\square$
<!-- proof-end -->

この証明では「有限次元」が、基底を有限個並べて積の個数を数えるところに効いています。

### 2.1 具体例：$\mathbb Q\subset\mathbb Q(\sqrt2)\subset\mathbb Q(\sqrt2,\sqrt3)$

後半の拡大次数が $2$ であることを確認できれば

$$
[\mathbb Q(\sqrt2,\sqrt3):\mathbb Q]
=
2\cdot2
=
4
$$

です。

実際 $\sqrt3\notin\mathbb Q(\sqrt2)$ です。もし

$$
\sqrt3=a+b\sqrt2,
\qquad a,b\in\mathbb Q
$$

なら二乗して

$$
3=a^2+2b^2+2ab\sqrt2.
$$

$\sqrt2\notin\mathbb Q$ なので $2ab=0$。$a=0$ なら $3=2b^2$、$b=0$ なら $3=a^2$ となり、いずれも有理数 $a,b$ では不可能です。

従って $1,\sqrt3$ は $\mathbb Q(\sqrt2)$ 上一次独立で、後半の次数は $2$ です。

---

## 3. 多項式関係を持つ元と持たない元

<a id="def-fld1-algebraic-element"></a>
<!-- formal-statement-start -->
> **定義（代数的元・超越的元）**
>
> 体拡大 $K/F$ と $\alpha\in K$ を考える。
>
> ある非零多項式 $f(x)\in F[x]$ が存在して
>
$$
f(\alpha)=0
$$
>
> となるとき、$\alpha$ は $F$ 上 **代数的**であるという。
>
> そのような非零多項式が存在しないとき、$\alpha$ は $F$ 上 **超越的**であるという。
<!-- formal-statement-end -->

<!-- definition-example-start: def-fld1-algebraic-element -->
### 3.1 定義の確認：$\sqrt2$ と形式的不定元 $t$

$\sqrt2$ は

$$
x^2-2\in\mathbb Q[x]
$$

の根なので $\mathbb Q$ 上代数的です。

一方、$F(t)$ を不定元 $t$ の有理関数体とします。非零多項式

$$
f(x)=a_0+a_1x+\cdots+a_nx^n\in F[x]
$$

に $x=t$ を代入すると

$$
f(t)=a_0+a_1t+\cdots+a_nt^n.
$$

これは形式的な多項式として $0$ になるのは全係数が $0$ のときだけです。従って非零 $f$ では $f(t)\ne0$ であり、

$$
\boxed{t\text{ は }F\text{ 上超越的}}
$$

です。
<!-- definition-example-end -->

代数的かどうかは基礎体に依存します。たとえば $\sqrt2$ は $\mathbb Q$ 上代数的ですが、$\mathbb Q(\sqrt2)$ 上ではもちろん一次式 $x-\sqrt2$ の根です。

---

## 4. 有限拡大では全ての元が多項式関係を持つ

<a id="prop-fld1-finite-extension-algebraic"></a>
<!-- formal-statement-start -->
> **命題（有限拡大の元は代数的）**
>
> $K/F$ を有限拡大とする。このとき任意の $\alpha\in K$ は $F$ 上代数的である。
<!-- formal-statement-end -->

### 証明の見取り図

$n=[K:F]$ とします。$K$ は $F$ 上 $n$ 次元なので、$n+1$ 個のベクトル

$$
1,\alpha,\alpha^2,\dots,\alpha^n
$$

は一次従属です。その一次関係をそのまま多項式に読み替えます。

<!-- proof-start -->
### 証明

$n=[K:F]$ とします。

$K$ は $F$ 上 $n$ 次元なので

$$
1,\alpha,\alpha^2,\dots,\alpha^n
$$

という $n+1$ 個の元は一次従属です。

従って、全てが $0$ ではない $a_0,\dots,a_n\in F$ が存在して

$$
a_0+a_1\alpha+\cdots+a_n\alpha^n=0.
$$

そこで

$$
f(x)=a_0+a_1x+\cdots+a_nx^n
$$

と置けば $f\ne0$ かつ

$$
f(\alpha)=0.
$$

よって $\alpha$ は $F$ 上代数的です。$\square$
<!-- proof-end -->

逆は一般には「一つの元が代数的なら任意の拡大 $K/F$ が有限」とは言えません。しかし一つの代数的元だけで生成した $F(\alpha)$ は有限になります。その次数を決めるのが最小多項式です。

---

## 5. 最小多項式は評価準同型の核から出てくる

$\alpha\in K$ に対して

$$
\operatorname{ev}_\alpha:F[x]\to K,
\qquad
f(x)\mapsto f(\alpha)
$$

を考えます。これは環準同型です。

$\alpha$ が代数的なら、その核には非零多項式が入ります。

<a id="def-fld1-minimal-polynomial"></a>
<!-- formal-statement-start -->
> **定義（最小多項式）**
>
> 体拡大 $K/F$ と、$F$ 上代数的な元 $\alpha\in K$ を考える。
>
> $\alpha$ を根に持つ $F[x]$ のモニック多項式のうち次数が最小のものを、$\alpha$ の $F$ 上の **最小多項式**といい
>
$$
m_{\alpha,F}(x)
$$
>
> または基礎体が明らかなとき $m_\alpha(x)$ と書く。
<!-- formal-statement-end -->

<!-- definition-example-start: def-fld1-minimal-polynomial -->
### 5.1 定義の確認：$\sqrt2$ の最小多項式

$\sqrt2$ は $x^2-2$ の根です。

一次の有理係数多項式

$$
x-q,
\qquad q\in\mathbb Q
$$

が $\sqrt2$ を根に持つなら $\sqrt2=q\in\mathbb Q$ となり不可能です。

従って次数 $1$ の多項式関係はなく、

$$
\boxed{m_{\sqrt2,\mathbb Q}(x)=x^2-2}.
$$
<!-- definition-example-end -->

<a id="thm-fld1-minimal-polynomial"></a>
<!-- formal-statement-start -->
> **定理（最小多項式の存在・一意性と既約性）**
>
> 体拡大 $K/F$ と、$F$ 上代数的な元 $\alpha\in K$ を考える。
>
> このとき最小多項式 $m_\alpha\in F[x]$ は存在して一意であり、$F[x]$ で既約である。
>
> さらに任意の $f\in F[x]$ について
>
$$
f(\alpha)=0
\quad\Longleftrightarrow\quad
m_\alpha\mid f.
$$
<!-- formal-statement-end -->

### 証明の見取り図

評価準同型の核

$$
I_\alpha=\ker(\operatorname{ev}_\alpha)
$$

は $F[x]$ の非零イデアルです。[RNG4](../RNG4/index.md#cor-rng4-fx-euclidean) より $F[x]$ は Euclid 整域、従って PID なので

$$
I_\alpha=(m)
$$

と一つの多項式で生成できます。

生成元をモニックに正規化したものが最小多項式です。既約性は、もし $m=gh$ と非自明に分解できたなら

$$
0=m(\alpha)=g(\alpha)h(\alpha)
$$

から体 $K$ の零因子の不存在により $g(\alpha)=0$ または $h(\alpha)=0$ となり、$m$ より低次数の核の元ができてしまうことから従います。

<!-- proof-start -->
### 証明

$\alpha$ は代数的なので

$$
I_\alpha
=
\{f\in F[x]:f(\alpha)=0\}
$$

は零イデアルではありません。

$I_\alpha$ は評価準同型の核だからイデアルです。

[RNG4 の体上多項式環の Euclid 整域性](../RNG4/index.md#cor-rng4-fx-euclidean)より $F[x]$ は PID なので、ある非零 $m\in F[x]$ が存在して

$$
I_\alpha=(m).
$$

$m$ の先頭係数を $c\in F^\times$ とすると $c^{-1}m$ も同じイデアルを生成するため、生成元をモニックに取れます。以下そのモニック生成元を $m$ とします。

任意の $f$ が $\alpha$ を根に持つことは

$$
f\in I_\alpha=(m)
$$

と同値なので

$$
f(\alpha)=0
\quad\Longleftrightarrow\quad
m\mid f.
$$

特に $m$ 自身は $\alpha$ を根に持ちます。

次に $m$ が最小次数であることを示します。$0\ne f\in F[x]$ が $f(\alpha)=0$ を満たすなら $m\mid f$ なので

$$
\deg m\le\deg f.
$$

従って $m$ は定義された意味で最小次数です。

既約性を示します。もし

$$
m=gh
$$

と書け、$g,h$ がともに非単元だとします。このとき

$$
0=m(\alpha)=g(\alpha)h(\alpha).
$$

$K$ は体なので零因子を持たず、

$$
g(\alpha)=0
\quad\text{または}\quad
h(\alpha)=0.
$$

仮に $g(\alpha)=0$ なら $m\mid g$ です。しかし $g$ は $m$ の真の因子だから

$$
0<\deg g<\deg m,
$$

これは不可能です。$h(\alpha)=0$ の場合も同じ矛盾です。従って $m$ は既約です。

最後に一意性を示します。別のモニック最小多項式 $m'$ があれば

$$
m\mid m',
\qquad
m'\mid m.
$$

従って互いに単元倍です。両方ともモニックなので、その単元は $1$ であり

$$
m=m'.
$$

$\square$
<!-- proof-end -->

この定理で重要なのは、「最小」という次数の条件と「既約」という因数分解の条件が同じ対象に集約されることです。

---

## 6. 一つの元を加えた最小の体

<a id="def-fld1-simple-extension"></a>
<!-- formal-statement-start -->
> **定義（単純拡大）**
>
> 体拡大 $K/F$ と $\alpha\in K$ を考える。
>
> $F$ と $\alpha$ を含む $K$ の部分体のうち最小のものを
>
$$
F(\alpha)
$$
>
> と書き、$F$ の **単純拡大**という。
>
> また、$F$ と $\alpha$ から有限回の和・差・積で得られる部分環を
>
$$
F[\alpha]
=
\{f(\alpha):f\in F[x]\}
$$
>
> と書く。
<!-- formal-statement-end -->

<!-- definition-example-start: def-fld1-simple-extension -->
### 6.1 定義の確認：代数的な場合と超越的な場合

$\alpha=\sqrt2$ では

$$
\mathbb Q[\sqrt2]
=
\{a+b\sqrt2:a,b\in\mathbb Q\}
$$

で、1.1 で逆元も同じ形に入ることを確認しました。従って

$$
\mathbb Q[\sqrt2]
=
\mathbb Q(\sqrt2).
$$

一方、$t$ を不定元とすると

$$
F[t]
$$

には $t^{-1}$ がありませんが、$F(t)$ は体なので $t^{-1}\in F(t)$ です。従って

$$
F[t]\ne F(t).
$$

代数的な元ではこの差が消えることを次の定理で示します。
<!-- definition-example-end -->

<a id="thm-fld1-simple-algebraic-quotient"></a>
<!-- formal-statement-start -->
> **定理（単純代数拡大の商多項式環表示）**
>
> 体拡大 $K/F$ と、$F$ 上代数的な元 $\alpha\in K$ を考え、その最小多項式を $m_\alpha$ とする。
>
> このとき
>
$$
F[\alpha]=F(\alpha)
$$
>
> であり、$F$-代数として
>
$$
F(\alpha)
\cong
F[x]/(m_\alpha)
$$
>
> が成り立つ。
<!-- formal-statement-end -->

### 証明の見取り図

評価準同型

$$
\operatorname{ev}_\alpha:F[x]\to K
$$

の像は $F[\alpha]$、核は最小多項式定理から $(m_\alpha)$ です。

従って [環の第一同型定理](../RNG1/index.md#thm-rng1-first-isomorphism-ring) により

$$
F[x]/(m_\alpha)
\cong
F[\alpha].
$$

残る仕事は左辺が体であることです。非零剰余類 $[g]$ に対し、$m_\alpha$ が既約なので $m_\alpha\nmid g$。Euclid 整域 $F[x]$ では $\gcd(g,m_\alpha)=1$ となり、Bézout 等式から逆元を作れます。

<!-- proof-start -->
### 証明

評価準同型

$$
\operatorname{ev}_\alpha:F[x]\to K,
\qquad
f\mapsto f(\alpha)
$$

を考えます。

像は定義から

$$
\operatorname{Im}(\operatorname{ev}_\alpha)=F[\alpha].
$$

また最小多項式定理により

$$
\ker(\operatorname{ev}_\alpha)=(m_\alpha).
$$

従って [環の第一同型定理](../RNG1/index.md#thm-rng1-first-isomorphism-ring) から

$$
F[x]/(m_\alpha)
\cong
F[\alpha].
$$

次に $F[x]/(m_\alpha)$ が体であることを示します。

非零剰余類

$$
[g]\in F[x]/(m_\alpha)
$$

を取ります。$[g]\ne0$ なので $m_\alpha\nmid g$ です。

$m_\alpha$ は既約です。$F[x]$ は PID なので、$g$ と $m_\alpha$ の最大公約元は単元です。モニックに正規化すれば $1$ と取れます。

従って Bézout 等式により、ある $a,b\in F[x]$ が存在して

$$
a(x)g(x)+b(x)m_\alpha(x)=1.
$$

商環で $(m_\alpha)$ を $0$ とみなすと

$$
[a][g]=[1].
$$

よって任意の非零剰余類 $[g]$ は逆元 $[a]$ を持ち、$F[x]/(m_\alpha)$ は体です。

従ってそれと同型な $F[\alpha]$ も体です。$F[\alpha]$ は $F$ と $\alpha$ を含むので、$F(\alpha)$ の最小性から

$$
F(\alpha)\subset F[\alpha].
$$

逆に $F(\alpha)$ は $F$ と $\alpha$ を含む体だから、有限回の和・差・積で作る $F[\alpha]$ を含み、

$$
F[\alpha]\subset F(\alpha).
$$

従って

$$
F[\alpha]=F(\alpha).
$$

以上より

$$
F(\alpha)\cong F[x]/(m_\alpha).
$$

$\square$
<!-- proof-end -->

<a id="cor-fld1-simple-extension-degree"></a>
<!-- formal-statement-start -->
> **系（単純代数拡大の次数公式）**
>
> $\alpha$ を $F$ 上代数的とし
>
$$
d=\deg m_\alpha
$$
>
> とする。このとき
>
$$
1,\alpha,\dots,\alpha^{d-1}
$$
>
> は $F(\alpha)$ の $F$-基底であり、
>
$$
[F(\alpha):F]=d.
$$
<!-- formal-statement-end -->

### 証明の見取り図

商環 $F[x]/(m_\alpha)$ では、多項式除法により任意の剰余類が次数 $<d$ の多項式で一意に表されます。それを $\alpha$ に移せば基底になります。

<!-- proof-start -->
### 証明

任意の $f\in F[x]$ に対し、[RNG4 の多項式除法](../RNG4/index.md#thm-rng4-division-algorithm)により

$$
f=q\,m_\alpha+r,
\qquad
\deg r<d
$$

と一意に書けます。

従って $F[x]/(m_\alpha)$ の任意の剰余類は

$$
a_0+a_1[x]+\cdots+a_{d-1}[x]^{d-1}
$$

と書けます。

また

$$
a_0+a_1[x]+\cdots+a_{d-1}[x]^{d-1}=0
$$

なら次数 $<d$ の多項式

$$
r(x)=a_0+a_1x+\cdots+a_{d-1}x^{d-1}
$$

が $(m_\alpha)$ に属します。$m_\alpha\mid r$ ですが $\deg r<\deg m_\alpha$ なので $r=0$、従って全ての $a_i=0$ です。

よって

$$
1,[x],\dots,[x]^{d-1}
$$

は商環の $F$-基底です。

定理の同型で $[x]$ は $\alpha$ に移るので

$$
1,\alpha,\dots,\alpha^{d-1}
$$

が $F(\alpha)$ の基底となり、

$$
[F(\alpha):F]=d.
$$

$\square$
<!-- proof-end -->

### 6.2 具体例：$\mathbb Q(\sqrt[3]{2})$

[RNG4 の Eisenstein の既約判定](../RNG4/index.md#thm-rng4-eisenstein)を $p=2$ に使うと

$$
x^3-2
$$

は $\mathbb Q[x]$ で既約です。

従って $\alpha=\sqrt[3]{2}$ の最小多項式は $x^3-2$ で、

$$
[\mathbb Q(\sqrt[3]{2}):\mathbb Q]=3.
$$

さらに任意の元は一意に

$$
a+b\alpha+c\alpha^2,
\qquad a,b,c\in\mathbb Q
$$

と書けます。

---

## 7. 既約多項式から「その根を持つ体」を作る

ここまでの議論は、すでにどこかの体 $K$ に根 $\alpha$ があるとして進めました。しかし実際には、根を先に持っていなくても商環から作れます。

<a id="prop-fld1-irreducible-quotient-construction"></a>
<!-- formal-statement-start -->
> **命題（既約多項式による単純拡大の構成）**
>
> $F$ を体、$p(x)\in F[x]$ を次数 $d\ge1$ のモニック既約多項式とする。
>
> このとき
>
$$
E=F[x]/(p)
$$
>
> は体である。
>
> $\alpha=[x]\in E$ と置くと
>
$$
p(\alpha)=0,
\qquad
m_{\alpha,F}=p,
\qquad
[E:F]=d.
$$
<!-- formal-statement-end -->

### 証明の見取り図

体であることは前節と同じ Bézout 逆元構成です。重要なのは

$$
\alpha=[x]
$$

と置けば、商では $p(x)$ 自体が $0$ になるため

$$
p(\alpha)=[p(x)]=0
$$

となることです。

<!-- proof-start -->
### 証明

まず $E=F[x]/(p)$ が体であることを示します。

非零剰余類 $[g]$ を取ると $p\nmid g$ です。$p$ は既約で $F[x]$ は PID だから

$$
\gcd(g,p)=1.
$$

従ってある $a,b\in F[x]$ が存在して

$$
ag+bp=1.
$$

剰余類を取れば

$$
[a][g]=[1],
$$

よって $[g]$ は逆元を持ちます。従って $E$ は体です。

次に $\alpha=[x]$ と置きます。すると

$$
p(\alpha)
=
p([x])
=
[p(x)]
=
[0].
$$

従って $\alpha$ は $F$ 上代数的です。

$\alpha$ の最小多項式 $m_\alpha$ は $p(\alpha)=0$ から

$$
m_\alpha\mid p.
$$

$m_\alpha$ は非定数で、$p$ は既約なので、モニック性から

$$
m_\alpha=p.
$$

最後に単純代数拡大の次数公式から

$$
[E:F]
=
\deg m_\alpha
=
\deg p
=
d.
$$

$\square$
<!-- proof-end -->

### 7.1 例：$\mathbb F_3$ から 9 元の体を作る

$\mathbb F_3$ 上で

$$
p(x)=x^2+1
$$

を考えます。

$$
p(0)=1,\qquad
p(1)=2,\qquad
p(2)=2
$$

なので根を持ちません。2次多項式だから [RNG4 の2次・3次既約判定](../RNG4/index.md#prop-rng4-degree23-root) により既約です。

従って

$$
E=\mathbb F_3[x]/(x^2+1)
$$

は体です。

$\alpha=[x]$ と置くと

$$
\alpha^2=-1=2
$$

で、全ての元は一意に

$$
a+b\alpha,
\qquad
a,b\in\mathbb F_3
$$

と書けます。組 $(a,b)$ は $3^2=9$ 通りなので $E$ は 9 元を持ちます。

ここでは「未知の根 $\alpha$ を探した」のではなく、

$$
\boxed{\alpha=[x]\text{ として根を商環の中に作った}}
$$

ことが本質です。

---

## 8. どの仮定が何をしているか

### 8.1 体であることは逆元と線形代数の両方に効く

拡大次数は $K$ を $F$-ベクトル空間として見て定義しました。従ってスカラー側 $F$ が体であることが必要です。

さらに最小多項式の既約性では

$$
g(\alpha)h(\alpha)=0
$$

から一方が $0$ と結論するため、拡大先 $K$ が零因子を持たないことを使っています。

### 8.2 $F[x]$ が Euclid 整域であることは二つの役割を持つ

一つ目は評価準同型の核が一つの多項式で生成されることです。

二つ目は、既約多項式 $m_\alpha$ と $g$ が互いに素なら Bézout 等式

$$
ag+bm_\alpha=1
$$

を作り、商環の非零元に逆元を与えることです。

### 8.3 有限拡大なら代数的だが、超越的な単純拡大は無限次数

$t$ が $F$ 上超越的なら

$$
1,t,t^2,\dots
$$

は $F$ 上一次独立です。

もし有限個の一次関係があれば、それが非零多項式 $f$ に対する $f(t)=0$ を与えて超越性に反するからです。

従って

$$
[F(t):F]=\infty.
$$

「有限拡大なら代数的」の反対向きが、単純拡大では明確に見えます。

---

## 9. 演習

### Level A

#### FLD1-A01 二次拡大の次数
- Level: A

$K=\mathbb Q(\sqrt5)$ とする。

1. $1,\sqrt5$ が $\mathbb Q$ 上一次独立であることを示せ。
2. $K$ の任意の元が $a+b\sqrt5$ と書けることを用いて $[K:\mathbb Q]$ を求めよ。
3. $\sqrt5$ の $\mathbb Q$ 上の最小多項式を求めよ。

<!-- solution-start -->
##### 詳細解答

1. 有理数 $a,b$ が

$$
a+b\sqrt5=0
$$

を満たすとします。

もし $b\ne0$ なら

$$
\sqrt5=-\frac ab\in\mathbb Q
$$

となります。しかし $\sqrt5$ は有理数ではありません。従って $b=0$、さらに $a=0$ です。

よって $1,\sqrt5$ は一次独立です。

2. $K$ の元は定義から $a+b\sqrt5$ の形で表されるので、$1,\sqrt5$ は $K$ を生成します。1 で一次独立も示したため基底です。

従って

$$
\boxed{[K:\mathbb Q]=2}.
$$

3. $\sqrt5$ は

$$
x^2-5
$$

の根です。

一次多項式が $\sqrt5$ を根に持てば $\sqrt5\in\mathbb Q$ となるので不可能です。従って最小次数は $2$ で、

$$
\boxed{m_{\sqrt5,\mathbb Q}(x)=x^2-5}.
$$
<!-- solution-end -->

#### FLD1-A02 $i$ の最小多項式
- Level: A

$\mathbb C/\mathbb R$ を考え、$i^2=-1$ とする。

1. $i$ の $\mathbb R$ 上の最小多項式を求めよ。
2. $[\mathbb R(i):\mathbb R]$ を求めよ。
3. $\mathbb R(i)=\mathbb C$ を説明せよ。

<!-- solution-start -->
##### 詳細解答

1. $i$ は

$$
x^2+1
$$

の根です。

実係数一次多項式 $x-a$ が $i$ を根に持つなら $i=a\in\mathbb R$ となり不可能です。従って

$$
\boxed{m_{i,\mathbb R}(x)=x^2+1}.
$$

2. 単純代数拡大の次数公式より

$$
[\mathbb R(i):\mathbb R]
=
\deg(x^2+1)
=
\boxed2.
$$

3. $\mathbb R(i)$ の任意の元は

$$
a+bi,
\qquad a,b\in\mathbb R
$$

と書けます。これは複素数全体の標準表示そのものです。

従って

$$
\boxed{\mathbb R(i)=\mathbb C}.
$$
<!-- solution-end -->

#### FLD1-A03 9 元体で逆元を求める
- Level: A

$$
E=\mathbb F_3[x]/(x^2+1),
\qquad
\alpha=[x]
$$

とする。

1. $\alpha^2$ を $\mathbb F_3$ の元として表せ。
2. $1+\alpha$ の逆元を $a+b\alpha$ の形で求めよ。

<!-- solution-start -->
##### 詳細解答

1. 商環では

$$
x^2+1=0
$$

なので

$$
\alpha^2=-1.
$$

$\mathbb F_3$ では $-1=2$ だから

$$
\boxed{\alpha^2=2}.
$$

2. 逆元を $a+b\alpha$ と置き、

$$
(1+\alpha)(a+b\alpha)=1
$$

を要求します。

左辺は

$$
a+b\alpha+a\alpha+b\alpha^2.
$$

$\alpha^2=2$ を使うと

$$
(a+2b)+(a+b)\alpha.
$$

従って

$$
a+2b=1,
\qquad
a+b=0
$$

を $\mathbb F_3$ で解けばよいです。

第二式から $a=-b$。第一式へ代入して

$$
-b+2b=b=1.
$$

よって $b=1$、$a=-1=2$ です。

従って

$$
\boxed{(1+\alpha)^{-1}=2+\alpha}.
$$

確認すると

$$
(1+\alpha)(2+\alpha)
=
2+3\alpha+\alpha^2
=
2+0+2
=
4
=
1
\quad(\bmod 3).
$$
<!-- solution-end -->

#### FLD1-A04 塔の公式を使う
- Level: A

$$
L=\mathbb Q(\sqrt2,\sqrt3),
\qquad
K=\mathbb Q(\sqrt2)
$$

とする。

本文の議論を用いて

$$
[K:\mathbb Q]=2,
\qquad
[L:K]=2
$$

を確認し、$[L:\mathbb Q]$ を求めよ。

<!-- solution-start -->
##### 詳細解答

$\sqrt2$ の最小多項式は $x^2-2$ なので

$$
[K:\mathbb Q]=2.
$$

次に $\sqrt3\notin K$ を確認します。

もし

$$
\sqrt3=a+b\sqrt2
$$

と書けるなら、二乗して

$$
3=a^2+2b^2+2ab\sqrt2.
$$

左辺は有理数です。$1,\sqrt2$ は $\mathbb Q$ 上一次独立なので

$$
2ab=0.
$$

$a=0$ なら $3=2b^2$、$b=0$ なら $3=a^2$ ですが、いずれも有理数 $a,b$ では不可能です。

従って $\sqrt3\notin K$ です。$\sqrt3$ は $K$ 上で $x^2-3$ の根なので、その最小多項式は次数 $2$ です。

よって

$$
[L:K]=2.
$$

塔の公式から

$$
[L:\mathbb Q]
=
[L:K][K:\mathbb Q]
=
2\cdot2
=
\boxed4.
$$
<!-- solution-end -->

### Level B

#### FLD1-B01 最小多項式は全ての消去多項式を割る
- Level: B

$\alpha$ を $F$ 上代数的とし、その最小多項式を $m_\alpha$ とする。

多項式除法だけを使って

$$
f(\alpha)=0
\quad\Longrightarrow\quad
m_\alpha\mid f
$$

を示せ。

<!-- solution-start -->
##### 詳細解答

$F[x]$ で $f$ を $m_\alpha$ で割ります。

多項式除法により一意に

$$
f=q\,m_\alpha+r,
\qquad
r=0\ \text{または}\ \deg r<\deg m_\alpha
$$

と書けます。

$\alpha$ を代入すると

$$
f(\alpha)
=
q(\alpha)m_\alpha(\alpha)+r(\alpha).
$$

仮定から $f(\alpha)=0$、最小多項式の定義から $m_\alpha(\alpha)=0$ なので

$$
r(\alpha)=0.
$$

もし $r\ne0$ なら、$r$ は $\alpha$ を根に持つ非零多項式で

$$
\deg r<\deg m_\alpha
$$

となり、$m_\alpha$ の最小性に反します。

従って

$$
r=0.
$$

よって

$$
f=q\,m_\alpha,
$$

すなわち

$$
\boxed{m_\alpha\mid f}.
$$

この証明は、評価準同型の核を使う本文の証明と同じ内容を、多項式除法から直接再構成したものです。
<!-- solution-end -->

#### FLD1-B02 $\mathbb Q(\sqrt2)$ で逆元を多項式として作る
- Level: B

$\alpha=\sqrt2$ とする。

1. $m_\alpha=x^2-2$ を用い、$1+\alpha$ の逆元を $a+b\alpha$ の形で求めよ。
2. $F[x]/(m_\alpha)$ で Bézout 等式が逆元を作る仕組みと対応付けよ。

<!-- solution-start -->
##### 詳細解答

1. 逆元を $a+b\alpha$ と置きます。

$$
(1+\alpha)(a+b\alpha)
=
a+2b+(a+b)\alpha
$$

です。

これが $1$ に等しいためには

$$
a+2b=1,
\qquad
a+b=0
$$

が必要です。

第二式から $a=-b$。第一式へ代入すると

$$
-b+2b=b=1.
$$

従って $b=1$, $a=-1$ です。

よって

$$
\boxed{(1+\sqrt2)^{-1}=\sqrt2-1}.
$$

2. 多項式で書けば

$$
(x+1)(x-1)=x^2-1.
$$

ここで

$$
x^2-1=(x^2-2)+1
$$

なので

$$
(x+1)(x-1)-(x^2-2)=1.
$$

これは

$$
a(x)(x+1)+b(x)m_\alpha(x)=1
$$

という Bézout 等式で、

$$
a(x)=x-1,
\qquad
b(x)=-1
$$

に対応します。

商環 $F[x]/(m_\alpha)$ では $m_\alpha=0$ なので

$$
[x-1][x+1]=[1].
$$

$[x]$ を $\alpha$ に移せば

$$
(\alpha-1)(\alpha+1)=1.
$$

従って本文の「商環で逆元を作る」議論と一致します。
<!-- solution-end -->

#### FLD1-B03 超越元の単純拡大は無限次数
- Level: B

$t$ を $F$ 上超越的とする。

1. $1,t,t^2,\dots$ が $F$ 上一次独立であることを示せ。
2. $[F(t):F]=\infty$ を結論せよ。
3. この事実が「有限拡大なら代数的」の命題とどう整合するか説明せよ。

<!-- solution-start -->
##### 詳細解答

1. 有限個の一次関係

$$
a_0+a_1t+\cdots+a_nt^n=0,
\qquad a_i\in F
$$

があると仮定します。

多項式

$$
f(x)=a_0+a_1x+\cdots+a_nx^n
$$

を考えると

$$
f(t)=0.
$$

$t$ は超越的なので、$t$ を根に持つ $F[x]$ の非零多項式は存在しません。

従って $f$ は零多項式であり

$$
a_0=\cdots=a_n=0.
$$

よって任意の有限部分族が一次独立なので

$$
1,t,t^2,\dots
$$

は一次独立です。

2. $F(t)$ は $F[t]$ を含み、従って上の無限個の一次独立な元を含みます。

有限次元ベクトル空間には無限個の一次独立な元は存在しないので

$$
\boxed{[F(t):F]=\infty}.
$$

3. 本文では「有限拡大なら、その全ての元は代数的」と示しました。

$t$ は超越的なので、その対偶からも $t$ を含む拡大 $F(t)/F$ は有限拡大ではあり得ません。

従って今回の結論はその命題と正確に整合しています。
<!-- solution-end -->

### Level C

#### FLD1-C01 三次拡大を商環から構成し、中間体を制約する
- Level: C

$$
p(x)=x^3-2\in\mathbb Q[x]
$$

とし、

$$
K=\mathbb Q[x]/(p),
\qquad
\alpha=[x]\in K
$$

とする。

1. $p$ が $\mathbb Q[x]$ で既約であることを示し、$K$ が体であることを結論せよ。
2. $\alpha$ の最小多項式と $[K:\mathbb Q]$ を求めよ。
3. $K$ の任意の元の標準形を書け。
4. $\alpha-1$ の逆元を求めよ。
5. $\mathbb Q\subset E\subset K$ を中間体とする。塔の公式を用い、$E$ が $\mathbb Q$ または $K$ のどちらかに限ることを示せ。

<!-- solution-start -->
##### 詳細解答

### 1. 既約性と体の構成

$p(x)=x^3-2$ に Eisenstein の既約判定を素数 $2$ で適用します。

先頭係数 $1$ は $2$ で割れず、他の係数

$$
0,\ 0,\ -2
$$

は全て $2$ で割れます。

さらに定数項 $-2$ は $4$ では割れません。

従って $p$ は $\mathbb Z[x]$ で原始かつ Eisenstein 条件を満たし、Gauss の補題により

$$
p(x)=x^3-2
$$

は $\mathbb Q[x]$ で既約です。

本文の「既約多項式による単純拡大の構成」から

$$
\boxed{K=\mathbb Q[x]/(x^3-2)\text{ は体}}
$$

です。

### 2. 最小多項式と次数

$\alpha=[x]$ だから商環では

$$
\alpha^3-2=0.
$$

従って $p(\alpha)=0$ です。

$p$ はモニック既約なので、$\alpha$ の最小多項式は

$$
\boxed{m_{\alpha,\mathbb Q}(x)=x^3-2}.
$$

単純代数拡大の次数公式から

$$
[K:\mathbb Q]
=
\deg m_\alpha
=
\boxed3.
$$

### 3. 元の標準形

$p$ の次数は $3$ なので、多項式除法により任意の剰余類は次数 $<3$ の代表を一意に持ちます。

従って $K$ の任意の元は一意に

$$
\boxed{a+b\alpha+c\alpha^2,\qquad a,b,c\in\mathbb Q}
$$

と書けます。

### 4. $\alpha-1$ の逆元

関係 $\alpha^3=2$ を使います。

恒等式

$$
(\alpha-1)(\alpha^2+\alpha+1)
=
\alpha^3-1
$$

があるので

$$
(\alpha-1)(\alpha^2+\alpha+1)
=
2-1
=
1.
$$

従って

$$
\boxed{(\alpha-1)^{-1}=\alpha^2+\alpha+1}.
$$

これは多項式として

$$
(x-1)(x^2+x+1)-(x^3-2)=1
$$

という Bézout 型の等式になっています。

### 5. 中間体の制約

中間体

$$
\mathbb Q\subset E\subset K
$$

を取ります。

$[K:\mathbb Q]=3$ は有限なので、$[E:\mathbb Q]$ と $[K:E]$ も有限です。塔の公式から

$$
3
=
[K:\mathbb Q]
=
[K:E][E:\mathbb Q].
$$

両方の次数は正の整数です。

$3$ は素数なので可能性は

$$
([K:E],[E:\mathbb Q])
=
(3,1)
$$

または

$$
(1,3)
$$

だけです。

$[E:\mathbb Q]=1$ なら $E=\mathbb Q$、$[K:E]=1$ なら $E=K$ です。

従って

$$
\boxed{\mathbb Q\subsetneq E\subsetneq K\text{ となる中間体は存在しない}}
$$

ことが分かります。

この問題では、

$$
\text{既約性}
\to
\text{商環で体を構成}
\to
\text{最小多項式}
\to
\text{拡大次数}
\to
\text{塔の公式}
$$

という本章の主線を一度に使いました。
<!-- solution-end -->

---

## 10. まとめ

体拡大 $K/F$ は、$K$ を $F$-ベクトル空間として見ることで「どれだけ大きくなったか」を次数

$$
[K:F]
$$

で測れます。

中間体を挟めば

$$
\boxed{
[L:F]=[L:K][K:F]
}
$$

という塔の公式が成り立ちます。

有限拡大では各元 $\alpha$ が必ず多項式関係を持ち、その関係の正本が最小多項式

$$
m_\alpha
$$

です。

評価準同型

$$
F[x]\to K,
\qquad
f\mapsto f(\alpha)
$$

の核が $(m_\alpha)$ になることから

$$
\boxed{
F(\alpha)
=
F[\alpha]
\cong
F[x]/(m_\alpha)
}
$$

が得られ、

$$
\boxed{
[F(\alpha):F]=\deg m_\alpha
}
$$

となります。

逆に、モニック既約多項式 $p\in F[x]$ が与えられれば

$$
\boxed{
F[x]/(p)
}
$$

の中で $\alpha=[x]$ と置くことで、$p(\alpha)=0$ を満たす根を持つ体を構成できます。

次の FLD2 では、一つの根だけでなく多項式の全ての根を入れる **分解体**へ進み、重根・分離性・正規性を整理します。
