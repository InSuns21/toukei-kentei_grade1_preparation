# FLD4 抽象代数 XIV：有限 Galois 理論

<!-- definition-example-audit: strict -->

[FLD3](../FLD3/index.md) では、有限体拡大が分離的かつ正規であり、相対 Frobenius が基礎体を固定する自己同型になることを見ました。[GRP3](../GRP3/index.md) では、群作用・軌道・共役を整えています。

本章では、この二つの流れを一つにまとめます。

多項式の根を全部集めた体を作るだけでは、まだ「その体の中間体がどう並ぶか」は見えません。Galois 理論の核心は、体の中の構造を

$$
\text{体の自己同型が作る有限群}
$$

へ翻訳し、さらにその群の部分群から体の中間構造を逆に復元することです。

主線は

$$
\text{分離的}+\text{正規}
\longrightarrow
\operatorname{Gal}(L/F)
\longrightarrow
L^H
\longrightarrow
\text{中間体と部分群の対応}
\longrightarrow
\text{正規部分群と商群}
$$

です。

特に本章で扱う有限・分離・正規な拡大 $L/F$ では、

$$
E
\longleftrightarrow
\operatorname{Gal}(L/E)
$$

という対応が、中間体の包含を部分群の包含へ反転して移します。

> **この章の停止線**
>
> 本章では中間体と部分群の対応、正規部分群・商群までを閉じます。定規とコンパスによる作図、可解群、根号による可解性、一般五次方程式への応用は FLD5 へ送ります。無限 Galois 理論と Krull 位相は扱いません。

---

## 1. まず「基礎体を動かさない対称性」を集める

体拡大 $L/F$ を考えます。

$L$ の自己同型のうち、$F$ の各元を一つずつ固定するものだけを集めます。

<a id="def-fld4-automorphism-fixed-field"></a>
<!-- formal-statement-start -->
> **定義（基礎体固定自己同型・自己同型群・固定体）**
>
> 体拡大 $L/F$ に対し、体同型
>
> $$
> \sigma:L\to L
> $$
>
> が
>
> $$
> \sigma(a)=a
> \qquad
> (\forall a\in F)
> $$
>
> を満たすとき、$\sigma$ を **$F$ を固定する $L$ の自己同型**という。
>
> その全体を
>
> $$
> \operatorname{Aut}_F(L)
> $$
>
> と書く。写像の合成を積とすると $\operatorname{Aut}_F(L)$ は群になる。
>
> 部分群
>
> $$
> H\le \operatorname{Aut}_F(L)
> $$
>
> に対し、
>
> $$
> L^H
> =
> \{x\in L:\sigma(x)=x\text{ for every }\sigma\in H\}
> $$
>
> を $H$ の **固定体**という。
<!-- formal-statement-end -->

<!-- definition-example-start: def-fld4-automorphism-fixed-field -->
**定義の確認**

### 1.1 $\mathbb Q(\sqrt2)$ の共役自己同型

$$
L=\mathbb Q(\sqrt2)
$$

とします。

任意の元は一意に

$$
a+b\sqrt2,
\qquad
a,b\in\mathbb Q
$$

と書けます。

写像

$$
\tau(a+b\sqrt2)
=
a-b\sqrt2
$$

を考えます。

加法について

$$
\tau(x+y)=\tau(x)+\tau(y)
$$

であり、積についても

$$
(a+b\sqrt2)(c+d\sqrt2)
=
(ac+2bd)+(ad+bc)\sqrt2
$$

なので

$$
\tau(xy)
=
(ac+2bd)-(ad+bc)\sqrt2
=
\tau(x)\tau(y)
$$

です。

さらに

$$
\tau(1)=1,
\qquad
\tau^2=\operatorname{id}_L.
$$

従って $\tau$ は体自己同型です。

また $a\in\mathbb Q$ では

$$
\tau(a)=a
$$

だから $\mathbb Q$ を固定します。

よって

$$
\operatorname{Aut}_{\mathbb Q}(L)
=
\{\operatorname{id},\tau\}.
$$

この二元群全体を $H$ とすると、固定体を求める条件は

$$
a+b\sqrt2
=
\tau(a+b\sqrt2)
=
a-b\sqrt2.
$$

従って

$$
2b\sqrt2=0,
$$

体の標数は $0$ なので $b=0$ です。

したがって

$$
\boxed{L^H=\mathbb Q}.
$$
<!-- definition-example-end -->

### 1.2 固定体が本当に体になること

$H\le\operatorname{Aut}_F(L)$ とします。

各 $\sigma\in H$ は $F$ を固定するので

$$
F\subset L^H.
$$

また $x,y\in L^H$ なら任意の $\sigma\in H$ に対し

$$
\sigma(x+y)=\sigma(x)+\sigma(y)=x+y,
$$

$$
\sigma(xy)=\sigma(x)\sigma(y)=xy.
$$

さらに $x\ne0$ なら

$$
\sigma(x^{-1})
=
\sigma(x)^{-1}
=
x^{-1}.
$$

従って $L^H$ は $L$ の部分体です。

つまり

$$
F\subset L^H\subset L.
$$

自己同型の部分群を一つ選ぶたびに、中間体が一つ出てきます。

問題は逆向きです。

**任意の中間体が、ある部分群の固定体として得られるのでしょうか。**

その答えが有限 Galois 理論の基本定理です。

---

## 2. 分離性と正規性を同時に課す

