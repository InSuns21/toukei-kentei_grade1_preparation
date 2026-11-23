# ANF22 Hilbert類体・円分体とZ_p塔への橋

[イデアル類群](../ANF6/index.md#def-anf6-ideal-class-group)は「元の一意分解が壊れた程度」を測りました。[剰余類群とArtin対応](../ANF20/index.md#thm-anf20-ray-class-field)は、その有限商をAbel拡大のGalois群として読めるようにします。では、合同条件を課さないときに得られる拡大は何でしょうか。また、法を $p,p^2,p^3,\ldots$ と深くすると、有限群の列はどんな無限拡大を作るでしょうか。

本講はこの二つを、**類群に対応する非分岐Abel拡大**と**円分的 $\mathbb Z_p$ 塔（$p$ で分岐）**として対比します。有限類群、Kronecker–Weber定理、$p$ 進整数環が一つの道筋につながります。

以下、$K$ は数体、$\mathcal O_K$ は整数環、$\operatorname{Cl}(K)$ は非零分数イデアルを主分数イデアルで割った通常のイデアル類群、$h_K=|\operatorname{Cl}(K)|$ は類数とします。[有限性](../ANF6/index.md#thm-anf6-minkowski-class-bound)は既習です。Abel拡大のArtin写像は算術的Frobeniusを採用し、[大域相互法則・存在定理](../ANF20/index.md#thm-anf20-global-reciprocity)を既習の**外部の中心定理**として使用します。類体論そのものを以下の有限群計算で再証明したとはみなしません。

## 1. 合同条件を外したときの類体

有限素点が非分岐とは、上の各素イデアルで分岐指数が $1$ となることです。実素点が「そのまま残る」とは、その場所が複素素点にならないことです。[数体の法](../ANF20/index.md#def-anf20-modulus)の有限部分を単位イデアル $(1)$、無限部分を空集合にすると、余分な合同・符号条件はなくなります。この法の剰余類群は $\operatorname{Cl}(K)$ です。

<a id="def-anf22-hilbert-class-field"></a>

<!-- formal-statement-start -->
> **定義（Hilbert類体）**  
> 数体 $K$ の Hilbert類体 $H_K$ とは、$K$ の有限Abel拡大であって、全ての有限素点で非分岐、全ての実素点で複素化を起こさず、これらの条件を満たす任意の有限Abel拡大を含む最大のものをいう。存在は大域類体論の存在定理による。
<!-- formal-statement-end -->

<!-- definition-example-start: def-anf22-hilbert-class-field -->
**定義の確認**。$K=\mathbb Q(i)$ の類数は[Minkowskiの類数1判定](../ANF6/index.md#cor-anf6-class-number-one)で $1$ です。[法 $(1)$ の存在定理](../ANF20/index.md#thm-anf20-ray-class-field)では、この体で許される最大Abel拡大のGalois群の位数は $1$ です。従って $H_K=K$ です。

この自明拡大は有限Abelで、どの有限素点でも分岐指数は $e=1$。実素点はありません。

同じ条件の任意のAbel拡大の次数も $1$ なので $K$ に含まれます。これで分岐条件と最大性をともに確認しました。
<!-- definition-example-end -->

<a id="thm-anf22-hilbert-class-correspondence"></a>

<!-- formal-statement-start -->
> **定理（Hilbert類体とイデアル類群）**  
> 数体 $K$ のHilbert類体 $H_K$ は同型を満たす。

$$
\operatorname{Art}_{H_K/K}:\operatorname{Cl}(K)
\xrightarrow{\ \sim\ }\operatorname{Gal}(H_K/K).
$$
>
> 特に $[H_K:K]=h_K$ であり、$K$ の任意の有限Abel拡大で全有限素点が非分岐、全実素点が実のままのものは $H_K$ に含まれる。
<!-- formal-statement-end -->

### 証明の見取り図

法 $(1)$ の剰余類群と通常類群が等しいことを確かめ、[剰余類体の存在・一意性](../ANF20/index.md#thm-anf20-ray-class-field)をこの法に適用します。極大性には、中間体に対応する開部分群の包含を使います。

<!-- proof-start -->
### 証明

[剰余類群の定義](../ANF20/index.md#def-anf20-ray-class)で $\mathfrak m=(1)$ とすると、法の有限部分と素な分数イデアルの群は全非零分数イデアル $I_K$、合同条件を満たす主イデアルの群は全主分数イデアル $P_K$ です。従って

$$
\operatorname{Cl}_{(1)}(K)=I_K/P_K=\operatorname{Cl}(K).
$$

[剰余類体存在定理](../ANF20/index.md#thm-anf20-ray-class-field)はこの商をGalois群に同型にする有限Abel拡大 $H_K/K$ を与えます。法 $(1)$ の有限成分の局所部分群は各 $\mathcal O_{K_v}^{\times}$、無限成分は各 $K_v^\times$ です。従ってArtin写像は有限局所単数を消し、有限素点の惰性群も自明、実素点の局所Galois群も自明です。

逆に、二条件を満たす有限Abel拡大 $L/K$ の局所Artin写像は、有限素点の単数群と実素点の全乗法群を消します。

[剰余類群への下降判定](../ANF21/index.md#prop-anf21-descent-criterion)を適用します。対角元の消滅は[大域Artin相互法則](../ANF20/index.md#thm-anf20-global-reciprocity)によるので、$L/K$ のArtin写像は $\operatorname{Cl}_{(1)}(K)$ を経由します。

類体対応で、その核を定める部分群を $H'\subseteq\operatorname{Cl}(K)$ とします。自明部分群 $\{1\}\subseteq H'$ に対応する最大の法 $(1)$ の類体が $H_K$ です。

類体対応では部分群の包含が体の包含を逆転するので、$L\subseteq H_K$ となります。

最後にArtin同型から $[H_K:K]=|\operatorname{Gal}(H_K/K)|=|\operatorname{Cl}(K)|=h_K$ となります。
<!-- proof-end -->

「全有限素点で非分岐」**だけ**では、実素点の複素化を許す場合があります。実素点に符号条件を付けた法の類体は狭義Hilbert類体で、対応する群は狭義類群です。通常の $\operatorname{Cl}(K)$ と狭義類群を無条件に同一視しません。

## 2. 主イデアルを素点の分解から見抜く

<a id="prop-anf22-principal-splitting"></a>

<!-- formal-statement-start -->
> **命題（主素イデアルと完全分解）**  
> 数体 $K$ のHilbert類体 $H_K$ と $K$ の任意の非零素イデアル $\mathfrak p$ に対し、

$$
\mathfrak p\ \text{が主イデアル}
\quad\Longleftrightarrow\quad
\mathfrak p\ \text{が }H_K/K\text{ で完全分解する}.
$$
>
> 一般に $\mathfrak p$ の類の位数が剰余次数 $f$ であり、その上の素点数は $h_K/f$ である。
<!-- formal-statement-end -->

### 証明の見取り図

全有限素点は非分岐なので、Frobeniusの位数が剰余次数です。その元をArtin同型でイデアル類へ戻します。

<!-- proof-start -->
### 証明

[Hilbert類体と類群の同型](#thm-anf22-hilbert-class-correspondence)は素イデアル類 $[\mathfrak p]$ を算術的Frobenius $\operatorname{Frob}_{\mathfrak p}$ に送ります。単射なので

$$
[\mathfrak p]=1
\Longleftrightarrow \operatorname{Frob}_{\mathfrak p}=1.
$$

左辺は主イデアルの定義そのものです。[非分岐素点の分解とFrobeniusの位数](../ANF21/index.md#prop-anf21-frobenius-order)より右辺は完全分解と同値です。さらに同公式で

$$
f=\operatorname{ord}(\operatorname{Frob}_{\mathfrak p})
 =\operatorname{ord}([\mathfrak p]),\qquad
g=[H_K:K]/f=h_K/f
$$

となります。全素点で非分岐なので $e=1$ も確かめられます。
<!-- proof-end -->

**直接計算：$\mathbb Q(\sqrt{-5})$。** [既習の類群計算](../ANF6/index.md#thm-anf6-q-sqrt-minus-five-class-group)から $h_K=2$、従って $[H_K:K]=2$ です。$\mathcal O_K=\mathbb Z[\sqrt{-5}]$ とし、

$$
\mathfrak p=(3,1+\sqrt{-5}).
$$

$X^2+5\equiv X^2-1=(X-1)(X+1)\pmod3$ なので、$\mathfrak p$ はノルム $3$ の素イデアルです。これが主ならある $a,b\in\mathbb Z$ で

$$
|N_{K/\mathbb Q}(a+b\sqrt{-5})|
=a^2+5b^2=3
$$

となります。しかし $b=0$ なら $a^2=3$、$|b|\ge1$ なら左辺は $5$ 以上で不可能です。よって $\mathfrak p$ は非主、類は位数 $2$、Frobeniusも位数 $2$。従って $\mathfrak p$ は $H_K/K$ で惰性し、$f=2,g=1$ です。$H_K$ を根号で明示しなくても分解が判定できました。

## 3. 有理数体のAbel拡大はなぜ円分体に現れるか

$\zeta_m=e^{2\pi i/m}$ を原始 $m$ 乗根、$E_m=\mathbb Q(\zeta_m)$ とします。$m\ge2$ のとき $\sigma_a(\zeta_m)=\zeta_m^a$（$a$ は $m$ と互いに素）はGalois自己同型です。[円分多項式の既約性](../../../幾何系/SQC/SQC5/index.md#thm-sqc5-cyclotomic-irreducibility)から

$$
\operatorname{Gal}(E_m/\mathbb Q)
\simeq(\mathbb Z/m\mathbb Z)^\times,\qquad [E_m:\mathbb Q]=\varphi(m).
$$

[有理数体の法と剰余類群](../ANF20/index.md#prop-anf20-ray-q)の議論を $m$ に拡張すると、正の有理数で代表元を選べるため

$$
\operatorname{Cl}_{(m)\infty}(\mathbb Q)
\simeq(\mathbb Z/m\mathbb Z)^\times.
$$

この同型で素数 $\ell\nmid m$ の類は $\overline\ell$ です。一方、$E_m$ でのFrobeniusは $\zeta_m\mapsto\zeta_m^\ell$。すなわち、二つの群で素数の作用が一致します。

<a id="thm-anf22-kronecker-weber-route"></a>

<!-- formal-statement-start -->
> **定理（Kronecker–Weber定理と類体論からの帰結）**  
> $\mathbb Q$ の任意の有限Abel拡大 $L/\mathbb Q$ に対して、ある整数 $m\ge2$ が存在して

$$
L\subseteq\mathbb Q(\zeta_m)
$$
>
> が成り立つ。さらに $\mathbb Q(\zeta_m)$ は、法 $(m)\infty$ に対応する $\mathbb Q$ の剰余類体である。
<!-- formal-statement-end -->

### 証明の見取り図

一般の大域類体論は $L$ のArtin写像を有限法へ下降させます。有理数体では法を $(m)\infty$ に拡大できます。法 $(m)\infty$ の全類体が円分体であることを、群とFrobeniusで確認します。

<!-- proof-start -->
### 証明（大域類体論を入力とする導出）

まず[円分多項式の既約性](../../../幾何系/SQC/SQC5/index.md#thm-sqc5-cyclotomic-irreducibility)と[円分体のGalois群](../../../幾何系/SQC/SQC5/index.md#prop-sqc5-cyclotomic-galois)を用います。また整数環での非分岐条件（$\ell\nmid m$）と、非分岐素数での等式 $\operatorname{Frob}_\ell(\zeta_m)=\zeta_m^\ell$ を使います。この入力により

$$
\operatorname{Cl}_{(m)\infty}(\mathbb Q)
\longrightarrow\operatorname{Gal}(E_m/\mathbb Q),
\qquad \overline a\longmapsto\sigma_a
$$

は、双方の位数が $\varphi(m)$ である群同型です。正の整数 $a$ が $m$ と互いに素なら、素因数 $\ell$ ごとのArtin積は $\sigma_a$ となります。従ってこれは大域Artin写像と一致します。[類体の一意性](../ANF20/index.md#thm-anf20-ray-class-field)により $E_m$ は法 $(m)\infty$ の類体です。

次に有限Abel拡大 $L/\mathbb Q$ を取ります。[Artin積を消す有限法の存在](../ANF21/index.md#prop-anf21-modulus-exists)によって法を選びます。[大域Artin相互法則](../ANF20/index.md#thm-anf20-global-reciprocity)で、$L$ のArtin写像はこの法の剰余類群へ下降します。

有理数体では、法の有限部分は $(m)$ と書けます。必要なら $m\ge2$ に増やし、実素点を加えた法 $(m)\infty$ を選べます。

法を強くすると対応する局所単数部分群は小さくなるため、Artin写像の下降は保たれます。従って $L$ は、法 $(m)\infty$ の全類体 $E_m$ に含まれます。

この証明は一般の大域類体論と[円分多項式の既約性](../../../幾何系/SQC/SQC5/index.md#thm-sqc5-cyclotomic-irreducibility)を入力にしています。前講で明示した大域相互法則・存在定理の深い証明責務を解消したものではありません。
<!-- proof-end -->

**確認例。** $E_5=\mathbb Q(\zeta_5)$ では群位数 $4$ で、[実二次部分体と法](../ANF21/index.md#prop-anf21-real-subfield)から $\mathbb Q(\sqrt5)$ は法 $(5)$ の類体です。複素共役 $\sigma_{-1}$ を固定すると実部分体になり、法から実の符号条件を外すことに対応します。

## 4. 円分体の次数が $p$ ごとに増える理由

$p$ を素数、$r\ge1$ とし、$\Phi_{p^r}(T)$ を原始 $p^r$ 乗根の[円分多項式](../../../幾何系/SQC/SQC5/index.md#def-sqc5-cyclotomic)とします。ここでは円分塔を組み立てるのに必要な $p$ 冪の場合の次数公式を、Eisenstein判定法で直接確かめます。

<a id="prop-anf22-prime-power-degree"></a>

<!-- formal-statement-start -->
> **命題（素数冪円分体の次数）**  
> 素数 $p$ と整数 $r\ge1$ について、

$$
[\mathbb Q(\zeta_{p^r}):\mathbb Q]
=\varphi(p^r)=p^{r-1}(p-1).
$$
>
> さらに $p$ は $\mathbb Q(\zeta_{p^r})/\mathbb Q$ で完全分岐する。
<!-- formal-statement-end -->

### 証明の見取り図

$\Phi_{p^r}(1+X)$ は定数項が $p$ で、最高次以外の全係数が $p$ の倍数です。$X=\zeta_{p^r}-1$ を根とするEisenstein多項式となり、次数と $p$ 進局所拡大の分岐指数を同時に与えます。

<!-- proof-start -->
### 証明

円分多項式の等式

$$
\Phi_{p^r}(T)=\frac{T^{p^r}-1}{T^{p^{r-1}}-1}
=\sum_{j=0}^{p-1}T^{j p^{r-1}}
$$

を使います。$D=p^{r-1}(p-1)$ と置くと、$\Phi_{p^r}(1+X)$ は次数 $D$ の首一多項式で、定数項は $\Phi_{p^r}(1)=p$ です。$\mathbb F_p[X]$ では $(1+X)^p$ の中間二項係数が全て $p$ の倍数なので $(1+X)^p=1+X^p$ です。この操作を $r-1$ 回繰り返すと $(1+X)^{p^{r-1}}=1+X^{p^{r-1}}$ となります。これを使うと

$$
\Phi_{p^r}(1+X)
\equiv\sum_{j=0}^{p-1}(1+X^{p^{r-1}})^j
\equiv X^{p^{r-1}(p-1)}=X^D\pmod p.
$$

最後の等式は $\mathbb F_p[Y]$ で $\sum_{j=0}^{p-1}(1+Y)^j=Y^{p-1}$ となることによります（$Y\sum(1+Y)^j=(1+Y)^p-1=Y^p$）。よって定数項は $p$ で割れるが $p^2$ では割れず、他の非最高次係数も $p$ で割れます。Eisenstein判定法から $\Phi_{p^r}(1+X)$ は $\mathbb Q[X]$ 上既約です。変数を $X=T-1$ に戻して $\Phi_{p^r}(T)$ も既約、従って次数は $D$ です。

さらに $\pi=\zeta_{p^r}-1$ は $p$ 進局所体でEisenstein元です。[Eisenstein拡大の整数環・付値](../ANF10/index.md#thm-anf10-eisenstein-extension)により $p$ 上の局所拡大は次数 $D$、分岐指数 $D$、剰余次数 $1$ です。局所次数が大域次数と一致するので $p$ の上の素点は一つで、完全分岐です。
<!-- proof-end -->

この証明から $r$ を一つ増やすと次数は $p$ 倍です。

$p$ 以外の素数 $\ell$ が非分岐である理由も確認します。$\ell\ne p$ なら $p^r$ は $\mathbb F_\ell$ で非零なので、

$$
\gcd(T^{p^r}-1,\ p^rT^{p^r-1})=1
\quad\text{in }\mathbb F_\ell[T].
$$

従って $T^{p^r}-1$ の因子である $\Phi_{p^r}(T)$ も法 $\ell$ で重根を持たず、その多項式判別式は $\ell$ で割り切れません。$E=\mathbb Q(\zeta_{p^r})$ と置くと、先ほどの次数 $D$ と[判別式と指数の平方則](../ANF2/index.md#thm-anf2-discriminant-index)から

$$
\operatorname{disc}(1,\zeta_{p^r},\ldots,\zeta_{p^r}^{D-1})
=[\mathcal O_E:\mathbb Z[\zeta_{p^r}]]^2D_E
$$

です。左辺が $\ell$ で割れないので、$\ell$ は整数環の指数も割りません。従って $\ell$ で局所化すれば、整数環と部分環 $\mathbb Z[\zeta_{p^r}]$ は一致します。[単項生成の場合の素イデアル分解](../ANF4/index.md#thm-anf4-monogenic-factorization)の証明をこの局所環に適用すると、多項式に重根がないので各分岐指数は $e=1$ です。

これで $p$ の完全分岐性と、他の素数の非分岐性の両方を次の塔に利用できます。

## 5. $p$ 冪円分体から $\mathbb Z_p$ 塔を取り出す

[前講の $\mathbb Z_p$ と逆極限の同型](../ANF9/index.md#thm-anf9-inverse-limit-isomorphism)は

$$
\mathbb Z_p\simeq\varprojlim_n\mathbb Z/p^n\mathbb Z
$$

でした。有限次数が $1,p,p^2,\ldots$ となるGalois拡大を、制限写像でつないでこの群を実現します。$p$ が奇数の場合、円分体には余分な位数 $p-1$ の部分群があるので、まずそこを固定します。

無限Galois拡大では、有限Galois中間体 $L/K$ ごとの制限写像から位相を定めます。群の単位元にどんな近傍を取るかを決めれば、有限段で一致する自己同型どうしが、無限段でもどれだけ近いかを説明できます。

<a id="def-anf22-krull-topology"></a>

<!-- formal-statement-start -->
> **定義（Krull位相）**  
> $E/K$ を（無限でもよい）Galois拡大、$G=\operatorname{Gal}(E/K)$ とする。$K\subseteq L\subseteq E$ を動く有限Galois中間拡大 $L/K$ に対し、$\operatorname{Gal}(E/L)$ を単位元の開近傍の基本系とする位相を、$G$ の **Krull位相** と呼ぶ。
<!-- formal-statement-end -->

この位相は有限段への制限写像から得られる逆極限位相と一致します。自己同型の列が単位元に近づくとは、どの有限Galois中間体 $L$ についても、十分先では $L$ の全元を固定することです。

<!-- definition-example-start: def-anf22-krull-topology -->
**定義の確認**。まず $E/K$ が有限Galois拡大なら $L=E$ を選べるため、$\operatorname{Gal}(E/L)=\{1\}$ が開近傍です。従ってこの場合のKrull位相は離散位相です。無限の場合も、各有限Galois中間体 $L$ への制限の核が $\operatorname{Gal}(E/L)$ なので、有限商を通して近傍を判定できます。
<!-- definition-example-end -->

<a id="def-anf22-zp-extension"></a>

<!-- formal-statement-start -->
> **定義（Z_p拡大）**  
> 数体 $K$ の無限Galois拡大 $K_\infty/K$ がZ_p拡大であるとは、そのGalois群がKrull位相を備えた位相群として次の同型を持つことをいう。

$$
\operatorname{Gal}(K_\infty/K)\simeq (\mathbb Z_p,+).
$$

> このとき、各 $n\ge0$ に対して、$K_\infty$ 内には $[K_n:K]=p^n$ となる一意の中間体 $K_n$ が存在する。
<!-- formal-statement-end -->

位相を付けない抽象群の同型ではなく、有限商の制限写像と両立することが重要です。

$\mathbb Z_p$ の指数 $p^n$ の閉部分群が $p^n\mathbb Z_p$ だけであることも確かめます。法 $p^n$ への還元の核と商は

$$
\ker(\mathbb Z_p\to\mathbb Z/p^n\mathbb Z)=p^n\mathbb Z_p,
\qquad |\mathbb Z_p/p^n\mathbb Z_p|=p^n
$$

です。逆に指数 $p^n$ の閉部分群 $H$ に対しては、位数 $p^n$ の商群 $\mathbb Z_p/H$ の全ての元が $p^n$ 倍で消えます。従って

$$
p^n\mathbb Z_p\subseteq H,\qquad
[\mathbb Z_p:H]=[\mathbb Z_p:p^n\mathbb Z_p]=p^n.
$$

二つの部分群は等しく、$H=p^n\mathbb Z_p$ に限ります。Galois対応でこの閉部分群の固定体を取ると、定義に付随する一意の中間体 $K_n$ とその次数 $p^n$ が得られます。

**奇数 $p$ の構成。** $E_n=\mathbb Q(\zeta_{p^{n+1}})$ とします。群

$$
G_n=\operatorname{Gal}(E_n/\mathbb Q)
\simeq(\mathbb Z/p^{n+1}\mathbb Z)^\times
$$

には、$p-1$ 乗して $1$ になる元の群 $\Delta_n$ があります。$\Delta_n$ は法 $p$ への還元で $(\mathbb Z/p\mathbb Z)^\times$ に同型です。実際、各 $a\not\equiv0\pmod p$ は多項式 $X^{p-1}-1$ の単純根なので [Henselの補題](../ANF10/index.md#thm-anf10-hensel-simple)で法 $p^{n+1}$ へ一意に持ち上がります。

$$
|\Delta_n|=p-1,\qquad
G_n=\Delta_n\times U_n,\qquad
U_n=1+p\mathbb Z/p^{n+1}\mathbb Z.
$$

積分解の理由は、両群の位数が互いに素で交わりは $\{1\}$、積の位数が $|G_n|=(p-1)p^n$ に等しいからです。固定体を $F_n=E_n^{\Delta_n}$ と置きます。

<a id="thm-anf22-cyclotomic-zp-tower"></a>

<!-- formal-statement-start -->
> **定理（奇素数の円分的Z_p塔）**  
> 奇素数 $p$、$n\ge0$ に対し $F_n=\mathbb Q(\zeta_{p^{n+1}})^{\Delta_n}$ とすると、

$$
F_0=\mathbb Q\subset F_1\subset F_2\subset\cdots,\qquad
\operatorname{Gal}(F_n/\mathbb Q)\simeq\mathbb Z/p^n\mathbb Z.
$$
>
> $F_\infty=\bigcup_{n\ge0}F_n$ に対し、制限写像と両立する位相群同型

$$
\operatorname{Gal}(F_\infty/\mathbb Q)
\simeq\varprojlim_n\mathbb Z/p^n\mathbb Z
\simeq\mathbb Z_p
$$
>
> が成り立つ。$F_n/\mathbb Q$ は全実かつ $p$ で完全分岐する。
<!-- formal-statement-end -->

### 証明の見取り図

$G_n$ の $p$ 部分群 $U_n$ の位数は $p^n$ です。$1+p$ がこれを生成すること、円分体の包含で $\Delta_{n+1}$ が $\Delta_n$ に写ることを確かめます。

<!-- proof-start -->
### 証明

$\Delta_n$ の位数は $p-1$ だから、Galois対応で

$$
[F_n:\mathbb Q]=|G_n|/|\Delta_n|=p^n,\quad
\operatorname{Gal}(F_n/\mathbb Q)\simeq G_n/\Delta_n\simeq U_n.
$$

奇数 $p$ では二項定理から

$$
v_p((1+p)^{p^k}-1)=k+1\qquad(k\ge0)
$$

を帰納的に示せます。$k=0$ は $v_p(p)=1$。$x=(1+p)^{p^k}=1+p^{k+1}u$（$p\nmid u$）とすれば、$x^p-1=p^{k+2}u+\binom p2p^{2k+2}u^2+\cdots$ で、第一項の $p$ 進位数は $k+2$、他の項は少なくとも $k+3$ です。従って帰納が閉じます。

よって $1+p$ の法 $p^{n+1}$ での位数は $p^n$ で、$U_n$ を生成します。$G_n/\Delta_n$ の同型を、生成元 $1+p$ の剰余類を $1\in\mathbb Z/p^n\mathbb Z$ に対応させて選べます。

$E_n\subset E_{n+1}$ で、Galois群の制限 $G_{n+1}\to G_n$ は法 $p^{n+1}$ への還元です。[Henselの単純根の一意持ち上げ](../ANF10/index.md#thm-anf10-hensel-simple)により、$\Delta_{n+1}$ は $\Delta_n$ に写ります。従って固定体は $F_n\subseteq F_{n+1}$ を満たします。

商の制限写像は生成元 $1+p$ を次の段階の同じ元へ送ります。上の同型を使うと、これは

$$
\mathbb Z/p^{n+1}\mathbb Z\longrightarrow\mathbb Z/p^n\mathbb Z
$$

という還元写像です。無限Galois群は有限商の逆極限なので、[逆極限による $\mathbb Z_p$ の構成](../ANF9/index.md#thm-anf9-inverse-limit-isomorphism)から所望の位相群同型を得ます。

$p$ は奇数なので、位数 $p-1$ の群 $\Delta_n$ は位数 $2$ の元 $-1$ を含みます。この $-1$ は複素共役に対応し、$\Delta_n$ の固定体では自明に作用するので $F_n$ は全実です。[素数冪円分体の完全分岐](#prop-anf22-prime-power-degree)では $p$ の上の分解群が $G_n$ 全体です。固定体へ制限しても分解群は $G_n/\Delta_n$ 全体だから、$F_n$ でも $p$ は一つの素点のまま、$e=p^n$、$f=1$ です。
<!-- proof-end -->

<!-- definition-example-start: def-anf22-zp-extension -->
**定義の確認**。$p=3$ とすると、$E_0=\mathbb Q(\zeta_3)$、$\Delta_0=G_0=\{\pm1\}$ なので $F_0=\mathbb Q$。$E_1=\mathbb Q(\zeta_9)$ では $G_1\simeq(\mathbb Z/9\mathbb Z)^\times$ は位数 $6$、$\Delta_1=\{\pm1\}$ は位数 $2$、従って $[F_1:\mathbb Q]=3$ です。同じ操作を $27,81,\ldots$ と続けると上の定理から有限商は順に $\mathbb Z/3^n\mathbb Z$ で、制限写像は還元です。従ってその逆極限が位相群 $\mathbb Z_3$ に一致し、定義の無限Galois・位相群同型を両方満たします。
<!-- definition-example-end -->

## 6. $p=2$ の場合と分岐の違い

$p=2$ では $p-1=1$ として $1+2\mathbb Z/2^{n+1}\mathbb Z$ を上と同じように扱うことはできません。$(\mathbb Z/2^r\mathbb Z)^\times$ は $r\ge3$ で非巡回です。代わりに複素共役 $\{\pm1\}$ の固定体を取ります。

<a id="prop-anf22-two-adic-tower"></a>

<!-- formal-statement-start -->
> **命題（2進円分塔）**  
> $n\ge0$ に対して $E_n^{(2)}=\mathbb Q(\zeta_{2^{n+2}})$、$F_n^{(2)}=(E_n^{(2)})^{\{\pm1\}}$ とすると、

$$
F_n^{(2)}=\mathbb Q(\zeta_{2^{n+2}}+\zeta_{2^{n+2}}^{-1}),\qquad
\operatorname{Gal}(F_n^{(2)}/\mathbb Q)\simeq\mathbb Z/2^n\mathbb Z.
$$
>
> 合併のGalois群は位相群 $\mathbb Z_2$ に同型である。
<!-- formal-statement-end -->

### 証明の見取り図

$5$ は $(\mathbb Z/2^{n+2}\mathbb Z)^\times/\{\pm1\}$ を生成します。$5^{2^k}-1$ の2進付値を調べ、次数と制限の整合性を示します。

<!-- proof-start -->
### 証明

[素数冪円分体の次数](#prop-anf22-prime-power-degree)で $|G_n^{(2)}|=2^{n+1}$。複素共役 $\{\pm1\}$ の位数は $2$（$n=0$ でも $\mathbb Q(i)$ で同じ）だから、固定体の次数は $2^n$ です。

$k\ge0$ に対して

$$
v_2(5^{2^k}-1)=k+2
$$

が成り立ちます。$k=0$ では $5-1=4$。$x=5^{2^k}$ は $x\equiv1\pmod4$ なので、$x+1\equiv2\pmod4$、よって

$$
v_2(x^2-1)=v_2(x-1)+v_2(x+1)=(k+2)+1=k+3.
$$

従って $5$ の法 $2^{n+2}$ での位数は $2^n$。$5$ の冪はいずれも $1\pmod4$ である一方、$-1\equiv3\pmod4$ なので、$\langle5\rangle\cap\{\pm1\}=\{1\}$。二群の積の位数は $2^n\cdot2=|G_n^{(2)}|$ となり、商群は $5$ で生成される位数 $2^n$ の巡回群です。

円分体の包含で $5$ の剰余類は次の段階でも $5$ に写るので、有限群の制限写像は $\mathbb Z/2^{n+1}\mathbb Z\to\mathbb Z/2^n\mathbb Z$ の還元です。よって合併のGalois群はその逆極限 $\mathbb Z_2$ に一致します。
<!-- proof-end -->

全ての有限素点で **$e=1$（非分岐）** となるHilbert類体と違い、円分的 $\mathbb Z_p$ 塔の有限段 $F_n/\mathbb Q$（$n\ge1$）は $p$ で完全分岐します。したがって $\mathbb Q$ のHilbert類体ではありません。$\mathbb Q$ 自身の類数は $1$ でHilbert類体は $\mathbb Q$ のままです。

この違いが後続の岩澤理論で重要になります。有限塔の各段の類群を並べ、同じ素数 $p$ に関する類群の $p$ 部分が階層とともにどう成長するかを研究するために、まずGalois群を $\mathbb Z_p$ として固定したのです。

## 7. 演習：類群・Frobenius・円分塔をつなぐ

### A1. 類数1のHilbert類体

$K=\mathbb Q(i)$ が類数1であることを使い、$H_K$ の次数と分岐の条件を答えよ。

- Level: A
- ID: ANF22-A1

<!-- solution-start -->
**詳細解答**。[類数1判定](../ANF6/index.md#cor-anf6-class-number-one)から $\operatorname{Cl}(K)=1$。[Hilbert類体同型](#thm-anf22-hilbert-class-correspondence)を適用すると $[H_K:K]=1$ です。従って $H_K=K$。自明拡大は全ての有限素点で $e=f=1$、実素点も新たに複素化しないため、定義の分岐条件を満たします。
<!-- solution-end -->

### A2. 類数2で許される拡大次数

$K=\mathbb Q(\sqrt{-5})$ の類群が $C_2$ とする。Hilbert類体の次数とGalois群を求めよ。

- Level: A
- ID: ANF22-A2

<!-- solution-start -->
**詳細解答**。[具体的類群の計算](../ANF6/index.md#thm-anf6-q-sqrt-minus-five-class-group)から $h_K=2$ です。[類体同型](#thm-anf22-hilbert-class-correspondence)で $\operatorname{Gal}(H_K/K)\simeq C_2$、次数は $2$。非自明な唯一の元は位数 $2$ で、有限素点は全て非分岐です。
<!-- solution-end -->

### A3. ノルム3の素イデアル

$K=\mathbb Q(\sqrt{-5})$、$\mathfrak p=(3,1+\sqrt{-5})$ がノルム3の素イデアルで非主であることを示し、Hilbert類体での剰余次数を求めよ。

- Level: A
- ID: ANF22-A3

<!-- solution-start -->
**詳細解答**。$\mathcal O_K/\mathfrak p$ では $3=0$、$\sqrt{-5}=-1$ なので商は $\mathbb F_3$、よって素イデアルでノルム $3$ です。主なら $\mathfrak p=(a+b\sqrt{-5})$、ノルムの絶対値から $a^2+5b^2=3$。$b=0$ の場合は平方数 $3$ が現れず、$b\ne0$ なら左辺は $5$ 以上で矛盾します。従って非主です。類群は位数2だからその類の位数は2。[Frobenius分解命題](#prop-anf22-principal-splitting)で $f=2$、上の素イデアル数は $g=2/2=1$ です。
<!-- solution-end -->

### A4. $3$ 冪円分体の次数

$\mathbb Q(\zeta_3),\mathbb Q(\zeta_9),\mathbb Q(\zeta_{27})$ の $\mathbb Q$ 上の次数と、対応する $\Delta_n$ 固定体の次数を求めよ。

- Level: A
- ID: ANF22-A4

<!-- solution-start -->
**詳細解答**。[次数公式](#prop-anf22-prime-power-degree)に $p=3$、$r=1,2,3$ を代入すると $3^{r-1}(3-1)=2,6,18$ です。$\Delta_n$ は各段で位数 $2$ なので固定体の次数はそれぞれ $2/2=1$、$6/2=3$、$18/2=9$。従って $F_0=\mathbb Q$、$[F_1:\mathbb Q]=3$、$[F_2:\mathbb Q]=9$ です。
<!-- solution-end -->

### A5. 円分塔の素数と完全分解

$p=5$、$F_1=\mathbb Q(\zeta_{25})^{\Delta_1}$ とする。$\ell=2,101$ の $F_1/\mathbb Q$ での剰余次数を求めよ。

- Level: A
- ID: ANF22-A5

<!-- solution-start -->
**詳細解答**。$G_1=(\mathbb Z/25\mathbb Z)^\times$ は位数20、$\Delta_1$ は位数4、$G_1/\Delta_1$ は位数5です。$2^5=32\equiv7\pmod{25}$、$7^2=49\equiv-1$、$7^4\equiv1\pmod{25}$ なので $7\in\Delta_1$。一方 $2\notin\Delta_1$（$2^4=16\not\equiv1\pmod{25}$）です。従って $\overline2$ の商での位数は5、$\ell=2$ は非分岐かつ $f=5$。$101\equiv1\pmod{25}$ は商で単位元だから $f=1$、完全分解します。[非分岐Frobeniusの分解判定](../ANF21/index.md#prop-anf21-frobenius-order)を各素数へ適用しました。
<!-- solution-end -->

### B1. 類群の部分群から非分岐中間体へ

ある数体 $K$ の類群が $C_4=\langle c\rangle$ とする。Hilbert類体 $H_K$ の次数と、$\langle c^2\rangle$ に対応する固定体 $M$ の次数を求め、類が $c$ の素イデアルと $c^2$ の素イデアルが $M/K$ でどう分解するか述べよ。

- Level: B
- ID: ANF22-B1

<!-- solution-start -->
**詳細解答**。[Hilbert類体のArtin同型](#thm-anf22-hilbert-class-correspondence)で $G=\operatorname{Gal}(H_K/K)\simeq C_4$、$[H_K:K]=4$。$c^2$ は位数2なので $M=H_K^{\langle c^2\rangle}$ についてGalois対応から

$$
\operatorname{Gal}(M/K)\simeq C_4/\langle c^2\rangle\simeq C_2,\qquad [M:K]=2.
$$

類 $c$ は商で非自明、Frobenius位数2なので $M/K$ で $f=2,g=1$。類 $c^2$ は商で単位元、Frobenius位数1なので $f=1,g=2$、完全分解します。両者とも $H_K/K$ の中間体なので $e=1$ です。
<!-- solution-end -->

### B2. $3$ 進円分塔のFrobenius

$F_1=\mathbb Q(\zeta_9)^{\{\pm1\}}$ について、$\ell=7,17,19$ のFrobeniusの位数と完全分解の有無を求めよ。

- Level: B
- ID: ANF22-B2

<!-- solution-start -->
**詳細解答**。$[F_1:\mathbb Q]=3$、Galois群は $(\mathbb Z/9\mathbb Z)^\times/\{\pm1\}$。$\ell$ はいずれも $3$ と異なるので非分岐です。$7\bmod9$ は $\pm1$ でなく、$7^2=49\equiv4\not\equiv\pm1$、$7^3\equiv1\pmod9$ なので商で位数3、$f=3,g=1$。$17\equiv-1\pmod9$ なので商で単位元、$f=1,g=3$。$19\equiv1\pmod9$ でも同じです。従って $17,19$ は完全分解し、$7$ は惰性します。
<!-- solution-end -->

### B3. 巡回群の段階と逆極限

奇素数 $p$ について $v_p((1+p)^{p^n}-1)=n+1$ を二項定理から証明し、$F_{n+1}\to F_n$ に対応するGalois群の制限写像を説明せよ。

- Level: B
- ID: ANF22-B3

<!-- solution-start -->
**詳細解答**。$n=0$ は $v_p(p)=1$。$x=1+p^{n+1}u$（$p\nmid u$）とおくと

$$
x^p-1=p^{n+2}u+
\sum_{j=2}^{p-1}\binom pj p^{(n+1)j}u^j+
p^{(n+1)p}u^p.
$$

$p$ が奇数なので $2\le j\le p-1$ では $p\mid\binom pj$、かつ $(n+1)j+1\ge n+3$。最後の項の位数も $(n+1)p\ge n+3$（$n\ge0,p\ge3$）。第一項の位数だけが $n+2$ で、次の段も成立します。これより $1+p$ の法 $p^{n+1}$ での位数は $p^n$。$G_n/\Delta_n$ はこの元で生成され、法 $p^{n+1}$ への還元で同じ生成元に写るので、制限写像は $\mathbb Z/p^{n+1}\mathbb Z\to\mathbb Z/p^n\mathbb Z$ の自然な還元です。
<!-- solution-end -->

### B4. $2$ 進塔に必要な補正

$\mathbb Q(\zeta_4),\mathbb Q(\zeta_8),\mathbb Q(\zeta_{16})$ の最大実部分体を $F_0^{(2)},F_1^{(2)},F_2^{(2)}$ とする。各次数と $5$ の剰余類の位数を計算し、奇素数の構成をそのまま $p=2$ に代入できない理由を述べよ。

- Level: B
- ID: ANF22-B4

<!-- solution-start -->
**詳細解答**。[素数冪円分体の次数](#prop-anf22-prime-power-degree)から円分体の次数は順に $2,4,8$ です。複素共役の位数 $2$ で割ると、最大実部分体の次数は $1,2,4$ となります。

法 $4$ では $5\equiv1$ で位数 $1$ です。法 $8$ では $5\not\equiv1$、$5^2=25\equiv1$ なので位数は $2$ です。

法 $16$ では $5^2=25\equiv9\not\equiv1$、$5^4=625\equiv1$。従って位数は $4$ です。

奇素数の場合と異なり、$r\ge3$ では $(\mathbb Z/2^r\mathbb Z)^\times$ は非巡回です。[2進塔の命題](#prop-anf22-two-adic-tower)に従い、$\{\pm1\}$ を除いて $5$ で商群を生成します。
<!-- solution-end -->

### C1. 同じ素数7を二種類の類体で追う

$K=\mathbb Q(\sqrt{-5})$、そのHilbert類体を $H_K$ とする。一方、$F_1=\mathbb Q(\zeta_9)^{\{\pm1\}}$ とする。

1. 素数 $7$ が $K/\mathbb Q$ でどう分解するか求めよ。
2. $7$ の上の素イデアルが $K$ で非主であることを示し、$H_K/K$ での分解を求めよ。
3. $7$ が $F_1/\mathbb Q$ でどう分解するか求めよ。
4. 二つの拡大の分岐条件の違いを説明せよ。

- Level: C
- ID: ANF22-C1

<!-- solution-start -->
**詳細解答**。

(1) $\mathcal O_K=\mathbb Z[\sqrt{-5}]$、$X^2+5\equiv X^2-2\pmod7$ です。$3^2=9\equiv2\pmod7$、根 $3$ と $-3$ は異なるので

$$
(7)=\mathfrak p_+\mathfrak p_-,
\quad \mathfrak p_\pm=(7,\sqrt{-5}\mp3),\quad
N\mathfrak p_+=N\mathfrak p_-=7.
$$

二つの異なる素イデアルに分かれるため $7$ は非分岐で分裂します。

(2) $\mathfrak p_\pm$ が主なら、生成元 $a+b\sqrt{-5}$ のノルムの絶対値は $7$ です。従って

$$
a^2+5b^2=7
$$

を満たす整数が必要です。$b=0$ では $a^2=7$、$|b|=1$ では $a^2=2$ となって不可能です。$|b|\ge2$ では左辺が $20$ 以上で、やはり不可能です。

よって二つの素イデアルはともに非主です。[類数2の計算](../ANF6/index.md#thm-anf6-q-sqrt-minus-five-class-group)と[Hilbert類体のFrobenius](#prop-anf22-principal-splitting)により、両方の類の位数は $2$。

従って $H_K/K$ で $e=1,f=2,g=1$ となり、二つの素イデアルはともに惰性します。

(3) $F_1/\mathbb Q$ のGalois群は $(\mathbb Z/9\mathbb Z)^\times/\{\pm1\}$ で位数3です。$7\bmod9$ は $\pm1$ でなく、$7^2\equiv4$、$7^3\equiv1$ なので、Frobeniusの位数は3です。[分解公式](../ANF21/index.md#prop-anf21-frobenius-order)から $e=1,f=3,g=1$、すなわち $7$ は $F_1$ で惰性します。

(4) $H_K/K$ は全有限素点で非分岐、実素点の複素化も起こしません。$F_1/\mathbb Q$ では $3$ が完全分岐し、$e=3$ です。$7$ が両方で惰性したことは、両拡大の分岐条件が同じだという意味ではありません。惰性次数を決めるFrobeniusと、分岐を決める惰性群は別の情報です。
<!-- solution-end -->

---

これで「類群から非分岐の最大Abel拡大へ」「法を深くして円分塔から無限の $p$ 進Galois群へ」の二つを計算できました。次の岩澤理論では、円分的 $\mathbb Z_p$ 塔の各有限段の類群・単数群を並べ、その変化を一つの代数的対象として調べます。
