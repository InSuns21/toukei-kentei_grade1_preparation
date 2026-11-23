# IWA11 局所／大域単数の完全列

[IWA10の円分単数](../IWA10/index.md#def-iwa10-cyclotomic-unit)は、各円分体の整数環で逆元を持つ元を明示し、[ノルム分布関係](../IWA10/index.md#thm-iwa10-norm-distribution)で塔の上下を結びました。しかし、単数だけからは[IWA9の分岐を許すGalois群](../IWA9/index.md#def-iwa9-s-ramified-extension)がどう生じるかは見えません。**単数を局所で見たときの不足分が、どのように類群と分岐拡大を測るか**が本講の問いです。

まず任意の数体 $K$ と有限素イデアルの集合 $S$ について、整数環の局所化をイデアルの付値で扱います。次に奇素数 $p$ を固定し、$S=S_p(K)=\{\mathfrak p:\mathfrak p\mid p\}$ として $p$ 進局所単数とレイ類群へ進みます。前半の有限生成群の完全列は自分で証明し、後半ではレイ類体のArtin相互法則を既習の類体論からの入力として正確に区別します。

## 1. 素点での付値を残すと単数はどう変わるか

$\mathcal O_K$ は $K$ の整数環です。非零元 $x\in K^\times$ の主分数イデアルは[素イデアル分解](../../ANF/ANF3/index.md#thm-anf3-prime-ideal-factorization)によって

$$
(x)=\prod_{\mathfrak q}\mathfrak q^{v_{\mathfrak q}(x)}
$$

と一意に書けます。整数 $v_{\mathfrak q}(x)$ は $\mathfrak q$ での付値で、ほとんど全てが0です。[イデアル類群](../../ANF/ANF6/index.md#def-anf6-ideal-class-group)は、このような主分数イデアルを忘れた分数イデアル群の商でした。

$S$ の外に極や零点を作らない元だけを許す環

$$
\mathcal O_{K,S}
=\{0\}\cup\{x\in K^\times:v_{\mathfrak q}(x)\ge0\ \text{for all }\mathfrak q\notin S\}
$$

を考えます。この環で逆元を持つには $x$ と $x^{-1}$ がともに上の条件を満たせばよく、したがって $S$ の外の付値が**すべて0**になる必要があります。

<a id="def-iwa11-s-units"></a>

<!-- formal-statement-start -->
> **定義（$S$ 単数）**  
> 数体 $K$、有限素イデアルの有限集合 $S$ について、
>
$$
U_K=\mathcal O_K^\times,\qquad
U_{K,S}=\mathcal O_{K,S}^\times
=\{x\in K^\times:v_{\mathfrak q}(x)=0\ (\mathfrak q\notin S)\}
$$
>
> とする。$U_{K,S}$ の元を $S$ 単数という。$S=\varnothing$ では $U_{K,S}=U_K$ である。
<!-- formal-statement-end -->

<!-- definition-example-start: def-iwa11-s-units -->
**定義の確認。** $K=\mathbb Q$、$S=\{(3),(5)\}$ なら $\mathcal O_{K,S}=\mathbb Z[1/15]$ です。分数を既約に直したとき、分子・分母の素因数が3と5だけであることが必要十分です。従って

$$
U_{K,S}=\{\pm3^a5^b:a,b\in\mathbb Z\},\qquad
U_K=\{\pm1\}.
$$

例えば $45/8$ は2での付値が $-3$ なので $S$ 単数ではありません。一方 $9/25$ は $S$ 単数で、その逆元 $25/9$ も同じ環に属します。
<!-- definition-example-end -->

付値をまとめる準同型

$$
\partial_S:U_{K,S}\longrightarrow\mathbb Z^S,\qquad
x\longmapsto(v_{\mathfrak p}(x))_{\mathfrak p\in S}
$$

を作ります。行先の標準基底 $e_{\mathfrak p}$ をイデアル類 $[\mathfrak p]$ に送る準同型を $\delta_S:\mathbb Z^S\to\operatorname{Cl}(K)$ とします。合成 $\delta_S\partial_S$ が0になるのは、$\prod_{\mathfrak p\in S}\mathfrak p^{v_{\mathfrak p}(x)}=(x)$ が主分数イデアルだからです。

<a id="thm-iwa11-s-unit-exact"></a>

<!-- formal-statement-start -->
> **定理（$S$ 単数・付値・類群の完全列）**  
> 数体 $K$ と有限素イデアル集合 $S$ について、$\mathcal O_{K,S}$ のイデアル類群への自然写像 $j_S$ を用いると、次のアーベル群の列は完全である。
>
$$
0\longrightarrow U_K\longrightarrow U_{K,S}
\xrightarrow{\ \partial_S\ }\mathbb Z^S
\xrightarrow{\ \delta_S\ }\operatorname{Cl}(K)
\xrightarrow{\ j_S\ }\operatorname{Cl}(\mathcal O_{K,S})
\longrightarrow0.
$$
>
> ここで $\delta_S((a_{\mathfrak p}))=[\prod_{\mathfrak p\in S}\mathfrak p^{a_{\mathfrak p}}]$ である。とくに、$\partial_S$ の余核は $S$ の素イデアル類が生成する部分群と同型である。
<!-- formal-statement-end -->

### 証明の見取り図

完全性は**各矢印の像が次の核と一致すること**です。最初の核は「どの有限素点でも付値0」、次の核は「$S$ の素点だけで主分数イデアルが作れること」。最後は局所化で $S$ 上の素イデアルが単位イデアルになることを使います。

<!-- proof-start -->
### 証明

(1) $U_K\hookrightarrow U_{K,S}$ は包含なので単射です。$x\in\ker\partial_S$ は $S$ 外でも $S$ 内でも全付値が0です。よって $(x)=\mathcal O_K$、すなわち $x,x^{-1}\in\mathcal O_K$、$x\in U_K$。逆に $U_K$ の元の付値は全部0です。従って $\ker\partial_S=U_K$。

(2) $\delta_S(\partial_S(x))=[(x)]=0$ だから $\operatorname{im}\partial_S\subseteq\ker\delta_S$。逆に $a=(a_{\mathfrak p})\in\ker\delta_S$ なら $\prod_{\mathfrak p\in S}\mathfrak p^{a_{\mathfrak p}}=(x)$ となる $x\in K^\times$ が存在します。右辺の $S$ 外の付値は0なので $x\in U_{K,S}$、しかも $v_{\mathfrak p}(x)=a_{\mathfrak p}$。よって $a=\partial_S(x)$ であり逆包含も成立します。

(3) 局所化すると $S$ の各 $\mathfrak p$ は $\mathfrak p\mathcal O_{K,S}=\mathcal O_{K,S}$ になるので $j_S\delta_S=0$。逆に $j_S([\mathfrak a])=0$ なら $\mathfrak a\mathcal O_{K,S}=x\mathcal O_{K,S}$ と書けます。$\mathfrak a(x)^{-1}$ は $S$ 外の全付値が0の分数イデアルであるため、$S$ の素イデアルの整数冪の積です。従って $[\mathfrak a]=\delta_S(a)$ となり $\ker j_S=\operatorname{im}\delta_S$。

(4) $S$ 外の素イデアルは $\mathcal O_{K,S}$ の非零素イデアルと対応し、局所化後の分数イデアルはそれらの積として表せます。各類に代表元を取って $S$ 外の素イデアルの積へ戻せるので $j_S$ は全射です。以上で全ての項の完全性が確かめられました。
<!-- proof-end -->

この完全列から次の二つは別問題だと分かります。$\partial_S$ が全射かどうかは $S$ 内の付値を自由に実現できるかで決まり、$\operatorname{Cl}(\mathcal O_{K,S})$ が0かどうかは $S$ 内のイデアル類が**全ての類**を生成するかで決まります。

## 2. 非主イデアルが付値の余核を作る例

$K=\mathbb Q(\sqrt{-5})$、$\mathcal O_K=\mathbb Z[\sqrt{-5}]$、$\mathfrak p=(2,1+\sqrt{-5})$ とします。$\mathfrak p$ の剰余体は $\mathbb F_2$、$(2)=\mathfrak p^2$ です。$\mathfrak p$ が主イデアルならノルム2の元 $a+b\sqrt{-5}$ が必要ですが

$$
N_{K/\mathbb Q}(a+b\sqrt{-5})=a^2+5b^2=2
$$

を満たす整数 $a,b$ はありません。従って $[\mathfrak p]\ne0$、しかし $2[\mathfrak p]=[(2)]=0$ で、その位数は2です。[この数体の類群計算](../../ANF/ANF6/index.md#thm-anf6-q-sqrt-minus-five-class-group)では $\operatorname{Cl}(K)\simeq\mathbb Z/2\mathbb Z$ が既習です。

$S=\{\mathfrak p\}$ なら、[完全列](#thm-iwa11-s-unit-exact)の $\delta_S:\mathbb Z\to\mathbb Z/2\mathbb Z$ は $n\mapsto n\bmod2$ です。従って

$$
\operatorname{im}\partial_S=\ker\delta_S=2\mathbb Z,\qquad
\operatorname{coker}\partial_S\simeq\mathbb Z/2\mathbb Z,\qquad
\operatorname{Cl}(\mathcal O_{K,S})=0.
$$

さらに $(2)=\mathfrak p^2$ から $v_{\mathfrak p}(2)=2$、従って $2\in U_{K,S}$ が付値2を実現します。一方付値1の $S$ 単数があれば $\mathfrak p=(x)$ となって非主性に矛盾します。これは**局所的には「付値1」は意味を持つのに、大域的な一つの元で実現できない**という障害の最小例です。

<a id="prop-iwa11-valuation-index"></a>

<!-- formal-statement-start -->
> **命題（付値写像の余核の読み方）**  
> 数体 $K$、有限素イデアル集合 $S$ について、$\delta_S$ の像を $D_S=\langle[\mathfrak p]:\mathfrak p\in S\rangle\subseteq\operatorname{Cl}(K)$ とすると、自然な同型
>
$$
\mathbb Z^S/\partial_S(U_{K,S})\simeq D_S
$$
>
> がある。従って $\partial_S$ が全射であることと、$S$ 内の各素イデアルが主イデアルであることは同値である。
<!-- formal-statement-end -->

### 証明の見取り図

整数ベクトルをそのイデアル類へ送り、核を[完全列](#thm-iwa11-s-unit-exact)で特定します。

<!-- proof-start -->
### 証明

$\delta_S$ の像は定義通り $D_S$、核は[定理](#thm-iwa11-s-unit-exact)により $\partial_S(U_{K,S})$ です。第一同型定理から上の同型を得ます。$\partial_S$ が全射なら各 $e_{\mathfrak p}$ が像に入るので $\delta_S(e_{\mathfrak p})=[\mathfrak p]=0$。逆に各 $[\mathfrak p]=0$ なら $\delta_S$ は零写像で、その核は $\mathbb Z^S$ 全体です。
<!-- proof-end -->

## 3. $p$ の上の局所単数を取り出す

ここから $p$ を**奇素数**とします。$v\mid p$ に対して、$K_v$ は $v$ での完備化、$\mathcal O_v$ は局所整数環、$\mathfrak m_v$ はその極大イデアル、$k_v=\mathcal O_v/\mathfrak m_v$ は $q_v=p^{f_v}$ 元の剰余体です。局所単数 $u\in\mathcal O_v^\times$ を剰余体に写すと、有限群 $k_v^\times$（位数 $q_v-1$）の元になります。この有限位数は $p$ と互いに素です。

剰余類 $\bar u\in k_v^\times$ は $q_v-1$ 乗が1で、Henselの持上げ（導関数 $(q_v-1)X^{q_v-2}$ が剰余体で非零）により、$\omega_v(\bar u)^{q_v-1}=1$ かつ $\omega_v(\bar u)\bmod\mathfrak m_v=\bar u$ を満たす単数へ**一意に**持ち上がります。このため各 $u$ は

$$
u=\omega_v(\bar u)\cdot u_1,\qquad u_1\in 1+\mathfrak m_v
$$

と一意に分解します。後者が $p$ 進方向の単数です。

<a id="def-iwa11-local-principal-units"></a>

<!-- formal-statement-start -->
> **定義（局所主単数群と大域単数の閉包）**  
> 数体 $K$、奇素数 $p$ に対し $S_p(K)=\{v:v\mid p\}$ とし、各 $v$ について
>
$$
U_v^1=1+\mathfrak m_v
=\ker(\mathcal O_v^\times\longrightarrow k_v^\times),\qquad
\mathcal U_K=\prod_{v\mid p}U_v^1
$$
>
> と置く。$u\in U_K$ を各 $K_v$ に埋め込み、上の一意分解の $u_1$ 成分を集める準同型を $\iota_p:U_K\to\mathcal U_K$ とする。その像の $p$ 進位相での閉包を $\mathcal E_K=\overline{\iota_p(U_K)}$ とする。
<!-- formal-statement-end -->

<!-- definition-example-start: def-iwa11-local-principal-units -->
**定義の確認。** $K=\mathbb Q$、$p=3$ のとき、唯一の局所体は $\mathbb Q_3$ で、$k_v=\mathbb F_3$、$U_v^1=1+3\mathbb Z_3$ です。$u=4$ は剰余1なので主単数であり、$u=2$ は剰余 $-1$ なので $2=(-1)\cdot(-2)$、$-2=1-3\in U_v^1$ です。大域単数 $\{\pm1\}$ の主単数成分はともに1なので

$$
\mathcal U_{\mathbb Q}=1+3\mathbb Z_3,\qquad
\mathcal E_{\mathbb Q}=\{1\}.
$$

$\mathcal E_K$ は一般には $U_K$ 自身とは異なる**閉部分群**です。局所単数群と全局所乗法群 $K_v^\times$ も区別します。後者には一様化元の整数冪という付値方向が残っています。
<!-- definition-example-end -->

## 4. レイ類群を挟んで完全列を証明する

[Hilbert類体のArtin同型](../../ANF/ANF22/index.md#thm-anf22-hilbert-class-correspondence)は、分岐を許さない場合の類群とGalois群の対応でした。$p$ での分岐を許すには、整数の合同条件を法に付けた**レイ類群**を使います。

正整数 $n\ge1$ について $\mathfrak m_n=\prod_{v\mid p}\mathfrak p_v^n$ と置きます。$\mathfrak m_n$ と互いに素な分数イデアル全体 $I_{\mathfrak m_n}$ を、$\alpha\equiv1\pmod{\mathfrak m_n}$ という局所的な合同条件を満たす $\alpha\in K^\times$ の主イデアル群 $P_{\mathfrak m_n,1}$ で割ったものが $\operatorname{Cl}_{\mathfrak m_n}(K)$ です。$\alpha$ は各 $v\mid p$ で局所単数であることも要求します（実素点に符号条件を課さない狭義でない有限法）。

<a id="def-iwa11-ray-class-group"></a>

<!-- formal-statement-start -->
> **定義（有限法のレイ類群）**  
> 数体 $K$、非零整イデアル $\mathfrak m$ に対して、$\mathfrak m$ と互いに素な分数イデアル群 $I_{\mathfrak m}$ と
>
$$
P_{\mathfrak m,1}
=\{(\alpha):\alpha\in K^\times,\ v_{\mathfrak p}(\alpha)=0,\
\alpha\equiv1\pmod{\mathfrak p^{v_{\mathfrak p}(\mathfrak m)}}\ 
(\mathfrak p\mid\mathfrak m)\}
$$
>
> を取り、$\operatorname{Cl}_{\mathfrak m}(K)=I_{\mathfrak m}/P_{\mathfrak m,1}$ と定める。合同式は $\mathcal O_{K,\mathfrak p}$ 内で解釈する。
<!-- formal-statement-end -->

<!-- definition-example-start: def-iwa11-ray-class-group -->
**定義の確認。** $K=\mathbb Q$、$\mathfrak m=(9)$ では、分数イデアル $(4)$ は法9と互いに素ですが $4\not\equiv1\pmod9$ なので $P_{(9),1}$ には入りません。一方 $(10)$ は $10\equiv1\pmod9$ なので入ります。$(-1)$ は単位イデアルでもあり、$\operatorname{Cl}_{(9)}(\mathbb Q)$ は $(\mathbb Z/9\mathbb Z)^\times/\{\pm1\}$ に対応し位数3です。
<!-- definition-example-end -->

<a id="thm-iwa11-ray-exact"></a>

<!-- formal-statement-start -->
> **定理（レイ類群の単数完全列）**  
> 数体 $K$、非零整イデアル $\mathfrak m$ に対して、剰余環への還元 $\rho_{\mathfrak m}$、剰余類の持上げを主イデアルへ写す写像 $\theta_{\mathfrak m}$、法を忘れる写像による完全列
>
$$
U_K\xrightarrow{\ \rho_{\mathfrak m}\ }
(\mathcal O_K/\mathfrak m)^\times
\xrightarrow{\ \theta_{\mathfrak m}\ }
\operatorname{Cl}_{\mathfrak m}(K)
\longrightarrow\operatorname{Cl}(K)
\longrightarrow0
$$
>
> がある。最左端の写像は一般に単射ではない。
<!-- formal-statement-end -->

### 証明の見取り図

剰余類を整数 $a$ に持ち上げたときの $(a)$ のレイ類を考えます。二つの持上げの比が法で1になることを使い、次に像の核を大域単数の剰余で特徴付けます。類群への最後の全射は、素イデアルを法と互いに素な代表へ取り直す操作によります。

<!-- proof-start -->
### 証明

剰余単数 $\bar a\in(\mathcal O_K/\mathfrak m)^\times$ に対し、代表 $a\in\mathcal O_K$ を選べば $a$ は $\mathfrak m$ と互いに素です。$\theta_{\mathfrak m}(\bar a)=[(a)]$ と置きます。もし $a\equiv b\pmod{\mathfrak m}$ なら $a/b\equiv1$ が全ての $\mathfrak p\mid\mathfrak m$ の局所環で成り立ち、$(a)/(b)=(a/b)\in P_{\mathfrak m,1}$ です。よって写像は定義に依らず、積も保ちます。

$\rho_{\mathfrak m}(u)$（$u\in U_K$）の像は $[(u)]=0$。逆に $\theta_{\mathfrak m}(\bar a)=0$ なら $(a)=(\alpha)$ かつ $\alpha\equiv1\pmod{\mathfrak m}$ となる $\alpha$ があり、$a/\alpha\in U_K$ です。従って $\bar a=\rho_{\mathfrak m}(a/\alpha)$。これで $\ker\theta_{\mathfrak m}=\operatorname{im}\rho_{\mathfrak m}$ が成立します。

レイ類が通常類群へ写って0なら代表イデアルは $(a)$ と書けます。法と互いに素なため $a$ は全ての $\mathfrak p\mid\mathfrak m$ で単数で、その剰余類の $\theta_{\mathfrak m}$ 像になります。最後の全射は、任意のイデアル類に $\mathfrak m$ と互いに素な分数イデアル代表が存在することから従います（各 $\mathfrak p\mid\mathfrak m$ で付値を0に調整する弱近似）。以上で完全です。
<!-- proof-end -->

この式の実際の**核・余核**は

$$
\ker\theta_{\mathfrak m}=\rho_{\mathfrak m}(U_K),\qquad
\operatorname{coker}\theta_{\mathfrak m}\simeq\operatorname{Cl}(K)
$$

です。法を増やすと左の剰余環は局所単数の情報を無限桁まで保持します。

## 5. $p$ 分岐最大アーベル拡大への完全列

[最大 $S_p$ 分岐アーベル pro-$p$ 拡大](../IWA9/index.md#def-iwa9-s-ramified-extension)を $M_p(K)=M_{S_p(K)}(K)$ とし、

$$
\mathfrak X_p(K)=\operatorname{Gal}(M_p(K)/K),\qquad
A_K=\operatorname{Cl}(K)[p^\infty]
$$

と書きます。$p$ は奇数なので、有限 $p$ 冪次数の拡大で実素点が複素化することはありません（実素点での次数2は奇数の $p$ 冪を割らない）。レイ類体のArtin相互法則という外部入力によれば、$\operatorname{Cl}_{\mathfrak m_n}(K)$ の $p$ 部分が法 $\mathfrak m_n$ で許す有限アーベル $p$ 拡大を記述し、$n$ を増やした逆極限が $\mathfrak X_p(K)$ を与えます。

剰余群の中国剰余分解と局所単数の完備性から

$$
\varprojlim_n(\mathcal O_K/\mathfrak m_n)^\times(p)
\simeq\prod_{v\mid p}U_v^1=\mathcal U_K
$$

です。ここで $G(p)$ は有限アーベル群 $G$ の $p$ 冪位数部分を表します。各 $v$ の剰余群 $k_v^\times$ の位数は $p$ と互いに素なので、極限の $p$ 方向には先ほどの主単数だけが残ります。

<a id="thm-iwa11-local-global-exact"></a>

<!-- formal-statement-start -->
> **定理（局所／大域単数と $p$ 分岐Galois群）**  
> 数体 $K$、奇素数 $p$ について、局所主単数群 $\mathcal U_K=\prod_{v\mid p}U_v^1$、大域単数の像の閉包 $\mathcal E_K$、最大 $p$ 外非分岐アーベル pro-$p$ 拡大のGalois群 $\mathfrak X_p(K)$、$p$ 部分類群 $A_K$ を上のように定める。このとき局所Artin写像を合わせることで、次の位相アーベル群の完全列が得られる。
>
$$
0\longrightarrow\mathcal E_K
\longrightarrow\mathcal U_K
\xrightarrow{\ \operatorname{rec}_p\ }\mathfrak X_p(K)
\xrightarrow{\ \operatorname{unr}\ }A_K
\longrightarrow0.
$$
>
> 特に $\ker(\operatorname{rec}_p)=\mathcal E_K$、$\operatorname{coker}(\operatorname{rec}_p)\simeq A_K$ である。$\mathcal E_K$ は閉包であり、$U_K\otimes\mathbb Z_p$ と無条件に同一視してはいない。
<!-- formal-statement-end -->

### 証明の見取り図

[有限法のレイ完全列](#thm-iwa11-ray-exact)で各合同桁を制御します。群の $p$ 成分を取り、$n$ を増やした極限を取ると、左の核は大域単数の**閉包**になります。最後にArtin相互法則でレイ類群の極限をGalois群として読み替えます。

<!-- proof-start -->
### 証明

各 $n$ で[レイ完全列](#thm-iwa11-ray-exact)の有限アーベル群の $p$ 成分を取ると

$$
(\mathcal O_K/\mathfrak m_n)^\times(p)
\longrightarrow\operatorname{Cl}_{\mathfrak m_n}(K)(p)
\longrightarrow A_K\longrightarrow0
$$

は完全です（有限アーベル群の素数ごとの直和分解は完全列を保ちます）。最初の写像の核は、大域単数の剰余像の $p$ 成分です。法 $\mathfrak m_{n+1}$ から $\mathfrak m_n$ への還元は剰余単数で全射であり、レイ類群の遷移も全射です。実際、レイ類群の代表イデアルはどの法でも $p$ と互いに素に選べ、法を忘れる写像の下で同じイデアル類になります。

逆極限で一つの局所単数 $u=(u_n)$ がレイ類群の核に入ることは、**各 $n$ ごとに**その剰余 $u_n$ が大域単数の像に入ることです。これは、$\mathcal U_K$ のどの合同近傍にも大域単数の像があるという閉包の定義そのものなので、核は $\mathcal E_K$ です。各段の右端は一定の有限群 $A_K$ で、レイ類群からそこへの全射の両立した逆像は有限非空集合の逆極限によって存在します。従って極限の右端も全射です。

局所Artin相互法則では局所単数の像が惰性群を与え、レイ類体のArtin対応によって $\varprojlim_n\operatorname{Cl}_{\mathfrak m_n}(K)(p)\simeq\mathfrak X_p(K)$ です。この**類体論の同型**を適用して、示した列を得ます。
<!-- proof-end -->

$IWA9$ の[惰性群を除く完全列](../IWA9/index.md#prop-iwa9-inertia-quotient)と比べると、$\operatorname{rec}_p(\mathcal U_K)$ は $p$ の上の惰性群が生成する閉部分群です。その商が $A_K$ になります。したがって「局所単数＝Galois群」ではなく、**局所単数から大域単数の閉包を割った群が惰性部分に対応する**のが正確な形です。

### 最小例：$K=\mathbb Q$、$p=3$

[類数1の判定](../../ANF/ANF6/index.md#cor-anf6-class-number-one)により $A_{\mathbb Q}=0$ であり、第3節で $\mathcal E_{\mathbb Q}=\{1\}$ と確認しました。よって

$$
\mathfrak X_3(\mathbb Q)
\simeq1+3\mathbb Z_3\simeq\mathbb Z_3.
$$

最後の同型を抽象的な既知公式で済ませず、$4=1+3$ を使って確かめます。$v_3(4^{3^k}-1)=k+1$ が $k=0$ で成り立ち、$a=1+3^{k+1}b$（$3\nmid b$）に対する

$$
a^3-1=3^{k+2}b+3^{2k+3}b^2+3^{3k+3}b^3
$$

の最小付値は $k+2$ なので帰納的に続きます。従って $4$ の法 $3^n$ における位数は $3^{n-1}$ です。しかも $1+3\mathbb Z/3^n\mathbb Z$ の位数も $3^{n-1}$。$4$ は各段でこの群を生成するので、逆極限は $\mathbb Z_3$ と同型です。法9では $4$ は位数3、法27では位数9です。

**局所の根付き単数の注意。** $K=\mathbb Q(\zeta_3)$ では $\zeta_3$ は大域単数です。3の上の唯一の局所素点で、その剰余は1（標数3の体では $X^3-1=(X-1)^3$）なので $\zeta_3\in U_v^1$ です。この位数3の元は同時に $\mathcal E_K$ にも入り、商では消えます。局所主単数に有限 $p$ ねじれが絶対にない、と仮定してはいけません。

## 6. ノルムは局所化とどう両立するか

有限拡大 $L/K$、$v\mid p$ を固定します。$v$ の上の素点を $w$ とすると、体の[ノルムの定義](../IWA4/index.md#def-iwa4-field-norm)から、$x\in L^\times$ について

$$
N_{L/K}(x)\ \text{を }K_v\text{ に埋めた値}
=\prod_{w\mid v}N_{L_w/K_v}(x\ \text{を }L_w\text{ に埋めた値})
$$

が成り立ちます。共役全体を $v$ の上にある素点ごとの群へ分けて積を取り直した式です。局所単数のノルムは再び局所単数です。$p$ と互いに素な位数の根もノルムでそのような根へ移るため、主単数成分への射影とも両立します。

<a id="prop-iwa11-norm-localization"></a>

<!-- formal-statement-start -->
> **命題（局所化とノルムの可換性）**  
> 有限数体拡大 $L/K$ と奇素数 $p$ に対して、各 $v\mid p$ で上の素点 $w$ の局所体ノルムを掛けた準同型
>
$$
N^{\mathrm{loc}}_{L/K}:
\prod_{w\mid p}U_w^1\longrightarrow\prod_{v\mid p}U_v^1
$$
>
> は大域単数の主単数成分への写像と可換である。従って $N^{\mathrm{loc}}_{L/K}(\mathcal E_L)\subseteq\mathcal E_K$ であり、商 $\mathcal U_L/\mathcal E_L\to\mathcal U_K/\mathcal E_K$ を誘導する。
<!-- formal-statement-end -->

### 証明の見取り図

大域ノルムは各埋め込みに対する共役の積、局所ノルムはその共役を $w\mid v$ ごとにまとめ直した積です。最後に「連続写像は閉包の像を像の閉包に含める」を使います。

<!-- proof-start -->
### 証明

$x\in U_L$ に対し $N_{L/K}(x)\in U_K$ であることは、$x^{-1}\in\mathcal O_L$ のノルムも整数環に属し、その積が1になることから従います。各 $v$ で $L\otimes_K K_v\simeq\prod_{w\mid v}L_w$ の成分表示に体ノルムを適用すると、上記の積の一致が成り立ちます。局所ノルムは $p$ と互いに素な位数の単数を同種の根へ送り、$U_w^1$ は局所ノルムで $U_v^1$ へ送られるため、主単数成分への射影前後でも等式を保ちます。従って

$$
N^{\mathrm{loc}}_{L/K}(\iota_p(U_L))
=\iota_p(N_{L/K}(U_L))\subseteq\iota_p(U_K).
$$

$N^{\mathrm{loc}}_{L/K}$ は有限個の局所体の連続ノルムの積なので連続です。両辺の閉包を取ると $N^{\mathrm{loc}}_{L/K}(\mathcal E_L)\subseteq\mathcal E_K$ となり、商への準同型が定義できます。
<!-- proof-end -->

例えば $L=\mathbb Q(\zeta_9)$、$K=\mathbb Q(\zeta_3)$、$p=3$ では3の上の素点は両体で一つずつです。[円分単数のノルム分布関係](../IWA10/index.md#thm-iwa10-norm-distribution)を $a=2$ に適用すれば

$$
N_{L/K}(1+\zeta_9)=1+\zeta_3.
$$

大域単数の同一性が、唯一の3進完備化での局所ノルムにもそのまま現れます。

ただし $N_{L/K}(U_L)=U_K$ は一般には成り立ちません。[IWA10の円分単数群の全射性](../IWA10/index.md#thm-iwa10-surjective-norm)を**全単数群**へ移してはなりません。塔で逆極限を取るとき、有限層の右完全列の右端が自動的に完全であり続けるとも言えません。核・余核の制御を調べるのが次の[IWA12の控制定理]（予定）につながります。

## 7. 演習と詳細解答

### Level A

<a id="ex-iwa11-a1"></a>

**A1. 二つの素点での $S$ 単数**
- Level: A
- ID: IWA11-A1

$K=\mathbb Q$、$S=\{(3),(5)\}$ とし、$U_{K,S}$ と $\partial_S$ の核・像を求めよ。

<!-- solution-start -->
**詳細解答。** 3と5以外で付値0という条件を既約分数の分子と分母に適用すると、$x=\pm3^a5^b$（$a,b\in\mathbb Z$）に限られます。$v_3(x)=a$、$v_5(x)=b$ なので $\partial_S(x)=(a,b)$。任意の $(a,b)$ に対する逆像は $3^a5^b$、よって像は $\mathbb Z^2$ 全体です。核は $a=b=0$ の場合の $\{\pm1\}=U_K$ です。
<!-- solution-end -->

<a id="ex-iwa11-a2"></a>

**A2. 付値と逆元**
- Level: A
- ID: IWA11-A2

$K=\mathbb Q$、$S=\{(3),(5)\}$ として $9/25$、$45/8$ の $S$ 単数性を判定し、可能なら付値ベクトルを求めよ。

<!-- solution-start -->
**詳細解答。** $9/25=3^2 5^{-2}$ であり、$S$ 外のどの素数でも指数0です。逆元 $25/9$ も同じ条件を満たすので $S$ 単数であり、ベクトルは $(2,-2)$。一方 $45/8=3^2\cdot5\cdot2^{-3}$ は $v_2=-3$ を持ちます。$2\notin S$ なので $\mathcal O_{K,S}$ にさえ入らず、単数でもありません。
<!-- solution-end -->

<a id="ex-iwa11-a3"></a>

**A3. $\sqrt{-5}$ の付値の偶奇**
- Level: A
- ID: IWA11-A3

$K=\mathbb Q(\sqrt{-5})$、$S=\{\mathfrak p\}$、$\mathfrak p=(2,1+\sqrt{-5})$ とする。$v_{\mathfrak p}(2)$ を求め、付値1の $S$ 単数がないことを説明せよ。

<!-- solution-start -->
**詳細解答。** $(2)=\mathfrak p^2$ だから $v_{\mathfrak p}(2)=2$ です。付値1の $S$ 単数 $x$ があれば、他の全付値0と合わせて $(x)=\mathfrak p$ になります。すると $\mathfrak p$ が主イデアルですが、主ならノルム2の整数 $a+b\sqrt{-5}$ が必要です。$a^2+5b^2=2$ は整数解を持たないため矛盾します。第2節の完全列によれば像は $2\mathbb Z$ です。
<!-- solution-end -->

<a id="ex-iwa11-a4"></a>

**A4. 3進単数の主成分**
- Level: A
- ID: IWA11-A4

$K=\mathbb Q$、$p=3$ で $2$、$4$、$-1$ の剰余成分と主単数成分を求めよ。

<!-- solution-start -->
**詳細解答。** 剰余体 $\mathbb F_3^\times=\{\pm1\}$ のTeichmüller持上げは整数 $\pm1$ です。$2\bmod3=-1$ なので $2=(-1)(-2)$、主成分は $-2=1-3$。$4\bmod3=1$ なので $4=1\cdot4$、主成分は4。$-1$ は剰余 $-1$、分解 $(-1)=(-1)\cdot1$ から主成分1です。どの主成分も $1+3\mathbb Z_3$ に属します。
<!-- solution-end -->

<a id="ex-iwa11-a5"></a>

**A5. 法9のレイ類群**
- Level: A
- ID: IWA11-A5

$K=\mathbb Q$、$\mathfrak m=(9)$ のレイ類群の位数を、完全列の各群の位数から求めよ。

<!-- solution-start -->
**詳細解答。** $\operatorname{Cl}(\mathbb Q)=0$、$U_{\mathbb Q}=\{\pm1\}$ で、その法9での像は異なる二元 $\{1,8\}$ です。$(\mathbb Z/9\mathbb Z)^\times$ は $\{1,2,4,5,7,8\}$ の6元。完全列でレイ類群はこの6元群を2元の単数像で割るので、位数は $6/2=3$ です。$4$ の冪は $4,7,1$ と巡り、商群を生成します。
<!-- solution-end -->

### Level B

<a id="ex-iwa11-b1"></a>

**B1. レイ類群の法を27に上げる**
- Level: B
- ID: IWA11-B1

$K=\mathbb Q$、$\mathfrak m=(27)$ とし、$(\mathbb Z/27\mathbb Z)^\times$ の3部分の位数、レイ類群の位数、主単数4の位数を求めよ。

<!-- solution-start -->
**詳細解答。** 法27の単数は3の倍数を除く18元なので位数18、その3部分の位数は9です。大域単数の剰余像は $\{\pm1\}$ の位数2であり、$\operatorname{Cl}(\mathbb Q)=0$。従って[レイ完全列](#thm-iwa11-ray-exact)から $\operatorname{Cl}_{(27)}(\mathbb Q)$ の位数は $18/2=9$ です。$4^2=16$、$4^3=64\equiv10\pmod{27}$、$4^9=(4^3)^3\equiv10^3=1000\equiv1\pmod{27}$。$4^3\not\equiv1$、$4^9\equiv1$ なので位数9です。よって4は主単数の全9元を生成します。
<!-- solution-end -->

<a id="ex-iwa11-b2"></a>

**B2. 余核を類群から読む**
- Level: B
- ID: IWA11-B2

$K=\mathbb Q(\sqrt{-5})$、$S=\{\mathfrak p\}$、$\mathfrak p=(2,1+\sqrt{-5})$ に対し、$\operatorname{coker}\partial_S$ と $\operatorname{Cl}(\mathcal O_{K,S})$ を求め、その違いを説明せよ。

<!-- solution-start -->
**詳細解答。** [既習の類群](../../ANF/ANF6/index.md#thm-anf6-q-sqrt-minus-five-class-group)は $\mathbb Z/2\mathbb Z$ で、$[\mathfrak p]$ は非自明元です。$\delta_S:\mathbb Z\to\mathbb Z/2\mathbb Z$ は $n\mapsto n\bmod2$ なので $\ker\delta_S=2\mathbb Z$、$\operatorname{im}\delta_S=\mathbb Z/2\mathbb Z$。完全性から $\operatorname{im}\partial_S=2\mathbb Z$ だから $\operatorname{coker}\partial_S=\mathbb Z/2\mathbb Z$。一方、$\operatorname{Cl}(\mathcal O_{K,S})=\operatorname{Cl}(K)/\langle[\mathfrak p]\rangle=0$ です。前者は「付値1を元で作れない」障害、後者は「局所化しても残るイデアル類」を表すため値が異なります。
<!-- solution-end -->

<a id="ex-iwa11-b3"></a>

**B3. 大域の根が局所で消える場所**
- Level: B
- ID: IWA11-B3

$K=\mathbb Q(\zeta_3)$、$p=3$ とする。$\zeta_3$ が $U_v^1$ と $\mathcal E_K$ の両方に入ることを証明し、$\mathcal U_K/\mathcal E_K$ におけるその像を求めよ。

<!-- solution-start -->
**詳細解答。** $\zeta_3$ は整数環の元で、$\zeta_3^{-1}=\zeta_3^2$ も整数なので大域単数です。3の上の素点 $v$ で剰余体は標数3。$\zeta_3^3=1$ を還元すると $(\overline{\zeta_3}-1)^3=\overline{\zeta_3}^3-1=0$ であり、体には非零冪零元がないので $\overline{\zeta_3}=1$。従って $\zeta_3\in U_v^1$ です。大域単数の主成分 $\iota_3(\zeta_3)=\zeta_3$ は $\mathcal E_K$ に入ります。商では $\zeta_3\mathcal E_K=\mathcal E_K$、つまり単位元です。
<!-- solution-end -->

<a id="ex-iwa11-b4"></a>

**B4. 円分塔で局所ノルムを照合する**
- Level: B
- ID: IWA11-B4

$L=\mathbb Q(\zeta_9)$、$K=\mathbb Q(\zeta_3)$、$p=3$ で $u=1+\zeta_9$ の大域ノルムを計算し、3進局所体のノルムと一致する理由を共役から示せ。

<!-- solution-start -->
**詳細解答。** $\omega=\zeta_9^3=\zeta_3$ と置くと、相対Galois群は $\zeta_9\mapsto\zeta_9\omega^j$（$j=0,1,2$）で与えられます。[体ノルム](../IWA4/index.md#def-iwa4-field-norm)を計算すると

$$
N_{L/K}(u)=\prod_{j=0}^{2}(1+\zeta_9\omega^j)
=1+\zeta_9^3=1+\zeta_3.
$$

3は両円分体で完全分岐するので、3の上の素点はそれぞれ一つです。[局所化とノルムの命題](#prop-iwa11-norm-localization)で局所ノルムはこの三つの共役の積そのものであり、$N_{L_w/K_v}(u)=1+\zeta_3$ です。分母のない代数的整数 $u$ と逆元は[IWA10の単数性](../IWA10/index.md#prop-iwa10-unit-proof)によって保証されます。
<!-- solution-end -->

### Level C

<a id="ex-iwa11-c1"></a>

**C1. 有限法から無限の局所／大域完全列へ**
- Level: C
- ID: IWA11-C1

$K=\mathbb Q$、$p=3$ とし、(i) $S=\{(3)\}$ の $S$ 単数付値列の核・余核、(ii) 法 $3^n$（$n\ge2$）の3部分レイ類群の位数と生成元、(iii) 極限 $\mathfrak X_3(\mathbb Q)$ の構造を求めよ。最後に (i) と (iii) の写像が同じ写像かどうか説明せよ。

<!-- solution-start -->
**詳細解答。** (i) $U_{\mathbb Q,S}=\{\pm3^a:a\in\mathbb Z\}$、$\partial_S(\pm3^a)=a$ なので核は $\{\pm1\}=U_{\mathbb Q}$、像は $\mathbb Z$ 全体、余核は0です。$\operatorname{Cl}(\mathbb Q)=0$ とも一致します。

(ii) $\varphi(3^n)=2\cdot3^{n-1}$。大域単数 $\{\pm1\}$ の剰余像は位数2なので、[レイ完全列](#thm-iwa11-ray-exact)の3部分レイ類群は位数 $3^{n-1}$ です。主単数 $4=1+3$ について $v_3(4^{3^k}-1)=k+1$ を、第5節の三乗の展開から帰納法で得ます。従って $4$ の法 $3^n$ での位数は $3^{n-1}$、この群の生成元となります。

(iii) 射影は $4\bmod3^{n+1}\mapsto4\bmod3^n$ を保つので、これらの巡回群の逆極限は $\mathbb Z_3$ です。$\mathcal U_{\mathbb Q}=1+3\mathbb Z_3$、$\mathcal E_{\mathbb Q}=1$、$A_{\mathbb Q}=0$ を[局所／大域完全列](#thm-iwa11-local-global-exact)へ代入しても $\mathfrak X_3(\mathbb Q)\simeq\mathbb Z_3$ を得ます。

(i) の写像は有理数の3進**付値** $\partial_S:U_{\mathbb Q,S}\to\mathbb Z$ であり、(iii) は局所**単数**のArtin写像 $\operatorname{rec}_3:1+3\mathbb Z_3\to\mathfrak X_3(\mathbb Q)$ です。前者は局所乗法群の離散付値方向、後者は付値0の単数方向を扱うので同じ写像ではありません。
<!-- solution-end -->

## 8. この完全列を塔で使う前に

有限層で確認したのは、$S$ 単数の付値と類群の障害を結ぶ完全列、および$p$ での局所主単数の閉包商から惰性群へ至る完全列です。上層から下層へのノルムがどこへ送るかは第6節で確かめましたが、全射性・有界性は別に証明する必要があります。

次のIWA12では、有限層の核や余核が無限塔でどう変わるかを調べます。とりわけ**個々の層で完全であることだけでは、逆極限でも右完全だとは限らない**という区別が出発点になります。
