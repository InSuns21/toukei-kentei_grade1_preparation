# ANF15 局所相互法則への導入

前講では、巡回 Galois 拡大についてノルムが $1$ であることと「ある元の共役との比」で書けることが同値だと分かりました。しかし [巡回拡大の比とノルムの完全性](../ANF14/index.md#prop-anf14-cyclic-exact) は、$K^\times$ のうち何がノルムとして現れるかを決定しません。たとえば $\mathbb Q_3(i)/\mathbb Q_3$ では、$3$ はノルムではありません。

ここではノルムで割った商 $K^\times/N_{L/K}(L^\times)$ を、Galois 群の元と対応させる方法を調べます。**非分岐拡大ではその対応を構成して証明**でき、分岐拡大では何が追加で必要になるかも分かります。

## 1. 非分岐拡大に残る自己同型：Frobenius

$K$ を有限剰余体を持つ非 Archimedes 局所体、$\mathcal O_K$ を整数環、$\mathfrak m_K$ を極大イデアル、$k_K=\mathcal O_K/\mathfrak m_K$ を要素数 $q$ の剰余体とします。$\pi_K$ は付値 $v_K(\pi_K)=1$ の一様化元で、$v_K(K^\times)=\mathbb Z$ と規格化します。

有限体 $k$ の要素数が $q$ なら、任意の $a\in k$ について $a^q=a$ です。一方、次数 $f$ の有限拡大 $k'/k$ では写像 $x\mapsto x^q$ が $k$ を固定する自己同型になります。以下で、この自己同型に名前を付けます。

<a id="def-anf15-arithmetic-frobenius"></a>

<!-- formal-statement-start -->
> **定義（算術的 Frobenius）**  
> $k'/k$ を要素数 $q$ の有限体 $k$ の有限拡大とする。$k'$ 上の自己同型

$$
\operatorname{Frob}_q:k'\longrightarrow k',
\qquad x\longmapsto x^q
$$

> を $k'/k$ の**算術的 Frobenius** という。
<!-- formal-statement-end -->

<!-- definition-example-start: def-anf15-arithmetic-frobenius -->
**定義の確認**： $k=\mathbb F_3$、$k'=\mathbb F_3[t]/(t^2+1)$ とし、$i$ を $t$ の剰余類とします。$\mathbb F_3$ では $-1=2$ が平方でないので、この商は $9$ 元の体です。$i^2=-1$ より

$$
\operatorname{Frob}_3(i)=i^3=-i.
$$

任意の $a+bi$（$a,b\in\mathbb F_3$）について標数 $3$ での二項展開から $(a+bi)^3=a^3+b^3i^3=a-bi$ です。よって $k$ の各元を固定し、$i\mapsto-i$ で非自明な自己同型です。二回作用させると $i$ に戻り、位数は $2$ です。
<!-- definition-example-end -->

非分岐な有限 Galois 局所拡大 $L/K$ では、剰余体への作用によって Galois 群全体を識別できます。これは [惰性群と剰余次数の完全列](../ANF13/index.md#thm-anf13-inertia-exact) で、非分岐なら惰性群が自明になることを使います。

<a id="prop-anf15-frobenius-lift"></a>

<!-- formal-statement-start -->
> **命題（非分岐局所拡大の Frobenius）**  
> $L/K$ を次数 $f\ge1$ の有限非分岐 Galois 局所拡大、$|k_K|=q$ とする。このとき、剰余体上の $\operatorname{Frob}_q:x\mapsto x^q$ を誘導する自己同型 $F\in\operatorname{Gal}(L/K)$ がただ一つ存在し、

$$
\operatorname{Gal}(L/K)=\langle F\rangle,
\qquad F^f=1.
$$

> さらに $f$ は $F$ の位数である。
<!-- formal-statement-end -->

### 証明の見取り図

非分岐なら剰余体への作用が Galois 群の同型になります。有限体の Frobenius が剰余体の Galois 群を生成することを確かめれば、その唯一の持ち上げも生成元です。

<!-- proof-start -->
### 証明

[惰性群の完全列](../ANF13/index.md#thm-anf13-inertia-exact) を $L/K$ に適用すると

$$
1\longrightarrow I(L/K)
\longrightarrow\operatorname{Gal}(L/K)
\longrightarrow\operatorname{Gal}(k_L/k_K)
\longrightarrow1
$$

が完全です。非分岐なので $I(L/K)=1$ であり、右への写像は同型です。

有限体 $k_L$ は $q^f$ 元を持ち、任意の $x\in k_L$ は $x^{q^f}=x$ を満たすから $\operatorname{Frob}_q^f=1$ です。逆に $0<d<f$ で $\operatorname{Frob}_q^d=1$ なら $k_L$ の全 $q^f$ 元が $X^{q^d}-X$ の根になります。しかしこの多項式の次数は $q^d<q^f$ なので不可能です。従って $\operatorname{Frob}_q$ の位数は $f$。剰余体 Galois 群の位数は $f$ で、これを生成します。

上の同型による原像を $F$ とすれば存在・一意性が従い、$F$ の位数も $f$、従って $G=\langle F\rangle$ です。
<!-- proof-end -->

例えば $L=\mathbb Q_3(i)$、$i^2=-1$ とすると、法 $3$ で $X^2+1$ は既約・分離的なので $L/K$ は非分岐二次拡大です。剰余体で $i\mapsto-i$ となる持ち上げは $L$ 上の共役 $\sigma(i)=-i$ であり、$F=\sigma$ です。

## 2. ノルム群の商を付値で測る

$L/K$ を上と同じ非分岐拡大とします。$K^\times$ の元は

$$
a=\pi_K^m u,\qquad m=v_K(a)\in\mathbb Z,\quad u\in\mathcal O_K^\times
$$

と一意に書けます。非分岐なので $e(L/K)=1$ で $\pi_K$ を $L$ の一様化元としても使えます。

[ノルムの付値と整数環の跡](../ANF12/index.md#prop-anf12-norm-valuation) では $v_K(N_{L/K}(x))=f\,v_L(x)$ です。また [非分岐拡大の単数ノルム全射性](../ANF12/index.md#thm-anf12-unramified-norm) により $\mathcal O_L^\times$ のノルム像は $\mathcal O_K^\times$ 全体です。

<a id="prop-anf15-unramified-norm-quotient"></a>

<!-- formal-statement-start -->
> **命題（非分岐ノルム商）**  
> $L/K$ を次数 $f\ge1$ の有限非分岐 Galois 局所拡大とし、$v_K(K^\times)=\mathbb Z$ とする。このとき

$$
N_{L/K}(L^\times)
=\pi_K^{f\mathbb Z}\mathcal O_K^\times
=\{a\in K^\times:f\mid v_K(a)\}.
$$

> 特に付値の剰余によって群同型

$$
K^\times/N_{L/K}(L^\times)
\ \cong\ \mathbb Z/f\mathbb Z
$$

> が得られる。
<!-- formal-statement-end -->

### 証明の見取り図

非分岐ではノルムの「単数部分」に障害がなく、「付値部分」にのみ $f$ の倍数条件が残ります。商の元は付値を $f$ で割った余りだけで決まります。

<!-- proof-start -->
### 証明

任意の $x\in L^\times$ を $x=\pi_K^j w$（$j\in\mathbb Z$、$w\in\mathcal O_L^\times$）と書きます。基礎体の元 $\pi_K$ はすべての $L/K$ 自己同型で固定されるため、ノルムの積表示から $N_{L/K}(\pi_K)=\pi_K^f$ です。従って

$$
N_{L/K}(x)=\pi_K^{fj}N_{L/K}(w)
\in \pi_K^{f\mathbb Z}\mathcal O_K^\times.
$$

逆に $a=\pi_K^{fj}u$（$u\in\mathcal O_K^\times$）を取ります。[非分岐単数ノルム全射性](../ANF12/index.md#thm-anf12-unramified-norm) から $w\in\mathcal O_L^\times$ で $N(w)=u$ となる元が存在し、

$$
N(\pi_K^jw)=\pi_K^{fj}u=a.
$$

よって両側の包含が一致します。

最後に写像 $\psi:K^\times\to\mathbb Z/f\mathbb Z$、$\psi(a)=v_K(a)\bmod f$ を考えます。$v_K(ab)=v_K(a)+v_K(b)$ なので $\psi(ab)=\psi(a)+\psi(b)$ です。$\psi(\pi_K)=1\bmod f$ なので全射であり、上で示した等式より $\ker\psi=N(L^\times)$。従って[群の第一同型定理](../../GRP/GRP2/index.md#thm-grp2-first-isomorphism)から商の同型が従います。
<!-- proof-end -->

ここで [Hilbert の定理90](../ANF14/index.md#thm-anf14-hilbert90) と比較しましょう。同定理が消すのは $H^1(G,L^\times)$ であり、本節の商 $K^\times/N(L^\times)$ ではありません。後者の位数は $f$ で、$f>1$ なら非自明です。

## 3. 非分岐局所 Artin 写像を実際に作る

前二節の結果を並べると、左のノルム商も右の Galois 群も同じ巡回群 $\mathbb Z/f\mathbb Z$ で表せます。ここで対応の向きを決めるため、**一様化元を算術的 Frobenius に送る**という規格化を選びます（幾何学的 Frobenius を採用する文献では逆元になるため、向きを確認してください）。

<a id="def-anf15-unramified-artin"></a>

<!-- formal-statement-start -->
> **定義（非分岐局所 Artin 写像）**  
> $L/K$ を次数 $f$ の有限非分岐 Galois 局所拡大、$F$ を算術的 Frobenius の唯一の持ち上げとする。任意の $a=\pi_K^m u\in K^\times$（$u\in\mathcal O_K^\times$）に対して

$$
\operatorname{rec}_{L/K}(a)=F^m
$$

> と定める写像 $\operatorname{rec}_{L/K}:K^\times\to\operatorname{Gal}(L/K)$ を、この講での**非分岐局所 Artin 写像**とする。
<!-- formal-statement-end -->

<!-- definition-example-start: def-anf15-unramified-artin -->
**定義の確認**： $K=\mathbb Q_3$、$L=\mathbb Q_3(i)$、$\sigma(i)=-i$ とすると $f=2$、$\pi_K=3$、$F=\sigma$ です。任意の $u\in\mathbb Z_3^\times$ に対し

$$
\operatorname{rec}_{L/K}(9u)=\sigma^2=1,
\qquad
\operatorname{rec}_{L/K}(3u)=\sigma.
$$

さらに $3^2$ と $3^{-2}$ も付値が偶数なので核に入ります。単数 $u$ はすべて $F^0=1$ へ送られます。積を取れば付値が足されるため写像は積と両立します。
<!-- definition-example-end -->

定義は $\pi_K$ の取り方に依存しません。別の一様化元 $\pi'_K$ なら $v_K(\pi'_K/\pi_K)=0$ なので $\pi'_K/\pi_K$ は単数であり、$a$ の付値 $m$ 自体は変わらないからです。

<a id="thm-anf15-unramified-reciprocity"></a>

<!-- formal-statement-start -->
> **定理（非分岐局所相互法則）**  
> $L/K$ を次数 $f\ge1$ の有限非分岐 Galois 局所拡大とする。算術的 Frobenius の持ち上げ $F$ を用いて

$$
\operatorname{rec}_{L/K}(a)=F^{v_K(a)}
$$

> と定めると、これは全射群準同型であり、核は $N_{L/K}(L^\times)$ に一致する。従って自然な群同型

$$
K^\times/N_{L/K}(L^\times)
\xrightarrow{\ \sim\ }\operatorname{Gal}(L/K)
$$

> を誘導し、一様化元の剰余類を $F$ へ送る。
<!-- formal-statement-end -->

### 証明の見取り図

[非分岐局所拡大の Frobenius](#prop-anf15-frobenius-lift)から $F$ は位数 $f$ の生成元です。一方 [非分岐ノルム商の命題](#prop-anf15-unramified-norm-quotient)からノルムかどうかは付値が $f$ の倍数かどうかで決まります。これを同じ式の核の条件に代入します。

<!-- proof-start -->
### 証明

$a,b\in K^\times$ に対し、$v_K(ab)=v_K(a)+v_K(b)$ を用いて

$$
\begin{aligned}
\operatorname{rec}_{L/K}(ab)
&=F^{v_K(ab)}
=F^{v_K(a)+v_K(b)}\\
&=F^{v_K(a)}F^{v_K(b)}
=\operatorname{rec}_{L/K}(a)\operatorname{rec}_{L/K}(b).
\end{aligned}
$$

従って群準同型です。$v_K(\pi_K)=1$ なので $\operatorname{rec}_{L/K}(\pi_K)=F$。[非分岐局所拡大の Frobenius](#prop-anf15-frobenius-lift)により $F$ は Galois 群を生成するから、写像は全射です。

また $F$ の位数は $f$ なので

$$
\begin{aligned}
\operatorname{rec}_{L/K}(a)=1
&\Longleftrightarrow F^{v_K(a)}=1\\
&\Longleftrightarrow f\mid v_K(a)\\
&\Longleftrightarrow a\in N_{L/K}(L^\times).
\end{aligned}
$$

最後の同値は [非分岐ノルム商の命題](#prop-anf15-unramified-norm-quotient) によります。従って核はノルム群であり、[群の第一同型定理](../../GRP/GRP2/index.md#thm-grp2-first-isomorphism)から表示した商同型が成立します。
<!-- proof-end -->

この定理は **非分岐** という仮定の下で、写像の構成・全射性・核の記述まで証明したものです。分岐拡大の一般論の証明ではありません。

## 4. 分岐すると、単数に情報が生まれる

今度は $K=\mathbb Q_5$、$L=\mathbb Q_5(\sqrt5)$ を考えます。$X^2-5$ は Eisenstein 多項式なので、[Eisenstein 拡大の整数環](../ANF10/index.md#thm-anf10-eisenstein-extension)から

$$
\mathcal O_L=\mathbb Z_5[\sqrt5],
\qquad
\pi_L=\sqrt5,\qquad
e(L/K)=2,\ f(L/K)=1
$$

です。$\sigma(\sqrt5)=-\sqrt5$ とすると、$a+b\sqrt5$ のノルムは

$$
N_{L/K}(a+b\sqrt5)=(a+b\sqrt5)(a-b\sqrt5)=a^2-5b^2.
$$

$x=a+b\sqrt5\in\mathcal O_L^\times$ なら $a,b\in\mathbb Z_5$ で $a\bmod5\ne0$ です。従って $N(x)$ の剰余は $(a\bmod5)^2$ で、必ず $\mathbb F_5^\times$ の平方です。特に平方集合は $\{1,4\}$ なので $2$ はノルムではありません。

逆に $u\in\mathbb Z_5^\times$ で $u\bmod5$ が平方なら、$r_0^2\equiv u\pmod5$ を満たす $r_0\not\equiv0$ が存在します。$2r_0\not\equiv0\pmod5$ なので [単純根の Hensel の補題](../ANF10/index.md#thm-anf10-hensel-simple) を多項式 $T^2-u$ に適用し、$r\in\mathbb Z_5^\times$ で $r^2=u$ が得られます。基礎体の元 $r$ のノルムは $r^2=u$ です。

さらに $-1\bmod5=4$ が平方であるため、同様に $s^2=-1$ を満たす $s\in\mathbb Z_5^\times$ が存在します。そこで

$$
N_{L/K}(s\sqrt5)=s^2(-5)=5.
$$

[ノルムの付値と整数環の跡](../ANF12/index.md#prop-anf12-norm-valuation)ではこの全分岐拡大について $v_5(N(x))=v_L(x)$ なので、ノルムが単数であることと $x$ が単数であることは同値です。以上の必要条件・十分条件と $5$ がノルムであることを組み合わせると、次が分かります。

<a id="prop-anf15-ramified-quadratic-norm"></a>

<!-- formal-statement-start -->
> **命題（分岐二次拡大のノルム群の例）**  
> $K=\mathbb Q_5$、$L=\mathbb Q_5(\sqrt5)$ とする。このとき

$$
N_{L/K}(L^\times)
=5^{\mathbb Z}
\{u\in\mathbb Z_5^\times:\bar u\in(\mathbb F_5^\times)^2\}.
$$

> 従って $K^\times/N_{L/K}(L^\times)$ の位数は $2$ であり、$5$ の類は自明、$2$ の類は非自明である。
<!-- formal-statement-end -->

### 証明の見取り図

付値はノルムの障害にならず、単数の剰余が平方かどうかだけが残ります。上で Hensel の補題によって平方剰余の単数がノルムになることを確かめました。

<!-- proof-start -->
### 証明

任意の $x\in L^\times$ を $x=(\sqrt5)^j w$、$j=v_L(x)\in\mathbb Z$、$w\in\mathcal O_L^\times$ と書きます。すると

$$
N(x)=(-5)^jN(w).
$$

上の剰余計算から $N(w)$ は平方剰余の単数です。一方 $-1$ と $5$ はともにノルムで、平方剰余の任意の単数 $u$ も $u=N(r)$ と表せます。従って右辺の各 $5^j u$ はノルムであり、両包含が成立します。

$\mathbb F_5^\times$ の平方類は $\{1,4\}$ と $\{2,3\}$ の二つです。単数の剰余への写像は積と両立し、$2$ は非平方なので、剰余商は正確に二元です。$v_5(5)=1$ でも $5$ がノルムである点が非分岐例と異なります。
<!-- proof-end -->

ここではノルム商が再び次数 $[L:K]=2$ と等しい一方、付値だけでは商を検出できません。二元の群なので、非自明な類 $[2]$ を非自明な Galois 自己同型 $\sigma$ に送る群同型はただ一つです。ただし、**一般の分岐 Abel 拡大**で、ノルム商を Galois 群へ一貫して対応させるにはさらなる理論が必要です。

## 5. 一般の局所 Artin 写像で何を目指すか

有限 Abel Galois 拡大 $L/K$ では、目標となる局所相互法則は正規化された全射群準同型

$$
\operatorname{rec}_{L/K}:K^\times\longrightarrow\operatorname{Gal}(L/K)
$$

を与え、その核を $N_{L/K}(L^\times)$ と一致させるものです。ここで「Abel」とは Galois 群が可換であることを意味します。非分岐拡大では前節までに具体的な写像を構成しました。分岐拡大では付値の情報に加えて単数群からの寄与を組み込む必要があります。

一般の有限 Abel 拡大についての存在・関手性を、ここでは証明済みとはしません。ANF16 でノルム群と存在に必要な論理を整理し、ANF17 で正規化と関手性を含めて局所相互法則を扱います。特に「ノルム群の指数が拡大次数に等しい」という主張を、Hilbert 90 の直後に無条件で使うことはできません。

非分岐で計算した一様化元と Frobenius の対応は、一般の局所相互法則を**算術的 Frobenius 規格化**で理解する基準です。有限非分岐拡大 $E/K$ に制限したとき

$$
\operatorname{rec}_{E/K}(\pi_K)=\operatorname{Frob}_{E/K}
$$

となるように向きを定めます。これは任意の分岐拡大の一様化元がその拡大の Frobenius に一致する、という意味ではありません。分岐拡大では剰余 Frobenius の持ち上げが一意でない場合があります。

ここまでで、ノルム商が「ノルムでは区別できない元を同じとみなす」商群であること、その商が非分岐の場合に Frobenius の冪を記録すること、分岐の場合に単数の情報も記録することが見えました。

## 6. 演習：Frobenius とノルムの障害を判定する

### A1. 九元体の Frobenius

$k=\mathbb F_3$、$k'=\mathbb F_3[i]$、$i^2=-1$ とする。$\operatorname{Frob}_3(a+bi)$ を計算し、その位数と固定体を求めよ。

- Level: A
- ID: ANF15-A1

<!-- solution-start -->
**詳細解答。** 標数 $3$ では $(a+bi)^3=a^3+b^3i^3$、$a^3=a$、$b^3=b$、$i^3=-i$ なので

$$
\operatorname{Frob}_3(a+bi)=a-bi.
$$

二回適用すれば $a+bi$ に戻り、$i$ は固定されないから位数は $2$。固定点は $a-bi=a+bi$、すなわち $2b i=0$ を満たします。標数 $3$ では $2\ne0$ なので $b=0$、固定体は $\mathbb F_3$ です。[Frobenius の定義](#def-anf15-arithmetic-frobenius)を直接確認しました。
<!-- solution-end -->

### A2. 三次非分岐拡大の元の像

$L/K$ を次数 $3$ の非分岐 Galois 局所拡大、$\pi_K$ を一様化元、$u\in\mathcal O_K^\times$ とする。$\operatorname{rec}_{L/K}(\pi_K^7u)$ と $\operatorname{rec}_{L/K}(\pi_K^{-3}u)$ を求めよ。

- Level: A
- ID: ANF15-A2

<!-- solution-start -->
**詳細解答。** [非分岐局所 Artin 写像](#def-anf15-unramified-artin)から前者は $F^7=F$、後者は $F^{-3}=1$ です。ここで $F$ の位数は $3$ なので $7\equiv1\pmod3$、$-3\equiv0\pmod3$ を用いました。単数部分の付値は $0$ であり像へ寄与しません。
<!-- solution-end -->

### A3. 基礎体から来る元のノルム

$L/K$ を次数 $f$ の有限 Galois 拡大とする。$a\in K^\times$ について $N_{L/K}(a)=a^f$ を証明し、$L=\mathbb Q_3(i)$、$K=\mathbb Q_3$ のとき $N_{L/K}(3)$ を求めよ。

- Level: A
- ID: ANF15-A3

<!-- solution-start -->
**詳細解答。** 体ノルムは $N(a)=\prod_{\sigma\in\operatorname{Gal}(L/K)}\sigma(a)$ です。$a\in K$ はすべての $\sigma$ に固定され、群の位数は $f=[L:K]$ なので

$$
N(a)=\prod_{\sigma}a=a^f.
$$

具体例は $f=2$ だから $N(3)=3^2=9$ です。したがって $3$ 自身がノルムという結論にはなりません。
<!-- solution-end -->

### A4. 分岐拡大で付値だけでは足りない

$L=\mathbb Q_5(\sqrt5)$、$K=\mathbb Q_5$ とする。$N(\sqrt5)$ を求め、$2$ がノルムでない理由を剰余体で説明せよ。

- Level: A
- ID: ANF15-A4

<!-- solution-start -->
**詳細解答。** 非自明自己同型は $\sqrt5\mapsto-\sqrt5$ なので

$$
N(\sqrt5)=\sqrt5(-\sqrt5)=-5.
$$

仮に $N(x)=2$ なら $v_5(2)=0$ と [ノルムの付値と整数環の跡](../ANF12/index.md#prop-anf12-norm-valuation) の $f=1$ から $v_L(x)=0$、すなわち $x$ は単数です。$x=a+b\sqrt5$（$a,b\in\mathbb Z_5$、$a\bmod5\ne0$）と書けば $N(x)=a^2-5b^2\equiv a^2\pmod5$。しかし $2$ は $\mathbb F_5^\times$ の平方ではないので矛盾します。
<!-- solution-end -->

### A5. 非分岐四次での商の群演算

$L/K$ を次数 $4$ の非分岐 Galois 局所拡大とする。$[a]$ を $K^\times/N(L^\times)$ の剰余類とする。$a=\pi_K^{-1}u$、$b=\pi_K^6v$（$u,v\in\mathcal O_K^\times$）のとき $[a][b]$ とその位数を求めよ。

- Level: A
- ID: ANF15-A5

<!-- solution-start -->
**詳細解答。** [非分岐ノルム商](#prop-anf15-unramified-norm-quotient)により付値を $4$ で割った余りだけが剰余類を定めます。$v_K(ab)=-1+6=5\equiv1\pmod4$ なので

$$
[a][b]=[\pi_K^5]=[\pi_K].
$$

$[\pi_K]^j=1$ と $4\mid j$ は同値なので、位数は $4$ です。$u,v$ はノルム群に含まれます。
<!-- solution-end -->

### B1. 一様化元を取り替えても同じ写像

$L/K$ を次数 $f$ の非分岐 Galois 局所拡大、$\pi$ と $\pi'$ を $K$ の一様化元とする。任意の $a\in K^\times$ に対し $a=\pi^m u=(\pi')^{m'}u'$（$u,u'\in\mathcal O_K^\times$）と書けることを使い、$m=m'$ と Artin 写像の一意性（単数を $1$ に、一様化元を $F$ に送る準同型の一意性）を示せ。

- Level: B
- ID: ANF15-B1

<!-- solution-start -->
**詳細解答。** 両側の付値を取ると $v_K(a)=m+v_K(u)=m$、同様に $v_K(a)=m'$。単数の付値は $0$ なので $m=m'$ です。$a$ のどちらの分解からも [非分岐局所 Artin 写像の定義](#def-anf15-unramified-artin) により像は $F^{v_K(a)}$ となります。

さらに準同型 $\rho:K^\times\to\langle F\rangle$ が $\rho(\pi)=F$、すべての単数 $u$ について $\rho(u)=1$ を満たすなら

$$
\rho(a)=\rho(\pi)^m\rho(u)=F^m
$$

です。従って条件を満たす準同型は [非分岐局所 Artin 写像](#def-anf15-unramified-artin) ただ一つです。
<!-- solution-end -->

### B2. 二次中間体への制限

$L/K$ を次数 $6$ の非分岐 Galois 局所拡大、$M/K$ を $L$ に含まれる次数 $2$ の非分岐中間拡大とする。$F_L$、$F_M$ をそれぞれの算術的 Frobenius 持ち上げとする。$a=\pi_K^5u$（$u\in\mathcal O_K^\times$）について $\operatorname{rec}_{L/K}(a)$ と $\operatorname{rec}_{M/K}(a)$ を求め、前者の $M$ への制限と後者が一致することを示せ。

- Level: B
- ID: ANF15-B2

<!-- solution-start -->
**詳細解答。** [非分岐局所拡大の Frobenius](#prop-anf15-frobenius-lift)から $F_L$ の位数は $6$、$F_M$ の位数は $2$ です。ゆえに

$$
\operatorname{rec}_{L/K}(a)=F_L^5,\qquad
\operatorname{rec}_{M/K}(a)=F_M^5=F_M.
$$

$F_L$ は剰余体上で $x\mapsto x^q$ を誘導するので、中間体 $M$ に制限した自己同型も $k_M$ 上で $x\mapsto x^q$ を誘導します。[唯一の持ち上げ](#prop-anf15-frobenius-lift)から $F_L|_M=F_M$ です。従って

$$
(F_L^5)|_M=(F_L|_M)^5=F_M^5=F_M.
$$

この例は非分岐塔での制限との両立を手で確認したもので、一般の分岐拡大への関手性全体の証明ではありません。
<!-- solution-end -->

### B3. 分岐二次のノルム群を再構成

$L=\mathbb Q_5(\sqrt5)$、$K=\mathbb Q_5$ とする。$v_5(N(x))=v_L(x)$、$\mathbb F_5^\times$ の平方集合は $\{1,4\}$、Hensel の補題を利用して $N(L^\times)$ を求め、$[2]^2=1$ と $[2]\ne1$ を示せ。

- Level: B
- ID: ANF15-B3

<!-- solution-start -->
**詳細解答。** $x\in\mathcal O_L^\times$ なら $x=a+b\sqrt5$、$a\bmod5\ne0$ と書けるので、$N(x)\equiv a^2\pmod5$ は平方剰余です。逆に単数 $u$ の剰余が平方なら、$T^2-u$ は法 $5$ で非零な単純根を持ち、[単純根に対する Hensel の補題](../ANF10/index.md#thm-anf10-hensel-simple)で $r^2=u$ と解けます。$r\in K$ なので $N(r)=r^2=u$ です。

また $-1$ の剰余は $4$ なので $s^2=-1$ となる $s\in K$ があり、$N(s\sqrt5)=(-1)(-5)=5$。これで付値部分の $5$ の任意の整数冪もノルムであり、

$$
N(L^\times)=5^{\mathbb Z}\{u\in\mathbb Z_5^\times:\bar u\in\{1,4\}\}.
$$

$2\bmod5$ は非平方で $[2]\ne1$、一方 $2^2=4$ は平方剰余なので $[2]^2=[4]=1$ です。
<!-- solution-end -->

### B4. Hilbert 90 とノルム商の比較

$L=\mathbb Q_3(i)$、$i^2=-1$、$K=\mathbb Q_3$ とする。$i$ がノルム $1$ で共役比になることを具体的に示し、$3$ が $N(L^\times)$ に入らないことも示せ。二つの結論が矛盾しない理由を説明せよ。

- Level: B
- ID: ANF15-B4

<!-- solution-start -->
**詳細解答。** $\sigma(i)=-i$ なので $N(i)=i(-i)=1$ です。$b=1-i$ とすれば

$$
\frac{\sigma(b)}b=\frac{1+i}{1-i}
=\frac{(1+i)^2}{(1-i)(1+i)}=\frac{2i}{2}=i.
$$

これは [巡回型 Hilbert 90](../ANF14/index.md#thm-anf14-cyclic90) の具体例です。他方 $L/K$ は非分岐二次拡大で [非分岐ノルム群](#prop-anf15-unramified-norm-quotient) により $N(L^\times)=3^{2\mathbb Z}\mathbb Z_3^\times$。$v_3(3)=1$ なので $3$ はノルムではありません。

前者は $\ker N$ が共役比の像に一致する主張、後者は $N$ の像が $K^\times$ 全体に届かない主張です。核と余核の情報は異なります。
<!-- solution-end -->

### C1. 二つの二次拡大から相互法則の構成要素を整理

$K_1=\mathbb Q_3$、$L_1=\mathbb Q_3(i)$（$i^2=-1$）、$K_2=\mathbb Q_5$、$L_2=\mathbb Q_5(\sqrt5)$ とする。

1. $L_1/K_1$ について剰余体 Frobenius の持ち上げを求め、$K_1^\times/N(L_1^\times)$ と Galois 群の同型を具体的に記述せよ。
2. $L_2/K_2$ について付値 $1$ の $5$ と付値 $0$ の $2$ がノルムかどうか判定し、ノルム商が二元であることを示せ。
3. これらの結果から、分岐拡大で「一様化元を Frobenius に送る」という非分岐の公式だけでは足りない理由を述べよ。

- Level: C
- ID: ANF15-C1

<!-- solution-start -->
**詳細解答。**

**第1問。** $X^2+1$ は $\mathbb F_3$ で既約だから拡大は非分岐で、$\operatorname{Frob}_3(i)=i^3=-i$。従って持ち上げは $\sigma(i)=-i$ です。[非分岐ノルム商](#prop-anf15-unramified-norm-quotient)によって

$$
N(L_1^\times)=3^{2\mathbb Z}\mathbb Z_3^\times,\qquad
K_1^\times/N(L_1^\times)=\{[1],[3]\}.
$$

[非分岐相互法則](#thm-anf15-unramified-reciprocity) は $[1]\mapsto1$、$[3]\mapsto\sigma$ を与えます。

**第2問。** $\sigma(\sqrt5)=-\sqrt5$ より、$N(\sqrt5)=-5$ です。さらに $\mathbb F_5$ では $-1=4$ が平方なので、[単純根に対する Hensel の補題](../ANF10/index.md#thm-anf10-hensel-simple)から、$s^2=-1$ を満たす $s\in\mathbb Z_5^\times$ が存在します。

従って

$$
N(s\sqrt5)=N(s)N(\sqrt5)=(-1)(-5)=5.
$$

ゆえに $5$ はノルムです。一方、[ノルムの付値と整数環の跡](../ANF12/index.md#prop-anf12-norm-valuation)から、ノルム $2$ を持つ元は単数でなければなりません。単数のノルムは法 $5$ で平方剰余であり、$2\notin\{1,4\}$ なので $2$ はノルムではありません。[分岐二次のノルム群](#prop-anf15-ramified-quadratic-norm)により、商の剰余類は $[1]$ と $[2]$ の二つです。

**第3問。** 非分岐拡大では単数はすべてノルムなので、付値の剰余が Galois 群の元を区別します。分岐二次例では逆に付値 $1$ の $5$ がノルムで、付値 $0$ の $2$ が非ノルムです。したがって、分岐の場合の写像は単数部分の情報を受け取らなければなりません。加えて分岐すると惰性群が自明でなくなり、剰余 Frobenius の持ち上げは非分岐の場合のように一意とは限りません。この二つが、一般の局所 Artin 写像の構成に追加理論が必要な理由です。
<!-- solution-end -->

次講 **ANF16「局所類体論：ノルム群と存在」** では、有限 Abel 拡大全体へ対応を広げる際のノルム指数・存在定理と、その証明に必要な補題を整理します。