FLD2 では、[分離拡大](../FLD2/index.md#def-fld2-distinct-conjugates)と[正規拡大](../FLD2/index.md#def-fld2-conjugate-root-closure)を通じて、分離性と正規性を別々に定義しました。

ここで初めて両方を同時に要求します。

<a id="def-fld4-finite-galois"></a>
<!-- formal-statement-start -->
> **定義（有限 Galois 拡大・Galois 群）**
>
> 有限拡大 $L/F$ が
>
> 1. 分離拡大であり、
> 2. 正規拡大である
>
> とき、$L/F$ を **有限 Galois 拡大**という。
>
> このとき
>
> $$
> \operatorname{Gal}(L/F)
> =
> \operatorname{Aut}_F(L)
> $$
>
> を $L/F$ の **Galois 群**という。
<!-- formal-statement-end -->

<!-- definition-example-start: def-fld4-finite-galois -->
**定義の確認**

### 2.1 $\mathbb Q(i)/\mathbb Q$ は有限 Galois 拡大

$$
L=\mathbb Q(i)
$$

を考えます。

$i$ の[代数的元の最小多項式](../FLD1/index.md#def-fld1-minimal-polynomial)は

$$
x^2+1.
$$

$\mathbb Q$ は標数 $0$ なので [標数 $0$ の体上の代数拡大は分離的](../FLD2/index.md#cor-fld2-char-zero-algebraic) です。

また

$$
x^2+1=(x-i)(x+i)
$$

であり、$L$ は $x^2+1$ の分解体です。

従って [有限正規拡大と分解体](../FLD2/index.md#thm-fld2-finite-splitting-equivalence) から $L/\mathbb Q$ は正規です。

よって

$$
\boxed{\mathbb Q(i)/\mathbb Q\text{ は有限 Galois 拡大}}.
$$

$\mathbb Q$ を固定する自己同型は $i$ を $x^2+1$ の根へ送るので、

$$
i\mapsto i,
\qquad
i\mapsto-i
$$

の二つです。

従って

$$
\operatorname{Gal}(\mathbb Q(i)/\mathbb Q)
\cong C_2.
$$

一方、

$$
E=\mathbb Q(\sqrt[3]{2})
$$

は標数 $0$ 上なので分離的ですが、$x^3-2$ の非実根を含まず正規ではありません。

したがって

$$
E/\mathbb Q
$$

は有限 Galois 拡大ではありません。
<!-- definition-example-end -->

ここで「分離的」と「正規」が別々に必要な理由が見えます。

- 分離性は、共役根の候補が重ならず、埋め込みを次数の個数だけ作れることを保証する。
- 正規性は、それらの埋め込みの像が拡大体 $L$ の外へ逃げないことを保証する。

次節でこの二つを数え上げます。

---

## 3. Galois 群の元は拡大次数だけ存在する

まず、有限分離拡大から代数閉包への埋め込みを数えます。

<a id="thm-fld4-separable-embedding-count"></a>
<!-- formal-statement-start -->
> **定理（有限分離拡大の埋め込み数）**
>
> $L/F$ を有限分離拡大とし、$\Omega$ を $L$ を含む代数閉体とする。
>
> このとき $F$ を固定する埋め込み
>
> $$
> \sigma:L\to\Omega
> $$
>
> はちょうど
>
> $$
> [L:F]
> $$
>
> 個存在する。
<!-- formal-statement-end -->

### 証明の見取り図

有限拡大なので有限個の元

$$
\alpha_1,\dots,\alpha_r
$$

で

$$
L=F(\alpha_1,\dots,\alpha_r)
$$

と生成できます。

一つずつ元を加えた塔

$$
F=E_0\subset E_1\subset\cdots\subset E_r=L,
\qquad
E_i=E_{i-1}(\alpha_i)
$$

を考えます。

$E_{i-1}$ までの埋め込みを一つ固定すると、$\alpha_i$ の像はその最小多項式の根から選びます。

分離性により根は

$$
[E_i:E_{i-1}]
$$

個すべて異なるので、一段進むたびに埋め込みの個数がこの次数倍されます。

最後に塔の公式を使います。

<!-- proof-start -->
### 証明

$L/F$ は有限拡大です。

$F$-基底を一つ取れば、その有限個の基底元は体としても $L$ を生成するので、ある有限個の元

$$
\alpha_1,\dots,\alpha_r\in L
$$

が存在して

$$
L=F(\alpha_1,\dots,\alpha_r)
$$

と書けます。

$$
E_i=F(\alpha_1,\dots,\alpha_i)
$$

と置きます。

すると

$$
F=E_0\subset E_1\subset\cdots\subset E_r=L.
$$

$i\ge1$ を固定します。

$\alpha_i$ の $E_{i-1}$ 上の最小多項式を

$$
m_i(x)=m_{\alpha_i,E_{i-1}}(x)
$$

とし、

$$
d_i=\deg m_i=[E_i:E_{i-1}]
$$

とします。

$\alpha_i$ は $L/F$ が分離的であることから $F$ 上分離的です。

$F$ 上の最小多項式

$$
m_{\alpha_i,F}
$$

は $E_{i-1}[x]$ の多項式としても $\alpha_i$ を根に持つので、

$$
m_i\mid m_{\alpha_i,F}
\qquad
\text{in }E_{i-1}[x].
$$

分離多項式の因子は重根を持たないため、$m_i$ も分離的です。

いま $F$ を固定する埋め込み

$$
\sigma:E_{i-1}\to\Omega
$$

を一つ取ります。

係数へ $\sigma$ を作用させた多項式

$$
\sigma(m_i)
$$

は次数 $d_i$ です。

$m_i$ は分離的なので

$$
\gcd(m_i,m_i')=1.
$$

従ってある $a,b\in E_{i-1}[x]$ が存在して

$$
a m_i+b m_i'=1
$$

と書けます。

係数へ $\sigma$ を作用させると

$$
\sigma(a)\sigma(m_i)
+
\sigma(b)\sigma(m_i')=1.
$$

係数写像は形式微分と可換するので

$$
\sigma(m_i')=(\sigma(m_i))'.
$$

したがって

$$
\gcd\bigl(\sigma(m_i),(\sigma(m_i))'\bigr)=1.
$$

FLD2 の重根判定により $\sigma(m_i)$ も重根を持ちません。

$\Omega$ は代数閉体なので、$\sigma(m_i)$ は $\Omega$ 内にちょうど $d_i$ 個の異なる根を持ちます。

[一段の埋め込み延長](../FLD2/index.md#lem-fld2-one-step-field-map) により、その各根 $\beta$ を

$$
\alpha_i\mapsto\beta
$$

の像として選ぶたびに、$\sigma$ は一意に

$$
\widetilde\sigma:E_i\to\Omega
$$

へ延長されます。

従って $E_{i-1}$ の各埋め込みは、ちょうど $d_i$ 個の $E_i$ の埋め込みへ延長されます。

$E_0=F$ には恒等埋め込みが一つだけなので、反復すると $L=E_r$ の $F$-埋め込みの個数は

$$
d_1d_2\cdots d_r.
$$

一方、[拡大次数の塔の公式](../FLD1/index.md#thm-fld1-tower-law) により

$$
[L:F]
=
\prod_{i=1}^r[E_i:E_{i-1}]
=
d_1d_2\cdots d_r.
$$

よって埋め込みの個数は

$$
\boxed{[L:F]}
$$

です。
<!-- proof-end -->

<a id="cor-fld4-galois-order-degree"></a>
<!-- formal-statement-start -->
> **系（有限 Galois 拡大の Galois 群の位数）**
>
> $L/F$ を有限 Galois 拡大とする。
>
> このとき
>
> $$
> |\operatorname{Gal}(L/F)|
> =
> [L:F].
> $$
<!-- formal-statement-end -->

### なぜ正規性が必要か

分離性だけなら、前定理により

$$
[L:F]
$$

個の $F$-埋め込み

$$
L\to\Omega
$$

が存在します。

しかし像が $L$ の外へ出るかもしれません。

正規性があると、FLD2 の [有限正規拡大と分解体](../FLD2/index.md#thm-fld2-finite-splitting-equivalence) により $L$ はある $F$ 係数多項式の分解体です。

分解体は [基礎体固定埋め込みで保たれる](../FLD2/index.md#prop-fld2-splitting-field-map-stability) ので、全ての $F$-埋め込みは

$$
L\to L
$$

となります。

<!-- proof-start -->
### 証明

$L/F$ は分離的なので、前定理から $F$ を固定する埋め込み

$$
\sigma:L\to\Omega
$$

はちょうど $[L:F]$ 個あります。

また $L/F$ は有限正規拡大なので、ある

$$
f\in F[x]
$$

が存在して $L$ は $f$ の分解体です。

任意の $F$-埋め込み $\sigma:L\to\Omega$ に対し、分解体が基礎体固定の埋め込みで保たれることから

$$
\sigma(L)=L.
$$

従って各 $\sigma$ は $L$ の自己同型です。

逆に $F$ を固定する自己同型は当然 $F$ を固定する埋め込みです。

したがって

$$
\operatorname{Gal}(L/F)
$$

は前定理で数えた全ての埋め込みからなり、

$$
\boxed{
|\operatorname{Gal}(L/F)|
=
[L:F]
}.
$$
<!-- proof-end -->

### 3.1 非正規な拡大では何が壊れるか

$$
E=\mathbb Q(\sqrt[3]{2})
$$

では

$$
[E:\mathbb Q]=3
$$

で、標数 $0$ なので分離的です。

従って $\mathbb Q$ を固定する埋め込み

$$
E\to\mathbb C
$$

は三つあります。

しかし二つは

$$
\sqrt[3]{2}
\mapsto
\omega\sqrt[3]{2},
\qquad
\sqrt[3]{2}
\mapsto
\omega^2\sqrt[3]{2}
$$

と非実根へ送り、像は $E$ の外へ出ます。

そのため

$$
|\operatorname{Aut}_{\mathbb Q}(E)|=1
$$

しかありません。

失われた仮定は **正規拡大であること** です。

---

## 4. 有限個の自己同型から固定体の次数を復元する

有限 Galois 理論の基本定理の逆向きでは、

$$
H\le\operatorname{Aut}(L)
$$

から固定体 $L^H$ を作ったとき、

$$
[L:L^H]=|H|
$$

を示す必要があります。

ここで中心になるのが、次の独立性補題です。

<a id="lem-fld4-artin-independence"></a>
<!-- formal-statement-start -->
> **補題（Artin の独立性）**
>
> $K,L$ を体とし、
>
> $$
> \sigma_1,\dots,\sigma_n:K\to L
> $$
>
> を相異なる体準同型とする。
>
> このとき $\sigma_1,\dots,\sigma_n$ は、$K$ から $L$ への関数として $L$ 上一次独立である。
>
> すなわち
>
> $$
> c_1\sigma_1(x)+\cdots+c_n\sigma_n(x)=0
> \qquad
> (\forall x\in K)
> $$
>
> が成り立つ $c_i\in L$ は
>
> $$
> c_1=\cdots=c_n=0
> $$
>
> に限る。
<!-- formal-statement-end -->

### 証明の見取り図

非自明な一次関係があると仮定し、項数が最小のものを取ります。

相異なる準同型 $\sigma_1,\sigma_n$ があるので、ある $a\in K$ で

$$
\sigma_1(a)\ne\sigma_n(a)
$$

です。

元の関係へ $ax$ を代入した式から、$x$ を代入した式の $\sigma_n(a)$ 倍を引くと、$\sigma_n$ の項が消えます。

しかも $\sigma_1$ の係数は消えないので、より短い非自明な一次関係ができて最小性に反します。

<!-- proof-start -->
### 証明

反対に、非自明な関係

$$
c_1\sigma_1(x)+\cdots+c_n\sigma_n(x)=0
\qquad
(\forall x\in K)
$$

が存在すると仮定します。

非零係数を持つ項だけ残し、その中で項数 $n$ が最小の関係を取ります。

全係数を

$$
c_i\ne0
$$

としてよいです。

$n=1$ なら $x=1$ を代入して

$$
c_1\sigma_1(1)=c_1=0
$$

となり矛盾です。

従って $n\ge2$ です。

$\sigma_1\ne\sigma_n$ なので、ある $a\in K$ が存在して

$$
\sigma_1(a)\ne\sigma_n(a).
$$

元の関係へ $ax$ を代入すると

$$
\sum_{i=1}^n
c_i\sigma_i(a)\sigma_i(x)=0.
$$

一方、元の関係を $\sigma_n(a)$ 倍すると

$$
\sum_{i=1}^n
c_i\sigma_n(a)\sigma_i(x)=0.
$$

差を取れば

$$
\sum_{i=1}^{n-1}
c_i
\bigl(\sigma_i(a)-\sigma_n(a)\bigr)
\sigma_i(x)
=
0
$$

です。

$i=n$ の項は消えました。

しかし $i=1$ の係数は

$$
c_1
\bigl(\sigma_1(a)-\sigma_n(a)\bigr)
\ne0.
$$

従ってこれは $\sigma_1,\dots,\sigma_{n-1}$ の間の非自明な一次関係です。

項数が $n$ より少なく、最小性に反します。

よって非自明な関係は存在しません。
<!-- proof-end -->

次に、独立な準同型を「実際の正方行列」にします。

<a id="lem-fld4-evaluation-matrix"></a>
<!-- formal-statement-start -->
> **補題（独立な準同型の可逆評価行列）**
>
> 相異なる体準同型
>
> $$
> \sigma_1,\dots,\sigma_n:K\to L
> $$
>
> に対し、ある
>
> $$
> \alpha_1,\dots,\alpha_n\in K
> $$
>
> が存在して、行列
>
> $$
> A=
> \bigl(\sigma_i(\alpha_j)\bigr)_{1\le i,j\le n}
> $$
>
> は $L$ 上可逆である。
<!-- formal-statement-end -->

<!-- proof-start -->
### 証明

各 $a\in K$ に対して列ベクトル

$$
v(a)
=
\begin{pmatrix}
\sigma_1(a)\\
\vdots\\
\sigma_n(a)
\end{pmatrix}
\in L^n
$$

を考えます。

これらの $L$-線形包が $L^n$ 全体でないと仮定します。

すると真の部分空間

$$
W=\operatorname{span}_L\{v(a):a\in K\}
$$

と置きます。

もし $W\ne L^n$ なら

$$
r=\dim_L W<n.
$$

$W$ の基底を

$$
w_1,\dots,w_r
$$

とします。

未知数 $c_1,\dots,c_n$ に関する $r$ 本の斉次一次方程式

$$
c_1(w_j)_1+\cdots+c_n(w_j)_n=0,
\qquad
j=1,\dots,r
$$

を考えます。

未知数の個数 $n$ が方程式の本数 $r$ より大きいので、非零解

$$
(c_1,\dots,c_n)\ne(0,\dots,0)
$$

が存在します。

任意の $a\in K$ について $v(a)\in W$ だから、この非零解は

$$
c_1\sigma_1(a)+\cdots+c_n\sigma_n(a)=0
$$

を満たします。

これは [Artin の独立性](#lem-fld4-artin-independence) に反します。

従って

$$
\operatorname{span}_L\{v(a):a\in K\}
=
L^n.
$$

よって $n$ 本の列

$$
v(\alpha_1),\dots,v(\alpha_n)
$$

を選んで $L^n$ の基底にできます。

その列を並べた行列が

$$
A=
\bigl(\sigma_i(\alpha_j)\bigr)
$$

であり、列が基底なので $A$ は可逆です。
<!-- proof-end -->

<a id="thm-fld4-artin-fixed-field"></a>
<!-- formal-statement-start -->
> **定理（Artin の固定体定理）**
>
> $L$ を体とし、
>
> $$
> H\le\operatorname{Aut}(L)
> $$
>
> を有限部分群とする。
>
> 固定体を
>
> $$
> K=L^H
> $$
>
> と置く。
>
> このとき
>
> $$
> [L:K]=|H|
> $$
>
> であり、$L/K$ は有限 Galois 拡大である。
>
> さらに
>
> $$
> \operatorname{Gal}(L/K)=H.
> $$
<!-- formal-statement-end -->

### 証明の見取り図

$H=\{\sigma_1,\dots,\sigma_n\}$ とします。

まず [Artin の独立性](#lem-fld4-artin-independence)から、ある $\alpha_1,\dots,\alpha_n$ を選んで

$$
A=(\sigma_i(\alpha_j))
$$

を可逆にできます。

任意の $\beta\in L$ に対し

$$
\sigma_i(\beta)
=
\sum_j \sigma_i(\alpha_j)c_j
$$

を解くと、係数 $c_j$ は一意です。

群の元 $\tau\in H$ をこの連立方程式へ作用させると、行が置換されるだけなので $\tau(c_j)$ も同じ解です。

解の一意性から

$$
\tau(c_j)=c_j
$$

となり、$c_j\in K$ です。

従って $\alpha_1,\dots,\alpha_n$ が $L$ を $K$ 上張り、

$$
[L:K]\le n.
$$

逆向きは、$H$ の各自己同型が $K$-線形写像であり、[Artin の独立性](#lem-fld4-artin-independence)から $L$ 上一次独立であることを使います。

<!-- proof-start -->
### 証明

$$
H=\{\sigma_1,\dots,\sigma_n\},
\qquad
n=|H|
$$

とします。

[独立な準同型の可逆評価行列](#lem-fld4-evaluation-matrix) により、ある

$$
\alpha_1,\dots,\alpha_n\in L
$$

を選んで

$$
A=
\bigl(\sigma_i(\alpha_j)\bigr)
$$

を可逆にできます。

任意の $\beta\in L$ を取ります。

可逆性から

$$
A
\begin{pmatrix}
c_1\\
\vdots\\
c_n
\end{pmatrix}
=
\begin{pmatrix}
\sigma_1(\beta)\\
\vdots\\
\sigma_n(\beta)
\end{pmatrix}
$$

を満たす係数

$$
c_1,\dots,c_n\in L
$$

がただ一組存在します。

すなわち全ての $i$ について

$$
\sigma_i(\beta)
=
\sum_{j=1}^n
\sigma_i(\alpha_j)c_j.
$$


$\tau\in H$ を一つ取ります。

上の等式へ $\tau$ を作用させると

$$
(\tau\sigma_i)(\beta)
=
\sum_{j=1}^n
(\tau\sigma_i)(\alpha_j)\tau(c_j).
$$

$\sigma_i$ が $H$ 全体を走ると、$\tau\sigma_i$ も $H$ 全体をちょうど一度ずつ走ります。

従って

$$
\tau(c_1),\dots,\tau(c_n)
$$

も、元の連立方程式と同じ未知係数問題の解です。

解は一意だったので

$$
\tau(c_j)=c_j
\qquad
(j=1,\dots,n)
$$

です。

$\tau\in H$ は任意だったため

$$
c_j\in L^H=K.
$$

特に恒等写像に対応する行を見れば

$$
\beta
=
c_1\alpha_1+\cdots+c_n\alpha_n,
\qquad
c_j\in K.
$$

従って

$$
L=\operatorname{span}_K\{\alpha_1,\dots,\alpha_n\}
$$

であり、

$$
[L:K]\le n.
$$

ここで

$$
m=[L:K]
$$

と置きます。

$L$ の $K$-基底

$$
e_1,\dots,e_m
$$

を取ります。

$K$-線形写像全体

$$
\operatorname{Hom}_K(L,L)
$$

は、値

$$
T(e_1),\dots,T(e_m)\in L
$$

で一意に決まります。

従って $L$-ベクトル空間として

$$
\operatorname{Hom}_K(L,L)\cong L^m
$$

であり、その $L$-次元は $m$ です。

各 $\sigma_i\in H$ は $K=L^H$ の各元を固定するので $K$-線形写像です。

さらに [Artin の独立性](#lem-fld4-artin-independence)により

$$
\sigma_1,\dots,\sigma_n
$$

は $\operatorname{Hom}_K(L,L)$ の中で $L$ 上一次独立です。

したがって

$$
n\le m=[L:K].
$$

先ほどの逆向き不等式と合わせて

$$
\boxed{[L:K]=n=|H|}.
$$

次に $L/K$ が分離的かつ正規であることを確認します。

任意の $\alpha\in L$ を取り、その $H$-軌道の相異なる元全体を

$$
H\alpha
=
\{\beta_1,\dots,\beta_r\}
$$

とします。

軌道多項式

$$
P_\alpha(x)
=
\prod_{j=1}^r(x-\beta_j)
\in L[x]
$$

を考えます。

任意の $\tau\in H$ は軌道 $H\alpha$ を置換するので、

$$
\tau(P_\alpha)=P_\alpha.
$$

従って $P_\alpha$ の全係数は $H$ の全ての元で固定され、

$$
P_\alpha\in K[x].
$$

また $\alpha$ は $P_\alpha$ の根です。

$\alpha$ の $K$ 上の最小多項式を $m_{\alpha,K}$ とすると、最小多項式の整除性から

$$
m_{\alpha,K}\mid P_\alpha
\qquad
\text{in }K[x].
$$

$P_\alpha$ は相異なる一次因子

$$
x-\beta_1,\dots,x-\beta_r
$$

の積なので重根を持たず、しかも全ての根が $L$ にあります。

従って $m_{\alpha,K}$ も重根を持たず、$L[x]$ で一次式の積に分解します。

$\alpha\in L$ は任意だったため、$L/K$ は分離的です。

さらに $K$ 上既約な多項式が $L$ に一根 $\alpha$ を持てば、それは単元倍を除いて $m_{\alpha,K}$ なので、上の議論から全ての根が $L$ に入ります。

従って $L/K$ は正規です。

すでに $[L:K]<\infty$ を示したので、

$$
\boxed{L/K\text{ は有限 Galois 拡大}}
$$

です。

最後に

$$
H\subset\operatorname{Aut}_K(L)
=
\operatorname{Gal}(L/K)
$$

です。

一方、$\operatorname{Aut}_K(L)$ の相異なる元も [Artin の独立性](#lem-fld4-artin-independence)により $\operatorname{Hom}_K(L,L)$ の中で $L$ 上一次独立なので、その個数は

$$
\dim_L\operatorname{Hom}_K(L,L)
=
[L:K]
=
n
$$

を超えません。

すでに $H$ が $n$ 個の元を持つので

$$
\boxed{
\operatorname{Gal}(L/K)
=
\operatorname{Aut}_K(L)
=
H
}.
$$
<!-- proof-end -->

この定理は非常に強力です。

最初に $L/F$ が Galois であることを仮定していません。

**有限個の自己同型群 $H$ を先に与えるだけで、その固定体 $K=L^H$ に対して $L/K$ の次数が $|H|$ と分かる**のです。

---

## 5. 中間体と部分群は包含を反転して一対一対応する

準備が揃いました。

<a id="thm-fld4-fundamental-galois"></a>
<!-- formal-statement-start -->
> **定理（有限 Galois 理論の基本定理）**
>
> $L/F$ を有限 Galois 拡大とし、
>
> $$
> G=\operatorname{Gal}(L/F)
> $$
>
> とする。
>
> 中間体
>
> $$
> F\subset E\subset L
> $$
>
> に
>
> $$
> E\longmapsto \operatorname{Gal}(L/E)
> $$
>
> を対応させ、部分群
>
> $$
> H\le G
> $$
>
> に
>
> $$
> H\longmapsto L^H
> $$
>
> を対応させる。
>
> この二つの対応は互いに逆である。
>
> すなわち
>
> $$
> L^{\operatorname{Gal}(L/E)}=E
> $$
>
> および
>
> $$
> \operatorname{Gal}(L/L^H)=H
> $$
>
> が成り立つ。
>
> また
>
> $$
> E_1\subset E_2
> \iff
> \operatorname{Gal}(L/E_2)
> \subset
> \operatorname{Gal}(L/E_1)
> $$
>
> であり、包含は反転する。
>
> さらに $H=\operatorname{Gal}(L/E)$ なら
>
> $$
> [L:E]=|H|,
> \qquad
> [E:F]=[G:H].
> $$
<!-- formal-statement-end -->

### 何が難しいのか

包含反転そのものは簡単です。

大きい中間体 $E$ を各点で固定する自己同型は条件が厳しいので少なくなります。

難しいのは

$$
E
\subset
L^{\operatorname{Gal}(L/E)}
$$

が真の包含にならず、必ず等号になることです。

ここで前節の次数計算が効きます。

<!-- proof-start -->
### 証明

まず中間体

$$
F\subset E\subset L
$$

を固定します。

$L/F$ は分離的です。

任意の $\alpha\in L$ の $F$ 上の最小多項式

$$
m_{\alpha,F}
$$

は重根を持ちません。

一方、$E$ 上の最小多項式

$$
m_{\alpha,E}
$$

は $E[x]$ で $m_{\alpha,F}$ を割ります。

従って $m_{\alpha,E}$ も重根を持たず、$L/E$ は分離的です。

次に $L/F$ は有限正規拡大なので、[有限正規拡大と分解体](../FLD2/index.md#thm-fld2-finite-splitting-equivalence) により、ある

$$
f\in F[x]
$$

が存在して $L$ は $f$ の $F$ 上の分解体です。

$f$ は $E[x]$ の多項式ともみなせます。

$f$ の全ての根は $L$ にあり、それらは $F$ とともに $L$ を生成します。

$E$ は $F$ を含むので、$E$ と同じ根全体が生成する体も $L$ です。

従って $L$ は $f$ の $E$ 上の分解体でもあります。

よって $L/E$ は正規です。

以上から

$$
L/E
$$

は有限 Galois 拡大です。

$$
H=\operatorname{Gal}(L/E)
$$

と置きます。

[有限 Galois 拡大の Galois 群の位数](#cor-fld4-galois-order-degree) から

$$
|H|=[L:E].
$$

また定義から $H$ の全ての元は $E$ を各点で固定するため

$$
E\subset L^H.
$$

[Artin の固定体定理](#thm-fld4-artin-fixed-field) から

$$
[L:L^H]=|H|.
$$

従って

$$
[L:L^H]
=
|H|
=
[L:E].
$$

塔の公式を

$$
E\subset L^H\subset L
$$

へ適用すると

$$
[L:E]
=
[L:L^H][L^H:E].
$$

左辺と最初の因子が等しいので

$$
[L^H:E]=1.
$$

よって

$$
\boxed{L^H=E}.
$$

逆に任意の部分群

$$
H\le G
$$

を取ります。

$K=L^H$ と置けば、[Artin の固定体定理](#thm-fld4-artin-fixed-field)から

$$
\boxed{\operatorname{Gal}(L/K)=H}.
$$

したがって二つの対応は互いに逆です。

包含反転を確認します。

$$
E_1\subset E_2
$$

なら、$E_2$ を各点で固定する自己同型は当然 $E_1$ も固定するので

$$
\operatorname{Gal}(L/E_2)
\subset
\operatorname{Gal}(L/E_1).
$$

逆向きは固定体を取れば従います。

最後に

$$
H=\operatorname{Gal}(L/E)
$$

なら、$L/E$ は有限 Galois なので

$$
[L:E]=|H|.
$$

また塔の公式と

$$
[L:F]=|G|
$$

から

$$
|G|
=
[L:F]
=
[L:E][E:F]
=
|H|[E:F].
$$

従って

$$
\boxed{
[E:F]
=
\frac{|G|}{|H|}
=
[G:H]
}.
$$
<!-- proof-end -->

### 5.1 対応表の読み方

対応は

$$
\begin{array}{ccccc}
L & \longleftrightarrow & \{1\}\\
\uparrow && \downarrow\\
E & \longleftrightarrow & H\\
\uparrow && \downarrow\\
F & \longleftrightarrow & G
\end{array}
$$

の向きです。

体が大きくなるほど、それを固定できる自己同型は少なくなります。

端点は

$$
L^{\{1\}}=L,
\qquad
L^G=F.
$$

特に最後の等式は、「Galois 群全体で固定される元は基礎体の元だけ」という重要な結論です。

---

## 6. 正規部分群は、基礎体上でも Galois な中間体に対応する

Galois 対応だけでは、全ての中間体 $E$ に対して $E/F$ が Galois とは限りません。

ここで群論の正規部分群が現れます。

まず、固定体が共役でどう動くかを確認します。

<a id="prop-fld4-fixed-field-conjugation"></a>
<!-- formal-statement-start -->
> **命題（固定体の共役移送）**
>
> $L/F$ を有限 Galois 拡大とし、
>
> $$
> G=\operatorname{Gal}(L/F).
> $$
>
> $H\le G$ と $\sigma\in G$ に対し、
>
> $$
> \sigma(L^H)
> =
> L^{\sigma H\sigma^{-1}}.
> $$
<!-- formal-statement-end -->

<!-- proof-start -->
### 証明

$x\in L^H$ とし、

$$
y=\sigma(x)
$$

と置きます。

任意の

$$
k\in\sigma H\sigma^{-1}
$$

はある $h\in H$ を用いて

$$
k=\sigma h\sigma^{-1}
$$

と書けます。

すると

$$
k(y)
=
\sigma h\sigma^{-1}(\sigma(x))
=
\sigma h(x)
=
\sigma(x)
=
y.
$$

従って

$$
\sigma(L^H)
\subset
L^{\sigma H\sigma^{-1}}.
$$

逆に $\sigma^{-1}$ と部分群 $\sigma H\sigma^{-1}$ に同じ議論を適用すると

$$
\sigma^{-1}\left(
L^{\sigma H\sigma^{-1}}
\right)
\subset L^H.
$$

両辺へ $\sigma$ を作用させて

$$
L^{\sigma H\sigma^{-1}}
\subset
\sigma(L^H).
$$

よって等号です。
<!-- proof-end -->

<a id="thm-fld4-normal-subgroup-correspondence"></a>
<!-- formal-statement-start -->
> **定理（正規部分群と正規中間拡大の対応）**
>
> $L/F$ を有限 Galois 拡大とし、
>
> $$
> G=\operatorname{Gal}(L/F).
> $$
>
> 中間体 $E$ に対応する部分群を
>
> $$
> H=\operatorname{Gal}(L/E)
> $$
>
> とする。
>
> このとき次は同値である。
>
> 1. $H$ は $G$ の正規部分群である。
> 2. $E/F$ は有限 Galois 拡大である。
>
> この条件が成り立つとき、制限写像
>
> $$
> \rho:G\to\operatorname{Gal}(E/F),
> \qquad
> \rho(\sigma)=\sigma|_E
> $$
>
> は全射群準同型で、
>
> $$
> \ker\rho=H.
> $$
>
> 従って
>
> $$
> \operatorname{Gal}(E/F)
> \cong
> G/H.
> $$
<!-- formal-statement-end -->

### 証明の見取り図

$E=L^H$ です。

$H$ が正規なら

$$
\sigma H\sigma^{-1}=H
$$

なので、前命題から

$$
\sigma(E)=E
$$

です。

つまり $G$ の全要素が中間体 $E$ を集合として保ちます。

これに埋め込み延長を組み合わせると、$E$ の全ての $F$-共役根が $E$ の中へ戻るため、$E/F$ は正規になります。

逆に $E/F$ が正規なら、$G$ の元は $E$ を保つので、固定部分群も共役で不変です。

<!-- proof-start -->
### 証明

$L/F$ は分離的なので、その中間拡大 $E/F$ も分離的です。

従って、ここでは正規性だけを判定すれば十分です。

#### $H\triangleleft G$ なら $E/F$ は Galois

$H$ が $G$ の正規部分群だとします。

[有限 Galois 理論の基本定理](#thm-fld4-fundamental-galois)から

$$
E=L^H.
$$

任意の $\sigma\in G$ に対して

$$
\sigma H\sigma^{-1}=H.
$$

[固定体の共役移送](#prop-fld4-fixed-field-conjugation) から

$$
\sigma(E)
=
\sigma(L^H)
=
L^{\sigma H\sigma^{-1}}
=
L^H
=
E.
$$

従って $G$ の全要素は $E$ を集合として保ちます。

$E/F$ が正規拡大であることを示します。

$p\in F[x]$ を既約多項式とし、

$$
\alpha\in E
$$

をその一つの根とします。

$\beta$ を代数閉包内の $p$ の任意の根とします。

$p$ は $\alpha$ の最小多項式なので、[一段の埋め込み延長](../FLD2/index.md#lem-fld2-one-step-field-map) により

$$
F(\alpha)\to\overline F,
\qquad
\alpha\mapsto\beta
$$

という $F$ を固定する埋め込みが存在します。

$E/F(\alpha)$ は有限代数拡大なので、[有限代数拡大上への埋め込み延長](../FLD2/index.md#thm-fld2-finite-field-map) によりこれを

$$
\tau:E\to\overline F
$$

へ延長できます。

さらに $L/E$ も有限代数拡大なので、もう一度埋め込み延長を使って

$$
\widetilde\tau:L\to\overline F
$$

へ延長できます。

$L/F$ は正規なので、$\widetilde\tau$ は $L$ を $L$ へ写します。

従って

$$
\widetilde\tau\in G.
$$

上で示した通り $G$ の各元は $E$ を保つため

$$
\beta
=
\widetilde\tau(\alpha)
\in E.
$$

$\beta$ は $p$ の任意の根でした。

従って $p$ の全ての根が $E$ に入り、$p$ は $E[x]$ で完全に分解します。

よって $E/F$ は正規です。

すでに分離的だったので

$$
E/F
$$

は有限 Galois 拡大です。

#### $E/F$ が Galois なら $H\triangleleft G$

今度は $E/F$ が有限 Galois 拡大だとします。

任意の $\sigma\in G$ を取ります。

$x\in E$ の $F$ 上の最小多項式を $m_{x,F}$ とすると、

$$
m_{x,F}(\sigma(x))
=
\sigma(m_{x,F}(x))
=
0.
$$

$E/F$ は正規なので $m_{x,F}$ の全ての根は $E$ にあります。

従って

$$
\sigma(x)\in E.
$$

よって

$$
\sigma(E)\subset E.
$$

同じ議論を $\sigma^{-1}$ に適用すれば逆包含も得られ、

$$
\sigma(E)=E.
$$

[Galois 対応](#thm-fld4-fundamental-galois)と[固定体の共役移送](#prop-fld4-fixed-field-conjugation)から

$$
L^{\sigma H\sigma^{-1}}
=
\sigma(L^H)
=
\sigma(E)
=
E
=
L^H.
$$

Galois 対応は部分群を固定体から一意に復元するので

$$
\sigma H\sigma^{-1}=H.
$$

$\sigma\in G$ は任意だったため

$$
H\triangleleft G.
$$

#### 商群

条件が成り立つとします。

各 $\sigma\in G$ は $E$ を保つので、

$$
\rho(\sigma)=\sigma|_E
$$

は $\operatorname{Gal}(E/F)$ の元です。

制限は合成を保つため $\rho$ は群準同型です。

核は

$$
\ker\rho
=
\{\sigma\in G:\sigma(x)=x\ (\forall x\in E)\}
=
\operatorname{Gal}(L/E)
=
H.
$$

全射性を示します。

任意の

$$
\tau\in\operatorname{Gal}(E/F)
$$

を取ります。

[有限代数拡大上への埋め込み延長](../FLD2/index.md#thm-fld2-finite-field-map) により、$\tau$ は

$$
\widetilde\tau:L\to\overline F
$$

へ延長できます。

$\tau$ は $F$ を固定するので $\widetilde\tau$ も $F$ を固定します。

$L/F$ は正規だから

$$
\widetilde\tau(L)=L,
$$

従って

$$
\widetilde\tau\in G.
$$

しかも

$$
\rho(\widetilde\tau)=\tau.
$$

よって $\rho$ は全射です。

最後に [群の第一同型定理](../GRP2/index.md#thm-grp2-first-isomorphism) から

$$
\boxed{
G/H
\cong
\operatorname{Gal}(E/F)
}.
$$
<!-- proof-end -->

この定理は Galois 対応の「正規拡大まで含めた完全版」です。

体側の正規拡大が、群側では正規部分群へ翻訳されます。

---

## 7. 具体例で対応を手で読む

### 7.1 二重二次拡大：Klein 四元群がそのまま見える

$$
L=\mathbb Q(\sqrt2,\sqrt3)
$$

とします。

$\mathbb Q$ は標数 $0$ なので分離的です。

また $L$ は

$$
(x^2-2)(x^2-3)
$$

の分解体なので正規です。

従って $L/\mathbb Q$ は有限 Galois 拡大です。

塔の公式から

$$
[L:\mathbb Q]
=
[L:\mathbb Q(\sqrt2)]
[\mathbb Q(\sqrt2):\mathbb Q]
=
2\cdot2
=
4.
$$

Galois 群の位数も $4$ です。

自己同型は $\sqrt2$ と $\sqrt3$ の符号を独立に変えられます。

$$
a:
\begin{cases}
\sqrt2\mapsto-\sqrt2,\\
\sqrt3\mapsto\sqrt3,
\end{cases}
\qquad
b:
\begin{cases}
\sqrt2\mapsto\sqrt2,\\
\sqrt3\mapsto-\sqrt3.
\end{cases}
$$

すると

$$
a^2=b^2=1,
\qquad
ab=ba.
$$

従って

$$
G
=
\{1,a,b,ab\}
\cong C_2\times C_2.
$$

固定体は

$$
L^{\langle a\rangle}
=
\mathbb Q(\sqrt3),
$$

$$
L^{\langle b\rangle}
=
\mathbb Q(\sqrt2),
$$

$$
L^{\langle ab\rangle}
=
\mathbb Q(\sqrt6).
$$

例えば $ab$ は

$$
\sqrt6=\sqrt2\sqrt3
$$

を固定します。

また

$$
[L^{\langle ab\rangle}:\mathbb Q]
=
[G:\langle ab\rangle]
=
2
$$

なので、$\mathbb Q(\sqrt6)$ より大きな固定体にはなりません。

$G$ は可換群なので全ての部分群が正規です。

従って三つの二次中間体は全て $\mathbb Q$ 上 Galois です。

### 7.2 $x^3-2$ の分解体：$S_3$ と非正規中間体

$$
\alpha=\sqrt[3]{2}>0,
\qquad
\omega^2+\omega+1=0,
\quad
\omega\ne1
$$

とし、

$$
L=\mathbb Q(\alpha,\omega)
$$

とします。

FLD2 で見た通り、$L$ は $x^3-2$ の分解体で

$$
[L:\mathbb Q]=6.
$$

標数 $0$ なので $L/\mathbb Q$ は有限 Galois 拡大です。

次の自己同型を取ります。

$$
r:
\begin{cases}
\alpha\mapsto\omega\alpha,\\
\omega\mapsto\omega,
\end{cases}
$$

$$
s:
\begin{cases}
\alpha\mapsto\alpha,\\
\omega\mapsto\omega^2.
\end{cases}
$$

生成元への作用から

$$
r^3=1,
\qquad
s^2=1,
\qquad
srs=r^{-1}
$$

を確認できます。

さらに $G=\operatorname{Gal}(L/\mathbb Q)$ は三つの根

$$
\alpha,\quad \omega\alpha,\quad \omega^2\alpha
$$

を置換します。

$r$ はこの三根を

$$
\alpha
\mapsto
\omega\alpha
\mapsto
\omega^2\alpha
\mapsto
\alpha
$$

と巡回させ、$s$ は $\alpha$ を固定して $\omega\alpha$ と $\omega^2\alpha$ を交換します。

従ってこの作用の像は三文字の対称群 $S_3$ 全体を含みます。

一方

$$
|G|
=
[L:\mathbb Q]
=
6
=
|S_3|.
$$

よって作用は同型を与え、

$$
\boxed{
\operatorname{Gal}(L/\mathbb Q)
\cong S_3
}.
$$

部分群

$$
\langle r\rangle
$$

は位数 $3$ です。

$r$ は $\omega$ を固定するので

$$
\mathbb Q(\omega)
\subset
L^{\langle r\rangle}.
$$

Galois 対応から固定体の次数は

$$
[L^{\langle r\rangle}:\mathbb Q]
=
[G:\langle r\rangle]
=
2.
$$

$\mathbb Q(\omega)/\mathbb Q$ も次数 $2$ なので

$$
\boxed{
L^{\langle r\rangle}
=
\mathbb Q(\omega)
}.
$$

一方、

$$
s(\alpha)=\alpha
$$

なので

$$
\mathbb Q(\alpha)
\subset
L^{\langle s\rangle}.
$$

固定体の次数は

$$
[G:\langle s\rangle]
=
\frac62
=
3.
$$

$\mathbb Q(\alpha)$ の次数も $3$ なので

$$
\boxed{
L^{\langle s\rangle}
=
\mathbb Q(\alpha)
}.
$$

ここで

$$
\langle r\rangle
$$

は $S_3$ の正規部分群ですが、

$$
\langle s\rangle
$$

は正規ではありません。

従って正規部分群対応から

$$
\mathbb Q(\omega)/\mathbb Q
$$

は Galois ですが、

$$
\mathbb Q(\alpha)/\mathbb Q
$$

は Galois ではありません。

これは FLD2 で見た「$\mathbb Q(\sqrt[3]{2})$ は正規でない」という事実を、群の正規部分群だけから読み直したものです。

### 7.3 有限体：部分体の約数構造が巡回群の部分群になる

FLD3 の

$$
L=\mathbb F_{q^n},
\qquad
F=\mathbb F_q
$$

を考えます。

[有限体拡大は分離的かつ正規](../FLD3/index.md#cor-fld3-finite-extension-separable-normal) なので $L/F$ は有限 Galois 拡大です。

相対 Frobenius

$$
\Phi(x)=x^q
$$

は $F$ を固定し、[相対 Frobenius 自己同型](../FLD3/index.md#thm-fld3-relative-frobenius) から位数は $n$ です。

従って

$$
\langle\Phi\rangle
$$

は $n$ 個の元を持ちます。

一方

$$
|\operatorname{Gal}(L/F)|
=
[L:F]
=
n.
$$

よって

$$
\boxed{
\operatorname{Gal}(\mathbb F_{q^n}/\mathbb F_q)
=
\langle\Phi\rangle
\cong C_n
}.
$$

$d\mid n$ とします。

部分群

$$
H_d=\langle\Phi^d\rangle
$$

の位数は

$$
|H_d|=\frac nd.
$$

その固定体は

$$
x^{q^d}=x
$$

を満たす元全体です。

FLD3 の有限体の一意性から

$$
\boxed{
L^{H_d}
=
\mathbb F_{q^d}
}.
$$

したがって

$$
d\mid n
$$

という整数の約数関係が、そのまま

$$
\mathbb F_{q^d}
\longleftrightarrow
\langle\Phi^d\rangle
$$

という Galois 対応になります。

巡回群の部分群は全て正規なので、有限体の全ての中間拡大

$$
\mathbb F_{q^d}/\mathbb F_q
$$

は Galois です。

### 7.4 $\mathbb Q(i)$ は最小の円分体の例でもある

$i$ は

$$
i^4=1
$$

を満たし、$1,-1$ より小さい正の冪では $1$ にならないので、$4$ 次の原始 1 の根です。

従って

$$
\mathbb Q(i)
$$

は第 $4$ 円分体です。

Galois 群は

$$
i\mapsto i,
\qquad
i\mapsto-i=i^3
$$

の二つで、

$$
(\mathbb Z/4\mathbb Z)^\times
=
\{1,3\}
$$

と対応します。

一般の円分体の詳細はここでは深追いしませんが、「根をどの共役根へ送れるか」が Galois 群を決めるという原理は同じです。

---

## 8. どの仮定が何をしているか

### 8.1 分離性は埋め込みの個数を次数まで増やす

一段拡大

$$
E(\alpha)/E
$$

では、$\alpha$ の像の候補は最小多項式の異なる根です。

重根があると、次数ほど多くの異なる像を選べません。

分離性は

$$
\text{根の個数}
=
\text{最小多項式の次数}
$$

を保証します。

### 8.2 正規性は埋め込みの像を $L$ の中へ戻す

分離的でも

$$
\mathbb Q(\sqrt[3]{2})/\mathbb Q
$$

のように、共役根が拡大体の外にあることがあります。

正規性は

$$
\sigma(L)=L
$$

を保証し、埋め込みを自己同型へ昇格させます。

### 8.3 有限性は固定体定理を有限次元線形代数へ落とす

[Artin の固定体定理](#thm-fld4-artin-fixed-field)では

$$
H=\{\sigma_1,\dots,\sigma_n\}
$$

という有限個の自己同型から、$n\times n$ の評価行列を作ります。

無限群ではこの有限行列の議論はそのまま使えません。

無限 Galois 理論では位相が必要になり、これが本章の停止線です。

### 8.4 正規部分群は「中間体が全 Galois 対称性で保たれる」ことを表す

$$
H\triangleleft G
$$

なら

$$
\sigma H\sigma^{-1}=H
$$

なので、固定体も

$$
\sigma(L^H)=L^H
$$

です。

群側の共役不変性が、体側の正規性へ翻訳されます。

---

## 9. 演習

### Level A

#### FLD4-A01 $\mathbb Q(\sqrt5)$ の自己同型と固定体
- Level: A

$$
L=\mathbb Q(\sqrt5)
$$

とする。

1. $\mathbb Q$ を固定する $L$ の自己同型を全て求めよ。
2. Galois 群の位数を求め、$[L:\mathbb Q]$ と比較せよ。
3. Galois 群全体の固定体を求めよ。

<!-- solution-start -->
##### 詳細解答

1. $\sqrt5$ の最小多項式は

$$
x^2-5.
$$

自己同型 $\sigma$ は多項式関係を保つので

$$
\sigma(\sqrt5)
$$

も $x^2-5$ の根です。

従って

$$
\sigma(\sqrt5)\in\{\sqrt5,-\sqrt5\}.
$$

実際、

$$
\sigma_+(a+b\sqrt5)=a+b\sqrt5,
$$

$$
\sigma_-(a+b\sqrt5)=a-b\sqrt5
$$

はどちらも $\mathbb Q$ を固定する体自己同型です。

よって

$$
\boxed{
\operatorname{Gal}(L/\mathbb Q)
=
\{\sigma_+,\sigma_-\}
}.
$$

2. 位数は

$$
|\operatorname{Gal}(L/\mathbb Q)|=2.
$$

一方

$$
[L:\mathbb Q]=2.
$$

従って

$$
\boxed{
|\operatorname{Gal}(L/\mathbb Q)|
=
[L:\mathbb Q]
=
2
}.
$$

3. 元

$$
x=a+b\sqrt5
$$

が Galois 群全体で固定されるには特に

$$
\sigma_-(x)=x
$$

が必要です。

すなわち

$$
a-b\sqrt5=a+b\sqrt5.
$$

従って

$$
2b\sqrt5=0
$$

なので $b=0$ です。

よって

$$
\boxed{
L^{\operatorname{Gal}(L/\mathbb Q)}
=
\mathbb Q
}.
$$
<!-- solution-end -->

#### FLD4-A02 $\mathbb F_{16}/\mathbb F_2$ の Galois 群
- Level: A

$$
L=\mathbb F_{16},
\qquad
F=\mathbb F_2
$$

とする。

1. $\Phi(x)=x^2$ の位数を求めよ。
2. $\operatorname{Gal}(L/F)$ を求めよ。
3. 位数 $2$ の部分群を一つ求め、その固定体を同定せよ。

<!-- solution-start -->
##### 詳細解答

1. $16=2^4$ なので、FLD3 の[相対 Frobenius 自己同型](../FLD3/index.md#thm-fld3-relative-frobenius)から

$$
\Phi(x)=x^2
$$

の位数は

$$
\boxed4.
$$

直接には

$$
\Phi^4(x)=x^{16}=x
$$

が全ての $x\in L$ で成り立ち、$\Phi^2(x)=x^4$ の固定体は $\mathbb F_4$ なので $\Phi^2$ は恒等写像ではありません。

2. $L/F$ は有限 Galois 拡大で

$$
[L:F]=4.
$$

従って

$$
|\operatorname{Gal}(L/F)|=4.
$$

$\langle\Phi\rangle$ も位数 $4$ なので

$$
\boxed{
\operatorname{Gal}(L/F)
=
\langle\Phi\rangle
\cong C_4
}.
$$

3. 巡回群 $C_4$ の位数 $2$ の部分群は

$$
H=\langle\Phi^2\rangle.
$$

$\Phi^2(x)=x^4$ なので固定体は

$$
L^H
=
\{x\in L:x^4=x\}.
$$

FLD3 の有限体の構成からこれは

$$
\boxed{\mathbb F_4}
$$

です。
<!-- solution-end -->

#### FLD4-A03 二重二次拡大の一つの固定体
- Level: A

$$
L=\mathbb Q(\sqrt2,\sqrt3)
$$

とし、

$$
\tau(\sqrt2)=-\sqrt2,
\qquad
\tau(\sqrt3)=-\sqrt3
$$

とする。

1. $\tau^2=1$ を示せ。
2. $\sqrt6$ が $\tau$ で固定されることを示せ。
3. $L^{\langle\tau\rangle}=\mathbb Q(\sqrt6)$ を次数を用いて示せ。

<!-- solution-start -->
##### 詳細解答

1. $\tau$ を二回作用させると

$$
\tau^2(\sqrt2)=\sqrt2,
\qquad
\tau^2(\sqrt3)=\sqrt3.
$$

$L$ は $\sqrt2,\sqrt3$ で $\mathbb Q$ 上生成されるので

$$
\boxed{\tau^2=\operatorname{id}_L}.
$$

2.

$$
\tau(\sqrt6)
=
\tau(\sqrt2\sqrt3)
=
\tau(\sqrt2)\tau(\sqrt3)
=
(-\sqrt2)(-\sqrt3)
=
\sqrt6.
$$

従って

$$
\mathbb Q(\sqrt6)
\subset
L^{\langle\tau\rangle}.
$$

3. $\langle\tau\rangle$ の位数は $2$ です。

[Artin の固定体定理](#thm-fld4-artin-fixed-field)から

$$
[L:L^{\langle\tau\rangle}]
=
2.
$$

一方

$$
[L:\mathbb Q]=4
$$

なので塔の公式から

$$
[L^{\langle\tau\rangle}:\mathbb Q]
=
\frac42
=
2.
$$

また

$$
[\mathbb Q(\sqrt6):\mathbb Q]=2.
$$

包含と次数が一致するため

$$
\boxed{
L^{\langle\tau\rangle}
=
\mathbb Q(\sqrt6)
}.
$$
<!-- solution-end -->

#### FLD4-A04 $S_3$ 型 Galois 群から中間体の次数を読む
- Level: A

有限 Galois 拡大 $L/F$ が

$$
\operatorname{Gal}(L/F)\cong S_3
$$

を満たすとする。

1. 位数 $3$ の部分群 $H$ に対応する固定体 $E=L^H$ について $[E:F]$ を求めよ。
2. 位数 $2$ の部分群 $K$ に対応する固定体 $M=L^K$ について $[M:F]$ を求めよ。
3. $H$ は正規部分群であるが、一般に位数 $2$ の部分群は正規でないことから、対応する中間拡大の Galois 性を判定せよ。

<!-- solution-start -->
##### 詳細解答

1. $|S_3|=6$ です。

Galois 対応から

$$
[E:F]
=
[G:H]
=
\frac63
=
\boxed2.
$$

2. 同様に

$$
[M:F]
=
[G:K]
=
\frac62
=
\boxed3.
$$

3. $S_3$ の位数 $3$ の部分群は

$$
A_3
$$

であり、指数 $2$ の部分群なので正規です。

従って正規部分群対応から

$$
\boxed{E/F\text{ は Galois}}.
$$

一方、例えば一つの互換が生成する位数 $2$ の部分群は、別の互換による共役で他の位数 $2$ 部分群へ移るため正規ではありません。

従って対応する三次中間体について

$$
\boxed{M/F\text{ は一般に Galois ではない}}.
$$
<!-- solution-end -->

### Level B

#### FLD4-B01 $\mathbb Q(\sqrt2,\sqrt3)$ の Galois 対応を全部書く
- Level: B

$$
L=\mathbb Q(\sqrt2,\sqrt3),
\qquad
F=\mathbb Q
$$

とする。

1. $G=\operatorname{Gal}(L/F)$ が $C_2\times C_2$ と同型であることを示せ。
2. $G$ の全部分群を列挙せよ。
3. 各部分群の固定体を求めよ。
4. 各中間体が $F$ 上 Galois であることを説明せよ。

<!-- solution-start -->
##### 詳細解答

1. 自己同型は $\sqrt2,\sqrt3$ をそれぞれ独立に符号反転できます。

$$
a:
(\sqrt2,\sqrt3)\mapsto(-\sqrt2,\sqrt3),
$$

$$
b:
(\sqrt2,\sqrt3)\mapsto(\sqrt2,-\sqrt3).
$$

すると

$$
a^2=b^2=1,
\qquad
ab=ba.
$$

四つの写像

$$
1,\ a,\ b,\ ab
$$

は $\sqrt2,\sqrt3$ への作用が異なるため相異なります。

また

$$
[L:F]=4
$$

なので Galois 群の位数は $4$ です。

従って

$$
\boxed{
G=\{1,a,b,ab\}
\cong C_2\times C_2
}.
$$

2. 全部分群は

$$
\{1\},
$$

$$
\langle a\rangle,
\qquad
\langle b\rangle,
\qquad
\langle ab\rangle,
$$

$$
G
$$

の五つです。

3. 端点は

$$
L^{\{1\}}=L,
\qquad
L^G=F.
$$

また $a$ は $\sqrt3$ を固定するので

$$
F(\sqrt3)
\subset L^{\langle a\rangle}.
$$

固定体の $F$ 上次数は

$$
[G:\langle a\rangle]
=
2.
$$

$F(\sqrt3)$ も次数 $2$ なので

$$
L^{\langle a\rangle}
=
F(\sqrt3).
$$

同様に

$$
L^{\langle b\rangle}
=
F(\sqrt2).
$$

さらに $ab$ は

$$
\sqrt6=\sqrt2\sqrt3
$$

を固定するので

$$
L^{\langle ab\rangle}
=
F(\sqrt6).
$$

従って対応は

$$
\boxed{
\begin{array}{ccl}
\{1\}&\longleftrightarrow&L,\\
\langle a\rangle&\longleftrightarrow&F(\sqrt3),\\
\langle b\rangle&\longleftrightarrow&F(\sqrt2),\\
\langle ab\rangle&\longleftrightarrow&F(\sqrt6),\\
G&\longleftrightarrow&F.
\end{array}
}
$$

です。

4. $G$ は可換群なので、全ての部分群が正規です。

正規部分群対応から全ての中間体 $E$ について

$$
E/F
$$

は Galois です。

特に三つの二次中間体は全て二次 Galois 拡大です。
<!-- solution-end -->

#### FLD4-B02 $x^3-2$ の分解体と正規部分群
- Level: B

$$
\alpha=\sqrt[3]{2},
\qquad
\omega^2+\omega+1=0,\quad\omega\ne1,
$$

$$
L=\mathbb Q(\alpha,\omega)
$$

とする。

$$
r(\alpha)=\omega\alpha,\quad r(\omega)=\omega,
$$

$$
s(\alpha)=\alpha,\quad s(\omega)=\omega^2
$$

と定める。

1. $r^3=s^2=1$ と $srs=r^{-1}$ を確認せよ。
2. $G=\operatorname{Gal}(L/\mathbb Q)$ が $S_3$ と同型であることを示せ。
3. $L^{\langle r\rangle}$ と $L^{\langle s\rangle}$ を求めよ。
4. 二つの固定体のうち、$\mathbb Q$ 上 Galois なのはどちらか判定せよ。

<!-- solution-start -->
##### 詳細解答

1.

$$
r^3(\alpha)
=
\omega^3\alpha
=
\alpha,
\qquad
r^3(\omega)=\omega
$$

なので

$$
r^3=1.
$$

また

$$
s^2(\alpha)=\alpha,
\qquad
s^2(\omega)=\omega
$$

なので

$$
s^2=1.
$$

次に $\alpha$ へ作用させます。

$$
srs(\alpha)
=
sr(\alpha)
=
s(\omega\alpha)
=
\omega^2\alpha.
$$

一方

$$
r^{-1}(\alpha)
=
r^2(\alpha)
=
\omega^2\alpha.
$$

$\omega$ については

$$
srs(\omega)
=
sr(\omega^2)
=
s(\omega^2)
=
\omega,
$$

$$
r^{-1}(\omega)=\omega.
$$

$L$ は $\alpha,\omega$ で生成されるので

$$
\boxed{srs=r^{-1}}.
$$

2. 六つ

$$
1,\ r,\ r^2,\ s,\ rs,\ r^2s
$$

は $\alpha,\omega$ への作用が異なるため相異なります。

従って $\langle r,s\rangle$ は少なくとも六元を持ちます。

一方 $L/\mathbb Q$ は $x^3-2$ の分解体で

$$
[L:\mathbb Q]=6.
$$

標数 $0$ なので有限 Galois 拡大であり、

$$
|G|=6.
$$

よって

$$
G=\langle r,s\rangle.
$$

三根

$$
\alpha,\quad\omega\alpha,\quad\omega^2\alpha
$$

への作用を見ると、$r$ は三つを巡回させる 3-巡回置換で、$s$ は $\alpha$ を固定して残り二根を交換する互換です。

この二つの置換は $S_3$ を生成します。

一方、すでに $G$ は六元であることを示したので、この三根への作用

$$
G\to S_3
$$

は六元群から六元群への全射です。

従って全単射であり、

$$
\boxed{G\cong S_3}.
$$

3. $r$ は $\omega$ を固定します。

従って

$$
\mathbb Q(\omega)
\subset L^{\langle r\rangle}.
$$

固定体の次数は

$$
[G:\langle r\rangle]
=
\frac63
=
2.
$$

$\mathbb Q(\omega)$ も二次拡大なので

$$
\boxed{
L^{\langle r\rangle}
=
\mathbb Q(\omega)
}.
$$

一方 $s$ は $\alpha$ を固定します。

$$
\mathbb Q(\alpha)
\subset L^{\langle s\rangle}.
$$

固定体の次数は

$$
[G:\langle s\rangle]
=
\frac62
=
3.
$$

$x^3-2$ は [Eisenstein の既約判定](../RNG4/index.md#thm-rng4-eisenstein)から $\mathbb Q$ 上既約なので

$$
[\mathbb Q(\alpha):\mathbb Q]=3.
$$

従って

$$
\boxed{
L^{\langle s\rangle}
=
\mathbb Q(\alpha)
}.
$$

4. $\langle r\rangle$ は $S_3$ の位数 $3$ の唯一の部分群であり正規です。

よって

$$
\boxed{
\mathbb Q(\omega)/\mathbb Q
\text{ は Galois}
}.
$$

一方 $\langle s\rangle$ は三つある位数 $2$ 部分群の一つで、共役により他の位数 $2$ 部分群へ移るため正規ではありません。

従って

$$
\boxed{
\mathbb Q(\alpha)/\mathbb Q
\text{ は Galois ではない}
}.
$$
<!-- solution-end -->

#### FLD4-B03 $\mathbb F_{2^{12}}/\mathbb F_2$ の中間体を Galois 対応で再構成する
- Level: B

$$
L=\mathbb F_{2^{12}},
\qquad
F=\mathbb F_2,
$$

$$
\Phi(x)=x^2
$$

とする。

1. $G=\operatorname{Gal}(L/F)$ を求めよ。
2. $G$ の部分群の位数として可能なものを全て求めよ。
3. 全中間体を求めよ。
4. 全ての中間拡大 $E/F$ が Galois であることを示せ。

<!-- solution-start -->
##### 詳細解答

1. 相対 Frobenius $\Phi$ の位数は

$$
12
$$

です。

また

$$
[L:F]=12.
$$

従って

$$
|\operatorname{Gal}(L/F)|=12.
$$

$\langle\Phi\rangle$ も位数 $12$ なので

$$
\boxed{
G=\langle\Phi\rangle\cong C_{12}
}.
$$

2. 巡回群 $C_{12}$ は $12$ の各正の約数に対して、その位数を持つ部分群をちょうど一つ持ちます。

$12$ の正の約数は

$$
1,2,3,4,6,12.
$$

従って部分群の位数は

$$
\boxed{1,2,3,4,6,12}.
$$

3. 中間体 $E$ に対応する部分群 $H$ について

$$
[E:F]
=
[G:H]
=
\frac{12}{|H|}.
$$

従って可能な中間体の $F$ 上次数も

$$
1,2,3,4,6,12
$$

です。

FLD3 の[有限体の部分体判定](../FLD3/index.md#thm-fld3-subfield-criterion)から、対応する中間体は

$$
\boxed{
\mathbb F_2,\ 
\mathbb F_{2^2},\
\mathbb F_{2^3},\
\mathbb F_{2^4},\
\mathbb F_{2^6},\
\mathbb F_{2^{12}}
}.
$$

より具体的に $d\mid12$ に対し

$$
\mathbb F_{2^d}
=
L^{\langle\Phi^d\rangle}.
$$

実際 $\Phi^d(x)=x^{2^d}$ なので固定条件は

$$
x^{2^d}=x.
$$

4. $G$ は巡回群なので可換です。

従って全ての部分群が正規です。

正規部分群対応から、全ての中間体 $E$ に対して

$$
\boxed{E/F\text{ は Galois}}.
$$
<!-- solution-end -->

### Level C

#### FLD4-C01 二つの Galois 拡大で「部分群の形が体の形を決める」ことを比較する
- Level: C

次の二つの有限 Galois 拡大を考える。

**拡大 A**

$$
L=\mathbb Q(\alpha,\omega),
\qquad
\alpha=\sqrt[3]{2},
\qquad
\omega^2+\omega+1=0,\ \omega\ne1.
$$

**拡大 B**

$$
K=\mathbb F_{64},
\qquad
k=\mathbb F_2.
$$

1. $\operatorname{Gal}(L/\mathbb Q)\cong S_3$、$\operatorname{Gal}(K/k)\cong C_6$ を示せ。
2. 拡大 A について、位数 $3$ の部分群と一つの位数 $2$ 部分群の固定体を求め、それぞれ $\mathbb Q$ 上 Galois か判定せよ。
3. 拡大 B の全中間体を求め、全てが $k$ 上 Galois であることを示せ。
4. 「同じ位数 $6$ の Galois 群でも、群が $S_3$ か $C_6$ かで中間体の正規性が違う」ことを、正規部分群の観点から説明せよ。
5. 拡大 A で $E=\mathbb Q(\omega)$ としたとき、制限写像を用いて
   $$
   \operatorname{Gal}(E/\mathbb Q)
   \cong
   \operatorname{Gal}(L/\mathbb Q)/\operatorname{Gal}(L/E)
   $$
   を具体的に確認せよ。

<!-- solution-start -->
##### 詳細解答

1. 拡大 A では $L$ は $x^3-2$ の分解体です。

FLD2 で

$$
[L:\mathbb Q]=6
$$

を求めました。

標数 $0$ なので分離的で、分解体なので正規です。

従って

$$
|\operatorname{Gal}(L/\mathbb Q)|=6.
$$

自己同型

$$
r:
\alpha\mapsto\omega\alpha,\quad \omega\mapsto\omega,
$$

$$
s:
\alpha\mapsto\alpha,\quad \omega\mapsto\omega^2
$$

は

$$
r^3=s^2=1,
\qquad
srs=r^{-1}
$$

を満たし、六つの元

$$
1,r,r^2,s,rs,r^2s
$$

を与えます。

従って

$$
\boxed{
\operatorname{Gal}(L/\mathbb Q)\cong S_3
}.
$$

拡大 B では

$$
64=2^6.
$$

相対 Frobenius

$$
\Phi(x)=x^2
$$

の位数は $6$ です。

また

$$
[K:k]=6
$$

なので

$$
|\operatorname{Gal}(K/k)|=6.
$$

従って

$$
\boxed{
\operatorname{Gal}(K/k)
=
\langle\Phi\rangle
\cong C_6
}.
$$

2. 拡大 A の位数 $3$ の部分群は

$$
H_3=\langle r\rangle.
$$

$r$ は $\omega$ を固定するので

$$
\mathbb Q(\omega)
\subset L^{H_3}.
$$

固定体の次数は

$$
[S_3:H_3]=2.
$$

$\mathbb Q(\omega)$ も $\mathbb Q$ 上二次なので

$$
\boxed{
L^{H_3}=\mathbb Q(\omega)
}.
$$

$H_3=A_3$ は正規部分群です。

従って

$$
\boxed{
\mathbb Q(\omega)/\mathbb Q
\text{ は Galois}
}.
$$

次に位数 $2$ の部分群

$$
H_2=\langle s\rangle
$$

を取ります。

$s$ は $\alpha$ を固定するので

$$
\mathbb Q(\alpha)\subset L^{H_2}.
$$

固定体の次数は

$$
[S_3:H_2]=3.
$$

また $x^3-2$ は $\mathbb Q$ 上既約だから

$$
[\mathbb Q(\alpha):\mathbb Q]=3.
$$

従って

$$
\boxed{
L^{H_2}=\mathbb Q(\alpha)
}.
$$

$H_2$ は正規ではないため

$$
\boxed{
\mathbb Q(\alpha)/\mathbb Q
\text{ は Galois ではない}
}.
$$

3. $C_6$ の部分群は、各約数の位数ごとに一つずつあります。

従って中間体の $k$ 上次数は

$$
1,2,3,6.
$$

[有限体の部分体判定](../FLD3/index.md#thm-fld3-subfield-criterion)から

$$
\boxed{
k=\mathbb F_2,\quad
\mathbb F_4,\quad
\mathbb F_8,\quad
K=\mathbb F_{64}
}
$$

が全中間体です。

具体的には

$$
\mathbb F_4
=
K^{\langle\Phi^2\rangle},
$$

なぜなら $\Phi^2(x)=x^4$ で、固定条件が $x^4=x$ だからです。

同様に

$$
\mathbb F_8
=
K^{\langle\Phi^3\rangle}.
$$

$C_6$ は可換群なので全ての部分群が正規です。

従って全ての中間体 $E$ について

$$
\boxed{E/k\text{ は Galois}}.
$$

4. 両方の Galois 群は位数 $6$ ですが、部分群の共役構造が違います。

$S_3$ では位数 $2$ の部分群が三つあり、互いに共役で、一つずつは正規ではありません。

したがってそれらに対応する三次中間体は基礎体上正規ではなく、Galois ではありません。

一方 $C_6$ は可換なので全ての部分群が正規です。

従って全ての中間体が基礎体上 Galois です。

つまり Galois 対応は、単に中間体の個数を数えるだけでなく、

$$
\boxed{
\text{部分群が正規}
\longleftrightarrow
\text{中間拡大の Galois 性}
}
$$

まで読み取ります。

5.

$$
E=\mathbb Q(\omega),
\qquad
H=\operatorname{Gal}(L/E)=\langle r\rangle=A_3.
$$

制限写像

$$
\rho:
G\to\operatorname{Gal}(E/\mathbb Q)
$$

を考えます。

$r$ は $\omega$ を固定するので

$$
\rho(r)=\operatorname{id}_E.
$$

従って

$$
H\subset\ker\rho.
$$

逆に $\sigma\in G$ が $E$ を各点で固定するなら、定義から

$$
\sigma\in\operatorname{Gal}(L/E)=H.
$$

よって

$$
\ker\rho=H.
$$

一方、$s$ は

$$
s(\omega)=\omega^2
$$

と非自明な $\mathbb Q$-自己同型を与えます。

$\operatorname{Gal}(E/\mathbb Q)$ は二次 Galois 拡大の Galois 群なので位数 $2$ です。

従って $\rho$ の像は恒等写像と $s|_E$ の二つを含み、全射です。

[群の第一同型定理](../GRP2/index.md#thm-grp2-first-isomorphism)から

$$
\operatorname{Gal}(E/\mathbb Q)
\cong
G/H.
$$

すなわち

$$
\boxed{
\operatorname{Gal}(\mathbb Q(\omega)/\mathbb Q)
\cong
S_3/A_3
\cong
C_2
}.
$$
<!-- solution-end -->

---

## 10. まとめ

本章の主線は次の通りです。

1. 体拡大 $L/F$ の基礎体 $F$ を固定する自己同型全体 $\operatorname{Aut}_F(L)$ は群をなす。
2. 自己同型群の部分群 $H$ に対し、全ての $H$ の元で固定される元全体 $L^H$ は中間体をなす。
3. 有限・分離・正規を同時に満たす拡大を有限 Galois 拡大と呼び、その基礎体固定自己同型群を Galois 群と呼ぶ。
4. 有限分離拡大 $L/F$ では、代数閉包への $F$ を固定する埋め込みがちょうど $[L:F]$ 個存在する。
5. 正規性を加えると全ての埋め込みが $L$ 自身へ戻るので、有限 Galois 拡大では
   $$
   |\operatorname{Gal}(L/F)|=[L:F]
   $$
   となる。
6. [Artin の独立性](#lem-fld4-artin-independence)から、有限自己同型群 $H$ に対して
   $$
   [L:L^H]=|H|
   $$
   が従い、さらに $\operatorname{Gal}(L/L^H)=H$ となる。
7. [有限 Galois 理論の基本定理](#thm-fld4-fundamental-galois)により、中間体 $E$ と部分群 $\operatorname{Gal}(L/E)$ は包含反転で一対一対応する。
8. 対応する $E$ と $H$ について
   $$
   [L:E]=|H|,
   \qquad
   [E:F]=[G:H]
   $$
   が成り立つ。
9. $H\triangleleft G$ と $E/F$ が Galois であることは同値で、そのとき
   $$
   \operatorname{Gal}(E/F)\cong G/H.
   $$
10. $x^3-2$ の分解体では $S_3$ の非正規部分群が非正規な三次中間体を生み、有限体では巡回 Galois 群の全部分群が正規なので全中間拡大が Galois になる。

次の FLD5 では、この対応を定規とコンパスによる作図可能性、可解群、根号による可解性へ使います。
