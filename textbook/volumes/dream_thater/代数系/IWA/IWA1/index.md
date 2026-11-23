# IWA1 p進数から無限拡大へ：なぜ塔を作るか

[ANF9の逆極限表示](../../ANF/ANF9/index.md#thm-anf9-inverse-limit-isomorphism)では、互換な剰余類を並べると一つの $p$ 進整数になることを学びました。[ANF22の円分的 $\mathbb Z_p$ 塔](../../ANF/ANF22/index.md#thm-anf22-cyclotomic-zp-tower)では、次数 $1,p,p^2,\ldots$ のGalois拡大が実際に現れました。しかし、有限次数の拡大をただ集めただけでは、どんな無限群ができるかは決まりません。**制限写像の両立性**まで見れば、有限層と無限層を正確に往復できます。

本講の問いは、なぜ一つの数体の類群を見る代わりに、無限塔に沿って類群を比較するのか、ということです。その準備として、まず塔の全体を決める群、各有限層を決める部分群、両者をつなぐ写像を手で構成します。類群の逆極限や岩澤代数は後の講義で導入します。

以下 $p$ は固定した素数、$K$ は数体です。$\mathbb Z_p$ は **加法群**として扱い、$p^n\mathbb Z_p=\{p^nx:x\in\mathbb Z_p\}$ と書きます。群の乗法記法を使うGalois群とは、位相群同型によって対応させます。

## 1. 何が無限塔の「層」になるか

[既習の $p$ 進整数の定義](../../ANF/ANF9/index.md#def-anf9-p-adic-integers)と[逆極限同型](../../ANF/ANF9/index.md#thm-anf9-inverse-limit-isomorphism)により、元 $x\in\mathbb Z_p$ は剰余列 $(x_n)_{n\ge1}$ で指定できます。ここで

$$
x_n\in\mathbb Z/p^n\mathbb Z,\qquad
x_{n+1}\equiv x_n\pmod{p^n}.
$$

例えば $1$ に対応する列は $(1\bmod p,1\bmod p^2,\ldots)$ です。各段に現れる剰余類は別々に選べず、隣の段と整合しなければなりません。

整数 $p^n$ の倍数全体とその $p$ 進閉包を考えます。$\mathbb Z_p$ の $p^n$ 倍は、最初の $n$ 桁が $0$ になる元の全体です。還元写像の核なので閉部分群です。

<a id="prop-iwa1-residue-quotients"></a>

<!-- formal-statement-start -->
> **命題（p進整数の有限商）**  
> 素数 $p$、整数 $n\ge0$ に対し、法 $p^n$ の還元写像は連続で全射な群準同型であり、核は $p^n\mathbb Z_p$ である。したがって（$n=0$ では自明群と解釈し）

$$
\mathbb Z_p/p^n\mathbb Z_p
 \simeq\mathbb Z/p^n\mathbb Z.
$$
<!-- formal-statement-end -->

### 証明の見取り図

互換な剰余列の第 $n$ 成分を取り出します。第 $n$ 成分が $0$ である条件を、$p^n$ 倍である条件と言い換えます。

<!-- proof-start -->
### 証明

$n=0$ では $p^0\mathbb Z_p=\mathbb Z_p$ です。$n\ge1$ とします。[逆極限同型](../../ANF/ANF9/index.md#thm-anf9-inverse-limit-isomorphism)により第 $n$ 成分を取り出す写像

$$
r_n:\mathbb Z_p\longrightarrow\mathbb Z/p^n\mathbb Z
$$

は加法を保ち、整数 $0,\ldots,p^n-1$ を定数の $p$ 進整数として含むので全射です。$x=p^ny$ なら $r_n(x)=0$。逆に $r_n(x)=0$ なら、$x$ の最初の $n$ 桁は $0$ です。[桁展開定理](../../ANF/ANF9/index.md#thm-anf9-digit-expansion)によって

$$
x=\sum_{j=n}^{\infty}a_jp^j
=p^n\sum_{j=0}^{\infty}a_{j+n}p^j,
$$

後ろの和は $\mathbb Z_p$ に属します。従って $\ker r_n=p^n\mathbb Z_p$ です。有限離散群への成分写像は逆極限位相の定義により連続です。準同型定理から結論を得ます。
<!-- proof-end -->

**計算例。** $p=3,n=2$ では $9\mathbb Z_3$ は $0,9,18,\ldots$ の閉包であり、剰余商には $0,1,\ldots,8$ の9類があります。$9\mathbb Z_3\subset3\mathbb Z_3\subset\mathbb Z_3$ となり、商群の位数は順に $9,3,1$ です。

## 2. 閉部分群を全部求める

「層」が一意に決まる理由は、$\mathbb Z_p$ の**閉部分群**が驚くほど少ないことです。閉とは、$p$ 進位相で極限を取っても群の外へ出ないという条件です。無限Galois理論では有限次拡大の中間体に対応するのは開部分群、一般の中間体に対応するのは閉部分群なので、この条件が必要です。

<a id="thm-iwa1-closed-subgroups"></a>

<!-- formal-statement-start -->
> **定理（Z_pの閉部分群の分類）**  
> 素数 $p$ に対し、加法位相群 $\mathbb Z_p$ の閉部分群は

$$
\{0\},\quad\mathbb Z_p,\quad p\mathbb Z_p,\quad
p^2\mathbb Z_p,\quad\ldots
$$

> に限る。特に指数が有限の閉部分群は、ちょうど $p^n\mathbb Z_p$（$n\ge0$）であり、その指数は $p^n$ である。
<!-- formal-statement-end -->

### 証明の見取り図

$H\ne\{0\}$ の元の中で最小の $p$ 進付値を選びます。その元の整数倍を閉包まで広げると、$p^n\mathbb Z_p$ 全体が得られます。

<!-- proof-start -->
### 証明

$H\subseteq\mathbb Z_p$ を閉部分群とします。$H=\{0\}$ の場合を除き、集合 $\{v_p(h):h\in H,\ h\ne0\}$ は非負整数の空でない部分集合なので最小値 $n$ を持ちます。$v_p(a)=n$ を満たす $a\in H$ を取ります。[付値による単元判定](../../ANF/ANF9/index.md#prop-anf9-dvr-structure)により

$$
a=p^nu,\qquad u\in\mathbb Z_p^\times.
$$

最小性から $H\subseteq p^n\mathbb Z_p$ です。一方 $a\in H$ だから $ma\in H$ は全ての整数 $m$ について成立します。整数 $\mathbb Z$ は $\mathbb Z_p$ に稠密であり、$u$ は逆元を持つため、連続写像 $x\mapsto ax$ の下で

$$
\overline{\{ma:m\in\mathbb Z\}}
=a\mathbb Z_p=p^nu\mathbb Z_p=p^n\mathbb Z_p.
$$

$H$ は閉なので左辺を含み、$p^n\mathbb Z_p\subseteq H$ を得ます。両包含から等号です。逆に各 $p^n\mathbb Z_p$ は[還元写像の核](#prop-iwa1-residue-quotients)なので閉、$\{0\}$ も距離空間の閉集合です。指数は同命題の商群の位数 $p^n$ です。
<!-- proof-end -->

**仮定の効き方。** 閉条件を外すと、$\mathbb Z\subset\mathbb Z_p$ は加法部分群ですが、$\mathbb Z_p$ に稠密であって全体とは異なります。例えば無限に離れた位置に $1$ が現れる非周期的な $p$ 進桁列は整数ではありません。証明では $\{ma\}$ の閉包が $H$ に含まれる箇所が壊れます。

## 3. 無限Galois拡大を有限層へ分ける

[前講のZ_p拡大](../../ANF/ANF22/index.md#def-anf22-zp-extension)を使い、$\Gamma=\operatorname{Gal}(K_\infty/K)$ が位相群として $\mathbb Z_p$ に同型である無限Galois拡大を固定します。同型 $\iota:\Gamma\xrightarrow{\sim}\mathbb Z_p$ は選択しておきます。

無限体 $K_\infty$ を最初から一度に扱う代わりに、$\iota^{-1}(p^n\mathbb Z_p)$ が動かさない元全体を有限層にします。群の側で一段下がると、体の側で一段上がります。

<a id="def-iwa1-canonical-layers"></a>

<!-- formal-statement-start -->
> **定義（Z_p拡大の第n層）**  
> 数体 $K$ の $\mathbb Z_p$ 拡大 $K_\infty/K$ と、位相群同型 $\iota:\operatorname{Gal}(K_\infty/K)\to\mathbb Z_p$ を固定する。整数 $n\ge0$ について、その第 $n$ 層 $K_n$ を

$$
K_n=K_\infty^{\iota^{-1}(p^n\mathbb Z_p)}
$$

> と定める。右肩の群による固定体を表す。部分群 $p^n\mathbb Z_p$ は $\mathbb Z_p$ の任意の位相群自己同型で不変なので、$K_n$ 自体は同型 $\iota$ の選び方によらない。
<!-- formal-statement-end -->

<a id="thm-iwa1-layer-tower"></a>

<!-- formal-statement-start -->
> **定理（有限層の次数・一意性・合併）**  
> 数体 $K$ の $\mathbb Z_p$ 拡大 $K_\infty/K$ に対し、上の $K_n$ は次を満たす。

$$
K_0=K,\qquad K_n\subset K_{n+1},\qquad
[K_n:K]=p^n,\qquad
\bigcup_{n\ge0}K_n=K_\infty.
$$

> 各 $K_n/K$ は巡回Galois拡大であり、$K_\infty$ に含まれる $K$ 上 $p^n$ 次の中間体は $K_n$ に限る。また $m\ge n$ に対して

$$
\operatorname{Gal}(K_m/K_n)\simeq
\mathbb Z/p^{m-n}\mathbb Z.
$$
<!-- formal-statement-end -->

### 証明の見取り図

[閉部分群の分類](#thm-iwa1-closed-subgroups)を無限Galois対応に入力します。指数が体の次数になり、部分群の包含が逆転して体の塔になります。

<!-- proof-start -->
### 証明

$H_n=\iota^{-1}(p^n\mathbb Z_p)$ と置きます。$H_0=\Gamma$、$H_{n+1}\subset H_n$ なので、無限Galois対応から $K_0=K$、$K_n\subseteq K_{n+1}$。$H_n$ は指数 $p^n$ の開正規部分群です（$\Gamma$ はAbel群）。[有限商の命題](#prop-iwa1-residue-quotients)とGalois対応から

$$
\operatorname{Gal}(K_n/K)\simeq\Gamma/H_n
\simeq\mathbb Z_p/p^n\mathbb Z_p
\simeq\mathbb Z/p^n\mathbb Z.
$$

よって次数は $p^n$、$K_n/K$ は巡回Galoisです。[閉部分群の分類](#thm-iwa1-closed-subgroups)から指数 $p^n$ の閉部分群は $H_n$ だけなので、一意性も従います。

各 $x\ne0$ は有限の付値を持つため $\bigcap_n p^n\mathbb Z_p=\{0\}$、従って $\bigcap_nH_n=\{1_\Gamma\}$ です。無限Galois対応では中間体の合併の固定群は対応する閉部分群の共通部分なので、$\bigcup_nK_n=K_\infty$ です。実際この合併は $K_\infty$ の部分体で、固定群が自明です。

最後に $m\ge n$ では

$$
\operatorname{Gal}(K_m/K_n)
\simeq H_n/H_m
\simeq p^n\mathbb Z_p/p^m\mathbb Z_p.
$$

写像 $p^nx\mapsto x\bmod p^{m-n}$ は群準同型で、核は $p^m\mathbb Z_p$、全射です。従って最後の商は $\mathbb Z/p^{m-n}\mathbb Z$ に同型です。
<!-- proof-end -->

<!-- definition-example-start: def-iwa1-canonical-layers -->
**定義の確認**（$p=3$）。 [円分的な構成](../../ANF/ANF22/index.md#thm-anf22-cyclotomic-zp-tower)で

$$
F_n=\mathbb Q(\zeta_{3^{n+1}})^{\{\pm1\}}
$$

とします。$F_0=\mathbb Q$、$[F_1:\mathbb Q]=3$、$[F_2:\mathbb Q]=9$ です。$F_\infty=\bigcup_nF_n$ のGalois群は $\mathbb Z_3$ で、$F_n$ を固定する部分群は指数 $3^n$。閉部分群の分類でこの部分群は $3^n\mathbb Z_3$ にしか対応できません。したがって上の定義の $K_n$ と、この具体的な $F_n$ が一致します。$F_1$ は$F_2$に含まれ、相対次数は $9/3=3$ です。固定群・次数・包含の三条件を個別に確認できました。
<!-- definition-example-end -->

この定理は群構造から**何個の有限層があるか**を決めます。しかし、各 $K_n$ の類群がどの大きさかは、まだ何も決めていません。そこから各層の類群を解析することが岩澤理論の課題になります。

## 4. 有限層の自己同型をつなぎ直す

体は合併（上向き）、Galois群は制限（下向き）でつなぎます。次は無限体の自己同型を有限段のデータから復元できる、という基本的な結果です。

<a id="thm-iwa1-galois-inverse-limit"></a>

<!-- formal-statement-start -->
> **定理（Galois群の逆極限表示）**  
> 体 $K$ の有限Galois拡大の増大列 $K=K_0\subset K_1\subset\cdots$ を取り、$L=\bigcup_nK_n$ とする。制限写像

$$
\rho_{m,n}:\operatorname{Gal}(K_m/K)\longrightarrow
\operatorname{Gal}(K_n/K)
\qquad(m\ge n)
$$

> を遷移写像とすると、Krull位相を入れたGalois群と有限離散群の逆極限との間に自然な位相群同型がある。

$$
\operatorname{Gal}(L/K)
\xrightarrow{\ \sim\ }
\varprojlim_n\operatorname{Gal}(K_n/K).
$$
<!-- formal-statement-end -->

### 証明の見取り図

無限体の自己同型は全有限層に制限できます。逆に、各有限層での自己同型が制限に関して両立すれば、その合併上で矛盾なく一つの自己同型に貼り合わされます。

<!-- proof-start -->
### 証明

$L/K$ は代数Galois拡大です。$\sigma\in\operatorname{Gal}(L/K)$ は各有限Galois拡大 $K_n/K$ を保つため、$(\sigma|_{K_n})_n$ を定めます。この列は $\rho_{n+1,n}(\sigma|_{K_{n+1}})=\sigma|_{K_n}$ を満たすので逆極限の元です。全ての $K_n$ 上で恒等なら合併 $L$ 上でも恒等で、写像は単射です。

逆に両立する族 $(\sigma_n)_n$ を取ります。任意の $x\in L$ に対して $x\in K_n$ となる $n$ を選び $\sigma(x)=\sigma_n(x)$ と定めます。$x\in K_m$（$m\ge n$）でも $\sigma_m(x)=\rho_{m,n}(\sigma_m)(x)=\sigma_n(x)$ ですから、選び方に依存しません。和・積・$K$ の固定は、二元を共に含む十分高い有限層で検証できます。逆元写像は両立する $(\sigma_n^{-1})$ から同じ方法で構成できるので、$\sigma$ は $K$ 上の自己同型です。従って全射です。

Krull位相の基本開近傍は有限層を点ごとに固定する群 $\operatorname{Gal}(L/K_n)$ です。構成した同型の下でこれは逆極限の第 $n$ 射影の核へ写り、逆極限位相の基本開近傍と一致します。よって同型と逆写像は連続です。
<!-- proof-end -->

**計算例（制限写像）。** $K_\infty/K$ が $\mathbb Z_5$ 拡大なら

$$
\operatorname{Gal}(K_2/K)\simeq\mathbb Z/25\mathbb Z,\qquad
\operatorname{Gal}(K_1/K)\simeq\mathbb Z/5\mathbb Z.
$$

位相群同型 $\iota$ を固定すると、制限は $a\bmod25\mapsto a\bmod5$ です。$a_2=7$ を選べば第1層は $a_1=2$ と決まり、$a_1=3$ を同時に選ぶことはできません。こうした両立性のある無限列だけが無限層の自己同型です。

## 5. 塔の生成元と計算用の座標

有限層では巡回群の生成元を取れます。無限層では通常の群生成（有限回の積）ではなく、**その冪全体が稠密**になることを要請します。これを位相的生成といいます。

<a id="def-iwa1-topological-generator"></a>

<!-- formal-statement-start -->
> **定義（位相的生成元）**  
> 位相群 $\Gamma$ の元 $\gamma$ が位相的生成元であるとは、整数冪の生成する巡回部分群の閉包が $\Gamma$ 全体となること、すなわち

$$
\overline{\langle\gamma\rangle}=\Gamma
$$

> が成立することをいう。$\Gamma=\mathbb Z_p$ を加法で書く場合には、整数倍の閉包 $\overline{\mathbb Z\gamma}$ を用いる。
<!-- formal-statement-end -->

<a id="prop-iwa1-generator-criterion"></a>

<!-- formal-statement-start -->
> **命題（Z_pの位相的生成元判定）**  
> $u\in\mathbb Z_p$ が加法群 $\mathbb Z_p$ の位相的生成元であることと、$u\in\mathbb Z_p^\times$（$v_p(u)=0$）であることは同値である。$\mathbb Z_p$ 拡大のGalois群の位相的生成元 $\gamma$ は、各第 $n$ 層で位数 $p^n$ の生成元へ写る。
<!-- formal-statement-end -->

### 証明の見取り図

整数倍 $\mathbb Zu$ の閉包は $u\mathbb Z_p$ なので、単元かどうかがちょうど全体を生成できる条件になります。有限商に落とせば生成元の位数が分かります。

<!-- proof-start -->
### 証明

整数の稠密性と乗法の連続性から $\overline{\mathbb Zu}=u\mathbb Z_p$ です。$u$ が単元なら $u\mathbb Z_p=\mathbb Z_p$。非単元なら[単元判定](../../ANF/ANF9/index.md#prop-anf9-dvr-structure)により $u\in p\mathbb Z_p$ だから閉包は真部分群に留まります。従って同値です。

位相群同型 $\iota:\Gamma\to\mathbb Z_p$ で $\gamma$ の像は単元です。法 $p^n$ の商で単元 $u$ の加法位数を調べると、$ku\equiv0\pmod{p^n}$ は $k\equiv0\pmod{p^n}$ と同値です。よって位数 $p^n$ です。[第 $n$ 層のGalois商](#thm-iwa1-layer-tower)へ戻すと $\gamma|_{K_n}$ が生成元になります。
<!-- proof-end -->

<!-- definition-example-start: def-iwa1-topological-generator -->
**定義の確認**。 $p=5$ で $u=2$ を取ります。$2$ は $\mathbb Z_5$ の単元だから、$2a\bmod5^n$（$a\in\mathbb Z$）は全ての剰余類を動きます。従って整数倍は各有限商へ全射となり、その閉包は $\mathbb Z_5$ 全体です。一方 $u=5$ の整数倍はすべて $5\mathbb Z_5$ に留まり、第1商 $\mathbb Z/5\mathbb Z$ で $0$ しか動きません。位相的生成元ではありません。
<!-- definition-example-end -->

**選択の違い。** $K_n$ は同型 $\iota$ に依存しませんが、$\gamma$ をどの位相的生成元にするかで $a\bmod p^n$ という座標は変わります。$\gamma$ と $\gamma^u$（$u\in\mathbb Z_p^\times$、有限商で整合する冪として定義）のどちらも位相的生成元です。後の岩澤代数では $T=\gamma-1$ と置くため、座標の規格化を毎回明記する必要があります。

## 6. 最初の非自明な円分層を手計算する

奇素数 $p=3$ に対し[ANF22の円分塔](../../ANF/ANF22/index.md#thm-anf22-cyclotomic-zp-tower)の第1層を具体的に記述します。$\zeta=\zeta_9$、$t=\zeta+\zeta^{-1}$ とします。複素共役の固定体は $\mathbb Q(t)$ であり、$\zeta^3$ は原始3乗根です。恒等式

$$
(\zeta+\zeta^{-1})^3-3(\zeta+\zeta^{-1})
=\zeta^3+\zeta^{-3}=-1
$$

から $t^3-3t+1=0$ を得ます。この三次多項式は有理整数係数の首一多項式で、考えられる有理根 $\pm1$ を代入すると $-1,3$ となっていずれも $0$ ではありません。三次多項式は有理根がなければ既約なので

$$
F_1=\mathbb Q(t),\qquad [F_1:\mathbb Q]=3.
$$

$F_2=\mathbb Q(\zeta_{27})^{\{\pm1\}}$ については円分体の次数が $\varphi(27)=18$、複素共役の位数が $2$ なので $[F_2:\mathbb Q]=9$。さらに $F_1\subset F_2$ なので $[F_2:F_1]=3$ です。最初の一段は実三次体で具体的に見え、全体のGalois群は有限商の逆極限であることも確認できます。

## 7. なぜ類群を一層ずつ比べるのか

数体 $K_n$ の[イデアル類群](../../ANF/ANF6/index.md#def-anf6-ideal-class-group)は有限Abel群です。しかし $[K_n:K]=p^n$ という群論的な情報だけでは、$\operatorname{Cl}(K_n)$ の位数も、その $p$ べき部分も決まりません。円分塔で素数 $p$ が完全分岐することと、塔のすべての層で類群が自明であることは別の主張です。

今後は拡大 $K_{n+1}/K_n$ に沿って、有限層の類群、単数群、およびそのノルム写像を調べます。その遷移写像が整合するとき逆極限を作れます。**体の合併と群の逆極限を混ぜないこと**が、岩澤理論への第一歩です。

## 8. 演習：有限商から無限塔へ

### A1. 有限商と指数

加法群 $\mathbb Z_5$ の部分群 $25\mathbb Z_5$ の指数を求め、$7$ と $32$ が同じ剰余類に属するか判定せよ。

- Level: A
- ID: IWA1-A1

<!-- solution-start -->
**詳細解答。** [有限商の命題](#prop-iwa1-residue-quotients)で $n=2$ とすると商は $\mathbb Z/25\mathbb Z$ に同型で指数は $25$。二元の差は $32-7=25\in25\mathbb Z_5$ だから同じ剰余類に属します。$7$ と $8$ の差 $1$ は同部分群にないため、両者は異なる剰余類です。
<!-- solution-end -->

### A2. 互換な剰余列

$\mathbb Z_3$ の元を指定するため $a_1=2\bmod3$, $a_2=8\bmod9$, $a_3=26\bmod27$ とする。互換性を確認し、この三つと整合する $3$ 進整数を一つ挙げよ。

- Level: A
- ID: IWA1-A2

<!-- solution-start -->
**詳細解答。** $8-2=6$ は $3$ の倍数、$26-8=18$ は $9$ の倍数です。従って各還元は前段に一致します。$-1\in\mathbb Z_3$ は法 $3,9,27$ の剰余が順に $2,8,26$ なので条件を満たします。これら三成分だけでは $-1+27b$（$b\in\mathbb Z_3$）を区別できず、無限列の全成分が与えられて初めて一元に定まります。
<!-- solution-end -->

### A3. 有限層の次数

$K_\infty/K$ を $\mathbb Z_7$ 拡大とする。$[K_3:K]$ と $[K_3:K_1]$ を求めよ。

- Level: A
- ID: IWA1-A3

<!-- solution-start -->
**詳細解答。** [有限層定理](#thm-iwa1-layer-tower)で $[K_3:K]=7^3=343$、$[K_1:K]=7$。塔の次数公式から $[K_3:K_1]=343/7=49=7^2$ です。対応する相対Galois群は $\mathbb Z/49\mathbb Z$ です。
<!-- solution-end -->

### A4. 位相的生成元

加法群 $\mathbb Z_5$ で $2$ と $15$ のうち位相的生成元となるものを判定し、法 $25$ での加法位数を求めよ。

- Level: A
- ID: IWA1-A4

<!-- solution-start -->
**詳細解答。** [位相的生成元判定](#prop-iwa1-generator-criterion)では $5$ で割り切れない元だけが生成元です。$2$ は単元で、$k2\equiv0\pmod{25}$ は $k\equiv0\pmod{25}$ と同値だから位数は $25$。$15=5\cdot3$ は単元でなく、その法 $25$ での倍数は $0,15,5,20,10$ の5個です。$5\cdot15\equiv0\pmod{25}$ で位数は $5$。従って $2$ のみ位相的生成元です。
<!-- solution-end -->

### A5. 制限写像の向き

$\operatorname{Gal}(K_2/K)\simeq\mathbb Z/9\mathbb Z$ と $\operatorname{Gal}(K_1/K)\simeq\mathbb Z/3\mathbb Z$ の座標が還元と両立するとする。$7\bmod9$ はどの元に制限されるか。$1\bmod3$ はいくつの元へ持ち上がるか。

- Level: A
- ID: IWA1-A5

<!-- solution-start -->
**詳細解答。** 還元は $7\bmod9\mapsto1\bmod3$ です。$1\bmod3$ の逆像は $1,4,7\bmod9$ の3個で、差は $3$ の倍数です。制限は上層から下層へ向かい、全射ですが逆写像は一意ではありません。
<!-- solution-end -->

### B1. 閉性の必要性

$\mathbb Z$ が $\mathbb Z_p$ の稠密な真部分群であることを示し、閉部分群分類において閉性を落とせない理由を説明せよ。

- Level: B
- ID: IWA1-B1

<!-- solution-start -->
**詳細解答。** [桁展開](../../ANF/ANF9/index.md#thm-anf9-digit-expansion)で与えられる $x\in\mathbb Z_p$ の最初の $n$ 桁を合計した整数を $s_n$ とします。その差は

$$
x-s_n\in p^n\mathbb Z_p
$$

を満たすので、$s_n\to x$ です。従って $\overline{\mathbb Z}=\mathbb Z_p$ となり、整数全体は稠密です。

一方、$p$ 進等比級数

$$
\sum_{j=0}^\infty p^{2j}=\frac{1}{1-p^2}
$$

は $\mathbb Z_p$ に収束します。ところが $p\ge2$ なので $1/(1-p^2)$ は通常の整数ではありません。従って $\mathbb Z$ は $\mathbb Z_p$ の真部分群です。

[分類定理の証明](#thm-iwa1-closed-subgroups)では整数倍の**閉包**をもとの部分群に含めるために閉性を用いました。$\mathbb Z$ ではこの包含が成立しないので、閉性の仮定を省略できません。
<!-- solution-end -->

### B2. 円分第一層の最小多項式

$\zeta=\zeta_9$, $t=\zeta+\zeta^{-1}$ とするとき、$t^3-3t+1=0$ と $[\mathbb Q(t):\mathbb Q]=3$ を示せ。

- Level: B
- ID: IWA1-B2

<!-- solution-start -->
**詳細解答。** $\zeta^3$ は原始3乗根なので、$(\zeta^3)^2+\zeta^3+1=0$ です。両辺を $\zeta^{-3}$ 倍すると

$$
\zeta^3+\zeta^{-3}=-1
$$

が得られます。$a=\zeta$、$b=\zeta^{-1}$ とし、$ab=1$ と恒等式 $(a+b)^3-3ab(a+b)=a^3+b^3$ を使うと、

$$
t^3-3t=\zeta^3+\zeta^{-3}=-1
$$

です。よって $t$ は $f(X)=X^3-3X+1$ の根です。

有理根定理から、この首一多項式の有理根の候補は $\pm1$ です。しかし $f(1)=-1$、$f(-1)=3$ でいずれも根ではありません。三次多項式が可約なら一次因子を持つため、$f$ は既約です。従って $f$ が $t$ の最小多項式であり、

$$
[\mathbb Q(t):\mathbb Q]=\deg f=3
$$

を得ます。[円分塔の定理](../../ANF/ANF22/index.md#thm-anf22-cyclotomic-zp-tower)で得た第一層の次数とも一致します。
<!-- solution-end -->

### B3. 二つの層の間の一意性

$K_\infty/K$ が $\mathbb Z_3$ 拡大のとき、$K_1\subseteq E\subseteq K_3$ かつ $[E:K_1]=3$ を満たす中間体 $E$ を求め、一意性を説明せよ。

- Level: B
- ID: IWA1-B3

<!-- solution-start -->
**詳細解答。** [有限層定理](#thm-iwa1-layer-tower)により $[K_1:K]=3$ です。仮定から $[E:K]=[E:K_1][K_1:K]=3^2=9$。$\mathbb Z_3$ 拡大の内部で次数9の中間体は閉部分群 $9\mathbb Z_3$ に対応する $K_2$ 一つだけなので $E=K_2$ です。また $K_1\subset K_2\subset K_3$ かつ $[K_2:K_1]=3$ であり、存在も確認できました。
<!-- solution-end -->

### B4. 次数が合うだけでは不十分

$E=\mathbb Q(\sqrt[3]{2})$ が $\mathbb Q$ の $\mathbb Z_3$ 拡大の第1層になれないことを証明せよ。

- Level: B
- ID: IWA1-B4

<!-- solution-start -->
**詳細解答。** 多項式 $X^3-2$ は素数 $2$ に関するEisenstein判定法から既約です。従って $[E:\mathbb Q]=3$ です。

しかし $\alpha=\sqrt[3]{2}$ の最小多項式には、$\alpha$ のほかに $\omega\alpha,\omega^2\alpha$（$\omega$ は原始3乗根）という非実根があります。$E=\mathbb Q(\alpha)\subseteq\mathbb R$ なので、$E$ はこれら非実根を含みません。よって $E/\mathbb Q$ は正規でなく、Galois拡大ではありません。

他方、[有限層定理](#thm-iwa1-layer-tower)によれば $\mathbb Z_3$ 拡大の第1層は必ず巡回Galois拡大です。この**Galois性の欠落**が障害となり、次数3という条件だけでは第1層になれません。
<!-- solution-end -->

### C1. 有限層・無限層・生成元の統合

数体 $K$ の無限Galois拡大 $L/K$ が位相群同型 $\phi:\operatorname{Gal}(L/K)\simeq\mathbb Z_p$ を持つとする。以下を順に示せ。

1. $L$ に $K$ 上次数 $p^n$ の中間体 $K_n$ が一つだけあり、全て巡回Galoisである。
2. $K_n\subset K_{n+1}$、$\bigcup_nK_n=L$、$\operatorname{Gal}(K_{n+1}/K_n)\simeq\mathbb Z/p\mathbb Z$ である。
3. $\gamma\in\operatorname{Gal}(L/K)$ の像が $p$ 進単元なら、$\gamma$ が全ての有限商を生成するが、その各有限商だけから一つの無限自己同型を指定するには制限写像との整合条件が必要である理由を説明せよ。

- Level: C
- ID: IWA1-C1

<!-- solution-start -->
**詳細解答。** 最初に $G=\operatorname{Gal}(L/K)$、$H_n=\phi^{-1}(p^n\mathbb Z_p)$ と置きます。

**（1）** [閉部分群分類](#thm-iwa1-closed-subgroups)により指数 $p^n$ の閉部分群は $H_n$ だけです。無限Galois対応で $K_n=L^{H_n}$ は唯一の次数 $p^n$ の中間体です。$G$ はAbelで $H_n$ は正規、しかも $G/H_n\simeq\mathbb Z/p^n\mathbb Z$ だから $K_n/K$ は巡回Galoisです。

**（2）** $H_{n+1}\subset H_n$ なので固定体の包含は $K_n\subset K_{n+1}$。$\bigcap_n H_n=\{1_G\}$ から固定体の合併は $L$ です。さらに

$$
\operatorname{Gal}(K_{n+1}/K_n)
\simeq H_n/H_{n+1}
\simeq p^n\mathbb Z_p/p^{n+1}\mathbb Z_p
\simeq\mathbb Z/p\mathbb Z.
$$

最後の同型は $p^nx\mapsto x\bmod p$ で与えられ、核が $p^{n+1}\mathbb Z_p$ です。

**（3）** $u=\phi(\gamma)$ が単元なら、法 $p^n$ の商における $u$ の加法位数は $p^n$ です。実際、単元の逆元を掛けられるので

$$
ku\equiv0\pmod{p^n}
\quad\Longleftrightarrow\quad
k\equiv0\pmod{p^n}.
$$

従って $\gamma|_{K_n}$ は各巡回Galois群の生成元です。

ただし、層ごとに有限商の元を独立に選んではいけません。例えば法 $p$ では $1$、法 $p^2$ では $0$ を選ぶと、後者を還元しても前者には一致しません。

[逆極限定理](#thm-iwa1-galois-inverse-limit)で自己同型を貼り合わせるには、全ての $n$ で

$$
\rho_{n+1,n}(\sigma_{n+1})=\sigma_n
$$

が必要です。整合する族だけが $L$ の一つの自己同型を定めます。
<!-- solution-end -->

## 9. 次講への問い

ここまでの結論は、$\mathbb Z_p$ 拡大なら各有限層は一意に定まり、そのGalois群は必ず巡回 $p$ 群になるということです。次講 **IWA2** では、この一般論を円分体のGalois群 $(\mathbb Z/p^{n+1}\mathbb Z)^\times$ に適用し、奇素数の $\Delta\times\Gamma$ 分解と $p=2$ の違いを統一して計算します。
