# CATB7-05 分解・導来関手・Ext

## 1. 完全性が失われる量を測る

前講の[導来圏](../CATB7-04/index.md#def-catb7-04-derived-category)では、コホモロジーを変えない複体の置換を許した。今回は、置換先を計算しやすい対象で作る方法を学ぶ。

整数 $m\ge2$ に対して短完全列

$$
0\to\mathbb Z\xrightarrow{m}\mathbb Z\to\mathbb Z/m\mathbb Z\to0
$$

を考える。整数加群から整数加群への準同型は1の像で決まり、有限巡回群から整数加群への準同型は零である。従って $\operatorname{Hom}_{\mathbb Z}(-,\mathbb Z)$ を適用し、矢印を反転すると

$$
0\to0\to\mathbb Z\xrightarrow{m}\mathbb Z
$$

となり、最後の射は全射ではない。欠けた商 $\mathbb Z/m\mathbb Z$ はどこに記録できるだろうか。これが本講で導入する Ext の最初の例である。

以下では局所小な[アーベル圏](../CATB1-04/index.md#def-catb1-04-abelian-category)を扱う。必要に応じて前講と同じ宇宙を選ぶ。一般の圏での証明は射の分解と持ち上げで行い、元による計算は加群の例に限る。合成は右から左とする。

## 2. 持ち上げと延長ができる対象

全射の先にある写像を全射の手前まで持ち上げられる対象があれば、複体の比較写像を一段ずつ作れる。双対的に、単射の定義域から出る写像を単射の終域まで延長できる対象も有用である。

<a id="def-catb7-05-projective"></a>

<!-- formal-statement-start -->
> **定義（射影対象）**
>
> アーベル圏の対象 $P$ が射影対象であるとは、任意のエピ射 $e:X\to Y$ と射 $a:P\to Y$ に対し、$e b=a$ を満たす射 $b:P\to X$ が存在することをいう。
<!-- formal-statement-end -->

<!-- definition-example-start: def-catb7-05-projective -->
**定義の確認**。単位元を持つ環 $R$ の左加群の圏で自由加群 $P=\bigoplus_{j\in J}R$ を取る。全射 $e:X\to Y$ と $a:P\to Y$ に対し、各基底元 $u_j$ の像 $a(u_j)$ の逆像 $x_j$ を一つ選ぶ（無限個の場合は選択公理を用いる）。有限台の和に対して

$$
b\left(\sum_j r_j u_j\right)=\sum_j r_j x_j
$$

と置けば左加群の準同型であり、$e b$ と $a$ は全基底元上で一致するので等しい。従って自由加群は射影対象である。
<!-- definition-example-end -->

任意の加群 $M$ は、その元を添字とする自由加群から、基底元 $u_x$ を $x$ に送る全射を受ける。このようにどの対象も射影対象からエピ射を受けるとき、その圏には十分な射影対象があるという。一方、$\mathbb Z/m\mathbb Z$ は射影対象ではない。剰余射に対する恒等射の持ち上げが存在すると、1の像は整数 $k$ で $mk=0$ かつ $k\equiv1\bmod m$ を満たすはずだが、前者は $k=0$ を強制する。

<a id="def-catb7-05-injective"></a>

<!-- formal-statement-start -->
> **定義（入射対象）**
>
> アーベル圏の対象 $I$ が入射対象であるとは、任意のモノ射 $j:X\to Y$ と射 $a:X\to I$ に対し、$b j=a$ を満たす射 $b:Y\to I$ が存在することをいう。
<!-- formal-statement-end -->

<!-- definition-example-start: def-catb7-05-injective -->
**定義の確認**。体 $k$ 上のベクトル空間 $I$ を取る。単射 $j:X\to Y$ について $j(X)$ 上で $b_0(jx)=a(x)$ と置く。単射性からこれは一意に定まり、線形性を持つ。$j(X)$ の基底を $Y$ の基底へ拡張し、追加基底元での値を零とすれば線形写像 $b:Y\to I$ が得られ、全ての $x$ に対して $bj(x)=a(x)$ である。
<!-- definition-example-end -->

どの対象も入射対象へモノ射を持つとき、十分な入射対象があるという。これは十分な射影対象とは別の仮定である。例えば整数加群 $\mathbb Z$ は入射対象ではない。包含 $m\mathbb Z\subset\mathbb Z$ 上の準同型 $mk\mapsto k$ を延長できれば、延長の1での値 $t$ は $mt=1$ を満たすはずだからである。

## 3. 対象を完全な列で置換する

自由加群から $M$ への全射を選ぶだけでは、その核の情報を失う。核にも新たな全射を作り、その操作を反復すると、元の対象を次数0のコホモロジーに持つ複体ができる。ここでは射影側を非正次数、入射側を非負次数に置き、[余鎖複体](../CATB7-01/index.md#def-catb7-01-cochain-complex)の記法を統一する。

<a id="def-catb7-05-projective-resolution"></a>

<!-- formal-statement-start -->
> **定義（射影分解）**
>
> アーベル圏の対象 $M$ の射影分解とは、各 $P^i$ が射影対象であり、次の列が完全であるような複体 $P$ と増大射 $\epsilon:P^0\to M$ である。$P^i=0$ ($i>0$) とする。

$$
\cdots\to P^{-2}\xrightarrow{d^{-2}}P^{-1}
\xrightarrow{d^{-1}}P^0\xrightarrow{\epsilon}M\to0.
$$
<!-- formal-statement-end -->

<!-- definition-example-start: def-catb7-05-projective-resolution -->
**定義の確認**。$M=\mathbb Z/m\mathbb Z$、$P^{-1}=P^0=\mathbb Z$、$d^{-1}=m$、$\epsilon$ を剰余射とし、他の成分を零とする。両非零成分は自由加群なので[射影対象](#def-catb7-05-projective)である。$m\ne0$ なので $\ker d^{-1}=0$、$\operatorname{im}d^{-1}=m\mathbb Z=\ker\epsilon$、$\operatorname{im}\epsilon=M$。残りの次数は零対象なので完全である。
<!-- definition-example-end -->

<a id="def-catb7-05-injective-resolution"></a>

<!-- formal-statement-start -->
> **定義（入射分解）**
>
> アーベル圏の対象 $M$ の入射分解とは、各 $I^i$ が入射対象であり、次の列が完全であるような複体 $I$ と射 $\eta:M\to I^0$ である。$I^i=0$ ($i<0$) とする。

$$
0\to M\xrightarrow{\eta}I^0
\xrightarrow{d^0}I^1\xrightarrow{d^1}I^2\to\cdots .
$$
<!-- formal-statement-end -->

<!-- definition-example-start: def-catb7-05-injective-resolution -->
**定義の確認**。体上のベクトル空間 $V$ に対して $I^0=V$、他の成分を零、$\eta=1_V$ とする。$V$ は[入射対象](#def-catb7-05-injective)、零対象も任意の零射を延長できるので入射対象である。$\eta$ は単射、$\operatorname{im}\eta=V=\ker d^0$、それ以後の核と像は零なので入射分解になる。
<!-- definition-example-end -->

<a id="thm-catb7-05-resolution-existence"></a>

<!-- formal-statement-start -->
> **定理（分解の存在と擬同型）**
>
> 十分な射影対象を持つアーベル圏では全対象が射影分解を持つ。十分な入射対象を持つアーベル圏では全対象が入射分解を持つ。それぞれ増大射 $P\to M[0]$、射 $M[0]\to I$ は擬同型である。
<!-- formal-statement-end -->

核を一つずつ解消する操作と、余核を一つずつ解消する操作が対応する。

<!-- proof-start -->
### 証明

$K_0=M$ とし、射影対象 $P^0$ からのエピ射 $q_0:P^0\to K_0$ を選ぶ。$K_1=\ker q_0$ と包含 $j_1:K_1\to P^0$ を取り、エピ射 $q_1:P^{-1}\to K_1$ を選ぶ。$d^{-1}=j_1 q_1$ とすると、$q_1$ はエピ、$j_1$ はモノなので

$$
\operatorname{im}d^{-1}=K_1=\ker q_0,\qquad
\ker d^{-1}=\ker q_1.
$$

一般に $K_{t+1}=\ker q_t$、$j_{t+1}:K_{t+1}\to P^{-t}$ と置き、$q_{t+1}:P^{-t-1}\to K_{t+1}$ を選ぶ。$d^{-t-1}=j_{t+1}q_{t+1}$ とすれば、同じ核と像の計算が全次数に適用できる。隣接射の合成は零であり、[完全列](../CATB1-05/index.md#def-catb1-05-exact)の条件が成立する。

入射側は $C_0=M$ からモノ射 $i_0:C_0\to I^0$ を選び、$C_1=\operatorname{coker}i_0$、余核射 $p_0:I^0\to C_1$ を取る。一般に $i_t:C_t\to I^t$、$p_t:I^t\to C_{t+1}=\operatorname{coker}i_t$ を選び、$d^t=i_{t+1}p_t$ と置く。$i_{t+1}$ はモノ、$p_t$ はエピなので

$$
\ker d^t=\ker p_t=\operatorname{im}i_t,\qquad
\operatorname{im}d^t=\operatorname{im}i_{t+1}.
$$

従って全次数で完全性を得る。

[余鎖複体のコホモロジー](../CATB7-01/index.md#def-catb7-01-cohomology)に戻る。射影分解では $H^0(P)=P^0/\ker\epsilon\cong M$、負次数のコホモロジーは完全性から零、正次数も零である。入射分解では $H^0(I)=\ker d^0\cong M$、正次数は完全性から零、負次数も零である。次数0の同型はそれぞれ $\epsilon,\eta$ が誘導する。従って両射は[余鎖複体の擬同型](../CATB7-03/index.md#def-catb7-03-quasi-isomorphism)である。
<!-- proof-end -->

## 4. 分解の選び方に依存しない理由

同じ対象でも自由加群の選び方は多数ある。さらに、対象間の射を分解の間の写像に移す必要がある。ここでは比較写像の存在と、選択の違いがホモトピーに吸収されることを示す。

<a id="thm-catb7-05-comparison"></a>

<!-- formal-statement-start -->
> **定理（分解の比較定理）**
>
> アーベル圏の射 $f:M\to N$ と両対象の射影分解 $P,Q$ が与えられたとき、$f$ と増大射に関して可換な余鎖写像 $u:P\to Q$ が存在し、そのような写像は余鎖ホモトピーを除いて一意である。両対象の入射分解 $I,J$ についても、$f$ と分解への射に関して可換な余鎖写像 $I\to J$ が存在し、余鎖ホモトピーを除いて一意である。
<!-- formal-statement-end -->

核心は、射影側で一つ前の次数へ進むたびに核へのエピ射を持ち上げることである。入射側では余核のモノ射に沿って延長する。

<!-- proof-start -->
### 証明

射影側から始める。$P^0$ の射影性と $\epsilon_Q:Q^0\to N$ のエピ性から

$$
\epsilon_Q u^0=f\epsilon_P
$$

となる $u^0:P^0\to Q^0$ を選べる。次に $\epsilon_Q u^0 d_P^{-1}=f\epsilon_P d_P^{-1}=0$ なので、$u^0d_P^{-1}$ は $\ker\epsilon_Q$ を経由する。$Q^{-1}\to\ker\epsilon_Q$ は分解の完全性からエピ射であり、$P^{-1}$ の射影性によって $d_Q^{-1}u^{-1}=u^0d_P^{-1}$ を満たす $u^{-1}$ が得られる。

一般に $n\le-2$ で $u^{n+1},u^{n+2}$ が既に構成されていれば

$$
d_Q^{n+1}u^{n+1}d_P^n
=u^{n+2}d_P^{n+1}d_P^n=0.
$$

従って $u^{n+1}d_P^n$ は $\ker d_Q^{n+1}$ を経由し、$d_Q^n$ の像へのエピ射 $Q^n\to\ker d_Q^{n+1}$ に沿って持ち上げられる。これで全成分が余鎖写像の条件を満たす。

一意性を示す。二つの持ち上げ $u,v$ の差を $w=u-v$ とし、$h^1=0$ とする。$\epsilon_Q w^0=0$ なので $w^0$ は $\ker\epsilon_Q$ を経由し、射影性により $w^0=d_Q^{-1}h^0$ と書ける。$n<0$ で次数 $n+1$ まで

$$
w^{n+1}=d_Q^nh^{n+1}+h^{n+2}d_P^{n+1}
$$

が成り立っているとする。残差 $r=w^n-h^{n+1}d_P^n$ について

$$
d_Q^n r=w^{n+1}d_P^n-d_Q^nh^{n+1}d_P^n
=h^{n+2}d_P^{n+1}d_P^n=0.
$$

$P^n$ の射影性で $r=d_Q^{n-1}h^n$ とできる。全次数で

$$
u^n-v^n=d_Q^{n-1}h^n+h^{n+1}d_P^n
$$

となるので、[余鎖ホモトピー](../CATB7-02/index.md#def-catb7-02-cochain-homotopy)である。

入射側も具体的に追う。$\eta_J f:M\to J^0$ の定義域を $\eta_I:M\to I^0$ に沿って延長し、$u^0\eta_I=\eta_J f$ とする。$d_J^0u^0$ は $\eta_I$ を零に送るので余核 $I^0/\operatorname{im}\eta_I$ を経由する。この余核は $\operatorname{im}d_I^0\subset I^1$ と同型であり、$J^1$ の入射性でそこから $I^1$ 全体へ延長して $u^1d_I^0=d_J^0u^0$ を得る。一般の $n\ge1$ でも

$$
d_J^nu^nd_I^{n-1}=d_J^nd_J^{n-1}u^{n-1}=0
$$

なので余核 $I^n/\operatorname{im}d_I^{n-1}$ を経由し、完全性により $\operatorname{im}d_I^n\subset I^{n+1}$ 上の射を得る。$J^{n+1}$ への延長で次の成分を作る。

二つの延長の差 $w$ は $w^0\eta_I=0$ を満たす。従って $w^0$ は $\operatorname{im}d_I^0$ を経由し、$J^0$ の入射性で $h^1:I^1\to J^0$ を選び $w^0=h^1d_I^0$ とする。$h^0=0$ とし、次数 $n-1$ までホモトピー式が成立しているなら

$$
(w^n-d_J^{n-1}h^n)d_I^{n-1}
=d_J^{n-1}w^{n-1}-d_J^{n-1}h^nd_I^{n-1}=0.
$$

最後の等号は $w^{n-1}=d_J^{n-2}h^{n-1}+h^nd_I^{n-1}$ と微分の二乗零から従う。従って残差は $\operatorname{im}d_I^n$ を経由し、$J^n$ の入射性による延長 $h^{n+1}$ で残差を $h^{n+1}d_I^n$ と表せる。全次数のホモトピー式が成立する。
<!-- proof-end -->

同じ $M$ の二つの分解を取って $f=1_M$ とすると、両方向の比較写像を作れる。その合成と恒等射はいずれも $1_M$ を持ち上げるため、比較定理の一意性でホモトピーになる。従って二つの分解は[余鎖複体のホモトピー同値](../CATB7-03/index.md#def-catb7-03-homotopy-equivalence)である。任意の $f,g$ に対して比較写像の合成は $gf$ を持ち上げるので、これも選択によらずホモトピー類として合成を保つ。

## 5. 完全性を測る関手

アーベル圏の間の加法的関手 $F$ について、任意の短完全列 $0\to A\to B\to C\to0$ の像が末尾で完全、すなわち $F(A)\to F(B)\to F(C)\to0$ が完全なら右完全という。先頭 $0\to F(A)\to F(B)\to F(C)$ が完全なら左完全という。

例えば固定した加群 $M$ に対する $\operatorname{Hom}_R(M,-)$ は左完全である。単射への後合成は単射であり、次の射との合成が零となる写像は核である $A$ へ一意に因子化する。$\operatorname{Hom}_R(-,N)$ は反変で、反対圏からの関手として左完全である。全射への前合成は単射、$A$ 上零になる写像 $B\to N$ は余核 $C$ を一意に経由する。

加法的関手は零射と射の和を保つため、複体へ成分ごとに適用しても微分の二乗は零である。分解に適用してからコホモロジーを計算する。

<a id="def-catb7-05-derived-functor"></a>

<!-- formal-statement-start -->
> **定義（左右導来関手）**
>
> アーベル圏の間の加法的右完全関手 $F:\mathcal A\to\mathcal B$ について、$\mathcal A$ が十分な射影対象を持つとする。対象 $M$ の射影分解 $P$ を用い、整数 $n\ge0$ に対して左導来関手の値を

$$
L_nF(M)=H^{-n}(F(P))
$$

> とする。加法的左完全関手 $G:\mathcal A\to\mathcal B$ について、$\mathcal A$ が十分な入射対象を持つとする。入射分解 $I$ を用いて右導来関手の値を

$$
R^nG(M)=H^n(G(I))
$$

> とする。射に対する値は分解の比較写像が誘導するコホモロジー射とする。
<!-- formal-statement-end -->

<!-- definition-example-start: def-catb7-05-derived-functor -->
**定義の確認**。整数加群で $F(M)=M/mM$ ($m\ge2$) とする。射は剰余類に誘導され、加法性を持つ。右完全性を確認する。短完全列を $A\subset B$、$C=B/A$ と表すと、$B/mB\to C/mC$ は全射。その核は $(A+mB)/mB$ であり、これは $A/mA\to B/mB$ の像に一致する。実際、$b+A$ が $mC$ に入れば $b-mb'\in A$ となる $b'\in B$ が取れ、逆も成立する。

$M=\mathbb Z/m\mathbb Z$ に[射影分解](#def-catb7-05-projective-resolution)の例を用いると、$F(P)$ は次数 $-1,0$ の $\mathbb Z/m\mathbb Z$ を零写像で結ぶ。よって $L_1F(M)=\mathbb Z/m\mathbb Z$ である。右導来側の例として、体上のベクトル空間で恒等関手 $G$ を取る。左完全かつ加法的で、各空間は入射対象なので次数0の入射分解が使える。$R^0G(V)=V$、$n>0$ で $R^nG(V)=0$ となる。
<!-- definition-example-end -->

<a id="thm-catb7-05-derived-well-defined"></a>

<!-- formal-statement-start -->
> **定理（導来関手の選択独立性と0次）**
>
> 左右導来関手の定義の仮定の下で、値と射は分解の選択によらず自然同型を除いて定まり、$L_0F\cong F$ および $R^0G\cong G$ が成り立つ。射影対象上の正次数の左導来関手と、入射対象上の正次数の右導来関手は零である。
<!-- formal-statement-end -->

分解間のホモトピーを関手で移しても、加法性があるためホモトピー式を保てる。これが完全でない関手にも使える理由である。

<!-- proof-start -->
### 証明

[分解の比較定理](#thm-catb7-05-comparison)で得た $u,v,h$ に加法的関手 $F$ を適用すると

$$
F(u^n)-F(v^n)=F(d_Q^{n-1})F(h^n)+F(h^{n+1})F(d_P^n).
$$

よって $F(u),F(v)$ はホモトピーであり、[余鎖ホモトピーの同値性とコホモロジー不変性](../CATB7-02/index.md#thm-catb7-02-homotopy-invariance)により同じコホモロジー射を誘導する。恒等射と合成については比較写像の一意性を用いる。二つの分解の間の恒等射の持ち上げはコホモロジー上で逆同型を誘導し、任意の $f$ との自然性の四角形も二通りの合成が同じ $f$ を持ち上げるため可換する。入射側でも上のホモトピー式の $F$ を $G$ に置き換えられる。

$P^0/\operatorname{im}d_P^{-1}\cong M$ なので、右完全性から

$$
F(P^{-1})\to F(P^0)\to F(M)\to0
$$

が完全になる。ここでは右完全性を短完全列に二度適用する。$K=\ker\epsilon$ とすると $P^{-1}\to K$ はエピ射で、その核との短完全列から $F(P^{-1})\to F(K)$ もエピ射である。次に $0\to K\to P^0\to M\to0$ に適用すると $\operatorname{im}(F(K)\to F(P^0))=\ker F(\epsilon)$。従って $H^0(F(P))=\operatorname{coker}F(d_P^{-1})\cong F(M)$。

入射側では $C=\operatorname{coker}\eta$ として $0\to M\to I^0\to C\to0$ を使い、$\ker(G(I^0)\to G(C))=\operatorname{im}G(\eta)$ を得る。$C\to I^1$ はモノ射なので、その余核との短完全列へ左完全性を適用すると $G(C)\to G(I^1)$ もモノ射である。従って $\ker G(d_I^0)=\operatorname{im}G(\eta)\cong G(M)$ である。これらの同型は比較写像と増大射・分解への射との可換性から自然である。

最後に、射影対象 $M$ 自身を次数0に置き恒等射を増大射とすれば分解になる。他の次数は零なので $L_nF(M)=0$ ($n>0$)。入射対象に対しても次数0の入射分解を使うと $R^nG(M)=0$ ($n>0$)。
<!-- proof-end -->

## 6. Ext を手で計算する

固定した第二引数 $N$ に対して、第一引数の射影分解を使う。反変性のため矢印は反転する。ここでは符号の混乱を避けるため、対象 $N$ を次数0に固定し、前合成そのものを微分とする規約を用いる。

<a id="def-catb7-05-ext"></a>

<!-- formal-statement-start -->
> **定義（Ext）**
>
> 十分な射影対象を持つ局所小なアーベル圏 $\mathcal A$ の対象 $M,N$ と $M$ の射影分解 $P$ に対し、整数 $n\ge0$ で

$$
C^n=\operatorname{Hom}_{\mathcal A}(P^{-n},N),
\qquad \partial^n(a)=a\,d_P^{-n-1}
$$

> と置き、$C^n=0$ ($n<0$) とする。このアーベル群の余鎖複体のコホモロジーを

$$
\operatorname{Ext}_{\mathcal A}^n(M,N)=H^n(C)
$$

> とする。
<!-- formal-statement-end -->

$\partial^{n+1}\partial^n(a)=a d_P^{-n-1}d_P^{-n-2}=0$。比較写像 $u:P\to Q$ は前合成で反対向きの余鎖写像を誘導する。差が $d_Qh+hd_P$ なら、次数 $n$ のホモトピーを $a\mapsto a h^{1-n}$（値は $\operatorname{Hom}(P^{1-n},N)$）とすれば、二項の和が $a(u^{-n}-v^{-n})$ になる。従って[分解の比較定理](#thm-catb7-05-comparison)により選択独立性と第一変数での反変関手性が得られる。第二変数は後合成で共変であり、前合成と後合成は結合律によって可換する。次数0では $\ker\partial^0$ は $d_P^{-1}$ 上零になる射全体だから、余核 $M$ を経由する。従って $\operatorname{Ext}^0(M,N)\cong\operatorname{Hom}(M,N)$。

<!-- definition-example-start: def-catb7-05-ext -->
**定義の確認**。$M=\mathbb Z/m\mathbb Z$、$N=\mathbb Z$ とする。既に完全性と射影性を検証した[射影分解](#def-catb7-05-projective-resolution)を使う。$\operatorname{Hom}_{\mathbb Z}(\mathbb Z,\mathbb Z)\cong\mathbb Z$ は1の像を取る同型であり、$a(1)=t$ なら $a(m)=mt$。従って $C^0=C^1=\mathbb Z$、$\partial^0=m$、$C^n=0$ ($n\ne0,1$)。微分の二乗零は次の微分が零なので成立する。

$$
\operatorname{Ext}_{\mathbb Z}^0(M,\mathbb Z)=0,
\qquad
\operatorname{Ext}_{\mathbb Z}^1(M,\mathbb Z)=\mathbb Z/m\mathbb Z.
$$

$n\ge2$ の値は零である。冒頭で失われた全射性を、次数1の商として回収した。
<!-- definition-example-end -->

<a id="thm-catb7-05-cyclic-ext"></a>

<!-- formal-statement-start -->
> **定理（巡回整数加群のExt）**
>
> 整数 $m\ge2$ と任意の整数加群 $N$ に対して、$N[m]=\{x\in N:mx=0\}$ と置くと

$$
\operatorname{Ext}_{\mathbb Z}^0(\mathbb Z/m\mathbb Z,N)\cong N[m],
$$

$$
\operatorname{Ext}_{\mathbb Z}^1(\mathbb Z/m\mathbb Z,N)\cong N/mN,
$$

> かつ $n\ge2$ で $\operatorname{Ext}_{\mathbb Z}^n(\mathbb Z/m\mathbb Z,N)=0$ である。
<!-- formal-statement-end -->

同じ分解を保ったまま第二変数を変えれば、計算は $N$ 上の $m$ 倍写像の核と余核になる。

<!-- proof-start -->
### 証明

$P^{-1}=P^0=\mathbb Z$、$d_P^{-1}=m$ の[射影分解](#def-catb7-05-projective-resolution)を取る。[Ext](#def-catb7-05-ext)の複体は各 $\operatorname{Hom}_{\mathbb Z}(\mathbb Z,N)$ を1の像で $N$ と同一視すると

$$
0\to N\xrightarrow{m}N\to0
$$

である。実際 $a\mapsto a d_P^{-1}$ の1での値は $a(m)=ma(1)$。次数0では直前の像が零、次数1では次の微分の核が $N$ 全体だから、コホモロジーはそれぞれ $\ker(m:N\to N)=N[m]$ と $N/\operatorname{im}(m:N\to N)=N/mN$。残りの次数は複体の成分が零なのでコホモロジーも零。
<!-- proof-end -->

## 7. 導来圏の射との関係

前講の導来圏で分解を使えば、逆射を含む roof を普通の余鎖写像に置換できる。ここで重要なのは分解が上に有界（十分大きな次数で零）であることと、各項が射影対象であることである。全次数で射影対象というだけでは以下の降順帰納法を開始できない。

<a id="lem-catb7-05-projective-acyclic"></a>

<!-- formal-statement-start -->
> **補題（上に有界な射影複体からの写像）**
>
> アーベル圏の上に有界な余鎖複体 $P$ の各成分が射影対象であるとする。全次数のコホモロジーが零である複体 $A$ への任意の余鎖写像 $f:P\to A$ は零写像と余鎖ホモトピーである。
<!-- formal-statement-end -->

<!-- proof-start -->
### 証明

$P^n=0$ ($n>k$) とし、$h^{k+1}=0$ から始める。$d_A^kf^k=f^{k+1}d_P^k=0$ なので $f^k$ は $\ker d_A^k$ を経由する。$H^k(A)=0$ より $A^{k-1}\to\ker d_A^k$ はエピ射、$P^k$ は射影対象なので $d_A^{k-1}h^k=f^k$ とできる。

次数 $n+1$ まで $f^{n+1}=d_A^nh^{n+1}+h^{n+2}d_P^{n+1}$ を作ったとき

$$
d_A^n(f^n-h^{n+1}d_P^n)
=h^{n+2}d_P^{n+1}d_P^n=0.
$$

従って残差は $\ker d_A^n$ を経由し、$H^n(A)=0$ と射影性によって $d_A^{n-1}h^n=f^n-h^{n+1}d_P^n$ とできる。降順帰納法で全成分のホモトピー式を得る。
<!-- proof-end -->

<a id="thm-catb7-05-derived-hom"></a>

<!-- formal-statement-start -->
> **定理（分解による導来圏のHom計算）**
>
> 上に有界な射影対象の複体 $P$ と任意の複体 $X$ に対して、局所化関手は自然な同型

$$
\operatorname{Hom}_{K(\mathcal A)}(P,X)
\cong\operatorname{Hom}_{D(\mathcal A)}(P,X)
$$

> を誘導する。特に十分な射影対象を持つアーベル圏の対象 $M,N$ と $n\ge0$ に対し、

$$
\operatorname{Ext}^n_{\mathcal A}(M,N)
\cong\operatorname{Hom}_{D(\mathcal A)}(M[0],N[n]).
$$
<!-- formal-statement-end -->

見取り図：擬同型の写像錐のコホモロジーは零である。[上に有界な射影複体からの写像](#lem-catb7-05-projective-acyclic)を使うと、錐への写像が零になるという事実から分母に沿う持ち上げを作れる。

<!-- proof-start -->
### 証明

擬同型 $s:U\to V$ を取り、$f:P\to V$ を余鎖写像とする。[写像錐による擬同型判定](../CATB7-03/index.md#thm-catb7-03-cone-test)で $E=\operatorname{Cone}(s)$ は全次数でコホモロジーが零である。$V\to E$ を標準包含とする。上の補題で $(f,0):P\to E$ は零とホモトピーになる。ホモトピーの成分を $(a^n,b^n):P^n\to V^{n-1}\oplus U^n$ と置く。[写像錐](../CATB7-02/index.md#def-catb7-02-cone)の微分を代入すると

$$
f^n=d_V^{n-1}a^n+s^nb^n+a^{n+1}d_P^n,
$$

$$
0=-d_U^nb^n+b^{n+1}d_P^n.
$$

第二式で $b:P\to U$ は余鎖写像、第一式で $f-sb$ は零とホモトピーになる。従って $s$ との後合成はホモトピー類の集合で全射。

単射性も確認する。$b:P\to U$ が $sb=da+ad_P$ を満たすとする。$E[-1]^n=V^{n-1}\oplus U^n$ の微分は $(-d_Va-sb,d_Ub)$ の形である。そこで $c^n=(-a^n,b^n)$ と置くと、第一成分は $d_Va-sb=-ad_P$、第二成分は $d_Ub=bd_P$ となり、$c:P\to E[-1]$ は余鎖写像である。$E[-1]$ もコホモロジーが零なので $c$ は零とホモトピーになる。第二成分への射影 $E[-1]\to U$ は余鎖写像だから $b$ も零とホモトピーになる。従って後合成は単射である。

ここで $V=P$ とし、導来圏の任意の roof $P\xleftarrow{s}U\xrightarrow{g}X$ を取る。上の全射性を $f=1_P$ に適用して $sb=1_P$ となるホモトピー類 $b:P\to U$ を得る。局所化では $Q(b)=Q(s)^{-1}$ なので roof は $Q(gb)$ となる。逆に余鎖写像 $f:P\to X$ が局所化で零なら、[roofと共通細分](../CATB7-03/index.md#def-catb7-03-roof)によって擬同型 $s:U\to P$ で $fs=0$ となるホモトピー類がある。$sb=1_P$ を使えば $f=fsb=0$。加法性から一般の二射の等しさも零との差で判定できる。

$M$ の射影分解 $P\to M[0]$ は[分解の存在と擬同型](#thm-catb7-05-resolution-existence)により導来圏の同型である。$N[n]$ は次数 $-n$ だけに $N$ があるので、余鎖写像 $P\to N[n]$ は $a:P^{-n}\to N$ で $a d_P^{-n-1}=0$ となるものに対応する。二写像の差がホモトピーである条件は $a-a'=h^{-n+1}d_P^{-n}$。これは[Ext](#def-catb7-05-ext)の余境界そのものである。従って主張の同型が得られ、比較写像との前合成および $N$ の射との後合成から自然性が従う。
<!-- proof-end -->

### 7.1 入射分解との関係と仮定の境界

入射対象の下に有界な複体 $I$ について、コホモロジーが全て零の複体 $A$ からの余鎖写像 $A\to I$ は零とホモトピーになる。これは上の補題を反対圏で、次数 $n$ を $-n$ に反転して適用した結果である。実際、微分は元の $d^{-n-1}$ の反対射となり、ホモトピー成分 $h^{-n+1}$ の反対射が次数を1下げる。核と余核、モノとエピが交換され、下に有界という条件は上に有界という条件に変わる。

同じ反対圏への変換を[分解による導来圏のHom計算](#thm-catb7-05-derived-hom)の第一の同型へ適用できる。局所化の普遍性によって反対圏で擬同型を逆にした圏は元の導来圏の反対圏と同値である（反対を取る操作は擬同型を逆にする関手同士を対応させる）。従って $\operatorname{Hom}_K(X,I)\to\operatorname{Hom}_D(X,I)$ も同型となる。

十分な射影対象と十分な入射対象をともに持つとき、$N[0]\to I$ は導来圏の同型であり、$I[n]$ は下に有界な入射複体である。従って

$$
\operatorname{Ext}^n(M,N)\cong
\operatorname{Hom}_D(M[0],I[n])
\cong\operatorname{Hom}_K(M[0],I[n]).
$$

最後の群では余鎖写像は $a:M\to I^n$ で $(-1)^nd_I^na=0$ となるもの、ホモトピー差は $(-1)^nd_I^{n-1}h$ となるものに対応する。符号は核と像を変えないので

$$
\operatorname{Ext}^n(M,N)\cong
H^n(\operatorname{Hom}_{\mathcal A}(M,I)).
$$

ここで微分は $a\mapsto d_I^na$ である。従って固定した $M$ に対する左完全関手 $\operatorname{Hom}(M,-)$ の右導来関手でも Ext を計算できる。十分な入射対象だけがある場合、この後者を Ext の定義として採用できる。

この講の導来関手は対象の分解を用いる古典的な構成である。任意の非有界複体への導来関手の構成や、連接層（局所的に有限表示などの有限性条件を持つ加群の層）の圏に十分な入射対象があるという主張はしていない。層に応用するときは、まず周囲の加群の層の圏で入射分解の存在を確認し、連接層の複体からの包含が完全性・擬同型を保つか、導来圏間の比較が充満忠実か、必要なコホモロジーの有限性を保つかを別途検証する。対象の有限性が分解の各項に自動的に引き継がれるわけではない。

## 8. 演習

### CATB7-05-A01 射影性の確認

- Level: A

整数加群 $\mathbb Z^2$ は射影対象であることを持ち上げの定義から確認せよ。

<!-- solution-start -->
全射 $e:X\to Y$ と $a:\mathbb Z^2\to Y$ を取る。標準基底 $(1,0),(0,1)$ の像を $y_1,y_2$ と置く。全射性から $e(x_i)=y_i$ となる $x_i\in X$ を選べる。$b(s,t)=sx_1+tx_2$ と定めれば加法性を持ち、$eb(s,t)=sy_1+ty_2=a(s,t)$ である。従って[射影対象](#def-catb7-05-projective)の条件が成立する。
<!-- solution-end -->

### CATB7-05-A02 入射性が壊れる例

- Level: A

$\mathbb Z/2\mathbb Z$ は整数加群の圏で入射対象でないことを、包含 $2\mathbb Z\subset\mathbb Z$ を用いて示せ。

<!-- solution-start -->
$2k\mapsto[k]_2$ は $2\mathbb Z$ 上の加法的写像である。もし[入射対象](#def-catb7-05-injective)の条件により $\mathbb Z$ 全体へ延長 $b$ があれば、$b(2)=2b(1)=0$ である。しかしもとの写像は2を $[1]_2$ に送る。これは矛盾である。失われるのはモノ射に沿う延長の存在であり、単に延長の一意性ではない。
<!-- solution-end -->

### CATB7-05-A03 分解と次数

- Level: A

$P^{-1}=P^0=\mathbb Z$、微分を7倍とした複体が $\mathbb Z/7\mathbb Z$ の射影分解になることを確認し、$H^{-1}(P),H^0(P)$ を求めよ。

<!-- solution-start -->
両成分は自由加群なので[射影対象](#def-catb7-05-projective)。7倍は単射で、像 $7\mathbb Z$ は剰余射の核であり、剰余射は全射である。他の成分は零なので増大列の完全性も成立する。[射影分解](#def-catb7-05-projective-resolution)の条件を満たす。$H^{-1}(P)=\ker(7)/0=0$、$H^0(P)=\mathbb Z/7\mathbb Z$。増大列は完全だが、増大先を除いた複体の次数0のコホモロジーは元の対象である。
<!-- solution-end -->

### CATB7-05-A04 巡回群のExt

- Level: A

$\operatorname{Ext}^n_{\mathbb Z}(\mathbb Z/6\mathbb Z,\mathbb Z/9\mathbb Z)$ を全ての $n\ge0$ について求めよ。

<!-- solution-start -->
[巡回整数加群のExt](#thm-catb7-05-cyclic-ext)に $m=6,N=\mathbb Z/9\mathbb Z$ を代入する。$6x\equiv0\bmod9$ は $3\mid x$ と同値なので核は $\{0,3,6\}$、位数3の巡回群である。6倍写像の像も $\{0,3,6\}$ であり、余核は剰余類を3で分類する群 $\mathbb Z/3\mathbb Z$。従って $n=0,1$ の値はともに $\mathbb Z/3\mathbb Z$ と同型、$n\ge2$ は零である。
<!-- solution-end -->

### CATB7-05-B01 比較写像の非一意性

- Level: B

$\mathbb Z/5\mathbb Z$ の二項射影分解からそれ自身への、恒等射を持ち上げる余鎖写像を全て求め、互いにホモトピーになることを成分で示せ。

<!-- solution-start -->
次数0の写像は整数 $a$ 倍、次数 $-1$ は整数 $b$ 倍である。増大射との可換性から $a\equiv1\bmod5$。余鎖写像条件は $5b=5a$ なので $b=a$。従って両成分が $1+5k$ 倍 ($k\in\mathbb Z$) であるもの全てが持ち上げである。$k,\ell$ の差は両成分で $5(k-\ell)$ 倍。$h^0:P^0\to P^{-1}$ を $k-\ell$ 倍とすると、次数0では $d^{-1}h^0=5(k-\ell)$、次数 $-1$ では $h^0d^{-1}=5(k-\ell)$。他の成分は零である。従って[分解の比較定理](#thm-catb7-05-comparison)の一意性を具体的に確認できた。
<!-- solution-end -->

### CATB7-05-B02 左導来関手と完全性

- Level: B

$F(A)=A/4A$ とし、$\mathbb Z/6\mathbb Z$ での $L_0F,L_1F$ を計算せよ。$n\ge2$ についても答えよ。

<!-- solution-start -->
第5節で確認した右完全性は $m=4$ の場合にも成立する。[左右導来関手](#def-catb7-05-derived-functor)の定義に従い、6倍の二項射影分解へ $F$ を適用する。次数 $-1,0$ に $\mathbb Z/4\mathbb Z$ があり、微分は6倍、すなわち2倍となる。核は $\{0,2\}$ なので $L_1F\cong\mathbb Z/2\mathbb Z$。像も $\{0,2\}$ なので $L_0F\cong\mathbb Z/2\mathbb Z$。実際 $(\mathbb Z/6\mathbb Z)/4(\mathbb Z/6\mathbb Z)$ では4の生成する部分群が $\{0,2,4\}$ であり、商は位数2である。他の負次数は零なので $n\ge2$ の値は零。
<!-- solution-end -->

### CATB7-05-B03 入射分解での計算

- Level: B

体 $k$ 上のベクトル空間の圏で固定した空間 $U$ に対する $G(V)=\operatorname{Hom}_k(U,V)$ の右導来関手を求めよ。値は $k$ ベクトル空間とする。

<!-- solution-start -->
$G$ は加法的であり、単射との後合成は単射、像と核の一致は核の普遍性から従うので左完全である。全てのベクトル空間は[入射対象](#def-catb7-05-injective)の例で確認した通り入射対象である。従って $V\to V$ を恒等射とし、次数0に $V$ だけを置いた入射分解が使える。$G(I)$ は次数0に $\operatorname{Hom}_k(U,V)$ がある複体で、微分は全て零。よって $R^0G(V)=\operatorname{Hom}_k(U,V)$、$n>0$ では $R^nG(V)=0$ となる。
<!-- solution-end -->

### CATB7-05-B04 第一変数の反変性

- Level: B

剰余射 $f:\mathbb Z/6\mathbb Z\to\mathbb Z/3\mathbb Z$ が誘導する $\operatorname{Ext}^1_{\mathbb Z}(-,\mathbb Z)$ の射を求めよ。

<!-- solution-start -->
6倍の分解 $P$ から3倍の分解 $Q$ へ比較写像を作る。次数0を恒等射、次数 $-1$ を2倍とすれば $3\cdot2=1\cdot6$ で余鎖写像条件を満たす。次数0で剰余射との可換性も成立する。Ext の複体では次数1の写像は前合成で $a\mapsto a\circ2$ であり、整数で表せば2倍である。従って [Ext](#def-catb7-05-ext)の誘導射は

$$
\mathbb Z/3\mathbb Z\longrightarrow\mathbb Z/6\mathbb Z,
\qquad [t]_3\longmapsto[2t]_6.
$$

代表元を $t+3j$ に変えると像は $2t+6j$ となり同じ剰余類である。第一変数の射と逆向きであることに注意する。
<!-- solution-end -->

### CATB7-05-C01 完全三角形の第3射とExt

- Level: C

整数 $m\ge2$ に対して短完全列 $0\to\mathbb Z\xrightarrow{m}\mathbb Z\to\mathbb Z/m\mathbb Z\to0$ が作る完全三角形の第3射を求め、$\operatorname{Ext}^1_{\mathbb Z}(\mathbb Z/m\mathbb Z,\mathbb Z)$ のどの元に対応するか示せ。さらにこの短完全列が分裂しないことを独立に確かめよ。

<!-- solution-start -->
[短完全な複体の列からの完全三角形](../CATB7-04/index.md#thm-catb7-04-short-exact-triangle)において $A=B=\mathbb Z[0]$、第一射を $m$ 倍とする。写像錐 $P$ は次数 $-1,0$ の $\mathbb Z\xrightarrow{m}\mathbb Z$。剰余射 $\epsilon:P\to M[0]$ ($M=\mathbb Z/m\mathbb Z$) は[分解の存在と擬同型](#thm-catb7-05-resolution-existence)から擬同型である。錐から $\mathbb Z[1]$ への射 $p$ は次数 $-1$ の恒等射、他は零である。従って第3射は roof

$$
M[0]\xleftarrow{\epsilon}P\xrightarrow{p}\mathbb Z[1].
$$

[分解による導来圏のHom計算](#thm-catb7-05-derived-hom)で $P$ を使うと、対応する Ext の元は $p^{-1}=1_{\mathbb Z}$ の類である。微分は $\operatorname{Hom}(\mathbb Z,\mathbb Z)$ 上の $m$ 倍だから、その類は $[1]_m\in\mathbb Z/m\mathbb Z$。$m\ge2$ より零でなく、位数 $m$ の生成元となる。

独立に、短完全列が分裂すると剰余射の右逆 $s:M\to\mathbb Z$ が存在する。$s([1]_m)=t$ と置けば $mt=s(m[1]_m)=0$ なので $t=0$。しかし剰余射との合成が恒等射なら $[t]_m=[1]_m$ となるはずで矛盾する。従って分裂しない。ここでは個別の短完全列について非零の類と非分裂を確認したのであり、任意の拡大の分類定理を仮定したわけではない。
<!-- solution-end -->

## 9. まとめ

射影対象はエピ射に沿う持ち上げ、入射対象はモノ射に沿う延長を可能にする。十分な対象が存在するという条件の下で分解が得られ、比較定理によって分解の選択はホモトピーに吸収される。加法的関手を適用してからコホモロジーを取ると完全性の破れを測れる。Ext は射影分解の Hom 複体から計算でき、導来圏のシフトされた射と同じ情報を持つ。

次講では複体同士のテンソル積を扱う。微分の二乗を零にするため、次数に応じた符号をどう決めるかを考える。
