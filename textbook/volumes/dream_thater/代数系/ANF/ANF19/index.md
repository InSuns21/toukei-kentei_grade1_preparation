# ANF19 アデール・イデールと有限性条件

[前講の局所類体論の計算](../ANF18/index.md#prop-anf18-cyclotomic-norm-test)では、一つの素数 $p$ を固定し、$\mathbb Q_p$ の付値と単数からノルム群を判定しました。数体 $K$ の大域的な元には、一つの素数だけでなく**すべての素点での情報**があります。各素点の局所体をただ無制限に掛け合わせると、数体の元には存在しない分母を無限個の素点へ持ち込めます。そこで「有限個の例外を除き整である」という条件を設けます。

本講では数体 $K/\mathbb Q$ を有限次拡大とします。有限素点とは整数環 $\mathcal O_K$ の非零素イデアル $\mathfrak p$ に対応する場所、無限素点とは実埋め込みまたは共役な複素埋め込みの組に対応する場所です。有限素点での完備化 $K_{\mathfrak p}$ と付値環 $\mathcal O_{\mathfrak p}$ は[数体の素イデアル付値・完備化](../ANF9/index.md#def-anf9-prime-valuation)を用い、$\operatorname{ord}_{\mathfrak p}(\pi_{\mathfrak p})=1$ となる元を一様化元と呼びます。無限素点では $K_v=\mathbb R$ または $\mathbb C$ です。素点全体を $V_K$、無限素点全体を $V_\infty$、有限素点全体を $V_f$ と記します。

## 1. 無限個の局所体を、有限個の例外だけで扱う

まず積を取る対象を一般的に定めます。$v\in V_f$ では局所体 $K_v$ とその開かつコンパクトな加法部分環 $\mathcal O_v$ を用います。無限素点は有限個なので、例外集合に初めから含めます。ここでいう「制限」とは、**すべての成分が同じ整数である**という意味ではなく、有限個以外の成分が指定された部分集合に属するという意味です。

<a id="def-anf19-restricted-product"></a>

<!-- formal-statement-start -->
> **定義（制限付き直積）**  
> $S$ を $V_\infty$ を含む有限な素点集合とし、各 $v\in V_f$ に $\mathcal O_v\subset K_v$ を指定する。制限付き直積とは次の集合である。

$$
\prod_{v\in V_K}'(K_v,\mathcal O_v)
=\left\{(x_v)_v\in\prod_{v\in V_K}K_v:
x_v\in\mathcal O_v\ \text{for all but finitely many }v\in V_f\right\}.
$$

> その位相は、$S$ と各 $v\in S$ での開集合 $U_v\subseteq K_v$ について、次の形の集合を開集合の基底として定める位相である。

$$
\prod_{v\in S}U_v\times
\prod_{v\in V_f\setminus S}\mathcal O_v.
$$
<!-- formal-statement-end -->

有限集合 $S$ の外側で $\mathcal O_v$ を指定する点が、通常の無制限な直積位相との違いです。上記集合は点が含まれる場合にその点の開近傍を与えます。$S$ は必要に応じて大きくでき、各有限素点で $\mathcal O_v$ は開集合です。

<!-- definition-example-start: def-anf19-restricted-product -->
**定義の確認（有理数体）。** $K=\mathbb Q$ なら、$V_K=\{\infty,2,3,5,\ldots\}$、$K_\infty=\mathbb R$、$\mathcal O_p=\mathbb Z_p$ です。

1. $x_\infty=0$、$x_p=p$（すべての素数 $p$）は条件を満たします。なぜなら $p\in\mathbb Z_p$ が全素数で成り立つからです。
2. $y_\infty=0$、$y_p=p^{-1}$（すべての素数 $p$）は条件を満たしません。$v_p(p^{-1})=-1$ で、$\mathbb Z_p$ に入らない成分が無限個あるからです。
3. $z_2=1/2$、$z_p=0$（$p\ne2$）、$z_\infty=0$ は条件を満たします。例外集合は $S=\{\infty,2\}$ で十分です。
<!-- definition-example-end -->

この一つの制限付き直積を、各素点で加法・乗法を成分ごとに行う環として用います。

<a id="def-anf19-adele"></a>

<!-- formal-statement-start -->
> **定義（アデール環）**  
> 数体 $K$ のアデール環を次で定義する。

$$
\mathbb A_K=
\prod_{v\in V_K}'(K_v,\mathcal O_v)
=\bigcup_{\substack{S\supset V_\infty\\ S\text{ finite}}}
\left(\prod_{v\in S}K_v\times
\prod_{v\in V_f\setminus S}\mathcal O_v\right).
$$

> 加法と乗法は各成分で行い、位相は[制限付き直積](#def-anf19-restricted-product)の位相とする。
<!-- formal-statement-end -->

<!-- definition-example-start: def-anf19-adele -->
**定義の確認。** $\mathbb A_{\mathbb Q}$ の $x=(0;(p)_p)$ と $z=(0;1/2,0,0,\ldots)$ は先ほどの例でアデールです。$x+z$ と $xz$ も、各々の例外集合の合併 $S=\{\infty,2\}$ の外では $\mathbb Z_p$ の和・積なので再びアデールです。同じ論理が任意の二つのアデールで成立し、環演算が定義できます。
<!-- definition-example-end -->

とくに「有限例外」は加法・乗法の下で保たれます。$K$ が無限個の素数を持つことと、**一つのアデールに許される非整成分が有限個**であることを区別してください。

## 2. 数体をすべての完備化に同時に埋め込む

数体の元 $a\in K$ は各完備化 $K_v$ に自然に入ります。この同じ $a$ を全成分へ送ることを対角埋め込みと呼びます。$a=b/c$（$b,c\in\mathcal O_K$、$c\ne0$）なら、$c$ を含む素イデアルは[素イデアル分解の一意性](../ANF3/index.md#thm-anf3-prime-ideal-factorization)により有限個だけなので、その他の素点では $a\in\mathcal O_v$ です。

<a id="prop-anf19-diagonal-discrete"></a>

<!-- formal-statement-start -->
> **命題（数体の対角埋め込みと離散性）**  
> 任意の数体 $K$ に対し、次の写像は単射の環準同型であり、像 $\Delta(K)$ は $\mathbb A_K$ の離散部分環である。

$$
\Delta:K\longrightarrow\mathbb A_K,\qquad
a\longmapsto(a)_v.
$$
<!-- formal-statement-end -->

### 証明の見取り図

各元がほぼすべての有限素点で整であることを確認したのち、$0$ の近くに他の数体元が入らない開集合を作ります。有限素点で整となる元は $\mathcal O_K$ に戻り、無限素点で絶対値がすべて $1$ 未満なら、非零の代数的整数のノルムが整数であることと矛盾します。

<!-- proof-start -->
### 証明

非零 $a=b/c$ を整数環の元の商で書き、$(c)$ を[素イデアル分解](../ANF3/index.md#thm-anf3-prime-ideal-factorization)します。$\mathfrak p\nmid(c)$ のとき $c$ は $\mathcal O_{\mathfrak p}$ の単数なので、$a=b/c\in\mathcal O_{\mathfrak p}$ です。例外素点は有限個ですから $\Delta(a)\in\mathbb A_K$。体から各完備化への埋め込みが単射であるため $\Delta$ も単射で、環演算は成分ごとに保存されます。

次に、無限素点での絶対値として実素点では $|\sigma(a)|$、複素素点では $|\sigma(a)|^2$ を使い、

$$
U=\prod_{v\in V_\infty}\{x_v\in K_v:|x_v|_v<1\}
\times\prod_{v\in V_f}\mathcal O_v
$$

と置きます。これは[制限付き直積の位相](#def-anf19-restricted-product)で $0$ の開近傍です。$a\in K$ が $\Delta(a)\in U$ を満たせば、全有限素点で $\operatorname{ord}_{\mathfrak p}(a)\ge0$ です。[素イデアル分解](../ANF3/index.md#thm-anf3-prime-ideal-factorization)によって $(a)$ は整イデアル、従って $a\in\mathcal O_K$ です。

もし $a\ne0$ なら、[埋め込みによる跡・ノルムの公式](../ANF2/index.md#thm-anf2-embedding-formulas)から

$$
1\le |N_{K/\mathbb Q}(a)|
=\prod_{v\in V_\infty}|a|_v<1
$$

です。左の不等式は代数的整数の非零ノルムが非零整数であること、右は無限素点が有限個で各因子が $1$ 未満であることによります。矛盾するので $U\cap\Delta(K)=\{0\}$、従って像は離散です。
<!-- proof-end -->

この論証は $K$ の全無限素点を必ず使います。有限素点だけの条件では、例えば整数の大きさを抑えることはできません。

## 3. 局所絶対値が大域的には積で打ち消し合う

局所体ごとの絶対値を掛ける際、複素素点に重みを付ける理由は体ノルムです。数体 $K$ の実埋め込み $\sigma$ は一つ、共役な複素埋め込みの組 $\{\tau,\overline\tau\}$ は一つの無限素点として数えます。素イデアル $\mathfrak p$ の剰余体の位数を $N\mathfrak p=\#(\mathcal O_K/\mathfrak p)$ とします。これは[整イデアルのノルム](../ANF4/index.md#def-anf4-ideal-norm)です。

$a\in K_v^\times$ の正規化された絶対値を、有限素点で $(N\mathfrak p)^{-\operatorname{ord}_{\mathfrak p}(a)}$、実素点で通常の絶対値、複素素点で通常の絶対値の二乗と定めます。有限素点では $a$ が単数なら値は $1$ です。

<a id="thm-anf19-product-formula"></a>

<!-- formal-statement-start -->
> **定理（数体の大域積公式）**  
> 数体 $K$ の各素点 $v$ で、以下の絶対値を用いる。

$$
|a|_v=
\begin{cases}
(N\mathfrak p)^{-\operatorname{ord}_{\mathfrak p}(a)}
  &(v=\mathfrak p\in V_f),\\
|\sigma(a)| &(v\text{ は実素点}),\\
|\tau(a)|^2 &(v\text{ は複素素点}).
\end{cases}
$$

> 任意の $a\in K^\times$ に対して、有限個の因子を除いて $|a|_v=1$ であり、次が成り立つ。

$$
\prod_{v\in V_K}|a|_v=1.
$$
<!-- formal-statement-end -->

### 証明の見取り図

有限素点側の積は、主分数イデアル $(a)$ のノルムの逆数です。無限素点側の積は体ノルムの絶対値です。この二つの等式をそれぞれ根拠から導いて掛け合わせます。

<!-- proof-start -->
### 証明

[分数イデアルと素イデアル分解](../ANF3/index.md#thm-anf3-prime-ideal-factorization)により、非零 $a\in K$ に対して

$$
(a)=\prod_{\mathfrak p}\mathfrak p^{n_{\mathfrak p}},
\qquad n_{\mathfrak p}=\operatorname{ord}_{\mathfrak p}(a),
$$

で非零指数は有限個です。[素イデアル冪のノルムの乗法性](../ANF4/index.md#lem-anf4-prime-power-norm)を使うと

$$
\prod_{\mathfrak p\in V_f}|a|_{\mathfrak p}
=\prod_{\mathfrak p}(N\mathfrak p)^{-n_{\mathfrak p}}
=N((a))^{-1}.
$$

ここで分数イデアルのノルムは整イデアルのノルムを商で延長した正有理数です。$a\in\mathcal O_K\setminus\{0\}$ なら、整数基底上の $a$ 倍写像の行列は整数行列で、像の指数は行列式の絶対値です。したがって[体ノルムの定義](../ANF2/index.md#def-anf2-field-norm)より

$$
N((a))=[\mathcal O_K:a\mathcal O_K]
=|\det(m_a)|=|N_{K/\mathbb Q}(a)|.
$$

一般の $a=b/c$（$b,c\in\mathcal O_K\setminus\{0\}$）では、上記を $(a)=(b)(c)^{-1}$ と $N_{K/\mathbb Q}(a)=N(b)/N(c)$ に適用して同じ等式を得ます。

一方、[埋め込みによる跡・ノルムの公式](../ANF2/index.md#thm-anf2-embedding-formulas)で複素共役を対にすると

$$
\prod_{v\in V_\infty}|a|_v
=\prod_{\sigma:K\hookrightarrow\mathbb R}|\sigma(a)|
 \prod_{\{\tau,\overline\tau\}}|\tau(a)|^2
=|N_{K/\mathbb Q}(a)|.
$$

ゆえに無限素点側と有限素点側の積は

$$
|N_{K/\mathbb Q}(a)|\cdot
|N_{K/\mathbb Q}(a)|^{-1}=1
$$

です。
<!-- proof-end -->

**有理数体の検算。** $a=18=2\cdot3^2$ なら、$|18|_\infty=18$、$|18|_2=2^{-1}$、$|18|_3=3^{-2}$ です。他の素点では $1$ なので

$$
18\cdot\frac12\cdot\frac19=1.
$$

**複素素点の検算。** $K=\mathbb Q(i)$、$a=2+i$ とします。唯一の無限素点は複素素点で、$|a|_\infty=|2+i|^2=5$ です。$N_{K/\mathbb Q}(2+i)=5$ で、$(2+i)$ はノルム $5$ の素イデアルです。他の有限素点に因子を持たないため、有限素点の積は $1/5$、全体は $1$ です。複素素点で二乗を忘れると $\sqrt5/5$ になり、積公式を壊します。

## 4. 積で割れる元だけを集める：イデール

アデールは加法にも便利ですが、局所 Artin 写像は[局所体の乗法群](../ANF17/index.md#def-anf17-finite-reciprocity)に作用します。大域的に乗法を行うため、各成分が非零で、逆元もアデールに残る族を考えます。有限素点での付値が $0$ という条件は $x_v\in\mathcal O_v^\times$ と同値です。

<a id="def-anf19-idele"></a>

<!-- formal-statement-start -->
> **定義（イデール群）**  
> 数体 $K$ のイデール群 $\mathbb I_K$ を、各局所乗法群の次の制限付き直積とする。

$$
\mathbb I_K
=\prod_{v\in V_K}'(K_v^\times,\mathcal O_v^\times)
=\left\{(x_v)_v:
x_v\in K_v^\times\ \text{for all }v,\quad
x_v\in\mathcal O_v^\times\ \text{for almost all }v\in V_f\right\}.
$$

> 積と逆元は成分ごとに計算する。位相の開集合の基底は、有限集合 $S\supset V_\infty$ 内で各 $K_v^\times$ の開集合を、外側で $\mathcal O_v^\times$ を選んだ直積とする。
<!-- formal-statement-end -->

<!-- definition-example-start: def-anf19-idele -->
**定義の確認。** $K=\mathbb Q$ で $x_\infty=2$、$x_2=2$、他の有限成分は $1$ とします。全成分が非零で、$2$ を除く有限素点では $\mathbb Z_p^\times$ の元です。逆元も $x_\infty^{-1}=1/2$、$x_2^{-1}=1/2$、他は $1$ なので制限付き直積に属します。従って $x\in\mathbb I_{\mathbb Q}$ です。一方 $x_p=p$ を全素数で選んだ前節のアデールは、無限個の素点で単数でなく、イデールではありません。
<!-- definition-example-end -->

<a id="prop-anf19-idele-topology"></a>

<!-- formal-statement-start -->
> **命題（アデールの単元とイデール位相）**  
> 集合および群として $\mathbb I_K=\mathbb A_K^\times$ である。イデール位相で積と逆元は連続であるが、この位相は一般に $\mathbb A_K$ からの部分空間位相より真に細かい。
<!-- formal-statement-end -->

### 証明の見取り図

ある成分の付値が正なら、その逆元は整でなくなります。これが有限個の例外以外で起きない条件を両方向から確認します。位相の違いは、例外素点が遠ざかるときの列で具体的に見ます。

<!-- proof-start -->
### 証明

$x\in\mathbb A_K$ の乗法逆元が存在すれば、各 $x_v\ne0$ で逆元候補は $(x_v^{-1})_v$ に限ります。$x$ と $x^{-1}$ がともにアデールなら、それぞれ有限個以外で $\mathcal O_v$ に入り、共通してそうなる素点では $x_v,x_v^{-1}\in\mathcal O_v$、すなわち $x_v\in\mathcal O_v^\times$ です。逆にその条件があれば逆元候補は全成分で定義され、ほぼすべての有限素点で単数のままです。従って $\mathbb A_K^\times=\mathbb I_K$。

イデール位相の基底は、有限集合 $S\supset V_\infty$ の中では $K_v^\times$ の開集合を、外では $\mathcal O_v^\times$ を取る直積です。局所体の乗法と逆元は連続であり、外側では部分群 $\mathcal O_v^\times$ の演算を保つので、有限個の座標だけを調整して積・逆元の連続性を得ます。

位相が一致しないことは $K=\mathbb Q$ で分かります。各素数 $p$ に対し、$e^{(p)}\in\mathbb I_{\mathbb Q}$ を、$p$ 成分が $p$ で、それ以外の成分（無限成分を含む）が $1$ のイデールとします。$p$ を大きくすると、$e^{(p)}-1$ は動く $p$ 成分でも $p-1\in\mathbb Z_p$ なので、アデール位相では $e^{(p)}\to1$ です。しかし $(e^{(p)})^{-1}-1$ は $p$ 成分が $p^{-1}-1\notin\mathbb Z_p$ であり、アデール位相で $1$ へ収束しません。従ってアデール部分空間位相での逆元写像は連続でなく、イデール位相とは一致しません。
<!-- proof-end -->

この違いは単なる記号の問題ではありません。イデールは**乗法群として扱うための位相**を採用しています。

## 5. 局所絶対値の積とイデール類群

イデールではほぼすべての有限成分が単数です。従って各素点の絶対値を掛けても、値が $1$ でない因子は有限個です。この積は大域的な大きさを測る正実数になります。

<a id="def-anf19-idele-modulus"></a>

<!-- formal-statement-start -->
> **定義（イデールの絶対値）**  
> $x=(x_v)_v\in\mathbb I_K$ に対して次の正実数を定める。

$$
|x|_{\mathbb A}=\prod_{v\in V_K}|x_v|_v\in\mathbb R_{>0},
\qquad
\mathbb I_K^1=\{x\in\mathbb I_K:|x|_{\mathbb A}=1\}.
$$
<!-- formal-statement-end -->

<!-- definition-example-start: def-anf19-idele-modulus -->
**定義の確認。** $\mathbb I_{\mathbb Q}$ で $x_\infty=2$、$x_2=2$、他の有限成分が $1$ の例では、$|x_\infty|_\infty=2$ と $|x_2|_2=1/2$ なので

$$
|x|_{\mathbb A}=2\cdot\frac12=1.
$$

これは対角イデールとは限りません。実際、対角の有理数 $2$ は**すべての**有限成分でも $2$ ですが、この $x$ は $3$ 成分が $1$ です。
<!-- definition-example-end -->

各 $|x_v|_v$ は乗法的で、積の非自明な因子が有限個だから

$$
|xy|_{\mathbb A}=|x|_{\mathbb A}|y|_{\mathbb A}.
$$

さらに、各基本開近傍では有限素点の標準部分群で絶対値が $1$ なので、この写像はイデール位相に関して連続です。[積公式](#thm-anf19-product-formula)を対角イデール $\Delta(a)$ に使うと $|\Delta(a)|_{\mathbb A}=1$ です。よって $\Delta(K^\times)\subset\mathbb I_K^1$ となります。

局所相互法則を大域的に組み合わせるとき、対角の大域元を同一視した群を使います。まず商群そのものを定めます。

<a id="def-anf19-idele-class"></a>

<!-- formal-statement-start -->
> **定義（イデール類群）**  
> 数体 $K$ のイデール類群を次で定める。

$$
C_K=\mathbb I_K/\Delta(K^\times),
\qquad
C_K^1=\mathbb I_K^1/\Delta(K^\times).
$$

> 商はイデール位相からの商位相を持つ。積公式により $C_K^1$ は $C_K$ の部分群となる。
<!-- formal-statement-end -->

<!-- definition-example-start: def-anf19-idele-class -->
**定義の確認（商で同一視するもの）。** $x\in\mathbb I_{\mathbb Q}$ と有理数 $a=3/2$ に対し、$x$ と $x\Delta(3/2)$ は同じ類です。一方、任意の $x$ に対して $\Delta(a)$ の全成分は同じ有理数 $a$ から来るので、ある一つの素点だけを勝手に変更しても一般に同じ類にはなりません。分母・分子の有限例外と商群の同一視を混同しないことが大切です。
<!-- definition-example-end -->

## 6. イデールからイデアル類群を取り出す

イデールの有限素点成分の付値は、ほぼすべて $0$ です。この整数列から分数イデアルを作れます。[分数イデアルの定義](../ANF3/index.md#def-anf3-fractional-ideal)と[類群の定義](../ANF6/index.md#def-anf6-ideal-class-group)をここで利用します。

無限素点の積を $K_\infty^\times=\prod_{v\in V_\infty}K_v^\times$、有限素点の単数の積を $\widehat{\mathcal O}_K^\times=\prod_{\mathfrak p\in V_f}\mathcal O_{\mathfrak p}^\times$ と記し、$D_K=K_\infty^\times\times\widehat{\mathcal O}_K^\times$ と置きます。$D_K$ は有限素点で付値がすべて $0$ のイデール全体です。

<a id="thm-anf19-idele-ideal-exact"></a>

<!-- formal-statement-start -->
> **定理（イデールのイデアル写像と類群完全列）**  
> $I_K$ を $K$ の非零分数イデアルの乗法群とする。次の写像は全射準同型で、その核は $D_K$ である。

$$
J:\mathbb I_K\longrightarrow I_K,\qquad
(x_v)_v\longmapsto
\prod_{\mathfrak p\in V_f}\mathfrak p^{\operatorname{ord}_{\mathfrak p}(x_{\mathfrak p})}.
$$

> さらに $J(\Delta(a))=(a)$（$a\in K^\times$）であり、イデール類群とイデアル類群 $\operatorname{Cl}(K)$ の間に、**群として**次の完全列がある。

$$
1\longrightarrow
D_K/\Delta(\mathcal O_K^\times)
\longrightarrow C_K
\longrightarrow \operatorname{Cl}(K)
\longrightarrow1.
$$
<!-- formal-statement-end -->

### 証明の見取り図

局所付値は積を足し算へ変換するので、分数イデアルの素イデアル指数を作れます。全射性は有限個の素点で一様化元の冪を選ぶ構成から確認します。対角元が主イデアルへ移ることにより類群への写像が降り、その核を求めます。

<!-- proof-start -->
### 証明

イデール $x$ は有限個を除く $\mathfrak p$ で単数なので、$\operatorname{ord}_{\mathfrak p}(x_{\mathfrak p})=0$ はほぼすべての $\mathfrak p$ で成り立ちます。[分数イデアルの一意分解](../ANF3/index.md#thm-anf3-prime-ideal-factorization)により $J(x)$ の積は非零指数が有限個だけなので定義できます。[付値の積の法則](../ANF9/index.md#prop-anf9-valuation-rules)から各指数が加算されるため

$$
J(xy)=\prod_{\mathfrak p}\mathfrak p^{
\operatorname{ord}_{\mathfrak p}(x_{\mathfrak p})+
\operatorname{ord}_{\mathfrak p}(y_{\mathfrak p})}
=J(x)J(y).
$$

任意の分数イデアル $\mathfrak a=\prod_{\mathfrak p\in T}\mathfrak p^{n_{\mathfrak p}}$（$T$ は有限）を取ります。各 $\mathfrak p\in T$ の局所体で一様化元 $\pi_{\mathfrak p}$ を一つ選び、$x_{\mathfrak p}=\pi_{\mathfrak p}^{n_{\mathfrak p}}$、それ以外の有限成分と無限成分を $1$ と定めます。これはイデールであり、$J(x)=\mathfrak a$ です。よって全射です。

$J(x)=\mathcal O_K$ であることと、すべての有限素点で付値が $0$ であることは同値です。したがって $\ker J=D_K$。

対角元では[素イデアル分解](../ANF3/index.md#thm-anf3-prime-ideal-factorization)の指数がそのまま現れるので $J(\Delta(a))=(a)$ です。[イデアル類群の定義](../ANF6/index.md#def-anf6-ideal-class-group)により、$J$ は全射 $\overline J:C_K\to\operatorname{Cl}(K)$ を誘導します。

$\overline J([x])=1$ と仮定します。このとき $J(x)=(a)$ となる $a\in K^\times$ が存在し、$J(x\Delta(a)^{-1})=\mathcal O_K$ です。ゆえに $x\Delta(a)^{-1}\in D_K$、すなわち $[x]$ は $D_K$ から来ます。逆に $D_K$ から来る類の像は自明です。さらに $D_K\cap\Delta(K^\times)=\Delta(\mathcal O_K^\times)$ です。なぜなら $a$ と $a^{-1}$ が全有限素点で整であることは $a\in\mathcal O_K^\times$ と同値だからです。これで核の同定と完全性が示されました。
<!-- proof-end -->

[イデアル類群の有限性](../ANF6/index.md#thm-anf6-minkowski-class-bound)により $\operatorname{Cl}(K)$ は有限群です。ただし $C_K$ 自体が有限という意味ではありません。ここで区別すべき「有限」は二種類あり、ここまで扱った「非整成分・非単数成分が有限個」という制限付き直積の条件と、「イデアル類群が有限である」という定理は別の主張です。

**$\mathbb Q$ の具体例。** 無限成分 $5$、$2$ 成分 $1/2$、$3$ 成分 $3$、それ以外の有限成分 $1$ というイデール $x$ を取ると、

$$
J(x)=(2)^{-1}(3)=\left(\frac32\right)\mathbb Z,
\qquad
|x|_{\mathbb A}=5\cdot2\cdot\frac13=\frac{10}{3}.
$$

$J(x)$ は主分数イデアルなので $\overline J([x])=1$。実際 $y=x\Delta(3/2)^{-1}$ とすれば、$y_\infty=10/3$、$y_2=1/3\in\mathbb Z_2^\times$、$y_3=2\in\mathbb Z_3^\times$、その他の $y_p=2/3$ も $p\ne2,3$ で単数です。従って $y\in D_{\mathbb Q}$ で、商群の核の計算を直接確認できました。

次講 ANF20 では、$C_K$ を大域 Artin 写像の定義域とし、有限個の素点での合同条件をまとめる剰余類群との関係へ進みます。

## 7. 演習：有限例外・積公式・類群を自分でつなぐ

### A1. アデールか、イデールか

$K=\mathbb Q$ とする。無限成分を $1$ とし、次の有限成分を持つ三つの族をそれぞれ分類せよ。

1. すべての素数 $p$ に対して $a_p=p$。
2. すべての素数 $p$ に対して $b_p=p^{-1}$。
3. $c_2=1/2$、他の素数 $p$ では $c_p=1$。

アデールであるか、イデールであるか、理由とともに答えよ。

- Level: A
- ID: ANF19-A1

<!-- solution-start -->
**詳細解答。** [アデールの定義](#def-anf19-adele)では、$p$ 成分が $\mathbb Z_p$ に入らない素数が有限個である必要があります。[イデールの定義](#def-anf19-idele)では全成分非零に加え、ほぼすべてが $\mathbb Z_p^\times$ に入ることが必要です。

1. $v_p(a_p)=v_p(p)=1\ge0$ なので、全成分が $\mathbb Z_p$ に入りアデールです。しかし $v_p(a_p)\ne0$ が無限個あるためイデールではありません。
2. $v_p(b_p)=v_p(p^{-1})=-1$ が無限個あるためアデールではなく、従ってイデールでもありません。
3. $v_2(c_2)=-1$ だけが非零で、ほかは $v_p(c_p)=0$ です。例外 $S=\{\infty,2\}$ の外ではすべて単数なのでイデールであり、特にアデールです。
<!-- solution-end -->

### A2. $18$ のすべての局所絶対値

$a=18\in\mathbb Q^\times$ とする。$|a|_\infty$、$|a|_2$、$|a|_3$、その他の素点での値を求め、積公式を直接確認せよ。

- Level: A
- ID: ANF19-A2

<!-- solution-start -->
**詳細解答。** $18=2\cdot3^2$ なので $\operatorname{ord}_2(18)=1$、$\operatorname{ord}_3(18)=2$、その他は $0$ です。[大域積公式の正規化](#thm-anf19-product-formula)から

$$
|18|_\infty=18,\quad
|18|_2=2^{-1},\quad
|18|_3=3^{-2},\quad
|18|_p=1\ (p\ne2,3).
$$

非自明な因子だけを掛けて $18/(2\cdot9)=1$ を得ます。
<!-- solution-end -->

### A3. 逆元がアデールから外れる例

$\mathbb A_{\mathbb Q}$ の元 $a$ を $a_\infty=1$、全素数で $a_p=p$ とする。$a$ はアデール環で可逆か、定義から判定せよ。

- Level: A
- ID: ANF19-A3

<!-- solution-start -->
**詳細解答。** $p\in\mathbb Z_p$ は全素数で成立するので $a$ はアデールです。各座標は非零ですが、成分ごとの逆元候補は $a_p^{-1}=1/p$ です。すべての素数で $v_p(1/p)=-1$ なので、その族は[アデールの有限例外条件](#def-anf19-adele)を満たしません。従って $a^{-1}\notin\mathbb A_{\mathbb Q}$、$a$ は可逆ではありません。[イデールと単元の特徴付け](#prop-anf19-idele-topology)でも同じ判定になります。
<!-- solution-end -->

### A4. 複素素点の二乗の役割

$K=\mathbb Q(i)$、$a=2+i$ とする。無限素点での正規化絶対値と、$(a)$ に対応する有限素点での絶対値を求め、積を確認せよ。

- Level: A
- ID: ANF19-A4

<!-- solution-start -->
**詳細解答。** $K$ の二つの複素埋め込みは共役な一組なので、無限素点は一つです。[埋め込みノルム公式](../ANF2/index.md#thm-anf2-embedding-formulas)で

$$
|a|_\infty=|2+i|^2=(2+i)(2-i)=5.
$$

整数環 $\mathbb Z[i]$ では主イデアル $(2+i)$ の指数は $[\mathbb Z[i]:(2+i)]=5$ です。指数が素数なので $(2+i)$ は素イデアル $\mathfrak p$ で、$N\mathfrak p=5$。従って $|a|_{\mathfrak p}=5^{-1}$、他の有限素点では $1$ であり、全積は $5\cdot5^{-1}=1$ です。二乗しないと $1/\sqrt5$ になり、[積公式](#thm-anf19-product-formula)と矛盾します。
<!-- solution-end -->

### A5. 有理数体のイデアル写像

$\mathbb I_{\mathbb Q}$ の元 $x$ を $x_\infty=7$、$x_2=2^{-2}$、$x_3=3$、他の素数で $x_p=1$ とする。$J(x)$ と $|x|_{\mathbb A}$ を求めよ。

- Level: A
- ID: ANF19-A5

<!-- solution-start -->
**詳細解答。** [イデアル写像](#thm-anf19-idele-ideal-exact)の指数は $2$ で $-2$、$3$ で $1$、ほかは $0$ です。従って

$$
J(x)=(2)^{-2}(3)=\left(\frac34\right)\mathbb Z.
$$

各成分の[正規化絶対値](#def-anf19-idele-modulus)は $|x_\infty|=7$、$|2^{-2}|_2=2^2=4$、$|3|_3=1/3$ なので

$$
|x|_{\mathbb A}=7\cdot4\cdot\frac13=\frac{28}{3}.
$$

イデアル写像には無限成分 $7$ が現れませんが、絶対値には現れます。
<!-- solution-end -->

### B1. 対角像の離散性を再構成する

数体 $K$ について、各有限素点で整、各無限素点で正規化絶対値が $1$ 未満という条件を満たす $a\in K$ は $0$ に限ることを証明せよ。なぜ無限素点の条件が必要かも述べよ。

- Level: B
- ID: ANF19-B1

<!-- solution-start -->
**詳細解答。** 全有限素点で $\operatorname{ord}_{\mathfrak p}(a)\ge0$ なら、[分数イデアルの素イデアル分解](../ANF3/index.md#thm-anf3-prime-ideal-factorization)で $(a)$ の全指数が非負です。従って $(a)\subset\mathcal O_K$、すなわち $a\in\mathcal O_K$ です。もし $a\ne0$ なら[埋め込みによる跡・ノルムの公式](../ANF2/index.md#thm-anf2-embedding-formulas)から

$$
|N_{K/\mathbb Q}(a)|
=\prod_{v\in V_\infty}|a|_v<1.
$$

他方、$a$ は非零の代数的整数なのでノルムは非零整数、従って絶対値は $1$ 以上です。矛盾から $a=0$ です。この条件で作る近傍が[対角像の離散性](#prop-anf19-diagonal-discrete)を示します。有限素点だけなら $a=n\in\mathbb Z\setminus\{0\}$ はどの素点でも整なので、非零元を排除できません。
<!-- solution-end -->

### B2. 単位イデールと積公式の違い

$K=\mathbb Q$ とし、$x_\infty=6$、$x_2=2$、$x_3=3$、それ以外の有限成分を $1$ とする。$|x|_{\mathbb A}$ を計算し、$x$ が対角イデールかどうか判定せよ。さらに $x\Delta(6)^{-1}$ の有限素点での付値を求めよ。

- Level: B
- ID: ANF19-B2

<!-- solution-start -->
**詳細解答。** $x$ は有限素点 $2,3$ の二か所以外で単数なので[イデール](#def-anf19-idele)です。[イデール絶対値](#def-anf19-idele-modulus)の計算は

$$
|x|_{\mathbb A}=6\cdot2^{-1}\cdot3^{-1}=1.
$$

ただし $x$ の $5$ 成分は $1$ であり、有理数 $6$ の対角埋め込みの $5$ 成分は $6$ です。従って $x\ne\Delta(6)$。$y=x\Delta(6)^{-1}$ と置くと、$y_2=2/6=1/3$、$y_3=3/6=1/2$ で、それぞれの局所体では単数です。それ以外の $p$ では $y_p=1/6$ で、$p\ne2,3$ なら単数です。すべての有限付値が $0$ で、$J(y)=\mathbb Z$ となります。[積公式](#thm-anf19-product-formula)は対角元の絶対値を $1$ にしますが、絶対値 $1$ のイデールがすべて対角であることは主張しません。
<!-- solution-end -->

### B3. アデールで収束してもイデールでは収束しない

素数 $p$ ごとに、$e^{(p)}_\infty=1$、$e^{(p)}_p=p$、それ以外の有限成分を $1$ と定める。$p$ を大きくしたとき、アデール位相では $e^{(p)}\to1$ だが、イデール位相ではそうならないことを近傍の定義で証明せよ。

- Level: B
- ID: ANF19-B3

<!-- solution-start -->
**詳細解答。** アデールの $1$ の基本近傍は、有限集合 $S\supset\{\infty\}$ において指定した開集合と、外側の $1+\mathbb Z_q=\mathbb Z_q$ の平行移動条件から作れます。$p\notin S$ とすれば、$e^{(p)}-1$ は $p$ 成分で $p-1\in\mathbb Z_p$、他では $0$ です。従って $e^{(p)}$ は任意の固定されたアデール近傍へ最終的に入ります。

一方、[イデール位相](#def-anf19-idele)での $1$ の開近傍として

$$
W=\mathbb R_{>0}\times\prod_{q\ \text{prime}}\mathbb Z_q^\times
$$

を取れます。これは無限成分で開、外側の全部で標準部分群という基底集合です。$e^{(p)}_p=p$ は $\mathbb Z_p^\times$ に属さないので、どの $p$ に対しても $e^{(p)}\notin W$ です。従ってイデール位相では $1$ に収束しません。逆元に非整成分が残る点も[位相の相違の証明](#prop-anf19-idele-topology)と一致します。
<!-- solution-end -->

### B4. イデール類群から類群への写像の核

数体 $K$ と $x\in\mathbb I_K$ について、$J(x)=(a)$ が主分数イデアルであると仮定する。$[x]\in C_K$ が $D_K$ から来ることを証明し、代表元の選択 $a$ の違いが $\mathcal O_K^\times$ の商に吸収されることを説明せよ。

- Level: B
- ID: ANF19-B4

<!-- solution-start -->
**詳細解答。** [イデアル写像の準同型性](#thm-anf19-idele-ideal-exact)により、$y=x\Delta(a)^{-1}$ に対して

$$
J(y)=J(x)J(\Delta(a))^{-1}
=(a)(a)^{-1}=\mathcal O_K.
$$

従って全有限素点で $\operatorname{ord}_{\mathfrak p}(y_{\mathfrak p})=0$ となり、$y\in D_K$。$x$ と $y$ は対角イデールの違いだけなので同じ $C_K$ の類です。

別の $a'$ も $(a')=J(x)$ を満たせば $(a'/a)=\mathcal O_K$ です。ゆえに $u=a'/a\in\mathcal O_K^\times$ で、$x\Delta(a')^{-1}=y\Delta(u)^{-1}$。$D_K$ 内での二つの代表元は $\Delta(\mathcal O_K^\times)$ だけ異なります。従って核は $D_K/\Delta(\mathcal O_K^\times)$ であり、[完全列](#thm-anf19-idele-ideal-exact)の左端が必要です。
<!-- solution-end -->

### C1. 有理数体の非対角イデールを最後まで追う

$K=\mathbb Q$ とし、次のイデール候補 $x$ を考える。

$$
x_\infty=5,\qquad x_2=\frac12,\qquad x_3=3,\qquad
x_p=1\quad(p\ne2,3).
$$

1. $x$ がアデールかつイデールであることを定義から示せ。
2. $J(x)$ と $|x|_{\mathbb A}$ を求め、$x$ が対角イデールでないことを示せ。
3. $a=3/2$ とおき、$y=x\Delta(a)^{-1}$ の各局所成分を計算して $y\in D_{\mathbb Q}$ を示せ。
4. $[x]\in C_{\mathbb Q}$ のイデアル類群への像と、$|y|_{\mathbb A}$ を求めよ。$|x|_{\mathbb A}$ との一致を大域積公式で説明せよ。

- Level: C
- ID: ANF19-C1

<!-- solution-start -->
**詳細解答。**

1. $x_2=1/2$ のみが非整で、他の有限成分はすべて $\mathbb Z_p$ に入るため、[アデールの有限例外条件](#def-anf19-adele)を満たします。全成分は非零で、$2$ と $3$ を除けば $x_p=1\in\mathbb Z_p^\times$ なので[イデールの条件](#def-anf19-idele)も満たします。

2. 有限素点の指数は $v_2(1/2)=-1$、$v_3(3)=1$、他は $0$ なので[イデアル写像](#thm-anf19-idele-ideal-exact)から

$$
J(x)=(2)^{-1}(3)=\left(\frac32\right)\mathbb Z.
$$

   [イデール絶対値](#def-anf19-idele-modulus)は

$$
|x|_{\mathbb A}=5\cdot|1/2|_2\cdot|3|_3
=5\cdot2\cdot\frac13=\frac{10}{3}.
$$

   無限成分が $5$ なら対角元は有理数 $5$ に限られますが、その $2$ 成分は $5$ であって $1/2$ ではありません。従って非対角です。

3. $y_v=x_v/(3/2)$ を各素点で計算します。無限成分は $y_\infty=5\cdot2/3=10/3$。$2$ 成分は $(1/2)(2/3)=1/3$ で $v_2(1/3)=0$、$3$ 成分は $3(2/3)=2$ で $v_3(2)=0$ です。その他の素数では $y_p=2/3$ で、$p\ne2,3$ に対して $v_p(2/3)=0$。従って全有限成分が単数、すなわち $y\in D_{\mathbb Q}$ です。

4. $J(x)=(3/2)$ は主分数イデアルですから、[類群への誘導写像](#thm-anf19-idele-ideal-exact)で $\overline J([x])=1$。一方 $y$ の有限成分はすべて単数なので、その絶対値の積は $1$、無限成分から

$$
|y|_{\mathbb A}=\frac{10}{3}=|x|_{\mathbb A}.
$$

   最後の等式は、$y=x\Delta(3/2)^{-1}$ と[積公式](#thm-anf19-product-formula)から

$$
|y|_{\mathbb A}
=|x|_{\mathbb A}\,|\Delta(3/2)|_{\mathbb A}^{-1}
=|x|_{\mathbb A}\cdot1^{-1}
$$

   とも導けます。イデアル類への像とイデール絶対値は異なる情報を測っています。
<!-- solution-end -->
