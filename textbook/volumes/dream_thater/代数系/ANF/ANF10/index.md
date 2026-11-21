# ANF10 Henselの補題と局所体の拡大

[ANF9の完備化定理](../ANF9/index.md#thm-anf9-completion-field)で、素数 $p$ ごとに完備な体 $\mathbb Q_p$ とその整数環 $\mathbb Z_p$ を得ました。さらに [逆極限による同定](../ANF9/index.md#thm-anf9-inverse-limit-isomorphism)は、一つの数の法 $p,p^2,p^3,\ldots$ の互換な近似をまとめられることを示します。

次は **多項式方程式の解**です。法 $p$ で根を見つけても、法 $p^2$ で根があるとは限りません。しかし、根の位置で導関数が $p$ の倍数でないなら、近似解を一意に持ち上げられます。これを Hensel の補題と呼びます。さらに、$\mathbb Q_p$ 自身に根を持たない多項式を使い、新しい局所体を作ります。

本講では素数 $p$ を固定し、$v_p(p)=1$、$v_p(0)=\infty$ とします。[付値と単元の定理](../ANF9/index.md#prop-anf9-dvr-structure)より、$x\in\mathbb Z_p$ が単元であることと $v_p(x)=0$ は同値です。$\mathbb F_p=\mathbb Z_p/p\mathbb Z_p$ は $p$ 個の元からなる体です。多項式 $f\in\mathbb Z_p[X]$ の係数を法 $p$ に写したものを $\bar f\in\mathbb F_p[X]$ と記し、$f'$ は形式微分を表します。

<!-- definition-example-audit: strict -->

## 1. 法 $p$ の根を無限精度へ持ち上げる

例えば $f(X)=X^2-2$ は $\mathbb F_7$ で $3$ を根に持ちます。実際 $f(3)=7$ です。$X=3+7t$ として平方を展開すると

$$
f(3+7t)=7+42t+49t^2
=7(1+6t+7t^2).
$$

したがって法 $49$ で根とするには $1+6t\equiv0\pmod7$ が必要十分です。$6$ は $\mathbb F_7$ の単元で、$t\equiv1\pmod7$ と一意に決まります。根は $3$ から $10$ へ改良され、$f(10)=98$ は $49$ の倍数です。

この計算の鍵は、傾き $f'(3)=6$ が法 $7$ で零でないことです。

<a id="def-anf10-simple-residue-root"></a>

<!-- formal-statement-start -->
> **定義（法 $p$ の単純根）**  
> 素数 $p$、$f\in\mathbb Z_p[X]$、$a\in\mathbb Z_p$ とする。$f(a)\equiv0\pmod p$ かつ $f'(a)\not\equiv0\pmod p$ のとき、剰余類 $\bar a\in\mathbb F_p$ を $\bar f$ の **単純根**という。すなわち、根であると同時に導関数の値が $\mathbb F_p$ で非零である。
<!-- formal-statement-end -->

<!-- definition-example-start: def-anf10-simple-residue-root -->
**定義の確認。** $p=7$、$f=X^2-2$、$a=3$ なら $f(3)=7\equiv0$、$f'(3)=6\not\equiv0$ で、二条件が成り立ちます。一方、$p=2$、$g=X^2-1$、$a=1$ では $g(1)=0$ ですが $g'(1)=2\equiv0$ なので単純根ではありません。
<!-- definition-example-end -->

<a id="thm-anf10-hensel-simple"></a>

<!-- formal-statement-start -->
> **定理（単純根に対する Hensel の補題）**  
> 素数 $p$、$f\in\mathbb Z_p[X]$、$a_1\in\mathbb Z_p$ とし、$f(a_1)\equiv0\pmod p$、$f'(a_1)\not\equiv0\pmod p$ と仮定する。このとき $f(\alpha)=0$ かつ $\alpha\equiv a_1\pmod p$ を満たす $\alpha\in\mathbb Z_p$ が **ただ一つ**存在する。
<!-- formal-statement-end -->

### 証明の見取り図

法 $p^m$ の根 $a_m$ が見つかったら、$a_{m+1}=a_m+t_mp^m$ の補正桁 $t_m\in\{0,\ldots,p-1\}$ を選びます。一次の項が単元なので桁は一意に決まります。補正量は高い $p$ の冪を含むため、列はCauchy列となります。

<!-- proof-start -->
### 証明

最初の $a_1$ を固定し、帰納的に $f(a_m)\equiv0\pmod {p^m}$、$a_m\equiv a_1\pmod p$ を満たす $a_m\in\mathbb Z_p$ を作ります。$m\ge1$ とし、$f(a_m)=p^m b_m$（$b_m\in\mathbb Z_p$）と書きます。

整数係数多項式の各単項式について二項定理を使うと、$h\in\mathbb Z_p$ に対して

$$
f(x+h)=f(x)+hf'(x)+h^2R(x,h),
\qquad R(x,h)\in\mathbb Z_p
$$

です。$h=t p^m$ と置けば $2m\ge m+1$ なので

$$
f(a_m+tp^m)
\equiv p^m\bigl(b_m+t f'(a_m)\bigr)
\pmod {p^{m+1}}.
$$

$a_m\equiv a_1\pmod p$ より $f'(a_m)\equiv f'(a_1)\not\equiv0\pmod p$ です。よって $\mathbb F_p$ で一次方程式

$$
\bar b_m+\bar t\,\overline{f'(a_m)}=0
$$

にはただ一つの解 $\bar t$ があり、その $0,\ldots,p-1$ の代表を $t_m$ とします。$a_{m+1}=a_m+t_mp^m$ は要求を満たします。

$m>n$ なら差 $a_m-a_n$ は $p^n\mathbb Z_p$ に入ります。したがって $v_p(a_m-a_n)\ge n$ であり、[完備性](../ANF9/index.md#thm-anf9-completion-field)から極限 $\alpha\in\mathbb Z_p$ が存在します。任意の $n$ について $f(a_m)\in p^n\mathbb Z_p$（$m\ge n$）です。多項式は連続で、$p^n\mathbb Z_p$ は閉集合だから $f(\alpha)\in p^n\mathbb Z_p$ です。すべての $n$ について成立するので $f(\alpha)=0$ です。また $\alpha\equiv a_1\pmod p$ です。

一意性を示します。$\alpha,\beta\equiv a_1\pmod p$ がともに根とすると、差の因数分解から

$$
0=f(\alpha)-f(\beta)
=(\alpha-\beta)G(\alpha,\beta)
$$

となります。ここで $G(X,Y)=(f(X)-f(Y))/(X-Y)\in\mathbb Z_p[X,Y]$ は多項式です。$G(a_1,a_1)=f'(a_1)$ なので $G(\alpha,\beta)\equiv f'(a_1)\not\equiv0\pmod p$ であり、$G(\alpha,\beta)$ は単元です。$\mathbb Z_p$ は整域なので $\alpha-\beta=0$、つまり $\alpha=\beta$ です。
<!-- proof-end -->

**具体例。** $p=7$、$f=X^2-2$ では $a_1=3$ の持ち上げが $10\bmod49$ となりました。別の単純根 $4\equiv-3\bmod7$ もあり、その持ち上げは $-10\equiv39\bmod49$ です。この二つの極限は互いに異なる $\mathbb Q_7$ の平方根です。

### 導関数が零なら何が壊れるか

$g=X^2-1$ を $p=2$ で考えると、$1$ は法 $2$ の根ですが $g'(1)=2\equiv0$ です。実際 $\mathbb Z_2$ では $1$ と $-1$ が **ともに**根で、法 $2$ の剰余は同じです。補正桁を決める一次方程式の係数が零となり、一意性が消えています。また $X^2-2$ は法 $2$ で $0$ を根に持っても、$\mathbb Q_2$ に根を持ちません。もし $x^2=2$ なら $2v_2(x)=1$ となり、左辺が偶数であることと矛盾します。単純根の仮定は単なる飾りではありません。

## 2. Newton反復で精度を倍増する

一桁ずつ持ち上げる代わりに、導関数を割って補正する方法もあります。$f'(a)$ が単元なら

$$
N_f(a)=a-\frac{f(a)}{f'(a)}
$$

を計算できます。分母が単元であることは [ANF9の単元判定](../ANF9/index.md#prop-anf9-dvr-structure)から確認できます。

<a id="prop-anf10-newton-doubling"></a>

<!-- formal-statement-start -->
> **命題（単純根の Newton 反復）**  
> 素数 $p$、$f\in\mathbb Z_p[X]$、$a_0\in\mathbb Z_p$ について $r_0=v_p(f(a_0))\ge1$、$v_p(f'(a_0))=0$ とする。$a_{j+1}=N_f(a_j)$ と定めると、各反復は定義でき、$v_p(f'(a_j))=0$ が保たれ、
>
> $v_p(f(a_j))\ge 2^j r_0$ が成り立つ。したがって $a_j$ は $f$ の根へ収束する。
<!-- formal-statement-end -->

### 証明の見取り図

一次の誤差は補正によって相殺され、残るのは補正量の **二乗以上**です。そのため誤差の付値が少なくとも倍になります。

<!-- proof-start -->
### 証明

$r_j=v_p(f(a_j))\ge1$ とし、$f'(a_j)$ を単元と仮定します。補正量を $h_j=-f(a_j)/f'(a_j)$ と置くと

$$
v_p(h_j)=r_j\ge1.
$$

導関数も整数係数多項式なので $f'(a_j+h_j)-f'(a_j)\in h_j\mathbb Z_p\subset p\mathbb Z_p$ です。従って $f'(a_{j+1})$ は法 $p$ で以前と一致し、単元です。前節の二次剰余付きの展開に $h_j$ を代入すると

$$
f(a_{j+1})=f(a_j)+f'(a_j)h_j+h_j^2R(a_j,h_j)
=h_j^2R(a_j,h_j).
$$

従って $r_{j+1}\ge2r_j$ です。帰納法で $r_j\ge2^jr_0$ が成立します。さらに $v_p(a_{j+1}-a_j)=r_j\to\infty$ なので Cauchy 列になり、その極限は前節と同様に根です。$f(a_j)=0$ となる場合はそこで反復を停止し、すでに根を得ています。
<!-- proof-end -->

## 3. 導関数が単元でなくてもよい場合

補正したい点で $f'(a)$ が $p$ の倍数であっても、残差 $f(a)$ が **さらに十分多く** $p$ で割れるなら成功します。このとき誤差の付値 $r$ と導関数の付値 $d$ を別々に追います。

<a id="thm-anf10-hensel-strong"></a>

<!-- formal-statement-start -->
> **定理（強い形の Hensel の補題）**  
> 素数 $p$、$f\in\mathbb Z_p[X]$、$a\in\mathbb Z_p$ とし、$f'(a)\ne0$ とする。$r=v_p(f(a))$、$d=v_p(f'(a))\ge0$ が
>
> $r>2d$
>
> を満たすなら、$f(\alpha)=0$ かつ $v_p(\alpha-a)\ge r-d$ を満たす $\alpha\in\mathbb Z_p$ が存在する。この $\alpha$ は $a+p^{d+1}\mathbb Z_p$ にある根として一意である。$f(a)=0$ の場合は $\alpha=a$ とする。
<!-- formal-statement-end -->

### 証明の見取り図

Newton の補正 $h=-f(a)/f'(a)$ は付値 $r-d>d$ を持ちます。従って導関数の付値 $d$ を変えません。残差の新しい付値は少なくとも $2(r-d)$ となり、差 $r-2d$ が反復ごとに倍以上になります。

<!-- proof-start -->
### 証明

$f(a)=0$ の場合は既に根があり、後述の一意性をそのまま適用できます。以下 $r<\infty$ とします。$a_0=a$、$r_j=v_p(f(a_j))$ と置き、$d_j=v_p(f'(a_j))$ を追います。初期値で $r_0>2d$ です。

$f'(a_j)\ne0$、$d_j=d$、$r_j>2d$ と仮定し、$h_j=-f(a_j)/f'(a_j)$ と置きます。体 $\mathbb Q_p$ で商が定義でき、$v_p(h_j)=r_j-d>d\ge0$ なので $h_j\in\mathbb Z_p$ です。$a_{j+1}=a_j+h_j$ とすると

$$
f'(a_{j+1})-f'(a_j)\in h_j\mathbb Z_p,
\qquad v_p(h_j)>d.
$$

[付値の和の等号条件](../ANF9/index.md#prop-anf9-valuation-rules)により $v_p(f'(a_{j+1}))=d$ です。二次剰余付き展開より

$$
f(a_{j+1})=h_j^2R(a_j,h_j),
\qquad
r_{j+1}\ge 2(r_j-d).
$$

従って

$$
r_{j+1}-2d\ge 2(r_j-2d)
\ge 2^{j+1}(r_0-2d)>0.
$$

ゆえに $v_p(h_j)=r_j-d\to\infty$、$a_j$ はCauchy列です。[完備性](../ANF9/index.md#thm-anf9-completion-field)から極限 $\alpha\in\mathbb Z_p$ が存在し、多項式の連続性で $f(\alpha)=0$ です。各補正量は $p^{r_0-d}\mathbb Z_p$ に入り、和の極限もそこに入るため $v_p(\alpha-a)\ge r_0-d>d$ です。

一意性では、$x,y\in a+p^{d+1}\mathbb Z_p$ とし、第一節の差商多項式 $G$ を用います。$G(x,y)-G(a,a)\in p^{d+1}\mathbb Z_p$、$G(a,a)=f'(a)$ の付値は $d$ なので $v_p(G(x,y))=d$ です。$f(x)=f(y)=0$ なら $(x-y)G(x,y)=0$ で、$G(x,y)\ne0$ より $x=y$ です。
<!-- proof-end -->

例えば $p=3$、$f=X^2-10$、$a=1$ では $f(1)=-9$ なので $r=2$、$f'(1)=2$ なので $d=0$。$2>0$ を満たし、$1$ に法 $9$ で合同な根が存在します。$X=1+9t$ を代入すると

$$
f(1+9t)=-9+18t+81t^2,
$$

法 $27$ で根となる条件は $-1+2t\equiv0\pmod3$ です。$t\equiv2$ を選べば $a=19$ となり、$19^2-10=351=27\cdot13$ です。

## 4. 根が持ち上がると多項式が分解する

<a id="cor-anf10-squarefree-splitting"></a>

<!-- formal-statement-start -->
> **系（相異なる根の持ち上げと分解）**  
> 素数 $p$ とモニック多項式 $f\in\mathbb Z_p[X]$（次数 $n\ge1$）を取り、$\bar f\in\mathbb F_p[X]$ が次数 $n$ の相異なる一次因子へ分解すると仮定する。このとき相異なる $\alpha_1,\ldots,\alpha_n\in\mathbb Z_p$ が存在し、
>
> $f(X)=\prod_{i=1}^{n}(X-\alpha_i)$
>
> が $\mathbb Z_p[X]$ で成立する。
<!-- formal-statement-end -->

<!-- proof-start -->
### 証明

$\bar f(X)=\prod_{i=1}^n(X-\bar a_i)$ とし、$\bar a_i$ は相異なるものとします。各点で

$$
\bar f'(\bar a_i)=\prod_{j\ne i}(\bar a_i-\bar a_j)\ne0
$$

です。したがって [単純根の Hensel の補題](#thm-anf10-hensel-simple)を各 $\bar a_i$ に適用でき、根 $\alpha_i\in\mathbb Z_p$ を得ます。剰余が異なるのでこれらの根も相異なります。係数環 $\mathbb Z_p$ でモニック一次式による割り算は可能なので、根 $\alpha_i$ ごとに因子 $X-\alpha_i$ が割り切れます。相異なる $n$ 個の根を持つ次数 $n$ のモニック多項式は、体 $\mathbb Q_p$ 上でこの積に等しく、両辺は $\mathbb Z_p[X]$ に属するので要求の等式が従います。
<!-- proof-end -->

**適用の範囲。** ここでは法 $p$ の因数が **相異なる一次式**であると仮定しました。法 $p$ の一般の互いに素な多項式因子を持ち上げる形もありますが、本講の証明をそのまま一般因子へ拡張したと主張はしません。

## 5. 根を付け加えて有限拡大を作る

局所体は、ここでは「非自明な離散付値に関して完備で、剰余体が有限である体」を指します。離散付値とは、非零元の付値の値が整数群になるように規格化した付値で、整数環は付値が非負の元全体、剰余体はその極大イデアルで割った体です。[ANF9の $p$ 進整数環](../ANF9/index.md#prop-anf9-dvr-structure)はこの具体例です。

<a id="def-anf10-finite-local-extension"></a>

<!-- formal-statement-start -->
> **定義（局所体の有限拡大）**  
> $K$ を完備な離散付値体で剰余体が有限のものとする。体拡大 $L/K$ の拡大次数 $[L:K]$ が有限であり、$K$ の付値が $L$ に拡張され、その付値で $L$ が完備・剰余体が有限となるとき、$L/K$ を局所体の有限拡大という。本講では $K=\mathbb Q_p$ とし、後述の Eisenstein 多項式による拡大について、この条件を直接証明する。
<!-- formal-statement-end -->

**定義の確認への準備。** $\mathbb Q_p$ は [ANF9の構成](../ANF9/index.md#thm-anf9-completion-field)により完備で、$\mathbb Z_p/p\mathbb Z_p=\mathbb F_p$ は有限です。$L=\mathbb Q_p(\pi)$、$\pi^2=p$ とした場合に、$[L:\mathbb Q_p]=2$、$L$ の整数環が $\mathbb Z_p[\pi]$ で、その付値の規格化が $v_L(\pi)=1$、$v_L(p)=2$、剰余体が $\mathbb F_p$ であることを第7節で導きます。単に記号を書くだけでなく、有限拡大の各条件をそこで実際に確認します。
<!-- definition-example-end -->

**体としての作り方。** $\mathbb Q_p[X]$ の次数 $n$ の既約モニック多項式 $f$ を取ると、

$$
L=\mathbb Q_p[X]/(f),\qquad \pi=X\bmod(f)
$$

は体で、$1,\pi,\ldots,\pi^{n-1}$ が $\mathbb Q_p$ 上の基底です。したがって $[L:\mathbb Q_p]=n$ です。体であることは既約多項式が生成するイデアルが極大であることから従います。基底による一意表示は多項式の除法で得られます。

## 6. Eisenstein 多項式は既約になる

単純根の補題では元の体の **中**に根が現れました。一方 $X^2-p$ は $\mathbb Q_p$ には根がありません（$2v_p(x)=1$ が不可能）。こうした多項式からは、体を拡大して根を付け加えることができます。

<a id="def-anf10-eisenstein"></a>

<!-- formal-statement-start -->
> **定義（Eisenstein 多項式）**  
> 素数 $p$ と次数 $n\ge1$ のモニック多項式
>
> $f(X)=X^n+a_{n-1}X^{n-1}+\cdots+a_1X+a_0\in\mathbb Z_p[X]$
>
> に対し、$a_i\in p\mathbb Z_p$（$0\le i<n$）、かつ $a_0\notin p^2\mathbb Z_p$ が成り立つとき、$f$ は $p$ に関して Eisenstein 型であるという。
<!-- formal-statement-end -->

<!-- definition-example-start: def-anf10-eisenstein -->
**定義の確認。** $f=X^3+3X+3$ は $p=3$ について、非先頭係数 $a_2=0,a_1=3,a_0=3$ がすべて $3\mathbb Z_3$ に入り、$a_0=3$ は $9\mathbb Z_3$ に入らないので Eisenstein 型です。一方 $X^2-9$ は定数項が $9\mathbb Z_3$ に入り、最後の条件を満たしません。
<!-- definition-example-end -->

既約性を示す前に、係数の最小付値を測ります。非零多項式 $g=\sum b_iX^i\in\mathbb Q_p[X]$ に対して $c(g)=\min_i v_p(b_i)$ と置きます。

<a id="lem-anf10-gauss-content"></a>

<!-- formal-statement-start -->
> **補題（係数の最小付値の積公式）**  
> 素数 $p$ と非零多項式 $g,h\in\mathbb Q_p[X]$ について、
>
> $c(gh)=c(g)+c(h)$
>
> が成り立つ。
<!-- formal-statement-end -->

<!-- proof-start -->
### 証明

$r=c(g)$、$s=c(h)$ と置き、$G=p^{-r}g$、$H=p^{-s}h$ とします。両者の係数はすべて $\mathbb Z_p$ に入り、少なくとも一つずつ単元係数を持ちます。従って $\bar G,\bar H\in\mathbb F_p[X]$ はどちらも零多項式でありません。$\mathbb F_p[X]$ は整域なので $\bar G\bar H\ne0$ です。ゆえに $GH$ の少なくとも一係数は単元で、すべての係数は $\mathbb Z_p$ にあります。つまり $c(GH)=0$。$gh=p^{r+s}GH$ だから $c(gh)=r+s$ です。
<!-- proof-end -->

<a id="thm-anf10-eisenstein-irreducible"></a>

<!-- formal-statement-start -->
> **定理（$p$ 進 Eisenstein 既約性判定）**  
> 素数 $p$ に関して Eisenstein 型のモニック多項式 $f\in\mathbb Z_p[X]$ は、$\mathbb Q_p[X]$ で既約である。
<!-- formal-statement-end -->

### 証明の見取り図

もし $f=gh$ と正次数のモニック多項式に分解すれば、[係数最小付値の補題](#lem-anf10-gauss-content)から $g,h$ はどちらも整数係数になります。法 $p$ では $\bar f=X^n$ なので、両因子の定数項が $p$ の倍数になり、$a_0$ が $p^2$ の倍数という矛盾に至ります。

<!-- proof-start -->
### 証明

$f$ が可約なら $\mathbb Q_p[X]$ で $f=gh$ と書け、先頭係数を調整して $g,h$ をともにモニックで正次数とできます。$f$ はモニックで係数が $\mathbb Z_p$ にあるため $c(f)=0$ です。$g,h$ の先頭係数は $1$ なので $c(g)\le0$、$c(h)\le0$。一方 [積公式](#lem-anf10-gauss-content)から $0=c(f)=c(g)+c(h)$ なので $c(g)=c(h)=0$ です。つまり $g,h\in\mathbb Z_p[X]$。

Eisenstein 条件から $\bar f=X^n$ です。$\bar g,\bar h$ はモニックで正次数の $\mathbb F_p[X]$ の多項式で $\bar g\bar h=X^n$ となります。体上の多項式環で $X^n$ のモニック因子は $X$ の冪だけなので、$\bar g=X^{\deg g}$、$\bar h=X^{\deg h}$ です。従って両因子の定数項は $p\mathbb Z_p$ に属します。その積である $f(0)=a_0$ は $p^2\mathbb Z_p$ に入ってしまい、定義の $a_0\notin p^2\mathbb Z_p$ に矛盾します。
<!-- proof-end -->

例えば $X^3+3X+3$ は $\mathbb Q_3$ 上既約なので、根を $\pi$ と書けば $\mathbb Q_3(\pi)$ は次数 $3$ の体拡大です。既約であることと、付値で完備な局所体になることは **別に検証すべき事項**です。

## 7. Eisenstein 拡大の整数環と付値を実際に作る

ここでは一般の有限拡大を無条件に一括処理せず、前節の Eisenstein 型から生じる拡大で定義の条件をすべて確かめます。$f$ を次数 $n$ の Eisenstein 多項式、$\pi$ をその根とし

$$
L=\mathbb Q_p(\pi),\qquad A=\mathbb Z_p[\pi]
=\sum_{i=0}^{n-1}\mathbb Z_p\pi^i
$$

と置きます。最後の和は一意表示です。$A$ は $\mathbb Z_p$ 上自由な階数 $n$ の加群で、係数ごとに $p$ 進完備です。

<a id="thm-anf10-eisenstein-extension"></a>

<!-- formal-statement-start -->
> **定理（Eisenstein 拡大の局所体構造）**  
> $p$ を素数、$f\in\mathbb Z_p[X]$ を次数 $n\ge1$ の Eisenstein モニック多項式、$\pi$ をその根とする。$L=\mathbb Q_p(\pi)$、$A=\mathbb Z_p[\pi]$ と置く。このとき
>
> 1. $[L:\mathbb Q_p]=n$、$A/(\pi)\cong\mathbb F_p$。
> 2. $A$ の非零元はただ一通り $\pi^m u$（$m\ge0$、$u\in A^\times$）と書け、$L^\times$ の元は $\pi^m u$（$m\in\mathbb Z$、$u\in A^\times$）と書ける。従って $v_L(\pi^mu)=m$ は離散付値で、その整数環は $A$ である。
> 3. $v_L(p)=n$、$v_L|_{\mathbb Q_p}=n v_p$、$|x|_L=p^{-v_L(x)/n}$ は $|\cdot|_p$ を延長する。$L$ はこの距離で完備、剰余体は $\mathbb F_p$ である。
> 4. $0\ne x=\sum_{i=0}^{n-1}b_i\pi^i\in L$（$b_i\in\mathbb Q_p$）について、$v_p(0)=\infty$ として
>
> $v_L(x)=\min_{0\le i<n}\{n v_p(b_i)+i\}$
>
> が成り立つ。
<!-- formal-statement-end -->

### 証明の見取り図

$A$ は有限個の $p$ 進整数係数で表せるので完備です。多項式の関係から $p$ と $\pi^n$ が単元倍で一致すると分かります。従って $\pi$ による近似でも完備であり、$\pi$ で割れない元を幾何級数で反転できます。これにより $A$ が付値環となり、$\pi$ の次数を測る付値を作れます。

<!-- proof-start -->
### 証明

[既約性判定](#thm-anf10-eisenstein-irreducible)と多項式の除法から $[L:\mathbb Q_p]=n$、$A=\bigoplus_{i=0}^{n-1}\mathbb Z_p\pi^i$ です。$f(X)=X^n+p\sum_{i=0}^{n-1}b_iX^i$ と書け、$b_i\in\mathbb Z_p$、$b_0\in\mathbb Z_p^\times$ です。$f(\pi)=0$ から

$$
\pi^n=-pU,\qquad
U=\sum_{i=0}^{n-1}b_i\pi^i.
$$

まず $\pi^n\in pA$ です。他方 $p b_0=-\pi^n-p\sum_{i=1}^{n-1}b_i\pi^i\in\pi A$ で、$b_0$ は $\mathbb Z_p$ の単元だから $p\in\pi A$ です。従って

$$
\pi^n A\subseteq pA\subseteq\pi A,
\qquad
\pi^{nk}A\subseteq p^k A\subseteq\pi^k A
$$

がすべての $k\ge1$ について成立します。$A$ は有限自由 $\mathbb Z_p$ 加群なので、$p$ 進完備かつ $\bigcap_kp^kA=0$ です。上の包含により $\pi$ 進でも完備・分離です。

$p\in\pi A$ を利用すると、$A/(\pi)$ は $\mathbb Z_p$ の像だけで生成され、核は $p\mathbb Z_p$ です。核がこれ以上大きくないことは $A/pA\cong\mathbb F_p[X]/(X^n)$ の $X$ による商を取れば確認できます。ゆえに $A/(\pi)\cong\mathbb F_p$ です。$U$ の法 $\pi$ の像は $b_0\bmod p\ne0$ です。

いま $a\in A$ が法 $\pi$ で非零なら、剰余体 $\mathbb F_p$ での逆数を表す $c\in\mathbb Z_p$ を選べます。$ac=1-z$、$z\in\pi A$ と書け、$\pi$ 進完備性から $\sum_{j=0}^\infty z^j\in A$ が収束するので

$$
a^{-1}=c\sum_{j=0}^\infty z^j\in A
$$

です。よって $A\setminus\pi A=A^\times$ です。特に $U$ は単元となり、

$$
p=-\pi^nU^{-1},\qquad pA=\pi^nA
$$

が従います。

非零 $a\in A$ について、$\bigcap_k\pi^kA=0$ から $a$ はある最大の $\pi^mA$ に属します。$a=\pi^m u$ と書けば $u\notin\pi A$ なので単元です。この指数 $m$ が一意なことは、単元が $\pi A$ に入らないことから従います。また $\operatorname{Frac}(A)=L$ なので、任意の $x\in L^\times$ は二つの $A$ の元の商として $\pi^m u$（$m\in\mathbb Z$）と表されます。指数は積で加法的、和では少なくとも最小値以上です。実際 $m\le k$ なら $\pi^m(u+\pi^{k-m}w)$ と因数分解でき、括弧は $A$ にあります。よって $v_L$ は離散付値で、$A=\{x:v_L(x)\ge0\}$、$\pi A=\{x:v_L(x)\ge1\}$ です。

$p=-\pi^nU^{-1}$ なので $v_L(p)=n$。$b=p^r w\in\mathbb Q_p^\times$（$w\in\mathbb Z_p^\times$）なら $v_L(b)=nr$ です。従って $|\cdot|_L=p^{-v_L(\cdot)/n}$ は $\mathbb Q_p$ 上の絶対値を延長します。位相の基底 $\pi^k A$ と $p^kA$ は互いに cofinal で、係数ごとの完備性から $L$ も完備です。より詳しく、$L=\bigcup_{m\ge0}\pi^{-m}A$ の Cauchy 列は、十分先で互いに付値差が正となるので、ある固定した $\pi^{-m}A$ の中に入り、そこでは $A$ の完備性へ帰着できます。剰余体は上で示した $\mathbb F_p$ です。

最後に基底表示 $x=\sum b_i\pi^i$ の各非零項の付値は $nv_p(b_i)+i$ です。異なる $i\in\{0,\ldots,n-1\}$ に対してこの値は法 $n$ の剰余が異なり、最小値を与える項はただ一つです。[付値の和の等号条件](../ANF9/index.md#prop-anf9-valuation-rules)と同じ因数分解の議論を $v_L$ に適用すると、全体の付値は各項の付値の最小値と等しくなります。
<!-- proof-end -->

<!-- definition-example-start: def-anf10-finite-local-extension -->
**定義の直接確認。** $f=X^2-5$ は $5$ に関して Eisenstein 型であるため既約です。$L=\mathbb Q_5(\pi)$、$\pi^2=5$ とすると

$$
[L:\mathbb Q_5]=2,\qquad A=\mathbb Z_5\oplus\mathbb Z_5\pi,
\qquad v_L(\pi)=1,\quad v_L(5)=2.
$$

定理で $L$ がこの付値について完備、$A$ が付値環、$A/\pi A\cong\mathbb F_5$ と示されました。従って **有限次数・付値の延長・完備性・有限剰余体**の四条件を実際に確認でき、この $L/\mathbb Q_5$ は[局所体の有限拡大の定義](#def-anf10-finite-local-extension)を満たします。
<!-- definition-example-end -->

**計算の手触り。** 同じ $L$ では $5+\pi=\pi(\pi+1)$ です。$\pi+1$ は法 $\pi$ で $1$ なので単元であり、$v_L(5+\pi)=1$ です。基底公式でも $v_L(5)=2$ と $v_L(\pi)=1$ の最小値が $1$ と分かります。$p=5$ の付値は $L$ では二倍になるため、混同して $v_L(5)=1$ と置かないことが重要です。

**次講への橋。** 本講は Eisenstein 拡大に対して、根の次数、整数環、付値、剰余体を構成しました。ANF11では一般の有限拡大の整数環、分岐指数・剰余次数、異なる（different）へ進みます。[ANF4の分岐指数の定義](../ANF4/index.md#def-anf4-ramification-residue)と比較すると、ここでの $v_L(p)=n$ は全分岐という現象の原型です。

## 8. 演習：持ち上げと拡大を自力で組み立てる

### A1. 最初の二桁

$p=7$、$f=X^2-2$、$a_1=3$ とする。単純根条件を確かめ、法 $49$ の根を $3+7t$（$0\le t<7$）の形で求めよ。

- Level: A
- ID: ANF10-A1

<!-- solution-start -->
**詳細解答**　$f(3)=7\equiv0\pmod7$、$f'(3)=6\not\equiv0\pmod7$ なので [単純根の定義](#def-anf10-simple-residue-root)の二条件を満たします。展開すると $f(3+7t)=7(1+6t+7t^2)$。法 $49$ で零であるには $1+6t\equiv0\pmod7$ が必要十分です。$6^{-1}\equiv6\pmod7$ より $t\equiv-6\equiv1$。従って $a_2=10$ で、$10^2-2=98=2\cdot49$ と検算できます。
<!-- solution-end -->

### A2. 二つの剰余根

$p=5$、$f=X^2-6$ とする。法 $5$ での根を全部求め、各根を法 $25$ の根へ持ち上げよ。

- Level: A
- ID: ANF10-A2

<!-- solution-start -->
**詳細解答**　$6\equiv1\pmod5$ なので法 $5$ の根は $a=1,4$ です。$f'(1)=2$、$f'(4)=8\equiv3$ はどちらも単元です。[単純根の Hensel の補題](#thm-anf10-hensel-simple)の一桁補正を使い、$a=1$ では $f(1)=-5$ だから

$$
f(1+5t)\equiv-5+10t\pmod{25}.
$$

よって $-1+2t\equiv0\pmod5$、$t\equiv3$ で $1+5t=16$ です。もう一方は $4\equiv-1\pmod5$ の持ち上げを考えると、$-16\equiv9\pmod{25}$ です。実際 $16^2-6=250=10\cdot25$、$9^2-6=75=3\cdot25$ で、二つの剰余は異なります。
<!-- solution-end -->

### A3. 単純根でない二例

$p=2$ における $g=X^2-1$ と $h=X^2-2$ を考える。両者の法 $2$ の根 $1,0$ について導関数条件を調べ、$\mathbb Z_2$ または $\mathbb Q_2$ に根があるか判定せよ。

- Level: A
- ID: ANF10-A3

<!-- solution-start -->
**詳細解答**　$g(1)=0$、$g'(1)=2\equiv0\pmod2$ です。$g(1)=g(-1)=0$ で $1\equiv-1\pmod2$ だから、一つの剰余根から二つの根が現れます。$h(0)=-2\equiv0$、$h'(0)=0$ ですが、$x\in\mathbb Q_2$ が $x^2=2$ を満たすなら [付値の積公式](../ANF9/index.md#prop-anf9-valuation-rules)から $2v_2(x)=v_2(2)=1$ となり、整数 $v_2(x)$ について不可能です。従って $h$ は $\mathbb Q_2$ に根を持ちません。両例とも単純根の仮定を落とすと、存在・一意性の結論を保証できないことが分かります。
<!-- solution-end -->

### A4. Eisenstein 条件の点検

$f=X^3+3X+3\in\mathbb Z_3[X]$ が Eisenstein 型であることを確認し、その根 $\pi$ の生成する体の $\mathbb Q_3$ 上の次数を求めよ。また $X^2-9$ がこの条件を満たさない理由を答えよ。

- Level: A
- ID: ANF10-A4

<!-- solution-start -->
**詳細解答**　$f$ はモニックで、非先頭係数 $0,3,3$ はすべて $3$ の倍数、定数項 $3$ は $9$ の倍数ではありません。[Eisensteinの定義](#def-anf10-eisenstein)を満たすので、[既約性定理](#thm-anf10-eisenstein-irreducible)から $\mathbb Q_3$ 上既約です。従って $1,\pi,\pi^2$ は基底で $[\mathbb Q_3(\pi):\mathbb Q_3]=3$ です。一方 $X^2-9$ は定数項 $-9$ が $9\mathbb Z_3$ に入り、最後の条件を満たしません。実際 $X^2-9=(X-3)(X+3)$ と可約です。
<!-- solution-end -->

### A5. 係数の最小付値

$g=5X+25$、$h=X+1/5\in\mathbb Q_5[X]$ とし、$c(g),c(h),c(gh)$ を求めよ。

- Level: A
- ID: ANF10-A5

<!-- solution-start -->
**詳細解答**　係数の付値は $g$ では $v_5(5)=1,v_5(25)=2$ なので $c(g)=1$、$h$ では $v_5(1)=0,v_5(1/5)=-1$ なので $c(h)=-1$ です。積を省略せず展開すると

$$
gh=(5X+25)(X+1/5)=5X^2+26X+5.
$$

$26$ は $5$ の倍数でないので係数の最小付値は $0$、つまり $c(gh)=0=1+(-1)$ です。[積公式](#lem-anf10-gauss-content)と一致します。
<!-- solution-end -->

### B1. Newton 反復の誤差評価

$p=3$、$f=X^2-10$、$a_0=1$ とする。$v_3(f(a_0))$ と $v_3(f'(a_0))$ を求め、Newton の次の反復 $a_1$ を分数で求めよ。$v_3(f(a_1))$ を計算し、誤差が少なくとも二倍になることを検算せよ。

- Level: B
- ID: ANF10-B1

<!-- solution-start -->
**詳細解答**　$f(1)=-9$ なので $r_0=2$、$f'(1)=2$ なので $v_3(f'(1))=0$ です。[Newton 反復命題](#prop-anf10-newton-doubling)を適用できます。反復は

$$
a_1=1-\frac{-9}{2}=\frac{11}{2}.
$$

代入すると

$$
f(11/2)=\frac{121}{4}-10=\frac{81}{4}.
$$

分母 $4$ は $3$ 進単元で、$81=3^4$ なので $v_3(f(a_1))=4=2r_0$ です。反復点の差も $a_1-a_0=9/2$ で付値 $2$ だから、初期の法 $9$ の剰余を保持しています。
<!-- solution-end -->

### B2. 相異なる根からの分解

$f=X^2-2\in\mathbb Z_7[X]$ の法 $7$ の二つの根を求め、[単純根の Hensel の補題](#thm-anf10-hensel-simple)によって $\mathbb Z_7$ に二つの異なる根があることを示せ。さらに $\mathbb Q_7[X]$ での分解を書け。

- Level: B
- ID: ANF10-B2

<!-- solution-start -->
**詳細解答**　$\bar f=X^2-2=(X-3)(X-4)$ が $\mathbb F_7[X]$ で成立します。導関数は $2X$ なので $f'(3)=6\not\equiv0$、$f'(4)=8\equiv1\not\equiv0$ です。[持ち上げ定理](#thm-anf10-hensel-simple)からそれぞれ剰余 $3,4$ を持つ根 $\alpha,\beta\in\mathbb Z_7$ を得ます。剰余が異なるので $\alpha\ne\beta$ です。二次式であり $f(X)=X^2-2$ の $X$ の係数が $0$ なので、$\alpha+\beta=0$、すなわち $\beta=-\alpha$。よって

$$
X^2-2=(X-\alpha)(X+\alpha)
$$

です。法 $49$ の根は前節と A1 により $10,39$ で、互いに負の剰余になっていることも確かめられます。
<!-- solution-end -->

### B3. 既約性の証明を再構成する

素数 $p$ と Eisenstein 型モニック多項式 $f$（次数 $n\ge2$）を取る。$f$ が $\mathbb Q_p[X]$ で正次数の二つのモニック因子 $g,h$ に分解すると仮定し、係数の最小付値を使って矛盾を導け。

- Level: B
- ID: ANF10-B3

<!-- solution-start -->
**詳細解答**　$f=gh$ とし、$g,h$ はモニックで正次数とします。$f$ の係数は整数環にあり、先頭係数は $1$ なので $c(f)=0$。一方モニック性から $c(g),c(h)\le0$ です。[係数付値の積公式](#lem-anf10-gauss-content)を適用すると

$$
0=c(f)=c(g)+c(h).
$$

二つとも非正なのでどちらも $0$ です。従って $g,h\in\mathbb Z_p[X]$。法 $p$ で $\bar f=X^n$、$\bar g,\bar h$ は正次数のモニック因子です。$\mathbb F_p[X]$ の一意分解から $\bar g=X^{\deg g}$、$\bar h=X^{\deg h}$ となるため、$g(0),h(0)$ はともに $p$ の倍数です。従って $f(0)=g(0)h(0)\in p^2\mathbb Z_p$ となり Eisenstein 条件 $f(0)\notin p^2\mathbb Z_p$ と矛盾します。仮定「定数項の付値がちょうど $1$」が最後の矛盾を生んでいます。
<!-- solution-end -->

### B4. Eisenstein 拡大の付値を使い分ける

$L=\mathbb Q_5(\pi)$、$\pi^2=5$ とする。$x=5+\pi$、$y=25+5\pi$、$z=(5+\pi)/(25+5\pi)$ の $v_L$ を求めよ。$x$ と $y$ が零でないことも示せ。

- Level: B
- ID: ANF10-B4

<!-- solution-start -->
**詳細解答**　$X^2-5$ は Eisenstein 型なので [Eisenstein 拡大の定理](#thm-anf10-eisenstein-extension)から $v_L(5)=2$、$v_L(\pi)=1$、かつ $1,\pi$ は基底です。従って $x=5+\pi$、$y=25+5\pi$ はいずれも基底係数が零でなく、非零です。二つの項の付値は $x$ で $2,1$、$y$ で $4,3$ であり、それぞれ異なるので

$$
v_L(x)=\min(2,1)=1,\qquad
v_L(y)=\min(4,3)=3.
$$

$z=x/y$ が体 $L$ の元として定義でき、付値の積法則から $v_L(z)=1-3=-2$ です。実際 $y=5x$ なので $z=1/5$、$v_L(1/5)=-2$ とも一致します。
<!-- solution-end -->

### C1. 持ち上げ不能から新しい局所体へ

$p=5$、$f=X^2-5$、$L=\mathbb Q_5(\pi)$（$\pi^2=5$）を考える。次の問いに答えよ。

1. $f$ は法 $5$ で根を持つにもかかわらず、$\mathbb Q_5$ には根を持たないことを示せ。
2. $f$ の Eisenstein 性を確認し、$[L:\mathbb Q_5]$ と整数環 $A=\mathbb Z_5[\pi]$ の剰余体を求めよ。
3. $v_L(\pi)$、$v_L(5)$、$v_L(5+\pi)$、$v_L((5+\pi)(5-\pi))$ を求めよ。
4. $1+\pi$ が $A$ の単元であることを確認し、逆元を $1,\pi$ の基底表示で求めよ。

- Level: C
- ID: ANF10-C1

<!-- solution-start -->
**詳細解答**

**（1）** 法 $5$ では $\bar f=X^2$ なので $\bar a=0$ が根ですが、$\bar f'(0)=0$ で単純根ではありません。仮に $x\in\mathbb Q_5$ が $x^2=5$ を満たせば $2v_5(x)=v_5(5)=1$。$v_5(x)\in\mathbb Z$ なので矛盾です。従って単純根の補題で持ち上げられないだけでなく、実際に $\mathbb Q_5$ に根はありません。

**（2）** $f=X^2+0X-5$ はモニック、非先頭係数は $5$ の倍数、定数項 $-5$ は $25$ の倍数ではありません。[Eisenstein 既約性判定](#thm-anf10-eisenstein-irreducible)から次数 $2$ で既約です。従って $[L:\mathbb Q_5]=2$ で $1,\pi$ が基底です。[拡大の局所体構造定理](#thm-anf10-eisenstein-extension)により $A$ は付値環、$A/(\pi)\cong\mathbb F_5$、$L$ は完備です。

**（3）** $v_L(\pi)=1$、$\pi^2=5$ より $v_L(5)=2$ です。$5+\pi=\pi(\pi+1)$ で $\pi+1$ の法 $\pi$ の像は $1\ne0$ なので単元、よって $v_L(5+\pi)=1$。同様に $5-\pi=\pi(\pi-1)$ も付値 $1$ です。積を展開すると

$$
(5+\pi)(5-\pi)=25-\pi^2=25-5=20=5\cdot4.
$$

$4$ は単元なので $v_L(20)=2$ であり、積の付値 $1+1=2$ と一致します。

**（4）** $1+\pi$ の法 $\pi$ の像が $1$ なので単元です。分母を有理化すると

$$
\frac1{1+\pi}
=\frac{1-\pi}{(1+\pi)(1-\pi)}
=\frac{1-\pi}{1-\pi^2}
=\frac{1-\pi}{-4}
=\frac{\pi-1}{4}.
$$

$4\in\mathbb Z_5^\times$ なので $(\pi-1)/4\in A$ です。最後に

$$
(1+\pi)\frac{\pi-1}{4}
=\frac{\pi^2-1}{4}
=\frac{5-1}{4}=1
$$

と検算できます。元の体には存在しなかった平方根を加えても、付値と完備性を備えた計算可能な体が得られることが、四問を通して確認できました。
<!-- solution-end -->

---

**次講：ANF11 局所体の整数環・分岐。** 根を持ち上げて体を拡大する手順を踏まえ、次は一般の局所体の有限拡大に対して整数環・分岐指数・剰余次数・異なるを調べます。
