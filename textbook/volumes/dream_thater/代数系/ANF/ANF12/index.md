# ANF12 局所単数・ノルム・跡

[ANF11 の離散付値環と次数公式](../ANF11/index.md#thm-anf11-ef-degree)によって、有限拡大 $L/\mathbb Q_p$ の非零元は一様化元の整数冪と単元の積で書けるようになりました。次の疑問は、**単元のどれが下の体から来たノルムなのか**、また跡とノルムが一様化元に近い元についてどう振る舞うのか、ということです。

本講では整数環の単元を「剰余体で見える部分」と「$1$ に近い部分」に分けます。非分岐拡大では、剰余体のノルム・跡と $p$ 進的な逐次修正を組み合わせ、単元のノルム全射性を**証明**します。最後に分岐二次拡大で、なぜ一般化できないかを計算します。

以下、$p$ は素数、$K=\mathbb Q_p$、$L/K$ は次数 $n$ の有限拡大とします。$A=\mathcal O_L$、$\mathfrak m=\mathfrak m_L=(\pi)$、$k=A/\mathfrak m=\mathbb F_{p^f}$、$e=v_L(p)$ とします。$v_p(p)=v_L(\pi)=1$ であり、$n=ef$ です。整数環と一様化元の構成は [ANF11 の整数環定理](../ANF11/index.md#thm-anf11-local-dvr)、跡・ノルムの線形代数的定義は [ANF2 の跡とノルム](../ANF2/index.md#prop-anf2-trace-norm-properties)を参照してください。

<!-- definition-example-audit: strict -->

## 1. 単元を「剰余」と「深さ」に分ける

$A^\times$ の元は $\mathfrak m$ に属さない元であり、剰余体 $k$ では $0$ 以外に写ります。逆に $0$ でない剰余類は $A$ の単元へ持ち上がります。したがって剰余で見分けられない単元は、まさに $1+\mathfrak m$ の形です。その中でも $1+\mathfrak m^2$、$1+\mathfrak m^3$ と、$1$ への近さを刻めます。

<a id="def-anf12-unit-filtration"></a>

<!-- formal-statement-start -->
> **定義（局所単数のフィルトレーション）**  
> 有限拡大 $L/\mathbb Q_p$ の整数環 $A$ と極大イデアル $\mathfrak m$ に対し、
>
> $$
> U_L^0=A^\times,\qquad
> U_L^r=1+\mathfrak m^r
> =\{1+x:x\in\mathfrak m^r\}\quad(r\ge1)
> $$
>
> と置く。$U_L^r$ を深さ $r$ の**主単数群**（$r\ge1$）、列 $U_L^0\supset U_L^1\supset\cdots$ を単数のフィルトレーションという。
<!-- formal-statement-end -->

<!-- definition-example-start: def-anf12-unit-filtration -->
**定義の確認。** $L=K=\mathbb Q_5$ なら $\mathfrak m=5\mathbb Z_5$ で、
$6=1+5\in U_K^1$ ですが $6\notin U_K^2$ です。実際 $6-1=5\in5\mathbb Z_5$、$5\notin25\mathbb Z_5$ です。また $2\in U_K^0$ ですが法 $5$ で $2\ne1$ なので $2\notin U_K^1$ です。各集合の包含が真に異なることを確かめられます。
<!-- definition-example-end -->

$1+x$（$x\in\mathfrak m$）が単元である理由も確認しましょう。剰余が $1\ne0$ なので極大イデアルの外にあります。積については $(1+x)(1+y)=1+(x+y+xy)$、逆元は $1+x$ が局所環の単元で、法 $\mathfrak m^r$ でも $1$ に写るため $U_L^r$ 内にあります。

<a id="thm-anf12-graded-units"></a>

<!-- formal-statement-start -->
> **定理（局所単数の段階商）**  
> 上の有限拡大 $L/\mathbb Q_p$ について、剰余写像は群同型
>
> $$
> U_L^0/U_L^1\simeq k^\times
> $$
>
> を与える。またすべての整数 $r\ge1$ について、写像
>
> $$
> k\longrightarrow U_L^r/U_L^{r+1},
> \qquad \bar a\longmapsto (1+\pi^r a)U_L^{r+1}
> $$
>
> は、左辺を加法群とした群同型である。ここで $a\in A$ は $\bar a\in k$ の任意の代表である。
<!-- formal-statement-end -->

### 証明の見取り図

剰余が $1$ である単元を除くと $k^\times$ になります。さらに $1+\pi^r a$ を掛けると、$r\ge1$ では交差項 $\pi^{2r}ab$ が一段深い $\mathfrak m^{r+1}$ に入るため、「積が和になる」のです。

<!-- proof-start -->
### 証明

剰余写像 $A^\times\to k^\times$ は全射です。任意の $\bar a\ne0$ の代表 $a$ は極大イデアルに入らず単元だからです。核は剰余が $1$ の単元、すなわち $1+\mathfrak m=U_L^1$ です。第一同型定理から最初の同型を得ます。

次に $r\ge1$ とします。$a$ の代表を $a+\pi b$ に変えると
$1+\pi^r(a+\pi b)-(1+\pi^r a)=\pi^{r+1}b$ です。比を取っても $U_L^{r+1}$ に属するため写像は代表によらず定まります。

二つの代表 $a,b$ に対し
$$
(1+\pi^r a)(1+\pi^r b)
=1+\pi^r(a+b)+\pi^{2r}ab.
$$
$2r\ge r+1$ なので最後の項は $\mathfrak m^{r+1}$ に入り、群準同型です。任意の $U_L^r$ の元は $1+\pi^r a$ と書けるので全射です。

像が単位元となる条件は $1+\pi^r a\in1+\pi^{r+1}A$、すなわち $\pi^r a\in\pi^{r+1}A$ です。整域で $\pi^r$ を消せば $a\in\pi A$ となり $\bar a=0$ です。従って単射でもあります。
<!-- proof-end -->

この同型は、単元群全体をいきなり計算する代わりに、**有限体の乗法群一つと加法群の繰り返し**として理解する道具になります。

## 2. ノルムの指数と跡の整数性

任意の $x\in L$ に対し、$L$ 上の乗法写像 $m_x(y)=xy$ は $K$ 線形です。その行列式を $N_{L/K}(x)$、行列の跡を $\operatorname{Tr}_{L/K}(x)$ とします。$x$ が単元なら $m_x$ は $A$ の $\mathbb Z_p$ 基底上でも可逆な整数行列ですから、ノルムも $p$ 進単元です。一方、$x$ が $\pi$ の冪を含む場合には、ノルムの付値は剰余次数 $f$ によって決まります。

<a id="prop-anf12-norm-valuation"></a>

<!-- formal-statement-start -->
> **命題（ノルムの付値と整数環の跡）**  
> $L/\mathbb Q_p$ を有限拡大、$f=[k:\mathbb F_p]$ とする。任意の $x\in L^\times$ に対し
>
> $$
> v_p(N_{L/K}(x))=f\,v_L(x).
> $$
>
> さらに $N_{L/K}(A^\times)\subseteq\mathbb Z_p^\times$ および $\operatorname{Tr}_{L/K}(A)\subseteq\mathbb Z_p$ が成り立つ。
<!-- formal-statement-end -->

### 証明の見取り図

ノルムの付値公式は [ANF11 のノルム公式](../ANF11/index.md#prop-anf11-norm-valuation)そのものです。単元のノルムが単元になる理由、跡が整になる理由を、整数基底と整性から確認します。

<!-- proof-start -->
### 証明

$x=\pi^r u$（$u\in A^\times$、$r\in\mathbb Z$）と一意に表せます。単元 $u$ と $u^{-1}$ はどちらも $A$ 上の乗法を保つので、行列式 $N(u)$ と $N(u^{-1})$ はともに $\mathbb Z_p$ に属し、積が $1$ です。従って $N(u)\in\mathbb Z_p^\times$。

$A/\pi A=k$ の元数は $p^f$ です。$\pi$ による乗法行列は $A$ の $\mathbb Z_p$ 基底について整数行列で、その像の指数が $p^f$ なので、その行列式 $N(\pi)$ の $p$ 進付値は $f$ です（この行列式と商の元数の対応は [ANF11 のノルム公式](../ANF11/index.md#prop-anf11-norm-valuation)でも証明済みです）。ノルムの積性から
$$
v_p(N(x))=r\,v_p(N(\pi))+v_p(N(u))=rf.
$$

最後に $a\in A$ は $\mathbb Z_p$ 上整です。乗法写像 $m_a$ の特性多項式の係数は $\mathbb Z_p$ に属するので、その $X^{n-1}$ 係数の符号を反転した跡は $\mathbb Z_p$ に属します。この整性による跡の議論は [ANF11 の整数環定理の証明](../ANF11/index.md#thm-anf11-local-dvr)でも使いました。
<!-- proof-end -->

たとえば $L=\mathbb Q_5(\pi)$、$\pi^2=5$ では $\pi$ の共役が $-\pi$ ですから
$$
N(a+b\pi)=a^2-5b^2,\qquad
\operatorname{Tr}(a+b\pi)=2a
\quad(a,b\in\mathbb Q_5).
$$
ここで $N(\pi)=-5$ の付値は $1=fv_L(\pi)$ と一致します。$1+\pi$ は単元で、ノルム $-4$ も $\mathbb Z_5$ の単元です。ただし「単元のノルムは単元」から「全単元がノルム」とは結論できません。

## 3. 非分岐拡大では、剰余体の計算を持ち上げられる

**非分岐**とは $e=1$ のことです。このとき [ANF11 の次数公式](../ANF11/index.md#thm-anf11-ef-degree)から $n=f$、$\mathfrak m=pA$ となり、$p$ 自身を一様化元に選べます。したがって
$$
U_L^r=1+p^r A,\qquad
U_K^r=1+p^r\mathbb Z_p\qquad(r\ge1).
$$

$\bar a\in k=\mathbb F_{p^f}$ の有限体ノルムと跡は、$\mathbb F_p$ 線形写像「$\bar a$ による掛け算」の行列式と跡です。有限体の元を $p$ 乗すると共役が得られるので、具体的には
$$
N_{k/\mathbb F_p}(\bar a)
=\bar a^{1+p+\cdots+p^{f-1}},\qquad
\operatorname{Tr}_{k/\mathbb F_p}(\bar a)
=\bar a+\bar a^p+\cdots+\bar a^{p^{f-1}}.
$$
この二つが、$p$ 進単元のノルムを求める入口になります。

<a id="lem-anf12-finite-field-maps"></a>

<!-- formal-statement-start -->
> **補題（有限体のノルム・跡は全射）**  
> $k=\mathbb F_{p^f}$（$f\ge1$）とする。有限体ノルム $N_{k/\mathbb F_p}:k^\times\to\mathbb F_p^\times$ と有限体跡 $\operatorname{Tr}_{k/\mathbb F_p}:k\to\mathbb F_p$ はともに全射である。
<!-- formal-statement-end -->

### 証明の見取り図

ノルムには有限体の乗法群が巡回群であること、跡には「零でない多項式は次数より多くの根を持てない」という事実を使います。

<!-- proof-start -->
### 証明

まず $k^\times$ が巡回群であることを確認します。有限可換群 $G\subseteq k^\times$ の各元の位数の最小公倍数を $m$ とします。各素数冪因子ごとに最大の冪位数を持つ元から、その素数冪位数の元を取り出して掛け合わせると位数が $m$ の元が得られます。一方 $G$ の全元は $X^m-1$ の根です。体上の次数 $m$ の多項式の根は高々 $m$ 個なので $|G|\le m$。$m$ は元の位数の最小公倍数ですから Lagrange の定理より $m$ は $|G|$ を割り、特に $m\le|G|$。ゆえに $m=|G|$、$G$ は巡回群です。

$k^\times$ の生成元 $g$ は位数 $p^f-1$ を持ちます。$N(g)=g^{(p^f-1)/(p-1)}$ の位数は $p-1$ なので、$\mathbb F_p^\times$ 全体を生成します。

跡について、$T(X)=X+X^p+\cdots+X^{p^{f-1}}$ は $f=1$ の場合も含め、次数が $p^{f-1}<p^f$ の零でない多項式です。従って $k$ の全元で零にはなりません。有限体跡は $\mathbb F_p$ 線形で、その値は $\mathbb F_p$ に属します（$T(a)^p=T(a)$）。零でない線形写像 $k\to\mathbb F_p$ の像は $1$ 次元 $\mathbb F_p$ ベクトル空間全体です。
<!-- proof-end -->

次に、有限体の情報が整数環の剰余および主単数の段階商へどう移るかを計算します。

<a id="prop-anf12-residue-norm-trace"></a>

<!-- formal-statement-start -->
> **命題（非分岐拡大の段階商でのノルム・跡）**  
> $L/\mathbb Q_p$ を有限非分岐拡大、剰余体を $k=\mathbb F_{p^f}$ とする。$a\in A$ に対して
>
> $$
> \overline{N_{L/K}(a)}=N_{k/\mathbb F_p}(\bar a),
> \qquad
> \overline{\operatorname{Tr}_{L/K}(a)}
> =\operatorname{Tr}_{k/\mathbb F_p}(\bar a).
> $$
>
> またすべての $r\ge1$ と $a\in A$ について
>
> $$
> N_{L/K}(1+p^r a)
> \equiv1+p^r\operatorname{Tr}_{k/\mathbb F_p}(\bar a)
> \pmod{p^{r+1}}.
> $$
>
> 右辺の有限体跡は $\mathbb F_p$ の元を整数で代表したものと解釈する。この合同式により、段階商 $U_L^r/U_L^{r+1}\to U_K^r/U_K^{r+1}$ のノルムは有限体跡になる。
<!-- formal-statement-end -->

### 証明の見取り図

非分岐では $A/pA=k$ が体で、$A$ は $\mathbb Z_p$ 上階数 $f$ の自由加群です。$a$ の乗法行列を法 $p$ へ落とすと、有限体 $k$ の乗法行列そのものになります。$1+p^r a$ の乗法行列は $I+p^r M$ となり、行列式の一次項が跡です。

<!-- proof-start -->
### 証明

$A$ の $\mathbb Z_p$ 基底 $b_1,\ldots,b_f$ は、$A/pA=k$ の $\mathbb F_p$ 基底 $\bar b_1,\ldots,\bar b_f$ に移ります。$a b_j=\sum_i M_{ij}b_i$ と書くと $M_{ij}\in\mathbb Z_p$ であり、還元した行列 $\bar M$ は $\bar a$ による $k$ の乗法行列です。ゆえに
$$
N_{L/K}(a)=\det M,\quad
\operatorname{Tr}_{L/K}(a)=\operatorname{tr}M
$$
を法 $p$ へ落とすと、それぞれ $\det\bar M$、$\operatorname{tr}\bar M$ となり有限体ノルム・跡の定義と一致します。

$1+p^r a$ の乗法行列は $I+p^r M$ です。行列式の置換展開で $M$ を一個だけ選ぶ項を集めると
$$
\det(I+tM)=1+t\,\operatorname{tr}M+t^2 c_2+\cdots+t^f c_f
$$
（$c_j\in\mathbb Z_p$）となります。$t=p^r$ として $r\ge1$ なら $2r\ge r+1$ ですから
$$
N(1+p^r a)\equiv
1+p^r\operatorname{Tr}_{L/K}(a)
\pmod{p^{r+1}}.
$$
跡を法 $p$ で有限体跡に置き換えると主張の式を得ます。従って段階商の加法的な同型 [前節の定理](#thm-anf12-graded-units)のもとで、ノルムの誘導写像は $\operatorname{Tr}_{k/\mathbb F_p}$ です。
<!-- proof-end -->

**手で見る例。** $L=\mathbb Q_3(i)$、$i^2=-1$ は [ANF11 で整数環まで確定した非分岐二次拡大](../ANF11/index.md#def-anf11-e-f)です。$A=\mathbb Z_3[i]$、$k=\mathbb F_9$ で、共役は $i\mapsto-i$。$\bar a+\bar b i$ の有限体跡は $2\bar a$、ノルムは $\bar a^2+\bar b^2$ です。$1+3(1+i)=4+3i$ に対して
$$
N(4+3i)=4^2+3^2=25\equiv7=1+3\cdot2\pmod9.
$$
これは $\operatorname{Tr}_{\mathbb F_9/\mathbb F_3}(1+i)=2$ と一致します。

## 4. 非分岐ノルムの全射性を逐次修正で証明する

剰余体では任意の非零元がノルムです。しかし、元をただ持ち上げただけでは、ノルムは目的の単元と法 $p$ で一致するにすぎません。**法 $p$、法 $p^2$、法 $p^3$、……と一段ずつずれを直す**ことが、完備性の使いどころです。

<a id="thm-anf12-unramified-norm"></a>

<!-- formal-statement-start -->
> **定理（非分岐局所拡大のノルム・跡）**  
> $L/\mathbb Q_p$ を有限非分岐拡大、$f=[L:\mathbb Q_p]$ とする。このとき
>
> $$
> \operatorname{Tr}_{L/K}(A)=\mathbb Z_p,
> \qquad N_{L/K}(A^\times)=\mathbb Z_p^\times,
> $$
>
> $$
> N_{L/K}(U_L^r)=U_K^r\quad(r\ge1),\qquad
> N_{L/K}(L^\times)=p^{f\mathbb Z}\mathbb Z_p^\times.
> $$
>
> さらに $\operatorname{Tr}_{L/K}(p^rA)=p^r\mathbb Z_p$（$r\ge0$）である。
<!-- formal-statement-end -->

### 証明の見取り図

有限体跡の全射性から、まず整数環の跡に値 $1$ を持つ元を作れます。ノルムについては有限体ノルムで法 $p$ の値を合わせ、有限体跡で誤差を一段ずつ消します。得られた単元の極限がノルムの原像です。$p$ の付値部分は [ノルムの付値公式](#prop-anf12-norm-valuation)が決めます。

<!-- proof-start -->
### 証明

**(1) 跡。** [有限体跡の全射性](#lem-anf12-finite-field-maps)により $\bar a\in k$ を $\operatorname{Tr}_{k/\mathbb F_p}(\bar a)=1$ と選べます。$a\in A$ に持ち上げると [還元と跡の命題](#prop-anf12-residue-norm-trace)から $\operatorname{Tr}_{L/K}(a)\equiv1\pmod p$。この跡は $\mathbb Z_p^\times$ です。従って $a/\operatorname{Tr}(a)\in A$ で、その跡は $1$。$\operatorname{Tr}(A)\subseteq\mathbb Z_p$ は既知なので $\operatorname{Tr}(A)=\mathbb Z_p$。$p^r$ 倍して最後の跡の式も従います。

**(2) 深さ $r$ の主単数のノルム。** $y\in1+p^r\mathbb Z_p$（$r\ge1$）を与えます。まず $x_r=1\in1+p^r A$ と置けば $N(x_r)\equiv y\pmod{p^r}$ です。以下 $x_s\in1+p^r A$ が $N(x_s)\equiv y\pmod{p^s}$ を満たすと仮定します（$s\ge r$）。

$N(x_s)$ は単元なので
$$
y/N(x_s)\equiv1+p^s c_s\pmod{p^{s+1}}
$$
と書けます（$c_s\in\mathbb F_p$）。[有限体跡の全射性](#lem-anf12-finite-field-maps)で $\bar a_s\in k$ を選び $\operatorname{Tr}_{k/\mathbb F_p}(\bar a_s)=c_s$ とし、代表 $a_s\in A$ に対して
$$
x_{s+1}=x_s(1+p^s a_s)
$$
と置きます。[段階商のノルム合同式](#prop-anf12-residue-norm-trace)より
$$
N(x_{s+1})=N(x_s)N(1+p^s a_s)
\equiv N(x_s)(1+p^s c_s)
\equiv y\pmod{p^{s+1}}.
$$
しかも $x_{s+1}-x_s\in p^s A$。従って $(x_s)$ は $p$ 進 Cauchy 列であり、[整数環の完備性](../ANF11/index.md#thm-anf11-local-dvr)から $x=\lim_s x_s\in1+p^r A$ が存在します。ノルムは行列式という係数多項式なので連続で、$N(x)=y$。逆包含は $N(1+p^r a)\equiv1\pmod{p^r}$（行列式の展開）から従います。

**(3) 単元全体。** 任意の $u\in\mathbb Z_p^\times$ の剰余 $\bar u\in\mathbb F_p^\times$ を考えます。[有限体ノルムの全射性](#lem-anf12-finite-field-maps)で $\bar b\in k^\times$ を $N_{k/\mathbb F_p}(\bar b)=\bar u$ と選び、その単元代表 $b\in A^\times$ を取ります。[還元とノルムの命題](#prop-anf12-residue-norm-trace)から $u/N(b)\in1+p\mathbb Z_p$。前段で $U_L^1$ のノルムは $U_K^1$ に全射なので、$c\in U_L^1$ で $N(c)=u/N(b)$ を選べます。よって $N(bc)=u$。

**(4) 全元。** $e=1$ だから $p$ は $L$ の一様化元で、任意の $x\in L^\times$ は $x=p^j u$（$j\in\mathbb Z$、$u\in A^\times$）です。$N(p)=p^f$（$p$ は基礎体の元なので乗法行列は $pI_f$）。従って
$$
N(L^\times)=p^{f\mathbb Z}N(A^\times)=p^{f\mathbb Z}\mathbb Z_p^\times.
$$
<!-- proof-end -->

非分岐二次拡大 $\mathbb Q_3(i)$ では、**$3$ 進単元はすべてノルム**であり、$3$ の指数は偶数でなければノルムになりません。たとえば $N(3)=9$、$N(1+i)=2$。$3$ 自身は $v_3(3)=1$ が $f=2$ の倍数でないためノルムではありません。

## 5. 分岐拡大では何が壊れるか

$L=\mathbb Q_5(\pi)$、$\pi^2=5$ は [ANF10 の Eisenstein 拡大](../ANF10/index.md#thm-anf10-eisenstein-extension)で $A=\mathbb Z_5[\pi]$、$e=2$、$f=1$ です。任意の $a,b\in\mathbb Z_5$ に対し
$$
N(a+b\pi)=a^2-5b^2\equiv a^2\pmod5.
$$
$a+b\pi$ が単元であることは $a\not\equiv0\pmod5$ と同値なので、**単元のノルムの剰余は平方に限られます**。$\mathbb F_5^\times$ の平方は $1,4$ だけで、$2\in\mathbb Z_5^\times$ はノルムではありません。このとき $N(1+\pi)=-4\equiv1\pmod5$ です。

非分岐の証明がそのまま使えない理由は明確です。$e=1$ のとき $\mathfrak m=pA$ だったので、$A/pA$ 自体が剰余体で、整数基底を法 $p$ に落とすと有限体の乗法行列が得られました。$e=2$ では $\mathfrak m=(\pi)$ で $pA=\mathfrak m^2$、$A/pA$ は零でない冪零元 $\pi\bmod pA$ を持つ**体ではない環**です。したがって「法 $p$ のノルムが剰余体ノルムに一致する」という議論は失われます。

跡についても、$L=\mathbb Q_2(\sqrt2)$ と置くと
$$
\operatorname{Tr}_{L/\mathbb Q_2}(a+b\sqrt2)=2a
\quad(a,b\in\mathbb Z_2),
$$
ゆえに $\operatorname{Tr}(\mathcal O_L)=2\mathbb Z_2$ です。[ANF10 の整数環構成](../ANF10/index.md#thm-anf10-eisenstein-extension)を用いて $\mathcal O_L=\mathbb Z_2[\sqrt2]$ と確認できます。非分岐での跡の全射性も分岐では一般には成り立ちません。

ここまでで次講の分岐群へ進む準備ができました。単数群の「深さ」は、体の自己同型がどの段階まで各元を動かさないかを測る際にも使います。

## 6. 演習：単数の深さ・有限体・ノルムの持ち上げ

### A1. 二段階の主単数

$K=\mathbb Q_7$ について $8,50,2$ が $U_K^0,U_K^1,U_K^2$ のそれぞれに属するか判定せよ。

- Level: A
- ID: ANF12-A1

<!-- solution-start -->
**詳細解答。** $U_K^0=\mathbb Z_7^\times$、$U_K^1=1+7\mathbb Z_7$、$U_K^2=1+49\mathbb Z_7$ です。$8$ は $7$ の倍数でないので $U^0$ に属し、$8-1=7$ より $U^1$ に属しますが、$7$ は $49$ の倍数でないので $U^2$ には入りません。$50-1=49$ より $50\in U^2\subset U^1\subset U^0$。$2$ は単元ですが $2-1=1\notin7\mathbb Z_7$ なので $U^1,U^2$ に属しません。
<!-- solution-end -->

### A2. 積が和になる階層

$K=\mathbb Q_5$、$r=2$ とする。$1+25\cdot2$、$1+25\cdot3$ の $U_K^2/U_K^3$ における積を計算し、$\mathbb F_5$ の加法と比較せよ。

- Level: A
- ID: ANF12-A2

<!-- solution-start -->
**詳細解答。** 積は $51\cdot76=3876$ です。直接展開すると
$$
(1+25\cdot2)(1+25\cdot3)
=1+25(2+3)+25^2\cdot6.
$$
$25^2$ は $5^3=125$ の倍数だから、法 $U_K^3=1+125\mathbb Z_5$ の段階で積は $1+25\cdot5\equiv1\pmod{125}$ に一致します。$\mathbb F_5$ でも $2+3=0$ です。これが [段階商の同型](#thm-anf12-graded-units)の具体例です。
<!-- solution-end -->

### A3. ノルムと付値

$L=\mathbb Q_5(\pi)$、$\pi^2=5$ とし、$x=\pi^3(1+\pi)$ とする。$v_5(N(x))$ を公式から求め、ノルムを直接計算せよ。

- Level: A
- ID: ANF12-A3

<!-- solution-start -->
**詳細解答。** この拡大は $f=1$、$v_L(\pi)=1$ で、$1+\pi$ は単元だから $v_L(x)=3$ です。[ノルムの付値公式](#prop-anf12-norm-valuation)から $v_5(N(x))=1\cdot3=3$。共役 $\pi\mapsto-\pi$ により $N(\pi)=-5$、$N(1+\pi)=1-5=-4$ ですから
$$
N(x)=(-5)^3(-4)=500=5^3\cdot4.
$$
右辺の $5$ 進付値は $3$ で一致します。
<!-- solution-end -->

### A4. 非分岐二次拡大の跡

$L=\mathbb Q_3(i)$、$i^2=-1$ で $x=2+3i$ とする。$\operatorname{Tr}(x)$、$N(x)$、それらの法 $3$ の剰余を求めよ。

- Level: A
- ID: ANF12-A4

<!-- solution-start -->
**詳細解答。** 共役は $i\mapsto-i$ なので
$$
\operatorname{Tr}(x)=(2+3i)+(2-3i)=4,\quad
N(x)=(2+3i)(2-3i)=4+9=13.
$$
法 $3$ の値は順に $1,1$ です。剰余体では $\bar x=2$ なので有限体跡は $2+2=4\equiv1$、有限体ノルムは $2\cdot2=4\equiv1$。両方とも [剰余への移行公式](#prop-anf12-residue-norm-trace)と一致します。
<!-- solution-end -->

### A5. 非分岐ノルムの指数条件

$L/\mathbb Q_3$ を次数 $4$ の有限非分岐拡大とする。$3^8\cdot2$ と $3^3\cdot2$ のうち、$N_{L/K}(L^\times)$ に属するものを判定せよ。

- Level: A
- ID: ANF12-A5

<!-- solution-start -->
**詳細解答。** 非分岐なので $f=[L:K]=4$ で、[非分岐ノルム定理](#thm-anf12-unramified-norm)によってノルム群は $3^{4\mathbb Z}\mathbb Z_3^\times$ です。$2\in\mathbb Z_3^\times$ は単元なのでその値自体に追加条件はありません。$8$ は $4$ の倍数なので $3^8\cdot2$ はノルムです。一方 $3$ は $4$ の倍数でないため $3^3\cdot2$ はノルムではありません。
<!-- solution-end -->

### B1. 有限体の跡で段階のノルムを求める

$L=\mathbb Q_3(i)$、$i^2=-1$ において $x=1+3(a+bi)$（$a,b\in\mathbb Z_3$）とする。$N(x)$ を法 $9$ で計算し、段階商の有限体跡と照合せよ。$a=1,b=1$ の数値も求めよ。

- Level: B
- ID: ANF12-B1

<!-- solution-start -->
**詳細解答。** $x=(1+3a)+3bi$ なので共役との積は
$$
N(x)=(1+3a)^2+9b^2
=1+6a+9(a^2+b^2)
\equiv1+3(2a)\pmod9.
$$
剰余体 $\mathbb F_9/\mathbb F_3$ の跡は $\operatorname{Tr}(\bar a+\bar b i)=2\bar a$ であり、[段階商のノルム合同式](#prop-anf12-residue-norm-trace)に一致します。$a=b=1$ なら $x=4+3i$ で、$N(x)=16+9=25\equiv7\pmod9$、右辺も $1+3\cdot2=7$ です。
<!-- solution-end -->

### B2. 分岐ではノルムが全射ではない

$L=\mathbb Q_5(\sqrt5)$ で任意の整数環の単元 $u$ に対し、$N(u)\bmod5$ が平方となることを証明し、$2\in\mathbb Q_5^\times$ が $L^\times$ のノルムでないことまで示せ。

- Level: B
- ID: ANF12-B2

<!-- solution-start -->
**詳細解答。** $\pi=\sqrt5$ とすると [Eisenstein の整数環定理](../ANF10/index.md#thm-anf10-eisenstein-extension)から $A=\mathbb Z_5[\pi]$、$e=2,f=1$ です。$u=a+b\pi$ が単元であるための必要十分条件は $a\not\equiv0\pmod5$。共役計算で
$$
N(u)=(a+b\pi)(a-b\pi)=a^2-5b^2\equiv a^2\pmod5.
$$
よって単元のノルムの剰余は $\{1,4\}$ に含まれます。もし $2=N(x)$（$x\in L^\times$）なら [付値公式](#prop-anf12-norm-valuation)から $0=v_5(2)=f\,v_L(x)=v_L(x)$ で、$x$ は単元です。しかし法 $5$ で $2$ は平方でないため矛盾します。単元だけでなく $L^\times$ 全体のノルムでないことを確認しました。
<!-- solution-end -->

### B3. 有限体跡が非零であることを証明する

$k=\mathbb F_{p^f}$ において、$T(a)=a+a^p+\cdots+a^{p^{f-1}}$ が $\mathbb F_p$ に値を持ち、$k\to\mathbb F_p$ の全射写像であることを、根の個数から示せ。

- Level: B
- ID: ANF12-B3

<!-- solution-start -->
**詳細解答。** $a^{p^f}=a$ が有限体の全元で成立するので
$$
T(a)^p=a^p+a^{p^2}+\cdots+a^{p^f}
=T(a).
$$
$z^p=z$ を満たす $k$ の元は $\mathbb F_p$ の元ですから、$T(a)\in\mathbb F_p$。$T$ は $p$ 乗が $\mathbb F_p$ 線形であるため $\mathbb F_p$ 線形です。$T(X)=X+X^p+\cdots+X^{p^{f-1}}$ は最高次係数 $1$ の非零多項式で、次数 $p^{f-1}$ は $|k|=p^f$ より小さいので、$k$ の全元を根とすることはできません。したがって $T$ は零写像ではなく、像は $\mathbb F_p$ の零でない線形部分空間、すなわち全体です。
<!-- solution-end -->

### B4. ノルムの一段修正

$L/\mathbb Q_3$ を非分岐二次拡大とし、$y=1+3c$（$c\in\mathbb Z_3$）とする。$N(x_1)\equiv y\pmod3$ を満たす $x_1=1$ から始め、有限体跡の全射性を使って $x_2=1+3a$ を選び $N(x_2)\equiv y\pmod9$ を示せ。

- Level: B
- ID: ANF12-B4

<!-- solution-start -->
**詳細解答。** $x_1=1$ は $N(x_1)=1\equiv1+3c=y\pmod3$ を満たします。$c$ の法 $3$ の剰余を $\bar c\in\mathbb F_3$ とします。[有限体跡の全射性](#lem-anf12-finite-field-maps)から $\bar a\in\mathbb F_9$ を $\operatorname{Tr}_{\mathbb F_9/\mathbb F_3}(\bar a)=\bar c$ と選び、$a\in A$ に持ち上げます。$x_2=1+3a$ は $U_L^1$ に属します。[ノルムの合同式](#prop-anf12-residue-norm-trace)より
$$
N(x_2)\equiv1+3\operatorname{Tr}_{\mathbb F_9/\mathbb F_3}(\bar a)
=1+3\bar c\equiv1+3c=y\pmod9.
$$
最後の合同は $c$ とその法 $3$ の代表の差が $3$ の倍数だからです。これを各 $3^s$ の精度で繰り返し完備性によって極限を取るのが全射性の証明です。
<!-- solution-end -->

### C1. 二つのノルム障害を区別する

次の二つの二次拡大を比較せよ。

- $L_1=\mathbb Q_3(i)$、$i^2=-1$。
- $L_2=\mathbb Q_5(\pi)$、$\pi^2=5$。

それぞれについて $e,f$ を求め、$L_1^\times$ のノルムとして $3$ と $2$ の可否を判定し、$L_2^\times$ のノルムとして $5$ と $2$ の可否を判定せよ。結論が異なる理由を、**付値**および**剰余単元**の二段階で説明せよ。

- Level: C
- ID: ANF12-C1

<!-- solution-start -->
**詳細解答。** まず $L_1$ は $X^2+1\bmod3$ が既約な非分岐二次拡大で、[整数環と剰余体の例](../ANF11/index.md#def-anf11-e-f)より $(e,f)=(1,2)$ です。[非分岐ノルム定理](#thm-anf12-unramified-norm)から
$$
N_{L_1/\mathbb Q_3}(L_1^\times)
=3^{2\mathbb Z}\mathbb Z_3^\times.
$$
したがって $3$ は付値 $1$ が $2$ の倍数でないため不可能。一方 $2$ は単元であり実際 $N(1+i)=1+1=2$ です。

$L_2$ では $X^2-5$ が Eisenstein なので $(e,f)=(2,1)$。$N(\pi)=-5$、$N(1)=1$ です。$5$ は $N(-\pi)$ ではなく $N(\pi)$ と同じ $-5$ なので、この情報だけで可否を決めてはいけません。$5=N(\pi)\cdot(-1)$ ですから $5$ がノルムかどうかは $-1$ が単元ノルムかに帰着します。$-1\equiv4\pmod5$ は平方で、$2^2\equiv-1\pmod5$。[単純根の Hensel の補題](../ANF10/index.md#thm-anf10-hensel-simple)を $X^2+1$ と法 $5$ の根 $2$ に適用すると $t\in\mathbb Z_5$ で $t^2=-1$ を満たすものが存在します（$2t\equiv4\not\equiv0\pmod5$）。基礎体元 $t$ のノルムは $t^2=-1$ なので $N(t\pi)=(-1)(-5)=5$。従って $5$ はノルムです。

一方 $2$ は付値 $0$ なので、もし $2=N(x)$ なら [ノルムの付値公式](#prop-anf12-norm-valuation)から $v_L(x)=0$、すなわち $x$ は単元です。$x=a+b\pi$（$a,b\in\mathbb Z_5$, $a$ は単元）と書くと
$$
N(x)=a^2-5b^2\equiv a^2\pmod5.
$$
平方剰余は $1,4$ だけなので $2$ にはなれません。

まとめると、$L_1$ では「**付値が剰余次数 $f=2$ の倍数**」という障害だけが残り単元はすべてノルムです。$L_2$ では $f=1$ なので付値障害はありませんが、**単元の剰余が平方か**という別の障害があります。二つを混同しないことが重要です。
<!-- solution-end -->

次講 ANF13「局所拡大とGalois分岐群」では、単元の深さと自己同型の作用を結び付け、分岐を群のフィルトレーションとして捉えます。
