# ANF9 付値・局所化・完備化

[ANF3の素イデアル分解](../ANF3/index.md#thm-anf3-prime-ideal-factorization)は、一つの整数が各素イデアルで何回割れるかを表します。しかし整数や数体の元を、ある素数の冪で繰り返し割り切れるかという精度で近似したいとき、通常の絶対値では「近い」と認識できません。

例えば $1,1+5,1+5+5^2,\ldots$ という数列は実数として発散します。一方、後の項ほど前の項との差が高い $5$ の冪で割れるため、$5$ を基準とした距離では収束します。本講では「一つの素数だけを見る」局所化を、「無限の精度まで近づける」完備化へ進め、$\mathbb Q_p$ と $\mathbb Z_p$ を具体的に構成します。

## 1. 割り切れるほど小さい：$p$ 進付値

素数 $p$ を固定します。$0\ne x\in\mathbb Q$ は一意に $x=p^e a/b$（$e\in\mathbb Z$、$a,b$ は $p$ で割り切れない整数）と表せます。この指数 $e$ を取り出したいのです。$x=0$ の場合を区別するため、$\infty$ はどの整数よりも大きく、$\infty+m=\infty$ と約束します。

<a id="def-anf9-p-adic-valuation"></a>

<!-- formal-statement-start -->
> **定義（p進付値）**  
> 素数 $p$ と有理数 $x$ に対して、$x\ne0$ なら $x=p^e a/b$（$p\nmid a,b$）を満たす整数 $e$ を $v_p(x)$ とし、$v_p(0)=\infty$ と定める。
<!-- formal-statement-end -->

<!-- definition-example-start: def-anf9-p-adic-valuation -->
**定義の確認**　$98/45=7^2\cdot2/(3^2\cdot5)$ だから $v_7(98/45)=2$、$v_3(98/45)=-2$ です。分母に現れる素数は負の付値になります。$v_p(1)=0$、$v_p(p)=1$、$v_p(p^{-2})=-2$ も定義から直接従います。
<!-- definition-example-end -->

<a id="prop-anf9-valuation-rules"></a>

<!-- formal-statement-start -->
> **命題（付値の積と和）**  
> 素数 $p$ と任意の $x,y\in\mathbb Q$ について次が成り立つ。
>
> **（1）** $v_p(xy)=v_p(x)+v_p(y)$。
>
> **（2）** $v_p(x+y)\ge\min\{v_p(x),v_p(y)\}$。
>
> **（3）** $v_p(x)\ne v_p(y)$ なら $v_p(x+y)=\min\{v_p(x),v_p(y)\}$。
<!-- formal-statement-end -->

積では指数を足し、和では「低い方の桁が消えなければ残る」という仕組みです。

<!-- proof-start -->
### 証明

$x,y$ の一方が $0$ なら、$\infty$ の約束により必要な等式・不等式が成り立ちます。以下 $x,y\ne0$ とします。$x=p^r a/b$、$y=p^s c/d$（$p\nmid abcd$）と書くと

$$
xy=p^{r+s}\frac{ac}{bd}
$$

となるので（1）が従います。$r\le s$ として和を書くと

$$
x+y=p^r\frac{ad+p^{s-r}bc}{bd}.
$$

> 分子は整数で、したがって $v_p(x+y)\ge r$ です。$r<s$ なら分子は法 $p$ で $ad$ と合同であり、$p\nmid ad$ なので分子は $p$ で割れません。ゆえに $v_p(x+y)=r$ です。$s<r$ については $x,y$ を交換すればよく、（2）（3）を得ます。
<!-- proof-end -->

**等号が破れる例。** $v_3(1)=v_3(2)=0$ でも $v_3(1+2)=1$ です。同じ指数の先頭桁は打ち消し合うことがあります。

次に「大きな付値」を「小さな距離」へ読み替えます。

<a id="def-anf9-p-adic-absolute"></a>

<!-- formal-statement-start -->
> **定義（p進絶対値と距離）**  
> 素数 $p$ と有理数 $x$ に対し、$x\ne0$ なら $|x|_p=p^{-v_p(x)}$、$|0|_p=0$ とする。また $d_p(x,y)=|x-y|_p$ と定める。
<!-- formal-statement-end -->

<!-- definition-example-start: def-anf9-p-adic-absolute -->
**定義の確認**　$|25|_5=5^{-2}=1/25$、$|1/25|_5=25$、$|2/3|_5=1$ です。$d_5(1,26)=|25|_5=1/25$ なので、実数の距離では $25$ 離れた二数が $5$ 進距離では近くなります。
<!-- definition-example-end -->

<a id="prop-anf9-ultrametric"></a>

<!-- formal-statement-start -->
> **命題（非Archimedes三角不等式）**  
> 任意の $x,y\in\mathbb Q$ と素数 $p$ に対して、次の積・和の評価が成り立つ。

$
|xy|_p=|x|_p|y|_p.
$

$
|x+y|_p\le\max\{|x|_p,|y|_p\}.
$

> さらに $|x|_p\ne|y|_p$ なら後者は等号である。従って $d_p$ は距離である。
<!-- formal-statement-end -->

### 証明の見取り図

[付値の三性質](#prop-anf9-valuation-rules)で不等号を反転させる指数関数 $p^{-t}$ を取ります。右辺が最大値なので、二つの絶対値の和で抑える通常の距離公理も満たされます。

<!-- proof-start -->
### 証明

非零の $x,y$ について $v_p(xy)=v_p(x)+v_p(y)$ であることは [先ほどの命題](#prop-anf9-valuation-rules)で確かめました。従って $p^{-v_p(xy)}=p^{-v_p(x)}p^{-v_p(y)}$ です。零の場合にも成立します。同命題（2）から

$$
|x+y|_p=p^{-v_p(x+y)}
\le p^{-\min\{v_p(x),v_p(y)\}}
=\max\{|x|_p,|y|_p\}
$$

> を得ます。付値が異なれば（3）で等号になります。$d_p$ については $d_p(x,y)=0$ と $x=y$ が同値で、対称性は $|-z|_p=|z|_p$ によります。三角不等式は $x-z=(x-y)+(y-z)$ へ上記評価を用い、最大値が和以下であることから従います。
<!-- proof-end -->

例えば $p$ 進距離で中心 $a$・半径 $r$ の閉球に $x,y$ が入れば、$|x-y|_p\le\max(|x-a|_p,|y-a|_p)\le r$ です。普通の Euclid 距離とは異なる球の幾何が現れます。

## 2. 局所化：分母から $p$ 以外の制約を外す

[局所化の一般的な定義](../../AG/AG1-04/index.md#def-ag1-04-localization)では、乗法的集合に含まれる元を分母に許しました。ここではその集合を「$p$ で割り切れない整数全体」とします。

<a id="def-anf9-localized-integers"></a>

<!-- formal-statement-start -->
> **定義（素数pにおけるZの局所化）**  
> 素数 $p$ に対して
>
$$
\mathbb Z_{(p)}
=\left\{\frac ab\in\mathbb Q:a,b\in\mathbb Z,\ p\nmid b\right\}
$$
>
> を定める。分数表示は約分済みとは限らない。
<!-- formal-statement-end -->

<!-- definition-example-start: def-anf9-localized-integers -->
**定義の確認**　$\mathbb Z_{(5)}$ に $1/2$ と $25/6$ は入りますが、$1/5$ は入りません。実際 $1/5=a/b$ で $5\nmid b$ なら $b=5a$ という矛盾です。$1/2+25/6=28/6=14/3$ の分母も $5$ で割れないので、加法で閉じることをこの例でも確認できます。
<!-- definition-example-end -->

<a id="prop-anf9-local-ring"></a>

<!-- formal-statement-start -->
> **命題（局所化の単元と極大イデアル）**  
> 素数 $p$ に対し
>
$$
\mathbb Z_{(p)}=\{x\in\mathbb Q:v_p(x)\ge0\}
$$
>
> が成り立ち、$\mathbb Z_{(p)}$ の単元全体は $v_p(x)=0$ の元である。唯一の極大イデアルは $p\mathbb Z_{(p)}=\{x:v_p(x)\ge1\}$ で、剰余環は $\mathbb F_p=\mathbb Z/p\mathbb Z$ となる。
<!-- formal-statement-end -->

### 証明の見取り図

分数 $a/b$ の付値が非負なら、分母の $p$ 因子は分子の同数以上の因子で消せます。付値0の元だけが、逆数もこの環に残ります。

<!-- proof-start -->
### 証明

$x\ne0$ を $p^e a/b$（$p\nmid ab$）と表すと、$x\in\mathbb Z_{(p)}$ は $e\ge0$ と同値です。$x=0$ も両側に含まれます。[付値の積の公式](#prop-anf9-valuation-rules)より $v_p(x^{-1})=-v_p(x)$ なので、$x$ と逆数がともに環に属する条件は $v_p(x)=0$ です。

$$
p\mathbb Z_{(p)}=\{x\in\mathbb Z_{(p)}:v_p(x)\ge1\}
$$

> は、付値の和の不等式によりイデアルです。$v_p(a/b)\ge0$ の元を $a b^{-1}\bmod p$ に送れば、分母が法 $p$ で可逆なので環準同型が定まります。分数表示を変えても $ab'=a'b$ から剰余は一致し、核は $p\mathbb Z_{(p)}$、整数の定数像により全射です。従って商は体 $\mathbb F_p$ で、このイデアルは極大です。これ以外の元はすべて単元なので、どの真のイデアルもこの極大イデアルに含まれ、唯一性が従います。
<!-- proof-end -->

ここでは $p$ の倍数の判定だけを保持しました。しかし有理数の列の極限を新たに加えたわけではありません。この違いが次の完備化の出発点です。

## 3. Cauchy列から $\mathbb Q_p$ を作る

距離 $d_p$ のもとで、列 $(x_n)$ が **Cauchy列** であるとは、任意の $\varepsilon>0$ について、ある $N$ 以降のすべての $m,n\ge N$ で $|x_m-x_n|_p<\varepsilon$ となることです。**完備**とは、その距離の Cauchy列が必ず空間内の点に収束する性質を指します。これは既習の [Cauchy列の定義](../../../基礎科目/F0/F0-00D/index.md#def-f0-00d-01) と [完備距離空間の定義](../../../基礎科目/F0/F0-00D/index.md#def-f0-00d-02) を、今定めた $d_p$ に適用するものです。

有理数の Cauchy列同士を、差が $0$ に近づくときに同一視します。

<a id="def-anf9-completion"></a>

<!-- formal-statement-start -->
> **定義（p進数体のCauchy完備化）**  
> $\mathbb Q$ 上の $d_p$-Cauchy列全体を $C_p$ とする。$(x_n)\sim(y_n)$ を
>
$$
|x_n-y_n|_p\longrightarrow0
$$
>
> と定め、$\mathbb Q_p=C_p/{\sim}$ と置く。$x\in\mathbb Q$ は定数列 $(x,x,\ldots)$ の同値類とみなす。
<!-- formal-statement-end -->

<!-- definition-example-start: def-anf9-completion -->
**定義の確認**　$s_n=1+5+\cdots+5^n$ とすると $m>n$ に対して

$$
s_m-s_n=5^{n+1}(1+5+\cdots+5^{m-n-1}),
\qquad |s_m-s_n|_5=5^{-(n+1)}.
$$

> 従って $(s_n)$ はCauchy列です。また $s_n=(1-5^{n+1})/(1-5)$ なので

$$
\left|s_n+\frac14\right|_5=5^{-(n+1)}\to0.
$$

> この例の完備化での値は既に有理数 $-1/4$ でした。別の列では有理数で表せない新しい点も生まれます。
<!-- definition-example-end -->

<a id="thm-anf9-completion-field"></a>

<!-- formal-statement-start -->
> **定理（完備化は体となる）**  
> 素数 $p$ に対して $\mathbb Q_p$ 上に
>
$$
[(x_n)]+[(y_n)]=[(x_n+y_n)],\qquad
[(x_n)]\cdot[(y_n)]=[(x_ny_n)]
$$
>
> を定めると、これらは同値類の代表によらず定まり、$\mathbb Q_p$ は体となる。$|[(x_n)]|_p=\lim_n|x_n|_p$ は非Archimedes絶対値となり、$\mathbb Q_p$ は完備である。$\mathbb Q\hookrightarrow\mathbb Q_p$ は絶対値を保つ稠密な体の埋め込みである。
<!-- formal-statement-end -->

### 証明の見取り図

Cauchy列の絶対値は有界です。この有界性で積の差を抑えれば演算が同値類に依存しません。零でない同値類の代表は、十分後ろで絶対値が一定の正の値になり、逆数列を作れます。完備性は「Cauchy列のCauchy列」から対角線上に近似を選ぶことで示します。

<!-- proof-start -->
### 証明

**（1）同値関係と演算。** [強三角不等式](#prop-anf9-ultrametric)により $\sim$ は反射的・対称的で、$|x_n-z_n|_p\le\max(|x_n-y_n|_p,|y_n-z_n|_p)$ から推移的です。Cauchy列 $(x_n)$ の絶対値は有界です。実際、ある $N$ 以降は $|x_n-x_N|_p<1$ なので $|x_n|_p\le\max(1,|x_N|_p)$、前方には有限個しか項がありません。

$(x_n)$ と $(y_n)$ が Cauchy なら、和がCauchy列になることは [非Archimedes三角不等式](#prop-anf9-ultrametric)の最大値評価を二つの差へ適用して確認できます。積については

$$
|x_ny_n-x_my_m|_p
\le\max\{|x_n|_p|y_n-y_m|_p,\,
|y_m|_p|x_n-x_m|_p\}\to0
$$

> です。有界性と同じ評価を $x_n-x'_n$、$y_n-y'_n$ に用いると、同値な代表から得た和・積も同値です。体の演算の結合法則・分配法則は有理数の各項で成立するので同値類でも成立します。

**（2）逆元。** 零同値類とは $|x_n|_p\to0$ となる類です。それ以外の Cauchy列 $(x_n)$ について、$|x_n|_p$ はある時点以降同じ正の値 $c$ になります。理由を確認します。零へ収束しないためある $\delta>0$ について $|x_N|_p>\delta$ となる後方の項を取れます。Cauchy条件でその後の $|x_m-x_N|_p<\delta$ を保証すると、[異なる絶対値のときの等号](#prop-anf9-ultrametric)から $|x_m|_p=|x_N|_p=c$ です。さらに後方の項についても同じです。

有限個の前方の項を $1$ に取り替えて $x_n\ne0$ としてよいです。十分大きな $m,n$ について

$$
\left|\frac1{x_n}-\frac1{x_m}\right|_p
=\frac{|x_m-x_n|_p}{|x_m|_p|x_n|_p}
=c^{-2}|x_m-x_n|_p\to0.
$$

> 従って $(1/x_n)$ は Cauchy列で、元の類との積は $1$ です。

**（3）絶対値。** [強三角不等式](#prop-anf9-ultrametric)から

$$
\bigl||x_n|_p-|y_n|_p\bigr|
\le |x_n-y_n|_p
$$

> （外側は通常の実絶対値）が成り立つので、絶対値の極限は存在し代表によらず一致します。積・和の絶対値性質は有理数上の性質を極限へ移せば得られます。零同値類との同値性は既に確かめました。定数列の写像は単射かつ等長です。

**（4）完備性。** $\mathbb Q_p$ の Cauchy列 $(X_k)$ を取り、稠密性の候補である有理数 $q_k$ を $|X_k-q_k|_p<p^{-k}$ となるよう選びます。これは $X_k$ の代表 Cauchy列の後方の一項を選べば実現できます。強三角不等式から

$$
|q_k-q_l|_p
\le\max\{|q_k-X_k|_p,|X_k-X_l|_p,|X_l-q_l|_p\}\to0
$$

> となり、$(q_k)$ は有理数のCauchy列です。その類 $Q=[(q_k)]$ に対して $|Q-q_k|_p\to0$ です。さらに $|X_k-Q|_p\le\max(|X_k-q_k|_p,|q_k-Q|_p)\to0$ なので $X_k\to Q$ です。代表の有理数列が任意の類を近似することから稠密性も確定します。
<!-- proof-end -->

## 4. $\mathbb Z_p$ と互換な剰余列

$\mathbb Q_p$ のうち絶対値が $1$ 以下の元を集めます。これは通常の整数環に相当する部分です。

<a id="def-anf9-p-adic-integers"></a>

<!-- formal-statement-start -->
> **定義（p進整数環）**  
> 素数 $p$ に対し
>
$$
\mathbb Z_p=\{x\in\mathbb Q_p:|x|_p\le1\}
$$
>
> と定める。
<!-- formal-statement-end -->

<!-- definition-example-start: def-anf9-p-adic-integers -->
**定義の確認**　$5/6\in\mathbb Z_5$ であり、$|5/6|_5=1/5$ です。一方 $1/5\notin\mathbb Z_5$ です。強三角不等式で $|x+y|_5\le1$、乗法性で $|xy|_5\le1$ なので和と積について閉じた環であることも確かめられます。
<!-- definition-example-end -->

$\mathbb Z_{(p)}$ は $\mathbb Z_p$ の稠密な部分環です。実際、$x\in\mathbb Z_p$ を有理数 $q_n$ で $|q_n-x|_p<p^{-n}$ と近似すれば、$n\ge1$ のとき $|q_n|_p\le\max(|x|_p,p^{-n})\le1$ なので [局所化の判定](#prop-anf9-local-ring)により $q_n\in\mathbb Z_{(p)}$ です。

剰余環 $\mathbb Z/p^n\mathbb Z$ は、「$p^n$ を法としてどこまで桁を知っているか」を表します。桁数が増えても以前の桁と矛盾しないように列を作ります。

<a id="def-anf9-inverse-limit"></a>

<!-- formal-statement-start -->
> **定義（互換な剰余列・逆極限）**  
> 素数 $p$ について
>
$$
R_p=\varprojlim_n\mathbb Z/p^n\mathbb Z
=\{(a_n)_{n\ge1}:a_n\in\mathbb Z/p^n\mathbb Z,\,
a_{n+1}\equiv a_n\pmod{p^n}\}
$$
>
> を定める。和・積は各成分の剰余環で計算する。これを剰余環の逆極限と呼ぶ。
<!-- formal-statement-end -->

<!-- definition-example-start: def-anf9-inverse-limit -->
**定義の確認**　$p=5$、整数 $17$ に対応する列の初めの三項は $(2\bmod5,17\bmod25,17\bmod125)$ です。$17\bmod25$ をさらに $5$ で割った余りは $2$、$17\bmod125$ を $25$ で割った余りは $17$ なので互換条件を満たします。任意の整数 $m$ の列 $(m\bmod p^n)_n$ も同様です。
<!-- definition-example-end -->

<a id="lem-anf9-localized-quotients"></a>

<!-- formal-statement-start -->
> **補題（局所化と有限剰余環）**  
> 素数 $p$ と $n\ge1$ に対し、剰余を取る写像は環同型
>
$$
\mathbb Z_{(p)}/p^n\mathbb Z_{(p)}
\ \cong\ \mathbb Z/p^n\mathbb Z
$$
>
> を与える。
<!-- formal-statement-end -->

<!-- proof-start -->
### 証明

$a/b\in\mathbb Z_{(p)}$ に対し、$p\nmid b$ なので $b$ は法 $p^n$ で逆元を持ちます。写像 $\rho_n(a/b)=a b^{-1}\bmod p^n$ を定めます。$a/b=a'/b'$ なら $ab'=a'b$ なので、法 $p^n$ の逆数を掛けて同じ剰余を得ます。これは和と積を保ち、整数 $0,1,\ldots,p^n-1$ が全ての剰余を与えるので全射です。

$$
\rho_n(a/b)=0\ \Longleftrightarrow\
a\equiv0\pmod{p^n}
\ \Longleftrightarrow\
a/b\in p^n\mathbb Z_{(p)}.
$$

> この核を取った商が示した環に同型です。
<!-- proof-end -->

<a id="thm-anf9-inverse-limit-isomorphism"></a>

<!-- formal-statement-start -->
> **定理（Z_pと逆極限の同定）**  
> 任意の素数 $p$ について、$\mathbb Z_{(p)}$ の $p$ 進距離による完備化は $\mathbb Z_p$ であり、自然な環同型
>
$$
\boxed{\mathbb Z_p\ \cong\ \varprojlim_{n\ge1}\mathbb Z/p^n\mathbb Z}
$$
>
> がある。この同型のもとで整数 $m$ は $(m\bmod p^n)_{n\ge1}$ に写る。
<!-- formal-statement-end -->

### 証明の見取り図

Cauchy列では高い冪 $p^n$ の精度で剰余が安定します。逆に互換な剰余列の第 $n$ 項を整数 $z_n$ で代表させると、$z_{n+1}-z_n$ は $p^n$ の倍数だから Cauchy列になります。この二方向を合成して恒等写像となることを確認します。

<!-- proof-start -->
### 証明

**（1）完備化の対象。** $\mathbb Z_p$ は $\mathbb Q_p$ の閉部分集合です。実際 $x_j\in\mathbb Z_p$、$x_j\to x$ なら、強三角不等式より $|x|_p\le\max(|x-x_j|_p,1)\le1$ が十分大きな $j$ で成り立ちます。[完備性定理](#thm-anf9-completion-field)から $\mathbb Z_p$ は完備です。直前に示した $\mathbb Z_{(p)}$ の稠密性によりその完備化になります。

**（2）安定する剰余。** $x\in\mathbb Z_p$ の近似 $q_k\in\mathbb Z_{(p)}$ を取ります。$q_k\to x$ なので固定した $n$ について十分大きな $k,l$ では $|q_k-q_l|_p\le p^{-n}$ です。[剰余環の補題](#lem-anf9-localized-quotients)により $\rho_n(q_k)=\rho_n(q_l)$。これを $a_n$ とすれば近似列の選択に依存せず、$a_{n+1}\bmod p^n=a_n$ です。和・積を成分ごとに保つ写像 $\Phi:\mathbb Z_p\to R_p$ を得ます。

**（3）単射。** $\Phi(x)=0$ なら、全ての $n$ で $x$ は $p^n$ の精度で零に近づき、$|x|_p\le p^{-n}$ です。$n\to\infty$ で $|x|_p=0$、従って $x=0$ です。

**（4）全射。** 任意の互換列 $(a_n)\in R_p$ を取り、$0\le z_n<p^n$ を満たす整数代表を選びます。$m>n$ なら互換条件を繰り返して $z_m\equiv z_n\pmod{p^n}$、従って

$$
|z_m-z_n|_p\le p^{-n}.
$$

> この整数列は Cauchy で、$\mathbb Z_p$ の元 $x$ に収束します。各 $n$ で $\rho_n(z_m)=a_n$（$m\ge n$）なので $\Phi(x)=(a_n)$ です。よって $\Phi$ は環同型で、定数整数列の像は記した剰余列です。
<!-- proof-end -->

**何が同じになったか。** 「距離による無限精度の極限」と「各有限桁の答えを矛盾なく並べる操作」が同じ環を生みました。この対応は後に局所体で根を持ち上げる際の土台になります。

## 5. $p$ 進展開と環の構造

各剰余 $a_n$ を $0\le z_n<p^n$ で表すと、互換条件から $z_{n+1}=z_n+d_np^n$（$d_n\in\{0,\ldots,p-1\}$）となります。最初の $z_1$ を $d_0$ と書くと、順次各桁が決まります。

<a id="thm-anf9-digit-expansion"></a>

<!-- formal-statement-start -->
> **定理（p進整数の桁展開）**  
> 任意の $x\in\mathbb Z_p$ は、ただ一通り
>
$$
x=\sum_{j=0}^{\infty}d_jp^j,\qquad
d_j\in\{0,1,\ldots,p-1\}
$$
>
> と表せる。右辺は $p$ 進距離で収束する級数である。$x\ne0$ のとき $v_p(x)$ は最初の非零桁の番号となる。
<!-- formal-statement-end -->

### 証明の見取り図

[逆極限の同定](#thm-anf9-inverse-limit-isomorphism)によって、最初の $n$ 桁は法 $p^n$ の剰余と同じです。桁が一つ違えば、その最初の違いは法 $p^{j+1}$ で検出できます。

<!-- proof-start -->
### 証明

逆極限に対応する整数代表 $z_n$ を取ります。$z_1=d_0$ とし、互換性から $z_{n+1}-z_n$ は $p^n$ の倍数、かつ $0\le z_{n+1}<p^{n+1}$、$0\le z_n<p^n$ なので $z_{n+1}=z_n+d_np^n$ を満たす唯一の $d_n\in\{0,\ldots,p-1\}$ が存在します。帰納法で

$$
z_n=d_0+d_1p+\cdots+d_{n-1}p^{n-1}.
$$

> $m>n$ では尾部が $p^n$ で割れるので部分和はCauchy列です。[逆極限の全射構成](#thm-anf9-inverse-limit-isomorphism)でその極限は元の $x$ です。もし二つの桁列が初めて $j$ 番目で異なれば、二つの数の差は $p^j(d_j-e_j)$ に $p^{j+1}$ の倍数を加えた形です。$d_j-e_j$ は $p$ の倍数でないので、差の付値は $j$ となり、同じ $x$ を表せません。最初の非零桁に同じ議論を適用すれば最後の主張が従います。
<!-- proof-end -->

**無限桁の例。** $-1$ の法 $p^n$ の代表は $p^n-1$ です。よって

$$
-1=(p-1)+(p-1)p+(p-1)p^2+\cdots
$$

> と表せます。$p=5$ では $1/3$ の法 $5,25,125$ の代表はそれぞれ $2,17,42$ です。$3\cdot2\equiv1\pmod5$、$3\cdot17=51\equiv1\pmod{25}$、$3\cdot42=126\equiv1\pmod{125}$ より、最初の3桁は $2+3\cdot5+1\cdot25$ になります。

<a id="prop-anf9-dvr-structure"></a>

<!-- formal-statement-start -->
> **命題（Z_pの単元とイデアル）**  
> 任意の素数 $p$ に対し、$\mathbb Z_p$ の単元は $|x|_p=1$ の元（同値に最初の桁 $d_0\ne0$）であり、零でない任意の元は一意の $k\ge0$ に対して $x=p^ku$（$u$ は単元）と書ける。全ての非零イデアルは $(p^k)$（$k\ge0$）で、唯一の極大イデアルは $p\mathbb Z_p$、剰余体は $\mathbb F_p$ である。
<!-- formal-statement-end -->

### 証明の見取り図

絶対値の値が $p^{-\mathbb Z}$ に限られることは、[Cauchy完備化の構成](#thm-anf9-completion-field)で非零類の絶対値が十分後ろで一定になることから従います。その離散性により、イデアルの中の付値の最小値を実際に取れます。

<!-- proof-start -->
### 証明

非零 $x\in\mathbb Q_p$ は [完備化の定理](#thm-anf9-completion-field)の逆元の証明で、近似有理数列の絶対値が最終的にある $p^{-k}$（$k\in\mathbb Z$）に一致します。したがって $x\in\mathbb Z_p$ なら $k\ge0$、$u=p^{-k}x$ は $|u|_p=1$ です。その逆元も $|u^{-1}|_p=1$ なので $u$ は $\mathbb Z_p$ の単元です。逆に $x$ と $x^{-1}$ がともに $\mathbb Z_p$ に属すれば、$1=|x|_p|x^{-1}|_p$ と双方が1以下であることから $|x|_p=1$ です。

非零イデアル $I\subseteq\mathbb Z_p$ の非零元の付値の集合は $\mathbb Z_{\ge0}$ の非空部分集合なので最小元 $k$ を持ちます。$x=p^ku\in I$ を選ぶと単元 $u^{-1}$ を掛けて $p^k\in I$、従って $(p^k)\subseteq I$。一方 $y\in I$ は零または $v_p(y)\ge k$ なので $y\in(p^k)$。これで $I=(p^k)$ です。

最後に $\mathbb Z_p\cong R_p$ の第1成分への射影は $\mathbb Z/p\mathbb Z$ への全射環準同型であり、核は付値が1以上の元、すなわち $(p)$ です。単元以外はすべてこの核に入るため $(p)$ が唯一の極大イデアルです。
<!-- proof-end -->

## 6. 数体の素イデアルへ広げる

$\mathbb Q$ だけでなく数体 $K$ の素イデアル $\mathfrak p\subsetneq\mathcal O_K$ を固定しましょう。[ANF3の局所単項性](../ANF3/index.md#lem-anf3-local-principal)により、局所環 $\mathcal O_{K,\mathfrak p}$ の非零元は一様化元 $\pi$ の整数冪と単元の積で表せます。そこで、その冪指数を局所的な物差しとして使います。

<a id="def-anf9-prime-valuation"></a>

<!-- formal-statement-start -->
> **定義（数体の素イデアル付値と局所完備化）**  
> $K/\mathbb Q$ を数体、$\mathfrak p\ne(0)$ を $\mathcal O_K$ の素イデアルとする。局所環 $R=\mathcal O_{K,\mathfrak p}$ の極大イデアルを $\pi R$ とする。
>
> $x\in K^\times$ の一意な表示 $x=\pi^e u$（$e\in\mathbb Z$、$u\in R^\times$）に対し、付値を次で定める。

$
v_{\mathfrak p}(x)=e,\qquad v_{\mathfrak p}(0)=\infty.
$

> $q=|\mathcal O_K/\mathfrak p|$ と置き、次の絶対値を定める。

$
|x|_{\mathfrak p}=q^{-v_{\mathfrak p}(x)}\quad(x\ne0),
\qquad |0|_{\mathfrak p}=0.
$

> この絶対値に付随する距離による $K$ のCauchy完備化を $K_{\mathfrak p}$ と書く。
<!-- formal-statement-end -->

<!-- definition-example-start: def-anf9-prime-valuation -->
**定義の確認**　$K=\mathbb Q(i)$、$\mathfrak p=(2+i)\subset\mathbb Z[i]$ とします。$\mathbb Z[i]/(2+i)\cong\mathbb F_5$ です（$i\mapsto-2$ を代入すると $(-2)^2+1\equiv0\pmod5$、核はノルム5のイデアル）。$\pi=2+i$ は局所環の極大イデアルを生成します。また

$$
5=(2+i)(2-i),\qquad
2-i\equiv2-(-2)=4\not\equiv0\pmod{\mathfrak p}.
$$

> 従って後者は局所環で単元であり、$v_{\mathfrak p}(5)=1$、$|5|_{\mathfrak p}=1/5$ です。ここでは数体の素イデアルを一つ選んで初めて付値が決まりました。
<!-- definition-example-end -->

<a id="prop-anf9-number-field-completion"></a>

<!-- formal-statement-start -->
> **命題（局所体へ向かう基本構造）**  
> 上の $K,\mathfrak p,R,q$ に対し、$v_{\mathfrak p}$ は積について加法的で、和に対して最小値以上となる。$K_{\mathfrak p}$ は完備な非Archimedes付値体であり、その整数環
>
$$
\mathcal O_{K_{\mathfrak p}}
=\{x\in K_{\mathfrak p}:|x|_{\mathfrak p}\le1\}
$$
>
> は $R$ の完備化に一致する。また任意の $n\ge1$ について
>
$$
\mathcal O_{K_{\mathfrak p}}/\pi^n\mathcal O_{K_{\mathfrak p}}
\cong R/\pi^nR\cong\mathcal O_K/\mathfrak p^n
$$
>
> である。
<!-- formal-statement-end -->

### 証明の見取り図

数体の場合も [局所単項性](../ANF3/index.md#lem-anf3-local-principal)が指数を一意にし、[有理数の完備化の構成](#thm-anf9-completion-field)を $q$ と $\pi$ に置き換えて繰り返せます。剰余環では $\mathfrak p$ の外の分母が可逆なので、局所化しても有限桁は変わりません。

<!-- proof-start -->
### 証明

[ANF3の局所単項性](../ANF3/index.md#lem-anf3-local-principal)から $R$ の非零元は $\pi^k$ と単元の積です。$K=\operatorname{Frac}(R)$ なので任意の非零元は $\pi^e u$（$e\in\mathbb Z$）であり、指数は一意です。二元の積では指数が加わります。$x=\pi^ru,y=\pi^sv$ に $r\le s$ を仮定すれば

$$
x+y=\pi^r(u+\pi^{s-r}v),
$$

> その括弧内は $R$ に属すので和の付値は $r$ 以上です。$r<s$ なら括弧は法 $\pi R$ で単元 $u$ に一致するため付値はちょうど $r$ です。これで非Archimedes絶対値の公理が得られます。

完備化の同値関係、積、逆元、完備性については [本講のCauchy列による体の構成](#thm-anf9-completion-field)の各証明において「$p$ を $\pi$、$p^{-1}$ を $q^{-1}$」に取り替えます。必要な事実は、値が離散集合 $q^{\mathbb Z}$ に属し、強三角不等式と乗法性を満たすことだけであり、すべて今証明しました。整数環が $R$ の完備化になることも、任意の $x$ の近似 $r_n\in K$ が十分高精度なら $|r_n|_{\mathfrak p}\le1$ となるという第4節と同じ不等式で従います。

最後に $A=\mathcal O_K$ と置きます。$A/\mathfrak p^n$ の素イデアルは $\mathfrak p/\mathfrak p^n$ だけです。実際、$\mathfrak p^n$ を含む素イデアルは $\mathfrak p$ を含み、[Dedekind環の素イデアルの極大性](../ANF3/index.md#def-anf3-dedekind-domain)から $\mathfrak p$ に等しくなります。従って $s\notin\mathfrak p$ の像は商環で単元となり、局所化しても $A/\mathfrak p^n$ は変わりません。さらに $\mathfrak p R=\pi R$ なので $\mathfrak p^n R=\pi^nR$ です。完備化後の剰余同型は [逆極限の同定の証明](#thm-anf9-inverse-limit-isomorphism)の「剰余が安定する・整数代表を選ぶ」操作を有限剰余環 $R/\pi^nR$ について実施して得られます。逆向きの近似では各剰余の代表を $R$ から選び、差が $\pi^n$ で割れるのでCauchyとなります。
<!-- proof-end -->

この構成により、次講の Hensel の補題では「法 $\mathfrak p^n$ で解ける方程式を、高い精度へ持ち上げる」ことを厳密に表現できます。

## 7. 演習：付値から無限桁まで

### A1. 分子と分母の付値

$x=98/45$ とする。$v_7(x)$、$v_3(x)$、$|x|_7$、$|x|_3$ を求めよ。

- Level: A
- ID: ANF9-A1

<!-- solution-start -->
**詳細解答**　$98=2\cdot7^2$、$45=3^2\cdot5$ です。[付値の定義](#def-anf9-p-adic-valuation)で素数をそれぞれ数えると

$$
v_7(x)=2,\qquad v_3(x)=-2.
$$

> [絶対値の定義](#def-anf9-p-adic-absolute)に代入し、$|x|_7=7^{-2}=1/49$、$|x|_3=3^2=9$ となります。
<!-- solution-end -->

### A2. 和で付値が上がる場合

$v_3(1)$、$v_3(2)$、$v_3(1+2)$ を求め、和の評価で等号が破れる理由を説明せよ。

- Level: A
- ID: ANF9-A2

<!-- solution-start -->
**詳細解答**　$3$ は $1,2$ を割らないので両方の付値は $0$ です。一方 $1+2=3$ なので $v_3(3)=1$ です。[付値の和の命題](#prop-anf9-valuation-rules)は $v_3(3)\ge\min(0,0)$ のみ保証します。$1$ と $2$ の法 $3$ の像を加えると $1+2\equiv0$ となり、先頭の桁が消えるため厳密な不等号になります。
<!-- solution-end -->

### A3. 局所環の元と単元

$\mathbb Z_{(5)}$ の元 $1/2,5/6,6/5$ を調べ、入る元について単元か否かを判定せよ。

- Level: A
- ID: ANF9-A3

<!-- solution-start -->
**詳細解答**　[局所化の判定](#prop-anf9-local-ring)を使います。$v_5(1/2)=0$ なので $1/2\in\mathbb Z_{(5)}^\times$ です。$v_5(5/6)=1$ なので $5/6$ は局所環に入りますが、逆数 $6/5$ の付値が $-1$ であるため単元ではありません。$6/5$ 自身は付値 $-1$ なので局所環に属しません。
<!-- solution-end -->

### A4. 幾何級数の $5$ 進極限

$s_n=\sum_{j=0}^{n}5^j$ のCauchy性と $\mathbb Q_5$ での極限を示せ。

- Level: A
- ID: ANF9-A4

<!-- solution-start -->
**詳細解答**　$m>n$ なら $s_m-s_n=5^{n+1}(1+\cdots+5^{m-n-1})$ です。括弧は法 $5$ で $1$ に等しいので付値 $0$ です。従って $|s_m-s_n|_5=5^{-(n+1)}\to0$、Cauchy条件を満たします。各項を5倍して元の和から引いた等式

$$
(1-5)s_n=1-5^{n+1}
$$

> により $s_n+1/4=5^{n+1}/4$ です。分母 $4$ の $5$ 進絶対値は $1$ なので差は $5^{-(n+1)}$ となり、$\lim_ns_n=-1/4$ です。
<!-- solution-end -->

### A5. $1/3$ の最初の三桁

$\mathbb Z_5$ の元 $1/3$ の法 $5$、$25$、$125$ の剰余代表を求め、最初の三つの $5$ 進桁を示せ。

- Level: A
- ID: ANF9-A5

<!-- solution-start -->
**詳細解答**　分母 $3$ は $5$ と互いに素なので [有限剰余環への写像](#lem-anf9-localized-quotients)で逆数が取れます。$3\cdot2=6\equiv1\pmod5$、$3\cdot17=51\equiv1\pmod{25}$、$3\cdot42=126\equiv1\pmod{125}$ です。従って代表は順に $2,17,42$ です。$17=2+3\cdot5$、$42=17+1\cdot25$ だから [桁展開定理](#thm-anf9-digit-expansion)で $d_0=2,d_1=3,d_2=1$ です。
<!-- solution-end -->

### B1. 付値が異なる和

素数 $p$、$x,y\in\mathbb Q^\times$ とし、$v_p(x)<v_p(y)$ と仮定する。$v_p(x+y)=v_p(x)$ を、$\mathbb Z_{(p)}$ の単元を用いて証明せよ。

- Level: B
- ID: ANF9-B1

<!-- solution-start -->
**詳細解答**　$r=v_p(x)$、$s=v_p(y)$ と置くと $r<s$ です。[局所環の単元判定](#prop-anf9-local-ring)により $u=p^{-r}x$ と $w=p^{-s}y$ はともに局所環の単元です。従って

$$
x+y=p^r(u+p^{s-r}w).
$$

> $s-r\ge1$ なので第2項は局所環の極大イデアル $p\mathbb Z_{(p)}$ に入ります。括弧の法 $p$ の像は単元 $u$ の非零な像と等しく、括弧は単元です。よって括弧の付値は $0$、全体の付値は $r$ です。仮定 $r<s$ が無いと括弧の法 $p$ の像が消え得ることも、この論証で分かります。
<!-- solution-end -->

### B2. 局所化だけでは極限を含まない

$p=5$ とし $t_n=\sum_{k=1}^n5^{k!}$ と置く。この列が $5$ 進Cauchyであることを示せ。さらにその極限 $t\in\mathbb Z_5$ は有理数でないことを示せ（ヒント：$5$ と互いに素な分母を持つ有理数の $5$ 進桁列は、ある位置以降周期的になる）。

- Level: B
- ID: ANF9-B2

<!-- solution-start -->
**詳細解答**　$m>n$ なら $t_m-t_n$ の全ての項は $5^{(n+1)!}$ の倍数なので

$$
|t_m-t_n|_5\le5^{-(n+1)!}\longrightarrow0.
$$

> 従って [完備化の定理](#thm-anf9-completion-field)から極限 $t$ が存在します。その桁は $j=k!$（$k\ge1$）の位置で $1$、他では $0$ です。階乗位置は増加し、隣り合う $k!$ の差は $(k+1)!-k!=k\,k!\to\infty$ です。

> ヒントの周期性も導きます。仮に $t=a/b\in\mathbb Q$（$a,b\in\mathbb Z$、$5\nmid b$）なら、$t$ の下位 $n$ 桁の整数を $A_n=\sum_{j=0}^{n-1}d_j5^j$ と書けます。$a-bA_n$ は $5^n$ で割れるので整数

$$
h_n=\frac{a-bA_n}{5^n}
$$

> を置けます。$0\le A_n<5^n$ なので $|h_n|\le |a|+|b|$（ここでは普通の絶対値）です。また $A_{n+1}=A_n+d_n5^n$ から

$$
h_{n+1}=\frac{h_n-bd_n}{5}.
$$

> $d_n$ は $h_n-bd_n\equiv0\pmod5$ を満たす $0,\ldots,4$ の唯一の値です（$5\nmid b$）。従って次状態と桁は整数 $h_n$ だけで決まります。状態は有限集合に入るため、いつか同じ状態が再出現し、それ以降の桁は周期的です。しかし階乗桁列は $1$ が無限回現れる一方、その間の $0$ の連続長が無制限に増え、最終的に周期的にはなり得ません。矛盾です。従って $t$ は有理数ではなく、とくに $\mathbb Z_{(5)}$ は完備ではありません。
<!-- solution-end -->

### B3. 剰余列から極限へ

$p=3$、$a_n\in\mathbb Z/3^n\mathbb Z$ を $a_n\equiv-1\pmod{3^n}$ で定める。互換性を確かめ、代表 $z_n=3^n-1$ がCauchy列になること、その極限を求めよ。

- Level: B
- ID: ANF9-B3

<!-- solution-start -->
**詳細解答**　$3^{n+1}-1\equiv-1\equiv3^n-1\pmod{3^n}$ なので互換性があります。$m>n$ なら $z_m-z_n=3^m-3^n=3^n(3^{m-n}-1)$ で、括弧は法 $3$ で $-1$ に等しいため

$$
|z_m-z_n|_3=3^{-n}.
$$

> これが $n\to\infty$ で $0$ になるのでCauchy列です。$z_n-(-1)=3^n$ であり $|3^n|_3=3^{-n}\to0$。従って極限は $-1$ です。これは [逆極限の同定](#thm-anf9-inverse-limit-isomorphism)で整数 $-1$ が剰余列 $(a_n)$ に対応することの直接検算です。
<!-- solution-end -->

### B4. 数体の一つの素点だけを見る

$K=\mathbb Q(i)$、$A=\mathbb Z[i]$、$\mathfrak p=(2+i)$ とする。$A/\mathfrak p$ の元の個数、$v_{\mathfrak p}(5)$、$v_{\mathfrak p}(2-i)$、$|5/(2-i)|_{\mathfrak p}$ を求めよ。

- Level: B
- ID: ANF9-B4

<!-- solution-start -->
**詳細解答**　$i\mapsto-2$ を代入する環準同型 $A\to\mathbb F_5$ の核は $(2+i)$ です。実際 $2+i$ は核に入り、$A/(2+i)$ の加法群の位数は [ANF4のイデアルノルム](../ANF4/index.md#def-anf4-ideal-norm)で $|N_{\mathbb Q(i)/\mathbb Q}(2+i)|=5$ なので、全射の核はこれ以上大きくなりません。従って $q=5$ です。$5=(2+i)(2-i)$、$2-i\mapsto4\ne0$ なので後者は局所環の単元です。[数体の素イデアル付値](#def-anf9-prime-valuation)により

$$
v_{\mathfrak p}(5)=1,\quad
v_{\mathfrak p}(2-i)=0,\quad
v_{\mathfrak p}\!\left(\frac5{2-i}\right)=1.
$$

> よって $|5/(2-i)|_{\mathfrak p}=5^{-1}=1/5$ です。普通の有理素数 $5$ に対して、選んだ素イデアルがその片方の因子だけを測っていることが分かります。
<!-- solution-end -->

### C1. 無限桁・剰余・単元をつなぐ

$\mathbb Z_3$ で $u=\sum_{k=0}^{\infty}3^{2k}$ と定める。次を示せ。

1. 級数が収束し $u=-1/8$ となる。
2. $u$ の法 $3$、$9$、$27$ の代表を求め、互換性を確認する。
3. $u$ が $\mathbb Z_3$ の単元であり、その逆元を剰余列の積によっても確認する。

- Level: C
- ID: ANF9-C1

<!-- solution-start -->
**詳細解答**　まず部分和を $u_N=\sum_{k=0}^{N}9^k$ と置きます。$m>N$ のとき尾部の最初の項は $3^{2N+2}$ で、残る括弧は法 $3$ で $1$ なので

$$
|u_m-u_N|_3=3^{-2N-2}\longrightarrow0.
$$

> [Cauchy完備化](#thm-anf9-completion-field)で極限が存在します。部分和 $u_N=1+9+\cdots+9^N$ を $9$ 倍した式を元の式から引くと $(1-9)u_N=1-9^{N+1}$ となるので、この関係を使い、$|9^{N+1}|_3=3^{-2N-2}\to0$ だから $(1-9)u=1$ です。$1-9=-8$ は非零なので $u=-1/8$ です。

> 次に $u$ の剰余を調べます。法 $3$ では $u\equiv1$、法 $9$ でも $u\equiv1$ です。法 $27$ では $9^2=81$ 以降の項が消えるので $u\equiv1+9=10$ です。従って代表は $1,1,10$ です。$10\equiv1\pmod9$、$1\equiv1\pmod3$ なので互換性があります。この剰余列は [逆極限の同定](#thm-anf9-inverse-limit-isomorphism)により元 $u$ を一意に定めます。

> 最後に最初の桁が $1\ne0$ なので、[単元判定](#prop-anf9-dvr-structure)により $u$ は単元です。その逆元候補は $-8$ で、$u(-8)=1$ は上の等比級数から従います。剰余ごとにも

$$
(-8)\cdot1\equiv1\pmod3,\qquad
(-8)\cdot1\equiv1\pmod9,\qquad
(-8)\cdot10=-80\equiv1\pmod{27}
$$

> です（$-81$ が $27$ の倍数）。つまり完備化の等式と有限桁の逆元計算が同じ結論を与えました。
<!-- solution-end -->

---

**次講への接続。** ここで $\mathbb Z_p$ は完備な局所環として構成され、法 $p^n$ の答えを無限精度へまとめる方法が確立しました。ANF10では多項式の根について、法 $p$ の近似解を条件付きで法 $p^2,p^3,\ldots$ へ持ち上げる Hensel の補題を証明します。
