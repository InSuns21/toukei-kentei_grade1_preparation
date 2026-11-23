# IWA10 円分単数・ノルム整合性

[IWA9の無分岐岩澤加群](../IWA9/index.md#def-iwa9-unramified-iwasawa-module)は類群をノルムで結びました。次に考えたいのは、**類群ではなく単数を円分塔の各層から集めたとき、何を明示的に作れ、どの元が層を越えて整合するか**です。[IWA4の体ノルム](../IWA4/index.md#def-iwa4-field-norm)は共役の積で定義されましたが、任意の単数を見ただけではノルムの逆像は分かりません。そこで円分根から特別な単数を作ります。

以下では **$p$ を奇素数**、$r\ge1$ とし、互いに両立する原始根 $\zeta_r=\exp(2\pi i/p^r)$ を固定します。$E_r=\mathbb Q(\zeta_r)$、$F_r=\mathbb Q(\zeta_r+\zeta_r^{-1})$、$U_r=\mathcal O_{E_r}^{\times}$、$U_r^+=\mathcal O_{F_r}^{\times}$ と書きます。$\zeta_{r+1}^p=\zeta_r$ で、[円分体の次数と分岐](../../ANF/ANF22/index.md#prop-anf22-prime-power-degree)により $[E_{r+1}:E_r]=p$、$[E_r:\mathbb Q]=p^{r-1}(p-1)$ です。$F_r$ は複素共役の固定体で次数はその半分です。

この講で行うことは次の三つです。商が整数環の単数となることを**逆元まで計算**し、円分単数群と全単数群の指数を区別し、最後に共役の積を一段ずつ計算して整合列を作ります。

## 1. $1-\zeta_r$ は単数でない――しかしその比は単数になる

まず $\alpha_r=1-\zeta_r$ と置きます。$\alpha_r$ の全共役の積は円分多項式の $1$ での値なので

$$
N_{E_r/\mathbb Q}(\alpha_r)
=\prod_{\substack{1\le a<p^r\\(a,p)=1}}(1-\zeta_r^a)
=\Phi_{p^r}(1)=p.
$$

従って $\alpha_r$ 自身は単数ではありません。一方、$a$ が $p$ と互いに素なら $1-\zeta_r^a$ も $\alpha_r$ のGalois共役です。二つの非単数の比が単数になるかを、割り算の前に整数性・逆元の両側から確認します。

<a id="def-iwa10-cyclotomic-unit"></a>

<!-- formal-statement-start -->
> **定義（明示的円分単数と円分単数群）**  
> 奇素数 $p$、整数 $r\ge1$ と $a\in(\mathbb Z/p^r\mathbb Z)^\times$ に対し、
>
$$
\eta_{r,a}=\frac{1-\zeta_r^a}{1-\zeta_r}\in E_r^\times
$$
>
> と置く（指数 $a$ は法 $p^r$ で読む）。$\mu_{2p^r}=\langle-\zeta_r\rangle$ を $E_r$ に含まれる1の冪根の群とし、$\mu_{2p^r}$ と全ての $\eta_{r,a}$ が生成する乗法部分群を
>
$$
C_r=\langle -1,\zeta_r,\eta_{r,a}:(a,p)=1\rangle\subseteq E_r^\times
$$
>
> とする。$C_r$ の元を円分単数という。
<!-- formal-statement-end -->

整数性の判定は「ノルムが $1$ なら単数」という推論だけでは不十分です。まず $a$ の代表元を正整数で取ると

$$
\eta_{r,a}=1+\zeta_r+\cdots+\zeta_r^{a-1}\in\mathcal O_{E_r}.
$$

さらに $a$ の法 $p^r$ における逆元 $b$ を取り、$\sigma_a(\zeta_r)=\zeta_r^a$ とすると、二つの商を掛けた分母が打ち消し合います。

<a id="prop-iwa10-unit-proof"></a>

<!-- formal-statement-start -->
> **命題（円分単数の整数性と明示的逆元）**  
> 奇素数 $p$、$r\ge1$、$p\nmid a$ に対し $\eta_{r,a}\in U_r$ である。$ab\equiv1\pmod{p^r}$ なら
>
$$
\eta_{r,a}^{-1}=\sigma_a(\eta_{r,b})\in\mathcal O_{E_r}.
$$
<!-- formal-statement-end -->

### 証明の見取り図

等比和で整数性を確認し、$a$ が法 $p^r$ で可逆であることから逆元を構成します。「二つの因子が共役だから比は単数」という省略はしません。

<!-- proof-start -->
### 証明

$\zeta_r$ はモニック多項式 $X^{p^r}-1$ の根で代数的整数です。等比和の式から $\eta_{r,a}$ も代数的整数です。$ab\equiv1\pmod{p^r}$ だから $\zeta_r^{ab}=\zeta_r$。そこで

$$
\begin{aligned}
\eta_{r,a}\,\sigma_a(\eta_{r,b})
&=\frac{1-\zeta_r^a}{1-\zeta_r}
  \frac{1-\zeta_r^{ab}}{1-\zeta_r^a}\\
&=\frac{1-\zeta_r^{ab}}{1-\zeta_r}
=\frac{1-\zeta_r}{1-\zeta_r}=1.
\end{aligned}
$$

$\sigma_a(\eta_{r,b})$ は代数的整数の共役なので代数的整数です。従って $\eta_{r,a}$ とその逆元がともに $\mathcal O_{E_r}$ に入るため、$\eta_{r,a}\in U_r$ です。
<!-- proof-end -->

<!-- definition-example-start: def-iwa10-cyclotomic-unit -->
**定義の直接確認。** $p=3,r=1,a=2$ では $\eta_{1,2}=1+\zeta_1$ です。$\zeta_1^2+\zeta_1+1=0$ を使うと

$$
(1+\zeta_1)(1+\zeta_1^2)
=2+\zeta_1+\zeta_1^2=1.
$$

従って逆元 $1+\zeta_1^2$ も $\mathbb Z[\zeta_1]$ に入ります。また $1+\zeta_1=-\zeta_1^2$ は1の冪根そのものなので $\eta_{1,2}\in C_1$。この例では $C_1=\mu_6$ であり、$\mathbb Z[\zeta_1]$ の全単数群も $\mu_6$ です（後で指数を検算します）。
<!-- definition-example-end -->

単数を掛け合わせたときに指数 $a$ は単純には加算されません。分子と分母の対応を追うと、Galois作用を伴う積公式が得られます。

<a id="prop-iwa10-cocycle"></a>

<!-- formal-statement-start -->
> **命題（円分単数の積公式）**  
> 奇素数 $p$、$r\ge1$、$a,b\in(\mathbb Z/p^r\mathbb Z)^\times$ について
>
$$
\eta_{r,ab}=\eta_{r,a}\,\sigma_a(\eta_{r,b}),\qquad
\sigma_b(\eta_{r,a})=\eta_{r,ab}\eta_{r,b}^{-1}.
$$
>
> 特に $C_r$ は $\operatorname{Gal}(E_r/\mathbb Q)$ の作用で保たれる。
<!-- formal-statement-end -->

### 証明の見取り図

同じ分子 $1-\zeta_r^{ab}$ を二通りの順序で割り算します。これによって単数群のGalois安定性も従います。

<!-- proof-start -->
### 証明

定義から

$$
\frac{1-\zeta_r^{ab}}{1-\zeta_r}
=\frac{1-\zeta_r^a}{1-\zeta_r}
 \frac{1-\zeta_r^{ab}}{1-\zeta_r^a}
=\eta_{r,a}\sigma_a(\eta_{r,b}).
$$

$a,b$ を交換すると $\eta_{r,ab}=\eta_{r,b}\sigma_b(\eta_{r,a})$ なので、先に証明した[逆元の存在](#prop-iwa10-unit-proof)によって第二式を得ます。$\sigma_b$ は $-1$ を固定し、$\zeta_r$ をその冪へ写し、各 $\eta_{r,a}$ を $C_r$ 内の比へ写します。$\sigma_b(C_r)\subseteq C_r$。同じ議論を $\sigma_b^{-1}$ に適用して逆包含も得ます。
<!-- proof-end -->

## 2. 実部分体の円分単数をどう作るか

[IWA8の複素共役による偶奇分解](../IWA8/index.md#def-iwa8-parity-parts)では、複素共役の固定部分を考えました。ところが $\eta_{r,a}$ は一般には実数ではありません。複素共役でどの1の冪根が余分に掛かるかを先に計算すると

$$
\overline{\eta_{r,a}}
=\frac{1-\zeta_r^{-a}}{1-\zeta_r^{-1}}
=\zeta_r^{1-a}\eta_{r,a}.
$$

$p^r$ は奇数なので、任意の単元剰余類 $a$ には奇数の代表元を選べます。そこで1の冪根を一つ掛け、余分な位相を消します。

<a id="def-iwa10-real-cyclotomic-unit"></a>

<!-- formal-statement-start -->
> **定義（実円分単数）**  
> 奇素数 $p$、$r\ge1$、$p\nmid a$ を満たす**奇数** $a$ について
>
$$
\xi_{r,a}=\zeta_r^{(1-a)/2}\eta_{r,a},\qquad
C_r^+=C_r\cap U_r^+
$$
>
> と置く。$C_r^+$ は実部分体 $F_r$ の円分単数群である。同じ単元剰余類を表す奇数 $a$ は $2p^r$ を法として一致するため、$\xi_{r,a}$ は代表元の選び方によらない。
<!-- formal-statement-end -->

<a id="prop-iwa10-realness"></a>

<!-- formal-statement-start -->
> **命題（実単数と群の生成）**  
> 奇素数 $p$、$r\ge1$ について $\xi_{r,a}\in U_r^+$ であり、
>
$$
C_r=\mu_{2p^r}\langle\xi_{r,a}:a\text{ は奇数},\ p\nmid a\rangle,\qquad
C_r^+=\langle-1,\xi_{r,a}:a\text{ は奇数},\ p\nmid a\rangle.
$$
<!-- formal-statement-end -->

### 証明の見取り図

複素共役を計算して $\xi$ が実であることを示し、任意の $\eta$ が実単数と1の冪根の積に戻せることを使います。

<!-- proof-start -->
### 証明

$\xi_{r,a}$ は[単数の命題](#prop-iwa10-unit-proof)によって単数です。複素共役に関する上の式を代入すると

$$
\overline{\xi_{r,a}}
=\zeta_r^{-(1-a)/2}\zeta_r^{1-a}\eta_{r,a}
=\zeta_r^{(1-a)/2}\eta_{r,a}=\xi_{r,a}.
$$

よって $\xi_{r,a}\in F_r$ で、その逆元も $F_r$ に入るため $U_r^+$ に属します。任意の単元剰余類は奇数の代表元を持ち、その代表元について $\eta_{r,a}=\zeta_r^{(a-1)/2}\xi_{r,a}$ だから、$C_r$ は表示された群です。

$C_r$ の元は $\varepsilon v$（$\varepsilon\in\mu_{2p^r}$、$v\in\langle\xi_{r,a}\rangle\subset F_r$）と書けます。これが実なら $\varepsilon=(\varepsilon v)/v$ も実であり、実数の1の冪根は $\pm1$ のみです。従って $C_r\cap F_r^\times=\langle-1,\xi_{r,a}\rangle$。全て単数なので $C_r^+$ と一致します。
<!-- proof-end -->

<!-- definition-example-start: def-iwa10-real-cyclotomic-unit -->
**定義の直接確認。** $p=5,r=1,a=3$ では

$$
\xi_{1,3}=\zeta_1^{-1}(1+\zeta_1+\zeta_1^2)
=1+\zeta_1+\zeta_1^{-1}.
$$

$x=\zeta_1+\zeta_1^{-1}$ とすると、$1+\zeta_1+\cdots+\zeta_1^4=0$ から $x^2+x-1=0$ です。$x=2\cos(2\pi/5)>0$ を用いて $x=(\sqrt5-1)/2$、従って $\xi_{1,3}=(1+\sqrt5)/2$。これは $F_1=\mathbb Q(\sqrt5)$ の元であり、共役との積は

$$
\frac{1+\sqrt5}{2}\frac{1-\sqrt5}{2}=-1.
$$

よって逆元は $-(1-\sqrt5)/2$ で代数的整数です。実数性、整数性、逆元の三条件を確認できました。
<!-- definition-example-end -->

## 3. ノルムを共役の積から計算する

ここが本講の中心計算です。$E_{r+1}/E_r$ は次数 $p$ のGalois拡大です。[制限写像の核](../IWA2/index.md#prop-iwa2-cyclotomic-restriction)は $1+jp^r$（$0\le j<p$）で表されます。$\zeta_{r+1}^{p^r}$ は原始 $p$ 乗根 $\zeta_p$ ですから、$\alpha_{r+1}$ の共役は $1-\zeta_{r+1}\zeta_p^j$ です。

多項式の因数分解

$$
\prod_{j=0}^{p-1}(1-X\zeta_p^j)=1-X^p
$$

を $X=\zeta_{r+1}$ に代入すると

$$
\prod_{j=0}^{p-1}(1-\zeta_{r+1}\zeta_p^j)
=1-\zeta_{r+1}^p=1-\zeta_r.
$$

$a$ が $p$ と互いに素なら、分子の共役では $j\mapsto aj\bmod p$ が置換になるので、同じ計算を $X=\zeta_{r+1}^a$ に適用できます。

<a id="thm-iwa10-norm-distribution"></a>

<!-- formal-statement-start -->
> **定理（円分単数のノルム分布関係）**  
> 奇素数 $p$、$r\ge1$、$p\nmid a$ のとき、$E_{r+1}=\mathbb Q(\zeta_{p^{r+1}})$ から $E_r=\mathbb Q(\zeta_{p^r})$ への体ノルムについて
>
$$
\begin{aligned}
N_{E_{r+1}/E_r}(1-\zeta_{r+1}^a)&=1-\zeta_r^a,\\
N_{E_{r+1}/E_r}(\eta_{r+1,a})&=\eta_{r,a},\\
N_{E_{r+1}/E_r}(\zeta_{r+1})&=\zeta_r,\qquad
N_{E_{r+1}/E_r}(-1)=-1.
\end{aligned}
$$
>
> $a$ が奇数なら、さらに $N_{F_{r+1}/F_r}(\xi_{r+1,a})=\xi_{r,a}$ が成り立つ。
<!-- formal-statement-end -->

### 証明の見取り図

最初の式は共役を並べて多項式 $1-X^p$ にまとめます。第二式はノルムの乗法性、最後は1の冪根のノルムと実部分体への制限から得ます。

<!-- proof-start -->
### 証明

$\operatorname{Gal}(E_{r+1}/E_r)$ の元を $\tau_j(\zeta_{r+1})=\zeta_{r+1}^{1+jp^r}=\zeta_{r+1}\zeta_p^j$（$0\le j<p$）とします。[体ノルムの定義](../IWA4/index.md#def-iwa4-field-norm)へ $x=1-\zeta_{r+1}^a$ を入力すると

$$
\begin{aligned}
N_{E_{r+1}/E_r}(1-\zeta_{r+1}^a)
&=\prod_{j=0}^{p-1}(1-\zeta_{r+1}^a\zeta_p^{aj})\\
&=\prod_{k=0}^{p-1}(1-\zeta_{r+1}^a\zeta_p^k)
=1-(\zeta_{r+1}^a)^p=1-\zeta_r^a.
\end{aligned}
$$

第二等号で $k=aj\bmod p$ が全剰余を一巡するのは **$p\nmid a$ のため**です。$a=1$ と一般 $a$ の式を割れば、分母 $1-\zeta_r\ne0$ なので

$$
N_{E_{r+1}/E_r}(\eta_{r+1,a})
=\frac{1-\zeta_r^a}{1-\zeta_r}=\eta_{r,a}.
$$

1の冪根については

$$
N_{E_{r+1}/E_r}(\zeta_{r+1})
=\prod_{j=0}^{p-1}\zeta_{r+1}\zeta_p^j
=\zeta_r\zeta_p^{p(p-1)/2}=\zeta_r.
$$

$p$ は奇数なので $\zeta_p^{p(p-1)/2}=1$、また $(-1)^p=-1$ です。$a$ が奇数なら

$$
N_{E_{r+1}/E_r}(\xi_{r+1,a})
=\zeta_r^{(1-a)/2}\eta_{r,a}=\xi_{r,a}.
$$

最後に、複素共役は $E_{r+1}/E_r$ の位数 $p$ の相対Galois群と可換です。その制限を取ると $\operatorname{Gal}(E_{r+1}/E_r)\to\operatorname{Gal}(F_{r+1}/F_r)$ は同型です（どちらも位数 $p$ で、核は複素共役の位数2の群との共通部分なので自明）。$\xi_{r+1,a}\in F_{r+1}$ の共役の積は両拡大で同じになり、実部分体のノルム公式を得ます。
<!-- proof-end -->

**手計算：$p=3$ の第一段。** $\omega=\zeta_1=\zeta_2^3$ と置くと

$$
\begin{aligned}
N_{E_2/E_1}(1-\zeta_2)
&=(1-\zeta_2)(1-\zeta_2\omega)(1-\zeta_2\omega^2)
=1-\zeta_2^3=1-\omega,\\
N_{E_2/E_1}(1+\zeta_2)
&=(1+\zeta_2)(1+\zeta_2\omega)(1+\zeta_2\omega^2)
=1+\zeta_2^3=1+\omega.
\end{aligned}
$$

二つ目は $\eta_{2,2}=1+\zeta_2$ のノルムが $\eta_{1,2}=1+\omega$ になる確認です。ノルムが**存在すること**と、全単数群上で**全射であること**は別の主張です。

### $p\nmid a$ を落とすと何が壊れるか

$r\ge1$ で $a=p$ とすると $1-\zeta_{r+1}^p=1-\zeta_r$ は既に下の体の元です。したがって[体ノルムの定義](../IWA4/index.md#def-iwa4-field-norm)では $p$ 個の共役が全て同じになり、

$$
N_{E_{r+1}/E_r}(1-\zeta_{r+1}^{p})=(1-\zeta_r)^p,
$$

となります。これを $1-\zeta_r^p$ と書くのは誤りです。$r=1,p=3$ なら後者は $1-\zeta_1^3=0$ なのに前者は非零です。破綻したのは $j\mapsto pj$ が法 $p$ の置換になるという証明の段階です。

## 4. 円分単数群と全単数群の指数

$IWA9$ までは類群を直接調べました。今度は、明示的に作った円分単数群 $C_r$ が全単数群 $U_r$ のどの程度を占めるかを測ります。指数 $[U_r:C_r]$ は商群 $U_r/C_r$ の元の数であり、**有限なら**「有限個の剰余類を除いて全単数を生成する」ことを意味します。単数をいくつか列挙できたことから、指数の有限性は自動的には出ません。

<a id="thm-iwa10-finite-index"></a>

<!-- formal-statement-start -->
> **定理（円分単数の有限指数と実類数：外部定理）**  
> 奇素数 $p$、$r\ge1$、$F_r=\mathbb Q(\zeta_{p^r}+\zeta_{p^r}^{-1})$ とし、上で定義した $C_r^+\subseteq U_r^+$ を取る。$h_r^+=|\operatorname{Cl}(F_r)|$ を通常のイデアル類数とすると
>
$$
[U_r^+:C_r^+]=h_r^+<\infty.
$$
>
> とくに $C_r$ は $U_r$ の有限指数部分群である。
<!-- formal-statement-end -->

この指数公式は、円分単数の対数行列式と実部分体の解析的類数公式を結ぶ **Kummer–Sinnottの指数公式**の素数冪導手の場合です。証明にはこの講のノルムの積計算だけでなく、Dirichletの単数定理、$L(1,\chi)$ の非消滅や類数公式に相当する深い入力が必要なので、ここでは外部定理として引用します（Washington, *Introduction to Cyclotomic Fields*, 円分単数の章）。この講で自分で証明したのは円分単数の整数性と整合性であって、上の類数公式の一般証明ではありません。

右辺が有限であるのは数体のイデアル類群が有限だからです。左辺の値は定義した **実** 円分単数群の正規化に依存します。導手を素数冪以外にも拡げる場合、この等式を補正なしに用いることはできません。またこの類数 $h_r^+$ は $E_r$ の類数ではなく、その**最大実部分体**の類数です。

定理末尾の「円分単数群は全単数群の有限指数部分群」という帰結も確認しましょう。実部分体の次数を

$$
d=[F_r:\mathbb Q]=\frac{p^{r-1}(p-1)}{2}
$$

と置きます。$F_r$ の実埋め込みは $d$ 個、$E_r$ の複素共役な埋め込みの組も $d$ 個です。

Dirichletの単数定理（ここでは外部の既知結果）によれば、$U_r^+$ と $U_r$ は有限生成アーベル群であり、自由部分の階数はいずれも $d-1$ です。上の指数公式から $C_r^+$ の階数も $d-1$ となります。

$$
C_r^+\subseteq C_r\subseteq U_r
$$

なので $C_r$ の階数は下からも上からも $d-1$ です。有限生成アーベル群で、同じ階数を持つ部分群による商は有限群になります。従って

$$
[U_r:C_r]<\infty
$$

が従います。

外部定理から独立に、低次の指数なら整数の計算だけで求められます。

<a id="prop-iwa10-p5-index"></a>

<!-- formal-statement-start -->
> **命題（5次円分体の実単数群の指数を直接計算）**  
> $F_1=\mathbb Q(\sqrt5)$、$\varphi=(1+\sqrt5)/2$ とすると
>
$$
U_1^+=\{\pm\varphi^n:n\in\mathbb Z\}=C_1^+,
\qquad [U_1^+:C_1^+]=1.
$$
<!-- formal-statement-end -->

### 証明の見取り図

$\xi_{1,3}=\varphi$ はすでに構成しました。逆に任意の実単数を $\varphi$ の冪で $[1,\varphi)$ に移し、整数であるトレースと $\pm1$ であるノルムを使って、その区間には $1$ しかないことを示します。

<!-- proof-start -->
### 証明

$\varphi^2=\varphi+1$、$\varphi>1$、$N_{F_1/\mathbb Q}(\varphi)=-1$ です。前節の[直接例](#def-iwa10-real-cyclotomic-unit)で $\varphi=\xi_{1,3}\in C_1^+$ を確認しました。任意の $u\in U_1^+$ を取り、必要なら $-1$ を掛けて選んだ実埋め込みで $u>0$ とします。ある整数 $n$ を選んで

$$
1\le v=u\varphi^{-n}<\varphi
$$

とできます。$v$ は代数的整数かつ単数なので、$N(v)=\pm1$、$t=\operatorname{Tr}_{F_1/\mathbb Q}(v)\in\mathbb Z$ です。もう一方の実埋め込みでの値 $v'$ は $vv'=N(v)$ から決まります。

$N(v)=1$ なら $t=v+v^{-1}$ であり、区間 $1\le v<\varphi$ では

$$
2\le t<\varphi+\varphi^{-1}=\sqrt5<3.
$$

従って整数 $t=2$、$v+v^{-1}=2$ から $(v-1)^2=0$、すなわち $v=1$ です。

$N(v)=-1$ なら $t=v-v^{-1}$ であり、

$$
0\le t<\varphi-\varphi^{-1}=1.
$$

$t$ が整数なので $t=0$、これより $v^2=1$、$v=1$ となります。しかし $N(1)=1$ で矛盾します。従って第二の場合は不可能です。結局 $u=\pm\varphi^n$。逆包含は $\varphi\in C_1^+$ と $-1\in C_1^+$ から成立します。
<!-- proof-end -->

$p=3,r=1$ も比較しましょう。$E_1=\mathbb Q(\sqrt{-3})$ の単数は、複素平面で絶対値1の $\mathbb Z[\zeta_1]$ の元に限られます。$a+b\zeta_1$（$a,b\in\mathbb Z$）の絶対値の二乗は $a^2-ab+b^2$ なので、この値が1になる整数対は $(\pm1,0),(0,\pm1),(1,1),(-1,-1)$ の六つだけです。従って $U_1=\mu_6=C_1$、$[U_1:C_1]=1$ です。

## 5. 無限塔で整合する単数列

各層の $C_r$ が生成元から明示できたので、ノルムを作用させます。[IWA4の逆極限](../IWA4/index.md#def-iwa4-inverse-limit)は、単に層ごとの直積を取るのではなく、隣同士がノルムで一致する列を残す構成でした。

<a id="def-iwa10-compatible-cyclotomic-system"></a>

<!-- formal-statement-start -->
> **定義（円分単数のノルム整合系）**  
> 奇素数 $p$ の円分塔 $E_r=\mathbb Q(\zeta_{p^r})$ に対し
>
$$
C_\infty=\varprojlim_{r\ge1}
\bigl(C_r,N_{E_{r+1}/E_r}\bigr)
=\{(u_r)_{r\ge1}:u_r\in C_r,\
N_{E_{r+1}/E_r}(u_{r+1})=u_r\}
$$
>
> とする。これを円分単数のノルム整合系といい、項ごとの乗法で群をなす。
<!-- formal-statement-end -->

<a id="thm-iwa10-surjective-norm"></a>

<!-- formal-statement-start -->
> **定理（円分単数のノルムの全射性）**  
> 奇素数 $p$ の円分塔について、各 $r\ge1$ で制限ノルム
>
$$
N_{E_{r+1}/E_r}:C_{r+1}\longrightarrow C_r
$$
>
> は全射である。固定した整数 $a$ が $p\nmid a$ を満たせば $(\eta_{r,a})_{r\ge1}\in C_\infty$ であり、$(\zeta_r)_{r\ge1}$ も $C_\infty$ の元である。$a$ が奇数なら $(\xi_{r,a})_{r\ge1}\in\varprojlim C_r^+$ も成立する。
<!-- formal-statement-end -->

### 証明の見取り図

一つ上の層の生成元をノルムで写し、下の層の各生成元を**一つずつ**得ます。生成元の像が全体を生成するので全射です。

<!-- proof-start -->
### 証明

まず[積公式](#prop-iwa10-cocycle)で $C_{r+1}$ がGalois安定な単数群であることを確認済みです。[ノルム分布関係](#thm-iwa10-norm-distribution)から

$$
N(-1)=-1,\qquad N(\zeta_{r+1})=\zeta_r,\qquad
N(\eta_{r+1,a})=\eta_{r,a}
$$

です。$C_r$ の生成元 $\eta_{r,a}$ の指数は法 $p^r$ の単元剰余類ですが、同じ整数代表元 $a$ を法 $p^{r+1}$ で見ても $p\nmid a$ なので有効です。従って全ての生成元は $C_{r+1}$ に逆像を持ち、乗法準同型の像は $C_r$ を含みます。逆に像が $C_r$ に入るのも上の生成元計算から分かるため、全射です。

各 $a$ を層を越えて同じ整数で固定すればノルム関係が全ての $r$ で成立し、$(\eta_{r,a})_r$ は逆極限の定義を満たします。1の冪根の列についても同様です。奇数 $a$ の場合は[実部分体のノルム](#thm-iwa10-norm-distribution)により $(\xi_{r,a})_r$ の整合性が従います。
<!-- proof-end -->

<!-- definition-example-start: def-iwa10-compatible-cyclotomic-system -->
**定義の直接確認。** $p=3,a=2$ とすると
$$
u_1=1+\zeta_3,\quad u_2=1+\zeta_9,\quad u_3=1+\zeta_{27},\ldots
$$
はすべて整数環の単数です（[逆元の命題](#prop-iwa10-unit-proof)）。第3節で $N_{E_2/E_1}(u_2)=u_1$ を実計算しました。同じ因数分解を $E_{r+1}/E_r$ に適用すれば任意の $r$ でも $N(u_{r+1})=u_r$。従って $(u_r)\in C_\infty$ です。この例は、初項だけを提示したのではなく全ての接続条件を満たしています。
<!-- definition-example-end -->

**全単数群との違い。** $N(C_{r+1})=C_r$ は生成元のノルムを構成できたから成り立ちます。これから $N(U_{r+1})=U_r$ は従いません。$U_{r+1}$ の像が $C_r$ を含んでも、$C_r\subset U_r$ が真に有限指数なら、その外側の単数が像に入るとは限らないからです。また $C_\infty$ と $\varprojlim U_r$ の商を有限層の群指数だけから同一視することもできません。ノルムと指数の両方を管理する必要があり、次講で局所単数との比較に進みます。

## 6. 演習と詳細解答

### Level A

<a id="ex-iwa10-a1"></a>

**A1. 円分単数の逆元を直接作る**
- Level: A
- ID: IWA10-A1

$p=3,r=2,a=2$ とする。$b$ を法9での $2$ の逆元として取り、$\eta_{2,2}$ とその逆元を $\mathbb Z[\zeta_9]$ の式で書け。

<!-- solution-start -->
**詳細解答。** $2\cdot5=10\equiv1\pmod9$ なので $b=5$。$\eta_{2,2}=1+\zeta_9$ です。また

$$
\sigma_2(\eta_{2,5})
=\frac{1-\zeta_9^{10}}{1-\zeta_9^2}
=\frac{1-\zeta_9}{1-\zeta_9^2}
=\frac{1}{1+\zeta_9}.
$$

$\eta_{2,5}$ は等比和で代数的整数、その共役も代数的整数です。よって両側が整数環に入り、$\eta_{2,2}$ は単数です。
<!-- solution-end -->

<a id="ex-iwa10-a2"></a>

**A2. 実円分単数の条件**
- Level: A
- ID: IWA10-A2

$p=5,r=1,a=3$ とし、$\xi_{1,3}=\zeta_5^{-1}\eta_{1,3}$ を考える。複素共役で固定されることと、実部分体へのノルムが $-1$ であることを式で確かめよ。

<!-- solution-start -->
**詳細解答。** $\eta_{1,3}=1+\zeta_5+\zeta_5^2$ だから $\xi_{1,3}=\zeta_5^{-1}+1+\zeta_5$。複素共役は $\zeta_5\leftrightarrow\zeta_5^{-1}$ を交換するのでこの和を固定します。$x=\zeta_5+\zeta_5^{-1}$ と置くと $x^2+x-1=0$、従って $\xi_{1,3}=1+x=(1+\sqrt5)/2$。もう一つの埋め込みは $\sqrt5\mapsto-\sqrt5$ なので

$$
N_{F_1/\mathbb Q}(\xi_{1,3})
=\frac{(1+\sqrt5)(1-\sqrt5)}4=-1.
$$

非零の整数ノルムが $\pm1$ であるため逆元も整数環にあります。
<!-- solution-end -->

<a id="ex-iwa10-a3"></a>

**A3. $1-\zeta$ のノルムと単数性**
- Level: A
- ID: IWA10-A3

$p=3,r=2$ で $N_{E_2/E_1}(1-\zeta_9)$ を積として計算せよ。$1-\zeta_9$ は単数か。

<!-- solution-start -->
**詳細解答。** $\omega=\zeta_9^3=\zeta_3$ とすると、相対Galois群の共役は $\zeta_9,\zeta_9\omega,\zeta_9\omega^2$ です。よって

$$
N_{E_2/E_1}(1-\zeta_9)
=\prod_{j=0}^2(1-\zeta_9\omega^j)=1-\zeta_9^3=1-\zeta_3.
$$

更に $N_{E_1/\mathbb Q}(1-\zeta_3)=(1-\zeta_3)(1-\zeta_3^2)=3$。[ノルムの塔での合成](../IWA4/index.md#prop-iwa4-norm-transitivity)により $N_{E_2/\mathbb Q}(1-\zeta_9)=3$。単数の整数ノルムは $\pm1$ であるため、$1-\zeta_9$ は単数ではありません。
<!-- solution-end -->

<a id="ex-iwa10-a4"></a>

**A4. 指数が単元でないとき**
- Level: A
- ID: IWA10-A4

$p=3,r=1$、$a=3$ を取り、$N_{E_2/E_1}(1-\zeta_9^3)$ を求めよ。$a$ が単元のときの公式を代入できない理由も述べよ。

<!-- solution-start -->
**詳細解答。** $\zeta_9^3=\zeta_3$ は $E_1$ にあるため、相対Galois群の各元は $1-\zeta_3$ を固定します。相対次数は3なので

$$
N_{E_2/E_1}(1-\zeta_9^3)=(1-\zeta_3)^3\ne0.
$$

一方、誤った代入による $1-\zeta_3^3$ は0です。[分布関係の証明](#thm-iwa10-norm-distribution)では $j\mapsto aj\bmod3$ が置換であることを使いますが、$a=3$ では全て0となり、共役を一巡しません。
<!-- solution-end -->

<a id="ex-iwa10-a5"></a>

**A5. 有限層の単数群の指数**
- Level: A
- ID: IWA10-A5

$E_1=\mathbb Q(\zeta_3)$、$\mathcal O_{E_1}=\mathbb Z[\zeta_3]$ とする。元 $a+b\zeta_3$（$a,b\in\mathbb Z$）のノルム式から $[U_1:C_1]$ を求めよ。

<!-- solution-start -->
**詳細解答。** 複素共役で $\zeta_3+\zeta_3^2=-1$、$\zeta_3\zeta_3^2=1$ なので

$$
N_{E_1/\mathbb Q}(a+b\zeta_3)
=(a+b\zeta_3)(a+b\zeta_3^2)=a^2-ab+b^2.
$$

単数ならこの値は1です。$4(a^2-ab+b^2)=(2a-b)^2+3b^2=4$ より $b=0,\pm1$。各場合を代入すると $(a,b)=(\pm1,0),(0,\pm1),(1,1),(-1,-1)$ の六つです。これらは $\pm1,\pm\zeta_3,\pm\zeta_3^2$ に等しく、すべて定義から $C_1$ に入ります。従って $U_1=C_1=\mu_6$、指数は1です。
<!-- solution-end -->

### Level B

<a id="ex-iwa10-b1"></a>

**B1. 群作用下での積の書き換え**
- Level: B
- ID: IWA10-B1

$p\nmid ab$ とする。$\eta_{r,ab}=\eta_{r,b}\sigma_b(\eta_{r,a})$ を直接示し、$\sigma_b(C_r)=C_r$ を両包含で証明せよ。

<!-- solution-start -->
**詳細解答。** 分子 $1-\zeta_r^{ab}$ に中間分母 $1-\zeta_r^b$ を挟むと

$$
\frac{1-\zeta_r^{ab}}{1-\zeta_r}
=\frac{1-\zeta_r^b}{1-\zeta_r}
\frac{1-\zeta_r^{ab}}{1-\zeta_r^b}
=\eta_{r,b}\sigma_b(\eta_{r,a}).
$$

よって $\sigma_b(\eta_{r,a})=\eta_{r,ab}\eta_{r,b}^{-1}\in C_r$。また $\sigma_b(-1)=-1$、$\sigma_b(\zeta_r)=\zeta_r^b\in C_r$ なので生成元の像は $C_r$ 内、従って $\sigma_b(C_r)\subseteq C_r$ です。$b'$ を $bb'\equiv1\pmod{p^r}$ と取れば同じ議論で $\sigma_{b'}(C_r)\subseteq C_r$。$\sigma_b$ を作用させると $C_r=\sigma_b\sigma_{b'}(C_r)\subseteq\sigma_b(C_r)$ なので等号です。
<!-- solution-end -->

<a id="ex-iwa10-b2"></a>

**B2. 生成元からノルムの全射性を証明**
- Level: B
- ID: IWA10-B2

奇素数 $p$ と $r\ge1$ に対し、$\eta_{r,a}$ の指数が法 $p^r$ の剰余類であることに注意し、$N_{E_{r+1}/E_r}(C_{r+1})=C_r$ を証明せよ。あわせて、この等式だけで $N(U_{r+1})=U_r$ を主張できない理由を述べよ。

<!-- solution-start -->
**詳細解答。** 下層の円分単数群を作る生成元を、一つずつ上層から持ち上げます。まず1の冪根について、[分布関係](#thm-iwa10-norm-distribution)から

$
N(-1)=-1,\qquad N(\zeta_{r+1})=\zeta_r
$

です。次に、下層の指数 $a$ は法 $p^r$ の単元剰余類です。$p$ と互いに素な整数代表元を選べば、法 $p^{r+1}$ でも単元になります。この上層の指数で円分単数を作ると

$
\eta_{r+1,a}\in C_{r+1},\qquad N(\eta_{r+1,a})=\eta_{r,a}
$

が成り立ちます。従ってノルム像は全ての下層生成元を含みます。逆に上層生成元の像は下層群に入るので、像はちょうど $C_r$ です。

$U_r/C_r$ が自明とは限りません。$C_r\subseteq N(U_{r+1})\subseteq U_r$ までしか示しておらず、商 $U_r/C_r$ の非自明な剰余類にノルム逆像があるとは分かりません。よって全単数群に同じ全射性を移す推論はできません。
<!-- solution-end -->

<a id="ex-iwa10-b3"></a>

**B3. 非単元のノルムを二段で検算**
- Level: B
- ID: IWA10-B3

奇素数 $p$ について、$E_2=\mathbb Q(\zeta_{p^2})$、$E_1=\mathbb Q(\zeta_p)$ とする。$\beta=(1-\zeta_{p^2}^p)/(1-\zeta_{p^2})$ は代数的整数であることを示し、$N_{E_2/\mathbb Q}(\beta)$ を求め、単数でないことを示せ。

<!-- solution-start -->
**詳細解答。** $\beta=1+\zeta_{p^2}+\cdots+\zeta_{p^2}^{p-1}$ は代数的整数です。分子 $1-\zeta_{p^2}^p=1-\zeta_p$ は下層 $E_1$ にあるので

$$
N_{E_2/E_1}(1-\zeta_{p^2}^p)=(1-\zeta_p)^p.
$$

分母のノルムは[分布関係](#thm-iwa10-norm-distribution)から $1-\zeta_p$。よって

$$
N_{E_2/E_1}(\beta)=(1-\zeta_p)^{p-1}.
$$

$N_{E_1/\mathbb Q}(1-\zeta_p)=\Phi_p(1)=p$ を使い、[ノルムの合成](../IWA4/index.md#prop-iwa4-norm-transitivity)から

$$
N_{E_2/\mathbb Q}(\beta)=p^{p-1}.
$$

これは $\pm1$ でないため $\beta$ は単数ではありません。$p\nmid a$ を削ると、比の整数性だけでは単数性を保証できないことを示します。
<!-- solution-end -->

<a id="ex-iwa10-b4"></a>

**B4. 実部分体でノルムを合わせる**
- Level: B
- ID: IWA10-B4

奇素数 $p=5$、$a=3$ に対し、$\xi_{2,3}=\zeta_{25}^{-1}\eta_{2,3}\in F_2$ を考える。$N_{F_2/F_1}(\xi_{2,3})=\xi_{1,3}$ を相対ノルムの共役積から示し、右辺の整数ノルムを求めよ。

<!-- solution-start -->
**詳細解答。** $E_2/E_1$ の相対群の元は $\zeta_{25}\mapsto\zeta_{25}\zeta_5^j$（$0\le j<5$）です。$\xi_{2,3}$ は複素共役で固定され、相対次数 $[F_2:F_1]=5$ と $[E_2:E_1]=5$ が一致するため、この5個の共役を $F_2/F_1$ のノルムにも用いられます。分子・分母の積を分けると

$$
\begin{aligned}
N_{F_2/F_1}(\xi_{2,3})
&=N_{E_2/E_1}(\zeta_{25}^{-1})
  \frac{N_{E_2/E_1}(1-\zeta_{25}^3)}
       {N_{E_2/E_1}(1-\zeta_{25})}\\
&=\zeta_5^{-1}\frac{1-\zeta_5^3}{1-\zeta_5}
=\xi_{1,3}.
\end{aligned}
$$

$p=5$ の[実単数の計算](#def-iwa10-real-cyclotomic-unit)から $\xi_{1,3}=(1+\sqrt5)/2$。したがって $N_{F_1/\mathbb Q}(\xi_{1,3})=-1$ です。
<!-- solution-end -->

### Level C

<a id="ex-iwa10-c1"></a>

**C1. 明示構成・指数・逆極限を一つにつなぐ**
- Level: C
- ID: IWA10-C1

$p=5$、$E_r=\mathbb Q(\zeta_{5^r})$、$F_r=E_r^+$ とする。

1. $a=3$ の円分単数 $\eta_{r,3}$ の逆元を、法 $5^r$ の逆数 $b$ とGalois作用を使って記述せよ。
2. $\xi_{1,3}$ を $\sqrt5$ で表し、$[U_1^+:C_1^+]$ を**外部の指数公式を使わず**に求めよ。
3. $\bigl(\xi_{r,3}\bigr)_{r\ge1}$ が実部分体のノルム整合系に属することを証明せよ。
4. $a=5$ と変えたとき、なぜ第3問の計算をそのまま流用できないのか、$N_{E_2/E_1}(1-\zeta_{25}^{5})$ を求めて説明せよ。

<!-- solution-start -->
**詳細解答。**

**第1問。** $5\nmid3$ より法 $5^r$ に $3$ の乗法逆元 $b$ が存在します。$3b\equiv1\pmod{5^r}$ から $\zeta_{5^r}^{3b}=\zeta_{5^r}$ なので

$$
\eta_{r,3}\sigma_3(\eta_{r,b})
=\frac{1-\zeta_{5^r}^3}{1-\zeta_{5^r}}
 \frac{1-\zeta_{5^r}^{3b}}{1-\zeta_{5^r}^3}=1.
$$

従って逆元は $\sigma_3(\eta_{r,b})$ です。両方とも代数的整数であることを等比和から確認できるため単数です。

**第2問。** $\eta_{1,3}=1+\zeta_5+\zeta_5^2$ を $\zeta_5^{-1}$ 倍して

$$
\xi_{1,3}=1+\zeta_5+\zeta_5^{-1}
=\frac{1+\sqrt5}{2}=\varphi.
$$

$\varphi^2=\varphi+1$、$N(\varphi)=-1$。任意の $u\in U_1^+$ の符号と $\varphi$ の冪を調整して $v\in[1,\varphi)$ とします。$N(v)=1$ のとき整数トレースは $2\le v+v^{-1}<\sqrt5<3$ で2に限られ、$v=1$。$N(v)=-1$ なら整数トレース $0\le v-v^{-1}<1$ が0、従って $v=1$ ですが $N(1)=1$ と矛盾します。よって $u=\pm\varphi^n$ です。$\pm1,\varphi\in C_1^+$ なので $C_1^+=U_1^+$、指数は1です。

**第3問。** $a=3$ は奇数で5と互いに素なので、$\xi_{r,3}=\zeta_{5^r}^{-1}\eta_{r,3}\in U_r^+$。相対共役は $\zeta_{5^{r+1}}\mapsto\zeta_{5^{r+1}}\zeta_5^j$。$j\mapsto3j$ が法5の置換なので

$$
N_{F_{r+1}/F_r}(\xi_{r+1,3})
=\zeta_{5^r}^{-1}
\frac{1-\zeta_{5^r}^3}{1-\zeta_{5^r}}
=\xi_{r,3}.
$$

これは任意の $r$ に成り立ち、逆極限の全ての接続条件を満たします。

**第4問。** $\zeta_{25}^{5}=\zeta_5$ は $E_1$ にあるので、相対Galois群の5個の元で全て固定されます。従って

$$
N_{E_2/E_1}(1-\zeta_{25}^5)=(1-\zeta_5)^5
$$

です。第3問では $3$ が法5の単元であるため共役を置換できましたが、$5j\bmod5$ は全て0で、この置換が成り立ちません。$\eta_{2,5}$ は本講の円分単数の定義にも入らず、同じ分布式を主張できません。
<!-- solution-end -->

## 7. 到達点と次講

- $\alpha_r=1-\zeta_r$ の絶対ノルムは $p$ ですが、$p\nmid a$ なら比 $\eta_{r,a}$ は**整数環内に明示的逆元を持つ単数**です。
- 実部分体では $\xi_{r,a}$ を用います。$p=5$ の実単数群は $\{\pm\varphi^n\}$ と直接求まり、円分単数群との指数は1でした。一般の実単数群との指数公式は深い外部定理として区別しました。
- $N(\eta_{r+1,a})=\eta_{r,a}$ を共役の積から証明した結果、$C_r$ 間のノルムは全射で、明示的な逆極限の元が作れます。これは全単数群のノルムの全射性を保証しません。

次の **IWA11「局所／大域単数の完全列」**では、この $C_r\subseteq U_r$ を局所単数の群と比較し、類群へ至る正確な矢印・核・余核を調べます。

参考：Lawrence C. Washington, *Introduction to Cyclotomic Fields*, 2nd ed., 円分単数・類数公式の章；Romyar Sharifi, [*Iwasawa Theory*, Chapter 4](https://www.math.ucla.edu/~sharifi/notes/iwasawa-ch04.html)（1の冪根のノルム分布関係）；[円分単数と実類数の関係についての文献](https://doi.org/10.1007/s40993-022-00402-0)。