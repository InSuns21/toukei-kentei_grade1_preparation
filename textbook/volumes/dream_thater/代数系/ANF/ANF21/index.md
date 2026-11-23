# ANF21 大域類体論の主要証明ルート

[ANF20の大域Artin積](../ANF20/index.md#def-anf20-global-artin)は、各素点で得た局所自己同型を掛け合わせる写像でした。積が有限個で済むことは証明できています。しかし、**局所で定義できること**と、**大域元の対角像が消えること**は別問題です。さらに、核がノルムで尽くされることや、指定した部分群から拡大体を構成できることも、それぞれ新しい主張です。

本講では、これらを一つの「類体論だから」という言葉で済ませず、証明済みの接合部分と、一般の大域類体論に残る深い入力を分けます。まず素点ごとの核から有限個の合同条件を取り出し、次にGalois制限とノルムとの整合性を証明し、最後に $\mathbb Q(\zeta_5)$ とその実二次部分体で具体化します。

以下、$K$ は数体、$L/K$ は有限Abel Galois拡大とします。[イデール群](../ANF19/index.md#def-anf19-idele)を $\mathbb I_K$ と書き、[イデール類群](../ANF19/index.md#def-anf19-idele-class)とGalois群を次で記します。

$$
C_K=\mathbb I_K/\Delta(K^\times),\qquad
G=\operatorname{Gal}(L/K).
$$

各素点 $v$ の上に $L$ の素点 $w$ を一つ選びます。[有限局所Artin写像](../ANF17/index.md#def-anf17-finite-reciprocity)の記号は $\operatorname{rec}_{L_w/K_v}$ とします。その像は $G$ の分解群に入ります。

規格化は**一様化元を算術的Frobeniusへ送る**ものです。

## 1. 局所の開核を一つの有限法にまとめる

数体には素点が無限にありますが、有限拡大が分岐する有限素点は有限個です。一方、イデールのほとんどの成分は局所単数です。この二つの有限性により、大域Artin積が参照する合同条件を一つの法に圧縮できます。

有限素点 $\mathfrak p$ の局所整数環を $\mathcal O_{\mathfrak p}$、極大イデアルを $\mathfrak p\mathcal O_{\mathfrak p}$ とします。$n\ge1$ に対する主単数 $1+\mathfrak p^n\mathcal O_{\mathfrak p}$ と、$n=0$ に対する $\mathcal O_{\mathfrak p}^{\times}$ は、どちらも局所乗法群の開部分群です。

<a id="def-anf21-artin-modulus"></a>

<!-- formal-statement-start -->
> **定義（Artin積を消す法）**  
> 数体 $K$ の法 $\mathfrak m$ が有限Abel拡大 $L/K$ のArtin積を消すとは、[法の局所単数部分群](../ANF20/index.md#def-anf20-ray-ideles) $U(\mathfrak m)$ が次を満たすことをいう。

$$
U(\mathfrak m)\subseteq
\ker\bigl(\operatorname{Art}_{L/K}:\mathbb I_K\to G\bigr).
$$

> これは対角の $K^\times$ が核に入るという主張を含まない。
<!-- formal-statement-end -->

この定義では、定義域は $\mathbb I_K$ のままです。大域相互法則をまだ使わずに条件を確認できます。

<!-- definition-example-start: def-anf21-artin-modulus -->
**定義の確認**。$L=\mathbb Q(\zeta_5)$、$\mathfrak m=(5)\infty$ とします。ここで $a\in(\mathbb Z/5\mathbb Z)^\times$ に対し、$\sigma_a$ は $\zeta_5\mapsto\zeta_5^a$ で定まるGalois自己同型です。また、$u\in\mathbb Z_5^\times$ の法 $5$ での剰余を $\overline u$ と書きます。

$p\ne5$ では非分岐性により局所単数のArtin像は $1$ です。$p=5$ では[素数冪円分拡大の明示局所相互法則](../ANF18/index.md#thm-anf18-explicit-cyclotomic-reciprocity)を、$u\in1+5\mathbb Z_5$ に適用します。その像は

$$
\sigma_{u^{-1}\bmod5}=\sigma_1=1
$$

となります。実素点では正の実数のArtin像が恒等です。

以上より、$U((5)\infty)$ の各成分が局所Artin核に入るので、大域Artin積も $1$ です。
<!-- definition-example-end -->

<a id="prop-anf21-modulus-exists"></a>

<!-- formal-statement-start -->
> **命題（Artin積を消す有限法の存在）**  
> 数体の任意の有限Abel Galois拡大 $L/K$ に対し、Artin積を消す法 $\mathfrak m$ が存在する。
<!-- formal-statement-end -->

### 証明の見取り図

非分岐有限素点では単数群全体が核に入ります。残る有限個の分岐素点では、局所写像の連続性から十分深い主単数群を取ります。実素点の負符号だけは必要に応じて法に含めます。

<!-- proof-start -->
### 証明

有限素点のうち分岐する集合を $S$ とします。これは有限集合です。$\mathfrak p\notin S$ では、[非分岐局所相互法則](../ANF15/index.md#thm-anf15-unramified-reciprocity)から $\mathcal O_{\mathfrak p}^{\times}$ は局所Artin写像の核に入ります。

$\mathfrak p\in S$ について、[局所Artin写像の連続性と有限離散値](../ANF17/index.md#thm-anf17-local-reciprocity)から、その核は $K_{\mathfrak p}^\times$ の単位元の開近傍です。主単数群は $\mathcal O_{\mathfrak p}^{\times}$ 内の単位元近傍の基底なので、ある整数 $n_{\mathfrak p}\ge1$ について

$$
1+\mathfrak p^{n_{\mathfrak p}}\mathcal O_{\mathfrak p}
\subseteq\ker(\operatorname{rec}_{L_w/K_{\mathfrak p}})
$$

となります。実素点では局所拡大が $\mathbb C/\mathbb R$ なら正元群 $\mathbb R_{>0}$ を、分裂したままなら $\mathbb R^\times$ を取り、複素素点では $\mathbb C^\times$ を取ります。これらの群は対応する局所Artin写像の核に含まれます。

有限部分 $\mathfrak m_0=\prod_{\mathfrak p\in S}\mathfrak p^{n_{\mathfrak p}}$、無限部分を複素化する実素点の集合として法 $\mathfrak m$ を作ります。この法の $U(\mathfrak m)$ の任意の元は、各素点で局所Artin写像の核に属します。従って[有限Abel拡大の大域Artin積](../ANF20/index.md#def-anf20-global-artin)から、その積も $1$ です。
<!-- proof-end -->

## 2. 法への下降と大域相互法則が加える一歩

[剰余類群とイデール商の同型](../ANF20/index.md#thm-anf20-ray-idele-isom)は、任意の法についてすでに証明しました。そこへArtin積を下降させるには、$U(\mathfrak m)$ だけでなく $\Delta(K^\times)$ でもArtin積が消えなければなりません。

<a id="prop-anf21-descent-criterion"></a>

<!-- formal-statement-start -->
> **命題（剰余類群への下降判定）**  
> $L/K$ を有限Abel Galois拡大、$\mathfrak m$ をArtin積を消す法とする。次の二条件は同値である。
>
> 1. $\operatorname{Art}_{L/K}(\Delta(a))=1$ がすべての $a\in K^\times$ に対して成り立つ。
> 2. 大域Artin積は剰余類群上の準同型を一意に誘導する。

$$
\overline{\operatorname{Art}}_{\mathfrak m}:
\operatorname{Cl}_{\mathfrak m}(K)\longrightarrow G.
$$
<!-- formal-statement-end -->

### 証明の見取り図

剰余類群は $\mathbb I_K/(K^\times U(\mathfrak m))$ と同型です。商への下降の必要十分条件は、商で $1$ とする部分群が写像の核に入ることです。

<!-- proof-start -->
### 証明

[ANF20のイデール商同型](../ANF20/index.md#thm-anf20-ray-idele-isom)を適用します。仮定により $U(\mathfrak m)$ はArtin積の核に含まれます。条件1が成り立てば、準同型の核は部分群なので

$$
\Delta(K^\times)U(\mathfrak m)
\subseteq\ker\operatorname{Art}_{L/K}.
$$

従って $x$ と $x\Delta(a)u$（$a\in K^\times$、$u\in U(\mathfrak m)$）のArtin像は同じです。そこで商類 $[x]$ を $\operatorname{Art}_{L/K}(x)$ に送れば、代表元によらない準同型が得られます。商写像は全射なので誘導写像は一意です。

逆に条件2が成り立つなら、対角元 $\Delta(a)$ はイデール商で単位類です。従ってArtin像も $\overline{\operatorname{Art}}_{\mathfrak m}(1)=1$ です。
<!-- proof-end -->

**境界が重要です。** この命題は「条件1なら下降する」という群論の証明です。条件1そのものは、[大域Artin相互法則](../ANF20/index.md#thm-anf20-global-reciprocity)の深い主張であり、局所準同型の存在や有限個の局所因子の積だけからは出ません。例えば有理数体の五次円分体では対角 $2$ の $2$ 成分と $5$ 成分が互いに打ち消し合いますが、個別の検算をすべての数体・すべての元への証明に拡張するには別の論証が要ります。

## 3. ノルムから得られる核と、核の等号との隔たり

$L/K$ のイデールノルム $N_{L/K}:\mathbb I_L\to\mathbb I_K$ は、$K$ の各素点 $v$ で、$L$ の上にあるすべての素点 $w\mid v$ について局所体のノルム $N_{L_w/K_v}$ を掛けて作ります。有限素点では、ほとんどの成分が単数のノルムなので再びイデールになります。対角元 $b\in L^\times$ のノルムは、数体のノルム $N_{L/K}(b)\in K^\times$ の対角元です。このためイデール類群にもノルムが誘導されます。

<a id="prop-anf21-norm-in-kernel"></a>

<!-- formal-statement-start -->
> **命題（大域イデールノルムはArtin積の核に入る）**  
> 数体の有限Abel Galois拡大 $L/K$ に対し、任意の $y\in\mathbb I_L$ について次が成り立つ。

$$
\operatorname{Art}_{L/K}(N_{L/K}(y))=1.
$$

> この包含は大域の主元相互法則やノルム核の等号を仮定しない。
<!-- formal-statement-end -->

### 証明の見取り図

局所類体論は、局所Artin写像の核が局所ノルム群であると教えます。大域ノルムの各成分は、対応する局所ノルムの積です。

<!-- proof-start -->
### 証明

素点 $v$ を固定します。$L/K$ はGalois拡大なので、上にある各 $w\mid v$ の局所拡大 $L_w/K_v$ は同型な有限Abel拡大です。ノルムの $v$ 成分は

$$
N_{L/K}(y)_v
=\prod_{w\mid v}N_{L_w/K_v}(y_w).
$$

[有限局所Artin写像の核とノルム群](../ANF17/index.md#prop-anf17-artin-quotient)により、各 $N_{L_w/K_v}(y_w)$ の局所Artin像は $1$ です。局所写像は準同型なので、その積である $N_{L/K}(y)_v$ の像も $1$ です。これはすべての $v$ に対して成り立つため、[有限個の局所因子からなる大域積](../ANF20/index.md#prop-anf20-artin-product)も $1$ です。
<!-- proof-end -->

この結果が示すのは包含

$$
N_{L/K}(\mathbb I_L)\subseteq\ker\operatorname{Art}_{L/K}
$$

です。ここへ大域の主元相互法則を加えると、$K^\times N_{L/K}(\mathbb I_L)$ も核に入ります。しかし、その逆包含

$$
\ker\operatorname{Art}_{L/K}
\subseteq K^\times N_{L/K}(\mathbb I_L)
$$

と全射性は、[大域相互法則のノルム商同型](../ANF20/index.md#thm-anf20-global-reciprocity)の追加の核心です。局所での核の等号を素点ごとに知っていても、一つの大域元で全成分を同時に整える必要があるため、直ちに逆包含は得られません。

## 4. 中間体への制限は局所・大域の積と両立する

$K\subseteq M\subseteq L$ を有限Abel Galois拡大の中間体とします。$\operatorname{Gal}(L/K)$ から $\operatorname{Gal}(M/K)$ への制限写像は全射です。局所でも、$L_w/K_v$ の自己同型を $M$ の完備化へ制限できます。

<a id="prop-anf21-restriction"></a>

<!-- formal-statement-start -->
> **命題（大域Artin積と中間体への制限）**  
> 数体の有限Abel Galois拡大 $L/K$ と中間体 $M$ に対して、各 $x\in\mathbb I_K$ で次が成り立つ。

$$
\operatorname{res}_{L/M}(\operatorname{Art}_{L/K}(x))
=\operatorname{Art}_{M/K}(x).
$$

> 左辺の $\operatorname{res}_{L/M}$ は、$K$ 上の自己同型を $M$ に制限する写像である。
<!-- formal-statement-end -->

### 証明の見取り図

各素点での局所Artin写像の制限との可換性を先に使い、最後に有限個の非自明な因子を掛け合わせます。

<!-- proof-start -->
### 証明

$v$ の上の $L$ の素点 $w$ を選び、$M$ への制限を $w_M$ とします。[局所相互法則の中間体への制限](../ANF17/index.md#prop-anf17-restriction-square)から

$$
\operatorname{res}_{L_w/M_{w_M}}
(\operatorname{rec}_{L_w/K_v}(x_v))
=\operatorname{rec}_{M_{w_M}/K_v}(x_v).
$$

これは各 $v$ で成立します。どちらの大域積についても、分岐有限素点と非単数成分の有限集合以外では局所像が $1$ です。従って有限集合 $S$ を両辺に共通に選び、準同型性を使って

$$
\begin{aligned}
\operatorname{res}_{L/M}(\operatorname{Art}_{L/K}(x))
&=\operatorname{res}_{L/M}
\left(\prod_{v\in S}\operatorname{rec}_{L_w/K_v}(x_v)\right)\\
&=\prod_{v\in S}
\operatorname{rec}_{M_{w_M}/K_v}(x_v)
=\operatorname{Art}_{M/K}(x).
\end{aligned}
$$

を得ます。$G$ がAbelなので素点の上の $w$ の選択によらず、因子の並び順も問題になりません。
<!-- proof-end -->

特に $U(\mathfrak m)$ が $L/K$ のArtin積で消えるなら、上の式から $M/K$ のArtin積でも消えます。[大域Artin相互法則](../ANF20/index.md#thm-anf20-global-reciprocity)を使って法付きArtin写像に下降した後も、同じ制限可換性が剰余類群上に残ります。

## 5. 大域類体論の証明をどこまで組み立てたか

目標は[剰余類体とArtin対応](../ANF20/index.md#thm-anf20-ray-class-field)で、任意の法 $\mathfrak m$ に対して剰余類群と同型なGalois群をもつ有限Abel拡大を構成することです。既知の有限Abel拡大から剰余類群へ戻る操作と、**任意の剰余類群から拡大を作る操作**は逆向きの問題です。

<a id="ref-anf21-proof-route"></a>

### 証明責務の五段階

1. **局所写像の構成**：局所相互法則から $\operatorname{rec}_{L_w/K_v}$ とそのノルム核を得る。一般形の局所相互法則には[ANF17で明示した外部入力](../ANF17/index.md#thm-anf17-local-reciprocity)がある。
2. **局所因子の有限性と法への圧縮**：[大域Artin積の有限性と準同型性](../ANF20/index.md#prop-anf20-artin-product)と[Artin積を消す有限法の存在](#prop-anf21-modulus-exists)を使う。ここまでは局所の開核・非分岐性で証明できる。
3. **対角元の消滅**：[下降判定](#prop-anf21-descent-criterion)に必要な $K^\times$ 上の積公式を示す。これは大域相互法則の深い部分で、通常は巡回拡大の相互法則やコホモロジー・解析的手法を要する。本講では[外部の大域相互法則](../ANF20/index.md#thm-anf20-global-reciprocity)として入力する。
4. **ノルム核の等号と全射**：[本講のノルム包含](#prop-anf21-norm-in-kernel)を等号まで強め、Artin像がGalois群全体になることを示す。この逆包含・全射にも独立した深い証明が要り、前段階の群論だけでは従わない。
5. **存在定理**：任意の開有限指数部分群 $H\subset C_K$ に対し、$N_{E/K}(C_E)=H$ となる有限Abel拡大 $E/K$ を構成する。[剰余類体の存在定理](../ANF20/index.md#thm-anf20-ray-class-field)の核心であり、有限商の群論からは構成できない。

この五段階のうち、段階3〜5の一般形を本講は証明していません。それらを明示的な入力として使えば、以下の商と部分体の計算は証明できます。

<a id="prop-anf21-quotient-subfields"></a>

<!-- formal-statement-start -->
> **命題（既知の類体から部分体を取り出す）**  
> 数体 $K$、法 $\mathfrak m$ と、Artin写像が同型を与える有限Abel拡大 $E/K$ が与えられたとする。

$$
\alpha:\operatorname{Cl}_{\mathfrak m}(K)
\xrightarrow{\ \sim\ }\operatorname{Gal}(E/K).
$$

> 剰余類群の任意の部分群 $H$ に対し、固定体 $M=E^{\alpha(H)}$ は有限Abel拡大であり、Galois群は次と同型である。

$$
\operatorname{Gal}(M/K)\simeq
\operatorname{Cl}_{\mathfrak m}(K)/H.
$$
<!-- formal-statement-end -->

### 証明の見取り図

有限Abel Galois群では全ての部分群が正規です。Galois対応の固定体を取ると、制限写像の核が $\alpha(H)$ になります。

<!-- proof-start -->
### 証明

$A=\operatorname{Cl}_{\mathfrak m}(K)$、$G_E=\operatorname{Gal}(E/K)$ と書きます。$\alpha(H)$ は$G_E$の部分群で、$G_E$ がAbelなので正規です。[Galois対応](../../FLD/FLD4/index.md#thm-fld4-fundamental-galois)の中間体に関する通常の群論を適用すると、固定体 $M=E^{\alpha(H)}$ は $K$ 上Galoisで、そのGalois群は

$$
\operatorname{Gal}(M/K)
\simeq G_E/\alpha(H).
$$

同型 $\alpha$ は $H$ を $\alpha(H)$ に送るので、商にも同型

$$
A/H\longrightarrow G_E/\alpha(H),
\qquad [a]\longmapsto[\alpha(a)]
$$

を誘導します。代表元 $a$ を $ah$ に変えても、$\alpha(h)\in\alpha(H)$ なのでよく定義されます。$\alpha$ の全射性・単射性から商の写像も全単射です。二つの同型を合成して結論を得ます。
<!-- proof-end -->

**存在の逆向きには注意します。** この命題は $E$ がすでに存在する場合の部分体構成です。任意の $H$ に対して最初の $E$ が存在することは示していません。これが段階5の役割です。

## 6. Frobeniusの位数から分解を読む

素イデアル $\mathfrak p$ が $L/K$ で非分岐なら、Frobeniusは素イデアルの剰余体上で $x\mapsto x^{N\mathfrak p}$ を与えます。Abel拡大では上の素点の選択に依存せず、$\operatorname{Frob}_{\mathfrak p}\in G$ が決まります。

<a id="prop-anf21-frobenius-order"></a>

<!-- formal-statement-start -->
> **命題（非分岐素点の分解とFrobeniusの位数）**  
> 数体の有限Abel Galois拡大 $L/K$ と非分岐有限素イデアル $\mathfrak p$ に対し、剰余次数 $f$ は $\operatorname{Frob}_{\mathfrak p}$ の位数に等しい。$\mathfrak p$ の上の素イデアル数を $g$ とすれば次を得る。

$$
f=\operatorname{ord}(\operatorname{Frob}_{\mathfrak p}),
\qquad
g=\frac{[L:K]}{f}.
$$

> 特に $\mathfrak p$ が完全分解することと $\operatorname{Frob}_{\mathfrak p}=1$ は同値である。
<!-- formal-statement-end -->

### 証明の見取り図

非分岐な完備局所拡大のGalois群は、有限剰余体のFrobeniusによって生成されます。剰余体の拡大次数がその位数で、$e=1$ の次数公式が $g$ を与えます。

<!-- proof-start -->
### 証明

$\mathfrak p$ の上の素点 $\mathfrak P$ を一つ選びます。[非分岐拡大のFrobeniusの構成](../ANF15/index.md#thm-anf15-unramified-reciprocity)より、局所Galois群 $\operatorname{Gal}(L_{\mathfrak P}/K_{\mathfrak p})$ は位数 $f=[\kappa(\mathfrak P):\kappa(\mathfrak p)]$ の巡回群で、Frobeniusがその生成元です。非分岐ゆえ $e=1$ であり、この局所Galois群は大域の分解群に同型です。従って $G$ におけるFrobeniusの位数も $f$ です。

[Galois拡大での分解次数公式](../ANF4/index.md#thm-anf4-fundamental-identity)によって、同じ $\mathfrak p$ の上の全ての素点の剰余次数と分岐指数は等しく、

$$
[L:K]=efg=1\cdot f\cdot g.
$$

これを $g$ について解けば式を得ます。完全分解は $g=[L:K]$ と同値であり、上式から $f=1$、すなわちFrobeniusが単位元であることと同値です。
<!-- proof-end -->

## 7. 計算例：五次円分体と実二次部分体

$E=\mathbb Q(\zeta_5)$ とし、$\sigma_a(\zeta_5)=\zeta_5^a$ と置きます。[ANF20の円分Artin同型](../ANF20/index.md#prop-anf20-cyclotomic-artin)を使えば、

$$
\operatorname{Cl}_{(5)\infty}(\mathbb Q)
\simeq(\mathbb Z/5\mathbb Z)^\times
\xrightarrow{\ \sim\ }\operatorname{Gal}(E/\mathbb Q),
\quad \overline a\longmapsto\sigma_a.
$$

ここで $\overline2$ は位数 $4$、$\overline4=-1$ は位数 $2$ です。複素共役は $\sigma_{-1}$ なので、その固定体は実部分体 $M=\mathbb Q(\zeta_5+\zeta_5^{-1})=\mathbb Q(\sqrt5)$ です。これを具体的に確かめます。$t=\zeta_5+\zeta_5^{-1}$ とおき、五次円分多項式の関係 $\zeta_5^4+\zeta_5^3+\zeta_5^2+\zeta_5+1=0$ を $\zeta_5^2$ で割ると

$$
(\zeta_5^2+\zeta_5^{-2})+(\zeta_5+\zeta_5^{-1})+1=0.
$$

$t^2=\zeta_5^2+2+\zeta_5^{-2}$ を代入するので

$$
(t^2-2)+t+1=0,
\qquad t^2+t-1=0.
$$

判別式が $5$ なので $t\notin\mathbb Q$ です。$\zeta_5=e^{2\pi i/5}$ を選ぶと $t=2\cos(2\pi/5)>0$ だから、二つの根のうち正の根

$$
t=\frac{-1+\sqrt5}{2}
$$

を取ります。これで $\mathbb Q(t)=\mathbb Q(\sqrt5)$ も分かります。

<a id="prop-anf21-real-subfield"></a>

<!-- formal-statement-start -->
> **命題（五次円分体の実二次部分体と法）**  
> $E=\mathbb Q(\zeta_5)$、$M=\mathbb Q(\sqrt5)$ とする。$\mathbb Q$ の法 $(5)\infty$ の剰余類群から $M$ へのArtin写像は、部分群 $\{\overline1,\overline4\}$ を核とする。従って

$$
\operatorname{Gal}(M/\mathbb Q)
\simeq(\mathbb Z/5\mathbb Z)^\times/\{\pm1\}
\simeq C_2.
$$

> さらに $\operatorname{Cl}_{(5)}(\mathbb Q)\simeq C_2$ と自然に一致し、$M$ は法 $(5)$ の剰余類体である。
<!-- formal-statement-end -->

### 証明の見取り図

$E$ のArtin同型を実部分体へ制限します。複素共役が固定体 $M$ では恒等になるため、$\pm1$ の二元が核になります。法 $(5)$ の剰余類群はちょうどこの商でした。

<!-- proof-start -->
### 証明

$E/\mathbb Q$ のGalois群は $\{\sigma_1,\sigma_2,\sigma_3,\sigma_4\}$ です。$\sigma_4$ は $\zeta_5\mapsto\zeta_5^{-1}$ で複素共役なので、$t=\zeta_5+\zeta_5^{-1}$ を固定します。$t$ は $t^2+t-1=0$ を満たす無理数なので $[\mathbb Q(t):\mathbb Q]=2$。また $[E:\mathbb Q]=4$ だから、固定体 $E^{\langle\sigma_4\rangle}$ は $\mathbb Q(t)=M$ です。

[中間体へのArtin制限](#prop-anf21-restriction)を使うと、法 $(5)\infty$ の群の元 $\overline a$ は $\sigma_a|_M$ へ送られます。この制限の核は $\operatorname{Gal}(E/M)=\{1,\sigma_4\}$ です。従って核は $\{\overline1,\overline4\}$ となり、商は位数 $2$ です。

一方、[有理数体の法5∞と法5](../ANF20/index.md#prop-anf20-ray-q)により、

$$
\operatorname{Cl}_{(5)}(\mathbb Q)
\simeq(\mathbb Z/5\mathbb Z)^\times/\{\pm1\}
\simeq C_2.
$$

$M/\mathbb Q$ は実拡大なので、実素点での局所Artin写像は自明です。$5$ における $1+5\mathbb Z_5$ も、$E$ での局所Artin核に含まれるため、$M$ への制限後の核に入ります。他の有限素点では非分岐局所Artin写像が単数を消します。

よって $U((5))\subseteq\ker\operatorname{Art}_{M/\mathbb Q}$ です。さらに[大域Artin相互法則](../ANF20/index.md#thm-anf20-global-reciprocity)から対角部分群 $\Delta(\mathbb Q^\times)$ も核に含まれます。[剰余類群への下降判定](#prop-anf21-descent-criterion)により、Artin積は法 $(5)$ の剰余類群上に下降します。

この誘導写像が同型であることも確かめます。[有理数体の剰余類群の計算](../ANF20/index.md#prop-anf20-ray-q)によれば、法 $(5)\infty$ から法 $(5)$ への自然な全射の核は $\{\overline1,\overline4\}$ です。一方、上で計算した $E$ から $M$ へのArtin写像の制限の核もちょうどこの二元集合です。したがって誘導写像

$$
\operatorname{Cl}_{(5)}(\mathbb Q)
\xrightarrow{\ \sim\ }\operatorname{Gal}(M/\mathbb Q)
$$

は核が自明な全射、すなわち同型です。[剰余類体とArtin対応](../ANF20/index.md#thm-anf20-ray-class-field)の一意性を適用すると、$M$ が法 $(5)$ の剰余類体だと分かります。
<!-- proof-end -->

例えば $p=2$ は $E$ ではFrobeniusの位数が $4$ なので惰性次数 $4$、$g=1$ です。$M$ へ制限するとFrobeniusは位数 $2$ になり、二次体でも惰性です。$p=11$ は $11\equiv1\pmod5$ なので $E$・$M$ の両方で完全分解します。$p=19$ は $19\equiv-1\pmod5$ なので $E$ ではFrobenius位数 $2$ で二つの素点に分かれますが、$M$ ではその制限が恒等となり完全分解します。

この例は、同じ素数の分解が**大域Galois群のどの商を見ているか**で変わることを示します。

## 8. 演習：接合・ノルム・商を紙上で再現する

### A1. Artin積を消す法の単数条件

$E=\mathbb Q(\zeta_5)$ について、法 $(5)\infty$ の部分群 $U((5)\infty)$ の各場所の条件を書き、$x_5=6$、$x_\infty=3$、その他の有限成分が $1$ のイデール $x$ が属することを調べよ。

- Level: A
- ID: ANF21-A1

<!-- solution-start -->
**詳細解答**。[法の局所単数部分群](../ANF20/index.md#def-anf20-ray-ideles)から

$$
U((5)\infty)=
\mathbb R_{>0}\times(1+5\mathbb Z_5)
\times\prod_{p\ne5}\mathbb Z_p^\times.
$$

$6-1=5\in5\mathbb Z_5$ なので $6\in1+5\mathbb Z_5$、$3>0$ なので実成分も条件を満たし、他成分 $1$ は全て単数です。従って $x\in U((5)\infty)$。[法の核条件](#def-anf21-artin-modulus)からArtin像も $1$ です。
<!-- solution-end -->

### A2. 主元の打消しと法への下降

$\mathbb Q(\zeta_5)/\mathbb Q$ の対角元 $2$ について、$2$、$5$、実素点でのArtin因子を求め、下降判定に必要な条件を確認せよ。

- Level: A
- ID: ANF21-A2

<!-- solution-start -->
**詳細解答**。$2$ 成分の付値は $1$ なので非分岐Frobenius $\sigma_2$。$5$ 成分は単数 $2$ なので[素数冪円分拡大の明示局所相互法則](../ANF18/index.md#thm-anf18-explicit-cyclotomic-reciprocity)から $\sigma_{2^{-1}\bmod5}=\sigma_3$。実成分は正なので恒等です。他の有限素点も非分岐な単数の像で $1$。よって積は

$$
\sigma_2\sigma_3=\sigma_6=\sigma_1=1.
$$

これは[下降判定](#prop-anf21-descent-criterion)の条件1を $a=2$ について具体的に確認したものです。任意の $a\in\mathbb Q^\times$ に対しては別途大域相互法則が必要です。
<!-- solution-end -->

### A3. 局所ノルムの核への包含

$L/K$ が有限Abel Galois拡大のとき、$y\in\mathbb I_L$ の $v$ 成分のノルムと、その局所Artin像を式で書け。

- Level: A
- ID: ANF21-A3

<!-- solution-start -->
**詳細解答**。$v$ の上の全素点 $w$ を走らせると

$$
N_{L/K}(y)_v=\prod_{w\mid v}N_{L_w/K_v}(y_w).
$$

[局所Artin写像のノルム核](../ANF17/index.md#prop-anf17-artin-quotient)を各因子に適用して

$$
\operatorname{rec}_{L_w/K_v}(N_{L_w/K_v}(y_w))=1.
$$

局所写像は乗法準同型だから、積の像も $1$。従って全ての素点の積である大域Artin像も $1$ です。逆包含はこの計算からは出ません。
<!-- solution-end -->

### A4. Frobeniusと分解

$E=\mathbb Q(\zeta_5)$ の素数 $p=2,11,19$ について、Frobeniusの位数、剰余次数、$p$ の上の素イデアル数を求めよ。

- Level: A
- ID: ANF21-A4

<!-- solution-start -->
**詳細解答**。$p\ne5$ で非分岐なので[円分Artin公式](../ANF20/index.md#prop-anf20-cyclotomic-artin)と[分解命題](#prop-anf21-frobenius-order)が使えます。$2\bmod5$ の位数は $4$、$11\bmod5=1$ の位数は $1$、$19\bmod5=4$ の位数は $2$ です。$[E:\mathbb Q]=4$ なので順に

$$
(p,f,g)=(2,4,1),\ (11,1,4),\ (19,2,2).
$$

各場合に $efg=1\cdot f\cdot g=4$ が成立します。
<!-- solution-end -->

### A5. 実部分体への制限

$\sigma_2,\sigma_3,\sigma_4$ の $\mathbb Q(\sqrt5)$ への制限を、位数 $2$ のGalois群の元として判定せよ。

- Level: A
- ID: ANF21-A5

<!-- solution-start -->
**詳細解答**。$M=\mathbb Q(\sqrt5)$ は $\langle\sigma_4\rangle$ の固定体です。[実部分体のArtin商](#prop-anf21-real-subfield)により制限の核は $\{\sigma_1,\sigma_4\}$。従って $\sigma_4|_M=1$、$\sigma_2|_M$ と $\sigma_3|_M$ は共に非自明な唯一の自己同型です。実際 $\sigma_3=\sigma_2\sigma_4$ なので、$M$ 上の作用は等しくなります。
<!-- solution-end -->

### B1. 対角元の消滅とノルム核の区別

有限Abel拡大 $L/K$ の大域Artin積について、$U(\mathfrak m)$ を消すこと、$K^\times$ を消すこと、$N_{L/K}(\mathbb I_L)$ を消すことの論理関係を示し、どの段階で外部入力が必要になるか述べよ。

- Level: B
- ID: ANF21-B1

<!-- solution-start -->
**詳細解答**。[有限法の存在](#prop-anf21-modulus-exists)から、局所の開核を使って $U(\mathfrak m)\subseteq\ker\operatorname{Art}$ を証明できます。[ノルム包含](#prop-anf21-norm-in-kernel)から、局所Artin写像のノルム核を使って $N_{L/K}(\mathbb I_L)\subseteq\ker\operatorname{Art}$ を証明できます。これらは別々の包含で、前者から後者は自動的に従いません。

一方、$\Delta(K^\times)\subseteq\ker\operatorname{Art}$ は[大域Artin相互法則](../ANF20/index.md#thm-anf20-global-reciprocity)の入力です。それが得られたとき、[下降判定](#prop-anf21-descent-criterion)から $\mathbb I_K/(\Delta(K^\times)U(\mathfrak m))$ へ写像が下降します。さらに核の等号 $\ker\operatorname{Art}=\Delta(K^\times)N_{L/K}(\mathbb I_L)$ と全射性も外部の大域相互法則の強い部分であって、包含だけからは示せません。
<!-- solution-end -->

### B2. 制限可換性から法の継承を証明する

$L/K$ を有限Abel Galois拡大、$M$ をその中間体とする。法 $\mathfrak m$ が $L/K$ のArtin積を消すとき、同じ法が $M/K$ のArtin積も消すことを証明せよ。さらに、$L/K$ の法付きArtin写像が定義されれば $M/K$ のものと可換であることを示せ。

- Level: B
- ID: ANF21-B2

<!-- solution-start -->
**詳細解答**。$u\in U(\mathfrak m)$ を任意に取ります。仮定から $\operatorname{Art}_{L/K}(u)=1$。[大域Artin積と中間体への制限](#prop-anf21-restriction)を適用すると

$$
\operatorname{Art}_{M/K}(u)
=\operatorname{res}_{L/M}(\operatorname{Art}_{L/K}(u))
=\operatorname{res}_{L/M}(1)=1.
$$

従って $U(\mathfrak m)$ は $M/K$ のArtin積の核にも含まれます。加えて $L/K$ のArtin積が対角元を消すなら同じ式を $u=\Delta(a)$ に適用して $M/K$ でも対角元を消せます。両者は同じ剰余類群上へ下降し、その各類 $[x]$ に対して

$$
\operatorname{res}_{L/M}(\overline{\operatorname{Art}}_{L/K,\mathfrak m}([x]))
=\overline{\operatorname{Art}}_{M/K,\mathfrak m}([x])
$$

が成立します。どちらも $x$ を代表元に取って[制限可換性](#prop-anf21-restriction)を適用すればよく定義性も確認できます。
<!-- solution-end -->

### B3. 商から中間体のGalois群へ

$E=\mathbb Q(\zeta_5)$ とする。法 $(5)\infty$ の剰余類群の部分群 $H=\{\overline1,\overline4\}$ から固定体を作り、そのGalois群と $p=19$ の分解を求めよ。

- Level: B
- ID: ANF21-B3

<!-- solution-start -->
**詳細解答**。[法とArtinの同型](../ANF20/index.md#prop-anf20-cyclotomic-artin)は $\overline a$ を $\sigma_a$ へ送ります。従って $H$ の像は $\{1,\sigma_4\}$、固定体は $M=\mathbb Q(\sqrt5)$ です。[既知の類体から部分体を取り出す](#prop-anf21-quotient-subfields)から

$$
\operatorname{Gal}(M/\mathbb Q)
\simeq (\mathbb Z/5\mathbb Z)^\times/\{\pm1\}
\simeq C_2.
$$

$19\equiv4=-1\pmod5$ なので $E$ におけるFrobeniusは $\sigma_4$ で、$M$ へ制限すると単位元になります。$19$ は $5$ と異なるので非分岐です。[分解命題](#prop-anf21-frobenius-order)から $f=1$、$g=[M:\mathbb Q]/f=2$ となり、$M$ で完全分解します。
<!-- solution-end -->

### B4. 法5と法5∞を選び分ける

$E=\mathbb Q(\zeta_5)$、$M=\mathbb Q(\sqrt5)$ について、法 $(5)$ が $E$ の大域Artin積を消す法にならない理由を局所的に述べ、$M$ では消す理由を説明せよ。

- Level: B
- ID: ANF21-B4

<!-- solution-start -->
**詳細解答**。法 $(5)$ の実素点部分群は $\mathbb R^\times$ 全体です。$E$ の実素点での局所拡大は $\mathbb C/\mathbb R$ なので、負元 $-1$ は複素共役 $\sigma_4\ne1$ へ写ります。実素点だけが $-1$、他の成分が $1$ のイデールは $U((5))$ に属しますが、Artin積は $\sigma_4$。従って[法の定義](#def-anf21-artin-modulus)に反します。

$M$ は実二次拡大なので、実素点は $\mathbb R$ のままで、その局所Artin写像は $\mathbb R^\times$ 上で自明です。$5$ 成分では $1+5\mathbb Z_5$ は $E$ の局所Artin核に入るので、[制限可換性](#prop-anf21-restriction)により $M$ の核にも入ります。他の有限素点では非分岐なので単数群が核です。ゆえに $U((5))$ 全体が核に含まれます。
<!-- solution-end -->

### C1. 一つの素数を三つの視点から調べる

$E=\mathbb Q(\zeta_5)$、$M=\mathbb Q(\sqrt5)$ とする。$p=2,11,19$ を対象に、法 $(5)\infty$ の剰余類、$E$ と $M$ のFrobeniusと分解、法 $(5)$ で残る情報を、群同型と制限写像に沿って総合的に説明せよ。最後に、一般の数体で同じ方法を始めるとき、どこから外部の大域類体論が必要になるかを述べよ。

- Level: C
- ID: ANF21-C1

<!-- solution-start -->
**詳細解答**。まず[有理数体の法5∞と法5](../ANF20/index.md#prop-anf20-ray-q)と[五次円分体のArtin計算](../ANF20/index.md#prop-anf20-cyclotomic-artin)を使います。法 $(5)\infty$ の群とそのArtin像は

$$
\operatorname{Cl}_{(5)\infty}(\mathbb Q)
\simeq(\mathbb Z/5\mathbb Z)^\times\simeq C_4,
\qquad [p]\longmapsto\sigma_p
$$

です。$2,11,19$ の剰余は順に $2,1,4$ なので、対応するFrobeniusの位数は $4,1,2$ です。

[Frobeniusの位数と分解](#prop-anf21-frobenius-order)を四次拡大 $E/\mathbb Q$ に適用すると、

$$
(f_E(2),g_E(2))=(4,1),\quad
(f_E(11),g_E(11))=(1,4),\quad
(f_E(19),g_E(19))=(2,2).
$$

$M$ は複素共役 $\sigma_4$ の固定体なので、[制限可換性](#prop-anf21-restriction)により各Frobeniusを商群 $C_4/\langle\overline4\rangle=C_2$ へ送ります。$\overline2$ は非自明、$\overline{11}$ と $\overline{19}$ は単位類です。従って $M$ では

$$
(f_M(2),g_M(2))=(2,1),\quad
(f_M(11),g_M(11))=(1,2),\quad
(f_M(19),g_M(19))=(1,2).
$$

法 $(5)$ は $C_4$ の元を $\{\pm1\}$ で割った $C_2$ なので、$E$ で異なる $1$ と $-1$ のFrobeniusを区別できませんが、$M$ ではそれらの制限は同じです。これは $M$ が法 $(5)$ の剰余類体であることと一致します。

一般の $K$ でも、局所写像から有限法を作り、既知の拡大の中間体への制限を示すところまでは本講の命題で進められます。しかし対角 $K^\times$ を消すこと、ノルム核の逆包含と全射性、任意の開有限指数部分群に対応する拡大の存在には、それぞれ[大域相互法則](../ANF20/index.md#thm-anf20-global-reciprocity)と[剰余類体存在定理](../ANF20/index.md#thm-anf20-ray-class-field)の外部入力が必要です。
<!-- solution-end -->

次講ANF22では、ここで確かめた「剰余類群の商が中間体を指定する」という構造を、Hilbert類体、円分体、そして $p$ 冪円分塔に接続します。