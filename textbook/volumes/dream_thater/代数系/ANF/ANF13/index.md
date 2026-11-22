# ANF13 局所拡大と Galois 分岐群

[ANF11 の分岐指数・剰余次数](../ANF11/index.md#def-anf11-e-f)と[ANF12 の単数フィルトレーション](../ANF12/index.md#def-anf12-unit-filtration)によって、局所拡大の算術を整数環と付値から測れるようになりました。しかし $e=2$ という数字だけでは、$\mathbb Q_5(\sqrt5)$ と $\mathbb Q_2(\sqrt2)$ の違いを説明できません。前者の異なる指数は $1$、後者は $3$ でした（[単項生成の整数環の異なる公式](../ANF11/index.md#thm-anf11-monogenic-different)）。この差はどこから生まれるのでしょうか。

拡大体の自己同型が剰余体や一様化元をどの程度動かすかを調べます。剰余体を動かさない自己同型をまず集め、次に「一様化元を法 $\pi^2,\pi^3,\ldots$ まで動かさない」という段階を作ります。ここから異なる指数まで計算できるようになります。

以下、$p$ は素数、$K/\mathbb Q_p$ は有限拡大、**$L/K$ は有限 Galois 拡大**とします。$G=\operatorname{Gal}(L/K)$、$n=[L:K]$ です。[有限 Galois 拡大の定義](../../FLD/FLD4/index.md#def-fld4-finite-galois)によって $|G|=n$ です。整数環を $A=\mathcal O_L$, $B=\mathcal O_K$、極大イデアルを $\mathfrak m_L=(\pi)$, $\mathfrak m_K$、剰余体を $k_L,k_K$ とします。付値は $v_L(\pi)=1$ に規格化し、$q=|k_K|=p^{f(K/\mathbb Q_p)}$ と置きます。

[局所体の整数環が離散付値環になる定理](../ANF11/index.md#thm-anf11-local-dvr)とその証明は、$\mathbb Q_p$ 上だけでなく有限拡大 $K$ を基礎体としても適用できます。[局所次数公式](../ANF11/index.md#thm-anf11-ef-degree)により

$$
n=e f,\qquad e=v_L(\varpi_K),\qquad f=[k_L:k_K]
$$

です。ここで $\varpi_K$ は $K$ の一様化元です。以下では常にこの**一つの局所素点**について議論します。

<!-- definition-example-audit: strict -->

## 1. 剰余体の上で何が動くか

$G$ の元 $\sigma$ は $K$ の元を固定し、$L$ の付値を保ちます。これをまず確認します。$\sigma$ が $A$ の整元を整元へ移すので $\sigma(A)=A$、唯一の極大イデアルも自身へ移すから $\sigma(\mathfrak m_L)=\mathfrak m_L$ です。一様化元の冪による表示から $v_L(\sigma x)=v_L(x)$ が従います。

したがって $\sigma$ は剰余体に自己同型 $\bar\sigma:k_L\to k_L$ を誘導し、その自己同型は $k_K$ の元を固定します。**剰余体を動かさない**という条件が最初の群を決めます。

<a id="def-anf13-inertia"></a>

<!-- formal-statement-start -->
> **定義（惰性群）**  
> 有限 Galois 局所拡大 $L/K$ の剰余体への作用を
>
$$
\rho:G\longrightarrow\operatorname{Gal}(k_L/k_K),
\qquad
\rho(\sigma)(\bar a)=\overline{\sigma(a)}
$$
>
> とする。核
>
$$
I=G_0=\ker\rho
=\{\sigma\in G:\sigma(a)-a\in\mathfrak m_L
\text{ for every }a\in A\}
$$
>
> を **惰性群**という。
<!-- formal-statement-end -->

<!-- definition-example-start: def-anf13-inertia -->
**定義の確認**：$L=\mathbb Q_3(i)$、$i^2=-1$ では、[非分岐二次拡大の計算](../ANF11/index.md#def-anf11-e-f)より $k_L=\mathbb F_9$, $k_K=\mathbb F_3$, $e=1,f=2$ です。非自明な自己同型 $\sigma$ は $i\mapsto-i$ と写します。$\bar i^3=-\bar i$ なので、剰余体上でも $\bar i$ を動かします。したがって $\sigma\notin I$、この例の惰性群は $\{1\}$ です。

対照的に $L=\mathbb Q_5(\sqrt5)$ では $k_L=k_K=\mathbb F_5$ です。任意の自己同型はその剰余体を固定するので、$I=G=\{1,\sigma\}$、$\sigma(\sqrt5)=-\sqrt5$ です。剰余体を動かさなくても一様化元を動かすことが分かります。
<!-- definition-example-end -->

ここで「$\rho$ の像が剰余体の Galois 群全体か」を確かめる必要があります。核の位数が $e$ になるのは、この全射性によります。

<a id="thm-anf13-inertia-exact"></a>

<!-- formal-statement-start -->
> **定理（惰性群と剰余次数の完全列）**  
> 有限 Galois 局所拡大 $L/K$ に対し、剰余写像 $\rho$ は全射であり、次の群の完全列がある。
>
$$
1\longrightarrow I\longrightarrow G
\xrightarrow{\rho}\operatorname{Gal}(k_L/k_K)
\longrightarrow1.
$$
>
> 特に $\operatorname{Gal}(k_L/k_K)$ は $q$ 乗 Frobenius 写像 $\bar x\mapsto\bar x^q$ が生成する位数 $f$ の巡回群で、
>
$$
|G/I|=f,\qquad |I|=e,\qquad |G|=ef.
$$
<!-- formal-statement-end -->

### 証明の見取り図

剰余体 $k_L/k_K$ の生成元を Hensel の補題で $A$ に持ち上げ、$K$ 上の非分岐中間体 $K_0$ を作ります。$K_0/K$ の自己同型は $L/K$ の自己同型へ拡張できるため、剰余写像の全射性が従います。

<!-- proof-start -->
### 証明

**(1) 剰余体の生成元を持ち上げる。** [有限体の乗法群が巡回であることの証明](../ANF12/index.md#lem-anf12-finite-field-maps)を $k_L=\mathbb F_{q^f}$ に用い、乗法群の生成元 $\bar\theta$ を選びます。$k_L^\times$ の全元は $\bar\theta$ の冪なので、$k_L=k_K(\bar\theta)$ です。$\bar\theta$ の $k_K$ 上最小多項式を $\bar h(X)\in k_K[X]$ とすると、次数は $f$、有限体拡大は分離的なので相異なる根 $\bar\theta,\bar\theta^q,\ldots,\bar\theta^{q^{f-1}}$ を $k_L$ に持ちます。

係数を $B$ に持ち上げたモニック多項式 $h(X)\in B[X]$ を選びます。ここで $h'$ は多項式変数 $X$ に関する形式的導関数です。各剰余根で $\bar h'(\bar\theta^{q^j})\ne0$ だから、[単純根に対する Hensel の補題](../ANF10/index.md#thm-anf10-hensel-simple)の証明を、$\mathbb Z_p$ の代わりに完備離散付値環 $A$ で繰り返せます。剰余根の代表 $x_0\in A$ から始め、$h'(x_m)\in A^\times$ のもとで

$$
x_{m+1}=x_m-\frac{h(x_m)}{h'(x_m)},\qquad
h(x_m+t)=h(x_m)+t h'(x_m)+t^2R_m(t)
$$

と置きます。ここで $R_m(t)\in A$ は多項式の二次以上の剰余項です。$t=-h(x_m)/h'(x_m)\in\mathfrak m_L$ を代入すると $v_L(h(x_{m+1}))\ge2v_L(h(x_m))$ です。導関数は各段階で同じ非零剰余を持ち、補正量の付値は増大するので、$A$ の完備性から各剰余根に一致する唯一の根 $\theta_j\in A$ へ収束します。

これら $f$ 個の根は剰余が相異なるので $L$ でも相異なり、$\deg h=f$ ゆえ $h$ は $L$ で完全分解します。$\theta=\theta_0$、$K_0=K(\theta)$ と置きます。$h$ は法 $\mathfrak m_K$ で既約ですから $K$ 上でも既約で、$[K_0:K]=f$ です。

**(2) $K_0/K$ は Galois かつ非分岐。** $h$ の他の根は $K_0$ にも入ります。実際、$K_0$ の剰余体は $\bar\theta$ を含むので $k_L$ 全体です。

$K_0/K$ の次数がすでに $f$ であるため、[次数公式](../ANF11/index.md#thm-anf11-ef-degree)により $e(K_0/K)=1$、$k_{K_0}=k_L$ です。

完備な整数環 $\mathcal O_{K_0}$ に Hensel の一意性を適用すると、すべての根 $\theta_j$ は $K_0$ 内にあります。したがって $h$ は $K_0$ で分解し、分離的な $K_0/K$ は Galois です。

$K_0/K$ の $f$ 個の自己同型は、それぞれ $\bar\theta\mapsto\bar\theta^{q^j}$ を誘導します。したがって剰余体への写像は位数 $f$ の同型で、特に Frobenius を持ち上げる自己同型が存在します。

**(3) 自己同型を $L$ まで延長する。** $L/K$ は Galois、$K_0/K$ も Galois です。[有限 Galois 理論の正規部分群と制限準同型](../../FLD/FLD4/index.md#thm-fld4-normal-subgroup-correspondence)を $K\subset K_0\subset L$ に適用すると、制限写像 $G\to\operatorname{Gal}(K_0/K)$ は全射です。剰余体への作用はこの制限で決まるので、$\rho$ も全射です。

**(4) 位数。** 核は定義により $I$ です。[Galois 群の位数公式](../../FLD/FLD4/index.md#cor-fld4-galois-order-degree)で $|G|=n$、有限体の Galois 群の位数は $f$ だから $|I|=n/f=e$。完全列と三つの位数が従います。
<!-- proof-end -->

この $K_0$ は $L$ の最大非分岐中間体です。まず $I$ の元を $K_0$ に制限すると、$k_{K_0}=k_L$ に自明に作用します。上で構成した $\operatorname{Gal}(K_0/K)\simeq\operatorname{Gal}(k_L/k_K)$ は単射なので、$I$ は $K_0$ を固定します。$[L^I:K]=|G/I|=f=[K_0:K]$ と合わせて $K_0=L^I$ です。

さらに任意の非分岐中間体 $K\subset E\subset L$ について、$k_E/k_K$ の生成元 $\bar u$ の最小多項式 $\bar g\in k_K[X]$ を取り、係数を $B$ に持ち上げます。$\bar g$ は分離的なので、その単純根 $\bar u$ は Hensel の一意性により $\mathcal O_E$ と $\mathcal O_{K_0}$ の双方で同じ根 $u\in L$ に持ち上がります。$[K(u):K]=[k_E:k_K]=[E:K]$ は非分岐性と次数公式によるので、$E=K(u)\subseteq K_0$ です。

## 2. 一様化元は何桁まで固定されるか

惰性群の元は剰余体の各元を固定します。しかし $\pi$ をどれだけ近く固定するかは様々です。$v_L(\sigma(\pi)-\pi)$ が大きいほど、$\sigma$ は $\pi$ をより深い桁まで変えません。

まず、$K_0$ 上で $\pi$ が整数環を生成することを示します。これは「一様化元を調べるだけで、整数環の全元を調べたことになる」という橋渡しです。

<a id="lem-anf13-monogenic"></a>

<!-- formal-statement-start -->
> **補題（全分岐部分の一様化元基底）**  
> 上の最大非分岐中間体 $K_0=L^I$ に対し、$L/K_0$ は次数 $e$ の全分岐 Galois 拡大である。任意の一様化元 $\pi\in A$ について、その $K_0$ 上最小多項式は Eisenstein であり、
>
$$
A=\mathcal O_{K_0}[\pi]
=\bigoplus_{j=0}^{e-1}\mathcal O_{K_0}\pi^j.
$$
<!-- formal-statement-end -->

### 証明の見取り図

$L/K_0$ の剰余次数は $1$、分岐指数は $e$ です。$\pi$ の冪 $1,\pi,\ldots,\pi^{e-1}$ は、付値を $e$ で割った余りが異なります。これにより足し算で最低付値が消えることを防ぎます。

<!-- proof-start -->
### 証明

$K_0=L^I$ なので [Galois 対応](../../FLD/FLD4/index.md#thm-fld4-fundamental-galois)から $[L:K_0]=|I|=e$ です。剰余体は共に $k_L$、従って $f(L/K_0)=1$、$e(L/K_0)=e$ です。

$v_L(\pi)=1$ なので、$K_0(\pi)/K_0$ の分岐指数は少なくとも $e$ です。実際、$K_0(\pi)$ 上の付値を規格化すると $v_L|_{K_0}=e v_{K_0}$ であり、$\pi$ の付値が $1$ なので値群は整数全体になります。従って次数公式で $[K_0(\pi):K_0]\ge e$、一方この体は $L$ に含まれるので次数は $e$ に等しく、$L=K_0(\pi)$ です。

$\pi$ の最小多項式は $F(X)=\prod_{\sigma\in I}(X-\sigma\pi)$ です。各共役は付値 $1$ です。$X^{e-j}$ の係数は付値 $j$ 以上の積の和なので、$1\le j<e$ では付値が正であり、しかも $K_0$ に属するから $v_{K_0}\ge1$ です。定数項は積なので $v_L=e$、従って $v_{K_0}=1$ です。これが Eisenstein 条件です。

任意の $x\in L$ は一意に $x=\sum_{j=0}^{e-1}a_j\pi^j$（$a_j\in K_0$）と書けます。零でない各項の付値は

$$
v_L(a_j\pi^j)=e\,v_{K_0}(a_j)+j.
$$

異なる $j$ は $e$ を法として異なるので最小付値の項は一つだけです。[非Archimedes 付値の和の規則](../ANF9/index.md#prop-anf9-valuation-rules)から、$v_L(x)$ は各項の付値の最小値と等しくなります。

$x\in A$ なら全項の付値が $0$ 以上です。$0\le j<e$ なので各 $v_{K_0}(a_j)\ge0$、すなわち $a_j\in\mathcal O_{K_0}$ です。逆の包含は $\pi$ が整元であることから明白なので、求める直和分解を得ます。
<!-- proof-end -->

この補題を使って、高次の群を定義します。定義自体は整数環のすべての元について行うため、一様化元の取り方に依存しません。

<a id="def-anf13-ramification-groups"></a>

<!-- formal-statement-start -->
> **定義（下番号 Galois 分岐群）**  
> 有限 Galois 局所拡大 $L/K$ に対し、$G_{-1}=G$ とし、各整数 $i\ge0$ に対して
>
$$
G_i=\{\sigma\in G:
v_L(\sigma(a)-a)\ge i+1\quad
\text{for every }a\in A\}
$$
>
> と置く。これを **下番号の第 $i$ 分岐群**という。$G_0=I$ であり、
>
$$
G_{-1}\supseteq G_0\supseteq G_1\supseteq G_2\supseteq\cdots
$$
>
> が成り立つ。
<!-- formal-statement-end -->

<!-- definition-example-start: def-anf13-ramification-groups -->
**定義の確認**：$L=\mathbb Q_5(\pi)$、$\pi^2=5$ では、非自明な自己同型は $\sigma(\pi)=-\pi$。$A=\mathbb Z_5[\pi]$ であり、$\sigma(a+b\pi)-(a+b\pi)=-2b\pi$（$a,b\in\mathbb Z_5$）です。すべての整数環の元について付値は少なくとも $1$、しかし $a=0,b=1$ なら $v_L(-2\pi)=1$ です。従って $\sigma\in G_0$ で $\sigma\notin G_1$、すなわち $G_0=G$、$G_1=\{1\}$ です。

$L=\mathbb Q_2(\pi)$、$\pi^2=2$ の場合は同じ $\sigma(\pi)=-\pi$ でも $v_L(-2\pi)=3$ です。$A=\mathbb Z_2[\pi]$ より $G_0=G_1=G_2=G$、$G_3=\{1\}$ です。$\pi$ の動きが二桁深く隠れることが、異なる指数の違いに結び付きます。
<!-- definition-example-end -->

<a id="prop-anf13-pi-test"></a>

<!-- formal-statement-start -->
> **命題（一様化元による分岐群の判定）**  
> $L/K$ を有限 Galois 局所拡大、$K_0=L^{G_0}$、$\pi$ を $L$ の一様化元とする。任意の $i\ge0$ について
>
$$
G_i=\{\sigma\in G_0:
v_L(\sigma\pi-\pi)\ge i+1\}.
$$
>
> また各 $G_i$ は $G$ の正規部分群である。十分大きい $i$ では $G_i=\{1\}$ となる。
<!-- formal-statement-end -->

### 証明の見取り図

惰性群は $K_0$ を固定します。任意の整数を $\mathcal O_{K_0}$ 係数の $\pi$ の多項式で表し、$\sigma(\pi)-\pi$ を因数としてくくります。

<!-- proof-start -->
### 証明

$G_0=I$ は剰余作用の核なので、定義の全元条件と一致します。$i\ge0$ と $\sigma\in G_0$ を固定します。[一様化元基底](#lem-anf13-monogenic)から任意の $a\in A$ を $a=\sum_{j=0}^{e-1}b_j\pi^j$（$b_j\in\mathcal O_{K_0}$）と書けます。$\sigma$ は $K_0$ を固定するので

$$
\sigma(a)-a
=\sum_{j=1}^{e-1}b_j
\bigl((\sigma\pi)^j-\pi^j\bigr),
$$

$$
(\sigma\pi)^j-\pi^j
=(\sigma\pi-\pi)
\sum_{h=0}^{j-1}(\sigma\pi)^{j-1-h}\pi^h.
$$

最後の和は $A$ に属します。よって $v_L(\sigma\pi-\pi)\ge i+1$ ならすべての $a\in A$ に対して同じ評価が成り立ちます。逆は $a=\pi$ を代入すれば従います。

$\tau\in G$ に対して $\tau(A)=A$ かつ $v_L(\tau x)=v_L(x)$ です。$\sigma\in G_i$ なら任意の $a\in A$ について

$$
v_L((\tau\sigma\tau^{-1})(a)-a)
=v_L\bigl(\sigma(\tau^{-1}a)-\tau^{-1}a\bigr)\ge i+1
$$

だから $\tau\sigma\tau^{-1}\in G_i$ です。部分群であることも具体的に確かめます。$\sigma,\eta\in G_i$ と $a\in A$ について

$$
(\sigma\eta)(a)-a
=\sigma(\eta(a)-a)+(\sigma(a)-a)
\in\mathfrak m_L^{i+1}
$$

です。ここでは $\sigma(\mathfrak m_L^{i+1})=\mathfrak m_L^{i+1}$ を使いました。また

$$
\sigma^{-1}(a)-a
=-\sigma^{-1}(\sigma(a)-a)
\in\mathfrak m_L^{i+1}
$$

なので逆元にも閉じます。恒等元を含むことと合わせて $G_i$ は部分群です。先の共役不変性により正規部分群となります。

最後に $\sigma\in G_0\setminus\{1\}$ が $\pi$ を固定すれば、$\sigma$ は $K_0$ も固定するため $L=K_0(\pi)$ の全体を固定し矛盾します。各非自明元の $v_L(\sigma\pi-\pi)$ は有限です。$G_0$ は有限群なので、それらの最大値を越える $i$ では非自明元が残りません。
<!-- proof-end -->

## 3. 穏やかな分岐と激しい分岐

最初の商 $G_0/G_1$ は一様化元に掛かる単元の剰余を表します。さらに $G_i/G_{i+1}$（$i\ge1$）は、より深い桁での**加法的なずれ**を表します。[単数の段階商](../ANF12/index.md#thm-anf12-graded-units)で「積が和になる」ことと同じ現象です。

<a id="thm-anf13-ramification-quotients"></a>

<!-- formal-statement-start -->
> **定理（分岐群の段階商）**  
> 有限 Galois 局所拡大 $L/K$ に対し、次の単射群準同型が存在する。
>
$$
G_0/G_1\hookrightarrow k_L^\times,\qquad
\sigma G_1\longmapsto\overline{\sigma(\pi)/\pi},
$$
>
> また各整数 $i\ge1$ について、
>
$$
G_i/G_{i+1}\hookrightarrow(k_L,+),\qquad
\sigma G_{i+1}\longmapsto
\overline{(\sigma(\pi)-\pi)/\pi^{i+1}}.
$$
>
> 従って $G_0/G_1$ は位数が $p$ と互いに素な巡回群であり、$G_i/G_{i+1}$（$i\ge1$）は初等可換 $p$ 群である。特に $G_1$ は $p$ 群である。
<!-- formal-statement-end -->

### 証明の見取り図

惰性群は剰余体に自明に作用します。積を計算すると、最初の層では $\sigma(\pi)/\pi$ の剰余が**乗法的**に合成され、二層目以降では差の剰余が**加法的**に合成されます。

<!-- proof-start -->
### 証明

$\sigma\in G_0$ なら $\sigma\pi$ も一様化元なので $\sigma\pi/\pi$ は単元です。$\sigma,\tau\in G_0$ に対し

$$
\frac{\sigma\tau(\pi)}{\pi}
=\sigma\left(\frac{\tau(\pi)}{\pi}\right)
\frac{\sigma(\pi)}{\pi}.
$$

$\sigma$ は $k_L$ に自明に作用するため、剰余を取ると積の写像になります。像が $1$ となる条件は $(\sigma\pi-\pi)/\pi\in\mathfrak m_L$ であり、[一様化元による判定](#prop-anf13-pi-test)から $\sigma\in G_1$ と同値です。よって最初の単射が得られます。$k_L^\times$ は位数 $|k_L|-1=q^f-1$ の巡回群なので、その部分群も巡回群で、位数は $p$ と互いに素です。

$i\ge1$ とします。$\sigma\in G_i$ なら $\sigma\pi-\pi=\pi^{i+1}a_\sigma$（$a_\sigma\in A$）です。$\sigma,\tau\in G_i$ について

$$
\sigma\tau(\pi)-\pi
=\sigma(\tau\pi-\pi)+(\sigma\pi-\pi)
=\sigma(\pi^{i+1}a_\tau)+\pi^{i+1}a_\sigma.
$$

$\sigma\pi/\pi\equiv1\pmod{\mathfrak m_L}$ であり、$\sigma$ は $A/\mathfrak m_L$ を固定するため

$$
\overline{\frac{\sigma(\pi^{i+1}a_\tau)}{\pi^{i+1}}}
=\overline{\left(\frac{\sigma\pi}{\pi}\right)^{i+1}\sigma(a_\tau)}
=\bar a_\tau.
$$

ゆえに $a_{\sigma\tau}$ の剰余は $\bar a_\sigma+\bar a_\tau$ となります。核は $v_L(\sigma\pi-\pi)\ge i+2$、すなわち $G_{i+1}$ です。第二の単射が得られました。

$(k_L,+)$ は標数 $p$ の有限体の加法群なので、その部分群では全元の位数が $1$ または $p$ です。各 $G_i/G_{i+1}$ は初等可換 $p$ 群になります。十分大きな $i$ で $G_i=1$ となるため、$|G_1|$ はこれら段階商の位数の積、つまり $p$ の冪です。
<!-- proof-end -->

<a id="def-anf13-tame-wild"></a>

<!-- formal-statement-start -->
> **定義（緩分岐・激分岐）**  
> 有限 Galois 局所拡大 $L/K$ が **緩分岐**（tame）であるとは、$p$ が分岐指数 $e(L/K)$ を割らないことをいう。$p\mid e(L/K)$ のとき **激分岐**（wild）という。惰性群の中の $G_1$ を激分岐群ともいう。
<!-- formal-statement-end -->

<!-- definition-example-start: def-anf13-tame-wild -->
**定義の確認**：$L=\mathbb Q_5(\sqrt5)$ では $e=2$ かつ $p=5$ なので緩分岐です。実際 $G_1=1$ でした。一方 $L=\mathbb Q_2(\sqrt2)$ では $e=2$ かつ $p=2$ なので激分岐で、$G_1=G$ と計算できます。$e>1$ であることと、激分岐であることは別の条件です。
<!-- definition-example-end -->

<a id="cor-anf13-tame-test"></a>

<!-- formal-statement-start -->
> **系（緩分岐の群論的判定）**  
> 有限 Galois 局所拡大 $L/K$ に対し、
>
$$
p\nmid e(L/K)\quad\Longleftrightarrow\quad G_1=\{1\}.
$$
>
> したがって激分岐であれば $G_1$ は非自明な正規 $p$ 部分群である。
<!-- formal-statement-end -->

### 証明の見取り図

$|G_0|=e$ を、互いに素な $p$ の冪部分と $p$ と互いに素な部分に分けます。前の定理がその二つを分離します。

<!-- proof-start -->
### 証明

[惰性群の位数](#thm-anf13-inertia-exact)より $|G_0|=e$ です。さらに[段階商定理](#thm-anf13-ramification-quotients)から $|G_1|$ は $p$ の冪、$|G_0/G_1|$ は $p$ と互いに素です。等式

$$
e=|G_0|=|G_1|\,|G_0/G_1|
$$

を用いれば、$p\nmid e$ は $|G_1|=1$ と同値です。正規性は[分岐群の判定命題](#prop-anf13-pi-test)で示しました。
<!-- proof-end -->

緩分岐なら、高次分岐群はすべて自明です。激分岐では $G_1,G_2,\ldots$ のどこまでが非自明かが追加情報になります。

## 4. 分岐群から異なる指数を回復する

[ANF11 の異なる](../ANF11/index.md#def-anf11-codifferent)は整数環の跡双対を測るイデアルでした。Galois 拡大では、その指数が**自己同型による一様化元のずれ**の総和と一致します。

<a id="thm-anf13-different-sum"></a>

<!-- formal-statement-start -->
> **定理（分岐群による異なる指数公式）**  
> $L/K$ を有限 Galois 局所拡大、$\mathfrak D_{L/K}=\mathfrak m_L^d$ を異なるイデアルとする。下番号分岐群を $G_i$（$i\ge0$）とすれば
>
$$
d=v_L(\mathfrak D_{L/K})
=\sum_{i=0}^{\infty}(|G_i|-1).
$$
>
> 和は有限個の非零項だけを持つ。特に緩分岐なら $d=e-1$、激分岐なら $d\ge e$ である。
<!-- formal-statement-end -->

### 証明の見取り図

最大非分岐部分 $K_0$ を間に挟みます。$K_0/K$ の異なるは単位イデアル、$L/K_0$ では $A=\mathcal O_{K_0}[\pi]$ です。したがって異なるは $\pi$ の最小多項式の導関数で生成されます。共役根の差を数えると、分岐群の位数の和になります。

<!-- proof-start -->
### 証明

まず、後で二度使う跡双対の計算を、一般の基礎局所体について確認します。[単項生成の整数環の異なる公式](../ANF11/index.md#thm-anf11-monogenic-different)は $\mathbb Q_p$ 上で証明されているため、ここではその計算を有限拡大の整数環にも適用できる形で示します。

$R$ を標数 $0$ の完備離散付値環、$T$ をその分数体とします。$E=T(\alpha)$ を次数 $m$ の有限分離拡大、$\mathcal O_E=R[\alpha]$、$P(X)\in R[X]$ を $\alpha$ のモニック最小多項式とします。$P$ の相異なる根 $\alpha_1,\ldots,\alpha_m$ に対する Lagrange 補間で最高次係数を比較すると、次数 $m$ 未満の多項式 $H$ について

$$
\operatorname{Tr}_{E/T}\left(\frac{H(\alpha)}{P'(\alpha)}\right)
=\sum_{j=1}^{m}\frac{H(\alpha_j)}{P'(\alpha_j)}
=[X^{m-1}]H(X)
$$

です。$P'$ は $X$ に関する形式的導関数、$[X^{m-1}]$ はその係数を取り出す記号です。$a,b\in R[X]$ を次数 $m$ 未満とし、モニック $P$ で $ab$ を割った余りを $r\in R[X]$ とすると

$$
\operatorname{Tr}_{E/T}\left(\frac{a(\alpha)b(\alpha)}{P'(\alpha)}\right)
=[X^{m-1}]r(X)\in R.
$$

特に基底 $1,\alpha,\ldots,\alpha^{m-1}$ に対するこの跡の行列の $(i,j)$ 成分は $[X^{m-1}](X^{i+j}\bmod P)$ です。$i+j<m-1$ では $0$、$i+j=m-1$ では $1$ なので、列を逆順にすると対角成分 $1$ の三角行列になります。従って行列式は $R$ の単元で、跡双対はちょうど $P'(\alpha)^{-1}R[\alpha]$ です。以上により

$$
\mathfrak D_{E/T}=P'(\alpha)\mathcal O_E
\qquad(\mathcal O_E=R[\alpha])
$$

が基礎体 $T$ を $\mathbb Q_p$ に限定せず成立します。

**(1) 非分岐部分の異なるは単位。** $K_0/K$ には前節で構成した整元 $\theta$ があり、$K_0=K(\theta)$ です。$\bar\theta$ の最小多項式の次数は $f$ なので、$1,\bar\theta,\ldots,\bar\theta^{f-1}$ は $k_K$ 上の基底です。これを使って $\mathcal O_{K_0}=B[\theta]$ を確認します。

任意の $x\in\mathcal O_{K_0}$ を $x=\sum_{j=0}^{f-1}a_j\theta^j$（$a_j\in K$）と一意に書き、$x\ne0$ のとき $m=\min_j v_K(a_j)$ と置きます。もし $m<0$ なら、$b_j=\varpi_K^{-m}a_j\in B$ のうち少なくとも一つは単元です。一方、$K_0/K$ の分岐指数は $1$ なので

$$
\varpi_K^{-m}x\in\varpi_K\mathcal O_{K_0}
\quad\Longrightarrow\quad
\sum_{j=0}^{f-1}\bar b_j\bar\theta^j=0.
$$

これは剰余体上の基底の一次独立性と、少なくとも一つの $\bar b_j$ が非零であることに反します。よって $m\ge0$、すべての $a_j\in B$ であり、$\mathcal O_{K_0}=B[\theta]$ です。

$\theta$ の最小多項式 $h$ は法 $\mathfrak m_K$ で分離的なので $h'(\theta)$ は単元です。直前に $R=B$、$T=K$、$E=K_0$、$\alpha=\theta$ として示した相対的な跡双対公式を適用すると、$\mathfrak D_{K_0/K}=(h'(\theta))=\mathcal O_{K_0}$ となります。

**(2) 非分岐中間体を通した跡双対。** 有限拡大の跡の合成から

$$
\operatorname{Tr}_{L/K}
=\operatorname{Tr}_{K_0/K}\circ\operatorname{Tr}_{L/K_0}
$$

です。[余異なるの定義](../ANF11/index.md#def-anf11-codifferent)を使います。まず $x\in\mathfrak D^{-1}_{L/K_0}$ なら、任意の $a\in A$ に対し $\operatorname{Tr}_{L/K_0}(xa)\in\mathcal O_{K_0}$ です。$\operatorname{Tr}_{K_0/K}(\mathcal O_{K_0})\subseteq B$ なので、合成跡も $B$ に入り $x\in\mathfrak D^{-1}_{L/K}$ です。

逆に $x\in\mathfrak D^{-1}_{L/K}$ とします。任意の $a\in A$、$b\in\mathcal O_{K_0}$ では $ab\in A$ だから

$$
\operatorname{Tr}_{K_0/K}
\bigl(b\,\operatorname{Tr}_{L/K_0}(xa)\bigr)
=\operatorname{Tr}_{L/K}(xab)\in B.
$$

これは $\operatorname{Tr}_{L/K_0}(xa)$ が $\mathfrak D^{-1}_{K_0/K}=\mathcal O_{K_0}$ に属するという条件そのものです。任意の $a\in A$ に対し成立するので $x\in\mathfrak D^{-1}_{L/K_0}$ です。両包含から

$$
\mathfrak D^{-1}_{L/K}
=\mathfrak D^{-1}_{L/K_0},
\qquad
\mathfrak D_{L/K}=\mathfrak D_{L/K_0}
$$

を得ます。

**(3) 共役との差。** [全分岐部分の一様化元基底](#lem-anf13-monogenic)から $L/K_0$ の最小多項式は

$$
F(X)=\prod_{\sigma\in G_0}(X-\sigma\pi).
$$

導関数を $X=\pi$ で評価して

$$
F'(\pi)=\prod_{\substack{\sigma\in G_0\\\sigma\ne1}}
(\pi-\sigma\pi)
$$

を得ます。先に示した相対的な跡双対公式を $R=\mathcal O_{K_0}$、$T=K_0$、$E=L$、$\alpha=\pi$ に適用すると、

$$
d=v_L(F'(\pi))
=\sum_{\substack{\sigma\in G_0\\\sigma\ne1}}
v_L(\sigma\pi-\pi).
$$

**(4) 項を数え直す。** 各非自明な $\sigma\in G_0$ について $r_\sigma=v_L(\sigma\pi-\pi)\ge1$ は整数です。$r_\sigma$ は、$i=0,1,\ldots,r_\sigma-1$ の各段階で $\sigma\in G_i$ となる回数です。したがって有限和の順序を入れ替えて

$$
\begin{aligned}
d
&=\sum_{\sigma\in G_0\setminus\{1\}}
\sum_{i\ge0}\mathbf 1_{\{\sigma\in G_i\}}\\
&=\sum_{i\ge0}(|G_i|-1)
\end{aligned}
$$

を得ます。緩分岐なら $G_0$ のみ非自明で $d=e-1$ です。激分岐なら $G_1\ne1$ なので、$d\ge(e-1)+(|G_1|-1)\ge e$ です。
<!-- proof-end -->

**二つの二次拡大を検算する。** $L_5=\mathbb Q_5(\sqrt5)$ では $\pi=\sqrt5$、$\sigma\pi=-\pi$、$v_{L_5}(2\pi)=1$。従って $G_0$ の位数は $2$、$G_1=1$ で、

$$
d(L_5/\mathbb Q_5)=2-1=1.
$$

$L_2=\mathbb Q_2(\sqrt2)$ では $v_{L_2}(2)=2$、$v_{L_2}(2\pi)=3$。従って $G_0=G_1=G_2$ は位数 $2$、$G_3=1$ で、

$$
d(L_2/\mathbb Q_2)=(2-1)+(2-1)+(2-1)=3.
$$

一方、最小多項式はどちらも $F(X)=X^2-p$ で $F'(\pi)=2\pi$ です。導関数からも、それぞれ $v_{L_5}(2\pi)=1$ と $v_{L_2}(2\pi)=3$。群の計算と跡双対の計算が一致しました。

## 5. Galois の仮定を外すと何が壊れるか

ここまでの $|G|=ef$ は **有限 Galois 拡大**を仮定しています。一般の有限局所拡大にも $[L:K]=ef$ は成り立ちますが、自己同型群の位数は拡大次数に等しいとは限りません。

例えば $L=\mathbb Q_5(\pi)$、$\pi^3=5$ とします。[Eisenstein 既約性](../ANF10/index.md#thm-anf10-eisenstein-irreducible)より $[L:\mathbb Q_5]=3$、整数環と剰余体の計算から $e=3,f=1$ です。

任意の $\mathbb Q_5$ 自己同型は $\pi$ を $X^3-5$ の別の根へ送るので、その比は $1$ の三乗根でなければなりません。しかし $L$ の剰余体は $\mathbb F_5$、$X^2+X+1$ は法 $5$ で根を持ちません（$1,2,3,4$ を代入して確認できます）。非自明な三乗根が $L$ にあればその元は整数環の単元で、法 $\pi$ へ還元してもこの多項式の根を生み、矛盾します。従って $\operatorname{Aut}_{\mathbb Q_5}(L)=\{1\}$ です。

この場合 $e=3$ ですが自己同型群の位数は $1$。したがって「惰性群の位数は $e$」を無条件に当てはめると誤ります。分岐群は **拡大が Galois であること**を確かめて使います。

## 6. 演習：剰余・一様化元・群の深さ

演習では Galois 拡大を最初に確認し、$G_{-1}$、$G_0$、$G_1$ 以降、異なる指数を順に計算してください。[定義](#def-anf13-ramification-groups)と[一様化元判定](#prop-anf13-pi-test)のどちらを使っているかも明示します。

### A1. 非分岐二次拡大の惰性群

$L=\mathbb Q_3(i)$、$i^2=-1$ とする。$G$ の二つの元と剰余体への作用を書き、$G_0$ と $G_1$ を決定せよ。

- Level: A
- ID: ANF13-A1

<!-- solution-start -->
**詳細解答。** $X^2+1$ は法 $3$ で根を持たず、$[L:\mathbb Q_3]=2$、$k_L=\mathbb F_9$、$(e,f)=(1,2)$ です。$G=\{1,\sigma\}$、$\sigma(i)=-i$ です。剰余体上では $\bar i^3=-\bar i$ なので $\rho(\sigma)$ は非自明な Frobenius で、$\rho$ は位数 $2$ の群の同型です。[惰性群の定義](#def-anf13-inertia)より $G_0=\ker\rho=\{1\}$。包含 $G_1\subseteq G_0$ から $G_1=\{1\}$ です。
<!-- solution-end -->

### A2. 緩分岐二次拡大

$L=\mathbb Q_5(\pi)$、$\pi^2=5$ とする。$G_0,G_1$ と $d=v_L(\mathfrak D_{L/\mathbb Q_5})$ を求めよ。

- Level: A
- ID: ANF13-A2

<!-- solution-start -->
**詳細解答。** Eisenstein 既約性から $[L:\mathbb Q_5]=2$、$e=2,f=1$、$G=\{1,\sigma\}$、$\sigma\pi=-\pi$ です。剰余体は $\mathbb F_5$ なので $G_0=G$。一様化元の差は $\sigma\pi-\pi=-2\pi$。$v_L(2)=0$、$v_L(\pi)=1$ から $v_L(\sigma\pi-\pi)=1$ です。[判定命題](#prop-anf13-pi-test)より $G_1=1$。[分岐群による異なる指数公式](#thm-anf13-different-sum)で $d=(|G_0|-1)=1$ です。$5\nmid2$ なので緩分岐という定義とも一致します。
<!-- solution-end -->

### A3. 激分岐二次拡大

$L=\mathbb Q_2(\pi)$、$\pi^2=2$ とする。$G_0,G_1,G_2,G_3$ を求めよ。

- Level: A
- ID: ANF13-A3

<!-- solution-start -->
**詳細解答。** $e=2,f=1$、$G=\{1,\sigma\}$、$\sigma\pi=-\pi$ です。剰余体は $\mathbb F_2$ なので $G_0=G$。$v_L(2)=2$ だから

$$
v_L(\sigma\pi-\pi)
=v_L(-2\pi)=v_L(2)+v_L(\pi)=3.
$$

[判定命題](#prop-anf13-pi-test)から $i+1\le3$ の $i=0,1,2$ では $\sigma\in G_i$、$i=3$ では $\sigma\notin G_3$ です。従って $G_0=G_1=G_2=G$、$G_3=1$ です。
<!-- solution-end -->

### A4. 惰性商の位数

$L/K$ が有限 Galois 局所拡大で $[L:K]=12$、$e=4$、$f=3$ とする。$|G|$、$|G_0|$、$|G/G_0|$ を求め、剰余体の Frobenius がどの商群の生成元か答えよ。

- Level: A
- ID: ANF13-A4

<!-- solution-start -->
**詳細解答。** [惰性群の完全列](#thm-anf13-inertia-exact)を適用します。$|G|=[L:K]=12$、$|G_0|=e=4$ です。群の位数公式から $|G/G_0|=12/4=3=f$。剰余体の $q$ 乗 Frobenius は $\operatorname{Gal}(k_L/k_K)\simeq G/G_0$ の生成元です。$G_0$ 自体を Frobenius が生成するとは限りません。
<!-- solution-end -->

### A5. 差の付値と高次分岐群

$L/K$ を全分岐 Galois 局所拡大、$\pi$ を一様化元とし、非自明な $\sigma\in G$ について $v_L(\sigma\pi-\pi)=4$ であるとする。$\sigma$ が属する $G_i$（$i\ge0$）をすべて列挙せよ。

- Level: A
- ID: ANF13-A5

<!-- solution-start -->
**詳細解答。** 全分岐なので $G_0=G$ です。[一様化元判定](#prop-anf13-pi-test)の条件は $4\ge i+1$ です。従って $i=0,1,2,3$ のとき $\sigma\in G_i$、$i\ge4$ のとき $\sigma\notin G_i$ です。$v_L(\sigma\pi-\pi)=4$ を「第4分岐群まで属する」と数えるのは一つずれた誤りです。
<!-- solution-end -->

### B1. 二次拡大の異なる指数を二通りに計算する

$L=\mathbb Q_2(\sqrt2)$ とする。分岐群の位数和と最小多項式の導関数の両方から、異なる指数 $d$ を求めよ。

- Level: B
- ID: ANF13-B1

<!-- solution-start -->
**詳細解答。** $\pi=\sqrt2$、$F(X)=X^2-2$。$e=2,f=1$ で非自明な $\sigma$ は $\pi\mapsto-\pi$ です。$v_L(\sigma\pi-\pi)=v_L(-2\pi)=3$ より $G_0=G_1=G_2=G$、$G_3=1$。[分岐群による異なる指数公式](#thm-anf13-different-sum)から

$$
d=\sum_{i\ge0}(|G_i|-1)
=(2-1)+(2-1)+(2-1)=3.
$$

他方 $A=\mathbb Z_2[\pi]$、$F'(\pi)=2\pi$ です。[単項生成の整数環の異なる公式](../ANF11/index.md#thm-anf11-monogenic-different)で $\mathfrak D=(2\pi)$。$v_L(2\pi)=2+1=3$ なので同じ結果です。
<!-- solution-end -->

### B2. 高次分岐群の段階商が加法的な理由

$i\ge1$ とする。$\sigma,\tau\in G_i$ について

$$
c_i(\sigma)=
\overline{\frac{\sigma(\pi)-\pi}{\pi^{i+1}}}\in k_L
$$

と置く。$c_i(\sigma\tau)=c_i(\sigma)+c_i(\tau)$、$\ker c_i=G_{i+1}$ を自分で導け。

- Level: B
- ID: ANF13-B2

<!-- solution-start -->
**詳細解答。** $\tau\pi-\pi=\pi^{i+1}b$ と書くと $b\in A$ で $c_i(\tau)=\bar b$ です。$\sigma\in G_i\subseteq G_0$ は剰余体で恒等的に作用します。また $\sigma\pi-\pi\in\pi^{i+1}A$、$i\ge1$ から

$$
\overline{\sigma(\pi)/\pi}=1.
$$

差を分けると

$$
\frac{\sigma\tau(\pi)-\pi}{\pi^{i+1}}
=\left(\frac{\sigma\pi}{\pi}\right)^{i+1}\sigma(b)
+\frac{\sigma\pi-\pi}{\pi^{i+1}}.
$$

法 $\mathfrak m_L$ で第一項は $\bar b$、第二項は $c_i(\sigma)$ となるので加法則が従います。$c_i(\sigma)=0$ と $\sigma\pi-\pi\in\pi^{i+2}A$ は同値であり、[一様化元判定](#prop-anf13-pi-test)からこれは $\sigma\in G_{i+1}$ と同値です。
<!-- solution-end -->

### B3. Galois の仮定が必要な非正規三次拡大

$L=\mathbb Q_5(\pi)$、$\pi^3=5$ とする。$[L:\mathbb Q_5]$、$e,f$ を求め、$\operatorname{Aut}_{\mathbb Q_5}(L)$ が自明なことを示せ。

- Level: B
- ID: ANF13-B3

<!-- solution-start -->
**詳細解答。** $X^3-5$ は Eisenstein だから次数は $3$ です。[Eisenstein 拡大の整数環](../ANF10/index.md#thm-anf10-eisenstein-extension)より $A=\mathbb Z_5[\pi]$、$\mathfrak m_L=(\pi)$、$k_L=\mathbb F_5$、従って $e=3,f=1$。

もし $\sigma(\pi)\ne\pi$ なら $\sigma(\pi)/\pi$ は $1$ でない三乗根 $\zeta$ です。$\zeta$ は $X^2+X+1$ を満たし整数環の単元となります。

その法 $\pi$ の像は $\mathbb F_5$ で $x^2+x+1=0$ を満たすはずです。しかし $x=0,1,2,3,4$ のとき値はそれぞれ $1,3,2,3,1$（法 $5$）で、根はありません。

矛盾するので $\sigma(\pi)=\pi$、$L=\mathbb Q_5(\pi)$ より $\sigma=1$ です。自己同型群の位数 $1$ を $e=3$ と取り違えてはいけません。
<!-- solution-end -->

### B4. 惰性群の位数から激分岐を判定する

$L/K$ は有限 Galois 局所拡大、$p=3$、$e=6$、$f=2$ とする。$|G|$、$|G_0|$、$|G_1|$ の $3$ 進部分を求め、$G_1$ が自明でない理由を証明せよ。

- Level: B
- ID: ANF13-B4

<!-- solution-start -->
**詳細解答。** [完全列](#thm-anf13-inertia-exact)から $|G|=ef=12$、$|G_0|=e=6$ です。

[段階商定理](#thm-anf13-ramification-quotients)より $G_1$ は $3$ 群で、$G_0/G_1$ の位数は $3$ と互いに素です。$6=|G_1|\cdot|G_0/G_1|$ なので $|G_1|$ は $6$ の $3$ 冪因子、すなわち $3$ に等しいです。

ゆえに $G_1\ne1$ で、拡大は激分岐です。なお $G_2$ 以降がどうなるかは $e,f$ だけでは決められません。
<!-- solution-end -->

### C1. 同じ分岐指数、異なる群の深さ

次の二つの有限 Galois 拡大を比較せよ。

- $L_5=\mathbb Q_5(\sqrt5)$ と $K_5=\mathbb Q_5$。
- $L_2=\mathbb Q_2(\sqrt2)$ と $K_2=\mathbb Q_2$。

それぞれについて (a) $e,f$ と $G_{-1},G_0,G_i$（$i\ge1$）を求め、(b) 緩分岐・激分岐を判定し、(c) 群の位数和と導関数から異なる指数を求めよ。さらに、なぜ $e$ だけでは異なる指数を決定できないのか説明せよ。

- Level: C
- ID: ANF13-C1

<!-- solution-start -->
**詳細解答。** どちらも $X^2-p$ は $p$ 進 Eisenstein 多項式で、$[L_p:K_p]=2$、$\pi_p=\sqrt p$ が一様化元、$A_p=\mathbb Z_p[\pi_p]$、$e=2,f=1$ です。二次拡大は Galois で、$G=\{1,\sigma\}$、$\sigma\pi_p=-\pi_p$ です。剰余体の拡大が自明なので $\rho$ は自明、$G_{-1}=G_0=G$ です。

$p=5$ のとき $v_{L_5}(2)=0$ なので

$$
v_{L_5}(\sigma\pi_5-\pi_5)
=v_{L_5}(-2\pi_5)=1.
$$

[一様化元判定](#prop-anf13-pi-test)から $G_1=1$、それ以降も $1$ です。$5\nmid e=2$ より緩分岐です。[分岐群による異なる指数公式](#thm-anf13-different-sum)は $d_5=|G_0|-1=1$ を与え、$F_5'(X)=2X$ で $v_{L_5}(F_5'(\pi_5))=v_{L_5}(2\pi_5)=1$ とも一致します。

$p=2$ では $v_{L_2}(2)=2$ だから

$$
v_{L_2}(\sigma\pi_2-\pi_2)
=v_{L_2}(-2\pi_2)=3.
$$

従って $G_1=G_2=G$、$G_3=1$ で、それ以降も $1$ です。$2\mid e=2$ より激分岐です。位数和は

$$
d_2=(|G_0|-1)+(|G_1|-1)+(|G_2|-1)
=1+1+1=3,
$$

そして $F_2'(X)=2X$ から $v_{L_2}(F_2'(\pi_2))=v_{L_2}(2\pi_2)=3$ と一致します。

両者は $e=2,f=1$ かつ惰性群の位数 $2$ まで同じです。しかし $2$ が基礎体の単元である $p=5$ の場合、共役との差 $2\pi$ は深さ $1$ です。$p=2$ では $2$ 自体が正の付値を持ち、共役の差が深さ $3$ に達します。**高次分岐群の存続する長さ**が異なるため、異なる指数 $d_5=1$ と $d_2=3$ は一致しません。
<!-- solution-end -->

次講 ANF14「Hilbertの定理90・群コホモロジー」では、Galois 群の作用から作る乗法的な $1$-cocycle を初めて定義し、ノルムと自己同型の関係を群の言葉で解き直します。
